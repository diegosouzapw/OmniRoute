# OmniRoute MCP Server Documentation (中文 (繁體))

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/MCP-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/MCP-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/MCP-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/MCP-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/MCP-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/MCP-SERVER.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/MCP-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/MCP-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/MCP-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/MCP-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/MCP-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/MCP-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/MCP-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/MCP-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/MCP-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/MCP-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/MCP-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/MCP-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/MCP-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/MCP-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/MCP-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/MCP-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/MCP-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/MCP-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/MCP-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/MCP-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/MCP-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/MCP-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/MCP-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/MCP-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/MCP-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/MCP-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/MCP-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/MCP-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/MCP-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/MCP-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/MCP-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/MCP-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/MCP-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/MCP-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/MCP-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/MCP-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/MCP-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/MCP-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/MCP-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/MCP-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/MCP-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/MCP-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/MCP-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/MCP-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/MCP-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/MCP-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/MCP-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/MCP-SERVER.md)

---

> Model Context Protocol 伺服器提供涵蓋路由、快取、壓縮、記憶體、技能、代理、資源池、Radar 與上下文來源操作的 110 項工具。
>
> 事實依據：`open-sse/mcp-server/server.ts` 使用 `countUniqueMcpTools()` 計算出 **110 項不重複工具**：45 個標準定義（包括六個 CCR 生命週期工具、agent-skills 三件組、`omniroute_radar_catalog` 與 `omniroute_x_search`），再加上記憶體（3）、技能（4）、GitHub 技能（3）、資源池（6）、遊戲化（8）、外掛程式（8）、Notion（6）、Obsidian（22）、本機語料庫（3），以及兩個僅限 RTK 的壓縮工具。

## 安裝

OmniRoute MCP 已內建。請使用以下指令啟動：

```bash
omniroute --mcp
```

或透過 open-sse 傳輸：

```bash
# HTTP 可串流傳輸（連接埠 20130）
omniroute --dev  # MCP 會在 /mcp 端點自動啟動
```

HTTP 傳輸（`sse` / `streamable-http`，由儀表板伺服器在同一程序內提供）預設為
停用，先前只能從 `/dashboard/mcp` 頁面切換。自 v3.8.51 起，
CLI 也提供相同功能：

```bash
omniroute mcp status                                  # 啟用狀態／上線狀態、傳輸方式、工具數量
omniroute mcp enable [--transport stdio|sse|streamable-http]
omniroute mcp disable
omniroute mcp restart                                 # 重設使用中的 sse/streamable-http 工作階段
```

`mcp enable`/`mcp disable` 會對儀表板透過 `/api/settings` 切換的同一個 `mcpEnabled`
設定（以及選用的 `mcpTransport`）發出 PATCH 請求。`mcp restart` 會呼叫 `POST /api/mcp/restart`：
它會終止使用中的 `sse`/`streamable-http` 工作階段，讓下一個請求可以乾淨地重新初始化；
若 MCP 已停用，則傳回 `409`；若使用 `stdio` 傳輸，則傳回 `501`（stdio 用戶端會管理自己的
子程序，因此沒有可在程序內重新啟動的控制代碼）。

## 傳輸方式

MCP 伺服器提供三種傳輸方式，全部由相同的 `createMcpServer()` 工廠提供支援：

| 傳輸方式          | 位置                                            | 使用時機                                        |
| :---------------- | :---------------------------------------------- | :---------------------------------------------- |
| `stdio`           | `open-sse/mcp-server/server.ts`                 | IDE 整合（Claude Desktop、Cursor 等）           |
| `sse`             | 透過 `httpTransport` 的 `POST/GET /api/mcp/sse` | 需要事件串流的瀏覽器／代理程式用戶端            |
| `streamable-http` | `POST/GET/DELETE /api/mcp/stream`               | 多工作階段 HTTP 用戶端（`mcp-session-id` 標頭） |

使用中的 HTTP 傳輸（`sse` 或 `streamable-http`）由 `mcpTransport` 設定選取。切換傳輸方式會關閉另一種傳輸上現有的工作階段。

### 遠端存取（略過 manage 範圍限制）

`/api/mcp/*` 位於 LOCAL_ONLY 層級（`src/server/authz/routeGuard.ts`）——預設只有回送主機（`localhost`、`127.0.0.1`、`::1`）可以存取。自 v3.8.2 起，若非回送用戶端提供 `Authorization: Bearer <api-key>`，且其金鑰具有 `manage` 範圍，即可連線。這是透過通道、反向代理或公開主機名稱連線至遠端 MCP 伺服器的唯一方式。

```bash
# 授予 manage 範圍：開啟儀表板的 API Keys 頁面，並為該金鑰切換
# 「Management Access」，或在建立時 POST scopes:["manage"]。

# 接著從遠端 MCP 用戶端連線：
curl -i \
  -H "Host: your-public-host.example" \
  -H "Authorization: Bearer sk-…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-03-26","capabilities":{},"clientInfo":{"name":"my-client","version":"0"}}}' \
  https://your-public-host.example/api/mcp/stream
```

不具 `manage` 範圍的金鑰（或未提供 Bearer）會傳回 `403 LOCAL_ONLY`。相鄰的前綴 `/api/cli-tools/runtime/*` 刻意設計為不可略過——請參閱[路由防護層級——manage 範圍例外](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out)。

## IDE 設定

