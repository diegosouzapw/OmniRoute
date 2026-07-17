-- Migration: Advanced PostgreSQL Extensions
-- Comprehensive extensions for analytics, performance, and data quality

-- ============================================================================
-- PERFORMANCE & MONITORING EXTENSIONS
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS pg_stat_statements;  -- Query performance monitoring
CREATE EXTENSION IF NOT EXISTS pg_buffercache;      -- Buffer cache inspection
CREATE EXTENSION IF NOT EXISTS pgstattuple;         -- Tuple-level statistics

-- ============================================================================
-- DATA PROCESSING EXTENSIONS
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS citext;       -- Case-insensitive text (for emails, usernames)
CREATE EXTENSION IF NOT EXISTS pgcrypto;     -- Encryption, hashing (secure tokens, API keys)
CREATE EXTENSION IF NOT EXISTS hstore;       -- Key-value store in columns
CREATE EXTENSION IF NOT EXISTS ltree;        -- Hierarchical tree structures (role hierarchies)
CREATE EXTENSION IF NOT EXISTS tablefunc;    -- Pivot/crosstab functions
CREATE EXTENSION IF NOT EXISTS intarray;     -- Integer array operations (for IDs)

-- ============================================================================
-- INDEX EXTENSIONS
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS btree_gin;    -- GIN indexes on non-text types
CREATE EXTENSION IF NOT EXISTS btree_gist;   -- GiST indexes for exclusion constraints
CREATE EXTENSION IF NOT EXISTS bloom;        -- Bloom filter indexes (multi-column searches)

-- ============================================================================
-- ADD CITEXT COLUMNS FOR CASE-INSENSITIVE LOOKUPS
-- ============================================================================

-- Model provider (case-insensitive: "OpenAI" = "openai")
ALTER TABLE models 
    ADD COLUMN IF NOT EXISTS provider_ci CITEXT;
UPDATE models SET provider_ci = provider WHERE provider_ci IS NULL;
CREATE INDEX IF NOT EXISTS idx_models_provider_ci ON models(provider_ci);

-- Tool names (case-insensitive lookup)
ALTER TABLE tools
    ADD COLUMN IF NOT EXISTS name_ci CITEXT;
UPDATE tools SET name_ci = name WHERE name_ci IS NULL;
CREATE INDEX IF NOT EXISTS idx_tools_name_ci ON tools(name_ci);

-- ============================================================================
-- HIERARCHICAL ROLE STRUCTURE (ltree)
-- ============================================================================

-- Add ltree path for role hierarchy
ALTER TABLE roles
    ADD COLUMN IF NOT EXISTS path ltree;

-- Function to update role path on insert/update
CREATE OR REPLACE FUNCTION update_role_path() RETURNS TRIGGER AS $$
BEGIN
    IF NEW.parent_role_id IS NULL THEN
        NEW.path = text2ltree(NEW.name);
    ELSE
        SELECT path || text2ltree(NEW.name) INTO NEW.path
        FROM roles WHERE id = NEW.parent_role_id;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_role_path ON roles;
CREATE TRIGGER trg_role_path
    BEFORE INSERT OR UPDATE ON roles
    FOR EACH ROW EXECUTE FUNCTION update_role_path();

-- Indexes for ltree queries
CREATE INDEX IF NOT EXISTS idx_roles_path ON roles USING gist(path);
CREATE INDEX IF NOT EXISTS idx_roles_path_text ON roles USING btree(path);

-- Function: Get all child roles
CREATE OR REPLACE FUNCTION get_child_roles(parent_name TEXT)
RETURNS TABLE(id UUID, name TEXT, path ltree) AS $$
BEGIN
    RETURN QUERY
    SELECT r.id, r.name, r.path
    FROM roles r
    WHERE r.path <@ text2ltree(parent_name);
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- SECURE TOKEN STORAGE (pgcrypto)
-- ============================================================================

-- Function to generate secure random tokens
CREATE OR REPLACE FUNCTION generate_secure_token(length INTEGER DEFAULT 32)
RETURNS TEXT AS $$
BEGIN
    RETURN encode(gen_random_bytes(length), 'hex');
END;
$$ LANGUAGE plpgsql;

-- Function to hash API keys (for storage)
CREATE OR REPLACE FUNCTION hash_api_key(key TEXT)
RETURNS TEXT AS $$
BEGIN
    RETURN encode(digest(key, 'sha256'), 'hex');
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- BLOOM FILTER INDEXES FOR MULTI-COLUMN SEARCHES
-- ============================================================================

-- Bloom index on routing_events for multi-column filter queries
CREATE INDEX IF NOT EXISTS idx_routing_events_bloom ON routing_events 
    USING bloom (user_id, task_type, routing_method, success)
    WITH (length=80, col1=2, col2=2, col3=2, col4=1);

-- ============================================================================
-- JSONB QUERY HELPERS
-- ============================================================================

-- Function to safely extract numeric from JSONB
CREATE OR REPLACE FUNCTION jsonb_extract_numeric(data JSONB, key TEXT, default_val NUMERIC DEFAULT 0)
RETURNS NUMERIC AS $$
BEGIN
    RETURN COALESCE((data->>key)::NUMERIC, default_val);
EXCEPTION WHEN OTHERS THEN
    RETURN default_val;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Function to merge JSONB with priority (right overwrites left)
CREATE OR REPLACE FUNCTION jsonb_merge_deep(left_json JSONB, right_json JSONB)
RETURNS JSONB AS $$
BEGIN
    RETURN left_json || right_json;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- ============================================================================
-- QUERY PERFORMANCE VIEWS
-- ============================================================================

-- View: Slow queries (requires pg_stat_statements)
CREATE OR REPLACE VIEW slow_queries AS
SELECT 
    queryid,
    calls,
    round(total_exec_time::numeric, 2) as total_time_ms,
    round(mean_exec_time::numeric, 2) as avg_time_ms,
    round(stddev_exec_time::numeric, 2) as stddev_time_ms,
    rows,
    query
FROM pg_stat_statements
WHERE mean_exec_time > 100  -- queries averaging > 100ms
ORDER BY mean_exec_time DESC
LIMIT 50;

-- ============================================================================
-- COMMENTS
-- ============================================================================

COMMENT ON EXTENSION pg_stat_statements IS 'Query performance monitoring - run: SELECT * FROM slow_queries;';
COMMENT ON EXTENSION citext IS 'Case-insensitive text for provider/tool lookups';
COMMENT ON EXTENSION pgcrypto IS 'Secure token generation and API key hashing';
COMMENT ON EXTENSION ltree IS 'Hierarchical role paths for efficient traversal';
COMMENT ON EXTENSION bloom IS 'Multi-column bloom filter indexes for routing queries';
