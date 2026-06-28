# ADR-001: Fleet-wide Pre-commit Hook Minimum

**Status:** Draft
**Date:** 2026-06-30
**Author:** forge orchestrator (ADR-102 fallback)
**Cycle:** 34 (v46)

## Context

A fleet-wide scan of `.pre-commit-config.yaml` files (depth ≤ 3, excluding
`.git`/`node_modules`) found **204 active configs** with the following
grade distribution:

| Grade | Count | Pct | Criteria |
|-------|------:|---:|----------|
| A (all 4 signals) | 0 | 0% | fmt + lint + secret + test |
| B (3/4) | 2 | 1% | 3 of 4 signals |
| C (2/4) | 19 | 9% | 2 of 4 signals |
| D (≤1/4) | **183** | **90%** | 0-1 signals |

Signal coverage across the fleet:
- Formatting hook: **37/204 (18%)**
- Linting hook: **81/204 (40%)**
- Secret-scan hook: **35/204 (17%)**
- Test/check hook: **17/204 (8%)**

## Decision

Adopt a **fleet-wide pre-commit hook minimum** consisting of 4 hooks:

1. **Formatting** (`prettier`, `rustfmt`, `gofmt`, `shfmt`, or `black`)
2. **Linting** (`eslint`, `clippy`, `shellcheck`, `hadolint`, `markdownlint`,
   `yamllint`, or `flake8`)
3. **Secret scanning** (`gitleaks`, `trufflehog`, or `detect-secrets`)
4. **Test/check** (`cargo check`, `cargo test`, `pytest`, `jest`, or `go test`)

These 4 hooks cover the **P0 prevention surface**: code quality (fmt + lint),
security (secret-scan), and CI-gate preflight (test/check).

## Enforcement

- **New repos**: minimum 4 hooks REQUIRED at creation (via `just init-pre-commit`
  or `scripts/init-pre-commit.sh` template).
- **Existing repos**: RECOMMENDED, not enforced. Migration is per-repo as
  maintainers adopt the template.
- **CI gate**: optional `.pre-commit-hooks-validator.yml` workflow that checks
  the minimum on `pull_request` paths touching `.pre-commit-config.yaml`.

## Template

```yaml
# .pre-commit-config.yaml template (ADR-001 minimum)
repos:
  - repo: https://github.com/pre-commit/pre-commit-hooks
    rev: v4.6.0
    hooks:
      - id: trailing-whitespace
      - id: end-of-file-fixer
      - id: check-yaml
  - repo: https://github.com/gitleaks/gitleaks
    rev: v8.18.2
    hooks:
      - id: gitleaks
  - repo: https://github.com/compilerla/conventional-pre-commit
    rev: v3.2.0
    hooks:
      - id: conventional-pre-commit
        stages: [commit-msg]
```

Repos may substitute equivalent tools (e.g. `detect-secrets` for `gitleaks`,
`eslint` for `conventional-pre-commit`). The minimum is **functional
coverage**, not tool-specific.

## Status

- **Accepted**: This ADR establishes the minimum; no further ADR needed for
  enforcement on new repos.
- **Non-blocking**: P2 priority — not a P0/P1 gap per v46 standby stance.

## References

- `findings/envelope/precommit.json` — full per-repo audit data (204 entries)
- `plans/2026-06-30-v46-post-standby-resume.md` — v46 plan (T3)
- ADR-023 (app-substrate governance) — enforcement model permits
  "new repos REQUIRED, existing RECOMMENDED"

