package cli

import (
	"fmt"
	"os"

	"github.com/spf13/cobra"
)

var initCmd = &cobra.Command{
	Use:   "init",
	Short: "Initialize Bifrost project",
	Long:  `Initialize a new Bifrost project with configuration templates and examples.`,
	RunE:  runInit,
}

func runInit(cmd *cobra.Command, args []string) error {
	fmt.Println("🚀 Initializing Bifrost project...")

	// Create directories
	dirs := []string{
		".bifrost",
		".bifrost/config",
		".bifrost/plugins",
		".bifrost/data",
	}
	for _, dir := range dirs {
		if err := os.MkdirAll(dir, 0755); err != nil {
			return fmt.Errorf("failed to create directory %s: %w", dir, err)
		}
		fmt.Printf("✓ Created directory: %s\n", dir)
	}

	// Create .env.example
	envExample := `# Bifrost Configuration

# API Keys
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
GOOGLE_API_KEY=...

# Server Configuration
BIFROST_HOST=0.0.0.0
BIFROST_PORT=8080
LOG_LEVEL=info

# Redis Configuration
REDIS_URL=redis://localhost:6379

# Database Configuration
DATABASE_URL=postgresql://user:password@localhost/bifrost

# Plugins
ENABLE_ROUTER=true
ENABLE_LEARNING=true
ENABLE_FALLBACK=true
ENABLE_PROMPTADAPTER=true
`
	if err := os.WriteFile(".env.example", []byte(envExample), 0644); err != nil {
		return fmt.Errorf("failed to create .env.example: %w", err)
	}
	fmt.Println("✓ Created .env.example")

	// Create bifrost.yaml
	configExample := `# Bifrost Configuration File

server:
  host: 0.0.0.0
  port: 8080
  log_level: info

providers:
  openai:
    enabled: true
    timeout: 60s
    retries: 3
  anthropic:
    enabled: true
    timeout: 60s
    retries: 3
  gemini:
    enabled: true
    timeout: 60s
    retries: 3

plugins:
  router:
    enabled: true
  learning:
    enabled: true
  fallback:
    enabled: true
  promptadapter:
    enabled: true

database:
  type: postgresql
  url: ${DATABASE_URL}

redis:
  url: ${REDIS_URL}
`
	if err := os.WriteFile(".bifrost/config/bifrost.yaml", []byte(configExample), 0644); err != nil {
		return fmt.Errorf("failed to create bifrost.yaml: %w", err)
	}
	fmt.Println("✓ Created .bifrost/config/bifrost.yaml")

	fmt.Println("")
	fmt.Println("✨ Project initialized successfully!")
	fmt.Println("")
	fmt.Println("Next steps:")
	fmt.Println("  1. Copy .env.example to .env and fill in your API keys")
	fmt.Println("  2. Review .bifrost/config/bifrost.yaml")
	fmt.Println("  3. Run 'bifrost server' to start the server")
	fmt.Println("  4. Run 'bifrost deploy fly' to deploy to Fly.io")

	return nil
}

