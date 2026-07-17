-- Rollback migration: advanced_extensions
-- Drops views, functions, indexes, columns, and extensions created in migration 005

-- Drop views
DROP VIEW IF EXISTS slow_queries;

-- Drop functions
DROP FUNCTION IF EXISTS jsonb_merge_deep(JSONB, JSONB);
DROP FUNCTION IF EXISTS jsonb_extract_numeric(JSONB, TEXT, NUMERIC);
DROP FUNCTION IF EXISTS hash_api_key(TEXT);
DROP FUNCTION IF EXISTS generate_secure_token(INTEGER);
DROP FUNCTION IF EXISTS get_child_roles(TEXT);
DROP FUNCTION IF EXISTS update_role_path();

-- Drop triggers
DROP TRIGGER IF EXISTS trg_role_path ON roles;

-- Drop indexes
DROP INDEX IF EXISTS idx_routing_events_bloom;
DROP INDEX IF EXISTS idx_roles_path_text;
DROP INDEX IF EXISTS idx_roles_path;
DROP INDEX IF EXISTS idx_tools_name_ci;
DROP INDEX IF EXISTS idx_models_provider_ci;

-- Drop columns
ALTER TABLE tools DROP COLUMN IF EXISTS name_ci;
ALTER TABLE models DROP COLUMN IF EXISTS provider_ci;
ALTER TABLE roles DROP COLUMN IF EXISTS path;

-- Drop extensions (in reverse order)
DROP EXTENSION IF EXISTS bloom;
DROP EXTENSION IF EXISTS btree_gist;
DROP EXTENSION IF EXISTS btree_gin;
DROP EXTENSION IF EXISTS intarray;
DROP EXTENSION IF EXISTS tablefunc;
DROP EXTENSION IF EXISTS ltree;
DROP EXTENSION IF EXISTS hstore;
DROP EXTENSION IF EXISTS pgcrypto;
DROP EXTENSION IF EXISTS citext;
DROP EXTENSION IF EXISTS pgstattuple;
DROP EXTENSION IF EXISTS pg_buffercache;
DROP EXTENSION IF EXISTS pg_stat_statements;
