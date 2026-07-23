---
title: "API 參考"
version: 3.8.40
lastUpdated: 2026-06-28
---

# API 參考

🌐 **語言：** 🇺🇸 [English](./API_REFERENCE.md) | 🇧🇷 [Português (Brasil)](../i18n/pt-BR/docs/reference/API_REFERENCE.md) | 🇪🇸 [Español](../i18n/es/docs/reference/API_REFERENCE.md) | 🇫🇷 [Français](../i18n/fr/docs/reference/API_REFERENCE.md) | 🇮🇹 [Italiano](../i18n/it/docs/reference/API_REFERENCE.md) | 🇷🇺 [Русский](../i18n/ru/docs/reference/API_REFERENCE.md) | 🇨🇳 [中文 (简体)](../i18n/zh-CN/docs/reference/API_REFERENCE.md) | 🇩🇪 [Deutsch](../i18n/de/docs/reference/API_REFERENCE.md) | 🇮🇳 [हिन्दी](../i18n/in/docs/reference/API_REFERENCE.md) | 🇹🇭 [ไทย](../i18n/th/docs/reference/API_REFERENCE.md) | 🇺🇦 [Українська](../i18n/uk-UA/docs/reference/API_REFERENCE.md) | 🇸🇦 [العربية](../i18n/ar/docs/reference/API_REFERENCE.md) | 🇯🇵 [日本語](../i18n/ja/docs/reference/API_REFERENCE.md) | 🇻🇳 [Tiếng Việt](../i18n/vi/docs/reference/API_REFERENCE.md) | 🇧🇬 [Български](../i18n/bg/docs/reference/API_REFERENCE.md) | 🇩🇰 [Dansk](../i18n/da/docs/reference/API_REFERENCE.md) | 🇫🇮 [Suomi](../i18n/fi/docs/reference/API_REFERENCE.md) | 🇮🇱 [עברית](../i18n/he/docs/reference/API_REFERENCE.md) | 🇭🇺 [Magyar](../i18n/hu/docs/reference/API_REFERENCE.md) | 🇮🇩 [Bahasa Indonesia](../i18n/id/docs/reference/API_REFERENCE.md) | 🇰🇷 [한국어](../i18n/ko/docs/reference/API_REFERENCE.md) | 🇲🇾 [Bahasa Melayu](../i18n/ms/docs/reference/API_REFERENCE.md) | 🇳🇱 [Nederlands](../i18n/nl/docs/reference/API_REFERENCE.md) | 🇳🇴 [Norsk](../i18n/no/docs/reference/API_REFERENCE.md) | 🇵🇹 [Português (Portugal)](../i18n/pt/docs/reference/API_REFERENCE.md) | 🇷🇴 [Română](../i18n/ro/docs/reference/API_REFERENCE.md) | 🇵🇱 [Polski](../i18n/pl/docs/reference/API_REFERENCE.md) | 🇸🇰 [Slovenčina](../i18n/sk/docs/reference/API_REFERENCE.md) | 🇸🇪 [Svenska](../i18n/sv/docs/reference/API_REFERENCE.md) | 🇵🇭 [Filipino](../i18n/phi/docs/reference/API_REFERENCE.md) | 🇨🇿 [Čeština](../i18n/cs/docs/reference/API_REFERENCE.md)

所有 OmniRoute API 端點的完整參考資料。

---

## 目錄

