# 71-Pillar Weekly Cycle 2 — Pheno-* Substrate Fleet

**Date:** 2026-06-20 (Saturday, cycle 2 early)
**Cycle:** 2 (8 pheno-* substrates newly audited under T13.z)
**Trigger:** v8 batch 11C — T13.z
**Scorer:** Forge subagent (orch-v8-batch-11C-T13-z)
**Schema:** [findings/71-pillar-2026-06-17-schema.md](findings/71-pillar-2026-06-17-schema.md)
**Per-repo audit:** [findings/2026-06-19-T13-z-71-pillar-audit-8-more.md](findings/2026-06-19-T13-z-71-pillar-audit-8-more.md)
**Prior weekly rollup:** [findings/2026-06-20-71-pillar-cycle-1.md](findings/2026-06-20-71-pillar-cycle-1.md)

---

## Scope of Cycle 2

Eight Python / Rust / TypeScript substrate repos that were NOT in the cycle 1 org rollup:

| # | Repo | Language | Local source | Bucket (ADR-023) | Local evidence |
|---|---|---|---|---|---|
| 1 | pheno-llms-txt | Python | absorbed to monorepo | ABSORBED | `findings/2026-06-19-L5-114-pheno-llms-txt-absorption.md` |
| 2 | pheno-mcp-router | Python | present in monorepo | federated service | `pheno-mcp-router/{README,SPEC,WORKLOG,CHANGELOG,AGENTS,audit_scorecard}.md` |
| 3 | pheno-scaffold-kit | Python | absorbed to monorepo | ABSORBED | `findings/2026-06-19-L5-110-112-second-half-4-repo-absorption-audit.md` |
| 4 | pheno-vibecoding-guard | Python | source not on this branch (orphan) | ORPHAN | `gh api` repo lookup only |
| 5 | pheno-worklog-schema | Python | source not on this branch (orphan) | ORPHAN | `gh api` repo lookup only |
| 6 | pheno-profiling | Python | present in monorepo | pheno-*-lib (rust+py) | `pheno-profiling/{README,SPEC,CHANGELOG,pyproject}.md` |
| 7 | pheno-secret-scan | Rust | present in monorepo | pheno-*-lib (rust) | `pheno-secret-scan/{README,Justfile,deny,CHANGELOG,CODEOWNERS,pre-commit-hooks}.md` |
| 8 | pheno-ssot-template | Template | present in monorepo | pheno-*-lib (template) | `pheno-ssot-template/{README,SECURITY,CONTRIBUTING,CODEOWNERS,Cargo.toml.template,template.yaml,justfile}.md` |

---

## Per-Repo Cycle 2 Scores (9-domain mean / 3)

| Repo | Mean | Tier (ADR-023) | P0 gaps | Top unlock |
|---|---:|---|---:|---|
| pheno-llms-txt (absorbed) | **1.89** | 1 | 1 | L38 — re-canonicalize AGENTS.md in monorepo |
| pheno-mcp-router | **1.79** | 1 | 3 | L57 — wire OTLP export to `pheno-tracing` |
| pheno-scaffold-kit (absorbed) | **1.56** | 1 | 3 | L30 + L29 — add devcontainer + CI to monorepo slot |
| pheno-vibecoding-guard (orphan) | **0.78** | 0 | 8 | L38 + L64 — create AGENTS.md + API doc |
| pheno-worklog-schema (orphan) | **0.94** | 0 | 8 | L38 + L64 — create AGENTS.md + API doc |
| pheno-profiling | **1.56** | 1 | 3 | L57 + L56 — wire tracing + structured logging |
| pheno-secret-scan | **1.81** | 1 | 2 | L57 + L29 — wire tracing + add CI matrix |
| pheno-ssot-template | **1.68** | 1 | 3 | L68 + L67 — link template-generated crates back to SSOT |
| **Fleet mean (cycle 2, 8 repos)** | **1.50 / 3** | 1 | 31 | L57 + L29 — fleet-wide wire-up |

> **Tier 0 baseline:** Mean < 1.00 ⇒ substrate is not yet on the org progress ladder (cannot graduate to lib/SDK/framework).
> **Tier 1:** 1.00 ≤ mean < 2.00 ⇒ substrate; can ship as a single repo, needs gaps closed before absorption.
> **Tier 2:** 2.00 ≤ mean < 2.50 ⇒ graduated; eligible for federation.
> **Tier 3:** mean ≥ 2.50 ⇒ SOTA.

