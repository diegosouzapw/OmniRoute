-- Migration: scaling_policies — auto-scaling policy definitions
CREATE TABLE IF NOT EXISTS scaling_policies (
  id TEXT PRIMARY KEY NOT NULL,
  name TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  metric TEXT NOT NULL,  -- queue_depth, token_throughput, error_rate, p95_latency, cpu, memory
  threshold REAL NOT NULL,
  min_replicas INTEGER NOT NULL DEFAULT 2,
  max_replicas INTEGER NOT NULL DEFAULT 20,
  cooldown_seconds INTEGER NOT NULL DEFAULT 60,
  scale_up_policy_json TEXT NOT NULL DEFAULT '{}',
  scale_down_policy_json TEXT NOT NULL DEFAULT '{}',
  is_active INTEGER NOT NULL DEFAULT 1,
  created_by TEXT NOT NULL DEFAULT '',
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_scaling_policies_active ON scaling_policies(is_active);
CREATE INDEX IF NOT EXISTS idx_scaling_policies_metric ON scaling_policies(metric);
