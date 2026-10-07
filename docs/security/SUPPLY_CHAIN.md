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

## Known Accepted Risks

### extract-zip 2.0.1 — GHSA-7pqw-9j4j-h8q3 / GHSA-jmr9-qjv8-65gv (#14482)

`extract-zip@2.0.1` carries two unpatched high-severity symlink-traversal advisories.
Per the "no upstream fix" branch of the CVE Variance remedy above, this is an
**accepted risk**, not a bump:

- **Chain:** `promptfoo` (devDependency) → `@openai/codex-security` → `extract-zip@2.0.1`.
  Confirmed via `package-lock.json` — exactly one package in the whole dependency
  tree (`@openai/codex-security`) declares `extract-zip`, and exactly one package
  (`promptfoo`) declares `@openai/codex-security`.
- **No fixed release exists anywhere in the chain.** `extract-zip@2.0.1` (published 2020) is the package's final release — it is unmaintained. `@openai/codex-security`'s
  current npm-latest (`0.1.29`) still pulls `extract-zip@2.0.1`.
- **Unreachable from production.** `promptfoo` is devDependency-only (never listed
  under `dependencies`), and no file under `src/`, `open-sse/`, or `bin/` imports the
  `extract-zip` npm package — OmniRoute's own `extractZip()` helper
  (`src/lib/versionManager/binaryManager.ts:93`) shells out to native `unzip`/`tar`
  and is unrelated. `@openai/codex-security` also ships its own symlink-traversal
  guard on top of extract-zip's onEntry callback.
- **Do not** alias `extract-zip` via `package.json` `overrides` — the only viable
  drop-in replacement is Electron-org-internal and API-incompatible with
  `@openai/codex-security`'s own onEntry/defaultDirMode/defaultFileMode checks;
  overriding it would silently break that package's security checks.
- **Baseline:** measured osv `vulnCount` (3) is already well under the frozen
  `config/quality/quality-baseline.json` baseline (27) — no ratchet change needed.
- **Regression guard:** `tests/unit/extract-zip-14482-exposure.test.ts` asserts the
  chain and the no-production-import invariant above; it fails CI if either ever
  breaks (e.g. a future PR makes `extract-zip` reachable from production).
- **Tracking:** issue #14482.

## Backlog: Scorecard advisory → blocking

After the 1st green release with Scorecard reporting:

- Scorecard: score ratchet (freezes the measured score; cannot decrease).

Complements the Phase 7 gates (osv-scanner, gitleaks, actionlint+zizmor): zizmor
audits the workflows themselves; Scorecard measures the repo posture in aggregate.
