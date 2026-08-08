-- 142_radar_referrals_cache.sql
-- Radar referrals client local cache table.
--
-- radar_referrals_cache: single-row table holding the last verified
--   referrals feed JSON, fetched from GET /v1/referrals/latest — a separate,
--   always-current artifact from the catalog feed cached in
--   radar_feed_cache (migration 136). Introduced so referral links no
--   longer inherit the catalog's up-to-30-day community-tier snapshot
--   delay. The payload is the exact byte-identical feed returned by the
--   Radar server after Ed25519 signature verification (same pinned key as
--   the catalog feed).

CREATE TABLE IF NOT EXISTS radar_referrals_cache (
  id           INTEGER PRIMARY KEY CHECK (id = 1),
  generated_at TEXT,
  tier         TEXT,
  payload      TEXT,
  signature    TEXT,
  fetched_at   TEXT
);
