---
title: "OmniRoute 自動組合引擎"
version: 3.8.40
lastUpdated: 2026-06-28
---

# OmniRoute 自動組合引擎

> **給一般使用者**：想要快速入門？請參閱[自動組合使用者指南](../getting-started/AUTO-COMBO-GUIDE.md)取得簡單的說明與範例。

> 自我管理模型鏈，具備自適應評分 + 零設定自動路由

## 零設定自動路由（`auto/` 前綴）

> **新功能：** 無需建立組合。直接在任何客戶端中使用 `auto/` 前綴。

### 快速範例

| 模型 ID         | 變體      | 行為                                                            |
| --------------- | --------- | --------------------------------------------------------------- |
| `auto`          | 預設      | 所有已連線提供商，LKGP 策略，平衡權重                           |
| `auto/coding`   | coding    | 品質優先權重，適合程式碼生成                                    |
| `auto/fast`     | fast      | 低延遲加權選擇                                                  |
| `auto/cheap`    | cheap     | 成本最佳化路由（最低成本優先）                                  |
| `auto/offline`  | offline   | 偏好額度可用性最高的提供商                                      |
| `auto/smart`    | smart     | 品質優先 + 較高探索率（10%），以發掘更佳模型                    |
| `auto/lkgp`     | lkgp      | 明確 LKGP（與預設 `auto` 相同）                                 |

### 類別 × 層級組合（`auto/<類別>:<層級>`）

OpenRouter 風格的後綴將**路由種類**（類別）與**最佳化方式**（層級）分離，讓您可以自由組合（#4235 Phase B, `open-sse/services/autoCombo/suffixComposition.ts`）：

- **類別**（依能力過濾候選池）：`coding`（程式）· `reasoning`（推理）· `vision`（視覺）· `chat`（對話）· `multimodal`（多模態）。`vision`/`multimodal` 保留具視覺能力的模型；`reasoning` 保留推理/思考模型。
- **層級**（選擇評分權重 / 過濾池）：`fast`（快速出貨）· `cheap`（別名 `floor`，節省成本）· `reliable`（斷路器健康度 + 延遲穩定性）· `free` / `pro`（透過 `classifyTier` 依模型層級過濾池 — 免費層 vs. 高級層）。

| 範例                        | 解析結果                                        |
| --------------------------- | ----------------------------------------------- |
| `auto/coding:fast`          | coding 池，低延遲權重                           |
| `auto/coding:cheap`         | coding 池，成本最佳化（別名 `auto/coding:floor`）|
| `auto/reasoning:pro`        | 僅限推理/思考模型，高級層                       |
| `auto/vision`               | 具視覺能力的模型（無層級 → 平衡權重）           |
| `auto/multimodal:free`      | 多模態能力模型，僅限免費層                      |

任何有效的 `auto/<類別>[:<層級>]` 皆可按需解析；精選子集會在 `/v1/models` 與儀表板中顯示（`AUTO_SUFFIX_VARIANTS` 定義於 `open-sse/services/autoCombo/builtinCatalog.ts`）。過濾採用**容錯開放**機制—若條件未匹配到任何已連線模型，則使用完整候選池，確保路由永不中斷。核心評分器（`combo.ts`）維持不變；類別/層級過濾則在 `buildAutoCandidates` 中執行。

> **即時模型智慧：** 若 `ARENA_ELO_SYNC_ENABLED` 旗標開啟，自動路由的適應性會參考即時 **Arena ELO** 排名 + **models.dev** 層級資料；否則回退至靜態適應性評分表。

**使用方式：**

```bash
# 任何支援 OpenAI 格式的 IDE 或 CLI 工具
Base URL: http://localhost:20128/v1
API Key:  <your-endpoint-key>

# 在程式碼/設定中，將 model 設為：
model: "auto"                 # 平衡預設
model: "auto/coding"          # 最適合程式任務
model: "auto/fast"            # 最快的可用選項
model: "auto/cheap"           # 每 token 最便宜
```

**運作流程：**

1. OmniRoute 在 `src/sse/handlers/chat.ts` 中偵測到 `auto/` 前綴
2. 查詢資料庫中所有**活躍的提供商連線**
3. 過濾出具有有效憑證（API 金鑰或 OAuth token）的連線
4. 為每個連線決定模型（`connection.defaultModel` 或提供商的第一個模型）
5. 在記憶體中建立**虛擬組合**（不存入資料庫）
6. 使用所選變體的權重設定檔 + LKGP 策略進行路由

