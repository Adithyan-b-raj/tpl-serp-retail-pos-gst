-- ============================================================
-- VYAPAR POS & GST SEED DATA
-- ============================================================

INSERT OR IGNORE INTO pos_products (id, barcode, title, hsn_code, category, mrp_inr, sale_price_inr, gst_rate_pct, stock_qty, unit) VALUES
  ('prod_01', '8901030882104', 'Organic Cold-Pressed Coconut Oil 1L', '1513', 'Grocery', 450, 399, 5.0, 48, 'bottle'),
  ('prod_02', '8901233019842', 'Artisanal Himalayan Pink Salt 1kg', '2501', 'Gourmet', 160, 135, 5.0, 85, 'pack'),
  ('prod_03', '8904000109920', 'Brass Filter Coffee Degchi Set', '7418', 'Kitchenware', 1850, 1490, 18.0, 18, 'set'),
  ('prod_04', '8908819200192', 'Handloom Cotton Kitchen Apron', '6211', 'Apparel', 650, 520, 12.0, 34, 'pcs'),
  ('prod_05', '8906611098231', 'Cast Iron Pre-Seasoned Skillet 10"', '7323', 'Cookware', 2200, 1799, 18.0, 22, 'pcs');

INSERT OR IGNORE INTO customers_khata (id, customer_name, phone, credit_limit_inr, current_balance_inr, gstin) VALUES
  ('khata_01', 'Rajesh Sharma (Sharma Traders)', '9840122990', 50000, 8420, '29ABCDE1234F1Z5'),
  ('khata_02', 'Priya Sunderam', '9900144882', 20000, 1450, NULL),
  ('khata_03', 'Cafe Blue Monsoon', '9880199210', 100000, 24680, '29AAACH7781R1ZU');

INSERT OR IGNORE INTO pos_transactions (id, bill_number, customer_phone, subtotal_inr, discount_inr, cgst_inr, sgst_inr, total_inr, payment_mode, cash_tendered, change_returned) VALUES
  ('tx_001', 'BILL-2026-0842', '9840122990', 1490, 100, 125.1, 125.1, 1640.2, 'UPI', 1640.2, 0),
  ('tx_002', 'BILL-2026-0843', '9900144882', 534, 0, 13.35, 13.35, 560.7, 'CASH', 1000, 439.3);
