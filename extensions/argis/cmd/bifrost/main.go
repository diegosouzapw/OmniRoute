// Package main provides the Bifrost CLI entry point
package main

import (
	"fmt"
	"os"

	"github.com/kooshapari/bifrost-extensions/cmd/bifrost/cli"
)

func main() {
	if err := cli.Execute(); err != nil {
		fmt.Fprintf(os.Stderr, "Error: %v\n", err)
		os.Exit(1)
	}
}

