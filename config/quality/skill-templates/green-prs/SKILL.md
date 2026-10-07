---
name: green-prs
description: Inspect and prepare the selected PR queue against its exact current base, repair authorized defects with contributor credit, and report full versus partial validation. Use for maintainer pre-greening; merging requires separate owner authorization and the shared merge gates.
---

# Green the selected PR queue

Read `../_shared/base-green.md` and `../_shared/validation-gate.md` first.
Read `../_shared/protected-surfaces.md` before any instruction-surface change or merge.
The current candidate's workflows and versioned policy define required gates;
do not assume release PRs are fast-only or use a handwritten gate count.

## 1. Resolve scope and ownership

Use the owner's PR list. Otherwise consume eligible `merge-ready` / `fix-in-place`
plans in `_tasks/pipeline/prs/1-analyzed/`; use the whole queue only when requested
or no pipeline items exist. Report drafts separately unless the owner included them.
Record current state, author, head SHA, base branch/SHA, freeze and worktree ownership.
An in-flight worktree belonging to another session means HOLD for that item.
Never work in the shared checkout, stash, or silently retarget a frozen release.

Inspect the exact base first. An incident is diagnostic history, not proof of
inheritance. Match each failure signature against the exact base under comparable
runtime and configuration. Repair confirmed base defects in a dedicated PR before
using them to assess contributor changes. Base-red does not waive a required gate.

## 2. Prepare and validate

Use one isolated branch/worktree per PR. Before editing a contributor branch,
verify the checked-out SHA equals its observed live head. Before pushing, verify
the remote still equals the observed predecessor; a concurrent change means HOLD.
Keep the original author's work and attribution, add appropriate co-authorship,
and never overwrite or close the PR to take credit. A locked fork needs the
owner-reviewed credit-preserving fallback, not a destructive reconstruction.

Run a RED reproduction, implement the proven fix, then focused and affected suites.
Dependencies must match the candidate lockfile/toolchain; borrowed tools are
diagnostic only. A build needs physical dependencies, not an external symlink.
Preserve raw logs, exits, artifacts, test discovery and all existing assertions.

Fast checks may prioritize work, but cannot grant merge readiness. Full acceptance
covers every applicable required lane, including both test runners, coverage,
security and build/package/boot where required. `DRIFT` is a diagnosis, not PASS;
do not increase baselines, lower thresholds or accept flaky required checks.
Fork `action_required` is a trust/approval HOLD, never a code failure or automatic
approval instruction. Re-running an old run does not move its recorded candidate.

## 3. Evidence and handoff

Do not claim/move pipeline plans on behalf of the merge executor. Record a
structured receipt containing base SHA, head SHA, candidate SHA/tree, policy/profile,
run IDs/attempts, artifact references, validation level and timestamp. A legacy
`pre_greened` head-only stamp or `fast-gates-only` note is partial evidence only.
Any relevant identity/policy change invalidates admission and requires revalidation.

Report each PR's causal classification, repairs, exact evidence and remaining lanes.
Separate PASS, PARTIAL, BASE-RED, PR-RED, INFRA-RED and ACTION_REQUIRED/HOLD.
This skill prepares the queue and never closes PRs. If the owner explicitly asks
to merge identified items, first follow the complete `../_shared/merge-gates.md`
protocol, including protected-surface and per-group authorization. Do not bypass
required checks because the same failure affects many PRs.

Preserve work until its commits and evidence are safely retained. Teardown only
owned, clean, fully backed-up worktrees under `../_shared/worktree-teardown.md`.
Do not delete contributor remote branches or another session's work.
