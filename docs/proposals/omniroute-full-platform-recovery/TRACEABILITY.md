---
title: "Traceability: OmniRoute full-platform recovery"
lastUpdated: 2026-09-14
---

# Requirement traceability

| Requirement                                        | Source                        | Implementation owner | Evidence required                                          | Ticket                                                                                                                   |
| -------------------------------------------------- | ----------------------------- | -------------------- | ---------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| Full dashboard is mandatory                        | PRD FR-1 to FR-4              | Build/package owner  | Full build command, build-mode record, UAT-01 to UAT-06    | [JON-1228](https://linear.app/palermo/issue/JON-1228/omniroute-package-and-accept-a-full-dashboard-memory-fix-candidate) |
| Candidate includes reviewed memory fix             | PRD FR-7                      | JON-562 owner        | Commit/package hash map; 100k/300k/600k profile evidence   | [JON-562](https://linear.app/palermo/issue/JON-562/omniroute-profile-and-eliminate-long-session-memory-growth)           |
| Candidate recovers stale pressure safely           | PRD FR-5 and FR-6             | JON-563 owner        | Route-level red/green test; packaged-candidate result      | [JON-563](https://linear.app/palermo/issue/JON-563/omniroute-fix-stale-pressure-admission-lockout)                       |
| Package preserves dashboard assets                 | Technical spec artifact proof | Build/package owner  | Package check, clean boot, selected asset response         | [JON-1228](https://linear.app/palermo/issue/JON-1228/omniroute-package-and-accept-a-full-dashboard-memory-fix-candidate) |
| Dashboard works for a real operator                | PRD FR-2 and FR-3             | QA owner             | UAT-01 to UAT-05 screenshots, final URLs, console summary  | [JON-1228](https://linear.app/palermo/issue/JON-1228/omniroute-package-and-accept-a-full-dashboard-memory-fix-candidate) |
| API and UI are same release unit                   | PRD FR-4                      | QA owner             | UAT-06 and UAT-07 identity and request results             | [JON-1228](https://linear.app/palermo/issue/JON-1228/omniroute-package-and-accept-a-full-dashboard-memory-fix-candidate) |
| 48-hour evidence is valid                          | PRD FR-8 and FR-9             | Release/QA owners    | Frozen manifest, time series, error ledger, review verdict | [JON-559](https://linear.app/palermo/issue/JON-559/omniroute-prove-48-hour-stability-and-roll-out-reversibly)            |
| Unusable service is contained                      | JON-560 contract              | Operations owner     | Readiness/fault evidence, controlled drain/recovery record | [JON-560](https://linear.app/palermo/issue/JON-560/omniroute-contain-memory-and-recover-alive-but-unusable-service)      |
| Required concurrency is not hidden by a workaround | JON-561 contract              | Policy owner         | Frozen workload, queue/throughput/memory results           | [JON-561](https://linear.app/palermo/issue/JON-561/omniroute-calibrate-concurrency-and-bound-queued-memory)              |
| Rollback restores the full product                 | PRD FR-10                     | Release operator     | Restored identity plus UAT-01/UAT-03/UAT-06/UAT-07         | [JON-559](https://linear.app/palermo/issue/JON-559/omniroute-prove-48-hour-stability-and-roll-out-reversibly)            |

## Claim-binding template

Each evidence artifact starts with this record:

| Field         | Required value                                                 |
| ------------- | -------------------------------------------------------------- |
| Claim         | Exact requirement and UAT/test IDs proved                      |
| Ticket        | Existing JON ID or replacement Linear ID                       |
| Candidate     | Git commit, package version, `dist/BUILD_SHA`, tarball SHA-256 |
| Configuration | Redacted configuration digest and workload hash                |
| Execution     | UTC and AEST timestamp, command or UAT steps, exit code/result |
| Evidence      | Redacted logs, screenshots, measurements, review verdict       |
| Limits        | What this result does not prove                                |

An evidence record without candidate identity, a specific claim, and a result is not acceptance evidence.
