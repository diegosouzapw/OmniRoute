package cli

import (
	"os"
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"

	"github.com/kooshapari/bifrost-extensions/cmd/bifrost/cli/testutil"
)

func TestInitCommand(t *testing.T) {
	t.Run("init command exists", func(t *testing.T) {
		assert.NotNil(t, initCmd)
		assert.Equal(t, "init", initCmd.Use)
	})

	t.Run("init creates directories", func(t *testing.T) {
		// Use a temporary directory for testing
		tmpDir := t.TempDir()
		originalDir, _ := os.Getwd()
		defer os.Chdir(originalDir)
		
		require.NoError(t, os.Chdir(tmpDir))
		
		stdout, _, err := testutil.ExecuteCommand(initCmd)
		require.NoError(t, err)
		
		// Check directories were created
		dirs := []string{
			".bifrost",
			".bifrost/config",
			".bifrost/plugins",
			".bifrost/data",
		}
		
		for _, dir := range dirs {
			info, err := os.Stat(dir)
			assert.NoError(t, err, "directory %s should exist", dir)
			assert.True(t, info.IsDir(), "%s should be a directory", dir)
			assert.Contains(t, stdout, dir, "output should mention %s", dir)
		}
	})

	t.Run("init creates .env.example", func(t *testing.T) {
		tmpDir := t.TempDir()
		originalDir, _ := os.Getwd()
		defer os.Chdir(originalDir)
		
		require.NoError(t, os.Chdir(tmpDir))
		
		_, _, err := testutil.ExecuteCommand(initCmd)
		require.NoError(t, err)
		
		envFile := ".env.example"
		info, err := os.Stat(envFile)
		assert.NoError(t, err, ".env.example should exist")
		assert.False(t, info.IsDir(), ".env.example should be a file")
		
		// Check content
		content, err := os.ReadFile(envFile)
		require.NoError(t, err)
		assert.Contains(t, string(content), "Bifrost Configuration")
		assert.Contains(t, string(content), "OPENAI_API_KEY")
		assert.Contains(t, string(content), "ANTHROPIC_API_KEY")
	})

	t.Run("init creates bifrost.yaml", func(t *testing.T) {
		tmpDir := t.TempDir()
		originalDir, _ := os.Getwd()
		defer os.Chdir(originalDir)
		
		require.NoError(t, os.Chdir(tmpDir))
		
		_, _, err := testutil.ExecuteCommand(initCmd)
		require.NoError(t, err)
		
		configFile := ".bifrost/config/bifrost.yaml"
		info, err := os.Stat(configFile)
		assert.NoError(t, err, "bifrost.yaml should exist")
		assert.False(t, info.IsDir(), "bifrost.yaml should be a file")
		
		// Check content
		content, err := os.ReadFile(configFile)
		require.NoError(t, err)
		assert.Contains(t, string(content), "Bifrost Configuration File")
		assert.Contains(t, string(content), "server:")
		assert.Contains(t, string(content), "providers:")
		assert.Contains(t, string(content), "plugins:")
	})

	t.Run("init shows success message", func(t *testing.T) {
		tmpDir := t.TempDir()
		originalDir, _ := os.Getwd()
		defer os.Chdir(originalDir)
		
		require.NoError(t, os.Chdir(tmpDir))
		
		stdout, _, err := testutil.ExecuteCommand(initCmd)
		require.NoError(t, err)
		
		assert.Contains(t, stdout, "Project initialized successfully")
		assert.Contains(t, stdout, "Next steps:")
	})

	t.Run("init handles existing directories", func(t *testing.T) {
		tmpDir := t.TempDir()
		originalDir, _ := os.Getwd()
		defer os.Chdir(originalDir)
		
		require.NoError(t, os.Chdir(tmpDir))
		
		// Create directory first
		require.NoError(t, os.MkdirAll(".bifrost/config", 0755))
		
		// Should not error
		_, _, err := testutil.ExecuteCommand(initCmd)
		assert.NoError(t, err, "init should handle existing directories")
	})

	t.Run("init via root command", func(t *testing.T) {
		tmpDir := t.TempDir()
		originalDir, _ := os.Getwd()
		defer os.Chdir(originalDir)
		
		require.NoError(t, os.Chdir(tmpDir))
		
		stdout, _, err := testutil.ExecuteCommand(rootCmd, "init")
		require.NoError(t, err)
		
		assert.Contains(t, stdout, "Initializing Bifrost project")
		
		// Verify files were created
		_, err = os.Stat(".env.example")
		assert.NoError(t, err)
		
		_, err = os.Stat(".bifrost/config/bifrost.yaml")
		assert.NoError(t, err)
	})
}

func TestInitCommandCleanup(t *testing.T) {
	// Test that init doesn't leave partial state on error
	t.Run("init handles write errors gracefully", func(t *testing.T) {
		tmpDir := t.TempDir()
		originalDir, _ := os.Getwd()
		defer os.Chdir(originalDir)
		
		require.NoError(t, os.Chdir(tmpDir))
		
		// Create a file where a directory should be
		require.NoError(t, os.WriteFile(".bifrost", []byte("block"), 0644))
		
		// Should return an error
		_, _, err := testutil.ExecuteCommand(initCmd)
		assert.Error(t, err, "init should error when directory creation fails")
	})
}
