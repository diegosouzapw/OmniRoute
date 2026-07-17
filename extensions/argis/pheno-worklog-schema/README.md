# `pheno-worklog-schema`

> **Parse, validate, and emit `WORKLOG.md` files in the v2.1 schema (ADR-025).**

`pheno-worklog-schema` is a Python library + CLI that handles the
Phenotype fleet's human-readable `WORKLOG.md` format. It is the
canonical parser + emitter for the v2.1 schema (11 columns including
`device:`). Per ADR-032, it is **complementary** to AgilePlus's
machine-readable JSONL worklogs — both coexist.

## Why

Every `pheno-*` repo in the fleet ships a `WORKLOG.md` written by hand.
The format is converging on v2.1 (with the `device:` field), but the
fleet has 30+ repos at varying states. `pheno-worklog-schema` codifies
the schema so all repos can be validated + migrated in batch.

## Where the code lives

- **Governance + meta-bundle:** this path (`pheno-worklog-schema/` at the monorepo root)
- **Executable Python source:** `src/pheno_worklog_schema/`

## 5-line quickstart

```python
from pheno_worklog_schema import parse, to_markdown

rows = parse("| 2026-06-20 | L5-119 | governance | add-meta-bundle | README.md | note | macbook |\n...")
for r in rows:
    print(r.date, r.task_id, r.device)
md = to_markdown(rows)
```

## When to use

- Validating a `WORKLOG.md` file in CI.
- Migrating v2.0 worklogs → v2.1 (adding the `device:` field).
- Generating a `WORKLOG.md` from a JSON manifest in a scaffold template.
- Lint rule for fleet-wide audits.

## When NOT to use

- The worklog is machine-readable JSONL (use `pheno-agileplus-worklog` instead).
- The repo is a non-Python crate (this lib is Python; the Rust fleet can
  shell out to a CLI call).

## Features

- Pure Python stdlib (no third-party deps for the parser).
- 11-column v2.1 schema validation (per ADR-025).
- Migration helper: v2.0 (10 cols) → v2.1 (11 cols, defaults `device=ci`).
- CLI: `pheno-worklog-schema validate <file>` and `migrate <file>`.

## Status

- **Tier:** 0 (lib substrate, per ADR-023)
- **Coverage gate:** 80% (ADR-040)
- **Substrate canonicals:** ADR-023, ADR-025, ADR-030, ADR-032, ADR-036B
- **v2.1 deprecation:** v2.0 schema deprecated 2026-06-22 (5 days from now).

## License

Dual-licensed under MIT or Apache 2.0, at your option. See `LICENSE-MIT` and
`LICENSE-APACHE`.

## Contributing

See `AGENTS.md` and `CONTRIBUTING.md`. For security issues, see `SECURITY.md`.
