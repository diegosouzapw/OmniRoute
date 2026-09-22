# Feature Flags (中文 (繁體))

🌐 **Languages:** 🇺🇸 [English](../../../../reference/FEATURE_FLAGS.md) · 🇪🇹 [am](../../../am/docs/reference/FEATURE_FLAGS.md) · 🇸🇦 [ar](../../../ar/docs/reference/FEATURE_FLAGS.md) · 🇦🇿 [az](../../../az/docs/reference/FEATURE_FLAGS.md) · 🇧🇬 [bg](../../../bg/docs/reference/FEATURE_FLAGS.md) · 🇧🇩 [bn](../../../bn/docs/reference/FEATURE_FLAGS.md) · 🇧🇦 [bs](../../../bs/docs/reference/FEATURE_FLAGS.md) · 🇨🇿 [cs](../../../cs/docs/reference/FEATURE_FLAGS.md) · 🇩🇰 [da](../../../da/docs/reference/FEATURE_FLAGS.md) · 🇩🇪 [de](../../../de/docs/reference/FEATURE_FLAGS.md) · 🇬🇷 [el](../../../el/docs/reference/FEATURE_FLAGS.md) · 🇪🇸 [es](../../../es/docs/reference/FEATURE_FLAGS.md) · 🇪🇪 [et](../../../et/docs/reference/FEATURE_FLAGS.md) · 🇮🇷 [fa](../../../fa/docs/reference/FEATURE_FLAGS.md) · 🇫🇮 [fi](../../../fi/docs/reference/FEATURE_FLAGS.md) · 🇫🇷 [fr](../../../fr/docs/reference/FEATURE_FLAGS.md) · 🇮🇪 [ga](../../../ga/docs/reference/FEATURE_FLAGS.md) · 🇮🇳 [gu](../../../gu/docs/reference/FEATURE_FLAGS.md) · 🇳🇬 [ha](../../../ha/docs/reference/FEATURE_FLAGS.md) · 🇮🇱 [he](../../../he/docs/reference/FEATURE_FLAGS.md) · 🇮🇳 [hi](../../../hi/docs/reference/FEATURE_FLAGS.md) · 🇭🇷 [hr](../../../hr/docs/reference/FEATURE_FLAGS.md) · 🇭🇺 [hu](../../../hu/docs/reference/FEATURE_FLAGS.md) · 🇦🇲 [hy](../../../hy/docs/reference/FEATURE_FLAGS.md) · 🇮🇩 [id](../../../id/docs/reference/FEATURE_FLAGS.md) · 🇳🇬 [ig](../../../ig/docs/reference/FEATURE_FLAGS.md) · 🇮🇹 [it](../../../it/docs/reference/FEATURE_FLAGS.md) · 🇯🇵 [ja](../../../ja/docs/reference/FEATURE_FLAGS.md) · 🇬🇪 [ka](../../../ka/docs/reference/FEATURE_FLAGS.md) · 🇰🇭 [km](../../../km/docs/reference/FEATURE_FLAGS.md) · 🇮🇳 [kn](../../../kn/docs/reference/FEATURE_FLAGS.md) · 🇰🇷 [ko](../../../ko/docs/reference/FEATURE_FLAGS.md) · 🇱🇹 [lt](../../../lt/docs/reference/FEATURE_FLAGS.md) · 🇱🇻 [lv](../../../lv/docs/reference/FEATURE_FLAGS.md) · 🇮🇳 [ml](../../../ml/docs/reference/FEATURE_FLAGS.md) · 🇮🇳 [mr](../../../mr/docs/reference/FEATURE_FLAGS.md) · 🇲🇾 [ms](../../../ms/docs/reference/FEATURE_FLAGS.md) · 🇲🇹 [mt](../../../mt/docs/reference/FEATURE_FLAGS.md) · 🇲🇲 [my](../../../my/docs/reference/FEATURE_FLAGS.md) · 🇳🇵 [ne](../../../ne/docs/reference/FEATURE_FLAGS.md) · 🇳🇱 [nl](../../../nl/docs/reference/FEATURE_FLAGS.md) · 🇳🇴 [no](../../../no/docs/reference/FEATURE_FLAGS.md) · 🇮🇳 [or](../../../or/docs/reference/FEATURE_FLAGS.md) · 🇮🇳 [pa](../../../pa/docs/reference/FEATURE_FLAGS.md) · 🇵🇭 [phi](../../../phi/docs/reference/FEATURE_FLAGS.md) · 🇵🇱 [pl](../../../pl/docs/reference/FEATURE_FLAGS.md) · 🇵🇹 [pt](../../../pt/docs/reference/FEATURE_FLAGS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/reference/FEATURE_FLAGS.md) · 🇷🇴 [ro](../../../ro/docs/reference/FEATURE_FLAGS.md) · 🇷🇺 [ru](../../../ru/docs/reference/FEATURE_FLAGS.md) · 🇱🇰 [si](../../../si/docs/reference/FEATURE_FLAGS.md) · 🇸🇰 [sk](../../../sk/docs/reference/FEATURE_FLAGS.md) · 🇸🇮 [sl](../../../sl/docs/reference/FEATURE_FLAGS.md) · 🇷🇸 [sr](../../../sr/docs/reference/FEATURE_FLAGS.md) · 🇸🇪 [sv](../../../sv/docs/reference/FEATURE_FLAGS.md) · 🇰🇪 [sw](../../../sw/docs/reference/FEATURE_FLAGS.md) · 🇮🇳 [ta](../../../ta/docs/reference/FEATURE_FLAGS.md) · 🇮🇳 [te](../../../te/docs/reference/FEATURE_FLAGS.md) · 🇹🇭 [th](../../../th/docs/reference/FEATURE_FLAGS.md) · 🇹🇷 [tr](../../../tr/docs/reference/FEATURE_FLAGS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/reference/FEATURE_FLAGS.md) · 🇵🇰 [ur](../../../ur/docs/reference/FEATURE_FLAGS.md) · 🇺🇿 [uz](../../../uz/docs/reference/FEATURE_FLAGS.md) · 🇻🇳 [vi](../../../vi/docs/reference/FEATURE_FLAGS.md) · 🇳🇬 [yo](../../../yo/docs/reference/FEATURE_FLAGS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/reference/FEATURE_FLAGS.md)

