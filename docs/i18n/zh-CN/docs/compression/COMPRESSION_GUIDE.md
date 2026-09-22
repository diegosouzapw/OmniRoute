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

### 仪表板

导航至 `Dashboard → Context & Cache`：

- **Caveman** — 模式选择、语言包、预览和全局默认值
- **RTK** — 命令过滤器预览、RTK 安全设置和过滤器目录
- **Compression Combos** — 分配给路由组合的命名引擎管线
- **Auto-Trigger Threshold** — 当令牌数超过阈值时自动启用压缩

### 按组合覆盖

在 `Dashboard → Context & Cache → Compression Combos` 中，为路由组合分配一个压缩组合：

```txt
组合："free-tier-fallback"
  压缩组合："coding-agent-stack"
  管线：RTK -> Caveman
  目标：
    1. if/kimi-k2.7-code
    2. if/qwen3.8-max-preview
```

这让你可以对免费/编码提供者使用堆叠压缩，同时在付费订阅上保持精简模式。

此“按组合覆盖”分配与**路由组合压缩模式**覆盖（默认/关闭/精简/标准/激进/超强）是不同的控制项——后者不会选择命名的压缩组合管线；它只会设置由 `resolveCompressionPlan` 查询的 `compressionMode` 字段。它既可以在组合卡片（`Dashboard → Combos`）上设置，也可以从 #6760 起，在 `Dashboard → Context & Cache → Compression Combos` 的“分配给路由”列表中，紧挨上述管线分配复选框，为每个路由组合进行设置。这两个界面都通过同一个 `PUT /api/combos/{id}` 端点持久化。

### 按请求覆盖

发送 `x-omniroute-compression` 请求标头，以覆盖单个请求的压缩计划。它具有最高优先级——优先于路由组合覆盖、活动配置文件、自动触发和面板默认值。未知值将被忽略（请求绝不会因此被拒绝），并且全局总开关仍会控制所有压缩：当全局关闭压缩时，该标头无法将其开启。可用值：

| 值            | 效果                                                       |
| ------------- | ---------------------------------------------------------- |
| `off`         | 不压缩此请求。                                             |
| `default`     | 使用面板派生的默认配置文件（忽略活动配置文件）。           |
| `engine:<id>` | 启用时使用单个引擎，例如 `engine:rtk`。                    |
| `<combo>`     | 命名组合，首先按名称匹配（不区分大小写），然后按 id 匹配。 |

应用的计划会通过 `X-OmniRoute-Compression: <mode>; source=<source>` 响应标头回传，其中 `<source>` 是 `request-header`、`routing-override`、`active-profile`、`auto-trigger`、`default` 或 `off` 之一。

### API

