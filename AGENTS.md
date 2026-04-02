# omniroute — Agent Guidelines

## Project

Unified AI proxy/router — route any LLM through one endpoint. Multi-provider support
with **60+ providers** (OpenAI, Anthropic, Gemini, DeepSeek, Groq, xAI, Mistral, Fireworks,
Cohere, NVIDIA, Cerebras, Pollinations, Puter, Cloudflare AI, HuggingFace, and many more)
with **MCP Server** (25 tools), **A2A v0.3 Protocol**, and **Electron desktop app**.

## Stack

- **Runtime**: Next.js 16 (App Router), Node.js ≥18 <24, ES Modules (`"type": "module"`)
- **Language**: TypeScript 5.9 (`src/`) + JavaScript (`open-sse/`, `electron/`)
- **Database**: better-sqlite3 (SQLite) — `DATA_DIR` configurable, default `~/.omniroute/`
- **Streaming**: SSE via `open-sse` internal workspace package
- **Styling**: Tailwind CSS v4
- **i18n**: next-intl with 30 languages
- **Desktop**: Electron (cross-platform: Windows, macOS, Linux)
- **Schemas**: Zod v4 for all API / MCP input validation

---

## Build, Lint, and Test Commands

| Command                             | Description                       |
| ----------------------------------- | --------------------------------- |
| `npm run dev`                       | Start Next.js dev server          |
| `npm run build`                     | Production build (isolated)       |
| `npm run start`                     | Run production build              |
| `npm run build:cli`                 | Build CLI package                 |
| `npm run lint`                      | ESLint on all source files        |
| `npm run typecheck:core`            | TypeScript core type checking     |
| `npm run typecheck:noimplicit:core` | Strict checking (no implicit any) |
| `npm run check`                     | Run lint + test                   |
| `npm run check:cycles`              | Check for circular dependencies   |
| `npm run electron:dev`              | Run Electron app in dev mode      |
| `npm run electron:build`            | Build Electron app for current OS |

### Running Tests

```bash
# All tests (unit + vitest + ecosystem + e2e)
npm run test:all

# Single test file (Node.js native test runner — most tests use this)
node --import tsx/esm --test tests/unit/your-file.test.mjs
node --import tsx/esm --test tests/unit/plan3-p0.test.mjs
node --import tsx/esm --test tests/unit/fixes-p1.test.mjs
node --import tsx/esm --test tests/unit/security-fase01.test.mjs

# Integration tests
node --import tsx/esm --test tests/integration/*.test.mjs

# Vitest (MCP server, autoCombo)
npm run test:vitest

# E2E with Playwright
npm run test:e2e

# Protocol clients E2E (MCP transports, A2A)
npm run test:protocols:e2e

# Ecosystem compatibility tests
npm run test:ecosystem

# Coverage (55% min thresholds — statements, lines, functions; 60% branches)
npm run test:coverage
```

---

## Code Style Guidelines

### Formatting (Prettier — enforced via lint-staged)

2 spaces · semicolons required · double quotes (`"`) · 100 char width · es5 trailing commas.
Always run `prettier --write` on changed files.

### TypeScript

- **Target**: ES2022 · **Module**: `esnext` · **Resolution**: `bundler`
- `strict: false` — prefer explicit types, don't rely on inference
- Path aliases: `@/*` → `src/`, `@omniroute/open-sse` → `open-sse/`, `@omniroute/open-sse/*` → `open-sse/*`

### ESLint Rules

- **Security (error, everywhere)**: `no-eval`, `no-implied-eval`, `no-new-func`
- **Relaxed in `open-sse/` and `tests/`**: `@typescript-eslint/no-explicit-any` = warn
- React hooks rules and `@next/next/no-assign-module-variable` disabled in `open-sse/` and `tests/`

### Naming

| Element             | Convention                       | Example                              |
| ------------------- | -------------------------------- | ------------------------------------ |
| Files               | camelCase / kebab-case           | `chatCore.ts`, `tokenHealthCheck.ts` |
| React components    | PascalCase                       | `Dashboard.tsx`, `ProviderCard.tsx`  |
| Functions/variables | camelCase                        | `getHealth()`, `switchCombo()`       |
| Constants           | UPPER_SNAKE                      | `MAX_RETRIES`, `DEFAULT_TIMEOUT`     |
| Interfaces          | PascalCase (`I` prefix optional) | `ProviderConfig`                     |
| Enums               | PascalCase (members too)         | `LogLevel.Error`                     |

