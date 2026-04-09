# Post 6: r/webdev (Problem/Solution)

**Subreddits:** r/webdev (~2M), r/programming (~6M)
**Schedule:** Day 4 (Friday)

---

## 📌 REDDIT IMAGE GUIDE

**Images to post:**
1. **First image:** `free-stack-infographic.png` — shows the $0/month free providers with each model listed
2. **Second image:** `dashboard-apikey-management.png` — shows the dashboard, API key manager and cost tracker at $0.00

**How to add:** Reddit post editor → camera icon → upload → appears inline in post where you position the cursor.

---

## Title:

```
Tired of AI rate limits mid-coding session? I built a free router that unifies 44+ providers — automatic fallback chain, account pooling, $0/month using only official free tiers
```

## Body:

```
## The problem every web dev hits

You're 2 hours into a debugging session. Claude hits its hourly limit. You go to the dashboard, swap API keys, reconfigure your IDE. Flow destroyed.

The frustrating part: there are *great* free AI tiers most devs barely use:

- **Kiro** → full Claude Sonnet 4.5 + Haiku 4.5, **unlimited**, via AWS Builder ID (free)
- **Qoder** → kimi-k2-thinking, qwen3-coder-plus, deepseek-r1, minimax (unlimited via Google OAuth)
- **Qwen** → 4 coding models, unlimited (Device Code auth)
- **Gemini CLI** → gemini-3-flash, gemini-2.5-pro (180K tokens/month)
- **Groq** → ultra-fast Llama/Gemma, 14.4K requests/day free
- **NVIDIA NIM** → 70+ open-weight models, 40 RPM, forever free

But each requires its own setup, and your IDE can only point to one at a time.

[IMAGE: free stack infographic showing all tiers and what's included]

## What I built to solve this

**OmniRoute** — a local proxy that exposes one `localhost:20128/v1` endpoint. You configure all your providers once, build a fallback chain ("Combo"), and point all your dev tools there.

    My "Free Forever" Combo:
      1. Gemini CLI (personal acct) — 180K/month, fastest for quick tasks
         ↕ distributed with
      1b. Gemini CLI (work acct)  — +180K/month pooled
         ↓ when both hit monthly cap
      2. Qoder       (kimi-k2-thinking — great for complex reasoning, unlimited)
         ↓ when slow or rate-limited
      3. Kiro        (Claude Sonnet 4.5, unlimited — my main fallback)
         ↓ emergency backup
      4. Qwen        (qwen3-coder-plus, unlimited)
         ↓ final fallback
      5. NVIDIA NIM  (open models, forever free)

OmniRoute **distributes requests across your accounts of the same provider** using round-robin or least-used strategies. My two Gemini accounts share the load — when the active one is busy or nearing its daily cap, requests shift to the other automatically. When both hit the monthly limit, OmniRoute falls to Qoder (unlimited). Qoder slow? → routes to Kiro (real Claude). **Your tools never see the switch — they just keep working.**

## Practical things it solves for web devs

**Rate limit interruptions** → Multi-account pooling + 5-tier fallback with circuit breakers = zero downtime
**Paying for unused quota** → Cost visibility shows exactly where money goes; free tiers absorb overflow
**Multiple tools, multiple APIs** → One `localhost:20128/v1` endpoint works with Cursor, Claude Code, Codex, Cline, Windsurf, any OpenAI SDK
**Format incompatibility** → Built-in translation: OpenAI ↔ Claude ↔ Gemini ↔ Ollama, transparent to caller
**Team API key management** → Issue scoped keys per developer, restrict by model/provider, track usage per key

[IMAGE: dashboard with API key management, cost tracking, and provider status]

## Already have paid subscriptions? OmniRoute extends them.

You configure the priority order:

    Claude Pro → when exhausted → DeepSeek native ($0.28/1M) → when budget limit → Qoder (free) → Kiro (free Claude)

If you have a Claude Pro account, OmniRoute uses it as first priority. If you also have a personal Gemini account, you can combine both in the same combo. Your expensive quota gets used first. When it runs out, you fall to cheap then free. **The fallback chain means you stop wasting money on quota you're not using.**

## Quick start (2 commands)

```bash
npm install -g omniroute
omniroute
```

Dashboard opens at `http://localhost:20128`.

1. Go to **Providers** → connect Kiro (AWS Builder ID OAuth, 2 clicks)
2. Connect Qoder (Google OAuth), Gemini CLI (Google OAuth) — add multiple accounts if you have them
3. Go to **Combos** → create your free-forever chain
4. Go to **Endpoints** → create an API key
5. Point Cursor/Claude Code to `localhost:20128/v1`

Also available via **Docker** (AMD64 + ARM64) or the **desktop Electron app** (Windows/macOS/Linux).

## What else you get beyond routing

