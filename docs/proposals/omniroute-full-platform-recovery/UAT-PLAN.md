---
title: "UAT plan: full OmniRoute dashboard recovery"
lastUpdated: 2026-09-14
---

# User acceptance test plan

## Preconditions

- An authorised QA operator has the exact full-dashboard tarball installed in an isolated candidate environment.
- The candidate’s Git commit, `dist/BUILD_SHA`, tarball SHA-256, package version, Node version, and redacted configuration digest are recorded before testing.
- A pre-existing authorised dashboard test account is available. Do not put credentials, cookies, or tokens in this document or its evidence.
- The candidate is not an API-only build. Verify the build record before opening the browser.

## Pass/fail rules

Every row is PASS or FAIL. A redirect expected by the source is not a failure, but a blank page, fatal console error, or failed first-party initial JavaScript asset is a failure. A health response does not pass a UI row.

| ID     | Journey                | Steps                                                                                                        | Pass evidence                                                                                    |
| ------ | ---------------------- | ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ |
| UAT-01 | Public login           | Open `/login`; wait for the document and page UI to settle.                                                  | Visible login form/content, screenshot, no fatal browser console error.                          |
| UAT-02 | Root entry             | Open `/`; follow redirects.                                                                                  | Application reaches the expected sign-in or dashboard route, not a blank document.               |
| UAT-03 | Dashboard Home         | Sign in through the normal UI; open `/dashboard` and follow the source redirect to `/home`.                  | Authenticated dashboard shell and Home content visible; screenshot and final URL recorded.       |
| UAT-04 | Request Logs           | From the authenticated shell, open `/dashboard/logs`, then reload it.                                        | Request Logs renders usable content before and after reload; screenshot and console summary.     |
| UAT-05 | Conversations          | From the authenticated shell, open `/dashboard/conversations`, then reload it.                               | Conversations renders usable content before and after reload; screenshot and console summary.    |
| UAT-06 | Static asset           | From the UAT-01 or UAT-03 HTML, select one first-party `/_next/` script URL and fetch it.                    | HTTP 200, JavaScript content type, nonzero response body; URL and headers saved without cookies. |
| UAT-07 | API parity             | Call `/api/monitoring/health`; submit the approved no-spend validation request or fixture to `/v1/messages`. | Health and route validation behave as expected on the same candidate identity.                   |
| UAT-08 | Recovery regression    | Use the isolated JON-563 fixture through the actual route.                                                   | Stale recovered state admits within 10 seconds; fresh critical state still rejects.              |
| UAT-09 | Long-request retention | Run the approved JON-562 100k/300k/600k-token-equivalent profile fixture.                                    | Covered cases report no retained large backing string after drain; raw snapshots are cleaned.    |

## Execution record

For each run, save a redacted record under the ticket evidence location containing:

- UAT ID, timestamp, tester, environment label, candidate commit, package SHA-256, and configuration digest;
- final URL, HTTP status, selected asset status/content type/byte count, and browser-console category summary;
- screenshots for UAT-01 through UAT-05;
- test command and exit code for UAT-07 through UAT-09;
- PASS/FAIL and a plain-English failure description.

Do not attach browser storage, request bodies, provider responses, prompt text, headers that contain credentials, environment files, or heap snapshots.

## Browser evidence acceptance

The tester must use a fresh browser context. A screenshot alone is insufficient: pair it with final URL, page content observation, and browser console/network summary. A 200 HTML response alone is insufficient: pair it with a loaded first-party asset and visible content.

## UAT exit

UAT passes only when UAT-01 through UAT-09 pass on one exact candidate. Any artifact, source, configuration, or browser-environment change that can affect the claim requires rerunning the affected rows. UAT failure blocks the 48-hour qualification and release.
