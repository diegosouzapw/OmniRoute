---
title: "Quality-Gate Maturity Re-evaluation (Fase 9)"
---

# Maturity Re-evaluation — post-Waves 0–3 (Quality-Gate v2)

> **What this document is.** A re-measurement of the quality-gates system maturity
> **after** Waves 0–3 of the Quality-Gate v2 program, compared to the baseline recorded in
> [`QUALITY_GATE_PLAYBOOK.md`](./QUALITY_GATE_PLAYBOOK.md) (2026-06-16). Measures what changed,
> against DSOMM L5 / OpenSSF Scorecard 9 / SLSA L3, separating what is **CI-measurable**
> (already delivered / deliverable by code) from what is **process/owner** (organization settings).
>
> **Date:** 2026-06-30. Generated from the actual state of the repository, not from memory.
> **Benchmarks:** OWASP DSOMM · OpenSSF Scorecard · SLSA · SonarQube "Clean as You Code".

---

## 1. Updated verdict

**Overall grade: A− → A ("Advanced", top ~5%).** The **two biggest structural weaknesses**
of the 06-16 baseline — the _fast-gates gap_ and the _mutation-score-not-a-ratchet_ — have been **closed**.
The residual gaps for "absolute maximum" are almost all **owner/infra-gated** (branch-protection,
SLSA L3, CodeQL advanced); the code side of the program is essentially complete.

| Reference framework               | Baseline 06-16                 | Now 06-30                                                         | Movement | Evidence                                                              |
| --------------------------------- | ------------------------------ | ----------------------------------------------------------------- | -------- | --------------------------------------------------------------------- |
| **OWASP DSOMM** (5 levels)        | L3→L4                          | **L4** in _Test Intensity_ and _Static Depth_; solid L3 in others | ▲        | blocking mutation-ratchet + deterministic suite at merge gate         |
| **OpenSSF Scorecard**             | ~7–8/10                        | ~7–8/10 (unchanged — gate is the **owner**)                       | =        | missing Branch-Protection on `main` (owner setting) + actions pinning |
| **SLSA**                          | L2→L3                          | **L2** (approaching L3)                                           | =        | missing hermetic/reproducible builder (infra/owner)                   |
| **SonarQube "Clean as You Code"** | Aligned with caveat            | Aligned with caveat                                               | =        | _sprawl_ caveat (~46+ gates) persists — ROI review pending            |
| **Quality-Ratchet pattern**       | Exemplar                       | **Exemplar+**                                                     | ▲        | new `dedicatedGate` for `mutationScore` (direction up)                |
| **Mutation testing**              | "Almost there" (not a ratchet) | **Active ratchet**                                                | ▲▲       | `check-mutation-ratchet.mjs` + seeded baseline + blocking nightly job |

---

## 2. Deltas since 2026-06-16 (what Waves 0–3 delivered)

### 2.1 🔴→✅ Fast-gates gap CLOSED (was structural weakness #1)

The baseline warned: `quality.yml` (PR→`release/**`) ran **only filesystem gates** — no
typecheck, tests, or build —, so deterministic regressions only exploded on PR→`main`.
**Today** `.github/workflows/quality.yml` runs, in the _Fast Quality Gates_ job: `typecheck:core`,
**blocking impacted unit tests (TIA) with fail-safe to the full suite**, the
vitest fast-path, and unit shards. The gate now runs **where the merge happens** (shift-left),
exactly the cross-cutting principle the playbook prescribes.

### 2.2 🟠→✅ Mutation score became a RATCHET (was weakness #3 / P0 #1)

The strongest antidote against coverage-gaming was **advisory**. **Today**:

- `scripts/check/check-mutation-ratchet.mjs` (advisory by default, `--ratchet` blocking, graceful skip);
- `config/quality/quality-baseline.json` has seeded `mutationScore.<module>` entries (`direction: up`, `dedicatedGate`);
- `.github/workflows/nightly-mutation.yml` has the **"Mutation score ratchet (blocking)"** job that unifies batch reports and ratchets merged per-module scores.

Result: the per-module mutation score **cannot regress** — coverage has ceased to be a vanity metric.

### 2.3 ✅ Quick-win gates (Phase 6A/7) delivered

