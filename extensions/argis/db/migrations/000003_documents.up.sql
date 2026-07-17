-- Migration: Documents & Multi-Resolution Summaries
-- Adds parent documents table and updates chunks with multi-resolution summaries

-- ============================================================================
-- DOCUMENTS (Parent Table)
-- ============================================================================

CREATE TABLE documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    source TEXT NOT NULL,             -- 'repo', 'wiki', 'notes', 'web', 'upload'
    source_url TEXT,                  -- Original URL if applicable
    source_path TEXT,                 -- File path if applicable
    
    -- Metadata
    tags TEXT[],
    metadata JSONB,
    
    -- Content info
    content_type TEXT DEFAULT 'text', -- 'text', 'markdown', 'code', 'pdf'
    total_chunks INTEGER DEFAULT 0,
    total_tokens INTEGER DEFAULT 0,
    
    -- Timestamps
    source_updated_at TIMESTAMPTZ,    -- When source was last modified
    indexed_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add foreign key to existing document_chunks
ALTER TABLE document_chunks 
    ADD COLUMN IF NOT EXISTS doc_id UUID REFERENCES documents(id) ON DELETE CASCADE;

-- Add multi-resolution summaries to document_chunks
ALTER TABLE document_chunks
    ADD COLUMN IF NOT EXISTS short_summary TEXT,      -- ~50 tokens
    ADD COLUMN IF NOT EXISTS medium_summary TEXT,     -- ~150 tokens  
    ADD COLUMN IF NOT EXISTS importance NUMERIC(3,2) DEFAULT 0.5; -- 0.0 to 1.0

-- Update conversation_segments with raw storage pattern
ALTER TABLE conversation_segments
    ADD COLUMN IF NOT EXISTS raw_storage_key TEXT,    -- External storage key for full text
    ADD COLUMN IF NOT EXISTS short_summary TEXT,      -- ~50 tokens
    ADD COLUMN IF NOT EXISTS importance NUMERIC(3,2) DEFAULT 0.5;

-- ============================================================================
-- SESSIONS (for conversation tracking)
-- ============================================================================

CREATE TABLE sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id TEXT,
    org_id TEXT,
    
    -- Session metadata
    title TEXT,
    role_hint TEXT,                   -- Suggested role for this session
    
    -- Context tracking
    total_segments INTEGER DEFAULT 0,
    total_tokens INTEGER DEFAULT 0,
    
    -- Timestamps
    started_at TIMESTAMPTZ DEFAULT NOW(),
    last_active_at TIMESTAMPTZ DEFAULT NOW(),
    ended_at TIMESTAMPTZ,
    
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Link conversation_segments to sessions
ALTER TABLE conversation_segments
    ADD COLUMN IF NOT EXISTS session_id UUID REFERENCES sessions(id) ON DELETE CASCADE;

-- ============================================================================
-- INDEXES
-- ============================================================================

CREATE INDEX idx_documents_source ON documents(source);
CREATE INDEX idx_documents_tags ON documents USING gin(tags);
CREATE INDEX idx_document_chunks_doc ON document_chunks(doc_id);
CREATE INDEX idx_document_chunks_importance ON document_chunks(importance DESC);
CREATE INDEX idx_sessions_user ON sessions(user_id);
CREATE INDEX idx_sessions_active ON sessions(last_active_at DESC);
CREATE INDEX idx_conversation_segments_session ON conversation_segments(session_id);
