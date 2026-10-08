# OmniRoute MCP Server Documentation (中文 (简体))

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/MCP-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/MCP-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/MCP-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/MCP-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/MCP-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/MCP-SERVER.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/MCP-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/MCP-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/MCP-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/MCP-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/MCP-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/MCP-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/MCP-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/MCP-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/MCP-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/MCP-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/MCP-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/MCP-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/MCP-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/MCP-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/MCP-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/MCP-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/MCP-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/MCP-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/MCP-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/MCP-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/MCP-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/MCP-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/MCP-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/MCP-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/MCP-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/MCP-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/MCP-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/MCP-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/MCP-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/MCP-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/MCP-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/MCP-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/MCP-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/MCP-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/MCP-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/MCP-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/MCP-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/MCP-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/MCP-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/MCP-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/MCP-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/MCP-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/MCP-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/MCP-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/MCP-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/MCP-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/MCP-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/MCP-SERVER.md)

---

> Model Context Protocol 服务器提供 **110 个唯一工具**，涵盖路由、缓存、压缩、记忆、技能、代理、池、Radar 和上下文源操作。
>
> 事实来源：`open-sse/mcp-server/server.ts` 使用 `countUniqueMcpTools()` 计算出 **110 个唯一工具**：45 个规范定义（包括六个 CCR 生命周期工具、agent-skills 三件套、`omniroute_radar_catalog` 和 `omniroute_x_search`），另加记忆（3）、技能（4）、GitHub 技能（3）、池（6）、游戏化（8）、插件（8）、Notion（6）、Obsidian（22）、本地语料库（3），以及两个仅限 RTK 的压缩工具。

## 安装

OmniRoute MCP 已内置。使用以下命令启动：

```bash
omniroute --mcp
```

或者通过 open-sse 传输方式启动：

```bash
# HTTP 流式传输（端口 20130）
omniroute --dev  # MCP 会在 /mcp 端点上自动启动
```

HTTP 传输方式（`sse` / `streamable-http`，由仪表板服务器在进程内提供）默认关闭，以前只能通过 `/dashboard/mcp` 页面切换。从 v3.8.51 开始，CLI 也提供同等功能：

```bash
omniroute mcp status                                  # 启用/在线状态、传输方式、工具数量
omniroute mcp enable [--transport stdio|sse|streamable-http]
omniroute mcp disable
omniroute mcp restart                                 # 重置活动的 sse/streamable-http 会话
```

`mcp enable`/`mcp disable` 会对仪表板通过 `/api/settings` 切换的同一项 `mcpEnabled` 设置（以及可选的 `mcpTransport`）执行 PATCH。`mcp restart` 会调用 `POST /api/mcp/restart`：它会终止活动的 `sse`/`streamable-http` 会话，使下一个请求能够干净地重新初始化；如果 MCP 已禁用，则返回 `409`；对于 `stdio` 传输方式，则返回 `501`（stdio 客户端拥有自己的子进程——不存在可供重启的进程内句柄）。

## 传输方式

MCP 服务器提供三种传输方式，它们均由同一个 `createMcpServer()` 工厂提供支持：

| 传输方式          | 位置                                              | 适用场景                                      |
| :---------------- | :------------------------------------------------ | :-------------------------------------------- |
| `stdio`           | `open-sse/mcp-server/server.ts`                   | IDE 集成（Claude Desktop、Cursor 等）         |
| `sse`             | 通过 `httpTransport` 使用 `POST/GET /api/mcp/sse` | 需要事件流的浏览器/代理客户端                 |
| `streamable-http` | `POST/GET/DELETE /api/mcp/stream`                 | 多会话 HTTP 客户端（`mcp-session-id` 请求头） |

活动的 HTTP 传输方式（`sse` 或 `streamable-http`）由 `mcpTransport` 设置选择。切换传输方式会关闭另一种传输方式上的现有会话。

### 远程访问（manage 作用域绕过）

`/api/mcp/*` 位于 LOCAL_ONLY 层级（`src/server/authz/routeGuard.ts`）——默认情况下，只有回环主机（`localhost`、`127.0.0.1`、`::1`）可以访问它。从 v3.8.2 开始，非回环客户端可以在提供 `Authorization: Bearer <api-key>` 且该密钥具有 `manage` 作用域时连接。这是通过隧道、反向代理或公共主机名访问远程 MCP 服务器的唯一方式。

```bash
# 授予 manage 作用域：打开仪表板的 API Keys 页面并为该密钥启用
# "Management Access"，或者在创建时通过 POST 提交 scopes:["manage"]。

# 然后从远程 MCP 客户端连接：
curl -i \
  -H "Host: your-public-host.example" \
  -H "Authorization: Bearer sk-…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-03-26","capabilities":{},"clientInfo":{"name":"my-client","version":"0"}}}' \
  https://your-public-host.example/api/mcp/stream
```

不具有 `manage` 作用域的密钥（或未提供 Bearer）会收到 `403 LOCAL_ONLY`。同级前缀 `/api/cli-tools/runtime/*` 被有意设计为不可绕过——请参阅[路由防护层级 — manage 作用域例外](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out)。

## IDE 配置

