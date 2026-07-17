package cli

import (
	"fmt"
	"runtime"

	"github.com/spf13/cobra"
)

var versionCmd = &cobra.Command{
	Use:   "version",
	Short: "Show version information",
	RunE: func(cmd *cobra.Command, args []string) error {
		fmt.Println("Bifrost CLI - Version Information")
		fmt.Println("==================================")
		fmt.Printf("Version:      1.0.0\n")
		fmt.Printf("Build Date:   2025-11-30\n")
		fmt.Printf("Go Version:   %s\n", runtime.Version())
		fmt.Printf("OS:           %s\n", runtime.GOOS)
		fmt.Printf("Architecture: %s\n", runtime.GOARCH)
		fmt.Println("")
		fmt.Println("Components:")
		fmt.Println("  - Bifrost Core: 1.2.30")
		fmt.Println("  - Prompt Adapter: 1.0.0")
		fmt.Println("  - Research Intel: 1.0.0")
		fmt.Println("  - Intelligent Router: 1.0.0")
		fmt.Println("  - Learning Engine: 1.0.0")
		fmt.Println("  - Smart Fallback: 1.0.0")
		return nil
	},
}

