# Compression Engines (中文 (繁體))

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_ENGINES.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_ENGINES.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇦 [bs](../../../bs/docs/compression/COMPRESSION_ENGINES.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_ENGINES.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_ENGINES.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_ENGINES.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_ENGINES.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_ENGINES.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_ENGINES.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_ENGINES.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_ENGINES.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_ENGINES.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_ENGINES.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_ENGINES.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_ENGINES.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_ENGINES.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_ENGINES.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_ENGINES.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_ENGINES.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_ENGINES.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_ENGINES.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_ENGINES.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_ENGINES.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_ENGINES.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_ENGINES.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_ENGINES.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_ENGINES.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_ENGINES.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_ENGINES.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_ENGINES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_ENGINES.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_ENGINES.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_ENGINES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_ENGINES.md)

---

OmniRoute 壓縮以引擎契約為核心。每種模式可以直接執行單一引擎
（`caveman` 或 `rtk`），也可以執行依序運作多個引擎的確定性堆疊管線。

## 模式

| 模式         | 引擎路徑                       | 預期輸入                             |
| ------------ | ------------------------------ | ------------------------------------ |
| `off`        | 無                             | 完整保留提示詞                       |
| `lite`       | Caveman lite 輔助工具          | 低風險、永遠啟用的清理               |
| `standard`   | Caveman                        | 自然語言提示詞的精簡                 |
| `aggressive` | Caveman + 歷史記錄／工具摘要器 | 長時間的聊天工作階段                 |
| `ultra`      | Caveman + 修剪輔助工具         | 逼近上下文限制時的復原               |
| `rtk`        | RTK                            | 終端機、shell、建置、測試與 git 輸出 |
| `omniglyph`  | OmniGlyph                      | 原生提供者傳輸協定上的影像化上下文   |
| `stacked`    | 管線，預設為 `rtk -> caveman`  | 混合工具日誌與一般文字，最大化節省量 |

### OmniGlyph 壓縮設定檔

`omniglyph` 引擎（套件 `omniglyph`，1.4.0+）接受具名語意設定檔，可透過壓縮設定中的
`omniglyph.profile` 進行全域設定，或透過堆疊管線的步驟設定逐步指定：

| 設定檔        | 邊界                                                                      |
| ------------- | ------------------------------------------------------------------------- |
| `aggressive`  | 預設值。已發布測量結果所採用的策略——將系統、工具文件與密集歷史記錄影像化  |
| `balanced`    | 將即時狀態保留為原生格式、保護最近 8 輪對話，並摺疊較舊且已結束的歷史記錄 |
| `coding-safe` | 將權限、工具結構描述與即時工具輸出保留為原生格式，並保護最近 12 輪對話    |
| `passthrough` | 路由但不轉換；略過此引擎                                                  |

設定檔是**上限，而非下限**：套件中的 `mergeCompressionProfileOptions`
不允許呼叫端的覆寫重新開啟設定檔已關閉的有損通道，因此每步驟的
`preserveSystemPrompt: false` 無法在 `coding-safe` 下重新啟用系統壓縮。

在此程式碼庫上的測量結果顯示：`coding-safe` 與 `balanced` 會將 `minCompressChars`
提高到最大值，並將系統、工具結構描述與工具結果保留為原生格式，因此尚未累積歷史記錄的
工作階段會在 `below_min_chars` 停止，而引擎不會進行任何轉換。這就是預設值採用
`aggressive`，而非最安全設定檔的原因。

此套件會從其環境設定中解析自身的模型範圍與設定檔。
OmniRoute 絕不委派此決策：轉接器會將模型閘門固定為套件中限制最嚴格的範圍，因此主機環境設定
只能縮小允許清單，絕不會將其擴大至超出 OmniRoute 已測量結果所涵蓋的範圍。

## 引擎登錄檔

登錄檔位於 `open-sse/services/compression/engines/registry.ts`。引擎公開一套共用契約：

- `id`：穩定的引擎 ID，例如 `caveman` 或 `rtk`
- `apply(text, config)`：堆疊管線使用的舊版執行路徑
- `compress(input, config)`：主要執行路徑，回傳文字與統計資料
- `getConfigSchema()`：回傳有效設定的類 JSON Schema 結構
- `validateConfig(config)`：回傳 `{ valid, errors[] }`

