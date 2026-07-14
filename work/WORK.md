[Civis:blocked | quality manifest stale | powers/bevy repairs required]

# Civis Work Ledger

## Governing Scope And Current Evidence (2026-07-14)

This top section is the sole active control plane for this file. Scope is Civis only. No
OmniRoute, Tracera, AgilePlus, DesktopDeploy, Vercel, or other polyrepo lane below the archive
marker may set Civis priority, state, ownership, or release readiness.

- `.ci/quality-manifest.json` attests stale SHA `5066ab663...` while the recorded Civis HEAD is
  `4706ac1b8`; regenerate it only after current quality gates pass.
- PR #1382 remains gated pending current Civis verification evidence.
- `civ-voxel` pins `KooshaPari/phenotype-gfx` at `7ed27211554f`; local dependency checkout dirt is
  not evidence against the immutable pin.
- `crates/powers/src/registry.rs` contains incompatible `PowerRegistry` models. Preserve the
  66-power catalog, 37 Live powers, public APIs, serialization, and consumer behavior in repair.
- Civis commit `facc1f822` is not merge-ready: `clients/bevy-ref/src/bin/bevy_window.rs` retains a
  stray `}` near the recorded line 1632 and requires a superseding validated repair.
- All evidence above is a revalidation queue, not an `ok` claim. An active task closes only with
  a dated command, CI URL, PR, commit, or exact path recorded in this governing section.

## Active Civis Tasks

- [ ] CV001 Record the current Civis branch, HEAD, and worktree status.
- [ ] CV002 Inventory Civis linked worktrees without modifying them.
- [ ] CV003 Identify protected staged and untracked Civis paths.
- [ ] CV004 Verify the active PR #1382 head and base SHAs.
- [ ] CV005 Capture current PR #1382 checks and review state.
- [ ] CV006 Compare the quality-manifest SHA with current Civis HEAD.
- [ ] CV007 Document every quality-manifest input and generator command.
- [ ] CV008 Run the quality-manifest verifier before regeneration.
- [ ] CV009 Classify each current Civis quality-gate failure.
- [ ] CV010 Assign an owner and exit condition to every blocking failure.
- [ ] CV011 Reproduce the powers registry compiler failure in isolation.
- [ ] CV012 Map all `PowerRegistry` definitions and consumers.
- [ ] CV013 Select the canonical static registry model from current APIs.
- [ ] CV014 Remove the divergent registry model without compatibility shims.
- [ ] CV015 Preserve all 66 required powers in the repaired catalog.
- [ ] CV016 Preserve the 37 required Live powers in the repaired catalog.
- [ ] CV017 Preserve registry lookup and iteration public APIs.
- [ ] CV018 Preserve power serialization and deserialization contracts.
- [ ] CV019 Preserve synergy module reachability from registry consumers.
- [ ] CV020 Preserve cooldown module reachability from registry consumers.
- [ ] CV021 Add a test asserting the 66-power catalog count.
- [ ] CV022 Add a test asserting the 37 Live-power count.
- [ ] CV023 Add representative registry lookup tests.
- [ ] CV024 Add registry serialization round-trip tests.
- [ ] CV025 Add consumer-level tests for synergy behavior.
- [ ] CV026 Add consumer-level tests for cooldown behavior.
- [ ] CV027 Reject registry repairs that weaken oracle thresholds.
- [ ] CV028 Run focused powers crate formatting checks.
- [ ] CV029 Run focused powers crate lint checks.
- [ ] CV030 Run focused powers crate tests.
- [ ] CV031 Reproduce the Bevy window parse failure at current HEAD.
- [ ] CV032 Inspect the recorded stray brace near line 1632.
- [ ] CV033 Compare `facc1f822` with its parent and current Civis HEAD.
- [ ] CV034 Create a superseding isolated Bevy window repair.
- [ ] CV035 Preserve all Bevy window event handlers during repair.
- [ ] CV036 Preserve Bevy window state transitions during repair.
- [ ] CV037 Run rustfmt on the repaired Bevy window source.
- [ ] CV038 Run focused Bevy reference-client compilation.
- [ ] CV039 Run focused Bevy reference-client tests.
- [ ] CV040 Record why `facc1f822` must not merge unchanged.
- [ ] CV041 Verify the phenotype-voxel git pin resolves at `7ed27211554f`.
- [ ] CV042 Build `phenotype-voxel` at the pinned revision.
- [ ] CV043 Build `civ-voxel` against the immutable pin.
- [ ] CV044 Build `civ-engine` after voxel dependencies pass.
- [ ] CV045 Build the Civis server after engine gates pass.
- [ ] CV046 Build Civis protocol crates after engine gates pass.
- [ ] CV047 Build Civis Bevy clients after server and protocol gates pass.
- [ ] CV048 Record the exact dependency build order and results.
- [ ] CV049 Verify no local phenotype-gfx dirt affects pinned builds.
- [ ] CV050 Audit Cargo.lock changes for intentional dependency movement.
- [ ] CV051 Run workspace metadata validation.
- [ ] CV052 Run workspace formatting validation without bulk rewrites.
- [ ] CV053 Split formatting debt into independently reviewable batches.
- [ ] CV054 Validate the single-file `civ-watch` formatting batch.
- [ ] CV055 Run focused clippy for every touched crate.
- [ ] CV056 Run focused tests for every touched crate.
- [ ] CV057 Run the authoritative Civis workspace build gate.
- [ ] CV058 Run the authoritative Civis workspace test gate.
- [ ] CV059 Run the authoritative Civis workspace lint gate.
- [ ] CV060 Scan touched Civis files for secrets and credential leakage.
- [ ] CV061 Audit touched error paths for sensitive data leakage.
- [ ] CV062 Check touched Rust modules remain within file-size policy.
- [ ] CV063 Review all changed public APIs for unintended breakage.
- [ ] CV064 Verify generated files match their source generators.
- [ ] CV065 Regenerate the quality manifest only after green gates.
- [ ] CV066 Re-run the manifest verifier against regenerated output.
- [ ] CV067 Confirm the regenerated manifest attests current HEAD.
- [ ] CV068 Attach dated command evidence for each green gate.
- [ ] CV069 Re-run PR #1382 checks on the verified commit.
- [ ] CV070 Resolve or explicitly gate every remaining PR #1382 failure.
- [ ] CV071 Review PR #1382 diff for scope and unrelated churn.
- [ ] CV072 Review PR #1382 for generated artifact correctness.
- [ ] CV073 Review PR #1382 for dependency and supply-chain risk.
- [ ] CV074 Record commit and PR links for each validated slice.
- [ ] CV075 Ensure each slice has an accountable owner and exit condition.
- [ ] CV076 Merge only slices with current green evidence.
- [ ] CV077 Verify post-merge Civis default-branch checks.
- [ ] CV078 Record residual Civis blockers without promoting them to `ok`.
- [ ] CV079 Publish the Civis-only release-readiness decision.
- [ ] CV080 Close the Civis ledger only after owner acceptance and green CI.

