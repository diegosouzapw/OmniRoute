# User Guide (Polski)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/USER_GUIDE.md) · 🇸🇦 [ar](../../ar/docs/USER_GUIDE.md) · 🇧🇬 [bg](../../bg/docs/USER_GUIDE.md) · 🇧🇩 [bn](../../bn/docs/USER_GUIDE.md) · 🇨🇿 [cs](../../cs/docs/USER_GUIDE.md) · 🇩🇰 [da](../../da/docs/USER_GUIDE.md) · 🇩🇪 [de](../../de/docs/USER_GUIDE.md) · 🇪🇸 [es](../../es/docs/USER_GUIDE.md) · 🇮🇷 [fa](../../fa/docs/USER_GUIDE.md) · 🇫🇮 [fi](../../fi/docs/USER_GUIDE.md) · 🇫🇷 [fr](../../fr/docs/USER_GUIDE.md) · 🇮🇳 [gu](../../gu/docs/USER_GUIDE.md) · 🇮🇱 [he](../../he/docs/USER_GUIDE.md) · 🇮🇳 [hi](../../hi/docs/USER_GUIDE.md) · 🇭🇺 [hu](../../hu/docs/USER_GUIDE.md) · 🇮🇩 [id](../../id/docs/USER_GUIDE.md) · 🇮🇹 [it](../../it/docs/USER_GUIDE.md) · 🇯🇵 [ja](../../ja/docs/USER_GUIDE.md) · 🇰🇷 [ko](../../ko/docs/USER_GUIDE.md) · 🇮🇳 [mr](../../mr/docs/USER_GUIDE.md) · 🇲🇾 [ms](../../ms/docs/USER_GUIDE.md) · 🇳🇱 [nl](../../nl/docs/USER_GUIDE.md) · 🇳🇴 [no](../../no/docs/USER_GUIDE.md) · 🇵🇭 [phi](../../phi/docs/USER_GUIDE.md) · 🇵🇱 [pl](../../pl/docs/USER_GUIDE.md) · 🇵🇹 [pt](../../pt/docs/USER_GUIDE.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/USER_GUIDE.md) · 🇷🇴 [ro](../../ro/docs/USER_GUIDE.md) · 🇷🇺 [ru](../../ru/docs/USER_GUIDE.md) · 🇸🇰 [sk](../../sk/docs/USER_GUIDE.md) · 🇸🇪 [sv](../../sv/docs/USER_GUIDE.md) · 🇰🇪 [sw](../../sw/docs/USER_GUIDE.md) · 🇮🇳 [ta](../../ta/docs/USER_GUIDE.md) · 🇮🇳 [te](../../te/docs/USER_GUIDE.md) · 🇹🇭 [th](../../th/docs/USER_GUIDE.md) · 🇹🇷 [tr](../../tr/docs/USER_GUIDE.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/USER_GUIDE.md) · 🇵🇰 [ur](../../ur/docs/USER_GUIDE.md) · 🇻🇳 [vi](../../vi/docs/USER_GUIDE.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/USER_GUIDE.md)

---

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
  3. if/kimi-k2-thinking       (free emergency fallback)

Monthly cost: $20 (subscription) + ~$5 (backup) = $25 total
vs. $20 + hitting limits = frustration
```

### Case 2: "I want zero cost"

**Problem:** Can't afford subscriptions, need reliable AI coding

```
Combo: "free-forever"
  1. gc/gemini-3-flash         (180K free/month)
  2. if/kimi-k2-thinking       (unlimited free)
  3. qw/qwen3-coder-plus       (unlimited free)

Monthly cost: $0
Quality: Production-ready models
```

### Case 3: "I need 24/7 coding, no interruptions"

**Problem:** Deadlines, can't afford downtime

```
Combo: "always-on"
  1. cc/claude-opus-4-7        (best quality)
  2. cx/gpt-5.2-codex          (second subscription)
  3. glm/glm-4.7               (cheap, resets daily)
  4. minimax/MiniMax-M2.1      (cheapest, 5h reset)
  5. if/kimi-k2-thinking       (free unlimited)

Result: 5 layers of fallback = zero downtime
Monthly cost: $20-200 (subscriptions) + $10-20 (backup)
```

### Case 4: "I want FREE AI in OpenClaw"

**Problem:** Need AI assistant in messaging apps, completely free

```
Combo: "openclaw-free"
  1. if/glm-4.7                (unlimited free)
  2. if/minimax-m2.1           (unlimited free)
  3. if/kimi-k2-thinking       (unlimited free)

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
  cc/claude-sonnet-4-5-20250929
  cc/claude-haiku-4-5-20251001
