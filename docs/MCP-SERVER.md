# OmniRoute MCP Server Documentation

> Model Context Protocol server with 37 tools across routing, cache, compression, memory, skills, and proxy operations

## Installation

OmniRoute MCP is built-in. Start it with:

```bash
omniroute --mcp
```

Or via the open-sse transport:

```bash
# HTTP streamable transport (port 20130)
omniroute --dev  # MCP auto-starts on /mcp endpoint
```

## IDE Configuration

See [MCP Client Configuration](SETUP_GUIDE.md#mcp-client-configuration) for Claude Desktop,
Cursor, Cline, and compatible MCP client setup.

---

## Essential Tools (8)

| Tool                            | Description                              |
| :------------------------------ | :--------------------------------------- |
| `omniroute_get_health`          | Gateway health, circuit breakers, uptime |
| `omniroute_list_combos`         | All configured combos with models        |
| `omniroute_get_combo_metrics`   | Performance metrics for a specific combo |
| `omniroute_switch_combo`        | Switch active combo by ID/name           |
| `omniroute_check_quota`         | Quota status per provider or all         |
| `omniroute_route_request`       | Send a chat completion through OmniRoute |
| `omniroute_cost_report`         | Cost analytics for a time period         |
| `omniroute_list_models_catalog` | Full model catalog with capabilities     |

## Advanced Tools (8)

| Tool                               | Description                                                 |
| :--------------------------------- | :---------------------------------------------------------- |
| `omniroute_simulate_route`         | Dry-run routing simulation with fallback tree               |
| `omniroute_set_budget_guard`       | Session budget with degrade/block/alert actions             |
| `omniroute_set_resilience_profile` | Apply conservative/balanced/aggressive preset               |
| `omniroute_test_combo`             | Live-test all models in a combo via a real upstream request |
| `omniroute_get_provider_metrics`   | Detailed metrics for one provider                           |
| `omniroute_best_combo_for_task`    | Task-fitness recommendation with alternatives               |
| `omniroute_explain_route`          | Explain a past routing decision                             |
| `omniroute_get_session_snapshot`   | Full session state: costs, tokens, errors                   |

## Cache Tools (2)

| Tool                    | Description                                         |
| :---------------------- | :-------------------------------------------------- |
| `omniroute_cache_stats` | Semantic cache, prompt-cache, and idempotency stats |
| `omniroute_cache_flush` | Flush cache globally or by signature/model          |

## Compression Tools (5)

| Tool                                | Description                                                    |
| :---------------------------------- | :------------------------------------------------------------- |
| `omniroute_compression_status`      | Compression settings, analytics summary, and cache-aware stats |
| `omniroute_compression_configure`   | Configure compression mode, threshold, and runtime options     |
| `omniroute_set_compression_engine`  | Set Caveman, RTK, or stacked compression mode and pipeline     |
| `omniroute_list_compression_combos` | List named compression combos and routing assignments          |
| `omniroute_compression_combo_stats` | Analytics grouped by compression combo and engine              |

`omniroute_compression_status` reports MCP description compression separately under
`analytics.mcpDescriptionCompression`. Those values are metadata-size estimates for MCP listable
descriptions (`tools`, `prompts`, `resources`, and `resourceTemplates`); they are not provider usage
receipts and are marked with `source: "mcp_metadata_estimate"`.

See [Compression Engines](COMPRESSION_ENGINES.md) and [RTK Compression](RTK_COMPRESSION.md) for
the runtime compression model behind these tools.

## Other Tool Groups

The remaining MCP surface includes 1proxy tools, memory tools, and skill tools. The live source of
truth is `open-sse/mcp-server/tools/` and `open-sse/mcp-server/schemas/tools.ts`.

## Authentication

MCP tools are authenticated via API key scopes. Each tool requires specific scopes:

| Scope                 | Tools                                                                |
| :-------------------- | :------------------------------------------------------------------- |
| `read:health`         | get_health, get_provider_metrics                                     |
| `read:combos`         | list_combos, get_combo_metrics                                       |
| `write:combos`        | switch_combo                                                         |
| `read:quota`          | check_quota                                                          |
| `write:route`         | route_request, simulate_route, test_combo                            |
| `read:usage`          | cost_report, get_session_snapshot, explain_route                     |
| `write:config`        | set_budget_guard, set_resilience_profile                             |
| `read:models`         | list_models_catalog, best_combo_for_task                             |
| `read:cache`          | cache_stats                                                          |
| `write:cache`         | cache_flush                                                          |
| `read:compression`    | compression_status, list_compression_combos, compression_combo_stats |
| `write:compression`   | compression_configure, set_compression_engine                        |
| `execute:completions` | route_request, test_combo                                            |

## Audit Logging

Every tool call is logged to `mcp_tool_audit` with:

- Tool name, arguments, result
- Duration (ms), success/failure
- API key hash, timestamp

## Files

| File                                         | Purpose                                           |
| :------------------------------------------- | :------------------------------------------------ |
| `open-sse/mcp-server/server.ts`              | MCP server creation and scoped tool registrations |
| `open-sse/mcp-server/transport.ts`           | Stdio + HTTP transport                            |
| `open-sse/mcp-server/auth.ts`                | API key + scope validation                        |
| `open-sse/mcp-server/audit.ts`               | Tool call audit logging                           |
| `open-sse/mcp-server/tools/advancedTools.ts` | 8 advanced tool handlers                          |
