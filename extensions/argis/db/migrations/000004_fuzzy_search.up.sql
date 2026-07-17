-- Migration: Fuzzy Search with pg_trgm
-- Adds typo-tolerant search capabilities using trigram similarity

-- ============================================================================
-- ENABLE EXTENSIONS
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS pg_trgm;
CREATE EXTENSION IF NOT EXISTS unaccent;  -- For accent-insensitive search

-- ============================================================================
-- TRIGRAM INDEXES FOR FUZZY MATCHING
-- ============================================================================

-- Model names (typo-tolerant model lookup)
CREATE INDEX idx_models_name_trgm ON models 
    USING gin (model_name gin_trgm_ops);

CREATE INDEX idx_models_display_name_trgm ON models 
    USING gin (display_name gin_trgm_ops);

CREATE INDEX idx_models_provider_trgm ON models 
    USING gin (provider gin_trgm_ops);

-- Tools (typo-tolerant tool search)
CREATE INDEX idx_tools_name_trgm ON tools 
    USING gin (name gin_trgm_ops);

CREATE INDEX idx_tools_description_trgm ON tools 
    USING gin (description gin_trgm_ops);

-- Roles
CREATE INDEX idx_roles_name_trgm ON roles 
    USING gin (name gin_trgm_ops);

CREATE INDEX idx_roles_description_trgm ON roles 
    USING gin (description gin_trgm_ops);

-- Documents (from migration 003)
CREATE INDEX idx_documents_title_trgm ON documents 
    USING gin (title gin_trgm_ops);

-- Document chunks content (for hybrid semantic + keyword search)
CREATE INDEX idx_document_chunks_content_trgm ON document_chunks 
    USING gin (content gin_trgm_ops);

-- ============================================================================
-- FUZZY SEARCH HELPER FUNCTIONS
-- ============================================================================

-- Fuzzy model search with similarity threshold
CREATE OR REPLACE FUNCTION fuzzy_find_model(
    search_term TEXT,
    min_similarity REAL DEFAULT 0.3
) RETURNS TABLE (
    id UUID,
    provider TEXT,
    model_name TEXT,
    display_name TEXT,
    similarity REAL
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        m.id,
        m.provider,
        m.model_name,
        m.display_name,
        GREATEST(
            similarity(m.model_name, search_term),
            similarity(COALESCE(m.display_name, ''), search_term),
            similarity(m.provider, search_term)
        ) AS similarity
    FROM models m
    WHERE 
        m.model_name % search_term 
        OR m.display_name % search_term
        OR m.provider % search_term
    ORDER BY similarity DESC
    LIMIT 10;
END;
$$ LANGUAGE plpgsql;

-- Fuzzy tool search
CREATE OR REPLACE FUNCTION fuzzy_find_tool(
    search_term TEXT,
    min_similarity REAL DEFAULT 0.3
) RETURNS TABLE (
    id UUID,
    name TEXT,
    description TEXT,
    similarity REAL
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        t.id,
        t.name,
        t.description,
        GREATEST(
            similarity(t.name, search_term),
            similarity(COALESCE(t.description, ''), search_term)
        ) AS similarity
    FROM tools t
    WHERE 
        t.name % search_term 
        OR t.description % search_term
    ORDER BY similarity DESC
    LIMIT 10;
END;
$$ LANGUAGE plpgsql;

-- Combined search: fuzzy text + semantic similarity
-- Returns documents matching either fuzzy text or vector similarity
CREATE OR REPLACE FUNCTION hybrid_search_documents(
    query_text TEXT,
    query_embedding vector(1536),
    text_weight REAL DEFAULT 0.3,
    semantic_weight REAL DEFAULT 0.7,
    result_limit INTEGER DEFAULT 20
) RETURNS TABLE (
    chunk_id UUID,
    doc_id UUID,
    content TEXT,
    text_similarity REAL,
    semantic_similarity REAL,
    combined_score REAL
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        dc.id AS chunk_id,
        dc.doc_id,
        dc.content,
        COALESCE(similarity(dc.content, query_text), 0.0) AS text_similarity,
        (1 - (dc.embedding <=> query_embedding))::REAL AS semantic_similarity,
        (
            text_weight * COALESCE(similarity(dc.content, query_text), 0.0) +
            semantic_weight * (1 - (dc.embedding <=> query_embedding))
        )::REAL AS combined_score
    FROM document_chunks dc
    WHERE 
        dc.content % query_text
        OR (1 - (dc.embedding <=> query_embedding)) > 0.5
    ORDER BY combined_score DESC
    LIMIT result_limit;
END;
$$ LANGUAGE plpgsql;

-- Accent-insensitive fuzzy search
CREATE OR REPLACE FUNCTION fuzzy_search_unaccent(
    table_name TEXT,
    column_name TEXT,
    search_term TEXT
) RETURNS TEXT AS $$
BEGIN
    RETURN format(
        'SELECT * FROM %I WHERE unaccent(%I) %% unaccent(%L)',
        table_name, column_name, search_term
    );
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- SET DEFAULT SIMILARITY THRESHOLD
-- ============================================================================

-- Lower threshold = more fuzzy matches (default is 0.3)
-- Can be adjusted per-session with: SET pg_trgm.similarity_threshold = 0.2;
ALTER DATABASE CURRENT SET pg_trgm.similarity_threshold = 0.3;
ALTER DATABASE CURRENT SET pg_trgm.word_similarity_threshold = 0.6;

-- ============================================================================
-- COMMENTS
-- ============================================================================

COMMENT ON FUNCTION fuzzy_find_model IS 
    'Find models with typo-tolerant search. Example: fuzzy_find_model(''gpt-4o'') matches ''gpt-4'', ''gpt-4o-mini''';

COMMENT ON FUNCTION fuzzy_find_tool IS 
    'Find tools with typo-tolerant search. Example: fuzzy_find_tool(''filesearch'') matches ''file_search''';

COMMENT ON FUNCTION hybrid_search_documents IS 
    'Combined fuzzy text + semantic vector search for RAG. Weights control text vs embedding importance.';
