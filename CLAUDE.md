# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Quick Start

```bash
npm install                    # Install deps (auto-generates .env from .env.example)
npm run dev                    # Dev server at http://localhost:20128
npm run build                  # Production build (Next.js 16 standalone)
npm run lint                   # ESLint (0 errors expected; warnings are pre-existing)
npm run typecheck:core         # TypeScript check (should be clean)
npm run typecheck:noimplicit:core  # Strict check (no implicit any)
npm run test:coverage          # Unit tests + coverage gate (60% min)
npm run check                  # lint + test combined
npm run check:cycles           # Detect circular dependencies
```

### Running Tests

```bash
# Single test file (Node.js native test runner — most tests)
node --import tsx/esm --test tests/unit/your-file.test.ts

# Vitest (MCP server, autoCombo, cache)
npm run test:vitest

# All suites
npm run test:all
```

For full test matrix, see `CONTRIBUTING.md` → "Running Tests". For deep architecture, see `AGENTS.md`.

---

## Project at a Glance

**OmniRoute** — unified AI proxy/router. One endpoint, 160+ LLM providers, auto-fallback.

| Layer         | Location                | Purpose                                    |
| ------------- | ----------------------- | ------------------------------------------ |
| API Routes    | `src/app/api/v1/`       | Next.js App Router — entry points          |
| Handlers      | `open-sse/handlers/`    | Request processing (chat, embeddings, etc) |
| Executors     | `open-sse/executors/`   | Provider-specific HTTP dispatch            |
| Translators   | `open-sse/translator/`  | Format conversion (OpenAI↔Claude↔Gemini)   |
| Transformer   | `open-sse/transformer/` | Responses API ↔ Chat Completions           |
| Services      | `open-sse/services/`    | Combo routing, rate limits, caching, etc   |
| Database      | `src/lib/db/`           | SQLite domain modules (22 files)           |
| Domain/Policy | `src/domain/`           | Policy engine, cost rules, fallback logic  |
| MCP Server    | `open-sse/mcp-server/`  | 29 tools, 3 transports, 10 scopes          |
| A2A Server    | `src/lib/a2a/`          | JSON-RPC 2.0 agent protocol                |
| Skills        | `src/lib/skills/`       | Extensible skill framework                 |
| Memory        | `src/lib/memory/`       | Persistent conversational memory           |

Monorepo: `src/` (Next.js 16 app), `open-sse/` (streaming engine workspace), `electron/` (desktop app), `tests/`, `bin/` (CLI entry point).

---

## Request Pipeline

```
Client → /v1/chat/completions (Next.js route)
  → CORS → Zod validation → auth? → policy check → prompt injection guard
  → handleChatCore() [open-sse/handlers/chatCore.ts]
    → cache check → rate limit → combo routing?
      → resolveComboTargets() → handleSingleModel() per target
    → translateRequest() → getExecutor() → executor.execute()
      → fetch() upstream → retry w/ backoff
    → response translation → SSE stream or JSON
    → If Responses API: responsesTransformer.ts TransformStream
```

API routes follow a consistent pattern: `Route → CORS preflight → Zod body validation → Optional auth (extractApiKey/isValidApiKey) → API key policy enforcement → Handler delegation (open-sse)`. No global Next.js middleware — interception is route-specific.

**Combo routing** (`open-sse/services/combo.ts`): 13 strategies (priority, weighted, fill-first, round-robin, P2C, random, least-used, cost-optimized, strict-random, auto, lkgp, context-optimized, context-relay). Each target calls `handleSingleModel()` which wraps `handleChatCore()` with per-target error handling and circuit breaker checks.

---

## Key Conventions

### Code Style

- **2 spaces**, semicolons, double quotes, 100 char width, es5 trailing commas (enforced by lint-staged via Prettier)
- **Imports**: external → internal (`@/`, `@omniroute/open-sse`) → relative
- **Naming**: files=camelCase/kebab, components=PascalCase, constants=UPPER_SNAKE
- **ESLint**: `no-eval`, `no-implied-eval`, `no-new-func` = error everywhere; `no-explicit-any` = warn in `open-sse/` and `tests/`
- **TypeScript**: `strict: false`, target ES2022, module esnext, resolution bundler. Prefer explicit types.

### Database

- **Always** go through `src/lib/db/` domain modules — **never** write raw SQL in routes or handlers
- **Never** add logic to `src/lib/localDb.ts` (re-export layer only)
- **Never** barrel-import from `localDb.ts` — import specific `db/` modules instead
- DB singleton: `getDbInstance()` from `src/lib/db/core.ts` (WAL journaling)
- Migrations: `src/lib/db/migrations/` — versioned SQL files, idempotent, run in transactions

### Error Handling

- try/catch with specific error types, log with pino context
- Never swallow errors in SSE streams — use abort signals for cleanup
- Return proper HTTP status codes (4xx/5xx)

### Security

