-- 100_bifrost_models.sql
-- Bifrost Tier-1 router model catalog cache.
--
-- Stores Bifrost's /v1/models response locally so OmniRoute doesn't have to
-- round-trip the gateway for every dashboard load / routing decision.
--
-- Replaces the implicit "ask Bifrost on every dispatch" pattern with a
-- stale-tolerant cache. TTL is configurable; default 1 hour (Bifrost's
-- model list changes ~daily at most).
--
-- Schema notes:
--   - `id` is the OpenAI-compat model id (e.g. "gpt-4o", "claude-3-5-sonnet",
--     "gemini-1.5-pro"). Bifrost returns this as `data[].id`.
--   - `provider` is Bifrost's provider id (e.g. "openai", "anthropic",
--     "gemini"). Mapped from OmniRoute's 232-provider catalog via
--     bifrostProviderMap.ts.
--   - `owned_by` is Bifrost's vendor metadata (e.g. "openai", "anthropic").
--     Kept distinct from `provider` because Bifrost uses owned_by for
--     display labels and provider for dispatch.
--   - `metadata` is JSON-encoded opaque Bifrost metadata (context window,
--     modalities, pricing tier). Indexed via JSON1 in ad-hoc queries.
--   - `fetched_at` is when the row was last refreshed from Bifrost.
--   - `expires_at` is the cache TTL boundary; rows past this are stale.
--   - PRIMARY KEY is `(provider, id)` so the same model name can appear
--     under different providers (e.g. "gpt-4o" routed via openai vs.
--     azure). See ADR-031 § "Provider identity model".
--
-- Companion module: src/lib/db/bifrostModels.ts
-- Companion B4 task in PLAN.md § 2.5.2.

CREATE TABLE IF NOT EXISTS bifrost_models (
  provider TEXT NOT NULL,             -- Bifrost provider id (openai, anthropic, ...)
  id TEXT NOT NULL,                   -- OpenAI-compat model id (gpt-4o, claude-3-5-sonnet, ...)
  owned_by TEXT,                      -- Bifrost vendor label (openai, anthropic, ...)
  display_name TEXT,                  -- Human-friendly name (optional)
  metadata TEXT,                      -- JSON-encoded opaque Bifrost metadata
  fetched_at TEXT NOT NULL DEFAULT (datetime('now')),
  expires_at TEXT NOT NULL,
  PRIMARY KEY (provider, id)
) WITHOUT ROWID;

CREATE INDEX IF NOT EXISTS idx_bm_provider
  ON bifrost_models (provider);

CREATE INDEX IF NOT EXISTS idx_bm_expires
  ON bifrost_models (expires_at);

-- Track cache state for observability + manual purge UX.
-- One row per provider; updated each fetch.
CREATE TABLE IF NOT EXISTS bifrost_models_meta (
  provider TEXT PRIMARY KEY,          -- Bifrost provider id
  last_fetched_at TEXT NOT NULL,
  last_status TEXT NOT NULL,          -- 'ok' | 'error' | 'partial'
  last_error TEXT,                    -- populated when last_status != 'ok'
  model_count INTEGER NOT NULL DEFAULT 0,
  fetch_count INTEGER NOT NULL DEFAULT 0
) WITHOUT ROWID;