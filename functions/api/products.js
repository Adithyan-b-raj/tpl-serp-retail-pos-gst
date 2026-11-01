// Cloudflare Pages Functions - POS Products API
export async function onRequestGet({ env }) {
  try {
    if (env && env.DB) {
      const res = await env.DB.prepare("SELECT * FROM pos_products ORDER BY title ASC").all();
      return new Response(JSON.stringify({ ok: true, products: res.results || [] }), {
        headers: { "Content-Type": "application/json", "Cache-Control": "public, s-maxage=60" }
      });
    }

    return new Response(JSON.stringify({
      ok: true,
      products: [
        { id: 'prod_01', barcode: '8901030882104', title: 'Organic Cold-Pressed Coconut Oil 1L', hsn_code: '1513', category: 'Grocery', mrp_inr: 450, sale_price_inr: 399, gst_rate_pct: 5.0, stock_qty: 48, unit: 'bottle' },
        { id: 'prod_02', barcode: '8901233019842', title: 'Artisanal Himalayan Pink Salt 1kg', hsn_code: '2501', category: 'Gourmet', mrp_inr: 160, sale_price_inr: 135, gst_rate_pct: 5.0, stock_qty: 85, unit: 'pack' },
        { id: 'prod_03', barcode: '8904000109920', title: 'Brass Filter Coffee Degchi Set', hsn_code: '7418', category: 'Kitchenware', mrp_inr: 1850, sale_price_inr: 1490, gst_rate_pct: 18.0, stock_qty: 18, unit: 'set' },
        { id: 'prod_04', barcode: '8908819200192', title: 'Handloom Cotton Kitchen Apron', hsn_code: '6211', category: 'Apparel', mrp_inr: 650, sale_price_inr: 520, gst_rate_pct: 12.0, stock_qty: 34, unit: 'pcs' },
        { id: 'prod_05', barcode: '8906611098231', title: 'Cast Iron Pre-Seasoned Skillet 10"', hsn_code: '7323', category: 'Cookware', mrp_inr: 2200, sale_price_inr: 1799, gst_rate_pct: 18.0, stock_qty: 22, unit: 'pcs' }
      ]
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
