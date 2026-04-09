# Reddit Launch Plan v2 — OmniRoute: Free AI Gateway with Anti-Ban, Smart Routing & Agent Orchestration

> ⚠️ This file is intentionally gitignored. It's a private planning doc for Reddit posts.

---

## 🧠 Core Message v2 (use in every post)

> **"Think of OmniRoute as a Wi-Fi router — but for AI calls. All your agents connect to one address, and the router decides which subscription/key/free-tier to use. And the best part? It makes your traffic look native, so providers can't tell it's coming through a proxy."**
>
> OmniRoute is a **free, open-source AI gateway** that sits between your coding tools and AI providers. One endpoint, 36+ providers, 4-tier smart fallback (Subscription → API Key → Cheap → Free). Multi-account stacking, **anti-ban protection** (TLS fingerprint spoofing + CLI fingerprint matching), MCP tools, A2A orchestration, semantic cache, circuit breakers, and a full dashboard in 30 languages. **Never hit a rate limit again. Never get your account flagged. Never stop coding.**

### The "Router" Analogy v2 (lead with this + anti-ban hook)

> Imagine you have a "team" of AI coding agents — one for frontend, one for backend, one for tests, one for code review.
>
> **Without OmniRoute:** They all use the same OpenAI subscription. In 1-2 hours, you hit rate limits, it gets expensive, the API wobbles and work stops. Worse — the provider detects unusual traffic patterns from a proxy and **flags your account**.
>
> **With OmniRoute:** You configure multiple "AI sources" (OpenAI Account A, OpenAI Account B, Anthropic Account C, Gemini Account D...). You point all your agents to OmniRoute as if it were the "AI server." When Account A hits its limit, OmniRoute auto-switches to Account B (or another provider). Same question repeated? Cached, zero cost. Provider unstable? Retry + fallback. **And here's the killer feature: OmniRoute reorders your HTTP headers and request body to match exactly how the native CLI would send them — so the provider thinks you're just using Claude Code or Codex CLI normally. Your proxy IP stays, but the "fingerprint" is indistinguishable from legit traffic.**

### Key Anti-Ban Pitch (use when people worry about account bans)

> **"You use a proxy to route AI traffic, but now the provider detects your requests look different from normal CLI usage and flags your account."**
>
> OmniRoute solves this with two layers of anti-ban protection:
>
> 1. **TLS Fingerprint Spoofing** — Makes your TLS handshake look like a browser instead of a Node.js script. Providers use TLS fingerprinting to detect bots — this bypasses it completely.
>
> 2. **CLI Fingerprint Matching** — Reorders HTTP headers and request body fields to match the exact signature of native CLI tools (Claude Code, Codex CLI, etc.). Toggle per provider. **Your proxy IP is preserved** — only the request "shape" changes.
>
> Result: providers see what looks like a normal user on Claude Code or Codex CLI — not a proxy. Your accounts stay safe.

---

## 📋 Posting Strategy v2

### Updated Rules

- **Lead with anti-ban** — This is the #1 thing people don't know they need until they get flagged
- **The "router" analogy** — Immediately makes the product click
- **Show the multi-agent scenario** — 4 agents coding simultaneously resonates hard
- **Multi-account stacking** — Nobody else offers this with fingerprint protection
- **Be a Redditor first** — Comment genuinely before/after posting
- **"I built this"** not "someone made this" — Be transparent
- **$0 combo** — Free forever hook
- **v2.0.13** — CLI Agents dashboard, MCP, A2A, anti-ban is a differentiator

### Timing

- **Best days:** Tuesday–Thursday
- **Best hours:** 8–10 AM EST (13–15 UTC)
- Post to 1–2 subreddits per day, not all at once

---

## 🎯 Target Subreddits (ordered by priority)

### Tier 1 — High Impact (post first)

| #   | Subreddit       | Members | Strategy                                                     |
| --- | --------------- | ------- | ------------------------------------------------------------ |
| 1   | r/LocalLLaMA    | ~600K   | Main launch — self-hosting + free models + anti-ban          |
| 2   | r/ChatGPTCoding | ~200K   | Multi-agent cost savings + anti-ban + fallback               |
| 3   | r/selfhosted    | ~400K   | Docker, npm, self-hosted gateway with fingerprint protection |
| 4   | r/opensource    | ~100K   | Community, GPL-3.0, contribution invite                      |

### Tier 2 — Developer Communities

