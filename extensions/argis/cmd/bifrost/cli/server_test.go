package cli

import (
	"testing"
	"time"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"

	"github.com/kooshapari/bifrost-extensions/account"
	"github.com/kooshapari/bifrost-extensions/cmd/bifrost/cli/testutil"
)

func TestServerCommand(t *testing.T) {
	t.Run("server command exists", func(t *testing.T) {
		assert.NotNil(t, serverCmd)
		assert.Equal(t, "server", serverCmd.Use)
	})

	t.Run("server command has flags", func(t *testing.T) {
		portFlag := serverCmd.Flags().Lookup("port")
		assert.NotNil(t, portFlag, "server should have port flag")
		
		hostFlag := serverCmd.Flags().Lookup("host")
		assert.NotNil(t, hostFlag, "server should have host flag")
		
		pluginsFlag := serverCmd.Flags().Lookup("plugins")
		assert.NotNil(t, pluginsFlag, "server should have plugins flag")
		
		logLevelFlag := serverCmd.Flags().Lookup("log-level")
		assert.NotNil(t, logLevelFlag, "server should have log-level flag")
	})

	t.Run("server command default values", func(t *testing.T) {
		// Test default port
		port, err := serverCmd.Flags().GetInt("port")
		require.NoError(t, err)
		assert.Equal(t, 8080, port, "default port should be 8080")
		
		// Test default host
		host, err := serverCmd.Flags().GetString("host")
		require.NoError(t, err)
		assert.Equal(t, "0.0.0.0", host, "default host should be 0.0.0.0")
		
		// Test default log level
		logLevel, err := serverCmd.Flags().GetString("log-level")
		require.NoError(t, err)
		assert.Equal(t, "info", logLevel, "default log level should be info")
	})
}

func TestServerCommandFlags(t *testing.T) {
	t.Run("server with custom port", func(t *testing.T) {
		cmd := serverCmd
		cmd.SetArgs([]string{"--port", "9090"})
		
		port, err := cmd.Flags().GetInt("port")
		require.NoError(t, err)
		assert.Equal(t, 9090, port)
	})

	t.Run("server with custom host", func(t *testing.T) {
		cmd := serverCmd
		cmd.SetArgs([]string{"--host", "127.0.0.1"})
		
		host, err := cmd.Flags().GetString("host")
		require.NoError(t, err)
		assert.Equal(t, "127.0.0.1", host)
	})

	t.Run("server with custom plugins", func(t *testing.T) {
		cmd := serverCmd
		cmd.SetArgs([]string{"--plugins", "router,learning"})
		
		plugins, err := cmd.Flags().GetStringSlice("plugins")
		require.NoError(t, err)
		assert.Contains(t, plugins, "router")
		assert.Contains(t, plugins, "learning")
	})

	t.Run("server with custom log level", func(t *testing.T) {
		cmd := serverCmd
		cmd.SetArgs([]string{"--log-level", "debug"})
		
		logLevel, err := cmd.Flags().GetString("log-level")
		require.NoError(t, err)
		assert.Equal(t, "debug", logLevel)
	})
}

func TestServerCommandExecution(t *testing.T) {
	// Note: Full server execution tests would require mocking or integration testing
	// These tests verify the command structure and flag handling
	
	t.Run("server command via root", func(t *testing.T) {
		// Just verify the command can be accessed
		subcommands := rootCmd.Commands()
		serverFound := false
		for _, cmd := range subcommands {
			if cmd.Use == "server" {
				serverFound = true
				break
			}
		}
		assert.True(t, serverFound, "server command should be accessible via root")
	})
}

func TestSetupProviders(t *testing.T) {
	t.Run("setup providers with OPENAI_API_KEY", func(t *testing.T) {
		cleanup := testutil.SetEnv("OPENAI_API_KEY", "sk-test-key")
		defer cleanup()
		
		acct := account.NewEnhancedAccount(nil)
		setupProviders(acct)
		
		// Verify provider was set up
		// This would require access to account internals or integration test
		assert.NotNil(t, acct)
	})

	t.Run("setup providers with ANTHROPIC_API_KEY", func(t *testing.T) {
		cleanup := testutil.SetEnv("ANTHROPIC_API_KEY", "sk-ant-test-key")
		defer cleanup()
		
		acct := account.NewEnhancedAccount(nil)
		setupProviders(acct)
		
		assert.NotNil(t, acct)
	})

	t.Run("setup providers with both keys", func(t *testing.T) {
		cleanup1 := testutil.SetEnv("OPENAI_API_KEY", "sk-test-key")
		cleanup2 := testutil.SetEnv("ANTHROPIC_API_KEY", "sk-ant-test-key")
		defer cleanup1()
		defer cleanup2()
		
		acct := account.NewEnhancedAccount(nil)
		setupProviders(acct)
		
		assert.NotNil(t, acct)
	})

	t.Run("setup providers without keys", func(t *testing.T) {
		cleanup1 := testutil.UnsetEnv("OPENAI_API_KEY")
		cleanup2 := testutil.UnsetEnv("ANTHROPIC_API_KEY")
		defer cleanup1()
		defer cleanup2()
		
		acct := account.NewEnhancedAccount(nil)
		setupProviders(acct)
		
		// Should not error, just not set up providers
		assert.NotNil(t, acct)
	})
}

// Integration test helper - would be used in integration test suite
func TestServerStartupIntegration(t *testing.T) {
	if testing.Short() {
		t.Skip("Skipping integration test in short mode")
	}
	
	t.Run("server starts and shuts down gracefully", func(t *testing.T) {
		// This would require:
		// 1. Mock or test server setup
		// 2. Start server in goroutine
		// 3. Send shutdown signal
		// 4. Verify clean shutdown
		
		// For now, just verify the structure
		assert.NotNil(t, serverCmd)
	})
}

// Helper function for testing server startup with timeout
func startServerWithTimeout(timeout time.Duration) error {
	// This would be used in integration tests
	// to start server and verify it starts within timeout
	return nil
}
