-- Migration 174: Durable server tool execution fence table.
-- Tracks claim/result state for server-owned tool calls to prevent duplicate execution
-- across retries and concurrent requests. Independent of skill_executions.

CREATE TABLE IF NOT EXISTS server_tool_executions (
  id TEXT PRIMARY KEY,
  api_key_id TEXT NOT NULL,
  request_identity TEXT NOT NULL,
  tool_call_id TEXT NOT NULL,
  tool_name TEXT NOT NULL,
  input_digest TEXT NOT NULL,
  output TEXT,
  status TEXT NOT NULL CHECK(status IN ('running', 'success', 'error', 'timeout')),
  error_message TEXT,
  duration_ms INTEGER,
  claim_expires_at TEXT NOT NULL,
  completed_at TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE(api_key_id, request_identity, tool_call_id)
);

CREATE INDEX IF NOT EXISTS idx_server_tool_executions_status_expiry
  ON server_tool_executions(status, claim_expires_at);
CREATE INDEX IF NOT EXISTS idx_server_tool_executions_created
  ON server_tool_executions(created_at);
