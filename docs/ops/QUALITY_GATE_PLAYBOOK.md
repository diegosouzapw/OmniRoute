---
title: "Quality Gate Playbook"
---

# Quality-Gate System — Critical Assessment, Catalog and Replication Playbook

> **What this document is.** A critical assessment of OmniRoute's quality-gate system,
> compared to industry best practices, **plus** a comprehensive catalog of all quality
> checkpoints and a **tool-agnostic replication plan** to apply the same system to
> any project. Generated on 2026-06-16 from the real repository state (not from memory).
>
> Benchmarks: OWASP DSOMM · OpenSSF Scorecard · SLSA · SonarQube "Clean as You Code" ·
> Quality-Ratchet pattern · DORA 2024 · OWASP LLM Top 10 (2025) · mutation-testing best practices.

---

## Part 1 — Verdict and Maturity Classification

**Overall grade: A− / "Advanced". Top ~5–10% of projects.** The system independently
implements several patterns that the industry explicitly names — which is the strongest
alignment signal (we didn't copy a checklist; we converged on the right practices).

| Reference framework                      | Where we stand                                                                                                                                                                                                                  | Grade                    |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| **OWASP DSOMM** (5 levels, 5 dimensions) | Solid Level 3, reaching 4 in _Test Intensity_ and _Static Depth_. Most orgs sit at 1–2.                                                                                                                                         | **L3→L4**                |
| **OpenSSF Scorecard** (18 checks)        | We pass CI-Tests, Code-Review, Dependency-Update-Tool, Fuzzing, SAST, Signed-Releases (provenance), Token-Permissions, Vulnerabilities, Dangerous-Workflow. **Gaps:** Branch-Protection on `main` OFF; some actions not pinned. | **~7–8/10**              |
| **SLSA** (4 levels)                      | `npm publish --provenance` + `id-token: write` + GitHub-hosted build = **L2**, approaching L3. Missing hardened/hermetic builder for L3+.                                                                                       | **L2→L3**                |
| **SonarQube "Clean as You Code"**        | Identical philosophy: the ratchet gates _non-regression_ (new code doesn't worsen the metric). **Divergence:** Sonar recommends **few** conditions; we have ~46 gates (fatigue risk).                                           | **Aligned, with caveat** |
| **Quality-Ratchet pattern**              | Reference implementation: ratchet + `dedicatedGate` + `tightenSlack` + `--require-tighten` + graceful-skip. More sophisticated than most public examples.                                                                       | **Exemplary**            |
| **DORA 2024**                            | Very strong on _stability_ axis. Risk: heavy gates can cost _lead time_ — mitigated by fast-gates split, but with coverage gap (see Part 2).                                                                                    | **Strong (stability)**   |
| **OWASP LLM Top 10 (2025)**              | We cover risk #1 (prompt-injection) with runtime guard + promptfoo (eval) + garak (red-team). Standard industry tools.                                                                                                          | **Covered**              |
| **Mutation testing**                     | Stryker nightly, thresholds 70/50, 8 critical modules. Industry consensus (60% existing / 80% new, nightly) — **we beat it**. **Gap:** score is not yet a ratchet.                                                              | **Almost there**         |

---

## Part 2 — Critical Assessment (strengths + honest weaknesses)

### Strengths (what's above average)

1. **Multi-metric ratchet engine.** The heart of the system. 24 metrics in `quality-baseline.json`
   - 4 dedicated baselines, each with direction (`up`/`down`), tolerance (`eps`), slack
     (`tightenSlack`) and `dedicatedGate` flag. Things that get fixed **stay** fixed — it's the
     antidote to codebase entropy.
2. **Defense-in-depth for supply-chain.** SAST (CodeQL/Sonar) + secrets (gitleaks with
   `useDefault`) + SCA (osv/npm-audit/Trivy/Dependabot) + licenses + lockfile + SBOM + SLSA
   provenance + Scorecard + workflow hardening (zizmor). Few codebases have this complete stack.
3. **Antidotes against Goodhart's Law.** Coverage as a target is a classic anti-pattern
   ("when the measure becomes the target, it ceases to be a good measure"). We have the
   counterweights: **mutation testing** (measures whether the test catches the bug, not just
   whether it executes the line), **`check-test-masking`** (blocks weakening asserts to pass),
   **per-module coverage floors** (forces testing HIGH-risk code, not just the easy parts) and
   **`check-pr-evidence`** (Hard Rule #18).
4. **Anti-hallucination / consistency gates.** A rare and valuable category: `check-known-symbols`,
   `check-fetch-targets`, `check-openapi-routes`, `check-docs-symbols` ensure that docs, specs and
   string dispatches point to living symbols. Catches "rot" that lint/test don't.
5. **Advisory→blocking lifecycle.** New gates enter as advisory (don't block merges while
   maturing), then become blocking at cycle end. Reduces friction without losing the ceiling.
6. **Graceful skip when infra is missing.** Scanners (`--ratchet`) exit `exit 0` if the binary/network
   fails — missing infra never blocks a legitimate PR. Mature engineering.
7. **Codified culture.** Hard Rules + `trust-but-verify` + stale-allowlist + evidence-gate
   turn discipline into automated verification.

### Honest weaknesses (real gaps)

1. **🔴 The fast-gates split is a structural hole.** `quality.yml` (PR→`release/**`) runs **only
   filesystem gates** — no typecheck, no tests, no build, no coverage. A typecheck/test regression
   passes in a release PR and only blows up on the forward-merge to `main`. The motivation
   (speed) is valid, but the gate should be where the merge happens (shift-left). **Largest
   pending structural fix.**
2. **🟠 Gate sprawl/fatigue risk.** ~46 gates + 25 jobs is A LOT. Sonar itself warns:
   too many conditions cause "gate fatigue" and priority debates, with risk of a gate being
   ignored. DORA warns that heavy gates cost lead-time. We mitigate with advisory tiers and
   non-absolute ratchets, but a **periodic ROI review per gate** is missing (some micro-gates for
   doc-sync are consolidatable).
3. **🟠 Mutation score is not yet a ratchet.** The strongest antidote against coverage-gaming is
   **advisory**. It's the highest-value pending item (and already 90% built).
4. **🟡 Advisories that should block (with the right scope).** `osv` (vulnCount) and `oasdiff` are
   advisory despite frozen baselines. osv-advisory makes sense (a new CVE on an old dep would block
   an unrelated PR) — but there's a middle ground (block only CRITICAL+fixable, as we did with
   Trivy). oasdiff advisory means a contract-breaking change can pass.
5. **🟡 Runtime security is nightly-only.** schemathesis/garak/promptfoo/chaos/k6 run at night.
   Correct decision (slow, need a live server), but a PR can introduce an injection-guard regression
   that only gets caught the following night.
6. **🟡 Branch-protection on `main` is OFF.** `BRANCH_LOCK_TOKEN` locks _release_ branches, but
   `main` itself is unprotected. Scorecard/DSOMM ding. Owner action required.
7. **🟡 CodeQL default-setup; semgrep not codified.** default-setup works (0 alerts), but a
   committed `codeql.yml` gives more control; semgrep runs via an external cloud platform, not
   versioned in the repo.

---

## Part 3 — Complete Catalog of Quality Checkpoints (portable)

The 12 categories below are the "quality system" in reusable form. Each lists the
**objective** (what to protect), the **tools we use** and the **tool-agnostic equivalent**
to replicate on any stack.

### 1. Style & formatting (deterministic, fast)

- **OmniRoute:** Prettier + ESLint via lint-staged (pre-commit), 2-spaces/double-quotes/100col.
- **Generic:** one auto-fixable formatter + one linter, running in pre-commit on staged files.

### 2. Types

- **OmniRoute:** `typecheck:core` (blocking) + `typecheck:noimplicit:core` (advisory) + `type-coverage` ratchet 92.17% + per-file any-budget.
- **Generic:** strict typecheck in CI + ratcheted type-coverage metric + per-file `any`/escape-hatch budget.

### 3. Tests (intensity)

- **OmniRoute:** 2 non-overlapping runners (Node native + vitest), 8 shards, global coverage 60/60/60/60 + ratchet ~76% + **8 per-module floors for critical modules** + nightly property tests + **mutation testing** nightly.
- **Generic:** test runner(s) + **absolute** coverage floor (anti-zero) + coverage **ratchet** (anti-regression) + **per-module floors for high-risk code** (anti-Goodhart) + property-based for pure logic + **mutation testing** nightly as the real measure of test quality.

### 4. Test policy (anti-gaming)

- **OmniRoute:** `pr-test-policy` (prod code requires a test), `check-test-masking` (blocks weakened asserts), `pr-evidence` (success claim requires evidence block), `test-discovery` (every test collected by a runner).
- **Generic:** "new code ⇒ new test" gate + assert-removed/tautology detector + evidence requirement (TDD or living test) + guarantee that no test is orphaned outside the globs.

### 5. Complexity & code health (ratchets)

- **OmniRoute:** ESLint-warnings (3769↓), jscpd duplication (5.72%↓), cyclomatic+max-lines complexity (1800↓), cognitive complexity sonarjs (753↓), dead-code/unused-exports knip (339↓), per-file file-size (frozen, shrink-only), circular-deps (custom Tarjan, blocking).
- **Generic:** ratchet every health metric (warnings, duplication, cyclomatic **and** cognitive complexity, dead code, file size, import cycles). Direction always "don't regress".

### 6. Static security (SAST + secrets)

- **OmniRoute:** CodeQL (ratchet alerts = 0), gitleaks (`[extend] useDefault=true` — critical!), SonarQube, custom security rules (public-creds, error-helper, route-guard-membership, route-validation).
- **Generic:** SAST (CodeQL/Sonar/semgrep) with alert ratchet + secrets scanner with **inherited default ruleset** (custom config that overrides the default = blind) + project-specific Hard Rule security gates.

### 7. Supply-chain (dependencies)

- **OmniRoute:** osv-scanner + npm-audit + Trivy + Dependabot (SCA), license-checker (SPDX allowlist), lockfile-lint (HTTPS+sha512+registry), `check-deps` anti-slopsquatting (allowlist + age ≥72h).
- **Generic:** multi-source SCA + license allowlist + lockfile integrity check + dependency allowlist with age/typosquatting check + grouped update bot.

### 8. Supply-chain (build & release)

- **OmniRoute:** SBOM (CycloneDX + syft), SLSA provenance (`--provenance`), OpenSSF Scorecard (weekly), workflow hardening (zizmor: artipacked→`persist-credentials:false`, cache-poisoning, token-permissions).
- **Generic:** generate SBOM on publish + signed provenance (SLSA L2+) + scheduled Scorecard + harden all workflows (minimum-privilege tokens, no persisted credentials on non-pusher checkout, actions pinned by SHA).

### 9. Contracts & API

- **OmniRoute:** oasdiff (breaking-change OpenAPI), schemathesis (contract fuzz nightly), openapi-coverage (% documented routes, ratchet 38.3%), openapi-security-tiers (spec vs route-guard).
- **Generic:** breaking-change contract diff (oasdiff/buf) + property-based fuzz against the spec (schemathesis) + ratcheted documentation coverage + spec↔code consistency.

### 10. Docs & i18n (anti-rot)

- **OmniRoute:** docs-sync (mirrored versions), docs-counts-sync (numbers in docs vs code), env-doc-sync, doc-links, fabricated-docs, cli-i18n, i18n-ui-coverage (`--threshold=65` + ratchet 80.1%).
- **Generic:** sync versions/counts/env-vars between docs and code (gate, not trust) + validate internal links + ratcheted i18n coverage.

### 11. Anti-hallucination / consistency (the rare category)

- **OmniRoute:** known-symbols (string dispatch ⇒ living symbol), provider-consistency, fetch-targets (client fetch ⇒ real route), docs-symbols, db-rules (Hard Rules #2/#5), migration-numbering.
- **Generic:** for every "duplicated source of truth" (registry, string dispatch, cross-layer references), a gate that proves both sides match. Catches the rot that typecheck/test don't.

### 12. Resilience & domain (product-specific)

- **OmniRoute:** chaos (fault-injection), heap-growth (leak), k6 (soak), promptfoo+garak (LLM red-team OWASP LLM Top 10), the 3 resilience laws (circuit-breaker/cooldown/lockout).
- **Generic:** identify the failure modes of **your** domain and have a gate (even if nightly) for each. For AI apps: injection red-team. For distributed systems: chaos + leak + soak.

---

## Part 4 — Replication Plan for Any Project

Build in **phases**, each delivering value on its own. Don't try all 12 categories at once —
that causes exactly the gate fatigue Part 2 warns about. Every new gate enters **advisory** and
becomes **blocking** when stable.

### The reusable centerpiece: the "anatomy of a ratchet gate"

The entire system revolves around this 3-file pattern. Copy it first:

1. **`baseline.json`** — the frozen metric value + `direction` (`up`/`down`) + `eps` (anti-flake) + `tightenSlack` + `dedicatedGate`.
2. **`collect-metrics.<ext>`** — runs the tool, extracts the number, writes `metrics.json`.
3. **`check-ratchet.<ext>`** — compares `metrics.json` vs `baseline.json`; `exit 1` **only** if regressed beyond `eps`; `exit 0` (graceful skip) if the tool/infra was missing; with `--require-tighten`, `exit 1` if it **improved** without updating the baseline (locks in the gain).

With this in place, **every** new metric (coverage, complexity, warnings, SAST alerts, bundle size, mutation score…) is just one line in the baseline.

### Phase 0 — Foundation (week 1)

CI exists; formatter + linter + typecheck + 1 test runner + **absolute** coverage floor
(e.g., 60%). Pre-commit runs fast auto-fixable checks. _Output: no PR breaks the basics._

### Phase 1 — The ratchet engine (week 2) — **the foundation of everything**

Implement the 3 files above. Freeze baselines for: warnings, coverage, complexity, duplication,
dead code, file size. _Output: the codebase can only improve from here._

### Phase 2 — Static depth (week 3)

SAST (CodeQL/Sonar/semgrep) with alert ratchet; secrets scanner (**inherit the default ruleset**);
SCA (osv/Dependabot) + license allowlist + lockfile-lint. _Output: known vulnerabilities and
leaked secrets don't pass._

### Phase 3 — Build supply-chain (week 4)

SBOM on publish + signed provenance (SLSA L2) + scheduled Scorecard + workflow hardening
(zizmor: minimum tokens, no persisted credentials, pinned actions). _Output: traceable and
tamper-proof releases._

### Phase 4 — Test intensity (week 5–6)

2nd runner if useful; **per-module coverage floors for critical modules** (anti-Goodhart);
property-based for pure logic; **mutation testing nightly** → when the 1st score arrives, make
`mutationScore` a ratchet. _Output: coverage stops being a vanity metric; tests provably catch bugs._

### Phase 5 — Contract & dynamic (week 7)

If there's a public API: oasdiff (breaking-change, **blocking**) + schemathesis (nightly fuzz).
DAST/red-team nightly as appropriate for the domain. _Output: contracts don't break silently._

### Phase 6 — Anti-hallucination & domain (week 8)

One consistency gate for each "duplicated truth" in the project. Domain-specific failure-mode
gates (for AI: injection red-team). _Output: structural rot and domain failures have a safety net._

### Phase 7 — Governance (ongoing)

- Advisory→blocking cycle for every new gate.
- `stale-allowlist`: every suppression has a justification + issue; obsolete suppression is caught.
- `evidence-gate`: success claim in a PR requires proof (test or living test).
- **Quarterly ROI review per gate** (kill/defund those that don't pay back — fights fatigue).
- Promote your project's Hard Rules into executable gates.

### Cross-cutting principles (non-negotiable)

- **Ratchet, not absolute.** Gate _non-regression_, not a fixed number (except anti-zero floors).
- **Absolute floor + ratchet together.** The floor prevents collapse; the ratchet prevents slow erosion.
- **Anti-Goodhart by design.** Every target metric needs a counterweight (coverage ⇒ mutation + anti-masking; per-module floors to force testing the hard code).
- **Graceful skip.** Missing infra never blocks; only real regression blocks.
- **`dedicatedGate` for expensive metrics.** Metrics that need an external binary get their own script (with skip), outside the synchronous central ratchet.
- **Gate where the merge happens.** Don't leave a gap between the fast gate and the actual merge (the lesson from the fast-gates split).
- **Few blocking gates, well-chosen.** Sonar/DORA: too many conditions = fatigue. Prefer advisory + ratchet over a wall of blocking gates.

---

## Part 5 — Recommended improvements (prioritized, compatible)

**P0 — highest ROI, almost ready**

1. **Mutation score ratchet** (after the 1st nightly Stryker produces values). Key antidote against coverage-Goodhart; ~90% done.
2. **Close the fast-gates hole** — add typecheck + impacted tests to `quality.yml` (PR→release).
3. **Branch-protection on `main`** (owner setting) — boosts Scorecard, closes the DSOMM gap.

**P1 — valuable** 4. **osv/oasdiff → blocking with the right scope** — osv only CRITICAL+fixable (two-step like Trivy); oasdiff blocks breaking-changes. 5. **`require-tighten` → blocking** (end of cycle) — locks in metric gains. 6. **ROI/timing review per-gate** in `ci-summary` — find and prune slow/low-value gates.

**P2 — diminishing returns** 7. **SLSA L3** — hermetic/reproducible builder (GitHub SLSA generator) if you want to move up from L2. 8. **Committed CodeQL config + versioned semgrep** — more control/reproducibility. 9. **Per-PR DAST smoke** — fast subset of schemathesis/promptfoo on highest-risk endpoints (not just nightly). 10. **Flakiness dashboard + DORA metrics** — ensure gates aren't eroding speed.

---

## Part 6 — Concrete release lessons (gates to add in Phase 9)

> This section records real incidents from release closures where a gate **was missing**,
> with concrete evidence and the proposed gate. Each item is a candidate for Part 5.

### Lesson v3.8.27 (2026-06-17) — the "fast-gates hole" lets deterministic regressions reach release day

**What happened.** During the v3.8.27 `/generate-release`, the release PR (`release/v3.8.27` → `main`)
was the **first** execution of the full `ci.yml` matrix in the integrated cycle. Result: 12 failures
at once — **3 deterministic tests** + ~9 flakes/env. None were live product regressions, but
all went unnoticed because cycle PRs enter `release/**` via the **Fast QG
(`quality.yml`)**, which does NOT run the full unit suite, nor `pr-test-policy` (test-masking), nor the
full integration suite, nor schema parity checking. The 3 deterministic ones:

1. **Test outdated by UI change** — `permissions modal switch buttons declare button type`:
   #4034 added a 4th switch (a11y `type="button"` maintained); the test's `=== 3` count became
   outdated. Static analysis should have caught this in the #4034 PR.
2. **Test outdated by packaging change** — `findMissingArtifactPaths ... root runtime files`:
   `dist/http-method-guard.cjs` became a legitimate required-path; the test's expected list became
   outdated.
3. **Lossy modularization divergence (most serious)** — `settings schemas accept ... unprefixed
toggle`: the **modularized** `updateSettingsSchema` (`schemas/settings.ts`, created by #3988) diverged
   from the canonical one (`settingsSchemas.ts`): **45 fields vs 85 — 40 dropped + 6 divergent (qdrant\*)**. It was
   **dead-code** (runtime uses the canonical one), so no live impact, but only a hand-written parity
   test caught it. #4030 restored 16 analogous drops from #3988/#3993, but this one slipped through.

**Proposed gates (Phase 9):**

- **G1 — Actually close the fast-gates hole (extends P0 #2).** In `quality.yml` (PR→`release/**`),
  beyond typecheck + impacted tests, run **`pr-test-policy` (test-masking) + the full deterministic
  unit suite** (or at least the static/parity files, which are fast and non-flaky).
  This way, outdated tests and assert removal are caught in the PR that introduces them — not on
  release day. Keep integration/e2e out (slow/flaky), but the deterministic layer CANNOT stay only
  in PR→main.
- **G2 — Modularization parity gate (NEW, not covered today).** A check that, for each symbol
  re-exported by a modularized barrel (`src/shared/validation/schemas/*`, `providerRegistry`
  modules, etc.), compares the **shape** (`z.object` keys, registry entries) against the canonical
  source and **fails on divergence** (dropped/extra field). Would have caught the 40-field drop from
  #3988 in that very PR. Generalizes the hand-written parity tests (which only exist where someone
  remembered to write them). Cheap: imports both and diffs `Object.keys(shape)`.
- **G3 — Deterministic flake triage (support).** LiveWS-startup and the integration-combo/breaker
  tests fail due to server timeout/cascade in CI (env), not logic. Mark these as
  `known-flaky` (quarantined with issue) so the release-PR red is **only real signals**, not noise
  masking deterministic regressions in the middle.

**Principle:** _the gate has to run where the merge happens_ (already in "Cross-cutting principles"). The
v3.8.27 incident shows this also applies to the **deterministic test layer**, not just lint/typecheck —
otherwise the debt of outdated tests + lossy modularization only appears in PR→main, in batch, at
the worst moment.

---

## Sources (industry best practices)

- OWASP DevSecOps Maturity Model (DSOMM) — https://dsomm.owasp.org/about
- OpenSSF Scorecard / SLSA — https://openssf.org · https://slsa.dev
- SonarQube "Clean as You Code" — https://docs.sonarsource.com/sonarqube-server/latest/user-guide/clean-as-you-code
- Quality Ratchets (LeadDev) — https://leaddev.com/software-quality/introducing-quality-ratchets-tool-managing-complex-systems
- Continuous Code Improvement Using Ratcheting (Greiner) — https://robertgreiner.com/continuous-code-improvement-using-ratcheting/
- DORA 2024 State of DevOps — https://cloud.google.com/blog/products/devops-sre/announcing-the-2024-dora-report
- Mutation testing best practices (Stryker) — https://stryker-mutator.io
- Coverage as anti-pattern (Goodhart) — https://www.industriallogic.com/blog/code-coverage-complications/
- OWASP Top 10 for LLM Applications (2025) — https://owasp.org/www-project-top-10-for-large-language-model-applications/
- Contract testing (oasdiff/schemathesis) — https://www.oasdiff.com · https://schemathesis.readthedocs.io
