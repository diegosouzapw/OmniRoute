# 🗜️ Prompt Compression Guide — OmniRoute (中文 (简体))

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_GUIDE.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_GUIDE.md)

---

> 自动节省符合条件的上下文中的 15-95%。如需快速概览，请参阅 [README 压缩部分](../README.md#%EF%B8%8F-prompt-compression--save-15-95-eligible-tokens-automatically)。

## 概述

OmniRoute 实现了一个模块化提示词压缩管道，会在请求到达上游提供者之前**主动**运行。这意味着可以透明地节省 token，无需更改工作流。

```
客户端请求
  → 压缩策略选择器
    → 是否有组合覆盖设置？→ 使用组合设置
    → 是否达到自动触发阈值？→ 使用自动模式
    → 是否有默认模式？→ 使用全局设置
    → 是否关闭？→ 跳过压缩
  → 选定的压缩模式
    → 关闭：不压缩
    → 轻量：安全清理空白字符/格式（约 15%）
    → 标准：移除电报体式冗余内容（约 30%）
    → 激进：历史记录老化 + 摘要（约 50%）
    → 超级：启发式修剪 + 代码块精简（约 75%）
    → RTK：感知命令的终端/工具输出过滤（上游范围 60-90%）
    → 堆叠：有序的多引擎管道，通常依次为 RTK、Caveman（符合条件的范围为 78-95%）
  → 压缩后的请求 → 提供者
```

---

## 压缩模式

### 关闭

不应用压缩。所有消息均保持原样传递。

### 轻量模式（约节省 15%，延迟 <1ms）

最安全的模式——不产生语义变化，仅清理格式：

| 技术                     | 描述                       |
| ------------------------ | -------------------------- |
| `collapseWhitespace`     | 合并连续空行并移除行尾空格 |
| `dedupSystemPrompt`      | 移除重复的系统消息         |
| `compressToolResults`    | 压缩冗长的工具/函数输出    |
| `removeRedundantContent` | 删除重复的指令             |
| `replaceImageUrls`       | 缩短 base64 图像数据 URI   |

**最适合：** 始终启用的使用场景、安全关键型工作流。

### 标准模式（约节省 30%）

灵感来自 [Caveman](https://github.com/JuliusBrussee/caveman)——移除填充词和冗长表达，同时保留原意：

- 移除填充词（“please”、“I think”、“basically”、“actually”）
- 精简冗长短语（“in order to” → “to”，“as a result of” → “because”）
- 删除礼貌性缓和措辞（“Would you mind...”、“If you could possibly...”）
- 30 多条针对编码提示词调优的正则表达式规则

**最适合：** 日常编码工作流、注重成本的团队。

### 激进模式（约节省 50%）

针对长会话的智能历史记录管理：

- **消息老化**——逐步加大对较早消息的压缩力度
- **工具结果摘要**——用摘要替换较长的工具输出
- **结构完整性保护**——确保 `tool_use` + `tool_result` 对保持一致
- **上下文窗口感知**——遵循每个模型的 token 限制

**最适合：** 长时间调试会话、大型代码库。

### 超级模式（约节省 75%）

适用于 token 紧缺场景的最大压缩：

- **启发式修剪**——移除低于相关性阈值的消息
- **代码块精简**——压缩重复的代码示例
- **二分搜索截断**——为上下文窗口找到最佳截断点
- 包含激进模式的所有功能

**最适合：** 反复达到上下文限制时。

### RTK 模式（上游范围 60-90%）

RTK 模式针对编码代理会话中出现的冗长工具输出进行了优化：

- 检测命令/输出类别，例如 `git status`、`git diff`、`git log`、测试运行器、
  TypeScript/Vite/Webpack 构建、ESLint/Biome/Prettier、npm 审计/安装、Docker 日志、基础设施
  输出以及通用 shell 输出
- 应用来自 `open-sse/services/compression/engines/rtk/filters/` 的 JSON 过滤器包
- 从项目或全局 `filters.toml` 文件导入 RTK TOML schema v1 过滤器，并执行内联测试
  验证以及针对项目文件的信任门控
- 内置提供 49 个过滤器以及内联验证样本
- 移除 ANSI 控制序列、进度条、重复行和不可操作的噪声
- 保留故障、错误、警告、已更改文件、摘要以及长输出的尾部
- 支持受信任门控保护的项目过滤器、全局过滤器以及可选的脱敏原始输出恢复

**最适合：** 包含 shell、构建、测试、git、grep 和文件输出记录的代理会话。

### 堆叠模式（符合条件的范围为 78-95%）

堆叠模式以确定性顺序运行多个压缩引擎。默认管道为：

```txt
RTK -> Caveman
```

此顺序会先压缩终端/工具输出，然后对
剩余的自然语言提示词应用 Caveman 语义精简。堆叠管道可以进行全局配置，也可以通过
分配给路由组合的压缩组合进行配置。

**最适合：** 同时包含大量工具日志以及人工指令或助手摘要的混合上下文。

---

## 上游节省量计算

OmniRoute 记录了来自两个方面的压缩节省量：上游项目基准测试和 OmniRoute 自身的引擎组合。

| 来源    | 此处使用的上游 README 数据                                                                        |
| ------- | ------------------------------------------------------------------------------------------------- |
| Caveman | 输出 token 减少 `~75%`，基准测试平均输出节省 `65%`，范围为 `22-87%`，输入压缩工具可节省 `~46%`    |
| RTK     | 命令输出节省 `60-90%`；示例会话从 `~118,000` 个 token 降至 `~23,900` 个，即节省 `79.7%`（`~80%`） |

对于重叠的工具/上下文载荷，默认 OmniRoute 组合会按以下顺序叠加引擎：

```txt
RTK -> Caveman
```

组合节省量按乘法计算，而不是加法：

```txt
combined = 1 - (1 - RTK 节省量) * (1 - Caveman 输入节省量)
average  = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
range    = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

当 RTK 和 Caveman 都能压缩相同的输入/上下文载荷时，`78-95%` 这一数字才适用。
Caveman 的响应输出模式是独立的：启用后，请使用 Caveman 自身的输出节省数据（平均 `65%`，
标称 `~75%`，范围为 `22-87%`）。总计费节省量取决于提示词与输出的占比。

### “符合条件”的实际含义

15-95% 的标称范围是真实的，但它仅适用于**冗余或冗长**的内容——重复的错误行、不断刷出相同警告的构建日志、过大的 `grep`/文件读取输出。它并
**不**意味着每个请求都能节省这么多。

实证验证（`tests/unit/compression/stacked-compression-tool-result-savings.test.ts`）：对包含 300 个相同错误行的 Anthropic 格式 `tool_result` 块执行
`stacked`（RTK + Caveman）处理后，实现了 **95.93% 的 token 节省 / 96.26% 的字符节省**——完全处于所宣传的范围内。
但对正常、非冗余的工具输出（简洁的 `grep` 匹配列表、较短的文件读取结果、普通对话文本）运行相同的处理流水线时，会正确地产生**接近于零的节省量**，因为
其中没有可删除的重复内容，而且 `validateCompression()`（`validation.ts`）会拒绝交付任何会删除或更改代码块、URL、标题、版本号或全大写常量标识符的
改写结果。

这是符合预期的安全行为，而不是 bug：如果某次编码会话主要是在读取/grep 简洁的文件，那么即使完全启用了压缩，整体节省量也会比较有限；而遇到失败循环或输出冗长的 linter 时，该部分流量则会实现完整的 78-95% 节省范围。不要将单次会话较低的总体节省百分比视为压缩配置错误的证据——应先检查底层工具输出是否确实存在冗余。

---

## Token 节省量可视化

```
不使用压缩：       向 LLM 发送 47K 个 token
使用 Lite：        发送 40K 个 token          （节省 15% — 安全、始终开启）
使用 Standard：    发送 33K 个 token          （节省 30% — caveman-speak 规则）
使用 Aggressive：  发送 24K 个 token          （节省 50% — 老化 + 摘要）
使用 Ultra：       发送 12K 个 token          （节省 75% — 启发式剪枝）
使用 RTK：         发送 19K-5K 个 token       （命令/工具输出节省 60-90%）
使用 Stacked：     发送 10K-2.5K 个 token     （符合条件的 RTK+Caveman 内容节省 78-95%）
```

---

## 配置

### 仪表盘

导航到 `Dashboard → Context & Cache`：

- **Caveman** — 模式选择、语言包、预览和全局默认设置
- **RTK** — 命令过滤器预览、RTK 安全设置和过滤器目录
- **Compression Combos** — 分配给路由组合的命名引擎管道
- **Auto-Trigger Threshold** — 当令牌计数超过阈值时自动启用压缩

### 每组合覆盖

在 `Dashboard → Context & Cache → Compression Combos` 中，将一个压缩组合分配给一个路由组合：

```txt
Combo: "free-tier-fallback"
  Compression Combo: "coding-agent-stack"
  Pipeline: RTK -> Caveman
  Targets:
    1. if/kimi-k2.7-code
    2. if/qwen3.8-max-preview
```

这允许您在免费/编码提供者上使用堆叠压缩，同时在付费订阅上保持精简模式。

此“每组合覆盖”分配与**路由组合压缩模式**覆盖（Default/Off/Lite/Standard/Aggressive/Ultra）是不同的控制——该覆盖不选择命名的压缩组合管道；它只是设置 `resolveCompressionPlan` 查询的 `compressionMode` 字段。它可以在组合卡片（`Dashboard → Combos`）上设置，或者自 #6760 以来，可以在 `Dashboard → Context & Cache → Compression Combos` 的“分配到路由”列表中为每个路由组合设置，就在上面文档中提到的管道分配复选框旁边。这两个界面都通过相同的 `PUT /api/combos/{id}` 端点进行持久化。

### 每请求覆盖

发送 `x-omniroute-compression` 请求头以覆盖单个请求的压缩计划。它具有最高优先级——它优于路由组合覆盖、活动配置文件、自动触发和面板默认设置。未知值将被忽略（请求永远不会被拒绝），并且全局主开关仍然控制一切：当全局关闭压缩时，该头无法将其打开。值：

| 值            | 效果                                                              |
| ------------- | ----------------------------------------------------------------- |
| `off`         | 此请求不进行压缩。                                                |
| `default`     | 面板派生的默认配置文件（忽略活动配置文件）。有损引擎保持关闭。    |
| `safe`        | 与省略此头相同：仅进行去重和空白折叠。                            |
| `allow-lossy` | 保留此请求的操作符计划，包括摘要、相关性过滤器和样式重写。        |
| `engine:<id>` | 启用时为单个引擎，例如 `engine:rtk`。这是该引擎的每请求选择加入。 |
| `<combo>`     | 命名组合，首先按名称（不区分大小写）匹配，然后按 ID 匹配。        |

如果没有 `allow-lossy`、`engine:<id>` 或命名组合，则不应用有损引擎。当压缩开启时，请求仍会进行会话去重和空白折叠。

应用的计划会在 `X-OmniRoute-Compression: <mode>; source=<source>` 响应头中回显，其中 `<source>` 是 `request-header`、`routing-override`、`active-profile`、`auto-trigger`、`default` 或 `off` 之一。

### API

```bash
# Get compression settings
curl http://localhost:20128/api/settings/compression

# Update compression settings
curl -X PUT http://localhost:20128/api/settings/compression \
  -H "Content-Type: application/json" \
  -d '{"defaultMode":"stacked","autoTriggerMode":"stacked","autoTriggerTokens":32000}'

# Preview a specific RTK/stacked payload
curl -X POST http://localhost:20128/api/compression/preview \
  -H "Content-Type: application/json" \
  -d '{"mode":"rtk","messages":[{"role":"tool","content":"npm test output here"}]}'

# List RTK filter packs
curl http://localhost:20128/api/context/rtk/filters

# Test RTK directly with optional command metadata
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
- ✅ 系统提示词（在 lite 模式下）

在持久化任何内容之前，RTK 原始输出恢复功能会对常见 API 密钥、bearer 令牌、Slack 令牌、AWS 访问密钥、密码、令牌和机密信息进行脱敏。

---

## 压缩统计

每个压缩请求的服务器日志中都包含以下统计信息：

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

| 阶段    | 模式                                                                                                                  | 状态      |
| ------- | --------------------------------------------------------------------------------------------------------------------- | --------- |
| 阶段 1  | 关闭, 精简                                                                                                            | ✅ 已发布 |
| 阶段 2  | 标准, 激进, 超级                                                                                                      | ✅ 已发布 |
| 阶段 3  | RTK, 堆叠, 压缩组合                                                                                                   | ✅ 已发布 |
| 阶段 4  | 输出样式, SLM 级超级, 评估工具                                                                                        | ✅ 已发布 |
| 阶段 4C | 自适应上下文预算（“拨盘”）— 计算引擎 + API (`contextBudget` on `PUT /api/settings/compression`) + 仪表板模式/策略控制 | ✅ 已发布 |

---

## 致谢

Standard 模式的压缩规则受 **[JuliusBrussee](https://github.com/JuliusBrussee)**（⭐ 51K+）的 **[Caveman](https://github.com/JuliusBrussee/caveman)** 启发——这是一个爆火的“能用少量 token 搞定，为什么要用很多 token”项目。Caveman 报告称，其输出 token 减少约 `~75%`，基准测试的平均输出节省率为 `65%`，输出节省范围为 `22-87%`，输入压缩工具的节省率约为 `~46%`。

RTK 模式受 **[RTK AI](https://github.com/rtk-ai)** 的 **[RTK - Rust Token Killer](https://github.com/rtk-ai/rtk)** 启发——这是一个用于终端、构建、测试、git 和工具输出过滤的高性能命令输出压缩项目。RTK 报告称节省率为 `60-90%`，其 README 示例会话显示节省了约 `~80%`。

---

## 高级压缩系统

除了 7 种标准模式之外，OmniRoute 还包含多种高级压缩系统，它们会根据上下文自动运行。

### 缓存感知压缩

一些提供者（例如 Anthropic 及其提示缓存）支持**提示缓存**，这允许它们缓存提示的部分内容以降低成本和延迟。当启用缓存时，激进的压缩实际上会**损害**性能，因为它会改变缓存的 token，从而使缓存失效。

`cachingAware.ts` 模块通过**检测缓存上下文**并相应地**调整压缩策略**来解决此问题。

#### 工作原理

1.  **检测缓存上下文** — 扫描请求体以查找 `cache_control` 标记
2.  **识别支持缓存的提供者** — 检查目标提供者是否支持缓存
3.  **调整策略** — 对于支持缓存的提供者，将 `aggressive`/`ultra` 降级为 `standard`
4.  **跳过系统提示** — 系统提示通常会被缓存，因此不要压缩它们
5.  **使用确定性转换** — 仅使用产生一致输出的转换

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
// → { hasCacheControl: true, provider: "anthropic", isCachingProvider: true }

const strategy = getCacheAwareStrategy("aggressive", ctx);
// → { strategy: "standard", skipSystemPrompt: true, deterministicOnly: true }
```

#### 何时使用

缓存感知压缩**始终开启** — 无需配置。它仅在以下情况生效：

- 请求包含 `cache_control` 标记
- 目标提供者支持提示缓存（Anthropic、OpenAI 等）

### 渐进式老化

长时间的对话会累积许多消息轮次，但较旧的轮次相关性会降低。`progressiveAging.ts` 模块**根据轮次距离降级消息**：

- **最近的轮次 (0-3)**：逐字保留（完整细节）
- **中等轮次 (4-8)**：轻度压缩（空白符，格式清理）
- **旧轮次 (9+)**：原始人压缩（去除填充词，摘要）
- **非常旧的轮次 (20+)**：重度摘要或丢弃

#### 代码示例

```ts
import { applyAging } from "@omniroute/open-sse/services/compression/progressiveAging";

const messages = [
  { role: "system", content: "You are a helpful assistant" },
  { role: "user", content: "What is 2+2?" },
  { role: "assistant", content: "4" },
  // ... 更多 50 轮 ...
];

const { messages: aged, saved } = applyAging(messages, {
  verbatim: 3, // 前 3 轮：逐字
  light: 8, // 第 4-8 轮：轻度压缩
  moderate: 20, // 第 9-20 轮：原始人压缩
  // 第 21 轮及以上：重度摘要
});

// saved = 节省的 token 数量
```

#### 何时使用

渐进式老化对于 `aggressive` 和 `ultra` 模式**始终开启**。它特别适用于：

- 长时间编码会话
- 多日对话
- 包含大量工具调用的代理工作流

### 原始人输出模式

`outputMode.ts` 模块注入**系统提示指令**，使模型本身生成压缩、简洁的输出（一种“原始人”风格）。

#### 工作原理

这种模式不是压缩输入，而是添加一个系统提示，例如：

> “用最少的词回复。跳过客套话。使用短句。”

这特别适用于：

- 代码生成（更简洁的输出 = 更少的 token）
- 快速问答（无需详细解释）
- 批处理（最大化吞吐量）

#### 何时使用

原始人输出模式是**可选加入**的 — 通过组合配置进行设置：

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

### 输出样式（目录）

上述原始人输出模式是**遗留的单一样式路径**。第四阶段将其泛化为可组合输出样式的目录：`open-sse/services/compression/outputStyles/catalog.ts` 中的 `OUTPUT_STYLE_CATALOG`。每种样式都是一个系统提示指令，使模型本身生成更经济的输出；样式可以一起启用，并按目录顺序注入。

| 风格                         | `id`          | 功能                                                                                                                                                                         | 指令语言                                       |
| ---------------------------- | ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| 简洁散文                     | `terse-prose` | 删除填充词/冠词/模糊措辞；保持技术实质精确。与旧版 caveman 输出模式（引用而非重写）的文本相同。                                                                              | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi  |
| 少代码                       | `less-code`   | YAGNI 阶梯：最小化工作变更，无不必要的抽象。                                                                                                                                 | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi  |
| 马尾辫（懒惰的高级开发人员） | `ponytail`    | “最好的代码是从未编写的代码”：重用 > 重写，根本原因 > 症状，最短工作差异。                                                                                                   | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi  |
| 我有ADHD（行动优先）         | `i-have-adhd` | 行动优先（命令/路径/代码片段优先于散文），有编号的限定步骤，一个具体的下一步，无引言/回顾/结束语。改编自 [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) (MIT)。 | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi  |
| 简洁中文/日文/韩文 (文言)    | `terse-cjk`   | 文言文超简洁风格。                                                                                                                                                           | zh（区域设置限制：仅当解析语言为 `zh` 时提供） |

每种风格都提供三种强度级别——`lite`、`full`、`ultra`——并且每个级别
都以共享的边界条款结束，该条款保持代码块、文件路径、命令、
错误字符串、URL 和标识符的原样不变。

#### 注入原理

`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) 根据目录解析
选择（未知 ID 和区域设置不匹配的样式会被丢弃，绝不会出错），按目录顺序连接选定的指令，
**一次性**附加边界条款，并将结果预加载到系统提示中，置于一个幂等标记 (`[OmniRoute Output Styles]`) 之后——重复应用是空操作。当检测到的请求语言有翻译时，将注入本地化指令而非英文指令。

#### 如何启用

在仪表板中：**上下文 → 设置 → 压缩**——每种样式一行，带有一个开/关切换和级别选择器。通过编程方式，压缩配置将选择持久化为：

```json
{
  "outputStyles": [
    { "id": "i-have-adhd", "level": "full" },
    { "id": "less-code", "level": "lite" }
  ]
}
```

向后兼容：旧版 `outputMode: "caveman"` 组合设置仍然有效，并映射到
`terse-prose`，与所有旧版语言中的旧注入字节相同。

语言选择：当 `languageConfig.enabled` 开启时，`autoDetect` 会选择最新用户消息的语言（与输入引擎的检测器相同）；关闭 `autoDetect` 会固定 `defaultLanguage`。关闭 → 英语。

样式 × 语言矩阵由
`tests/unit/compression/output-styles-i18n-matrix.test.ts` 固定：新样式发布时必须至少包含 pt-BR 翻译（或明确跟踪的例外情况），现有样式不能悄无声息地丢失区域设置。要添加样式，请参阅
[EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md#adding-an-output-style)。

### 工具结果压缩

`toolResultCompressor.ts` 模块为工具结果（函数调用、代理输出、搜索结果等）提供了 **5 种专门的压缩策略**：

1.  **搜索结果压缩** — 删除冗余结果，保留前 N 个
2.  **文件读取压缩** — 截断大文件，保留头部/导入
3.  **代码执行压缩** — 仅保留必要的标准输出/标准错误
4.  **数据库查询压缩** — 限制行数，删除冗余元数据
5.  **API 响应压缩** — 剥离空字段，精简数组

#### 何时使用

当存在工具调用时，工具结果压缩**始终开启**。无需配置。

### 堆叠管道

堆叠模式**按顺序运行多个引擎**——通常先运行 RTK（工具输出节省 60-90%），然后运行 Caveman（对剩余文本额外节省 30%）。这实现了**总计 78-95% 的节省**。

#### 工作原理

```
Input (1000 tokens)
  → RTK (command-aware filter) → 200 tokens
    → Caveman (filler removal) → 140 tokens
  → Output (140 tokens, 86% savings)
```

#### 何时使用

在以下情况下使用堆叠模式：

- 工具密集型工作流（代理式编码、研究）
- 成本敏感的批处理
- 当您需要最大程度的 token 节省时

通过组合配置：

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

## 压缩组合覆盖

你可以**按组合**覆盖全局压缩模式，以针对不同用例微调行为：

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

这适用于：

- **编码组合**：对长时间会话使用 `aggressive` 模式
- **快速问答组合**：使用 `lite` 模式以获得快速响应
- **工具密集型组合**：使用 `stacked` 模式以最大限度节省资源
- **生产环境组合**：针对缓存提供者使用 `cache-aware` 模式

---

## 另请参阅

- [环境配置](../reference/ENVIRONMENT.md) — 压缩相关的环境变量
- [架构指南](../architecture/ARCHITECTURE.md) — 压缩管线内部机制
- [用户指南](../guides/USER_GUIDE.md) — 压缩入门
- [RTK 压缩](./RTK_COMPRESSION.md) — RTK 过滤器、信任模型、验证门控和原始输出恢复
- [压缩引擎](./COMPRESSION_ENGINES.md) — Caveman、RTK、堆叠模式、API、MCP 和仪表板
- [压缩规则格式](./COMPRESSION_RULES_FORMAT.md) — JSON 规则包格式
- [压缩语言包](./COMPRESSION_LANGUAGE_PACKS.md) — 特定于语言的 Caveman 规则