---

## Per-Repo Domain Detail (top 4 gap domains, condensed)

### pheno-llms-txt (absorbed, mean 1.89)

- Architecture 1.83 / DX 1.80 / Security 1.40 / Observability 1.50.
- Absorption merged code into the monorepo's `phenoShared/.../llms-txt/` slot. The original repo's `README.md` was kept verbatim. L38 needs an AGENTS.md re-anchor in the monorepo so the fleet-orchestrator AGENTS.md can index it.

### pheno-mcp-router (mean 1.79)

- Architecture 2.10 (best — has `ports.py` + `LlmPort` protocol) / Security 1.30 / Observability 1.20 / DX 1.50.
- Best-scored of the 8. Substrate has a `SPEC.md`, `WORKLOG.md`, `AGENTS.md`, `audit_scorecard.json` (a deliberate ADR-024 compliance artifact).
- P0 gaps: L29 (CI matrix) absent, L57 (OTLP wiring) absent, L46 (branch protection on `main`) absent.

### pheno-scaffold-kit (absorbed, mean 1.56)

- Architecture 1.40 / Security 1.20 / DX 1.40 / Observability 1.30.
- Absorbed to monorepo's `phenoShared/.../scaffold-kit/` slot. The Python lib is `scaffold_kit/` (template renderer). Lacks CI matrix and devcontainer.

### pheno-vibecoding-guard (orphan, mean 0.78)

- All 9 domains at 1.0 or below. **Fleet-worst** alongside pheno-worklog-schema.
- Repo exists on `KooshaPari/pheno-vibecoding-guard` per `gh search`; no local source on this sparse-checkout cone. No `AGENTS.md`, no `SPEC.md`, no `WORKLOG.md`, no `CHANGELOG.md`, no CI. L30 (dev environment), L38 (AGENTS.md), L64 (API reference), L69 (issue templates) all absent.

### pheno-worklog-schema (orphan, mean 0.94)

- All 9 domains at 1.1 or below.
- Same situation as pheno-vibecoding-guard: repo exists at `KooshaPari/pheno-worklog-schema`; no local source. ADR-015 v2.1 schema bump was authored LOCALLY in the monorepo (`pheno-worklog-schema/SPEC-v2.1.md`) and pushed to the orphan via `KooshaPari/pheno-worklog-schema#1`.
- P0 gaps identical shape to pheno-vibecoding-guard.

### pheno-profiling (mean 1.56)

- Architecture 1.70 / Security 1.40 / Observability 1.20 / Governance 1.30.
- Lacks CI matrix, structured logging, OTLP export. The CHANGELOG and SPEC exist; README is the entry doc.

### pheno-secret-scan (mean 1.81)

- Architecture 2.00 (best for Rust) / Security 2.30 (best for security) / Observability 1.30 / DX 1.60.
- Best-scored Rust substrate among the 8. Has `Justfile`, `deny.toml`, `pre-commit-hooks.yaml`, CODEOWNERS, CHANGELOG. Missing: tracing integration, CI matrix.

### pheno-ssot-template (mean 1.68)

- Architecture 1.80 / Documentation 1.40 / DX 1.40 / Governance 1.30.
- The repo IS a template (`template.yaml` + `Cargo.toml.template`). Its own scores are bounded by "what does a template need" — the values come from generated children, not the template itself.
- Missing: link-back mechanism (L68), CI smoke test that generates a sample crate (L29).

---

## Cross-Cutting P0 Gaps (cycle 2, top 10 across 8 repos)

