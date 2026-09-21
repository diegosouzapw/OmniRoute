# Guardrails (中文 (繁體))

🌐 **Languages:** 🇺🇸 [English](../../../../security/GUARDRAILS.md) · 🇪🇹 [am](../../../am/docs/security/GUARDRAILS.md) · 🇸🇦 [ar](../../../ar/docs/security/GUARDRAILS.md) · 🇦🇿 [az](../../../az/docs/security/GUARDRAILS.md) · 🇧🇬 [bg](../../../bg/docs/security/GUARDRAILS.md) · 🇧🇩 [bn](../../../bn/docs/security/GUARDRAILS.md) · 🇨🇿 [cs](../../../cs/docs/security/GUARDRAILS.md) · 🇩🇰 [da](../../../da/docs/security/GUARDRAILS.md) · 🇩🇪 [de](../../../de/docs/security/GUARDRAILS.md) · 🇬🇷 [el](../../../el/docs/security/GUARDRAILS.md) · 🇪🇸 [es](../../../es/docs/security/GUARDRAILS.md) · 🇪🇪 [et](../../../et/docs/security/GUARDRAILS.md) · 🇮🇷 [fa](../../../fa/docs/security/GUARDRAILS.md) · 🇫🇮 [fi](../../../fi/docs/security/GUARDRAILS.md) · 🇫🇷 [fr](../../../fr/docs/security/GUARDRAILS.md) · 🇮🇪 [ga](../../../ga/docs/security/GUARDRAILS.md) · 🇮🇳 [gu](../../../gu/docs/security/GUARDRAILS.md) · 🇳🇬 [ha](../../../ha/docs/security/GUARDRAILS.md) · 🇮🇱 [he](../../../he/docs/security/GUARDRAILS.md) · 🇮🇳 [hi](../../../hi/docs/security/GUARDRAILS.md) · 🇭🇷 [hr](../../../hr/docs/security/GUARDRAILS.md) · 🇭🇺 [hu](../../../hu/docs/security/GUARDRAILS.md) · 🇦🇲 [hy](../../../hy/docs/security/GUARDRAILS.md) · 🇮🇩 [id](../../../id/docs/security/GUARDRAILS.md) · 🇳🇬 [ig](../../../ig/docs/security/GUARDRAILS.md) · 🇮🇹 [it](../../../it/docs/security/GUARDRAILS.md) · 🇯🇵 [ja](../../../ja/docs/security/GUARDRAILS.md) · 🇬🇪 [ka](../../../ka/docs/security/GUARDRAILS.md) · 🇰🇭 [km](../../../km/docs/security/GUARDRAILS.md) · 🇮🇳 [kn](../../../kn/docs/security/GUARDRAILS.md) · 🇰🇷 [ko](../../../ko/docs/security/GUARDRAILS.md) · 🇱🇹 [lt](../../../lt/docs/security/GUARDRAILS.md) · 🇱🇻 [lv](../../../lv/docs/security/GUARDRAILS.md) · 🇮🇳 [ml](../../../ml/docs/security/GUARDRAILS.md) · 🇮🇳 [mr](../../../mr/docs/security/GUARDRAILS.md) · 🇲🇾 [ms](../../../ms/docs/security/GUARDRAILS.md) · 🇲🇹 [mt](../../../mt/docs/security/GUARDRAILS.md) · 🇲🇲 [my](../../../my/docs/security/GUARDRAILS.md) · 🇳🇵 [ne](../../../ne/docs/security/GUARDRAILS.md) · 🇳🇱 [nl](../../../nl/docs/security/GUARDRAILS.md) · 🇳🇴 [no](../../../no/docs/security/GUARDRAILS.md) · 🇮🇳 [or](../../../or/docs/security/GUARDRAILS.md) · 🇮🇳 [pa](../../../pa/docs/security/GUARDRAILS.md) · 🇵🇭 [phi](../../../phi/docs/security/GUARDRAILS.md) · 🇵🇱 [pl](../../../pl/docs/security/GUARDRAILS.md) · 🇵🇹 [pt](../../../pt/docs/security/GUARDRAILS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/GUARDRAILS.md) · 🇷🇴 [ro](../../../ro/docs/security/GUARDRAILS.md) · 🇷🇺 [ru](../../../ru/docs/security/GUARDRAILS.md) · 🇱🇰 [si](../../../si/docs/security/GUARDRAILS.md) · 🇸🇰 [sk](../../../sk/docs/security/GUARDRAILS.md) · 🇸🇮 [sl](../../../sl/docs/security/GUARDRAILS.md) · 🇷🇸 [sr](../../../sr/docs/security/GUARDRAILS.md) · 🇸🇪 [sv](../../../sv/docs/security/GUARDRAILS.md) · 🇰🇪 [sw](../../../sw/docs/security/GUARDRAILS.md) · 🇮🇳 [ta](../../../ta/docs/security/GUARDRAILS.md) · 🇮🇳 [te](../../../te/docs/security/GUARDRAILS.md) · 🇹🇭 [th](../../../th/docs/security/GUARDRAILS.md) · 🇹🇷 [tr](../../../tr/docs/security/GUARDRAILS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/GUARDRAILS.md) · 🇵🇰 [ur](../../../ur/docs/security/GUARDRAILS.md) · 🇺🇿 [uz](../../../uz/docs/security/GUARDRAILS.md) · 🇻🇳 [vi](../../../vi/docs/security/GUARDRAILS.md) · 🇳🇬 [yo](../../../yo/docs/security/GUARDRAILS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/GUARDRAILS.md)

---

> **事實來源：** `src/lib/guardrails/`
> **上次更新：** 2026-08-29 — v3.8.51（Video Bridge 逐字稿來源由呼叫端宣告，
> 尚未由伺服器驗證 — 已依 #11661 釐清）

護欄會在 OmniRoute 與上游提供者之間的邊界強制執行安全、政策及內容轉換。每個護欄都可以檢查請求承載資料（`preCall`）和上游回應（`postCall`），並可選擇拒絕、轉換或註解這些內容。

系統採用**失敗時開放**機制：如果護欄在執行期間擲出例外，登錄檔會記錄錯誤並繼續執行下一個護欄，而不會讓請求失敗。封鎖一律是明確的決定（`block: true`），絕不會因意外而發生。

## 內建護欄

