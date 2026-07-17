# Governance — pheno-llms-txt

Cross-reference hub for the governance + meta-bundle content of
`pheno-llms-txt/`. Maps every constraining ADR to the file in this
repo that implements (or is constrained by) the ADR.

## Constraining ADRs

| ADR   | Title                                              | Constraint                                                                 |
| ----- | -------------------------------------------------- | -------------------------------------------------------------------------- |
| 023   | Agent-effort governance                            | Lib substrate (Rule 3); quality bar (Rule 3.1); quickstart (Rule 1).       |
| 025   | pheno-worklog-schema v2.1 (11th `device:` column)  | `WORKLOG.md` uses the v2.1 schema.                                         |
| 030   | pheno-worklog-schema v2.1 (extended)               | Same as 025.                                                               |
| 036B  | pheno-tracing substrate canonical                  | `structlog` is the Python mirror; `pyproject.toml` includes it.            |
| 039   | pheno-flake refresh template                       | `ruff.toml` (not `deny.toml`) is the canonical Python linter config.        |
| 040   | Test coverage gates per tier                      | 80% lib gate; enforced in `pyproject.toml` + `.github/workflows/ci.yml`.    |

## Quality bar (ADR-023 Rule 3.1) — what's present

- [x] **Spec** — `SPEC.md` (1-page max).
- [x] **Docs** — `README.md` + `AGENTS.md` — what, when, when **not**, 5-line quickstart.
- [x] **Tests** — unit (`test_generate.py`) + spec-compliance (`test_spec_compliance.py`).
- [x] **Observability** — `structlog` integration (ADR-036B).
- [x] **Coverage gate** — 80% lib (ADR-040), enforced in CI.
- [x] **CI gate** — `.github/workflows/ci.yml` runs test matrix, ruff lint, pytest-cov.
- [x] **Worklog v2.1** — `WORKLOG.md` with the `device:` field.
- [x] **Quickstart** — `examples/quickstart.py` (5-line demo).
- [x] **License** — Dual MIT/Apache (`LICENSE-MIT` + `LICENSE-APACHE`).
- [x] **llms.txt** — generated artifact at the repo root, hand-curated for now.
