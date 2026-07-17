-- Models CRUD and queries

-- name: GetModel :one
SELECT * FROM models WHERE id = $1;

-- name: GetModelByName :one
SELECT * FROM models WHERE provider = $1 AND model_name = $2;

-- name: ListModels :many
SELECT * FROM models 
WHERE status = COALESCE(sqlc.narg('status'), status)
ORDER BY provider, model_name;

-- name: ListActiveModels :many
SELECT * FROM models WHERE status = 'active' ORDER BY provider, model_name;

-- name: CreateModel :one
INSERT INTO models (
    provider, model_name, display_name, status, 
    context_window, max_output_tokens,
    supports_tools, supports_vision, supports_streaming,
    input_cost_per_1k, output_cost_per_1k
) VALUES (
    $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11
) RETURNING *;

-- name: UpdateModel :one
UPDATE models SET
    display_name = COALESCE(sqlc.narg('display_name'), display_name),
    status = COALESCE(sqlc.narg('status'), status),
    context_window = COALESCE(sqlc.narg('context_window'), context_window),
    max_output_tokens = COALESCE(sqlc.narg('max_output_tokens'), max_output_tokens),
    input_cost_per_1k = COALESCE(sqlc.narg('input_cost_per_1k'), input_cost_per_1k),
    output_cost_per_1k = COALESCE(sqlc.narg('output_cost_per_1k'), output_cost_per_1k),
    updated_at = NOW()
WHERE id = $1
RETURNING *;

-- name: GetModelMetrics :one
SELECT * FROM model_metrics WHERE model_id = $1 AND metric_source = $2;

-- name: UpsertModelMetrics :one
INSERT INTO model_metrics (
    model_id, metric_source, intelligence_index,
    gpqa_diamond, aime_2024, hle, musr,
    humaneval, livecodebench, chatbot_arena_elo,
    avg_latency_ms, throughput_tps
) VALUES (
    $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12
) ON CONFLICT (model_id, metric_source) DO UPDATE SET
    intelligence_index = EXCLUDED.intelligence_index,
    gpqa_diamond = EXCLUDED.gpqa_diamond,
    aime_2024 = EXCLUDED.aime_2024,
    hle = EXCLUDED.hle,
    musr = EXCLUDED.musr,
    humaneval = EXCLUDED.humaneval,
    livecodebench = EXCLUDED.livecodebench,
    chatbot_arena_elo = EXCLUDED.chatbot_arena_elo,
    avg_latency_ms = EXCLUDED.avg_latency_ms,
    throughput_tps = EXCLUDED.throughput_tps,
    collected_at = NOW()
RETURNING *;

-- name: GetModelAbilities :one
SELECT * FROM model_abilities WHERE model_id = $1;

-- name: UpsertModelAbilities :one
INSERT INTO model_abilities (
    model_id, reasoning, coding, math, writing,
    analysis, creativity, instruction_following, multilingual,
    calibrated_at, sample_count
) VALUES (
    $1, $2, $3, $4, $5, $6, $7, $8, $9, NOW(), $10
) ON CONFLICT (model_id) DO UPDATE SET
    reasoning = EXCLUDED.reasoning,
    coding = EXCLUDED.coding,
    math = EXCLUDED.math,
    writing = EXCLUDED.writing,
    analysis = EXCLUDED.analysis,
    creativity = EXCLUDED.creativity,
    instruction_following = EXCLUDED.instruction_following,
    multilingual = EXCLUDED.multilingual,
    calibrated_at = NOW(),
    sample_count = EXCLUDED.sample_count
RETURNING *;

-- name: GetModelSemanticProfile :one
SELECT * FROM model_semantic_profiles WHERE model_id = $1;

-- name: UpsertModelSemanticProfile :one
INSERT INTO model_semantic_profiles (
    model_id, description, description_embedding,
    strengths, weaknesses, best_for, avoid_for,
    personality_traits, community_sentiment
) VALUES (
    $1, $2, $3, $4, $5, $6, $7, $8, $9
) ON CONFLICT (model_id) DO UPDATE SET
    description = EXCLUDED.description,
    description_embedding = EXCLUDED.description_embedding,
    strengths = EXCLUDED.strengths,
    weaknesses = EXCLUDED.weaknesses,
    best_for = EXCLUDED.best_for,
    avoid_for = EXCLUDED.avoid_for,
    personality_traits = EXCLUDED.personality_traits,
    community_sentiment = EXCLUDED.community_sentiment,
    updated_at = NOW()
RETURNING *;

-- name: FindSimilarModels :many
SELECT m.*, msp.description_embedding <-> $1 AS distance
FROM models m
JOIN model_semantic_profiles msp ON msp.model_id = m.id
WHERE m.status = 'active'
ORDER BY distance
LIMIT $2;

