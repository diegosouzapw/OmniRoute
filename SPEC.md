# OmniRoute — Specification (v8)

> **Status**: Living document — reflects the canonical current architecture (2026-06-18).
> **Audience**: Contributors, operators, downstream Phenotype services.
> **Owner**: OmniRoute core team (see `CODEOWNERS`).
> **Supersedes**: SPEC.md v1–v7 (decomposition-era spec at `docs/archive/SPEC-v1.md`).

---

## 1. Purpose

`OmniRoute` is the **provider-agnostic LLM routing layer** for the Phenotype
ecosystem. It accepts chat, completion, image, audio, video, embedding, search,
moderation, rerank, and tool-call requests from any Phenotype service, selects
the right **upstream provider** (OpenAI, Anthropic, Gemini, DeepSeek, Groq, xAI,
Mistral, Cohere, NVIDIA, Fireworks, Cerebras, HuggingFace, OpenRouter, Vertex
AI, Cloudflare AI, Together, Pollinations, Puter, vLLM, Ollama, and 200+ more)
based on **policy + cost + latency + capability + quota**, and forwards the
request as an **OpenAI-compatible** (or Anthropic-compatible, Responses-API,
or A2A-JSON-RPC) response.

The product surface is **a Next.js 16 application exposing HTTP, MCP, A2A,
and ACP endpoints**, not a library. The deployment unit is a single Node.js
process (or containerized equivalent).

**Goal**: *"Drop-in replacement for the OpenAI SDK, but routes across providers
— and exposes the same surface for agents (MCP), peer agents (A2A), and human
operators (dashboard, webhooks, evals)."*

---

## 2. Core Tenets (non-negotiable)

1. **Provider-agnostic by construction** — every provider is behind a
   `ProviderAdapter` + `BaseExecutor`; adding a provider does not change
   routing logic. **232 providers** as of v3.8.24 (see
   `docs/reference/PROVIDER_REFERENCE.md`).
2. **Policy is data, not code** — routing rules, model aliases, rate limits,
   cost caps, compression combos, and guardrail policies live in SQLite
   (`src/lib/db/`) or config; never hardcoded in routes.
3. **Streaming-first** — every provider must support SSE streaming or its
   equivalent. Non-streaming paths are second-class and gated behind
   `allowNonStreaming: true` per combo.
4. **Cost is visible** — every completion has a `cost_usd` estimate in
   response metadata, syncs from LiteLLM pricing nightly
   (`src/lib/pricingSync.ts`).
5. **No lock-in** — on-disk conversation log is portable JSONL; users can
   export to OpenAI/Anthropic formats at any time.
6. **HITL-friendly** — every internal state mutation is auditable via the
   `mcp_audit` table, the `webhookDispatcher` event stream, and the
   `config_audit` policy log.

---

## 3. Architecture Overview

> **v8.1 update (2026-06-18, ADR-031):** OmniRoute is now a **2-tier
> architecture**. The **Tier-1 router** is the `maximhq/bifrost` Go AI gateway
> (vendored at `KooshaPari/bifrost`), which absorbs provider dispatch, format
> translation, fallback, load balancing, semantic cache, virtual keys, budget
> mgmt, and observability. **Tier-2** is OmniRoute's TypeScript engine, which
> adds the higher-level value: A2A agent orchestration, MCP-router polyglot
> facade, ACP registry, skill registry, policy engine, guardrails, dashboard.
> See [`docs/adr/0031-bifrost-tier1-router.md`](docs/adr/0031-bifrost-tier1-router.md)
> for the full comparison matrix and rationale.

```
                           ┌─────────────────────────────────────────────┐
   client / phenoservice ──│  OpenAI-compat API  (Next.js App Router)     │
   / agent (MCP/A2A/ACP)   │  /v1/chat/completions · /v1/responses · …   │
                           └─────────────────┬───────────────────────────┘
                                             │
                                             ▼
                           ┌─────────────────────────────────────────────┐
                           │  Tier 2: OmniRoute engine                    │
                           │  Authorization pipeline  (classify→policy)  │
                           │  open-sse/  handlers/chatCore → combo       │
                           │  A2A · MCP-router · ACP · skill registry    │
                           │  policy engine · guardrails · evals         │
                           └─────────────────┬───────────────────────────┘
                                             │
                              OpenAI-compat /v1/chat/completions
                                             │
                                             ▼
                           ┌─────────────────────────────────────────────┐
                           │  Tier 1: Bifrost gateway (Go, MIT)          │
                           │  23+ provider dispatch · fallback · LB       │
                           │  virtual keys · budget mgmt · observability │
                           │  MCP client · semantic cache                │
                           └─────────────────┬───────────────────────────┘
                                             │
                  ┌──────────────────────────┼──────────────────────────┐
                  ▼                          ▼                          ▼
          ┌──────────────┐         ┌──────────────────┐         ┌──────────────┐
          │  Providers   │         │  Bifrost MCP     │         │  Bifrost     │
          │  (23+ tier1) │         │  client          │         │  semantic    │
          │  via Bifrost │         │  (upstream MCP)  │         │  cache       │
          └──────┬───────┘         └────────┬─────────┘         └──────┬───────┘
                 │                          │                          │
                 └──────────────────────────┼──────────────────────────┘
                                            ▼
                           ┌─────────────────────────────────────────────┐
                           │  SQLite  (DATA_DIR, default ~/.omniroute/)   │
                           │  83 modules · 97 migrations · 17 base tbls  │
                           └─────────────────────────────────────────────┘
```

