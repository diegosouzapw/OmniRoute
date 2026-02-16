# Changelog

All notable changes to OmniRoute are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [0.8.0] — 2026-02-16

### Added

- 🌐 **Official website** — [omniroute.online](https://omniroute.online) live with static site on Akamai VM + Cloudflare proxy
- 🛡️ **Comprehensive SECURITY.md** — Full codebase audit documenting 10+ security features (AES-256-GCM, prompt injection guard, PII redaction, circuit breaker, etc.)
- 📖 **Documentation tracking** — `USER_GUIDE.md`, `API_REFERENCE.md`, `TROUBLESHOOTING.md` now tracked in git
- 🏷️ **Website badge** — Official website badge and links in README, npm, and Docker Hub
- 🔗 **36+ providers** — Updated provider count across documentation

### Changed

- 📦 **npm homepage** — Points to `omniroute.online` instead of GitHub
- 🐳 **Docker OCI labels** — Added `org.opencontainers.image.url` for Docker Hub
- 🔒 **Security policy** — Updated supported versions, replaced email with GitHub Security Advisories

---

## [0.7.0] — 2026-02-16

### Added

- 🐳 **Docker Hub public image** — `diegosouzapw/omniroute` available on [Docker Hub](https://hub.docker.com/r/diegosouzapw/omniroute) with `latest` and versioned tags
- 🔄 **Docker CI/CD** — GitHub Actions workflow (`docker-publish.yml`) auto-builds and pushes Docker image on every release
- ☁️ **Akamai VM deployment** — Nanode 1GB instance created for remote hosting
- 🎯 **Provider model filtering** — Filter model suggestions by selected provider in Translator and Chat Tester
- 🔌 **CLI status badges** — Extract `CliStatusBadge` component; status visible on collapsed tool cards
- ☁️ **Cloud connection UX** — GET status endpoint, toast feedback, and sidebar indicator for cloud sync
- 🔐 **OAuth provider secrets** — Default cloud URL and OAuth provider secrets set via environment variables
- ⚡ **Edge compatibility** — Replace `uuid` package with native `crypto.randomUUID()` for Cloudflare Workers compatibility

---

## [0.6.0] — 2026-02-16

### Added

- 💰 **Costs & Budget page** — Dedicated dashboard page for cost tracking and budget management
- 📊 **Provider metrics display** — Show per-provider usage metrics and statistics
- 📥 **Model import for passthrough providers** — Import models from API-compatible providers (Deepgram, AssemblyAI, NanoBanana)
- 🎨 **App icon redesign** — New network node graph icon with updated color scheme

---

## [0.5.0] — 2026-02-15

### Added

- 🧪 **LLM Evaluations (Evals)** — Golden set testing framework with 4 match strategies (`exact`, `contains`, `regex`, `custom`)
- 🎲 **Advanced combo strategies** — `random`, `least-used`, and `cost-optimized` balancing strategies for combos
- 📊 **API key usage in Evals** — Evals tab uses API key auth for real LLM calls through the proxy
- 🏷️ **Model availability badge** — Visual indicator for model availability per provider
- 🎨 **Landing page retheme** — Updated landing page design with new aesthetic
- 🧩 **Shared UI component library** — Refactored dashboard with reusable component library

### Fixed

- 🐛 Fix `TypeError` in `chat/completions` `ensureInitialized` call

---

## [0.4.0] — 2026-02-15

### Added

- 🧠 **LLM Gateway Intelligence** (Phase 9) — Smart routing, semantic caching, request idempotency, progress tracking
- 📄 **Missing flows & pages** (Phase 8) — Error pages, UX components, telemetry dashboards
- 🔧 **API & code quality** (Phase 7) — API restructuring, JSDoc documentation, code quality improvements
- 📚 **Documentation restructuring** (Phase 10) — Component decomposition, docs cleanup
- ✅ **26 action items** from critical analysis resolved

### Changed

- ♻️ **Architecture refactor** (Phase 5-6) — Domain persistence, policy engine, OAuth extraction, proxy decoupling

### Fixed

- 🐛 Fix CI build and lint failures
- 🐛 Fix ghost import in `chatHelpers.js` SSE handling

---

## [0.3.0] — 2026-02-15

### Added

- ⚡ **Resilience system** — Exponential backoff, circuit breaker, anti-thundering herd mutex, Resilience UI settings page
- 🖥️ **100% frontend API coverage** — 7 implementation batches covering all backend routes
- 📊 **9 new API routes** — Budget, telemetry, compliance, tags, storage health, and more
- 🧪 **Eval framework & compliance** — ADRs, accessibility, CLI specs, Playwright test specs (46 tasks)
- 🏗️ **Pipeline integration** — 7 backend modules wired into request processing pipeline
- 🔐 **Security hardening** — Phases 01–06 (input validation, CSRF, rate limiting, auth hardening)
- 🤖 **Advanced features** — Phases 07–09 (domain extraction, error codes, request ID, fetch timeout)
- 🔄 **Unrecoverable token handling** — Detect and mark connections as expired on fatal refresh errors

### Changed

- ♻️ Decompose `usageDb`, `handleSingleModelChat`, and UI components for maintainability
- ⬇️ Downgrade ESLint v10 → v9 for `eslint-config-next` compatibility

---

## [0.2.0] — 2026-02-14

### Added

- 🛣️ **Advanced routing services** — Priority-based routing, global strategy configuration
- 💰 **Cost analytics dashboard** — Token cost tracking and analytics visualization
- 💎 **Pricing overhaul** — Comprehensive pricing data for all supported providers and models
- 📦 **npm badge & CLI options** — npm version badge in README, CLI options table, automated release docs

---

## [0.1.0] — 2026-02-14

### Added

- 🎉 **Initial OmniRoute release** — Rebranded from 9router with full feature set
- 🔄 **28 AI providers** — OpenAI, Claude, Gemini, Copilot, DeepSeek, Groq, xAI, Mistral, Qwen, iFlow, and more
- 🎯 **Smart fallback** — 3-tier auto-routing (Subscription → Cheap → Free)
- 🔀 **Format translation** — Seamless OpenAI ↔ Claude ↔ Gemini format conversion
- 👥 **Multi-account support** — Multiple accounts per provider with round-robin
- 🔐 **OAuth 2.0 (PKCE)** — Automatic token management and refresh
- 📊 **Usage tracking** — Real-time quota monitoring with reset countdown
- 🎨 **Custom combos** — Create model combinations with fallback chains
- ☁️ **Cloud sync** — Sync configuration across devices via Cloudflare Worker
- 📖 **OpenAPI specification** — Full API documentation
- 🛡️ **SOCKS5 proxy support** — Outbound proxy for upstream provider calls
- 🔌 **New endpoints** — `/v1/rerank`, `/v1/audio/*`, `/v1/moderations`
- 📦 **npm CLI package** — `npm install -g omniroute` with auto-launch
- 🐳 **Docker support** — Multi-stage Dockerfile with `base` and `cli` profiles
- 🔒 **Security policy** — `SECURITY.md` with vulnerability reporting guidelines
- 🧪 **CI/CD pipeline** — GitHub Actions for lint, build, test, and npm publish

---

[0.8.0]: https://github.com/diegosouzapw/OmniRoute/compare/v0.7.0...v0.8.0
[0.7.0]: https://github.com/diegosouzapw/OmniRoute/compare/v0.6.0...v0.7.0
[0.6.0]: https://github.com/diegosouzapw/OmniRoute/compare/v0.5.0...v0.6.0
[0.5.0]: https://github.com/diegosouzapw/OmniRoute/compare/v0.4.0...v0.5.0
[0.4.0]: https://github.com/diegosouzapw/OmniRoute/compare/v0.3.0...v0.4.0
[0.3.0]: https://github.com/diegosouzapw/OmniRoute/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/diegosouzapw/OmniRoute/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/diegosouzapw/OmniRoute/releases/tag/v0.1.0