| #   | Subreddit     | Members | Strategy                                            |
| --- | ------------- | ------- | --------------------------------------------------- |
| 5   | r/webdev      | ~2M     | Problem/solution — stop paying, stop getting banned |
| 6   | r/node        | ~200K   | Technical stack — anti-ban, MCP, A2A, TS            |
| 7   | r/SideProject | ~200K   | Full indie maker story                              |
| 8   | r/programming | ~6M     | Architecture angle — protocols, resilience          |

### Tier 3 — Niche / Productivity

| #   | Subreddit   | Members | Strategy                                                    |
| --- | ----------- | ------- | ----------------------------------------------------------- |
| 9   | r/HustleGPT | ~98K    | AI productivity + cost savings + account safety             |
| 10  | r/CursorAI  | ~50K    | Direct integration — OmniRoute with Cursor, no ban risk     |
| 11  | r/ClaudeAI  | ~100K   | Maximize Claude sub + multi-account without getting flagged |
| 12  | r/AutoGPT   | ~200K   | Multi-agent orchestration + MCP + A2A + anti-ban            |
| 13  | r/MCP       | ~30K    | MCP server with 16 tools + CLI agents dashboard             |

---

## 📅 Posting Schedule

| Day         | Subreddit       | Post # |
| ----------- | --------------- | ------ |
| Day 1 (Tue) | r/LocalLLaMA    | Post 1 |
| Day 1 (Tue) | r/ChatGPTCoding | Post 2 |
| Day 2 (Wed) | r/selfhosted    | Post 5 |
| Day 2 (Wed) | r/opensource    | Post 4 |
| Day 3 (Thu) | r/SideProject   | Post 1 |
| Day 3 (Thu) | r/node          | Post 3 |
| Day 4 (Fri) | r/webdev        | Post 6 |
| Day 4 (Fri) | r/HustleGPT     | Post 2 |
| Day 5 (Mon) | r/CursorAI      | Post 7 |
| Day 5 (Mon) | r/ClaudeAI      | Post 7 |
| Day 6 (Tue) | r/programming   | Post 3 |
| Day 6 (Tue) | r/AutoGPT       | Post 8 |
| Day 7 (Wed) | r/MCP           | Post 8 |

---

## 📝 Post Templates v2

### Reddit Formatting Notes

- Reddit uses its own Markdown — **no HTML tags**
- **No embedded images in text posts** — link to GitHub (images show in README)
- Keep titles under **300 characters** (ideal: 60–100)
- Body text: **under 2000 characters** for best engagement
- Links: `[text](url)` format
- Code: indent with 4 spaces

---

## Post 1: r/LocalLLaMA / r/SideProject (Main Launch — Anti-Ban Focus)

### Title:

```
I built a free "AI router" — 36+ providers, multi-account stacking, auto-fallback, and anti-ban protection so your accounts don't get flagged. Never hit a rate limit again.
```

### Body:

```
## The Problems Every Dev with AI Agents Faces

1. **Rate limits destroy your flow.** You have 4 agents coding a project. They all hit the same Claude subscription. In 1-2 hours: rate limited. Work stops. $50 burned.

2. **Your account gets flagged.** You run traffic through a proxy or reverse proxy. The provider detects non-standard request patterns. Account flagged, suspended, or rate-limited harder.

3. **You're paying $50-200/month** across Claude, Codex, Copilot — and you STILL get interrupted.

**There had to be a better way.**

## What I Built

**OmniRoute** — a free, open-source AI gateway. Think of it as a **Wi-Fi router, but for AI calls.** All your agents connect to one address, OmniRoute distributes across your subscriptions and auto-fallbacks.

**How the 4-tier fallback works:**

    Your Agents/Tools → OmniRoute (localhost:20128) →
      Tier 1: SUBSCRIPTION (Claude Pro, Codex, Gemini CLI)
      ↓ quota out?
      Tier 2: API KEY (DeepSeek, Groq, NVIDIA free credits)
      ↓ budget limit?
      Tier 3: CHEAP (GLM $0.6/M, MiniMax $0.2/M)
      ↓ still going?
      Tier 4: FREE (Qoder unlimited, Qwen unlimited, Kiro free Claude)

**Result:** Never stop coding. Stack 10 accounts across 5 providers. Zero manual switching.

## 🔒 Anti-Ban: Why Your Accounts Stay Safe

This is the part nobody else does:

**TLS Fingerprint Spoofing** — Your TLS handshake looks like a regular browser, not a Node.js script. Providers use TLS fingerprinting to detect bots — this completely bypasses it.

**CLI Fingerprint Matching** — OmniRoute reorders your HTTP headers and body fields to match exactly how Claude Code, Codex CLI, etc. send requests natively. Toggle per provider. **Your proxy IP is preserved** — only the request "shape" changes.

The provider sees what looks like a normal user on Claude Code. Not a proxy. Not a bot. Your accounts stay clean.

## What Makes v2.0 Different

- 🔒 **Anti-Ban Protection** — TLS fingerprint spoofing + CLI fingerprint matching
- 🤖 **CLI Agents Dashboard** — 14 built-in agents auto-detected + custom agent registry
- 🎯 **Smart 4-Tier Fallback** — Subscription → API Key → Cheap → Free
- 👥 **Multi-Account Stacking** — 10 accounts per provider, 6 strategies
- 🔧 **MCP Server (16 tools)** — Control the gateway from your IDE
- 🤝 **A2A Protocol** — Agent-to-agent orchestration
- 🧠 **Semantic Cache** — Same question? Cached response, zero cost
- 🖼️ **Multi-Modal** — Chat, images, embeddings, audio, video, music
- 📊 **Full Dashboard** — Analytics, quota tracking, logs, 30 languages
- 💰 **$0 Combo** — Gemini CLI (180K free/mo) + Qoder (unlimited) = free forever

## Install

    npm install -g omniroute && omniroute

Or Docker:

    docker run -d -p 20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute

Dashboard at localhost:20128. Connect via OAuth. Point your tool to `http://localhost:20128/v1`. Done.

**GitHub:** https://github.com/diegosouzapw/OmniRoute
**Website:** https://omniroute.online

Open source (GPL-3.0). **Never stop coding.**
```

**Character count:** ~2,000 ✅

---

## Post 2: r/ChatGPTCoding / r/HustleGPT (Cost + Anti-Ban Focus)

### Title:

```
Stop paying $200/month for AI coding AND stop getting your accounts flagged — I built a free "router" with anti-ban protection, multi-account stacking, and auto-fallback
```

### Body:

```
## Two problems nobody talks about together

**Problem 1: Cost.** Claude Pro $20 + Codex $20 + Copilot $10 + DeepSeek $5-15 = $50-200/month. You STILL hit rate limits.

**Problem 2: Bans.** You use a proxy or multi-account setup. The provider detects unusual request patterns. Account flagged. Harder rate limits. Or worse — suspended.

**What if you could stack all your accounts, auto-fallback to free models, AND look like a normal user?**

## OmniRoute — The Free AI Router with Anti-Ban

Think of it as a **Wi-Fi router for AI.** Your tools connect to one address (`localhost:20128/v1`), OmniRoute distributes across ALL your providers.

**4-Tier Smart Routing:**

1. **SUBSCRIPTION** — Claude Pro, Codex, Gemini CLI
2. **API KEY** — DeepSeek, Groq, xAI (free credits)
3. **CHEAP** — GLM ($0.6/M), MiniMax ($0.2/M)
4. **FREE** — Qoder (8 unlimited models), Qwen (3 unlimited), Kiro (free Claude)

When Tier 1 runs out → auto-switch to Tier 2 → 3 → 4. **Zero downtime.**

## 🔒 The Anti-Ban Secret

**TLS Fingerprint Spoofing** — Your TLS handshake looks like a browser, not a script. Bypasses bot detection.

**CLI Fingerprint Matching** — Reorders HTTP headers/body to match Claude Code or Codex CLI native signatures. Toggle per provider. Your proxy IP stays — only the request "fingerprint" changes.

**Result:** Provider sees a normal Claude Code user. Not a proxy. Accounts stay safe.

## Multi-Account Stacking + Fingerprint Protection

Have 3 Claude accounts? Stack them all with anti-ban:

    Account A hits limit → auto-switch to Account B
    Account B hits limit → fall to different provider
    Each request looks native to the provider

**6 strategies:** round-robin, least-used, cost-optimized, fill-first, P2C, random.

## $0/month Combo

    Gemini CLI (180K free/month) → Qoder (unlimited) → Qwen (unlimited)

Three layers of free. Production-ready. Zero cost.

## New in v2.0