---

> 無需重新部署即可變更 OmniRoute 行為的執行階段切換開關。
> 此處列出的每個旗標皆定義於
> [`src/shared/constants/featureFlagDefinitions.ts`](../../src/shared/constants/featureFlagDefinitions.ts)
> — 這是唯一的真實來源。儀表板與 REST API 皆讀取該檔案，
> 因此下表依其內容以 1:1 的方式產生。

---

## 什麼是功能旗標

功能旗標是具名的切換開關（布林值或列舉值），其值可在執行階段變更並
持久化至資料庫，無需重新部署程序。每個旗標皆由 `FeatureFlagDefinition`
描述，包含 `key`、`label`、`description`、`category`、`defaultValue`、
`type`，以及 `requiresRestart` 提示。

### 解析順序

旗標的**有效值**由
[`resolveFeatureFlag()`](../../src/shared/utils/featureFlags.ts) 依照以下
優先順序解析（順位最高者優先）：

1. **資料庫覆寫值** — 儲存於 `key_value` 資料表之
   `feature_flags` 命名空間下的值（透過儀表板或 REST API 設定）。
2. **環境變數** — `process.env[<KEY>]`，前提是已設定且非空值。
3. **定義預設值** — 來自 `featureFlagDefinitions.ts` 的 `defaultValue`。

當布林旗標的有效值為 `"true"`、`"1"` 或 `"yes"` 時，會被視為**已啟用**
（請參閱 `isFeatureFlagEnabled()`）。

> [!NOTE]
> 多數旗標也有一個記載於 [`ENVIRONMENT.md`](./ENVIRONMENT.md) 且**名稱相同**
> 的對應環境變數。旗標的資料庫覆寫值優先於該環境變數。具有
> `requiresRestart: true` 的旗標會立即持久化，但僅會在程序啟動時重新讀取
> — 切換此類旗標會在儀表板中顯示**「重新啟動伺服器」**橫幅。

---

## 旗標目錄

共分為 6 個類別、75 個旗標。**預設值**是定義中的預設值，即在沒有資料庫覆寫值或環境變數時所使用的值。

### 安全性 (10)

| 鍵                                      | 類型   | 預設值   | 說明                                                                                                                                                                                          |
| --------------------------------------- | ------ | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `REQUIRE_API_KEY`                       | 布林值 | `false`  | 要求所有傳入的請求都必須提供 API 金鑰。                                                                                                                                                       |
| `INPUT_SANITIZER_ENABLED`               | 布林值 | `true`   | 為所有請求啟用輸入清理。                                                                                                                                                                      |
| `INJECTION_GUARD_MODE`                  | 列舉   | `off`    | 提示詞注入防護模式。值：`off`、`warn`、`block`、`redact`。                                                                                                                                    |
| `PII_REDACTION_ENABLED`                 | 布林值 | `false`  | 從請求中遮蔽個人識別資訊（獨立於 `INPUT_SANITIZER_MODE`）。                                                                                                                                   |
| `PII_RESPONSE_SANITIZATION`             | 布林值 | `false`  | 清理提供者回應中的個人識別資訊。                                                                                                                                                              |
| `PII_RESPONSE_SANITIZATION_MODE`        | 列舉   | `redact` | 個人識別資訊回應清理模式。值：`redact`、`warn`、`block`、`off`。                                                                                                                              |
| `OUTBOUND_SSRF_GUARD_ENABLED`           | 布林值 | `true`   | 封鎖傳送至私人／內部 IP 範圍的出站請求。                                                                                                                                                      |
| `ALLOW_API_KEY_REVEAL`                  | 布林值 | `false`  | 允許已驗證身分的儀表板使用者顯示已儲存的 API 金鑰，而非僅查看遮罩後的值。                                                                                                                     |
| `AUTH_LOG_INCLUDE_ACCOUNT_ID`           | 布林值 | `false`  | 在 AUTH 日誌行中包含帳戶前綴（例如「正在使用 <provider> 帳戶：abc12345...」）。預設停用，因此帳戶識別碼會在共用／多租戶程序日誌中被遮蔽。此設定獨立於偵錯模式；切換偵錯模式不會顯示該識別碼。 |
| `OMNIROUTE_OIDC_DISABLE_PASSWORD_LOGIN` | 布林值 | `false`  | 啟用 OIDC 時停用密碼登入，使使用者只能透過 OIDC 單一登入進行身分驗證。停用時（預設），密碼登入與 OIDC 皆可使用。                                                                              |

