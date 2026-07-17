package cli

import (
	"os"
	"os/exec"
	"path/filepath"
	"runtime"
	"testing"
	"time"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"

	"github.com/kooshapari/bifrost-extensions/cmd/bifrost/cli/testutil"
)

// Integration tests require the full CLI to be built
// Run with: go test -tags=integration ./cmd/bifrost/cli

func TestCLIIntegration(t *testing.T) {
	if testing.Short() {
		t.Skip("Skipping integration tests in short mode")
	}

	t.Run("full init workflow", func(t *testing.T) {
		tmpDir := t.TempDir()
		originalDir, _ := os.Getwd()
		defer os.Chdir(originalDir)
		
		require.NoError(t, os.Chdir(tmpDir))
		
		// Run init
		stdout, _, err := testutil.ExecuteCommand(rootCmd, "init")
		require.NoError(t, err)
		assert.Contains(t, stdout, "Project initialized successfully")
		
		// Verify all files created
		files := []string{
			".env.example",
			".bifrost/config/bifrost.yaml",
		}
		
		for _, file := range files {
			_, err := os.Stat(file)
			assert.NoError(t, err, "%s should exist", file)
		}
		
		// Verify directories created
		dirs := []string{
			".bifrost",
			".bifrost/config",
			".bifrost/plugins",
			".bifrost/data",
		}
		
		for _, dir := range dirs {
			info, err := os.Stat(dir)
			assert.NoError(t, err, "%s should exist", dir)
			assert.True(t, info.IsDir(), "%s should be a directory", dir)
		}
	})

	t.Run("config workflow", func(t *testing.T) {
		testKey := "BIFROST_TEST_KEY"
		testValue := "test-value-123"
		defer os.Unsetenv(testKey)
		
		// Set config
		stdout, _, err := testutil.ExecuteCommand(rootCmd, "config", "set", testKey, testValue)
		require.NoError(t, err)
		assert.Contains(t, stdout, "Set")
		
		// Show config
		stdout, _, err = testutil.ExecuteCommand(rootCmd, "config", "show")
		require.NoError(t, err)
		assert.Contains(t, stdout, testKey)
		
		// Verify env var was set
		value := os.Getenv(testKey)
		assert.Equal(t, testValue, value)
	})

	t.Run("plugin workflow", func(t *testing.T) {
		// List plugins
		stdout, _, err := testutil.ExecuteCommand(rootCmd, "plugin", "list")
		require.NoError(t, err)
		assert.Contains(t, stdout, "Available Bifrost Plugins")
		
		// Enable plugin
		stdout, _, err = testutil.ExecuteCommand(rootCmd, "plugin", "enable", "embeddings")
		require.NoError(t, err)
		assert.Contains(t, stdout, "Enabled plugin")
		
		// Disable plugin
		stdout, _, err = testutil.ExecuteCommand(rootCmd, "plugin", "disable", "embeddings")
		require.NoError(t, err)
		assert.Contains(t, stdout, "Disabled plugin")
		
		// Show config
		stdout, _, err = testutil.ExecuteCommand(rootCmd, "plugin", "config", "router")
		require.NoError(t, err)
		assert.Contains(t, stdout, "Configuration for plugin")
	})

	t.Run("dataset workflow", func(t *testing.T) {
		// List datasets
		stdout, _, err := testutil.ExecuteCommand(rootCmd, "dataset", "list")
		require.NoError(t, err)
		assert.Contains(t, stdout, "Available Datasets")
		
		// Show stats
		stdout, _, err = testutil.ExecuteCommand(rootCmd, "dataset", "stats")
		require.NoError(t, err)
		assert.Contains(t, stdout, "Dataset Statistics")
		
		// Load dataset (mock)
		stdout, _, err = testutil.ExecuteCommand(rootCmd, "dataset", "load", "WildChat")
		require.NoError(t, err)
		assert.Contains(t, stdout, "Loading dataset")
	})

	t.Run("deploy workflow with dry-run", func(t *testing.T) {
		platforms := []string{"fly", "vercel", "railway", "render", "homebox"}
		
		for _, platform := range platforms {
			stdout, _, _ := testutil.ExecuteCommand(rootCmd, "deploy", platform, "--dry-run")
			// Some may error if CLI tools not installed, but should show message
			assert.Contains(t, stdout, "Deploying to", "platform %s should show deployment message", platform)
		}
	})

	t.Run("version command", func(t *testing.T) {
		stdout, _, err := testutil.ExecuteCommand(rootCmd, "version")
		require.NoError(t, err)
		assert.Contains(t, stdout, "Bifrost CLI")
		assert.Contains(t, stdout, "1.0.0")
	})
}

