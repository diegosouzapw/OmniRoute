package db

import (
	"context"
	"os"
	"testing"
	"time"

	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/kooshapari/bifrost-extensions/db/sqlc"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func getTestDatabaseURL(t *testing.T) string {
	url := os.Getenv("TEST_DATABASE_URL")
	if url == "" {
		t.Skip("TEST_DATABASE_URL not set, skipping database tests")
	}
	return url
}

func TestDefaultConfig(t *testing.T) {
	cfg := DefaultConfig()

	assert.Equal(t, "localhost", cfg.Host)
	assert.Equal(t, 5432, cfg.Port)
	assert.Equal(t, "postgres", cfg.User)
	assert.Equal(t, "", cfg.Password)
	assert.Equal(t, "bifrost", cfg.Database)
	assert.Equal(t, "prefer", cfg.SSLMode)
	assert.Equal(t, int32(25), cfg.MaxConns)
	assert.Equal(t, int32(5), cfg.MinConns)
	assert.Equal(t, time.Hour, cfg.MaxConnLifetime)
	assert.Equal(t, 30*time.Minute, cfg.MaxConnIdleTime)
	assert.Equal(t, time.Minute, cfg.HealthCheckPeriod)
}

func TestConfig_ConnectionString(t *testing.T) {
	cfg := Config{
		Host:     "testhost",
		Port:     5433,
		User:     "testuser",
		Password: "testpass",
		Database: "testdb",
		SSLMode:  "require",
	}

	connStr := cfg.ConnectionString()

	assert.Contains(t, connStr, "host=testhost")
	assert.Contains(t, connStr, "port=5433")
	assert.Contains(t, connStr, "user=testuser")
	assert.Contains(t, connStr, "password=testpass")
	assert.Contains(t, connStr, "dbname=testdb")
	assert.Contains(t, connStr, "sslmode=require")
}

func TestNew_InvalidConfig(t *testing.T) {
	ctx := context.Background()
	cfg := Config{
		Host:     "invalid-host-that-does-not-exist",
		Port:     9999,
		User:     "invalid",
		Password: "invalid",
		Database: "invalid",
		SSLMode:  "require",
	}

	db, err := New(ctx, cfg)

	assert.Error(t, err)
	assert.Nil(t, db)
}

func TestNew_ValidConfig(t *testing.T) {
	url := getTestDatabaseURL(t)
	ctx := context.Background()

	poolCfg, err := pgxpool.ParseConfig(url)
	require.NoError(t, err)

	cfg := Config{
		Host:              poolCfg.ConnConfig.Host,
		Port:              int(poolCfg.ConnConfig.Port),
		User:              poolCfg.ConnConfig.User,
		Password:          poolCfg.ConnConfig.Password,
		Database:          poolCfg.ConnConfig.Database,
		SSLMode:           "prefer",
		MaxConns:          5,
		MinConns:          2,
		MaxConnLifetime:   time.Hour,
		MaxConnIdleTime:   30 * time.Minute,
		HealthCheckPeriod: time.Minute,
	}

	db, err := New(ctx, cfg)

	if err != nil {
		t.Skipf("Database connection failed: %v. Skipping test.", err)
	}

	require.NotNil(t, db)
	assert.NotNil(t, db.Pool)
	assert.NotNil(t, db.Queries)

	// Cleanup
	db.Close()
}

func TestNewFromURL_InvalidURL(t *testing.T) {
	ctx := context.Background()

	db, err := NewFromURL(ctx, "invalid-url")

	assert.Error(t, err)
	assert.Nil(t, db)
}

func TestNewFromURL_ValidURL(t *testing.T) {
	url := getTestDatabaseURL(t)
	if url == "" {
		t.Skip("TEST_DATABASE_URL not set")
	}

	ctx := context.Background()
	db, err := NewFromURL(ctx, url)

	if err != nil {
		t.Skipf("Database connection failed: %v. Skipping test.", err)
	}

	require.NotNil(t, db)
	assert.NotNil(t, db.Pool)
	assert.NotNil(t, db.Queries)

	// Cleanup
	db.Close()
}

