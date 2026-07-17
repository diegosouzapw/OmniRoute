package redis

import (
	"context"
	"os"
	"testing"
	"time"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func getTestRedisConfig(t *testing.T) Config {
	url := os.Getenv("TEST_REDIS_URL")
	if url == "" {
		t.Skip("TEST_REDIS_URL not set, skipping Redis tests")
	}

	return Config{
		URL:         url,
		Password:    os.Getenv("TEST_REDIS_PASSWORD"),
		DB:          0,
		Timeout:     5 * time.Second,
		PoolSize:    10,
		MinIdleConns: 5,
	}
}

func TestNew_InvalidURL(t *testing.T) {
	config := Config{
		URL: "invalid://url",
	}

	client, err := New(config)

	// Should handle invalid URL gracefully
	// It will fall back to direct options
	assert.NotNil(t, client)
	assert.NoError(t, err)
}

func TestNew_ValidConfig(t *testing.T) {
	config := getTestRedisConfig(t)

	client, err := New(config)
	if err != nil {
		t.Skipf("Redis connection failed: %v. Skipping test.", err)
	}
	defer client.Close()

	require.NotNil(t, client)
	assert.NotNil(t, client.rdb)
}

func TestClient_Ping(t *testing.T) {
	config := getTestRedisConfig(t)
	ctx := context.Background()

	client, err := New(config)
	if err != nil {
		t.Skipf("Redis connection failed: %v. Skipping test.", err)
	}
	defer client.Close()

	err = client.Ping(ctx)
	assert.NoError(t, err)
}

func TestClient_Close(t *testing.T) {
	config := getTestRedisConfig(t)

	client, err := New(config)
	if err != nil {
		t.Skipf("Redis connection failed: %v. Skipping test.", err)
	}

	// Close should not panic
	assert.NotPanics(t, func() {
		client.Close()
	})

	// Second close should also not panic
	assert.NotPanics(t, func() {
		client.Close()
	})
}

func TestRateLimitKey(t *testing.T) {
	key := RateLimitKey("account123", "1h")
	assert.Equal(t, "ratelimit:account123:1h", key)
}

func TestIncrementRateLimit(t *testing.T) {
	config := getTestRedisConfig(t)
	ctx := context.Background()

	client, err := New(config)
	if err != nil {
		t.Skipf("Redis connection failed: %v. Skipping test.", err)
	}
	defer client.Close()

	key := "test:ratelimit:" + time.Now().Format(time.RFC3339Nano)
	count, err := client.IncrementRateLimit(ctx, key, 1*time.Minute)

	assert.NoError(t, err)
	assert.Equal(t, int64(1), count)

	// Increment again
	count, err = client.IncrementRateLimit(ctx, key, 1*time.Minute)
	assert.NoError(t, err)
	assert.Equal(t, int64(2), count)
}

func TestGetRateLimit(t *testing.T) {
	config := getTestRedisConfig(t)
	ctx := context.Background()

	client, err := New(config)
	if err != nil {
		t.Skipf("Redis connection failed: %v. Skipping test.", err)
	}
	defer client.Close()

	key := "test:ratelimit:" + time.Now().Format(time.RFC3339Nano)

	// Get non-existent key
	count, err := client.GetRateLimit(ctx, key)
	assert.NoError(t, err)
	assert.Equal(t, int64(0), count)

	// Set a value
	_, err = client.IncrementRateLimit(ctx, key, 1*time.Minute)
	require.NoError(t, err)

	// Get the value
	count, err = client.GetRateLimit(ctx, key)
	assert.NoError(t, err)
	assert.Equal(t, int64(1), count)
}

func TestCheckRateLimit_UnderLimit(t *testing.T) {
	config := getTestRedisConfig(t)
	ctx := context.Background()

	client, err := New(config)
	if err != nil {
		t.Skipf("Redis connection failed: %v. Skipping test.", err)
	}
	defer client.Close()

	key := "test:ratelimit:" + time.Now().Format(time.RFC3339Nano)
	limit := int64(10)

	allowed, count, err := client.CheckRateLimit(ctx, key, limit)

	assert.NoError(t, err)
	assert.True(t, allowed)
	assert.Equal(t, int64(1), count) // First increment
}

func TestCheckRateLimit_OverLimit(t *testing.T) {
	config := getTestRedisConfig(t)
	ctx := context.Background()

	client, err := New(config)
	if err != nil {
		t.Skipf("Redis connection failed: %v. Skipping test.", err)
	}
	defer client.Close()

	key := "test:ratelimit:" + time.Now().Format(time.RFC3339Nano)
	limit := int64(2)

	// Increment to limit
	_, err = client.IncrementRateLimit(ctx, key, 1*time.Minute)
	require.NoError(t, err)
	_, err = client.IncrementRateLimit(ctx, key, 1*time.Minute)
	require.NoError(t, err)

	// Check should still allow (at limit)
	allowed, count, err := client.CheckRateLimit(ctx, key, limit)
	assert.NoError(t, err)
	assert.True(t, allowed)
	assert.Equal(t, int64(2), count)

	// Increment over limit
	_, err = client.IncrementRateLimit(ctx, key, 1*time.Minute)
	require.NoError(t, err)

	// Check should deny
	allowed, count, err = client.CheckRateLimit(ctx, key, limit)
	assert.NoError(t, err)
	assert.False(t, allowed)
	assert.Equal(t, int64(3), count)
}
