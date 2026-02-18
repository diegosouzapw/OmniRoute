# Changelog

All notable changes to OmniRoute are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.0.0] — 2026-02-18

> ### 🎉 First Major Release — OmniRoute 1.0
>
> OmniRoute is an intelligent API gateway that unifies 20+ AI providers behind a single OpenAI-compatible endpoint. This release represents the culmination of the entire development effort — from initial prototype to production-ready platform.

### 🧠 Core Routing & Intelligence

- **Smart 4-tier fallback** — Auto-routing: Subscription → Cheap → Free → Emergency
- **6 routing strategies** — Fill First, Round Robin, Power-of-Two-Choices, Random, Least Used, Cost Optimized
- **Semantic caching** — Auto-cache responses for deduplication with configurable TTL
- **Request idempotency** — Prevent duplicate processing of identical requests
- **Thinking budget validation** — Control reasoning token allocation per request
- **System prompt injection** — Configurable global system prompts for all requests

### 🔌 Providers & Models

- **20+ AI providers** — OpenAI, Claude (Anthropic), Gemini, GitHub Copilot, DeepSeek, Groq, xAI, Mistral, Qwen, iFlow, Kiro, OpenRouter, GLM, MiniMax, Kimi, NVIDIA NIM, and more
- **Multi-account support** — Multiple accounts per provider with automatic rotation
- **OAuth 2.0 (PKCE)** — Automatic token management and refresh for Claude Code, Codex, Gemini CLI, Copilot, Kiro
- **Auto token refresh** — Background refresh with expiry detection and unrecoverable error handling
- **Model import** — Import models from API-compatible passthrough providers
- **OpenAI-compatible validation** — Fallback validation via chat completions for providers without `/models` endpoint
- **TLS fingerprint spoofing** — Browser-like TLS fingerprinting via `wreq-js` to bypass bot detection

### 🔄 Format Translation

- **Multi-format translation** — Seamless OpenAI ↔ Claude ↔ Gemini ↔ OpenAI Responses API conversion
- **Translator Playground** — 4 interactive modes:
  - **Playground** — Test format translations between any provider formats
  - **Chat Tester** — Send real requests through the proxy with visual response rendering
  - **Test Bench** — Automated batch testing across multiple providers
  - **Live Monitor** — Real-time stream of active proxy requests and translations

### 🎯 Combos & Fallback Chains

- **Custom combos** — Create model combinations with multi-provider fallback chains
- **6 combo balancing strategies** — Fill First, Round Robin, Random, Least Used, P2C, Cost Optimized
- **Combo circuit breaker** — Auto-disable failing providers within a combo chain

### 🛡️ Resilience & Security

- **Circuit breakers** — Auto-recovery with configurable thresholds and cooldown periods
- **Exponential backoff** — Progressive retry delays for failed requests
- **Anti-thundering herd** — Mutex-based protection against concurrent retry storms
- **Rate limit detection** — Per-provider RPM, min gap, and max concurrent request tracking
- **Editable rate limits** — Configurable defaults via Settings → Resilience with persistence
- **Prompt injection guard** — Input sanitization for malicious prompt patterns
- **PII redaction** — Automatic detection and masking of personally identifiable information
- **AES-256-GCM encryption** — Credential encryption at rest
- **IP access control** — Whitelist/blacklist IP filtering
- **SOCKS5 proxy support** — Outbound proxy for upstream provider calls

### 📊 Observability & Analytics

- **Analytics dashboard** — Recharts-based SVG charts: stat cards, model usage bar chart, provider breakdown table with success rates and latency
- **Real-time health monitoring** — Provider health, rate limits, latency telemetry
- **Request logs** — Dedicated page with SQLite-persisted proxy request/response logs
- **Limits & Quotas** — Separate dashboard for quota monitoring with reset countdowns
- **Cost analytics** — Token cost tracking and budget management per provider
- **Request telemetry** — Correlation IDs, structured logging, request timing

### 💾 Database & Backup