**Three concentric layers:**

| Layer | Tech | Path | Role |
|---|---|---|---|
| **Gateway** | Next.js 16 (App Router) | `src/app/api/v1/` | OpenAI-compatible HTTP surface |
| **Engine** | TypeScript 6 (Node `>=22`) | `open-sse/` | Streaming, combo routing, executors, translator, transformer |
| **Persistence** | better-sqlite3 (WAL) | `src/lib/db/` | 83 domain modules + 97 migrations |

**Three cross-cutting surfaces** layered on the engine:

| Surface | Path | Protocol | Audience |
|---|---|---|---|
| **MCP Server** | `open-sse/mcp-server/` | MCP (stdio/SSE/Streamable HTTP) | Tool-using agents |
| **A2A Server** | `src/lib/a2a/` | JSON-RPC 2.0 + SSE | Peer agents |
| **ACP Registry** | `src/lib/acp/` | Agent Communication Protocol | Agent discovery |

**Two UX surfaces**:

- **Web dashboard** (`src/app/`) — chat playground, admin, settings, monitoring.
- **Electron desktop** (`electron/`) — packaged cross-platform (Win/macOS/Linux).

---

## 4. Repo Layout (canonical)

```
OmniRoute/
├── src/                                # Next.js 16 application
│   ├── app/                            # App Router pages + API routes
│   │   ├── api/v1/                     # OpenAI-compatible endpoints
│   │   ├── api/mcp/                    # MCP transports (SSE, Stream)
│   │   ├── a2a/                        # A2A JSON-RPC endpoint
│   │   └── dashboard/                  # Multi-tenant admin UI
│   ├── components/                     # React components
│   ├── lib/                            # Business logic
│   │   ├── db/                         # 83 domain modules + 97 migrations
│   │   ├── a2a/                        # A2A skills + task manager
│   │   ├── acp/                        # Agent Communication Protocol
│   │   ├── memory/                     # Memory system
│   │   ├── skills/                     # Skills framework
│   │   ├── compliance/                 # Compliance policy index
│   │   ├── guardrails/                 # Hot-reloadable guardrails
│   │   ├── cloudAgent/                 # Cloud agent tasks
│   │   ├── evals/                      # Eval framework
│   │   ├── mitm/                       # MITM proxy (cert, DNS, routing)
│   │   └── webhooks/                   # Webhook dispatcher
│   ├── domain/                         # Policy engine (policyEngine, comboResolver, costRules, fallbackPolicy, lockoutPolicy, …)
│   ├── hooks/                          # React hooks
│   ├── styles/                         # CSS / Tailwind v4
│   ├── types/                          # TypeScript type defs
│   ├── shared/                         # Cross-cutting constants + validation
│   │   ├── constants/                  # providers, routingStrategies, upstreamHeaders
│   │   └── validation/                 # Zod schemas (providerSchema, …)
│   ├── sse/                            # SSE services (auth, storage, …)
│   ├── server/                         # authz, classify, policy, enforce
│   ├── proxy.ts                        # Main request entry
│   ├── server-init.ts                  # Boot-time wiring
│   ├── instrumentation-node.ts        # OpenTelemetry init
│   └── eval/                           # Eval runner integration
├── open-sse/                           # Streaming engine (workspace pkg)
│   ├── handlers/                       # chatCore, embeddings, imageGen, …
│   ├── executors/                      # base, default, cursor, codex, antigravity, …
│   ├── translator/                     # OpenAI↔Anthropic↔Gemini
│   ├── transformer/                    # Responses-API ⇄ Chat-Completions
│   ├── services/                       # 115 modules (combo, rateLimit, cache, …)
│   ├── mcp-server/                     # 87 MCP tools · 30 scopes
│   └── utils/                          # error, publicCreds, retry, …
├── tests/                              # Vitest (MCP) + node:test (unit/integration)
│   ├── unit/                           # node --test (default)
│   ├── integration/                    # node --test
│   └── e2e/                            # Playwright
├── electron/                           # Cross-platform desktop app
├── docs/                               # English docs (authored, NOT i18n)
│   ├── adr/                            # 5 ADRs (test runner, coverage, …)
│   ├── architecture/                   # REPOSITORY_MAP, ARCHITECTURE, AUTHZ, RESILIENCE
│   ├── frameworks/                     # MCP, A2A, ACP, MCP, MEMORY, SKILLS, …
│   ├── routing/                        # AUTO-COMBO, REASONING_REPLAY, QUOTA_SHARE
│   ├── security/                       # GUARDRAILS, ERROR_SANITIZATION, PUBLIC_CREDS, …
│   ├── ops/                            # RELEASE_CHECKLIST, TUNNELS, COVERAGE_PLAN
│   ├── reference/                      # API_REFERENCE, PROVIDER_REFERENCE, ENVIRONMENT
│   ├── compression/                    # engines, RTK, language packs
│   ├── comparison/                     # OMNIROUTE_VS_ALTERNATIVES
│   ├── getting-started/                # QUICK-START, PROVIDERS-GUIDE, …
│   ├── guides/                         # USER_GUIDE, ELECTRON_GUIDE, I18N, …
│   ├── audits/                         # FLEET-AUDIT-30-PILLAR
│   ├── bdd/                            # proxy-egress-isolation.feature (cucumber)
│   ├── providers/                      # ZED-DOCKER
│   ├── plugins/                        # PLUGIN_SDK
│   ├── research/                       # UNLIMITED_LLM_ACCESS, DISCOVERY_TOOL_DESIGN
│   ├── marketing/                      # TIERS
│   ├── dev/                            # plugins
│   ├── diagrams/                       # Mermaid source
│   ├── archive/                        # Historical sladge + superseded content
│   ├── ADR-001-canonical-routing.md    # Phenotype-org routing convergence
│   ├── ROUTING-CONVERGENCE-STATUS.md   # Live convergence scoreboard
│   ├── PROVIDERS.md                    # Provider catalog summary
│   ├── AGENTROUTER.md                  # AgentRouter framing
│   ├── COST.md                         # Resource efficiency (L25)
│   ├── OKR.md                          # OKR/KPI alignment (L05)
│   ├── TECH_DEBT.md                    # Debt register (L10)
│   ├── SSOT.md                         # Single source of truth
│   ├── DOCUMENTATION_OVERHAUL_PLAN.md
│   ├── fix-opencode-context.md
│   ├── index.md                        # Doc index
│   ├── README.md                       # Doc README
│   ├── traceability.md                 # Cross-doc traceability
│   └── SUBMIT_PR.md
├── @omniroute/                         # Internal SDK monorepo subpackage
├── skills/                             # Built-in skill library
├── bin/                                # CLI entry points
├── scripts/                            # Build / i18n / audit / benchmark
├── worklogs/                           # Per-session worklog entries
├── public/                             # Static assets
├── examples/                           # Provider / config examples
├── benches/                            # Performance benchmarks
├── tools/                              # Internal tools
├── config/                             # Runtime config templates
├── assets/                             # Brand assets
├── images/                             # Doc images
├── contrib/                            # Community contributions
├── AGENTS.md                           # Agent operating instructions
├── ADR.md                              # Top-level ADR index
├── PLAN.md                             # Quarterly roadmap
├── SPEC.md                             # THIS file
├── STATUS.md                           # Live state (post-merge)
├── CLAUDE.md / GEMINI.md               # Agent-platform-specific guides
├── README.md / CHANGELOG.md            # Public-facing
├── CONTRIBUTING.md                     # Contribution guide
├── SECURITY.md                         # Security policy
├── UPSTREAM_SYNC.md                    # diegosouzapw/OmniRoute sync protocol
├── .editorconfig / .gitattributes      # Cross-tool formatting
├── .env.example                        # 81KB of documented env vars
├── .husky/                             # Git hooks (pre-commit, pre-push)
├── .github/                            # CI workflows + governance
│   ├── workflows/                      # ci, scorecard, audit, …
│   ├── CODEOWNERS                      # Subtree ownership
│   ├── dependabot.yml                  # Grouped Dependabot config
│   └── ISSUE_TEMPLATE/                 # Issue templates + config.yml
├── .devcontainer/                      # Devcontainer config
├── .vscode/                            # VS Code workspace settings
├── .gitleaks.toml                      # Secret-scan policy
├── .zizmor.yml                         # zizmor workflow linter
├── .license-allowlist.json             # License allowlist
├── .npmignore                          # npm publish ignore
├── .pre-commit-config.yaml             # pre-commit hooks
├── .size-limit.json                    # Bundle size limits
├── eslint.config.mjs / .sonarjs…      # Lint configs
├── knip.json                           # Unused-export detection
├── sonar-project.properties            # SonarQube config
├── semcheck.yaml                       # Semantic-version check
├── stryker.conf.json                   # Mutation testing
├── vitest.config.ts / .mcp.config.ts   # Vitest configs
├── playwright.config.ts                # Playwright config
├── promptfooconfig.yaml                # Promptfoo eval
├── dprint.json                         # dprint formatter
├── file-size-baseline.json             # File size budget
├── complexity-baseline.json            # Cyclomatic complexity budget
├── duplication-baseline.json           # Duplication budget
├── test-discovery-baseline.json        # Test inventory
├── quality-baseline.json               # Quality metrics
├── audit_scorecard.json                # 30-pillar scorecard snapshot
├── cliff.toml                          # Conventional-changelog config
├── Dockerfile                          # Production container
├── Justfile                            # Cross-platform task runner
├── next.config.mjs                     # Next.js config
├── tsconfig.typecheck-noimplicit-core.json
├── llm.txt                             # LLM-friendly repo description
├── package.json                        # See src for actual scripts
└── .coderabbit.yaml / .gemini/         # CodeRabbit + Gemini CLI config
```

