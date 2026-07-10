-- OmniContext Phase 1: artifacts (FTS) + human handoffs
CREATE TABLE IF NOT EXISTS omnicontext_artifacts (
  id TEXT PRIMARY KEY NOT NULL,
  project_id TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('summary', 'decision', 'blocker', 'snippet', 'handoff', 'stable_prefix')),
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  version INTEGER NOT NULL DEFAULT 1,
  supersedes_id TEXT,
  classification TEXT NOT NULL DEFAULT 'internal',
  trust_tier TEXT NOT NULL DEFAULT 'member'
    CHECK (trust_tier IN ('draft', 'member', 'lead_approved', 'stable')),
  publish_policy TEXT NOT NULL DEFAULT 'auto'
    CHECK (publish_policy IN ('auto', 'review_required', 'lead_only')),
  status TEXT NOT NULL DEFAULT 'active'
    CHECK (status IN ('active', 'pending', 'deleted')),
  ticket_id TEXT,
  repo TEXT,
  branch TEXT,
  tags_json TEXT,
  created_by_api_key_id TEXT,
  approved_by_api_key_id TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  expires_at TEXT,
  stale_after_at TEXT,
  FOREIGN KEY (project_id) REFERENCES omnicontext_projects(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_omnicontext_artifacts_project_type
  ON omnicontext_artifacts(project_id, type, status);

CREATE INDEX IF NOT EXISTS idx_omnicontext_artifacts_updated
  ON omnicontext_artifacts(project_id, updated_at);

CREATE VIRTUAL TABLE IF NOT EXISTS omnicontext_artifact_fts USING fts5(
  title,
  body,
  content='omnicontext_artifacts',
  content_rowid='rowid'
);

CREATE TRIGGER IF NOT EXISTS omnicontext_artifacts_ai AFTER INSERT ON omnicontext_artifacts BEGIN
  INSERT INTO omnicontext_artifact_fts(rowid, title, body)
  VALUES (new.rowid, new.title, new.body);
END;

CREATE TRIGGER IF NOT EXISTS omnicontext_artifacts_ad AFTER DELETE ON omnicontext_artifacts BEGIN
  INSERT INTO omnicontext_artifact_fts(omnicontext_artifact_fts, rowid, title, body)
  VALUES ('delete', old.rowid, old.title, old.body);
END;

CREATE TRIGGER IF NOT EXISTS omnicontext_artifacts_au AFTER UPDATE ON omnicontext_artifacts BEGIN
  INSERT INTO omnicontext_artifact_fts(omnicontext_artifact_fts, rowid, title, body)
  VALUES ('delete', old.rowid, old.title, old.body);
  INSERT INTO omnicontext_artifact_fts(rowid, title, body)
  VALUES (new.rowid, new.title, new.body);
END;

CREATE TABLE IF NOT EXISTS omnicontext_handoffs (
  id TEXT PRIMARY KEY NOT NULL,
  project_id TEXT NOT NULL,
  artifact_id TEXT,
  status TEXT NOT NULL DEFAULT 'active'
    CHECK (status IN ('active', 'resumed', 'closed')),
  from_api_key_id TEXT,
  resumed_by_api_key_id TEXT,
  goal TEXT NOT NULL DEFAULT '',
  current_status TEXT NOT NULL DEFAULT '',
  decisions_md TEXT NOT NULL DEFAULT '',
  approaches_md TEXT NOT NULL DEFAULT '',
  blockers_md TEXT NOT NULL DEFAULT '',
  next_steps_md TEXT NOT NULL DEFAULT '',
  pointers_json TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  closed_at TEXT,
  expires_at TEXT,
  FOREIGN KEY (project_id) REFERENCES omnicontext_projects(id) ON DELETE CASCADE,
  FOREIGN KEY (artifact_id) REFERENCES omnicontext_artifacts(id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_omnicontext_handoffs_project_status
  ON omnicontext_handoffs(project_id, status);
