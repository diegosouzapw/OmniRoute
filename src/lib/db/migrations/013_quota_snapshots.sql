-- 013_quota_snapshots.sql
-- Quota snapshots for subscription utilization tracking.
-- Stores periodic snapshots of quota state for historical analysis and time-series queries.

CREATE TABLE IF NOT EXISTS quota_snapshots (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  provider TEXT NOT NULL,
  connection_id TEXT NOT NULL,
  window_key TEXT NOT NULL,
  remaining_percentage REAL,
  is_exhausted INTEGER DEFAULT 0,
  next_reset_at TEXT,
  window_duration_ms INTEGER,
  raw_data TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_quota_snapshots_provider_time ON quota_snapshots(provider, created_at);
CREATE INDEX IF NOT EXISTS idx_quota_snapshots_connection_time ON quota_snapshots(connection_id, created_at);
CREATE INDEX IF NOT EXISTS idx_quota_snapshots_created_at ON quota_snapshots(created_at);
