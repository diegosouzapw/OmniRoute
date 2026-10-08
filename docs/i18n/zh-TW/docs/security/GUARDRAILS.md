# Guardrails (中文 (繁體))

🌐 **Languages:** 🇺🇸 [English](../../../../security/GUARDRAILS.md) · 🇪🇹 [am](../../../am/docs/security/GUARDRAILS.md) · 🇸🇦 [ar](../../../ar/docs/security/GUARDRAILS.md) · 🇦🇿 [az](../../../az/docs/security/GUARDRAILS.md) · 🇧🇬 [bg](../../../bg/docs/security/GUARDRAILS.md) · 🇧🇩 [bn](../../../bn/docs/security/GUARDRAILS.md) · 🇧🇦 [bs](../../../bs/docs/security/GUARDRAILS.md) · 🇨🇿 [cs](../../../cs/docs/security/GUARDRAILS.md) · 🇩🇰 [da](../../../da/docs/security/GUARDRAILS.md) · 🇩🇪 [de](../../../de/docs/security/GUARDRAILS.md) · 🇬🇷 [el](../../../el/docs/security/GUARDRAILS.md) · 🇪🇸 [es](../../../es/docs/security/GUARDRAILS.md) · 🇪🇪 [et](../../../et/docs/security/GUARDRAILS.md) · 🇮🇷 [fa](../../../fa/docs/security/GUARDRAILS.md) · 🇫🇮 [fi](../../../fi/docs/security/GUARDRAILS.md) · 🇫🇷 [fr](../../../fr/docs/security/GUARDRAILS.md) · 🇮🇪 [ga](../../../ga/docs/security/GUARDRAILS.md) · 🇮🇳 [gu](../../../gu/docs/security/GUARDRAILS.md) · 🇳🇬 [ha](../../../ha/docs/security/GUARDRAILS.md) · 🇮🇱 [he](../../../he/docs/security/GUARDRAILS.md) · 🇮🇳 [hi](../../../hi/docs/security/GUARDRAILS.md) · 🇭🇷 [hr](../../../hr/docs/security/GUARDRAILS.md) · 🇭🇺 [hu](../../../hu/docs/security/GUARDRAILS.md) · 🇦🇲 [hy](../../../hy/docs/security/GUARDRAILS.md) · 🇮🇩 [id](../../../id/docs/security/GUARDRAILS.md) · 🇳🇬 [ig](../../../ig/docs/security/GUARDRAILS.md) · 🇮🇹 [it](../../../it/docs/security/GUARDRAILS.md) · 🇯🇵 [ja](../../../ja/docs/security/GUARDRAILS.md) · 🇬🇪 [ka](../../../ka/docs/security/GUARDRAILS.md) · 🇰🇭 [km](../../../km/docs/security/GUARDRAILS.md) · 🇮🇳 [kn](../../../kn/docs/security/GUARDRAILS.md) · 🇰🇷 [ko](../../../ko/docs/security/GUARDRAILS.md) · 🇱🇹 [lt](../../../lt/docs/security/GUARDRAILS.md) · 🇱🇻 [lv](../../../lv/docs/security/GUARDRAILS.md) · 🇮🇳 [ml](../../../ml/docs/security/GUARDRAILS.md) · 🇮🇳 [mr](../../../mr/docs/security/GUARDRAILS.md) · 🇲🇾 [ms](../../../ms/docs/security/GUARDRAILS.md) · 🇲🇹 [mt](../../../mt/docs/security/GUARDRAILS.md) · 🇲🇲 [my](../../../my/docs/security/GUARDRAILS.md) · 🇳🇵 [ne](../../../ne/docs/security/GUARDRAILS.md) · 🇳🇱 [nl](../../../nl/docs/security/GUARDRAILS.md) · 🇳🇴 [no](../../../no/docs/security/GUARDRAILS.md) · 🇮🇳 [or](../../../or/docs/security/GUARDRAILS.md) · 🇮🇳 [pa](../../../pa/docs/security/GUARDRAILS.md) · 🇵🇭 [phi](../../../phi/docs/security/GUARDRAILS.md) · 🇵🇱 [pl](../../../pl/docs/security/GUARDRAILS.md) · 🇵🇹 [pt](../../../pt/docs/security/GUARDRAILS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/GUARDRAILS.md) · 🇷🇴 [ro](../../../ro/docs/security/GUARDRAILS.md) · 🇷🇺 [ru](../../../ru/docs/security/GUARDRAILS.md) · 🇱🇰 [si](../../../si/docs/security/GUARDRAILS.md) · 🇸🇰 [sk](../../../sk/docs/security/GUARDRAILS.md) · 🇸🇮 [sl](../../../sl/docs/security/GUARDRAILS.md) · 🇷🇸 [sr](../../../sr/docs/security/GUARDRAILS.md) · 🇸🇪 [sv](../../../sv/docs/security/GUARDRAILS.md) · 🇰🇪 [sw](../../../sw/docs/security/GUARDRAILS.md) · 🇮🇳 [ta](../../../ta/docs/security/GUARDRAILS.md) · 🇮🇳 [te](../../../te/docs/security/GUARDRAILS.md) · 🇹🇭 [th](../../../th/docs/security/GUARDRAILS.md) · 🇹🇷 [tr](../../../tr/docs/security/GUARDRAILS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/GUARDRAILS.md) · 🇵🇰 [ur](../../../ur/docs/security/GUARDRAILS.md) · 🇺🇿 [uz](../../../uz/docs/security/GUARDRAILS.md) · 🇻🇳 [vi](../../../vi/docs/security/GUARDRAILS.md) · 🇳🇬 [yo](../../../yo/docs/security/GUARDRAILS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/GUARDRAILS.md)

---

> **事實來源：** `src/lib/guardrails/`
> **上次更新：** 2026-08-29 — v3.8.51（Video Bridge 逐字稿來源由呼叫端宣告，
> 尚未由伺服器驗證 — 已依 #11661 釐清）

護欄會在 OmniRoute 與上游提供者之間的邊界強制執行安全、政策及內容轉換。每個護欄都可以檢查請求承載資料（`preCall`）和上游回應（`postCall`），並可選擇拒絕、轉換或註解這些內容。

系統採用**失敗時開放**機制：如果護欄在執行期間擲出例外，登錄檔會記錄錯誤並繼續執行下一個護欄，而不會讓請求失敗。封鎖一律是明確的決定（`block: true`），絕不會因意外而發生。

## 內建護欄 (Built-in Guardrails)

註冊表會在匯入時自動按優先順序載入六個護欄
（請參閱 `registry.ts` → `registerDefaultGuardrails()`）：

