# Bifrost CLI Architecture

## Overview

The Bifrost CLI is a comprehensive command-line interface built with Cobra, providing both infrastructure-as-code (IaC) management and user-facing operations.

## Architecture

```
bifrost/
├── cmd/bifrost/
│   ├── main.go              # Entry point
│   └── cli/
│       ├── root.go          # Root command & initialization
│       ├── server.go        # Server management
│       ├── deploy.go        # Deployment orchestration
│       ├── config.go        # Configuration management
│       ├── plugin.go        # Plugin management
│       ├── dataset.go       # Dataset management
│       ├── version.go       # Version information
│       └── init.go          # Project initialization
```

## Command Hierarchy

```
bifrost
├── server              # Start Bifrost server
│   ├── --port
│   ├── --host
│   ├── --plugins
│   └── --log-level
├── deploy              # Deploy to platforms
│   ├── fly             # Fly.io deployment
│   ├── vercel          # Vercel deployment
│   ├── railway         # Railway deployment
│   ├── render          # Render deployment
│   └── homebox         # Self-hosted deployment
├── config             # Configuration management
│   ├── show           # Show current config
│   ├── set            # Set config value
│   └── validate       # Validate config
├── plugin             # Plugin management
│   ├── list           # List plugins
│   ├── enable         # Enable plugin
│   ├── disable        # Disable plugin
│   └── config         # Plugin config
├── dataset            # Dataset management
│   ├── list           # List datasets
│   ├── load           # Load dataset
│   └── stats          # Dataset stats
├── init               # Initialize project
├── version            # Show version
└── help               # Show help
```

## Key Features

### 1. Infrastructure as Code (IaC)
- Deployment orchestration for 5 platforms
- Configuration management
- Environment variable handling
- Dry-run capabilities

### 2. User-Facing Operations
- Server management
- Plugin configuration
- Dataset loading
- Status monitoring

### 3. Project Management
- Project initialization
- Configuration templates
- Environment setup

## Implementation Details

### Root Command (root.go)
- Initializes Cobra command structure
- Defines global flags (verbose, config)
- Registers all subcommands

### Server Command (server.go)
- Starts Bifrost server
- Configures providers (OpenAI, Anthropic, Gemini)
- Loads plugins dynamically
- Handles graceful shutdown

### Deploy Command (deploy.go)
- Orchestrates deployments to 5 platforms
- Supports dry-run mode
- Validates platform tools
- Provides deployment feedback

### Config Command (config.go)
- Shows current configuration
- Sets environment variables
- Validates required keys
- Masks sensitive values

### Plugin Command (plugin.go)
- Lists available plugins
- Enables/disables plugins
- Shows plugin configuration
- Manages plugin lifecycle

### Dataset Command (dataset.go)
- Lists available datasets
- Loads datasets for training
- Shows dataset statistics
- Manages data weighting

### Init Command (init.go)
- Creates project structure
- Generates configuration templates
- Sets up environment files
- Provides setup guidance

### Version Command (version.go)
- Shows CLI version
- Displays component versions
- Shows build information
- Platform details

## Building & Distribution

### Local Build
```bash
make cli-build
```

### Global Installation
```bash
make cli-install
```

### Multi-Platform Release
```bash
make cli-release
```

Builds for:
- macOS (amd64, arm64)
- Linux (amd64, arm64)
- Windows (amd64)

## Integration Points

### With Bifrost Core
- Uses bifrost.Init() for server initialization
- Loads plugins from bifrost-extensions
- Manages provider configuration

### With Deployment Platforms
- Fly.io: flyctl CLI
- Vercel: vercel CLI
- Railway: railway CLI
- Render: Git-based deployment
- Homebox: systemd services

### With Configuration
- Environment variables
- YAML configuration files
- .env files
- Runtime flags

## Extensibility

### Adding New Commands
1. Create new file in `cmd/bifrost/cli/`
2. Define command with Cobra
3. Register in `root.go`

### Adding New Subcommands
1. Create subcommand variable
2. Add to parent command
3. Implement RunE function

### Adding New Plugins
1. Implement plugin interface
2. Register in plugin.go
3. Add to plugin list

## Error Handling

- Graceful error messages
- Exit codes (0 for success, 1 for error)
- Validation before execution
- Helpful error suggestions

## User Experience

### Help System
```bash
bifrost --help
bifrost server --help
bifrost deploy fly --help
```

### Verbose Output
```bash
bifrost -v server
```

### Dry-Run Mode
```bash
bifrost deploy fly --dry-run
```

### Configuration Validation
```bash
bifrost config validate
```

## Security

- Masks sensitive values in output
- Validates API keys
- Supports environment variable injection
- No hardcoded secrets

## Future Enhancements

1. Interactive mode for configuration
2. Configuration file validation
3. Plugin marketplace integration
4. Metrics and monitoring
5. Auto-update functionality
6. Shell completion scripts
7. Configuration migration tools
8. Backup and restore functionality

