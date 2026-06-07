CREATE TABLE IF NOT EXISTS agent_bridge_state (
  agent_id TEXT PRIMARY KEY,
  dns_enabled INTEGER NOT NULL DEFAULT 0,
  cert_trusted INTEGER NOT NULL DEFAULT 0,
  setup_completed INTEGER NOT NULL DEFAULT 0,
  last_started_at TEXT,
  last_error TEXT
);

CREATE TABLE IF NOT EXISTS agent_bridge_mappings (
  agent_id TEXT NOT NULL,
  source_model TEXT NOT NULL,
  target_model TEXT NOT NULL,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (agent_id, source_model)
);

CREATE TABLE IF NOT EXISTS agent_bridge_bypass (
  pattern TEXT PRIMARY KEY,
  source TEXT NOT NULL CHECK (source IN ('default','user')),
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_agent_bridge_mappings_agent ON agent_bridge_mappings(agent_id);
