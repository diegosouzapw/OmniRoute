-- 143_retired_provider_purge.sql
--
-- Queue the one-time data purge for the retired GitHub Models provider.  The
-- migration runner deliberately remains SQL-only: the startup DB initializer
-- consumes this durable marker after all migrations (and legacy JSON/recovery
-- work) have completed, then performs the idempotent data/file purge.
CREATE TABLE IF NOT EXISTS retired_provider_purge_queue (
  provider_id TEXT NOT NULL,
  model_prefix TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'artifacts_pending', 'completed')),
  attempts INTEGER NOT NULL DEFAULT 0,
  last_error TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  completed_at TEXT,
  PRIMARY KEY (provider_id, model_prefix)
);

-- Artifact paths are kept one per row instead of in an unbounded JSON field so
-- a large call-log history cannot make startup load one giant value.  Rows are
-- marked deleted after the database transaction commits; an interrupted
-- restart simply resumes the pending rows.
CREATE TABLE IF NOT EXISTS retired_provider_purge_artifacts (
  provider_id TEXT NOT NULL,
  model_prefix TEXT NOT NULL,
  artifact_relpath TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'deleted')),
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  deleted_at TEXT,
  PRIMARY KEY (provider_id, model_prefix, artifact_relpath),
  FOREIGN KEY (provider_id, model_prefix)
    REFERENCES retired_provider_purge_queue(provider_id, model_prefix)
    ON DELETE CASCADE
);

INSERT OR IGNORE INTO retired_provider_purge_queue (
  provider_id,
  model_prefix,
  status,
  attempts
)
VALUES ('github-models', 'ghm/', 'pending', 0);
