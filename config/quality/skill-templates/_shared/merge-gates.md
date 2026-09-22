# Merge gates: current candidate, explicit authority

Read `base-green.md`, `validation-gate.md`, `protected-surfaces.md` and
`credit-preservation.md`. This protocol replaces historical fast-train, old-head
and base-red administrative exceptions. It never authorizes a merge by itself.

## 1. Freeze and authority immediately before mutation

Require owner authorization for the selected PR/group and explicit per-PR approval
for protected instruction surfaces. Read current freeze state and intended release
branch immediately before admission. If the authorized target is frozen, HOLD.
A new development branch or retarget is a new candidate: review scope, refresh the
owner decision where needed, and validate before merging. Never retarget and merge
in one block using the previous target's checks.

## 2. Base and head verification

Resolve live base SHA, head SHA and tested combined candidate SHA/tree. Confirm
the PR is still open and no other session owns active changes. Default contributor
target is the approved active release; infrastructure companions may explicitly
target main. Do not infer the target from stale local refs or the default branch.

Any head/base/policy change invalidates the receipt. Require successful applicable
checks for the new identity. Draft skips, `MERGEABLE`, a head-only stamp or lack of
branch protection is not acceptance. Recheck immediately before the merge; where
available use server-enforced required checks/merge queue and expected-head matching.
If a race cannot be excluded or the tool cannot preserve the tested candidate,
HOLD rather than pretend a read-then-write sequence is atomic.

## 3. Failure discrimination

Reproduce the same signature on the exact base under comparable environment before
calling it inherited. A content read can establish a static defect but cannot
replace runtime execution. Different SHA/runtime/install state is not a valid
comparison. A closed issue, common failure name or frequency is not causal proof.

Collect evidence for infrastructure/resource failures; shutdown alone does not
prove OOM. Alternating controlled runs are needed to call a failure flaky. Do not
cancel another session's jobs or classify a slow job as hung from elapsed time alone.
Required base-red/DRIFT/infra failures block admission until repaired and revalidated.

## 4. No green-by-bypass

Do not use `--admin`, override rules, approve unreviewed fork code or change baselines
to bypass a failed/incomplete required gate. Emergency authority, if requested by
the owner, is a separate exceptional decision with explicit scope, risks and audit;
it does not convert the result into PASS. Routine merge authority grants none of it.

## 5. Changelog and credit

Prefer one changelog fragment per PR where the release supports it. Preserve sibling
entries during resync and validate integrity. A changelog-only change still changes
the candidate and needs the applicable policy's checks. Never reuse an old full PASS
as a blanket exemption. Record actual contributor author/co-author attribution.

## 6. Locked forks

If push authority is missing, keep the original PR open and follow the owner-reviewed
credit-preserving fallback. Use a separate repair PR with original author/co-author
and explicit public credit when appropriate; do not reset/overwrite the contributor
branch or land directly on a protected release. The replacement candidate must pass
its own gates. Closing the original requires separate per-item owner authorization.

## 7. Batch/train validation

A train can diagnose interactions and validate its exact final candidate. It cannot
authorize different intermediate squash trees or later heads. Each actual landing
must satisfy required candidate checks through an approved server queue or another
reviewed identity-preserving protocol. `--fast` and a once-daily full run are partial
evidence only. Record base, ordered heads, final SHA/tree, policy and all receipts.

Run in an owned isolated worktree with matching dependencies and bounded resource
allocation. Never commandeer a runner's active `_work` directory, change global git
configuration, or deploy/build on a live service host just because it appears idle.
Remote execution needs authorized capacity; failure/unreachability means HOLD.
Keep real exit status; never fall back to a smaller command after a failed full gate.

## 8. Readback and companion fixes

After an authorized merge, verify actual merged state/SHA/tree and contributor credit.
Refresh the base and validate its post-merge state; report divergence immediately.
Prepare a main companion for gate/infra fixes when semantically applicable, on its
own current main base. Preserve main-specific baselines and dependencies. Opening
a companion is not authority to merge it, and release success is not main success.

Update only owned private plans and retain evidence before any safe teardown.
Report prepared versus integrated versus currently validated separately.
