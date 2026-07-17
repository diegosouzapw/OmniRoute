package redis

import (
	"context"
	"encoding/json"
	"fmt"
	"time"
)

// --- Model Endpoint Cache ---

// EndpointCacheKey generates a cache key for model endpoints
func EndpointCacheKey(modelName string) string {
	return fmt.Sprintf("endpoints:%s", modelName)
}

// CachedEndpoint represents a cached endpoint
type CachedEndpoint struct {
	ID            string  `json:"id"`
	AccountID     string  `json:"account_id"`
	ModelID       string  `json:"model_id"`
	Transport     string  `json:"transport"`
	BaseURL       string  `json:"base_url"`
	Status        string  `json:"status"`
	Priority      int     `json:"priority"`
	LatencyMS     int     `json:"latency_ms"`
	HealthScore   float64 `json:"health_score"`
	CooldownUntil int64   `json:"cooldown_until"` // unix timestamp
}

// SetEndpointCache caches endpoints for a model
func (c *Client) SetEndpointCache(ctx context.Context, modelName string, endpoints []CachedEndpoint, ttl time.Duration) error {
	data, err := json.Marshal(endpoints)
	if err != nil {
		return err
	}
	return c.rdb.Set(ctx, EndpointCacheKey(modelName), data, ttl).Err()
}

// GetEndpointCache retrieves cached endpoints
func (c *Client) GetEndpointCache(ctx context.Context, modelName string) ([]CachedEndpoint, error) {
	data, err := c.rdb.Get(ctx, EndpointCacheKey(modelName)).Bytes()
	if err != nil {
		return nil, err
	}

	var endpoints []CachedEndpoint
	if err := json.Unmarshal(data, &endpoints); err != nil {
		return nil, err
	}
	return endpoints, nil
}

// --- Cost Snapshot Cache ---

// CostSnapshotKey generates a cache key for cost snapshots
func CostSnapshotKey(accountID, window string) string {
	return fmt.Sprintf("cost:%s:%s", accountID, window)
}

// CostSnapshot represents cached cost information
type CostSnapshot struct {
	AccountID    string    `json:"account_id"`
	Window       string    `json:"window"`
	TotalCost    float64   `json:"total_cost"`
	TotalTokens  int64     `json:"total_tokens"`
	RequestCount int64     `json:"request_count"`
	UpdatedAt    time.Time `json:"updated_at"`
}

// SetCostSnapshot caches cost snapshot
func (c *Client) SetCostSnapshot(ctx context.Context, snapshot *CostSnapshot, ttl time.Duration) error {
	data, err := json.Marshal(snapshot)
	if err != nil {
		return err
	}
	return c.rdb.Set(ctx, CostSnapshotKey(snapshot.AccountID, snapshot.Window), data, ttl).Err()
}

// GetCostSnapshot retrieves cached cost snapshot
func (c *Client) GetCostSnapshot(ctx context.Context, accountID, window string) (*CostSnapshot, error) {
	data, err := c.rdb.Get(ctx, CostSnapshotKey(accountID, window)).Bytes()
	if err != nil {
		return nil, err
	}

	var snapshot CostSnapshot
	if err := json.Unmarshal(data, &snapshot); err != nil {
		return nil, err
	}
	return &snapshot, nil
}

// IncrementCost atomically increments cost tracking
func (c *Client) IncrementCost(ctx context.Context, accountID, window string, cost float64, tokens int64, ttl time.Duration) error {
	key := CostSnapshotKey(accountID, window)

	// Use Lua script for atomic update
	script := `
		local data = redis.call('GET', KEYS[1])
		local snapshot = {}
		if data then
			snapshot = cjson.decode(data)
		else
			snapshot = {
				account_id = ARGV[1],
				window = ARGV[2],
				total_cost = 0,
				total_tokens = 0,
				request_count = 0
			}
		end
		snapshot.total_cost = snapshot.total_cost + tonumber(ARGV[3])
		snapshot.total_tokens = snapshot.total_tokens + tonumber(ARGV[4])
		snapshot.request_count = snapshot.request_count + 1
		snapshot.updated_at = ARGV[5]
		redis.call('SET', KEYS[1], cjson.encode(snapshot), 'EX', tonumber(ARGV[6]))
		return snapshot.total_cost
	`

	_, err := c.rdb.Eval(ctx, script, []string{key}, accountID, window, cost, tokens, time.Now().Format(time.RFC3339), int64(ttl.Seconds())).Result()
	return err
}

// --- Generic Cache ---

// Set stores a value with TTL
func (c *Client) Set(ctx context.Context, key string, value interface{}, ttl time.Duration) error {
	data, err := json.Marshal(value)
	if err != nil {
		return err
	}
	return c.rdb.Set(ctx, key, data, ttl).Err()
}

// Get retrieves a value
func (c *Client) Get(ctx context.Context, key string, dest interface{}) error {
	data, err := c.rdb.Get(ctx, key).Bytes()
	if err != nil {
		return err
	}
	return json.Unmarshal(data, dest)
}

// Delete removes a key
func (c *Client) Delete(ctx context.Context, keys ...string) error {
	return c.rdb.Del(ctx, keys...).Err()
}

// TTL returns remaining TTL for a key
func (c *Client) TTL(ctx context.Context, key string) (time.Duration, error) {
	return c.rdb.TTL(ctx, key).Result()
}