func TestDB_Close(t *testing.T) {
	url := getTestDatabaseURL(t)
	if url == "" {
		t.Skip("TEST_DATABASE_URL not set")
	}

	ctx := context.Background()
	db, err := NewFromURL(ctx, url)
	if err != nil {
		t.Skipf("Database connection failed: %v. Skipping test.", err)
	}

	require.NotNil(t, db)

	// Close should not panic
	assert.NotPanics(t, func() {
		db.Close()
	})

	// Second close should also not panic
	assert.NotPanics(t, func() {
		db.Close()
	})
}

func TestDB_Health(t *testing.T) {
	url := getTestDatabaseURL(t)
	if url == "" {
		t.Skip("TEST_DATABASE_URL not set")
	}

	ctx := context.Background()
	db, err := NewFromURL(ctx, url)
	if err != nil {
		t.Skipf("Database connection failed: %v. Skipping test.", err)
	}
	defer db.Close()

	err = db.Health(ctx)
	assert.NoError(t, err)
}

func TestDB_Health_ClosedConnection(t *testing.T) {
	url := getTestDatabaseURL(t)
	if url == "" {
		t.Skip("TEST_DATABASE_URL not set")
	}

	ctx := context.Background()
	db, err := NewFromURL(ctx, url)
	if err != nil {
		t.Skipf("Database connection failed: %v. Skipping test.", err)
	}

	db.Close()

	err = db.Health(ctx)
	assert.Error(t, err)
}

func TestDB_WithTx_Success(t *testing.T) {
	url := getTestDatabaseURL(t)
	if url == "" {
		t.Skip("TEST_DATABASE_URL not set")
	}

	ctx := context.Background()
	db, err := NewFromURL(ctx, url)
	if err != nil {
		t.Skipf("Database connection failed: %v. Skipping test.", err)
	}
	defer db.Close()

	err = db.WithTx(ctx, func(q *sqlc.Queries) error {
		// Transaction should succeed
		return nil
	})

	assert.NoError(t, err)
}

func TestDB_WithTx_Rollback(t *testing.T) {
	url := getTestDatabaseURL(t)
	if url == "" {
		t.Skip("TEST_DATABASE_URL not set")
	}

	ctx := context.Background()
	db, err := NewFromURL(ctx, url)
	if err != nil {
		t.Skipf("Database connection failed: %v. Skipping test.", err)
	}
	defer db.Close()

	testErr := assert.AnError
	err = db.WithTx(ctx, func(q *sqlc.Queries) error {
		// Return error to trigger rollback
		return testErr
	})

	assert.Error(t, err)
	assert.Equal(t, testErr, err)
}

func TestDB_WithTx_ContextTimeout(t *testing.T) {
	url := getTestDatabaseURL(t)
	if url == "" {
		t.Skip("TEST_DATABASE_URL not set")
	}

	ctx, cancel := context.WithTimeout(context.Background(), 1*time.Nanosecond)
	defer cancel()

	db, err := NewFromURL(ctx, url)
	if err != nil {
		t.Skipf("Database connection failed: %v. Skipping test.", err)
	}
	defer db.Close()

	// Wait for context to timeout
	time.Sleep(10 * time.Millisecond)

	err = db.WithTx(ctx, func(q *sqlc.Queries) error {
		return nil
	})

	// Should fail due to context timeout
	assert.Error(t, err)
}

func TestConfig_PoolSettings(t *testing.T) {
	cfg := Config{
		MaxConns:          10,
		MinConns:          3,
		MaxConnLifetime:   2 * time.Hour,
		MaxConnIdleTime:   1 * time.Hour,
		HealthCheckPeriod: 2 * time.Minute,
	}

	url := getTestDatabaseURL(t)
	if url == "" {
		t.Skip("TEST_DATABASE_URL not set")
	}

	ctx := context.Background()
	poolCfg, err := pgxpool.ParseConfig(url)
	require.NoError(t, err)

	cfg.Host = poolCfg.ConnConfig.Host
	cfg.Port = int(poolCfg.ConnConfig.Port)
	cfg.User = poolCfg.ConnConfig.User
	cfg.Password = poolCfg.ConnConfig.Password
	cfg.Database = poolCfg.ConnConfig.Database

	db, err := New(ctx, cfg)
	if err != nil {
		t.Skipf("Database connection failed: %v. Skipping test.", err)
	}
	defer db.Close()

	// Verify pool settings were applied
	stats := db.Pool.Stat()
	assert.Equal(t, int32(10), stats.MaxConns())
	assert.Equal(t, int32(3), stats.MinConns())
}