---

## 5. Design Principles

### 5.1 Provider Layer

- **`ProviderAdapter` interface** in `src/shared/` — every adapter implements
  the same shape regardless of upstream API.
- **`BaseExecutor`** (`open-sse/executors/base.ts`) — common request lifecycle:
  `buildUrl() → buildHeaders() → transformRequest() → fetch() → retry` with
  exponential backoff.
- **Provider-specific executors** (Cursor, Codex, Antigravity, GitHub, Gemini-CLI,
  Kiro, Qoder, Vertex, Cloudflare-AI, OpenCode, Pollinations, Puter) override
  only what differs from `DefaultExecutor`.
- **Translator** (`open-sse/translator/`) — converts between OpenAI, Anthropic,
  and Gemini formats bidirectionally. Source format is detected from request
  body; target format is dictated by resolved provider.
- **Response translation** runs in reverse after upstream response, converting
  back to the client's expected format. `responsesTransformer.ts` produces the
  Responses-API SSE event stream.

### 5.2 Routing Engine

- **15 routing strategies** (`ROUTING_STRATEGY_VALUES` in
  `src/shared/constants/routingStrategies.ts`): priority, weighted, fill-first,
  round-robin, P2C, random, least-used, **reset-aware (v3.8)**, reset-window,
  cost-optimized, strict-random, auto, lkgp, context-optimized, context-relay.
