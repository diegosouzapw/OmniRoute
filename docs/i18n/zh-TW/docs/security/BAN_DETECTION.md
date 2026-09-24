# Account-Ban / Banned-Keyword Detection (中文 (繁體))

🌐 **Languages:** 🇺🇸 [English](../../../../security/BAN_DETECTION.md) · 🇪🇹 [am](../../../am/docs/security/BAN_DETECTION.md) · 🇸🇦 [ar](../../../ar/docs/security/BAN_DETECTION.md) · 🇦🇿 [az](../../../az/docs/security/BAN_DETECTION.md) · 🇧🇬 [bg](../../../bg/docs/security/BAN_DETECTION.md) · 🇧🇩 [bn](../../../bn/docs/security/BAN_DETECTION.md) · 🇧🇦 [bs](../../../bs/docs/security/BAN_DETECTION.md) · 🇨🇿 [cs](../../../cs/docs/security/BAN_DETECTION.md) · 🇩🇰 [da](../../../da/docs/security/BAN_DETECTION.md) · 🇩🇪 [de](../../../de/docs/security/BAN_DETECTION.md) · 🇬🇷 [el](../../../el/docs/security/BAN_DETECTION.md) · 🇪🇸 [es](../../../es/docs/security/BAN_DETECTION.md) · 🇪🇪 [et](../../../et/docs/security/BAN_DETECTION.md) · 🇮🇷 [fa](../../../fa/docs/security/BAN_DETECTION.md) · 🇫🇮 [fi](../../../fi/docs/security/BAN_DETECTION.md) · 🇫🇷 [fr](../../../fr/docs/security/BAN_DETECTION.md) · 🇮🇪 [ga](../../../ga/docs/security/BAN_DETECTION.md) · 🇮🇳 [gu](../../../gu/docs/security/BAN_DETECTION.md) · 🇳🇬 [ha](../../../ha/docs/security/BAN_DETECTION.md) · 🇮🇱 [he](../../../he/docs/security/BAN_DETECTION.md) · 🇮🇳 [hi](../../../hi/docs/security/BAN_DETECTION.md) · 🇭🇷 [hr](../../../hr/docs/security/BAN_DETECTION.md) · 🇭🇺 [hu](../../../hu/docs/security/BAN_DETECTION.md) · 🇦🇲 [hy](../../../hy/docs/security/BAN_DETECTION.md) · 🇮🇩 [id](../../../id/docs/security/BAN_DETECTION.md) · 🇳🇬 [ig](../../../ig/docs/security/BAN_DETECTION.md) · 🇮🇹 [it](../../../it/docs/security/BAN_DETECTION.md) · 🇯🇵 [ja](../../../ja/docs/security/BAN_DETECTION.md) · 🇬🇪 [ka](../../../ka/docs/security/BAN_DETECTION.md) · 🇰🇭 [km](../../../km/docs/security/BAN_DETECTION.md) · 🇮🇳 [kn](../../../kn/docs/security/BAN_DETECTION.md) · 🇰🇷 [ko](../../../ko/docs/security/BAN_DETECTION.md) · 🇱🇹 [lt](../../../lt/docs/security/BAN_DETECTION.md) · 🇱🇻 [lv](../../../lv/docs/security/BAN_DETECTION.md) · 🇮🇳 [ml](../../../ml/docs/security/BAN_DETECTION.md) · 🇮🇳 [mr](../../../mr/docs/security/BAN_DETECTION.md) · 🇲🇾 [ms](../../../ms/docs/security/BAN_DETECTION.md) · 🇲🇹 [mt](../../../mt/docs/security/BAN_DETECTION.md) · 🇲🇲 [my](../../../my/docs/security/BAN_DETECTION.md) · 🇳🇵 [ne](../../../ne/docs/security/BAN_DETECTION.md) · 🇳🇱 [nl](../../../nl/docs/security/BAN_DETECTION.md) · 🇳🇴 [no](../../../no/docs/security/BAN_DETECTION.md) · 🇮🇳 [or](../../../or/docs/security/BAN_DETECTION.md) · 🇮🇳 [pa](../../../pa/docs/security/BAN_DETECTION.md) · 🇵🇭 [phi](../../../phi/docs/security/BAN_DETECTION.md) · 🇵🇱 [pl](../../../pl/docs/security/BAN_DETECTION.md) · 🇵🇹 [pt](../../../pt/docs/security/BAN_DETECTION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/BAN_DETECTION.md) · 🇷🇴 [ro](../../../ro/docs/security/BAN_DETECTION.md) · 🇷🇺 [ru](../../../ru/docs/security/BAN_DETECTION.md) · 🇱🇰 [si](../../../si/docs/security/BAN_DETECTION.md) · 🇸🇰 [sk](../../../sk/docs/security/BAN_DETECTION.md) · 🇸🇮 [sl](../../../sl/docs/security/BAN_DETECTION.md) · 🇷🇸 [sr](../../../sr/docs/security/BAN_DETECTION.md) · 🇸🇪 [sv](../../../sv/docs/security/BAN_DETECTION.md) · 🇰🇪 [sw](../../../sw/docs/security/BAN_DETECTION.md) · 🇮🇳 [ta](../../../ta/docs/security/BAN_DETECTION.md) · 🇮🇳 [te](../../../te/docs/security/BAN_DETECTION.md) · 🇹🇭 [th](../../../th/docs/security/BAN_DETECTION.md) · 🇹🇷 [tr](../../../tr/docs/security/BAN_DETECTION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/BAN_DETECTION.md) · 🇵🇰 [ur](../../../ur/docs/security/BAN_DETECTION.md) · 🇺🇿 [uz](../../../uz/docs/security/BAN_DETECTION.md) · 🇻🇳 [vi](../../../vi/docs/security/BAN_DETECTION.md) · 🇳🇬 [yo](../../../yo/docs/security/BAN_DETECTION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/BAN_DETECTION.md)