- 📊 **Real-time quota tracking** — per account per provider, reset countdowns
- 🧠 **Semantic cache** — repeated prompts in a session = instant cached response, zero tokens
- 🔌 **Circuit breakers** — provider down? <1s auto-switch, no dropped requests
- 🔑 **API Key Management** — scoped keys, wildcard model patterns (`claude/*`, `openai/*`), usage per key
- 🔧 **MCP Server (16 tools)** — control routing directly from Claude Code or Cursor
- 🤖 **A2A Protocol** — agent-to-agent orchestration for multi-agent workflows
- 🖼️ **Multi-modal** — same endpoint handles images, audio, video, embeddings, TTS
- 🌍 **30 language dashboard** — if your team isn't English-first

**GitHub:** https://github.com/diegosouzapw/OmniRoute
Free and open-source (GPL-3.0).
```


## 🔌 All 50+ Supported Providers

### 🆓 Free Tier (Zero Cost, OAuth)

| Provider | Alias | Auth | What You Get | Multi-Account |
|----------|-------|------|-------------|---------------|
| **Qoder AI** | `if/` | Google OAuth | kimi-k2-thinking, qwen3-coder-plus, deepseek-r1, minimax-m2 — **unlimited** | ✅ up to 10 |
| **Qwen Code** | `qw/` | Device Code | qwen3-coder-plus, qwen3-coder-flash, 4 coding models — **unlimited** | ✅ up to 10 |
| **Gemini CLI** | `gc/` | Google OAuth | gemini-3-flash, gemini-2.5-pro — 180K tokens/month | ✅ up to 10 |
| **Kiro AI** | `kr/` | AWS Builder ID OAuth | claude-sonnet-4.5, claude-haiku-4.5 — **unlimited** | ✅ up to 10 |

### 🔐 OAuth Subscription Providers (CLI Pass-Through)

> These providers work as **subscription proxies** — OmniRoute redirects your existing paid CLI subscriptions through its endpoint, making them available to all your tools without reconfiguring each one.

| Provider | Alias | What OmniRoute Does |
|----------|-------|---------------------|
| **Claude Code** | `cc/` | Redirects Claude Code Pro/Max subscription traffic through OmniRoute — all tools get access |
| **Antigravity** | `ag/` | MITM proxy for Antigravity IDE — intercepts requests, routes to any provider, supports claude-opus-4.6-thinking, gemini-3.1-pro, gpt-oss-120b |
| **OpenAI Codex** | `cx/` | Proxies Codex CLI requests — your Codex Plus/Pro subscription works with all your tools |
| **GitHub Copilot** | `gh/` | Routes GitHub Copilot requests through OmniRoute — use Copilot as a provider in any tool |
| **Cursor IDE** | `cu/` | Passes Cursor Pro model calls through OmniRoute Cloud endpoint |
| **Kimi Coding** | `kmc/` | Kimi's coding IDE subscription proxy |
| **Kilo Code** | `kc/` | Kilo Code IDE subscription proxy |
| **Cline** | `cl/` | Cline VS Code extension proxy |

### 🔑 API Key Providers (Pay-Per-Use + Free Tiers)

| Provider | Alias | Cost | Free Tier |
|----------|-------|------|-----------|
| **OpenAI** | `openai/` | Pay-per-use | None |
| **Anthropic** | `anthropic/` | Pay-per-use | None |
| **Google Gemini API** | `gemini/` | Pay-per-use | 15 RPM free |
| **xAI (Grok-4)** | `xai/` | $0.20/$0.50 per 1M tokens | None |
| **DeepSeek V3.2** | `ds/` | $0.27/$1.10 per 1M | None |
| **Groq** | `groq/` | Pay-per-use | ✅ **FREE: 14.4K req/day, 30 RPM** |
| **NVIDIA NIM** | `nvidia/` | Pay-per-use | ✅ **FREE: 70+ models, ~40 RPM forever** |
| **Cerebras** | `cerebras/` | Pay-per-use | ✅ **FREE: 1M tokens/day, fastest inference** |
| **HuggingFace** | `hf/` | Pay-per-use | ✅ **FREE Inference API: Whisper, SDXL, VITS** |
| **Mistral** | `mistral/` | Pay-per-use | Free trial |
| **GLM (BigModel)** | `glm/` | $0.6/1M | None |
| **Z.AI (GLM-5)** | `zai/` | $0.5/1M | None |
| **Kimi (Moonshot)** | `kimi/` | Pay-per-use | None |
| **MiniMax M2.5** | `minimax/` | $0.3/1M | None |
| **MiniMax CN** | `minimax-cn/` | Pay-per-use | None |
| **Perplexity** | `pplx/` | Pay-per-use | None |
| **Together AI** | `together/` | Pay-per-use | None |
| **Fireworks AI** | `fireworks/` | Pay-per-use | None |
| **Cohere** | `cohere/` | Pay-per-use | Free trial |
| **Nebius AI** | `nebius/` | Pay-per-use | None |
| **SiliconFlow** | `siliconflow/` | Pay-per-use | None |
| **Hyperbolic** | `hyp/` | Pay-per-use | None |
| **Blackbox AI** | `bb/` | Pay-per-use | None |
| **OpenRouter** | `openrouter/` | Pay-per-use | Passes through 200+ models |
| **Ollama Cloud** | `ollamacloud/` | Pay-per-use | Open models |
| **Vertex AI** | `vertex/` | Pay-per-use | GCP billing |
| **Synthetic** | `synthetic/` | Pay-per-use | Passthrough |
| **Kilo Gateway** | `kg/` | Pay-per-use | Passthrough |
| **Deepgram** | `dg/` | Pay-per-use | Free trial |
| **AssemblyAI** | `aai/` | Pay-per-use | Free trial |
| **ElevenLabs** | `el/` | Pay-per-use | Free tier (10K chars/mo) |
| **Cartesia** | `cartesia/` | Pay-per-use | None |
| **PlayHT** | `playht/` | Pay-per-use | None |
| **Inworld** | `inworld/` | Pay-per-use | None |
| **NanoBanana** | `nb/` | Pay-per-use | Image generation |
| **SD WebUI** | `sdwebui/` | Local self-hosted | Free (run locally) |
| **ComfyUI** | `comfyui/` | Local self-hosted | Free (run locally) |
| **HuggingFace** | `hf/` | Pay-per-use | Free inference API |

---

## 🛠️ CLI Tool Integrations (14 Agents)

OmniRoute integrates with 14 CLI tools in **two distinct modes**:

### Mode 1: Redirect Mode (OmniRoute as endpoint)
Point the CLI tool to `localhost:20128/v1` — OmniRoute handles provider routing, fallback, and cost. All tools work with zero code changes.

| CLI Tool | Config Method | Notes |
|----------|--------------|-------|
| **Claude Code** | `ANTHROPIC_BASE_URL` env var | Supports opus/sonnet/haiku model aliases |
| **OpenAI Codex** | `OPENAI_BASE_URL` env var | Responses API natively supported |
| **Antigravity** | MITM proxy mode | Auto-intercepts VSCode extension requests |
| **Cursor IDE** | Settings → Models → OpenAI-compatible | Requires Cloud endpoint mode |
| **Cline** | VS Code settings | OpenAI-compatible endpoint |
| **Continue** | JSON config block | Model + apiBase + apiKey |
| **GitHub Copilot** | VS Code extension config | Routes through OmniRoute Cloud |
| **Kilo Code** | IDE settings | Custom model selector |
| **OpenCode** | `opencode config set baseUrl` | Terminal-based agent |
| **Kiro AI** | Settings → AI Provider | Kiro IDE config |
| **Factory Droid** | Custom config | Specialty assistant |
| **Open Claw** | Custom config | Claude-compatible agent |

### Mode 2: Proxy Mode (OmniRoute uses CLI as a provider)
OmniRoute connects to the CLI tool's running subscription and uses it as a provider in combos. The CLI's paid subscription becomes a tier in your fallback chain.

| CLI Provider | Alias | What's Proxied |
|-------------|-------|---------------|
| **Claude Code Sub** | `cc/` | Your existing Claude Pro/Max subscription |
| **Codex Sub** | `cx/` | Your Codex Plus/Pro subscription |
| **Antigravity Sub** | `ag/` | Your Antigravity IDE (MITM) — multi-model |
| **GitHub Copilot Sub** | `gh/` | Your GitHub Copilot subscription |
| **Cursor Sub** | `cu/` | Your Cursor Pro subscription |
| **Kimi Coding Sub** | `kmc/` | Your Kimi Coding IDE subscription |

**Multi-account:** Each subscription provider supports up to 10 connected accounts. If you and 3 teammates each have Claude Code Pro, OmniRoute pools all 4 subscriptions and distributes requests using round-robin or least-used strategy.

---

## 💡 The $0/Month Free Stack

```
Gemini CLI (personal) ──────┐
Gemini CLI (work)    ────── ○ round-robin pool → 360K tokens/month
                            ↓ when monthly cap hit
Qoder AI ─────────────────── ○ kimi-k2-thinking, deepseek-r1 (unlimited)
Kiro AI ──────────────────── ○ claude-sonnet-4.5 (unlimited, AWS Builder ID)
Qwen Code ───────────────── ○ qwen3-coder-plus (unlimited)
Groq ────────────────────── ○ llama/gemma (14.4K req/day free)
NVIDIA NIM ──────────────── ○ 70+ open models (40 RPM forever)
                            ↓
                    Total: $0/month
