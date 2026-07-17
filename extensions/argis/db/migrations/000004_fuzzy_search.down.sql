-- Rollback migration: fuzzy_search
-- Drops functions, indexes, and extensions created in migration 004

-- Drop functions
DROP FUNCTION IF EXISTS fuzzy_search_unaccent(TEXT, TEXT, TEXT);
DROP FUNCTION IF EXISTS hybrid_search_documents(TEXT, vector, REAL, REAL, INTEGER);
DROP FUNCTION IF EXISTS fuzzy_find_tool(TEXT, REAL);
DROP FUNCTION IF EXISTS fuzzy_find_model(TEXT, REAL);

-- Drop indexes
DROP INDEX IF EXISTS idx_document_chunks_content_trgm;
DROP INDEX IF EXISTS idx_documents_title_trgm;
DROP INDEX IF EXISTS idx_roles_description_trgm;
DROP INDEX IF EXISTS idx_roles_name_trgm;
DROP INDEX IF EXISTS idx_tools_description_trgm;
DROP INDEX IF EXISTS idx_tools_name_trgm;
DROP INDEX IF EXISTS idx_models_provider_trgm;
DROP INDEX IF EXISTS idx_models_display_name_trgm;
DROP INDEX IF EXISTS idx_models_name_trgm;

-- Drop extensions
DROP EXTENSION IF EXISTS unaccent;
DROP EXTENSION IF EXISTS pg_trgm;