---

OmniRoute 會掃描上游錯誤回應，尋找表示提供者
**帳戶已永久失效**（遭停權／停用／因違反服務條款而遭封鎖）的訊號；符合時，
會將該連線移至**終止 `banned` 狀態**，使其不再被選用於請求。這正是
**安全性 → 封鎖關鍵字**設定卡所設定的內容（「觸發永久帳戶
封鎖偵測的其他關鍵字。內建關鍵字一律適用。」）。

本頁說明內建清單、偵測流程、適用範圍、如何安全地新增
自訂關鍵字，以及如何復原被標記的連線。終止狀態本身是韌性模型的一部分 — 請參閱
[RESILIENCE_GUIDE](../architecture/RESILIENCE_GUIDE.md)（「終止狀態」）。

**真實來源：** `open-sse/services/accountFallback.ts`
（`ACCOUNT_DEACTIVATED_SIGNALS`、`getMergedBannedSignals()`、`isAccountDeactivated()`）。

## 內建關鍵字

無論是否有任何自訂清單，以下 8 個子字串一律適用（不區分大小寫）：

```
account_deactivated
account has been deactivated
account has been disabled
your account has been suspended
this account is deactivated
verify your account to continue                                 (Antigravity / Google Cloud Code)
this service has been disabled in this account for violation    (Antigravity)
this service has been disabled in this account                  (Antigravity)
```

> 隨著提供者變更其封鎖措辭，此清單也會持續演變。具權威性的
> 版本是 `open-sse/services/accountFallback.ts` 中的 `ACCOUNT_DEACTIVATED_SIGNALS`；
> 請將上方區塊視為快照。

同一個檔案中還有兩個相鄰且**獨立**的訊號表，它們_不_屬於
封鎖關鍵字偵測的一部分：

- `CREDITS_EXHAUSTED_SIGNALS` — 帳務／配額已耗盡（`insufficient_quota`、
  `credit_balance_too_low`、`payment required`，……）→ 終止 `credits_exhausted`。
- `OAUTH_INVALID_TOKEN_SIGNALS` — **非終止狀態**；可透過重新整理權杖來復原。

注意：常見的暫時性詞語，例如 **`rate limit`**／`429`，會由
速率限制／連線冷卻路徑處理，**不**屬於封鎖訊號。

## 偵測流程

```
上游錯誤回應
  → 內文轉換為字串並轉為小寫
  → isAccountDeactivated(body): getMergedBannedSignals().some(sig => body.includes(sig))   [子字串比對]
  → 是否符合？
      → 連線 testStatus = "banned"      （永久 — 1 年冷卻期，永不自動復原）
      → 若設定 `autoDisableBannedAccounts` 已開啟，且 `autoDisableBannedScope`
        包含此連線（`all`，或針對 OAuth/cookie/session 的 `subscription`）
        → 同時設定 isActive = false。當範圍為
        `subscription` 時，預付 API 金鑰會維持啟用狀態。
      → 在帳戶選取期間略過該連線（組合 QUOTA_BLOCKING 狀態）
```