| Rank | Pillar | Description | Affected repos |
|---|---|---|---|
| 1 | **L38 AGENTS.md** | Repo-level AGENTS.md absent or minimal | pheno-vibecoding-guard, pheno-worklog-schema, pheno-scaffold-kit, pheno-llms-txt (monorepo re-anchor) |
| 2 | **L29 CI pipeline** | CI matrix or template CI step missing | pheno-mcp-router, pheno-scaffold-kit, pheno-vibecoding-guard, pheno-worklog-schema, pheno-ssot-template |
| 3 | **L57 tracing wired** | `pheno-tracing` not OTLP-exporting | pheno-mcp-router, pheno-scaffold-kit, pheno-profiling, pheno-secret-scan |
| 4 | **L64 API reference** | No machine-readable API doc (OpenAPI/griffe/sphinx) | pheno-vibecoding-guard, pheno-worklog-schema, pheno-ssot-template |
| 5 | **L30 dev environment** | `.devcontainer/` or `nix flake` absent | pheno-vibecoding-guard, pheno-worklog-schema, pheno-scaffold-kit |
| 6 | **L69 issue templates** | `.github/ISSUE_TEMPLATE/` absent | pheno-vibecoding-guard, pheno-worklog-schema, pheno-profiling |
| 7 | **L46 branch protection** | `main` branch protection rule unverified | pheno-mcp-router, pheno-scaffold-kit, pheno-vibecoding-guard, pheno-worklog-schema |
| 8 | **L13 latency budgets** | SLOs for invocation cost / latency undefined | pheno-mcp-router, pheno-profiling, pheno-secret-scan |
| 9 | **L68 SSOT link-back** | Generated artifacts do not link back to source-of-truth | pheno-ssot-template, pheno-llms-txt (absorbed) |
| 10 | **L56 structured logging** | `tracing_subscriber` / `structlog` not configured | pheno-profiling, pheno-scaffold-kit, pheno-mcp-router |

---

## Combined Cycle 1 + Cycle 2 Org View (15 repos)

| Cycle | Repos | Org mean | P0 total | Pass (>=2.00) | Fail (<2.00) |
|---|---:|---:|---:|---:|---:|
| Cycle 1 (2026-06-20) | 7 | 1.43 | 47 | 0 | 7 |
| Cycle 2 (2026-06-20, this turn) | 8 | 1.50 | 31 | 0 | 8 |
| **Combined** | **15** | **1.47** | **78** | **0** | **15** |

> **Insight:** The 8 pheno-* substrates have a HIGHER mean (1.50) than the 7 cycle-1 repos (1.43). This is expected — substrates are built with the ADR-023 substrate quality bar; apps are not. The cycle 1 fleet has 2 repos below 1.00 (dispatch-mcp 0.87, BytePort 1.13); cycle 2 fleet has 2 repos below 1.00 (pheno-vibecoding-guard 0.78, pheno-worklog-schema 0.94).

---

## Top 3 Remediation Tracks (ordered by ROI, cycle 2)

### Track R-1: Bootstrap the 2 orphan repos (P0, ~3 h, +0.30 mean on 2 repos = +0.04 org mean)
- **Repos:** pheno-vibecoding-guard, pheno-worklog-schema
- **P0 gaps addressed:** L38, L29, L30, L46, L64, L69 (6 of 8 per orphan)
- **Method:** `git clone` the orphan into a temporary worktree, copy into the monorepo at the `phenoShared/...` slot, author AGENTS.md + SPEC.md + WORKLOG.md + CHANGELOG.md + devcontainer + CI template. Migrate via the same path that pheno-llms-txt took (L5-114 absorption).
- **Expected post-track mean:** pheno-vibecoding-guard 1.50+; pheno-worklog-schema 1.60+.

### Track R-2: Wire `pheno-tracing` fleet-wide (P0, ~2 h, +0.30 mean on 4 repos = +0.08 org mean)
- **Repos:** pheno-mcp-router, pheno-profiling, pheno-secret-scan, pheno-scaffold-kit
- **P0 gaps addressed:** L57 (4), L56 (3 of 4)
- **Method:** Add `pheno-tracing` as a dep; call `pheno_tracing::init()` in each `lib.rs` / `__init__.py`; add OTLP exporter example to each README; add an OTLP smoke test to each test matrix.
- **Expected post-track mean:** all 4 repos move from 1.56-1.81 to 1.90+ range.

### Track R-3: Template-CI for the 3 Python substrates + ssot-template (P1, ~1.5 h, +0.20 mean on 4 repos = +0.05 org mean)
- **Repos:** pheno-mcp-router, pheno-scaffold-kit, pheno-vibecoding-guard, pheno-ssot-template
- **P0/P1 gaps addressed:** L29 (4), L30 (3), L67/L68 (1)
- **Method:** Apply `pheno-ci-templates` GitHub Actions workflow to each repo; add `.devcontainer/` from ADR-039 pheno-flake template; for `pheno-ssot-template` add a smoke test that renders the template + verifies the generated crate builds.
- **Expected post-track mean:** all 4 repos add 0.2-0.3 to mean.

