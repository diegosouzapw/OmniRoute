CREATE TABLE IF NOT EXISTS plugin_metrics (
  plugin_name TEXT NOT NULL,
  event TEXT NOT NULL,
  calls INTEGER NOT NULL DEFAULT 0,
  errors INTEGER NOT NULL DEFAULT 0,
  total_duration_ms REAL NOT NULL DEFAULT 0,
  last_called_at TEXT,
  PRIMARY KEY (plugin_name, event)
);
