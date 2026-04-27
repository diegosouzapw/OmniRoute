# OmniRoute — Dashboard Features Gallery (ไทย)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/FEATURES.md) · 🇸🇦 [ar](../../ar/docs/FEATURES.md) · 🇧🇬 [bg](../../bg/docs/FEATURES.md) · 🇧🇩 [bn](../../bn/docs/FEATURES.md) · 🇨🇿 [cs](../../cs/docs/FEATURES.md) · 🇩🇰 [da](../../da/docs/FEATURES.md) · 🇩🇪 [de](../../de/docs/FEATURES.md) · 🇪🇸 [es](../../es/docs/FEATURES.md) · 🇮🇷 [fa](../../fa/docs/FEATURES.md) · 🇫🇮 [fi](../../fi/docs/FEATURES.md) · 🇫🇷 [fr](../../fr/docs/FEATURES.md) · 🇮🇳 [gu](../../gu/docs/FEATURES.md) · 🇮🇱 [he](../../he/docs/FEATURES.md) · 🇮🇳 [hi](../../hi/docs/FEATURES.md) · 🇭🇺 [hu](../../hu/docs/FEATURES.md) · 🇮🇩 [id](../../id/docs/FEATURES.md) · 🇮🇹 [it](../../it/docs/FEATURES.md) · 🇯🇵 [ja](../../ja/docs/FEATURES.md) · 🇰🇷 [ko](../../ko/docs/FEATURES.md) · 🇮🇳 [mr](../../mr/docs/FEATURES.md) · 🇲🇾 [ms](../../ms/docs/FEATURES.md) · 🇳🇱 [nl](../../nl/docs/FEATURES.md) · 🇳🇴 [no](../../no/docs/FEATURES.md) · 🇵🇭 [phi](../../phi/docs/FEATURES.md) · 🇵🇱 [pl](../../pl/docs/FEATURES.md) · 🇵🇹 [pt](../../pt/docs/FEATURES.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/FEATURES.md) · 🇷🇴 [ro](../../ro/docs/FEATURES.md) · 🇷🇺 [ru](../../ru/docs/FEATURES.md) · 🇸🇰 [sk](../../sk/docs/FEATURES.md) · 🇸🇪 [sv](../../sv/docs/FEATURES.md) · 🇰🇪 [sw](../../sw/docs/FEATURES.md) · 🇮🇳 [ta](../../ta/docs/FEATURES.md) · 🇮🇳 [te](../../te/docs/FEATURES.md) · 🇹🇭 [th](../../th/docs/FEATURES.md) · 🇹🇷 [tr](../../tr/docs/FEATURES.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/FEATURES.md) · 🇵🇰 [ur](../../ur/docs/FEATURES.md) · 🇻🇳 [vi](../../vi/docs/FEATURES.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/FEATURES.md)

---

Visual guide to every section of the OmniRoute dashboard.

---

## 🔌 Providers

Manage AI provider connections: OAuth providers (Claude Code, Codex, Gemini CLI), API key providers (Groq, DeepSeek, OpenRouter), and free providers (Qoder, Qwen, Kiro). Kiro accounts include credit balance tracking — remaining credits, total allowance, and renewal date visible in Dashboard → Usage.

![Providers Dashboard](screenshots/01-providers.png)

---

## 🎨 Combos

Create model routing combos with 13 strategies: priority, weighted, round-robin, random, least-used, cost-optimized, strict-random, auto, fill-first, p2c, lkgp, context-optimized, and **context-relay**. Each combo chains multiple models with automatic fallback and includes quick templates and readiness checks.

Recent combo improvements:

- **Structured combo builder** — create each step by selecting provider, model, and exact account/connection
- **Repeated provider support** — reuse the same provider many times in one combo as long as the `(provider, model, connection)` tuple is unique
- **Combo target health** — analytics and health surfaces now distinguish individual combo targets/steps instead of collapsing everything into model strings
- **Composite tier ordering** — `defaultTier -> fallbackTier` now influences runtime execution/fallback order for top-level combo steps

![Combos Dashboard](screenshots/02-combos.png)

---

## 📊 Analytics

Comprehensive usage analytics with token consumption, cost estimates, activity heatmaps, weekly distribution charts, and per-provider breakdowns.

![Analytics Dashboard](screenshots/03-analytics.png)

---

## 🏥 System Health

Real-time monitoring: uptime, memory, version, latency percentiles (p50/p95/p99), cache statistics, provider circuit breaker states, active quota-monitored sessions, and combo target health.

![Health Dashboard](screenshots/04-health.png)

---

## 🔧 Translator Playground

Four modes for debugging API translations: **Playground** (format converter), **Chat Tester** (live requests), **Test Bench** (batch tests), and **Live Monitor** (real-time stream).

![Translator Playground](screenshots/05-translator.png)