- 🔒 **Anti-Ban** — TLS fingerprint + CLI fingerprint matching
- 🤖 **14 CLI Agents** — Auto-detected with custom agent registry
- 🔧 **MCP Server (16 tools)** — Control the gateway from your IDE
- 🧠 **Semantic cache** — Repeated prompts served instantly
- 🔌 **Circuit breakers** — Provider down? Auto-switch
- 🖼️ **Multi-modal** — Images, audio, video, music, embeddings
- 🌍 **30 languages** — Dashboard in your language

## One command

    npm install -g omniroute && omniroute

**GitHub:** https://github.com/diegosouzapw/OmniRoute

Open source. Free forever. **Never stop coding. Never get banned.**
```

**Character count:** ~1,900 ✅

---

## Post 3: r/node / r/programming (Technical + Anti-Ban Deep Dive)

### Title:

```
Built an AI gateway in TypeScript — TLS fingerprint spoofing, CLI signature matching, circuit breakers, MCP server (16 tools), A2A protocol, 36+ providers
```

### Body:

```
## What it does

OmniRoute v2.0 is a smart reverse proxy + operational platform for AI APIs. One endpoint (`localhost:20128/v1`), 36+ providers, automatic fallback routing, anti-ban protection, and **MCP + A2A orchestration**.

## Anti-Ban Engineering (the hard part)

Most AI proxies get flagged because providers analyze:
1. **TLS fingerprint** — Node.js has a unique TLS signature vs. browsers
2. **Request shape** — Header order, body field order, specific headers

OmniRoute addresses both:

**TLS Fingerprint Spoofing** — Uses `wreq-js` to present browser-like TLS fingerprints during handshake. Providers using JA3/JA4 fingerprinting see a Chrome signature, not Node.js.

**CLI Fingerprint Matching** — Config in `open-sse/config/cliFingerprints.ts`:
- Per-provider header ordering to match native CLI
- Body field reordering to match Claude Code / Codex CLI sequences
- Toggle per provider (codex, claude, github, antigravity)
- **Proxy IP preserved** — only request structure changes

This is the difference between "proxy that works" and "proxy that works without getting your accounts flagged."

## Technical Highlights

**Routing Engine:**
- 4-tier fallback: Subscription → API Key → Cheap → Free
- 6 balancing strategies: fill-first, round-robin, P2C, random, least-used, cost-optimized
- Quota-aware account selection with multi-account stacking (10 per provider)

**Agent Layer:**
- MCP Server: 16 tools, 3 transports (stdio, SSE, Streamable HTTP), 9 scopes
- A2A Server: JSON-RPC + SSE with task lifecycle
- CLI Agents Dashboard: 14 auto-detected agents + custom registry with 60s detection cache

**Resilience:**
- Per-model circuit breaker (Closed/Open/Half-Open)
- Anti-thundering herd: mutex + semaphore
- Two-tier semantic cache (signature + semantic matching)
- Request idempotency: 5s dedup window

**Format Translation:**
- OpenAI ↔ Claude ↔ Gemini ↔ Responses API ↔ Ollama
- Role normalization, think tag extraction, structured output mapping

**Multi-Modal:** Chat, images, video, music, audio, embeddings, reranking, moderations, TTS.

## Stack

Next.js 16, TypeScript, SQLite (better-sqlite3), Express, OAuth 2.0 PKCE. Docker multi-platform (AMD64+ARM64). Electron desktop app.

## Install

    npm install -g omniroute && omniroute

**GitHub:** https://github.com/diegosouzapw/OmniRoute

~60K lines of TypeScript. Anti-ban + resilience + orchestration. **Never stop coding.**
```

**Character count:** ~2,100 ✅

---

## Post 4: r/opensource (Community + Anti-Ban Angle)

### Title:

```
[Project] OmniRoute v2.0 — free AI gateway with anti-ban protection, multi-account stacking, MCP server, A2A protocol, 36+ providers
```

### Body:

```
Hey everyone! Sharing a project I've been building.

**OmniRoute** is a free, open-source AI gateway — a "Wi-Fi router for AI calls." Your coding agents connect to one endpoint, OmniRoute distributes requests across 36+ providers with smart fallback, multi-account stacking, and **anti-ban protection so your accounts don't get flagged**.

## Why I built this

I was running 4 AI agents simultaneously. They all hit the same Claude sub. In 1 hour: rate limited, $50 burned. And when I tried running through a proxy — Claude detected non-standard traffic and flagged my account. I needed something that "just works," doesn't get me banned, and falls to free models when everything runs out.

## What it does (v2.0)

