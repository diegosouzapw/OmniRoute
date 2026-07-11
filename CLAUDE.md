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

**OmniRoute** — unified AI proxy/router. One endpoint, 237 LLM providers, auto-fallback.

| Layer         | Location                | Purpose                                                                                                                                                |
| ------------- | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| API Routes    | `src/app/api/v1/`       | Next.js App Router — entry points                                                                                                                      |
| Handlers      | `open-sse/handlers/`    | Request processing (chat, embeddings, etc)                                                                                                             |
| Executors     | `open-sse/executors/`   | Provider-specific HTTP dispatch                                                                                                                        |
| Translators   | `open-sse/translator/`  | Format conversion (OpenAI↔Claude↔Gemini)                                                                                                               |
| Transformer   | `open-sse/transformer/` | Responses API ↔ Chat Completions                                                                                                                       |
| Services      | `open-sse/services/`    | Combo routing, rate limits, caching, etc                                                                                                               |
| Database      | `src/lib/db/`           | SQLite domain modules (94 files, 106 migrations)                                                                                                       |
| Domain/Policy | `src/domain/`           | Policy engine, cost rules, fallback logic                                                                                                              |
| MCP Server    | `open-sse/mcp-server/`  | 95 tools (35 base + memory/skill/agentSkill/pool/notion/obsidian/gamification/plugin modules), 3 transports (stdio / SSE / Streamable HTTP), 30 scopes |
| A2A Server    | `src/lib/a2a/`          | JSON-RPC 2.0 agent protocol                                                                                                                            |
| Skills        | `src/lib/skills/`       | Extensible skill framework                                                                                                                             |
| Memory        | `src/lib/memory/`       | Persistent conversational memory                                                                                                                       |

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

**Combo routing** (`open-sse/services/combo.ts`): 18 strategies. Each target calls `handleSingleModel()` (wraps `handleChatCore()` with per-target error handling + circuit breaker checks). The `fusion` strategy is the exception: parallel fan-out to a model panel, then a judge model synthesizes one answer (`open-sse/services/fusion.ts`). Strategy table + 12-factor Auto-Combo scoring: `docs/routing/AUTO-COMBO.md`.

---

## Resilience Runtime State

Three related but distinct temporary-failure mechanisms — keep their scope separate when
debugging routing. Full defaults, states, and field reference:
[`docs/architecture/RESILIENCE_GUIDE.md`](docs/architecture/RESILIENCE_GUIDE.md); diagram:
[resilience-3layers.svg](./docs/diagrams/exported/resilience-3layers.svg).

1. **Provider Circuit Breaker** — scope: whole provider (`glm`, `openai`, …). Core:
   `src/shared/utils/circuitBreaker.ts`; persisted in `domain_circuit_breakers`. Trips **only**
   on provider-level statuses `(408, 500, 502, 503, 504)` — never on ordinary `401/403/429`
   (those belong to cooldown/lockout). Recovery is **lazy**: reads (`getStatus()`,
   `canExecute()`, `getRetryAfterMs()`) refresh expired `OPEN` → `HALF_OPEN`; no background timer.
2. **Connection Cooldown** — scope: one connection/account/key. Write path:
   `src/sse/services/auth.ts::markAccountUnavailable()`; cooldown math:
   `open-sse/services/accountFallback.ts::checkFallbackError()`. Skipped while
   `rateLimitedUntil` is in the future; exponential backoff `baseCooldownMs * 2 ** failureIndex`;
   success runs `clearAccountError()`. **Terminal states (`banned`, `expired`,
   `credits_exhausted`) are not cooldowns** — never overwrite them with transient state.
3. **Model Lockout** — scope: provider + connection + model
   (`open-sse/services/accountFallback.ts`). One bad model must not disable the whole connection.

