# 🗜️ Prompt Compression Guide — OmniRoute (中文 (繁體))

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_GUIDE.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_GUIDE.md)

---

> 自動將符合條件的內容節省 15-95%。如需快速概覽，請參閱 [README 壓縮部分](../README.md#%EF%B8%8F-prompt-compression--save-15-95-eligible-tokens-automatically)。

## 概覽

OmniRoute 實作了一個模組化的提示壓縮管線，它在請求到達上游提供者之前**主動**運行。這意味著您的令牌節省是透明發生的 — 無需更改您的工作流程。

```
客戶端請求
  → 壓縮策略選擇器
    → 組合覆寫？ → 使用組合設定
    → 自動觸發閾值？ → 使用自動模式
    → 預設模式？ → 使用全域設定
    → 關閉？ → 跳過壓縮
  → 選定的壓縮模式
    → Off: 無壓縮
    → Lite: 安全的空白/格式清理 (~15%)
    → Standard: Caveman-speak 填充詞移除 (~30%)
    → Aggressive: 歷史老化 + 摘要 (~50%)
    → Ultra: 啟發式修剪 + 程式碼區塊精簡 (~75%)
    → RTK: 命令感知終端機/工具輸出過濾 (上游範圍 60-90%)
    → Stacked: 有序多引擎管線，通常是 RTK 然後 Caveman (符合條件範圍 78-95%)
  → 壓縮請求 → 提供者
```

---

## 壓縮模式

### Off

不應用壓縮。所有訊息都未經更改地通過。

### Lite 模式 (節省約 15%，延遲 <1ms)

最安全的模式 — 零語義變更，僅格式清理：

| 技術                     | 描述                       |
| :----------------------- | :------------------------- |
| `collapseWhitespace`     | 合併連續的空白行和尾隨空格 |
| `dedupSystemPrompt`      | 移除重複的系統訊息         |
| `compressToolResults`    | 壓縮冗長的工具/函數輸出    |
| `removeRedundantContent` | 移除重複的指令             |
| `replaceImageUrls`       | 縮短 base64 圖片資料 URI   |

**最適用於：** 始終開啟的使用情境、安全關鍵型工作流程。

### Standard 模式 (節省約 30%)

靈感來自 [Caveman](https://github.com/JuliusBrussee/caveman) — 在保留意義的同時移除填充詞和冗長的措辭：

- 移除填充詞（"please"、"I think"、"basically"、"actually"）
- 濃縮冗長短語（"in order to" → "to"、"as a result of" → "because"）
- 移除客氣的保留語氣（"Would you mind..."、"If you could possibly..."）
- 針對程式碼提示調整了 30 多條正規表達式規則

**最適用於：** 日常程式碼工作流程、注重成本的團隊。

### Aggressive 模式 (節省約 50%)

針對長時間會話的智慧歷史管理：

- **訊息老化** — 較舊的訊息會逐漸被壓縮
- **工具結果摘要** — 長工具輸出替換為摘要
- **結構完整性保護** — 確保 `tool_use` + `tool_result` 對保持一致
- **上下文視窗感知** — 尊重每個模型的令牌限制

**最適用於：** 擴展的偵錯會話、大型程式碼庫。

### Ultra 模式 (節省約 75%)

針對令牌關鍵情境的最大壓縮：

- **啟發式修剪** — 移除低於相關性閾值的訊息
- **程式碼區塊精簡** — 壓縮重複的程式碼範例
- **二分搜尋截斷** — 找到上下文視窗的最佳截斷點
- 包含所有 Aggressive 模式功能

**最適用於：** 當您重複達到上下文限制時。

### RTK 模式 (上游範圍 60-90%)

RTK 模式針對程式碼代理會話中出現的冗長工具輸出進行了優化：

- 偵測命令/輸出類別，例如 `git status`、`git diff`、`git log`、測試執行器、
  TypeScript/Vite/Webpack 建置、ESLint/Biome/Prettier、npm audit/installs、Docker logs、基礎設施
  輸出以及通用 shell 輸出
- 應用來自 `open-sse/services/compression/engines/rtk/filters/` 的 JSON 過濾包
- 從專案或全域 `filters.toml` 檔案匯入 RTK TOML schema v1 過濾器，具有內聯測試
  驗證和專案檔案的信任門控
- 內建 49 個過濾器，附帶內聯驗證範例
- 移除 ANSI 控制序列、進度條、重複行和無關的噪音
- 保留失敗、錯誤、警告、已更改檔案、摘要以及長輸出的尾部
- 支援信任門控的專案過濾器、全域過濾器和可選的編輯後原始輸出恢復

**最適用於：** 包含 shell、建置、測試、git、grep 和檔案輸出記錄的代理會話。

### Stacked 模式 (符合條件範圍 78-95%)

Stacked 模式以確定性順序運行多個壓縮引擎。預設管線是：

```txt
RTK -> Caveman
```

該順序首先保持終端機/工具輸出緊湊，然後對剩餘的自然語言提示應用 Caveman 語義濃縮。堆疊管線可以全域配置，或透過分配給路由組合的壓縮組合進行配置。

**最適用於：** 包含大量工具日誌以及人類指令或助理摘要的混合上下文。

---

## 上游節省數學

OmniRoute 從兩個來源記錄壓縮節省：上游專案基準測試和 OmniRoute 自身的引擎組成。

| 來源    | 此處使用的上游 README 數字                                                                 |
| ------- | ------------------------------------------------------------------------------------------ |
| Caveman | 輸出 token 減少 `~75%`，基準測試平均輸出節省 `65%`，範圍 `22-87%`，以及輸入壓縮工具 `~46%` |
| RTK     | 命令輸出節省 `60-90%`；範例會話 `~118,000 -> ~23,900` token，或節省 `79.7%` (`~80%`)       |

對於重疊的工具/上下文負載，預設的 OmniRoute 組合會堆疊引擎：

```txt
RTK -> Caveman
```

組合節省是乘法的，而非加法的：

```txt
combined = 1 - (1 - RTK savings) * (1 - Caveman input savings)
average  = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
range    = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

當 RTK 和 Caveman 都能減少相同的輸入/上下文負載時，該 `78-95%` 的數字適用。Caveman 回應輸出模式是獨立的：啟用時，使用 Caveman 自身的輸出節省（平均 `65%`，標題 `~75%`，範圍 `22-87%`）。總計費用節省取決於您的提示/輸出組合。

### 「符合資格」的實際意義

15-95% 的標題範圍是真實的，但它僅適用於**冗餘或冗長**的內容 — 重複的錯誤行、垃圾郵件式的相同警告的建置日誌、過大的 `grep`/檔案讀取轉儲。它**不**意味著每個請求都能節省那麼多。

經經驗證實（`tests/unit/compression/stacked-compression-tool-result-savings.test.ts`）：針對包含 300 個相同錯誤行的 Anthropic 格式 `tool_result` 區塊執行 `stacked`（RTK + Caveman）產生了 **95.93% 的 token 節省 / 96.26% 的字元節省** — 完全符合廣告範圍。但相同的管道針對正常的、非冗餘的工具輸出（一個乾淨的 `grep` 匹配列表、一個簡短的檔案讀取、普通的對話文本）執行時，正確地產生了**接近零的節省**，因為沒有重複的內容可以移除，並且 `validateCompression()` (`validation.ts`) 拒絕發送會刪除或更改程式碼區塊、URL、標題、版本或全大寫常數識別碼的重寫。

這是預期中安全行為，而非錯誤：一個主要讀取/搜尋乾淨檔案的編碼會話，即使完全啟用壓縮，也會看到適度的總節省，而一個遇到失敗循環或冗長 linter 的會話，則會在該流量上看到完整的 78-95% 範圍。不要將單一會話的低總節省百分比作為壓縮配置錯誤的證據 — 首先檢查底層工具輸出是否確實冗餘。

---

## Token 節省視覺化

```
Without compression: 47K tokens sent to LLM (未壓縮：47K token 發送到 LLM)
With Lite:           40K tokens sent          (15% saved — safe, always-on) (輕量級：發送 40K token — 節省 15%，安全，始終開啟)
With Standard:       33K tokens sent          (30% saved — caveman-speak rules) (標準：發送 33K token — 節省 30%，遵循 Caveman 語法規則)
With Aggressive:     24K tokens sent          (50% saved — aging + summarization) (積極：發送 24K token — 節省 50%，老化 + 摘要)
With Ultra:          12K tokens sent          (75% saved — heuristic pruning) (超高：發送 12K token — 節省 75%，啟發式修剪)
With RTK:            19K-5K tokens sent       (60-90% saved on command/tool output) (RTK：發送 19K-5K token — 命令/工具輸出節省 60-90%)
With Stacked:        10K-2.5K tokens sent     (78-95% eligible RTK+Caveman range) (堆疊：發送 10K-2.5K token — 符合資格的 RTK+Caveman 範圍 78-95%)
```

---

## 配置

### 儀表板

導航至 `儀表板 → 上下文與快取`：

- **Caveman** — 模式選擇、語言包、預覽和全域預設值
- **RTK** — 命令過濾器預覽、RTK 安全設定和過濾器目錄
- **壓縮組合** — 分配給路由組合的命名引擎管道
- **自動觸發閾值** — 當令牌計數超過閾值時自動啟用壓縮

### 每組合覆寫

在 `儀表板 → 上下文與快取 → 壓縮組合` 中，將壓縮組合分配給路由組合：

```txt
Combo: "free-tier-fallback"
  Compression Combo: "coding-agent-stack"
  Pipeline: RTK -> Caveman
  Targets:
    1. if/kimi-k2.7-code
    2. if/qwen3.8-max-preview
```

這讓您可以在免費/編碼提供者上使用堆疊壓縮，同時在付費訂閱上保持精簡模式。

此「每組合覆寫」分配與**路由組合壓縮模式**覆寫（預設/關閉/精簡/標準/激進/超激進）是不同的控制項 — 該覆寫不會選擇命名的壓縮組合管道；它只是設定由 `resolveCompressionPlan` 查詢的 `compressionMode` 欄位。它可以在組合卡片上設定（`儀表板 → 組合`），或者自 #6760 起，在 `儀表板 → 上下文與快取 → 壓縮組合` 的「分配給路由」列表中，在上述管道分配核取方塊旁邊，為每個路由組合設定。這兩種介面都透過相同的 `PUT /api/combos/{id}` 端點進行持久化。

### 每請求覆寫

發送 `x-omniroute-compression` 請求標頭以覆寫單一請求的壓縮計畫。它具有最高優先級 — 它會覆蓋路由組合覆寫、活動設定檔、自動觸發和面板預設值。未知值將被忽略（請求永遠不會被拒絕），並且全域主開關仍然控制一切：當全域壓縮關閉時，此標頭無法將其開啟。值：

| 值            | 效果                                                              |
| ------------- | ----------------------------------------------------------------- |
| `off`         | 此請求不進行壓縮。                                                |
| `default`     | 面板派生的預設設定檔（忽略活動設定檔）。有損引擎保持關閉。        |
| `safe`        | 與省略標頭相同：僅進行重複資料刪除和空白摺疊。                    |
| `allow-lossy` | 保留此請求的操作員計畫，包括摘要、相關性過濾器和樣式重寫。        |
| `engine:<id>` | 啟用時的單一引擎，例如 `engine:rtk`。這是該引擎的每請求選擇加入。 |
| `<combo>`     | 命名組合，首先按名稱（不區分大小寫）匹配，然後按 ID 匹配。        |

如果沒有 `allow-lossy`、`engine:<id>` 或命名組合，則不會應用有損引擎。當壓縮開啟時，請求仍會進行會話重複資料刪除和空白摺疊。

應用的計畫會在 `X-OmniRoute-Compression: <mode>; source=<source>` 回應標頭中回傳，其中 `<source>` 是 `request-header`、`routing-override`、`active-profile`、`auto-trigger`、`default` 或 `off` 之一。

### API

```bash
# 取得壓縮設定
curl http://localhost:20128/api/settings/compression

# 更新壓縮設定
curl -X PUT http://localhost:20128/api/settings/compression \
  -H "Content-Type: application/json" \
  -d '{"defaultMode":"stacked","autoTriggerMode":"stacked","autoTriggerTokens":32000}'

# 預覽特定的 RTK/堆疊負載
curl -X POST http://localhost:20128/api/compression/preview \
  -H "Content-Type: application/json" \
  -d '{"mode":"rtk","messages":[{"role":"tool","content":"npm test output here"}]}'

# 列出 RTK 過濾器包
curl http://localhost:20128/api/context/rtk/filters

# 直接測試 RTK，可選帶有命令元資料
curl -X POST http://localhost:20128/api/context/rtk/test \
  -H "Content-Type: application/json" \
  -d '{"command":"npm test","text":"FAIL tests/example.test.ts\nError: boom"}'
```

---

## 受保護的內容

壓縮引擎**總是會保留：**

- ✅ 程式碼區塊（圍欄式和行內式）
- ✅ 網址和檔案路徑
- ✅ JSON 結構和結構化資料
- ✅ 識別碼和受保護的技術符記
- ✅ 數學表達式
- ✅ 工具/函數呼叫定義
- ✅ 系統提示（在精簡模式下）

RTK 原始輸出復原會在任何內容被持久化之前，修訂常見的 API 金鑰、Bearer 符記、Slack 符記、AWS 存取金鑰、密碼、符記和機密。

---

## 壓縮統計

每個壓縮請求都會在伺服器日誌中包含統計資料：

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

| 階段     | 模式                                                                                                                                          | 狀態      |
| -------- | --------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| Phase 1  | Off, Lite                                                                                                                                     | ✅ 已發布 |
| Phase 2  | Standard, Aggressive, Ultra                                                                                                                   | ✅ 已發布 |
| Phase 3  | RTK, Stacked, Compression Combos                                                                                                              | ✅ 已發布 |
| Phase 4  | Output Styles, SLM-tier Ultra, eval harness                                                                                                   | ✅ 已發布 |
| Phase 4C | Adaptive context-budget ("dial") — compute engine + API (`contextBudget` on `PUT /api/settings/compression`) + dashboard mode/policy controls | ✅ 已發布 |

---

## 致謝

標準模式壓縮規則的靈感來自於 **[JuliusBrussee](https://github.com/JuliusBrussee)** 的 **[Caveman](https://github.com/JuliusBrussee/caveman)** (⭐ 51K+) — 這個病毒式傳播的專案以「為何使用許多符記，當少數符記就能搞定」為理念。Caveman 報告輸出符記減少約 `75%`，基準測試平均輸出節省 `65%`，輸出範圍為 `22-87%`，以及約 `46%` 的輸入壓縮工具。

RTK 模式的靈感來自於 **[RTK AI](https://github.com/rtk-ai)** 的 **[RTK - Rust Token Killer](https://github.com/rtk-ai/rtk)** — 這個用於終端機、建置、測試、git 和工具輸出過濾的高效能命令輸出壓縮專案。RTK 報告節省 `60-90%`，其 README 範例會話顯示節省約 `80%`。

---

## 進階壓縮系統

除了 7 種標準模式之外，OmniRoute 還包含多個根據上下文自動運作的進階壓縮系統。

### 快取感知壓縮

某些提供者（例如 Anthropic 及其提示快取）支援**提示快取**，這讓他們能夠快取提示的部分內容以降低成本和延遲。當快取啟用時，激進的壓縮實際上可能會**損害**效能，因為它會改變快取的符記，從而使快取失效。

`cachingAware.ts` 模組透過**偵測快取上下文**並**相應調整壓縮策略**來解決此問題。

#### 運作方式

1.  **偵測快取上下文** — 掃描請求主體以尋找 `cache_control` 標記
2.  **識別快取提供者** — 檢查目標提供者是否支援快取
3.  **調整策略** — 將快取提供者的 `aggressive`/`ultra` 降級為 `standard`
4.  **跳過系統提示** — 系統提示通常會被快取，因此不對其進行壓縮
5.  **使用確定性轉換** — 僅使用產生一致輸出的轉換

#### 程式碼範例

```ts
import {
  detectCachingContext,
  getCacheAwareStrategy,
} from "@omniroute/open-sse/services/compression/cachingAware";

const body = {
  model: "anthropic/claude-sonnet-4.5",
  messages: [{ role: "user", content: "Hello" }],
  cache_control: { type: "ephemeral" }, // ← Cache marker
};

const ctx = detectCachingContext(body, { provider: "anthropic" });
// → { hasCacheControl: true, provider: "anthropic", isCachingProvider: true }

const strategy = getCacheAwareStrategy("aggressive", ctx);
// → { strategy: "standard", skipSystemPrompt: true, deterministicOnly: true }
```

#### 使用時機

快取感知壓縮**始終啟用** — 無需配置。它僅在以下情況下啟動：

- 請求具有 `cache_control` 標記
- 目標提供者支援提示快取（Anthropic、OpenAI 等）

### 漸進式老化

長對話會累積許多訊息回合，但較舊的回合相關性會降低。`progressiveAging.ts` 模組會**根據回合距離降級訊息**：

- **最近的回合 (0-3)**：逐字保留（完整細節）
- **中等回合 (4-8)**：精簡壓縮（空白、格式清理）
- **舊回合 (9+)**：Caveman 壓縮（移除填充詞、摘要）
- **非常舊的回合 (20+)**：大量摘要或捨棄

#### 程式碼範例

```ts
import { applyAging } from "@omniroute/open-sse/services/compression/progressiveAging";

const messages = [
  { role: "system", content: "You are a helpful assistant" },
  { role: "user", content: "What is 2+2?" },
  { role: "assistant", content: "4" },
  // ... 還有 50 個回合 ...
];

const { messages: aged, saved } = applyAging(messages, {
  verbatim: 3, // 前 3 個回合：逐字
  light: 8, // 第 4-8 個回合：精簡壓縮
  moderate: 20, // 第 9-20 個回合：Caveman 壓縮
  // 第 21 個回合以上：大量摘要
});

// saved = 節省的符記數量
```

#### 使用時機

漸進式老化對於 `aggressive` 和 `ultra` 模式**始終啟用**。它對於以下情況特別有效：

- 長時間的編碼會話
- 多日對話
- 具有許多工具呼叫的代理工作流程

### 原始人輸出模式 (Caveman Output Mode)

`outputMode.ts` 模組會注入**系統提示指令**，使模型本身產生壓縮、簡潔的輸出（一種「原始人」風格）。

#### 運作方式

此模式不是壓縮輸入，而是新增一個系統提示，例如：

> 「請用最少的詞彙回覆。省略客套話。使用短句。」

這對於以下情況特別有效：

- 程式碼生成（更簡潔的輸出 = 更少的 tokens）
- 快速問答（無需詳細解釋）
- 批次處理（最大化吞吐量）

#### 何時使用

原始人輸出模式是**可選加入**的 — 透過組合配置設定：

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

### 輸出風格 (目錄)

上述的原始人輸出模式是**傳統的單一風格路徑**。第四階段將其通用化為一個可組合輸出風格的目錄：`open-sse/services/compression/outputStyles/catalog.ts` 中的 `OUTPUT_STYLE_CATALOG`。每種風格都是一個系統提示指令，使模型本身產生更經濟的輸出；風格可以同時啟用，並按照目錄順序注入。

| 風格                    | `id`          | 作用                                                                                                                                                                | 指令語言                                      |
| ----------------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| 簡潔散文                | `terse-prose` | 省略填充詞/冠詞/模糊語；保持技術實質精確。與傳統原始人輸出模式的文字相同（引用而非重新輸入）。                                                                      | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| 更少程式碼              | `less-code`   | YAGNI 階梯：最小化可行變更，無不必要的抽象。                                                                                                                        | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| 馬尾 (懶惰的資深開發者) | `ponytail`    | 「最好的程式碼是從未寫過的程式碼」：重用 > 重寫，根本原因 > 症狀，最短工作差異。                                                                                    | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| 我有 ADHD (行動優先)    | `i-have-adhd` | 行動優先 (指令/路徑/片段在散文之前)，編號的有限步驟，一個具體的下一步，無前言/回顧/結尾。改編自 [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) (MIT)。 | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| 簡潔中日韓 (文言)       | `terse-cjk`   | 文言文超簡潔風格。                                                                                                                                                  | zh (區域設定限制：僅在解析語言為 `zh` 時提供) |

每種風格都提供三種強度等級 — `lite`、`full`、`ultra` — 且每個等級都以共享邊界條款結尾，該條款保持程式碼區塊、檔案路徑、指令、錯誤字串、URL 和識別符號原文不變。

#### 注入方式

`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) 會根據目錄解析選擇（未知 ID 和區域設定不符的風格會被捨棄，絕不會產生錯誤），按照目錄順序串聯選定的指令，**一次性**附加邊界條款，並將結果預載入到系統提示中，置於單一冪等標記 (`[OmniRoute Output Styles]`) 後方 — 重新應用是無操作。當偵測到的請求語言有翻譯時，會注入本地化指令而非英文。

#### 如何啟用

在儀表板中：**上下文 → 設定 → 壓縮** — 每種風格一行，帶有開/關切換和等級選擇器。以程式方式，壓縮配置會將選擇持久化為：

```json
{
  "outputStyles": [
    { "id": "i-have-adhd", "level": "full" },
    { "id": "less-code", "level": "lite" }
  ]
}
```

向後兼容：傳統的 `outputMode: "caveman"` 組合設定仍然有效，並映射到 `terse-prose`，在每個傳統語言中與舊注入的位元組完全相同。

語言選擇：當 `languageConfig.enabled` 開啟時，`autoDetect` 會選擇最新使用者訊息的語言（與輸入引擎使用相同的偵測器）；關閉 `autoDetect` 會固定 `defaultLanguage`。關閉 → 英文。

風格 × 語言矩陣由 `tests/unit/compression/output-styles-i18n-matrix.test.ts` 固定：新風格必須至少有 pt-BR 翻譯（或明確追蹤的例外情況）才能發布，且現有風格不能悄無聲息地失去區域設定。要新增風格，請參閱 [EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md#adding-an-output-style)。

### 工具結果壓縮

`toolResultCompressor.ts` 模組為工具結果（函數呼叫、代理輸出、搜尋結果等）提供了 **5 種專門的壓縮策略**：

1.  **搜尋結果壓縮** — 移除冗餘結果，保留前 N 個
2.  **檔案讀取壓縮** — 截斷大檔案，保留標頭/導入
3.  **程式碼執行壓縮** — 僅保留必要的標準輸出/標準錯誤
4.  **資料庫查詢壓縮** — 限制行數，移除冗餘元數據
5.  **API 回應壓縮** — 剝離空欄位，壓縮陣列

#### 何時使用

當存在工具呼叫時，工具結果壓縮**始終開啟**。無需配置。

### 堆疊管線

堆疊模式會**依序執行多個引擎** — 通常是先執行 RTK (工具輸出可節省 60-90%)，然後再執行 Caveman (對剩餘文字額外節省 30%)。這可實現**總計 78-95% 的節省**。

#### 運作方式

```
輸入 (1000 個 token)
  → RTK (指令感知篩選器) → 200 個 token
    → Caveman (填充物移除) → 140 個 token
  → 輸出 (140 個 token，節省 86%)
```

#### 使用時機

在以下情況使用堆疊模式：

- 工具密集型工作流程 (代理程式編碼、研究)
- 對成本敏感的批次處理
- 當您需要最大程度的 token 節省時

透過組合設定：

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

您可以**針對每個組合**覆寫全域壓縮模式，以微調不同使用案例的行為：

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

這對於以下情況很有用：

- **編碼組合**：長時間會話使用 `aggressive` 模式
- **快速問答組合**：快速回應使用 `lite` 模式
- **工具密集型組合**：最大化節省使用 `stacked` 模式
- **生產組合**：快取提供者使用 `cache-aware` 模式

---

## 參見

- [環境配置](../reference/ENVIRONMENT.md) — 壓縮環境變數
- [架構指南](../architecture/ARCHITECTURE.md) — 壓縮管線內部結構
- [使用者指南](../guides/USER_GUIDE.md) — 壓縮入門
- [RTK 壓縮](./RTK_COMPRESSION.md) — RTK 篩選器、信任模型、驗證閘門、原始輸出恢復
- [壓縮引擎](./COMPRESSION_ENGINES.md) — Caveman、RTK、堆疊、API、MCP、儀表板
- [壓縮規則格式](./COMPRESSION_RULES_FORMAT.md) — JSON 規則包格式
- [壓縮語言包](./COMPRESSION_LANGUAGE_PACKS.md) — 特定語言的 Caveman 規則
