# Delegated Context Editing (Anthropic) (中文 (繁體))

🌐 **Languages:** 🇺🇸 [English](../../../../compression/CONTEXT_EDITING.md) · 🇪🇹 [am](../../../am/docs/compression/CONTEXT_EDITING.md) · 🇸🇦 [ar](../../../ar/docs/compression/CONTEXT_EDITING.md) · 🇦🇿 [az](../../../az/docs/compression/CONTEXT_EDITING.md) · 🇧🇬 [bg](../../../bg/docs/compression/CONTEXT_EDITING.md) · 🇧🇩 [bn](../../../bn/docs/compression/CONTEXT_EDITING.md) · 🇨🇿 [cs](../../../cs/docs/compression/CONTEXT_EDITING.md) · 🇩🇰 [da](../../../da/docs/compression/CONTEXT_EDITING.md) · 🇩🇪 [de](../../../de/docs/compression/CONTEXT_EDITING.md) · 🇬🇷 [el](../../../el/docs/compression/CONTEXT_EDITING.md) · 🇪🇸 [es](../../../es/docs/compression/CONTEXT_EDITING.md) · 🇪🇪 [et](../../../et/docs/compression/CONTEXT_EDITING.md) · 🇮🇷 [fa](../../../fa/docs/compression/CONTEXT_EDITING.md) · 🇫🇮 [fi](../../../fi/docs/compression/CONTEXT_EDITING.md) · 🇫🇷 [fr](../../../fr/docs/compression/CONTEXT_EDITING.md) · 🇮🇪 [ga](../../../ga/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [gu](../../../gu/docs/compression/CONTEXT_EDITING.md) · 🇳🇬 [ha](../../../ha/docs/compression/CONTEXT_EDITING.md) · 🇮🇱 [he](../../../he/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [hi](../../../hi/docs/compression/CONTEXT_EDITING.md) · 🇭🇷 [hr](../../../hr/docs/compression/CONTEXT_EDITING.md) · 🇭🇺 [hu](../../../hu/docs/compression/CONTEXT_EDITING.md) · 🇦🇲 [hy](../../../hy/docs/compression/CONTEXT_EDITING.md) · 🇮🇩 [id](../../../id/docs/compression/CONTEXT_EDITING.md) · 🇳🇬 [ig](../../../ig/docs/compression/CONTEXT_EDITING.md) · 🇮🇹 [it](../../../it/docs/compression/CONTEXT_EDITING.md) · 🇯🇵 [ja](../../../ja/docs/compression/CONTEXT_EDITING.md) · 🇬🇪 [ka](../../../ka/docs/compression/CONTEXT_EDITING.md) · 🇰🇭 [km](../../../km/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [kn](../../../kn/docs/compression/CONTEXT_EDITING.md) · 🇰🇷 [ko](../../../ko/docs/compression/CONTEXT_EDITING.md) · 🇱🇹 [lt](../../../lt/docs/compression/CONTEXT_EDITING.md) · 🇱🇻 [lv](../../../lv/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [ml](../../../ml/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [mr](../../../mr/docs/compression/CONTEXT_EDITING.md) · 🇲🇾 [ms](../../../ms/docs/compression/CONTEXT_EDITING.md) · 🇲🇹 [mt](../../../mt/docs/compression/CONTEXT_EDITING.md) · 🇲🇲 [my](../../../my/docs/compression/CONTEXT_EDITING.md) · 🇳🇵 [ne](../../../ne/docs/compression/CONTEXT_EDITING.md) · 🇳🇱 [nl](../../../nl/docs/compression/CONTEXT_EDITING.md) · 🇳🇴 [no](../../../no/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [or](../../../or/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [pa](../../../pa/docs/compression/CONTEXT_EDITING.md) · 🇵🇭 [phi](../../../phi/docs/compression/CONTEXT_EDITING.md) · 🇵🇱 [pl](../../../pl/docs/compression/CONTEXT_EDITING.md) · 🇵🇹 [pt](../../../pt/docs/compression/CONTEXT_EDITING.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/CONTEXT_EDITING.md) · 🇷🇴 [ro](../../../ro/docs/compression/CONTEXT_EDITING.md) · 🇷🇺 [ru](../../../ru/docs/compression/CONTEXT_EDITING.md) · 🇱🇰 [si](../../../si/docs/compression/CONTEXT_EDITING.md) · 🇸🇰 [sk](../../../sk/docs/compression/CONTEXT_EDITING.md) · 🇸🇮 [sl](../../../sl/docs/compression/CONTEXT_EDITING.md) · 🇷🇸 [sr](../../../sr/docs/compression/CONTEXT_EDITING.md) · 🇸🇪 [sv](../../../sv/docs/compression/CONTEXT_EDITING.md) · 🇰🇪 [sw](../../../sw/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [ta](../../../ta/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [te](../../../te/docs/compression/CONTEXT_EDITING.md) · 🇹🇭 [th](../../../th/docs/compression/CONTEXT_EDITING.md) · 🇹🇷 [tr](../../../tr/docs/compression/CONTEXT_EDITING.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/CONTEXT_EDITING.md) · 🇵🇰 [ur](../../../ur/docs/compression/CONTEXT_EDITING.md) · 🇺🇿 [uz](../../../uz/docs/compression/CONTEXT_EDITING.md) · 🇻🇳 [vi](../../../vi/docs/compression/CONTEXT_EDITING.md) · 🇳🇬 [yo](../../../yo/docs/compression/CONTEXT_EDITING.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/CONTEXT_EDITING.md)

---

委派式 **內容編輯（Context Editing）** 是 Claude 專用的上下文管理功能。不同於 OmniRoute 的本機
壓縮引擎（Caveman、RTK、LLMLingua、堆疊式管線）會在請求本文離開代理伺服器
_之前_ 重寫它，內容編輯會要求**提供者**從其自身持續運作的上下文視窗中清除過時的
工具使用／工具結果區塊。OmniRoute 只會附加一個本文參數
（`context_management.edits[]`）；Claude 會依據自己的 tokenizer 實際執行清除。

這項功能本質上是委派式能力：其他提供者會拒絕該參數，因此 OmniRoute 嚴格將其範圍限定於
Claude 及相容於 Claude Code 的中繼服務。

權威來源：`open-sse/config/contextEditing.ts`（策略 ID、本文注入、遙測
擷取）、`open-sse/executors/base.ts`（注入閘門 + 400 備援），以及
`open-sse/services/compression/types.ts`（設定結構 + 預設值）。

## `clear_tool_uses` 的作用

OmniRoute 會將單一編輯項目注入外送的 Anthropic Messages 本文中：

```json
{
  "context_management": {
    "edits": [
      {
        "type": "clear_tool_uses_20250919",
        "trigger": { "type": "input_tokens", "value": 100000 },
        "keep": { "type": "tool_uses", "value": 3 }
      }
    ]
  }
}
```

- `type: "clear_tool_uses_20250919"` — 帶日期的 Anthropic 策略 ID（`CLEAR_TOOL_USES_STRATEGY`）。
- `trigger.value: 100000` — 當請求的輸入 token 超過此閾值時，Claude 會開始
  清除舊的工具使用／結果配對（`CONTEXT_EDITING_DEFAULT_TRIGGER_TOKENS`，Anthropic 的預設值）。
- `keep.value: 3` — 保留最近的 N 組工具使用／結果配對，不加以變更
  （`CONTEXT_EDITING_DEFAULT_KEEP_TOOL_USES`）。

此 beta 功能透過 `anthropic-beta: context-management-2025-06-27` 標頭宣告，
OmniRoute 已會在 Claude 請求中送出此標頭。

注入由 `applyContextEditingToBody()` 執行，且具備**冪等性**：若本文中已存在
`clear_tool_uses` 編輯項目（由先前的呼叫加入，或由用戶端提供），本文會保持原樣。
如果也存在 `clear_thinking_20251015` 編輯項目，OmniRoute 會以穩定排序方式將
`clear_thinking` 編輯項目移到最前面，因為 Anthropic 要求 `edits[]` 陣列中的
`clear_thinking` 必須位於 `clear_tool_uses` 之前。

## 各組合的啟用切換開關

內容編輯**預設為關閉**，需主動選擇啟用。此切換開關是壓縮設定中的單一布林值：

- 設定鍵：`contextEditing.enabled`（camelCase — **不是** `context_editing`／`context-editing`）。
- 類型：`open-sse/services/compression/types.ts` 中的
  `ContextEditingConfig { enabled: boolean }`。
- 預設值：`DEFAULT_CONTEXT_EDITING_CONFIG = { enabled: false }`。
- Zod schema：`src/shared/validation/compressionConfigSchemas.ts` 中的 `contextEditingConfigSchema`。
- 儲存：與其餘壓縮設定一同持久化（在
  `src/lib/db/compression.ts` 中正規化）。

在儀表板中，此切換開關位於壓縮中樞
（`src/app/(dashboard)/dashboard/context/combos/CompressionHub.tsx`），並透過
`saveSettings()` 回寫 `{ contextEditing: { enabled: … } }`。由於它隸屬於
壓縮設定物件，因此會與各組合的壓縮設定檔搭配運作，而不是作為完全獨立的介面——
此設定僅包含開啟／關閉旗標；所有閾值（`trigger`、`keep`）均採用上述常數。

## 僅限 Claude 的閘控

注入只會針對真正的 Claude 或與 Claude Code 相容的中繼發生。位於
`open-sse/executors/base.ts` 的閘控如下：

```ts
if (
  (this.provider === "claude" || isClaudeCodeCompatible(this.provider)) &&
  contextEditing?.enabled &&
  !contextEditingDisabled
) {
  applyContextEditingToBody(transformedBody, { enabled: true });
}
```

- `this.provider === "claude"` — 真正的 Anthropic 金鑰/OAuth。
- `isClaudeCodeCompatible(this.provider)` — 提供者 ID 以
  `anthropic-compatible-cc-` 前綴開頭的中繼（它們宣告與 Claude Code 相容，因此是最有可能接受此 beta 功能的中繼）。請參閱 `open-sse/services/provider.ts`。

刻意**排除**：

- `claude-web` — 使用 `create_conversation_params` 請求結構的瀏覽器中繼，絕不會看到
  `context_management`。
- 通用的 `anthropic-compatible-*` 中繼（不含 `-cc-` 前綴）— 對 beta 功能的支援情況不確定的第三方端點。

即使開關已開啟，非 Claude 提供者也絕不會收到 `context_management` 參數。

## 400 備援／中繼涵蓋範圍

與 Claude 相容的中繼可能會宣告支援此 beta 功能，但仍以 HTTP 400 拒絕
`context_management` 參數。為了優雅降級而非讓請求失敗，執行器會移除該參數，並對相同 URL **重試一次**：

```ts
if (
  response.status === HTTP_STATUS.BAD_REQUEST &&
  contextEditing?.enabled &&
  !contextEditingDisabled &&
  transformedBody?.context_management !== undefined
) {
  const errText = await response
    .clone()
    .text()
    .catch(() => "");
  if (/context[_-]management|context editing/i.test(errText)) {
    contextEditingDisabled = true;
    delete transformedBody.context_management;
    let retryBody = JSON.stringify(transformedBody);
    if (isClaudeCodeCompatible(this.provider) || this.provider === "claude") {
      retryBody = await signRequestBody(retryBody);
    }
    response = await fetch(url, { ...fetchOptions, body: retryBody });
  }
}
```

行為：

1. 僅在啟用上下文編輯、主體實際包含 `context_management`，且收到 `400` 時觸發。
2. 透過 `clone()` 讀取 400 回應主體，因此在不符合條件的路徑中，原始回應會保持完整。
3. 錯誤文字必須符合 `/context[_-]management|context editing/i` — 無關的 400（例如
   `max_tokens must be >= 1`）**不會**觸發備援；原始錯誤會繼續傳播。
4. 符合時，會設定 `contextEditingDisabled = true`（若稍後為重試／備援 URL 建立新的
   `transformedBody`，這會抑制重新注入）、刪除 `context_management`、為 Claude／與 Claude Code 相容的中繼重新簽署主體（`signRequestBody`），並對相同 URL 重試一次。

真正的 Claude 會透過 `ANTHROPIC_BETA_BASE` 攜帶此 beta 功能，因此不會進入此備援路徑。

## `applied_edits` 遙測

在 Claude 回應後，OmniRoute 會記錄提供者實際清除了多少上下文。這**不會**以串流方式傳送，而是以盡力而為的方式從非串流回應主體中擷取，且絕不會影響回應（遙測失敗會被忽略）。

- 擷取：`open-sse/config/contextEditing.ts` 中的 `extractContextEditingTelemetry(responseBody)`。
  它會在三個位置探查 `applied_edits`（用以防禦不同的回應結構）：
  - `context_management.applied_edits`
  - `usage.context_management.applied_edits`
  - `usage.applied_edits`
- 從每個項目讀取的欄位：`cleared_input_tokens` 和 `cleared_tool_uses`
  （snake_case，Anthropic 原生格式），並以 `clearedInputTokens`／`clearedToolUses` camelCase 格式作為備援。
- 找不到 `applied_edits` 陣列或實際上未清除任何內容時，傳回 `null`。

記錄的結構為 `ContextEditingTelemetry { editCount, clearedInputTokens, clearedToolUses }`。
記錄作業會在 `open-sse/handlers/chatCore.ts` 中進行（閘控條件為 `provider === "claude"`），透過
`recordContextEditingTelemetry()`（`src/lib/db/compressionAnalytics.ts`）寫入一列壓縮分析資料，並標記：

- `mode: "context-editing"`
- `engine: "context-editing"`
- `tokens_saved`／`original_tokens` = 已清除的輸入 token 數量
- `request_id` 加上 `::context-editing` 後綴

因此，委派的清除作業會與本機引擎一同顯示在壓縮分析中，歸類於
`context-editing` 引擎標籤下，並可與 RTK/Caveman/LLMLingua 的節省量區分。

## 與本機壓縮引擎的關係

| 面向       | 本機引擎（Caveman / RTK / LLMLingua / stacked） | 委派式上下文編輯                            |
| ---------- | ----------------------------------------------- | ------------------------------------------- |
| 執行位置   | 在 OmniRoute 中，於請求離開代理伺服器之前       | 在提供者（Claude）中，於伺服器端執行        |
| 編輯內容   | 提示詞／上下文／工具結果文字                    | 舊的工具使用／工具結果區塊                  |
| 提供者範圍 | 所有提供者                                      | 僅限 `claude` + `anthropic-compatible-cc-*` |
| 開關       | 壓縮模式設定                                    | `contextEditing.enabled`                    |
| 失敗模式   | 開放式失敗（使用原始文字）                      | 400 備援：移除參數，重試一次                |
| 節省量遙測 | `engine: <engine id>`                           | `engine: "context-editing"`                 |

兩者相輔相成：本機引擎會壓縮 OmniRoute 傳送的位元組；上下文編輯則讓
Claude 能夠跨對話輪次修剪持續累積的上下文。兩者可以同時啟用。

## 另請參閱

- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — 引擎登錄檔與本機壓縮
  引擎
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — 命令／工具輸出壓縮
- [../frameworks/MCP-SERVER.md](../frameworks/MCP-SERVER.md) — MCP 描述壓縮與
  工具基數縮減
- 來源：`open-sse/config/contextEditing.ts`、`open-sse/executors/base.ts`、
  `open-sse/services/compression/types.ts`、`src/lib/db/compressionAnalytics.ts`