Debugging: all keys skipped → check breaker state AND each connection's
`rateLimitedUntil`/`testStatus`. Provider stuck excluded past its reset window → code is reading
raw `state` instead of `getStatus()`/`canExecute()`. One key bad → cooldown, not breaker. One
model bad → lockout, not cooldown. Anything self-recovering needs a future timestamp + a read
path that refreshes expired state.

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
- **Never** add logic to `src/lib/localDb.ts` (re-export layer only); never barrel-import from it — import specific `db/` modules
- DB singleton: `getDbInstance()` from `src/lib/db/core.ts` (WAL journaling)
- Migrations: `src/lib/db/migrations/` — versioned SQL files, idempotent, run in transactions

### Error Handling

- try/catch with specific error types, log with pino context
- Never swallow errors in SSE streams — use abort signals for cleanup
- Return proper HTTP status codes (4xx/5xx)

### Security

- **Never** use `eval()`, `new Function()`, or implied eval
- Validate all inputs with Zod schemas; encrypt credentials at rest (AES-256-GCM)
- Upstream header denylist: `src/shared/constants/upstreamHeaders.ts` — keep sanitize, Zod schemas, and unit tests aligned when editing
- **Public upstream credentials** (OAuth client_id/secret + Firebase Web keys from public CLIs): **MUST** go through `resolvePublicCred()` (`open-sse/utils/publicCreds.ts`) — **never** string literals. See `docs/security/PUBLIC_CREDS.md`.
- **Error responses** (HTTP / SSE / executor / MCP): **MUST** route through `buildErrorBody()` or `sanitizeErrorMessage()` (`open-sse/utils/error.ts`) — never raw `err.stack`/`err.message`. See `docs/security/ERROR_SANITIZATION.md`.
- **Shell commands built from variables**: pass runtime values via the `env` option of `exec()`/`spawn()` — never string-interpolate. Reference: `src/mitm/cert/install.ts::updateNssDatabases`.
- Prefer secure-by-default libraries (Helmet.js, DOMPurify, ssrf-req-filter, safe-regex, Google Tink) over custom implementations ([tldrsec/awesome-secure-defaults](https://github.com/tldrsec/awesome-secure-defaults)).
- ReDoS / SSE-snapshot / test-DB-handle learnings: `docs/security/PII_STREAM_LEARNINGS.md`.

---

## Common Modification Scenarios

Step-by-step checklists live in
[`docs/architecture/MODIFICATION_PLAYBOOKS.md`](docs/architecture/MODIFICATION_PLAYBOOKS.md) —
read the matching playbook before starting:

- **New provider** — register constants → executor → translator → OAuth (`resolvePublicCred()`) → model registry → tests
- **New API route** — CORS → Zod → auth → handler in `open-sse/handlers/` → sanitized errors → no-stack-leak test
- **New DB module** — `src/lib/db/` module → migration → `localDb.ts` re-export only → tests
- **New MCP tool** — Zod schema + handler → scope assignment → tests (audited via `mcp_audit`)
- **New A2A skill** — `src/lib/a2a/skills/` → `A2A_SKILL_HANDLERS` → Agent Card → tests + docs
- **New cloud agent** — extend `CloudAgentBase` → registry → OAuth → tests + docs
- **New embedded service** — installer → bootstrap → migration seed → 7 API endpoints → routeGuard local-only → UI tab → docs + tests
- **Guardrail / Eval / Skill / Webhook** — see playbook doc for locations + doc targets

---

## Reference Documentation

For any non-trivial change, read the matching deep-dive first:

| Area                                          | Doc                                                     |
| --------------------------------------------- | ------------------------------------------------------- |
| Repo navigation                               | `docs/architecture/REPOSITORY_MAP.md`                   |
| Architecture                                  | `docs/architecture/ARCHITECTURE.md`                     |
| Engineering reference                         | `docs/architecture/CODEBASE_DOCUMENTATION.md`           |
| Modification playbooks                        | `docs/architecture/MODIFICATION_PLAYBOOKS.md`           |
| Auto-Combo (12-factor scoring, 18 strategies) | `docs/routing/AUTO-COMBO.md`                            |
| Resilience (3 mechanisms)                     | `docs/architecture/RESILIENCE_GUIDE.md`                 |
| Reasoning replay                              | `docs/routing/REASONING_REPLAY.md`                      |
| Skills framework                              | `docs/frameworks/SKILLS.md`                             |
| Memory system (FTS5 + Qdrant)                 | `docs/frameworks/MEMORY.md`                             |
| Cloud agents                                  | `docs/frameworks/CLOUD_AGENT.md`                        |
| Guardrails (PII / injection / vision)         | `docs/security/GUARDRAILS.md`                           |
| PII / stream sanitization learnings           | `docs/security/PII_STREAM_LEARNINGS.md`                 |
| Public upstream credentials (Gemini/etc.)     | `docs/security/PUBLIC_CREDS.md`                         |
| Error message sanitization                    | `docs/security/ERROR_SANITIZATION.md`                   |
| Evals                                         | `docs/frameworks/EVALS.md`                              |
| Compliance / audit                            | `docs/security/COMPLIANCE.md`                           |
| Webhooks                                      | `docs/frameworks/WEBHOOKS.md`                           |
| Authorization pipeline                        | `docs/architecture/AUTHZ_GUIDE.md`                      |
| Stealth (TLS / fingerprint)                   | `docs/security/STEALTH_GUIDE.md`                        |
| Agent protocols (A2A / ACP / Cloud)           | `docs/frameworks/AGENT_PROTOCOLS_GUIDE.md`              |
| MCP server                                    | `docs/frameworks/MCP-SERVER.md`                         |
| A2A server                                    | `docs/frameworks/A2A-SERVER.md`                         |
| API reference + OpenAPI                       | `docs/reference/API_REFERENCE.md` + `docs/openapi.yaml` |
| Provider catalog (auto-generated)             | `docs/reference/PROVIDER_REFERENCE.md`                  |
| Release flow                                  | `docs/ops/RELEASE_CHECKLIST.md`                         |
| Embedded services                             | `docs/frameworks/EMBEDDED-SERVICES.md`                  |
| Quality gates (~48 scripts, allowlist policy) | `docs/architecture/QUALITY_GATES.md`                    |

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

**Both test runners must pass**: `npm run test:unit` (Node native) AND `npm run test:vitest` (MCP server, autoCombo, cache) cover **non-overlapping files**; both are blocking in CI (jobs `test-unit`, `test-vitest`). A PR where only one suite passes may silently ship broken MCP tools or routing regressions.

**Bug fix / issue triage protocol (Hard Rule #18)**: Every fix for a reported issue must be validated by one of the following — no exceptions:

1. **TDD (preferred)** — write a failing test reproducing the bug → fix it → confirm the test passes. The test becomes the permanent regression guard. Touch only the files the test proves need changing; nothing more.
2. **Real-environment test (when TDD is not possible)** — deploy to the production VPS (`root@192.168.0.15`) and run a documented live test. Record the exact command + result in the PR description. Applies to: OAuth upstream flows, Cloudflare/WS upstream behavior, UI-only regressions, hardware-dependent behavior.
3. "It worked locally without a test" does not count. A fix without a test or a VPS validation record is not a fix — it is a guess.

Why this matters: fixing bug A while opening bug B is worse than not fixing at all. The TDD/VPS gate enforces surgical scope — you touch only what the failing test proves is broken. Examples where this paid off: #3090 (claude-web 403), #3113 (WS HTTP fallback), #3052 (heap-guard auto-calibration).

**Copilot coverage policy**: When a PR changes production code and coverage is below 60% (statements/lines/functions/branches), do not just report — add or update tests, rerun the coverage gate, then ask for confirmation. Include commands run, changed test files, and final coverage result in the PR report.

---

## Planning & Research Artifacts (superpowers, deep-research)

`_tasks/` is a **separate, isolated git repository**, gitignored by the main repo. It is the
canonical home for working artifacts — plans, specs/designs, research, hand-offs.

**Hard rule — never write superpowers / planning / research output under `docs/` or the repo
root.** The superpowers skills' default paths (`docs/superpowers/plans/`, `docs/superpowers/specs/`,
`docs/research/`) are **overridden here** — rewrite them to `_tasks/` before writing:

| Artifact (skill)                   | Save here                                                     |
| ---------------------------------- | ------------------------------------------------------------- |
| Plans (`writing-plans`)            | `_tasks/superpowers/plans/YYYY-MM-DD-<feature>.md`            |
| Specs / design (`brainstorming`)   | `_tasks/superpowers/specs/YYYY-MM-DD-<topic>-design.md`       |
| Research (`deep-research`, ad-hoc) | `_tasks/research/…`                                           |
| Hand-offs (`/handoff`)             | `_tasks/hands-off/<YYYY-MM-DD>_<branch>_v<versão>_sess-<id>/` |

Commit those artifacts inside the `_tasks/` repo (`git -C _tasks …`), never in the main repo.

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
- **pre-push**: fast deterministic gates (`check:any-budget:t11` + `check:tracked-artifacts`); intentionally excludes `test:unit` (slow — covered by the CI `test-unit` job).

### Worktree isolation (MANDATORY for every development task)

Multiple sessions/agents work this repo in parallel; the main checkout is **shared** — a branch
switch there silently destroys another session's uncommitted work (incidents: 2026-06-05,
2026-06-13). Full policy is Hard Rule #19; operationally:

1. **Ask first — which base branch?** Confirm with the operator (via `AskUserQuestion` unless
   already told) which branch to cut from. Never assume `main` or the current checkout — the
   answer is usually the active `release/vX.Y.Z`.
2. **Create an isolated worktree + branch off that base.** **🔴 MANDATORY PATH:
   `.claude/worktrees/` — nowhere else** (same dir the native `EnterWorktree` tool uses; it is
   gitignored AND in the `tsconfig.json`/`.dockerignore` excludes). A worktree anywhere else
   poisons `next build` (tsconfig `include: **/*` globs ~70× the codebase → OOM; incident
   2026-06-25).

   ```bash
   BASE_BRANCH="release/vX.Y.Z"          # ← the branch the operator confirmed in step 1
   TASK="feat/your-feature"               # feat/ fix/ refactor/ docs/ test/ chore/
   git fetch origin "$BASE_BRANCH"
   git worktree add ".claude/worktrees/${TASK##*/}" -b "$TASK" "origin/$BASE_BRANCH"
   cd ".claude/worktrees/${TASK##*/}"
   # symlink node_modules from the main checkout to skip a per-worktree npm install:
   ln -s "$(git -C <main_checkout> rev-parse --show-toplevel)/node_modules" node_modules
   ```

   In Claude Code prefer the native `EnterWorktree` tool after creating the worktree above.

3. **Work, commit, push, open the PR — all from inside the worktree.**
4. **Tear down only your own** worktree + branch when done, by name — never blanket-delete
   `fix/*`/`feat/*`.
5. **Never touch another session's worktree, branch, or uncommitted changes.** End every session
   with the main checkout on the branch it started on (the active `release/vX.Y.Z`, never `main`).

---

## Environment

- **Runtime**: Node.js ≥22.0.0 <23 || ≥24.0.0 <27, ES Modules. The **only** runtime for the published `omniroute` CLI, the server, and the test suites — `engines.node` is authoritative; end users never need Bun.
- **Bun (build/dev script runner only)**: Bun `1.3.10` pinned as an exact devDependency (provisioned via `npm ci` through the lockfile — no `setup-bun`). Used **only** for the allow-listed gate/generator scripts: `check:provider-consistency`, `check:compression-budget`, `check:known-symbols`, `gen:provider-reference`, `bench:compression`. **Do NOT** widen Bun to `npm install`, builds, `check:pack-artifact`, the published runtime, or the test runners. Any new Bun-invoking script must first be validated byte-identical against its `node --import tsx` output. After pulling the lockfile change, run `npm install` (a stale `node_modules` fails those 5 scripts with `bun: not found`).
- **TypeScript**: 6.0+, target ES2022, module esnext, resolution bundler
- **Path aliases**: `@/*` → `src/`, `@omniroute/open-sse` → `open-sse/`, `@omniroute/open-sse/*` → `open-sse/*`
- **Default port**: 20128 (API + dashboard on same port)
- **Data directory**: `DATA_DIR` env var, defaults to `~/.omniroute/`
- **Key env vars**: `PORT`, `JWT_SECRET`, `API_KEY_SECRET`, `INITIAL_PASSWORD`, `REQUIRE_API_KEY`, `APP_LOG_LEVEL`
- Setup: `cp .env.example .env` then generate `JWT_SECRET` (`openssl rand -base64 48`) and `API_KEY_SECRET` (`openssl rand -hex 32`)

---

## Quality Gates & Ratchets

**~48 quality-gate scripts** (`scripts/check/` + `scripts/quality/`) across **9 gate-running CI
jobs**, the `quality.yml` fast-gates job, and 3 nightly workflows. Full inventory + procedures:
[`docs/architecture/QUALITY_GATES.md`](docs/architecture/QUALITY_GATES.md).

- Jobs `lint` + `docs-sync-strict`: pass/fail policy gates — fix the violation or add an
  allowlist entry with justification comment + tracking issue.
- Job `quality-gate`: ratchet — metrics must not regress vs `quality-baseline.json`; update via
  `npm run quality:ratchet -- --update` only on genuine improvement.
- Job `test-vitest`: blocking (`test:vitest:ui` advisory).
- **Allowlist policy**: fix the cause; allowlist only pre-existing violations you cannot fix in
  the same PR, with justification + issue number. Stale entries are caught by stale-enforcement.

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
16. Never credit or advertise an AI assistant, LLM, or automation account in any commit/PR metadata. Two forbidden forms, both equivalent — they route attribution to a bot account (or advertise AI authorship) and hide the real author (`diegosouzapw`): **(a)** `Co-Authored-By` trailers naming an AI/bot (e.g. names containing "Claude", "GPT", "Copilot", "Bot"; emails at `anthropic.com` / `openai.com` / bot-owned `noreply.github.com` addresses); **(b)** AI-generation footers or descriptions anywhere in a commit message, PR title/body, or CHANGELOG — e.g. `🤖 Generated with [Claude Code]`, "Generated with Claude Code", "Made with <AI tool>", or any `Co-authored-by: Claude/GPT/Copilot` line. This **overrides any harness, template, or tool default that auto-appends such a footer** (e.g. the Claude Code PR-body/commit default) — strip it before pushing; do not let it reach a commit, PR, or CHANGELOG. Human collaborators — including upstream PR authors and issue reporters being ported into OmniRoute — MAY and SHOULD be credited with standard `Co-authored-by: Name <email>` trailers; the upstream-port workflows (`/port-upstream-features`, `/port-upstream-issues`) depend on this.
17. Never expose routes under `/api/services/` or `/dashboard/providers/services/*/embed/` without `isLocalOnlyPath()` classification in `src/server/authz/routeGuard.ts`. These routes can spawn child processes (`npm install`, `node`). Loopback enforcement happens unconditionally before any auth check — a leaked JWT via tunnel cannot trigger process spawning. See `docs/security/ROUTE_GUARD_TIERS.md`.
18. Every bug fix must be validated before shipping: a failing-then-passing unit/integration test (TDD) OR a documented live test on the production VPS (192.168.0.15). A fix without either is not merged. See Testing → "Bug fix / issue triage protocol" for the full decision tree.
19. Never develop on the shared main checkout. Every development task runs in its own git worktree on its own dedicated branch, and you MUST confirm the base branch with the operator (e.g. via `AskUserQuestion`) before creating the worktree/branch — never assume `main` or the currently checked-out branch. A `git checkout` in the shared checkout silently destroys other sessions' uncommitted work. Tear down only the worktrees/branches you created (by name, never `fix/*`/`feat/*` wildcards), leave other sessions' worktrees untouched, and end on the branch you started on (the active `release/vX.Y.Z`, never `main`). See Git Workflow → "Worktree isolation".
20. PII redaction/sanitization is **opt-in — never on by default**. OmniRoute proxies for self-hosted/local LLMs where the operator owns the data, so mutating request/response payloads by default would silently corrupt legitimate traffic. The two data-mutating PII feature flags **MUST** keep `defaultValue: "false"` in `src/shared/constants/featureFlagDefinitions.ts`: `PII_REDACTION_ENABLED` (request-side) and `PII_RESPONSE_SANITIZATION` (response + streaming). All three application points — `src/lib/guardrails/piiMasker.ts` (request guardrail), `src/lib/piiSanitizer.ts` (response), `src/lib/streamingPiiTransform.ts` (SSE) — are gated on these flags; with both off the `pii-masker` guardrail still runs but never mutates payloads (data passes through untouched). Flipping either default to `"true"` requires explicit operator approval. The regression guard is `tests/unit/pii-opt-in-default.test.ts` (asserts both definition defaults + behavioral pass-through). Opt-in is per-operator via env or the settings/DB override (`src/lib/db/featureFlags.ts`), never a silent default. See `docs/security/GUARDRAILS.md`.
21. **Release-freeze — the release branch is frozen to campaign merges while a `/generate-release` is running.** `/generate-release` opens a marker issue labeled `release-freeze` at the start of reconciliation (Phase 0a) and closes it once the release PR squash-merges to `main`. Before merging **any** PR into the active `release/vX.Y.Z` branch, every campaign workflow (`/review-issues`, `/review-prs`, `/implement-features`, `/green-prs`, `/port-upstream-*`) **MUST** check `gh issue list --repo diegosouzapw/OmniRoute --label release-freeze --state open` — if a freeze is active, **HOLD the merge** (leave the PR ready and open; do NOT merge to the release branch), tell the operator, and resume once the freeze lifts. This is a **coordination signal, not a permission lock**: the release captain and the campaign sessions share the `diegosouzapw` identity, so a GitHub branch-protection lock cannot distinguish them — only this honored marker prevents the mid-release commit races that forced full CHANGELOG re-reconciliation in v3.8.40/v3.8.41 (a parallel campaign advanced `release/vX.Y.Z` by 34 commits mid-run). The release captain's own reconciliation/cycle-open pushes are exempt — they _are_ the release. Fixes that must land during a freeze (a homologation finding) follow the post-merge read-only rule: land on `main` first via `fix/release-vX.Y.Z-*`. **⛔ ONLY `/generate-release` may raise a release-freeze, and ONLY at its Phase 0a (start of generating a new version) — lifted at Phase 12c after the squash-merge to `main`.** No campaign, session, or agent may open a `release-freeze` marker at any other time — a freeze is **never** a mid-development coordination tool. If a session ever believes a freeze is genuinely, unavoidably necessary outside the `/generate-release` flow, it **MUST first ask the operator (`diegosouzapw`) in chat, explicitly alert "estou criando um freeze" and get an explicit yes** — never open, extend, or re-open a `release-freeze` autonomously. Conversely, do **not** close/lift an active `/generate-release` freeze to unblock campaign merges: it protects the captain's single clean CI run and auto-lifts at Phase 12c — closing it early re-triggers the exact commit race it prevents. Verify a freeze is legitimate before acting on it: an open `release-freeze` whose title/body references an **OPEN** release PR (`gh pr view <N> --json state`) is the authorized captain freeze — hold, don't touch.
