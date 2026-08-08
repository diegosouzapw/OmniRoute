---
name: mcp-on-demand
description: Manage MCP servers in SerpentOS — keep only the core set (gcp, github, memory-mcp, supermemory) always on in .mcp.json, and connect any other MCP (davinci-mcp, falkordb, chroma, …) on demand for the duration of a task only. Use when adding, removing, or temporarily connecting an MCP server, or when wiring a new MCP that needs an API key.
---

# MCP On-Demand Policy

SerpentOS keeps `.mcp.json` minimal. Core always-on servers (never remove without explicit user command):

| Server | Purpose | Auth |
|---|---|---|
| `gcp` | Google Cloud MCP | ADC: `gcloud auth application-default login` |
| `github` | GitHub MCP | `${GITHUB_TOKEN}` from Doppler `serpent/prd` |
| `memory-mcp` | Chroma + Obsidian + Supermemory unified memory | Doppler-wrapped; MANDATORY per AGENTS.md `[MANDATORY: CHROMA MEMORY]` |
| `supermemory` | Hosted Supermemory MCP (containerTag=serpentos) | `scripts/mcp/supermemory-mcp.sh` → Doppler `SUPERMEMORY_API_KEY` |

**Supabase** is NOT in `.mcp.json` — it runs as a claude.ai plugin connector. The user must authorize it once via claude.ai connector settings (OAuth). No `SUPABASE_ACCESS_TOKEN` exists in Doppler, so the official Supabase MCP server cannot be self-hosted here.

## Connecting an on-demand MCP

Registry of non-core servers: `.claude/mcp-on-demand.json` (NOT auto-loaded by Claude Code).

1. Open `.claude/mcp-on-demand.json` and find the server entry (e.g. `davinci-mcp`).
2. Copy that entry into the `mcpServers` object of `.mcp.json`.
3. Restart the Claude Code session (or `/mcp` reconnect) so the server loads.
4. Do the task.
5. **Remove the entry from `.mcp.json` again** and commit. `.mcp.json` must return to the 4 core servers.

To register a new on-demand server, add it to `.claude/mcp-on-demand.json` (not to `.mcp.json`).

## Secrets for MCP servers — Doppler wrapper pattern

Never hardcode keys in `.mcp.json`. For remote MCPs needing an auth header, create a wrapper in `scripts/mcp/`:

```bash
#!/usr/bin/env bash
# <name> MCP via mcp-remote; API key injected by Doppler at runtime — never hardcoded.
exec doppler run --project serpent --config prd -- sh -c 'exec npx -y mcp-remote https://<host>/mcp --header "x-api-key:${<SECRET_NAME>}"'
```

`chmod +x` it and reference it from the config as `"command": "bash", "args": ["<abs path to script>"]`. Example: `scripts/mcp/supermemory-mcp.sh`.

## Enable/disable without deleting

`.claude/settings.local.json` controls which `.mcp.json` servers actually load:
- `enabledMcpjsonServers`: `["gcp", "github", "memory-mcp", "supermemory"]`
- `disabledMcpjsonServers`: park a server here to switch it off without removing its config.

(`.claude/settings.json` is protected — never edit it; `settings.local.json` is the right file.)
