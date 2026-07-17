// Package db provides database connectivity and query helpers for bifrost-extensions.
package db

import (
	"context"
	"fmt"
	"time"

	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"

	"github.com/kooshapari/bifrost-extensions/db/sqlc"
)

// DB wraps the connection pool and provides access to generated queries.
type DB struct {
	Pool    *pgxpool.Pool
	Queries *sqlc.Queries
}

// Config holds database connection configuration.
type Config struct {
	Host     string
	Port     int
	User     string
	Password string
	Database string
	SSLMode  string

	// Pool settings
	MaxConns          int32
	MinConns          int32
	MaxConnLifetime   time.Duration
	MaxConnIdleTime   time.Duration
	HealthCheckPeriod time.Duration
}

// DefaultConfig returns a config with sensible defaults.
func DefaultConfig() Config {
	return Config{
		Host:              "localhost",
		Port:              5432,
		User:              "postgres",
		Password:          "",
		Database:          "bifrost",
		SSLMode:           "prefer",
		MaxConns:          25,
		MinConns:          5,
		MaxConnLifetime:   time.Hour,
		MaxConnIdleTime:   30 * time.Minute,
		HealthCheckPeriod: time.Minute,
	}
}

// ConnectionString returns a PostgreSQL connection string.
func (c Config) ConnectionString() string {
	return fmt.Sprintf(
		"host=%s port=%d user=%s password=%s dbname=%s sslmode=%s",
		c.Host, c.Port, c.User, c.Password, c.Database, c.SSLMode,
	)
}

// New creates a new database connection pool.
func New(ctx context.Context, cfg Config) (*DB, error) {
	poolCfg, err := pgxpool.ParseConfig(cfg.ConnectionString())
	if err != nil {
		return nil, fmt.Errorf("failed to parse config: %w", err)
	}

	// Apply pool settings
	poolCfg.MaxConns = cfg.MaxConns
	poolCfg.MinConns = cfg.MinConns
	poolCfg.MaxConnLifetime = cfg.MaxConnLifetime
	poolCfg.MaxConnIdleTime = cfg.MaxConnIdleTime
	poolCfg.HealthCheckPeriod = cfg.HealthCheckPeriod

	// Register pgvector type
	poolCfg.AfterConnect = func(ctx context.Context, conn *pgx.Conn) error {
		// pgvector types are registered automatically by pgvector-go
		return nil
	}

	pool, err := pgxpool.NewWithConfig(ctx, poolCfg)
	if err != nil {
		return nil, fmt.Errorf("failed to create pool: %w", err)
	}

	// Verify connection
	if err := pool.Ping(ctx); err != nil {
		pool.Close()
		return nil, fmt.Errorf("failed to ping database: %w", err)
	}

	return &DB{
		Pool:    pool,
		Queries: sqlc.New(pool),
	}, nil
}

// NewFromURL creates a database connection from a URL.
// URL format: postgres://user:password@host:port/database?sslmode=disable
func NewFromURL(ctx context.Context, databaseURL string) (*DB, error) {
	poolCfg, err := pgxpool.ParseConfig(databaseURL)
	if err != nil {
		return nil, fmt.Errorf("failed to parse URL: %w", err)
	}

	pool, err := pgxpool.NewWithConfig(ctx, poolCfg)
	if err != nil {
		return nil, fmt.Errorf("failed to create pool: %w", err)
	}

	if err := pool.Ping(ctx); err != nil {
		pool.Close()
		return nil, fmt.Errorf("failed to ping database: %w", err)
	}

	return &DB{
		Pool:    pool,
		Queries: sqlc.New(pool),
	}, nil
}

// Close closes the database connection pool.
func (db *DB) Close() {
	db.Pool.Close()
}

// WithTx executes a function within a transaction.
func (db *DB) WithTx(ctx context.Context, fn func(*sqlc.Queries) error) error {
	tx, err := db.Pool.Begin(ctx)
	if err != nil {
		return fmt.Errorf("failed to begin transaction: %w", err)
	}
	defer tx.Rollback(ctx)

	qtx := db.Queries.WithTx(tx)
	if err := fn(qtx); err != nil {
		return err
	}

	return tx.Commit(ctx)
}

// Health checks database connectivity.
func (db *DB) Health(ctx context.Context) error {
	return db.Pool.Ping(ctx)
}

