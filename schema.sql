-- ============================================================
-- VYAPAR POS & GST KHATA D1 DATABASE SCHEMA
-- ============================================================

CREATE TABLE IF NOT EXISTS pos_products (
  id TEXT PRIMARY KEY,
  barcode TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  hsn_code TEXT NOT NULL,
  category TEXT NOT NULL,
  mrp_inr REAL NOT NULL,
  sale_price_inr REAL NOT NULL,
  gst_rate_pct REAL NOT NULL DEFAULT 18.0,
  stock_qty INTEGER NOT NULL DEFAULT 50,
  unit TEXT DEFAULT 'pcs'
);

CREATE TABLE IF NOT EXISTS customers_khata (
  id TEXT PRIMARY KEY,
  customer_name TEXT NOT NULL,
  phone TEXT UNIQUE NOT NULL,
  credit_limit_inr REAL DEFAULT 25000,
  current_balance_inr REAL DEFAULT 0,
  gstin TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS pos_transactions (
  id TEXT PRIMARY KEY,
  bill_number TEXT UNIQUE NOT NULL,
  customer_phone TEXT,
  subtotal_inr REAL NOT NULL,
  discount_inr REAL DEFAULT 0,
  cgst_inr REAL NOT NULL,
  sgst_inr REAL NOT NULL,
  total_inr REAL NOT NULL,
  payment_mode TEXT NOT NULL, -- 'CASH', 'UPI', 'KHATA_CREDIT', 'CARD'
  cash_tendered REAL,
  change_returned REAL,
  status TEXT DEFAULT 'COMPLETED',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS pos_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  transaction_id TEXT NOT NULL,
  product_id TEXT NOT NULL,
  product_name TEXT NOT NULL,
  hsn_code TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  unit_price REAL NOT NULL,
  gst_rate REAL NOT NULL,
  total_price REAL NOT NULL,
  FOREIGN KEY (transaction_id) REFERENCES pos_transactions(id)
);

CREATE INDEX IF NOT EXISTS idx_products_barcode ON pos_products(barcode);
CREATE INDEX IF NOT EXISTS idx_khata_phone ON customers_khata(phone);
CREATE INDEX IF NOT EXISTS idx_trans_bill ON pos_transactions(bill_number);
