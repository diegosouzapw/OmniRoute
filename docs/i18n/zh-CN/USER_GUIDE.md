# 用户指南

🌐 **Languages:** 🇺🇸 [English](../../USER_GUIDE.md) | 🇧🇷 [Português (Brasil)](../pt-BR/USER_GUIDE.md) | 🇪🇸 [Español](../es/USER_GUIDE.md) | 🇫🇷 [Français](../fr/USER_GUIDE.md) | 🇮🇹 [Italiano](../it/USER_GUIDE.md) | 🇷🇺 [Русский](../ru/USER_GUIDE.md) | 🇨🇳 [中文 (简体)](../zh-CN/USER_GUIDE.md) | 🇩🇪 [Deutsch](../de/USER_GUIDE.md) | 🇮🇳 [हिन्दी](../in/USER_GUIDE.md) | 🇹🇭 [ไทย](../th/USER_GUIDE.md) | 🇺🇦 [Українська](../uk-UA/USER_GUIDE.md) | 🇸🇦 [العربية](../ar/USER_GUIDE.md) | 🇯🇵 [日本語](../ja/USER_GUIDE.md) | 🇻🇳 [Tiếng Việt](../vi/USER_GUIDE.md) | 🇧🇬 [Български](../bg/USER_GUIDE.md) | 🇩🇰 [Dansk](../da/USER_GUIDE.md) | 🇫🇮 [Suomi](../fi/USER_GUIDE.md) | 🇮🇱 [עברית](../he/USER_GUIDE.md) | 🇭🇺 [Magyar](../hu/USER_GUIDE.md) | 🇮🇩 [Bahasa Indonesia](../id/USER_GUIDE.md) | 🇰🇷 [한국어](../ko/USER_GUIDE.md) | 🇲🇾 [Bahasa Melayu](../ms/USER_GUIDE.md) | 🇳🇱 [Nederlands](../nl/USER_GUIDE.md) | 🇳🇴 [Norsk](../no/USER_GUIDE.md) | 🇵🇹 [Português (Portugal)](../pt/USER_GUIDE.md) | 🇷🇴 [Română](../ro/USER_GUIDE.md) | 🇵🇱 [Polski](../pl/USER_GUIDE.md) | 🇸🇰 [Slovenčina](../sk/USER_GUIDE.md) | 🇸🇪 [Svenska](../sv/USER_GUIDE.md) | 🇵🇭 [Filipino](../phi/USER_GUIDE.md)

有关配置提供程序、创建组合、集成 CLI 工具和部署 OmniRoute 的完整指南。

---

## 目录

