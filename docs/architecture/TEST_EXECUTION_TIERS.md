---
title: Test execution tiers and efficiency rollout
---

# Test execution tiers and efficiency rollout

The work tracked in [#12539](https://github.com/diegosouzapw/OmniRoute/issues/12539)
is incremental. Moving files does not itself reduce execution time, and a quick
subset does not establish full-suite correctness or coverage.

## Commands

The canonical collectors live in [package.json](../../package.json).

| Command                                      | Scope                                                                           |
| -------------------------------------------- | ------------------------------------------------------------------------------- |
| `npm run test:unit`                          | Full Node suite, followed by dashboard and serial phases                        |
| `npm run test:unit:quick`                    | Opt-in subset of those same phases; default concurrency 4                       |
| `npm run test:unit:quick -- --list`          | Print selected and excluded files without executing tests                       |
| `npm run test:unit:quick -- --concurrency 8` | Run the subset with concurrency 8; serial stays at 1                            |
| `npm run test:vitest`                        | Separate Vitest collector; not included in the Node quick tier                  |
| `npm run test:integration`                   | Default integration collector                                                   |
| `npm run test:integration:e2e`               | Slower hermetic integration scenarios                                           |
| `npm run test:integration:live`              | Upstream-dependent integration scenarios, retaining their existing opt-in gates |
| `npm run test:coverage`                      | Full coverage gate; the quick tier does not replace it                          |

The [quick runner](../../scripts/test/unit-quick-tier.mjs) expands the canonical
Node globs instead of maintaining a second directory allowlist. It excludes the
exact top-level groups `combo`, `compression`, `provider`, `misc`, `db`, and `issue`,
including their `.mjs` files. New canonical groups are included automatically.
Dashboard files retain the full `tsx` loader, serial files retain concurrency 1,
and each file retains process and temporary data-directory isolation. Failures
produce a nonzero exit even when later batches pass. Overlapping collectors or
an unsupported canonical command layout fail visibly.

The six exclusions came from the measurements recorded in
[#12589](https://github.com/diegosouzapw/OmniRoute/issues/12589), each at least 95
seconds at concurrency 10. This is a provisional directory-based tier, not a
guarantee that every remaining file is fast. Use `--list` for current membership;
each execution prints per-batch elapsed time and exit status.

## Recovery snapshot: 2026-09-05

The previous work had three distinct parts:

1. [#12588](https://github.com/diegosouzapw/OmniRoute/pull/12588): relocate flat unit
   files and update their collectors, imports, impact selection, and mutation
   paths. The recovery fixes the DB import and selector drift in this parent and
   removes 23 dashboard files from the first phase, where they were also selected
   for execution under the wrong loader.
2. [#12606](https://github.com/diegosouzapw/OmniRoute/pull/12606): move eight slow
   hermetic and seven gated live integration files into explicit tiers. Their
   assertions remain intact. This branch depends on the relocation parent.
3. Quick tier and measured bottlenecks: the old local quick-tier prototype was
   unpublished. The replacement preserves isolation and collector membership;
   it does not adopt the prototype's shared-process execution. The initial
   recovered plan selected 3,898 of 4,946 files and left 1,048 in the full suite.

The earlier duplicate audit found no exact duplicates. Similar-looking suites
were not deleted merely because their filenames or subjects overlapped.

## Measured fixes and remaining validation

- Five Batch API cases spent about 53 seconds waiting for scheduler ticks in a
  local concurrency-8 run. They now call the existing `processPendingBatches()`
  and `waitForAllBatches()` helpers and use deterministic fetch responses. The
  success case requires successful output instead of accepting bad credentials.
  The 46 related Batch and processor tests passed in 3.05 seconds as a group;
  scheduler startup/shutdown coverage remains in the processor suite.
- Two Redis factory tests stalled for over five minutes. Their fake servers
  answered once per TCP chunk, losing replies when ioredis pipelined commands.
  The shared test server frames complete RESP commands and retains partial data.
  All five factory tests passed in 0.28 seconds after the fix, preserving probe
  sharing, fallback, and socket-release assertions. Each case has a 10-second
  failure bound.
- These are local measurements, not a before/after benchmark of the complete
  suite. The first quick run required terminating the two stalled Redis test
  processes; that run cannot be reported as an uninterrupted success. Its outer
  runner summaries recorded 29,723 passes, 26 failures (including those two
  terminated files), and 20 skips across 29,769 tests. The subsequent focused
  regression run passed 66 tests, and Vitest passed 465 tests in 51 files.
- Release-base failures remain tracked in
  [#12732](https://github.com/diegosouzapw/OmniRoute/issues/12732). The existing
  repair candidate [#12333](https://github.com/diegosouzapw/OmniRoute/pull/12333)
  is separate from this test reorganization. Require completed full Node,
  Vitest, integration, and coverage results on the eventual combined base before
  declaring the overhaul complete. The 60/60/60/60 coverage floor is unchanged.

Six additional local failure files were rerun on the unchanged integration-tier
parent with the canonical Node loader and concurrency 8. The same nine failures
reproduced there, so they are not introduced by the quick runner:

- `tests/unit/api/v1/relay-completions-errors.test.ts`: plain-text upstream 404
  is observed as 502 in the local environment.
- `tests/unit/audit/audit-timeline.test.ts`: two today/yesterday expectations
  fail in the Asia/Seoul environment.
- `tests/unit/call/call-log-file-rotation.test.ts`: the orphan cleanup count is
  3 instead of 5.
- `tests/unit/cli/cli-runtime-extended.test.ts`: a supposedly unavailable CLI
  is found on the local machine.
- `tests/unit/run/runner-janitor.test.ts`: three shell-fixture cases fail on
  macOS.
- `tests/unit/uc/uc-video.test.ts`: the never-ready timeout case fails.

These are follow-up reproduction targets, not waived assertions. They need
individual root-cause fixes or platform-appropriate fixtures; a green run of
the base repair candidate alone does not establish that all local tests pass.

The landing order is relocation, integration tiers, then the quick-tier
continuation. After those dependencies land, remeasure the full and quick suites
under the same runtime and concurrency, audit remaining timer/network/DB-heavy
cases, and move or repair one coherent group at a time.
