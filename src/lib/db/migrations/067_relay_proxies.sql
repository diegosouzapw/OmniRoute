-- Migration 067: Serverless Relay Proxies
-- Creates tables for relay tokens, rate limits, and usage tracking.

-- Relay tokens: map external API consumers to internal OmniRoute configuration
CREATE TABLE IF NOT EXISTS relay_tokens (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    token_hash TEXT NOT NULL UNIQUE,           -- bcrypt hash of the token
    token_prefix TEXT NOT NULL,                 -- first 8 chars for display (e.g., "rl_abc123")
    description TEXT DEFAULT '',
    combo_id TEXT,                              -- optional: restrict to a specific combo
    allowed_models TEXT DEFAULT '[]',           -- JSON array of model patterns (e.g., ["claude-*", "gpt-*"])
    max_tokens_per_request INTEGER DEFAULT 128000,
    max_requests_per_minute INTEGER DEFAULT 60,
    max_requests_per_day INTEGER DEFAULT 10000,
    max_cost_per_day REAL DEFAULT 0,            -- 0 = unlimited
    enabled INTEGER DEFAULT 1,
    created_at INTEGER NOT NULL,
    updated_at INTEGER NOT NULL,
    expires_at INTEGER,                         -- optional TTL
    last_used_at INTEGER,
    metadata TEXT DEFAULT '{}'
);

-- Rate limit window tracking
CREATE TABLE IF NOT EXISTS relay_rate_limits (
    token_id TEXT NOT NULL,
    window_start INTEGER NOT NULL,              -- unix timestamp of window start
    request_count INTEGER DEFAULT 0,
    cost REAL DEFAULT 0,
    PRIMARY KEY (token_id, window_start),
    FOREIGN KEY (token_id) REFERENCES relay_tokens(id) ON DELETE CASCADE
);

-- Relay request logs
CREATE TABLE IF NOT EXISTS relay_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    token_id TEXT NOT NULL,
    request_id TEXT,                            -- X-Request-Id
    model TEXT,
    prompt_tokens INTEGER DEFAULT 0,
    completion_tokens INTEGER DEFAULT 0,
    cost REAL DEFAULT 0,
    status TEXT DEFAULT 'success',              -- success, rate_limited, auth_failed, error
    status_code INTEGER DEFAULT 200,
    latency_ms INTEGER DEFAULT 0,
    client_ip TEXT,
    user_agent TEXT,
    created_at INTEGER NOT NULL,
    FOREIGN KEY (token_id) REFERENCES relay_tokens(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_relay_logs_token ON relay_logs(token_id, created_at);
CREATE INDEX IF NOT EXISTS idx_relay_logs_created ON relay_logs(created_at);
CREATE INDEX IF NOT EXISTS idx_relay_tokens_prefix ON relay_tokens(token_prefix);
CREATE INDEX IF NOT EXISTS idx_relay_rate_limits_window ON relay_rate_limits(token_id, window_start);
