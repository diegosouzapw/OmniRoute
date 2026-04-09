# Post 9: Sales Pitch / General (r/entrepreneur, r/startups, r/MachineLearning)

**Subreddits:** r/entrepreneur (~2M), r/startups (~1.8M), r/MachineLearning (~3M)
**Schedule:** Day 7 (Wednesday) — use as outreach post or Product Hunt description

---

## 📌 REDDIT IMAGE GUIDE

**Images to post (all 4):**
1. `omniroute-hub-diagram.png` — hero visual, shows all providers connecting to OmniRoute
2. `free-stack-infographic.png` — the zero-cost free stack
3. `dashboard-apikey-management.png` — enterprise dashboard feel
4. `architecture-fallback-diagram.png` — technical proof of quality

**How to add:** Reddit post editor → camera icon → upload sequentially. Position each image near the relevant section for maximum impact.

---

## Title (pick one):

**Option A (r/MachineLearning):**
```
OmniRoute: open-source AI gateway — 50+ providers, 14 CLI integrations, multi-account pooling, MCP server, A2A protocol. Full $0/month stack included. [GPL-3.0]
```

**Option B (r/entrepreneur / r/startups):**
```
I replaced my $120/month AI stack with $0 — built an open-source gateway that pools ALL my AI accounts, CLIs, and subscriptions behind one endpoint. Never hits limits.
```

---

## Body:

```
## What is OmniRoute?

OmniRoute is a **free, open-source local AI gateway** that gives you one unified OpenAI-compatible endpoint (`localhost:20128/v1`) for every AI tool and provider you use.

You connect once. Everything works. Budget controlled. Sessions never interrupted.

[IMAGE: hub diagram — 50+ providers connecting through OmniRoute]

---

## The Problem It Solves

Modern AI-powered development means managing:

- **Multiple providers** — ChatGPT, Claude, Gemini, DeepSeek, Groq, xAI — each with different APIs
- **Multiple CLI tools** — Claude Code, Codex, Cursor, Antigravity, Cline — each with their own config
- **Multiple accounts** — personal, work, team — all siloed, never talking to each other
- **Multiple pricing tiers** — paid subs, API keys, free plans — no unified cost view

Result: mid-session quota limits, manual provider switching, duplicated subscriptions, no visibility into what's actually being used and what's being wasted.

---

## What OmniRoute Does

### 🔌 One Endpoint for 50+ Providers

[IMAGE: free stack infographic]

**Free Tier Providers (genuinely $0, unlimited):**

| Provider | Models | Cost |
|----------|--------|------|
| Kiro (AWS Builder ID) | claude-sonnet-4.5, claude-haiku-4.5 | **$0 unlimited** |
| Qoder (Google OAuth) | kimi-k2-thinking, qwen3-coder-plus, deepseek-r1 | **$0 unlimited** |
| Qwen (Device Code) | qwen3-coder-plus, qwen3-coder-flash | **$0 unlimited** |
| Gemini CLI (Google OAuth) | gemini-3-flash, gemini-2.5-pro | **$0 (180K/mo)** |
| NVIDIA NIM | 70+ open-weight models | **$0 (40 RPM forever)** |
| Groq | Llama-4, Gemma-3, Whisper | **$0 (14.4K req/day)** |
| Cerebras | World's fastest inference | **$0 (1M tokens/day)** |

**Ultra-cheap paid options (when you need the best):**

| Provider | Models | Cost per 1M |
|----------|--------|-------------|
| xAI Grok-4 Fast | Fastest with tool calling | $0.20 / $0.50 |
| DeepSeek V3.2 | Best reasoning per dollar | $0.27 / $1.10 |
| GLM-5 (Z.AI) | 128K output context | $0.50 |
| MiniMax M2.5 | Reasoning + agentic | $0.30 |

Plus: OpenAI, Anthropic, Google Gemini API, xAI, Mistral, Perplexity, Together AI, Fireworks, Cohere, Nebius, SiliconFlow, Hyperbolic, Blackbox AI, OpenRouter, Ollama Cloud, Vertex AI, Deepgram, AssemblyAI, ElevenLabs, Cartesia, PlayHT, ComfyUI, SD WebUI, HuggingFace, and more.

**50+ providers. One config. One endpoint.**

---

### 🛠️ Integrates With 14 CLI Tools — In Both Directions

[IMAGE: architecture fallback diagram]

OmniRoute works with your CLI tools in **two modes**:

**→ As an endpoint (redirect mode):** Point Claude Code, Codex, Antigravity, Cursor, Cline, or any agent to `localhost:20128/v1`. ZeroReconfig. The tool thinks it's talking to its normal API. OmniRoute routes to wherever you configured.

```bash
# Claude Code
ANTHROPIC_BASE_URL=http://localhost:20128 claude

