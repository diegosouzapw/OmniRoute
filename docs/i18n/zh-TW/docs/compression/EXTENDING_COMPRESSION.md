# Extending the Compression Pipeline (中文 (繁體))

🌐 **Languages:** 🇺🇸 [English](../../../../compression/EXTENDING_COMPRESSION.md) · 🇪🇹 [am](../../../am/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇦 [ar](../../../ar/docs/compression/EXTENDING_COMPRESSION.md) · 🇦🇿 [az](../../../az/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇬 [bg](../../../bg/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇩 [bn](../../../bn/docs/compression/EXTENDING_COMPRESSION.md) · 🇨🇿 [cs](../../../cs/docs/compression/EXTENDING_COMPRESSION.md) · 🇩🇰 [da](../../../da/docs/compression/EXTENDING_COMPRESSION.md) · 🇩🇪 [de](../../../de/docs/compression/EXTENDING_COMPRESSION.md) · 🇬🇷 [el](../../../el/docs/compression/EXTENDING_COMPRESSION.md) · 🇪🇸 [es](../../../es/docs/compression/EXTENDING_COMPRESSION.md) · 🇪🇪 [et](../../../et/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇷 [fa](../../../fa/docs/compression/EXTENDING_COMPRESSION.md) · 🇫🇮 [fi](../../../fi/docs/compression/EXTENDING_COMPRESSION.md) · 🇫🇷 [fr](../../../fr/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇪 [ga](../../../ga/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [gu](../../../gu/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [ha](../../../ha/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇱 [he](../../../he/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [hi](../../../hi/docs/compression/EXTENDING_COMPRESSION.md) · 🇭🇷 [hr](../../../hr/docs/compression/EXTENDING_COMPRESSION.md) · 🇭🇺 [hu](../../../hu/docs/compression/EXTENDING_COMPRESSION.md) · 🇦🇲 [hy](../../../hy/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇩 [id](../../../id/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [ig](../../../ig/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇹 [it](../../../it/docs/compression/EXTENDING_COMPRESSION.md) · 🇯🇵 [ja](../../../ja/docs/compression/EXTENDING_COMPRESSION.md) · 🇬🇪 [ka](../../../ka/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇭 [km](../../../km/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [kn](../../../kn/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇷 [ko](../../../ko/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇹 [lt](../../../lt/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇻 [lv](../../../lv/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [ml](../../../ml/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [mr](../../../mr/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇾 [ms](../../../ms/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇹 [mt](../../../mt/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇲 [my](../../../my/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇵 [ne](../../../ne/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇱 [nl](../../../nl/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇴 [no](../../../no/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [or](../../../or/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [pa](../../../pa/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇭 [phi](../../../phi/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇱 [pl](../../../pl/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇹 [pt](../../../pt/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇴 [ro](../../../ro/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇺 [ru](../../../ru/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇰 [si](../../../si/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇰 [sk](../../../sk/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇮 [sl](../../../sl/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇸 [sr](../../../sr/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇪 [sv](../../../sv/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇪 [sw](../../../sw/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [ta](../../../ta/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [te](../../../te/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇭 [th](../../../th/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇷 [tr](../../../tr/docs/compression/EXTENDING_COMPRESSION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇰 [ur](../../../ur/docs/compression/EXTENDING_COMPRESSION.md) · 🇺🇿 [uz](../../../uz/docs/compression/EXTENDING_COMPRESSION.md) · 🇻🇳 [vi](../../../vi/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [yo](../../../yo/docs/compression/EXTENDING_COMPRESSION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/EXTENDING_COMPRESSION.md)

---

> **TL;DR**：OmniRoute 的壓縮引擎是**可插拔的**——你可以註冊自訂引擎、為新語言提供語言套件，並組合堆疊式管線。本指南將說明如何操作。

**相關指南：**

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — 完整管線概覽
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — 引擎登錄檔與內建引擎
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — RTK 引擎與自訂篩選器
- [COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md) — 規則套件格式參考

---

## 概覽

壓縮系統有 **3 個擴充點**：

| 擴充點         | 使用案例                                       | 難度 |
| -------------- | ---------------------------------------------- | ---- |
| **自訂引擎**   | 新增全新的壓縮演算法（例如特定領域的摘要器）   | 進階 |
| **語言套件**   | 新增對新自然語言的支援（例如印地語、阿拉伯語） | 中等 |
| **堆疊式管線** | 依自訂順序組合現有引擎                         | 初階 |

```
┌─────────────────────────────────────────────────────────────┐
│                         壓縮策略                            │
│                                                              │
│   輸入訊息 ──▶ getEffectiveMode() ──▶ 模式                  │
│                                              │               │
│                      ┌───────────────────────┼──────────┐    │
│                      │         │         │         │    │    │
│                      ▼         ▼         ▼         ▼    │    │
│                   "rtk"    "lite"   "standard" "stacked"    │
│                      │         │         │         │    │    │
│                      ▼         ▼         ▼         ▼    │    │
│                   RTK       Lite     Caveman   engines[]   │
│                   引擎      引擎      引擎      串接       │
│                      │         │         │         │    │    │
│                      └─────────┴─────────┴─────────┘    │    │
│                                      │                    │
│                                      ▼                    │
│                                 壓縮輸出                   │
└─────────────────────────────────────────────────────────────┘

策略選擇器以模式為基礎：每個請求會選擇一種模式
（rtk / lite / standard / aggressive / ultra / stacked / off）。
只有 "stacked" 模式會依序串接多個引擎。
預設的自動觸發模式是 "lite"（而非三層優先順序鏈）。
```

---

## 撰寫自訂壓縮引擎

引擎介面（`open-sse/services/compression/engines/types.ts`）是每個引擎都必須遵循的合約。它包含 5 個必要方法。

### `CompressionEngine` 介面

```ts
interface CompressionEngine {
  id: string; // 唯一引擎 ID
  name: string; // 顯示名稱
  description: string; // 簡短描述
  icon: string; // 圖示（表情符號或 URL）
  targets: CompressionEngineTarget[]; // ["messages", "tool_results", "code_blocks"]
  stackable: boolean; // 是否可用於堆疊式管線
  stackPriority: number; // 堆疊式管線中的順序（數值越小越早執行）
  metadata: CompressionEngineMetadata;

  apply(body, options?): CompressionResult;
  compress(body, config?): CompressionResult;
  getConfigSchema(): EngineConfigField[];
  validateConfig(config): EngineValidationResult;
}
```

### 最小範例：空白字元引擎

最簡單的引擎——移除訊息中多餘的空白字元。

````ts
import type { CompressionEngine } from "omniroute/compression/engines/types";
import { registerCompressionEngine } from "omniroute/compression/engines/registry";

function preserveCodeBlocks(text: string): string {
  // 依程式碼區塊標記分割，並保留其中的空白
  const parts = text.split(/(```[\s\S]*?```)/);
  return parts
    .map((part) => {
      if (part.startsWith("```")) {
        return part; // 不要修改程式碼區塊
      }
      return part.replace(/\n{3,}/g, "\n\n"); // 僅套用於一般文字
    })
    .join("");
}

const whitespaceEngine: CompressionEngine = {
  id: "whitespace",
  name: "Whitespace Stripper",
  description: "Removes extra whitespace and blank lines",
  icon: "📝",
  targets: ["messages", "tool_results"],
  stackable: true,
  stackPriority: 100, // 在 caveman/rtk 之後執行

  metadata: {
    id: "whitespace",
    name: "Whitespace Stripper",
    description: "Removes extra whitespace and blank lines",
    inputScope: "messages",
    targetLatencyMs: 5,
    supportsPreview: true,
    stable: true,
  },

  apply(body, options) {
    return this.compress(body, options?.config);
  },

  compress(body, config = {}) {
    let originalLength = 0;
    let compressedLength = 0;

    // 走訪訊息陣列——同時處理字串與多部分內容
    const compressedBody = (body.messages || []).map((msg) => {
      if (typeof msg.content === "string") {
        originalLength += msg.content.length;
        let compressed = msg.content
          .replace(/[ \t]+/g, " ")
          .replace(/\n{3,}/g, "\n\n")
          .replace(/^\s+|\s+$/gm, "");
        compressedLength += compressed.length;
        return { ...msg, content: compressed };
      }
      // 多部分內容：走訪各部分，僅壓縮文字部分
      if (Array.isArray(msg.content)) {
        const newParts = msg.content.map((part) => {
          if (part.type === "text" && typeof part.text === "string") {
            originalLength += part.text.length;
            let compressed = part.text
              .replace(/[ \t]+/g, " ")
              .replace(/\n{3,}/g, "\n\n")
              .replace(/^\s+|\s+$/gm, "");
            compressedLength += compressed.length;
            return { ...part, text: compressed };
          }
          return part; // 保留 image_url、tool_use 等
        });
        return { ...msg, content: newParts };
      }
      return msg;
    });

    return {
      body: { ...body, messages: compressedBody },
      stats: {
        originalTokens: Math.ceil(originalLength / 4),
        compressedTokens: Math.ceil(compressedLength / 4),
        savingsPercent: originalLength > 0 ? 100 * (1 - compressedLength / originalLength) : 0,
        techniques: ["whitespace-collapse"],
        engineId: "whitespace",
      },
    };
  },

  getConfigSchema() {
    return [
      {
        key: "preserveCodeBlocks",
        type: "boolean",
        label: "Preserve code blocks",
        defaultValue: true,
        description: "Don't touch whitespace inside ```code``` blocks",
      },
    ];
  },

  validateConfig(config) {
    if (config.preserveCodeBlocks !== undefined && typeof config.preserveCodeBlocks !== "boolean") {
      return { valid: false, errors: ["preserveCodeBlocks must be a boolean"] };
    }
    return { valid: true, errors: [] };
  },
};

// 全域註冊
registerCompressionEngine(whitespaceEngine);
````

### 自訂引擎的放置位置

```
~/.omniroute/compression/engines/my-engine.ts    # 使用者層級
<project>/compression-engines/my-engine.ts        # 專案層級（啟動時載入）
```

或從外掛以程式設計方式載入：

```ts
// 在您的外掛中
import {
  registerCompressionEngine,
  unregisterCompressionEngine,
} from "@omniroute/open-sse/services/compression/engines/registry";
import { myEngine } from "./engines/my-engine";

export default definePlugin({
  name: "my-compression-plugin",
  // 外掛 SDK 提供 onRequest / onResponse / onError 掛鉤。在外掛模組
  // 載入時（或第一次 onRequest 時）註冊引擎；並從您自己的拆卸流程中
  // 取消註冊。
  onRequest: async (ctx) => {
    registerCompressionEngine(myEngine);
  },
});

// 拆卸時：
// unregisterCompressionEngine("my-engine");
```

### 測試您的引擎

在外掛或啟動函式中註冊您的引擎。註冊後，即可透過其 `id` 在策略選擇器中使用該引擎。請將其組合至堆疊管線中，以測試整合：

---

## 建立語言套件

穴居人風格壓縮使用**特定語言的規則套件**，以處理各種自然語言中的填充詞、模糊措辭及冗長表達模式。OmniRoute 隨附 **6 個語言套件**：`en`、`es`、`fr`、`de`、`ja`、`pt-BR`。

### 套件結構

語言套件是位於 `open-sse/services/compression/rules/<language>/` 下、包含 **JSON 檔案**的目錄：

```
open-sse/services/compression/rules/
├── en/
│   ├── filler.json          # 寒暄語、模糊措辭、禮貌用語
│   ├── context.json         # 縮減上下文的規則
│   ├── dedup.json           # 去重規則
│   ├── structural.json      # 標點符號、格式設定
│   └── ultra.json           # 積極壓縮規則
├── es/  （相同結構）
├── fr/  （相同結構）
├── de/  （相同結構）
├── ja/  （相同結構）
└── pt-BR/ （相同結構）
```

### 規則結構

每個規則都具有以下結構（取自 `open-sse/services/compression/ruleLoader.ts`）：

```ts
interface FileRule {
  name: string; // 人類可讀的名稱（kebab-case）
  pattern: string; // JavaScript 正規表示式模式
  replacement?: string; // 要用來取代相符內容的文字
  replacementMap?: Record<string, string>; // 或鍵→取代文字的對應表
  flags?: string; // 正規表示式旗標（通常為 "gi"）
  context?: "all" | "user" | "system" | "assistant";
  category?: "filler" | "context" | "structural" | "dedup" | "terse" | "ultra";
  minIntensity?: "lite" | "full" | "ultra"; // 低於此強度時略過
  description?: string; // 文件說明
}
```

### 範例：新增印地語填充詞規則

```json
{
  "language": "hi",
  "category": "filler",
  "rules": [
    {
      "name": "polite_opener",
      "pattern": "\\b(?:नमस्ते|नमस्कार|आदरणीय)\\b[,!\\s]*",
      "replacement": "",
      "context": "all",
      "category": "filler",
      "minIntensity": "lite",
      "description": "移除類似「नमस्ते」的禮貌開場白"
    },
    {
      "name": "filler_actually",
      "pattern": "\\b(?:असल में|वास्तव में|दरअसल)\\b\\s*",
      "replacement": "",
      "context": "all",
      "category": "filler",
      "minIntensity": "lite",
      "description": "移除表示「其實」的填充詞"
    },
    {
      "name": "verbose_plea",
      "pattern": "\\b(?:कृपया|कृपया आप|अनुरोध है कि आप)\\b\\s*",
      "replacement": "",
      "context": "all",
      "category": "filler",
      "minIntensity": "full",
      "description": "移除印地語中的「請」"
    }
  ]
}
```

### 驗證

載入時，規則套件會根據 `_schema.json` 進行驗證。結構錯誤的套件將無法載入，並記錄錯誤：

```
RULE_LOADER：套件 "hi/filler.json" 驗證失敗：
  - rules.0.pattern：無效的正規表示式
  - rules.1.context：必須是 [all, user, system, assistant] 之一
```

載入套件時會自動根據 `_schema.json` 執行驗證；無效的套件會被拒絕，並記錄上述錯誤。沒有用於驗證套件的獨立 `npm run` 指令碼——請載入套件（例如啟動伺服器或執行壓縮流程），然後查看日誌。

### 載入自訂語言套件

```ts
import { loadRulePack } from "omniroute/compression/ruleLoader";

await loadRulePack("./my-custom-rules/hi/filler.json");
```

或者將其放入可辨識的位置：

```
~/.omniroute/compression/rules/hi/filler.json  # 使用者層級
<project>/.compression/rules/hi/filler.json   # 專案層級
```

### 語言套件的最佳實務

1. **從 `filler` 開始**——這些規則的影響最大
2. **使用 `minIntensity`** 限制積極壓縮規則——可防止過度壓縮
3. **包含測試案例**——在 JSON 中新增 `tests[]` 陣列以驗證行為
4. **順序很重要**——較前面的規則會先套用；將影響較大的規則放在前面
5. **保守使用 `replacement`**——空字串通常是正確選擇；絕不要引入新內容

### 翻譯策略

將規則套件本地化為新語言時：

1. **翻譯規則名稱**——它們會出現在偵錯輸出中
2. **調整正規表示式模式**——直接翻譯通常無法運作（詞彙邊界有所不同）
3. **使用真實對話進行測試**——套件套用於實際輸入時應保持安全
4. **配合文化慣例**——例如，日語套件中的敬語填充詞比英語更多

---

## 堆疊式管線

**堆疊式管線**會依序執行多個引擎，並將每個引擎的輸出傳入下一個引擎。這就是 `mode: stacked` 的內部運作方式。

### 堆疊的運作方式

```
輸入（10,000 個權杖）
        │
        ▼
   ┌──────────┐
   │  引擎    │  優先順序 10
   │  A       │  ──▶ 輸出：6,000 個權杖（-40%）
   └────┬─────┘
        ▼
   ┌──────────┐
   │  引擎    │  優先順序 50
   │  B       │  ──▶ 輸出：2,400 個權杖（-60%）
   └────┬─────┘
        ▼
   ┌──────────┐
   │  引擎    │  優先順序 100
   │  C       │  ──▶ 輸出：1,200 個權杖（-80%）
   └────┬─────┘
        │
        ▼
最終輸出（1,200 個權杖，合計節省約 88%）
```

選取 `mode: "stacked"` 時，引擎會依照 `pipeline` 陣列中指定的順序依序執行。
引擎 N 的輸出會成為引擎 N+1 的輸入。

### 壓縮模式

OmniRoute 會根據設定、自動觸發閾值和組合覆寫，為每個請求選取**一種模式**。
可用模式定義於 `open-sse/services/compression/types.ts`（類型 `CompressionMode`）：

| 模式         | 引擎                 | 使用情境                                                                                                                                                 |
| ------------ | -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `off`        | 無                   | 停用所有壓縮                                                                                                                                             |
| `rtk`        | 僅 RTK               | 以命令輸出為主的工作階段（可節省 80% 以上）                                                                                                              |
| `lite`       | 僅 Lite              | 保守壓縮（快速、安全）                                                                                                                                   |
| `standard`   | Caveman              | 使用語言套件壓縮散文                                                                                                                                     |
| `aggressive` | Caveman + Aggressive | 積極壓縮散文並執行積極的最終處理                                                                                                                         |
| `ultra`      | Ultra                | 最大程度壓縮（有損、最後手段）。設定 `ultra.modelPath` 時，可選擇透過 **LLMLingua-2** SLM 引擎路由（模型無法使用時，會以失敗開放方式回退至規則式路徑）。 |
| `stacked`    | 自訂管線             | 依任意順序組合引擎（見下文）                                                                                                                             |

> 除了上述模式引擎外，登錄檔也提供可堆疊的專用引擎 —
> **CCR**、**headroom**、**ionizer** 和 **session-dedup** — 相關說明請參閱
> [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md#additional-built-in-engines)。

模式選擇由 `open-sse/services/compression/strategySelector.ts` 中的 `getEffectiveMode()` 決定：

1. 如果已停用壓縮：`"off"`
2. 如果存在組合覆寫：使用該覆寫
3. 如果超過自動觸發閾值：使用 `autoTriggerMode`（預設值：`"lite"`）
4. 否則：使用 `defaultMode`

### 預設堆疊式管線

明確設定 `mode: "stacked"` 時，預設管線會組合：

1. **RTK** — 移除命令輸出中的雜訊（終端機輸出可節省約 80%）
2. **Caveman** — 移除贅詞，將散文精簡化（剩餘文字可節省約 46%）
3. **Lite** — 最終的空白字元處理與去重複處理

對於大量使用工具的工作階段，此組合可節省 **78-95%**。

### 設定堆疊式管線

在組合設定中：

```json
{
  "compression": {
    "mode": "stacked",
    "pipeline": [
      { "engine": "rtk", "config": { "intensity": "aggressive" } },
      { "engine": "caveman", "config": { "intensity": "full" } },
      { "engine": "lite", "config": {} }
    ]
  }
}
```

你可以省略引擎、新增自訂引擎，或調整其順序。

### 狀態傳遞

引擎可以從請求內容（位於 `options`）讀取中繼資料：

```ts
compress(body, config) {
  // 讀取來自先前引擎的中繼資料
  const original = options?.compressionComboId;  // "my-coding-combo"
  // ...
}
```

中繼資料為**唯讀** — 引擎無法修改請求內容，只能修改自己的主體輸出。

### 執行順序的注意事項

| 引擎順序                         | 效果                                                        |
| -------------------------------- | ----------------------------------------------------------- |
| RTK → Caveman → Lite             | **建議使用**（先移除雜訊，再處理語言，最後處理空白字元）    |
| Lite → RTK → Caveman             | 不佳 — Lite 會移除原始輸出的空白字元，導致 RTK 模式比對失敗 |
| Caveman → RTK                    | 不佳 — Caveman 可能以 RTK 無法辨識的方式改寫文字            |
| 任何以 `tool_results` 為首的順序 | 較佳 — 工具輸出是雜訊最多的內容                             |

### 不應使用堆疊的情況

堆疊不一定總是更好：

- **簡單訊息**（沒有工具輸出）— 單獨使用 Caveman 或 Lite 即已足夠
- **對成本敏感** — 每個引擎會增加約 5-50ms 的延遲
- **特定工具** — 對於 shell 輸出，通常僅使用 RTK 即已足夠

### 建置自訂管線

沒有具名管線登錄機制。堆疊式管線只是傳遞給 `applyStackedCompression()` 的**行內步驟陣列**（從 `@omniroute/open-sse/services/compression/strategySelector` 匯出）：

```ts
import { applyStackedCompression } from "@omniroute/open-sse/services/compression/strategySelector";

const result = applyStackedCompression(body, [
  { engine: "rtk", intensity: "aggressive" },
  { engine: "caveman", intensity: "full" },
]);
```

未傳入管線時，預設為 `rtk(standard) → caveman(full)`。

若要透過設定檔控制，請設定 `mode: "stacked"`，並在 `stackedPipeline` 下提供步驟陣列（從 `config.stackedPipeline` 讀取）：

```json
{
  "compression": {
    "mode": "stacked",
    "stackedPipeline": [
      { "engine": "rtk", "intensity": "aggressive" },
      { "engine": "caveman", "intensity": "full" }
    ]
  }
}
```

---

## 上游同步政策

OmniRoute 的壓縮引擎在 README 中註明了數個上游專案
（「靈感來自 RTK、Caveman、LLMLingua-2、Troglodita」）。貢獻者常見的問題是：**當上游 RTK 新增工具篩選器，或 Caveman 新增規則套件時，這些改進如何進入 OmniRoute？** 本節提供權威解答。

### 內建副本與獨立實作的差異

| 引擎                         | 與上游的關係                                                                                                   | 位置                                                                |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| **RTK**                      | **獨立重新實作**（受其啟發，而非複製）                                                                         | `open-sse/services/compression/engines/rtk/`                        |
| **Caveman**                  | **獨立重新實作**（受其啟發）                                                                                   | `open-sse/services/compression/engines/cavemanAdapter.ts`           |
| **Headroom**                 | 大多為內部實作；只有 `gcf/` 編解碼器是**確實內建**自 `gcf-typescript`（MIT、含 SPDX 標記，且僅使用通用設定檔） | `open-sse/services/compression/engines/headroom/gcf/`               |
| **LLMLingua-2 / Troglodita** | 受其啟發（驅動 `llmlingua` + `session-dedup` 引擎）                                                            | `open-sse/services/compression/engines/llmlingua/`, `session-dedup` |

重點：**RTK 和 Caveman 是針對相關_概念_（篩選規則、規則套件）所進行的無塵室 TypeScript 實作，而非內建的原始碼樹。** 並不存在可透過 `git pull` 取得的上游副本——這正是 README 使用「靈感來自」而非「內附」一詞的原因。

### 如何合併上游改進

我們**不會自動追蹤上游版本，也沒有 `compression-sync` 標籤**——這是刻意的設計。由於這些引擎是重新實作的，因此上游 RTK 篩選器或 Caveman 規則套件不會以程式碼形式直接合併；而是會**以 OmniRoute 自有格式重新表達為新的規則／篩選器**（請參閱
[COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md)），並透過一般 PR 依需要加入。上述擴充點（自訂引擎、語言套件、RTK 篩選器）是貢獻此類功能的正式途徑。

近期遵循此流程的實例包括：

- 適用於 Gradle 與 `dotnet` 建置輸出的 RTK 篩選器（v3.8.42）
- 適用於 kubectl / docker-build / composer / gh 的 RTK 篩選器（#2824）
- Caveman 印尼語語言套件（#3975），以及德語／法語／日語／中文套件

### Headroom（輸入壓縮代理）

Headroom **完全由內部維護**——由固定版本的內建 `gcf` 編解碼器快照，以及 OmniRoute 自有的 `smartcrusher` / `toon` / `tabular` 層所組成。除了內建副本外，沒有需要持續追蹤的即時上游；當該編解碼器有所變更時，會手動更新 `gcf`，並針對壓縮預算閘門（`check:compression-budget`）重新驗證。

### 提議受上游啟發的改進

1. **不要內建原始碼**——請使用 OmniRoute 的格式重新表達上游規則／篩選器。
2. 透過下方相符的擴充點加入該功能（語言套件、RTK 篩選器或自訂引擎）。
3. 在 PR 說明中引用上游專案（註明出處），而非複製其受授權條款約束的原始碼。
4. 納入測試，並確認 `check:compression-budget` 閘門仍可通過。

---

## 新增輸出風格

輸出風格（請參閱[指南的目錄表](./COMPRESSION_GUIDE.md#output-styles-catalog)）
是輸入引擎在回應端的對應機制：它們不是壓縮您傳送的內容，而是指示模型產生成本更低的輸出。註冊表是
`open-sse/services/compression/outputStyles/catalog.ts` 中的
`OUTPUT_STYLE_CATALOG`，而且**一個目錄項目就是整個功能**：注入器、儀表板設定面板、持久化與遙測都會列舉該目錄，因此沒有其他清單需要更新。

1. **在 `OUTPUT_STYLE_CATALOG` 中新增一個項目**，包含 `id`、`label`、`description`，以及
   三個英文 `levels`（`lite`、`full`、`ultra`）。每個層級都必須以
   `${SHARED_BOUNDARIES}` 結尾，讓程式碼、路徑、命令、錯誤與 URL 保持原樣。
   每個 `(id, level, language)` 的指令文字都必須是**靜態且確定的**——僅允許使用 `${SHARED_BOUNDARIES}` 進行插值。
2. **翻譯它。** 至少須在 `i18n` 下提供一個 `pt-BR` 區塊；`ponytail` 與
   `i-have-adhd`（en、pt-BR、es、de、fr、it、ru、zh、ja、id、vi）可作為結構參考。刻意設計為單一語言的風格則改為設定 `locale`（例如 `terse-cjk` → `zh`），之後只會在該地區設定下提供。
3. **更新矩陣防護測試**——將此風格的語言新增至
   `tests/unit/compression/output-styles-i18n-matrix.test.ts` 中的
   `BASELINE_LANGUAGES`。任何未受地區設定限制的新風格，如果缺少必要翻譯且未包含附有追蹤議題的明確 `KNOWN_ENGLISH_ONLY` 項目，都會導致閘門檢查失敗。
4. **新增每個風格專屬的測試**，仿照
   `tests/unit/compression/i-have-adhd-catalog.test.ts`：測試目錄結構、每個層級的邊界條款，以及用於確認每個翻譯皆以其自身語言撰寫、而非直接複製英文的錨點。
5. **來源標註**：如果該風格改編自上游專案，請在項目的原始碼註解中標註其來源（例如 `i-have-adhd` → ayghri/i-have-adhd，MIT）——規則與上方「提出受上游啟發的改進」相同。

不需要變更 UI、結構描述或遙測——這些介面都會從目錄進行算繪。

---

## 最佳實務

### 引擎開發

1. **務必實作 `validateConfig`**——缺少驗證的引擎會造成無聲失敗
2. **設定實際可行的 `targetLatencyMs`**——策略選擇器會使用它來選擇引擎
3. **針對儀表板使用 `getConfigSchema`**——切勿對使用者隱藏設定
4. **如果您的引擎是純函式，請支援 `stackable: true`**——具有副作用的引擎不應堆疊
5. **撰寫內嵌測試**——引擎應能在 <1s 內完成驗證

### 語言套件開發

1. **從 `lite` 強度開始**——您的規則在最低設定下應是安全的
2. **使用 `context` 限定規則範圍**——僅適用於 `user` 的規則不會意外影響系統提示詞
3. **避免擷取 JSON 鍵**——`\\bword\\b` 可能會比對到 JSON 內部，破壞結構化資料
4. **使用邊界案例進行測試**——空白輸入、Unicode、RTL 文字、表情符號
5. **使用現有套件作為範本**——`en/filler.json` 是開發最完善的範例

### 管線設計

1. **先分析效能再進行最佳化**——先使用 `compression_stats` 進行量測
2. **優先採用組合而非重新實作**——在撰寫新引擎前，先擴充 Caveman 規則
3. **記錄順序的理由**——以註解說明為何引擎 A 位於引擎 B 之前
4. **在全部 3 個強度層級進行測試**——`lite` 速度快但有損，`ultra` 速度慢但精確

---

## 參考：內建引擎

| 引擎 ID              | 可堆疊 | 預設 stackPriority | 目標                       |
| -------------------- | ------ | ------------------ | -------------------------- |
| `lite`               | 是     | 5                  | 訊息、工具結果             |
| `rtk`                | 是     | 10                 | 工具結果                   |
| `standard` (caveman) | 是     | 20                 | 訊息、工具結果、程式碼區塊 |
| `aggressive`         | 是     | 30                 | 訊息                       |
| `ultra`              | 是     | 40                 | 訊息、程式碼區塊           |

### 另請參閱

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — 管線概覽
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — 引擎登錄參考
- [COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md) — 規則格式規格
- [COMPRESSION_LANGUAGE_PACKS.md](./COMPRESSION_LANGUAGE_PACKS.md) — 語言套件詳細資訊
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — RTK 引擎與自訂篩選器
- 原始碼：`open-sse/services/compression/`（117 個檔案，約 250KB）