**主要特性：**

- ✅ **永遠開啟：** 無需開關、無需建立組合、無需設定
- ✅ **動態：** 自動反映當前連線的提供商
- ✅ **工作階段黏著性：** LKGP 確保上次成功的提供商獲得優先權
- ✅ **多帳號感知：** 每個提供商連線成為獨立的候選項目
- ✅ **無資料庫寫入：** 虛擬組合僅存在於請求期間，零持久化開銷

### 依金鑰候選控制（#7819, Level 1+2）

`GET /v1/auto-combo/{channel}/candidates`（`{channel}` = `auto/` 後的後綴，或基礎頻道使用 `auto` 字面值）是一個**唯讀**端點，列出某個 `auto/*` 頻道當前的候選池，並裝飾有即時可達性資訊，重複使用現有的彈性讀取機制（絕不直接使用原始的斷路器 `state`）：

- 提供商斷路器 — `getCircuitBreaker(provider).getStatus()` / `.canExecute()`
- 連線冷卻 — `rateLimitedUntil` / `testStatus`（來自已解析的 `provider_connections` 資料列）
- 模型鎖定 — `isModelLocked(provider, connectionId, model)`

每個候選項也攜帶此 API 金鑰的 `excluded`（排除）旗標。排除設定依各 API 金鑰儲存（`auto_candidate_overrides` 資料表，遷移 `128`）— OmniRoute 為單租戶架構，無 `users` 資料表，因此 `apiKeyId` 是最接近的實際呼叫者識別身份—並在候選池的瓶頸點透過純粹且經單元測試的 `filterExcludedCandidates()` 強制執行（`open-sse/services/autoCombo/virtualFactory.ts` → `open-sse/services/autoCombo/candidateOverrides.ts`）。此過濾採用**容錯開放**機制：若 `apiKeyId`/channel 未設定或資料庫查詢失敗，則不進行過濾，使未設定任何覆寫的管理員所看到的路由行為與此功能推出前完全一致。

**延至後續議題：** 依候選權重 + 明確排序（Level 3 — 饋入現有的加權/優先策略路徑），以及為每個 `auto/*` 頻道鎖定特定的 `combo.ts` 策略（Level 4）。請參閱 #7819 計畫中有關覆寫設定應維持依 API 金鑰或改為全域的開放問題（考量單租戶模型）。

**幕後流程：**

```txt
Request: { model: "auto/coding" }
   ↓
src/sse/handlers/chat.ts 偵測前綴
   ↓
createVirtualAutoCombo('coding') → 來自活躍連線的候選池
   ↓
handleComboChat（與持久化組合使用相同引擎）
   ↓
自動評分為每個請求選擇最佳提供商/模型
```

**實作檔案：**

| 檔案                                                         | 用途                                    |
| ------------------------------------------------------------ | --------------------------------------- |
| `open-sse/services/autoCombo/autoPrefix.ts`                  | 前綴解析器（`parseAutoPrefix`）         |
| `open-sse/services/autoCombo/virtualFactory.ts`              | 建立虛擬 `AutoComboConfig` 物件         |
| `open-sse/services/autoCombo/providerRegistryAccessor.ts`    | 用於 mock 提供商註冊表的測試鉤子       |
| `src/sse/handlers/chat.ts`                                   | 整合點：自動前綴短路處理                |
| `src/shared/constants/providers.ts`                          | `SYSTEM_PROVIDERS.auto` 系統條目        |

## 運作原理（持久化自動組合）

自動組合引擎使用**12 因子評分函數**（定義於 `open-sse/services/autoCombo/scoring.ts` → `DEFAULT_WEIGHTS`）為每個請求動態選擇最佳的提供商/模型。所有權重合計為 **1.0**。

![自動組合 12 因子評分](../diagrams/exported/auto-combo-12factor.svg)

> 來源：[diagrams/auto-combo-12factor.mmd](../diagrams/auto-combo-12factor.mmd)（可透過 `npm run docs:render-diagrams` 重新生成）。

