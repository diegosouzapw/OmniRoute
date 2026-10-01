# Compression Engines (中文 (简体))

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_ENGINES.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_ENGINES.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇦 [bs](../../../bs/docs/compression/COMPRESSION_ENGINES.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_ENGINES.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_ENGINES.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_ENGINES.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_ENGINES.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_ENGINES.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_ENGINES.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_ENGINES.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_ENGINES.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_ENGINES.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_ENGINES.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_ENGINES.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_ENGINES.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_ENGINES.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_ENGINES.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_ENGINES.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_ENGINES.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_ENGINES.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_ENGINES.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_ENGINES.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_ENGINES.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_ENGINES.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_ENGINES.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_ENGINES.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_ENGINES.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_ENGINES.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_ENGINES.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_ENGINES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_ENGINES.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_ENGINES.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_ENGINES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_ENGINES.md)

---

OmniRoute 压缩围绕引擎契约构建。一个模式可以直接运行一个引擎
（`caveman` 或 `rtk`），也可以运行按顺序执行多个引擎的确定性堆叠管线。

## 模式

| 模式         | 引擎路径                                                                              | 预期输入                           |
| ------------ | ------------------------------------------------------------------------------------- | ---------------------------------- |
| `off`        | none                                                                                  | 精确的提示词保留                   |
| `lite`       | Caveman lite helpers                                                                  | 低风险的常驻清理                   |
| `standard`   | Caveman                                                                               | 自然语言提示词精简                 |
| `aggressive` | Caveman + history/tool summarizers                                                    | 长对话会话                         |
| `ultra`      | Caveman + pruning helpers                                                             | 上下文限制恢复                     |
| `rtk`        | RTK                                                                                   | 终端、shell、构建、测试和 Git 输出 |
| `omniglyph`  | OmniGlyph                                                                             | 原生提供者线路上的图像化上下文     |
| `stacked`    | Pipeline. The request default is `session-dedup -> lite`. `rtk -> caveman` is opt-in. | 混合工具日志和散文，最大程度节省   |

### OmniGlyph 压缩配置文件

`omniglyph` 引擎（包 `omniglyph`，1.4.0+）接受一个命名的语义配置文件，可以通过压缩设置中的 `omniglyph.profile` 进行全局设置，也可以通过堆叠管道的步骤配置为每个步骤单独设置：

| 配置文件      | 边界                                                           |
| ------------- | -------------------------------------------------------------- |
| `aggressive`  | 默认。已发布收据所衡量的策略——图像系统、工具文档和密集历史记录 |
| `balanced`    | 保持实时状态原生，保护最后 8 轮对话，折叠较旧的已关闭历史记录  |
| `coding-safe` | 保持权限、工具模式和实时工具输出原生，保护最后 12 轮对话       |
| `passthrough` | 不进行转换地路由；引擎被跳过                                   |

配置文件是**上限，而非下限**：包中的 `mergeCompressionProfileOptions` 不允许调用者覆盖重新打开配置文件已关闭的有损通道，因此在 `coding-safe` 下，每步的 `preserveSystemPrompt: false` 无法重新启用系统压缩。

在此代码库上测量：`coding-safe` 和 `balanced` 将 `minCompressChars` 提高到最大值，并保持系统、工具模式和工具结果原生，因此尚未积累历史记录的会话会在 `below_min_chars` 处停止，引擎不会进行任何转换。这就是为什么默认是 `aggressive` 而不是最安全的配置文件。

该包从其环境配置中解析自己的模型范围和配置文件。OmniRoute 从不委托决策：适配器将模型门限制在包最严格的范围内，因此主机环境设置只能缩小允许列表，而不能将其扩展到超出 OmniRoute 测量的收据范围。

## 引擎注册表

注册表位于 `open-sse/services/compression/engines/registry.ts`。引擎提供统一的契约：

- `id`：稳定的引擎 ID，例如 `caveman` 或 `rtk`
- `apply(text, config)`：堆叠管线使用的旧版执行路径
- `compress(input, config)`：返回文本和统计信息的主要执行路径
- `getConfigSchema()`：返回有效配置的类似 JSON Schema 的结构
- `validateConfig(config)`：返回 `{ valid, errors[] }`

