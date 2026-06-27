# CLAUDE.md (中文 (繁體))

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇦🇿 [az](../az/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇮🇩 [in](../in/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md)

---

該文件為在此代碼庫中使用 Claude Code (claude.ai/code) 提供指導。

## 快速開始

```bash
npm install                    # 安裝依賴（從 .env.example 自動生成 .env）
npm run dev                    # 開發伺服器在 http://localhost:20128
npm run build                  # 生產構建（Next.js 16 獨立版）
npm run lint                   # ESLint（預期 0 個錯誤；警告為先前存在）
npm run typecheck:core         # TypeScript 檢查（應為乾淨）
npm run typecheck:noimplicit:core  # 嚴格檢查（無隱式 any）
npm run test:coverage          # 單元測試 + 覆蓋門檻（75/75/75/70 — 語句/行/函數/分支）
npm run check                  # lint + 測試組合
npm run check:cycles           # 檢測循環依賴
```

### 運行測試

```bash
# 單個測試文件（Node.js 原生測試運行器 — 大多數測試）
node --import tsx/esm --test tests/unit/your-file.test.ts

# Vitest（MCP 伺服器，autoCombo，緩存）
npm run test:vitest

# 所有測試套件
npm run test:all
```

有關完整的測試矩陣，請參見 `CONTRIBUTING.md` → "運行測試"。有關深層架構，請參見 `AGENTS.md`。

---

## 項目概覽

**OmniRoute** — 統一的 AI 代理/路由器。一個端點，160+ LLM 提供者，自動回退。

| 層級       | 位置                    | 目的                                                             |
| ---------- | ----------------------- | ---------------------------------------------------------------- |
| API 路由   | `src/app/api/v1/`       | Next.js 應用路由 — 入口點                                        |
| 處理程序   | `open-sse/handlers/`    | 請求處理（聊天、嵌入等）                                         |
| 執行器     | `open-sse/executors/`   | 特定提供者的 HTTP 調度                                           |
| 轉換器     | `open-sse/translator/`  | 格式轉換（OpenAI↔Claude↔Gemini）                                 |
| 轉換器     | `open-sse/transformer/` | 響應 API ↔ 聊天完成                                              |
| 服務       | `open-sse/services/`    | 組合路由、速率限制、緩存等                                       |
| 資料庫     | `src/lib/db/`           | SQLite 域模塊（45+ 文件，55 次遷移）                             |
| 域/策略    | `src/domain/`           | 策略引擎、成本規則、回退邏輯                                     |
| MCP 伺服器 | `open-sse/mcp-server/`  | 37 個工具（30 基礎 + 3 內存 + 4 技能），3 個傳輸，大約 13 個範圍 |
| A2A 伺服器 | `src/lib/a2a/`          | JSON-RPC 2.0 代理協議                                            |
| 技能       | `src/lib/skills/`       | 可擴展的技能框架                                                 |
| 內存       | `src/lib/memory/`       | 持久化對話內存                                                   |

Monorepo: `src/`（Next.js 16 應用），`open-sse/`（流媒體引擎工作區），`electron/`（桌面應用），`tests/`，`bin/`（CLI 入口點）。

---

## 請求管道

```
客戶端 → /v1/chat/completions (Next.js 路由)
  → CORS → Zod 驗證 → 認證? → 策略檢查 → 提示注入保護
  → handleChatCore() [open-sse/handlers/chatCore.ts]
    → 緩存檢查 → 速率限制 → 組合路由?
      → resolveComboTargets() → 針對每個目標調用 handleSingleModel()
    → translateRequest() → getExecutor() → executor.execute()
      → fetch() 上遊 → 重試 w/ 回退
    → 響應翻譯 → SSE 流或 JSON
    → 如果是 Responses API: responsesTransformer.ts TransformStream
```

API 路由遵循一致的模式：`路由 → CORS 預檢 → Zod 請求體驗證 → 可選認證 (extractApiKey/isValidApiKey) → API 密鑰策略執行 → 處理程序委派 (open-sse)`。沒有全局的 Next.js 中間件 — 攔截是路由特定的。

**組合路由** (`open-sse/services/combo.ts`): 14 種策略（優先級、加權、優先填充、輪詢、P2C、隨機、最少使用、成本優化、重置感知、嚴格隨機、自動、lkgp、上下文優化、上下文中繼）。每個目標調用 `handleSingleModel()`，該函數用每個目標的錯誤處理和電路斷路器檢查包裝 `handleChatCore()`。有關 9 因子自動組合評分的資訊，請參見 `docs/routing/AUTO-COMBO.md`，有關 3 層彈性的資訊，請參見 `docs/architecture/RESILIENCE_GUIDE.md`。

---

## 彈性運行時狀態

OmniRoute 有三種相關但不同的臨時故障機制。在調試路由行為時，請保持它們的範圍分開。請參見
[3 層彈性圖](./docs/diagrams/exported/resilience-3layers.svg)
（來源: [docs/diagrams/resilience-3layers.mmd](./docs/diagrams/resilience-3layers.mmd)）
以獲取一目了然的地圖。

### 提供者電路斷路器

**範圍**: 整個提供者，例如 `glm`、`openai`、`anthropic`。

**目的**: 停止向一個在上遊/服務級別反覆失敗的提供者發送流量，以便一個不健康的提供者不會減慢每個請求的速度。

**實現**:

- 核心類: `src/shared/utils/circuitBreaker.ts`
- 聊天門控/執行連接: `src/sse/handlers/chatHelpers.ts`，`src/sse/handlers/chat.ts`
- 運行時狀態 API: `src/app/api/monitoring/health/route.ts`
- 共享包裝器: `open-sse/services/accountFallback.ts`
- 持久化狀態表: `domain_circuit_breakers`

**狀態**:

- `CLOSED`: 允許正常流量。
- `OPEN`: 提供者暫時被阻止；調用者會收到提供者電路打開的響應，或者組合路由跳過到另一個目標。
- `HALF_OPEN`: 重置超時已過；允許探測請求。成功關閉斷路器，失敗再次打開。

**默認值** (`open-sse/config/constants.ts`):

- OAuth 提供者: 閾值 `3`，重置超時 `60s`。
- API 密鑰提供者: 閾值 `5`，重置超時 `30s`。
- 本地提供者: 閾值 `2`，重置超時 `15s`。

只有提供者級別的故障狀態應該觸發提供者斷路器：

```ts
(408, 500, 502, 503, 504);
```

不要因正常的帳戶/密鑰/模型錯誤（如大多數 `401`、`403` 或 `429` 情況）而觸發整個提供者斷路器。這些通常屬於連接冷卻或模型鎖定。除非被歸類為終端提供者/帳戶錯誤，否則通用 API 密鑰提供者的 `403` 應該是可恢復的。

斷路器使用懶惰恢復，而不是後臺定時器。當 `OPEN` 過期時，像 `getStatus()`、`canExecute()` 和 `getRetryAfterMs()` 這樣的讀取會將狀態刷新為 `HALF_OPEN`，以便儀錶板和組合候選構建器不會永遠排除一個過期的提供者。

### 連接冷卻

**範圍**: 一個提供者連接/帳戶/密鑰。

**目的**: 暫時跳過一個壞的密鑰/帳戶，同時允許同一提供者的其他連接繼續處理請求。

**實現**:

- 寫入/更新路徑: `src/sse/services/auth.ts::markAccountUnavailable()`
- 帳戶選擇/過濾: `src/sse/services/auth.ts::getProviderCredentials...`
- 冷卻計算: `open-sse/services/accountFallback.ts::checkFallbackError()`
- 設置: `src/lib/resilience/settings.ts`

提供者連接上的重要欄位：

```ts
rateLimitedUntil;
testStatus: "unavailable";
lastError;
lastErrorType;
errorCode;
backoffLevel;
```

在帳戶選擇期間，當以下條件成立時，連接會被跳過：

```ts
new Date(rateLimitedUntil).getTime() > Date.now();
```

冷卻也是懶惰的：當 `rateLimitedUntil` 在過去時，連接再次變得合格。在成功使用時，`clearAccountError()` 會清除 `testStatus`、`rateLimitedUntil`、錯誤欄位和 `backoffLevel`。

默認連接冷卻行為：

- OAuth 基礎冷卻: `5s`。
- API 密鑰基礎冷卻: `3s`。
- API 密鑰 `429` 應優先考慮上遊重試提示（`Retry-After`、重置頭或可解析的重置文本），如果可用。
- 重複的可恢復故障使用指數回退：

```ts
baseCooldownMs * 2 ** failureIndex;
```

反雷霆集群保護防止同一連接上的並發故障反覆延長冷卻或雙重增加 `backoffLevel`。

終端狀態不是冷卻狀態。`banned`、`expired` 和 `credits_exhausted` 旨在保持不可用，直到憑據/設置更改或操作員重置它們。不要用瞬態冷卻狀態覆蓋終端狀態。

### 模型鎖定

**範圍**: 提供者 + 連接 + 模型。

**目的**: 避免在只有一個模型不可用或配額限制的情況下禁用整個連接。

示例：

- 每模型配額提供者返回 `429`。
- 本地提供者因缺少一個模型返回 `404`。
- 提供者特定的模式/模型權限失敗，例如選擇的 Grok 模式。

模型鎖定位於 `open-sse/services/accountFallback.ts`，允許同一連接繼續處理其他模型。

### 調試指導

- 如果一個提供者的所有密鑰都被跳過，請檢查提供者斷路器狀態和每個連接的 `rateLimitedUntil`/`testStatus`。
- 如果一個提供者在重置窗口後似乎被永久排除，請檢查代碼是否在讀取原始 `state` 而不是使用 `getStatus()`/`canExecute()`。
- 如果一個提供者密鑰失敗但其他密鑰應該有效，請優先考慮連接冷卻而不是提供者斷路器。
- 如果只有一個模型失敗，請優先考慮模型鎖定而不是連接冷卻。
- 如果一個狀態應該自我恢復，它應該有一個未來的時間戳/重置超時和一個讀取路徑來刷新過期狀態。永久狀態需要手動憑據或設定更改。

## 關鍵約定

### 代碼風格

- **2個空格**，分號，雙引號，100字符寬度，es5尾隨逗號（通過lint-staged和Prettier強制執行）
- **導入**：外部 → 內部（`@/`，`@omniroute/open-sse`）→ 相對
- **命名**：文件=camelCase/kebab，組件=PascalCase，常量=UPPER_SNAKE
- **ESLint**：`no-eval`，`no-implied-eval`，`no-new-func` = 在任何地方都報錯；`no-explicit-any` = 在`open-sse/`和`tests/`中警告
- **TypeScript**：`strict: false`，目標ES2022，模塊esnext，解析器為打包器。優先使用顯式類型。

### 資料庫

- **始終**通過`src/lib/db/`域模塊 — **絕不**在路由或處理程序中編寫原始SQL
- **絕不**在`src/lib/localDb.ts`中添加邏輯（僅為重新導出層）
- **絕不**從`localDb.ts`進行桶導入 — 而是導入特定的`db/`模塊
- DB單例：`getDbInstance()`來自`src/lib/db/core.ts`（WAL日誌記錄）
- 遷移：`src/lib/db/migrations/` — 版本化的SQL文件，冪等，在事務中運行

### 錯誤處理

- 使用特定錯誤類型的try/catch，使用pino上下文記錄
- 在SSE流中絕不吞噬錯誤 — 使用中止信號進行清理
- 返回適當的HTTP狀態碼（4xx/5xx）

### 安全性

- **絕不**使用`eval()`，`new Function()`或隱式eval
- 使用Zod模式驗證所有輸入
- 在靜態存儲中加密憑據（AES-256-GCM）
- 上遊頭部拒絕列表：`src/shared/constants/upstreamHeaders.ts` — 編輯時保持清理、Zod模式和單元測試一致
- **公共上遊憑據**（Gemini/Antigravity/Windsurf風格的OAuth client_id/secret + 從公共CLI提取的Firebase Web密鑰）：**必須**通過`resolvePublicCred()`嵌入，來自`open-sse/utils/publicCreds.ts` — **絕不**作為字符串字面量。請參見`docs/security/PUBLIC_CREDS.md`以獲取強制模式。
- **錯誤響應**（HTTP / SSE / 執行器 / MCP處理程序）：**必須**通過`buildErrorBody()`或`sanitizeErrorMessage()`路由，來自`open-sse/utils/error.ts` — **絕不**將原始`err.stack`或`err.message`放入響應體中。請參見`docs/security/ERROR_SANITIZATION.md`。
- **從變量構建的Shell命令**：在調用`exec()`/`spawn()`時，如果腳本需要運行時值，通過`env`選項傳遞（自動進行Shell轉義） — **絕不**將不受信任/外部路徑字符串插入腳本體中。參考：`src/mitm/cert/install.ts::updateNssDatabases`。
- **默認安全庫**（[tldrsec/awesome-secure-defaults](https://github.com/tldrsec/awesome-secure-defaults)）：在添加新的安全敏感表面時，優先使用Helmet.js、DOMPurify、ssrf-req-filter、safe-regex、Google Tink，而不是自定義實現。

---

## 常見修改場景

### 添加新提供者

1. 在`src/shared/constants/providers.ts`中註冊（加載時進行Zod驗證）
2. 如果需要自定義邏輯，則在`open-sse/executors/`中添加執行器（擴展`BaseExecutor`）
3. 如果是非OpenAI格式，則在`open-sse/translator/`中添加翻譯器
4. 如果基於OAuth，則在`src/lib/oauth/constants/oauth.ts`中添加OAuth設定 — 如果上遊CLI提供公共client_id/secret，則通過`resolvePublicCred()`嵌入（見`docs/security/PUBLIC_CREDS.md`），**絕不**作為字面量
5. 在`open-sse/config/providerRegistry.ts`中註冊模型
6. 在`tests/unit/`中編寫測試（如果添加了新的嵌入默認，則包括publicCreds形狀斷言）

### 添加新API路由

1. 在`src/app/api/v1/your-route/`下創建目錄
2. 創建`route.ts`，包含`GET`/`POST`處理程序
3. 遵循模式：CORS → Zod主體驗證 → 可選身份驗證 → 處理程序委託
4. 處理程序放在`open-sse/handlers/`中（從那裡導入，而不是內聯）
5. 錯誤響應使用`buildErrorBody()` / `errorResponse()`來自`open-sse/utils/error.ts`（自動清理 — 絕不將`err.stack`或`err.message`原樣放入主體中）。請參見`docs/security/ERROR_SANITIZATION.md`。
6. 添加測試 — 包括至少一個斷言，確保錯誤響應不洩露堆棧跟蹤（`!body.error.message.includes("at /")`）

### 添加新DB模塊

1. 創建`src/lib/db/yourModule.ts` — 從`./core.ts`導入`getDbInstance`
2. 導出您的域表的CRUD函數
3. 如果需要新表，則在`src/lib/db/migrations/`中添加遷移
4. 從`src/lib/localDb.ts`重新導出（僅添加到重新導出列表中）
5. 編寫測試

### 添加新MCP工具

1. 在`open-sse/mcp-server/tools/`中添加工具定義，包含Zod輸入模式 + 異步處理程序
2. 在工具集中註冊（通過`createMcpServer()`連接）
3. 分配給適當的範圍
4. 編寫測試（工具調用記錄到`mcp_audit`表中）

### 添加新A2A技能

1. 在`src/lib/a2a/skills/`中創建技能（已有5個：智能路由、配額管理、提供者發現、成本分析、健康報告）
2. 技能接收任務上下文（消息、元數據）→ 返回結構化結果
3. 在`src/lib/a2a/taskExecution.ts`中的`A2A_SKILL_HANDLERS`中註冊
4. 在`src/app/.well-known/agent.json/route.ts`中公開（代理卡）
5. 在`tests/unit/`中編寫測試
6. 在`docs/frameworks/A2A-SERVER.md`技能表中記錄

### 添加新雲代理

1. 在`src/lib/cloudAgent/agents/`中創建代理類，擴展`CloudAgentBase`（已有3個：codex-cloud、devin、jules）
2. 實現`createTask`、`getStatus`、`approvePlan`、`sendMessage`、`listSources`
3. 在`src/lib/cloudAgent/registry.ts`中註冊
4. 如果需要，添加OAuth/憑據處理（`src/lib/oauth/providers/`）
5. 測試 + 在`docs/frameworks/CLOUD_AGENT.md`中記錄

### 添加新護欄 / 評估 / 技能 / Webhook事件

- 護欄：`src/lib/guardrails/` → 文檔：`docs/security/GUARDRAILS.md`
- 評估套件：`src/lib/evals/` → 文檔：`docs/frameworks/EVALS.md`
- 技能（沙盒）：`src/lib/skills/` → 文檔：`docs/frameworks/SKILLS.md`
- Webhook事件：`src/lib/webhookDispatcher.ts` → 文檔：`docs/frameworks/WEBHOOKS.md`

## 參考文檔

對於任何非平凡的更改，請先閱讀相應的深入分析：

| 領域                            | 文檔                                                              |
| ------------------------------- | ----------------------------------------------------------------- |
| 倉庫導航                        | `docs/architecture/REPOSITORY_MAP.md`                             |
| 架構                            | `docs/architecture/ARCHITECTURE.md`                               |
| 工程參考                        | `docs/architecture/CODEBASE_DOCUMENTATION.md`                     |
| 自動組合（9因子評分，14種策略） | `docs/routing/AUTO-COMBO.md`                                      |
| 彈性（3種機制）                 | `docs/architecture/RESILIENCE_GUIDE.md`                           |
| 推理重放                        | `docs/routing/REASONING_REPLAY.md`                                |
| 技能框架                        | `docs/frameworks/SKILLS.md`                                       |
| 內存系統（FTS5 + Qdrant）       | `docs/frameworks/MEMORY.md`                                       |
| 雲代理                          | `docs/frameworks/CLOUD_AGENT.md`                                  |
| 保護措施（PII / 注入 / 視覺）   | `docs/security/GUARDRAILS.md`                                     |
| 公共上遊憑證（Gemini等）        | `docs/security/PUBLIC_CREDS.md`                                   |
| 錯誤資訊清理                    | `docs/security/ERROR_SANITIZATION.md`                             |
| 評估                            | `docs/frameworks/EVALS.md`                                        |
| 合規 / 審計                     | `docs/security/COMPLIANCE.md`                                     |
| Webhooks                        | `docs/frameworks/WEBHOOKS.md`                                     |
| 授權管道                        | `docs/architecture/AUTHZ_GUIDE.md`                                |
| 隱身（TLS / 指紋）              | `docs/security/STEALTH_GUIDE.md`                                  |
| 代理協議（A2A / ACP / 雲）      | `docs/frameworks/AGENT_PROTOCOLS_GUIDE.md`                        |
| MCP 伺服器                      | `docs/frameworks/MCP-SERVER.md`                                   |
| A2A 伺服器                      | `docs/frameworks/A2A-SERVER.md`                                   |
| API 參考 + OpenAPI              | `docs/reference/API_REFERENCE.md` + `docs/reference/openapi.yaml` |
| 提供者目錄（自動生成）          | `docs/reference/PROVIDER_REFERENCE.md`                            |
| 發布流程                        | `docs/ops/RELEASE_CHECKLIST.md`                                   |

---

## 測試

| 內容                    | 命令                                                      |
| ----------------------- | --------------------------------------------------------- |
| 單元測試                | `npm run test:unit`                                       |
| 單個文件                | `node --import tsx/esm --test tests/unit/file.test.ts`    |
| Vitest (MCP, autoCombo) | `npm run test:vitest`                                     |
| E2E (Playwright)        | `npm run test:e2e`                                        |
| 協議 E2E (MCP+A2A)      | `npm run test:protocols:e2e`                              |
| 生態系統                | `npm run test:ecosystem`                                  |
| 覆蓋門限                | `npm run test:coverage` (75/75/75/70 — 語句/行/函數/分支) |
| 覆蓋報告                | `npm run coverage:report`                                 |

**PR 規則**：如果您更改了 `src/`、`open-sse/`、`electron/` 或 `bin/` 中的生產代碼，您必須在同一 PR 中包含或更新測試。

**測試層級偏好**：單元測試優先 → 集成測試（多模塊或資料庫狀態） → E2E（僅限 UI/工作流）。在修復之前或同時將錯誤重現編碼為自動化測試。

**Copilot 覆蓋政策**：當 PR 更改生產代碼且覆蓋率低於 75%（語句/行/函數）或 70%（分支）時，不僅僅報告 — 添加或更新測試，重新運行覆蓋門限，然後請求確認。在 PR 報告中包含運行的命令、已更改的測試文件和最終覆蓋結果。

---

## Git 工作流

```bash
# 永遠不要直接提交到 main
git checkout -b feat/your-feature
git commit -m "feat: 描述您的更改"
git push -u origin feat/your-feature
```

**分支前綴**：`feat/`、`fix/`、`refactor/`、`docs/`、`test/`、`chore/`

**提交格式**（傳統提交）：`feat(db): 添加電路斷路器` — 範圍：`db`、`sse`、`oauth`、`dashboard`、`api`、`cli`、`docker`、`ci`、`mcp`、`a2a`、`memory`、`skills`

**Husky 鉤子**：

- **pre-commit**：lint-staged + `check-docs-sync` + `check:any-budget:t11`
- **pre-push**：`npm run test:unit`

---

## 環境

- **運行時**：Node.js ≥20.20.2 <21 || ≥22.22.2 <23 || ≥24 <25, ES Modules
- **TypeScript**：5.9+，目標 ES2022，模塊 esnext，解析器 bundler
- **路徑別名**：`@/*` → `src/`，`@omniroute/open-sse` → `open-sse/`，`@omniroute/open-sse/*` → `open-sse/*`
- **默認埠**：20128（API + 儀錶板在同一埠）
- **數據目錄**：`DATA_DIR` 環境變量，默認為 `~/.omniroute/`
- **關鍵環境變量**：`PORT`、`JWT_SECRET`、`API_KEY_SECRET`、`INITIAL_PASSWORD`、`REQUIRE_API_KEY`、`APP_LOG_LEVEL`
- 設置：`cp .env.example .env` 然後生成 `JWT_SECRET` (`openssl rand -base64 48`) 和 `API_KEY_SECRET` (`openssl rand -hex 32`)

---

## 硬性規則

1. 永遠不要提交秘密或憑據
2. 永遠不要在 `localDb.ts` 中添加邏輯
3. 永遠不要使用 `eval()` / `new Function()` / 隱式 eval
4. 永遠不要直接提交到 `main`
5. 永遠不要在路由中編寫原始 SQL — 使用 `src/lib/db/` 模塊
6. 永遠不要在 SSE 流中靜默吞噬錯誤
7. 始終使用 Zod 模式驗證輸入
8. 更改生產代碼時始終包含測試
9. 覆蓋率必須保持在 ≥75%（語句、行、函數）/ ≥70%（分支）。當前測量：~82%。
10. 在沒有明確操作員批准的情況下，永遠不要繞過 Husky 鉤子（`--no-verify`，`--no-gpg-sign`）。
11. 永遠不要將公共上遊 OAuth client_id/secret 或 Firebase Web 密鑰作為字符串文字嵌入 — 始終通過 `resolvePublicCred()` 處理（`open-sse/utils/publicCreds.ts`）。參見 `docs/security/PUBLIC_CREDS.md`。
12. 永遠不要在 HTTP / SSE / 執行器響應中返回原始 `err.stack` / `err.message` — 始終通過 `buildErrorBody()` 或 `sanitizeErrorMessage()` 路由（`open-sse/utils/error.ts`）。參見 `docs/security/ERROR_SANITIZATION.md`。
13. 永遠不要將外部路徑或運行時值字符串插值到傳遞給 `exec()`/`spawn()` 的 shell 腳本中 — 應通過 `env` 選項傳遞。參考：`src/mitm/cert/install.ts::updateNssDatabases`。
14. 永遠不要在沒有 (a) 首先檢查上述模式文檔以查看幫助程序是否適用，以及 (b) 在駁回評論中記錄技術理由的情況下駁回 CodeQL / Secret-Scanning 警報。先例：在已經通過 `sanitizeErrorMessage()` 路由的調用站點上引發的 `js/stack-trace-exposure` 是已知的 CodeQL 限制（自定義清理程序未被識別） — 駁回為 `false positive`，引用 `docs/security/ERROR_SANITIZATION.md`。
15. 永遠不要暴露生成子進程的路由（`/api/mcp/`、`/api/cli-tools/runtime/`），而不在 `src/server/authz/routeGuard.ts` 中進行 `isLocalOnlyPath()` 分類。迴環強制執行在任何身份驗證檢查之前無條件發生 — 通過隧道洩露的 JWT 不能觸發進程生成。參見 `docs/security/ROUTE_GUARD_TIERS.md`。
16. 切勿在提交消息中包含將 AI 助手、LLM 或自動化帳戶作為作者的 `Co-Authored-By` 尾部（例如包含 "Claude"、"GPT"、"Copilot"、"Bot" 的名稱；`anthropic.com` / `openai.com` / 機器人擁有的 `noreply.github.com` 地址上的電子郵件）。這類尾部會將 commit 歸屬路由到 GitHub 上的機器人帳戶，從而在 PR 歷史中隱藏真正的作者 (`diegosouzapw`)。人類協作者——包括 upstream PR 作者和被移植到 OmniRoute 的 issue 報告者——可以並且應該使用標準的 `Co-authored-by: Name <email>` 尾部進行署名；upstream-port 工作流（`/port-upstream-features`、`/port-upstream-issues`）依賴於此。