- 比對會對回應**內文**進行**不區分大小寫的子字串**搜尋
  （`isAccountDeactivated`、`accountFallback.ts`）。
- 當內文包含封鎖訊號時，無論 **HTTP 狀態碼**為何，都會觸發永久的 `banned`
  終止處理（透過 `markAccountUnavailable` → `checkFallbackError`）。範圍較窄的
  **`deactivated`** 標籤（當連線沒有備用 API 金鑰時為 `isActive=false`）
  是由內嵌的 `chatCore.ts` 路徑在 **HTTP 401 / 403** 時寫入
  （透過 `classifyProviderError` → `ACCOUNT_DEACTIVATED` 分類）。請注意，
  `markAccountUnavailable()` 路徑會針對相同的 `ACCOUNT_DEACTIVATED` 訊號
  （透過 `resolveTerminalConnectionStatus`）寫入_不同的_終止狀態 —
  **`expired`**；因此，相同的封鎖可能會根據處理該回應的路徑而顯示為
  `deactivated` 或 `expired`。（較舊的程式碼註解寫著
  「當 401 內文包含這些字串時」— 這低估了目前的行為。）
- 在所有會篩除終止狀態的位置，`banned` 連線都會被排除於選取範圍之外
  （`isTerminalConnectionStatus`、組合 `QUOTA_BLOCKING_CONNECTION_STATUSES`）。

## 範圍 — 會掃描哪些提供者

**所有提供者。** 此檢查會在通用錯誤處理管線中執行，
所有失敗的上游請求都會流經該管線 — 它**不限於**
OAuth／訂閱抓取器。產生的終止狀態是以**連線**為單位，
而非以提供者為單位。

儘管如此，內建的_字串_主要針對確實存在封禁風險的訂閱／OAuth
提供者（ChatGPT Web Codex、Claude Web、Codex、Muse Spark、
Antigravity）。API 金鑰提供者只有在其錯誤本文確實包含其中一個子字串時，
才會觸發偵測器。

`autoDisableBannedScope`（`all` | `subscription`，預設為 `all`）控制
比對成功時是否也會將 `isActive=false`。`subscription` 指登入型席位
（付費訂閱與免費帳號，包括 Web Cookie 工作階段）。對於預付 API 金鑰，
它仍會記錄 `testStatus=banned`，但會將其保留在路由池中。長期設計是提供
每個提供者與每個帳號的覆寫設定；此全域列舉是第一版實作。

## 自訂封禁關鍵字

在**安全性 → 封禁關鍵字**中新增或移除關鍵字（透過
`PATCH /api/settings` 持久化為全域 `customBannedSignals` 設定）。
這些關鍵字會**新增至**內建清單 — 絕不會取代內建清單 — 並會在儲存時
（以及啟動時）透過 `setCustomBannedSignals()` 熱重新載入。每個關鍵字
上限為 200 個字元；陣列長度沒有限制。

**⚠ 誤判風險 — 請選擇具體片語。** 偵測方式是對整個回應本文進行原始
子字串比對，而且一旦符合即為**永久性**狀態（1 年冷卻期，需手動復原）。
過於寬泛的關鍵字可能封禁完全正常的連線：

- **不佳：** `quota`、`limit`、`error`、`denied` — 會出現在許多暫時性錯誤中。
- **良好：** 完整的封禁句子，例如 `your account has been suspended for`、
  `account permanently banned`、`violation of our terms`。

請優先使用提供者在實際封禁時傳回、最長且無歧義的片語。若不確定，
請先觀察連線的 `lastError`，再加入完全相同的措辭。

## 復原被標記的連線

終止狀態 `banned`／`deactivated` **絕不會自動復原**（它們會被排除在
主動復原週期之外 — 只有 `unavailable` 冷卻會自行復原）。
操作人員必須明確清除這些狀態：

1. **重新測試連線** — 儀表板的**測試**動作
   （`POST /api/providers/{id}/test`）；成功的探測會將 `testStatus`
   重設為 `active`，並清除錯誤欄位。
2. **重新驗證／編輯憑證** — 對於 OAuth 提供者，重新執行登入／
   重新整理流程；提供者建立／匯入路由會設定 `isActive = true`。
