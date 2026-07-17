# Bifrost CLI - Complete System

## Overview

The Bifrost CLI is a comprehensive command-line interface that wraps all Infrastructure-as-Code (IaC) operations and provides user-facing functionality. It can be used standalone or integrated with desktop applications (.app for macOS, .exe for Windows).

## Quick Start

### 1. Build
```bash
make cli-build
```

### 2. Install
```bash
make cli-install
```

### 3. Initialize Project
```bash
bifrost init
```

### 4. Configure
```bash
bifrost config set OPENAI_API_KEY sk-...
bifrost config set ANTHROPIC_API_KEY sk-ant-...
bifrost config validate
```

### 5. Start Server
```bash
bifrost server
```

### 6. Deploy
```bash
bifrost deploy fly
```

## Documentation

### For Users
- **[CLI_QUICK_REFERENCE.md](CLI_QUICK_REFERENCE.md)** - Quick command reference
- **[CLI_GUIDE.md](CLI_GUIDE.md)** - Comprehensive user guide
- **[CLI_INDEX.md](CLI_INDEX.md)** - Complete index

### For Developers
- **[CLI_ARCHITECTURE.md](CLI_ARCHITECTURE.md)** - Architecture and design
- **[CLI_INTEGRATION.md](CLI_INTEGRATION.md)** - Desktop app integration
- **[CLI_SUMMARY.md](CLI_SUMMARY.md)** - Implementation summary

### For Deployment
- **[SERVERLESS_DEPLOYMENT.md](SERVERLESS_DEPLOYMENT.md)** - Deployment guide
- **[DEPLOY_QUICK_START.md](DEPLOY_QUICK_START.md)** - Quick start guides
- **[DEPLOYMENT_COMPARISON.md](DEPLOYMENT_COMPARISON.md)** - Platform comparison

## Commands

### Server
```bash
bifrost server                    # Start server
bifrost server -p 9000           # Custom port
bifrost server -l debug          # Debug logging
```

### Deployment
```bash
bifrost deploy fly               # Deploy to Fly.io
bifrost deploy vercel            # Deploy to Vercel
bifrost deploy railway           # Deploy to Railway
bifrost deploy render            # Deploy to Render
bifrost deploy homebox           # Deploy to Homebox
bifrost deploy fly --dry-run     # Test deployment
```

### Configuration
```bash
bifrost config show              # Show config
bifrost config set KEY VALUE     # Set value
bifrost config validate          # Validate config
```

### Plugins
```bash
bifrost plugin list              # List plugins
bifrost plugin enable NAME       # Enable plugin
bifrost plugin disable NAME      # Disable plugin
```

### Datasets
```bash
bifrost dataset list             # List datasets
bifrost dataset load NAME        # Load dataset
bifrost dataset stats            # Show statistics
```

### Project
```bash
bifrost init                     # Initialize project
bifrost version                  # Show version
bifrost --help                   # Show help
```

## Features

✓ **Infrastructure as Code** - Unified CLI for all platforms
✓ **Multi-Platform Deployment** - Fly.io, Vercel, Railway, Render, Homebox
✓ **Configuration Management** - Environment variables, YAML config
✓ **Plugin Management** - List, enable, disable plugins
✓ **Dataset Management** - Load and manage training datasets
✓ **Project Initialization** - Setup templates and configuration
✓ **Comprehensive Help** - Built-in help system
✓ **Dry-Run Mode** - Test deployments safely
✓ **Verbose Logging** - Debug mode for troubleshooting
✓ **Cross-Platform** - macOS, Linux, Windows support
✓ **Desktop Integration** - Embed in .app and .exe
✓ **Security** - Masked secrets, no hardcoded values

## Architecture

```
bifrost/
├── server              # Start Bifrost server
├── deploy              # Deploy to platforms
│   ├── fly
│   ├── vercel
│   ├── railway
│   ├── render
│   └── homebox
├── config             # Configuration management
├── plugin             # Plugin management
├── dataset            # Dataset management
├── init               # Project initialization
├── version            # Version information
└── help               # Help system
```

## Build & Distribution

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

Creates binaries for:
- macOS (amd64, arm64)
- Linux (amd64, arm64)
- Windows (amd64)

## Integration

### With Bifrost Core
- Server initialization
- Plugin loading
- Provider configuration

### With Deployment Platforms
- Fly.io (flyctl)
- Vercel (vercel CLI)
- Railway (railway CLI)
- Render (Git-based)
- Homebox (systemd)

### With Desktop Apps
- macOS (.app) - Swift integration
- Windows (.exe) - C# integration
- IPC communication
- Menu integration

## Configuration

### Environment Variables
```bash
OPENAI_API_KEY          OpenAI API key
ANTHROPIC_API_KEY       Anthropic API key
GOOGLE_API_KEY          Google API key
BIFROST_PORT            Server port (default: 8080)
BIFROST_HOST            Server host (default: 0.0.0.0)
LOG_LEVEL               Log level (default: info)
```

### Configuration Files
```
~/.bifrost/
├── config/bifrost.yaml      Main configuration
├── plugins/                 Plugin configs
├── data/                    Data files
└── logs/                    Log files
```

## Examples

### Complete Setup
```bash
bifrost init
bifrost config set OPENAI_API_KEY sk-...
bifrost config validate
bifrost server
```

### Development
```bash
bifrost server -v -l debug -p 9000
```

### Deployment
```bash
bifrost deploy fly --dry-run
bifrost deploy fly
```

## Troubleshooting

### Command not found
```bash
make cli-install
```

### Configuration errors
```bash
bifrost config validate
```

### Deployment issues
```bash
bifrost deploy fly --dry-run
```

### Server issues
```bash
bifrost server -v -l debug
```

## Next Steps

1. Read [CLI_QUICK_REFERENCE.md](CLI_QUICK_REFERENCE.md)
2. Build: `make cli-build`
3. Install: `make cli-install`
4. Initialize: `bifrost init`
5. Start: `bifrost server`
6. Deploy: `bifrost deploy fly`

## Support

For help:
1. Run `bifrost --help`
2. Check documentation
3. Enable verbose mode: `bifrost -v`
4. Review logs in `~/.bifrost/logs/`

## Status

✨ **READY FOR PRODUCTION**

All components implemented, tested, and documented.

