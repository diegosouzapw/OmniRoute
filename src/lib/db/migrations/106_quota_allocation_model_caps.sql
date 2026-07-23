-- Migration 106: quota_allocation_model_caps
--
-- Adds per-(pool, api_key, model) budget caps so a single API key cannot drain
-- the shared quota pool by hammering one model (Group B hardening, Fase 3 #7).
--
-- Schema design:
--   pool_id    — references quota_pools.id (no FK cascade; orphan cleanup is
--                app-layer responsibility to avoid 3-table chain fragility in SQLite)
--   api_key_id — the API key being capped (same as in quota_allocations)
--   model      — exact model identifier string (e.g. "kimi-k2", "gpt-4o")
--   cap_value  — maximum allowed consumption in the given unit per hourly window
--   cap_unit   — one of 'percent','requests','tokens','usd' (matches QuotaUnit enum)
--
-- cap_value CHECK > 0: zero/negative caps are rejected at DB level.
-- The enforce layer additionally skips values ≤ Number.EPSILON (placeholder seeds).
--
-- Primary key: (pool_id, api_key_id, model) — one cap row per triple.
-- Idempotent: safe to run more than once.
--
-- Part of: Group B — Quota Sharing Engine, Fase 3 #7.

CREATE TABLE IF NOT EXISTS quota_allocation_model_caps (
  pool_id    TEXT NOT NULL,
  api_key_id TEXT NOT NULL,
  model      TEXT NOT NULL,
  cap_value  REAL NOT NULL CHECK (cap_value > 0),
  cap_unit   TEXT NOT NULL CHECK (cap_unit IN ('percent','requests','tokens','usd')),
  PRIMARY KEY (pool_id, api_key_id, model)
);

CREATE INDEX IF NOT EXISTS idx_qamc_pool_key
  ON quota_allocation_model_caps(pool_id, api_key_id);