| 因子                   | 預設權重 | 說明                                                              |
| :--------------------- | :------- | :---------------------------------------------------------------- |
| `health`（健康度）     | 0.20     | 斷路器健康分數（CLOSED=1.0, HALF_OPEN=0.5, OPEN=0.0）             |
| `quota`（額度）        | 0.15     | 剩餘額度 / 速率限制餘裕 [0..1]                                    |
| `costInv`（成本倒數）  | 0.15     | 倒數**混合**成本（60% 輸入 + 40% 輸出 token 價格，經正規化）— 越便宜分數越高 |
| `latencyInv`（延遲倒數）| 0.12     | 倒數 p95 延遲經池正規化 — 越快分數越高                            |
| `taskFit`（任務適應性）| 0.08     | 任務類型適應性（程式、審查、規劃、分析、除錯、文件）              |
| `stability`（穩定性）  | 0.05     | 基於變異數的穩定性（低延遲 stdDev / 錯誤率）                      |
| `tierPriority`（層級優先）| 0.05  | 帳戶層級優先級 — Ultra=1.0, Pro=0.67, Standard=0.33, Free=0.0     |
| `tierAffinity`（層級親和性）| 0.05 | 候選層級與清單建議層級之間的親和性                               |
| `specificityMatch`（特異性匹配）| 0.05 | 請求特異性（清單提示）與模型層級之間的匹配度                     |
| `contextAffinity`（上下文親和性）| 0.05 | 請求的上下文視窗需求與模型上下文視窗之間的親和性                 |
| `connectionDensity`（連線密度）| 0.05 | 在同一個提供商的不同連線之間分散負載（反集中化）                 |
| `resetWindowAffinity`（重置視窗親和性）| 0.00 | 傾向於額度重置視窗有利的連線（預設停用）                       |

**合計：** `0.20 + 0.15 + 0.15 + 0.12 + 0.08 + 0.05 + 0.05 + 0.05 + 0.05 + 0.05 + 0.05 + 0.00 = 1.0`（經 `validateWeights()` 驗證）。

## 模式套件

四個預定義的加權設定檔位於 `open-sse/services/autoCombo/modePacks.ts`。每個套件會覆寫預設權重，使選擇偏向特定目標。以下是**每個套件的完整權重表**（每個設定檔行合計為 1.0）。

| 因子         | ship-fast | cost-saver | quality-first | offline-friendly |
| :----------- | :-------- | :--------- | :------------ | :--------------- |
| quota        | 0.14      | 0.14       | 0.10          | **0.37**         |
| health       | 0.28      | 0.19       | 0.18          | 0.28             |
| costInv      | 0.05      | **0.37**   | 0.05          | 0.10             |
| latencyInv   | **0.32**  | 0.05       | 0.05          | 0.05             |
| taskFit      | 0.10      | 0.10       | **0.37**      | 0.00             |
| stability    | 0.00      | 0.05       | 0.15          | 0.10             |
| tierPriority | 0.05      | 0.05       | 0.05          | 0.05             |

備註：

- `tierAffinity` 和 `specificityMatch` 未在模式套件中設定 — `calculateScore()` 在缺少時以 `?? 0` 處理。
- 各套件重點一覽：
  - **ship-fast（快速出貨）** → latencyInv 0.32 + health 0.28（低延遲、健康連線）
  - **cost-saver（節省成本）** → costInv 0.37（最便宜的 token 勝出）
  - **quality-first（品質優先）** → taskFit 0.37 + stability 0.15（最適合任務的模型，一致穩定）
  - **offline-friendly（離線友善）** → quota 0.37 + health 0.28（最大餘裕，不計速度或成本）

### 每次請求控制（標頭）— #6023 / #6024 / #6025 / #3470

`auto` 組合可透過三個標頭**針對每次請求**進行調整，無需修改組合的儲存設定。這些僅適用於 `auto` 策略，且僅對攜帶這些標頭的請求生效；當標頭不存在時，則使用組合儲存的 `modePack`/`budgetCap`/`budgetFallback`。