- **Dual database** — LowDB (JSON) for config + SQLite for domain state and proxy logs
- **Export database** — `GET /api/db-backups/export` — Download SQLite database file
- **Export all** — `GET /api/db-backups/exportAll` — Full backup as `.tar.gz` archive (DB + settings + combos + providers + masked API keys)
- **Import database** — `POST /api/db-backups/import` — Upload and restore with validation, integrity check, and pre-import backup
- **Automatic backups** — Configurable backup schedule with retention
- **Storage health** — Dashboard widget with database size, path, and backup status

### 🖥️ Dashboard & UI

- **Full dashboard** — Provider management, analytics, health monitoring, settings, CLI tools
- **9 dashboard sections** — Providers, Combos, Analytics, Health, Translator, Settings, CLI Tools, Usage, Endpoint
- **Settings restructure** — 6 tabs: Security, Routing, Resilience, AI, System/Storage, Advanced
- **Shared UI component library** — Reusable components (Avatar, Badge, Button, Card, DataTable, Modal, etc.)
- **Dark/Light/System theme** — Persistent theme selection with system preference detection
- **Agent showcase grid** — Visual grid of 10 AI coding agents in README header
- **Provider logos** — Logo assets for all supported agents and providers
- **Red shield badges** — Styled badge icons across all documentation

### ☁️ Deployment & Infrastructure

- **Docker support** — Multi-stage Dockerfile with `base` and `cli` profiles
- **Docker Hub** — `diegosouzapw/omniroute` with `latest` and versioned tags
- **Docker CI/CD** — GitHub Actions auto-build and push on release
- **npm CLI package** — `npx omniroute` with auto-launch
- **npm CI/CD** — GitHub Actions auto-publish to npm on release
- **Akamai VM deployment** — Production deployment on Nanode 1GB with nginx reverse proxy
- **Cloud sync** — Sync configuration across devices via Cloudflare Worker
- **Edge compatibility** — Native `crypto.randomUUID()` for Cloudflare Workers

### 🧪 Testing & Quality

- **100% TypeScript** — Full migration of `src/` (200+ files) and `open-sse/` (94 files) — zero `@ts-ignore`, zero TypeScript errors
- **CI/CD pipeline** — GitHub Actions for lint, build, test, npm publish, Docker publish
- **Unit tests** — 20+ test suites covering domain logic, security, caching, routing
- **E2E tests** — Playwright specs for API, navigation, and responsive behavior
- **LLM evaluations** — Golden set testing framework with 4 match strategies (`exact`, `contains`, `regex`, `custom`)
- **Security tests** — CLI runtime, Docker hardening, cloud sync, and OpenAI compatibility

### 📖 Documentation

- **8 language READMEs** — English, Portuguese (pt-BR), Spanish, Russian, Chinese (zh-CN), German, French, Italian
- **VM Deployment Guide** — Complete guide (VM + Docker + nginx + Cloudflare + security)
- **Features Gallery** — 9 dashboard screenshots with descriptions
- **API Reference** — Full endpoint documentation including backup/export/import
- **User Guide** — Step-by-step setup, configuration, and usage instructions
- **Architecture docs** — System design, component decomposition, ADRs
- **OpenAPI specification** — Machine-readable API documentation
- **Troubleshooting guide** — Common issues and solutions
- **Security policy** — `SECURITY.md` with vulnerability reporting via GitHub Security Advisories
- **Roadmap** — 150+ planned features across 6 categories

### 🔌 API Endpoints

- `/v1/chat/completions` — OpenAI-compatible chat endpoint with format translation
- `/v1/embeddings` — Embedding generation
- `/v1/images/generations` — Image generation
- `/v1/models` — Model listing with provider filtering
- `/v1/rerank` — Re-ranking endpoint
- `/v1/audio/*` — Audio transcription and translation
- `/v1/moderations` — Content moderation
- `/api/db-backups/export` — Database export
- `/api/db-backups/exportAll` — Full archive export
- `/api/db-backups/import` — Database import with validation
- 30+ dashboard API routes for providers, combos, settings, analytics, health, CLI tools

---

[1.0.0]: https://github.com/diegosouzapw/OmniRoute/releases/tag/v1.0.0
