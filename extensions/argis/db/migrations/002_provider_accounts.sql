-- Migration: Provider Accounts & Endpoints
-- Implements the 3-tier model: provider_accounts -> model_endpoints -> usage tracking

-- ============================================================================
-- PROVIDER ACCOUNTS (Billing Entities)
-- ============================================================================

-- Provider accounts represent billing relationships (subscriptions, API keys, etc.)
CREATE TABLE provider_accounts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL UNIQUE,        -- e.g., 'cliproxy_glm_plan', 'cerebras_sub', 'openai_direct'
    backend_type TEXT NOT NULL CHECK (backend_type IN ('cliproxy', 'agentapi', 'direct', 'local')),
    billing_model TEXT NOT NULL CHECK (billing_model IN (
        'per_token',           -- Standard token-based pricing
        'per_request',         -- Flat fee per request
        'subscription_bucket', -- Fixed allocation per period
        'credits',             -- Credit-based system
        'percent_only',        -- Only tracks % remaining (no absolute numbers)
        'scarce_premium'       -- Limited/expensive resource (use sparingly)
    )),
    base_currency TEXT DEFAULT 'USD',
    subscription_fee_monthly NUMERIC(10,2),
    is_active BOOLEAN DEFAULT true,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Rate limits per account (can have multiple limit types)
CREATE TABLE provider_account_limits (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    account_id UUID NOT NULL REFERENCES provider_accounts(id) ON DELETE CASCADE,
    limit_type TEXT NOT NULL CHECK (limit_type IN (
        'tokens_per_min',
        'tokens_per_hour',
        'tokens_per_day',
        'requests_per_min',
        'requests_per_hour',
        'requests_per_day',
        'credits_per_month',
        'credits_per_period'
    )),
    window_seconds INTEGER NOT NULL,  -- e.g., 60 for per_min, 86400 for per_day
    limit_value NUMERIC NOT NULL,     -- the actual limit
    is_hard BOOLEAN DEFAULT true,     -- hard limit vs soft/advisory
    cooldown_seconds INTEGER DEFAULT 60, -- how long to wait after hitting limit
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(account_id, limit_type)
);

-- ============================================================================
-- MODEL ENDPOINTS (Specific Routes to Access Models)
-- ============================================================================

-- Model endpoints represent specific ways to access a model via an account
CREATE TABLE model_endpoints (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    account_id UUID NOT NULL REFERENCES provider_accounts(id) ON DELETE CASCADE,
    model_id UUID NOT NULL REFERENCES models(id) ON DELETE CASCADE,
    
    -- Transport configuration
    transport TEXT NOT NULL CHECK (transport IN (
        'openai',           -- Direct OpenAI API
        'anthropic',        -- Direct Anthropic API
        'cliproxy_openai',  -- CLIProxyAPI OpenAI-compatible
        'cliproxy_native',  -- CLIProxyAPI native format
        'agentapi',         -- AgentAPI terminal control
        'local_http',       -- Local HTTP server (SLMs)
        'bifrost_provider'  -- Another Bifrost provider
    )),
    upstream_route TEXT,              -- CLIProxy route alias or AgentAPI agent ID
    base_url TEXT,                    -- Override base URL if needed
    
    -- Pricing
    pricing_basis TEXT CHECK (pricing_basis IN ('tokens', 'requests', 'credits', 'included')),
    unit_price_input NUMERIC(10,8),   -- Cost per unit (input)
    unit_price_output NUMERIC(10,8),  -- Cost per unit (output)
    
    -- Performance estimates
    latency_estimate_ms INTEGER,
    throughput_tps NUMERIC(8,2),      -- Tokens per second
    
    -- Routing hints
    priority INTEGER DEFAULT 0,        -- Higher = preferred when costs equal
    quality_tier TEXT DEFAULT 'standard' CHECK (quality_tier IN ('budget', 'standard', 'premium', 'experimental')),
    
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'cooldown', 'deprecated')),
    cooldown_until TIMESTAMPTZ,       -- If in cooldown, when it ends
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(account_id, model_id, transport)
);

-- ============================================================================
-- USAGE TRACKING
-- ============================================================================

-- Usage snapshots per account per time window
CREATE TABLE account_usage_snapshots (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    account_id UUID NOT NULL REFERENCES provider_accounts(id) ON DELETE CASCADE,
    endpoint_id UUID REFERENCES model_endpoints(id) ON DELETE SET NULL,  -- optional, for per-endpoint tracking
    
    window_type TEXT NOT NULL CHECK (window_type IN (
        'minute', 'hour', 'day', 'week', 'month', 'subscription_period'
    )),
    window_start TIMESTAMPTZ NOT NULL,
    window_end TIMESTAMPTZ NOT NULL,
    
    -- Usage counters
    tokens_in BIGINT DEFAULT 0,
    tokens_out BIGINT DEFAULT 0,
    requests INTEGER DEFAULT 0,
    credits_used NUMERIC(12,4) DEFAULT 0,
    cost_usd NUMERIC(12,6) DEFAULT 0,
    
    -- For percent-only APIs
    percent_remaining NUMERIC(5,2),
    
    -- Metadata
    last_refreshed_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    
    UNIQUE(account_id, endpoint_id, window_type, window_start)
);

-- Endpoint health/status tracking
CREATE TABLE endpoint_health (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    endpoint_id UUID NOT NULL REFERENCES model_endpoints(id) ON DELETE CASCADE,
    
    -- Health metrics
    consecutive_failures INTEGER DEFAULT 0,
    consecutive_successes INTEGER DEFAULT 0,
    last_success_at TIMESTAMPTZ,
    last_failure_at TIMESTAMPTZ,
    last_error TEXT,
    
    -- Performance metrics (rolling)
    avg_latency_ms INTEGER,
    p95_latency_ms INTEGER,
    success_rate NUMERIC(5,4),        -- 0.0 to 1.0
    
    -- Status
    is_healthy BOOLEAN DEFAULT true,
    health_check_at TIMESTAMPTZ DEFAULT NOW(),
    
    UNIQUE(endpoint_id)
);

-- ============================================================================
-- INDEXES
-- ============================================================================

CREATE INDEX idx_provider_accounts_active ON provider_accounts(is_active) WHERE is_active = true;
CREATE INDEX idx_model_endpoints_account ON model_endpoints(account_id);
CREATE INDEX idx_model_endpoints_model ON model_endpoints(model_id);
CREATE INDEX idx_model_endpoints_status ON model_endpoints(status) WHERE status = 'active';
CREATE INDEX idx_usage_snapshots_account_window ON account_usage_snapshots(account_id, window_type, window_start);
CREATE INDEX idx_endpoint_health_endpoint ON endpoint_health(endpoint_id);

