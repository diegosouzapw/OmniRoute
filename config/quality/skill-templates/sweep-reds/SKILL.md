---
name: sweep-reds
description: Repair confirmed CI failures base-first, then prepare affected PRs one at a time with exact-candidate evidence. Use when asked to sweep reds or restore the queue. Never merges, closes PRs, weakens tests, or changes CI under ordinary sweep authority.
---

# Sweep reds: base first, then affected PRs

Read `../_shared/base-green.md` and `../_shared/validation-gate.md`.
Success means verified required checks, not a disappearing incident or green wrapper.

## Boundaries

- Never merge, close PRs or change release-freeze state through this skill.
- Never stash, alter the shared checkout, or touch another session's active worktree.
- Never weaken assertions, expand tolerances, suppress failures or raise a baseline
  to make a check green. A proven workflow defect requires an explicitly scoped
  gate-repair task; ordinary sweep authorization does not authorize CI mutation.
- Run live credentialed/paid tests, deployment or trust approvals only with the
  appropriate owner authorization. Missing access is HOLD, not PASS.

## A. Base health

1. Resolve live main/release refs and freeze state read-only. Confirm the intended
   development branch; a frozen branch remains off limits.
2. Follow the shared exact-SHA evidence protocol. Closed/missing incidents mean
   UNKNOWN unless current applicable executions establish PASS. A quick observer
   receipt is partial; the last incident comment is only a diagnostic worklist.
3. Reproduce each signature on an isolated pinned base. Keep setup/install failures
   separate from assertions. Open one owned branch/worktree per independently
   reviewable repair, with RED-to-GREEN proof; avoid duplicating another session's PR.
4. Prepare/babysit the fix PR under the authorized scope, then hand it to the owner.
   Do not claim the base is repaired until the fix is integrated and the new exact
   base passes. The authorized observer, not this skill, manages its incident.

## B. PR queue

Inventory requested open PRs and their current head/base/candidate identities.
Classify required failure, advisory failure, pending, stale, cancelled and approval
needed separately. Work one PR at a time, checking ownership before each mutation.

An inherited label requires the same measured signature on the exact base, not
membership in an old incident list. For stale evidence, obtain a newly constructed
candidate under the current base; a rerun still uses the original run identity.
Updating a contributor branch or approving a fork run needs its own authority.

An advisory check is nonblocking only if the current policy says so. Its failure
may be a real product defect; advisory is not an infrastructure diagnosis. A PR
with advisory failures is admissible only after all required applicable gates
pass on the current candidate and the remaining risks are reported.

For proven PR defects use the `/babysit` repair discipline: RED, minimal fix,
focused/affected suites and complete candidate validation. Preserve contributor
credit. If five iterations do not converge, report the evidence and owner decision
needed, then continue eligible independent items; never relabel failure as green.

## Report

Record base and PR SHAs, failure signatures/counts, causal confidence, commits,
run/attempt/artifact evidence, full versus partial validation and holds. Keep
advisory debt visible. Hand the owner the prepared PRs and unresolved decisions;
this skill never authorizes their merge.
