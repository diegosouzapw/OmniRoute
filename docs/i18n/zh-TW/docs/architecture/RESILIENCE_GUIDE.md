# Resilience Guide (中文 (繁體))

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md)

---

OmniRoute 有三種彼此獨立但相關的韌性機制。每種機制都有不同的範圍與用途。在偵錯路由行為時，請將它們分開處理。

![三層韌性模型](../diagrams/exported/resilience-3layers.svg)

> 來源：[diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

## 1. 提供者斷路器

**範圍：**整個提供者（例如 `glm`、`openai`、`anthropic`）。

**用途：**當提供者在上游／服務層級反覆發生故障時，停止將流量傳送至該提供者。

**實作：**

- 核心類別：`src/shared/utils/circuitBreaker.ts`
- 接線：`src/sse/handlers/chatHelpers.ts`、`src/sse/handlers/chat.ts`
- 狀態 API：`GET /api/monitoring/health`
- 重設 API：`POST /api/resilience/reset`
- 包裝器：`open-sse/services/accountFallback.ts`
- 資料庫資料表：`domain_circuit_breakers`

**狀態：**

- `CLOSED` — 允許正常流量
- `DEGRADED` — 仍允許流量，但會追蹤升高的提供者故障率
- `OPEN` — 暫時封鎖提供者；組合路由會跳過該提供者
- `HALF_OPEN` — 重設逾時時間已過；允許探測請求

**可設定的預設值（`open-sse/config/constants.ts`，公開於「儀表板 → 設定 → 韌性」）：**

| 類別     | 進入降級狀態 | 進入開路狀態 | 重設逾時時間 |
| -------- | ------------ | ------------ | ------------ |
| OAuth    | 5 次失敗     | 8 次失敗     | 60s          |
| API 金鑰 | 7 次失敗     | 12 次失敗    | 30s          |
| 本機     | 衍生值       | 2 次失敗     | 15s          |

`degradationThreshold` 控制提供者何時進入 `DEGRADED`；`failureThreshold` 控制何時進入開路狀態並被跳過。本機提供者設定檔目前尚未公開於「韌性」設定頁面。

**觸發狀態碼：**僅限提供者層級狀態 `[408, 500, 502, 503, 504]`。請勿因帳戶層級錯誤而觸發（大多數 401/403/429——這些應由冷卻或鎖定機制處理）。

**惰性復原：**當 `OPEN` 到期時，`getStatus()`、`canExecute()`、`getRetryAfterMs()` 會將狀態更新為 `HALF_OPEN`。不需要背景計時器。

---

### 選擇啟用的全域提供者冷卻機制（時間窗閘門）

第四層為**選擇啟用**的機制（`PROVIDER_COOLDOWN_ENABLED`，預設為**關閉**），它會在
`open-sse/services/providerCooldownTracker.ts` 中跨請求記錄發生故障的提供者，
組合目標解析會查詢此記錄，使連續的組合請求不會反覆嘗試剛發生故障的提供者。
提供者層級的項目遵循 `PROVIDER_PROFILES` 時間窗閘門：

| 設定檔   | 觸發所需次數（`providerFailureThreshold`） | 時間窗內（`providerFailureWindowMs`） | 冷卻時間（`providerCooldownMs`） |
| -------- | -----------------------------------------: | ------------------------------------: | -------------------------------: |
| OAuth    |                                       `10` |                               `15min` |                           `5min` |
| API 金鑰 |                                       `15` |                               `30min` |                          `10min` |

若低於閾值，則**不會**將提供者視為處於冷卻狀態；成功一次即會清除
該時間窗。連線層級的項目（`provider:connectionId`）則會繼續採用
`minRetryCooldownMs → maxRetryCooldownMs` 指數退避。覆寫設定：
`OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`。
迴歸防護測試：`tests/unit/provider-cooldown-window-gate.test.ts`。

## 2. 連線冷卻

**範圍：** 單一提供者連線／帳戶／金鑰。

**目的：** 略過單一有問題的金鑰，同時讓相同提供者的其他連線繼續提供服務。

**實作：**

- 標記為不可用：`src/sse/services/auth.ts::markAccountUnavailable()`
- 選擇：相同檔案中的 `getProviderCredentials*`
- 冷卻計算：`open-sse/services/accountFallback.ts::checkFallbackError()`
- 設定：`src/lib/resilience/settings.ts`

**每個連線的欄位：**

- `rateLimitedUntil` — 冷卻到期時間戳記
- `testStatus: "unavailable"`
- `lastError`、`lastErrorType`、`errorCode`
- `backoffLevel` — 指數退避計數器

**預設冷卻時間：**

- OAuth 基準：5 秒
- API 金鑰基準：3 秒
- API 金鑰 429：優先採用上游的 `Retry-After`／重設標頭／可解析的重設文字
- 退避：`baseCooldownMs * 2 ** failureIndex`

**防驚群保護機制：** 防止並行失敗過度延長冷卻時間，或重複遞增 `backoffLevel`。

**終止狀態（不是冷卻）：**

- `banned` — 由封禁關鍵字／帳戶封禁偵測設定（請參閱 [BAN_DETECTION](../security/BAN_DETECTION.md)），也會由連續三次上游的逐請求拒絕觸發（`request_rejected`，例如 Anthropic OAuth 403「Request not allowed」— `open-sse/services/requestRejectedStreak.ts`）；單次拒絕只會讓連線進入冷卻
- `expired`（在有限次數的重試後轉為終止狀態 — `EXPIRED_RETRY_MAX = 3`，並使用指數退避 — 因此暫時性的 OAuth 錯誤可在帳戶永久停用前自行恢復）
- `credits_exhausted`

這些狀態會持續存在，直到憑證變更或操作人員將其重設為止。請勿以暫時性冷卻狀態覆寫終止狀態。

**延遲恢復：** 當 `rateLimitedUntil` 已過，連線會再次成為可選用狀態。成功使用後，`clearAccountError()` 會清除所有錯誤欄位。

### Claude OAuth 使用量牆：較低優先順序通道 + 工作階段限制重設

**範圍：** 單一 Claude 訂閱（OAuth）連線。兩項功能都必須**針對每個連線選擇啟用**
（編輯連線 → Claude 區段 → `providerSpecificData` 中的 `lowPriorityMode`／`autoLimitReset`，
兩者預設皆為關閉），並對應 Claude Code 的 `/low-priority` 與
`/limit-reset` 命令（線路協定擷取自 Claude Code 2.1.263）。

**實作：**

- 狀態機 + 回應分類：`open-sse/services/claudeLowPriority.ts`
- 重設狀態／認領用戶端：`open-sse/services/claudeLimitReset.ts`
- 執行器掛鉤（標頭注入 + 相同帳戶重試）：`open-sse/executors/base.ts::execute()`
- 選擇啟用持久化：`src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**觸發條件：** 5 小時使用量牆 — 一個標頭包含
`anthropic-ratelimit-unified-status: rejected`，且當帳戶符合資格時還包含
`anthropic-ratelimit-unified-slow-offer: treatment` 的 `429`。在首次遇到使用量牆
429 之前不會傳送任何內容；不含統一限制標頭的突發 429 會走一般冷卻路徑。

**較低優先順序通道**（`lowPriorityMode`）：

- 遇到使用量牆 429 時，執行器會接受提議，並立即使用 `anthropic-usage-limit: slow`
  重試**相同**帳戶；通道會持續啟用至公告的
  `anthropic-ratelimit-unified-reset`（另加 60 秒寬限期），且該時間範圍內的每個請求都會攜帶
  此標頭。被攔截的 429 永遠不會到達 `handleChatCore`，因此連線
  **不會**進入冷卻，也不會被輪替掉。
- 後續回應中的 `anthropic-ratelimit-unified-slow-status`：`active`／`not_needed`
  會維持通道；`slot_busy`（429）或 `529` 會依伺服器的
  `anthropic-ratelimit-unified-slow-retry-after` 等待（預設 20 秒，限制在 5–600 秒，±30% 抖動）
  並重試，且受 `anthropic-ratelimit-unified-slow-max-wait` 限制（預設 20 分鐘，限制在
  1 分鐘至 6 小時）— 超過後通道會結束，並進入 10 分鐘的冷卻期以阻止再次接受提議。
  等待時間還會受請求本身剩餘的上游啟動逾時所限制
  （`resolveFetchStartTimeout`，預設為 10 分鐘）並扣除 5 秒緩衝：若沒有此上限，
  預設 20 分鐘的最大等待時間將超過請求生命週期，睡眠會在等待途中中止，
  進而呈現 `TimeoutError`，而非正常的 `max_wait` 結束 + 冷卻期。
- `weekly_limit`／`budget_exhausted`／`off`／`ineligible`、5 小時時間窗輪替，或
  `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true`（由於付費超額用量此時已涵蓋使用量牆，
  因此無論狀態為何都會以 `extra_usage` 結束）都會終止通道；接著回應會流向
  一般冷卻路徑。`budget_exhausted` 會記憶至公告的預算重設時間
  （≤ 8 天）。
- 使用量牆檢查會在執行器自身由 400 驅動的嘗試內重試之後執行（上下文
  編輯、思考／投入程度限制、參數自動學習），因此只在其中一次重試中出現的使用量牆 429，
  仍會被攔截，而不會到達冷卻路徑。
- 狀態依連線儲存於記憶體中（重新啟動會多產生一次使用量牆 429，才能重新接受提議）。

**工作階段限制重設**（`autoLimitReset`；兩者皆啟用時，會優先於通道嘗試）：

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → `juniper_tide`
  區塊；當 `arm: "reset"` 且 `available: true` 時，
  使用 `{ "program": "juniper_tide" }` 對
  `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits`
  發出請求（組織 UUID 來自 `providerSpecificData.organizationUUID`，並有啟動程序備援值）。
- `result: reset|not_limited` → 以完整速度重試請求（不含慢速標頭）。
  `already_used`／`not_offered` 會記憶 `next_available_at`（預設為一週）；任何
  失敗都會退避 15 分鐘。重設每週僅可使用一次，且仍會計入
  每週限制。

迴歸防護：`tests/unit/claude-low-priority-mode.test.ts`、
`tests/unit/claude-limit-reset.test.ts`、`tests/unit/claude-low-priority-executor.test.ts`。

### 工作階段親和性 (#7274)

**範圍：** 將單一用戶端工作階段（`X-Session-Id`／`x-codex-session-id`／`x-omniroute-session` 標頭）固定至單一連線，適用於**任何**提供者。

**目的：**讓多輪代理程式（Claude Code、aider、自訂代理程式）在多次請求之間持續使用相同帳戶，減少跨帳戶造成的上下文遺失，以及在具有每帳戶工作階段狀態的提供者上重複發生冷啟動 429。

**實作：**

- TTL 解析：`src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- 釘選選取／建立：`src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- 標頭擷取（通用，適用於任何提供者）：`src/sse/services/auth.ts::extractSessionAffinityKey()`
- 持久化釘選資料表：`sessionAccountAffinity`（`src/lib/db/sessionAccountAffinity.ts`）
- 設定：`sessionAffinityTtlMs`（全域 TTL，以毫秒為單位，`0` 表示停用）— `src/lib/db/settings.ts`。此設定透過遷移 `124_generic_session_affinity_ttl.sql`，從僅限 Codex 的 `codexSessionAffinityTtlMs` 重新命名而來；該遷移會將任何先前設定的 Codex TTL 沿用為新的預設值。

在 #7274 之前，`resolveSessionAffinityTtlMs()` 對 `codex` 以外的所有提供者都會直接提前返回 `0`，因此即使釘選機制和標頭擷取早已與提供者無關，TTL 設定（以及工作階段標頭）在其他任何地方都不會生效。此修正移除了該提前返回；現在只要將全域 TTL 設定為大於 `0`，它就會一致套用至所有提供者。

這三個工作階段親和性標頭絕不會轉送至上游——執行器會從頭建立自己的上游標頭，而不是直接傳遞用戶端標頭，因此它只會作為內部關聯 ID。

### 獨佔式受管理工作階段連線租約

**範圍：**一個作用中的受管理 HTTP 用戶端／工作階段會獨佔一個符合資格的 OmniRoute 連線。

**目的：**為需要在多次請求之間建立嚴格路由界線的用戶端，提供持久且獨佔的連線所有權。這與作為軟性連續性偏好的工作階段親和性不同：獨佔租約會將生命週期狀態持久化至 SQLite、強制確保全域作用中擁有者與作用中連線的唯一性，並在分派至提供者之前拒絕過期的世代。

此功能需針對每個 API 金鑰選擇性啟用。受管理金鑰必須具有 `lease:exclusive` 範圍，以及明確且非空的 `allowedConnections` 清單。任何 HTTP 用戶端皆可使用生命週期端點；不需要指定用戶端名稱、使用者代理、提供者、OAuth 方法或模型。租約擁有的是連線，而不是模型，因此在連線仍正常符合資格時，變更模型仍會保留該繫結。一般的模型、配額、健康狀態、冷卻時間及允許清單規則仍具有最終決定權，並可能將同一世代轉移至另一個可用且符合資格的連線。

生命週期端點為 `POST /api/v1/session-leases`，並使用 JSON 動作 `acquire`、`renew` 和 `release`。受管理的推論請求會提供不透明的 `X-OmniRoute-Lease-Owner` 值，以及完全相符的 `X-OmniRoute-Lease-Generation`。擁有者值由 `vlo_` 後接 43 個 base64url 字元組成；系統只會儲存其 SHA-256 雜湊。每個最終分派界線也會繫結已驗證的 API 金鑰 ID 和作用中連線 ID。租約控制標頭會從記錄、保留的請求快照及上游執行器標頭中移除。

如果一般路由具有符合資格的受管理候選項目，但每個可用候選項目皆由其他作用中的租約佔用，OmniRoute 會返回 HTTP `429`、租約容量不可用代碼、等待容量的狀態，以及根據最早相關到期時間得出的有界 `Retry-After`。一般的無符合資格項目並不屬於租約爭用，並會維持其既有的路由錯誤語意。

相關機制仍彼此獨立：

- OAuth 工作階段佔用是一種程序本機的軟性分配機制，用於 OAuth 帳戶。
- 帳戶號誌會授予請求並行處理許可，並在請求完成時結束。
- 獨佔式受管理工作階段連線租約是一種具有世代界線的持久生命週期所有權機制。

---

## 3. 模型鎖定

**範圍：** 提供者 + 連線 + 模型三元組。

**依狀態碼決定的鍵範圍：** 失敗狀態碼會決定鎖定要寫入哪個鍵
（位於 `open-sse/services/accountFallback/exactModelLock.ts` 的 `resolveLockoutScope()`）：

- `429` / `403` / `402` — 配額或權限訊號 — 鎖定**配額系列**：
  對 codex 而言，是整個 `codex` / `spark` 範圍（該連線的每個 `gpt-5*` 模型）；
  對其他提供者，則使用 `getQuotaScopedModelForProvider()`。
- `404` 會鎖定原始模型（`getModelLockKey()` 會縮小 `not_found` 的範圍）。
- 任何其他狀態碼 — `5xx` 傳輸／伺服器失敗，以及 OmniRoute 自身因品質驗證而
  產生的 `502` — 都只會鎖定**精確的**提供者／連線／模型三元組。某個模型的
  串流異常，不能證明帳戶配額有問題；在採用此規則之前，
  `codex/gpt-5.6-luna` 的一次空回應會讓該連線的所有 `gpt-5*` 模型從路由中
  移除 2–30 分鐘（逐步延長），即使其配額完全未受影響。
- 呼叫端明確指定的 `scope` 選項一律優先（Antigravity 會傳入 `"exact"`）。

**目的：** 避免在只有單一模型無法使用或受到配額限制時，停用整個連線。

**範例：**

- 採用逐模型配額的提供者傳回 429
- 本機提供者針對某個缺少的模型傳回 404
- 提供者特定的模式／模型權限失敗（例如 Grok 模式）

**實作：** `open-sse/services/accountFallback.ts` — `lockModel()`、`clearModelLock()`、`getAllModelLockouts()`。

### 模型冷卻儀表板 (v3.8.0)

UI：設定 → 模型冷卻（`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`）

列出作用中的鎖定，包含：提供者、連線、模型、原因、expiresAt。操作人員可以從卡片手動重新啟用模型。

**REST API：**

- `GET /api/resilience/model-cooldowns` — 列出作用中的鎖定
- `DELETE /api/resilience/model-cooldowns` — 手動重新啟用。本文：`{provider, connection, model}`。驗證：管理權限。

### 鎖定設定 UI + 成功衰減復原 (v3.8.23)

模型鎖定從永遠啟用的硬編碼行為，改為完全可設定、
需主動選擇啟用的功能，並擁有自己的設定卡片與自我修復復原路徑。

**設定卡片：** 設定 → 模型鎖定
（`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`）。
這與上述唯讀的 `ModelCooldownsCard` **不同**（後者只會
_列出_作用中的鎖定）— 新卡片用來_設定參數_。預設值位於
`DEFAULT_MODEL_LOCKOUT_SETTINGS`
（`src/lib/resilience/modelLockoutSettings.ts`）：

| 設定                    | 預設值                           | 意義                                   |
| ----------------------- | -------------------------------- | -------------------------------------- |
| `enabled`               | `false`                          | 主開關 — 模型鎖定**預設為關閉**。      |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | 會被視為模型範圍失敗的上游狀態碼。     |
| `baseCooldownMs`        | `120_000` (120 秒)               | 第一次失敗的初始鎖定時間。             |
| `maxCooldownMs`         | `1_800_000` (30 分鐘)            | 遞增後冷卻時間的上限。                 |
| `maxBackoffSteps`       | `10`                             | 指數退避遞增的最大步數。               |
| `useExponentialBackoff` | `true`                           | 重複失敗時是否以指數方式延長冷卻時間。 |

設定會透過一般設定儲存區持久保存，並經由韌性設定結構描述進行驗證；卡片會限制 `baseCooldownMs`／`maxCooldownMs`
（其中 `maxCooldownMs ≥ baseCooldownMs`）以及 `maxBackoffSteps`。

**成功衰減復原：** 復原**不只是**等待計時器到期。健康的
回應會逐步降低模型的失敗次數，讓在時限內恢復的模型能在計時器到期前
停止遞增（並解除鎖定）。當組合目標成功時，`open-sse/services/combo.ts` 會呼叫 `decayModelFailureCount()`
（`open-sse/services/accountFallback.ts`），將儲存的
`failureCount` **減半**（`Math.floor(failureCount / 2)`）；當其達到 `0` 時，
鎖定項目會被完全刪除。相對應的 `recordModelLockoutFailure()`
會在遞增時間範圍內發生失敗時增加計數（並延長冷卻時間）。
此成功衰減機制是單純計時器到期之外的額外機制 —
任一路徑都可以重新啟用模型。

**狀態：** 鎖定保存在**記憶體中**（每個處理程序各自擁有以
`provider:connectionId:model` 為鍵的 `ModelLockoutEntry` `Map`，精確範圍鎖定則以
`provider:connectionId:exact:model` 為鍵），不會持久保存至
資料庫 — 重新啟動後便會遺失。_設定_會持久保存；作用中的
鎖定_狀態_則是暫時性的。

---

## 4. 配額共享並行控制 (v3.8.36)

訂閱帳戶（GLM、MiniMax 等）通常僅接受約 1–3 個並行請求；超過此限制會觸發 429 與冷卻。此問題在 **quota-share** (`qtSd/…`) 組合中特別明顯，因為多個 API 金鑰會共用同一個上游帳戶。以下三個層級可防止共享帳戶遭大量請求淹沒。

### 各連線的並行上限 (`max_concurrent`)

每個提供者連線都可以宣告 `max_concurrent` 上限
（`provider_connections.max_concurrent`，可在連線對話框／API／DB 中設定）。
留空即表示不設限制。這是驅動下方序列化層的唯一設定項目——請將其設為帳戶的實際並行能力（例如 GLM 約為 1，MiniMax 約為 2）。

### 配額共享請求序列化

當 quota-share 分派的目標連線宣告了正數的 `max_concurrent` 時，傳送至該**帳戶**的並行請求會透過各連線專屬的 semaphore（鍵值為 `qsconn:<connectionId>`）進行序列化：超額請求會**在佇列中等待**，而不是淹沒帳戶。此機制採用**失敗時開放**策略——當佇列已飽和或逾時時，請求會在未取得名額的情況下繼續，而不會拒絕任何可分派的請求。可在**設定 → 韌性 → 配額共享的各連線並行控制**
（`resilienceSettings.quotaShareConcurrencyLimit.enabled`，預設啟用）中切換。若未設定 `max_concurrent` 上限，行為將維持不變。

> quota-share 路由閘門（`selectQuotaShareTarget`、DRR + P2C）本身也採用
> 失敗時開放策略，且只會降低已達上限連線的優先級——若集區中只有單一連線，
> 它便無法實施硬性限制，因此實際抑制大量請求的是此 semaphore。

### 感知組合冷卻狀態的重試

對於所有組合策略（啟用時），若某個請求會因短暫的暫時性冷卻而確定產生 429，
系統會等待冷卻結束並重新分派，而不是傳回 429——這涵蓋多模型組合中的
Gemini 類 TPM/RPM 時間窗（`retry-after` 約 60 秒），例如雙模型組合的兩個目標
都觸及各模型的速率限制。此行為受**設定 → 韌性**中的
`comboCooldownWait`（`enabled`、`maxWaitMs`、`maxAttempts`、`budgetMs`）限制。
對於 `quota_exhausted`（鎖定至午夜）或驗證／找不到等原因，系統絕不等待。

---

## 5. 請求佇列准入控制（v3.8.49 · issue #6593）

**範圍**：本機每個提供者+連線的速率限制佇列（`open-sse/services/rateLimitManager.ts`，
由 Bottleneck 支援），位於上述三種機制之下的一層。

**`maxWaitMs` 限制佇列等待時間；`executionMaxWaitMs` 限制執行時間。**
兩者刻意分開，且彼此互不影響。

`resilienceSettings.requestQueue.maxWaitMs` 是**佇列等待預算**：它涵蓋等待提供者可用名額，
以及之後處於 QUEUED 狀態的時間；一旦工作離開 QUEUED 並開始執行，其計時器便會立即清除
（`rateLimitManager.ts`、`wrappedFn`）。超出此預算的請求永遠不會送達上游。
預設值為 30000ms，由 `src/lib/resilience/settings.ts` 中的
`DEFAULT_REQUEST_QUEUE_MAX_WAIT_MS` 提供，並由
`tests/unit/ratelimit-admission-control-6593.test.ts` 固定驗證，因此若變更此值，
該測試會失敗，而不會讓這段說明在不知不覺間過時。

`resilienceSettings.requestQueue.executionMaxWaitMs` 是 Bottleneck
作為工作 `expiration` 接收的值，其計時器僅在派送後開始。它是針對本身沒有上游逾時機制的
執行器所設的最後保障；當執行器本身的 fetch-start 逾時時間更長時，此值會提高至該逾時時間，
因此不會中斷正常進行中的回應。預設值為 600000ms（10 分鐘）。

過去，將佇列預算傳入 `expiration` 會在非增量式閘道仍在處理時將其中止——它們在傳回首批位元組前
合理地可能執行數分鐘——這也是為什麼 expiration 會以 `code:
"RATE_LIMIT_EXECUTION_TIMEOUT"`（HTTP 504）呈現，而佇列預算則帶有
佇列逾時代碼。可透過 `RATE_LIMIT_MAX_WAIT_MS` /
`RATE_LIMIT_EXECUTION_MAX_WAIT_MS`（環境變數）或儀表板
（**設定 → 韌性**）覆寫任一值。正規化時，兩者都會限制在 1ms–24h 範圍內。

**兩者的優先順序：**環境變數只提供_預設值_。保存在
`resilienceSettings.requestQueue` 中的值（儀表板 / API 修補，儲存於
`key_value`）優先於環境變數，而每個連線的
`rateLimitOverrides.maxWaitMs` / `.executionMaxWaitMs` 又優先於前者。因此，
在已有持久化值的部署中設定環境變數不會產生任何變化——請改為清除或更新該持久化設定。

佇列中的停留時間受 `maxWaitMs` 限制；下方的 `maxQueueDepth` 則限制
同時可排入佇列的呼叫者數量。

**`maxQueueDepth` — 選用的准入上限（新增）。** `resilienceSettings.requestQueue.maxQueueDepth`
限制一個提供者+連線可同時有多少個請求處於佇列中（尚未派送）。當佇列已包含
`maxQueueDepth` 個請求時，新請求會在到達 `limiter.schedule()` **之前**
快速遭拒，並回傳具類型的 `code: "RATE_LIMIT_QUEUE_FULL"` 錯誤——因此拒絕成本低廉，
且會在該請求進行任何下游提示詞壓縮 / 翻譯工作之前發生。預設值 `0` =
停用，以保留現有的無界佇列行為；範圍限制為 0–100000。
可透過 `RATE_LIMIT_MAX_QUEUE_DEPTH`（環境變數）或
`resilienceSettings.requestQueue.maxQueueDepth`（儀表板/API 修補）覆寫。

准入檢查本身是一個純函式
（`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`），因此
無須實際的 Bottleneck 限制器即可進行單元測試。

> 建立 #6593 的 RFC 也提出了 `bypassCompressionOnRateLimit`
> 旗標。此儲存庫的 `open-sse/services/compression/` 管線是針對傳出 LLM 請求的
> 提示詞/上下文壓縮（`chatCore.ts`，
> 約在 `resolveCompressionSettings`/`selectCompressionStrategy` 區塊附近），
> 而不是針對合成 429 回應本文的 HTTP 回應壓縮——不存在與字面意義上的略過旗標相符的
> 程式碼路徑。該提示詞壓縮步驟目前也會在請求管線中的 `withRateLimit()` _之前_執行，
> 因此若要重新排序，使其在因佇列已滿而遭拒時略過壓縮，會是超出此 issue 範圍、
> 規模更大的獨立變更；此處刻意**未**實作，若節省 CPU 的效益值得承擔重新排序的風險，
> 則留待後續處理。

---

## 6. 慢速串流吞吐量看門狗 (#9709)

可選的 `resilienceSettings.streamRecovery.throughputWatchdog` 防護機制會偵測
仍持續傳送區塊、但所產生的助理輸出低於已設定有效輸出速率的上游。
此機制刻意與閒置逾時區分：心跳與中繼資料既不會重設任一計時器，
也不算作進度。它也不同於嘗試的硬性截止期限 (#9153)；無論輸出品質如何，
後者始終是絕對的安全上限。

看門狗必須先經過暖機期，接著完成一個完整的滾動視窗，才能中止作業。
它會計算來自 Chat Completions 與 Responses API 輸出事件的文字差異量
（保守的 UTF-8 位元組近似值）、忽略僅含用量資訊與空白的事件，並在工具呼叫
或推理事件仍在進行時暫停判定。此功能預設停用，可透過
`STREAM_THROUGHPUT_WATCHDOG_ENABLED=true` 啟用；視窗、暖機時間、最低速率
以及最小可測量輸出，皆受一般韌性設定正規化層的界限約束。

啟用後，看門狗中止只會套用於目前作用中的上游嘗試。在任何用戶端可見的
位元組送出之前，既有的同帳戶早期復原路徑可能會重新開啟該嘗試。提交之後，
絕不會盲目重播串流；只有既有的安全串流中途接續契約能夠銜接後綴。
最終處理仍只會執行一次，因此不會重複計算用量或釋放號誌。

---

## 7. 上游狀態重述（錯誤陳述的配額錯誤）

**範圍：** 一個以錯誤 HTTP 狀態回報暫時性配額耗盡的上游閘道。

**目的：** 在分類「之前」修正誤導性的狀態，使下游取用者（後援引擎、組合彙總、面向用戶端的回應）能看見該失敗實際上可重試的性質。

某些閘道會以不可重試的 HTTP 狀態表示「暫時性」配額耗盡。
`agentrouter.org` 會傳回 `403`（有時是 `400`），並附帶中文內容
（`用户额度不足` / `额度不足`），而非標準的 `429`。Claude Code
之類的用戶端會將 `403` 視為永久性錯誤並中止工作階段；若未修正，
後援引擎會將其分類為 `AUTH_ERROR`，而非配額事件。

**實作：**

- 登錄表 + 比對器：`open-sse/config/upstreamStatusRestatement.ts` — 每個
  提供者各有一份規則清單（`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`），透過 `applyStatusRestatement()` 進行比對。
- 呼叫位置：`open-sse/handlers/chatCore.ts` 中的 `providerFailure:` 區塊
  （約在第 3654 行），位於 `parseUpstreamError()` 解析具有錯誤 HTTP 狀態
  （`!providerResponse.ok`）的上游回應之後、任何分類作業之前，因此每個
  下游取用者都能看到修正後的狀態。嵌入 `200` SSE 串流內的錯誤會經過另一條
  較後面的串流解析路徑，而目前**不**在此掛鉤的涵蓋範圍內——這是已知限制，
  但 agentrouter 的狀態誤報目前不需要此支援（因為它會呈現為錯誤 HTTP 狀態）。
- 重試資格：`429` 位於 `RETRY_AFTER_ELIGIBLE_STATUSES`
  （`open-sse/services/combo/unavailableRetryGate.ts`）中，因此經重述的錯誤
  會帶有實際的重試時段，而非呈現為無法繼續的 `403`。
- 合成的 `60s` `defaultRetryAfterMs`（`upstreamStatusRestatement.ts`）
  只代表經重述的回應告知**用戶端**的資訊；它本身並不是連線的內部冷卻／
  鎖定持續時間——後者由實際處理該重述錯誤的機制另行管理
  （連線冷卻的遞增退避，§2，API 金鑰提供者的基準為 `3s`；
  或模型鎖定，§3，用於 agentrouter 這類依模型配額的提供者）。
  路由器可能會在向用戶端宣告的 60s 時段之前，就於內部重新取得重試資格——
  這是刻意保留的餘裕，而非錯誤。

永久性錯誤（agentrouter 的 `无权访问模型`——無權存取此模型）絕不會
被重述：即使 `textMarkers` 命中，`excludeMarkers` 仍會否決該規則，
因此錯誤會保留其原始狀態，不會有任何機制無止境地重試。對應的提供者分類規則
（`open-sse/config/providerErrorRules.ts` 中的
`agentrouter-model-access-denied`：`reason: "auth_error"`、
`scope: "model"`，宣告的基準冷卻時間為 `6h`）會由
`checkFallbackError`（`open-sse/services/accountFallback.ts`）在
通用 apikey 類別的 `FORBIDDEN` 提前傳回「之前」查詢，並受
`honorsRuleLockScope(provider)` 控制（#10334——目前透過
`providerErrorRules.ts` 中的 `HONORS_RULE_LOCK_SCOPE_PROVIDERS`
允許清單，僅限 agentrouter）。規則宣告的 6h 冷卻時間會透過
`fallbackResult.baseCooldownMs` 傳遞，但仍會進入既有的依模型配額鎖定路徑
（`lockModelIfPerModelQuota()` / `recordModelLockoutFailure()`；除冷卻時間
來源外，#10334 並未變更此路徑）：它會像所有其他模型鎖定一樣，被下限調整至
營運者的 `mlSettings.maxCooldownMs`（預設為 `1_800_000ms` / 30min），且
_持久化的鎖定原因_仍維持既有的硬編碼 `"forbidden"`，而非規則中的
`"auth_error"`——端到端僅採用冷卻持續時間，不採用原因字串。
連線本身會保持作用中；同一連線上的其他同層模型不受影響。

重新表述的配額錯誤（`额度不足`）會在生產環境中符合一條提供者規則
（`agentrouter-user-quota-exhausted`：`reason: "quota_exhausted"`、`scope:
"connection"`，本身未宣告冷卻時間——因此會套用持久層經過調整的
退避預設值）。自 #10334 起，`ProviderErrorRuleMatch` 上的 `scope`
確實會在端到端流程中被使用，但**僅限於**
`HONORS_RULE_LOCK_SCOPE_PROVIDERS` 允許清單中的提供者
（`providerErrorRules.ts`——目前只有 `"agentrouter"`，透過
`honorsRuleLockScope()` 控制）。對所有其他提供者而言，`scope`
仍然僅供參考，與 #10334 之前完全相同。
`checkFallbackError` 會將符合規則的 scope 公開為
`fallbackResult.ruleScope`；`isAgentrouterConnectionQuotaScope()`
（`src/sse/services/auth.ts`）是共用的防護函式，用來確認某個
`ruleScope` 確實可安全地當作連線範圍、可自行復原的訊號來遵循
（scope 為 `"connection"`、reason 為 `quota_exhausted`、絕不為
`permanent`、絕不為 `creditsExhausted`——這是針對未來規則可能將
`"connection"` scope 與永久帳戶狀態配對的防禦措施）。有兩個消費端會呼叫它：

- **持久層**（`markAccountUnavailable()`、`src/sse/services/auth.ts`）：
  它不會進入直通提供者的**個別模型**鎖定分支
  （agentrouter 為 `passthroughModels: true` → `hasPerModelQuota()`
  會回傳 `true`），而是套用**暫時性連線冷卻**——
  `testStatus: "unavailable"` + `rateLimitedUntil`，且絕不使用終止狀態
  （`credits_exhausted`/`banned`/`expired`）——因此連線會在冷卻期結束後
  自行復原，而不需要手動重設憑證。
  若連線具有 `disableCooling: true`，則會略過此處（#2997）：這項停用選項
  會改為進入個別模型鎖定流程（這是已記錄的取捨——
  請參閱該分支上方的程式碼註解）。
- **相同請求的組合路由**（`applyComboTargetExhaustion()`、
  `open-sse/services/combo/targetExhaustion.ts`）：同一個防護函式會將該
  連線標記至記憶體內的 `exhaustedConnections` 集合，鍵值為
  `${provider}:${connectionId}`。這只會略過相同請求中，剩餘且
  _自身目標物件上已帶有完全相同 `connectionId`_ 的目標
  （`getExhaustedTargetSkipReason()`、
  `open-sse/services/combo/comboPredicates.ts`，在查詢
  `exhaustedConnections` 前執行 `if (provider &&
connectionId)`）——一般的
  模型清單組合中，同層目標自身不會帶有固定的 `connectionId`，
  而該值只會在每次分派時，根據回應的
  `X-OmniRoute-Selected-Connection-Id` 標頭解析，因此永遠不會符合該鍵值。
  對於這種常見情況，真正能防止剩餘分支重複使用剛耗盡帳戶的機制
  並不是這個 Set——而是上述持久層
  （該連線的 `rateLimitedUntil` 現在位於未來時間）與同一個防護函式
  共同作用，抑制該失敗的 `transientRateLimitedProviders`
  （請參閱「兩階段設計」以及 `targetExhaustion.ts` 中
  `isAgentrouterConnectionQuotaScope` 分支上的程式碼註解）：由於
  該 Set 未被標記，`combo.ts` 的 `allowRateLimitedConnection` 強制允許機制
  （`open-sse/services/combo.ts:1005-1013`、`:2734-2738`）不會對
  該提供者的剩餘分支生效，因此憑證選擇流程會正常遵循
  `rateLimitedUntil` 篩選器（`src/sse/services/auth.ts:1238`），而剩餘分支
  要麼會選擇另一個仍符合資格的 agentrouter 連線，要麼會因沒有可用憑證
  而失敗——它不會強行重新使用此分支剛剛冷卻的連線。

### 兩階段設計：狀態重新表述，然後分類

狀態重新表述（`upstreamStatusRestatement.ts`）與提供者
分類規則（`open-sse/config/providerErrorRules.ts`、
`providerRuleRegistry`）是兩個彼此獨立的登錄表；兩者都依照提供者 ID
與文字標記建立索引，但它們在不同位置執行，且用途不同：
重新表述會在 `chatCore.ts` 中提早改寫 HTTP 狀態；
分類規則則會在 `checkFallbackError()` 中選擇備援的 `reason`
與鎖定 `scope`
（`model` / `provider` / `connection`）
（`open-sse/services/accountFallback.ts`）。

分類規則只有在提供者列於 `providerErrorRules.ts` 的
`FULL_TEXT_RULE_PROVIDERS` 允許清單時，才能看見完整的錯誤**文字**
（這是符合 `额度不足` 等內文標記所必需的）——目前只有
`"agentrouter"`。對所有其他**內建目錄**提供者，
`checkFallbackError` 只會將結構化錯誤（`{code, type}`）傳給
`getProviderErrorRuleMatch`；這足以處理以標頭、狀態或代碼為依據的規則，
但無法看見內文文字標記。
輔助函式 `resolveRuleMatchBody()` 會執行這項選擇：對允許清單中的提供者
使用完整錯誤文字，否則使用結構化錯誤。將**內建**提供者加入
`FULL_TEXT_RULE_PROVIDERS` 是明確的逐提供者選擇加入機制——其存在是為了
確保未列於清單中的每個提供者，其預設路徑都能逐位元組保持不變。

規則的 `scope`（`model` / `provider` / `connection`）是與
`FULL_TEXT_RULE_PROVIDERS` 分開的選擇加入機制：`checkFallbackError`
只會將其公開為 `fallbackResult.ruleScope`，而下游消費端只有在提供者
位於同一檔案的 `HONORS_RULE_LOCK_SCOPE_PROVIDERS` 允許清單時，
才會將其視為不只是資訊標籤的內容而加以遵循（透過
`honorsRuleLockScope()` 控制——目前只有 `"agentrouter"`）。
若要了解提供者加入該允許清單後，符合 `scope: "connection"` 的規則
實際會產生什麼效果，請參閱上方的「重新表述的配額錯誤」。

**#11104 — 操作者宣告的規則會略過兩個白名單。** 操作者可以透過 `settings.providerErrorRules`
（`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`）
在執行階段宣告個別提供者規則，而無須編輯此檔案。若將操作者規則限制於
`FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` 之後——這些白名單
原本是用於保護內建目錄規則的**預設**行為——則除了已列於其中的提供者之外，
設定機制對所有其他提供者都將失效，因為宣告規則本身就已是操作者的明確選擇加入。
`resolveRuleMatchBody()` 和 `honorsRuleLockScope()` 都會先檢查
`hasOperatorRuleForProvider()`：具有操作者規則的提供者會取得原始錯誤文字，
且其宣告的 `scope` 會受到遵循，無論它是否也出現在任一白名單中。

**已知缺口 — HTTP 400 永遠不會查詢 `providerRuleRegistry`。**
`checkFallbackError` 的 `BAD_REQUEST` 分支完全透過其自身的模式陣列
（`accountFallback.ts` 中的 `MODEL_ACCESS_DENIED_PATTERNS`、
`CONTEXT_OVERFLOW_PATTERNS` 等）對狀態 400 進行分類，並且會在到達其上方的
`configuredRule`/`getProviderErrorRuleMatch` 分支之前返回。
具有 `status: 400` 的內建目錄規則（或操作者規則）在語法上有效，
但永遠不會觸發。目前沒有任何現有規則以 400 為目標，
因此生產環境中的任何功能都不受影響——但未來若要新增 400 規則，
必須先修改此分支；這是比新增一條規則更大的變更（它會重新分類所有已依賴
模式陣列行為之提供者的 400），超出新增單一提供者規則的範圍。

### 新增會錯誤陳述配額的閘道

1. 在 `statusRestatementRegistry`
   （`open-sse/config/upstreamStatusRestatement.ts`）中註冊一個規則陣列。保持
   `textMarkers` 為提供者特定內容；切勿重複使用會與
   `CREDITS_EXHAUSTED_SIGNALS`（`open-sse/services/accountFallback.ts`）
   衝突的一般英文片語。
2. 可選擇在 `open-sse/config/providerErrorRules.ts`
   （`providerRuleRegistry`）中註冊分類規則，以選取正確的鎖定範圍
   （帳戶層級配額使用 `connection`，個別模型錯誤使用 `model`）。
   對於規則需要完整錯誤文字（本文標記）的提供者，此步驟要在生產環境生效，
   還須將提供者 ID 新增至同一檔案中的 `FULL_TEXT_RULE_PROVIDERS`——否則
   `checkFallbackError` 只會將結構化的 `{code, type}` 錯誤傳給規則，
   而本文規則永遠無法比對實際流量。純粹依據 `status`/`headers`
   進行比對的規則（例如 Opencode 或 Minimax 的規則）不需要選擇加入。
   另外，如果規則宣告 `scope: "connection"`，且目的是實際套用整個連線範圍的
   冷卻以及略過同一請求中的組合，而不只是資訊性標籤，請將提供者 ID 新增至
   同一檔案中的 `HONORS_RULE_LOCK_SCOPE_PROVIDERS`——這會控管
   `markAccountUnavailable()`（`src/sse/services/auth.ts`）與
   `applyComboTargetExhaustion()`
   （`open-sse/services/combo/targetExhaustion.ts`）中
   `isAgentrouterConnectionQuotaScope()` 形式的處理；若未新增，
   `scope` 仍會透過 `fallbackResult.ruleScope` 傳遞，但不會有任何邏輯採取動作。
3. 新增仿照 `tests/unit/upstream-status-restatement.test.ts`
   與 `tests/unit/agentrouter-error-rules.test.ts` 的單元測試
   （包括非永久／非 `creditsExhausted` 的防護測試，以及——如果提供者需要該白名單——
   一項斷言 `resolveRuleMatchBody()` 僅對該提供者返回完整文字的測試）。

不需要變更 `chatCore.ts`、`classifyError` 或組合邏輯。

#### 按出口分組的鎖定（#10880）

`EGRESS_BUCKETED_LOCK_PROVIDERS` 中的提供者（opencode 系列）會被視為
按 IP 分組的上游（opencode 免費方案按 IP 分組，而非按帳戶分組——請參閱 #9611）：
分類為 `quota_exhausted` **或** `rate_limit_exceeded` 的狀態 429，
會在輪替機制嘗試其他連線之前，讓所有位於白名單系列中、且最後已知出口 IP
與失敗連線相符的連線進入冷卻
——從而避免 N-1 次保證失敗的上游呼叫（與 #10460/#10525 的模式相同）。
此處刻意包含 `rate_limit_exceeded`：在 `markAccountUnavailable`
路徑上，opencode 特定規則永遠不會比對成功（未將 headers/body 傳給
`checkFallbackError`，且 opencode 不在 `FULL_TEXT_RULE_PROVIDERS` 中），
因此本文帶有訂閱配額文字（"monthly usage limit
reached"）的 429，會在到達 `status_429` 規則之前，由配額本文後備邏輯
（`buildSubscriptionQuotaFallback`、`accountFallback.ts`；冷卻 1 小時）
分類為 `quota_exhausted`——而不含配額文字的 429（單純速率限制）
則會透過 `status_429` 規則分類為 `rate_limit_exceeded`，
並且仍會讓該 IP 系列進入冷卻。對白名單中的提供者而言，
按 IP 分組的速率限制與配額耗盡代表相同的訊號。明確限制：

- **盡力而為**：此鎖定會從 `proxy_logs` 解析連線最後已知的 `egress_ip`
  （24 小時視窗、同步、無快取）。快取未命中（從未探測過出口
  IP）或沒有資料列 → 失敗的連線仍會由此分支進入冷卻
  （記錄方式與目前相同），只是沒有任何同層連線會被鎖定。
- **永不成為終止狀態**：冷卻是會續期的配額視窗
  （`testStatus: "unavailable"`）；絕不會從 IP 層級的訊號推導出永久狀態。
  `disableCooling` 連線會完全略過此分支。
- **允許清單中系列的鎖定粒度變更**：這是作用域
  變更，不只是同層連線最佳化。opencode 是 `passthroughModels`
  提供者，因此在此分支之前，429 會產生每個模型的鎖定；現在則會
  產生連線冷卻——即使操作者僅執行一條連線，完全沒有任何同層
  連線，也同樣如此。這正是 opencode 規則表早已宣告為正確的粒度
  （`scope: "connection"`、`providerErrorRules.ts`），但至今從未生效，
  因為 opencode 不在 `HONORS_RULE_LOCK_SCOPE_PROVIDERS` 中。此分支會自行寫入
  失敗連線的冷卻狀態 + `backoffLevel`，仿照以連線為作用域的
  agentrouter 分支，然後返回——永遠不會執行下方的每模型封鎖與
  通用路徑。
- **包含 Combo**：與 agentrouter 分支相同，此作用域刻意
  忽略 combo 呼叫端針對 429 套用的 `persistUnavailableState`/`isCombo`
  降級。每模型鎖定並不是此作用域較弱的形式，而是錯誤的單位：
  它完全沒有表達 IP 已耗盡，因此 combo
  輪替會持續對每個同層連線各浪費一次保證失敗的呼叫。
- **同層連線安全性**：已處於終止狀態（banned/credits_exhausted）
  或已處於更長冷卻期的同層連線，絕不會被覆寫。
- **排他性允許清單**：擴大 `EGRESS_BUCKETED_LOCK_PROVIDERS` 是一項
  明確的擁有者決策；不採用通用接線方式（模式 #10334/#10419）。同層
  連線查詢會繫結同一份允許清單，而不是將其重複為 SQL
  常值，因此擴大清單仍只需變更一行。
- **出口 IP 輪替，雙向影響**：查詢視窗（24 小時）遠
  大於出口 IP 快取 TTL（5 分鐘），因此「最後已知 IP」是歷史資料，
  而非目前狀態。如果連線的代理在此視窗內發生輪替，
  此鎖定可能會**漏掉**實際共用的 IP（記錄的 IP 是新的、
  尚未耗盡的 IP）——反之，也可能會**冷卻已從
  耗盡 IP 輪替離開的同層連線**。第二種情況會讓該同層連線損失一個
  冷卻視窗；兩者都被接受為歷史查詢在盡力而為模式下的限制。
- **成本**：對 `proxy_logs` 執行兩次有界掃描（透過
  `idx_pl_timestamp` 依視窗篩選），且僅以 429 的發生頻率執行。不新增索引（遷移 134
  YAGNI）。已在中等規模的真實流量資料庫副本上測量；
  高吞吐量執行個體在相同視窗內會按比例保留更多資料列。

---

## 其他韌性功能

- **19 種路由策略**（priority、weighted、round-robin、context-relay、fill-first、p2c、random、least-used、cost-optimized、reset-aware、reset-window、headroom、strict-random、auto、lkgp、context-optimized、cache-optimized、fusion、pipeline）— 請參閱 [AUTO-COMBO.md](../routing/AUTO-COMBO.md)。
- **重設感知路由**（v3.8.0）— 依配額重設時間排列連線優先順序。
- **背景模式降級** — Responses API 的 `background: true` 會降級為同步模式並發出警告。
- **動態工具限制偵測** — 達到工具數量限制時，會避開對應的提供者。
- **緊急備援** — 由 `OMNIROUTE_EMERGENCY_FALLBACK` 控制；操作人員可從 Feature Flags 頁面覆寫此設定，無須重新啟動。

---

## 偵錯

- 加權組合回傳 `503 all_targets_cooling_down`（已設定 `Retry-After`，且 `diagnostics.excluded` 會列出每個目標及其 `model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable`）→ 集區已完成設定並連線，只是每個目標都被韌性計時器排除；`[COMBO] Weighted selection: every target excluded before dispatch — …` 警告會指出原因與剩餘秒數。若同一組合回傳 `404 no_executable_targets`，則表示未涉及韌性計時器（沒有任何可執行項目，或每個帳戶皆未通過可用性探測）。此功能內建於 `open-sse/services/combo/pinRecovery.ts`，並使用 `targetResolution.ts` 中收集的排除項目。
- 某個提供者的所有金鑰皆遭略過 → 同時檢查斷路器狀態，以及每個連線的 `rateLimitedUntil`/`testStatus`。
- 重設時窗過後，提供者仍被永久排除 → 程式碼讀取原始 `state`，而非 `getStatus()`/`canExecute()`。
- 一個金鑰失敗，但其他金鑰應可運作 → 優先使用連線冷卻，而非斷路器。
- 只有一個模型失敗 → 優先使用模型鎖定，而非連線冷卻。
- 狀態應自行復原但未復原 → 檢查是否有未來時間戳記，以及是否存在會重新整理已過期狀態的讀取路徑。永久狀態需要手動變更。

---

## TLS 指紋辨識與隱匿

各提供者專用的隱匿技術（JA3/JA4、CCH、混淆）另有文件說明 — 請參閱 `docs/security/STEALTH_GUIDE.md`（位於 git 中；不會編譯至 `/docs`）。

---

## 韌性測試（階段 8 · 區塊 C）

除了韌性邏輯的單元測試外，另有三項測試會在真實的壓力／故障條件下測試執行階段（皆為整合／每夜測試，不會阻擋 PR）：

| 測試        | 內容                                                                                                                           | 執行方式                                   |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------ |
| 混沌測試    | 假上游節點會注入真實的延遲／重設／逾時／503；驗證斷路器會開啟／復原，且 `checkFallbackError` 會將 503 分類為可復原的備援錯誤。 | `RUN_CHAOS_INT=1 npm run test:chaos`       |
| 堆積成長    | 在 `--expose-gc` 下，對每個 `createSSEStream` 建立約 500 個串流；若堆積成長超過上限即判定失敗（OOM 防護 #3069）。              | `npm run test:heap`                        |
| k6 浸泡測試 | 對 `/api/monitoring/health` 執行持續負載；檢查 p95／錯誤率門檻。                                                               | `k6 run tests/load/k6-soak.js`（每夜執行） |

由 `.github/workflows/nightly-resilience.yml`（cron + dispatch）協調執行。在預設的 `test:integration` 中，混沌測試與堆積測試會自行略過（若沒有 `RUN_CHAOS_INT`/`--expose-gc`）。

---

## 另請參閱

- [架構指南](./ARCHITECTURE.md) — 系統架構與內部機制
- [使用者指南](../guides/USER_GUIDE.md) — 提供者、組合、CLI 整合
- [自動組合引擎](../routing/AUTO-COMBO.md) — 16 因素評分、模式套件