# Codex CLI
OPENAI_BASE_URL=http://localhost:20128/v1 codex

# Antigravity / VS Code (MITM mode)
# → automatic, no config needed
```

**← As a provider (proxy mode):** Your existing **paid CLI subscriptions** become providers in OmniRoute's combo chain. Your Claude Pro subscription, your Codex Plus subscription, your Antigravity account — all pooled and available as tiers.

```
Claude Pro subscription  → pool with teammates' subscriptions
  ↓ when quota exhausted
Codex Plus subscription → shared across 3 developers' Codex accounts
  ↓ when daily limit hit
Kiro (free Claude)     → unlimited fallback
  ↓ overflow
Qoder (unlimited)      → never stops
```

**CLI agents supported:**
Claude Code • OpenAI Codex • Antigravity • Cursor IDE • Cline • GitHub Copilot • Continue • Kilo Code • OpenCode • Kiro AI • Factory Droid • Open Claw

---

### 🔀 Multi-Account Pooling — The Multiplier Effect

Connect multiple accounts of the same provider. OmniRoute distributes requests across them.

```
3 developers × Gemini CLI (personal)    = 540K tokens/month
3 developers × Kiro (AWS Builder ID)   = unlimited Claude (×3 throughput)
3 developers × Qoder (Google OAuth)    = unlimited overflow
──────────────────────────────────────────────────────────
Team of 3 developers using AI CLIs     = $0/month, never rate-limited
```

When one account is slow or nearing its daily limit, requests shift to the others automatically. No manual balancing. No missed sessions.

---

### 📊 Enterprise-Grade Management (For Free)

[IMAGE: dashboard with API key management]

- **API Key Manager** — Issue scoped API keys per team member, per project. Restrict by provider, by model, by wildcard pattern (`claude/*`, `openai/*`). Usage tracked individually.
- **Real-time dashboard** — Quota per account, cost per request, reset countdowns, request logs, health status per provider
- **Circuit breakers** — Provider down? <1s auto-switch
- **Semantic cache** — Repeated prompts = zero tokens
- **MCP Server (16 tools)** — 3 transports: stdio, SSE, Streamable HTTP. Control routing from your IDE
- **A2A Protocol** — Agent-to-agent orchestration with SSE streaming, task manager, Agent Card auto-discovery
- **Multi-modal** — Chat, images, audio, TTS, video, music, embeddings, reranking, moderations
- **30 language dashboard** — RTL for Arabic/Hebrew included

---

## Why Open Source?

AI infrastructure shouldn't be a vendor lock-in problem. OmniRoute is:

- **GPL-3.0** — Free forever, no usage limits, no seat pricing
- **Self-hosted** — Docker (AMD64 + ARM64), NPM package, Desktop app (Electron)
- **Your data** — SQLite on your machine. AES-256 encryption at rest. No telemetry
- **Extensible** — 14 executor modules with a clean API. Add a provider in ~50 lines of TypeScript

---

## Get Started in 30 Seconds

```bash
npm install -g omniroute
omniroute
```

Dashboard at `http://localhost:20128`.

1. Connect Kiro (AWS Builder ID OAuth) — free Claude Sonnet/Haiku
2. Connect Qoder (Google OAuth) — free kimi + DeepSeek + Qwen models
3. Create a free-stack combo
4. Issue an API key
5. Point ALL your tools to `localhost:20128/v1`

Deploy as Docker, run as desktop app, or deploy to a VPS for shared team access.

**GitHub:** https://github.com/diegosouzapw/OmniRoute
**License:** GPL-3.0

---

*If you're building anything with AI — agents, coding tools, pipelines, apps — OmniRoute is the infrastructure layer that makes it reliable, cheap, and observable.*

*Star ⭐ the repo if this is useful. PRs for new providers welcome.*
```

**Character count:** ~4,000 ✅
**Tone:** Sales pitch + technical credibility, problem-agitation-solution structure, concrete numbers, enterprise features at zero cost
**Best for:** r/MachineLearning (technical), r/entrepreneur (cost), r/startups (solve problems), Product Hunt description, GitHub social posts
