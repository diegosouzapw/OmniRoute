-- 001_initial_schema.sql
-- Initial schema for OmniRoute SQLite database.
-- This migration is automatically marked as applied for existing databases
-- since the schema was previously applied via CREATE TABLE IF NOT EXISTS.

CREATE TABLE IF NOT EXISTS provider_connections (
  id TEXT PRIMARY KEY,
  provider TEXT NOT NULL,
  auth_type TEXT,
  name TEXT,
  email TEXT,
  priority INTEGER DEFAULT 0,
  is_active INTEGER DEFAULT 1,
  access_token TEXT,
  refresh_token TEXT,
  expires_at TEXT,
  token_expires_at TEXT,
  scope TEXT,
  project_id TEXT,
  test_status TEXT,
  error_code TEXT,
  last_error TEXT,
  last_error_at TEXT,
  last_error_type TEXT,
  last_error_source TEXT,
  backoff_level INTEGER DEFAULT 0,
  rate_limited_until TEXT,
  health_check_interval INTEGER,
  last_health_check_at TEXT,
  last_tested TEXT,
  api_key TEXT,
  id_token TEXT,
  provider_specific_data TEXT,
  expires_in INTEGER,
  display_name TEXT,
  global_priority INTEGER,
  default_model TEXT,
  token_type TEXT,
  consecutive_use_count INTEGER DEFAULT 0,
  rate_limit_protection INTEGER DEFAULT 0,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_pc_provider ON provider_connections(provider);
CREATE INDEX IF NOT EXISTS idx_pc_active ON provider_connections(is_active);
CREATE INDEX IF NOT EXISTS idx_pc_priority ON provider_connections(provider, priority);

CREATE TABLE IF NOT EXISTS provider_nodes (
  id TEXT PRIMARY KEY,
  type TEXT NOT NULL,
  name TEXT NOT NULL,
  prefix TEXT,
  api_type TEXT,
  base_url TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS key_value (
  namespace TEXT NOT NULL,
  key TEXT NOT NULL,
  value TEXT NOT NULL,
  PRIMARY KEY (namespace, key)
);

CREATE TABLE IF NOT EXISTS combos (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  data TEXT NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS api_keys (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  key TEXT NOT NULL UNIQUE,
  machine_id TEXT,
  created_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_ak_key ON api_keys(key);

CREATE TABLE IF NOT EXISTS db_meta (
  key TEXT PRIMARY KEY,
  value TEXT
);

CREATE TABLE IF NOT EXISTS usage_history (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  provider TEXT,
  model TEXT,
  connection_id TEXT,
  api_key_id TEXT,
  api_key_name TEXT,
  tokens_input INTEGER DEFAULT 0,
  tokens_output INTEGER DEFAULT 0,
  tokens_cache_read INTEGER DEFAULT 0,
  tokens_cache_creation INTEGER DEFAULT 0,
  tokens_reasoning INTEGER DEFAULT 0,
  service_tier TEXT DEFAULT 'standard',
  status TEXT,
  success INTEGER DEFAULT 1,
  latency_ms INTEGER DEFAULT 0,
  ttft_ms INTEGER DEFAULT 0,
  error_code TEXT,
  timestamp TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_uh_timestamp ON usage_history(timestamp);
CREATE INDEX IF NOT EXISTS idx_uh_provider ON usage_history(provider);
CREATE INDEX IF NOT EXISTS idx_uh_model ON usage_history(model);
CREATE INDEX IF NOT EXISTS idx_uh_service_tier ON usage_history(service_tier);

CREATE TABLE IF NOT EXISTS call_logs (
  id TEXT PRIMARY KEY,
  timestamp TEXT NOT NULL,
  method TEXT,
  path TEXT,
  status INTEGER,
  model TEXT,
  requested_model TEXT,
  provider TEXT,
  account TEXT,
  connection_id TEXT,
  duration INTEGER DEFAULT 0,
  tokens_in INTEGER DEFAULT 0,
  tokens_out INTEGER DEFAULT 0,
  tokens_cache_read INTEGER DEFAULT NULL,
  tokens_cache_creation INTEGER DEFAULT NULL,
  tokens_reasoning INTEGER DEFAULT NULL,
  cache_source TEXT DEFAULT 'upstream',
  request_type TEXT,
  source_format TEXT,
  target_format TEXT,
  api_key_id TEXT,
  api_key_name TEXT,
  combo_name TEXT,
  combo_step_id TEXT,
  combo_execution_key TEXT,
  error_summary TEXT,
  detail_state TEXT DEFAULT 'none',
  artifact_relpath TEXT,
  artifact_size_bytes INTEGER DEFAULT NULL,
  artifact_sha256 TEXT DEFAULT NULL,
  has_request_body INTEGER DEFAULT 0,
  has_response_body INTEGER DEFAULT 0,
  has_pipeline_details INTEGER DEFAULT 0,
  request_summary TEXT
);
CREATE INDEX IF NOT EXISTS idx_cl_timestamp ON call_logs(timestamp);
CREATE INDEX IF NOT EXISTS idx_cl_status ON call_logs(status);
CREATE INDEX IF NOT EXISTS idx_call_logs_requested_model ON call_logs(requested_model);
CREATE INDEX IF NOT EXISTS idx_call_logs_request_type ON call_logs(request_type);
CREATE INDEX IF NOT EXISTS idx_cl_combo_target
  ON call_logs(combo_name, combo_execution_key, timestamp);

CREATE TABLE IF NOT EXISTS proxy_logs (
  id TEXT PRIMARY KEY,
  timestamp TEXT NOT NULL,
  status TEXT,
  proxy_type TEXT,
  proxy_host TEXT,
  proxy_port INTEGER,
  level TEXT,
  level_id TEXT,
  provider TEXT,
  target_url TEXT,
  public_ip TEXT,
  latency_ms INTEGER DEFAULT 0,
  error TEXT,
  connection_id TEXT,
  combo_id TEXT,
  account TEXT,
  tls_fingerprint INTEGER DEFAULT 0
);
CREATE INDEX IF NOT EXISTS idx_pl_timestamp ON proxy_logs(timestamp);
CREATE INDEX IF NOT EXISTS idx_pl_status ON proxy_logs(status);
CREATE INDEX IF NOT EXISTS idx_pl_provider ON proxy_logs(provider);

CREATE TABLE IF NOT EXISTS domain_fallback_chains (
  model TEXT PRIMARY KEY,
  chain TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS domain_budgets (
  api_key_id TEXT PRIMARY KEY,
  daily_limit_usd REAL NOT NULL,
  monthly_limit_usd REAL DEFAULT 0,
  warning_threshold REAL DEFAULT 0.8
);

CREATE TABLE IF NOT EXISTS domain_cost_history (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  api_key_id TEXT NOT NULL,
  cost REAL NOT NULL,
  timestamp INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_dch_key ON domain_cost_history(api_key_id);
CREATE INDEX IF NOT EXISTS idx_dch_ts ON domain_cost_history(timestamp);

CREATE TABLE IF NOT EXISTS domain_lockout_state (
  identifier TEXT PRIMARY KEY,
  attempts TEXT NOT NULL,
  locked_until INTEGER
);

CREATE TABLE IF NOT EXISTS domain_circuit_breakers (
  name TEXT PRIMARY KEY,
  state TEXT NOT NULL DEFAULT 'CLOSED',
  failure_count INTEGER DEFAULT 0,
  last_failure_time INTEGER,
  options TEXT
);

CREATE TABLE IF NOT EXISTS semantic_cache (
  id TEXT PRIMARY KEY,
  signature TEXT NOT NULL UNIQUE,
  model TEXT NOT NULL,
  prompt_hash TEXT NOT NULL,
  response TEXT NOT NULL,
  tokens_saved INTEGER DEFAULT 0,
  hit_count INTEGER DEFAULT 0,
  created_at TEXT NOT NULL,
  expires_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_sc_sig ON semantic_cache(signature);
CREATE INDEX IF NOT EXISTS idx_sc_model ON semantic_cache(model);
