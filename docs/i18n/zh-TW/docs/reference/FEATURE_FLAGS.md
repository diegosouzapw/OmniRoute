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

6 個類別共 77 個旗標。**預設值**是定義的預設值 — 當資料庫覆寫和環境變數皆不存在時所使用的值。

### 安全性 (10)

| Key                                     | Type    | Default  | Description                                                                                                                                                                        |
| --------------------------------------- | ------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `REQUIRE_API_KEY`                       | boolean | `false`  | 要求所有傳入請求都必須有 API 金鑰。                                                                                                                                                |
| `INPUT_SANITIZER_ENABLED`               | boolean | `true`   | 為所有請求啟用輸入淨化。                                                                                                                                                           |
| `INJECTION_GUARD_MODE`                  | enum    | `off`    | 提示注入防護模式。值：`off`、`warn`、`block`、`redact`。                                                                                                                           |
| `PII_REDACTION_ENABLED`                 | boolean | `false`  | 從請求中編輯個人身份資訊 (PII)（獨立於 `INPUT_SANITIZER_MODE`）。                                                                                                                  |
| `PII_RESPONSE_SANITIZATION`             | boolean | `false`  | 從提供者回應中淨化個人身份資訊 (PII)。                                                                                                                                             |
| `PII_RESPONSE_SANITIZATION_MODE`        | enum    | `redact` | 個人身份資訊 (PII) 回應淨化模式。值：`redact`、`warn`、`block`、`off`。                                                                                                            |
| `OUTBOUND_SSRF_GUARD_ENABLED`           | boolean | `true`   | 阻止對私人/內部 IP 範圍的對外請求。                                                                                                                                                |
| `ALLOW_API_KEY_REVEAL`                  | boolean | `false`  | 允許已驗證的儀表板使用者顯示儲存的 API 金鑰，而不僅僅是看到遮罩值。                                                                                                                |
| `AUTH_LOG_INCLUDE_ACCOUNT_ID`           | boolean | `false`  | 在 AUTH 記錄行中包含帳戶前綴（例如「Using <provider> account: abc12345...」）。預設為禁用，以便從共享/多租戶處理記錄中編輯帳戶識別碼。獨立於偵錯模式；切換偵錯模式不會顯示此資訊。 |
| `OMNIROUTE_OIDC_DISABLE_PASSWORD_LOGIN` | boolean | `false`  | 當 OIDC 啟用時，禁用密碼登入，以便使用者只能透過 OIDC 單一登入進行驗證。當禁用時（預設），密碼登入和 OIDC 都可用。                                                                 |

### 網路 (19)