| 標頭                              | 接受值                                                                                                                                                                                | 效果                                                                                                                                                                                                                               |
| :-------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `X-OmniRoute-Mode`                | 預設別名（`fast`、`balanced`、`quality`、`cheap`、`reliable`、`offline`）或原始套件名稱（`ship-fast`、`cost-saver`、`quality-first`、`offline-friendly`、`reliability-first`）       | 覆寫本次請求的評分權重。`balanced`/`default` 強制使用預設權重（無套件）。未知值則忽略（保留原有設定）。                                                                                                                            |
| `X-OmniRoute-Budget`              | 正數（每次請求的最大美元金額）                                                                                                                                                        | 硬性成本上限：估計成本超過此值的候選項在選擇前即被過濾。當**每個**候選項都超過上限時，行為由下方的 `X-OmniRoute-Budget-Fallback` 控制。                                                                                           |
| `X-OmniRoute-Budget-Fallback`     | `cheapest`（預設，別名：`cheapest-viable`、`soft`）或 `strict`（別名：`block`、`hard`）                                                                                              | `cheapest`：回退至全域最便宜的候選項（即使仍超過上限，為舊版行為）。`strict`：拒絕選擇—請求快速失敗，回傳 `HTTP 402`，而非默默超支。未知值則忽略。                                                                                |

```bash
# 強制使用最快設定檔，將此請求上限設為 $0.05，超支時直接封鎖而非降級
curl -sS http://localhost:20128/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "X-OmniRoute-Mode: fast" \
  -H "X-OmniRoute-Budget: 0.05" \
  -H "X-OmniRoute-Budget-Fallback: strict" \
  -d '{"model":"auto","messages":[{"role":"user","content":"hi"}]}'
```

解析是一個純函數（`open-sse/services/autoCombo/requestControls.ts`）；解析後的值饋入引擎現有的 `config.modePack` / `config.budgetCap` / `config.budgetFallback` 輸入。組合儲存的 `config.budgetFallback`（`"strict"` | `"cheapest"`）設定持久化策略；標頭則為單次請求覆寫此設定。

## 所有路由策略

OmniRoute 的組合引擎支援 **18 種路由策略**（宣告於 `src/shared/constants/routingStrategies.ts` → `ROUTING_STRATEGY_VALUES`）。自動組合引擎本身以 `auto` 策略對外提供；其他策略可用於持久化組合。

| 策略               | 說明                                                                               |
| :----------------- | :--------------------------------------------------------------------------------- |
| `priority`         | 依明確優先級排列的第一目標有序列表                                                  |
| `weighted`         | 依各目標權重的加權隨機選擇                                                          |
| `round-robin`      | 依序循環切換目標                                                                   |
| `context-relay`    | 跨目標交接上下文（長對話）                                                          |
| `fill-first`       | 先填滿每個目標的額度，再移至下一個                                                  |
| `p2c`              | Power-of-2-choices 隨機負載平衡                                                     |
| `random`           | 均勻隨機選擇                                                                       |
| `least-used`       | 挑選當前負載最低的目標                                                              |
| `cost-optimized`   | 依目錄定價最小化每次請求成本                                                        |
| `reset-aware` ⭐   | 依額度重置時間排序 — 重置視窗短者優先                                               |
| `reset-window`     | 偏好額度視窗最快重置的目標                                                          |
| `headroom`         | 挑選剩餘額度空間最大的目標                                                          |
| `strict-random`    | 純隨機，不排除重複                                                                 |
| `auto`             | 使用自動組合評分（9 因子）— **推薦**                                               |
| `lkgp`             | 上次已知良好路徑（黏著路由至上次成功的目標）                                        |
| `context-optimized`| 挑選最適合當前上下文大小的目標                                                      |
| `fusion` 🧬        | 平行分發給多個模型面板，再由評判模型合成一個答案（詳見下方）                        |
| `pipeline`         | 依序執行目標，將每個步驟的輸出串接至下一步驟的輸入；僅回傳最終答案（#6396）         |

⭐ = v3.8.0 新增 · 🧬 = v3.8.36 新增

## Fusion 策略

`fusion` 是唯一一種**不選擇單一目標**的策略。它將提示**平行分發給每個面板模型**，然後由可設定的**評判模型**從所有面板回應中合成一個最終答案。移植自上游 `decolua/9router`（OpenRouter 的 Fusion 設計）；實作位於 `open-sse/services/fusion.ts`。

運作方式：

