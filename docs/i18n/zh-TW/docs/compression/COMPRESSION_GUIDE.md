# 🗜️ Prompt Compression Guide — OmniRoute (中文 (繁體))

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_GUIDE.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_GUIDE.md)

---

> 自動節省符合條件之上下文的 15-95%。如需快速概覽，請參閱 [README 壓縮章節](../README.md#%EF%B8%8F-prompt-compression--save-15-95-eligible-tokens-automatically)。

## 概覽

OmniRoute 實作了一套模組化的提示詞壓縮管線，會在請求送達上游提供者之前**主動**執行。這表示系統會以透明方式為你節省權杖，無需變更現有工作流程。

```
用戶端請求
  → 壓縮策略選擇器
    → 有組合覆寫設定？→ 使用組合設定
    → 達到自動觸發閾值？→ 使用自動模式
    → 有預設模式？→ 使用全域設定
    → 關閉？→ 略過壓縮
  → 選定的壓縮模式
    → 關閉：不壓縮
    → 輕量：安全地清理空白與格式（約 15%）
    → 標準：移除穴居人式贅詞（約 30%）
    → 積極：歷史訊息老化與摘要（約 50%）
    → 極致：啟發式修剪與程式碼區塊精簡（約 75%）
    → RTK：能辨識命令的終端機／工具輸出篩選（上游節省範圍 60-90%）
    → 堆疊：依序執行多個引擎的管線，通常先執行 RTK，再執行 Caveman（符合條件內容的節省範圍為 78-95%）
  → 壓縮後的請求 → 提供者
```

---

## 壓縮模式

### 關閉

不套用任何壓縮。所有訊息皆保持原樣傳遞。

### 輕量模式（節省約 15%，延遲 <1ms）

最安全的模式——不會改變任何語意，只會清理格式：

| 技術                     | 說明                         |
| ------------------------ | ---------------------------- |
| `collapseWhitespace`     | 合併連續空白行並移除行尾空格 |
| `dedupSystemPrompt`      | 移除重複的系統訊息           |
| `compressToolResults`    | 壓縮冗長的工具／函式輸出     |
| `removeRedundantContent` | 移除重複的指示               |
| `replaceImageUrls`       | 縮短 base64 圖片資料 URI     |

**最適合：** 常駐使用、安全性至關重要的工作流程。

### 標準模式（節省約 30%）

靈感來自 [Caveman](https://github.com/JuliusBrussee/caveman)——移除贅詞與冗長措辭，同時保留原意：

- 移除贅詞（「please」、「I think」、「basically」、「actually」）
- 精簡冗長片語（「in order to」→「to」、「as a result of」→「because」）
- 移除禮貌性的委婉措辭（「Would you mind...」、「If you could possibly...」）
- 針對程式設計提示詞調校的 30 多條規則運算式規則

**最適合：** 日常程式設計工作流程、注重成本的團隊。

### 積極模式（節省約 50%）

適用於長時間工作階段的智慧歷史訊息管理：

- **訊息老化**——逐步提高較舊訊息的壓縮程度
- **工具結果摘要**——以摘要取代冗長的工具輸出
- **結構完整性防護**——確保 `tool_use` + `tool_result` 配對保持一致
- **上下文視窗感知**——遵守各模型的權杖限制

**最適合：** 長時間的除錯工作階段、大型程式碼庫。

### 極致模式（節省約 75%）

針對權杖極度受限情境的最大化壓縮：

- **啟發式修剪**——移除低於相關性閾值的訊息
- **程式碼區塊精簡**——壓縮重複的程式碼範例
- **二分搜尋截斷**——找出上下文視窗的最佳截斷點
- 包含積極模式的所有功能

**最適合：** 反覆觸及上下文限制時。

### RTK 模式（上游節省範圍 60-90%）

RTK 模式針對程式設計代理工作階段中出現的冗長工具輸出進行了最佳化：

- 偵測命令／輸出類別，例如 `git status`、`git diff`、`git log`、測試執行器、
  TypeScript/Vite/Webpack 建置、ESLint/Biome/Prettier、npm 稽核／安裝、Docker 日誌、基礎架構
  輸出及一般 shell 輸出
- 套用來自 `open-sse/services/compression/engines/rtk/filters/` 的 JSON 篩選器套件
- 從專案或全域 `filters.toml` 檔案匯入 RTK TOML schema v1 篩選器，並進行內嵌測試
  驗證及專案檔案的信任閘控
- 內建 49 個篩選器，並附有內嵌驗證範例
- 移除 ANSI 控制序列、進度列、重複行及無法採取行動的雜訊
- 保留失敗、錯誤、警告、已變更檔案、摘要及長篇輸出的尾端
- 支援受信任閘控的專案篩選器、全域篩選器，以及可選用的已遮蔽原始輸出復原功能

**最適合：** 包含 shell、建置、測試、git、grep 及檔案輸出記錄的代理工作階段。

### 堆疊模式（符合條件內容的節省範圍為 78-95%）

堆疊模式會以確定性的順序執行多個壓縮引擎。預設管線為：

```txt
RTK -> Caveman
```

此順序會先精簡終端機／工具輸出，再對
其餘自然語言提示詞套用 Caveman 語意精簡。堆疊管線可進行全域設定，或透過
指派給路由組合的壓縮組合進行設定。

**最適合：** 同時包含大量工具日誌與人類指示或助理摘要的混合上下文。

---

## 上游節省量計算

OmniRoute 記錄了兩種來源的壓縮節省量：上游專案的基準測試，以及
OmniRoute 自身的引擎組合。

| 來源    | 此處使用的上游 README 數據                                                                           |
| ------- | ---------------------------------------------------------------------------------------------------- |
| Caveman | 輸出 token 減少 `~75%`、基準測試平均節省 `65%` 的輸出、範圍為 `22-87%`，以及可壓縮 `~46%` 輸入的工具 |
| RTK     | 命令輸出節省 `60-90%`；範例工作階段從 `~118,000 -> ~23,900` 個 token，即節省 `79.7%`（`~80%`）       |

對於重疊的工具／上下文承載內容，OmniRoute 的預設組合會依序堆疊引擎：

```txt
RTK -> Caveman
```

合併後的節省量採乘法計算，而非加法：

```txt
combined = 1 - (1 - RTK 節省量) * (1 - Caveman 輸入節省量)
average  = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
range    = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

當 RTK 與 Caveman 都能縮減相同的輸入／上下文承載內容時，該 `78-95%` 數值才適用。
Caveman 的回應輸出模式是獨立的：啟用後，請採用 Caveman 自身的輸出節省量（平均 `65%`、
標示值 `~75%`、範圍 `22-87%`）。總帳單節省量取決於提示詞與輸出的比例。

### 「符合條件」實際上代表什麼

15-95% 的標示範圍確實有效，但僅適用於**重複或冗長**的內容——例如重複的
錯誤行、不斷輸出相同警告的建置日誌，或過大的 `grep`／檔案讀取傾印。這
**不**表示每個請求都能節省這麼多。

實證驗證（`tests/unit/compression/stacked-compression-tool-result-savings.test.ts`）：對包含 300 行相同
錯誤訊息的 Anthropic 格式 `tool_result` 區塊執行 `stacked`（RTK + Caveman）後，達到
**95.93% 的 token 節省量／96.26% 的字元節省量**——完全落在宣稱的範圍內。
但若對一般、無重複的工具輸出（乾淨的 `grep` 相符項目清單、
簡短的檔案讀取結果、一般對話文字）執行相同管線，則會正確地產生**接近零的節省量**，因為
沒有任何可移除的重複內容，而且 `validateCompression()`（`validation.ts`）會拒絕傳送任何會
刪除或更改程式碼區塊、URL、標題、版本號或全大寫常數識別碼的
改寫內容。

這是符合預期且安全的行為，而非錯誤：即使已完整啟用壓縮，主要用於讀取／grep 乾淨檔案的
程式設計工作階段，其總節省量仍會較為有限；而遇到失敗迴圈或輸出繁多的
linter 時，則會在這類流量上達到完整的 78-95% 範圍。不要將單一工作階段
較低的整體節省百分比視為壓縮設定錯誤的證據——請先檢查
底層工具輸出是否確實存在重複內容。

---

## Token 節省量視覺化

```
不使用壓縮：       傳送 47K 個 token 至 LLM
使用 Lite：        傳送 40K 個 token        （節省 15%——安全、永遠啟用）
使用 Standard：    傳送 33K 個 token        （節省 30%——caveman-speak 規則）
使用 Aggressive：  傳送 24K 個 token        （節省 50%——老化 + 摘要）
使用 Ultra：       傳送 12K 個 token        （節省 75%——啟發式剪枝）
使用 RTK：         傳送 19K-5K 個 token     （命令／工具輸出節省 60-90%）
使用 Stacked：     傳送 10K-2.5K 個 token   （符合條件的 RTK+Caveman 範圍為 78-95%）
```

---

## 設定

### 儀表板

前往 `Dashboard → Context & Cache`：

- **Caveman** — 模式選擇、語言套件、預覽和全域預設值
- **RTK** — 指令篩選器預覽、RTK 安全性設定和篩選器目錄
- **Compression Combos** — 指派給路由組合的具名引擎管線
- **Auto-Trigger Threshold** — 當權杖數量超過閾值時，自動啟用壓縮

### 個別組合覆寫

在 `Dashboard → Context & Cache → Compression Combos` 中，將壓縮組合指派給路由
組合：

```txt
Combo: "free-tier-fallback"
  Compression Combo: "coding-agent-stack"
  Pipeline: RTK -> Caveman
  Targets:
    1. if/kimi-k2.7-code
    2. if/qwen3.8-max-preview
```

這可讓您在免費／程式開發提供者上使用堆疊式壓縮，同時在付費
訂閱中維持精簡模式。

此「個別組合覆寫」指派與**路由組合壓縮
模式**覆寫（Default/Off/Lite/Standard/Aggressive/Ultra）是不同的控制項——該覆寫不會選取具名的
壓縮組合管線；它只會設定 `resolveCompressionPlan` 所參照的 `compressionMode`
欄位。您可以在組合卡片（`Dashboard → Combos`）上設定，或自
#6760 起，在 `Dashboard → Context & Cache → Compression Combos` 的「Assign to routing」清單中，針對各個路由組合進行設定；該選項就位於
上述管線指派核取方塊旁。兩個介面都會透過相同的 `PUT /api/combos/{id}` 端點儲存設定。

### 個別請求覆寫

傳送 `x-omniroute-compression` 請求標頭，即可針對單一
請求覆寫壓縮計畫。它具有最高優先順序——優先於路由組合覆寫、作用中的設定檔、
自動觸發和面板的 Default。未知值會被忽略（絕不會拒絕該請求），而且
全域主開關仍會控制所有功能：當全域壓縮關閉時，無法透過該標頭
開啟壓縮。可用值：

| 值            | 效果                                                   |
| ------------- | ------------------------------------------------------ |
| `off`         | 不壓縮此請求。                                         |
| `default`     | 由面板決定的 Default 設定檔（忽略作用中的設定檔）。    |
| `engine:<id>` | 啟用時使用單一引擎，例如 `engine:rtk`。                |
| `<combo>`     | 具名組合，先依名稱比對（不區分大小寫），再依 id 比對。 |

套用的計畫會透過 `X-OmniRoute-Compression: <mode>; source=<source>` 回應
標頭傳回，其中 `<source>` 是 `request-header`、`routing-override`、`active-profile`、
`auto-trigger`、`default` 或 `off` 其中之一。

### API

```bash
# 取得壓縮設定
curl http://localhost:20128/api/settings/compression

# 更新壓縮設定
curl -X PUT http://localhost:20128/api/settings/compression \
  -H "Content-Type: application/json" \
  -d '{"defaultMode":"stacked","autoTriggerMode":"stacked","autoTriggerTokens":32000}'

# 預覽特定的 RTK／堆疊式承載資料
curl -X POST http://localhost:20128/api/compression/preview \
  -H "Content-Type: application/json" \
  -d '{"mode":"rtk","messages":[{"role":"tool","content":"npm test output here"}]}'

# 列出 RTK 篩選器套件
curl http://localhost:20128/api/context/rtk/filters

# 使用選用的指令中繼資料直接測試 RTK
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
- ✅ 系統提示詞（在精簡模式中）

在持久化任何內容之前，RTK 原始輸出復原功能會遮蔽常見的 API 金鑰、Bearer 權杖、Slack 權杖、AWS 存取金鑰、
密碼、權杖與機密資訊。

---

## 壓縮統計資料

每個壓縮後的請求都會在伺服器日誌中包含統計資料：

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

| 階段       | 模式                                                                                                                         | 狀態      |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------- | --------- |
| 第 1 階段  | 關閉、精簡                                                                                                                   | ✅ 已發布 |
| 第 2 階段  | 標準、積極、極致                                                                                                             | ✅ 已發布 |
| 第 3 階段  | RTK、堆疊、壓縮組合                                                                                                          | ✅ 已發布 |
| 第 4 階段  | 輸出樣式、SLM 層級極致模式、評估框架                                                                                         | ✅ 已發布 |
| 第 4C 階段 | 自適應上下文預算（「旋鈕」）— 運算引擎 + API（`PUT /api/settings/compression` 上的 `contextBudget`）+ 儀表板模式／原則控制項 | ✅ 已發布 |

---

## 致謝

標準模式的壓縮規則靈感來自 **[JuliusBrussee](https://github.com/JuliusBrussee)** 所開發的 **[Caveman](https://github.com/JuliusBrussee/caveman)**（⭐ 51K+）——這個爆紅專案主張「能用少量權杖完成的事，何必使用大量權杖」。Caveman 報告指出，其輸出權杖減少約 `~75%`、基準測試的平均輸出節省率為 `65%`、輸出節省範圍為 `22-87%`，並提供一項輸入壓縮率約為 `~46%` 的工具。

RTK 模式的靈感來自 **[RTK AI](https://github.com/rtk-ai)** 所開發的 **[RTK - Rust Token Killer](https://github.com/rtk-ai/rtk)**——這是一個高效能的命令輸出壓縮專案，適用於終端機、建置、測試、git 與工具輸出篩選。RTK 報告其節省率為 `60-90%`，README 中的範例工作階段顯示節省了約 `~80%`。

---

## 進階壓縮系統

除了 7 種標準模式之外，OmniRoute 還包含數個進階壓縮
系統，可根據上下文自動運作。

### 快取感知壓縮

某些提供者（例如具有提示詞快取功能的 Anthropic）支援**提示詞快取**，
讓其能夠快取提示詞的部分內容，以降低成本與延遲。啟用
快取後，積極壓縮實際上可能會**損害**效能，
因為它會變更已快取的權杖，導致快取失效。

`cachingAware.ts` 模組會透過**偵測快取上下文**並
據此**調整壓縮策略**來解決此問題。

#### 運作方式

1. **偵測快取上下文** — 掃描請求本文中的 `cache_control` 標記
2. **識別支援快取的提供者** — 檢查目標提供者是否支援快取
3. **調整策略** — 對支援快取的提供者，將 `aggressive`／`ultra` 降級為 `standard`
4. **略過系統提示詞** — 系統提示詞通常已被快取，因此不壓縮它們
5. **使用確定性轉換** — 僅使用能產生一致輸出的轉換

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
// → { hasCacheControl: true, provider: "anthropic", isCachingProvider: true }

const strategy = getCacheAwareStrategy("aggressive", ctx);
// → { strategy: "standard", skipSystemPrompt: true, deterministicOnly: true }
```

#### 使用時機

快取感知壓縮**一律啟用**，無需進行任何設定。它只會在
下列情況下生效：

- 請求包含 `cache_control` 標記
- 目標提供者支援提示詞快取（Anthropic、OpenAI 等）

### 漸進式老化

長對話會累積許多訊息輪次，但較舊的輪次會逐漸降低
相關性。`progressiveAging.ts` 模組會**依輪次距離降低訊息細節**：

- **近期輪次（0-3）**：逐字保留（完整細節）
- **中期輪次（4-8）**：精簡壓縮（清理空白與格式）
- **舊輪次（9+）**：Caveman 壓縮（移除贅詞、摘要）
- **非常舊的輪次（20+）**：大幅摘要或捨棄

#### 程式碼範例

```ts
import { applyAging } from "@omniroute/open-sse/services/compression/progressiveAging";

const messages = [
  { role: "system", content: "You are a helpful assistant" },
  { role: "user", content: "What is 2+2?" },
  { role: "assistant", content: "4" },
  // ... 另外 50 個輪次 ...
];

const { messages: aged, saved } = applyAging(messages, {
  verbatim: 3, // 前 3 個輪次：逐字保留
  light: 8, // 第 4-8 個輪次：精簡壓縮
  moderate: 20, // 第 9-20 個輪次：Caveman 壓縮
  // 第 21 個輪次以後：大幅摘要
});

// saved = 節省的權杖數量
```

#### 使用時機

漸進式老化在 `aggressive` 與 `ultra` 模式中**永遠啟用**。它特別適用於：

- 長時間進行的程式設計工作階段
- 持續多日的對話
- 包含大量工具呼叫的代理式工作流程

### 穴居人輸出模式

`outputMode.ts` 模組會注入**系統提示詞指令**，讓模型本身產生經過壓縮、簡短扼要的輸出（「穴居人」風格）。

#### 運作方式

此模式不會壓縮輸入，而是加入如下的系統提示詞：

> 「使用最少的文字回答。省略客套話。使用短句。」

這特別適用於：

- 程式碼產生（輸出越精簡 = token 越少）
- 快速問答（無須詳盡解釋）
- 批次處理（最大化輸送量）

#### 使用時機

穴居人輸出模式是**選擇性啟用**的——請透過組合設定來啟用：

```json
{
  "strategy": "auto",
  "config": {
    "auto": {
      "outputMode": "caveman"
    }
  }
}
```

### 輸出樣式（目錄）

上述穴居人輸出模式是**舊版單一樣式路徑**。第 4 階段將其泛化為可組合的輸出樣式目錄：位於 `open-sse/services/compression/outputStyles/catalog.ts` 的 `OUTPUT_STYLE_CATALOG`。每種樣式都是一項系統提示詞指令，讓模型本身產生成本更低的輸出；可同時啟用多種樣式，並依目錄順序注入。

| 樣式                       | `id`          | 功能                                                                                                                                                                                                  | 指令語言                                             |
| -------------------------- | ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| 精簡散文                   | `terse-prose` | 移除贅詞、冠詞與保留語氣；精確保留技術實質。文字與舊版穴居人輸出模式相同（引用而非重新輸入）。                                                                                                        | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi        |
| 更少程式碼                 | `less-code`   | YAGNI 階梯：採用最小且可運作的變更，不加入未要求的抽象層。                                                                                                                                            | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi        |
| 馬尾辮（懶惰的資深開發者） | `ponytail`    | 「最好的程式碼，就是從未寫下的程式碼」：重用優於重寫，根本原因優於表面症狀，採用最短且可運作的差異。                                                                                                  | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi        |
| 我有 ADHD（行動優先）      | `i-have-adhd` | 行動優先（先提供命令／路徑／程式碼片段，再提供說明）、有明確範圍的編號步驟、僅提供一個具體的下一步，不要前言／回顧／結語。改編自 [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd)（MIT）。 | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi        |
| 精簡 CJK（文言）           | `terse-cjk`   | 極度精簡的文言文風格。                                                                                                                                                                                | zh（受地區設定限制：僅在解析出的語言為 `zh` 時提供） |

每種樣式皆提供三種強度等級——`lite`、`full`、`ultra`——而且每個等級的結尾都包含共用的界限條款，確保程式碼區塊、檔案路徑、命令、錯誤字串、URL 與識別碼維持原樣。

#### 注入方式

`applyOutputStyles()`（`open-sse/services/compression/outputStyles/apply.ts`）會根據目錄解析選取項目（未知的 id 與地區設定不符的樣式會被捨棄，絕不會引發錯誤）、依目錄順序串接所選指令、僅附加共用界限條款**一次**，並在單一等冪標記（`[OmniRoute Output Styles]`）之後，將結果前置於系統提示詞中——重複套用不會執行任何操作。當偵測到的請求語言有對應翻譯時，會注入本地化指令，而非英文指令。

#### 啟用方式

在儀表板中：**Context → Settings → Compression**——每種樣式各有一列，包含開／關切換按鈕與等級選擇器。以程式方式設定時，壓縮設定會將選取項目保存為：

```json
{
  "outputStyles": [
    { "id": "i-have-adhd", "level": "full" },
    { "id": "less-code", "level": "lite" }
  ]
}
```

向後相容性：舊版 `outputMode: "caveman"` 組合設定仍然有效，並會對應至 `terse-prose`；在每種舊版語言中，其內容與舊有注入內容逐位元組完全相同。

語言選擇：啟用 `languageConfig.enabled` 後，`autoDetect` 會選取最新使用者訊息的語言（使用與輸入引擎相同的偵測器）；關閉 `autoDetect` 則會固定使用 `defaultLanguage`。停用時則使用英文。

樣式 × 語言矩陣由 `tests/unit/compression/output-styles-i18n-matrix.test.ts` 固定：新樣式若未至少提供 pt-BR 翻譯（或明確追蹤的例外），就無法發布；既有樣式也不能在未告知的情況下失去任何地區設定。若要新增樣式，請參閱 [EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md#adding-an-output-style)。

### 工具結果壓縮

`toolResultCompressor.ts` 模組為工具結果（函式呼叫、代理輸出、搜尋結果等）提供 **5 種專用壓縮策略**：

1. **搜尋結果壓縮**——移除重複結果，保留前 N 筆
2. **檔案讀取壓縮**——截斷大型檔案，保留標頭／匯入
3. **程式碼執行壓縮**——僅保留必要的 stdout/stderr
4. **資料庫查詢壓縮**——限制資料列數量，移除冗長的中繼資料
5. **API 回應壓縮**——移除 null 欄位，精簡陣列

#### 使用時機

當存在工具呼叫時，工具結果壓縮會**永遠啟用**。無須設定。

### 堆疊管線

堆疊模式會**依序執行多個引擎**——通常先執行 RTK（工具輸出可節省 60-90%），再執行 Caveman（對剩餘文字額外節省 30%）。如此可達到**總計 78-95% 的節省幅度**。

#### 運作方式

```
輸入（1000 個 token）
  → RTK（命令感知篩選器）→ 200 個 token
    → Caveman（移除贅詞）→ 140 個 token
  → 輸出（140 個 token，節省 86%）
```

#### 使用時機

以下情況適合使用堆疊模式：

- 大量使用工具的工作流程（代理式程式設計、研究）
- 成本敏感的批次處理
- 需要最大化 token 節省幅度時

透過組合設定進行設定：

```json
{
  "strategy": "auto",
  "config": {
    "auto": {
      "modePack": "stacked"
    }
  }
}
```

---

## 壓縮組合覆寫

您可以**針對每個組合**覆寫全域壓縮模式，以針對不同使用情境微調行為：

```json
{
  "id": "coding-combo",
  "strategy": "priority",
  "config": {
    "auto": {
      "weights": { "taskFit": 0.5 },
      "modePack": "quality-first"
    }
  },
  "compressionOverride": {
    "mode": "aggressive",
    "stackedPipelines": ["rtk", "caveman"],
    "preserveToolDefinitions": true
  }
}
```

這適用於：

- **程式設計組合**：使用 `aggressive` 模式進行長時間工作階段
- **快速問答組合**：使用 `lite` 模式快速回應
- **大量使用工具的組合**：使用 `stacked` 模式以最大限度節省用量
- **正式環境組合**：使用 `cache-aware` 模式以支援快取提供者

---

## 另請參閱

- [環境設定](../reference/ENVIRONMENT.md) — 壓縮環境變數
- [架構指南](../architecture/ARCHITECTURE.md) — 壓縮管線內部機制
- [使用者指南](../guides/USER_GUIDE.md) — 壓縮功能入門
- [RTK 壓縮](./RTK_COMPRESSION.md) — RTK 篩選器、信任模型、驗證閘門、原始輸出復原
- [壓縮引擎](./COMPRESSION_ENGINES.md) — Caveman、RTK、堆疊、API、MCP、儀表板
- [壓縮規則格式](./COMPRESSION_RULES_FORMAT.md) — JSON 規則套件格式
- [壓縮語言套件](./COMPRESSION_LANGUAGE_PACKS.md) — 特定語言的 Caveman 規則
