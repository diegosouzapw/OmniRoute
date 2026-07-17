package cli

import (
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"

	"github.com/kooshapari/bifrost-extensions/cmd/bifrost/cli/testutil"
)

func TestDeployCommand(t *testing.T) {
	t.Run("deploy command exists", func(t *testing.T) {
		assert.NotNil(t, deployCmd)
		assert.Equal(t, "deploy", deployCmd.Use)
	})

	t.Run("deploy has subcommands", func(t *testing.T) {
		subcommands := deployCmd.Commands()
		assert.Greater(t, len(subcommands), 0, "deploy should have subcommands")
		
		subcommandNames := make(map[string]bool)
		for _, cmd := range subcommands {
			subcommandNames[cmd.Use] = true
		}
		
		assert.True(t, subcommandNames["fly"], "should have fly subcommand")
		assert.True(t, subcommandNames["vercel"], "should have vercel subcommand")
		assert.True(t, subcommandNames["railway"], "should have railway subcommand")
		assert.True(t, subcommandNames["render"], "should have render subcommand")
		assert.True(t, subcommandNames["homebox"], "should have homebox subcommand")
	})

	t.Run("deploy has dry-run flag", func(t *testing.T) {
		flag := deployCmd.PersistentFlags().Lookup("dry-run")
		assert.NotNil(t, flag, "deploy should have dry-run flag")
	})
}

func TestDeployFlyCommand(t *testing.T) {
	t.Run("deploy fly shows deployment message", func(t *testing.T) {
		stdout, _, _ := testutil.ExecuteCommand(deployFlyCmd)
		// May error if flyctl is not installed, but should show message
		assert.Contains(t, stdout, "Deploying to Fly.io")
	})

	t.Run("deploy fly with dry-run", func(t *testing.T) {
		stdout, _, err := testutil.ExecuteCommand(deployFlyCmd, "--dry-run")
		require.NoError(t, err)
		
		assert.Contains(t, stdout, "DRY RUN")
		assert.Contains(t, stdout, "flyctl deploy")
	})

	t.Run("deploy fly via root", func(t *testing.T) {
		stdout, _, err := testutil.ExecuteCommand(rootCmd, "deploy", "fly", "--dry-run")
		require.NoError(t, err)
		
		assert.Contains(t, stdout, "Deploying to Fly.io")
		assert.Contains(t, stdout, "DRY RUN")
	})
}

func TestDeployVercelCommand(t *testing.T) {
	t.Run("deploy vercel shows deployment message", func(t *testing.T) {
		stdout, _, _ := testutil.ExecuteCommand(deployVercelCmd)
		// May error if vercel CLI is not installed
		assert.Contains(t, stdout, "Deploying to Vercel")
	})

	t.Run("deploy vercel with dry-run", func(t *testing.T) {
		stdout, _, err := testutil.ExecuteCommand(deployVercelCmd, "--dry-run")
		require.NoError(t, err)
		
		assert.Contains(t, stdout, "DRY RUN")
		assert.Contains(t, stdout, "vercel deploy")
	})

	t.Run("deploy vercel via root", func(t *testing.T) {
		stdout, _, err := testutil.ExecuteCommand(rootCmd, "deploy", "vercel", "--dry-run")
		require.NoError(t, err)
		
		assert.Contains(t, stdout, "Deploying to Vercel")
	})
}

func TestDeployRailwayCommand(t *testing.T) {
	t.Run("deploy railway shows deployment message", func(t *testing.T) {
		stdout, _, _ := testutil.ExecuteCommand(deployRailwayCmd)
		// May error if railway CLI is not installed
		assert.Contains(t, stdout, "Deploying to Railway")
	})

	t.Run("deploy railway with dry-run", func(t *testing.T) {
		stdout, _, err := testutil.ExecuteCommand(deployRailwayCmd, "--dry-run")
		require.NoError(t, err)
		
		assert.Contains(t, stdout, "DRY RUN")
		assert.Contains(t, stdout, "railway up")
	})

	t.Run("deploy railway via root", func(t *testing.T) {
		stdout, _, err := testutil.ExecuteCommand(rootCmd, "deploy", "railway", "--dry-run")
		require.NoError(t, err)
		
		assert.Contains(t, stdout, "Deploying to Railway")
	})
}

func TestDeployRenderCommand(t *testing.T) {
	t.Run("deploy render shows instructions", func(t *testing.T) {
		stdout, _, err := testutil.ExecuteCommand(deployRenderCmd)
		require.NoError(t, err)
		
		assert.Contains(t, stdout, "Deploying to Render")
		assert.Contains(t, stdout, "GitHub")
		assert.Contains(t, stdout, "render.yaml")
	})

	t.Run("deploy render via root", func(t *testing.T) {
		stdout, _, err := testutil.ExecuteCommand(rootCmd, "deploy", "render")
		require.NoError(t, err)
		
		assert.Contains(t, stdout, "Deploying to Render")
	})
}

func TestDeployHomeboxCommand(t *testing.T) {
	t.Run("deploy homebox shows deployment message", func(t *testing.T) {
		stdout, _, _ := testutil.ExecuteCommand(deployHomeboxCmd)
		// May error if script doesn't exist
		assert.Contains(t, stdout, "Deploying to Homebox")
	})

	t.Run("deploy homebox with dry-run", func(t *testing.T) {
		stdout, _, err := testutil.ExecuteCommand(deployHomeboxCmd, "--dry-run")
		require.NoError(t, err)
		
		assert.Contains(t, stdout, "DRY RUN")
		assert.Contains(t, stdout, "homebox-daemon.sh")
	})

	t.Run("deploy homebox via root", func(t *testing.T) {
		stdout, _, err := testutil.ExecuteCommand(rootCmd, "deploy", "homebox", "--dry-run")
		require.NoError(t, err)
		
		assert.Contains(t, stdout, "Deploying to Homebox")
	})
}
