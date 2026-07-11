-- OmniContext Phase 1b: artifact feedback (helpful / harmful)
CREATE TABLE IF NOT EXISTS omnicontext_feedback (
  id TEXT PRIMARY KEY NOT NULL,
  project_id TEXT NOT NULL,
  artifact_id TEXT NOT NULL,
  verdict TEXT NOT NULL CHECK (verdict IN ('helpful', 'harmful')),
  actor_api_key_id TEXT,
  retrieve_id TEXT,
  note TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (project_id) REFERENCES omnicontext_projects(id) ON DELETE CASCADE,
  FOREIGN KEY (artifact_id) REFERENCES omnicontext_artifacts(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_omnicontext_feedback_artifact
  ON omnicontext_feedback(artifact_id, created_at);

CREATE INDEX IF NOT EXISTS idx_omnicontext_feedback_project
  ON omnicontext_feedback(project_id, created_at);