有关 Claude Desktop、Cursor、Cline 及兼容 MCP 客户端的设置，请参阅 [MCP 客户端配置](../guides/SETUP_GUIDE.md#mcp-client-configuration)。

---

## 必备工具 (14) — 阶段 1

| 工具                            | 作用域                | 描述                                                                                       |
| :------------------------------ | :-------------------- | :----------------------------------------------------------------------------------------- |
| `omniroute_get_health`          | `read:health`         | 运行时间、内存、熔断器、速率限制、缓存统计信息                                             |
| `omniroute_list_combos`         | `read:combos`         | 所有已配置的组合及其策略（可选指标）                                                       |
| `omniroute_get_combo_metrics`   | `read:combos`         | 特定组合的性能指标                                                                         |
| `omniroute_switch_combo`        | `write:combos`        | 激活或停用组合                                                                             |
| `omniroute_create_combo`        | `write:combos`        | 通过现有组合 API 创建经过验证的组合                                                        |
| `omniroute_check_quota`         | `read:quota`          | 已用/总配额、剩余百分比、重置时间、令牌健康状况                                            |
| `omniroute_route_request`       | `execute:completions` | 通过 OmniRoute 路由发送聊天补全请求                                                        |
| `omniroute_cost_report`         | `read:usage`          | 按周期（会话/天/周/月）生成成本报告                                                        |
| `omniroute_list_models_catalog` | `read:models`         | 完整的模型目录，包含功能、状态和定价                                                       |
| `omniroute_radar_catalog`       | `read:radar`          | 本地签名的 Radar 目录；支持可选的提供者/系列筛选条件                                       |
| `omniroute_tool_search`         | `read:tools`          | 从已注册的 MCP 目录中发现工具                                                              |
| `omniroute_web_search`          | `execute:search`      | 通过已配置的搜索提供者进行网页搜索。不包括 X/Twitter。                                     |
| `omniroute_x_search`            | `execute:search`      | 通过 xAI/SuperGrok 搜索 X，或选择 `xquik-search` 获取 Xquik API 结果。需要所选后端的凭据。 |
| `omniroute_web_fetch`           | `execute:search`      | 通过已配置的抓取提供者获取网页内容                                                         |

## 高级工具 (11) — 阶段 2

| 工具                               | 作用域                               | 描述                                                              |
| :--------------------------------- | :----------------------------------- | :---------------------------------------------------------------- |
| `omniroute_simulate_route`         | `read:health`, `read:combos`         | 使用回退树进行路由试运行模拟                                      |
| `omniroute_set_budget_guard`       | `write:budget`                       | 设置具有降级/阻止/警报操作的会话预算保护                          |
| `omniroute_set_routing_strategy`   | `write:combos`                       | 在运行时更新组合策略（优先级/加权/自动等）                        |
| `omniroute_set_resilience_profile` | `write:resilience`                   | 应用 `aggressive` / `balanced` / `conservative` 弹性预设          |
| `omniroute_test_combo`             | `execute:completions`, `read:combos` | 使用真实上游调用对组合中的每个提供者进行实时测试                  |
| `omniroute_get_provider_metrics`   | `read:health`                        | 各提供者的指标，包括 p50/p95/p99 延迟和断路器状态                 |
| `omniroute_best_combo_for_task`    | `read:combos`, `read:health`         | 根据任务类型推荐组合，并考虑预算/延迟约束                         |
| `omniroute_explain_route`          | `read:health`, `read:usage`          | 解释请求为何被路由到某个提供者（评分因素 + 回退）                 |
| `omniroute_get_session_snapshot`   | `read:usage`                         | 完整会话快照：成本、令牌、热门模型/提供者、错误、预算保护         |
| `omniroute_db_health_check`        | `read:health`, `write:resilience`    | 诊断（并可选择自动修复）数据库漂移问题，例如损坏的组合引用/孤立行 |
| `omniroute_sync_pricing`           | `pricing:write`                      | 从外部来源 (LiteLLM) 同步定价数据；支持 `dryRun`                  |

## 缓存工具 (2)

| 工具                    | 作用域        | 描述                                 |
| :---------------------- | :------------ | :----------------------------------- |
| `omniroute_cache_stats` | `read:cache`  | 语义缓存、提示词缓存和幂等性统计信息 |
| `omniroute_cache_flush` | `write:cache` | 全局刷新缓存，或按签名/模型刷新      |

## 压缩工具 (13)

| 工具                                | 作用域              | 描述                                                                                      |
| :---------------------------------- | :------------------ | :---------------------------------------------------------------------------------------- |
| `omniroute_compression_status`      | `read:compression`  | 压缩设置、分析摘要和缓存感知统计信息（包括 `analytics.mcpDescriptionCompression` 元数据） |
| `omniroute_compression_configure`   | `write:compression` | 配置压缩模式、阈值、目标比率、系统提示词保留和 MCP 描述压缩开关                           |
| `omniroute_set_compression_engine`  | `write:compression` | 选择活动引擎 (off/caveman/rtk/stacked) 以及 Caveman/RTK 强度                              |
| `omniroute_list_compression_combos` | `read:compression`  | 列出命名的压缩组合及其引擎管线                                                            |
| `omniroute_compression_combo_stats` | `read:compression`  | 按压缩组合和引擎分组的分析数据                                                            |
| `omniroute_ccr_store`               | `write:compression` | 将调用方隔离的内容存储在有界的内存 CCR 存储中，并返回标记和 `ccr://` 引用                 |
| `omniroute_ccr_retrieve`            | `read:compression`  | 完整检索 CCR 内容，或使用头部、尾部、行、grep 和统计模式进行检索                          |
| `omniroute_ccr_inspect`             | `read:compression`  | 检查调用方拥有的 CCR 元数据，但不返回内容                                                 |
| `omniroute_ccr_list`                | `read:compression`  | 分页列出调用方拥有的 CCR 块元数据                                                         |
| `omniroute_ccr_delete`              | `write:compression` | 删除调用方拥有的 CCR 块                                                                   |
| `omniroute_ccr_stats`               | `read:compression`  | 报告调用方范围内的内存使用情况、生命周期计数器和存储限制                                  |
| `omniroute_rtk_discover`            | `read:compression`  | 在选择加入的 RTK 输出样本中发现重复出现的噪声                                             |
| `omniroute_rtk_learn`               | `read:compression`  | 根据选择加入的样本生成可供审查的 RTK 过滤器草案                                           |

CCR 条目仅存于内存中，并会在重启后消失。每个块限制为 2 MiB，每个
主体限制为 16 MiB，全局存储限制为 64 MiB。条目的默认 TTL 为 24 小时（最长
七天）。完整的 MCP 检索限制为 256 KiB；更大的块仍可通过
范围和 grep 模式访问。存储、检索、列出、检查、删除和统计操作均按
已认证的 API 密钥主体隔离。审计记录仅包含哈希值和大小元数据，绝不包含内容。

`omniroute_compression_status` 在 `analytics.mcpDescriptionCompression` 下单独报告 MCP 描述压缩情况。这些值是针对 MCP 可列出描述（`tools`、`prompts`、`resources` 和 `resourceTemplates`）的元数据大小估算，并非提供者用量回执，且标记为 `source: "mcp_metadata_estimate"`。

### MCP 无障碍树过滤器 (v3.8.0)

除上述压缩工具外，OmniRoute 还包含一个执行后过滤器，用于在将 MCP 浏览器/无障碍工具的**工具结果**返回给代理之前对其进行压缩。此过滤器本身并非工具，而是以透明方式处理任何包含冗长无障碍树或浏览器快照文本（≥2000 个字符）的工具结果。

主要行为：

- 将连续 ≥30 行重复的同级内容折叠为首部 + 尾部摘要
- 保留 Playwright/computer-use 所需的 `[ref=eXX]` 锚点
- 对超大文本（>50,000 个字符）进行硬截断，并附带导航提示
- 预期节省：浏览器快照负载可减少 **60–80%**

配置：全局设置中的 `compression.mcpAccessibility`（迁移 056）。
实现：`open-sse/services/compression/engines/mcpAccessibility/`。
完整文档：[压缩引擎 — MCP 无障碍树过滤器](../compression/COMPRESSION_ENGINES.md#mcp-accessibility-tree-filter)。

有关这些工具背后的运行时压缩模型，请参阅[压缩引擎](../compression/COMPRESSION_ENGINES.md)和 [RTK 压缩](../compression/RTK_COMPRESSION.md)。

## 1Proxy 工具 (3)

| 工具                        | 作用域         | 描述                                                            |
| :-------------------------- | :------------- | :-------------------------------------------------------------- |
| `omniroute_oneproxy_fetch`  | `read:proxies` | 从 1proxy 市场获取免费代理（支持协议/国家/质量/数量限制筛选）   |
| `omniroute_oneproxy_rotate` | `read:proxies` | 按策略（`random` / `quality` / `sequential`）获取下一个可用代理 |
| `omniroute_oneproxy_stats`  | `read:proxies` | 代理池统计信息、同步状态，以及按协议和国家划分的分布情况        |

## 记忆工具 (3)

定义于 `open-sse/mcp-server/tools/memoryTools.ts`。身份验证/作用域通过标准 MCP 作用域管道执行。

| 工具                      | 作用域         | 描述                                                                   |
| :------------------------ | :------------- | :--------------------------------------------------------------------- |
| `omniroute_memory_search` | `read:memory`  | 按查询/类型/API 密钥搜索记忆，并强制执行令牌预算限制                   |
| `omniroute_memory_add`    | `write:memory` | 添加新的记忆条目（`factual` / `episodic` / `procedural` / `semantic`） |
| `omniroute_memory_clear`  | `write:memory` | 清除某个 API 密钥的记忆，可选择按类型或 `olderThan` 时间戳筛选         |

## 技能工具 (4)

定义于 `open-sse/mcp-server/tools/skillTools.ts`。由 `src/lib/skills/registry` + `src/lib/skills/executor` 提供支持。

| 工具                          | 作用域           | 描述                                                    |
| :---------------------------- | :--------------- | :------------------------------------------------------ |
| `omniroute_skills_list`       | `read:skills`    | 列出已注册的技能，可选择按 API 密钥、名称或启用状态筛选 |
| `omniroute_skills_enable`     | `write:skills`   | 按 ID 启用或禁用特定技能                                |
| `omniroute_skills_execute`    | `execute:skills` | 使用提供的输入执行技能，并返回执行记录                  |
| `omniroute_skills_executions` | `read:skills`    | 列出最近的技能执行历史                                  |

## Notion 上下文源 (6)

定义于 `open-sse/mcp-server/tools/notionTools.ts`。令牌通过 `src/lib/db/notion.ts` 存储在 `key_value` 表中。REST 客户端位于 `src/lib/notion/api.ts`。设置 API 位于 `src/app/api/settings/notion/route.ts`。仪表板 UI 位于 `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx`。

可从端点仪表板的 **上下文源** 选项卡配置 Notion 集成令牌，也可通过 REST API 配置：

```bash
# 设置令牌
curl -X POST http://localhost:20128/api/settings/notion \
  -H "Content-Type: application/json" \
  -d '{"token": "ntn_..."}'

# 检查状态
curl http://localhost:20128/api/settings/notion

# 断开连接
curl -X DELETE http://localhost:20128/api/settings/notion
```

| 工具                         | 作用域         | 描述                                    |
| :--------------------------- | :------------- | :-------------------------------------- |
| `notion_search`              | `read:notion`  | 在所有页面和数据库中执行全文搜索        |
| `notion_get_page`            | `read:notion`  | 按 ID 获取页面及其属性                  |
| `notion_list_block_children` | `read:notion`  | 列出页面或块的子块                      |
| `notion_query_database`      | `read:notion`  | 使用筛选条件、排序和分页查询数据库      |
| `notion_get_database`        | `read:notion`  | 按 ID 获取数据库架构                    |
| `notion_append_blocks`       | `write:notion` | 将子块追加到父块（每个请求最多 100 个） |

## Agent Skill 目录工具 (3)

定义于 `open-sse/mcp-server/tools/agentSkillTools.ts`。由 `src/lib/agentSkills/catalog` 提供支持。这些工具向 MCP 客户端和外部代理公开包含 45 个条目的 Agent Skills 文档目录。作用域：`read:catalog`。

| 工具                              | 作用域         | 描述                                                                                                        |
| :-------------------------------- | :------------- | :---------------------------------------------------------------------------------------------------------- |
| `omniroute_agent_skills_list`     | `read:catalog` | 列出全部 45 项代理技能，可选使用 `category` (api\|cli) 和 `area` 过滤器；返回元数据和覆盖情况               |
| `omniroute_agent_skills_get`      | `read:catalog` | 根据规范 `id` 获取单项技能的完整元数据和 SKILL.md 内容                                                      |
| `omniroute_agent_skills_coverage` | `read:catalog` | 覆盖统计：在 23 项 API、21 项 CLI 和 1 项配置技能中，文件系统中拥有 SKILL.md 文件的技能数量与目录总数的对比 |

有关完整目录以及外部代理如何使用它，请参阅 [AGENT-SKILLS.md](./AGENT-SKILLS.md)。

## 相关框架 (v3.8.0)

上述 MCP 工具清单（110 个唯一工具，由 `countUniqueMcpTools()` 计算得出）有意限定于运行时路由/缓存/压缩/内存/技能/代理/上下文源操作。v3.8.0 中还有两个与 MCP 服务器一同发布的相邻框架，它们有单独的文档：

### 云端代理

云端代理是进程外 AI 编码代理（codex-cloud、cursor-cloud、devin、jules），通过与 LLM 提供者相同的连接模型接入 OmniRoute。它们通过各自的 REST 接口 (`/api/v1/agents/*`) 公开，**不**属于 MCP 工具目录的一部分
— 调用云端代理不会消耗 MCP 作用域。

- 实现：`src/lib/cloudAgent/` (`registry.ts`, `agents/codex.ts`, `agents/cursor.ts`, `agents/devin.ts`, `agents/jules.ts`)。
- 生命周期：`createTask`, `getStatus`, `approvePlan`, `sendMessage`, `listSources`。
- 文档：[docs/frameworks/CLOUD_AGENT.md](./CLOUD_AGENT.md)。

### 防护规则

防护规则是在聊天管道内应用的执行前/后过滤器（vision-bridge、pii-masker、prompt-injection）。它们在到达 MCP 工具/路由层之前运行，并向审计管道发出结构化违规信息；它们不作为 MCP 工具调用。

- 实现：`src/lib/guardrails/`。
- 文档：[docs/security/GUARDRAILS.md](../security/GUARDRAILS.md)。

调试看似被阻止的 MCP 调用时，请同时检查 MCP 审计日志
（`scope_denied:*` 条目）和防护规则审计跟踪 — 请求可能在到达 MCP 作用域强制执行层**之前**就已被防护规则拒绝。

---

## REST API 端点

| 端点                   | 方法                  | 描述                                                                                             | 身份验证            |
| :--------------------- | :-------------------- | :----------------------------------------------------------------------------------------------- | :------------------ |
| `/api/mcp/status`      | `GET`                 | 服务器状态：心跳、HTTP 传输状态、审计活动摘要                                                    | 管理（会话/管理员） |
| `/api/mcp/tools`       | `GET`                 | 工具目录（名称、描述、作用域、阶段、源端点）                                                     | 管理                |
| `/api/mcp/sse`         | `GET` / `POST`        | SSE 传输端点（受 `mcpEnabled` + `mcpTransport === "sse"` 控制）                                  | API 密钥 + 作用域   |
| `/api/mcp/stream`      | `POST`/`GET`/`DELETE` | 可流式传输的 HTTP 传输方式（使用 `mcp-session-id` 请求头；`DELETE` 结束会话）                    | API 密钥 + 作用域   |
| `/api/mcp/audit`       | `GET`                 | 来自 `mcp_tool_audit` 的审计日志条目（过滤器：`limit`, `offset`, `tool`, `success`, `apiKeyId`） | 管理                |
| `/api/mcp/audit/stats` | `GET`                 | 聚合审计统计信息（`totalCalls`, `successRate`, `avgDurationMs`、热门工具）                       | 管理                |

源文件：`src/app/api/mcp/{status,tools,sse,stream,audit,audit/stats}/route.ts`。

在“设置”中启用 MCP 服务器 (`mcpEnabled`) 并选择适当的 `mcpTransport` 之前，SSE 和可流式传输的 HTTP 传输方式都会被阻止。如果配置了错误的传输方式，路由将返回 HTTP 400，并提示切换设置。

---

## 身份验证与作用域 (Scopes)

MCP 工具调用从调用方读取作用域字符串。该检查是三个独立命名空间之一。通过一个检查器的验证并不代表通过其他检查器的验证。规则见 [三个作用域命名空间](#three-scope-namespaces)。工具目录见 [MCP 工具作用域](#mcp-tool-scopes)。

### 三个作用域命名空间

API 密钥上的 `manage`、MCP 工具上的 `read:compression` 以及 `oma_live_…` 访问令牌上的 `read` 是三种不同的授权。向变更管理路由发送 `read` 访问令牌的调用方将收到 HTTP 403 `Access token scope 'read' is insufficient; 'write' required.`。该等级由 `scopeSatisfies` 判定。它不参考 MCP 表，MCP 匹配器也不参考它。

| 命名空间       | 凭据                                                        | 检查器             | 通过后允许的操作               |
| :------------- | :---------------------------------------------------------- | :----------------- | :----------------------------- |
| API 密钥管理   | `api_keys.scopes`                                           | `hasManageScope`   | 该 Bearer 密钥的管理 REST      |
| API 密钥附加项 | 同一数组，一个精确字符串                                    | 下文命名的辅助函数 | 仅限该项功能                   |
| MCP 工具作用域 | 同一数组，否则为 MCP `_meta`，否则为 `OMNIROUTE_MCP_SCOPES` | `scopeMatches`     | 该工具（一旦启用强制执行）     |
| 访问令牌       | `oma_live_…`                                                | `scopeSatisfies`   | 方法和路径要求该等级的管理路由 |

每种凭据的铸造在 [管理身份验证](../guides/MANAGEMENT-AUTH.md) 中有详细说明。

#### API 密钥作用域

一个 `api_keys.scopes` 数组服务于两项任务。它们使用不同的函数。

**管理 REST。** `manage` 和 `admin` 是 `MANAGEMENT_API_KEY_SCOPES` (`src/shared/constants/managementScopes.ts`) 的成员。`hasManageScope` 用于授权该密钥的管理路由。`admin` 在这些路由上具有管理能力。此处的 `admin` 单词并非访问令牌等级，也不会扩展为 MCP 工具作用域。

**附加字符串。** 每一个都是精确的成员资格测试，且每一个都保持在 `MANAGEMENT_API_KEY_SCOPES` 之外。

| 作用域                         | 通过后允许的操作                                                                                                                                        |
| :----------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `mcp:connect`                  | 仅限非回环 `/api/mcp/` LOCAL_ONLY 例外情况 (`hasMcpConnectOrManageScope`)。带有 `manage` 或 `admin` 的密钥仍能通过该例外检查。                          |
| `self:usage`                   | 该密钥的 `GET /api/v1/me/status` (`src/app/api/v1/me/status/route.ts`)。`POST /api/keys` 在创建时添加此作用域 (`normalizeSelfServiceScopesForCreate`)。 |
| `self:account-quota`           | 该状态负载中的上游账户配额 (`src/lib/usage/apiKeySelfService.ts`)。状态路由仍需要 `self:usage`。                                                        |
| `policy:bypass-provider-quota` | 该密钥的推理调用跳过提供者配额策略 (`src/sse/handlers/chat.ts` 中的 `hasProviderQuotaBypassScope`)。                                                    |

#### 匹配

目录是 [MCP 工具作用域](#mcp-tool-scopes) 下的表格。不要将 `src/shared/constants/mcpScopes.ts` 中的 `MCP_SCOPE_LIST` 视为该目录：它是原始的类型化子集。后来的工具在其之外声明了更多作用域（`read:notion`、`read:skills`、`read:local-corpus` 以及表格中的其余部分）。

`open-sse/mcp-server/scopeEnforcement.ts` 中的 `evaluateToolScopes` 在每个所需作用域都匹配某个已授予作用域时允许调用：

- `*` 匹配每个所需作用域。
- 以 `*` 结尾的已授予作用域匹配以星号前缀开头的所需作用域。`read:*` 匹配 `read:compression`。
- 所有其他已授予作用域仅匹配完全相同的所需字符串。

作用域为 `["manage"]` 的密钥在 `read:compression` 的 `scopeMatches` 检查中会失败。当仅授予 `admin`、`mcp:connect`、`read` 和 `write` 字符串时，同样的调用也会失败。除了结尾的 `*` 之外，MCP 工具作用域之间没有层级关系。

除非 `OMNIROUTE_MCP_ENFORCE_SCOPES=true`（默认为 `false`），否则强制执行处于关闭状态。关闭时，`evaluateToolScopes` 允许调用并跳过目录。开启时，HTTP 使用 Bearer 密钥的 `api_keys.scopes` 作为 `authInfo`（参见 [按密钥 HTTP 作用域绑定](#per-key-http-scope-binding-7895)）。当没有密钥作用域解析时，授予集将回退到 MCP `_meta`，然后是 `OMNIROUTE_MCP_SCOPES`。

#### 访问令牌作用域

`oma_live_…` 令牌 (`src/lib/accessTokens/scopes.ts`) 携带 `read`、`write` 或 `admin`。`scopeSatisfies` 是一个等级：`admin` 涵盖 `write` 和 `read`，而 `write` 涵盖 `read`。未知作用域不涵盖任何内容。

`evaluateAccessTokenAuth` (`src/server/authz/accessTokenAuth.ts`) 将该等级与 `inferRequiredScope` (`src/server/authz/accessScopes.ts`) 进行比较：

- `GET`、`HEAD` 和 `OPTIONS` 需要 `read`。
- 所有其他方法都需要 `write`。
- `ADMIN_SCOPE_PREFIXES` 中的路径对所有方法都需要 `admin`。`/api/mcp` 在该列表中，因此 `write` 访问令牌仍然无法调用 MCP HTTP 接口。
- `ADMIN_MUTATION_PREFIXES` 中的路径仅在变更 (mutations) 时需要 `admin`。

`PATCH /api/keys/{id}` 是一个修改操作，并且不在那些管理员列表中，因此一个 `read` 令牌会收到 403 错误
`Access token scope 'read' is insufficient; 'write' required.`
一个 `write` 或 `admin` 访问令牌满足该路由的要求。仪表盘 JWT、loopback CLI 机器 ID 令牌以及具有 `manage` 或 `admin` 权限的 API 密钥会走其他分支，并且不受此等级的限制。

一个通过了 `/api/mcp` 的 `scopeSatisfies` 检查的访问令牌仅通过了管理关卡。工具调用仍然会针对 API 密钥范围运行 `scopeMatches`。访问令牌等级不是 `scopeMatches` 的输入。

### MCP 工具范围

范围强制执行集中在 `open-sse/mcp-server/scopeEnforcement.ts` 中。
每个工具都需要特定的范围：

| 范围                 | 工具                                                                                                                                                                         |
| :------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `读取:健康状况`      | `get_health`, `get_provider_metrics`, `simulate_route`, `explain_route`, `best_combo_for_task`, `db_health_check`                                                            |
| `读取:组合`          | `list_combos`, `get_combo_metrics`, `simulate_route`, `best_combo_for_task`, `test_combo`                                                                                    |
| `写入:组合`          | `switch_combo`, `set_routing_strategy`                                                                                                                                       |
| `读取:配额`          | `check_quota`                                                                                                                                                                |
| `读取:用量`          | `cost_report`, `get_session_snapshot`, `explain_route`                                                                                                                       |
| `读取:模型`          | `list_models_catalog`                                                                                                                                                        |
| `执行:补全`          | `route_request`, `test_combo`                                                                                                                                                |
| `执行:搜索`          | `web_search`, `x_search`, `web_fetch`                                                                                                                                        |
| `写入:预算`          | `set_budget_guard`                                                                                                                                                           |
| `写入:弹性`          | `set_resilience_profile`, `db_health_check`                                                                                                                                  |
| `定价:写入`          | `sync_pricing`                                                                                                                                                               |
| `读取:缓存`          | `cache_stats`                                                                                                                                                                |
| `写入:缓存`          | `cache_flush`                                                                                                                                                                |
| `读取:压缩`          | `compression_status`, `list_compression_combos`, `compression_combo_stats`                                                                                                   |
| `写入:压缩`          | `compression_configure`, `set_compression_engine`                                                                                                                            |
| `读取:代理`          | `oneproxy_fetch`, `oneproxy_rotate`, `oneproxy_stats`                                                                                                                        |
| `读取:Notion`        | `notion_search`, `notion_get_page`, `notion_list_block_children`, `notion_query_database`, `notion_get_database`                                                             |
| `写入:Notion`        | `notion_append_blocks`                                                                                                                                                       |
| `读取:内存`          | `memory_search`                                                                                                                                                              |
| `写入:内存`          | `memory_add`, `memory_clear`                                                                                                                                                 |
| `读取:技能`          | `skills_list`, `skills_executions`                                                                                                                                           |
| `写入:技能`          | `skills_enable`                                                                                                                                                              |
| `执行:技能`          | `skills_execute`                                                                                                                                                             |
| `读取:目录`          | `agent_skills_list`, `agent_skills_get`, `agent_skills_coverage`                                                                                                             |
| `读取:工具`          | `omniroute_tool_search`                                                                                                                                                      |
| `读取:雷达`          | `omniroute_radar_catalog`                                                                                                                                                    |
| `读取:游戏化`        | `gamification_profile`, `gamification_rank`, `gamification_leaderboard`, `gamification_badges`, `gamification_servers`, `gamification_anomalies`                             |
| `write:gamification` | `gamification_invite`, `gamification_transfer`                                                                                                                               |
| `read:plugins`       | `plugin_list`, `plugin_executions`                                                                                                                                           |
| `write:plugins`      | `plugin_scan`, `plugin_install`, `plugin_uninstall`, `plugin_activate`, `plugin_deactivate`, `plugin_configure`                                                              |
| `read:obsidian`      | 13 个读取工具 — `obsidian_list_vault`, `obsidian_read_note`, `obsidian_search_simple`, `obsidian_search_structured`, `obsidian_get_periodic_note`, `obsidian_sync_status`, … |
| `write:obsidian`     | 9 个写入工具 — `obsidian_write_note`, `obsidian_append_note`, `obsidian_patch_note`, `obsidian_move_note`, `obsidian_delete_note`, `obsidian_sync_trigger`, …                |
| `read:local-corpus`  | `local_corpus_search`, `local_corpus_read`, `local_corpus_status`                                                                                                            |

支持通配符范围：`read:*` 授予所有读取范围，`*` 授予完全访问权限。

### `mcp:connect` — 窄路由能力 (#7895)

从非环回地址访问 HTTP/SSE MCP 传输 (`/api/mcp/*`) 需要 `/api/mcp/` LOCAL_ONLY 豁免（参见 `docs/security/ROUTE_GUARD_TIERS.md`）。历史上，该豁免只接受完整的 `manage`/`admin` 范围 API 密钥——对于只需要与 MCP 通信的调用者来说，这太宽泛了。`src/shared/constants/managementScopes.ts` 现在导出了 `MCP_CONNECT_SCOPE = "mcp:connect"`：这是一个附加的、窄范围（与 `SELF_USAGE_SCOPE` 具有相同的先例），它**只**授权 `src/server/authz/policies/management.ts` 中的 `/api/mcp/` 绕过——它不授予任何其他管理路由访问权限，并且被有意地排除在 `MANAGEMENT_API_KEY_SCOPES` 之外。持有 `manage`/`admin` 的密钥仍然可以不变地通过豁免；`mcp:connect` 是远程仅 MCP 调用者的低权限替代方案，通过 `hasMcpConnectOrManageScope()` 进行检查。

### 每密钥 HTTP 范围绑定 (#7895)

通过 HTTP/SSE，`open-sse/mcp-server/httpTransport.ts` 现在通过 `resolveMcpCallerAuthInfo()` (`open-sse/mcp-server/httpAuthContext.ts`) 解析调用者的真实 `api_keys.scopes`，并将其传递给 MCP SDK 的 `transport.handleRequest(req, { authInfo })`，因此到达每个工具调用的 `extra.authInfo.scopes` 反映了 Bearer 密钥自身的范围。`scopeEnforcement.ts` 的 `resolveCallerScopeContext()` 已经优先考虑 `authInfo` 而非 `_meta` 和 `OMNIROUTE_MCP_SCOPES` 环境变量回退——这只是填充了第一个、最高优先级的来源，该来源以前在 HTTP 上未被提供。当没有 API 密钥解析（无头，无效密钥）时，`authInfo` 保持 `undefined`，并且解析会回退到现有的 `meta`/env 链，保持不变。这并**不**改变 `OMNIROUTE_MCP_ENFORCE_SCOPES` 的默认值——强制执行仍然必须明确启用；此更改只使得一旦启用，每密钥路径将优先。stdio 没有每调用者身份（参见 `mcpCallerIdentity.ts`），因此不受影响——它仍然依赖于 `_meta`/env 回退链。

---

## 环境变量

| 变量                                    | 默认值                        | 用途                                                                             |
| :-------------------------------------- | :---------------------------- | :------------------------------------------------------------------------------- |
| `OMNIROUTE_BASE_URL`                    | `http://localhost:20128`      | MCP 服务器调用 OmniRoute 内部 API 时使用的基础 URL                               |
| `OMNIROUTE_API_KEY`                     | （空）                        | 作为 `Authorization: Bearer` 转发到内部 API 调用的 API 密钥                      |
| `OMNIROUTE_MCP_ENFORCE_SCOPES`          | `false`（仅 `"true"` 会启用） | 启用后，缺少作用域将拒绝工具调用，并在审计日志中记录 `scope_denied:<reason>`     |
| `OMNIROUTE_MCP_SCOPES`                  | （空）                        | 以逗号分隔的作用域允许列表，默认视为“可用”（当调用方未提供自己的作用域时使用）   |
| `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS`   | （未设置 = 开启）             | 设置为 `0/false/off/no` 时，禁用注册期间的 MCP 描述压缩                          |
| `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION` | （未设置 = 开启）             | 上述开关的替代别名                                                               |
| `OMNIROUTE_MCP_FETCH_TIMEOUT_MS`        | `10000`                       | 内部管理读取（健康状态、弹性、组合、配额、用量）的中止超时                       |
| `OMNIROUTE_MCP_UPSTREAM_TIMEOUT_MS`     | `60000`                       | 等待提供者响应的请求跳转（`route_request`、`web_search`、`web_fetch`）的中止超时 |
| `MCP_TOOL_DENY`                         | （未设置 = 不筛选）           | 要从 `tools/list` 中移除的工具名称，以逗号分隔（减少工具基数——见下文）           |
| `MCP_TOOL_ALLOW`                        | （未设置 = 不筛选）           | 要专门保留的工具名称，以逗号分隔（允许列表模式——见下文）                         |
| `DATA_DIR`                              | `~/.omniroute`                | 心跳文件写入 `${DATA_DIR}/runtime/mcp-heartbeat.json`                            |

---

## 描述压缩

MCP 工具、提示词和资源注册表可以在注册/列出时压缩描述，以减少向客户端公开的元数据量（从而降低提示词上下文成本）。相关实现在 `open-sse/mcp-server/descriptionCompressor.ts` 中，并通过 `createMcpServer()` 内的 `compressMcpRegistryMetadata` 接入 MCP 服务器。

- 压缩使用 Caveman 规则集（`getRulesForContext("all", "full")`）处理描述文本，并提取保留块（代码范围、围栏代码块等），确保结构化内容不被修改。
- 可通过 `key_value` 设置表中的 `compression.mcpDescriptionCompressionEnabled` 值按部署切换（默认：启用）——在 UI 中显示为 **分析 → MCP 描述压缩**。
- 可通过 `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS=false` 或 `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION=false` 在整个进程范围内切换。
- 实时统计信息通过 `omniroute_compression_status` 中的 `analytics.mcpDescriptionCompression` 提供，并标记为 `source: "mcp_metadata_estimate"`，以便与实际的提供者用量回执区分。

---

## 工具基数缩减 (F4.3)

描述压缩会缩减每个工具的元数据；**工具基数缩减**则更进一步，减少实际公布的工具_数量_。在 `tools/list` 清单中公布更少的工具，可以降低客户端模型为工具目录支付的每次请求 token 成本（“第 5 层”压缩）。其实现是 `open-sse/mcp-server/toolCardinality.ts` 中的纯无状态过滤器 (`reduceToolManifest`)，并接入了 `createMcpServer()` (`open-sse/mcp-server/server.ts`) 中的注册循环。

**需选择启用，默认关闭。** 只有在两个环境变量中至少设置一个时，过滤器才会运行；如果两者均未设置，则会原样公布全部 110 个工具。

| 变量             | 模式                                                                    |
| :--------------- | :---------------------------------------------------------------------- |
| `MCP_TOOL_DENY`  | 黑名单 — 以逗号分隔的工具名称，这些工具始终会从 `tools/list` 中移除     |
| `MCP_TOOL_ALLOW` | 允许列表 — 以逗号分隔的工具名称；仅保留这些工具，其他所有工具都会被移除 |

`deny` 的优先级高于 `allow`。名称以逗号分隔，首尾空白会被去除，空条目会被忽略。示例：

```bash
# 从目录中移除两个工具
MCP_TOOL_DENY="omniroute_get_health,omniroute_list_combos" omniroute --mcp

# 仅公布路由和配额工具（允许列表模式）
MCP_TOOL_ALLOW="omniroute_route_request,omniroute_check_quota" omniroute --mcp
```

**过滤后的工具如何移除：**注册始终会成功；随后，对于配置拒绝的工具，会在 MCP SDK 句柄上调用 `.disable()`，因此它永远不会出现在 `tools/list` 中，但连接配置仍保持完整（可干净地启用/禁用，无需重新注册）。配置解析器为 `readMcpToolProfileFromEnv(process.env)`；当两个变量均为空时，它会返回 `null`（不过滤）。

`reduceToolManifest` 背后更丰富的 `ToolProfile` 结构还支持作用域交集过滤（`allowScopes`，支持 `read:*` 风格的通配符匹配）和确定性的 `maxTools` 上限，但这两个配置项需要在注册时获取完整清单，并且目前**未**通过环境变量公开（添加 `tools/list` 级钩子是一个已跟踪的后续事项）。可以使用 `estimateManifestTokens()` 比较缩减前后的清单 token 成本。

---

## 运行时心跳

stdio 传输每 5 秒将活跃度持久化到 `${DATA_DIR}/runtime/mcp-heartbeat.json`。仪表板 (`/api/mcp/status`) 读取此文件以及 PID 活跃度以推断 `online` 状态。HTTP 传输则从进程内的 `getMcpHttpStatus()` 报告状态（不写入文件）。

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
  "toolCount": 110
}
```

---

## 审计日志

每次工具调用都会由 `open-sse/mcp-server/audit.ts` 记录到 SQLite 的 `mcp_tool_audit` 表中：

- 工具名称、参数（根据各工具的 `auditLevel` 进行哈希处理/截断）、结果
- 持续时间（毫秒）、成功/失败标志、错误消息（如适用）
- API 密钥哈希、时间戳
- 作用域拒绝会记录为 `scope_denied:<reason>`，并附带缺失的作用域列表

使用仪表板或 `/api/mcp/audit` 和 `/api/mcp/audit/stats` REST 端点检查近期调用。

---

## 文件

| 文件                                                                     | 用途                                            |
| :----------------------------------------------------------------------- | :---------------------------------------------- |
| `open-sse/mcp-server/server.ts`                                          | MCP 服务器工厂、stdio 入口点、作用域工具注册    |
| `open-sse/mcp-server/httpTransport.ts`                                   | SSE + Streamable HTTP 传输（会话管理）          |
| `open-sse/mcp-server/scopeEnforcement.ts`                                | 工具作用域评估和调用方解析                      |
| `open-sse/mcp-server/audit.ts`                                           | 工具调用审计日志（`mcp_tool_audit`）            |
| `open-sse/mcp-server/runtimeHeartbeat.ts`                                | stdio 心跳写入器（`mcp-heartbeat.json`）        |
| `open-sse/mcp-server/descriptionCompressor.ts`                           | 工具 / 提示词 / 资源注册表的描述压缩            |
| `open-sse/mcp-server/schemas/tools.ts`                                   | Zod 模式 + 工具注册表（`MCP_TOOLS`，45 个条目） |
| `open-sse/mcp-server/tools/advancedTools.ts`                             | 第 2 阶段 + 缓存 + 1proxy 工具处理程序          |
| `open-sse/mcp-server/tools/compressionTools.ts`                          | 压缩工具处理程序                                |
| `open-sse/mcp-server/tools/memoryTools.ts`                               | 记忆工具定义（3 个工具）                        |
| `open-sse/mcp-server/tools/skillTools.ts`                                | 技能工具定义（4 个工具）                        |
| `open-sse/mcp-server/tools/notionTools.ts`                               | Notion 上下文源工具定义（6 个工具）             |
| `open-sse/mcp-server/tools/gamificationTools.ts`                         | 游戏化工具定义（8 个工具）                      |
| `open-sse/mcp-server/tools/pluginTools.ts`                               | 插件注册和管理工具（8 个工具）                  |
| `src/app/api/mcp/status/route.ts`                                        | `/api/mcp/status` 端点                          |
| `src/app/api/mcp/tools/route.ts`                                         | `/api/mcp/tools` 端点                           |
| `src/app/api/mcp/sse/route.ts`                                           | `/api/mcp/sse` SSE 传输路由                     |
| `src/app/api/mcp/stream/route.ts`                                        | `/api/mcp/stream` Streamable HTTP 传输路由      |
| `src/app/api/mcp/audit/route.ts`                                         | `/api/mcp/audit` 审计日志查询                   |
| `src/app/api/mcp/audit/stats/route.ts`                                   | `/api/mcp/audit/stats` 聚合审计指标             |
| `src/lib/notion/api.ts`                                                  | Notion REST API 客户端（重试、超时、错误分类）  |
| `src/lib/db/notion.ts`                                                   | Notion 令牌持久化（`key_value` 表）             |
| `src/app/api/settings/notion/route.ts`                                   | Notion 设置 API（GET/POST/DELETE）              |
| `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx` | Notion 令牌管理界面                             |
| `tests/unit/notion-api.test.ts`                                          | Notion API 客户端测试（7 项）                   |
| `tests/unit/notion-tools.test.ts`                                        | Notion 工具作用域执行测试（10 项）              |
| `tests/unit/db/notion.test.mjs`                                          | Notion 数据库模块测试（3 项）                   |