```bash
# 获取压缩设置
curl http://localhost:20128/api/settings/compression

# 更新压缩设置
curl -X PUT http://localhost:20128/api/settings/compression \
  -H "Content-Type: application/json" \
  -d '{"defaultMode":"stacked","autoTriggerMode":"stacked","autoTriggerTokens":32000}'

# 预览特定的 RTK/堆叠载荷
curl -X POST http://localhost:20128/api/compression/preview \
  -H "Content-Type: application/json" \
  -d '{"mode":"rtk","messages":[{"role":"tool","content":"npm test output here"}]}'

# 列出 RTK 过滤器包
curl http://localhost:20128/api/context/rtk/filters

# 使用可选命令元数据直接测试 RTK
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

## 压缩统计信息

每个经过压缩的请求都会在服务器日志中包含统计信息：

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

| 阶段    | 模式                                                                                                                     | 状态      |
| ------- | ------------------------------------------------------------------------------------------------------------------------ | --------- |
| 阶段 1  | Off、Lite                                                                                                                | ✅ 已发布 |
| 阶段 2  | Standard、Aggressive、Ultra                                                                                              | ✅ 已发布 |
| 阶段 3  | RTK、Stacked、Compression Combos                                                                                         | ✅ 已发布 |
| 阶段 4  | Output Styles、SLM-tier Ultra、评估工具                                                                                  | ✅ 已发布 |
| 阶段 4C | 自适应上下文预算（“旋钮”）—— 计算引擎 + API（`PUT /api/settings/compression` 上的 `contextBudget`）+ 仪表板模式/策略控制 | ✅ 已发布 |

---

## 致谢

Standard 模式的压缩规则受 **[JuliusBrussee](https://github.com/JuliusBrussee)**（⭐ 51K+）的 **[Caveman](https://github.com/JuliusBrussee/caveman)** 启发——这是一个爆火的“能用少量 token 搞定，为什么要用很多 token”项目。Caveman 报告称，其输出 token 减少约 `~75%`，基准测试的平均输出节省率为 `65%`，输出节省范围为 `22-87%`，输入压缩工具的节省率约为 `~46%`。

RTK 模式受 **[RTK AI](https://github.com/rtk-ai)** 的 **[RTK - Rust Token Killer](https://github.com/rtk-ai/rtk)** 启发——这是一个用于终端、构建、测试、git 和工具输出过滤的高性能命令输出压缩项目。RTK 报告称节省率为 `60-90%`，其 README 示例会话显示节省了约 `~80%`。

---

## 高级压缩系统

除了 7 种标准模式之外，OmniRoute 还包括多个高级压缩系统，它们会根据上下文自动运行。

### 缓存感知压缩

某些提供者（例如支持提示词缓存的 Anthropic）支持**提示词缓存**，从而可以缓存提示词的部分内容，以降低成本和延迟。启用缓存后，激进压缩实际上可能会**损害**性能，因为它会更改已缓存的 token，导致缓存失效。

`cachingAware.ts` 模块通过**检测缓存上下文**并相应地**调整压缩策略**来解决此问题。

#### 工作原理

1. **检测缓存上下文** — 扫描请求正文中的 `cache_control` 标记
2. **识别缓存提供者** — 检查目标提供者是否支持缓存
3. **调整策略** — 对于缓存提供者，将 `aggressive`/`ultra` 降级为 `standard`
4. **跳过系统提示词** — 系统提示词通常会被缓存，因此不对其进行压缩
5. **使用确定性转换** — 仅使用可产生一致输出的转换

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

缓存感知压缩**始终启用**——无需配置。它仅在以下情况下生效：

- 请求包含 `cache_control` 标记
- 目标提供者支持提示词缓存（Anthropic、OpenAI 等）

### 渐进式老化

较长的对话会积累许多轮消息，但较早的轮次会逐渐降低相关性。`progressiveAging.ts` 模块会**根据轮次距离降低消息的详细程度**：

- **最近的轮次（0-3）**：逐字保留（完整细节）
- **中等距离的轮次（4-8）**：Lite 压缩（清理空白和格式）
- **较早的轮次（9+）**：Caveman 压缩（移除冗余内容、摘要）
- **非常早的轮次（20+）**：大幅摘要或丢弃

#### 代码示例

```ts
import { applyAging } from "@omniroute/open-sse/services/compression/progressiveAging";

const messages = [
  { role: "system", content: "You are a helpful assistant" },
  { role: "user", content: "What is 2+2?" },
  { role: "assistant", content: "4" },
  // ... 另外 50 个轮次 ...
];

const { messages: aged, saved } = applyAging(messages, {
  verbatim: 3, // 前 3 个轮次：逐字保留
  light: 8, // 第 4-8 个轮次：lite 压缩
  moderate: 20, // 第 9-20 个轮次：caveman 压缩
  // 第 21 个及之后的轮次：大幅摘要
});

