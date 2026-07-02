-- Migration 011: Webhooks for event subscriptions
-- Part of API Endpoints dashboard (#563)

CREATE TABLE IF NOT EXISTS webhooks (
  id TEXT PRIMARY KEY,
  url TEXT NOT NULL,
  events TEXT NOT NULL DEFAULT '["*"]',
  secret TEXT,
  enabled INTEGER DEFAULT 1,
  description TEXT DEFAULT '',
  created_at TEXT DEFAULT (datetime('now')),
  last_triggered_at TEXT,
  last_status INTEGER,
  failure_count INTEGER DEFAULT 0
);
