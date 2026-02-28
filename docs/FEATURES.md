# OmniRoute — Dashboard Features Gallery

🌐 **Languages:** 🇺🇸 [English](FEATURES.md) | 🇧🇷 [Português (Brasil)](i18n/pt-BR/FEATURES.md) | 🇪🇸 [Español](i18n/es/FEATURES.md) | 🇫🇷 [Français](i18n/fr/FEATURES.md) | 🇮🇹 [Italiano](i18n/it/FEATURES.md) | 🇷🇺 [Русский](i18n/ru/FEATURES.md) | 🇨🇳 [中文 (简体)](i18n/zh-CN/FEATURES.md) | 🇩🇪 [Deutsch](i18n/de/FEATURES.md) | 🇮🇳 [हिन्दी](i18n/in/FEATURES.md) | 🇹🇭 [ไทย](i18n/th/FEATURES.md) | 🇺🇦 [Українська](i18n/uk-UA/FEATURES.md) | 🇸🇦 [العربية](i18n/ar/FEATURES.md) | 🇯🇵 [日本語](i18n/ja/FEATURES.md) | 🇻🇳 [Tiếng Việt](i18n/vi/FEATURES.md) | 🇧🇬 [Български](i18n/bg/FEATURES.md) | 🇩🇰 [Dansk](i18n/da/FEATURES.md) | 🇫🇮 [Suomi](i18n/fi/FEATURES.md) | 🇮🇱 [עברית](i18n/he/FEATURES.md) | 🇭🇺 [Magyar](i18n/hu/FEATURES.md) | 🇮🇩 [Bahasa Indonesia](i18n/id/FEATURES.md) | 🇰🇷 [한국어](i18n/ko/FEATURES.md) | 🇲🇾 [Bahasa Melayu](i18n/ms/FEATURES.md) | 🇳🇱 [Nederlands](i18n/nl/FEATURES.md) | 🇳🇴 [Norsk](i18n/no/FEATURES.md) | 🇵🇹 [Português (Portugal)](i18n/pt/FEATURES.md) | 🇷🇴 [Română](i18n/ro/FEATURES.md) | 🇵🇱 [Polski](i18n/pl/FEATURES.md) | 🇸🇰 [Slovenčina](i18n/sk/FEATURES.md) | 🇸🇪 [Svenska](i18n/sv/FEATURES.md) | 🇵🇭 [Filipino](i18n/phi/FEATURES.md)

Visual guide to every section of the OmniRoute dashboard.

---

## 🔌 Providers

Manage AI provider connections: OAuth providers (Claude Code, Codex, Gemini CLI), API key providers (Groq, DeepSeek, OpenRouter), and free providers (iFlow, Qwen, Kiro).

![Providers Dashboard](screenshots/01-providers.png)

---

## 🎨 Combos

Create model routing combos with 6 strategies: fill-first, round-robin, power-of-two-choices, random, least-used, and cost-optimized. Each combo chains multiple models with automatic fallback.

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

## ⚙️ Settings

General settings, system storage, backup management (export/import database), appearance (dark/light mode), security (includes API endpoint protection and custom provider blocking), routing, resilience, and advanced configuration.

![Settings Dashboard](screenshots/06-settings.png)

---

## 🔧 CLI Tools

One-click configuration for AI coding tools: Claude Code, Codex CLI, Gemini CLI, OpenClaw, Kilo Code, and Antigravity.

![CLI Tools Dashboard](screenshots/07-cli-tools.png)

---

## 📝 Request Logs

Real-time request logging with filtering by provider, model, account, and API key. Shows status codes, token usage, latency, and response details.

![Usage Logs](screenshots/08-usage.png)

---

## 🌐 API Endpoint

Your unified API endpoint with capability breakdown: Chat Completions, Embeddings, Image Generation, Reranking, Audio Transcription, and registered API keys.

![Endpoint Dashboard](screenshots/09-endpoint.png)

---

## 🖥️ Desktop Application

Native Electron desktop app for Windows, macOS, and Linux. Run OmniRoute as a standalone application with system tray integration, offline support, and one-click install.

Key features:

- Server readiness polling (no blank screen on cold start)
- System tray with port management
- Content Security Policy
- Single-instance lock
- Platform-conditional UI (macOS traffic lights, Windows/Linux default titlebar)

📖 See [`electron/README.md`](../electron/README.md) for full documentation.
