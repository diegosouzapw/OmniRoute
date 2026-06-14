-- Migration 075: provider_plans — per-connection quota plan overrides
--
-- Stores manual or auto-detected quota plans for a specific provider
-- connection. dimensions_json holds a JSON array of QuotaDimension objects
-- ({ unit, window, limit }). source distinguishes auto-detected plans from
-- operator-configured overrides. Idempotent: safe to run more than once.
--
-- Part of: Group B — Quota Sharing Engine (plan 22, frente F2).

CREATE TABLE IF NOT EXISTS provider_plans (
  connection_id TEXT PRIMARY KEY,           -- 1:1 with provider_connections; NULL not allowed since it is PK
  provider TEXT NOT NULL,
  dimensions_json TEXT NOT NULL,            -- JSON array of QuotaDimension
  source TEXT NOT NULL CHECK (source IN ('auto','manual')) DEFAULT 'manual',
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_provider_plans_provider
  ON provider_plans(provider);
