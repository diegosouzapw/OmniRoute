# Bifrost Extensions - Extension Layer Guide

## Overview

**bifrost-extensions** is a clean extension layer that adds functionality to Bifrost and CLIProxy without modifying their source code.

## Architecture

```
┌─────────────────────────────────────────┐
│     bifrost-extensions (our code)       │
│  • CLI (cmd/bifrost/)                   │
│  • Plugins (plugins/)                   │
│  • Services (services/)                 │
│  • Wrappers (wrappers/)                 │
│  • Configuration (config/)              │
└──────────────────┬──────────────────────┘
                   │
        Consumes as Go modules
                   │
        ┌──────────┴──────────┐
        │                     │
┌───────▼────────┐   ┌────────▼──────────┐
│ bifrost/core   │   │ cliproxy/api      │
│ (upstream)     │   │ (upstream)        │
└────────────────┘   └───────────────────┘
```

## Key Principles

### 1. No Upstream Modifications
- ✅ All code in bifrost-extensions/
- ❌ Never edit bifrost/ or cliproxy/
- ✅ Use Go modules for dependencies
- ✅ Implement via interfaces

### 2. Extension Points
- **Plugins** - Implement `schemas.Plugin`
- **CLI** - Add commands via Cobra
- **Services** - Create new services
- **Adapters** - Transform data
- **Configuration** - Extend config

### 3. Version Independence
- Update upstream independently
- No code changes needed
- Backward compatible
- Forward compatible

## How to Extend

### Adding a New Plugin

```go
// plugins/myplugin/plugin.go
package myplugin

import "github.com/maximhq/bifrost/core/schemas"

type MyPlugin struct {
    config Config
}

func (p *MyPlugin) GetName() string {
    return "myplugin"
}

func (p *MyPlugin) Execute(ctx context.Context, req interface{}) (interface{}, error) {
    // Implementation
    return nil, nil
}
```

### Adding a New CLI Command

```go
// cmd/bifrost/cli/mycommand.go
package cli

import "github.com/spf13/cobra"

var myCmd = &cobra.Command{
    Use:   "mycommand",
    Short: "My command",
    RunE:  runMyCommand,
}

func runMyCommand(cmd *cobra.Command, args []string) error {
    // Implementation
    return nil
}

func init() {
    rootCmd.AddCommand(myCmd)
}
```

### Adding a New Service

```go
// services/myservice/service.go
package myservice

import bifrost "github.com/maximhq/bifrost/core"

type MyService struct {
    bifrost *bifrost.Instance
}

func New(bf *bifrost.Instance) *MyService {
    return &MyService{bifrost: bf}
}

func (s *MyService) DoSomething() error {
    // Use bifrost
    return nil
}
```

## Updating Dependencies

### Check for Updates
```bash
go list -u -m all
```

### Update Bifrost
```bash
go get -u github.com/maximhq/bifrost/core
go mod tidy
go test ./...
```

### Update CLIProxy
```bash
go get -u github.com/kooshapari/CLIProxyAPI/v7
go mod tidy
go test ./...
```

## Testing Strategy

### Unit Tests
Test extensions in isolation:
```bash
go test ./plugins/...
go test ./services/...
go test ./cmd/bifrost/cli/...
```

### Integration Tests
Test with upstream modules:
```bash
go test ./tests/...
```

### Compatibility Tests
Verify with different versions:
```bash
# Current version
go test ./...

# Older version
go get github.com/maximhq/bifrost/core@v1.2.29
go test ./...

# Restore
go get github.com/maximhq/bifrost/core@latest
```

## When to Modify Upstream

### ❌ Don't Modify If:
- Can be done in extensions
- Workaround exists
- Not critical

### ✅ Consider If:
- Bug in upstream
- Missing critical feature
- Affects multiple projects
- Upstream maintainers agree

### Process:
1. Document reason
2. Create issue in upstream
3. Submit PR to upstream
4. Use fork temporarily if urgent
5. Plan to remove fork

## File Organization

```
bifrost-extensions/
├── cmd/bifrost/                    # CLI (our code)
│   ├── main.go
│   └── cli/
│       ├── root.go
│       ├── server.go
│       ├── deploy.go
│       ├── config.go
│       ├── plugin.go
│       ├── dataset.go
│       ├── version.go
│       └── init.go
├── plugins/                        # Plugins (our code)
│   ├── intelligentrouter/
│   ├── learning/
│   ├── smartfallback/
│   └── ...
├── services/                       # Services (our code)
│   ├── promptadapter/
│   ├── researchintel/
│   └── ...
├── wrappers/                       # Wrappers (our code)
│   ├── agentapi/
│   ├── cliproxy/
│   └── ...
├── config/                         # Configuration (our code)
│   └── config.go
├── go.mod                          # Dependencies
├── go.sum                          # Locked versions
└── ARCHITECTURE_PRINCIPLES.md      # This pattern
```

## Benefits

### For Development
- ✅ Clean separation of concerns
- ✅ Easy to understand
- ✅ Easy to test
- ✅ Easy to extend

### For Maintenance
- ✅ Easy to update upstream
- ✅ No merge conflicts
- ✅ No version conflicts
- ✅ Easy to debug

### For Collaboration
- ✅ Stay in sync with main developers
- ✅ Contribute back via PRs
- ✅ Benefit from improvements
- ✅ Share extensions with others

## Examples

### Example 1: Adding a New Deployment Platform

```go
// cmd/bifrost/cli/deploy.go - Add new subcommand
var deployNewPlatformCmd = &cobra.Command{
    Use:   "newplatform",
    Short: "Deploy to NewPlatform",
    RunE:  deployToNewPlatform,
}

func deployToNewPlatform(cmd *cobra.Command, args []string) error {
    // Implementation
    return nil
}

func init() {
    deployCmd.AddCommand(deployNewPlatformCmd)
}
```

### Example 2: Adding a New Plugin

```go
// plugins/newplugin/plugin.go
type NewPlugin struct{}

func (p *NewPlugin) GetName() string { return "newplugin" }
func (p *NewPlugin) Execute(ctx context.Context, req interface{}) (interface{}, error) {
    // Implementation
    return nil, nil
}
```

### Example 3: Adding a New Service

```go
// services/newservice/service.go
type NewService struct {
    bifrost *bifrost.Instance
}

func (s *NewService) Process(data interface{}) error {
    // Use bifrost
    return nil
}
```

## Summary

**bifrost-extensions** is a clean, maintainable extension layer that:
- ✅ Consumes upstream as modules
- ✅ Adds value without modifying upstream
- ✅ Stays compatible with updates
- ✅ Enables collaboration
- ✅ Provides clear separation

This pattern ensures long-term maintainability and compatibility with upstream projects.

