# Exact-candidate base health

An issue is an incident index, not a certificate of the current branch state.
No open issue means UNKNOWN until current execution evidence proves otherwise.

## Resolve the evidence

1. Resolve the live base SHA and record the timestamp. Resolve the contributor
   head and combined candidate separately when working on a PR.
2. Find the applicable workflow runs for that exact SHA. Read their event,
   profile, attempt, terminal job results and retained artifacts.
3. For the Release-Green observer, use its versioned report verifier when present;
   compare the recorded validator exit, candidate SHA and event/profile. A quick
   push receipt covers only quick checks. Even a valid full observer receipt does
   not replace applicable CI jobs absent from that observer.
4. Read the incident body and latest comments for diagnostic history. An issue
   from an older SHA, a closed issue, an empty search or outer workflow success
   alone does not establish PASS. If artifacts expired or identity is missing,
   report UNKNOWN/INCOMPLETE and state the missing evidence.
5. Re-resolve the branch before any admission decision. A changed SHA invalidates
   the previous candidate's acceptance.

## Causal classification

- BASE-RED: the same failure signature reproduced on the exact base and candidate
  under comparable command, runtime and configuration.
- PR-RED: candidate fails while its exact base passes the comparable requirement.
- INFRA-RED: positive evidence of runner, installation, network or resource failure.
- OBSERVER-RED: execution and parser/artifact/aggregate disagree.
- DRIFT: a measured policy/budget difference; acceptance follows the actual required
  gate, never an automatic baseline increase.
- FLAKY: controlled repeated runs demonstrate alternating results.
- UNKNOWN: evidence is insufficient for the classifications above.

Queued, pending, in-progress, cancelled and missing results are not PASS.
A skipped lane is acceptable only when the applicable policy explicitly excludes
it; record that reason. Draft fast paths cannot certify a code candidate.
Fork `action_required` means execution awaits approval, not contributor code failure.

## Recovery and handoff

Repair confirmed base failures in their own branch/worktree and preserve
contributor attribution. Record unverified signatures as hypotheses, not inherited
defects. Compare each affected requirement instead of copying an old issue's
failure list onto every new PR.

A base problem may explain a PR's red but does not turn required failure into
acceptance. Merge, approval, release, deploy and administrative ruleset changes
still require their own authority. No issue closure or baseline update is a
substitute for a successful exact-candidate execution.
