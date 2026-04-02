# OmniRoute — Dashboard Features Gallery (Français)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/FEATURES.md) · 🇪🇸 [es](../../es/docs/FEATURES.md) · 🇫🇷 [fr](../../fr/docs/FEATURES.md) · 🇩🇪 [de](../../de/docs/FEATURES.md) · 🇮🇹 [it](../../it/docs/FEATURES.md) · 🇷🇺 [ru](../../ru/docs/FEATURES.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/FEATURES.md) · 🇯🇵 [ja](../../ja/docs/FEATURES.md) · 🇰🇷 [ko](../../ko/docs/FEATURES.md) · 🇸🇦 [ar](../../ar/docs/FEATURES.md) · 🇮🇳 [in](../../in/docs/FEATURES.md) · 🇹🇭 [th](../../th/docs/FEATURES.md) · 🇻🇳 [vi](../../vi/docs/FEATURES.md) · 🇮🇩 [id](../../id/docs/FEATURES.md) · 🇲🇾 [ms](../../ms/docs/FEATURES.md) · 🇳🇱 [nl](../../nl/docs/FEATURES.md) · 🇵🇱 [pl](../../pl/docs/FEATURES.md) · 🇸🇪 [sv](../../sv/docs/FEATURES.md) · 🇳🇴 [no](../../no/docs/FEATURES.md) · 🇩🇰 [da](../../da/docs/FEATURES.md) · 🇫🇮 [fi](../../fi/docs/FEATURES.md) · 🇵🇹 [pt](../../pt/docs/FEATURES.md) · 🇷🇴 [ro](../../ro/docs/FEATURES.md) · 🇭🇺 [hu](../../hu/docs/FEATURES.md) · 🇧🇬 [bg](../../bg/docs/FEATURES.md) · 🇸🇰 [sk](../../sk/docs/FEATURES.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/FEATURES.md) · 🇮🇱 [he](../../he/docs/FEATURES.md) · 🇵🇭 [phi](../../phi/docs/FEATURES.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/FEATURES.md) · 🇨🇿 [cs](../../cs/docs/FEATURES.md)

---

Visual guide to every section of the OmniRoute dashboard.

---

## 🔌 Providers

Manage AI provider connections: OAuth providers (Claude Code, Codex, Gemini CLI), API key providers (Groq, DeepSeek, OpenRouter), and free providers (Qoder, Qwen, Kiro). Kiro accounts include credit balance tracking — remaining credits, total allowance, and renewal date visible in Dashboard → Usage.

![Providers Dashboard](screenshots/01-providers.png)

---

## 🎨 Combos

Create model routing combos with 6 strategies: priority, weighted, round-robin, random, least-used, and cost-optimized. Each combo chains multiple models with automatic fallback and includes quick templates and readiness checks.

![Combos Dashboard](screenshots/02-combos.png)

---

## 📊 Analytics

Comprehensive usage analytics with token consumption, cost estimates, activity heatmaps, weekly distribution charts, and per-provider breakdowns.

![Analytics Dashboard](screenshots/03-analytics.png)

---

## 🏥 System Health

Real-time monitoring: uptime, memory, version, latency percentiles (p50/p95/p99), cache statistics, and provider circuit breaker states.

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
- **Resilience** — Rate limit persistence, circuit breaker tuning, auto-disable banned accounts, provider expiration monitoring
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

📖 See [`electron/README.md`](../electron/README.md) for full documentation.
