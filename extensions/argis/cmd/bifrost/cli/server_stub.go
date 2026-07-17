package cli

import "github.com/spf13/cobra"

// serverCmd stub keeps root wiring when server.go is excluded from smoke builds.
var serverCmd = &cobra.Command{
	Use:   "server",
	Short: "Start the Bifrost server (stub — see server.go)",
}
