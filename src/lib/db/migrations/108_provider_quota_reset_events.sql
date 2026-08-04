-- Migration: observed provider quota reset windows
-- Records real upstream quota window transitions so API-key USD weekly caps can
-- align with the provider-observed reset instead of assuming resetAt - 7 days.

CREATE TABLE IF NOT EXISTS provider_quota_reset_events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  provider TEXT NOT NULL,
  connection_id TEXT NOT NULL,
  window_key TEXT NOT NULL,
  window_started_at TEXT NOT NULL,
  window_resets_at TEXT NOT NULL,
  observed_at TEXT NOT NULL,
  previous_remaining_percentage REAL,
  new_remaining_percentage REAL,
  previous_used_percentage REAL,
  new_used_percentage REAL,
  raw_data TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE(connection_id, window_key, window_started_at, window_resets_at)
);

CREATE INDEX IF NOT EXISTS idx_provider_quota_reset_events_connection_window
  ON provider_quota_reset_events(connection_id, window_key, window_resets_at);

CREATE INDEX IF NOT EXISTS idx_provider_quota_reset_events_provider_observed
  ON provider_quota_reset_events(provider, observed_at);
