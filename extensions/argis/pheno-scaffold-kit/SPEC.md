# SPEC — `pheno-scaffold-kit`

## What

`pheno-scaffold-kit` is a framework substrate that renders a Cookiecutter
template for new `pheno-*` Python repos. The generated repo starts at
**Tier-0** (ADR-023 Rule 3.1) with the meta-bundle, CI gate, and
observability wiring already in place.

## When

Use it when:
- Spinning up a new `pheno-*` Python repo (library, service, or CLI).
- Bootstrapping a service that needs the fleet's observability + CI gates
  from day one.
- You want a uniform, fleet-consistent starting point.

## When NOT

- The repo is one-off and won't be part of the fleet (use a plain
  `pyproject.toml`).
- The repo is non-Python (use `pheno-cargo-template` for Rust, `pheno-go-ctxkit`
  for Go, `pheno-zod-schemas` for TS).
- The repo needs a non-Cookiecutter template engine (Copier support is
  tracked but not yet shipped — the template is still consumable as a
  Cookiecutter-only artifact).

## Quickstart (5 lines)

```python
from pheno_scaffold_kit import ScaffoldVars, render

render(
    ScaffoldVars(
        repo_name="pheno-foo",
        description="A scaffolded service.",
        author="Me",
        author_email="me@example.com",
        license="MIT",
        python_version="3.10",
    ),
    out_dir=".",
)
```

## Template contract (Cookiecutter)

The template lives at `templates/cookiecutter/`. It is rendered with the
`ScaffoldVars` dataclass fields:

| Field              | Type   | Description                                     |
| ------------------ | ------ | ----------------------------------------------- |
| `repo_name`        | `str`  | New repo name (`pheno-*` prefix encouraged).    |
| `description`      | `str`  | One-line summary for the README + llms.txt.     |
| `author`           | `str`  | Author name.                                    |
| `author_email`     | `str`  | Author email.                                   |
| `license`          | `str`  | SPDX expression (e.g. `MIT`, `Apache-2.0`, `MIT AND Apache-2.0`). |
| `python_version`   | `str`  | Minimum Python version (e.g. `3.10`).           |
| `use_structlog`    | `bool` | Wire `structlog` (ADR-036B).                    |
| `use_opentelemetry` | `bool` | Wire `opentelemetry-api` (ADR-036).             |

## Tier-0 (ADR-023 Rule 3.1)

- Spec: this file.
- Docs: `README.md` + `AGENTS.md`.
- Tests: unit (`test_render.py`) + integration (`test_integration.py`).
- Observability: `structlog` (ADR-036B).
- Coverage gate: 70% (ADR-040, framework tier).
- CI: `.github/workflows/ci.yml`.
- Worklog: v2.1 schema with `device:` field.
- Quickstart: `examples/quickstart.py`.
- License: dual MIT/Apache.
