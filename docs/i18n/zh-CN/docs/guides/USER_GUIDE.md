---
title: "用户指南"
version: 3.8.40
lastUpdated: 2026-06-28
---

# 用户指南

配置服务商、创建 Combo、集成 CLI 工具和部署 OmniRoute 的完整指南。

---

## 目录

- [定价概览](#-pricing-at-a-glance)
- [典型场景](#-use-cases)
- [服务商配置](#-provider-setup)
- [CLI 集成](#-cli-integration)
- [部署](#-deployment)
- [可用模型](#-available-models)
- [高级功能](#-advanced-features)
- [自动路由（零配置）](#-auto-routing-zero-config)
- [MCP 与 A2A 集成](#-mcp--a2a-integration)
- [技能系统](#-skills-system)
- [记忆系统](#-memory-system)
- [Webhook](#-webhooks)
- [云代理](#-cloud-agents)
- [编程式管理](#-programmatic-management)
- [内置 CLI](#-internal-cli)
- [桌面应用 (Electron)](#-desktop-application-electron)

---

## 💰 定价概览

| 级别                     | 服务商            | 费用        | 配额重置      | 最佳用途              |
| ------------------------ | ----------------- | ----------- | ------------- | --------------------- |
| **💳 订阅制**            | Claude Code (Pro) | $20/月      | 5 小时 + 每周 | 已有订阅              |
|                          | Codex (Plus/Pro)  | $20-200/月  | 5 小时 + 每周 | OpenAI 用户           |
|                          | GitHub Copilot    | $10-19/月   | 每月          | GitHub 用户           |
| **🔑 API Key**           | DeepSeek          | 按量付费    | 无            | 低成本推理            |
|                          | Groq              | 按量付费    | 无            | 超高速推理            |
|                          | xAI (Grok)        | 按量付费    | 无            | Grok 4 推理           |
|                          | Mistral           | 按量付费    | 无            | 欧盟托管模型          |
|                          | Perplexity        | 按量付费    | 无            | 搜索增强              |
|                          | Together AI       | 按量付费    | 无            | 开源模型              |
|                          | Fireworks AI      | 按量付费    | 无            | 快速 FLUX 图像生成    |
|                          | Cerebras          | 按量付费    | 无            | 晶圆级速度            |
|                          | Cohere            | 按量付费    | 无            | Command R+ RAG        |
|                          | NVIDIA NIM        | 按量付费    | 无            | 企业级模型            |
| **💰 经济型**            | GLM-4.7           | $0.6/1M     | 每日 10:00    | 预算备用              |
|                          | MiniMax M2.1      | $0.2/1M     | 5 小时滑动窗口 | 最便宜选项            |
|                          | Kimi K2           | $9/月 固定  | 10M Token/月   | 费用可预测            |
| **🆓 免费**              | Qoder             | $0          | 无限制        | 8 个模型免费          |
|                          | Qwen              | $0          | 无限制        | 3 个模型免费          |
|                          | Kiro              | $0          | ~50 积分/月    | Claude 免费           |

---

## 🎯 典型场景

### 场景 1：「我已订阅 Claude Pro」

**问题：** 配额过期浪费，高强度编码时触发速率限制

```
Combo: "maximize-claude"
  1. cc/claude-opus-4-7        (充分利用订阅)
  2. glm/glm-4.7               (配额耗尽时的经济备用)
  3. if/kimi-k2       (免费应急容灾)

每月费用：$20（订阅）+ ~$5（备用）= 共 $25
对比 $20 + 触发限制 = 挫败感
```

### 场景 2：「我想零成本使用」

**问题：** 无法承担订阅费用，需要可靠的 AI 编程辅助

```
Combo: "free-forever"
  1. if/kimi-k2       (无限免费)
  2. qw/qwen3-coder-plus       (无限免费)

每月费用：$0
质量：生产级模型
```

### 场景 3：「我需要 7×24 编程，不能中断」

**问题：** 赶截止日期，不能容忍停机

```
Combo: "always-on"
  1. cc/claude-opus-4-7        (最佳质量)
  2. cx/gpt-5.5                (第二个订阅)
  3. glm/glm-4.7               (经济型，每日重置)
  4. minimax/MiniMax-M2.1      (最经济，5 小时重置)
  5. if/kimi-k2       (免费无限)

结果：5 层容灾 = 零停机
每月费用：$20-200（订阅）+ $10-20（备用）
```

### 场景 4：「我想在 OpenClaw 中使用免费的 AI」

**问题：** 需要在即时通讯应用中使用 AI 助手，完全免费

```
Combo: "openclaw-free"
  1. if/qwen3-coder-plus       (无限免费)
  2. if/deepseek-r1            (无限免费)
  3. if/kimi-k2                (无限免费)

每月费用：$0
访问途径：WhatsApp, Telegram, Slack, Discord, iMessage, Signal...
```

---

## 📖 服务商配置

### 🔐 订阅制服务商

#### Claude Code (Pro/Max)

```bash
Dashboard → Providers → Connect Claude Code
→ OAuth login → Auto token refresh
→ 5-hour + weekly quota tracking

Models:
  cc/claude-opus-4-7
  cc/claude-sonnet-4-6
  cc/claude-haiku-4-5-20251001
```

**技巧：** 复杂任务用 Opus，追求速度用 Sonnet。OmniRoute 为每个模型单独追踪配额！

Claude 和 Claude Code 兼容路由对 Opus 和 Sonnet 模型保留 `max` 思考级别。Haiku 模型不接受 `max` 级别，OmniRoute 会在发送到上游之前将该请求降级为较高的思考预算。

#### OpenAI Codex (Plus/Pro)

```bash
Dashboard → Providers → Connect Codex
→ OAuth login (port 1455)
→ 5-hour + weekly reset

Models:
  cx/gpt-5.5
  cx/gpt-5.4
  cx/gpt-5.3-codex
  cx/gpt-5.3-codex-spark
```

#### GitHub Copilot

```bash
Dashboard → Providers → Connect GitHub
→ OAuth via GitHub
→ Monthly reset (1st of month)

Models:
  gh/gpt-5.5
  gh/gpt-5.4
  gh/claude-sonnet-4.6
  gh/claude-opus-4.7
  gh/gemini-3.1-pro-preview
```

### 💰 经济型服务商

#### GLM-4.7（每日重置，$0.6/1M）

1. 注册：[智谱 AI](https://open.bigmodel.cn)
2. 从 Coding Plan 获取 API Key
3. Dashboard → Add API Key：Provider: `glm`，API Key: `your-key`

**使用：** `glm/glm-4.7` — **技巧：** Coding Plan 提供 3 倍配额，仅需 1/7 成本！每日 10:00 重置。

#### MiniMax M2.1（5 小时重置，$0.20/1M）

1. 注册：[MiniMax](https://www.minimax.io)
2. 获取 API Key → Dashboard → Add API Key

**使用：** `minimax/MiniMax-M2.1` — **技巧：** 长上下文（1M Token）场景下最经济的选择！

#### Kimi K2（$9/月 固定费用）

1. 订阅：[月之暗面](https://platform.moonshot.ai)
2. 获取 API Key → Dashboard → Add API Key

**使用：** `kimi/kimi-k2.5` — **技巧：** 固定 $9/月享受 10M Token，相当于 $0.90/1M！

#### Baidu Qianfan / ERNIE

1. 注册：[百度智能云千帆](https://cloud.baidu.com/product/wenxinworkshop)
2. 创建千帆 API Key → Dashboard → Add API Key：Provider: `qianfan`

**使用：** `qianfan/ernie-5.1`、`qianfan/ernie-x1.1` 或其他千帆 OpenAI 兼容模型 ID。

### 🆓 免费服务商

无需认证的免费服务商在其服务商页面上有一个「No authentication required」开关。关闭该开关将禁用该服务商，从已配置/紧凑视图中移除，并从 `/v1/models` 中移除其模型。

#### Qoder（8 个免费模型）

```bash
Dashboard → Connect Qoder → OAuth login → Unlimited usage

Models: if/kimi-k2, if/qwen3-coder-plus, if/qwen3-max, if/qwen3-235b, if/deepseek-r1, if/deepseek-v3.2
```

#### Kiro（免费 Claude）

```bash
Dashboard → Connect Kiro → AWS Builder ID or Google/GitHub → ~50 credits/month

Models: kr/claude-sonnet-4.5, kr/claude-haiku-4.5
```

---

## 🎨 Combo

你可以在 **Dashboard → Combos** 中通过拖拽每张卡片的把手直接调整 Combo 卡片顺序。顺序存储在 SQLite 中，重新加载后恢复。

### 示例 1：最大化订阅 → 经济备用

```
Dashboard → Combos → Create New

Name: premium-coding
Models:
  1. cc/claude-opus-4-7 (Subscription primary)
  2. glm/glm-4.7 (Cheap backup, $0.6/1M)
  3. minimax/MiniMax-M2.7 (Cheapest fallback, $0.3/1M)

Use in CLI: premium-coding
```

### 示例 2：纯免费（零成本）

```
Name: free-combo
Models:
  1. if/kimi-k2 (unlimited)
  2. qw/coder-model (unlimited)

Cost: $0 forever!
```

---

## 🔧 CLI 集成

### Cursor IDE

```
Settings → Models → Advanced:
  OpenAI API Base URL: http://localhost:20128/v1
  OpenAI API Key: [from omniroute dashboard]
  Model: cc/claude-opus-4-7
```

### Claude Code

编辑 `~/.claude/settings.json`：

```json
{
  "env": {
    "ANTHROPIC_BASE_URL": "http://localhost:20128",
    "ANTHROPIC_AUTH_TOKEN": "your-omniroute-api-key"
  }
}
```

此处使用 Claude 兼容的根端点。不要在 `ANTHROPIC_BASE_URL` 后追加 `/v1`。

### Codex CLI

```bash
export OPENAI_BASE_URL="http://localhost:20128"
export OPENAI_API_KEY="your-omniroute-api-key"
codex "your prompt"
```

### OpenClaw

编辑 `~/.openclaw/openclaw.json`：

```json
{
  "agents": {
    "defaults": {
      "model": { "primary": "omniroute/if/kimi-k2" }
    }
  },
  "models": {
    "providers": {
      "omniroute": {
        "baseUrl": "http://localhost:20128/v1",
        "apiKey": "your-omniroute-api-key",
        "api": "openai-completions",
        "models": [{ "id": "if/kimi-k2", "name": "kimi-k2" }]
      }
    }
  }
}
```

**或使用 Dashboard：** CLI Tools → OpenClaw → Auto-config

### Cline / Continue / RooCode

```
Provider: OpenAI Compatible
Base URL: http://localhost:20128/v1
API Key: [from dashboard]
Model: cc/claude-opus-4-7
```

---

## 🚀 部署

### 全局 npm 安装（推荐）

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
```

CLI 自动从 `~/.omniroute/.env` 或 `./.env` 加载环境变量。

### 卸载

当你不再需要 OmniRoute 时，我们提供了两个快速脚本来干净地移除：

| 命令                      | 作用                                                             |
| ------------------------- | ---------------------------------------------------------------- |
| `npm run uninstall`       | 移除系统应用，但**保留 `~/.omniroute` 中的数据库和配置**         |
| `npm run uninstall:full`  | 移除应用并**永久删除���有配置、密钥和数据库**                     |

> 注意：运行这些命令需要进入 OmniRoute 项目目录（如果你 clone 了项目）。如果全局安装，直接运行 `npm uninstall -g omniroute` 即可。

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

### PM2 部署（低内存）

对于内存有限的服务器，可使用内存限制选项：

```bash
# With 512MB limit (default)
pm2 start npm --name omniroute -- start

# Or with custom memory limit
OMNIROUTE_MEMORY_MB=512 pm2 start npm --name omniroute -- start

# Or using ecosystem.config.js
pm2 start ecosystem.config.js
```

创建 `ecosystem.config.js`：

```javascript
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
```

### Docker

```bash
# Build image (default = runner-cli with codex/claude/droid preinstalled)
docker build -t omniroute:cli .

# Portable mode (recommended)
docker run -d --name omniroute -p 20128:20128 --env-file ./.env -v omniroute-data:/app/data omniroute:cli
```

关于集成了 CLI 二进制文件的主机集成模式，请参阅主文档中的 Docker 章节。

### Void Linux (xbps-src)

Void Linux 用户可使用 `xbps-src` 交叉编译框架原生打包安装 OmniRoute。这种方式可自动化完成 Node.js 独立构建及所需的 `better-sqlite3` 原生绑定。

<details>
<summary><b>查看 xbps-src 模板</b></summary>

```bash
# Template file for 'omniroute'
pkgname=omniroute
version=3.8.0
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

do_build() {
	# Determine target CPU arch for node-gyp
	local _gyp_arch
	case "$XBPS_TARGET_MACHINE" in
		aarch64*) _gyp_arch=arm64 ;;
		armv7*|armv6*) _gyp_arch=arm ;;
		i686*) _gyp_arch=ia32 ;;
		*) _gyp_arch=x64 ;;
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
```

</details>

### 环境变量

| 变量                                    | 默认值                               | 说明                                                                                |
| --------------------------------------- | ------------------------------------ | ----------------------------------------------------------------------------------- |
| `JWT_SECRET`                            | `omniroute-default-secret-change-me` | JWT 签名密钥（**生产环境必须修改**）                                                |
| `INITIAL_PASSWORD`                      | `CHANGEME`                           | 首次登录密码                                                                        |
| `DATA_DIR`                              | `~/.omniroute`                       | 数据目录（数据库、用量、日志）                                                      |
| `PORT`                                  | 框架默认                             | 服务端口（示例中使用 `20128`）                                                      |
| `HOSTNAME`                              | 框架默认                             | 绑定主机（Docker 默认为 `0.0.0.0`）                                                 |
| `NODE_ENV`                              | 运行时默认                           | 部署时设为 `production`                                                             |
| `NEXT_PUBLIC_BASE_URL`                  | `http://localhost:20128`             | 面向前端和服务器公开的基础 URL（替代旧版 `BASE_URL`）                                |
| `NEXT_PUBLIC_CLOUD_URL`                 | `https://omniroute.dev`              | Cloud Sync 端点基础 URL（替代旧版 `CLOUD_URL`）                                      |
| `API_KEY_SECRET`                        | `endpoint-proxy-api-key-secret`      | 生成 API Key 的 HMAC 密钥                                                            |
| `REQUIRE_API_KEY`                       | `false`                              | 对 `/v1/*` 强制使用 Bearer API Key                                                   |
| `ALLOW_API_KEY_REVEAL`                  | `false`                              | 允许已认证的 Dashboard 用户按需显示完整 API Key 值                                   |
| `PROVIDER_LIMITS_SYNC_INTERVAL_MINUTES` | `70`                                 | 缓存的 Provider Limits 数据服务端刷新周期；UI 刷新按钮仍可触发手动同步              |
| `DISABLE_SQLITE_AUTO_BACKUP`            | `false`                              | 禁用在写入/导入/恢复前的自动 SQLite 快照；手动备份仍可使用                          |
| `APP_LOG_TO_FILE`                       | `true`                               | 启用应用和审计日志写入磁盘                                                          |
| `AUTH_COOKIE_SECURE`                    | `false`                              | 强制 `Secure` auth Cookie（在 HTTPS 反向代理之后）                                  |
| `CLOUDFLARED_BIN`                       | 未设置                               | 使用已有的 `cloudflared` 二进制文件，而非托管下载                                    |
| `CLOUDFLARED_PROTOCOL`                  | `http2`                              | 托管 Quick Tunnel 的传输协议（`http2`、`quic` 或 `auto`）                            |
| `OMNIROUTE_MEMORY_MB`                   | `512`                                | Node.js 堆内存上限（MB）                                                             |
| `PROMPT_CACHE_MAX_SIZE`                 | `50`                                 | 提示缓存条目上限                                                                    |
| `SEMANTIC_CACHE_MAX_SIZE`               | `100`                                | 语义缓存条目上限                                                                    |

完整环境变量参考见 [README](../README.md)。

---

## 📊 可用模型

<details>
<summary><b>查看所有可用模型</b></summary>

> 以下列表基于 v3.8.0 的 `open-sse/config/providerRegistry.ts` 整理。云服务目录（Gemini、OpenRouter 等）会动态同步 — 完整实时目录请打开 **Dashboard → Providers → [provider] → Available Models** 或调用 `GET /api/models/catalog`。

**Claude Code (`cc/`)** — Pro/Max OAuth: `cc/claude-opus-4-8`, `cc/claude-opus-4-7`, `cc/claude-opus-4-6`, `cc/claude-opus-4-5-20251101`, `cc/claude-sonnet-4-6`, `cc/claude-sonnet-4-5-20250929`, `cc/claude-haiku-4-5-20251001`

**Codex (`cx/`)** — Plus/Pro OAuth: `cx/gpt-5.5`（+ 级别：`gpt-5.5-xhigh`、`gpt-5.5-high`、`gpt-5.5-medium`、`gpt-5.5-low`）、`cx/gpt-5.4`、`cx/gpt-5.4-mini`、`cx/gpt-5.3-codex`、`cx/gpt-5.3-codex-spark`

**GitHub Copilot (`gh/`)** — OAuth: `gh/gpt-5.5`, `gh/gpt-5.4`, `gh/gpt-5.4-mini`, `gh/gpt-5-mini`, `gh/gpt-5.3-codex`, `gh/claude-opus-4.7`, `gh/claude-opus-4.6`, `gh/claude-opus-4-5-20251101`, `gh/claude-sonnet-4.6`, `gh/claude-sonnet-4.5`, `gh/claude-haiku-4.5`, `gh/gemini-3.1-pro-preview`, `gh/gemini-3-flash-preview`, `gh/oswe-vscode-prime`

**Kiro (`kr/`)** — FREE OAuth: `kr/auto-kiro`, `kr/claude-opus-4.7`, `kr/claude-opus-4.6`, `kr/claude-sonnet-4.6`, `kr/claude-sonnet-4.5`, `kr/claude-haiku-4.5`, `kr/deepseek-3.2`, `kr/minimax-m2.5`, `kr/minimax-m2.1`, `kr/glm-5`, `kr/qwen3-coder-next`

**Qoder (`if/`)** — FREE OAuth: `if/kimi-k2-0905`, `if/kimi-k2`, `if/qwen3-coder-plus`, `if/qwen3-max`, `if/qwen3-max-preview`, `if/qwen3-vl-plus`, `if/qwen3-32b`, `if/qwen3-235b-a22b-thinking-2507`, `if/qwen3-235b-a22b-instruct`, `if/qwen3-235b`, `if/deepseek-v3.2`, `if/deepseek-v3`, `if/deepseek-r1`, `if/qoder-rome-30ba3b`

**Qwen (`qw/`)** — FREE OAuth (chat.qwen.ai): `qw/coder-model`, `qw/vision-model`

**GLM (`glm/`、`glm-cn/`、`zai/`、`glmt/`)** — $0.2–0.6/1M: `glm/glm-5.1`, `glm/glm-5`, `glm/glm-5-turbo`, `glm/glm-4.7`, `glm/glm-4.7-flash`, `glm/glm-4.6`, `glm/glm-4.6v`, `glm/glm-4.5`, `glm/glm-4.5v`, `glm/glm-4.5-air`

**MiniMax (`minimax/`、`minimax-cn/`)** — $0.2/1M: `minimax/MiniMax-M2.7`, `minimax/MiniMax-M2.7-highspeed`, `minimax/MiniMax-M2.5`, `minimax/MiniMax-M2.5-highspeed`

**Kimi (`kimi/`、`kimi-coding/`、`kimi-coding-apikey/`)** — $9/月 固定或按量: `kimi/kimi-k2.6`, `kimi/kimi-k2.5`

**DeepSeek (`ds/`)** — API key: `ds/deepseek-v4-pro`, `ds/deepseek-v4-flash`

**Groq (`groq/`)** — 超高速: `groq/llama-3.3-70b-versatile`, `groq/meta-llama/llama-4-maverick-17b-128e-instruct`, `groq/qwen/qwen3-32b`, `groq/openai/gpt-oss-120b`

**xAI (`xai/`)** — Grok 原生: `xai/grok-4.3`, `xai/grok-4.20-multi-agent-0309`, `xai/grok-4.20-0309-reasoning`, `xai/grok-4.20-0309-non-reasoning`

**Mistral (`mistral/`)** — 欧盟托管: `mistral/mistral-large-latest`, `mistral/mistral-medium-3-5`, `mistral/mistral-small-latest`, `mistral/devstral-latest`, `mistral/codestral-latest`

**Perplexity (`pplx/`)** — 搜索增强: `pplx/sonar-deep-research`, `pplx/sonar-reasoning-pro`, `pplx/sonar-pro`, `pplx/sonar`

**Together AI (`together/`)** — 开源: `together/meta-llama/Llama-3.3-70B-Instruct-Turbo-Free` (free), `together/meta-llama/Llama-Vision-Free`, `together/deepseek-ai/DeepSeek-R1-Distill-Llama-70B-Free`, `together/deepseek-ai/DeepSeek-R1`, `together/Qwen/Qwen3-235B-A22B`, `together/meta-llama/Llama-4-Maverick-17B-128E-Instruct-FP8`

**Fireworks AI (`fireworks/`)** — 快速推理: `fireworks/accounts/fireworks/models/kimi-k2p6`, `fireworks/accounts/fireworks/models/minimax-m2p7`, `fireworks/accounts/fireworks/models/qwen3p6-plus`, `fireworks/accounts/fireworks/models/glm-5p1`, `fireworks/accounts/fireworks/models/deepseek-v4-pro`

**Cerebras (`cerebras/`)** — 晶圆级: `cerebras/zai-glm-4.7`, `cerebras/gpt-oss-120b`

**Cohere (`cohere/`)** — RAG 导向: `cohere/command-a-reasoning-08-2025`, `cohere/command-a-vision-07-2025`, `cohere/command-a-03-2025`, `cohere/command-r-08-2024`

**NVIDIA NIM (`nvidia/`)** — 企业级: `nvidia/z-ai/glm-5.1`, `nvidia/minimaxai/minimax-m2.7`, `nvidia/google/gemma-4-31b-it`, `nvidia/mistralai/mistral-small-4-119b-2603`, `nvidia/mistralai/mistral-large-3-675b-instruct-2512`, `nvidia/qwen/qwen3.5-397b-a17b`, `nvidia/deepseek-ai/deepseek-v4-pro`, `nvidia/openai/gpt-oss-120b`, `nvidia/nvidia/nemotron-3-super-120b-a12b`

**Baidu Qianfan (`qianfan/`)** — ERNIE: `qianfan/ernie-5.1`, `qianfan/ernie-5.0-thinking-latest`, `qianfan/ernie-x1.1`

**Ollama Cloud (`ollama-cloud/`)**: `ollama-cloud/deepseek-v4-pro`, `ollama-cloud/deepseek-v4-flash`, `ollama-cloud/kimi-k2.6`, `ollama-cloud/glm-5.1`, `ollama-cloud/minimax-m2.7`, `ollama-cloud/gemma4:31b`, `ollama-cloud/qwen3.5:397b`

**Gemini (Google Cloud `gemini/`)**: 按 API Key 从 Google 实时同步 — 无静态列表。在 **Dashboard → Providers** 中连接 Key，然后使用 **Available Models** 导入当前目录（例如 `gemini/gemini-3-pro`、`gemini/gemini-3-flash`）。

**其他兼容服务商**（精选）: `cohere`, `databricks`, `snowflake`, `together`, `vertex`, `alibaba`, `alibaba-cn`, `bedrock` (via `aws-bedrock`), `azure-ai`, `openrouter`（透传目录）, `siliconflow`, `hyperbolic`, `huggingface`, `featherless-ai`, `cloudflare-ai`, `scaleway`, `deepinfra`, `vercel-ai-gateway`, `bazaarlink`, `friendliai`, `nous-research`, `reka`, `volcengine`, `ai21`, `gigachat`。每个服务商在 `providerRegistry.ts` 中维护各自的模型列表，当服务商暴露 `/models` 端点时可自动同步。

**模型 ID 说明：** OmniRoute 使用服务商原生的 ID（`claude-opus-4-8`、`gpt-5.5`、`glm-5.1`、`MiniMax-M2.7`、`kimi-k2.5`、`grok-4.20-0309-reasoning`）。部分 ID 带有带点版本号，这是因为上游 API 要求如此。如果某模型未在上方列出，运行 `omniroute models --search <term>` 或调用 `GET /api/models/catalog` 确认可用性。

</details>

---

## 🧩 高级功能

### 自定义模型

添加任意模型 ID 到任意服务商，无需等待应用更新：

```bash
# Via API
curl -X POST http://localhost:20128/api/provider-models \
  -H "Content-Type: application/json" \
  -d '{"provider": "openai", "modelId": "gpt-5.2", "modelName": "GPT-5.2"}'

# List: curl http://localhost:20128/api/provider-models?provider=openai
# Remove: curl -X DELETE "http://localhost:20128/api/provider-models?provider=openai&model=gpt-5.2"
```

或使用 Dashboard：**Providers → [Provider] → Custom Models**。

注意事项：

- OpenRouter 和 OpenAI/Anthropic 兼容服务商仅通过 **Available Models** 管理。手动添加、导入和自动同步都汇总到同一个可用模型列表，因此这些服务商不显示单独的 Custom Models 区域。
- **Custom Models** 区域适用于不暴露托管模型导入功能的服务商。

### 专用服务商路由

将请求直接路由到特定服务商，并附带模型校验：

```bash
POST http://localhost:20128/v1/providers/openai/chat/completions
POST http://localhost:20128/v1/providers/openai/embeddings
POST http://localhost:20128/v1/providers/fireworks/images/generations
```

服务商前缀在缺失时自动添加。模型不匹配返回 `400`。

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

**优先级：** Key 级 → Combo 级 → 服务商级 → 全局 → 环境变量。

### 模型目录 API

```bash
curl http://localhost:20128/api/models/catalog
```

按服务商分组返回模型，并标注类型（`chat`、`embedding`、`image`）。

### Cloud Sync

- 跨设备同步服务商、Combo 和设置
- 自动后台同步，带超时和快速失败机制
- 生产环境建议使用服务端 `NEXT_PUBLIC_BASE_URL`/`NEXT_PUBLIC_CLOUD_URL`

### Cloudflare Quick Tunnel

- 在 Docker 和其他自托管部署中，前往 **Dashboard → Endpoints** 使用
- 创建一个临时的 `https://*.trycloudflare.com` URL，将流量转发到当前的 OpenAI 兼容 `/v1` 端点
- 首次启用时按需安装 `cloudflared`；后续重启复用同一托管二进制文件
- Quick Tunnel 在 OmniRoute 或容器重启后不会自动恢复；需要时从 Dashboard 重新启用
- Tunnel URL 是临时的，每次停止/启动 Tunnel 都会变化
- 托管 Quick Tunnel 默认使用 HTTP/2 传输，以避免在受限容器中产生 QUIC UDP 缓冲区噪音
- 如需覆盖托管传输选择，设置 `CLOUDFLARED_PROTOCOL=quic` 或 `auto`
- 如需使用预装的 `cloudflared` 二进制文件而非托管下载，设置 `CLOUDFLARED_BIN`
- Cloudflare Quick Tunnel、Tailscale Funnel 和 ngrok Tunnel 面板可在 **Settings → Appearance** 中显示或隐藏。隐藏面板不会停止正在运行的 Tunnel。

### LLM 网关智能（Phase 9）

- **语义缓存** — 自动缓存非流式、temperature=0 的响应（通过 `X-OmniRoute-No-Cache: true` 绕过）
- **请求幂等** — 通过 `Idempotency-Key` 或 `X-Request-Id` 头在 5 秒内对请求去重
- **进度追踪** — 通过 `X-OmniRoute-Progress: true` 头选择加入 SSE `event: progress` 事件

---

### 翻译器实验场

通过 **Dashboard → Translator** 访问。调试和可视化 OmniRoute 如何在服务商之间转换 API 请求。

| 模式             | 用途                                                                      |
| ---------------- | ------------------------------------------------------------------------- |
| **Playground**   | 选择源/目标格式，粘贴请求，即时查看翻译后的输出                            |
| **Chat Tester**  | 通过代理发送实时聊天消息，并检查完整的请求/响应周期                        |
| **Test Bench**   | 跨多个格式组合运行批量测试，验证翻译正确性                                  |
| **Live Monitor** | 实时观察请求流经代理时的翻译过程                                            |

**用途：**

- 调试特定客户端/服务商组合失败的原因
- 验证 thinking 标签、工具调用和系统提示翻译是否正确
- 对比 OpenAI、Claude、Gemini 和 Responses API 格式之间的差异

---

### 路由策略

通过 **Dashboard → Settings → Routing** 配置。Dashboard 展示六种最常用的策略；Combo 和自动路由器内部支持更多策略。

**Dashboard 可见策略（账户级路由）：**

| 策略                            | 说明                                                       |
| ------------------------------- | ---------------------------------------------------------- |
| **Fill First**                  | 按优先级顺序使用账户 — 主账户处理所有请求，直到不可用      |
| **Round Robin**                 | 循环遍历所有账户，可配置粘性限制（默认：每账户 3 次调用）  |
| **P2C (Power of Two Choices)**  | 随机选择 2 个账户，路由到更健康的那个 — 兼顾负载与健康感知 |
| **Random**                      | 使用 Fisher-Yates 洗牌为每次请求随机选择账户                |
| **Least Used**                  | 路由到 `lastUsedAt` 时间戳最早的账户，均匀分配流量          |
| **Cost Optimized**              | 路由到优先级值最低的账户，优先选择成本最低的服务商          |

**高级 Combo 和自动策略**（可按 Combo 配置或通过 `auto/*` 前缀 — 详见 [AUTO-COMBO.md](../routing/AUTO-COMBO.md)）：

- `priority` — 严格顺序，不轮询
- `weighted` — 按模型权重分配流量比例
- `fill-first` — 将第一个模型用至限制后才切换
- `round-robin` / `strict-random` / `random`
- `p2c` (Power of Two Choices)
- `least-used` 和 `cost-optimized`
- `auto` — 在所有候选中按得分驱动
- `lkgp` (Last Known Good Provider) — 每次会话固定使用上一次成功的模型
- `context-optimized` — 选择可用上下文窗口最大的模型
- `context-relay` — 串联长上下文模型用于后续轮次

#### 外部粘性会话头

对于外部会话亲和性（例如反向代理后的 Claude Code/Codex 代理），发送：

```http
X-Session-Id: your-session-key
```

OmniRoute 也接受 `x_session_id`，并在 `X-OmniRoute-Session-Id` 中返回生效的会话 Key。

如果你使用 Nginx 发送下划线形式的头，启用：

```nginx
underscores_in_headers on;
```

#### 通配符模型别名

创建通配符模式来重新映射模型名称：

```
Pattern: claude-sonnet-*     →  Target: cc/claude-sonnet-4-6
Pattern: gpt-*               →  Target: gh/gpt-5.3-codex
```

通配符支持 `*`（任意字符）和 `?`（单个字符）。

#### 容灾链

定义应用于所有请求的全局容灾链：

```
Chain: production-fallback
  1. cc/claude-opus-4-7
  2. gh/gpt-5.3-codex
  3. glm/glm-4.7
```

---

### 容灾与熔断器

通过 **Dashboard → Settings → Resilience** 配置。

OmniRoute 通过五个组件实现服务商级容灾：

1. **请求队列与限流** — 系统级请求整形：
   - **每分钟请求数 (RPM)** — 每个账户每分钟最大请求数
   - **请求最小间隔** — 请求之间的最小间隔（毫秒）
   - **最大并发请求数** — 每个账户同时处理的最大请求数

2. **连接冷却** — 在发生可重试故障后，对单条连接按认证类型配置：
   - **基础冷却** — 可重试上游故障后的默认冷却窗口
   - **使用上游重试提示** — 当上游提供 `Retry-After` 或重置提示时予以遵循
   - **最大退避步数** — 重复故障时的最大指数退避级别

3. **服务商熔断器** — 追踪端到端服务商故障，在达到配置的警告阈值时将服务商标记为降级，在达到配置的故障阈值时断开熔断器：
   - **降级阈值** — 服务商进入 `DEGRADED` 状态前的连续故障数
   - **故障阈值** — 服务商进入 `OPEN` 状态前的连续故障数
   - **重置超时** — 重新测试服务商之前的时间窗口
   - **CLOSED**（健康）— 请求正常流通
   - **DEGRADED** — 请求继续流通，同时追踪升高的故障率
   - **OPEN** — 服务商在重复故障后被暂时阻断
   - **HALF_OPEN** — 测试服务商是否已恢复

   连接级 `429` 速率限制仅计入**连接冷却**，不计入服务商熔断器。

   服务商熔断器运行时状态仅在 **Dashboard → Health** 上显示。

4. **等待冷却** — 如果所有候选连接都已在冷却中，OmniRoute 可以等待最早完成的冷却，然后自动重试同一个客户端请求。

5. **速率限制自动检测** — 当上游服务商返回明确的等待窗口时，如果该设置已启用，这些提示会覆盖本地连接冷却。

**技巧：** 在发生故障后，使用 **Health** 页面检查和重置实时的服务商熔断器。Resilience 页面仅用于修改配置。

---

### 数据库导出/导入

在 **Dashboard → Settings → System & Storage** 中管理数据库备份。

| 操作                      | 说明                                                                                          |
| ------------------------- | --------------------------------------------------------------------------------------------- |
| **导出数据库**            | 下载当前 SQLite 数据库为 `.sqlite` 文件                                                       |
| **全部导出 (.tar.gz)**    | 下载完整备份归档，包含：数据库、设置、Combo、服务商连接（不含凭据）、API Key 元数据           |
| **导入数据库**            | 上传 `.sqlite` 文件以替换当前数据库。导入前会自动创建备份，除非设置 `DISABLE_SQLITE_AUTO_BACKUP=true` |

```bash
# API: Export database
curl -o backup.sqlite http://localhost:20128/api/db-backups/export

# API: Export all (full archive)
curl -o backup.tar.gz http://localhost:20128/api/db-backups/exportAll

# API: Import database
curl -X POST http://localhost:20128/api/db-backups/import \
  -F "file=@backup.sqlite"
```

**导入验证：** 导入的文件需通过完整性校验（SQLite pragma 检查）、必要表检查（`provider_connections`、`provider_nodes`、`combos`、`api_keys`）和大小限制（最大 100MB）。

**用途：**

- 在机器之间迁移 OmniRoute
- 为灾难恢复创建外部备份
- 在团队成员之间共享配置（全部导出 → 分享归档）

---

### 设置面板

设置页面分为 **7 个标签页**，方便导航：

| 标签页           | 内容                                                                                              |
| ---------------- | ------------------------------------------------------------------------------------------------- |
| **General**      | 系统存储工具、默认行为、Endpoint 隧道可见性                                                        |
| **Appearance**   | 主题控制（浅色/深色/系统）、侧边栏可见性、Cloudflare/Tailscale/ngrok 隧道卡片的面板开关           |
| **AI**           | 思考预算配置、全局系统提示注入、提示缓存统计                                                       |
| **Security**     | 登录/密码设置、IP 访问控制、`/models` 的 API 认证、服务商屏蔽、提示注入安全护栏                    |
| **Routing**      | 全局路由策略、通配符模型别名、容灾链、Combo 默认值                                                 |
| **Resilience**   | 请求队列、连接冷却、服务商熔断器配置及等待冷却行为                                                 |
| **Advanced**     | 全局代理配置（HTTP/SOCKS5）、按服务商的代理覆盖                                                    |

General 标签页不再重复显示只读的日志和缓存说明。数据库保留和优化设置通过 `/api/settings/database` 持久化；手动清除缓存使用 `DELETE /api/cache`。请求和代理日志行数上限由 `CALL_LOGS_TABLE_MAX_ROWS` 和 `PROXY_LOGS_TABLE_MAX_ROWS` 控制。

---

### 费用与预算管理

通过 **Dashboard → Costs** 访问。

| 标签页       | 用途                                                            |
| ------------ | --------------------------------------------------------------- |
| **Budget**   | 为每个 API Key 设置日/周/月预算上限，实时追踪消费               |
| **Pricing**  | 查看和编辑模型定价条目 — 各服务商每 1K 输入/输出 Token 的费用   |

```bash
# API: Set a budget
curl -X POST http://localhost:20128/api/usage/budget \
  -H "Content-Type: application/json" \
  -d '{"keyId": "key-123", "limit": 50.00, "period": "monthly"}'

# API: Get current budget status
curl http://localhost:20128/api/usage/budget
```

**费用追踪：** 每次请求记录 Token 用量并使用定价表计算费用。在 **Dashboard → Usage** 中按服务商、模型和 API Key 查看明细。

---

### 音频转录

OmniRoute 通过 OpenAI 兼容端点支持音频转录：

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

**语音转文字（转录）** 服务商：

- `openai/` (whisper-compatible)
- `groq/` (Groq Whisper Turbo)
- `deepgram/` (Nova family)
- `assemblyai/`
- `nvidia/` (Parakeet, Canary)
- `huggingface/` (whisper variants)
- `qwen/`

**文字转语音 (`POST /v1/audio/speech`)** 服务商：

- `openai/` (tts-1, tts-1-hd)
- `hyperbolic/`
- `deepgram/` (Aura)
- `nvidia/` (Magpie TTS)
- `elevenlabs/`
- `huggingface/`
- `inworld/`
- `cartesia/`
- `playht/`
- `kie/`
- `aws-polly/`
- `xiaomi-mimo/`
- `coqui/`, `tortoise/`
- `qwen/`

转录支持的音频格式：`mp3`、`wav`、`m4a`、`flac`、`ogg`、`webm`。TTS 输出格式取决于服务商（mp3、wav、opus、pcm、mulaw）。

---

### Combo 负载均衡策略

在 **Dashboard → Combos → Create/Edit → Strategy** 中按 Combo 配置负载均衡。

| 策略               | 说明                                             |
| ------------------ | ------------------------------------------------ |
| **Round-Robin**    | 按顺序轮询模型                                   |
| **Priority**       | 始终先尝试第一个模型，仅在出错时容灾切换         |
| **Random**         | 每次请求从 Combo 中随机选择一个模型              |
| **Weighted**       | 按每个模型分配的权重比例路由                     |
| **Least-Used**     | 路由到最近请求最少的模型（使用 Combo 指标）      |
| **Cost-Optimized** | 路由到当前可用的最廉价模型（使用定价表）         |

全局 Combo 默认值可在 **Dashboard → Settings → Routing → Combo Defaults** 中设置。
Combo 目标超时默认继承当前请求超时。仅在需要更短的按目标限制以触发更快容灾切换时，才在 Combo 默认值或单个 Combo 上使用 **Target timeout (seconds)**。

零延时 Combo 优化是可选功能。保持 **Zero-latency optimizations** 禁用可避免这些延时特性竞跑容灾目标、基于 TTFT 历史跳过目标或压缩容灾请求；启用后允许配置的对冲、预测性 TTFT 跳过和主动容灾压缩，以路由/请求的保真度换取更低的尾部延时。

当上游服务商要求严格的 `max_tokens`/`maxOutputTokens` 限制时，禁用 **Reasoning token buffer**。启用后，Combo 路由仅对已知输出上限的模型添加推理模型 Headroom，当安全的缓冲值超出客户端 Token 限制时保持其不变。如果客户端限制已高于已知上限，OmniRoute 在发送上游请求前会将其限制到该上限。

---

### 健康面板

通过 **Dashboard → Health** 访问。实时系统健康概览，包含 6 张卡片：

| 卡片                  | 显示内容                                 |
| --------------------- | ---------------------------------------- |
| **System Status**     | 运行时间、版本、内存用量、数据目录       |
| **Provider Health**   | 全局服务商熔断器运行时状态               |
| **Rate Limits**       | 每账户活跃的连接冷却及剩余时间           |
| **Active Lockouts**   | 活跃的模型级封锁和临时排除               |
| **Signature Cache**   | 去重缓存统计（活跃 Key、命中率）         |
| **Latency Telemetry** | 各服务商的 p50/p95/p99 延时聚合          |

**技巧：** Health 页面每 10 秒自动刷新。使用熔断器卡片识别哪些服务商正在发生问题。

---

## 🤖 自动路由（零配置）

OmniRoute 内置了一个**得分驱动的自动路由器**，可跨所有已连接的服务商为每个请求选择最佳模型 — 无需维护 Combo。只需使用 `auto/*` 前缀发送请求，OmniRoute 即可即时构建虚拟 Combo，按延时、费用、成功率、上下文适配度、任务匹配度、近期故障、配额和熔断器状态对候选模型进行评分。

| 前缀           | 优化目标                                                                   |
| -------------- | -------------------------------------------------------------------------- |
| `auto`         | 均衡默认值（延时 × 费用 × 成功率）                                         |
| `auto/coding`  | 编码任务：优先 Claude、GPT-5、GLM、Kimi、Qwen Coder、DeepSeek 编码模型     |
| `auto/cheap`   | 最低 $/Token，接受较高延时                                                  |
| `auto/fast`    | 最低延时，忽略费用                                                         |
| `auto/offline` | 仅本地服务商（Ollama、vLLM、llama.cpp）— 适用于离线环境                    |
| `auto/smart`   | 推理质量优先（Opus、GPT-5 xhigh、R1、GLM 5.1 reasoning）                   |
| `auto/lkgp`    | "最后已知成功服务商" — 粘性路由到最近一次成功的目标                        |

示例：

```bash
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Authorization: Bearer $OMNIROUTE_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "auto/coding",
    "messages": [{ "role": "user", "content": "Refactor this Python function" }],
    "stream": true
  }'
```

自动路由器的完整说明见 [AUTO-COMBO.md](../routing/AUTO-COMBO.md) — 包括如何调整评分权重、屏蔽服务商，以及通过 **Dashboard → Auto Combo** 检查路由决策。

---

## 🔌 MCP 与 A2A 集成

OmniRoute 同时是一个 **MCP 服务端**（Model Context Protocol）和一个 **A2A 服务端**（Agent-to-Agent JSON-RPC 2.0）。任何兼容 MCP 的 IDE 或代理主机都可以直接调用 OmniRoute 工具 — 无需额外包装。

### MCP 传输方式

- **SSE**: `http://localhost:20128/api/mcp/sse`
- **Streamable HTTP**: `http://localhost:20128/api/mcp/stream`
- **stdio**: `omniroute --mcp`（适用于偏好 stdio 的 IDE 插件）

### 连接 Claude Desktop

编辑 `~/Library/Application Support/Claude/claude_desktop_config.json`（macOS）或 Windows/Linux 的对应路径：

```json
{
  "mcpServers": {
    "omniroute": {
      "command": "omniroute",
      "args": ["--mcp"]
    }
  }
}
```

### 连接 Cursor / Continue / VS Code MCP

使用 SSE URL `http://localhost:20128/api/mcp/sse` 和在 **Dashboard → API Keys** 中生成的 Bearer API Key。

### 权限域

MCP 工具分为 10 个权限域：`analytics`、`auth`、`billing`、`combos`、`health`、`keys`、`memory`、`models`、`providers`、`system`。每个 Bearer Key 可限制到特定权限域 — 完整工具目录见 [MCP-SERVER.md](../frameworks/MCP-SERVER.md)，JSON-RPC Schema 见 [A2A-SERVER.md](../frameworks/A2A-SERVER.md)。

---

## 🧠 技能系统

OmniRoute 暴露一个可扩展的**技能框架** (`src/lib/skills/`)，使代理和 A2A 端点可以运行领域特定的例程（如 `code-review`、`summarize`、`extract-facts`、`web-research`）。

- **市场 UI** — 通过 **Dashboard → Skills** 浏览和安装技能
- **按 Key 的权限域** — 限制哪些 API Key 可调用哪些技能
- **自定义技能** — 将 TypeScript 文件放入 `src/lib/a2a/skills/`，注册后即可通过 A2A 立即调用

完整参考：[SKILLS.md](../frameworks/SKILLS.md)。

---

## 💾 记忆系统

OmniRoute 通过混合检索持久化**长期对话记忆**：

- **SQLite FTS5** 用于对历史轮次进行关键词搜索
- **Qdrant 向量存储**（可选）用于语义召回
- **自动事实提取** — 每次会话后汇总实体、偏好和决策，存入 `memory_facts` 表
- 记忆按 API Key 和会话进行隔离

通过 **Dashboard → Memory** 管理记忆（搜索、编辑、导出、清除）。HTTP 接口 (`/api/memory/*`) 允许代理以编程方式推送和查询事实 — 详见 [MEMORY.md](../frameworks/MEMORY.md)。

---

## 🔔 Webhook

订阅 OmniRoute 事件，实现实时监控和自动化。

- 在 **Dashboard → Webhooks** 中创建 Webhook，配置目标 URL 和 HMAC 签名密钥
- 可用事件：`request.completed`、`request.failed`、`provider.unavailable`、`budget.exceeded`、`combo.switched`、`circuit_breaker.opened`、`circuit_breaker.closed`
- 每个载荷包含 `X-OmniRoute-Signature`（HMAC-SHA256）供验证
- 重试：3 次尝试，指数退避，然后进入死信队列

完整 Schema 见 [WEBHOOKS.md](../frameworks/WEBHOOKS.md)。

---

## ☁️ 云代理

OmniRoute 集成了云编程代理（**OpenAI Codex Cloud**、**Devin**、**Jules**、**Antigravity**），使你能够在处理本地路由的同一 Dashboard 中派发长时间运行的任务。

- 在 **Dashboard → Cloud Agents** 中创建任务，或通过 `POST /api/v1/agents/tasks`
- 按任务追踪状态、日志和产物
- 每个服务商使用自备 API Key — 凭据永不离开 OmniRoute 实例

完整参考：[CLOUD_AGENT.md](../frameworks/CLOUD_AGENT.md)。

---

## 🛠️ 编程式管理

你可以通过 HTTP，使用具有 `manage` 权限域的 **Bearer Key** 来管理 OmniRoute 的每一项资源（服务商、Combo、Key、设置）。

在 **Dashboard → API Keys → New Key → Scope: manage** 中生成 Key，然后：

```bash
# List providers
curl http://localhost:20128/api/providers \
  -H "Authorization: Bearer $OMNIROUTE_MANAGE_KEY"

# Add a provider connection
curl -X POST http://localhost:20128/api/providers \
  -H "Authorization: Bearer $OMNIROUTE_MANAGE_KEY" \
  -H "Content-Type: application/json" \
  -d '{ "provider": "openai", "apiKey": "sk-...", "name": "main" }'

# Create a combo
curl -X POST http://localhost:20128/api/combos \
  -H "Authorization: Bearer $OMNIROUTE_MANAGE_KEY" \
  -H "Content-Type: application/json" \
  -d '{ "name": "premium", "strategy": "priority", "models": [{ "model": "cc/claude-opus-4-7" }, { "model": "glm/glm-5.1" }] }'

# List/create API keys
curl http://localhost:20128/api/keys -H "Authorization: Bearer $OMNIROUTE_MANAGE_KEY"
curl -X POST http://localhost:20128/api/keys -H "Authorization: Bearer $OMNIROUTE_MANAGE_KEY" \
  -d '{ "name": "ci-bot", "scopes": ["chat"] }'
```

完整端点目录和请求/响应 Schema 见 [API_REFERENCE.md](../reference/API_REFERENCE.md)。

---

## 💻 内置 CLI

OmniRoute 内置了 CLI 工具（`omniroute …`），用于设置、诊断和运行时控制。这与 Dashboard 中的「CLI Tools」页面是**分开的**，后者用于配置第三方 CLI（Claude Code、Cursor、Codex、Cline 等）使之能够对接 OmniRoute。

```bash
omniroute setup                    # 交互式向导（密码、服务商、Combo）
omniroute setup --non-interactive  # 适合 CI 环境
omniroute doctor                   # 健康诊断（数据目录、数据库、服务商、端口）
omniroute providers available      # 列出支持的服务商
omniroute providers list           # 列出已配置的连接
omniroute providers test <id>      # 实时测试服务商连接
omniroute combos list              # 列出 Combo
omniroute combos switch <name>     # 设置默认 Combo
omniroute models                   # 列出可用模型（--json、--search）
omniroute keys add | list | remove # 从终端管理 API Key
omniroute backup                   # 快照配置 + 数据库
omniroute restore [<timestamp>]    # 从快照恢复
omniroute health                   # 详细健康信息（熔断器、缓存、内存）
omniroute quota                    # 服务商配额用量
omniroute mcp status               # MCP 服务端状态
omniroute a2a status               # A2A 服务端状态
omniroute tunnel list|create|stop  # Cloudflare/Tailscale/ngrok 隧道
omniroute reset-password           # 重置管理员密码
omniroute --mcp                    # 通过 stdio 启动 MCP 服务端
omniroute --port 3000              # 在自定义端口启动服务端
```

提示：将 `omniroute doctor --json` 与你的监控工具结合，用于对不健康的服务商连接发出告警。

---

## 🖥️ 桌面应用 (Electron)

OmniRoute 提供适用于 Windows、macOS 和 Linux 的原生桌面应用。

### 安装

```bash
# From the electron directory:
cd electron
npm install

# Development mode (connect to running Next.js dev server):
npm run dev

# Production mode (uses standalone build):
npm start
```

### 构建安装包

```bash
cd electron
npm run build          # 当前平台
npm run build:win      # Windows (.exe NSIS)
npm run build:mac      # macOS (.dmg universal)
npm run build:linux    # Linux (.AppImage)
```

输出 → `electron/dist-electron/`

### 核心特性

| 特性                          | 说明                                        |
| ----------------------------- | ------------------------------------------- |
| **Server Readiness**          | 显示窗口前轮询服务端（无白屏）              |
| **System Tray**               | 最小化到托盘，从托盘菜单切换端口、退出      |
| **Port Management**           | 从托盘切换服务端端口（自动重启服务端）      |
| **Content Security Policy**   | 通过会话头启用严格 CSP                      |
| **Single Instance**           | 同一时间只能运行一个应用实例                |
| **Offline Mode**              | 内置 Next.js 服务端，无需联网即可运行       |

### 环境变量

| 变量                  | 默认值   | 说明                        |
| --------------------- | -------- | --------------------------- |
| `OMNIROUTE_PORT`      | `20128`  | 服务端端口                  |
| `OMNIROUTE_MEMORY_MB` | `512`    | Node.js 堆内存上限（64–16384 MB） |

📖 完整文档：[`electron/README.md`](../../electron/README.md)
