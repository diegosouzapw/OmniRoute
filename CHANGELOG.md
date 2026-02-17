# Changelog

All notable changes to OmniRoute are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [0.9.0] — 2026-02-17

### Added

- 🌐 **Full multilingual README support** — Complete translations of README.md into 7 languages: Portuguese (pt-BR), Spanish (es), Russian (ru), Chinese Simplified (zh-CN), German (de), French (fr), Italian (it)
- 🤖 **Agent showcase grid** — Modernized header with visual grid showcasing 10 AI coding agents (OpenClaw, NanoBot, PicoClaw, ZeroClaw, IronClaw, OpenCode, Codex CLI, Claude Code, Gemini CLI, Kilo Code)
- 🖼️ **Provider logos** — Added logo assets for OpenClaw, NanoBot, PicoClaw, ZeroClaw, IronClaw, OpenCode
- 🔌 **OpenAI-compatible provider validation fix** — Fallback validation via chat completions for providers that don't expose `/models` endpoint
- 🛡️ **Red shield badges** — Replaced plain ❌ emoji with styled badge icons across all README files

---

## [0.8.8] — 2026-02-17

### Added

- 📊 **Analytics page redesign** — Rebuilt analytics dashboard with Recharts (SVG-based) charts replacing the previous implementation. New layout: stat cards → model usage bar chart → provider breakdown table with success rates and avg latency
- 🎯 **6 global routing strategies** — Expanded from 3 (Fill-First, Round-Robin, P2C) to 6, adding Random, Least-Used, and Cost-Optimized. All strategies now have descriptions and icons in the Settings → Routing tab
- 🔧 **Editable rate limits** — Rate limit defaults (RPM, Min Gap, Max Concurrent) are now editable in Settings → Resilience with save/cancel functionality. Values persist via the resilience API
- 📋 **Policies in Resilience tab** — Moved PoliciesPanel (circuit breaker status + locked identifiers) from Security to Resilience tab for better logical grouping
- 🧠 **Prompt Cache in AI tab** — Relocated CacheStatsCard from Advanced to AI tab alongside Thinking Budget and System Prompt

### Changed

- ♻️ **Settings page restructure** — Reorganized all settings tabs for better UX:
  - **Security**: Simplified to Login/Password and IP Access Control only
  - **Routing**: Expanded strategy grid with all 6 routing strategies
  - **Resilience**: Reordered cards (Provider Profiles → Rate Limiting → Circuit Breakers → Policies & Locked Identifiers)
  - **AI**: Now includes Thinking Budget, System Prompt, and Prompt Cache
  - **Advanced**: Simplified to only Global Proxy configuration
- 🔄 **Backend routing strategies** — Implemented `random` (Fisher-Yates shuffle), `least-used` (sorted by `lastUsedAt`), `cost-optimized` (sorted by priority ascending), and fixed `p2c` (power-of-two-choices with health scoring) in `auth.ts`
- 🔌 **Resilience API updates** — GET endpoint now merges saved rate limit defaults with constants; PATCH endpoint accepts both `profiles` and `defaults`
- 📊 **Usage page split** — Refactored Usage page into "Request Logs" (with updated icon) and a new dedicated "Limits & Quotas" page

### Fixed

- 🐛 **Provider add error** — Improved error handling for API responses when adding new provider connections, with clear validation feedback

---

## [0.8.5] — 2026-02-17

> ### 🔷 MILESTONE: 100% TypeScript Migration
>
> **OmniRoute is now fully TypeScript.** The entire `src/` directory (API routes, components, services, lib, domain layer) and all 94 files in `open-sse/` have been migrated from JavaScript/JSX to TypeScript/TSX — with zero `@ts-ignore` annotations and zero TypeScript errors. This is a complete rewrite of the type layer across 200+ files.

### Added

