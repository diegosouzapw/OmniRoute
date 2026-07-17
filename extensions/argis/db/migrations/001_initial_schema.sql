-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "vector";

-- ============================================================================
-- MODELS & CAPABILITIES
-- ============================================================================

-- Core model registry
CREATE TABLE models (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    provider TEXT NOT NULL,           -- anthropic, openai, google, etc.
    model_name TEXT NOT NULL,         -- claude-3-5-sonnet, gpt-4o, etc.
    display_name TEXT,
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'shadow', 'deprecated')),
    context_window INTEGER NOT NULL DEFAULT 128000,
    max_output_tokens INTEGER,
    supports_tools BOOLEAN DEFAULT true,
    supports_vision BOOLEAN DEFAULT false,
    supports_streaming BOOLEAN DEFAULT true,
    input_cost_per_1k NUMERIC(10,6),  -- cost per 1k input tokens
    output_cost_per_1k NUMERIC(10,6), -- cost per 1k output tokens
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(provider, model_name)
);

-- Model benchmark metrics (from artificialanalysis.ai, LMSYS, etc.)
CREATE TABLE model_metrics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    model_id UUID NOT NULL REFERENCES models(id) ON DELETE CASCADE,
    metric_source TEXT NOT NULL,      -- artificialanalysis, lmsys, internal
    intelligence_index NUMERIC(5,2),  -- 0-100 composite score
    gpqa_diamond NUMERIC(5,2),        -- PhD-level science
    aime_2024 NUMERIC(5,2),           -- Math competition
    hle NUMERIC(5,2),                 -- Humanity's Last Exam
    musr NUMERIC(5,2),                -- Multi-step reasoning
    humaneval NUMERIC(5,2),           -- Code synthesis
    livecodebench NUMERIC(5,2),       -- Code generation
    chatbot_arena_elo INTEGER,        -- LMSYS ELO
    avg_latency_ms INTEGER,           -- Average response latency
    throughput_tps NUMERIC(8,2),      -- Tokens per second
    collected_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(model_id, metric_source)
);

-- IRT/MIRT ability vectors per model
CREATE TABLE model_abilities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    model_id UUID NOT NULL REFERENCES models(id) ON DELETE CASCADE,
    -- Ability dimensions (IRT theta parameters)
    reasoning NUMERIC(5,3) DEFAULT 0,
    coding NUMERIC(5,3) DEFAULT 0,
    math NUMERIC(5,3) DEFAULT 0,
    writing NUMERIC(5,3) DEFAULT 0,
    analysis NUMERIC(5,3) DEFAULT 0,
    creativity NUMERIC(5,3) DEFAULT 0,
    instruction_following NUMERIC(5,3) DEFAULT 0,
    multilingual NUMERIC(5,3) DEFAULT 0,
    -- Calibration metadata
    calibrated_at TIMESTAMPTZ,
    sample_count INTEGER DEFAULT 0,
    UNIQUE(model_id)
);

-- Semantic model profiles (embeddings + traits)
CREATE TABLE model_semantic_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    model_id UUID NOT NULL REFERENCES models(id) ON DELETE CASCADE,
    description TEXT,                 -- Human-readable description
    description_embedding vector(1536), -- Embedding of description
    strengths TEXT[],                 -- ["fast", "cheap", "good at code"]
    weaknesses TEXT[],                -- ["hallucinates", "verbose"]
    best_for TEXT[],                  -- ["quick tasks", "prototyping"]
    avoid_for TEXT[],                 -- ["legal", "medical"]
    personality_traits JSONB,         -- {"formal": 0.8, "concise": 0.6}
    community_sentiment NUMERIC(3,2), -- -1 to 1, from HN/Reddit analysis
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(model_id)
);

-- ============================================================================
-- TOOLS & TOOL ROUTING
-- ============================================================================

-- Tool registry (MCP tools, function calls, etc.)
CREATE TABLE tools (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL UNIQUE,
    provider TEXT NOT NULL,           -- mcp_server_name or 'builtin'
    description TEXT,
    schema_json JSONB,                -- JSON schema for parameters
    avg_latency_ms INTEGER,
    avg_cost NUMERIC(10,6),
    risk_level TEXT DEFAULT 'low' CHECK (risk_level IN ('low', 'medium', 'high', 'critical')),
    requires_confirmation BOOLEAN DEFAULT false,
    rate_limit_per_min INTEGER,
    status TEXT NOT NULL DEFAULT 'active',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tool semantic profiles
CREATE TABLE tool_semantic_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tool_id UUID NOT NULL REFERENCES tools(id) ON DELETE CASCADE,
    description_embedding vector(1536),
    suitable_for TEXT[],              -- ["file operations", "web scraping"]
    requires_context TEXT[],          -- ["file path", "url"]
    output_type TEXT,                 -- "text", "json", "binary"
    side_effects BOOLEAN DEFAULT false,
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(tool_id)
);