- **15 → 17 in v3.8.24** with context-relay added for multi-turn conversation
  preservation.
- **`handleComboChat()`** — entry point in `open-sse/services/combo.ts`.
  Iterates `ResolvedComboTarget[]` in order until one succeeds or all fail.
- **`resolveComboTargets()`** — expands combo config into ordered targets
  (provider + model + account + credentials).
- **`handleSingleModel()`** — wraps `handleChatCore()` with per-target error
  handling and circuit breaker checks.

### 5.3 Auto-Combo (12-factor scoring)

- 12 scoring factors evaluated per request: cost, latency, error rate, model
  fitness, context length, capability match, account health, quota, etc.
- See `docs/routing/AUTO-COMBO.md` for the full scoring rubric.

### 5.4 Resilience (3 layers)

1. **Provider-level** — retry with exponential backoff, circuit breaker.
2. **Account-level** — `accountFallback.ts` rotates accounts on rate-limit.
3. **Combo-level** — falls through `ResolvedComboTarget[]` on per-target error.

See `docs/architecture/RESILIENCE_GUIDE.md`.

### 5.5 Authorization (`src/server/authz/`)

- 3 route classes: **PUBLIC** (no auth), **CLIENT_API** (API key), **MANAGEMENT**
  (session cookie + role).
- Pipeline: `classify → policies → enforce`.
- API key scopes (30 total, mirrored in `OMNIROUTE_MCP_SCOPES`) gate the MCP
  tool surface; see `docs/architecture/AUTHZ_GUIDE.md`.

### 5.6 Cost & Pricing

- `src/lib/pricingSync.ts` syncs from LiteLLM nightly.
- Every completion: `cost_usd`, `cost_estimate_basis`, `provider_cost_basis`.
- Cost caps enforced per user/tenant via `quota.ts` token-bucket.

### 5.7 Caching

- **Semantic cache** — request signature hashed; similar prompts share results.
- **Signature cache** — exact-match replay.
- **Read cache** — for tool/function-call results.
- **Reasoning cache** (`src/lib/db/reasoningCache.ts` +
  `open-sse/services/reasoningCache.ts`) — hybrid in-memory + SQLite cache for
  `reasoning_content`; re-injects on multi-turn for strict providers (DeepSeek
  V4, Kimi K2, Qwen-Thinking, GLM, xiaomi-mimo). See
  `docs/routing/REASONING_REPLAY.md`.

### 5.8 Prompt Compression

- Modular pipeline (`open-sse/services/compression/`) — runs **proactively**
  before the existing reactive context manager.
- 7 modes: off, lite, standard, aggressive, ultra, rtk, stacked.
- Engines: `caveman` (semantic condensation), `rtk` (rule-based terminal output).
- 5 lite techniques: `collapseWhitespace`, `dedupSystemPrompt`,
  `compressToolResults`, `removeRedundantContent`, `replaceImageUrls` (10-15%
  savings at <1ms).
- See `docs/compression/COMPRESSION_GUIDE.md`,
  `docs/compression/COMPRESSION_ENGINES.md`,
  `docs/compression/RTK_COMPRESSION.md`.

---

## 6. Persistence Layer (`src/lib/db/`)