---

## 🎮 Model Playground _(v2.0.9+)_

Test any model directly from the dashboard. Select provider, model, and endpoint, write prompts with Monaco Editor, stream responses in real-time, abort mid-stream, and view timing metrics.

---

## 🎨 Themes _(v2.0.5+)_

Customizable color themes for the entire dashboard. Choose from 7 preset colors (Coral, Blue, Red, Green, Violet, Orange, Cyan) or create a custom theme by picking any hex color. Supports light, dark, and system mode.

---

## ⚙️ Settings

Comprehensive settings panel with tabs:

- **General** — System storage, backup management (export/import database)
- **Appearance** — Theme selector (dark/light/system), color theme presets and custom colors, health log visibility, sidebar item visibility controls
- **Security** — API endpoint protection, custom provider blocking, IP filtering, session info
- **Routing** — Model aliases, background task degradation
- **Resilience** — Rate limit persistence, circuit breaker tuning, auto-disable banned accounts, provider expiration monitoring, **Context Relay** handoff threshold and summary model configuration
- **Advanced** — Configuration overrides, configuration audit trail, fallback degradation mode

![Settings Dashboard](screenshots/06-settings.png)

---

## 🔧 CLI Tools

One-click configuration for AI coding tools: Claude Code, Codex CLI, Gemini CLI, OpenClaw, Kilo Code, Antigravity, Cline, Continue, Cursor, and Factory Droid. Features automated config apply/reset, connection profiles, and model mapping.

![CLI Tools Dashboard](screenshots/07-cli-tools.png)

---

## 🤖 CLI Agents _(v2.0.11+)_

Dashboard for discovering and managing CLI agents. Shows a grid of 14 built-in agents (Codex, Claude, Goose, Gemini CLI, OpenClaw, Aider, OpenCode, Cline, Qwen Code, ForgeCode, Amazon Q, Open Interpreter, Cursor CLI, Warp) with:

- **Installation status** — Installed / Not Found with version detection
- **Protocol badges** — stdio, HTTP, etc.
- **Custom agents** — Register any CLI tool via form (name, binary, version command, spawn args)
- **CLI Fingerprint Matching** — Per-provider toggle to match native CLI request signatures, reducing ban risk while preserving proxy IP

---

## 🔗 Context Relay _(v3.5.5+)_

A combo strategy that preserves session continuity when account rotation happens mid-conversation. Before the active account is exhausted, OmniRoute generates a structured handoff summary in the background. After the next request resolves to a different account, the summary is injected as a system message so the new account continues with full context.

Configurable via combo-level or global settings:

- **Handoff Threshold** — Quota usage percentage that triggers summary generation (default 85%)
- **Max Messages For Summary** — How much recent history to condense
- **Summary Model** — Optional override model for generating the handoff summary

Currently supports Codex account rotation. See [Context Relay documentation](features/context-relay.md).

---

## 🛡️ Proxy Hardening _(v3.5.5+)_

Comprehensive proxy configuration enforcement across the entire request pipeline:

- **Token Health Check** — Background OAuth refresh now resolves proxy config per connection, preventing failures in proxy-required environments
- **API Key Validation** — Provider key validation (`POST /api/providers/validate`) routes through `runWithProxyContext`, honoring provider-level and global proxy settings
- **undici Dispatcher Fix** — Proxy dispatchers use undici's own fetch implementation instead of Node's built-in fetch, resolving `invalid onRequestStart method` errors on Node.js 22
- **Node.js Version Detection** — Login page proactively detects incompatible Node.js versions (24+) and displays a warning banner with instructions to use Node 22 LTS

---

## 📧 Email Privacy Masking _(v3.5.6+)_

OAuth account emails are now masked in the provider dashboard (e.g. `di*****@g****.com`) to prevent accidental exposure when sharing screenshots or recording demos. The full email address remains accessible via hover tooltip (`title` attribute).

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

![Usage Logs](screenshots/08-usage.png)

---

## 🌐 API Endpoint

Your unified API endpoint with capability breakdown: Chat Completions, Responses API, Embeddings, Image Generation, Reranking, Audio Transcription, Text-to-Speech, Moderations, and registered API keys. Cloudflare Quick Tunnel integration and cloud proxy support for remote access.

![Endpoint Dashboard](screenshots/09-endpoint.png)

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

📖 See [`electron/README.md`](../electron/README.md) for full documentation.

---

## 🌐 V1 WebSocket Bridge _(v3.6.6+)_

OmniRoute now supports **OpenAI-compatible WebSocket clients** via the `/v1/ws` upgrade endpoint. The custom `scripts/v1-ws-bridge.mjs` server wraps Next.js and upgrades WS connections to full bidirectional streaming sessions. Authentication uses the same API key or session cookie as HTTP requests.

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
