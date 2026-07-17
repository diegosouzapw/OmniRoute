# T38 — App-Substrate Drift Detector CI (ADR-049)

**Date:** 2026-06-20
**ADR:** ADR-049 (App-substrate drift detector — 3-pass algorithm)
**Owner:** kooshapari
**Device:** macbook

## Workflow

```yaml
# .github/workflows/drift-detector.yml
name: app-substrate-drift-detector

on:
  pull_request:
    paths:
      - 'pheno-*-lib/**'
      - 'phenotype-*-sdk/**'
      - 'phenotype-*-framework/**'
      - 'apps/**/Cargo.toml'
      - 'apps/**/go.mod'
      - 'apps/**/package.json'
      - 'apps/**/pyproject.toml'
  schedule:
    - cron: '0 9 * * 1'  # Weekly Monday 09:00 PDT (per ADR-041)

jobs:
  drift-detector:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          submodules: recursive

      - name: Install drift-detector
        run: cargo install pheno-drift-detector --version "^0.2" --locked

      - name: Run 3-pass algorithm
        run: |
          pheno-drift-detector scan \
            --pass1=spec-drift \
            --pass2=api-drift \
            --pass3=archetype-drift \
            --report=findings/2026-06-20-drift-report.json \
            --fail-on=critical \
            --fail-on=high \
            .

      - name: Upload drift report
        uses: actions/upload-artifact@v4
        with:
          name: drift-report
          path: findings/2026-06-20-drift-report.json
          retention-days: 30

      - name: Comment on PR
        if: github.event_name == 'pull_request'
        uses: actions/github-script@v7
        with:
          script: |
            const fs = require('fs');
            const report = JSON.parse(fs.readFileSync('findings/2026-06-20-drift-report.json', 'utf8'));
            const drift_count = report.summary.drift_count;
            const drifts_by_severity = report.summary.by_severity;
            const body = `## Drift Detector Report\n\n` +
              `**Total drifts:** ${drift_count}\n` +
              Object.entries(drifts_by_severity).map(([k,v]) => `- ${k}: ${v}`).join('\n') +
              `\n\n<details><summary>Detail</summary>\n\n\`\`\`json\n${JSON.stringify(report, null, 2)}\n\`\`\`\n</details>`;
            github.rest.issues.createComment({
              owner: context.repo.owner,
              repo: context.repo.repo,
              issue_number: context.issue.number,
              body
            });
```

## 3-Pass Algorithm (per ADR-049)

### Pass 1: Spec Drift
- Compares each app's `SPEC.md` (or equivalent) against the canonical substrate's `SPEC.md`
- Flags sections that have diverged (different invariants, different guarantees, different non-goals)
- Severity: HIGH (changes user-facing contract)

### Pass 2: API Drift
- Compares the API surface (Rust traits, Go interfaces, TS exports, Python classes) of the app against the substrate
- Flags symbols that are imported but no longer exist, or whose signature has changed
- Severity: CRITICAL (compile errors downstream)

### Pass 3: Archetype Drift
- Compares the architectural archetype (Hexagonal L4, layered, monolithic) of the app against the substrate's canonical archetype
- Flags apps that have drifted away from the substrate's intended structure
- Severity: MEDIUM (degrades long-term maintainability)

## Output Schema

```json
{
  "summary": {
    "drift_count": 12,
    "by_severity": { "critical": 2, "high": 5, "medium": 4, "low": 1 },
    "by_pass": { "spec": 4, "api": 5, "archetype": 3 }
  },
  "drifts": [
    {
      "app": "KooshaPari/Dino",
      "substrate": "pheno-port-adapter",
      "pass": "api",
      "severity": "critical",
      "title": "HexPort trait removed, Dino still imports it",
      "detail": "Dino/src/infra/ports.rs:12 imports `HexPort` which was removed from pheno-port-adapter@0.4.0",
      "remediation": "Migrate to `Adapter` trait (ADR-014) or pin pheno-port-adapter to ^0.3"
    }
  ]
}
```

## CI Behavior

| Severity | Behavior |
|----------|----------|
| **CRITICAL** | Fails PR, blocks merge |
| **HIGH** | Fails PR, blocks merge |
| **MEDIUM** | Comments on PR, does not block |
| **LOW** | Comments on PR, informational |

## Fixture (test the workflow itself)

```toml
# .github/workflows/drift-detector.fixture.toml
[fixture]
expected_drift_count_max = 50
expected_passes_run = ["spec", "api", "archetype"]
expected_severity_levels = ["critical", "high", "medium", "low"]
expected_report_path = "findings/2026-06-20-drift-report.json"
```

The fixture is exercised in `pheno-drift-detector/tests/ci_fixture_test.rs` to validate the workflow YAML is parseable, the action runs to completion on a sample monorepo, and the report JSON conforms to schema.

## References

- ADR-049 (app-substrate drift detector — 3-pass algorithm)
- ADR-040 (test coverage gates per tier)
- ADR-041 (71-pillar Monday refresh cadence — weekly Monday cron)
- ADR-048 (substrate graduation path — 4-tier gate)
- `KooshaPari/pheno-drift-detector` (implementation)
- `pheno-ci-templates` (CI template definitions)
