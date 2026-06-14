-- Migration 074: quota_consumption — Sliding Window Counter storage
--
-- Stores per-(api_key_id, dimension_key) consumption using 2-bucket sliding
-- window counters. dimension_key format: "<poolId>:<unit>:<window>".
-- bucket_index = floor(now_ms / window_ms). consumed and updated_at are
-- updated atomically via UPSERT (INSERT ... ON CONFLICT DO UPDATE).
-- Idempotent: safe to run more than once.
--
-- Part of: Group B — Quota Sharing Engine (plan 22, frente F2).

CREATE TABLE IF NOT EXISTS quota_consumption (
  api_key_id TEXT NOT NULL,
  dimension_key TEXT NOT NULL,
  bucket_index INTEGER NOT NULL,
  consumed REAL NOT NULL DEFAULT 0,
  updated_at INTEGER NOT NULL,            -- epoch ms
  PRIMARY KEY (api_key_id, dimension_key, bucket_index)
);

CREATE INDEX IF NOT EXISTS idx_quota_consumption_dim_bucket
  ON quota_consumption(dimension_key, bucket_index);

CREATE INDEX IF NOT EXISTS idx_quota_consumption_updated_at
  ON quota_consumption(updated_at);
