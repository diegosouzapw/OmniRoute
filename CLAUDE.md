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
npm run test:coverage          # Unit tests + coverage gate (75/75/75/70 — statements/lines/functions/branches)
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

| Layer         | Location                | Purpose                                                            |
| ------------- | ----------------------- | ------------------------------------------------------------------ |
| API Routes    | `src/app/api/v1/`       | Next.js App Router — entry points                                  |
| Handlers      | `open-sse/handlers/`    | Request processing (chat, embeddings, etc)                         |
| Executors     | `open-sse/executors/`   | Provider-specific HTTP dispatch                                    |
| Translators   | `open-sse/translator/`  | Format conversion (OpenAI↔Claude↔Gemini)                           |
| Transformer   | `open-sse/transformer/` | Responses API ↔ Chat Completions                                   |
| Services      | `open-sse/services/`    | Combo routing, rate limits, caching, etc                           |
| Database      | `src/lib/db/`           | SQLite domain modules (45+ files, 55 migrations)                   |
| Domain/Policy | `src/domain/`           | Policy engine, cost rules, fallback logic                          |
| MCP Server    | `open-sse/mcp-server/`  | 37 tools (30 base + 3 memory + 4 skills), 3 transports, ~13 scopes |
| A2A Server    | `src/lib/a2a/`          | JSON-RPC 2.0 agent protocol                                        |
| Skills        | `src/lib/skills/`       | Extensible skill framework                                         |
| Memory        | `src/lib/memory/`       | Persistent conversational memory                                   |

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

**Combo routing** (`open-sse/services/combo.ts`): 14 strategies (priority, weighted, fill-first, round-robin, P2C, random, least-used, cost-optimized, reset-aware, strict-random, auto, lkgp, context-optimized, context-relay). Each target calls `handleSingleModel()` which wraps `handleChatCore()` with per-target error handling and circuit breaker checks. See `docs/routing/AUTO-COMBO.md` for the 9-factor Auto-Combo scoring and `docs/architecture/RESILIENCE_GUIDE.md` for the 3 resilience layers.

---

## Resilience Runtime State

OmniRoute has three related but distinct temporary-failure mechanisms. Keep their
scope separate when debugging routing behavior. See the
[3-layer resilience diagram](./docs/diagrams/exported/resilience-3layers.svg)
(source: [docs/diagrams/resilience-3layers.mmd](./docs/diagrams/resilience-3layers.mmd))
for an at-a-glance map.

### Provider Circuit Breaker

**Scope**: whole provider, e.g. `glm`, `openai`, `anthropic`.

**Purpose**: stop sending traffic to a provider that is repeatedly failing at the
upstream/service level, so one unhealthy provider does not slow down every request.

**Implementation**:

- Core class: `src/shared/utils/circuitBreaker.ts`
- Chat gate/execution wiring: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- Runtime status API: `src/app/api/monitoring/health/route.ts`
- Shared wrappers: `open-sse/services/accountFallback.ts`
- Persisted state table: `domain_circuit_breakers`

**States**:

- `CLOSED`: normal traffic is allowed.
- `OPEN`: provider is temporarily blocked; callers get a provider-circuit-open response
  or combo routing skips to another target.
- `HALF_OPEN`: reset timeout has elapsed; allow a probe request. Success closes the
  breaker, failure opens it again.

**Defaults** (`open-sse/config/constants.ts`):

- OAuth providers: threshold `3`, reset timeout `60s`.
- API-key providers: threshold `5`, reset timeout `30s`.
- Local providers: threshold `2`, reset timeout `15s`.

Only provider-level failure statuses should trip the provider breaker:

```ts
(408, 500, 502, 503, 504);
```

Do not trip the whole-provider breaker for normal account/key/model errors like most
`401`, `403`, or `429` cases. Those usually belong to connection cooldown or model
lockout. A generic API-key provider `403` should be recoverable unless it is classified
as a terminal provider/account error.

