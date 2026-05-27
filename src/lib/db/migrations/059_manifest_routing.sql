CREATE TABLE IF NOT EXISTS tier_config (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS tier_assignments (
  provider TEXT NOT NULL,
  model TEXT NOT NULL,
  tier TEXT NOT NULL CHECK (tier IN ('free', 'cheap', 'premium')),
  cost_per_1m_input REAL DEFAULT 0,
  cost_per_1m_output REAL DEFAULT 0,
  has_free_tier INTEGER DEFAULT 0,
  free_quota_limit INTEGER,
  reason TEXT,
  updated_at TEXT DEFAULT (datetime('now')),
  PRIMARY KEY (provider, model)
);

CREATE INDEX IF NOT EXISTS idx_tier_assignments_provider ON tier_assignments(provider);
CREATE INDEX IF NOT EXISTS idx_tier_assignments_tier ON tier_assignments(tier);
