---
title: "Release-Green — keeping the queue and release branch green"
---

# Release-Green: keeping the queue and release branch green

## The problem this solves

The **full gate** (`.github/workflows/ci.yml` — unit shards, vitest, ratchets,
`package-artifact`, SonarQube, E2E) runs **only on the release PR** (PR → `main`). PRs targeting
`release/**` receive only the **fast-gates** (`quality.yml`: TIA-impacted tests + typecheck +
lint). Consequence: reds accumulate silently on the release branch and **explode in layers
of ~40 min** at release time, one at a time.

The "release-green family" exists to **anticipate** those reds — validate the equivalent of the full
gate **locally / outside of release**, at any time, so the release PR is already
green on its first CI run.

> **Non-negotiable principle:** none of this blocks the contributor. We do not add a required
> check that fails their PR. The **drift** (ratchets) is for the maintainer to rebaseline at release —
> never a contributor concern. No piece **closes** a PR (credit theft) nor
> **weakens** a test to pass.

## The family (4 pieces) — and how each runs independently

| Piece                                                                      | What it is                                                                        | When to run                                                                       | Scope                           |
| -------------------------------------------------------------------------- | --------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- | ------------------------------- |
| **`/green-prs`** (Solution A)                                              | On-demand scan by the maintainer of the **queue of open PRs**                     | **Independently, periodically** — and especially **before** a `/generate-release` | Entire PR queue → `release/**`  |
| **`/validate-release-green`** (Solution C — `npm run check:release-green`) | Validation engine: reproduces the full gate against a branch OR a merge candidate | Independently, at any time                                                        | A specific branch or a merge-PR |
| **`/babysit <PR#>`**                                                       | Drives **live CI** of **one** PR to green                                         | Independently, per PR                                                             | A single PR                     |
| **`nightly-release-green.yml`** (Solution D)                               | Automated nightly workflow; opens issue on HARD red                               | Automatic (cron)                                                                  | The active release branch       |

**Short answer to "is this only for releases?":** **no.** `/green-prs` was designed to
run **periodically, between releases**. Running independently is the normal use — release is just
the moment when running it yields the most value.

## Solution C — `npm run check:release-green` (the engine)

Reproduces release-equivalent validation against the current working tree and classifies each red:

- **HARD** (typecheck, lint errors, unit, vitest, db-rules, public-creds, optional
  `package-artifact`) → **real defect**; `exit 1`. Fixed on the source branch (TDD, Rule #18).
- **DRIFT** (eslint **warnings**, cognitive-complexity, file-size) → ratchet drift accumulated in
  the cycle, **not the contributor's fault**; it is only reported and **rebaselined by the maintainer at
  release**. Drift **never** changes the exit code — so it never blocks anyone.

```bash
npm run check:release-green                 # current branch (working tree)
node scripts/quality/validate-release-green.mjs --json   # structured output
node scripts/quality/validate-release-green.mjs --quick  # skips unit+vitest (drift+typecheck+lint only)
node scripts/quality/validate-release-green.mjs --with-build  # includes package-artifact (slow)
```

Diagnoses and **reports** only (no auto-fix). The fix-to-green orchestration lives in
`/green-prs` and `/review-prs`.

## Solution A — `/green-prs` (the queue scan)

Procedure (summary — see the `green-prs` skill for details):

1. **Inventory** the queue of open PRs against the active release branch.
2. **Triage** each PR (viable / reject-worthy / needs-author) — reject/needs-author are
   **reported, not closed** (the author decides).
3. For each viable PR, in an **isolated worktree** (Rule #19), bring the PR to the release tip and run
   `npm run check:release-green`:
   - **HARD** → fix **on the contributor's branch** via co-authorship (preserves the author's "Merged" status),
     re-run until all HARDs are cleared.
   - **DRIFT** → leave it; it will be rebaselined at release.
4. **Report** a PR × (verdict, HARD reds, fixed?, DRIFT, release-green now?) table.

Can **prepare** the queue without merging; only merges when explicitly requested — and never closes a PR.

## Recommended cadence

- Run **`/green-prs` periodically** (e.g., weekly) and **always before a
  `/generate-release`**.
- Keep **`nightly-release-green.yml`** (Solution D) as a continuous signal: when it opens a
  HARD red issue, it is time for a scan.
- Use **`/validate-release-green`** ad-hoc to check a branch or a specific merge candidate.
- Use **`/babysit <PR#>`** when a specific PR needs to be driven to green on live CI.

## Relationship to release

- `/generate-release` calls validation in **Phase 0 (pre-flight)**: rebaselines DRIFT and fixes
  HARD before opening the release PR.
- `/review-prs` uses the release-green gate at the merge decision step (green-before-merge).

The goal of all pieces is the same: **a green release PR on the first CI run**, instead of surfing
reds in 40-minute layers on release day.
