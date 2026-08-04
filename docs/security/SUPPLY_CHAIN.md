---
title: "Supply-Chain Gates"
---

# Supply-Chain Gates (Phase 8 · Block A)

OmniRoute publishes npm + Docker artifacts. These gates provide provenance,
inventory (SBOM) and CVE scanning, all OSS, plugged into release workflows.
**Advisory-first** posture — they report now, promote to blocking after the 1st
green release.

| Gate                  | Tool                                           | Where                         | Blocks?                  | Output                                        |
| --------------------- | ---------------------------------------------- | ----------------------------- | ------------------------ | --------------------------------------------- |
| SLSA provenance (npm) | `npm --provenance` (OIDC)                      | `npm-publish.yml`             | only if publish fails    | badge npmjs / `npm audit signatures`          |
| SBOM npm              | `@cyclonedx/cyclonedx-npm`                     | `npm-publish.yml`             | only if generation fails | Release asset + artifact                      |
| SBOM image            | `anchore/sbom-action` (syft)                   | `docker-publish.yml` (merge)  | advisory                 | CycloneDX artifact                            |
| Trivy CVE (SARIF)     | `aquasecurity/trivy-action`                    | `docker-publish.yml` (merge)  | advisory                 | SARIF (HIGH+CRITICAL) → Security tab          |
| Trivy CRITICAL gate   | `aquasecurity/trivy-action`                    | `docker-publish.yml` (merge)  | **blocking**             | `exit-code: '1'` on fixable CRITICAL          |
| osv vulnCount         | `osv-scanner` (`check:vuln-ratchet --ratchet`) | `ci.yml` (`quality-extended`) | **blocking**             | ratchets `metrics.vulnCount` (direction:down) |
| OpenSSF Scorecard     | `ossf/scorecard-action`                        | `scorecard.yml` (cron)        | advisory                 | SARIF → Security + badge                      |

The image CVE ratchet uses **two steps** in `docker-publish.yml`: the SARIF step
(`HIGH,CRITICAL`, `exit-code: 0`) keeps HIGH+CRITICAL visible in the Security tab
without blocking; the _CRITICAL gate_ step (`severity: CRITICAL`, `ignore-unfixed: true`,
`exit-code: 1`) fails the release on a CRITICAL CVE **with a fix available**. `ignore-unfixed`
prevents blocking the release for a base-image CVE without an upstream patch.

## ⚠️ CVE Variance (blocking osv/Trivy gates)

osv and Trivy compare deps against CVE databases that **continuously grow**. A PR
that **touches no dependencies** can suddenly turn red because a new CVE was
disclosed in an existing dep (osv: measured `vulnCount` > baseline; Trivy: a new
fixable CRITICAL in the image). **This is EXPECTED operational behavior of a blocking
CVE gate, not a product regression.**

When osv or Trivy go red due to a newly disclosed CVE, the remedy is:

1. **Bump the affected dep** (preferred) — upgrade to the patched version via `package.json`
   `overrides` (transitive deps) or rebuild the image on a patched base.
2. **If there is no upstream fix:**
   - **osv:** re-baseline `metrics.vulnCount` in `config/quality/quality-baseline.json`
     (`npm run quality:ratchet -- --update` does not cover dedicated gates — edit the value by
     hand, `direction:down`) with a justification note + tracking issue.
   - **Trivy:** add an entry in `.trivyignore` (CVE-ID per line) with a justification
     comment + tracking issue. `ignore-unfixed: true` already covers CVEs without
     patches automatically.

Both gates **gracefully SKIP** (exit 0) when the tool is absent or the measurement
fails (osv-scanner not in PATH, osv.dev/network unreachable, invalid JSON) — a
**measurement** failure never blocks, only a **measured** regression blocks.

## Backlog: Scorecard advisory → blocking

After the 1st green release with Scorecard reporting:

- Scorecard: score ratchet (freezes the measured score; cannot decrease).

Complements the Phase 7 gates (osv-scanner, gitleaks, actionlint+zizmor): zizmor
audits the workflows themselves; Scorecard measures the repo posture in aggregate.
