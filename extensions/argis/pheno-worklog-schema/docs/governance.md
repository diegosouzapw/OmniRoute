# Governance — pheno-worklog-schema

Cross-reference hub for the governance + meta-bundle content of
`pheno-worklog-schema/`. Maps every constraining ADR to the file in this
repo that implements (or is constrained by) the ADR.

## Constraining ADRs

| ADR   | Title                                              | Constraint                                                                 |
| ----- | -------------------------------------------------- | -------------------------------------------------------------------------- |
| 023   | Agent-effort governance                            | Lib substrate (Rule 3); quality bar (Rule 3.1); quickstart (Rule 1).       |
| 025   | pheno-worklog-schema v2.1 (11th `device:` column)  | The schema this lib implements.                                           |
| 030   | pheno-worklog-schema v2.1 (extended)               | Same as 025.                                                               |
| 032   | Primitive lib, not AgilePlus duplicate             | This lib is complementary to AgilePlus JSONL (different formats).          |
| 036B  | pheno-tracing substrate canonical                  | `structlog` is the Python mirror; `pyproject.toml` includes it.            |
| 039   | pheno-flake refresh template                       | `ruff.toml` (not `deny.toml`) is the canonical Python linter config.        |
| 040   | Test coverage gates per tier                      | 80% lib gate; enforced in `pyproject.toml` + `.github/workflows/ci.yml`.    |

## Quality bar (ADR-023 Rule 3.1) — what's present

- [x] **Spec** — `SPEC.md` (1-page max).
- [x] **Docs** — `README.md` + `AGENTS.md` — what, when, when **not**, 5-line quickstart.
- [x] **Tests** — unit (parser, emitter) + migration (v2.0 → v2.1).
- [x] **Observability** — `structlog` integration (ADR-036B).
- [x] **Coverage gate** — 80% lib (ADR-040), enforced in CI.
- [x] **CI gate** — `.github/workflows/ci.yml` runs test matrix, ruff lint, pytest-cov.
- [x] **Worklog v2.1** — `WORKLOG.md` dogfooded with the `device:` field.
- [x] **Quickstart** — `examples/quickstart.py` (5-line demo).
- [x] **License** — Dual MIT/Apache (`LICENSE-MIT` + `LICENSE-APACHE`).
- [x] **llms.txt** — generated artifact at the repo root, hand-curated for now.

## v2.0 → v2.1 migration

The v2.0 schema (10 cols) is deprecated 2026-06-22. To migrate an existing
`WORKLOG.md`:

```bash
pheno-worklog-schema migrate WORKLOG.md
```

The migration defaults `device=ci` for every v2.0 row. Edit afterwards to
reflect the actual device used (`macbook` / `heavy-runner` / `subagent`).
