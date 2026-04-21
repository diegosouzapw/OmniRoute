# OmniRoute MCP Server Documentation

> Model Context Protocol server with 34 intelligent tools

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

See [IDE Configs](integrations/ide-configs.md) for Antigravity, Cursor, Copilot, and Claude Desktop setup.

---

## Essential Tools (22)

| Tool                               | Description                              |
| :--------------------------------- | :--------------------------------------- |
| `omniroute_get_health`             | Gateway health, circuit breakers, uptime |
| `omniroute_list_combos`            | All configured combos with models        |
| `omniroute_get_combo_metrics`      | Performance metrics for a specific combo |
| `omniroute_switch_combo`           | Switch active combo by ID/name           |
| `omniroute_check_quota`            | Quota status per provider or all         |
| `omniroute_route_request`          | Send a chat completion through OmniRoute |
| `omniroute_cost_report`            | Cost analytics for a time period         |
| `omniroute_web_search`             | Web search across 5+ providers           |
| `omniroute_simulate_route`         | Dry-run routing simulation               |
| `omniroute_set_budget_guard`       | Session budget with actions              |
| `omniroute_set_routing_strategy`   | Apply routing strategy                   |
| `omniroute_set_resilience_profile` | Apply resilience preset                  |
| `omniroute_test_combo`             | Live-test combo models                   |
| `omniroute_get_provider_metrics`   | Detailed metrics for one provider        |
| `omniroute_best_combo_for_task`    | Task-fitness recommendation              |
| `omniroute_explain_route`          | Explain a past routing decision          |
| `omniroute_get_session_snapshot`   | Full session state snapshot              |
| `omniroute_db_health_check`        | Database integrity check                 |
| `omniroute_sync_pricing`           | Sync model pricing from LiteLLM          |
| `omniroute_cache_stats`            | Cache statistics and hit rates           |
| `omniroute_cache_flush`            | Flush cache entries                      |

## Advanced Tools (5)

| Tool                 | Description                         |
| :------------------- | :---------------------------------- |
| `omniroute_health`   | Extended health diagnostics         |
| `omniroute_cost`     | Cost analysis and breakdown         |
| `omniroute_latency`  | Latency analysis per provider/model |
| `omniroute_quota`    | Quota usage and availability        |
| `omniroute_task_fit` | Task-model fitness scoring          |

## Memory Tools (3)

| Tool                      | Description                           |
| :------------------------ | :------------------------------------ |
| `omniroute_memory_search` | Search persistent conversation memory |
| `omniroute_memory_add`    | Add entries to persistent memory      |
| `omniroute_memory_clear`  | Clear memory entries                  |

## Skill Tools (4)

| Tool                          | Description                     |
| :---------------------------- | :------------------------------ |
| `omniroute_skills_list`       | List available skills           |
| `omniroute_skills_enable`     | Enable/disable skills           |
| `omniroute_skills_execute`    | Execute a skill with parameters |
| `omniroute_skills_executions` | List past skill executions      |

## Authentication

MCP tools are authenticated via API key scopes. Each tool requires specific scopes:

| Scope          | Tools                                            |
| :------------- | :----------------------------------------------- |
| `read:health`  | get_health, get_provider_metrics                 |
| `read:combos`  | list_combos, get_combo_metrics                   |
| `write:combos` | switch_combo                                     |
| `read:quota`   | check_quota                                      |
| `write:route`  | route_request, simulate_route, test_combo        |
| `read:usage`   | cost_report, get_session_snapshot, explain_route |
| `write:config` | set_budget_guard, set_resilience_profile         |
| `read:models`  | list_models_catalog, best_combo_for_task         |

## Audit Logging

Every tool call is logged to `mcp_tool_audit` with:

- Tool name, arguments, result
- Duration (ms), success/failure
- API key hash, timestamp

## Files

| File                                         | Purpose                                  |
| :------------------------------------------- | :--------------------------------------- |
| `open-sse/mcp-server/server.ts`              | MCP server creation + tool registrations |
| `open-sse/mcp-server/transport.ts`           | Stdio + HTTP transport                   |
| `open-sse/mcp-server/auth.ts`                | API key + scope validation               |
| `open-sse/mcp-server/audit.ts`               | Tool call audit logging                  |
| `open-sse/mcp-server/tools/advancedTools.ts` | 5 advanced tool handlers                 |
| `open-sse/mcp-server/tools/memoryTools.ts`   | 3 memory tool handlers                   |
| `open-sse/mcp-server/tools/skillTools.ts`    | 4 skill tool handlers                    |