- **a11y axe-core "fake-green" fixed:** `@axe-core/playwright` in devDeps; `a11y.spec.ts` with conditional `REQUIRE_AXE` skip; job in `nightly-resilience.yml`.
- **complexity scans `bin/`+`electron`:** `check-complexity.mjs` includes those directories in `ESLINT_ARGS`.
- **tracked-artifacts in pre-commit + pre-push:** `.husky/pre-commit` + `pre-push` block accidentally tracked artifacts.

---

## 3. The 12 categories — status (delta-focused)

| #   | Category                         | Status 06-30                                                                             |
| --- | -------------------------------- | ---------------------------------------------------------------------------------------- |
| 1   | Style & formatting               | ✅ unchanged (Prettier+ESLint lint-staged)                                               |
| 2   | Types                            | ✅ **reinforced** — `typecheck:core` now also in the PR→release gate                     |
| 3   | Tests (intensity)                | ✅ **reinforced** — mutation testing became a ratchet; deterministic suite at merge gate |
| 4   | Test policy (anti-gaming)        | ✅ unchanged (pr-test-policy/test-masking/pr-evidence)                                   |
| 5   | Complexity & health              | ✅ **reinforced** — complexity scans bin/electron                                        |
| 6   | Static security (SAST+secrets)   | 🟡 CodeQL default-setup (advanced = owner); semgrep cloud not versioned                  |
| 7   | Supply-chain (deps)              | ✅ unchanged (osv/audit/Trivy/Dependabot + allowlist)                                    |
| 8   | Supply-chain (build/release)     | 🟡 SLSA L2 (L3 = hermetic builder, owner/infra)                                          |
| 9   | Contracts & API                  | 🟡 oasdiff/osv advisory (candidates for blocking-with-scope, P1)                         |
| 10  | Docs & i18n (anti-rot)           | ✅ **reinforced** — `fabricated-docs --strict` blocking (exit 0 verified)                |
| 11  | Anti-hallucination / consistency | ✅ unchanged (known-symbols/fetch-targets/docs-symbols/db-rules)                         |
| 12  | Resilience & domain              | ✅ unchanged (chaos/heap/k6/promptfoo/garak nightly)                                     |

---

## 4. Residual gaps for "absolute maximum"

### 4.1 CI-measurable / deliverable by code (this program's backlog)

- **P1 — osv/oasdiff → blocking with the right scope:** osv only `CRITICAL`+fixable (two-step like Trivy); oasdiff blocks contract-breaking changes.
- **P1 — `require-tighten` blocking (end of cycle):** locks metric gains (prevents loosening the baseline without recording).
- **P1/P2 — ROI review / gate sprawl:** consolidate doc-sync micro-gates; measure per-gate timing in `ci-summary` (combats fatigue — SonarQube/DORA caveat). Deferred ROI merges (unified complexity; unified `/api` anti-hallucination) fall here.
- **P2 — CodeQL config committed + semgrep versioned:** more control/reproducibility.

### 4.2 Process / owner (CI cannot move — organization settings)

- **Branch-protection on `main`** (raises Scorecard, closes the DSOMM gap). See [`BRANCH_PROTECTION_MAIN.md`](./BRANCH_PROTECTION_MAIN.md).
- **CodeQL Default → Advanced setup.**
- **SLSA L3** — hermetic/reproducible builder (GitHub SLSA generator). Stretch (diminishing returns).

### 4.3 Explicitly out of scope

- **DSOMM L5** is largely **org-level / process** (not CI-encodable).
- **SLSA L4** (bit-for-bit reproducibility) is a declared stretch goal.

---

## 5. Deferred / removed items (tail housekeeping)

- **`semcheck.yaml` (LLM layer for semantic drift docs↔code) — REMOVED.** It was **orphaned**
  (no workflow/script invoked it) and had stale counts in the rules. Deterministic coverage
  already exists (`check:fabricated-docs --strict` + `check:docs-counts-sync` + `check:docs-symbols`),
  and the _gate sprawl_ caveat discourages adding an LLM advisory gate with recurring cost.
  It may be re-introduced in the future as an opt-in nightly job if semantic drift becomes a real problem.
- **`agent-lsp` scaffold — DEFERRED / opt-in not enabled.** Exists as a mention in docs
  (`docs/architecture/QUALITY_GATES.md`, CHANGELOG) but **without wiring** and without `.mcp.json.example`
  in the repo. Remains as a documented opt-in scaffold; it is not an active gate nor a maturity gap.
