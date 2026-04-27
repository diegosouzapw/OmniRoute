# CLAUDE.md — AI Agent Session Bootstrap (Українська)

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md) · 🇨🇳 [zh-CN](../zh-CN/CLAUDE.md)

---

> Quick-start context for AI coding agents. For deep architecture details, see `AGENTS.md`.
> For contribution workflow, see `CONTRIBUTING.md`.

## Швидкий старт

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

### Running a Single Test

```bash
# Node.js native test runner (most tests)
node --import tsx/esm --test tests/unit/your-file.test.mjs

# Vitest (MCP server, autoCombo, cache)
npm run test:vitest
```

---

## Огляд

**OmniRoute** — unified AI proxy/router. One endpoint, 100+ LLM providers, auto-fallback.

| Layer           | Location                 | Purpose                                    |
| --------------- | ------------------------ | ------------------------------------------ |
| API Routes      | `src/app/api/v1/`        | Next.js App Router — entry points          |
| Handlers        | `open-sse/handlers/`     | Request processing (chat, embeddings, etc) |
| Executors       | `open-sse/executors/`    | Provider-specific HTTP dispatch            |
| Translators     | `open-sse/translator/`   | Format conversion (OpenAI↔Claude↔Gemini)   |
| Services        | `open-sse/services/`     | Combo routing, rate limits, caching, etc   |
| Database        | `src/lib/db/`            | SQLite domain modules (22 files)           |
| Domain/Policy   | `src/domain/`            | Policy engine, cost rules, fallback logic  |
| MCP Server      | `open-sse/mcp-server/`   | 25 tools, 3 transports, 10 scopes          |
| A2A Server      | `src/lib/a2a/`           | JSON-RPC 2.0 agent protocol                |
| Skills          | `src/lib/skills/`        | Extensible skill framework                 |
| Memory          | `src/lib/memory/`        | Persistent conversational memory           |
| UI Components   | `src/shared/components/` | React components (Tailwind CSS v4)         |
| Provider Consts | `src/shared/constants/`  | Provider registry (Zod-validated)          |
| Validation      | `src/shared/validation/` | Zod v4 schemas                             |
| Tests           | `tests/`                 | Unit, integration, e2e, security, load     |

### Monorepo Layout

```
OmniRoute/              # Root package
├── src/                # Next.js 16 app (TypeScript)
├── open-sse/           # @omniroute/open-sse workspace (streaming engine)
├── electron/           # Desktop app (Electron)
├── tests/              # All test suites
├── docs/               # Documentation
└── bin/                # CLI entry point
```

---

## Request Pipeline (Abbreviated)

```
Client → /v1/chat/completions (Next.js route)
  → CORS → Zod validation → auth? → policy check → prompt injection guard
  → handleChatCore() [open-sse/handlers/chatCore.ts]
    → cache check → rate limit → combo routing?
      → resolveComboTargets() → handleSingleModel() per target
    → translateRequest() → getExecutor() → executor.execute()
      → fetch() upstream → retry w/ backoff
    → response translation → SSE stream or JSON
```

---

## Key Conventions

### Code Style

- **2 spaces**, semicolons, double quotes, 100 char width, es5 trailing commas
- **Imports**: external → internal (`@/`, `@omniroute/open-sse`) → relative
- **Naming**: files=camelCase/kebab, components=PascalCase, constants=UPPER_SNAKE

### Database Access

- **Always** go through `src/lib/db/` domain modules
- **Never** write raw SQL in routes or handlers
- **Never** add logic to `src/lib/localDb.ts` (re-export layer only)
- **Never** barrel-import from `localDb.ts` — import specific `db/` modules
- DB singleton: `getDbInstance()` from `src/lib/db/core.ts` (WAL journaling)
- Migrations: `src/lib/db/migrations/` — 21 versioned SQL files

### Error Handling

- try/catch with specific error types, log with pino context
- Never swallow errors in SSE streams — use abort signals
- Return proper HTTP status codes (4xx/5xx)

### Безпека

- **Never** commit secrets/credentials
- **Never** use `eval()`, `new Function()`, or implied eval
- Validate all inputs with Zod schemas
- Encrypt credentials at rest (AES-256-GCM)

---

## Common Modification Scenarios

### Adding a New Provider

