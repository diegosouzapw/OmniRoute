# OmniRoute Agent Skills

Drop-in skills that let any AI agent (Claude Desktop, ChatGPT, Cursor, Cline, Continue, etc.)
consume OmniRoute via OpenAI-compatible REST in one fetch.

## Entry points

| Type | Skill                                       | Manifest                                 |
| ---- | ------------------------------------------- | ---------------------------------------- |
| API  | Authentication (start here for REST access) | [omni-auth/SKILL.md](omni-auth/SKILL.md) |
| CLI  | Serve (start here for CLI access)           | [cli-serve/SKILL.md](cli-serve/SKILL.md) |

## How agents discover capabilities

- **MCP tool**: `omniroute_agent_skills_list` (scope `read:catalog`) — returns the full 42-skill catalog in one call.
- **A2A skill**: `list-capabilities` — JSON-RPC 2.0 endpoint that returns the agent card with all registered skills.

See [`docs/frameworks/AGENT-SKILLS.md`](../docs/frameworks/AGENT-SKILLS.md) for the full framework reference.

---

## API Skills (22)

Each manifest URL follows the pattern:
`https://raw.githubusercontent.com/diegosouzapw/OmniRoute/main/skills/<id>/SKILL.md`

| ID                     | Name                          | Description                                                                                                                                                                                    |
| ---------------------- | ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `omni-auth`            | Authentication                | Manage API key authentication and session tokens. Start here to authenticate requests via Bearer token, obtain session cookies, and configure login requirements.                              |
| `omni-providers`       | Providers                     | Manage provider connections, API keys, OAuth flows, and connection tests. List, add, update, remove, and test AI provider integrations (OpenAI, Anthropic, Gemini, and 160+).                  |
| `omni-models`          | Models                        | Query available AI models across all configured providers. List models, resolve model aliases, and browse the full model catalog including provider-specific variants.                         |
| `omni-combos-routing`  | Combos & Routing              | Create and manage routing combos with 14 strategies (priority, weighted, round-robin, Auto-combo, etc.). Configure fallback chains, test routing outcomes, and retrieve combo metrics.         |
| `omni-api-keys`        | API Keys                      | Create, list, rotate, and revoke OmniRoute API keys. Control per-key scopes, spending limits, and expiration.                                                                                  |
| `omni-usage-logs`      | Usage & Logs                  | Access detailed call logs and usage analytics. Filter by provider, model, time range, status, and cost. Export logs and aggregate token usage.                                                 |
| `omni-budget`          | Budget & Rate Limits          | Configure spending limits, token quotas, and rate-limit policies per API key or globally. Inspect current consumption and enforce cost controls.                                               |
| `omni-settings`        | Settings                      | Read and update global application settings: system prompts, thinking budget, IP filters, payload rules, combo defaults, and require-login configuration.                                      |
| `omni-proxies`         | Proxy Configuration           | Configure HTTP/HTTPS/SOCKS proxies for upstream provider requests. Set per-provider or global proxy rules, test connectivity, and manage proxy rotation.                                       |
| `omni-cache`           | Cache                         | Manage the LLM response cache. View cache statistics, clear entries, configure TTL policies, and control semantic-similarity caching thresholds.                                               |
| `omni-compression`     | Compression                   | Configure RTK, Caveman, and stacked compression modes. Manage language packs, custom rules, and test prompt compression reducing tokens by 60–90%.                                             |
| `omni-context-rtk`     | Context & RTK                 | Configure RTK filters, context engineering rules, and context relay settings. Test compression with real prompt samples and manage context transformation pipelines.                           |
| `omni-resilience`      | Resilience & Monitoring       | Monitor provider health, circuit-breaker states, p50/p95/p99 latency metrics, and budget guard alerts. Inspect connection cooldowns and model lockouts in real time.                           |
| `omni-cli-tools`       | CLI Tools                     | Manage CLI tool integrations exposed via the API. List, configure, and invoke CLI tool plugins that extend OmniRoute's automation surface.                                                     |
| `omni-tunnels`         | Tunnels                       | Create and manage secure tunnels (ngrok, Cloudflare Tunnel, custom) to expose OmniRoute to the internet or share access with remote agents and CI pipelines.                                   |
| `omni-sync-cloud`      | Cloud Sync                    | Synchronise OmniRoute configuration, provider connections, and settings to/from cloud storage. Manage cloud worker authentication and remote backup targets.                                   |
| `omni-db-backups`      | Database & Backups            | Trigger system backups, restore from backup files, and manage the SQLite database lifecycle. Supports export, import, and incremental snapshot strategies.                                     |
| `omni-webhooks`        | Webhooks                      | Register, list, test, and remove webhook endpoints. Configure event subscriptions (request.completed, provider.error, budget.exceeded, etc.) and manage delivery retries.                      |
| `omni-mcp`             | MCP Server                    | Connect to the OmniRoute MCP server (37 tools, 3 transports: SSE/stdio/HTTP). Covers routing, cache, compression, memory, skills, providers, and audit tools across 16 permission scopes.      |
| `omni-agents-a2a`      | Agents & A2A Protocol         | Interact with OmniRoute via JSON-RPC 2.0 agent-to-agent protocol. 6 built-in A2A skills: smart-routing, quota-management, provider-discovery, cost-analysis, health-report, list-capabilities. |
| `omni-version-manager` | Version Manager               | Install, start, stop, restart, and update embedded services (9Router, CLIProxyAPI). Monitor service status, retrieve logs, and configure auto-start.                                           |
| `omni-inference`       | Inference (OpenAI-compatible) | The core OpenAI-compatible inference endpoints: chat completions, embeddings, images, audio (TTS/STT), moderations, rerank, and the Responses API.                                             |

