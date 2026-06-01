-- Migration 077: Discovery results table
-- Stores discovered free-tier provider access methods

CREATE TABLE IF NOT EXISTS discovery_results (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  provider_id TEXT NOT NULL,
  method TEXT NOT NULL CHECK (method IN ('free_tier', 'web_cookie', 'auto_register', 'trial', 'public_api')),
  auth_type TEXT NOT NULL CHECK (auth_type IN ('none', 'cookie', 'api_key', 'oauth')),
  endpoint TEXT,
  models_json TEXT DEFAULT '[]',
  rate_limit TEXT,
  feasibility INTEGER DEFAULT 1 CHECK (feasibility BETWEEN 1 AND 5),
  risk_level TEXT DEFAULT 'none' CHECK (risk_level IN ('none', 'low', 'medium', 'high', 'critical')),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'testing', 'verified', 'rejected')),
  notes TEXT,
  discovered_at TEXT NOT NULL DEFAULT (datetime('now')),
  verified_at TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_discovery_results_provider ON discovery_results(provider_id);
CREATE INDEX IF NOT EXISTS idx_discovery_results_status ON discovery_results(status);