註冊使用 `registerCompressionEngine(engine)`（進階情況則使用 `registerEngine`），其會先呼叫 `assertValidEngine()` 和 `validateConfig(defaultConfig)`，然後才接受引擎。
使用 `unregisterCompressionEngine(id)` 可在執行階段移除引擎。

`strategySelector.ts` 會在壓縮執行前註冊內建引擎。如此一來，預覽、執行階段壓縮、堆疊模式、測試及未來的引擎皆可使用相同的執行路徑。

### MCP 描述壓縮（相關）

另一個獨立的登錄檔會在登錄檔層級壓縮 MCP 工具描述中繼資料——請參閱
`open-sse/mcp-server/descriptionCompressor.ts` 和 [MCP-SERVER.md](../frameworks/MCP-SERVER.md)。它會重複使用
Caveman 規則，但作用於工具中繼資料，而非請求承載資料。

### 其他內建引擎

除了 Caveman、RTK 和 LLMLingua-2 之外，登錄檔還隨附數個專門的無損／
結構化引擎（由堆疊管線、playground 和測試使用）：

| 引擎          | ID              | 功能                                                                                                                |
| ------------- | --------------- | ------------------------------------------------------------------------------------------------------------------- |
| CCR           | `ccr`           | Content-Compress-Retrieve（H4）：以內容定址參照取代大型連續文字區塊，使重複／大型區塊僅傳送一次，之後均以參照表示。 |
| headroom      | `headroom`      | SmartCrusher（H3 + N5）：將同質 JSON 陣列承載資料無損地壓縮為欄式 `[N rows]` 格式。                                 |
| ionizer       | `ionizer`       | 對非常大型的同質區塊進行首／中／尾資料列取樣，並將省略的中間部分儲存為 CCR 內容定址參照。                           |
| session-dedup | `session-dedup` | 跨輪次的內容定址去重（靈感來自 TokenMizer）：省略同一工作階段先前輪次中已出現的文字。                               |

**CCR 擷取協定指示（#8033）：** 當 CCR 第一次在請求中取代 ≥1 個區塊時，
引擎會在前方加上一則具冪等性的 `system` 訊息（以
`[CCR protocol]` 哨兵標記開頭），向呼叫端說明標記 → 工具契約：何謂
`[CCR retrieve hash=<24hex> chars=N]` 標記、雜湊值必須逐字複製
（全部 24 個十六進位字元——誤抄雜湊值很可能是「找不到區塊」
問題的原因），以及 `[dedup:ref sha=...]` 標記意指「回頭查看歷史記錄」，而非「呼叫
工具」。只有當呼叫端宣告的 `tools[]` 證明它確實可存取
`omniroute_ccr_retrieve` 時，才會注入此提示（請參閱
`open-sse/services/compression/engines/ccr/protocolInstruction.ts` 中的
`callerSupportsCcrRetrieve()`）——無法使用該工具的一般
OpenAI 相容呼叫端，絕不會收到要求呼叫其無法存取之工具的指示。
注入前會掃描訊息歷史記錄以尋找該哨兵標記，藉此確保冪等性，
因此多輪請求（會重播先前訊息）不會每輪都重複堆疊此提示。

## Caveman

Caveman 模式著重於一般散文的語意濃縮：

- 保留程式碼區塊、URL、JSON、路徑及結構化資料
- 移除贅詞、保留語氣、重複脈絡及冗長的連接措辭
- 支援位於 `open-sse/services/compression/rules/` 的語言感知檔案規則套件
- 仍可透過舊版的 `standard`、`aggressive` 及 `ultra` 模式使用

儀表板中的位置為 `Dashboard -> Context & Cache -> Caveman`。

Caveman 上游報告指出，其輸出 token 可減少 `~75%`，基準測試中的平均輸出節省量為 `65%`，
範圍介於 `22-87%`，另有一項輸入壓縮工具可節省 `~46%`。OmniRoute 在記錄堆疊式提示詞／上下文
節省量時，採用 Caveman 的輸入端數據；Caveman 輸出模式仍是獨立的回應行為功能。

## RTK

RTK 模式著重於命令及工具輸出：

- 偵測 `git status`、`git branch`、`git diff`、Vitest/Jest/Pytest、
  Cargo/Go 測試、TypeScript/Vite/Webpack 建置、ESLint、npm 稽核／安裝、Docker 日誌、
  shell `find`/`grep`、堆疊追蹤及一般日誌等輸出類別
