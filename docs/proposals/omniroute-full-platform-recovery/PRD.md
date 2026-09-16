---
title: "PRD: OmniRoute full-platform recovery"
lastUpdated: 2026-09-14
---

# Product requirements document

## Problem

OmniRoute's current full installation again shows the memory-growth risk that JON-562 and JON-563 address. The reviewed integration was briefly deployed as an API-only package. It passed API health and request checks, but users received a blank dashboard because the package had intentionally stubbed the UI at build time. Health alone therefore did not prove a usable product.

## Product outcome

Release one exact, traceable candidate that keeps the full OmniRoute dashboard working and contains both reviewed fixes:

1. JON-562 bounds completed-request detail retention so a large completed request does not retain its backing request body.
2. JON-563 refreshes stale critical resource-pressure state at the real admission path, while retaining rejection for fresh critical pressure.

## Users and jobs

| User               | Job                                                         | Observable outcome                                                                                                 |
| ------------------ | ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| Dashboard operator | Sign in and manage OmniRoute while it is under normal load. | Login and authenticated dashboard routes render usable content and their required client assets load.              |
| API client         | Submit a long request through `/v1/messages`.               | A valid request follows the normal route; a recovered process does not remain stuck returning stale-pressure 503s. |
| Release operator   | Promote a candidate safely.                                 | The artifact, source commit, build sentinel, package, running process and recorded evidence match.                 |
| On-call operator   | Recover from a bad candidate.                               | The prior known-good full-dashboard artifact can be restored with an observed dashboard and API check.             |

## In scope

- Repair the full-dashboard build blocker that prevents a normal release artifact.
- Integrate the already reviewed JON-562 and JON-563 changes without rewriting their acceptance contract.
- Add artifact and UAT gates that distinguish a live dashboard from an API-only build.
- Qualify the exact full artifact for 48 hours after all code/configuration changes are frozen.
- Produce redacted, claim-bound evidence and a reversible rollout record.

## Out of scope

- Replacing OmniRoute, changing provider/model selection, silently truncating context, or reducing required concurrency to make graphs look better.
- Treating the backend-only build profile as a product fix.
- Publishing raw heap snapshots or running provider-spending tests without the existing authority and budget.
- Closing JON-564, JON-562, or JON-563 from unit tests, a health response, or this plan.

## Requirements

### Full product surface

- **FR-1:** A user-facing candidate must be produced by the normal full build path. `OMNIROUTE_BUILD_BACKEND_ONLY` must not be `1`; `OMNIROUTE_BUILD_PROFILE` must not select `backend` or `contributor`.
- **FR-2:** The artifact must serve `/login`, `/`, `/dashboard`, `/home`, `/dashboard/logs`, and `/dashboard/conversations`. `/` is expected to redirect through the application route.
- **FR-3:** A browser must load login, Dashboard Home, Request Logs, and Conversations without a blank document, fatal client error, or failed first-party JavaScript asset.
- **FR-4:** API smoke remains required but is not a substitute for FR-2 or FR-3. `/api/monitoring/health` and `/v1/messages` must remain usable on the same candidate.

### Reviewed reliability behaviour

- **FR-5:** After fresh measurements show pressure below recovery thresholds, each supported real admission path recovers within 10 seconds, including after one hour with no admitted work. No unrelated request or restart may be needed.
- **FR-6:** Fresh critical pressure still sheds new work. A telemetry failure may not permanently latch stale critical state or bypass known-fresh critical state.
- **FR-7:** Completed request details have a count, TTL, and byte budget. The JON-562 fixture must show no retained large backing string after drain at the covered 100k, 300k, and 600k-token-equivalent inputs.

### Qualification and release

- **FR-8:** A clean 48-hour qualification uses the exact full artifact and frozen configuration. Any candidate code or configuration change resets the clock.
- **FR-9:** The run has no manual or watchdog restart, no sustained local-pressure outage, and no unexplained retained-heap upward trend at matched idle checkpoints. Provider failures are logged separately from local failures.
- **FR-10:** Rollback restores a known-good full-dashboard artifact and proves both dashboard and API use after activation.

## Success measures

| Measure      | Pass condition                                                                                                                     |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------- |
| Build        | Full `npm run build:release` exits 0 without a backend-only profile.                                                               |
| Package      | `dist/BUILD_SHA` matches the candidate commit; `npm run check:pack-artifact` and `npm run check:pack-boot` pass.                   |
| Dashboard    | Login and authenticated dashboard UAT pass with rendered content plus a loaded first-party JavaScript asset.                       |
| Reliability  | JON-562 and JON-563 regressions pass on the packaged candidate, and the 48-hour criteria pass.                                     |
| Traceability | Every pass claim names the ticket, commit, package hash, configuration digest, command, timestamp, and redacted evidence location. |

## Product acceptance

All requirements above are PASS/FAIL. A partial pass is **not** a release. In particular, a green API smoke paired with a blank dashboard is FAIL.
