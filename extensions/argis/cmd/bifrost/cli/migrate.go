package cli

import (
	"context"
	"fmt"
	"log/slog"
	"os"

	"github.com/spf13/cobra"

	"github.com/kooshapari/bifrost-extensions/db"
)

var (
	migratePath     string
	migrateSteps    int
	migrateVersion  int
	migrateForce    bool
)

var migrateCmd = &cobra.Command{
	Use:   "migrate",
	Short: "Manage database migrations",
	Long:  `Apply, rollback, or check database migration status.`,
}

var migrateUpCmd = &cobra.Command{
	Use:   "up",
	Short: "Apply all pending migrations",
	Long:  `Applies all pending migrations to bring the database to the latest version.`,
	RunE:  runMigrateUp,
}

var migrateDownCmd = &cobra.Command{
	Use:   "down",
	Short: "Rollback all migrations",
	Long:  `Rolls back all migrations to version 0. Use with caution!`,
	RunE:  runMigrateDown,
}

var migrateStepsCmd = &cobra.Command{
	Use:   "steps",
	Short: "Apply or rollback a specific number of migrations",
	Long:  `Applies or rolls back a specific number of migrations. Use positive numbers to apply, negative to rollback.`,
	RunE:  runMigrateSteps,
}

var migrateVersionCmd = &cobra.Command{
	Use:   "version",
	Short: "Show current migration version",
	Long:  `Shows the current database migration version and dirty state.`,
	RunE:  runMigrateVersion,
}

var migrateForceCmd = &cobra.Command{
	Use:   "force",
	Short: "Force migration version (use with caution)",
	Long:  `Forces the migration version without running migrations. Use only to fix dirty state.`,
	RunE:  runMigrateForce,
}

func init() {
	// Add migrate command to root
	rootCmd.AddCommand(migrateCmd)
	
	// Add subcommands
	migrateCmd.AddCommand(migrateUpCmd)
	migrateCmd.AddCommand(migrateDownCmd)
	migrateCmd.AddCommand(migrateStepsCmd)
	migrateCmd.AddCommand(migrateVersionCmd)
	migrateCmd.AddCommand(migrateForceCmd)
	
	// Flags
	migrateUpCmd.Flags().StringVarP(&migratePath, "path", "p", "db/migrations", "Path to migration files")
	migrateDownCmd.Flags().StringVarP(&migratePath, "path", "p", "db/migrations", "Path to migration files")
	migrateStepsCmd.Flags().StringVarP(&migratePath, "path", "p", "db/migrations", "Path to migration files")
	migrateStepsCmd.Flags().IntVarP(&migrateSteps, "steps", "n", 1, "Number of steps (positive=up, negative=down)")
	migrateVersionCmd.Flags().StringVarP(&migratePath, "path", "p", "db/migrations", "Path to migration files")
	migrateForceCmd.Flags().StringVarP(&migratePath, "path", "p", "db/migrations", "Path to migration files")
	migrateForceCmd.Flags().IntVarP(&migrateVersion, "version", "v", 0, "Version to force")
}

func runMigrateUp(cmd *cobra.Command, args []string) error {
	ctx := context.Background()
	logger := slog.New(slog.NewTextHandler(os.Stdout, &slog.HandlerOptions{
		Level: slog.LevelInfo,
	}))

	// Get database connection
	database, err := getDatabase(ctx, logger)
	if err != nil {
		return fmt.Errorf("failed to connect to database: %w", err)
	}
	defer database.Close()

	// Create migrator
	migrator, err := db.NewMigrator(database.Pool, migratePath, logger)
	if err != nil {
		return fmt.Errorf("failed to create migrator: %w", err)
	}
	defer migrator.Close()

	// Apply migrations
	if err := migrator.Up(); err != nil {
		return err
	}

	version, dirty, err := migrator.Version()
	if err != nil && err.Error() != "no change" {
		return fmt.Errorf("failed to get version: %w", err)
	}

	if dirty {
		logger.Warn("Database is in dirty state", "version", version)
		return fmt.Errorf("database is in dirty state at version %d", version)
	}

	logger.Info("Migrations applied successfully", "version", version)
	return nil
}

