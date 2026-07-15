-- Migration: fleet_config — versioned fleet configuration
CREATE TABLE IF NOT EXISTS fleet_config (
  id TEXT PRIMARY KEY NOT NULL,
  version INTEGER NOT NULL DEFAULT 1,
  config_json TEXT NOT NULL DEFAULT '{}',
  checksum TEXT NOT NULL DEFAULT '',
  applied_by TEXT NOT NULL DEFAULT '',
  applied_at TEXT NOT NULL DEFAULT (datetime('now')),
  status TEXT NOT NULL DEFAULT 'pending'  -- pending, applied, failed, rolled_back
);
CREATE INDEX IF NOT EXISTS idx_fleet_config_version ON fleet_config(version);
CREATE INDEX IF NOT EXISTS idx_fleet_config_status ON fleet_config(status);
