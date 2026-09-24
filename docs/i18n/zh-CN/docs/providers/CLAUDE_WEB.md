# Providers — Claude Web (中文 (简体))

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CLAUDE_WEB.md) · 🇪🇹 [am](../../../am/docs/providers/CLAUDE_WEB.md) · 🇸🇦 [ar](../../../ar/docs/providers/CLAUDE_WEB.md) · 🇦🇿 [az](../../../az/docs/providers/CLAUDE_WEB.md) · 🇧🇬 [bg](../../../bg/docs/providers/CLAUDE_WEB.md) · 🇧🇩 [bn](../../../bn/docs/providers/CLAUDE_WEB.md) · 🇧🇦 [bs](../../../bs/docs/providers/CLAUDE_WEB.md) · 🇨🇿 [cs](../../../cs/docs/providers/CLAUDE_WEB.md) · 🇩🇰 [da](../../../da/docs/providers/CLAUDE_WEB.md) · 🇩🇪 [de](../../../de/docs/providers/CLAUDE_WEB.md) · 🇬🇷 [el](../../../el/docs/providers/CLAUDE_WEB.md) · 🇪🇸 [es](../../../es/docs/providers/CLAUDE_WEB.md) · 🇪🇪 [et](../../../et/docs/providers/CLAUDE_WEB.md) · 🇮🇷 [fa](../../../fa/docs/providers/CLAUDE_WEB.md) · 🇫🇮 [fi](../../../fi/docs/providers/CLAUDE_WEB.md) · 🇫🇷 [fr](../../../fr/docs/providers/CLAUDE_WEB.md) · 🇮🇪 [ga](../../../ga/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [gu](../../../gu/docs/providers/CLAUDE_WEB.md) · 🇳🇬 [ha](../../../ha/docs/providers/CLAUDE_WEB.md) · 🇮🇱 [he](../../../he/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [hi](../../../hi/docs/providers/CLAUDE_WEB.md) · 🇭🇷 [hr](../../../hr/docs/providers/CLAUDE_WEB.md) · 🇭🇺 [hu](../../../hu/docs/providers/CLAUDE_WEB.md) · 🇦🇲 [hy](../../../hy/docs/providers/CLAUDE_WEB.md) · 🇮🇩 [id](../../../id/docs/providers/CLAUDE_WEB.md) · 🇳🇬 [ig](../../../ig/docs/providers/CLAUDE_WEB.md) · 🇮🇹 [it](../../../it/docs/providers/CLAUDE_WEB.md) · 🇯🇵 [ja](../../../ja/docs/providers/CLAUDE_WEB.md) · 🇬🇪 [ka](../../../ka/docs/providers/CLAUDE_WEB.md) · 🇰🇭 [km](../../../km/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [kn](../../../kn/docs/providers/CLAUDE_WEB.md) · 🇰🇷 [ko](../../../ko/docs/providers/CLAUDE_WEB.md) · 🇱🇹 [lt](../../../lt/docs/providers/CLAUDE_WEB.md) · 🇱🇻 [lv](../../../lv/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [ml](../../../ml/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [mr](../../../mr/docs/providers/CLAUDE_WEB.md) · 🇲🇾 [ms](../../../ms/docs/providers/CLAUDE_WEB.md) · 🇲🇹 [mt](../../../mt/docs/providers/CLAUDE_WEB.md) · 🇲🇲 [my](../../../my/docs/providers/CLAUDE_WEB.md) · 🇳🇵 [ne](../../../ne/docs/providers/CLAUDE_WEB.md) · 🇳🇱 [nl](../../../nl/docs/providers/CLAUDE_WEB.md) · 🇳🇴 [no](../../../no/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [or](../../../or/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [pa](../../../pa/docs/providers/CLAUDE_WEB.md) · 🇵🇭 [phi](../../../phi/docs/providers/CLAUDE_WEB.md) · 🇵🇱 [pl](../../../pl/docs/providers/CLAUDE_WEB.md) · 🇵🇹 [pt](../../../pt/docs/providers/CLAUDE_WEB.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CLAUDE_WEB.md) · 🇷🇴 [ro](../../../ro/docs/providers/CLAUDE_WEB.md) · 🇷🇺 [ru](../../../ru/docs/providers/CLAUDE_WEB.md) · 🇱🇰 [si](../../../si/docs/providers/CLAUDE_WEB.md) · 🇸🇰 [sk](../../../sk/docs/providers/CLAUDE_WEB.md) · 🇸🇮 [sl](../../../sl/docs/providers/CLAUDE_WEB.md) · 🇷🇸 [sr](../../../sr/docs/providers/CLAUDE_WEB.md) · 🇸🇪 [sv](../../../sv/docs/providers/CLAUDE_WEB.md) · 🇰🇪 [sw](../../../sw/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [ta](../../../ta/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [te](../../../te/docs/providers/CLAUDE_WEB.md) · 🇹🇭 [th](../../../th/docs/providers/CLAUDE_WEB.md) · 🇹🇷 [tr](../../../tr/docs/providers/CLAUDE_WEB.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CLAUDE_WEB.md) · 🇵🇰 [ur](../../../ur/docs/providers/CLAUDE_WEB.md) · 🇺🇿 [uz](../../../uz/docs/providers/CLAUDE_WEB.md) · 🇻🇳 [vi](../../../vi/docs/providers/CLAUDE_WEB.md) · 🇳🇬 [yo](../../../yo/docs/providers/CLAUDE_WEB.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CLAUDE_WEB.md)

---

## `claude-web`

`claude-web` 通过经过身份验证的 `claude.ai` 浏览器会话发送 OpenAI 格式的聊天请求。执行器会规范化提供的 cookie、解析一个已通过身份验证的组织、准备对话状态、选择直接传输或浏览器传输，并严格转换上游 SSE 响应。编排逻辑位于 `open-sse/executors/claude-web.ts:320`。

> **初次使用 Web Cookie 提供者？**
>
> 在阅读此提供者专用指南之前，请先阅读 **`docs/getting-started/WEB-COOKIE-GUIDE.md`**，以了解常规设置流程、身份验证指南、限制和故障排除方法。

### 模型目录

提供者注册表目前仅公开以下七个静态模型 ID（`open-sse/config/providers/registry/claude/web/index.ts:11`）：

| 模型 ID                     | 显示名称                  |
| --------------------------- | ------------------------- |
| `claude-fable-5`            | Claude Fable 5（网页）    |
| `claude-opus-4-8`           | Claude Opus 4.8（网页）   |
| `claude-sonnet-5`           | Claude Sonnet 5（网页）   |
| `claude-haiku-4-5-20251001` | Claude Haiku 4.5（网页）  |
| `claude-opus-4-7`           | Claude Opus 4.7（网页）   |
| `claude-opus-4-6`           | Claude Opus 4.6（网页）   |
| `claude-sonnet-4-6`         | Claude Sonnet 4.6（网页） |

此提供者未实现动态模型发现。以上列表即为运行时目录。

### 凭据和组织解析

请提供完整的 `claude.ai` Cookie 标头或仅提供会话值。仅提供会话值时，该值会被规范化为 `sessionKey`；如果提供了其他 cookie，则会予以保留。执行器通过 `cookie` 或 `apiKey` 接收 cookie，并从连接数据中读取可选的 `deviceId` 和 `orgId` 值（`open-sse/executors/claude-web.ts:72`）。

如果没有 `orgId`，执行器会调用 `GET https://claude.ai/api/organizations`，并使用已通过身份验证的 Claude Web 会话返回的第一个组织（`open-sse/executors/claude-web.ts:141`）。如果未返回有效组织，则执行器会以封闭方式失败；被拒绝的会话授权会报告为 401，并且会区分 Cloudflare 质询和身份验证失败。

### 对话操作

可选的顶层 `claude_web` 对象采用严格模式。未知字段会被拒绝。其接受的字段定义在 `open-sse/executors/claude-web/session.ts:50` 中：

| 字段                  | 含义                                        |
| --------------------- | ------------------------------------------- |
| `operation`           | 默认为 `completion`；重试轮次请使用 `retry` |
| `conversation_id`     | 现有对话的显式 UUID                         |
| `parent_message_uuid` | 父级助手消息的显式 UUID                     |
| `timezone`            | 有效的 IANA 时区名称                        |
| `locale`              | 结构上有效的区域设置                        |
| `tool_states`         | 可选的账户工具状态数组，最多 128 个条目     |

准备好的请求会使用两个上游端点之一（`open-sse/executors/claude-web.ts:203`）：

- 新轮次或后续轮次会发送至
  `POST https://claude.ai/api/organizations/{orgId}/chat_conversations/{conversationId}/completion`。
- 重试请求会发送至
  `POST https://claude.ai/api/organizations/{orgId}/chat_conversations/{conversationId}/retry_completion`。

新轮次包含 `create_conversation_params`。缓存的或显式关联的后续轮次包含 `parent_message_uuid`，并省略 `create_conversation_params`。重试要求同时具备对话状态和父消息状态，并且不发送提示词（`open-sse/executors/claude-web/session.ts:254`）。新对话会在已通过身份验证的 UI 中打开 `/new`；缓存的或显式关联的后续轮次则会打开对应的确切对话页面（`open-sse/executors/claude-web/session.ts:324`）。

对话状态存储在内存缓存中，该缓存以 SHA-256 账户作用域和调用方的规范化对话记录作为键。条目会在 30 分钟后过期，缓存上限为 5,000 个条目（`open-sse/executors/claude-web/session.ts:12`）。仅当严格流解析器观察到 `message_stop` 后，状态才会被提交；进程重启会丢弃这些状态。缓存未命中时，多消息请求会被序列化为一个恢复提示词，而不会静默丢弃之前的消息。

区域设置和时区采用以下优先级：请求中的 `claude_web` 值、连接值、运行时值，然后区域设置默认为 `en-US`，时区默认为 `UTC`（`open-sse/executors/claude-web/session.ts:218`）。

### 工具和请求载荷

直接请求仅转换调用方提供且结构有效的 OpenAI 函数工具。系统不会虚构静态默认工具列表（`open-sse/executors/claude-web/payload.ts:102`）。

浏览器请求则会捕获已通过身份验证的 UI 请求，并保留其中的账户工具、工具状态和个性化样式。准备好的对话、模型、推理、提示词和消息 UUID 字段仍会覆盖捕获到的请求（`open-sse/executors/claude-web/browserTransport.ts:175`）。浏览器模板的作用域由账户、组织、cookie、区域设置和时区的哈希确定，并在 30 分钟后过期（`open-sse/executors/claude-web/browserTransport.ts:11`、`open-sse/executors/claude-web/browserTransport.ts:158`）。当直接请求没有调用方工具时，可以复用该作用域模板；显式提供的调用方工具具有更高优先级（`open-sse/executors/claude-web/browserTransport.ts:214`）。

### 传输方式选择

默认路径为 `sendClaudeWebDirect()`，它会使用配置的 Chrome 146 配置文件和提供的 cookie 调用 `tlsFetchClaude()`（`open-sse/services/claudeTlsClient.ts:23`）。它不会启动求解器，也不会生成替代 cookie。

将 `WEB_COOKIE_USE_BROWSER` 设置为 `1`、`true` 或 `on`，即可让账户作用域的浏览器适配器成为主要传输方式。将 `OMNIROUTE_BROWSER_POOL` 设置为上述任一值，可在识别到 Cloudflare 403 质询时，从直接传输回退到浏览器适配器（`open-sse/executors/claude-web.ts:195`）。其他 HTTP 失败不会触发该回退。

浏览器适配器将 Cookie 保留在同一个池化 Playwright 上下文中，使用上述作用域哈希键，并从该上下文发送补全请求（`open-sse/executors/claude-web/browserTransport.ts:444`）。它绝不会将浏览器解出的 Cookie 导出到直接 TLS 客户端中。浏览器重试需要一个未过期且绑定到同一实际 Playwright 上下文的 UI 模板（`open-sse/executors/claude-web/browserTransport.ts:467`）。浏览器响应会在已认证页面中以增量方式读取，遵循请求取消，并在上游响应体超过 16 MiB 时立即将其取消（`open-sse/executors/claude-web/browserTransport.ts:259`）。

执行器会向共享请求日志记录器返回经过脱敏的审计投影：组织、对话和消息 UUID、提示词文本、工具定义、Cookie 以及设备标识符均被排除（`open-sse/executors/claude-web.ts:237`、`open-sse/executors/claude-web.ts:252`）。传输异常也会返回通用连接错误，而不是抛出的消息。

### SSE 行为

`createClaudeWebResponse()` 可处理 LF 或 CRLF 分帧以及多行 `data:` 字段。它将文本增量映射到 `content`，将思考增量映射到 `reasoning_content`，并将已知元数据事件映射到 `claude_web` 响应扩展。每个元数据事件都会通过其各自的字段允许列表进行投影（`open-sse/executors/claude-web/stream.ts:37`）。对话、父消息、助手消息和操作元数据也会在 `X-OmniRoute-Claude-Web-*` 响应头中返回（`open-sse/executors/claude-web/stream.ts:364`）。

遇到格式错误的 JSON、上游 `error` 事件、未知事件类型、无效顺序、内容块不匹配，或在 `message_stop` 之前到达 EOF 时，解析器会以封闭方式失败。流式输出会发出一个结束块和一个 `[DONE]`；缓冲输出使用相同的解析器。解析器会立即将 `message_stop` 视为终止信号，取消其后的上游数据，并将下游取消传播到上游读取器（`open-sse/executors/claude-web/stream.ts:461`、`open-sse/executors/claude-web/stream.ts:563`）。未终止的 SSE 行和累积事件的上限为 1 MiB（`open-sse/executors/claude-web/stream.ts:17`、`open-sse/executors/claude-web/stream.ts:62`）。

### 文件

| 文件                                                     | 用途                   |
| -------------------------------------------------------- | ---------------------- |
| `open-sse/config/providers/registry/claude/web/index.ts` | 静态提供者模型注册表   |
| `open-sse/executors/claude-web.ts`                       | 执行器编排             |
| `open-sse/executors/claude-web/payload.ts`               | 载荷和工具转换         |
| `open-sse/executors/claude-web/session.ts`               | 轮次状态和转录缓存     |
| `open-sse/executors/claude-web/transport.ts`             | 直接传输适配器         |
| `open-sse/executors/claude-web/browserTransport.ts`      | 账户作用域浏览器适配器 |
| `open-sse/executors/claude-web/stream.ts`                | 严格的 SSE 转换        |
| `open-sse/services/claudeTlsClient.ts`                   | 原生 TLS 传输          |
| `open-sse/services/browserPool.ts`                       | 池化 Playwright 上下文 |

### 测试

无需真实凭据即可运行确定性的 Claude Web 测试套件：

```powershell
node --import tsx/esm --test tests/unit/claude-web-auto-refresh.test.ts tests/unit/claude-web-browser-transport.test.ts tests/unit/claude-web-executor-split.test.ts tests/unit/claude-web-live-alignment.test.ts tests/unit/claude-web-payload-runtime.test.ts tests/unit/claude-web-session.test.ts tests/unit/claude-web-sonnet5-registry-6209.test.ts tests/unit/claude-web-stream.test.ts tests/unit/claude-web-transport.test.ts tests/unit/claude-web.test.ts tests/unit/issue-6662-repro.test.ts
```

`tests/unit/claude-web-auto-refresh.test.ts` 中依赖 Playwright 的测试用例已被明确跳过。此仓库目前未定义使用凭据的 Claude Web 实时测试脚本，因此这些被跳过的用例不能作为运行时证明。

### 设置

1. 使用 `npm run dev` 或已构建的安装版本启动 OmniRoute。
2. 打开控制面板 → 提供者 → 添加提供者。
3. 选择 Web Cookie 类别和 Claude Web。
4. 粘贴从已认证的 `claude.ai` 请求中复制的完整 Cookie 请求头。
