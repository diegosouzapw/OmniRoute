---
title: "API Reference"
version: 3.8.40
lastUpdated: 2026-06-28
---

# API 参考

🌐 **Languages:** 🇺🇸 [English](../API_REFERENCE.md) | 🇧🇷 [Português (Brasil)](../../pt-BR/docs/reference/API_REFERENCE.md) | 🇪🇸 [Español](../../es/docs/reference/API_REFERENCE.md) | 🇫🇷 [Français](../../fr/docs/reference/API_REFERENCE.md) | 🇮🇹 [Italiano](../../it/docs/reference/API_REFERENCE.md) | 🇷🇺 [Русский](../../ru/docs/reference/API_REFERENCE.md) | 🇨🇳 [中文 (简体)](../../zh-CN/docs/reference/API_REFERENCE.md) | 🇩🇪 [Deutsch](../../de/docs/reference/API_REFERENCE.md) | 🇮🇳 [हिन्दी](../../in/docs/reference/API_REFERENCE.md) | 🇹🇭 [ไทย](../../th/docs/reference/API_REFERENCE.md) | 🇺🇦 [Українська](../../uk-UA/docs/reference/API_REFERENCE.md) | 🇸🇦 [العربية](../../ar/docs/reference/API_REFERENCE.md) | 🇯🇵 [日本語](../../ja/docs/reference/API_REFERENCE.md) | 🇻🇳 [Tiếng Việt](../../vi/docs/reference/API_REFERENCE.md) | 🇧🇬 [Български](../../bg/docs/reference/API_REFERENCE.md) | 🇩🇰 [Dansk](../../da/docs/reference/API_REFERENCE.md) | 🇫🇮 [Suomi](../../fi/docs/reference/API_REFERENCE.md) | 🇮🇱 [עברית](../../he/docs/reference/API_REFERENCE.md) | 🇭🇺 [Magyar](../../hu/docs/reference/API_REFERENCE.md) | 🇮🇩 [Bahasa Indonesia](../../id/docs/reference/API_REFERENCE.md) | 🇰🇷 [한국어](../../ko/docs/reference/API_REFERENCE.md) | 🇲🇾 [Bahasa Melayu](../../ms/docs/reference/API_REFERENCE.md) | 🇳🇱 [Nederlands](../../nl/docs/reference/API_REFERENCE.md) | 🇳🇴 [Norsk](../../no/docs/reference/API_REFERENCE.md) | 🇵🇹 [Português (Portugal)](../../pt/docs/reference/API_REFERENCE.md) | 🇷🇴 [Română](../../ro/docs/reference/API_REFERENCE.md) | 🇵🇱 [Polski](../../pl/docs/reference/API_REFERENCE.md) | 🇸🇰 [Slovenčina](../../sk/docs/reference/API_REFERENCE.md) | 🇸🇪 [Svenska](../../sv/docs/reference/API_REFERENCE.md) | 🇵🇭 [Filipino](../../phi/docs/reference/API_REFERENCE.md) | 🇨🇿 [Čeština](../../cs/docs/reference/API_REFERENCE.md)

OmniRoute 所有 API 端点的完整参考。

---

## 目录

