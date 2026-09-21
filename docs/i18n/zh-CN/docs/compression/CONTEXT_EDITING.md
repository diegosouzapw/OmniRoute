# Delegated Context Editing (Anthropic) (中文 (简体))

🌐 **Languages:** 🇺🇸 [English](../../../../compression/CONTEXT_EDITING.md) · 🇪🇹 [am](../../../am/docs/compression/CONTEXT_EDITING.md) · 🇸🇦 [ar](../../../ar/docs/compression/CONTEXT_EDITING.md) · 🇦🇿 [az](../../../az/docs/compression/CONTEXT_EDITING.md) · 🇧🇬 [bg](../../../bg/docs/compression/CONTEXT_EDITING.md) · 🇧🇩 [bn](../../../bn/docs/compression/CONTEXT_EDITING.md) · 🇨🇿 [cs](../../../cs/docs/compression/CONTEXT_EDITING.md) · 🇩🇰 [da](../../../da/docs/compression/CONTEXT_EDITING.md) · 🇩🇪 [de](../../../de/docs/compression/CONTEXT_EDITING.md) · 🇬🇷 [el](../../../el/docs/compression/CONTEXT_EDITING.md) · 🇪🇸 [es](../../../es/docs/compression/CONTEXT_EDITING.md) · 🇪🇪 [et](../../../et/docs/compression/CONTEXT_EDITING.md) · 🇮🇷 [fa](../../../fa/docs/compression/CONTEXT_EDITING.md) · 🇫🇮 [fi](../../../fi/docs/compression/CONTEXT_EDITING.md) · 🇫🇷 [fr](../../../fr/docs/compression/CONTEXT_EDITING.md) · 🇮🇪 [ga](../../../ga/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [gu](../../../gu/docs/compression/CONTEXT_EDITING.md) · 🇳🇬 [ha](../../../ha/docs/compression/CONTEXT_EDITING.md) · 🇮🇱 [he](../../../he/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [hi](../../../hi/docs/compression/CONTEXT_EDITING.md) · 🇭🇷 [hr](../../../hr/docs/compression/CONTEXT_EDITING.md) · 🇭🇺 [hu](../../../hu/docs/compression/CONTEXT_EDITING.md) · 🇦🇲 [hy](../../../hy/docs/compression/CONTEXT_EDITING.md) · 🇮🇩 [id](../../../id/docs/compression/CONTEXT_EDITING.md) · 🇳🇬 [ig](../../../ig/docs/compression/CONTEXT_EDITING.md) · 🇮🇹 [it](../../../it/docs/compression/CONTEXT_EDITING.md) · 🇯🇵 [ja](../../../ja/docs/compression/CONTEXT_EDITING.md) · 🇬🇪 [ka](../../../ka/docs/compression/CONTEXT_EDITING.md) · 🇰🇭 [km](../../../km/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [kn](../../../kn/docs/compression/CONTEXT_EDITING.md) · 🇰🇷 [ko](../../../ko/docs/compression/CONTEXT_EDITING.md) · 🇱🇹 [lt](../../../lt/docs/compression/CONTEXT_EDITING.md) · 🇱🇻 [lv](../../../lv/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [ml](../../../ml/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [mr](../../../mr/docs/compression/CONTEXT_EDITING.md) · 🇲🇾 [ms](../../../ms/docs/compression/CONTEXT_EDITING.md) · 🇲🇹 [mt](../../../mt/docs/compression/CONTEXT_EDITING.md) · 🇲🇲 [my](../../../my/docs/compression/CONTEXT_EDITING.md) · 🇳🇵 [ne](../../../ne/docs/compression/CONTEXT_EDITING.md) · 🇳🇱 [nl](../../../nl/docs/compression/CONTEXT_EDITING.md) · 🇳🇴 [no](../../../no/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [or](../../../or/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [pa](../../../pa/docs/compression/CONTEXT_EDITING.md) · 🇵🇭 [phi](../../../phi/docs/compression/CONTEXT_EDITING.md) · 🇵🇱 [pl](../../../pl/docs/compression/CONTEXT_EDITING.md) · 🇵🇹 [pt](../../../pt/docs/compression/CONTEXT_EDITING.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/CONTEXT_EDITING.md) · 🇷🇴 [ro](../../../ro/docs/compression/CONTEXT_EDITING.md) · 🇷🇺 [ru](../../../ru/docs/compression/CONTEXT_EDITING.md) · 🇱🇰 [si](../../../si/docs/compression/CONTEXT_EDITING.md) · 🇸🇰 [sk](../../../sk/docs/compression/CONTEXT_EDITING.md) · 🇸🇮 [sl](../../../sl/docs/compression/CONTEXT_EDITING.md) · 🇷🇸 [sr](../../../sr/docs/compression/CONTEXT_EDITING.md) · 🇸🇪 [sv](../../../sv/docs/compression/CONTEXT_EDITING.md) · 🇰🇪 [sw](../../../sw/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [ta](../../../ta/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [te](../../../te/docs/compression/CONTEXT_EDITING.md) · 🇹🇭 [th](../../../th/docs/compression/CONTEXT_EDITING.md) · 🇹🇷 [tr](../../../tr/docs/compression/CONTEXT_EDITING.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/CONTEXT_EDITING.md) · 🇵🇰 [ur](../../../ur/docs/compression/CONTEXT_EDITING.md) · 🇺🇿 [uz](../../../uz/docs/compression/CONTEXT_EDITING.md) · 🇻🇳 [vi](../../../vi/docs/compression/CONTEXT_EDITING.md) · 🇳🇬 [yo](../../../yo/docs/compression/CONTEXT_EDITING.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/CONTEXT_EDITING.md)

---

委托式 **上下文编辑** 是一项仅适用于 Claude 的上下文管理功能。与 OmniRoute 的本地
压缩引擎（Caveman、RTK、LLMLingua、堆叠管线）不同——这些引擎会在请求正文离开代理
_之前_ 重写它——上下文编辑会要求**提供者**从其自身正在使用的上下文窗口中清除过时的
工具使用 / 工具结果块。OmniRoute 仅附加一个正文参数
（`context_management.edits[]`）；Claude 会根据自己的分词器执行实际清理。

从本质上讲，这是一项委托式能力：其他提供者会拒绝该参数，因此 OmniRoute 将其严格限定
为仅用于 Claude 和与 Claude Code 兼容的中继。

事实依据：`open-sse/config/contextEditing.ts`（策略 ID、正文注入、遥测数据
提取）、`open-sse/executors/base.ts`（注入门控 + 400 回退），以及
`open-sse/services/compression/types.ts`（配置结构 + 默认值）。

## `clear_tool_uses` 的作用

OmniRoute 会向出站的 Anthropic Messages 正文中注入单个编辑项：

```json
{
  "context_management": {
    "edits": [
      {
        "type": "clear_tool_uses_20250919",
        "trigger": { "type": "input_tokens", "value": 100000 },
        "keep": { "type": "tool_uses", "value": 3 }
      }
    ]
  }
}
```

- `type: "clear_tool_uses_20250919"` — 带日期的 Anthropic 策略 ID（`CLEAR_TOOL_USES_STRATEGY`）。
- `trigger.value: 100000` — 当请求的输入令牌数超过此阈值后，Claude 开始
  清除旧的工具使用/结果对（`CONTEXT_EDITING_DEFAULT_TRIGGER_TOKENS`，Anthropic 的默认值）。
- `keep.value: 3` — 保留最近的 N 个工具使用/结果对，不作修改
  （`CONTEXT_EDITING_DEFAULT_KEEP_TOOL_USES`）。

该测试版功能通过 `anthropic-beta: context-management-2025-06-27` 标头声明，
OmniRoute 已经会在 Claude 请求中发送该标头。

注入由 `applyContextEditingToBody()` 执行，并且具有**幂等性**：如果正文中已经存在
`clear_tool_uses` 编辑项（由之前的调用添加或由客户端提供），则正文会保持不变。如果还存在
`clear_thinking_20251015` 编辑项，OmniRoute 会通过稳定排序将 `clear_thinking` 编辑项
移到最前面，因为 Anthropic 要求 `clear_thinking` 在 `edits[]` 数组中位于
`clear_tool_uses` 之前。

## 每个组合的启用开关

上下文编辑**默认关闭**，需要主动选择启用。该开关是压缩配置中的单个布尔值：

- 设置键：`contextEditing.enabled`（驼峰命名法——**不是** `context_editing` / `context-editing`）。
- 类型：`open-sse/services/compression/types.ts` 中的
  `ContextEditingConfig { enabled: boolean }`。
- 默认值：`DEFAULT_CONTEXT_EDITING_CONFIG = { enabled: false }`。
- Zod 模式：`src/shared/validation/compressionConfigSchemas.ts` 中的 `contextEditingConfigSchema`。
- 存储：与其余压缩设置一起持久化（在
  `src/lib/db/compression.ts` 中规范化）。

在控制面板中，该开关位于压缩中心
（`src/app/(dashboard)/dashboard/context/combos/CompressionHub.tsx`），并通过
`saveSettings()` 写回 `{ contextEditing: { enabled: … } }`。由于它依附于
压缩设置对象，因此会与每个组合的压缩配置共同生效，而不是作为完全独立的设置界面——该配置仅包含
开/关标志；所有阈值（`trigger`、`keep`）均为上述常量。

## 仅限 Claude 的门控

仅对真正的 Claude 或兼容 Claude Code 的中继执行注入。`open-sse/executors/base.ts` 中的门控条件为：

```ts
if (
  (this.provider === "claude" || isClaudeCodeCompatible(this.provider)) &&
  contextEditing?.enabled &&
  !contextEditingDisabled
) {
  applyContextEditingToBody(transformedBody, { enabled: true });
}
```

- `this.provider === "claude"` — 真正的 Anthropic 密钥/OAuth。
- `isClaudeCodeCompatible(this.provider)` — 提供者 ID 以 `anthropic-compatible-cc-` 前缀开头的中继（它们宣称兼容 Claude Code，因此最有可能接受该 beta 功能）。请参阅 `open-sse/services/provider.ts`。

有意**排除**：

- `claude-web` — 一种使用 `create_conversation_params` 请求结构的浏览器中继，它永远不会接收到 `context_management`。
- 通用 `anthropic-compatible-*` 中继（不带 `-cc-` 前缀）— 对 beta 功能的支持情况不确定的第三方端点。

即使开关已启用，非 Claude 提供者也永远不会收到 `context_management` 参数。

## 400 回退机制/中继覆盖范围

兼容 Claude 的中继可能会宣称支持该 beta 功能，但仍以 HTTP 400 拒绝 `context_management` 参数。为了优雅降级而不是让请求失败，执行器会移除该参数，并对同一 URL 重试**一次**：

```ts
if (
  response.status === HTTP_STATUS.BAD_REQUEST &&
  contextEditing?.enabled &&
  !contextEditingDisabled &&
  transformedBody?.context_management !== undefined
) {
  const errText = await response
    .clone()
    .text()
    .catch(() => "");
  if (/context[_-]management|context editing/i.test(errText)) {
    contextEditingDisabled = true;
    delete transformedBody.context_management;
    let retryBody = JSON.stringify(transformedBody);
    if (isClaudeCodeCompatible(this.provider) || this.provider === "claude") {
      retryBody = await signRequestBody(retryBody);
    }
    response = await fetch(url, { ...fetchOptions, body: retryBody });
  }
}
```

行为：

1. 仅当上下文编辑已启用、请求体确实携带 `context_management` 且收到 `400` 时触发。
2. 通过 `clone()` 读取 400 响应体，因此在不匹配时原始响应仍保持完整。
3. 错误文本必须匹配 `/context[_-]management|context editing/i` — 无关的 400 错误（例如 `max_tokens must be >= 1`）**不会**触发回退；原始错误会继续传播。
4. 匹配后，它会设置 `contextEditingDisabled = true`（如果之后为重试/回退 URL 重新构建 `transformedBody`，这会阻止再次注入），删除 `context_management`，为 Claude/兼容 Claude Code 的中继重新签名请求体（`signRequestBody`），然后对同一 URL 重试一次。

真正的 Claude 通过 `ANTHROPIC_BETA_BASE` 携带该 beta 功能，因此不会进入此回退路径。

## `applied_edits` 遥测

收到 Claude 响应后，OmniRoute 会记录提供者实际清除了多少上下文。此数据**不会**通过流式响应传输，而是以尽力而为的方式从非流式响应体中提取，并且永远不会影响响应（遥测失败会被忽略）。

- 提取：`open-sse/config/contextEditing.ts` 中的 `extractContextEditingTelemetry(responseBody)`。它会在三个位置探测 `applied_edits`（用于防御性地适配不同响应结构）：
  - `context_management.applied_edits`
  - `usage.context_management.applied_edits`
  - `usage.applied_edits`
- 从每个条目读取的字段：`cleared_input_tokens` 和 `cleared_tool_uses`（snake_case，Anthropic 原生格式），并以 `clearedInputTokens`/`clearedToolUses` 驼峰格式作为回退。
- 如果未找到 `applied_edits` 数组，或者实际上未清除任何内容，则返回 `null`。

记录结果的结构为 `ContextEditingTelemetry { editCount, clearedInputTokens, clearedToolUses }`。记录操作在 `open-sse/handlers/chatCore.ts` 中进行（仅限 `provider === "claude"`），并通过 `recordContextEditingTelemetry()`（`src/lib/db/compressionAnalytics.ts`）写入一条压缩分析记录，标签如下：

- `mode: "context-editing"`
- `engine: "context-editing"`
- `tokens_saved`/`original_tokens` = 已清除的输入 token 数量
- `request_id` 添加 `::context-editing` 后缀

因此，委托给提供者执行的清除操作会与本地引擎一同显示在压缩分析中，归入 `context-editing` 引擎标签下，并且可以与 RTK/Caveman/LLMLingua 的节省量区分开来。

## 与本地压缩引擎的关系

| 方面       | 本地引擎（Caveman / RTK / LLMLingua / stacked） | 委托式上下文编辑                            |
| ---------- | ----------------------------------------------- | ------------------------------------------- |
| 运行位置   | 在 OmniRoute 中，请求离开代理之前               | 在提供者（Claude）中，服务端执行            |
| 编辑内容   | 提示词 / 上下文 / 工具结果文本                  | 旧的工具使用 / 工具结果块                   |
| 提供者范围 | 所有提供者                                      | 仅限 `claude` + `anthropic-compatible-cc-*` |
| 开关       | 压缩模式设置                                    | `contextEditing.enabled`                    |
| 失败模式   | 失败时开放（使用原始文本）                      | 400 回退：移除参数，重试一次                |
| 节省量遥测 | `engine: <engine id>`                           | `engine: "context-editing"`                 |

两者相辅相成：本地引擎压缩 OmniRoute 发送的字节；上下文编辑则让
Claude 能够跨轮次修剪持续累积的上下文。两者可以同时启用。

## 另请参阅

- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — 引擎注册表和本地压缩
  引擎
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — 命令/工具输出压缩
- [../frameworks/MCP-SERVER.md](../frameworks/MCP-SERVER.md) — MCP 描述压缩和
  工具数量缩减
- 源码：`open-sse/config/contextEditing.ts`、`open-sse/executors/base.ts`、
  `open-sse/services/compression/types.ts`、`src/lib/db/compressionAnalytics.ts`
