-- Migration 061: Cloud agent credentials (encrypted API keys for cloud coding agents)
-- Previously created inline via ensureCredentialsTable() in src/lib/cloudAgent/credentials.ts;
-- promoted to a proper versioned migration per the project migration policy.
CREATE TABLE IF NOT EXISTS cloud_agent_credentials (
  provider_id TEXT PRIMARY KEY,
  api_key_encrypted TEXT NOT NULL,
  base_url TEXT,
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);
