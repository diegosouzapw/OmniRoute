# RTK Compression (中文 (繁體))

🌐 **Languages:** 🇺🇸 [English](../../../../compression/RTK_COMPRESSION.md) · 🇪🇹 [am](../../../am/docs/compression/RTK_COMPRESSION.md) · 🇸🇦 [ar](../../../ar/docs/compression/RTK_COMPRESSION.md) · 🇦🇿 [az](../../../az/docs/compression/RTK_COMPRESSION.md) · 🇧🇬 [bg](../../../bg/docs/compression/RTK_COMPRESSION.md) · 🇧🇩 [bn](../../../bn/docs/compression/RTK_COMPRESSION.md) · 🇨🇿 [cs](../../../cs/docs/compression/RTK_COMPRESSION.md) · 🇩🇰 [da](../../../da/docs/compression/RTK_COMPRESSION.md) · 🇩🇪 [de](../../../de/docs/compression/RTK_COMPRESSION.md) · 🇬🇷 [el](../../../el/docs/compression/RTK_COMPRESSION.md) · 🇪🇸 [es](../../../es/docs/compression/RTK_COMPRESSION.md) · 🇪🇪 [et](../../../et/docs/compression/RTK_COMPRESSION.md) · 🇮🇷 [fa](../../../fa/docs/compression/RTK_COMPRESSION.md) · 🇫🇮 [fi](../../../fi/docs/compression/RTK_COMPRESSION.md) · 🇫🇷 [fr](../../../fr/docs/compression/RTK_COMPRESSION.md) · 🇮🇪 [ga](../../../ga/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [gu](../../../gu/docs/compression/RTK_COMPRESSION.md) · 🇳🇬 [ha](../../../ha/docs/compression/RTK_COMPRESSION.md) · 🇮🇱 [he](../../../he/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [hi](../../../hi/docs/compression/RTK_COMPRESSION.md) · 🇭🇷 [hr](../../../hr/docs/compression/RTK_COMPRESSION.md) · 🇭🇺 [hu](../../../hu/docs/compression/RTK_COMPRESSION.md) · 🇦🇲 [hy](../../../hy/docs/compression/RTK_COMPRESSION.md) · 🇮🇩 [id](../../../id/docs/compression/RTK_COMPRESSION.md) · 🇳🇬 [ig](../../../ig/docs/compression/RTK_COMPRESSION.md) · 🇮🇹 [it](../../../it/docs/compression/RTK_COMPRESSION.md) · 🇯🇵 [ja](../../../ja/docs/compression/RTK_COMPRESSION.md) · 🇬🇪 [ka](../../../ka/docs/compression/RTK_COMPRESSION.md) · 🇰🇭 [km](../../../km/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [kn](../../../kn/docs/compression/RTK_COMPRESSION.md) · 🇰🇷 [ko](../../../ko/docs/compression/RTK_COMPRESSION.md) · 🇱🇹 [lt](../../../lt/docs/compression/RTK_COMPRESSION.md) · 🇱🇻 [lv](../../../lv/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [ml](../../../ml/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [mr](../../../mr/docs/compression/RTK_COMPRESSION.md) · 🇲🇾 [ms](../../../ms/docs/compression/RTK_COMPRESSION.md) · 🇲🇹 [mt](../../../mt/docs/compression/RTK_COMPRESSION.md) · 🇲🇲 [my](../../../my/docs/compression/RTK_COMPRESSION.md) · 🇳🇵 [ne](../../../ne/docs/compression/RTK_COMPRESSION.md) · 🇳🇱 [nl](../../../nl/docs/compression/RTK_COMPRESSION.md) · 🇳🇴 [no](../../../no/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [or](../../../or/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [pa](../../../pa/docs/compression/RTK_COMPRESSION.md) · 🇵🇭 [phi](../../../phi/docs/compression/RTK_COMPRESSION.md) · 🇵🇱 [pl](../../../pl/docs/compression/RTK_COMPRESSION.md) · 🇵🇹 [pt](../../../pt/docs/compression/RTK_COMPRESSION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/RTK_COMPRESSION.md) · 🇷🇴 [ro](../../../ro/docs/compression/RTK_COMPRESSION.md) · 🇷🇺 [ru](../../../ru/docs/compression/RTK_COMPRESSION.md) · 🇱🇰 [si](../../../si/docs/compression/RTK_COMPRESSION.md) · 🇸🇰 [sk](../../../sk/docs/compression/RTK_COMPRESSION.md) · 🇸🇮 [sl](../../../sl/docs/compression/RTK_COMPRESSION.md) · 🇷🇸 [sr](../../../sr/docs/compression/RTK_COMPRESSION.md) · 🇸🇪 [sv](../../../sv/docs/compression/RTK_COMPRESSION.md) · 🇰🇪 [sw](../../../sw/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [ta](../../../ta/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [te](../../../te/docs/compression/RTK_COMPRESSION.md) · 🇹🇭 [th](../../../th/docs/compression/RTK_COMPRESSION.md) · 🇹🇷 [tr](../../../tr/docs/compression/RTK_COMPRESSION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/RTK_COMPRESSION.md) · 🇵🇰 [ur](../../../ur/docs/compression/RTK_COMPRESSION.md) · 🇺🇿 [uz](../../../uz/docs/compression/RTK_COMPRESSION.md) · 🇻🇳 [vi](../../../vi/docs/compression/RTK_COMPRESSION.md) · 🇳🇬 [yo](../../../yo/docs/compression/RTK_COMPRESSION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/RTK_COMPRESSION.md)

---

RTK 壓縮是 OmniRoute 針對終端機與工具輸出、可感知命令的壓縮引擎。它專為程式設計代理工作階段而設計，因為其中大部分的上下文增長來自測試日誌、建置輸出、套件管理器雜訊、shell 逐字記錄、Docker 輸出、git 輸出及堆疊追蹤。

RTK 可以透過 `defaultMode: "rtk"` 直接執行，也可以作為堆疊管線的第一個步驟，通常為：

```txt
rtk -> caveman
```

此順序會先壓縮充滿雜訊的機器輸出，再讓 Caveman 精簡其餘文字。

上游 RTK 報告可節省 `60-90%` 的命令輸出。其 README 中的範例工作階段從約 `~118,000` 個標準權杖減少至約 `~23,900` 個 RTK 權杖，節省了 `79.7%`（約 `~80%`）。OmniRoute 使用該上游平均值，搭配 Caveman 輸入壓縮來計算堆疊節省量：

```txt
RTK 平均：      節省 80%
Caveman 輸入： 節省 46%
堆疊：          1 - (1 - 0.80) * (1 - 0.46) = 節省 89.2%
範圍：          1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

## 壓縮內容

內建目錄目前涵蓋以下類別，共提供 49 個篩選器：

| 類別      | 範例                                                          |
| --------- | ------------------------------------------------------------- |
| `git`     | `git status`、`git branch`、`git diff`、`git log`             |
| `test`    | Vitest、Jest、Pytest、Playwright、Go 測試、Cargo 測試         |
| `build`   | TypeScript、ESLint、Biome、Prettier、Vite、Webpack、Turbo、Nx |
| `package` | `npm install`、`npm audit`、`pip`、`uv sync`、Poetry、Bundler |
| `shell`   | `ls`、`find`、`grep`、一般 shell 日誌                         |
| `docker`  | `docker ps`、Docker 日誌                                      |
| `infra`   | Terraform、OpenTofu、`systemctl status`                       |
| `generic` | JSON 輸出、堆疊追蹤、一般輸出後備方案                         |

`open-sse/services/compression/engines/rtk/commandDetector.ts` 中的偵測器會在選擇篩選器之前對輸出進行分類。當命令類別不足以判斷時，篩選器也可以透過命令模式或輸出正規表示式進行比對。

## 篩選器解析

RTK 會依照以下順序載入篩選器：

1. 來自 `.rtk/filters.toml` 和 `.rtk/filters.json` 的專案篩選器，僅在受信任時載入。
2. 來自 `DATA_DIR/rtk/filters.toml` 和 `DATA_DIR/rtk/filters.json` 的全域篩選器。
3. 來自 `open-sse/services/compression/engines/rtk/filters/` 的內建篩選器。

在相同範圍內，RTK TOML schema v1 篩選器的優先順序高於 OmniRoute JSON 篩選器。TOML `match_command` 運算式會在命令類型比對之前檢查，因此匯入的命令特定篩選器可覆寫該範圍內更廣泛的篩選器。無論檔案格式為何，專案範圍的優先順序仍高於全域範圍。

專案篩選器刻意受到信任機制管控，因為正規表示式篩選器可以改變工具輸出呈現給代理的方式。符合以下任一條件時，專案篩選器檔案會被接受：

- `rtkConfig.trustProjectFilters` 為 `true`。
- 已設定 `OMNIROUTE_RTK_TRUST_PROJECT_FILTERS=1`。
- `.rtk/trust.json` 包含專案篩選器檔案相符的 SHA-256 雜湊值。

信任檔案範例：

```json
{
  "filtersSha256": "0123456789abcdef...",
  "filtersTomlSha256": "fedcba9876543210..."
}
```

雜湊值彼此獨立：`filtersSha256` 信任 `.rtk/filters.json`，而 `filtersTomlSha256` 信任 `.rtk/filters.toml`。編輯任一檔案只會使其本身的信任項目失效。全域檔案由管理員安裝，並沿用現有的全域篩選器信任行為。

自訂篩選器可以是單一篩選器物件或篩選器物件陣列。無效的自訂篩選器會被略過，並由 `/api/context/rtk/filters` 診斷功能回報。無效的內建篩選器則會立即失敗。

## RTK TOML schema v1 相容性

OmniRoute 可以使用 RTK TOML schema v1 剖析、驗證、測試及安裝宣告式篩選器檔案。
支援的欄位包括 `description`、`match_command`、`strip_ansi`、`filter_stderr`、
`strip_lines_matching`、`keep_lines_matching`、`replace`、`match_output`、`truncate_lines_at`、
`head_lines`、`tail_lines`、`max_lines`、`on_empty`，以及 `[[tests.<filter>]]` 內嵌測試。
未知欄位、無效或不安全的正規表示式、同時使用移除與保留規則、超過
1 MiB 的檔案，以及對未知篩選器的參照，都會被拒絕。內嵌測試失敗的檔案仍可進行
驗證以供檢查，但無法安裝或載入。自訂檔案載入失敗時仍採用
失敗開放（fail-open）方式：略過無效檔案，其餘篩選器會繼續運作。

OmniRoute 會在用戶端已擷取工具輸出後才收到該輸出，因此 `filter_stderr = true`
無法變更程序的擷取行為。此欄位會被接受但不執行任何操作，且驗證會傳回警告。
這刻意被描述為 **RTK TOML schema v1 相容性**，而不是與 RTK 執行檔、shell 掛鉤、
Rust 命令實作或其信任存放區配置完全相容。

儀表板的進階 RTK 檢視接受貼上或上傳的 TOML。驗證為唯讀操作。
安裝時會以限制性權限將內容不可分割地寫入 `DATA_DIR/rtk/filters.toml`，並重新整理
即時篩選器目錄，無需重新啟動。取代現有檔案需要明確確認 `overwrite`，
並會先建立 `DATA_DIR/rtk/filters.toml.bak`。

## 篩選器 DSL

篩選器使用 [壓縮規則格式](./COMPRESSION_RULES_FORMAT.md) 中所述的 JSON schema。
執行階段會依序套用下列階段：

```txt
stripAnsi -> filterStderr -> replace -> matchOutput -> 捨棄/包含行
  -> truncateLineAt -> head/tail/maxLines -> onEmpty
```

重要欄位：

| 欄位                         | 用途                                   |
| ---------------------------- | -------------------------------------- |
| `rules.stripAnsi`            | 在比對前移除終端機色彩／控制序列       |
| `rules.filterStderr`         | 在比對／篩選前正規化常見的 stderr 前綴 |
| `rules.replace`              | 依序套用正規表示式取代                 |
| `rules.matchOutput`          | 當輸出符合已知條件時傳回精簡摘要       |
| `rules.matchOutput[].unless` | 存在錯誤／失敗模式時略過捷徑           |
| `rules.dropPatterns`         | 移除干擾性行                           |
| `rules.includePatterns`      | 優先保留可採取行動的行                 |
| `rules.collapsePatterns`     | 收合重複的相符行                       |
| `rules.deduplicate`          | 各篩選器可選擇啟用：收合連續的重複行   |
| `rules.truncateLineAt`       | 以 Unicode 安全的方式逐行截斷          |
| `rules.onEmpty`              | 所有行都被篩除時顯示的備援訊息         |
| `tests[]`                    | 驗證閘門使用的內嵌範例                 |

內建篩選器應包含內嵌 `tests[]` 範例。自訂篩選器也應包含這些範例，
尤其是在跨專案共用時。

## 行去重（兩層）

RTK 會在兩個獨立層級合併重複行：

1. **各篩選器的 `deduplicate`（選用，預設為 `false`）。** 篩選器可設定 `rules.deduplicate: true`，
   以在截斷之前，合併_該篩選器所比對輸出內_連續的重複行。
   此處理在 `lineFilter.ts` 內執行。對於舊版篩選器，若篩選器定義了
   `collapsePatterns`，則會自動啟用此功能。結構描述：位於
   `open-sse/services/compression/engines/rtk/filterSchema.ts` 中的 `deduplicate: z.boolean().default(false)`。
2. **引擎全域的 `deduplicateThreshold`（預設為 `3`）。** 所有篩選器執行完畢後，引擎會合併
   整個結果中任何連續出現 `>= deduplicateThreshold` 次的相同行
   （`deduplicateRepeatedLines`，套用於 `engines/rtk/index.ts`）。正規化時，該值會限制在 2–100 之間。

各篩選器處理會先執行（在篩選器內），引擎全域處理則最後執行（針對合併後的
輸出），因此兩者可組合運作而不會重複計算。

## 行分組（`enableGrouping`）

當 `rtkConfig.enableGrouping` 為 `true`（預設為 `false`）時，RTK 會對去重後的結果額外執行一次 `groupSimilarLines`
處理，合併連續且_近似等價_（而非位元組完全相同）的行。`rtkConfig.groupingThreshold`（預設為 `3`）是觸發
分組的最小連續行數。這是 `deduplicateThreshold` 在結構層面的對應機制：去重處理完全相同的重複內容，
分組則處理「形態相同但有細微差異」的內容。這兩個旗標都屬於儲存在 `key_value` 資料表中的 `rtkConfig` JSON
（請參閱上方的「設定」），因此設定會在重新啟動後保留。

## 程式碼註解移除（`stripCodeComments` / `preserveDocstrings`）

啟用 `rtkConfig.applyToCodeBlocks` 時，RTK 也可以從有圍欄的程式碼區塊中移除註解：

- `stripCodeComments`（預設為 `false`）— 選用。設為 `true` 時，RTK 會移除 JavaScript
  與 TypeScript 有圍欄區塊中的註解。過去系統雖然會讀取此旗標，但從未實際套用，因此預設值仍為
  「保留」，以避免在正式環境中產生未告知的變更。
- `preserveDocstrings`（預設為 `true`）— 移除註解時，會保留 JSDoc/`/** … */` 區塊註解
  （它們所包含的 API 文件價值高於其占用的位元組成本）。設為 `false` 也會移除這些註解。

註解移除功能實作於 `open-sse/services/compression/engines/rtk/codeStripper.ts`。它使用
**TypeScript 解析器**（而非正規表示式），因此字串、範本與正規表示式常值絕不會被誤認為
註解；偵測到 JSX 時，則會完全中止處理（因此絕不會破壞 JSX 運算式容器中的註解）。
目前，註解移除僅適用於 **JavaScript 與 TypeScript** — 移除器的 `CodeLanguage` 集合中其他
語言（Python、Rust、Go、Ruby、Java）會執行空白行與空白字元合併，但不會移除註解。經移除處理的區塊執行會在
`rulesApplied` 中標記為 `rtk:code-strip`。

> **注意 — GCF／表格式編碼是另一個獨立引擎。** RTK **不**包含「GCF」
> （Graph Compact Format）表格式／欄式 JSON 編碼器。該編碼器取代了舊有的
> `omni-tabular` 編碼器，位於 **headroom** 引擎中
> （`open-sse/services/compression/engines/headroom/`，內附的編解碼器位於
> `headroom/gcf/`）。它與本文記載的 RTK 篩選器管線無關。

## 設定

全域設定可透過 `/api/settings/compression` 取得。RTK 專屬設定也可透過
`/api/context/rtk/config` 取得。

```json
{
  "defaultMode": "stacked",
  "autoTriggerMode": "stacked",
  "autoTriggerTokens": 32000,
  "stackedPipeline": [
    { "engine": "rtk", "intensity": "standard" },
    { "engine": "caveman", "intensity": "full" }
  ],
  "rtkConfig": {
    "enabled": true,
    "intensity": "standard",
    "applyToToolResults": true,
    "applyToCodeBlocks": false,
    "applyToAssistantMessages": false,
    "enabledFilters": [],
    "disabledFilters": [],
    "maxLinesPerResult": 120,
    "maxCharsPerResult": 12000,
    "deduplicateThreshold": 3,
    "customFiltersEnabled": true,
    "trustProjectFilters": false,
    "rawOutputRetention": "never",
    "rawOutputMaxBytes": 1048576,
    "enableGrouping": false,
    "groupingThreshold": 3,
    "stripCodeComments": false,
    "preserveDocstrings": true
  }
}
```

`enabledFilters` 和 `disabledFilters` 使用篩選器 ID，例如 `test-vitest` 或 `git-diff`。

完整的 `rtkConfig` 結構由
`open-sse/services/compression/types.ts` 中的 `RtkConfig` / `DEFAULT_RTK_CONFIG` 定義。整個物件會以單一 JSON 值持久化儲存在
SQLite 的 `key_value` 資料表中，其中 `namespace = "compression"`、`key = "rtkConfig"`
（`src/lib/db/compression.ts`），並在讀取時由 `normalizeRtkConfig` 正規化。因此，下列每個欄位
——包括 `enableGrouping`、`groupingThreshold`、`stripCodeComments` 和 `preserveDocstrings`——
都會透過相同的儲存區往返處理，並在重新啟動後保留。

| 鍵                     | 預設值  | 用途                                                             |
| ---------------------- | ------- | ---------------------------------------------------------------- |
| `deduplicateThreshold` | `3`     | 整個引擎：要折疊的最少連續相同行數（限制為 2–100）               |
| `enableGrouping`       | `false` | 選擇啟用：折疊連續且近似等同的行                                 |
| `groupingThreshold`    | `3`     | 觸發分組所需的最少連續相似行數                                   |
| `stripCodeComments`    | `false` | 選擇啟用：移除圍欄程式碼區塊中的註解（需要 `applyToCodeBlocks`） |
| `preserveDocstrings`   | `true`  | 移除註解時，保留 JSDoc/`/** … */` 區塊                           |

## API

| 路由                               | 方法 | 用途                               |
| ---------------------------------- | ---- | ---------------------------------- |
| `/api/context/rtk/config`          | GET  | 讀取 RTK 設定                      |
| `/api/context/rtk/config`          | PUT  | 更新 RTK 設定                      |
| `/api/context/rtk/filters`         | GET  | 列出篩選器目錄與載入診斷資訊       |
| `/api/context/rtk/import`          | POST | 驗證或安裝 RTK TOML schema v1 檔案 |
| `/api/context/rtk/test`            | POST | 預覽一個文字酬載的 RTK 壓縮結果    |
| `/api/context/rtk/raw-output/[id]` | GET  | 讀取已保留且經過遮蔽處理的原始輸出 |
| `/api/compression/preview`         | POST | 預覽任意壓縮模式                   |

RTK 測試酬載：

```json
{
  "command": "npm test",
  "text": "FAIL tests/example.test.ts\nAssertionError: expected true\nTest Files 1 failed",
  "config": {
    "intensity": "standard"
  }
}
```

壓縮預覽酬載：

```json
{
  "mode": "stacked",
  "messages": [
    {
      "role": "tool",
      "content": "FAIL tests/example.test.ts\nAssertionError: expected true\nTest Files 1 failed"
    }
  ],
  "config": {
    "rtkConfig": {
      "rawOutputRetention": "failures"
    }
  }
}
```

管理路由需要儀表板管理驗證或相符的 API 金鑰原則。

RTK TOML 驗證酬載：

```json
{
  "action": "validate",
  "content": "schema_version = 1\n\n[filters.my-tool]\nmatch_command = \"^my-tool\\\\b\"\nmax_lines = 20\n"
}
```

使用 `"action": "install"` 來全域安裝已驗證的檔案。只有在檢閱並確認要取代現有的全域檔案後，
才加入 `"overwrite": true`。

## 原始輸出復原

RTK 通常僅傳回壓縮後的文字。為了偵錯，`rawOutputRetention` 可保留經過遮蔽處理的原始輸出：

| 值         | 行為                                        |
| ---------- | ------------------------------------------- |
| `never`    | 不保留原始輸出                              |
| `failures` | 僅保留可能發生失敗的輸出                    |
| `always`   | 經過遮蔽處理後，保留每一筆 RTK 壓縮原始輸出 |

保留的檔案會寫入：

```txt
DATA_DIR/rtk/raw-output/
```

機密資訊會在持久化前進行遮蔽，包括常見的 bearer 權杖、API 金鑰、Slack 權杖、AWS 存取金鑰，以及賦值形式的 `token=...`、`secret=...`、`password=...` 值。分析資料僅儲存指標 ID、大小及雜湊中繼資料。

## 驗證關卡

重點驗證關卡會執行內建的行內篩選器測試，而不呼叫外部 shell 命令：

```bash
node --import tsx/esm --test tests/unit/compression/rtk-verify.test.ts
```

較完整的 RTK 關卡為：

```bash
node --import tsx/esm --test \
  tests/unit/compression/rtk-*.test.ts \
  tests/unit/compression/pipeline-integration.test.ts \
  tests/unit/compression/context-compression-api.test.ts
```

發布前請執行完整的壓縮關卡：

```bash
node --import tsx/esm --test \
  tests/unit/compression/*.test.ts \
  tests/golden-set/*.test.ts \
  tests/integration/compression-pipeline.test.ts \
  tests/unit/api/compression/compression-api.test.ts
```

## 擴充 RTK

1. 新增或更新篩選器 JSON 檔案。
2. 至少加入一個可證明重要行為的 `tests[]` 範例。
3. 針對新的命令系列，在 `tests/unit/compression/fixtures/rtk/` 下新增 fixture。
4. 引入新的輸出類別時，新增命令偵測涵蓋範圍。
5. 執行驗證關卡與完整 RTK 關卡。
6. 如果篩選器是專案本機專用，請提交 `.rtk/filters.json`，並僅在審查後更新 `.rtk/trust.json`。

---

## 強度等級 (v3.8.16+)

RTK 支援 **3 個強度等級**，用於在**壓縮積極程度**與**安全性**之間取捨。此等級透過引擎設定中的 `config.intensity` 設定。

### 3 個等級

| 等級                 | 截斷閾值       | Token 節省量 | 風險 | 最適合                         |
| -------------------- | -------------- | ------------ | ---- | ------------------------------ |
| `minimal`            | 每個區段 24 行 | ~20-40%      | 極低 | 需要保留關鍵上下文的正式環境   |
| `standard`（預設值） | 每個區段 24 行 | ~50-70%      | 低   | 日常程式設計工作階段           |
| `aggressive`         | 每個區段 16 行 | ~70-90%      | 中等 | 長時間工作階段、追求最大節省量 |

### 截斷發生的位置

截斷閾值會影響 `lineFilter.ts`：

```ts
// 來源：open-sse/services/compression/engines/rtk/index.ts:329-330
config.intensity === "aggressive" ? 16 : 24,
config.intensity === "aggressive" ? 16 : 24,
```

每個區段的**開頭**與**結尾**都會保留；觸發截斷時，中間內容會被捨棄。

### 保留與刪減的內容

| 內容                 | minimal | standard | aggressive |
| -------------------- | ------- | -------- | ---------- |
| 錯誤／堆疊追蹤       | ✅ 保留 | ✅ 保留  | ✅ 保留    |
| 測試失敗             | ✅ 保留 | ✅ 保留  | ✅ 保留    |
| 建置錯誤             | ✅ 保留 | ✅ 保留  | ✅ 保留    |
| 測試通過（詳細輸出） | ✅ 保留 | 🟡 摺疊  | 🟡 摺疊    |
| 例行輸出（資訊日誌） | 🟡 摺疊 | 🟡 摺疊  | ❌ 捨棄    |
| 進度列               | 🟡 摺疊 | ❌ 捨棄  | ❌ 捨棄    |
| 橫幅／ASCII 圖案     | 🟡 摺疊 | ❌ 捨棄  | ❌ 捨棄    |

### 選擇適當的強度

```
                  遺失上下文是否會造成災難性後果？
                  │
      ┌───────────┼───────────┐
      │           │           │
     是           否         不確定
      │           │           │
      ▼           │           │
   minimal        │           │
      │           │           │
      │           ▼           ▼
      │      輸送量有多      請先嘗試 `standard`
      │      關鍵？          （適用於 80% 的
      │           │          情況）
      │      ┌────┴────┐
      │      │         │
      │      低        高
      │      │         │
      │      ▼         ▼
      │   standard   aggressive
      │      │         │
      └──────┴─────────┘
```

### 設定強度

**個別組合**（在組合設定中）：

```json
{
  "combo": "my-coding-combo",
  "routing": {/* ... */},
  "compression": {
    "engine": "rtk",
    "intensity": "aggressive"
  }
}
```

**以程式方式設定**：

`rtkEngine`（`@omniroute/open-sse/services/compression/engines/rtk`）是一個
`CompressionEngine`，且沒有 `updateConfig` 方法。請改為透過登錄輔助函式更新引擎設定：

```ts
import { updateEngineConfig } from "@omniroute/open-sse/services/compression/engines/registry";

updateEngineConfig("rtk", { intensity: "aggressive" });
```

### 驗證效果

使用**驗證關卡**（請參閱下方）確認篩選器在所選強度下是安全的：

```ts
import { runRtkFilterTests } from "omniroute/compression/engines/rtk/verify";

const result = runRtkFilterTests({ intensity: "aggressive" });
if (!result.passed) {
  console.error("篩選器在 aggressive 強度下失敗");
}
```

---

## 自訂篩選器開發 (v3.8.16+)

`engines/rtk/filters/` 目錄包含 **49+ 個內建篩選器 JSON 檔案**。您可以新增自己的篩選器，以壓縮預設篩選器未涵蓋之自訂工具的輸出。

### 篩選器結構描述 (Zod)

```ts
{
  "id": "string",                      // 必填。篩選器識別碼（kebab-case，例如 "python-traceback"）
  "label": "string",                   // 必填。人類可讀的篩選器名稱
  "description": "string",             // 選填（預設值："")。篩選器功能的簡短說明
  "category": "git|test|build|shell|docker|package|infra|cloud|generic",
  "priority": number,                  // 選填（0-100，預設值：50）。執行順序（數值越高越先執行）
  "match": {
    "commands": ["string"],            // 要比對的命令名稱（例如 "python"、"pytest"）
    "patterns": ["string"],            // 用來比對輸出的正規表示式模式
    "outputTypes": ["string"]          // 偵測到的輸出類別（例如 "test-failure"）
  },
  "rules": {
    "stripAnsi": boolean,              // 選填（預設值：false）。移除 ANSI 色彩代碼
    "replace": [                       // 尋找及取代規則（預設值：[]）
      { "pattern": "regex", "replacement": "..." }
    ],
    "matchOutput": [                   // 模式符合時短路處理（預設值：[]）
      {
        "pattern": "regex",
        "message": "short summary",
        "unless": "regex"              // 若此模式符合則略過
      }
    ],
    "includePatterns": ["string"],     // 要保留的行（正規表示式模式，預設值：[]）
    "dropPatterns": ["string"],        // 要捨棄的行（正規表示式模式，預設值：[]）
    "collapsePatterns": ["string"],    // 要摺疊為單次出現的行（預設值：[]）
    "deduplicate": boolean,            // 選填（預設值：false）。移除重複行
    "truncateLineAt": number,          // 選填（預設值：0）。將行截斷至最大字元數
    "maxLines": number,                // 選填（預設值：0）。總行數的硬性上限
    "headLines": number,               // 選填（預設值：20）。保留符合輸出的前 N 行
    "tailLines": number,               // 選填（預設值：20）。保留符合輸出的最後 N 行
    "onEmpty": "string",               // 選填（預設值："")。所有行均被篩除時的備用訊息
    "filterStderr": boolean            // 選填（預設值：false）。同時篩選 stderr 輸出
  },
  "preserve": {
    "errorPatterns": ["string"],       // 必須一律保留的模式（預設值：[]）
    "summaryPatterns": ["string"]      // 最終摘要行的模式（預設值：[]）
  },
  "tests": [                           // 用於驗證的內嵌測試（預設值：[]）
    {
      "name": "string",               // 必填。測試名稱
      "input": "sample output",        // 必填。範例輸入文字
      "expected": "expected output",   // 必填。預期的壓縮輸出
      "command": "optional command"    // 選填。命令情境
    }
  ]
}
```

### 範例：Python Traceback 篩選器

```json
{
  "id": "python-traceback",
  "label": "Python Traceback Filter",
  "description": "Compresses Python tracebacks to essential file/line locations and error type",
  "category": "test",
  "priority": 60,
  "match": {
    "commands": ["python", "python3", "pytest", "uv", "poetry"],
    "patterns": ["Traceback \\(most recent call last\\)", "Error", "Exception"],
    "outputTypes": ["error-traceback"]
  },
  "rules": {
    "stripAnsi": true,
    "includePatterns": [
      "Traceback \\(most recent call last\\)",
      "^\\s*File \".+\", line \\d+",
      "^\\s*[A-Z][a-zA-Z]+Error:",
      "^\\s*[A-Z][a-zA-Z]+Exception"
    ],
    "dropPatterns": ["site-packages/", "^\\s+[a-z_]+\\([^)]*\\)$"],
    "headLines": 5,
    "tailLines": 3,
    "maxLines": 25,
    "filterStderr": true
  },
  "preserve": {
    "errorPatterns": ["Error:", "Exception:", "Traceback"],
    "summaryPatterns": ["^[A-Z][a-zA-Z]+(?:Error|Exception):"]
  },
  "tests": [
    {
      "name": "preserves-error-type-and-location",
      "input": "Traceback (most recent call last):\n  File \"app.py\", line 42, in main\n    do_thing()\n  File \"lib/utils.py\", line 17, in helper\n    return 1 / 0\nZeroDivisionError: division by zero",
      "expected": "Traceback (most recent call last):\n  File \"app.py\", line 42, in main\n  File \"lib/utils.py\", line 17, in helper\nZeroDivisionError: division by zero",
      "command": "python app.py"
    }
  ]
}
```

### 載入自訂篩選器

將檔案放置於可辨識的位置：

```
~/.omniroute/rtk/filters/my-filter.json     # 使用者層級
<project>/.rtk/filters/my-filter.json      # 專案層級
```

篩選器會在啟動時，透過 `open-sse/services/compression/engines/rtk/filterLoader.ts` 中的 `loadRtkFilters()` 自動載入。載入器會從下列位置尋找篩選器：

- 內建目錄：`open-sse/services/compression/engines/rtk/filters/`
- 使用者目錄：`~/.omniroute/rtk/filters/`
- 專案目錄：`<project>/.rtk/filters/`

若要以程式設計方式載入篩選器：

```ts
import { loadRtkFilters } from "@omniroute/open-sse/services/compression/engines/rtk/filterLoader";

// 選項：customFiltersEnabled（載入使用者／專案篩選器，預設開啟）、
// trustProjectFilters、refresh。
const filters = loadRtkFilters({ customFiltersEnabled: true });
```

### 驗證

篩選器在載入時會依據 Zod 結構描述進行驗證。結構不正確的篩選器將無法載入，並記錄錯誤：

```
RTK_FILTER_LOADER: filter "my-filter" failed validation:
  - rules.replace.0.pattern: Invalid regex
  - match.commands: must not be empty
```

若要驗證所有已安裝的篩選器，請呼叫由 `open-sse/services/compression/engines/rtk/verify.ts` 匯出的 `runRtkFilterTests()`。

### 最佳實務

1. **一律包含 `tests[]`** — 它們能證明你的篩選器有效，並防止迴歸問題
2. **使用 `matchOutput` 處理短路情況** — 如果單一行就能說明重點，請取代整個區塊
3. **優先使用 `keep`，而非 `strip`** — 明確的「一律保留」規則比「一律移除」更安全
4. **測試所有 3 種強度等級** — `minimal` 應不執行任何操作，`aggressive` 仍應保留錯誤
5. **使用 `unless` 欄位** — 以「如果存在 X 就不要觸發」來防護短路條件

---

## 原始輸出復原與驗證閘門

當 RTK 大幅壓縮輸出時，您可以**復原原始文字**，以進行偵錯、稽核或重播。

### 原始輸出復原的運作方式

```
原始輸出（10K tokens）
        │
        ▼
RTK 壓縮（rawOutput.enabled=true）
        │
        ├─▶ 壓縮後的輸出（2K tokens）  ──▶ 傳送至 LLM
        │
        └─▶ 原始輸出（10K tokens）     ──▶ 儲存於 DB
                                                  （透過 request_id 關聯）
```

### 啟用原始輸出儲存

**針對單一請求**（在組合設定中）：

```json
{
  "compression": {
    "engine": "rtk",
    "intensity": "aggressive",
    "rawOutput": {
      "enabled": true,
      "maxBytes": 1048576 // 上限為 1MB
    }
  }
}
```

**預設值**：`rawOutput.enabled: false`（節省儲存空間）。

### 儲存成本

| 每個請求         | 上限 1MB    | 上限 10MB    |
| ---------------- | ----------- | ------------ |
| 平均壓縮後輸出   | ~5KB        | ~5KB         |
| 儲存的原始輸出   | ~50-500KB   | ~500KB-5MB   |
| 每日 1000 個請求 | 50-500MB/日 | 500MB-5GB/日 |

> **建議**：只在**偵錯工作階段**或**抽樣稽核**時啟用原始輸出，請勿持續啟用。

### 復原原始內容

```ts
import { readRtkRawOutput } from "omniroute/compression/engines/rtk/rawOutput";

const raw = readRtkRawOutput(pointerId); // pointerId 來自壓縮統計資料
if (raw) {
  console.log("Original output:", raw);
}
```

壓縮後，`pointerId` 會回傳於 `CompressionStats.rtkRawOutputPointers[]` 中。
函式簽章請參閱 `open-sse/services/compression/engines/rtk/rawOutput.ts:102`。

### 驗證閘門

**RTK 篩選器驗證**（`open-sse/services/compression/engines/rtk/verify.ts`）會根據各篩選器的 `tests[]` 驗證所有篩選器，並確保其在全部 3 種強度等級下的行為皆正確。

**呼叫 `runRtkFilterTests()`** 以執行驗證：

```ts
import { runRtkFilterTests } from "open-sse/services/compression/engines/rtk/verify";

const result = runRtkFilterTests();
console.log(`Passed: ${result.outcomes.filter((o) => o.passed).length}`);
console.log(`Failed: ${result.outcomes.filter((o) => !o.passed).length}`);
if (!result.passed) {
  console.error("Filters failed verification");
  result.outcomes
    .filter((o) => !o.passed)
    .forEach((o) => {
      console.error(
        `  - ${o.filterId} / ${o.testName}: expected "${o.expected}", got "${o.actual}"`
      );
    });
}
```

**驗證內容**：

1. 每個篩選器皆可載入並通過結構描述驗證
2. 每個 `tests[]` 項目皆會產生預期輸出
3. `minimal` 強度不會執行任何操作（保留原始內容，僅套用結構性篩選器）
4. `aggressive` 強度會保留錯誤、測試失敗資訊與堆疊追蹤
5. 壓縮後的輸出絕不會大於原始輸入

- 原始碼：`open-sse/services/compression/engines/rtk/`（63 個檔案，約 70KB）

- **合併篩選器變更之前** — 一律確認測試通過
- **升級 RTK 引擎之後** — 結構描述可能已變更
- **定期監控時** — 防止測試固定資料發生偏移
- **新增工具／命令系列時** — 證明新篩選器能正常運作

---

## 另請參閱

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — 完整的壓縮管線概覽
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — 引擎登錄檔與內建引擎
- [EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md) — 自訂引擎、語言套件、堆疊式管線
- 原始碼：`open-sse/services/compression/engines/rtk/`（63 個檔案，約 70KB）
