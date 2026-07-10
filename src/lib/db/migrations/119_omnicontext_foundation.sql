-- OmniContext Phase 0 foundation: projects, membership, repo map, audit
CREATE TABLE IF NOT EXISTS omnicontext_projects (
  id TEXT PRIMARY KEY NOT NULL,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  org_id TEXT,
  team_id TEXT,
  retention_days INTEGER NOT NULL DEFAULT 90,
  inject_enabled INTEGER NOT NULL DEFAULT 1,
  publish_policy_default TEXT NOT NULL DEFAULT 'auto',
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS omnicontext_project_members (
  project_id TEXT NOT NULL,
  api_key_id TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'member' CHECK (role IN ('member', 'lead', 'admin')),
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  PRIMARY KEY (project_id, api_key_id),
  FOREIGN KEY (project_id) REFERENCES omnicontext_projects(id) ON DELETE CASCADE,
  FOREIGN KEY (api_key_id) REFERENCES api_keys(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS omnicontext_repo_map (
  repo_key TEXT PRIMARY KEY NOT NULL,
  project_id TEXT NOT NULL,
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (project_id) REFERENCES omnicontext_projects(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS omnicontext_audit_log (
  id TEXT PRIMARY KEY NOT NULL,
  ts TEXT NOT NULL,
  actor_api_key_id TEXT,
  action TEXT NOT NULL,
  project_id TEXT,
  artifact_ids_json TEXT,
  query_hash TEXT,
  meta_json TEXT
);

CREATE INDEX IF NOT EXISTS idx_omnicontext_members_api_key
  ON omnicontext_project_members(api_key_id);

CREATE INDEX IF NOT EXISTS idx_omnicontext_members_project
  ON omnicontext_project_members(project_id);

CREATE INDEX IF NOT EXISTS idx_omnicontext_repo_map_project
  ON omnicontext_repo_map(project_id);

CREATE INDEX IF NOT EXISTS idx_omnicontext_audit_project_ts
  ON omnicontext_audit_log(project_id, ts);

CREATE INDEX IF NOT EXISTS idx_omnicontext_projects_slug
  ON omnicontext_projects(slug);
