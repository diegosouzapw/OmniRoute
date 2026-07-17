# ADR-023 — Agent-effort governance (device-fit + dogfood + substrate)

- **Status:** Accepted — 2026-06-15
- **Date:** 2026-06-15
- **Decision:** @KooshaPari
- **Worklog:** [`worklogs/L5-101-app-governance-2026-06-15.json`](../../../worklogs/L5-101-app-governance-2026-06-15.json)
- **Finding:** [`findings/2026-06-15-L5-101-app-governance.md`](../../../findings/2026-06-15-L5-101-app-governance.md)

## Context

The Phenotype fleet is ~50+ sub-repos in a sparse-checkout monorepo. Three
failure modes in May–June 2026:

1. **Heavy-work on MacBook.** The MacBook is a dev workstation, not a CI
   runner — yet `cargo test --workspace`, iOS sim boots, dind, Unity/Unreal
   editor heads were all being driven from the MacBook, producing blocking
   cycles and defeating parallelism.

2. **App-level repos with little dogfood use.** Several app repos had no
   active consumer, no dogfood loop, no strategic pull: `focalpoint`,
   `QuadSGM`, `AtomsBot*` (from a capstone whose sponsor is not in good
   standing — legally minable for future items).

3. **"Random phenoShared" anti-pattern.** Shared code was being added to
   per-app directories instead of proper `pheno-*-lib` / `phenotype-*-sdk` /
   `phenotype-*-framework` / federated-service substrate.

The full 2026-06-15 directive is quoted in the finding doc.

## Decision

Three rules, applied in order by any agent at task start:

### Rule 1: Device-fit gate

- **`device: macbook`** → only small, focused work (< 300 LoC, stdlib-only
  dependencies, no cargo build, no docker, no ios-sim, no Unity/Unreal, no
  native compilation, no network calls beyond `git fetch` / `gh api`).
- **`device: heavy-runner`** → anything goes (cargo workspace, dind, etc.)
- **`device: subagent`** → the subagent's host enforces the gate.
- **`device: ci`** → CI runner, full resource availability.
- Every worklog v2.1 row MUST have a `device:` column.
- Violation: the agent who scheduled the heavy-work on a MacBook is
  responsible — this is an L5 governance failure, not a tool error.

### Rule 2: App-level repo triage

| Repo | Bucket | Details |
|---|---|---|
| `Civis` | **ACTIVE** | Full dogfood, strategic. No restrictions. |
| `Dino` | **CONDITIONAL** | Engine / non-frontend / non-visual work only. Game-client frontend (Unity scenes, UI panels, visual rendering) is PAUSED. "heavy visual engine requiring aspects of the game that you can quickly iterate on" is permitted. |
| `WSM` | **CONDITIONAL** | Permitted only when there is an active dogfood consumer with a validated intent signal. Currently NONE — do not initiate WSM work. |
| `focalpoint` | **PAUSED** | No new feature branches. Soft-block: requires a worklog `bucket_change` row to revive. |
| `QuadSGM` | **PAUSED** | Same as `focalpoint`. |
| `AtomsBot` | **PAUSED-as-target** | No new feature branches into this repo. Archival mining (code, concepts, schema, docs, tests) is permitted and explicitly intended — the capstone sponsor is not in good standing. Hard-block on features; allow docs/tests/schemas PRs. |
| `AtomsBot-2nd` | **PAUSED-as-target** | Same as `AtomsBot`. No CODEOWNERS file exists — create one with archival-mining rules. |
| `AtomsBot-wtrees` | **PAUSED-as-target** | Same as `AtomsBot`. No CODEOWNERS file exists — create one with archival-mining rules. |
| `HwLedger` + other apps | **RECLASSIFY per Rule 3** | Underlying parts must be moved to proper lib/sdk/framework/federated substrate, not to `phenoShared` or per-app `crates/`. |

### Rule 3: Substrate placement

All shared code MUST go into one of:

- `pheno-*-lib/` (library crate, reusable)
- `phenotype-*-sdk/` (SDK for external consumption)
- `phenotype-*-framework/` (framework / IoC pattern)
- Federated service with an explicit service boundary and OpenAPI spec

**Not allowed:** `phenoShared/`, per-app `crates/`, per-app `lib/`, random
top-level directories.

#### Rule 3.1: Quality bar for new substrate

Every new substrate crate or service MUST satisfy ≥ 6 of the following
before it can be depended on by a consumer:

1. SPEC — a `SPEC.md` or ADR defining the interface contract
2. Docs — README, doc-comments on public API, example usage
3. Unit tests — `cargo test`, `go test`, or `pytest` covering ≥ 80% of
   public surface
4. Integration tests — at least one cross-crate test path
5. E2E / perf / chaos — at least one end-to-end, perf, or chaos test
   (can be a single script or CI step)
6. Observability — OTLP traces, structured logs, or metrics on the
   public entry points
7. CI — a CI workflow that runs the tests and lints

The goal: **maximize automated observability to support HITL-less dev
from base intent alone.**

## Consequences

- **Positive:** MacBook stays responsive. CI catches heavy work. App repos
  stop accumulating dead code. Substrate is findable and robustly managed.
  LOC drops because shared code lives once, not N times.
- **Negative:** Paused repos accumulate stale branches (drift). The
  CODEOWNERS changes require per-repo PRs. Agents must self-enforce the
  device-fit gate — it's an L5 behavioral rule, not a technical enforcement.
- **Neutral:** The pause is reversible via a worklog `bucket_change` row.
  The device-fit gate is a worklog convention, not a hard block —
  violation is retrospective blame, not preventive.

## Follow-ups

| ID | Priority | Action |
|---|---|---|
| FU1 | P1 | L6 bucket-drift check — monitor active branches in PAUSED repos + heavy-work on MacBook |
| FU2 | P2 | Config consolidation PR-5..11 (8/11 done as of 2026-06-19) |
| FU3 | P2 | ADR-023 find/audit over open PRs |
| FU4 | P2 | `phenotype-config` 2026-07-15 archive prep |
| FU5 | P2 | AtomsBot* re-purposing triage |
| FU6 | P2 | HW ledger reclassification |
| FU7 | P1 | CODEOWNERS review for PAUSED repos — audit + update per-repo `.github/CODEOWNERS` |

## References

- L5-101 finding: `findings/2026-06-15-L5-101-app-governance.md`
- L5-101 worklog: `worklogs/L5-101-app-governance-2026-06-15.json`
- ADR-025 (worklog v2.1 schema): `docs/adr/2026-06-17/ADR-025-adr-015-v2-1-worklog-schema-bump.md`
- SSOT.md (governance SSOT): `SSOT.md`
