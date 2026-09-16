---
title: "Risks and decisions: OmniRoute full-platform recovery"
lastUpdated: 2026-09-14
---

# Risks and decisions

## Decisions already made

| Decision                                                  | Why                                                                                                 | Consequence                                                |
| --------------------------------------------------------- | --------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| Reject backend-only output for user-facing deployment.    | It deliberately stubs dashboard pages and produced a blank UI.                                      | API-only smoke may continue only as labelled API evidence. |
| Keep JON-562/JON-563 separate from the full-build repair. | The fixes were reviewed independently; the normal build failure is a separate release-base problem. | Do not bury a build repair inside a memory/pressure claim. |
| Restart 48-hour qualification from zero.                  | The `d049af25` artifact was rolled back before the qualification window completed.                  | Historical pilot measurements are supportive only.         |
| Require dashboard proof after activation and rollback.    | API health was green during the blank-dashboard incident.                                           | Health is a component check, not release acceptance.       |

## Active risks

| Risk                                                   | Impact                                                  | Control                                                                                         | Decision owner      |
| ------------------------------------------------------ | ------------------------------------------------------- | ----------------------------------------------------------------------------------------------- | ------------------- |
| Normal full build remains blocked by the release base. | No safe full artifact can be produced.                  | Isolate a minimal full-build repair with a failing-before/passing-after regression.             | Build owner         |
| Build profile accidentally selects backend-only mode.  | A superficially healthy API-only package reaches users. | Add build/package guard and record build-mode inputs in evidence.                               | Build/package owner |
| Artifact identity drifts between test and deployment.  | Test results do not prove the running package.          | Bind commit, build sentinel, package hash, config digest, and process identity.                 | Release owner       |
| Dashboard assets exist but runtime still blanks.       | Static inspection misses a browser-only failure.        | Fresh-browser UAT includes content, console, and selected asset check.                          | QA owner            |
| Full test suite has unrelated inherited failures.      | A real candidate failure may be misclassified as noise. | Compare exact base and candidate, name each failure, and retain focused mandatory gates.        | Director/reviewer   |
| Provider calls cost money or introduce upstream noise. | Qualification becomes expensive or ambiguous.           | Use deterministic fixtures first; obtain authority/budget before real provider tests.           | Jon/release owner   |
| Raw profiling data exposes sensitive content.          | Security incident during evidence collection.           | Allowlisted profiler environment; local analysis; cleanup verification; publish summaries only. | JON-562 owner       |
| Rollback restores API but not UI.                      | The same outage recurs.                                 | Rollback target must be a known-good full-dashboard artifact; execute UAT after restoration.    | Release operator    |

## Open decisions

1. Which minimal repair resolves the current 168-error full dashboard build failure on the recovery candidate? The build ticket must answer from an actual failing log, not from this plan.
2. What representative workload, concurrency, and throughput target will be frozen for the clean 48-hour run? JON-561 owns the measurement decision.
3. What measured RAM/swap limits and readiness/recycle policy protect the host without invalidating required long streams? JON-560 owns this decision.
4. What approval and budget apply to real provider/client qualification after deterministic evidence passes? Jon or the authorised release owner must record it.

No open decision permits a hidden workaround. If a decision cannot be made from evidence, stop that lane and record the missing authority or measurement.
