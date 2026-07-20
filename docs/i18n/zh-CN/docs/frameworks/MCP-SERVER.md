---
title: "OmniRoute MCP Server Documentation"
version: 3.8.40
lastUpdated: 2026-06-28
---

# OmniRoute MCP 服务器文档

> 包含 94 个工具的 MCP 服务器，覆盖路由、缓存、压缩、记忆、技能、代理、连接池和上下文源操作。
>
> 数据来源：`open-sse/mcp-server/schemas/tools.ts`（34 个基础工具）+ `memoryTools.ts`（3）+ `skillTools.ts`（4）+ `agentSkillTools.ts`（3）+ `poolTools.ts`（6）+ `gamificationTools.ts`（8）+ `pluginTools.ts`（8）+ `notionTools.ts`（6）+ `obsidianTools.ts`（22）= **94**（`TOTAL_MCP_TOOL_COUNT`）。工具注册和权限域绑定逻辑见 `open-sse/mcp-server/server.ts`。

![MCP tool inventory (104 tools by category)](../diagrams/exported/mcp-tools-104.svg)

> 来源：[diagrams/mcp-tools-104.mmd](../diagrams/mcp-tools-104.mmd)（通过 `npm run docs:render-diagrams` 重新生成）。

## 安装

OmniRoute MCP 内置。启动方式：

```bash
omniroute --mcp
```

或通过 open-sse 传输：

```bash
# HTTP streamable 传输（端口 20130）
omniroute --dev  # MCP 自动在 /mcp 端点启动
```

## 传输

MCP 服务器提供三种传输方式，均基于同一个 `createMcpServer()` 工厂：

| 传输               | 位置                                         | 适用场景                                              |
| :----------------- | :------------------------------------------- | :---------------------------------------------------- |
| `stdio`            | `open-sse/mcp-server/server.ts`              | IDE 集成（Claude Desktop、Cursor 等）                 |
| `sse`              | `POST/GET /api/mcp/sse`，通过 `httpTransport` | 需要事件流的浏览器/代理客户端                         |
| `streamable-http`  | `POST/GET/DELETE /api/mcp/stream`            | 多会话 HTTP 客户端（`mcp-session-id` 头）             |

当前生效的 HTTP 传输（`sse` 或 `streamable-http`）由 `mcpTransport` 设置选择。切换传输方式会关闭另一传输上的现有会话。

### 远程访问（manage 权限域绕过）

`/api/mcp/*` 位于 LOCAL_ONLY 层级（`src/server/authz/routeGuard.ts`）——默认只有 loopback 主机（`localhost`、`127.0.0.1`、`::1`）可以访问。自 v3.8.2 起，非 loopback 客户端如果提供携带 `manage` 权限域的 `Authorization: Bearer <api-key>`，即可连接。这是通过隧道、反向代理或公网主机名访问远程 MCP 服务器的唯一方式。

```bash
# 授予 manage 权限域：打开仪表盘 API Keys 页面，为该 Key 开启
# "Management Access" 开关，或在创建时 POST scopes:["manage"]。

# 然后从远程 MCP 客户端连接：
curl -i \
  -H "Host: your-public-host.example" \
  -H "Authorization: Bearer sk-…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-03-26","capabilities":{},"clientInfo":{"name":"my-client","version":"0"}}}' \
  https://your-public-host.example/api/mcp/stream
```

非 manage 的 Key（或缺少 Bearer）返回 `403 LOCAL_ONLY`。同级前缀 `/api/cli-tools/runtime/*` 禁止被绕过——详见[路由守卫层级 — manage 权限域豁免](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out)。

## IDE 配置