func runMigrateDown(cmd *cobra.Command, args []string) error {
	ctx := context.Background()
	logger := slog.New(slog.NewTextHandler(os.Stdout, &slog.HandlerOptions{
		Level: slog.LevelInfo,
	}))

	// Get database connection
	database, err := getDatabase(ctx, logger)
	if err != nil {
		return fmt.Errorf("failed to connect to database: %w", err)
	}
	defer database.Close()

	// Create migrator
	migrator, err := db.NewMigrator(database.Pool, migratePath, logger)
	if err != nil {
		return fmt.Errorf("failed to create migrator: %w", err)
	}
	defer migrator.Close()

	// Rollback migrations
	if err := migrator.Down(); err != nil {
		return err
	}

	logger.Info("All migrations rolled back successfully")
	return nil
}

func runMigrateSteps(cmd *cobra.Command, args []string) error {
	ctx := context.Background()
	logger := slog.New(slog.NewTextHandler(os.Stdout, &slog.HandlerOptions{
		Level: slog.LevelInfo,
	}))

	// Get database connection
	database, err := getDatabase(ctx, logger)
	if err != nil {
		return fmt.Errorf("failed to connect to database: %w", err)
	}
	defer database.Close()

	// Create migrator
	migrator, err := db.NewMigrator(database.Pool, migratePath, logger)
	if err != nil {
		return fmt.Errorf("failed to create migrator: %w", err)
	}
	defer migrator.Close()

	// Apply steps
	if err := migrator.Steps(migrateSteps); err != nil {
		return err
	}

	version, dirty, err := migrator.Version()
	if err != nil {
		return fmt.Errorf("failed to get version: %w", err)
	}

	if dirty {
		logger.Warn("Database is in dirty state", "version", version)
		return fmt.Errorf("database is in dirty state at version %d", version)
	}

	logger.Info("Migration steps completed", "version", version)
	return nil
}

func runMigrateVersion(cmd *cobra.Command, args []string) error {
	ctx := context.Background()
	logger := slog.New(slog.NewTextHandler(os.Stdout, &slog.HandlerOptions{
		Level: slog.LevelInfo,
	}))

	// Get database connection
	database, err := getDatabase(ctx, logger)
	if err != nil {
		return fmt.Errorf("failed to connect to database: %w", err)
	}
	defer database.Close()

	// Create migrator
	migrator, err := db.NewMigrator(database.Pool, migratePath, logger)
	if err != nil {
		return fmt.Errorf("failed to create migrator: %w", err)
	}
	defer migrator.Close()

	// Get version
	version, dirty, err := migrator.Version()
	if err != nil {
		return fmt.Errorf("failed to get version: %w", err)
	}

	if dirty {
		logger.Warn("Database is in dirty state", "version", version)
		fmt.Printf("Version: %d (DIRTY)\n", version)
		return fmt.Errorf("database is in dirty state")
	}

	fmt.Printf("Version: %d\n", version)
	return nil
}

func runMigrateForce(cmd *cobra.Command, args []string) error {
	ctx := context.Background()
	logger := slog.New(slog.NewTextHandler(os.Stdout, &slog.HandlerOptions{
		Level: slog.LevelWarn, // Use warn level for force operations
	}))

	// Get database connection
	database, err := getDatabase(ctx, logger)
	if err != nil {
		return fmt.Errorf("failed to connect to database: %w", err)
	}
	defer database.Close()

	// Create migrator
	migrator, err := db.NewMigrator(database.Pool, migratePath, logger)
	if err != nil {
		return fmt.Errorf("failed to create migrator: %w", err)
	}
	defer migrator.Close()

	// Force version
	if err := migrator.Force(migrateVersion); err != nil {
		return err
	}

	logger.Warn("Migration version forced", "version", migrateVersion)
	return nil
}

func getDatabase(ctx context.Context, logger *slog.Logger) (*db.DB, error) {
	// Try to get database URL from environment
	databaseURL := os.Getenv("DATABASE_URL")
	if databaseURL != "" {
		return db.NewFromURL(ctx, databaseURL)
	}

	// Otherwise use config
	cfg := db.DefaultConfig()
	
	// Override with environment variables if set
	if host := os.Getenv("DB_HOST"); host != "" {
		cfg.Host = host
	}
	if port := os.Getenv("DB_PORT"); port != "" {
		fmt.Sscanf(port, "%d", &cfg.Port)
	}
	if user := os.Getenv("DB_USER"); user != "" {
		cfg.User = user
	}
	if password := os.Getenv("DB_PASSWORD"); password != "" {
		cfg.Password = password
	}
	if database := os.Getenv("DB_NAME"); database != "" {
		cfg.Database = database
	}

	return db.New(ctx, cfg)
}