**SQLite (better-sqlite3, WAL journaling)** with `getDbInstance()` singleton
in `core.ts`. 83 domain modules, 97 migrations, 17 base tables.

| Domain | Key modules |
|---|---|
| Core | `core.ts`, `migrationRunner.ts`, `encryption.ts`, `stateReset.ts` |
| Providers / catalog | `providers.ts`, `models.ts`, `providerLimits.ts`, `compressionAnalytics.ts` |
| Routing | `combos.ts`, `modelComboMappings.ts`, `domainState.ts`, `commandCodeAuth.ts` |
| Auth | `apiKeys.ts`, `secrets.ts`, `registeredKeys.ts`, `sessionAccountAffinity.ts` |
| Usage / billing | `quotaSnapshots.ts`, `creditBalance.ts`, `usage*.ts`, `compressionCacheStats.ts` |
| Storage | `backup.ts`, `cleanup.ts`, `jsonMigration.ts`, `healthCheck.ts`, `databaseSettings.ts` |
| Extensions | `evals.ts`, `webhooks.ts`, `reasoningCache.ts`, `readCache.ts`, `tierConfig.ts`, `compressionCombos.ts`, `compressionScheduler.ts`, `batches.ts`, `files.ts`, `syncTokens.ts`, `proxies.ts`, `oneproxy.ts`, `upstreamProxy.ts`, `versionManager.ts`, `cliToolState.ts`, `prompts.ts`, `detailedLogs.ts`, `contextHandoffs.ts`, `compression.ts`, `stats.ts` |

Live counts: `ls src/lib/db/*.ts | wc -l` (modules), `ls src/lib/db/migrations/*.sql | wc -l` (migrations),
`grep -c "CREATE TABLE" src/lib/db/core.ts` minus 1 (base tables, excluding
`_omniroute_migrations` bookkeeping table).

**Schema rules**:
- `localDb.ts` is a re-export layer only — never add logic there.
- Every migration is idempotent and runs in a transaction.
- Encryption helpers protect sensitive fields at rest
  (`encryptConnectionFields`).

---

## 7. Cross-Cutting Surfaces

### 7.1 MCP Server (`open-sse/mcp-server/`)

**87 tools** (canonical, see `TOTAL_MCP_TOOL_COUNT` in `server.ts`) in 3
transports: stdio, SSE (`/api/mcp/sse`), Streamable HTTP (`/api/mcp/stream`).

| Group | Count | Notes |
|---|---|---|
| Core | 20 | get_health, list_combos, switch_combo, route_request, simulate_route, … |
| Cache | 2 | cache_stats, cache_flush |
| Compression | 5 | compression_status, compression_configure, set_compression_engine, … |
| 1proxy | 3 | oneproxy_fetch, oneproxy_rotate, oneproxy_stats |
| Memory | 3 | memory_search, memory_add, memory_clear |
| Skill | 4 | skills_list, skills_enable, skills_execute, skills_executions |
| Agent-skill | 3 | A2A skill discovery / invocation bridges |
| Gamification | 8 | levels, badges, leaderboard, federation queries |
| Plugin | 8 | marketplace listing, install/enable/disable, runtime inspection |
| Notion | 6 | knowledge-base read/write |
| Obsidian | 22 | vault search, note CRUD, WebDAV-backed file ops |

**Scopes**: 30 (`OMNIROUTE_MCP_SCOPES`) — every tool category is scope-gated.
**Audit**: every invocation logged to `mcp_audit` (tool, args, success/failure,
API key attribution, timestamp).

See `docs/frameworks/MCP-SERVER.md`.

### 7.2 A2A Server (`src/lib/a2a/`)

JSON-RPC 2.0 + SSE streaming. **Agent Card** at `/.well-known/agent.json`.

**Skills (6)**: `smartRouting.ts`, `quotaManagement.ts`, `providerDiscovery.ts`,
`costAnalysis.ts`, `healthReport.ts`, `listCapabilities.ts`.

**Task lifecycle**: `submitted → working → completed | failed | canceled`.
Tasks have TTL and auto-cleanup.

**JSON-RPC methods**: `message/send` (sync), `message/stream` (SSE),
`tasks/get`, `tasks/cancel` — dispatched via `POST /a2a`.

See `docs/frameworks/A2A-SERVER.md`.

### 7.3 ACP Registry (`src/lib/acp/`)

Agent Communication Protocol: registry and manager. Allows third-party agents
to register capabilities and be discovered by peer agents.

### 7.4 Cloud Agents (`src/lib/cloudAgent/`)

`CloudAgentBase` abstract class + 3 agents (codex-cloud, devin, jules). Tasks
persisted in `cloud_agent_tasks`; management auth required. See
`docs/frameworks/CLOUD_AGENT.md`.

### 7.5 Skills System (`src/lib/skills/`)

Extensible skill framework: registry (DB-backed), executor (configurable
timeout + retry), sandbox (isolation for user-provided skills), built-in
skills, custom skill support, interception, and prompt injection. 46
shipped skills in `skills/` directory.