Claude Desktop、Cursor、Cline 及其他兼容 MCP 客户端的配置，参见 [MCP 客户端配置](../guides/SETUP_GUIDE.md#mcp-client-configuration)。

---

## 核心工具（8）— 阶段 1

| 工具                              | 权限域                  | 描述                                                         |
| :-------------------------------- | :---------------------- | :----------------------------------------------------------- |
| `omniroute_get_health`            | `read:health`           | 运行时间、内存、熔断器、速率限制、缓存统计                   |
| `omniroute_list_combos`           | `read:combos`           | 所有已配置 Combo 及其策略（可选指标）                        |
| `omniroute_get_combo_metrics`     | `read:combos`           | 指定 Combo 的性能指标                                        |
| `omniroute_switch_combo`          | `write:combos`          | 激活或停用 Combo                                             |
| `omniroute_check_quota`           | `read:quota`            | 已用/总配额、剩余百分比、重置时间、Token 健康状态            |
| `omniroute_route_request`         | `execute:completions`   | 通过 OmniRoute 路由发送聊天补全请求                          |
| `omniroute_cost_report`           | `read:usage`            | 按时间段（会话/天/周/月）的费用报告                          |
| `omniroute_list_models_catalog`   | `read:models`           | 完整模型目录，包含能力、状态、定价                           |

## 阶段 1 — 搜索

| 工具                   | 权限域             | 描述                                                                                  |
| :--------------------- | :----------------- | :------------------------------------------------------------------------------------ |
| `omniroute_web_search` | `execute:search`   | 通过 OmniRoute 搜索网关进行 Web 搜索（Serper/Brave/Perplexity/Exa/Tavily/Google PSE/Linkup/SearchAPI/SearXNG），支持容灾 |

## 高级工具（11）— 阶段 2

| 工具                                 | 权限域                                 | 描述                                                                 |
| :----------------------------------- | :------------------------------------- | :------------------------------------------------------------------- |
| `omniroute_simulate_route`           | `read:health`、`read:combos`           | 包含容灾树的演习路由仿真                                             |
| `omniroute_set_budget_guard`         | `write:budget`                         | 会话预算，支持降级/阻断/告警动作                                     |
| `omniroute_set_routing_strategy`     | `write:combos`                         | 在运行时更新 Combo 策略（priority/weighted/auto 等）                 |
| `omniroute_set_resilience_profile`   | `write:resilience`                     | 应用 `aggressive` / `balanced` / `conservative` 容灾预设文件         |
| `omniroute_test_combo`               | `execute:completions`、`read:combos`   | 使用真实上游调用对 Combo 中的每个服务商进行实时测试                  |
| `omniroute_get_provider_metrics`     | `read:health`                          | 每个服务商的指标，含 p50/p95/p99 延迟和熔断器状态                    |
| `omniroute_best_combo_for_task`      | `read:combos`、`read:health`           | 根据任务类型推荐 Combo，含预算/延迟约束                             |
| `omniroute_explain_route`            | `read:health`、`read:usage`            | 解释某次请求的路由决策依据（评分因子 + 容灾路径）                   |
| `omniroute_get_session_snapshot`     | `read:usage`                           | 完整会话快照：费用、Token、热门模型/服务商、错误、预算守卫           |
| `omniroute_db_health_check`          | `read:health`、`write:resilience`      | 诊断（并可自动修复）数据库异常，如损坏的 Combo 引用/孤儿行          |
| `omniroute_sync_pricing`             | `pricing:write`                        | 从外部源（LiteLLM）同步定价数据；支持 `dryRun`                      |

## 缓存工具（2）

| 工具                      | 权限域          | 描述                                     |
| :------------------------ | :-------------- | :--------------------------------------- |
| `omniroute_cache_stats`   | `read:cache`    | 语义缓存、提示缓存和幂等性统计           |
| `omniroute_cache_flush`   | `write:cache`   | 全局或按签名/模型刷新缓存                |

## 压缩工具（5）

| 工具                                  | 权限域                | 描述                                                                                                       |
| :------------------------------------ | :-------------------- | :--------------------------------------------------------------------------------------------------------- |
| `omniroute_compression_status`        | `read:compression`    | 压缩设置、分析摘要和缓存感知统计（含 `analytics.mcpDescriptionCompression` 元数据）                         |
| `omniroute_compression_configure`     | `write:compression`   | 配置压缩模式、阈值、目标比例、系统提示保留、MCP 描述压缩开关                                               |
| `omniroute_set_compression_engine`    | `write:compression`   | 选择活跃引擎（off/caveman/rtk/stacked）及 Caveman/RTK 强度                                                 |
| `omniroute_list_compression_combos`   | `read:compression`    | 列出已命名的压缩 Combo 及其引擎流水线                                                                      |
| `omniroute_compression_combo_stats`   | `read:compression`    | 按压缩 Combo 和引擎分组的分析数据                                                                          |

`omniroute_compression_status` 将 MCP 描述压缩数据单独报告在 `analytics.mcpDescriptionCompression` 下。这些值是 MCP 可列表描述（`tools`、`prompts`、`resources` 和 `resourceTemplates`）的元数据大小估算；不是服务商用量记录，标记为 `source: "mcp_metadata_estimate"`。

### MCP 无障碍树过滤器（v3.8.0）

除了上述 5 个压缩工具，OmniRoute 还包含一个执行后过滤器，在 MCP 浏览器/无障碍工具的**工具结果**返回给代理之前对其进行压缩。此过滤器本身不是工具——它对任何包含冗长的无障碍树或浏览器快照文本（≥2000 字符）的工具结果透明运行。

关键行为：

- 将 ≥30 个连续重复的同类行折叠为头部 + 尾部摘要
- 保留 Playwright/计算机操作所需的 `[ref=eXX]` 锚点
- 对超大文本（>50,000 字符）进行硬截断，附导航提示
- 预期节省：浏览器快照载荷 **60–80%**

配置：全局设置中的 `compression.mcpAccessibility`（迁移 056）。
实现：`open-sse/services/compression/engines/mcpAccessibility/`。
完整文档：[压缩引擎 — MCP 无障碍树过滤器](../compression/COMPRESSION_ENGINES.md#mcp-accessibility-tree-filter)。

这些工具背后的运行时压缩模型参见[压缩引擎](../compression/COMPRESSION_ENGINES.md)和 [RTK 压缩](../compression/RTK_COMPRESSION.md)。

## 1Proxy 工具（3）

| 工具                          | 权限域           | 描述                                                                               |
| :---------------------------- | :--------------- | :--------------------------------------------------------------------------------- |
| `omniroute_oneproxy_fetch`    | `read:proxies`   | 从 1proxy 市场获取免费代理（支持协议/国家/质量/数量筛选）                          |
| `omniroute_oneproxy_rotate`   | `read:proxies`   | 按策略获取下一个可用代理（`random` / `quality` / `sequential`）                    |
| `omniroute_oneproxy_stats`    | `read:proxies`   | 连接池统计、同步状态、按协议和国家分布                                             |

## 记忆工具（3）

定义在 `open-sse/mcp-server/tools/memoryTools.ts`。认证/权限域通过标准 MCP 权限域管线强制执行。

| 工具                        | 权限域           | 描述                                                                       |
| :-------------------------- | :--------------- | :------------------------------------------------------------------------- |
| `omniroute_memory_search`   | `read:memory`    | 按查询/类型/API Key 搜索记忆，强制 Token 预算                              |
| `omniroute_memory_add`      | `write:memory`   | 添加新的记忆条目（`factual` / `episodic` / `procedural` / `semantic`）     |
| `omniroute_memory_clear`    | `write:memory`   | 清除某 API Key 的记忆，可选按类型或 `olderThan` 时间戳过滤                 |

## 技能工具（4）

定义在 `open-sse/mcp-server/tools/skillTools.ts`。由 `src/lib/skills/registry` + `src/lib/skills/executor` 支撑。

| 工具                            | 权限域             | 描述                                                                     |
| :------------------------------ | :----------------- | :----------------------------------------------------------------------- |
| `omniroute_skills_list`         | `read:skills`      | 列出已注册的技能，支持按 API Key、名称或启用状态过滤                     |
| `omniroute_skills_enable`       | `write:skills`     | 按 ID 启用或禁用某个技能                                                |
| `omniroute_skills_execute`      | `execute:skills`   | 以给定输入执行技能，返回执行记录                                         |
| `omniroute_skills_executions`   | `read:skills`      | 列出近期的技能执行历史                                                   |

## Notion 上下文源（6）

定义在 `open-sse/mcp-server/tools/notionTools.ts`。Token 通过 `src/lib/db/notion.ts` 存储在 `key_value` 表。REST 客户端见 `src/lib/notion/api.ts`。设置 API 见 `src/app/api/settings/notion/route.ts`。仪表盘界面见 `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx`。

从端点仪表盘的**上下文源**标签页配置 Notion 集成 Token，或通过 REST API：

```bash
# 设置 Token
curl -X POST http://localhost:20128/api/settings/notion \
  -H "Content-Type: application/json" \
  -d '{"token": "ntn_..."}'

# 检查状态
curl http://localhost:20128/api/settings/notion

# 断开连接
curl -X DELETE http://localhost:20128/api/settings/notion
```

| 工具                           | 权限域           | 描述                                                 |
| :----------------------------- | :--------------- | :--------------------------------------------------- |
| `notion_search`                | `read:notion`    | 跨所有页面和数据库的全文搜索                         |
| `notion_get_page`              | `read:notion`    | 按 ID 获取页面及其属性                               |
| `notion_list_block_children`   | `read:notion`    | 列出页面或块的子块                                   |
| `notion_query_database`        | `read:notion`    | 查询数据库，支持筛选、排序和分页                     |
| `notion_get_database`          | `read:notion`    | 按 ID 获取数据库 Schema                              |
| `notion_append_blocks`         | `write:notion`   | 向父块追加子块（每次请求最多 100 个）                |

## 代理技能目录工具（3）

定义在 `open-sse/mcp-server/tools/agentSkillTools.ts`。由 `src/lib/agentSkills/catalog` 支撑。这些工具将 42 条目代理技能文档目录暴露给 MCP 客户端和外部代理。权限域：`read:catalog`。

| 工具                                | 权限域           | 描述                                                                                                      |
| :---------------------------------- | :--------------- | :-------------------------------------------------------------------------------------------------------- |
| `omniroute_agent_skills_list`       | `read:catalog`   | 列出全部 42 个代理技能，支持可选的 `category`（api\|cli）和 `area` 过滤；返回元数据 + 覆盖情况             |
| `omniroute_agent_skills_get`        | `read:catalog`   | 按规范 `id` 获取单个技能的完整元数据 + SKILL.md 内容                                                      |
| `omniroute_agent_skills_coverage`   | `read:catalog`   | 覆盖统计：22 个 API 技能和 20 个 CLI 技能中，哪些在文件系统上有 SKILL.md 文件 vs 目录总计                 |

完整目录及外部代理如何消费，参见 [AGENT-SKILLS.md](./AGENT-SKILLS.md)。

## 关联框架（v3.8.0）

上述 MCP 工具清单（94 个工具 = 34 核心 + 3 记忆 + 4 技能 + 3 代理技能 + 6 连接池 + 8 游戏化 + 8 插件 + 6 Notion + 22 Obsidian）有意限定于运行时路由/缓存/压缩/记忆/技能/代理/上下文源操作。两个相邻框架随 MCP 服务器在 v3.8.0 中一同发布，并有独立的文档：

### 云代理

云代理是外部 AI 编程代理（codex-cloud、devin、jules），通过与大语言模型服务商相同的连接模型接入 OmniRoute。它们通过自己的 REST 接口（`/api/v1/agents/*`）暴露，**不**属于 MCP 工具目录——调用云代理不消耗 MCP 权限域。

- 实现：`src/lib/cloudAgent/`（`registry.ts`、`agents/codex-cloud.ts`、`agents/devin.ts`、`agents/jules.ts`）。
- 生命周期：`createTask`、`getStatus`、`approvePlan`、`sendMessage`、`listSources`。
- 文档：[docs/frameworks/CLOUD_AGENT.md](./CLOUD_AGENT.md)。

### 安全护栏

安全护栏是前置/后置执行过滤器（vision-bridge、pii-masker、prompt-injection），在聊天管线内部生效。它们在请求到达 MCP 工具/路由层之前运行，并向审计管线输出结构化的违规记录；它们不作为 MCP 工具调用。

- 实现：`src/lib/guardrails/`。
- 文档：[docs/security/GUARDRAILS.md](../security/GUARDRAILS.md)。

调试被阻的 MCP 调用时，检查 MCP 审计日志（`scope_denied:*` 条目）和安全护栏审计追踪——请求可能在到达 MCP 权限域执行层**之前**就被安全护栏拒绝了。

---

## REST API 端点

| 端点                     | 方法                  | 描述                                                                                                  | 认证                       |
| :----------------------- | :-------------------- | :---------------------------------------------------------------------------------------------------- | :------------------------- |
| `/api/mcp/status`        | `GET`                 | 服务器状态：心跳、HTTP 传输状态、审计活动摘要                                                         | 管理（session/admin）      |
| `/api/mcp/tools`         | `GET`                 | 工具目录（名称、描述、权限域、阶段、源端点）                                                           | 管理                       |
| `/api/mcp/sse`           | `GET` / `POST`        | SSE 传输端点（由 `mcpEnabled` + `mcpTransport === "sse"` 控制）                                        | API Key + 权限域           |
| `/api/mcp/stream`        | `POST`/`GET`/`DELETE` | Streamable HTTP 传输（使用 `mcp-session-id` 头；`DELETE` 结束会话）                                    | API Key + 权限域           |
| `/api/mcp/audit`         | `GET`                 | 来自 `mcp_tool_audit` 的审计日志条目（过滤参数：`limit`、`offset`、`tool`、`success`、`apiKeyId`）      | 管理                       |
| `/api/mcp/audit/stats`   | `GET`                 | 聚合审计统计（`totalCalls`、`successRate`、`avgDurationMs`、top 工具）                                 | 管理                       |

源文件：`src/app/api/mcp/{status,tools,sse,stream,audit,audit/stats}/route.ts`。

SSE 和 Streamable HTTP 两种传输均在设置中启用 MCP 服务器（`mcpEnabled`）并选择了适当的 `mcpTransport` 后才会放行。如果配置了错误的传输，路由返回 HTTP 400 并提示切换设置。

---

## 认证与权限域

MCP 工具通过 API Key 权限域进行认证。权限域执行集中在 `open-sse/mcp-server/scopeEnforcement.ts`。每个工具需要特定的权限域：

| 权限域                  | 工具                                                                                                                |
| :---------------------- | :------------------------------------------------------------------------------------------------------------------ |
| `read:health`           | `get_health`、`get_provider_metrics`、`simulate_route`、`explain_route`、`best_combo_for_task`、`db_health_check`    |
| `read:combos`           | `list_combos`、`get_combo_metrics`、`simulate_route`、`best_combo_for_task`、`test_combo`                            |
| `write:combos`          | `switch_combo`、`set_routing_strategy`                                                                              |
| `read:quota`            | `check_quota`                                                                                                       |
| `read:usage`            | `cost_report`、`get_session_snapshot`、`explain_route`                                                              |
| `read:models`           | `list_models_catalog`                                                                                               |
| `execute:completions`   | `route_request`、`test_combo`                                                                                       |
| `execute:search`        | `web_search`                                                                                                        |
| `write:budget`          | `set_budget_guard`                                                                                                  |
| `write:resilience`      | `set_resilience_profile`、`db_health_check`                                                                         |
| `pricing:write`         | `sync_pricing`                                                                                                      |
| `read:cache`            | `cache_stats`                                                                                                       |
| `write:cache`           | `cache_flush`                                                                                                       |
| `read:compression`      | `compression_status`、`list_compression_combos`、`compression_combo_stats`                                          |
| `write:compression`     | `compression_configure`、`set_compression_engine`                                                                   |
| `read:proxies`          | `oneproxy_fetch`、`oneproxy_rotate`、`oneproxy_stats`                                                               |
| `read:notion`           | `notion_search`、`notion_list_databases`、`notion_get_database`、`notion_query_database`、`notion_read`              |
| `write:notion`          | `notion_append_blocks`                                                                                              |
| `read:memory`           | `memory_search`                                                                                                     |
| `write:memory`          | `memory_add`、`memory_clear`                                                                                        |
| `read:skills`           | `skills_list`、`skills_executions`                                                                                  |
| `write:skills`          | `skills_enable`                                                                                                     |
| `execute:skills`        | `skills_execute`                                                                                                    |
| `read:catalog`          | `agent_skills_list`、`agent_skills_get`、`agent_skills_coverage`                                                    |

支持通配符权限域：`read:*` 授予全部读权限域，`*` 授予完整访问。

---

## 环境变量

| 变量                                      | 默认值                              | 用途                                                                                                                       |
| :---------------------------------------- | :---------------------------------- | :------------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_BASE_URL`                      | `http://localhost:20128`            | MCP 服务器调用 OmniRoute 内部 API 时使用的基础 URL                                                                          |
| `OMNIROUTE_API_KEY`                       | （空）                              | 转发为 `Authorization: Bearer` 给内部 API 调用的 API Key                                                                     |
| `OMNIROUTE_MCP_ENFORCE_SCOPES`            | `false`（仅 `"true"` 启用）         | 启用后，缺少权限域时拒绝工具调用并在审计日志中记录 `scope_denied:<reason>`                                                  |
| `OMNIROUTE_MCP_SCOPES`                    | （空）                              | 逗号分隔的权限域白名单，视为默认"可用"（当调用方不提供自身权限域时使用）                                                   |
| `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS`     | （不设置 = 开启）                   | 设置为 `0/false/off/no` 时，禁用注册时的 MCP 描述压缩                                                                        |
| `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION`   | （不设置 = 开启）                   | 与上文相同开关的别名                                                                                                       |
| `MCP_TOOL_DENY`                           | （不设置 = 无过滤）                 | 逗号分隔的工具名称，从 `tools/list` 中移除（工具基数精简 — 见下文）                                                        |
| `MCP_TOOL_ALLOW`                          | （不设置 = 无过滤）                 | 逗号分隔的工具名称，仅保留这些工具（白名单模式 — 见下文）                                                                  |
| `DATA_DIR`                                | `~/.omniroute`                      | 心跳文件写入 `${DATA_DIR}/runtime/mcp-heartbeat.json`                                                                       |

---

## 描述压缩

MCP 工具、提示和资源注册表可以在注册/列表时压缩描述，以减少暴露给客户端的元数据体积（进而降低提示上下文成本）。实现位于 `open-sse/mcp-server/descriptionCompressor.ts`，在 `createMcpServer()` 中通过 `compressMcpRegistryMetadata` 接入 MCP 服务器。

- 压缩在描述文本上运行，使用 Caveman 规则集（`getRulesForContext("all", "full")`），并进行保留块提取（代码段、围栏块等），因此结构化内容不会被修改。
- 按部署级别通过 `key_value` 设置表中的 `compression.mcpDescriptionCompressionEnabled` 值切换开关（默认：启用）——在界面中暴露为 **Analytics → MCP description compression**。
- 按进程级别通过 `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS=false` 或 `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION=false` 切换。
- 实时统计通过 `omniroute_compression_status` 在 `analytics.mcpDescriptionCompression` 下呈现，标记为 `source: "mcp_metadata_estimate"` 以区别于实际服务商用量记录。

---

## 工具基数精简（F4.3）

描述压缩缩小了每个工具的元数据；**工具基数精简**更进一步，减少了_宣布_的工具数量。在 `tools/list` 清单中宣布更少的工具，可降低客户端模型为工具目录支付的每请求 Token 成本（"第 5 层"压缩）。实现为 `open-sse/mcp-server/toolCardinality.ts` 中的纯无状态过滤器（`reduceToolManifest`），接入 `createMcpServer()`（`open-sse/mcp-server/server.ts`）中的注册循环。

**需主动开启，默认关闭。** 仅当设置了两个环境变量中的至少一个时，过滤器才会运行；两者都不设置时，全部 94 个工具按原样宣布。

| 变量               | 模式                                                                              |
| :----------------- | :-------------------------------------------------------------------------------- |
| `MCP_TOOL_DENY`    | 黑名单 — 逗号分隔的工具名称，始终从 `tools/list` 中移除                           |
| `MCP_TOOL_ALLOW`   | 白名单 — 逗号分隔的工具名称；仅保留这些，其余全部移除                             |

`deny` 优先于 `allow`。名称以逗号分隔，去除首尾空格，空条目被忽略。示例：

```bash
# 从目录中移除两个工具
MCP_TOOL_DENY="omniroute_get_health,omniroute_list_combos" omniroute --mcp

# 仅宣布路由 + 配额工具（白名单模式）
MCP_TOOL_ALLOW="omniroute_route_request,omniroute_check_quota" omniroute --mcp
```

**已过滤工具的移除方式：** 注册始终成功；被配置淘汰的工具会在 MCP SDK 句柄上执行 `.disable()`，因此它不会出现在 `tools/list` 中，但连接保持完整（干净启用/禁用，无需重新注册）。配置解析器为 `readMcpToolProfileFromEnv(process.env)`，当两个变量均为空时返回 `null`（无过滤）。

`reduceToolManifest` 背后的更丰富 `ToolProfile` 结构也支持权限域交集过滤（`allowScopes`，含 `read:*` 风格的通配符匹配）和确定性 `maxTools` 上限，但这两个参数在注册时需要完整清单，目前**不**通过环境变量暴露（`tools/list` 级别的 hook 是后续跟进项）。`estimateManifestTokens()` 可用于比较精简前后的清单 Token 成本。

---

## 运行时心跳

stdio 传输每 5 秒将存活状态持久化到 `${DATA_DIR}/runtime/mcp-heartbeat.json`。仪表盘（`/api/mcp/status`）读取此文件加上 PID 存活来推导 `online`。HTTP 传输则通过进程内 `getMcpHttpStatus()` 报告状态（无需写入文件）。

心跳快照包含：

```json
{
  "pid": 12345,
  "startedAt": "2026-05-13T12:34:56.000Z",
  "lastHeartbeatAt": "2026-05-13T12:35:01.000Z",
  "version": "1.8.1",
  "transport": "stdio",
  "scopesEnforced": false,
  "allowedScopes": [],
  "toolCount": 43
}
```

---

## 审计日志

每次工具调用通过 `open-sse/mcp-server/audit.ts` 记录到 SQLite `mcp_tool_audit` 表：

- 工具名称、参数（根据每个工具的 `auditLevel` 进行哈希/截断）、结果
- 耗时（毫秒）、成功/失败标记、错误消息（如适用）
- API Key 哈希、时间戳
- 权限域拒绝记录为 `scope_denied:<reason>`，附带缺失的权限域列表

使用仪表盘或 `/api/mcp/audit` 和 `/api/mcp/audit/stats` REST 端点检查近期调用。

---

## 文件

| 文件                                                                       | 用途                                                             |
| :------------------------------------------------------------------------- | :--------------------------------------------------------------- |
| `open-sse/mcp-server/server.ts`                                            | MCP 服务器工厂、stdio 入口点、按权限域的工具注册                 |
| `open-sse/mcp-server/httpTransport.ts`                                     | SSE + Streamable HTTP 传输（会话管理）                            |
| `open-sse/mcp-server/scopeEnforcement.ts`                                  | 工具权限域评估和调用方解析                                       |
| `open-sse/mcp-server/audit.ts`                                             | 工具调用审计日志（`mcp_tool_audit`）                              |
| `open-sse/mcp-server/runtimeHeartbeat.ts`                                  | stdio 心跳写入器（`mcp-heartbeat.json`）                          |
| `open-sse/mcp-server/descriptionCompressor.ts`                             | 工具/提示/资源注册表的描述压缩                                   |
| `open-sse/mcp-server/schemas/tools.ts`                                     | Zod Schema + 工具注册表（`MCP_TOOLS`，34 条目）                   |
| `open-sse/mcp-server/tools/advancedTools.ts`                               | 阶段 2 + 缓存 + 1proxy 工具处理器                                |
| `open-sse/mcp-server/tools/compressionTools.ts`                            | 压缩工具处理器                                                   |
| `open-sse/mcp-server/tools/memoryTools.ts`                                 | 记忆工具定义（3 工具）                                            |
| `open-sse/mcp-server/tools/skillTools.ts`                                  | 技能工具定义（4 工具）                                            |
| `open-sse/mcp-server/tools/notionTools.ts`                                 | Notion 上下文源工具定义（6 工具）                                 |
| `open-sse/mcp-server/tools/gamificationTools.ts`                           | 游戏化工具定义（8 工具）                                          |
| `open-sse/mcp-server/tools/pluginTools.ts`                                 | 插件注册和管理工具（8 工具）                                      |
| `src/app/api/mcp/status/route.ts`                                          | `/api/mcp/status` 端点                                           |
| `src/app/api/mcp/tools/route.ts`                                           | `/api/mcp/tools` 端点                                            |
| `src/app/api/mcp/sse/route.ts`                                             | `/api/mcp/sse` SSE 传输路由                                      |
| `src/app/api/mcp/stream/route.ts`                                          | `/api/mcp/stream` Streamable HTTP 传输路由                       |
| `src/app/api/mcp/audit/route.ts`                                           | `/api/mcp/audit` 审计日志查询                                     |
| `src/app/api/mcp/audit/stats/route.ts`                                     | `/api/mcp/audit/stats` 聚合审计指标                               |
| `src/lib/notion/api.ts`                                                    | Notion REST API 客户端（重试、超时、错误分类）                    |
| `src/lib/db/notion.ts`                                                     | Notion Token 持久化（`key_value` 表）                             |
| `src/app/api/settings/notion/route.ts`                                     | Notion 设置 API（GET/POST/DELETE）                                |
| `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx`   | Notion Token 管理界面                                             |
| `tests/unit/notion-api.test.ts`                                            | Notion API 客户端测试（7）                                        |
| `tests/unit/notion-tools.test.ts`                                          | Notion 工具权限域执行测试（10）                                   |
| `tests/unit/db/notion.test.mjs`                                            | Notion 数据库模块测试（3）                                        |
