-- Migration 101: Bifrost traffic-shadow events (B6.1 of v8.1 Bifrost track, ADR-031)
--
-- Per-request comparison log for the Bifrost Tier-1 router rollout. When
-- BIFROST_SHADOW_ENABLED=true and the sampler rolls in, Bifrost runs the same
-- request in parallel with chatCore; both outcomes are recorded here, but
-- chatCore's response is always returned to the user. NO behavior change
-- for users in Phase 1 (B6.1); this table is for operator comparison only.
--
-- Schema notes:
--   - event_id is a UUID generated at insert time (Node crypto.randomUUID()).
--     Picked over AUTOINCREMENT to keep the table log-appendable across
--     DB-file rotations during the 14-day ramp.
--   - chatcore_request_id is OmniRoute's own request id (X-Request-Id header
--     if present, else auto-generated). Nullable for the rare cases where
--     the dispatcher fires before request-id propagation.
--   - bifrost_status ∈ {'ok','error','timeout','skipped'} — distinct from the
--     HTTP status code because we want to record infrastructure-level outcomes
--     (timeouts, skip-on-unsupported-provider) separately from provider-level
--     HTTP statuses.
--   - agreement_score ∈ [0.0, 1.0] — Jaccard token-set ratio between the two
--     response texts. See bifrostShadow.ts::computeAgreementScore().
--     NULL when one or both sides failed to produce text.
--   - bifrost_tokens_in/out + chatcore_tokens_in/out — best-effort, from
--     response.usage if present. NULL when not reported.
--   - bifrost_cost_usd / chatcore_cost_usd — NULL in B6.1; populated by a
--     later B6.2/B6.3 PR when cost observability is wired.
--   - created_at is the shadow-comparison timestamp (NOT the request's own
--     timestamp) — written at dispatcher commit time.
--
-- Index strategy:
--   - (created_at): dashboard time-series queries
--   - (provider, created_at): per-provider divergence drilldowns
--   - (bifrost_status, created_at): error-rate aggregations
--
-- Companion module: src/lib/db/bifrostShadow.ts
-- Companion dispatcher: open-sse/executors/bifrostShadow.ts
-- B6.1 task in PLAN.md § 2.5.2.

CREATE TABLE IF NOT EXISTS bifrost_shadow_events (
  event_id TEXT PRIMARY KEY,             -- UUID v4 (dispatcher-generated)
  chatcore_request_id TEXT,              -- OmniRoute request id (nullable)
  provider TEXT NOT NULL,                -- OmniRoute provider id
  model TEXT NOT NULL,
  bifrost_status TEXT NOT NULL           -- 'ok' | 'error' | 'timeout' | 'skipped'
    CHECK (bifrost_status IN ('ok','error','timeout','skipped')),
  bifrost_latency_ms INTEGER,            -- wall-clock ms for the Bifrost path
  chatcore_latency_ms INTEGER,           -- wall-clock ms for the chatCore path
  agreement_score REAL,                  -- 0.0..1.0 Jaccard; NULL if one side failed
  bifrost_tokens_in INTEGER,             -- prompt tokens (Bifrost side)
  bifrost_tokens_out INTEGER,            -- completion tokens (Bifrost side)
  chatcore_tokens_in INTEGER,            -- prompt tokens (chatCore side)
  chatcore_tokens_out INTEGER,           -- completion tokens (chatCore side)
  bifrost_cost_usd REAL,                 -- USD (B6.1: NULL; reserved for B6.2+)
  chatcore_cost_usd REAL,                -- USD (B6.1: NULL; reserved for B6.2+)
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_bse_created_at
  ON bifrost_shadow_events (created_at);

CREATE INDEX IF NOT EXISTS idx_bse_provider_created_at
  ON bifrost_shadow_events (provider, created_at);

CREATE INDEX IF NOT EXISTS idx_bse_status_created_at
  ON bifrost_shadow_events (bifrost_status, created_at);
