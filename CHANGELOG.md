# Changelog

All notable changes to OmniRoute are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

---

## [Unreleased]

### Added

- Model selector with autocomplete in Chat Tester and Test Bench modes — prevents "model does not exist" errors by letting users choose available models (`c25230c`)
- OpenAPI specification at `docs/openapi.yaml` covering all 89 API endpoints (`7abda4d`)
- Enhanced `restart.sh` with clean build, health check, graceful shutdown (Ctrl+C), and real-time log tailing (`0db8f3d`)

### Fixed

- Server port collision (EADDRINUSE) during restart — now kills port before `next start` (`e4c5c0c`)

---

## [0.0.1] — 2026-02-13

Initial public release of OmniRoute (rebranded from 9router).

### Added

- **28 AI Providers** — OpenAI, Anthropic, Google Gemini, DeepSeek, Groq, xAI, Mistral, Perplexity, Together AI, Fireworks AI, Cerebras, Cohere, NVIDIA NIM, Nebius, GitHub Copilot, Cursor, Kiro, Kimi, MiniMax, iFlow, and more
- **OpenAI-compatible proxy** at `/api/v1/chat/completions` with automatic format translation, load balancing, and failover
- **Anthropic Messages API** at `/api/v1/messages` for Claude-native clients
- **OpenAI Responses API** at `/api/v1/responses` for modern OpenAI workflows
- **Embeddings API** at `/api/v1/embeddings` with 6 providers and 9 models
- **Image Generation API** at `/api/v1/images/generations` with 4 providers and 9 models
- **Format Translator** — automatic request/response conversion between OpenAI, Anthropic, Gemini, and OpenAI Responses formats
- **Translator Playground** with 4 modes: Playground, Chat Tester, Test Bench, Live Monitor
- **Combo Routing** — named route configurations with priority, weighted, and round-robin strategies
- **API Key Management** — create/revoke keys with usage attribution
- **Usage Dashboard** — analytics, call logs, request logger with API key filtering and cost tracking
- **Provider Health Diagnostics** — structured status (runtime errors, auth failures, token refresh) with per-connection retest
- **CLI Tools Integration** — runtime detection for Cline, Kiro, Droid, OpenClaw with backup/restore
- **OAuth Flows** — for Cursor, Kiro, Kimi, and GitHub Copilot
- **Docker Support** — multi-stage Dockerfile, docker-compose with 3 profiles (base, cli, host), production compose
- **SOCKS5 Proxy** — outbound proxy support enabled by default (`ab8d752`)
- **Unified Storage** — `DATA_DIR` / `XDG_CONFIG_HOME` resolution with auto-migration from `~/.omniroute`
- **In-app Documentation** at `/docs` with quick start, endpoint reference, and client compatibility notes
- **Dark Theme UI** — modern dashboard with glassmorphism, responsive layout
- `<think>` tag parser for reasoning models (DeepSeek, Qwen)
- Non-stream response translation for all formats
- Secure cookie handling for LAN/reverse-proxy deployments

### Fixed

- OAuth re-authentication no longer creates duplicate connections (`773f117`, `510aedd`)
- Connection test no longer corrupts valid OAuth tokens (`a2ba189`)
- Cloud sync disabled to prevent 404 log spam (`71d132e`)
- `.env.example` synced with current environment structure (`6bdc74b`)
- Select dropdown dark theme inconsistency (`1bd734d`)

### Dependencies

- `actions/github-script` bumped from 7 to 8 (`f6a994a`)
- `eslint` bumped from 9.39.2 to 10.0.0 (`ecd4aea`)

---

## Pre-Release History (9router)

> The following entries document the legacy 9router project before it was
> rebranded to OmniRoute. All changes below were included in the initial
> `0.0.1` release.

### 0.2.75 — 2026-02-11

- API key attribution in usage/call logs with per-key analytics aggregates
- Usage dashboard API key observability (distribution donut, filterable table)
- In-app docs page (`/docs`) with quick start, endpoint reference, and client compatibility notes
- Unified storage path policy (`DATA_DIR` → `XDG_CONFIG_HOME` → `~/.omniroute`)
- Build-phase guard for `usageDb` (in-memory during `next build`)
- LAN/reverse-proxy cookie security detection
- Hardened Gemini 3 Flash normalization and non-stream SSE fallback parsing
- CLI tool runtime and OAuth refresh reliability improvements
- Provider health diagnostics with structured error types

### 0.2.74 — 2026-02-11

- Model resolution fallback fix for unprefixed models
- GitHub Copilot dynamic endpoint selection (Codex → `/responses`)
- Non-stream translation path for OpenAI Responses
- Updated GitHub model catalog with compatibility aliases

### 0.2.73 — 2026-02-09

- Expanded provider registry from 18 → 28 providers (DeepSeek, Groq, xAI, Mistral, Perplexity, Together AI, Fireworks AI, Cerebras, Cohere, NVIDIA NIM)
- `/v1/embeddings` endpoint with 6 providers and 9 models
- `/v1/images/generations` endpoint with 4 providers and 9 models
- `<think>` tag parser for reasoning models
- Available Endpoints card on Endpoint page (127 chat, 9 embedding, 9 image models)

### 0.2.72 — 2026-02-08

- Split Kimi into dual providers: `kimi` (OpenAI-compatible) and `kimi-coding` (Moonshot API)
- Hybrid CLI runtime support with Docker profiles (`runner-base`, `runner-cli`)
- Hardened cloud sync/auth flow with SSE fallback

### 0.2.66 — 2026-02-06

- Cursor provider end-to-end support with OAuth import flow
- `requireLogin` control and `hasPassword` state handling
- Usage/quota UX improvements
- Model support for custom providers
- Codex updates (GPT-5.3, thinking levels), Claude Opus 4.6, MiniMax Coding
- Auto-validation for provider API keys

### 0.2.56 — 2026-02-04

- Anthropic-compatible provider support
- Provider icons across dashboard
- Enhanced usage tracking pipeline

### 0.2.52 — 2026-02-02

- Codex Cursor compatibility and Next.js 16 proxy migration
- OpenAI-compatible provider nodes (CRUD/validation/test)
- Token expiration and key-validity checks
- Non-streaming response translation for multiple formats
- Kiro OAuth wiring and token refresh support

### 0.2.43 — 2026-01-27

- Fixed CLI tools model selection
- Fixed Kiro translator request handling

### 0.2.36 — 2026-01-19

- Usage dashboard page
- Outbound proxy support in Open SSE fetch pipeline
- Fixed combo fallback behavior

### 0.2.31 — 2026-01-18

- Fixed Kiro token refresh and executor behavior
- Fixed Kiro request translation handling

### 0.2.27 — 2026-01-15

- Added Kiro provider support with OAuth flow
- Fixed Codex provider behavior

### 0.2.21 — 2026-01-12

- Initial README and project setup
