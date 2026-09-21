# Compression Rules Format (中文 (简体))

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_RULES_FORMAT.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_RULES_FORMAT.md)

---

压缩规则是在运行时加载的 JSON 文件。它们被有意设计为仅包含数据，以便在不更改引擎代码的情况下审查新的语言包和 RTK 命令过滤器。

> **规范架构（唯一事实来源）：** [`open-sse/services/compression/rules/_schema.json`](../../open-sse/services/compression/rules/_schema.json)（JSON Schema 草案 2020-12）。
> 以下示例仅供说明——如有疑问，请使用 `_schema.json` 验证你的规则包。

## Caveman 规则包

Caveman 规则包位于：

```txt
open-sse/services/compression/rules/<language>/<pack>.json
```

每个规则包都包含在受保护区域被隔离后应用于普通文本的替换规则。

```json
{
  "language": "en",
  "category": "filler",
  "rules": [
    {
      "name": "question_to_directive",
      "pattern": "\\b(?:Can you explain why|Could you show me how)\\b\\s*",
      "replacement": "Explain why ",
      "replacementMap": {
        "can you explain why": "Explain why ",
        "could you show me how": "Show how "
      },
      "flags": "gi",
      "context": "all",
      "category": "context",
      "minIntensity": "lite",
      "description": "将冗长的问题转换为直接请求。"
    }
  ]
}
```

### Caveman 字段

| 字段                     | 必需 | 描述                                                           |
| ------------------------ | ---- | -------------------------------------------------------------- |
| `language`               | 是   | 类似 BCP-47 的语言键，例如 `en`、`pt-BR`、`es`                 |
| `category`               | 是   | 规则包类别文件名/类别，例如 `filler` 或 `dedup`                |
| `rules`                  | 是   | 正则表达式替换规则数组                                         |
| `rules[].name`           | 是   | 稳定的规则名称                                                 |
| `rules[].pattern`        | 是   | JavaScript 正则表达式源                                        |
| `rules[].flags`          | 否   | JavaScript 正则表达式标志；默认为 `gi`                         |
| `rules[].replacement`    | 否   | 替换字符串，或 `replacementMap` 未匹配时使用的回退值           |
| `rules[].replacementMap` | 否   | 以规范化的匹配文本为键的特定匹配替换映射                       |
| `rules[].context`        | 否   | `all`、`user`、`assistant` 或 `system`；默认为 `all`           |
| `rules[].category`       | 否   | `filler`、`context`、`structural`、`dedup`、`terse` 或 `ultra` |
| `rules[].minIntensity`   | 否   | `lite`、`full` 或 `ultra`；默认为 `lite`                       |
| `rules[].description`    | 否   | 人类可读的规则摘要                                             |

当区分大小写的匹配很重要时，请使用 `flags`，例如在小写普通文本之前移除冠词，同时避免从 `the OpenAI API` 中移除 `the`。当一个正则表达式包含多个需要不同输出的备选项时，请使用 `replacementMap`；这样既能让 JSON 规则包保持仅包含数据，又能保留功能更丰富的内置 TypeScript 替换函数的行为。

## RTK 过滤器包

RTK 过滤器位于：

```txt
open-sse/services/compression/engines/rtk/filters/<filter>.json
```

每个过滤器描述如何识别和压缩一类命令输出。

```json
{
  "id": "test-vitest",
  "label": "Vitest output",
  "category": "test",
  "priority": 92,
  "match": {
    "outputTypes": ["test-vitest"],
    "commands": ["vitest", "npm test", "npm run test"],
    "patterns": ["\\bFAIL\\b", "\\bPASS\\b", "\\bTest Files\\b"]
  },
  "rules": {
    "stripAnsi": true,
    "replace": [{ "pattern": "\\s+\\[[0-9]+ms\\]", "replacement": "" }],
    "matchOutput": [
      {
        "pattern": "All tests passed",
        "message": "vitest: ok",
        "unless": "FAIL|Error:"
      }
    ],
    "includePatterns": ["FAIL", "Error:", "Test Files", "Tests"],
    "dropPatterns": ["^\\s*$", "Duration\\s+\\d+"],
    "collapsePatterns": ["^\\s+at "],
    "deduplicate": true,
    "truncateLineAt": 240,
    "maxLines": 160,
    "headLines": 24,
    "tailLines": 40,
    "onEmpty": "vitest: ok",
    "filterStderr": false
  },
  "preserve": {
    "errorPatterns": ["FAIL", "Error:", "AssertionError"],
    "summaryPatterns": ["Test Files", "Tests", "Snapshots"]
  },
  "tests": [
    {
      "name": "keeps failing tests",
      "command": "vitest",
      "input": "FAIL test/a.test.ts\\nError: boom\\nTest Files 1 failed",
      "expected": "FAIL test/a.test.ts\\nError: boom\\nTest Files 1 failed"
    }
  ]
}
```

