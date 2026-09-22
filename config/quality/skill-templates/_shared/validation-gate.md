# Validation gate: evidence before acceptance

Read `base-green.md`. The current workflows and versioned policy define required
checks; a static manifest is an inventory of its modeled scope, not an assertion
that every runtime, security or delivery gate is represented. Measure counts.

## 0. Reconcile identity and environment

Record base/head/candidate SHA and tree, command/profile, runtime/toolchain,
lockfile identity, run/attempt and timestamps. Use an owned isolated worktree.
Wait for checkout and dependency installation to finish before collecting evidence.
Borrowed dependencies can support diagnosis but cannot certify a clean install.
Physical dependencies are required for standalone packaging; no external symlink.

## 1. Prove the behavior

Run a focused RED test on the unfixed code, make the smallest proven correction,
then GREEN and affected regressions. Setup/network/auth failures are not assertion
proof. For documented behavior changes, update obsolete fixtures while preserving
the intended assertions and negative cases. Never loosen thresholds or tolerances
solely to obtain green. Quarantined tests remain visible debt, not passing coverage.

Determine runner membership from every applicable collector's include minus
exclude configuration, then execute the test with its actual runner. Passing
discovery does not prove execution. Both Node and Vitest lanes are required where
the current candidate policy says so; they cover different files.

## 2. Preserve the result

Capture the real command exit, stdout/stderr, timeout/signal classification and
machine report. Do not infer success from a wrapper, `tail`, absent findings or a
fallback command. Validate artifact identity/schema and reject missing, stale,
duplicate or contradictory receipts. A process interrupted before completion has
not passed, even if its last printed tests did.

## 3. Candidate acceptance

Fast/focused/quick profiles may guide repair; they are PARTIAL. A full observer
run is still only its implemented profile. Acceptance requires every applicable
required workflow lane, including coverage/security/build/package/boot where
required, on the same current candidate under the supported environment.

Compare failures against the exact base before calling them PR-RED. Base-red,
DRIFT, flaky, infrastructure and observer problems stay separately classified;
none converts required failure into PASS. Advisory checks are nonblocking only
by explicit policy, and may still report genuine defects. Do not rebaseline
automatically or pretend an unavailable external check has passed.

An old head's green result, docs-only resync or mergeable status cannot certify
a changed candidate. Re-query identities immediately before admission. Fork
approval pending, cancelled, missing and unexpected skipped lanes mean HOLD or
INCOMPLETE, not contributor failure or success.

## 4. Live validation and authority

When a behavior genuinely needs credentials, browser, hardware or deployment,
state the exact missing acceptance and owner action. Deploy only with explicit
authorization through the appropriate deployment skill; preserve secret hygiene.
Testing authority does not include paid calls, merge, publication or ruleset changes.

Report exact scope and evidence. Only the authorized merge/release process can
use completed receipts for admission; this validation document grants no mutation
authority and no automatic bypass.