### 網路 (17)

| 鍵                                              | 類型    | 預設值  | 重新啟動 | 說明                                                                                                                                                                                                                                                                                                                        |
| ----------------------------------------------- | ------- | ------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ENABLE_TLS_FINGERPRINT`                        | boolean | `false` | ✓        | 啟用 TLS 指紋隱匿模式。                                                                                                                                                                                                                                                                                                     |
| `AUDIO_REMOTE_PROVIDER_NODES`                   | boolean | `false` |          | 允許 /v1/audio/* 路由使用託管於 localhost 以外的 OpenAI 相容提供者節點。預設為停用——將音訊路由至遠端主機會變更出口身分，因此必須由操作人員明確決定。迴路節點一律允許且不受影響。                                                                                                                                            |
| `RERANK_REMOTE_PROVIDER_NODES`                  | boolean | `false` |          | 允許 POST /v1/rerank（以及記憶體引擎的迴路重新排序步驟）使用託管於 localhost 以外的 OpenAI 相容提供者節點。預設為停用——路由至遠端主機會變更出口身分，因此必須由操作人員明確決定。迴路節點一律允許；遠端節點還必須通過提供者的外連 URL 原則。                                                                                |
| `PROXY_AUTO_SELECT_ENABLED`                     | boolean | `false` |          | 當連線未指派任何代理時，自動從登錄檔選取第一個可用的代理。預設為停用（否則登錄檔中的任何代理都會成為全域備援——#3332）。                                                                                                                                                                                                     |
| `OMNIROUTE_CONTROL_PLANE_PROXY_DIRECT_FALLBACK` | boolean | `false` |          | 當代理可達性預先檢查失敗時，允許 OAuth 與提供者驗證流程略過固定代理並直接連線。預設為停用，因為這可能會變更出口 IP。                                                                                                                                                                                                        |
| `NETWORK_ROTATION_SHARED_EGRESS_GUARD`          | boolean | `true`  |          | 對多帳戶輪替執行器而言，發生網路例外（逾時、連線遭拒或重設）時，若失敗的帳戶沒有專用代理，則套用短暫冷卻，並在該請求的剩餘期間略過其他無代理帳戶，而非逐一重試。預設為啟用（安全：不會變更出口 IP，只會降低共用出口帳戶的延遲／冷卻風險）。停用後，會恢復在第一個無代理的 throw 發生時立即傳播。                            |
| `PROXY_SKIP_RECENTLY_FAILED`                    | boolean | `false` |          | 代理集區與 opencode 的個別帳戶輪替會暫停再次提供剛失敗的代理（TCP 探查遭拒，或透過該代理收到 429），停用期間以個別處理程序計算，且每次重複失敗都會加倍，直至上限。不會寫入代理狀態；當所有候選項都被暫時擱置時，選擇維持不變。預設為停用。                                                                                  |
| `PROXY_POOL_EGRESS_OBSERVATION`                 | boolean | `false` |          | 在儀表板的代理集區下方，顯示過去 24 小時內有多少個觀察到的出口 IP 為其成員提供服務，以及有多少連線使用了這些 IP。唯讀，根據代理記錄計算，絕不用於路由。預設為停用。                                                                                                                                                         |
| `OPENCODE_RESPONSES_STALL_ROTATION`             | boolean | `false` |          | 對於 OpenCode 執行器，監看串流 Responses 回覆的第一個主體位元組（時間窗：`RESPONSES_FIRST_BYTE_TIMEOUT_MS`，預設為 `15000`）。若 2xx Responses 串流在超過該時間窗後仍無資料，則視為停滯：帳戶會進入冷卻，且請求會輪替至下一個帳戶一次；第二次停滯則立即失敗。預設為停用：停滯的串流會維持目前的等待行為，直到串流就緒逾時。 |
| `OPENCODE_USER_BLOCKED_ROTATION`                | boolean | `false` |          | OpenCode 執行器：當 403/451 帶有 `user_blocked` 拒絕（非地理限制，亦非 Cloudflare 指紋拒絕）時，將被拒絕的帳戶暫時停用，並且每個請求最多輪替至下一個帳戶一次；第二次拒絕會原樣傳回，且不會標記為成功。預設關閉：繞過上游的使用者封鎖可能看起來像是在規避限制，並可能使該標記擴散至整個帳戶群組。                            |
| `OPENCODE_TRANSIENT_FAILOVER_BACKOFF`           | boolean | `false` |          | OpenCode 輪替：連續發生兩次上游暫時性失敗（5xx 或空白的 400）後，在切換至下一個帳戶前暫停——從 1.5 秒開始，之後每次失敗時間加倍，每次暫停上限為 6 秒，每個請求的總暫停上限為 10 秒；若用戶端中斷連線則略過暫停。等待前會先釋放失敗的回應本文。預設關閉：容錯移轉會維持立即執行。                                             |
| `OPENCODE_PARK_AND_RESUME`                      | boolean | `false` |          | OpenCode 輪替：在重複出現暫時性 429（或新的資源池壓力標記）後，透過心跳機制暫停請求，接著僅重播一段有上限的流程，依序嘗試最多 3 個帳戶，而非向整個帳戶群組扇出請求。預設關閉：每次遇到 429 都會與先前完全相同地輪替至下一個帳戶。                                                                                           |
| `OPENCODE_RATE_LIMITED_429_EARLY_STOP`          | boolean | `false` |          | OpenCode 輪替：遇到第一個被分類為實際速率限制的 429 時，停止帳戶嘗試波次（可解析的 `Retry-After`，或回應本文中提及速率／用量限制），並將該上游 429 原樣傳回。未分類的 429 會繼續輪替。預設關閉：免費方案依每個出口 IP 限制用量（#9611），因此每個 429 都會觸發輪替，而用盡所有帳戶的波次會傳回最後一個上游 429。            |
| `MITM_DISABLE_TLS_VERIFY`                       | boolean | `false` | ✓        | 停用 MITM Proxy 的 TLS 憑證驗證。**危險。**                                                                                                                                                                                                                                                                                 |
| `OMNIROUTE_ALLOW_PRIVATE_PROVIDER_URLS`         | boolean | `false` |          | 允許指向私人／內部網路的提供者 URL。                                                                                                                                                                                                                                                                                        |
| `OMNIROUTE_ALLOW_LOCAL_PROVIDER_URLS`           | boolean | `true`  |          | 允許在本機／私人位址（127.0.0.1、localhost、LAN）上新增／驗證提供者。預設開啟（本機優先）；若要嚴格限制為僅允許公開位址，請將其停用。雲端中繼資料位址仍會被封鎖。                                                                                                                                                           |
| `ENABLE_CC_COMPATIBLE_PROVIDER`                 | boolean | `false` | ✓        | 啟用 Claude Code 相容提供者模式。                                                                                                                                                                                                                                                                                           |

### 原則 (5)

| 鍵                              | 類型   | 預設值     | 說明                                                                                                                                           |
| ------------------------------- | ------ | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `TOOL_POLICY_MODE`              | 列舉   | `disabled` | 工具使用政策的強制執行模式。可用值：`disabled`、`warn`、`block`。                                                                              |
| `RATE_LIMIT_AUTO_ENABLE`        | 布林值 | `false`    | 根據使用模式自動啟用速率限制。                                                                                                                 |
| `DISABLE_CONTEXT_WINDOW_CHECKS` | 布林值 | `false`    | 對直接的單一模型請求略過 OmniRoute 的本機上下文視窗／輸入權杖上限檢查。上游限制仍然適用。                                                      |
| `CAPABILITY_FILTER_ENABLED`     | 布林值 | `false`    | 當目標模型缺少必要功能（視覺、工具、結構化輸出、上下文視窗）時，在分派前拒絕請求。這可保護略過組合層相容性篩選器、直接傳送至單一提供者的請求。 |
| `RADAR_ENABLED`                 | 布林值 | `false`    | 啟用 OmniRoute Radar 模組（目錄動態消息畫面與同步）。預設為關閉；啟用後只會解鎖使用者介面，資料同步仍需另外選擇啟用。                          |

### 執行階段 (33)

| 鍵                                          | 類型    | 預設值  | 重新啟動 | 說明                                                                                                                                                                                                                                                                                                                                                                                                                          |
| ------------------------------------------- | ------- | ------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `UNIVERSAL_CONTEXT_HANDOFF_ENABLED`         | boolean | `true`  |          | 當組合路由切換模型時，產生並注入對話摘要。停用後會將模型切換視為彼此獨立，並防止針對所有現有及未來的組合發出背景交接請求。                                                                                                                                                                                                                                                                                                    |
| `RESPONSES_PASSTHROUGH_DROP_COMMENTARY`     | boolean | `true`  |          | 在轉送至用戶端之前，從 Responses API 直通串流中移除內部評論階段的輸出項目。停用後可接收原始上游評論。                                                                                                                                                                                                                                                                                                                         |
| `OMNIROUTE_MCP_ENFORCE_SCOPES`              | boolean | `true`  |          | 對 MCP 工具存取強制執行範圍限制。                                                                                                                                                                                                                                                                                                                                                                                             |
| `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS`       | boolean | `false` |          | 壓縮 MCP 工具說明以減少權杖用量。                                                                                                                                                                                                                                                                                                                                                                                             |
| `OMNIROUTE_ENABLE_RUNTIME_BACKGROUND_TASKS` | boolean | `false` |          | 啟用執行階段的背景工作處理。                                                                                                                                                                                                                                                                                                                                                                                                  |
| `OMNIROUTE_DISABLE_BACKGROUND_SERVICES`     | boolean | `false` | ✓        | 停用所有背景服務（配額重新整理、同步等）。                                                                                                                                                                                                                                                                                                                                                                                    |
| `OMNIROUTE_RTK_TRUST_PROJECT_FILTERS`       | boolean | `false` |          | 信任專案層級的 RTK 篩選器，無需驗證。                                                                                                                                                                                                                                                                                                                                                                                         |
| `OMNIROUTE_ENABLE_LIVE_WS`                  | boolean | `true`  | ✓        | 匯入時啟動即時儀表板 WebSocket 伺服器（預設連接埠為 20132）。                                                                                                                                                                                                                                                                                                                                                                 |
| `OMNIROUTE_CODEX_WS_ENABLED`                | boolean | `true`  |          | 允許 Codex 使用 Responses-over-WebSocket 傳輸。停用時，Codex 會改用 HTTP Responses。                                                                                                                                                                                                                                                                                                                                          |
| `OMNIROUTE_CODEX_APP_SERVER_ENABLED`        | boolean | `true`  |          | 允許 Codex 使用本機 app-server WebSocket JSON-RPC 傳輸（codexTransport=app-server）。停用時，選擇使用 app-server 的連線會改用 Codex 的其他傳輸方式。                                                                                                                                                                                                                                                                          |
| `OMNIROUTE_EMERGENCY_FALLBACK`              | boolean | `true`  |          | 將預算耗盡的請求路由至緊急免費備援提供者／模型。（請參閱下方的[緊急預算備援](#emergency-budget-fallback)。）                                                                                                                                                                                                                                                                                                                  |
| `STREAM_RECOVERY_ENABLED`                   | boolean | `false` |          | 啟用透明的提前重試，以處理遭截斷的上游 SSE 串流，且會在任何回應位元組送達用戶端之前進行。                                                                                                                                                                                                                                                                                                                                     |
| `STREAM_RECOVERY_MIDSTREAM_ENABLED`         | boolean | `false` |          | 允許串流復原在位元組已送達用戶端後，重新請求並拼接回應。                                                                                                                                                                                                                                                                                                                                                                      |
| `STREAM_RECOVERY_TOOLCALL_ORDER_FIX`        | boolean | `false` |          | 讓串流中途續接能安全處理工具呼叫：一旦已發出工具呼叫（正在進行中，或已以 finish_reason tool_calls 結束），就絕不續接被截斷的串流；遇到一次空白續接後即關閉，而不是耗盡全部預算。停用：採用發行版行為。                                                                                                                                                                                                                        |
| `STREAM_EARLY_EOF_SIBLING_FAILOVER_ENABLED` | boolean | `false` |          | 當 SSE 串流在發出任何有效框架之前關閉，且同一連線的有限次重試已用盡時，容錯移轉一次至同層連線；若沒有可用的同層連線，則傳回原始的 `STREAM_EARLY_EOF` 502。預設為關閉：提早 EOF 在同一連線重試後仍視為終止狀態。                                                                                                                                                                                                               |
| `MODEL_CATALOG_INCLUDE_NAMES`               | boolean | `true`  |          | 在 `/v1/models` 回應中包含便於顯示的名稱欄位。對於僅預期模型 ID 的用戶端，請停用此功能。                                                                                                                                                                                                                                                                                                                                      |
| `MODELS_CATALOG_PREFIX_MODE`                | enum    | `dual`  |          | 控制 `/v1/models` 中模型 ID 的前綴方式。`dual`（預設）會同時輸出別名與標準提供者 ID 前綴，以維持向後相容性。`alias` 僅輸出簡短別名前綴（例如 ds-web/model，而非 deepseek-web/model）。`canonical` 僅輸出完整的提供者 ID 前綴。可用值：`dual`、`alias`、`canonical`。                                                                                                                                                          |
| `ARENA_ELO_SYNC_ENABLED`                    | boolean | `true`  |          | 啟用定期同步 Arena AI 排行榜的 ELO，以用於模型智慧能力排名。                                                                                                                                                                                                                                                                                                                                                                  |
| `EXPOSE_CC_DISCOVERY_ALIASES`               | boolean | `false` |          | 在 `/v1/models` 上公布 `claude/<provider>/<model>` 映射 ID，使 Claude Code 閘道的模型探索功能能列出非 Claude 模型。這是三級閘門中的全域層級（環境變數的優先權高於儀表板覆寫設定）。請參閱 [Claude Code 設定](../guides/CLAUDE-CODE-CONFIGURATION.md#discovery-aliases--surface-non-claude-models-in-the-model-picker)。                                                                                                       |
| `NO_THINKING_ALIAS_ENABLED`                 | boolean | `true`  |          | `no-think/<provider>/<model>` 閘道別名的主開關。開啟（預設）：`/v1/models` 會為每個符合資格且支援思考功能的 Claude 模型公布一個不思考變體，而請求中傳送的 `no-think/` ID 會解析回實際模型，並抑制推理。關閉：不會公布任何變體，且 `no-think/` ID 會像其他未知模型 ID 一樣處理。開啟此功能時，每個模型的 `ModelSpec.noThinkingAlias` 選擇啟用／停用設定仍然適用。                                                              |
| `OMNIROUTE_DISABLE_THINKING_LEVEL_VARIANTS` | boolean | `false` |          | 停用在 `/v1/models` 目錄中產生思考層級變體（例如 -low、-medium、-high）。                                                                                                                                                                                                                                                                                                                                                     |
| `OMNIROUTE_CHAT_VIRTUAL_LANES`              | boolean | `false` | ✓        | 啟用依租戶區分的自適應虛擬准入通道，以進行提供者分派 (#9654)：單一租戶的突發流量不再導致其他租戶收到 503。`OMNIROUTE_CHAT_VIRTUAL_LANES` 環境變數的優先權高於此儀表板覆寫設定；變更會在伺服器重新啟動後生效。                                                                                                                                                                                                                 |
| `EXPOSE_FUNCTIONAL_GATEWAY_MIRRORS`         | boolean | `false` |          | 對於標準擁有者沒有有效憑證，但由具有有效憑證的直通閘道進行路由的模型，在 /v1/models 上公布 <gateway-alias>/<model> 鏡像 ID。警告：若在全域啟用，會為所有用戶端新增目錄項目。                                                                                                                                                                                                                                                  |
| `NEWAPI_AGGREGATOR_BALANCE`                 | boolean | `false` |          | 為 New-API / One-API / Sub2API 聚合器相容節點啟用餘額偵測。啟用後，已設定聚合器旗標的相容節點會在儀表板和配額預檢路由中回報其餘額。                                                                                                                                                                                                                                                                                           |
| `SERVER_OWNED_TOOL_LOOP_ENABLED`            | boolean | `false` |          | 持續執行伺服器擁有的非串流工具呼叫，直到模型傳回用戶端可用的回應。                                                                                                                                                                                                                                                                                                                                                            |
| `SEARCH_STATS_HIDE_DELETED_CONNECTIONS`     | boolean | `false` |          | 搜尋統計資料和最近搜尋只會計入仍有即時連線的提供者（例如 duckduckgo-free 等無金鑰提供者一律計入）。停用時，會保留每筆具有提供者 ID 的搜尋記錄。                                                                                                                                                                                                                                                                               |
| `FREE_BADGE_REQUIRES_PROVIDER_FREE_TIER`    | boolean | `false` |          | 儀表板提供者頁面：僅根據提供者明確支援的訊號顯示「免費」徽章——對於沒有文件化免費方案的已註冊提供者，不採用顯示名稱推斷、非布林值免費欄位和 :free 後綴。停用時，會沿用原有的徽章規則。                                                                                                                                                                                                                                         |
| `RETRY_AFTER_PROVENANCE_ENABLED`            | boolean | `false` |          | 對於聚合後的 429/503 不可用回應，若無法得知具體的未來重試時間，則省略 `Retry-After`（而非使用人為設定的 1 秒），新增 `error.retry_after_provenance`（`signal` \| `none`），並讓組合排空路徑能從 JSON 和純文字上游本文中讀取以文字描述的重試提示。此欄位只會出現在由 `unavailableResponse()` 建立的回應中；其他 429/503 本文維持不變。                                                                                         |
| `PROTECTED_PRIORITY_INFRA_502_ENABLED`      | boolean | `false` |          | 當標記為僅在配額耗盡時才容錯移轉的 `priority` 組合目標，因可證明並非配額所致的原因（提供者斷路器開啟、預測延遲略過）而停止組合時，回傳 502，而非看似配額問題的 503。因鎖定、冷卻、不可用、耗盡和並行上限而停止時，仍維持回傳 503。                                                                                                                                                                                            |
| `MISTRAL_AMBIGUOUS_401_SOFT_LOCKOUT`        | boolean | `false` |          | 單純的 Mistral 401（`{"detail":"Unauthorized"}`，沒有明確的驗證訊號）對於已撤銷金鑰和配額耗盡而言完全相同。啟用時，系統會讓連線進入冷卻，而非將其停放為 `expired`；每個連線每小時最多 3 次，下一次則會將其停放，因此已撤銷的金鑰最終仍會進入停放狀態。預設為停用：每次單純的 Mistral 401 都會像以往一樣停放該連線。                                                                                                           |
| `XAI_OAUTH_LIVE_MODEL_DISCOVERY`            | 布林值  | `false` |          | 使用 OAuth Bearer 權杖從 `https://api.x.ai/v1/models` 擷取 `xai-oauth` 連線的即時 xAI 模型目錄，而非使用固定的靜態種子。預設為關閉：`xai-oauth` 會繼續原封不動地提供靜態種子。若發生任何解析錯誤，探索功能會回退至種子（尚未驗證 x.ai 是否在此端點接受 OAuth Bearer 權杖）。                                                                                                                                                  |
| `BATCH_AND_FILE_AUTO_CLEANUP_ENABLED`       | 布林值  | `false` |          | 允許自動清理程序刪除早於 `OMNIROUTE_BATCH_RETENTION_DAYS` 的終止狀態（已完成／失敗／已取消／已過期）Batch API 工作及其逐行檢查點，並清除已超過其自身 `expires_at` 的上傳檔案之 BLOB 內容。預設為關閉：在操作人員選擇啟用前，每個現有安裝都會完全如以往般保留這些資料。無論是否啟用，操作人員觸發的 `DELETE /api/v1/batches/delete-completed` 路由皆不受影響——這是另一項獨立且無條件的公開 API 契約。                          |
| `ANTIGRAVITY_ACCOUNT_LEASE_ENABLED`         | 布林值  | `false` |          | 在選定 Antigravity 帳戶的請求之串流生命週期內保留該帳戶，讓並行重試或認證資料移交無法重新選取已配置給處理中串流的帳戶。保留範圍限定於（連線、可呼叫的上游模型），因此一個帳戶仍可同時服務兩個不同模型。當該模型的所有合格帳戶都已被租用時，請求會傳回結構化的 503 `antigravity_pool_busy`，並附帶有上限的 `Retry-After`，而不會繼續將負載堆疊到忙碌的帳戶上。預設為關閉：帳戶選擇方式維持與以往完全相同，且不會進行任何保留。 |

