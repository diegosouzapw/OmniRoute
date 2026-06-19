-- Migration 104: Traffic-shadow log table (B6 of v8.1 Bifrost track, ADR-031)
--
-- Per-request comparison log for the Bifrost Tier-1 router rollout. Each row
-- records the parallel invocation of the legacy chatCore path and the Bifrost
-- path on the same request, so operators can compare latency / cost / status
-- side-by-side during the 5-phase ramp (observe-only → 5% → 25% → 50% → 100%).
--
-- Index strategy:
--   - (occurred_at): dashboard time-series queries
--   - (served_path, occurred_at): per-path p50/p95/p99 latency aggregations
--   - (provider, occurred_at): per-provider divergence drilldowns
--
-- Best-effort write — failure to log must not affect the user-visible response
-- (see open-sse/services/trafficShadow.ts).

CREATE TABLE IF NOT EXISTS traffic_shadow_log (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  occurred_at TEXT NOT NULL DEFAULT (datetime('now')),
  virtual_key_id TEXT,
  provider TEXT NOT NULL,
  model TEXT NOT NULL,
  phase TEXT NOT NULL,
  legacy_latency_ms INTEGER,
  legacy_cost_usd REAL,
  legacy_status INTEGER,
  bifrost_latency_ms INTEGER,
  bifrost_cost_usd REAL,
  bifrost_status INTEGER,
  divergence_score REAL NOT NULL DEFAULT 0,
  served_path TEXT NOT NULL CHECK (served_path IN ('legacy', 'bifrost')),
  notes TEXT
);

CREATE INDEX IF NOT EXISTS idx_tsl_occurred_at ON traffic_shadow_log(occurred_at);
CREATE INDEX IF NOT EXISTS idx_tsl_served_path_occurred_at
  ON traffic_shadow_log(served_path, occurred_at);
CREATE INDEX IF NOT EXISTS idx_tsl_provider_occurred_at
  ON traffic_shadow_log(provider, occurred_at);
