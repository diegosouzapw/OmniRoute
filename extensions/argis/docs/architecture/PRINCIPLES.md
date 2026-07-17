# Bifrost Extensions - Architecture Principles

## Core Philosophy

**bifrost-extensions** is a **standalone extension layer** that consumes upstream projects as Go modules, not by editing them directly.

## Dependency Model

### Upstream Dependencies (as Go Modules)
```
bifrost-extensions/
├── Consumes: github.com/maximhq/bifrost/core v1.2.30
├── Consumes: github.com/kooshapari/CLIProxyAPI/v7 v7.0.0
└── Consumes: Other public modules
```

### Why This Approach?

1. **Decoupling** - Extensions don't modify upstream code
2. **Maintainability** - Easy to update upstream versions
3. **Collaboration** - Stay in sync with main developers' updates
4. **Isolation** - Bugs in extensions don't affect upstream
5. **Reusability** - Extensions can be used with different upstream versions

## Modification Policy

### ✅ DO: Extend in bifrost-extensions

- Create new plugins that implement upstream interfaces
- Add new commands in the CLI
- Create wrapper types that add functionality
- Implement new services
- Add configuration layers
- Create adapters and transformers

### ❌ DON'T: Edit Upstream Repos

- Don't modify bifrost core code
- Don't modify cliproxy API code
- Don't fork and maintain separate versions
- Don't patch upstream directly

### ⚠️ ONLY IF NECESSARY: Upstream Changes

If upstream changes are absolutely required:

1. **Document the reason** - Why can't this be done in extensions?
2. **Create an issue** - Discuss with upstream maintainers
3. **Submit a PR** - Let upstream decide if it's appropriate
4. **Use a fork temporarily** - If urgent, use a fork with clear intent to merge upstream
5. **Plan for removal** - Have a timeline to remove the fork

## Project Structure

```
bifrost-extensions/
├── cmd/bifrost/                    # CLI (our code)
├── plugins/                        # Plugin implementations (our code)
├── services/                       # Service implementations (our code)
├── wrappers/                       # Wrapper types (our code)
├── config/                         # Configuration layer (our code)
├── go.mod                          # Declares upstream dependencies
└── go.sum                          # Locks dependency versions
```

## Consuming Upstream

### Bifrost Core
```go
import bifrost "github.com/maximhq/bifrost/core"

// Use bifrost types and functions
bf, err := bifrost.Init(ctx, config)
```

### CLIProxy API
```go
import cliproxy "github.com/kooshapari/CLIProxyAPI/v7"

// Use cliproxy types and functions
```

## Version Management

### Updating Dependencies
```bash
# Update bifrost to latest
go get -u github.com/maximhq/bifrost/core

# Update cliproxy to latest
go get -u github.com/kooshapari/CLIProxyAPI/v7

# Tidy dependencies
go mod tidy
```

### Pinning Versions
```bash
# Pin to specific version
go get github.com/maximhq/bifrost/core@v1.2.30
```

## Extension Points

### Plugins
Implement `schemas.Plugin` interface:
```go
type Plugin interface {
    GetName() string
    GetVersion() string
    Execute(ctx context.Context, req interface{}) (interface{}, error)
}
```

### Services
Create new services that use bifrost:
```go
type MyService struct {
    bifrost *bifrost.Instance
}
```

### Adapters
Transform between formats:
```go
type PromptAdapter struct {
    // Transforms prompts between models
}
```

## Testing Strategy

### Unit Tests
Test extensions in isolation:
```bash
go test ./plugins/...
go test ./services/...
```

### Integration Tests
Test with upstream modules:
```bash
go test ./tests/...
```

### Compatibility Tests
Verify with different upstream versions:
```bash
# Test with current version
go test ./...

# Test with older version
go get github.com/maximhq/bifrost/core@v1.2.29
go test ./...
```

## Documentation

### When Adding Features
1. Document in bifrost-extensions
2. Don't modify upstream docs
3. Link to upstream docs where relevant

### When Consuming Upstream
1. Reference upstream documentation
2. Document how extensions use it
3. Document any workarounds

## Collaboration

### With Bifrost Maintainers
- Report bugs in bifrost
- Suggest features via issues
- Submit PRs for improvements
- Use extensions for experimental features

### With CLIProxy Maintainers
- Report bugs in cliproxy
- Suggest features via issues
- Submit PRs for improvements
- Use extensions for experimental features

## Future Considerations

### Upstream Updates
- Monitor upstream releases
- Test compatibility
- Update go.mod when ready
- Document breaking changes

### Upstream Deprecations
- Plan migration path
- Update extensions
- Communicate changes to users

### Upstream Merges
- If features are accepted upstream, remove from extensions
- Update to use upstream version
- Simplify extensions

## Summary

**bifrost-extensions is a clean, maintainable extension layer that:**
- ✅ Consumes upstream as modules
- ✅ Adds value without modifying upstream
- ✅ Stays compatible with upstream updates
- ✅ Enables collaboration with main developers
- ✅ Provides a clear separation of concerns