0. **含有工具的請求繞過** — 若請求攜帶非空的 `tools` 陣列且 `tool_choice` 非明確設為 `"none"`，則跳過面板：直接路由至單一模型（設定的評判模型，或 `panel[0]`），`tools`/`tool_choice` 原樣傳遞。面板成員無法存取工具，且評判模型的合成指示會抑制工具呼叫輸出，因此代理/工具呼叫客戶端會獲得真正的工具呼叫決策，而非合成的散文（#6771）。
1. **平行分發**（僅限不含工具的請求）— 提示同時發送給所有面板模型，強制非串流並移除工具（評判模型需要完整散文才能合成）。
2. **法定人數寬限期收集** — 一旦收到 `minPanel` 個答案，隨即啟動一個短暫的寬限期計時器等待落後者，然後以已收集到的所有答案繼續進行融合。這限制了最慢模型對實際時間的懲罰，並設有硬性超時上限。
3. **評判合成** — 面板答案經匿名化處理（`Source 1`、`Source 2`……— 使評判模型衡量內容實質而非品牌）後交給評判模型，由其分析共識/矛盾/部分覆蓋/獨特見解/盲點，然後撰寫**一個**權威答案。評判呼叫保留客戶端的原始 `stream` 旗標 + 工具，因此串流和下游工具使用仍可運作。
4. **優雅降級** — 0 個面板答案 → `503`；恰好 1 個答案存活 → 直接回傳該答案（無需融合）；單一模型面板則直接回傳答案。

面板成員也可以是 `combo-ref` 步驟（`{kind: "combo-ref", comboName: "..."}`），引用另一個組合—它被解析為**一個黑箱面板聲音**（完整遞迴分發至被引用的組合，而非將該組合自身的目標展開），並具有與其他所有使用 combo-ref 的策略相同的深度/循環保護機制（#6764）。

### 設定

設定於組合的 `config` blob（無需結構描述遷移—它重複使用現有的 `combos` 資料表）：

| 欄位                                        | 類型     | 預設值            | 用途                                                        |
| :------------------------------------------ | :------- | :---------------- | :---------------------------------------------------------- |
| `config.judgeModel`                         | `string` | 第一個面板模型    | 負責合成最終答案的模型                                       |
| `config.fusionTuning.minPanel`              | `number` | `2`               | 寬限期計時器啟動前所需的成功答案數（限制在 `[2, panelSize]` 之間）|
| `config.fusionTuning.stragglerGraceMs`      | `number` | `8000`            | 達到法定人數後等待落後者的時間                               |
| `config.fusionTuning.panelHardTimeoutMs`    | `number` | `90000`           | 絕對超時上限，防止單一掛起的模型拖垮整個請求                |

預設值位於 `FUSION_DEFAULTS`（`open-sse/services/fusion.ts`）。

### 範例

