-- Tool registry and tool routing queries

-- name: GetTool :one
SELECT * FROM tools WHERE id = $1;

-- name: GetToolByName :one
SELECT * FROM tools WHERE name = $1;

-- name: ListTools :many
SELECT * FROM tools 
WHERE status = 'active'
ORDER BY name;

-- name: ListToolsByProvider :many
SELECT * FROM tools 
WHERE provider = $1 AND status = 'active'
ORDER BY name;

-- name: CreateTool :one
INSERT INTO tools (
    name, provider, description, schema_json,
    avg_latency_ms, avg_cost, risk_level,
    requires_confirmation, rate_limit_per_min
) VALUES (
    $1, $2, $3, $4, $5, $6, $7, $8, $9
) RETURNING *;

-- name: UpdateTool :one
UPDATE tools SET
    description = COALESCE(sqlc.narg('description'), description),
    schema_json = COALESCE(sqlc.narg('schema_json'), schema_json),
    avg_latency_ms = COALESCE(sqlc.narg('avg_latency_ms'), avg_latency_ms),
    avg_cost = COALESCE(sqlc.narg('avg_cost'), avg_cost),
    risk_level = COALESCE(sqlc.narg('risk_level'), risk_level),
    status = COALESCE(sqlc.narg('status'), status),
    updated_at = NOW()
WHERE id = $1
RETURNING *;

-- name: GetToolSemanticProfile :one
SELECT * FROM tool_semantic_profiles WHERE tool_id = $1;

-- name: UpsertToolSemanticProfile :one
INSERT INTO tool_semantic_profiles (
    tool_id, description_embedding, suitable_for,
    requires_context, output_type, side_effects
) VALUES (
    $1, $2, $3, $4, $5, $6
) ON CONFLICT (tool_id) DO UPDATE SET
    description_embedding = EXCLUDED.description_embedding,
    suitable_for = EXCLUDED.suitable_for,
    requires_context = EXCLUDED.requires_context,
    output_type = EXCLUDED.output_type,
    side_effects = EXCLUDED.side_effects,
    updated_at = NOW()
RETURNING *;

-- name: FindSimilarTools :many
-- Find tools by semantic similarity
SELECT 
    t.*,
    tsp.description_embedding <-> $1 AS distance,
    tsp.suitable_for,
    tsp.side_effects
FROM tools t
JOIN tool_semantic_profiles tsp ON tsp.tool_id = t.id
WHERE t.status = 'active'
ORDER BY distance
LIMIT $2;

-- name: GetToolsForRole :many
-- Get tools suitable for a role
SELECT 
    t.*,
    trs.suitability_score,
    tm.success_rate,
    tm.avg_execution_ms
FROM tools t
JOIN tool_role_scores trs ON trs.tool_id = t.id
LEFT JOIN tool_metrics tm ON tm.tool_id = t.id
WHERE trs.role_id = $1
  AND t.status = 'active'
ORDER BY trs.suitability_score DESC
LIMIT $2;

-- name: GetSafeTools :many
-- Get tools that don't have side effects (safe for auto-execution)
SELECT t.*
FROM tools t
JOIN tool_semantic_profiles tsp ON tsp.tool_id = t.id
WHERE t.status = 'active'
  AND t.risk_level IN ('low', 'medium')
  AND tsp.side_effects = false
  AND t.requires_confirmation = false
ORDER BY t.name;

-- name: UpdateToolMetrics :exec
UPDATE tool_metrics SET
    success_rate = $2,
    avg_execution_ms = $3,
    p95_execution_ms = $4,
    error_rate = $5,
    total_invocations = total_invocations + 1,
    last_success_at = CASE WHEN $6 THEN NOW() ELSE last_success_at END,
    last_failure_at = CASE WHEN NOT $6 THEN NOW() ELSE last_failure_at END,
    updated_at = NOW()
WHERE tool_id = $1;

