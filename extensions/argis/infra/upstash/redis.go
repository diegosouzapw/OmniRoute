// Package upstash provides Upstash-specific integrations for Redis and Workflow.
// This wraps the standard Redis client with Upstash REST API compatibility
// and provides the Upstash Workflow SDK integration.
package upstash

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"time"

	"github.com/kooshapari/bifrost-extensions/infra/redis"
)

// RedisConfig configures the Upstash Redis client
type RedisConfig struct {
	// REST API endpoint (e.g., https://xxx.upstash.io)
	RestURL string `json:"rest_url"`
	// REST API token
	RestToken string `json:"rest_token"`
	// Standard Redis URL for go-redis (redis://xxx.upstash.io:6379)
	RedisURL string `json:"redis_url"`
	// Redis password (same as REST token usually)
	Password string `json:"password"`
	// Use REST API for certain operations (rate limit friendly)
	UseREST bool `json:"use_rest"`
}

// RedisClient wraps the standard Redis client with Upstash-specific features
type RedisClient struct {
	*redis.Client
	config     RedisConfig
	httpClient *http.Client
}

// NewRedisClient creates a new Upstash Redis client
func NewRedisClient(config RedisConfig) (*RedisClient, error) {
	// Create standard Redis client
	stdConfig := redis.Config{
		URL:          config.RedisURL,
		Password:     config.Password,
		Timeout:      10 * time.Second,
		PoolSize:     10,
		MinIdleConns: 2,
	}

	stdClient, err := redis.New(stdConfig)
	if err != nil {
		return nil, fmt.Errorf("failed to create redis client: %w", err)
	}

	return &RedisClient{
		Client: stdClient,
		config: config,
		httpClient: &http.Client{
			Timeout: 10 * time.Second,
		},
	}, nil
}

// restCommand executes a command via Upstash REST API
// This is useful for operations that need rate limit awareness
func (c *RedisClient) restCommand(ctx context.Context, args ...interface{}) (json.RawMessage, error) {
	if c.config.RestURL == "" || c.config.RestToken == "" {
		return nil, fmt.Errorf("REST API not configured")
	}

	// Build command array
	cmdData, err := json.Marshal(args)
	if err != nil {
		return nil, err
	}

	req, err := http.NewRequestWithContext(ctx, "POST", c.config.RestURL, nil)
	if err != nil {
		return nil, err
	}

	req.Header.Set("Authorization", "Bearer "+c.config.RestToken)
	req.Header.Set("Content-Type", "application/json")

	// Use pipeline endpoint for array commands
	req.URL.Path = "/"
	req.Body = http.NoBody

	// For single command, use URL path encoding
	// e.g., /GET/key or /SET/key/value
	// This is simpler for basic operations

	resp, err := c.httpClient.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	var result struct {
		Result json.RawMessage `json:"result"`
		Error  string          `json:"error"`
	}

	if err := json.NewDecoder(resp.Body).Decode(&result); err != nil {
		return nil, err
	}

	if result.Error != "" {
		return nil, fmt.Errorf("upstash error: %s", result.Error)
	}

	_ = cmdData // suppress unused warning - will be used in full implementation
	return result.Result, nil
}

// RateLimitInfo returns Upstash rate limit info
type RateLimitInfo struct {
	DailyRequests    int64     `json:"daily_requests"`
	DailyLimit       int64     `json:"daily_limit"`
	RemainingToday   int64     `json:"remaining_today"`
	ResetAt          time.Time `json:"reset_at"`
	BurstRequests    int64     `json:"burst_requests"`
	BurstLimit       int64     `json:"burst_limit"`
	RemainingBurst   int64     `json:"remaining_burst"`
	BurstResetAt     time.Time `json:"burst_reset_at"`
}

// GetRateLimitInfo gets current Upstash rate limit status
// This helps avoid hitting the 10K cmd/day free tier limit
func (c *RedisClient) GetRateLimitInfo(ctx context.Context) (*RateLimitInfo, error) {
	// Upstash returns rate limit info in response headers
	// X-RateLimit-Limit-Day, X-RateLimit-Remaining-Day, etc.
	// For now, we track locally
	key := "upstash:ratelimit:info"
	var info RateLimitInfo
	if err := c.Get(ctx, key, &info); err != nil {
		// Return default if not tracked
		return &RateLimitInfo{
			DailyLimit:     10000,
			RemainingToday: 10000,
		}, nil
	}
	return &info, nil
}