- [Chat Completions](#chat-completions)
- [Embeddings](#embeddings)
- [图像生成](#图像生成)
- [模型列表](#模型列表)
- [兼容性端点](#兼容性端点)
- [Files API](#files-api)
- [Batches API](#batches-api)
- [Search API](#search-api)
- [WebSocket 流式传输](#websocket-流式传输)
- [配额与问题报告](#配额与问题报告)
- [语义缓存](#语义缓存)
- [Dashboard 与管理](#dashboard-与管理)
- [Combo 管理](#combo-管理)
- [Webhooks](#webhooks)
- [注册 Key（自动管理）](#注册-key自动管理)
- [Agents 协议](#agents-协议)
- [管理代理](#管理代理)
- [容灾（扩展）](#容灾扩展)
- [Skills](#skills)
- [Memory](#memory)
- [MCP Server](#mcp-server)
- [A2A Server](#a2a-server)
- [Cloud、评估与诊断](#cloud评估与诊断)
- [请求处理](#请求处理)
- [认证](#认证)

---

## Chat Completions

```bash
POST /v1/chat/completions
Authorization: Bearer your-api-key
Content-Type: application/json

{
  "model": "cc/claude-opus-4-6",
  "messages": [
    {"role": "user", "content": "Write a function to..."}
  ],
  "stream": true
}
```

### 自定义请求头

| 请求头                     | 方向   | 说明                                                                                                                            |
| -------------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------- |
| `X-OmniRoute-No-Cache`     | 请求   | 设为 `true` 以绕过缓存                                                                                                          |
| `x-omniroute-no-memory`    | 请求   | 设为 `true` 以跳过本请求的记忆 + 技能注入（与 no-cache 镜像；避免每次调用的 Token/成本开销）                                     |
| `X-OmniRoute-Progress`     | 请求   | 设为 `true` 以接收进度事件                                                                                                      |
| `X-Session-Id`             | 请求   | 粘性会话 Key，用于外部会话绑定                                                                                                  |
| `x_session_id`             | 请求   | 下划线变体同样接受（直接 HTTP）                                                                                                 |
| `Idempotency-Key`          | 请求   | 去重 Key（5 秒窗口）                                                                                                            |
| `X-Request-Id`             | 请求   | 备用去重 Key                                                                                                                    |
| `X-OmniRoute-Cache`        | 响应   | 缓存 `HIT` 或 `MISS`（非流式）                                                                                                  |
| `X-OmniRoute-Idempotent`   | 响应   | 去重命中时为 `true`                                                                                                             |
| `X-OmniRoute-Progress`     | 响应   | 进度跟踪开启时为 `enabled`                                                                                                      |
| `X-OmniRoute-Session-Id`   | 响应   | OmniRoute 使用的有效会话 ID                                                                                                     |
| `X-OmniRoute-Request-Id`   | 响应   | 请求关联 ID（已知时）                                                                                                          |
| `X-OmniRoute-Version`      | 响应   | OmniRoute 构建版本号（始终返回）                                                                                                 |
| `X-OmniRoute-Cost-Saved`   | 响应   | 缓存命中时节省的 USD 金额（仅缓存命中时）                                                                                        |

> Nginx 提示：如果依赖下划线请求头（如 `x_session_id`），请启用 `underscores_in_headers on;`。

> **成本遥测请求头：** 非流式成功响应还会携带 `X-OmniRoute-*` 成本遥测系列 — `X-OmniRoute-Response-Cost`（USD，固定 10 位小数；免费/无定价时为 `0.0000000000`）、`X-OmniRoute-Tokens-In` / `X-OmniRoute-Tokens-Out`、`X-OmniRoute-Model`、`X-OmniRoute-Provider`、`X-OmniRoute-Latency-Ms`、`X-OmniRoute-Cache-Hit` 以及 `X-OmniRoute-Fallback-Attempts`（仅在 >0 时返回），外加 `X-OmniRoute-Request-Id` 和 `X-OmniRoute-Version`。这些请求头由 chat completions、`/v1/responses`、`/v1/messages` **以及媒体端点**发出 — `/v1/embeddings`、`/v1/images/generations`、`/v1/audio/speech`、`/v1/audio/transcriptions`、`/v1/rerank`、`/v1/videos/generations`、`/v1/music/generations` 和 `/v1/moderations`（成本始终为 `0`）。媒体成本按模态计算（按图片、按秒、按字符、按搜索单元），仅在定价可用时计算，否则为 `0`（fail-open）。

> **缓存命中成本语义：** 语义缓存命中时（`X-OmniRoute-Cache-Hit: true`），不会发起上游调用，因此 `X-OmniRoute-Response-Cost` 为 `0.0000000000`（即命中的**增量**成本）。原始/本应产生的成本单独在 `X-OmniRoute-Cost-Saved` 中报告。计费消费者应累加 `X-OmniRoute-Response-Cost`（命中成本为零）；缓存分析可聚合 `X-OmniRoute-Cost-Saved`。

### `x-omniroute-compression`

按请求覆盖压缩计划。优先级最高 — 高于路由 Combo 覆盖、活动配置、自动触发和面板 Default。取值：

| 值            | 效果                                                     |
| ------------- | -------------------------------------------------------- |
| `off`         | 本请求不压缩。                                           |
| `default`     | 面板生成的 Default 配置（忽略活动配置）。                |
| `engine:<id>` | 启用时的单个引擎，如 `engine:rtk`。                      |
| `<combo>`     | 按名称匹配的命名 Combo（不区分大小写），其次按 id 匹配。 |

说明：

- 未知值将被忽略（绝不会因此拒绝请求）；解析回退到常规优先级顺序。
- 若多个 Combo 共享同一名称，请传入 Combo **id** 以获得确定性匹配。
- 名称为 `off` 或 `default` 的 Combo 无法按名称选择（这些关键词优先解释）；请通过 id 引用此类 Combo。
- 主压缩开关是硬门控：全局禁用压缩时，本请求头无法启用。

应用的计划会回显在响应请求头中：

```
X-OmniRoute-Compression: <mode>; source=<source>
```

其中 `<source>` 为以下之一：`request-header`、`routing-override`、`active-profile`、`auto-trigger`、`default` 或 `off`。

---

## Embeddings

```bash
POST /v1/embeddings
Authorization: Bearer your-api-key
Content-Type: application/json

{
  "model": "nebius/Qwen/Qwen3-Embedding-8B",
  "input": "The food was delicious"
}
```

可用服务商：Nebius、OpenAI、Mistral、Together AI、Fireworks、NVIDIA、**OpenRouter**、**GitHub Models**。

```bash
# 列出所有嵌入模型
GET /v1/embeddings
```

---

## 图像生成

```bash
POST /v1/images/generations
Authorization: Bearer your-api-key
Content-Type: application/json

{
  "model": "openai/gpt-image-2",
  "prompt": "A beautiful sunset over mountains",
  "size": "1024x1024"
}
```

可用服务商：OpenAI (GPT Image 2)、xAI (Grok Image)、Together AI (FLUX)、Fireworks AI、Nebius (FLUX)、Hyperbolic、NanoBanana、**OpenRouter**、SD WebUI (本地)、ComfyUI (本地)。

```bash
# 列出所有图像模型
GET /v1/images/generations
```

---

## 模型列表

```bash
GET /v1/models
Authorization: Bearer your-api-key

→ 以 OpenAI 格式返回所有 chat、embedding 和 image 模型 + Combo
```

### No-thinking 模型变体

对于支持 thinking 的 Claude 模型，`/v1/models` 还会列出一个 **no-thinking** 变体，其 id 前缀为 `claude-3-omniroute-no-thinking/`：

```
claude-3-omniroute-no-thinking/<provider>/<model>
```

选择此 id（例如在始终附加 `thinking` 块的 Claude Code 配置中）会解析回真实的 `<provider>/<model>`，并抑制推理功能 — 在 `/v1/messages` 路径上使用 `thinking:{type:"disabled"}`，或在 `/v1/chat/completions` 路径上丢弃 `reasoning`/`reasoning_effort` 字段。此变体仅列出给支持 thinking **且**接受 `disabled` 的 Claude 系列模型（因此，仅支持 adaptive 模式且拒绝 `disabled` 的模型不会被列出）。管理员可通过 `ModelSpec.noThinkingAlias` 按模型强制开启或关闭此变体。

---

## 兼容性端点

| 方法  | 路径                                        | 格式                             |
| ----- | ------------------------------------------- | -------------------------------- |
| POST  | `/v1/chat/completions`                      | OpenAI                           |
| POST  | `/v1/messages`                              | Anthropic                        |
| POST  | `/v1/responses`                             | OpenAI Responses                 |
| POST  | `/v1/embeddings`                            | OpenAI                           |
| POST  | `/v1/images/generations`                    | OpenAI Images                    |
| POST  | `/v1/images/edits`                          | OpenAI Images (编辑/修补)        |
| POST  | `/v1/videos/generations`                    | OpenAI 风格视频生成               |
| POST  | `/v1/music/generations`                     | OpenAI 风格音乐生成               |
| POST  | `/v1/audio/transcriptions`                  | OpenAI Audio (STT)               |
| POST  | `/v1/audio/speech`                          | OpenAI TTS (返回音频内容)         |
| POST  | `/v1/rerank`                                | Cohere/Voyage 风格重排序          |
| POST  | `/v1/moderations`                           | OpenAI Moderations               |
| GET   | `/v1/models`                                | OpenAI                           |
| POST  | `/v1/messages/count_tokens`                 | Anthropic                        |
| GET   | `/v1beta/models`                            | Gemini                           |
| POST  | `/v1beta/models/{...path}`                  | Gemini generateContent           |
| POST  | `/v1/api/chat`                              | Ollama                           |
| GET   | `/api/v1/vscode/{token}/`                   | OpenAI 目录别名                   |
| GET   | `/api/v1/vscode/{token}/models`             | OpenAI 模型别名                   |
| POST  | `/api/v1/vscode/{token}/chat/completions`   | OpenAI Token 化别名               |
| POST  | `/api/v1/vscode/{token}/responses`          | OpenAI Responses Token 化别名     |
| POST  | `/api/v1/vscode/{token}/api/chat`           | Ollama Token 化别名               |
| GET   | `/api/v1/vscode/{token}/api/tags`           | Ollama 标签 Token 化别名          |

所有 POST 路由遵循同一模式：`Bearer your-api-key` + 经 Zod 校验的 JSON 请求体（`v1RerankSchema`、`v1ModerationSchema`、`v1AudioSpeechSchema` 等，参见 `src/shared/validation/schemas.ts`）。Schema 校验失败返回 4xx。

对于无法附加 `Authorization: Bearer ...` 的客户端，OmniRoute 也接受通过 URL 传入 API Key：查询字符串兼容方式（`?token=...`、`?apiKey=...`、`?api_key=...`、`?key=...`）或下文介绍的专用 `/api/v1/vscode/{token}/...` 端点。

```bash
# 重排序
POST /v1/rerank      { "model": "cohere/rerank-3", "query": "...", "documents": ["..."] }

# 内容审核
POST /v1/moderations { "model": "omni-moderation-latest", "input": "..." }

# TTS — 返回 audio/mpeg（或指定格式）内容
POST /v1/audio/speech { "model": "openai/tts-1", "input": "Hello", "voice": "alloy" }

# 图像编辑 (multipart)
POST /v1/images/edits  -F image=@input.png -F prompt="..." -F mask=@mask.png

# 视频 / 音乐生成 (带服务商前缀的模型 id)
POST /v1/videos/generations { "model": "runway/gen-3", "prompt": "..." }
POST /v1/music/generations  { "model": "suno/v3.5",   "prompt": "..." }
```

### 专用服务商路由

```bash
POST /v1/providers/{provider}/chat/completions
POST /v1/providers/{provider}/embeddings
POST /v1/providers/{provider}/images/generations
```

服务商前缀缺少时会自动添加。模型不匹配时返回 `400`。

---

## Files API

OpenAI 兼容的文件端点，用于批量输入/输出和按用途上传文件。

| 方法   | 路径                       | 说明                                                                                                     |
| ------ | -------------------------- | -------------------------------------------------------------------------------------------------------- |
| POST   | `/v1/files`                | 上传文件（multipart: `file`、`purpose`、`expires_after[anchor]`、`expires_after[seconds]`）— 最大 512 MiB |
| GET    | `/v1/files`                | 列出当前认证 API Key 下的文件                                                                             |
| GET    | `/v1/files/[id]`           | 查询文件元数据                                                                                           |
| DELETE | `/v1/files/[id]`           | 删除文件                                                                                                 |
| GET    | `/v1/files/[id]/content`   | 流式返回原始文件内容                                                                                     |

**认证：** Bearer API Key — 文件通过 `getApiKeyRequestScope` 按 API Key 隔离。

---

## Batches API

OpenAI 兼容的批量处理。

| 方法   | 路径                        | 说明                                                                                        |
| ------ | --------------------------- | ------------------------------------------------------------------------------------------- |
| POST   | `/v1/batches`               | 创建批次 — 请求体经 `v1BatchCreateSchema` 校验（`input_file_id`、`endpoint`、`completion_window`） |
| GET    | `/v1/batches`               | 列出批次                                                                                    |
| GET    | `/v1/batches/[id]`          | 查询批次状态 + `request_counts`                                                              |
| DELETE | `/v1/batches/[id]`          | 删除已完成/已失败的批次                                                                      |
| POST   | `/v1/batches/[id]/cancel`   | 取消进行中的批次                                                                            |

**认证：** Bearer API Key。批次按 API Key 隔离。

---

## Search API

Web/搜索服务商抽象层（Tavily、Brave、Exa、Serper 等）。

| 方法 | 路径                     | 说明                                                                           |
| ---- | ------------------------ | ------------------------------------------------------------------------------ |
| GET  | `/v1/search`             | 列出已配置的搜索服务商 + 能力信息                                               |
| POST | `/v1/search`             | 执行搜索查询 — 请求体经 `v1SearchSchema` 校验，支持缓存/合并                   |
| GET  | `/v1/search/analytics`   | 按服务商的命中/延迟/缓存统计数据                                               |

**认证：** Bearer API Key（`extractApiKey` + `isValidApiKey`）。搜索策略通过 `enforceApiKeyPolicy` 强制执行。

---

## WebSocket 流式传输

```bash
GET /v1/ws?handshake=1
```

验证 WebSocket 升级握手并返回协议示例消息（`request`、`cancel`）。实际 WS 帧由内建的 WS 服务器在 Next.js 路由表之外处理。

**认证：** 握手期间使用 Bearer API Key。

### 通过 WebSocket 的 Responses API（仅限 codex）

```bash
# 与 HTTP API 相同的主机:端口（默认 20128）；升级连接：
wscat -c "ws://localhost:20128/v1/responses?api_key=<OMNIROUTE_API_KEY>"
# (或： -H "Authorization: Bearer <OMNIROUTE_API_KEY>")

# 第一帧必须是 response.create：
{ "type": "response.create", "model": "gpt-5.5", "input": [ { "role": "user", "content": "hi" } ] }
```

Responses-API-over-WebSocket 代理**仅绑定到 `codex`**（ChatGPT 后端）。它监听与 API/dashboard 相同的端口，路径包括 `/v1/responses`、`/responses` 和 `/api/v1/responses`。在收到首个 `response.create` 帧后，通过内部 `codex-responses-ws` 桥接进行认证和准备，选择一个 codex OAuth 连接，并通过 `wreq-js` 传输隧道化至 `wss://chatgpt.com/backend-api/codex/responses`。**非 codex 模型将被拒绝**（`codex_ws_provider_required`）。如需配额共享路由，使用 `model: "qtSd/<group>/codex/<model>"`。实现在 `app/server-ws.mjs` + `scripts/dev/responses-ws-proxy.mjs` + `src/app/api/internal/codex-responses-ws/route.ts`。

**认证：** 握手期间使用 Bearer API Key。内建的 HTTP 服务器（`server-ws.mjs`）必须是活动入口（当 `app/server-ws.mjs` 存在时默认为此入口）。

#### 模型 id：使用裸 ChatGPT id（不用 `codex/` 前缀）

OpenAI **Codex CLI** 在 `supports_websockets = true` 时会在客户端侧校验模型名称，并**拒绝带服务商前缀的 id**，如 `codex/gpt-5.5`（`The 'codex/gpt-5.5' model is not supported when using Codex with a ChatGPT account`）。请发送**裸** id（如 `gpt-5.5`）。OmniRoute 的桥接仅限 codex，因此会通过 `resolveCodexWsModelInfo` 将裸 id 重新解析为 codex 模型后隧道化到上游 — 尽管裸的 `gpt-5.5` 在 HTTP 下会路由到其他服务商。

#### 配置 OpenAI Codex CLI

通过在 `~/.codex/config.toml` 中添加支持 WebSocket 的自定义服务商，将 Codex CLI 指向 OmniRoute（使用单独的 `CODEX_HOME` 以避免覆盖已有配置）：

```toml
model = "gpt-5.5"                 # 裸 id — 不要用 "codex/gpt-5.5"
model_provider = "omniroute"

[model_providers.omniroute]
name = "OmniRoute (WS)"
base_url = "http://localhost:20128/v1"   # 不要加尾部斜杠；WS URL 由此派生（生产环境使用 https/wss）
wire_api = "responses"                    # 自 2026 年 2 月起仅支持该值
supports_websockets = true                # 启用 Responses-over-WS 传输
env_key = "OMNIROUTE_API_KEY"             # 持有 OmniRoute API Key（Bearer）
```

```bash
export OMNIROUTE_API_KEY=sk-...           # 一个 OmniRoute API Key（若 REQUIRE_API_KEY=false 则任意 Key）
codex exec "Responda apenas: PONG"
```

CLI 将 `base_url + /responses` 升级为 WebSocket，OmniRoute 将其隧道化到选定的 codex OAuth 连接。已对本地服务器完成端到端验证：ChatGPT 返回 `codex.rate_limits` + `response.created` 并流式传输补全结果。

---

## 配额与问题报告

| 方法 | 路径                  | 说明                                                                          |
| ---- | --------------------- | ----------------------------------------------------------------------------- |
| GET  | `/v1/quotas/check`    | 在发放注册 Key 之前预先校验指定 `provider` + `accountId` 的配额               |
| POST | `/v1/issues/report`   | 向 GitHub 报告配额/Key 发放失败（需要 `GITHUB_ISSUES_REPO` + Token）           |

**认证：** Bearer API Key（`isAuthenticated`）。

---

## 语义缓存

```bash
# 获取缓存统计
GET /api/cache/stats

# 清空所有缓存
DELETE /api/cache/stats
```

响应示例：

```json
{
  "semanticCache": {
    "memorySize": 42,
    "memoryMaxSize": 500,
    "dbSize": 128,
    "hitRate": 0.65
  },
  "idempotency": {
    "activeKeys": 3,
    "windowMs": 5000
  }
}
```

---

## Dashboard 与管理

### 认证

| 端点                            | 方法    | 说明               |
| ------------------------------- | ------- | ------------------ |
| `/api/auth/login`               | POST    | 登录               |
| `/api/auth/logout`              | POST    | 登出               |
| `/api/settings/require-login`   | GET/PUT | 切换登录要求       |

### 服务商管理

| 端点                         | 方法                  | 说明                                 |
| ---------------------------- | --------------------- | ------------------------------------ |
| `/api/providers`             | GET/POST              | 列出 / 创建服务商                    |
| `/api/providers/[id]`        | GET/PUT/DELETE        | 管理服务商                           |
| `/api/providers/[id]/test`   | POST                  | 测试服务商连接                       |
| `/api/providers/[id]/models` | GET                   | 列出服务商模型                       |
| `/api/providers/validate`    | POST                  | 校验服务商配置                       |
| `/api/provider-nodes*`       | Various               | 服务商节点管理                       |
| `/api/provider-models`       | GET/POST/PATCH/DELETE | 自定义模型（添加、更新、隐藏/显示、删除） |

### OAuth 流程

| 端点                               | 方法    | 说明                   |
| ---------------------------------- | ------- | ---------------------- |
| `/api/oauth/[provider]/[action]`   | Various | 服务商特定的 OAuth      |

### 路由与配置

| 端点                | 方法      | 说明                             |
| ------------------- | --------- | -------------------------------- |
| `/api/models/alias` | GET/POST  | 模型别名                         |
| `/api/models/catalog` | GET     | 按服务商+类型列出所有模型         |
| `/api/combos*`      | Various   | Combo 管理                       |
| `/api/keys*`        | Various   | API Key 管理                     |
| `/api/pricing`      | GET       | 模型定价                         |

### 用量与分析

| 端点                        | 方法            | 说明                             |
| --------------------------- | --------------- | -------------------------------- |
| `/api/usage/history`        | GET             | 用量历史                         |
| `/api/usage/logs`           | GET             | 用量日志                         |
| `/api/usage/request-logs`   | GET             | 请求级日志                       |
| `/api/usage/[connectionId]` | GET             | 按连接的用量                     |
| `/api/usage/token-limits`   | GET/POST/DELETE | 按 API Key 的 Token 额度预算      |

### 设置

| 端点                                  | 方法          | 说明                                   |
| ------------------------------------- | ------------- | -------------------------------------- |
| `/api/settings`                       | GET/PUT/PATCH | 通用设置                               |
| `/api/settings/proxy`                 | GET/PUT       | 网络代理配置                           |
| `/api/settings/proxy/test`            | POST          | 测试代理连接                           |
| `/api/settings/ip-filter`             | GET/PUT       | IP 允许/阻止列表                       |
| `/api/settings/thinking-budget`       | GET/PUT       | 推理 Token 预算                         |
| `/api/settings/system-prompt`         | GET/PUT       | 全局系统提示                           |
| `/api/settings/compression`           | GET/PUT       | 全局压缩配置                           |
| `/api/settings/purge-request-history` | POST          | 清除请求日志行及本地调用日志产物        |

### 上下文与压缩

| 端点                                     | 方法           | 说明                                                                    |
| ---------------------------------------- | -------------- | ----------------------------------------------------------------------- |
| `/api/compression/preview`               | POST           | 预览 off/lite/standard/aggressive/ultra/RTK/stacked 压缩效果              |
| `/api/compression/language-packs`        | GET            | 列出可用的 Caveman 语言包                                                |
| `/api/compression/rules`                 | GET            | 列出 Caveman 规则元数据                                                  |
| `/api/context/caveman/config`            | GET/PUT        | Caveman 特定设置别名                                                     |
| `/api/context/rtk/config`                | GET/PUT        | RTK 特定设置，包括自定义过滤器和原始输出保留                            |
| `/api/context/rtk/filters`               | GET            | RTK 过滤器目录和自定义过滤器诊断                                         |
| `/api/context/rtk/test`                  | POST           | 对文本载荷运行 RTK 预览/测试                                            |
| `/api/context/rtk/raw-output/[id]`       | GET            | 按指针 id 读取保存的脱敏原始输出                                        |
| `/api/context/combos`                    | GET/POST       | 压缩 Combo 列表/创建                                                    |
| `/api/context/combos/[id]`               | GET/PUT/DELETE | 压缩 Combo 详情/更新/删除                                               |
| `/api/context/combos/[id]/assignments`   | GET/PUT        | 将压缩 Combo 分配给路由 Combo                                           |
| `/api/context/analytics`                 | GET            | 压缩分析别名                                                            |

### 监控

| 端点                       | 方法       | 说明                                                                                                     |
| -------------------------- | ---------- | -------------------------------------------------------------------------------------------------------- |
| `/api/sessions`            | GET        | 活跃会话跟踪                                                                                             |
| `/api/rate-limits`         | GET        | 按账户的速率限制                                                                                         |
| `/api/monitoring/health`   | GET        | 健康检查 + 服务商摘要（`catalogCount`、`configuredCount`、`activeCount`、`monitoredCount`）                |
| `/api/cache/stats`         | GET/DELETE | 缓存统计 / 清空                                                                                          |

### 备份与导出/导入

| 端点                          | 方法 | 说明                                   |
| ----------------------------- | ---- | -------------------------------------- |
| `/api/db-backups`             | GET  | 列出可用的备份                         |
| `/api/db-backups`             | PUT  | 创建手动备份                           |
| `/api/db-backups`             | POST | 从指定备份恢复                         |
| `/api/db-backups/export`      | GET  | 下载数据库 .sqlite 文件                |
| `/api/db-backups/import`      | POST | 上传 .sqlite 文件替换数据库            |
| `/api/db-backups/exportAll`   | GET  | 下载完整备份 .tar.gz 归档              |

### 云同步

| 端点                   | 方法    | 说明               |
| ---------------------- | ------- | ------------------ |
| `/api/sync/cloud`      | Various | 云同步操作         |
| `/api/sync/initialize` | POST    | 初始化同步         |
| `/api/cloud/*`         | Various | 云管理             |

### 隧道

| 端点                         | 方法 | 说明                                                       |
| ---------------------------- | ---- | ---------------------------------------------------------- |
| `/api/tunnels/cloudflared`   | GET  | 读取 Cloudflare Quick Tunnel 安装/运行状态（供 dashboard）   |
| `/api/tunnels/cloudflared`   | POST | 启用或禁用 Cloudflare Quick Tunnel（`action=enable/disable`）|
| `/api/tunnels/ngrok`         | GET  | 读取 ngrok Tunnel 运行状态（供 dashboard）                  |
| `/api/tunnels/ngrok`         | POST | 启用或禁用 ngrok Tunnel（`action=enable/disable`）           |

### CLI 工具

| 端点                                 | 方法 | 说明                |
| ------------------------------------ | ---- | ------------------- |
| `/api/cli-tools/claude-settings`     | GET  | Claude CLI 状态     |
| `/api/cli-tools/codex-settings`      | GET  | Codex CLI 状态      |
| `/api/cli-tools/droid-settings`      | GET  | Droid CLI 状态      |
| `/api/cli-tools/openclaw-settings`   | GET  | OpenClaw CLI 状态   |
| `/api/cli-tools/runtime/[toolId]`    | GET  | 通用 CLI 运行状态   |

CLI 响应包括：`installed`、`runnable`、`command`、`commandPath`、`runtimeMode`、`reason`。

### ACP Agents

| 端点              | 方法   | 说明                                                           |
| ----------------- | ------ | -------------------------------------------------------------- |
| `/api/acp/agents` | GET    | 列出所有检测到的代理（内置 + 自定义）及其状态                   |
| `/api/acp/agents` | POST   | 添加自定义代理或刷新检测缓存                                   |
| `/api/acp/agents` | DELETE | 按 `id` 查询参数删除自定义代理                                  |

GET 响应包含 `agents[]`（id、name、binary、version、installed、protocol、isCustom）和 `summary`（total、installed、notFound、builtIn、custom）。

### 容灾与速率限制

| 端点                                | 方法      | 说明                                                                                 |
| ----------------------------------- | --------- | ------------------------------------------------------------------------------------ |
| `/api/resilience`                   | GET/PATCH | 获取/更新请求队列、连接冷却、服务商熔断器及等待设置                                  |
| `/api/resilience/reset`             | POST      | 重置服务商熔断器                                                                     |
| `/api/resilience/model-cooldowns`   | GET       | 列出活跃的按(服务商, 连接, 模型)锁定的状态，按剩余时间排序                             |
| `/api/resilience/model-cooldowns`   | DELETE    | 清除模型锁定 — 请求体 `{provider, model}` 或 `{all: true}` 以清除全部                  |
| `/api/rate-limits`                  | GET       | 按账户的速率限制状态                                                                 |
| `/api/rate-limit`                   | GET       | 全局速率限制配置                                                                     |

> 所有四个 `/api/resilience/*` 路由都需要**管理认证**（`requireManagementAuth`）。关于服务商熔断器 vs 连接冷却 vs 模型锁定的完整说明，参阅 [容灾（扩展）](#容灾扩展)。

### Evals

| 端点         | 方法      | 说明                             |
| ------------ | --------- | -------------------------------- |
| `/api/evals` | GET/POST  | 列出评估套件 / 运行评估           |

### Policies

| 端点            | 方法            | 说明                 |
| --------------- | --------------- | -------------------- |
| `/api/policies` | GET/POST/DELETE | 管理路由策略         |

### Compliance

| 端点                          | 方法 | 说明                       |
| ----------------------------- | ---- | -------------------------- |
| `/api/compliance/audit-log`   | GET  | 合规审计日志（最近 N 条）   |

### v1beta（Gemini 兼容）

| 端点                         | 方法 | 说明                             |
| ---------------------------- | ---- | -------------------------------- |
| `/v1beta/models`             | GET  | 以 Gemini 格式列出模型            |
| `/v1beta/models/{...path}`   | POST | Gemini `generateContent` 端点     |

这些端点镜像 Gemini 的 API 格式，供期望原生 Gemini SDK 兼容的客户端使用。

### 内部 / 系统 API

| 端点                       | 方法 | 说明                                                   |
| -------------------------- | ---- | ------------------------------------------------------ |
| `/api/init`                | GET  | 应用初始化检查（用于首次运行）                          |
| `/api/tags`                | GET  | Ollama 兼容的模型标签（供 Ollama 客户端）              |
| `/api/restart`             | POST | 触发优雅重启                                           |
| `/api/shutdown`            | POST | 触发优雅关闭                                           |
| `/api/system/env/repair`   | POST | 修复 OAuth 服务商环境变量                               |

> **注意：** 这些端点供系统内部使用或 Ollama 客户端兼容，终端用户通常无需调用。

### OAuth 环境修复 _(v3.6.1+)_

```bash
POST /api/system/env/repair
Content-Type: application/json

{
  "provider": "claude-code"
}
```

修复特定服务商缺失或损坏的 OAuth 环境变量。返回：

```json
{
  "success": true,
  "repaired": ["CLAUDE_CODE_OAUTH_CLIENT_ID", "CLAUDE_CODE_OAUTH_CLIENT_SECRET"],
  "backupPath": "/home/user/.omniroute/backups/env-repair-2026-04-11.bak"
}
```

---

## Audio Transcription

```bash
POST /v1/audio/transcriptions
Authorization: Bearer your-api-key
Content-Type: multipart/form-data
```

使用 Deepgram 或 AssemblyAI 转录音频文件。

**请求：**

```bash
curl -X POST http://localhost:20128/v1/audio/transcriptions \
  -H "Authorization: Bearer your-api-key" \
  -F "file=@recording.mp3" \
  -F "model=deepgram/nova-3"
```

**响应：**

```json
{
  "text": "Hello, this is the transcribed audio content.",
  "task": "transcribe",
  "language": "en",
  "duration": 12.5
}
```

**支持的服务商：** `deepgram/nova-3`、`assemblyai/best`。

**支持的格式：** `mp3`、`wav`、`m4a`、`flac`、`ogg`、`webm`。

---

## Ollama 兼容性

适用于使用 Ollama API 格式的客户端：

```bash
# Chat 端点（Ollama 格式）
POST /v1/api/chat

# 模型列表（Ollama 格式）
GET /api/tags
```

请求在 Ollama 与内部格式之间自动转换。

## Token 化 VS Code / 无请求头别名

当集成无法注入 `Authorization` 请求头、需要将 API Key 嵌入 base URL 时，请使用这些别名。

```bash
# OpenAI 风格目录别名
GET /api/v1/vscode/{token}/
GET /api/v1/vscode/{token}/models

# OpenAI 风格 chat 别名
POST /api/v1/vscode/{token}/chat/completions
POST /api/v1/vscode/{token}/responses

# Ollama 风格别名
POST /api/v1/vscode/{token}/api/chat
GET /api/v1/vscode/{token}/api/tags
```

示例：

```bash
curl https://your-host.example/api/v1/vscode/YOUR_API_KEY/models
curl -X POST https://your-host.example/api/v1/vscode/YOUR_API_KEY/chat/completions \
  -H "Content-Type: application/json" \
  -d '{"model":"auto","messages":[{"role":"user","content":"hello"}]}'
```

说明：

- Token 化别名复用与 `/v1/*` 和 `/api/tags` 相同的处理器；响应格式保持一致。
- 只要客户端支持自定义请求头，应优先使用 `Authorization: Bearer ...`。
- 基于 URL 的 Token 可能出现在反向代理日志、浏览器历史和 OmniRoute 之外的遥测中。将其作为兼容选项而不是默认的认证方式。

---

## Telemetry

```bash
# 获取延迟遥测摘要（按服务商的 p50/p95/p99）
GET /api/telemetry/summary
```

**响应：**

```json
{
  "providers": {
    "claudeCode": { "p50": 245, "p95": 890, "p99": 1200, "count": 150 },
    "github": { "p50": 180, "p95": 620, "p99": 950, "count": 320 }
  }
}
```

---

## 预算

```bash
# 获取所有 API Key 的预算状态
GET /api/usage/budget

# 设置或更新预算
POST /api/usage/budget
Content-Type: application/json

{
  "apiKeyId": "key-123",
  "dailyLimitUsd": 5.00,
  "weeklyLimitUsd": 30.00,
  "monthlyLimitUsd": 100.00,
  "warningThreshold": 0.8,
  "resetInterval": "monthly"
}
```

> **Schema 说明**（`setBudgetSchema`）：`apiKeyId` 为必填字段；`dailyLimitUsd`、`weeklyLimitUsd` 或 `monthlyLimitUsd` 中至少有一项必须大于零。可选字段：`warningThreshold`（0–1）、`resetInterval`（`daily` | `weekly` | `monthly`）、`resetTime`（`HH:MM`）。旧的 `{keyId, limit, period}` 格式将返回 `400 Bad Request`。

## Token 限制

按 API Key 的 **Token 用量**预算（与上述基于 USD 的预算不同）。在请求路径上内联执行：当某个 Key 当前窗口用量达到限制时，请求将被拒绝并返回 `429 Too Many Requests`。限制可作用于特定 `model`、`provider` 或按 Key 全局（`global`）应用；当多个限制同时匹配时，取最严格的一个。

```bash
# 列出某个 Key 的 Token 限制（含实时窗口用量）
GET /api/usage/token-limits?apiKeyId=key-123

# 创建或更新 Token 限制
POST /api/usage/token-limits
Content-Type: application/json

{
  "apiKeyId": "key-123",
  "scopeType": "model",
  "scopeValue": "openai/gpt-4o",
  "tokenLimit": 1000000,
  "resetInterval": "monthly",
  "enabled": true
}

# 按 id 删除 Token 限制
DELETE /api/usage/token-limits?id=tl-abc
```

> **Schema 说明**（`setTokenLimitSchema`）：`apiKeyId` 和 `scopeType`（`model` | `provider` | `global`）为必填字段。`scopeValue` 在 `scopeType` 非 `global` 时为必填（如 `model` 作用域填模型 id，`provider` 作用域填服务商 id）。`tokenLimit` 必须为正整数（从字符串强制转换）。可选字段：`id`（省略为创建，提供为更新）、`resetInterval`（`daily` | `weekly` | `monthly`，默认 `monthly`）、`resetTime`（`HH:MM`）、`enabled`（默认 `true`）。`GET` 响应会为每个限制附加 `tokensUsed`、`remaining`、`windowStart`、`periodStartAt` 和 `nextResetAt`。此为管理级端点（认证由 authz 管道集中执行）。

## 请求处理

1. 客户端向 `/v1/*` 发送请求
2. 路由处理器调用 `handleChat`、`handleEmbedding`、`handleAudioTranscription` 或 `handleImageGeneration`
3. 解析模型（直接指定 服务商/模型 或别名/Combo）
4. 从本地数据库选择凭证，并过滤账户可用性
5. 对于 chat：`handleChatCore` 检查语义/签名缓存并解析 Combo 压缩设置
6. 启用时，在服务商转换前执行主动压缩（`lite`、Caveman、RTK 或 stacked）
7. 服务商执行器发送上游请求
8. 响应转换回客户端格式（chat）或原样返回（embeddings/images/audio）
9. 记录用量、压缩分析和请求日志
10. 错误时按 Combo 规则应用容灾

完整架构参考：[`ARCHITECTURE.md`](../../architecture/ARCHITECTURE.md)

---

## Combo 管理

更高层的路由 Combo（已在 `/api/combos*` 下概述）也可以从模型 id 模式进行 1:1 映射，从而将 OpenAI 风格的模型 id 透明重定向到 Combo。

| 方法   | 路径                               | 说明                                                                         |
| ------ | ---------------------------------- | ---------------------------------------------------------------------------- |
| GET    | `/api/model-combo-mappings`        | 列出所有模型→Combo 映射                                                       |
| POST   | `/api/model-combo-mappings`        | 创建映射 — 请求体：`{pattern, comboId, priority?, enabled?, description?}`    |
| GET    | `/api/model-combo-mappings/[id]`   | 查询单个映射                                                                 |
| PUT    | `/api/model-combo-mappings/[id]`   | 更新已有映射的字段                                                            |
| DELETE | `/api/model-combo-mappings/[id]`   | 删除映射                                                                     |

**认证：** 管理会话/API Key（`requireManagementAuth`）。

---

## Webhooks

OmniRoute 事件（请求完成、配额耗尽、Key 轮换等）的出站 Webhook 订阅。

| 方法   | 路径                        | 说明                                                          |
| ------ | --------------------------- | ------------------------------------------------------------- |
| GET    | `/api/webhooks`             | 列出 Webhook（secret 脱敏显示为 `<prefix>...`）               |
| POST   | `/api/webhooks`             | 创建 Webhook — 请求体：`{url, events?: ["*"], secret?, description?}` |
| GET    | `/api/webhooks/[id]`        | 查询 Webhook                                                  |
| PUT    | `/api/webhooks/[id]`        | 更新 url/events/secret/description                           |
| DELETE | `/api/webhooks/[id]`        | 删除 Webhook                                                  |
| POST   | `/api/webhooks/[id]/test`   | 向 Webhook URL 发送测试载荷并返回投递状态                     |

**认证：** 管理会话/API Key（`requireManagementAuth`）。

---

## 注册 Key（自动管理）

由自动 Key 管理子系统使用，用于向支持的服务商/账户发放和轮换 API Key，并设有每日/每小时配额。

| 方法   | 路径                                    | 说明                                                                                                                                                 |
| ------ | --------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| GET    | `/api/v1/registered-keys`               | 列出注册 Key（仅显示脱敏前缀）                                                                                                                        |
| POST   | `/api/v1/registered-keys`               | 发放新的注册 Key — 请求体：`{name, provider?, accountId?, idempotencyKey?, expiresAt?, dailyBudget?, hourlyBudget?}`。**仅返回一次**原始 Key。配额拒绝时返回 `429`。 |
| GET    | `/api/v1/registered-keys/[id]`          | 查询注册 Key 的元数据（不含原始密钥）                                                                                                                 |
| DELETE | `/api/v1/registered-keys/[id]`          | 吊销注册 Key                                                                                                                                         |
| POST   | `/api/v1/registered-keys/[id]/revoke`   | 显式吊销端点（与 DELETE 效果相同）                                                                                                                    |

**认证：** Bearer API Key（`isAuthenticated`）。另见 `/v1/quotas/check` 和 `/v1/issues/report`。

---

## Agents 协议

Cloud Agent 任务（Claude Code、Codex Cloud、OpenHands 等）代表 OmniRoute 用户远程执行。

| 方法   | 路径                            | 说明                                                                                                                                 |
| ------ | ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| GET    | `/api/v1/agents/tasks`          | 列出任务 — 可选 `?provider=`、`?status=`、`?limit=`（1–500，默认 50）                                                                  |
| POST   | `/api/v1/agents/tasks`          | 创建任务 — 请求体经 `CreateCloudAgentTaskSchema` 校验（`providerId`、`prompt`、`source`、`options?`）。返回 `201` 和任务信封               |
| DELETE | `/api/v1/agents/tasks?id=...`   | 删除任务                                                                                                                            |
| GET    | `/api/v1/agents/tasks/[id]`     | 读取任务 — 当 `external_id` 已设置时，同步刷新来自上游云代理的状态                                                                     |
| POST   | `/api/v1/agents/tasks/[id]`     | 区分动作：`{action: "approve"}`、`{action: "message", message}` 或 `{action: "cancel"}`                                               |
| DELETE | `/api/v1/agents/tasks/[id]`     | 按 id 删除特定任务                                                                                                                   |

> **认证：** 所有方法都需要管理认证（`requireCloudAgentManagementAuth`）。v3.8.0 之前这些端点未做认证 — 参见 commit `588a0333` 了解重大变更。

```bash
# 创建 Claude Code 云任务
curl -X POST http://localhost:20128/api/v1/agents/tasks \
  -H "Authorization: Bearer your-management-key" \
  -H "Content-Type: application/json" \
  -d '{"providerId":"claude-code-cloud","prompt":"Fix the failing test","source":{"repo":"...","branch":"..."}}'
```

---

## 管理代理

可分配给服务商、账户或全局的出站 HTTP(S)/SOCKS 代理。

| 方法   | 路径                                           | 说明                                                                                                                                             |
| ------ | ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| GET    | `/api/v1/management/proxies`                   | 列出代理（加 `?id=` 返回单个；加 `?id=&where_used=1` 返回分配图）                                                                                 |
| POST   | `/api/v1/management/proxies`                   | 创建代理 — 请求体经 `createProxyRegistrySchema` 校验                                                                                               |
| PATCH  | `/api/v1/management/proxies`                   | 更新代理 — 请求体经 `updateProxyRegistrySchema` 校验（需要 `id`）                                                                                  |
| DELETE | `/api/v1/management/proxies?id=...&force=1`    | 删除代理（使用 `force=1` 解除分配）                                                                                                                |
| GET    | `/api/v1/management/proxies/assignments`       | 列出分配 — 可按 `proxy_id`、`scope`、`scope_id` 过滤；传入 `resolve_connection_id=<id>` 解析连接的活跃代理                                           |
| PUT    | `/api/v1/management/proxies/assignments`       | 分配 — 请求体经 `proxyAssignmentSchema` 校验（`{scope, scopeId?, proxyId?}`）。清除调度器缓存                                                        |
| PUT    | `/api/v1/management/proxies/bulk-assign`       | 批量分配 — 请求体经 `bulkProxyAssignmentSchema` 校验（`{scope, scopeIds[], proxyId?}`）                                                              |
| GET    | `/api/v1/management/proxies/health?hours=24`   | 指定窗口内的聚合代理健康状态（成功/失败次数、延迟）                                                                                                |

**认证：** 所有路由均需管理会话/API Key（`requireManagementAuth`）。

> 任务描述中的 `POST /api/v1/management/proxies/[id]/assignments` 和 `POST /api/v1/management/proxies/[id]/health` 由上述扁平的 `/assignments` 和 `/health` 路由提供服务 — 代码库中不存在按 id 的子路由。

---

## 容灾（扩展）

OmniRoute 公开三个独立的临时故障机制；以下管理端点允许管理员读取和覆盖它们：

| 范围               | 状态存储                                      | 读取                                      | 重置 / 清除                                 |
| ------------------ | --------------------------------------------- | ----------------------------------------- | ------------------------------------------- |
| 服务商熔断器       | `domain_circuit_breakers` + 内存               | `/api/monitoring/health`                  | `POST /api/resilience/reset`                |
| 连接冷却           | 服务商连接的 `rateLimitedUntil`                | `/api/rate-limits`、`/api/providers/[id]` | （延迟自动恢复；通过服务商 PUT 清除）         |
| 模型锁定           | 内存中的模型可用性注册表                       | `GET /api/resilience/model-cooldowns`     | `DELETE /api/resilience/model-cooldowns`    |

`PATCH /api/resilience` 通过 `providerBreaker.oauth` 和 `providerBreaker.apikey` 接受服务商熔断器覆盖。每种配置支持 `degradationThreshold`、`failureThreshold` 和 `resetTimeoutMs`；相同字段在 Dashboard → Settings → Resilience 中可见。

```bash
# 清除单个模型锁定
curl -X DELETE http://localhost:20128/api/resilience/model-cooldowns \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{"provider":"openai","model":"gpt-4o-mini"}'

# 清除所有锁定
curl -X DELETE http://localhost:20128/api/resilience/model-cooldowns \
  -H "Cookie: auth_token=..." \
  -d '{"all":true}'
```

完整概念参考和熔断器默认值：参见 [`CLAUDE.md`](../../../CLAUDE.md) → "Resilience Runtime State"。

---

## Skills

用于通过自定义可执行处理器扩展 OmniRoute 的技能框架，以及市场集成。

| 方法   | 路径                                | 说明                                                                                                                     |
| ------ | ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| GET    | `/api/skills`                       | 列出已安装的技能 — 可按 `?q=`、`?mode=on\|off\|auto`、`?source=skillsmp\|skillssh\|local` 过滤，支持分页                    |
| GET    | `/api/skills/[id]`                  | 查询单个技能                                                                                                             |
| PUT    | `/api/skills/[id]`                  | 更新技能（name、description、mode、schema、handler、tags）                                                              |
| DELETE | `/api/skills/[id]`                  | 卸载技能                                                                                                                 |
| POST   | `/api/skills/install`               | 从原始清单安装技能 — 请求体：`{name, version, description, schema:{input, output}, handlerCode, apiKeyId?}`                |
| GET    | `/api/skills/executions`            | 列出最近的技能执行记录（审计追踪，含 inputs/outputs/duration）                                                            |
| GET    | `/api/skills/marketplace?q=...`     | 从 SkillsMP 市场搜索/热门列表（需要 `skillsmpApiKey` 设置）                                                              |
| POST   | `/api/skills/marketplace/install`   | 从 SkillsMP 按 id 安装技能                                                                                              |
| GET    | `/api/skills/skillssh?q=&limit=`    | 搜索 skills.sh 注册表                                                                                                   |
| POST   | `/api/skills/skillssh/install`      | 从 skills.sh 按 id 安装技能                                                                                             |

**认证：** 管理会话/API Key。市场搜索路由接受管理认证或 Bearer API Key（`isAuthenticated`）。

---

## Memory

持久化的会话/事实记忆存储，按 API Key / 会话隔离。

| 方法   | 路径                   | 说明                                                                                                           |
| ------ | ---------------------- | -------------------------------------------------------------------------------------------------------------- |
| GET    | `/api/memory`          | 列出记忆 — `?apiKeyId=`、`?type=`、`?sessionId=`、`?q=`，支持 `offset/limit` 或 `page/limit` 分页               |
| POST   | `/api/memory`          | 创建记忆 — 请求体经 Zod 校验：`{content, key, type?, sessionId?, apiKeyId?, metadata?, expiresAt?}`             |
| GET    | `/api/memory/[id]`     | 查询单个记忆                                                                                                    |
| DELETE | `/api/memory/[id]`     | 删除记忆                                                                                                       |
| GET    | `/api/memory/health`   | 记忆子系统健康状态（数据库连接、embeddings 后端、向量索引状态）                                                  |

**认证：** 管理会话/API Key（`requireManagementAuth`）。`type` 枚举：`FACTUAL`、`EPISODIC`、`SEMANTIC`、`PROCEDURAL`（参见 `src/lib/memory/types.ts` 中的 `MemoryType`）。

---

## MCP Server

OmniRoute 内置一个 Model Context Protocol 服务器，支持 3 种传输方式（stdio、SSE、streamable-http）及权限域划分的工具。以下 dashboard 端点用于读取状态/审计数据并代理 HTTP 传输。

| 方法   | 路径                     | 说明                                                                                               |
| ------ | ------------------------ | -------------------------------------------------------------------------------------------------- |
| GET    | `/api/mcp/status`        | 心跳、传输方式、在线状态、上次调用、Top 工具、24 小时成功率                                          |
| GET    | `/api/mcp/tools`         | MCP 工具列表，含 `name`、`description`、`scopes`、`phase`、`auditLevel`、`sourceEndpoints`         |
| GET    | `/api/mcp/sse`           | 打开 SSE 传输的 SSE 流（MCP 禁用或传输方式不匹配时返回 `503`）                                       |
| POST   | `/api/mcp/sse`           | 在 SSE 传输上发送 JSON-RPC 帧                                                                      |
| GET    | `/api/mcp/stream`        | 打开 Streamable HTTP 传输的 SSE 侧（服务端发起的消息）                                               |
| POST   | `/api/mcp/stream`        | 在 Streamable HTTP 传输上发送 JSON-RPC 帧                                                           |
| DELETE | `/api/mcp/stream`        | 结束 Streamable HTTP 会话                                                                         |
| GET    | `/api/mcp/audit`         | 查询审计日志 — `?limit=`、`?offset=`、`?tool=`、`?success=true\|false`、`?apiKeyId=`                |
| GET    | `/api/mcp/audit/stats`   | 聚合审计统计（总数、成功率、平均耗时、Top 工具）                                                   |

**认证：** `sse`/`stream` 传输遵循 MCP 特定的认证面（Bearer API Key 需包含 `mcp` 权限域）；`status`/`tools`/`audit*` 路由可从 dashboard 读取（无需额外认证，只需能访问 dashboard 主机即可）。

> 两种 HTTP 传输均受 `settings.mcpEnabled` 和 `settings.mcpTransport` 限制 — 传输方式不匹配返回 `400`，MCP 禁用状态返回 `503`。

---

## A2A Server

OmniRoute 暴露一个 A2A（Agent-to-Agent）JSON-RPC 2.0 端点，并提供 REST 包装以供检查/dashboard 使用。

### JSON-RPC

```bash
POST /a2a
Authorization: Bearer your-api-key   # 可选，除非设置了 OMNIROUTE_API_KEY
Content-Type: application/json

{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "message/send",
  "params": {
    "skill": "smart-routing",
    "messages": [{"role": "user", "content": "Route this coding task"}]
  }
}
```

支持的方法（均受 `settings.a2aEnabled` 限制）：

| 方法             | 说明                                                       |
| ---------------- | ---------------------------------------------------------- |
| `message/send`   | 同步技能执行；返回 `{task, artifacts, metadata}`            |
| `message/stream` | 相同技能集的流式 SSE 执行                                    |
| `tasks/get`      | 按 `taskId` 获取任务                                        |
| `tasks/cancel`   | 按 `taskId` 取消任务                                        |

内置技能：`smart-routing`、`quota-management`、`provider-discovery`、`cost-analysis`、`health-report`。

### Agent Card

```bash
GET /.well-known/agent.json
```

返回公开的 A2A agent card（名称、描述、能力、技能目录、认证方案）— 公开缓存 1 小时。无需认证。

### REST 辅助方法

| 方法   | 路径                           | 说明                                                                                                         |
| ------ | ------------------------------ | ------------------------------------------------------------------------------------------------------------ |
| GET    | `/api/a2a/status`              | A2A 启用状态 + 任务统计 + 缓存的 agent card 摘要                                                               |
| GET    | `/api/a2a/tasks`               | 列出任务 — `?state=submitted\|working\|completed\|failed\|cancelled`、`?skill=`、`?limit=`（≤200）、`?offset=` |
| POST   | `/api/a2a/tasks`               | （未作为 REST 辅助方法实现 — 通过 JSON-RPC `message/send` 创建）                                               |
| GET    | `/api/a2a/tasks/[id]`          | 查询单个任务                                                                                                  |
| POST   | `/api/a2a/tasks/[id]/cancel`   | 取消任务                                                                                                     |

**认证：** REST 辅助方法无需管理认证即可运行（dashboard 可读）；JSON-RPC `/a2a` 路由在配置后使用 Bearer `OMNIROUTE_API_KEY`。

---

## Cloud、评估与诊断

| 方法 | 路径                              | 说明                                                                                           |
| ---- | --------------------------------- | ---------------------------------------------------------------------------------------------- |
| POST | `/api/cloud/auth`                 | 验证 Bearer Key 并返回脱敏的服务商连接 + 模型别名，供云同步客户端使用                             |
| POST | `/api/cloud/credentials/update`   | 更新云同步服务商的加密凭证                                                                     |
| POST | `/api/cloud/model/resolve`        | 使用本地路由表将逻辑模型 id 解析为具体的服务商/模型                                              |
| GET  | `/api/cloud/models/alias`         | 列出开放给云同步的模型别名                                                                     |
| GET  | `/api/assess`                     | 读取最新诊断分类（按 服务商/模型）                                                               |
| POST | `/api/assess`                     | 运行诊断 — 请求体：`{scope: {type:"all"} \| {type:"provider", providerId} \| {type:"model", modelId}, trigger?}` |
| GET  | `/api/evals`                      | 列出内置评估套件 + 最近运行记录                                                                |
| POST | `/api/evals`                      | 触发评估运行                                                                                   |
| POST | `/api/evals/suites`               | 创建自定义评估套件 — 请求体经 `evalSuiteSaveSchema` 校验                                        |
| GET  | `/api/evals/suites/[id]`          | 查询自定义评估套件                                                                             |

**认证：** `/api/cloud/auth` 直接验证 Bearer Key；其他 `/api/cloud/*`、`/api/evals/*` 和 `/api/assess` 路由需要管理会话/API Key。`/api/assess` POST 使用 `validateBody` 和区分联合的 scope schema。

---

## ACP（Agent Client Protocol）管理

ACP 代理作为子进程运行。以下端点管理 ACP 代理检测和自定义代理注册。

| 方法   | 路径                | 说明                                                                                                                  |
| ------ | ------------------- | --------------------------------------------------------------------------------------------------------------------- |
| GET    | `/api/acp/agents`   | 列出所有已知的 CLI 代理（内置 + 自定义），含安装状态、版本、二进制文件                                                  |
| POST   | `/api/acp/agents`   | 注册自定义 ACP 代理或刷新缓存 — 请求体：`{id, name, binary, versionCommand, providerAlias, spawnArgs, protocol}` 或 `{action: "refresh"}` |
| DELETE | `/api/acp/agents`   | 删除自定义 ACP 代理 — 查询参数：`?id=<agentId>`                                                                        |

**响应示例**（`GET /api/acp/agents`）：

```json
{
  "agents": [
    {
      "id": "claude",
      "name": "Claude Code CLI",
      "binary": "claude",
      "version": "1.0.45",
      "installed": true,
      "protocol": "stdio",
      "providerAlias": "claude",
      "isCustom": false
    },
    {
      "id": "my-custom-cli",
      "name": "My Custom CLI",
      "installed": false,
      "protocol": "stdio",
      "providerAlias": "my-provider",
      "isCustom": true
    }
  ],
  "cacheTtlMs": 60000,
  "cacheAge": 1234
}
```

**认证：** 需要管理会话（dashboard `auth_token` cookie）或管理权限域的 API Key。

完整细节参见 [ACP Framework](../frameworks/ACP.md)。

---

## 分析与可观测性

用于监控路由、压缩和服务商多样性的实时分析端点。这些端点驱动 `/dashboard/analytics/*` 页面。

### 自动路由分析

| 方法 | 路径                                   | 说明                                                                                     |
| ---- | -------------------------------------- | ---------------------------------------------------------------------------------------- |
| GET  | `/api/analytics/auto-routing`          | 聚合自动路由统计：总调用次数、策略分布、层级分布、Top 服务商                               |
| GET  | `/api/analytics/auto-routing?days=7`   | 按时间窗口统计（默认 24 小时）                                                            |

**响应示例**：

```json
{
  "window": "24h",
  "totalCalls": 1234,
  "strategyBreakdown": {
    "rules": 800,
    "cost": 200,
    "latency": 150,
    "sla-aware": 50,
    "lkgp": 34
  },
  "tierBreakdown": {
    "ultra": 100,
    "pro": 500,
    "standard": 400,
    "free": 234
  },
  "topProviders": [
    { "provider": "openai", "calls": 500, "avgLatencyMs": 850 },
    { "provider": "anthropic", "calls": 300, "avgLatencyMs": 1200 }
  ]
}
```

### 压缩分析

| 方法 | 路径                           | 说明                                                                             |
| ---- | ------------------------------ | -------------------------------------------------------------------------------- |
| GET  | `/api/analytics/compression`   | 聚合压缩统计：Token 节省量、节省百分比、模式分布、引擎用量                         |

**响应示例**：

```json
{
  "window": "24h",
  "totalOriginalTokens": 5000000,
  "totalCompressedTokens": 3500000,
  "totalSavings": 1500000,
  "savingsPct": 30.0,
  "modeBreakdown": {
    "lite": 400,
    "standard": 600,
    "aggressive": 100,
    "ultra": 50,
    "rtk": 84
  },
  "engineBreakdown": {
    "caveman": 800,
    "rtk": 434
  }
}
```

### 服务商多样性追踪

| 方法 | 路径                         | 说明                                                                                                |
| ---- | ---------------------------- | --------------------------------------------------------------------------------------------------- |
| GET  | `/api/analytics/diversity`   | 基于 Shannon 熵的多样性跟踪：通过衡量服务商分布来防止单点故障                                         |

**响应示例**：

```json
{
  "window": "24h",
  "shannonEntropy": 2.45,
  "maxEntropy": 3.17,
  "diversityRatio": 0.77,
  "providerUsage": {
    "openai": 0.4,
    "anthropic": 0.25,
    "google": 0.2,
    "kiro": 0.15
  },
  "warnings": ["OpenAI accounts for 40% of traffic — consider diversifying"]
}
```

**认证：** 需要管理会话或管理权限域的 API Key。

---

## 管理操作

管理员专属端点，用于运营管理。

| 方法 | 路径                       | 说明                                                                                    |
| ---- | -------------------------- | --------------------------------------------------------------------------------------- |
| GET  | `/api/admin/concurrency`   | 读取当前并发限制（全局 + 按服务商）                                                       |
| POST | `/api/admin/concurrency`   | 更新并发限制 — 请求体：`{global?: number, perProvider?: Record<string, number>}`          |

**认证：** 需要含 admin 权限域的管理会话。

---

## CLI 工具管理

管理与 OmniRoute 集成的 CLI 工具（antigravity、chipotle、commandCode、devin-cli 等）。完整列表参见 [Provider Reference](./PROVIDER_REFERENCE.md)。

| 方法 | 路径                                      | 说明                                                                                         |
| ---- | ----------------------------------------- | -------------------------------------------------------------------------------------------- |
| GET  | `/api/cli-tools/all-statuses`             | 所有 CLI 工具的状态（已安装、版本、上次检测）                                                  |
| GET  | `/api/cli-tools/[id]/status`              | 特定 CLI 工具的状态（id 可为：antigravity、chipotle、commandCode、devin-cli 等）              |
| POST | `/api/cli-tools/apply`                    | 将 CLI 工具配置应用到服务商连接                                                               |
| GET  | `/api/cli-tools/backups`                  | 列出 CLI 工具配置备份                                                                        |
| POST | `/api/cli-tools/backups`                  | 创建所有 CLI 工具配置的备份                                                                   |
| POST | `/api/cli-tools/[id]/restore`             | 从备份恢复 CLI 工具                                                                          |
| GET  | `/api/cli-tools/antigravity-mitm`         | Antigravity MITM 代理状态（"antigravity-mitm" CLI 工具）                                       |
| POST | `/api/cli-tools/antigravity-mitm/alias`   | 配置 antigravity-mitm 别名                                                                   |

**认证：** 需要管理会话。

---

## Agent Skills

管理 AI 代理技能（类似 OpenAI 的自定义 GPT，但面向代理）。

| 方法   | 路径                           | 说明                                                                           |
| ------ | ------------------------------ | ------------------------------------------------------------------------------ |
| GET    | `/api/agent-skills`            | 列出所有代理技能（内置 + 自定义）                                               |
| GET    | `/api/agent-skills/[id]`       | 获取特定代理技能                                                                |
| POST   | `/api/agent-skills`            | 创建自定义代理技能 — 请求体：`{name, description, prompt, model?, temperature?}` |
| PUT    | `/api/agent-skills/[id]`       | 更新自定义代理技能                                                              |
| DELETE | `/api/agent-skills/[id]`       | 删除自定义代理技能                                                              |
| GET    | `/api/agent-skills/[id]/raw`   | 获取原始提示 + 元数据（不执行）                                                  |
| POST   | `/api/agent-skills/generate`   | AI 从自然语言描述生成新技能                                                     |

**认证：** 需要管理会话或管理权限域的 API Key。

---

## 缓存管理

管理语义缓存和推理缓存。

| 方法   | 路径                     | 说明                                                                                             |
| ------ | ------------------------ | ------------------------------------------------------------------------------------------------ |
| GET    | `/api/cache`             | 缓存概览：条目总数、命中率、磁盘占用                                                               |
| GET    | `/api/cache/entries`     | 列出缓存条目（支持分页）                                                                          |
| DELETE | `/api/cache/entries`     | 删除缓存条目（按查询参数过滤）                                                                     |
| GET    | `/api/cache/stats`       | 详细缓存统计（按服务商、按模型）                                                                   |
| GET    | `/api/cache/reasoning`   | 推理缓存状态（用于推理回放）                                                                      |
| DELETE | `/api/cache/reasoning`   | 清除推理缓存 — 查询参数：`?toolCallId=<id>`（单个）或 `?provider=<p>` 或不传参数（全部）            |

**认证：** 需要管理会话。

---

## 记忆系统

管理持久化记忆（FTS5 + 向量嵌入）。

| 方法   | 路径                   | 说明                                                               |
| ------ | ---------------------- | ------------------------------------------------------------------ |
| GET    | `/api/memory`          | 列出记忆条目（按作用域、类型、搜索查询过滤）                        |
| POST   | `/api/memory`          | 创建新记忆条目 — 请求体：`{scope, type, content, metadata?}`        |
| GET    | `/api/memory/[id]`     | 获取特定记忆条目                                                    |
| PUT    | `/api/memory/[id]`     | 更新记忆条目                                                        |
| DELETE | `/api/memory/[id]`     | 删除记忆条目                                                        |
| GET    | `/api/memory/search`   | 搜索记忆（FTS5 + 向量）                                            |
| POST   | `/api/memory/clear`    | 清除记忆条目（支持过滤器）                                          |
| GET    | `/api/memory/stats`    | 记忆统计（总条目数、嵌入覆盖率等）                                  |

**认证：** 需要管理会话或管理权限域的 API Key。

---

## Webhooks

管理事件 Webhook 订阅。

| 方法   | 路径                              | 说明                                                               |
| ------ | --------------------------------- | ------------------------------------------------------------------ |
| GET    | `/api/webhooks`                   | 列出所有 Webhook 订阅                                                |
| POST   | `/api/webhooks`                   | 创建 Webhook 订阅 — 请求体：`{url, events[], secret?, active?}`      |
| GET    | `/api/webhooks/[id]`              | 获取特定 Webhook 订阅                                                |
| PUT    | `/api/webhooks/[id]`              | 更新 Webhook 订阅                                                    |
| DELETE | `/api/webhooks/[id]`              | 删除 Webhook 订阅                                                    |
| GET    | `/api/webhooks/events`            | 列出所有可用的 Webhook 事件类型                                      |
| GET    | `/api/webhooks/[id]/deliveries`   | 列出 Webhook 投递历史（成功/失败日志）                                |
| POST   | `/api/webhooks/[id]/test`         | 向 Webhook 发送测试事件                                              |

**认证：** 需要管理会话。

完整事件类型参见 [Webhooks Framework](../frameworks/WEBHOOKS.md)。

---

## Skills 框架

管理 Skills（代理扩展框架）。

| 方法   | 路径                       | 说明                                                                              |
| ------ | -------------------------- | --------------------------------------------------------------------------------- |
| GET    | `/api/skills`              | 列出所有已安装的技能（内置 + 自定义）                                               |
| POST   | `/api/skills/install`      | 从本地路径或 URL 安装技能                                                          |
| DELETE | `/api/skills/[id]`         | 卸载技能                                                                          |
| PUT    | `/api/skills/[id]`         | 启用或禁用技能 — 请求体：`{enabled?: boolean, mode?: "on" \| "off" \| "auto"}`      |
| POST   | `/api/skills/executions`   | 执行技能 — 请求体：`{skillName, apiKeyId, input?, sessionId?}`                     |
| GET    | `/api/skills/executions`   | 列出所有技能的执行历史（可按 `?apiKeyId=` 过滤）                                   |

**认证：** 需要管理会话或管理权限域的 API Key。

完整细节参见 [Skills Framework](../frameworks/SKILLS.md)。

---

## 插件

管理 OmniRoute 插件（第三方扩展）。

| 方法   | 路径                               | 说明                                 |
| ------ | ---------------------------------- | ------------------------------------ |
| GET    | `/api/plugins`                     | 列出已安装的插件                     |
| POST   | `/api/plugins/install`             | 从本地路径或 URL 安装插件             |
| DELETE | `/api/plugins/[name]`              | 卸载插件                             |
| POST   | `/api/plugins/[name]/activate`     | 激活插件                             |
| POST   | `/api/plugins/[name]/deactivate`   | 停用插件                             |
| GET    | `/api/plugins/[name]/config`       | 获取插件配置                         |
| PUT    | `/api/plugins/[name]/config`       | 更新插件配置                         |

**认证：** 需要管理会话。

完整细节参见 [Plugins Framework](../frameworks/PLUGIN_SDK.md)。

---

## Shadow Routing

服务商的 Shadow / A-B 对比**不是独立的 REST 面** — 通过 Combo 路由配置（参见 [Auto-Combo](../routing/AUTO-COMBO.md)）。按 Combo 的对比指标通过 `GET /api/combos/metrics` 提供。

---

## 安全护栏

检查运行时安全护栏（PII 检测、提示注入检测、视觉桥接）。安全护栏在每次请求中运行；按调用退出通过 `x-omniroute-disabled-guardrails` 请求头实现 — 没有持久化的启用/禁用地表。

| 方法 | 路径                     | 说明                                                                                   |
| ---- | ------------------------ | -------------------------------------------------------------------------------------- |
| GET  | `/api/guardrails`        | 列出已注册的安全护栏及其状态（名称 / 启用 / 优先级）                                    |
| POST | `/api/guardrails/test`   | 对示例输入干运行调用前管线 — 请求体：`{input, disabledGuardrails?}`                      |

**认证：** 需要管理会话。

完整细节参见 [Security > Guardrails](../security/GUARDRAILS.md)。

---

---

## 认证

- Dashboard 路由（`/dashboard/*`）使用 `auth_token` cookie
- 登录使用保存的密码哈希；回退到 `INITIAL_PASSWORD`
- `requireLogin` 可通过 `/api/settings/require-login` 切换
- `/v1/*` 路由在 `REQUIRE_API_KEY=true` 时可选要求 Bearer API Key

> **重大变更（v3.8.0）** — `/api/v1/agents/tasks/*` 和冷却管理端点现在需要**管理认证**（dashboard `auth_token` cookie 或管理权限域的 API Key）。此前无需认证即可调用这些路由的客户端将收到 `401 Unauthorized`。参见 commit `588a0333`（`fix(auth): require management auth for agent and cooldown APIs`）。
