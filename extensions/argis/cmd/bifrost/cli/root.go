package cli

import (
	"github.com/spf13/cobra"
)

var (
	verbose bool
	config  string
)

// rootCmd represents the base command when called without any subcommands
var rootCmd = &cobra.Command{
	Use:   "bifrost",
	Short: "Bifrost - Intelligent LLM Gateway & Routing Engine",
	Long: `Bifrost is a comprehensive LLM gateway with intelligent routing,
prompt adaptation, research intelligence, and advanced deployment options.

Use 'bifrost --help' to see available commands.`,
	Version: "1.0.0",
}

// Execute adds all child commands to the root command and sets flags appropriately
func Execute() error {
	return rootCmd.Execute()
}

func init() {
	rootCmd.PersistentFlags().BoolVarP(&verbose, "verbose", "v", false, "Enable verbose output")
	rootCmd.PersistentFlags().StringVarP(&config, "config", "c", "", "Config file path")

	// Add subcommands
	rootCmd.AddCommand(serverCmd)
	rootCmd.AddCommand(deployCmd)
	rootCmd.AddCommand(configCmd)
	rootCmd.AddCommand(pluginCmd)
	rootCmd.AddCommand(datasetCmd)
	rootCmd.AddCommand(versionCmd)
	rootCmd.AddCommand(initCmd)
	// migrateCmd is added in migrate.go init()
}

