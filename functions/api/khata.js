// Cloudflare Pages Functions - Khata Customer Credit API
export async function onRequestGet({ request, env }) {
  const url = new URL(request.url);
  const phone = url.searchParams.get('phone');

  try {
    if (env && env.DB && phone) {
      const customer = await env.DB.prepare("SELECT * FROM customers_khata WHERE phone = ?").bind(phone).first();
      const bills = await env.DB.prepare("SELECT * FROM pos_transactions WHERE customer_phone = ? ORDER BY created_at DESC LIMIT 10").bind(phone).all();
      return new Response(JSON.stringify({ ok: true, customer, bills: bills.results || [] }), {
        headers: { "Content-Type": "application/json" }
      });
    }

    if (phone === '9840122990') {
      return new Response(JSON.stringify({
        ok: true,
        customer: { customer_name: 'Rajesh Sharma (Sharma Traders)', phone: '9840122990', credit_limit_inr: 50000, current_balance_inr: 8420, gstin: '29ABCDE1234F1Z5' },
        bills: [
          { bill_number: 'BILL-2026-0842', total_inr: 1640.2, payment_mode: 'UPI', created_at: '2026-10-31 18:22:00' },
          { bill_number: 'BILL-2026-0790', total_inr: 3450.0, payment_mode: 'KHATA_CREDIT', created_at: '2026-10-24 11:15:00' }
        ]
      }), { headers: { "Content-Type": "application/json" } });
    }

    return new Response(JSON.stringify({ ok: false, error: "Customer not found. Try demo phone 9840122990" }), {
      status: 404,
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    return new Response(JSON.stringify({ ok: false, error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
