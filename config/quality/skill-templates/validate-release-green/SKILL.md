---
name: validate-release-green
description: Run or inspect the local Release-Green observer for an exact base or combined PR candidate, separating hard failures, advisory drift and incomplete evidence. Use for maintainer preflight; full CI acceptance remains a separate requirement.
---

# Validate Release-Green

Read `../_shared/base-green.md` before interpreting remote status or attributing
a failure. Resolve the current base and candidate SHA; use an isolated worktree.
The observer validates that working tree, not an abstract branch name.

## Select and execute the actual profile

Inspect `scripts/quality/validate-release-green.mjs`, its npm entrypoint and the
candidate's workflows before choosing flags. On candidates that provide them:

- `npm run check:release-green -- --quick`: partial fast diagnosis.
- `npm run check:release-green -- --full-ci --with-build --hermetic --json`:
  the observer's broader static/test/package profile; this is still not a promise
  of parity with every workflow lane.

The versioned static gate manifest, if present, describes static scan membership,
not all observer or admission jobs. Report unmodeled coverage explicitly.

Build in a worktree with physical dependencies, never an external node_modules
symlink. Preserve stdout/stderr, process receipts and the validator's own exit.
Read the report even when the outer job is green. Missing, contradictory, stale,
cancelled or timed-out evidence cannot establish PASS.

## Interpret and compare

HARD is the observer's blocking classification; DRIFT is its diagnostic bucket.
Neither class alone proves causality. Compare the same requirement on the exact
base before calling a defect contributor-introduced. A ratchet classified as
advisory locally can still block in the applicable CI workflow.

A green local profile means only that profile passed. Record remaining lanes,
including relevant Node/Vitest suites, coverage, security, build, package/boot and
external checks. Do not stamp merge-ready or pre-greened based on a focused run,
a draft skip, a closed incident or an old head SHA.

For machine reports, use `scripts/ci/release-green-result.mjs` when available on
the candidate. It checks the observed exit, exact SHA and event/profile; supply
the values from the run rather than inventing an exit code. The report verifier
does not establish that omitted workflow requirements ran.

## Handoff

Report SHA, profile, command, versions, raw log/artifact locations, hard failures,
drift, incomplete lanes and causal confidence. Re-query live refs before using
the result for a later decision. A full-current observer PASS may resolve its
own incident only through the authorized workflow; it cannot close unrelated
requirements or authorize a merge, baseline change, release or deployment.

This skill is diagnostic. Implement fixes only when the user requested changes.
Keep thresholds, assertions, contributor credit and action boundaries intact.
