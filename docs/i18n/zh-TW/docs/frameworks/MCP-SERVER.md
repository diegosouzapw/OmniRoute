---
title: "OmniRoute MCP Server 文件"
version: 3.8.40
lastUpdated: 2026-06-28
---

# OmniRoute MCP Server 文件

> 模型上下文協定（Model Context Protocol）伺服器，提供 104 個工具，涵蓋路由、快取、壓縮、記憶、技能、代理、池與上下文來源操作。
>
> 真相來源：`open-sse/mcp-server/server.ts` 透過 `countUniqueMcpTools()` 計算出 **104 個唯一工具**：42 個標準定義（包括六個 CCR 生命週期工具與 agent-skills 三件組），加上記憶體（3 個）、技能（4 個）、GitHub 技能（3 個）、池（6 個）、遊戲化（8 個）、外掛（8 個）、Notion（6 個）、Obsidian（22 個）與兩個僅限 RTK 的壓縮工具。

## 安裝

OmniRoute MCP 為內建功能。透過以下指令啟動：

```bash
omniroute --mcp
```

或透過 open-sse 傳輸層：

```bash
# HTTP 可串流傳輸（連接埠 20130）
omniroute --dev  # MCP 會自動在 /mcp 端點啟動
```

## 傳輸層

MCP 伺服器提供三種傳輸層，皆由同一個 `createMcpServer()` 工廠函式驅動：

| 傳輸層             | 位置                                       | 使用時機                                          |
| :----------------- | :----------------------------------------- | :------------------------------------------------ |
| `stdio`            | `open-sse/mcp-server/server.ts`            | IDE 整合（Claude Desktop、Cursor 等）              |
| `sse`              | `POST/GET /api/mcp/sse` 經由 `httpTransport` | 需要事件串流的瀏覽器／代理客戶端                   |
| `streamable-http`  | `POST/GET/DELETE /api/mcp/stream`          | 多工作階段 HTTP 客戶端（`mcp-session-id` 標頭）    |

作用中的 HTTP 傳輸層（`sse` 或 `streamable-http`）由 `mcpTransport` 設定值選取。切換傳輸層會關閉另一傳輸層上的現有工作階段。

### 遠端存取（manage 範圍繞過）

`/api/mcp/*` 屬於 LOCAL_ONLY 層級（`src/server/authz/routeGuard.ts`）— 預設僅允許回環主機（`localhost`、`127.0.0.1`、`::1`）存取。自 v3.8.2 起，非回環客戶端若提供攜帶 `manage` 範圍的 `Authorization: Bearer <key>`，則可連線。這是透過隧道、反向代理或公開主機名稱到達遠端 MCP 伺服器的唯一方式。

```bash
# 授予 manage 範圍：開啟儀表板 API Keys 頁面，在該金鑰上切換
# 「管理存取」（Management Access），或在建立時 POST scopes:["manage"]

# 然後從遠端 MCP 客戶端連線：
curl -i \
  -H "Host: your-public-host.example" \
  -H "Authorization: Bearer <key>" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-03-26","capabilities":{},"clientInfo":{"name":"my-client","version":"0"}}}' \
  https://your-public-host.example/api/mcp/stream
```

沒有 manage 範圍的金鑰（或未提供 Bearer）會回傳 `403 LOCAL_ONLY`。兄弟前綴 `/api/cli-tools/runtime/*` 故意**不可繞過** — 請參閱[路由守衛層級 — Manage 範圍例外](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out)。

## IDE 設定