## Parked Polyrepo Archive

Everything below this disclaimer is preserved historical multi-repo evidence. It is parked,
non-governing, and inactive: its brackets, tasks, WBS rows, status protocol, and release claims
must not alter the Civis-only scope or active task state above.

[OmniRoute:✓, Tracera:◐, AgilePlus:○, DesktopDeploy:✗, Vercel:◐]

This fixed sponsor cockpit bracket is a skim line only; it is not an exhaustive ownership or
status source. The governing organization status is the `ORG-P0..ORG-P5` control plane below.

# OmniRoute / Phenotype Work Ledger

Canonical polyrepo handoff for the long-horizon AgilePlus/Phenotype DAG. Preserve unrelated dirty
trees; use isolated worktrees for overlapping implementation; update this file instead of creating
parallel handoff ledgers.

## Objective

Advance dashboard cleanup, cockpit bridge automation, lifecycle/review-loop regression coverage,
targeted validation, dirty-tree containment, commit preparation, and handoff/push when feasible.

## Cross-Project Governance (2026-07-13)

Sponsor direction is governed across the active OmniRoute, Tracera, AgilePlus, DesktopDeploy,
Vercel, and Civis dependencies. The cockpit bracket intentionally names only its fixed sponsor
skim lanes; Civis remains governed through `ORG-P3` and `GAP-ORG-005`, rather than being added to
that bracket. `ORG-P0..ORG-P5` is the sole organization control plane for prioritization, state,
and release decisions. Older execution WBS, gap, current-slice, and recovery tables below are
subordinate evidence records; they cannot independently promote, demote, or release a lane.

## Live DAG (2026-07-12)

