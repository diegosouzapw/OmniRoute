# Reasoning Replay Cache (中文 (繁體))

🌐 **Languages:** 🇺🇸 [English](../../../../routing/REASONING_REPLAY.md) · 🇪🇹 [am](../../../am/docs/routing/REASONING_REPLAY.md) · 🇸🇦 [ar](../../../ar/docs/routing/REASONING_REPLAY.md) · 🇦🇿 [az](../../../az/docs/routing/REASONING_REPLAY.md) · 🇧🇬 [bg](../../../bg/docs/routing/REASONING_REPLAY.md) · 🇧🇩 [bn](../../../bn/docs/routing/REASONING_REPLAY.md) · 🇧🇦 [bs](../../../bs/docs/routing/REASONING_REPLAY.md) · 🇨🇿 [cs](../../../cs/docs/routing/REASONING_REPLAY.md) · 🇩🇰 [da](../../../da/docs/routing/REASONING_REPLAY.md) · 🇩🇪 [de](../../../de/docs/routing/REASONING_REPLAY.md) · 🇬🇷 [el](../../../el/docs/routing/REASONING_REPLAY.md) · 🇪🇸 [es](../../../es/docs/routing/REASONING_REPLAY.md) · 🇪🇪 [et](../../../et/docs/routing/REASONING_REPLAY.md) · 🇮🇷 [fa](../../../fa/docs/routing/REASONING_REPLAY.md) · 🇫🇮 [fi](../../../fi/docs/routing/REASONING_REPLAY.md) · 🇫🇷 [fr](../../../fr/docs/routing/REASONING_REPLAY.md) · 🇮🇪 [ga](../../../ga/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [gu](../../../gu/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ha](../../../ha/docs/routing/REASONING_REPLAY.md) · 🇮🇱 [he](../../../he/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [hi](../../../hi/docs/routing/REASONING_REPLAY.md) · 🇭🇷 [hr](../../../hr/docs/routing/REASONING_REPLAY.md) · 🇭🇺 [hu](../../../hu/docs/routing/REASONING_REPLAY.md) · 🇦🇲 [hy](../../../hy/docs/routing/REASONING_REPLAY.md) · 🇮🇩 [id](../../../id/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ig](../../../ig/docs/routing/REASONING_REPLAY.md) · 🇮🇹 [it](../../../it/docs/routing/REASONING_REPLAY.md) · 🇯🇵 [ja](../../../ja/docs/routing/REASONING_REPLAY.md) · 🇬🇪 [ka](../../../ka/docs/routing/REASONING_REPLAY.md) · 🇰🇭 [km](../../../km/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [kn](../../../kn/docs/routing/REASONING_REPLAY.md) · 🇰🇷 [ko](../../../ko/docs/routing/REASONING_REPLAY.md) · 🇱🇹 [lt](../../../lt/docs/routing/REASONING_REPLAY.md) · 🇱🇻 [lv](../../../lv/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ml](../../../ml/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [mr](../../../mr/docs/routing/REASONING_REPLAY.md) · 🇲🇾 [ms](../../../ms/docs/routing/REASONING_REPLAY.md) · 🇲🇹 [mt](../../../mt/docs/routing/REASONING_REPLAY.md) · 🇲🇲 [my](../../../my/docs/routing/REASONING_REPLAY.md) · 🇳🇵 [ne](../../../ne/docs/routing/REASONING_REPLAY.md) · 🇳🇱 [nl](../../../nl/docs/routing/REASONING_REPLAY.md) · 🇳🇴 [no](../../../no/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [or](../../../or/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [pa](../../../pa/docs/routing/REASONING_REPLAY.md) · 🇵🇭 [phi](../../../phi/docs/routing/REASONING_REPLAY.md) · 🇵🇱 [pl](../../../pl/docs/routing/REASONING_REPLAY.md) · 🇵🇹 [pt](../../../pt/docs/routing/REASONING_REPLAY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/REASONING_REPLAY.md) · 🇷🇴 [ro](../../../ro/docs/routing/REASONING_REPLAY.md) · 🇷🇺 [ru](../../../ru/docs/routing/REASONING_REPLAY.md) · 🇱🇰 [si](../../../si/docs/routing/REASONING_REPLAY.md) · 🇸🇰 [sk](../../../sk/docs/routing/REASONING_REPLAY.md) · 🇸🇮 [sl](../../../sl/docs/routing/REASONING_REPLAY.md) · 🇷🇸 [sr](../../../sr/docs/routing/REASONING_REPLAY.md) · 🇸🇪 [sv](../../../sv/docs/routing/REASONING_REPLAY.md) · 🇰🇪 [sw](../../../sw/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ta](../../../ta/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [te](../../../te/docs/routing/REASONING_REPLAY.md) · 🇹🇭 [th](../../../th/docs/routing/REASONING_REPLAY.md) · 🇹🇷 [tr](../../../tr/docs/routing/REASONING_REPLAY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/REASONING_REPLAY.md) · 🇵🇰 [ur](../../../ur/docs/routing/REASONING_REPLAY.md) · 🇺🇿 [uz](../../../uz/docs/routing/REASONING_REPLAY.md) · 🇻🇳 [vi](../../../vi/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [yo](../../../yo/docs/routing/REASONING_REPLAY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/REASONING_REPLAY.md)

---

> **事實來源：** `src/lib/db/reasoningCache.ts`、`open-sse/services/reasoningCache.ts`
> **最後更新：** 2026-06-28 — v3.8.40

OmniRoute 會擷取由思考模式模型產生的助理 `reasoning_content`，並在上游提供者要求時，於多輪請求中透明地重新帶入。這可避免因用戶端的對話歷史缺少上一輪推理內容，而導致嚴格的提供者回傳 HTTP 400 錯誤。

## 存在原因

有些思考模式提供者會拒絕後續輪次，除非**上一則助理訊息包含原始的 `reasoning_content`**。上游會回傳 400，並附帶如下訊息：

```
參數不正確：思考模式中的 reasoning_content 必須傳回 API。
```

但一般用戶端（Cursor、Cline、Roo Code、OpenAI SDK）會從重新傳送的歷史記錄中移除 `reasoning_content`。OmniRoute 會從伺服器端快取還原它，使上游看到的請求保持一致。Issue #1628 引入了記憶體/SQLite 混合持久化機制，讓快取可在程序重新啟動後繼續保留。

## 架構

```
第 N 輪（助理產生內容）：
  → 回應包含 reasoning_content + tool_calls
  → 若 requiresReasoningReplay(provider, model)：cacheReasoningFromAssistantMessage()
      寫入（記憶體 + DB），以每個 tool_call.id 作為索引鍵
  → 將回應轉送給用戶端（用戶端可能保留或不保留推理內容）

第 N+1 輪（用戶端傳送後續請求）：
  → 轉譯器偵測到：requiresReasoningReplay(provider, model) === true
  → 對每一則包含 tool_calls 但沒有 reasoning_content 的助理訊息：
      lookupReasoning(toolCalls[0].id) → 記憶體 → DB
      命中  → msg.reasoning_content = cached; recordReplay()
      未命中 → msg.reasoning_content = ""（適用於舊版 DeepSeek 的舊式後備處理）
  → 上游看到一致的歷史記錄 → 不會出現 400
```

擷取作業發生於 `open-sse/handlers/chatCore.ts`（兩個位置，即兩個 `cacheReasoningFromAssistantMessage` 呼叫點）。重新帶入作業發生於 `open-sse/translator/index.ts`，位於結構描述強制轉換之後、分派之前。

## 儲存 — 記憶體 + SQLite 混合模式

熱路徑使用記憶體內的 `Map`（依建立時間採用 LRU），並以 SQLite 資料表作為後端，以便在當機後復原並提供儀表板可見性。

| 層級   | 實作                                             | 用途                                |
| ------ | ------------------------------------------------ | ----------------------------------- |
| 記憶體 | `open-sse/services/reasoningCache.ts` 中的 `Map` | 快速查詢，達到 200 筆時移除最舊項目 |
| DB     | `reasoning_cache` 資料表（`src/lib/db/`）        | 跨重新啟動持久保存，並提供統計資料  |

寫入會同時進入兩者。讀取時會先查詢記憶體，之後才回退至 DB（DB 命中項目會提升回記憶體）。DB 失敗不會造成致命錯誤——記憶體內快取會繼續服務熱路徑。

**預設值：**

- TTL：`2h`（`TTL_MS = 2 * 60 * 60 * 1000`）
- 記憶體項目上限：`200`（`MAX_MEMORY_ENTRIES`）
- 移除策略：優先移除 `createdAt` 最舊的項目

## 資料庫結構描述

遷移：`src/lib/db/migrations/033_create_reasoning_cache.sql`

```sql
CREATE TABLE IF NOT EXISTS reasoning_cache (
  tool_call_id   TEXT PRIMARY KEY,
  provider       TEXT NOT NULL,
  model          TEXT NOT NULL,
  reasoning      TEXT NOT NULL,
  char_count     INTEGER NOT NULL DEFAULT 0,
  created_at     TEXT NOT NULL DEFAULT (datetime('now')),
  expires_at     INTEGER NOT NULL
);
```

索引：`expires_at`、`provider`、`model`、`created_at`。`expires_at` 會儲存為 Unix Epoch 秒數；SELECT 層會透過 `EXPIRES_AT_EPOCH_SQL` 正規化舊有文字值。

## 提供者 / 模型偵測

當 `requiresReasoningReplay(provider, model)` 回傳 `true` 時，即會啟用重播。此函式會檢查 `open-sse/services/reasoningCache.ts` 中的兩個清單。

**提供者 ID（完全相符，不區分大小寫）：**

- `deepseek`
- `opencode-go`
- `siliconflow`
- `nebius`
- `deepinfra`
- `sambanova`
- `fireworks`
- `together`
- `kimi-coding`
- `kimi-coding-apikey`
- `xiaomi-mimo`

**模型正規表示式模式（不區分大小寫）：**

- `/deepseek-r1/i`
- `/deepseek-reasoner/i`
- `/deepseek-chat/i`
- `/deepseek[-/]?v4[-.]flash/i` 和 `/deepseek[-/]?v4[-.]pro/i`（V4 Flash / Pro，可選的 `-free` 後綴）
- `/(deepseek|zen\/deepseek)-v4/i`
- `/kimi[-/]k\d/i`
- `/qwq/i`
- `/qwen.*think/i`
- `/glm.*think/i`
- `/^mimo[-.]?v\d/i`

若要新增嚴格模式的提供者／模型，需將其附加至其中一個清單，並撰寫單元測試來斷言已注入重播內容。PR 說明應引用促成此變更的確切上游 400 錯誤字串。

## REST API

快取在 `src/app/api/cache/reasoning/route.ts` 下提供兩個端點。兩者都需要管理驗證（來自 `@/shared/utils/apiAuth` 的 `isAuthenticated`）。

| 方法   | 端點                                                      | 說明                                              |
| ------ | --------------------------------------------------------- | ------------------------------------------------- |
| GET    | `/api/cache/reasoning`                                    | 統計資料 + 分頁項目                               |
| GET    | `/api/cache/reasoning?provider=deepseek&model=...&limit=` | 篩選後的清單（`limit` 限制在 `[1, 200]` 範圍內）  |
| DELETE | `/api/cache/reasoning`                                    | 清除所有內容（記憶體 + DB）並重設命中／未命中計數 |
| DELETE | `/api/cache/reasoning?provider=deepseek`                  | 僅清除某一個提供者的項目                          |
| DELETE | `/api/cache/reasoning?toolCallId=call_abc`                | 刪除單一項目                                      |

**GET 回應格式：**

```json
{
  "stats": {
    "memoryEntries": 12,
    "dbEntries": 47,
    "totalEntries": 47,
    "totalChars": 138291,
    "hits": 84,
    "misses": 6,
    "replays": 81,
    "replayRate": "90.0%",
    "byProvider": { "deepseek": { "entries": 32, "chars": 98412 } },
    "byModel": { "deepseek-reasoner": { "entries": 32, "chars": 98412 } },
    "oldestEntry": "2026-05-13T10:00:00.000Z",
    "newestEntry": "2026-05-13T11:42:11.000Z"
  },
  "entries": [
    {
      "toolCallId": "call_abc",
      "provider": "deepseek",
      "model": "deepseek-reasoner",
      "reasoning": "...",
      "charCount": 3128,
      "createdAt": "...",
      "expiresAt": "..."
    }
  ]
}
```

## 操作注意事項

- **清理：** `cleanupReasoningCache()` 會清除記憶體中已過期的項目，並執行 `DELETE FROM reasoning_cache WHERE expires_at <= unixepoch('now')`。健康檢查工作程序會定期呼叫此函式。
- **當機復原：** 重新啟動後，記憶體是空的，但 DB 仍會保留尚未過期的項目。首次查詢指定的 `tool_call_id` 時會命中 DB；後續查詢則會命中記憶體。
- **沒有推理，就不快取：** 當助理訊息沒有 `reasoning_content` / `reasoning` 欄位時，`cacheReasoningFromAssistantMessage` 會回傳 `0`，因此非思考型回應不會產生任何成本。
- **寫入也受條件限制：** `chatCore.ts` 中的兩個呼叫位置（非串流和串流）都只會在 `requiresReasoningReplay(provider, model)` 為 `true` 時呼叫 `cacheReasoningFromAssistantMessage()`——這與讀取端檢查的述詞相同。從不使用重播提供者的安裝環境，不必再為每個包含推理內容的回應支付寫入、索引更新及 try/catch 的成本。
- **非嚴格模式提供者：** 當 `requiresReasoningReplay` 為 `false` 且目標格式為 OpenAI 時，轉譯器會從傳出訊息中**移除**任何 `reasoning_content` 欄位——OpenAI Chat Completions 不接受此欄位。

## 另請參閱

- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — 斷路器、冷卻期、模型鎖定
- [TROUBLESHOOTING.md](../guides/TROUBLESHOOTING.md) — 診斷上游 400 錯誤
- 原始碼：`src/lib/db/reasoningCache.ts`、`open-sse/services/reasoningCache.ts`、`open-sse/translator/index.ts`
- 遷移：`src/lib/db/migrations/033_create_reasoning_cache.sql`
- API 路由：`src/app/api/cache/reasoning/route.ts`
- 原始議題：#1628
