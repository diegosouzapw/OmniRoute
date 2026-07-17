-- Routing queries - the core of intelligent model selection

-- name: GetModelsForRouting :many
-- Main routing query: get models with abilities, metrics, and bandit scores
SELECT 
    m.id,
    m.provider,
    m.model_name,
    m.status,
    m.context_window,
    m.input_cost_per_1k,
    m.output_cost_per_1k,
    ma.reasoning,
    ma.coding,
    ma.math,
    ma.writing,
    ma.analysis,
    mm.intelligence_index,
    mm.chatbot_arena_elo,
    mm.avg_latency_ms,
    bs.alpha,
    bs.beta,
    bs.alpha / (bs.alpha + bs.beta) AS bandit_mean
FROM models m
LEFT JOIN model_abilities ma ON ma.model_id = m.id
LEFT JOIN model_metrics mm ON mm.model_id = m.id AND mm.metric_source = 'artificialanalysis'
LEFT JOIN bandit_state bs ON bs.model_id = m.id AND (bs.role_id = sqlc.narg('role_id') OR bs.role_id IS NULL)
WHERE m.status = 'active'
ORDER BY mm.intelligence_index DESC NULLS LAST;

-- name: GetModelsForTask :many
-- Get models ranked by ability for a specific task type
SELECT 
    m.*,
    CASE 
        WHEN $1 = 'coding' THEN ma.coding
        WHEN $1 = 'math' THEN ma.math
        WHEN $1 = 'writing' THEN ma.writing
        WHEN $1 = 'reasoning' THEN ma.reasoning
        WHEN $1 = 'analysis' THEN ma.analysis
        ELSE ma.reasoning -- default
    END AS task_ability,
    mm.avg_latency_ms,
    m.input_cost_per_1k + m.output_cost_per_1k AS total_cost
FROM models m
LEFT JOIN model_abilities ma ON ma.model_id = m.id
LEFT JOIN model_metrics mm ON mm.model_id = m.id AND mm.metric_source = 'artificialanalysis'
WHERE m.status = 'active'
ORDER BY task_ability DESC NULLS LAST
LIMIT $2;

-- name: GetModelsBySemanticMatch :many
-- Find models whose semantic profile matches the query embedding
SELECT 
    m.id,
    m.provider,
    m.model_name,
    msp.description,
    msp.strengths,
    msp.best_for,
    msp.description_embedding <-> $1 AS semantic_distance
FROM models m
JOIN model_semantic_profiles msp ON msp.model_id = m.id
WHERE m.status = 'active'
ORDER BY semantic_distance
LIMIT $2;

-- name: GetModelsForRole :many
-- Get models ranked by role suitability
SELECT 
    m.*,
    mrs.suitability_score,
    ma.reasoning + ma.coding AS composite_ability,
    mm.chatbot_arena_elo
FROM models m
JOIN model_role_scores mrs ON mrs.model_id = m.id
LEFT JOIN model_abilities ma ON ma.model_id = m.id
LEFT JOIN model_metrics mm ON mm.model_id = m.id AND mm.metric_source = 'lmsys'
WHERE mrs.role_id = $1
  AND m.status = 'active'
ORDER BY mrs.suitability_score DESC
LIMIT $2;

-- name: GetCheapestModels :many
-- Get cheapest models that meet minimum ability threshold
SELECT m.*, 
    ma.reasoning + ma.coding + ma.math AS total_ability,
    m.input_cost_per_1k + m.output_cost_per_1k AS total_cost
FROM models m
LEFT JOIN model_abilities ma ON ma.model_id = m.id
WHERE m.status = 'active'
  AND (ma.reasoning + ma.coding + ma.math) >= COALESCE($1, 0)
ORDER BY total_cost ASC
LIMIT $2;

-- name: GetFastestModels :many
-- Get fastest models that meet minimum ability threshold  
SELECT m.*, 
    mm.avg_latency_ms,
    ma.reasoning + ma.coding AS ability_score
FROM models m
LEFT JOIN model_metrics mm ON mm.model_id = m.id AND mm.metric_source = 'artificialanalysis'
LEFT JOIN model_abilities ma ON ma.model_id = m.id
WHERE m.status = 'active'
  AND (ma.reasoning + ma.coding) >= COALESCE($1, 0)
ORDER BY mm.avg_latency_ms ASC NULLS LAST
LIMIT $2;

-- name: CreateRoutingEvent :one
INSERT INTO routing_events (
    request_id, user_id, org_id, role_id,
    task_type, difficulty_estimate,
    selected_model_id, fallback_models,
    routing_method, routing_latency_ms
) VALUES (
    $1, $2, $3, $4, $5, $6, $7, $8, $9, $10
) RETURNING *;

-- name: UpdateRoutingEventCompletion :exec
UPDATE routing_events SET
    model_latency_ms = $2,
    tokens_used = $3,
    cost = $4,
    success = $5
WHERE id = $1;

-- name: GetRoutingStats :one
-- Aggregate routing stats for a model over a time period
SELECT
    selected_model_id,
    COUNT(*) AS total_requests,
    COUNT(*) FILTER (WHERE success = true) AS successful_requests,
    AVG(model_latency_ms) AS avg_latency,
    SUM(cost) AS total_cost,
    SUM(tokens_used) AS total_tokens
FROM routing_events
WHERE selected_model_id = $1
  AND created_at >= $2
GROUP BY selected_model_id;

