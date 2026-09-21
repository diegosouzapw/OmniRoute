# Notion Context Source (中文 (繁體))

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/NOTION_CONTEXT.md) · 🇪🇹 [am](../../../am/docs/frameworks/NOTION_CONTEXT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/NOTION_CONTEXT.md) · 🇦🇿 [az](../../../az/docs/frameworks/NOTION_CONTEXT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/NOTION_CONTEXT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/NOTION_CONTEXT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/NOTION_CONTEXT.md) · 🇩🇰 [da](../../../da/docs/frameworks/NOTION_CONTEXT.md) · 🇩🇪 [de](../../../de/docs/frameworks/NOTION_CONTEXT.md) · 🇬🇷 [el](../../../el/docs/frameworks/NOTION_CONTEXT.md) · 🇪🇸 [es](../../../es/docs/frameworks/NOTION_CONTEXT.md) · 🇪🇪 [et](../../../et/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/NOTION_CONTEXT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/NOTION_CONTEXT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇱 [he](../../../he/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/NOTION_CONTEXT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/NOTION_CONTEXT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/NOTION_CONTEXT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇩 [id](../../../id/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇹 [it](../../../it/docs/frameworks/NOTION_CONTEXT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/NOTION_CONTEXT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/NOTION_CONTEXT.md) · 🇰🇭 [km](../../../km/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/NOTION_CONTEXT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/NOTION_CONTEXT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/NOTION_CONTEXT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/NOTION_CONTEXT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/NOTION_CONTEXT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/NOTION_CONTEXT.md) · 🇲🇲 [my](../../../my/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇴 [no](../../../no/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [or](../../../or/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/NOTION_CONTEXT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/NOTION_CONTEXT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/NOTION_CONTEXT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/NOTION_CONTEXT.md) · 🇱🇰 [si](../../../si/docs/frameworks/NOTION_CONTEXT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/NOTION_CONTEXT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/NOTION_CONTEXT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/NOTION_CONTEXT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/NOTION_CONTEXT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [te](../../../te/docs/frameworks/NOTION_CONTEXT.md) · 🇹🇭 [th](../../../th/docs/frameworks/NOTION_CONTEXT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/NOTION_CONTEXT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/NOTION_CONTEXT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/NOTION_CONTEXT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/NOTION_CONTEXT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/NOTION_CONTEXT.md)

---

> **真實來源：** `src/lib/notion/api.ts`（REST 用戶端）、`src/lib/db/notion.ts`
> （權杖持久化）、`open-sse/mcp-server/tools/notionTools.ts`（6 個 MCP 工具）、
> `src/app/api/settings/notion/route.ts`（設定 API）。工具註冊與範圍
> 接線位於 `open-sse/mcp-server/server.ts`。

## 功能說明

OmniRoute 可將 **Notion** 工作區連接為**內容來源**，也就是代理程式能透過內建 MCP 伺服器存取的讀寫知識庫。設定 Notion
整合權杖後，MCP 工具可讓 LLM 搜尋頁面與資料庫、讀取頁面內容和區塊樹狀結構、使用篩選條件／排序查詢資料庫，以及附加新
區塊。所有操作都會透過 OmniRoute 代理（並具備重試、逾時及錯誤分類機制），
因此模型絕不會直接接觸 Notion API。

此整合是官方 Notion REST API
（`https://api.notion.com/v1`、`Notion-Version: 2026-03-11`）的一層精簡且經過強化的包裝。用戶端
（`src/lib/notion/api.ts`）增加了：

- 針對 `429` 與 `5xx` 的**指數退避重試**（最多嘗試 3 次）。
- 透過 `AbortController` 實作的 **55 秒請求逾時**。
- **類型化錯誤分類** — `NotionAuthError`（401/403）、
  `NotionNotFoundError`（404）、`NotionRateLimitError`（429，遵循 `retry after`
  提示）、`NotionValidationError`（400/409）、`NotionServerError`（5xx）、
  `NotionTimeoutError`。
- **訊息清理**，在顯示訊息前移除類似堆疊追蹤的片段。

## 設定

Notion 權杖**沒有對應的環境變數**，而是透過
`src/lib/db/notion.ts` 儲存在 SQLite `key_value` 資料表中（命名空間 `notion`，鍵 `integration_token`）。請從端點
儀表板的**內容來源**分頁（`ObsidianSourceCard` 的同層元件 `NotionSourceCard`）進行設定，或透過設定 REST API 設定。

> [!NOTE]
> 此權杖是 **Notion 內部整合權杖**。請在
> <https://www.notion.com/my-integrations> 建立整合，然後將希望
> OmniRoute 存取的頁面／資料庫與該整合共用（Notion 的權限模型以共用為基礎，
> 並非涵蓋整個工作區）。

### 透過 REST 設定

```bash
# 儲存並驗證整合權杖（POST 會透過執行測試搜尋來驗證）
curl -X POST http://localhost:20128/api/settings/notion \
  -H "Content-Type: application/json" \
  -d '{"token":"ntn_xxx"}'

# 檢查連線狀態
curl http://localhost:20128/api/settings/notion

# 中斷連線（清除已儲存的權杖）
curl -X DELETE http://localhost:20128/api/settings/notion
```

這三種方法都需要儀表板驗證（`isAuthenticated`）。執行 `POST` 時，
OmniRoute 會儲存權杖，並立即執行只傳回 1 筆結果的測試搜尋；若 Notion
傳回錯誤物件，系統會清除權杖，且呼叫會以 `400` 失敗。

## MCP 工具（6 個）

定義於 `open-sse/mcp-server/tools/notionTools.ts`。權杖會在呼叫
時透過 `getNotionToken()` 解析；若尚未設定權杖，工具會擲回
`"Notion integration token not configured. Set it in Settings > Context Sources."`

| 工具                         | 範圍           | 說明                                                                   |
| ---------------------------- | -------------- | ---------------------------------------------------------------------- |
| `notion_search`              | `read:notion`  | 依文字查詢搜尋頁面與資料庫（傳回標題、ID、URL）。支援分頁。            |
| `notion_get_page`            | `read:notion`  | 依頁面 ID 取得頁面內容與中繼資料。                                     |
| `notion_list_block_children` | `read:notion`  | 列出區塊或頁面的所有子區塊（區塊樹狀結構）。支援分頁。                 |
| `notion_query_database`      | `read:notion`  | 使用可選的 `filter` + `sorts`（Notion API 格式）查詢資料庫。支援分頁。 |
| `notion_get_database`        | `read:notion`  | 依 ID 取得資料庫的結構描述／中繼資料。                                 |
| `notion_append_blocks`       | `write:notion` | 將子區塊附加至現有區塊或頁面（每個請求最多 100 個區塊）。              |

### 輸入參數

- `notion_search` — `query`（1–500 個字元）、`pageSize`（1–100，預設為 20）、
  `startCursor`（可選）。
- `notion_get_page` — `pageId`（32 個字元的十六進位值或 UUID）。
- `notion_list_block_children` — `blockId`、`pageSize`（1–100，預設為 50）、
  `startCursor`（可選）。
- `notion_query_database` — `databaseId`、`filter`（可選，Notion 篩選條件格式）、
  `sorts`（可選陣列）、`pageSize`（1–100，預設為 50）、`startCursor`（可選）。
- `notion_get_database` — `databaseId`。
- `notion_append_blocks` — `blockId`、`children`（區塊物件陣列）、
  `after`（可選位置）。

### 範圍

讀取工具需要 `read:notion`，寫入工具則需要 `write:notion`。
只有當 `OMNIROUTE_MCP_ENFORCE_SCOPES=true` 時，才會由
`open-sse/mcp-server/server.ts` 中的 `withScopeEnforcement()` 強制執行範圍限制；
呼叫端允許的範圍來自 `OMNIROUTE_MCP_SCOPES`（以逗號分隔），或已驗證 API 金鑰的範圍內容。完整的範圍模型請參閱 [MCP-SERVER.md](./MCP-SERVER.md)。

## 端點

| 方法     | 路徑                   | 用途                             |
| -------- | ---------------------- | -------------------------------- |
| `GET`    | `/api/settings/notion` | 傳回 `{ connected, hasToken }`。 |
| `POST`   | `/api/settings/notion` | 儲存並驗證整合權杖。             |
| `DELETE` | `/api/settings/notion` | 中斷連線（清除已儲存的權杖）。   |

> 這些是儀表板設定路由。**沒有公開的 `/v1` Notion 代理
> 端點** — Notion 僅能透過上述 MCP 工具存取。

## 使用案例

- **以知識為依據的回答** — 讓代理先使用 `notion_search` 搜尋工作區，並透過
  `notion_get_page` 取得排名最高的結果後再回答，以便回應能引用真實的內部文件。
- **以資料庫為基礎的工作流程** — 使用 `notion_query_database` 搭配篩選條件與
  排序查詢任務／CRM 資料庫，然後彙整資料列或進行分流。
- **回寫／記錄** — 使用 `notion_append_blocks` 將會議筆記、執行摘要或代理輸出
  附加至現有頁面（僅限附加；不進行破壞性編輯）。
- **結構探索** — 使用 `notion_list_block_children` 逐層瀏覽頁面的區塊樹，
  或在查詢資料庫前使用 `notion_get_database` 探索其屬性結構描述。

## 相關資訊

- [MCP 伺服器](./MCP-SERVER.md) — 傳輸方式、範圍強制執行及完整工具清單。
- [Obsidian 上下文來源](./OBSIDIAN_CONTEXT.md) — 另一個內建的上下文來源。
- [記憶系統](./MEMORY.md) — 持久化的對話記憶（互補的上下文層，
  會自動注入，而非透過工具擷取）。
