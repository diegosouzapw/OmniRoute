---
title: "OmniRoute — Dashboard Features Gallery"
version: 3.8.40
lastUpdated: 2026-06-28
---

# OmniRoute — Dashboard Features Gallery

🌐 **Main README translations:** 🇺🇸 [English](../README.md) | 🇧🇷 [Português (Brasil)](../i18n/pt-BR/README.md) | 🇪🇸 [Español](../i18n/es/README.md) | 🇫🇷 [Français](../i18n/fr/README.md) | 🇮🇹 [Italiano](../i18n/it/README.md) | 🇷🇺 [Русский](../i18n/ru/README.md) | 🇨🇳 [中文 (简体)](../i18n/zh-CN/README.md) | 🇩🇪 [Deutsch](../i18n/de/README.md) | 🇮🇳 [हिन्दी](../i18n/in/README.md) | 🇹🇭 [ไทย](../i18n/th/README.md) | 🇺🇦 [Українська](../i18n/uk-UA/README.md) | 🇸🇦 [العربية](../i18n/ar/README.md) | 🇯🇵 [日本語](../i18n/ja/README.md) | 🇻🇳 [Tiếng Việt](../i18n/vi/README.md) | 🇧🇬 [Български](../i18n/bg/README.md) | 🇩🇰 [Dansk](../i18n/da/README.md) | 🇫🇮 [Suomi](../i18n/fi/README.md) | 🇮🇱 [עברית](../i18n/he/README.md) | 🇭🇺 [Magyar](../i18n/hu/README.md) | 🇮🇩 [Bahasa Indonesia](../i18n/id/README.md) | 🇰🇷 [한국어](../i18n/ko/README.md) | 🇲🇾 [Bahasa Melayu](../i18n/ms/README.md) | 🇳🇱 [Nederlands](../i18n/nl/README.md) | 🇳🇴 [Norsk](../i18n/no/README.md) | 🇵🇹 [Português (Portugal)](../i18n/pt/README.md) | 🇷🇴 [Română](../i18n/ro/README.md) | 🇵🇱 [Polski](../i18n/pl/README.md) | 🇸🇰 [Slovenčina](../i18n/sk/README.md) | 🇸🇪 [Svenska](../i18n/sv/README.md) | 🇵🇭 [Filipino](../i18n/phi/README.md) | 🇨🇿 [Čeština](../i18n/cs/README.md)

Visual guide to every section of the OmniRoute dashboard.

> 📅 **Last updated:** 2026-06-28 — **v3.8.40**

---

## ✨ v3.8.0 Highlights

The v3.7.x → v3.8.0 cycle added zero-config auto routing, new providers, OAuth flows, deeper resilience, and a much richer CLI experience. Headline features below — full details further in the document and in linked specs.