- [聊天補全](#聊天補全)
- [嵌入](#嵌入)
- [圖片生成](#圖片生成)
- [列出模型](#列出模型)
- [提供者外掛清單](#提供者外掛清單)
- [相容性端點](#相容性端點)
- [檔案 API](#檔案-api)
- [批次 API](#批次-api)
- [搜尋 API](#搜尋-api)
- [WebSocket 串流](#websocket-串流)
- [配額與問題回報](#配額與問題回報)
- [語義快取](#語義快取)
- [儀表板與管理](#儀表板與管理)
- [組合管理](#組合管理)
- [Webhook](#webhook)
- [註冊金鑰（自動管理）](#註冊金鑰自動管理)
- [代理程式協定](#代理程式協定)
- [管理代理](#管理代理)
- [彈性（進階）](#彈性進階)
- [技能](#技能)
- [記憶](#記憶)
- [MCP 伺服器](#mcp-伺服器)
- [A2A 伺服器](#a2a-伺服器)
- [雲端、評測與評估](#雲端評測與評估)
- [請求處理](#請求處理)
- [身分驗證](#身分驗證)

---

## 聊天補全

```bash
POST /v1/chat/completions
Authorization: Bearer ***
Content-Type: application/json

{
  "model": "cc/claude-opus-4-6",
  "messages": [
    {"role": "user", "content": "撰寫一個函式..."}
  ],
  "stream": true
}
```

### 自訂標頭

| 標頭                           | 方向     | 說明                                                                                          |
| ------------------------------ | -------- | --------------------------------------------------------------------------------------------- |
| `X-OmniRoute-No-Cache`         | 請求     | 設為 `true` 以略過快取                                                                        |
| `x-omniroute-no-memory`        | 請求     | 設為 `true` 以跳過此請求的記憶與技能注入（等同於 no-cache；避免每次呼叫的權杖/成本開銷）        |
| `X-OmniRoute-Progress`         | 請求     | 設為 `true` 以取得進度事件                                                                     |
| `X-Session-Id`                 | 請求     | 用於外部工作階段親和性的黏性工作階段金鑰                                                         |
| `x_session_id`                 | 請求     | 也接受底線變體（直接 HTTP）                                                                     |
| `Idempotency-Key`              | 請求     | 去重金鑰（5 秒窗口）                                                                           |
| `X-Request-Id`                 | 請求     | 替代去重金鑰                                                                                   |
| `X-OmniRoute-Cache`            | 回應     | `HIT` 或 `MISS`（非串流）                                                                      |
| `X-OmniRoute-Idempotent`       | 回應     | `true` 表示已去重                                                                              |
| `X-OmniRoute-Progress`         | 回應     | `enabled` 表示進度追蹤已啟用                                                                    |
| `X-OmniRoute-Session-Id`       | 回應     | OmniRoute 使用的有效工作階段 ID                                                                 |
| `X-OmniRoute-Request-Id`       | 回應     | 請求關聯 ID（已知時）                                                                          |
| `X-OmniRoute-Version`          | 回應     | OmniRoute 建置版本（始終存在）                                                                  |
| `X-OmniRoute-Cost-Saved`       | 回應     | 快取命中避免的美金成本（僅限快取命中）                                                           |
| `X-OmniRoute-Decision`         | 回應     | 路由追蹤：`strategy=<名稱>; provider=<別名>; latency_ms=<n>`（`<名稱>` 為組合策略，非組合請求則為 `single`）—— 完成回應時始終存在 |

> Nginx 注意：如果您依賴底線標頭（例如 `x_session_id`），請啟用 `underscores_in_headers on;`。

> **成本遙測標頭：** 非串流成功回應也會攜帶 `X-OmniRoute-*` 成本遙測組 — `X-OmniRoute-Response-Cost`（美金，固定 10 位小數；免費/未定價為 `0.0000000000`）、`X-OmniRoute-Tokens-In` / `X-OmniRoute-Tokens-Out`、`X-OmniRoute-Model`、`X-OmniRoute-Provider`、`X-OmniRoute-Latency-Ms`、`X-OmniRoute-Cache-Hit` 以及 `X-OmniRoute-Fallback-Attempts`（僅大於 0 時），加上 `X-OmniRoute-Request-Id` 和 `X-OmniRoute-Version`。這些由聊天補全、`/v1/responses`、`/v1/messages` **以及媒體端點** — `/v1/embeddings`、`/v1/images/generations`、`/v1/audio/speech`、`/v1/audio/transcriptions`、`/v1/rerank`、`/v1/videos/generations`、`/v1/music/generations` 和 `/v1/moderations`（成本始終為 `0`）發出。媒體成本按模態計算（每張圖片、每秒、每字元、每個搜尋單位），有定價時適用，否則為 `0`（故障開放）。

> **快取命中的成本語義：** 當語義快取命中時（`X-OmniRoute-Cache-Hit: true`），不會進行上游呼叫，因此 `X-OmniRoute-Response-Cost` 為 `0.0000000000`（服務命中的**增量**成本）。原始/原本的成本單獨在 `X-OmniRoute-Cost-Saved` 中回報。計費消費者應加總 `X-OmniRoute-Response-Cost`（命中不計費）；快取分析可匯總 `X-OmniRoute-Cost-Saved`。

### `x-omniroute-compression`

按請求覆寫壓縮方案。最高優先順序 — 勝過路由組合覆寫、作用中設定檔、自動觸發和面板預設。值：

| 值              | 效果                                                     |
| --------------- | -------------------------------------------------------- |
| `off`           | 此請求不進行壓縮。                                       |
| `default`       | 面板衍生的 Default 設定檔（忽略作用中設定檔）。            |
| `engine:<id>`   | 啟用時的單一引擎，例如 `engine:rtk`。                     |
| `<combo>`       | 具名組合，先按名稱（不區分大小寫）比對，再按 ID 比對。    |

備註：

- 未知值會被忽略（請求絕不會被拒絕）；解析會依正常運算子優先順序進行。
- 若多個組合共用一個名稱，請傳入組合 **id** 以進行確定性比對。
- 名稱為 `off` 或 `default` 的組合無法透過名稱選取（這些關鍵字會先被解讀）；請使用其 ID 來參考此類組合。
- 主壓縮開關為硬閘：當壓縮在全域層級停用時，此標頭無法啟用它。

套用的方案會透過回應標頭回顯：

```
X-OmniRoute-Compression: <mode>; source=<source>
```

其中 `<source>` 為 `request-header`、`routing-override`、`active-profile`、`auto-trigger`、`default` 或 `off` 之一。

---

## 嵌入

```bash
POST /v1/embeddings
Authorization: Bearer ***
Content-Type: application/json

{
  "model": "nebius/Qwen/Qwen3-Embedding-8B",
  "input": "食物很美味"
}
```

可用提供者：Nebius、OpenAI、Mistral、Together AI、Fireworks、NVIDIA、**OpenRouter**、**GitHub Models**。

```bash
# 列出所有嵌入模型
GET /v1/embeddings
```

---

## 圖片生成

```bash
POST /v1/images/generations
Authorization: Bearer ***
Content-Type: application/json

{
  "model": "openai/gpt-image-2",
  "prompt": "山巒上美麗的夕陽",
  "size": "1024x1024"
}
```

可用提供者：OpenAI（GPT Image 2）、xAI（Grok Image）、Together AI（FLUX）、Fireworks AI、Nebius（FLUX）、Hyperbolic、NanoBanana、**OpenRouter**、SD WebUI（本機）、ComfyUI（本機）。

```bash
# 列出所有圖片模型
GET /v1/images/generations
```

---

## 列出模型

```bash
GET /v1/models
Authorization: Bearer ***

→ 以 OpenAI 格式回傳所有聊天、嵌入和圖片模型 + 組合
```

### 無思考模型變體

對於支援思考的 Claude 模型，`/v1/models` 也會提供一個**無思考**變體，其 ID 前綴為 `claude-3-omniroute-no-thinking/`：

```
claude-3-omniroute-no-thinking/<provider>/<model>
```

選取此 ID（例如在始終附加 `thinking` 區塊的 Claude Code 配置中）會解析回實際的 `<provider>/<model>`，並抑制推理 — 在 `/v1/messages` 路徑上設定 `thinking:{type:"disabled"}`，或在 `/v1/chat/completions` 路徑上刪除 `reasoning`/`reasoning_effort` 欄位。僅針對支援 thinking **且**遵循 `disabled` 的 Claude 系列模型列出此變體（因此例如僅適配且拒絕 `disabled` 的模型會被排除）。運算子可以透過 `ModelSpec.noThinkingAlias` 強制為每個模型啟用或停用此變體。

---

## 提供者外掛清單

```bash
GET /api/v1/provider-plugin-manifest
```

回傳 Bifrost、CLIProxyAPI 和未來 sidecar 路由器使用的 JSON 安全提供者外掛清單。回應由 TypeScript 提供者註冊表產生，且刻意排除 OAuth 用戶端密碼、執行時期環境解析、執行器函式、請求標頭和帳戶資料。

當 sidecar 在行程外執行且無法直接匯入 `open-sse/config/providerPluginManifestRegistry.ts` 時，請使用此端點。

---

## 相容性端點

| 方法   | 路徑                                     | 格式                            |
| ------ | ---------------------------------------- | -------------------------------- |
| POST   | `/v1/chat/completions`                   | OpenAI                           |
| POST   | `/v1/messages`                           | Anthropic                        |
| POST   | `/v1/responses`                          | OpenAI Responses                 |
| POST   | `/v1/embeddings`                         | OpenAI                           |
| POST   | `/v1/images/generations`                 | OpenAI Images                    |
| POST   | `/v1/images/edits`                       | OpenAI Images（編輯/修補）       |
| POST   | `/v1/videos/generations`                 | OpenAI 樣式影片生成              |
| POST   | `/v1/music/generations`                  | OpenAI 樣式音樂生成              |
| POST   | `/v1/audio/transcriptions`               | OpenAI Audio（STT）              |
| POST   | `/v1/audio/speech`                       | OpenAI TTS（回傳音訊主體）       |
| POST   | `/v1/rerank`                             | Cohere/Voyage 樣式重新排序       |
| POST   | `/v1/moderations`                        | OpenAI 審核                      |
| GET    | `/v1/models`                             | OpenAI                           |
| POST   | `/v1/messages/count_tokens`              | Anthropic                        |
| GET    | `/v1beta/models`                         | Gemini                           |
| POST   | `/v1beta/models/{...path}`               | Gemini generateContent           |
| POST   | `/v1/api/chat`                           | Ollama                           |
| GET    | `/api/v1/vscode/{token}/`                | OpenAI 目錄別名                  |
| GET    | `/api/v1/vscode/{token}/models`          | OpenAI 模型別名                  |
| POST   | `/api/v1/vscode/{token}/chat/completions`| OpenAI 權杖化別名                |
| POST   | `/api/v1/vscode/{token}/responses`       | OpenAI Responses 權杖化別名      |
| POST   | `/api/v1/vscode/{token}/api/chat`        | Ollama 權杖化別名                |
| GET    | `/api/v1/vscode/{token}/api/tags`        | Ollama 標籤權杖化別名            |

所有 POST 路由遵循相同格式：`Bearer your-api-key` + Zod 驗證的 JSON 主體（`v1RerankSchema`、`v1ModerationSchema`、`v1AudioSpeechSchema` 等，請參閱 `src/shared/validation/schemas.ts`）。結構描述失敗時會回傳 4xx。

對於無法附加 `Authorization: Bearer ***` 的客戶端，OmniRoute 也接受 URL 中的 API 金鑰，可透過查詢字串相容性（`?token=...`、`?apiKey=...`、`?api_key=...`、`?key=...`）或下方記錄的專用 `/api/v1/vscode/{token}/...` 端點。

```bash
# 重新排序
POST /v1/rerank      { "model": "cohere/rerank-3", "query": "...", "documents": ["..."] }

# 審核
POST /v1/moderations { "model": "omni-moderation-latest", "input": "..." }

# TTS — 回傳 audio/mpeg（或要求格式）主體
POST /v1/audio/speech { "model": "openai/tts-1", "input": "你好", "voice": "alloy" }

# 圖片編輯（multipart）
POST /v1/images/edits  -F image=@input.png -F prompt="..." -F mask=@mask.png

# 影片/音樂生成（提供者前綴模型 ID）
POST /v1/videos/generations { "model": "runway/gen-3", "prompt": "..." }
POST /v1/music/generations  { "model": "suno/v3.5",   "prompt": "..." }
```

### 專用提供者路由

```bash
POST /v1/providers/{provider}/chat/completions
POST /v1/providers/{provider}/embeddings
POST /v1/providers/{provider}/images/generations
```

如果缺少提供者前綴，會自動加上。模型不符時回傳 `400`。

---

## 檔案 API

OpenAI 相容的檔案端點，用於批次輸入/輸出和檔案用途上傳。

| 方法   | 路徑                     | 說明                                                                                          |
| ------ | ------------------------ | --------------------------------------------------------------------------------------------- |
| POST   | `/v1/files`              | 上傳檔案（multipart：`file`、`purpose`、`expires_after[anchor]`、`expires_after[seconds]`）— 最大 512 MiB |
| GET    | `/v1/files`              | 列出已驗證 API 金鑰的檔案                                                                      |
| GET    | `/v1/files/[id]`         | 取得檔案的中繼資料                                                                             |
| DELETE | `/v1/files/[id]`         | 刪除檔案                                                                                      |
| GET    | `/v1/files/[id]/content` | 串流回傳原始檔案內容                                                                           |

**驗證：** Bearer API 金鑰 — 檔案透過 `getApiKeyRequestScope` 按 API 金鑰範圍隔離。

---

## 批次 API

OpenAI 相容的批次處理。

| 方法   | 路徑                       | 說明                                                                                            |
| ------ | -------------------------- | ------------------------------------------------------------------------------------------------ |
| POST   | `/v1/batches`              | 建立批次 — 主體由 `v1BatchCreateSchema` 驗證（`input_file_id`、`endpoint`、`completion_window`） |
| GET    | `/v1/batches`              | 列出批次                                                                                         |
| GET    | `/v1/batches/[id]`         | 取得批次狀態 + `request_counts`                                                                  |
| DELETE | `/v1/batches/[id]`         | 刪除已完成/失敗的批次                                                                             |
| POST   | `/v1/batches/[id]/cancel`  | 取消進行中的批次                                                                                  |

**驗證：** Bearer API 金鑰。批次按 API 金鑰範圍隔離。

---

## 搜尋 API

Web/搜尋提供者抽象層（Tavily、Brave、Exa、Serper 等）。

| 方法   | 路徑                    | 說明                                                              |
| ------ | ----------------------- | ----------------------------------------------------------------- |
| GET    | `/v1/search`            | 列出已配置的搜尋提供者 + 功能                                        |
| POST   | `/v1/search`            | 執行搜尋查詢 — 主體由 `v1SearchSchema` 驗證，支援快取/合併           |
| GET    | `/v1/search/analytics`  | 各提供者的命中/延遲/快取統計                                         |

**驗證：** Bearer API 金鑰（`extractApiKey` + `isValidApiKey`）。搜尋政策透過 `enforceApiKeyPolicy` 強制執行。

---

## WebSocket 串流

```bash
GET /v1/ws?handshake=1
```

驗證 WebSocket 升級握手並回傳線路協定範例訊息（`request`、`cancel`）。實際 WS 框架由捆綁的 WS 伺服器在 Next.js 路由表外處理。

**驗證：** 握手期間使用 Bearer API 金鑰。

### 透過 WebSocket 的 Responses API（僅限 codex）

```bash
# 與 HTTP API 相同的主機:埠（預設 20128）；升級連線：
wscat -c "ws://localhost:20128/v1/responses?api_key=<OMNIROUTE_API_KEY>"
# （或：-H "Authorization: Bearer <OMNIR...KEY>"）

# 第一幀必須是 response.create：
{ "type": "response.create", "model": "gpt-5.5", "input": [ { "role": "user", "content": "嗨" } ] }
```

Responses-API-over-WebSocket 代理**僅連線至 `codex`**（ChatGPT 後端）。它與 API/儀表板共用相同埠，路徑為 `/v1/responses`、`/responses` 和 `/api/v1/responses`。在第一個 `response.create` 幀時，它透過內部 `codex-responses-ws` 橋接器進行驗證 + 準備，選取 codex OAuth 連線，並透過 `wreq-js` 傳輸隧道至 `wss://chatgpt.com/backend-api/codex/responses`。**非 codex 模型會被拒絕**（`codex_ws_provider_required`）。對於配額共享路由，請使用 `model: "qtSd/<group>/codex/<model>"`。實作於 `app/server-ws.mjs` + `scripts/dev/responses-ws-proxy.mjs` + `src/app/api/internal/codex-responses-ws/route.ts`。

**驗證：** 握手期間使用 Bearer API 金鑰。捆綁的 HTTP 伺服器（`server-ws.mjs`）必須為作用中進入點（預設情況下，當 `app/server-ws.mjs` 存在時即為）。

#### 模型 ID：使用 bare ChatGPT ID（不含 `codex/` 前綴）

OpenAI **Codex CLI** 在 `supports_websockets = true` 時會於用戶端驗證模型名稱，並**拒絕帶提供者前綴的 ID**，例如 `codex/gpt-5.5`（`使用 ChatGPT 帳戶使用 Codex 時不支援 'codex/gpt-5.5' 模型`）。請傳送**裸** ID（例如 `gpt-5.5`）。OmniRoute 的橋接器僅限 codex，因此它會將裸 ID 重新解析為 codex 模型（`resolveCodexWsModelInfo`），然後再隧道至上游 — 即使裸 `gpt-5.5` 在其他情況下會透過 HTTP 路由至另一個提供者。

#### 配置 OpenAI Codex CLI

將 Codex CLI 指向 OmniRoute，方法是在 `~/.codex/config.toml` 中新增一個支援 WebSocket 的自訂提供者（使用單獨的 `CODEX_HOME` 以避免觸碰現有配置）：

```toml
model = "gpt-5.5"                 # 裸 ID — 不是 "codex/gpt-5.5"
model_provider = "omniroute"

[model_providers.omniroute]
name = "OmniRoute (WS)"
base_url = "http://localhost:20128/v1"   # 無尾斜線；WS URL 由此衍生（生產環境使用 https/wss）
wire_api = "responses"                    # 自 2026 年 2 月以來唯一支援的值
supports_websockets = true                # 啟用 Responses-over-WS 傳輸
env_key = "OMNIROUTE_API_KEY"             # 存放 OmniRoute API 金鑰（Bearer）
```

```bash
export OMNIROUTE_API_KEY=sk-...           # OmniRoute API 金鑰（若 REQUIRE_API_KEY=false 則任意金鑰）
codex exec "Responda apenas: PONG"
```

CLI 將 `base_url + /responses` 升級為 WebSocket，而 OmniRoute 將其隧道至選取的 codex OAuth 連線。已針對本機伺服器進行端到端驗證：ChatGPT 回傳 `codex.rate_limits` + `response.created` 並串流完成內容。

---

## 配額與問題回報

| 方法   | 路徑                 | 說明                                                                |
| ------ | -------------------- | ------------------------------------------------------------------- |
| GET    | `/v1/quotas/check`   | 在發行註冊金鑰前預先驗證 `provider` + `accountId` 的配額             |
| POST   | `/v1/issues/report`  | 將配額/金鑰發行失敗回報至 GitHub（需要 `GITHUB_ISSUES_REPO` + 權杖） |

**驗證：** Bearer API 金鑰（`isAuthenticated`）。

---

## 語義快取

```bash
# 取得快取統計
GET /api/cache/stats

# 清除所有快取
DELETE /api/cache/stats
```

回應範例：

```json
{
  "semanticCache": {
    "memorySize": 42,
    "memoryMaxSize": 500,
    "dbSize": 128,
    "hitRate": 0.65
  },
  "idempotency": {
    "activeKeys": 3,
    "windowMs": 5000
  }
}
```

---

## 儀表板與管理

### 身分驗證

| 端點                             | 方法     | 說明              |
| -------------------------------- | -------- | ----------------- |
| `/api/auth/login`                | POST     | 登入              |
| `/api/auth/logout`               | POST     | 登出              |
| `/api/settings/require-login`    | GET/PUT  | 切換需要登入      |

### 提供者管理

| 端點                              | 方法                    | 說明                                |
| --------------------------------- | ----------------------- | ----------------------------------- |
| `/api/providers`                  | GET/POST                | 列出/建立提供者                      |
| `/api/providers/[id]`             | GET/PUT/DELETE          | 管理提供者                          |
| `/api/providers/[id]/test`        | POST                    | 測試提供者連線                      |
| `/api/providers/[id]/models`      | GET                     | 列出提供者模型                      |
| `/api/providers/validate`         | POST                    | 驗證提供者配置                      |
| `/api/providers/bulk`             | POST                    | 為一個提供者大量新增 API 金鑰       |
| `/api/providers/import`           | POST                    | 從解析的 CSV/JSON 檔案匯入異質提供者清單（#6836）；每列部分失敗結果 |
| `/api/provider-nodes*`            | 各種                    | 提供者節點管理                      |
| `/api/provider-models`            | GET/POST/PATCH/DELETE   | 自訂模型（新增、更新、隱藏/顯示、刪除） |

### OAuth 流程

| 端點                              | 方法     | 說明                |
| --------------------------------- | -------- | ------------------- |
| `/api/oauth/[provider]/[action]`  | 各種     | 提供者特定 OAuth    |

### 路由與配置

| 端點                   | 方法      | 說明                          |
| ---------------------- | --------- | ----------------------------- |
| `/api/models/alias`    | GET/POST  | 模型別名                      |
| `/api/models/catalog`  | GET       | 按提供者 + 類型分類的所有模型  |
| `/api/combos*`         | 各種      | 組合管理                      |
| `/api/keys*`           | 各種      | API 金鑰管理                  |
| `/api/pricing`         | GET       | 模型定價                      |

### 用量與分析

| 端點                             | 方法             | 說明                      |
| -------------------------------- | ---------------- | ------------------------- |
| `/api/usage/history`             | GET              | 用量歷史                  |
| `/api/usage/logs`                | GET              | 用量日誌                  |
| `/api/usage/request-logs`        | GET              | 請求層級日誌              |
| `/api/usage/[connectionId]`      | GET              | 各連線用量                |
| `/api/usage/token-limits`        | GET/POST/DELETE  | 各 API 金鑰的權杖限制預算 |

### 設定

| 端點                                     | 方法           | 說明                                |
| ---------------------------------------- | -------------- | ----------------------------------- |
| `/api/settings`                          | GET/PUT/PATCH  | 一般設定                            |
| `/api/settings/proxy`                    | GET/PUT        | 網路代理設定                        |
| `/api/settings/proxy/test`               | POST           | 測試代理連線                        |
| `/api/settings/ip-filter`                | GET/PUT        | IP 允許清單/封鎖清單                |
| `/api/settings/thinking-budget`          | GET/PUT        | 推理權杖預算                        |
| `/api/settings/system-prompt`            | GET/PUT        | 全域系統提示詞                      |
| `/api/settings/compression`              | GET/PUT        | 全域壓縮設定                        |
| `/api/settings/purge-request-history`    | POST           | 清除請求日誌列與本機呼叫記錄檔案    |

### 上下文與壓縮

| 端點                                    | 方法            | 說明                                                      |
| --------------------------------------- | --------------- | --------------------------------------------------------- |
| `/api/compression/preview`              | POST            | 預覽 off/lite/standard/aggressive/ultra/RTK/stacked 壓縮  |
| `/api/compression/language-packs`       | GET             | 列出可用的 Caveman 語言包                                  |
| `/api/compression/rules`                | GET             | 列出 Caveman 規則中繼資料                                  |
| `/api/context/caveman/config`           | GET/PUT         | Caveman 特定設定別名                                       |
| `/api/context/rtk/config`               | GET/PUT         | RTK 特定設定，包含自訂過濾器和原始輸出保留                  |
| `/api/context/rtk/filters`              | GET             | RTK 過濾器目錄和自訂過濾器診斷                             |
| `/api/context/rtk/test`                 | POST            | 對文字負載執行 RTK 預覽/測試                               |
| `/api/context/rtk/raw-output/[id]`      | GET             | 透過指標 ID 讀取保留的編輯後原始輸出                        |
| `/api/context/combos`                   | GET/POST        | 壓縮組合清單/建立                                           |
| `/api/context/combos/[id]`              | GET/PUT/DELETE  | 壓縮組合詳細/更新/刪除                                      |
| `/api/context/combos/[id]/assignments`  | GET/PUT         | 將壓縮組合指派給路由組合                                    |
| `/api/context/analytics`                | GET             | 壓縮分析別名                                               |

### 監控

| 端點                      | 方法       | 說明                                                                          |
| ------------------------- | ---------- | ----------------------------------------------------------------------------- |
| `/api/sessions`           | GET        | 作用中工作階段追蹤                                                              |
| `/api/rate-limits`        | GET        | 各帳戶速率限制                                                                 |
| `/api/monitoring/health`  | GET        | 健康檢查 + 提供者摘要（`catalogCount`、`configuredCount`、`activeCount`、`monitoredCount`） |
| `/api/cache/stats`        | GET/DELETE | 快取統計/清除                                                                  |

### 備份與匯出/匯入

| 端點                         | 方法   | 說明                                    |
| ---------------------------- | ------ | --------------------------------------- |
| `/api/db-backups`            | GET    | 列出可用備份                            |
| `/api/db-backups`            | PUT    | 建立手動備份                            |
| `/api/db-backups`            | POST   | 從特定備份還原                          |
| `/api/db-backups/export`     | GET    | 以 .sqlite 檔案下載資料庫               |
| `/api/db-backups/import`     | POST   | 上傳 .sqlite 檔案以取代資料庫           |
| `/api/db-backups/exportAll`  | GET    | 以 .tar.gz 壓縮檔下載完整備份           |

### 雲端同步

| 端點                    | 方法   | 說明              |
| ----------------------- | ------ | ----------------- |
| `/api/sync/cloud`       | 各種   | 雲端同步操作      |
| `/api/sync/initialize`  | POST   | 初始化同步        |
| `/api/cloud/*`          | 各種   | 雲端管理          |

### 隧道

| 端點                        | 方法   | 說明                                                        |
| --------------------------- | ------ | ----------------------------------------------------------- |
| `/api/tunnels/cloudflared`  | GET    | 讀取儀表板的 Cloudflare Quick Tunnel 安裝/執行時期狀態       |
| `/api/tunnels/cloudflared`  | POST   | 啟用或停用 Cloudflare Quick Tunnel（`action=enable/disable`）|
| `/api/tunnels/ngrok`        | GET    | 讀取儀表板的 ngrok Tunnel 執行時期狀態                       |
| `/api/tunnels/ngrok`        | POST   | 啟用或停用 ngrok Tunnel（`action=enable/disable`）            |

### CLI 工具

| 端點                                | 方法   | 說明            |
| ----------------------------------- | ------ | --------------- |
| `/api/cli-tools/claude-settings`    | GET    | Claude CLI 狀態 |
| `/api/cli-tools/codex-settings`     | GET    | Codex CLI 狀態  |
| `/api/cli-tools/droid-settings`     | GET    | Droid CLI 狀態  |
| `/api/cli-tools/openclaw-settings`  | GET    | OpenClaw CLI 狀態 |
| `/api/cli-tools/runtime/[toolId]`   | GET    | 通用 CLI 執行時期 |

CLI 回應包含：`installed`、`runnable`、`command`、`commandPath`、`runtimeMode`、`reason`。

### ACP 代理程式

| 端點             | 方法   | 說明                                              |
| ---------------- | ------ | ------------------------------------------------- |
| `/api/acp/agents`| GET    | 列出所有檢測到的代理程式（內建 + 自訂）及其狀態    |
| `/api/acp/agents`| POST   | 新增自訂代理程式或重新整理偵測快取                |
| `/api/acp/agents`| DELETE | 透過 `id` 查詢參數移除自訂代理程式                 |

GET 回應包含 `agents[]`（id、name、binary、version、installed、protocol、isCustom）和 `summary`（total、installed、notFound、builtIn、custom）。

### 彈性與速率限制

| 端點                               | 方法       | 說明                                                                          |
| ---------------------------------- | ---------- | ----------------------------------------------------------------------------- |
| `/api/resilience`                  | GET/PATCH  | 取得/更新請求佇列、連線冷卻、提供者斷路器和等待設定                          |
| `/api/resilience/reset`            | POST       | 重設提供者斷路器                                                              |
| `/api/resilience/model-cooldowns`  | GET        | 列出作用中的各（提供者、連線、模型）鎖定，按剩餘時間排序                     |
| `/api/resilience/model-cooldowns`  | DELETE     | 清除模型鎖定 — 主體 `{provider, model}` 或 `{all: true}` 以清除全部           |
| `/api/rate-limits`                 | GET        | 各帳戶速率限制狀態                                                             |
| `/api/rate-limit`                  | GET        | 全域速率限制配置                                                               |

> 所有四個 `/api/resilience/*` 路由都需要**管理驗證**（`requireManagementAuth`）。請參閱[彈性（進階）](#彈性進階)以取得提供者斷路器 vs 連線冷卻 vs 模型鎖定的完整說明。

### 評測

| 端點          | 方法      | 說明                      |
| ------------- | --------- | ------------------------- |
| `/api/evals`  | GET/POST  | 列出評測套件 / 執行評測   |

### 政策

| 端點             | 方法             | 說明              |
| ---------------- | ---------------- | ----------------- |
| `/api/policies`  | GET/POST/DELETE  | 管理路由政策      |

### 合規

| 端點                         | 方法 | 說明                    |
| ---------------------------- | ---- | ----------------------- |
| `/api/compliance/audit-log` | GET  | 合規稽核日誌（最近 N 筆）|

### v1beta（Gemini 相容）

| 端點                      | 方法   | 說明                            |
| ------------------------- | ------ | ------------------------------- |
| `/v1beta/models`          | GET    | 以 Gemini 格式列出模型          |
| `/v1beta/models/{...path}`| POST   | Gemini `generateContent` 端點   |

這些端點鏡像 Gemini 的 API 格式，供預期原生 Gemini SDK 相容性的用戶端使用。

### 內部 / 系統 API

| 端點                    | 方法   | 說明                                              |
| ----------------------- | ------ | ------------------------------------------------- |
| `/api/init`             | GET    | 應用程式初始化檢查（首次執行時使用）               |
| `/api/tags`             | GET    | Ollama 相容模型標籤（供 Ollama 用戶端使用）        |
| `/api/restart`          | POST   | 觸發優雅伺服器重新啟動                            |
| `/api/shutdown`         | POST   | 觸發優雅伺服器關閉                                |
| `/api/system/env/repair`| POST   | 修復 OAuth 提供者環境變數                         |

> **注意：** 這些端點供系統內部使用或為 Ollama 用戶端相容性而提供。通常不應由一般使用者呼叫。

### OAuth 環境修復 _(v3.6.1+)_

```bash
POST /api/system/env/repair
Content-Type: application/json

{
  "provider": "claude-code"
}
```

修復特定提供者缺失或損壞的 OAuth 環境變數。回傳：

```json
{
  "success": true,
  "repaired": ["CLAUDE_CODE_OAUTH_CLIENT_ID", "CLAUDE_CODE_OAUTH_CLIENT_SECRET"],
  "backupPath": "/home/user/.omniroute/backups/env-repair-2026-04-11.bak"
}
```

---

## 音訊轉寫

```bash
POST /v1/audio/transcriptions
Authorization: Bearer ***
Content-Type: multipart/form-data
```

使用 Deepgram 或 AssemblyAI 轉寫音訊檔案。

**請求：**

```bash
curl -X POST http://localhost:20128/v1/audio/transcriptions \
  -H "Authorization: Bearer ***" \
  -F "file=@recording.mp3" \
  -F "model=deepgram/nova-3"
```

**回應：**

```json
{
  "text": "你好，這是轉寫後的音訊內容。",
  "task": "transcribe",
  "language": "zh",
  "duration": 12.5
}
```

**支援的提供者：** `deepgram/nova-3`、`assemblyai/best`。

**支援的格式：** `mp3`、`wav`、`m4a`、`flac`、`ogg`、`webm`。

---

## Ollama 相容性

對於使用 Ollama API 格式的用戶端：

```bash
# 聊天端點（Ollama 格式）
POST /v1/api/chat

# 模型列表（Ollama 格式）
GET /api/tags
```

請求會自動在 Ollama 與內部格式之間轉換。

## 權杖化 VS Code / 無標頭別名

當整合無法注入 `Authorization` 標頭且需要將 API 金鑰嵌入基本 URL 時，請使用這些別名。

```bash
# OpenAI 樣式目錄別名
GET /api/v1/vscode/{token}/
GET /api/v1/vscode/{token}/models

# OpenAI 樣式聊天別名
POST /api/v1/vscode/{token}/chat/completions
POST /api/v1/vscode/{token}/responses

# Ollama 樣式別名
POST /api/v1/vscode/{token}/api/chat
GET /api/v1/vscode/{token}/api/tags
```

範例：

```bash
curl https://your-host.example/api/v1/vscode/YOUR_API_KEY/models
curl -X POST https://your-host.example/api/v1/vscode/YOUR_API_KEY/chat/completions \
  -H "Content-Type: application/json" \
  -d '{"model":"auto","messages":[{"role":"user","content":"你好"}]}'
```

備註：

- 權杖化別名重用與 `/v1/*` 和 `/api/tags` 相同的處理常式；回應格式保持不變。
- 當用戶端支援自訂標頭時，優先使用 `Authorization: Bearer ***`。
- URL 中的權杖可能會出現於反向代理日誌、瀏覽器歷史記錄和 OmniRoute 外的遙測資料中。請將其視為相容性選項，而非預設驗證模式。

---

## 遙測

```bash
# 取得延遲遙測摘要（各提供者的 p50/p95/p99）
GET /api/telemetry/summary
```

**回應：**

```json
{
  "providers": {
    "claudeCode": { "p50": 245, "p95": 890, "p99": 1200, "count": 150 },
    "github": { "p50": 180, "p95": 620, "p99": 950, "count": 320 }
  }
}
```

---

## 預算

```bash
# 取得所有 API 金鑰的預算狀態
GET /api/usage/budget

# 設定或更新預算
POST /api/usage/budget
Content-Type: application/json

{
  "apiKeyId": "key-123",
  "dailyLimitUsd": 5.00,
  "weeklyLimitUsd": 30.00,
  "monthlyLimitUsd": 100.00,
  "warningThreshold": 0.8,
  "resetInterval": "monthly"
}
```

> **結構描述備註**（`setBudgetSchema`）：`apiKeyId` 為必填；`dailyLimitUsd`、`weeklyLimitUsd` 或 `monthlyLimitUsd` 至少一個必須大於零。選用欄位：`warningThreshold`（0–1）、`resetInterval`（`daily` | `weekly` | `monthly`）、`resetTime`（`HH:MM`）。舊版 `{keyId, limit, period}` 格式會回傳 `400 Bad Request`。

## 權杖限制

各 API 金鑰的**權杖**預算（與上述以美金為基礎的預算不同）。在請求路徑上即時強制執行：當金鑰的當前窗口用量達到限制時，請求會被拒絕，回傳 `429 Too Many Requests`。限制可限定於特定 `model`、`provider`，或套用至金鑰的 `global` 範圍；當多個限制符合請求時，最嚴格的限制會勝出。

```bash
# 列出金鑰的權杖限制（包含即時窗口用量）
GET /api/usage/token-limits?apiKeyId=key-123

# 建立或更新權杖限制
POST /api/usage/token-limits
Content-Type: application/json

{
  "apiKeyId": "key-123",
  "scopeType": "model",
  "scopeValue": "openai/gpt-4o",
  "tokenLimit": 1000000,
  "resetInterval": "monthly",
  "enabled": true
}

# 依 ID 刪除權杖限制
DELETE /api/usage/token-limits?id=tl-abc
```

> **結構描述備註**（`setTokenLimitSchema`）：`apiKeyId` 和 `scopeType`（`model` | `provider` | `global`）為必填。`scopeValue` 為必填，除非 `scopeType` 為 `global`（例如 `model` 範圍傳入模型 ID，`provider` 範圍傳入提供者 ID）。`tokenLimit` 必須為正整數（可從字串強制轉換）。選用：`id`（省略為建立，提供則為更新）、`resetInterval`（`daily` | `weekly` | `monthly`，預設 `monthly`）、`resetTime`（`HH:MM`）、`enabled`（預設 `true`）。`GET` 回應會為每個限制補充 `tokensUsed`、`remaining`、`windowStart`、`periodStartAt` 和 `nextResetAt`。此為管理層級端點（驗證由 authz 管線集中強制執行）。

## 請求處理

1. 用戶端傳送請求至 `/v1/*`
2. 路由處理常式呼叫 `handleChat`、`handleEmbedding`、`handleAudioTranscription` 或 `handleImageGeneration`
3. 解析模型（直接提供者/模型或別名/組合）
4. 從本機資料庫選取憑證，並依帳戶可用性過濾
5. 聊天：`handleChatCore` 檢查語義/簽章快取並解析組合壓縮設定
6. 啟用時，在提供者轉換前執行主動壓縮（`lite`、Caveman、RTK 或 stacked）
7. 提供者執行器傳送上游請求
8. 將回應轉換回用戶端格式（聊天）或原樣回傳（嵌入/圖片/音訊）
9. 記錄用量、壓縮分析和請求日誌
10. 根據組合規則，在發生錯誤時套用後備方案

完整架構參考：[`ARCHITECTURE.md`](../architecture/ARCHITECTURE.md)

---

## 組合管理

更高層級的路由組合（已在 `/api/combos*` 下摘要）也可以從模型 ID 模式進行 1:1 映射，允許將 OpenAI 樣式模型 ID 透明重新導向至組合。

| 方法   | 路徑                                  | 說明                                                              |
| ------ | ------------------------------------- | ----------------------------------------------------------------- |
| GET    | `/api/model-combo-mappings`           | 列出所有模型→組合映射                                              |
| POST   | `/api/model-combo-mappings`           | 建立映射 — 主體：`{pattern, comboId, priority?, enabled?, description?}` |
| GET    | `/api/model-combo-mappings/[id]`      | 取得單一映射                                                      |
| PUT    | `/api/model-combo-mappings/[id]`      | 更新現有映射的欄位                                                |
| DELETE | `/api/model-combo-mappings/[id]`      | 移除映射                                                          |

**驗證：** 管理工作階段/API 金鑰（`requireManagementAuth`）。

---

## Webhook

OmniRoute 事件（請求完成、配額耗盡、金鑰輪換等）的外送 Webhook 訂閱。

| 方法   | 路徑                        | 說明                                                              |
| ------ | --------------------------- | ----------------------------------------------------------------- |
| GET    | `/api/webhooks`             | 列出 webhook（密碼以 `<prefix>...` 遮罩）                         |
| POST   | `/api/webhooks`             | 建立 webhook — 主體：`{url, events?: ["*"], secret?, description?}` |
| GET    | `/api/webhooks/[id]`        | 取得 webhook                                                      |
| PUT    | `/api/webhooks/[id]`        | 更新 url/events/secret/description                                |
| DELETE | `/api/webhooks/[id]`        | 移除 webhook                                                      |
| POST   | `/api/webhooks/[id]/test`   | 傳送測試負載至 webhook URL 並回傳傳遞狀態                          |

**驗證：** 管理工作階段/API 金鑰（`requireManagementAuth`）。

---

## 註冊金鑰（自動管理）

由自動金鑰管理子系統使用，針對後端提供者/帳戶發行和輪換 API 金鑰，並設有每日/每小時配額。

| 方法   | 路徑                                    | 說明                                                                                                                            |
| ------ | --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| GET    | `/api/v1/registered-keys`               | 列出註冊金鑰（僅顯示遮罩前綴）                                                                                                  |
| POST   | `/api/v1/registered-keys`               | 發行新的註冊金鑰 — 主體：`{name, provider?, accountId?, idempotencyKey?, expiresAt?, dailyBudget?, hourlyBudget?}`。回傳原始金鑰**一次**。配額不足時回傳 `429`。 |
| GET    | `/api/v1/registered-keys/[id]`          | 取得註冊金鑰的中繼資料（不含原始材料）                                                                                          |
| DELETE | `/api/v1/registered-keys/[id]`          | 撤銷註冊金鑰                                                                                                                    |
| POST   | `/api/v1/registered-keys/[id]/revoke`   | 明確撤銷端點（與 DELETE 效果相同）                                                                                               |

**驗證：** Bearer API 金鑰（`isAuthenticated`）。另請參閱 `/v1/quotas/check` 和 `/v1/issues/report`。

---

## 代理程式協定

雲端代理程式任務（Claude Code、Codex Cloud、OpenHands 等），代表 OmniRoute 使用者遠端執行。

| 方法   | 路徑                             | 說明                                                                                                                      |
| ------ | -------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| GET    | `/api/v1/agents/tasks`           | 列出任務 — 選用 `?provider=`、`?status=`、`?limit=`（1–500，預設 50）                                                     |
| POST   | `/api/v1/agents/tasks`           | 建立任務 — 主體由 `CreateCloudAgentTaskSchema` 驗證（`providerId`、`prompt`、`source`、`options?`）。回傳 `201` 及任務封裝 |
| DELETE | `/api/v1/agents/tasks?id=...`    | 刪除任務                                                                                                                   |
| GET    | `/api/v1/agents/tasks/[id]`      | 讀取任務 — 當設定 `external_id` 時，會同步從上游雲端代理程式重新整理狀態                                                    |
| POST   | `/api/v1/agents/tasks/[id]`      | 區分動作：`{action: "approve"}`、`{action: "message", message}` 或 `{action: "cancel"}`                                   |
| DELETE | `/api/v1/agents/tasks/[id]`      | 依 ID 刪除特定任務                                                                                                          |

> **驗證：** 每個方法都需要管理驗證（`requireCloudAgentManagementAuth`）。在 v3.8.0 之前，這些端點未經驗證 — 請參閱提交 `588a0333` 以了解重大變更。

```bash
# 建立 Claude Code 雲端任務
curl -X POST http://localhost:20128/api/v1/agents/tasks \
  -H "Authorization: Bearer your-m...-key" \
  -H "Content-Type: application/json" \
  -d '{"providerId":"claude-code-cloud","prompt":"修復失敗的測試","source":{"repo":"...","branch":"..."}}'
```

---

## 管理代理

可指派給提供者、帳戶或全域的外送 HTTP(S)/SOCKS 代理。

| 方法   | 路徑                                              | 說明                                                                                                                              |
| ------ | ------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| GET    | `/api/v1/management/proxies`                      | 列出代理（使用 `?id=` 回傳單一代理；使用 `?id=&where_used=1` 回傳指派圖）                                                          |
| POST   | `/api/v1/management/proxies`                      | 建立代理 — 主體由 `createProxyRegistrySchema` 驗證                                                                                 |
| PATCH  | `/api/v1/management/proxies`                      | 更新代理 — 主體由 `updateProxyRegistrySchema` 驗證（需要 `id`）                                                                    |
| DELETE | `/api/v1/management/proxies?id=...&force=1`       | 刪除代理（使用 `force=1` 來分離指派）                                                                                              |
| GET    | `/api/v1/management/proxies/assignments`          | 列出指派 — 可依 `proxy_id`、`scope`、`scope_id` 過濾；傳入 `resolve_connection_id=<id>` 以解析連線的作用中代理                     |
| PUT    | `/api/v1/management/proxies/assignments`          | 指派 — 主體由 `proxyAssignmentSchema` 驗證（`{scope, scopeId?, proxyId?}`）。清除調度器快取                                        |
| PUT    | `/api/v1/management/proxies/bulk-assign`          | 大量指派 — 主體由 `bulkProxyAssignmentSchema` 驗證（`{scope, scopeIds[], proxyId?}`）                                               |
| GET    | `/api/v1/management/proxies/health?hours=24`      | 匯總窗口內的代理健康狀態（成功/失敗計數、延遲）                                                                                    |

**驗證：** 每個路由都需要管理工作階段/API 金鑰（`requireManagementAuth`）。

> 任務說明中的 `POST /api/v1/management/proxies/[id]/assignments` 和 `POST /api/v1/management/proxies/[id]/health` 由上述平面 `/assignments` 和 `/health` 路由提供服務 — 程式碼庫中不存在每個 ID 的子路由。

---

## 彈性（進階）

OmniRoute 公開三種獨立的暫時性故障機制；下面的管理端點讓運算子可以讀取和覆寫它們：

| 範圍               | 狀態儲存                                  | 讀取                                      | 重設/清除                                     |
| ------------------- | ----------------------------------------- | ----------------------------------------- | --------------------------------------------- |
| 提供者斷路器        | `domain_circuit_breakers` + 記憶體內      | `/api/monitoring/health`                  | `POST /api/resilience/reset`                  |
| 連線冷卻            | 提供者連線上的 `rateLimitedUntil`         | `/api/rate-limits`、`/api/providers/[id]` | （惰性重新啟用；透過提供者 PUT 清除）          |
| 模型鎖定            | 記憶體內模型可用性註冊表                   | `GET /api/resilience/model-cooldowns`     | `DELETE /api/resilience/model-cooldowns`       |

`PATCH /api/resilience` 接受 `providerBreaker.oauth` 和 `providerBreaker.apikey` 下的提供者斷路器覆寫。每個設定檔支援 `degradationThreshold`、`failureThreshold` 和 `resetTimeoutMs`；相同的欄位也顯示在儀表板 → 設定 → 彈性中。

```bash
# 清除單一模型鎖定
curl -X DELETE http://localhost:20128/api/resilience/model-cooldowns \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{"provider":"openai","model":"gpt-4o-mini"}'

# 清除所有鎖定
curl -X DELETE http://localhost:20128/api/resilience/model-cooldowns \
  -H "Cookie: auth_token=..." \
  -d '{"all":true}'
```

完整概念參考和斷路器預設值：請參閱 [`CLAUDE.md`](../../CLAUDE.md) →「彈性執行時期狀態」。

---

## 技能

用於以自訂可執行處理常式擴充 OmniRoute 的技能框架，以及市集整合。

| 方法   | 路徑                                   | 說明                                                                                                                      |
| ------ | -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| GET    | `/api/skills`                          | 列出已安裝技能 — 可依 `?q=`、`?mode=on\|off\|auto`、`?source=skillsmp\|skillssh\|local` 過濾，支援分頁                     |
| GET    | `/api/skills/[id]`                     | 取得單一技能                                                                                                              |
| PUT    | `/api/skills/[id]`                     | 更新技能（名稱、說明、模式、結構描述、處理常式、標籤）                                                                      |
| DELETE | `/api/skills/[id]`                     | 解除安裝技能                                                                                                              |
| POST   | `/api/skills/install`                  | 從原始資訊清單安裝技能 — 主體：`{name, version, description, schema:{input, output}, handlerCode, apiKeyId?}`                |
| GET    | `/api/skills/executions`               | 列出最近的技能執行記錄（稽核軌跡，含輸入/輸出/持續時間）                                                                    |
| GET    | `/api/skills/marketplace?q=...`        | 從 SkillsMP 市集搜尋/熱門清單（需要 `skillsmpApiKey` 設定）                                                                |
| POST   | `/api/skills/marketplace/install`      | 從 SkillsMP 依 ID 安裝技能                                                                                                |
| GET    | `/api/skills/skillssh?q=&limit=`       | 搜尋 skills.sh 註冊表                                                                                                     |
| POST   | `/api/skills/skillssh/install`         | 從 skills.sh 依 ID 安裝技能                                                                                               |

**驗證：** 管理工作階段/API 金鑰。市集搜尋路由接受管理驗證或 Bearer API 金鑰（`isAuthenticated`）。

---

## 記憶

持久性的對話/事實記憶儲存，按 API 金鑰/工作階段範圍隔離。

| 方法   | 路徑                  | 說明                                                                                                  |
| ------ | --------------------- | ----------------------------------------------------------------------------------------------------- |
| GET    | `/api/memory`         | 列出記憶 — `?apiKeyId=`、`?type=`、`?sessionId=`、`?q=`，支援 `offset/limit` 或 `page/limit` 分頁     |
| POST   | `/api/memory`         | 建立記憶 — 主體由 Zod 驗證：`{content, key, type?, sessionId?, apiKeyId?, metadata?, expiresAt?}`     |
| GET    | `/api/memory/[id]`    | 取得單一記憶                                                                                          |
| DELETE | `/api/memory/[id]`    | 刪除記憶                                                                                              |
| GET    | `/api/memory/health`  | 記憶子系統健康狀態（資料庫連線、嵌入後端、向量索引狀態）                                               |

**驗證：** 管理工作階段/API 金鑰（`requireManagementAuth`）。`type` 列舉：`FACTUAL`、`EPISODIC`、`SEMANTIC`、`PROCEDURAL`（請參閱 `src/lib/memory/types.ts` 中的 `MemoryType`）。

---

## MCP 伺服器

OmniRoute 內嵌了一個模型上下文協定伺服器，具有 3 種傳輸方式（stdio、SSE、streamable-http）和範圍限定的工具。下方的儀表板端點可讀取狀態/稽核資料並代理 HTTP 傳輸。

| 方法   | 路徑                     | 說明                                                                                            |
| ------ | ------------------------ | ----------------------------------------------------------------------------------------------- | -------------------- |
| GET    | `/api/mcp/status`        | 心跳、傳輸、線上狀態、最後呼叫、熱門工具、24 小時成功率                                          |
| GET    | `/api/mcp/tools`         | MCP 工具清單，包含 `name`、`description`、`scopes`、`phase`、`auditLevel`、`sourceEndpoints`     |
| GET    | `/api/mcp/sse`           | 開啟 SSE 傳輸的 SSE 串流（若 MCP 停用或傳輸不符則回傳 `503`）                                    |
| POST   | `/api/mcp/sse`           | 在 SSE 傳輸上傳送 JSON-RPC 框架                                                                  |
| GET    | `/api/mcp/stream`        | 開啟 Streamable HTTP 傳輸的 SSE 端（伺服器發起訊息）                                             |
| POST   | `/api/mcp/stream`        | 在 Streamable HTTP 傳輸上傳送 JSON-RPC 框架                                                      |
| DELETE | `/api/mcp/stream`        | 結束 Streamable HTTP 工作階段                                                                    |
| GET    | `/api/mcp/audit`         | 查詢稽核日誌 — `?limit=`、`?offset=`、`?tool=`、`?success=true                                   | false`、`?apiKeyId=` |
| GET    | `/api/mcp/audit/stats`   | 匯總稽核統計（總數、成功率、平均持續時間、熱門工具）                                              |

**驗證：** `sse`/`stream` 傳輸遵循 MCP 特定的驗證表面（具有 `mcp` 範圍的 Bearer API 金鑰）；`status`/`tools`/`audit*` 路由可從儀表板讀取（除了到達儀表板主機外，不需要額外驗證）。

> 兩種 HTTP 傳輸均由 `settings.mcpEnabled` 和 `settings.mcpTransport` 控制 — 傳輸不符回傳 `400`，MCP 停用狀態回傳 `503`。

---

## A2A 伺服器

OmniRoute 公開一個 A2A（代理程式對代理程式）JSON-RPC 2.0 端點，以及用於檢視/儀表板使用的 REST 包裝器。

### JSON-RPC

```bash
POST /a2a
Authorization: Bearer ***   # 選用，除非設定了 OMNIROUTE_API_KEY
Content-Type: application/json

{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "message/send",
  "params": {
    "skill": "smart-routing",
    "messages": [{"role": "user", "content": "路由此編碼任務"}]
  }
}
```

支援的方法（全部由 `settings.a2aEnabled` 控制）：

| 方法             | 說明                                                      |
| ---------------- | --------------------------------------------------------- |
| `message/send`   | 同步技能執行；回傳 `{task, artifacts, metadata}`          |
| `message/stream` | 相同技能集的串流 SSE 執行                                  |
| `tasks/get`      | 依 `taskId` 取得任務                                      |
| `tasks/cancel`   | 依 `taskId` 取消任務                                      |

內建技能：`smart-routing`、`quota-management`、`provider-discovery`、`cost-analysis`、`health-report`。

### Agent Card

```bash
GET /.well-known/agent.json
```

回傳公開的 A2A agent card（名稱、說明、功能、技能目錄、驗證方案）— 公開快取 1 小時。不需要驗證。

### REST 輔助工具

| 方法   | 路徑                           | 說明                                                                                          |
| ------ | ------------------------------ | --------------------------------------------------------------------------------------------- |
| GET    | `/api/a2a/status`              | A2A 啟用狀態 + 任務統計 + 快取的 agent card 摘要                                                |
| GET    | `/api/a2a/tasks`               | 列出任務 — `?state=submitted\|working\|completed\|failed\|cancelled`、`?skill=`、`?limit=`（≤200）、`?offset=` |
| POST   | `/api/a2a/tasks`               | （未實作為 REST 輔助工具 — 請透過 JSON-RPC `message/send` 建立）                               |
| GET    | `/api/a2a/tasks/[id]`          | 取得單一任務                                                                                  |
| POST   | `/api/a2a/tasks/[id]/cancel`   | 取消任務                                                                                      |

**驗證：** REST 輔助工具在無管理驗證下執行（可從儀表板讀取）；JSON-RPC `/a2a` 路由在配置時使用 Bearer `OMNIROUTE_API_KEY`。

---

## 雲端、評測與評估

| 方法   | 路徑                               | 說明                                                                                                              |
| ------ | ---------------------------------- | ----------------------------------------------------------------------------------------------------------------- | ----------------------------- | ----------------------------------- |
| POST   | `/api/cloud/auth`                  | 驗證 Bearer 金鑰並為雲端同步用戶端回傳遮罩的提供者連線 + 模型別名                                                    |
| POST   | `/api/cloud/credentials/update`    | 更新雲端同步提供者的加密憑證                                                                                      |
| POST   | `/api/cloud/model/resolve`         | 使用本機路由表將邏輯模型 ID 解析為具體的提供者/模型                                                                |
| GET    | `/api/cloud/models/alias`          | 列出向雲端同步公開的模型別名                                                                                      |
| GET    | `/api/assess`                      | 讀取最新評估分類（各提供者/模型）                                                                                  |
| POST   | `/api/assess`                      | 執行評估 — 主體：`{scope: {type:"all"}                                                                             | {type:"provider", providerId} | {type:"model", modelId}, trigger?}` |
| GET    | `/api/evals`                       | 列出內建評測套件 + 最近執行                                                                                        |
| POST   | `/api/evals`                       | 觸發評測執行                                                                                                      |
| POST   | `/api/evals/suites`                | 建立自訂評測套件 — 主體由 `evalSuiteSaveSchema` 驗證                                                               |
| GET    | `/api/evals/suites/[id]`           | 取得自訂評測套件                                                                                                  |

**驗證：** `/api/cloud/auth` 直接驗證 Bearer 金鑰；其他 `/api/cloud/*`、`/api/evals/*` 和 `/api/assess` 路由需要管理工作階段/API 金鑰。`/api/assess` POST 使用 `validateBody` 搭配區分聯集範圍結構描述。

---

## ACP（代理程式用戶端協定）管理

ACP 代理程式以子程序執行。這些端點管理 ACP 代理程式偵測和自訂代理程式註冊。

| 方法   | 路徑                | 說明                                                                                                                              |
| ------ | ------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| GET    | `/api/acp/agents`   | 列出所有已知的 CLI 代理程式（內建 + 自訂），含安裝狀態、版本、二進位檔                                                               |
| POST   | `/api/acp/agents`   | 註冊自訂 ACP 代理程式或重新整理快取 — 主體：`{id, name, binary, versionCommand, providerAlias, spawnArgs, protocol}` 或 `{action: "refresh"}` |
| DELETE | `/api/acp/agents`   | 移除自訂 ACP 代理程式 — 查詢參數：`?id=<agentId>`                                                                                 |

**回應範例**（`GET /api/acp/agents`）：

```json
{
  "agents": [
    {
      "id": "claude",
      "name": "Claude Code CLI",
      "binary": "claude",
      "version": "1.0.45",
      "installed": true,
      "protocol": "stdio",
      "providerAlias": "claude",
      "isCustom": false
    },
    {
      "id": "my-custom-cli",
      "name": "我的自訂 CLI",
      "installed": false,
      "protocol": "stdio",
      "providerAlias": "my-provider",
      "isCustom": true
    }
  ],
  "cacheTtlMs": 60000,
  "cacheAge": 1234
}
```

**驗證：** 需要管理工作階段（儀表板 `auth_token` cookie）或管理範圍的 API 金鑰。

請參閱 [ACP 框架](../frameworks/ACP.md) 以取得完整詳細資訊。

---

## 分析與可觀測性

用於監控路由、壓縮和提供者多樣性的即時分析端點。這些為 `/dashboard/analytics/*` 頁面提供支援。

### 自動路由分析

| 方法   | 路徑                                  | 說明                                                                                          |
| ------ | ------------------------------------- | --------------------------------------------------------------------------------------------- |
| GET    | `/api/analytics/auto-routing`         | 匯總自動路由統計：總呼叫數、策略分佈、層級分佈、熱門提供者                                      |
| GET    | `/api/analytics/auto-routing?days=7`  | 時間窗口統計（預設 24 小時）                                                                   |

**回應範例：**

```json
{
  "window": "24h",
  "totalCalls": 1234,
  "strategyBreakdown": {
    "rules": 800,
    "cost": 200,
    "latency": 150,
    "sla-aware": 50,
    "lkgp": 34
  },
  "tierBreakdown": {
    "ultra": 100,
    "pro": 500,
    "standard": 400,
    "free": 234
  },
  "topProviders": [
    { "provider": "openai", "calls": 500, "avgLatencyMs": 850 },
    { "provider": "anthropic", "calls": 300, "avgLatencyMs": 1200 }
  ]
}
```

### 壓縮分析

| 方法   | 路徑                            | 說明                                                                  |
| ------ | ------------------------------- | --------------------------------------------------------------------- |
| GET    | `/api/analytics/compression`    | 匯總壓縮統計：節省的權杖、節省百分比、模式分佈、引擎使用量              |

**回應範例：**

```json
{
  "window": "24h",
  "totalOriginalTokens": 5000000,
  "totalCompressedTokens": 3500000,
  "totalSavings": 1500000,
  "savingsPct": 30.0,
  "modeBreakdown": {
    "lite": 400,
    "standard": 600,
    "aggressive": 100,
    "ultra": 50,
    "rtk": 84
  },
  "engineBreakdown": {
    "caveman": 800,
    "rtk": 434
  }
}
```

### 提供者多樣性追蹤

| 方法   | 路徑                          | 說明                                                                                        |
| ------ | ----------------------------- | ------------------------------------------------------------------------------------------- |
| GET    | `/api/analytics/diversity`    | 基於 Shannon 熵的多樣性追蹤：透過衡量提供者分佈來防止單點故障                                  |

**回應範例：**

```json
{
  "window": "24h",
  "shannonEntropy": 2.45,
  "maxEntropy": 3.17,
  "diversityRatio": 0.77,
  "providerUsage": {
    "openai": 0.4,
    "anthropic": 0.25,
    "google": 0.2,
    "kiro": 0.15
  },
  "warnings": ["OpenAI 佔了 40% 的流量 — 建議增加多樣性"]
}
```

**驗證：** 需要管理工作階段或管理範圍的 API 金鑰。

---

## 管理員操作

僅限管理員的營運管理端點。

| 方法   | 路徑                      | 說明                                                                                           |
| ------ | ------------------------- | ---------------------------------------------------------------------------------------------- |
| GET    | `/api/admin/concurrency`  | 讀取當前並行限制（全域 + 各提供者）                                                             |
| POST   | `/api/admin/concurrency`  | 更新並行限制 — 主體：`{global?: number, perProvider?: Record<string, number>}`                  |

**驗證：** 需要具有管理員範圍的管理工作階段。

---

## CLI 工具管理

管理與 OmniRoute 整合的 CLI 工具（antigravity、chipotle、commandCode、devin-cli 等）。請參閱[提供者參考](./PROVIDER_REFERENCE.md)以取得完整清單。

| 方法   | 路徑                                       | 說明                                                                                            |
| ------ | ------------------------------------------ | ----------------------------------------------------------------------------------------------- |
| GET    | `/api/cli-tools/all-statuses`              | 所有 CLI 工具的狀態（已安裝、版本、最後上線時間）                                                |
| GET    | `/api/cli-tools/[id]/status`               | 特定 CLI 工具的狀態（ID 可為：antigravity、chipotle、commandCode、devin-cli 等）                 |
| POST   | `/api/cli-tools/apply`                     | 將 CLI 工具配置套用至提供者連線                                                                 |
| GET    | `/api/cli-tools/backups`                   | 列出 CLI 工具配置備份                                                                           |
| POST   | `/api/cli-tools/backups`                   | 建立所有 CLI 工具配置的備份                                                                     |
| POST   | `/api/cli-tools/[id]/restore`              | 從備份還原 CLI 工具                                                                             |
| GET    | `/api/cli-tools/antigravity-mitm`          | Antigravity MITM 代理狀態（「antigravity-mitm」CLI 工具）                                       |
| POST   | `/api/cli-tools/antigravity-mitm/alias`    | 配置 antigravity-mitm 別名                                                                      |

**驗證：** 需要管理工作階段。

---

## 代理程式技能

管理 AI 代理程式技能（類似於 OpenAI 的自訂 GPT，但用於代理程式）。

| 方法   | 路徑                            | 說明                                                                                 |
| ------ | ------------------------------- | ------------------------------------------------------------------------------------ |
| GET    | `/api/agent-skills`             | 列出所有代理程式技能（內建 + 自訂）                                                    |
| GET    | `/api/agent-skills/[id]`        | 取得特定代理程式技能                                                                  |
| POST   | `/api/agent-skills`             | 建立自訂代理程式技能 — 主體：`{name, description, prompt, model?, temperature?}`      |
| PUT    | `/api/agent-skills/[id]`        | 更新自訂代理程式技能                                                                  |
| DELETE | `/api/agent-skills/[id]`        | 刪除自訂代理程式技能                                                                  |
| GET    | `/api/agent-skills/[id]/raw`    | 取得原始提示詞 + 中繼資料（不含執行）                                                  |
| POST   | `/api/agent-skills/generate`    | 以自然語言描述 AI 生成新技能                                                          |

**驗證：** 需要管理工作階段或管理範圍的 API 金鑰。

---

## 快取管理

管理語義快取和推理快取。

| 方法   | 路徑                      | 說明                                                                                                  |
| ------ | ------------------------- | ----------------------------------------------------------------------------------------------------- |
| GET    | `/api/cache`              | 快取概覽：總條目數、命中率、磁碟大小                                                                  |
| GET    | `/api/cache/entries`      | 列出快取條目（支援分頁）                                                                              |
| DELETE | `/api/cache/entries`      | 刪除快取條目（依查詢參數過濾）                                                                        |
| GET    | `/api/cache/stats`        | 詳細快取統計（各提供者、各模型）                                                                      |
| GET    | `/api/cache/reasoning`    | 推理快取狀態（用於推理重播）                                                                          |
| DELETE | `/api/cache/reasoning`    | 清除推理快取 — 查詢參數：`?toolCallId=<id>`（單一）或 `?provider=<p>` 或無參數（全部）                  |

**驗證：** 需要管理工作階段。

---

## 記憶系統

管理持久性記憶（FTS5 + 向量嵌入）。

| 方法   | 路徑                    | 說明                                                        |
| ------ | ----------------------- | ----------------------------------------------------------- |
| GET    | `/api/memory`           | 列出記憶條目（依範圍、類型、搜尋查詢過濾）                   |
| POST   | `/api/memory`           | 建立新的記憶條目 — 主體：`{scope, type, content, metadata?}`|
| GET    | `/api/memory/[id]`      | 取得特定記憶條目                                             |
| PUT    | `/api/memory/[id]`      | 更新記憶條目                                                 |
| DELETE | `/api/memory/[id]`      | 刪除記憶條目                                                 |
| GET    | `/api/memory/search`    | 搜尋記憶（FTS5 + 向量）                                      |
| POST   | `/api/memory/clear`     | 清除記憶條目（含過濾器）                                     |
| GET    | `/api/memory/stats`     | 記憶統計（總條目數、嵌入覆蓋率等）                            |

**驗證：** 需要管理工作階段或管理範圍的 API 金鑰。

---

## Webhook

管理事件的 Webhook 訂閱。

| 方法   | 路徑                               | 說明                                                                    |
| ------ | ---------------------------------- | ----------------------------------------------------------------------- |
| GET    | `/api/webhooks`                    | 列出所有 Webhook 訂閱                                                    |
| POST   | `/api/webhooks`                    | 建立 Webhook 訂閱 — 主體：`{url, events[], secret?, active?}`           |
| GET    | `/api/webhooks/[id]`               | 取得特定 Webhook 訂閱                                                   |
| PUT    | `/api/webhooks/[id]`               | 更新 Webhook 訂閱                                                       |
| DELETE | `/api/webhooks/[id]`               | 刪除 Webhook 訂閱                                                       |
| GET    | `/api/webhooks/events`             | 列出所有可用的 Webhook 事件類型                                          |
| GET    | `/api/webhooks/[id]/deliveries`    | 列出 Webhook 的傳遞歷史記錄（成功/失敗日誌）                              |
| POST   | `/api/webhooks/[id]/test`          | 向 Webhook 傳送測試事件                                                  |

**驗證：** 需要管理工作階段。

請參閱 [Webhook 框架](../frameworks/WEBHOOKS.md)以取得完整的事件類型。

---

## 技能框架

管理技能（代理程式擴充框架）。

| 方法   | 路徑                        | 說明                                                                                 |
| ------ | --------------------------- | ------------------------------------------------------------------------------------ |
| GET    | `/api/skills`               | 列出所有已安裝的技能（內建 + 自訂）                                                    |
| POST   | `/api/skills/install`       | 從本機路徑或 URL 安裝技能                                                             |
| DELETE | `/api/skills/[id]`          | 解除安裝技能                                                                         |
| PUT    | `/api/skills/[id]`          | 啟用或停用技能 — 主體：`{enabled?: boolean, mode?: "on" \| "off" \| "auto"}`           |
| POST   | `/api/skills/executions`    | 執行技能 — 主體：`{skillName, apiKeyId, input?, sessionId?}`                          |
| GET    | `/api/skills/executions`    | 列出所有技能的執行歷史（依 `?apiKeyId=` 過濾）                                        |

**驗證：** 需要管理工作階段或管理範圍的 API 金鑰。

請參閱[技能框架](../frameworks/SKILLS.md)以取得完整詳細資訊。

---

## 外掛程式

管理 OmniRoute 外掛程式（第三方擴充套件）。

| 方法   | 路徑                                | 說明                              |
| ------ | ----------------------------------- | --------------------------------- |
| GET    | `/api/plugins`                      | 列出已安裝的外掛程式               |
| POST   | `/api/plugins/install`              | 從本機路徑或 URL 安裝外掛程式      |
| DELETE | `/api/plugins/[name]`               | 解除安裝外掛程式                   |
| POST   | `/api/plugins/[name]/activate`      | 啟用外掛程式                       |
| POST   | `/api/plugins/[name]/deactivate`    | 停用外掛程式                       |
| GET    | `/api/plugins/[name]/config`        | 取得外掛程式設定                   |
| PUT    | `/api/plugins/[name]/config`        | 更新外掛程式設定                   |

**驗證：** 需要管理工作階段。

請參閱[外掛程式框架](../frameworks/PLUGIN_SDK.md)以取得完整詳細資訊。

---

## 影子路由

提供者的影子 / A-B 比較**不是一個獨立的 REST 表面** — 它是透過組合路由配置的（請參閱[自動組合](../routing/AUTO-COMBO.md)）。各組合的比較指標由 `GET /api/combos/metrics` 提供。

---

## 防護機制

檢查執行時期防護機制（PII 偵測、提示注入偵測、視覺橋接）。防護機制在每個請求上執行；每次呼叫的選擇退出方式是透過 `x-omniroute-disabled-guardrails` 請求標頭 — 沒有持久的啟用/停用表面。

| 方法   | 路徑                      | 說明                                                                                |
| ------ | ------------------------- | ----------------------------------------------------------------------------------- |
| GET    | `/api/guardrails`         | 列出已註冊的防護機制及其狀態（名稱/已啟用/優先順序）                                   |
| POST   | `/api/guardrails/test`    | 對範例輸入乾執行呼叫前管線 — 主體：`{input, disabledGuardrails?}`                    |

**驗證：** 需要管理工作階段。

請參閱[安全性 > 防護機制](../security/GUARDRAILS.md)以取得完整詳細資訊。

---

---

## 身分驗證

- 儀表板路由（`/dashboard/*`）使用 `auth_token` cookie
- 登入使用儲存的密碼雜湊；後備為 `INITIAL_PASSWORD`
- `requireLogin` 可透過 `/api/settings/require-login` 切換
- `/v1/*` 路由在 `REQUIRE_API_KEY=true` 時可選擇要求 Bearer API 金鑰

> **重大變更（v3.8.0）** — `/api/v1/agents/tasks/*` 和冷卻管理端點現在需要**管理驗證**（儀表板 `auth_token` cookie 或管理範圍的 API 金鑰）。先前未經驗證即可呼叫這些路由的用戶端將收到 `401 Unauthorized`。請參閱提交 `588a0333`（`fix(auth): require management auth for agent and cooldown APIs`）。