登錄檔會在匯入時依優先順序自動載入六個護欄
（請參閱 `registry.ts` → `registerDefaultGuardrails()`）：

| 優先順序 | 名稱                | 階段           | 檔案                  |
| -------- | ------------------- | -------------- | --------------------- |
| `5`      | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`      | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`      | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`     | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`     | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`     | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

優先順序數字較小者會**先**執行。

### Vision Bridge（`visionBridge.ts`）— 模態橋接 PR-1

攔截傳送至**非視覺模型**且包含影像的請求，並在呼叫上游之前，將整個請求重新路由至支援視覺的模型，或以可設定的視覺模型所產生的文字描述取代影像部分。如此可讓純文字提供者透明地處理多模態承載資料。

流程：

1. 如果目標模型已支援視覺，則略過（除非它出現在強制橋接清單 `isVisionBridgeForcedModel` 中）。
2. 透過 `extractImageParts(messages)`（`visionBridgeHelpers.ts`）擷取影像部分；該函式會委派給 `open-sse/utils/mediaParts.ts` 中的**統一媒體偵測器** `detectMediaParts()`，後者是與組合相容性篩選器共用的唯一事實來源。擷取僅允許 `replaceImageParts` 可拼接回去的頂層部分形態（擷取↔取代契約）：OpenAI `image_url`、Anthropic base64 `source.type:"base64"`、Anthropic URL `source.type:"url"`，以及 Responses API `input_image`。巢狀命中和僅指示器形態屬於組合篩選器的處理範圍，絕不會被擷取。若未找到任何內容，則略過。
3. 透過 `resolveVisionBridgeRuntimeSettings()`（`src/shared/constants/modalityBridgeDefaults.ts`）解析執行階段設定：新的 `modalityBridge*` 設定鍵優先；舊版 `visionBridge*` 鍵仍保留作為**單一週期的後援**（回復窗口）。橋接停用時，會在任何媒體遍歷之前略過。
4. 模式選擇器（`modalityBridgeVisionMode`，請參閱下表）決定要重新路由還是描述。重新路由會回傳僅交換 `model` 的 `modifiedPayload`，以及中繼資料 `{ rerouted, fromModel, toModel, imagesKept }`。
5. 描述路徑：將影像數量限制為 `maxImages`、組合可感知任務的提示詞、查詢描述快取、**平行**呼叫視覺模型（`Promise.allSettled`），並將 `[Image N]: <description>` 文字部分注入至原位置。描述失敗時會產生 `null`，且原始影像部分會被**保留**（#4012）——但在組合描述路徑中，若所有描述都失敗，則會改為向已確認不支援視覺的上游提供 `(unavailable — no vision-capable provider connected)` 替代文字（#8430）。
6. 回傳 `modifiedPayload` + 中繼資料（`imagesProcessed`、`descriptions`、`processingTimeMs`、`visionModel`）。

#### 模式選擇器（`modalityBridgeVisionMode`）

| 模式       | 預設值 | 行為                                                                                                                                                                          |
| ---------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔      | 未變更的舊版啟發式規則（#6640/#7204）：非組合／`auto/` 模型會重新路由至最佳視覺模型，除非原始模型已有可用的憑證（此時改為描述）；組合目標一律描述。                           |
| `describe` |        | 一律描述——完全略過重新路由區塊；一律由使用者選擇的模型回答。                                                                                                                  |
| `reroute`  |        | 強制重新路由：略過保留具憑證模型的防護條件。重新路由**目標**的憑證防護條件仍然適用——若不存在可用的視覺目標，請求會轉而採用描述，確保原始影像絕不會傳送至純文字後端（#8430）。 |

強制模式會在自動啟發式規則執行**之前**短路；`auto` 行為與 PR-1 前的護欄逐位元完全相同。

#### 可感知任務的描述提示詞（`modalityBridgeVisionTaskAware`）

預設為 **true**。`composeVisionPrompt()`（`visionBridgeHelpers.ts`）會將**最後一則使用者訊息**的文字（截斷至 500 個字元）附加至基礎描述提示詞，引導描述聚焦於使用者實際提出的要求（codex-vision-proxy 模式），並要求視覺模型轉錄可見文字。關閉此旗標時——或沒有使用者文字時——基礎提示詞會保持不變。

描述自迴圈自身的 OpenAI 相容請求（`visionBridgeHelpers.ts` 中的 `callVisionModelSingle()`）一律要求 `image_url.detail: "high"`——無條件套用於每個呼叫端／提供者，不受任何用戶端訊號限制。低細節取樣會降低 OCR 準確度，而這正是此提示所要求的文字轉錄工作，因此無論原始傳入請求使用何種細節層級，描述呼叫本身一律要求高細節。這只會影響內部描述請求的主體；它不會改變 OmniRoute 在主要請求中轉送呼叫端自身 `image_url.detail` 的方式——該預設值會另外套用，而且只會針對偵測到的 OpenCode 用戶端，在 `defaultImageDetail()`（`open-sse/handlers/chatCore/upstreamBody.ts`）中處理。描述自迴圈的 Anthropic 線路格式分支沒有 `detail` 欄位，因此不受這兩種預設值影響。

#### 描述輸出上限（`modalityBridgeVisionMaxChars`）

| 鍵                             | 預設值 | 範圍             |
| ------------------------------ | ------ | ---------------- |
| `modalityBridgeVisionMaxChars` | `0`    | `0` 或 100–50000 |

`0`（預設值）表示**無上限**——`callVisionModel()` 傳回的描述會原樣傳遞，保留現有行為。任何介於 100–50000 範圍內的值，都會先以 `…` 後綴截斷描述，再將其插回為 `[Image N]: <description>`（`src/lib/guardrails/visionBridge.ts` 中的 `VisionBridgeGuardrail.preCall()`）。對於下游模型需要完整轉錄內容、細節密集的 OCR 工作，請提高此值；若要限制冗長視覺模型的權杖用量，則請降低此值。儀表板欄位位於 Vision 分頁的 Advanced 面板（`ModalityBridgeVisionTab.tsx` 中的 `modality-bridge-max-chars`），會將任何介於 1 到 99 的值箝制至最低值 100，同時保留明確設定的 `0` 不變——`0` 本身就是有效的 Zod 值（`z.union([z.literal(0), z.number().int().min(100).max(50000)])`），而不僅僅是「未設定」的預設值。

#### 描述快取（`modalityBridge/bridgeCache.ts`）

用於描述輸出的記憶體內 LRU + TTL 快取，由整個程序共用。鍵 = `sha256(imageRef + composedPrompt + configuredBridgeModel)`，並採用長度前綴框架（不會發生欄位邊界碰撞）。模型部分使用的是**已設定的**橋接模型，而不是實際回應的模型——`callVisionModel` 可能會在內部進行備援，若按每次嘗試建立鍵，將使快取碎片化。失敗的描述絕不會被快取。設定如下：

| 鍵                              | 預設值 | 範圍    |
| ------------------------------- | ------ | ------- |
| `modalityBridgeCacheEnabled`    | `true` | —       |
| `modalityBridgeCacheTtlMinutes` | `60`   | 1–1440  |
| `modalityBridgeCacheMaxEntries` | `200`  | 10–5000 |

#### 遠端影像正規化（自迴圈描述／base64 擷取）

當橋接器自行擷取**遠端**影像時——包括 Anthropic 描述自我呼叫，以及 claude 線路格式的 base64 轉換（`ensureBase64ImagesForClaudeWire`），兩者皆透過 `visionBridgeHelpers.ts` 中的 `fetchRemoteImageAsDataUri()`——產生的資料 URI 在嵌入視覺模型請求前，會先透過 `normalizeDataUri()`（`open-sse/utils/imageNormalize.ts`）處理。過大的影像會縮小至**長邊 2048px**（與 OpenAI／Anthropic 已在伺服器端套用的縮放上限一致），可在不改變視覺模型所見內容的情況下，減少上傳位元組數／延遲。調整大小時使用透過動態匯入載入的 `sharp`：在其原生二進位檔無法載入的平台上，`normalizeDataUri()` **絕不會擲回例外**——它會改為直接傳遞原始位元組，因此描述／base64 轉換路徑始終可以繼續運作。非影像位元組（擷取結果並非可解碼影像）也會原樣傳遞。此正規化僅適用於橋接器為自身自我呼叫而擷取的影像——絕不會套用至呼叫端未經處理的直接傳遞承載資料，這與僅限明確選擇加入才進行變更的原則（硬性規則 #20）一致。

#### 設定結構描述 + 遷移

新的 `modalityBridge*` 鍵會在 `updateSettingsSchema`（`src/shared/validation/settingsSchemas.ts`）中經過 Zod 驗證：`modalityBridgeVisionEnabled`、`modalityBridgeVisionMode`、`modalityBridgeVisionModel`、`modalityBridgeVisionTaskAware`、`modalityBridgeVisionPrompt`、`modalityBridgeVisionTimeout`、`modalityBridgeVisionMaxImages`、`modalityBridgeVisionMaxChars`、`modalityBridgeCache*` 三項設定，以及 Audio Bridge 使用的 `modalityBridgeAudio*` 群組。遷移 `141_modality_bridge_settings.sql` 會將現有的舊版 `visionBridge*` 值複製到相符的新鍵（具冪等性，且絕不會覆寫操作員已設定的 `modalityBridge*` 值）；舊版鍵在一個發布週期內仍可作為讀取備援使用。

#### 透明度標頭 + 統計資料

經描述轉換的回應會帶有 `x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>`（由 `modalityBridge/bridgeStats.ts` 中的 `buildModalityBridgeHeader()` 建立，並由 `src/sse/handlers/chatHelpers.ts` 中的 `withModalityBridgeHeader()` 加上）。重新路由的請求**不會**取得標頭——承載資料未被修改，而且模型切換已可在回應主體的 `model` 欄位中看到。

`GET /api/modality-bridge/stats`（管理驗證，與 `GET /api/settings` 相同層級）會傳回 `vision`、`audio` 和 `video` 各模態的記憶體內計數器 `{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs, latencySamples, averageLatencyMs, lastUsedAt }`。`averageLatencyMs` 使用 `latencySamples` 作為分母，而非所有嘗試次數；沒有計時的作業不會虛構一筆零毫秒的樣本。`bridged` 仍是成功轉換的向後相容別名；失敗的嘗試不會使其遞增。依設計，計數器會在程序重新啟動時重設（屬於遙測資料，而非會計資料）。

#### 儀表板設定

專用的儀表板頁面位於
`/dashboard/settings/modality-bridge`。其可透過 URL 定址的 `Vision`、`Audio`
與 `Video` 分頁會在切換 `tab` 值時保留查詢參數。
Vision 分頁提供啟用設定、模式、模型選擇（包括自動預設值）、
任務感知提示、進階逾時／圖片／描述長度／快取限制、執行階段
計數器，以及受保護的範例請求。Audio 分頁也已可用：它提供
啟用設定、含 Auto 選項且僅限 STT 的模型選擇器、逾時／最大剪輯數限制、音訊
計數器，以及 `input_audio` 範例測試。Video 分頁具備完整功能：它會回報
FFmpeg/ffprobe 執行階段狀態——四種明確 UI 狀態之一（探測進行中
或無法完成時為 `unknown`；儀表板主機非迴路位址，因而在用戶端略過探測時為
`restricted`；完成探測並確認缺少後為 `unavailable`；或以
`available` 顯示 FFmpeg/ffprobe 版本）——持久保存啟用／模型／影格／影片／逾時限制，
將模型選擇器篩選為具備視覺能力的模型，並提供影片計數器。

AI 設定下原有的 Vision Bridge 卡片現在是指向新頁面的相容性連結；
它不再維護表單的第二份副本。Media Providers 也會將
Image-to-Text 和 Speech-to-Text 工作流程連結至對應的 Modality
Bridge 分頁，同時保留現有的 Speech-to-Text 測試區。

**自我迴路准入略過：**當描述呼叫透過 OmniRoute 自己的
`/v1` 自我迴路（非標準提供者模型）進行路由時，子請求會傳送
`x-omniroute-admission-bypass: internal`，並使用解析後的
自我迴路憑證進行驗證——本機模式下使用本機 `sk_omniroute` 哨兵值，或使用
操作人員設定的 `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` 環境變數金鑰 (#1350)，使
`REQUIRE_API_KEY=true` 部署仍可執行描述呼叫。只有完全符合這些憑證時
才會允許略過，因此外部用戶端無法利用此標頭跳過准入檢查。

舊版預設值位於 `src/shared/constants/visionBridgeDefaults.ts`；
新的模式／任務感知／快取預設值與設定解析器位於
`src/shared/constants/modalityBridgeDefaults.ts`。防護機制提供
`deps` 建構函式選項，讓測試可以注入假的 `getSettings` 與
`callVisionModel` 實作。

### Audio Bridge (`audioBridge.ts`) — Modality Bridge PR-3

在含音訊的聊天請求抵達尚不知是否接受音訊輸入的目標之前攔截它們。
它絕不會重新路由聊天請求：音訊部分會透過現有的 OpenAI 相容多部分端點進行轉錄，
而選定的聊天模型會繼續使用文字逐字稿。

流程：

1. 透過 `getResolvedModelCapabilities()` 解析 `supportsAudio`。明確的
   提供者登錄檔中繼資料優先，其次是靜態模型中繼資料，再其次是已同步的
   `modalities_input`。已宣告但不含 `audio` 的輸入清單為 `false`；
   沒有任何能力證據時則維持 `null`。`false` 與 `null` 都會啟用
   保守式橋接，而 `true` 則會略過橋接。
2. 解析 `modalityBridgeAudio*` 設定，並透過共用的 `detectMediaParts()`
   偵測器，從每則訊息中擷取可拼接的頂層音訊部分。支援的線路格式為 OpenAI
   `input_audio`、`audio_url`，以及 `source.media_type: "audio/*"`。
   巢狀音訊會被偵測以供路由使用，但不會由拼接路徑移除。工作量以
   `modalityBridgeAudioMaxClips` 為上限；後續部分保持不變。
3. 採用已設定的 `provider/model`，或讓 `selectAudioBridgeModel()` 依穩定的
   目錄順序逐一檢查 `AUDIO_TRANSCRIPTION_PROVIDERS`，並選取第一個
   具有可用且有效之提供者憑證的模型。
4. `callAudioTranscription()` 會將 base64/data-URI 音訊轉換為多部分
   `file`，或透過僅允許公用位址的外連防護機制下載遠端 `audio_url`，
   並採用 DNS 固定與 25 MB 上限。接著，它會將檔案和選定的
   模型 POST 至本機 `/v1/audio/transcriptions` 自我迴路，並使用
   `resolveSelfLoopBearer()` 進行驗證。現有的轉錄路由會執行一般的
   憑證查找、冷卻／速率限制處理，以及提供者分派。
5. 成功的呼叫會將其部分替換為 `[Audio N]: <transcript>`。呼叫會使用
   `Promise.allSettled` 執行：個別失敗會保留原始音訊部分（#4012 合約）。
   如果所有呼叫皆失敗，且目標已證實為 `supportsAudio === false`，則這些部分會變成
   `[Audio N]: (unavailable — no STT provider connected)`（#8430 合約）。
   對於未知目標（`null`），全部失敗的結果會保持不變。已證實僅支援文字的目標若
   沒有可用的 STT 憑證，則會在不發出網路呼叫的情況下收到相同的明確
   替代文字。

成功的逐字稿會使用整個程序共用的 Modality Bridge LRU/TTL 快取。
其鍵值由音訊參照、穩定的 `audio-transcription` 操作
標籤，以及選定的 STT 模型組成；失敗結果一律不會快取。音訊嘗試會更新
共用的 `bridged`、`cacheHits`、`failures` 與 `lastUsedAt` 計數器。
轉換後的回應會帶有
`x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`；
未變更的請求不會收到 Audio Bridge 區段。

執行階段設定由資料庫支援，並經過 Zod 驗證：

| 鍵                            | 預設值  | 範圍           |
| ----------------------------- | ------- | -------------- |
| `modalityBridgeAudioEnabled`  | `true`  | —              |
| `modalityBridgeAudioModel`    | `""`    | Auto 或 STT ID |
| `modalityBridgeAudioTimeout`  | `60000` | 1000–300000    |
| `modalityBridgeAudioMaxClips` | `3`     | 1–10           |

共用快取仍由 `modalityBridgeCacheEnabled`、
`modalityBridgeCacheTtlMinutes` 與 `modalityBridgeCacheMaxEntries` 控制。

### Video Bridge (`videoBridge.ts`, `videoBridgePipeline.ts`)

在呼叫已知原生不支援影片的目標之前，攔截 Chat Completions `messages` 與 Responses API `input` 中的頂層影片部分。支援的形式包括 `input_video`、`video_url`、`video_source`、HTTPS URL，以及 `data:video/*;base64,...` 資料 URI。文字中的純檔名不會被視為影片。

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) 負責請求遍歷、能力／政策檢查、每個請求的彙總，以及回應酬載。每部影片的處理工作——擷取、完整結果快取、描述影格序列（其中會融合呼叫端宣告的任何音訊轉錄文字），以及每次嘗試的指標／中止／清理——都隱藏在 `videoBridgePipeline.ts` 的 `processVideoPart` 背後，並在 `preCall` 的迴圈內針對每個影片部分呼叫一次。該模組也定義了明確的連接埠邊界 `VideoMediaBrokerPort`（擷取位元組並提取取樣影格）、`VideoAudioTranscriptionPort`（將呼叫端宣告的音訊轉錄文字與取樣影格說明融合），以及 `VideoDrilldownPort`（影格深入檢視的持久化邊界；尚未接入 `processVideoPart`——目前只有獨立的 `/api/modality-bridge/video/drilldown` 路由會寫入深入檢視項目）。

公開的 `/v1` 請求路徑絕不匯入或叫用子行程。遠端影片的下載上限為 50 MiB；內嵌 base64 影片則採用保守的每部影片 36 MiB 解碼後容量上限，讓模型／訊息／框架封裝仍可維持在公開 JSON 請求的 50 MiB 接納限制內。系統會在配置記憶體之前檢查內嵌長度與解碼後大小的估算值。初始遠端 URL 與每次重新導向都必須使用 HTTPS，並採用現有具 DNS 固定功能、僅允許公開位址的出站防護。接著，這些位元組會跨越精確的內部 `POST /api/modality-bridge/video/extract` 代理邊界。該路由同時為 `LOCAL_ONLY` 與 `SPAWN_CAPABLE`，只接受經個別行程驗證且受信任的回送介面請求，並且絕不接受 URL、檔案系統路徑、可執行檔或引數清單。API 內文大小處理管線與處理常式的增量內文讀取器會各自獨立強制執行 50 MiB 的代理輸入上限。其有界佇列一次執行一項提取作業，允許四項待處理作業，並將待處理輸入總量限制為 100 MiB。

在代理內部，`ffprobe` 會讀取私有本機檔案；固定的格式允許清單排除了播放清單與資訊清單格式。對於允許的 MOV 系列容器，外部 MOV 資料參照預設維持停用，且固定命令不會選擇啟用。`ffprobe` 與 `ffmpeg` 都使用僅限 `file` 的通訊協定允許清單、單一執行緒、固定引數陣列、不使用 shell，且可執行檔由 `PATH` 解析。附加圖片封面串流不會被視為可播放候選項目。所有可播放串流都必須符合限制，且會先採用明確的預設串流，再使用具確定性的最低索引備援。影片限制為 600 秒、每個維度 8,192 像素，以及 33,554,432 個來源像素。FFmpeg 會取樣 1–16 個中點 JPEG 影格，將長邊縮小至最多 1,024 像素，且不會放大較小的輸入，也絕不會接收 URL。取樣預設為 `uniform`。選用的 `scene_aware` 與實驗性的 `segment_aware` 政策會對已驗證的本機串流執行一次額外的固定 FFmpeg 處理程序，選取有界的 `showinfo` 場景時間戳記，並在偵測器失敗、逾時、輸出格式錯誤或候選集為空時，以確定性方式退回相同的均勻中點。區段感知模式會依據已驗證的場景區間按比例分配中點樣本；區段感知證據與備援行為詳述如下。所有政策都會在選取完成後套用 16 影格的硬性上限。當場景感知請求只有一個影格的預算時，系統會使用有效完整影片或焦點視窗的均勻中點，並回報 `policyEffective: uniform`：單一選定的場景影格無法同時保留時間軸的兩端。呼叫端可選擇提供有限的焦點視窗（`start`/`end` 秒）；邊界會限制在媒體時長內，反向或非有限視窗會遭拒絕，且所有取樣政策只會在正規化後的區間內執行。產生的視窗會包含在取樣中繼資料與不受信任的描述前綴中，讓下游模型能區分聚焦片段與完整時間軸。

語意字幕焦點是一項獨立且明確的設定。預設的 `full` 分析模式會保留現有的影格提示，且絕不會將請求文字轉送至字幕模型。在 `focused` 模式中，橋接器只會讀取相同 Chat 或 Responses 容器中最新且非空白、由使用者撰寫的 `text`/`input_text`，將其正規化為 NFC、折疊控制字元與空白，並限制為 500 個 Unicode 碼位。空白結果會退回完全相同的 `full` 提示。可用的提示會在專用的不受信任使用者內容區塊中序列化為 JSON，且只能用於優先處理可觀察到的細節；它無法覆寫另一項警告，即不得遵循媒體中可見或可聽見的指示。文字焦點絕不會推斷 `start`/`end`，也不會變更時間取樣器。

#### FU-07 結構化區段證據

`segment_aware` 會對已驗證的本機影片串流執行一次有界的預分析處理程序。固定的篩選器鏈會先縮放至最多 320 像素寬、偵測場景變化與凍結區間，接著以每秒 1 個影格的頻率取樣，以分析模糊度、平均亮度，以及空間／時間資訊。該處理程序最多只能使用 600 個結構化樣本、一個 FFmpeg／篩選器執行緒、相同的僅限 `file` 通訊協定與容器允許清單、1 MiB 的行程輸出上限，並且在代理的共用中止／期限內最多執行 30 秒。它絕不接受來自請求的命令、篩選器、路徑或 URL。

這些結構性數值是確定性取樣依據，而非對影片內容的語意理解。它們不會推斷主體、動作、字幕、語音或使用者意圖。場景與靜止邊界會形成片段；靜止覆蓋率、模糊度、曝光度、空間細節及時間變化，只會影響現有 1–16 影格預算的分配方式。完全靜止的片段最多配置一個影格，而非靜止片段則競爭剩餘預算。當邊界數量超過影格數時，系統會保留時間軸上的均勻覆蓋，避免前段快速剪接遮蔽尾端的長片段。若場景邊界位於靜止邊界的 1 秒分析解析度範圍內，便會合併處理。

若篩選器缺失、依據格式錯誤或為空、偵測器發生錯誤，或有界限的預分析逾時，系統將採取開放式失敗處理，精確回退至均勻中點策略。呼叫端中止或代理程式期限到期時則不會採取開放式失敗處理：系統會終止正在執行的子程序、阻止後續影格擷取，並在 `finally` 中移除私有暫存目錄樹。

`scripts/perf/video-bridge-fu07-eval.ts` 會產生確定性的真實 FFmpeg 測試素材，用以評估去重後的字幕呼叫節省量、高密度動態的預算分配、模糊度／曝光度／SI-TI 依據、帶有長尾片段的快速剪接，以及漸進淡出的偽陽性。它會記錄預分析的實際經過時間；若 `/usr/bin/time` 可用，還會記錄子程序 CPU 使用量與 RSS 峰值。其品質檢查僅採用結構性判定依據。由於此測試工具沒有經授權的端點或固定的評判器，真實字幕模型品質仍維持 `HOLD`。除非 `--caption-cost-per-call-usd` 提供明確且為正值的每次呼叫成本估算，否則金額節省結果也會維持 `HOLD`；此指令碼絕不會捏造任一結果。

每個影格限制為 4 MiB，所有原始影格合計限制為 23 MiB，序列化後的代理程式回應限制為 32 MiB。私有暫存目錄會在 `finally` 中移除。OmniRoute 不會內附 FFmpeg，也不接受自訂的可執行檔路徑。在產生字幕前，橋接器會執行保守的視覺去重處理：將每張 JPEG 縮減為 16×16 灰階緩衝區，且僅與上一個保留的影格比較。若要求的字幕預算超過一個影格，擷取程序會提供有界限的候選集，其大小最多為該預算的兩倍，且絕不超過 16 個影格。要求的上限只會在去重後套用；若預算至少為兩個影格，在最終刪減時會保留第一個與最後一個選定的候選影格。具版本號的
`grayscale-16x16-mean-cells-v2` 策略會採用平均亮度差異與縮圖儲存格比例兩者中的較大值，其中該比例是指正規化差異至少為 0.05 的縮圖儲存格比例。重複判定閾值為常數 0.04；此值旨在提供可預測性，而非公開為執行階段設定。這個次要的高對比訊號可保留僅使用平均值比較時可能遺漏的細微動作與可見文字變化。比較器或解碼器發生錯誤時，系統會採取開放式失敗處理並保留覆蓋範圍。輸出中繼資料會分別標示擷取的候選影格、成功使用的影格，以及已捨棄的視覺重複影格。

明確標記的影片部分可以要求附帶時間戳記的接觸印樣。橋接器會建立最多 4 欄、16 個影格的 JPEG 網格。每個 512 像素的儲存格都會在高對比度的底部帶狀區域中燒錄其來源時間戳記；相同的時間戳記也會保留於文字中繼資料中，以供下游進行關聯與稽核。完整 JPEG 仍以 32 MiB 為上限。如果 `sharp` 無法解碼或合成網格，橋接器會回退至個別 JPEG 影格；用戶端中止仍會傳遞至接觸印樣操作。

晉升依據刻意與合成組合微基準測試分開。`scripts/perf/video-bridge-contact-sheet-eval.ts` 定義了一個具有結構描述版本的 A/B 測試工具，供真實的 OpenAI 相容視覺模型使用。它會測量提供者回報的 token 數、端對端實際延遲時間（包括接觸印樣合成）、模型呼叫次數，以及資訊清單所定義的事實保留率。原始模型回應不會寫入報告；系統只會保留 SHA-256 摘要與相符的事實 ID。除非傳入 `--execute-real`，並已設定 `--model`、`OMNIROUTE_BASE_URL` 和 `OMNIROUTE_API_KEY`，否則此測試工具不會發出任何網路或付費模型呼叫。若未執行這種明確指定的真實測試，其機器可讀的判定結果會維持 `HOLD`；僅有合成負載／呼叫次數測量結果不能作為晉升依據。

當呼叫端已擁有對齊的文字時，可以將選用的 `transcript.cues` 陣列附加至支援的影片部分。每個提示項目都必須包含 `text`、位於探測所得時長範圍內的有限 `start`/`end` 區間，以及列入允許清單的 `source`（`client`、`embedded` 或 `audio-bridge`）；`confidence` 預設為 `1`，且必須維持在 `0` 與 `1` 之間。完全重複的提示項目會合併。OmniRoute 絕不會根據此中繼資料啟動轉錄：通過驗證的提示項目會連同來源、信賴度及區間複製到描述結果中，並與影格字幕一起呈現為不受信任的觀察結果。無效、超出範圍或缺少來源資訊的文字會遭到拒絕，而不會混入字幕串流。目前 `source` 欄位由呼叫端宣告，尚未經伺服器驗證：OmniRoute 會強制要求該值必須是三個允許字串之一，但尚未以密碼學方式確認 `embedded` 或 `audio-bridge` 標籤是否確實來自伺服器所擁有的擷取程序。在此驗證機制實作前，請將 `source` 視為不受信任的提示；請勿以此作為授權決策的依據。

進階呼叫端可為同一部影片提供已獲授權的 `audioTranscript` 軌道。
融合層會在同一個期限與中止訊號下執行視覺和音訊觀察、依共同時間軸排序、
摺疊完全重複的項目，並在只有一側成功時回報部分結果。
無效的 `audioTranscript` 會降級為該部分結果，而不是導致整部影片失敗——視覺
描述會予以保留，而音訊分支則記錄經清理的失敗代碼。
各分支的可用性、部分結果旗標與經清理的失敗代碼，都會保留在描述結果、
護欄中繼資料（`audioFusionRuns`/`audioFusionPartials`/
`audioFusionFailureCodes`）、結果快取中繼資料，以及橋接器的
融合計數器中。預設的 Video Bridge 路徑不會叫用語音轉文字功能，
也不會下載第二份媒體副本；若未明確提供該軌道，便會維持僅處理
影片。

**逐字稿保留機制（#12150 P1）。** 只要 Video Bridge（本身為選用功能）
呈現逐字稿提示，此機制就會自動套用——沒有個別的保留旗標。當請求呈現任何
逐字稿提示（呼叫端宣告的 `transcript` 或融合後的 `audioTranscript`）時，
護欄會將其標記為 `videoBridgeObserved`，並產生影片描述的遮蔽影子版本——
此版本的呈現方式完全相同，但每個提示的自由文字內文都會替換為
`[redacted-video-transcript]`；其建構方式是在組合字串之前替換結構化提示欄位
（絕不剖析扁平化後的文字，因此任何提示內容——無論是對抗性或一般內容，
包括內文含有 `]` 的情況，例如 `[inaudible]`/`[music]`——都無法殘留）。
持久化的呼叫記錄請求本文會將每個衍生自影片的文字部分換成該遮蔽影子版本，
並透過內容相等性進行比對；`fullText` 錨點會從完成後的呼叫前護欄承載資料中
重新讀取，因此即使後續鏈式護欄（PII 與認證資訊遮罩器，優先順序為 10/95）
就地重寫描述文字，以及系統提示詞／交接／記憶體注入重塑訊息陣列之後，
比對仍會成功。傳送至上游模型的本文維持不變。已觀察到的請求也不會填入任何
持久性 Memory（會略過從請求與回應衍生的擷取），因此模型本身的回覆無法將
逐字稿文字回顯至 Memory。

仍然開放且已追蹤以供後續處理的保留介面（**P2**，#12430）包括：詳細記錄成品中
未經護欄處理的原始用戶端請求快照；`previous_response_id` 接續的失敗關閉機制；
將逐字稿嵌入合成字串提示詞的衍生提示詞內部分派
（管線階段、上下文交接）；以及引用逐字稿之模型回覆的回應本文／語意快取副本。
這些是 P1 的持久化請求本文 + Memory 範圍之外的原始資料／回應類別或選用介面。

內部 `/api/modality-bridge/video/drilldown` 生命週期是獨立的、
經迴送／權杖驗證之快取基礎層。每個操作也都需要一個正規化的不透明主體 ID。
在啟用正式環境呼叫端之前，呼叫端必須從已驗證的租戶衍生該 ID，且絕不可轉送
由用戶端選定的值。快取鍵會將該主體繫結至正規化工作階段與影片參照 ID，
僅儲存其透過 SHA-256 衍生的鍵，並將讀取與刪除操作都限定於同一主體。
快取的每個項目最多儲存 16 個衍生 JPEG 影格，並在十分鐘後使其到期；
同時支援有界的 `start`/`end` 讀取，或明確刪除工作階段。

每個主體最多可有 16 個項目與 64 MiB 的正規化 JPEG 資料。這些限制獨立於
全域的 64 個項目／256 MiB 上限：主體配額壓力只會先逐出該主體最近最少使用的
項目，之後才會考慮全域 LRU 逐出。快取活動期間，到期項目會從主體與
全域計量中一併清除，而取消與驗證失敗不會提交不完整的替換項目。

快取會拒絕非正規 Base64、過量填補、非 JPEG 媒體、格式錯誤或遭截斷的 JPEG，
以及在有界完整影像 `sharp` 解碼期間產生警告的 JPEG。它會將每個接受的影像
重新編碼為正規化 JPEG、從解碼後的位元組衍生寬度與高度，而不信任呼叫端欄位，
並捨棄任何尾隨的多格式混合位元組，而不予保留。只有有界的正規化壓縮緩衝區
會計入兩項配額。JSON 線路限制包含 32 MiB 解碼輸入上限所產生的 Base64 額外負擔。
每個儲存的衍生項目都會記錄其經驗證的 JPEG 格式／解析度、取樣原則、
衍生版本、建立時間、由伺服器計算的內容雜湊，以及經雜湊處理的父項
參照與受信任呼叫端提供的父項內容雜湊。在不可分割的快取提交之前，
系統會在非同步解碼／雜湊階段之間檢查是否取消。

此階段尚未將正式環境的產生端連接至該路由，也未提供多解析度變體選擇。
因此，透明的 Video Bridge 請求路徑不會增加任何工作量，而繫結租戶的主體衍生
與完整的 FU-08 多解析度生命週期仍明確屬於後續工作，不會被記載為已完成的行為。

影格會使用已設定的 Video 模型依序產生字幕。空白的
Video 覆寫設定會繼承 Vision 設定；若兩者皆為空，Vision
自動路由器會選擇實際使用且支援視覺功能的模型。成功產生的字幕
會以穩定的 `[Video description:` 前綴取代原始部分；此前綴也會
將文字標記為來自不受信任媒體的觀察結果，並告知下游
模型不要遵循媒體中出現的指示。影格字幕快取鍵
包含 JPEG 位元組、提示詞、時間戳記和實際使用的模型；只有成功產生的
字幕才會被快取。快取項目會保留實際成功產生內容的模型，
包括備援模型；當不同影格由不同模型產生時，橋接器會回報 `mixed`。
快取命中時會重用該產生模型的識別資訊，
而不會將其重新標示為所要求的路由計畫。整部影片的結果
快取會以所有會改變輸出的輸入作為鍵值——提示詞、實際使用的
模型、取樣政策、影格數、語意分析模式、正規化焦點提示的 SHA-256
指紋、焦點視窗、`transcript`、
`audioTranscript` 和聯絡表旗標——因此變更上述任一
維度都會造成快取未命中，絕不會重用過時結果。視覺去重政策的
版本、閾值和有界候選影格數也會明確包含在
結果快取鍵與中繼資料中；因此政策變更無法重用過時的
整部影片描述。結果快取 v4 中繼資料會保留模式和
指紋，但絕不保留原始使用者任務。防護欄中繼資料會同時回報
要求的分析模式與實際使用的分析模式；若要求 `focused` 模式但沒有
可用的使用者文字，實際使用的模式會回報為 `full`。

防護欄會擷取所有支援的影片部分，但描述的數量不會超過
`modalityBridgeVideoMaxVideos`。對於經確認
`supportsVideo === false` 的目標，處理失敗及超出限制的影片會轉換為明確且安全的
文字標記，確保不會留下任何原始影片。若功能支援狀態未知，這些部分
會保持不變。`supportsVideo === true` 的目標會略過橋接器。
用戶端請求的中止訊號會傳遞至下載、代理佇列、
子程序和字幕呼叫；中止操作會在影片之間停止處理，且絕不會以開放失敗方式
讓原始媒體通過。

執行階段設定由資料庫支援，並使用 Zod 驗證：

| 鍵                                  | 預設值      | 範圍／行為                                                                        |
| ----------------------------------- | ----------- | --------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`     | 選用執行階段，需明確啟用                                                          |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | `full` 會保留通用字幕；`focused` 使用有界且不受信任的最新使用者內容               |
| `modalityBridgeVideoModel`          | `""`        | 繼承 Vision Bridge 模型                                                           |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                              |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`、`scene_aware` 或按比例的 `segment_aware`；偵測器失敗時會退回 `uniform` |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                               |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000–120000 ms                                                                    |

舊版持久化的 Video 逾時值若超過 120 秒，會被限制為
代理程式的截止期限；新的設定寫入若超過該限制則會遭拒。
`GET /api/modality-bridge/video/runtime` 在進行驗證或執行階段探測之前，
會要求具備受信任戳記的迴路本機位置，之後還會要求管理
驗證。它只會傳回 `available`、經過清理的 FFmpeg/ffprobe 版本，以及執行階段
無法使用時的固定原因。內部擷取端點並非
公開上傳 API：佇列飽和會傳回 `503` 及 `Retry-After`，呼叫端
中斷連線會傳回 `499`，而固定的代理截止期限會傳回 `504`。經轉換的回應會將
`video->text;model=<visionModel>;parts=<videos>` 加入中央
`x-omniroute-modality-bridge` 標頭，而不會移除 Vision 或 Audio 區段。

### PII 遮罩器 (`piiMasker.ts`)

會在**兩個**階段執行。

- **`preCall`** 會複製承載資料，巡訪 `system`、`messages`、`input` 和
  `prompt`（包括純字串項目），並對字串 `content`/`text` 欄位套用
  `processPII()`（來自 `@/shared/utils/inputSanitizer`）。當
  `PII_REDACTION_ENABLED=true` 時，偵測到的 PII 會在傳出
  承載資料中遮蔽。這與 `INPUT_SANITIZER_MODE` 無關（後者僅控制
  提示詞注入政策）。關閉遮蔽時，呼叫會記錄偵測
  次數，但不會重寫內容。
- **`postCall`** 會深層複製回應、執行 `sanitizePIIResponse()`，以及
  Responses API 結構遮罩器（`maskResponsesOutput`——涵蓋
  `output_text` 和 `output[].content[].text`）。若發生任何遮蔽，
  修改後的回應會取代原始回應。

防護欄絕不封鎖；它只會加上註記（`meta.detections`、
`meta.redacted`）或重寫內容。

### 提示詞注入 (`promptInjection.ts`)

偵測使用者所提供內容中的對抗性結構，並強制執行
已設定的政策。其行為由環境變數和建構函式
選項驅動：

| 設定     | 環境變數                                                                                            | 預設值 | 效果                                                                                                                                                |
| -------- | --------------------------------------------------------------------------------------------------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| 啟用     | `INPUT_SANITIZER_ENABLED`                                                                           | `true` | 設為 `false` 時，防護機制會短路跳過。                                                                                                               |
| 模式     | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                     | `warn` | 注入政策：`block`、`warn` 或 `log`。（為了向後相容，也接受 `redact`，但它**不會**移除注入文字；請求中的 PII 重寫由 `PII_REDACTION_ENABLED` 控制。） |
| 封鎖閾值 | `blockThreshold` 選項 / `INPUT_SANITIZER_BLOCK_THRESHOLD`（別名 `INJECTION_GUARD_BLOCK_THRESHOLD`） | `high` | 觸發封鎖所需的最低嚴重性。使用預設值時，中等嚴重性僅供觀察。                                                                                        |

**模式優先順序**（`getMode`）：呼叫端的 `options.mode` →
`INJECTION_GUARD_MODE` **資料庫功能旗標覆寫**（儀表板 → 設定 →
功能旗標）→ `INJECTION_GUARD_MODE` 環境變數 → `INPUT_SANITIZER_MODE` 環境變數 →
`warn`。因此，儀表板覆寫的優先順序高於環境變數，所以功能旗標
UI 可即時控制執行中的防護機制（無須重新啟動）。資料庫讀取採失敗安全設計：
若發生錯誤，防護機制會回復到基於環境變數的行為；未設定
覆寫時，其行為與僅依環境變數解析完全相同。

偵測來源：

1. 來自 `@/shared/utils/inputSanitizer` 的 `sanitizeRequest()`（管線中其他位置
   也會使用的共用偵測器集合）。
2. 內建的 `DEFAULT_GUARD_PATTERNS`（目前為 `system_override_inline` 與
   `markdown_system_block`，兩者的嚴重性皆為 `high`）。
3. 透過建構函式選項傳入的選用 `customPatterns`（字串、正規表示式，
   或 `{ name, pattern, severity }` 記錄）。

當 `mode === "block"` **且**至少一項偵測結果達到嚴重性
閾值時，`preCall` 會傳回 `{ block: true, message: "Request rejected:
suspicious content detected" }`。在 `warn`/`log` 模式下，防護機制會記錄日誌，但
允許呼叫。另亦匯出共用輔助函式 `evaluatePromptInjection()`，
供需要在不經過登錄檔的情況下評估提示詞的呼叫端使用。

**掃描上限（v3.8.20）：**偵測器只會檢查合併後提示文字的**前 16 KB** —
`MAX_INJECTION_SCAN_BYTES = 16 * 1024`（16 384 位元組），定義於
`src/shared/utils/inputSanitizer.ts`。`detectInjection()` 與
`evaluatePromptInjection()` 都會在執行模式迴圈前呼叫
`slice(0, MAX_INJECTION_SCAN_BYTES)`。注入指令通常位於輸入內容頂端附近，因此這項
限制可控制數百 KB 酬載的正規表示式 CPU/GC 用量，而不會削弱偵測能力（參見
#3932、#4041）。

### 憑證遮罩器（`credentialMasker.ts`）

會在**兩個**階段執行，並在預設鏈中最後執行（優先順序 `95`）。它會從傳出的酬載
（訊息內容、工具呼叫引數、工具結果）**以及**提供者回應中遮蔽
常見的 API 金鑰／祕密權杖模式，因此貼入提示詞的憑證（或由工具結果回傳的憑證）
不會洩漏給上游提供者或傳回用戶端。

- **僅限選擇加入**，與 PII 遮蔽採用相同慣例（與硬性規則 #20 相鄰）：
  除非 `settings.credentialRedactionEnabled === true` **或**
  `CREDENTIAL_REDACTION_ENABLED=true`，否則皆停用。停用時，防護機制不會執行任何操作 —
  絕不封鎖，也絕不重寫。
- `redactCredentials()` 會遍歷完整的酬載／回應樹狀結構（`walkValue()`、
  可防範原型污染、透過 `WeakSet` 避免循環），並將相符內容替換為
  `[REDACTED:<type>]` 預留位置，且只複製實際發生變更的分支。
- `CREDENTIAL_PATTERNS` 涵蓋 LLM 提供者金鑰（OpenAI、OpenAI-proj、
  Anthropic、Google、Hugging Face、Replicate）、VCS/SaaS 權杖（GitHub、Slack、
  Linear、Notion、npm、Postman、Discord）、付款金鑰（Stripe、Square）、雲端
  金鑰（AWS 存取金鑰、Twilio、SendGrid、Mailgun）、私密金鑰／JWT、
  內含憑證的連線字串（`mongodb://user:pass@...` 等），以及通用的
  `Authorization`/`x-api-key`/`api-key`/`apikey` 標頭值
  模式。具有標頭格式的鍵（`authorization`、`x-api-key`、`api-key`、
  `apikey`）會以結構化方式遮蔽（僅遮蔽值，並保留 `Bearer `/`Basic ` 等
  配置方案前綴），而不是透過通用文字正規表示式處理。
- 此防護機制絕不封鎖，只會重寫（`modifiedPayload` /
  `modifiedResponse`）並加上註解（`meta.credentialsRedacted`、`meta.count`）。

迴歸防護：`tests/unit/credential-masker-guardrail.test.ts`。

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
