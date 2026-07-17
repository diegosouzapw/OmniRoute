-- Bandit queries for Thompson Sampling exploration

-- name: GetBanditState :one
SELECT * FROM bandit_state 
WHERE model_id = $1 
  AND (role_id = sqlc.narg('role_id') OR (sqlc.narg('role_id') IS NULL AND role_id IS NULL));

-- name: GetBanditStatesForRole :many
SELECT 
    bs.*,
    m.provider,
    m.model_name,
    bs.alpha / (bs.alpha + bs.beta) AS mean_reward,
    bs.alpha + bs.beta AS total_observations
FROM bandit_state bs
JOIN models m ON m.id = bs.model_id
WHERE bs.role_id = sqlc.narg('role_id') OR (sqlc.narg('role_id') IS NULL AND bs.role_id IS NULL)
ORDER BY mean_reward DESC;

-- name: GetAllBanditStates :many
SELECT 
    bs.*,
    m.provider,
    m.model_name,
    r.name AS role_name
FROM bandit_state bs
JOIN models m ON m.id = bs.model_id
LEFT JOIN roles r ON r.id = bs.role_id
ORDER BY bs.model_id, bs.role_id;

-- name: UpsertBanditState :one
INSERT INTO bandit_state (model_id, role_id, alpha, beta, total_trials)
VALUES ($1, $2, $3, $4, $5)
ON CONFLICT (model_id, role_id) DO UPDATE SET
    alpha = EXCLUDED.alpha,
    beta = EXCLUDED.beta,
    total_trials = EXCLUDED.total_trials,
    last_updated = NOW()
RETURNING *;

-- name: IncrementBanditSuccess :exec
-- Increment alpha (success count) for Thompson Sampling
UPDATE bandit_state SET
    alpha = alpha + 1,
    total_trials = total_trials + 1,
    last_updated = NOW()
WHERE model_id = $1 
  AND (role_id = sqlc.narg('role_id') OR (sqlc.narg('role_id') IS NULL AND role_id IS NULL));

-- name: IncrementBanditFailure :exec
-- Increment beta (failure count) for Thompson Sampling
UPDATE bandit_state SET
    beta = beta + 1,
    total_trials = total_trials + 1,
    last_updated = NOW()
WHERE model_id = $1 
  AND (role_id = sqlc.narg('role_id') OR (sqlc.narg('role_id') IS NULL AND role_id IS NULL));

-- name: InitializeBanditForModel :exec
-- Initialize bandit state for a new model across all roles
INSERT INTO bandit_state (model_id, role_id, alpha, beta, total_trials)
SELECT $1, r.id, 1.0, 1.0, 0
FROM roles r
ON CONFLICT (model_id, role_id) DO NOTHING;

-- name: DecayBanditPriors :exec
-- Apply decay to move priors toward uncertainty (for exploration)
-- Typically run nightly to prevent stale beliefs
UPDATE bandit_state SET
    alpha = 1.0 + (alpha - 1.0) * $1,  -- decay factor (e.g., 0.99)
    beta = 1.0 + (beta - 1.0) * $1,
    last_updated = NOW()
WHERE last_updated < NOW() - INTERVAL '1 day';

-- name: GetExplorationCandidates :many
-- Get models that need exploration (high uncertainty)
SELECT 
    bs.*,
    m.provider,
    m.model_name,
    m.status,
    -- Uncertainty = variance of Beta distribution
    (bs.alpha * bs.beta) / (POWER(bs.alpha + bs.beta, 2) * (bs.alpha + bs.beta + 1)) AS uncertainty
FROM bandit_state bs
JOIN models m ON m.id = bs.model_id
WHERE m.status IN ('active', 'shadow')
  AND bs.total_trials < $1  -- min trials threshold
ORDER BY uncertainty DESC
LIMIT $2;

