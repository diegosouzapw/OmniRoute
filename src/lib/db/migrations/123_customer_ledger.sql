-- 123_customer_ledger.sql
-- Customer engagement ledger for themedexperiencesmall.com
-- Tracks visits, cart actions, purchases, and affiliate engagement

CREATE TABLE IF NOT EXISTS customer_ledger (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  session_id TEXT NOT NULL,
  affiliate_code TEXT,
  points INTEGER NOT NULL DEFAULT 0,
  total_spent REAL NOT NULL DEFAULT 0,
  last_visit_at TEXT NOT NULL DEFAULT (datetime('now')),
  purchases_count INTEGER NOT NULL DEFAULT 0,
  tier TEXT NOT NULL DEFAULT 'visitor',
  metadata TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_customer_ledger_session ON customer_ledger(session_id);
CREATE INDEX IF NOT EXISTS idx_customer_ledger_affiliate ON customer_ledger(affiliate_code);
CREATE INDEX IF NOT EXISTS idx_customer_ledger_tier ON customer_ledger(tier);
