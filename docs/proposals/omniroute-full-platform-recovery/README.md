---
title: "OmniRoute full-platform recovery"
lastUpdated: 2026-09-14
---

# OmniRoute full-platform recovery

This is the recovery delta for [JON-564](https://linear.app/palermo/issue/JON-564/omniroute-stop-recurring-memory-outages-and-prove-long-session). It makes the reviewed JON-562 and JON-563 fixes releasable as a complete OmniRoute product: API and dashboard together.

## Status

**Not ready to deploy.** The reviewed integration commit is `d049af25`. Its API-only pilot proved useful API behaviour, but it intentionally compiled the dashboard into empty stubs. Jon observed a blank dashboard, so that artifact was rolled back. The current full installation is restored, but it contains neither reviewed fix.

The 48-hour monitor for `d049af25` is invalid. The deployed artifact changed before the window completed. Do not carry its elapsed time into a later qualification.

## Non-negotiable release rule

Any artifact offered to dashboard users must be built with the dashboard intact. An API-only or backend-only build is allowed only for a clearly labelled API test; it cannot satisfy dashboard UAT, release qualification, or user-facing deployment.

## Documents

- [Product requirements](./PRD.md)
- [Technical specification](./TECHNICAL-SPEC.md)
- [Implementation plan and Linear ticket drafts](./IMPLEMENTATION-PLAN.md)
- [User acceptance test plan](./UAT-PLAN.md)
- [Release and rollback runbook](./RELEASE-AND-ROLLBACK.md)
- [Requirement-to-evidence traceability](./TRACEABILITY.md)
- [Risks and decisions](./RISKS-AND-DECISIONS.md)
- [Execution goal prompt](./GOAL-PROMPT.md)

## Evidence baseline

| Item            | Verified fact                                                                                                                               | Source                                                                                             |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| JON-563         | Source-reviewed stale-pressure recovery is in PR [#13618](https://github.com/diegosouzapw/OmniRoute/pull/13618), commit `9af0c0f9`.         | PR and Linear ticket                                                                               |
| JON-562         | Source-reviewed completed-request retention fix is in PR [#13623](https://github.com/diegosouzapw/OmniRoute/pull/13623), commit `96fbc8fb`. | PR and Linear ticket                                                                               |
| Integration     | The two commits are integrated at `d049af25`.                                                                                               | Integration review bundle                                                                          |
| API pilot       | The API pilot returned successful 50k and 100k-token-equivalent `/v1/messages` requests and had zero swap after drain.                      | JON-562 evidence comment                                                                           |
| Rejection       | That same package was backend-only; UI pages were stubs and the dashboard was blank.                                                        | JON-562/JON-563 rollback comments; `scripts/build/backendOnlyPages.mjs`                            |
| Current blocker | A normal full dashboard build fails on the candidate and exact base; the review recorded 168 Turbopack errors.                              | Integration review bundle; GitHub [#12732](https://github.com/diegosouzapw/OmniRoute/issues/12732) |

The evidence bundle and Linear comments are records, not deployment instructions. Do not publish heap snapshots, prompt bodies, headers, cookies, environment values, or credential material.