```bash
curl -X POST http://localhost:20128/api/combos \
  -H "Authorization: Bearer ***" \
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

然後像任何組合一樣呼叫：`{"model":"fusion-panel","messages":[...]}`。

## 虛擬自動組合工廠

自動組合引擎無需預先定義的組合。相反地，`open-sse/services/autoCombo/virtualFactory.ts` 會即時建立候選項：

1. 取得 `getProviderConnections({ isActive: true })`（所有啟用的連線）
2. 過濾出具備有效憑證的連線（API 金鑰或未過期的 OAuth token，透過 `hasUsableOAuthToken()`）
3. 與 `getProviderRegistry()` 交叉參考以取得模型可用性 + 定價
4. 對每個元組 `(provider, model, connection)` 建立 `VirtualAutoComboCandidate`
5. 選取 `connection.defaultModel`（或註冊表中的第一個模型）作為分發目標
6. 使用 9 因子 `scorePool()` 和變體的權重套件為每個候選項評分
7. 回傳結果的記憶體中 `AutoComboConfig` 供 `handleComboChat()` 使用 — 永不持久化至資料庫

這表示**新增一個啟用 `auto/*` 的提供商會自動擴展候選池**—無需手動編輯組合。虛擬組合在每次請求時重新建立，因此新新增或剛恢復健康的連線會立即被納入。

## 自我修復

- **暫時排除**：分數 < 0.2 → 排除 5 分鐘（漸進式退避，最長 30 分鐘）
- **斷路器感知**：OPEN → 自動排除；HALF_OPEN → 探測請求
- **事故模式**：>50% OPEN → 停用探索，最大化穩定性
- **冷卻恢復**：排除後，第一個請求為「探測」請求，使用縮短的超時時間

## Bandit 探索

5% 的請求（可設定）會路由至隨機提供商進行探索。事故模式下停用。

## API

**沒有專用的 `POST /api/combos/auto` 端點**—自動組合透過兩種方式使用：

1. **零設定（推薦）：** 發送任何聊天完成請求，設定 `model: "auto"` 或 `model: "auto/<變體>"`。虛擬工廠為每次請求建立組合 — 無需持久化，無需 API 呼叫。

2. **使用 `strategy: "auto"` 的持久化組合：** 透過 `POST /api/combos` 建立一般組合，設定 `strategy: "auto"` 以及 `config.auto.weights` / `config.auto.candidatePool`。使用相同的評分引擎；組合儲存於 `combos` 表中，可透過 ID 重複使用。

用於探索時，`GET /api/combos/auto` 列出每個變體及其已解析的候選池，以及 `context_length` / `max_output_tokens` — 即候選池視窗中的**最大值**。客戶端（例如 opencode 外掛）必須公告這些值而非 `0`：零上下文會完全停用 opencode 的自動壓縮功能，讓工作階段持續增長直到閘道的歷史清除破壞上下文。公告最大值是安全的，因為自動組合上下文預先過濾會將超大型請求路由至大視窗的候選項。

```bash
# 零設定使用（無需建立組合）
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Authorization: Bearer ***" \
  -H "Content-Type: application/json" \
  -d '{"model":"auto/coding","messages":[{"role":"user","content":"Hello"}]}'

# 透過一般組合端點建立持久化自動組合
curl -X POST http://localhost:20128/api/combos \
  -H "Content-Type: application/json" \
  -d '{"id":"my-auto","name":"Auto Coder","strategy":"auto","config":{"auto":{"candidatePool":["anthropic","google","openai"],"weights":{"quota":0.15,"health":0.3,"costInv":0.05,"latencyInv":0.35,"taskFit":0.1,"stability":0,"tierPriority":0.05}}}}'
```

### 自動路由器策略

持久化的 `strategy: "auto"` 組合可以設定 `config.routerStrategy`（或舊版 `config.auto.routerStrategy`）為以下之一：

- `rules` — 預設加權評分
- `cost` / `eco` — 最便宜的健全提供商
- `latency` / `fast` — 最低 p95 延遲，附可靠性懲罰
- `sla-aware` / `sla` — 偏好滿足 p95 延遲、錯誤率與可選成本 SLA 的候選項
- `lkgp` — 上次已知良好的提供商優先

### 路由器策略詳細說明

自動組合引擎提供 5 個可插拔的 **RouterStrategy** 實作，可透過 `config.routerStrategy`（或舊版 `config.auto.routerStrategy`）切換。每種策略根據給定的 `RoutingContext`（任務類型、工具/視覺提示、token 估算、可選 SLA 策略、可選的上次已知良好提供商）從候選池中選擇一個提供商。

#### 1. `rules`（預設）— 6 因子加權評分

包裝現有的評分引擎。過濾掉 `OPEN` 斷路器狀態的候選項，然後使用當前任務類型和 `getTaskFitness()` 執行 `scorePool()`，選取得分最高的提供商。

```ts
class RulesStrategyImpl implements RouterStrategy {
  readonly name = "rules";
  readonly description =
    "6 因子加權評分：額度、健康度、成本、延遲、任務適應性、穩定性";

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

**使用時機**：預設值。當您希望在所有訊號之間取得平衡時使用。

**別名**：`rules`（無別名）

---

#### 2. `cost` / `eco` — 最便宜的健全提供商

將候選池按 `costPer1MTokens`（升序）排序，選取最便宜的。首先過濾掉 `OPEN` 狀態的候選項。

```ts
class CostStrategyImpl implements RouterStrategy {
  readonly name = "cost";
  readonly description = "始終選擇最便宜的可用提供商";

  select(pool, context) {
    const healthy = pool.filter((c) => c.circuitBreakerState !== "OPEN");
    const sorted = [...healthy].sort((a, b) => a.costPer1MTokens - b.costPer1MTokens);
    return { provider: sorted[0].provider /* ... */ };
  }
}
```

**使用時機**：成本敏感的工作負載、批次處理或背景任務。

**別名**：`cost`, `eco`

---

#### 3. `latency` / `fast` — 最低 p95 延遲附可靠性懲罰

按 `p95LatencyMs + (errorRate * 1000)` 排序。錯誤率懲罰確保不可靠的提供商即使名義延遲較低也會被排在較低位置。

```ts
class LatencyStrategyImpl implements RouterStrategy {
  readonly name = "latency";
  readonly description = "優先考慮最低 p95 延遲，加權可靠性";

