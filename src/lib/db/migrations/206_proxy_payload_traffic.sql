CREATE TABLE IF NOT EXISTS proxy_payload_traffic (
  route_key TEXT PRIMARY KEY,
  proxy_id TEXT,
  route_kind TEXT NOT NULL CHECK (route_kind IN ('registry', 'legacy', 'direct', 'unattributed')),
  upload_bytes INTEGER NOT NULL DEFAULT 0 CHECK (upload_bytes >= 0),
  download_bytes INTEGER NOT NULL DEFAULT 0 CHECK (download_bytes >= 0),
  attempts INTEGER NOT NULL DEFAULT 0 CHECK (attempts >= 0),
  known_upload_attempts INTEGER NOT NULL DEFAULT 0 CHECK (known_upload_attempts >= 0),
  completed_downloads INTEGER NOT NULL DEFAULT 0 CHECK (completed_downloads >= 0),
  failed_attempts INTEGER NOT NULL DEFAULT 0 CHECK (failed_attempts >= 0),
  cancelled_downloads INTEGER NOT NULL DEFAULT 0 CHECK (cancelled_downloads >= 0),
  errored_downloads INTEGER NOT NULL DEFAULT 0 CHECK (errored_downloads >= 0),
  started_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
