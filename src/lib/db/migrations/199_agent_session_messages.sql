-- 199_agent_session_messages.sql
-- Simplified conversation turns for agent sessions (opt-in via AGENT_SESSION_MESSAGES_ENABLED).
-- Stores the latest user prompt and assistant text/tools per turn, capped at 4k chars.

CREATE TABLE IF NOT EXISTS agent_session_messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  session_id TEXT NOT NULL,
  api_key_id TEXT,
  timestamp TEXT NOT NULL,
  provider TEXT,
  model TEXT,
  success INTEGER NOT NULL DEFAULT 1,
  user_text TEXT,
  assistant_text TEXT,
  tool_names TEXT,
  truncated INTEGER NOT NULL DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_asm_session_id ON agent_session_messages(session_id, id);
CREATE INDEX IF NOT EXISTS idx_asm_timestamp ON agent_session_messages(timestamp);
