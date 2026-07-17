# Bifrost CLI - Quick Reference

## Installation

```bash
# Build
make cli-build

# Install globally
make cli-install

# Multi-platform release
make cli-release
```

## Common Commands

### Initialize Project
```bash
bifrost init
```

### Start Server
```bash
bifrost server
bifrost server -p 9000 -l debug
bifrost server -P router,learning
```

### Configuration
```bash
bifrost config show
bifrost config set OPENAI_API_KEY sk-...
bifrost config validate
```

### Plugins
```bash
bifrost plugin list
bifrost plugin enable promptadapter
bifrost plugin disable embeddings
bifrost plugin config router
```

### Datasets
```bash
bifrost dataset list
bifrost dataset load cursor
bifrost dataset stats
```

### Deployment
```bash
# Dry run
bifrost deploy fly --dry-run

# Deploy
bifrost deploy fly
bifrost deploy vercel
bifrost deploy railway
bifrost deploy render
bifrost deploy homebox
```

### Information
```bash
bifrost version
bifrost --help
bifrost server --help
```

## Global Flags

```bash
-v, --verbose       Enable verbose output
-c, --config FILE   Config file path
-h, --help          Show help
--version           Show version
```

## Environment Variables

```bash
OPENAI_API_KEY          OpenAI API key
ANTHROPIC_API_KEY       Anthropic API key
GOOGLE_API_KEY          Google API key
BIFROST_PORT            Server port (default: 8080)
BIFROST_HOST            Server host (default: 0.0.0.0)
LOG_LEVEL               Log level (default: info)
REDIS_URL               Redis connection URL
DATABASE_URL            Database connection URL
```

## Configuration Files

```
~/.bifrost/
├── config/bifrost.yaml      Main configuration
├── plugins/                 Plugin configs
├── data/                    Data files
└── logs/                    Log files

.env                         Environment variables
.env.example                 Example environment
```

## Workflow Examples

### Complete Setup
```bash
bifrost init
bifrost config set OPENAI_API_KEY sk-...
bifrost config set ANTHROPIC_API_KEY sk-ant-...
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

### Plugin Management
```bash
bifrost plugin list
bifrost plugin enable promptadapter
bifrost plugin config promptadapter
```

### Dataset Management
```bash
bifrost dataset list
bifrost dataset load cursor
bifrost dataset stats
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

## Platform-Specific Notes

### macOS
- Binary: `bin/bifrost`
- Install: `make cli-install`
- Shell: zsh/bash

### Linux
- Binary: `bin/bifrost`
- Install: `make cli-install`
- Shell: bash/zsh

### Windows
- Binary: `bin\bifrost.exe`
- Install: `make cli-install`
- Shell: PowerShell/cmd

## Documentation

- **CLI_GUIDE.md** - Comprehensive guide
- **CLI_ARCHITECTURE.md** - Architecture details
- **CLI_INTEGRATION.md** - Desktop app integration
- **SERVERLESS_DEPLOYMENT.md** - Deployment guide
- **DEPLOY_QUICK_START.md** - Quick start

## Support

For issues or questions:
1. Check documentation
2. Run `bifrost --help`
3. Enable verbose mode: `bifrost -v`
4. Check logs in `~/.bifrost/logs/`

