package cli

import (
	"os"
	"testing"

	"github.com/spf13/cobra"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"

	"github.com/kooshapari/bifrost-extensions/cmd/bifrost/cli/testutil"
)

func TestConfigCommand(t *testing.T) {
	t.Run("config command exists", func(t *testing.T) {
		assert.NotNil(t, configCmd)
		assert.Equal(t, "config", configCmd.Use)
	})

	t.Run("config has subcommands", func(t *testing.T) {
		// Commands are registered in init(), which runs automatically
		// Check via root command to ensure tree is built
		rootSubcommands := rootCmd.Commands()
		var configSubcommands []*cobra.Command
		for _, cmd := range rootSubcommands {
			if cmd.Use == "config" {
				configSubcommands = cmd.Commands()
				break
			}
		}
		
		assert.Greater(t, len(configSubcommands), 0, "config should have subcommands")
		
		subcommandNames := make(map[string]bool)
		for _, cmd := range configSubcommands {
			subcommandNames[cmd.Use] = true
		}
		
		assert.True(t, subcommandNames["show"], "should have show subcommand")
		assert.True(t, subcommandNames["set"], "should have set subcommand")
		assert.True(t, subcommandNames["validate"], "should have validate subcommand")
	})
}

func TestConfigShowCommand(t *testing.T) {
	t.Run("config show displays configuration", func(t *testing.T) {
		// Use rootCmd with subcommand path
		stdout, _, err := testutil.ExecuteCommand(rootCmd, "config", "show")
		require.NoError(t, err)
		
		assert.Contains(t, stdout, "Current Bifrost Configuration")
		assert.Contains(t, stdout, "OPENAI_API_KEY")
		assert.Contains(t, stdout, "ANTHROPIC_API_KEY")
		assert.Contains(t, stdout, "GOOGLE_API_KEY")
		assert.Contains(t, stdout, "REDIS_URL")
		assert.Contains(t, stdout, "LOG_LEVEL")
	})

	t.Run("config show masks secrets", func(t *testing.T) {
		cleanup := testutil.SetEnv("OPENAI_API_KEY", "sk-test1234567890")
		defer cleanup()
		
		stdout, _, err := testutil.ExecuteCommand(rootCmd, "config", "show")
		require.NoError(t, err)
		
		// Should not show full key
		assert.NotContains(t, stdout, "sk-test1234567890")
		// Should show masked version
		assert.Contains(t, stdout, "sk-t...")
	})

	t.Run("config show shows not set for missing keys", func(t *testing.T) {
		cleanup := testutil.UnsetEnv("OPENAI_API_KEY")
		defer cleanup()
		
		stdout, _, err := testutil.ExecuteCommand(rootCmd, "config", "show")
		require.NoError(t, err)
		
		assert.Contains(t, stdout, "(not set)")
	})

	t.Run("config show via root", func(t *testing.T) {
		stdout, _, err := testutil.ExecuteCommand(rootCmd, "config", "show")
		require.NoError(t, err)
		
		assert.Contains(t, stdout, "Current Bifrost Configuration")
	})
}

func TestConfigSetCommand(t *testing.T) {
	t.Run("config set requires two arguments", func(t *testing.T) {
		_, _, err := testutil.ExecuteCommand(rootCmd, "config", "set")
		assert.Error(t, err, "set should require arguments")
	})

	t.Run("config set with valid arguments", func(t *testing.T) {
		testKey := "TEST_CONFIG_KEY"
		testValue := "test-value-123"
		
		// Clean up after test
		defer os.Unsetenv(testKey)
		
		stdout, _, err := testutil.ExecuteCommand(rootCmd, "config", "set", testKey, testValue)
		require.NoError(t, err)
		
		assert.Contains(t, stdout, "Set")
		assert.Contains(t, stdout, testKey)
		
		// Verify environment variable was set
		value := os.Getenv(testKey)
		assert.Equal(t, testValue, value)
	})

	t.Run("config set via root", func(t *testing.T) {
		testKey := "TEST_CONFIG_KEY_2"
		testValue := "test-value-456"
		
		defer os.Unsetenv(testKey)
		
		stdout, _, err := testutil.ExecuteCommand(rootCmd, "config", "set", testKey, testValue)
		require.NoError(t, err)
		
		assert.Contains(t, stdout, "Set")
		value := os.Getenv(testKey)
		assert.Equal(t, testValue, value)
	})
}

func TestConfigValidateCommand(t *testing.T) {
	t.Run("config validate with missing keys", func(t *testing.T) {
		// Unset required keys
		cleanup1 := testutil.UnsetEnv("OPENAI_API_KEY")
		cleanup2 := testutil.UnsetEnv("ANTHROPIC_API_KEY")
		defer cleanup1()
		defer cleanup2()
		
		stdout, _, err := testutil.ExecuteCommand(rootCmd, "config", "validate")
		require.NoError(t, err)
		
		assert.Contains(t, stdout, "Validating configuration")
		assert.Contains(t, stdout, "Missing required keys")
		assert.Contains(t, stdout, "OPENAI_API_KEY")
		assert.Contains(t, stdout, "ANTHROPIC_API_KEY")
	})

	t.Run("config validate with all keys present", func(t *testing.T) {
		cleanup1 := testutil.SetEnv("OPENAI_API_KEY", "sk-test")
		cleanup2 := testutil.SetEnv("ANTHROPIC_API_KEY", "sk-ant-test")
		defer cleanup1()
		defer cleanup2()
		
		stdout, _, err := testutil.ExecuteCommand(rootCmd, "config", "validate")
		require.NoError(t, err)
		
		assert.Contains(t, stdout, "Validating configuration")
		assert.Contains(t, stdout, "Configuration is valid")
		assert.NotContains(t, stdout, "Missing required keys")
	})

	t.Run("config validate via root", func(t *testing.T) {
		stdout, _, _ := testutil.ExecuteCommand(rootCmd, "config", "validate")
		// May pass or fail depending on environment
		assert.Contains(t, stdout, "Validating configuration")
	})
}

func TestMaskSecret(t *testing.T) {
	t.Run("mask secret with long string", func(t *testing.T) {
		secret := "sk-test1234567890abcdef"
		masked := maskSecret(secret)
		
		assert.Equal(t, "sk-t...cdef", masked)
		assert.NotEqual(t, secret, masked)
	})

	t.Run("mask secret with short string", func(t *testing.T) {
		secret := "sk"
		masked := maskSecret(secret)
		
		assert.Equal(t, "****", masked)
	})

	t.Run("mask secret with empty string", func(t *testing.T) {
		masked := maskSecret("")
		
		assert.Equal(t, "(not set)", masked)
	})

	t.Run("mask secret with exactly 4 chars", func(t *testing.T) {
		secret := "sk12"
		masked := maskSecret(secret)
		
		assert.Equal(t, "****", masked)
	})
}
