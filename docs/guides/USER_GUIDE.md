---
title: "User Guide"
version: 3.8.0
lastUpdated: 2026-05-13
---

# User Guide

🌐 **Languages:** 🇺🇸 [English](./USER_GUIDE.md) | 🇧🇷 [Português (Brasil)](../i18n/pt-BR/docs/guides/USER_GUIDE.md) | 🇪🇸 [Español](../i18n/es/docs/guides/USER_GUIDE.md) | 🇫🇷 [Français](../i18n/fr/docs/guides/USER_GUIDE.md) | 🇮🇹 [Italiano](../i18n/it/docs/guides/USER_GUIDE.md) | 🇷🇺 [Русский](../i18n/ru/docs/guides/USER_GUIDE.md) | 🇨🇳 [中文 (简体)](../i18n/zh-CN/docs/guides/USER_GUIDE.md) | 🇩🇪 [Deutsch](../i18n/de/docs/guides/USER_GUIDE.md) | 🇮🇳 [हिन्दी](../i18n/in/docs/guides/USER_GUIDE.md) | 🇹🇭 [ไทย](../i18n/th/docs/guides/USER_GUIDE.md) | 🇺🇦 [Українська](../i18n/uk-UA/docs/guides/USER_GUIDE.md) | 🇸🇦 [العربية](../i18n/ar/docs/guides/USER_GUIDE.md) | 🇯🇵 [日本語](../i18n/ja/docs/guides/USER_GUIDE.md) | 🇻🇳 [Tiếng Việt](../i18n/vi/docs/guides/USER_GUIDE.md) | 🇧🇬 [Български](../i18n/bg/docs/guides/USER_GUIDE.md) | 🇩🇰 [Dansk](../i18n/da/docs/guides/USER_GUIDE.md) | 🇫🇮 [Suomi](../i18n/fi/docs/guides/USER_GUIDE.md) | 🇮🇱 [עברית](../i18n/he/docs/guides/USER_GUIDE.md) | 🇭🇺 [Magyar](../i18n/hu/docs/guides/USER_GUIDE.md) | 🇮🇩 [Bahasa Indonesia](../i18n/id/docs/guides/USER_GUIDE.md) | 🇰🇷 [한국어](../i18n/ko/docs/guides/USER_GUIDE.md) | 🇲🇾 [Bahasa Melayu](../i18n/ms/docs/guides/USER_GUIDE.md) | 🇳🇱 [Nederlands](../i18n/nl/docs/guides/USER_GUIDE.md) | 🇳🇴 [Norsk](../i18n/no/docs/guides/USER_GUIDE.md) | 🇵🇹 [Português (Portugal)](../i18n/pt/docs/guides/USER_GUIDE.md) | 🇷🇴 [Română](../i18n/ro/docs/guides/USER_GUIDE.md) | 🇵🇱 [Polski](../i18n/pl/docs/guides/USER_GUIDE.md) | 🇸🇰 [Slovenčina](../i18n/sk/docs/guides/USER_GUIDE.md) | 🇸🇪 [Svenska](../i18n/sv/docs/guides/USER_GUIDE.md) | 🇵🇭 [Filipino](../i18n/phi/docs/guides/USER_GUIDE.md) | 🇨🇿 [Čeština](../i18n/cs/docs/guides/USER_GUIDE.md)

Complete guide for configuring providers, creating combos, integrating CLI tools, and deploying OmniRoute.

---

## Table of Contents

