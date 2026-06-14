-- Migration 085: quota_pools + quota_allocations
--
-- Renumbered from 077 → 085 (#2900 sibling fix): 077 collided with
-- 077_api_key_stream_default_mode.sql, which made getMigrationFiles() throw a
-- version-collision error and blocked getDbInstance() at startup. quota_pools
-- has no dependents (no other migration references these tables) and is fully
-- idempotent, so it can safely move to the next free number. DBs that already
-- applied it under the old 077 number are guarded in isSchemaAlreadyApplied
-- (case "085").
--
-- Creates the two tables that persist quota-sharing pools and per-API-key
-- allocations within each pool. Idempotent: safe to run more than once.
-- Foreign key ON DELETE CASCADE ensures allocations are removed when a pool
-- is deleted. Weight is stored as REAL (0-100 %).
--
-- Part of: Group B — Quota Sharing Engine (plan 22, frente F2).

CREATE TABLE IF NOT EXISTS quota_pools (
  id TEXT PRIMARY KEY,
  connection_id TEXT NOT NULL,
  name TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_quota_pools_connection
  ON quota_pools(connection_id);

CREATE TABLE IF NOT EXISTS quota_allocations (
  pool_id TEXT NOT NULL REFERENCES quota_pools(id) ON DELETE CASCADE,
  api_key_id TEXT NOT NULL,
  weight REAL NOT NULL CHECK (weight >= 0 AND weight <= 100),
  cap_value REAL,
  cap_unit TEXT CHECK (cap_unit IN ('percent','requests','tokens','usd')),
  policy TEXT NOT NULL CHECK (policy IN ('hard','soft','burst')) DEFAULT 'hard',
  PRIMARY KEY (pool_id, api_key_id)
);

CREATE INDEX IF NOT EXISTS idx_quota_allocations_apikey
  ON quota_allocations(api_key_id);
