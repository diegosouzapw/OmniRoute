-- 122_free_proxy_sync_errors.sql
-- Per-source sync errors for the free-proxy pool. Each failed source writes its
-- last error(s) here, keyed by source id, so a "Total: 0" result is honest
-- instead of silent. Cleared on a successful sync for that source.

CREATE TABLE IF NOT EXISTS free_proxy_sync_errors (
  source TEXT PRIMARY KEY,
  errors TEXT NOT NULL,
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);