- 🔒 **Anti-Ban Protection** — TLS fingerprint spoofing (browser-like TLS) + CLI fingerprint matching (native request signatures per provider). **Your proxy IP is preserved.**
- 🎯 **4-Tier Smart Routing** — Subscription → API Key → Cheap → Free, automatic
- 👥 **Multi-Account Stacking** — 10 accounts per provider, 6 balancing strategies
- 🤖 **CLI Agents Dashboard** — 14 built-in agents auto-detected + custom agent registry
- 🔧 **MCP Server (16 tools)** — Control the gateway from your IDE
- 🤝 **A2A Protocol** — Agent-to-agent orchestration with JSON-RPC + SSE
- 🔄 **Format Translation** — OpenAI ↔ Claude ↔ Gemini ↔ Responses API ↔ Ollama
- 🧠 **Semantic Cache** — Repeated queries served from cache, zero cost
- 📊 **Full Dashboard** — Analytics, quota tracking, logs, 30 languages, RTL support
- 🖼️ **Multi-Modal** — Chat, images, embeddings, audio, video, music, reranking
- 🐳 **Docker** — Multi-platform, one command
- 💰 **$0 combo** — Chain free providers for unlimited coding
- 🔐 **Security** — AES-256 encryption, API key scoping, IP filtering
- 📋 **Audit Trail** — MCP tool execution logging with scope enforcement

## Looking for

- Feedback from developers using AI coding tools (especially proxy setups)
- Contributors interested in AI gateway / anti-ban / MCP / A2A infrastructure
- Bug reports and feature requests

## Install

    npm install -g omniroute && omniroute

**GitHub:** https://github.com/diegosouzapw/OmniRoute
**License:** GPL-3.0

**Never stop coding. Never get banned.**
```

**Character count:** ~1,800 ✅

---

## Post 5: r/selfhosted (Docker + Anti-Ban)

### Title:

```
Self-hosted AI gateway with anti-ban protection — stack accounts across 36+ providers, TLS fingerprint spoofing, CLI signature matching. One Docker command.
```

### Body:

```
Built a self-hosted AI gateway that acts as a "router" for AI calls — with anti-ban protection built in.

## The anti-ban problem

Most AI proxies and reverse proxies get flagged because providers detect:
- Non-browser TLS fingerprints (Node.js vs Chrome)
- Non-standard request patterns (header order, body structure)

**OmniRoute fixes both:**
- **TLS Fingerprint Spoofing** — Browser-like TLS handshake
- **CLI Fingerprint Matching** — Reorders headers/body to match native CLI tools per provider

Your proxy IP stays. Only the request "shape" changes. Provider thinks you're a normal CLI user.

## Quick start (Docker)

    docker run -d \
      --name omniroute \
      --restart unless-stopped \
      -p 20128:20128 \
      -v omniroute-data:/app/data \
      diegosouzapw/omniroute:latest

Dashboard at `http://your-ip:20128`.

## What you get

- 🔒 **Anti-Ban** — TLS fingerprint + CLI fingerprint per provider
- 🎯 **Multi-Account Stacking** — 10 accounts per provider, auto round-robin
- 🔄 **4-Tier Fallback** — Subscription → API Key → Cheap → Free
- 🤖 **CLI Agents** — 14 auto-detected agents + custom registry
- 🔧 **MCP Server** — 16 tools via stdio/SSE/HTTP
- 🤝 **A2A Protocol** — Agent-to-agent orchestration
- 🧠 **Semantic Cache** — Same question = cached, zero cost
- 📊 **Full Dashboard** — Analytics, quota, logs, health, 30 languages
- 🔑 **API Key Management** — Scope per model with wildcard patterns
- 💾 **DB Backups** — Auto backup, restore, export/import
- 🖼️ **Multi-Modal** — Images, embeddings, audio, video, music
- 🔐 **AES-256 Encryption** — Credentials encrypted at rest

## Image details

| Image | Tag | Arch |
|---|---|---|
| `diegosouzapw/omniroute` | `latest` | AMD64 + ARM64 |

ARM64 native — runs on Apple Silicon, AWS Graviton, Raspberry Pi.

## $0/month combo

    gc/gemini-3-flash → if/kimi-k2-thinking → qw/qwen3-coder-plus

Three layers of free. Production-ready. Unlimited. Anti-ban protected.

**Docker Hub:** https://hub.docker.com/r/diegosouzapw/omniroute
**GitHub:** https://github.com/diegosouzapw/OmniRoute

