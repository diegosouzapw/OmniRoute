# Post 2: r/ChatGPTCoding / r/HustleGPT (Cost Focus)

**Subreddits:** r/ChatGPTCoding (~200K), r/HustleGPT (~98K)
**Schedule:** Day 1 (Tuesday) / Day 4 (Friday)

---

## 📌 REDDIT IMAGE GUIDE

**Images to post:**
1. **First image:** `free-stack-infographic.png` — shows the 4 free tiers and total cost = $0
2. **Second image:** `dashboard-apikey-management.png` — shows the dashboard with cost tracker at $0.00 and API key management

**How to add:** In Reddit post editor → click photo icon → upload images → they appear inline. Reddit allows up to 20 images per post in gallery or inline format.

---

## Title:

```
How I run AI coding tools for $0/month — OmniRoute pools Gemini + Qoder + Kiro + Qwen into one endpoint, distributes across accounts automatically, never hits limits
```

## Body:

```
## My actual $0 AI setup

I work full-time on side projects and the $60–120/month I was spending on AI subscriptions was adding up. I spent a few weeks building a solution and now I pay nothing.

Here's the specific free stack I run:

    Provider        | What you get           | Cost
    ----------------+------------------------+--------
    Gemini CLI ×2   | 180K tokens/month each | FREE
                    | (personal + work acct) | (360K/mo pooled)
    Qoder           | kimi-k2-thinking,      | FREE
                    | qwen3-coder-plus,      | (unlimited)
                    | deepseek-r1, minimax   |
    Kiro            | Claude Sonnet 4.5,     | FREE
                    | Claude Haiku 4.5       | (unlimited)
    Qwen            | 4 coding models        | FREE
                    |                        | (unlimited)
    Groq API        | llama/gemma/whisper    | FREE
                    |                        | (14.4K req/day)
    NVIDIA NIM      | 70+ open models        | FREE
                    |                        | (40 RPM forever)
    ----------------+------------------------+--------
    TOTAL                                   | $0/month

[IMAGE: free stack infographic showing all tiers]

## How it works (the tool I built)

**OmniRoute** is a local app that exposes one `localhost:20128/v1` endpoint. I point Cursor, Claude Code, and Codex CLI all to that single address.

The key feature: OmniRoute **groups all my accounts and distributes requests across them** using round-robin or least-used strategies. My two Gemini accounts share the load — when one is busy or nearing its daily limit, requests shift to the other. When both hit the monthly cap, OmniRoute falls to Qoder (unlimited). Qoder slow? → Kiro (real Claude, free).

My IDEs don't know any of this is happening. They just see one endpoint that works.

## If you already pay for subscriptions

OmniRoute makes them go much further:

    Claude Pro → when exhausted → DeepSeek ($0.28/1M) → Qoder (free) → Kiro (free Claude)

If you have Claude Pro on your personal account and Codex on your work account, OmniRoute can pool both — your agents use whichever has quota available, and fall to free when both are at capacity. **Zero waste, zero downtime.**

## What else it does

Beyond the routing and distribution, things that actually saved me time:

- 📊 **Dashboard** — See all accounts, live quota per account, cost per request, reset countdowns
- 🔑 **API Key Manager** — Issue keys with model/provider restrictions (share with teammates without sharing credentials)
- 🧠 **Semantic cache** — Repeated prompts = instant cached response, zero tokens burned
- 🔌 **Circuit breakers** — Provider down? <1s switch, no dropped requests
- 🔧 **MCP Server** — 16 tools to control everything from your IDE
- 🤖 **A2A Protocol** — Agent-to-agent orchestration, 14 CLI agents auto-detected
- 🖼️ **Multi-modal** — Images, audio, video, music, embeddings — same endpoint
- 🌍 **30 language UI** — Full dashboard translation including Arabic/Hebrew RTL

[IMAGE: dashboard showing $0.00 monthly cost and active providers]

## Get started

```bash
npm install -g omniroute
omniroute
```

Dashboard at http://localhost:20128. Connect your Gemini + Kiro + Qoder accounts via OAuth. Create your free-stack combo. Connect your tools.

**GitHub:** https://github.com/diegosouzapw/OmniRoute
Free, open-source (GPL-3.0).
```

**Character count:** ~2,400 ✅
**Tone:** Cost optimization focus, multi-account distribution as natural pooling of existing accounts
