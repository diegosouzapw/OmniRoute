//go:build linux
// +build linux

package cli

import (
	"os"
	"path/filepath"
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"

	"github.com/kooshapari/bifrost-extensions/cmd/bifrost/cli/testutil"
)

func TestLinuxSpecific(t *testing.T) {
	t.Run("init creates Linux-compatible paths", func(t *testing.T) {
		tmpDir := t.TempDir()
		originalDir, _ := os.Getwd()
		defer os.Chdir(originalDir)
		
		require.NoError(t, os.Chdir(tmpDir))
		
		_, _, err := testutil.ExecuteCommand(rootCmd, "init")
		require.NoError(t, err)
		
		// Linux paths should work
		configPath := filepath.Join(".bifrost", "config", "bifrost.yaml")
		_, err = os.Stat(configPath)
		assert.NoError(t, err, "Linux path should work")
	})

	t.Run("version shows Linux OS", func(t *testing.T) {
		stdout, _, err := testutil.ExecuteCommand(rootCmd, "version")
		require.NoError(t, err)
		
		assert.Contains(t, stdout, "linux")
	})
}
