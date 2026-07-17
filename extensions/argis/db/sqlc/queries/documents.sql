-- Documents & Sessions queries
-- These extend the base schema with document management and multi-resolution summaries

-- name: CreateDocument :one
INSERT INTO documents (title, source, source_url, source_path, tags, metadata, content_type)
VALUES ($1, $2, $3, $4, $5, $6, $7)
RETURNING *;

-- name: GetDocument :one
SELECT * FROM documents WHERE id = $1;

-- name: ListDocumentsBySource :many
SELECT * FROM documents WHERE source = $1 ORDER BY updated_at DESC;

-- name: ListDocumentsByTags :many
SELECT * FROM documents WHERE tags && $1 ORDER BY updated_at DESC;

-- name: UpdateDocumentStats :exec
UPDATE documents SET
    total_chunks = $2,
    total_tokens = $3,
    updated_at = NOW()
WHERE id = $1;

-- name: CreateSession :one
INSERT INTO sessions (user_id, org_id, title, role_hint)
VALUES ($1, $2, $3, $4)
RETURNING *;

-- name: GetSession :one
SELECT * FROM sessions WHERE id = $1;

-- name: UpdateSessionActivity :exec
UPDATE sessions SET
    last_active_at = NOW(),
    total_segments = total_segments + 1,
    total_tokens = total_tokens + $2
WHERE id = $1;

-- name: EndSession :exec
UPDATE sessions SET ended_at = NOW() WHERE id = $1;

-- name: GetActiveSessions :many
SELECT * FROM sessions WHERE ended_at IS NULL ORDER BY last_active_at DESC;

-- name: GetUserSessions :many
SELECT * FROM sessions WHERE user_id = $1 ORDER BY last_active_at DESC LIMIT $2;

-- name: CreateDocumentChunkWithDoc :one
-- Creates a chunk linked to a document (via doc_id from migration 003)
INSERT INTO document_chunks (
    document_id, doc_id, chunk_index, content, token_count,
    embedding, metadata, short_summary, medium_summary
)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
RETURNING *;

-- name: GetDocumentChunksByDocId :many
SELECT * FROM document_chunks
WHERE doc_id = $1
ORDER BY chunk_index;

-- name: GetImportantChunks :many
SELECT * FROM document_chunks
WHERE doc_id = $1 AND importance >= $2
ORDER BY importance DESC;

-- name: SearchDocumentChunksBySimilarity :many
SELECT dc.*, d.title, d.source,
    (dc.embedding <-> $1::vector) as distance
FROM document_chunks dc
JOIN documents d ON dc.doc_id = d.id
ORDER BY dc.embedding <-> $1::vector
LIMIT $2;

-- name: SearchChunksInDocument :many
SELECT *, (embedding <-> $1::vector) as distance
FROM document_chunks
WHERE doc_id = $2
ORDER BY embedding <-> $1::vector
LIMIT $3;

-- name: CreateConversationSegmentWithSession :one
-- Creates a segment linked to a session (via session_id from migration 003)
INSERT INTO conversation_segments (
    conversation_id, session_id, segment_index, role, content,
    token_count, embedding, short_summary, importance, raw_storage_key
)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
RETURNING *;

-- name: GetSessionSegments :many
SELECT * FROM conversation_segments
WHERE session_id = $1
ORDER BY segment_index;

-- name: GetRecentSessionSegments :many
SELECT * FROM conversation_segments
WHERE session_id = $1
ORDER BY segment_index DESC
LIMIT $2;

-- name: GetImportantSessionSegments :many
SELECT * FROM conversation_segments
WHERE session_id = $1 AND importance >= $2
ORDER BY importance DESC;

-- name: SearchSessionSegments :many
SELECT *, (embedding <-> $1::vector) as distance
FROM conversation_segments
WHERE session_id = $2
ORDER BY embedding <-> $1::vector
LIMIT $3;

-- name: UpdateSegmentImportance :exec
UPDATE conversation_segments SET importance = $2 WHERE id = $1;

-- name: UpdateChunkMultiSummaries :exec
UPDATE document_chunks SET
    short_summary = $2,
    medium_summary = $3
WHERE id = $1;

