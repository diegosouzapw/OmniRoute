-- Rollback migration: documents
-- Drops tables, columns, and indexes created in migration 003

-- Drop indexes
DROP INDEX IF EXISTS idx_conversation_segments_session;
DROP INDEX IF EXISTS idx_sessions_active;
DROP INDEX IF EXISTS idx_sessions_user;
DROP INDEX IF EXISTS idx_document_chunks_importance;
DROP INDEX IF EXISTS idx_document_chunks_doc;
DROP INDEX IF EXISTS idx_documents_tags;
DROP INDEX IF EXISTS idx_documents_source;

-- Drop columns from conversation_segments
ALTER TABLE conversation_segments
    DROP COLUMN IF EXISTS session_id,
    DROP COLUMN IF EXISTS importance,
    DROP COLUMN IF EXISTS short_summary,
    DROP COLUMN IF EXISTS raw_storage_key;

-- Drop columns from document_chunks
ALTER TABLE document_chunks
    DROP COLUMN IF EXISTS importance,
    DROP COLUMN IF EXISTS medium_summary,
    DROP COLUMN IF EXISTS short_summary,
    DROP COLUMN IF EXISTS doc_id;

-- Drop tables
DROP TABLE IF EXISTS sessions;
DROP TABLE IF EXISTS documents;