**Never stop coding. Never get banned** — for $0.
```

**Character count:** ~1,700 ✅

---

## Post 6: r/webdev (Problem/Solution + Anti-Ban)

### Title:

```
Your AI coding tools don't have to cost $200/month or stop when you hit limits — and they don't have to get your accounts flagged either
```

### Body:

```
## Problem 1: Cost + Rate Limits

You have 4 AI agents working on a project. They all hit the same Claude subscription. In 1-2 hours: rate limits, work stops.

$20 Claude + $20 Codex + $10 Copilot = $50+/month and you STILL get interrupted.

## Problem 2: The Ban Hammer

You set up a proxy to route traffic. Provider detects non-standard request patterns. Account flagged. Rate limits get even worse. Or — account suspended.

## The Solution: OmniRoute

A free, local AI gateway. Works like a **Wi-Fi router for AI calls** — with built-in anti-ban protection.

    npm install -g omniroute && omniroute

## How the "router" works

1. Uses your subscription first (Claude Pro, Codex, Gemini CLI)
2. Account A hits limit? → Switches to Account B (multi-account stacking)
3. All accounts out? → falls to API keys (DeepSeek, Groq, free credits)
4. Budget limit? → falls to cheap ($0.2/M tokens)
5. Still going? → falls to free (Qoder, Qwen — unlimited)

**And the whole time:** OmniRoute makes your requests look like they're coming from the native CLI tool — not a proxy.

## 🔒 How Anti-Ban Works

**TLS Fingerprint Spoofing** — Your TLS handshake looks like Chrome, not Node.js. Bypasses JA3/JA4 fingerprinting.

**CLI Fingerprint Matching** — Per-provider: reorders headers and body fields to match Claude Code / Codex CLI native signatures. Your proxy IP stays.

Provider sees: "normal Claude Code user." Reality: proxy distributing across 10 accounts and 5 providers.

## v2.0 Highlights

- 🔒 **Anti-Ban** — TLS fingerprint + CLI fingerprint matching
- 🤖 **14 CLI Agents** — Auto-detected with install status + custom registry
- 🔧 **MCP (16 tools)** — Control gateway from your IDE
- 🧠 **Semantic cache** — Same question = instant cached response
- 📊 **Dashboard** — Real-time analytics, 30 languages
- 🖼️ **Multi-modal** — Images, audio, video, music, embeddings
- 🔌 **Circuit breakers** — Provider down? Auto-switch + auto-recover
- 💰 **$0 combo** — Three layers of free providers. Unlimited.

**GitHub:** https://github.com/diegosouzapw/OmniRoute

Open source (GPL-3.0). **Never stop coding. Never get banned.**
```

**Character count:** ~1,700 ✅

---

## Post 7: r/CursorAI / r/ClaudeAI (Direct Integration + Anti-Ban)

### Title:

```
I built a free proxy for Cursor/Claude with anti-ban protection — stack multiple accounts, auto-fallback, and your traffic looks native to the provider
```

### Body:

```
## Two things that kill your Cursor/Claude workflow

1. **"Rate limit exceeded"** — You're mid-coding, AI stops responding. Wait or switch manually.
2. **Account flagging** — You run through a proxy. Provider detects it. Harder limits. Or worse.

**What if you could stack accounts, auto-fallback, AND look like a normal user?**

## OmniRoute — Free AI Router with Anti-Ban

Point Cursor/Claude Code to `http://localhost:20128/v1` and OmniRoute handles everything:

1. **Your subscription first** (Claude Pro, Codex, Copilot)
2. **Multiple accounts** — Stack 2-3 Claude accounts, auto round-robin
3. **API keys next** (DeepSeek, Groq, xAI free credits)
4. **Cheap fallback** (GLM $0.6/M)
5. **Free forever** (Qoder unlimited, Qwen unlimited, Kiro free Claude)

Format translation is transparent. Cursor sends OpenAI format → OmniRoute converts → Claude receives native format.

## 🔒 The Anti-Ban Layer

**TLS Fingerprint Spoofing** — Browser-like TLS handshake. Bypasses bot detection.

**CLI Fingerprint Matching** — Matches native Claude Code / Codex CLI request signatures:
- Header ordering matches official CLI
- Body field ordering matches official CLI
- Toggle per provider in the Agents dashboard
- **Proxy IP preserved** — only request "shape" changes

