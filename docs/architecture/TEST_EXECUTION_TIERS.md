---
title: Test execution tiers and efficiency rollout
---

# Test execution tiers and efficiency rollout

The work tracked in [#12539](https://github.com/diegosouzapw/OmniRoute/issues/12539)
is incremental. Moving files does not itself reduce execution time, and a quick
subset does not establish full-suite correctness or coverage.

## Commands

The canonical collectors live in [package.json](../../package.json).

| Command                                                     | Scope                                                                           |
| ----------------------------------------------------------- | ------------------------------------------------------------------------------- |
| `npm run test:unit`                                         | Full Node suite, followed by dashboard and serial phases                        |
| `npm run test:unit:quick`                                   | Opt-in subset of those same phases; default concurrency 4                       |
| `npm run test:unit:quick -- --list`                         | Print selected and excluded files without executing tests                       |
| `npm run test:unit:quick -- --concurrency 8`                | Run the subset with concurrency 8; serial stays at 1                            |
| `npm run test:unit:quick -- --report /tmp/unit-quick.jsonl` | Save file timings, phase summaries, and worker exit statuses as JSONL           |
| `npm run test:vitest`                                       | Separate Vitest collector; not included in the Node quick tier                  |
| `npm run test:integration`                                  | Default integration collector                                                   |
| `npm run test:integration:e2e`                              | Slower hermetic integration scenarios                                           |
| `npm run test:integration:live`                             | Upstream-dependent integration scenarios, retaining their existing opt-in gates |
| `npm run test:coverage`                                     | Full coverage gate; the quick tier does not replace it                          |

The [quick runner](../../scripts/test/unit-quick-tier.mjs) expands the canonical
Node globs instead of maintaining a second directory allowlist. It excludes the
exact top-level groups `combo`, `compression`, `provider`, `misc`, `db`, and `issue`,
including their `.mjs` files. New canonical groups are included automatically.
Dashboard files retain the full `tsx` loader, serial files retain concurrency 1,
and each file retains process and temporary data-directory isolation. Failures
produce a nonzero exit even when later phases pass. Overlapping collectors or
an unsupported canonical command layout fail visibly.

Each phase uses one Node test scheduler. File paths arrive through stdin, so the
OS command-line length limit does not split a phase into sequential batches.
An available worker slot can start the next file while earlier slow files finish.
Test children retain `--test-force-exit`; the scheduler drains its reporter before
exiting. This also preserves skip/TODO exit semantics and complete failure output.

The six exclusions came from the measurements recorded in
[#12589](https://github.com/diegosouzapw/OmniRoute/issues/12589), each at least 95
seconds at concurrency 10. This is a provisional directory-based tier, not a
guarantee that every remaining file is fast. Use `--list` for current membership;
each execution prints per-phase elapsed time and exit status. The optional JSONL
report begins with runtime, concurrency, and membership, then records file and
phase test counts and durations. An `exit` record includes worker startup errors
or termination signals even when that worker cannot produce a test summary.
File durations come from Node's test summaries; phase exit durations also include
scheduler and loader overhead. Reports are local artifacts and should not be
committed.
Scripts for which Node emits only a file completion are recorded with
`source: "completion"` and `counts: null`; their duration includes startup.
Phase counts remain Node's aggregate result and must not be reconstructed by
summing file records.

## Scheduler and fixture follow-up: 2026-09-07

The quick runner now removes inherited `DATA_DIR` and `SQLITE_FILE` overrides so
the existing preload can allocate a separate temporary directory for each file.
Its regression suite checks that behavior, phase loaders, serial scheduling,
failure/TODO/skip exit semantics, long file lists, leaked handles, JSONL reporting,
and complete reporter output. All 14 runner tests passed on Node 22.22.2,
24.20.0, and 26.8.1.

The fixture changes retain assertions and remove dependencies unrelated to the
behavior being tested:

- Compression TTL and provider/combo recovery tests advance a Date-only fake
  clock. The tests now check the state immediately before expiration and after
  the boundary, without sleeping for it.
- JobRegistry tests use mocked timers and flush asynchronous handlers with
  `setImmediate`. Cron firing is checked at 999ms and 1,000ms; changing a cron
  expression must preserve the already scheduled tick and use the new cadence.
  Stop/dispose tests flush the active handler before advancing time so the
  re-entrancy guard cannot hide a timer that was not cancelled.
- Adobe's mocked HTTP tests disable optional browser refresh and submit pacing
  through existing configuration. The fixtures restore every changed variable.
- Audit timestamps use local calendar dates. CLI path-validation fixtures call
  the existing path validator; other cases retain runtime-level discovery tests.
  Janitor fixtures supply deterministic tool output and retain missing-tool,
  pressure, dry-run, and cleanup checks without host-tool skips.
  The binary-manager rollback fixture compares real paths while retaining its
  exact Windows executable-path assertion, accommodating macOS temporary-path
  symlink aliases.

Local focused runs passed all 154 tests in the 11 changed test files in 1.75s.
Individual file runs reduced compression from about 5.38s to 0.41s, Adobe from
about 18.29s to 0.5s, and JobRegistry from about 13.5s to 1.5s. These individual
measurements do not establish a whole-suite speedup. Vitest separately passed
465 tests in 51 files.

A local comparison on Node 26.8.1 selected the same 3,903 of 4,951 files with
concurrency 8 and ran the old and new schedulers sequentially. The old runner
took 391.26s across nine main-phase batches; the new runner took 310.36s, a 20.7%
reduction. Both runs included the fixture fixes described above. This measures
the scheduler change on this machine, not an additional reduction from the
individual fixture improvements or a complete CI/coverage benchmark.

The quick comparison was not green: the new scheduler reported 29,752 passes,
19 failures, and 20 skips. All selected files executed; two legacy scripts needed
the completion-event reporting fallback described above. The old CLI's totals
differed (29,715 passes, 18 failures, 20 skips), including failed-file aggregation
and schedule-sensitive failures. Use the selected file set when interpreting the
timing comparison, not identical assertion totals.

The canonical full Node main phase at its configured concurrency 20 recorded
37,301 passes, 20 failures, and 22 skips. Because that failure stopped the chained
command, dashboard and serial were run separately: dashboard passed 164 with one
failure; serial passed all 23. The binary-manager fixture was subsequently fixed
and passed all 20 focused tests. The remaining full-suite failures are unresolved;
the quick tier and fixture fixes do not establish a green release base.

Test discovery passed with 5,540 files and 34 collectors, retaining nine frozen
orphans. The runner-API and changed-file ESLint checks passed. Whole-repository
lint remains blocked by stale suppressions in 12 unchanged files; an audit with
a pruned temporary suppression copy passed without changing those repository
entries. `check:docs-all` remains blocked by existing migration-count drift
(169 versus 170) in `README.md`, `AGENTS.md`, and `llm.txt`; its other component
checks passed. These inherited gates and full coverage remain landing blockers.

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

The September 7 follow-up fixes the audit, CLI, and janitor fixtures above:
their 34 tests now pass, including audit runs in Asia/Seoul and UTC. The remaining
failures are not waived assertions. A green run of the base repair candidate
alone does not establish that all local tests pass.

The landing order is relocation, integration tiers, then the quick-tier
continuation. After those dependencies land, remeasure the full and quick suites
under the same runtime and concurrency, audit remaining timer/network/DB-heavy
cases, and move or repair one coherent group at a time.