The breaker uses lazy recovery, not a background timer. When `OPEN` expires, reads such
as `getStatus()`, `canExecute()`, and `getRetryAfterMs()` refresh the state to
`HALF_OPEN`, so dashboards and combo candidate builders do not keep excluding an
expired provider forever.

### Connection Cooldown

**Scope**: one provider connection/account/key.

**Purpose**: temporarily skip one bad key/account while allowing other connections for
the same provider to continue serving requests.

**Implementation**:

- Write/update path: `src/sse/services/auth.ts::markAccountUnavailable()`
- Account selection/filtering: `src/sse/services/auth.ts::getProviderCredentials...`
- Cooldown calculation: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Settings: `src/lib/resilience/settings.ts`

Important fields on provider connections:

```ts
rateLimitedUntil;
testStatus: "unavailable";
lastError;
lastErrorType;
errorCode;
backoffLevel;
```

During account selection, a connection is skipped while:

```ts
new Date(rateLimitedUntil).getTime() > Date.now();
```

Cooldowns are also lazy: when `rateLimitedUntil` is in the past, the connection becomes
eligible again. On successful use, `clearAccountError()` clears `testStatus`,
`rateLimitedUntil`, error fields, and `backoffLevel`.

Default connection cooldown behavior:

- OAuth base cooldown: `5s`.
- API-key base cooldown: `3s`.
- API-key `429` should prefer upstream retry hints (`Retry-After`, reset headers, or
  parseable reset text) when available.
- Repeated recoverable failures use exponential backoff:

```ts
baseCooldownMs * 2 ** failureIndex;
```

The anti-thundering-herd guard prevents concurrent failures on the same connection from
repeatedly extending the cooldown or double-incrementing `backoffLevel`.

Terminal states are not cooldowns. `banned`, `expired`, and `credits_exhausted` are
intended to stay unavailable until credentials/settings change or an operator resets
them. Do not overwrite terminal states with transient cooldown state.

### Model Lockout

**Scope**: provider + connection + model.

**Purpose**: avoid disabling a whole connection when only one model is unavailable or
quota-limited for that connection.

Examples:

- Per-model quota providers returning `429`.
- Local providers returning `404` for one missing model.
- Provider-specific mode/model permission failures such as selected Grok modes.

Model lockout lives in `open-sse/services/accountFallback.ts` and lets the same
connection continue serving other models.

### Debugging Guidance

- If all keys for a provider are skipped, inspect both provider breaker state and each
  connection's `rateLimitedUntil`/`testStatus`.
- If a provider appears permanently excluded after the reset window, check whether code
  is reading raw `state` instead of using `getStatus()`/`canExecute()`.
- If one provider key fails but others should work, prefer connection cooldown over
  provider breaker.