1. Register in `src/shared/constants/providers.ts` (Zod-validated at load)
2. Add executor in `open-sse/executors/` if custom logic needed
3. Add translator in `open-sse/translator/` if non-OpenAI format
4. Add OAuth config in `src/lib/oauth/constants/oauth.ts` if OAuth-based
5. Register models in `open-sse/config/providerRegistry.ts`
6. Write tests in `tests/unit/` (registration, translation, error handling)

### Adding a New API Route

1. Create directory under `src/app/api/v1/your-route/`
2. Create `route.ts` with `GET`/`POST` handlers
3. Follow pattern: CORS → Zod body validation → optional auth → handler delegation
4. Handler goes in `open-sse/handlers/` (import from there, not inline)
5. Add tests

### Adding a New DB Module

1. Create `src/lib/db/yourModule.ts`
2. Import `getDbInstance` from `./core.ts`
3. Export CRUD functions for your domain table(s)
4. Add migration in `src/lib/db/migrations/` if new tables needed
5. Re-export from `src/lib/localDb.ts` (add to the re-export list only)
6. Write tests

### Adding a New MCP Tool

1. Add tool definition in `open-sse/mcp-server/tools/`
2. Define Zod input schema + async handler
3. Register in tool set (wired by `createMcpServer()`)
4. Assign to appropriate scope(s)
5. Write tests (tool invocation logged to `mcp_audit` table)

### Adding a New A2A Skill

1. Create skill in `src/lib/a2a/skills/`
2. Skill receives task context (messages, metadata) → returns structured result
3. Register in the DB-backed skill registry
4. Write tests

---

## Testing Cheat Sheet

| What                    | Command                                                 |
| ----------------------- | ------------------------------------------------------- |
| All tests               | `npm run test:all`                                      |
| Unit tests              | `npm run test:unit`                                     |
| Single file             | `node --import tsx/esm --test tests/unit/file.test.mjs` |
| Vitest (MCP, autoCombo) | `npm run test:vitest`                                   |
| E2E (Playwright)        | `npm run test:e2e`                                      |
| Protocol E2E (MCP+A2A)  | `npm run test:protocols:e2e`                            |
| Ecosystem               | `npm run test:ecosystem`                                |
| Coverage gate           | `npm run test:coverage` (60% min all metrics)           |
| Coverage report         | `npm run coverage:report`                               |

**PR rule**: If you change production code in `src/`, `open-sse/`, `electron/`, or `bin/`,
you must include or update tests in the same PR.

**Test layer preference**: unit first → integration (multi-module or DB state) → e2e (UI/workflow only). Encode bug reproductions as automated tests before or alongside the fix.

---

## Git Workflow

```bash
# Never commit directly to main
git checkout -b feat/your-feature
# ... make changes ...
git commit -m "feat: describe your change"
git push -u origin feat/your-feature
```

**Branch prefixes**: `feat/`, `fix/`, `refactor/`, `docs/`, `test/`, `chore/`

**Commit format** ([Conventional Commits](https://www.conventionalcommits.org/)):

```
feat: add circuit breaker for provider calls
fix: resolve JWT secret validation edge case
docs: update AGENTS.md with pipeline internals
test: add MCP tool unit tests
refactor(db): consolidate rate limit tables
```

**Scopes**: `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`,
`memory`, `skills`.

---

## Environment

- **Runtime**: Node.js ≥18 <24, ES Modules
- **TypeScript**: 5.9, target ES2022, module esnext, resolution bundler
- **Path aliases**: `@/*` → `src/`, `@omniroute/open-sse` → `open-sse/`
- **Default port**: 20128 (API + dashboard on same port)
- **Data directory**: `DATA_DIR` env var, defaults to `~/.omniroute/`
- **Key env vars**: `PORT`, `JWT_SECRET`, `INITIAL_PASSWORD`, `REQUIRE_API_KEY`, `APP_LOG_LEVEL`

---

## Hard Rules (Never Violate)

1. Never commit secrets or credentials
2. Never add logic to `localDb.ts`
3. Never use `eval()` / `new Function()` / implied eval
4. Never commit directly to `main`
5. Never write raw SQL in routes — use `src/lib/db/` modules
6. Never silently swallow errors in SSE streams
7. Always validate inputs with Zod schemas
8. Always include tests when changing production code
9. Coverage must stay ≥60% (statements, lines, functions, branches)
