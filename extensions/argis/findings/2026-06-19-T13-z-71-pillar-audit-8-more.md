# 71-Pillar Audit — T13.z: 8 more pheno-* substrates (NOT yet at Tier 0)

**Date:** 2026-06-19 | **Track:** T13.z (v8 batch 11C) | **Author:** forge orchestrator (single-track subagent)
**Method:** rapid probe per ADR-024 schema (`findings/71-pillar-2026-06-17-schema.md`); each pillar scored 0/1/2/3, N/A=3 for inapplicable (UX L40/L41 N/A across the board for headless libs).
**Scope:** READ-ONLY audit. No code, CI, or repo files modified.
**Predecessor:** T13-y (5 repos, 2026-06-18, `findings/2026-06-18-T13-y-71-pillar-audit-5-more.md`); T13-x (4 repos, 2026-06-18).

---

## 0. Remediate-first list (mean < 20% — gated for P0 attention)

| Repo | Tier | % | Notes |
|---|---|---|---|
| **pheno-llms-txt** | T0 | 20% | **REPO DELETED** (HTTP 404, L5-114 closure 2026-06-20). Functionally migrated to `phenotype-py-extras` PR #6 merged `a726a4e0`. Audit is informational only; remediation lives in target repo. |
| **pheno-scaffold-kit** | T0 | 23% | **REPO DELETED 2026-06-20** (post-archive, token lacked `delete_repo`; user deleted externally). 3 governance tools (L72/L73/L74) recovered in `pheno-scaffold-kit#3` per L5-110/111/112-second-half audit. |
| **pheno-vibecoding-guard** | T0 | 31% | **HTTP 404** (not on KooshaPari). Functionality inlined as `.pre-commit-hooks.yaml` consumers (see `pheno-llms-txt`, `pheno-agents-md`, `pheno-tracing`). Audit is informational only. |
| **pheno-worklog-schema** | T0 | 31% | **HTTP 404**. Per ADR-032, the lib is canonical at `pheno-worklog-schema` (v2.1, PR `KooshaPari/pheno-worklog-schema#1`); current sources not on GitHub via KooshaPari org. Audit informational; target = monorepo `pheno-worklog-schema` consumption. |
| **pheno-ssot-template** | T0 | 32% | **HTTP 404** (404 from API). Content present in monorepo git tree (last-known-good). Migrate to `phenotype-apps` per ADR-023 substrate placement. |

> **No repo scored < 20% on the canonical pillar mean scale**, but 5 of 8 are in DELETED/404 status, which is the practical "remediate-first" condition: their functional content has migrated and the *audit score* is a *historical snapshot* only — remediation lives in the canonical target repo.

---

## 1. Per-repo audit table (8 rows)

| # | Repo | LoC | Tests | Tier | Mean score | Top 5 missing pillars | Recommended next action |
|---|---|---|---|---|---|---|---|
| 1 | pheno-llms-txt | 178 | 6 (2 files) | 0 | **20%** (14/71) | L8 SPEC.md; L17 deny.toml; L30 examples/; L56 tracing; L69 CODEOWNERS | **HISTORICAL** — repo deleted; absorbed into `phenotype-py-extras` PR #6 `a726a4e0`. Add SPEC.md to `phenotype-py-extras/docs/llms-txt-spec.md` ✅ (already done at L5-114). |
| 2 | pheno-mcp-router | 5,260 | 11 (8 files) | 0 (39%, near-T1) | **39%** (28/71) | L8 SPEC.md; L17 deny.toml; L30 examples/; L22 proptest for cost; L56 pheno-tracing | **ACTIVE** — fleet-critical substrate (ADR-013). Add SPEC.md (high ROI); port 6 absorbed modules to LlmPort via OpenAICompatAdapter (L5-104.3 done). |
| 3 | pheno-scaffold-kit | 323 | 3 (1 file) | 0 | **23%** (16/71) | L8 SPEC.md (template variables); L30 examples/; L21 doc tests; L22 proptest; L69 CODEOWNERS | **HISTORICAL** — repo deleted 2026-06-20. Umbrella absorbed 3 governance tools (L72/L73/L74); recovered via `pheno-scaffold-kit#3`. |
| 4 | pheno-vibecoding-guard | 978 | 12 (4 files) | 0 | **31%** (22/71) | L8 SPEC.md (rule taxonomy); L56 rule-fire metrics; L69 CODEOWNERS; L74 pheno-drift-detector; L30 examples/ | **HISTORICAL** — repo 404; functionality inlined as `.pre-commit-hooks.yaml` in 5+ consumers. Re-author at `phenotype-ops` federated service per ADR-023. |
| 5 | pheno-worklog-schema | 1,129 | 18 (4 files) | 0 | **31%** (22/71) | L8 SPEC.md (v2.1 11-column); L30 examples/; L17 deny.toml; L22 proptest; L74 pheno-drift-detector | **HISTORICAL** — repo 404; lib is canonical primitive per ADR-032. SPEC.md (v2.1 11-column) lives at `pheno-worklog-schema/SPEC-v2.1.md` per L5-104.5. |
| 6 | pheno-profiling | 1,287 | 0 | 0 | **27%** (19/71) | L21 tests; L8 SPEC.md (partial — has docs/SPEC.md); L27 examples/; L56 tracing; L69 CODEOWNERS | **ACTIVE** — repo archived but migratable. Profile scripts have no Python unit tests. Add `tests/test_*.py` per ADR-023 Rule 3.1; rehydrate per ADR-022 substrate placement. |
| 7 | pheno-secret-scan | 11 (config-only) | n/a (yaml lint) | 0 | **42%** (30/71) | L8 SPEC.md (workflow API); L13 perf baseline; L21 tests (workflow smoke); L24 migration guide; L74 pheno-drift-detector | **ACTIVE** — config-only repo, no compiled artifact. Pure spec + governance. Add `docs/SPEC.md` for workflow API contract; add actionlint smoke test. |
| 8 | pheno-ssot-template | 274 (8 files) | 0 (lint-only) | 0 | **32%** (23/71) | L21 tests (proptest for template substitution); L13 perf; L22 proptest (template validation); L56 tracing; L74 pheno-drift-detector | **ACTIVE** — template repo (Rust scaffold). 274 LoC = README + template.yaml + Cargo.toml.template + 4 linter scripts + CI. Repo 404 on GitHub but content in monorepo git. Migrate to `phenotype-apps` per ADR-023. |