注册使用 `registerCompressionEngine(engine)`（高级场景也可使用 `registerEngine`），接受引擎前会调用 `assertValidEngine()` 和 `validateConfig(defaultConfig)`。
使用 `unregisterCompressionEngine(id)` 可在运行时移除引擎。

`strategySelector.ts` 会在运行压缩之前注册内置引擎。这样，预览、运行时压缩、堆叠模式、测试和未来新增的引擎都可以使用相同的执行路径。

### MCP 描述压缩（相关）

另一个独立的注册表会在注册表层级压缩 MCP 工具描述元数据——请参阅
`open-sse/mcp-server/descriptionCompressor.ts` 和 [MCP-SERVER.md](../frameworks/MCP-SERVER.md)。它复用了
Caveman 规则，但处理的是工具元数据，而不是请求载荷。

### 其他内置引擎

除了 Caveman、RTK 和 LLMLingua-2，该注册表还附带了若干专用的无损 /
结构化引擎（供堆叠管线、playground 和测试使用）：

| 引擎          | ID              | 功能                                                                                                                          |
| ------------- | --------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| CCR           | `ccr`           | Content-Compress-Retrieve（H4）：将较大的连续文本块替换为内容寻址引用，使重复或大型文本块只需发送一次，后续即可通过引用使用。 |
| headroom      | `headroom`      | SmartCrusher（H3 + N5）：将同构 JSON 数组载荷无损压缩成列式 `[N rows]` 形式。                                                 |
| ionizer       | `ionizer`       | 对非常大的同构块进行头部、中部和尾部行采样，并将省略的中间部分存储为 CCR 内容寻址引用。                                       |
| session-dedup | `session-dedup` | 基于内容寻址的跨轮次去重（受 TokenMizer 启发）：省略同一会话中之前轮次已经出现过的文本。                                      |

**CCR 检索协议指令（#8033）：** 当 CCR 首次在请求中替换 ≥1 个块时，
引擎会在前面添加一条幂等的 `system` 消息（以 `[CCR protocol]` 哨兵开头），
向调用方说明标记 → 工具契约：`[CCR retrieve hash=<24hex> chars=N]` 标记的含义、
哈希值必须逐字复制（全部 24 个十六进制字符——错误复制哈希值很可能是出现
“找不到块”问题的原因），以及 `[dedup:ref sha=...]` 标记表示“回看历史记录”，
而不是“调用工具”。仅当调用方声明的 `tools[]` 证明它确实能够访问
`omniroute_ccr_retrieve` 时，才会注入该说明（参见
`open-sse/services/compression/engines/ccr/protocolInstruction.ts` 中的
`callerSupportsCcrRetrieve()`）——不具备该工具的普通 OpenAI 兼容调用方绝不会收到
要求其调用无法访问的工具的指令。注入前会通过扫描消息历史记录来查找该哨兵，
从而保证幂等性，因此多轮请求（会重放先前的消息）不会在每一轮都重复添加该说明。

## Caveman

Caveman 模式专注于对普通文本进行语义浓缩：

- 保留代码块、URL、JSON、路径和结构化数据
- 移除填充内容、模糊措辞、重复上下文和冗长的连接性表达
- 支持 `open-sse/services/compression/rules/` 中针对不同语言的文件规则包
- 仍可通过旧版 `standard`、`aggressive` 和 `ultra` 模式使用

控制面板入口为 `Dashboard -> Context & Cache -> Caveman`。

Caveman 上游报告称，输出 token 数量减少约 `~75%`，基准测试中的平均输出节省率为 `65%`，
范围为 `22-87%`；其输入压缩工具可节省约 `~46%`。OmniRoute 在说明叠加式提示词/上下文节省效果时，
采用 Caveman 的输入侧数据；Caveman 输出模式仍是一项独立的响应行为功能。

## RTK

RTK 模式专注于命令和工具输出：

- 检测多种输出类别，例如 `git status`、`git branch`、`git diff`、Vitest/Jest/Pytest、
  Cargo/Go 测试、TypeScript/Vite/Webpack 构建、ESLint、npm 审计/安装、Docker 日志、
  shell `find`/`grep`、堆栈跟踪和通用日志