請參閱 [MCP 用戶端設定](../guides/SETUP_GUIDE.md#mcp-client-configuration)，以瞭解 Claude Desktop、Cursor、Cline 及相容 MCP 用戶端的設定方式。

---

## 必備工具（14）— 第 1 階段

| 工具                            | 權限範圍              | 說明                                                                                         |
| :------------------------------ | :-------------------- | :------------------------------------------------------------------------------------------- |
| `omniroute_get_health`          | `read:health`         | 運作時間、記憶體、斷路器、速率限制、快取統計資料                                             |
| `omniroute_list_combos`         | `read:combos`         | 所有已設定的組合及其策略（可選擇包含指標）                                                   |
| `omniroute_get_combo_metrics`   | `read:combos`         | 特定組合的效能指標                                                                           |
| `omniroute_switch_combo`        | `write:combos`        | 啟用或停用組合                                                                               |
| `omniroute_create_combo`        | `write:combos`        | 透過現有的組合 API 建立經過驗證的組合                                                        |
| `omniroute_check_quota`         | `read:quota`          | 已用／總配額、剩餘百分比、重設時間、權杖健康狀態                                             |
| `omniroute_route_request`       | `execute:completions` | 透過 OmniRoute 路由傳送聊天補全請求                                                          |
| `omniroute_cost_report`         | `read:usage`          | 依期間（工作階段／日／週／月）提供成本報告                                                   |
| `omniroute_list_models_catalog` | `read:models`         | 完整的模型目錄，包含功能、狀態與定價                                                         |
| `omniroute_radar_catalog`       | `read:radar`          | 本機已簽署的 Radar 目錄；可選擇依提供者／系列篩選                                            |
| `omniroute_tool_search`         | `read:tools`          | 從已註冊的 MCP 目錄探索工具                                                                  |
| `omniroute_web_search`          | `execute:search`      | 透過已設定的搜尋提供者進行網頁搜尋。不包含 X/Twitter。                                       |
| `omniroute_x_search`            | `execute:search`      | 透過 xAI/SuperGrok 搜尋 X，或選擇 `xquik-search` 以取得 Xquik API 結果。需要所選後端的憑證。 |
| `omniroute_web_fetch`           | `execute:search`      | 透過已設定的擷取提供者取得網頁內容                                                           |

## 進階工具 (11) — 第 2 階段

| 工具                               | 權限範圍                             | 說明                                                                   |
| :--------------------------------- | :----------------------------------- | :--------------------------------------------------------------------- |
| `omniroute_simulate_route`         | `read:health`, `read:combos`         | 使用備援樹進行路由模擬試跑                                             |
| `omniroute_set_budget_guard`       | `write:budget`                       | 設定工作階段預算，並採取降級／封鎖／警示動作                           |
| `omniroute_set_routing_strategy`   | `write:combos`                       | 在執行階段更新組合策略（優先順序／加權／自動等）                       |
| `omniroute_set_resilience_profile` | `write:resilience`                   | 套用 `aggressive`／`balanced`／`conservative` 韌性預設設定             |
| `omniroute_test_combo`             | `execute:completions`, `read:combos` | 使用真實上游呼叫即時測試組合中的每個提供者                             |
| `omniroute_get_provider_metrics`   | `read:health`                        | 各提供者的指標，包含 p50／p95／p99 延遲和斷路器狀態                    |
| `omniroute_best_combo_for_task`    | `read:combos`, `read:health`         | 根據工作類型、預算與延遲限制建議組合                                   |
| `omniroute_explain_route`          | `read:health`, `read:usage`          | 說明請求為何被路由至某個提供者（評分因素與備援）                       |
| `omniroute_get_session_snapshot`   | `read:usage`                         | 完整工作階段快照：成本、權杖、最常用的模型／提供者、錯誤、預算防護機制 |
| `omniroute_db_health_check`        | `read:health`, `write:resilience`    | 診斷（並可選擇自動修復）資料庫偏移，例如損壞的組合參照／孤立資料列     |
| `omniroute_sync_pricing`           | `pricing:write`                      | 從外部來源（LiteLLM）同步定價資料；支援 `dryRun`                       |

## 快取工具 (2)

| 工具                    | 權限範圍      | 說明                               |
| :---------------------- | :------------ | :--------------------------------- |
| `omniroute_cache_stats` | `read:cache`  | 語意快取、提示快取與冪等性統計資料 |
| `omniroute_cache_flush` | `write:cache` | 全域或依特徵／模型清除快取         |

## 壓縮工具 (13)

| 工具                                | 權限範圍            | 說明                                                                                        |
| :---------------------------------- | :------------------ | :------------------------------------------------------------------------------------------ |
| `omniroute_compression_status`      | `read:compression`  | 壓縮設定、分析摘要與快取感知統計資料（包含 `analytics.mcpDescriptionCompression` 中繼資料） |
| `omniroute_compression_configure`   | `write:compression` | 設定壓縮模式、閾值、目標比率、系統提示保留及 MCP 說明壓縮開關                               |
| `omniroute_set_compression_engine`  | `write:compression` | 選擇使用中的引擎（off/caveman/rtk/stacked）及 Caveman/RTK 強度                              |
| `omniroute_list_compression_combos` | `read:compression`  | 列出具名壓縮組合及其引擎管線                                                                |
| `omniroute_compression_combo_stats` | `read:compression`  | 依壓縮組合與引擎分組的分析資料                                                              |
| `omniroute_ccr_store`               | `write:compression` | 將依呼叫端隔離的內容儲存至有界的記憶體內 CCR 儲存區，並傳回標記與 `ccr://` 參照             |
| `omniroute_ccr_retrieve`            | `read:compression`  | 完整擷取 CCR 內容，或使用開頭、結尾、行、grep 及統計模式擷取                                |
| `omniroute_ccr_inspect`             | `read:compression`  | 檢查由呼叫端擁有的 CCR 中繼資料，但不傳回內容                                               |
| `omniroute_ccr_list`                | `read:compression`  | 列出由呼叫端擁有之 CCR 區塊的分頁中繼資料                                                   |
| `omniroute_ccr_delete`              | `write:compression` | 刪除由呼叫端擁有的 CCR 區塊                                                                 |
| `omniroute_ccr_stats`               | `read:compression`  | 回報呼叫端範圍內的記憶體用量、生命週期計數器與儲存區限制                                    |
| `omniroute_rtk_discover`            | `read:compression`  | 在選擇加入的 RTK 輸出樣本中探索重複出現的雜訊                                               |
| `omniroute_rtk_learn`               | `read:compression`  | 從選擇加入的樣本產生可供檢閱的 RTK 篩選器草稿                                               |

CCR 項目僅儲存於記憶體中，並會在重新啟動時消失。每個區塊上限為 2 MiB，每個
主體上限為 16 MiB，全域儲存區上限為 64 MiB。項目的預設 TTL 為 24 小時（最長
七天）。完整 MCP 擷取限制為 256 KiB；較大的區塊仍可透過
範圍與 grep 模式取得。儲存、擷取、列出、檢查、刪除及統計資料均依
已驗證的 API 金鑰主體進行隔離。稽核記錄僅包含雜湊與大小中繼資料，絕不包含內容。

`omniroute_compression_status` 會在
`analytics.mcpDescriptionCompression` 下單獨回報 MCP 描述壓縮。這些值是 MCP 可列舉描述
（`tools`、`prompts`、`resources` 與 `resourceTemplates`）的中繼資料大小估計值；它們不是提供者用量
收據，並標記為 `source: "mcp_metadata_estimate"`。

### MCP 無障礙樹狀結構篩選器 (v3.8.0)

除了上述壓縮工具之外，OmniRoute 還包含一個執行後篩選器，會在 MCP 瀏覽器／無障礙工具的
**工具結果**傳回給代理程式之前加以壓縮。此篩選器本身並非工具，而是會透明地處理任何包含
冗長無障礙樹狀結構或瀏覽器快照文字（≥2000 個字元）的工具結果。

主要行為：

- 將 ≥30 個連續重複的同層級項目行摺疊為開頭 + 結尾摘要
- 保留 Playwright／電腦操作所需的 `[ref=eXX]` 錨點
- 對過大的文字（>50,000 個字元）進行強制截斷，並附上導覽提示
- 預期節省量：瀏覽器快照承載內容可減少 **60–80%**

設定：全域設定中的 `compression.mcpAccessibility`（遷移 056）。
實作：`open-sse/services/compression/engines/mcpAccessibility/`。
完整文件：[壓縮引擎 — MCP 無障礙樹狀結構篩選器](../compression/COMPRESSION_ENGINES.md#mcp-accessibility-tree-filter)。

請參閱[壓縮引擎](../compression/COMPRESSION_ENGINES.md)與 [RTK 壓縮](../compression/RTK_COMPRESSION.md)，以瞭解
這些工具背後的執行階段壓縮模型。

## 1Proxy 工具（3）

| 工具                        | 權限範圍       | 說明                                                                       |
| :-------------------------- | :------------- | :------------------------------------------------------------------------- |
| `omniroute_oneproxy_fetch`  | `read:proxies` | 從 1proxy 市集取得免費代理伺服器（可依通訊協定／國家／品質／數量限制篩選） |
| `omniroute_oneproxy_rotate` | `read:proxies` | 依策略（`random` / `quality` / `sequential`）取得下一個可用的代理伺服器    |
| `omniroute_oneproxy_stats`  | `read:proxies` | 代理池統計資料、同步狀態，以及依通訊協定與國家分類的分布情況               |

## 記憶工具（3）

定義於 `open-sse/mcp-server/tools/memoryTools.ts`。驗證／權限範圍會透過標準 MCP 權限範圍管線強制執行。

| 工具                      | 權限範圍       | 說明                                                               |
| :------------------------ | :------------- | :----------------------------------------------------------------- |
| `omniroute_memory_search` | `read:memory`  | 依查詢／類型／API 金鑰搜尋記憶，並強制執行權杖預算限制             |
| `omniroute_memory_add`    | `write:memory` | 新增記憶項目（`factual` / `episodic` / `procedural` / `semantic`） |
| `omniroute_memory_clear`  | `write:memory` | 清除某個 API 金鑰的記憶，可選擇依類型或 `olderThan` 時間戳記篩選   |

## 技能工具（4）

定義於 `open-sse/mcp-server/tools/skillTools.ts`。由 `src/lib/skills/registry` + `src/lib/skills/executor` 提供支援。

| 工具                          | 權限範圍         | 說明                                                    |
| :---------------------------- | :--------------- | :------------------------------------------------------ |
| `omniroute_skills_list`       | `read:skills`    | 列出已註冊的技能，可選擇依 API 金鑰、名稱或啟用狀態篩選 |
| `omniroute_skills_enable`     | `write:skills`   | 依 ID 啟用或停用特定技能                                |
| `omniroute_skills_execute`    | `execute:skills` | 使用提供的輸入執行技能，並傳回執行記錄                  |
| `omniroute_skills_executions` | `read:skills`    | 列出近期的技能執行歷程                                  |

## Notion 上下文來源（6）

定義於 `open-sse/mcp-server/tools/notionTools.ts`。權杖透過 `src/lib/db/notion.ts` 儲存於 `key_value` 資料表中。REST 用戶端位於 `src/lib/notion/api.ts`。設定 API 位於 `src/app/api/settings/notion/route.ts`。儀表板 UI 位於 `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx`。

請從端點儀表板的 **上下文來源** 分頁設定您的 Notion 整合權杖，或透過 REST API 進行設定：

```bash
# 設定權杖
curl -X POST http://localhost:20128/api/settings/notion \
  -H "Content-Type: application/json" \
  -d '{"token": "ntn_..."}'

# 檢查狀態
curl http://localhost:20128/api/settings/notion

# 中斷連線
curl -X DELETE http://localhost:20128/api/settings/notion
```

| 工具                         | 權限範圍       | 說明                                        |
| :--------------------------- | :------------- | :------------------------------------------ |
| `notion_search`              | `read:notion`  | 在所有頁面與資料庫中進行全文搜尋            |
| `notion_get_page`            | `read:notion`  | 依 ID 取得頁面及其屬性                      |
| `notion_list_block_children` | `read:notion`  | 列出頁面或區塊的子區塊                      |
| `notion_query_database`      | `read:notion`  | 使用篩選條件、排序與分頁查詢資料庫          |
| `notion_get_database`        | `read:notion`  | 依 ID 取得資料庫結構描述                    |
| `notion_append_blocks`       | `write:notion` | 將子區塊附加至父區塊（每個請求最多 100 個） |

## 代理技能目錄工具（3）

定義於 `open-sse/mcp-server/tools/agentSkillTools.ts`。由 `src/lib/agentSkills/catalog` 提供支援。這些工具將包含 45 個項目的代理技能文件目錄公開給 MCP 用戶端與外部代理。範圍：`read:catalog`。

| 工具                              | 範圍           | 說明                                                                                                      |
| :-------------------------------- | :------------- | :-------------------------------------------------------------------------------------------------------- |
| `omniroute_agent_skills_list`     | `read:catalog` | 列出全部 45 項代理技能，可選用 `category`（api\|cli）與 `area` 篩選條件；回傳中繼資料與涵蓋情況           |
| `omniroute_agent_skills_get`      | `read:catalog` | 依標準 `id` 取得單一技能的完整中繼資料與 SKILL.md 內容                                                    |
| `omniroute_agent_skills_coverage` | `read:catalog` | 涵蓋率統計：檔案系統中具有 SKILL.md 檔案的 23 項 API、21 項 CLI 與 1 項設定技能數量，相較於目錄總數的情況 |

如需完整目錄以及外部代理使用方式，請參閱 [AGENT-SKILLS.md](./AGENT-SKILLS.md)。

## 相關框架（v3.8.0）

上述 MCP 工具清單（110 個不重複工具，由 `countUniqueMcpTools()` 計算）刻意
限定於執行階段路由、快取、壓縮、記憶體、技能、代理及內容來源操作。v3.8.0 隨 MCP 伺服器
一併提供另外兩個相鄰框架，並分別記載於獨立文件中：

### 雲端代理

雲端代理是程序外的 AI 程式設計代理（codex-cloud、cursor-cloud、devin、jules），透過與
LLM 提供者相同的連線模型接入 OmniRoute。它們透過自身的 REST 介面
（`/api/v1/agents/*`）公開，且**不**屬於 MCP 工具目錄的一部分
——呼叫雲端代理不會耗用 MCP 範圍。

- 實作：`src/lib/cloudAgent/`（`registry.ts`、`agents/codex.ts`、`agents/cursor.ts`、`agents/devin.ts`、`agents/jules.ts`）。
- 生命週期：`createTask`、`getStatus`、`approvePlan`、`sendMessage`、`listSources`。
- 文件：[docs/frameworks/CLOUD_AGENT.md](./CLOUD_AGENT.md)。

### 防護機制

防護機制是在聊天管線內套用的執行前／執行後篩選器（vision-bridge、pii-masker、prompt-injection）。
它們會在請求抵達 MCP 工具／路由層之前執行，並將結構化違規資訊傳送至稽核管線；它們不會作為 MCP 工具被呼叫。

- 實作：`src/lib/guardrails/`。
- 文件：[docs/security/GUARDRAILS.md](../security/GUARDRAILS.md)。

偵錯看似遭封鎖的 MCP 呼叫時，請同時檢查 MCP 稽核記錄
（`scope_denied:*` 項目）與防護機制稽核軌跡——請求可能在抵達 MCP 範圍強制執行層**之前**
就被防護機制拒絕。

---

## REST API 端點

| 端點                   | 方法                  | 說明                                                                                               | 驗證                     |
| :--------------------- | :-------------------- | :------------------------------------------------------------------------------------------------- | :----------------------- |
| `/api/mcp/status`      | `GET`                 | 伺服器狀態：活動訊號、HTTP 傳輸狀態、稽核活動摘要                                                  | 管理（工作階段／管理員） |
| `/api/mcp/tools`       | `GET`                 | 工具目錄（名稱、說明、範圍、階段、來源端點）                                                       | 管理                     |
| `/api/mcp/sse`         | `GET` / `POST`        | SSE 傳輸端點（受 `mcpEnabled` + `mcpTransport === "sse"` 限制）                                    | API 金鑰 + 範圍          |
| `/api/mcp/stream`      | `POST`/`GET`/`DELETE` | 可串流 HTTP 傳輸（使用 `mcp-session-id` 標頭；`DELETE` 會結束工作階段）                            | API 金鑰 + 範圍          |
| `/api/mcp/audit`       | `GET`                 | 來自 `mcp_tool_audit` 的稽核記錄項目（篩選條件：`limit`、`offset`、`tool`、`success`、`apiKeyId`） | 管理                     |
| `/api/mcp/audit/stats` | `GET`                 | 彙總稽核統計資料（`totalCalls`、`successRate`、`avgDurationMs`、熱門工具）                         | 管理                     |

原始檔案：`src/app/api/mcp/{status,tools,sse,stream,audit,audit/stats}/route.ts`。

在「設定」中啟用 MCP 伺服器（`mcpEnabled`）並選取適當的 `mcpTransport` 之前，SSE 與可串流 HTTP 傳輸都會遭到封鎖。若設定了錯誤的傳輸方式，路由會回傳 HTTP 400，並提示切換設定。

---

## 驗證與範圍

MCP 工具會從呼叫者讀取範圍字串。該檢查是三個獨立命名空間之一。一個檢查器的通過不代表其他檢查器也通過。規則請參閱[三個範圍命名空間](#three-scope-namespaces)。工具目錄請參閱[MCP 工具範圍](#mcp-tool-scopes)。

### 三個範圍命名空間

API 金鑰上的 `manage`、MCP 工具上的 `read:compression` 以及 `oma_live_…` 存取權杖上的 `read` 是三種不同的授權。將 `read` 存取權杖傳送到變動性管理路由的呼叫者會收到 HTTP 403 錯誤，訊息為 `Access token scope 'read' is insufficient; 'write' required.`。該等級為 `scopeSatisfies`。它不查詢 MCP 表格，MCP 匹配器也不查詢它。

| 命名空間     | 憑證                                                        | 檢查器             | 允許的通過項目                   |
| :----------- | :---------------------------------------------------------- | :----------------- | :------------------------------- |
| API 金鑰管理 | `api_keys.scopes`                                           | `hasManageScope`   | 該 Bearer 金鑰的管理 REST        |
| API 金鑰附加 | 相同陣列，一個精確字串                                      | 下方提及的輔助程式 | 僅限該單一功能                   |
| MCP 工具範圍 | 相同陣列，否則為 MCP `_meta`，否則為 `OMNIROUTE_MCP_SCOPES` | `scopeMatches`     | 該工具，一旦啟用強制執行         |
| 存取權杖     | `oma_live_…`                                                | `scopeSatisfies`   | 其方法和路徑需要該等級的管理路由 |

每個憑證的鑄造都涵蓋在[管理驗證](../guides/MANAGEMENT-AUTH.md)中。

#### API 金鑰範圍

一個 `api_keys.scopes` 陣列用於兩個工作。它們使用不同的函數。

**管理 REST。** `manage` 和 `admin` 是 `MANAGEMENT_API_KEY_SCOPES` (`src/shared/constants/managementScopes.ts`) 的成員。`hasManageScope` 是授權該金鑰管理路由的依據。`admin` 在這些路由上具有管理能力。這裡的 `admin` 一詞並非存取權杖等級，它也不會擴展為 MCP 工具範圍。

**附加字串。** 每個都是精確的成員資格測試，並且每個都保持在 `MANAGEMENT_API_KEY_SCOPES` 之外。

| 範圍                           | 允許的通過項目                                                                                                                                        |
| :----------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `mcp:connect`                  | 僅限非迴路 `/api/mcp/` LOCAL_ONLY 專用區 (`hasMcpConnectOrManageScope`)。具有 `manage` 或 `admin` 的金鑰仍然可以通過該專用區。                        |
| `self:usage`                   | 此金鑰的 `GET /api/v1/me/status` (`src/app/api/v1/me/status/route.ts`)。`POST /api/keys` 在建立時新增此範圍 (`normalizeSelfServiceScopesForCreate`)。 |
| `self:account-quota`           | 該狀態酬載中的上游帳戶配額 (`src/lib/usage/apiKeySelfService.ts`)。狀態路由仍需要 `self:usage`。                                                      |
| `policy:bypass-provider-quota` | 此金鑰的推斷呼叫會跳過提供者配額策略 (`src/sse/handlers/chat.ts` 中的 `hasProviderQuotaBypassScope`)。                                                |

#### 匹配

目錄是[MCP 工具範圍](#mcp-tool-scopes)下的表格。請勿將 `src/shared/constants/mcpScopes.ts` 中的 `MCP_SCOPE_LIST` 視為該目錄：它是原始的類型化子集。後來的工具在其旁邊聲明了更多範圍 (`read:notion`、`read:skills`、`read:local-corpus` 以及表格的其餘部分)。

當每個所需範圍都與某些已授予範圍匹配時，`open-sse/mcp-server/scopeEnforcement.ts` 中的 `evaluateToolScopes` 允許呼叫：

- `*` 匹配所有所需範圍。
- 以 `*` 結尾的已授予範圍匹配以星號前綴開頭的所需範圍。`read:*` 匹配 `read:compression`。
- 所有其他已授予範圍僅匹配相同的所需字串。

範圍為 `["manage"]` 的金鑰在 `read:compression` 上會使 `scopeMatches` 失敗。當 `admin`、`mcp:connect`、`read` 和 `write` 是唯一授予的字串時，相同的呼叫也會失敗。MCP 工具範圍中除了尾隨的 `*` 之外沒有層次結構。

除非 `OMNIROUTE_MCP_ENFORCE_SCOPES=true` (預設為 `false`)，否則強制執行是關閉的。當它關閉時，`evaluateToolScopes` 允許呼叫並跳過目錄。當它開啟時，HTTP 使用 Bearer 金鑰的 `api_keys.scopes` 作為 `authInfo` (請參閱[每個金鑰的 HTTP 範圍綁定](#per-key-http-scope-binding-7895))。當沒有金鑰範圍解析時，授予的集合會回退到 MCP `_meta`，然後是 `OMNIROUTE_MCP_SCOPES`。

#### 存取權杖範圍

`oma_live_…` 權杖 (`src/lib/accessTokens/scopes.ts`) 攜帶 `read`、`write` 或 `admin`。`scopeSatisfies` 是一個等級：`admin` 涵蓋 `write` 和 `read`，而 `write` 涵蓋 `read`。未知範圍不涵蓋任何內容。

`evaluateAccessTokenAuth` (`src/server/authz/accessTokenAuth.ts`) 將該等級與 `inferRequiredScope` (`src/server/authz/accessScopes.ts`) 進行比較：

- `GET`、`HEAD` 和 `OPTIONS` 需要 `read`。
- 所有其他方法都需要 `write`。
- `ADMIN_SCOPE_PREFIXES` 中的路徑對每個方法都需要 `admin`。`/api/mcp` 在該列表中，因此 `write` 存取權杖仍然無法呼叫 MCP HTTP 介面。
- `ADMIN_MUTATION_PREFIXES` 中的路徑僅對變動需要 `admin`。

`PATCH /api/keys/{id}` 是一個變動操作，且不在那些管理員列表中，因此 `read` 權杖會收到 403 錯誤，訊息為 `Access token scope 'read' is insufficient; 'write' required.`。`write` 或 `admin` 存取權杖符合該路由。儀表板 JWT、loopback CLI machine-id 權杖，以及具有 `manage` 或 `admin` 權限的 API 金鑰會走其他分支，且不受此等級限制。

通過 `/api/mcp` 的 `scopeSatisfies` 的存取權杖僅表示已通過管理關卡。工具呼叫仍會針對 API 金鑰範圍執行 `scopeMatches`。存取權杖等級不是 `scopeMatches` 的輸入。

### MCP 工具範圍

範圍強制執行集中在 `open-sse/mcp-server/scopeEnforcement.ts` 中。每個工具都需要特定的範圍：

| 範圍                  | 工具                                                                                                                                                                                                                                                                            |
| :-------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `read:health`         | `get_health`, `get_provider_metrics`, `simulate_route`, `explain_route`, `best_combo_for_task`, `db_health_check`                                                                                                                                                               |
| `read:combos`         | `list_combos`, `get_combo_metrics`, `simulate_route`, `best_combo_for_task`, `test_combo`                                                                                                                                                                                       |
| `write:combos`        | `switch_combo`, `set_routing_strategy`                                                                                                                                                                                                                                          |
| `read:quota`          | `check_quota`                                                                                                                                                                                                                                                                   |
| `read:usage`          | `cost_report`, `get_session_snapshot`, `explain_route`                                                                                                                                                                                                                          |
| `read:models`         | `list_models_catalog`                                                                                                                                                                                                                                                           |
| `execute:completions` | `route_request`, `test_combo`                                                                                                                                                                                                                                                   |
| `execute:search`      | `web_search`, `x_search`, `web_fetch`                                                                                                                                                                                                                                           |
| `write:budget`        | `set_budget_guard`                                                                                                                                                                                                                                                              |
| `write:resilience`    | `set_resilience_profile`, `db_health_check`                                                                                                                                                                                                                                     |
| `pricing:write`       | `sync_pricing`                                                                                                                                                                                                                                                                  |
| `read:cache`          | `cache_stats`                                                                                                                                                                                                                                                                   |
| `write:cache`         | `cache_flush`                                                                                                                                                                                                                                                                   |
| `read:compression`    | `compression_status`, `list_compression_combos`, `compression_combo_stats`                                                                                                                                                                                                      |
| `write:compression`   | `compression_configure`, `set_compression_engine`                                                                                                                                                                                                                               |
| `read:proxies`        | `oneproxy_fetch`, `oneproxy_rotate`, `oneproxy_stats`                                                                                                                                                                                                                           |
| `read:notion`         | `notion_search`, `notion_get_page`, `notion_list_block_children`, `notion_query_database`, `notion_get_database`                                                                                                                                                                |
| `write:notion`        | `notion_append_blocks`                                                                                                                                                                                                                                                          |
| `read:memory`         | `memory_search`                                                                                                                                                                                                                                                                 |
| `write:memory`        | `memory_add`, `memory_clear`                                                                                                                                                                                                                                                    |
| `read:skills`         | `skills_list`, `skills_executions`                                                                                                                                                                                                                                              |
| `write:skills`        | `skills_enable`                                                                                                                                                                                                                                                                 |
| `execute:skills`      | `skills_execute`                                                                                                                                                                                                                                                                |
| `read:catalog`        | `agent_skills_list`, `agent_skills_get`, `agent_skills_coverage`                                                                                                                                                                                                                |
| `read:tools`          | `omniroute_tool_search`                                                                                                                                                                                                                                                         |
| `read:radar`          | `omniroute_radar_catalog`                                                                                                                                                                                                                                                       |
| `read:gamification`   | `gamification_profile`, `gamification_rank`, `gamification_leaderboard`, `gamification_badges`, `gamification_servers`, `gamification_anomalies`                                                                                                                                |
| `write:gamification`  | 寫入：遊戲化 — `gamification_invite`（遊戲化邀請），`gamification_transfer`（遊戲化轉移）                                                                                                                                                                                       |
| `read:plugins`        | 讀取：外掛程式 — `plugin_list`（外掛程式列表），`plugin_executions`（外掛程式執行）                                                                                                                                                                                             |
| `write:plugins`       | 寫入：外掛程式 — `plugin_scan`（外掛程式掃描），`plugin_install`（外掛程式安裝），`plugin_uninstall`（外掛程式解除安裝），`plugin_activate`（外掛程式啟用），`plugin_deactivate`（外掛程式停用），`plugin_configure`（外掛程式配置）                                            |
| `read:obsidian`       | 讀取：Obsidian — 13 個讀取工具 — `obsidian_list_vault`（列出儲存庫），`obsidian_read_note`（讀取筆記），`obsidian_search_simple`（簡單搜尋），`obsidian_search_structured`（結構化搜尋），`obsidian_get_periodic_note`（取得週期性筆記），`obsidian_sync_status`（同步狀態），… |
| `write:obsidian`      | 寫入：Obsidian — 9 個寫入工具 — `obsidian_write_note`（寫入筆記），`obsidian_append_note`（附加筆記），`obsidian_patch_note`（修補筆記），`obsidian_move_note`（移動筆記），`obsidian_delete_note`（刪除筆記），`obsidian_sync_trigger`（觸發同步），…                          |
| `read:local-corpus`   | 讀取：本地語料庫 — `local_corpus_search`（本地語料庫搜尋），`local_corpus_read`（本地語料庫讀取），`local_corpus_status`（本地語料庫狀態）                                                                                                                                      |

通配符範圍受到支援：`read:*` 授予所有讀取範圍，`*` 授予完整存取權限。

### `mcp:connect` — 窄化路由功能 (#7895)

從非迴路介面存取 HTTP/SSE MCP 傳輸 (`/api/mcp/*`) 需要 `/api/mcp/` 的 LOCAL_ONLY 特殊豁免 (請參閱 `docs/security/ROUTE_GUARD_TIERS.md`)。過去，該豁免僅接受完整的 `manage`/`admin` 範圍 API 金鑰 — 對於僅需與 MCP 通訊的呼叫者來說，這範圍過於廣泛。`src/shared/constants/managementScopes.ts` 現在匯出 `MCP_CONNECT_SCOPE = "mcp:connect"`：這是一個附加的、窄化的範圍（與 `SELF_USAGE_SCOPE` 具有相同先例），它**僅**授權 `src/server/authz/policies/management.ts` 中的 `/api/mcp/` 繞過 — 它不授予任何其他管理路由存取權限，並被刻意排除在 `MANAGEMENT_API_KEY_SCOPES` 之外。持有 `manage`/`admin` 的金鑰仍然可以不變地通過豁免；`mcp:connect` 是遠端僅限 MCP 呼叫者的較低權限替代方案，透過 `hasMcpConnectOrManageScope()` 進行檢查。

### 每金鑰 HTTP 範圍綁定 (#7895)

透過 HTTP/SSE，`open-sse/mcp-server/httpTransport.ts` 現在透過 `resolveMcpCallerAuthInfo()` (`open-sse/mcp-server/httpAuthContext.ts`) 解析呼叫者的實際 `api_keys.scopes`，並將其傳遞給 MCP SDK 的 `transport.handleRequest(req, { authInfo })`，因此到達每個工具呼叫的 `extra.authInfo.scopes` 反映了 Bearer 金鑰本身的範圍。`scopeEnforcement.ts` 的 `resolveCallerScopeContext()` 已經將 `authInfo` 的優先級置於 `_meta` 和 `OMNIROUTE_MCP_SCOPES` 環境變數回退之上 — 這只是填充了第一個、最高優先級的來源，該來源以前未透過 HTTP 提供。當沒有 API 金鑰解析時（無標頭，無效金鑰），`authInfo` 保持 `undefined`，並且解析會不變地回退到現有的 `meta`/環境變數鏈。這**不會**改變 `OMNIROUTE_MCP_ENFORCE_SCOPES` 的預設值 — 強制執行仍然必須明確啟用；此更改僅在啟用後使每金鑰路徑優先。stdio 沒有每個呼叫者的身份（請參閱 `mcpCallerIdentity.ts`），因此不受影響 — 它仍然依賴於 `_meta`/環境變數回退鏈。

## 環境變數

| 變數                                    | 預設值                          | 用途                                                                             |
| :-------------------------------------- | :------------------------------ | :------------------------------------------------------------------------------- |
| `OMNIROUTE_BASE_URL`                    | `http://localhost:20128`        | MCP 伺服器呼叫 OmniRoute 內部 API 時使用的基礎 URL                               |
| `OMNIROUTE_API_KEY`                     | （空）                          | 以 `Authorization: Bearer` 形式轉送至內部 API 呼叫的 API 金鑰                    |
| `OMNIROUTE_MCP_ENFORCE_SCOPES`          | `false`（只有 `"true"` 會啟用） | 啟用後，缺少範圍將拒絕工具呼叫，並在稽核記錄中記錄 `scope_denied:<reason>`       |
| `OMNIROUTE_MCP_SCOPES`                  | （空）                          | 以逗號分隔的範圍允許清單，預設視為「可用」（當呼叫者未提供自己的範圍時使用）     |
| `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS`   | （未設定 = 開啟）               | 設為 `0/false/off/no` 時，停用註冊階段的 MCP 描述壓縮                            |
| `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION` | （未設定 = 開啟）               | 上述相同切換設定的替代別名                                                       |
| `OMNIROUTE_MCP_FETCH_TIMEOUT_MS`        | `10000`                         | 內部管理讀取作業（健康狀態、韌性、組合、配額、使用量）的中止時間限制             |
| `OMNIROUTE_MCP_UPSTREAM_TIMEOUT_MS`     | `60000`                         | 等待提供者回應之操作（`route_request`、`web_search`、`web_fetch`）的中止時間限制 |
| `MCP_TOOL_DENY`                         | （未設定 = 不篩選）             | 以逗號分隔、要從 `tools/list` 中移除的工具名稱（減少工具基數 — 請參閱下文）      |
| `MCP_TOOL_ALLOW`                        | （未設定 = 不篩選）             | 以逗號分隔、要獨家保留的工具名稱（允許清單模式 — 請參閱下文）                    |
| `DATA_DIR`                              | `~/.omniroute`                  | 活動訊號檔案會寫入 `${DATA_DIR}/runtime/mcp-heartbeat.json`                      |

---

## 描述壓縮

MCP 工具、提示與資源登錄可在註冊／列出時壓縮描述，以減少暴露給用戶端的中繼資料量（從而降低提示內容的上下文成本）。實作位於 `open-sse/mcp-server/descriptionCompressor.ts`，並透過 `createMcpServer()` 內的 `compressMcpRegistryMetadata` 整合至 MCP 伺服器。

- 壓縮會使用 Caveman 規則集（`getRulesForContext("all", "full")`）處理描述文字，並擷取需保留的區塊（程式碼範圍、圍欄式區塊等），因此不會變更結構化內容。
- 可透過 `key_value` 設定資料表中的 `compression.mcpDescriptionCompressionEnabled` 值，針對各部署切換此功能（預設：啟用）— 在 UI 中顯示為 **分析 → MCP 描述壓縮**。
- 可透過 `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS=false` 或 `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION=false`，在整個處理程序範圍內切換此功能。
- 即時統計資料會透過 `omniroute_compression_status` 下的 `analytics.mcpDescriptionCompression` 呈現，並標記為 `source: "mcp_metadata_estimate"`，以便與實際的提供者用量收據區分。

---

## 工具基數縮減 (F4.3)

描述壓縮會縮減每個工具的中繼資料；**工具基數縮減**則更進一步，減少實際公告的工具_數量_。在 `tools/list` 資訊清單中公布較少的工具，可降低用戶端模型每次請求為工具目錄支付的權杖成本（「第 5 層」壓縮）。其實作是位於 `open-sse/mcp-server/toolCardinality.ts` 中的純無狀態篩選器 (`reduceToolManifest`)，並已整合至 `createMcpServer()` (`open-sse/mcp-server/server.ts`) 的註冊迴圈中。

**選擇性啟用，預設關閉。** 只有在設定了兩個環境變數中的至少一個時，篩選器才會執行；若兩者皆未設定，則會原樣公告全部 110 個工具。

| 變數             | 模式                                                         |
| :--------------- | :----------------------------------------------------------- |
| `MCP_TOOL_DENY`  | 黑名單——以逗號分隔的工具名稱，一律從 `tools/list` 中移除     |
| `MCP_TOOL_ALLOW` | 允許清單——以逗號分隔的工具名稱；僅保留這些工具，其餘全部移除 |

`deny` 的優先順序高於 `allow`。名稱以逗號分隔、會移除前後空白，並忽略空白項目。範例：

```bash
# 從目錄中移除兩個工具
MCP_TOOL_DENY="omniroute_get_health,omniroute_list_combos" omniroute --mcp

# 僅公告路由與配額工具（允許清單模式）
MCP_TOOL_ALLOW="omniroute_route_request,omniroute_check_quota" omniroute --mcp
```

**移除已篩選工具的方式：** 註冊一律會成功；若設定檔拒絕某個工具，則會在 MCP SDK 控制代碼上對其呼叫 `.disable()`，使其永遠不會出現在 `tools/list` 中，但配線仍保持完整（可乾淨地啟用／停用，無須重新註冊）。設定檔剖析器為 `readMcpToolProfileFromEnv(process.env)`；當兩個變數皆為空時，會傳回 `null`（不進行篩選）。

`reduceToolManifest` 背後更完整的 `ToolProfile` 結構也支援範圍交集篩選（`allowScopes`，採用 `read:*` 樣式的萬用字元比對），以及具確定性的 `maxTools` 上限；但這兩個選項需要在註冊時取得完整資訊清單，因此目前**不會**透過環境變數公開（後續已規劃加入 `tools/list` 層級的掛鉤）。可使用 `estimateManifestTokens()` 比較縮減前後的資訊清單權杖成本。

---

## 執行時心跳 (Runtime Heartbeat)

stdio 傳輸層每 5 秒將存活狀態持久化到 `${DATA_DIR}/runtime/mcp-heartbeat.json`。儀表板 (`/api/mcp/status`) 讀取此檔案以及 PID 存活狀態以推導出 `online` 狀態。HTTP 傳輸層則從程序內的 `getMcpHttpStatus()` 報告狀態（不寫入檔案）。

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

## 稽核記錄

每次工具呼叫都會由 `open-sse/mcp-server/audit.ts` 記錄至 SQLite 的 `mcp_tool_audit` 資料表：

- 工具名稱、引數（依各工具的 `auditLevel` 進行雜湊／截斷）、結果
- 持續時間（毫秒）、成功／失敗旗標、錯誤訊息（適用時）
- API 金鑰雜湊、時間戳記
- 範圍拒絕會記錄為 `scope_denied:<reason>`，並附上缺少的範圍清單

可使用儀表板或 `/api/mcp/audit` 與 `/api/mcp/audit/stats` REST 端點檢視近期呼叫。

---

## 檔案

| 檔案                                                                     | 用途                                                |
| :----------------------------------------------------------------------- | :-------------------------------------------------- |
| `open-sse/mcp-server/server.ts`                                          | MCP 伺服器工廠、stdio 進入點、具範圍限制的工具註冊  |
| `open-sse/mcp-server/httpTransport.ts`                                   | SSE + Streamable HTTP 傳輸（工作階段管理）          |
| `open-sse/mcp-server/scopeEnforcement.ts`                                | 工具範圍評估與呼叫者解析                            |
| `open-sse/mcp-server/audit.ts`                                           | 工具呼叫稽核記錄（`mcp_tool_audit`）                |
| `open-sse/mcp-server/runtimeHeartbeat.ts`                                | stdio 活動訊號寫入器（`mcp-heartbeat.json`）        |
| `open-sse/mcp-server/descriptionCompressor.ts`                           | 工具／提示／資源登錄檔的描述壓縮                    |
| `open-sse/mcp-server/schemas/tools.ts`                                   | Zod 結構描述 + 工具登錄檔（`MCP_TOOLS`，45 個項目） |
| `open-sse/mcp-server/tools/advancedTools.ts`                             | 第 2 階段 + 快取 + 1proxy 工具處理常式              |
| `open-sse/mcp-server/tools/compressionTools.ts`                          | 壓縮工具處理常式                                    |
| `open-sse/mcp-server/tools/memoryTools.ts`                               | 記憶體工具定義（3 個工具）                          |
| `open-sse/mcp-server/tools/skillTools.ts`                                | 技能工具定義（4 個工具）                            |
| `open-sse/mcp-server/tools/notionTools.ts`                               | Notion 上下文來源工具定義（6 個工具）               |
| `open-sse/mcp-server/tools/gamificationTools.ts`                         | 遊戲化工具定義（8 個工具）                          |
| `open-sse/mcp-server/tools/pluginTools.ts`                               | 外掛註冊與管理工具（8 個工具）                      |
| `src/app/api/mcp/status/route.ts`                                        | `/api/mcp/status` 端點                              |
| `src/app/api/mcp/tools/route.ts`                                         | `/api/mcp/tools` 端點                               |
| `src/app/api/mcp/sse/route.ts`                                           | `/api/mcp/sse` SSE 傳輸路由                         |
| `src/app/api/mcp/stream/route.ts`                                        | `/api/mcp/stream` Streamable HTTP 傳輸路由          |
| `src/app/api/mcp/audit/route.ts`                                         | `/api/mcp/audit` 稽核記錄查詢                       |
| `src/app/api/mcp/audit/stats/route.ts`                                   | `/api/mcp/audit/stats` 彙總稽核指標                 |
| `src/lib/notion/api.ts`                                                  | Notion REST API 用戶端（重試、逾時、錯誤分類）      |
| `src/lib/db/notion.ts`                                                   | Notion 權杖持久化（`key_value` 資料表）             |
| `src/app/api/settings/notion/route.ts`                                   | Notion 設定 API（GET/POST/DELETE）                  |
| `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx` | Notion 權杖管理 UI                                  |
| `tests/unit/notion-api.test.ts`                                          | Notion API 用戶端測試（7）                          |
| `tests/unit/notion-tools.test.ts`                                        | Notion 工具範圍強制執行測試（10）                   |
| `tests/unit/db/notion.test.mjs`                                          | Notion DB 模組測試（3）                             |
