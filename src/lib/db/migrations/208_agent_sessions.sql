-- One row per coding-agent session, aggregated at write time so per-member and per-project
-- reports never scan the raw request tables (call_logs keeps only days; usage_history rolls up
-- without api_key_id). A session is identified by the client's own session id (Claude Code
-- x-claude-code-session-id, Codex, OpenCode) scoped to the API key; without one, requests from
-- the same key and project within 30 minutes share a session. project_* come from the
-- x-omniroute-project headers or the working directory announced in the prompt.
CREATE TABLE IF NOT EXISTS agent_sessions (
  id TEXT PRIMARY KEY,
  api_key_id TEXT,
  api_key_name TEXT,
  client TEXT,
  client_session_id TEXT,
  project_name TEXT,
  project_repo TEXT,
  project_path TEXT,
  project_source TEXT,
  git_branch TEXT,
  first_seen_at TEXT NOT NULL,
  last_seen_at TEXT NOT NULL,
  request_count INTEGER NOT NULL DEFAULT 0,
  error_count INTEGER NOT NULL DEFAULT 0,
  tokens_input INTEGER NOT NULL DEFAULT 0,
  tokens_output INTEGER NOT NULL DEFAULT 0,
  tokens_cache_read INTEGER NOT NULL DEFAULT 0,
  tokens_cache_creation INTEGER NOT NULL DEFAULT 0,
  tokens_reasoning INTEGER NOT NULL DEFAULT 0,
  cost_usd REAL NOT NULL DEFAULT 0,
  unpriced_count INTEGER NOT NULL DEFAULT 0,
  last_provider TEXT,
  last_model TEXT,
  last_connection_id TEXT
);

CREATE INDEX IF NOT EXISTS idx_agent_sessions_key_last_seen
  ON agent_sessions(api_key_id, last_seen_at);
CREATE INDEX IF NOT EXISTS idx_agent_sessions_project_last_seen
  ON agent_sessions(project_name, last_seen_at);
CREATE INDEX IF NOT EXISTS idx_agent_sessions_last_seen
  ON agent_sessions(last_seen_at);
