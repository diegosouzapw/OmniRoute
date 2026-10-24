# OmniRoute agent guide

> **Single source of truth.** This file holds ALL project rules, conventions, architecture notes
> and Hard Rules for every AI assistant working this repository (Claude Code, Gemini, Codex,
> Copilot, and any other agent). `CLAUDE.md` and `GEMINI.md` only add assistant-specific deltas
> and point back here. When a rule needs to change, change it HERE — never re-fork it into an
> assistant-specific file.

## Quick Start

```bash
npm install                    # Install deps (auto-generates .env from .env.example)
npm run dev                    # Dev server at http://localhost:20128
npm run build                  # Production build (Next.js 16 standalone)
npm run build:release          # Release build
npm run lint                   # ESLint (0 errors expected; warnings are pre-existing)
npm run typecheck:core         # TypeScript check (should be clean)
npm run typecheck:noimplicit:core  # Strict check (no implicit any)
npm run test:coverage          # Unit tests + coverage gate (67.33 / 67.33 / 72.02 / 65.08 — statements/lines/functions/branches, enforced by the blocking ratchet in config/quality/quality-baseline.json; test:coverage itself hardcodes 60)
npm run check                  # lint + test combined
npm run check:cycles           # Detect circular dependencies (advisory — lists the SCCs)
npm run check:cycles:ratchet   # Same scan, blocking above the quality-baseline ceiling
npm run check:docs-all         # Run after changing documentation (includes fabricated-docs validation)
```

