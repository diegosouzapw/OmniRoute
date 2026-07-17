# L5-116 — ADR-023 follow-ups (FU1 drift baseline + FU7 CODEOWNERS audit + FU3 execution + FU4 CI)

**Status:** Complete (all 4 follow-ups executed)
**Date:** 2026-06-20
**Device:** macbook

## FU1: Drift baseline

Ran `scripts/l6_bucket_drift_check.py` against the live monorepo.
Report at `findings/L6-bucket-drift-baseline-2026-06-19.json` (38 drifts).

No heavy-work-on-MacBook drifts detected. 38 stale branches in PAUSED repos (all pre-ADR-023, no enforcement action needed).

## FU7 / FU3: CODEOWNERS audit + execution

Verified per-repo CODEOWNERS presence via `gh api`, then executed FU3:

| Repo | Has CODEOWNERS? | Actual action | Result |
|---|---|---|---|
| FocalPoint | Yes (507 B) | Created PR with ADR-023 soft-block comment | **PR #140 OPEN** |
| QuadSGM | Yes (203 B) | **Archived** — no action needed | Skipped (read-only) |
| AtomsBot | Yes (45 B) | **Archived** — no action needed | Skipped (read-only) |
| AtomsBot-2nd | **404 — repo does not exist** | N/A | Skipped |
| AtomsBot-wtrees | **404 — repo does not exist** | N/A | Skipped |

**FocalPoint PR #140:** `https://github.com/KooshaPari/FocalPoint/pull/140`
**Title:** `docs(governance): add ADR-023 PAUSED soft-block to CODEOWNERS (2026-06-20)`
**State:** OPEN

All data in `findings/2026-06-19-L5-116-codeowners-review-paused-repos.md`.

## FU4: CI integration

Created `.github/workflows/governance-drift.yml` — weekly cron (Monday 09:00 PDT per ADR-041) + push-to-main trigger:

- Runs `scripts/l6_bucket_drift_check.py` with `continue-on-error: true`
- Reports drift count as a GitHub Actions warning annotation
- Uploads baseline JSON as an artifact (30-day retention)

## Files changed this turn

- `scripts/batch_codeowners_prs.sh` — rewritten for robustness (archived/404/error handling)
- `findings/2026-06-19-L5-116-codeowners-review-paused-repos.md` — updated with execution results
- `findings/2026-06-19-L5-116-bucket-drift-and-codeowners.md` — updated with FU3/FU4 results
- `worklogs/L5-116-drift-and-codeowners-2026-06-19.json` — updated
- `.github/workflows/governance-drift.yml` — **new** FU4 CI workflow

## Remaining open follow-ups

| ID | Priority | Description | Status |
|---|---|---|---|
| FU2 | P1 | Run drift baseline across all non-monorepo repos | Blocked (needs `gh api` across org) |
| FU5 | P2 | Integrate drift check into daily CI (not just weekly) | Deferred; weekly is adequate for v10 |
| FU6 | P2 | Add drift check as `pheno-ci-templates` reusable workflow | Blocked (repo 404) |
