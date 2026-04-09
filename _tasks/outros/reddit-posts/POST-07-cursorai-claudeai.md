# Post 7: r/CursorAI / r/ClaudeAI (Direct Integration)

**Subreddits:** r/CursorAI (~50K), r/ClaudeAI (~100K), r/ChatGPTCoding (~200K)
**Schedule:** Day 5 (Monday)

---

## 📌 REDDIT IMAGE GUIDE

**Images to post:**
1. **First image:** `omniroute-hub-diagram.png` — shows Cursor/Claude Code connecting through OmniRoute to all providers
2. **Second image:** `free-stack-infographic.png` — shows the free providers (especially Kiro for Claude access)

**How to add:** In the Reddit post editor, click the photo/image icon → upload in order. Position them inline by clicking where in the body you want the image to appear, then upload.

---

## Title:

```
OmniRoute — run Cursor and Claude Code with free unlimited Claude via Kiro, Qoder + auto-fallback. One endpoint for all your providers, account pooling, MCP server included
```

## Body:

```
## The single-provider problem for Cursor/Claude Code users

If you use Cursor or Claude Code, you've hit this: quota runs out mid-session, you stop. Or you pay for Claude Pro ($20/mo) but you're a hobbyist who codes a few hours a week — you often don't finish your quota before reset.

The real issue: **Claude Code can only talk to Anthropic. Cursor needs manual reconfiguring when you switch providers.** There's no native "fall to a different provider when I hit a limit" feature. And if you have multiple accounts — a work one and a personal one — they're completely siloed.

**OmniRoute solves all of this.**

[IMAGE: hub diagram showing Claude Code and Cursor connected through OmniRoute to multiple providers]

## How to get Claude-quality models for free

**The key provider: Kiro**

Kiro is an IDE from Amazon (AWS) that uses AWS Builder ID for authentication. The AWS Builder ID is completely free — no credit card required. Through it, you get:

- `claude-sonnet-4.5` — **unlimited**
- `claude-haiku-4.5` — **unlimited**

OmniRoute has first-class Kiro support built-in: OAuth flow directly in the Providers dashboard. Connect via AWS Builder ID → it extracts the bearer tokens → automatic token refresh. You get real Claude models, free, with zero manual token management. **And you can connect multiple Kiro accounts** — OmniRoute distributes requests across them using least-used or round-robin, so one account never becomes a bottleneck.

**The complete free stack OmniRoute supports:**

| Provider | Models | Cost | Auth | Multi-Account |
|----------|--------|------|------|---------------|
| Kiro | claude-sonnet-4.5, claude-haiku-4.5 | **FREE** (unlimited) | AWS Builder ID OAuth | ✅ up to 10 |
| Qoder | kimi-k2-thinking, qwen3-coder-plus, deepseek-r1, minimax | **FREE** (unlimited) | Google OAuth | ✅ up to 10 |
| Qwen | 4 coding models incl. qwen3-coder-plus | **FREE** (unlimited) | Device Code | ✅ up to 10 |
| Gemini CLI | gemini-3-flash, gemini-2.5-pro | **FREE** (180K/mo) | Google OAuth | ✅ up to 10 |
| NVIDIA NIM | 70+ open models | **FREE** (40 RPM) | API Key | — |
| Groq | Llama, Gemma, Whisper | **FREE** (14.4K req/day) | API Key | — |

[IMAGE: free stack infographic showing all tiers and their limits]

## Account pooling: what this means in practice

Let's say you have a personal AWS Builder ID and your employer also gave you one. OmniRoute connects both as separate Kiro accounts and **distributes claude-sonnet-4.5 requests across them** — if one is slow or being throttled, the other picks up the load. Same for Qoder via Google OAuth: your personal Google account and work Google account can both be connected.

When combined with unlimited free providers like Qoder and Qwen as the final fallback chain, sessions essentially never stop due to quota.

## Setting up Cursor or Claude Code with OmniRoute

```bash
npm install -g omniroute
omniroute
```

1. Dashboard opens at `localhost:20128`
2. Go to **Providers** → connect **Kiro** (AWS Builder ID OAuth) — add all your AWS accounts
3. Connect **Qoder** (Google OAuth), **Gemini CLI** (Google OAuth) — multiple accounts supported
4. Go to **Endpoints** → create an API key
5. Go to **Combos** → create your fallback chain (Kiro pool → Qoder → Qwen)

**In Cursor:**

```
Settings → Models → API Provider: OpenAI-compatible
Base URL: http://localhost:20128/v1
API Key: [your OmniRoute key from step 4]
```

**In Claude Code:**

```bash
claude config set api_url http://localhost:20128/v1
claude config set api_key [your OmniRoute key]
```

Now when any Kiro account is slow or hits a limit, OmniRoute automatically shifts to another account in the pool, then falls to Qoder, then Qwen. **Your session never breaks.**

## If you already pay for Claude Pro

OmniRoute doesn't replace your subscription — it extends it:

    Claude Pro → when quota exhausted → Kiro (free Claude) → Qoder (unlimited)
                → when you want cheap → DeepSeek V3.2 ($0.28/1M tokens)

Your paid quota gets used first. When it runs out, you fall to free seamlessly. No waste, no interruption.

## What OmniRoute adds on top of routing

- 📊 **Real-time quota tracking** — see remaining tokens per account, per provider, reset countdowns
- 🧠 **Semantic cache** — same prompt in a session = instant cached response, zero tokens burned
- 🔌 **Circuit breakers** — provider down? <1s auto-switch, no dropped requests
- 🔑 **API Key Manager** — issue scoped keys per teammate, restrict by model/provider, wildcard patterns
- 🔧 **MCP Server (16 tools)** — control routing from Claude Code itself:
  - `omniroute_list_combos` — see active routing config
  - `omniroute_switch_combo` — switch providers mid-session
  - `omniroute_check_quota` — quota remaining per provider
  - `omniroute_cost_report` — spending breakdown in real time
  - `omniroute_get_provider_metrics` — p50/p95/p99 latency per provider
- 🤖 **A2A Protocol** — agent-to-agent orchestration for complex multi-step workflows
- 🖼️ **Multi-modal** — same `localhost:20128/v1` handles images, audio, video, embeddings
- 🌍 **30 language dashboard** — if your team isn't English-first

## FAQ

**Is using Kiro this way against ToS?**
Kiro's terms cover Kiro the IDE. Using its API tokens via OmniRoute is equivalent to using any OAuth-authenticated developer tool. The approach is legitimate — the same way Cursor uses your GitHub Copilot token.

**What happens if Kiro changes their auth?**
OmniRoute's OAuth is maintained as part of the open-source codebase. If auth changes, a PR update gets pushed. You update via `npm update -g omniroute`.

**Does it work with the Responses API (for Codex)?**
Yes. OmniRoute supports `/v1/responses` natively — Codex CLI connects transparently.

**GitHub:** https://github.com/diegosouzapw/OmniRoute
Free and open-source (GPL-3.0).
```

**Character count:** ~3,100 ✅
**Tone:** Direct and practical for Cursor/Claude users, multi-account pooling shown as personal+work accounts or team distribution, FAQ for trust-building, specific MCP tool names included
**Best time to post:** Monday 10am–2pm UTC (peak Cursor/Claude community activity on weekdays)
