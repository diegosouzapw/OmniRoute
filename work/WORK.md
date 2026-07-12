# OmniRoute / Phenotype Work Ledger

[OmniRoute:◐, Tracera:◐, AgilePlus:◐, DesktopDeploy:✗, Vercel:◐]

Canonical polyrepo handoff for the long-horizon AgilePlus/Phenotype DAG. Preserve unrelated dirty
trees; use isolated worktrees for overlapping implementation; update this file instead of creating
parallel handoff ledgers.

## Objective

Advance dashboard cleanup, cockpit bridge automation, lifecycle/review-loop regression coverage,
targeted validation, dirty-tree containment, commit preparation, and handoff/push when feasible.

## Live DAG (2026-07-12)

```text
ROOT-WORK-HANDOFF
|- LEDGER                         [wip] recreated after checkout moved to older root commit
|  `- next                         preserve concurrent staged work and keep this file canonical
|- OMNIROUTE-CI                   [ok] isolated repair 6597cb0cf verified build + typecheck
|- AGILEPLUS-COCKPIT              [wip] historical isolated commit 418e597; rehydrate and revalidate
|  |- ownership_bracket            [ok] ported through event/session/SQLite/snapshot in isolated work
|  `- next                         restore a proper AgilePlus worktree and rerun cargo check/tests
|- REVIEW-LOOP                    [wip] isolated commit 9d16bba adds delay seam + final-cycle test
|  `- blocker                      [!] prior disposable checkout lacked nested Cargo manifests
|- CIVIS                          [!] quality manifest SHA stale; PR1382/core verification needs repair
|- POLYREPO-CONTAINMENT            [ok] current root preserved; staged unrelated work not touched
`- NEXT                           [wip] rehydrate isolated lanes, validate, then publish only green work
```

## Evidence

- Root checkout is `feat/pr1-extend-omni-core`; current working tree contains concurrent staged
  changes outside `work/` and they are intentionally preserved.
- OmniRoute post-merge defects were isolated and repaired: duplicate `clinepassProvider` registry
  entry and unresolved Bifrost conflict markers. Build/typecheck passed in isolated worktree.
- Cockpit port added routes, event/session state, SQLite hydration, `ownership_bracket` propagation,
  POST-to-snapshot and SQLite round-trip tests. The disposable worktree no longer exists, so this is
  historical evidence until rehydrated and rerun.
- Review-loop port added an injectable delay seam and deterministic Pending/Unknown -> Approved
  final-cycle regression. Focused Cargo validation was blocked by an incomplete nested workspace,
  not by an observed assertion failure.
- Civis manager audit reports `.ci/quality-manifest.json` attests stale SHA `5066ab663...` while
  HEAD is `4706ac1b8`; PR1382 remains gated. Disposable Civis verification worktrees were removed.

## Ownership / Next Actions

| lane | state | next owner action |
|---|---|---|
| OmniRoute | ok | retain isolated repair evidence; rerun remote checks when adopted |
| AgilePlus cockpit | wip | create proper nested AgilePlus worktree, rehydrate commit, run check/tests |
| review loop | wip | rehydrate from AgilePlus agent-dispatch branch; run focused test |
| Civis | ! | repair stale manifest/verification drift, regenerate only after green gates |
| Tracera / BytePort / pheno | ~ | preserve dirty owned trees; audit one lane at a time |

## Rules

No resets, forced pushes, or unrelated cleanup. Do not mark a lane complete without current command
evidence. Historical disposable worktree paths are not publication claims.
