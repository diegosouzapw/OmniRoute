# 🗜️ Prompt Compression Guide — OmniRoute (中文 (繁體))

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_GUIDE.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_GUIDE.md)

---

> 自動為符合條件的上下文節省 15-95%。如需快速概覽，請參閱 [README 壓縮章節](../README.md#%EF%B8%8F-prompt-compression--save-15-95-eligible-tokens-automatically)。

## 概覽

OmniRoute 實作了一套模組化提示詞壓縮管線，會在請求送達上游提供者之前**主動**執行。這表示系統會以透明方式節省權杖，無須變更您的工作流程。

```
用戶端請求
  → 壓縮策略選擇器
    → 有組合覆寫？→ 使用組合設定
    → 達到自動觸發門檻？→ 使用自動模式
    → 有預設模式？→ 使用全域設定
    → 關閉？→ 略過壓縮
  → 所選壓縮模式
    → 關閉：不壓縮
    → 輕量：安全地清理空白與格式（約 15%）
    → 標準：移除穴居人式贅詞（約 30%）
    → 積極：對歷史記錄進行老化處理與摘要（約 50%）
    → 超高：啟發式修剪與程式碼區塊精簡（約 75%）
    → RTK：辨識命令的終端機／工具輸出篩選（上游範圍 60-90%）
    → 堆疊：依序執行的多引擎管線，通常先執行 RTK，再執行 Caveman（符合條件的範圍為 78-95%）
  → 壓縮後的請求 → 提供者
```

---

## 壓縮模式

### 關閉

不套用壓縮。所有訊息皆維持原樣傳遞。

### 輕量模式（節省約 15%，延遲 <1ms）

最安全的模式——不會改變任何語意，只清理格式：

| 技術                     | 說明                       |
| ------------------------ | -------------------------- |
| `collapseWhitespace`     | 合併連續的空白行與行尾空格 |
| `dedupSystemPrompt`      | 移除重複的系統訊息         |
| `compressToolResults`    | 壓縮冗長的工具／函式輸出   |
| `removeRedundantContent` | 移除重複的指示             |
| `replaceImageUrls`       | 縮短 base64 圖片資料 URI   |

**最適合：** 持續啟用、安全性至關重要的工作流程。

### 標準模式（節省約 30%）

靈感來自 [Caveman](https://github.com/JuliusBrussee/caveman)——移除贅詞與冗長措辭，同時保留原意：

- 移除贅詞（「please」、「I think」、「basically」、「actually」）
- 精簡冗長片語（「in order to」→「to」、「as a result of」→「because」）
- 移除禮貌性的委婉措辭（「Would you mind...」、「If you could possibly...」）
- 針對程式設計提示詞調校的 30 多條 regex 規則

**最適合：** 日常程式設計工作流程、注重成本的團隊。

### 積極模式（節省約 50%）

針對長時間工作階段的智慧型歷史記錄管理：

- **訊息老化**——較舊的訊息會逐步提高壓縮程度
- **工具結果壓縮**——截斷或省略冗長的工具輸出（保留開頭／結尾行、
  篩選相符行、壓縮 JSON 鍵）
- **結構完整性防護**——確保 `tool_use` + `tool_result` 配對維持一致
- **上下文視窗感知**——遵循各模型的權杖限制

**最適合：** 長時間的偵錯工作階段、大型程式碼庫。

### 超高模式（節省約 75%）

針對權杖極為受限情境的最大程度壓縮：

- **啟發式修剪**——依評分修剪散文中的權杖
- **結構保留**——以圍欄標記的程式碼區塊、行內程式碼、URL 與識別碼會先以
  墓碑標記取代，再逐字重新拼接，絕不修剪
- **選用的 SLM 層級**——設定後，可由小型本機模型進一步細化修剪結果
- 獨立於積極模式：不會執行訊息老化、工具結果壓縮或備援摘要器
  （只有 SLM 層級失敗時，才可能透過積極模式執行備援處理）

**最適合：** 當您反覆達到上下文限制時。

### RTK 模式（上游範圍 60-90%）

RTK 模式針對程式設計代理工作階段中出現的冗長工具輸出進行最佳化：

- 偵測 `git status`、`git diff`、`git log`、測試執行器、
  TypeScript/Vite/Webpack 建置、ESLint/Biome/Prettier、npm 稽核／安裝、Docker 記錄、基礎設施
  輸出及一般 shell 輸出等命令／輸出類別
- 套用來自 `open-sse/services/compression/engines/rtk/filters/` 的 JSON 篩選套件
- 從專案或全域 `filters.toml` 檔案匯入 RTK TOML schema v1 篩選器，並進行行內測試
  驗證及專案檔案的信任閘控
- 內建 55 個附有行內驗證範例的篩選器
- 移除 ANSI 控制序列、進度列、重複行及無法採取行動的雜訊
- 保留失敗、錯誤、警告、已變更檔案、摘要及冗長輸出的尾端
- 支援採用信任閘控的專案篩選器、全域篩選器，以及選用的已遮蔽原始輸出復原

**最適合：** 包含 shell、建置、測試、git、grep 及檔案輸出記錄的代理工作階段。

### 堆疊模式（符合條件的範圍為 78-95%）

堆疊模式會以確定性的順序執行多個壓縮引擎。預設管線為：

```txt
RTK -> Caveman
```

此順序會先精簡終端機／工具輸出，再對剩餘的自然語言提示詞套用 Caveman 語意精簡。
堆疊管線可進行全域設定，也可透過指派給路由組合的壓縮組合進行設定。

**最適合：** 同時包含大量工具記錄以及人工指示或助理摘要的混合上下文。

---

## 上游節省量計算

OmniRoute 記錄了來自兩個來源的壓縮節省量：上游專案的基準測試，以及
OmniRoute 自身的引擎組合。

| 來源    | 此處使用的上游 README 數據                                                                         |
| ------- | -------------------------------------------------------------------------------------------------- |
| Caveman | 輸出 token 減少 `~75%`、基準測試平均輸出節省 `65%`、範圍為 `22-87%`，以及輸入壓縮工具可節省 `~46%` |
| RTK     | 命令輸出節省 `60-90%`；範例工作階段從 `~118,000 -> ~23,900` 個 token，亦即節省 `79.7%`（`~80%`）   |

對於重疊的工具／上下文承載資料，預設的 OmniRoute 組合會依序串接引擎：

```txt
RTK -> Caveman
```

組合節省量採乘法計算，而非加法：

```txt
combined = 1 - (1 - RTK savings) * (1 - Caveman input savings)
average  = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
range    = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

當 RTK 與 Caveman 都能縮減相同的輸入／上下文承載資料時，才適用 `78-95%` 這個數字。
Caveman 回應輸出模式是獨立的：啟用後，請使用 Caveman 自身的輸出節省量（平均 `65%`、
主打數字 `~75%`、範圍 `22-87%`）。總計費節省量取決於提示詞與輸出的比例。

### 「符合條件」的實際含義

15-95% 這個主打範圍確實存在，但它僅適用於**重複或冗長**的內容——例如重複的
錯誤行、不斷刷出相同警告的建置日誌，或過大的 `grep`／檔案讀取輸出。這
**不**代表每個請求都能節省這麼多。

實證驗證（`tests/unit/compression/stacked-compression-tool-result-savings.test.ts`）：對包含 300 行相同
錯誤訊息的 Anthropic 格式 `tool_result` 區塊執行 `stacked`（RTK + Caveman）流程後，達到
**95.93% token 節省量／96.26% 字元節省量**——完全落在宣傳的範圍內。
但當相同流程處理一般、非重複的工具輸出（乾淨的 `grep` 相符項目清單、
簡短的檔案讀取內容、一般對話文字）時，則會正確地產生**接近零的節省量**，因為
其中沒有可移除的重複內容，而且 `validateCompression()`（`validation.ts`）會拒絕送出
任何會遺失或改動程式碼區塊、URL、標題、版本或全大寫常數識別碼的改寫。

這是符合預期且安全的行為，並非錯誤：即使已完全啟用壓縮，主要讀取／搜尋乾淨檔案的
程式設計工作階段，其總節省量仍會較為有限；而遇到失敗迴圈或輸出冗長之 linter 的
工作階段，則會在該類流量上達到完整的 78-95% 範圍。不要將單一工作階段偏低的
整體節省百分比視為壓縮設定錯誤的證據——請先確認底層工具輸出實際上是否具有重複內容。

---

## Token 節省量視覺化

```
不使用壓縮：       傳送 47K 個 token 至 LLM
使用 Lite：        傳送 40K 個 token        （節省 15%——安全且永遠啟用）
使用 Standard：    傳送 33K 個 token        （節省 30%——caveman-speak 規則）
使用 Aggressive：  傳送 24K 個 token        （節省 50%——老化處理 + 摘要）
使用 Ultra：       傳送 12K 個 token        （節省 75%——啟發式剪枝）
使用 RTK：         傳送 19K-5K 個 token     （命令／工具輸出節省 60-90%）
使用 Stacked：     傳送 10K-2.5K 個 token   （符合條件的 RTK+Caveman 範圍為 78-95%）
```

---

## 設定

### 儀表板

前往 `Dashboard → Context & Cache`：

- **Caveman** — 模式選擇、語言套件、預覽及全域預設值
- **RTK** — 命令篩選器預覽、RTK 安全設定及篩選器目錄
- **Compression Combos** — 指派給路由組合的具名引擎管線
- **Auto-Trigger Threshold** — 當 token 數量超過閾值時自動啟用壓縮

### 各組合覆寫

在 `Dashboard → Context & Cache → Compression Combos` 中，將壓縮組合指派給路由組合：

```txt
組合：「free-tier-fallback」
  壓縮組合：「coding-agent-stack」
  管線：RTK -> Caveman
  目標：
    1. if/kimi-k2.7-code
    2. if/qwen3.8-max-preview
```

這可讓你在免費／程式設計提供者上使用堆疊式壓縮，同時在付費訂閱中維持精簡模式。

此「各組合覆寫」指派與**路由組合壓縮模式**覆寫（Default/Off/Lite/Standard/Aggressive/Ultra/Codex Responses——該欄位的結構描述也接受 `rtk`、`stacked` 和 `omniglyph`）是不同的控制項——該覆寫不會選取具名的壓縮組合管線；它只會設定 `resolveCompressionPlan` 所查閱的 `compressionMode` 欄位。你可以在組合卡片（`Dashboard → Combos`）上進行設定，或從 #6760 起，在 `Dashboard → Context & Cache → Compression Combos` 的「Assign to routing」清單中，針對各個路由組合進行設定；該設定就位於上述管線指派核取方塊旁。兩個介面都會透過相同的 `PUT /api/combos/{id}` 端點保存設定。

### 各請求覆寫

傳送 `x-omniroute-compression` 請求標頭，以覆寫單一請求的壓縮計畫。它具有最高優先順序——優先於路由組合覆寫、使用中的設定檔、自動觸發及面板的 Default。未知值會被忽略（請求絕不會因此遭到拒絕），且全域總開關仍會控制一切：全域關閉壓縮時，標頭無法將其開啟。值如下：

| 值            | 效果                                                                        |
| ------------- | --------------------------------------------------------------------------- |
| `off`         | 不壓縮此請求。                                                              |
| `default`     | 面板衍生的 Default 設定檔（忽略使用中的設定檔）。有損引擎會維持關閉。       |
| `safe`        | 與省略標頭相同：僅執行去重和空白摺疊。                                      |
| `allow-lossy` | 保留此請求的操作員計畫，包括摘要、相關性篩選器及樣式改寫。                  |
| `engine:<id>` | 啟用時使用單一引擎，例如 `engine:rtk`。這是該引擎針對各請求的選擇加入機制。 |
| `<combo>`     | 具名組合；先以名稱比對（不區分大小寫），再以 id 比對。                      |

若未使用 `allow-lossy`、`engine:<id>` 或具名組合，則不會套用有損引擎。壓縮開啟時，請求仍會進行工作階段去重和空白摺疊。

套用的計畫會透過 `X-OmniRoute-Compression: <mode>; source=<source>` 回應標頭傳回，其中 `<source>` 為 `request-header`、`routing-override`、`active-profile`、`auto-trigger`、`default` 或 `off` 之一。

### API

```bash
# 取得壓縮設定
curl http://localhost:20128/api/settings/compression

# 更新壓縮設定
curl -X PUT http://localhost:20128/api/settings/compression \
  -H "Content-Type: application/json" \
  -d '{"defaultMode":"stacked","autoTriggerMode":"stacked","autoTriggerTokens":32000}'

# 預覽特定的 RTK/stacked 承載內容
curl -X POST http://localhost:20128/api/compression/preview \
  -H "Content-Type: application/json" \
  -d '{"mode":"rtk","messages":[{"role":"tool","content":"npm test output here"}]}'

# 列出 RTK 篩選器套件
curl http://localhost:20128/api/context/rtk/filters

# 使用選用的命令中繼資料直接測試 RTK
curl -X POST http://localhost:20128/api/context/rtk/test \
  -H "Content-Type: application/json" \
  -d '{"command":"npm test","text":"FAIL tests/example.test.ts\nError: boom"}'
```

---

## 受保護的內容

壓縮引擎**一律保留：**

- ✅ 程式碼區塊（圍欄式與行內）
- ✅ URL 與檔案路徑
- ✅ JSON 結構與結構化資料
- ✅ 識別碼與受保護的技術權杖
- ✅ 數學運算式
- ✅ 工具／函式呼叫定義
- ✅ 系統提示（在 lite 模式下）

在持久化任何內容之前，RTK 原始輸出復原功能會遮蔽常見的 API 金鑰、bearer 權杖、Slack 權杖、AWS 存取金鑰、
密碼、權杖與密鑰。

---

## 壓縮統計資料

每個經過壓縮的請求都會在伺服器日誌中包含統計資料：

```json
{
  "originalTokens": 47200,
  "compressedTokens": 40120,
  "savingsPercent": 15.0,
  "techniquesUsed": ["collapseWhitespace", "dedupSystemPrompt"],
  "mode": "lite",
  "engine": "caveman",
  "compressionComboId": "coding-agent-stack",
  "durationMs": 0.8,
  "rtkRawOutputPointers": []
}
```

---

## 階段路線圖

| 階段     | 模式                                                                                                                         | 狀態      |
| -------- | ---------------------------------------------------------------------------------------------------------------------------- | --------- |
| Phase 1  | Off, Lite                                                                                                                    | ✅ 已發布 |
| Phase 2  | Standard, Aggressive, Ultra                                                                                                  | ✅ 已發布 |
| Phase 3  | RTK, Stacked, Compression Combos                                                                                             | ✅ 已發布 |
| Phase 4  | Output Styles, SLM-tier Ultra, 評估框架                                                                                      | ✅ 已發布 |
| Phase 4C | 自適應上下文預算（「旋鈕」）— 運算引擎 + API（`PUT /api/settings/compression` 上的 `contextBudget`）+ 儀表板模式／政策控制項 | ✅ 已發布 |

---

## 致謝

Standard 模式的壓縮規則靈感來自 **[JuliusBrussee](https://github.com/JuliusBrussee)** 所開發的 **[Caveman](https://github.com/JuliusBrussee/caveman)**（⭐ 51K+）——這個爆紅專案的理念是「能用較少權杖完成，為何要用很多權杖」。Caveman 報告指出，輸出權杖減少約 `~75%`、基準測試的平均輸出節省量為 `65%`、輸出節省範圍為 `22-87%`，而輸入壓縮工具則可節省約 `~46%`。

RTK 模式的靈感來自 **[RTK AI](https://github.com/rtk-ai)** 所開發的 **[RTK - Rust Token Killer](https://github.com/rtk-ai/rtk)**——這是一個高效能的命令輸出壓縮專案，用於終端機、建置、測試、git 與工具輸出篩選。RTK 報告指出可節省 `60-90%`，其 README 範例工作階段顯示節省了約 `~80%`。

---

## 進階壓縮系統

除了上述 7 種模式之外（原始碼也接受 `codex-responses` 與
`omniglyph` 模式，但本指南不予涵蓋），以下各節將介紹在這些模式內部或與其搭配運作的功能：Tool Result Compression 與 Progressive Aging
是 aggressive 引擎的第 1 與第 2 個步驟（Aggressive 模式，以及
stacked 管線中的 `aggressive` 步驟）；Stacked Pipeline 是 Stacked 模式的執行方式；啟用壓縮時，Cache-Aware Compression
會針對快取提供者將 `aggressive` 與 `ultra` 降級為 `standard`；而 Caveman Output Mode 與 Output Styles 則是選擇性啟用的系統提示指令，
預設為關閉，用於塑造模型輸出，而不是壓縮請求。

### 快取感知壓縮

部分提供者（例如提供提示快取的 Anthropic）支援**提示快取**，
可讓其快取提示的部分內容，以降低成本與延遲。啟用
快取後，aggressive 壓縮實際上可能會**損害**效能，
因為它會變更已快取的權杖，導致快取失效。

`cachingAware.ts` 模組透過**偵測快取上下文**並
據此**調整壓縮策略**來解決此問題。

#### 運作方式

1. **偵測快取上下文** — 掃描請求主體中的 `cache_control` 標記
2. **識別快取提供者** — 檢查目標提供者是否支援快取
3. **調整策略** — 針對快取提供者，將 `aggressive`/`ultra` 降級為 `standard`
4. **略過系統提示** — 系統提示通常會被快取，因此不要壓縮它們

策略輔助函式也會傳回 `deterministicOnly` 旗標，但計畫建構器只會使用
該策略——目前沒有任何下游元件會讀取此旗標。

#### 程式碼範例

```ts
import {
  detectCachingContext,
  getCacheAwareStrategy,
} from "@omniroute/open-sse/services/compression/cachingAware";

const body = {
  model: "anthropic/claude-sonnet-4.5",
  messages: [{ role: "user", content: "Hello" }],
  cache_control: { type: "ephemeral" }, // ← 快取標記
};

const ctx = detectCachingContext(body, { provider: "anthropic" });
// → { hasCacheControl: true, provider: "anthropic", targetFormat: null, isCachingProvider: true }

const strategy = getCacheAwareStrategy("aggressive", ctx);
// → { strategy: "standard", skipSystemPrompt: true, deterministicOnly: true }
```

#### 使用時機

快取感知壓縮**一律開啟**——無需進行任何設定。只要
壓縮已開啟，且目標提供者支援提示快取（Anthropic、OpenAI
等），它就會生效；不需要明確的 `cache_control` 標記——僅快取提供者本身
就會觸發降級，而僅有標記絕不會觸發（標記偵測會提供快取
遙測資料，而非策略決策）。

### 漸進式老化

長時間對話會累積許多訊息輪次，但較早的輪次會變得較不
相關。`progressiveAging.ts` 模組會**依輪次距離降低訊息品質**
（距離從對話結尾開始計算）。使用已發布的預設值
（`verbatim: 2, light: 2, moderate: 3`）時：

- **最後 2 個對話輪次（距離 ≤ 2）**：逐字保留
- **距離 3**：穴居人壓縮（移除贅詞）
- **距離 4+**：摘要助理訊息；使用者訊息縮減為第一
  行，最多 120 個字元；其他角色保持不變。無論距離為何，系統提示、已老化的
  訊息與最新的使用者訊息一律逐字保留。
  不會直接捨棄任何內容，且在隨附的預設值下無法進入 `light`
  區段（`light` 等於 `verbatim`）。

#### 程式碼範例

```ts
import { applyAging } from "@omniroute/open-sse/services/compression/progressiveAging";

const messages = [
  { role: "system", content: "You are a helpful assistant" },
  { role: "user", content: "What is 2+2?" },
  { role: "assistant", content: "4" },
  // ... 再多 50 個對話輪次 ...
];

const { messages: aged, saved } = applyAging(messages, {
  verbatim: 3, // 最後 3 個對話輪次：逐字保留
  light: 8, // 距離 <= 8：輕度壓縮
  moderate: 20, // 距離 <= 20：穴居人壓縮
  fullSummary: 5, // 類型要求，但分級程式碼不會讀取
  // 距離 > 20：摘要（助理）／保留第一行（使用者）
});

// saved = 節省的 token 數量
```

#### 使用時機

漸進式老化在 `aggressive` 模式下**一律啟用**——它是
`compressAggressive()` 的第 2 個步驟。Ultra 模式不會執行它。它特別適用於：

- 長時間進行的程式設計工作階段
- 跨越多日的對話
- 包含大量工具呼叫的代理式工作流程

### 穴居人輸出模式

穴居人輸出模式會加入**系統提示指令**，要求模型本身提供
精簡輸出——`lite` 層級要求使用完整句子簡潔回答，`full`
要求它「像聰明的穴居人一樣簡短回應」，而 `ultra` 要求電報式輸出；
這些指令只能提出要求，無法保證結果。請求會透過
`applyOutputStyles()`（`open-sse/services/compression/outputStyles/apply.ts`）接收這些指令：
`open-sse/handlers/chatCore.ts` 會先使用向後相容轉接層
（`open-sse/services/compression/outputStyles/backCompat.ts` 中的
`resolveOutputStyleSelection()`）解析選擇；當 `outputStyles`
為空時，該轉接層會將已啟用的 `cavemanOutputMode` 對應至
`cavemanOutputMode.intensity` 強度的 `terse-prose` 輸出樣式（請參閱下方的「向後相容」）；
非空的 `outputStyles` 選擇會直接依原樣使用，此時 `cavemanOutputMode.enabled`
與 `intensity` 不再有任何作用，但其 `autoClarity` 開關仍會套用。`outputMode.ts`
包含指令文字（`CAVEMAN_INSTRUCTION_BY_LANGUAGE`）、內容略過邏輯，以及注入所使用的
放置輔助函式；其本身的 `applyCavemanOutputMode()` 注入器在正式環境中沒有呼叫端。

#### 運作方式

此模式不會壓縮輸入。它會將指令區塊加入系統提示
（請參閱下方的「注入方式」），而為請求選擇的任何輸入壓縮模式仍會在之後執行，
並作用於此時已包含該區塊的主體。在每個層級結尾共有的邊界條款之前，
英文 `full` 層級的內容如下：

> 「像聰明的穴居人一樣簡短回應。省略冠詞（a/an/the）、贅詞（just/really/basically/actually/simply）、客套語與模稜兩可的措辭。可使用片語。使用簡短的同義詞（用 big 而非 extensive，用 fix 而非 implement）。完整保留所有技術內容、程式碼、錯誤、URL 與識別碼。」

此模式特別適用於：

- 程式碼產生（輸出越精簡 = token 越少）
- 快速問答（不需要詳盡說明）
- 批次處理（最大化處理量）

#### 使用時機

穴居人輸出模式是**選用功能**。啟用壓縮時（`enabled: true`，即「壓縮設定」頁面上的總開關），
可透過 `cavemanOutputMode.enabled` 開啟；`intensity`
可選擇 `lite`、`full` 或 `ultra`：

```json
{
  "enabled": true,
  "cavemanOutputMode": {
    "enabled": true,
    "intensity": "full"
  }
}
```

壓縮組合的 **輸出模式**開關（`outputMode`，層級位於 `outputModeIntensity`）
會為該組合所套用的請求設定相同開關，而
`omniroute_set_compression_engine` MCP 工具會透過其布林值 `outputMode`
引數寫入此設定。非空的 `outputStyles` 選擇優先於此開關。在儀表板中，
啟用**精簡散文**輸出樣式會注入相同的區塊（請參閱下方的「輸出樣式」）。

### 輸出樣式（目錄）

上述穴居人輸出模式是**舊版單一樣式路徑**。第 4 階段將其泛化為
可組合輸出樣式的目錄：位於
`open-sse/services/compression/outputStyles/catalog.ts` 的
`OUTPUT_STYLE_CATALOG`。每個樣式都是一項系統提示指令，要求模型本身產生
成本更低的輸出；可以同時啟用多個樣式，並依目錄順序注入。

| 樣式                     | `id`          | 功能                                                                                                                                                                                  | 指令語言                                      |
| ------------------------ | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| 精簡文體                 | `terse-prose` | 移除贅詞／冠詞／保留性措辭；精確保留技術內容。文字與舊版 caveman 輸出模式相同（僅引用，不重複輸入）。                                                                                 | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| 減少程式碼               | `less-code`   | YAGNI 階梯：採用最小可行變更，不加入未要求的抽象層。                                                                                                                                  | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| 馬尾辮（慵懶資深開發者） | `ponytail`    | 「最好的程式碼，就是從未寫下的程式碼」：重用 > 重寫、根本原因 > 表面症狀、最短可行差異。                                                                                              | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| 我有 ADHD（行動優先）    | `i-have-adhd` | 行動優先（在說明文字之前提供命令／路徑／片段）、編號且有限的步驟、一個具體的下一步、不含前言／回顧／結語。改編自 [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd)（MIT）。 | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| 精簡 CJK（文言）         | `terse-cjk`   | `full`/`ultra` 以文言文回答；`lite` 僅要求簡短回答，不使用虛詞、客套語或修飾語。                                                                                                      | zh（受語系限制，見下文）                      |

每種樣式皆提供三種強度等級——`lite`、`full`、`ultra`——且每個等級皆以共用界限條款（`outputMode.ts` 中的 `SHARED_BOUNDARIES`）結尾，確保程式碼區塊、檔案路徑、命令、錯誤與 URL 保持原樣。`terse-prose` 與 `terse-cjk` 的等級文字也將識別碼加入該清單。

`terse-cjk` 在兩處受限於 `zh` 語系。只有當儀表板 UI 語言為中文（`zh-CN` 或 `zh-TW`）時，「壓縮設定」頁面才會列出該列，而 `applyOutputStyles()` 也只會在請求解析後的語言（見下方「語言選擇」）為 `zh` 時注入它。隱藏該列不會清除已儲存的 `terse-cjk` 選項：設定 API 接受任何樣式 id，而在頁面上儲存其他樣式時仍會保留它。請求處理時，`applyOutputStyles()` 的語言檢查是唯一的語系閘門。

#### 注入的運作方式

`applyOutputStyles()`（`open-sse/services/compression/outputStyles/apply.ts`）會根據目錄解析選取項目（未知 id 與語系不符的樣式會被捨棄，絕不視為錯誤；若選取項目解析後沒有任何樣式，則本文保持不變，並以 `no_styles` 略過），依目錄順序串接所選指令，附加**一次**界限條款（若選取 `less-code` 或 `ponytail`，還會加上安全條款 `SAFETY_BOUNDARIES` 或其翻譯），並以單一冪等性標記（`[OmniRoute Output Styles]`）作為區塊開頭，因此重複套用不會執行任何操作。若解析後的語言（見下方「語言選擇」）有翻譯，則會注入本地化指令，而非英文。

對於包含非空 `messages` 陣列的本文，冪等性檢查會先於內容略過機制執行：當頂層 `system` 欄位（字串或內容區塊陣列）或內容為字串的系統訊息中已存在 `[OmniRoute Output Styles]` 標記時，本文會保持不變並標記為 `already_applied`，且不會執行關鍵字檢查。否則，內容略過機制（`open-sse/services/compression/outputMode.ts` 中的 `shouldBypassCavemanOutputMode()`）會檢查最後三則訊息的文字，不論其角色為何；若文字符合安全性、不可逆操作或釐清相關關鍵字，或符合依順序出現的序列：`first`、`then`、`after that`、`before`、`rollback` 或 `backup`，且其後 240 個字元內出現 `delete`、`drop`、`migrate`、`deploy` 或 `release`，便會略過整個回合的樣式。當 **Auto-Clarity Bypass** 切換開關（`cavemanOutputMode.autoClarity`，預設為開啟）開啟時，會執行略過檢查；關閉該切換開關則會略過關鍵字檢查。

當略過機制允許該回合繼續處理時，`placeSystemInstruction()`（同一檔案）絕不建立新的 `messages[0]`，並會將區塊放入最先找到的下列位置：

1. 開頭且內容為字串的系統訊息：將區塊附加在其文字之後。
2. 頂層 `system` 欄位：若為字串，將區塊附加在文字之後；若為內容區塊陣列，則加入新的文字區塊。
3. 第一則位於後方且內容為字串的系統訊息：將區塊附加在其文字之後。
4. 以上皆無：將區塊放入新增於 `messages` 末尾的系統訊息中。

對於沒有 `messages` 陣列（或該陣列為空）的本文，不會執行內容略過機制，也不會查閱頂層 `system` 欄位。除非字串類型的 `instructions` 欄位已包含 `[OmniRoute Output Styles]` 標記，此時本文會保持不變並標記為 `already_applied`；否則，區塊會附加在該欄位文字之後。當本文沒有字串類型的 `instructions` 欄位，但帶有 `input`（字串或陣列）時，區塊會成為 `instructions`，取代該欄位原有的任何非字串值。若本文既沒有字串類型的 `instructions` 欄位，也沒有字串或陣列類型的 `input`，則本文會保持不變，並以 `no_messages` 略過。

#### 如何啟用

在儀表板的 **Compression Context → Compression Settings**
(`/dashboard/context/settings`) 中，Output styles 區段會為每種樣式顯示一列，並提供開啟／關閉
切換按鈕與層級選擇器。當壓縮功能本身開啟時（即頁面的
主切換設定 `enabled`），便會注入樣式。**Auto-Clarity Bypass** 切換按鈕位於 **Caveman**
頁面（`/dashboard/context/caveman`）的 **Output Mode** 卡片中。從程式角度來看，
壓縮設定會以下列格式保存選擇：

```json
{
  "outputStyles": [
    { "id": "i-have-adhd", "level": "full" },
    { "id": "less-code", "level": "lite" }
  ]
}
```

向後相容性：當 `outputStyles` 為空時，舊版 `cavemanOutputMode.enabled`
設定會對應至 `terse-prose`，並使用 `cavemanOutputMode.intensity` 的強度。接著，此區塊會以
`[OmniRoute Output Styles]` 標記開頭，而舊版 `applyCavemanOutputMode()`
注入器則會寫入 `[OmniRoute Caveman Output Mode]`。在標記下方，en、pt-BR、es、de、fr、it、ru、id 與 vi
中的文字皆與舊版注入內容相符；在 ja 與 zh 中，邊界子句之前會多一個
空格。`terse-prose` 已翻譯成 pt-BR、es、de、fr、it、ru、zh、ja、id 與 vi，因此當請求解析出的語言為 `hu` 時，
會取得英文文字，而舊版注入器使用的則是匈牙利文文字。

輸出樣式語言選擇（`outputStyles/apply.ts` 中的
`resolveOutputStyleLanguage()`）：當 `languageConfig.enabled` 開啟時，`autoDetect` 會從請求的
`messages` 陣列中取樣最新一則含有文字的使用者訊息（字串內容，或其內容部分的
`text`），並對其執行 Caveman 引擎的偵測器
（`detectCompressionLanguage()`）。若文字包含漢字但不含假名，偵測器會傳回 `zh`；
否則，它會傳回 `it`、`pt-BR`、`es`、`de`、`fr`、`ru`、`ja`、`hu` 與 `id`
之中提示符合數量最多的語言；若皆不符合，則傳回 `en`——
無法分類的文字會使用英文，絕不會使用 `defaultLanguage`，而且即使樣式附帶 `vi` 文字，
也永遠不會偵測到 `vi`。Responses API 主體會將其對話輪次保留在
`input` 中，而該欄位不會被取樣，因此會先使用 `defaultLanguage`，再回退至英文。當
`messages` 中沒有任何使用者訊息含有文字，或 `autoDetect` 關閉時，會先套用
`defaultLanguage`，再回退至英文。當 `languageConfig.enabled` 關閉時，語言為英文——除非有
壓縮組合套用至該請求（即指派給該請求路由組合的組合，或 chatCore 在內建堆疊式
管線中回退使用的預設壓縮組合）：套用組合會針對該請求開啟 `languageConfig.enabled`，並根據
該組合的語言套件設定 `defaultLanguage`（若已儲存的值屬於該組合的套件之一，則使用該值；
否則使用該組合的第一個套件，而其預設為 `en`），同時仍會套用已儲存的 `autoDetect`
設定（預設為開啟）。Caveman 輸入引擎會以不同方式選擇其規則套件語言——針對各個文字部分選擇，
而且在自動偵測關閉時，還會受 `enabledPacks` 限制。

樣式 × 語言矩陣由
`tests/unit/compression/output-styles-i18n-matrix.test.ts` 固定：目錄中的每個樣式都必須在測試的
`BASELINE_LANGUAGES` 中有一個項目；未受地區設定限制的樣式必須提供
pt-BR 翻譯（受地區設定限制的 `terse-cjk` 不受此規則約束），除非該樣式列於
`KNOWN_ENGLISH_ONLY` 中；此清單只能包含完全沒有翻譯的樣式——
列於其中但具有任何翻譯的樣式會導致測試失敗；若樣式遺失其 `BASELINE_LANGUAGES`
項目所列的任何語言，也會導致測試失敗。若要新增樣式，請參閱
[EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md#adding-an-output-style)。

### 工具結果壓縮

`open-sse/services/compression/toolResultCompressor.ts` 中的 `compressToolResult()`
會使用 **5 種策略**壓縮工具結果文字。它會依照以下順序嘗試，而第一個已啟用且檢查結果符合內容的策略
將決定結果：

1. **`fileContent`**：內容包含 3 行或更多行，其中至少有一行在忽略
   前置縮排後，以 `import `、`export `、`function `、`class `、
   `const `、`let `、`var ` 或 `return ` 開頭（關鍵字後加一個空格），或以 `if`、
   `for` 或 `while` 後接 `(` 或 ` (` 開頭；保留前 20 行與最後 5 行，並
   標示中間省略的部分。
2. **`grepSearch`**：內容至少包含一行格式為 `<path>:<digits>:` 的文字，
   且第一個冒號前的文字不含空白；僅保留這些行，最多 30 行，後面附上
   任何其他相符項目的數量與相符檔案清單；其他每一行都會被捨棄。只需一行
   這類文字即可觸發此策略，因此以時間戳記（例如 `12:30:45`）開頭的
   日誌行也會被計入。
3. **`shellOutput`**：若輸出包含 ANSI CSI 序列（`ESC[` 後接數字或
   分號，再接一個字母，如色彩代碼），或文字中任何位置有 `$` 後接空白，
   便會移除這些序列（其他逸出序列，例如 `ESC[?25l` 或 OSC 視窗標題序列，
   則會保留），並保留最後 50 行，同時合併連續重複的行。由於此檢查在
   `json` 與 `errorMessage` 之前執行，包含這類 `$` 的 JSON 或錯誤輸出
   在 `shellOutput` 啟用時永遠不會進入後續策略。
4. **`json`**：超過 2,000 個字元、在選擇性空白之後以 `{` 或 `[` 開頭，
   且可成功解析的 JSON 承載資料會被摘要：超過 7 個項目的陣列會保留前
   5 個與最後 2 個項目，以及項目總數；物件則保留前 20 個鍵，並將每個
   巢狀物件或陣列值替換為 `{…N keys}` 預留位置（若為陣列，N 為其長度），
   另以 `_remaining_<N>_keys` 標記計算前 20 個之後被捨棄的鍵數。純量值會
   完整複製，因此，若物件包含 20 個或更少的鍵且沒有巢狀值，就只會重新
   縮排——最小化的物件反而會增加字元數，因此維持不變。
5. **`errorMessage`**：若輸出在任何位置以任意字母大小寫包含 `error:`、
   `error `（該單字後接一個空格，例如 `no error found`）、`[error]`、
   `exception:`、`exception `、`[exception]` 或 `traceback`，便會保留第一行、
   接下來 10 行及最後 3 行，並以 `… [N frames elided] …` 標記取代其間的
   行。只有在第一行之後超過 13 行時才會顯示此標記，因此 14 行或更少的
   錯誤輸出不會被縮短（在 12 或 13 行時，最後 3 行會重複已保留的行）。

一旦某個策略相符，即使完全沒有節省，後續策略也不會再嘗試。當相符策略
未節省任何估算 token（長度 ÷ 4，無條件進位）時——例如 25 行或更少的類程式碼
檔案，或超過 2,000 個字元但只有 7 個或更少項目的 JSON 陣列——積極式引擎會
保留原始工具結果：兩個呼叫端（`compressAggressive()` 與
`compressAnthropicToolResultBlock()`）都會在 `saved` 為 0 或更低時保留原始內容，
而 `compressToolResult()` 本身仍會傳回該策略的輸出。工具結果步驟並非最終決定：
引擎的備援摘要器仍可縮短超過 8,192 個字元的 `tool` 或 `function` 訊息
（`maxTokensPerMessage` 為 2,048，再乘以 4）。

#### 使用時機

工具結果壓縮是積極式引擎的第 1 步（位於
`open-sse/services/compression/aggressive.ts` 的 `compressAggressive()`），因此
會在積極模式以及堆疊管線的 `aggressive` 步驟中執行。它會壓縮 OpenAI 格式的
`tool` 與 `function` 訊息，以及 Anthropic `tool_result` 區塊內的文字。每個策略
在 `aggressive.toolStrategies` 下都有自己的開關，預設全部啟用。在儀表板中，
啟用壓縮且預設模式為積極模式時，這些開關位於 Caveman 頁面的**進階**檢視中。

### 堆疊管線

堆疊模式會**依序執行多個引擎**——通常先執行 RTK
（工具輸出可節省 60-90%），再對剩餘文字執行 Caveman（輸入約節省
46%）。組合後可達到**符合條件內容節省 78-95% 的範圍**（請參閱上方的「上游節省計算」）：
`1 - (1 - 0.60..0.90) × (1 - 0.46)`，平均約為 89%。

#### 運作方式

```
輸入（1000 個 token）
  → RTK（可辨識命令的篩選器）→ 200 個 token
    → Caveman（移除填充內容）→ 108 個 token
  → 輸出（108 個 token，節省約 89%）
```

#### 使用時機

以下情況適合使用堆疊模式：

- 大量使用工具的工作流程（代理式程式設計、研究）
- 對成本敏感的批次處理
- 需要最大化 token 節省量時

堆疊管線可透過全域 `stackedPipeline` 壓縮設定進行設定，也可透過指派給路由
組合的具名壓縮組合進行設定（請參閱上方的「各組合覆寫」）——而不是透過自動組合的
`modePack`（該欄位只會重新調整自動組合模型選擇的權重，且 `stacked` 不是有效的套件名稱）。

---

## 壓縮組合覆寫

您可以針對**每個組合**覆寫全域壓縮模式，以針對不同使用情境微調行為：

```json
{
  "id": "coding-combo",
  "strategy": "priority",
  "config": {
    "weights": { "taskFit": 0.5 },
    "modePack": "quality-first"
  },
  "compressionOverride": "aggressive"
}
```

這適用於：

- **程式設計組合**：長時間工作階段使用 `aggressive` 模式
- **快速問答組合**：使用 `lite` 模式以快速回應
- **大量使用工具的組合**：使用 `stacked` 模式以最大化節省效果
- **正式環境組合**：對快取提供者停用覆寫——持續啟用的快取感知調整會自動將 `aggressive`/`ultra` 降級為 `standard`（沒有可選取的 `cache-aware` 模式）

---

## 另請參閱

- [環境設定](../reference/ENVIRONMENT.md) — 壓縮環境變數
- [架構指南](../architecture/ARCHITECTURE.md) — 壓縮管線內部機制
- [使用者指南](../guides/USER_GUIDE.md) — 開始使用壓縮
- [RTK 壓縮](./RTK_COMPRESSION.md) — RTK 篩選器、信任模型、驗證閘門、原始輸出復原
- [壓縮引擎](./COMPRESSION_ENGINES.md) — Caveman、RTK、stacked、API、MCP、儀表板
- [壓縮規則格式](./COMPRESSION_RULES_FORMAT.md) — JSON 規則套件格式
- [壓縮語言套件](./COMPRESSION_LANGUAGE_PACKS.md) — 特定語言的 Caveman 規則