### 7.6 Memory System (`src/lib/memory/`)

Extraction, injection, retrieval, summarization, and store modules for
persistent conversational memory across sessions.

### 7.7 Webhooks (`src/lib/webhookDispatcher.ts`)

HMAC-signed delivery, exponential backoff, auto-disable after 10 failures.
7 event types. See `docs/frameworks/WEBHOOKS.md`.

### 7.8 Guardrails (`src/lib/guardrails/`)

Hot-reloadable guardrails framework. 3 built-in: `pii-masker`,
`prompt-injection`, `vision-bridge`. **Fail-open** by default; per-request
opt-out via header. See `docs/security/GUARDRAILS.md`.

### 7.9 MITM Proxy (`src/mitm/`)

MITM proxy capability with certificate management, DNS handling, and target
routing.

### 7.10 Evals (`src/lib/evals/`)

Generic eval framework: `evalRunner.ts`, `runtime.ts`. Targets: combo,
model, suite-default. See `docs/frameworks/EVALS.md`.

### 7.11 Compliance (`src/lib/compliance/`)

Policy index for compliance enforcement. See `docs/security/COMPLIANCE.md`.

### 7.12 Tunnels (`src/lib/{cloudflaredTunnel,ngrokTunnel}.ts`)

Cloudflare Quick/Named, ngrok, Tailscale Funnel. See
`docs/ops/TUNNELS_GUIDE.md`.

### 7.13 Embedded Services

`docs/frameworks/EMBEDDED-SERVICES.md` — services that ship as
OmniRoute-embedded modules (vs federated).

---

## 8. Provider Surface

**232 providers** as of v3.8.24. Categories:

| Category | Count | Examples |
|---|---|---|
| Free | 4 | Qoder AI, Qwen Code, Gemini CLI (deprecated), Kiro AI |
| OAuth | 14 | Claude Code, Antigravity, Codex, GitHub Copilot, Cursor, Kimi Coding, Kilo Code, Cline, Qwen (⚠️ free tier discontinued 2026-04-15), Kiro, Qoder, Gemini, Windsurf (v3.8), GitLab Duo (v3.8) |
| API Key | 120+ | OpenAI, Anthropic, Gemini, DeepSeek, Groq, xAI, Mistral, Perplexity, Together, Fireworks, Cerebras, Cohere, NVIDIA, Nebius, SiliconFlow, Hyperbolic, HuggingFace, OpenRouter, Vertex AI, Cloudflare AI, Scaleway, AI/ML API, Pollinations, Puter, Longcat, Alibaba, Kimi, Blackbox, Synthetic, Kilo Gateway, Z.AI, GLM, Deepgram, AssemblyAI, ElevenLabs, Cartesia, PlayHT, Inworld, NanoBanana, SD WebUI, ComfyUI, Ollama Cloud, Perplexity Search, Serper, Brave, Exa, Tavily, OpenCode Zen/Go, Bailian Coding Plan, DeepInfra, Vercel AI Gateway, Lambda AI, SambaNova, nScale, OVHcloud AI, Baseten, PublicAI, Moonshot AI, Meta Llama API, v0 (Vercel), Morph, Featherless AI, FriendliAI, LlamaGate, Galadriel, Weights & Biases Inference, Volcengine, AI21 Labs, Venice.ai, Codestral, Upstage, Maritalk, Xiaomi MiMo, Inference.net, NanoGPT, Predibase, Bytez, Heroku AI, Databricks, Snowflake Cortex, GigaChat (Sber), CrofAI, AgentRouter, ChatGPT Web, Baidu Qianfan, AWS Polly, RunwayML, GitLab Duo, Amazon Q, Empower, Poe, and many more. |
| Self-Hosted | 8+ | LM Studio, vLLM, Lemonade, Llamafile, Triton, Docker Model Runner, Xinference, Oobabooga |
| Custom | n | OpenAI-compatible (`openai-compatible-*`) and Anthropic-compatible (`anthropic-compatible-*`) prefixes |

Providers are registered in `src/shared/constants/providers.ts` with Zod
validation at module load.

**Adding a new provider** (5-step process, see `AGENTS.md` § Adding a New Provider):

1. Register in `src/shared/constants/providers.ts`
2. Add executor in `open-sse/executors/` (if custom logic needed)
3. Add translator in `open-sse/translator/` (if non-OpenAI format)
4. Add OAuth config in `src/lib/oauth/constants/oauth.ts` (if OAuth-based)
5. Add models in `open-sse/config/providerRegistry.ts`

---

## 9. Test & Coverage Governance

