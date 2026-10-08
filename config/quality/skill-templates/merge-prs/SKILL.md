---
name: merge-prs
description: Consume analyzed PR plans, implement authorized fixes with contributor credit, validate exact candidates, and merge only owner-selected and explicitly authorized groups through the shared gates. Requires prior review evidence; unknown or failing required checks remain HOLD.
---

# Execute analyzed PR plans

Read `../_shared/base-green.md`, `../_shared/validation-gate.md`,
`../_shared/merge-gates.md`, `../_shared/protected-surfaces.md` and
`../_shared/credit-preservation.md` before execution. Their authority and evidence
boundaries apply throughout; no throughput exception waives required checks.

## 1. Reconcile and choose

Refresh live PR states/heads/bases, worktree ownership, freeze state and existing
plans under `_tasks/pipeline/prs/1-analyzed/`. Preserve other sessions' claims.
No plan means return to review; an explicit owner request for inline review may
authorize a bounded mini-analysis, not skip validation or merge authorization.

Present the organization report by readiness and contributor/theme, including
review rating, scope, risks, mandatory fixes and recommendation. Sound ideas that
need substantial work may be offered for uplift; do not dispatch it without the
owner's choice. The owner selects the items/groups, then receives a merge dossier:
what enters, leaves or changes; authorship; dependencies; validation; risks;
rollback; order and final candidate identity. Obtain explicit authorization for
that group. General permission to continue development is not merge permission.
An explicit owner instruction naming PRs and requesting their merge can satisfy
the selection/dossier decision; record the scope, but retain all safety gates.

Claim only selected eligible plans via the pipeline's atomic move into
`2-implementing/`; if another session wins, stop that item. Stage owned paths only
in the separate private `_tasks` repo and regenerate its index when appropriate.
Merged items go to `3-done/` with actual evidence; closed/unmerged items are not
reported as delivered. Age alone does not establish that a claim is abandoned.

## 2. Repair without losing credit

Create an isolated worktree at the observed contributor head. Verify identity
before changing anything and recheck the remote predecessor before every push.
Implement only the approved mandatory items, with RED-to-GREEN proof and affected
suites. Preserve original authorship and appropriate maintainer co-authorship.
Do not stash, reset a contributor branch, overwrite unrelated edits or force-push
over concurrent work. Reconstruct only in a separate recovery branch after owner
review; locked forks follow the credit-preservation protocol and stay open.

Use fragments-first changelog entries where supported. During synchronization,
verify sibling entries remain intact; do not overwrite the complete changelog.
Live validation or credentials that are genuinely required remain an explicit
HOLD, with a durable release-drain record; they are not optional because CI passed.

## 3. Validate and admit

Use the exact-candidate contract from the shared validation/merge rules. Local
fast checks, head-only `pre_greened` stamps, a previous day's full train, an empty
incident list, or `DRIFT` alone never grant admission. Do not run a fallback
command after a failed gate to manufacture success. Missing/contradictory artifacts
and incomplete build/package evidence remain failures or HOLD.

Base failures require exact-base reproduction and repair in their own PR; they
do not justify an administrative bypass. Fork `action_required` requires a reviewed
trust decision for the exact head/workflow and explicit approval authority. Never
auto-approve every pushed fork run. A cancelled/slow check is not automatically
flaky or infrastructure-related; establish the cause from evidence.

When the owner has authorized the group and all required checks pass, merge only
through `../_shared/merge-gates.md`, serialized. Immediately recheck freeze, PR
head, base, candidate and protected surfaces. Any movement or retarget invalidates
the receipt. A full train tip cannot authorize different intermediate squash
trees. Skip held items without silently expanding the approved batch.

## 4. Reconcile the outcome

Read back actual merged state/SHA and credit, refresh the base, retain artifacts
and update only owned private plans. Track the post-merge base validation separately.
Do not mark prepared/draft PRs or unmerged patches complete.

Closing/defer/subsumed dispositions need separate explicit per-item owner approval.
Prove supersession by affected behavior and direction, not an issue-number match.
Keep reporter/contributor credit and explain the precise scope in any authorized
public response. Do not close a PR merely because its code was cherry-picked.

End with counts of merged, prepared, held and still-failing items plus exact
evidence. Teardown only owned clean backed-up worktrees under the shared teardown
protocol. Preserve the shared checkout and do not update memory without a request.