請參閱 [MCP 客戶端設定](../guides/SETUP_GUIDE.md#mcp-client-configuration) 了解 Claude Desktop、Cursor、Cline 及相容 MCP 客戶端的設定方式。

---

## 基礎工具（8 個）— 第一階段

| 工具                              | 範圍                   | 說明                                                              |
| :-------------------------------- | :--------------------- | :---------------------------------------------------------------- |
| `omniroute_get_health`            | `read:health`          | 運作時間、記憶體、斷路器、速率限制、快取統計                      |
| `omniroute_list_combos`           | `read:combos`          | 所有已設定的組合及策略（可選指標）                                |
| `omniroute_get_combo_metrics`     | `read:combos`          | 特定組合的效能指標                                                |
| `omniroute_switch_combo`          | `write:combos`         | 啟用或停用組合                                                    |
| `omniroute_check_quota`           | `read:quota`           | 已用配額／總配額、剩餘百分比、重置時間、代幣健康狀態              |
| `omniroute_route_request`         | `execute:completions`  | 透過 OmniRoute 路由發送聊天完成請求                               |
| `omniroute_cost_report`           | `read:usage`           | 按期間（工作階段／日／週／月）的成本報告                          |
| `omniroute_list_models_catalog`   | `read:models`          | 完整模型目錄，包含功能、狀態、定價                                |

## 第一階段 — 搜尋

| 工具                     | 範圍             | 說明                                                                                                                       |
| :----------------------- | :--------------- | :------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_web_search`   | `execute:search` | 透過 OmniRoute 搜尋閘道（Serper/Brave/Perplexity/Exa/Tavily/Google PSE/Linkup/SearchAPI/SearXNG）進行網路搜尋，支援容錯轉移 |

## 進階工具（11 個）— 第二階段

| 工具                                 | 範圍                                  | 說明                                                                                  |
| :----------------------------------- | :------------------------------------ | :------------------------------------------------------------------------------------ |
| `omniroute_simulate_route`           | `read:health`、`read:combos`          | 乾執行路由模擬，含備援樹                                                              |
| `omniroute_set_budget_guard`         | `write:budget`                        | 工作階段預算，可設為降級／封鎖／警示動作                                               |
| `omniroute_set_routing_strategy`     | `write:combos`                        | 於執行階段更新組合策略（優先／加權／自動等）                                          |
| `omniroute_set_resilience_profile`   | `write:resilience`                    | 套用 `aggressive`／`balanced`／`conservative` 復原能力預設                            |
| `omniroute_test_combo`               | `execute:completions`、`read:combos`  | 使用真實上游呼叫，對組合中的每個提供者進行即時測試                                    |
| `omniroute_get_provider_metrics`     | `read:health`                         | 各提供者指標，含 p50/p95/p99 延遲與斷路器狀態                                         |
| `omniroute_best_combo_for_task`      | `read:combos`、`read:health`          | 依任務類型推薦組合，考量預算與延遲限制                                                |
| `omniroute_explain_route`            | `read:health`、`read:usage`           | 解釋為何請求被路由至某提供者（評分因素＋備援）                                        |
| `omniroute_get_session_snapshot`     | `read:usage`                          | 完整工作階段快照：成本、代幣、熱門模型／提供者、錯誤、預算守衛                        |
| `omniroute_db_health_check`          | `read:health`、`write:resilience`     | 診斷（並可選自動修復）資料庫漂移，如中斷的組合參考／孤立資料列                        |
| `omniroute_sync_pricing`             | `pricing:write`                       | 從外部來源（LiteLLM）同步定價資料；支援 `dryRun`                                      |

## 快取工具（2 個）

| 工具                      | 範圍           | 說明                                              |
| :------------------------ | :------------- | :------------------------------------------------ |
| `omniroute_cache_stats`   | `read:cache`   | 語意快取、提示快取與冪等性統計                    |
| `omniroute_cache_flush`   | `write:cache`  | 全域或依簽章／模型清除快取                        |

## 壓縮工具（13 個）

| 工具                                  | 範圍                | 說明                                                                                                                       |
| :------------------------------------ | :------------------ | :------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_compression_status`        | `read:compression`  | 壓縮設定、分析摘要與快取感知統計（包含 `analytics.mcpDescriptionCompression` 元資料）                                      |
| `omniroute_compression_configure`     | `write:compression` | 設定壓縮模式、閾值、目標比率、系統提示保留、MCP 描述壓縮開關                                                              |
| `omniroute_set_compression_engine`    | `write:compression` | 選取作用中引擎（off/caveman/rtk/stacked）與 Caveman/RTK 強度                                                              |
| `omniroute_list_compression_combos`   | `read:compression`  | 列出已命名的壓縮組合及其引擎管線                                                                                           |
| `omniroute_compression_combo_stats`   | `read:compression`  | 依壓縮組合與引擎分組的分析資料                                                                                             |
| `omniroute_ccr_store`                 | `write:compression` | 將呼叫者隔離的內容儲存至有界限的記憶體內 CCR 存放區，並回傳標記與 `ccr://` 參考                                               |
| `omniroute_ccr_retrieve`              | `read:compression`  | 以完整、開頭、結尾、行數、grep 及統計模式擷取 CCR 內容                                                                       |
| `omniroute_ccr_inspect`               | `read:compression`  | 檢查呼叫者擁有的 CCR 元資料，不回傳內容                                                                                    |
| `omniroute_ccr_list`                  | `read:compression`  | 列出呼叫者擁有的 CCR 區塊之分頁元資料                                                                                      |
| `omniroute_ccr_delete`                | `write:compression` | 刪除呼叫者擁有的 CCR 區塊                                                                                                  |
| `omniroute_ccr_stats`                 | `read:compression`  | 回報呼叫者範圍的記憶體使用量、生命週期計數器與存放區限制                                                                   |
| `omniroute_rtk_discover`              | `read:compression`  | 在選擇性加入的 RTK 輸出樣本中發現重複出現的雜訊                                                                             |
| `omniroute_rtk_learn`                 | `read:compression`  | 從選擇性加入的樣本產生可供審查的 RTK 過濾器草稿                                                                              |

CCR 條目僅存在於記憶體中，重新啟動後即消失。每個區塊限制為 2 MiB，每個主體限制為 16 MiB，全域存放區限制為 64 MiB。條目預設 TTL 為 24 小時（最長七天）。完整的 MCP 擷取限制為 256 KiB；較大的區塊仍可透過範圍與 grep 模式使用。儲存、擷取、列出、檢查、刪除與統計皆以通過驗證的 API 金鑰主體進行隔離。稽核記錄包含雜湊與大小元資料，絕不包含內容。

`omniroute_compression_status` 會將 MCP 描述壓縮分別回報於 `analytics.mcpDescriptionCompression` 之下。這些數值是對 MCP 可列出描述（`tools`、`prompts`、`resources` 與 `resourceTemplates`）的元資料大小估計值，並非提供者使用收據，並標記有 `source: "mcp_metadata_estimate"`。

### MCP 無障礙樹過濾器（v3.8.0）

與上述壓縮工具不同，OmniRoute 包含一個執行後過濾器，可在 MCP 瀏覽器／無障礙工具的**工具結果**回傳給代理之前對其進行壓縮。此過濾器本身不是一個工具 — 它會透明地作用於任何包含冗長無障礙樹或瀏覽器快照文字（≥2000 字元）的工具結果。

關鍵行為：

- 將 ≥30 行連續重複的同層兄弟行摺疊為開頭＋結尾摘要
- 保留 Playwright／電腦使用所需的 `[ref=eXX]` 錨點
- 對過大的文字（>50,000 字元）進行強制截斷，並附上導航提示
- 預期節省：瀏覽器快照承載的 **60–80%**

設定：全域設定中的 `compression.mcpAccessibility`（遷移 056）。
實作：`open-sse/services/compression/engines/mcpAccessibility/`。
完整文件：[壓縮引擎 — MCP 無障礙樹過濾器](../compression/COMPRESSION_ENGINES.md#mcp-accessibility-tree-filter)。

請參閱[壓縮引擎](../compression/COMPRESSION_ENGINES.md)與 [RTK 壓縮](../compression/RTK_COMPRESSION.md)了解這些工具背後的執行時期壓縮模型。

## 1Proxy 工具（3 個）

| 工具                          | 範圍            | 說明                                                                                 |
| :---------------------------- | :-------------- | :----------------------------------------------------------------------------------- |
| `omniroute_oneproxy_fetch`    | `read:proxies`  | 從 1proxy 市集取得免費代理（協定／國家／品質／數量過濾器）                            |
| `omniroute_oneproxy_rotate`   | `read:proxies`  | 依策略（`random`／`quality`／`sequential`）取得下一個可用代理                         |
| `omniroute_oneproxy_stats`    | `read:proxies`  | 池統計、同步狀態、依協定與國家的分佈                                                 |

## 記憶工具（3 個）

定義於 `open-sse/mcp-server/tools/memoryTools.ts`。認證／範圍透過標準 MCP 範圍管線強制執行。

| 工具                        | 範圍            | 說明                                                                           |
| :-------------------------- | :-------------- | :----------------------------------------------------------------------------- |
| `omniroute_memory_search`   | `read:memory`   | 依查詢／類型／API 金鑰搜尋記憶，並執行代幣預算限制                             |
| `omniroute_memory_add`      | `write:memory`  | 新增記憶條目（`factual`／`episodic`／`procedural`／`semantic`）                |
| `omniroute_memory_clear`    | `write:memory`  | 清除某 API 金鑰的記憶，可選擇依類型或 `olderThan` 時間戳過濾                    |

## 技能工具（4 個）

定義於 `open-sse/mcp-server/tools/skillTools.ts`。由 `src/lib/skills/registry` 與 `src/lib/skills/executor` 支援。

| 工具                            | 範圍              | 說明                                                                           |
| :------------------------------ | :---------------- | :----------------------------------------------------------------------------- |
| `omniroute_skills_list`         | `read:skills`     | 列出已註冊的技能，可依 API 金鑰、名稱或啟用狀態過濾                            |
| `omniroute_skills_enable`       | `write:skills`    | 依 ID 啟用或停用特定技能                                                       |
| `omniroute_skills_execute`      | `execute:skills`  | 以提供的輸入執行技能，並回傳執行記錄                                            |
| `omniroute_skills_executions`   | `read:skills`     | 列出近期技能執行歷史                                                            |

## Notion 上下文來源（6 個）

定義於 `open-sse/mcp-server/tools/notionTools.ts`。代幣儲存於 `key_value` 表中，透過 `src/lib/db/notion.ts` 操作。REST 客戶端位於 `src/lib/notion/api.ts`。設定 API 位於 `src/app/api/settings/notion/route.ts`。儀表板 UI 位於 `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx`。

在端點儀表板的**上下文來源**頁籤中設定你的 Notion 整合代碼，或透過 REST API 設定：

```bash
# 設定代碼
curl -X POST http://localhost:20128/api/settings/notion \
  -H "Content-Type: application/json" \
  -d '{"token": "ntn_..."}'

# 檢查狀態
curl http://localhost:20128/api/settings/notion

# 斷開連線
curl -X DELETE http://localhost:20128/api/settings/notion
```

| 工具                           | 範圍            | 說明                                                           |
| :----------------------------- | :-------------- | :------------------------------------------------------------- |
| `notion_search`                | `read:notion`   | 在所有頁面與資料庫中進行全文搜尋                               |
| `notion_get_page`              | `read:notion`   | 依 ID 取得頁面及其屬性                                         |
| `notion_list_block_children`   | `read:notion`   | 列出頁面或區塊的子區塊                                         |
| `notion_query_database`        | `read:notion`   | 以過濾器、排序與分頁查詢資料庫                                 |
| `notion_get_database`          | `read:notion`   | 依 ID 取得資料庫架構                                           |
| `notion_append_blocks`         | `write:notion`  | 將子區塊附加至父區塊（每次請求最多 100 個）                    |

## Agent 技能目錄工具（3 個）

定義於 `open-sse/mcp-server/tools/agentSkillTools.ts`。由 `src/lib/agentSkills/catalog` 支援。這些工具將 42 個項目的 Agent 技能文件目錄暴露給 MCP 客戶端與外部代理。範圍：`read:catalog`。

| 工具                                | 範圍            | 說明                                                                                                             |
| :---------------------------------- | :-------------- | :--------------------------------------------------------------------------------------------------------------- |
| `omniroute_agent_skills_list`       | `read:catalog`  | 列出全部 42 個 agent 技能，可選 `category`（api\|cli）與 `area` 過濾器；回傳元資料＋覆蓋率                        |
| `omniroute_agent_skills_get`        | `read:catalog`  | 依標準 `id` 取得單一技能的完整元資料＋SKILL.md 內容                                                               |
| `omniroute_agent_skills_coverage`   | `read:catalog`  | 覆蓋率統計：22 個 API 與 20 個 CLI 技能中有多少個在檔案系統上擁有 SKILL.md 檔案，與目錄總數比較                   |

請參閱 [AGENT-SKILLS.md](./AGENT-SKILLS.md) 了解完整目錄及外部代理如何使用。

## 相關框架（v3.8.0）

上述 MCP 工具清單（104 個唯一工具，由 `countUniqueMcpTools()` 計算）的範圍故意限定於執行時期路由／快取／壓縮／記憶／技能／代理／上下文來源操作。兩個相鄰框架與 MCP 伺服器一同於 v3.8.0 提供，並分別記錄：

### Cloud Agents

Cloud Agents 是行程外的 AI 編碼代理（codex-cloud、devin、jules），透過與 LLM 提供者相同的連線模型接入 OmniRoute。它們透過自己的 REST 介面（`/api/v1/agents/*`）暴露，且**不屬於** MCP 工具目錄的一部分 — 呼叫 Cloud Agent 不會消耗 MCP 範圍。

- 實作：`src/lib/cloudAgent/`（`registry.ts`、`agents/codex-cloud.ts`、`agents/devin.ts`、`agents/jules.ts`）。
- 生命週期：`createTask`、`getStatus`、`approvePlan`、`sendMessage`、`listSources`。
- 文件：[docs/frameworks/CLOUD_AGENT.md](./CLOUD_AGENT.md)。

### Guardrails

Guardrails 是在聊天管線中套用的執行前／執行後過濾器（vision-bridge、pii-masker、prompt-injection）。它們在抵達 MCP 工具／路由層之前執行，並將結構化違規記錄發送至稽核管線；它們不是以 MCP 工具的形式被呼叫。

- 實作：`src/lib/guardrails/`。
- 文件：[docs/security/GUARDRAILS.md](../security/GUARDRAILS.md)。

當偵錯一個看似被封鎖的 MCP 呼叫時，請同時檢查 MCP 稽核日誌（`scope_denied:*` 條目）與 guardrails 稽核軌跡 — 請求可能在抵達 MCP 範圍強制執行層**之前**就被 guardrail 拒絕。

---

## REST API 端點

| 端點                     | 方法                   | 說明                                                                                           | 認證                        |
| :----------------------- | :--------------------- | :--------------------------------------------------------------------------------------------- | :-------------------------- |
| `/api/mcp/status`        | `GET`                  | 伺服器狀態：心跳、HTTP 傳輸狀態、稽核活動摘要                                                   | 管理（工作階段／管理員）    |
| `/api/mcp/tools`         | `GET`                  | 工具目錄（名稱、說明、範圍、階段、來源端點）                                                    | 管理                        |
| `/api/mcp/sse`           | `GET` / `POST`         | SSE 傳輸端點（由 `mcpEnabled` + `mcpTransport === "sse"` 閘控）                                 | API 金鑰 + 範圍             |
| `/api/mcp/stream`        | `POST`/`GET`/`DELETE`  | 可串流 HTTP 傳輸（使用 `mcp-session-id` 標頭；`DELETE` 結束工作階段）                           | API 金鑰 + 範圍             |
| `/api/mcp/audit`         | `GET`                  | 來自 `mcp_tool_audit` 的稽核日誌條目（過濾器：`limit`、`offset`、`tool`、`success`、`apiKeyId`） | 管理                        |
| `/api/mcp/audit/stats`   | `GET`                  | 彙總稽核統計（`totalCalls`、`successRate`、`avgDurationMs`、熱門工具）                           | 管理                        |

原始檔案：`src/app/api/mcp/{status,tools,sse,stream,audit,audit/stats}/route.ts`。

SSE 與 Streamable HTTP 兩種傳輸層在設定中啟用 MCP 伺服器（`mcpEnabled`）並選取適當的 `mcpTransport` 之前，皆處於封鎖狀態。若設定了錯誤的傳輸層，路由會回傳 HTTP 400 並提示切換設定。

---

## 認證與範圍

MCP 工具透過 API 金鑰範圍進行認證。範圍強制執行集中於 `open-sse/mcp-server/scopeEnforcement.ts`。每個工具需要特定的範圍：

| 範圍                  | 工具                                                                                                                |
| :-------------------- | :------------------------------------------------------------------------------------------------------------------ |
| `read:health`         | `get_health`、`get_provider_metrics`、`simulate_route`、`explain_route`、`best_combo_for_task`、`db_health_check`   |
| `read:combos`         | `list_combos`、`get_combo_metrics`、`simulate_route`、`best_combo_for_task`、`test_combo`                            |
| `write:combos`        | `switch_combo`、`set_routing_strategy`                                                                               |
| `read:quota`          | `check_quota`                                                                                                        |
| `read:usage`          | `cost_report`、`get_session_snapshot`、`explain_route`                                                               |
| `read:models`         | `list_models_catalog`                                                                                                |
| `execute:completions` | `route_request`、`test_combo`                                                                                        |
| `execute:search`      | `web_search`                                                                                                         |
| `write:budget`        | `set_budget_guard`                                                                                                   |
| `write:resilience`    | `set_resilience_profile`、`db_health_check`                                                                          |
| `pricing:write`       | `sync_pricing`                                                                                                       |
| `read:cache`          | `cache_stats`                                                                                                        |
| `write:cache`         | `cache_flush`                                                                                                        |
| `read:compression`    | `compression_status`、`list_compression_combos`、`compression_combo_stats`                                           |
| `write:compression`   | `compression_configure`、`set_compression_engine`                                                                    |
| `read:proxies`        | `oneproxy_fetch`、`oneproxy_rotate`、`oneproxy_stats`                                                                |
| `read:notion`         | `notion_search`、`notion_list_databases`、`notion_get_database`、`notion_query_database`、`notion_read`              |
| `write:notion`        | `notion_append_blocks`                                                                                               |
| `read:memory`         | `memory_search`                                                                                                      |
| `write:memory`        | `memory_add`、`memory_clear`                                                                                         |
| `read:skills`         | `skills_list`、`skills_executions`                                                                                   |
| `write:skills`        | `skills_enable`                                                                                                      |
| `execute:skills`      | `skills_execute`                                                                                                     |
| `read:catalog`        | `agent_skills_list`、`agent_skills_get`、`agent_skills_coverage`                                                     |

支援萬用字元範圍：`read:*` 授予所有讀取範圍，`*` 授予完整存取權限。

---

## 環境變數

| 變數                                      | 預設值                             | 用途                                                                                                                        |
| :---------------------------------------- | :--------------------------------- | :-------------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_BASE_URL`                      | `http://localhost:20128`           | MCP 伺服器在呼叫 OmniRoute 內部 API 時使用的基礎 URL                                                                        |
| `OMNIROUTE_API_KEY`                       | （空）                             | 轉發為 `Authorization: <key>` 至內部 API 呼叫的 API 金鑰                                                                      |
| `OMNIROUTE_MCP_ENFORCE_SCOPES`            | `false`（僅 `"true"` 啟用）          | 啟用時，缺少範圍會拒絕工具呼叫，並在稽核日誌中記錄 `scope_denied:<原因>`                                                      |
| `OMNIROUTE_MCP_SCOPES`                    | （空）                             | 逗號分隔的範圍允許清單，視為預設「可用」（用於呼叫者未提供自身範圍時）                                                          |
| `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS`     | （未設定＝開啟）                    | 設為 `0/false/off/no` 時，在註冊時停用 MCP 描述壓縮                                                                         |
| `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION`   | （未設定＝開啟）                    | 上述相同開關的別名                                                                                                            |
| `MCP_TOOL_DENY`                           | （未設定＝無過濾）                  | 逗號分隔的工具名稱，從 `tools/list` 中移除（工具基數減少 — 請參閱下方）                                                       |
| `MCP_TOOL_ALLOW`                          | （未設定＝無過濾）                  | 逗號分隔的工具名稱，僅保留這些工具（允許清單模式 — 請參閱下方）                                                               |
| `DATA_DIR`                                | `~/.omniroute`                     | 心跳檔案寫入至 `${DATA_DIR}/runtime/mcp-heartbeat.json`                                                                      |

---

## 描述壓縮

MCP 工具、提示與資源註冊表可在註冊／列出時壓縮描述，以減少暴露給客戶端的元資料大小（進而降低提示上下文成本）。實作位於 `open-sse/mcp-server/descriptionCompressor.ts`，並透過 `createMcpServer()` 中的 `compressMcpRegistryMetadata` 接入 MCP 伺服器。

- 壓縮使用 Caveman 規則集（`getRulesForContext("all", "full")`）對描述文字進行壓縮，並保留區塊提取（程式碼跨度、圍欄區塊等），以確保結構性內容不被改變。
- 可透過 `key_value` 設定表中的 `compression.mcpDescriptionCompressionEnabled` 值（預設：啟用）依部署切換 — 在 UI 中顯示為**分析 → MCP 描述壓縮**。
- 可透過 `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS=false` 或 `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION=false` 全域切換。
- 即時統計資料透過 `omniroute_compression_status` 在 `analytics.mcpDescriptionCompression` 下呈現，並標記為 `source: "mcp_metadata_estimate"`，以與真實的提供者使用收據區分。

---

## 工具基數減少（F4.3）

描述壓縮會縮小每個工具的元資料；**工具基數減少**則更進一步，減少**宣告的工具總數**。在 `tools/list` 清單中廣告較少的工具，可降低客戶端模型為工具目錄所支付的每次請求代幣成本（「第 5 層」壓縮）。實作為一個純粹、無狀態的過濾器，位於 `open-sse/mcp-server/toolCardinality.ts`（`reduceToolManifest`），接入 `createMcpServer()`（`open-sse/mcp-server/server.ts`）的註冊迴圈。

**選擇性加入，預設關閉。** 過濾器僅在至少設定兩個環境變數之一時才執行；若兩者皆未設定，則所有 104 個工具保持不變地被宣告。

| 變數              | 模式                                                                                       |
| :---------------- | :----------------------------------------------------------------------------------------- |
| `MCP_TOOL_DENY`   | 黑名單 — 逗號分隔的工具名稱，始終從 `tools/list` 中移除                                      |
| `MCP_TOOL_ALLOW`  | 允許清單 — 逗號分隔的工具名稱；僅這些工具保留，其他全部移除                                   |

`deny` 優先於 `allow`。名稱以逗號分隔，前後空白被去除，空條目被忽略。範例：

```bash
# 從目錄中移除兩個工具
MCP_TOOL_DENY="omniroute_get_health,omniroute_list_combos" omniroute --mcp

# 僅宣告路由＋配額工具（允許清單模式）
MCP_TOOL_ALLOW="omniroute_route_request,omniroute_check_quota" omniroute --mcp
```

**被過濾的工具如何移除：** 註冊始終成功；設定檔拒絕的工具隨後會在 MCP SDK 控制代碼上被 `.disable()`，因此它永遠不會出現在 `tools/list` 中，但接線保持完整（乾淨的啟用／停用，無需重新註冊）。設定檔解析器為 `readMcpToolProfileFromEnv(process.env)`，當兩個變數皆為空時回傳 `null`（不過濾）。

`reduceToolManifest` 背後更豐富的 `ToolProfile` 型別也支援範圍交集過濾（`allowScopes`，含 `read:*` 風格的萬用字元比對）與確定性的 `maxTools` 上限，但這兩個控制項需要在註冊時取得完整清單，且**目前尚未透過環境變數暴露**（`tools/list` 層級的鉤子為已追蹤的後續功能）。`estimateManifestTokens()` 可用於比較減少前後的工具清單代幣成本。

---

## 執行時期心跳

stdio 傳輸層每 5 秒將存活狀態持續寫入 `${DATA_DIR}/runtime/mcp-heartbeat.json`。儀表板（`/api/mcp/status`）讀取此檔案加上 PID 存活狀態以推斷 `online` 狀態。HTTP 傳輸層則從行程內的 `getMcpHttpStatus()` 回報狀態（不寫入檔案）。

心跳快照包含以下內容：

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

## 稽核日誌

每個工具呼叫均由 `open-sse/mcp-server/audit.ts` 記錄至 SQLite `mcp_tool_audit` 表：

- 工具名稱、引數（依各工具的 `auditLevel` 進行雜湊／截斷）、結果
- 持續時間（毫秒）、成功／失敗標記、錯誤訊息（適用時）
- API 金鑰雜湊、時間戳
- 範圍拒絕記錄為 `scope_denied:<原因>`，附帶缺少的範圍清單

使用儀表板或 `/api/mcp/audit` 與 `/api/mcp/audit/stats` REST 端點來檢查近期呼叫。

---

## 檔案

| 檔案                                                                    | 用途                                                             |
| :---------------------------------------------------------------------- | :--------------------------------------------------------------- |
| `open-sse/mcp-server/server.ts`                                         | MCP 伺服器工廠、stdio 入口點、範圍化工具註冊                      |
| `open-sse/mcp-server/httpTransport.ts`                                  | SSE + Streamable HTTP 傳輸層（工作階段管理）                      |
| `open-sse/mcp-server/scopeEnforcement.ts`                               | 工具範圍評估與呼叫者解析                                         |
| `open-sse/mcp-server/audit.ts`                                          | 工具呼叫稽核日誌（`mcp_tool_audit`）                              |
| `open-sse/mcp-server/runtimeHeartbeat.ts`                               | stdio 心跳寫入器（`mcp-heartbeat.json`）                          |
| `open-sse/mcp-server/descriptionCompressor.ts`                          | 工具／提示／資源註冊表的描述壓縮                                  |
| `open-sse/mcp-server/schemas/tools.ts`                                  | Zod 架構＋工具註冊表（`MCP_TOOLS`，34 個條目）                   |
| `open-sse/mcp-server/tools/advancedTools.ts`                            | 第二階段＋快取＋1proxy 工具處理器                                 |
| `open-sse/mcp-server/tools/compressionTools.ts`                         | 壓縮工具處理器                                                   |
| `open-sse/mcp-server/tools/memoryTools.ts`                              | 記憶工具定義（3 個工具）                                         |
| `open-sse/mcp-server/tools/skillTools.ts`                               | 技能工具定義（4 個工具）                                         |
| `open-sse/mcp-server/tools/notionTools.ts`                              | Notion 上下文來源工具定義（6 個工具）                             |
| `open-sse/mcp-server/tools/gamificationTools.ts`                        | 遊戲化工具定義（8 個工具）                                       |
| `open-sse/mcp-server/tools/pluginTools.ts`                              | 外掛註冊與管理工具（8 個工具）                                    |
| `src/app/api/mcp/status/route.ts`                                       | `/api/mcp/status` 端點                                          |
| `src/app/api/mcp/tools/route.ts`                                        | `/api/mcp/tools` 端點                                           |
| `src/app/api/mcp/sse/route.ts`                                          | `/api/mcp/sse` SSE 傳輸路由                                     |
| `src/app/api/mcp/stream/route.ts`                                       | `/api/mcp/stream` Streamable HTTP 傳輸路由                      |
| `src/app/api/mcp/audit/route.ts`                                        | `/api/mcp/audit` 稽核日誌查詢                                   |
| `src/app/api/mcp/audit/stats/route.ts`                                  | `/api/mcp/audit/stats` 彙總稽核指標                             |
| `src/lib/notion/api.ts`                                                 | Notion REST API 客戶端（重試、逾時、錯誤分類）                    |
| `src/lib/db/notion.ts`                                                  | Notion 代碼持久化（`key_value` 表）                              |
| `src/app/api/settings/notion/route.ts`                                  | Notion 設定 API（GET/POST/DELETE）                               |
| `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx` | Notion 代碼管理 UI                                              |
| `tests/unit/notion-api.test.ts`                                         | Notion API 客戶端測試（7 個）                                    |
| `tests/unit/notion-tools.test.ts`                                       | Notion 工具範圍強制執行測試（10 個）                              |
| `tests/unit/db/notion.test.mjs`                                         | Notion DB 模組測試（3 個）                                      |
