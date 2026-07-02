-- Migration 019: Context handoffs for context-relay combo strategy
-- Stores structured LLM-generated summaries used to bridge account switches.

CREATE TABLE IF NOT EXISTS context_handoffs (
  id                    TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(8)))),
  session_id            TEXT NOT NULL,
  combo_name            TEXT NOT NULL,
  from_account          TEXT NOT NULL,
  summary               TEXT NOT NULL,
  key_decisions         TEXT NOT NULL DEFAULT '[]',
  task_progress         TEXT NOT NULL DEFAULT '',
  active_entities       TEXT NOT NULL DEFAULT '[]',
  message_count         INTEGER NOT NULL DEFAULT 0,
  model                 TEXT NOT NULL DEFAULT '',
  warning_threshold_pct REAL NOT NULL DEFAULT 0.85,
  generated_at          TEXT NOT NULL,
  expires_at            TEXT NOT NULL,
  created_at            TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now'))
);

CREATE INDEX IF NOT EXISTS idx_context_handoffs_session
  ON context_handoffs(session_id, expires_at);

CREATE INDEX IF NOT EXISTS idx_context_handoffs_expires
  ON context_handoffs(expires_at);

CREATE UNIQUE INDEX IF NOT EXISTS idx_context_handoffs_session_combo
  ON context_handoffs(session_id, combo_name);
