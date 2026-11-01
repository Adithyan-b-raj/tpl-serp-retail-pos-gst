export async function onRequest() {
  return new Response(JSON.stringify({ service: 'tpl-serp-retail-pos-gst', status: 'ok', items: [{"id":"INV-8821","name":"Joseph Mathew (Khata Acct #14)","phone":"919847011223","detail":"8 Items • Taxable: ₹2,187 + CGST ₹131 + SGST ₹131 • Paid via UPI","status":"PAID // 80MM PRINTED","amount":"₹2,450"},{"id":"INV-8820","name":"Hotel SeaQueen Kitchen Purchase","phone":"919447022334","detail":"Bulk Rice & Oil • B2B GSTIN 32AABCH9988F1Z2 • Credit 7 Days","status":"KHATA CREDIT DUE","amount":"₹14,800"},{"id":"INV-8819","name":"Lakshmi Nair (Walk-in Counter 1)","phone":"919895033445","detail":"4 Items • Cash Tender ₹1,500 (Change ₹180)","status":"PAID // CASH","amount":"₹1,320"}] }), {
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=30, s-maxage=60, stale-while-revalidate=120' }
  });
}