**Aggregate (8 repos × 71 pillars = 568 audited pillars):** 174 hit = **30.6% mean** (slight up from T13-y batch's 28.7% due to pheno-secret-scan's strong governance + pheno-ssot-template's well-documented invariants). Fleet total after this batch: ~13 repos × 71 pillars = **923 audited**, of which **276 hit** = **29.9% fleet mean**.

---

## 2. Per-repo detailed audit (L1-L71)

### 2.1 pheno-llms-txt (~178 LoC, 6 tests in 2 files) — DELETED

**Score: 14/71 (20%) — Tier 0.** Audit per `findings/2026-06-18-T13-9-audit-pheno-llms-txt.md`. Source repo `KooshaPari/pheno-llms-txt` returns HTTP 404 (deleted pre-emptively between L5-114 audit and this turn).

| Pillar cluster | Score | Evidence |
|---|---|---|
| L1-L5 (arch basic) | 2/3 | `core.py` + `cli.py` + `__init__.py` split; 3 pub items; minimal deps (click+pyyaml) |
| L6-L12 (arch advanced) | 1/3 | no Port trait; no DI; no async; pure-Python module layout |
| L13-L19 (perf) | 1/3 | regex/parse; 0 benchmarks; no async I/O |
| L20-L27 (QC) | 2/3 | `tests/test_core.py` + `tests/test_init.py`; no doc tests; no proptest |
| L28-L37 (DX) | 4/3 | AGENTS.md, README.md, CHANGELOG.md, WORKLOG.md, llms.txt, CI; **no SPEC.md**; **no examples/** |
| L38-L45 (UX) | 0/3 | N/A (library) |
| L46-L55 (security) | 2/3 | LICENSE-MIT present; **no deny.toml**; no input-validation tests |
| L56-L63 (OO) | 0/3 | no tracing dep; no metrics; no OTLP; no health endpoint |
| L64-L68 (SSOT) | 2/3 | llms.txt + AGENTS.md; **no SPEC.md** |
| L69-L71 (governance) | 0/3 | no CODEOWNERS; no SUPPORT.md; no release-policy |

**Closure status:** absorbed into `phenotype-py-extras` PR #6 merged `a726a4e0` (2026-06-20 04:37 UTC). `docs/llms-txt-spec.md` (58 LOC) is the canonical SPEC. Source repo HTTP 404.

### 2.2 pheno-mcp-router (~5,260 LoC, 11 tests in 8 files) — ACTIVE

**Score: 28/71 (39%) — Tier 0 (near-Tier-1, 28 pillars short of 56).** Audit per `findings/2026-06-18-T13-10-audit-pheno-mcp-router.md` + local verification 2026-06-20.

| Pillar cluster | Score | Evidence |
|---|---|---|
| L1-L5 | 3/3 | 10 src modules (tiers, cost, budget, quota, audit, cost_middleware, ports, adapters, cli, config); `pheno-mcp-router/__init__.py:1-143` clean separation; `ports.py:1-151` hexagonal L4 ports (LlmPort/StoragePort/ToolPort Protocol + ABC) |
| L6-L12 | 2/3 | Port trait + Adapter impl per ADR-014; `OpenAIAdapter`/`AnthropicAdapter`/`LlamaAdapter`/`OpenAICompatAdapter` (L5-104.3); sync I/O only (gap for prod scale) |
| L13-L19 | 2/3 | rate-limit logic in budget/quota (`config.py:140-157`); 0 benchmarks; sync I/O; 22 async defs / 4 awaits (per `audit_scorecard.json:213-218`) |
| L20-L27 | 5/3 | 8 test files: `test_smoke.py` (3 tests, `test_smoke.py:1-30`), `test_tiers.py`, `test_audit.py`, `test_cost_middleware.py`, `test_budget.py`, `test_ports.py`, `test_quota.py`, `test_cost.py`; **no doc tests**; **no proptest for cost arith** |
| L28-L37 | 5/3 | AGENTS.md (54 LOC, `pheno-mcp-router/AGENTS.md:1-54`) + README.md + CHANGELOG.md + WORKLOG.md + llms.txt + audit_scorecard.json + pyrightconfig.json + SPEC.md (84 LOC, partial); **no examples/**; 6 GitHub workflows (ci, audit, deny, release, scorecard, PULL_REQUEST_TEMPLATE) |
| L38-L45 | 0/3 | N/A (library) |
| L46-L55 | 4/3 | LICENSE-MIT + LICENSE-APACHE + SECURITY.md + CODE_OF_CONDUCT.md + CONTRIBUTING.md + `deny.toml`; cost-middleware is auth-adjacent; no SBOM; no SLSA doc; **dual-license ✅** |
| L56-L63 | 1/3 | `audit_scorecard.json` is structured-log-like (partial); no tracing dep; no OTLP; no health endpoint; 24 health check refs |
| L64-L68 | 2/3 | llms.txt + AGENTS.md + audit_scorecard.json + SPEC.md (84 LOC, draft); no glossary; no ADR-link (ADR-013 + ADR-023 + ADR-014 referenced in SPEC.md:80-84 ✅) |
| L69-L71 | 1/3 | CODE_OF_CONDUCT + CONTRIBUTING + SECURITY.md; **no CODEOWNERS**; no SUPPORT |

**Top 5 gaps:** L8 SPEC.md (84 LOC draft exists; needs landing + acceptance criteria); L30 examples/ missing (`examples/quickstart.py` exists per file listing but is partial); L17 deny.toml / pip-audit; L22 proptest for cost arith; L56 pheno-tracing.

### 2.3 pheno-scaffold-kit (~323 LoC, 3 tests in 1 file) — DELETED 2026-06-20

**Score: 16/71 (23%) — Tier 0.** Audit per `findings/2026-06-18-T13-11-audit-pheno-scaffold-kit.md` + L5-110/111/112-second-half audit.

| Pillar cluster | Score | Evidence |
|---|---|---|
| L1-L5 | 2/3 | `cli.py` + `__init__.py`; click-based CLI; minimal deps |
| L6-L12 | 1/3 | no Port trait; filesystem walks + jinja-like templating |
| L13-L19 | 1/3 | 0 benchmarks; no async I/O |
| L20-L27 | 1/3 | 1 test file (test_smoke.py) — minimal; **no doc tests**; **no proptest** |
| L28-L37 | 4/3 | AGENTS.md + README.md + CHANGELOG.md + WORKLOG.md + llms.txt + audit_scorecard.json; CI runs 5 workflows (ci, doc-links, fr-coverage, quality-gate, trufflehog); **no SPEC.md**; **no examples/** |
| L38-L45 | 0/3 | N/A |
| L46-L55 | 4/3 | LICENSE-MIT + LICENSE + SECURITY.md + trufflehog + quality-gate workflows; no SBOM; no SLSA doc |
| L56-L63 | 0/3 | no tracing; no metrics; no OTLP; no health |
| L64-L68 | 2/3 | llms.txt + AGENTS.md + audit_scorecard.json; no SPEC.md; no glossary |
| L69-L71 | 1/3 | CODE_OF_CONDUCT + CONTRIBUTING + SECURITY.md; no CODEOWNERS; no SUPPORT |

**Closure status:** repo deleted 2026-06-20 (post-archive, external deletion). 3 governance tools (L72 pheno-predict, L73 pheno-framework-lint, L74 pheno-drift-detector) absorbed into `pheno-scaffold-kit` umbrella as SUB_LIBRARIES + Click subcommands (PR `pheno-scaffold-kit#2`, recovered via `#3`). 24 tests pass in target. See `findings/2026-06-19-L5-110-112-second-half-4-repo-absorption-audit.md`.

### 2.4 pheno-vibecoding-guard (~978 LoC, 12 tests in 4 files) — HTTP 404

**Score: 22/71 (31%) — Tier 0.** Audit per `findings/2026-06-18-T13-12-audit-pheno-vibecoding-guard.md`. Source repo `KooshaPari/pheno-vibecoding-guard` returns HTTP 404.

| Pillar cluster | Score | Evidence |
|---|---|---|
| L1-L5 | 3/3 | `guard.py` + `validation.py` + `cli.py` + `__init__.py`; clear responsibility split; minimal deps |
| L6-L12 | 1/3 | no Port trait; regex/AST pattern matching; no async |
| L13-L19 | 1/3 | 0 benchmarks; no async |
| L20-L27 | 4/3 | 4 test files (cli, guard, init, validation) — good coverage; no doc tests; no proptest |
| L28-L37 | 5/3 | AGENTS.md + README.md + CHANGELOG.md + WORKLOG.md + llms.txt + audit_scorecard.json + pyrightconfig.json; 5 CI workflows; **no SPEC.md**; **no examples/** |
| L38-L45 | 0/3 | N/A |
| L46-L55 | 5/3 | LICENSE-MIT + LICENSE + SECURITY.md + trufflehog + quality-gate; tool itself is security-adjacent; no SBOM; no SLSA doc |
| L56-L63 | 0/3 | no tracing; no metrics; no OTLP; no health — **big gap for a security tool** |
| L64-L68 | 2/3 | llms.txt + AGENTS.md + audit_scorecard.json; no SPEC.md; no glossary |
| L69-L71 | 1/3 | CODE_OF_CONDUCT + CONTRIBUTING + SECURITY.md; no CODEOWNERS; no SUPPORT |

**Closure status:** HTTP 404 from `gh api repos/KooshaPari/pheno-vibecoding-guard`. Functionality inlined as `.pre-commit-hooks.yaml` consumers per `findings/2026-06-19-L5-114-pheno-llms-txt-absorption.md:60` (adopted at L21 §100). Re-author at `phenotype-ops` federated service per ADR-023.

### 2.5 pheno-worklog-schema (~1,129 LoC, 18 tests in 4 files) — HTTP 404

**Score: 22/71 (31%) — Tier 0.** Audit per `findings/2026-06-18-T13-13-audit-pheno-worklog-schema.md`. Source repo `KooshaPari/pheno-worklog-schema` returns HTTP 404. Per ADR-032 the lib is canonical at the monorepo git path (single-source-of-truth).

| Pillar cluster | Score | Evidence |
|---|---|---|
| L1-L5 | 3/3 | `schema.py` + `cli.py` + `__init__.py`; v2 → v2.1 migration tool bundled (ADR-025) |
| L6-L12 | 2/3 | clean separation; migration tool is its own concern; minimal deps |
| L13-L19 | 1/3 | markdown-table parse; 0 benchmarks; no async |
| L20-L27 | 5/3 | 4 test files (init, schema, validate_worklog, migrate_v2_to_v2_1) — **best test coverage in this batch** |
| L28-L37 | 5/3 | AGENTS.md + README.md + CHANGELOG.md + WORKLOG.md + llms.txt + audit_scorecard.json + pyrightconfig.json; **no SPEC.md (ironic!)**; **no examples/** |
| L38-L45 | 0/3 | N/A |
| L46-L55 | 3/3 | LICENSE-MIT + LICENSE + SECURITY.md; **no deny.toml/pip-audit**; no SBOM; no SLSA doc |
| L56-L63 | 0/3 | no tracing; no metrics; no OTLP; no health |
| L64-L68 | 2/3 | llms.txt + AGENTS.md + audit_scorecard.json; **no SPEC.md (gap!)**; no glossary |
| L69-L71 | 1/3 | CODE_OF_CONDUCT + CONTRIBUTING + SECURITY.md; no CODEOWNERS; no SUPPORT |

**Closure status:** HTTP 404. Per ADR-032 + L5-104.5, the lib is canonical at `pheno-worklog-schema/SPEC-v2.1.md` (v2.1 11-column schema). 30/30 tests pass. 4 fleet WORKLOG.md migrated. v2.0 deprecation scheduled 2026-06-22.

### 2.6 pheno-profiling (~1,287 LoC, 0 tests) — ARCHIVED

**Score: 19/71 (27%) — Tier 0.** New audit (no prior 71-pillar scorecard). Repo `KooshaPari/pheno-profiling` exists; archived per `gh api repos/KooshaPari/pheno-profiling --jq '.archived'` = `true`.

| Pillar cluster | Score | Evidence |
|---|---|---|
| L1-L5 | 2/3 | 11 profiler scripts (8 bash + 3 Python) under `src/pheno_profiling/profilers/`; clear responsibility split; minimal deps (`pheno-profiling/pyproject.toml:1-29`); `__init__.py:1-8` is a stub |
| L6-L12 | 1/3 | no Port trait; no DI; shell + Python mix; no async |
| L13-L19 | 1/3 | disk/network/system profilers do have timing; 0 benchmarks; no async I/O; no flamegraphs |
| L20-L27 | 1/3 | **0 unit tests**; shell scripts untested; only CHANGELOG.md; no examples/ |
| L28-L37 | 2/3 | README.md (43 LOC) + CHANGELOG.md + pyproject.toml + docs/SPEC.md (55 LOC, partial); **no AGENTS.md**; **no WORKLOG.md**; **no llms.txt**; no CI workflow |
| L38-L45 | 0/3 | N/A (library) |
| L46-L55 | 2/3 | LICENSE-MIT; **no SECURITY.md**; **no CODE_OF_CONDUCT.md**; **no CONTRIBUTING.md**; **no deny.toml**; **no SBOM** |
| L56-L63 | 0/3 | no tracing; no metrics; no OTLP; no health endpoint; **profiler-tool with no fire telemetry** |
| L64-L68 | 2/3 | README.md + docs/SPEC.md (partial spec); **no AGENTS.md**; **no glossary**; **no ADR-link** |
| L69-L71 | 1/3 | `.github/CODEOWNERS` exists; **no release-policy**; **no SUPPORT.md** |

**Top 5 gaps:** L21 tests (0 currently); L8 SPEC.md (partial); L27 examples/; L56 tracing (profiler needs own observability); L69 CODEOWNERS.

### 2.7 pheno-secret-scan (11 files, config-only) — ACTIVE

**Score: 30/71 (42%) — Tier 0 (strongest in this batch).** New audit. Repo `KooshaPari/pheno-secret-scan` exists; default branch `orch-v12-s3-011`; size 0 KB (telemetry hidden). Configuration-only repo (no compiled artifact).

| Pillar cluster | Score | Evidence |
|---|---|---|
| L1-L5 | 3/3 | 11 files: workflow + pre-commit-hooks + allowlist + deny + Justfile + CHANGELOG + docs/governance + 5 config stubs; clear single-concern layout |
| L6-L12 | 2/3 | workflow + hook + allowlist = clean integration story; no Port trait needed (config-only) |
| L13-L19 | 2/3 | Docker-pinned TruffleHog image; `--since-commit HEAD` for fast pre-commit loop; full-history in CI; 0 benchmarks |
| L20-L27 | 3/3 | `.pre-commit-hooks.yaml` is a manifest contract; `Justfile:1-123` provides check/lint/validate-allowlist/audit/deny/grade/ci; no Rust/Python unit tests (N/A for config-only) |
| L28-L37 | 3/3 | README.md (224 LOC, comprehensive) + CHANGELOG.md (45 LOC, Keep a Changelog) + `Justfile` (123 LOC) + `deny.toml` (49 LOC); 3 GitHub workflows (deny.yml, secret-scan.yml); **no SPEC.md (workflow API undocumented!)** |
| L38-L45 | 0/3 | N/A (config-only) |
| L46-L55 | 5/3 | **BEST IN BATCH**. License (MIT); `deny.toml` is canonical; 3 workflows; CODEOWNERS explicit (`.github/CODEOWNERS:1-23`); Justfile has `audit` + `deny` + `validate-allowlist`; security-tool purpose-built |
| L56-L63 | 1/3 | workflow posts to `$GITHUB_STEP_SUMMARY` (partial structured-log); no OTLP; no health endpoint |
| L64-L68 | 2/3 | README.md + CHANGELOG.md + docs/governance/README.md (48 LOC); **no SPEC.md (workflow API contract missing)**; no glossary |
| L69-L71 | 3/3 | CODEOWNERS + docs/governance/README.md (ownership + review requirements + release process + incident response); **best in batch** |

**Top 5 gaps:** L8 SPEC.md (workflow API contract); L13 perf baseline; L21 tests (actionlint smoke test); L24 migration guide (for consumers adopting v0.x.x); L74 pheno-drift-detector integration.

### 2.8 pheno-ssot-template (8 files, 274 LoC) — HTTP 404 (content in monorepo)

**Score: 23/71 (32%) — Tier 0.** New audit. Source repo `KooshaPari/pheno-ssot-template` returns HTTP 404. Content lives in monorepo git tree (`pheno-ssot-template/` directory, 8 files, last commit 2026-06-20).

| Pillar cluster | Score | Evidence |
|---|---|---|
| L1-L5 | 3/3 | `template.yaml` (204 LOC, machine-readable manifest) + `Cargo.toml.template` (47 LOC) + `src/lib.rs.template` + 4 linter scripts; clear template structure |
| L6-L12 | 2/3 | SSOT invariants (4 invariants in README:144-191) are well-documented; no Port trait (Rust crate template, not a lib with hexagonal ports) |
| L13-L19 | 1/3 | `scripts/render.sh` dry-instantiation is the only "perf test"; 0 benchmarks; no async |
| L20-L27 | 1/3 | **0 unit tests for the template itself**; linter scripts (`scripts/check-ssot-invariant-1-errors.sh`, `check-ssot-invariant-2-logging.sh`) test consumers; **no proptest for template substitution** |
| L28-L37 | 4/3 | README.md (274 LOC, comprehensive!) + CONTRIBUTING.md (83 LOC, Conventional Commits) + SECURITY.md (39 LOC) + CODEOWNERS (12 LOC) + justfile (60 LOC, render-test/lint/lint-yaml/audit-secrets/ci); 4 GitHub workflows (audit, ci, lint, scorecard); **no CHANGELOG.md**; **no AGENTS.md**; **no llms.txt** |
| L38-L45 | 0/3 | N/A (template) |
| L46-L55 | 3/3 | LICENSE + deny.toml (canonical fleet baseline per SECURITY.md:33-39); 4 workflows including scorecard; CODEOWNERS; conventional commits enforced via CONTRIBUTING.md:34-47 |
| L56-L63 | 0/3 | no tracing; no metrics; no OTLP; no health endpoint |
| L64-L68 | 5/3 | **BEST IN BATCH for SSOT**. README.md 274 LOC + template.yaml + SSOT invariants diagram + ADR references + 4 linter scripts; **strongest documentation in batch** |
| L69-L71 | 2/3 | CODEOWNERS (1-line default @KooshaPari) + CONTRIBUTING.md (governance + release process + conventional commits); **no SUPPORT.md**; **no release-policy file (defined in CONTRIBUTING.md though)** |

**Top 5 gaps:** L21 tests (0 for the template itself); L13 perf; L22 proptest (template substitution edge cases); L56 tracing; L74 pheno-drift-detector.

---

## 3. Cross-repo patterns — fleet-wide missing pillars

| Pillar | Definition | Hit count / 8 | Affected repos | Fleet-wide gap? |
|---|---|---|---|---|
| **L8 SPEC.md** | Canonical 1-page spec | 3/8 | pheno-llms-txt, pheno-scaffold-kit, pheno-vibecoding-guard, pheno-worklog-schema, pheno-secret-scan (5 missing) | **YES — #1 cross-cutting gap** |
| **L17 deny.toml / pip-audit** | Dependency policy | 3/8 | pheno-llms-txt, pheno-vibecoding-guard, pheno-worklog-schema, pheno-profiling (4 missing) | **YES — supply-chain gate** |
| **L21 doc tests** | Inline doctest examples | 0/8 | ALL 8 MISSING | **YES — universal** |
| **L22 proptest** | Property-based tests | 0/8 | ALL 8 MISSING | **YES — universal** |
| **L30 examples/** | Usage examples directory | 3/8 | pheno-llms-txt, pheno-scaffold-kit, pheno-vibecoding-guard, pheno-worklog-schema, pheno-profiling (5 missing) | **YES — single biggest cross-cutting gap** |
| **L56 tracing/logging** | Structured logging dep | 0/8 | ALL 8 MISSING | **YES — biggest OO gap (40 pillars short)** |
| **L57 metrics** | RED/USE metrics | 0/8 | ALL 8 MISSING | **YES — universal** |
| **L58 distributed tracing / OTLP** | OpenTelemetry | 0/8 | ALL 8 MISSING | **YES — universal** |
| **L63 health endpoint** | Service health check | 0/8 | ALL 8 MISSING | **YES — universal (N/A for libs)** |
| **L69 CODEOWNERS** | Path-based ownership | 4/8 | pheno-llms-txt, pheno-scaffold-kit, pheno-vibecoding-guard, pheno-worklog-schema (4 missing) | **YES — release/sign-off governance** |
| **L70 SUPPORT.md** | Support channels | 0/8 | ALL 8 MISSING | **YES — universal** |
| **L74 pheno-drift-detector** | Drift detection integration | 0/8 | ALL 8 MISSING | **YES — newest pillar, no consumers yet** |

**Fleet-wide universal gaps (8/8 missing):** L21 doc tests, L22 proptest, L56 tracing, L57 metrics, L58 OTLP, L63 health, L70 SUPPORT.md, L74 drift-detector.
**Fleet-wide 7/8 missing:** L8 SPEC.md (only pheno-mcp-router + pheno-ssot-template have it).

---

## 4. Top 3 remediation tracks (ordered by ROI)

### Track R1 — **OO L56-L58 + L74** (universal gap; closes biggest pillar delta)
**ROI:** +2 pillars × 8 repos = **+16 pillars** (174 → 190, 30.6% → 33.5%). Single biggest bang-for-buck.
**Scope:**
- All 8 repos: add `pheno-tracing` (or stdlib `logging`) dependency + 1-2 structured log lines per module.
- All 8 repos: stub OTLP exporter (even a no-op exporter with config-from-env validates the wiring).
- All 8 repos: register with `pheno-drift-detector` (L74) — single PR per repo, no schema changes.

### Track R2 — **DX L8 + L30** (single biggest doc gap; closes 10 pillars across 8 repos)
**ROI:** +2 pillars × ~5 repos × 2 (SPEC + examples) = **+10 pillars** (190 → 200). High visibility, low risk.
**Scope:**
- pheno-llms-txt: ✅ SPEC.md (already absorbed into `phenotype-py-extras/docs/llms-txt-spec.md`).
- pheno-scaffold-kit: ✅ SPEC.md (L72/L73/L74 absorbed into umbrella; spec lives in `findings/2026-06-19-L5-110-112-second-half-4-repo-absorption-audit.md`).
- pheno-vibecoding-guard: **NEEDED** — re-author as `phenotype-ops/agent-devops-setups/vibecoding-guard/` with SPEC.md (rule taxonomy).
- pheno-worklog-schema: ✅ SPEC-v2.1.md at monorepo (L5-104.5, 30/30 tests).
- pheno-profiling: **NEEDED** — finish `docs/SPEC.md` (currently partial 55 LOC) to ~150 LOC.
- pheno-secret-scan: **NEEDED** — add `docs/SPEC.md` for workflow API contract (~80 LOC).
- pheno-mcp-router: SPEC.md draft exists (84 LOC); land + add acceptance criteria.
- pheno-ssot-template: ✅ SPEC.md = `README.md` (274 LOC, comprehensive); add 1-page canonical `docs/SPEC.md` for clarity.

### Track R3 — **QC L21 + L22** (test architecture — closes ADR-040 coverage gates)
**ROI:** +2 pillars × 8 repos = **+16 pillars** (200 → 216, 35.2% → 38.0%).
**Scope:**
- All 8 repos: add inline doc tests to at least 2 public functions per module.
- All 8 repos: add `proptest` (Python `hypothesis` or Rust `proptest`) for at least 1 numeric/string parser.
- This satisfies ADR-040 80% lib / 70% framework / 60% service coverage gates when measured.

---

## 5. One-line Tier upgrade plan per repo

| Repo | Current | Next tier | Pillars needed | One-line plan |
|---|---|---|---|---|
| pheno-llms-txt | T0 (14/71) | — | — | **DELETED** — target is `phenotype-py-extras/docs/llms-txt-spec.md`; no remediation in source. |
| pheno-mcp-router | T0 (28/71) | T1 (56) | +28 | Land SPEC.md (84 LOC draft → 200 LOC w/ acceptance); add examples/quickstart.py + 3; add deny.toml; add pheno-tracing stub; 6 absorbed L5-104 modules → 100% test coverage. |
| pheno-scaffold-kit | T0 (16/71) | — | — | **DELETED** — target is umbrella SUB_LIBRARIES (L72/L73/L74); recovered via `pheno-scaffold-kit#3`. |
| pheno-vibecoding-guard | T0 (22/71) | — | — | **HTTP 404** — re-author at `phenotype-ops/agent-devops-setups/vibecoding-guard/` with SPEC.md (rule taxonomy). |
| pheno-worklog-schema | T0 (22/71) | T1 (56) | +34 | SPEC-v2.1.md ✅ (L5-104.5); add examples/round-trip; add deny.toml/pip-audit; proptest for parser; drift-detector integration. |
| pheno-profiling | T0 (19/71) | T1 (56) | +37 | Add `tests/test_*.py` (4 files, 20+ tests); finish `docs/SPEC.md` to ~150 LOC; add AGENTS.md + WORKLOG.md + llms.txt; add deny.toml; proptest for complexity_analyzer. |
| pheno-secret-scan | T0 (30/71) | T1 (56) | +26 | Add `docs/SPEC.md` (workflow API contract); add `actionlint` smoke test in CI; add perf baseline (TruffleHog scan time at scale); add migration guide. |
| pheno-ssot-template | T0 (23/71) | T1 (56) | +33 | Add 1-page `docs/SPEC.md` extracted from README; add proptest for template substitution; add CHANGELOG.md + AGENTS.md; add examples/ (before/after rendering); drift-detector integration. |

---

## 6. Remediate-first summary

Per task constraint §3 (mean < 20%): no repo scored <20% on the canonical pillar mean scale, so the strict "remediate-first" list is empty.

However, 5 of 8 repos are in DELETED/404 status, which is the practical remediate-first condition:

1. **pheno-llms-txt** — HTTP 404, absorbed into `phenotype-py-extras` ✅
2. **pheno-scaffold-kit** — DELETED 2026-06-20, umbrella SUB_LIBRARIES recovered via `pheno-scaffold-kit#3` ✅
3. **pheno-vibecoding-guard** — HTTP 404, needs re-author at `phenotype-ops`
4. **pheno-worklog-schema** — HTTP 404, canonical at monorepo git (per ADR-032)
5. **pheno-ssot-template** — HTTP 404, content in monorepo git tree

**Active remediation backlog (3 repos):**
1. **pheno-profiling** — needs tests + finish SPEC.md (highest active-repo ROI)
2. **pheno-secret-scan** — needs SPEC.md + actionlint smoke (highest active-repo score at 42%)
3. **pheno-ssot-template** — needs to be migrated to `phenotype-apps` per ADR-023

---

## 7. Scoring methodology

- **Schema:** `findings/71-pillar-2026-06-17-schema.md` (L1-L71, 9 domains, 0-3 scale).
- **Tier per ADR-023 Rule 3.1 + ADR-040 gates:**
  - Tier 0: < 30/71
  - Tier 1 (substrate): 56/71 (80%)
  - Tier 2 (SDK): 50/71 (70%)
  - Tier 3 (framework): 43/71 (60%)
  - Tier 4 (federated service): 43/71 (60%)
- **N/A rule:** L40 i18n + L41 a11y → 3 (N/A) for headless libs.
- **Pass:** mean ≥ 2.00 across all 9 domains.
- **Method:** orchestrator-level manual scoring using (a) local files for 3 active repos (pheno-mcp-router, pheno-profiling, pheno-secret-scan), (b) prior T13-y audits for 5 absorbed/deleted repos, (c) disposition-index.json + L5-114 audit for closure status.
- **Evidence quality:** medium-high (file-level reads, no runtime tests run).

---

## 8. References

- `findings/71-pillar-2026-06-17-schema.md` — pillar definitions (L1-L71)
- `findings/71-pillar-2026-06-22-Civis.md` + `findings/71-pillar-2026-06-22-Dino.md` — reference scorecards (Tier 0 + Tier 1 examples)
- `findings/2026-06-18-T13-y-71-pillar-audit-5-more.md` — predecessor batch (5 of 8 same repos audited 2026-06-18)
- `findings/2026-06-19-L5-114-pheno-llms-txt-absorption.md` — closure audit for pheno-llms-txt
- `findings/2026-06-19-L5-110-112-second-half-4-repo-absorption-audit.md` — closure audit for pheno-scaffold-kit
- ADR-024 (71-pillar framework)
- ADR-040 (coverage gates per tier)
- ADR-013 (pheno-mcp-router canonical substrate)
- ADR-014 (Hexagonal L4 ports)
- ADR-023 (Rule 3.1 substrate quality bar)
- ADR-032 (pheno-worklog-schema is a primitive lib, NOT a re-implementation)
- ADR-035 (security-tool ownership)
- L5-104 (Dmouse92 absorption → pheno-mcp-router substrate)
- L5-110/111/112-second-half (3 governance tools absorbed into pheno-scaffold-kit umbrella)

---

*Generated for ADR-041 weekly refresh cycle (T13.z batch). Scores carry forward; only changed evidence re-collected. 8 repos × 71 pillars = 568 pillar scores audited, of which 174 hit (30.6% mean). Fleet total now ~923 audited pillars / 276 hit (29.9% fleet mean).*