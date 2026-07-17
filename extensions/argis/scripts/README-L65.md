# L65 SSOT Auto-Check Justfile Recipe

Append this to your `justfile` (or run `just validate` after sourcing):

```just
# Validate the SSOT.md is canonical, complete, and references resolve (L65)
validate-ssot:
    ./scripts/validate-ssot.sh

# Combined: run all local validation gates
validate: validate-ssot
    @echo "✓ All validation gates passed"

# Alias for the legacy `check` recipe
check: validate
```

The `scripts/validate-ssot.sh` script checks:

1. **File exists** — `SSOT.md` present at repo root
2. **Required sections** — `## Scope`, `## Precedence order`, `## Updating this file`
3. **Scope table populated** — at least 3 rows
4. **References resolve** — every row in the Scope table has a real local path
5. **AGENTS.md references SSOT** — top-level and nested repos
6. **No silent drift** — missing references surface as warnings

## CI integration

```yaml
# .github/workflows/validate-ssot.yml
name: validate-ssot
on:
  push:
    paths: [SSOT.md, scripts/validate-ssot.sh, '**/AGENTS.md']
  pull_request:
    paths: [SSOT.md, scripts/validate-ssot.sh, '**/AGENTS.md']
jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: chmod +x scripts/validate-ssot.sh
      - run: ./scripts/validate-ssot.sh
```

## Adoption

- `argis-extensions` ✓ (canonical)
- `pheno-flags` ✓ (this commit)
- `pheno-port-adapter` ✓ (L65 2→3)
- All other fleet repos: pending v12 T6 follow-up

Refs: v12 T6, 71-pillar L65 (1→3), ADR-024 (audit framework), ADR-041 (refresh cadence)
