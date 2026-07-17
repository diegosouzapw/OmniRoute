//go:build !windows && !darwin && !linux
// +build !windows,!darwin,!linux

package cli

import (
	"testing"
)

// This file ensures tests compile on all platforms
// Platform-specific tests should be in separate files with build tags

func TestPlatformAgnostic(t *testing.T) {
	t.Run("basic command structure works", func(t *testing.T) {
		// This test should work on any platform
		assert.NotNil(t, rootCmd)
		assert.NotNil(t, versionCmd)
	})
}
