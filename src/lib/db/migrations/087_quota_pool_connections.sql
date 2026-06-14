-- 086: Multi-provider quota pools — quota_pool_connections join table (Phase D1).
--
-- A quota pool can now span N provider connections (multi-provider). The legacy
-- quota_pools.connection_id column stays as the "primary" connection for
-- backwards compatibility. This table is the authoritative membership list.
-- Idempotent via CREATE TABLE/INDEX IF NOT EXISTS + INSERT OR IGNORE.

CREATE TABLE IF NOT EXISTS quota_pool_connections (
  pool_id       TEXT NOT NULL,
  connection_id TEXT NOT NULL,
  created_at    TEXT NOT NULL DEFAULT (datetime('now')),
  PRIMARY KEY (pool_id, connection_id)
);

CREATE INDEX IF NOT EXISTS idx_quota_pool_connections_pool
  ON quota_pool_connections(pool_id);

-- Backfill: every existing pool's single connection_id becomes its first member.
INSERT OR IGNORE INTO quota_pool_connections (pool_id, connection_id)
  SELECT id, connection_id FROM quota_pools
  WHERE connection_id IS NOT NULL AND connection_id <> '';
