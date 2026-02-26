# API 参考

🌐 **Languages:** 🇺🇸 [English](../../API_REFERENCE.md) | 🇧🇷 [Português (Brasil)](../pt-BR/API_REFERENCE.md) | 🇪🇸 [Español](../es/API_REFERENCE.md) | 🇫🇷 [Français](../fr/API_REFERENCE.md) | 🇮🇹 [Italiano](../it/API_REFERENCE.md) | 🇷🇺 [Русский](../ru/API_REFERENCE.md) | 🇨🇳 [中文 (简体)](../zh-CN/API_REFERENCE.md) | 🇩🇪 [Deutsch](../de/API_REFERENCE.md) | 🇮🇳 [हिन्दी](../in/API_REFERENCE.md) | 🇹🇭 [ไทย](../th/API_REFERENCE.md) | 🇺🇦 [Українська](../uk-UA/API_REFERENCE.md) | 🇸🇦 [العربية](../ar/API_REFERENCE.md) | 🇯🇵 [日本語](../ja/API_REFERENCE.md) | 🇻🇳 [Tiếng Việt](../vi/API_REFERENCE.md) | 🇧🇬 [Български](../bg/API_REFERENCE.md) | 🇩🇰 [Dansk](../da/API_REFERENCE.md) | 🇫🇮 [Suomi](../fi/API_REFERENCE.md) | 🇮🇱 [עברית](../he/API_REFERENCE.md) | 🇭🇺 [Magyar](../hu/API_REFERENCE.md) | 🇮🇩 [Bahasa Indonesia](../id/API_REFERENCE.md) | 🇰🇷 [한국어](../ko/API_REFERENCE.md) | 🇲🇾 [Bahasa Melayu](../ms/API_REFERENCE.md) | 🇳🇱 [Nederlands](../nl/API_REFERENCE.md) | 🇳🇴 [Norsk](../no/API_REFERENCE.md) | 🇵🇹 [Português (Portugal)](../pt/API_REFERENCE.md) | 🇷🇴 [Română](../ro/API_REFERENCE.md) | 🇵🇱 [Polski](../pl/API_REFERENCE.md) | 🇸🇰 [Slovenčina](../sk/API_REFERENCE.md) | 🇸🇪 [Svenska](../sv/API_REFERENCE.md) | 🇵🇭 [Filipino](../phi/API_REFERENCE.md)

所有 OmniRoute API 端点的完整参考。

---

## 目录

