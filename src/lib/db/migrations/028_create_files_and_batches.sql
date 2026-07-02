-- 028_create_files_and_batches.sql
-- Creates the files and batches tables with their complete final schema.

CREATE TABLE IF NOT EXISTS files (
  id TEXT PRIMARY KEY,
  bytes INTEGER NOT NULL,
  created_at INTEGER NOT NULL,
  filename TEXT NOT NULL,
  purpose TEXT NOT NULL,
  content BLOB,
  mime_type TEXT,
  api_key_id TEXT,
  deleted_at INTEGER,
  status TEXT DEFAULT 'validating',
  expires_at INTEGER
);
CREATE INDEX IF NOT EXISTS idx_files_api_key ON files(api_key_id);

CREATE TABLE IF NOT EXISTS batches (
  id TEXT PRIMARY KEY,
  endpoint TEXT NOT NULL,
  completion_window TEXT NOT NULL,
  status TEXT NOT NULL,
  input_file_id TEXT NOT NULL,
  output_file_id TEXT,
  error_file_id TEXT,
  created_at INTEGER NOT NULL,
  in_progress_at INTEGER,
  expires_at INTEGER,
  finalizing_at INTEGER,
  completed_at INTEGER,
  failed_at INTEGER,
  expired_at INTEGER,
  cancelling_at INTEGER,
  cancelled_at INTEGER,
  request_counts_total INTEGER DEFAULT 0,
  request_counts_completed INTEGER DEFAULT 0,
  request_counts_failed INTEGER DEFAULT 0,
  metadata TEXT,
  api_key_id TEXT,
  errors TEXT,
  model TEXT,
  usage TEXT,
  output_expires_after_seconds INTEGER,
  output_expires_after_anchor TEXT,
  FOREIGN KEY(input_file_id) REFERENCES files(id),
  FOREIGN KEY(output_file_id) REFERENCES files(id),
  FOREIGN KEY(error_file_id) REFERENCES files(id)
);
CREATE INDEX IF NOT EXISTS idx_batches_api_key ON batches(api_key_id);
CREATE INDEX IF NOT EXISTS idx_batches_status ON batches(status);
