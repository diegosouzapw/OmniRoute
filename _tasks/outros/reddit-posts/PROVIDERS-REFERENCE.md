# OmniRoute — Complete Provider & CLI Integration Reference

> This document lists all supported providers and CLI tools for use in Reddit posts, documentation, and marketing materials.

---

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
```

---

*This document is auto-generated from `src/shared/constants/providers.ts` and `src/shared/constants/cliTools.ts`. Last updated: March 2026.*
