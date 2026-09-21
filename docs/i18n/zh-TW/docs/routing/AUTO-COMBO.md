# OmniRoute Auto-Combo Engine (中文 (繁體))

🌐 **Languages:** 🇺🇸 [English](../../../../routing/AUTO-COMBO.md) · 🇪🇹 [am](../../../am/docs/routing/AUTO-COMBO.md) · 🇸🇦 [ar](../../../ar/docs/routing/AUTO-COMBO.md) · 🇦🇿 [az](../../../az/docs/routing/AUTO-COMBO.md) · 🇧🇬 [bg](../../../bg/docs/routing/AUTO-COMBO.md) · 🇧🇩 [bn](../../../bn/docs/routing/AUTO-COMBO.md) · 🇨🇿 [cs](../../../cs/docs/routing/AUTO-COMBO.md) · 🇩🇰 [da](../../../da/docs/routing/AUTO-COMBO.md) · 🇩🇪 [de](../../../de/docs/routing/AUTO-COMBO.md) · 🇬🇷 [el](../../../el/docs/routing/AUTO-COMBO.md) · 🇪🇸 [es](../../../es/docs/routing/AUTO-COMBO.md) · 🇪🇪 [et](../../../et/docs/routing/AUTO-COMBO.md) · 🇮🇷 [fa](../../../fa/docs/routing/AUTO-COMBO.md) · 🇫🇮 [fi](../../../fi/docs/routing/AUTO-COMBO.md) · 🇫🇷 [fr](../../../fr/docs/routing/AUTO-COMBO.md) · 🇮🇪 [ga](../../../ga/docs/routing/AUTO-COMBO.md) · 🇮🇳 [gu](../../../gu/docs/routing/AUTO-COMBO.md) · 🇳🇬 [ha](../../../ha/docs/routing/AUTO-COMBO.md) · 🇮🇱 [he](../../../he/docs/routing/AUTO-COMBO.md) · 🇮🇳 [hi](../../../hi/docs/routing/AUTO-COMBO.md) · 🇭🇷 [hr](../../../hr/docs/routing/AUTO-COMBO.md) · 🇭🇺 [hu](../../../hu/docs/routing/AUTO-COMBO.md) · 🇦🇲 [hy](../../../hy/docs/routing/AUTO-COMBO.md) · 🇮🇩 [id](../../../id/docs/routing/AUTO-COMBO.md) · 🇳🇬 [ig](../../../ig/docs/routing/AUTO-COMBO.md) · 🇮🇹 [it](../../../it/docs/routing/AUTO-COMBO.md) · 🇯🇵 [ja](../../../ja/docs/routing/AUTO-COMBO.md) · 🇬🇪 [ka](../../../ka/docs/routing/AUTO-COMBO.md) · 🇰🇭 [km](../../../km/docs/routing/AUTO-COMBO.md) · 🇮🇳 [kn](../../../kn/docs/routing/AUTO-COMBO.md) · 🇰🇷 [ko](../../../ko/docs/routing/AUTO-COMBO.md) · 🇱🇹 [lt](../../../lt/docs/routing/AUTO-COMBO.md) · 🇱🇻 [lv](../../../lv/docs/routing/AUTO-COMBO.md) · 🇮🇳 [ml](../../../ml/docs/routing/AUTO-COMBO.md) · 🇮🇳 [mr](../../../mr/docs/routing/AUTO-COMBO.md) · 🇲🇾 [ms](../../../ms/docs/routing/AUTO-COMBO.md) · 🇲🇹 [mt](../../../mt/docs/routing/AUTO-COMBO.md) · 🇲🇲 [my](../../../my/docs/routing/AUTO-COMBO.md) · 🇳🇵 [ne](../../../ne/docs/routing/AUTO-COMBO.md) · 🇳🇱 [nl](../../../nl/docs/routing/AUTO-COMBO.md) · 🇳🇴 [no](../../../no/docs/routing/AUTO-COMBO.md) · 🇮🇳 [or](../../../or/docs/routing/AUTO-COMBO.md) · 🇮🇳 [pa](../../../pa/docs/routing/AUTO-COMBO.md) · 🇵🇭 [phi](../../../phi/docs/routing/AUTO-COMBO.md) · 🇵🇱 [pl](../../../pl/docs/routing/AUTO-COMBO.md) · 🇵🇹 [pt](../../../pt/docs/routing/AUTO-COMBO.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/AUTO-COMBO.md) · 🇷🇴 [ro](../../../ro/docs/routing/AUTO-COMBO.md) · 🇷🇺 [ru](../../../ru/docs/routing/AUTO-COMBO.md) · 🇱🇰 [si](../../../si/docs/routing/AUTO-COMBO.md) · 🇸🇰 [sk](../../../sk/docs/routing/AUTO-COMBO.md) · 🇸🇮 [sl](../../../sl/docs/routing/AUTO-COMBO.md) · 🇷🇸 [sr](../../../sr/docs/routing/AUTO-COMBO.md) · 🇸🇪 [sv](../../../sv/docs/routing/AUTO-COMBO.md) · 🇰🇪 [sw](../../../sw/docs/routing/AUTO-COMBO.md) · 🇮🇳 [ta](../../../ta/docs/routing/AUTO-COMBO.md) · 🇮🇳 [te](../../../te/docs/routing/AUTO-COMBO.md) · 🇹🇭 [th](../../../th/docs/routing/AUTO-COMBO.md) · 🇹🇷 [tr](../../../tr/docs/routing/AUTO-COMBO.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/AUTO-COMBO.md) · 🇵🇰 [ur](../../../ur/docs/routing/AUTO-COMBO.md) · 🇺🇿 [uz](../../../uz/docs/routing/AUTO-COMBO.md) · 🇻🇳 [vi](../../../vi/docs/routing/AUTO-COMBO.md) · 🇳🇬 [yo](../../../yo/docs/routing/AUTO-COMBO.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/AUTO-COMBO.md)

---

> **使用者注意**：想要快速開始嗎？請參閱 [Auto-Combo 使用者指南](../getting-started/AUTO-COMBO-GUIDE.md)，其中提供簡明的說明與範例。

> 具備自適應評分與零設定自動路由的自我管理模型鏈

## 零設定自動路由（`auto/` 前綴）

> **新功能：** 不需要建立組合。可直接在任何用戶端中使用 `auto/` 前綴。

### 快速範例

| 模型 ID        | 變體     | 行為                                               |
| -------------- | -------- | -------------------------------------------------- |
| `auto`         | 預設     | 所有已連線的提供者、LKGP 策略、平衡權重            |
| `auto/coding`  | 程式設計 | 品質優先權重，適合產生程式碼                       |
| `auto/fast`    | 快速     | 低延遲加權選擇                                     |
| `auto/cheap`   | 低成本   | 成本最佳化路由（優先選擇最低成本）                 |
| `auto/offline` | 離線     | 偏好配額可用性最高的提供者                         |
| `auto/smart`   | 智慧     | 品質優先 + 較高探索率（10%），以便更妥善地探索模型 |
| `auto/lkgp`    | lkgp     | 明確使用 LKGP（與預設的 `auto` 相同）              |
| `auto/chaos`   | 混沌     | 用於韌性測試的故障注入權重（混沌工程）             |