- 应用 `open-sse/services/compression/engines/rtk/filters/` 中的 49 个 JSON 过滤器
- 支持 RTK 风格的声明式管道：ANSI 清除、替换、匹配输出短路、
  行删除/保留、逐行截断、头部/尾部/最大行数截断，以及空结果回退
- 支持 `.rtk/filters.json` 中受信任机制约束的项目过滤器，以及
  `DATA_DIR/rtk/filters.json` 中的全局过滤器
- 清除 ANSI 序列、进度噪声、重复行和无用的样板内容
- 保留可操作的失败信息、警告、摘要、已更改文件和尾部上下文
- 可选择保留经过脱敏的原始输出，以便通过已认证的管理路由进行恢复/调试

控制面板入口为 `Dashboard -> Context & Cache -> RTK`。

有关自定义过滤器、信任、验证和原始输出恢复的操作详情，请参阅
[`RTK_COMPRESSION.md`](./RTK_COMPRESSION.md)。

RTK 上游报告称，命令输出压缩可节省 `60-90%`。其 README 示例显示，一次
30 分钟的 Claude Code 会话从约 `~118,000` 个 token 降至约 `~23,900` 个，节省 `79.7%`。

## LLMLingua-2（语义剪枝）

LLMLingua-2 模式使用小型 ONNX token 分类器对文本执行**语义 token 剪枝**，
作为基于规则的 Caveman 和 RTK 引擎的补充：

- 仅压缩非系统消息中的文本；带围栏的代码块和其他受保护结构绝不会被修改
- 在工作线程中运行 `@atjsh/llmlingua-2` 后端（通过 `@huggingface/transformers` 使用 ONNX），
  因此模型推理绝不会阻塞请求事件循环
- **支持叠加**（`stackPriority` 35）：在叠加管道中，它在结构化引擎
  （CCR、session-dedup、headroom、Caveman）之后、`ultra` 之前运行，因为语义剪枝
  对已完成结构化压缩的文本最有效——例如
  `rtk -> caveman -> llmlingua`
- **遇到任何错误时均以开放方式失败**（缺少可选依赖、工作线程启动失败、模型加载失败、推理失败
  或超时）→ 原始文本将原样返回，绝不会返回错误

引擎位置：`open-sse/services/compression/engines/llmlingua/`。控制面板入口
为 `Dashboard -> Context & Cache -> LLMLingua`。

### 模型

默认模型为 **TinyBERT**（`atjsh/llmlingua-2-js-tinybert-meetingbank`，约 57 MB，
速度快）。可通过引擎配置的 `model` 字段使用精度更高的 **BERT-base** 模型
（`Arcoldd/llmlingua4j-bert-base-onnx`，约 710 MB）。首次调用时，
`@huggingface/transformers` 会从 HuggingFace Hub 延迟下载所选模型，并将其保存到
`${DATA_DIR}/models/llmlingua`（`modelStore.ts`）；也可通过 `modelPath` 配置覆盖项
将其指向本地副本（适用于离线/隔离网络安装）。

### 可选依赖与按需安装

可裁剪的 LLMLingua 运行时对等依赖栈是**可选的**。`package.json` 中将两个包声明为
`optionalDependencies`，并由生产构建保持为**外部依赖**
（`scripts/build/prepublish.ts` 不会将其打包）：

| 软件包               | 版本（固定） | 说明                           |
| -------------------- | ------------ | ------------------------------ |
| `@atjsh/llmlingua-2` | `2.0.5`      | 入口包；将其他包声明为对等依赖 |
| `js-tiktoken`        | `^1.0.20`    | 分词器                         |

`@huggingface/transformers` 固定为 `^4.2.0`（与本地嵌入路径共享，
并且也会被追踪到独立捆绑包中）；`@atjsh/llmlingua-2@2.0.5` 将其对等依赖范围设为
`"^3.5.2 || ^4.0.0"`，因此 Transformers.js v3 和 v4 均受支持。从 2.0.4 开始，
`@atjsh/llmlingua-2` 不再需要 `@tensorflow/tfjs`，从而移除了 SLM 栈中占用空间最大的
单一组成部分（TensorFlow.js）。只有上述两个包是可裁剪的 SLM 对等依赖。标准
`npm install`（开发环境）会自动安装可选依赖栈，除非明确省略可选依赖。

