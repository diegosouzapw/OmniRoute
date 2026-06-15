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
npm run test:coverage          # Unit tests + coverage gate (60/60/60/60 — statements/lines/functions/branches)
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

**OmniRoute** — unified AI proxy/router. One endpoint, 226 LLM providers, auto-fallback.

| Layer         | Location                | Purpose                                                                                                                                |
| ------------- | ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| API Routes    | `src/app/api/v1/`       | Next.js App Router — entry points                                                                                                      |
| Handlers      | `open-sse/handlers/`    | Request processing (chat, embeddings, etc)                                                                                             |
| Executors     | `open-sse/executors/`   | Provider-specific HTTP dispatch                                                                                                        |
| Translators   | `open-sse/translator/`  | Format conversion (OpenAI↔Claude↔Gemini)                                                                                               |
| Transformer   | `open-sse/transformer/` | Responses API ↔ Chat Completions                                                                                                       |
| Services      | `open-sse/services/`    | Combo routing, rate limits, caching, etc                                                                                               |
| Database      | `src/lib/db/`           | SQLite domain modules (83 files, 97 migrations)                                                                                        |
| Domain/Policy | `src/domain/`           | Policy engine, cost rules, fallback logic                                                                                              |
| MCP Server    | `open-sse/mcp-server/`  | 87 tools (33 base + memory/skill/notion/obsidian/gamification/plugin modules), 3 transports (stdio / SSE / Streamable HTTP), 30 scopes |
| A2A Server    | `src/lib/a2a/`          | JSON-RPC 2.0 agent protocol                                                                                                            |
| Skills        | `src/lib/skills/`       | Extensible skill framework                                                                                                             |
| Memory        | `src/lib/memory/`       | Persistent conversational memory                                                                                                       |

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

**Combo routing** (`open-sse/services/combo.ts`): 15 strategies (priority, weighted, fill-first, round-robin, P2C, random, least-used, cost-optimized, reset-aware, reset-window, strict-random, auto, lkgp, context-optimized, context-relay). Each target calls `handleSingleModel()` which wraps `handleChatCore()` with per-target error handling and circuit breaker checks. See `docs/routing/AUTO-COMBO.md` for the 9-factor Auto-Combo scoring and `docs/architecture/RESILIENCE_GUIDE.md` for the 3 resilience layers.

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

### Adding a New Embedded Service

