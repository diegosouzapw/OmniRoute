# Post 4: r/opensource (Community Angle)

**Subreddit:** r/opensource (~100K)
**Schedule:** Day 2 (Wednesday)

---

## 📌 REDDIT IMAGE GUIDE

**Images to post:**
1. **First image:** `omniroute-hub-diagram.png` — the multi-provider hub visualization
2. **Second image:** `dashboard-apikey-management.png` — shows the management dashboard and API key system

**How to add:** Click the photo icon in the Reddit post editor → upload in order → they appear inline in the body where you place them.

---

## Title:

```
[Project] OmniRoute — free open-source AI gateway, one endpoint for 44+ providers, multi-account pooling, smart fallback, MCP server + A2A protocol [GPL-3.0]
```

## Body:

```
Hey everyone! Sharing OmniRoute — a project I've been building for the past year.

## What it does

**OmniRoute** is a self-hosted AI gateway that acts as a unified proxy for all your AI providers. One OpenAI-compatible endpoint (`localhost:20128/v1`), intelligently routing requests across 44+ providers with automatic fallback, multi-account distribution, cost tracking, and a full management dashboard.

[IMAGE: hub diagram showing all providers connected through OmniRoute]

## Why I built it

The problem I kept running into: I had multiple AI subscriptions and free accounts, but each tool only talks to one provider. Claude Code only to Anthropic, Codex only to OpenAI. When one hits a limit, you manually switch. This breaks your flow.

I wanted a solution that:
1. Aggregates all my AI accounts behind one endpoint
2. Distributes requests across multiple accounts of the same provider automatically
3. Falls back to the next provider tier when all accounts in a tier are exhausted
4. Gives real visibility into what I'm spending and using
5. Has proper API key management for teams

## What makes it different from other gateways

Most open-source AI gateways are simple proxies. OmniRoute is a full management platform:

**🔀 Multi-Account Distribution per Provider**
You can connect multiple OAuth accounts for the same provider. OmniRoute distributes requests across them using round-robin, least-used, or cost-optimized strategies. If your team each has a Gemini CLI or Kiro account, OmniRoute pools their quotas together — when one is exhausted or slow, the others absorb the load. Mix in unlimited free providers and sessions never stop.

**🆓 Free Stack Built-in**
Native support for providers that are genuinely free:
- Kiro (AWS Builder ID OAuth) → Claude Sonnet/Haiku, unlimited
- Qoder (Google OAuth) → kimi-k2-thinking, deepseek-r1, qwen3-coder-plus, unlimited
- Qwen (Device Code) → 4 models, unlimited
- Gemini CLI (Google OAuth) → 180K tokens/month (pool across multiple accounts)
- NVIDIA NIM → 70+ models, 40 RPM, dev-forever free
- Groq → 14.4K req/day free

**🔑 API Key Management with Scoped Permissions**
Generate keys with model/provider restrictions. Wildcard patterns (`openai/*`, `claude/*`). Track usage per key. Manage team access levels. This is the piece most personal gateways skip.

[IMAGE: dashboard showing API key manager and management features]

**🔄 Smart 4-Tier Fallback**
Configure chains: Paid Subscription → API Key → Cheap → Free. All automatic, configurable per-combo. Multiple accounts per tier extend how long each tier lasts before falling to the next.

**🤖 Agent Protocols**
- MCP Server (16 tools, 3 transports: stdio/SSE/HTTP) — control from IDE
- A2A Protocol (JSON-RPC + SSE streaming) — agent-to-agent orchestration

**📊 Full Observability**
Real-time quota per account, cost analytics, request logs, health dashboard, circuit breakers, p50/p95/p99 latency per provider.

**🖼️ Multi-Modal**
Not just chat: images, video, music, audio transcription, TTS, embeddings, reranking, moderations.

## The goal: never stop coding, never overpay

Multi-account pooling + provider fallback means:
- Sessions span across your accounts and providers without interruption
- Expensive quota gets used first, free absorbs the overflow
- Full visibility into every account's quota and cost

## Looking for

- Contributors for new provider integrations (executor + translator)
- Bug reports from teams using OmniRoute in production
- Feedback on the MCP/A2A protocol implementations
- Ideas for better distribution/routing strategies

## Get started

```bash
npm install -g omniroute
omniroute
```

Dashboard at `http://localhost:20128`. Or run via Docker (AMD64 + ARM64), or the desktop Electron app (Windows/macOS/Linux).

**GitHub:** https://github.com/diegosouzapw/OmniRoute
**License:** GPL-3.0
```

**Character count:** ~2,400 ✅
**Tone:** Open-source community focus, multi-account pooling as a distribution/team feature, contribution-oriented
