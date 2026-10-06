-- 153_radar_local_model_state.sql
-- Operator-owned Radar catalog state.
--
-- Overrides are intentionally limited to display_name and enabled. A
-- tombstone is stored independently so clearing an override cannot
-- accidentally resurrect a model the operator explicitly hid.

CREATE TABLE IF NOT EXISTS radar_local_model_state (
  provider     TEXT NOT NULL,
  model_id     TEXT NOT NULL,
  display_name TEXT,
  enabled      INTEGER CHECK (enabled IS NULL OR enabled IN (0, 1)),
  tombstoned   INTEGER NOT NULL DEFAULT 0 CHECK (tombstoned IN (0, 1)),
  updated_at   TEXT NOT NULL DEFAULT (datetime('now')),
  PRIMARY KEY (provider, model_id)
);