Running tests: see [Testing](#testing) below (run the most focused test for changed code first).

---

## Project at a Glance

**OmniRoute** — unified AI proxy/router. One endpoint, 375 LLM providers, auto-fallback.

- API Routes — `src/app/api/v1/` (Next.js App Router entry points)
- Handlers — `open-sse/handlers/` (request processing: chat, embeddings, etc)
- Executors — `open-sse/executors/` (provider-specific HTTP dispatch)
- Translators — `open-sse/translator/` (format conversion OpenAI↔Claude↔Gemini)
- Transformer — `open-sse/transformer/` (Responses API ↔ Chat Completions)
- Services — `open-sse/services/` (combo routing, rate limits, caching, etc)
- Database — `src/lib/db/` (SQLite domain modules, 209 migrations)
- Domain/Policy — `src/domain/` (policy engine, cost rules, fallback logic)
- MCP Server — `open-sse/mcp-server/` (110 tools: 45 canonical + memory/skill/GitHub/pool/gamification/plugin/Notion/Obsidian/local-corpus/RTK modules; 3 transports: stdio / SSE / Streamable HTTP; 33 scopes)
- A2A Server — `src/lib/a2a/` (JSON-RPC 2.0 agent protocol)
- Skills — `src/lib/skills/` (extensible skill framework); Memory — `src/lib/memory/` (persistent conversational memory)

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

**Combo routing** (`open-sse/services/combo.ts`): 21 public strategies (priority, weighted, fill-first, round-robin, p2c, random, least-used, cost-optimized, reset-aware, reset-window, expiry-first, headroom, quota-weighted, strict-random, auto, lkgp, context-optimized, cache-optimized, context-relay, fusion, pipeline). Each target calls `handleSingleModel()` (wraps `handleChatCore()` with per-target error handling + circuit breaker checks); the `fusion` strategy instead fans out to a panel of models in parallel and a judge model synthesizes one final answer (`open-sse/services/fusion.ts`). 16-factor Auto-Combo scoring + full strategy table: `docs/routing/AUTO-COMBO.md`; the 3 resilience layers: `docs/architecture/RESILIENCE_GUIDE.md`.

---

## Resilience Runtime State

Three related but distinct temporary-failure mechanisms — keep their **scope** separate when debugging routing:

- **Provider Circuit Breaker** — scope: whole provider. 4 states (CLOSED/DEGRADED/OPEN/HALF_OPEN); lazy recovery — `getStatus()`/`canExecute()` refresh an expired `OPEN`, no background timer.
- **Connection Cooldown** — scope: one connection/account/key. Lazy `rateLimitedUntil` skip + exponential backoff; terminal states (`banned`/`expired`/`credits_exhausted`) are NOT cooldowns.
- **Model Lockout** — scope: provider + connection + model. One bad model never disables the whole connection (`open-sse/services/accountFallback.ts`).

Defaults: `open-sse/config/constants.ts` → `PROVIDER_PROFILES` (overridable via
`OMNIROUTE_PROVIDER_BREAKER_*` / `OMNIROUTE_CIRCUIT_BREAKER_*`). Only provider-level statuses
`408/500/502/503/504` trip the provider breaker — most `401`/`403`/`429` belong to connection
cooldown or model lockout. Full agent reference (files, states, thresholds, debugging):
[`docs/architecture/RESILIENCE_GUIDE.md` → "Runtime state — agent quick reference"](docs/architecture/RESILIENCE_GUIDE.md#runtime-state--agent-quick-reference).

---

## Repository map

Read the nearest `AGENTS.md` and the linked deep-dive before making a non-trivial change.

- API routes — `src/app/api/v1/` → `docs/architecture/ARCHITECTURE.md`
- Streaming request handling — `open-sse/handlers/` → `docs/architecture/ARCHITECTURE.md`
- Provider execution and translation — `open-sse/executors/`, `open-sse/translator/` → `docs/architecture/CODEBASE_DOCUMENTATION.md`
- Routing and resilience — `open-sse/services/` → `open-sse/services/AGENTS.md`, `docs/routing/AUTO-COMBO.md`
- Database and migrations — `src/lib/db/`, `src/lib/db/migrations/` → `src/lib/db/AGENTS.md`
- Domain policy — `src/domain/` → `docs/architecture/ARCHITECTURE.md`
- MCP and A2A — `open-sse/mcp-server/`, `src/lib/a2a/` → `docs/frameworks/MCP-SERVER.md`, `docs/frameworks/A2A-SERVER.md`
- Agent features — `src/lib/{acp,memory,skills,cloudAgent}/` → `docs/frameworks/AGENT_PROTOCOLS_GUIDE.md`, `docs/frameworks/SKILLS.md`
- Safety and governance — `src/lib/{guardrails,compliance}/`, `src/server/authz/` → `docs/security/GUARDRAILS.md`, `docs/architecture/AUTHZ_GUIDE.md`
- Operations — `src/mitm/`, tunnel modules, `electron/` → `docs/ops/TUNNELS_GUIDE.md`, `docs/guides/ELECTRON_GUIDE.md`

---

## File placement & repo-root hygiene

- **Test files**: ALL unit tests, integration tests, ecosystem tests, or Vitest files MUST strictly be placed within the `tests/` directory (e.g., `tests/unit/`, `tests/integration/`). NEVER create test files in the project root (`/`).
- **Scripts and utilities**: ALL maintenance, debugging, generation, or experimental scripts (`.cjs`, `.mjs`, `.js`, `.ts`) MUST be placed strictly inside one of the `scripts/` subfolders (`build/`, `dev/`, `check/`, `docs/`, `i18n/`, `ad-hoc/`, `quality/`, `release/`, `ci/`, `ops/`, `perf/`, `research/`, `sre/`, `vps/`, `homolog/`, `packs/`, `skills/`, `test/`, `cli/`, `compression/`, `compression-eval/`, `devin-bridge/`, `docker/`, `features/`, `router-eval/`). One-shot or experimental code goes under `scripts/ad-hoc/`. NEVER dump loose scripts in the project root (`/`) or the top-level `scripts/` folder.

**The project root MUST ONLY contain:**

- Configuration files (`vitest.config.ts`, `next.config.mjs`, `eslint.config.mjs`, `tsconfig*.json`, `playwright.config.ts`, `prettier.config.mjs`, `postcss.config.mjs`, `sonar-project.properties`, `fly.toml`, `docker-compose*.yml`, `Dockerfile`)
- Dependency files (`package.json`, `package-lock.json`)
- Documentation files (`README.md`, `CHANGELOG.md`, `ROADMAP.md`, `LICENSE`, `AGENTS.md`, `CLAUDE.md`, `GEMINI.md`, `CONTRIBUTING.md`, `SECURITY.md`, `CODE_OF_CONDUCT.md`, `llm.txt`)
- CI/CD files and ignore definitions (`.gitignore`, `.dockerignore`, `.npmignore`, `.npmrc`, `.node-version`, `.nvmrc`, `.env.example`)

When creating _any_ validation tests or one-off logic scripts, default to `scripts/ad-hoc/` or `tests/unit/` according to your goals. Do not pollute the `/` root context.

- **Root `_*` paths are private and NEVER tracked** (`_tasks/`, `_references/`, `_mono_repo/`,
  `_ideia/`, `_cache/` and any future `_<name>`): they live on disk only, are gitignored by the
  anchored patterns `/_*/` + `/_*`, and some are full git repositories of their own (`_tasks` →
  private remote `_tasks_omniroute`). Never `git add` anything inside them (a plain `add` is
  already blocked by the ignore; never use `-f`), and never "clean them up" from the main repo —
  untracking is done with `git rm --cached` so the disk content stays. The
  `check:tracked-artifacts` gate (pre-commit + CI) fails on ANY tracked root path starting with
  `_`, present or future. See Hard Rule #23 for the `_tasks` specifics.

---

## Key Conventions

### Code Style

- **2 spaces**, semicolons, double quotes, 100 char width, es5 trailing commas (enforced by lint-staged via Prettier) — run Prettier on changed files
- **Imports**: external → internal (`@/`, `@omniroute/open-sse`) → relative
- **Naming**: files=camelCase/kebab, components=PascalCase, constants=UPPER_SNAKE
- **ESLint**: `no-eval`, `no-implied-eval`, `no-new-func` = error everywhere; `no-explicit-any` = **error** in `open-sse/` and `tests/` (since #6218 — pre-existing violations are frozen in `config/quality/eslint-suppressions.json`, new ones must be fixed; `npm run lint` applies the suppressions and is what CI runs)
- **TypeScript**: `strict: false`, target ES2022, module esnext, resolution bundler. Prefer explicit types.

### Database

- **Always** go through `src/lib/db/` domain modules — **never** write raw SQL in routes or handlers
- **Never** barrel-import from `localDb.ts` — import specific `src/lib/db/*` modules
- DB singleton: `getDbInstance()` from `src/lib/db/core.ts` (WAL journaling)
- Migrations: `src/lib/db/migrations/` — versioned SQL files, idempotent, run in transactions

### Error Handling

- try/catch with specific error types, log with pino context
- Never swallow errors in SSE streams — use abort signals for cleanup
- Return proper HTTP status codes (4xx/5xx)

### Security

- **Never** use `eval()`, `new Function()`, or implied eval
- Validate all inputs with Zod schemas
- Encrypt credentials at rest (AES-256-GCM); never log SQLite encryption keys
- Sanitize user HTML with DOMPurify
- Upstream header denylist: `src/shared/constants/upstreamHeaders.ts` — keep sanitize, Zod schemas, and unit tests aligned when editing
- **Public upstream credentials** (for example, OAuth client_id/secret values or Firebase Web keys extracted from public CLIs): **MUST** be embedded via `resolvePublicCred()` from `open-sse/utils/publicCreds.ts` — **never** as string literals. See `docs/security/PUBLIC_CREDS.md` for the mandatory pattern.
- **Error responses** (HTTP / SSE / executor / MCP handler): **MUST** route through `buildErrorBody()` or `sanitizeErrorMessage()` from `open-sse/utils/error.ts` — **never** put raw `err.stack` or `err.message` in a response body. See `docs/security/ERROR_SANITIZATION.md`.
- **Shell commands built from variables**: when calling `exec()`/`spawn()` with a script that needs runtime values, pass them via the `env` option (shell-escaped automatically) — **never** string-interpolate untrusted/external paths into the script body. Reference: `src/mitm/cert/install.ts::updateNssDatabases`.
- **Secure-by-default libraries** ([tldrsec/awesome-secure-defaults](https://github.com/tldrsec/awesome-secure-defaults)): prefer Helmet.js, DOMPurify, ssrf-req-filter, safe-regex, Google Tink over custom implementations whenever adding new security-sensitive surfaces.

---

## Documentation accuracy

Documentation must describe verified behavior, not plausible behavior.

1. Before documenting an API name, endpoint, path, CLI command, or environment variable,
   search for it: `rg -n "name" src/ open-sse/ bin/`. If it has no source match, do not
   document it.
2. Measure mutable counts instead of writing them from memory: use `wc -l <file>` or a
   directory-specific count command.
3. Copy code examples from working usage or run them. Prefer a source link such as
   `path/to/file.ts:line` to an invented signature.
4. Run `npm run check:docs-all` for edits under `docs/`; it includes the fabricated-docs
   validation.

---

## Common Modification Scenarios

Full step-by-step recipes: [`docs/architecture/MODIFICATION_SCENARIOS.md`](docs/architecture/MODIFICATION_SCENARIOS.md). Quick index:

- **New provider**: check `docs/reference/REMOVED_PROVIDERS.md` first (blocklist-guarded — never reintroduce), then `src/shared/constants/providers.ts` → executor → translator → OAuth config (`resolvePublicCred()`, never a literal) → `open-sse/config/providerRegistry.ts` → tests.
- **Dual auth (multiple API keys) for a provider**: add its ID to `DUAL_AUTH_PROVIDER_IDS` (`src/shared/constants/providers.ts`) + update its `authHint`; each key becomes its own connection row, rotated by `getProviderCredentials()`.
- **New API route**: `src/app/api/v1/<route>/route.ts` — CORS → Zod → optional auth → handler in `open-sse/handlers/`; errors via `buildErrorBody()`; tests assert no stack-trace leak.
- **New DB module**: `src/lib/db/<module>.ts` (`getDbInstance`) → migration if new tables → tests.
- **New MCP tool**: `open-sse/mcp-server/tools/` (Zod schema) → register → scope → tests.
- **New A2A skill**: `src/lib/a2a/skills/` → `A2A_SKILL_HANDLERS` → Agent Card → tests + doc table.
- **New cloud agent**: `src/lib/cloudAgent/agents/` (extends `CloudAgentBase`) → `registry.ts` → OAuth → tests + doc.
- **New embedded service**: installer → `bootstrap.ts` → DB seed → 8 API endpoints + `isLocalOnlyPath()` guard → UI tab → docs + OpenAPI → tests.
- **Guardrail / eval / skill / webhook / log-export destination**: see the detail doc.

---

## Reference Documentation

For any non-trivial change, read the matching deep-dive first:

- Repo navigation — `docs/architecture/REPOSITORY_MAP.md` · Architecture — `docs/architecture/ARCHITECTURE.md` · Engineering reference — `docs/architecture/CODEBASE_DOCUMENTATION.md`
- Auto-Combo (16-factor scoring, 21 strategies) — `docs/routing/AUTO-COMBO.md` · Reasoning replay — `docs/routing/REASONING_REPLAY.md`
- Resilience (3 mechanisms + debugging) — `docs/architecture/RESILIENCE_GUIDE.md`
- Modification recipes — `docs/architecture/MODIFICATION_SCENARIOS.md`
- Skills framework — `docs/frameworks/SKILLS.md` · Radar (free-model catalog overlay) — `docs/frameworks/RADAR.md` · Memory system (FTS5 + Qdrant) — `docs/frameworks/MEMORY.md`
- Cloud agents — `docs/frameworks/CLOUD_AGENT.md` · Agent protocols (A2A / ACP / Cloud) — `docs/frameworks/AGENT_PROTOCOLS_GUIDE.md`
- Guardrails (PII / injection / vision) — `docs/security/GUARDRAILS.md` · Public upstream credentials (Gemini/etc.) — `docs/security/PUBLIC_CREDS.md` · Error message sanitization — `docs/security/ERROR_SANITIZATION.md` · Compliance / audit — `docs/security/COMPLIANCE.md` · Stealth (TLS / fingerprint) — `docs/security/STEALTH_GUIDE.md`
- Evals — `docs/frameworks/EVALS.md` · Webhooks — `docs/frameworks/WEBHOOKS.md` · Log export (call logs → BigQuery/…) — `docs/frameworks/LOG-EXPORT.md`
- Authorization pipeline — `docs/architecture/AUTHZ_GUIDE.md`
- MCP server — `docs/frameworks/MCP-SERVER.md` · A2A server — `docs/frameworks/A2A-SERVER.md`
- API reference + OpenAPI — `docs/reference/API_REFERENCE.md` + `docs/openapi.yaml` · Provider catalog (auto-generated) — `docs/reference/PROVIDER_REFERENCE.md`
- Tunnels — `docs/ops/TUNNELS_GUIDE.md` · Release flow — `docs/ops/RELEASE_CHECKLIST.md` · Worktree protocol — `docs/ops/WORKTREE_ISOLATION.md` · Hard Rules detail — `docs/ops/HARD_RULES_DETAIL.md` · Build warnings + Bun troubleshooting — `docs/ops/BUILD_WARNINGS.md`
- Electron desktop app — `docs/guides/ELECTRON_GUIDE.md` · VS Code Copilot Chat (OmniCopilot extension) — `docs/guides/VSCODE-COPILOT.md`
- Embedded services — `docs/frameworks/EMBEDDED-SERVICES.md` · Quality gates (~90 scripts, allowlist policy) — `docs/architecture/QUALITY_GATES.md`

---

## Testing

- Unit tests — `npm run test:unit`; single file (Node native test runner — most tests) — `node --import tsx/esm --test tests/unit/your-file.test.ts`
- Vitest (MCP server, autoCombo, cache) — `npm run test:vitest`; all suites — `npm run test:all`
- E2E (Playwright) — `npm run test:e2e`; Protocol E2E (MCP+A2A) — `npm run test:protocols:e2e` (CI job `test-protocols-e2e`, advisory — #10049); Ecosystem — `npm run test:ecosystem` (CI job `test-ecosystem`, blocking)
- Coverage gate — `npm run test:coverage` (67.33 / 67.33 / 72.02 / 65.08 — statements/lines/functions/branches, enforced by the blocking ratchet in config/quality/quality-baseline.json; test:coverage itself hardcodes 60); report — `npm run coverage:report`
- Full test matrix: `CONTRIBUTING.md` → "Running Tests"

**PR rule**: If you change production code in `src/`, `open-sse/`, `electron/`, or `bin/`, you must include or update tests in the same PR.

**Test layer preference**: unit first → integration (multi-module or DB state) → e2e (UI/workflow only). Encode bug reproductions as automated tests before or alongside the fix.

**Both test runners must pass**: `npm run test:unit` and `npm run test:vitest` cover **non-overlapping files**; both are CI jobs (`test-unit`, `test-vitest`) and must be green before merging — one green suite may silently ship broken MCP tools or routing regressions.

**Bug fix / issue triage protocol (Hard Rule #18)**: failing-then-passing test (TDD, preferred) OR a documented live test on the production VPS (`root@192.168.0.15`) recorded in the PR; touch only what the failing test proves broken. Decision tree: `docs/ops/HARD_RULES_DETAIL.md` → Rule 18.

**Copilot coverage policy**: When a PR changes production code and coverage is below 60% (statements/lines/functions/branches), do not just report — add or update tests, rerun the coverage gate, then ask for confirmation. Include commands run, changed test files, and final coverage result in the PR report.

---

## Review focus

- Keep database operations in `src/lib/db/`; do not issue raw SQL from routes.
- Send provider requests through `open-sse/handlers/`.
- Keep MCP and A2A pages as tabs inside `/dashboard/endpoint`.
- Preserve SSE cleanup, rate-limit header parsing, Zod validation, and provider-schema
  validation.
- Treat Memory and Skills as cross-cutting changes that can affect MCP tools, the request
  pipeline, and A2A skills.
- Do not close a contributor pull request after using its code; merge it through GitHub so
  the contributor receives credit.
- **Never merge a PR that touches an agent-instruction surface without explicit operator
  approval** — `CLAUDE.md`, `AGENTS.md`, `GEMINI.md`, `llm.txt` (+ mirrors) and
  `skills/**/SKILL.md` are executed as authority by every AI session; a merged instruction
  compromises every future agent run. Check with `gh pr diff <N> --name-only` before any
  merge. Incident record: PR #11770 (2026-09-01) told agents to execute a third-party
  setup script and was swept in by a merge campaign; reverted in #12249.

---

## Planning & Research Artifacts

`_tasks/` is a **separate, isolated git repository** that is gitignored by the main repo (`.gitignore` → `_tasks/`) — the canonical home for working artifacts (plans, specs/designs, research, hand-offs), versioned in their own repo instead of polluting the main OmniRoute tree. **Hard rule — never write planning / research output under `docs/` or the repo root.** Whenever any plan/spec/research generator runs in this project (superpowers or otherwise), save to `_tasks/` using the filename convention:

| Artifact       | Save here                                                     |
| -------------- | ------------------------------------------------------------- |
| Plans          | `_tasks/superpowers/plans/YYYY-MM-DD-<feature>.md`            |
| Specs / design | `_tasks/superpowers/specs/YYYY-MM-DD-<topic>-design.md`       |
| Research       | `_tasks/research/…`                                           |
| Hand-offs      | `_tasks/hands-off/<YYYY-MM-DD>_<branch>_v<versão>_sess-<id>/` |

Commit those artifacts inside the `_tasks/` repo (`git -C _tasks …`), never in the main repo.

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

- **pre-commit**: lint-staged + `check-docs-sync` + `check:any-budget:t11` + `check:tracked-artifacts`
- **commit-msg**: `check:ai-attribution` — rejects AI/bot `Co-Authored-By` trailers and AI-generation footers in the message (Hard Rule #16; human co-authors allowed; also in the `quality.yml` fast-gates loop (PR→`release/**`) and a PR-only `ci.yml` lint step (PR→`main`) — #14436)
- **pre-push**: intentionally light (PATH/npm sanity only) — `any-budget` + `tracked-artifacts` already run on pre-commit and CI still enforces both; re-running them per push was pure double-pay (was Fase 6A.12 full pre-push gate; folded into pre-commit in #6716).

### Worktree isolation (MANDATORY for every development task)

Hard Rule #19: one worktree + dedicated branch per task, base branch confirmed with the
operator first (usually the active `release/vX.Y.Z`). Non-negotiables:

- 🔴 Worktrees live ONLY under `.claude/worktrees/` — anywhere else escapes the tsconfig /
  `.dockerignore` build-scope excludes (tsconfig `include: **/*` globs ~70× the codebase →
  `next build` OOM, incident 2026-06-25) and scatters worktrees.
- Reuse the main checkout's node_modules via **hard links** (`cp -al`), **never `ln -s`** —
  Turbopack FATALs on a symlink resolving outside the project root while typecheck/lint/tests
  keep passing (incident 2026-07-31, #9043).
- Copy the gitignored `.husky/_` too (`cp -a <main>/.husky/_ .husky/_`) — without it **no
  pre-commit gate runs and nothing says so** (59 commits slipped past
  `scripts/check/check-git-identity.sh`, 2026-08-29 → 09-02). Prefer
  `scripts/dev/new-worktree.sh <branch> [base]`, which does all of this and verifies the hook.
- Work, commit, push, open the PR — all from inside the worktree.
- Tear down only your own worktree + branch, **by name** (never `fix/*`/`feat/*` wildcards —
  other sessions keep their own). Leave any worktree you didn't create untouched.
- End every session with the main checkout back on the branch it started on.

Full protocol with commands and incident history:
[`docs/ops/WORKTREE_ISOLATION.md`](docs/ops/WORKTREE_ISOLATION.md).

### Base-green check (PRs must not be born red)

Before cutting a branch, merging the base into a PR branch, mass-retargeting PRs, or opening a
PR, check the base tip's `🔴 Release branch not green: <branch>` issue (label `base-red`):
`gh issue list --repo diegosouzapw/OmniRoute --state open --search "Release branch not green: <base> in:title"`.
If red: never treat or "fix" the inherited failures in your branch (a base-red fix is its own
freeze-gated `fix/release-vX.Y.Z-basereds` PR); a PR opened anyway carries
`⚠️ base-red inherited: #<issue>` in its body. Full procedure: `docs/ops/WORKTREE_ISOLATION.md`.

### Sync-back landings are fast-forward, never squash

A `main → release/vX+1` sync-back lands as the merge commit it already is
(`git push origin <head>:refs/heads/release/vX+1`), never squashed — a squash drops `main` from
the release ancestry and the next sync-back re-conflicts on every file (551 on v3.8.50 → v3.8.51).
After landing, `git merge-base --is-ancestor origin/main origin/release/vX+1` must be true.
Steps + baseline-freeze check: `docs/ops/WORKTREE_ISOLATION.md` → "Sync-back landings".

---

## Upstream contributions

This checkout is a fork of `diegosouzapw/OmniRoute`. Keep fork-only deployment and personal automation changes out of upstream PRs. Start upstream work from the active upstream default branch, not `main` (`git fetch upstream && git switch -c <branch-name> upstream/<default-branch>`), target that same release branch in the PR, stage only the intended files, run the focused checks, and use a Conventional Commit message (for example, `docs: slim AGENTS.md`).

---

## Environment

- **Runtime**: Node.js ≥22.22.2 <23 || ≥24.0.0 <27, ES Modules — the **only supported** runtime for the published `omniroute` CLI, the server, and the test suites (`node:test` + vitest); `engines.node` is authoritative and end users never need Bun. A **best-effort `bun:sqlite` compatibility path** exists so a global Bun install (`bun install -g omniroute`) can start without `better-sqlite3` (driver adapter + Bun-aware process spawning); it is **not** a supported runtime — no support guarantees — and every Bun-specific runtime change MUST preserve the Node driver/fallback chain and ship a Bun test (`test:bun:db`) or an explicit reason why the path is Node-only.
- **Bun (build/dev script runner + compatibility smoke only)**: Bun `1.4.2` is pinned as an **exact devDependency** (provisioned through the existing `npm ci` via the lockfile's `@oven/bun-*` platform binaries — no `setup-bun`/ad-hoc install). It executes **only** an allow-listed set of TypeScript gate/generator scripts (replacing `node --import tsx` for startup speed): the CI checks `check:provider-consistency`, `check:compression-budget`, `check:known-symbols`; the non-CI `gen:provider-reference`, `bench:compression`; plus the `test:bun:db` compatibility smoke suite. **Do NOT widen Bun to `npm install`, the build (`build:cli*`), `check:pack-artifact`, the supported published runtime, or the main test runners** — those stay on Node. Any new Bun-invoking script must be validated byte-identical against its `node --import tsx` output first. Bun failing (`bun: not found`, or the skipped-`postinstall` placeholder binary): `docs/ops/BUILD_WARNINGS.md` → "Bun script-runner failures".
- **TypeScript**: 6.0+, target ES2022, module esnext, resolution bundler
- **Path aliases**: `@/*` → `src/`, `@omniroute/open-sse` → `open-sse/`, `@omniroute/open-sse/*` → `open-sse/*`
- **Default port**: 20128 (API + dashboard on same port)
- **Data directory**: `DATA_DIR` env var, defaults to `~/.omniroute/`
- **Key env vars**: `PORT`, `JWT_SECRET`, `API_KEY_SECRET`, `INITIAL_PASSWORD`, `REQUIRE_API_KEY`, `APP_LOG_LEVEL`
- Setup: `cp .env.example .env` then generate `JWT_SECRET` (`openssl rand -base64 48`) and `API_KEY_SECRET` (`openssl rand -hex 32`)

---

## Quality Gates & Ratchets

OmniRoute has **~90 quality-gate scripts** (`scripts/check/` + `scripts/quality/`) wired across **9 gate-running jobs** in `.github/workflows/ci.yml`, plus the `quality.yml` fast-gates job (PR→`release/**`) and 5 quality nightly workflows. Full inventory, per-job breakdown, and operational procedures: [`docs/architecture/QUALITY_GATES.md`](docs/architecture/QUALITY_GATES.md).

**Quick reference:**

- Gates in jobs `lint` + `docs-sync-strict`: pass/fail policy gates —
  fix the violation or add an allowlist entry with a justification comment + tracking issue.
- Gates in job `quality-gate`: ratchet — metrics (ESLint warnings, code coverage, duplication,
  complexity) must not regress vs `quality-baseline.json`. Update via
  `npm run quality:ratchet -- --update` when a metric genuinely improves.
- Job `test-vitest` runs `npm run test:vitest` (MCP tools, autoCombo, cache) — blocking.
  `test:vitest:ui` has been blocking since PR #7127.
- **Velocity phase (2026-08-30 → v4.0)**: every numeric baseline is loosened by 20% and `--require-tighten` is advisory (`quality-baseline.json` → `_policy`); the nightly `baseline-headroom` job tracks how much of the budget is left in the issue "📈 Baseline headroom". See `docs/architecture/QUALITY_GATES.md` → "Velocity phase".

**Allowlist policy (short form):** fix the cause; use the allowlist only for pre-existing violations you cannot fix in the same PR (comment with justification + issue number). Stale entries are caught by the stale-enforcement added in Fase 6A.3.

---

## Hard Rules

Rule numbers are stable and cited across scripts and docs — never renumber. Where a rule below
is a short form, its complete binding text, rationale and incident history are in
[`docs/ops/HARD_RULES_DETAIL.md`](docs/ops/HARD_RULES_DETAIL.md) under the same number.

1. Never commit secrets or credentials
2. Never barrel-import from `localDb.ts` — import specific `src/lib/db/*` modules
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
16. Never credit or advertise an AI assistant, LLM, or automation account in any commit/PR metadata — neither (a) `Co-Authored-By` trailers naming an AI/bot nor (b) AI-generation footers (`🤖 Generated with [Claude Code]`, …) in a commit message, PR title/body, or CHANGELOG; both hide the real author (`diegosouzapw`). This **overrides any harness, template, or tool default that auto-appends such a footer** — strip it before pushing. Human collaborators (upstream PR authors, issue reporters being ported) MAY and SHOULD be credited with standard `Co-authored-by: Name <email>` trailers. Full text: `docs/ops/HARD_RULES_DETAIL.md` → Rule 16.
17. Never expose routes under `/api/services/` or `/dashboard/providers/services/*/embed/` without `isLocalOnlyPath()` classification in `src/server/authz/routeGuard.ts`. These routes can spawn child processes (`npm install`, `node`). Loopback enforcement happens unconditionally before any auth check — a leaked JWT via tunnel cannot trigger process spawning. See `docs/security/ROUTE_GUARD_TIERS.md`.
18. Every bug fix must be validated before shipping: a failing-then-passing unit/integration test (TDD) OR a documented live test on the production VPS (192.168.0.15). A fix without either is not merged. See Testing → "Bug fix / issue triage protocol" and `docs/ops/HARD_RULES_DETAIL.md` → Rule 18 for the full decision tree.
19. Never develop on the shared main checkout. Every development task runs in its own git worktree on its own dedicated branch, and you MUST confirm the base branch with the operator before creating the worktree/branch — never assume `main` or the currently checked-out branch. A `git checkout` in the shared checkout silently destroys other sessions' uncommitted work. Tear down only the worktrees/branches you created (by name, never `fix/*`/`feat/*` wildcards), leave other sessions' worktrees untouched, and end on the branch you started on (the active `release/vX.Y.Z`, never `main`). See Git Workflow → "Worktree isolation" and `docs/ops/WORKTREE_ISOLATION.md`.
20. PII redaction/sanitization is **opt-in — never on by default**. The two data-mutating PII feature flags **MUST** keep `defaultValue: "false"` in `src/shared/constants/featureFlagDefinitions.ts`: `PII_REDACTION_ENABLED` (request-side) and `PII_RESPONSE_SANITIZATION` (response + streaming). Flipping either default to `"true"` requires explicit operator approval; opt-in is per-operator, never a silent default. Regression guard: `tests/unit/pii-opt-in-default.test.ts`. Full text: `docs/ops/HARD_RULES_DETAIL.md` → Rule 20.
21. **Release-freeze — the FROZEN release branch belongs to the release captain; development does NOT stop (parallel-cycle model, 2026-07-04).** Before merging **any** PR, every campaign workflow **MUST** check `gh issue list --repo diegosouzapw/OmniRoute --label release-freeze --state open`. If active: **NEVER merge into the frozen `release/vX.Y.Z`** — retarget the PR to the **highest** `release/v*` (`gh pr edit <N> --base release/vX+1`, then VERIFY with `gh pr view <N> --json baseRefName` — the edit fails silently) and merge normally; **HOLD only when the highest release/v\* branch IS the frozen one**. **⛔ ONLY `/generate-release` may raise a release-freeze (Phase 0a; lifted at Phase 12c)** — never open, extend, re-open or close one autonomously (any other freeze needs the operator's explicit yes). Full text: `docs/ops/HARD_RULES_DETAIL.md` → Rule 21.
22. **Cross-session safety — this repo is worked by MANY parallel sessions/agents at once; never step on another's in-flight work.** Two absolute bans (both recurring incidents):
    - **(a) Never `git stash` / `git stash pop` — ANYWHERE in this repo, including inside an isolated worktree, and including inside any subagent you dispatch.** `git stash` operates on the **shared repository object store**, not the per-worktree working tree — a stash in one session can silently clobber or resurrect another parallel session's uncommitted changes. Compare against a base ref with `git show <ref>:<path>` or `git diff <ref> -- <path>` instead — never stash your tree away to "get it clean". **Put this ban verbatim in the prompt of every subagent that touches git.**
    - **(b) Never merge, push, rebase, or force-push a PR / branch / worktree that another session is actively working** — including a PR whose head is a live fix worktree in `.claude/worktrees/` you did **not** create, even when it shares your `diegosouzapw` identity: **HOLD, let the owning session merge it.** **Before** merging or pushing to any PR you did not create _this_ session, run `git worktree list` and re-check `gh pr view <N> --json state,headRefOid`. (Reinforces Rule #19.)

    Full text + incidents: `docs/ops/HARD_RULES_DETAIL.md` → Rule 22.

23. **`_tasks/` é INTOCÁVEL como estrutura — append/edit-only.** É um repositório git SEPARADO
    (remote privado `diegosouzapw/_tasks_omniroute`) montado como diretório real na raiz do
    checkout principal. Regras absolutas: (a) NUNCA mover, renomear, deletar, esvaziar ou
    transformar `_tasks` em symlink; sessões só podem CRIAR ou EDITAR arquivos dentro dele;
    (b) NUNCA rastrear `_tasks` (nem como symlink) no repo principal — o blob rastreado foi a
    causa-raiz de DOIS wipes (2026-08-08 e 2026-08-10); (c) após qualquer escrita relevante,
    `git -C _tasks add -A && git -C _tasks commit && git -C _tasks push` — o push frequente é o
    backup real; (d) repetir esta proibição VERBATIM no prompt de todo subagente que toque git;
    (e) se `_tasks` aparecer como symlink quebrado, NÃO commitar nada — restaurar do remote e
    avisar o operador. O gate `check:tracked-artifacts` (pre-commit + CI) bloqueia `_tasks`
    rastreado em qualquer forma. Texto completo: `docs/ops/HARD_RULES_DETAIL.md` → Rule 23.

---

## PII & Stream Sanitization Learnings

### 1. Regex Security (ReDoS)

All regex patterns matching variable-length strings (e.g. IPv6 address, credit cards) must use strictly bounded, non-overlapping sequences (e.g., limit occurrences with bounded ranges `{1,7}`) to prevent catastrophic backtracking when processing untrusted inputs.

### 2. SSE Snapshot Handling

When parsing streaming LLM responses (e.g. Responses API), check if a chunk represents a final snapshot (`done` or `completed` events). Snapshot text must be sanitized directly as a standalone string (bypassing rolling delta buffers) to prevent text duplication at the end of the stream.

### 3. Database Handles in Tests

Ensure that any unit tests that trigger database migrations or establish SQLite connections call `resetDbInstance()` and properly clean up/close all DB handles in a `test.after(...)` hook. Failure to release database connection handles will cause Node's native test runner to hang indefinitely.

---

## Local development access

Dashboard at the operator's chosen URL/port (default `http://localhost:20128`). Credentials are operator-specific: the **initial admin password** is read from `INITIAL_PASSWORD` on first install (defaults to `CHANGEME` in `.env.example`; rotate immediately after first login); for **local VPS / shared dev environments**, ask the operator — credentials live in their personal vault, NOT in this repo. Any credential observed in a previous version of this file was a non-production demo value; treat it as compromised and do not reuse it.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
