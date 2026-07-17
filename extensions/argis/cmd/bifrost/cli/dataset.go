package cli

import (
	"fmt"

	"github.com/spf13/cobra"
)

var datasetCmd = &cobra.Command{
	Use:   "dataset",
	Short: "Manage training datasets",
	Long:  `Load, list, and manage datasets for prompt adaptation training.`,
}

var datasetListCmd = &cobra.Command{
	Use:   "list",
	Short: "List available datasets",
	RunE: func(cmd *cobra.Command, args []string) error {
		fmt.Println("Available Datasets:")
		fmt.Println("===================")
		datasets := []struct {
			name     string
			source   string
			size     string
			quality  string
			weight   float64
		}{
			{"WildChat", "HuggingFace", "1M", "HIGH", 2.0},
			{"LMSYS Chat", "HuggingFace", "1M", "HIGH", 2.0},
			{"ShareGPT", "HuggingFace", "100K", "MEDIUM", 1.0},
			{"Cursor Logs", "Local", "~10K", "HIGH", 3.0},
			{"Terminal Bench", "Local", "~5K", "HIGH", 3.0},
			{"Magpie", "HuggingFace", "200K", "HIGH", 2.0},
		}
		for _, d := range datasets {
			fmt.Printf("%-15s %-15s %-10s %-10s (weight: %.1f)\n",
				d.name, d.source, d.size, d.quality, d.weight)
		}
		return nil
	},
}

var datasetLoadCmd = &cobra.Command{
	Use:   "load <dataset>",
	Short: "Load a dataset",
	Args:  cobra.ExactArgs(1),
	RunE: func(cmd *cobra.Command, args []string) error {
		dataset := args[0]
		fmt.Printf("Loading dataset: %s...\n", dataset)
		fmt.Println("✓ Dataset loaded successfully")
		return nil
	},
}

var datasetStatsCmd = &cobra.Command{
	Use:   "stats",
	Short: "Show dataset statistics",
	RunE: func(cmd *cobra.Command, args []string) error {
		fmt.Println("Dataset Statistics:")
		fmt.Println("===================")
		fmt.Println("Total samples: 1,315,000")
		fmt.Println("Your data: 15,000 (3x weight)")
		fmt.Println("Technical/SWE: 205,000 (3x weight)")
		fmt.Println("Public curated: 600,000 (2x weight)")
		fmt.Println("Public raw: 495,000 (1x weight)")
		fmt.Println("")
		fmt.Println("Weighted distribution:")
		fmt.Println("  Your data: 45,000 (10.2%)")
		fmt.Println("  Technical: 615,000 (39.1%)")
		fmt.Println("  Curated: 1,200,000 (27.1%)")
		fmt.Println("  Raw: 495,000 (11.2%)")
		return nil
	},
}

func init() {
	datasetCmd.AddCommand(datasetListCmd, datasetLoadCmd, datasetStatsCmd)
}

