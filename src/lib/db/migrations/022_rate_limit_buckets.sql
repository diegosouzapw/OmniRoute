CREATE TABLE IF NOT EXISTS rate_limit_buckets (
  key TEXT NOT NULL,
  bucket TEXT NOT NULL,
  request_times TEXT NOT NULL DEFAULT '[]',
  updated_at INTEGER NOT NULL DEFAULT (unixepoch()),
  PRIMARY KEY (key, bucket)
);
CREATE INDEX IF NOT EXISTS idx_rate_limit_buckets_updated ON rate_limit_buckets(updated_at);
