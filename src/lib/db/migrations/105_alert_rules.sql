-- Migration: alert_rules — fleet alert configuration
CREATE TABLE IF NOT EXISTS alert_rules (
  id TEXT PRIMARY KEY NOT NULL,
  name TEXT NOT NULL,
  metric TEXT NOT NULL,
  condition TEXT NOT NULL,  -- gt, lt, eq, change_percent
  threshold REAL NOT NULL,
  duration_seconds INTEGER NOT NULL DEFAULT 60,
  severity TEXT NOT NULL DEFAULT 'warning',  -- info, warning, critical
  channels_json TEXT NOT NULL DEFAULT '[]',
  is_active INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_alert_rules_active ON alert_rules(is_active);
CREATE INDEX IF NOT EXISTS idx_alert_rules_metric ON alert_rules(metric);
