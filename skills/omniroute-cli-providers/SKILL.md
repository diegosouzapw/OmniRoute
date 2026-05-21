---
name: omniroute-cli-providers
description: Manage OmniRoute provider connections, API keys, and routing combos via CLI — add/list/test/remove providers, rotate keys, run OAuth flows, list models, and create/switch combos. Use when the user wants to configure providers, manage credentials, or set up routing from the terminal.
---

# OmniRoute — CLI Providers & Keys

Requires the `omniroute` CLI. See [CLI entry-point skill](https://raw.githubusercontent.com/diegosouzapw/OmniRoute/main/skills/omniroute-cli/SKILL.md) for install + global flags.

## Provider catalog (available providers)

```bash
omniroute providers available                        # Full OmniRoute provider catalog
omniroute providers available --search openai        # Filter by id, name, alias
omniroute providers available --category api-key     # Filter by category
omniroute providers available --json                 # Machine-readable JSON
```

Categories: `api-key`, `oauth`, `free`, `local`, `combo`.

## Configured provider connections

```bash
omniroute providers list                             # Connections in your DB
omniroute providers list --json
```

## Testing connections

```bash
omniroute providers test <id|name>                   # Test one configured connection
omniroute providers test-all                         # Test every active connection (TUI progress)
omniroute providers validate                         # Local-only structural validation (no HTTP)
```

`test-all` opens an interactive TUI that shows live pass/fail per connection. Use `--json` to get a machine-readable result:

```bash
omniroute providers test-all --json
```

## API key management (OmniRoute keys)

These manage the OmniRoute API keys issued under **API Manager** — not provider credentials.

```bash
omniroute keys list                                  # List all OmniRoute API keys
omniroute keys add <provider> [apiKey]               # Add an API key for a provider
omniroute keys remove <provider>                     # Remove an API key
omniroute keys regenerate <id>                       # Regenerate (rotate) a key
omniroute keys revoke <id>                           # Revoke a key (disables it)
omniroute keys reveal <id>                           # Show the full key value
omniroute keys usage <id>                            # Show usage stats for a key

omniroute keys rotate <id>                           # Rotate + revoke old key atomically
omniroute keys expiration list                       # List key expiration times
```

### Key policies

```bash
omniroute keys policy show <id>                      # Show rate-limit / permission policy
omniroute keys policy set <id> \
  --rate-limit 100 \
  --rate-window minute \
  --permissions chat,models                          # Set policy on a key
```

## Models

```bash
omniroute models                                     # List all models (all providers)
omniroute models openai                              # Filter by provider
omniroute models --search gpt                        # Search by name
omniroute models --json                              # JSON output
```

## OAuth providers

```bash
omniroute oauth list                                 # List OAuth-configured providers
omniroute oauth login <provider>                     # Start browser-based OAuth flow
omniroute oauth logout <provider>                    # Revoke OAuth token
omniroute oauth status <provider>                    # Show token state + expiry
omniroute oauth refresh <provider>                   # Force token refresh
```

For OAuth providers (Gemini, Windsurf, Antigravity, etc.) the `login` command opens the OmniRoute dashboard OAuth flow in your browser.

## Provider nodes (multi-account routing)

Provider nodes let you attach multiple API keys / accounts to one logical provider for round-robin or failover.

```bash
omniroute nodes list <provider>                      # List nodes for a provider
omniroute nodes add <provider> --api-key <key>       # Add a node
omniroute nodes remove <provider> <nodeId>           # Remove a node
omniroute nodes test <provider> <nodeId>             # Test one node
```

## Routing combos (CLI)

Create and manage routing combos from the terminal:

```bash
omniroute combo list                                 # List all combos
omniroute combo create <name> \
  --strategy priority \
  --targets anthropic/claude-opus-4-7,openai/gpt-4o  # Create combo
omniroute combo switch <name>                        # Activate a combo as default
omniroute combo delete <name>                        # Delete a combo
omniroute combo suggest --task "code review"         # Ask OmniRoute to recommend a combo
```

For the full REST API for combos see [omniroute-routing skill](https://raw.githubusercontent.com/diegosouzapw/OmniRoute/main/skills/omniroute-routing/SKILL.md).

## Quota & usage

```bash
omniroute quota                                      # Provider quota usage + reset times
omniroute usage                                      # Request + token usage summary
omniroute cost                                       # Cost breakdown (by provider/model)
```

## Compression (CLI)

```bash
omniroute compression status                         # Current compression mode + savings stats
omniroute compression set --mode rtk                 # Enable RTK compression
omniroute compression set --mode stacked             # Enable stacked (RTK + Caveman)
omniroute compression set --mode off                 # Disable compression
omniroute compression preview --mode rtk --text "..."  # Preview savings for sample text
```

## Health

```bash
omniroute health                                     # Detailed health: circuit breakers, cache, memory
```

## Errors

- `providers test <id>` fails with 401 → API key stored for that provider is wrong; use `keys remove` + `keys add` to reset it
- `oauth login` opens but doesn't complete → the OAuth token endpoint may be firewalled; use API key auth instead
- `combo create` fails with `strategy unknown` → use one of: `priority`, `weighted`, `round-robin`, `fill-first`, `least-used`, `cost-optimized`, `auto`, `random`, `strict-random`, `p2c`, `reset-aware`, `lkgp`, `context-optimized`, `context-relay`
