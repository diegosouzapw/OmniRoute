---
title: "Quality Evidence Contract"
version: 3.8.51
lastUpdated: 2026-09-21
---

# Quality evidence contract

## Scope and owners

The release-acceptance report is a versioned interface, not an informal summary of
green check marks. Its schema is
[`config/quality/release-acceptance.schema.json`](../../config/quality/release-acceptance.schema.json).
The repository owner and quality-gate maintainers own the schema and reducer. Gate
maintainers own their command results. CI and the release captain consume those
results; contributors do not own failures inherited from the base or runner.

The producer adapters live in
[`scripts/quality/release-acceptance/`](../../scripts/quality/release-acceptance/).
[`validate-release-acceptance.mjs`](../../scripts/quality/validate-release-acceptance.mjs)
loads a plan and manifests, reduces them, validates the report schema and writes the
report. Its command-line interface accepts `--plan`, `--manifests` and `--out`.

The current `release-acceptance.yml` workflow is a **shadow** integration using
fixtures. A successful fixture run is not proof that the actual release, its tests,
or its artifact passed. Enforcing real release admission requires real producers
and a reviewed required-gate plan; this document does not claim that rollout is complete.

## Version 1 semantics

Each planned gate instance is identified by `gate_id`, `suite_id`, `shard_index`
and `shard_total`. Every result must belong to the plan's exact `tested_sha`,
`run_id` and `run_attempt`. A valid SHA-shaped string is insufficient if it names
a different revision.

| Observation                                                             | Interpretation                                                                      |
| ----------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| One matching required `PASS`, with exit code zero                       | Eligible evidence for that gate, subject to the rest of the report validation       |
| Required `FAIL` with a positive exit code                               | Failed execution; causality still requires comparison with the exact base           |
| Missing record, duplicate instance, unknown status or identity mismatch | Incomplete or conflicting evidence; never `VERIFIED`                                |
| `PASS` with a nonzero or absent exit, or `FAIL` with exit zero          | Inconsistent producer result; treated as an infrastructure error                    |
| Required skip or infrastructure error                                   | `UNVERIFIED`, unless a separate valid required failure already establishes `FAILED` |
| Empty required-gate set                                                 | `UNVERIFIED`                                                                        |

The final verdict is `VERIFIED`, `FAILED` or `UNVERIFIED`. The CLI exits 0, 1 or 2,
respectively. These values describe validation evidence, not contributor blame.
A failure in an artifact prerequisite propagates to its dependents with a `cause`;
infrastructure uncertainty must not become a fabricated test failure.
Infrastructure errors use the status value INFRA_ERROR declared in
[the acceptance status definitions](../../scripts/quality/release-acceptance/types.mjs);
this is a result status, not an environment variable.

## Freshness, compatibility and rollout

A new candidate SHA requires new evidence. Results from another run attempt cannot
be spliced into a current report merely because their gate names match. Historical
reports remain historical: never rewrite their identities to make them current.
Re-execute the affected gates when evidence must be refreshed.

The identity and consistency checks tighten version 1's existing meaning without
renaming fields. Producers that emitted mismatched identities, contradictory exits,
or duplicate results now receive `UNVERIFIED` instead of a false verification. Fix
the producer and replay the commands; do not remove the validation to retain green.

Breaking field or meaning changes require an explicit schema version and a migration
review with both producers and consumers. Additional fields also require review:
version 1 rejects unknown properties. Deploy parser and producer changes together
in shadow mode, exercise valid and invalid fixtures, then review activation of any
required GitHub check separately.

The schema and reducer are not a process supervisor. They do not by themselves
provide heartbeat, descendant-process cleanup, artifact-byte verification or a
complete production gate inventory. Those capabilities need their own execution
and integration evidence before admission can be declared complete.

## Regression evidence

The reducer, schema and CLI are exercised by
[`release-acceptance-reduce.test.ts`](../../tests/unit/release-acceptance-reduce.test.ts),
[`release-acceptance-schema.test.ts`](../../tests/unit/release-acceptance-schema.test.ts)
and [`release-acceptance-cli.test.ts`](../../tests/unit/release-acceptance-cli.test.ts).
The identity regressions cover another SHA, run and attempt, duplicate PASS records,
unknown execution status and contradictory exits. Existing prerequisite and shard
tests remain part of the acceptance boundary.
