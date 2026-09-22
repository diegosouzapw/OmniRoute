# Providers — Claude Web (中文 (繁體))

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CLAUDE_WEB.md) · 🇪🇹 [am](../../../am/docs/providers/CLAUDE_WEB.md) · 🇸🇦 [ar](../../../ar/docs/providers/CLAUDE_WEB.md) · 🇦🇿 [az](../../../az/docs/providers/CLAUDE_WEB.md) · 🇧🇬 [bg](../../../bg/docs/providers/CLAUDE_WEB.md) · 🇧🇩 [bn](../../../bn/docs/providers/CLAUDE_WEB.md) · 🇨🇿 [cs](../../../cs/docs/providers/CLAUDE_WEB.md) · 🇩🇰 [da](../../../da/docs/providers/CLAUDE_WEB.md) · 🇩🇪 [de](../../../de/docs/providers/CLAUDE_WEB.md) · 🇬🇷 [el](../../../el/docs/providers/CLAUDE_WEB.md) · 🇪🇸 [es](../../../es/docs/providers/CLAUDE_WEB.md) · 🇪🇪 [et](../../../et/docs/providers/CLAUDE_WEB.md) · 🇮🇷 [fa](../../../fa/docs/providers/CLAUDE_WEB.md) · 🇫🇮 [fi](../../../fi/docs/providers/CLAUDE_WEB.md) · 🇫🇷 [fr](../../../fr/docs/providers/CLAUDE_WEB.md) · 🇮🇪 [ga](../../../ga/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [gu](../../../gu/docs/providers/CLAUDE_WEB.md) · 🇳🇬 [ha](../../../ha/docs/providers/CLAUDE_WEB.md) · 🇮🇱 [he](../../../he/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [hi](../../../hi/docs/providers/CLAUDE_WEB.md) · 🇭🇷 [hr](../../../hr/docs/providers/CLAUDE_WEB.md) · 🇭🇺 [hu](../../../hu/docs/providers/CLAUDE_WEB.md) · 🇦🇲 [hy](../../../hy/docs/providers/CLAUDE_WEB.md) · 🇮🇩 [id](../../../id/docs/providers/CLAUDE_WEB.md) · 🇳🇬 [ig](../../../ig/docs/providers/CLAUDE_WEB.md) · 🇮🇹 [it](../../../it/docs/providers/CLAUDE_WEB.md) · 🇯🇵 [ja](../../../ja/docs/providers/CLAUDE_WEB.md) · 🇬🇪 [ka](../../../ka/docs/providers/CLAUDE_WEB.md) · 🇰🇭 [km](../../../km/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [kn](../../../kn/docs/providers/CLAUDE_WEB.md) · 🇰🇷 [ko](../../../ko/docs/providers/CLAUDE_WEB.md) · 🇱🇹 [lt](../../../lt/docs/providers/CLAUDE_WEB.md) · 🇱🇻 [lv](../../../lv/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [ml](../../../ml/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [mr](../../../mr/docs/providers/CLAUDE_WEB.md) · 🇲🇾 [ms](../../../ms/docs/providers/CLAUDE_WEB.md) · 🇲🇹 [mt](../../../mt/docs/providers/CLAUDE_WEB.md) · 🇲🇲 [my](../../../my/docs/providers/CLAUDE_WEB.md) · 🇳🇵 [ne](../../../ne/docs/providers/CLAUDE_WEB.md) · 🇳🇱 [nl](../../../nl/docs/providers/CLAUDE_WEB.md) · 🇳🇴 [no](../../../no/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [or](../../../or/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [pa](../../../pa/docs/providers/CLAUDE_WEB.md) · 🇵🇭 [phi](../../../phi/docs/providers/CLAUDE_WEB.md) · 🇵🇱 [pl](../../../pl/docs/providers/CLAUDE_WEB.md) · 🇵🇹 [pt](../../../pt/docs/providers/CLAUDE_WEB.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CLAUDE_WEB.md) · 🇷🇴 [ro](../../../ro/docs/providers/CLAUDE_WEB.md) · 🇷🇺 [ru](../../../ru/docs/providers/CLAUDE_WEB.md) · 🇱🇰 [si](../../../si/docs/providers/CLAUDE_WEB.md) · 🇸🇰 [sk](../../../sk/docs/providers/CLAUDE_WEB.md) · 🇸🇮 [sl](../../../sl/docs/providers/CLAUDE_WEB.md) · 🇷🇸 [sr](../../../sr/docs/providers/CLAUDE_WEB.md) · 🇸🇪 [sv](../../../sv/docs/providers/CLAUDE_WEB.md) · 🇰🇪 [sw](../../../sw/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [ta](../../../ta/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [te](../../../te/docs/providers/CLAUDE_WEB.md) · 🇹🇭 [th](../../../th/docs/providers/CLAUDE_WEB.md) · 🇹🇷 [tr](../../../tr/docs/providers/CLAUDE_WEB.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CLAUDE_WEB.md) · 🇵🇰 [ur](../../../ur/docs/providers/CLAUDE_WEB.md) · 🇺🇿 [uz](../../../uz/docs/providers/CLAUDE_WEB.md) · 🇻🇳 [vi](../../../vi/docs/providers/CLAUDE_WEB.md) · 🇳🇬 [yo](../../../yo/docs/providers/CLAUDE_WEB.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CLAUDE_WEB.md)

---

## `claude-web`

`claude-web` 透過已驗證的 `claude.ai` 瀏覽器工作階段傳送 OpenAI 格式的聊天請求。執行器會正規化所提供的 Cookie、解析一個已驗證的組織、準備對話狀態、選擇直接或瀏覽器傳輸方式，並嚴格轉譯上游 SSE 回應。協調邏輯位於 `open-sse/executors/claude-web.ts:320`。

> **第一次使用 Web Cookie 提供者嗎？**
>
> 在遵循本提供者專用指南之前，請先閱讀 **`docs/getting-started/WEB-COOKIE-GUIDE.md`**，以瞭解一般設定流程、驗證指引、限制及疑難排解方式。

### 模型目錄

提供者登錄目前僅公開以下七個靜態模型 ID
（`open-sse/config/providers/registry/claude/web/index.ts:11`）：

| 模型 ID                     | 顯示名稱                    |
| --------------------------- | --------------------------- |
| `claude-fable-5`            | Claude Fable 5（網頁版）    |
| `claude-opus-4-8`           | Claude Opus 4.8（網頁版）   |
| `claude-sonnet-5`           | Claude Sonnet 5（網頁版）   |
| `claude-haiku-4-5-20251001` | Claude Haiku 4.5（網頁版）  |
| `claude-opus-4-7`           | Claude Opus 4.7（網頁版）   |
| `claude-opus-4-6`           | Claude Opus 4.6（網頁版）   |
| `claude-sonnet-4-6`         | Claude Sonnet 4.6（網頁版） |

此提供者尚未實作動態模型探索。以上清單即為執行階段目錄。

### 憑證與組織解析

請提供完整的 `claude.ai` Cookie 標頭或單獨的工作階段值。單獨的值會被正規化為 `sessionKey`；若提供其他 Cookie，則會予以保留。執行器透過 `cookie` 或 `apiKey` 接受 Cookie，並從連線資料讀取選用的 `deviceId` 與 `orgId` 值
（`open-sse/executors/claude-web.ts:72`）。

若未提供 `orgId`，執行器會呼叫 `GET https://claude.ai/api/organizations`，並使用已驗證 Claude Web 工作階段傳回的第一個組織
（`open-sse/executors/claude-web.ts:141`）。若未傳回有效組織，執行器會採取封閉式失敗；遭拒絕的工作階段授權會回報為 401，並會區分 Cloudflare 挑戰與驗證失敗。

### 對話操作

選用的頂層 `claude_web` 物件採嚴格模式。未知欄位將被拒絕。其接受的欄位定義於 `open-sse/executors/claude-web/session.ts:50`：

| 欄位                  | 意義                                        |
| --------------------- | ------------------------------------------- |
| `operation`           | 預設為 `completion`；重試輪次請使用 `retry` |
| `conversation_id`     | 現有對話的明確 UUID                         |
| `parent_message_uuid` | 父助理訊息的明確 UUID                       |
| `timezone`            | 有效的 IANA 時區名稱                        |
| `locale`              | 結構有效的地區設定                          |
| `tool_states`         | 選用的帳戶工具狀態陣列，上限為 128 個項目   |

準備完成的請求會使用兩個上游端點之一
（`open-sse/executors/claude-web.ts:203`）：

- 新輪次或後續輪次會傳送至
  `POST https://claude.ai/api/organizations/{orgId}/chat_conversations/{conversationId}/completion`。
- 重試會傳送至
  `POST https://claude.ai/api/organizations/{orgId}/chat_conversations/{conversationId}/retry_completion`。

新輪次包含 `create_conversation_params`。快取或明確連結的後續輪次包含 `parent_message_uuid`，並省略 `create_conversation_params`。重試同時需要對話和父訊息狀態，且不傳送提示詞
（`open-sse/executors/claude-web/session.ts:254`）。新對話會在已驗證的 UI 中開啟 `/new`；快取或明確連結的後續輪次則會開啟相應的對話頁面
（`open-sse/executors/claude-web/session.ts:324`）。

對話狀態儲存在記憶體內快取中，並以 SHA-256 帳戶範圍和呼叫端的規範化逐字稿作為索引鍵。項目會在 30 分鐘後到期，且快取上限為 5,000 個項目
（`open-sse/executors/claude-web/session.ts:12`）。只有在嚴格串流剖析器觀察到 `message_stop` 後，狀態才會被提交；程序重新啟動時會捨棄狀態。若快取未命中，多訊息請求會被序列化為單一復原提示詞，而不會無聲地捨棄先前的訊息。

地區設定與時區採用以下優先順序：請求的 `claude_web` 值、連線值、執行階段值，最後地區設定使用 `en-US`，時區則使用 `UTC`
（`open-sse/executors/claude-web/session.ts:218`）。

### 工具與請求承載內容

直接請求只會轉換呼叫端所提供且結構有效的 OpenAI 函式工具。不會虛構靜態的預設工具清單
（`open-sse/executors/claude-web/payload.ts:102`）。

瀏覽器請求則會擷取已驗證 UI 的請求，並保留其帳戶工具、工具狀態及個人化樣式。準備完成的對話、模型、推理、提示詞及訊息 UUID 欄位仍會覆寫擷取到的請求
（`open-sse/executors/claude-web/browserTransport.ts:175`）。瀏覽器範本的範圍由帳戶、組織、Cookie、地區設定及時區的雜湊決定，並會在 30 分鐘後到期
（`open-sse/executors/claude-web/browserTransport.ts:11`、
`open-sse/executors/claude-web/browserTransport.ts:158`）。當直接請求未包含呼叫端工具時，可重複使用該範圍內的範本；明確提供的呼叫端工具具有優先權
（`open-sse/executors/claude-web/browserTransport.ts:214`）。

### 傳輸方式選擇

預設路徑為 `sendClaudeWebDirect()`，它會使用已設定的 Chrome 146 設定檔和所提供的 Cookie 呼叫 `tlsFetchClaude()`（`open-sse/services/claudeTlsClient.ts:23`）。它不會啟動求解器，也不會產生替代 Cookie。

將 `WEB_COOKIE_USE_BROWSER` 設為 `1`、`true` 或 `on`，以使用帳戶範圍的瀏覽器
配接器作為主要傳輸方式。將 `OMNIROUTE_BROWSER_POOL` 設為相同值之一，以允許辨識到的
Cloudflare 403 挑戰從直接傳輸回退至瀏覽器配接器
（`open-sse/executors/claude-web.ts:195`）。其他 HTTP 失敗不會觸發該回退機制。

瀏覽器配接器會將 Cookie 保留在同一個集區化 Playwright 內容中、使用上述具範圍限制的
雜湊金鑰，並從該內容傳送補全結果
（`open-sse/executors/claude-web/browserTransport.ts:444`）。它絕不會將瀏覽器解決挑戰後
取得的 Cookie 匯出至直接 TLS 用戶端。瀏覽器重試需要一個尚未過期，且繫結至同一個實際
Playwright 內容的 UI 範本（`open-sse/executors/claude-web/browserTransport.ts:467`）。
瀏覽器回應會在已驗證身分的頁面中以增量方式讀取、遵循請求取消，並在上游主體超過
16 MiB 時立即取消該主體（`open-sse/executors/claude-web/browserTransport.ts:259`）。

執行器會向共用請求記錄器傳回經遮蔽處理的稽核投影：組織、對話和訊息 UUID、提示文字、
工具定義、Cookie 及裝置識別碼均會排除
（`open-sse/executors/claude-web.ts:237`、
`open-sse/executors/claude-web.ts:252`）。傳輸例外也會傳回通用連線錯誤，而非擲回的訊息。

### SSE 行為

`createClaudeWebResponse()` 會處理 LF 或 CRLF 框架，以及多行 `data:` 欄位。它會將文字
差異映射至 `content`、將思考差異映射至 `reasoning_content`，並將已知的中繼資料事件
映射至 `claude_web` 回應擴充功能。每個中繼資料事件都會透過各自的欄位允許清單進行投影
（`open-sse/executors/claude-web/stream.ts:37`）。對話、父訊息、助理訊息及操作中繼資料
也會在 `X-OmniRoute-Claude-Web-*` 標頭中傳回
（`open-sse/executors/claude-web/stream.ts:364`）。

遇到格式錯誤的 JSON、上游 `error` 事件、未知事件類型、無效順序、內容區塊不符，或在
`message_stop` 前到達 EOF 時，剖析器會採取封閉式失敗。串流輸出會發出一個結束區塊和
一個 `[DONE]`；緩衝輸出則使用相同的剖析器。剖析器會立即將 `message_stop` 視為終止，
取消後續的上游資料，並將下游取消傳播至上游讀取器
（`open-sse/executors/claude-web/stream.ts:461`、
`open-sse/executors/claude-web/stream.ts:563`）。未終止的 SSE 行及累積事件上限為 1 MiB
（`open-sse/executors/claude-web/stream.ts:17`、
`open-sse/executors/claude-web/stream.ts:62`）。

### 檔案

| 檔案                                                     | 用途                   |
| -------------------------------------------------------- | ---------------------- |
| `open-sse/config/providers/registry/claude/web/index.ts` | 靜態提供者模型登錄     |
| `open-sse/executors/claude-web.ts`                       | 執行器協調             |
| `open-sse/executors/claude-web/payload.ts`               | 承載資料與工具轉換     |
| `open-sse/executors/claude-web/session.ts`               | 回合狀態與對話記錄快取 |
| `open-sse/executors/claude-web/transport.ts`             | 直接傳輸配接器         |
| `open-sse/executors/claude-web/browserTransport.ts`      | 帳戶範圍的瀏覽器配接器 |
| `open-sse/executors/claude-web/stream.ts`                | 嚴格 SSE 轉換          |
| `open-sse/services/claudeTlsClient.ts`                   | 原生 TLS 傳輸          |
| `open-sse/services/browserPool.ts`                       | 集區化 Playwright 內容 |

### 測試

在沒有真實認證資訊的情況下執行具確定性的 Claude Web 測試套件：

```powershell
node --import tsx/esm --test tests/unit/claude-web-auto-refresh.test.ts tests/unit/claude-web-browser-transport.test.ts tests/unit/claude-web-executor-split.test.ts tests/unit/claude-web-live-alignment.test.ts tests/unit/claude-web-payload-runtime.test.ts tests/unit/claude-web-session.test.ts tests/unit/claude-web-sonnet5-registry-6209.test.ts tests/unit/claude-web-stream.test.ts tests/unit/claude-web-transport.test.ts tests/unit/claude-web.test.ts tests/unit/issue-6662-repro.test.ts
```

`tests/unit/claude-web-auto-refresh.test.ts` 中相依於 Playwright 的案例已明確略過。此存放庫
目前未定義使用 Claude Web 認證資訊的即時測試指令碼，因此這些略過的案例不能作為執行階段證明。

### 設定

1. 使用 `npm run dev` 或已建置的安裝版本啟動 OmniRoute。
2. 開啟「Dashboard」→「Providers」→「Add Provider」。
3. 選取「Web Cookie」類別及「Claude Web」。
4. 貼上從已驗證身分的 `claude.ai` 請求複製而來的完整 Cookie 標頭。