**按需安装的原因：**为了保持精简，通过 npm 发布的软件包、独立捆绑包和 Docker 镜像
均**不包含**这些依赖。如果缺少这些依赖，工作线程的依赖检查
（`worker.ts` 中的 `@atjsh/llmlingua-2` 解析探测）将失败，引擎会
**静默地以开放方式失败**——选择 LLMLingua 后不会执行任何操作（文本原样返回，
且不记录错误）。要在经过裁剪的环境中启用它，请安装可选依赖栈：

```bash
# 固定为 package.json optionalDependencies 中声明的版本
npm install @atjsh/llmlingua-2@2.0.5 js-tiktoken
```

移除 `@tensorflow/tfjs`（2.0.4+）后，不再包含此前占主导地位、约 800 MB 的组成部分——
剩余占用来自 transformers.js 和 onnxruntime-node 运行时，以及首次使用时下载
（而非通过 npm 下载）的 TinyBERT 模型（约 57 MB）。

各环境的情况如下：

- **开发环境 / `npm install`** — 除非传入了 `--omit=optional`
  （或 `--no-optional`），否则会自动安装。无需执行任何操作。
- **全局 npm（`npm i -g omniroute`）/ 独立安装** — 在已安装的软件包目录中运行上述安装命令，
  或重新安装且不要省略可选依赖项。
- **Docker** — 在派生镜像层中添加安装命令；发布的镜像
  为保持精简，默认不包含这些依赖项。
- **VPS（PM2）** — 将其安装到应用的 `node_modules` 中，然后重启进程，以便
  worker 重新探测门控条件。
- **原始 Next 独立构建（`npm run build` → `.build/next/standalone/server.js`）** —
  独立构建跟踪中既不包含 worker，也不包含可选依赖项，因此引擎会静默地以开放模式失效。
  `scripts/build/colocate-standalone.mjs` 会重新补充两者（worker esbuild +
  将可选依赖闭包纳入独立构建目录树）；每次构建后，它都会通过
  `postbuild` npm 钩子自动运行。该操作具有幂等性，并且会在依赖项缺失时软失败。

**验证其是否处于活动状态：** 选择 LLMLingua 后，实际文本会真正缩短（引擎
不再以开放模式失效），并且第一个请求会触发模型下载到
`${DATA_DIR}/models/llmlingua`。门控检查有意只探测 `@atjsh/llmlingua-2` —
其他对等依赖仅支持 ESM，即使已安装，对其调用 `require.resolve` 也会抛出异常 — 因此，
如果在 `import()` 时确实缺少任何对等依赖，worker 仍会以开放模式失效。

## 堆叠流水线

堆叠模式按顺序运行流水线步骤。默认顺序为：

```txt
rtk -> caveman
```

适用于提示词中同时包含命令输出以及用户或助手文本的编码智能体会话。RTK 首先减少冗长的工具日志，然后 Caveman 压缩剩余的自然语言。

流水线步骤可通过压缩设置中的 `stackedPipeline` 或压缩组合进行配置。

当两个引擎都对同一个符合条件的有效载荷进行压缩时，节省效果会叠加：