| Layer | Tool | Runner | Path |
|---|---|---|---|
| Unit (most tests) | `node:test` + `tsx/esm` | `node --import tsx/esm --test` | `tests/unit/` |
| Integration | `node:test` + `tsx/esm` | same | `tests/integration/` |
| MCP server | Vitest | `npm run test:vitest` | MCP-specific |
| Auto-Combo | Vitest | same | `vitest.mcp.config.ts` |
| E2E | Playwright | `npm run test:e2e` | `tests/e2e/` |
| Protocols E2E | Playwright | `npm run test:protocols:e2e` | MCP/A2A transports |
| Ecosystem | Custom | `npm run test:ecosystem` | Compatibility suite |
| Mutation | Stryker | `stryker.conf.json` | Selected packages |
| Coverage | Vitest + c8/istanbul | `npm run test:coverage` | tarball + lcov |

**Coverage floor: 70%** (see `docs/adr/0003-coverage-floor-70-pct.md`).
**No i18n tests** — i18n is auto-generated, not authored.

**Quality gates**: 35 in `docs/architecture/QUALITY_GATES.md` (allowlist policy).

**Doc accuracy gate**: `npm run check:fabricated-docs` extracts every route
path, env var, hook name, function name, and file reference from
`docs/**/*.md` and verifies each one against the codebase. **0 fabricated
claims in shipped docs.**

---

## 10. i18n Strategy

- 42 locales, `next-intl`, `src/i18n/messages/*.json`.
- **Auto-generated** translations: `npm run i18n:translate` (see
  `docs/guides/I18N.md`).
- **Gitignored**: `src/i18n/messages/` is regenerated; only the seed locale
  is committed. See `docs/adr/0005-i18n-gitignore-strategy.md`.

---

## 11. Security

**Hard rules** (see `AGENTS.md` § Security):

- **NEVER** commit API keys, secrets, or credentials.
- Validate all user inputs with Zod schemas.
- Auth middleware required on all API routes.
- Never log SQLite encryption keys.
- Sanitize user content (dompurify for HTML).
- **Public upstream OAuth identifiers** (Gemini / Antigravity / Windsurf-style
  client_id/secret + Firebase Web keys extracted from public CLIs): use
  `resolvePublicCred()` from `open-sse/utils/publicCreds.ts`, **never** as
  string literals. Full pattern in `docs/security/PUBLIC_CREDS.md`.
- **Error responses** (HTTP / SSE / executor / MCP): use `buildErrorBody()` or
  `sanitizeErrorMessage()` from `open-sse/utils/error.ts`, **never** put raw
  `err.stack` / `err.message` in a Response body. Full pattern in
  `docs/security/ERROR_SANITIZATION.md`.
- **`exec()` / `spawn()` with runtime values**: pass via the `env` option,
  **never** string-interpolate paths/values into the script body. Reference:
  `src/mitm/cert/install.ts::updateNssDatabases`.

**Secret scanning**: `.gitleaks.toml` policy + gitleaks pre-commit.
**Workflow lint**: `.zizmor.yml` configures zizmor for GitHub Actions.
**Supply chain**: `docs/security/SUPPLY_CHAIN.md` + OpenSSF Scorecard
(`.github/workflows/scorecard.yml`).

**Stealth mode**: `docs/security/STEALTH_GUIDE.md` — feature flag for
undetectable provider requests (used by Antigravity, Windsurf, Cursor).

---

## 12. Release & Deployment

- **Container**: `Dockerfile` (multi-stage, node:22-bookworm-slim base).
- **CI**: GitHub Actions (`.github/workflows/ci.yml`) — typecheck, lint, test
  (unit + integration + e2e), coverage, OpenSSF Scorecard, zizmor, gitleaks.
- **VPS deploy**: `dist/` (assembled by `assembleStandalone` after
  `next build`) rsyncs into `/usr/lib/node_modules/omniroute/app/`.
- **Fly.io**: `docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md`.
- **VM**: `docs/ops/VM_DEPLOYMENT_GUIDE.md`.
- **CHANGELOG**: auto-generated by `cliff.toml` (conventional-changelog).
- **Release checklist**: `docs/ops/RELEASE_CHECKLIST.md`.

---

## 13. Phenotype-Org Convergence

This is the **canonical routing project** for the Phenotype org (see
`docs/ADR-001-canonical-routing.md` and `docs/ROUTING-CONVERGENCE-STATUS.md`).

**Cluster convergence plan**:

| Source | Migration target | Status |
|---|---|---|
| `phenoAI` agent tooling | OmniRoute workspace | pending |
| `phenoRouterMonitor` Pareto dashboard | `monitoring/` | pending |
| `Tokn` TokenLedger | `crates/tokn` | pending (extraction in progress) |
| `helios-router` primitives | `bifrost` crate | pending |

**Naming-collision hazard**: three "bifrost" referents exist:
1. `KooshaPari/bifrost` repo = vendored **maximhq** Go gateway fork.
2. ADR-001's "bifrost" = Phenotype routing substrate (in `pheno` monorepo).
3. `crates/bifrost-routing` inside `phenoRouterMonitor` = a deprecated stub.

The canonical substrate is `Tokn::tokenledger::routing` (Rust, hexagonal:
pareto_router/ports/adapters) per the 2026-06-03 disambiguation note.

---

