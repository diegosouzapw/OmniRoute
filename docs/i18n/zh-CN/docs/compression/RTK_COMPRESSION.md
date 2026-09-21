# RTK Compression (中文 (简体))

🌐 **Languages:** 🇺🇸 [English](../../../../compression/RTK_COMPRESSION.md) · 🇪🇹 [am](../../../am/docs/compression/RTK_COMPRESSION.md) · 🇸🇦 [ar](../../../ar/docs/compression/RTK_COMPRESSION.md) · 🇦🇿 [az](../../../az/docs/compression/RTK_COMPRESSION.md) · 🇧🇬 [bg](../../../bg/docs/compression/RTK_COMPRESSION.md) · 🇧🇩 [bn](../../../bn/docs/compression/RTK_COMPRESSION.md) · 🇨🇿 [cs](../../../cs/docs/compression/RTK_COMPRESSION.md) · 🇩🇰 [da](../../../da/docs/compression/RTK_COMPRESSION.md) · 🇩🇪 [de](../../../de/docs/compression/RTK_COMPRESSION.md) · 🇬🇷 [el](../../../el/docs/compression/RTK_COMPRESSION.md) · 🇪🇸 [es](../../../es/docs/compression/RTK_COMPRESSION.md) · 🇪🇪 [et](../../../et/docs/compression/RTK_COMPRESSION.md) · 🇮🇷 [fa](../../../fa/docs/compression/RTK_COMPRESSION.md) · 🇫🇮 [fi](../../../fi/docs/compression/RTK_COMPRESSION.md) · 🇫🇷 [fr](../../../fr/docs/compression/RTK_COMPRESSION.md) · 🇮🇪 [ga](../../../ga/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [gu](../../../gu/docs/compression/RTK_COMPRESSION.md) · 🇳🇬 [ha](../../../ha/docs/compression/RTK_COMPRESSION.md) · 🇮🇱 [he](../../../he/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [hi](../../../hi/docs/compression/RTK_COMPRESSION.md) · 🇭🇷 [hr](../../../hr/docs/compression/RTK_COMPRESSION.md) · 🇭🇺 [hu](../../../hu/docs/compression/RTK_COMPRESSION.md) · 🇦🇲 [hy](../../../hy/docs/compression/RTK_COMPRESSION.md) · 🇮🇩 [id](../../../id/docs/compression/RTK_COMPRESSION.md) · 🇳🇬 [ig](../../../ig/docs/compression/RTK_COMPRESSION.md) · 🇮🇹 [it](../../../it/docs/compression/RTK_COMPRESSION.md) · 🇯🇵 [ja](../../../ja/docs/compression/RTK_COMPRESSION.md) · 🇬🇪 [ka](../../../ka/docs/compression/RTK_COMPRESSION.md) · 🇰🇭 [km](../../../km/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [kn](../../../kn/docs/compression/RTK_COMPRESSION.md) · 🇰🇷 [ko](../../../ko/docs/compression/RTK_COMPRESSION.md) · 🇱🇹 [lt](../../../lt/docs/compression/RTK_COMPRESSION.md) · 🇱🇻 [lv](../../../lv/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [ml](../../../ml/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [mr](../../../mr/docs/compression/RTK_COMPRESSION.md) · 🇲🇾 [ms](../../../ms/docs/compression/RTK_COMPRESSION.md) · 🇲🇹 [mt](../../../mt/docs/compression/RTK_COMPRESSION.md) · 🇲🇲 [my](../../../my/docs/compression/RTK_COMPRESSION.md) · 🇳🇵 [ne](../../../ne/docs/compression/RTK_COMPRESSION.md) · 🇳🇱 [nl](../../../nl/docs/compression/RTK_COMPRESSION.md) · 🇳🇴 [no](../../../no/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [or](../../../or/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [pa](../../../pa/docs/compression/RTK_COMPRESSION.md) · 🇵🇭 [phi](../../../phi/docs/compression/RTK_COMPRESSION.md) · 🇵🇱 [pl](../../../pl/docs/compression/RTK_COMPRESSION.md) · 🇵🇹 [pt](../../../pt/docs/compression/RTK_COMPRESSION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/RTK_COMPRESSION.md) · 🇷🇴 [ro](../../../ro/docs/compression/RTK_COMPRESSION.md) · 🇷🇺 [ru](../../../ru/docs/compression/RTK_COMPRESSION.md) · 🇱🇰 [si](../../../si/docs/compression/RTK_COMPRESSION.md) · 🇸🇰 [sk](../../../sk/docs/compression/RTK_COMPRESSION.md) · 🇸🇮 [sl](../../../sl/docs/compression/RTK_COMPRESSION.md) · 🇷🇸 [sr](../../../sr/docs/compression/RTK_COMPRESSION.md) · 🇸🇪 [sv](../../../sv/docs/compression/RTK_COMPRESSION.md) · 🇰🇪 [sw](../../../sw/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [ta](../../../ta/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [te](../../../te/docs/compression/RTK_COMPRESSION.md) · 🇹🇭 [th](../../../th/docs/compression/RTK_COMPRESSION.md) · 🇹🇷 [tr](../../../tr/docs/compression/RTK_COMPRESSION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/RTK_COMPRESSION.md) · 🇵🇰 [ur](../../../ur/docs/compression/RTK_COMPRESSION.md) · 🇺🇿 [uz](../../../uz/docs/compression/RTK_COMPRESSION.md) · 🇻🇳 [vi](../../../vi/docs/compression/RTK_COMPRESSION.md) · 🇳🇬 [yo](../../../yo/docs/compression/RTK_COMPRESSION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/RTK_COMPRESSION.md)

---

RTK 压缩是 OmniRoute 面向命令的终端及工具输出压缩引擎。它专为编码智能体会话而设计；在此类会话中，大部分上下文增长来自测试日志、构建输出、包管理器噪声、Shell 记录、Docker 输出、git 输出和堆栈跟踪。

RTK 可以通过 `defaultMode: "rtk"` 直接运行，也可以作为堆叠管线的第一步，通常为：

```txt
rtk -> caveman
```

此顺序会先压缩嘈杂的机器输出，然后让 Caveman 精简剩余的文本。

上游 RTK 报告称，命令输出可节省 `60-90%`。其 README 中的示例会话从约 `~118,000` 个标准 token 降至约 `~23,900` 个 RTK token，即节省 `79.7%`（约 `~80%`）。OmniRoute 使用该上游平均值，与 Caveman 输入压缩一起计算堆叠节省率：

```txt
RTK 平均值：       节省 80%
Caveman 输入：     节省 46%
堆叠：             1 - (1 - 0.80) * (1 - 0.46) = 节省 89.2%
范围：             1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

## 压缩内容

内置目录目前包含 49 个过滤器，涵盖以下类别：

| 类别      | 示例                                                          |
| --------- | ------------------------------------------------------------- |
| `git`     | `git status`、`git branch`、`git diff`、`git log`             |
| `test`    | Vitest、Jest、Pytest、Playwright、Go 测试、Cargo 测试         |
| `build`   | TypeScript、ESLint、Biome、Prettier、Vite、Webpack、Turbo、Nx |
| `package` | `npm install`、`npm audit`、`pip`、`uv sync`、Poetry、Bundler |
| `shell`   | `ls`、`find`、`grep`、通用 Shell 日志                         |
| `docker`  | `docker ps`、Docker 日志                                      |
| `infra`   | Terraform、OpenTofu、`systemctl status`                       |
| `generic` | JSON 输出、堆栈跟踪、通用输出后备方案                         |

`open-sse/services/compression/engines/rtk/commandDetector.ts` 中的检测器会在选择过滤器之前对输出进行分类。当命令类别不足以进行匹配时，过滤器还可以通过命令模式或输出正则表达式进行匹配。

## 过滤器解析

RTK 按以下顺序加载过滤器：

1. 来自 `.rtk/filters.toml` 和 `.rtk/filters.json` 的项目过滤器，但仅在受信任时加载。
2. 来自 `DATA_DIR/rtk/filters.toml` 和 `DATA_DIR/rtk/filters.json` 的全局过滤器。
3. 来自 `open-sse/services/compression/engines/rtk/filters/` 的内置过滤器。

在同一作用域内，RTK TOML schema v1 过滤器的优先级高于 OmniRoute JSON 过滤器。TOML `match_command` 表达式会先于命令类型匹配进行检查，因此导入的命令专用过滤器可以覆盖该作用域内更宽泛的过滤器。无论文件格式如何，项目作用域的优先级始终高于全局作用域。

项目过滤器特意设置了信任门控，因为正则表达式过滤器可以改变向智能体展示工具输出的方式。满足以下任一条件时，项目过滤器文件会被接受：

- `rtkConfig.trustProjectFilters` 为 `true`。
- 已设置 `OMNIROUTE_RTK_TRUST_PROJECT_FILTERS=1`。
- `.rtk/trust.json` 包含与项目过滤器文件匹配的 SHA-256 哈希值。

信任文件示例：

```json
{
  "filtersSha256": "0123456789abcdef...",
  "filtersTomlSha256": "fedcba9876543210..."
}
```

这些哈希值彼此独立：`filtersSha256` 信任 `.rtk/filters.json`，而 `filtersTomlSha256` 信任 `.rtk/filters.toml`。编辑任一文件只会使其自身的信任条目失效。全局文件由管理员安装，并沿用现有的全局过滤器信任行为。

自定义过滤器可以是单个过滤器对象，也可以是过滤器对象数组。无效的自定义过滤器会被跳过，并由 `/api/context/rtk/filters` 诊断报告。无效的内置过滤器会立即导致失败。

## RTK TOML schema v1 兼容性

OmniRoute 可以使用 RTK TOML schema v1 解析、验证、测试和安装声明式过滤器文件。
支持的字段包括 `description`、`match_command`、`strip_ansi`、`filter_stderr`、
`strip_lines_matching`、`keep_lines_matching`、`replace`、`match_output`、`truncate_lines_at`、
`head_lines`、`tail_lines`、`max_lines`、`on_empty`，以及 `[[tests.<filter>]]` 内联测试。
存在未知字段、无效或不安全的正则表达式、同时使用剔除/保留规则、文件大小超过
1 MiB 或引用未知过滤器的文件将被拒绝。内联测试失败的文件可以进行验证以供检查，
但无法安装或加载。自定义文件加载失败时仍采用失败开放策略：跳过无效文件，其余过滤器继续工作。

OmniRoute 在客户端已捕获工具输出后才接收该输出，因此 `filter_stderr = true`
无法改变进程捕获行为。该字段会被接受但不执行任何操作，验证会返回警告。
这里特意将其描述为 **RTK TOML schema v1 兼容性**，而非与 RTK 可执行文件、
shell 钩子、Rust 命令实现或其信任存储布局完全兼容。

仪表板的高级 RTK 视图接受粘贴或上传的 TOML。验证操作为只读。
安装时会以原子方式将文件写入 `DATA_DIR/rtk/filters.toml`，设置严格的权限，
并实时刷新过滤器目录，无需重启。替换现有文件需要明确的 `overwrite`
确认，并会先创建 `DATA_DIR/rtk/filters.toml.bak`。

## 过滤器 DSL

过滤器使用 [压缩规则格式](./COMPRESSION_RULES_FORMAT.md) 中描述的 JSON schema。
运行时按以下顺序应用这些阶段：

```txt
stripAnsi -> filterStderr -> replace -> matchOutput -> 丢弃/包含行
  -> truncateLineAt -> head/tail/maxLines -> onEmpty
```

重要字段：

| 字段                         | 用途                                  |
| ---------------------------- | ------------------------------------- |
| `rules.stripAnsi`            | 在匹配前移除终端颜色/控制序列         |
| `rules.filterStderr`         | 在匹配/过滤前规范化常见的 stderr 前缀 |
| `rules.replace`              | 按顺序应用正则表达式替换              |
| `rules.matchOutput`          | 当输出与已知条件匹配时返回简洁摘要    |
| `rules.matchOutput[].unless` | 存在错误/失败模式时跳过快捷处理       |
| `rules.dropPatterns`         | 移除干扰性内容行                      |
| `rules.includePatterns`      | 优先保留可操作的内容行                |
| `rules.collapsePatterns`     | 折叠重复的匹配行                      |
| `rules.deduplicate`          | 按过滤器选择启用：折叠连续重复行      |
| `rules.truncateLineAt`       | 以 Unicode 安全的方式截断每一行       |
| `rules.onEmpty`              | 所有行均被过滤掉时显示的回退消息      |
| `tests[]`                    | 验证门禁使用的内联样例                |

内置过滤器应包含内联 `tests[]` 样例。自定义过滤器也应包含这些样例，
尤其是在跨项目共享时。

## 行去重（两层）

RTK 在两个相互独立的层级合并重复行：

1. **每个过滤器的 `deduplicate`（可选启用，默认为 `false`）。** 过滤器可以设置 `rules.deduplicate: true`
   以在截断之前，合并_该过滤器匹配输出中_连续的重复行。
   此操作在 `lineFilter.ts` 内执行。对于旧版过滤器，如果过滤器定义了
   `collapsePatterns`，则会自动启用此功能。模式：`deduplicate: z.boolean().default(false)`，位于
   `open-sse/services/compression/engines/rtk/filterSchema.ts`。
2. **引擎级 `deduplicateThreshold`（默认为 `3`）。** 所有过滤器运行完毕后，引擎会在整个结果中合并
   任意由 `>= deduplicateThreshold` 个相同连续行组成的序列
   （`deduplicateRepeatedLines`，应用于 `engines/rtk/index.ts`）。标准化时，该值会被限制在 2–100 之间。

每个过滤器的处理会先运行（在过滤器内部），引擎级处理最后运行（针对拼接后的
输出），因此两者可以组合使用，而不会重复计数。

## 行分组（`enableGrouping`）

当 `rtkConfig.enableGrouping` 为 `true`（默认为 `false`）时，RTK 会对去重后的结果额外执行一次 `groupSimilarLines`
处理，以合并由_近似等价_（而非逐字节相同）的连续行组成的序列。`rtkConfig.groupingThreshold`（默认为 `3`）是触发
分组所需的最小序列长度。它在结构上与 `deduplicateThreshold` 相对应：去重处理完全相同的重复项，
分组处理“结构相同但存在细微差异”的项。这两个标志均属于持久化在 `key_value` 表中的 `rtkConfig` JSON
的一部分（请参阅上面的“配置”），因此设置在重启后仍会保留。

## 代码注释移除（`stripCodeComments` / `preserveDocstrings`）

启用 `rtkConfig.applyToCodeBlocks` 后，RTK 还可以从围栏代码块中移除注释：

- `stripCodeComments`（默认为 `false`）— 可选启用。设为 `true` 时，RTK 会移除 JavaScript
  和 TypeScript 围栏代码块中的注释。过去该标志会被读取但从未实际应用，因此默认值仍为
  “保留”，以避免在生产环境中引入未明示的变更。
- `preserveDocstrings`（默认为 `true`）— 移除注释时，保留 JSDoc/`/** … */` 块注释
  （它们承载的 API 文档价值高于其占用的字节成本）。将其设为 `false` 也可移除
  这些注释。

注释移除功能在 `open-sse/services/compression/engines/rtk/codeStripper.ts` 中实现。它使用
**TypeScript 解析器**（而非正则表达式），因此绝不会将字符串、模板和正则表达式字面量误判为
注释；检测到 JSX 时，它会完全中止处理（因此绝不会破坏 JSX 表达式容器中的注释）。
注释移除目前**仅适用于 JavaScript 和 TypeScript**——移除器的 `CodeLanguage` 集合中的其他
语言（Python、Rust、Go、Ruby、Java）会进行空行和空白字符合并，但不会移除注释。经过移除处理的代码块会在
`rulesApplied` 中标记为 `rtk:code-strip`。

> **注意——GCF / 表格编码属于独立引擎。** RTK **不**包含“GCF”
> （Graph Compact Format，图紧凑格式）表格化/列式 JSON 编码器。该编码器取代了较旧的
> `omni-tabular` 编码器，位于 **headroom** 引擎中
> （`open-sse/services/compression/engines/headroom/`，内置编解码器位于
> `headroom/gcf/`）。它与此处记录的 RTK 过滤器流水线无关。

## 配置

全局设置可通过 `/api/settings/compression` 获取。RTK 专用设置也可通过
`/api/context/rtk/config` 获取。

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

`enabledFilters` 和 `disabledFilters` 使用过滤器 ID，例如 `test-vitest` 或 `git-diff`。

完整的 `rtkConfig` 结构由
`open-sse/services/compression/types.ts` 中的 `RtkConfig` / `DEFAULT_RTK_CONFIG` 定义。整个对象作为单一 JSON 值持久化到
SQLite 的 `key_value` 表中，其中 `namespace = "compression"`、`key = "rtkConfig"`
（`src/lib/db/compression.ts`），并在读取时由 `normalizeRtkConfig` 进行规范化。因此，以下每个字段
——包括 `enableGrouping`、`groupingThreshold`、`stripCodeComments` 和 `preserveDocstrings`——
都会通过同一存储进行往返读写，并在重启后保留。

| 键                     | 默认值  | 用途                                                           |
| ---------------------- | ------- | -------------------------------------------------------------- |
| `deduplicateThreshold` | `3`     | 引擎级：要折叠的最少连续相同行数（范围为 2–100）               |
| `enableGrouping`       | `false` | 可选启用：折叠连续且近似等价的行                               |
| `groupingThreshold`    | `3`     | 触发分组所需的最少连续相似行数                                 |
| `stripCodeComments`    | `false` | 可选启用：从围栏代码块中移除注释（需启用 `applyToCodeBlocks`） |
| `preserveDocstrings`   | `true`  | 移除注释时保留 JSDoc/`/** … */` 块                             |

## API

| 路由                               | 方法 | 用途                                |
| ---------------------------------- | ---- | ----------------------------------- |
| `/api/context/rtk/config`          | GET  | 读取 RTK 配置                       |
| `/api/context/rtk/config`          | PUT  | 更新 RTK 配置                       |
| `/api/context/rtk/filters`         | GET  | 列出过滤器目录和加载诊断信息        |
| `/api/context/rtk/import`          | POST | 验证或安装 RTK TOML schema v1 文件  |
| `/api/context/rtk/test`            | POST | 预览单个文本有效负载的 RTK 压缩结果 |
| `/api/context/rtk/raw-output/[id]` | GET  | 读取已保留且经过脱敏的原始输出      |
| `/api/compression/preview`         | POST | 预览任意压缩模式                    |

RTK 测试有效负载：

```json
{
  "command": "npm test",
  "text": "FAIL tests/example.test.ts\nAssertionError: expected true\nTest Files 1 failed",
  "config": {
    "intensity": "standard"
  }
}
```

压缩预览有效负载：

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

管理路由需要仪表板管理身份验证或匹配的 API 密钥策略。

RTK TOML 验证有效负载：

```json
{
  "action": "validate",
  "content": "schema_version = 1\n\n[filters.my-tool]\nmatch_command = \"^my-tool\\\\b\"\nmax_lines = 20\n"
}
```

使用 `"action": "install"` 在全局安装已验证的文件。仅在检查并确认替换现有全局文件后，
才添加 `"overwrite": true`。

## 原始输出恢复

RTK 通常仅返回压缩后的文本。为便于调试，`rawOutputRetention` 可以保留经过脱敏的原始输出：

| 值         | 行为                                      |
| ---------- | ----------------------------------------- |
| `never`    | 不保留原始输出                            |
| `failures` | 仅保留可能表示失败的输出                  |
| `always`   | 对每个压缩后的 RTK 原始输出进行脱敏后保留 |

保留的文件写入以下目录：

```txt
DATA_DIR/rtk/raw-output/
```

持久化前会对机密信息进行脱敏，包括常见的 bearer token、API 密钥、Slack token、
AWS 访问密钥，以及赋值形式的 `token=...`、`secret=...`、`password=...` 值。分析数据
仅存储指针 ID、大小和哈希元数据。

## 验证门禁

聚焦验证门禁会运行内置的内联过滤器测试，而不会通过 shell 调用外部命令：

```bash
node --import tsx/esm --test tests/unit/compression/rtk-verify.test.ts
```

更全面的 RTK 门禁为：

```bash
node --import tsx/esm --test \
  tests/unit/compression/rtk-*.test.ts \
  tests/unit/compression/pipeline-integration.test.ts \
  tests/unit/compression/context-compression-api.test.ts
```

发布前请运行完整的压缩门禁：

```bash
node --import tsx/esm --test \
  tests/unit/compression/*.test.ts \
  tests/golden-set/*.test.ts \
  tests/integration/compression-pipeline.test.ts \
  tests/unit/api/compression/compression-api.test.ts
```

## 扩展 RTK

1. 添加或更新过滤器 JSON 文件。
2. 至少包含一个能够证明关键行为的 `tests[]` 示例。
3. 对于新的命令系列，请在 `tests/unit/compression/fixtures/rtk/` 下添加夹具。
4. 引入新的输出类别时，请添加命令检测覆盖。
5. 运行验证门禁和完整的 RTK 门禁。
6. 如果过滤器仅用于当前项目，请提交 `.rtk/filters.json`，并且仅在审核后刷新 `.rtk/trust.json`。

---

## 强度级别 (v3.8.16+)

RTK 支持 **3 个强度级别**，用于在**压缩激进程度**与**安全性**之间进行权衡。该级别通过引擎配置中的 `config.intensity` 设置。

### 3 个级别

| 级别               | 截断阈值       | token 节省量 | 风险 | 最适合                     |
| ------------------ | -------------- | ------------ | ---- | -------------------------- |
| `minimal`          | 每个分段 24 行 | ~20-40%      | 极低 | 具有关键上下文的生产环境   |
| `standard`（默认） | 每个分段 24 行 | ~50-70%      | 低   | 日常编码会话               |
| `aggressive`       | 每个分段 16 行 | ~70-90%      | 中等 | 长会话、最大程度节省 token |

### 截断发生的位置

截断阈值会影响 `lineFilter.ts`：

```ts
// 来自 open-sse/services/compression/engines/rtk/index.ts:329-330
config.intensity === "aggressive" ? 16 : 24,
config.intensity === "aggressive" ? 16 : 24,
```

每个分段的**开头**和**结尾**都会保留；触发截断时，中间内容会被丢弃。

### 保留与截断的内容

| 内容                 | minimal | standard | aggressive |
| -------------------- | ------- | -------- | ---------- |
| 错误 / 堆栈跟踪      | ✅ 保留 | ✅ 保留  | ✅ 保留    |
| 测试失败             | ✅ 保留 | ✅ 保留  | ✅ 保留    |
| 构建错误             | ✅ 保留 | ✅ 保留  | ✅ 保留    |
| 测试通过（详细输出） | ✅ 保留 | 🟡 折叠  | 🟡 折叠    |
| 常规输出（信息日志） | 🟡 折叠 | 🟡 折叠  | ❌ 丢弃    |
| 进度条               | 🟡 折叠 | ❌ 丢弃  | ❌ 丢弃    |
| 横幅 / ASCII 艺术字  | 🟡 折叠 | ❌ 丢弃  | ❌ 丢弃    |

### 选择合适的强度

```
                  丢失上下文是否会造成灾难性后果？
                  │
      ┌───────────┼───────────┐
      │           │           │
     是           否         不确定
      │           │           │
      ▼           │           │
   minimal        │           │
      │           │           │
      │           ▼           ▼
      │      吞吐量有多      先尝试 `standard`
      │      重要？          （适用于 80% 的
      │           │          情况）
      │      ┌────┴────┐
      │      │         │
      │     低         高
      │      │         │
      │      ▼         ▼
      │   standard   aggressive
      │      │         │
      └──────┴─────────┘
```

### 配置强度

**按组合配置**（在组合配置中）：

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

**通过编程方式**：

`rtkEngine`（`@omniroute/open-sse/services/compression/engines/rtk`）是一个
`CompressionEngine`，且没有 `updateConfig` 方法。请改为通过注册表辅助函数
更新引擎配置：

```ts
import { updateEngineConfig } from "@omniroute/open-sse/services/compression/engines/registry";

updateEngineConfig("rtk", { intensity: "aggressive" });
```

### 验证效果

使用**验证门禁**（见下文）确认过滤器在所选强度下是安全的：

```ts
import { runRtkFilterTests } from "omniroute/compression/engines/rtk/verify";

const result = runRtkFilterTests({ intensity: "aggressive" });
if (!result.passed) {
  console.error("过滤器在 aggressive 强度下未通过");
}
```

---

## 自定义过滤器开发 (v3.8.16+)

`engines/rtk/filters/` 目录包含 **49+ 个内置过滤器 JSON 文件**。你可以添加自己的过滤器，以压缩默认过滤器未覆盖的自定义工具输出。

### 过滤器模式 (Zod)

```ts
{
  "id": "string",                      // 必填。过滤器标识符（kebab-case，例如 "python-traceback"）
  "label": "string",                   // 必填。人类可读的过滤器名称
  "description": "string",             // 可选（默认值："String"）。过滤器功能的简短描述
  "category": "git|test|build|shell|docker|package|infra|cloud|generic",
  "priority": number,                  // 可选（0-100，默认值：50）。执行顺序（数值越高越先执行）
  "match": {
    "commands": ["string"],            // 要匹配的命令名称（例如 "python"、"pytest"）
    "patterns": ["string"],            // 用于匹配输出的正则表达式模式
    "outputTypes": ["string"]          // 检测到的输出类别（例如 "test-failure"）
  },
  "rules": {
    "stripAnsi": boolean,              // 可选（默认值：false）。移除 ANSI 颜色代码
    "replace": [                       // 查找和替换规则（默认值：[]）
      { "pattern": "regex", "replacement": "..." }
    ],
    "matchOutput": [                   // 模式匹配时短路处理（默认值：[]）
      {
        "pattern": "regex",
        "message": "short summary",
        "unless": "regex"              // 如果此模式匹配，则跳过
      }
    ],
    "includePatterns": ["string"],     // 要保留的行（正则表达式模式，默认值：[]）
    "dropPatterns": ["string"],        // 要删除的行（正则表达式模式，默认值：[]）
    "collapsePatterns": ["string"],    // 要折叠为单次出现的行（默认值：[]）
    "deduplicate": boolean,            // 可选（默认值：false）。删除重复行
    "truncateLineAt": number,          // 可选（默认值：0）。将行截断到最大字符数
    "maxLines": number,                // 可选（默认值：0）。总行数硬性上限
    "headLines": number,               // 可选（默认值：20）。保留匹配输出的前 N 行
    "tailLines": number,               // 可选（默认值：20）。保留匹配输出的后 N 行
    "onEmpty": "string",               // 可选（默认值："String"）。所有行都被过滤时的后备消息
    "filterStderr": boolean            // 可选（默认值：false）。同时过滤 stderr 输出
  },
  "preserve": {
    "errorPatterns": ["string"],       // 必须始终保留的模式（默认值：[]）
    "summaryPatterns": ["string"]      // 最终摘要行的模式（默认值：[]）
  },
  "tests": [                           // 用于验证的内联测试（默认值：[]）
    {
      "name": "string",               // 必填。测试名称
      "input": "sample output",        // 必填。示例输入文本
      "expected": "expected output",   // 必填。预期的压缩输出
      "command": "optional command"    // 可选。命令上下文
    }
  ]
}
```

### 示例：Python 回溯过滤器

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

### 加载自定义过滤器

将文件放置在可识别的位置：

```
~/.omniroute/rtk/filters/my-filter.json     # 用户级
<project>/.rtk/filters/my-filter.json      # 项目级
```

过滤器会在启动时通过 `open-sse/services/compression/engines/rtk/filterLoader.ts` 中的 `loadRtkFilters()` 自动加载。加载器会从以下位置发现过滤器：

- 内置目录：`open-sse/services/compression/engines/rtk/filters/`
- 用户目录：`~/.omniroute/rtk/filters/`
- 项目目录：`<project>/.rtk/filters/`

要以编程方式加载过滤器：

```ts
import { loadRtkFilters } from "@omniroute/open-sse/services/compression/engines/rtk/filterLoader";

// 选项：customFiltersEnabled（加载用户/项目过滤器，默认启用）、
// trustProjectFilters、refresh。
const filters = loadRtkFilters({ customFiltersEnabled: true });
```

### 验证

过滤器在加载时会根据 Zod 模式进行验证。结构错误的过滤器将加载失败，并记录错误：

```
RTK_FILTER_LOADER: filter "my-filter" failed validation:
  - rules.replace.0.pattern: Invalid regex
  - match.commands: must not be empty
```

要验证所有已安装的过滤器，请调用从 `open-sse/services/compression/engines/rtk/verify.ts` 导出的 `runRtkFilterTests()`。

### 最佳实践

1. **始终包含 `tests[]`** — 它们可以证明过滤器有效，并防止回归
2. **使用 `matchOutput` 进行短路处理** — 如果单行就能说明情况，则替换整个代码块
3. **优先使用 `keep` 而不是 `strip`** — 明确的“始终保留”规则比“始终删除”更安全
4. **在所有 3 个强度级别进行测试** — `minimal` 应不执行任何操作，`aggressive` 仍应保留错误
5. **使用 `unless` 字段** — 使用“如果存在 X，则不触发”来保护短路逻辑

---

## 原始输出恢复与验证门禁

当 RTK 大幅压缩输出时，你可以**恢复原始文本**，用于调试、审计或重放。

### 原始输出恢复的工作原理

```
原始输出（10K 个 token）
        │
        ▼
RTK 压缩（rawOutput.enabled=true）
        │
        ├─▶ 压缩后的输出（2K 个 token）  ──▶ 发送至 LLM
        │
        └─▶ 原始输出（10K 个 token）     ──▶ 存储在数据库中
                                                  （通过 request_id 关联）
```

### 启用原始输出存储

**按请求启用**（在组合配置中）：

```json
{
  "compression": {
    "engine": "rtk",
    "intensity": "aggressive",
    "rawOutput": {
      "enabled": true,
      "maxBytes": 1048576 // 上限为 1MB
    }
  }
}
```

**默认值**：`rawOutput.enabled: false`（可节省存储空间）。

### 存储成本

| 每个请求           | 上限 1MB    | 上限 10MB    |
| ------------------ | ----------- | ------------ |
| 平均压缩输出       | ~5KB        | ~5KB         |
| 存储的原始输出     | ~50-500KB   | ~500KB-5MB   |
| 每天 1000 个请求时 | 50-500MB/天 | 500MB-5GB/天 |

> **建议**：仅在**调试会话**或**抽样审计**期间启用原始输出，不要始终开启。

### 恢复原始输出

```ts
import { readRtkRawOutput } from "omniroute/compression/engines/rtk/rawOutput";

const raw = readRtkRawOutput(pointerId); // pointerId 来自压缩统计信息
if (raw) {
  console.log("Original output:", raw);
}
```

压缩后，`pointerId` 会在 `CompressionStats.rtkRawOutputPointers[]` 中返回。
有关函数签名，请参阅 `open-sse/services/compression/engines/rtk/rawOutput.ts:102`。

### 验证门禁

**RTK 过滤器验证**（`open-sse/services/compression/engines/rtk/verify.ts`）会根据各过滤器的 `tests[]` 对其进行验证，并确保在全部 3 个强度级别下行为均正确。

**调用 `runRtkFilterTests()`** 以运行验证：

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

**验证内容**：

1. 每个过滤器都能加载并通过模式验证
2. 每个 `tests[]` 条目都能生成预期输出
3. `minimal` 强度不执行任何操作（保留原始内容，仅应用结构过滤器）
4. `aggressive` 强度会保留错误、测试失败信息和堆栈跟踪
5. 压缩后的输出绝不会大于原始输入

- 源代码：`open-sse/services/compression/engines/rtk/`（63 个文件，约 70KB）

- **合并过滤器更改之前** — 始终确保测试通过
- **升级 RTK 引擎之后** — 模式可能已发生变化
- **在监控中定期执行** — 防止测试固件发生偏移
- **添加新的工具/命令系列时** — 证明新过滤器能够正常工作

---

## 另请参阅

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — 完整的压缩管线概述
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — 引擎注册表和内置引擎
- [EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md) — 自定义引擎、语言包和堆叠管线
- 源代码：`open-sse/services/compression/engines/rtk/`（63 个文件，约 70KB）
