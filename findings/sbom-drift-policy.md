# SBOM Drift Detection Policy

## Rule
Any CI/CD pipeline that produces a release artifact MUST run cargo-cyclonedx and verify SBOM matches Cargo.lock hash.

## Detection
- Weekly: cargo-cyclonedx --all --format json → .cdx.json artifact
- Weekly: .github/workflows/cyclonedx.yml runs every Monday 06:00 UTC (deployed in v30-T1)
- Drift fails if: Cargo.lock SHA-256 differs from baseline at .cargo-lock-hash

## Severity
- P1 if SBOM not produced for >7d
- P2 if SBOM produced but hash mismatched
