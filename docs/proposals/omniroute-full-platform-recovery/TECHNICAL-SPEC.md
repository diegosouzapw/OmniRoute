---
title: "Technical specification: full-platform recovery"
lastUpdated: 2026-09-14
---

# Technical specification

## Existing candidate and failure boundary

The integration branch contains `ecaa881c` (JON-563) and `d049af25` (JON-562). The reviewed backend-only tarball is retired for user-facing use. It remains evidence for API behaviour only.

`scripts/build/backendOnlyPages.mjs` defines backend-only mode. In that mode, `scripts/build/build-next-isolated.mjs` calls `stubDashboardPages()`, which replaces App Router UI entry files with null or minimal components during build and restores source afterwards. API route handlers remain, which explains why API health checks passed while the dashboard was blank.

## Build and package contract

| Stage              | Required input                                                                            | Required output                                                   | Reject when                                                                                                         |
| ------------------ | ----------------------------------------------------------------------------------------- | ----------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| Source integration | The two reviewed commits plus the smallest build-blocker repair.                          | One candidate commit with no unrelated product changes.           | The fix changes JON-562/JON-563 behaviour without a new review and regression.                                      |
| Full build         | `npm run build:release` with backend-only variables absent.                               | `.build/next/` intermediates, `dist/`, and `dist/BUILD_SHA`.      | The command fails, uses a backend/contributor profile, or writes a mismatched `BUILD_SHA`.                          |
| Package policy     | Built `dist/` and candidate source.                                                       | `npm run check:pack-artifact` passes.                             | Required runtime files are missing, unexpected files leak, or provenance fails.                                     |
| Clean boot         | The produced tarball installed into a fresh temporary prefix and separate data directory. | A booted server returning expected health and validation results. | The install falls back to another global package, uses production data, or cannot prove the exact package identity. |
| Browser UAT        | The same installed artifact, authenticated test account, and browser.                     | Saved screenshots, browser-console summary, route/asset evidence. | Login or dashboard is blank, errors fatally, or a first-party asset fails.                                          |

The deployment candidate must preserve the standard build flow described in `docs/ops/RELEASE_CHECKLIST.md`: `npm run build:release` cleans `.build` and `dist`, builds Next output, assembles the standalone package, then writes the build SHA sentinel.

## Full-dashboard invariants

1. The release command runs without `OMNIROUTE_BUILD_BACKEND_ONLY=1` and without `OMNIROUTE_BUILD_PROFILE=backend` or `contributor`.
2. The process that serves `/v1/messages` also serves the dashboard on its configured port. API and UI are one release unit for this recovery.
3. `/` redirects to `/dashboard`, and `/dashboard` redirects to `/home` in the application source. UAT must follow redirects rather than treating either redirect as a blank-page failure.
4. `/login` is a public screen. The authenticated dashboard check must use the project’s existing login flow, not a copied session cookie.
5. A passing `/api/monitoring/health` response proves liveness data only. It cannot pass a dashboard requirement.

## Artifact proof

The package ticket must add or extend a deterministic guard at the real build/package seam. It must fail if a user-facing release build selects a backend-only profile or contains `BACKEND_ONLY_STUB_MARKER` in a served dashboard page/route, and pass for a full build. It must prove the shipped output contains both server runtime and dashboard static/client assets; a source-only test of `isBackendOnlyBuild({}) === false` is insufficient.

The clean-boot check records only:

- candidate Git commit and `dist/BUILD_SHA`;
- tarball SHA-256 and file count;
- Node path/version and package version;
- redacted configuration digest and fresh data-directory identity;
- HTTP status, response headers needed to classify content, and browser asset status.

It must not record request bodies, authorization headers, cookie values, environment values, raw heap snapshots, or provider secrets.

## Runtime behaviour retained from JON-562 and JON-563

| Area                     | Contract                                                                                                         | Existing reviewed coverage                                                                                      |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| Completed-request memory | Previews are detached and detail retention has an estimated byte budget alongside count/TTL bounds.              | `tests/unit/active-request-stream-chunks-lifecycle.test.ts`; `tests/unit/messages-route-memory-profile.test.ts` |
| Long-request profiling   | The real `/v1/messages` boundary is profiled with an allowlisted child environment and raw-snapshot cleanup.     | `scripts/perf/messages-route-memory-profile.ts`                                                                 |
| Stale critical pressure  | The actual `/v1/messages` admission path triggers a shared bounded refresh; fresh critical pressure still sheds. | `tests/unit/resource-pressure-admission-recovery.test.ts`                                                       |
| Pressure runtime         | Concurrent refreshes coalesce; a failed/hung sampler has a bounded outcome; disposal releases waiters.           | `tests/unit/resource-pressure-admission-recovery.test.ts`                                                       |

## Required test matrix

| Layer         | Test                                                              | Baseline failure it catches                                         | Candidate pass evidence                                                                           |
| ------------- | ----------------------------------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| Unit          | JON-563 route-level stale-pressure regression                     | Recovered process returns stale 503 after inactivity.               | Actual route admits after fresh below-threshold sample; fresh critical still rejects.             |
| Unit/profile  | JON-562 detail-retention and 100k/300k/600k profile matrix        | Completed detail retains a large backing body.                      | `largeBackingRetained=false`; cleanup reports no raw snapshots.                                   |
| Build         | Full release build, no API-only flags                             | Full UI cannot compile.                                             | `npm run build:release` exits 0.                                                                  |
| Package       | Artifact policy, boot, and upgrade                                | A package omits runtime/asset content or boots a different install. | `check:pack-artifact`, `check:pack-boot`, and `check:install-upgrade` pass for the exact tarball. |
| Browser       | Login, dashboard, provider/settings navigation, first-party asset | API-only output renders blank UI.                                   | UAT evidence in [UAT plan](./UAT-PLAN.md).                                                        |
| Qualification | 48-hour representative run                                        | Long-session memory/recovery regressions return.                    | Redacted metrics and review verdict satisfy FR-8 and FR-9.                                        |

## Technical stop conditions

- Do not build a user-facing package until the normal full build is green. The API-only fallback is rejected.
- Do not start the 48-hour clock until the full artifact, test artifact, configuration digest, and runtime identity match.
- Stop a candidate after two unsuccessful repairs of the same defect. Preserve the failure evidence and obtain a concrete decision before another repair.