- [Chat Completions](#chat-completions)
- [Embeddings](#embeddings)
- [Image Generation](#image-generation)
- [List Models](#list-models)
- [Compatibility Endpoints](#compatibility-endpoints)
- [Semantic Cache](#semantic-cache)
- [Dashboard & Management](#dashboard--management)
- [Request Processing](#request-processing)
- [Authentication](#authentication)

---

## 聊天完成

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

### 自定义标头

| 标题                     | 方向 | 描述                          |
| ------------------------ | ---- | ----------------------------- |
| `X-OmniRoute-No-Cache`   | 请求 | 设置为 `true` 以绕过缓存      |
| `X-OmniRoute-Progress`   | 请求 | 对于进度事件设置为 `true`     |
| `Idempotency-Key`        | 请求 | Dedup 密钥（5 秒窗口）        |
| `X-Request-Id`           | 请求 | 替代重复数据删除密钥          |
| `X-OmniRoute-Cache`      | 回应 | `HIT` 或 `MISS`（非流式传输） |
| `X-OmniRoute-Idempotent` | 回应 | `true` 如果已进行重复数据删除 |
| `X-OmniRoute-Progress`   | 回应 | `enabled` 如果进度跟踪开启    |

---

## 嵌入

```bash
POST /v1/embeddings
Authorization: Bearer your-api-key
Content-Type: application/json

{
  "model": "nebius/Qwen/Qwen3-Embedding-8B",
  "input": "The food was delicious"
}
```

可用的提供商：Nebius、OpenAI、Mistral、Together AI、Fireworks、NVIDIA。

```bash
# List all embedding models
GET /v1/embeddings
```

---

## 图像生成

```bash
POST /v1/images/generations
Authorization: Bearer your-api-key
Content-Type: application/json

{
  "model": "openai/dall-e-3",
  "prompt": "A beautiful sunset over mountains",
  "size": "1024x1024"
}
```

可用的提供商：OpenAI (DALL-E)、xAI (Grok Image)、Together AI (FLUX)、Fireworks AI。

```bash
# List all image models
GET /v1/images/generations
```

---

## 列出型号

```bash
GET /v1/models
Authorization: Bearer your-api-key

→ Returns all chat, embedding, and image models + combos in OpenAI format
```

---

## 兼容性端点

|方法|路径|格式|
| ------ | ------------------------ | | ---------------------- |
|发布 | `/v1/chat/completions` |开放人工智能 |
|发布 | `/v1/messages` |人择 |
|发布 | `/v1/responses` | OpenAI 回应 |
|发布 | `/v1/embeddings` |开放人工智能 |
|发布 | `/v1/images/generations` |开放人工智能 |
|获取 | `/v1/models` |开放人工智能 |
|发布 | `/v1/messages/count_tokens` |人择 |
|获取 | `/v1beta/models` |双子座|
|发布 | `/v1beta/models/{...path}` |双子座生成内容 |
|发布 | `/v1/api/chat` |奥拉玛 |

### 专用提供商路线

```bash
POST /v1/providers/{provider}/chat/completions
POST /v1/providers/{provider}/embeddings
POST /v1/providers/{provider}/images/generations
```

如果缺少提供商前缀，则会自动添加。不匹配的模型返回 `400`。

---

## 语义缓存

```bash
# Get cache stats
GET /api/cache

# Clear all caches
DELETE /api/cache
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

## 仪表板和管理

### 身份验证

| 端点                          | 方法      | 描述         |
| ----------------------------- | --------- | ------------ |
| `/api/auth/login`             | 发布      | 登录         |
| `/api/auth/logout`            | 发布      | 退出         |
| `/api/settings/require-login` | 获取/放置 | 切换需要登录 |

### 提供商管理

| 端点                         | 方法           | 描述            |
| ---------------------------- | -------------- | --------------- |
| `/api/providers`             | 获取/发布      | 列出/创建提供商 |
| `/api/providers/[id]`        | 获取/放置/删除 | 管理提供商      |
| `/api/providers/[id]/test`   | 发布           | 测试提供商连接  |
| `/api/providers/[id]/models` | 获取           | 列出供应商型号  |
| `/api/providers/validate`    | 发布           | 验证提供商配置  |
| `/api/provider-nodes*`       | 各种           | 提供商节点管理  |
| `/api/provider-models`       | 获取/发布/删除 | 定制型号        |

### OAuth 流程

| 端点                             | 方法 | 描述                 |
| -------------------------------- | ---- | -------------------- |
| `/api/oauth/[provider]/[action]` | 各种 | 特定于提供商的 OAuth |

### 路由和配置

| 端点                  | 方法      | 描述                        |
| --------------------- | --------- | --------------------------- |
| `/api/models/alias`   | 获取/发布 | 模型别名                    |
| `/api/models/catalog` | 获取      | 按提供商+类型列出的所有型号 |
| `/api/combos*`        | 各种      | 组合管理                    |
| `/api/keys*`          | 各种      | API 密钥管理                |
| `/api/pricing`        | 获取      | 型号定价                    |

### 使用与分析

|端点 |方法|描述 |
| ------------------------ | | ------ | -------------------- |
| `/api/usage/history` |获取 |使用历史 |
| `/api/usage/logs` |获取 |使用日志 |
| `/api/usage/request-logs` |获取 |请求级日志 |
| `/api/usage/[connectionId]` |获取 |每个连接的使用情况 |

### 设置

| 端点                            | 方法      | 描述                 |
| ------------------------------- | --------- | -------------------- |
| `/api/settings`                 | 获取/放置 | 常规设置             |
| `/api/settings/proxy`           | 获取/放置 | 网络代理配置         |
| `/api/settings/proxy/test`      | 发布      | 测试代理连接         |
| `/api/settings/ip-filter`       | 获取/放置 | IP 允许列表/阻止列表 |
| `/api/settings/thinking-budget` | 获取/放置 | 推理代币预算         |
| `/api/settings/system-prompt`   | 获取/放置 | 全局系统提示         |

### 监控

| 端点                     | 方法      | 描述               |
| ------------------------ | --------- | ------------------ |
| `/api/sessions`          | 获取      | 活动会话跟踪       |
| `/api/rate-limits`       | 获取      | 每个帐户的费率限制 |
| `/api/monitoring/health` | 获取      | 健康检查           |
| `/api/cache`             | 获取/删除 | 缓存统计/清除      |

### 备份和导出/导入

|端点 |方法|描述 |
| ------------------------ | | ------ | --------------------------------------- |
| `/api/db-backups` |获取 |列出可用备份 |
| `/api/db-backups` |放置 |创建手动备份 |
| `/api/db-backups` |发布 |从特定备份恢复|
| `/api/db-backups/export` |获取 |将数据库下载为 .sqlite 文件 |
| `/api/db-backups/import` |发布 |上传.sqlite 文件来替换数据库 |
| `/api/db-backups/exportAll` |获取 |下载完整备份为 .tar.gz 存档 |

### 云同步

| 端点                   | 方法 | 描述       |
| ---------------------- | ---- | ---------- |
| `/api/sync/cloud`      | 各种 | 云同步操作 |
| `/api/sync/initialize` | 发布 | 初始化同步 |
| `/api/cloud/*`         | 各种 | 云管理     |

### CLI 工具

| 端点                               | 方法 | 描述              |
| ---------------------------------- | ---- | ----------------- |
| `/api/cli-tools/claude-settings`   | 获取 | 克劳德 CLI 状态   |
| `/api/cli-tools/codex-settings`    | 获取 | Codex CLI 状态    |
| `/api/cli-tools/droid-settings`    | 获取 | Droid CLI 状态    |
| `/api/cli-tools/openclaw-settings` | 获取 | OpenClaw CLI 状态 |
| `/api/cli-tools/runtime/[toolId]`  | 获取 | 通用 CLI 运行时   |

CLI 响应包括：`installed`、`runnable`、`command`、`commandPath`、`runtimeMode`、`reason`。

### 弹性和速率限制

| 端点                    | 方法      | 描述                   |
| ----------------------- | --------- | ---------------------- |
| `/api/resilience`       | 获取/放置 | 获取/更新弹性配置文件  |
| `/api/resilience/reset` | 发布      | 重置断路器             |
| `/api/rate-limits`      | 获取      | 每个帐户的速率限制状态 |
| `/api/rate-limit`       | 获取      | 全局限速配置           |

### 评估

| 端点         | 方法      | 描述                  |
| ------------ | --------- | --------------------- |
| `/api/evals` | 获取/发布 | 列出评估套件/运行评估 |

### 政策

| 端点            | 方法           | 描述         |
| --------------- | -------------- | ------------ |
| `/api/policies` | 获取/发布/删除 | 管理路由策略 |

### 合规性

|端点 |方法|描述 |
| ------------------------ | | ------ | -------------------------------------- |
| `/api/compliance/audit-log` |获取 |合规审核日志（最后 N）|

### v1beta（Gemini 兼容）

| 端点                       | 方法 | 描述                          |
| -------------------------- | ---- | ----------------------------- |
| `/v1beta/models`           | 获取 | 以 Gemini 格式列出模型        |
| `/v1beta/models/{...path}` | 发布 | Gemini `generateContent` 端点 |

这些端点反映了 Gemini 的 API 格式，适用于期望本机 Gemini SDK 兼容性的客户端。

### 内部/系统 API

| 端点            | 方法 | 描述                                        |
| --------------- | ---- | ------------------------------------------- |
| `/api/init`     | 获取 | 应用程序初始化检查（首次运行时使用）        |
| `/api/tags`     | 获取 | Ollama 兼容模型标签（适用于 Ollama 客户端） |
| `/api/restart`  | 发布 | 触发服务器优雅重启                          |
| `/api/shutdown` | 发布 | 触发服务器正常关闭                          |

> **注意：** 这些端点由系统内部使用或用于 Ollama 客户端兼容性。最终用户通常不会调用它们。

---

## 音频转录

```bash
POST /v1/audio/transcriptions
Authorization: Bearer your-api-key
Content-Type: multipart/form-data
```

使用 Deepgram 或 AssemblyAI 转录音频文件。

**要求：**

```bash
curl -X POST http://localhost:20128/v1/audio/transcriptions \
  -H "Authorization: Bearer your-api-key" \
  -F "file=@recording.mp3" \
  -F "model=deepgram/nova-3"
```

**回应：**

```json
{
  "text": "Hello, this is the transcribed audio content.",
  "task": "transcribe",
  "language": "en",
  "duration": 12.5
}
```

**支持的提供商：** `deepgram/nova-3`、`assemblyai/best`。

**支持的格式：** `mp3`、`wav`、`m4a`、`flac`、`ogg`、`webm`。

---

## 奥拉马兼容性

对于使用 Ollama 的 API 格式的客户端：

```bash
# Chat endpoint (Ollama format)
POST /v1/api/chat

# Model listing (Ollama format)
GET /api/tags
```

请求会在 Ollama 和内部格式之间自动转换。

---

## 遥测

```bash
# Get latency telemetry summary (p50/p95/p99 per provider)
GET /api/telemetry/summary
```

**回应：**

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
# Get budget status for all API keys
GET /api/usage/budget

# Set or update a budget
POST /api/usage/budget
Content-Type: application/json

{
  "keyId": "key-123",
  "limit": 50.00,
  "period": "monthly"
}
```

---

## 型号可用性

```bash
# Get real-time model availability across all providers
GET /api/models/availability

# Check availability for a specific model
POST /api/models/availability
Content-Type: application/json

{
  "model": "claude-sonnet-4-5-20250929"
}
```

---

## 请求处理

1. 客户端向`/v1/*`发送请求
2. 路由处理程序调用 `handleChat`、`handleEmbedding`、`handleAudioTranscription` 或 `handleImageGeneration`
3. 模型已解析（直接提供者/模型或别名/组合）
4. 通过帐户可用性过滤从本地数据库中选择凭证
5. 对于聊天：`handleChatCore` — 格式检测、翻译、缓存检查、幂等性检查
6. Provider执行器发送上游请求
7. 响应转换回客户端格式（聊天）或按原样返回（嵌入/图像/音频）
8. 使用/日志记录
9. 根据组合规则对错误应用回退

完整架构参考：[**OMNI_TOKEN_119**](ARCHITECTURE.md)

---

## 身份验证

- 仪表板路由 (`/dashboard/*`) 使用 `auth_token` cookie
- 登录使用保存的密码哈希；回退到 `INITIAL_PASSWORD`
- `requireLogin` 可通过 `/api/settings/require-login` 切换
- `/v1/*` 路由在 `REQUIRE_API_KEY=true` 时可选择需要 Bearer API 密钥