3. **重新啟用連線** — 如果自動停用已設定 `isActive = false`
   （範圍為 `all`，或 OAuth／Cookie／工作階段連線的 `subscription`），
   請在修正帳號後將其重新開啟。

沒有獨立的「清除封禁旗標」按鈕 — 復原方式為重新測試、重新驗證或
重新啟用，符合
[RESILIENCE_GUIDE](../architecture/RESILIENCE_GUIDE.md)
中的一般終止狀態規則。

## 探測隔離（模型全部測試）

**源自探測的失敗**（在 `runAsProbe` 內執行的模型全部測試／健康檢查分派）
絕不會將連線從池中移除（#9817）：系統會**加以記錄以供檢視**
（`last_error`、`last_error_type`、`error_code`、`last_error_at`），
但會略過**所有**路由變更 — 冷卻、終止狀態（`banned`／`deactivated`／
`credits_exhausted`）、個別模型鎖定、提供者斷路器、5 分鐘配額快取、
OAuth 權杖重新整理及自動停用。只有實際請求路徑上的失敗才會停用連線。
所記錄的錯誤可讓被標記的帳號顯示在儀表板中，同時仍繼續提供流量服務。

唯一的決策點是 `shouldIsolateProbeFailures()`
（`src/shared/utils/probeOrigin.ts`），所有可能因源自探測的失敗而變更
路由狀態的位置都會查詢它：

- `markAccountUnavailable`（`auth.ts`）— 僅記錄（`lastError` 原始文字、
  `lastErrorType`、`errorCode`、`lastErrorAt`；刻意**不設定**
  `backoffLevel`，因為它會觸發選取時的自動衰減並抹除記錄）
- `maybeAutoDisableBannedAccount` — 不自動停用
- `chatCore` — FORBIDDEN、ACCOUNT_DEACTIVATED、QUOTA_EXHAUSTED（僅記錄，
  不設定終止狀態 `credits_exhausted`）、GEO_BLOCKED（不排除 24 小時）、
  MODEL_NOT_FOUND（不執行 `lockModel`）、Codex 429 帳號輪替容錯移轉
  （不執行 `markCodexScopeRateLimited`、不持久化 `rate_limited_until`、
  不清除工作階段親和性）、`persistCodexQuotaState`（不寫入配額狀態、
  不使快取失效）、`recordKeyHealthStatus`（不影響金鑰健康狀態輪替器）
- OAuth 重新整理 — 執行器基底中的主動重新整理
  （`base.ts` 的 `execute()`，不消耗重新整理權杖輪替）以及
  `chatCore` 中的反應式 401／403 路徑（不以 `expired` 狀態停用）
- `chat.ts` — 提供者斷路器與 5 分鐘配額快取
  （`markAccountExhaustedFrom429`）永不降級

所記錄的錯誤可讓被標記的帳號顯示在儀表板中，同時仍繼續提供流量服務。
請注意：探測記錄會儲存**原始**（未切割）的錯誤文字，不同於實際路徑的
`slice(0,100)` 截斷處理。

將全部測試用作維護工具的操作人員，可透過下列任一方式恢復歷史行為
（將探測視為實際生成）：

- `probeCanDisable` 設定（使用 `POST /api/settings` 並傳入
  `{"probeCanDisable": true}`，或直接編輯 `key_value` DB），或
- 功能旗標 **`PROBE_CAN_DISABLE=true`**（環境變數或 DB 覆寫；
  優先於該設定）。

失效安全機制：若旗標或設定查詢擲出例外，隔離會維持開啟。

## 原始檔案

| 關注事項               | 檔案                                                                                                          |
| ---------------------- | ------------------------------------------------------------------------------------------------------------- |
| 訊號表 + 比對          | `open-sse/services/accountFallback.ts`                                                                        |
| 終止處理 / 持久化      | `src/sse/services/auth.ts` (`markAccountUnavailable`, `resolveTerminalConnectionStatus`, `clearAccountError`) |
| 自動停用範圍           | `src/shared/utils/autoDisableBanned.ts`, `src/sse/services/autoDisableBannedAccount.ts`                       |
| 內嵌分類               | `open-sse/handlers/chatCore.ts`, `open-sse/services/errorClassifier.ts`                                       |
| 終止狀態復原排除       | `src/lib/quota/connectionRecovery.ts`                                                                         |
| 自訂關鍵字執行階段載入 | `src/lib/config/runtimeSettings.ts` (`setCustomBannedSignals`)                                                |
| 設定 UI                | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`                                           |
