package cli

import (
	"runtime"
	"strings"
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"

	"github.com/kooshapari/bifrost-extensions/cmd/bifrost/cli/testutil"
)

func TestVersionCommand(t *testing.T) {
	t.Run("version command exists", func(t *testing.T) {
		assert.NotNil(t, versionCmd)
		assert.Equal(t, "version", versionCmd.Use)
	})

	t.Run("version command output", func(t *testing.T) {
		stdout, _, err := testutil.ExecuteCommand(versionCmd)
		require.NoError(t, err)
		
		assert.Contains(t, stdout, "Bifrost CLI")
		assert.Contains(t, stdout, "Version:")
		assert.Contains(t, stdout, "1.0.0")
		assert.Contains(t, stdout, "Build Date:")
		assert.Contains(t, stdout, "Go Version:")
		assert.Contains(t, stdout, runtime.Version())
		assert.Contains(t, stdout, "OS:")
		assert.Contains(t, stdout, runtime.GOOS)
		assert.Contains(t, stdout, "Architecture:")
		assert.Contains(t, stdout, runtime.GOARCH)
	})

	t.Run("version shows components", func(t *testing.T) {
		stdout, _, err := testutil.ExecuteCommand(versionCmd)
		require.NoError(t, err)
		
		components := []string{
			"Bifrost Core",
			"Prompt Adapter",
			"Research Intel",
			"Intelligent Router",
			"Learning Engine",
			"Smart Fallback",
		}
		
		for _, component := range components {
			assert.Contains(t, stdout, component, "should show %s component", component)
		}
	})

	t.Run("version command via root", func(t *testing.T) {
		stdout, _, err := testutil.ExecuteCommand(rootCmd, "version")
		require.NoError(t, err)
		
		assert.Contains(t, stdout, "Bifrost CLI")
		assert.Contains(t, stdout, "1.0.0")
	})

	t.Run("version output format", func(t *testing.T) {
		stdout, _, err := testutil.ExecuteCommand(versionCmd)
		require.NoError(t, err)
		
		lines := strings.Split(strings.TrimSpace(stdout), "\n")
		assert.Greater(t, len(lines), 5, "version output should have multiple lines")
		
		// Check for section headers
		assert.True(t, 
			testutil.Contains(stdout, "Version Information") || 
			testutil.Contains(stdout, "Version:"),
			"should have version section",
		)
	})
}