### CLI（5）

| 鍵                                    | 類型   | 預設值  | 重新啟動 | 說明                                                                                                                                                        |
| ------------------------------------- | ------ | ------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `CLI_COMPAT_ALL`                      | 布林值 | `false` | ✓        | 為所有 CLI 用戶端啟用相容模式。                                                                                                                             |
| `MODEL_ALIAS_COMPAT_ENABLED`          | 布林值 | `false` |          | 啟用模型別名相容層。                                                                                                                                        |
| `PRICING_SYNC_ENABLED`                | 布林值 | `false` |          | 啟用定價資料自動同步（亦需設定 `PRICING_SYNC_ENABLED` 環境變數）。                                                                                          |
| `OMNIROUTE_AUTO_SYNC_CODEX_PROFILES`  | 布林值 | `false` |          | 提供者模型同步後，自動根據即時目錄（重新）寫入 ~/.codex/*.config.toml 設定檔。絕不變更作用中／預設的 Codex 設定。預設為關閉。                               |
| `OMNIROUTE_AUTO_SYNC_CLAUDE_PROFILES` | 布林值 | `false` |          | 提供者模型同步後，自動根據即時目錄（重新）寫入 ~/.claude/profiles/<name>/settings.json Claude Code 設定檔。絕不變更作用中／預設的 Claude 設定。預設為關閉。 |

### 健康狀態（5）

| 鍵值                                      | 類型   | 預設值  | 說明                                                                                                                                                                                                  |
| ----------------------------------------- | ------ | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_DISABLE_LOCAL_HEALTHCHECK`     | 布林值 | `false` | 停用本機執行個體的健康檢查端點。                                                                                                                                                                      |
| `OMNIROUTE_DISABLE_TOKEN_HEALTHCHECK`     | 布林值 | `false` | 停用權杖驗證健康檢查。                                                                                                                                                                                |
| `SKILLS_SANDBOX_NETWORK_ENABLED`          | 布林值 | `false` | 啟用技能沙箱環境中的網路存取。                                                                                                                                                                        |
| `PROXY_HEALTH_BLOCKED_RESETS_STREAK`      | 布林值 | `false` | 在代理健康狀態掃描中，若探測遭目標拒絕（401/403/429），則重設代理的連續失敗次數。預設為關閉：拒絕會維持中性狀態（#10654）。無論如何，5xx 都會維持無法判定的狀態；拒絕絕不會移除、停用或重新啟用代理。 |
| `DB_HEALTHCHECK_STARTUP_DEFERRED_ENABLED` | 布林值 | `false` | 在伺服器開始接受請求後（透過 `setImmediate`）執行啟動時的資料庫完整性／健康檢查，而非阻塞啟動直到檢查完成（#13717）。預設為關閉：啟動會與此 PR 之前完全相同地受到阻塞。                               |

> [!NOTE]
> `INPUT_SANITIZER_BLOCK_THRESHOLD` 及其舊版別名
> `INJECTION_GUARD_BLOCK_THRESHOLD` 會調整 `INJECTION_GUARD_MODE` 的
> `block` 模式，但它們只是由
> [`src/shared/utils/injectionSeverity.ts`](../../src/shared/utils/injectionSeverity.ts)
> 讀取的一般環境變數，而非功能旗標：它們沒有資料庫覆寫設定，也沒有儀表板切換開關。請參閱
> [`ENVIRONMENT.md`](./ENVIRONMENT.md#4-security--authentication)。

> [!NOTE]
> `Restart` 欄會標示設有 `requiresRestart: true` 的旗標——其值會立即
> 持久化，但僅會在程序重新載入後生效。列舉旗標會拒絕其允許集合以外的
> 任何值（伺服器端會在 `setFeatureFlagOverride()` 和 REST `PUT`
> 處理常式中進行驗證）。

---

## 切換旗標

### 儀表板

前往 **儀表板 → 設定 → 功能旗標**
(`/dashboard/settings/feature-flags`)。此網格
(`src/app/(dashboard)/dashboard/settings/components/FeatureFlagsGrid.tsx`)
支援：

- 依鍵或描述進行**搜尋**，以及依類別進行**篩選**（另有一個合成的
  **需要重新啟動**檢視）。
- 布林旗標使用**切換開關**，列舉旗標則使用**下拉式選單**
  (`src/app/(dashboard)/dashboard/settings/components/FeatureFlagCard.tsx`)。
- 每個旗標都有一個**來源徽章** — `DB`、`ENV` 或 `DEF` — 顯示有效值的
  來源。
- **重設**按鈕（僅針對來源為 `DB` 的旗標顯示），用於移除覆寫值；
  底部另有一個**重設所有覆寫值**按鈕。
- 當 `requiresRestart` 旗標變更時，會顯示**重新啟動伺服器**橫幅。

### REST API

所有操作皆透過單一路由執行：
[`src/app/api/settings/feature-flags/route.ts`](../../src/app/api/settings/feature-flags/route.ts)。
每種方法都需要已驗證的儀表板工作階段（否則傳回 `401`）。

#### `GET /api/settings/feature-flags`

傳回所有旗標及其有效值、來源和摘要。

```jsonc
{
  "flags": [
    {
      "key": "REQUIRE_API_KEY",
      "label": "要求 API 金鑰",
      "description": "要求所有傳入請求皆提供 API 金鑰",
      "category": "security",
      "type": "boolean",
      "enumValues": null,
      "defaultValue": "false",
      "effectiveValue": "false",
      "source": "default", // "db" | "env" | "default"
      "requiresRestart": false,
      "warningLevel": "caution",
    },
    // ... 全部 75 個旗標
  ],
  "summary": {
    "total": 56,
    "active": 0,
    "inactive": 0,
    "overriddenByDb": 0,
    "overriddenByEnv": 0,
  },
}
```

#### `PUT /api/settings/feature-flags`

設定或移除單一覆寫值。請求本文：`{ key: string; value?: string }`。
省略 `value` 會移除覆寫值（還原為環境變數／預設值）。

```bash
# 設定 DB 覆寫值
curl -X PUT http://localhost:20128/api/settings/feature-flags \
  -H "Content-Type: application/json" \
  -d '{"key":"REQUIRE_API_KEY","value":"true"}'

# 移除覆寫值（不含 "value"）
curl -X PUT http://localhost:20128/api/settings/feature-flags \
  -H "Content-Type: application/json" \
  -d '{"key":"REQUIRE_API_KEY"}'
```

回應會傳回新的 `effectiveValue`／`source`、`previousValue`／
`previousSource`，以及 `requiresRestart`。未知的鍵和超出範圍的列舉
值會遭到拒絕，並傳回 `400`。

#### `DELETE /api/settings/feature-flags`

一次清除**所有** DB 覆寫值，將每個旗標還原為其環境變數／預設
值。傳回 `{ cleared: <count>, message: "..." }`。

> [!NOTE]
> 具有 `requiresRestart: true` 的旗標只會在程序重新載入後生效。
> 儀表板的重新啟動流程會呼叫 `POST /api/restart`，接著輪詢
> `GET /api/health/ping`，直到伺服器恢復運作。

---

## 緊急預算備援

`OMNIROUTE_EMERGENCY_FALLBACK`（類別為 `runtime`，預設值為 `true`）控制
[`open-sse/services/emergencyFallback.ts`](../../open-sse/services/emergencyFallback.ts)
中的緊急免費備援路徑。啟用後，預算耗盡的請求會被路由至免費的備援
提供者／模型，而非直接失敗。若要停用此行為，並讓預算耗盡的請求失敗，
可透過儀表板切換開關、DB 覆寫值，或 `OMNIROUTE_EMERGENCY_FALLBACK`
環境變數將其設為 `false`（或 `0`）。（已在 PR #3741 / #3752 中顯示為
儀表板切換開關。）

---

## 另請參閱

- [環境變數參考](./ENVIRONMENT.md) — 大多數旗標都有一個同名的環境變數記錄於此（DB 覆寫的優先順序高於該環境變數）。
- [`src/shared/constants/featureFlagDefinitions.ts`](../../src/shared/constants/featureFlagDefinitions.ts)
  — 所有旗標的權威來源。
- [`src/shared/utils/featureFlags.ts`](../../src/shared/utils/featureFlags.ts)
  — 解析邏輯（`resolveFeatureFlag`、`isFeatureFlagEnabled`、
  `resolveAllFeatureFlags`）。
- [`src/lib/db/featureFlags.ts`](../../src/lib/db/featureFlags.ts) — 在 `key_value` 資料表的 `feature_flags` 命名空間中持久儲存 DB 覆寫。
