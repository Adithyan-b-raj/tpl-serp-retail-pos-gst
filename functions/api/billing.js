// Cloudflare Pages Functions - Create POS Bill
export async function onRequestPost({ request, env }) {
  try {
    const body = await request.json();
    const { items = [], payment_mode = 'CASH', customer_phone = '', discount_inr = 0, cash_tendered = 0 } = body;

    let subtotal = 0;
    let totalTax = 0;

    items.forEach(it => {
      const itemSub = it.sale_price_inr * it.qty;
      const itemTax = itemSub * (it.gst_rate_pct / 100);
      subtotal += itemSub;
      totalTax += itemTax;
    });

    const cgst = totalTax / 2;
    const sgst = totalTax / 2;
    const total = Math.max(0, subtotal - discount_inr + totalTax);
    const change = Math.max(0, cash_tendered - total);
    const billNum = "BILL-" + Date.now().toString(36).toUpperCase();

    if (env && env.DB) {
      await env.DB.prepare(
        "INSERT INTO pos_transactions (id, bill_number, customer_phone, subtotal_inr, discount_inr, cgst_inr, sgst_inr, total_inr, payment_mode, cash_tendered, change_returned) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
      ).bind(billNum, billNum, customer_phone, subtotal, discount_inr, cgst, sgst, total, payment_mode, cash_tendered, change).run();
    }

    return new Response(JSON.stringify({
      ok: true,
      bill_number: billNum,
      subtotal,
      discount_inr,
      cgst,
      sgst,
      total,
      change_returned: change,
      payment_mode
    }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    return new Response(JSON.stringify({ ok: false, error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
