# User Guide (中文（简体）)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/USER_GUIDE.md) · 🇪🇸 [es](../../es/docs/USER_GUIDE.md) · 🇫🇷 [fr](../../fr/docs/USER_GUIDE.md) · 🇩🇪 [de](../../de/docs/USER_GUIDE.md) · 🇮🇹 [it](../../it/docs/USER_GUIDE.md) · 🇷🇺 [ru](../../ru/docs/USER_GUIDE.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/USER_GUIDE.md) · 🇯🇵 [ja](../../ja/docs/USER_GUIDE.md) · 🇰🇷 [ko](../../ko/docs/USER_GUIDE.md) · 🇸🇦 [ar](../../ar/docs/USER_GUIDE.md) · 🇮🇳 [hi](../../hi/docs/USER_GUIDE.md) · 🇮🇳 [in](../../in/docs/USER_GUIDE.md) · 🇹🇭 [th](../../th/docs/USER_GUIDE.md) · 🇻🇳 [vi](../../vi/docs/USER_GUIDE.md) · 🇮🇩 [id](../../id/docs/USER_GUIDE.md) · 🇲🇾 [ms](../../ms/docs/USER_GUIDE.md) · 🇳🇱 [nl](../../nl/docs/USER_GUIDE.md) · 🇵🇱 [pl](../../pl/docs/USER_GUIDE.md) · 🇸🇪 [sv](../../sv/docs/USER_GUIDE.md) · 🇳🇴 [no](../../no/docs/USER_GUIDE.md) · 🇩🇰 [da](../../da/docs/USER_GUIDE.md) · 🇫🇮 [fi](../../fi/docs/USER_GUIDE.md) · 🇵🇹 [pt](../../pt/docs/USER_GUIDE.md) · 🇷🇴 [ro](../../ro/docs/USER_GUIDE.md) · 🇭🇺 [hu](../../hu/docs/USER_GUIDE.md) · 🇧🇬 [bg](../../bg/docs/USER_GUIDE.md) · 🇸🇰 [sk](../../sk/docs/USER_GUIDE.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/USER_GUIDE.md) · 🇮🇱 [he](../../he/docs/USER_GUIDE.md) · 🇵🇭 [phi](../../phi/docs/USER_GUIDE.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/USER_GUIDE.md) · 🇨🇿 [cs](../../cs/docs/USER_GUIDE.md) · 🇹🇷 [tr](../../tr/docs/USER_GUIDE.md)

---

有关配置提供商、创建组合、集成 CLI 工具和部署 OmniRoute 的完整指南。---

## Table of Contents