| Key                                             | Type    | Default | Restart | Description                                                                                                                                                                                                                                                                                                       |
| :---------------------------------------------- | :------ | :------ | :------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ENABLE_TLS_FINGERPRINT`                        | boolean | `false` | ✓       | 啟用 TLS 指紋隱身模式。                                                                                                                                                                                                                                                                                           |
| `AUDIO_REMOTE_PROVIDER_NODES`                   | boolean | `false` |         | 允許 `/v1/audio/*` 路由使用託管在 localhost 之外的 OpenAI 相容提供者節點。預設為關閉 — 將音訊路由到遠端主機將改變出口身份，必須是明確的操作員決定。迴路節點始終允許且不受影響。                                                                                                                                   |
| `RERANK_REMOTE_PROVIDER_NODES`                  | boolean | `false` |         | 允許 POST `/v1/rerank`（以及記憶體引擎的迴路重排步驟）使用託管在 localhost 之外的 OpenAI 相容提供者節點。預設為關閉 — 路由到遠端主機將改變出口身份，必須是明確的操作員決定。迴路節點始終允許；遠端節點也必須通過提供者出站 URL 策略。                                                                             |
| `PROXY_AUTO_SELECT_ENABLED`                     | boolean | `false` |         | 當沒有代理分配給連線時，自動從註冊表中選擇第一個可用的代理。預設為關閉（否則任何註冊表代理都將成為全域備用 — #3332）。                                                                                                                                                                                            |
| `OMNIROUTE_CONTROL_PLANE_PROXY_DIRECT_FALLBACK` | boolean | `false` |         | 當代理可達性預檢查失敗時，允許 OAuth 和提供者驗證流程繞過固定的代理並直接連線。預設為關閉，因為這可能會改變出口 IP。                                                                                                                                                                                              |
| `NETWORK_ROTATION_SHARED_EGRESS_GUARD`          | boolean | `true`  |         | 對於多帳戶輪換執行器，在發生網路異常（逾時、連線被拒絕/重置）時，如果失敗的帳戶沒有專用代理，則應用短暫的冷卻時間並跳過請求中其餘沒有代理的帳戶，而不是重試每一個。預設為開啟（安全：沒有出口 IP 變更，只減少共享出口帳戶的延遲/冷卻風險）。禁用此選項可在第一次無代理拋出時恢復立即傳播。                        |
| `ROTATION_ATTRIBUTION`                          | boolean | `false` |         | Opencode 輪換記錄哪個帳戶提供了服務或被跳過（僅限遮罩 ID，從不記錄完整帳戶 ID），並將代理日誌條目連結到其請求，以便操作員可以區分被跳過的帳戶和未使用的帳戶。預設為關閉。                                                                                                                                         |
| `PROXY_SKIP_RECENTLY_FAILED`                    | boolean | `false` |         | 代理池和 opencode 的每個帳戶輪換會停止重新服務剛失敗的代理（拒絕 TCP 探測，或透過它收到 429 錯誤），持續時間為每個程序週期，每次重複都會加倍，直到達到上限。不寫入代理狀態；每次將候選者擱置時，選擇保持不變。預設為關閉。                                                                                        |
| `PROXY_POOL_EGRESS_OBSERVATION`                 | boolean | `false` |         | 在儀表板的代理池下顯示，在過去 24 小時內有多少觀察到的出口 IP 為其成員提供服務，以及有多少連線使用了它們。唯讀，從代理日誌計算，從不用於路由。預設為關閉。                                                                                                                                                        |
| `OPENCODE_RESPONSES_STALL_ROTATION`             | boolean | `false` |         | 對於 OpenCode 執行器，監控串流 Responses 回覆的第一個主體位元組（視窗：`RESPONSES_FIRST_BYTE_TIMEOUT_MS`，預設 `15000`）。一個在視窗期過後保持靜默的 2xx Responses 串流會被視為停滯：該帳戶會被冷卻，請求會輪換到下一個帳戶一次；第二次停滯會快速失敗。預設為關閉：停滯的串流會保持目前的等待，直到串流就緒逾時。 |
| `OPENCODE_USER_BLOCKED_ROTATION`                | boolean | `false` |         | OpenCode 執行器：當遇到帶有 `user_blocked` 拒絕（非地理位置，非 Cloudflare 指紋拒絕）的 403/451 時，冷卻被拒絕的帳戶，並在每個請求中最多輪換到下一個帳戶一次；第二次拒絕會原樣返回，不帶成功標記。預設為關閉：繞過上游使用者封鎖可能看起來像規避行為，並將標記傳播到整個機群。                                    |
| `OPENCODE_TRANSIENT_FAILOVER_BACKOFF`           | boolean | `false` |         | OpenCode 輪換：在連續兩次暫時性上游失敗（5xx 或空的 400）後，在切換到下一個帳戶之前暫停 — 每次進一步失敗會使暫停時間加倍 1.5 秒，每次暫停上限為 6 秒，每個請求上限為 10 秒，客戶端斷開連接時跳過；失敗的主體會在等待前釋放。預設為關閉：故障轉移保持即時。                                                        |
| `OPENCODE_PARK_AND_RESUME`                      | boolean | `false` |         | OpenCode 輪換：在重複的暫時性 429 錯誤（或新的池壓力標記）後，帶心跳地暫停請求，然後重播最多 3 個連續帳戶的一個受限階段，而不是將請求分散到整個機群。預設為關閉：每個 429 錯誤都會像以前一樣輪換到下一個帳戶。                                                                                                    |
| `FLUSH_EMPTY_RETRY_ENABLED`                     | boolean | `false` |         | 在翻譯的串流回合中，當上游回合不包含任何可用內容（僅推理完成或零有價值區塊）時，在向客戶端公開任何內容之前，透過正常憑證路徑發出有限的重試（最多 `STREAM_RECOVERY.EMPTY_TURN_RETRY_MAX`）。預設為關閉：空回合保持目前的行為（空的 200 或內容為空的 502）。                                                        |
| `OPENCODE_RATE_LIMITED_429_EARLY_STOP`          | boolean | `false` |         | OpenCode 輪換：在第一個被歸類為真實速率限制（可解析的 `Retry-After`，或指定速率/使用限制的主體）的 429 錯誤時停止帳戶波次，並原樣返回該上游 429。未分類的 429 錯誤會繼續輪換。預設為關閉：免費層級每個出口 IP 受到限制（#9611），因此每個 429 都會輪換，並且耗盡的波次會返回最後一個上游 429。                    |
| `MITM_DISABLE_TLS_VERIFY`                       | boolean | `false` | ✓       | 禁用 MITM 代理的 TLS 憑證驗證。**危險。**                                                                                                                                                                                                                                                                         |
| `OMNIROUTE_ALLOW_PRIVATE_PROVIDER_URLS`         | boolean | `false` |         | 允許指向私有/內部網路的提供者 URL。                                                                                                                                                                                                                                                                               |
| `OMNIROUTE_ALLOW_LOCAL_PROVIDER_URLS`           | boolean | `true`  |         | 允許在本地/私有位址（127.0.0.1、localhost、LAN）上新增/驗證提供者。預設為開啟（本地優先）；若要嚴格僅限公共網路，請禁用。雲端中繼資料保持被封鎖。                                                                                                                                                                 |
| `ENABLE_CC_COMPATIBLE_PROVIDER`                 | boolean | `false` | ✓       | 啟用 Claude Code 相容提供者模式。                                                                                                                                                                                                                                                                                 |

### 策略 (5)

| Key                             | Type    | Default    | Description                                                                                                                      |
| ------------------------------- | ------- | ---------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `TOOL_POLICY_MODE`              | enum    | `disabled` | 工具使用策略強制模式。值：`disabled`（禁用）、`warn`（警告）、`block`（阻擋）。                                                  |
| `RATE_LIMIT_AUTO_ENABLE`        | boolean | `false`    | 根據使用模式自動啟用速率限制。                                                                                                   |
| `DISABLE_CONTEXT_WINDOW_CHECKS` | boolean | `false`    | 對於直接的單模型請求，跳過 OmniRoute 的本地上下文視窗/最大輸入令牌檢查。上游限制仍然適用。                                       |
| `CAPABILITY_FILTER_ENABLED`     | boolean | `false`    | 當目標模型缺乏所需功能（視覺、工具、結構化輸出、上下文視窗）時，在分派前拒絕請求。保護繞過組合層兼容性過濾器的直接單提供者請求。 |
| `RADAR_ENABLED`                 | boolean | `false`    | 啟用 OmniRoute Radar 模組（目錄饋送畫面和同步）。預設為關閉；啟用僅解鎖使用者介面 — 資料同步仍需單獨選擇加入。                   |

### 執行時 (33)

| 鍵值                                        | 類型    | 預設值  | 重啟 | 描述                                                                                                                                                                                                                                                                                                                                                                                                                          |
| ------------------------------------------- | ------- | ------- | ---- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `UNIVERSAL_CONTEXT_HANDOFF_ENABLED`         | boolean | `true`  |      | 當組合路由（combo routing）切換模型時，生成並注入對話摘要。禁用此項可將模型切換視為獨立行為，並防止所有現有及未來的組合產生背景轉接請求。                                                                                                                                                                                                                                                                                     |
| `RESPONSES_PASSTHROUGH_DROP_COMMENTARY`     | boolean | `true`  |      | 在轉發給用戶端之前，從 `Responses API` 穿透串流中捨棄內部的評論階段（commentary-phase）輸出項目。禁用此項可接收原始的上游評論。                                                                                                                                                                                                                                                                                               |
| `OMNIROUTE_MCP_ENFORCE_SCOPES`              | boolean | `true`  |      | 對 `MCP` 工具存取強制執行範圍（scope）限制。                                                                                                                                                                                                                                                                                                                                                                                  |
| `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS`       | boolean | `false` |      | 壓縮 `MCP` 工具描述以減少 token 使用量。                                                                                                                                                                                                                                                                                                                                                                                      |
| `OMNIROUTE_ENABLE_RUNTIME_BACKGROUND_TASKS` | boolean | `false` |      | 在執行階段啟用背景任務處理。                                                                                                                                                                                                                                                                                                                                                                                                  |
| `OMNIROUTE_DISABLE_BACKGROUND_SERVICES`     | boolean | `false` | ✓    | 停用所有背景服務（配額重新整理、同步等）。                                                                                                                                                                                                                                                                                                                                                                                    |
| `OMNIROUTE_RTK_TRUST_PROJECT_FILTERS`       | boolean | `false` |      | 信任專案層級的 RTK 篩選器，無需驗證。                                                                                                                                                                                                                                                                                                                                                                                         |
| `OMNIROUTE_ENABLE_LIVE_WS`                  | boolean | `true`  | ✓    | 在匯入時啟動即時儀表板 WebSocket 伺服器（預設埠為 20132）。                                                                                                                                                                                                                                                                                                                                                                   |
| `OMNIROUTE_CODEX_WS_ENABLED`                | boolean | `true`  |      | 允許 Codex 使用 Responses-over-WebSocket 傳輸。關閉時，Codex 會回退到 HTTP Responses。                                                                                                                                                                                                                                                                                                                                        |
| `OMNIROUTE_CODEX_APP_SERVER_ENABLED`        | boolean | `true`  |      | 允許 Codex 使用本地應用程式伺服器 WebSocket JSON-RPC 傳輸 (codexTransport=app-server)。關閉時，選擇應用程式伺服器的連線會回退到 Codex 的其他傳輸方式。                                                                                                                                                                                                                                                                        |
| `OMNIROUTE_EMERGENCY_FALLBACK`              | boolean | `true`  |      | 將預算耗盡的請求路由到緊急免費備用提供者/模型。（請參閱下面的[緊急預算備用](#emergency-budget-fallback)。）                                                                                                                                                                                                                                                                                                                   |
| `STREAM_RECOVERY_ENABLED`                   | boolean | `false` |      | 在任何回應位元組到達客戶端之前，啟用對截斷的上游 SSE 串流的透明早期重試。                                                                                                                                                                                                                                                                                                                                                     |
| `STREAM_RECOVERY_MIDSTREAM_ENABLED`         | boolean | `false` |      | 允許串流恢復在位元組已到達客戶端後重新請求並拼接回應。                                                                                                                                                                                                                                                                                                                                                                        |
| `STREAM_RECOVERY_TOOLCALL_ORDER_FIX`        | boolean | `false` |      | 使中途續傳工具呼叫安全：一旦發出工具呼叫（正在進行中或已完成，完成原因為 tool_calls），切勿恢復已切斷的串流，並在一次空續傳後關閉，而不是耗盡所有預算。關閉：釋放行為。                                                                                                                                                                                                                                                       |
| `STREAM_EARLY_EOF_SIBLING_FAILOVER_ENABLED` | boolean | `false` |      | 當 SSE 串流在發出任何有用訊框之前關閉，且同連線重試次數已用盡時，會故障轉移到同級連線一次；如果沒有可用的同級連線，則會傳回原始的 `STREAM_EARLY_EOF` 502 錯誤。預設為關閉：在同連線重試後，早期 EOF 仍會終止。                                                                                                                                                                                                                |
| `MODEL_CATALOG_INCLUDE_NAMES`               | boolean | `true`  |      | 在 `/v1/models` 回應中包含易於顯示的名稱欄位。對於只期望模型 ID 的客戶端，請停用此功能。                                                                                                                                                                                                                                                                                                                                      |
| `MODELS_CATALOG_PREFIX_MODE`                | enum    | `dual`  |      | 控制 `/v1/models` 中模型 ID 的前綴方式。「dual」（預設）會同時發出別名和規範的提供者 ID 前綴，以實現向後相容性。「alias」僅發出簡短的別名前綴（例如 ds-web/model，而非 deepseek-web/model）。「canonical」僅發出完整的提供者 ID 前綴。值：`dual`、`alias`、`canonical`。                                                                                                                                                      |
| `ARENA_ELO_SYNC_ENABLED`                    | boolean | `true`  |      | 啟用模型智慧排名的定期 Arena AI 排行榜 ELO 同步。                                                                                                                                                                                                                                                                                                                                                                             |
| `EXPOSE_CC_DISCOVERY_ALIASES`               | boolean | `false` |      | 在 `/v1/models` 上宣傳 `claude/<provider>/<model>` 鏡像 ID，以便 Claude Code 閘道模型探索列出非 Claude 模型。這是三層閘道中的全域層級（環境變數會覆蓋儀表板設定）。請參閱 [Claude Code configuration](../guides/CLAUDE-CODE-CONFIGURATION.md#discovery-aliases--surface-non-claude-models-in-the-model-picker)。                                                                                                              |
| `NO_THINKING_ALIAS_ENABLED`                 | boolean | `true`  |      | no-think/<provider>/<model> 閘道別名的主開關。開啟（預設）：/v1/models 會為每個符合條件的具思考能力的 Claude 模型宣傳一個 no-thinking 變體，並且在請求中發送的 no-think/ ID 會解析回真實模型，並抑制推理。關閉：不宣傳任何變體，並且 no-think/ ID 會被視為任何其他未知模型 ID。當此功能開啟時，每個模型的 ModelSpec.noThinkingAlias 選項（選擇加入/選擇退出）仍然適用。                                                       |
| `OMNIROUTE_DISABLE_THINKING_LEVEL_VARIANTS` | boolean | `false` |      | 停用在 /v1/models 目錄中生成思考層級變體（例如 -low、-medium、-high）的功能。                                                                                                                                                                                                                                                                                                                                                 |
| `OMNIROUTE_CHAT_VIRTUAL_LANES`              | boolean | `false` | ✓    | 啟用每個租戶的自適應虛擬准入通道，用於提供者調度 (#9654)：一個租戶的突發流量不再導致另一個租戶出現 503 錯誤。`OMNIROUTE_CHAT_VIRTUAL_LANES` 環境變數會覆蓋此儀表板設定；更改在伺服器重啟後生效。                                                                                                                                                                                                                              |
| `EXPOSE_FUNCTIONAL_GATEWAY_MIRRORS`         | boolean | `false` |      | 在 `/v1/models` 上宣傳 `<gateway-alias>/<model>` 鏡像 ID，適用於其規範擁有者沒有活動憑證，但具有活動憑證的直通閘道路由它們的模型。警告：當全域啟用時，會為所有客戶端添加目錄條目。                                                                                                                                                                                                                                            |
| `NEWAPI_AGGREGATOR_BALANCE`                 | boolean | `false` |      | 為 New-API / One-API / Sub2API 聚合器兼容節點啟用餘額檢測。啟用後，設置了聚合器標誌的兼容節點將在儀表板和配額預檢路由中報告其餘額。                                                                                                                                                                                                                                                                                           |
| `SERVER_OWNED_TOOL_LOOP_ENABLED`            | boolean | `false` |      | 繼續執行非串流的伺服器自有工具呼叫，直到模型返回客戶端可用的回應。                                                                                                                                                                                                                                                                                                                                                            |
| `SEARCH_STATS_HIDE_DELETED_CONNECTIONS`     | boolean | `false` |      | 搜尋統計和最近搜尋只計算仍有活動連線的提供者（無密鑰提供者，例如 duckduckgo-free 始終計算在內）。關閉時，會保留每個帶有提供者 ID 的搜尋行。                                                                                                                                                                                                                                                                                   |
| `FREE_BADGE_REQUIRES_PROVIDER_FREE_TIER`    | boolean | `false` |      | 儀表板提供者頁面：僅在提供者遵守的信號上顯示「免費」徽章 — 捨棄顯示名稱啟發式、非布林免費欄位以及未記錄免費層級的註冊提供者上的 `:free` 後綴。關閉時，會保留歷史徽章規則。                                                                                                                                                                                                                                                    |
| `RETRY_AFTER_PROVENANCE_ENABLED`            | boolean | `false` |      | 在聚合的 429/503 不可用回應中，當沒有已知的具體未來重試時間時（而不是合成的 1 秒），省略 `Retry-After`，添加 `error.retry_after_provenance` (`signal` \| `none`)，並讓組合耗盡路徑從 JSON 和純文本上游主體中讀取散文重試提示。該欄位僅出現在由 `unavailableResponse()` 構建的回應中；其他 429/503 主體保持不變。                                                                                                              |
| `PROTECTED_PRIORITY_INFRA_502_ENABLED`      | boolean | `false` |      | 當標記為「僅在配額耗盡時回退」的 `priority` 組合目標因可證明非配額原因（提供者斷路器開啟、預測延遲跳過）停止組合時，回應 502 而不是看起來像配額的 503。鎖定、冷卻、不可用、耗盡和並發上限停止仍保持 503。                                                                                                                                                                                                                     |
| `MISTRAL_AMBIGUOUS_401_SOFT_LOCKOUT`        | boolean | `false` |      | 一個裸的 Mistral 401 (`{"detail":"Unauthorized"}`，沒有明確的身份驗證信號) 對於已撤銷的密鑰和已耗盡的配額來說是相同的。啟用時，它會冷卻連線而不是將其停放為 `expired`，每個連線每小時最多 3 次；下一次會將其停放，因此已撤銷的密鑰仍然會收斂。預設為關閉：每個裸的 Mistral 401 仍像以前一樣停放連線。                                                                                                                         |
| `XAI_OAUTH_LIVE_MODEL_DISCOVERY`            | boolean | `false` |      | 使用 OAuth 承載權杖從 `https://api.x.ai/v1/models` 獲取 `xai-oauth` 連線的即時 xAI 模型目錄，而不是使用凍結的靜態種子。預設為關閉：`xai-oauth` 會保持提供未更改的靜態種子。在任何解析錯誤時，發現會回退到種子（未驗證 x.ai 是否在此端點接受 OAuth 承載）。                                                                                                                                                                    |
| `BATCH_AND_FILE_AUTO_CLEANUP_ENABLED`       | boolean | `false` |      | 讓自動清理掃描刪除早於 `OMNIROUTE_BATCH_RETENTION_DAYS` 的終端（已完成/失敗/已取消/已過期）批次 API 工作，以及它們的逐行檢查點，並清除已上傳檔案中超過其 `expires_at` 的 BLOB 內容。預設為關閉：每個現有安裝都會保持此資料不變，直到操作員選擇啟用。操作員觸發的 `DELETE /api/v1/batches/delete-completed` 路由不受影響 — 它是一個獨立的、無條件的公共 API 合約。                                                             |
| `ANTIGRAVITY_ACCOUNT_LEASE_ENABLED`         | boolean | `false` |      | 為選定的 Antigravity 帳戶保留其被選取請求的串流生命週期，這樣並發重試或憑證交接就無法重新選擇已提交給進行中串流的帳戶。此保留範圍限定為（連線、可呼叫的上游模型），因此一個帳戶仍然可以同時服務兩個不同的模型。當所有符合條件的帳戶都已為該模型租用時，請求會返回一個結構化的 503 `antigravity_pool_busy`，並帶有受限的 `Retry-After`，而不是堆積到繁忙的帳戶上。預設為關閉：帳戶選擇保持與以前完全相同，並且不進行任何保留。 |

### CLI (5)

| Key                                   | Type    | Default | Restart | Description                                                                                                                                              |
| ------------------------------------- | ------- | ------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `CLI_COMPAT_ALL`                      | boolean | `false` | ✓       | 為所有 CLI 用戶端啟用相容模式。                                                                                                                          |
| `MODEL_ALIAS_COMPAT_ENABLED`          | boolean | `false` |         | 啟用模型別名相容層。                                                                                                                                     |
| `PRICING_SYNC_ENABLED`                | boolean | `false` |         | 啟用自動定價資料同步（也需要 `PRICING_SYNC_ENABLED` 環境變數）。                                                                                         |
| `OMNIROUTE_AUTO_SYNC_CODEX_PROFILES`  | boolean | `false` |         | 在提供者模型同步後，自動從即時目錄（重新）寫入 ~/.codex/*.config.toml 設定檔。絕不更改活動/預設的 Codex 設定。預設為關閉。                               |
| `OMNIROUTE_AUTO_SYNC_CLAUDE_PROFILES` | boolean | `false` |         | 在提供者模型同步後，自動從即時目錄（重新）寫入 ~/.claude/profiles/<name>/settings.json Claude Code 設定檔。絕不更改活動/預設的 Claude 設定。預設為關閉。 |

### 健康 (5)

| 鍵                                        | 類型    | 預設值  | 描述                                                                                                                                                                              |
| :---------------------------------------- | :------ | :------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_DISABLE_LOCAL_HEALTHCHECK`     | boolean | `false` | 停用本地實例的健康檢查端點。                                                                                                                                                      |
| `OMNIROUTE_DISABLE_TOKEN_HEALTHCHECK`     | boolean | `false` | 停用令牌驗證的健康檢查。                                                                                                                                                          |
| `SKILLS_SANDBOX_NETWORK_ENABLED`          | boolean | `false` | 在技能沙盒環境中啟用網路存取。                                                                                                                                                    |
| `PROXY_HEALTH_BLOCKED_RESETS_STREAK`      | boolean | `false` | 在代理健康掃描中，目標拒絕的探測（401/403/429）會重置代理的連續失敗次數。預設為關閉：拒絕保持中立（#10654）。5xx 錯誤無論如何都保持不確定；拒絕永遠不會移除、停用或重新啟用代理。 |
| `DB_HEALTHCHECK_STARTUP_DEFERRED_ENABLED` | boolean | `false` | 在伺服器開始接受請求後（透過 `setImmediate`）執行啟動資料庫完整性/健康檢查，而不是阻塞啟動直到其完成（#13717）。預設為關閉：啟動阻塞方式與此 PR 之前完全相同。                    |

> [!注意]
> `INPUT_SANITIZER_BLOCK_THRESHOLD` 及其舊版別名
> `INJECTION_GUARD_BLOCK_THRESHOLD` 調整
> `INJECTION_GUARD_MODE` 的 `block` 模式，
> 但它們是由
> [`src/shared/utils/injectionSeverity.ts`](../../src/shared/utils/injectionSeverity.ts)
> 讀取的普通環境變數，
> 而不是功能標誌：它們沒有資料庫覆寫，也沒有儀表板開關。請參閱
> [`ENVIRONMENT.md`](./ENVIRONMENT.md#4-security--authentication)。

> [!注意]
> 「重新啟動」欄位標記了 `requiresRestart: true` 的標誌 — 該值會立即持久化，但僅在程序重新載入後才會生效。列舉標誌會拒絕其允許集合之外的任何值（在 `setFeatureFlagOverride()` 和 REST `PUT` 處理器中均進行伺服器端驗證）。

---

## 切換功能旗標

### 儀表板

導覽至 **儀表板 → 設定 → 功能旗標**
(`/dashboard/settings/feature-flags`)。該網格
(`src/app/(dashboard)/dashboard/settings/components/FeatureFlagsGrid.tsx`)
支援：

- 依據鍵或描述進行**搜尋**，並依類別進行**篩選**（加上一個合成的**需要重新啟動**視圖）。
- 布林旗標的**切換開關**和列舉旗標的**下拉式選單**
  (`src/app/(dashboard)/dashboard/settings/components/FeatureFlagCard.tsx`)。
- 每個旗標的**來源標籤** — `DB`、`ENV` 或 `DEF` — 顯示有效值來自何處。
- **重設**按鈕（僅針對 `DB` 來源的旗標顯示）以取消覆寫，以及底部的**重設所有覆寫**按鈕。
- 當 `requiresRestart` 旗標變更時，會顯示**重新啟動伺服器**橫幅。

### REST API

所有操作都透過單一路徑進行：
[`src/app/api/settings/feature-flags/route.ts`](../../src/app/api/settings/feature-flags/route.ts)。
每個方法都需要經過驗證的儀表板會話（否則為 `401`）。

#### `GET /api/settings/feature-flags`

返回每個旗標及其有效值、來源和摘要。

```jsonc
{
  "flags": [
    {
      "key": "REQUIRE_API_KEY",
      "label": "Require API Key",
      "description": "Require an API key for all incoming requests",
      "category": "security",
      "type": "boolean",
      "enumValues": null,
      "defaultValue": "false",
      "effectiveValue": "false",
      "source": "default", // "db" | "env" | "default"
      "requiresRestart": false,
      "warningLevel": "caution",
    },
    // ... 所有 77 個旗標
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

設定或移除單一覆寫。請求主體：`{ key: string; value?: string }`。
省略 `value` 會移除覆寫（恢復環境變數 / 預設值）。

```bash
# 設定一個 DB 覆寫
curl -X PUT http://localhost:20128/api/settings/feature-flags \
  -H "Content-Type: application/json" \
  -d '{"key":"REQUIRE_API_KEY","value":"true"}'

# 移除覆寫（無 "value"）
curl -X PUT http://localhost:20128/api/settings/feature-flags \
  -H "Content-Type: application/json" \
  -d '{"key":"REQUIRE_API_KEY"}'
```

回應會回顯新的 `effectiveValue`/`source`、`previousValue`/
`previousSource` 和 `requiresRestart`。未知鍵和超出範圍的列舉值將被 `400` 拒絕。

#### `DELETE /api/settings/feature-flags`

一次清除**所有** DB 覆寫，將每個旗標恢復為其環境變數 / 預設值。返回 `{ cleared: <count>, message: "..." }`。

> [!注意]
> 帶有 `requiresRestart: true` 的旗標僅在程序重新載入後生效。
> 儀表板的重新啟動流程會呼叫 `POST /api/restart`，然後輪詢
> `GET /api/health/ping` 直到伺服器恢復運作。

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
