# OmniRoute AI Agent Skills

Drop-in skills that let any AI agent (Claude Desktop, ChatGPT, Cursor, Cline, Continue, etc.)
consume OmniRoute via OpenAI-compatible REST in one fetch.

## How agents use these

```
User to agent: "Use OmniRoute for code-gen. Fetch this URL and follow it:
https://raw.githubusercontent.com/diegosouzapw/OmniRoute/main/skills/omniroute/SKILL.md"
```

The agent retrieves the manifest, sees the setup + endpoints, and routes calls
through `$OMNIROUTE_URL/v1/...` with `Authorization: Bearer $OMNIROUTE_KEY`.

## Skills index

| Capability               | Manifest                                                             |
| ------------------------ | -------------------------------------------------------------------- |
| Entry point + setup      | [omniroute/SKILL.md](omniroute/SKILL.md)                             |
| Chat / code-gen          | [omniroute-chat/SKILL.md](omniroute-chat/SKILL.md)                   |
| Image generation         | [omniroute-image/SKILL.md](omniroute-image/SKILL.md)                 |
| Text-to-speech           | [omniroute-tts/SKILL.md](omniroute-tts/SKILL.md)                     |
| Speech-to-text           | [omniroute-stt/SKILL.md](omniroute-stt/SKILL.md)                     |
| Embeddings               | [omniroute-embeddings/SKILL.md](omniroute-embeddings/SKILL.md)       |
| Web search               | [omniroute-web-search/SKILL.md](omniroute-web-search/SKILL.md)       |
| Web fetch (URL→markdown) | [omniroute-web-fetch/SKILL.md](omniroute-web-fetch/SKILL.md)         |
| MCP server (37 tools)    | [omniroute-mcp/SKILL.md](omniroute-mcp/SKILL.md)                     |
| A2A protocol             | [omniroute-a2a/SKILL.md](omniroute-a2a/SKILL.md)                     |
| Routing & combos         | [omniroute-routing/SKILL.md](omniroute-routing/SKILL.md)             |
| Token compression        | [omniroute-compression/SKILL.md](omniroute-compression/SKILL.md)     |
| Monitoring & health      | [omniroute-monitoring/SKILL.md](omniroute-monitoring/SKILL.md)       |
| CLI entry point          | [omniroute-cli/SKILL.md](omniroute-cli/SKILL.md)                     |
| CLI admin & lifecycle    | [omniroute-cli-admin/SKILL.md](omniroute-cli-admin/SKILL.md)         |
| CLI providers & keys     | [omniroute-cli-providers/SKILL.md](omniroute-cli-providers/SKILL.md) |
| CLI cloud agents         | [omniroute-cli-cloud/SKILL.md](omniroute-cli-cloud/SKILL.md)         |
| CLI evals & benchmarks   | [omniroute-cli-eval/SKILL.md](omniroute-cli-eval/SKILL.md)           |

## Format

Each `SKILL.md` follows the Anthropic skill manifest spec with YAML frontmatter
(`name`, `description`) and a self-contained markdown body: setup, endpoints,
examples, and error codes. Assume the reader is an agent with no prior context.

## Skills exclusive to OmniRoute

These 5 skills have no equivalent in other AI routers:

- `omniroute-mcp` — 37 MCP tools (memory, skills, providers, routing, compression) over SSE/stdio/HTTP
- `omniroute-a2a` — 5 A2A skills (smart-routing, quota, discovery, cost, health) via JSON-RPC 2.0
- `omniroute-routing` — create/configure combos, 14 strategies, Auto-combo scoring, fallback chains
- `omniroute-compression` — RTK + Caveman + stacked mode + MCP accessibility filter (60–90% token savings)
- `omniroute-monitoring` — circuit breakers, p50/p95/p99 latency, budget guard, MCP audit log
