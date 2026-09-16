---
title: "Release and rollback: full OmniRoute recovery"
lastUpdated: 2026-09-14
---

# Release and rollback

## Release gate

The release owner may proceed only after all of these are attached to the linked Linear record:

1. Full `npm run build:release` pass, with no backend-only or contributor profile.
2. Exact artifact package/boot evidence, including matching candidate commit and `dist/BUILD_SHA`.
3. UAT-01 through UAT-09 PASS from [the UAT plan](./UAT-PLAN.md).
4. JON-562 and JON-563 focused evidence on the exact candidate.
5. A 48-hour qualification PASS with frozen candidate/configuration and independent review.
6. A named known-good **full-dashboard** rollback artifact and its identity record.

The retired `d049af25` API-only package must never be selected as the user-facing rollback target.

## Prepare without changing live service

- Record the currently active full artifact identity, process/service identity, package version, build SHA, and redacted configuration digest.
- Verify the rollback artifact has previously passed dashboard UAT, not merely API health.
- Confirm the target release uses isolated state as required by the existing release procedure. Do not share a writable database between candidate and live processes.
- Prepare the evidence directory and ticket links before activation. Record names and digests, never secret values.

## Controlled activation

1. Use the project’s existing authorised activation mechanism. Do not replace it with ad hoc global package changes.
2. Activate only the exact approved full-dashboard package.
3. Record the post-activation package/build/process identity.
4. Immediately perform UAT-01, UAT-03, UAT-05, and UAT-06 against the active candidate. These checks prove public login, authenticated UI, a dashboard asset, and API parity.
5. Continue the approved qualification monitoring. It must classify local pressure, process restart, swap/RSS movement, dashboard failure, and provider errors separately.

## Immediate rollback triggers

Rollback is required if any of the following occurs:

- Login or authenticated dashboard becomes blank or unusable.
- A first-party dashboard asset fails, or a new fatal client error prevents normal UI use.
- Local pressure rejects work and does not recover under the JON-563 contract.
- Retained memory grows outside the agreed qualification bound, swap rises persistently, or the candidate requires a manual/watchdog restart.
- API/authentication/streaming regressions affect the approved client journey.
- Candidate identity cannot be proved, or monitoring evidence is missing/corrupted.

## Rollback procedure

1. Stop further promotion and record the trigger, timestamp, candidate identity, and safe diagnostic summary.
2. Preserve a redacted evidence bundle. Do not collect raw snapshots or secrets in a rush.
3. Activate the named known-good full-dashboard rollback artifact using the same authorised mechanism.
4. Record the restored artifact/process identity.
5. Re-run UAT-01, UAT-03, UAT-05, and UAT-06 after restoration. A health-only check is insufficient.
6. Update the linked Linear ticket with the failed gate, attached evidence, rollback observation, and next repair action. Keep the parent acceptance contract open.

## 48-hour qualification rules

Start only after full UAT passes and the candidate is frozen. Sample at agreed intervals and retain at least three matched idle checkpoints plus recovery transitions. Record RSS, swap, heap/memory fields available without secrets, pressure-observation age, request/queue counters, restart count, error classification, build/package identity, and test workload hash.

The earlier d049af25 monitor was stopped during rollback. It is historical API evidence only and contributes zero elapsed time to this gate.