| 優先順序 | 名稱                | 階段           | 檔案                  |
| -------- | ------------------- | -------------- | --------------------- |
| `5`      | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`      | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`      | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`     | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`     | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`     | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

優先順序數字較小的會**優先**執行。

### 視覺橋接 (`visionBridge.ts`) — 模態橋接 PR-1

攔截針對**非視覺模型**且帶有圖片的請求，並在進行上游呼叫之前，將整個請求重新路由至具備視覺能力模型，或是將圖片部分替換為由可設定的視覺模型所產生的文字描述。這讓純文字提供者能夠透明地處理多模態酬載。

流程：

1. 如果目標模型已經支援視覺，則略過（除非它出現在強制橋接清單 `isVisionBridgeForcedModel` 中）。
2. 透過 `extractImageParts(messages)` (`visionBridgeHelpers.ts`) 擷取圖片部分，該函式會委派給 `open-sse/utils/mediaParts.ts` 中的**統一媒體偵測器** `detectMediaParts()` — 這是與組合相容性過濾器共用的單一真實來源 (single source of truth)。
   擷取作業允許清單限於 `replaceImageParts` 可以拼回的頂層部分形狀（擷取↔替換合約）：OpenAI `image_url`、Anthropic base64 `source.type:"base64"`、Anthropic URL `source.type:"url"`，以及 Responses API `input_image`。巢狀命中與僅指示器形狀屬於組合過濾器素材，永遠不會被擷取。
   若未找到則略過。
3. 透過 `resolveVisionBridgeRuntimeSettings()` (`src/shared/constants/modalityBridgeDefaults.ts`) 解析執行階段設定：新的 `modalityBridge*` 設定金鑰勝出；舊版的 `visionBridge*` 金鑰維持作為**一個週期的後備方案**（回滾視窗）。當橋接停用時，會在任何媒體走訪之前略過。
4. 模式選擇器 (`modalityBridgeVisionMode`，見下表) 決定重新路由與描述的其中一項。重新路由會傳回僅對調 `model` 的 `modifiedPayload`，以及中繼資料 `{ rerouted, fromModel, toModel, imagesKept }`。
5. 描述路徑：將圖片上限設為 `maxImages`，組合任務感知提示詞，查詢描述快取，**以平行方式**呼叫視覺模型 (`Promise.allSettled`)，並在其位置注入 `[Image N]: <description>` 文字部分。描述失敗會產生 `null` 且原始圖片部分會被**保留** (#4012) — 但在每個描述都失敗的組合描述路徑上除外，此時已確認的非視覺上游會取得 `(unavailable — no vision-capable provider connected)` 預留位置 (stub) (#8430)。
6. 傳回 `modifiedPayload` + 中繼資料 (`imagesProcessed`, `descriptions`, `processingTimeMs`, `visionModel`)。

#### 模式選擇器 (`modalityBridgeVisionMode`)

| 模式       | 預設值 | 行為                                                                                                                                                            |
| ---------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔      | 舊版啟發式方法，保持不變 (#6640/#7204)：非組合式/`auto/` 模型會重新路由至最佳視覺模型，除非原始模型已經擁有可用的憑證（此時改用描述）；組合式目標一律進行描述。 |
| `describe` |        | 一律描述 — 完全略過重新路由區塊；一律由使用者選擇的模型來回答。                                                                                                 |
| `reroute`  |        | 強制重新路由：略過保留憑證模型護欄。重新路由**目標**憑證護欄仍然適用 — 當不存在可用的視覺目標時，請求會落入描述處理，因此原始圖片絕不會到達純文字後端 (#8430)。 |

強制模式會在自動啟發式方法執行**之前**進行短路 (short-circuit)；`auto` 行為與 PR-1 之前的護欄位元組完全相同。

#### 任務感知描述提示詞 (`modalityBridgeVisionTaskAware`)

預設為 **true**。`composeVisionPrompt()` (`visionBridgeHelpers.ts`) 會將**最後一則使用者訊息**的文字（截斷至 500 個字元）附加到基礎描述提示詞後面，引導描述朝向使用者實際詢問的內容（codex-vision-proxy 模式），並要求視覺模型轉錄可見文字。當此旗標關閉 — 或沒有使用者文字時 — 則會直接使用未修改的基礎提示詞。

`visionBridgeHelpers.ts` 中的自迴圈 OpenAI 相容請求 (`callVisionModelSingle()`) 總是請求 `image_url.detail: "high"` — 無條件地，對於每個呼叫者/提供者，不受任何客戶端訊號的限制。低細節取樣會降低 OCR 準確性，而這正是此提示所要求的文字轉錄任務，因此描述呼叫本身總是要求高細節，無論原始入站請求使用了什麼細節級別。這只影響內部的描述請求主體；它不會改變 OmniRoute 如何在主要請求上轉發呼叫者自己的 `image_url.detail` — 該預設值是單獨應用的，並且僅適用於 `defaultImageDetail()` (`open-sse/handlers/chatCore/upstreamBody.ts`) 中檢測到的 OpenCode 客戶端。描述自迴圈的 Anthropic 線路格式分支沒有 `detail` 欄位，不受任何預設值的影響。

#### 描述輸出上限 (`modalityBridgeVisionMaxChars`)

| 鍵                             | 預設值 | 範圍             |
| ------------------------------ | ------ | ---------------- |
| `modalityBridgeVisionMaxChars` | `0`    | `0` 或 100–50000 |

`0` (預設值) 表示**無上限** — `callVisionModel()` 返回的描述會未經修改地傳遞，保留現有行為。100–50000 範圍內的任何值都會在描述被拼接回 `[Image N]: <description>` (`src/lib/guardrails/visionBridge.ts` 中的 `VisionBridgeGuardrail.preCall()`) 之前，以 `…` 後綴截斷。對於下游模型需要完整轉錄的細節繁重 OCR 任務，請提高此值；對於冗長的視覺模型，請降低此值以限制 token 使用。儀表板欄位位於「視覺」選項卡的「進階」面板 (`ModalityBridgeVisionTab.tsx` 中的 `modality-bridge-max-chars`)，並將 1 到 99 之間的值限制為 100 的下限，同時保留明確的 `0` 不變 — `0` 本身就是一個有效的 Zod 值 (`z.union([z.literal(0), z.number().int().min(100).max(50000)])`)，而不僅僅是「未設定」的預設值。

#### 描述快取 (`modalityBridge/bridgeCache.ts`)

用於描述輸出的記憶體內 LRU + TTL 快取，在整個程序中共享。
鍵 = `sha256(imageRef + composedPrompt + configuredBridgeModel)`，帶有長度前綴框架（無欄位邊界衝突）。模型組件是**已配置的**橋接模型，而不是實際回答的模型 — `callVisionModel` 可能會在內部回退，而按每次嘗試進行鍵控會使快取碎片化。失敗的描述永遠不會被快取。設定：

| 鍵                              | 預設值 | 範圍    |
| ------------------------------- | ------ | ------- |
| `modalityBridgeCacheEnabled`    | `true` | —       |
| `modalityBridgeCacheTtlMinutes` | `60`   | 1–1440  |
| `modalityBridgeCacheMaxEntries` | `200`  | 10–5000 |

#### 遠端影像正規化 (自迴圈描述/base64 擷取)

當橋接器本身擷取**遠端**影像時 — Anthropic 描述自呼叫和 claude 線路格式 base64 轉換 (`ensureBase64ImagesForClaudeWire`)，兩者都透過 `visionBridgeHelpers.ts` 中的 `fetchRemoteImageAsDataUri()` 進行 — 產生的資料 URI 在嵌入視覺模型請求之前會透過 `normalizeDataUri()` (`open-sse/utils/imageNormalize.ts`) 傳遞。過大的影像會縮小到 **2048px 長邊**（與 OpenAI/Anthropic 已經在伺服器端應用的調整上限相符），這減少了上傳位元組/延遲，而不會改變視覺模型所看到的內容。調整大小使用 `sharp`，透過動態導入載入：在其原生二進位檔無法載入的平台上，`normalizeDataUri()` **從不拋出錯誤** — 它會回退到原始位元組的直通，因此描述/base64 轉換路徑始終保持工作。非影像位元組（未返回可解碼影像的擷取）也會未經觸碰地傳遞。此正規化僅限於橋接器為其自身呼叫擷取的影像 — 它從未應用於呼叫者的原始直通負載，這與僅選擇加入的變異原則（硬性規則 #20）一致。

#### 設定架構 + 遷移

新的 `modalityBridge*` 鍵在 `updateSettingsSchema` (`src/shared/validation/settingsSchemas.ts`) 中進行 Zod 驗證：`modalityBridgeVisionEnabled`、`modalityBridgeVisionMode`、`modalityBridgeVisionModel`、`modalityBridgeVisionTaskAware`、`modalityBridgeVisionPrompt`、`modalityBridgeVisionTimeout`、`modalityBridgeVisionMaxImages`、`modalityBridgeVisionMaxChars`、`modalityBridgeCache*` 三人組，以及音訊橋接器使用的 `modalityBridgeAudio*` 群組。遷移 `141_modality_bridge_settings.sql` 將現有的舊版 `visionBridge*` 值複製到匹配的新鍵（冪等，從不覆寫操作員設定的 `modalityBridge*` 值）；舊版鍵在一個發布週期內仍被接受作為讀取回退。

#### 透明度標頭 + 統計

描述轉換後的回應帶有 `x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>`（由 `modalityBridge/bridgeStats.ts` 中的 `buildModalityBridgeHeader()` 構建，由 `src/sse/handlers/chatHelpers.ts` 中的 `withModalityBridgeHeader()` 標記）。重新路由的請求**沒有**標頭 — 負載未經觸碰，模型交換已在回應主體的 `model` 欄位中可見。

`GET /api/modality-bridge/stats`（管理員驗證，與 `GET /api/settings` 相同層級）返回記憶體中每個模態的計數器 `{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs, latencySamples, averageLatencyMs, lastUsedAt }`，適用於 `vision`、`audio` 和 `video`。`averageLatencyMs` 使用 `latencySamples` 作為其分母，而不是所有嘗試；沒有計時的操作不會產生零毫秒的樣本。`bridged` 仍然是成功轉換的向後相容別名；失敗的嘗試不會增加它。計數器在程序重新啟動時重置是設計使然（遙測，而非會計）。

#### 儀表板配置

專用的儀表板頁面是
`/dashboard/settings/modality-bridge`。其可透過 URL 定址的 `Vision`、`Audio`
和 `Video` 標籤在切換 `tab` 值時保留查詢參數。
Vision 標籤公開了啟用、模式、模型選擇（包括自動預設）、任務感知提示、進階逾時/影像/描述長度/快取
限制、執行時間
計數器，以及受保護的範例請求。Audio 標籤也已上線：它公開了
啟用、僅 STT 模型選擇器（含自動）、逾時/最大剪輯限制、音訊
計數器，以及 `input_audio` 範例測試。Video 標籤功能正常：它報告
FFmpeg/ffprobe 執行時間狀態 — 四種明確的 UI 狀態之一（探測進行中或無法完成時為 `unknown`，
在非迴路儀表板主機上跳過用戶端探測時為 `restricted`，
探測後確認遺失時為 `unavailable`，或顯示 FFmpeg/ffprobe 版本時為 `available`）— 持續
啟用/模型/影格/視訊/逾時限制，將模型選擇器篩選為支援視覺的模型，
並公開視訊計數器。

AI 設定下的舊 Vision Bridge 卡片是新頁面的相容性連結；它不再擁有表單的第二份副本。媒體提供者也
將影像轉文字和語音轉文字工作流程連結到對應的 Modality
Bridge 標籤，而無需移除現有的語音轉文字遊樂場。

**自迴路准入繞過：** 當描述呼叫透過 OmniRoute 自己的
`/v1` 自迴路（非標準提供者模型）路由時，子請求會傳送
`x-omniroute-admission-bypass: internal` 並使用解析的
自迴路憑證進行驗證 — 在本機模式下為本機 `sk_omniroute` 哨兵，或
操作員配置的 `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` 環境變數鍵 (#1350)，因此
`REQUIRE_API_KEY=true` 部署仍可執行描述呼叫。繞過僅對這些確切的憑證有效，
因此外部客戶端無法使用標頭跳過准入。

舊版預設值位於 `src/shared/constants/visionBridgeDefaults.ts` 中；
新的模式/任務感知/快取預設值和設定解析器位於
`src/shared/constants/modalityBridgeDefaults.ts` 中。防護欄公開了
`deps` 建構函式選項，以便測試可以注入假的 `getSettings` 和
`callVisionModel` 實作。

### 音訊橋接器 (`audioBridge.ts`) — 模態橋接器 PR-3

在音訊聊天請求到達不接受音訊輸入的目標之前攔截它們。
它從不重新路由聊天請求：音訊部分透過現有的 OpenAI 相容多部分端點進行轉錄，
並且所選的聊天模型繼續使用文字轉錄。

流程：

1. 透過 `getResolvedModelCapabilities()` 解析 `supportsAudio`。明確的
   提供者註冊表元資料優先，然後是靜態模型元資料，然後是同步的
   `modalities_input`。未包含 `audio` 的宣告輸入清單為 `false`；沒有
   能力證據則為 `null`。`false` 和 `null` 都會啟用保守的橋接器，
   而 `true` 則會繞過它。
2. 解析 `modalityBridgeAudio*` 設定，並透過共用的 `detectMediaParts()`
   偵測器從每條訊息中提取可拼接的頂層音訊部分。支援的線路形狀是 OpenAI `input_audio`、`audio_url` 和
   `source.media_type: "audio/*"`。巢狀音訊會被偵測用於路由，但不會
   被拼接路徑移除。工作受 `modalityBridgeAudioMaxClips` 限制；
   後續部分保持不變。
3. 遵守配置的 `provider/model`，或讓 `selectAudioBridgeModel()` 按照
   穩定目錄順序遍歷 `AUDIO_TRANSCRIPTION_PROVIDERS`，並選擇第一個
   具有可用活動提供者憑證的模型。
4. `callAudioTranscription()` 將 base64/資料 URI 音訊轉換為多部分
   `file`，或透過僅限公開的出站防護（帶有 DNS 固定和 25 MB 限制）下載遠端 `audio_url`。
   然後它將檔案和選定的模型 POST 到本機 `/v1/audio/transcriptions` 自迴路，
   並使用 `resolveSelfLoopBearer()` 進行驗證。現有的轉錄路由執行正常的
   憑證查找、冷卻/速率限制處理和提供者分派。
5. 成功的呼叫將其部分替換為 `[Audio N]: <transcript>`。呼叫
   以 `Promise.allSettled` 執行：個別失敗會保留該原始
   音訊部分（#4012 合約）。如果所有呼叫都失敗且目標被證明
   `supportsAudio === false`，則部分變為
   `[Audio N]: (unavailable — no STT provider connected)`（#8430 合約）。對於
   未知目標 (`null`)，所有失敗結果保持不變。已證實的
   僅文字目標且沒有可用的 STT 憑證會收到相同的明確
   存根，而無需發出網路呼叫。

成功的轉錄使用進程範圍的 Modality Bridge LRU/TTL 快取。鍵組合了音訊參考、
穩定的 `audio-transcription` 操作標籤和選定的 STT 模型；失敗從不快取。
音訊嘗試會更新共用的 `bridged`、`cacheHits`、`failures` 和 `lastUsedAt` 計數器。
轉換後的回應攜帶
`x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`；未觸及的
請求不會收到音訊橋接器段。

執行時間設定由資料庫支援並經過 Zod 驗證：

| 鍵                            | 預設值  | 範圍          |
| ----------------------------- | ------- | ------------- |
| `modalityBridgeAudioEnabled`  | `true`  | —             |
| `modalityBridgeAudioModel`    | `""`    | 自動或 STT ID |
| `modalityBridgeAudioTimeout`  | `60000` | 1000–300000   |
| `modalityBridgeAudioMaxClips` | `3`     | 1–10          |

共用快取仍由 `modalityBridgeCacheEnabled`、
`modalityBridgeCacheTtlMinutes` 和 `modalityBridgeCacheMaxEntries` 控制。

### 視訊橋接器 (`videoBridge.ts`, `videoBridgePipeline.ts`)

攔截 Chat Completions `messages` 和 Responses API `input` 中的頂層影片部分，在呼叫沒有已知原生影片支援的目標之前。
支援的形狀包括 `input_video`、`video_url`、`video_source`、HTTPS URL，以及 `data:video/*;base64,...` 資料 URI。文字中的純檔案名稱不被視為影片。

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) 負責請求遍歷、能力/策略檢查、每個請求的聚合以及回應酬載。每個影片的工作——獲取、整體結果快取、描述影格序列（它融合了任何呼叫者聲明的音訊轉錄），以及每次嘗試的指標/中止/清理——都隱藏在 `videoBridgePipeline.ts` 中的 `processVideoPart` 後面，在 `preCall` 的循環中為每個影片部分呼叫一次。該模組還定義了明確的埠邊界 `VideoMediaBrokerPort`（獲取位元組並提取採樣影格）、`VideoAudioTranscriptionPort`（將呼叫者聲明的音訊轉錄與採樣字幕融合），以及 `VideoDrilldownPort`（影格鑽取持久性邊界；尚未連接到 `processVideoPart` — 目前只有獨立的 `/api/modality-bridge/video/drilldown` 路由寫入鑽取條目）。

公共 `/v1` 請求路徑從不導入或呼叫子進程。遠端影片下載限制為 50 MiB；內聯 base64 影片每個影片的解碼上限保守地設定為 36 MiB，以便模型/訊息/框架封裝可以保持在公共 JSON 請求准入限制 50 MiB 之內。在分配之前會檢查內聯長度和解碼大小估計。初始遠端 URL 和每次重定向都要求使用 HTTPS，並使用現有的僅限公共出站防護與 DNS 釘選。這些位元組隨後會跨越精確的內部 `POST /api/modality-bridge/video/extract` 代理邊界。該路由既是 `LOCAL_ONLY` 又是 `SPAWN_CAPABLE`，只接受每個進程經過身份驗證的、受信任的環回請求，並且從不接受 URL、檔案系統路徑、可執行檔或參數列表。API 主體大小管道和處理程序的增量主體讀取器獨立地強制執行 50 MiB 的代理輸入上限。其有界佇列一次運行一個提取，允許四個待處理作業，並將待處理輸入限制在 100 MiB。

在代理內部，`ffprobe` 讀取私有本地檔案；固定的格式允許列表排除了播放列表和清單格式。對於允許的 MOV 系列容器，外部 MOV 資料引用預設保持禁用狀態，並且固定命令不選擇啟用它們。`ffprobe` 和 `ffmpeg` 都使用僅限 `file` 的協議白名單、單一執行緒、固定參數陣列、無 shell，以及從 `PATH` 解析的可執行檔。附加圖片封面串流不是可播放的候選對象。所有可播放的串流都必須滿足限制，並且在確定性的最低索引回退之前，會優先選擇明確的預設串流。影片限制為 600 秒、每個維度 8,192 像素，以及 33,554,432 原始像素。FFmpeg 採樣 1–16 個中點 JPEG 影格，將長邊縮小到最多 1,024 像素，而不放大較小的輸入，並且從不接收 URL。採樣預設為 `uniform`。可選的 `scene_aware` 和實驗性的 `segment_aware` 策略會對已驗證的本地串流執行一次額外的固定 FFmpeg 遍歷，選擇有界的 `showinfo` 場景時間戳，並在檢測器故障、超時、格式錯誤的輸出或空候選集時確定性地回退到相同的均勻中點。片段感知模式根據已驗證的場景間隔按比例分配中點樣本；片段感知證據和回退行為詳見下文。在每種策略中，選擇後都會應用嚴格的 16 影格上限。當場景感知請求只有一個影格預算時，它會使用活動的完整影片或焦點視窗的均勻中點，並報告 `policyEffective: uniform`：單個選定的場景影格無法同時保留時間兩端。呼叫者可以選擇提供一個有限的焦點視窗（`start`/`end` 秒）；邊界會被限制在媒體持續時間內，反向或非有限的視窗會被拒絕，並且所有採樣策略都只在正規化區間內執行。結果視窗會包含在採樣元資料和不受信任的描述前綴中，以便下游模型可以區分焦點摘錄和完整時間軸。

語義字幕焦點是一個獨立的、明確的設定。預設的 `full` 分析模式會保留現有的影格提示，並且從不將請求文字轉發給字幕模型。在 `focused` 模式下，橋接器只從相同的 Chat 或 Responses 容器中讀取最新的非空使用者撰寫的 `text`/`input_text`，將其正規化為 NFC，折疊控制字元和空白字元，並將其限制為 500 個 Unicode 碼點。空結果會回退到精確的 `full` 提示。可用的提示會以 JSON 格式序列化在專用的不受信任使用者上下文區塊中，並且只能優先處理可觀察到的細節；它不能覆蓋關於不遵循媒體中可見或可聽指令的單獨警告。文字焦點從不推斷 `start`/`end` 或改變時間採樣器。

#### FU-07 結構片段證據

`segment_aware` 會對已驗證的本地影片串流執行一次有界的預分析遍歷。固定的濾波器鏈首先將寬度縮放到最多 320 像素，檢測場景變化和凍結間隔，然後以每秒 1 影格的速度採樣模糊、平均亮度以及空間/時間資訊。該遍歷限制為 600 個結構樣本、一個 FFmpeg/濾波器執行緒、相同的僅限 `file` 的協議和容器允許列表、1 MiB 的進程輸出限制，以及在代理的共享中止/截止時間內最多 30 秒。它從不接受來自請求的命令、濾波器、路徑或 URL。

結構值是確定性採樣證據，而非語義影片理解。它們不推斷主題、動作、字幕、語音或使用者意圖。場景和凍結邊界形成片段；凍結覆蓋範圍、模糊、曝光、空間細節和時間變化僅影響現有 1–16 幀預算的分配方式。完全凍結的片段上限為一幀，而非凍結片段則競爭剩餘預算。當邊界數量超過幀數時，會保留統一的時間軸覆蓋範圍，這樣快速的早期剪輯就無法隱藏長尾片段。凍結邊界 1 秒分析解析度內的場景邊界會被合併。

缺少篩選器、格式錯誤/空證據、偵測器錯誤或有界預分析逾時，都會開放至精確的統一中點策略。呼叫者中止或代理逾期不會開放：它會終止進行中的子程序，阻止後續的幀提取，並且私有臨時樹會在 `finally` 中移除。

`scripts/perf/video-bridge-fu07-eval.ts` 生成確定性的真實 FFmpeg 夾具，用於去重後字幕呼叫節省、密集運動預算分配、模糊/曝光/SI-TI 證據、帶長尾的快速剪輯以及漸變淡出誤報。它記錄預分析的實際運行時間，並且在 `/usr/bin/time` 可用時，記錄子程序 CPU 和峰值 RSS。它的品質檢查僅是結構性的預言機。真實字幕模型品質仍為 `HOLD`，因為此測試工具沒有授權端點或凍結的判斷標準。除非 `--caption-cost-per-call-usd` 提供明確的正向每次呼叫估計值，否則金錢節省也仍為 `HOLD`；該腳本從不捏造任何結果。

每幀限制為 4 MiB，所有原始幀總計限制為 23 MiB，序列化的代理回應限制為 32 MiB。私有臨時目錄會在 `finally` 中移除。OmniRoute 不捆綁 FFmpeg，也不接受自訂可執行檔路徑。在生成字幕之前，橋接器會應用保守的視覺去重處理：每個 JPEG 都會縮減為 16×16 灰度緩衝區，並且僅與保留的最後一幀進行比較。對於請求的字幕預算超過一幀的情況，提取會提供一個有界限的候選池，最多是該預算的兩倍，且永不超過 16 幀。請求的上限僅在去重後應用，當預算至少為兩幀時，在最終精簡過程中會保留第一個和最後一個選定的候選幀。版本化的 `grayscale-16x16-mean-cells-v2` 策略使用平均亮度差和正規化差值至少為 0.05 的縮圖單元格比例中的較大值。重複閾值是常數 0.04，選擇它是為了可預測性，而不是作為運行時設定公開。這種次要的高對比度訊號保留了僅平均值比較可能隱藏的小動作和可見文字變化。比較器或解碼器錯誤會開放並保持覆蓋範圍。輸出元數據會區分提取的候選幀、成功使用的幀和被丟棄的視覺重複幀。

明確標記的影片部分可能會請求帶時間戳的聯絡表。橋接器最多建立一個 4 欄、16 幀的 JPEG 網格。每個 512 像素的單元格都會將其來源時間戳燒錄到高對比度的底部條帶中，而相同的時間戳則保留在文字元數據中，以供下游關聯和審計。完整的 JPEG 仍限制在 32 MiB。如果 `sharp` 無法解碼或合成網格，橋接器會退回到單獨的 JPEG 幀；客戶端中止仍會透過工作表操作傳播。

晉升證據與合成組合微基準測試是刻意分開的。`scripts/perf/video-bridge-contact-sheet-eval.ts` 為真實的 OpenAI 相容視覺模型定義了一個帶有 schema 版本的 A/B 測試工具。它測量提供者報告的 token、端到端實際延遲（包括工作表組合）、模型呼叫次數以及清單定義的事實保留。原始模型回應不會寫入報告；僅保留 SHA-256 摘要和匹配的事實 ID。除非傳遞 `--execute-real` 且配置了 `--model`、`OMNIROUTE_BASE_URL` 和 `OMNIROUTE_API_KEY`，否則該測試工具不會進行網路或付費模型呼叫。如果沒有明確的實際運行，其機器可讀的判斷結果仍為 `HOLD`；單獨的合成負載/呼叫次數測量並非晉升證據。

呼叫者可以在已擁有對齊文本時，將可選的 `transcript.cues` 陣列附加到受支援的影片部分。每個提示必須包含 `text`、探測持續時間內的有限 `start`/`end` 間隔，以及白名單中的 `source` (`client`、`embedded` 或 `audio-bridge`)；`confidence` 預設為 `1`，且必須介於 `0` 和 `1` 之間。完全重複的提示會被合併。OmniRoute 從不從此元數據開始轉錄：經過驗證的提示會連同來源、置信度和間隔一起複製到描述的結果中，並作為不可信的觀察結果與幀字幕一起呈現。無效、超出範圍或無來源的文本會被拒絕，而不是混入字幕流中。`source` 欄位目前由呼叫者聲明，而非伺服器驗證：OmniRoute 強制該值為三個允許字串之一，但尚未以加密方式確認 `embedded` 或 `audio-bridge` 標籤確實來自伺服器擁有的提取。在該驗證實施之前，請將 `source` 視為不可信的提示；不要以此建立授權決策。

高級呼叫者可以為同一影片提供一個已授權的 `audioTranscript` 軌道。融合接縫在一個截止日期和中止訊號下運行視覺和音訊觀察，將它們按共同時間軸排序，合併完全重複的項目，並在只有一方成功時報告部分結果。無效的 `audioTranscript` 會降級為該部分結果 — 視覺描述會被保留，音訊分支會記錄一個已淨化的失敗代碼 — 而不是使整個影片失敗。每個分支的可用性、部分標誌和已淨化的失敗代碼都保留在描述的結果中、防護欄元數據（`audioFusionRuns`/`audioFusionPartials`/`audioFusionFailureCodes`）中、結果快取元數據中，以及橋接融合計數器中。預設的視訊橋接路徑不會呼叫語音轉文字或下載第二份媒體副本；如果沒有該明確軌道，它將保持僅限視訊。

**文字記錄保留（#12150 P1）。** 這會在視訊橋接（本身是選擇加入的）呈現文字記錄提示時自動應用 — 沒有單獨的保留標誌。當請求呈現任何文字記錄提示（呼叫者聲明的 `transcript` 或融合的 `audioTranscript`）時，防護欄會將其標記為 `videoBridgeObserved`，並產生視訊描述的編輯陰影 — 一個相同的呈現，其中每個提示的自由文本主體都被 `[redacted-video-transcript]` 取代，這是透過在字串組裝之前替換結構化提示欄位來建構的（絕不是透過解析扁平化文本，因此沒有任何提示內容 — 無論是惡意的還是普通的，包括包含 `]` 的主體，例如 `[inaudible]` / `[music]` — 可以倖存）。持久的呼叫日誌請求主體會將每個視訊衍生的文本部分替換為該編輯陰影，透過內容相等性進行匹配；`fullText` 錨點會從完成的預呼叫防護欄負載中重新讀取，因此在後續鏈式防護欄（PII 和憑證遮罩器，優先級 10/95）就地重寫描述文本之後，以及在系統提示/交接/記憶體注入重塑訊息陣列之後，匹配仍然成功。發送到模型上游的主體保持不變。觀察到的請求也不會填充任何持久記憶體（請求和回應衍生的提取都會被跳過），因此模型自己的回覆無法將文字記錄文本回顯到記憶體中。

額外保留的副本使用相同的觀察請求訊號。原始的預防護欄客戶端請求快照、記憶體中的待處理請求以及早期被拒絕的請求日誌會在視訊部分中結構性地替換文字記錄欄位；由管道階段和上下文交接合成的字串提示會在持久化請求主體接收器處被編輯。持久的 `video_content_removed` 標記會使 `previous_response_id` 續接失敗關閉，而不是重建被有意丟棄的文本。如果觀察到的請求在日誌記錄之前丟失了其每個部分的編輯陰影，或者即使幾個視訊陰影中的一個在後續請求變異後未能匹配，則保留的請求主體將完全被省略，而不是保留部分編輯的文字記錄。

對於觀察到的請求，模型回應可能會引用文字記錄的任何部分，而沒有結構化的提示邊界。因此，其持久化的呼叫日誌 `responseBody` 會被一個省略標記取代；詳細的管道工件（可能包括上游/客戶端主體和串流區塊）不會被保留。語義、冪等性和推理重播快取會繞過該請求的讀寫操作。提供者請求和客戶端可見的回應保持不變。當詳細工件被省略時，早期的保持連接位元組會從臨時緩衝區中排出。Kiro 的格式錯誤 EventStream 警告只報告負載的位元組計數，從不報告其內容或 JSON 解析器的原始錯誤。這並不聲稱每個不相關的提供者/插件診斷都已審核；更廣泛的保留接收器掃描在 #11658 中追蹤。

內部 `/api/modality-bridge/video/drilldown` 生命週期是一個獨立的、迴路/令牌認證的快取基底。每個操作還需要一個規範的不透明主體 ID。在啟用生產呼叫者之前，它必須從已認證的租戶中派生該 ID，並且絕不能轉發客戶端選擇的值。快取鍵將該主體綁定到規範的會話和視訊參考 ID，僅儲存其 SHA-256 派生的鍵，並將讀取和刪除的範圍限定在同一主體。快取每個條目最多儲存 16 個派生的 JPEG 幀，在十分鐘後使其過期，並支援有界限的 `start`/`end` 讀取或明確的會話刪除。

每個主體限制為 16 個條目和 64 MiB 的規範 JPEG 資料。這些限制獨立於全球 64 個條目/256 MiB 的上限：主體配額壓力只會驅逐該主體最近最少使用的條目，然後才會考慮全球 LRU 驅逐。過期條目會在快取活動時從主體和全球帳戶中清除，而取消和驗證失敗不會提交部分替換。

快取會拒絕非規範的 Base64、過多的填充、非 JPEG 媒體、格式錯誤或截斷的 JPEG，以及在有界限的全圖像 `sharp` 解碼期間產生警告的 JPEG。它會將每個接受的圖像重新編碼為規範的 JPEG，從解碼的位元組中派生寬度和高度，而不是信任呼叫者欄位，並丟棄任何尾隨的多語言位元組而不是保留它們。只有有界限的規範壓縮緩衝區會計入兩個配額。JSON 線路限制包括 32 MiB 解碼輸入上限的 Base64 開銷。每個儲存的派生都會記錄其已驗證的 JPEG 格式/解析度、採樣策略、派生版本、建立時間、伺服器計算的內容雜湊，以及雜湊的父參考加上受信任呼叫者的父內容雜湊。在原子快取提交之前，會在非同步解碼/雜湊階段之間檢查取消。

此批次尚未將生產者連接到路由，也未提供多解析度變體選擇。因此，透明的視訊橋接請求路徑不會產生額外工作，而租戶綁定的主體派生和完整的 FU-08 多解析度生命週期仍是明確的後續工作，而非已完成的行為。

影格會使用已配置的視訊模型依序加上字幕。空的視訊覆寫會繼承 Vision 設定；如果兩者都為空，Vision 自動路由器會選擇有效的具備視覺功能的模型。成功的字幕會將原始部分替換為穩定的 `[Video description:` 前綴，該前綴也將文字標記為不可信賴的媒體衍生觀察結果，並告知下游模型不要遵循媒體中找到的指令。影格字幕快取鍵包含 JPEG 位元組、提示、時間戳記和有效模型；只有成功的字幕會被快取。快取條目會保留實際成功的生產者模型，包括備用模型；當不同影格由不同模型產生時，橋接器會報告 `mixed`。快取命中會重複使用該生產者身份，而不是將其重新標記為請求的路由計畫。整個視訊的結果快取會根據所有會改變輸出的輸入進行鍵控 — 提示、有效模型、取樣策略、影格計數、語義分析模式、正規化焦點提示的 SHA-256 指紋、焦點視窗、`transcript`、`audioTranscript` 和聯絡表標誌 — 因此，更改這些維度中的任何一個都會導致快取未命中，絕不會是過時的重複使用。視覺去重策略版本、閾值和有界候選影格計數也明確地包含在結果快取鍵和中繼資料中；因此，策略變更無法重複使用過時的整個視訊描述。結果快取 v4 中繼資料保留模式和指紋，絕不保留原始使用者任務。防護欄中繼資料會報告請求和有效的分析模式；如果請求的 `focused` 模式沒有可用的使用者文字，則會報告為實際上是 `full`。

防護欄會提取所有支援的視訊部分，但描述的數量不超過 `modalityBridgeVideoMaxVideos`。對於經證實 `supportsVideo === false` 的目標，失敗和超出限制的視訊會變成明確的安全文字標記，因此不會有原始視訊存留。當功能未知時，這些部分保持不變。`supportsVideo === true` 的目標會繞過橋接器。客戶端請求中止訊號會透過下載、代理佇列、子程序和字幕呼叫傳播；中止會在視訊之間停止，絕不會開放給原始媒體而失敗。

執行時設定由資料庫支援並經過 Zod 驗證：

| Key                                 | Default     | Range / behavior                                                              |
| :---------------------------------- | :---------- | :---------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`     | 可選的執行時，選擇啟用                                                        |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | `full` 保留通用字幕；`focused` 使用有界、不可信賴的最新使用者上下文           |
| `modalityBridgeVideoModel`          | `""`        | 繼承 Vision Bridge 模型                                                       |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                          |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`、`scene_aware` 或比例 `segment_aware`；偵測器失敗時回退到 `uniform` |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                           |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000–120000 毫秒                                                              |

超過 120 秒的舊版持久化視訊逾時值會被限制在代理截止時間；超過該限制的新設定寫入將被拒絕。`GET /api/modality-bridge/video/runtime` 在身份驗證或執行時探測之前需要受信任的加蓋回送本地性，然後需要管理員身份驗證。它僅在執行時不可用時返回 `available`、已淨化的 FFmpeg/ffprobe 版本以及一個固定原因。內部提取端點不是公共上傳 API：佇列飽和會返回 `503` 加上 `Retry-After`，呼叫者斷開連接會返回 `499`，固定的代理截止時間會返回 `504`。轉換後的回應會將 `video->text;model=<visionModel>;parts=<videos>` 添加到中央 `x-omniroute-modality-bridge` 標頭中，而不會移除 Vision 或 Audio 片段。

### PII 遮罩器 (`piiMasker.ts`)

在**兩個**階段執行。

- **`preCall`** 會複製酬載，遍歷 `system`、`messages`、`input` 和 `prompt`（包括純字串項目），並將 `processPII()`（來自 `@/shared/utils/inputSanitizer`）應用於字串 `content`/`text` 欄位。當 `PII_REDACTION_ENABLED=true` 時，偵測到的 PII 會在出站酬載中被遮蔽。這與 `INPUT_SANITIZER_MODE`（僅控制提示注入策略）無關。當遮蔽關閉時，呼叫會記錄偵測計數而不重寫內容。
- **`postCall`** 會深度複製回應，執行 `sanitizePIIResponse()` 以及 Responses-API 形狀遮罩器（`maskResponsesOutput` — 涵蓋 `output_text` 和 `output[].content[].text`）。如果發生任何遮蔽，修改後的回應會替換原始回應。

防護欄從不阻塞；它只會註釋（`meta.detections`、`meta.redacted`）或重寫。

### 提示注入 (`promptInjection.ts`)

偵測使用者提供內容中的對抗性結構並強制執行已配置的策略。行為由環境變數和建構函式選項驅動：

| 設定     | 環境變數                                                                                           | 預設值 | 效果                                                                                                                                     |
| -------- | -------------------------------------------------------------------------------------------------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| 已啟用   | `INPUT_SANITIZER_ENABLED`                                                                          | `true` | 當為 `false` 時，防護欄會短路。                                                                                                          |
| 模式     | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                    | `warn` | 注入策略：`block`、`warn` 或 `log`。（`redact` 為向後兼容而接受，但**不會**移除注入文本；PII 重寫請求由 `PII_REDACTION_ENABLED` 控制。） |
| 阻擋閾值 | `blockThreshold` 選項 / `INPUT_SANITIZER_BLOCK_THRESHOLD` (別名 `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high` | 阻擋所需的最低嚴重性。預設情況下，中等嚴重性僅供觀察。                                                                                   |

**模式優先順序** (`getMode`)：呼叫者 `options.mode` →
`INJECTION_GUARD_MODE` **資料庫功能旗標覆寫** (儀表板 → 設定 →
功能旗標) → `INJECTION_GUARD_MODE` 環境變數 → `INPUT_SANITIZER_MODE` 環境變數 →
`warn`。因此，儀表板覆寫會優先於環境變數，所以功能旗標 UI 會即時控制運行的防護（無需重啟）。資料庫讀取是故障安全的：如果出錯，防護會回退到基於環境變數的行為；如果未設定覆寫，行為與僅基於環境變數的解析相同。

偵測來源：

1.  來自 `@/shared/utils/inputSanitizer` 的 `sanitizeRequest()`（在管道其他地方使用的共享偵測器集）。
2.  內建的 `DEFAULT_GUARD_PATTERNS`（目前為 `system_override_inline` 和
    `markdown_system_block`，兩者均為 `high` 嚴重性）。
3.  透過建構函數選項傳遞的可選 `customPatterns`（字串、正規表達式或
    `{ name, pattern, severity }` 記錄）。

當 `mode === "block"` **且**至少一個偵測達到嚴重性閾值時，`preCall` 會返回 `{ block: true, message: "Request rejected:
suspicious content detected" }`。在 `warn`/`log` 模式下，防護欄會記錄日誌但允許呼叫。共享輔助函數 `evaluatePromptInjection()` 也被導出，供需要評估提示而無需透過註冊表（registry）的呼叫者使用。

**掃描範圍 (v3.8.20)**：偵測器僅檢查合併提示文本的**前 16 KB** —
在 `src/shared/utils/inputSanitizer.ts` 中為 `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 位元組)。`detectInjection()` 和
`evaluatePromptInjection()` 在運行模式循環之前都會 `slice(0, MAX_INJECTION_SCAN_BYTES)`。注入指令位於輸入的頂部附近，因此這可以在數百 KB 的負載上限制正規表達式 CPU/GC，而不會削弱偵測能力（參見 #3932, #4041）。

### 憑證遮罩器 (`credentialMasker.ts`)

在**兩個**階段運行，是預設鏈中的最後一個（優先級 `95`）。從出站負載（訊息內容、工具呼叫參數、工具結果）**和**提供者回應中編輯掉眾所周知的 API 密鑰/秘密令牌模式，因此貼到提示中（或由工具結果回顯）的憑證不會洩露給上游提供者或返回給客戶端。

- **僅限選擇啟用**，與 PII 編輯的約定相同（硬性規則 #20 相關）：除非
  `settings.credentialRedactionEnabled === true` **或**
  `CREDENTIAL_REDACTION_ENABLED=true`，否則禁用。如果關閉，防護欄將不執行任何操作 —
  它從不阻擋，也從不重寫。
- `redactCredentials()` 遍歷完整的負載/回應樹（`walkValue()`，原型污染安全，透過
  `WeakSet` 實現循環安全），並將匹配項替換為 `[REDACTED:<type>]` 佔位符，僅複製實際更改的分支。
- `CREDENTIAL_PATTERNS` 涵蓋了 LLM 提供者密鑰（OpenAI、OpenAI-proj、
  Anthropic、Google、Hugging Face、Replicate）、VCS/SaaS 令牌（GitHub、Slack、
  Linear、Notion、npm、Postman、Discord）、支付密鑰（Stripe、Square）、雲密鑰（AWS 存取密鑰、Twilio、SendGrid、Mailgun）、私鑰/JWTs、帶有憑證的連接字串（`mongodb://user:pass@...`
  等），以及通用的 `Authorization`/`x-api-key`/`api-key`/`apikey` 標頭值模式。標頭形狀的密鑰（`authorization`、`x-api-key`、`api-key`、
  `apikey`）是結構性地編輯（僅值，保留 `Bearer `/`Basic ` 等方案前綴），而不是透過通用文本正規表達式。
- 防護欄從不阻擋；它只重寫（`modifiedPayload` /
  `modifiedResponse`）並註釋（`meta.credentialsRedacted`、`meta.count`）。

回歸防護：`tests/unit/credential-masker-guardrail.test.ts`。

## 基礎契約（`base.ts`）

```typescript
class BaseGuardrail {
  enabled: boolean;
  name: string;
  priority: number;

  constructor(name: string, options?: { enabled?: boolean; priority?: number });

  async preCall(payload: unknown, context: GuardrailContext): Promise<GuardrailResult | void>;

  async postCall(response: unknown, context: GuardrailContext): Promise<GuardrailResult | void>;
}

interface GuardrailResult<TValue = unknown> {
  block?: boolean; // true 會使鏈結短路
  message?: string; // 阻擋時顯示
  meta?: Record<string, unknown> | null;
  modifiedPayload?: TValue; // 由 preCall 傳回以重寫請求
  modifiedResponse?: TValue; // 由 postCall 傳回以重寫回應
}

interface GuardrailContext {
  apiKeyInfo?: Record<string, unknown> | null;
  disabledGuardrails?: string[] | null;
  endpoint?: string | null;
  headers?: Headers | Record<string, unknown> | null;
  log?: GuardrailLog | Console | null;
  method?: string | null;
  model?: string | null;
  provider?: string | null;
  signal?: AbortSignal;
  sourceFormat?: string | null;
  stream?: boolean;
  targetFormat?: string | null;
}
```

防護欄可透過傳回 `void`、`{}` 或 `{ block: false }` 來表示「無變更」。傳回 `modifiedPayload`/`modifiedResponse` 會取代沿著鏈結傳遞給下游防護欄的值。
`signal?: AbortSignal` 會將呼叫端的生命週期帶入防護欄。請求中止是刻意設計的開放式失敗例外：媒體橋接器會停止工作並執行清理，而不會將原始媒體還原至已知不支援該媒體的目標。

## 登錄檔（`registry.ts`）

單例 `guardrailRegistry` 提供：

- `register(guardrail)` — 新增防護欄（或依正規化名稱取代現有防護欄），並依 `priority` 升冪重新排序。
- `clear()` / `list()` — 管理輔助方法。
- `runPreCallHooks(payload, context)` — 逐一執行啟用中的防護欄，透過 `modifiedPayload` 傳遞酬載，並在第一個 `block: true` 時停止。
- `runPostCallHooks(response, context)` — 在回應端執行相同流程。
- `resetGuardrailsForTests({ registerDefaults })` — 清除狀態，並可選擇重新註冊預設防護欄，以確保測試彼此完全隔離。

兩個執行器都會傳回 `{ blocked, payload|response, results, guardrail?, message? }`，其中 `results` 是 `GuardrailExecutionResult` 記錄陣列，包含每個防護欄的 `blocked`、`skipped`、`modified`、`error` 與 `meta` 欄位，便於追蹤。

### 針對個別請求停用防護欄

`resolveDisabledGuardrails({ apiKeyInfo, body, headers })` 會彙整目前請求中應略過的防護欄名稱，並移除重複項目。來源如下（全部皆為選用，且會全部合併）：

- `apiKeyInfo.disabledGuardrails`
- 請求主體的 `disabledGuardrails`（頂層）
- 請求主體的 `metadata.disabledGuardrails`
- 標頭 `x-omniroute-disabled-guardrails`（或舊版
  `x-disabled-guardrails`）

值可以是字串陣列或以逗號分隔的字串；名稱會正規化為小寫 kebab-case（`pii_masker` → `pii-masker`）。結果會透過 `context.disabledGuardrails` 傳遞至登錄檔，登錄檔會略過相符的防護欄（在 `results` 中標記為 `skipped: true`）。

## 執行順序

對於每個流經 `src/sse/handlers/chat.ts` 和
`open-sse/handlers/chatCore.ts` 的請求：

1. `resolveDisabledGuardrails(...)` 根據 API 金鑰、請求本文和標頭建立略過清單。
2. `guardrailRegistry.runPreCallHooks(body, ctx)` 依優先順序由低至高執行護欄：
   - 停用的護欄會被記錄為 `skipped`。
   - 每個護欄的 `preCall` 都可以透過 `modifiedPayload` 改寫承載資料。
   - 第一個 `block: true` 會使鏈結短路，處理常式會傳回護欄拒絕回應。
3. （可能已改寫的）承載資料會進入組合路由及上游分派。
4. 組合回應後，`guardrailRegistry.runPostCallHooks(...)`
   會對回應執行相同的鏈結。此處的 `block: true` 會捨棄上游回應。

擲回例外的護欄會以 `error: <message>` 記錄，並透過
`logger.warn` 寫入日誌，但鏈結仍會繼續執行——此設計採用失敗開放原則。

## 組態

內建護欄所讀取的環境變數：

| 變數                                  | 使用者               | 效果                                                                   |
| ------------------------------------- | -------------------- | ---------------------------------------------------------------------- |
| `INPUT_SANITIZER_ENABLED`             | `prompt-injection`   | 設為 `false` 可完全停用偵測。                                          |
| `INPUT_SANITIZER_MODE`                | `prompt-injection`   | 注入政策：`warn`、`block` 或 `log`。舊版值 `redact` 不會改寫注入文字。 |
| `INJECTION_GUARD_MODE`                | `prompt-injection`   | 注入護欄的模式；同時也是會**覆寫**環境變數的 DB 功能旗標（DB > ENV）。 |
| `INPUT_SANITIZER_BLOCK_THRESHOLD`     | `prompt-injection`   | `MODE=block` 拒絕請求的最低嚴重性：`high`（預設）、`medium` 或 `low`。 |
| `INJECTION_GUARD_BLOCK_THRESHOLD`     | `prompt-injection`   | `INPUT_SANITIZER_BLOCK_THRESHOLD` 的舊版別名。                         |
| `PII_REDACTION_ENABLED`               | `pii-masker`         | 設為 `true` 時，將遮蔽請求中的 PII（與注入模式無關）。                 |
| `PII_RESPONSE_SANITIZATION` / `_MODE` | `pii-masker`（下游） | 控制回應端遮蔽器的行為。                                               |

Modality Bridge 護欄會從由 DB 支援的設定儲存區（`getSettings()`）讀取執行階段組態，而非環境變數。Vision 的主要鍵為
`modalityBridgeVisionEnabled`、`modalityBridgeVisionMode`、
`modalityBridgeVisionModel`、`modalityBridgeVisionTaskAware`、
`modalityBridgeVisionPrompt`、`modalityBridgeVisionTimeout`、
`modalityBridgeVisionMaxImages`、`modalityBridgeVisionMaxChars`、
`modalityBridgeCacheEnabled`、`modalityBridgeCacheTtlMinutes` 和
`modalityBridgeCacheMaxEntries`。舊版
`visionBridge*` 鍵僅作為文件所述、為期一個週期的讀取後備方案；儀表板寫入時會使用主要鍵。預設值和後備解析器位於 `src/shared/constants/modalityBridgeDefaults.ts`，舊版常數則保留於 `src/shared/constants/visionBridgeDefaults.ts`。

Audio 使用 `modalityBridgeAudioEnabled`、`modalityBridgeAudioModel`、
`modalityBridgeAudioTimeout` 和 `modalityBridgeAudioMaxClips`，並搭配共用的
`modalityBridgeCache*` 設定。Audio 沒有舊版鍵後備方案，因為這些鍵是隨 Modality Bridge 結構描述一同引入的。

Video 使用 `modalityBridgeVideoEnabled`、`modalityBridgeVideoAnalysisMode`、
`modalityBridgeVideoModel`、
`modalityBridgeVideoFrameCount`、`modalityBridgeVideoSamplingPolicy`、
`modalityBridgeVideoMaxVideos` 和
`modalityBridgeVideoTimeout`，並搭配共用的 `modalityBridgeCache*` 設定。
其預設為停用，因為 FFmpeg/ffprobe 是選用的作業相依項目，而且畫面字幕生成會增加延遲和模型成本。

## 自訂護欄

```typescript
import { BaseGuardrail, guardrailRegistry } from "@/lib/guardrails";

class BudgetGuardrail extends BaseGuardrail {
  constructor() {
    super("budget", { priority: 50 });
  }

  async preCall(payload, ctx) {
    if (ctx.apiKeyInfo?.budgetExceeded) {
      return { block: true, message: "Daily budget exceeded" };
    }
    return { block: false };
  }
}

guardrailRegistry.register(new BudgetGuardrail());
```

步驟：

1. 建立繼承 `BaseGuardrail` 的 `src/lib/guardrails/myGuardrail.ts`。
2. 實作 `preCall` 和／或 `postCall`。
3. 可在匯入時註冊（從 `registerDefaultGuardrails` 推送），或在執行階段
   呼叫 `guardrailRegistry.register(...)`——登錄檔會取代任何具有相同正規化名稱的
   既有護欄。
4. 在 `tests/unit/` 下新增測試（現有範例：
   `tests/unit/guardrails-registry.test.ts`、
   `tests/unit/prompt-injection-guard.test.ts`、
   `tests/unit/guardrails/visionBridge.test.ts`）。

## 測試

在各測試之間使用 `resetGuardrailsForTests()`，以從已知狀態開始。
傳入 `{ registerDefaults: false }` 可從空白登錄檔開始，並僅註冊受測護欄。
Vision Bridge 支援相依性注入（`deps.getSettings`、`deps.callVisionModel`）；
Audio Bridge 則公開用於設定、功能、STT 模型選擇、憑證檢查及轉錄的
對等介面。因此，測試可在不存取資料庫或網路的情況下執行這兩種流程。

## 另請參閱

- `src/lib/guardrails/` — 實作
- `src/shared/utils/inputSanitizer.ts` — 支援提示注入偵測與 PII 遮蔽的共用偵測器
- `src/shared/constants/visionBridgeDefaults.ts` — Vision Bridge 預設值及
  強制橋接模型清單
- `src/shared/constants/modalityBridgeDefaults.ts` — 共用的 Vision/Audio 執行階段預設值
- `docs/architecture/RESILIENCE_GUIDE.md` — 正交層（斷路器、冷卻時間）
- `docs/reference/ENVIRONMENT.md` — 完整環境變數參考

## 注入護欄的路由涵蓋範圍與紅隊測試（第 8 階段 · 區塊 D）

注入護欄（`createInjectionGuard` / `withInjectionGuard`）涵蓋所有
接受使用者提示的路由。它遵循 `INJECTION_GUARD_MODE`（預設為 `warn` = 僅記錄；
`block` = 傳回 HTTP 400 `SECURITY_001`）。

| 類型         | 路由                                                                                                                                                 | 預設模式 |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| 文字（既有） | `/v1/chat/completions`, `/v1/completions`, `/v1/relay/chat/completions`                                                                              | warn     |
| 生成式       | `/v1/messages`, `/v1/responses`, `/v1/images/generations`, `/v1/images/edits`, `/v1/videos/generations`, `/v1/music/generations`, `/v1/audio/speech` | warn     |
| 資料         | `/v1/embeddings`, `/v1/rerank`, `/v1/search`, `/v1/moderations`                                                                                      | warn     |

文字擷取（`extractMessageContents`）涵蓋 `messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system`。

**紅隊測試（每晚執行，`nightly-llm-security.yml`）：** promptfoo 會驗證每個路由在
`INJECTION_GUARD_MODE=block` 下皆會封鎖 OWASP-LLM 語料庫；garak 則執行探測
（沒有密鑰時跳過）。為維持一致性，`moderations` 也包含在內——使用封鎖模式的
運維人員可透過 `resolveDisabledGuardrails` 將其豁免。

每晚執行的工作流程（`.github/workflows/nightly-llm-security.yml`，cron + 手動
觸發）包含兩個作業：

- **`promptfoo-guard`（阻斷性）**——使用 `INJECTION_GUARD_MODE=block`
  執行 `promptfoo eval -c promptfooconfig.yaml`。每個對抗性案例（例如「忽略所有
  先前指示……」、DAN 風格越獄）都會斷言回應包含
  `error.code === "SECURITY_001"`，也就是護欄確實拒絕了該請求。
- **`garak`（建議性）**——針對本機 OmniRoute 執行個體
  （`http://localhost:20128/v1`）執行 garak `--probes promptinject,dan,leakreplay`。
  此作業以提供者密鑰（`PROMPTFOO_PROVIDER_KEY`）作為執行條件；若無密鑰則妥善跳過，
  並加上 `|| true` 後綴，因此它只會回報結果，而不會導致 CI 失敗。

護欄輔助函式（`createInjectionGuard` / `withInjectionGuard`）的涵蓋範圍
包括每個含提示內容的 `/v1` 路由；提示文字由
`src/shared/utils/inputSanitizer.ts` 中的 `extractMessageContents()` 從
`messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system`
擷取。
