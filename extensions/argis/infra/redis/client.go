// Package redis provides a Redis client for hot state management.
// This includes rate limits, session windows, and caching.
package redis

import (
	"context"
	"encoding/json"
	"fmt"
	"time"

	"github.com/redis/go-redis/v9"
)

// Config configures the Redis client
type Config struct {
	URL      string        `json:"url"` // redis://user:pass@host:port/db or rediss:// for TLS
	Password string        `json:"password"`
	DB       int           `json:"db"`
	Timeout  time.Duration `json:"timeout"`

	// Pool settings
	PoolSize     int `json:"pool_size"`
	MinIdleConns int `json:"min_idle_conns"`
}

// Client is a Redis client for hot state
type Client struct {
	rdb *redis.Client
}

// New creates a new Redis client
func New(config Config) (*Client, error) {
	opts, err := redis.ParseURL(config.URL)
	if err != nil {
		// Fall back to direct options if URL parsing fails
		opts = &redis.Options{
			Addr:     config.URL,
			Password: config.Password,
			DB:       config.DB,
		}
	}

	if config.Timeout > 0 {
		opts.DialTimeout = config.Timeout
		opts.ReadTimeout = config.Timeout
		opts.WriteTimeout = config.Timeout
	}

	if config.PoolSize > 0 {
		opts.PoolSize = config.PoolSize
	}
	if config.MinIdleConns > 0 {
		opts.MinIdleConns = config.MinIdleConns
	}

	rdb := redis.NewClient(opts)

	return &Client{rdb: rdb}, nil
}

// Close closes the Redis connection
func (c *Client) Close() error {
	return c.rdb.Close()
}

// Ping checks if the connection is working
func (c *Client) Ping(ctx context.Context) error {
	return c.rdb.Ping(ctx).Err()
}

// --- Rate Limiting ---

// RateLimitKey generates a rate limit key
func RateLimitKey(accountID, window string) string {
	return fmt.Sprintf("ratelimit:%s:%s", accountID, window)
}

// IncrementRateLimit increments a rate limit counter
func (c *Client) IncrementRateLimit(ctx context.Context, key string, ttl time.Duration) (int64, error) {
	pipe := c.rdb.Pipeline()
	incr := pipe.Incr(ctx, key)
	pipe.Expire(ctx, key, ttl)
	_, err := pipe.Exec(ctx)
	if err != nil {
		return 0, err
	}
	return incr.Val(), nil
}

// GetRateLimit gets current rate limit count
func (c *Client) GetRateLimit(ctx context.Context, key string) (int64, error) {
	val, err := c.rdb.Get(ctx, key).Int64()
	if err == redis.Nil {
		return 0, nil
	}
	return val, err
}

// CheckRateLimit checks if under rate limit
func (c *Client) CheckRateLimit(ctx context.Context, key string, limit int64) (bool, int64, error) {
	current, err := c.GetRateLimit(ctx, key)
	if err != nil {
		return false, 0, err
	}
	return current < limit, limit - current, nil
}

// --- Session Management ---

// SessionKey generates a session key
func SessionKey(sessionID string) string {
	return fmt.Sprintf("session:%s", sessionID)
}

// SessionData represents session state
type SessionData struct {
	ID              string    `json:"id"`
	AccountID       string    `json:"account_id"`
	RoleID          string    `json:"role_id"`
	StartedAt       time.Time `json:"started_at"`
	LastActivityAt  time.Time `json:"last_activity_at"`
	TokensUsed      int64     `json:"tokens_used"`
	RequestCount    int64     `json:"request_count"`
	ActiveModelID   string    `json:"active_model_id"`
	ContextStrategy string    `json:"context_strategy"`
}

// SetSession stores session data
func (c *Client) SetSession(ctx context.Context, session *SessionData, ttl time.Duration) error {
	data, err := json.Marshal(session)
	if err != nil {
		return err
	}
	return c.rdb.Set(ctx, SessionKey(session.ID), data, ttl).Err()
}

// GetSession retrieves session data
func (c *Client) GetSession(ctx context.Context, sessionID string) (*SessionData, error) {
	data, err := c.rdb.Get(ctx, SessionKey(sessionID)).Bytes()
	if err == redis.Nil {
		return nil, nil
	}
	if err != nil {
		return nil, err
	}

	var session SessionData
	if err := json.Unmarshal(data, &session); err != nil {
		return nil, err
	}
	return &session, nil
}

// UpdateSessionActivity updates session last activity
func (c *Client) UpdateSessionActivity(ctx context.Context, sessionID string, tokens int64) error {
	session, err := c.GetSession(ctx, sessionID)
	if err != nil {
		return err
	}
	if session == nil {
		return fmt.Errorf("session not found: %s", sessionID)
	}

	session.LastActivityAt = time.Now()
	session.TokensUsed += tokens
	session.RequestCount++

	return c.SetSession(ctx, session, 24*time.Hour)
}

