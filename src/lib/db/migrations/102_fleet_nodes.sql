-- Migration: fleet_nodes — distributed fleet node management
CREATE TABLE IF NOT EXISTS fleet_nodes (
  id TEXT PRIMARY KEY NOT NULL,
  hostname TEXT NOT NULL,
  region TEXT NOT NULL DEFAULT '',
  zone TEXT NOT NULL DEFAULT '',
  version TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'online',  -- online, draining, offline, decommissioned
  role TEXT NOT NULL DEFAULT 'omniroute',  -- omniroute, bifrost, agent
  cpu_cores INTEGER NOT NULL DEFAULT 0,
  memory_total_bytes INTEGER NOT NULL DEFAULT 0,
  gpu_count INTEGER NOT NULL DEFAULT 0,
  labels_json TEXT NOT NULL DEFAULT '{}',
  ip_address TEXT NOT NULL DEFAULT '',
  agent_port INTEGER NOT NULL DEFAULT 9099,
  last_heartbeat TEXT,
  first_seen TEXT NOT NULL DEFAULT (datetime('now')),
  last_seen TEXT NOT NULL DEFAULT (datetime('now')),
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_fleet_nodes_status ON fleet_nodes(status);
CREATE INDEX IF NOT EXISTS idx_fleet_nodes_region ON fleet_nodes(region);
CREATE INDEX IF NOT EXISTS idx_fleet_nodes_last_heartbeat ON fleet_nodes(last_heartbeat);