```txt
combined = 1 - (1 - RTK 节省率) * (1 - Caveman 输入节省率)
average  = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
range    = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

## MCP 无障碍树过滤器

MCP 无障碍树智能过滤器是一个执行后压缩层，它作用于 MCP **工具结果**，而非提示词或上下文。它专门处理由 Playwright、computer-use 和浏览器自动化 MCP 服务器等工具返回的冗长无障碍树和浏览器快照有效载荷。

### 功能

1. **噪声剔除** — 移除空的通用/文本条目（`- generic:`、`- text: ""`）
2. **同级折叠** — 当连续 ≥ `collapseThreshold`（默认值为 30）行属于结构性重复时，将其折叠为前 `collapseKeepHead`（默认值为 10）行 + 数量摘要 + 后 `collapseKeepTail`（默认值为 5）行
3. **引用保留** — Playwright/computer-use 所需的 `[ref=eXX]` 锚点绝不会被修改
4. **硬截断** — 如果折叠后的文本仍超过 `maxTextChars`（默认值为 50,000），则进行截断并附加导航提示，以便智能体继续工作

### 引擎位置

```txt
open-sse/services/compression/engines/mcpAccessibility/
  index.ts            ← smartFilterText() 入口点
  collapseRepeated.ts ← 同级折叠算法
  constants.ts        ← DEFAULT_MCP_ACCESSIBILITY_CONFIG