### Imports

- **Order**: external → internal (`@/`, `@omniroute/open-sse`) → relative (`./`, `../`)
- **No barrel imports** from `localDb.ts` — import from the specific `db/` module instead

### Error Handling

- try/catch with specific error types; always log with context (pino logger)
- Never silently swallow errors in SSE streams — use abort signals for cleanup
- Return proper HTTP status codes (4xx client, 5xx server)

### Security

- **NEVER** commit API keys, secrets, or credentials
- Validate all user inputs with Zod schemas
- Auth middleware required on all API routes
- Never log SQLite encryption keys
- Sanitize user content (dompurify for HTML)

---

## Architecture

### Data Layer (`src/lib/db/`)

All persistence uses SQLite through domain-specific modules:
`core.ts`, `providers.ts`, `models.ts`, `combos.ts`, `apiKeys.ts`, `settings.ts`,
`backup.ts`, `proxies.ts`, `prompts.ts`, `webhooks.ts`, `detailedLogs.ts`,
`domainState.ts`, `registeredKeys.ts`, `quotaSnapshots.ts`, `modelComboMappings.ts`,
`cliToolState.ts`, `encryption.ts`, `readCache.ts`, `secrets.ts`, `stateReset.ts`.
Schema migrations live in `db/migrations/` and run via `migrationRunner.ts`.
`src/lib/localDb.ts` is a **re-export layer only** — never add logic there.

### Request Pipeline (`open-sse/`)

`chatCore.ts` → executor → upstream provider. Translations in `open-sse/translator/`.

**Handlers** (`open-sse/handlers/`): `chatCore.ts`, `responsesHandler.ts`, `embeddings.ts`,
`imageGeneration.ts`, `videoGeneration.ts`, `musicGeneration.ts`, `audioSpeech.ts`,
`audioTranscription.ts`, `moderations.ts`, `rerank.ts`, `search.ts`.

**Upstream headers**: merged after default auth; same header name replaces executor value.
**T5 intra-family fallback** recomputes headers using only the fallback model id.
Forbidden header names: `src/shared/constants/upstreamHeaders.ts` — keep sanitize,
Zod schemas, and unit tests aligned when editing.

### Provider Categories

- **Free** (4): Qoder AI, Qwen Code, Gemini CLI (deprecated), Kiro AI
- **OAuth** (8): Claude Code, Antigravity, Codex, GitHub Copilot, Cursor, Kimi Coding, Kilo Code, Cline
- **API Key** (48+): OpenAI, Anthropic, Gemini, DeepSeek, Groq, xAI, Mistral, Perplexity,
  Together, Fireworks, Cerebras, Cohere, NVIDIA, Nebius, SiliconFlow, Hyperbolic,
  HuggingFace, OpenRouter, Vertex AI, Cloudflare AI, Scaleway, AI/ML API, Pollinations,
  Puter, Longcat, Alibaba, Kimi, Minimax, Blackbox, Synthetic, Kilo Gateway,
  Z.AI, GLM, Deepgram, AssemblyAI, ElevenLabs, Cartesia, PlayHT, Inworld,
  NanoBanana, SD WebUI, ComfyUI, Ollama Cloud, Perplexity Search, Serper, Brave, Exa,
  Tavily, OpenCode Zen/Go, Bailian Coding Plan, and more.
- **Custom**: OpenAI-compatible (`openai-compatible-*`) and Anthropic-compatible (`anthropic-compatible-*`) prefixes

Providers are registered in `src/shared/constants/providers.ts` with Zod validation at module load.

### Executors (`open-sse/executors/`)

Provider-specific request executors: `base.ts`, `default.ts`, `cursor.ts`, `codex.ts`,
`antigravity.ts`, `github.ts`, `gemini-cli.ts`, `kiro.ts`, `qoder.ts`, `vertex.ts`,
`cloudflare-ai.ts`, `opencode.ts`, `pollinations.ts`, `puter.ts`.

