# Post 1: r/LocalLLaMA / r/SideProject (Main Launch)

**Subreddits:** r/LocalLLaMA (~600K), r/SideProject (~200K)
**Schedule:** Day 1 (Tuesday)

---

## 📌 REDDIT IMAGE GUIDE

**Where to add images on Reddit:**
1. When composing your post, click the **image icon** in the post editor
2. Add images inline using "Add Image" — Reddit supports up to 20 images per post
3. Best practice: Add the **hub diagram image** right after the title as the main visual, and the **free stack infographic** before the "how to start" section
4. Images to use (copy from this repo):
   - `docs/reddit-images/omniroute-hub-diagram.png` → Post as first image
   - `docs/reddit-images/free-stack-infographic.png` → Add before "Quick Start"

---

## Title:

```
I built a free AI router that unifies ALL your AI provider accounts into one endpoint — Gemini + Qoder + Kiro + Qwen = $0/month, automatic fallback, multi-account distribution
```

## Body:

```
## The problem I kept hitting

I was paying $80/month across 3 different AI subscriptions and STILL hitting rate limits mid-session. Meanwhile, I had multiple accounts I wasn't fully using — a personal Gemini CLI account and a work one, Kiro on two different AWS Builder IDs, Qoder (unlimited models), Qwen (unlimited).

The problem: each tool required its own config. Claude Code only talks to Anthropic. Codex only talks to OpenAI. You can't mix providers, and you can't pool multiple accounts of the same provider together. Every limit means a manual switch — breaking your flow.

## What I built: OmniRoute

It's a **free, open-source local app** that creates one OpenAI-compatible endpoint at `localhost:20128/v1`. Every AI tool connects there, and OmniRoute decides which account and provider to use.

[IMAGE: hub diagram showing OmniRoute connecting all providers]

## The free stack that actually works

    OmniRoute Free Stack ($0/month combo):
      Gemini CLI (Account A) → 180K tokens/month
      Gemini CLI (Account B) → 180K tokens/month  ← same provider, double the quota
      Qoder      → kimi-k2-thinking, qwen3-coder-plus, deepseek-r1 (UNLIMITED)
      Kiro       → Claude Sonnet 4.5 + Haiku (UNLIMITED via AWS Builder ID)
      Qwen       → 4 models (UNLIMITED)
      + Groq     → 14.4K req/day free
      + NVIDIA NIM → 70+ models, 40 RPM forever free

You configure this once as a "combo" in the dashboard. OmniRoute **distributes requests across all your accounts** using round-robin, least-used, or cost-optimized strategies. When one account hits its limit, it seamlessly moves to the next — within the same provider, or across to the next one in the chain.

**Your tools never see any of this — they just keep working.**

## Multi-account distribution: the part most people miss

OmniRoute supports **up to 10 OAuth accounts per provider**. If you have a personal and a work Gemini account, or your team each connected their own Kiro accounts, OmniRoute pools their quota together and distributes requests automatically.

It's not about having more accounts — it's about making the accounts you already have work together instead of being siloed.

    Team of 3 developers all connects their own Kiro account →
    OmniRoute distributes their shared workload across all 3 →
    When one is busy or slow, others absorb the load →
    Mix in Qoder (unlimited) as final fallback → never stop

## CLI Tool Integrations — Two Modes

OmniRoute works with your CLI tools in **two directions**:

**→ Redirect mode:** Point Claude Code, Codex, Antigravity, or any agent to `localhost:20128/v1` as their endpoint. They talk to OmniRoute, which handles provider routing, fallback, and cost tracking. Zero reconfiguration of the tools themselves.

```bash
ANTHROPIC_BASE_URL=http://localhost:20128 claude        # Claude Code → OmniRoute
OPENAI_BASE_URL=http://localhost:20128/v1 codex         # Codex → OmniRoute
# Antigravity: MITM proxy mode, works automatically
```

**← Proxy mode:** OmniRoute connects to your **existing paid CLI subscriptions** and uses them as provider tiers. Your Claude Pro, Codex Plus, Antigravity, GitHub Copilot — they become just another tier in your fallback chain, with multi-account pooling.

    Claude subscription tier → your paid Claude Pro/Max merged with teammates'
      ↓ when quota hit
    Codex subscription tier → your Codex Plus, distributed across 3 dev accounts
      ↓ when limit hit
    Kiro free tier          → unlimited, always available

**Supported CLI integrations:**
`Claude Code` • `OpenAI Codex` • `Antigravity` • `Cursor` • `Cline` • `GitHub Copilot` • `Continue` • `Kilo Code` • `OpenCode` • `Kiro IDE` • `Factory Droid` • `Open Claw`

## It's not just routing

- **API Key Management** — Issue scoped keys, restrict per model/provider, wildcard patterns (`claude/*`, `openai/*`)
- **4-Tier Smart Fallback** — Paid Subscription → API Keys → Cheap models → Free tiers. Automatic, configurable
- **6 Rotation Strategies** — Round-robin, least-used, cost-optimized, fill-first, P2C, random
- **Real-Time Cost + Quota Tracking** — Per account, per key, with reset countdowns
- **MCP Server (16 tools, 3 transports)** — stdio, SSE, Streamable HTTP. Control from any IDE
- **A2A Protocol** — JSON-RPC + SSE streaming agent-to-agent orchestration
- **Circuit Breakers** — Provider down? Auto-switch in <1s per model
- **Multi-Modal** — Same endpoint handles images, audio, TTS, video, music, embeddings
- **30 language dashboard** — RTL support for Arabic/Hebrew included

**Full provider list (50+):** OpenAI, Anthropic, Gemini, xAI Grok-4, DeepSeek, Groq, NVIDIA NIM, Mistral, Perplexity, Together AI, Fireworks, Cerebras, Cohere, Nebius, SiliconFlow, Hyperbolic, Blackbox AI, OpenRouter, Ollama Cloud, Z.AI (GLM-5), Kimi (Moonshot), MiniMax M2.5, Vertex AI, Deepgram, AssemblyAI, ElevenLabs, Cartesia, PlayHT, ComfyUI, SD WebUI, HuggingFace + free: Qoder, Qwen, Gemini CLI, Kiro.

## Quick start (2 commands)

    npm install -g omniroute
    omniroute

Dashboard at localhost:20128. Connect your accounts via OAuth in the Providers page. Create your free-stack combo. Point any AI tool to `localhost:20128/v1`.

Also available via Docker (AMD64 + ARM64) and native desktop app (Windows/macOS/Linux).

**GitHub:** https://github.com/diegosouzapw/OmniRoute
GPL-3.0. 100% open-source.
```

**Character count:** ~2,600 ✅
**Tone:** Problem-solving, feature-focused, multi-account distribution framed as team/quota pooling
