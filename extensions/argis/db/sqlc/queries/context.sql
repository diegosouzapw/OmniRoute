-- Context folding and document queries

-- name: GetConversationSegments :many
SELECT * FROM conversation_segments 
WHERE conversation_id = $1
ORDER BY segment_index;

-- name: GetConversationSegment :one
SELECT * FROM conversation_segments 
WHERE conversation_id = $1 AND segment_index = $2;

-- name: CreateConversationSegment :one
INSERT INTO conversation_segments (
    conversation_id, segment_index, role, content,
    token_count, summary, summary_token_count, embedding
) VALUES (
    $1, $2, $3, $4, $5, $6, $7, $8
) RETURNING *;

-- name: UpdateSegmentSummary :exec
UPDATE conversation_segments SET
    summary = $3,
    summary_token_count = $4
WHERE conversation_id = $1 AND segment_index = $2;

-- name: FindRelevantSegments :many
-- Find conversation segments relevant to current query
SELECT 
    cs.*,
    cs.embedding <-> $1 AS distance
FROM conversation_segments cs
WHERE cs.conversation_id = $2
ORDER BY distance
LIMIT $3;

-- name: GetConversationTokenCount :one
-- Get total tokens in a conversation
SELECT 
    SUM(token_count) AS total_tokens,
    SUM(summary_token_count) AS summary_tokens,
    COUNT(*) AS segment_count
FROM conversation_segments
WHERE conversation_id = $1;

-- name: GetDocumentChunks :many
SELECT * FROM document_chunks 
WHERE document_id = $1
ORDER BY chunk_index;

-- name: CreateDocumentChunk :one
INSERT INTO document_chunks (
    document_id, chunk_index, content, token_count, embedding, metadata
) VALUES (
    $1, $2, $3, $4, $5, $6
) RETURNING *;

-- name: FindRelevantChunks :many
-- Find document chunks relevant to query
SELECT 
    dc.*,
    dc.embedding <-> $1 AS distance
FROM document_chunks dc
WHERE dc.document_id = ANY($2::uuid[])
ORDER BY distance
LIMIT $3;

-- name: FindRelevantChunksGlobal :many
-- Find relevant chunks across all documents
SELECT 
    dc.*,
    dc.embedding <-> $1 AS distance
FROM document_chunks dc
ORDER BY distance
LIMIT $2;

-- name: DeleteOldSegments :exec
-- Clean up old conversation segments
DELETE FROM conversation_segments
WHERE conversation_id = $1 
  AND segment_index < $2;

-- Roles and policies

-- name: GetRole :one
SELECT * FROM roles WHERE id = $1;

-- name: GetRoleByName :one
SELECT * FROM roles WHERE name = $1;

-- name: ListRoles :many
SELECT * FROM roles ORDER BY name;

-- name: CreateRole :one
INSERT INTO roles (
    name, description, parent_role_id,
    default_model_id, max_tokens, max_cost_per_request
) VALUES (
    $1, $2, $3, $4, $5, $6
) RETURNING *;

-- name: GetModelRoleScore :one
SELECT * FROM model_role_scores 
WHERE model_id = $1 AND role_id = $2;

-- name: UpsertModelRoleScore :one
INSERT INTO model_role_scores (model_id, role_id, suitability_score, source)
VALUES ($1, $2, $3, $4)
ON CONFLICT (model_id, role_id) DO UPDATE SET
    suitability_score = EXCLUDED.suitability_score,
    source = EXCLUDED.source,
    updated_at = NOW()
RETURNING *;

-- Feedback

-- name: CreateFeedback :one
INSERT INTO feedback (
    routing_event_id, user_id, rating, 
    feedback_type, was_regenerated, was_edited
) VALUES (
    $1, $2, $3, $4, $5, $6
) RETURNING *;

-- name: GetFeedbackForModel :many
SELECT f.* 
FROM feedback f
JOIN routing_events re ON re.id = f.routing_event_id
WHERE re.selected_model_id = $1
  AND f.created_at >= $2
ORDER BY f.created_at DESC
LIMIT $3;

-- name: GetAverageRating :one
SELECT 
    AVG(rating) AS avg_rating,
    COUNT(*) AS total_feedback
FROM feedback f
JOIN routing_events re ON re.id = f.routing_event_id
WHERE re.selected_model_id = $1
  AND f.rating IS NOT NULL
  AND f.created_at >= $2;