- 套用來自 `open-sse/services/compression/engines/rtk/filters/` 的 49 個 JSON 篩選器
- 支援 RTK 風格的宣告式管線：移除 ANSI、取代、符合輸出時短路、
  移除／保留行、逐行截斷、開頭／結尾／最大行數截斷，以及空輸出時的備援
- 支援 `.rtk/filters.json` 中受信任閘門控管的專案篩選器，以及
  `DATA_DIR/rtk/filters.json` 中的全域篩選器
- 移除 ANSI 序列、進度雜訊、重複行及無用的樣板文字
- 保留可採取行動的失敗、警告、摘要、已變更檔案及結尾脈絡
- 可選擇保留經遮蔽的原始輸出，以便透過經驗證的管理路由進行復原／偵錯

儀表板中的位置為 `Dashboard -> Context & Cache -> RTK`。

自訂篩選器、信任、驗證及原始輸出復原的操作詳細資訊，請參閱
[`RTK_COMPRESSION.md`](./RTK_COMPRESSION.md)。

RTK 上游報告指出，命令輸出壓縮可節省 `60-90%`。其 README 範例顯示，一段
30 分鐘的 Claude Code 工作階段可從 `~118,000` 個 token 降至 `~23,900`，即節省 `79.7%`。

## LLMLingua-2（語意修剪）

LLMLingua-2 模式使用小型 ONNX token 分類器，對散文執行**語意 token 修剪**，
以補充以規則為基礎的 Caveman 與 RTK 引擎：

- 僅壓縮非系統訊息中的散文；圍欄式程式碼區塊及其他受保留的結構絕不會被修改
- 在工作執行緒中執行 `@atjsh/llmlingua-2` 後端（透過 `@huggingface/transformers` 使用 ONNX），
  因此模型推論絕不會阻塞請求事件迴圈
- **可堆疊**（`stackPriority` 35）：在堆疊式管線中，它會於
  結構化引擎（CCR、工作階段去重、headroom、Caveman）之後、`ultra` 之前執行，因為
  語意修剪對已完成結構壓縮的文字最為有效，例如
  `rtk -> caveman -> llmlingua`
- **遇到任何錯誤皆採失敗開放策略**（缺少選用相依套件、工作執行緒衍生、模型載入、推論
  或逾時）→ 原始文字會原封不動地傳回，絕不傳回錯誤

引擎位置：`open-sse/services/compression/engines/llmlingua/`。儀表板中的位置
為 `Dashboard -> Context & Cache -> LLMLingua`。

### 模型

預設模型為 **TinyBERT**（`atjsh/llmlingua-2-js-tinybert-meetingbank`，約 57 MB，
速度快）。可透過引擎設定的 `model` 欄位使用準確度更高的 **BERT-base** 模型
（`Arcoldd/llmlingua4j-bert-base-onnx`，約 710 MB）。首次呼叫時，
`@huggingface/transformers` 會延遲從 HuggingFace Hub 將所選模型下載至
`${DATA_DIR}/models/llmlingua`（`modelStore.ts`）；也可透過 `modelPath` 設定覆寫，
改為指向本機副本（用於離線／實體隔離安裝）。

### 選用相依套件與隨選安裝

可修剪的 LLMLingua 執行階段 peer 堆疊為**選用項目**。有兩個套件在
`package.json` 中宣告為 `optionalDependencies`，且在正式環境建置時維持為**外部相依**
（`scripts/build/prepublish.ts` 不會將其綁定）：

| 套件                 | 版本（固定） | 備註                                     |
| -------------------- | ------------ | ---------------------------------------- |
| `@atjsh/llmlingua-2` | `2.0.5`      | 入口套件；將其他套件宣告為 peer 相依套件 |
| `js-tiktoken`        | `^1.0.20`    | Tokenizer                                |

`@huggingface/transformers` 固定為 `^4.2.0`（與本機嵌入路徑共用，
也會追蹤至獨立套件組合中）；`@atjsh/llmlingua-2@2.0.5` 對其採用
`"^3.5.2 || ^4.0.0"` 的 peer 相依版本範圍，因此 Transformers.js v3 與 v4 均受支援。自 2.0.4 起，
`@atjsh/llmlingua-2` 不再需要 `@tensorflow/tfjs`，因而從 SLM 堆疊中移除了占用空間最大的單一
元件（TensorFlow.js）。只有上述兩個套件屬於可修剪的 SLM peer 相依套件。除非省略選用
相依套件，否則標準的 `npm install`（開發環境）會自動安裝選用堆疊。

