-- Migration 065: API Key Groups & Model Permissions
-- Enables team/enterprise key grouping with model-level access control.

BEGIN TRANSACTION;

-- Key groups (logical grouping of API keys for team management)
CREATE TABLE IF NOT EXISTS key_groups (
  id TEXT PRIMARY KEY NOT NULL,
  name TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  is_active INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Group-to-model permissions: which models each group can access
CREATE TABLE IF NOT EXISTS group_model_permissions (
  id TEXT PRIMARY KEY NOT NULL,
  group_id TEXT NOT NULL,
  -- Model identifier (supports wildcards: "gpt-*", "claude-*", "*" for all)
  model_pattern TEXT NOT NULL,
  -- Provider constraint (NULL = any provider, otherwise specific provider ID)
  provider TEXT,
  -- Allow or deny
  access_type TEXT NOT NULL DEFAULT 'allow' CHECK(access_type IN ('allow', 'deny')),
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (group_id) REFERENCES key_groups(id) ON DELETE CASCADE
);

-- Group-to-key membership
CREATE TABLE IF NOT EXISTS key_group_members (
  key_id TEXT NOT NULL,
  group_id TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  PRIMARY KEY (key_id, group_id),
  FOREIGN KEY (group_id) REFERENCES key_groups(id) ON DELETE CASCADE,
  FOREIGN KEY (key_id) REFERENCES api_keys(id) ON DELETE CASCADE
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_group_permissions_group
  ON group_model_permissions(group_id);

CREATE INDEX IF NOT EXISTS idx_group_members_key
  ON key_group_members(key_id);

CREATE INDEX IF NOT EXISTS idx_group_members_group
  ON key_group_members(group_id);

COMMIT;
