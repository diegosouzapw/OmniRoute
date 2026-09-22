-- Migration 181: per-request cost ledger + per-key tpm/rpm/monthly quota (M3 D2+D5).
--
-- 1. request_cost_ledger — one row per completed call with the full cost
--    breakdown (provider / model / input+output tokens / unit price / amount),
--    so every request is traceable to a USD figure without re-aggregating
--    usage_history through pricing. Single-writer append table.
--
-- 2. api_key_quota_limits — KISS quota config per API key. tpm (tokens/minute)
--    and rpm (requests/minute) are counters; monthly_amount_usd is compared
--    against the ledger sum for the current calendar month. A value of NULL
--    means "no limit for this dimension" (a 0 would read as "block everything",
--    so the config layer normalizes 0/null to unlimited).
--
-- 3. api_key_quota_counters — 2-bucket sliding-window counters (identical
--    shape to quota_consumption so the same atomic UPSERT helper pattern can
--    be reused). dimension_key = "key-quota:tpm" | "key-quota:rpm";
--    bucket_index = floor(now_ms / window_ms). monthly_amount is NOT counted
--    here — it is read from the ledger with a month-window WHERE.
--
-- KISS: no multi-tenant consistency — one key, one counter row per window,
-- atomic UPSERT. Idempotent: safe to run more than once.

CREATE TABLE IF NOT EXISTS request_cost_ledger (
  id                INTEGER PRIMARY KEY AUTOINCREMENT,
  api_key_id        TEXT NOT NULL,
  provider          TEXT NOT NULL,
  model             TEXT NOT NULL,
  tokens_input      INTEGER NOT NULL DEFAULT 0,
  tokens_output     INTEGER NOT NULL DEFAULT 0,
  tokens_cache_read INTEGER NOT NULL DEFAULT 0,
  tokens_cache_creation INTEGER NOT NULL DEFAULT 0,
  tokens_reasoning  INTEGER NOT NULL DEFAULT 0,
  unit_price_input  REAL NOT NULL DEFAULT 0,
  unit_price_output REAL NOT NULL DEFAULT 0,
  amount_usd        REAL NOT NULL DEFAULT 0,
  service_tier      TEXT NOT NULL DEFAULT 'standard',
  success           INTEGER NOT NULL DEFAULT 1,
  timestamp         TEXT NOT NULL,
  request_id        TEXT
);

CREATE INDEX IF NOT EXISTS idx_rcl_api_key_timestamp ON request_cost_ledger(api_key_id, timestamp);
CREATE INDEX IF NOT EXISTS idx_rcl_timestamp ON request_cost_ledger(timestamp);

CREATE TABLE IF NOT EXISTS api_key_quota_limits (
  api_key_id         TEXT PRIMARY KEY,
  tpm_limit          INTEGER,
  rpm_limit          INTEGER,
  monthly_amount_usd REAL,
  updated_at         TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS api_key_quota_counters (
  api_key_id    TEXT NOT NULL,
  dimension_key TEXT NOT NULL,
  bucket_index  INTEGER NOT NULL,
  consumed      REAL NOT NULL DEFAULT 0,
  updated_at    INTEGER NOT NULL,
  PRIMARY KEY (api_key_id, dimension_key, bucket_index)
);

CREATE INDEX IF NOT EXISTS idx_akqc_dim_bucket ON api_key_quota_counters(dimension_key, bucket_index);
CREATE INDEX IF NOT EXISTS idx_akqc_updated_at ON api_key_quota_counters(updated_at);
