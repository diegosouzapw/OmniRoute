<!-- SEO Meta Tags -->
<meta name="description" content="Unified AI proxy/router with 177+ providers, Auto-Combo intelligent routing, RTK+Caveman compression (15-95% savings), MCP server (37 tools), A2A protocol, and auto-fallback to FREE & low-cost AI models.">
<meta name="keywords" content="AI gateway, LLM router, OpenAI proxy, Anthropic proxy, multi-provider AI, free AI API, prompt compression, token optimization, ChatGPT alternative, Claude API gateway, OmniRoute, Auto-Combo, MCP server, A2A protocol">

<!-- OpenGraph -->
<meta property="og:type" content="website">
<meta property="og:title" content="OmniRoute — The Free AI Gateway">
<meta property="og:description" content="One endpoint, 177+ providers, 14 routing strategies, auto-fallback to free models. RTK+Caveman compression saves 15-95% tokens.">
<meta property="og:url" content="https://github.com/diegosouzapw/OmniRoute">
<meta property="og:image" content="https://raw.githubusercontent.com/diegosouzapw/OmniRoute/main/docs/screenshots/MainOmniRoute.png">
<meta property="og:site_name" content="OmniRoute">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="OmniRoute — The Free AI Gateway">
<meta name="twitter:description" content="One endpoint, 177+ providers, auto-fallback to FREE models. Open-source. Self-hosted. MIT.">
<meta name="twitter:image" content="https://raw.githubusercontent.com/diegosouzapw/OmniRoute/main/docs/screenshots/MainOmniRoute.png">

<!-- JSON-LD Schema -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "OmniRoute",
  "applicationCategory": "DeveloperApplication",
  "operatingSystem": "Windows, macOS, Linux, Android (Termux)",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "description": "Unified AI proxy/router with 177+ providers, Auto-Combo 9-factor routing, RTK+Caveman compression, MCP/A2A protocols, and auto-fallback to FREE models.",
  "url": "https://github.com/diegosouzapw/OmniRoute",
  "softwareVersion": "3.8.0",
  "author": { "@type": "Person", "name": "Diego Souza" },
  "license": "https://github.com/diegosouzapw/OmniRoute/blob/main/LICENSE",
  "downloadUrl": "https://www.npmjs.com/package/omniroute",
  "features": [
    "177+ AI providers",
    "Auto-Combo zero-config routing",
    "RTK + Caveman prompt compression",
    "Auto-fallback with circuit breaker",
    "MCP Server (37 tools, 3 transports)",
    "A2A Protocol (v0.3, 5 skills)",
    "Cloud Agents (Codex Cloud, Devin, Jules)",
    "Memory + Skills + Webhooks + Guardrails",
    "30+ language UI translations",
    "Desktop (Electron 41) + PWA + Termux"
  ]
}
</script>

<div align="center">

# 🚀 OmniRoute

### **The Free AI Gateway — one endpoint, 177+ providers, zero downtime.**

**Auto-fallback to free models. Stop coding interruptions. Cut tokens 15-95%.**

