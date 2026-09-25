-- Links each usage row to its agent session (197_agent_sessions) so reports can filter requests
-- by project or session over any date-time range. NULL for traffic without an agent identity.
-- Kept as its own migration: the runner records a file as applied when an ALTER hits
-- "duplicate column name", which would otherwise roll back the agent_sessions table with it.
ALTER TABLE usage_history ADD COLUMN agent_session_id TEXT;
CREATE INDEX IF NOT EXISTS idx_uh_agent_session ON usage_history(agent_session_id);
CREATE INDEX IF NOT EXISTS idx_uh_api_key_timestamp ON usage_history(api_key_id, timestamp);