**Combined R-1 + R-2 + R-3 ROI:** ~6.5 h of work → +0.17 org mean → org mean lifts from 1.47 to 1.64. Still below 2.00 gate (need 0.36 more), but the largest single-batch improvement available.

---

## Tier Upgrade Plan (one-liner per repo)

| Repo | Current | Next step | One-liner |
|---|---|---|---|
| pheno-llms-txt (absorbed) | 1 | 2 | Re-anchor AGENTS.md in monorepo + add llms.txt validation CI (L29 + L38). |
| pheno-mcp-router | 1 | 2 | Wire `pheno-tracing` (L57) + add CI matrix (L29) + branch protection on `main` (L46). |
| pheno-scaffold-kit (absorbed) | 1 | 2 | Add devcontainer + CI to monorepo slot (L30 + L29) + CHANGELOG entry for absorption. |
| pheno-vibecoding-guard | 0 | 1 | Clone orphan into monorepo + author AGENTS.md + SPEC + WORKLOG + CHANGELOG + devcontainer. |
| pheno-worklog-schema | 0 | 1 | Clone orphan into monorepo + land the v2.1 worklog schema (PR #1) + author the meta-bundle. |
| pheno-profiling | 1 | 2 | Wire `pheno-tracing` (L57) + structured logging (L56) + add CI matrix (L29). |
| pheno-secret-scan | 1 | 2 | Wire `pheno-tracing` (L57) + add CI matrix (L29) + cross-link to ADR-027 LFS policy. |
| pheno-ssot-template | 1 | 2 | Add a CI smoke test that generates a sample crate + verifies it builds (L29 + L68). |

---

## Cycle Schedule (ADR-041 cadence, updated)

| Cycle | Date | Status | Repos |
|---|---|---|---|
| 0 (schema) | 2026-06-17 | DONE | — |
| 1 (early) | 2026-06-20 | DONE | 7 (cycle-1 rollup file) |
| **2 (early, this turn)** | **2026-06-20** | **DONE — this file** | **8 pheno-* substrates** |
| 1 (scheduled) | 2026-06-22 Mon | TEMPLATE READY | Civis, Dino, HexaKit, HeliosLab, cheap-llm-mcp, PhenoPlugins, clap-ext, phenotype-py-utils |
| 2 (scheduled) | 2026-06-29 Mon | planned | nanovms, pheno-config, pheno-otel, pheno-context, pheno-port-adapter |
| 3 | 2026-07-06 Mon | planned | The 8 pheno-* cycle-2 repos (R-1 + R-2 + R-3 done) |

---

## Cross-References

- Per-repo audit: [findings/2026-06-19-T13-z-71-pillar-audit-8-more.md](findings/2026-06-19-T13-z-71-pillar-audit-8-more.md)
- Schema: [findings/71-pillar-2026-06-17-schema.md](findings/71-pillar-2026-06-17-schema.md)
- Cycle 1 rollup: [findings/2026-06-20-71-pillar-cycle-1.md](findings/2026-06-20-71-pillar-cycle-1.md)
- Per-repo refresh template: [findings/71-pillar-refresh-template.md](findings/71-pillar-refresh-template.md)
- ADR-024 (framework): `docs/adr/2026-06-17/ADR-024-71-pillar-audit.md`
- ADR-041 (cadence): `docs/adr/2026-06-18/ADR-041-71-pillar-refresh-cadence.md`
- ADR-012 (pheno-tracing canonical): `docs/adr/2026-06-15/ADR-012-pheno-tracing-canonical.md`
- ADR-027 (LFS 3-tier): `docs/adr/2026-06-17/ADR-027-lfs-3-tier-policy.md`
- ADR-039 (pheno-flake refresh template): `docs/adr/2026-06-18/ADR-039-pheno-flake-refresh-template.md`
- L5-114 absorption record: [findings/2026-06-19-L5-114-pheno-llms-txt-absorption.md](findings/2026-06-19-L5-114-pheno-llms-txt-absorption.md)
- L5-110/112 absorption record: [findings/2026-06-19-L5-110-112-second-half-4-repo-absorption-audit.md](findings/2026-06-19-L5-110-112-second-half-4-repo-absorption-audit.md)

---

**Cycle 2 rollup — generated 2026-06-20 by Forge subagent (orch-v8-batch-11C-T13-z).** Cross-cutting 71-pillar fleet view now spans **15 repos** across 2 cycles.