- [Pricing at a Glance](#-pricing-at-a-glance)
- [Use Cases](#-use-cases)
- [Provider Setup](#-provider-setup)
- [CLI Integration](#-cli-integration)
- [Deployment](#-deployment)
- [Available Models](#-available-models)
- [Advanced Features](#-advanced-features)
- [Auto-Routing (Zero-config)](#-auto-routing-zero-config)
- [MCP & A2A Integration](#-mcp--a2a-integration)
- [Skills System](#-skills-system)
- [Memory System](#-memory-system)
- [Webhooks](#-webhooks)
- [Cloud Agents](#-cloud-agents)
- [Programmatic Management](#-programmatic-management)
- [Internal CLI](#-internal-cli)
- [Desktop Application (Electron)](#-desktop-application-electron)

---

## 💰 Pricing at a Glance

| Tier                | Provider          | Cost        | Quota Reset      | Best For             |
| ------------------- | ----------------- | ----------- | ---------------- | -------------------- |
| **💳 SUBSCRIPTION** | Claude Code (Pro) | $20/mo      | 5h + weekly      | Already subscribed   |
|                     | Codex (Plus/Pro)  | $20-200/mo  | 5h + weekly      | OpenAI users         |
|                     | Gemini CLI        | **FREE**    | 180K/mo + 1K/day | Everyone!            |
|                     | GitHub Copilot    | $10-19/mo   | Monthly          | GitHub users         |
| **🔑 API KEY**      | DeepSeek          | Pay per use | None             | Cheap reasoning      |
|                     | Groq              | Pay per use | None             | Ultra-fast inference |
|                     | xAI (Grok)        | Pay per use | None             | Grok 4 reasoning     |
|                     | Mistral           | Pay per use | None             | EU-hosted models     |
|                     | Perplexity        | Pay per use | None             | Search-augmented     |
|                     | Together AI       | Pay per use | None             | Open-source models   |
|                     | Fireworks AI      | Pay per use | None             | Fast FLUX images     |
|                     | Cerebras          | Pay per use | None             | Wafer-scale speed    |
|                     | Cohere            | Pay per use | None             | Command R+ RAG       |
|                     | NVIDIA NIM        | Pay per use | None             | Enterprise models    |
|                     | Baidu Qianfan     | Pay per use | None             | ERNIE models         |
| **💰 CHEAP**        | GLM-4.7           | $0.6/1M     | Daily 10AM       | Budget backup        |
|                     | MiniMax M2.1      | $0.2/1M     | 5-hour rolling   | Cheapest option      |
|                     | Kimi K2           | $9/mo flat  | 10M tokens/mo    | Predictable cost     |
| **🆓 FREE**         | Qoder             | $0          | Unlimited        | 8 models free        |
|                     | Qwen              | $0          | Unlimited        | 3 models free        |
|                     | Kiro              | $0          | Unlimited        | Claude free          |

**💡 Pro Tip:** Start with Gemini CLI (180K free/month) + Qoder (unlimited free) combo = $0 cost!

---

## 🎯 Use Cases

### Case 1: "I have Claude Pro subscription"

**Problem:** Quota expires unused, rate limits during heavy coding

```
Combo: "maximize-claude"
  1. cc/claude-opus-4-7        (use subscription fully)
  2. glm/glm-4.7               (cheap backup when quota out)
  3. if/kimi-k2       (free emergency fallback)

Monthly cost: $20 (subscription) + ~$5 (backup) = $25 total
vs. $20 + hitting limits = frustration
```

### Case 2: "I want zero cost"

**Problem:** Can't afford subscriptions, need reliable AI coding

```
Combo: "free-forever"
  1. gemini-cli/gemini-3-flash-preview  (180K free/month)
  2. if/kimi-k2       (unlimited free)
  3. qw/qwen3-coder-plus       (unlimited free)

Monthly cost: $0
Quality: Production-ready models
```

### Case 3: "I need 24/7 coding, no interruptions"

**Problem:** Deadlines, can't afford downtime

```
Combo: "always-on"
  1. cc/claude-opus-4-7        (best quality)
  2. cx/gpt-5.5                (second subscription)
  3. glm/glm-4.7               (cheap, resets daily)
  4. minimax/MiniMax-M2.1      (cheapest, 5h reset)
  5. if/kimi-k2       (free unlimited)

Result: 5 layers of fallback = zero downtime
Monthly cost: $20-200 (subscriptions) + $10-20 (backup)
```

### Case 4: "I want FREE AI in OpenClaw"

**Problem:** Need AI assistant in messaging apps, completely free

```
Combo: "openclaw-free"
  1. if/qwen3-coder-plus       (unlimited free)
  2. if/deepseek-r1            (unlimited free)
  3. if/kimi-k2                (unlimited free)

Monthly cost: $0
Access via: WhatsApp, Telegram, Slack, Discord, iMessage, Signal...
```

---

## 📖 Provider Setup

### 🔐 Subscription Providers

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

**Pro Tip:** Use Opus for complex tasks, Sonnet for speed. OmniRoute tracks quota per model!

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

#### Gemini CLI (FREE 180K/month!)

```bash
Dashboard → Providers → Connect Gemini CLI
→ Google OAuth
→ 180K completions/month + 1K/day

Models:
  gemini-cli/gemini-3.1-pro-preview
  gemini-cli/gemini-3-flash-preview
  gemini-cli/gemini-3.1-flash-lite-preview
```

**Best Value:** Huge free tier! Use this before paid tiers.

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

### 💰 Cheap Providers

#### GLM-4.7 (Daily reset, $0.6/1M)

1. Sign up: [Zhipu AI](https://open.bigmodel.cn)
2. Get API key from Coding Plan
3. Dashboard → Add API Key: Provider: `glm`, API Key: `your-key`

**Use:** `glm/glm-4.7` — **Pro Tip:** Coding Plan offers 3× quota at 1/7 cost! Reset daily 10:00 AM.

#### MiniMax M2.1 (5h reset, $0.20/1M)

1. Sign up: [MiniMax](https://www.minimax.io)
2. Get API key → Dashboard → Add API Key

**Use:** `minimax/MiniMax-M2.1` — **Pro Tip:** Cheapest option for long context (1M tokens)!

#### Kimi K2 ($9/month flat)

1. Subscribe: [Moonshot AI](https://platform.moonshot.ai)
2. Get API key → Dashboard → Add API Key

**Use:** `kimi/kimi-k2.5` — **Pro Tip:** Fixed $9/month for 10M tokens = $0.90/1M effective cost!

#### Baidu Qianfan / ERNIE

1. Sign up: [Baidu AI Cloud Qianfan](https://cloud.baidu.com/product/wenxinworkshop)
2. Create a Qianfan API key → Dashboard → Add API Key: Provider: `qianfan`

**Use:** `qianfan/ernie-5.1`, `qianfan/ernie-x1.1`, or another Qianfan OpenAI-compatible model ID.

### 🆓 FREE Providers

#### Qoder (8 FREE models)

```bash
Dashboard → Connect Qoder → OAuth login → Unlimited usage

Models: if/kimi-k2, if/qwen3-coder-plus, if/qwen3-max, if/qwen3-235b, if/deepseek-r1, if/deepseek-v3.2
```

#### Kiro (Claude FREE)

```bash
Dashboard → Connect Kiro → AWS Builder ID or Google/GitHub → Unlimited

Models: kr/claude-sonnet-4.5, kr/claude-haiku-4.5
```

---

## 🎨 Combos

You can reorder combo cards directly in **Dashboard → Combos** by dragging the handle on each card. The order is stored in SQLite and restored on reload.

### Example 1: Maximize Subscription → Cheap Backup

```
Dashboard → Combos → Create New

Name: premium-coding
Models:
  1. cc/claude-opus-4-7 (Subscription primary)
  2. glm/glm-4.7 (Cheap backup, $0.6/1M)
  3. minimax/MiniMax-M2.7 (Cheapest fallback, $0.3/1M)

Use in CLI: premium-coding
```

### Example 2: Free-Only (Zero Cost)

```
Name: free-combo
Models:
  1. gemini-cli/gemini-3-flash-preview (180K free/month)
  2. if/kimi-k2 (unlimited)
  3. qw/coder-model (unlimited)

Cost: $0 forever!
```

---

## 🔧 CLI Integration

### Cursor IDE

```
Settings → Models → Advanced:
  OpenAI API Base URL: http://localhost:20128/v1
  OpenAI API Key: [from omniroute dashboard]
  Model: cc/claude-opus-4-7
```

### Claude Code

Edit `~/.claude/settings.json`:

```json
{
  "env": {
    "ANTHROPIC_BASE_URL": "http://localhost:20128",
    "ANTHROPIC_AUTH_TOKEN": "your-omniroute-api-key"
  }
}
```

Use the Claude-compatible root endpoint here. Do not append `/v1` to `ANTHROPIC_BASE_URL`.

### Codex CLI

```bash
export OPENAI_BASE_URL="http://localhost:20128"
export OPENAI_API_KEY="your-omniroute-api-key"
codex "your prompt"
```

### OpenClaw

Edit `~/.openclaw/openclaw.json`:

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

**Or use Dashboard:** CLI Tools → OpenClaw → Auto-config

### Cline / Continue / RooCode

```
Provider: OpenAI Compatible
Base URL: http://localhost:20128/v1
API Key: [from dashboard]
Model: cc/claude-opus-4-7
```

---

## 🚀 Deployment

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
```

The CLI automatically loads `.env` from `~/.omniroute/.env` or `./.env`.

### Uninstalling

When you no longer need OmniRoute, we provide two quick scripts for a clean removal:

| Command                  | Action                                                                              |
| ------------------------ | ----------------------------------------------------------------------------------- |
| `npm run uninstall`      | Removes the system app but **keeps your DB and configurations** in `~/.omniroute`.  |
| `npm run uninstall:full` | Removes the app AND permanently **erases all configurations, keys, and databases**. |

> Note: To run these commands, navigate to the OmniRoute project folder (if you cloned it) and run them. Alternatively, if globally installed, you can simply run `npm uninstall -g omniroute`.

### VPS Deployment

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

For servers with limited RAM, use the memory limit option:

```bash
# With 512MB limit (default)
pm2 start npm --name omniroute -- start

# Or with custom memory limit
OMNIROUTE_MEMORY_MB=512 pm2 start npm --name omniroute -- start

# Or using ecosystem.config.js
pm2 start ecosystem.config.js
```

Create `ecosystem.config.js`:

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

For host-integrated mode with CLI binaries, see the Docker section in the main docs.

### Void Linux (xbps-src)

Void Linux users can package and install OmniRoute natively using the `xbps-src` cross-compilation framework. This automates the Node.js standalone build along with the required `better-sqlite3` native bindings.

<details>
<summary><b>View xbps-src template</b></summary>

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

### Environment Variables

| Variable                                | Default                              | Description                                                                                               |
| --------------------------------------- | ------------------------------------ | --------------------------------------------------------------------------------------------------------- |
| `JWT_SECRET`                            | `omniroute-default-secret-change-me` | JWT signing secret (**change in production**)                                                             |
| `INITIAL_PASSWORD`                      | `CHANGEME`                           | First login password                                                                                      |
| `DATA_DIR`                              | `~/.omniroute`                       | Data directory (db, usage, logs)                                                                          |
| `PORT`                                  | framework default                    | Service port (`20128` in examples)                                                                        |
| `HOSTNAME`                              | framework default                    | Bind host (Docker defaults to `0.0.0.0`)                                                                  |
| `NODE_ENV`                              | runtime default                      | Set `production` for deploy                                                                               |
| `NEXT_PUBLIC_BASE_URL`                  | `http://localhost:20128`             | Public base URL surfaced to the dashboard and exposed to the server (replaces legacy `BASE_URL`)          |
| `NEXT_PUBLIC_CLOUD_URL`                 | `https://omniroute.dev`              | Cloud sync endpoint base URL (replaces legacy `CLOUD_URL`)                                                |
| `API_KEY_SECRET`                        | `endpoint-proxy-api-key-secret`      | HMAC secret for generated API keys                                                                        |
| `REQUIRE_API_KEY`                       | `false`                              | Enforce Bearer API key on `/v1/*`                                                                         |
| `ALLOW_API_KEY_REVEAL`                  | `false`                              | Allow Api Manager to copy full API keys on demand                                                         |
| `PROVIDER_LIMITS_SYNC_INTERVAL_MINUTES` | `70`                                 | Server-side refresh cadence for cached Provider Limits data; UI refresh buttons still trigger manual sync |
| `DISABLE_SQLITE_AUTO_BACKUP`            | `false`                              | Disable automatic SQLite snapshots before writes/import/restore; manual backups still work                |
| `APP_LOG_TO_FILE`                       | `true`                               | Enables application and audit log output to disk                                                          |
| `AUTH_COOKIE_SECURE`                    | `false`                              | Force `Secure` auth cookie (behind HTTPS reverse proxy)                                                   |
| `CLOUDFLARED_BIN`                       | unset                                | Use an existing `cloudflared` binary instead of managed download                                          |
| `CLOUDFLARED_PROTOCOL`                  | `http2`                              | Transport for managed Quick Tunnels (`http2`, `quic`, or `auto`)                                          |
| `OMNIROUTE_MEMORY_MB`                   | `512`                                | Node.js heap limit in MB                                                                                  |
| `PROMPT_CACHE_MAX_SIZE`                 | `50`                                 | Max prompt cache entries                                                                                  |
| `SEMANTIC_CACHE_MAX_SIZE`               | `100`                                | Max semantic cache entries                                                                                |

For the full environment variable reference, see the [README](../README.md).

---

## 📊 Available Models

<details>
<summary><b>View all available models</b></summary>

> The list below is curated from `open-sse/config/providerRegistry.ts` for v3.8.0. Cloud catalogs (Gemini, OpenRouter, etc.) are synced dynamically — for the full live catalog open **Dashboard → Providers → [provider] → Available Models** or call `GET /api/models/catalog`.

**Claude Code (`cc/`)** — Pro/Max OAuth: `cc/claude-opus-4-7`, `cc/claude-opus-4-6`, `cc/claude-opus-4-5-20251101`, `cc/claude-sonnet-4-6`, `cc/claude-sonnet-4-5-20250929`, `cc/claude-haiku-4-5-20251001`

**Codex (`cx/`)** — Plus/Pro OAuth: `cx/gpt-5.5` (+ effort tiers: `gpt-5.5-xhigh`, `gpt-5.5-high`, `gpt-5.5-medium`, `gpt-5.5-low`), `cx/gpt-5.4`, `cx/gpt-5.4-mini`, `cx/gpt-5.3-codex`, `cx/gpt-5.3-codex-spark`, `cx/gpt-5.2`

**Gemini CLI (`gemini-cli/`)** — FREE OAuth: `gemini-cli/gemini-3.1-pro-preview`, `gemini-cli/gemini-3.1-pro-preview-customtools`, `gemini-cli/gemini-3-flash-preview`, `gemini-cli/gemini-3.1-flash-lite-preview`

**GitHub Copilot (`gh/`)** — OAuth: `gh/gpt-5.5`, `gh/gpt-5.4`, `gh/gpt-5.4-mini`, `gh/gpt-5-mini`, `gh/gpt-5.3-codex`, `gh/claude-opus-4.7`, `gh/claude-opus-4.6`, `gh/claude-opus-4-5-20251101`, `gh/claude-sonnet-4.6`, `gh/claude-sonnet-4.5`, `gh/claude-haiku-4.5`, `gh/gemini-3.1-pro-preview`, `gh/gemini-3-flash-preview`, `gh/oswe-vscode-prime`

**Kiro (`kr/`)** — FREE OAuth: `kr/auto-kiro`, `kr/claude-opus-4.7`, `kr/claude-opus-4.6`, `kr/claude-sonnet-4.6`, `kr/claude-sonnet-4.5`, `kr/claude-haiku-4.5`, `kr/deepseek-3.2`, `kr/minimax-m2.5`, `kr/minimax-m2.1`, `kr/glm-5`, `kr/qwen3-coder-next`

**Qoder (`if/`)** — FREE OAuth: `if/kimi-k2-0905`, `if/kimi-k2`, `if/qwen3-coder-plus`, `if/qwen3-max`, `if/qwen3-max-preview`, `if/qwen3-vl-plus`, `if/qwen3-32b`, `if/qwen3-235b-a22b-thinking-2507`, `if/qwen3-235b-a22b-instruct`, `if/qwen3-235b`, `if/deepseek-v3.2`, `if/deepseek-v3`, `if/deepseek-r1`, `if/qoder-rome-30ba3b`

**Qwen (`qw/`)** — FREE OAuth (chat.qwen.ai): `qw/coder-model`, `qw/vision-model`

**GLM (`glm/`, `glm-cn/`, `zai/`, `glmt/`)** — $0.2–0.6/1M: `glm/glm-5.1`, `glm/glm-5`, `glm/glm-5-turbo`, `glm/glm-4.7`, `glm/glm-4.7-flash`, `glm/glm-4.6`, `glm/glm-4.6v`, `glm/glm-4.5`, `glm/glm-4.5v`, `glm/glm-4.5-air`

**MiniMax (`minimax/`, `minimax-cn/`)** — $0.2/1M: `minimax/MiniMax-M2.7`, `minimax/MiniMax-M2.7-highspeed`, `minimax/MiniMax-M2.5`, `minimax/MiniMax-M2.5-highspeed`

**Kimi (`kimi/`, `kimi-coding/`, `kimi-coding-apikey/`)** — $9/mo flat or per-use: `kimi/kimi-k2.6`, `kimi/kimi-k2.5`

**DeepSeek (`ds/`)** — API key: `ds/deepseek-v4-pro`, `ds/deepseek-v4-flash`

**Groq (`groq/`)** — Ultra-fast: `groq/llama-3.3-70b-versatile`, `groq/meta-llama/llama-4-maverick-17b-128e-instruct`, `groq/qwen/qwen3-32b`, `groq/openai/gpt-oss-120b`

**xAI (`xai/`)** — Grok native: `xai/grok-4.3`, `xai/grok-4.20-multi-agent-0309`, `xai/grok-4.20-0309-reasoning`, `xai/grok-4.20-0309-non-reasoning`

**Mistral (`mistral/`)** — EU-hosted: `mistral/mistral-large-latest`, `mistral/mistral-medium-3-5`, `mistral/mistral-small-latest`, `mistral/devstral-latest`, `mistral/codestral-latest`

**Perplexity (`pplx/`)** — Search-augmented: `pplx/sonar-deep-research`, `pplx/sonar-reasoning-pro`, `pplx/sonar-pro`, `pplx/sonar`

**Together AI (`together/`)** — Open-source: `together/meta-llama/Llama-3.3-70B-Instruct-Turbo-Free` (free), `together/meta-llama/Llama-Vision-Free`, `together/deepseek-ai/DeepSeek-R1-Distill-Llama-70B-Free`, `together/deepseek-ai/DeepSeek-R1`, `together/Qwen/Qwen3-235B-A22B`, `together/meta-llama/Llama-4-Maverick-17B-128E-Instruct-FP8`

**Fireworks AI (`fireworks/`)** — Fast inference: `fireworks/accounts/fireworks/models/kimi-k2p6`, `fireworks/accounts/fireworks/models/minimax-m2p7`, `fireworks/accounts/fireworks/models/qwen3p6-plus`, `fireworks/accounts/fireworks/models/glm-5p1`, `fireworks/accounts/fireworks/models/deepseek-v4-pro`

**Cerebras (`cerebras/`)** — Wafer-scale: `cerebras/zai-glm-4.7`, `cerebras/gpt-oss-120b`

**Cohere (`cohere/`)** — RAG-focused: `cohere/command-a-reasoning-08-2025`, `cohere/command-a-vision-07-2025`, `cohere/command-a-03-2025`, `cohere/command-r-08-2024`

**NVIDIA NIM (`nvidia/`)** — Enterprise: `nvidia/z-ai/glm-5.1`, `nvidia/minimaxai/minimax-m2.7`, `nvidia/google/gemma-4-31b-it`, `nvidia/mistralai/mistral-small-4-119b-2603`, `nvidia/mistralai/mistral-large-3-675b-instruct-2512`, `nvidia/qwen/qwen3.5-397b-a17b`, `nvidia/deepseek-ai/deepseek-v4-pro`, `nvidia/openai/gpt-oss-120b`, `nvidia/nvidia/nemotron-3-super-120b-a12b`

**Baidu Qianfan (`qianfan/`)** — ERNIE: `qianfan/ernie-5.1`, `qianfan/ernie-5.0-thinking-latest`, `qianfan/ernie-x1.1`

**Ollama Cloud (`ollama-cloud/`)**: `ollama-cloud/deepseek-v4-pro`, `ollama-cloud/deepseek-v4-flash`, `ollama-cloud/kimi-k2.6`, `ollama-cloud/glm-5.1`, `ollama-cloud/minimax-m2.7`, `ollama-cloud/gemma4:31b`, `ollama-cloud/qwen3.5:397b`

**Gemini (Google Cloud `gemini/`)**: Synced live per API key from Google — no static list. Connect a key in **Dashboard → Providers** then use **Available Models** to import the current catalog (e.g. `gemini/gemini-3-pro`, `gemini/gemini-3-flash`).

**Other compatible providers** (selected): `cohere`, `databricks`, `snowflake`, `together`, `vertex`, `alibaba`, `bedrock` (via `aws-bedrock`), `azure-ai`, `openrouter` (passthrough catalog), `siliconflow`, `hyperbolic`, `huggingface`, `featherless-ai`, `cloudflare-ai`, `scaleway`, `deepinfra`, `vercel-ai-gateway`, `bazaarlink`, `friendliai`, `nous-research`, `reka`, `volcengine`, `ai21`, `gigachat`. Each maintains its own model list in `providerRegistry.ts` and can be auto-synced when the provider exposes a `/models` endpoint.

**Note on model IDs:** OmniRoute uses provider-native IDs (`claude-opus-4-7`, `gpt-5.5`, `glm-5.1`, `MiniMax-M2.7`, `kimi-k2.5`, `grok-4.20-0309-reasoning`). Some IDs include dotted versions because that is how the upstream API expects them. If a model is not listed above, run `omniroute models --search <term>` or hit `GET /api/models/catalog` to confirm availability.

</details>

---

## 🧩 Advanced Features

### Custom Models

Add any model ID to any provider without waiting for an app update:

```bash
# Via API
curl -X POST http://localhost:20128/api/provider-models \
  -H "Content-Type: application/json" \
  -d '{"provider": "openai", "modelId": "gpt-5.2", "modelName": "GPT-5.2"}'

# List: curl http://localhost:20128/api/provider-models?provider=openai
# Remove: curl -X DELETE "http://localhost:20128/api/provider-models?provider=openai&model=gpt-5.2"
```

Or use Dashboard: **Providers → [Provider] → Custom Models**.

Notes:

- OpenRouter and OpenAI/Anthropic-compatible providers are managed from **Available Models** only. Manual add, import, and auto-sync all land in the same available-model list, so there is no separate Custom Models section for those providers.
- The **Custom Models** section is intended for providers that do not expose managed available-model imports.

### Dedicated Provider Routes

Route requests directly to a specific provider with model validation:

```bash
POST http://localhost:20128/v1/providers/openai/chat/completions
POST http://localhost:20128/v1/providers/openai/embeddings
POST http://localhost:20128/v1/providers/fireworks/images/generations
```

The provider prefix is auto-added if missing. Mismatched models return `400`.

### Network Proxy Configuration

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

**Precedence:** Key-specific → Combo-specific → Provider-specific → Global → Environment.

### Model Catalog API

```bash
curl http://localhost:20128/api/models/catalog
```

Returns models grouped by provider with types (`chat`, `embedding`, `image`).

### Cloud Sync

- Sync providers, combos, and settings across devices
- Automatic background sync with timeout + fail-fast
- Prefer server-side `NEXT_PUBLIC_BASE_URL`/`NEXT_PUBLIC_CLOUD_URL` in production

### Cloudflare Quick Tunnel

- Available in **Dashboard → Endpoints** for Docker and other self-hosted deployments
- Creates a temporary `https://*.trycloudflare.com` URL that forwards to your current OpenAI-compatible `/v1` endpoint
- First enable installs `cloudflared` only when needed; later restarts reuse the same managed binary
- Quick Tunnels are not auto-restored after an OmniRoute or container restart; re-enable them from the dashboard when needed
- Tunnel URLs are ephemeral and change every time you stop/start the tunnel
- Managed Quick Tunnels default to HTTP/2 transport to avoid noisy QUIC UDP buffer warnings in constrained containers
- Set `CLOUDFLARED_PROTOCOL=quic` or `auto` if you want to override the managed transport choice
- Set `CLOUDFLARED_BIN` if you prefer using a preinstalled `cloudflared` binary instead of the managed download
- Cloudflare Quick Tunnel, Tailscale Funnel, and ngrok Tunnel panels can be shown or hidden in **Settings → Appearance**. Hiding a panel does not stop a running tunnel.

### LLM Gateway Intelligence (Phase 9)

- **Semantic Cache** — Auto-caches non-streaming, temperature=0 responses (bypass with `X-OmniRoute-No-Cache: true`)
- **Request Idempotency** — Deduplicates requests within 5s via `Idempotency-Key` or `X-Request-Id` header
- **Progress Tracking** — Opt-in SSE `event: progress` events via `X-OmniRoute-Progress: true` header

---

### Translator Playground

Access via **Dashboard → Translator**. Debug and visualize how OmniRoute translates API requests between providers.

| Mode             | Purpose                                                                                |
| ---------------- | -------------------------------------------------------------------------------------- |
| **Playground**   | Select source/target formats, paste a request, and see the translated output instantly |
| **Chat Tester**  | Send live chat messages through the proxy and inspect the full request/response cycle  |
| **Test Bench**   | Run batch tests across multiple format combinations to verify translation correctness  |
| **Live Monitor** | Watch real-time translations as requests flow through the proxy                        |

**Use cases:**

- Debug why a specific client/provider combination fails
- Verify that thinking tags, tool calls, and system prompts translate correctly
- Compare format differences between OpenAI, Claude, Gemini, and Responses API formats

---

### Routing Strategies

Configure via **Dashboard → Settings → Routing**. The dashboard exposes the six most-used strategies; combos and the auto-router internally support a wider set.

**Dashboard-visible strategies (account-level routing):**

| Strategy                       | Description                                                                                      |
| ------------------------------ | ------------------------------------------------------------------------------------------------ |
| **Fill First**                 | Uses accounts in priority order — primary account handles all requests until unavailable         |
| **Round Robin**                | Cycles through all accounts with a configurable sticky limit (default: 3 calls per account)      |
| **P2C (Power of Two Choices)** | Picks 2 random accounts and routes to the healthier one — balances load with awareness of health |
| **Random**                     | Randomly selects an account for each request using Fisher-Yates shuffle                          |
| **Least Used**                 | Routes to the account with the oldest `lastUsedAt` timestamp, distributing traffic evenly        |
| **Cost Optimized**             | Routes to the account with the lowest priority value, optimizing for lowest-cost providers       |

**Advanced combo and auto strategies** (configurable per combo or via `auto/*` prefixes — see [AUTO-COMBO.md](../routing/AUTO-COMBO.md)):

- `priority` — strict order, never round-robins
- `weighted` — proportional traffic split by per-model weights
- `fill-first` — drain the first model until limits hit
- `round-robin` / `strict-random` / `random`
- `p2c` (Power of Two Choices)
- `least-used` and `cost-optimized`
- `auto` — score-driven across all candidates
- `lkgp` (Last Known Good Provider) — sticks to the last successful model per session
- `context-optimized` — picks the model with the largest free context window
- `context-relay` — chains long-context models for follow-up turns

#### External Sticky Session Header

For external session affinity (for example, Claude Code/Codex agents behind reverse proxies), send:

```http
X-Session-Id: your-session-key
```

OmniRoute also accepts `x_session_id` and returns the effective session key in `X-OmniRoute-Session-Id`.

If you use Nginx and send underscore-form headers, enable:

```nginx
underscores_in_headers on;
```

#### Wildcard Model Aliases

Create wildcard patterns to remap model names:

```
Pattern: claude-sonnet-*     →  Target: cc/claude-sonnet-4-6
Pattern: gpt-*               →  Target: gh/gpt-5.3-codex
```

Wildcards support `*` (any characters) and `?` (single character).

#### Fallback Chains

Define global fallback chains that apply across all requests:

```
Chain: production-fallback
  1. cc/claude-opus-4-7
  2. gh/gpt-5.3-codex
  3. glm/glm-4.7
```

---

### Resilience & Circuit Breakers

Configure via **Dashboard → Settings → Resilience**.

OmniRoute implements provider-level resilience with five components:

1. **Request Queue & Pacing** — System-level request shaping:
   - **Requests Per Minute (RPM)** — Maximum requests per minute per account
   - **Min Time Between Requests** — Minimum gap in milliseconds between requests
   - **Max Concurrent Requests** — Maximum simultaneous requests per account

2. **Connection Cooldown** — Per-auth-type configuration for a single connection after retryable failures:
   - **Base Cooldown** — Default cooldown window for retryable upstream failures
   - **Use Upstream Retry Hints** — Honors authoritative `Retry-After` or reset hints when provided
   - **Max Backoff Steps** — Maximum exponential backoff level for repeated failures

3. **Provider Circuit Breaker** — Tracks end-to-end provider failures and automatically opens the breaker when the configured threshold is reached:
   - **Failure Threshold** — Consecutive provider failures before opening the breaker
   - **Reset Timeout** — Time window before the provider is tested again
   - **CLOSED** (Healthy) — Requests flow normally
   - **OPEN** — Provider is temporarily blocked after repeated failures
   - **HALF_OPEN** — Testing if provider has recovered

   Connection-scoped `429` rate limits stay in **Connection Cooldown** and do not count toward the provider breaker.

   The provider breaker runtime state is shown on **Dashboard → Health** only.

4. **Wait For Cooldown** — If every candidate connection is already cooling down, OmniRoute can wait for the earliest cooldown and retry the same client request automatically.

5. **Rate Limit Auto-Detection** — When upstream providers return explicit wait windows, those hints override the local connection cooldown when the setting is enabled.

**Pro Tip:** Use the **Health** page to inspect and reset live provider breakers after an outage. The Resilience page only changes configuration.

---

### Database Export / Import

Manage database backups in **Dashboard → Settings → System & Storage**.

| Action                   | Description                                                                                                                                    |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| **Export Database**      | Downloads the current SQLite database as a `.sqlite` file                                                                                      |
| **Export All (.tar.gz)** | Downloads a full backup archive including: database, settings, combos, provider connections (no credentials), API key metadata                 |
| **Import Database**      | Upload a `.sqlite` file to replace the current database. A pre-import backup is automatically created unless `DISABLE_SQLITE_AUTO_BACKUP=true` |

```bash
# API: Export database
curl -o backup.sqlite http://localhost:20128/api/db-backups/export

# API: Export all (full archive)
curl -o backup.tar.gz http://localhost:20128/api/db-backups/exportAll

# API: Import database
curl -X POST http://localhost:20128/api/db-backups/import \
  -F "file=@backup.sqlite"
```

**Import Validation:** The imported file is validated for integrity (SQLite pragma check), required tables (`provider_connections`, `provider_nodes`, `combos`, `api_keys`), and size (max 100MB).

**Use Cases:**

- Migrate OmniRoute between machines
- Create external backups for disaster recovery
- Share configurations between team members (export all → share archive)

---

### Settings Dashboard

The settings page is organized into **7 tabs** for easy navigation:

| Tab            | Contents                                                                                                                                                 |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **General**    | System storage tools, default behavior, Endpoint tunnel visibility                                                                                       |
| **Appearance** | Theme controls (light/dark/system), sidebar visibility, panel toggles for Cloudflare/Tailscale/ngrok tunnel cards                                        |
| **AI**         | Thinking budget configuration, global system prompt injection, prompt cache stats                                                                        |
| **Security**   | Login/Password settings, IP Access Control, API auth for `/models`, Provider Blocking, prompt-injection guard                                            |
| **Routing**    | Global routing strategy (Fill First / Round Robin / P2C / Random / Least Used / Cost Optimized), wildcard model aliases, fallback chains, combo defaults |
| **Resilience** | Request queue, connection cooldown, provider breaker config, and wait-for-cooldown behavior                                                              |
| **Advanced**   | Global proxy configuration (HTTP/SOCKS5), per-provider proxy overrides                                                                                   |

---

### Costs & Budget Management

Access via **Dashboard → Costs**.

| Tab         | Purpose                                                                                  |
| ----------- | ---------------------------------------------------------------------------------------- |
| **Budget**  | Set spending limits per API key with daily/weekly/monthly budgets and real-time tracking |
| **Pricing** | View and edit model pricing entries — cost per 1K input/output tokens per provider       |

```bash
# API: Set a budget
curl -X POST http://localhost:20128/api/usage/budget \
  -H "Content-Type: application/json" \
  -d '{"keyId": "key-123", "limit": 50.00, "period": "monthly"}'

# API: Get current budget status
curl http://localhost:20128/api/usage/budget
```

**Cost Tracking:** Every request logs token usage and calculates cost using the pricing table. View breakdowns in **Dashboard → Usage** by provider, model, and API key.

---

### Audio Transcription

OmniRoute supports audio transcription via the OpenAI-compatible endpoint:

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

**Speech-to-Text (transcription)** providers:

- `openai/` (whisper-compatible)
- `groq/` (Groq Whisper Turbo)
- `deepgram/` (Nova family)
- `assemblyai/`
- `nvidia/` (Parakeet, Canary)
- `huggingface/` (whisper variants)
- `qwen/`

**Text-to-Speech (`POST /v1/audio/speech`)** providers:

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

Supported audio formats for transcription: `mp3`, `wav`, `m4a`, `flac`, `ogg`, `webm`. TTS output formats depend on the provider (mp3, wav, opus, pcm, mulaw).

---

### Combo Balancing Strategies

Configure per-combo balancing in **Dashboard → Combos → Create/Edit → Strategy**.

| Strategy           | Description                                                              |
| ------------------ | ------------------------------------------------------------------------ |
| **Round-Robin**    | Rotates through models sequentially                                      |
| **Priority**       | Always tries the first model; falls back only on error                   |
| **Random**         | Picks a random model from the combo for each request                     |
| **Weighted**       | Routes proportionally based on assigned weights per model                |
| **Least-Used**     | Routes to the model with the fewest recent requests (uses combo metrics) |
| **Cost-Optimized** | Routes to the cheapest available model (uses pricing table)              |

Global combo defaults can be set in **Dashboard → Settings → Routing → Combo Defaults**.

---

### Health Dashboard

Access via **Dashboard → Health**. Real-time system health overview with 6 cards:

| Card                  | What It Shows                                               |
| --------------------- | ----------------------------------------------------------- |
| **System Status**     | Uptime, version, memory usage, data directory               |
| **Provider Health**   | Global provider circuit breaker runtime state               |
| **Rate Limits**       | Active connection cooldowns per account with remaining time |
| **Active Lockouts**   | Active model-scoped lockouts and temporary exclusions       |
| **Signature Cache**   | Deduplication cache stats (active keys, hit rate)           |
| **Latency Telemetry** | p50/p95/p99 latency aggregation per provider                |

**Pro Tip:** The Health page auto-refreshes every 10 seconds. Use the circuit breaker card to identify which providers are experiencing issues.

---

## 🤖 Auto-Routing (Zero-config)

OmniRoute ships with a **score-driven auto-router** that picks the best model for each request across every connected provider — no combo to maintain. Just send the request with one of the `auto/*` prefixes and OmniRoute will assemble a virtual combo on the fly, scoring candidates on latency, cost, success rate, context fit, model fitness for the task, recent failures, quota, and circuit-breaker state.

| Prefix         | Optimizes for                                                                 |
| -------------- | ----------------------------------------------------------------------------- |
| `auto`         | Balanced default (latency × cost × success rate)                              |
| `auto/coding`  | Coding tasks: prefers Claude, GPT-5, GLM, Kimi, Qwen Coder, DeepSeek coders   |
| `auto/cheap`   | Lowest $/token, accepts higher latency                                        |
| `auto/fast`    | Lowest latency, ignores cost                                                  |
| `auto/offline` | Local-only providers (Ollama, vLLM, llama.cpp) — useful for air-gapped setups |
| `auto/smart`   | Reasoning quality first (Opus, GPT-5 xhigh, R1, GLM 5.1 reasoning)            |
| `auto/lkgp`    | "Last Known Good Provider" — sticky to the most recently successful target    |

Example:

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

The auto-router is fully described in [AUTO-COMBO.md](../routing/AUTO-COMBO.md) — including how to tune scoring weights, blacklist providers, and inspect routing decisions in **Dashboard → Auto Combo**.

---

## 🔌 MCP & A2A Integration

OmniRoute is both an **MCP server** (Model Context Protocol) and an **A2A server** (Agent-to-Agent JSON-RPC 2.0). Any MCP-compatible IDE or agent host can call OmniRoute tools directly — no extra wrapper required.

### MCP transports

- **SSE**: `http://localhost:20128/api/mcp/sse`
- **Streamable HTTP**: `http://localhost:20128/api/mcp/stream`
- **stdio**: `omniroute --mcp` (for IDE plugins that prefer stdio)

### Connect Claude Desktop

Edit `~/Library/Application Support/Claude/claude_desktop_config.json` (macOS) or the equivalent on Windows/Linux:

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

### Connect Cursor / Continue / VS Code MCP

Use the SSE URL `http://localhost:20128/api/mcp/sse` and a Bearer API key generated in **Dashboard → API Manager**.

### Scopes

MCP tools are grouped into 10 scopes: `analytics`, `auth`, `billing`, `combos`, `health`, `keys`, `memory`, `models`, `providers`, `system`. Each Bearer key can be limited to specific scopes — see [MCP-SERVER.md](../frameworks/MCP-SERVER.md) for the full tool catalog and [A2A-SERVER.md](../frameworks/A2A-SERVER.md) for the JSON-RPC schema.

---

## 🧠 Skills System

OmniRoute exposes an extensible **skill framework** (`src/lib/skills/`) so agents and the A2A endpoint can run domain-specific routines (e.g. `code-review`, `summarize`, `extract-facts`, `web-research`).

- **Marketplace UI** — Browse and install skills from **Dashboard → Skills**
- **Per-key scopes** — Restrict which API keys can invoke which skills
- **Custom skills** — Drop a TypeScript file in `src/lib/a2a/skills/`, register it, and it becomes immediately invocable over A2A

Full reference: [SKILLS.md](../frameworks/SKILLS.md).

---

## 💾 Memory System

OmniRoute persists **long-term conversational memory** with hybrid retrieval:

- **SQLite FTS5** for keyword search across past turns
- **Qdrant vector store** (optional) for semantic recall
- **Automatic fact extraction** — entities, preferences, and decisions are summarized after each session and stored in the `memory_facts` table
- Memories are scoped per API key and per session

Manage memories in **Dashboard → Memory** (search, edit, export, purge). The HTTP surface (`/api/memory/*`) lets agents push and query facts programmatically — see [MEMORY.md](../frameworks/MEMORY.md).

---

## 🔔 Webhooks

Subscribe to OmniRoute events for real-time monitoring and automation.

- Create a webhook in **Dashboard → Webhooks** with target URL and HMAC signing secret
- Available events: `request.completed`, `request.failed`, `provider.unavailable`, `budget.exceeded`, `combo.switched`, `circuit_breaker.opened`, `circuit_breaker.closed`
- Every payload includes `X-OmniRoute-Signature` (HMAC-SHA256) for verification
- Retries: 3 attempts with exponential backoff, then dead-letter queue

Full schema in [WEBHOOKS.md](../frameworks/WEBHOOKS.md).

---

## ☁️ Cloud Agents

OmniRoute integrates with cloud coding agents (**OpenAI Codex Cloud**, **Devin**, **Jules**, **Antigravity**) so you can dispatch long-running tasks from the same dashboard that handles your local routing.

- Create tasks in **Dashboard → Cloud Agents** or via `POST /api/v1/agents/tasks`
- Track status, logs, and artifacts per task
- Bring-your-own API key per provider — credentials never leave the OmniRoute instance

Full reference: [CLOUD_AGENT.md](../frameworks/CLOUD_AGENT.md).

---

## 🛠️ Programmatic Management

You can manage every OmniRoute resource (providers, combos, keys, settings) over HTTP using a **Bearer key with the `manage` scope**.

Generate the key in **Dashboard → API Manager → New Key → Scope: manage**, then:

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

See [API_REFERENCE.md](../reference/API_REFERENCE.md) for the full endpoint catalog and request/response schemas.

---

## 💻 Internal CLI

OmniRoute ships an internal CLI (`omniroute …`) for setup, diagnostics, and runtime control. This is **separate from the "CLI Tools" page in the dashboard**, which configures third-party CLIs (Claude Code, Cursor, Codex, Cline, …) so they can talk to OmniRoute.

```bash
omniroute setup                    # Interactive wizard (password, providers, combos)
omniroute setup --non-interactive  # CI-friendly
omniroute doctor                   # Health diagnostics (data dir, DB, providers, ports)
omniroute providers available      # List supported providers
omniroute providers list           # List configured connections
omniroute providers test <id>      # Live test a provider connection
omniroute combos list              # List combos
omniroute combos switch <name>     # Set default combo
omniroute models                   # List available models (--json, --search)
omniroute keys add | list | remove # Manage API keys from the terminal
omniroute backup                   # Snapshot config + DB
omniroute restore [<timestamp>]    # Restore from a snapshot
omniroute health                   # Detailed health (breakers, cache, memory)
omniroute quota                    # Provider quota usage
omniroute mcp status               # MCP server status
omniroute a2a status               # A2A server status
omniroute tunnel list|create|stop  # Cloudflare/Tailscale/ngrok tunnels
omniroute reset-password           # Reset the admin password
omniroute --mcp                    # Start MCP server over stdio
omniroute --port 3000              # Start the server on a custom port
```

Tip: pair `omniroute doctor --json` with your monitoring tool to alert on unhealthy provider connections.

---

## 🖥️ Desktop Application (Electron)

OmniRoute is available as a native desktop application for Windows, macOS, and Linux.

### Installation

```bash
# From the electron directory:
cd electron
npm install

# Development mode (connect to running Next.js dev server):
npm run dev

# Production mode (uses standalone build):
npm start
```

### Building Installers

```bash
cd electron
npm run build          # Current platform
npm run build:win      # Windows (.exe NSIS)
npm run build:mac      # macOS (.dmg universal)
npm run build:linux    # Linux (.AppImage)
```

Output → `electron/dist-electron/`

### Key Features

| Feature                     | Description                                          |
| --------------------------- | ---------------------------------------------------- |
| **Server Readiness**        | Polls server before showing window (no blank screen) |
| **System Tray**             | Minimize to tray, change port, quit from tray menu   |
| **Port Management**         | Change server port from tray (auto-restarts server)  |
| **Content Security Policy** | Restrictive CSP via session headers                  |
| **Single Instance**         | Only one app instance can run at a time              |
| **Offline Mode**            | Bundled Next.js server works without internet        |

### Environment Variables

| Variable              | Default | Description                      |
| --------------------- | ------- | -------------------------------- |
| `OMNIROUTE_PORT`      | `20128` | Server port                      |
| `OMNIROUTE_MEMORY_MB` | `512`   | Node.js heap limit (64–16384 MB) |

📖 Full documentation: [`electron/README.md`](../../electron/README.md)
