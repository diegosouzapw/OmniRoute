package db

import (
	"context"
	"database/sql"
	"fmt"
	"log/slog"

	"github.com/golang-migrate/migrate/v4"
	"github.com/golang-migrate/migrate/v4/database/postgres"
	_ "github.com/golang-migrate/migrate/v4/source/file"
	"github.com/jackc/pgx/v5/pgxpool"
	_ "github.com/jackc/pgx/v5/stdlib"
)

// Migrator handles database migrations
type Migrator struct {
	migrate *migrate.Migrate
	logger  *slog.Logger
}

// NewMigrator creates a new migrator instance
func NewMigrator(pool *pgxpool.Pool, migrationsPath string, logger *slog.Logger) (*Migrator, error) {
	if logger == nil {
		logger = slog.Default()
	}

	// Get underlying sql.DB from pgxpool
	sqlDB := stdlibDB(pool)
	// Note: Don't close sqlDB here - the migrate library manages it

	// Create postgres driver instance
	driver, err := postgres.WithInstance(sqlDB, &postgres.Config{})
	if err != nil {
		return nil, fmt.Errorf("failed to create postgres driver: %w", err)
	}

	// Create migrate instance
	m, err := migrate.NewWithDatabaseInstance(
		"file://"+migrationsPath,
		"postgres",
		driver,
	)
	if err != nil {
		return nil, fmt.Errorf("failed to create migrate instance: %w", err)
	}

	return &Migrator{
		migrate: m,
		logger:  logger.With("component", "migrator"),
	}, nil
}

// stdlibDB converts pgxpool.Pool to *sql.DB for migration library
func stdlibDB(pool *pgxpool.Pool) *sql.DB {
	// Get connection string from pool config
	config := pool.Config()
	
	// Build connection string using pgx connection string format
	connStr := fmt.Sprintf(
		"postgres://%s:%s@%s:%d/%s",
		config.ConnConfig.User,
		config.ConnConfig.Password,
		config.ConnConfig.Host,
		config.ConnConfig.Port,
		config.ConnConfig.Database,
	)
	
	// Add SSL mode if configured
	if config.ConnConfig.TLSConfig != nil {
		connStr += "?sslmode=require"
	} else {
		connStr += "?sslmode=disable"
	}

	// Open stdlib connection using pgx driver
	db, err := sql.Open("pgx", connStr)
	if err != nil {
		panic(fmt.Sprintf("failed to create stdlib DB: %v", err))
	}
	
	// Set connection pool settings
	db.SetMaxOpenConns(int(config.MaxConns))
	db.SetMaxIdleConns(int(config.MinConns))
	
	return db
}

// Up applies all pending migrations
func (m *Migrator) Up() error {
	m.logger.Info("Applying all pending migrations")
	if err := m.migrate.Up(); err != nil {
		if err == migrate.ErrNoChange {
			m.logger.Info("No pending migrations")
			return nil
		}
		return fmt.Errorf("failed to apply migrations: %w", err)
	}

	version, dirty, err := m.migrate.Version()
	if err != nil {
		if err == migrate.ErrNilVersion {
			m.logger.Info("Migrations applied successfully", "version", 0)
			return nil
		}
		return fmt.Errorf("failed to get version: %w", err)
	}

	if dirty {
		return fmt.Errorf("database is in dirty state at version %d", version)
	}

	m.logger.Info("Migrations applied successfully", "version", version)
	return nil
}

// Down rolls back all migrations
func (m *Migrator) Down() error {
	m.logger.Info("Rolling back all migrations")
	if err := m.migrate.Down(); err != nil {
		if err == migrate.ErrNoChange {
			m.logger.Info("No migrations to rollback")
			return nil
		}
		return fmt.Errorf("failed to rollback migrations: %w", err)
	}

	m.logger.Info("All migrations rolled back successfully")
	return nil
}

// Steps applies or rolls back a specific number of migrations
func (m *Migrator) Steps(n int) error {
	if n > 0 {
		m.logger.Info("Applying migrations", "steps", n)
	} else {
		m.logger.Info("Rolling back migrations", "steps", -n)
	}

	if err := m.migrate.Steps(n); err != nil {
		if err == migrate.ErrNoChange {
			m.logger.Info("No changes to apply")
			return nil
		}
		return fmt.Errorf("failed to step migrations: %w", err)
	}

	version, dirty, err := m.migrate.Version()
	if err != nil {
		if err == migrate.ErrNilVersion {
			m.logger.Info("Migration steps completed", "version", 0)
			return nil
		}
		return fmt.Errorf("failed to get version: %w", err)
	}

	if dirty {
		return fmt.Errorf("database is in dirty state at version %d", version)
	}

	m.logger.Info("Migration steps completed", "version", version)
	return nil
}

// Version returns the current migration version
func (m *Migrator) Version() (uint, bool, error) {
	version, dirty, err := m.migrate.Version()
	if err != nil {
		if err == migrate.ErrNilVersion {
			return 0, false, nil
		}
		return 0, false, err
	}
	return version, dirty, nil
}

// Force sets the migration version without running migrations
// Use with caution - only for fixing dirty state
func (m *Migrator) Force(version int) error {
	m.logger.Warn("Forcing migration version", "version", version)
	if err := m.migrate.Force(version); err != nil {
		return fmt.Errorf("failed to force version: %w", err)
	}
	m.logger.Info("Migration version forced", "version", version)
	return nil
}

// Close closes the migrator
func (m *Migrator) Close() error {
	sourceErr, dbErr := m.migrate.Close()
	if sourceErr != nil {
		return fmt.Errorf("failed to close source: %w", sourceErr)
	}
	if dbErr != nil {
		return fmt.Errorf("failed to close database: %w", dbErr)
	}
	return nil
}

// MigrateDB applies migrations to a database instance
func MigrateDB(ctx context.Context, db *DB, migrationsPath string, logger *slog.Logger) error {
	migrator, err := NewMigrator(db.Pool, migrationsPath, logger)
	if err != nil {
		return fmt.Errorf("failed to create migrator: %w", err)
	}
	defer migrator.Close()

	return migrator.Up()
}
