# Resilience Guide (中文 (繁體))

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md)

---

OmniRoute 有三個各自獨立但彼此相關的韌性機制。每個機制的範圍與用途皆不同。在除錯路由行為時,請將它們分開看待。

![三層韌性模型](../diagrams/exported/resilience-3layers.svg)

> 來源:[diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

## 1. 提供者斷路器(Provider Circuit Breaker)

**範圍:**整個提供者(例如 `glm`、`openai`、`anthropic`)。

**用途:**停止將流量傳送給在上游/服務層級反覆失敗的提供者。

**實作:**

- 核心類別:`src/shared/utils/circuitBreaker.ts`
- 串接位置:`src/sse/handlers/chatHelpers.ts`、`src/sse/handlers/chat.ts`
- 狀態 API:`GET /api/monitoring/health`
- 重設 API:`POST /api/resilience/reset`
- 包裝器:`open-sse/services/accountFallback.ts`
- 資料庫資料表:`domain_circuit_breakers`

**狀態:**

- `CLOSED` — 允許正常流量
- `DEGRADED` — 仍允許流量,但正在追蹤升高的提供者失敗次數;在累積足夠的成功次數、連線測試通過,或最後一種失敗類型經過最長的 `OPEN` 保持時間(其 `cooldownByKind` 值,否則為 `resetTimeout`,× `maxBackoffMultiplier`,至少一個冷卻期)且無新失敗後,返回 `CLOSED`
- `OPEN` — 提供者暫時被封鎖;組合路由會跳過它
- `HALF_OPEN` — 重設逾時已屆滿;允許探測請求

**可設定的預設值(`open-sse/config/constants.ts`,於儀表板 → 設定 → 韌性中公開):**

| 類別    | 降級於   | 開啟於    | 重設逾時 |
| ------- | -------- | --------- | -------- |
| OAuth   | 5 次失敗 | 8 次失敗  | 60s      |
| API-key | 7 次失敗 | 12 次失敗 | 30s      |
| Local   | 衍生     | 2 次失敗  | 15s      |

`degradationThreshold` 控制提供者何時進入 `DEGRADED`;`failureThreshold` 控制其何時開啟並被跳過。本機提供者設定檔尚未在韌性設定頁面中公開。

**觸發代碼:**僅提供者層級狀態碼 `[408, 500, 502, 503, 504]`。請勿因帳號層級錯誤而觸發(大多數 401/403/429 — 那些屬於冷卻或鎖定的範疇)。

**延遲復原:**當 `OPEN` 到期時,`getStatus()`、`canExecute()`、`getRetryAfterMs()` 會將狀態刷新為 `HALF_OPEN`。相同的讀取(以及下一次失敗)會使過期的 `DEGRADED` 衰減回 `CLOSED`。不需要背景計時器。

---

### 選擇性啟用的全域提供者冷卻(時間窗閘門)

第四個**選擇性啟用**的層級(`PROVIDER_COOLDOWN_ENABLED`,預設**關閉**)在
`open-sse/services/providerCooldownTracker.ts` 中保存失敗提供者的跨請求記憶,
組合目標解析會查詢此記憶,使連續的組合請求不再重新走訪剛失敗的提供者。
提供者層級項目遵循 `PROVIDER_PROFILES` 時間窗閘門:

| 設定檔  | 觸發於(`providerFailureThreshold`) | 時間窗內(`providerFailureWindowMs`) | 冷卻時間(`providerCooldownMs`) |
| ------- | ---------------------------------: | ----------------------------------: | -----------------------------: |
| OAuth   |                               `10` |                             `15min` |                         `5min` |
| API key |                               `15` |                             `30min` |                        `10min` |

低於閾值時,提供者**不會**被視為冷卻中;一次成功會清除該時間窗。
連線層級項目(`provider:connectionId`)則改為保留指數式的
`minRetryCooldownMs → maxRetryCooldownMs` 退避。覆寫方式:
`OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`。
迴歸防護:`tests/unit/provider-cooldown-window-gate.test.ts`。

## 2. 連線冷卻

**範圍：** 單一提供者連線/帳號/金鑰。

**目的：** 在同一提供者的其他連線持續提供服務時,跳過一個故障的金鑰。

**實作：**

- 標記為不可用:`src/sse/services/auth.ts::markAccountUnavailable()`
- 選擇邏輯:同一檔案中的 `getProviderCredentials*`
- 冷卻計算:`open-sse/services/accountFallback.ts::checkFallbackError()`
- 設定:`src/lib/resilience/settings.ts`

**每個連線的欄位：**

- `rateLimitedUntil` — 冷卻到期的時間戳記
- `testStatus: "unavailable"`
- `lastError`、`lastErrorType`、`errorCode`
- `backoffLevel` — 指數退避計數器

**預設冷卻時間：**

- OAuth 基礎:5s
- API 金鑰基礎:3s
- API 金鑰 429:優先採用上游的 `Retry-After`/重置標頭/可解析的重置文字
- 退避:`baseCooldownMs * 2 ** failureIndex`

**防驚群(anti-thundering-herd)保護：** 防止並發失敗過度延長冷卻時間或重複遞增 `backoffLevel`。

**並發限制的 429 不會沿退避階梯上升。** 當 `429` 的回應主體回報並發限制("too many concurrent requests"、"concurrency limit"、"parallel request limit"、GLM `并发数过高`)時,表示帳號健康但忙碌。
`checkFallbackError()` 會回傳原因 `concurrency_limited`:立即容錯移轉至下一個連線,以固定的 `CONCURRENCY_LIMIT_COOLDOWN_MS`(1s)或上游的重試提示冷卻此連線,保持 `backoffLevel` 不變,並設定 `skipProviderBreaker`。
明確的配額主體仍然優先,因此同時符合配額模式的主體仍判定為配額結果。偵測:`src/shared/utils/classify429.ts` 中的 `looksLikeConcurrencyLimit()`;判定:`open-sse/services/accountFallback/concurrencyLimit429.ts`。`classify429()`(熔斷器的 `FailureKind`)維持不變,對這些主體仍回傳 `rate_limit`。

**串流內容停滯不會冷卻帳號。** 當內容停滯看門狗(`open-sse/utils/streamHandler.ts`)放棄一條未及時送出模型輸出的串流時,`markAccountUnavailable()` 會在連線上記錄錯誤,但不設定冷卻:該停滯屬於該次請求,最常見的情況是推理回合過長而尚無輸出。營運者可透過 `resilienceSettings.streamStallCooldown.enabled`(預設 `false`)重新啟用冷卻。

**推理框架會重設內容停滯的計時預算。** 推理模型在第一個可見 token 之前可能思考數分鐘:Claude 會串流 `thinking_delta` 框架(其思考文字可能為空),而 Responses API 會接連串流一個又一個推理項目。`isReasoningProgressFrame()`(`open-sse/utils/streamReadiness.ts`)可識別這些框架,看門狗會在每個框架到來時重設其計時預算,而非取消該回合。它們仍非模型輸出,因此僅以推理結束的回合仍會回報為空白;而停止推理、僅傳送心跳的回合仍會觸發看門狗。

Kiro 帶有非空簽章的二進位 `reasoningContentEvent` 框架,會以空的 `reasoning_content` delta 形式,將此推理活動透過執行器保留下來。簽章不會被轉發。中繼資料、不完整的框架與空簽章不會重設內容計時預算;獨立的活躍串流逾時與用戶端取消仍然適用(`open-sse/executors/kiro/reasoning.ts`)。

**終態(非冷卻):**

- `banned` — 由禁用關鍵字/帳號封禁偵測設定(參見 [BAN_DETECTION](../security/BAN_DETECTION.md)),以及連續三次上游逐請求拒絕(`request_rejected`,例如 Anthropic OAuth 403 "Request not allowed" — `open-sse/services/requestRejectedStreak.ts`);單次拒絕僅會冷卻連線
- `expired`(在有上限的重試後轉為終態 — `EXPIRED_RETRY_MAX = 3`,採指數退避 — 使暫時性 OAuth 錯誤能在帳號被永久停用前自行恢復)
- `credits_exhausted`

這些狀態會持續存在,直到憑證變更或營運者手動重置。請勿以暫時性冷卻狀態覆寫終態。

**惰性恢復：** 當 `rateLimitedUntil` 過期後,連線重新具備使用資格。成功使用後,`clearAccountError()` 會清除所有錯誤欄位。

### Claude OAuth 用量牆：低優先級通道 + 工作階段限制重置

**範圍：** 單一 Claude 訂閱(OAuth)連線。兩項功能皆為**逐連線選擇啟用**(編輯連線 → Claude 區段 → `providerSpecificData` 中的 `lowPriorityMode` / `autoLimitReset`,兩者預設皆關閉),並對應 Claude Code 的 `/low-priority` 與 `/limit-reset` 指令(線路協定擷取自 Claude Code 2.1.263)。

**實作：**

- 狀態機 + 回應分類:`open-sse/services/claudeLowPriority.ts`
- 重置狀態/領取用戶端:`open-sse/services/claudeLimitReset.ts`
- 執行器掛鉤(標頭注入 + 同帳號重試):`open-sse/executors/base.ts::execute()`
- 選擇啟用的持久化:`src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**觸發條件：** 5 小時用量牆 — 標頭帶有 `anthropic-ratelimit-unified-status: rejected` 的 `429`,且當帳號符合資格時,帶有 `anthropic-ratelimit-unified-slow-offer: treatment`。在第一個用量牆 429 之前不會傳送任何內容;未帶統一標頭的突發 429 會走一般冷卻路徑。

**低優先級通道**(`lowPriorityMode`):

- 當發生 wall 429 時,執行器會接受該提議,並立即以 `anthropic-usage-limit: slow` 重試**同一個**
  帳號;通道(lane)會保持啟用,直到所宣告的
  `anthropic-ratelimit-unified-reset`(+60 秒寬限期)為止,且此時間窗口內的每個請求都會攜帶
  該標頭。被攔截的 429 永遠不會到達 `handleChatCore`,因此該連線
  **不會**進入冷卻,也不會被輪替掉。
- 後續回應上的 `anthropic-ratelimit-unified-slow-status`:`active` / `not_needed`
  會保留通道;`slot_busy`(429)或 `529` 會依伺服器的
  `anthropic-ratelimit-unified-slow-retry-after`(預設 20 秒,限制在 5–600 秒,±30% 抖動)
  等待後重試,並以 `anthropic-ratelimit-unified-slow-max-wait`(預設 20 分鐘,限制在
  1 分鐘–6 小時)為上限——超過該上限後通道即結束,並以 10 分鐘的冷卻期阻止重新接受。
  等待時間還會進一步受限於請求自身的上游啟動逾時
  (`resolveFetchStartTimeout`,預設 10 分鐘)剩餘的時間減去 5 秒緩衝:若無此上限,
  預設 20 分鐘的最長等待時間將超過請求的存活時間,睡眠會在等待中途被中止,
  從而拋出 `TimeoutError`,而非優雅地以 `max_wait` 結束 + 冷卻期。
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`、5 小時窗口的輪轉,或
  `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true`(由於付費超額用量
  現在已涵蓋 wall,因此在任何狀態下都會以 `extra_usage` 結束)會結束通道;
  回應隨後流向正常的冷卻路徑。`budget_exhausted` 會被記住,直到
  所宣告的預算重置為止(≤ 8 天)。
- wall 檢查會在執行器自身由 400 驅動的單次嘗試內重試(上下文
  編輯、thinking/effort 限制、參數自動學習)之後執行,因此僅在其中一次重試中
  才浮現的 wall 429 仍會被攔截,而不會進入冷卻路徑。
- 狀態是每個連線各自保存在記憶體中(重新啟動需額外付出一次 wall 429 才能重新接受)。

**工作階段限制重置**(`autoLimitReset`,當兩者都啟用時,會在通道之前嘗試):

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → `juniper_tide`
  區塊;當 `arm: "reset"` 且 `available: true` 時,
  以 `{ "program": "juniper_tide" }` 發送
  `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits`(組織 UUID 取自
  `providerSpecificData.organizationUUID`,以 bootstrap 作為後備)。
- `result: reset|not_limited` → 請求會以全速重試(不帶 slow 標頭)。
  `already_used` / `not_offered` 會記住 `next_available_at`(預設一週);任何
  失敗都會退避 15 分鐘。此重置每週僅限一次,且仍會計入
  每週限制。

迴歸防護:`tests/unit/claude-low-priority-mode.test.ts`、
`tests/unit/claude-limit-reset.test.ts`、`tests/unit/claude-low-priority-executor.test.ts`。

### 工作階段親和性(#7274)

**範圍:**將一個用戶端工作階段(`X-Session-Id` / `x-codex-session-id` / `x-omniroute-session` 標頭)釘選到一個連線,適用於**任何**提供者。

**目的:**讓多輪代理(Claude Code、aider、自訂代理)在跨請求時保持在同一帳號上,減少跨帳號的上下文遺失,以及在具有每帳號工作階段狀態的提供者上重複出現的冷啟動 429。

**實作:**

- TTL 解析:`src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- 釘選的選擇/建立:`src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- 標頭擷取(通用,適用於任何提供者):`src/sse/services/auth.ts::extractSessionAffinityKey()`
- 持久化的釘選資料表:`sessionAccountAffinity`(`src/lib/db/sessionAccountAffinity.ts`)
- 設定:`sessionAffinityTtlMs`(全域 TTL,單位毫秒,`0` 表示停用)— `src/lib/db/settings.ts`。由遷移 `124_generic_session_affinity_ttl.sql` 從僅限 Codex 的 `codexSessionAffinityTtlMs` 重新命名而來,該遷移會將任何先前設定的 Codex TTL 沿用為新的預設值。

在 #7274 之前,`resolveSessionAffinityTtlMs()` 對 `codex` 以外的所有提供者都會硬性回傳 `0`,因此即使釘選機制與標頭擷取早已與提供者無關,TTL 設定(以及工作階段標頭)在其他地方都毫無作用。此修正移除了該提早回傳;現在只要全域設定為大於 `0`,TTL 就會一致地套用於每個提供者。

這三個工作階段親和性標頭永遠不會被轉發到上游——執行器會從頭建立自己的上游標頭,而非直接傳遞用戶端標頭,因此它們僅作為內部的關聯 ID。

### 專屬受管工作階段連線租約

**範圍:**一個活躍的受管 HTTP 用戶端/工作階段擁有一個符合資格的 OmniRoute 連線。

**目的:**為需要跨請求硬性路由隔離的用戶端提供持久的專屬連線所有權。
這與工作階段親和性不同,後者是一種軟性的連續性偏好:
專屬租約會將生命週期狀態持久化於 SQLite,強制執行全域活躍擁有者與
活躍連線的唯一性,並在提供者分派之前拒絕過期的世代(generation)。

此功能以每個 API 金鑰為單位選擇加入。受管金鑰必須具有 `lease:exclusive` 範圍以及
明確的非空 `allowedConnections` 清單。任何 HTTP 用戶端都可以使用生命週期端點;
不需要用戶端名稱、user-agent、提供者、OAuth 方法或模型。租約擁有的是連線
而非模型,因此在連線仍保持一般資格的情況下,變更模型仍會保留該綁定。
一般的模型、配額、健康狀態、冷卻與允許清單規則仍具有最高效力,
並可能將同一世代轉移至另一個空閒且符合資格的連線。

生命週期為 `POST /api/v1/session-leases`,搭配 JSON 動作 `acquire`、`renew` 與 `release`。
受管理的推論請求會出示不透明的 `X-OmniRoute-Lease-Owner` 值以及精確的
`X-OmniRoute-Lease-Generation`。owner 值以 `vlo_` 開頭,後接 43 個 base64url 字元;僅
儲存其 SHA-256 雜湊值。每個最終調度柵欄(dispatch fence)也會綁定已驗證的 API 金鑰 ID 與
作用中的連線 ID。租約控制標頭會從日誌、保留的請求快照以及
上游執行器標頭中移除。

如果一般路由有符合資格的受管理候選者,但每個空閒候選者都被
外來的作用中租約佔用,OmniRoute 會回傳 HTTP `429`、lease-capacity-unavailable 代碼、
waiting-for-capacity 狀態,以及根據最早相關到期時間推算出的有上限 `Retry-After`。
一般的空資格情況並非租約競爭,並保留其既有的路由錯誤語意。

相關機制保持各自獨立:

- OAuth 工作階段佔用是針對 OAuth 帳號的處理程序本機(process-local)軟性分配。
- 帳號信號量(semaphore)會授予請求並行許可,並在請求完成時結束。
- 獨佔式受管理工作階段租約是具備世代柵欄(generation fence)的持久生命週期所有權。

---

## 3. 模型鎖定（Model Lockout）

**範圍：** provider + connection + model 三元組。

**依狀態決定的鎖定鍵範圍：** 失敗的狀態碼決定鎖定要寫入哪個鍵（`open-sse/services/accountFallback/exactModelLock.ts` 中的 `resolveLockoutScope()`）：

- `429` / `403` / `402` — 配額或授權信號 — 鎖定**配額家族**：
  對 codex 而言是整個 `codex` / `spark` 範圍（該連線的每個 `gpt-5*` 模型），
  其他 provider 則由 `getQuotaScopedModelForProvider()` 決定。
- `404` 鎖定單一模型本身（`getModelLockKey()` 會將 `not_found` 收窄範圍）。
- 任何其他狀態 — `5xx` 傳輸/伺服器故障，以及 OmniRoute 自身從品質驗證合成的
  `502` — 僅鎖定**確切**的 provider/connection/model 組合。單一模型上的
  串流故障並不能作為帳號配額出問題的證據；在此規則之前，
  `codex/gpt-5.6-luna` 上的一次空回應，就會把該連線的所有 `gpt-5*`
  模型從路由中移除 2–30 分鐘（逐級升級），而其配額其實完全未受影響。
- 呼叫方明確指定的 `scope` 選項永遠優先（Antigravity 傳入 `"exact"`）。

**目的：** 當只有單一模型不可用或受配額限制時，避免停用整個連線。

**範例：**

- 採每模型配額制的 provider 回傳 429
- 本地 provider 對某個不存在的模型回傳 404
- 特定 provider 的模式/模型權限故障（例如 Grok 模式）

**實作：** `open-sse/services/accountFallback.ts` — `lockModel()`、`clearModelLock()`、`getAllModelLockouts()`。

### 模型冷卻儀表板 (v3.8.0)

UI：設定 → 模型冷卻（`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`）

列出作用中的鎖定，包含：provider、connection、model、reason、expiresAt。操作人員可以從該卡片手動重新啟用模型。

**REST API：**

- `GET /api/resilience/model-cooldowns` — 列出作用中的鎖定
- `DELETE /api/resilience/model-cooldowns` — 手動重新啟用。請求主體：`{provider, connection, model}`。驗證：management。

### 冷卻管理器

UI：監控 → 冷卻管理器（`src/app/(dashboard)/dashboard/resilience/cooldowns/`）。

用單一頁面檢視所有因暫時性原因而脫離路由的連線，不必逐一開啟各 provider
頁面。它會列出連線冷卻、模型鎖定與終端狀態，可依單一連線、依選取項目、或依
某 provider 的所有連線來清除，並可編輯最常調整的冷卻規則：
`streamStallCooldown.enabled`，以及 OAuth / API 金鑰 `connectionCooldown`
的基礎冷卻時間與最大退避步數（透過 `PATCH /api/resilience` 儲存）。終端狀態
（`banned`、`expired`、`credits_exhausted`）僅列出，絕不會在此被清除。

**REST API**（`src/lib/resilience/cooldownManager.ts`，驗證：management）：

- `GET /api/resilience/cooldowns[?provider=]` — 回傳連線及其狀態、剩餘冷卻時間、
  退避層級、最後錯誤類型與模型鎖定（不含憑證）
- `POST /api/resilience/cooldowns` — 請求主體 `{connectionIds: string[]}` 或
  `{all: true, provider?}`；回傳 `{cleared, unchanged, skippedTerminal, lockoutsCleared}`

### 鎖定設定 UI + 成功衰減恢復 (v3.8.23)

模型鎖定從永遠開啟的硬編碼行為，轉變為完全可設定、需主動啟用（opt-in）
的功能，擁有專屬的設定卡片與自我修復的恢復路徑。

**設定卡片：** 設定 → 模型鎖定
（`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`）。
這與上方唯讀的 `ModelCooldownsCard`（僅_列出_作用中的鎖定）**不同** —
新卡片用來_設定參數_。預設值定義於 `DEFAULT_MODEL_LOCKOUT_SETTINGS`
（`src/lib/resilience/modelLockoutSettings.ts`）：

| 設定                    | 預設值                           | 意義                                   |
| ----------------------- | -------------------------------- | -------------------------------------- |
| `enabled`               | `false`                          | 主開關 — 模型鎖定**預設關閉**。        |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | 計入模型範圍故障的上游狀態碼。         |
| `baseCooldownMs`        | `120_000` (120 s)                | 首次故障的初始鎖定時長。               |
| `maxCooldownMs`         | `1_800_000` (30 min)             | 升級後冷卻時間的上限。                 |
| `maxBackoffSteps`       | `10`                             | 指數退避升級的最大步數。               |
| `useExponentialBackoff` | `true`                           | 重複故障時是否以指數方式升級冷卻時間。 |

設定會透過一般的設定儲存機制持久化，並經由 resilience 設定 schema
驗證；卡片會對 `baseCooldownMs`/`maxCooldownMs` 進行邊界限制
（確保 `maxCooldownMs ≥ baseCooldownMs`），並限制 `maxBackoffSteps`。

**成功衰減恢復：** 恢復**並非**純粹依賴計時器到期。健康的回應會讓模型的
故障計數逐步下降，因此在窗口期間內恢復的模型，會在計時器到期前就停止
升級（並解除鎖定）。當 combo 目標成功時，`open-sse/services/combo.ts`
會呼叫 `decayModelFailureCount()`（`open-sse/services/accountFallback.ts`），
將儲存的 `failureCount` **減半**（`Math.floor(failureCount / 2)`）；當其歸
`0` 時，鎖定項目會被完全刪除。相對應的 `recordModelLockoutFailure()`
則會在升級窗口內發生故障時遞增計數（並升級冷卻時間）。此成功衰減機制
是單純計時器到期之外的額外路徑 — 任一路徑都能重新啟用模型。

**狀態：** 鎖定保存於**記憶體中**（每個程序的 `Map`，存放以
`provider:connectionId:model` 為鍵的 `ModelLockoutEntry`，確切範圍鎖定則以
`provider:connectionId:exact:model` 為鍵），不會持久化到
資料庫 — 重啟後即遺失。_設定_會被持久化；作用中的鎖定
_狀態_則是暫時性的。

---

## 4. 配額共享並行控制（v3.8.36）

訂閱制帳號（GLM、MiniMax 等）通常只接受約 1–3 個並行請求；超過此數量會觸發 429 與冷卻。在**配額共享**（`qtSd/…`）組合下此問題尤其嚴重，因為多個 API 金鑰共享同一個上游帳號。以下三層機制可防止共享帳號被請求淹沒。

### 每連線並行上限（`max_concurrent`）

每個提供者連線都可以宣告一個 `max_concurrent` 上限（`provider_connections.max_concurrent`，可在連線對話框 / API / 資料庫中設定）。留空表示不設限。這是驅動下方序列化層的唯一控制項——請將其設為該帳號的實際並行數（例如 GLM 約 1、MiniMax 約 2）。

### 每模型並行上限（`modelConcurrency`）

連線還可以在其 `rateLimitOverrides` 對應表中宣告精確的每模型並行上限：

```json
{
  "rateLimitOverrides": {
    "maxConcurrent": 4,
    "modelConcurrency": { "glm-5": 1, "glm-4.7": 3 }
  }
}
```

可在連線對話框中設定（**Rate limit overrides（速率限制覆寫）→ Per-model concurrency caps（每模型並行上限）**，每行一組 `model=cap`），或使用相同的 JSON 結構透過 `PATCH /api/providers/[id]` 設定。關鍵語義：

- **連線範圍 vs 模型專屬：** `maxConcurrent` 仍是整個連線共享的上限。當兩者都適用時，兩道閘門會在同一個複合閘門中以原子方式取得（`global → provider → account → model`）；實際生效的是適用限制中較嚴格者。
- **模型鍵精確比對：** 鍵是路由解析後傳給執行器的模型字串——通常是裸上游模型 ID（`glm-5`），而非用戶端的 `provider/model` 別名（`zai/glm-5` 不會匹配 `glm-5`）。值為正整數的並行請求上限。
- **本地排隊，不做探測：** 超出的請求會依現有的佇列/逾時語義在本地排隊（具類型的 `SEMAPHORE_TIMEOUT` / `SEMAPHORE_QUEUE_FULL` 准入錯誤）。OmniRoute 不會探測或推斷上游政策——它只強制執行維運者所設定的確切上限。飽和的模型閘門絕不會停用該提供者，也不會造成永久性的模型鎖定；上游的 429/冷卻/回退行為仍是錯誤的最終後盾。
- **每連線、每進程的作用範圍：** 上限是針對每個資料庫連線設定的，並保存在記憶體中，因此兩個使用相同上游 API 金鑰的連線彼此之間不會協調。
- **未設定即維持原狀：** 省略該對應表（或將儀表板欄位留空）就不會加入模型閘門。以下範例設定不預設任何通用的提供者限制：

```text
glm-5=1
glm-4.7=3
```

### 配額共享請求序列化

當配額共享派發指向一個宣告了正數 `max_concurrent` 的連線時，發往該**帳號**的並行請求會透過每連線信號量（鍵 `qsconn:<connectionId>`）被序列化：超出的請求會**在佇列中等待**，而非湧入該帳號。此機制為**故障開放（fail-open）**——佇列飽和或逾時時會在沒有名額的情況下繼續執行，而絕不拒絕可派發的請求。可在 **Settings（設定）→ Resilience（韌性）→ Quota-share per-connection concurrency（配額共享每連線並行）** 中切換（`resilienceSettings.quotaShareConcurrencyLimit.enabled`，預設開啟）。未設定 `max_concurrent` 上限時，行為維持不變。

> 配額共享路由閘門（`selectQuotaShareTarget`，DRR + P2C）本身也是故障開放的，只會將已達上限的連線_降低優先順序_——在單一連線池的情況下它無法硬性限制，因此真正遏制請求洪流的是這個信號量。

### 組合冷卻感知重試

對於每種組合策略（啟用時），當一個請求會因短暫態冷卻而形成 429 時，它會等待冷卻結束並重新派發，而非直接回傳 429——這涵蓋了多模型組合上 Gemini 級別的 TPM/RPM 視窗（約 60 秒的 retry-after），例如雙模型組合的兩個目標同時觸發每模型速率限制的情況。其上限由 **Settings（設定）→ Resilience（韌性）** 中的 `comboCooldownWait`（`enabled`、`maxWaitMs`、`maxAttempts`、`budgetMs`）約束。對於 `quota_exhausted`（鎖定至午夜）或驗證/找不到等原因，絕不等待。

同一道閘門也涵蓋派發前的情況（#16319）：當組合的每個目標在任何嘗試之前，都因其模型處於短暫態鎖定而被跳過時，零嘗試路徑會在相同的上限內等待鎖定結束並重新派發，而非回應一個不帶提示的 `503 ALL_TARGETS_SKIPPED`。當不允許等待時（達到上限、嘗試次數或預算耗盡，或功能關閉），最終回應會升級為 `429 rate_limit_error`，並攜帶來自最早到期的暫態鎖定的 `retry_after` / `reset_at`；配額、驗證與找不到的鎖定則維持無提示的 503。

```text
#16319 · comboCooldownWait · pre-dispatch (attempts = 0)
all targets skipped + transient model lockout:
  enabled ∧ 0 < waitMs ≤ maxWaitMs ∧ attempt < maxAttempts ∧ budgetLeftMs ≥ waitMs
    → wait → re-dispatch
  wait = false → HTTP 429 rate_limit_error
  retry_after / reset_at ← earliest transient lock expiry
quota_exhausted / auth_error / not_found / not_found_local:
  no transient hint → HTTP 503 ALL_TARGETS_SKIPPED
```

---

## 5. 請求佇列准入控制(v3.8.49 · issue #6593)

**範圍**:本機的每個「提供者+連線」速率限制佇列(`open-sse/services/rateLimitManager.ts`,由 Bottleneck 支撐),位於上述三個機制的下一層。

**`maxWaitMs` 限制佇列等待;`executionMaxWaitMs` 限制執行。** 兩者是刻意分開的,彼此互不回饋給對方。

`resilienceSettings.requestQueue.maxWaitMs` 是**佇列等待預算**:它涵蓋等待提供者槽位以及隨後處於 QUEUED 狀態的時間,其計時器在工作離開 QUEUED 並開始執行的那一刻即被清除(`rateLimitManager.ts`,`wrappedFn`)。超過此預算的請求永遠不會到達上游。預設為 30000ms,由 `src/lib/resilience/settings.ts` 中的 `DEFAULT_REQUEST_QUEUE_MAX_WAIT_MS` 提供,並由 `tests/unit/ratelimit-admission-control-6593.test.ts` 鎖定,因此變更該值會讓該測試變紅,而不會讓本段悄悄過時。

`resilienceSettings.requestQueue.executionMaxWaitMs` 是 Bottleneck 所接收的工作 `expiration`,其計時器僅在派送後才啟動。它是為本身沒有上游逾時的執行器所設的後備保護,且當執行器自己的 fetch 起始逾時更長時,它會被提高到該值,因此不會截斷健康的傳輸中回應。預設為 600000ms(10 分鐘)。

將佇列預算餵給 `expiration`,正是過去會在傳輸中途殺死非增量式閘道的原因——它們在收到第一個位元組之前,合法地執行長達數分鐘——這也是為什麼 expiration 會以 `code: "RATE_LIMIT_EXECUTION_TIMEOUT"`(HTTP 504)呈現,而佇列預算則帶有佇列逾時代碼。可透過 `RATE_LIMIT_MAX_WAIT_MS` / `RATE_LIMIT_EXECUTION_MAX_WAIT_MS`(環境變數)或儀表板(**設定 → 韌性**)覆寫任一者。兩者在正規化時都會被夾限在 1ms–24h 之間。

**兩者的優先順序:**環境變數僅提供_預設值_。持久化在 `resilienceSettings.requestQueue` 中的值(儀表板 / API patch,儲存於 `key_value`)優先於它,而每個連線的 `rateLimitOverrides.maxWaitMs` / `.executionMaxWaitMs` 又優先於前者。因此,在已有持久化值的部署上設定環境變數不會改變任何事——請改為清除或更新持久化的設定。

佇列停留時間由 `maxWaitMs` 限制;下方的 `maxQueueDepth` 則限制同時可有多少呼叫者排入佇列。

**回應內文聲明的重試:配速與鎖定。** 429 回應內文可以自行指定等待時間(Gemini 的 `RetryInfo.retryDelay`、"retry after Ns" 文字),由 `updateFromResponseBody` 讀取。符合連線 `maxWaitMs` 的等待時間屬於配速(pacing):限制器會在該段時間內耗盡其儲量,待其重新填充時,佇列中的呼叫便會派送。比 `maxWaitMs` 更長的等待時間並非佇列能坐等的——Gemini 對已用盡的每日配額會回以 `retryDelay: "86399s"`。重建後 429 上所轉發的 `Retry-After`(#16528)已使備援引擎在該時間窗內鎖定模型,但若同時為此暫停限制器,仍會讓任何提早到達金鑰的呼叫(例如在韌性重置之後)停滯整整 `maxWaitMs`。當此類等待來自有類型的 Google `RetryInfo` 詳細資訊(`google_rpc_retry_info` 來源),且金鑰的限制器已限定於模型範圍(見 `getLimiterKey`)時,429 會改為在該連線上成為模型鎖定(`open-sse/services/rateLimitManager/bodyRetryPause.ts` 中的 `lockModelForLongBodyRetry`,上限 24 小時),而限制器保持不暫停。帳號選擇會透過 `isModelLocked()` 在該鎖定上跳過,針對綁定到該連線之目標的 combo 派送前閘門亦然。在 antigravity 上,其限制器是按配額家族劃分的,鎖定落在確切模型上,如同其其他配額鎖定。當別名將客戶端請求的名稱解析到該模型時,該名稱也會被鎖定,因為這些檢查使用的是請求的名稱;它是精確鎖定的(`lockExactModel`),因此跨越 antigravity 配額家族或 codex 範圍的別名永遠不會鎖定自身。純文字提示、無類型的 `retryDelay`,或整個連線共用的限制器,則保留暫停行為。當 429 路徑剛重建的限制器確實暫停時,剩餘佇列時間早於暫停結束的呼叫者會立即以佇列逾時代碼被拒絕(`checkLimiterPause`),而非等待那段時間耗盡;記錄的結束時間錨定在限制器建立之前——即 Bottleneck 啟動其刷新時鐘之處——之後對儲量的任何變更都會忘記它。由 `tests/unit/rate-limit-long-body-retry-lockout.test.ts` 與 `tests/unit/rate-limit-body-retry-pause.test.ts` 涵蓋。

**`maxQueueDepth` — 選擇加入的准入上限(新)。** `resilienceSettings.requestQueue.maxQueueDepth` 限制單一「提供者+連線」同時可有多少請求處於佇列中(尚未派送)。當佇列已持有 `maxQueueDepth` 個請求時,新請求會在到達 `limiter.schedule()` **之前**就以帶類型的 `code: "RATE_LIMIT_QUEUE_FULL"` 錯誤被快速拒絕——因此拒絕成本低廉,且發生在該請求的任何下游 prompt 壓縮 / 翻譯工作之前。預設 `0` = 停用,保留現有的無界佇列行為;範圍 0–100000。可透過 `RATE_LIMIT_MAX_QUEUE_DEPTH`(環境變數)或 `resilienceSettings.requestQueue.maxQueueDepth`(儀表板 / API patch)覆寫。

准入檢查本身是一個純函式(`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`),因此無需真實的 Bottleneck 限制器即可進行單元測試。

> 建立 #6593 的那份 RFC 同時也提出了一個 `bypassCompressionOnRateLimit`
> 旗標。此儲存庫的 `open-sse/services/compression/` 管線是針對外送 LLM 請求的
> 提示詞/上下文壓縮（`chatCore.ts`，大約在 `resolveCompressionSettings`/`selectCompressionStrategy` 區塊附近），
> 而不是針對合成的 429 回應主體進行 HTTP 回應壓縮——因此沒有與字面上的 bypass 旗標相對應的程式碼路徑。
> 該提示詞壓縮步驟目前也在請求管線中於 `withRateLimit()` _之前_執行，
> 因此要重新排序以便在佇列已滿的拒絕情況下跳過它，是一個超出此議題範圍的獨立且更大的變更；
> 此處刻意**未**實作，若節省 CPU 的效益值得承擔重新排序的風險，則留待後續處理。

### 速率限制自動啟用安全網與連線保護（`rateLimitProtection`）

**自動啟用安全網**（`resilienceSettings.requestQueue.autoEnableApiKeyProviders`，預設 `true`）：
預設情況下，OmniRoute 會自動為所有使用中的 API 金鑰提供者連線（`getProviderCategory(provider) === "apikey"`）啟用速率限制佇列保護。這可確保送往對速率敏感的上游 API 金鑰的傳入請求會透過 Bottleneck 排隊並節流，而不是突發湧入上游而產生 429 錯誤。此安全網可透過 `RATE_LIMIT_AUTO_ENABLE` 環境變數覆寫（`false`/`0`/`off` 為停用，`true`/`1`/`on` 為強制啟用），其優先順序高於已持久化的儀表板設定（**設定 → 韌性** / `PATCH /api/resilience`）。

**各連線 `rateLimitProtection` 的語意：**
各連線的速率限制保護是透過提供者連線上的 `rateLimitProtection` 布林欄位追蹤（在 SQLite 中持久化為 `rate_limit_protection`）：

- **明確開啟（`rateLimitProtection === true`）**：無論提供者類別為何，或自動啟用安全網是否開啟，皆會明確為此連線啟用速率限制保護。
- **明確關閉（`rateLimitProtection === false`）**：停用明確保護，但**不會**讓使用中的 API 金鑰連線退出全域自動啟用安全網。在 `reconcileEnabledConnections`（`open-sse/services/rateLimitManager.ts`）中，`false` 與 `undefined` 是等價的：只有 `rateLimitProtection === true` 會被視為明確覆寫。若 `rateLimitProtection` 為 `false`（或未設定），使用中的 API 金鑰連線仍符合自動啟用條件，並持續受到速率限制保護。
- **無各連線退出機制**：在保持其他連線的自動啟用功能運作的情況下，操作者目前無法表達「這個單一使用中的 API 金鑰連線必須在沒有速率限制佇列保護的情況下執行」。若要完全讓 API 金鑰連線在沒有速率限制佇列的情況下執行，必須全域關閉安全網（`RATE_LIMIT_AUTO_ENABLE=false` 或 `resilienceSettings.requestQueue.autoEnableApiKeyProviders = false`）。

**支援的寫入路徑：**

- **`POST /api/rate-limits`**：用於切換連線 `rateLimitProtection` 的受支援管理寫入路徑（`{ connectionId: string, enabled: boolean }`）。以 `enabled: true` 呼叫會開啟明確保護；以 `enabled: false` 呼叫會移除明確保護（不過若自動啟用已開啟，使用中的 API 金鑰連線仍受全域安全網涵蓋）。
- **`PUT /api/providers/[id]`**：刻意**不**接受或翻轉 `rateLimitProtection`（#11278）。透過 `PUT /api/providers/[id]` 更新提供者連線中繼資料，永遠不會改變已持久化的速率限制保護狀態。

---

## 6. 慢速串流吞吐量看門狗（#9709）

可選的 `resilienceSettings.streamRecovery.throughputWatchdog` 防護機制會偵測
上游仍在傳送區塊、但產生的助理輸出低於所設定的有效輸出速率的情況。它刻意
與閒置逾時（idle timeout）區分開來：心跳（heartbeat）與中繼資料（metadata）既不會
重置任一計時器，也不算作進度。它同時也與硬性嘗試截止期限（#9153）不同，
後者不論輸出品質如何，始終是絕對的安全上限。

看門狗必須經過暖身期（warm-up period），再接著一個完整的滾動窗口（rolling
window），才能觸發中止。它會計算來自 Chat Completions 與 Responses API 輸出
事件的文字增量（採用保守的 UTF-8 位元組代理值），忽略僅含用量與空的事件，
並在工具呼叫或推理事件進行中時暫停判斷。它預設為停用，可透過
`STREAM_THROUGHPUT_WATCHDOG_ENABLED=true` 啟用；窗口、暖身期、最低速率與
最低可測量輸出皆由一般的 resilience-settings 正規化層加以限制。

啟用後，看門狗的中止僅套用於當前作用中的上游嘗試。在任何對客戶端可見的
位元組送出之前，既有的同帳號早期復原（early-recovery）路徑可重新開啟該次嘗試。
在提交（commit）之後，串流絕不會被盲目重播；只有既有的安全串流中途接續
（mid-stream continuation）契約才能拼接後綴。最終化（finalization）仍維持單次
執行，因此用量計算與信號量（semaphore）釋放不會重複發生。

---

## 7. 上游狀態碼重述（狀態碼遭誤標的配額錯誤）

**範圍：** 一個以錯誤的 HTTP 狀態碼回報暫時性配額耗盡的上游閘道。

**目的：** 在分類之前更正誤導性的狀態碼，讓下游消費者（fallback 引擎、combo 聚合、面向客戶端的回應）看到失敗真正的可重試本質。

某些閘道會以不可重試的 HTTP 狀態碼來表示暫時性配額耗盡。`agentrouter.org` 會回傳 `403`（有時是 `400`），並附上中文內文（`用户额度不足` / `额度不足`），而非標準的 `429`。像 Claude Code 這類客戶端會將 `403` 視為永久性錯誤並中止工作階段；若不加以更正，fallback 引擎會將其分類為 `AUTH_ERROR`，而非配額事件。

**實作：**

- 註冊表 + 比對器：`open-sse/config/upstreamStatusRestatement.ts` —— 一份依提供者區分的規則清單（`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`），透過 `applyStatusRestatement()` 進行比對。
- 呼叫位置：`open-sse/handlers/chatCore.ts` 中的 `providerFailure:` 區塊（約第 3654 行），位於 `parseUpstreamError()` 解析完帶有錯誤 HTTP 狀態碼（`!providerResponse.ok`）的上游回應之後、任何分類執行之前，讓每個下游消費者都能看到更正後的狀態碼。嵌入在 `200` SSE 串流內的錯誤走的是另一條較晚的串流解析路徑，目前**並未**被此 hook 涵蓋 —— 這是已知的限制，而 agentrouter 的狀態碼誤標（以錯誤 HTTP 狀態碼浮現）暫時還不需要用到它。
- 重試資格：`429` 已列入 `RETRY_AFTER_ELIGIBLE_STATUSES`（`open-sse/services/combo/unavailableRetryGate.ts`），因此重述後的錯誤會帶有真正的重試窗口，而不會以無法重試的 `403` 浮現。
- 合成的 `60s` `defaultRetryAfterMs`（`upstreamStatusRestatement.ts`）只是重述後的回應告知**客戶端**的數值；它本身並非連線的內部冷卻／鎖定期間 —— 後者由實際處理該重述錯誤的機制各自掌管（連線冷卻的遞增退避，§2，API 金鑰提供者的基礎值為 `3s`；或模型鎖定，§3，適用於像 agentrouter 這類按模型配額的提供者）。路由器在內部可能比它向客戶端宣告的 60 秒窗口更早具備重試資格 —— 這是有意保留的餘裕，不是 bug。

永久性錯誤（agentrouter 的 `无权访问模型` —— 無權存取此模型）絕不會被重述：即使 `textMarkers` 命中，`excludeMarkers` 仍會否決該規則，因此錯誤會保留其原始狀態碼，也不會有任何機制永無止境地重試它。對應的提供者分類規則（`open-sse/config/providerErrorRules.ts` 中的 `agentrouter-model-access-denied`：`reason: "auth_error"`、`scope: "model"`、宣告的基礎冷卻時間為 `6h`）會由 `checkFallbackError`（`open-sse/services/accountFallback.ts`）在通用的 apikey 類別 `FORBIDDEN` 提早返回_之前_查閱，並以 `honorsRuleLockScope(provider)` 作為閘門（#10334 —— 目前透過 `providerErrorRules.ts` 中的 `HONORS_RULE_LOCK_SCOPE_PROVIDERS` 允許清單僅限 agentrouter）。規則宣告的 6 小時冷卻時間會以 `fallbackResult.baseCooldownMs` 的形式傳遞，但它仍會餵入既有的按模型配額鎖定路徑（`lockModelIfPerModelQuota()` / `recordModelLockoutFailure()`，除了冷卻時間來源之外不受 #10334 影響）：如同其他所有模型鎖定，它會被箝制到營運者的 `mlSettings.maxCooldownMs`（預設 `1_800_000ms` / 30 分鐘），且_持久化的鎖定原因_仍維持既有硬編碼的 `"forbidden"`，而非規則的 `"auth_error"` —— 端到端只採用冷卻時間長度，不採用原因字串。連線本身保持啟用；同一連線上的兄弟模型不受影響。

重述後的配額錯誤（`额度不足`）在生產環境中會命中一條提供者規則（`agentrouter-user-quota-exhausted`：`reason: "quota_exhausted"`、`scope:
"connection"`，本身未宣告冷卻時間 —— 套用持久層的按比例退避預設值）。自 #10334 起，`ProviderErrorRuleMatch` 上的 `scope` 確實會被端到端消費，但**僅限** `HONORS_RULE_LOCK_SCOPE_PROVIDERS` 允許清單中的提供者（`providerErrorRules.ts` —— 目前僅有 `"agentrouter"`，透過 `honorsRuleLockScope()` 把關）。對其他所有提供者而言，`scope` 仍僅供參考，與 #10334 之前完全相同。`checkFallbackError` 會將命中規則的 scope 以 `fallbackResult.ruleScope` 呈現；`isAgentrouterConnectionQuotaScope()`（`src/sse/services/auth.ts`）是共用的守衛，用來確認某個 `ruleScope` 是否真正可安全地視為連線範圍、可自我恢復的訊號（scope 為 `"connection"`、reason 為 `quota_exhausted`、絕不為 `permanent`、絕不為 `creditsExhausted` —— 以防未來某條規則將 scope `"connection"` 與永久性帳號狀態配對）。有兩個消費者會呼叫它：

- **持久化**(`markAccountUnavailable()`、`src/sse/services/auth.ts`):
  不再落入 passthrough 提供者的**每模型**鎖定分支
  (agentrouter 為 `passthroughModels: true` → `hasPerModelQuota()`
  回傳 `true`),而是套用**暫時性連線冷卻**——
  `testStatus: "unavailable"` 加上 `rateLimitedUntil`,絕不會是終態狀態
  (`credits_exhausted`/`banned`/`expired`)——因此連線在冷卻期結束後
  會自行恢復,而無需手動重設憑證。
  對於設有 `disableCooling: true` 的連線則會略過(#2997):該選擇退出
  會改為落入每模型鎖定(這是有文件記錄的權衡取捨——
  請參閱該分支上方的程式碼註解)。
- **同一請求的組合路由**(`applyComboTargetExhaustion()`、
  `open-sse/services/combo/targetExhaustion.ts`):同一個防護判斷會將該連線
  標記進記憶體內的 `exhaustedConnections` 集合,以
  `${provider}:${connectionId}` 為鍵。這只會略過同一請求中、其自身目標物件上
  _已經帶有完全相同 `connectionId`_ 的剩餘目標
  (`getExhaustedTargetSkipReason()`、
  `open-sse/services/combo/comboPredicates.ts`,在 `exhaustedConnections` 查詢之前的
  `if (provider &&
connectionId)`)——一般的模型清單組合中,同層目標本身並未固定
  帶有自己的 `connectionId`,只會在每次派發時從回應的
  `X-OmniRoute-Selected-Connection-Id` 標頭解析出來,因此永遠不會命中
  該鍵值比對。對於這種常見情況,真正防止剩餘分支(leg)重複使用
  剛耗盡帳號的機制並不是這個 Set——而是上方的持久化層
  (該連線的 `rateLimitedUntil` 現在指向未來時間),加上同一個
  防護判斷抑制了此失敗的 `transientRateLimitedProviders`
  (請參閱「兩階段設計」以及 `targetExhaustion.ts` 中
  `isAgentrouterConnectionQuotaScope` 分支上的程式碼註解):由於該 Set
  未被標記,`combo.ts` 的 `allowRateLimitedConnection` 強制允許
  (`open-sse/services/combo.ts:1005-1013`、`:2734-2738`)不會對
  該提供者的剩餘分支生效,因此憑證選擇的 `rateLimitedUntil`
  篩選器(`src/sse/services/auth.ts:1238`)會正常生效,剩餘分支
  要麼選擇另一條仍符合資格的 agentrouter 連線,要麼以無可用憑證
  而失敗——它不會強行回到此分支剛冷卻的連線上。

### 兩階段設計:先狀態重述,再分類

狀態重述(`upstreamStatusRestatement.ts`)與提供者
分類規則(`open-sse/config/providerErrorRules.ts`、
`providerRuleRegistry`)是兩個獨立的註冊表,兩者都以提供者 id
與文字標記為鍵,但它們在不同位置執行、服務於不同目的:
重述會在 `chatCore.ts` 早期改寫 HTTP 狀態碼;
分類規則則在 `checkFallbackError()`
(`open-sse/services/accountFallback.ts`)內部決定容錯移轉的 `reason`
並鎖定 `scope`(`model` / `provider` / `connection`)。

分類規則只有在提供者被列於 `providerErrorRules.ts` 的
`FULL_TEXT_RULE_PROVIDERS` 允許清單中時,才能看到完整的錯誤**文字**
(這是比對 `额度不足` 等內文標記所必需的)——目前僅有
`"agentrouter"`。對於其他所有**內建目錄**提供者,
`checkFallbackError` 只會將結構化錯誤(`{code, type}`)交給
`getProviderErrorRuleMatch`,這對於基於標頭/狀態碼/錯誤碼的規則
已經足夠,但無法看到內文文字標記。
輔助函式 `resolveRuleMatchBody()` 負責這項選擇:允許清單中的提供者
取得完整錯誤文字,其餘則取得結構化錯誤。將**內建**提供者加入
`FULL_TEXT_RULE_PROVIDERS` 是明確的逐提供者選擇加入(opt-in)——
其存在目的是讓不在清單上的每個提供者的預設路徑
保持逐位元完全不變。

規則的 `scope`(`model` / `provider` / `connection`)是與
`FULL_TEXT_RULE_PROVIDERS` 分開的選擇加入:
`checkFallbackError` 只會將其呈現為 `fallbackResult.ruleScope`,
而下游消費者只會對同一檔案中 `HONORS_RULE_LOCK_SCOPE_PROVIDERS`
允許清單內的提供者(透過 `honorsRuleLockScope()` 把關——目前僅有
`"agentrouter"`)將其當作不只是資訊性標籤的內容來遵循。
關於提供者進入該允許清單後,`scope: "connection"` 比對
實際會產生什麼效果,請參閱上方的「重述後的配額錯誤」。

**#11104——操作者宣告的規則會繞過這兩個允許清單。**操作者可在
執行期透過 `settings.providerErrorRules`
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`)
宣告逐提供者規則,而無需編輯此檔案。若將操作者規則擋在
`FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS`
之後——這些允許清單的目的是保護內建目錄規則的**預設**行為——
將使設定機制對除已列名者之外的所有提供者失效,
因為宣告規則本身就已經是操作者的明確選擇加入。
`resolveRuleMatchBody()` 與 `honorsRuleLockScope()` 都會先檢查
`hasOperatorRuleForProvider()`:擁有操作者規則的提供者
會取得原始錯誤文字,且其宣告的 `scope` 會被遵循,
無論它是否也出現在任一允許清單中。

**已知缺口——`providerRuleRegistry` 在 HTTP 400 時永遠不會被查詢。**
`checkFallbackError` 的 `BAD_REQUEST` 分支完全透過自己的模式陣列
(`accountFallback.ts` 中的 `MODEL_ACCESS_DENIED_PATTERNS`、
`CONTEXT_OVERFLOW_PATTERNS` 等)來分類狀態碼 400,
並在其上方的 `configuredRule`/`getProviderErrorRuleMatch` 分支
被執行到之前就回傳。一條 `status: 400` 的內建目錄規則
(或操作者規則)在語法上是有效的,但永遠不會觸發。
目前沒有任何現存規則以 400 為目標,因此生產環境不受影響——
但未來的 400 規則需要先修改此分支,這比新增一條規則是更大的變更
(它會為每個已依賴模式陣列行為的提供者重新分類 400),
且超出單一提供者規則新增的範圍。

### 新增會誤報配額狀態的閘道

1. 在 `statusRestatementRegistry`
   （`open-sse/config/upstreamStatusRestatement.ts`）中註冊一個規則陣列。讓 `textMarkers`
   保持提供者專屬；絕不要重複使用會與
   `CREDITS_EXHAUSTED_SIGNALS`（`open-sse/services/accountFallback.ts`）衝突的通用英文片語。
2. 可選地在
   `open-sse/config/providerErrorRules.ts`（`providerRuleRegistry`）中註冊分類規則，
   以選擇正確的鎖定範圍（`connection` 用於帳號層級配額，`model` 用於
   個別模型的錯誤）。此步驟僅對規則需要完整錯誤文字（body 標記）的提供者
   在生產環境中生效：在同一檔案中將提供者 id 加入
   `FULL_TEXT_RULE_PROVIDERS` — 否則 `checkFallbackError` 只會把結構化的
   `{code, type}` 錯誤交給規則，而 body 文字規則將永遠無法匹配
   即時流量。純粹依據 `status`/`headers` 匹配的規則（如 Opencode 或
   Minimax 的規則）不需要此選用設定。另外，如果規則宣告
   `scope: "connection"`，且意圖是實際的連線層級冷卻加上同一請求的
   combo 跳過（而非僅是資訊性標籤），請在同一檔案中將提供者 id 加入
   `HONORS_RULE_LOCK_SCOPE_PROVIDERS` — 這正是控制
   `markAccountUnavailable()`（`src/sse/services/auth.ts`）與
   `applyComboTargetExhaustion()`
   （`open-sse/services/combo/targetExhaustion.ts`）中
   `isAgentrouterConnectionQuotaScope()` 式取用行為的開關；沒有它，
   `scope` 仍會透過 `fallbackResult.ruleScope` 傳遞，但不會有任何東西
   據此行動。
3. 新增仿照 `tests/unit/upstream-status-restatement.test.ts`
   與 `tests/unit/agentrouter-error-rules.test.ts` 的單元測試（包含
   not-permanent / not-creditsExhausted 防護，以及 — 如果提供者需要
   允許清單 — 一個斷言 `resolveRuleMatchBody()` 僅對該提供者回傳
   完整文字的測試）。

不需要變更 `chatCore.ts`、`classifyError` 或 combo。

#### 出口分桶鎖定 (#10880)

`EGRESS_BUCKETED_LOCK_PROVIDERS` 中的提供者（opencode 家族）被視為
以 IP 分桶的上游（opencode 免費方案是以 IP 分桶，而非
以帳號分桶 — 參見 #9611）：一個被分類為 `quota_exhausted`
**或** `rate_limit_exceeded` 的 status-429，會在輪替有機會嘗試之前，
冷卻所有最後已知出口 IP 與失敗連線相同的允許清單家族連線
— 避免 N-1 次保證失敗的上游呼叫（與 #10460/#10525 形式相同）。
刻意包含 `rate_limit_exceeded`：在 `markAccountUnavailable`
路徑上，opencode 專屬規則永遠不會匹配（沒有 headers/body 交給
`checkFallbackError`，opencode 不在 `FULL_TEXT_RULE_PROVIDERS` 中），
因此 body 帶有訂閱配額文字（"monthly usage limit reached"）的 429
會在 `status_429` 規則被觸及之前，由配額文字回退
（`buildSubscriptionQuotaFallback`，`accountFallback.ts`；1 小時冷卻）
分類為 `quota_exhausted` — 而不含配額文字的 429（純粹的速率限制）
會透過 `status_429` 規則分類為 `rate_limit_exceeded`，且仍會冷卻
該 IP 家族。對於允許清單中的提供者，以 IP 分桶的速率限制
與配額耗盡是相同的訊號。坦誠的限制：

- **盡力而為（Best-effort）**：鎖定會從 `proxy_logs` 解析該連線最後已知的 `egress_ip`
  （24 小時視窗、同步、無快取）。冷快取（出口 IP 從未被探測）或無資料列 →
  失敗的連線仍會被分支冷卻（如同現行做法記錄），只是不會鎖定任何兄弟連線。
- **永不為終態**：冷卻是一個可更新的配額視窗
  （`testStatus: "unavailable"`）；永久狀態絕不會從 IP 層級的訊號推導出來。
  `disableCooling` 連線會完全跳過此分支。
- **允許清單家族的鎖定粒度改變**：這是範圍（scope）變更，不只是兄弟連線的
  最佳化。opencode 是 `passthroughModels` 提供者，所以在此分支之前，429 會產生
  逐模型（per-MODEL）的鎖定；現在則產生連線冷卻 —— 包括對於只執行單一連線、
  完全沒有兄弟連線的營運者。這正是 opencode 規則表早已宣告為正確的粒度
  （`scope: "connection"`，`providerErrorRules.ts`），但至今從未被遵守，因為
  opencode 不在 `HONORS_RULE_LOCK_SCOPE_PROVIDERS` 中。此分支會自行寫入失敗
  連線的冷卻 + `backoffLevel`，比照連線範圍的 agentrouter 分支，然後返回 ——
  逐模型封鎖與下方的一般路徑永遠不會被到達。
- **包含 Combo**：如同 agentrouter 分支，此範圍刻意忽略 combo 呼叫者對 429
  套用的 `persistUnavailableState`/`isCombo` 降級。逐模型鎖定並非此範圍的較弱
  形式，而是錯誤的單位：它對已耗盡的 IP 什麼也沒說，因此 combo 輪替會持續為
  每個兄弟連線白白浪費一次保證失敗的呼叫。
- **兄弟連線安全**：已處於終態（banned/credits_exhausted）或已在較長冷卻中的
  兄弟連線絕不會被覆寫。
- **專屬允許清單**：擴大 `EGRESS_BUCKETED_LOCK_PROVIDERS` 是明確的擁有者決策；
  不引入通用化接線（模式 #10334/#10419）。兄弟連線查詢綁定同一個允許清單，
  而非以 SQL 字面值重複它，因此擴大清單仍維持一行變更。
- **出口 IP 輪替，雙向皆然**：查詢視窗（24 小時）遠寬於出口 IP 快取 TTL
  （5 分鐘），所以「最後已知 IP」是歷史紀錄，而非目前狀態。如果連線的代理在
  視窗內輪替過，鎖定可能**錯過**真正共享的 IP（記錄的 IP 是新的、未耗盡的那個）
  —— 對稱地，它也可能**冷卻一個已從耗盡 IP 輪替離開的兄弟連線**。第二種情況
  會讓該兄弟連線損失一個冷卻視窗；兩者都是基於歷史查詢的盡力而為限制，已予接受。
- **成本**：對 `proxy_logs` 的兩次有界掃描（透過 `idx_pl_timestamp` 過濾視窗），
  僅以 429 的發生頻率執行。無新索引（遷移 134 YAGNI）。在適度大小的真實流量
  資料庫副本上測量；高吞吐量的實例在同一視窗中會按比例持有更多資料列。

---

## 其他韌性功能

- **21 種路由策略**（priority、weighted、round-robin、context-relay、fill-first、p2c、random、least-used、cost-optimized、reset-aware、reset-window、expiry-first、headroom、quota-weighted、strict-random、auto、lkgp、context-optimized、cache-optimized、fusion、pipeline）— 請參閱 [AUTO-COMBO.md](../routing/AUTO-COMBO.md)。
- **重置感知路由**（v3.8.0）— 依配額重置時間優先選擇連線。
- **背景模式降級** — Responses API 的 `background: true` 會降級為同步模式並附上警告。
- **動態工具上限偵測** — 達到工具數量上限時，對提供者進行退避。
- **緊急回退** — 由 `OMNIROUTE_EMERGENCY_FALLBACK` 控制；操作人員可在功能旗標頁面覆寫此設定，無需重新啟動。

---

## 除錯

- 加權組合回應 `503 all_targets_cooling_down`（已設定 `Retry-After`，`diagnostics.excluded` 列出每個目標及其 `model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable` 狀態）→ 表示集區已設定並連線，只是每個目標都被韌性計時器排除；`[COMBO] Weighted selection: every target excluded before dispatch — …` 警告會註明原因與剩餘秒數。同一組合若回應 `404 no_executable_targets`，則表示與韌性計時器無關（沒有可執行的目標，或每個帳號都未通過可用性探測）。此功能建置於 `open-sse/services/combo/pinRecovery.ts`，使用 `targetResolution.ts` 所收集的排除項目。
- 某提供者的所有金鑰都被略過 → 請同時檢查熔斷器狀態以及每個連線的 `rateLimitedUntil`/`testStatus`。
- 提供者在重置窗口過後仍被永久排除 → 程式碼直接讀取原始的 `state`，而非使用 `getStatus()`/`canExecute()`。
- 單一金鑰失敗、其他金鑰應可運作 → 優先使用連線冷卻而非熔斷器。
- 僅單一模型失敗 → 優先使用模型鎖定而非連線冷卻。
- 狀態應自動恢復但未恢復 → 檢查是否存在未來時間戳，以及讀取路徑是否會刷新過期狀態。永久狀態需要手動變更。

---

## 執行時期狀態 — 代理快速參考

> 自 `AGENTS.md` →「Resilience Runtime State」逐字搬移（PR #12743），使代理
> 指南維持在 40k 上下文預算之內。此為上述章節的精簡、面向代理版本；
> 編號章節仍是完整參考文件。

OmniRoute 有三種相關但各自不同的暫時性失敗機制。除錯路由行為時，
請務必區分它們的適用範圍。請參閱
[三層韌性架構圖](../diagrams/exported/resilience-3layers.svg)
（來源：[diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)）
以快速掌握全貌。

### 提供者熔斷器

**範圍**：整個提供者，例如 `glm`、`openai`、`anthropic`。

**目的**：停止將流量送往在上游/服務層級持續失敗的提供者，
避免單一不健康的提供者拖慢每一個請求。

**實作**：

- 核心類別：`src/shared/utils/circuitBreaker.ts`
- 聊天閘門/執行接線：`src/sse/handlers/chatHelpers.ts`、`src/sse/handlers/chat.ts`
- 執行時期狀態 API：`src/app/api/monitoring/health/route.ts`
- 共用包裝器：`open-sse/services/accountFallback.ts`
- 持久化狀態資料表：`domain_circuit_breakers`

**狀態**（4 種 — `src/shared/utils/circuitBreaker.ts`）：

- `CLOSED`：允許正常流量。
- `DEGRADED`：早期警告區間 — 失敗次數已超過降級閾值，但尚未達到
  熔斷器閾值；流量仍會通過，儀表板會顯示警告。有效的連線
  測試或一段沒有新失敗的安靜窗口會使其回到 `CLOSED`
  （窗口設定見 `docs/architecture/RESILIENCE_GUIDE.md`）。
- `OPEN`：提供者暫時被封鎖；呼叫端會收到 provider-circuit-open 回應，
  或組合路由跳至另一個目標。
- `HALF_OPEN`：重置逾時已屆滿；允許一個探測請求。成功則關閉
  熔斷器，失敗則再次開啟。

**預設值**（`open-sse/config/constants.ts` → `PROVIDER_PROFILES`，透過
`src/lib/resilience/settings.ts` 中的 `DEFAULT_RESILIENCE_SETTINGS.providerBreaker` 使用，
再接到 `src/sse/handlers/chatHelpers.ts` 中的 `getCircuitBreaker(provider, …)`）。
整個提供者層級的熔斷器依據 `circuitBreakerThreshold` / `circuitBreakerReset` 運作：

| 設定檔   |       降級於 | 開啟於（`circuitBreakerThreshold`） | 重置（`circuitBreakerReset`） |
| -------- | -----------: | ----------------------------------: | ----------------------------: |
| OAuth    |          `5` |                                 `8` |                         `60s` |
| API 金鑰 |          `7` |                                `12` |                         `30s` |
| 本地     | （推導得出） |                                 `2` |                         `15s` |

`PROVIDER_PROFILES` 也定義了 `providerFailureThreshold`（10/15/2）、
`providerFailureWindowMs`（15/30/5 分鐘）與 `providerCooldownMs`（5/10/1 分鐘）：這些是
**選用式全域 Provider Cooldown 的窗口閘門**（`PROVIDER_COOLDOWN_ENABLED`，預設
關閉）的運作依據 — `open-sse/services/providerCooldownTracker.ts` 中的提供者層級
項目，只有在 `providerFailureWindowMs` 窗口內累積 `providerFailureThreshold` 次失敗後
才算進入冷卻，接著冷卻 `providerCooldownMs`。它們「不是」實際運作中熔斷器的
閾值 — 請勿調整它們並期望熔斷器行為改變。所有預設值都可透過
`OMNIROUTE_PROVIDER_BREAKER_*` 與 `OMNIROUTE_CIRCUIT_BREAKER_*` 環境變數覆寫；
執行時期最準確的參考表位於 `docs/architecture/RESILIENCE_GUIDE.md`。

只有提供者層級的失敗狀態碼才應觸發提供者熔斷器：

```ts
(408, 500, 502, 503, 504);
```

對於一般的帳號/金鑰/模型錯誤（例如大多數 `401`、`403` 或 `429`
情況），請勿觸發整個提供者層級的熔斷器。這些錯誤通常屬於連線冷卻
或模型鎖定的範疇。一般 API 金鑰提供者的 `403` 應可恢復，
除非它被歸類為終端性的提供者/帳號錯誤。

熔斷器採用惰性恢復（lazy recovery），而非背景計時器。當 `OPEN` 狀態過期時，諸如
`getStatus()`、`canExecute()` 與 `getRetryAfterMs()` 這類讀取操作會將狀態刷新為
`HALF_OPEN`，因此儀表板與組合候選建構器不會永遠持續排除一個已過期的提供者。

### 連線冷卻（Connection Cooldown）

**範圍**：單一提供者連線／帳號／金鑰。

**目的**：暫時跳過一個異常的金鑰／帳號，同時允許同一提供者的其他連線繼續服務請求。

**實作**：

- 寫入／更新路徑：`src/sse/services/auth.ts::markAccountUnavailable()`
- 帳號選擇／過濾：`src/sse/services/auth.ts::getProviderCredentials...`
- 冷卻時間計算：`open-sse/services/accountFallback.ts::checkFallbackError()`
- 設定：`src/lib/resilience/settings.ts`

提供者連線上的重要欄位：

```ts
rateLimitedUntil;
testStatus: "unavailable";
lastError;
lastErrorType;
errorCode;
backoffLevel;
```

在帳號選擇期間，當以下條件成立時，連線會被跳過：

```ts
new Date(rateLimitedUntil).getTime() > Date.now();
```

冷卻同樣是惰性的：當 `rateLimitedUntil` 已成過去時間，連線便再次具備資格。成功使用後，`clearAccountError()` 會清除 `testStatus`、
`rateLimitedUntil`、錯誤欄位以及 `backoffLevel`。

預設連線冷卻行為：

- OAuth 基礎冷卻時間：`5s`。
- API 金鑰基礎冷卻時間：`3s`。
- API 金鑰的 `429` 應優先採用上游的重試提示（`Retry-After`、重置標頭，或可解析的重置文字），若有的話。
- 重複發生的可恢復失敗會使用指數退避：

```ts
baseCooldownMs * 2 ** failureIndex;
```

防驚群（anti-thundering-herd）機制可防止同一連線上的併發失敗重複延長冷卻時間或重複遞增 `backoffLevel`。

終態不是冷卻。`banned`、`expired`（僅在透過 `EXPIRED_RETRY_MAX` 進行 N 次有上限的重試後才會成為終態）以及 `credits_exhausted`
旨在保持不可用狀態，直到憑證／設定變更或維運人員手動重置為止。請勿用暫時性冷卻狀態覆寫終態。

### 模型鎖定（Model Lockout）

**範圍**：提供者 + 連線 + 模型。

**目的**：當只有某個模型對該連線不可用或配額受限時，避免停用整條連線。

範例：

- 以模型為單位計算配額的提供者回傳 `429`。
- 本地提供者對某個缺失的模型回傳 `404`。
- 提供者特定的模式／模型權限失敗，例如所選的 Grok 模式。

模型鎖定位於 `open-sse/services/accountFallback.ts`，讓同一連線可繼續服務其他模型。

### 除錯指引

- 若某提供者的所有金鑰都被跳過，請同時檢查提供者熔斷器狀態以及每條連線的 `rateLimitedUntil`／`testStatus`。
- 若某提供者在重置窗口後仍被永久排除，請檢查程式碼是否直接讀取原始的 `state`，而非使用 `getStatus()`／`canExecute()`。
- 若某提供者的一組金鑰失敗但其他金鑰應可運作，請優先使用連線冷卻而非提供者熔斷器。
- 若只有一個模型失敗，請優先使用模型鎖定而非連線冷卻。
- 若某狀態應能自我恢復，它應具備未來的時間戳／重置逾時，以及能刷新過期狀態的讀取路徑。永久狀態需要手動變更憑證或設定。

---

## TLS 指紋識別與隱匿

針對特定提供者的隱匿技術(JA3/JA4、CCH、混淆)另有專文說明 — 請參閱 `docs/security/STEALTH_GUIDE.md`(git;未編譯進 `/docs`)。

---

## 韌性測試(Phase 8 · Block C)

除了韌性邏輯的單元測試之外,另有三項測試會在真實的壓力/故障條件下檢驗執行時期(全部為整合/夜間測試 — 皆不會阻擋 PR):

| 測試        | 說明                                                                                                               | 執行                                 |
| ----------- | ------------------------------------------------------------------------------------------------------------------ | ------------------------------------ |
| Chaos       | 假上游節點注入真實的延遲/重設/逾時/503;驗證斷路器會開啟/恢復,且 `checkFallbackError` 會將 503 分類為可恢復的備援。 | `RUN_CHAOS_INT=1 npm run test:chaos` |
| Heap-growth | 在 `--expose-gc` 下透過 `createSSEStream` 建立約 500 個串流;若堆積(heap)增長超過上限則測試失敗(OOM 防護 #3069)。   | `npm run test:heap`                  |
| k6 soak     | 對 `/api/monitoring/health` 施加持續負載;p95/錯誤率門檻。                                                          | `k6 run tests/load/k6-soak.js`(夜間) |

由 `.github/workflows/nightly-resilience.yml`(cron + dispatch)統籌執行。在預設的
`test:integration` 中,chaos 與 heap 會自行略過(若未設定 `RUN_CHAOS_INT`/`--expose-gc`)。

---

## 另請參閱

- [架構指南](./ARCHITECTURE.md) — 系統架構與內部運作
- [使用者指南](../guides/USER_GUIDE.md) — 提供者、組合、CLI 整合
- [Auto-Combo 引擎](../routing/AUTO-COMBO.md) — 16 因子評分、模式組合包