- 🔒 **TLS fingerprint spoofing** — Implement browser-like TLS fingerprinting via `wreq-js` to bypass bot detection on providers that enforce TLS client fingerprint checks (`3dd0cc1`, PR #52)
- 💾 **SQLite proxy log persistence** — Proxy request/response logs now persist to SQLite database, surviving server restarts. Previously, logs were lost on restart (`f1664fe`, PR #53)
- 📋 **Unified test logging** — Shared `Logger` + Proxy logging infrastructure for all provider connection test flows. Consistent log formatting across batch and individual tests (`bce302e`, PR #55)

### Refactored

- 🔷 **Full TypeScript migration — `src/`** — Migrated the entire `src/` directory from JavaScript to TypeScript. All `.js`/`.jsx` files converted to `.ts`/`.tsx` with proper type annotations across API routes, lib modules, components, services, stores, domain layer, and shared utilities (`d0ca595`)
  - **Wave 1**: Shared component interfaces + EventTarget fixes (`dfdd2a2`)
  - **Wave 2**: Utils & services typed fields, Zustand stores, logger, sync scheduler (`89dd107`, `b2907cd`)
  - **Wave 3a**: Lib layer, DB, compliance, domain layer typed (`9e13fe2`)
  - **Wave 3b**: Usage, CLI runtime, SSE auth/logger typed (`a291abd`)
  - **Wave 3c**: OAuth services + server utils typed (`d62cf8d`)
  - **Wave 4a**: 7 API routes — providers, cli-tools, oauth (`7cdb923`)
  - **Wave 4b**: 7 more API routes — providers, test, usage, nodes (`5592c2e`)
  - **Wave 4c**: 8 files — components, SSE handlers, services (`d8ce9dc`)
  - **Dashboard hardening**: Resolve all TypeScript errors across dashboard pages (`7a463a3`, PR #61)
- 🔷 **Full TypeScript migration — `open-sse/`** — Migrated all 94 `.js` files in the SSE routing engine to TypeScript (PR #62)
  - **Phase 1**: Rename all 94 `.js` → `.ts` files (`256e443`)
  - **Phase 6**: Reduce `@ts-ignore` from 231 → 186 with targeted fixes (`6a54b84`)
  - **Phase 7**: Eliminate ALL `@ts-ignore` annotations (186 → 0) and ALL TypeScript errors (237 → 0) — zero `@ts-ignore`, zero errors (`7b37a3c`)
  - Typing strategies: `Record<string, any>` for dynamic objects, optional function params, `as any` casts for custom Error/Array properties, `declare var EdgeRuntime` for edge compatibility, proper `fs`/`path` imports

### Fixed

- 🐛 **Qwen token refresh** — Detect `invalid_request` as unrecoverable error and switch broken test endpoints to `checkExpiry` method instead of failing silently (`1e0ffbc`, PR #60)
- 🐛 **VPS batch test compatibility** — Eliminate HTTP self-calls in batch provider connection tests for VPS environments where localhost is unreachable (`a3bbbb5`, PR #54)
- 🐛 **E2E test assertions** — Correct API endpoints and response format assertions in end-to-end tests (`92b5e66`)
- 🐛 **CI coverage thresholds** — Lower coverage thresholds, use production server for E2E, block ESLint major upgrades from breaking CI (`3ca4b6b`, PR #51)

### Changed

- 📖 **Documentation update** — Updated all documentation to reflect JS → TS migration, corrected file extensions and import paths (`7ff8aa2`)
- ⬆️ **CI/CD** — Bump `actions/checkout` v4 → v6, `actions/setup-node` v4 → v6, `peter-evans/dockerhub-description` v4 → v5

### Dependencies

- ⬆️ `undici` 7.21.0 → 7.22.0 (production)
- ⬆️ `actions/checkout` 4 → 6
- ⬆️ `actions/setup-node` 4 → 6
- ⬆️ `peter-evans/dockerhub-description` 4 → 5
- 🚫 `eslint` 10.0.0 blocked — major version incompatible with `eslint-config-next`

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

[0.9.0]: https://github.com/diegosouzapw/OmniRoute/compare/v0.8.8...v0.9.0
[0.8.8]: https://github.com/diegosouzapw/OmniRoute/compare/v0.8.5...v0.8.8
[0.8.5]: https://github.com/diegosouzapw/OmniRoute/compare/v0.8.0...v0.8.5
[0.8.0]: https://github.com/diegosouzapw/OmniRoute/compare/v0.7.0...v0.8.0
[0.7.0]: https://github.com/diegosouzapw/OmniRoute/compare/v0.6.0...v0.7.0
[0.6.0]: https://github.com/diegosouzapw/OmniRoute/compare/v0.5.0...v0.6.0
[0.5.0]: https://github.com/diegosouzapw/OmniRoute/compare/v0.4.0...v0.5.0
[0.4.0]: https://github.com/diegosouzapw/OmniRoute/compare/v0.3.0...v0.4.0
[0.3.0]: https://github.com/diegosouzapw/OmniRoute/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/diegosouzapw/OmniRoute/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/diegosouzapw/OmniRoute/releases/tag/v0.1.0
