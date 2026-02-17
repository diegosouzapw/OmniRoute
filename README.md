<div align="center">
  <img src="./images/omniroute.png" alt="OmniRoute Dashboard" width="800"/>
  
  # 🚀 OmniRoute — The Free AI Gateway

### Never stop coding. Smart routing to **FREE & low-cost AI models** with automatic fallback.

_Your universal API proxy — one endpoint, 36+ providers, zero downtime._

**Chat Completions • Embeddings • Image Generation • Audio • Reranking • 100% TypeScript**

---

### 🤖 Free AI Provider for your favorite coding agents

_Connect any AI-powered IDE or CLI tool through OmniRoute — free API gateway for unlimited coding._

  <table>
    <tr>
      <td align="center" width="110">
        <a href="https://github.com/cline/cline">
          <img src="./public/providers/openclaw.png" alt="OpenClaw" width="48"/><br/>
          <b>OpenClaw</b>
        </a><br/>
        <sub>⭐ 205K</sub>
      </td>
      <td align="center" width="110">
        <a href="https://github.com/HKUDS/nanobot">
          <img src="./public/providers/nanobot.png" alt="NanoBot" width="48"/><br/>
          <b>NanoBot</b>
        </a><br/>
        <sub>⭐ 20.9K</sub>
      </td>
      <td align="center" width="110">
        <a href="https://github.com/sipeed/picoclaw">
          <img src="./public/providers/picoclaw.jpg" alt="PicoClaw" width="48"/><br/>
          <b>PicoClaw</b>
        </a><br/>
        <sub>⭐ 14.6K</sub>
      </td>
      <td align="center" width="110">
        <a href="https://github.com/zeroclaw-labs/zeroclaw">
          <img src="./public/providers/zeroclaw.png" alt="ZeroClaw" width="48"/><br/>
          <b>ZeroClaw</b>
        </a><br/>
        <sub>⭐ 9.9K</sub>
      </td>
      <td align="center" width="110">
        <a href="https://github.com/nearai/ironclaw">
          <img src="./public/providers/ironclaw.png" alt="IronClaw" width="48"/><br/>
          <b>IronClaw</b>
        </a><br/>
        <sub>⭐ 2.1K</sub>
      </td>
    </tr>
    <tr>
      <td align="center" width="110">
        <a href="https://github.com/anomalyco/opencode">
          <img src="./public/providers/opencode.svg" alt="OpenCode" width="48"/><br/>
          <b>OpenCode</b>
        </a><br/>
        <sub>⭐ 106K</sub>
      </td>
      <td align="center" width="110">
        <a href="https://github.com/openai/codex">
          <img src="./public/providers/codex.png" alt="Codex CLI" width="48"/><br/>
          <b>Codex CLI</b>
        </a><br/>
        <sub>⭐ 60.8K</sub>
      </td>
      <td align="center" width="110">
        <a href="https://github.com/anthropics/claude-code">
          <img src="./public/providers/claude.png" alt="Claude Code" width="48"/><br/>
          <b>Claude Code</b>
        </a><br/>
        <sub>⭐ 67.3K</sub>
      </td>
      <td align="center" width="110">
        <a href="https://github.com/google-gemini/gemini-cli">
          <img src="./public/providers/gemini-cli.png" alt="Gemini CLI" width="48"/><br/>
          <b>Gemini CLI</b>
        </a><br/>
        <sub>⭐ 94.7K</sub>
      </td>
      <td align="center" width="110">
        <a href="https://github.com/Kilo-Org/kilocode">
          <img src="./public/providers/kilocode.png" alt="Kilo Code" width="48"/><br/>
          <b>Kilo Code</b>
        </a><br/>
        <sub>⭐ 15.5K</sub>
      </td>
    </tr>
  </table>

<sub>📡 All agents connect via <code>http://localhost:20128/v1</code> or <code>http://cloud.omniroute.online/v1</code> — one config, unlimited models and quota</sub>

---

