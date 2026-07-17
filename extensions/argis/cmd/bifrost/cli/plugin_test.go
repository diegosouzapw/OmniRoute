package cli

import (
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"

	"github.com/kooshapari/bifrost-extensions/cmd/bifrost/cli/testutil"
)

func TestPluginCommand(t *testing.T) {
	t.Run("plugin command exists", func(t *testing.T) {
		assert.NotNil(t, pluginCmd)
		assert.Equal(t, "plugin", pluginCmd.Use)
	})

	t.Run("plugin has subcommands", func(t *testing.T) {
		subcommands := pluginCmd.Commands()
		assert.Greater(t, len(subcommands), 0, "plugin should have subcommands")
		
		subcommandNames := make(map[string]bool)
		for _, cmd := range subcommands {
			subcommandNames[cmd.Use] = true
		}
		
		assert.True(t, subcommandNames["list"], "should have list subcommand")
		assert.True(t, subcommandNames["enable"], "should have enable subcommand")
		assert.True(t, subcommandNames["disable"], "should have disable subcommand")
		assert.True(t, subcommandNames["config"], "should have config subcommand")
	})
}

func TestPluginListCommand(t *testing.T) {
	t.Run("plugin list shows available plugins", func(t *testing.T) {
		stdout, _, err := testutil.ExecuteCommand(pluginListCmd)
		require.NoError(t, err)
		
		assert.Contains(t, stdout, "Available Bifrost Plugins")
		
		// Check for expected plugins
		plugins := []string{
			"router",
			"learning",
			"fallback",
			"promptadapter",
			"embeddings",
			"contextfolding",
			"contentsafety",
			"toolrouter",
		}
		
		for _, plugin := range plugins {
			assert.Contains(t, stdout, plugin, "should list %s plugin", plugin)
		}
	})

	t.Run("plugin list shows enabled status", func(t *testing.T) {
		stdout, _, err := testutil.ExecuteCommand(pluginListCmd)
		require.NoError(t, err)
		
		// Should show status indicators
		assert.Contains(t, stdout, "✓") // Enabled plugins
		assert.Contains(t, stdout, "○") // Disabled plugins
	})

	t.Run("plugin list via root", func(t *testing.T) {
		stdout, _, err := testutil.ExecuteCommand(rootCmd, "plugin", "list")
		require.NoError(t, err)
		
		assert.Contains(t, stdout, "Available Bifrost Plugins")
	})
}

func TestPluginEnableCommand(t *testing.T) {
	t.Run("plugin enable requires argument", func(t *testing.T) {
		_, _, err := testutil.ExecuteCommand(pluginEnableCmd)
		assert.Error(t, err, "enable should require plugin name")
	})

	t.Run("plugin enable with valid plugin", func(t *testing.T) {
		stdout, _, err := testutil.ExecuteCommand(pluginEnableCmd, "router")
		require.NoError(t, err)
		
		assert.Contains(t, stdout, "Enabled plugin")
		assert.Contains(t, stdout, "router")
	})

	t.Run("plugin enable via root", func(t *testing.T) {
		stdout, _, err := testutil.ExecuteCommand(rootCmd, "plugin", "enable", "learning")
		require.NoError(t, err)
		
		assert.Contains(t, stdout, "Enabled plugin")
		assert.Contains(t, stdout, "learning")
	})
}

func TestPluginDisableCommand(t *testing.T) {
	t.Run("plugin disable requires argument", func(t *testing.T) {
		_, _, err := testutil.ExecuteCommand(pluginDisableCmd)
		assert.Error(t, err, "disable should require plugin name")
	})

	t.Run("plugin disable with valid plugin", func(t *testing.T) {
		stdout, _, err := testutil.ExecuteCommand(pluginDisableCmd, "embeddings")
		require.NoError(t, err)
		
		assert.Contains(t, stdout, "Disabled plugin")
		assert.Contains(t, stdout, "embeddings")
	})

	t.Run("plugin disable via root", func(t *testing.T) {
		stdout, _, err := testutil.ExecuteCommand(rootCmd, "plugin", "disable", "contentsafety")
		require.NoError(t, err)
		
		assert.Contains(t, stdout, "Disabled plugin")
		assert.Contains(t, stdout, "contentsafety")
	})
}

func TestPluginConfigCommand(t *testing.T) {
	t.Run("plugin config requires argument", func(t *testing.T) {
		_, _, err := testutil.ExecuteCommand(pluginConfigCmd)
		assert.Error(t, err, "config should require plugin name")
	})

	t.Run("plugin config with valid plugin", func(t *testing.T) {
		stdout, _, err := testutil.ExecuteCommand(pluginConfigCmd, "router")
		require.NoError(t, err)
		
		assert.Contains(t, stdout, "Configuration for plugin")
		assert.Contains(t, stdout, "router")
	})

	t.Run("plugin config via root", func(t *testing.T) {
		stdout, _, err := testutil.ExecuteCommand(rootCmd, "plugin", "config", "learning")
		require.NoError(t, err)
		
		assert.Contains(t, stdout, "Configuration for plugin")
		assert.Contains(t, stdout, "learning")
	})
}