```text
ROOT-WORK-HANDOFF
|- LEDGER                         [wip] recreated after checkout moved to older root commit
|  `- next                         preserve concurrent staged work and keep this file canonical
|- OMNIROUTE-CI                   [wip] isolated repair 6597cb0cf verified build + typecheck
|- AGILEPLUS-COCKPIT              [wip] historical isolated commit 418e597; rehydrate and revalidate
|  |- ownership_bracket            [wip] historical port needs rehydration and current validation
|  `- next                         restore a proper AgilePlus worktree and rerun cargo check/tests
|- REVIEW-LOOP                    [wip] final-cycle regression passes 1/1 in rehydrated worktree
|  |- implementation               [wip] 9d16bba delay seam + Pending -> Approved final-cycle test
|  `- validation                    [wip] isolated manifest repair 0f306f6; focused test green
|- CIVIS                          [!] quality manifest SHA stale; PR1382/core verification needs repair
|  |- game dependency              [wip] phenotype-gfx::phenotype-voxel pinned at 7ed27211554f
|  |- build order                  [wip] phenotype-voxel -> civ-voxel -> civ-engine -> server/protocol/bevy
|  `- first source gate            [!] duplicate incompatible PowerRegistry models in crates/powers/src/registry.rs
|  |- bevy window repair            [!] facc1f822 still has stray `}`; superseding fix required
|  `- powers registry repair        [wip] retain static origin-main model; remove divergent Vec model
|     `- rejected attempt            [!] no-go: collapsed 66-power catalog to 1 and removed public APIs
|- POLYREPO-CONTAINMENT            [wip] current root preserved; staged unrelated work not touched
`- NEXT                           [wip] rehydrate isolated lanes, validate, then publish only green work
```

## Evidence

- Root checkout is `feat/pr1-extend-omni-core`; current working tree contains concurrent staged
  changes outside `work/` and they are intentionally preserved.
- OmniRoute post-merge defects were isolated and repaired: duplicate `clinepassProvider` registry
  entry and unresolved Bifrost conflict markers. Build/typecheck passed in isolated worktree.
- Cockpit port added routes, event/session state, SQLite hydration, `ownership_bracket` propagation,
  POST-to-snapshot and SQLite round-trip tests. The disposable worktree no longer exists, so this is
  historical evidence until rehydrated and rerun.
- Review-loop port added an injectable delay seam and deterministic Pending/Unknown -> Approved
  final-cycle regression. Rehydrated validation passes the focused test 1/1; isolated manifest fix
  `0f306f6` supplies the missing `tonic-build` declaration. Full filter remains slow by design.
- Civis manager audit reports `.ci/quality-manifest.json` attests stale SHA `5066ab663...` while
  HEAD is `4706ac1b8`; PR1382 remains gated. Disposable Civis verification worktrees were removed.
- Civis dependency audit confirms `KooshaPari/phenotype-gfx` is the sole active external gaming
  dependency. It is pinned by `civ-voxel` at `7ed27211554f`; local `phenotype-gfx` Cargo.lock
  dirt cannot affect the immutable source. The active failure is in-tree: duplicate `PowerRegistry`
  models and redefined types in `crates/powers/src/registry.rs` introduced after known-green state.
- Isolated Civis commit `facc1f822` repaired most BOM/duplicate/structure corruption in
  `clients/bevy-ref/src/bin/bevy_window.rs`, but independent rustfmt audit found a remaining stray
  `}` at line 1632; do not merge it unchanged. A superseding isolated repair is required.
- Workspace formatting baseline is 135 files / 752 hunks / 4,618 lines of churn plus the unparsed
  Bevy window file. Smallest independent batch is `civ-watch` (one file, one indentation hunk).
- Powers reconciliation review rejected the first isolated diff: it reduced the required 66-power
  catalog to one power, orphaned synergy/cooldown modules, removed serialization contracts, and let
  the oracle self-adjust its threshold. Replacement work must preserve 66 total / 37 Live powers,
  public APIs, serialization, and consumer-level tests before manifest regeneration.

## Ownership / Next Actions

| lane                       | state | next owner action                                                           |
| -------------------------- | ----- | --------------------------------------------------------------------------- |
| OmniRoute                  | wip   | retain isolated repair evidence; rerun remote checks when adopted           |
| AgilePlus cockpit          | wip   | fresh proper worktree at `418e597`; finish cargo check and route tests      |
| review loop                | wip   | focused final-cycle test passes 1/1 in `/private/tmp/agileplus-review`      |
| Civis                      | !     | repair stale manifest/verification drift, regenerate only after green gates |
| Tracera / BytePort / pheno | ~     | preserve dirty owned trees; audit one lane at a time                        |

## Rules

No resets, forced pushes, or unrelated cleanup. Do not mark a lane complete without current command
evidence. Historical disposable worktree paths are not publication claims.

## Forward Task DAG (Subordinate Execution Plan; owner: root manager; refreshed 2026-07-12)

Tasks are intentionally concrete and resumable. Agents may claim a task by adding their name and
evidence here; they must preserve protected staged work and close their child session before exit.
This task DAG is subordinate to `ORG-P0..ORG-P5`; it does not define organization state or release
authority.

### Coordination and evidence

- [ ] T001 Reconcile the current root status and record protected paths.
- [ ] T002 Refresh this ledger after every merged slice.
- [ ] T003 Generate a repo ownership bracket for every cockpit tick.
- [ ] T004 Record command evidence for every `[ok]` claim.
- [ ] T005 Keep a single canonical ledger; merge temporary handoffs into this file.
- [ ] T006 Inventory active worktrees without deleting disposable user work.
- [ ] T007 Detect stale claims older than one session and downgrade them to `[wip]`.
- [ ] T008 Publish a dependency tree spanning OmniRoute, Tracera, AgilePlus, and Civis.
- [ ] T009 Preserve all staged sponsor changes during agent work.
- [ ] T010 Create a release-readiness checklist from verified gates only.

### OmniRoute CI and quality

- [ ] T011 Refresh PR #289 checks on `KooshaPari/OmniRoute`.
- [ ] T012 Inspect the first failed Lint log and classify the root cause.
- [ ] T013 Inspect one Vitest failure representative.
- [ ] T014 Inspect one native unit-shard failure representative.
- [ ] T015 Inspect one Node compatibility failure representative.
- [ ] T016 Inspect coverage and quality-ratchet failures after root cause clustering.
- [ ] T017 Fix one CI root cause in an isolated OmniRoute worktree.
- [ ] T018 Run focused native tests for touched modules.
- [ ] T019 Run focused Vitest tests for touched modules.
- [ ] T020 Run `oxlint` on all touched TypeScript and JavaScript files.
- [ ] T021 Run `oxfmt` or the repository formatter on touched files.
- [ ] T022 Run `tsgo`/typecheck according to the active package scripts.
- [ ] T023 Run test-discovery validation and document frozen orphans.
- [ ] T024 Re-run the complete local gate required by the failing CI job.
- [ ] T025 Commit only the isolated validated CI slice.
- [ ] T026 Push the slice and poll PR checks to convergence.
- [ ] T027 Repair stale self-healing tests or explicitly keep them quarantined with a dated issue.
- [ ] T028 Audit generated docs/count checks against source before publishing claims.
- [ ] T029 Audit security-sensitive changes for secret and error leakage.
- [ ] T030 Record CI evidence and remaining failures in this ledger.

### High-performance runtime and client surfaces

- [ ] T031 Inventory current Next.js, Electron, Rust, Go, Caddy, and CLI surfaces.
- [ ] T032 Identify the owned OmniRoute fork and upstream relationship with command evidence.
- [ ] T033 Define the canonical high-throughput transport matrix: HTTP, Unix socket, WS, RPC, GraphQL.
- [ ] T034 Benchmark Unix socket versus loopback HTTP for local control-plane calls.
- [ ] T035 Benchmark streaming HTTP versus WebSocket for long-lived model streams.
- [ ] T036 Specify JSON-RPC/A2A compatibility boundaries and version contracts.
- [ ] T037 Specify GraphQL scope only for management/query workloads, not streaming inference.
- [ ] T038 Select a canonical desktop client and tray client based on maintained source evidence.
- [ ] T039 Compare CLIProxyAPI management console, Vibeproxy Swift UI, and native alternatives.
- [ ] T040 Evaluate Windows, Linux, and macOS install/update paths.
- [ ] T041 Prototype one thin native client against the canonical API contract.
- [ ] T042 Add smoke tests for Unix socket, HTTP, WS, and RPC lifecycle behavior.
- [ ] T043 Add backpressure, cancellation, timeout, and reconnect tests for streams.
- [ ] T044 Measure p50/p95/p99 latency and throughput under representative concurrency.
- [ ] T045 Document the chosen client architecture and rejected alternatives.

### Tracera, AgilePlus, and deployment

- [ ] T046 Rehydrate the AgilePlus cockpit commit in a proper worktree.
- [ ] T047 Run Cargo check and focused tests for the cockpit bridge.
- [ ] T048 Rehydrate the review-loop commit from the agent-dispatch branch.
- [ ] T049 Repair missing nested Cargo manifests or document the exact blocker.
- [ ] T050 Verify ownership-bracket propagation through event, session, SQLite, and snapshot paths.
- [ ] T051 Audit Tracera FRs against implementation and tests.
- [ ] T052 Close the highest-impact Tracera FR gap with focused tests.
- [ ] T053 Verify Tracera Caddy routes for Go core and Python edge paths.
- [ ] T054 Verify Docker Compose configuration with supplied secrets and intentional mounts.
- [ ] T055 Obtain Docker build evidence on the home desktop runner.
- [ ] T056 Obtain Docker up/health/log evidence for the gateway and API.
- [ ] T057 Verify Vercel JSON, function packaging, and deployed health endpoint.
- [ ] T058 Verify serverless API behavior without cgo-only dependencies.
- [ ] T059 Add deploy evidence to the appropriate session documents.
- [ ] T060 Verify desktop/client installation and first-run health on macOS.
- [ ] T061 Verify equivalent install/health paths on Windows and Linux.
- [ ] T062 Audit Python-core boundaries and move only proven core paths to Rust/Go.
- [ ] T063 Add migration contracts and rollback-free forward tests for each moved boundary.
- [ ] T064 Repair Civis quality-manifest SHA drift after its gates are green.
- [ ] T065 Run cross-repo smoke checks from the canonical gateway to each backend.

### Publication and handoff

- [ ] T066 Review all changed files for scope, secrets, generated artifacts, and file-size limits.
- [ ] T067 Run the narrowest authoritative validation for each completed task.
- [ ] T068 Update the DAG statuses and evidence links in `work/WORK.md`.
- [ ] T069 Commit clean slices with descriptive conventional messages.
- [ ] T070 Push only explicitly authorized branches; never force-push.
- [ ] T071 Record PR, commit, and deployment URLs in the ledger.
- [ ] T072 Close child agents and capture their final summaries.
- [ ] T073 Publish a cockpit tick with repo bracket, progress tree, DAG, and agent table.
- [ ] T074 Mark unresolved external/runtime gates as `[wip]`, not `[ok]`.
- [ ] T075 Start the next unblocked task automatically on the following session.

## Historical Execution WBS (Subordinate Evidence)

These pre-organization rows remain historical execution evidence. They are subordinate to the
governing `ORG-P0..ORG-P5` rows and the consolidated Status Protocol. `preserve` and
`reclaim-pending` are recovery-only exceptional states; map them to governing `hold` and `wip`,
respectively, before any organization-level transition. `todo`, `wip`, `ok`, `blocked`, `defer`,
and `hold` otherwise have the meanings defined in the governing protocol.

| id      | phase       | owner             | state   | depends_on        | deliverable                          | evidence                                         | next_transition                                           |
| ------- | ----------- | ----------------- | ------- | ----------------- | ------------------------------------ | ------------------------------------------------ | --------------------------------------------------------- |
| WBS-001 | queue/merge | root              | ok      | -                 | PR #6856 merged                      | `gh api repos/diegosouzapw/OmniRoute/pulls/6856` | verify post-merge CI and record residual failures         |
| WBS-002 | queue/merge | root              | defer   | WBS-001           | PR #6855 oldest open lane            | `gh api repos/diegosouzapw/OmniRoute/pulls/6855` | re-audit after 48h cutoff; resolve RFC #6933 requirements |
| WBS-003 | queue/merge | root              | defer   | WBS-002           | PR #6794 packaged-electron fix       | `gh api repos/diegosouzapw/OmniRoute/pulls/6794` | re-audit after activity cutoff and release rebase         |
| WBS-004 | provider/CI | root              | ok      | WBS-001           | xAI exact-cost validation follow-up  | commit `8574e9d78`; PR #6856                     | retain merged evidence; watch regressions                 |
| WBS-005 | cockpit     | AgilePlus owner   | wip     | ROOT-WORK-HANDOFF | ownership bracket persistence        | historical commit `418e597`                      | rehydrate isolated worktree; run cargo checks             |
| WBS-006 | review-loop | review-loop owner | wip     | WBS-005           | deterministic final-cycle regression | historical commit `9d16bba`                      | rehydrate nested workspace; run focused tests             |
| WBS-007 | Civis       | Civis owner       | blocked | -                 | quality-manifest SHA repair          | `.ci/quality-manifest.json` audit                | update attestation, then rerun gates                      |

## Dependency DAG

```text
WBS-001 (merged #6856)
  -> WBS-002 (oldest open; cutoff + RFC/security/rebase gates)
      -> WBS-003 (electron release rebase + E2E evidence)
WBS-005 (cockpit rehydrate) -> WBS-006 (review-loop validation)
WBS-007 (Civis manifest repair) -> PR1382 verification
```

## Gap / QA Matrix

| gap_id  | surface            | expected invariant                                 | current state | severity                  | verification                                      | owner                                       | exit condition                                       |
| ------- | ------------------ | -------------------------------------------------- | ------------- | ------------------------- | ------------------------------------------------- | ------------------------------------------- | ---------------------------------------------------- |
| GAP-001 | OmniRoute PR queue | no merge before review + green CI + cutoff         | `defer`       | P1                        | `gh api .../pulls?state=open` + checks            | root                                        | eligible PR has all required checks passing          |
| GAP-002 | PR #6855           | migrations and phase split are release-safe        | `hold`        | P1                        | PR comments + conflict check                      | root                                        | RFC #6933, rebase, perf/security notes, phase split  |
| GAP-003 | PR #6794           | release branch has no unresolved electron conflict | `defer`       | P1                        | `gh api .../pulls/6794`                           | root                                        | rebase clean and packaged evidence attached          |
| GAP-004 | #6856 CI           | merged change has no unexplained regression        | `wip`         | P2                        | check-runs for merged SHA                         | root                                        | residual failed shard triaged or rerun by maintainer |
| GAP-005 | AgilePlus cockpit  | isolated commit is reproducible                    | `wip`         | P1                        | `cargo check --manifest-path AgilePlus/Cargo.toml && cargo test --manifest-path AgilePlus/Cargo.toml` from the repositories root | AgilePlus owner                             | current command evidence recorded                    |
| GAP-006 | review loop        | nested workspace is complete                       | `blocked`     | P1                        | focused Cargo test                                | review-loop owner                           | manifests restored and test passes                   |
| GAP-007 | Civis              | attested SHA equals verified HEAD                  | `blocked`     | P1                        | quality-manifest verifier                         | Civis owner                                 | regenerated manifest and green quality gate          |

## Evidence Log

Earlier records below remain historical context. Current session records support the governing
`ORG-P0..ORG-P5` rows. Every new or changed governing state requires its own dated Evidence Log
record under the consolidated Status Protocol at the end of this ledger.

| timestamp_utc        | event_id        | lane            | state | evidence                                                  | operator |
| -------------------- | --------------- | --------------- | ----- | --------------------------------------------------------- | -------- |
| 2026-07-12T05:04:21Z | EVT-6856-MERGED | OmniRoute #6856 | ok    | merged PR head `374b5c8a94008e31174afde18ca24a773044d8e0` | root     |
| 2026-07-12T23:31:15Z | EVT-6855-CUTOFF | OmniRoute #6855 | defer | updated `2026-07-12T01:45:53Z`; `mergeable_state=dirty`   | root     |
| 2026-07-12T23:31:15Z | EVT-6794-CUTOFF | OmniRoute #6794 | defer | updated `2026-07-12T12:55:34Z`; `mergeable_state=clean`   | root     |
| 2026-07-12T23:31:15Z | EVT-QUEUE-EMPTY | OmniRoute queue | defer | no open non-draft PR older than 48h                       | root     |
| 2026-07-14T06:58:21Z | EVT-OMNI-SCOPED-QUALITY | OmniRoute quality | wip | commits `2daf05a66`, `0e70c560`; cwd `/Users/kooshapari/CodeProjects/Phenotype/repos/OmniRoute/.worktrees/omni-quality-gates`: `npm exec --yes tsx -- --test tests/unit/db-migration-legacy-slots.test.ts tests/unit/db-migrationrunner-constants-split.test.ts` passes 8/8, `node scripts/check/check-migration-numbering.mjs` reports 120 migrations and 0 duplicates, and `npm run check:db-rules` passes; aggregate fast scan is not rerun and five other failure classes remain open | OmniRoute owner |
| 2026-07-14T06:58:21Z | EVT-AGILE-TRACEABILITY | AgilePlus traceability | wip | commits `5012517`, `2914790`, `32f6641`, `0f9f237`; cwd `/Users/kooshapari/CodeProjects/Phenotype/repos/AgilePlus/.claude/worktrees/codex-traceability`: `actionlint .github/workflows/agileplus-traceability.yml`, `yamllint .github/workflows/agileplus-traceability.yml`, and `git diff --check 5012517^ 0f9f237` pass; net change adds the pinned traceability workflow and deletes the echo stub | AgilePlus owner |
| 2026-07-14T06:58:21Z | EVT-AGILE-022-BLOCKED | AgilePlus governance | blocked | cwd `/Users/kooshapari/CodeProjects/Phenotype/repos/AgilePlus/.claude/worktrees/codex-traceability`: `python3 tooling/governance_index.py --check-schema` reports `kitty-specs/022-batch13-repo-remediation missing plan.md`; `git log --all --oneline -- kitty-specs/022-batch13-repo-remediation/plan.md` finds only the temporary add/remove in `5012517` and `2914790`, not an authoritative source | AgilePlus owner |

## Current Slice Evidence (2026-07-12)

| id   | state   | evidence                                                                                                                                                               | next transition                                                                        |
| ---- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| T011 | ok      | PR #289 is merged: `gh` reports merge commit `195ccdbc30748101318ea9d3fd79120a206cb5e7`; historical failures are not an open gate.                                     | refresh the default-branch workflow queue before any new CI fix                        |
| T053 | wip     | `OmniRoute/deploy/docker-compose.scale.yml` defines `omniroute-1/2/3:3000`; prior `deploy/Caddyfile` defaulted to nonexistent `omniroute-base:20129`.                  | validate the corrected Caddy route in runtime                                          |
| T054 | wip     | `docker compose -f OmniRoute/deploy/docker-compose.scale.yml config` exits successfully after the Caddy route change.                                                  | run Caddy config validation and health probes                                          |
| T055 | blocked | `Tracera/docker-compose.yml` references `./Dockerfile`, but `Tracera/Dockerfile` is absent; only `Dockerfile.local` and `.container-runtime-context/Dockerfile` exist. | choose and implement the canonical build context in an isolated Tracera worktree       |
| T057 | wip     | `Tracera/vercel.json` builds `frontend` only and contains no backend function rewrites.                                                                                | document frontend-only scope or add a verified serverless adapter                      |
| T033 | wip     | `omniroute-rust` exposes Axum TCP HTTP/SSE; no Unix socket, gRPC, WebSocket, or GraphQL implementation was found.                                                      | add transport decision record and benchmark plan before claiming enterprise throughput |

## Worktree Recovery Evidence (Subordinate/Historical, 2026-07-13)

| id      | state           | evidence                                                                                                                                                                                                                                                  | next transition                                                                                                        |
| ------- | --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| WTR-001 | wip             | Oldest recoverable OmniRoute worktree is `repos/omniroute-wtrees/fix-5211-mcp-auth` on `fix/5211-mcp-internal-auth`, last updated 2026-06-28; it is clean, tracks `upstream/release/v3.8.39`, and is `+2/-13` with no fork PR.                            | audit the delta, rebase only in an isolated recovery lane, then validate and publish a focused PR if still applicable. |
| WTR-002 | preserve        | `repos/OmniRoute/.worktrees/fix-5976-ci-rescue` contains more than 200 tracked deletions under `docs/i18n`; no fork PR covers it.                                                                                                                         | snapshot and publish a recoverable branch before resolving or removing any content.                                    |
| WTR-003 | preserve        | `repos/OmniRoute/.claude/worktrees/land-pr016` is a detached, conflicted worktree with `UU open-sse/executors/base.ts`; its HEAD duplicates `qgate-reusable`.                                                                                             | capture the conflict state or resolve it in a dedicated recovery worktree before cleanup.                              |
| WTR-004 | reclaim-pending | `feat-cc-responses-parity`, `feat-omniroute-qgate`, `fix-untracked-files`, `reconcile-prep`, and `rebase-pr016` map to merged PRs #174, #219, #211, #212, and #221; none is eligible for deletion until commit containment and clean status are verified. | prove containment, remove generated residue where applicable, then reclaim the worktree and branch metadata.           |

## Org Ledger Refresh (2026-07-13)

This refresh supersedes no implementation evidence. It records the organization-level control
plane and downgrades unverified claims to `wip`, `blocked`, or `hold` until current commands or
CI can be re-run.

### Org WBS

| id | phase | state | owner | depends_on | evidence | exit |
| -- | ----- | ----- | ----- | ---------- | -------- | ---- |
| ORG-P0 | inventory/freshness | wip | root manager | - | `cd /Users/kooshapari/CodeProjects/Phenotype/repos && git worktree list --porcelain && git -C OmniRoute status --short && git -C AgilePlus status --short`; recovery rows `WTR-001..004` | all active repository status, branch, worktree, and freshness records are current |
| ORG-P1 | status/evidence schema | wip | root manager | ORG-P0 | `work/WORK.md`; `rg -n -e "ORG-P[0-5]" -e "Status Protocol" -e "Evidence Log" work/WORK.md` | every tracked lane has a machine-recheckable owner, dependency, evidence, and exit condition |
| ORG-P2 | QA/gap matrix | wip | QA owner | ORG-P1 | `EVT-OMNI-SCOPED-QUALITY`: scoped migration and DB rules pass at `2daf05a66` / `0e70c560`; aggregate fast scan remains unverified with five other failure classes open | run `cd /Users/kooshapari/CodeProjects/Phenotype/repos/OmniRoute/.worktrees/omni-quality-gates && npm run quality:scan:fast`, then give every remaining P0/P1 failure class a current disposition |
| ORG-P3 | PR/CI/router corpus/cockpit/C0-C10/AgilePlus FR gaps | blocked | OmniRoute, Civis, AgilePlus owners | ORG-P2 | `EVT-AGILE-TRACEABILITY` records scoped workflow checks; `EVT-AGILE-022-BLOCKED` records the missing authoritative plan; `Civis/.ci/quality-manifest.json`; PR #1382 | PR and CI corpus refreshed; router/cockpit C0-C10 and FR gaps have verified owners and exits |
| ORG-P4 | machine sync | blocked | platform owner | ORG-P3 | `work/agileplus-work.db`; reproducible read/write check while writer-coordinated | safe writer-coordinated sync completes and records a reproducible read/write check |
| ORG-P5 | release handoff | hold | release owner | ORG-P3, ORG-P4 | governing `ORG-P0..ORG-P4` evidence; PR #1382; dated Evidence Log records | handoff contains only current green commands/CI, PR links, and owner acceptance |

### Gap / QA Evidence (2026-07-13)

| gap_id | surface | state | evidence | owner | exit |
| ------ | ------- | ----- | -------- | ----- | ---- |
| GAP-ORG-001 | OmniRoute quality scan | wip | commits `2daf05a66`, `0e70c560`; focused legacy migration/constants tests pass 8/8, migration numbering reports 120 migrations / 0 duplicates, and `check:db-rules` passes; aggregate fast scan is unverified and five other failure classes remain open | OmniRoute owner | run `cd /Users/kooshapari/CodeProjects/Phenotype/repos/OmniRoute/.worktrees/omni-quality-gates && npm run quality:scan:fast`; attach current results and resolve or triage all remaining failures |
| GAP-ORG-002 | AgilePlus governance and planning | blocked | `EVT-AGILE-022-BLOCKED`: spec `022` lacks authoritative `plan.md`; repository history finds no source beyond the temporary add/remove in `5012517` and `2914790` | AgilePlus owner | obtain an authoritative plan from its owner, then add it and rerun the schema validator; do not synthesize one |
| GAP-ORG-003 | AgilePlus traceability | wip | commits `5012517`, `2914790`, `32f6641`, `0f9f237` net-add the SHA-pinned traceability workflow and delete the echo stub; actionlint, yamllint, and range diff checks pass | AgilePlus owner | run the pinned workflow in CI and map every remaining FR gap to current test or command evidence |
| GAP-ORG-004 | AgilePlus machine sync | blocked | `work/agileplus-work.db` is `SQLITE_BUSY`; writer ownership is active | platform owner | coordinate with the writer, then run a non-contentious sync/readback check |
| GAP-ORG-005 | Civis PR/manifest | blocked | `Civis/.ci/quality-manifest.json` is stale; PR #1382 remains unresolved | Civis owner | regenerate/verify the manifest only after current quality gates pass and refresh PR evidence |
| GAP-ORG-006 | router corpus and cockpit C0-C10 | wip | `OmniRoute/scripts/quality/run-all-gates.mjs`; `AgilePlus/.github/workflows/fr-coverage.yml`; no current corpus/cockpit C0-C10 result is recorded | OmniRoute and AgilePlus owners | record current corpus/cockpit coverage, failures, and accountable exits |

### Status Protocol (Governing, 2026-07-13)

This is the sole state-transition protocol. A transition is valid only when both its governing
`ORG-P0..ORG-P5` row and a dated Evidence Log record are updated in the same ledger change. Each
record must include a machine-recheckable command, CI URL, PR ID, commit, or exact repository path.
`ok` requires current command or CI evidence; historical commits, prior chat, and stale manifests
may establish context but cannot establish `ok`. `blocked` names the concrete prerequisite and the
responsible next action. `hold` is an intentional release, review, or security gate. `defer` is an
intentional dated cutoff. `todo` is unstarted work and `wip` is active work. `preserve` and
`reclaim-pending` are exceptional subordinate recovery labels only, never governing organization
states; normalize them to `hold` and `wip` before recording an `ORG-P*` transition. A blocked row
does not authorize speculative edits in a dirty worktree.
