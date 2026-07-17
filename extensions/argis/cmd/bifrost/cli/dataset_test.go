package cli

import (
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"

	"github.com/kooshapari/bifrost-extensions/cmd/bifrost/cli/testutil"
)

func TestDatasetCommand(t *testing.T) {
	t.Run("dataset command exists", func(t *testing.T) {
		assert.NotNil(t, datasetCmd)
		assert.Equal(t, "dataset", datasetCmd.Use)
	})

	t.Run("dataset has subcommands", func(t *testing.T) {
		// Commands are registered in init(), which runs automatically
		// But we need to ensure the command tree is built
		subcommands := datasetCmd.Commands()
		
		// Check that we have subcommands (init() should have run)
		if len(subcommands) == 0 {
			// If no subcommands, the init() hasn't run yet - this is a test setup issue
			// Verify via root command instead
			rootSubcommands := rootCmd.Commands()
			datasetFound := false
			for _, cmd := range rootSubcommands {
				if cmd.Use == "dataset" {
					datasetFound = true
					subcommands = cmd.Commands()
					break
				}
			}
			assert.True(t, datasetFound, "dataset command should be registered with root")
		}
		
		assert.Greater(t, len(subcommands), 0, "dataset should have subcommands")
		
		subcommandNames := make(map[string]bool)
		for _, cmd := range subcommands {
			subcommandNames[cmd.Use] = true
		}
		
		assert.True(t, subcommandNames["list"], "should have list subcommand")
		assert.True(t, subcommandNames["load"], "should have load subcommand")
		assert.True(t, subcommandNames["stats"], "should have stats subcommand")
	})
}

func TestDatasetListCommand(t *testing.T) {
	t.Run("dataset list shows available datasets", func(t *testing.T) {
		stdout, _, err := testutil.ExecuteCommand(datasetListCmd)
		require.NoError(t, err)
		
		assert.Contains(t, stdout, "Available Datasets")
		
		// Check for expected datasets
		datasets := []string{
			"WildChat",
			"LMSYS Chat",
			"ShareGPT",
			"Cursor Logs",
			"Terminal Bench",
			"Magpie",
		}
		
		for _, dataset := range datasets {
			assert.Contains(t, stdout, dataset, "should list %s dataset", dataset)
		}
	})

	t.Run("dataset list shows dataset metadata", func(t *testing.T) {
		stdout, _, err := testutil.ExecuteCommand(datasetListCmd)
		require.NoError(t, err)
		
		// Should show source, size, quality, weight
		assert.Contains(t, stdout, "HuggingFace")
		assert.Contains(t, stdout, "Local")
		assert.Contains(t, stdout, "HIGH")
		assert.Contains(t, stdout, "MEDIUM")
		assert.Contains(t, stdout, "weight:")
	})

	t.Run("dataset list via root", func(t *testing.T) {
		stdout, _, err := testutil.ExecuteCommand(rootCmd, "dataset", "list")
		require.NoError(t, err)
		
		assert.Contains(t, stdout, "Available Datasets")
	})
}

func TestDatasetLoadCommand(t *testing.T) {
	t.Run("dataset load requires argument", func(t *testing.T) {
		_, _, err := testutil.ExecuteCommand(datasetLoadCmd)
		assert.Error(t, err, "load should require dataset name")
	})

	t.Run("dataset load with valid dataset", func(t *testing.T) {
		stdout, _, err := testutil.ExecuteCommand(datasetLoadCmd, "WildChat")
		require.NoError(t, err)
		
		assert.Contains(t, stdout, "Loading dataset")
		assert.Contains(t, stdout, "WildChat")
		assert.Contains(t, stdout, "loaded successfully")
	})

	t.Run("dataset load via root", func(t *testing.T) {
		stdout, _, err := testutil.ExecuteCommand(rootCmd, "dataset", "load", "Cursor Logs")
		require.NoError(t, err)
		
		assert.Contains(t, stdout, "Loading dataset")
		assert.Contains(t, stdout, "Cursor Logs")
	})
}

func TestDatasetStatsCommand(t *testing.T) {
	t.Run("dataset stats shows statistics", func(t *testing.T) {
		stdout, _, err := testutil.ExecuteCommand(datasetStatsCmd)
		require.NoError(t, err)
		
		assert.Contains(t, stdout, "Dataset Statistics")
		
		// Check for expected stats
		assert.Contains(t, stdout, "Total samples")
		assert.Contains(t, stdout, "Your data")
		assert.Contains(t, stdout, "Technical/SWE")
		assert.Contains(t, stdout, "Public curated")
		assert.Contains(t, stdout, "Public raw")
	})

	t.Run("dataset stats shows weighted distribution", func(t *testing.T) {
		stdout, _, err := testutil.ExecuteCommand(datasetStatsCmd)
		require.NoError(t, err)
		
		assert.Contains(t, stdout, "Weighted distribution")
		assert.Contains(t, stdout, "%")
	})

	t.Run("dataset stats via root", func(t *testing.T) {
		stdout, _, err := testutil.ExecuteCommand(rootCmd, "dataset", "stats")
		require.NoError(t, err)
		
		assert.Contains(t, stdout, "Dataset Statistics")
	})
}
