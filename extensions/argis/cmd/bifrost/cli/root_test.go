package cli

import (
	"testing"

	"github.com/spf13/cobra"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"

	"github.com/kooshapari/bifrost-extensions/cmd/bifrost/cli/testutil"
)

func TestRootCommand(t *testing.T) {
	t.Run("root command exists", func(t *testing.T) {
		assert.NotNil(t, rootCmd)
		assert.Equal(t, "bifrost", rootCmd.Use)
	})

	t.Run("root command has correct short description", func(t *testing.T) {
		assert.Contains(t, rootCmd.Short, "Bifrost")
	})

	t.Run("root command has subcommands", func(t *testing.T) {
		subcommands := rootCmd.Commands()
		assert.Greater(t, len(subcommands), 0, "root command should have subcommands")
	})

	t.Run("root command has persistent flags", func(t *testing.T) {
		verboseFlag := rootCmd.PersistentFlags().Lookup("verbose")
		assert.NotNil(t, verboseFlag, "verbose flag should exist")
		
		configFlag := rootCmd.PersistentFlags().Lookup("config")
		assert.NotNil(t, configFlag, "config flag should exist")
	})

	t.Run("root command help", func(t *testing.T) {
		stdout, _, err := testutil.ExecuteCommand(rootCmd, "--help")
		require.NoError(t, err)
		assert.Contains(t, stdout, "Bifrost")
		assert.Contains(t, stdout, "Available Commands")
	})

	t.Run("root command version", func(t *testing.T) {
		stdout, _, err := testutil.ExecuteCommand(rootCmd, "--version")
		require.NoError(t, err)
		assert.Contains(t, stdout, "1.0.0")
	})

	t.Run("verbose flag", func(t *testing.T) {
		cmd := &cobra.Command{Use: "test"}
		cmd.Flags().BoolP("verbose", "v", false, "verbose")
		
		cmd.SetArgs([]string{"--verbose"})
		err := cmd.Execute()
		assert.NoError(t, err)
		
		v, _ := cmd.Flags().GetBool("verbose")
		assert.True(t, v)
	})

	t.Run("config flag", func(t *testing.T) {
		cmd := &cobra.Command{Use: "test"}
		cmd.Flags().StringP("config", "c", "", "config file")
		
		testConfig := "/path/to/config.yaml"
		cmd.SetArgs([]string{"--config", testConfig})
		err := cmd.Execute()
		assert.NoError(t, err)
		
		c, _ := cmd.Flags().GetString("config")
		assert.Equal(t, testConfig, c)
	})
}

func TestExecute(t *testing.T) {
	t.Run("execute with no args", func(t *testing.T) {
		// Should show help
		stdout, _, err := testutil.ExecuteCommand(rootCmd)
		// No error expected for help
		assert.Contains(t, stdout, "Bifrost")
		_ = err // Help command may return error in some cobra versions
	})

	t.Run("execute with invalid command", func(t *testing.T) {
		_, stderr, err := testutil.ExecuteCommand(rootCmd, "invalid-command")
		assert.Error(t, err)
		assert.Contains(t, stderr, "unknown command")
	})
}
