CREATE TABLE IF NOT EXISTS log_export_destinations (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  enabled INTEGER NOT NULL DEFAULT 0,
  config TEXT NOT NULL DEFAULT '{}',
  batch_size INTEGER NOT NULL DEFAULT 500,
  include_bodies INTEGER NOT NULL DEFAULT 0,
  max_body_bytes INTEGER NOT NULL DEFAULT 262144,
  max_rows_per_run INTEGER NOT NULL DEFAULT 10000,
  cursor_row_id INTEGER NOT NULL DEFAULT 0,
  exported_total INTEGER NOT NULL DEFAULT 0,
  last_run_at TEXT,
  last_status TEXT,
  last_error TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_log_export_destinations_enabled
  ON log_export_destinations(enabled);
