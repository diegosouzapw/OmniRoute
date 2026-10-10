---
title: "3.9.0 LTS GO/NO-GO checklist"
lastUpdated: 2026-10-10
---

# 3.9.0 LTS GO/NO-GO checklist

The owner's decision gate at the end of **3.8.59** (ROADMAP Phase 2): is the code that
becomes the v3 LTS line (`stable/v3`, npm `latest` for the whole v4 cycle) ready to be cut
as **3.9.0**? The cut itself is described in
[RELEASE_CHECKLIST.md → 3.9.0 LTS cut](./RELEASE_CHECKLIST.md#390-lts-cut-rehearsed-in-3858)
and the branch/channel model in [RELEASE_STRATEGY.md](./RELEASE_STRATEGY.md) and the
[ROADMAP](../../ROADMAP.md) (Phase 3).

How to use it:

- Run every command against the **3.8.59 release tip** (or the 3.9.0 release PR), not a
  feature branch. "Green" means the command exits 0 with no new allowlist entry and no
  baseline moved upwards.
- Paste the evidence (CI run URL, command output excerpt, or commit SHA) in the
  **Evidence** column. An empty cell is a NO-GO.
- A NO-GO is not a failure of the rail: fix, re-run the row, and decide again.

## Rail gates

Only the gates of the 3.8.x rail. G3–G10 belong to the v4 phases (modular platform) and are
not part of the LTS decision.

| Gate | What must hold                                                                                                                                                                                                                                                                                                         | How to prove                                                                                                                                                                                                                                                   | Evidence |
| ---- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| G0   | PRs to `release/**` (the `quality.yml` lane) run the same ratchets and security gates as PRs to `main`                                                                                                                                                                                                                 | `Gate / Quality` green on the 3.9.0 release PR: `gh pr checks <release-PR>`; locally `npm run quality:ratchet`                                                                                                                                                 |          |
| G1   | `check:known-symbols` is registry-aware (no regex false negatives on registered strategies/executors)                                                                                                                                                                                                                  | `npm run check:known-symbols`                                                                                                                                                                                                                                  |          |
| G2   | Every god-file slice left file size and quality metrics at or below baseline (no own-growth without the owner's explicit approval)                                                                                                                                                                                     | `npm run check:file-size` and `npm run quality:ratchet` on the tip; every change to `config/quality/quality-baseline.json` in the cycle (`git log -p origin/main..HEAD -- config/quality/quality-baseline.json`) lowers a number or links the owner's approval |          |
| G11  | Mergify queue `release` active: `queue_rules` present, `checks_timeout` defined, label `queue` exists; `--admin merge` is not used (GitHub's native merge queue was rejected in v3.8.49 — no branch wildcards on a personal-account repo, see the `.mergify.yml` header; batching is blocked by the Mergify plan tier) | `npm run release:dry-run-lts-cut -- --from <tip>` shows `✓ merge-queue` (reads `.mergify.yml` at the tip + the `queue` label) and `✓ release-ruleset` (the `release/*` ruleset keeps `deletion` + `non_fast_forward`); no `--admin` merge in the cycle         |          |
| G12  | `Gate / CI` and `Gate / Quality` are the required status rollups and fail when any job they need fails                                                                                                                                                                                                                 | `gh pr checks <release-PR>` shows both rollups green; a deliberately red job on a scratch PR turns its rollup red                                                                                                                                              |          |
| G13  | The golden sets that pinned behavior before the `combo.ts` / `chatCore.ts` decomposition still pass                                                                                                                                                                                                                    | `node --import tsx/esm --test tests/unit/g13-combo-chatcore-golden.test.ts tests/unit/executor-map-golden.test.ts tests/unit/provider-translate-path-golden.test.ts`                                                                                           |          |
| G14  | `no-restricted-imports` boundaries hold (no `localDb.ts` barrel import outside `src/lib/db/`, no `open-sse/executors/**` in `src/app/**`)                                                                                                                                                                              | `npm run lint` and `node --import tsx/esm --test tests/unit/eslint-import-boundaries.test.ts`                                                                                                                                                                  |          |

## Closing battery

The same battery closes every rail version; for the LTS it runs on the final tip. Run the
unit and Vitest suites **twice in a row** — a flake is a NO-GO until it is explained.

| #   | Item                                                  | How to prove                                                                                                                                                                                                                     | Evidence |
| --- | ----------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| 1   | Lint and typecheck                                    | `npm run lint && npm run typecheck:core && npm run typecheck:noimplicit:core`                                                                                                                                                    |          |
| 2   | Unit and Vitest (disjoint runners, both required)     | `npm run test:unit && npm run test:vitest` (twice)                                                                                                                                                                               |          |
| 3   | Coverage at or above the baseline (floor 60/60/60/60) | `npm run test:coverage && npm run quality:ratchet`                                                                                                                                                                               |          |
| 4   | Cycles, file size, complexity, dead code              | `npm run check:cycles:ratchet && npm run check:file-size && npm run check:complexity && npm run check:cognitive-complexity && npm run check:dead-code`                                                                           |          |
| 5   | Known symbols, provider consistency, generators clean | `npm run check:known-symbols && npm run check:provider-consistency && npm run gen:provider-reference && git diff --exit-code docs/reference/PROVIDER_REFERENCE.md`                                                               |          |
| 6   | E2E provider journey and Playwright                   | `npm run test:integration` (includes `tests/integration/provider-journey.contract.test.ts`) and `npm run test:e2e`                                                                                                               |          |
| 7   | Build and smoke of the artifact that ships            | `gh workflow run preview-artifact.yml -f pr_number=<release-PR>` (build once, `check:pack-artifact` + `check:pack-boot`, attested), or locally `npm run build:release && npm run check:pack-artifact && npm run check:pack-boot` |          |
| 8   | VPS canary with live smoke (Hard Rule #18)            | Deploy the attested tarball to the VPS (192.168.0.15), then `curl -fsS http://192.168.0.15:<port>/api/monitoring/health` and one live request per critical route (`/v1/chat/completions`, `/v1/messages`, `/v1/models`)          |          |
| 9   | CHANGELOG consolidated, cycle issues triaged          | `npm run check:changelog-integrity && npm run check:docs-sync`; every issue referenced by the cycle is closed or re-pointed                                                                                                      |          |
| 10  | Characterization tests still green                    | `node --import tsx/esm --test "tests/unit/**/*.characterization.test.ts"`                                                                                                                                                        |          |

## Cut readiness

| Item                                  | How to prove                                                                                                                                                                                                                                                                    | Evidence |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| Release branch green                  | The release branch exists (`git ls-remote --heads origin <release-branch>` is not empty) AND `gh issue list --repo diegosouzapw/OmniRoute --state open --search "Release branch not green: <release-branch> in:title"` is empty — no issue for a missing branch is not evidence |          |
| 3.8.58 rehearsal done and rolled back | Fork rehearsal log of `node scripts/release/dry-run-lts-cut.mjs --execute ...` and of `--execute --rollback` (see the checklist)                                                                                                                                                |          |
| Dry-run of the real cut is READY      | `npm run release:dry-run-lts-cut -- --from <3.9.0-tip>` exits 0 and prints `RESULT: READY`                                                                                                                                                                                      |          |

---

GO / NO-GO: ______ (owner, date)
