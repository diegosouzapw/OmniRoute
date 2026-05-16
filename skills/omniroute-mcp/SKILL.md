---
name: omniroute-mcp
description: OmniRoute exposes a built-in MCP (Model Context Protocol) server with 37 tools (chat, embeddings, memory CRUD, skills, providers, routing, audit) over SSE/stdio/HTTP transports. Use when the user wants to add OmniRoute as an MCP server in Claude Desktop, Cursor, Cline, or any MCP-compatible client.
---

# OmniRoute — MCP Server

Requires `OMNIROUTE_URL` and `OMNIROUTE_KEY`. See [entry-point SKILL](https://raw.githubusercontent.com/diegosouzapw/OmniRoute/main/skills/omniroute/SKILL.md) for setup.

## Transports

- **stdio** — local IPC, for Claude Desktop / VS Code extensions
- **SSE** — `GET $OMNIROUTE_URL/api/mcp/sse`
- **Streamable HTTP** — `POST $OMNIROUTE_URL/api/mcp/stream`

## Claude Desktop config

Add to `~/Library/Application Support/Claude/claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "omniroute": {
      "command": "npx",
      "args": ["-y", "omniroute", "--mcp"],
      "env": { "OMNIROUTE_KEY": "sk-..." }
    }
  }
}
```

## Cursor / VS Code config

```json
{
  "mcp": {
    "servers": {
      "omniroute": {
        "url": "http://localhost:20128/api/mcp/sse",
        "headers": { "Authorization": "Bearer sk-..." }
      }
    }
  }
}
```

## Available tools (37 total)

| Scope     | Tools                                                                                              |
| --------- | -------------------------------------------------------------------------------------------------- |
| health    | `omniroute_get_health`                                                                             |
| combos    | `omniroute_list_combos`, `omniroute_get_combo_metrics`, `omniroute_switch_combo`                   |
| routing   | `omniroute_simulate_route`, `omniroute_best_combo_for_task`, `omniroute_explain_route`             |
| providers | `omniroute_get_provider_metrics`, `omniroute_check_quota`, `omniroute_route_request`               |
| budget    | `omniroute_set_budget_guard`, `omniroute_set_routing_strategy`, `omniroute_set_resilience_profile` |
| testing   | `omniroute_test_combo`                                                                             |
| memory    | `memory_add`, `memory_search`, `memory_delete`                                                     |
| skills    | `skill_invoke`, `skill_list`, `skill_describe`, `skill_register`                                   |
| cache     | `omniroute_cache_stats`, `omniroute_cache_flush`                                                   |
| admin     | `omniroute_db_health_check`, `omniroute_sync_pricing`, `omniroute_get_session_snapshot`            |

Full list: `GET $OMNIROUTE_URL/api/mcp/tools`

## Scopes

Tools are grouped into 13 scopes (chat-only, memory-readonly, full-admin, etc.).
Pass scope name as `--scope` arg or via `X-Omniroute-Scope` header.

## Reference

Full docs: https://github.com/diegosouzapw/OmniRoute/blob/main/docs/frameworks/MCP-SERVER.md