func TestCLIErrorHandling(t *testing.T) {
	if testing.Short() {
		t.Skip("Skipping integration tests in short mode")
	}

	t.Run("invalid command", func(t *testing.T) {
		_, stderr, err := testutil.ExecuteCommand(rootCmd, "invalid-command")
		assert.Error(t, err)
		assert.Contains(t, stderr, "unknown command")
	})

	t.Run("missing required arguments", func(t *testing.T) {
		_, _, err := testutil.ExecuteCommand(rootCmd, "config", "set")
		assert.Error(t, err, "set should require arguments")
		
		_, _, err = testutil.ExecuteCommand(rootCmd, "plugin", "enable")
		assert.Error(t, err, "enable should require arguments")
	})

	t.Run("invalid flag values", func(t *testing.T) {
		_, _, err := testutil.ExecuteCommand(rootCmd, "server", "--port", "invalid")
		assert.Error(t, err, "port should be an integer")
	})
}

// Cross-platform tests
func TestCrossPlatformCompatibility(t *testing.T) {
	if testing.Short() {
		t.Skip("Skipping cross-platform tests in short mode")
	}

	t.Run("version shows correct OS", func(t *testing.T) {
		stdout, _, err := testutil.ExecuteCommand(versionCmd)
		require.NoError(t, err)
		
		assert.Contains(t, stdout, runtime.GOOS)
		assert.Contains(t, stdout, runtime.GOARCH)
	})

	t.Run("init works on all platforms", func(t *testing.T) {
		tmpDir := t.TempDir()
		originalDir, _ := os.Getwd()
		defer os.Chdir(originalDir)
		
		require.NoError(t, os.Chdir(tmpDir))
		
		_, _, err := testutil.ExecuteCommand(initCmd)
		require.NoError(t, err, "init should work on %s/%s", runtime.GOOS, runtime.GOARCH)
		
		// Verify platform-agnostic files created
		_, err = os.Stat(".env.example")
		assert.NoError(t, err)
	})
}

// Performance tests
func TestCLIPerformance(t *testing.T) {
	if testing.Short() {
		t.Skip("Skipping performance tests in short mode")
	}

	t.Run("version command is fast", func(t *testing.T) {
		start := time.Now()
		_, _, err := testutil.ExecuteCommand(versionCmd)
		duration := time.Since(start)
		
		require.NoError(t, err)
		assert.Less(t, duration, 100*time.Millisecond, "version command should be fast")
	})

	t.Run("help command is fast", func(t *testing.T) {
		start := time.Now()
		_, _, err := testutil.ExecuteCommand(rootCmd, "--help")
		duration := time.Since(start)
		
		// Help may return error in some cobra versions
		_ = err
		assert.Less(t, duration, 200*time.Millisecond, "help command should be fast")
	})
}

// Test CLI binary if available
func TestCLIBinary(t *testing.T) {
	if testing.Short() {
		t.Skip("Skipping binary tests in short mode")
	}

	// Look for bifrost binary
	binaryPath := filepath.Join("..", "..", "..", "bin", "bifrost")
	if runtime.GOOS == "windows" {
		binaryPath += ".exe"
	}
	
	if _, err := os.Stat(binaryPath); os.IsNotExist(err) {
		t.Skipf("Bifrost binary not found at %s, skipping binary tests", binaryPath)
	}

	t.Run("binary version command", func(t *testing.T) {
		cmd := exec.Command(binaryPath, "version")
		output, err := cmd.CombinedOutput()
		
		require.NoError(t, err, "binary should execute version command")
		assert.Contains(t, string(output), "Bifrost CLI")
	})

	t.Run("binary help command", func(t *testing.T) {
		cmd := exec.Command(binaryPath, "--help")
		output, err := cmd.CombinedOutput()
		
		// Help may return non-zero exit code
		_ = err
		assert.Contains(t, string(output), "Bifrost")
	})
}