## 14. Cross-References

| File | Purpose |
|---|---|
| `AGENTS.md` | Agent operating instructions (canonical for human/AI contributors) |
| `ADR.md` | Top-level ADR index (this repo's decisions) |
| `PLAN.md` | Quarterly roadmap (Q3 2026 → Q4 2026) |
| `STATUS.md` | Live state (post-merge snapshot) |
| `docs/adr/` | 5 ADRs (test runner, coverage, decomposition, i18n) |
| `docs/architecture/` | REPOSITORY_MAP, ARCHITECTURE, AUTHZ, RESILIENCE, QUALITY_GATES |
| `docs/frameworks/` | MCP, A2A, ACP, MEMORY, SKILLS, CLOUD_AGENT, EVALS, WEBHOOKS, AGENT-SKILLS |
| `docs/routing/` | AUTO-COMBO, REASONING_REPLAY, QUOTA_SHARE |
| `docs/security/` | GUARDRAILS, ERROR_SANITIZATION, PUBLIC_CREDS, COMPLIANCE, SUPPLY_CHAIN, STEALTH_GUIDE |
| `docs/ops/` | RELEASE_CHECKLIST, TUNNELS, COVERAGE_PLAN, SQLITE_RUNTIME |
| `docs/reference/` | API_REFERENCE, PROVIDER_REFERENCE, ENVIRONMENT, CLI-TOOLS, FREE_TIERS |
| `docs/compression/` | COMPRESSION_GUIDE, COMPRESSION_ENGINES, RTK_COMPRESSION, COMPRESSION_LANGUAGE_PACKS |
| `docs/getting-started/` | QUICK-START, PROVIDERS-GUIDE, AUTO-COMBO-GUIDE, FREE-TIERS-GUIDE, TROUBLESHOOTING |
| `docs/guides/` | USER_GUIDE, ELECTRON_GUIDE, I18N, PWA_GUIDE, DOCKER_GUIDE, KIRO_SETUP, TERMUX_GUIDE, CODEX-CLI-CONFIGURATION, FEATURES, SETUP_GUIDE |
| `docs/comparison/` | OMNIROUTE_VS_ALTERNATIVES |
| `docs/research/` | UNLIMITED_LLM_ACCESS, DISCOVERY_TOOL_DESIGN |
| `docs/audits/` | FLEET-AUDIT-30-PILLAR, AUDIT-METHOD, SCRIPTS-NOTE |
| `docs/bdd/` | proxy-egress-isolation.feature |
| `docs/diagrams/` | Mermaid source |
| `CONTRIBUTING.md` | Contribution guide |
| `SECURITY.md` | Security policy |
| `UPSTREAM_SYNC.md` | diegosouzapw/OmniRoute sync protocol |
| `CHANGELOG.md` | Auto-generated changelog (cliff.toml) |
| `README.md` | Public-facing repo README |
| `audit_scorecard.json` | 30-pillar audit snapshot |
| `llm.txt` | LLM-friendly repo description |
| `docs/COST.md` | Resource efficiency (L25) |
| `docs/OKR.md` | OKR/KPI alignment (L05) |
| `docs/TECH_DEBT.md` | Tech debt register (L10) |
| `docs/SSOT.md` | Single source of truth pointer |
| `docs/traceability.md` | Cross-doc traceability |
| `docs/index.md` | Doc index |
| `docs/README.md` | Doc README |

---

## 15. Versioning

- **Schema version**: see `package.json` `version` field.
- **OpenAPI**: `docs/reference/openapi.yaml` (versioned by route).
- **i18n messages**: locale-keyed JSON; no version field.
- **Migrations**: sequential `NNN_*.sql`; tracked in `_omniroute_migrations`.
- **DB schema version**: stored in `databaseSettings` table; bumped on each
  breaking change.
- **API contract version**: `v1` (current), `v2` (planned, see
  `docs/DOCUMENTATION_OVERHAUL_PLAN.md`).

---

## 16. Open Questions (v8 → v9)

These are the items NOT in this spec yet, planned for v9 (see `PLAN.md`):

1. **Provider auto-discovery** — detect new providers from upstream releases
   and propose addition via PR (planned for v9).
2. **MCP server v2 protocol** — drop SSE transport, go Streamable HTTP only.
3. **A2A streaming cancellation** — proper `tasks/cancel` propagation to
   upstream provider.
4. **Cost prediction ML model** — train on historical `usage.ts` to predict
   cost before request fires.
5. **Cross-cluster routing** — route from one OmniRoute instance to another
   (peer-to-peer federation).
6. **OpenTelemetry-native tracing** — replace custom `instrumentation-node.ts`
   with `@opentelemetry/api` exclusively.
7. **Spec-driven provider onboarding** — declare provider in YAML, generate
   `BaseExecutor` + translator + Zod schema.
8. **Mobile-native** — port Electron desktop to Tauri (smaller binary, Rust
   core reuse).

See `PLAN.md` § v9 Backlog for the full list with effort estimates.
