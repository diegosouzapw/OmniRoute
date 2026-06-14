-- Discovery results table for automated provider discovery
CREATE TABLE IF NOT EXISTS discovery_results (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  provider_id TEXT NOT NULL,
  method TEXT NOT NULL CHECK(method IN ('free_tier', 'web_cookie', 'auto_register', 'trial', 'public_api')),
  endpoint TEXT,
  auth_type TEXT CHECK(auth_type IN ('none', 'cookie', 'api_key', 'oauth')),
  models TEXT, -- JSON array
  rate_limit TEXT,
  feasibility INTEGER CHECK(feasibility BETWEEN 1 AND 5),
  risk_level TEXT CHECK(risk_level IN ('none', 'low', 'medium', 'high', 'critical')),
  status TEXT DEFAULT 'pending' CHECK(status IN ('pending', 'testing', 'verified', 'rejected')),
  notes TEXT,
  discovered_at TEXT DEFAULT (datetime('now')),
  verified_at TEXT,
  UNIQUE(provider_id, method, endpoint)
);

CREATE INDEX IF NOT EXISTS idx_discovery_results_provider ON discovery_results(provider_id);
CREATE INDEX IF NOT EXISTS idx_discovery_results_status ON discovery_results(status);