### 類別 × 層級組合（`auto/<category>:<tier>`）

OpenRouter 風格的後綴將**路由種類**（類別）與**最佳化方式**（層級）分開，因此你可以自由組合它們（#4235 Phase B，`open-sse/services/autoCombo/suffixComposition.ts`）：

- **類別**（依能力篩選候選池）：`coding` · `reasoning` · `vision` · `chat` · `multimodal`。`vision`/`multimodal` 會保留支援視覺能力的模型；`reasoning` 會保留推理／思考模型。
- **層級**（選擇評分權重／候選池篩選器）：`fast`（快速交付）· `cheap`（別名 `floor`，節省成本）· `reliable`（斷路器健康狀態 + 延遲穩定性）· `free` / `pro`（透過 `classifyTier` 依模型層級篩選候選池——免費層級與付費層級）。

| 範例                   | 解析結果                                               |
| ---------------------- | ------------------------------------------------------ |
| `auto/coding:fast`     | 程式設計候選池、低延遲權重                             |
| `auto/coding:cheap`    | 程式設計候選池、成本最佳化（別名 `auto/coding:floor`） |
| `auto/reasoning:pro`   | 僅限推理／思考模型、付費層級                           |
| `auto/vision`          | 支援視覺能力的模型（無層級 → 平衡權重）                |
| `auto/multimodal:free` | 支援多模態的模型，僅限免費層級                         |

任何有效的 `auto/<category>[:<tier>]` 都會按需解析；精選子集會顯示在 `/v1/models` 和儀表板中（`open-sse/services/autoCombo/builtinCatalog.ts` 內的 `AUTO_SUFFIX_VARIANTS`）。篩選採用**失敗開放**策略——如果限制條件未匹配任何已連線模型，便會使用完整候選池，確保路由不會中斷。核心評分器（`combo.ts`）維持不變；類別／層級篩選器會在 `buildAutoCandidates` 中套用。

> **即時模型情報：** 啟用 `ARENA_ELO_SYNC_ENABLED` 旗標時，自動路由適配度會參考即時 **Arena ELO** 排名與 **models.dev** 層級資料（否則會退回使用靜態適配度對應表）。

**使用方式：**

```bash
# 任何支援 OpenAI 格式的 IDE 或 CLI 工具
Base URL: http://localhost:20128/v1
API Key:  <your-endpoint-key>

# 在程式碼／設定中，將模型設為：
model: "auto"                 # 平衡的預設值
model: "auto/coding"          # 最適合程式設計工作
model: "auto/fast"            # 可用選項中速度最快
model: "auto/cheap"           # 每個 token 的成本最低
```

**運作方式：**

1. OmniRoute 在 `src/sse/handlers/chat.ts` 中偵測 `auto/` 前綴
2. 從資料庫查詢所有**使用中的提供者連線**
3. 篩選出具有有效認證資訊（API 金鑰或 OAuth 權杖）的連線
4. 決定每個連線所使用的模型（`connection.defaultModel` 或提供者的第一個模型）
5. 在記憶體中建立**虛擬組合**（不儲存於 DB）
6. 使用所選變體的權重設定檔 + LKGP 策略進行路由

**主要特性：**

- ✅ **永遠啟用：** 無須切換開關、不必建立組合，也不需要任何設定
- ✅ **動態：** 自動反映目前已連線的提供者
- ✅ **工作階段黏著性：** LKGP 確保優先使用上次成功的提供者
- ✅ **支援多帳號：** 每個提供者連線都會成為獨立候選項目
- ✅ **不寫入 DB：** 虛擬組合僅存在於該次請求中，完全沒有持久化額外負擔

### 各金鑰的候選項目控制（#7819，Level 1+2）

`GET /v1/auto-combo/{channel}/candidates`（`{channel}` = `auto/` 後方的後綴，或
基礎頻道所使用的字面值 `auto`）是一個**唯讀**端點，用於列出
`auto/*` 頻道目前的候選池，並附上即時可達性資訊；它會重複使用
現有的韌性狀態讀取方式（絕不直接讀取斷路器的 `state`）：

- 提供者斷路器——`getCircuitBreaker(provider).getStatus()` / `.canExecute()`
- 連線冷卻——已解析之 `provider_connections` 資料列上的
  `rateLimitedUntil` / `testStatus`
- 模型鎖定——`isModelLocked(provider, connectionId, model)`

每個候選項目也會包含此 API 金鑰的 `excluded` 旗標。排除項目會依
每個 API 金鑰分別儲存（`auto_candidate_overrides` 資料表，遷移版本 `128`）——OmniRoute
是單一租戶系統，且沒有 `users` 資料表，因此 `apiKeyId` 是最接近真實呼叫者身分的
識別資訊——並透過經過純函式單元測試的
`filterExcludedCandidates()`（`open-sse/services/autoCombo/candidateOverrides.ts`），
在 `open-sse/services/autoCombo/virtualFactory.ts` 的候選池關鍵入口強制執行。
此篩選器採用**失敗開放**策略：未設定 apiKeyId/頻道或 DB 查詢失敗時，
都會保留未篩選的候選池，因此未設定任何覆寫項目的操作者會看到與此功能推出前
逐位元組完全相同的路由行為。

**延後至後續議題：** 每個候選項目的權重 + 明確排序（第 3 級
——會整合至現有的加權／優先級策略路徑），以及為每個 `auto/*` 頻道固定特定的
`combo.ts` 策略（第 4 級）。關於在單租戶模型下，覆寫設定應維持每個 API 金鑰各自獨立，還是改為全域設定的未決問題，請參閱 #7819 計畫。

**幕後運作：**

```txt
請求：{ model: "auto/coding" }
   ↓
src/sse/handlers/chat.ts 偵測前綴
   ↓
createVirtualAutoCombo('coding') → 從作用中的連線建立 candidatePool
   ↓
handleComboChat（使用與持久化組合相同的引擎）
   ↓
自動評分會為每個請求選擇最佳的提供者／模型
```

**實作檔案：**

| 檔案                                                      | 用途                             |
| --------------------------------------------------------- | -------------------------------- |
| `open-sse/services/autoCombo/autoPrefix.ts`               | 前綴剖析器（`parseAutoPrefix`）  |
| `open-sse/services/autoCombo/virtualFactory.ts`           | 建立虛擬 `AutoComboConfig` 物件  |
| `open-sse/services/autoCombo/providerRegistryAccessor.ts` | 用於模擬提供者登錄檔的測試掛鉤   |
| `src/sse/handlers/chat.ts`                                | 整合：自動前綴短路處理           |
| `src/shared/constants/providers.ts`                       | `SYSTEM_PROVIDERS.auto` 系統項目 |