- [定价一览](#-pricing-at-a-glance)
- [用例](#-use-cases)
- [提供商设置](#-provider-setup)
- [CLI 集成](#-cli-integration)
- [部署](#-部署)
- [可用型号](#-available-models)
- [高级功能](#-advanced-features)---

## 💰 Pricing at a Glance

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
| **🆓 免费**     | 科德尔                 | 0 美元              | 无限            | 8 款免费       |
|                 | 奎文                   | 0 美元              | 无限            | 3 款免费       |
|                 | 基罗                   | 0 美元              | 无限            | 克劳德自由     |

**💡专业提示：**从 Gemini CLI（180K 免费/月）+ Qoder（无限免费）组合开始 = 0 美元成本！---

## 🎯 Use Cases

### Case 1: "I have Claude Pro subscription"

**问题：**未使用的配额过期，繁重编码期间的速率限制```
Combo: "maximize-claude"

1. cc/claude-opus-4-6 (use subscription fully)
2. glm/glm-4.7 (cheap backup when quota out)
3. if/kimi-k2-thinking (free emergency fallback)

Monthly cost: $20 (subscription) + ~$5 (backup) = $25 total
vs. $20 + hitting limits = frustration

````

### Case 2: "I want zero cost"

**问题：**无力订阅，需要可靠的人工智能编码```
Combo: "free-forever"
  1. gc/gemini-3-flash         (180K free/month)
  2. if/kimi-k2-thinking       (unlimited free)
  3. qw/qwen3-coder-plus       (unlimited free)

Monthly cost: $0
Quality: Production-ready models
````

### Case 3: "I need 24/7 coding, no interruptions"

**问题：**截止日期，无法承受停机时间```
Combo: "always-on"

1. cc/claude-opus-4-6 (best quality)
2. cx/gpt-5.2-codex (second subscription)
3. glm/glm-4.7 (cheap, resets daily)
4. minimax/MiniMax-M2.1 (cheapest, 5h reset)
5. if/kimi-k2-thinking (free unlimited)

Result: 5 layers of fallback = zero downtime
Monthly cost: $20-200 (subscriptions) + $10-20 (backup)

````

### Case 4: "I want FREE AI in OpenClaw"

**问题：**需要在消息应用程序中使用人工智能助手，完全免费```
Combo: "openclaw-free"
  1. if/glm-4.7                (unlimited free)
  2. if/minimax-m2.1           (unlimited free)
  3. if/kimi-k2-thinking       (unlimited free)

Monthly cost: $0
Access via: WhatsApp, Telegram, Slack, Discord, iMessage, Signal...
````

---

## 📖 Provider Setup

### 🔐 Subscription Providers

#### Claude Code (Pro/Max)

```bash
Dashboard → Providers → Connect Claude Code
→ OAuth login → Auto token refresh
→ 5-hour + weekly quota tracking

Models:
  cc/claude-opus-4-6
  cc/claude-sonnet-4-5-20250929
  cc/claude-haiku-4-5-20251001
```

**专业提示：**使用 Opus 来完成复杂的任务，使用 Sonnet 来提高速度。 OmniRoute 跟踪每个模型的配额！#### OpenAI Codex (Plus/Pro)

```bash
Dashboard → Providers → Connect Codex
→ OAuth login (port 1455)
→ 5-hour + weekly reset

Models:
  cx/gpt-5.2-codex
  cx/gpt-5.1-codex-max
```

#### Gemini CLI (FREE 180K/month!)

```bash
Dashboard → Providers → Connect Gemini CLI
→ Google OAuth
→ 180K completions/month + 1K/day

Models:
  gc/gemini-3-flash-preview
  gc/gemini-2.5-pro
```

**最超值：**巨大的免费套餐！在付费等级之前使用此功能。#### GitHub Copilot

```bash
Dashboard → Providers → Connect GitHub
→ OAuth via GitHub
→ Monthly reset (1st of month)

Models:
  gh/gpt-5
  gh/claude-4.5-sonnet
  gh/gemini-3.1-pro-preview
```

### 💰 Cheap Providers

#### GLM-4.7 (Daily reset, $0.6/1M)

1、注册：【智普AI】(https://open.bigmodel.cn/) 2. 从 Coding Plan 获取 API 密钥 3. 仪表板 → 添加 API 密钥：提供商：`glm`，API 密钥：`your-key`

**使用：**`glm/glm-4.7` —**专业提示：**Coding Plan 以 1/7 的成本提供 3× 配额！每天上午 10:00 重置。#### MiniMax M2.1 (5h reset, $0.20/1M)

1. 注册：[MiniMax](https://www.minimax.io/) 2.获取API密钥→仪表板→添加API密钥

**使用：**`minimax/MiniMax-M2.1` —**专业提示：**长上下文的最便宜选择（1M 令牌）！#### Kimi K2 ($9/month flat)

1.订阅：【Moonshot AI】(https://platform.moonshot.ai/) 2.获取API密钥→仪表板→添加API密钥

**使用：**`kimi/kimi-latest` —**专业提示：**固定 9 美元/月 1000 万个代币 = 0.90 美元/100 万有效成本！### 🆓 FREE Providers

#### Qoder (8 FREE models)

```bash
Dashboard → Connect Qoder → OAuth login → Unlimited usage

Models: if/kimi-k2-thinking, if/qwen3-coder-plus, if/glm-4.7, if/minimax-m2, if/deepseek-r1
```

#### Qwen (3 FREE models)

```bash
Dashboard → Connect Qwen → Device code auth → Unlimited usage

Models: qw/qwen3-coder-plus, qw/qwen3-coder-flash
```

#### Kiro (Claude FREE)

```bash
Dashboard → Connect Kiro → AWS Builder ID or Google/GitHub → Unlimited

Models: kr/claude-sonnet-4.5, kr/claude-haiku-4.5
```

---

## 🎨 Combos

### Example 1: Maximize Subscription → Cheap Backup

```
Dashboard → Combos → Create New

Name: premium-coding
Models:
  1. cc/claude-opus-4-6 (Subscription primary)
  2. glm/glm-4.7 (Cheap backup, $0.6/1M)
  3. minimax/MiniMax-M2.1 (Cheapest fallback, $0.20/1M)

Use in CLI: premium-coding
```

### Example 2: Free-Only (Zero Cost)

```
Name: free-combo
Models:
  1. gc/gemini-3-flash-preview (180K free/month)
  2. if/kimi-k2-thinking (unlimited)
  3. qw/qwen3-coder-plus (unlimited)

Cost: $0 forever!
```

---

## 🔧 CLI Integration

### Cursor IDE

```
Settings → Models → Advanced:
  OpenAI API Base URL: http://localhost:20128/v1
  OpenAI API Key: [from omniroute dashboard]
  Model: cc/claude-opus-4-6
```

### Claude Code

编辑`~/.claude/config.json`：```json
{
"anthropic_api_base": "http://localhost:20128/v1",
"anthropic_api_key": "your-omniroute-api-key"
}

````

### Codex CLI

```bash
export OPENAI_BASE_URL="http://localhost:20128"
export OPENAI_API_KEY="your-omniroute-api-key"
codex "your prompt"
````

### OpenClaw

编辑`~/.openclaw/openclaw.json`：```json
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

**或使用仪表板：**CLI 工具 → OpenClaw → 自动配置### Cline / Continue / RooCode

```

Provider: OpenAI Compatible
Base URL: http://localhost:20128/v1
API Key: [from dashboard]
Model: cc/claude-opus-4-6

````

---

## 部署

### Global npm install (Recommended)

```bash
npm install -g omniroute

# Create config directory
mkdir -p ~/.omniroute

# Create .env file (see .env.example)
cp .env.example ~/.omniroute/.env

# Start server
omniroute
# Or with custom port:
omniroute --port 3000
````

CLI 自动从 `~/.omniroute/.env` 或 `./.env` 加载 `.env`。### VPS Deployment

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

### PM2 Deployment (Low Memory)

对于 RAM 有限的服务器，请使用内存限制选项：```bash

# With 512MB limit (default)

pm2 start npm --name omniroute -- start

# Or with custom memory limit

OMNIROUTE_MEMORY_MB=512 pm2 start npm --name omniroute -- start

# Or using ecosystem.config.js

pm2 start ecosystem.config.js

````

创建 `ecosystem.config.js`：```javascript
module.exports = {
  apps: [
    {
      name: "omniroute",
      script: "npm",
      args: "start",
      env: {
        NODE_ENV: "production",
        OMNIROUTE_MEMORY_MB: "512",
        JWT_SECRET: "your-secret",
        INITIAL_PASSWORD: "your-password",
      },
      node_args: "--max-old-space-size=512",
      max_memory_restart: "300M",
    },
  ],
};
````

### Docker

```bash
# Build image (default = runner-cli with codex/claude/droid preinstalled)
docker build -t omniroute:cli .

# Portable mode (recommended)
docker run -d --name omniroute -p 20128:20128 --env-file ./.env -v omniroute-data:/app/data omniroute:cli
```

对于使用 CLI 二进制文件的主机集成模式，请参阅主文档中的 Docker 部分。### Void Linux (xbps-src)

Void Linux 用户可以使用“xbps-src”交叉编译框架本地打包和安装 OmniRoute。这会自动执行 Node.js 独立构建以及所需的“better-sqlite3”本机绑定。

<详情>

<summary><b>查看xbps-src模板</b></summary>```bash
# Template file for 'omniroute'
pkgname=omniroute
version=3.2.4
revision=1
hostmakedepends="nodejs python3 make"
depends="openssl"
short_desc="Universal AI gateway with smart routing for multiple LLM providers"
maintainer="zenobit <zenobit@disroot.org>"
license="MIT"
homepage="https://github.com/diegosouzapw/OmniRoute"
distfiles="https://github.com/diegosouzapw/OmniRoute/archive/refs/tags/v${version}.tar.gz"
checksum=009400afee90a9f32599d8fe734145cfd84098140b7287990183dde45ae2245b
system_accounts="_omniroute"
omniroute_homedir="/var/lib/omniroute"
export NODE_ENV=production
export npm_config_engine_strict=false
export npm_config_loglevel=error
export npm_config_fund=false
export npm_config_audit=false

do_build() { # Determine target CPU arch for node-gyp
local \_gyp_arch
case "$XBPS_TARGET_MACHINE" in
aarch64*) \_gyp_arch=arm64 ;;
armv7*|armv6*) \_gyp_arch=arm ;;
i686*) \_gyp_arch=ia32 ;;
\*) \_gyp_arch=x64 ;;
esac

    # 1) Install all deps – skip scripts
    NODE_ENV=development npm ci --ignore-scripts

    # 2) Build the Next.js standalone bundle
    npm run build

    # 3) Copy static assets into standalone
    cp -r .next/static .next/standalone/.next/static
    [ -d public ] && cp -r public .next/standalone/public || true

    # 4) Compile better-sqlite3 native binding
    local _node_gyp=/usr/lib/node_modules/npm/node_modules/node-gyp/bin/node-gyp.js
    (cd node_modules/better-sqlite3 && node "$_node_gyp" rebuild --arch="$_gyp_arch")

    # 5) Place the compiled binding into the standalone bundle
    local _bs3_release=.next/standalone/node_modules/better-sqlite3/build/Release
    mkdir -p "$_bs3_release"
    cp node_modules/better-sqlite3/build/Release/better_sqlite3.node "$_bs3_release/"

    # 6) Remove arch-specific sharp bundles
    rm -rf .next/standalone/node_modules/@img

    # 7) Copy pino runtime deps omitted by Next.js static analysis:
    for _mod in pino-abstract-transport split2 process-warning; do
    	cp -r "node_modules/$_mod" .next/standalone/node_modules/
    done

}

do_check() {
npm run test:unit
}

do_install() {
vmkdir usr/lib/omniroute/.next
vcopy .next/standalone/. usr/lib/omniroute/.next/standalone

    # Prevent removal of empty Next.js app router dirs by the post-install hook
    for _d in \
    	.next/standalone/.next/server/app/dashboard \
    	.next/standalone/.next/server/app/dashboard/settings \
    	.next/standalone/.next/server/app/dashboard/providers; do
    	touch "${DESTDIR}/usr/lib/omniroute/${_d}/.keep"
    done

    cat > "${WRKDIR}/omniroute" <<'EOF'

#!/bin/sh
export PORT="${PORT:-20128}"
export DATA_DIR="${DATA_DIR:-${XDG_DATA_HOME:-${HOME}/.local/share}/omniroute}"
export APP_LOG_TO_FILE="${APP_LOG_TO_FILE:-false}"
mkdir -p "${DATA_DIR}"
exec node /usr/lib/omniroute/.next/standalone/server.js "$@"
EOF
	vbin "${WRKDIR}/omniroute"
}

post_install() {
vlicense LICENSE
}

````

</details>

### Environment Variables

|变量|默认 |描述 |
| --------------------------------------- | ------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------- |
| `JWT_SECRET` | `omniroute-default-secret-change-me` | JWT 签名秘密（**生产变更**）|
| `初始密码` | `123456` |首次登录密码 |
| `DATA_DIR` | `~/.omniroute` |数据目录（数据库、使用情况、日志）|
| `端口` |框架默认|服务端口（示例中为“20128”）|
| `主机名` |框架默认|绑定主机（Docker 默认为 `0.0.0.0`） |
| `NODE_ENV` |运行时默认 |设置“生产”以进行部署 |
| `BASE_URL` | `http://localhost:20128` |服务器端内部基本 URL |
| `CLOUD_URL` | `https://omniroute.dev` |云同步端点基本 URL |
| `API_KEY_SECRET` | `端点代理 API 密钥秘密` |生成的 API 密钥的 HMAC 秘密 |
| `REQUIRE_API_KEY` | `假` |在 `/v1/*` 上强制执行 Bearer API 密钥 |
| `ALLOW_API_KEY_REVEAL` | `假` |允许 Api Manager 按需复制完整的 API 密钥 |
| `PROVIDER_LIMITS_SYNC_INTERVAL_MINUTES` | `70` |缓存的提供商限制数据的服务器端刷新节奏； UI 刷新按钮仍会触发手动同步 |
| `DISABLE_SQLITE_AUTO_BACKUP` | `假` |在写入/导入/恢复之前禁用自动 SQLite 快照；手动备份仍然有效|
| `启用请求日志` | `假` |启用请求/响应日志 |
| `AUTH_COOKIE_SECURE` | `假` |强制“安全”身份验证 cookie（在 HTTPS 反向代理后面）|
| `CLOUDFLARED_BIN` |取消设置 |使用现有的“cloudflared”二进制文件而不是托管下载 |
| `CLOUDFLARED_PROTOCOL` | `http2` |托管快速隧道的传输（“http2”、“quic”或“auto”）|
| `OMNIROUTE_MEMORY_MB` | `512` | Node.js 堆限制 (MB) |
| `PROMPT_CACHE_MAX_SIZE` | `50` |最大提示缓存条目 |
| `SEMANTIC_CACHE_MAX_SIZE` | `100` |最大语义缓存条目 |有关完整的环境变量参考，请参阅 [README](../README.md)。---

## 📊 Available Models

<详情>
<summary><b>查看所有可用型号</b></summary>

**克劳德代码 (`cc/`)**— Pro/Max：`cc/claude-opus-4-6`、`cc/claude-sonnet-4-5-20250929`、`cc/claude-haiku-4-5-20251001`

**Codex (`cx/`)**— Plus/Pro：`cx/gpt-5.2-codex`、`cx/gpt-5.1-codex-max`

**Gemini CLI (`gc/`)**— 免费：`gc/gemini-3-flash-preview`、`gc/gemini-2.5-pro`

**GitHub Copilot (`gh/`)**：`gh/gpt-5`、`gh/claude-4.5-sonnet`

**GLM (`glm/`)**— 0.6 美元/100 万美元：`glm/glm-4.7`

**MiniMax (`minimax/`)**— $0.2/1M：`minimax/MiniMax-M2.1`

**Qoder (`if/`)**— 免费：`if/kimi-k2-thinking`、`if/qwen3-coder-plus`、`if/deepseek-r1`

**Qwen (`qw/`)**— 免费：`qw/qwen3-coder-plus`、`qw/qwen3-coder-flash`

**Kiro (`kr/`)**— 免费：`kr/claude-sonnet-4.5`、`kr/claude-haiku-4.5`

**DeepSeek (`ds/`)**：`ds/deepseek-chat`、`ds/deepseek-reasoner`

**Groq (`groq/`)**：`groq/llama-3.3-70b-versatile`、`groq/llama-4-maverick-17b-128e-instruct`

**xAI (`xai/`)**：`xai/grok-4`、`xai/grok-4-0709-fast-reasoning`、`xai/grok-code-mini`

**米斯特拉尔（`米斯特拉尔/`）**：`米斯特拉尔/米斯特拉尔-大-2501`，`米斯特拉尔/codestral-2501`

**困惑（`pplx/`）**：`pplx/sonar-pro`、`pplx/sonar`

**一起AI（`一起/`）**：`一起/meta-llama/Llama-3.3-70B-Instruct-Turbo`

**Fireworks AI (`fireworks/`)**：`fireworks/accounts/fireworks/models/deepseek-v3p1`

**Cerebras (`cerebras/`)**：`cerebras/llama-3.3-70b`

**Cohere (`cohere/`)**：`cohere/command-r-plus-08-2024`

**NVIDIA NIM (`nvidia/`)**：`nvidia/nvidia/llama-3.3-70b-instruct`</details>

---

## 🧩 Advanced Features

### Custom Models

将任何模型 ID 添加到任何提供商，无需等待应用程序更新：```bash
# Via API
curl -X POST http://localhost:20128/api/provider-models \
  -H "Content-Type: application/json" \
  -d '{"provider": "openai", "modelId": "gpt-4.5-preview", "modelName": "GPT-4.5 Preview"}'

# List: curl http://localhost:20128/api/provider-models?provider=openai
# Remove: curl -X DELETE "http://localhost:20128/api/provider-models?provider=openai&model=gpt-4.5-preview"
````

或者使用仪表板：**提供商 → [提供商] → 自定义模型**。

注意事项：

- OpenRouter 和 OpenAI/Anthropic 兼容提供程序仅通过**可用模型**进行管理。手动添加、导入和自动同步都位于同一可用模型列表中，因此这些提供程序没有单独的自定义模型部分。-**自定义模型**部分适用于不公开托管可用模型导入的提供商。### Dedicated Provider Routes

通过模型验证将请求直接路由到特定提供者：```bash
POST http://localhost:20128/v1/providers/openai/chat/completions
POST http://localhost:20128/v1/providers/openai/embeddings
POST http://localhost:20128/v1/providers/fireworks/images/generations

````

如果缺少提供商前缀，则会自动添加。不匹配的模型返回“400”。### Network Proxy Configuration

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
````

**优先级：**特定于键→特定于组合→特定于提供者→全局→环境。### Model Catalog API

```bash
curl http://localhost:20128/api/models/catalog
```

返回按类型（“聊天”、“嵌入”、“图像”）提供者分组的模型。### Cloud Sync

- 跨设备同步提供商、组合和设置
- 自动后台同步，带超时+快速失败
- 在生产中更喜欢服务器端`BASE_URL`/`CLOUD_URL`### Cloudflare Quick Tunnel

- 适用于 Docker 和其他自托管部署的**仪表板 → 端点**
- 创建一个临时的“https://\*.trycloudflare.com” URL，转发到当前与 OpenAI 兼容的“/v1”端点
- 首先启用仅在需要时安装“cloudflared”；稍后重新启动，重用相同的托管二进制文件
- OmniRoute 或容器重新启动后，快速隧道不会自动恢复；需要时从仪表板重新启用它们
- 隧道 URL 是短暂的，每次停止/启动隧道时都会发生变化
- 托管快速隧道默认采用 HTTP/2 传输，以避免受限容器中出现嘈杂的 QUIC UDP 缓冲区警告
- 如果您想覆盖托管传输选择，请设置“CLOUDFLARED_PROTOCOL=quic”或“auto”
- 如果您更喜欢使用预安装的“cloudflared”二进制文件而不是托管下载，请设置“CLOUDFLARED_BIN”### LLM Gateway Intelligence (Phase 9)

-**语义缓存**— 自动缓存非流式传输、温度=0 响应（使用“X-OmniRoute-No-Cache: true”绕过）-**请求幂等性**— 通过“Idempotency-Key”或“X-Request-Id”标头在 5 秒内删除重复请求 -**进度跟踪**— 通过“X-OmniRoute-Progress: true”标头选择加入 SSE“event:progress”事件---

### Translator Playground

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
- 比较 OpenAI、Claude、Gemini 和 Responses API 格式之间的格式差异---

### Routing Strategies

通过**仪表板→设置→路由**进行配置。

| 战略                      | 描述                                                                |
| ------------------------- | ------------------------------------------------------------------- | ----------------------------------- |
| **先填写**                | 按优先级顺序使用帐户 — 主帐户处理所有请求，直到不可用为止           |
| **循环赛**                | 循环浏览所有帐户，并具有可配置的粘性限制（默认：每个帐户 3 次调用） |
| **P2C（两种选择的力量）** | 随机选择 2 个账户并选择更健康的账户 — 平衡负荷与健康意识            |
| **随机**                  | 使用 Fisher-Yates shuffle 为每个请求随机选择一个帐户                |
| **最少使用**              | 路由到具有最早的“lastUsedAt”时间戳的帐户，均匀分配流量              |
| **成本优化**              | 路由至具有最低优先级值的帐户，针对成本最低的提供商进行优化          | #### External Sticky Session Header |

对于外部会话关联（例如，反向代理后面的 Claude Code/Codex 代理），发送：```http
X-Session-Id: your-session-key

````

OmniRoute 还接受“x_session_id”并在“X-OmniRoute-Session-Id”中返回有效会话密钥。

如果您使用 Nginx 并发送下划线形式的标头，请启用：```nginx
underscores_in_headers on;
````

#### Wildcard Model Aliases

创建通配符模式来重新映射模型名称：```
Pattern: claude-sonnet-_ → Target: cc/claude-sonnet-4-5-20250929
Pattern: gpt-_ → Target: gh/gpt-5.1-codex

````

通配符支持“*”（任何字符）和“?”（单个字符）。#### Fallback Chains

定义适用于所有请求的全局后备链：```
Chain: production-fallback
  1. cc/claude-opus-4-6
  2. gh/gpt-5.1-codex
  3. glm/glm-4.7
````

---

### Resilience & Circuit Breakers

通过**仪表板→设置→弹性**进行配置。

OmniRoute 通过四个组件实现提供商级弹性：

1.**提供商配置文件**— 每个提供商的配置：

- 失败阈值（打开前有多少次失败）
- 冷却时间
- 速率限制检测灵敏度
- 指数退避参数

  2.**可编辑的速率限制**— 可在仪表板中配置的系统级默认值：-**每分钟请求数 (RPM)**— 每个帐户每分钟最大请求数 -**请求之间的最小时间**— 请求之间的最小间隔（以毫秒为单位）-**最大并发请求**— 每个帐户的最大并发请求数

- 点击**编辑**进行修改，然后点击**保存**或**取消**。价值通过弹性 API 得以保留。

  3.**断路器**— 跟踪每个提供商的故障并在达到阈值时自动打开电路：-**CLOSED**（健康）— 请求正常流动 -**OPEN**— 提供商在多次失败后被暂时阻止 -**HALF_OPEN**— 测试提供商是否已恢复

  4.**策略和锁定标识符**— 显示断路器状态和具有强制解锁功能的锁定标识符。

  5.**速率限制自动检测**— 监控“429”和“Retry-After”标头，以主动避免达到提供商速率限制。

**专业提示：**当提供商从中断中恢复时，使用**全部重置**按钮可以清除所有断路器和冷却时间。---

### Database Export / Import

在**仪表板→设置→系统和存储**中管理数据库备份。

| 行动                   | 描述                                                                                               |
| ---------------------- | -------------------------------------------------------------------------------------------------- | ------- |
| **导出数据库**         | 将当前 SQLite 数据库下载为“.sqlite”文件                                                            |
| **全部导出 (.tar.gz)** | 下载完整的备份存档，包括：数据库、设置、组合、提供商连接（无凭据）、API 密钥元数据                 |
| **导入数据库**         | 上传`.sqlite`文件来替换当前数据库。除非`DISABLE_SQLITE_AUTO_BACKUP=true`，否则会自动创建导入前备份 | ```bash |

# API: Export database

curl -o backup.sqlite http://localhost:20128/api/db-backups/export

# API: Export all (full archive)

curl -o backup.tar.gz http://localhost:20128/api/db-backups/exportAll

# API: Import database

curl -X POST http://localhost:20128/api/db-backups/import \
 -F "file=@backup.sqlite"

````

**导入验证：**验证导入文件的完整性（SQLite 编译指示检查）、所需表（“provider_connections”、“provider_nodes”、“combos”、“api_keys”）和大小（最大 100MB）。

**使用案例：**

- 在机器之间迁移 OmniRoute
- 创建外部备份以进行灾难恢复
- 在团队成员之间共享配置（导出全部→共享存档）---

### Settings Dashboard

设置页面分为 6 个选项卡，以便于导航：

|选项卡|内容 |
| -------------- | ---------------------------------------------------------------------------------------------------------- |
|**一般**|系统存储工具、外观设置、主题控件和每个项目的侧边栏可见性 |
|**安全**|登录/密码设置、IP 访问控制、`/models` 的 API 身份验证和提供商阻止 |
|**路由**|全局路由策略（6 个选项）、通配符模型别名、后备链、组合默认值 |
|**弹性**|提供商资料、可编辑的速率限制、断路器状态、策略和锁定标识符 |
|**人工智能**|思维预算配置、全局系统提示注入、提示缓存统计|
|**高级**|全局代理配置（HTTP/SOCKS5）|---

### Costs & Budget Management

通过**仪表板 → 成本**访问。

|选项卡|目的|
| ----------- | ---------------------------------------------------------------------------------------------------- |
|**预算**|通过每日/每周/每月预算和实时跟踪设置每个 API 密钥的支出限额 |
|**定价**|查看和编辑模型定价条目 - 每个提供商每 1K 输入/输出代币的成本 |```bash
# API: Set a budget
curl -X POST http://localhost:20128/api/usage/budget \
  -H "Content-Type: application/json" \
  -d '{"keyId": "key-123", "limit": 50.00, "period": "monthly"}'

# API: Get current budget status
curl http://localhost:20128/api/usage/budget
````

**成本跟踪：**每个请求都会记录令牌使用情况并使用定价表计算成本。按提供商、型号和 API 密钥查看**仪表板 → 使用情况**中的细分。---

### Audio Transcription

OmniRoute 支持通过 OpenAI 兼容端点进行音频转录：```bash
POST /v1/audio/transcriptions
Authorization: Bearer your-api-key
Content-Type: multipart/form-data

# Example with curl

curl -X POST http://localhost:20128/v1/audio/transcriptions \
 -H "Authorization: Bearer your-api-key" \
 -F "file=@audio.mp3" \
 -F "model=deepgram/nova-3"

````

可用的提供程序：**Deepgram**(`deepgram/`)、**AssemblyAI**(`assembleai/`)。

支持的音频格式：`mp3`、`wav`、`m4a`、`flac`、`ogg`、`webm`。---

### Combo Balancing Strategies

在**仪表板→组合→创建/编辑→策略**中配置每个组合的平衡。

|战略|描述 |
| ------------------ | ------------------------------------------------------------------------------------ |
|**循环赛**|按顺序轮换模型 |
|**优先**|总是尝试第一个模型；仅在错误时才回退 |
|**随机**|为每个请求从组合中选择一个随机模型 |
|**加权**|根据每个模型分配的权重按比例路由 |
|**最少使用**|路由到最近请求最少的模型（使用组合指标）|
|**成本优化**|通往最便宜可用型号的路线（使用定价表）|

全局组合默认值可以在**仪表板→设置→路由→组合默认值**中设置。---

### Health Dashboard

通过**仪表板→健康**访问。 6张卡实时系统健康概览：

|卡|它显示了什么 |
| -------------------- | ----------------------------------------------------------- |
|**系统状态**|正常运行时间、版本、内存使用情况、数据目录 |
|**提供者健康**|每个提供商的断路器状态（闭合/打开/半开）|
|**速率限制**|每个帐户的活动速率限制冷却时间和剩余时间 |
|**主动锁定**| Providers temporarily blocked by the lockout policy         |
|**签名缓存**|重复数据删除缓存统计信息（活动键、命中率）|
|**延迟遥测**|每个提供商的 p50/p95/p99 延迟聚合 |

**专业提示：**健康页面每 10 秒自动刷新一次。使用断路器卡来识别哪些提供商遇到问题。---

## 🖥️ Desktop Application (Electron)

OmniRoute 可作为 Windows、macOS 和 Linux 的本机桌面应用程序使用。### 安装

```bash
# From the electron directory:
cd electron
npm install

# Development mode (connect to running Next.js dev server):
npm run dev

# Production mode (uses standalone build):
npm start
````

### Building Installers

```bash
cd electron
npm run build          # Current platform
npm run build:win      # Windows (.exe NSIS)
npm run build:mac      # macOS (.dmg universal)
npm run build:linux    # Linux (.AppImage)
```

输出 → `电子/离散电子/`### Key Features

|特色|描述 |
| ------------------------ | | ---------------------------------------------------------------- |
|**服务器准备情况**|在显示窗口之前轮询服务器（无空白屏幕）|
|**系统托盘**|最小化到托盘、更改端口、从托盘菜单退出 |
|**港口管理**|从托盘更改服务器端口（自动重新启动服务器）|
|**内容安全政策**|通过会话标头限制性 CSP |
|**单实例**|一次只能运行一个应用程序实例 |
|**离线模式**|捆绑的 Next.js 服务器无需互联网即可工作 |### Environment Variables

| 变量                  | 默认    | 描述                         |
| --------------------- | ------- | ---------------------------- |
| `OMNIROUTE_PORT`      | `20128` | 服务器端口                   |
| `OMNIROUTE_MEMORY_MB` | `512`   | Node.js 堆限制 (64–16384 MB) |

📖 完整文档：[`电子/README.md`](../电子/README.md)
