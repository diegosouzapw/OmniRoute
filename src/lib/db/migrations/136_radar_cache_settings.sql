-- 136_radar_cache_settings.sql
-- Radar client local cache and settings tables.
--
-- radar_feed_cache: single-row table holding the last verified feed JSON
--   (community or live tier). The payload is the exact byte-identical feed
--   returned by the Radar server after Ed25519 signature verification.
--
-- radar_settings: single-row table holding the operator's opt-in state and
--   an optional supporter key (encrypted at rest with AES-256-GCM via the
--   same mechanism used for provider connection credentials).

CREATE TABLE IF NOT EXISTS radar_feed_cache (
  id         INTEGER PRIMARY KEY CHECK (id = 1),
  version    TEXT,
  tier       TEXT,
  payload    TEXT,
  signature  TEXT,
  fetched_at TEXT
);

CREATE TABLE IF NOT EXISTS radar_settings (
  id                      INTEGER PRIMARY KEY CHECK (id = 1),
  opt_in                  INTEGER NOT NULL DEFAULT 0,
  supporter_key_encrypted TEXT,
  updated_at              TEXT
);

-- Seed the single row so reads never return "no row" for settings
INSERT OR IGNORE INTO radar_settings (id, opt_in, supporter_key_encrypted, updated_at)
VALUES (1, 0, NULL, datetime('now'));