  select(pool, context) {
    const healthy = pool.filter((c) => c.circuitBreakerState !== "OPEN");
    const sorted = [...healthy].sort(
      (a, b) => a.p95LatencyMs + a.errorRate * 1000 - (b.p95LatencyMs + b.errorRate * 1000)
    );
    return { provider: sorted[0].provider /* ... */ };
  }
}
```

**使用時機**：延遲敏感的工作負載，如即時對話、自動完成或互動式程式碼輔助工具。

**別名**：`latency`, `fast`

---

#### 4. `sla-aware` / `sla` — 延遲/錯誤/成本 SLA 合規

根據每個候選項滿足設定的 SLA 策略的程度進行評分：

| 因子         | 權重 | 公式                              |
| ------------ | ---- | --------------------------------- |
| 延遲分數     | 35%  | `threshold / max(value, ε)`       |
| 錯誤分數     | 35%  | `threshold / max(value, ε)`       |
| 健康分數     | 15%  | `1.0`(CLOSED) / `0.5`(HALF_OPEN) / `0.0`(OPEN) |
| 成本分數     | 10%  | `threshold / max(value, ε)` 或反向正規化 |
| 穩定性分數   | 5%   | 反向正規化延遲標準差              |

當 `hardConstraints: true` 時，候選項主要按**違規分數**（超出任何 SLA 的程度）排序，其次再按綜合分數。否則僅使用綜合分數。

```ts
class SLAStrategyImpl implements RouterStrategy {
  readonly name = "sla-aware";
  readonly description =
    "選擇最可能滿足延遲、錯誤率和成本 SLA 的提供商";

  select(pool, context) {
    // ... 根據策略對每個候選項評分：{ targetP95Ms, maxErrorRate, maxCostPer1MTokens, hardConstraints }
  }
}
```

**SLA 欄位**（設定於組合設定中）：

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

**使用時機**：具有嚴格延遲、錯誤率或成本預算的正式環境工作負載。

**別名**：`sla-aware`, `sla`

---

#### 5. `lkgp` — 上次已知良好的提供商優先

先嘗試**上次已知良好的提供商**（若有設定），若失敗則回退至 `rules` 策略。適用於工作階段的黏著性—同一提供商處理對話中的後續請求。

```ts
class LKGPStrategyImpl implements RouterStrategy {
  readonly name = "lkgp";
  readonly description = "先嘗試上次已知良好的提供商，若失敗則回退至 rules";

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

    // 回退至 rules 策略
    return getStrategy("rules").select(pool, context);
  }
}
```

**使用時機**：多輪對話中，希望同一提供商處理後續請求（例如為了快取、上下文連續性或定價一致性）。

**別名**：`lkgp`（無別名）

---

### 自訂路由器策略

您可以透過公開 API 註冊自己的 `RouterStrategy` 實作：

```ts
import {
  registerStrategy,
  type RouterStrategy,
} from "@omniroute/open-sse/services/autoCombo/routerStrategy";

class MyCustomStrategy implements RouterStrategy {
  readonly name = "my-custom";
  readonly description = "我的自訂路由策略";

