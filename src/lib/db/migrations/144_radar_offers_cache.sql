-- 144_radar_offers_cache.sql
-- Single-row cache for the separately signed, live-only Radar offers feed.

CREATE TABLE IF NOT EXISTS radar_offers_cache (
  id         INTEGER PRIMARY KEY CHECK (id = 1),
  version    TEXT NOT NULL,
  tier       TEXT NOT NULL CHECK (tier = 'live'),
  payload    TEXT NOT NULL,
  signature  TEXT NOT NULL,
  fetched_at TEXT NOT NULL
);
