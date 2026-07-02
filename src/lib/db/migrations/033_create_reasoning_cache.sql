-- 033_create_reasoning_cache.sql
-- Persistent storage for reasoning_content replay cache.
-- Enables crash recovery and dashboard visibility for the
-- Reasoning Replay Cache feature (Issue #1628).
--
-- When thinking-mode models (DeepSeek V4, Kimi K2, Qwen-Thinking, etc.)
-- generate tool_calls, their reasoning_content must be replayed on the
-- next turn. This table persists that content keyed by tool_call_id.

CREATE TABLE IF NOT EXISTS reasoning_cache (
  tool_call_id   TEXT PRIMARY KEY,
  provider       TEXT NOT NULL,
  model          TEXT NOT NULL,
  reasoning      TEXT NOT NULL,
  char_count     INTEGER NOT NULL DEFAULT 0,
  created_at     TEXT NOT NULL DEFAULT (datetime('now')),
  expires_at     INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_reasoning_cache_expires
  ON reasoning_cache(expires_at);
CREATE INDEX IF NOT EXISTS idx_reasoning_cache_provider
  ON reasoning_cache(provider);
CREATE INDEX IF NOT EXISTS idx_reasoning_cache_model
  ON reasoning_cache(model);
CREATE INDEX IF NOT EXISTS idx_reasoning_cache_created
  ON reasoning_cache(created_at);