[![npm version](https://img.shields.io/npm/v/omniroute?color=cb3837&logo=npm)](https://www.npmjs.com/package/omniroute)
[![Docker Hub](https://img.shields.io/docker/v/diegosouzapw/omniroute?label=Docker%20Hub&logo=docker&color=2496ED)](https://hub.docker.com/r/diegosouzapw/omniroute)
[![License](https://img.shields.io/github/license/diegosouzapw/OmniRoute)](https://github.com/diegosouzapw/OmniRoute/blob/main/LICENSE)
[![Website](https://img.shields.io/badge/Website-omniroute.online-blue?logo=google-chrome&logoColor=white)](https://omniroute.online)

[🌐 Website](https://omniroute.online) • [🚀 Quick Start](#-quick-start) • [💡 Features](#-key-features) • [📖 Docs](#-documentation) • [💰 Pricing](#-pricing-at-a-glance)

🌐 **Available in:** [English](README.md) | [Português](README.pt-BR.md) | [Español](README.es.md) | [Русский](README.ru.md) | [中文](README.zh-CN.md) | [Deutsch](README.de.md) | [Français](README.fr.md) | [Italiano](README.it.md)

</div>

---

## 🤔 Why OmniRoute?

**Stop wasting money and hitting limits:**

- <img src="https://img.shields.io/badge/✗-e74c3c?style=flat-square" height="16"/> Subscription quota expires unused every month
- <img src="https://img.shields.io/badge/✗-e74c3c?style=flat-square" height="16"/> Rate limits stop you mid-coding
- <img src="https://img.shields.io/badge/✗-e74c3c?style=flat-square" height="16"/> Expensive APIs ($20-50/month per provider)
- <img src="https://img.shields.io/badge/✗-e74c3c?style=flat-square" height="16"/> Manual switching between providers

**OmniRoute solves this:**

- ✅ **Maximize subscriptions** - Track quota, use every bit before reset
- ✅ **Auto fallback** - Subscription → API Key → Cheap → Free, zero downtime
- ✅ **Multi-account** - Round-robin between accounts per provider
- ✅ **Universal** - Works with Claude Code, Codex, Gemini CLI, Cursor, Cline, OpenClaw, any CLI tool

---

## 🔄 How It Works

```
┌─────────────┐
│  Your CLI   │  (Claude Code, Codex, Gemini CLI, OpenClaw, Cursor, Cline...)
│   Tool      │
└──────┬──────┘
       │ http://localhost:20128/v1
       ↓
┌─────────────────────────────────────────┐
│           OmniRoute (Smart Router)        │
│  • Format translation (OpenAI ↔ Claude) │
│  • Quota tracking + Embeddings + Images │
│  • Auto token refresh                   │
└──────┬──────────────────────────────────┘
       │
       ├─→ [Tier 1: SUBSCRIPTION] Claude Code, Codex, Gemini CLI
       │   ↓ quota exhausted
       ├─→ [Tier 2: API KEY] DeepSeek, Groq, xAI, Mistral, NVIDIA NIM, etc.
       │   ↓ budget limit
       ├─→ [Tier 3: CHEAP] GLM ($0.6/1M), MiniMax ($0.2/1M)
       │   ↓ budget limit
       └─→ [Tier 4: FREE] iFlow, Qwen, Kiro (unlimited)

Result: Never stop coding, minimal cost
```

---

## ⚡ Quick Start

**1. Install globally:**

```bash
npm install -g omniroute
omniroute
```

🎉 Dashboard opens at `http://localhost:20128`

| Command                 | Description                       |
| ----------------------- | --------------------------------- |
| `omniroute`             | Start server (default port 20128) |
| `omniroute --port 3000` | Use custom port                   |
| `omniroute --no-open`   | Don't auto-open browser           |
| `omniroute --help`      | Show help                         |

**2. Connect a FREE provider:**

Dashboard → Providers → Connect **Claude Code** or **Antigravity** → OAuth login → Done!

**3. Use in your CLI tool:**

```
Claude Code/Codex/Gemini CLI/OpenClaw/Cursor/Cline Settings:
  Endpoint: http://localhost:20128/v1
  API Key: [copy from dashboard]
  Model: if/kimi-k2-thinking
```

**That's it!** Start coding with FREE AI models.

**Alternative — run from source:**

```bash
cp .env.example .env
npm install
PORT=20128 NEXT_PUBLIC_BASE_URL=http://localhost:20128 npm run dev
```

---

## 🐳 Docker

OmniRoute is available as a public Docker image on [Docker Hub](https://hub.docker.com/r/diegosouzapw/omniroute).

**Quick run:**

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

**With environment file:**

```bash
# Copy and edit .env first
cp .env.example .env

docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --env-file .env \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

**Using Docker Compose:**

```bash
# Base profile (no CLI tools)
docker compose --profile base up -d

# CLI profile (Claude Code, Codex, OpenClaw built-in)
docker compose --profile cli up -d
```

| Image                    | Tag      | Size   | Description           |
| ------------------------ | -------- | ------ | --------------------- |
| `diegosouzapw/omniroute` | `latest` | ~250MB | Latest stable release |
| `diegosouzapw/omniroute` | `0.9.0`  | ~250MB | Current version       |

---

## 💰 Pricing at a Glance

| Tier                | Provider          | Cost                    | Quota Reset      | Best For             |
| ------------------- | ----------------- | ----------------------- | ---------------- | -------------------- |
| **💳 SUBSCRIPTION** | Claude Code (Pro) | $20/mo                  | 5h + weekly      | Already subscribed   |
|                     | Codex (Plus/Pro)  | $20-200/mo              | 5h + weekly      | OpenAI users         |
|                     | Gemini CLI        | **FREE**                | 180K/mo + 1K/day | Everyone!            |
|                     | GitHub Copilot    | $10-19/mo               | Monthly          | GitHub users         |
| **🔑 API KEY**      | NVIDIA NIM        | **FREE** (1000 credits) | One-time         | Free tier testing    |
|                     | DeepSeek          | Pay-per-use             | None             | Best price/quality   |
|                     | Groq              | Free tier + paid        | Rate limited     | Ultra-fast inference |
|                     | xAI (Grok)        | Pay-per-use             | None             | Grok models          |
|                     | Mistral           | Free tier + paid        | Rate limited     | European AI          |
|                     | OpenRouter        | Pay-per-use             | None             | 100+ models          |
| **💰 CHEAP**        | GLM-4.7           | $0.6/1M                 | Daily 10AM       | Budget backup        |
|                     | MiniMax M2.1      | $0.2/1M                 | 5-hour rolling   | Cheapest option      |
|                     | Kimi K2           | $9/mo flat              | 10M tokens/mo    | Predictable cost     |
| **🆓 FREE**         | iFlow             | $0                      | Unlimited        | 8 models free        |
|                     | Qwen              | $0                      | Unlimited        | 3 models free        |
|                     | Kiro              | $0                      | Unlimited        | Claude free          |

**💡 Pro Tip:** Start with Gemini CLI (180K free/month) + iFlow (unlimited free) combo = $0 cost!

---

## 🎯 Use Cases

### Case 1: "I have Claude Pro subscription"

**Problem:** Quota expires unused, rate limits during heavy coding

```
Combo: "maximize-claude"
  1. cc/claude-opus-4-6        (use subscription fully)
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
  1. cc/claude-opus-4-6        (best quality)
  2. cx/gpt-5.2-codex          (second subscription)
  3. glm/glm-4.7               (cheap, resets daily)
  4. minimax/MiniMax-M2.1      (cheapest, 5h reset)
  5. if/kimi-k2-thinking       (free unlimited)

Result: 5 layers of fallback = zero downtime
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

## 💡 Key Features

### 🧠 Core Routing & Intelligence

| Feature                         | What It Does                                                                   |
| ------------------------------- | ------------------------------------------------------------------------------ |
| 🎯 **Smart 4-Tier Fallback**    | Auto-route: Subscription → API Key → Cheap → Free                              |
| 📊 **Real-Time Quota Tracking** | Live token count + reset countdown per provider                                |
| 🔄 **Format Translation**       | OpenAI ↔ Claude ↔ Gemini ↔ Cursor ↔ Kiro seamless                              |
| 👥 **Multi-Account Support**    | Multiple accounts per provider with intelligent selection                      |
| 🔄 **Auto Token Refresh**       | OAuth tokens refresh automatically with retry                                  |
| 🎨 **Custom Combos**            | 6 strategies: fill-first, round-robin, p2c, random, least-used, cost-optimized |
| 🧩 **Custom Models**            | Add any model ID to any provider                                               |
| 🌐 **Wildcard Router**          | Route `provider/*` patterns to any provider dynamically                        |
| 🧠 **Thinking Budget**          | Passthrough, auto, custom, and adaptive modes for reasoning models             |
| 💬 **System Prompt Injection**  | Global system prompt applied across all requests                               |
| 📄 **Responses API**            | Full OpenAI Responses API (`/v1/responses`) support for Codex                  |

### 🎵 Multi-Modal APIs

| Feature                    | What It Does                                        |
| -------------------------- | --------------------------------------------------- |
| 🖼️ **Image Generation**    | `/v1/images/generations` — 4 providers, 9+ models   |
| 📐 **Embeddings**          | `/v1/embeddings` — 6 providers, 9+ models           |
| 🎤 **Audio Transcription** | `/v1/audio/transcriptions` — Whisper-compatible     |
| 🔊 **Text-to-Speech**      | `/v1/audio/speech` — Multi-provider audio synthesis |
| 🛡️ **Moderations**         | `/v1/moderations` — Content safety checks           |
| 🔀 **Reranking**           | `/v1/rerank` — Document relevance reranking         |

### 🛡️ Resilience & Security

| Feature                         | What It Does                                                  |
| ------------------------------- | ------------------------------------------------------------- |
| 🔌 **Circuit Breaker**          | Auto-open/close per-provider with configurable thresholds     |
| 🛡️ **Anti-Thundering Herd**     | Mutex + semaphore rate-limit for API key providers            |
| 🧠 **Semantic Cache**           | Two-tier cache (signature + semantic) reduces cost & latency  |
| ⚡ **Request Idempotency**      | 5s dedup window for duplicate requests                        |
| 🔒 **TLS Fingerprint Spoofing** | Bypass TLS-based bot detection via wreq-js                    |
| 🌐 **IP Filtering**             | Allowlist/blocklist for API access control                    |
| 📊 **Editable Rate Limits**     | Configurable RPM, min gap, and max concurrent at system level |

### 📊 Observability & Analytics

| Feature                      | What It Does                                                    |
| ---------------------------- | --------------------------------------------------------------- |
| 📝 **Request Logging**       | Debug mode with full request/response logs                      |
| 💾 **SQLite Proxy Logs**     | Persistent proxy logs survive server restarts                   |
| 📊 **Analytics Dashboard**   | Recharts-powered: stat cards, model usage chart, provider table |
| 📈 **Progress Tracking**     | Opt-in SSE progress events for streaming                        |
| 🧪 **LLM Evaluations**       | Golden set testing with 4 match strategies                      |
| 🔍 **Request Telemetry**     | p50/p95/p99 latency aggregation + X-Request-Id tracing          |
| 📋 **Request Logs + Quotas** | Dedicated pages for log browsing and limits/quotas tracking     |
| 🏥 **Health Dashboard**      | System uptime, circuit breaker states, lockouts, cache stats    |
| 💰 **Cost Tracking**         | Budget management + per-model pricing configuration             |

### ☁️ Deployment & Sync

| Feature                    | What It Does                                                          |
| -------------------------- | --------------------------------------------------------------------- |
| 💾 **Cloud Sync**          | Sync config across devices via Cloudflare Workers                     |
| 🌐 **Deploy Anywhere**     | Localhost, VPS, Docker, Cloudflare Workers                            |
| 🔑 **API Key Management**  | Generate, rotate, and scope API keys per provider                     |
| 🧙 **Onboarding Wizard**   | 4-step guided setup for first-time users                              |
| 🔧 **CLI Tools Dashboard** | One-click configure Claude, Codex, Cline, OpenClaw, Kilo, Antigravity |
| 🔄 **DB Backups**          | Automatic backup and restore for all settings                         |

<details>
<summary><b>📖 Feature Details</b></summary>

### 🎯 Smart 4-Tier Fallback

Create combos with automatic fallback:

```
Combo: "my-coding-stack"
  1. cc/claude-opus-4-6        (your subscription)
  2. nvidia/llama-3.3-70b      (free NVIDIA API)
  3. glm/glm-4.7               (cheap backup, $0.6/1M)
  4. if/kimi-k2-thinking       (free fallback)

→ Auto switches when quota runs out or errors occur
```

### 📊 Real-Time Quota Tracking

- Token consumption per provider
- Reset countdown (5-hour, daily, weekly)
- Cost estimation for paid tiers
- Monthly spending reports

### 🔄 Format Translation

Seamless translation between formats:

- **OpenAI** ↔ **Claude** ↔ **Gemini** ↔ **OpenAI Responses**
- Your CLI tool sends OpenAI format → OmniRoute translates → Provider receives native format
- Works with any tool that supports custom OpenAI endpoints

### 👥 Multi-Account Support

- Add multiple accounts per provider
- Auto round-robin or priority-based routing
- Fallback to next account when one hits quota

### 🔄 Auto Token Refresh

- OAuth tokens automatically refresh before expiration
- No manual re-authentication needed
- Seamless experience across all providers

### 🎨 Custom Combos

- Create unlimited model combinations
- 6 strategies: fill-first, round-robin, power-of-two-choices, random, least-used, cost-optimized
- Share combos across devices with Cloud Sync

### 🏥 Health Dashboard

- System status (uptime, version, memory usage)
- Circuit breaker states per provider (Closed/Open/Half-Open)
- Rate limit status and active lockouts
- Signature cache statistics
- Latency telemetry (p50/p95/p99) + prompt cache
- Reset health status with one click

### 🔧 Translator Playground

- Debug, test, and visualize API format translations
- Send requests and see how OmniRoute translates between provider formats
- Invaluable for troubleshooting integration issues

### 💾 Cloud Sync

- Sync providers, combos, and settings across devices
- Automatic background sync
- Secure encrypted storage

</details>

---

## 📖 Setup Guide

<details>
<summary><b>💳 Subscription Providers</b></summary>

### Claude Code (Pro/Max)

```bash
Dashboard → Providers → Connect Claude Code
→ OAuth login → Auto token refresh
→ 5-hour + weekly quota tracking

Models:
  cc/claude-opus-4-6
  cc/claude-sonnet-4-5-20250929
  cc/claude-haiku-4-5-20251001
```

**Pro Tip:** Use Opus for complex tasks, Sonnet for speed. OmniRoute tracks quota per model!

### OpenAI Codex (Plus/Pro)

```bash
Dashboard → Providers → Connect Codex
→ OAuth login (port 1455)
→ 5-hour + weekly reset

Models:
  cx/gpt-5.2-codex
  cx/gpt-5.1-codex-max
```

### Gemini CLI (FREE 180K/month!)

```bash
Dashboard → Providers → Connect Gemini CLI
→ Google OAuth
→ 180K completions/month + 1K/day

Models:
  gc/gemini-3-flash-preview
  gc/gemini-2.5-pro
```

**Best Value:** Huge free tier! Use this before paid tiers.

### GitHub Copilot

```bash
Dashboard → Providers → Connect GitHub
→ OAuth via GitHub
→ Monthly reset (1st of month)

Models:
  gh/gpt-5
  gh/claude-4.5-sonnet
  gh/gemini-3-pro
```

</details>

<details>
<summary><b>🔑 API Key Providers</b></summary>

### NVIDIA NIM (FREE 1000 credits!)

1. Sign up: [build.nvidia.com](https://build.nvidia.com)
2. Get free API key (1000 inference credits included)
3. Dashboard → Add Provider → NVIDIA NIM:
   - API Key: `nvapi-your-key`

**Models:** `nvidia/llama-3.3-70b-instruct`, `nvidia/mistral-7b-instruct`, and 50+ more

**Pro Tip:** OpenAI-compatible API — works seamlessly with OmniRoute's format translation!

### DeepSeek

1. Sign up: [platform.deepseek.com](https://platform.deepseek.com)
2. Get API key
3. Dashboard → Add Provider → DeepSeek

**Models:** `deepseek/deepseek-chat`, `deepseek/deepseek-coder`

### Groq (Free Tier Available!)

1. Sign up: [console.groq.com](https://console.groq.com)
2. Get API key (free tier included)
3. Dashboard → Add Provider → Groq

**Models:** `groq/llama-3.3-70b`, `groq/mixtral-8x7b`

**Pro Tip:** Ultra-fast inference — best for real-time coding!

### OpenRouter (100+ Models)

1. Sign up: [openrouter.ai](https://openrouter.ai)
2. Get API key
3. Dashboard → Add Provider → OpenRouter

**Models:** Access 100+ models from all major providers through a single API key.

</details>

<details>
<summary><b>💰 Cheap Providers (Backup)</b></summary>

### GLM-4.7 (Daily reset, $0.6/1M)

1. Sign up: [Zhipu AI](https://open.bigmodel.cn/)
2. Get API key from Coding Plan
3. Dashboard → Add API Key:
   - Provider: `glm`
   - API Key: `your-key`

**Use:** `glm/glm-4.7`

**Pro Tip:** Coding Plan offers 3× quota at 1/7 cost! Reset daily 10:00 AM.

### MiniMax M2.1 (5h reset, $0.20/1M)

1. Sign up: [MiniMax](https://www.minimax.io/)
2. Get API key
3. Dashboard → Add API Key

**Use:** `minimax/MiniMax-M2.1`

**Pro Tip:** Cheapest option for long context (1M tokens)!

### Kimi K2 ($9/month flat)

1. Subscribe: [Moonshot AI](https://platform.moonshot.ai/)
2. Get API key
3. Dashboard → Add API Key

**Use:** `kimi/kimi-latest`

**Pro Tip:** Fixed $9/month for 10M tokens = $0.90/1M effective cost!

</details>

<details>
<summary><b>🆓 FREE Providers (Emergency Backup)</b></summary>

### iFlow (8 FREE models)

```bash
Dashboard → Connect iFlow
→ iFlow OAuth login
→ Unlimited usage

Models:
  if/kimi-k2-thinking
  if/qwen3-coder-plus
  if/glm-4.7
  if/minimax-m2
  if/deepseek-r1
```

### Qwen (3 FREE models)

```bash
Dashboard → Connect Qwen
→ Device code authorization
→ Unlimited usage

Models:
  qw/qwen3-coder-plus
  qw/qwen3-coder-flash
```

### Kiro (Claude FREE)

```bash
Dashboard → Connect Kiro
→ AWS Builder ID or Google/GitHub
→ Unlimited usage

Models:
  kr/claude-sonnet-4.5
  kr/claude-haiku-4.5
```

</details>

<details>
<summary><b>🎨 Create Combos</b></summary>

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

</details>

<details>
<summary><b>🔧 CLI Integration</b></summary>

### Cursor IDE

```
Settings → Models → Advanced:
  OpenAI API Base URL: http://localhost:20128/v1
  OpenAI API Key: [from OmniRoute dashboard]
  Model: cc/claude-opus-4-6
```

### Claude Code

Use the **CLI Tools** page in the dashboard for one-click configuration, or edit `~/.claude/settings.json` manually.

### Codex CLI

```bash
export OPENAI_BASE_URL="http://localhost:20128"
export OPENAI_API_KEY="your-omniroute-api-key"

codex "your prompt"
```

### OpenClaw

**Option 1 — Dashboard (recommended):**

```
Dashboard → CLI Tools → OpenClaw → Select Model → Apply
```

**Option 2 — Manual:** Edit `~/.openclaw/openclaw.json`:

```json
{
  "models": {
    "providers": {
      "omniroute": {
        "baseUrl": "http://127.0.0.1:20128/v1",
        "apiKey": "sk_omniroute",
        "api": "openai-completions"
      }
    }
  }
}
```

> **Note:** OpenClaw only works with local OmniRoute. Use `127.0.0.1` instead of `localhost` to avoid IPv6 resolution issues.

### Cline / Continue / RooCode

```
Settings → API Configuration:
  Provider: OpenAI Compatible
  Base URL: http://localhost:20128/v1
  API Key: [from OmniRoute dashboard]
  Model: if/kimi-k2-thinking
```

</details>

---

## 📊 Available Models

<details>
<summary><b>View all available models</b></summary>

**Claude Code (`cc/`)** - Pro/Max:

- `cc/claude-opus-4-6`
- `cc/claude-sonnet-4-5-20250929`
- `cc/claude-haiku-4-5-20251001`

**Codex (`cx/`)** - Plus/Pro:

- `cx/gpt-5.2-codex`
- `cx/gpt-5.1-codex-max`

**Gemini CLI (`gc/`)** - FREE:

- `gc/gemini-3-flash-preview`
- `gc/gemini-2.5-pro`

**GitHub Copilot (`gh/`)**:

- `gh/gpt-5`
- `gh/claude-4.5-sonnet`

**NVIDIA NIM (`nvidia/`)** - FREE credits:

- `nvidia/llama-3.3-70b-instruct`
- `nvidia/mistral-7b-instruct`
- 50+ more models on [build.nvidia.com](https://build.nvidia.com)

**GLM (`glm/`)** - $0.6/1M:

- `glm/glm-4.7`

**MiniMax (`minimax/`)** - $0.2/1M:

- `minimax/MiniMax-M2.1`

**iFlow (`if/`)** - FREE:

- `if/kimi-k2-thinking`
- `if/qwen3-coder-plus`
- `if/deepseek-r1`
- `if/glm-4.7`
- `if/minimax-m2`

**Qwen (`qw/`)** - FREE:

- `qw/qwen3-coder-plus`
- `qw/qwen3-coder-flash`

**Kiro (`kr/`)** - FREE:

- `kr/claude-sonnet-4.5`
- `kr/claude-haiku-4.5`

**OpenRouter (`or/`)** - 100+ models:

- `or/anthropic/claude-4-sonnet`
- `or/google/gemini-2.5-pro`
- Any model from [openrouter.ai/models](https://openrouter.ai/models)

</details>

---

## 🧪 Evaluations (Evals)

OmniRoute includes a built-in evaluation framework to test LLM response quality against a golden set. Access it via **Analytics → Evals** in the dashboard.

### Built-in Golden Set

The pre-loaded "OmniRoute Golden Set" contains 10 test cases covering:

- Greetings, math, geography, code generation
- JSON format compliance, translation, markdown
- Safety refusal (harmful content), counting, boolean logic

### Evaluation Strategies

| Strategy   | Description                                      | Example                          |
| ---------- | ------------------------------------------------ | -------------------------------- |
| `exact`    | Output must match exactly                        | `"4"`                            |
| `contains` | Output must contain substring (case-insensitive) | `"Paris"`                        |
| `regex`    | Output must match regex pattern                  | `"1.*2.*3"`                      |
| `custom`   | Custom JS function returns true/false            | `(output) => output.length > 10` |

---

## 🐛 Troubleshooting

<details>
<summary><b>Click to expand troubleshooting guide</b></summary>

**"Language model did not provide messages"**

- Provider quota exhausted → Check dashboard quota tracker
- Solution: Use combo fallback or switch to cheaper tier

**Rate limiting**

- Subscription quota out → Fallback to GLM/MiniMax
- Add combo: `cc/claude-opus-4-6 → glm/glm-4.7 → if/kimi-k2-thinking`

**OAuth token expired**

- Auto-refreshed by OmniRoute
- If issues persist: Dashboard → Provider → Reconnect

**High costs**

- Check usage stats in Dashboard → Costs
- Switch primary model to GLM/MiniMax
- Use free tier (Gemini CLI, iFlow) for non-critical tasks

**Dashboard opens on wrong port**

- Set `PORT=20128` and `NEXT_PUBLIC_BASE_URL=http://localhost:20128`

**Cloud sync errors**

- Verify `BASE_URL` points to your running instance
- Verify `CLOUD_URL` points to your expected cloud endpoint
- Keep `NEXT_PUBLIC_*` values aligned with server-side values

**First login not working**

- Check `INITIAL_PASSWORD` in `.env`
- If unset, fallback password is `123456`

**No request logs**

- Set `ENABLE_REQUEST_LOGS=true` in `.env`

**Connection test shows "Invalid" for OpenAI-compatible providers**

- Many providers don't expose a `/models` endpoint
- OmniRoute v0.9.0+ includes fallback validation via chat completions
- Ensure base URL includes `/v1` suffix

</details>

---

## 🛠️ Tech Stack

- **Runtime**: Node.js 20+
- **Language**: TypeScript 5.9 — **100% TypeScript** across `src/` and `open-sse/` (v0.9.0)
- **Framework**: Next.js 16 + React 19 + Tailwind CSS 4
- **Database**: LowDB (JSON) + SQLite (domain state + proxy logs)
- **Streaming**: Server-Sent Events (SSE)
- **Auth**: OAuth 2.0 (PKCE) + JWT + API Keys
- **Testing**: Node.js test runner (368+ unit tests)
- **CI/CD**: GitHub Actions (auto npm publish + Docker Hub on release)
- **Website**: [omniroute.online](https://omniroute.online)
- **Package**: [npmjs.com/package/omniroute](https://www.npmjs.com/package/omniroute)
- **Docker**: [hub.docker.com/r/diegosouzapw/omniroute](https://hub.docker.com/r/diegosouzapw/omniroute)
- **Resilience**: Circuit breaker, exponential backoff, anti-thundering herd, TLS spoofing

---

## 📖 Documentation

| Document                                   | Description                                    |
| ------------------------------------------ | ---------------------------------------------- |
| [User Guide](docs/USER_GUIDE.md)           | Providers, combos, CLI integration, deployment |
| [API Reference](docs/API_REFERENCE.md)     | All endpoints with examples                    |
| [Troubleshooting](docs/TROUBLESHOOTING.md) | Common problems and solutions                  |
| [Architecture](docs/ARCHITECTURE.md)       | System architecture and internals              |
| [Contributing](CONTRIBUTING.md)            | Development setup and guidelines               |
| [OpenAPI Spec](docs/openapi.yaml)          | OpenAPI 3.0 specification                      |
| [Security Policy](SECURITY.md)             | Vulnerability reporting and security practices |

---

## 📧 Support

- **Website**: [omniroute.online](https://omniroute.online)
- **GitHub**: [github.com/diegosouzapw/OmniRoute](https://github.com/diegosouzapw/OmniRoute)
- **Issues**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
- **Original Project**: [9router by decolua](https://github.com/decolua/9router)

---

## 👥 Contributors

[![Contributors](https://contrib.rocks/image?repo=diegosouzapw/OmniRoute&max=100&columns=20&anon=1)](https://github.com/diegosouzapw/OmniRoute/graphs/contributors)

### How to Contribute

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

### Releasing a New Version

```bash
# Create a release — npm publish happens automatically
gh release create v0.9.0 --title "v0.9.0" --generate-notes
```

---

## 📊 Star History

<a href="https://star-history.com/#diegosouzapw/OmniRoute&Date">
 <picture>
   <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=diegosouzapw/OmniRoute&type=Date&theme=dark" />
   <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/svg?repos=diegosouzapw/OmniRoute&type=Date" />
   <img alt="Star History Chart" src="https://api.star-history.com/svg?repos=diegosouzapw/OmniRoute&type=Date" />
 </picture>
</a>

---

## 🙏 Acknowledgments

Special thanks to **[9router](https://github.com/decolua/9router)** by **[decolua](https://github.com/decolua)** — the original project that inspired this fork. OmniRoute builds upon that incredible foundation with additional features, multi-modal APIs, and a full TypeScript rewrite.

Special thanks to **[CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI)** — the original Go implementation that inspired this JavaScript port.

---

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

---

<div align="center">
  <sub>Built with ❤️ for developers who code 24/7</sub>
  <br/>
  <sub><a href="https://omniroute.online">omniroute.online</a></sub>
</div>
