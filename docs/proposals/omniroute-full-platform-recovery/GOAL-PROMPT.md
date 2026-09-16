---
title: "Goal prompt: deliver OmniRoute full-platform recovery"
lastUpdated: 2026-09-14
---

# Goal prompt

## Goal

Deliver [JON-1228](https://linear.app/palermo/issue/JON-1228/omniroute-package-and-accept-a-full-dashboard-memory-fix-candidate) end to end. Build, test, independently accept, deploy and qualify one complete OmniRoute package containing the reviewed memory and stale-pressure fixes while preserving the full dashboard.

Planning, a plausible patch, a pull request, an API-only build, green health or partial UAT are milestones—not completion.

## Read first

- [Overview](./README.md)
- [Product requirements](./PRD.md)
- [Technical specification](./TECHNICAL-SPEC.md)
- [Implementation plan](./IMPLEMENTATION-PLAN.md)
- [UAT plan](./UAT-PLAN.md)
- [Release and rollback](./RELEASE-AND-ROLLBACK.md)
- [Traceability](./TRACEABILITY.md)
- [Risks and decisions](./RISKS-AND-DECISIONS.md)

## Repository and tracking

- Repository: `/home/mrburns/Projects/OmniRoute`
- Integration worktree: `/home/mrburns/Projects/OmniRoute/.claude/worktrees/jon-562-563-release-integration`
- Branch: `fix/jon-562-563-release-integration`
- Documentation commit: `4be3a8e7`
- Documentation PR: [#13631](https://github.com/diegosouzapw/OmniRoute/pull/13631)
- Target base: `release/v3.8.51`
- Parent: [JON-564](https://linear.app/palermo/issue/JON-564/omniroute-stop-recurring-memory-outages-and-prove-long-session)
- Delivery: [JON-1228](https://linear.app/palermo/issue/JON-1228/omniroute-package-and-accept-a-full-dashboard-memory-fix-candidate)
- Memory: [JON-562](https://linear.app/palermo/issue/JON-562/omniroute-profile-and-eliminate-long-session-memory-growth), [PR #13623](https://github.com/diegosouzapw/OmniRoute/pull/13623), commit `96fbc8fb`
- Pressure: [JON-563](https://linear.app/palermo/issue/JON-563/omniroute-fix-stale-pressure-admission-lockout), [PR #13618](https://github.com/diegosouzapw/OmniRoute/pull/13618), commit `9af0c0f9`
- Qualification and final UAT: [JON-559](https://linear.app/palermo/issue/JON-559/omniroute-prove-48-hour-stability-and-roll-out-reversibly)
- Containment: [JON-560](https://linear.app/palermo/issue/JON-560/omniroute-contain-memory-and-recover-alive-but-unusable-service)
- Concurrency: [JON-561](https://linear.app/palermo/issue/JON-561/omniroute-calibrate-concurrency-and-bound-queued-memory)
- Upstream memory issue: [#13621](https://github.com/diegosouzapw/OmniRoute/issues/13621)
- Live service: `omniroute-pilot.service`, port `20128`
- User-facing URL: [https://cursor.tail8bb3d0.ts.net:10460/](https://cursor.tail8bb3d0.ts.net:10460/)

## Current truth

- The reviewed fixes pass source tests and worked in an API-only package.
- That package was rolled back because it compiled dashboard pages into blank stubs.
- The current full-dashboard installation works visually but contains neither reviewed fix and still grows toward resource-pressure failure.
- The previous `d049af25` qualification is invalid and contributes no elapsed time to the next run.
- API health does not prove the product works.

## Product boundary

The deliverable is one package containing the complete dashboard, the full API, the accepted JON-562 memory fix and the accepted JON-563 pressure-recovery fix.

User-facing release must use the normal full build. `OMNIROUTE_BUILD_BACKEND_ONLY=1`, backend or contributor build profiles, empty page stubs and a second API-only sidecar fail acceptance.

## Execution

1. Read the nearest `AGENTS.md`, Linear issues, Graphiti state, checkpoint and handoff. Confirm the exact worktree, branch, lock and live identity. Move JON-1228 to In Progress without weakening its acceptance contract.
2. Reproduce the full-build failure on the exact base and candidate. Capture the first divergence and full import traces. Completion: one deterministic red command proves the actual build defect.
3. Add regression gates that fail when a Client Component imports server-only or Node runtime code, a user-facing release selects backend-only mode, a required dashboard route becomes an empty stub, or API health passes while the browser is blank.
4. Fix the real client/server boundary. Browser modules must remain free of database, browser automation, filesystem, process and other Node-only dependencies. Put server work behind server modules or API routes. Preserve real producer/consumer contracts. Do not hide the failure with aliases, broad externals, ignored build errors or UI stubs.
5. Preserve the independently accepted JON-562 and JON-563 behavior. Any material change to either fix requires its regression and independent review again.
6. Pin every command to Node 24 with `PATH=/usr/local/bin:/usr/bin:/bin` and prove child processes use Node `v24.18.0`.
7. Run focused build-boundary, JON-562 and JON-563 tests; both core typechecks; full unit and Vitest suites; full lint; Prettier on changed files; and `git diff --check`. Reproduce broad failures on the exact base with the same environment before classifying them as inherited.
8. Produce one normal full release using `npm run build:release`. Then pass `npm run check:pack-artifact`, `npm run check:pack-boot` and `npm run check:install-upgrade` against the exact tarball.
9. Prove source SHA, `dist/BUILD_SHA`, package version, tarball SHA-256, installed bundle hashes, configuration digest and running identity all name the same candidate. Reject unsafe archive names, absolute build-host links and missing dashboard assets.
10. Install the exact tarball into an isolated canary with separate data and configuration. Use one full-dashboard process for browser and API acceptance.
11. Run UAT-01 through UAT-09 from [UAT-PLAN.md](./UAT-PLAN.md). Record visible content, final URL, screenshot, browser console errors, failed network requests and reload behavior. A 200 response or screenshot alone does not pass browser UAT.
12. Obtain independent read-only Standards, Spec, release-artifact and UAT-evidence reviews. Reviewers must not edit their reviewed artifact. Repair accepted blockers through the owning coder, then review the changed artifact.
13. After acceptance, commit the exact reviewed diff, push the feature branch, update the upstream PR and attach the PR plus evidence to JON-1228.
14. Before live activation, inspect live requests and socket queues, drain active streams, verify the rollback package and record the current full-dashboard identity.
15. Stage the accepted package in a versioned directory. Atomically activate it, restart `omniroute-pilot.service` and retain the prior full package.
16. Verify the live dashboard: `/login`, `/`, `/dashboard` to `/home`, `/dashboard/logs`, `/dashboard/conversations`, and a first-party `/_next/` JavaScript asset. Verify the same process serves healthy API status, a real small `/v1/messages` request, one bounded representative long request, JON-563 recovery and JON-562 retention behavior.
17. Roll back immediately if any UI or API acceptance row fails. A blank dashboard is an automatic rollback.
18. After live smoke passes, start a new 48-hour JON-559 qualification clock. Record build identity, PIDs, uptime, restart count, RSS, high-water mark, swap, V8 heap, external and ArrayBuffer memory where safely exposed, connections, queues, health/readiness, admission/pressure state and local versus provider errors every five minutes.
19. Repeat dashboard UAT at 0, 24 and 48 hours. Record at least three matched idle checkpoints and idle-to-burst transitions. Any code/configuration change, restart, blank page, unrecovered pressure state, repeated upward retained-memory trend or failed UAT resets or fails the qualification.
20. Keep JON-564, JON-562, JON-563 and JON-559 open until their own acceptance contracts pass. Close JON-1228 only when the exact full package is independently accepted and all evidence is attached.

## Final report

State the exact source commit and PR; files changed; full-build root cause; regression and broad test results; package name and SHA-256; review verdicts; UAT-01 through UAT-09 results; deployed `BUILD_SHA` and hashes; dashboard and API evidence; rollback identity; current memory/swap; qualification start, end and status; tickets updated or closed; and every remaining blocker.

## Definition of done

- Normal full-dashboard `build:release` passes.
- Pack, boot and upgrade gates pass.
- JON-562 and JON-563 remain present and accepted.
- UAT-01 through UAT-09 pass on one exact package.
- Independent reviews accept code, package and UAT.
- That package is deployed with rollback.
- Live dashboard and API both work.
- A fresh 48-hour qualification is running or completed with immutable evidence.
- Linear contains the PR, evidence and current status.
- No raw heap snapshot, prompt, credential or secret leaves trusted local storage.

Keep working while any safe, authorised action remains.
