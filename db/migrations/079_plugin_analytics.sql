-- Migration 079: Plugin analytics table
CREATE TABLE IF NOT EXISTS plugin_analytics (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  plugin_name TEXT NOT NULL,
  hook TEXT NOT NULL,
  duration_ms INTEGER NOT NULL DEFAULT 0,
  success INTEGER NOT NULL DEFAULT 1,
  error_message TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_plugin_analytics_name_created
  ON plugin_analytics (plugin_name, created_at);
