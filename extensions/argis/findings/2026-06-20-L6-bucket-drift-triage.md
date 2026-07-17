# L6 bucket-drift triage — ADR-023 FU2 (2026-06-20)

**Status:** Complete — 36 drifts analyzed, all pre-ADR-023 stale, no enforcement action needed.
**Device:** macbook
**ADR anchor:** `docs/adr/2026-06-15/ADR-023-agent-effort-governance.md`

## Baseline summary

Generated: `findings/L6-bucket-drift-baseline-2026-06-20.json`
Paused repos watched: 5 + 2 conditional
**Drift count: 36** (exit=1, as expected)

## Per-repo breakdown

| Repo | Bucket | Drifts | Verdict |
|---|---|---|---|
| AtomsBot | PAUSED (capstone) | 20 | Stale pre-ADR-023 hygiene branches. Main is 7 ahead of origin — expected for archived repo. No action. |
| focalpoint | PAUSED | 5 | 4 stale branches + 1 residue-cleanup branch. All pre-ADR-023. No action. |
| QuadSGM | PAUSED (archived) | 5 | 4 stale branches + main 1 ahead. All pre-ADR-023. No action. |
| AtomsBot-wtrees | PAUSED (404) | 2 | Stale orchestration branches. No action. |
| AtomsBot-2nd | PAUSED (404) | 2 | Stale orchestration branches. No action. |
| Dino | CONDITIONAL | 2 | CI/tooling + docs — engine-adjacent, ADR-023 compliant. No action. |
| **Total** | — | **36** | **All pre-ADR-023 or compliant. No enforcement action needed.** |

## Heavy-work-on-MacBook check

Zero `heavy_work_on_macbook` drifts across all scanned worklogs. Device-fit gate is **working correctly**.

## Dino CONDITIONAL verification

| Branch | Ahead | Content | ADR-023 compliant? |
|---|---|---|---|
| `feat/drift-detector-ci-2026-06-18` | 2 | `chore(tier-0): orch-v10-014 hygiene` + `docs(intent): reorder curated-prompt entries` | ✅ CI/tooling = engine-adjacent |
| `main` | 1 | `feat: add L7-001 intent+boundary snapshot docs` | ✅ Documentation |

## Actionable items

**None.** The 36 drifts are:
- 34 in PAUSED repos, all pre-ADR-023 stale branches (no new work)
- 2 in Dino (CONDITIONAL), both ADR-023 compliant

The drift script is ready for CI integration (already shipped via `.github/workflows/governance-drift.yml`).