- **Never** use `eval()`, `new Function()`, or implied eval
- Validate all inputs with Zod schemas
- Encrypt credentials at rest (AES-256-GCM)
- Upstream header denylist: `src/shared/constants/upstreamHeaders.ts` — keep sanitize, Zod schemas, and unit tests aligned when editing

---

## Common Modification Scenarios

### Adding a New Provider

1. Register in `src/shared/constants/providers.ts` (Zod-validated at load)
2. Add executor in `open-sse/executors/` if custom logic needed (extend `BaseExecutor`)
3. Add translator in `open-sse/translator/` if non-OpenAI format
4. Add OAuth config in `src/lib/oauth/constants/oauth.ts` if OAuth-based
5. Register models in `open-sse/config/providerRegistry.ts`
6. Write tests in `tests/unit/`

### Adding a New API Route

1. Create directory under `src/app/api/v1/your-route/`
2. Create `route.ts` with `GET`/`POST` handlers
3. Follow pattern: CORS → Zod body validation → optional auth → handler delegation
4. Handler goes in `open-sse/handlers/` (import from there, not inline)
5. Add tests

### Adding a New DB Module

1. Create `src/lib/db/yourModule.ts` — import `getDbInstance` from `./core.ts`
2. Export CRUD functions for your domain table(s)
3. Add migration in `src/lib/db/migrations/` if new tables needed
4. Re-export from `src/lib/localDb.ts` (add to the re-export list only)
5. Write tests

### Adding a New MCP Tool

1. Add tool definition in `open-sse/mcp-server/tools/` with Zod input schema + async handler
2. Register in tool set (wired by `createMcpServer()`)
3. Assign to appropriate scope(s)
4. Write tests (tool invocation logged to `mcp_audit` table)

### Adding a New A2A Skill

1. Create skill in `src/lib/a2a/skills/`
2. Skill receives task context (messages, metadata) → returns structured result
3. Register in the DB-backed skill registry
4. Write tests

---

## Testing

| What                    | Command                                                |
| ----------------------- | ------------------------------------------------------ |
| Unit tests              | `npm run test:unit`                                    |
| Single file             | `node --import tsx/esm --test tests/unit/file.test.ts` |
| Vitest (MCP, autoCombo) | `npm run test:vitest`                                  |
| E2E (Playwright)        | `npm run test:e2e`                                     |
| Protocol E2E (MCP+A2A)  | `npm run test:protocols:e2e`                           |
| Ecosystem               | `npm run test:ecosystem`                               |
| Coverage gate           | `npm run test:coverage` (60% min all metrics)          |
| Coverage report         | `npm run coverage:report`                              |

**PR rule**: If you change production code in `src/`, `open-sse/`, `electron/`, or `bin/`, you must include or update tests in the same PR.

**Test layer preference**: unit first → integration (multi-module or DB state) → e2e (UI/workflow only). Encode bug reproductions as automated tests before or alongside the fix.

**Copilot coverage policy**: When a PR changes production code and coverage is below 60%, do not just report — add or update tests, rerun the coverage gate, then ask for confirmation. Include commands run, changed test files, and final coverage result in the PR report.

---

## Git Workflow

```bash
# Never commit directly to main
git checkout -b feat/your-feature
git commit -m "feat: describe your change"
git push -u origin feat/your-feature
```

**Branch prefixes**: `feat/`, `fix/`, `refactor/`, `docs/`, `test/`, `chore/`

**Commit format** (Conventional Commits): `feat(db): add circuit breaker` — scopes: `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`

**Husky hooks**:

- **pre-commit**: lint-staged + `check-docs-sync` + `check:any-budget:t11`
- **pre-push**: `npm run test:unit`

---

## Environment

- **Runtime**: Node.js ≥20.20.2 <21 || ≥22.22.2 <23 || ≥24 <25, ES Modules
- **TypeScript**: 5.9+, target ES2022, module esnext, resolution bundler
- **Path aliases**: `@/*` → `src/`, `@omniroute/open-sse` → `open-sse/`, `@omniroute/open-sse/*` → `open-sse/*`
- **Default port**: 20128 (API + dashboard on same port)
- **Data directory**: `DATA_DIR` env var, defaults to `~/.omniroute/`
- **Key env vars**: `PORT`, `JWT_SECRET`, `API_KEY_SECRET`, `INITIAL_PASSWORD`, `REQUIRE_API_KEY`, `APP_LOG_LEVEL`
- Setup: `cp .env.example .env` then generate `JWT_SECRET` (`openssl rand -base64 48`) and `API_KEY_SECRET` (`openssl rand -hex 32`)

---

## Hard Rules

1. Never commit secrets or credentials
2. Never add logic to `localDb.ts`
3. Never use `eval()` / `new Function()` / implied eval
4. Never commit directly to `main`
5. Never write raw SQL in routes — use `src/lib/db/` modules
6. Never silently swallow errors in SSE streams
7. Always validate inputs with Zod schemas
8. Always include tests when changing production code
9. Coverage must stay ≥60% (statements, lines, functions, branches)
