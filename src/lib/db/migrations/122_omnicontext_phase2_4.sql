-- OmniContext Phase 2–4: teams, embeddings, enterprise columns, routing-handoff B1

CREATE TABLE IF NOT EXISTS omnicontext_teams (
  id TEXT PRIMARY KEY NOT NULL,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  org_id TEXT,
  department_id TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_omnicontext_teams_org
  ON omnicontext_teams(org_id);

CREATE TABLE IF NOT EXISTS omnicontext_artifact_embeddings (
  artifact_id TEXT PRIMARY KEY NOT NULL,
  project_id TEXT NOT NULL,
  model TEXT NOT NULL DEFAULT 'omnicontext-local-hash',
  dims INTEGER NOT NULL,
  vector_json TEXT NOT NULL,
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (artifact_id) REFERENCES omnicontext_artifacts(id) ON DELETE CASCADE,
  FOREIGN KEY (project_id) REFERENCES omnicontext_projects(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_omnicontext_embeddings_project
  ON omnicontext_artifact_embeddings(project_id);

-- Enterprise columns on projects / artifacts (idempotent via try pattern in runner;
-- SQLite lacks IF NOT EXISTS for columns — use separate ALTERs; migrationRunner wraps txn)
ALTER TABLE omnicontext_projects ADD COLUMN department_id TEXT;
ALTER TABLE omnicontext_artifacts ADD COLUMN department_id TEXT;
ALTER TABLE omnicontext_artifacts ADD COLUMN legal_hold INTEGER NOT NULL DEFAULT 0;

-- Routing handoff B1 enrichment (separate store from OmniContext handoffs)
ALTER TABLE context_handoffs ADD COLUMN approaches_tried TEXT;
ALTER TABLE context_handoffs ADD COLUMN blockers TEXT;