- [Pricing at a Glance](#-pricing-at-a-glance)
- [Use Cases](#-use-cases)
- [Provider Setup](#-provider-setup)
- [CLI Integration](#-cli-integration)
- [Deployment](#-deployment)
- [Available Models](#-available-models)
- [Advanced Features](#-advanced-features)

---

## 💰 定价一览

| 等级            | 供应商                 | 成本                | 配额重置        | 最适合         |
| --------------- | ---------------------- | ------------------- | --------------- | -------------- |
| **💳 订阅**     | 克劳德代码（专业版）   | $20/月              | 5 小时+ 每周    | 已经订阅       |
|                 | Codex（增强版/专业版） | $20-200/月          | 5 小时+ 每周    | OpenAI 用户    |
|                 | 双子座 CLI             | **免费**            | 180K/月 + 1K/天 | 每个人！       |
|                 | GitHub 副驾驶          | $10-19/月           | 每月            | GitHub 用户    |
| **🔑 API 密钥** | 深度搜索               | 按使用付费          | 无              | 廉价推理       |
|                 | 格罗克                 | 按使用付费          | 无              | 超快速推理     |
|                 | xAI (Grok)             | 按使用付费          | 无              | Grok 4 推理    |
|                 | 米斯特拉尔             | 按使用付费          | 无              | 欧盟主办的模型 |
|                 | 困惑                   | 按使用付费          | 无              | 搜索增强       |
|                 | 一起人工智能           | 按使用付费          | 无              | 开源模型       |
|                 | 烟花人工智能           | 按使用付费          | 无              | 快速通量图像   |
|                 | 大脑                   | 按使用付费          | 无              | 晶圆级速度     |
|                 | 连贯                   | 按使用付费          | 无              | 命令 R+ RAG    |
|                 | NVIDIA NIM             | 按使用付费          | 无              | 企业典范       |
| **💰便宜**      | GLM-4.7                | 0.6 美元/100 万美元 | 每日上午 10 点  | 预算备份       |
|                 | 迷你最大M2.1           | 0.2 美元/100 万美元 | 5小时滚动       | 最便宜的选择   |
|                 | 基米K2                 | 每月 9 美元的公寓   | 10M 代币/月     | 可预测的成本   |
| **🆓 免费**     | iFlow                  | 0 美元              | 无限            | 8 款免费       |
|                 | 奎文                   | 0 美元              | 无限            | 3 款免费       |
|                 | 基罗                   | 0 美元              | 无限            | 克劳德自由     |

**💡专业提示：** 从 Gemini CLI（180K 免费/月）+ iFlow（无限免费）组合开始 = 0 美元成本！

---

## 🎯 使用案例

### 案例 1：“我订阅了 Claude Pro”

**问题：** 未使用的配额过期，繁重编码期间的速率限制

```
Combo: "maximize-claude"
  1. cc/claude-opus-4-6        (use subscription fully)
  2. glm/glm-4.7               (cheap backup when quota out)
  3. if/kimi-k2-thinking       (free emergency fallback)

Monthly cost: $20 (subscription) + ~$5 (backup) = $25 total
vs. $20 + hitting limits = frustration
```

### 案例 2：“我想要零成本”

**问题：** 无力订阅，需要可靠的人工智能编码

```
Combo: "free-forever"
  1. gc/gemini-3-flash         (180K free/month)
  2. if/kimi-k2-thinking       (unlimited free)
  3. qw/qwen3-coder-plus       (unlimited free)

Monthly cost: $0
Quality: Production-ready models
```

### 案例 3：“我需要 24/7 不间断编码”

**问题：** 截止日期，无法承受停机时间

```
Combo: "always-on"
  1. cc/claude-opus-4-6        (best quality)
  2. cx/gpt-5.2-codex          (second subscription)
  3. glm/glm-4.7               (cheap, resets daily)
  4. minimax/MiniMax-M2.1      (cheapest, 5h reset)
  5. if/kimi-k2-thinking       (free unlimited)

Result: 5 layers of fallback = zero downtime
Monthly cost: $20-200 (subscriptions) + $10-20 (backup)
```

### 案例 4：“我想要 OpenClaw 中的免费 AI”

**问题：** 需要在消息应用程序中使用人工智能助手，完全免费

```
Combo: "openclaw-free"
  1. if/glm-4.7                (unlimited free)
  2. if/minimax-m2.1           (unlimited free)
  3. if/kimi-k2-thinking       (unlimited free)

Monthly cost: $0
Access via: WhatsApp, Telegram, Slack, Discord, iMessage, Signal...
```

---

## 📖 提供商设置

### 🔐 订阅提供商

#### 克劳德代码（Pro/Max）

```bash
Dashboard → Providers → Connect Claude Code
→ OAuth login → Auto token refresh
→ 5-hour + weekly quota tracking

Models:
  cc/claude-opus-4-6
  cc/claude-sonnet-4-5-20250929
  cc/claude-haiku-4-5-20251001
```

**专业提示：** 使用 Opus 来完成复杂的任务，使用 Sonnet 来提高速度。 OmniRoute 跟踪每个模型的配额！

#### OpenAI Codex（增强版/专业版）

```bash
Dashboard → Providers → Connect Codex
→ OAuth login (port 1455)
→ 5-hour + weekly reset

Models:
  cx/gpt-5.2-codex
  cx/gpt-5.1-codex-max
```

#### Gemini CLI（免费 180K/月！）

```bash
Dashboard → Providers → Connect Gemini CLI
→ Google OAuth
→ 180K completions/month + 1K/day

Models:
  gc/gemini-3-flash-preview
  gc/gemini-2.5-pro
```

**最超值：** 巨大的免费套餐！在付费等级之前使用此功能。

#### GitHub 副驾驶

```bash
Dashboard → Providers → Connect GitHub
→ OAuth via GitHub
→ Monthly reset (1st of month)

Models:
  gh/gpt-5
  gh/claude-4.5-sonnet
  gh/gemini-3-pro
```

### 💰 廉价提供商

#### GLM-4.7（每日重置，0.6 美元/100 万美元）

1. 注册：[Zhipu AI](https://open.bigmodel.cn/)
2. 从 Coding Plan 获取 API 密钥
3. 控制面板 → 添加 API 密钥：提供商：`glm`，API 密钥：`your-key`

**使用：** `glm/glm-4.7` — **专业提示：** Coding Plan 以 1/7 的成本提供 3× 配额！每天上午 10:00 重置。

#### MiniMax M2.1（5 小时重置，0.20 美元/100 万美元）

1. 注册：[MiniMax](https://www.minimax.io/) 2.获取API密钥→仪表板→添加API密钥

**使用：** `minimax/MiniMax-M2.1` — **专业提示：** 长上下文（1M 令牌）的最便宜选择！

#### Kimi K2（每月 9 美元）

1.订阅：[Moonshot AI](https://platform.moonshot.ai/) 2.获取API密钥→仪表板→添加API密钥

**使用：** `kimi/kimi-latest` — **专业提示：** 固定 9 美元/月 1000 万个代币 = 0.90 美元/100 万个有效成本！

### 🆓 免费提供商

#### iFlow（8 个免费模型）

```bash
Dashboard → Connect iFlow → OAuth login → Unlimited usage

Models: if/kimi-k2-thinking, if/qwen3-coder-plus, if/glm-4.7, if/minimax-m2, if/deepseek-r1
```

#### Qwen（3 个免费模型）

```bash
Dashboard → Connect Qwen → Device code auth → Unlimited usage

Models: qw/qwen3-coder-plus, qw/qwen3-coder-flash
```

#### Kiro（克劳德·自由）

```bash
Dashboard → Connect Kiro → AWS Builder ID or Google/GitHub → Unlimited

Models: kr/claude-sonnet-4.5, kr/claude-haiku-4.5
```

---

## 🎨 组合

### 示例 1：最大化订阅 → 廉价备份

```
Dashboard → Combos → Create New

Name: premium-coding
Models:
  1. cc/claude-opus-4-6 (Subscription primary)
  2. glm/glm-4.7 (Cheap backup, $0.6/1M)
  3. minimax/MiniMax-M2.1 (Cheapest fallback, $0.20/1M)

Use in CLI: premium-coding
```

### 示例 2：仅免费（零成本）

```
Name: free-combo
Models:
  1. gc/gemini-3-flash-preview (180K free/month)
  2. if/kimi-k2-thinking (unlimited)
  3. qw/qwen3-coder-plus (unlimited)

Cost: $0 forever!
```

---

## 🔧 CLI 集成

### 光标 IDE

```
Settings → Models → Advanced:
  OpenAI API Base URL: http://localhost:20128/v1
  OpenAI API Key: [from omniroute dashboard]
  Model: cc/claude-opus-4-6
```

### 克劳德·代码

编辑 `~/.claude/config.json`：

```json
{
  "anthropic_api_base": "http://localhost:20128/v1",
  "anthropic_api_key": "your-omniroute-api-key"
}
```

### Codex CLI

```bash
export OPENAI_BASE_URL="http://localhost:20128"
export OPENAI_API_KEY="your-omniroute-api-key"
codex "your prompt"
```

### 开爪

编辑 `~/.openclaw/openclaw.json`：

```json
{
  "agents": {
    "defaults": {
      "model": { "primary": "omniroute/if/glm-4.7" }
    }
  },
  "models": {
    "providers": {
      "omniroute": {
        "baseUrl": "http://localhost:20128/v1",
        "apiKey": "your-omniroute-api-key",
        "api": "openai-completions",
        "models": [{ "id": "if/glm-4.7", "name": "glm-4.7" }]
      }
    }
  }
}
```

**或使用仪表板：** CLI 工具 → OpenClaw → 自动配置

### 克莱恩 / 继续 / RooCode

```
Provider: OpenAI Compatible
Base URL: http://localhost:20128/v1
API Key: [from dashboard]
Model: cc/claude-opus-4-6
```

---

## 🚀 部署

### VPS 部署

```bash
git clone https://github.com/diegosouzapw/OmniRoute.git
cd OmniRoute && npm install && npm run build

export JWT_SECRET="your-secure-secret-change-this"
export INITIAL_PASSWORD="your-password"
export DATA_DIR="/var/lib/omniroute"
export PORT="20128"
export HOSTNAME="0.0.0.0"
export NODE_ENV="production"
export NEXT_PUBLIC_BASE_URL="http://localhost:20128"
export API_KEY_SECRET="endpoint-proxy-api-key-secret"

npm run start
# Or: pm2 start npm --name omniroute -- start
```

### 码头工人

```bash
# Build image (default = runner-cli with codex/claude/droid preinstalled)
docker build -t omniroute:cli .

# Portable mode (recommended)
docker run -d --name omniroute -p 20128:20128 --env-file ./.env -v omniroute-data:/app/data omniroute:cli
```

对于使用 CLI 二进制文件的主机集成模式，请参阅主文档中的 Docker 部分。

### 环境变量

| 变量                  | 默认                                 | 描述                                               |
| --------------------- | ------------------------------------ | -------------------------------------------------- |
| `JWT_SECRET`          | `omniroute-default-secret-change-me` | JWT 签名秘密（**生产变更**）                       |
| `INITIAL_PASSWORD`    | `123456`                             | 首次登录密码                                       |
| `DATA_DIR`            | `~/.omniroute`                       | 数据目录（数据库、使用情况、日志）                 |
| `PORT`                | 框架默认                             | 服务端口（示例中为 `20128`）                       |
| `HOSTNAME`            | 框架默认                             | 绑定主机（Docker 默认为 `0.0.0.0`）                |
| `NODE_ENV`            | 运行时默认                           | 设置 `production` 进行部署                         |
| `BASE_URL`            | `http://localhost:20128`             | 服务器端内部基本 URL                               |
| `CLOUD_URL`           | `https://omniroute.dev`              | 云同步端点基本 URL                                 |
| `API_KEY_SECRET`      | `endpoint-proxy-api-key-secret`      | 生成的 API 密钥的 HMAC 秘密                        |
| `REQUIRE_API_KEY`     | `false`                              | 在 `/v1/*` 上强制执行 Bearer API 密钥              |
| `ENABLE_REQUEST_LOGS` | `false`                              | 启用请求/响应日志                                  |
| `AUTH_COOKIE_SECURE`  | `false`                              | 强制 `Secure` auth cookie（在 HTTPS 反向代理后面） |

有关完整环境变量参考，请参阅 [README](../README.md)。

---

## 📊 可用型号

<details>
<summary><b>查看所有可用型号</b></summary>

**克劳德代码 (`cc/`)** — Pro/Max：`cc/claude-opus-4-6`、`cc/claude-sonnet-4-5-20250929`、`cc/claude-haiku-4-5-20251001`

**法典 (`cx/`)** — 增强版/专业版：`cx/gpt-5.2-codex`、`cx/gpt-5.1-codex-max`

**Gemini CLI (`gc/`)** — 免费：`gc/gemini-3-flash-preview`、`gc/gemini-2.5-pro`

**GitHub Copilot (`gh/`)**：`gh/gpt-5`、`gh/claude-4.5-sonnet`

**GLM (`glm/`)** — 0.6 美元/100 万美元：`glm/glm-4.7`

**MiniMax (`minimax/`)** — 0.2 美元/100 万美元：`minimax/MiniMax-M2.1`

**iFlow (`if/`)** — 免费：`if/kimi-k2-thinking`、`if/qwen3-coder-plus`、`if/deepseek-r1`

**Qwen (`qw/`)** — 免费：`qw/qwen3-coder-plus`、`qw/qwen3-coder-flash`

**Kiro (`kr/`)** — 免费：`kr/claude-sonnet-4.5`、`kr/claude-haiku-4.5`

**DeepSeek (`ds/`)**：`ds/deepseek-chat`、`ds/deepseek-reasoner`

**Groq (`groq/`)**：`groq/llama-3.3-70b-versatile`、`groq/llama-4-maverick-17b-128e-instruct`

**xAI (`xai/`)**：`xai/grok-4`、`xai/grok-4-0709-fast-reasoning`、`xai/grok-code-mini`

**米斯特拉尔 (`mistral/`)**：`mistral/mistral-large-2501`、`mistral/codestral-2501`

**困惑 (`pplx/`)**：`pplx/sonar-pro`、`pplx/sonar`

**一起人工智能 (`together/`)**：`together/meta-llama/Llama-3.3-70B-Instruct-Turbo`

**烟花人工智能 (`fireworks/`)**：`fireworks/accounts/fireworks/models/deepseek-v3p1`

**Cerebras (`cerebras/`)**：`cerebras/llama-3.3-70b`

**一致 (`cohere/`)**：`cohere/command-r-plus-08-2024`

**NVIDIA NIM (`nvidia/`)**：`nvidia/nvidia/llama-3.3-70b-instruct`

</details>

---

## 🧩 高级功能

### 定制模型

将任何模型 ID 添加到任何提供商，无需等待应用程序更新：

```bash
# Via API
curl -X POST http://localhost:20128/api/provider-models \
  -H "Content-Type: application/json" \
  -d '{"provider": "openai", "modelId": "gpt-4.5-preview", "modelName": "GPT-4.5 Preview"}'

# List: curl http://localhost:20128/api/provider-models?provider=openai
# Remove: curl -X DELETE "http://localhost:20128/api/provider-models?provider=openai&model=gpt-4.5-preview"
```

或者使用仪表板：**提供商 → [提供商] → 自定义模型**。

### 专用提供商路线

通过模型验证将请求直接路由到特定提供者：

```bash
POST http://localhost:20128/v1/providers/openai/chat/completions
POST http://localhost:20128/v1/providers/openai/embeddings
POST http://localhost:20128/v1/providers/fireworks/images/generations
```

如果缺少提供商前缀，则会自动添加。不匹配的模型返回 `400`。

### 网络代理配置

```bash
# Set global proxy
curl -X PUT http://localhost:20128/api/settings/proxy \
  -d '{"global": {"type":"http","host":"proxy.example.com","port":"8080"}}'

# Per-provider proxy
curl -X PUT http://localhost:20128/api/settings/proxy \
  -d '{"providers": {"openai": {"type":"socks5","host":"proxy.example.com","port":"1080"}}}'

# Test proxy
curl -X POST http://localhost:20128/api/settings/proxy/test \
  -d '{"proxy":{"type":"socks5","host":"proxy.example.com","port":"1080"}}'
```

**优先级：**特定于键→特定于组合→特定于提供者→全局→环境。

### 模型目录 API

```bash
curl http://localhost:20128/api/models/catalog
```

返回按类型（`chat`、`embedding`、`image`）提供者分组的模型。

### 云同步

- 跨设备同步提供商、组合和设置
- 自动后台同步，带超时+快速失败
- 在生产中更喜欢服务器端 `BASE_URL`/`CLOUD_URL`

### LLM Gateway Intelligence（第 9 阶段）

- **语义缓存** — 自动缓存非流式传输、温度=0 响应（使用 `X-OmniRoute-No-Cache: true` 绕过）
- **请求幂等性** — 通过 `Idempotency-Key` 或 `X-Request-Id` 标头在 5 秒内删除重复请求
- **进度跟踪** — 通过 `X-OmniRoute-Progress: true` 标头选择加入 SSE `event: progress` 事件

---

### 翻译游乐场

通过**仪表板 → 翻译器**访问。调试并可视化 OmniRoute 如何在提供者之间转换 API 请求。

| 模式           | 目的                                              |
| -------------- | ------------------------------------------------- |
| **游乐场**     | 选择源/目标格式，粘贴请求，然后立即查看翻译的输出 |
| **聊天测试仪** | 通过代理发送实时聊天消息并检查完整的请求/响应周期 |
| **测试台**     | 跨多种格式组合运行批量测试以验证翻译的正确性      |
| **实时监控**   | 当请求流经代理时观看实时翻译                      |

**使用案例：**

- 调试特定客户端/提供商组合失败的原因
- 验证思维标签、工具调用和系统提示是否正确翻译
- 比较 OpenAI、Claude、Gemini 和 Responses API 格式之间的格式差异

---

### 路由策略

通过**仪表板→设置→路由**进行配置。

| 战略                      | 描述                                                                |
| ------------------------- | ------------------------------------------------------------------- |
| **先填写**                | 按优先级顺序使用帐户 — 主帐户处理所有请求，直到不可用为止           |
| **循环赛**                | 循环浏览所有帐户，并具有可配置的粘性限制（默认：每个帐户 3 次调用） |
| **P2C（两种选择的力量）** | 随机选择 2 个账户并选择更健康的账户 — 平衡负荷与健康意识            |
| **随机**                  | 使用 Fisher-Yates shuffle 为每个请求随机选择一个帐户                |
| **最少使用**              | 路由到具有最早 `lastUsedAt` 时间戳的帐户，均匀分配流量              |
| **成本优化**              | 路由至具有最低优先级值的帐户，针对成本最低的提供商进行优化          |

#### 通配符模型别名

创建通配符模式来重新映射模型名称：

```
Pattern: claude-sonnet-*     →  Target: cc/claude-sonnet-4-5-20250929
Pattern: gpt-*               →  Target: gh/gpt-5.1-codex
```

通配符支持 `*`（任何字符）和 `?`（单个字符）。

#### 后备链

定义适用于所有请求的全局后备链：

```
Chain: production-fallback
  1. cc/claude-opus-4-6
  2. gh/gpt-5.1-codex
  3. glm/glm-4.7
```

---

### 弹性和断路器

通过**仪表板→设置→弹性**进行配置。

OmniRoute 通过四个组件实现提供商级弹性：

1. **提供商配置文件** — 每个提供商的配置：
   - 失败阈值（打开前有多少次失败）
   - 冷却时间
   - 速率限制检测灵敏度
   - 指数退避参数

2. **可编辑的速率限制** — 可在仪表板中配置的系统级默认值：
   - **每分钟请求数 (RPM)** — 每个帐户每分钟最大请求数
   - **请求之间的最小时间** — 请求之间的最小间隔（以毫秒为单位）
   - **最大并发请求** — 每个帐户的最大并发请求数
   - 点击**编辑**进行修改，然后点击**保存**或**取消**。价值通过弹性 API 得以保留。

3. **断路器** — 跟踪每个提供商的故障并在达到阈值时自动打开电路：
   - **CLOSED**（健康）— 请求正常流动
   - **OPEN** — 提供商在多次失败后被暂时阻止
   - **HALF_OPEN** — 测试提供商是否已恢复

4. **策略和锁定标识符** — 显示断路器状态和具有强制解锁功能的锁定标识符。

5. **速率限制自动检测** — 监控 `429` 和 `Retry-After` 标头，以主动避免达到提供商速率限制。

**专业提示：** 当提供商从中断中恢复时，使用 **全部重置** 按钮可以清除所有断路器和冷却时间。

---

### 数据库导出/导入

在**仪表板→设置→系统和存储**中管理数据库备份。

| 行动                   | 描述                                                                               |
| ---------------------- | ---------------------------------------------------------------------------------- |
| **导出数据库**         | 将当前 SQLite 数据库下载为 `.sqlite` 文件                                          |
| **全部导出 (.tar.gz)** | 下载完整的备份存档，包括：数据库、设置、组合、提供商连接（无凭据）、API 密钥元数据 |
| **导入数据库**         | 上传 `.sqlite` 文件以替换当前数据库。自动创建导入前备份                            |

```bash
# API: Export database
curl -o backup.sqlite http://localhost:20128/api/db-backups/export

# API: Export all (full archive)
curl -o backup.tar.gz http://localhost:20128/api/db-backups/exportAll

# API: Import database
curl -X POST http://localhost:20128/api/db-backups/import \
  -F "file=@backup.sqlite"
```

**导入验证：** 验证导入文件的完整性（SQLite 编译指示检查）、所需表（`provider_connections`、`provider_nodes`、`combos`、`api_keys`）和大小（最大 100MB）。

**使用案例：**

- 在机器之间迁移 OmniRoute
- 创建外部备份以进行灾难恢复
- 在团队成员之间共享配置（导出全部→共享存档）

---

### 设置仪表板

设置页面分为 5 个选项卡，以便于导航：

| 选项卡       | 内容                                                              |
| ------------ | ----------------------------------------------------------------- |
| **安全**     | 登录/密码设置、IP 访问控制、`/models` 的 API 身份验证和提供商阻止 |
| **路由**     | 全局路由策略（6 个选项）、通配符模型别名、后备链、组合默认值      |
| **弹性**     | 提供商资料、可编辑的速率限制、断路器状态、策略和锁定标识符        |
| **人工智能** | 思维预算配置、全局系统提示注入、提示缓存统计                      |
| **高级**     | 全局代理配置（HTTP/SOCKS5）                                       |

---

### 成本和预算管理

通过**仪表板 → 成本**访问。

| 选项卡   | 目的                                                         |
| -------- | ------------------------------------------------------------ |
| **预算** | 通过每日/每周/每月预算和实时跟踪设置每个 API 密钥的支出限额  |
| **定价** | 查看和编辑模型定价条目 - 每个提供商每 1K 输入/输出代币的成本 |

```bash
# API: Set a budget
curl -X POST http://localhost:20128/api/usage/budget \
  -H "Content-Type: application/json" \
  -d '{"keyId": "key-123", "limit": 50.00, "period": "monthly"}'

# API: Get current budget status
curl http://localhost:20128/api/usage/budget
```

**成本跟踪：** 每个请求都会记录令牌使用情况并使用定价表计算成本。按提供商、型号和 API 密钥查看 **仪表板 → 使用情况** 中的细分。

---

### 音频转录

OmniRoute 支持通过 OpenAI 兼容端点进行音频转录：

```bash
POST /v1/audio/transcriptions
Authorization: Bearer your-api-key
Content-Type: multipart/form-data

# Example with curl
curl -X POST http://localhost:20128/v1/audio/transcriptions \
  -H "Authorization: Bearer your-api-key" \
  -F "file=@audio.mp3" \
  -F "model=deepgram/nova-3"
```

可用提供程序：**Deepgram** (`deepgram/`)、**AssemblyAI** (`assemblyai/`)。

支持的音频格式：`mp3`、`wav`、`m4a`、`flac`、`ogg`、`webm`。

---

### 组合平衡策略

在**仪表板→组合→创建/编辑→策略**中配置每个组合的平衡。

| 战略         | 描述                                     |
| ------------ | ---------------------------------------- |
| **循环赛**   | 按顺序轮换模型                           |
| **优先**     | 总是尝试第一个模型；仅在错误时才回退     |
| **随机**     | 为每个请求从组合中选择一个随机模型       |
| **加权**     | 根据每个模型分配的权重按比例路由         |
| **最少使用** | 路由到最近请求最少的模型（使用组合指标） |
| **成本优化** | 通往最便宜可用型号的路线（使用定价表）   |

全局组合默认值可以在**仪表板→设置→路由→组合默认值**中设置。

---

### 健康仪表板

通过**仪表板→健康**访问。 6张卡实时系统健康概览：

| 卡             | 它显示了什么                               |
| -------------- | ------------------------------------------ |
| **系统状态**   | 正常运行时间、版本、内存使用情况、数据目录 |
| **提供者健康** | 每个提供商的断路器状态（闭合/打开/半开）   |
| **速率限制**   | 每个帐户的活动速率限制冷却时间和剩余时间   |
| **主动锁定**   | 供应商因封锁政策而暂时被封锁               |
| **签名缓存**   | 重复数据删除缓存统计信息（活动键、命中率） |
| **延迟遥测**   | 每个提供商的 p50/p95/p99 延迟聚合          |

**专业提示：** 健康页面每 10 秒自动刷新一次。使用断路器卡来识别哪些提供商遇到问题。
