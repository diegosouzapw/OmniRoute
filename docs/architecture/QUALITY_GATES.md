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

### Job: `lint`

Runs on every PR to `main`. Blocks merge on failure.

| Script (`npm run ...`)         | Validates                                                                                                                                                          | Blocking                                 |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------- |
| `check:node-runtime`           | Node.js version is within the supported range                                                                                                                      | Yes                                      |
| `check:cycles`                 | Circular imports — all `src/` + `open-sse/` modules                                                                                                                | Yes                                      |
| `check:route-validation:t06`   | Zod schemas present on all routes (Tier 6 policy)                                                                                                                  | Yes                                      |
| `check:any-budget:t11`         | `@ts-expect-error // any` count does not exceed budget (Tier 11 catraca)                                                                                           | Yes                                      |
| `check:provider-consistency`   | Every provider in `providers.ts` has a matching entry in `providerRegistry.ts` (and vice-versa, within the allowlist)                                              | Yes                                      |
| `check:fetch-targets`          | Every `fetch("/api/...")` in client-side `src/` resolves to a real `route.ts`                                                                                      | Yes                                      |
| `check:deps`                   | All `npm install`-able deps across every `package.json` in the repo are in `dependency-allowlist.json`; new unpinned or slopsquatted packages flagged              | Yes                                      |
| `audit:deps`                   | `npm audit` (root + electron) — no high/critical advisories (overlaps osv `check:vuln-ratchet`; see Rationalization Backlog)                                       | Yes                                      |
| `check:lockfile`               | `package-lock.json` integrity — https registry, integrity hashes, no host overrides                                                                                | Yes                                      |
| `check:licenses`               | SPDX license allowlist for production dependencies                                                                                                                 | Yes                                      |
| `check:tracked-artifacts`      | No build artifacts / committed `node_modules` symlinks (also runs in husky pre-push)                                                                               | Yes                                      |
| `check:file-size`              | No source file exceeds the per-extension cap (ratchet: frozen large files in `frozen` list)                                                                        | Yes                                      |
| `check:error-helper`           | Error responses in executors/handlers use `buildErrorBody()` / `sanitizeErrorMessage()` (Hard Rule #12)                                                            | Yes                                      |
| `check:migration-numbering`    | Migration SQL files are sequentially numbered, no gaps or duplicates                                                                                               | Yes                                      |
| `check:public-creds`           | No literal OAuth `client_id`/`client_secret` or Firebase Web keys outside `publicCreds.ts` (Hard Rule #11)                                                         | Yes                                      |
| `check:db-rules`               | No raw SQL outside `src/lib/db/` modules; no barrel-imports from `localDb.ts` (Hard Rules #2/#5)                                                                   | Yes                                      |
| `check:known-symbols`          | Provider executors, routing strategies, and translators registered in their dispatch tables match the files on disk — no orphaned or undeclared symbols            | Yes                                      |
| `check:route-guard-membership` | Every route that spawns a child process is classified by `isLocalOnlyPath()` (Hard Rules #15/#17)                                                                  | Yes                                      |
| `check:test-discovery`         | Every `*.test.ts` / `*.spec.ts` file in the repo is collected by at least one test runner (ratchet: orphan list in `test-discovery-baseline.json` can only shrink) | Yes                                      |
| `check:docs-sync`              | CHANGELOG version, OpenAPI version, and `llm.txt` are in sync                                                                                                      | Yes                                      |
| `typecheck:core`               | TypeScript compilation without errors (advisory warnings only)                                                                                                     | Yes                                      |
| `typecheck:noimplicit:core`    | Strict `noImplicitAny` — forward-looking; many pre-existing call sites still need annotations                                                                      | **Advisory** (`continue-on-error: true`) |

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

| Script                            | Validates                     | Blocking |
| --------------------------------- | ----------------------------- | -------- |
| `check-ui-keys-coverage` (inline) | UI i18n key coverage is ≥ 65% | Yes      |

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
- **Complexity** — ⏳ valid but real surgery. `check:complexity` (core ESLint) + `check:cognitive-complexity` (sonarjs) are two ESLint passes over `src` + `open-sse`; merging into one config emitting both metrics needs careful ratchet re-wiring. Deferred.
- **`/api` anti-hallucination** — ⏳ valid but script surgery. `check:openapi-routes` (spec→route) + `check:docs-symbols` (prose→route) share resolution logic; collapsing them is a non-trivial script change. Deferred.
- **`check:node-runtime` runs in 11 jobs** — ⚠️ **low ROI.** Each is a separate runner and the check is <1s; total savings ~10s, against losing a cheap per-job guard. Not worth the churn.

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