```

### 配置

由全局设置中的 `compression.mcpAccessibility` 控制（迁移 056）。默认配置：

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

该过滤器仅应用于 `type` 为 `"text"` 且长度超过 `minLengthToProcess` 的工具结果有效载荷。它不会影响提示词压缩或请求有效载荷。

### 预期节省率

对浏览器快照工具结果可节省 60–80%，具体取决于页面复杂度。折叠算法相对于行数的复杂度为 O(n)，增加的延迟可以忽略不计。

### 此过滤器与上述压缩引擎的比较

| 方面     | Caveman / RTK / Stacked | MCP 无障碍过滤器                       |
| -------- | ----------------------- | -------------------------------------- |
| 目标     | 请求提示词/上下文       | MCP 工具结果                           |
| 触发条件 | 压缩模式设置            | `compression.mcpAccessibility.enabled` |
| 作用范围 | 所有 SSE 消息           | 仅工具结果                             |
| 引用锚点 | 不适用                  | 无条件保留                             |

---

## 压缩组合

压缩组合是可分配给路由组合的命名压缩配置文件：

- `compression_combos`：存储模式、流水线、RTK 配置、语言配置和默认标记
- `compression_combo_assignments`：将压缩组合映射到路由组合
- 运行时集成会先解析已分配的压缩组合，再处理通用组合覆盖配置
- 分析数据包括 `compression_combo_id` 和 `engine`

控制面板入口：`控制面板 -> 上下文与缓存 -> 压缩组合`。

## API 接口

| 路由                                   | 用途                                         |
| -------------------------------------- | -------------------------------------------- |
| `/api/settings/compression`            | 全局压缩设置（包括 `mcpAccessibility` 配置） |
| `/api/compression/preview`             | 预览任意压缩模式                             |
| `/api/compression/language-packs`      | 列出可用的 Caveman 语言包                    |
| `/api/context/caveman/config`          | Caveman 设置别名                             |
| `/api/context/rtk/config`              | RTK 默认配置和设置                           |
| `/api/context/rtk/filters`             | RTK 过滤器目录                               |
| `/api/context/rtk/test`                | RTK 预览/测试端点                            |
| `/api/context/rtk/raw-output/[id]`     | 经过身份验证的脱敏原始输出恢复               |
| `/api/context/combos`                  | 压缩组合 CRUD                                |
| `/api/context/combos/[id]/assignments` | 路由组合分配 CRUD                            |
| `/api/context/analytics`               | 压缩分析别名                                 |

管理路由需要通过管理身份验证或 API 密钥策略检查。

## MCP 工具

压缩功能提供五种 MCP 工具：

| 工具                                | 作用域              | 用途                         |
| ----------------------------------- | ------------------- | ---------------------------- |
| `omniroute_compression_status`      | `read:compression`  | 设置、分析数据、缓存统计信息 |
| `omniroute_compression_configure`   | `write:compression` | 更新全局设置                 |
| `omniroute_set_compression_engine`  | `write:compression` | 设置模式和可选流水线         |
| `omniroute_list_compression_combos` | `read:compression`  | 列出压缩组合                 |
| `omniroute_compression_combo_stats` | `read:compression`  | 读取组合/引擎分析数据        |

## 范围与排除项

**嵌入向量永远不会被压缩。** `open-sse/handlers/embeddings.ts` 从不调用任何
压缩引擎——请求/响应正文会原样直接传递给执行器。
目前这是由结构决定的（嵌入向量和聊天补全由不同的处理程序处理），而不是
运行时检查，但这意味着 #8034 中的向量失真问题在嵌入向量路径中不存在暴露面。

**按模型/端点排除过滤器（#8034）。** 对于聊天补全，运维人员可以指定
绝不能压缩的模型 ID / `provider/model` 目标——如果以后压缩功能被接入到更靠近嵌入向量的路径，
这可作为一项有用的防护措施；此外，对于任何要求提示词逐字节精确一致的模型
（确定性评估、对缓存敏感的前缀等），这通常也很有用。

- 设置字段：全局压缩配置中的 `exclusions?: string[]`
  （`GET`/`PUT /api/settings/compression`），通过现有的 `key_value` 压缩
  命名空间（`src/lib/db/compression.ts`）持久化——无需新建表。
- 控制面板标签页：**控制面板 → 压缩 → 排除项**
  （`/dashboard/compression/exclusions`）。
- 模式语法：`*` 是唯一的通配符。模式中的其他所有正则表达式元字符都会在
  匹配前进行转义，因此 `gpt-5.6` 只匹配字面字符串，绝不会匹配 `gpt-5x6`
  （可防范 ReDoS、有界且无嵌套量词）。模式会以不区分大小写的方式同时匹配
  裸模型 ID 和 `provider/model` 组合——`gpt-5-6`、`openai/gpt-5-6`
  和 `openai/*` 均有效，而单独使用 `*` 会排除所有模型。
- 匹配：`open-sse/services/compression/exclusions.ts` 中的
  `isCompressionExcluded()` / `normalizeCompressionExclusions()`。`chatCore.ts` 在
  解析压缩设置之后、**任何引擎运行之前**检查被排除的目标，并将匹配情况
  完全视同全局禁用压缩——可证明请求正文在逐字节层面完全相同。该跳过操作通过
  `writeCompressionSkip(..., "excluded")` 记录，以便在分析数据中查看。
- 默认值（列表为空/不存在）：与 #8034 之前的行为相同——不排除任何内容。

## 已知限制

- **LLMLingua-2 (SLM) 要求可选依赖位于同一位置。** 仅当 `@atjsh/llmlingua-2` 及其对等依赖被放置到
  `dist/node_modules` 中时，工作线程才能在生产构建中运行（参见 `scripts/build/colocateOptionals.mjs`、#4286）。如果缺少这些依赖，
  引擎将采用故障开放策略（返回原始文本）。工作线程的解析不再依赖
  `import.meta.url`（它在独立捆绑包中会失效），而是以运行时的
  cwd / `argv[1]` 为基准。
- **Caveman 语言包 `de` / `fr` / `ja` 并不完整。** 它们包含 `context` +
  `filler` + `structural` 规则，但不包含 `dedup` / `ultra` 规则包，因此对于这些语言，`ultra` 强度
  并不高于 `full`（它们仅使用各自的规则，不会静默回退到英语的 `dedup`/`ultra` 规则，因为这会破坏外语文本）。
  `en` / `es` / `id` / `pt-BR` 是完整的。欢迎为不完整的语言包贡献 `dedup.json` + `ultra.json`。
- **堆叠遥测仅列出实际执行了压缩的引擎。** 如果堆叠流水线中的某个步骤运行了引擎但节省率为 0 %，
  则会返回 `stats:null`，因此不会出现在
  `engineBreakdown` 中——这与该步骤被跳过的情况无法区分。若要区分
  “已运行，0 %”与“已跳过”，需要更改明细模型，因此暂缓处理。

## 验证

此区域的重点关卡是：

```bash
node --import tsx/esm --test tests/unit/compression/rtk-*.test.ts tests/unit/compression/pipeline-integration.test.ts tests/unit/compression/context-compression-api.test.ts
node --import tsx/esm --test tests/unit/compression/*.test.ts tests/golden-set/*.test.ts tests/integration/compression-pipeline.test.ts tests/unit/api/compression/compression-api.test.ts
node --import tsx/esm --test tests/unit/compression/mcpAccessibility*.test.ts
npm run typecheck:core
```