Provider sees a normal Claude Code user, not a proxy. **Accounts stay safe.**

## CLI Agents Dashboard (new in v2.0)

Dashboard at `localhost:20128/dashboard/agents`:
- **14 built-in agents** auto-detected (Claude, Codex, Gemini, Aider, Cursor CLI, Warp...)
- Install status + version detection
- **Custom agent registry** — Add any CLI tool
- **CLI Fingerprint toggles** right in the same page

## Setup (2 minutes)

    npm install -g omniroute && omniroute

Dashboard: `localhost:20128` → Connect providers → Copy API key

In Cursor/Claude Code:
- Endpoint: `http://localhost:20128/v1`
- API Key: [from dashboard]

## Extra highlights

- 🧠 Semantic cache — Repeated prompts served instantly
- 🔌 Circuit breaker — Auto-switches when a provider fails
- 📊 Real-time quota tracking with reset countdowns
- 🖼️ Images, embeddings, audio — not just chat
- 🌍 Dashboard in 30 languages
- 🔐 AES-256 encryption, API key scoping, IP filtering

**GitHub:** https://github.com/diegosouzapw/OmniRoute

Open source. Free. **Never stop coding. Never get banned.**
```

**Character count:** ~1,800 ✅

---

## Post 8: r/AutoGPT / r/MCP (Multi-Agent + Anti-Ban)

### Title:

```
Free AI gateway with anti-ban, MCP server (16 tools), A2A protocol, CLI agents dashboard — route multi-agent teams across 36+ providers without getting flagged
```

### Body:

```
## The Multi-Agent + Anti-Ban Problem

When you run multiple AI agents simultaneously (frontend + backend + tests + review), you hit TWO walls:

1. **Quota exhaustion** — 4 agents × Claude = rate limits in under an hour
2. **Account flagging** — Proxy traffic looks different from native CLI. Provider flags you.

## OmniRoute v2.0 — Unified Runtime with Anti-Ban

Not just a proxy. A **unified runtime** for proxy + tools + agent orchestration — with anti-ban protection.

**As a Proxy:**
- 4-tier fallback: Subscription → API Key → Cheap → Free
- Multi-account stacking: 10 accounts per provider, 6 strategies
- Format translation: OpenAI ↔ Claude ↔ Gemini ↔ Responses ↔ Ollama
- Circuit breakers, semantic cache, request idempotency

**Anti-Ban Layer:**
- TLS Fingerprint Spoofing — Browser-like TLS handshake
- CLI Fingerprint Matching — Native request signatures per provider (header + body ordering)
- Toggle per provider in Agents dashboard
- **Proxy IP preserved** — only request structure changes

**As an MCP Server (16 tools):**
- 3 transports: stdio, SSE, Streamable HTTP
- Switch combos, check health, manage keys — from your IDE
- 9 granular scopes + SQLite audit trail
- Runtime heartbeat with PID, uptime, scope config

**As an A2A Server:**
- JSON-RPC with `message/send` and `message/stream`
- SSE streaming + task lifecycle management
- Agent Card discovery at `/.well-known/agent.json`

**CLI Agents Dashboard:**
- 14 built-in agents auto-detected (Codex, Claude, Goose, Aider, Cline, Warp, Amazon Q...)
- Install status + version + protocol badges
- Custom agent registry — add any CLI tool
- CLI Fingerprint toggles integrated

## Real Scenario

    Agent 1 (OpenClaw): frontend → Claude Account A (fingerprinted as Claude Code)
    Agent 2 (Codex CLI): backend → Claude Account B (fingerprinted as Codex)
    Agent 3 (Claude Code): tests → Gemini CLI (free)
    Agent 4 (MCP Client): monitors health, switches combo when quota drops

    Result: 4 agents, 3 providers, anti-ban on all, zero interruption

## Install

    npm install -g omniroute && omniroute

**GitHub:** https://github.com/diegosouzapw/OmniRoute

One runtime for proxy + anti-ban + tools + agents. **Never stop coding. Never get banned.**
```

**Character count:** ~1,900 ✅

---

## 🔗 Quick Copy Links

- **GitHub:** `https://github.com/diegosouzapw/OmniRoute`
- **Website:** `https://omniroute.online`
- **npm:** `https://www.npmjs.com/package/omniroute`
- **Docker Hub:** `https://hub.docker.com/r/diegosouzapw/omniroute`
- **WhatsApp Community:** `https://chat.whatsapp.com/JI7cDQ1GyaiDHhVBpLxf8b?mode=gi_t`
- **Install:** `npm install -g omniroute && omniroute`

