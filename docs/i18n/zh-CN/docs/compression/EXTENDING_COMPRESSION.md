# Extending the Compression Pipeline (中文 (简体))

🌐 **Languages:** 🇺🇸 [English](../../../../compression/EXTENDING_COMPRESSION.md) · 🇪🇹 [am](../../../am/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇦 [ar](../../../ar/docs/compression/EXTENDING_COMPRESSION.md) · 🇦🇿 [az](../../../az/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇬 [bg](../../../bg/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇩 [bn](../../../bn/docs/compression/EXTENDING_COMPRESSION.md) · 🇨🇿 [cs](../../../cs/docs/compression/EXTENDING_COMPRESSION.md) · 🇩🇰 [da](../../../da/docs/compression/EXTENDING_COMPRESSION.md) · 🇩🇪 [de](../../../de/docs/compression/EXTENDING_COMPRESSION.md) · 🇬🇷 [el](../../../el/docs/compression/EXTENDING_COMPRESSION.md) · 🇪🇸 [es](../../../es/docs/compression/EXTENDING_COMPRESSION.md) · 🇪🇪 [et](../../../et/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇷 [fa](../../../fa/docs/compression/EXTENDING_COMPRESSION.md) · 🇫🇮 [fi](../../../fi/docs/compression/EXTENDING_COMPRESSION.md) · 🇫🇷 [fr](../../../fr/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇪 [ga](../../../ga/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [gu](../../../gu/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [ha](../../../ha/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇱 [he](../../../he/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [hi](../../../hi/docs/compression/EXTENDING_COMPRESSION.md) · 🇭🇷 [hr](../../../hr/docs/compression/EXTENDING_COMPRESSION.md) · 🇭🇺 [hu](../../../hu/docs/compression/EXTENDING_COMPRESSION.md) · 🇦🇲 [hy](../../../hy/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇩 [id](../../../id/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [ig](../../../ig/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇹 [it](../../../it/docs/compression/EXTENDING_COMPRESSION.md) · 🇯🇵 [ja](../../../ja/docs/compression/EXTENDING_COMPRESSION.md) · 🇬🇪 [ka](../../../ka/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇭 [km](../../../km/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [kn](../../../kn/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇷 [ko](../../../ko/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇹 [lt](../../../lt/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇻 [lv](../../../lv/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [ml](../../../ml/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [mr](../../../mr/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇾 [ms](../../../ms/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇹 [mt](../../../mt/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇲 [my](../../../my/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇵 [ne](../../../ne/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇱 [nl](../../../nl/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇴 [no](../../../no/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [or](../../../or/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [pa](../../../pa/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇭 [phi](../../../phi/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇱 [pl](../../../pl/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇹 [pt](../../../pt/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇴 [ro](../../../ro/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇺 [ru](../../../ru/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇰 [si](../../../si/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇰 [sk](../../../sk/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇮 [sl](../../../sl/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇸 [sr](../../../sr/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇪 [sv](../../../sv/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇪 [sw](../../../sw/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [ta](../../../ta/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [te](../../../te/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇭 [th](../../../th/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇷 [tr](../../../tr/docs/compression/EXTENDING_COMPRESSION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇰 [ur](../../../ur/docs/compression/EXTENDING_COMPRESSION.md) · 🇺🇿 [uz](../../../uz/docs/compression/EXTENDING_COMPRESSION.md) · 🇻🇳 [vi](../../../vi/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [yo](../../../yo/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/EXTENDING_COMPRESSION.md)

---

> **简而言之**：OmniRoute 的压缩引擎是**可插拔的**——你可以注册自定义引擎、为新语言提供语言包，并组合堆叠式管道。本指南将介绍具体方法。

**相关指南：**

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — 完整的管道概览
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — 引擎注册表和内置引擎
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — RTK 引擎和自定义过滤器
- [COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md) — 规则包格式参考

---

## 概述

压缩系统具有 **3 个扩展点**：

| 扩展点         | 用例                                             | 难度 |
| -------------- | ------------------------------------------------ | ---- |
| **自定义引擎** | 添加全新的压缩算法（例如，特定领域的摘要器）     | 高级 |
| **语言包**     | 添加对新自然语言的支持（例如，印地语、阿拉伯语） | 中等 |
| **堆叠式管道** | 按自定义顺序组合现有引擎                         | 初级 |

```
┌─────────────────────────────────────────────────────────────┐
│                         压缩策略                            │
│                                                              │
│   输入消息 ──▶ getEffectiveMode() ──▶ 模式                  │
│                                              │               │
│                      ┌───────────────────────┼──────────┐    │
│                      │         │         │         │    │    │
│                      ▼         ▼         ▼         ▼    │    │
│                   "rtk"    "lite"   "standard" "stacked"    │
│                      │         │         │         │    │    │
│                      ▼         ▼         ▼         ▼    │    │
│                   RTK       Lite     Caveman   engines[]   │
│                   引擎      引擎      引擎       串联      │
│                      │         │         │         │    │    │
│                      └─────────┴─────────┴─────────┘    │    │
│                                      │                    │
│                                      ▼                    │
│                                  压缩输出                  │
└─────────────────────────────────────────────────────────────┘

策略选择器基于模式：每个请求选择一种模式
(rtk / lite / standard / aggressive / ultra / stacked / off)。
只有 "stacked" 模式会按顺序串联多个引擎。
默认的自动触发模式是 "lite"（而不是三级优先级链）。
```

---

## 编写自定义压缩引擎

引擎接口（`open-sse/services/compression/engines/types.ts`）是每个引擎都必须满足的契约。它包含 5 个必需方法。

### `CompressionEngine` 接口

```ts
interface CompressionEngine {
  id: string; // 唯一引擎 ID
  name: string; // 显示名称
  description: string; // 简短描述
  icon: string; // 图标（表情符号或 URL）
  targets: CompressionEngineTarget[]; // ["messages", "tool_results", "code_blocks"]
  stackable: boolean; // 是否可用于堆叠式管道
  stackPriority: number; // 在堆叠式管道中的顺序（值越小越靠前）
  metadata: CompressionEngineMetadata;

  apply(body, options?): CompressionResult;
  compress(body, config?): CompressionResult;
  getConfigSchema(): EngineConfigField[];
  validateConfig(config): EngineValidationResult;
}
```

### 最小示例：空白字符引擎

最简单的引擎——移除消息中多余的空白字符。

````ts
import type { CompressionEngine } from "omniroute/compression/engines/types";
import { registerCompressionEngine } from "omniroute/compression/engines/registry";

function preserveCodeBlocks(text: string): string {
  // 按代码块标记拆分，并保留其中的空白字符
  const parts = text.split(/(```[\s\S]*?```)/);
  return parts
    .map((part) => {
      if (part.startsWith("```")) {
        return part; // 不要修改代码块
      }
      return part.replace(/\n{3,}/g, "\n\n"); // 仅应用于正文
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
  stackPriority: 100, // 在 caveman/rtk 之后运行

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

    // 遍历消息数组——同时处理字符串和多部分内容
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
      // 多部分内容：遍历各部分，仅压缩文本部分
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

// 全局注册
registerCompressionEngine(whitespaceEngine);
````

### 自定义引擎的放置位置

```
~/.omniroute/compression/engines/my-engine.ts    # 用户级
<project>/compression-engines/my-engine.ts        # 项目级（启动时加载）
```

或者通过插件以编程方式加载：

```ts
// 在你的插件中
import {
  registerCompressionEngine,
  unregisterCompressionEngine,
} from "@omniroute/open-sse/services/compression/engines/registry";
import { myEngine } from "./engines/my-engine";

export default definePlugin({
  name: "my-compression-plugin",
  // 插件 SDK 提供 onRequest / onResponse / onError 钩子。请在
  // 插件模块加载时（或首次调用 onRequest 时）注册引擎；并通过你自己的
  // 清理流程将其注销。
  onRequest: async (ctx) => {
    registerCompressionEngine(myEngine);
  },
});

// 清理时：
// unregisterCompressionEngine("my-engine");
```

### 测试你的引擎

在插件或启动函数中注册你的引擎。注册后，即可通过其 `id` 在策略选择器中使用该引擎。通过将其组合到堆叠管线中来测试集成：

---

## 创建语言包

穴居人风格压缩使用**特定语言的规则包**来处理每种自然语言中的填充词、委婉表达和冗长模式。OmniRoute 内置 **6 个语言包**：`en`、`es`、`fr`、`de`、`ja`、`pt-BR`。

### 语言包结构

语言包是 `open-sse/services/compression/rules/<language>/` 下包含 **JSON 文件**的目录：

```
open-sse/services/compression/rules/
├── en/
│   ├── filler.json          # 寒暄语、委婉表达、礼貌用语
│   ├── context.json         # 上下文精简规则
│   ├── dedup.json           # 去重规则
│   ├── structural.json      # 标点、格式
│   └── ultra.json           # 激进压缩规则
├── es/  （结构相同）
├── fr/  （结构相同）
├── de/  （结构相同）
├── ja/  （结构相同）
└── pt-BR/ （结构相同）
```

### 规则结构

每条规则都具有以下结构（来自 `open-sse/services/compression/ruleLoader.ts`）：

```ts
interface FileRule {
  name: string; // 便于阅读的名称（kebab-case）
  pattern: string; // JavaScript 正则表达式模式
  replacement?: string; // 用于替换匹配内容的文本
  replacementMap?: Record<string, string>; // 或者使用键→替换文本映射
  flags?: string; // 正则表达式标志（通常为 "gi"）
  context?: "all" | "user" | "system" | "assistant";
  category?: "filler" | "context" | "structural" | "dedup" | "terse" | "ultra";
  minIntensity?: "lite" | "full" | "ultra"; // 低于此强度时跳过
  description?: string; // 文档说明
}
```

### 示例：添加印地语填充词规则

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
      "description": "移除类似“नमस्ते”的礼貌开场语"
    },
    {
      "name": "filler_actually",
      "pattern": "\\b(?:असल में|वास्तव में|दरअसल)\\b\\s*",
      "replacement": "",
      "context": "all",
      "category": "filler",
      "minIntensity": "lite",
      "description": "移除表示“实际上”的填充词"
    },
    {
      "name": "verbose_plea",
      "pattern": "\\b(?:कृपया|कृपया आप|अनुरोध है कि आप)\\b\\s*",
      "replacement": "",
      "context": "all",
      "category": "filler",
      "minIntensity": "full",
      "description": "移除印地语中的“请”"
    }
  ]
}
```

### 验证

加载规则包时，会根据 `_schema.json` 对其进行验证。结构不正确的规则包将无法加载，并记录错误：

```
RULE_LOADER: 规则包 "hi/filler.json" 验证失败：
  - rules.0.pattern: 无效的正则表达式
  - rules.1.context: 必须是 [all, user, system, assistant] 之一
```

加载规则包时会自动根据 `_schema.json` 执行验证；无效的规则包将被拒绝，并记录上述错误。没有用于验证规则包的独立 `npm run` 脚本——请加载规则包（例如启动服务器或运行压缩流程），然后查看日志。

### 加载自定义语言包

```ts
import { loadRulePack } from "omniroute/compression/ruleLoader";

await loadRulePack("./my-custom-rules/hi/filler.json");
```

或者将其放入可识别的位置：

```
~/.omniroute/compression/rules/hi/filler.json  # 用户级
<project>/.compression/rules/hi/filler.json   # 项目级
```

### 语言包最佳实践

1. **从 `filler` 开始**——这类规则影响最大
2. **使用 `minIntensity`**限制激进规则——防止过度压缩
3. **包含测试用例**——在 JSON 中添加 `tests[]` 数组以验证行为
4. **顺序很重要**——靠前的规则会优先应用；将影响较大的规则放在前面
5. **谨慎使用 `replacement`**——空字符串通常是正确的选择；切勿引入新内容

### 翻译策略

将规则包本地化为新语言时：

1. **翻译规则名称**——它们会出现在调试输出中
2. **调整正则表达式模式**——直接翻译通常无效（不同语言的单词边界不同）
3. **使用真实对话进行测试**——规则包应确保能安全处理实际输入
4. **匹配文化习惯**——例如，日语规则包中的敬语填充表达比英语更多

---

## 堆叠管道

**堆叠管道**会按顺序运行多个引擎，每个引擎的输出都会作为下一个引擎的输入。这就是 `mode: stacked` 的内部工作方式。

### 堆叠的工作原理

```
输入（10,000 个 token）
        │
        ▼
   ┌──────────┐
   │   引擎   │  优先级 10
   │    A     │  ──▶ 输出：6,000 个 token（减少 40%）
   └────┬─────┘
        ▼
   ┌──────────┐
   │   引擎   │  优先级 50
   │    B     │  ──▶ 输出：2,400 个 token（减少 60%）
   └────┬─────┘
        ▼
   ┌──────────┐
   │   引擎   │  优先级 100
   │    C     │  ──▶ 输出：1,200 个 token（减少 80%）
   └────┬─────┘
        │
        ▼
最终输出（1,200 个 token，合计节省约 88%）
```

选择 `mode: "stacked"` 后，引擎会按照 `pipeline` 数组中指定的顺序依次执行。
引擎 N 的输出会成为引擎 N+1 的输入。

### 压缩模式

OmniRoute 会根据配置、自动触发阈值和组合覆盖，为每个请求选择**一种模式**。
可用模式定义在 `open-sse/services/compression/types.ts` 中（类型为 `CompressionMode`）：

| 模式         | 引擎                 | 使用场景                                                                                                                                             |
| ------------ | -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `off`        | 无                   | 禁用所有压缩                                                                                                                                         |
| `rtk`        | 仅 RTK               | 命令输出较多的会话（节省 80% 以上）                                                                                                                  |
| `lite`       | 仅 Lite              | 保守压缩（快速、安全）                                                                                                                               |
| `standard`   | Caveman              | 使用语言包压缩文本                                                                                                                                   |
| `aggressive` | Caveman + Aggressive | 激进文本压缩 + 激进的最终处理                                                                                                                        |
| `ultra`      | Ultra                | 最大程度压缩（有损，最后手段）。设置 `ultra.modelPath` 后，可选择通过 **LLMLingua-2** SLM 引擎处理（模型不可用时会故障开放，回退到基于规则的路径）。 |
| `stacked`    | 自定义管道           | 按任意顺序组合引擎（见下文）                                                                                                                         |

> 除上述模式引擎之外，注册表还提供了可堆叠的专用引擎 —
> **CCR**、**headroom**、**ionizer** 和 **session-dedup** — 详见
> [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md#additional-built-in-engines)。

模式选择由 `open-sse/services/compression/strategySelector.ts` 中的 `getEffectiveMode()` 决定：

1. 如果禁用了压缩：`"off"`
2. 如果存在组合覆盖：使用该覆盖
3. 如果超过自动触发阈值：使用 `autoTriggerMode`（默认值：`"lite"`）
4. 否则：使用 `defaultMode`

### 默认堆叠管道

显式配置 `mode: "stacked"` 后，默认管道会组合以下引擎：

1. **RTK** — 去除命令输出中的噪声（终端输出可节省约 80%）
2. **Caveman** — 移除赘词、精简文本（剩余文本可节省约 46%）
3. **Lite** — 最终的空白字符清理 + 去重处理

这种组合可在大量使用工具的会话中实现 **78-95% 的节省**。

### 配置堆叠管道

在组合配置中：

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

你可以省略引擎、添加自定义引擎或调整其顺序。

### 状态传递

引擎可以从请求上下文（位于 `options` 中）读取元数据：

```ts
compress(body, config) {
  // 读取前序引擎的元数据
  const original = options?.compressionComboId;  // "my-coding-combo"
  // ...
}
```

元数据是**只读的** — 引擎无法修改请求上下文，只能修改自己的正文输出。

### 执行顺序的注意事项

| 引擎顺序                             | 效果                                                          |
| ------------------------------------ | ------------------------------------------------------------- |
| RTK → Caveman → Lite                 | **推荐**（先去除噪声，然后处理语言，最后处理空白字符）        |
| Lite → RTK → Caveman                 | 不佳 — Lite 会去除原始输出中的空白字符，导致 RTK 模式匹配失败 |
| Caveman → RTK                        | 不佳 — Caveman 可能会以 RTK 无法识别的方式改写文本            |
| 任何将 `tool_results` 置于首位的顺序 | 更好 — 工具输出是噪声最多的内容                               |

### 不应使用堆叠的情况

堆叠并不总是更好：

- **简单消息**（无工具输出）— 单独使用 Caveman 或 Lite 就足够了
- **对成本敏感** — 每个引擎都会增加约 5-50ms 的延迟
- **特定工具** — 对于 shell 输出，通常单独使用 RTK 就足够了

### 构建自定义管道

不存在命名管线注册表。堆叠管线只是传递给 `applyStackedCompression()` 的**内联步骤数组**（该函数从 `@omniroute/open-sse/services/compression/strategySelector` 导出）：

```ts
import { applyStackedCompression } from "@omniroute/open-sse/services/compression/strategySelector";

const result = applyStackedCompression(body, [
  { engine: "rtk", intensity: "aggressive" },
  { engine: "caveman", intensity: "full" },
]);
```

如果不传入管线，则默认使用 `rtk(standard) → caveman(full)`。

要通过配置驱动它，请设置 `mode: "stacked"`，并在 `stackedPipeline` 下提供步骤数组（从 `config.stackedPipeline` 读取）：

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

## 上游同步策略

OmniRoute 的压缩引擎在 README 中注明了对多个上游项目的致谢
（“灵感来自 RTK、Caveman、LLMLingua-2、Troglodita”）。贡献者经常提出的一个
问题是：**当上游 RTK 添加新的工具过滤器，或 Caveman 添加规则包时，这些改进
如何进入 OmniRoute？** 本节给出了权威答案。

### 内置副本与独立实现

| 引擎                         | 与上游的关系                                                                                              | 位置                                                                |
| ---------------------------- | --------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| **RTK**                      | **独立重新实现**（受其启发，并非副本）                                                                    | `open-sse/services/compression/engines/rtk/`                        |
| **Caveman**                  | **独立重新实现**（受其启发）                                                                              | `open-sse/services/compression/engines/cavemanAdapter.ts`           |
| **Headroom**                 | 大部分为内部实现；仅 `gcf/` 编解码器是从 `gcf-typescript` **真正内置**的（MIT、带 SPDX 标记、仅通用配置） | `open-sse/services/compression/engines/headroom/gcf/`               |
| **LLMLingua-2 / Troglodita** | 受其启发（用于驱动 `llmlingua` + `session-dedup` 引擎）                                                   | `open-sse/services/compression/engines/llmlingua/`, `session-dedup` |

要点：**RTK 和 Caveman 是对相关_理念_（过滤规则、规则包）的净室 TypeScript
实现，而不是内置的源代码树。** 不存在可供 `git pull` 的上游副本——这正是 README
使用“灵感来自”而非“捆绑提供”这种表述的原因。

### 如何合并上游改进

我们**没有自动跟踪上游版本发布，也没有 `compression-sync`
标签**——这是有意为之。由于这些引擎是重新实现的，因此上游 RTK
过滤器或 Caveman 规则包不会以代码形式直接合并；相反，它会**使用 OmniRoute
自己的格式重新表达为新规则/过滤器**（请参阅
[COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md)），然后通过普通 PR
按需引入。上述扩展点（自定义引擎、语言包、RTK 过滤器）是贡献此类改进的官方方式。

近期采用这一流程的示例包括：

- 用于 Gradle 和 `dotnet` 构建输出的 RTK 过滤器（v3.8.42）
- 用于 kubectl / docker-build / composer / gh 的 RTK 过滤器（#2824）
- Caveman 印度尼西亚语语言包（#3975），以及德语 / 法语 / 日语 / 中文语言包

### Headroom（输入压缩代理）

Headroom **完全由内部实现**——由固定版本的内置 `gcf` 编解码器快照，以及
OmniRoute 自有的 `smartcrusher` / `toon` / `tabular` 层组成。除内置副本外，
没有需要持续跟踪的上游；当编解码器发生变化时，会手动更新 `gcf`，并针对压缩预算
门禁（`check:compression-budget`）重新进行验证。

### 提议一项受上游启发的改进

1. **不要内置源代码**——请使用 OmniRoute 的格式重新表达上游规则/过滤器。
2. 通过下方对应的扩展点添加它（语言包、RTK 过滤器或自定义引擎）。
3. 在 PR 描述中引用上游项目（署名），不要复制其带有许可证的源代码。
4. 包含测试，并确认 `check:compression-budget` 门禁仍能通过。

---

## 添加输出风格

输出风格（参见[指南中的目录表](./COMPRESSION_GUIDE.md#output-styles-catalog)）
是输入引擎在响应侧的对应机制：它们不是压缩你发送的内容，而是指示模型生成成本更低的输出。注册表是
`open-sse/services/compression/outputStyles/catalog.ts` 中的
`OUTPUT_STYLE_CATALOG`，并且**一个目录条目就是完整的功能**：注入器、仪表板设置面板、
持久化和遥测都会枚举该目录——无需更新任何其他列表。

1. **向 `OUTPUT_STYLE_CATALOG` 添加一个条目**，其中包含 `id`、`label`、`description` 和
   三个英文 `levels`（`lite`、`full`、`ultra`）。每个级别都必须以
   `${SHARED_BOUNDARIES}` 结尾，以确保代码、路径、命令、错误和 URL 保持原样。
   对于每个 `(id, level, language)`，指令文本必须是**静态且确定的**——只允许使用
   `${SHARED_BOUNDARIES}` 进行插值。
2. **进行翻译。** 至少在 `i18n` 下提供一个 `pt-BR` 块；`ponytail` 和
   `i-have-adhd`（en、pt-BR、es、de、fr、it、ru、zh、ja、id、vi）可作为结构参考。有意设计为
   仅支持单一语言的风格则改为设置 `locale`（例如 `terse-cjk` → `zh`），并且仅在该区域设置下
   提供。
3. **更新矩阵防护测试**——将该风格支持的语言添加到
   `tests/unit/compression/output-styles-i18n-matrix.test.ts` 中的
   `BASELINE_LANGUAGES`。对于任何未按区域设置进行限制、但缺少必需翻译的新风格，
   此门禁都会失败，除非该风格包含一个附带跟踪议题的显式 `KNOWN_ENGLISH_ONLY` 条目。
4. **添加针对该风格的测试**，以
   `tests/unit/compression/i-have-adhd-catalog.test.ts` 为模板：测试目录结构、
   每个级别的边界条款，以及一个锚点断言，用于确认每项翻译均以其自身语言编写，
   而不是直接复制英文。
5. **署名**：如果该风格改编自上游项目，请在条目上的源码注释中注明来源
   （例如 `i-have-adhd` → ayghri/i-have-adhd，MIT）——遵循上文“提出受上游启发的改进”中的
   相同规则。

无需更改 UI、schema 或遥测——这些界面和机制均从目录中渲染。

---

## 最佳实践

### 引擎开发

1. **始终实现 `validateConfig`**——缺少验证的引擎会导致静默失败
2. **设置合理的 `targetLatencyMs`**——策略选择器会使用它来选择引擎
3. **为仪表板使用 `getConfigSchema`**——绝不能对用户隐藏配置
4. **如果引擎是纯函数式的，请支持 `stackable: true`**——有副作用的引擎不应堆叠
5. **编写内联测试**——引擎应能在 1 秒内完成验证

### 语言包开发

1. **从 `lite` 强度开始**——你的规则在最低设置下也应当安全
2. **使用 `context` 限定规则作用域**——仅针对 `user` 的规则不会意外影响系统提示词
3. **避免捕获 JSON 键**——`\\bword\\b` 可能匹配 JSON 内部的内容，从而破坏结构化数据
4. **使用边界情况进行测试**——空输入、Unicode、RTL 文本、表情符号
5. **使用现有语言包作为模板**——`en/filler.json` 是目前开发最完善的示例

### 流水线设计

1. **先分析性能，再进行优化**——先使用 `compression_stats` 进行测量
2. **优先组合，而不是重新实现**——在编写新引擎之前，先扩展 Caveman 规则
3. **记录顺序依据**——通过注释说明为什么引擎 A 位于引擎 B 之前
4. **在所有 3 个强度级别下进行测试**——`lite` 速度快但会有损失，`ultra` 速度慢但更精确

---

## 参考：内置引擎

| 引擎 ID              | 可堆叠 | 默认 stackPriority | 目标                   |
| -------------------- | ------ | ------------------ | ---------------------- |
| `lite`               | 是     | 5                  | 消息、工具结果         |
| `rtk`                | 是     | 10                 | 工具结果               |
| `standard` (caveman) | 是     | 20                 | 消息、工具结果、代码块 |
| `aggressive`         | 是     | 30                 | 消息                   |
| `ultra`              | 是     | 40                 | 消息、代码块           |

### 另请参阅

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — 流水线概述
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — 引擎注册表参考
- [COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md) — 规则格式规范
- [COMPRESSION_LANGUAGE_PACKS.md](./COMPRESSION_LANGUAGE_PACKS.md) — 语言包详情
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — RTK 引擎和自定义过滤器
- 源代码：`open-sse/services/compression/`（117 个文件，约 250KB）