- 🤖 **Auto Combo / Zero-config auto-routing** — use prefixes `auto/coding`, `auto/fast`, `auto/cheap`, `auto/offline`, `auto/smart`, `auto/lkgp`. Backed by a 9-factor scoring engine and 4 curated **mode packs** (ship-fast, cost-saver, quality-first, offline-friendly)
- 🆕 **Command Code provider** (#2199) — first-class registration with model catalog and quota tracking
- 🆕 **Z.AI provider** — new free-tier provider with quota labels
- 🎬 **KIE media expansion** — extended catalog including video generation models
- 🔐 **Windsurf + Devin CLI OAuth flows** (#2168) — end-to-end browser-based login
- 🆓 **9 new free providers** — LLM7, Lepton, Kluster, UncloseAI, BazaarLink, Completions, Enally, FreeTheAi, Command Code
- 🎯 **Manifest-aware tier routing W1–W4** — provider manifests drive weighted tier selection
- 🎨 **Cursor full OpenAI parity** — tool calls, streaming, session management end-to-end
- 📊 **Cursor Pro plan usage** — quota & cycle data surfaced in the provider-limits dashboard
- ⚡ **Service tier breakdown / Codex fast tier analytics** — per-tier consumption visibility
- 📌 **Per-session sticky routing** — Codex sessions pin to the same account between turns
- 🔊 **Inworld TTS enhancements** — voice catalogs, streaming, and latency improvements
- 🔑 **Kiro headless auth** — login via local `kiro-cli` SQLite store, no browser required
- 📉 **DeepSeek quota and limit monitoring** — daily/monthly usage exposed via dashboard
- 🔄 **Reset-aware routing strategy** — combos now prefer accounts whose quota window resets soonest
- ⏱️ **`fallbackDelayMs`** and **dynamic tool limit detection** — finer fallback timing + per-provider tool-count limits
- 🔧 **Background mode degradation (Responses API)** — falls back to synchronous mode with a structured warning when an upstream lacks background polling
- 🚦 **Per-provider 429 classification** + `useUpstream429BreakerHints` toggle — finer breaker behavior using upstream rate-limit hints
- 🩺 **Model cooldowns dashboard** — observe per-model lockouts and manually re-enable from the UI
- 🔒 **MITM dynamic Linux cert detection** — works across Debian/Ubuntu, Fedora/RHEL, Arch, and other distros
- 💻 **CLI enhancement suite** — 20+ commands including `omniroute providers`, `omniroute combos`, `omniroute doctor`, `omniroute setup`
- 🔍 **Qdrant embedding model discovery** — automatic vector-store model probe
- 🔑 **API Keys / Bearer keys with `manage` scope** — perform admin operations programmatically via API
- 🏥 **Combo target health analytics** + **structured combo builder** — per-target health & UI builder for assembling `(provider, model, connection)` steps
- 🤝 **GitLab Duo OAuth provider** — login with GitLab credentials
- 🧠 **Reasoning Replay Cache** — hybrid in-memory + SQLite persistence of reasoning traces

📚 **Related docs:** [Skills Framework](../frameworks/SKILLS.md) · [Memory System](../frameworks/MEMORY.md) · [Cloud Agents](../frameworks/CLOUD_AGENT.md) · [Webhooks](../frameworks/WEBHOOKS.md) · [Reasoning Replay Cache](../routing/REASONING_REPLAY.md)

---

## 🔌 Providers

Manage AI provider connections: OAuth providers (Claude Code, Codex), API key providers (Groq, DeepSeek, OpenRouter), and free providers (Qoder, Qwen, Kiro). Kiro accounts include credit balance tracking — remaining credits, total allowance, and renewal date visible in Dashboard → Usage.

OpenRouter connections can store a per-connection `preset` in Advanced Settings. When set, OmniRoute sends it as the OpenRouter top-level request field, for example `"preset": "email-copywriter"`, unless the client request already supplied its own `preset`.

![Providers Dashboard](../screenshots/01-providers.png)

---

## 🎨 Combos

Create model routing combos with 17 strategies: priority, weighted, fill-first, round-robin, p2c (power-of-two-choices), random, least-used, cost-optimized, reset-aware, reset-window, headroom, strict-random, auto, lkgp (last-known-good-provider), context-optimized, context-relay, and **fusion** (fan out to a panel of models in parallel, then synthesize one answer via a judge). Each combo chains multiple models with automatic fallback and includes quick templates and readiness checks.

Recent combo improvements:

- **Structured combo builder** — create each step by selecting provider, model, and exact account/connection
- **Repeated provider support** — reuse the same provider many times in one combo as long as the `(provider, model, connection)` tuple is unique
- **Combo target health** — analytics and health surfaces now distinguish individual combo targets/steps instead of collapsing everything into model strings
- **Composite tier ordering** — `defaultTier -> fallbackTier` now influences runtime execution/fallback order for top-level combo steps

![Combos Dashboard](../screenshots/02-combos.png)

---

## 📊 Analytics

Comprehensive usage analytics with token consumption, cost estimates, activity heatmaps, weekly distribution charts, and per-provider breakdowns.

![Analytics Dashboard](../screenshots/03-analytics.png)

---

## 🏥 System Health

Real-time monitoring: uptime, memory, version, latency percentiles (p50/p95/p99), cache statistics, provider circuit breaker states, active quota-monitored sessions, and combo target health.

![Health Dashboard](../screenshots/04-health.png)

---

## 🔧 Translator Playground

Four modes for debugging API translations: **Playground** (format converter), **Chat Tester** (live requests), **Test Bench** (batch tests), and **Live Monitor** (real-time stream).

![Translator Playground](../screenshots/05-translator.png)

---

## 🎮 Model Playground _(v2.0.9+)_

Test any model directly from the dashboard. Select provider, model, and endpoint, write prompts with Monaco Editor, stream responses in real-time, abort mid-stream, and view timing metrics.

---

## 🎨 Themes _(v2.0.5+)_

Customizable color themes for the entire dashboard. Choose from 7 preset colors (Coral, Blue, Red, Green, Violet, Orange, Cyan) or create a custom theme by picking any hex color. Supports light, dark, and system mode.

---

## ⚙️ Settings

Comprehensive settings panel with **7 tabs**:

- **General** — System storage, backup management (export/import database)
- **Appearance** — Theme selector (dark/light/system), color theme presets and custom colors, health log visibility, sidebar item and group separator visibility controls, Endpoint tunnel visibility controls
- **AI** — AI assistant features, default routing presets (Auto Combo `auto/coding`, `auto/fast`, `auto/cheap`, `auto/smart`), reasoning replay cache, and skill/memory toggles
- **Security** — API endpoint protection, custom provider blocking, IP filtering, session info
- **Routing** — Model aliases, background task degradation, manifest-aware tier routing (W1–W4), `fallbackDelayMs`, per-session sticky routing
- **Resilience** — Rate limit persistence, circuit breaker tuning, auto-disable banned accounts, provider expiration monitoring, **Context Relay** handoff threshold and summary model configuration, per-provider 429 classification & `useUpstream429BreakerHints` toggle, model cooldowns
- **Advanced** — Configuration overrides, configuration audit trail, fallback degradation mode, background mode degradation for Responses API

![Settings Dashboard](../screenshots/06-settings.png)

---

## 🔧 CLI Tools

One-click configuration for AI coding tools: Claude Code, Codex CLI, OpenClaw, Kilo Code, Antigravity, Cline, Continue, Cursor, and Factory Droid. Features automated config apply/reset, connection profiles, and model mapping.

![CLI Tools Dashboard](../screenshots/07-cli-tools.png)

---

## 🤖 CLI Agents _(v2.0.11+)_

Dashboard for discovering and managing CLI agents. Shows a grid of 17 built-in agents (Codex, Claude, Goose, OpenClaw, Aider, OpenCode, Cline, Qwen Code, ForgeCode, Amazon Q, Open Interpreter, Cursor CLI, Warp, **Windsurf**, **Devin CLI**, **Kimi Coding**, **Command Code**) with:

- **Installation status** — Installed / Not Found with version detection
- **Protocol badges** — stdio, HTTP, etc.
- **Custom agents** — Register any CLI tool via form (name, binary, version command, spawn args)
- **CLI Fingerprint Matching** — Per-provider toggle to match native CLI request signatures, reducing ban risk while preserving proxy IP
- **OAuth-backed agents** — Windsurf & Devin CLI now use browser OAuth flows for authentication (v3.8.0+)

---

## 🔗 Context Relay _(v3.5.5+)_

A combo strategy that preserves session continuity when account rotation happens mid-conversation. Before the active account is exhausted, OmniRoute generates a structured handoff summary in the background. After the next request resolves to a different account, the summary is injected as a system message so the new account continues with full context.

Configurable via combo-level or global settings:

- **Handoff Threshold** — Quota usage percentage that triggers summary generation (default 85%)
- **Max Messages For Summary** — How much recent history to condense
- **Summary Model** — Optional override model for generating the handoff summary

Currently supports Codex account rotation. See [Context Relay documentation](../architecture/ARCHITECTURE.md).

---

## 🗜️ Prompt Compression _(v3.7.9+)_

Context & Cache now exposes dedicated pages for Caveman, RTK, and Compression Combos:

- **Caveman** — language-aware rule packs, preview, output-mode controls, and analytics
- **RTK** — command-aware compression for shell, git, test, build, package, Docker, infra, JSON, and stack-trace output
- **Compression Combos** — named pipelines such as `rtk -> caveman` assigned to routing combos; the default stacked math reaches `~89%` average and `78-95%` eligible-context savings when both engines apply
- **Raw-output recovery** — optional redacted RTK raw-output pointers for debugging compressed failures

See [Compression Guide](../compression/COMPRESSION_GUIDE.md), [RTK Compression](../compression/RTK_COMPRESSION.md), and
[Compression Engines](../compression/COMPRESSION_ENGINES.md).

---

## 🛡️ Proxy Hardening _(v3.5.5+)_

Comprehensive proxy configuration enforcement across the entire request pipeline:

- **Token Health Check** — Background OAuth refresh now resolves proxy config per connection, preventing failures in proxy-required environments
- **API Key Validation** — Provider key validation (`POST /api/providers/validate`) routes through `runWithProxyContext`, honoring provider-level and global proxy settings
- **undici Dispatcher Fix** — Proxy dispatchers use undici's own fetch implementation instead of Node's built-in fetch, resolving `invalid onRequestStart method` errors on Node.js 22
- **Node.js Version Detection** — Login page proactively detects incompatible Node.js versions (24+) and displays a warning banner with instructions to use Node 22 LTS

---

## 📧 Email Privacy Masking _(v3.5.6+)_

OAuth account emails are masked by default (e.g. `di*****@g****.com`) to prevent accidental exposure when sharing screenshots or recording demos. Use Settings → Appearance → Account email visibility to reveal or mask full account emails globally across providers, combos, logs, quota, and playground screens.

---

## 👁️ Model Visibility Toggle _(v3.5.6+)_

The provider page model list now includes:

- **Real-time search/filter bar** — Quickly find specific models
- **Per-model visibility toggle** (👁 icon) — Hidden models are grayed out and excluded from the `/v1/models` catalog
- **Active-count badge** (`N/M active`) — Shows at a glance how many models are enabled vs total

---

## 🔧 OAuth Env Repair _(v3.6.1+)_

One-click "Repair env" action for OAuth providers that restores missing environment variables and fixes broken auth state. Accessible from `Dashboard → Providers → [OAuth Provider] → Repair env`. Automatically detects and repairs:

- Missing OAuth client credentials
- Corrupted env file entries
- Backup path sanitization

---

## 🗑️ Uninstall / Full Uninstall _(v3.6.2+)_

Clean removal scripts for all installation methods:

| Command                  | Action                                                                              |
| ------------------------ | ----------------------------------------------------------------------------------- |
| `npm run uninstall`      | Removes the system app but **keeps your DB and configurations** in `~/.omniroute`.  |
| `npm run uninstall:full` | Removes the app AND permanently **erases all configurations, keys, and databases**. |

---

## 🖼️ Media _(v2.0.3+)_

Generate images, videos, and music from the dashboard. Supports OpenAI, xAI, Together, Hyperbolic, SD WebUI, ComfyUI, AnimateDiff, Stable Audio Open, and MusicGen.

---

## 📝 Request Logs

Real-time request logging with filtering by provider, model, account, and API key. Shows status codes, token usage, latency, and response details.

![Usage Logs](../screenshots/08-usage.png)

---

## 🌐 API Endpoint

Your unified API endpoint with capability breakdown: Chat Completions, Responses API, Embeddings, Image Generation, Reranking, Audio Transcription, Text-to-Speech, Moderations, and registered API keys. Cloudflare Quick Tunnel, Tailscale Funnel, ngrok Tunnel, and cloud proxy support are available for remote access.

![Endpoint Dashboard](../screenshots/09-endpoint.png)

---

## 🔑 API Key Management

Create, scope, and revoke API keys. Each key can be restricted to specific models/providers with full access or read-only permissions. Visual key management with usage tracking.

---

## 📋 Audit Log

Administrative action tracking with filtering by action type, actor, target, IP address, and timestamp. Full security event history.

---

## 🖥️ Desktop Application

Native Electron desktop app for Windows, macOS, and Linux. Run OmniRoute as a standalone application with system tray integration, offline support, auto-update, and one-click install.

Key features:

- Server readiness polling (no blank screen on cold start)
- System tray with port management
- Content Security Policy
- Single-instance lock
- Auto-update on restart
- Platform-conditional UI (macOS traffic lights, Windows/Linux default titlebar)
- Hardened Electron build packaging — symlinked `node_modules` in the standalone bundle is detected and rejected before packaging, preventing runtime dependency on the build machine (v2.5.5+)
- **Graceful shutdown** — Electron `before-quit` shuts down Next.js cleanly, preventing SQLite WAL database locks (v3.6.2+)

📖 See [`electron/README.md`](../../electron/README.md) for full documentation.

---

## 🌐 V1 WebSocket Bridge _(v3.6.6+)_

OmniRoute now supports **OpenAI-compatible WebSocket clients** via the `/v1/ws` upgrade endpoint. The custom `scripts/dev/v1-ws-bridge.mjs` server wraps Next.js and upgrades WS connections to full bidirectional streaming sessions. Authentication uses the same API key or session cookie as HTTP requests.

Key behaviours:

- WS upgrade validated by `src/lib/ws/handshake.ts` before the connection is established
- Streams terminated cleanly on session close or upstream error
- Works alongside the existing HTTP+SSE streaming path simultaneously

---

## 🔑 Sync Tokens & Config Bundle _(v3.6.6+)_

Multi-device and external operator access is now possible via **scoped sync tokens**:

- **`POST /api/sync/tokens`** — Issue a new sync token (scoped, with optional expiry)
- **`DELETE /api/sync/tokens/:id`** — Revoke a token
- **`GET /api/sync/bundle`** — Download a versioned, ETag-keyed JSON snapshot of all non-sensitive settings (passwords redacted)

The config bundle is built by `src/lib/sync/bundle.ts`. Consumers compare the `ETag` response header to detect changes without re-downloading the full payload.

---

## 🧠 GLM Thinking Preset _(v3.6.6+)_

**GLM Thinking (`glmt`)** is now a registered first-class provider: 65 536 max output tokens, 24 576 thinking budget, 900 s default timeout, Claude-compatible API format, and shared usage sync with the GLM family.

**Hybrid token counting** also lands in v3.6.6: when a Claude-compatible provider exposes `/messages/count_tokens`, OmniRoute calls it before large requests with graceful estimation fallback.

---

## 🛡️ Safe Outbound Fetch & SSRF Guard _(v3.6.6+)_

All provider validation and model discovery calls now go through a two-layer outbound guard:

1. **URL guard** (`src/shared/network/outboundUrlGuard.ts`) — Blocks private/loopback/link-local IP ranges before the socket is opened.
2. **Safe fetch wrapper** (`src/shared/network/safeOutboundFetch.ts`) — Applies the URL guard, normalises timeouts, and retries transient errors with exponential backoff.

Guard violations surface as HTTP 422 (`URL_GUARD_BLOCKED`) and are written to the compliance audit log via `providerAudit.ts`.

---

## 🔄 Cooldown-Aware Retries _(v3.6.6+)_

Chat requests now **automatically retry** when an upstream provider returns a model-scoped cooldown. Configurable via `REQUEST_RETRY` (default: 2) and `MAX_RETRY_INTERVAL_SEC` (default: 30 s). Rate-limit header learning improved across `x-ratelimit-reset-requests`, `x-ratelimit-reset-tokens`, and `Retry-After` — per-model cooldown state is visible in the Resilience dashboard.

---

## 📋 Compliance Audit v2 _(v3.6.6+)_

The audit log has been expanded with cursor-based pagination, request context enrichment (request ID, user agent, IP), structured auth events, provider CRUD events with diff context, and SSRF-blocked validation logging. New events emitted by `src/lib/compliance/providerAudit.ts`.