---

## 💡 Tips for Posting v2

1. **Lead with anti-ban** — "your accounts don't get flagged" is the hook that nobody else offers
2. **The "router" analogy** — "it's like a Wi-Fi router for AI" instantly makes sense
3. **Show the multi-agent scenario** — 4 agents, 3 providers, zero interruption
4. **Multi-account stacking + fingerprint** — differentiator
5. **Reply to every comment** — engagement drives Reddit algorithm
6. **Be humble** — "I built this" > "check out this amazing tool"
7. **$0 combo** — Three layers of free is irresistible
8. **"Never stop coding. Never get banned."** — dual hook
9. **Mention the Agents dashboard** — visual proof of maturity
10. **30 languages** — shows polish and global reach

---

## 🔥 Comment Templates v2

### When someone asks "how is this different from OpenRouter?"

```
Great question! Key differences:

1. **Self-hosted** — OpenRouter is cloud ($$ per token, data on their servers). OmniRoute runs locally. Free.

2. **Anti-Ban Protection** — TLS fingerprint spoofing + CLI fingerprint matching. Your accounts don't get flagged. OpenRouter doesn't need this (they use their own keys), but if YOU bring your own keys/subs, you need this.

3. **Multi-account stacking** — 10 accounts per provider, round-robin between them. OpenRouter uses one account.

4. **4-tier fallback** — Subscription → API Key → Cheap → Free. Not just a model marketplace.

5. **MCP + A2A + CLI Agents** — Control gateway from IDE, agent orchestration, 14 auto-detected agents. OpenRouter doesn't have this.

Think of it as "OpenRouter but self-hosted, free, with anti-ban and a full operational platform."
```

### When someone asks "won't I get banned?"

```
That's exactly the problem OmniRoute addresses with two layers:

1. **TLS Fingerprint Spoofing** — Makes your TLS handshake look like Chrome, not Node.js. Providers use JA3/JA4 fingerprinting to detect bots — this bypasses it.

2. **CLI Fingerprint Matching** — Reorders your HTTP headers and body fields to match the exact signature of Claude Code or Codex CLI. Toggle per provider. Your proxy IP stays — only the request "shape" changes.

The provider sees what looks like a normal user on Claude Code. Not a proxy. Not a bot.

Obviously no tool can guarantee 100% safety — providers can always update detection. But OmniRoute gives you the same traffic pattern as a legit CLI user, which is the strongest position you can be in.
```

### When someone asks "is it really free?"

```
Yes! OmniRoute itself is 100% free and open source (GPL-3.0). It's a local proxy — routes YOUR requests using YOUR accounts/keys.

Free provider options:
- Qoder: 8 unlimited models
- Qwen: 3 unlimited models
- Gemini CLI: 180K free tokens/month
- Kiro: free Claude access

Stack them: Gemini CLI → Qoder → Qwen = three layers of free fallback. $0/month, unlimited, with anti-ban protection on top.
```

### When someone asks about security

```
Data flows directly from your machine to the AI provider. OmniRoute is a LOCAL proxy — never touches a third-party server.

Security features:
- AES-256-GCM encryption for credentials at rest
- API key management with model-level scoping (wildcard patterns like `openai/*`)
- IP filtering (allowlist/blocklist)
- TLS fingerprint spoofing (anti-ban, not security bypass)
- CLI fingerprint matching (accounts stay safe)
- MCP scope enforcement (9 granular permissions)
- Auth guards + CSRF protection
- Rate limiting per IP
```

---

## 📊 v1 → v2 Changelog (for "What's New" edits)

| Feature | v1 | v2 |
|---|---|---|
| Anti-Ban | ❌ | ✅ TLS fingerprint + CLI fingerprint |
| CLI Agents | ❌ | ✅ 14 auto-detected + custom |
| Sidebar | Flat list | ✅ CLI / Debug / System sections |
| Model Playground | ❌ | ✅ Monaco editor + streaming |
| Media | ❌ | ✅ Images, video, music |
| Themes | Default only | ✅ 7 presets + custom hex |
| MCP Server | ✅ 16 tools | ✅ Same + audit + heartbeat |
| A2A Protocol | ✅ | ✅ Same |
| Languages | 30 | 30 (+ RTL) |
| Auto-Combo | ❌ | ✅ 6-factor scoring engine |