## 與實際模型 ID 相符的組合名稱

`name` 與純模型 ID 完全相同的組合（例如名為 `gpt-5.5` 的組合）是**刻意設計且受支援的模式**，而非錯誤：這是 [#6940](https://github.com/diegosouzapw/OmniRoute/issues/6940) 中所記載，針對各模型 ID 進行提供者備援的機制。由於組合解析會先於純模型 ID 解析進行（`src/sse/services/model.ts` 中的 `getComboForModel()`），因此對純 ID `gpt-5.5` 的請求會透過該組合的目標（例如 `acme-responses/gpt-5.5`、`backup-responses/gpt-5.5`）路由，而不是直接傳送至單一提供者——這重用了為 [#3227/#3233](https://github.com/diegosouzapw/OmniRoute/issues/3227) 建立的「組合優先於重寫」優先順序，並由 `tests/unit/responses-combo-resolution-3227.test.ts` 和 `tests/unit/combo-name-codex-responses-rewrite.test.ts` 進行迴歸測試。

建立組合或重新命名組合，使其名稱遮蔽實際模型 ID，**絕不會遭到拒絕**——否則將破壞此處記載的工作流程。相反地（#8530），當（新）名稱與實際模型 ID 衝突時，`POST /api/combos` 和 `PUT /api/combos/[id]` 會在回應中附加一個非阻斷性的 `warning` 欄位：

```json
{
  "warning": {
    "code": "COMBO_NAME_SHADOWS_MODEL",
    "modelId": "gpt-5.5",
    "providerId": "openai"
  }
}
```

啟動時，`scanComboModelNameCollisionsAtBoot()`（`src/instrumentation-node.ts`）也會記錄一行 `[STARTUP]` 警告，列出每個遮蔽模型 ID 的現有組合，讓意外遇到此情況（而非依照 #6940 刻意設定）的營運人員能收到提示。偵測輔助函式位於 `src/lib/combos/modelNameCollision.ts`。

## 從用戶端呼叫自訂組合

只有當用戶端在 `model` 欄位中傳送組合的**確切名稱**時，才會使用持久化組合（Settings → Combos）——組合名稱不支援模糊或部分比對，也不涉及 `auto/` 前綴。解析順序（`src/sse/services/model.ts` 中的 `getComboForModel()`）：

1. 組合名稱完全相符（`model: "my-combo"`），
2. `combo/<name>` 前綴（`model: "combo/my-combo"`），
3. 模型→組合的 glob 對應（`/api/model-combo-mappings`）。

```bash
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Authorization: Bearer <key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"my-combo","messages":[{"role":"user","content":"Hello"}]}'
```

兩個常見陷阱：

- **`auto` 不會使用您的組合。** `auto`/`auto/*` 會建立自己的零設定候選集，且只有在某個組合的名稱確實為 `auto` 時才會查閱持久化組合（不建議這麼做）。若要透過組合進行路由，請傳送其確切名稱，而不是 `auto`。
- **`openrouter/auto` 是真正的付費 OpenRouter 產品**（「Auto Best Available」），而不是 OmniRoute 別名。它是 OpenRouter 登錄檔（`open-sse/config/providers/registry/openrouter/index.ts`）中唯一的靜態模型項目，且會獨立計費。請使用 Settings → Routing → Hide paid models，將其排除於 `auto` 候選集中。

請參閱 [#7992](https://github.com/diegosouzapw/OmniRoute/issues/7992) 和 [#7111](https://github.com/diegosouzapw/OmniRoute/issues/7111)，以瞭解本文所說明之原始混淆。

## 運作方式（持久化自動組合）

自動組合引擎使用**含 16 項因素的評分函式**（定義於 `open-sse/services/autoCombo/scoring.ts` → `DEFAULT_WEIGHTS`），為每個請求動態選擇最佳的提供者／模型。預設權重總和為 `1.0`；自訂權重會由 `normalizeScoringWeights()` 重新正規化。這十六項因素中有兩項——`cacheAffinity` 與 `resetWindowAffinity`——的預設權重為 `0`；`reliability` 在 `DEFAULT_WEIGHTS` 中的權重為 `0`，但在一般套件中為 `0.03`，在 `reliability-first` 中則為 `0.04`；而 `quality` 在套件中的權重為 `0.02`（在 `quality-first` 中為 `0.03`）：系統仍會為每個候選項目計算這些因素，且 `cacheAffinity` 會在評分之外控制提示快取去重，因此，預設為零的因素在預設情況下不會參與評分，但套件會使用它們。

![自動組合的 16 因素評分](../diagrams/exported/auto-combo-scoring.svg)

> 來源：[diagrams/auto-combo-scoring.mmd](../diagrams/auto-combo-scoring.mmd)（可透過 `npm run docs:render-diagrams` 重新產生）。檔名是沿用歷史命名；原始檔與轉譯後的圖表皆顯示 `DEFAULT_WEIGHTS` 中宣告的全部 16 項因素。

| 因素                  | 預設權重 | 說明                                                                                                                                                 |
| :-------------------- | :------- | :--------------------------------------------------------------------------------------------------------------------------------------------------- |
| `quota`               | 0.1429   | 剩餘配額／速率限制餘裕 [0..1]                                                                                                                        |
| `health`              | 0.1605   | 來自斷路器的健康分數（CLOSED=1.0、HALF_OPEN=0.5、OPEN=0.0）                                                                                          |
| `costInv`             | 0.1429   | **混合**成本的倒數（60% 輸入 + 40% 輸出 token 價格，經正規化）——越便宜，分數越高                                                                     |
| `latencyInv`          | 0.1143   | 相對於候選池正規化後的 p95 延遲倒數——越快，分數越高                                                                                                  |
| `taskFit`             | 0.0762   | 任務類型適配度（編碼、審查、規劃、分析、除錯、文件）                                                                                                 |
| `stability`           | 0.0476   | 根據延遲標準差計算、以變異程度為基礎的穩定性——回應時間波動較大的候選項目分數較低                                                                     |
| `tierPriority`        | 0.0476   | 帳戶層級優先順序——Ultra=1.0、Pro=0.67、Standard=0.33、Free=0.0                                                                                       |
| `tierAffinity`        | 0.0476   | 候選項目層級與資訊清單建議層級之間的親和度                                                                                                           |
| `specificityMatch`    | 0.0476   | 請求明確程度（資訊清單提示）與模型層級之間的匹配度                                                                                                   |
| `contextAffinity`     | 0.0476   | 請求所需的上下文視窗與模型上下文視窗之間的親和度                                                                                                     |
| `sessionAvailability` | 0.0476   | 此工作階段中候選連線的 OAuth 工作階段可用性（`getOAuthSessionAvailability()`；非 OAuth 連線的分數為 1.0）                                            |
| `connectionDensity`   | 0.0476   | 將負載分散至同一提供者的不同連線（避免集中）                                                                                                         |
| `cacheAffinity`       | 0.00     | 透過 Rendezvous 雜湊，優先選擇最有可能已持有此請求提示快取前綴的連線（`open-sse/services/combo/promptCacheAffinity.ts`）；預設停用（#8008）          |
| `resetWindowAffinity` | 0.00     | 偏向配額重設時間窗較有利的連線（預設停用）                                                                                                           |
| `quality`             | 0.03     | 由路由事件品質追蹤器根據回饋產生的輸出品質訊號；沒有觀測資料的候選項目會獲得中性分數 0.5                                                             |
| `reliability`         | 0.00     | 根據過去 24 小時使用記錄，在至少十個樣本的門檻下計算觀測到的成功比例 `1 - failureRate`（否則使用即時指標）；沒有觀測資料的候選項目視為 1.0。預設停用 |

**總和：**`0.1429 + 0.1605 + 0.1429 + 0.1143 + 0.0762 + (7 × 0.0476) + 0.00 + 0.00 + 0.03 + 0.00 = 1.0`，如 `DEFAULT_WEIGHTS` 中所宣告；使用者設定的權重會在評分前由 `normalizeScoringWeights()` 重新正規化為一個分布。

## 模式套件

`open-sse/services/autoCombo/modePacks.ts` 中有 6 個預先定義的權重設定檔。每個套件都會完全取代預設權重，使選擇偏向特定目標。每個套件的權重總和都已是 `1.0`（以四位小數顯示時為 `0.9999`），因此當套件啟用時，`normalizeScoringWeights()` 實際上沒有需要修正的內容——以下數值在四捨五入的誤差範圍內，就是評分器所套用的值。

| 因素                  | ship-fast  | cost-saver | quality-first | offline-friendly | reliability-first | chaos-mode |
| :-------------------- | :--------- | :--------- | :------------ | :--------------- | :---------------- | :--------- |
| `quota`               | 0.1133     | 0.1133     | 0.0752        | **0.3324**       | 0.1133            | 0.0376     |
| `health`              | 0.2667     | 0.1810     | 0.1714        | 0.2667           | **0.3524**        | **0.4000** |
| `costInv`             | 0.0276     | **0.3324** | 0.0276        | 0.0752           | 0.0181            | 0.0140     |
| `latencyInv`          | **0.3048** | 0.0476     | 0.0476        | 0.0476           | 0.0476            | 0.0186     |
| `taskFit`             | 0.0952     | 0.0952     | **0.3524**    | 0.0000           | 0.0952            | 0.1905     |
| `stability`           | 0.0000     | 0.0476     | 0.1429        | 0.0952           | 0.1905            | 0.1714     |
| `tierPriority`        | 0.0376     | 0.0376     | 0.0276        | 0.0376           | 0.0276            | 0.0040     |
| `tierAffinity`        | 0.0000     | 0.0000     | 0.0000        | 0.0000           | 0.0000            | 0.0000     |
| `specificityMatch`    | 0.0000     | 0.0000     | 0.0000        | 0.0000           | 0.0000            | 0.0000     |
| `contextAffinity`     | 0.0095     | 0.0000     | 0.0000        | 0.0000           | 0.0000            | 0.0186     |
| `sessionAvailability` | 0.0476     | 0.0476     | 0.0476        | 0.0476           | 0.0476            | 0.0476     |
| `resetWindowAffinity` | 0.0000     | 0.0000     | 0.0000        | 0.0000           | 0.0000            | 0.0000     |
| `connectionDensity`   | 0.0476     | 0.0476     | 0.0476        | 0.0476           | 0.0476            | 0.0476     |
| `quality`             | 0.02       | 0.02       | **0.03**      | 0.02             | 0.02              | 0.02       |
| `reliability`         | 0.03       | 0.03       | 0.03          | 0.03             | **0.04**          | 0.03       |

注意事項：

- **套件包含 `quality` 和 `reliability`**（`quality 0.02`、`quality-first 0.03`；`reliability 0.03`、`reliability-first 0.04`），並且會完整取代權重映射（`weights = pack`，而非合併）。`DEFAULT_WEIGHTS` 包含 `quality 0.03 / reliability 0`；選擇 `balanced`/`default` 時會保留這些預設值，選擇套件時則會使用上表中的套件值。對於冷啟動的池（尚無觀測資料，因此 `quality 0.5`、`reliability 1`），這兩項因素在一般套件下會增加 `+0.04`（`0.03 + 0.01`），在 `quality-first` 下增加 `+0.045`，在 `reliability-first` 下增加 `+0.05`。
- 每個套件中的 `tierAffinity`、`specificityMatch` 和 `resetWindowAffinity` 都明確設為 `0`。
- 各套件的重點一覽：
  - **ship-fast** → latencyInv 0.3048 + health 0.2667（低延遲、健康的連線）
  - **cost-saver** → costInv 0.3324（最便宜的權杖勝出）
  - **quality-first** → taskFit 0.3524 + stability 0.1429 + quality 0.03，為所有套件中最高（最適合任務且表現一致的模型）
  - **offline-friendly** → quota 0.3324 + health 0.2667（不論速度或成本，優先提供最大餘裕）
  - **reliability-first** → health 0.3524 + stability 0.1905 + reliability 0.04，為所有套件中最高（最少意外情況）
  - **chaos-mode** → health 0.4000 + taskFit 0.1905（故障注入設定檔）

### 每個請求的控制項（標頭）— #6023 / #6024 / #6025 / #3470

`auto` 組合可透過三個標頭，**針對每個請求**進行調整，而不會變更該
組合已儲存的設定。這些控制項僅適用於 `auto` 策略，且僅套用至攜帶這些
標頭的請求；若標頭不存在，則使用該組合已儲存的 `modePack`/`budgetCap`/`budgetFallback`。

| 標頭                          | 接受的值                                                                                                                                                                       | 效果                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| :---------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `X-OmniRoute-Mode`            | 預設別名（`fast`、`balanced`、`quality`、`cheap`、`reliable`、`offline`）或原始套件名稱（`ship-fast`、`cost-saver`、`quality-first`、`offline-friendly`、`reliability-first`） | 覆寫此請求的評分權重。`balanced`/`default` 會強制使用預設權重（不使用套件）。未知值將被忽略（保留設定）。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `X-OmniRoute-Budget`          | 正數（每個請求的最高美元金額）                                                                                                                                                 | 硬性成本上限：預估成本超過此上限的候選項目會在選擇前被篩除。當**所有**候選項目都超過上限時的處理方式，由下方的 `X-OmniRoute-Budget-Fallback` 控制。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `X-OmniRoute-Budget-Fallback` | `cheapest`（預設；別名：`cheapest-viable`、`soft`）或 `strict`（別名：`block`、`hard`）                                                                                        | `cheapest`：即使全域最便宜的候選項目仍超過上限，也會改用該候選項目（舊版行為）。`strict`：拒絕進行選擇——請求會立即失敗並回傳 `HTTP 402`，而不是在未提示的情況下超支。未知值將被忽略。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `X-OmniRoute-Effort`          | `auto`（其他值保留供未來使用）                                                                                                                                                 | 自適應思考預算：當請求**沒有**攜帶任何形式的推理欄位（`reasoning_effort`、`reasoning`、`thinking`）時，閘道會根據確定性的請求結構訊號（最後一則使用者訊息的長度、截至最後一則使用者訊息為止的上下文大小、先前的工具結果、工具迴圈深度），將 `auto` 解析為 `low`/`medium`/`high`。訊號的範圍限定於目前回合——最後一則使用者訊息之後的所有內容都會被忽略——因此工具迴圈中的每個請求都會解析為相同層級（每回合無狀態固定、不保留工作階段狀態，也不會在迴圈中途升級，以免破壞上游提示詞快取前綴）。用戶端明確指定的推理欄位一律優先。僅適用於上游分派解析為 OpenAI Chat Completions 格式的請求（`targetFormat === FORMATS.OPENAI`）——`reasoning_effort` 是 OpenAI 格式的欄位，因此此標頭對以 Claude 或 Gemini 為目標的請求不起作用（請參閱 `open-sse/handlers/chatCore/adaptiveEffortWiring.ts`）。 |

```bash
# 強制使用最快的設定檔、將此請求的費用上限設為 $0.05，並在超出預算時直接阻擋，而非繼續支出
curl -sS http://localhost:20128/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "X-OmniRoute-Mode: fast" \
  -H "X-OmniRoute-Budget: 0.05" \
  -H "X-OmniRoute-Budget-Fallback: strict" \
  -d '{"model":"auto","messages":[{"role":"user","content":"hi"}]}'
```

解析是一個純函式（`open-sse/services/autoCombo/requestControls.ts`）；解析後的值會傳入引擎現有的 `config.modePack` / `config.budgetCap` /
`config.budgetFallback` 輸入。組合中儲存的 `config.budgetFallback`（"strict" |
"cheapest"）會設定持久性原則；標頭則會針對單一請求覆寫該原則。

## 所有路由策略

OmniRoute 的組合引擎支援 **19 種路由策略**（宣告於 `src/shared/constants/routingStrategies.ts` → `ROUTING_STRATEGY_VALUES`）。Auto Combo 引擎本身透過 `auto` 策略提供；其他策略則可用於持久化組合。

| 策略                | 說明                                                                                                                                  |
| :------------------ | :------------------------------------------------------------------------------------------------------------------------------------ |
| `priority`          | 具有明確優先順序、以第一個目標為優先的排序清單                                                                                        |
| `weighted`          | 依各目標權重進行加權隨機選擇                                                                                                          |
| `round-robin`       | 按順序輪流使用各個目標                                                                                                                |
| `context-relay`     | 在各目標之間交接上下文（適用於長對話）                                                                                                |
| `fill-first`        | 先用滿每個目標的配額，再移至下一個目標                                                                                                |
| `p2c`               | 隨機「二選一」負載平衡                                                                                                                |
| `random`            | 均勻隨機選擇                                                                                                                          |
| `least-used`        | 選擇目前負載最低的目標                                                                                                                |
| `cost-optimized`    | 根據目錄定價，將每次請求的成本降至最低                                                                                                |
| `reset-aware` ⭐    | 依配額重設時間排定優先順序——重設期間較短者排名較高                                                                                    |
| `reset-window`      | 優先選擇配額期間最快重設的目標                                                                                                        |
| `headroom`          | 選擇剩餘配額餘裕最多的目標                                                                                                            |
| `strict-random`     | 隨機選擇，不對重複項目進行去重                                                                                                        |
| `auto`              | 使用 Auto Combo 評分（16 項因素）——**建議使用**                                                                                       |
| `lkgp`              | 最後已知良好路徑（固定使用最近一次成功的提供者，之後再退回使用規則）                                                                  |
| `context-optimized` | 選擇最符合目前上下文大小的目標                                                                                                        |
| `cache-optimized`   | 依提示詞快取親和性重新排列目標——最可能已持有此請求快取前綴的連線會優先嘗試（`open-sse/services/combo/promptCacheAffinity.ts`、#8008） |
| `fusion` 🧬         | 平行分派至一組模型，然後透過評審模型合成單一答案（見下文）                                                                            |
| `pipeline`          | 依序執行各目標，將每個步驟的輸出傳入下一個步驟作為輸入；僅傳回最終答案（#6396）                                                       |

⭐ = v3.8.0 新增 · 🧬 = v3.8.36 新增

### `weighted` 語意

`weighted` 是**針對每個請求進行一次按比例隨機抽選**
（`open-sse/services/combo/targetSorters.ts` → `selectWeightedTarget`），並非均衡器：

- 每個請求都會以 `weight / totalWeight` 的機率抽出**一個**步驟；其餘步驟則按權重遞減排序，作為該請求的備援鏈。
- 權重為 `0`（或未設定）的步驟，只要有任何其他步驟的權重 > 0，就**永遠不會被抽中**——它只能在抽中的步驟失敗後作為備援。只有在**所有**權重均為 0 時，選擇才會變為均勻隨機。
- 所有目標皆不可用的步驟——提供者斷路器為 `OPEN`、連線處於冷卻期、模型遭鎖定——會在抽選前被移除
  （`open-sse/services/combo/targetResolution.ts`），因此單一健康的步驟可能會暫時贏得每個請求。
- `stickyWeightedLimit`（組合設定，預設為 `1` = 關閉）會將抽中的步驟固定使用指定次數的連續成功，之後才重新抽選。

如需嚴格輪替，請使用 `round-robin`；在 `weighted` 上設定相同權重只能達成統計上的平衡，而非嚴格平衡。

## 融合策略

`fusion` 是唯一一種**不會**選擇單一目標的策略。它會將提示詞平行分派給
**面板中的每個模型**，然後由可設定的**裁判模型**綜合所有面板回應，
產生單一最終答案。移植自上游 `decolua/9router`
（OpenRouter 的 Fusion 設計）；實作位於 `open-sse/services/fusion.ts`。

運作方式：

0. **攜帶工具時略過面板** — 若請求包含非空的 `tools` 陣列，且
   `tool_choice` 未明確設為 `"none"`，則會完全略過面板：請求會直接路由至
   單一模型（已設定的裁判模型，或 `panel[0]`），並原封不動地傳遞
   `tools`/`tool_choice`。面板成員無權使用工具，而裁判模型的
   綜合指示也不鼓勵發出工具呼叫，因此代理式／工具呼叫用戶端
   會取得真正的工具呼叫決策，而非綜合產生的文字內容 (#6771)。
1. **扇出**（僅適用於未攜帶工具的請求）— 提示詞會同時傳送給面板中的每個
   模型，強制使用非串流模式並移除工具（裁判模型需要完整文字內容
   才能進行綜合）。
2. **法定數量寬限收集** — 一旦收到 `minPanel` 個答案，就會為尚未回應的模型
   啟動短暫的寬限計時器；計時結束後，融合程序會使用當時已收集到的答案繼續執行。
   如此可限制最慢模型對實際耗時造成的影響，並由硬性逾時設定進一步約束。
3. **裁判綜合** — 面板答案會經過匿名化（`來源 1`、`來源 2`、……，讓
   裁判依據內容實質而非模型品牌進行評估），然後交給裁判模型；裁判模型會分析
   共識／矛盾／部分涵蓋／獨特見解／盲點，接著撰寫**一個**具權威性的答案。
   裁判呼叫會保留用戶端原始的 `stream` 旗標與工具，因此串流和下游工具使用
   仍可正常運作。
4. **優雅降級** — 0 個面板答案 → `503`；僅有 1 個倖存答案 → 直接回傳該答案
   （沒有可供融合的其他答案）；僅含單一模型的面板會直接回答。

面板成員也可以是 `combo-ref` 步驟（`{kind: "combo-ref", comboName: "..."}`），以參照
另一個組合 — 它會解析為**一個黑箱面板聲音**（完整遞迴分派至
所參照的組合，而不是扇出至該組合自身的目標），並使用其他所有會消費 combo-ref
之策略既有的相同深度／循環保護機制 (#6764)。

### 設定

在組合的 `config` blob 上設定（無須進行結構描述移轉 — 它會重複使用現有的
`combos` 資料表）：

| 欄位                                     | 類型     | 預設值         | 用途                                                        |
| :--------------------------------------- | :------- | :------------- | :---------------------------------------------------------- |
| `config.judgeModel`                      | `string` | 第一個面板模型 | 綜合最終答案的模型                                          |
| `config.fusionTuning.minPanel`           | `number` | `2`            | 啟動寬限計時器前所需的成功答案數（限制於 `[2, panelSize]`） |
| `config.fusionTuning.stragglerGraceMs`   | `number` | `8000`         | 達到法定數量後，等待落後模型的時間                          |
| `config.fusionTuning.panelHardTimeoutMs` | `number` | `90000`        | 絕對上限，避免單一無回應模型阻塞整個請求                    |

預設值位於 `FUSION_DEFAULTS`（`open-sse/services/fusion.ts`）。

### 範例

```bash
curl -X POST http://localhost:20128/api/combos \
  -H "Authorization: Bearer <key>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "fusion-panel",
    "strategy": "fusion",
    "targets": [
      { "model": "cc/claude-opus-4-7" },
      { "model": "cx/gpt-5.5" },
      { "model": "glm/glm-5.1" }
    ],
    "config": {
      "judgeModel": "cc/claude-opus-4-7",
      "fusionTuning": { "minPanel": 2, "stragglerGraceMs": 8000, "panelHardTimeoutMs": 90000 }
    }
  }'
```

接著像呼叫任何其他組合一樣呼叫它：`{"model":"fusion-panel","messages":[...]}`。

## 虛擬 Auto-Combo 工廠

Auto Combo 引擎不需要預先定義的組合。相反地，`open-sse/services/autoCombo/virtualFactory.ts` 會即時建立候選項目：

1. 取得 `getProviderConnections({ isActive: true })`（所有已啟用的連線）
2. 篩選出具有有效憑證的連線（API 金鑰或透過 `hasUsableOAuthToken()` 判定為未過期的 OAuth 權杖）
3. 與 `getProviderRegistry()` 交叉比對模型可用性與定價
4. 針對每個 `(provider, model, connection)` 元組建立一個 `VirtualAutoComboCandidate`
5. 選擇 `connection.defaultModel`（或登錄檔中的第一個模型）作為分派目標
6. 使用 16 因子的 `scorePool()` 與變體的權重套件，為每個候選項目評分
7. 傳回產生於記憶體中的 `AutoComboConfig` 給 `handleComboChat()` — 絕不持久化至資料庫

這表示**新增一個已啟用 `auto/*` 的提供者，會自動擴充候選集區** — 不需要手動編輯組合。虛擬組合會針對每個請求重新建立，因此新加入或恢復健康狀態的連線都能立即被採用。

## 自我修復

- **暫時排除**：分數 < 0.2 → 排除 5 分鐘（漸進式退避，最長 30 分鐘）
- **斷路器感知**：OPEN → 自動排除；HALF_OPEN → 探測請求
- **事故模式**：>50% 為 OPEN → 停用探索，最大化穩定性
- **冷卻恢復**：排除期結束後，第一個請求會是縮短逾時時間的「探測」請求

## Bandit 探索

5% 的請求（可設定）會隨機路由至提供者進行探索。在事故模式下停用。

## API

**沒有專用的 `POST /api/combos/auto` 端點** — Auto-Combo 可透過兩種方式使用：

1. **零設定（建議）：** 傳送任何聊天補全請求，並將 `model` 設為 `"auto"` 或 `"auto/<variant>"`。虛擬工廠會針對每個請求建立組合 — 不需要持久化，也不需要 API 呼叫。

2. **使用 `strategy: "auto"` 的持久化組合：** 透過 `POST /api/combos` 建立一般組合，並設定 `strategy: "auto"`，以及 `config.auto.weights` / `config.auto.candidatePool`。系統會使用相同的評分引擎；組合會儲存在 `combos` 中，並可透過 ID 重複使用。

對於探索用途，`GET /api/combos/auto` 會列出每個變體及其解析後的候選集區，以及 `context_length` / `max_output_tokens` — 其值為候選集區各上下文視窗中的最大值。用戶端（例如 opencode 外掛程式）必須公告這些值，而不是 `0`：零上下文會完全停用 opencode 的自動壓縮，讓工作階段持續增長，直到閘道的歷史記錄清除機制破壞上下文。公告最大值是安全的，因為 Auto-Combo 的上下文預先篩選器會將超大請求路由至具有大型上下文視窗的候選項目。

```bash
# 零設定用法（不建立組合）
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Authorization: Bearer <key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"auto/coding","messages":[{"role":"user","content":"Hello"}]}'

# 透過一般組合端點建立持久化自動組合
curl -X POST http://localhost:20128/api/combos \
  -H "Content-Type: application/json" \
  -d '{"id":"my-auto","name":"Auto Coder","strategy":"auto","config":{"auto":{"candidatePool":["anthropic","google","openai"],"weights":{"quota":0.15,"health":0.3,"costInv":0.05,"latencyInv":0.35,"taskFit":0.1,"stability":0,"tierPriority":0.05}}}}'
```

### 自動路由器策略

持久化的 `strategy: "auto"` 組合可以將 `config.routerStrategy`（或舊版的
`config.auto.routerStrategy`）設定為下列其中之一：

- `rules` — 預設的加權評分
- `score` — 選擇設定中加權分數最高的項目。分數完全相同時，會保留設定的
  候選項目順序；現有的 `explorationRate` 會從完整的排序集區中抽樣。
- `cost` / `eco` — 最便宜的健康提供者
- `latency` / `fast` — 套用可靠性懲罰後，p95 延遲最低者
- `sla-aware` / `sla` — 優先選擇符合 p95 延遲、錯誤率及選用
  成本 SLO 的候選項目
- `lkgp` — 優先使用最後已知良好的提供者

### 路由器策略詳解

Auto-Combo 引擎提供 6 種可插拔的 **RouterStrategy** 實作，
您可以透過 `config.routerStrategy`（或舊版的 `config.auto.routerStrategy`）進行切換。
每個策略都會根據 `RoutingContext`
（任務類型、工具／視覺提示、權杖估算值、選用的 SLA 政策、選用的
最後已知良好提供者），從候選集區中選出一個提供者。

#### 1. `rules`（預設）— 16 因子加權評分

包裝現有的評分引擎。先篩除斷路器狀態為 `OPEN` 的
候選項目，接著使用目前的任務類型與 `getTaskFitness()` 執行 `scorePool()`，
並選擇分數最高的提供者。

```ts
class RulesStrategyImpl implements RouterStrategy {
  readonly name = "rules";
  readonly description = "16-factor weighted scoring (see DEFAULT_WEIGHTS)";

  select(pool, context) {
    const eligible = pool.filter((c) => c.circuitBreakerState !== "OPEN");
    const ranked = scorePool(
      eligible.length > 0 ? eligible : pool,
      context.taskType,
      undefined,
      getTaskFitness
    );
    return { provider: ranked[0].provider /* ... */ };
  }
}
```

**適用時機**：預設選項。當您希望在所有訊號之間取得均衡取捨時使用。

**別名**：`rules`（無別名）

---

#### 2. `cost` / `eco` — 最便宜的健康提供者

依照 `costPer1MTokens` 對候選集區進行排序（遞增），並選擇最便宜的提供者。
會先篩除 `OPEN` 候選項目。

```ts
class CostStrategyImpl implements RouterStrategy {
  readonly name = "cost";
  readonly description = "Always selects cheapest available provider";

  select(pool, context) {
    const healthy = pool.filter((c) => c.circuitBreakerState !== "OPEN");
    const sorted = [...healthy].sort((a, b) => a.costPer1MTokens - b.costPer1MTokens);
    return { provider: sorted[0].provider /* ... */ };
  }
}
```

**適用時機**：成本敏感型工作負載、批次處理或背景工作。

**別名**：`cost`、`eco`

---

#### 3. `latency` / `fast` — 套用可靠性懲罰後，p95 延遲最低者

依據 `p95LatencyMs + (errorRate * 1000)` 排序。錯誤率懲罰可確保不可靠的提供者排名較低，即使其標稱延遲很低亦然。

```ts
class LatencyStrategyImpl implements RouterStrategy {
  readonly name = "latency";
  readonly description = "Prioritizes lowest p95 latency with reliability weighting";

  select(pool, context) {
    const healthy = pool.filter((c) => c.circuitBreakerState !== "OPEN");
    const sorted = [...healthy].sort(
      (a, b) => a.p95LatencyMs + a.errorRate * 1000 - (b.p95LatencyMs + b.errorRate * 1000)
    );
    return { provider: sorted[0].provider /* ... */ };
  }
}
```

**適用時機**：對延遲敏感的工作負載，例如即時聊天、自動完成或互動式程式設計助理。

**別名**：`latency`、`fast`

---

#### 4. `sla-aware` / `sla` — 延遲／錯誤／成本 SLO 合規性

根據每個候選項符合已設定 SLO 政策的程度進行評分：

| 因素       | 權重 | 公式                                              |
| ---------- | ---- | ------------------------------------------------- |
| 延遲分數   | 35%  | `threshold / max(value, ε)`                       |
| 錯誤分數   | 35%  | `threshold / max(value, ε)`                       |
| 健康度分數 | 15%  | `1.0` (CLOSED) / `0.5` (HALF_OPEN) / `0.0` (OPEN) |
| 成本分數   | 10%  | `threshold / max(value, ε)` 或反向正規化          |
| 穩定性分數 | 5%   | 反向正規化的延遲標準差                            |

當 `hardConstraints: true` 時，候選項主要依據**違規分數**（超出任何 SLO 的程度）排序，接著再依綜合分數排序。否則，只會依綜合分數排序。

```ts
class SLAStrategyImpl implements RouterStrategy {
  readonly name = "sla-aware";
  readonly description =
    "Selects the provider most likely to satisfy latency, error-rate, and cost SLOs";

  select(pool, context) {
    // ... 根據政策對每個候選項進行評分：{ targetP95Ms, maxErrorRate, maxCostPer1MTokens, hardConstraints }
  }
}
```

**SLA 欄位**（在組合設定中設定）：

```json
{
  "strategy": "auto",
  "config": {
    "routerStrategy": "sla-aware",
    "slaTargetP95Ms": 1500,
    "slaMaxErrorRate": 0.05,
    "slaMaxCostPer1MTokens": 5,
    "slaHardConstraints": true
  }
}
```

**適用時機**：具有嚴格延遲、錯誤率或成本預算的正式環境工作負載。

**別名**：`sla-aware`、`sla`

---

#### 5. `lkgp` — 優先使用最後已知的良好提供者

首先嘗試**最後已知的良好提供者**（若已設定），然後退回使用 `rules` 策略。適合用於工作階段黏著性——由相同提供者處理對話中的後續請求。

```ts
class LKGPStrategyImpl implements RouterStrategy {
  readonly name = "lkgp";
  readonly description = "Tries last known good provider first, then falls back to rules";

  select(pool, context) {
    if (context.lkgpEnabled === false) {
      return getStrategy("rules").select(pool, context);
    }

    if (context.lastKnownGoodProvider) {
      const candidates = pool.filter(
        (c) => c.provider === context.lastKnownGoodProvider && c.circuitBreakerState !== "OPEN"
      );
      if (candidates.length > 0) {
        return { provider: candidates[0].provider /* ... */ };
      }
    }

    // 退回使用 rules 策略
    return getStrategy("rules").select(pool, context);
  }
}
```

**適用時機**：希望由相同提供者處理後續請求的多輪對話（例如為了快取、情境連續性或定價一致性）。

**別名**：`lkgp`（無其他別名）

---

### 自訂路由器策略

您可以透過公用 API 註冊自己的 `RouterStrategy` 實作：

```ts
import {
  registerStrategy,
  type RouterStrategy,
} from "@omniroute/open-sse/services/autoCombo/routerStrategy";

class MyCustomStrategy implements RouterStrategy {
  readonly name = "my-custom";
  readonly description = "My custom routing strategy";

  select(pool, context) {
    // 在此加入您的路由邏輯
    return {
      provider: pool[0].provider,
      model: pool[0].model,
      strategy: this.name,
      reason: "MyCustomStrategy: ...",
      candidatesConsidered: pool.length,
      finalScore: 1.0,
    };
  }
}

registerStrategy("my-custom", new MyCustomStrategy());
```

然後即可使用：

```json
{
  "strategy": "auto",
  "config": {
    "routerStrategy": "my-custom"
  }
}
```

---

### 路由器策略選擇指南

| 使用案例       | 策略        | 原因                           |
| -------------- | ----------- | ------------------------------ |
| 平衡型工作負載 | `rules`     | 預設值——考量所有因素           |
| 最小化成本     | `cost`      | 一律選擇最便宜的提供者         |
| 最小化延遲     | `latency`   | 選擇最快且可靠的提供者         |
| 嚴格的 SLO     | `sla-aware` | 依 p95／錯誤／成本門檻進行篩選 |
| 多輪聊天       | `lkgp`      | 工作階段黏著性                 |

SLA 感知欄位：

```json
{
  "strategy": "auto",
  "config": {
    "routerStrategy": "sla-aware",
    "slaTargetP95Ms": 1500,
    "slaMaxErrorRate": 0.05,
    "slaMaxCostPer1MTokens": 5,
    "slaHardConstraints": true
  }
}
```

## 任務適用性

針對 6 種任務類型（`coding`、`review`、`planning`、`analysis`、`debugging`、`documentation`）為 30 多個模型評分。支援萬用字元模式（例如，`*-coder` → 高程式設計分數）。

## Auto 變體摘要

包括不帶變體的 `auto`（預設值），以及在 `autoPrefix.ts` 中宣告的 6 個 `AutoVariant` 值，共有 **7 個可呼叫的模型 ID**：

`auto`、`auto/coding`、`auto/fast`、`auto/cheap`、`auto/offline`、`auto/smart`、`auto/lkgp`

（`AutoVariant` 本身列舉了 6 個值；第 7 個選項是「無變體」——即不帶變體的 `auto`——由 `parseAutoPrefix()` 以 `variant: undefined` 處理。）

## 分層如何融入 Auto-Combo

這個 16 因子評分函式（`open-sse/services/autoCombo/scoring.ts`）將分層成員資格視為兩個訊號：`tierPriority`（0.0476）和 `tierAffinity`（0.0476）。如需完整的 `DEFAULT_WEIGHTS` 集合，請參閱上方標準的[評分因子表](#how-it-works-persisted-auto-combos)——各套件的覆寫設定（ship-fast/cost-saver/quality-first/offline-friendly）列於「每個套件的權重設定檔」表格中。

單憑分層**不會**強制優先選擇 Tier 1——如果 Tier 1 的延遲表現不佳，或成本與品質的比例不理想，Tier 2 就會勝出。若要強制依分層排序，請使用組合策略 `priority`，並依分層排列提供者。

若要大幅偏好 Tier 1（訂閱），請提高 `tierPriority` 權重：

```json
{
  "strategy": "auto",
  "config": { "auto": { "weights": { "tierPriority": 0.3, "costInv": 0.05 } } }
}
```

如需分層定義與提供者分類，請參閱 `docs/marketing/TIERS.md`。

## 測試與涵蓋範圍

### 確定性路由決策矩陣（`npm run test:combo:matrix`）

`tests/integration/combo-matrix/*.test.ts` 透過真實的組合管線搭配模擬的上游，端對端驗證全部 19 種公開策略的路由**決策**。涵蓋範圍包括：

- 全部 19 種 `ROUTING_STRATEGY_VALUES` 策略（ordered、weighted、cost、context、fusion，……）。
- `quota-share`（內部）端對端：透過真實的 `selectQuotaShareTarget` 接縫（`registerQuotaFetcher` / `setLKGP` / `__setHeadroomSaturationFetcherForTests`），驗證 DRR 公平性與飽和度降優先處理。
- 涵蓋所有目標數量的 `context-relay` 通用交接。

此測試套件會在 CI（`test:integration` 作業）中使用 `--test-concurrency=1` 和 `--test-force-exit` 執行，因此結果具確定性，且不需要即時憑證。

### 閘控式即時冒煙測試（不在 CI 中——使用真實提供者）

| 命令                                   | 功能                                                                     |
| :------------------------------------- | :----------------------------------------------------------------------- |
| `npm run test:combo:live`              | 使用 `RUN_COMBO_LIVE=1` 進行程序內真實路由；擷取即時 OmniRoute DB 的快照 |
| `npm run test:combo:live:vps`          | 對即時 OmniRoute 伺服器發出 HTTP 呼叫（設定 `COMBO_LIVE_BASE_URL`）      |
| `npm run test:combo:live:vps:failover` | 同上，但包含刻意設計的容錯移轉情境                                       |

這些冒煙測試會驗證真實的線路路徑（組合 → 提供者 → 完成）。由於需要即時憑證與 VPS 存取權限，因此刻意將其排除於 CI 之外。

---

## 檔案

| 檔案                                                      | 用途                                                                         |
| :-------------------------------------------------------- | :--------------------------------------------------------------------------- |
| `open-sse/services/autoCombo/scoring.ts`                  | 16 因子評分函式、`DEFAULT_WEIGHTS`、池正規化                                 |
| `open-sse/services/autoCombo/taskFitness.ts`              | 模型 × 任務適配度查找                                                        |
| `open-sse/services/autoCombo/engine.ts`                   | 選擇邏輯、多臂吃角子機、預算上限                                             |
| `open-sse/services/autoCombo/selfHealing.ts`              | 排除、探測、事件模式                                                         |
| `open-sse/services/autoCombo/modePacks.ts`                | 6 種權重設定檔（快速交付、省成本、品質優先、離線友善、可靠性優先、混沌模式） |
| `open-sse/services/autoCombo/autoPrefix.ts`               | `auto/` 前綴剖析器 + 6 種變體                                                |
| `open-sse/services/autoCombo/virtualFactory.ts`           | 從即時連線建立記憶體內的 `AutoComboConfig`                                   |
| `open-sse/services/autoCombo/providerRegistryAccessor.ts` | 用於模擬提供者登錄檔的測試掛鉤                                               |
| `src/shared/constants/routingStrategies.ts`               | `ROUTING_STRATEGY_VALUES`（19 種策略）                                       |
| `src/sse/handlers/chat.ts`                                | 整合：auto-prefix 短路處理                                                   |