- If only one model fails, prefer model lockout over connection cooldown.
- If a state should self-recover, it should have a future timestamp/reset timeout and a
  read path that refreshes expired state. Permanent statuses require manual credential
  or config changes.

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
- **Public upstream credentials** (Gemini/Antigravity/Windsurf-style OAuth client_id/secret + Firebase Web keys extracted from public CLIs): **MUST** be embedded via `resolvePublicCred()` from `open-sse/utils/publicCreds.ts` — **never** as string literals. See `docs/security/PUBLIC_CREDS.md` for the mandatory pattern.
- **Error responses** (HTTP / SSE / executor / MCP handler): **MUST** route through `buildErrorBody()` or `sanitizeErrorMessage()` from `open-sse/utils/error.ts` — **never** put raw `err.stack` or `err.message` in a response body. See `docs/security/ERROR_SANITIZATION.md`.
- **Shell commands built from variables**: when calling `exec()`/`spawn()` with a script that needs runtime values, pass them via the `env` option (shell-escaped automatically) — **never** string-interpolate untrusted/external paths into the script body. Reference: `src/mitm/cert/install.ts::updateNssDatabases`.
- **Secure-by-default libraries** ([tldrsec/awesome-secure-defaults](https://github.com/tldrsec/awesome-secure-defaults)): prefer Helmet.js, DOMPurify, ssrf-req-filter, safe-regex, Google Tink over custom implementations whenever adding new security-sensitive surfaces.

---

## Common Modification Scenarios

### Adding a New Provider

1. Register in `src/shared/constants/providers.ts` (Zod-validated at load)
2. Add executor in `open-sse/executors/` if custom logic needed (extend `BaseExecutor`)
3. Add translator in `open-sse/translator/` if non-OpenAI format
4. Add OAuth config in `src/lib/oauth/constants/oauth.ts` if OAuth-based — if the upstream CLI ships a public client_id/secret, embed via `resolvePublicCred()` (see `docs/security/PUBLIC_CREDS.md`), **never** as a literal
5. Register models in `open-sse/config/providerRegistry.ts`
6. Write tests in `tests/unit/` (include the publicCreds shape assertion if you added a new embedded default)

### Adding a New API Route

1. Create directory under `src/app/api/v1/your-route/`
2. Create `route.ts` with `GET`/`POST` handlers
3. Follow pattern: CORS → Zod body validation → optional auth → handler delegation
4. Handler goes in `open-sse/handlers/` (import from there, not inline)
5. Error responses use `buildErrorBody()` / `errorResponse()` from `open-sse/utils/error.ts` (auto-sanitized — never put `err.stack` or `err.message` raw in the body). See `docs/security/ERROR_SANITIZATION.md`.
6. Add tests — including at least one assertion that error responses do not leak stack traces (`!body.error.message.includes("at /")`)

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

1. Create skill in `src/lib/a2a/skills/` (5 already exist: smart-routing, quota-management, provider-discovery, cost-analysis, health-report)
2. Skill receives task context (messages, metadata) → returns structured result
3. Register in `A2A_SKILL_HANDLERS` in `src/lib/a2a/taskExecution.ts`
4. Expose in `src/app/.well-known/agent.json/route.ts` (Agent Card)
5. Write tests in `tests/unit/`
6. Document in `docs/frameworks/A2A-SERVER.md` skill table

### Adding a New Cloud Agent

1. Create agent class in `src/lib/cloudAgent/agents/` extending `CloudAgentBase` (3 already exist: codex-cloud, devin, jules)
2. Implement `createTask`, `getStatus`, `approvePlan`, `sendMessage`, `listSources`
3. Register in `src/lib/cloudAgent/registry.ts`
4. Add OAuth/credentials handling if needed (`src/lib/oauth/providers/`)
5. Tests + document in `docs/frameworks/CLOUD_AGENT.md`

### Adding a New Guardrail / Eval / Skill / Webhook event

- Guardrail: `src/lib/guardrails/` → docs: `docs/security/GUARDRAILS.md`
- Eval suite: `src/lib/evals/` → docs: `docs/frameworks/EVALS.md`
- Skill (sandbox): `src/lib/skills/` → docs: `docs/frameworks/SKILLS.md`
- Webhook event: `src/lib/webhookDispatcher.ts` → docs: `docs/frameworks/WEBHOOKS.md`

---

## Reference Documentation

For any non-trivial change, read the matching deep-dive first:

| Area                                         | Doc                                                               |
| -------------------------------------------- | ----------------------------------------------------------------- |
| Repo navigation                              | `docs/architecture/REPOSITORY_MAP.md`                             |
| Architecture                                 | `docs/architecture/ARCHITECTURE.md`                               |
| Engineering reference                        | `docs/architecture/CODEBASE_DOCUMENTATION.md`                     |
| Auto-Combo (9-factor scoring, 14 strategies) | `docs/routing/AUTO-COMBO.md`                                      |
| Resilience (3 mechanisms)                    | `docs/architecture/RESILIENCE_GUIDE.md`                           |
| Reasoning replay                             | `docs/routing/REASONING_REPLAY.md`                                |
| Skills framework                             | `docs/frameworks/SKILLS.md`                                       |
| Memory system (FTS5 + Qdrant)                | `docs/frameworks/MEMORY.md`                                       |
| Cloud agents                                 | `docs/frameworks/CLOUD_AGENT.md`                                  |
| Guardrails (PII / injection / vision)        | `docs/security/GUARDRAILS.md`                                     |
| Public upstream credentials (Gemini/etc.)    | `docs/security/PUBLIC_CREDS.md`                                   |
| Error message sanitization                   | `docs/security/ERROR_SANITIZATION.md`                             |
| Evals                                        | `docs/frameworks/EVALS.md`                                        |
| Compliance / audit                           | `docs/security/COMPLIANCE.md`                                     |
| Webhooks                                     | `docs/frameworks/WEBHOOKS.md`                                     |
| Authorization pipeline                       | `docs/architecture/AUTHZ_GUIDE.md`                                |
| Stealth (TLS / fingerprint)                  | `docs/security/STEALTH_GUIDE.md`                                  |
| Agent protocols (A2A / ACP / Cloud)          | `docs/frameworks/AGENT_PROTOCOLS_GUIDE.md`                        |
| MCP server                                   | `docs/frameworks/MCP-SERVER.md`                                   |
| A2A server                                   | `docs/frameworks/A2A-SERVER.md`                                   |
| API reference + OpenAPI                      | `docs/reference/API_REFERENCE.md` + `docs/reference/openapi.yaml` |
| Provider catalog (auto-generated)            | `docs/reference/PROVIDER_REFERENCE.md`                            |
| Release flow                                 | `docs/ops/RELEASE_CHECKLIST.md`                                   |

---

## Testing

| What                    | Command                                                                     |
| ----------------------- | --------------------------------------------------------------------------- |
| Unit tests              | `npm run test:unit`                                                         |
| Single file             | `node --import tsx/esm --test tests/unit/file.test.ts`                      |
| Vitest (MCP, autoCombo) | `npm run test:vitest`                                                       |
| E2E (Playwright)        | `npm run test:e2e`                                                          |
| Protocol E2E (MCP+A2A)  | `npm run test:protocols:e2e`                                                |
| Ecosystem               | `npm run test:ecosystem`                                                    |
| Coverage gate           | `npm run test:coverage` (75/75/75/70 — statements/lines/functions/branches) |
| Coverage report         | `npm run coverage:report`                                                   |

**PR rule**: If you change production code in `src/`, `open-sse/`, `electron/`, or `bin/`, you must include or update tests in the same PR.

**Test layer preference**: unit first → integration (multi-module or DB state) → e2e (UI/workflow only). Encode bug reproductions as automated tests before or alongside the fix.

**Copilot coverage policy**: When a PR changes production code and coverage is below 75% (statements/lines/functions) or 70% (branches), do not just report — add or update tests, rerun the coverage gate, then ask for confirmation. Include commands run, changed test files, and final coverage result in the PR report.

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
9. Coverage must stay ≥75% (statements, lines, functions) / ≥70% (branches). Current measured: ~82%.
10. Never bypass Husky hooks (`--no-verify`, `--no-gpg-sign`) without explicit operator approval.
11. Never embed public upstream OAuth client_id/secret or Firebase Web keys as string literals — always go through `resolvePublicCred()` (`open-sse/utils/publicCreds.ts`). See `docs/security/PUBLIC_CREDS.md`.
12. Never return raw `err.stack` / `err.message` in HTTP / SSE / executor responses — always route through `buildErrorBody()` or `sanitizeErrorMessage()` (`open-sse/utils/error.ts`). See `docs/security/ERROR_SANITIZATION.md`.
13. Never string-interpolate external paths or runtime values into shell scripts passed to `exec()`/`spawn()` — pass via the `env` option instead. Reference: `src/mitm/cert/install.ts::updateNssDatabases`.
14. Never dismiss a CodeQL / Secret-Scanning alert without (a) first checking the pattern docs above to see if the helper applies, and (b) recording the technical justification in the dismissal comment. Precedent: `js/stack-trace-exposure` raised on callsites that already route through `sanitizeErrorMessage()` is a known CodeQL limitation (custom sanitizers not recognized) — dismiss as `false positive` referencing `docs/security/ERROR_SANITIZATION.md`.