1. Create installer in `src/lib/services/installers/{name}.ts` modeled on `ninerouter.ts` (use `runNpm` from `installers/utils.ts` — no shell interpolation, hard rule #13).
2. Register the service in `src/lib/services/bootstrap.ts` (add to `SERVICES[]` array and extend `buildSpawnArgsFactory()`).
3. Add a DB seed row for the new service in `src/lib/db/migrations/` (`version_manager` table, `status='not_installed'`, `auto_start=0`).
4. Create 7 API endpoints under `src/app/api/services/{name}/` (`_lib.ts`, `install`, `start`, `stop`, `restart`, `update`, `status`, `auto-start`). All delegate errors through `createErrorResponse()`. The shared `logs` endpoint is already wired via `[name]/logs/route.ts`.
5. Verify `/api/services/` is in `LOCAL_ONLY_API_PREFIXES` in `src/server/authz/routeGuard.ts`; add a test asserting `isLocalOnlyPath()` returns `true` for the new prefix if you add one (hard rule #17).
6. Add a UI tab in `src/app/(dashboard)/dashboard/providers/services/tabs/` reusing `ServiceStatusCard`, `ServiceLifecycleButtons`, `ServiceLogsPanel`.
7. Document in `docs/frameworks/EMBEDDED-SERVICES.md` (update §1 service table + §4 API reference) and `docs/reference/openapi.yaml`.
8. Write tests: unit (`tests/unit/services/`), integration (`tests/integration/services/`, gated by `RUN_SERVICES_INT=1`), and update `docs/ops/RELEASE_CHECKLIST.md` smoke section.

### Adding a New Guardrail / Eval / Skill / Webhook event

- Guardrail: `src/lib/guardrails/` → docs: `docs/security/GUARDRAILS.md`
- Eval suite: `src/lib/evals/` → docs: `docs/frameworks/EVALS.md`
- Skill (sandbox): `src/lib/skills/` → docs: `docs/frameworks/SKILLS.md`
- Webhook event: `src/lib/webhookDispatcher.ts` → docs: `docs/frameworks/WEBHOOKS.md`

---

## Reference Documentation

For any non-trivial change, read the matching deep-dive first:

| Area                                          | Doc                                                               |
| --------------------------------------------- | ----------------------------------------------------------------- |
| Repo navigation                               | `docs/architecture/REPOSITORY_MAP.md`                             |
| Architecture                                  | `docs/architecture/ARCHITECTURE.md`                               |
| Engineering reference                         | `docs/architecture/CODEBASE_DOCUMENTATION.md`                     |
| Auto-Combo (9-factor scoring, 15 strategies)  | `docs/routing/AUTO-COMBO.md`                                      |
| Resilience (3 mechanisms)                     | `docs/architecture/RESILIENCE_GUIDE.md`                           |
| Reasoning replay                              | `docs/routing/REASONING_REPLAY.md`                                |
| Skills framework                              | `docs/frameworks/SKILLS.md`                                       |
| Memory system (FTS5 + Qdrant)                 | `docs/frameworks/MEMORY.md`                                       |
| Cloud agents                                  | `docs/frameworks/CLOUD_AGENT.md`                                  |
| Guardrails (PII / injection / vision)         | `docs/security/GUARDRAILS.md`                                     |
| Public upstream credentials (Gemini/etc.)     | `docs/security/PUBLIC_CREDS.md`                                   |
| Error message sanitization                    | `docs/security/ERROR_SANITIZATION.md`                             |
| Evals                                         | `docs/frameworks/EVALS.md`                                        |
| Compliance / audit                            | `docs/security/COMPLIANCE.md`                                     |
| Webhooks                                      | `docs/frameworks/WEBHOOKS.md`                                     |
| Authorization pipeline                        | `docs/architecture/AUTHZ_GUIDE.md`                                |
| Stealth (TLS / fingerprint)                   | `docs/security/STEALTH_GUIDE.md`                                  |
| Agent protocols (A2A / ACP / Cloud)           | `docs/frameworks/AGENT_PROTOCOLS_GUIDE.md`                        |
| MCP server                                    | `docs/frameworks/MCP-SERVER.md`                                   |
| A2A server                                    | `docs/frameworks/A2A-SERVER.md`                                   |
| API reference + OpenAPI                       | `docs/reference/API_REFERENCE.md` + `docs/reference/openapi.yaml` |
| Provider catalog (auto-generated)             | `docs/reference/PROVIDER_REFERENCE.md`                            |
| Release flow                                  | `docs/ops/RELEASE_CHECKLIST.md`                                   |
| Embedded services                             | `docs/frameworks/EMBEDDED-SERVICES.md`                            |
| Quality gates (~48 scripts, allowlist policy) | `docs/architecture/QUALITY_GATES.md`                              |

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
| Coverage gate           | `npm run test:coverage` (60/60/60/60 — statements/lines/functions/branches) |
| Coverage report         | `npm run coverage:report`                                                   |

**PR rule**: If you change production code in `src/`, `open-sse/`, `electron/`, or `bin/`, you must include or update tests in the same PR.

**Test layer preference**: unit first → integration (multi-module or DB state) → e2e (UI/workflow only). Encode bug reproductions as automated tests before or alongside the fix.

**Both test runners must pass**: `npm run test:unit` (Node native — most tests) AND `npm run test:vitest` (MCP server, autoCombo, cache) cover **non-overlapping files**. Both are wired in CI (jobs `test-unit` and `test-vitest`) and must be green before merging. A PR where only one suite passes may silently ship broken MCP tools or routing regressions.

**Bug fix / issue triage protocol (Hard Rule #18)**: Every fix for a reported issue must be validated by one of the following — no exceptions:

1. **TDD (preferred)** — write a failing test reproducing the bug → fix it → confirm the test passes. The test becomes the permanent regression guard. Touch only the files the test proves need changing; nothing more.
2. **Real-environment test (when TDD is not possible)** — deploy to the production VPS (`root@192.168.0.15`) and run a documented live test. Record the exact command + result in the PR description. Applies to: OAuth upstream flows, Cloudflare/WS upstream behavior, UI-only regressions, hardware-dependent behavior.
3. "It worked locally without a test" does not count. A fix without a test or a VPS validation record is not a fix — it is a guess.

Why this matters: fixing bug A while opening bug B is worse than not fixing at all. The TDD/VPS gate enforces surgical scope — you touch only what the failing test proves is broken. Examples where this paid off: #3090 (claude-web 403), #3113 (WS HTTP fallback), #3052 (heap-guard auto-calibration).

**Copilot coverage policy**: When a PR changes production code and coverage is below 60% (statements/lines/functions/branches), do not just report — add or update tests, rerun the coverage gate, then ask for confirmation. Include commands run, changed test files, and final coverage result in the PR report.

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
- **pre-push**: fast deterministic gates (`check:any-budget:t11` + `check:tracked-artifacts`); intentionally excludes `test:unit` (slow — covered by the CI `test-unit` job). Activated 2026-06-13 (Quality Gates Fase 6A.12).

### Worktree isolation (MANDATORY for every development task)

Multiple sessions/agents work this repo in parallel. The main checkout is **shared**, so a
`git checkout`/branch switch in it silently discards another session's uncommitted work and
yanks the branch out from under whatever else is running (incidents: 2026-06-05, 2026-06-13).

**Rule: never develop on the shared main checkout. Every task gets its own git worktree on its
own dedicated branch, and you MUST confirm the base branch with the operator before creating it.**

1. **Ask first — which base branch?** Before creating anything, ask the operator (via
   `AskUserQuestion`, unless they already told you) from which branch the new worktree/branch
   should be cut. Do NOT assume `main` or "whatever I'm on" — the answer is usually the active
   `release/vX.Y.Z`, but it can be another feature/release branch. Get the base explicitly.
2. **Create an isolated worktree + branch off that base** (never reuse the main checkout):

   ```bash
   BASE_BRANCH="release/vX.Y.Z"          # ← the branch the operator confirmed in step 1
   TASK="feat/your-feature"               # feat/ fix/ refactor/ docs/ test/ chore/
   git fetch origin "$BASE_BRANCH"
   git worktree add ".worktrees/${TASK##*/}" -b "$TASK" "origin/$BASE_BRANCH"
   cd ".worktrees/${TASK##*/}"
   # symlink node_modules from the main checkout to skip a per-worktree npm install:
   ln -s "$(git -C <main_checkout> rev-parse --show-toplevel)/node_modules" node_modules
   ```

   In Claude Code prefer the native `EnterWorktree` tool (create the worktree with the command
   above, then call `EnterWorktree` with its `path`).
3. **Work, commit, push, open the PR — all from inside the worktree.** Never `git checkout` a
   different branch inside a worktree another session might share.
4. **Tear down only your own** worktree + branch when done, from the main checkout:
   `git worktree remove .worktrees/<dir>` then `git branch -D <task>`. Never blanket-delete
   `fix/*`/`feat/*` — other sessions keep their own; delete only the branches you created, by name.
5. **Never touch another session's worktree, branch, or uncommitted changes.** If `git worktree
   list` shows worktrees you didn't create, leave them alone. End every session with the main
   checkout back on the branch it started on (the active `release/vX.Y.Z`, never `main`).

---

## Environment

- **Runtime**: Node.js ≥22.0.0 <23 || ≥24.0.0 <27, ES Modules
- **TypeScript**: 6.0+, target ES2022, module esnext, resolution bundler
- **Path aliases**: `@/*` → `src/`, `@omniroute/open-sse` → `open-sse/`, `@omniroute/open-sse/*` → `open-sse/*`
- **Default port**: 20128 (API + dashboard on same port)
- **Data directory**: `DATA_DIR` env var, defaults to `~/.omniroute/`
- **Key env vars**: `PORT`, `JWT_SECRET`, `API_KEY_SECRET`, `INITIAL_PASSWORD`, `REQUIRE_API_KEY`, `APP_LOG_LEVEL`
- Setup: `cp .env.example .env` then generate `JWT_SECRET` (`openssl rand -base64 48`) and `API_KEY_SECRET` (`openssl rand -hex 32`)

---

## Quality Gates & Ratchets

OmniRoute has **~48 quality-gate scripts** (`scripts/check/` + `scripts/quality/`) wired
across **9 gate-running jobs** in `.github/workflows/ci.yml` (`lint`, `quality-gate`,
`quality-extended`, `docs-sync-strict`, `i18n-ui-coverage`, `i18n`, `pr-test-policy`,
`test-vitest`, `sonarqube`), plus the `quality.yml` fast-gates job (PR→`release/**`) and
3 nightly workflows (`nightly-property`, `nightly-resilience`, `nightly-llm-security`;
`nightly-mutation` once merged). Full inventory, per-job breakdown, and operational
procedures are in [`docs/architecture/QUALITY_GATES.md`](docs/architecture/QUALITY_GATES.md).

**Quick reference:**

- Gates in jobs `lint` + `docs-sync-strict`: pass/fail policy gates —
  fix the violation or add an allowlist entry with a justification comment + tracking issue.
- Gates in job `quality-gate`: ratchet — metrics (ESLint warnings, code coverage, duplication,
  complexity) must not regress vs `quality-baseline.json`. Update via
  `npm run quality:ratchet -- --update` when a metric genuinely improves.
- Job `test-vitest` runs `npm run test:vitest` (MCP tools, autoCombo, cache) — blocking.
  `test:vitest:ui` is advisory until UI component tests are triaged.

**Allowlist policy (short form):** Fix the cause; use the allowlist only for pre-existing
violations you cannot fix in the same PR. Add a comment with justification + issue number.
Stale allowlist entries (suppressing a violation that no longer exists) will be caught by
the stale-enforcement added in Fase 6A.3.

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
9. Coverage must not regress below the baseline frozen in `quality-baseline.json` (ratchet); absolute floor is 60% (statements/lines/functions/branches). Update the baseline via `npm run quality:ratchet -- --update` only when coverage genuinely improves. See `docs/architecture/QUALITY_GATES.md`.
10. Never bypass Husky hooks (`--no-verify`, `--no-gpg-sign`) without explicit operator approval.
11. Never embed public upstream OAuth client_id/secret or Firebase Web keys as string literals — always go through `resolvePublicCred()` (`open-sse/utils/publicCreds.ts`). See `docs/security/PUBLIC_CREDS.md`.
12. Never return raw `err.stack` / `err.message` in HTTP / SSE / executor responses — always route through `buildErrorBody()` or `sanitizeErrorMessage()` (`open-sse/utils/error.ts`). See `docs/security/ERROR_SANITIZATION.md`.
13. Never string-interpolate external paths or runtime values into shell scripts passed to `exec()`/`spawn()` — pass via the `env` option instead. Reference: `src/mitm/cert/install.ts::updateNssDatabases`.
14. Never dismiss a CodeQL / Secret-Scanning alert without (a) first checking the pattern docs above to see if the helper applies, and (b) recording the technical justification in the dismissal comment. Precedent: `js/stack-trace-exposure` raised on callsites that already route through `sanitizeErrorMessage()` is a known CodeQL limitation (custom sanitizers not recognized) — dismiss as `false positive` referencing `docs/security/ERROR_SANITIZATION.md`.
15. Never expose routes that spawn child processes (`/api/mcp/`, `/api/cli-tools/runtime/`) without `isLocalOnlyPath()` classification in `src/server/authz/routeGuard.ts`. Loopback enforcement happens unconditionally before any auth check — leaked JWT via tunnel cannot trigger process spawning. See `docs/security/ROUTE_GUARD_TIERS.md`.
16. Never include `Co-Authored-By` trailers that credit an AI assistant, LLM, or automation account (e.g. names containing "Claude", "GPT", "Copilot", "Bot"; emails at `anthropic.com` / `openai.com` / bot-owned `noreply.github.com` addresses). Such trailers route attribution to the bot account on GitHub, hiding the real author (`diegosouzapw`) in PR history. Human collaborators — including upstream PR authors and issue reporters being ported into OmniRoute — MAY and SHOULD be credited with standard `Co-authored-by: Name <email>` trailers; the upstream-port workflows (`/port-upstream-features`, `/port-upstream-issues`) depend on this.
17. Never expose routes under `/api/services/` or `/dashboard/providers/services/*/embed/` without `isLocalOnlyPath()` classification in `src/server/authz/routeGuard.ts`. These routes can spawn child processes (`npm install`, `node`). Loopback enforcement happens unconditionally before any auth check — a leaked JWT via tunnel cannot trigger process spawning. See `docs/security/ROUTE_GUARD_TIERS.md`.
18. Every bug fix must be validated before shipping: a failing-then-passing unit/integration test (TDD) OR a documented live test on the production VPS (192.168.0.15). A fix without either is not merged. See Testing → "Bug fix / issue triage protocol" for the full decision tree.
19. Never develop on the shared main checkout. Every development task runs in its own git worktree on its own dedicated branch, and you MUST confirm the base branch with the operator (e.g. via `AskUserQuestion`) before creating the worktree/branch — never assume `main` or the currently checked-out branch. A `git checkout` in the shared checkout silently destroys other sessions' uncommitted work. Tear down only the worktrees/branches you created (by name, never `fix/*`/`feat/*` wildcards), leave other sessions' worktrees untouched, and end on the branch you started on (the active `release/vX.Y.Z`, never `main`). See Git Workflow → "Worktree isolation".

---

## PII & Stream Sanitization Learnings

### 1. Regex Security (ReDoS)

All regex patterns matching variable-length strings (e.g. IPv6 address, credit cards) must use strictly bounded, non-overlapping sequences (e.g., limit occurrences with bounded ranges `{1,7}`) to prevent catastrophic backtracking when processing untrusted inputs.

### 2. SSE Snapshot Handling

When parsing streaming LLM responses (e.g. Responses API), check if a chunk represents a final snapshot (`done` or `completed` events). Snapshot text must be sanitized directly as a standalone string (bypassing rolling delta buffers) to prevent text duplication at the end of the stream.

### 3. Database Handles in Tests

Ensure that any unit tests that trigger database migrations or establish SQLite connections call `resetDbInstance()` and properly clean up/close all DB handles in a `test.after(...)` hook. Failure to release database connection handles will cause Node's native test runner to hang indefinitely.
