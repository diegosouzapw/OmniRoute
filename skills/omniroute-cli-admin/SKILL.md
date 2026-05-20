---
name: omniroute-cli-admin
description: Manage the OmniRoute server lifecycle via CLI — start/stop/restart, non-interactive setup, diagnostics (omniroute doctor), backup/restore, autostart, and tunnel management. Use when the user wants to operate the OmniRoute server, automate provisioning, or troubleshoot the runtime.
---

# OmniRoute — CLI Admin

Requires the `omniroute` CLI. See [CLI entry-point skill](https://raw.githubusercontent.com/diegosouzapw/OmniRoute/main/skills/omniroute-cli/SKILL.md) for install + global flags.

## Server lifecycle

```bash
omniroute                              # Start server (default port 20128)
omniroute serve                        # Explicit alias
omniroute --port 3000                  # Override port
omniroute --no-open                    # Don't auto-open browser
omniroute --mcp                        # Start as MCP server (stdio transport)

omniroute stop                         # Stop the running server
omniroute restart                      # Restart the server

omniroute dashboard                    # Open dashboard in browser
omniroute open                         # Alias for dashboard
omniroute status                       # Runtime status (uptime, requests, providers)
```

## Setup & provisioning

### Interactive wizard

```bash
omniroute setup                        # Step-by-step interactive setup
```

### Non-interactive (CI / Docker)

```bash
omniroute setup --non-interactive \
  --password 'admin-password' \
  --add-provider \
  --provider openai \
  --api-key 'sk-...' \
  --test-provider
```

Environment variables for non-interactive setup:

| Variable                      | Purpose                                      |
| ----------------------------- | -------------------------------------------- |
| `OMNIROUTE_SETUP_PASSWORD`    | Admin password (≥8 chars)                    |
| `OMNIROUTE_PROVIDER`          | Provider id (e.g. `openai`, `anthropic`)     |
| `OMNIROUTE_PROVIDER_NAME`     | Display name for the connection              |
| `OMNIROUTE_PROVIDER_BASE_URL` | Optional OpenAI-compatible base URL override |
| `OMNIROUTE_API_KEY`           | Provider API key                             |
| `OMNIROUTE_DEFAULT_MODEL`     | Optional default model                       |
| `DATA_DIR`                    | Override OmniRoute data directory            |

## Diagnostics

```bash
omniroute doctor                       # Full health check
omniroute doctor --json                # Machine-readable JSON
omniroute doctor --no-liveness         # Skip HTTP health probe
omniroute doctor --host 0.0.0.0        # Override liveness host
omniroute doctor --liveness-url <url>  # Full URL override
```

Checks performed: Config, Database, Storage/encryption, Port, Node runtime, Native binary (better-sqlite3), Memory, Server liveness.

Exit code is non-zero if any check fails — useful in CI:

```bash
omniroute doctor --json | jq '.checks[] | select(.status=="fail")'
```

## Backup & restore

```bash
omniroute backup                       # Snapshot config + SQLite DB to ~/.omniroute/backups/
omniroute restore                      # Restore from a previous snapshot (interactive picker)
```

## Autostart (system tray / startup)

```bash
omniroute autostart enable             # Register OmniRoute as a system startup item
omniroute autostart disable            # Remove startup registration
omniroute autostart status             # Show current autostart state
```

On Linux: creates a systemd user unit. On macOS: LaunchAgent plist. On Windows: registry startup entry.

## Tunnels (public URL)

Expose a local OmniRoute instance via a secure tunnel:

```bash
omniroute tunnel list                  # List active tunnels
omniroute tunnel create cloudflare     # Start a Cloudflare Tunnel (free)
omniroute tunnel create tailscale      # Start a Tailscale funnel
omniroute tunnel create ngrok          # Start an ngrok tunnel
omniroute tunnel stop <id>             # Stop a running tunnel
```

The tunnel URL is printed and can be used as `OMNIROUTE_BASE_URL` from remote machines.

## Config & environment

```bash
omniroute config show                  # Display current effective configuration
omniroute env show                     # List all OmniRoute environment variables
omniroute env get <KEY>                # Get a single env var value
omniroute env set <KEY> <value>        # Set an env var (temporary — until restart)
```

## Recovery

```bash
omniroute reset-password               # Reset the admin password interactively
omniroute reset-encrypted-columns      # Dry-run: show encrypted credential columns
omniroute reset-encrypted-columns --force  # Null out encrypted credentials in SQLite
```

Use `reset-encrypted-columns --force` only if `STORAGE_ENCRYPTION_KEY` was lost and you need to re-enter all provider API keys.

## Logs

```bash
omniroute logs                         # Stream live request logs
omniroute logs --json                  # JSON log entries
omniroute logs --search <term>         # Filter by term
omniroute logs --follow                # Tail mode (keep streaming)
```

## Update

```bash
omniroute update                       # Check for a newer version and prompt to update
```

## Errors

- `doctor` shows `STORAGE_ENCRYPTION_KEY missing` → set the key in `.env` or run `reset-encrypted-columns --force` to wipe and re-enter credentials
- `doctor` reports native binary fail → `npm rebuild better-sqlite3` in the OmniRoute app directory
- `tunnel create cloudflare` hangs → ensure `cloudflared` is installed: `brew install cloudflare/cloudflare/cloudflared`
