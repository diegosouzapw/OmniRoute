# 🚀 Add OmniRoute to "More Choices" — A Full-Featured Fork Inspired by CLIProxyAPI

## 👋 Hello CLIProxyAPI Team!

First and foremost, **thank you** for creating CLIProxyAPI. Your project was the spark that lit the fire for an entire ecosystem of tools that make AI-powered coding accessible to everyone. The idea of a smart proxy that routes between providers — simple, elegant, and incredibly useful — inspired [9Router](https://github.com/decolua/9router) and, in turn, inspired us to build **[OmniRoute](https://github.com/diegosouzapw/OmniRoute)**.

We'd love to be added to the **"More choices"** section of your README.

---

## 🏗️ What is OmniRoute?

**OmniRoute** is a fork of [9Router](https://github.com/decolua/9router) that grew into a full-featured AI gateway. What started as small tweaks turned into a complete **100% TypeScript rewrite** with a massive feature expansion. We kept the spirit of CLIProxyAPI — _"never stop coding, route to the best provider"_ — and pushed it further in every direction.

**Website:** [omniroute.online](https://omniroute.online) • **npm:** [`omniroute`](https://www.npmjs.com/package/omniroute) • **Docker:** [`diegosouzapw/omniroute`](https://hub.docker.com/r/diegosouzapw/omniroute)

---

## 💡 Everything OmniRoute Brings to the Table

### 🧠 Core Routing & Intelligence

- **Smart 4-Tier Auto-Fallback** — Subscription → API Key → Cheap → Free (9Router has 3 tiers)
- **36+ Providers** — Claude Code, Codex, Gemini CLI, GitHub Copilot, NVIDIA NIM, DeepSeek, Groq, xAI, Mistral, OpenRouter, GLM, MiniMax, Kimi, Qoder, Qwen, Kiro, and more
- **6 Combo Routing Strategies** — fill-first, round-robin, power-of-two-choices, random, least-used, cost-optimized (9Router has basic priority)
- **Format Translation (5 formats)** — OpenAI ↔ Claude ↔ Gemini ↔ Responses API ↔ Cursor, with response sanitization, role normalization, think-tag extraction, and structured output conversion
- **Full Responses API** — `/v1/responses` endpoint for Codex compatibility
- **Wildcard Router** — Route `provider/*` patterns dynamically to any provider
- **Thinking Budget** — Passthrough, auto, custom, and adaptive modes for reasoning models
- **System Prompt Injection** — Global system prompt applied across all requests
- **Custom Models** — Add any model ID to any provider

### 🎵 Multi-Modal APIs (Not present in 9Router)

- 🖼️ **Image Generation** — `/v1/images/generations` with 4 providers and 9+ models
- 📐 **Embeddings** — `/v1/embeddings` with 6 providers and 9+ models
- 🎤 **Audio Transcription** — `/v1/audio/transcriptions` (Whisper-compatible)
- 🔊 **Text-to-Speech** — `/v1/audio/speech` with multi-provider audio synthesis
- 🛡️ **Moderations** — `/v1/moderations` for content safety
- 🔀 **Reranking** — `/v1/rerank` for document relevance

### 🛡️ Resilience & Security (Advanced features not in 9Router)

- 🔌 **Circuit Breaker** — Auto open/close per provider with configurable thresholds
- 🛡️ **Anti-Thundering Herd** — Mutex + semaphore rate limiting for API key providers
- 🧠 **Semantic Cache** — Two-tier cache (signature + semantic) to reduce cost & latency
- ⚡ **Request Idempotency** — 5-second deduplication window
- 🔒 **TLS Fingerprint Spoofing** — Bypass TLS-based bot detection
- 🌐 **IP Filtering** — Allowlist/blocklist for API access control
- 📊 **Editable Rate Limits** — Configurable RPM, min gap, and max concurrent

### 📊 Observability & Analytics (Greatly expanded vs. 9Router)

- 📊 **Analytics Dashboard** — Recharts-powered: stat cards, model usage chart, provider table
- 🏥 **Health Dashboard** — System uptime, circuit breaker states, lockouts, cache stats, latency telemetry (p50/p95/p99)
- 🧪 **LLM Evaluations** — Golden set testing with 4 match strategies (exact, contains, regex, custom)
- 💾 **SQLite Proxy Logs** — Persistent proxy logs survive server restarts
- 📈 **Progress Tracking** — Opt-in SSE progress events for streaming
- 🔍 **Request Telemetry** — Full tracing with X-Request-Id
- 💰 **Cost Tracking** — Budget management + per-model pricing configuration

### 🔧 Dashboard & UX (Major improvements)

- 🔧 **Translator Playground** — 4 modes: Playground (format translation), Chat Tester (round-trip testing), Test Bench (batch testing), Live Monitor (real-time request watching)
- 🧙 **Onboarding Wizard** — 4-step guided setup for first-time users
- 🔧 **CLI Tools Dashboard** — One-click configure Claude, Codex, Cline, OpenClaw, Kilo, Antigravity
- 🔄 **DB Backups** — Automatic backup, restore, export & import for all settings
- 📋 **Dedicated Request Logs & Quotas pages** — Separate views for browsing logs and tracking limits

### 🏗️ Engineering & Quality

- **100% TypeScript** across `src/` and `open-sse/`
- **368+ Unit Tests** — Node.js test runner
- **CI/CD** — GitHub Actions with auto npm publish + Docker Hub on release
- **Next.js 16 + React 19 + Tailwind CSS 4**
- **LowDB (JSON) + SQLite** for domain state and proxy logs
- **OAuth 2.0 (PKCE) + JWT + API Keys** auth
- **Multilingual README** — English, Português, Español, Русский, 中文, Deutsch, Français, Italiano

### 🗺️ 217 Features Planned for Upcoming Releases

We have **217 detailed feature specifications** already written and ready for the next development phases, including:

- 🧠 25+ routing & intelligence features (lowest-latency routing, tag-based routing, quota preflight)
- 🔒 20+ security & compliance features (SSRF hardening, credential cloaking)
- 📊 15+ observability features (OpenTelemetry, real-time quota monitoring)
- 🔄 20+ provider integrations (dynamic model registry, provider cooldowns)
- ⚡ 15+ performance features (dual cache layer, batch API, streaming keepalive)
- 🌐 10+ ecosystem features (WebSocket API, config hot-reload, commercial mode)

---

## 🆚 Quick Comparison: OmniRoute vs. 9Router

| Feature               | 9Router      | OmniRoute                                                                |
| --------------------- | ------------ | ------------------------------------------------------------------------ |
| Fallback tiers        | 3            | **4** (+ API Key tier)                                                   |
| Providers             | ~10          | **36+**                                                                  |
| Combo strategies      | 1 (priority) | **6** (fill-first, round-robin, P2C, random, least-used, cost-optimized) |
| Format translation    | 4 formats    | **5 formats** + sanitization, role normalization, think-tag extraction   |
| Multi-modal APIs      | ❌           | ✅ Images, Embeddings, Audio, TTS, Moderations, Reranking                |
| Circuit breaker       | ❌           | ✅                                                                       |
| Semantic cache        | ❌           | ✅ Two-tier                                                              |
| TLS spoofing          | ❌           | ✅                                                                       |
| Anti-thundering herd  | ❌           | ✅                                                                       |
| LLM evaluations       | ❌           | ✅ Golden set + 4 strategies                                             |
| Health dashboard      | ❌           | ✅ Full observability                                                    |
| Translator playground | ❌           | ✅ 4 modes                                                               |
| Responses API         | ❌           | ✅ `/v1/responses`                                                       |
| Thinking budget       | ❌           | ✅ 4 modes                                                               |
| Onboarding wizard     | ❌           | ✅                                                                       |
| Unit tests            | —            | **368+**                                                                 |
| TypeScript coverage   | Partial      | **100%**                                                                 |
| npm package           | ✅           | ✅ `omniroute`                                                           |
| Docker Hub            | ❌           | ✅ `diegosouzapw/omniroute`                                              |
| Multilingual docs     | ❌           | ✅ 8 languages                                                           |
| Planned features      | —            | **217 specs**                                                            |

---

## 📸 A Glimpse of OmniRoute

We built this product with love, inspired by your vision. Here are some screenshots of what we created:

| Page               | Screenshot                                                                                                          |
| ------------------ | ------------------------------------------------------------------------------------------------------------------- |
| **Main Dashboard** | ![Main Dashboard](https://raw.githubusercontent.com/diegosouzapw/OmniRoute/main/docs/screenshots/MainOmniRoute.png) |
| **Providers**      | ![Providers](https://raw.githubusercontent.com/diegosouzapw/OmniRoute/main/docs/screenshots/01-providers.png)       |
| **Combos**         | ![Combos](https://raw.githubusercontent.com/diegosouzapw/OmniRoute/main/docs/screenshots/02-combos.png)             |
| **Analytics**      | ![Analytics](https://raw.githubusercontent.com/diegosouzapw/OmniRoute/main/docs/screenshots/03-analytics.png)       |
| **Health**         | ![Health](https://raw.githubusercontent.com/diegosouzapw/OmniRoute/main/docs/screenshots/04-health.png)             |
| **Translator**     | ![Translator](https://raw.githubusercontent.com/diegosouzapw/OmniRoute/main/docs/screenshots/05-translator.png)     |
| **Settings**       | ![Settings](https://raw.githubusercontent.com/diegosouzapw/OmniRoute/main/docs/screenshots/06-settings.png)         |
| **CLI Tools**      | ![CLI Tools](https://raw.githubusercontent.com/diegosouzapw/OmniRoute/main/docs/screenshots/07-cli-tools.png)       |
| **Usage Logs**     | ![Usage Logs](https://raw.githubusercontent.com/diegosouzapw/OmniRoute/main/docs/screenshots/08-usage.png)          |
| **Endpoint**       | ![Endpoint](https://raw.githubusercontent.com/diegosouzapw/OmniRoute/main/docs/screenshots/09-endpoint.png)         |

---

## 🙏 Thank You

CLIProxyAPI wasn't just a tool — it was a **blueprint**. The idea that developers could route between AI providers seamlessly, without paying for overpriced API keys, changed the game. Your project planted the seed, 9Router nurtured it, and OmniRoute is our contribution to growing this ecosystem even further.

We hope this PR earns a spot on your "More choices" list. Thank you for everything! 🎉

---

**Suggested entry for the README:**

> **[OmniRoute](https://github.com/diegosouzapw/OmniRoute)**
> A full-featured Next.js fork of [9Router](https://github.com/decolua/9router) inspired by CLIProxyAPI, rewritten to 100% TypeScript with a massive feature expansion. Includes smart 4-tier auto-fallback (Subscription → API Key → Cheap → Free), format translation across 5 API formats (OpenAI/Claude/Gemini/Responses API/Cursor), support for 36+ providers, and full multi-modal APIs — image generation, embeddings, audio transcription, text-to-speech, moderations, and reranking. Features a production-grade resilience layer with circuit breaker, semantic cache, anti-thundering herd, TLS fingerprint spoofing, and request idempotency. Ships with a polished Next.js dashboard including a translator playground (4 modes), health monitoring, LLM evaluations framework, analytics with cost tracking, editable rate limits, and an onboarding wizard. Supports 6 combo routing strategies (fill-first, round-robin, P2C, random, least-used, cost-optimized), thinking budget control for reasoning models, wildcard routing, system prompt injection, and 368+ unit tests. Available via npm (`omniroute`), Docker Hub, and VPS deployment. Compatible with Claude Code, Codex, Gemini CLI, Cursor, Cline, OpenClaw, Kilo Code, and more — no API keys needed. 217 additional features planned for upcoming releases.
