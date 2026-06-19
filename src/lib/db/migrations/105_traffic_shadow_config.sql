-- Migration 105: Traffic-shadow config (B6 of v8.1 Bifrost track, ADR-031)
--
-- Single-row configuration for the Bifrost traffic-shadow ramp. Default row
-- (id=1) is inserted on migration; the in-memory SHADOW_RAMP_PHASES table in
-- src/shared/constants/shadowRamp.ts is the source of truth for the 5 phases,
-- while this table persists the operator-controllable state:
--   - current_phase: which of the 5 phases is active
--   - ramp_started_at: when the current ramp began (anchor for phase lookups)
--   - bifrost_serve_pct_override: optional per-deploy override (0-100, NULL=use phase)
--   - paused: operator pause switch; 1 = serve legacy on all shadow requests
--   - updated_at: last write

CREATE TABLE IF NOT EXISTS traffic_shadow_config (
  id INTEGER PRIMARY KEY CHECK (id = 1),
  current_phase TEXT NOT NULL DEFAULT 'observe-only',
  ramp_started_at TEXT NOT NULL DEFAULT (datetime('now')),
  bifrost_serve_pct_override INTEGER,
  paused INTEGER NOT NULL DEFAULT 0,
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

INSERT OR IGNORE INTO traffic_shadow_config (id, current_phase, ramp_started_at, paused)
VALUES (1, 'observe-only', datetime('now'), 0);
