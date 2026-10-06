-- Signed, live-only Radar Intel feed cache. The supporter identity is a
-- one-way SHA-256 marker (`radar:<64 hex>`) and never contains the raw key.
CREATE TABLE IF NOT EXISTS radar_intel_cache (
  id INTEGER PRIMARY KEY CHECK (id = 1),
  version TEXT NOT NULL,
  tier TEXT NOT NULL CHECK (tier = 'live'),
  payload TEXT NOT NULL,
  signature TEXT NOT NULL,
  supporter_identity TEXT NOT NULL,
  fetched_at TEXT NOT NULL DEFAULT (datetime('now'))
);
