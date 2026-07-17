package cli

import (
	"fmt"
	"os"
	"os/exec"

	"github.com/spf13/cobra"
)

var (
	platform string
	dryRun   bool
)

var deployCmd = &cobra.Command{
	Use:   "deploy",
	Short: "Deploy Bifrost to various platforms",
	Long:  `Deploy Bifrost to serverless platforms (Fly.io, Vercel, Railway, Render) or self-hosted (Homebox).`,
}

var deployFlyCmd = &cobra.Command{
	Use:   "fly",
	Short: "Deploy to Fly.io",
	RunE:  deployToFly,
}

var deployVercelCmd = &cobra.Command{
	Use:   "vercel",
	Short: "Deploy to Vercel",
	RunE:  deployToVercel,
}

var deployRailwayCmd = &cobra.Command{
	Use:   "railway",
	Short: "Deploy to Railway",
	RunE:  deployToRailway,
}

var deployRenderCmd = &cobra.Command{
	Use:   "render",
	Short: "Deploy to Render",
	RunE:  deployToRender,
}

var deployHomeboxCmd = &cobra.Command{
	Use:   "homebox",
	Short: "Deploy to Homebox (self-hosted)",
	RunE:  deployToHomebox,
}

func init() {
	deployCmd.AddCommand(deployFlyCmd, deployVercelCmd, deployRailwayCmd, deployRenderCmd, deployHomeboxCmd)
	deployCmd.PersistentFlags().BoolVarP(&dryRun, "dry-run", "d", false, "Show what would be deployed without deploying")
}

func deployToFly(cmd *cobra.Command, args []string) error {
	fmt.Println("🚀 Deploying to Fly.io...")
	if dryRun {
		fmt.Println("[DRY RUN] Would execute: flyctl deploy --config fly.toml")
		return nil
	}
	return runCommand("flyctl", "deploy", "--config", "fly.toml")
}

func deployToVercel(cmd *cobra.Command, args []string) error {
	fmt.Println("🚀 Deploying to Vercel...")
	if dryRun {
		fmt.Println("[DRY RUN] Would execute: vercel deploy")
		return nil
	}
	return runCommand("vercel", "deploy")
}

func deployToRailway(cmd *cobra.Command, args []string) error {
	fmt.Println("🚀 Deploying to Railway...")
	if dryRun {
		fmt.Println("[DRY RUN] Would execute: railway up")
		return nil
	}
	return runCommand("railway", "up")
}

func deployToRender(cmd *cobra.Command, args []string) error {
	fmt.Println("🚀 Deploying to Render...")
	fmt.Println("Push to GitHub and connect to Render dashboard")
	fmt.Println("Render will auto-deploy from render.yaml")
	return nil
}

func deployToHomebox(cmd *cobra.Command, args []string) error {
	fmt.Println("🚀 Deploying to Homebox...")
	if dryRun {
		fmt.Println("[DRY RUN] Would execute: ./homebox-daemon.sh")
		return nil
	}
	return runCommand("bash", "homebox-daemon.sh")
}

func runCommand(name string, args ...string) error {
	cmd := exec.Command(name, args...)
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr
	return cmd.Run()
}

