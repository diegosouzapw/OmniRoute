package cli

import (
	"fmt"
	"os"

	"github.com/spf13/cobra"
)

var configCmd = &cobra.Command{
	Use:   "config",
	Short: "Manage Bifrost configuration",
	Long:  `View, set, and manage Bifrost configuration options.`,
}

var configShowCmd = &cobra.Command{
	Use:   "show",
	Short: "Show current configuration",
	RunE: func(cmd *cobra.Command, args []string) error {
		fmt.Println("Current Bifrost Configuration:")
		fmt.Println("==============================")
		fmt.Printf("OPENAI_API_KEY: %s\n", maskSecret(os.Getenv("OPENAI_API_KEY")))
		fmt.Printf("ANTHROPIC_API_KEY: %s\n", maskSecret(os.Getenv("ANTHROPIC_API_KEY")))
		fmt.Printf("GOOGLE_API_KEY: %s\n", maskSecret(os.Getenv("GOOGLE_API_KEY")))
		fmt.Printf("REDIS_URL: %s\n", os.Getenv("REDIS_URL"))
		fmt.Printf("LOG_LEVEL: %s\n", os.Getenv("LOG_LEVEL"))
		return nil
	},
}

var configSetCmd = &cobra.Command{
	Use:   "set <key> <value>",
	Short: "Set a configuration value",
	Args:  cobra.ExactArgs(2),
	RunE: func(cmd *cobra.Command, args []string) error {
		key, value := args[0], args[1]
		if err := os.Setenv(key, value); err != nil {
			return fmt.Errorf("failed to set %s: %w", key, err)
		}
		fmt.Printf("✓ Set %s\n", key)
		return nil
	},
}

var configValidateCmd = &cobra.Command{
	Use:   "validate",
	Short: "Validate configuration",
	RunE: func(cmd *cobra.Command, args []string) error {
		fmt.Println("Validating configuration...")
		required := []string{"OPENAI_API_KEY", "ANTHROPIC_API_KEY"}
		missing := []string{}
		for _, key := range required {
			if os.Getenv(key) == "" {
				missing = append(missing, key)
			}
		}
		if len(missing) > 0 {
			fmt.Printf("⚠ Missing required keys: %v\n", missing)
			return nil
		}
		fmt.Println("✓ Configuration is valid")
		return nil
	},
}

func init() {
	configCmd.AddCommand(configShowCmd, configSetCmd, configValidateCmd)
}

func maskSecret(s string) string {
	if s == "" {
		return "(not set)"
	}
	if len(s) <= 4 {
		return "****"
	}
	return s[:4] + "..." + s[len(s)-4:]
}