**隨選安裝的原因：**透過 npm 發布的套件、獨立套件組合及 Docker 映像檔
出貨時均**不包含**這些相依套件，以維持精簡。缺少這些套件時，工作執行緒的相依套件
閘門（`worker.ts` 中的 `@atjsh/llmlingua-2` 解析探測）會失敗，而引擎會
**以靜默方式採失敗開放策略**——選取 LLMLingua 將不會執行任何操作（文字原封不動地傳回，
且不會記錄錯誤）。若要在經修剪的環境中啟用它，請安裝選用堆疊：

```bash
# 固定為 package.json optionalDependencies 中宣告的版本
npm install @atjsh/llmlingua-2@2.0.5 js-tiktoken
```

移除 `@tensorflow/tfjs`（2.0.4+）後，便消除了先前占主導地位、約 800 MB 的
元件；剩餘空間占用來自 transformers.js 與 onnxruntime-node 執行階段，
以及首次使用時下載的 TinyBERT 模型（約 57 MB，並非透過 npm 下載）。

各環境：

- **開發環境 / `npm install`** — 除非您傳入 `--omit=optional`
  （或 `--no-optional`），否則會自動安裝。無需採取任何動作。
- **全域 npm（`npm i -g omniroute`）/ 獨立安裝** — 在已安裝的套件目錄內執行上述安裝命令，或重新安裝且不要省略選用相依套件。
- **Docker** — 在衍生映像檔層中加入安裝命令；發布的映像檔依設計保持精簡。
- **VPS（PM2）** — 安裝至應用程式的 `node_modules`，然後重新啟動程序，讓 worker 重新探測閘門。
- **原始 Next 獨立版本（`npm run build` → `.build/next/standalone/server.js`）** — 獨立追蹤既不包含 worker，也不包含選用相依套件，因此引擎會悄然採取失敗開放策略。`scripts/build/colocate-standalone.mjs` 會重新套用兩者（worker esbuild + 將選用相依套件閉包納入獨立目錄樹）；每次建置後，它都會透過 `postbuild` npm 掛鉤自動執行。可重複執行，且在相依套件不存在時會柔性失敗。

**確認它已啟用：**選取 LLMLingua 後，實際的自然語言文字確實會縮短（引擎不再採取失敗開放策略），且第一次請求會觸發模型下載至
`${DATA_DIR}/models/llmlingua`。此閘門刻意只探測 `@atjsh/llmlingua-2` —
其他對等相依套件僅支援 ESM，即使存在，`require.resolve` 也會對它們擲回例外 — 因此，如果在 `import()` 時確實缺少任何對等相依套件，worker 仍會採取失敗開放策略。

## 堆疊式管線

堆疊模式會依序執行管線步驟。預設為：

```txt
rtk -> caveman
```

此模式適用於提示中結合命令輸出與人類或助理文字的程式設計代理工作階段。RTK 會先減少冗長的工具日誌，接著由 Caveman 壓縮其餘自然語言。

管線步驟可透過壓縮設定中的 `stackedPipeline` 或壓縮組合進行設定。

當兩個引擎都縮減同一個符合條件的承載內容時，節省效果會疊加：

```txt
combined = 1 - (1 - RTK savings) * (1 - Caveman input savings)
average  = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
range    = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

## MCP 無障礙樹狀結構篩選器

MCP 無障礙樹狀結構智慧篩選器是一個執行後壓縮層，作用於 MCP **工具結果**，而非提示或上下文。它的目標是由 Playwright、computer-use 和 browser-automation MCP 伺服器等工具所傳回的冗長無障礙樹狀結構與瀏覽器快照承載內容。

### 功能

1. **雜訊移除** — 移除空白的通用／文字項目（`- generic:`、`- text: ""`）
2. **同層項目折疊** — 當連續結構重複的行數 ≥ `collapseThreshold`（預設為 30）時，將其折疊為最前面的 `collapseKeepHead`（預設為 10）行 + 數量摘要 + 最後面的 `collapseKeepTail`（預設為 5）行
3. **參照保留** — Playwright／computer-use 所需的 `[ref=eXX]` 錨點絕不會被修改
4. **硬性截斷** — 如果折疊後的文字仍超過 `maxTextChars`（預設為 50,000），則會截斷內容並附上導覽提示，讓代理能繼續工作

### 引擎位置

```txt
open-sse/services/compression/engines/mcpAccessibility/
  index.ts            ← smartFilterText() 進入點
  collapseRepeated.ts ← 同層項目折疊演算法
  constants.ts        ← DEFAULT_MCP_ACCESSIBILITY_CONFIG