### Translator (`open-sse/translator/`)

Translates between API formats (OpenAI-format ↔ Anthropic, Gemini, etc.).
Includes request/response translators with helpers for image handling.

### Transformer (`open-sse/transformer/`)

`responsesTransformer.ts` — transforms Responses API format to/from Chat Completions format.

### Services (`open-sse/services/`)

36+ service modules including: `combo.ts` (routing engine), `usage.ts`, `tokenRefresh.ts`,
`rateLimitManager.ts`, `accountFallback.ts`, `sessionManager.ts`, `wildcardRouter.ts`,
`autoCombo/`, `intentClassifier.ts`, `taskAwareRouter.ts`, `thinkingBudget.ts`,
`contextManager.ts`, `modelDeprecation.ts`, `modelFamilyFallback.ts`,
`emergencyFallback.ts`, `workflowFSM.ts`, `backgroundTaskDetector.ts`, `ipFilter.ts`,
`signatureCache.ts`, `volumeDetector.ts`, and more.

### Domain Layer (`src/domain/`)

Policy engine modules: `policyEngine.ts`, `comboResolver.ts`, `costRules.ts`,
`degradation.ts`, `fallbackPolicy.ts`, `lockoutPolicy.ts`, `modelAvailability.ts`,
`providerExpiration.ts`, `quotaCache.ts`, `responses.ts`, `configAudit.ts`.

### MCP Server (`open-sse/mcp-server/`)

25 tools, 3 transports (stdio / SSE / Streamable HTTP). Scoped auth (10 scopes), Zod schemas.

**Core tools** (18): get_health, list_combos, get_combo_metrics, switch_combo, check_quota,
route_request, cost_report, list_models_catalog, simulate_route, set_budget_guard,
set_routing_strategy, set_resilience_profile, test_combo, get_provider_metrics,
best_combo_for_task, explain_route, get_session_snapshot, sync_pricing.

**Memory tools** (3): memory_search, memory_add, memory_clear.

**Skill tools** (4): skills_list, skills_enable, skills_execute, skills_executions.

### A2A Server (`src/lib/a2a/`)

JSON-RPC 2.0, SSE streaming, Task Manager with TTL cleanup(
Agent Card at `/.well-known/agent.json`.
Skills: `quotaManagement.ts`, `smartRouting.ts`.

### ACP Module (`src/lib/acp/`)

Agent Communication Protocol registry and manager.

### Memory System (`src/lib/memory/`)

Extraction, injection, retrieval, summarization, and store modules for persistent
conversational memory across sessions.

### Skills System (`src/lib/skills/`)

Extensible skill framework: registry, executor, sandbox, built-in skills,
custom skill support, interception, and injection.

### Compliance (`src/lib/compliance/`)

Policy index for compliance enforcement.

### MITM Proxy (`src/mitm/`)

MITM proxy capability with certificate management, DNS handling, and target routing.

### Middleware (`src/middleware/`)

Request middleware including `promptInjectionGuard.ts`.

### Adding a New Provider

1. Register in `src/shared/constants/providers.ts`
2. Add executor in `open-sse/executors/` (if custom logic needed)
3. Add translator in `open-sse/translator/` (if non-OpenAI format)
4. Add OAuth config in `src/lib/oauth/constants/oauth.ts` (if OAuth-based)
5. Add models in `open-sse/config/providerRegistry.ts`

---

## Review Focus

- **DB ops** go through `src/lib/db/` modules, never raw SQL in routes
- **Provider requests** flow through `open-sse/handlers/`
- **MCP/A2A pages** are tabs inside `/dashboard/endpoint`, not standalone routes
- **No memory leaks** in SSE streams (abort signals, cleanup)
- **Rate limit headers** must be parsed correctly
- All API inputs validated with **Zod schemas**
- **Provider constants** validated at module load via Zod (`src/shared/validation/providerSchema.ts`)
- **Pricing data** syncs from LiteLLM via `src/lib/pricingSync.ts`
- **Memory/Skills** are cross-cutting: affect MCP tools, request pipeline, and A2A skills