  select(pool, context) {
    // 您的路由邏輯在此
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

然後使用：

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

| 使用案例             | 策略         | 原因                              |
| -------------------- | ------------ | --------------------------------- |
| 平衡工作負載         | `rules`      | 預設 — 考慮所有因素               |
| 最小化成本           | `cost`       | 始終選取最便宜的                  |
| 最小化延遲           | `latency`    | 選取最快的可靠提供商              |
| 嚴格 SLA             | `sla-aware`  | 按 p95/錯誤率/成本門檻過濾        |
| 多輪對話             | `lkgp`       | 工作階段黏著性                    |

SLA-aware 欄位：

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

## 任務適應性

30+ 個模型在 6 種任務類型（`coding`（程式）、`review`（審查）、`planning`（規劃）、`analysis`（分析）、`debugging`（除錯）、`documentation`（文件））上進行評分。支援萬用字元模式（例如 `*-coder` → 高程式設計分數）。

## 自動變體回顧

包含裸 `auto`（預設）加上 `autoPrefix.ts` 中宣告的 6 個 `AutoVariant` 值，共有 **7 個可呼叫的模型 ID**：

`auto`, `auto/coding`, `auto/fast`, `auto/cheap`, `auto/offline`, `auto/smart`, `auto/lkgp`

（`AutoVariant` 本身列舉 6 個值；第 7 個選項為「無變體」— 裸 `auto` — 由 `parseAutoPrefix()` 以 `variant: undefined` 處理。）

## 層級如何融入自動組合

12 因子評分函數（`open-sse/services/autoCombo/scoring.ts`）將層級歸屬視為兩個訊號：`tierPriority`（0.05）和 `tierAffinity`（0.05）。請參閱上方標準的[評分因子表](#運作原理持久化自動組合)以取得完整的 `DEFAULT_WEIGHTS` 集合 — 各套件覆寫值（ship-fast/cost-saver/quality-first/offline-friendly）列於「各套件權重設定檔」表中。

層級本身**不會**強制 Tier 1 優先 — 如果 Tier 1 延遲不佳或成本 vs. 品質次佳，則 Tier 2 勝出。若要強制層級排序，請使用組合策略 `priority` 並按層級排列提供商。

若要強烈偏好 Tier 1（訂閱制），請增加 `tierPriority` 權重：

```json
{
  "strategy": "auto",
  "config": { "auto": { "weights": { "tierPriority": 0.3, "costInv": 0.05 } } }
}
```

請參閱 `docs/marketing/TIERS.md` 了解層級定義與提供商分類。

## 測試與覆蓋範圍

### 確定性路由決策矩陣（`npm run test:combo:matrix`）

`tests/integration/combo-matrix/*.test.ts` 證明所有 18 個公開策略的路由**決策**端到端地通過真實的組合管線，上游以 mock 方式模擬。覆蓋範圍包含：

- 全部 18 個 `ROUTING_STRATEGY_VALUES` 策略（有序、加權、成本、上下文、fusion……）。
- `quota-share`（內部）端到端：透過真實的 `selectQuotaShareTarget` 接縫進行 DRR 公平性 + 飽和降級處理（`registerQuotaFetcher` / `setLKGP` / `__setHeadroomSaturationFetcherForTests`）。
- `context-relay` 在所有目標數量下的通用交接覆蓋。

此測試套件在 CI 中執行（`test:integration` 任務），使用 `--test-concurrency=1` 和 `--test-force-exit`，確保確定性且不需要真實憑證。

### 閘控即時煙霧測試（不在 CI 中—需要真實提供商）

| 指令                                      | 功能說明                                                              |
| :---------------------------------------- | :-------------------------------------------------------------------- |
| `npm run test:combo:live`                 | 處理中真實路由（`RUN_COMBO_LIVE=1`）；快照即時 OmniRoute 資料庫        |
| `npm run test:combo:live:vps`             | 對即時 OmniRoute 伺服器的 HTTP 呼叫（設定 `COMBO_LIVE_BASE_URL`）      |
| `npm run test:combo:live:vps:failover`    | 同上，但加入刻意觸發的容錯轉移情境                                    |

這些煙霧測試實際演練真實線路（組合 → 提供商 → 完成）。刻意排除在 CI 之外，因為它們需要真實憑證和 VPS 存取權限。

---

## 相關檔案

| 檔案                                                        | 用途                                           |
| :---------------------------------------------------------- | :--------------------------------------------- |
| `open-sse/services/autoCombo/scoring.ts`                    | 9 因子評分函數、`DEFAULT_WEIGHTS`、池正規化    |
| `open-sse/services/autoCombo/taskFitness.ts`                | 模型 × 任務適應性查詢表                        |
| `open-sse/services/autoCombo/engine.ts`                     | 選擇邏輯、bandit、預算上限                     |
| `open-sse/services/autoCombo/selfHealing.ts`                | 排除、探測、事故模式                           |
| `open-sse/services/autoCombo/modePacks.ts`                  | 4 個權重設定檔（ship-fast, cost-saver, quality-first, offline-friendly） |
| `open-sse/services/autoCombo/autoPrefix.ts`                 | `auto/` 前綴解析器 + 6 個變體                  |
| `open-sse/services/autoCombo/virtualFactory.ts`             | 從即時連線建立記憶體中 `AutoComboConfig`       |
| `open-sse/services/autoCombo/providerRegistryAccessor.ts`   | 用於 mock 提供商註冊表的測試鉤子               |
| `src/shared/constants/routingStrategies.ts`                 | `ROUTING_STRATEGY_VALUES`（18 種策略）         |
| `src/sse/handlers/chat.ts`                                  | 整合點：自動前綴短路處理                       |