[![npm](https://img.shields.io/npm/v/omniroute?logo=npm&style=flat-square)](https://www.npmjs.com/package/omniroute)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)
[![Node](https://img.shields.io/badge/node-%E2%89%A520.20.2-brightgreen?style=flat-square)](package.json)
[![Stars](https://img.shields.io/github/stars/diegosouzapw/OmniRoute?style=social)](https://github.com/diegosouzapw/OmniRoute)
[![Trendshift](https://trendshift.io/api/badge/repositories/23589)](https://trendshift.io/repositories/23589)

[**Website**](https://omniroute.online) · [**Quick Start**](#-quick-start) · [**Docs**](#-documentation) · [**Discord/WhatsApp**](#-community)

<sub>v3.8.0 · MIT · Production-ready · Self-hosted</sub>

</div>

---

## ⚡ The Pitch (60 seconds)

| 🎯 The problem                 | ✅ How OmniRoute solves it                                                                         |
| ------------------------------ | -------------------------------------------------------------------------------------------------- |
| Hit rate limits on Claude/GPT? | **Auto-fallback** across 177 providers — never see a 429 again                                     |
| Bored of switching API keys?   | **One endpoint** (`localhost:20128`) speaks OpenAI, Anthropic, Gemini, Claude Code, Cursor formats |
| Paying $200/mo for AI?         | **11 free providers** + intelligent routing → most users pay $0                                    |
| Tokens too expensive?          | **RTK + Caveman compression** saves 15-95% on eligible payloads                                    |
| Blocked region?                | **4-level proxy** (account/provider/combo/global) + **1proxy free marketplace**                    |
| Want CLI agents free?          | Plug **Cursor, Cline, Codex, Claude Code, Aider, 15+ CLIs** at OmniRoute                           |

📺 **Watch in action:** [Video demo](https://www.youtube.com/@diegosouza-pw)

---

## 🖼️ Dashboard Preview

![OmniRoute Main Dashboard](docs/screenshots/MainOmniRoute.png)

<details>
<summary><b>Click for more screenshots</b> (Providers, Combos, Memory, MCP, Audit…)</summary>

|                                               |                                                      |
| --------------------------------------------- | ---------------------------------------------------- |
| ![Providers](docs/screenshots/Provedores.png) | ![Combos](docs/screenshots/Combos.png)               |
| ![Routing](docs/screenshots/Roteamento.png)   | ![Compression](docs/screenshots/Compress%C3%A3o.png) |
| ![Audit](docs/screenshots/Auditoria.png)      | ![Analytics](docs/screenshots/Analytics.png)         |

</details>

---

## ⚡ Quick Start

```bash
# Run instantly (npx — no install needed)
npx -y omniroute@latest

# Or install globally
npm install -g omniroute && omniroute

# Or via Docker
docker run -d -p 20128:20128 diegosouzapw/omniroute:3.8.0
```

→ Open **http://localhost:20128** → login with `admin` / `CHANGEME` → connect your first provider via OAuth or API key.

**Point any OpenAI-compatible client at OmniRoute:**

```bash
export OPENAI_BASE_URL=http://localhost:20128/v1
export OPENAI_API_KEY=or_<your-omniroute-key>
```

That's it. Cursor, Cline, Codex, Continue, Aider, and any SDK now work. → Detailed setup: [`docs/SETUP_GUIDE.md`](docs/SETUP_GUIDE.md)

---

## 🌟 What's new in v3.8.0

- 🤖 **Auto-Combo zero-config routing** — just use `auto/coding`, `auto/cheap`, `auto/fast`, `auto/offline`, `auto/smart`, `auto/lkgp` as model IDs
- 🎯 **Manifest-aware tier routing W1-W4** — automatic tier prioritization
- 🆕 **Command Code provider** + **Z.AI quota labels** + **KIE video expansion**
- 🔐 **Windsurf + Devin CLI + GitLab Duo OAuth** flows
- 🆓 **9 new free providers**: LLM7, Lepton, Kluster, UncloseAI, BazaarLink, Completions, Enally, FreeTheAi, AgentRouter ($200 credits)
- 🩺 **Model Cooldowns dashboard** with manual re-enable
- 🎨 **Cursor full OpenAI parity** (tools, streaming, sessions)
- 📌 **Per-session sticky routing** for Codex
- 🔊 **Inworld TTS** enhancements
- 🧠 **Reasoning Replay Cache** — fixes 400s on DeepSeek V4, Kimi K2, Qwen-Thinking, GLM
- 🔄 **Reset-aware routing** strategy (14th strategy)
- 🛠️ **20+ new CLI commands** (`omniroute setup/doctor/providers/combos`)

→ Full changelog: [`CHANGELOG.md`](CHANGELOG.md)

---

## 🎯 Why OmniRoute Wins

|                    | OmniRoute v3.8      | LiteLLM          | OpenRouter    |
| ------------------ | ------------------- | ---------------- | ------------- |
| Providers          | **177+**            | ~50              | ~50           |
| Free providers     | **11**              | 0                | 0             |
| OAuth providers    | **14**              | 0                | 1             |
| Routing strategies | **14**              | 3                | 1             |
| Auto routing       | ✅ 9-factor scoring | ❌               | ❌            |
| Prompt compression | ✅ RTK + Caveman    | ❌               | ❌            |
| MCP server         | ✅ 37 tools         | ❌               | ❌            |
| A2A protocol       | ✅ v0.3 + 5 skills  | ❌               | ❌            |
| Desktop app        | ✅ Electron 41      | ❌               | ❌            |
| PWA                | ✅                  | ❌               | ❌            |
| Self-hosted        | ✅ MIT              | Limited          | ❌ (cloud)    |
| Pricing            | **$0 forever**      | OSS / Cloud paid | 10% fee + API |

→ Detailed comparison: [`docs/FEATURES.md`](docs/FEATURES.md)

---

## 🛠️ Compatible CLI Tools (17+)

All work out-of-the-box once you point `OPENAI_BASE_URL` at OmniRoute:

**Claude family:** Claude Code · Cline · Continue · Kilo Code · Kimi Coding
**OpenAI family:** Codex CLI · Cursor · Aider · OpenClaw · Droid · AMP
**Google family:** Gemini CLI · Antigravity · Jules
**Others:** Windsurf · GitLab Duo · Devin CLI · Hermes · Amazon Q · Kiro · Qoder · Custom

→ Full setup: [`docs/CLI-TOOLS.md`](docs/CLI-TOOLS.md)

---

## 🌐 Providers (177+)

### 🆓 Free providers (11 — no API key or unlimited tier)

| Provider                                            | Highlight                               |
| --------------------------------------------------- | --------------------------------------- |
| **Kiro AI**                                         | 50 credits/month (Claude Sonnet/Haiku)  |
| **Qoder AI**                                        | Unlimited (Kimi-K2, Qwen3, DeepSeek-R1) |
| **Gemini CLI**                                      | 180K tokens/month                       |
| **Amazon Q**                                        | AWS Builder ID OAuth                    |
| **LongCat**                                         | 50M tokens/day                          |
| **Pollinations**                                    | No API key, GPT-5 + Claude              |
| **AgentRouter**                                     | $200 free credits                       |
| **LLM7** · **Lepton** · **Kluster** · **UncloseAI** | New v3.8 free tiers                     |

⚠️ Qwen Code OAuth was **discontinued on 2026-04-15** (use API key with `alicode` provider instead).

→ Curated guide: [`docs/FREE_TIERS.md`](docs/FREE_TIERS.md) · Full catalog: [`docs/PROVIDER_REFERENCE.md`](docs/PROVIDER_REFERENCE.md) (auto-generated)

### 🔐 OAuth providers (14)

Claude Code · Codex · GitHub Copilot · Cursor · Antigravity · Gemini · Kimi Coding · Kilo Code · Cline · Qwen · Kiro · Qoder · Windsurf · GitLab Duo

### 🔑 API key providers (~123)

OpenAI · Anthropic · Google · Mistral · Cohere · DeepSeek · Groq · Together · Fireworks · Cerebras · SambaNova · NVIDIA NIM · Bedrock · Vertex · Azure · Cloudflare AI · 100+ more.

### 🏠 Self-hosted (10)

Ollama · LM Studio · vLLM · Llamafile · Lemonade · Petals · Triton · Docker Model Runner · Xinference · Oobabooga

---

## 🤖 Auto-Combo — Zero-Config Routing

Just use `auto/<variant>` as model ID. No combo setup needed.

```bash
# 6 variants + plain `auto`:
auto/coding    # → optimized for coding tasks
auto/cheap     # → minimize cost
auto/fast      # → minimize latency
auto/offline   # → prefer local providers
auto/smart     # → prefer top-tier models
auto/lkgp      # → Last-Known-Good-Path (sticky)
auto           # → balanced default
```

**How it picks:** 9-factor scoring (health · quota · cost · latency · taskFit · stability · tierPriority · tierAffinity · specificityMatch) over a virtual candidate pool built from all enabled providers.

→ Full guide: [`docs/AUTO-COMBO.md`](docs/AUTO-COMBO.md)

---

## 🗜️ Prompt Compression — Save 15-95% Tokens

Two engines, stackable:

- **Caveman** — natural-language condensation (filler removal, hedging, repeated context). 30+ regex rules per language pack (en, es, pt-BR, de, fr, ja).
- **RTK** — terminal/shell/git/test output. 49 declarative filters.

**Modes:** `off` · `lite` · `standard` · `aggressive` · `ultra` · `rtk` · `stacked` (RTK→Caveman, max savings).

→ [`docs/COMPRESSION_GUIDE.md`](docs/COMPRESSION_GUIDE.md) · [`docs/RTK_COMPRESSION.md`](docs/RTK_COMPRESSION.md) · [`docs/COMPRESSION_LANGUAGE_PACKS.md`](docs/COMPRESSION_LANGUAGE_PACKS.md)

---

## 🌍 Bypass Geographic Blocks

For users in **Russia, China, Iran, Cuba, Turkey** and other regions:

- **4-level outbound proxy** — account / provider / combo / global scopes
- **1proxy free marketplace** — auto-syncs working HTTP/SOCKS5 proxies
- **Anti-detection** — TLS fingerprinting (JA3/JA4), CCH headshakes, header sanitization
- **Public tunnels** — Cloudflare (Quick or Named), ngrok, Tailscale Funnel for OAuth callbacks

→ [`docs/PROXY_GUIDE.md`](docs/PROXY_GUIDE.md) · [`docs/TUNNELS_GUIDE.md`](docs/TUNNELS_GUIDE.md) · [`docs/STEALTH_GUIDE.md`](docs/STEALTH_GUIDE.md)

---

## 📱 Multi-Platform

| Platform                    | Install                                                  | Doc                                                             |
| --------------------------- | -------------------------------------------------------- | --------------------------------------------------------------- |
| **CLI / Server**            | `npm install -g omniroute`                               | [`SETUP_GUIDE.md`](docs/SETUP_GUIDE.md)                         |
| **Desktop (Win/Mac/Linux)** | Electron installer from GitHub Releases                  | [`ELECTRON_GUIDE.md`](docs/ELECTRON_GUIDE.md)                   |
| **PWA**                     | Install from any modern browser                          | [`PWA_GUIDE.md`](docs/PWA_GUIDE.md)                             |
| **Android (Termux)**        | `pkg install nodejs-lts && npm i -g omniroute`           | [`TERMUX_GUIDE.md`](docs/TERMUX_GUIDE.md)                       |
| **Docker**                  | `docker compose up` (base/cli/host/cliproxyapi profiles) | [`DOCKER_GUIDE.md`](docs/DOCKER_GUIDE.md)                       |
| **VM / VPS**                | Generic Ubuntu/Debian + nginx + systemd                  | [`VM_DEPLOYMENT_GUIDE.md`](docs/VM_DEPLOYMENT_GUIDE.md)         |
| **Fly.io**                  | `fly deploy`                                             | [`FLY_IO_DEPLOYMENT_GUIDE.md`](docs/FLY_IO_DEPLOYMENT_GUIDE.md) |

---

## 🧩 Extensibility

| System                  | What it does                                                            | Docs                                         |
| ----------------------- | ----------------------------------------------------------------------- | -------------------------------------------- |
| 🧠 **Skills**           | Built-in skills + marketplace + sandboxed custom skills (Docker)        | [`docs/SKILLS.md`](docs/SKILLS.md)           |
| 💾 **Memory**           | Persistent conversational memory (SQLite FTS5 + Qdrant vector)          | [`docs/MEMORY.md`](docs/MEMORY.md)           |
| ☁️ **Cloud Agents**     | Submit long tasks to Codex Cloud / Devin / Jules                        | [`docs/CLOUD_AGENT.md`](docs/CLOUD_AGENT.md) |
| 🪝 **Webhooks**         | HMAC-signed event delivery (request.completed, quota.exceeded, etc.)    | [`docs/WEBHOOKS.md`](docs/WEBHOOKS.md)       |
| 🛡️ **Guardrails**       | PII masker, prompt injection guard, vision bridge — hot-reload          | [`docs/GUARDRAILS.md`](docs/GUARDRAILS.md)   |
| 🧪 **Evals**            | Suite-based regression testing (combos/models/cases/rubrics)            | [`docs/EVALS.md`](docs/EVALS.md)             |
| 🔍 **Compliance/Audit** | `audit_log` table, retention, `noLog` opt-out, SSRF logging             | [`docs/COMPLIANCE.md`](docs/COMPLIANCE.md)   |
| 🛡️ **MCP Server**       | 37 tools, 3 transports (stdio/SSE/Streamable HTTP), ~13 scopes          | [`docs/MCP-SERVER.md`](docs/MCP-SERVER.md)   |
| 🤝 **A2A Protocol**     | v0.3 JSON-RPC, 5 skills (smart-routing, quota, discovery, cost, health) | [`docs/A2A-SERVER.md`](docs/A2A-SERVER.md)   |

---

## 📚 Documentation

Everything you need, organized by area.

### 🚀 Start here

- [`SETUP_GUIDE.md`](docs/SETUP_GUIDE.md) — install + connect first provider
- [`USER_GUIDE.md`](docs/USER_GUIDE.md) — end-user manual (modes, combos, CLIs, audio, ~1200 lines)
- [`FREE_TIERS.md`](docs/FREE_TIERS.md) — start free, no card
- [`TROUBLESHOOTING.md`](docs/TROUBLESHOOTING.md) — common issues + v3.8 known issues

### 🏛️ Architecture

- [`ARCHITECTURE.md`](docs/ARCHITECTURE.md) — high-level architecture
- [`CODEBASE_DOCUMENTATION.md`](docs/CODEBASE_DOCUMENTATION.md) — engineering reference
- [`REPOSITORY_MAP.md`](docs/REPOSITORY_MAP.md) — every directory and root file
- [`FEATURES.md`](docs/FEATURES.md) — full feature matrix

### 🔌 API & contracts

- [`API_REFERENCE.md`](docs/API_REFERENCE.md) — endpoint reference
- [`openapi.yaml`](docs/openapi.yaml) — OpenAPI 3.0 spec
- [`PROVIDER_REFERENCE.md`](docs/PROVIDER_REFERENCE.md) — full catalog (auto-generated)
- [`CLI-TOOLS.md`](docs/CLI-TOOLS.md) — CLI integrations + internal CLI
- [`ENVIRONMENT.md`](docs/ENVIRONMENT.md) — all env vars

### 🎯 Routing & resilience

- [`AUTO-COMBO.md`](docs/AUTO-COMBO.md) — Auto-Combo (9-factor scoring, 14 strategies)
- [`RESILIENCE_GUIDE.md`](docs/RESILIENCE_GUIDE.md) — circuit breaker + cooldown + lockout
- [`REASONING_REPLAY.md`](docs/REASONING_REPLAY.md) — reasoning cache for DeepSeek/Kimi/Qwen
- [`STEALTH_GUIDE.md`](docs/STEALTH_GUIDE.md) — TLS fingerprinting + obfuscation

### 🤖 Agent protocols

- [`AGENT_PROTOCOLS_GUIDE.md`](docs/AGENT_PROTOCOLS_GUIDE.md) — A2A vs ACP vs Cloud Agents
- [`MCP-SERVER.md`](docs/MCP-SERVER.md) — Model Context Protocol server
- [`A2A-SERVER.md`](docs/A2A-SERVER.md) — Agent-to-Agent protocol
- [`CLOUD_AGENT.md`](docs/CLOUD_AGENT.md) — Codex Cloud / Devin / Jules

### 🧠 Extensions

- [`SKILLS.md`](docs/SKILLS.md) — Skills framework
- [`MEMORY.md`](docs/MEMORY.md) — Memory system
- [`EVALS.md`](docs/EVALS.md) — Eval framework
- [`GUARDRAILS.md`](docs/GUARDRAILS.md) — PII / injection / vision
- [`WEBHOOKS.md`](docs/WEBHOOKS.md) — Webhook delivery
- [`COMPLIANCE.md`](docs/COMPLIANCE.md) — Audit + retention
- [`AUTHZ_GUIDE.md`](docs/AUTHZ_GUIDE.md) — Authorization pipeline

### 🗜️ Compression

- [`COMPRESSION_GUIDE.md`](docs/COMPRESSION_GUIDE.md)
- [`COMPRESSION_ENGINES.md`](docs/COMPRESSION_ENGINES.md)
- [`COMPRESSION_RULES_FORMAT.md`](docs/COMPRESSION_RULES_FORMAT.md)
- [`COMPRESSION_LANGUAGE_PACKS.md`](docs/COMPRESSION_LANGUAGE_PACKS.md)
- [`RTK_COMPRESSION.md`](docs/RTK_COMPRESSION.md)

### 🚀 Deployment

- [`DOCKER_GUIDE.md`](docs/DOCKER_GUIDE.md)
- [`VM_DEPLOYMENT_GUIDE.md`](docs/VM_DEPLOYMENT_GUIDE.md)
- [`FLY_IO_DEPLOYMENT_GUIDE.md`](docs/FLY_IO_DEPLOYMENT_GUIDE.md)
- [`ELECTRON_GUIDE.md`](docs/ELECTRON_GUIDE.md)
- [`PWA_GUIDE.md`](docs/PWA_GUIDE.md)
- [`TERMUX_GUIDE.md`](docs/TERMUX_GUIDE.md)
- [`TUNNELS_GUIDE.md`](docs/TUNNELS_GUIDE.md)
- [`PROXY_GUIDE.md`](docs/PROXY_GUIDE.md)

### 📋 Operations

- [`RELEASE_CHECKLIST.md`](docs/RELEASE_CHECKLIST.md) — release flow with Claude Code skills
- [`COVERAGE_PLAN.md`](docs/COVERAGE_PLAN.md) — test coverage state (current: 82.58%/82.58%/84.23%/75.22%)
- [`I18N.md`](docs/I18N.md) — 30 supported locales
- [`UNINSTALL.md`](docs/UNINSTALL.md)

### 🤝 Contributing & policy

- [`CONTRIBUTING.md`](CONTRIBUTING.md) — contributor guide
- [`SECURITY.md`](SECURITY.md) — security policy
- [`CODE_OF_CONDUCT.md`](CODE_OF_CONDUCT.md)
- [`CLAUDE.md`](CLAUDE.md) — rules for Claude Code agents
- [`AGENTS.md`](AGENTS.md) — rules for non-Claude agents
- [`GEMINI.md`](GEMINI.md) — rules for Gemini agents

---

## 💡 Use Cases

| Scenario                          | Solution                                                      |
| --------------------------------- | ------------------------------------------------------------- |
| "Claude Pro user, hit rate limit" | Combo: Claude → GLM → DeepSeek (auto-fallback)                |
| "Want $0 forever"                 | `auto/cheap` → Kiro/Qoder/Pollinations fallback chain         |
| "24/7 coding, no interruptions"   | `auto/lkgp` (sticky to last-good) + Resilience                |
| "Blocked region"                  | 1proxy free marketplace + Cloudflare Quick Tunnel             |
| "Max token savings"               | Stacked compression: `rtk → caveman` (78-95% on logs)         |
| "Multi-agent system"              | Expose OmniRoute as A2A node, route via `smart-routing` skill |
| "Long-running coding task"        | Cloud Agents → Devin/Jules with management auth               |

→ Detailed playbooks: [`USER_GUIDE.md`](docs/USER_GUIDE.md) · [`AUTO-COMBO.md`](docs/AUTO-COMBO.md)

---

## 📡 Protocols supported

OmniRoute speaks all major AI protocols — clients don't need to change:

- **OpenAI** (Chat Completions, Responses, Embeddings, Images, Audio, Files, Batches, Rerank, Moderations)
- **Anthropic Messages** (Claude format, with thinking blocks + reasoning replay)
- **Google Gemini** (generateContent + Vertex)
- **Claude Code** (CLI-specific format with CCH + fingerprinting)
- **Cursor** (proprietary format with tool calls)
- **Kiro** (AWS Builder ID OAuth)
- **MCP** (Model Context Protocol — 37 tools, stdio/SSE/Streamable HTTP)
- **A2A** (Agent-to-Agent v0.3 JSON-RPC — agent card at `/.well-known/agent.json`)

---

## 🏗️ Architecture (10-second tour)

```
Client → /v1/chat/completions → [CORS → Zod → Auth → Authz → Guardrails]
       → handleChatCore() → [Cache → Rate limit → Combo routing]
       → translateRequest → getExecutor → fetch upstream (with retry)
       → response translation → SSE stream or JSON
       → [Compliance audit] → response
```

**Major pieces:**

- **`src/app/`** — Next.js 16 App Router (60+ API routes + 30 dashboard pages)
- **`src/lib/`** — 50+ domain modules (db, a2a, memory, skills, guardrails, evals, …)
- **`open-sse/`** — Streaming engine workspace (31 executors, 9+8+9 translators, 80+ services, 37-tool MCP server)
- **`src/domain/`** — Pure business logic (policies, fallback, cost rules)
- **`src/server/`** — Server-only (authz pipeline, cors)

→ Deep dive: [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) · [`docs/CODEBASE_DOCUMENTATION.md`](docs/CODEBASE_DOCUMENTATION.md)

---

## 🌍 i18n

UI translated to **30 languages** with full RTL support for Arabic and Hebrew.

🌐 [English](README.md) · [Português](docs/i18n/pt-BR/README.md) · [Español](docs/i18n/es/README.md) · [Français](docs/i18n/fr/README.md) · [Deutsch](docs/i18n/de/README.md) · [中文](docs/i18n/zh-CN/README.md) · [日本語](docs/i18n/ja/README.md) · [한국어](docs/i18n/ko/README.md) · [العربية](docs/i18n/ar/README.md) · [हिन्दी](docs/i18n/hi/README.md) · [Русский](docs/i18n/ru/README.md) · [+ 19 more](docs/i18n/)

→ Adding a language: [`docs/I18N.md`](docs/I18N.md)

---

## 🤝 Community

- 🌐 **Website:** [omniroute.online](https://omniroute.online)
- 📦 **npm:** [omniroute](https://www.npmjs.com/package/omniroute)
- 🐳 **Docker Hub:** [diegosouzapw/omniroute](https://hub.docker.com/r/diegosouzapw/omniroute)
- 💬 **WhatsApp (BR):** Brazilian community group — see README link
- 🐛 **Issues:** [GitHub Issues](https://github.com/diegosouzapw/OmniRoute/issues)
- 💡 **Discussions:** [GitHub Discussions](https://github.com/diegosouzapw/OmniRoute/discussions)

---

## ❤️ Contributing

We welcome PRs! Start with:

1. Read [`CONTRIBUTING.md`](CONTRIBUTING.md) — setup, conventional commits, testing
2. Pick an issue labeled [`good first issue`](https://github.com/diegosouzapw/OmniRoute/labels/good%20first%20issue)
3. Branch from `main` (`feat/*`, `fix/*`, `docs/*`, `refactor/*`, `test/*`, `chore/*`)
4. Hooks will run lint + test on commit/push

**Adding a provider?** [`docs/ARCHITECTURE.md § Adding a New Provider`](docs/ARCHITECTURE.md)
**Adding an MCP tool?** [`docs/MCP-SERVER.md`](docs/MCP-SERVER.md)
**Adding an A2A skill?** [`docs/A2A-SERVER.md § Adding a New Skill`](docs/A2A-SERVER.md)

---

## 🔒 Security

- **Reporting:** see [`SECURITY.md`](SECURITY.md) for disclosure policy
- **Supported versions:** 3.8.x (Active), 3.7.x (Security only)
- **Secrets:** never commit. Use `.env` (auto-generated from `.env.example` on first install) or vaults
- **Encryption:** credentials at rest with AES-256-GCM
- **Authz:** route-aware classification (`src/server/authz/`) — see [`docs/AUTHZ_GUIDE.md`](docs/AUTHZ_GUIDE.md)
- **Guardrails:** PII masking, prompt injection detection — hot-reloadable

---

## 📄 License

[MIT](LICENSE) © 2025-2026 [Diego Souza](https://github.com/diegosouzapw)

Free forever. Self-hosted. No tracking. No cloud lock-in.

---

<div align="center">

**[⬆ Back to top](#-omniroute)** · Built with ❤️ for the open-source AI community.

<sub>OmniRoute v3.8.0 · Node ≥20.20.2 · MIT License</sub>

</div>