// saved = 节省的 token 数量
```

#### 何时使用

渐进式老化在 `aggressive` 和 `ultra` 模式下**始终启用**。它尤其适用于：

- 长时间运行的编码会话
- 持续多天的对话
- 包含大量工具调用的智能体工作流

### 穴居人输出模式

`outputMode.ts` 模块会注入**系统提示词指令**，使模型本身生成经过压缩、简洁的输出（“穴居人”风格）。

#### 工作原理

此模式不会压缩输入，而是添加类似下面的系统提示词：

> “用最少的词回复。省略客套话。使用短句。”

它尤其适用于：

- 代码生成（输出越简洁，所用 token 越少）
- 快速问答（无需详尽解释）
- 批处理（最大化吞吐量）

#### 何时使用

穴居人输出模式是**选择启用**的——通过组合配置进行设置：

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

### 输出风格（目录）

上述穴居人输出模式是**旧版单一风格路径**。Phase 4 将其泛化为可组合输出风格目录：位于
`open-sse/services/compression/outputStyles/catalog.ts` 中的 `OUTPUT_STYLE_CATALOG`。每种风格都是一条系统提示词
指令，使模型本身生成成本更低的输出；可同时启用多种风格，并按目录顺序注入。

| 风格                       | `id`          | 作用                                                                                                                                                                                                  | 指令语言                                             |
| -------------------------- | ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| 简洁叙述                   | `terse-prose` | 去除填充词、冠词和模棱两可的表达；准确保留技术实质。文本与旧版穴居人输出模式相同（通过引用复用，而非重新录入）。                                                                                      | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi        |
| 更少代码                   | `less-code`   | YAGNI 阶梯：采用最小可用改动，不添加未要求的抽象。                                                                                                                                                    | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi        |
| 马尾辫（懒惰的高级开发者） | `ponytail`    | “最好的代码是从未写过的代码”：复用优于重写，根因优于症状，采用最短的可用差异。                                                                                                                        | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi        |
| 我有 ADHD（行动优先）      | `i-have-adhd` | 行动优先（先给出命令/路径/代码片段，再给出说明），使用数量有限的编号步骤，只提供一个具体的下一步，不要开场白/回顾/结束语。改编自 [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd)（MIT）。 | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi        |
| 简洁 CJK（文言）           | `terse-cjk`   | 极度简洁的文言文风格。                                                                                                                                                                                | zh（受区域设置限制：仅当解析后的语言为 `zh` 时提供） |

每种风格均提供三个强度级别——`lite`、`full`、`ultra`——并且每个级别
都以共享的边界条款结尾，以确保代码块、文件路径、命令、
错误字符串、URL 和标识符保持原样。

#### 注入方式

`applyOutputStyles()`（`open-sse/services/compression/outputStyles/apply.ts`）会根据目录解析
所选项（未知 id 和区域设置不匹配的风格会被丢弃，绝不会报错），按目录顺序拼接所选指令，
仅追加**一次**边界条款，并通过单个幂等标记（`[OmniRoute Output Styles]`）将结果前置注入系统
提示词——重复应用时不会执行任何操作。当检测到的请求语言有对应翻译时，将注入本地化
指令而非英文指令。

#### 启用方式

在仪表板中：**上下文 → 设置 → 压缩**——每种风格占一行，包含
开关和级别选择器。通过编程方式配置时，压缩配置会将所选项持久化为：

```json
{
  "outputStyles": [
    { "id": "i-have-adhd", "level": "full" },
    { "id": "less-code", "level": "lite" }
  ]
}
```

向后兼容：旧版组合设置 `outputMode: "caveman"` 仍然有效，并会映射到
`terse-prose`；在每种旧版语言中，其注入内容均与旧版逐字节一致。

语言选择：启用 `languageConfig.enabled` 后，`autoDetect` 会选择
最新一条用户消息的语言（使用与输入引擎相同的检测器）；
关闭 `autoDetect` 后，将固定使用 `defaultLanguage`。关闭语言配置 → 使用英语。

风格 × 语言矩阵由
`tests/unit/compression/output-styles-i18n-matrix.test.ts` 固定：新风格若没有至少一个 pt-BR 翻译
（或明确记录的例外），则无法发布；现有风格也不能在无提示的情况下失去某个区域设置。要添加风格，请参阅
[EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md#adding-an-output-style)。

### 工具结果压缩

`toolResultCompressor.ts` 模块为工具结果（函数调用、智能体输出、搜索结果等）提供 **5 种专用压缩策略**：

1. **搜索结果压缩**——移除冗余结果，保留前 N 项
2. **文件读取压缩**——截断大型文件，保留文件头/导入项
3. **代码执行压缩**——仅保留必要的 stdout/stderr
4. **数据库查询压缩**——限制行数，移除冗长的元数据
5. **API 响应压缩**——移除 null 字段，压缩数组

#### 何时使用

存在工具调用时，工具结果压缩**始终启用**。无需配置。

### 堆叠管线

堆叠模式会**依次运行多个引擎**——通常先运行 RTK
（可将工具输出减少 60-90%），然后运行 Caveman（将剩余文本进一步减少 30%）。
这可实现**总计 78-95% 的节省**。

#### 工作原理

```
输入（1000 个 token）
  → RTK（命令感知过滤器）→ 200 个 token
    → Caveman（移除填充内容）→ 140 个 token
  → 输出（140 个 token，节省 86%）
```

#### 何时使用

以下场景适合使用堆叠模式：

- 大量使用工具的工作流（智能体编码、研究）
- 成本敏感型批处理
- 需要最大程度节省 token 时

通过组合配置进行设置：

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
