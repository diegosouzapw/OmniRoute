# 🗜️ Prompt Compression Guide — OmniRoute (中文 (简体))

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_GUIDE.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_GUIDE.md)

---

> 自动节省符合条件的上下文的 15-95%。如需快速概览，请参阅 [README 压缩章节](../README.md#%EF%B8%8F-prompt-compression--save-15-95-eligible-tokens-automatically)。

## 概述

OmniRoute 实现了一套模块化提示词压缩管线，会在请求到达上游提供者之前**主动**运行。这意味着可以透明地节省令牌，而无需更改现有工作流。

```
客户端请求
  → 压缩策略选择器
    → 是否有组合覆盖设置？→ 使用组合设置
    → 是否达到自动触发阈值？→ 使用自动模式
    → 是否有默认模式？→ 使用全局设置
    → 是否关闭？→ 跳过压缩
  → 选定的压缩模式
    → 关闭：不压缩
    → 轻量：安全清理空白和格式（约 15%）
    → 标准：移除电报式表达中的冗余内容（约 30%）
    → 激进：历史记录老化 + 摘要（约 50%）
    → 超强：启发式剪枝 + 精简代码块（约 75%）
    → RTK：命令感知的终端/工具输出过滤（上游节省范围为 60-90%）
    → 堆叠：有序多引擎管线，通常先运行 RTK，再运行 Caveman（符合条件的内容节省范围为 78-95%）
  → 压缩后的请求 → 提供者
```

---

## 压缩模式

### 关闭

不应用压缩。所有消息均原样传递。

### 轻量模式（节省约 15%，延迟 <1ms）

最安全的模式——语义零变化，仅清理格式：

| 技术                     | 说明                       |
| ------------------------ | -------------------------- |
| `collapseWhitespace`     | 合并连续空行并移除行尾空格 |
| `dedupSystemPrompt`      | 移除重复的系统消息         |
| `compressToolResults`    | 压缩冗长的工具/函数输出    |
| `removeRedundantContent` | 删除重复的指令             |
| `replaceImageUrls`       | 缩短 base64 图像数据 URI   |

**最适合：** 始终启用的场景、安全关键型工作流。

### 标准模式（节省约 30%）

灵感来自 [Caveman](https://github.com/JuliusBrussee/caveman)——在保留含义的同时移除填充词和冗长表达：

- 移除填充词（“please”“I think”“basically”“actually”）
- 精简冗长短语（“in order to”→“to”，“as a result of”→“because”）
- 移除礼貌性的委婉表达（“Would you mind...”“If you could possibly...”）
- 30 多条针对编码提示词优化的正则表达式规则

**最适合：** 日常编码工作流、注重成本的团队。

### 激进模式（节省约 50%）

针对长会话的智能历史记录管理：

- **消息老化**——对越早的消息进行越深度的压缩
- **工具结果压缩**——截断或省略过长的工具输出（保留首尾行、
  按匹配行过滤、压缩 JSON 键）
- **结构完整性防护**——确保 `tool_use` + `tool_result` 对保持一致
- **上下文窗口感知**——遵循各模型的令牌限制

**最适合：** 长时间调试会话、大型代码库。

### 超强模式（节省约 75%）

面向令牌高度受限场景的最大压缩：

- **启发式剪枝**——基于评分对文本进行令牌剪枝
- **结构保留**——使用占位标记暂存带围栏的代码块、行内代码、URL 和标识符，并逐字重新拼接，绝不剪枝
- **可选 SLM 层级**——配置后，可使用小型本地模型优化剪枝
- 独立于激进模式：不会运行消息老化、工具结果压缩
  或后备摘要器（只有 SLM 层级失败时，才可能通过
  激进模式执行后备处理）

**最适合：** 反复达到上下文限制的情况。

### RTK 模式（上游节省范围为 60-90%）

RTK 模式针对编码代理会话中出现的冗长工具输出进行了优化：

- 检测命令/输出类别，例如 `git status`、`git diff`、`git log`、测试运行器、
  TypeScript/Vite/Webpack 构建、ESLint/Biome/Prettier、npm 审计/安装、Docker 日志、基础设施
  输出和通用 shell 输出
- 应用来自 `open-sse/services/compression/engines/rtk/filters/` 的 JSON 过滤器包
- 从项目或全局 `filters.toml` 文件导入 RTK TOML schema v1 过滤器，并进行内联测试
  验证和项目文件信任门控
- 随附 55 个内置过滤器及内联验证样例
- 移除 ANSI 控制序列、进度条、重复行和无操作价值的噪声
- 保留失败信息、错误、警告、已更改文件、摘要以及长输出的末尾部分
- 支持受信任门控约束的项目过滤器、全局过滤器，以及可选的脱敏原始输出恢复

**最适合：** 包含 shell、构建、测试、git、grep 和文件输出记录的代理会话。

### 堆叠模式（符合条件的内容节省范围为 78-95%）

堆叠模式以确定性顺序运行多个压缩引擎。默认管线为：

```txt
RTK -> Caveman
```

此顺序先压缩终端/工具输出，再对
剩余的自然语言提示词应用 Caveman 语义精简。堆叠管线可以进行全局配置，也可以通过
分配给路由组合的压缩组合进行配置。

**最适合：** 同时包含大量工具日志以及人工指令或助手摘要的混合上下文。

---

## 上游节省量计算

OmniRoute 记录了来自两个来源的压缩节省量：上游项目基准测试和 OmniRoute 自身的引擎组合。

| 来源    | 此处使用的上游 README 数据                                                                         |
| ------- | -------------------------------------------------------------------------------------------------- |
| Caveman | 输出 token 减少 `~75%`，基准测试平均输出节省 `65%`，范围为 `22-87%`，输入压缩工具的压缩率为 `~46%` |
| RTK     | 命令输出节省 `60-90%`；示例会话从 `~118,000` 个 token 降至 `~23,900` 个，节省 `79.7%`（`~80%`）    |

对于重叠的工具/上下文负载，OmniRoute 默认组合会依次叠加使用这些引擎：

```txt
RTK -> Caveman
```

组合节省量按乘法计算，而非加法：

```txt
组合节省量 = 1 - (1 - RTK 节省量) * (1 - Caveman 输入节省量)
平均值     = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
范围       = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

当 RTK 和 Caveman 都能压缩同一输入/上下文负载时，`78-95%` 这一数据才适用。Caveman 的响应输出模式是独立的：启用后，应采用 Caveman 自身的输出节省量（平均 `65%`、标称 `~75%`、范围 `22-87%`）。总计费节省量取决于提示词与输出的占比。

### “符合条件”的实际含义

标称的 15-95% 范围是真实的，但它仅适用于**冗余或啰嗦的**内容——例如重复的错误行、反复刷出相同警告的构建日志，或过大的 `grep`/文件读取转储。这**并不**意味着每个请求都能节省这么多。

实证验证（`tests/unit/compression/stacked-compression-tool-result-savings.test.ts`）：对一个包含 300 行相同错误信息、采用 Anthropic 格式的 `tool_result` 块执行 `stacked`（RTK + Caveman）处理后，取得了 **95.93% 的 token 节省率 / 96.26% 的字符节省率**——完全落在宣传的范围内。但对正常、非冗余的工具输出（整洁的 `grep` 匹配列表、简短的文件读取结果、普通对话文本）运行同一管线时，节省量几乎为零，这是正确的结果，因为其中没有可移除的重复内容，而且 `validateCompression()`（`validation.ts`）会拒绝输出任何可能丢弃或更改代码块、URL、标题、版本号或全大写常量标识符的改写结果。

这是符合预期的安全行为，并非缺陷：即使已完全启用压缩，以读取或检索整洁文件为主的编码会话，其总体节省量也会比较有限；而遇到失败循环或输出繁杂的 linter 时，会针对相关流量达到完整的 78-95% 节省范围。不要把单个会话较低的总体节省百分比当作压缩配置错误的证据——应先检查底层工具输出实际上是否存在冗余。

---

## Token 节省量可视化

```
不使用压缩：    向 LLM 发送 47K 个 token
使用 Lite：     发送 40K 个 token          （节省 15% — 安全、始终启用）
使用 Standard： 发送 33K 个 token          （节省 30% — caveman-speak 规则）
使用 Aggressive：发送 24K 个 token         （节省 50% — 老化 + 摘要）
使用 Ultra：    发送 12K 个 token          （节省 75% — 启发式剪枝）
使用 RTK：      发送 19K-5K 个 token       （命令/工具输出节省 60-90%）
使用 Stacked：  发送 10K-2.5K 个 token     （符合条件的 RTK+Caveman 内容节省 78-95%）
```

---

## 配置

### 仪表板

前往 `Dashboard → Context & Cache`：

- **Caveman** — 模式选择、语言包、预览和全局默认值
- **RTK** — 命令过滤器预览、RTK 安全设置和过滤器目录
- **Compression Combos** — 分配给路由组合的命名引擎管线
- **Auto-Trigger Threshold** — 当 token 数量超过阈值时自动启用压缩

### 按组合覆盖

在 `Dashboard → Context & Cache → Compression Combos` 中，将压缩组合分配给一个路由组合：

```txt
组合: "free-tier-fallback"
  压缩组合: "coding-agent-stack"
  管线: RTK -> Caveman
  目标:
    1. if/kimi-k2.7-code
    2. if/qwen3.8-max-preview
```

这样，你可以在免费/编程服务提供者上使用堆叠压缩，同时在付费订阅上保持精简模式。

此“按组合覆盖”分配与**路由组合压缩模式**覆盖是不同的控制项（Default/Off/Lite/Standard/Aggressive/Ultra/Codex Responses——该字段的 schema 也接受 `rtk`、`stacked` 和 `omniglyph`）——后者不会选择命名的压缩组合管线；它只会设置由 `resolveCompressionPlan` 读取的 `compressionMode` 字段。它既可以在组合卡片（`Dashboard → Combos`）上设置，也可以从 #6760 起，在 `Dashboard → Context & Cache → Compression Combos` 的“Assign to routing”列表中，紧邻上述管线分配复选框，针对每个路由组合进行设置。两个界面的设置都通过同一个 `PUT /api/combos/{id}` 端点持久化。

### 按请求覆盖

发送 `x-omniroute-compression` 请求标头，可针对单个请求覆盖压缩计划。它具有最高优先级——优先于路由组合覆盖、活动配置文件、自动触发和面板中的 Default。未知值将被忽略（请求绝不会因此被拒绝），并且全局主开关仍控制所有压缩功能：当全局关闭压缩时，无法通过该标头将其开启。可用值：

| 值            | 效果                                                                        |
| ------------- | --------------------------------------------------------------------------- |
| `off`         | 不对此请求进行压缩。                                                        |
| `default`     | 使用面板派生的 Default 配置文件（忽略活动配置文件）。有损引擎保持关闭。     |
| `safe`        | 与省略该标头相同：仅执行去重和空白折叠。                                    |
| `allow-lossy` | 保留此请求的操作员计划，包括摘要、相关性过滤器和样式重写。                  |
| `engine:<id>` | 启用时使用单个引擎，例如 `engine:rtk`。这是针对该引擎的按请求选择启用方式。 |
| `<combo>`     | 命名组合：先按名称匹配（不区分大小写），再按 id 匹配。                      |

如果未指定 `allow-lossy`、`engine:<id>` 或命名组合，则不会应用有损引擎。启用压缩时，请求仍会进行会话去重和空白折叠。

所应用的计划会通过 `X-OmniRoute-Compression: <mode>; source=<source>` 响应标头返回，其中 `<source>` 是 `request-header`、`routing-override`、`active-profile`、`auto-trigger`、`default` 或 `off` 之一。

### API

```bash
# 获取压缩设置
curl http://localhost:20128/api/settings/compression

# 更新压缩设置
curl -X PUT http://localhost:20128/api/settings/compression \
  -H "Content-Type: application/json" \
  -d '{"defaultMode":"stacked","autoTriggerMode":"stacked","autoTriggerTokens":32000}'

# 预览特定的 RTK/stacked 载荷
curl -X POST http://localhost:20128/api/compression/preview \
  -H "Content-Type: application/json" \
  -d '{"mode":"rtk","messages":[{"role":"tool","content":"npm test output here"}]}'

# 列出 RTK 过滤器包
curl http://localhost:20128/api/context/rtk/filters

# 使用可选的命令元数据直接测试 RTK
curl -X POST http://localhost:20128/api/context/rtk/test \
  -H "Content-Type: application/json" \
  -d '{"command":"npm test","text":"FAIL tests/example.test.ts\nError: boom"}'
```

---

## 受保护的内容

压缩引擎**始终保留：**

- ✅ 代码块（围栏式和行内）
- ✅ URL 和文件路径
- ✅ JSON 结构和结构化数据
- ✅ 标识符和受保护的技术令牌
- ✅ 数学表达式
- ✅ 工具/函数调用定义
- ✅ 系统提示词（在 Lite 模式下）

在持久化任何内容之前，RTK 原始输出恢复功能会隐去常见的 API 密钥、Bearer 令牌、Slack 令牌、AWS 访问密钥、密码、令牌和密钥。

---

## 压缩统计信息

每个压缩后的请求都会在服务器日志中包含统计信息：

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

## 阶段路线图

| 阶段    | 模式                                                                                                                    | 状态      |
| ------- | ----------------------------------------------------------------------------------------------------------------------- | --------- |
| 阶段 1  | 关闭、Lite                                                                                                              | ✅ 已发布 |
| 阶段 2  | Standard、Aggressive、Ultra                                                                                             | ✅ 已发布 |
| 阶段 3  | RTK、Stacked、压缩组合                                                                                                  | ✅ 已发布 |
| 阶段 4  | 输出样式、SLM 级 Ultra、评估工具                                                                                        | ✅ 已发布 |
| 阶段 4C | 自适应上下文预算（“旋钮”）——计算引擎 + API（`PUT /api/settings/compression` 上的 `contextBudget`）+ 仪表板模式/策略控件 | ✅ 已发布 |

---

## 致谢

Standard 模式的压缩规则受 **[JuliusBrussee](https://github.com/JuliusBrussee)**（⭐ 51K+）开发的 **[Caveman](https://github.com/JuliusBrussee/caveman)** 启发——这是爆火的“能用更少令牌解决问题，为何要用更多令牌”项目。Caveman 报告称，其输出令牌减少约 `~75%`，基准测试平均输出节省 `65%`，输出节省范围为 `22-87%`，输入压缩工具的压缩率约为 `~46%`。

RTK 模式受 **[RTK AI](https://github.com/rtk-ai)** 开发的 **[RTK - Rust Token Killer](https://github.com/rtk-ai/rtk)** 启发——这是一个面向终端、构建、测试、git 和工具输出过滤的高性能命令输出压缩项目。RTK 报告称可节省 `60-90%`，其 README 示例会话显示节省了约 `~80%`。

---

## 高级压缩系统

除上述 7 种模式外（源代码还接受 `codex-responses` 和 `omniglyph` 模式，但本指南不作介绍），以下各节涵盖在这些模式内部或与其配合使用的功能：工具结果压缩和渐进式老化是 Aggressive 引擎的第 1 步和第 2 步（用于 Aggressive 模式以及堆叠流水线中的 `aggressive` 步骤）；堆叠流水线是 Stacked 模式的运行方式；启用压缩时，缓存感知压缩会针对缓存提供者将 `aggressive` 和 `ultra` 降级为 `standard`；而 Caveman 输出模式和输出样式则是默认关闭的可选系统提示词指令，它们用于塑造模型的输出，而不是压缩请求。

### 缓存感知压缩

某些提供者（例如支持提示词缓存的 Anthropic）支持**提示词缓存**，允许它们缓存提示词的部分内容，以降低成本和延迟。启用缓存后，激进压缩实际上可能会**损害**性能，因为它会更改已缓存的令牌，导致缓存失效。

`cachingAware.ts` 模块通过**检测缓存上下文**并相应地**调整压缩策略**来解决此问题。

#### 工作原理

1. **检测缓存上下文** — 扫描请求体中的 `cache_control` 标记
2. **识别缓存提供者** — 检查目标提供者是否支持缓存
3. **调整策略** — 针对缓存提供者，将 `aggressive`/`ultra` 降级为 `standard`
4. **跳过系统提示词** — 系统提示词通常会被缓存，因此不要压缩它们

策略辅助函数还会返回一个 `deterministicOnly` 标志，但计划构建器只使用策略——目前下游没有任何内容读取该标志。

#### 代码示例

```ts
import {
  detectCachingContext,
  getCacheAwareStrategy,
} from "@omniroute/open-sse/services/compression/cachingAware";

const body = {
  model: "anthropic/claude-sonnet-4.5",
  messages: [{ role: "user", content: "Hello" }],
  cache_control: { type: "ephemeral" }, // ← 缓存标记
};

const ctx = detectCachingContext(body, { provider: "anthropic" });
// → { hasCacheControl: true, provider: "anthropic", targetFormat: null, isCachingProvider: true }

const strategy = getCacheAwareStrategy("aggressive", ctx);
// → { strategy: "standard", skipSystemPrompt: true, deterministicOnly: true }
```

#### 使用时机

缓存感知压缩**始终启用**——无需配置。只要启用了压缩并且目标提供者支持提示词缓存（Anthropic、OpenAI 等），它就会生效；不要求显式提供 `cache_control` 标记——仅缓存提供者本身就会触发降级，而仅有标记永远不会触发降级（标记检测用于缓存遥测，而非策略决策）。

### 渐进式老化

长对话会累积许多消息轮次，但较早的轮次会逐渐变得不那么相关。`progressiveAging.ts` 模块会**根据轮次距离降低消息的保真度**（距离从对话末尾开始计算）。使用发布时的默认值（`verbatim: 2, light: 2, moderate: 3`）：

- **最近 2 轮（距离 ≤ 2）**：原样保留
- **距离 3**：穴居人式压缩（移除填充词）
- **距离 4+**：总结助手消息；用户消息缩减为第一行，最多 120 个字符；其他角色保持不变。无论距离如何，系统提示词、已经老化的消息以及最新用户消息始终原样保留。不会直接丢弃任何内容；使用随附的默认值时，`light` 分段不可达（`light` 等于 `verbatim`）。

#### 代码示例

```ts
import { applyAging } from "@omniroute/open-sse/services/compression/progressiveAging";

const messages = [
  { role: "system", content: "You are a helpful assistant" },
  { role: "user", content: "What is 2+2?" },
  { role: "assistant", content: "4" },
  // ……另外 50 轮……
];

const { messages: aged, saved } = applyAging(messages, {
  verbatim: 3, // 最近 3 轮：原样保留
  light: 8, // 距离 <= 8：轻量压缩
  moderate: 20, // 距离 <= 20：穴居人式压缩
  fullSummary: 5, // 类型要求提供，但分段代码不会读取
  // 距离 > 20：总结（助手）/ 保留第一行（用户）
});

// saved = 节省的 token 数量
```

#### 何时使用

渐进式老化在 `aggressive` 模式下**始终启用**——它是 `compressAggressive()` 的第 2 步。Ultra 模式不会运行它。它尤其适用于：

- 长时间运行的编码会话
- 跨越多天的对话
- 包含大量工具调用的智能体工作流

### 穴居人输出模式

穴居人输出模式会添加**系统提示词指令**，要求模型自身生成简洁输出——`lite` 级别要求使用保留完整句子的简明回答，`full` 要求其“像聪明的穴居人一样简短作答”，而 `ultra` 则要求使用电报式输出；指令只能提出要求，无法保证实际效果。请求通过 `applyOutputStyles()`（`open-sse/services/compression/outputStyles/apply.ts`）接收这些指令：`open-sse/handlers/chatCore.ts` 首先使用向后兼容适配层（`open-sse/services/compression/outputStyles/backCompat.ts` 中的 `resolveOutputStyleSelection()`）解析选择；当 `outputStyles` 为空时，该适配层会将已启用的 `cavemanOutputMode` 映射为 `cavemanOutputMode.intensity` 强度下的 `terse-prose` 输出样式（参见下文“向后兼容”）；非空的 `outputStyles` 选择会按原样使用，此时 `cavemanOutputMode.enabled` 和 `intensity` 不再生效，但其 `autoClarity` 开关仍然适用。`outputMode.ts` 包含指令文本（`CAVEMAN_INSTRUCTION_BY_LANGUAGE`）、内容绕过逻辑以及注入时使用的位置辅助函数；它自身的 `applyCavemanOutputMode()` 注入器没有生产环境调用方。

#### 工作原理

此模式不会压缩输入。它会向系统提示词添加一个指令块（参见下文“注入的工作原理”），随后仍会在此时已包含该指令块的正文上运行针对请求所选的任何输入压缩模式。在每个级别末尾共有的边界条款之前，英文 `full` 级别的内容如下：

> “像聪明的穴居人一样简短作答。省略冠词（a/an/the）、填充词（just/really/basically/actually/simply）、客套话和模糊措辞。可以使用句子片段。使用简短的同义词（用 big 而不是 extensive，用 fix 而不是 implement）。准确保留所有技术实质、代码、错误、URL 和标识符。”

它尤其适用于：

- 代码生成（输出越简洁 = token 越少）
- 快速问答（无需详尽解释）
- 批量处理（最大化吞吐量）

#### 何时使用

穴居人输出模式是**可选启用**的。启用压缩（`enabled: true`，即“压缩设置”页面上的主开关）后，通过 `cavemanOutputMode.enabled` 将其打开；`intensity` 可选择 `lite`、`full` 或 `ultra`：

```json
{
  "enabled": true,
  "cavemanOutputMode": {
    "enabled": true,
    "intensity": "full"
  }
}
```

压缩组合的 **Output Mode** 开关（`outputMode`，级别位于 `outputModeIntensity` 中）会针对该组合适用的请求设置同一开关，而 `omniroute_set_compression_engine` MCP 工具会通过其布尔型 `outputMode` 参数写入该设置。非空的 `outputStyles` 选择优先于此开关。在仪表板中，启用 **Terse prose** 输出样式会注入相同的指令块（参见下文“输出样式”）。

### 输出样式（目录）

上文的穴居人输出模式是**旧版单样式路径**。第 4 阶段将其泛化为一个可组合输出样式目录：`open-sse/services/compression/outputStyles/catalog.ts` 中的 `OUTPUT_STYLE_CATALOG`。每种样式都是一条系统提示词指令，要求模型自身生成成本更低的输出；可以同时启用多种样式，并按目录顺序注入。

| 样式                       | `id`          | 功能                                                                                                                                                                                                | 指令语言                                      |
| -------------------------- | ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| 精简散文                   | `terse-prose` | 删除填充词、冠词和模糊措辞；精确保留技术实质。文本与旧版 caveman 输出模式相同（仅引用，不重复录入）。                                                                                               | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| 更少代码                   | `less-code`   | YAGNI 阶梯：采用能正常工作的最小改动，不引入未请求的抽象。                                                                                                                                          | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| 马尾辫（慵懒的资深开发者） | `ponytail`    | “最好的代码是从未写下的代码”：复用 > 重写，根因 > 症状，采用能正常工作的最短差异。                                                                                                                  | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| 我有 ADHD（行动优先）      | `i-have-adhd` | 行动优先（先给出命令/路径/代码片段，再给出说明），采用数量有限的编号步骤，只提供一个具体的下一步，不要前言/回顾/结束语。改编自 [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd)（MIT）。 | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| 精简 CJK（文言）           | `terse-cjk`   | `full`/`ultra` 使用文言文回答；`lite` 仅要求简短回答，不使用虚词、客套话或修饰语。                                                                                                                  | zh（受语言区域限制，见下文）                  |

每种样式均提供三个强度级别——`lite`、`full`、`ultra`——且每个级别均以共享边界条款（`outputMode.ts` 中的 `SHARED_BOUNDARIES`）结尾，该条款要求原样保留代码块、文件路径、命令、错误和 URL。`terse-prose` 和 `terse-cjk` 的级别文本还将标识符加入该列表。

`terse-cjk` 在两处仅限 `zh` 语言区域。仅当控制面板 UI 语言为中文（`zh-CN` 或 `zh-TW`）时，“压缩设置”页面才会显示其对应行；且仅当请求解析出的语言（参见下文“语言选择”）为 `zh` 时，`applyOutputStyles()` 才会注入该样式。隐藏该行不会清除已保存的 `terse-cjk` 选择：设置 API 接受任意样式 id，在页面上保存其他样式时也会保留它。请求处理期间，`applyOutputStyles()` 的语言检查是唯一的语言区域门控。

#### 注入方式

`applyOutputStyles()`（`open-sse/services/compression/outputStyles/apply.ts`）根据目录解析选择项（未知 id 和语言区域不匹配的样式会被丢弃，且绝不会报错；若选择项未解析出任何样式，则请求体保持不变，并以 `no_styles` 跳过），按照目录顺序拼接所选指令，附加一次边界条款（选择 `less-code` 或 `ponytail` 时，还会附加安全条款 `SAFETY_BOUNDARIES` 或其翻译），并以单个幂等标记（`[OmniRoute Output Styles]`）开始该区块，因此重复应用不会产生任何效果。当解析出的语言（参见下文“语言选择”）有相应翻译时，将注入本地化指令而非英文指令。

对于包含非空 `messages` 数组的请求体，幂等性检查先于内容绕过执行：当顶层 `system` 字段（字符串或内容块数组）或内容为字符串的系统消息中已存在 `[OmniRoute Output Styles]` 标记时，请求体将保持不变并记为 `already_applied`，且不会执行关键词检查。否则，内容绕过（`open-sse/services/compression/outputMode.ts` 中的 `shouldBypassCavemanOutputMode()`）会检查最后三条消息的文本，无论其角色为何；当文本匹配安全、不可逆操作或澄清关键词，或匹配以下对顺序敏感的序列时，将为整个轮次跳过这些样式：`first`、`then`、`after that`、`before`、`rollback` 或 `backup`，并且其后 240 个字符内出现 `delete`、`drop`、`migrate`、`deploy` 或 `release`。当 **Auto-Clarity Bypass** 开关（`cavemanOutputMode.autoClarity`，默认开启）处于开启状态时，会执行该绕过检查；关闭此开关后将跳过关键词检查。

当绕过检查允许该轮次继续时，`placeSystemInstruction()`（同一文件）绝不会新建 `messages[0]`，并会将该区块放置到按以下顺序找到的第一个位置：

1. 开头且内容为字符串的系统消息：将区块附加到其文本之后。
2. 顶层 `system` 字段：若其为字符串，则将区块附加到文本之后；若其为内容块数组，则添加为新的文本块。
3. 后续第一条内容为字符串的系统消息：将区块附加到其文本之后。
4. 以上均不存在：将区块放入 `messages` 末尾新建的系统消息中。

对于不含 `messages` 数组（或该数组为空）的请求体，不执行内容绕过，也不检查顶层 `system` 字段。若 `instructions` 字段为字符串，则将区块附加到其文本之后；除非该字段已包含 `[OmniRoute Output Styles]` 标记，此时请求体将保持不变并记为 `already_applied`。当请求体没有字符串类型的 `instructions` 字段，但包含 `input`（字符串或数组）时，该区块将成为 `instructions`，并替换该字段原有的任何非字符串值。既没有字符串类型的 `instructions` 字段，也没有字符串或数组类型的 `input` 的请求体将保持不变，并以 `no_messages` 跳过。

#### 如何启用

在仪表板中的 **Compression Context → Compression Settings**
（`/dashboard/context/settings`）页面，其 Output styles 部分会为每种样式显示一行，并提供开关和级别选择器。只要压缩本身处于开启状态（页面的主开关 `enabled`），样式就会被注入。**Auto-Clarity Bypass** 开关位于 **Caveman**
页面（`/dashboard/context/caveman`）的 **Output Mode** 卡片中。在程序层面，压缩配置会按以下格式持久化所选项：

```json
{
  "outputStyles": [
    { "id": "i-have-adhd", "level": "full" },
    { "id": "less-code", "level": "lite" }
  ]
}
```

向后兼容：当 `outputStyles` 为空时，旧版 `cavemanOutputMode.enabled`
设置会映射到 `terse-prose`，其级别为 `cavemanOutputMode.intensity`。该块随后以
`[OmniRoute Output Styles]` 标记开头，而旧版 `applyCavemanOutputMode()`
注入器写入的是 `[OmniRoute Caveman Output Mode]`。在该标记下方，文本与
en、pt-BR、es、de、fr、it、ru、id 和 vi 中的旧版注入内容一致；在 ja 和 zh 中，边界子句前会多出一个空格。`terse-prose` 已翻译为 pt-BR、es、de、
fr、it、ru、zh、ja、id 和 vi，因此，如果请求解析出的语言为 `hu`，它会获得英文文本，而旧版注入器使用的是匈牙利语文本。

输出样式的语言选择（`outputStyles/apply.ts` 中的
`resolveOutputStyleLanguage()`）：当 `languageConfig.enabled` 开启时，`autoDetect` 会从请求的 `messages` 数组中选取最近一条包含文本的用户消息（字符串内容，或其内容部分中的 `text`），并使用 Caveman 引擎的检测器
（`detectCompressionLanguage()`）进行检测。如果文本包含汉字但不包含假名，检测器会返回 `zh`；否则，它会返回 `it`、`pt-BR`、`es`、`de`、
`fr`、`ru`、`ja`、`hu` 和 `id` 中提示匹配数最多的语言；若没有任何匹配，则返回 `en`——无法分类的文本会使用英语，而不会使用 `defaultLanguage`，并且即使样式提供了 `vi` 文本，也永远不会检测为 `vi`。Responses API 请求体将其对话轮次保存在
`input` 中，而该字段不会被采样，因此它会先使用 `defaultLanguage`，然后回退到英语。当 `messages` 中没有任何包含文本的用户消息，或 `autoDetect` 关闭时，会先应用 `defaultLanguage`，然后回退到英语。当 `languageConfig.enabled` 关闭时，语言为英语——除非请求应用了压缩组合（分配给请求路由组合的压缩组合，或 chatCore 为内置堆叠管线回退使用的默认压缩组合）：应用组合会为该请求开启 `languageConfig.enabled`，并根据组合的语言包设置
`defaultLanguage`（如果已保存的值属于该组合的语言包，则使用该值；否则使用组合的第一个语言包，默认为 `en`），而已保存的 `autoDetect` 设置（默认开启）仍然适用。Caveman 输入引擎选择规则包语言的方式不同——它会按各个文本部分分别选择；当自动检测关闭时，还会受 `enabledPacks` 限制。

样式 × 语言矩阵由
`tests/unit/compression/output-styles-i18n-matrix.test.ts` 固定：目录中的每种样式都必须在测试的 `BASELINE_LANGUAGES` 中拥有对应条目；不受区域设置限制的样式必须提供 pt-BR 翻译（受区域设置限制的 `terse-cjk` 不受此规则约束），除非该样式列在 `KNOWN_ENGLISH_ONLY` 中；该列表只能包含完全没有任何翻译的样式——已列入其中但拥有任何翻译的样式都会导致测试失败；如果某种样式缺少其 `BASELINE_LANGUAGES` 条目中列出的任何语言，也会导致测试失败。要添加样式，请参阅
[EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md#adding-an-output-style)。

### 工具结果压缩

`open-sse/services/compression/toolResultCompressor.ts` 中的 `compressToolResult()`
使用 **5 种策略**压缩工具结果文本。它会按以下顺序尝试这些策略，第一个已启用且其检查与内容匹配的策略将决定结果：

1. **`fileContent`**：对于包含 3 行或更多行的内容，如果至少有一行在忽略
   行首缩进后，以 `import `、`export `、`function `、`class `、
   `const `、`let `、`var ` 或 `return ` 开头（关键字后加一个空格），或者以 `if`、
   `for` 或 `while` 开头且后接 `(` 或 ` (`，则保留其前 20 行和后 5 行，并标记
   中间被省略的部分。
2. **`grepSearch`**：对于至少包含一行 `<path>:<digits>:` 格式的内容，
   如果第一个冒号之前的文本不含空白字符，则仅保留这些行，最多保留 30 行，随后附上
   其余匹配项的数量和匹配文件的列表；其他所有行都会被丢弃。只需有一行符合这种格式
   即可触发该策略，因此，以时间戳开头的日志行（例如 `12:30:45`）也会被视为匹配。
3. **`shellOutput`**：如果输出包含 ANSI CSI 序列（`ESC[` 后接数字或
   分号，再接一个字母，如颜色代码），或者文本中的任何位置包含后接空白字符的 `$`，
   则会移除这些序列（其他转义序列会保留，例如 `ESC[?25l` 或 OSC 窗口标题序列），
   并保留最后 50 行，同时合并连续重复的行。由于此检查在 `json` 和 `errorMessage`
   之前运行，因此，包含此类 `$` 的 JSON 或错误输出在启用 `shellOutput` 时
   永远不会进入这些后续策略。
4. **`json`**：对于超过 2,000 个字符、在可选空白字符之后以 `{` 或 `[` 开头且
   能够成功解析的 JSON 载荷，会进行摘要处理：包含超过 7 个元素的数组会保留
   前 5 个和后 2 个元素以及元素总数；对象会保留前 20 个键，并将每个嵌套对象或
   数组值替换为 `{…N keys}` 占位符（对于数组，N 是其长度），同时添加
   `_remaining_<N>_keys` 标记，用于表示前 20 个键之后被丢弃的键数。
   标量值会被完整复制，因此，键数不超过 20 且不含嵌套值的对象只会被重新缩进——
   压缩成单行的对象反而会增加字符数，因此保持不变。
5. **`errorMessage`**：如果输出中的任何位置包含以下内容（不区分字母大小写）：
   `error:`、`error `（单词后接一个空格，例如 `no error found`）、`[error]`、
   `exception:`、`exception `、`[exception]` 或 `traceback`，则保留第一行、
   接下来的 10 行以及最后 3 行，并使用 `… [N frames elided] …` 标记替代
   它们之间的行。仅当第一行之后还有超过 13 行时才会出现该标记，因此，14 行或
   更少的错误输出不会被缩短（在总计 12 或 13 行时，最后 3 行会与已保留的行重复）。

某个策略一旦匹配，即使没有节省任何内容，也不会再尝试后续策略。当匹配策略没有节省
估算 token 数（长度 ÷ 4，向上取整）时——例如，类似代码的文件只有 25 行或更少，
或者超过 2,000 个字符的 JSON 数组只有 7 个或更少的元素——激进引擎会保留原始工具
结果：两个调用方（`compressAggressive()` 和 `compressAnthropicToolResultBlock()`）
都会在 `saved` 为 0 或更低时保留原始内容，而 `compressToolResult()` 本身仍会返回
该策略的输出。工具结果处理步骤并非最终处理：引擎的后备摘要器仍可缩短超过
8,192 个字符（`maxTokensPerMessage` 为 2,048，再乘以 4）的 `tool` 或 `function`
消息。

#### 何时使用

工具结果压缩是激进引擎的第 1 步（`open-sse/services/compression/aggressive.ts`
中的 `compressAggressive()`），因此它会在 Aggressive 模式以及堆叠管线的
`aggressive` 步骤中运行。它会压缩 OpenAI 格式的 `tool` 和 `function` 消息，
以及 Anthropic `tool_result` 块内的文本。每种策略在 `aggressive.toolStrategies`
下都有自己的开关，默认全部开启。在仪表板中，启用压缩且默认模式为 Aggressive 时，
这些开关位于 Caveman 页面的 **Advanced** 视图中。

### 堆叠管线

堆叠模式会**依次运行多个引擎**——通常先运行 RTK（可节省工具输出的 60-90%），
然后对剩余文本运行 Caveman（输入节省约 46%）。组合后可达到**符合条件内容节省
78-95% 的范围**（请参阅上文的 Upstream Savings Math）：
`1 - (1 - 0.60..0.90) × (1 - 0.46)`，平均值约为 89%。

#### 工作原理

```
输入（1000 个 token）
  → RTK（命令感知过滤器）→ 200 个 token
    → Caveman（移除填充内容）→ 108 个 token
  → 输出（108 个 token，节省约 89%）
```

#### 何时使用

以下情况适合使用堆叠模式：

- 大量使用工具的工作流（智能体编程、研究）
- 对成本敏感的批处理
- 需要最大限度节省 token 时

堆叠管线通过全局 `stackedPipeline` 压缩设置进行配置，或者通过分配给路由组合的
命名压缩组合进行配置（请参阅上文的 Per-Combo Override）——不能通过自动组合的
`modePack` 进行配置（该字段只会重新调整自动组合模型选择的权重，并且 `stacked`
不是有效的包名称）。

---

## 压缩组合覆盖

你可以**针对每个组合**覆盖全局压缩模式，以便针对不同的使用场景微调行为：

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

这适用于：

- **编码组合**：在长时间会话中使用 `aggressive` 模式
- **快速问答组合**：使用 `lite` 模式以获得快速响应
- **工具密集型组合**：使用 `stacked` 模式以最大限度地节省用量
- **生产环境组合**：对于缓存提供者，请关闭覆盖选项——始终启用的缓存感知调整会自动将 `aggressive`/`ultra` 降级为 `standard`（没有可选择的 `cache-aware` 模式）

---

## 另请参阅

- [环境配置](../reference/ENVIRONMENT.md) — 压缩环境变量
- [架构指南](../architecture/ARCHITECTURE.md) — 压缩管道内部机制
- [用户指南](../guides/USER_GUIDE.md) — 压缩入门
- [RTK 压缩](./RTK_COMPRESSION.md) — RTK 过滤器、信任模型、验证门控、原始输出恢复
- [压缩引擎](./COMPRESSION_ENGINES.md) — Caveman、RTK、stacked、API、MCP、仪表板
- [压缩规则格式](./COMPRESSION_RULES_FORMAT.md) — JSON 规则包格式
- [压缩语言包](./COMPRESSION_LANGUAGE_PACKS.md) — 特定语言的 Caveman 规则
