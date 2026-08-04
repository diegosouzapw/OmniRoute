---
title: Quality Gates Reference
---

# Quality Gates Reference

This document is the authoritative reference for all CI quality gates in OmniRoute.
It describes each gate, what it validates, which CI job it runs in, whether it uses
a ratchet baseline or a pass/fail policy, and whether it blocks the build or is advisory.

For a short summary and the allowlist policy, see the "Quality Gates & Ratchets" section
in `CLAUDE.md`.

---

## Gate Inventory (~50 scripts)

Scripts live under `scripts/check/` (policy gates) and `scripts/quality/` (ratchet engine).
The CI source of truth is `.github/workflows/ci.yml`.

### Release PR fast-path (`quality.yml`)

`.github/workflows/quality.yml` runs on PRs targeting `release/**`. It keeps contributor
branches moving with path-filtered fast gates, plus one advisory production-build signal for code
changes:

| Job                                              | Scope                                                                                                                                                                                                            | Blocking                                                                                  |
| ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| `Build (advisory)`                               | Non-draft code PRs and Mergify queue branches; Node 24, `npm-ci-retry`, `check:node-runtime`, `npm run build` with `OMNIROUTE_USE_TURBOPACK=1`; no artifact upload because no downstream quality job consumes it | **Advisory** (`continue-on-error: true`; remove after one week of stable release-PR runs) |
| `Docs Gates (fast-path)`                         | Docs/code PRs; API docs refs and docs-all                                                                                                                                                                        | Yes                                                                                       |
| `Fast Quality Gates`                             | Code PRs; static checks, typecheck, dashboard typecheck, impacted unit tests                                                                                                                                     | Yes                                                                                       |
| `Vitest (fast-path)`                             | Code PRs; fast vitest suite                                                                                                                                                                                      | Yes                                                                                       |
| `Unit Tests fast-path`                           | Code PRs; 4-shard unit suite                                                                                                                                                                                     | Yes                                                                                       |
| `No new ESLint warnings`                         | Code PRs; suppressions-aware lint guard                                                                                                                                                                          | Yes for own-origin, advisory for forks                                                    |
| `Merge integrity (changelog + generated skills)` | Non-draft PRs; changelog and generated skill sync                                                                                                                                                                | Yes for own-origin, advisory for forks                                                    |

### Job: `lint`

Runs on every PR to `main`. Blocks merge on failure.

