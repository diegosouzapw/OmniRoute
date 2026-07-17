-- name: CreateProviderAccount :one
INSERT INTO provider_accounts (name, backend_type, billing_model, base_currency, subscription_fee_monthly, notes)
VALUES ($1, $2, $3, $4, $5, $6)
RETURNING *;

-- name: GetProviderAccount :one
SELECT * FROM provider_accounts WHERE id = $1;

-- name: GetProviderAccountByName :one
SELECT * FROM provider_accounts WHERE name = $1;

-- name: ListActiveProviderAccounts :many
SELECT * FROM provider_accounts WHERE is_active = true ORDER BY name;

-- name: UpdateProviderAccountStatus :exec
UPDATE provider_accounts SET is_active = $2, updated_at = NOW() WHERE id = $1;

-- name: CreateAccountLimit :one
INSERT INTO provider_account_limits (account_id, limit_type, window_seconds, limit_value, is_hard, cooldown_seconds)
VALUES ($1, $2, $3, $4, $5, $6)
RETURNING *;

-- name: GetAccountLimits :many
SELECT * FROM provider_account_limits WHERE account_id = $1;

-- name: DeleteAccountLimits :exec
DELETE FROM provider_account_limits WHERE account_id = $1;

-- name: CreateModelEndpoint :one
INSERT INTO model_endpoints (
    account_id, model_id, transport, upstream_route, base_url,
    pricing_basis, unit_price_input, unit_price_output,
    latency_estimate_ms, throughput_tps, priority, quality_tier
)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
RETURNING *;

-- name: GetModelEndpoint :one
SELECT * FROM model_endpoints WHERE id = $1;

-- name: GetEndpointsForModel :many
SELECT me.*, pa.name as account_name, pa.billing_model, pa.is_active as account_active
FROM model_endpoints me
JOIN provider_accounts pa ON me.account_id = pa.id
WHERE me.model_id = $1 AND me.status = 'active' AND pa.is_active = true
ORDER BY me.priority DESC, me.latency_estimate_ms ASC;

-- name: GetEndpointsForAccount :many
SELECT me.*, m.model_name, m.provider
FROM model_endpoints me
JOIN models m ON me.model_id = m.id
WHERE me.account_id = $1
ORDER BY me.priority DESC;

-- name: GetActiveEndpoints :many
SELECT me.*, m.model_name, m.provider, pa.name as account_name, pa.billing_model
FROM model_endpoints me
JOIN models m ON me.model_id = m.id
JOIN provider_accounts pa ON me.account_id = pa.id
WHERE me.status = 'active' AND pa.is_active = true
ORDER BY me.priority DESC;

-- name: UpdateEndpointStatus :exec
UPDATE model_endpoints SET status = $2, updated_at = NOW() WHERE id = $1;

-- name: SetEndpointCooldown :exec
UPDATE model_endpoints 
SET status = 'cooldown', cooldown_until = $2, updated_at = NOW() 
WHERE id = $1;

-- name: ClearExpiredCooldowns :exec
UPDATE model_endpoints 
SET status = 'active', cooldown_until = NULL, updated_at = NOW()
WHERE status = 'cooldown' AND cooldown_until < NOW();

-- name: UpsertUsageSnapshot :one
INSERT INTO account_usage_snapshots (
    account_id, endpoint_id, window_type, window_start, window_end,
    tokens_in, tokens_out, requests, credits_used, cost_usd
)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
ON CONFLICT (account_id, endpoint_id, window_type, window_start)
DO UPDATE SET
    tokens_in = account_usage_snapshots.tokens_in + EXCLUDED.tokens_in,
    tokens_out = account_usage_snapshots.tokens_out + EXCLUDED.tokens_out,
    requests = account_usage_snapshots.requests + EXCLUDED.requests,
    credits_used = account_usage_snapshots.credits_used + EXCLUDED.credits_used,
    cost_usd = account_usage_snapshots.cost_usd + EXCLUDED.cost_usd,
    last_refreshed_at = NOW()
RETURNING *;

-- name: GetCurrentUsage :one
SELECT * FROM account_usage_snapshots 
WHERE account_id = $1 AND window_type = $2 AND window_start <= $3 AND window_end > $3
ORDER BY window_start DESC
LIMIT 1;

-- name: GetUsageForWindow :many
SELECT * FROM account_usage_snapshots
WHERE account_id = $1 AND window_type = $2 AND window_start >= $3 AND window_end <= $4
ORDER BY window_start;

-- name: UpsertEndpointHealth :one
INSERT INTO endpoint_health (endpoint_id, is_healthy)
VALUES ($1, true)
ON CONFLICT (endpoint_id)
DO UPDATE SET health_check_at = NOW()
RETURNING *;

-- name: RecordEndpointSuccess :exec
UPDATE endpoint_health SET
    consecutive_successes = consecutive_successes + 1,
    consecutive_failures = 0,
    last_success_at = NOW(),
    is_healthy = true,
    health_check_at = NOW()
WHERE endpoint_id = $1;

-- name: RecordEndpointFailure :exec
UPDATE endpoint_health SET
    consecutive_failures = consecutive_failures + 1,
    consecutive_successes = 0,
    last_failure_at = NOW(),
    last_error = $2,
    is_healthy = CASE WHEN consecutive_failures >= 3 THEN false ELSE is_healthy END,
    health_check_at = NOW()
WHERE endpoint_id = $1;

-- name: GetEndpointHealth :one
SELECT * FROM endpoint_health WHERE endpoint_id = $1;

-- name: GetUnhealthyEndpoints :many
SELECT eh.*, me.model_id, me.transport
FROM endpoint_health eh
JOIN model_endpoints me ON eh.endpoint_id = me.id
WHERE eh.is_healthy = false;