```

**Pro Tip:** Use Opus for complex tasks, Sonnet for speed. OmniRoute tracks quota per model!

#### OpenAI Codex (Plus/Pro)

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

**Best Value:** Huge free tier! Use this before paid tiers.

#### GitHub Copilot

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

1. Sign up: [Zhipu AI](https://open.bigmodel.cn/)
2. Get API key from Coding Plan
3. Dashboard → Add API Key: Provider: `glm`, API Key: `your-key`

**Use:** `glm/glm-4.7` — **Pro Tip:** Coding Plan offers 3× quota at 1/7 cost! Reset daily 10:00 AM.

#### MiniMax M2.1 (5h reset, $0.20/1M)

1. Sign up: [MiniMax](https://www.minimax.io/)
2. Get API key → Dashboard → Add API Key

**Use:** `minimax/MiniMax-M2.1` — **Pro Tip:** Cheapest option for long context (1M tokens)!

#### Kimi K2 ($9/month flat)

1. Subscribe: [Moonshot AI](https://platform.moonshot.ai/)
2. Get API key → Dashboard → Add API Key

**Use:** `kimi/kimi-latest` — **Pro Tip:** Fixed $9/month for 10M tokens = $0.90/1M effective cost!

### 🆓 FREE Providers

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

You can reorder combo cards directly in **Dashboard → Combos** by dragging the handle on each card. The order is stored in SQLite and restored on reload.

### Example 1: Maximize Subscription → Cheap Backup

```
Dashboard → Combos → Create New

Name: premium-coding
Models:
  1. cc/claude-opus-4-7 (Subscription primary)
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
  Model: cc/claude-opus-4-7
```

### Claude Code

Edit `~/.claude/config.json`:

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

### OpenClaw

Edit `~/.openclaw/openclaw.json`:

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

**Or use Dashboard:** CLI Tools → OpenClaw → Auto-config

### Cline / Continue / RooCode

```
Provider: OpenAI Compatible
Base URL: http://localhost:20128/v1
API Key: [from dashboard]
Model: cc/claude-opus-4-7
```

---

## Wdrożenie

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
| `INITIAL_PASSWORD`                      | `123456`                             | First login password                                                                                      |
| `DATA_DIR`                              | `~/.omniroute`                       | Data directory (db, usage, logs)                                                                          |
| `PORT`                                  | framework default                    | Service port (`20128` in examples)                                                                        |
| `HOSTNAME`                              | framework default                    | Bind host (Docker defaults to `0.0.0.0`)                                                                  |
| `NODE_ENV`                              | runtime default                      | Set `production` for deploy                                                                               |
| `BASE_URL`                              | `http://localhost:20128`             | Server-side internal base URL                                                                             |
| `CLOUD_URL`                             | `https://omniroute.dev`              | Cloud sync endpoint base URL                                                                              |
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

**Claude Code (`cc/`)** — Pro/Max: `cc/claude-opus-4-7`, `cc/claude-sonnet-4-5-20250929`, `cc/claude-haiku-4-5-20251001`

**Codex (`cx/`)** — Plus/Pro: `cx/gpt-5.2-codex`, `cx/gpt-5.1-codex-max`

**Gemini CLI (`gc/`)** — FREE: `gc/gemini-3-flash-preview`, `gc/gemini-2.5-pro`

**GitHub Copilot (`gh/`)**: `gh/gpt-5`, `gh/claude-4.5-sonnet`

**GLM (`glm/`)** — $0.6/1M: `glm/glm-4.7`

**MiniMax (`minimax/`)** — $0.2/1M: `minimax/MiniMax-M2.1`

**Qoder (`if/`)** — FREE: `if/kimi-k2-thinking`, `if/qwen3-coder-plus`, `if/deepseek-r1`

**Qwen (`qw/`)** — FREE: `qw/qwen3-coder-plus`, `qw/qwen3-coder-flash`

**Kiro (`kr/`)** — FREE: `kr/claude-sonnet-4.5`, `kr/claude-haiku-4.5`

**DeepSeek (`ds/`)**: `ds/deepseek-chat`, `ds/deepseek-reasoner`

**Groq (`groq/`)**: `groq/llama-3.3-70b-versatile`, `groq/llama-4-maverick-17b-128e-instruct`

**xAI (`xai/`)**: `xai/grok-4`, `xai/grok-4-0709-fast-reasoning`, `xai/grok-code-mini`

**Mistral (`mistral/`)**: `mistral/mistral-large-2501`, `mistral/codestral-2501`

