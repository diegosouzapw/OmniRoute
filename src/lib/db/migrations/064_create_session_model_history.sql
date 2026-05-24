-- Migration 064: Track model usage per session/combo for detecting model switches
-- Used by the context-relay strategy to determine which models have
-- been active in each session/combo combination.

CREATE TABLE IF NOT EXISTS session_model_history (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  session_id TEXT NOT NULL,
  combo_name TEXT NOT NULL,
  model_str TEXT NOT NULL,
  provider TEXT NOT NULL,
  connection_id TEXT,
  used_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_session_model_history_lookup
ON session_model_history(session_id, combo_name, used_at DESC);

CREATE INDEX IF NOT EXISTS idx_session_model_history_cleanup
ON session_model_history(used_at);