```

### 設定

由全域設定中的 `compression.mcpAccessibility` 控制（遷移 056）。預設設定：

```json
{
  "enabled": true,
  "maxTextChars": 50000,
  "collapseThreshold": 30,
  "collapseKeepHead": 10,
  "collapseKeepTail": 5,
  "minLengthToProcess": 2000
}
```

此篩選器只會套用至 `type` 為 `"text"` 且長度超過 `minLengthToProcess` 的工具結果承載內容。它不會影響提示壓縮或請求承載內容。

### 預期節省幅度

瀏覽器快照工具結果可節省 60–80%，具體取決於頁面複雜度。折疊演算法相對於行數的複雜度為 O(n)，增加的延遲可忽略不計。

### 此篩選器與上述壓縮引擎的比較

| 面向     | Caveman / RTK / 堆疊式 | MCP 無障礙篩選器                       |
| -------- | ---------------------- | -------------------------------------- |
| 目標     | 請求提示／上下文       | MCP 工具結果                           |
| 觸發方式 | 壓縮模式設定           | `compression.mcpAccessibility.enabled` |
| 範圍     | 所有 SSE 訊息          | 僅限工具結果                           |
| 參照錨點 | 不適用                 | 無條件保留                             |

---

## 壓縮組合

壓縮組合是可指派給路由組合的具名壓縮設定檔：

- `compression_combos`：儲存模式、管線、RTK 設定、語言設定及預設標記
- `compression_combo_assignments`：將壓縮組合對應至路由組合
- 執行階段整合會先解析已指派的壓縮組合，再處理一般組合覆寫
- 分析資料包含 `compression_combo_id` 和 `engine`

儀表板位置：`Dashboard -> Context & Cache -> Compression Combos`。

## API 介面

| 路由                                   | 用途                                         |
| -------------------------------------- | -------------------------------------------- |
| `/api/settings/compression`            | 全域壓縮設定（包含 `mcpAccessibility` 設定） |
| `/api/compression/preview`             | 預覽任何壓縮模式                             |
| `/api/compression/language-packs`      | 列出可用的 Caveman 語言套件                  |
| `/api/context/caveman/config`          | Caveman 設定別名                             |
| `/api/context/rtk/config`              | RTK 預設值及設定                             |
| `/api/context/rtk/filters`             | RTK 篩選器目錄                               |
| `/api/context/rtk/test`                | RTK 預覽／測試端點                           |
| `/api/context/rtk/raw-output/[id]`     | 經驗證且已遮蔽敏感資訊的原始輸出復原         |
| `/api/context/combos`                  | 壓縮組合 CRUD                                |
| `/api/context/combos/[id]/assignments` | 路由組合指派 CRUD                            |
| `/api/context/analytics`               | 壓縮分析別名                                 |

管理路由需要管理驗證或 API 金鑰原則檢查。

## MCP 工具

壓縮功能提供五個 MCP 工具：

| 工具                                | 範圍                | 用途                         |
| ----------------------------------- | ------------------- | ---------------------------- |
| `omniroute_compression_status`      | `read:compression`  | 設定、分析資料、快取統計資料 |
| `omniroute_compression_configure`   | `write:compression` | 更新全域設定                 |
| `omniroute_set_compression_engine`  | `write:compression` | 設定模式及選用的管線         |
| `omniroute_list_compression_combos` | `read:compression`  | 列出壓縮組合                 |
| `omniroute_compression_combo_stats` | `read:compression`  | 讀取組合／引擎分析資料       |

## 範圍與排除項目

**嵌入向量絕不會被壓縮。** `open-sse/handlers/embeddings.ts` 絕不會呼叫任何
壓縮引擎——請求／回應主體會原封不動地直接傳遞給執行器。
目前這是由結構所保證（嵌入向量與聊天補全使用彼此獨立的處理常式），而非
執行階段檢查，但這表示 #8034 中的向量失真疑慮在嵌入向量路徑中沒有暴露面。

**個別模型／端點排除篩選器（#8034）。** 對於聊天補全，操作人員可以指定
絕不可壓縮的模型 ID／`provider/model` 目標——若日後壓縮功能接入更接近嵌入向量的路徑，
這會是很有用的防護措施；一般而言，對任何要求提示詞逐位元組完全一致的模型
（確定性評估、對快取敏感的前綴等）也很有幫助。

- 設定欄位：全域壓縮設定中的 `exclusions?: string[]`
  （`GET`/`PUT /api/settings/compression`），透過現有的 `key_value` 壓縮
  命名空間（`src/lib/db/compression.ts`）持久化——不新增資料表。
- 儀表板分頁：**Dashboard → Compression → Exclusions**
  （`/dashboard/compression/exclusions`）。
- 模式語法：`*` 是唯一的萬用字元。模式中的所有其他正規表示式中繼字元都會在
  比對前逸出，因此 `gpt-5.6` 只會比對該字面字串，絕不會比對 `gpt-5x6`
  （可防範 ReDoS、長度有界，且無巢狀量詞）。模式會以不區分大小寫的方式，
  同時與裸模型 ID 及 `provider/model` 組合字串進行比對——`gpt-5-6`、
  `openai/gpt-5-6` 和 `openai/*` 全都有效，而僅使用 `*` 會排除所有模型。
- 比對：位於 `open-sse/services/compression/exclusions.ts` 中的
  `isCompressionExcluded()`／`normalizeCompressionExclusions()`。`chatCore.ts` 會在解析
  壓縮設定後立即檢查被排除的目標，且是在**任何引擎執行之前**；若比對成功，
  其處理方式與全域停用壓縮完全相同——可證明請求主體逐位元組完全一致。
  此次略過會透過 `writeCompressionSkip(..., "excluded")` 記錄，以便在分析資料中查看。
- 預設值（清單為空／不存在）：與 #8034 之前的行為相同——不排除任何項目。

## 已知限制

- **LLMLingua-2 (SLM) 需要位於同一位置的選用相依套件。** Worker 只有在正式環境建置中，當 `@atjsh/llmlingua-2` 及其對等相依套件共同置於 `dist/node_modules` 時才會執行（請參閱 `scripts/build/colocateOptionals.mjs`、#4286）。若缺少這些套件，引擎會採用開放式失敗處理（回傳原始文字）。Worker 的解析已不再依賴 `import.meta.url`（它在獨立套件組合中無法運作），而是以執行階段的 cwd / `argv[1]` 為基準。
- **Caveman 語言套件 `de` / `fr` / `ja` 並不完整。** 它們隨附 `context` +
  `filler` + `structural` 規則，但不含 `dedup` / `ultra` 套件，因此對這些語言而言，`ultra` 強度
  並不會比 `full` 更強（它們只會使用各自的規則，不會在未告知的情況下
  回退至英文的 `dedup`/`ultra` 規則，否則可能會破壞外語文字）。
  `en` / `es` / `id` / `pt-BR` 是完整的。歡迎為這些不完整的套件貢獻 `dedup.json` + `ultra.json`。
- **堆疊式遙測僅列出實際執行壓縮的引擎。** 在堆疊式管線中，若某個步驟的
  引擎已執行但節省率為 0%，則會回傳 `stats:null`，因此不會出現在
  `engineBreakdown` 中——這與該步驟被略過的情況無法區分。若要區分
  「已執行，0%」與「已略過」，則需要變更明細模型，目前已延後處理。

## 驗證

此領域的重點檢查項目如下：

```bash
node --import tsx/esm --test tests/unit/compression/rtk-*.test.ts tests/unit/compression/pipeline-integration.test.ts tests/unit/compression/context-compression-api.test.ts
node --import tsx/esm --test tests/unit/compression/*.test.ts tests/golden-set/*.test.ts tests/integration/compression-pipeline.test.ts tests/unit/api/compression/compression-api.test.ts
node --import tsx/esm --test tests/unit/compression/mcpAccessibility*.test.ts
npm run typecheck:core
```