### RTK 字段

| 字段                       | 必需 | 描述                                                                        |
| -------------------------- | ---- | --------------------------------------------------------------------------- |
| `id`                       | 是   | 稳定的过滤器 ID                                                             |
| `label`                    | 是   | 可在仪表板中显示的名称                                                      |
| `category`                 | 是   | 过滤器系列：git、test、build、shell、docker、package、infra、cloud、generic |
| `priority`                 | 否   | 多个过滤器匹配时，优先级较高者胜出                                          |
| `match.outputTypes`        | 否   | 用于选择此过滤器的检测器输出 ID                                             |
| `match.commands`           | 否   | 用于选择此过滤器的命令标记                                                  |
| `match.patterns`           | 否   | 根据输出文本选择此过滤器的正则表达式模式                                    |
| `rules.stripAnsi`          | 否   | 在正则表达式处理阶段之前移除 ANSI 转义序列                                  |
| `rules.replace`            | 否   | 按顺序逐行应用的正则表达式替换                                              |
| `rules.matchOutput`        | 否   | 带有可选 `unless` 保护条件的短路输出规则                                    |
| `rules.includePatterns`    | 否   | 优先保留的行                                                                |
| `rules.dropPatterns`       | 否   | 作为噪声移除的行                                                            |
| `rules.collapsePatterns`   | 否   | 可折叠的重复匹配行                                                          |
| `rules.deduplicate`        | 否   | 折叠重复的规范化行                                                          |
| `rules.truncateLineAt`     | 否   | Unicode 安全的单行字符数限制                                                |
| `rules.maxLines`           | 否   | 保留尾部内容之前允许保留的最大行数                                          |
| `rules.headLines`          | 否   | 截断期间保留的开头行数                                                      |
| `rules.tailLines`          | 否   | 为保留最近上下文而保留的末尾行数                                            |
| `rules.onEmpty`            | 否   | 过滤移除所有内容时使用的回退消息                                            |
| `rules.filterStderr`       | 否   | 在后续过滤阶段之前规范化常见的标准错误前缀                                  |
| `preserve.errorPatterns`   | 否   | 截断后仍应保留的错误行                                                      |
| `preserve.summaryPatterns` | 否   | 截断后仍应保留的摘要行                                                      |
| `tests[]`                  | 否   | RTK 验证门禁使用的内联验证样例                                              |

RTK 按以下顺序应用声明式处理阶段：`stripAnsi`、`filterStderr`、`replace`、
`matchOutput`、`dropPatterns`/`includePatterns`、`truncateLineAt`、`headLines`/`tailLines`、
`maxLines` 和 `onEmpty`。

自定义过滤器可从以下位置加载：

1. 项目 `.rtk/filters.json` 文件；仅当存在匹配的 `.rtk/trust.json` 哈希或已启用
   `trustProjectFilters` 时才会加载。
2. 全局 `DATA_DIR/rtk/filters.json`。
3. 内置过滤器。

项目/全局自定义文件可包含一个过滤器对象或过滤器对象数组。无效的自定义过滤器会被跳过并输出诊断信息；无效的内置过滤器会导致验证失败。

项目信任文件：

```json
{
  "filtersSha256": "0123456789abcdef..."
}
```

环境覆盖变量 `OMNIROUTE_RTK_TRUST_PROJECT_FILTERS=1` 可在没有哈希的情况下信任项目过滤器，
且应仅限在受控的本地开发环境中使用。

## 安全规则

- 保持规则的幂等性：多次运行同一过滤器不应破坏输出。
- 尽可能保留准确的错误文本、文件路径、行号和命令摘要。
- 避免使用会修改代码块、JSON 负载、URL 或密钥的规则。
- 在检测器/过滤器测试中，为新的命令系列添加单元测试覆盖。
- 为每个内置过滤器和共享自定义过滤器添加 `tests[]` 示例。

## 验证

规则包在使用前会进行验证。内置 Caveman 包和内置 RTK 过滤器在验证期间会快速失败，
以便在发布前发现损坏的发行资源。自定义 RTK 过滤器在解析或信任验证失败时会被跳过，
并提供诊断信息。

针对性验证：

```bash
node --import tsx/esm --test tests/unit/compression/rule-loader.test.ts tests/unit/compression/language-packs.test.ts
node --import tsx/esm --test tests/unit/compression/rtk-verify.test.ts tests/unit/compression/rtk-dsl-pipeline.test.ts
```
