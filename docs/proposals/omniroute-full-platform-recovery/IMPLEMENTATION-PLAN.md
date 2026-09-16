---
title: "Implementation plan: full-platform recovery"
lastUpdated: 2026-09-14
---

# Implementation plan and Linear ticket drafts

This plan preserves the JON-564 contract. It adds the missing full-dashboard release path; it does not reopen the reviewed JON-562/JON-563 source changes without evidence.

## Sequence

1. **Freeze the recovery candidate.** Start from `d049af25`, inventory its reviewed diff and record the exact full-build failure on the candidate and relevant base. Check: no backend-only environment setting is present in the build invocation.
2. **Repair the full build blocker.** Fix only the source errors that prevent the normal dashboard build. Check: a new regression fails before the repair and passes after; `npm run build:release` exits 0.
3. **Prove the shipped dashboard.** Build/package/boot the same candidate in isolation, then exercise browser UAT. Check: the artifact includes dashboard assets and renders login plus authenticated UI.
4. **Run release-level reliability evidence.** Re-run JON-562/JON-563 focused evidence from the exact package, then begin a clean 48-hour qualification. Check: no candidate changes after the clock starts.
5. **Promote or roll back.** An independent reviewer accepts the claim-bound evidence. The release operator uses a reversible activation and observes both dashboard and API after the change.

## Ownership and dependencies

| Work                                     | Owner role                                 | Depends on                        | Output                                               |
| ---------------------------------------- | ------------------------------------------ | --------------------------------- | ---------------------------------------------------- |
| Full build diagnosis and repair          | senior coder; independent read-only review | Candidate and recorded build log  | Minimal fix, red/green regression, full-build output |
| Package/dashboard integrity gate         | senior coder; independent read-only review | Full build repair                 | Artifact guard and clean-install proof               |
| JON-562/JON-563 integration verification | director coordinates; reviewers judge      | Exact full artifact               | Source-to-package hash map and focused test results  |
| Browser UAT                              | QA owner with existing test account        | Clean boot of exact artifact      | UAT record, screenshots, console/network summary     |
| 48-hour qualification                    | release owner; independent QA              | UAT PASS, frozen candidate/config | Metrics, error ledger, verdict                       |
| Activation/rollback                      | authorised release operator                | Independent acceptance            | Activation and rollback observation records          |

One writer owns each worktree and file set. Code, tests, release infrastructure, and this documentation must not be edited concurrently in the same files. No deployment, restart, paid provider test, or ticket closure is authorized by this document alone.

## Linear work item

Create one high-priority child of JON-564, then replace this placeholder with its ID. JON-559 remains the only ticket for the 48-hour clock, production rollout, rollback, and final UAT.

### [JON-1228](https://linear.app/palermo/issue/JON-1228/omniroute-package-and-accept-a-full-dashboard-memory-fix-candidate): package and accept a full-dashboard memory-fix candidate

**Parent:** JON-564. **Blocks:** JON-559. **Blocked by:** JON-562 and JON-563 until their reviewed source changes are in the pinned candidate. **Related evidence:** GitHub [#13621](https://github.com/diegosouzapw/OmniRoute/issues/13621), PR [#13618](https://github.com/diegosouzapw/OmniRoute/pull/13618), and PR [#13623](https://github.com/diegosouzapw/OmniRoute/pull/13623).

#### Definition of fixed

PASS: a single pinned `release/v3.8.51` candidate includes accepted changes from PR #13618 and PR #13623, or records a reviewed equivalent for either.

PASS: `npm run build:release` succeeds with `OMNIROUTE_BUILD_BACKEND_ONLY` absent and `OMNIROUTE_BUILD_PROFILE` not set to `backend` or `contributor`.

PASS: the candidate tarball is traceable to the full build and `dist/BUILD_SHA` matches its candidate commit.

PASS: a clean installation of that tarball boots with an isolated data directory and serves the same API and dashboard product.

PASS: `/login`, Dashboard Home, Request Logs, and Conversations render nonblank content; the first-party JavaScript asset selected from page HTML returns 200 with JavaScript content.

PASS: an API-only/backend-only build cannot satisfy this ticket’s checks; no backend-only stub marker is present in a dashboard page/route served by the candidate.

#### Prove it

From a clean isolated worktree, run `npm run build:release`, `npm run check:pack-artifact`, `npm run check:pack-boot`, and `npm run check:install-upgrade`. Install only the generated tarball with separate data/config paths, then run browser UAT and the agreed no-spend API smoke from that one full-dashboard process. Attach the redacted candidate manifest, hashes, command exits, screenshots, browser console/network summary, and API result.

#### Coverage

Add a focused `tests/unit/build/` regression that fails if a release candidate enables backend-only mode or accepts a backend-only dashboard artifact. Preserve the existing package checks and name the actual UAT evidence path before closure.

## Board repairs and dependencies

Repair the real Linear parent relation of JON-562, JON-563, JON-559, JON-560, and JON-561 to JON-564 without rewriting their existing acceptance text. The new package ticket is a child of JON-564 and blocks JON-559. JON-561 informs candidate configuration; JON-560 informs canary readiness and blocks JON-559 rather than package assembly.

## Existing ticket links

| Ticket                                                                                                              | Role in this recovery                                                      |
| ------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| [JON-564](https://linear.app/palermo/issue/JON-564/omniroute-stop-recurring-memory-outages-and-prove-long-session)  | Parent reliability contract; remains open until all acceptance lines pass. |
| [JON-562](https://linear.app/palermo/issue/JON-562/omniroute-profile-and-eliminate-long-session-memory-growth)      | Completed-request memory retention fix and profiling evidence.             |
| [JON-563](https://linear.app/palermo/issue/JON-563/omniroute-fix-stale-pressure-admission-lockout)                  | Stale-pressure recovery fix.                                               |
| [JON-559](https://linear.app/palermo/issue/JON-559/omniroute-prove-48-hour-stability-and-roll-out-reversibly)       | Qualification and reversible rollout contract.                             |
| [JON-560](https://linear.app/palermo/issue/JON-560/omniroute-contain-memory-and-recover-alive-but-unusable-service) | Containment/readiness contract.                                            |
| [JON-561](https://linear.app/palermo/issue/JON-561/omniroute-calibrate-concurrency-and-bound-queued-memory)         | Measured concurrency and queue-bound policy.                               |