---

## CLI Skills (21)

| ID                    | Name                          | Description                                                                                                                                                                                    |
| --------------------- | ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `cli-serve`           | CLI: Serve                    | Start, stop, and restart the OmniRoute server from the CLI. Manage daemon mode, port configuration, auto-recovery, system tray integration, and the dashboard open shortcut.                   |
| `cli-health`          | CLI: Health                   | Check server health, component status, and live metrics from the CLI. Run `health`, `health components`, and `health watch` for a real-time dashboard of circuit breakers and provider status. |
| `cli-providers`       | CLI: Providers                | Manage provider connections from the CLI: list available/configured providers, add, test, test-all, validate, rotate API keys, and view per-provider metrics.                                  |
| `cli-keys`            | CLI: API Keys                 | Create, list, rotate, and revoke OmniRoute API keys from the CLI. Manage OAuth flows for provider authentication and inspect key scopes and expiration.                                        |
| `cli-models`          | CLI: Models                   | Query available AI models, list model aliases, and browse the full model catalog from the CLI. Filter by provider, search by capability, and resolve model name variants.                      |
| `cli-chat`            | CLI: Chat                     | Send chat completions, stream responses, and start an interactive REPL session from the CLI. Supports all OmniRoute providers, combo routing, and system prompt configuration.                 |
| `cli-routing`         | CLI: Routing & Combos         | Create, list, update, and delete routing combos from the CLI. Test routing strategies, inspect combo metrics, and configure fallback chains interactively.                                     |
| `cli-resilience`      | CLI: Resilience & Quotas      | Inspect and manage circuit-breaker states, connection cooldowns, quota limits, and backoff levels from the CLI. Reset stuck providers and configure resilience thresholds.                     |
| `cli-compression`     | CLI: Compression              | Configure and test prompt compression from the CLI. Manage RTK filters, Caveman rules, stacked compression modes, and preview compression output with real prompts.                            |
| `cli-contexts`        | CLI: Contexts & Sessions      | Manage context engineering configurations, RTK filter sets, and conversation sessions from the CLI. Apply context-relay settings and inspect active context pipelines.                         |
| `cli-cost-usage`      | CLI: Cost & Usage             | View cost breakdowns, token usage, and call logs from the CLI. Filter by provider, model, or date range. Export usage reports and inspect per-connection spending.                             |
| `cli-mcp`             | CLI: MCP                      | Inspect the MCP server status, list registered tools and scopes, run tool invocations, and manage MCP audit logs from the CLI.                                                                 |
| `cli-a2a`             | CLI: A2A Protocol             | Interact with the OmniRoute A2A server from the CLI. Send tasks, inspect skill execution history, and test the JSON-RPC 2.0 agent-to-agent protocol interactively.                             |
| `cli-tunnel`          | CLI: Tunnels                  | Start and stop tunnel connections (ngrok, Cloudflare, custom) from the CLI. Inspect active tunnel URLs, configure authentication, and test external reachability.                              |
| `cli-backup-sync`     | CLI: Backup & Sync            | Backup and restore OmniRoute data from the CLI. Trigger incremental snapshots, sync to cloud storage, manage backup schedules, and restore from archive files.                                 |
| `cli-policy-audit`    | CLI: Policy & Audit           | Inspect audit logs, manage access policies, view telemetry data, and review request history from the CLI. Filter by event type, user, or time range for compliance workflows.                  |
| `cli-batches`         | CLI: Batches & Files          | Submit and monitor batch inference jobs from the CLI. Upload and manage files for batch processing, retrieve results, and integrate batch pipelines with CI/CD workflows.                      |
| `cli-eval`            | CLI: Evals                    | Create and run evaluation suites, watch live benchmark progress, view scorecards, compare model performance, and integrate eval runs with CI workflows from the CLI.                           |
| `cli-plugins-skills`  | CLI: Plugins, Skills & Memory | Manage Omni Skills (list, install, test, remove), plugins (create, configure), and persistent memory (search, add, clear) from the CLI.                                                        |
| `cli-setup`           | CLI: Setup & Config           | Run initial setup, configure global CLI settings, manage environment variables, check for updates, and configure autostart via the CLI setup and config commands.                              |
| `cli-skill-collector` | CLI: Skill Collector          | Detect installed coding CLI tools, search GitHub for matching agent skills, and plan their installation into the detected tools' skill directories.                                            |

---

## Raw manifest URLs

All manifests are publicly accessible:

```
https://raw.githubusercontent.com/diegosouzapw/OmniRoute/main/skills/<id>/SKILL.md
```

Examples:

- API entry: `https://raw.githubusercontent.com/diegosouzapw/OmniRoute/main/skills/omni-auth/SKILL.md`
- CLI entry: `https://raw.githubusercontent.com/diegosouzapw/OmniRoute/main/skills/cli-serve/SKILL.md`

---

## Format

Each `SKILL.md` follows the Anthropic skill manifest spec with YAML frontmatter
(`name`, `description`) and a self-contained markdown body: setup, endpoints,
examples, and error codes. Assume the reader is an agent with no prior context.

---

## What makes OmniRoute skills unique

- `omni-mcp` — 37 MCP tools (memory, skills, providers, routing, compression) over SSE/stdio/HTTP
- `omni-agents-a2a` — 6 A2A skills (smart-routing, quota, discovery, cost, health, list-capabilities) via JSON-RPC 2.0
- `omni-combos-routing` — create/configure combos, 14 strategies, Auto-combo scoring, fallback chains
- `omni-compression` — RTK + Caveman + stacked mode + MCP accessibility filter (60–90% token savings)
- `omni-resilience` — circuit breakers, p50/p95/p99 latency, budget guard, MCP audit log