-- Tool performance metrics
CREATE TABLE tool_metrics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tool_id UUID NOT NULL REFERENCES tools(id) ON DELETE CASCADE,
    success_rate NUMERIC(5,4),        -- 0.0 to 1.0
    avg_execution_ms INTEGER,
    p95_execution_ms INTEGER,
    error_rate NUMERIC(5,4),
    last_success_at TIMESTAMPTZ,
    last_failure_at TIMESTAMPTZ,
    total_invocations INTEGER DEFAULT 0,
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(tool_id)
);

-- ============================================================================
-- ROLES & POLICIES (complements Neo4j graph)
-- ============================================================================

-- Role definitions
CREATE TABLE roles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL UNIQUE,        -- "code_review", "creative_writing", etc.
    description TEXT,
    parent_role_id UUID REFERENCES roles(id),
    default_model_id UUID REFERENCES models(id),
    max_tokens INTEGER,
    max_cost_per_request NUMERIC(10,6),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Model-Role suitability scores
CREATE TABLE model_role_scores (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    model_id UUID NOT NULL REFERENCES models(id) ON DELETE CASCADE,
    role_id UUID NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
    suitability_score NUMERIC(5,4),   -- 0.0 to 1.0
    source TEXT,                      -- "benchmark", "feedback", "manual"
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(model_id, role_id)
);

-- Tool-Role suitability
CREATE TABLE tool_role_scores (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tool_id UUID NOT NULL REFERENCES tools(id) ON DELETE CASCADE,
    role_id UUID NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
    suitability_score NUMERIC(5,4),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(tool_id, role_id)
);


-- ============================================================================
-- BANDIT STATE & EXPLORATION
-- ============================================================================

-- Thompson Sampling bandit state per (model, role)
CREATE TABLE bandit_state (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    model_id UUID NOT NULL REFERENCES models(id) ON DELETE CASCADE,
    role_id UUID REFERENCES roles(id) ON DELETE CASCADE, -- NULL = global
    alpha NUMERIC(10,4) DEFAULT 1.0,  -- Beta distribution alpha (successes + 1)
    beta NUMERIC(10,4) DEFAULT 1.0,   -- Beta distribution beta (failures + 1)
    total_trials INTEGER DEFAULT 0,
    last_updated TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(model_id, role_id)
);

-- ============================================================================
-- ROUTING EVENTS & FEEDBACK
-- ============================================================================

-- Routing decision log
CREATE TABLE routing_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    request_id UUID NOT NULL,
    user_id TEXT,
    org_id TEXT,
    role_id UUID REFERENCES roles(id),
    task_type TEXT,                   -- classification from semantic router
    difficulty_estimate NUMERIC(5,3), -- MIRT difficulty
    selected_model_id UUID REFERENCES models(id),
    fallback_models UUID[],           -- ordered fallback list
    routing_method TEXT,              -- "arch", "routellm", "benchmark", "bandit"
    routing_latency_ms INTEGER,
    model_latency_ms INTEGER,
    tokens_used INTEGER,
    cost NUMERIC(10,6),
    success BOOLEAN,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- User feedback for learning
CREATE TABLE feedback (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    routing_event_id UUID REFERENCES routing_events(id),
    user_id TEXT,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    feedback_type TEXT,               -- "thumbs", "rating", "regenerate", "edit"
    was_regenerated BOOLEAN DEFAULT false,
    was_edited BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- CONTEXT & DOCUMENTS
-- ============================================================================

-- Conversation segments for context folding
CREATE TABLE conversation_segments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    conversation_id UUID NOT NULL,
    segment_index INTEGER NOT NULL,
    role TEXT NOT NULL,               -- "user", "assistant", "system"
    content TEXT NOT NULL,
    token_count INTEGER,
    summary TEXT,                     -- Compressed version
    summary_token_count INTEGER,
    embedding vector(1536),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(conversation_id, segment_index)
);

-- Document chunks for RAG
CREATE TABLE document_chunks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    document_id UUID NOT NULL,
    chunk_index INTEGER NOT NULL,
    content TEXT NOT NULL,
    token_count INTEGER,
    embedding vector(1536),
    metadata JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(document_id, chunk_index)
);

-- ============================================================================
-- INDEXES
-- ============================================================================

-- Vector similarity indexes (IVFFlat for speed)
CREATE INDEX idx_model_semantic_embedding ON model_semantic_profiles
    USING ivfflat (description_embedding vector_cosine_ops) WITH (lists = 100);

CREATE INDEX idx_tool_semantic_embedding ON tool_semantic_profiles
    USING ivfflat (description_embedding vector_cosine_ops) WITH (lists = 100);

CREATE INDEX idx_conversation_embedding ON conversation_segments
    USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);

CREATE INDEX idx_document_embedding ON document_chunks
    USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);

-- Lookup indexes
CREATE INDEX idx_models_provider ON models(provider);
CREATE INDEX idx_models_status ON models(status);
CREATE INDEX idx_routing_events_created ON routing_events(created_at DESC);
CREATE INDEX idx_routing_events_user ON routing_events(user_id);
CREATE INDEX idx_bandit_model_role ON bandit_state(model_id, role_id);
CREATE INDEX idx_conversation_segments_conv ON conversation_segments(conversation_id);