| Script (`npm run ...`)         | Validates                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Blocking                                 |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| `check:node-runtime`           | Node.js version is within the supported range                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Yes                                      |
| `check:cycles`                 | Circular imports — all `src/` + `open-sse/` modules                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Yes                                      |
| `check:route-validation:t06`   | Zod schemas present on all routes (Tier 6 policy)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Yes                                      |
| `check:any-budget:t11`         | `@ts-expect-error // any` count does not exceed budget (Tier 11 catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Yes                                      |
| `check:provider-consistency`   | Every provider in `providers.ts` has a matching entry in `providerRegistry.ts` (and vice-versa, within the allowlist)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Yes                                      |
| `check:fetch-targets`          | Every `fetch("/api/...")` in client-side `src/` resolves to a real `route.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Yes                                      |
| `check:deps`                   | All `npm install`-able deps across every `package.json` in the repo are in `dependency-allowlist.json`; new unpinned or slopsquatted packages flagged                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Yes                                      |
| `audit:deps`                   | `npm audit` (root + electron) — no high/critical advisories (overlaps osv `check:vuln-ratchet`; see Rationalization Backlog)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Yes                                      |
| `check:lockfile`               | `package-lock.json` integrity — https registry, integrity hashes, no host overrides                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Yes                                      |
| `check:licenses`               | SPDX license allowlist for production dependencies                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Yes                                      |
| `check:tracked-artifacts`      | No build artifacts / committed `node_modules` symlinks (also runs in husky pre-commit; pre-push is intentionally light — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Yes                                      |
| `check:file-size`              | No source file exceeds the per-extension cap (ratchet: frozen large files in `frozen` list)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Yes                                      |
| `check:error-helper`           | Error responses in executors/handlers use `buildErrorBody()` / `sanitizeErrorMessage()` (Hard Rule #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Yes                                      |
| `check:migration-numbering`    | Migration SQL files are sequentially numbered, no gaps or duplicates                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Yes                                      |
| `check:public-creds`           | No literal OAuth `client_id`/`client_secret` or Firebase Web keys outside `publicCreds.ts` (Hard Rule #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Yes                                      |
| `check:db-rules`               | No raw SQL outside `src/lib/db/` modules; no barrel-imports from `localDb.ts` (Hard Rules #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Yes                                      |
| `check:known-symbols`          | Provider executors, routing strategies, and translators registered in their dispatch tables match the files on disk — no orphaned or undeclared symbols                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Yes                                      |
| `check:route-guard-membership` | Every route that spawns a child process is classified by `isLocalOnlyPath()` (Hard Rules #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Yes                                      |
| `check:test-discovery`         | Every `*.test.ts` / `*.spec.ts` file in the repo is collected by at least one test runner (ratchet: orphan list in `test-discovery-baseline.json` can only shrink)                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Yes                                      |
| `check:docs-sync`              | CHANGELOG version, OpenAPI version, and `llm.txt` are in sync                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Yes                                      |
| `typecheck:core`               | TypeScript compilation without errors (advisory warnings only)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Yes                                      |
| `typecheck:noimplicit:core`    | Strict `noImplicitAny` — forward-looking; many pre-existing call sites still need annotations                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | **Advisory** (`continue-on-error: true`) |
| `check:dashboard-typecheck`    | `tsc` scoped to `src/app/(dashboard)/**` (#7033) — `typecheck:core`'s curated 27-file allowlist does not include any dashboard TSX, and `next build` never type-checks it either (`next.config.mjs` sets `ignoreBuildErrors: true`), so orphaned-identifier regressions there (#6625/#6909) were invisible to CI. Diffs against a frozen per-file/per-TS-code count baseline (`config/quality/dashboard-typecheck-baseline.json`, same stale-enforcement pattern as `check:known-symbols`) — only NEW errors beyond the baselined count fail the gate; ratchet down with `--update` when a pre-existing error is fixed. | Yes                                      |

### Job: `quality-gate`

Runs after `test-coverage`. Blocks merge on failure.

| Script                       | Validates                                                                                                                      | Blocking                  |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------ | ------------------------- |
| `quality:collect`            | Emits `quality-metrics.json` (ESLint warning count, coverage from merged shard report)                                         | Yes (upstream of ratchet) |
| `quality:ratchet`            | Each metric in `quality-baseline.json` has not regressed (ESLint warnings ≤ baseline; coverage ≥ baseline)                     | Yes                       |
| `check:duplication`          | Code duplication (jscpd@4) does not exceed baseline in `quality-baseline.json`                                                 | Yes                       |
| `check:complexity`           | File-level cyclomatic complexity does not exceed the cap (core ESLint `complexity` + `max-lines-per-function`)                 | Yes                       |
| `check:cognitive-complexity` | Cognitive complexity ratchet (`eslint-plugin-sonarjs`) — separate ESLint pass; mergeable with `check:complexity` (see Backlog) | Yes                       |
| `check:dead-code`            | Unused exports / files ratchet (knip) does not regress vs baseline                                                             | Yes                       |
| `check:type-coverage`        | Percent-typed ratchet (`type-coverage`) does not regress; largely subsumes `typecheck:noimplicit:core`                         | Yes                       |
| `check:codeql-ratchet`       | Open CodeQL alert count does not regress (reads via `gh api`; graceful-skip without token)                                     | Yes                       |

### Job: `quality-extended`

Entire job is advisory (`continue-on-error: true`). The npm-based ratchets run for
real; the external scanners install via `gh release download` and self-skip (exit 0)
when a binary is still absent.

| Script                   | Validates                                                                                                                                                                | Blocking     |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------ |
| `check:circular-deps`    | No circular dependencies (dpdm)                                                                                                                                          | **Advisory** |
| `check:bundle-size`      | Bundle size does not exceed the cap                                                                                                                                      | **Advisory** |
| `check:secrets`          | Secret scanning (gitleaks) — skips if binary absent                                                                                                                      | **Advisory** |
| `check:vuln-ratchet`     | Dependency vulnerabilities (osv-scanner) do not regress — skips if binary absent                                                                                         | **Advisory** |
| `check:workflows`        | Workflow lint (actionlint + zizmor) — skips if binaries absent                                                                                                           | **Advisory** |
| `check:openapi-breaking` | Breaking changes to the public API contract (`openapi.yaml`) vs the base branch (oasdiff) — emits `openapiBreaking=N`; skips if oasdiff absent or base spec unresolvable | **Advisory** |

### Job: `docs-sync-strict`

Runs on every PR to `main`. Blocks merge on failure.

| Script                         | Validates                                                                                                                                         | Blocking                   |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- |
| `check:docs-all`               | Meta-gate that runs the 6 sub-gates below sequentially                                                                                            | Yes                        |
| ↳ `check:docs-sync`            | CHANGELOG / OpenAPI / llm.txt version consistency                                                                                                 | Yes                        |
| ↳ `check:docs-counts`          | Counts in prose (provider count, migration count, etc.) are within the ratchet window of the real counts                                          | Yes                        |
| ↳ `check:env-doc-sync`         | Every env var in `.env.example` is documented in a docs table, and vice versa                                                                     | Yes                        |
| ↳ `check:deprecated-versions`  | No deprecated version strings in docs                                                                                                             | Yes                        |
| ↳ `check:doc-links`            | Internal markdown links in docs resolve to real files (`[text]`/`(path)` form)                                                                    | Yes                        |
| ↳ `check:fabricated-docs`      | Routes, env vars, CLI commands, hook names, and file paths cited in docs exist in the codebase. Hard gate via `--strict`; soft-fail without flag. | Yes (via `--strict` in CI) |
| `check:cli-i18n`               | CLI command strings are present in all i18n locale files                                                                                          | Yes                        |
| `check:openapi-coverage`       | OpenAPI spec covers at least a ratcheted floor of real routes                                                                                     | Yes                        |
| `check:openapi-security-tiers` | Security tier annotations in `openapi.yaml` are consistent with `routeGuard.ts` classifications                                                   | **Advisory**               |
| `check:openapi-routes`         | Every path in `openapi.yaml` resolves to a real `route.ts` (anti-hallucination)                                                                   | Yes                        |
| `check:docs-symbols`           | Every `/api/...` reference in `docs/**/*.md` resolves to a real `route.ts` (anti-hallucination)                                                   | Yes                        |
| `i18n translation drift`       | Untranslated keys in i18n locale files — warn only                                                                                                | **Advisory**               |

### Job: `i18n-ui-coverage`

| Script                            | Validates                                                        | Blocking |
| --------------------------------- | ---------------------------------------------------------------- | -------- |
| `check-ui-keys-coverage` (inline) | UI i18n key coverage is ≥ 65%                                    | Yes      |
| `check-ui-value-drift` (inline)   | A rewritten English **value** leaves no stale translation behind | Yes      |

Needs `fetch-depth: 0` — the value-drift gate diffs `en.json` against the merge base.

#### `check-ui-value-drift` — stale-translation gate

Catches the one i18n regression the other gates structurally cannot see: an English value
is rewritten and the translations derived from the _previous_ English stay behind, so
non-English users keep reading confidently-worded, now-wrong copy.

This shipped for real. `oauthModal.googleOAuthWarning` was rewritten when the Antigravity
login helper landed (#5203); **39 of 43 locales** kept text telling operators to "copy the
full URL and paste it below" — a flow that cannot complete for that provider. It went
unnoticed until #8463 because:

- `sync-ui-keys` only backfills keys that are **absent**, never ones that are **stale**;
- `check-ui-keys-coverage` counts key _presence_, so a stale translation scores as covered;
- `check-translation-drift` tracks the `docs/i18n/<locale>/**.md` documentation mirrors —
  it never reads `src/i18n/messages/*.json`.

**Diff-aware, not baseline-backed.** It compares `en.json` at the merge base against the
working tree; for every key whose English value changed, any locale still holding an
untouched translation is stale. This deliberately **freezes pre-existing debt** — a diff
cannot reveal which old English a long-standing translation came from, so the gate judges
only what the current change touches. The alternative (a per-key hash baseline) would cost
a ~600 KB generated file, 3× the largest existing baseline, churning on every i18n PR.

Two ways to satisfy it:

1. update the affected translations, or
2. set them to `__MISSING__:<new english>` — the runtime then serves the corrected English
   (`src/i18n/request.ts::deepMergeFallback`, #7258) and the key queues for translation.

If the string's **meaning** changed, prefer **renaming the key**: a new key cannot inherit
a stale translation. That is the pattern #8463 used.

```bash
npm run i18n:check-value-drift          # strict (what CI runs)
npm run i18n:check-value-drift:warn     # report only
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Exits 0 with `SKIP reason=base-unresolved` when the base catalog cannot be read (shallow
clone without the base ref), mirroring `check-openapi-breaking`.

### Job: `i18n`

Full i18n validation matrix (one job per locale). Entire job is advisory.

| Script                          | Validates                           | Blocking                                              |
| ------------------------------- | ----------------------------------- | ----------------------------------------------------- |
| `validate_translation.py quick` | Translation completeness per locale | **Advisory** (`continue-on-error: true` on whole job) |

### Job: `pr-test-policy`

Runs on pull requests only.

| Script                 | Validates                                                                                                                  | Blocking |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------- | -------- |
| `check:pr-test-policy` | PRs that change production code in `src/`, `open-sse/`, `electron/`, or `bin/` must include or update tests (Hard Rule #8) | Yes      |
| `check:test-masking`   | Changed test files do not reduce net assert count or add `assert.ok(true)` tautologies                                     | Yes      |
| `check:pr-evidence`    | PR body cites test/VPS evidence for the change (mechanizes Hard Rule #18 by grepping PR prose — fragile, see Backlog)      | Yes      |

### Job: `test-vitest`

Runs after `build`. Blocks merge on failure.

| Suite            | Validates                                               | Blocking                                                                   |
| ---------------- | ------------------------------------------------------- | -------------------------------------------------------------------------- |
| `test:vitest`    | MCP server (94 tools), autoCombo, cache — vitest runner | Yes                                                                        |
| `test:vitest:ui` | UI component tests — vitest runner                      | **Advisory** (`continue-on-error: true`) — failing until Fase 6A UI triage |

### Nightly workflows (scheduled, advisory)

These run on a cron schedule (and `workflow_dispatch`), never on PRs. All are advisory.

| Workflow               | Validates                                                                                                                                           | Blocking     |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| `nightly-property`     | fast-check property tests with a random seed + high run count                                                                                       | **Advisory** |
| `nightly-resilience`   | heap-growth gate, chaos fault-injection, k6 load/soak                                                                                               | **Advisory** |
| `nightly-llm-security` | promptfoo injection guard (block mode) + garak probes (skipped without a provider secret)                                                           | **Advisory** |
| `nightly-schemathesis` | OpenAPI contract fuzzing (schemathesis) against a live OmniRoute using `docs/openapi.yaml` — surfaces spec violations / unhandled 500s (Fase 8 B.4) | **Advisory** |

---

## Ratchet Baseline (`quality-baseline.json`)

The ratchet engine (`scripts/quality/check-quality-ratchet.mjs`) reads `quality-baseline.json`
and compares it against the freshly collected `quality-metrics.json`. Any metric that regresses
beyond its epsilon fails the build.

Current tracked metrics:

| Metric                | Direction | Meaning                            |
| --------------------- | --------- | ---------------------------------- |
| `eslintWarnings`      | `down`    | ESLint warning count must not grow |
| `coverage.statements` | `up`      | Statement coverage must not fall   |
| `coverage.lines`      | `up`      | Line coverage must not fall        |
| `coverage.functions`  | `up`      | Function coverage must not fall    |
| `coverage.branches`   | `up`      | Branch coverage must not fall      |

To update the baseline after a genuine improvement:

```bash
npm run quality:ratchet -- --update
git add quality-baseline.json
```

The `--update` flag writes the current measured values into `quality-baseline.json`.
Commit this file alongside the change that improved the metric. A PR that improves a
metric without updating the baseline will be caught by `--require-tighten` (Fase 6A.5,
pending implementation).

---

## Test Retry Policy (WS5.4, v3.8.49)

Retry is per-runner, never a global blanket — a blanket retry converts real regressions
into invisible flakes:

| Runner           | Policy                                                                                                     | Why                                                                                                                    |
| ---------------- | ---------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| Playwright (e2e) | `retries: 1` in CI only, with `trace: on-first-retry`                                                      | Browser/network timing is genuinely nondeterministic; one retry with a trace turns a flake into a diagnosable artifact |
| Vitest           | NO global retry. A proven-flaky test gets an explicit per-test retry (visible in the diff, reviewed in PR) | Keeps the quarantine list in the repo, never opaque                                                                    |
| node:test (unit) | NO retry, ever                                                                                             | A flaky unit test is a bug in the test — fix it, don't re-roll it                                                      |

Target SLOs once flake telemetry lands (WS5.2/5.3): <1% flake rate per test
("fix now" threshold), ≥95% pass rate per pipeline. Industry reference values —
recalibrate against our own measurements.

## Release-Level Ratchet Drift (WS5.5, v3.8.49)

When a ratchet (file-size, complexity, eslint warnings) regresses on the PURE release
tip — i.e. the COMBINATION of merges regressed it, and no single PR reproduces the
regression on its own branch — the fix belongs to the **release captain, once, on the
release branch**: prefer extraction/refactor; rebaseline only with the documented
justification entry. Never push combination drift onto a contributor PR, and never
rebaseline per-PR (that hides real regressions). Discriminate first: reproduce the
red against the pure tip in a probe worktree before assuming your PR caused it.

## Banking Ratchet Shrinks — the downward direction (#8584)

The ratchet is only half automatic, and it is the wrong half. **Raising** a cap is a
manual JSON edit that takes ten seconds and is the fastest way to unblock a red PR.
**Lowering** one requires someone to run `--update` and commit the result — and until
the `bank-ratchet-shrinks` job landed, no workflow ran it. The measured consequence
(2026-07-25): 18 frozen files already at or under the 800-line new-file cap, the worst
at 132× (`src/shared/validation/schemas.ts`, 19 lines carrying a 2,523 cap); the
complexity ceiling walked `1794 → 2169` across ~37 rebaseline notes with exactly one
decrease (−1); and "tighten via `--update` next cycle" written 31 times and honoured
once. A cap that outlives the code that earned it silently converts every completed
decomposition into a growth allowance for whoever edits the file next.

`nightly-release-green.yml` → job **`bank-ratchet-shrinks`** closes that loop:

|          |                                                                                                        |
| -------- | ------------------------------------------------------------------------------------------------------ |
| Runs on  | `schedule` (3×/day) + `workflow_dispatch` — deliberately **not** `push`                                |
| Measures | the highest `release/vX.Y.Z`, same resolution + injection guard as `release-green`                     |
| Writes   | `check:file-size --update` and `check:complexity-ratchets --update` (both shrink-only by construction) |
| Verifies | `npm run check:ratchet-bank` (`scripts/quality/verify-ratchet-bank.mjs`)                               |
| Ships    | one always-current PR against the release branch — force-updated, never spammed                        |

Banking is batched rather than per-push because it has no latency requirement (a shrink
banked within 8h is fine) while a per-merge run would rebuild the PR branch repeatedly
during merge campaigns and pay for a full ESLint walk each time. Detection stays on
push (`release-green`); only banking is batched.

### The safety verifier

The job writes to the baselines unattended, so `verify-ratchet-bank.mjs` is what makes
that acceptable. It diffs the post-`--update` tree against `HEAD` and **aborts the job
before any commit exists** — opening no PR — unless every change is one of:

- a `frozen` / `testFrozen` numeric entry **lowered** or **removed**
- `complexity-baseline.json` → `count` **lowered**
- `quality-baseline.json` → `metrics.cognitiveComplexity.value` **lowered**

Anything else fails: raising a number, adding an entry, changing `cap`/`testCap`, or
deleting/rewriting a `_rebaseline_*` note (those notes are the audit trail for why each
ceiling exists and are stored inside the same `frozen` object as the file entries).
A bot that could raise a cap would be strictly worse than the status quo. Regression
guard: `tests/unit/verify-ratchet-bank.test.ts`.

The job never pushes to `release/*` — a human merges the PR, so a bad measurement
cannot land unreviewed.

## Allowlist Policy

Every gate that cannot fail on pre-existing violations uses a frozen allowlist
(e.g., `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`). The policy is:

**Fix the root cause; use the allowlist only when the violation is pre-existing and
cannot be fixed in the same PR.**

When adding an entry to an allowlist:

1. Include a comment with the justification.
2. Reference the tracking issue (e.g., `// #3498 — Phase 2 feature, not yet implemented`).
3. Remove the entry in the same PR that fixes the violation — a stale entry that no longer
   suppresses an active violation is itself a defect (6A.3 stale-enforcement will
   fail the gate on an orphaned allowlist entry once implemented).

Do **not** add allowlist entries to make tests pass faster. A green gate with a growing
allowlist is a false sense of quality.

### When a gate fails on your PR

1. **Read the gate output carefully** — it tells you exactly which file or symbol violated
   the rule.
2. **Fix the violation** — most gates are deterministic filesystem checks that pass as soon
   as the code is correct.
3. **If the violation is pre-existing** (i.e., you did not introduce it but the gate now
   covers it): add an allowlist entry with a justification comment and a tracking issue.
4. **If the gate is a ratchet** (coverage, ESLint warnings, duplication, complexity):
   your change made the metric worse. Fix the underlying issue, or (rarely) run
   `npm run quality:ratchet -- --update` if the change is intentional and the metric
   degradation is acceptable — but document why in the PR description.
5. **Advisory gates** (`continue-on-error: true`) are informational — they do not block
   merge but appear in the CI summary. Fix them anyway.

---

## Adding a New Gate

1. Create `scripts/check/check-<name>.mjs` (or `.ts`). Policy gates exit 0/1.
   Ratchet-style gates emit a metric to `quality-metrics.json` via `collect-metrics.mjs`.
2. Add `"check:<name>": "node scripts/check/check-<name>.mjs"` to `package.json`.
3. Wire it in `.github/workflows/ci.yml` under the appropriate job
   (policy → `lint` or `docs-sync-strict`; ratchet → `quality-gate`).
4. If it has an allowlist, apply `reportStaleEntries()` from
   `scripts/check/lib/allowlist.mjs` so stale entries are detected automatically.
5. Write a test in `tests/unit/build/` covering the gate's detection logic.
6. Update this document (add a row to the relevant job table).

---

## Agent tooling: LSP-in-the-loop (opt-in)

Beyond the CI gates, OmniRoute ships an **opt-in** `agent-lsp` scaffold
(a project-level `.mcp.json`, Fase 7 Task 15). Create `.mcp.json`
to expose a TypeScript language server to coding agents, so they resolve symbols /
diagnostics **before** writing code — a compile-before-claim companion to
`typecheck:core` that cuts "invented symbol" errors at the source. It is intentionally
not auto-loaded (you pick and verify the MCP↔LSP bridge); a broken entry only logs a
connection error and never breaks sessions.

---

## Rationalization Backlog (ROI review — Fase 9 Onda 3)

This inventory was reconciled against `ci.yml` on 2026-06-17 (the prior version omitted
`audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`,
`check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`,
`check:codeql-ratchet`, `check:pr-evidence`). An ROI review of the reconciled set
identified the following rationalization candidates. **The merges are mechanical CI
changes; the flips/drops are policy decisions reserved for the operator.** Nothing below
is applied yet.

**Also undocumented above** (advisory, low signal): the `docs-lint` job
(markdownlint + Vale, whole job `continue-on-error`) and the standalone scanner workflows
`semgrep.yml` / `codeql.yml` / `scorecard.yml`. `semgrepFindings: 0` is in
`quality-baseline.json` but is not wired to a blocking ratchet in `ci.yml` — the metric is
currently orphaned.

### Merge / dedup (mechanical, lower risk)

Each candidate was validated against the live gate state on 2026-06-17 (trust-but-verify);
several "obvious" merges turned out to hide debt and are **not** clean drop-ins.

- **`check:docs-sync` runs twice** — standalone in the `lint` job and again inside `check:docs-all` (`docs-sync-strict`) and the husky pre-commit hook. ✅ **DONE** — standalone `lint` invocation removed.
- **CVE scanning** — ❌ **NOT a clean merge.** `audit:deps` hard-fails on any high/critical CVE; `check:vuln-ratchet` (osv) only fails on a _regression_ vs baseline (currently 1 MODERATE). Different semantics — dropping `audit:deps` would lose the absolute high/critical gate. Keep both.
- **Cycle detection** — ❌ **NOT a clean merge.** `check:circular-deps` (dpdm) reports **91 cycles** (that is why it is advisory); it cannot be promoted to blocking without first resolving them, and it has a broader scope than the green, curated `check:cycles`. Keep `check:cycles` blocking; resolving the 91 dpdm cycles is its own backlog.
- **Complexity** — ✅ **DONE** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): one ESLint walk, counts by ruleId so cyclomatic+max-lines and cognitive baselines stay independent; individual `check:complexity` / `check:cognitive-complexity` remain for local `--update`.
- **`/api` anti-hallucination** — ✅ **DONE** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): one FS inventory of `src/app/api`, openapi-routes + docs-symbols still report independently; individuals remain for local runs.
- **`check:node-runtime` runs in 11 jobs** — ⚠️ **low ROI.** Each is a separate runner and the check is <1s; total savings ~10s, against losing a cheap per-job guard. Not worth the churn.
- **`typecheck:noimplicit:core` on CI lint** — ✅ **removed from lint job** (was advisory `continue-on-error`); blocking type surface is `typecheck:core` + `check:type-coverage`. Local script retained.

### Flip / decide (operator policy)

- `check:openapi-security-tiers` (advisory) — ❌ **NOT cleanly flippable.** It exits 0 but warns that several `traffic-inspector` routes under `LOCAL_ONLY_API_PREFIXES` lack the `x-loopback-only: true` annotation. Enforcing it requires adding those annotations to `openapi.yaml` first.
- `typecheck:noimplicit:core` (advisory) — largely subsumed by the blocking `check:type-coverage` ratchet. Flip to a ratchet or drop the redundant second `tsc` pass.
- `test:vitest:ui` (advisory, 14 parked fails) — fix-and-block or delete; don't leave rotting.
- `check:secrets` (gitleaks, blocking ratchet frozen at 3 documented false-positives) — allowlist the 3 to reach 0, or demote to advisory. Overlaps GitHub native secret-scanning + `check:public-creds`.
- `check:pr-evidence` (blocking, greps PR-body prose) — high false-positive risk; weakens Hard Rule #18 enforcement if dropped, so this is a genuine policy call.
- `semgrep` (advisory standalone) — overlaps CodeQL for the OWASP families; wire its baseline to a ratchet or drop.

---

## Related Documentation

- Supply-chain (provenance, SBOM, Trivy, Scorecard): [`docs/security/SUPPLY_CHAIN.md`](../security/SUPPLY_CHAIN.md)
