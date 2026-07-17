# `pheno-worklog-schema` — substrate agent guide

## Substrate

`pheno-worklog-schema` is a **lib substrate** (pure reusable library) under
the `pheno-worklog-*` naming convention. It is the canonical parser +
emitter for the fleet's v2.1 `WORKLOG.md` format (ADR-025, ADR-030).

## Scope

- Parsing + validating a `WORKLOG.md` table written in the v2.1 schema.
- Migrating v2.0 (10-column) worklogs → v2.1 (11-column, adds `device:`).
- Generating a `WORKLOG.md` from a typed list of `Row` objects.
- CLI helpers for `validate` and `migrate`.

## Non-scope

- Parsing the AgilePlus JSONL worklog format (use `pheno-agileplus-worklog`).
  Per ADR-032, the two formats are complementary, not duplicating.
- Storing worklog rows in a database (this is a stateless lib).
- Cross-repo audit of all fleet worklogs (use `phenotype-org-audits`).

## Schema — v2.1 (canonical)

| # | Column  | Type                  | Notes                                              |
| - | ------- | --------------------- | -------------------------------------------------- |
| 1 | `Date`  | `str` (YYYY-MM-DD)    | Local date.                                        |
| 2 | `Task ID` | `str`               | Free-form (L5-XXX or chore/v8-batch-XX).           |
| 3 | `Layer` | `str`                 | governance / source / test / ci / docs.            |
| 4 | `Action` | `str`               | Conventional-commit style (add, fix, chore, ...).  |
| 5 | `Files` | `str`                 | Comma-separated paths.                             |
| 6 | `Notes` | `str`                 | Free-form.                                         |
| 7 | `device` | `str`                | `macbook` / `heavy-runner` / `subagent` / `ci`.    | (NEW in v2.1)
| 8 | `scope` | `str` (optional)     | The repo this row applies to.                      |
| 9 | `risk`  | `str` (optional)     | `low` / `med` / `high`.                            |
| 10 | `deps` | `str` (optional)     | Free-form.                                         |
| 11 | `links` | `str` (optional)     | Comma-separated paths.                             |

## Tier-0 meta-bundle (this batch, w15)

This path received tier-0 governance hygiene on 2026-06-20:

- Meta-bundle: `README.md`, `AGENTS.md`, `SPEC.md`, `llms.txt`,
  `CHANGELOG.md`, `WORKLOG.md` (v2.1 schema with `device:` field), `LICENSE-MIT`,
  `LICENSE-APACHE`.
- Repo config: `pyproject.toml`, `ruff.toml` (per ADR-039), `.gitignore`, `py.typed`.
- CI: `.github/workflows/ci.yml` (test + lint + coverage at 80% gate).
- Source: `src/pheno_worklog_schema/{__init__,parser,emitter,__main__}.py`.
- Tests: `tests/test_parser.py` + `tests/test_emitter.py` + `tests/test_migrate_v20_to_v21.py`.
- Example: `examples/quickstart.py`.

## Cross-references

- ADR-023 — Agent-effort governance (lib substrate placement).
- ADR-025 / ADR-030 — pheno-worklog-schema v2.1 (the schema this lib implements).
- ADR-032 — pheno-worklog-schema is complementary to AgilePlus JSONL.
- ADR-036B — pheno-tracing canonical (structlog mirror for Python).
- ADR-039 — pheno-flake refresh template (ruff.toml for Python).
- ADR-040 — Test coverage gates per tier (80% lib).

## License

Dual-licensed under MIT or Apache 2.0, at your option.

## Contributing

See `CONTRIBUTING.md`. For security issues, see `SECURITY.md`.