**Perplexity (`pplx/`)**: `pplx/sonar-pro`, `pplx/sonar`

**Together AI (`together/`)**: `together/meta-llama/Llama-3.3-70B-Instruct-Turbo`

**Fireworks AI (`fireworks/`)**: `fireworks/accounts/fireworks/models/deepseek-v3p1`

**Cerebras (`cerebras/`)**: `cerebras/llama-3.3-70b`

**Cohere (`cohere/`)**: `cohere/command-r-plus-08-2024`

**NVIDIA NIM (`nvidia/`)**: `nvidia/nvidia/llama-3.3-70b-instruct`

</details>

---

## 🧩 Advanced Features

### Custom Models

Add any model ID to any provider without waiting for an app update:

```bash
# Via API
curl -X POST http://localhost:20128/api/provider-models \
  -H "Content-Type: application/json" \
  -d '{"provider": "openai", "modelId": "gpt-4.5-preview", "modelName": "GPT-4.5 Preview"}'

# List: curl http://localhost:20128/api/provider-models?provider=openai
# Remove: curl -X DELETE "http://localhost:20128/api/provider-models?provider=openai&model=gpt-4.5-preview"
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
- Prefer server-side `BASE_URL`/`CLOUD_URL` in production

### Cloudflare Quick Tunnel

- Available in **Dashboard → Endpoints** for Docker and other self-hosted deployments
- Creates a temporary `https://*.trycloudflare.com` URL that forwards to your current OpenAI-compatible `/v1` endpoint
- First enable installs `cloudflared` only when needed; later restarts reuse the same managed binary
- Quick Tunnels are not auto-restored after an OmniRoute or container restart; re-enable them from the dashboard when needed
- Tunnel URLs are ephemeral and change every time you stop/start the tunnel
- Managed Quick Tunnels default to HTTP/2 transport to avoid noisy QUIC UDP buffer warnings in constrained containers
- Set `CLOUDFLARED_PROTOCOL=quic` or `auto` if you want to override the managed transport choice
- Set `CLOUDFLARED_BIN` if you prefer using a preinstalled `cloudflared` binary instead of the managed download

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

Configure via **Dashboard → Settings → Routing**.

| Strategy                       | Description                                                                                      |
| ------------------------------ | ------------------------------------------------------------------------------------------------ |
| **Fill First**                 | Uses accounts in priority order — primary account handles all requests until unavailable         |
| **Round Robin**                | Cycles through all accounts with a configurable sticky limit (default: 3 calls per account)      |
| **P2C (Power of Two Choices)** | Picks 2 random accounts and routes to the healthier one — balances load with awareness of health |
| **Random**                     | Randomly selects an account for each request using Fisher-Yates shuffle                          |
| **Least Used**                 | Routes to the account with the oldest `lastUsedAt` timestamp, distributing traffic evenly        |
| **Cost Optimized**             | Routes to the account with the lowest priority value, optimizing for lowest-cost providers       |

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
Pattern: claude-sonnet-*     →  Target: cc/claude-sonnet-4-5-20250929
Pattern: gpt-*               →  Target: gh/gpt-5.1-codex
```

Wildcards support `*` (any characters) and `?` (single character).

#### Fallback Chains

Define global fallback chains that apply across all requests:

```
Chain: production-fallback
  1. cc/claude-opus-4-7
  2. gh/gpt-5.1-codex
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

The settings page is organized into 6 tabs for easy navigation:

| Tab            | Contents                                                                                     |
| -------------- | -------------------------------------------------------------------------------------------- |
| **General**    | System storage tools, appearance settings, theme controls, and per-item sidebar visibility   |
| **Security**   | Login/Password settings, IP Access Control, API auth for `/models`, and Provider Blocking    |
| **Routing**    | Global routing strategy (6 options), wildcard model aliases, fallback chains, combo defaults |
| **Resilience** | Request queue, connection cooldown, provider breaker config, and wait-for-cooldown behavior  |
| **AI**         | Thinking budget configuration, global system prompt injection, prompt cache stats            |
| **Advanced**   | Global proxy configuration (HTTP/SOCKS5)                                                     |

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

Available providers: **Deepgram** (`deepgram/`), **AssemblyAI** (`assemblyai/`).

Supported audio formats: `mp3`, `wav`, `m4a`, `flac`, `ogg`, `webm`.

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

## 🖥️ Desktop Application (Electron)

OmniRoute is available as a native desktop application for Windows, macOS, and Linux.

### Zainstaluj

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

📖 Full documentation: [`electron/README.md`](../electron/README.md)
