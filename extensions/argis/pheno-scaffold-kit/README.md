# `pheno-scaffold-kit`

> **Python scaffolding template for `pheno-*` repos (framework substrate, ADR-023).**

`pheno-scaffold-kit` is the canonical Cookiecutter / Copier template for
scaffolding new `pheno-*` Python repos. It enforces the ADR-023 Rule 3.1
quality bar (spec + docs + tests + observability + coverage gate + CI +
worklog v2.1) at scaffold-time, so every new repo starts at Tier-0.

## Why

Every new `pheno-*` Python repo historically re-implemented the meta-bundle
(README, AGENTS, SPEC, llms.txt, CHANGELOG, WORKLOG, LICENSE-{MIT,APACHE},
pyproject.toml with `structlog`, ruff config, CI workflow, examples dir) by
hand. Drift was inevitable. `pheno-scaffold-kit` codifies the bundle as a
single template so the answer to "how do I start a new pheno-* repo?" is
"run `pheno-scaffold-kit`."

## Where the code lives

- **Governance + meta-bundle:** this path (`pheno-scaffold-kit/` at the monorepo root)
- **Executable Python source:** `src/pheno_scaffold_kit/`
- **Templates:** `templates/cookiecutter/`

## 5-line quickstart

```python
from pheno_scaffold_kit import ScaffoldVars, render

render(
    ScaffoldVars(
        repo_name="pheno-my-svc",
        description="A scaffolded service.",
        author="Me",
        author_email="me@example.com",
        license="MIT",
        python_version="3.10",
    ),
    out_dir=".",
)
```

## When to use

- Spinning up a new `pheno-*` Python repo (library or service).
- Bootstrapping a service that needs the fleet's observability + CI gates
  from day one.

## When NOT to use

- The repo is one-off and won't be part of the fleet (use a plain
  `pyproject.toml`).
- The repo is a non-Python crate (use `pheno-cargo-template` for Rust).

## Features

- ADR-023 Rule 3.1 quality bar pre-applied at scaffold time.
- Cookiecutter format (Copier support is tracked but not yet shipped).
- `structlog` wired into the generated `pyproject.toml` (ADR-036B).
- `ruff.toml` (not `deny.toml`) for Python lint, per ADR-039.
- `.github/workflows/ci.yml` with 70% coverage gate (ADR-040, framework tier).
- `WORKLOG.md` v2.1 schema with `device:` field (ADR-025).

## Status

- **Tier:** 0 (framework substrate, per ADR-023)
- **Coverage gate:** 70% (ADR-040, framework tier)
- **Substrate canonicals:** ADR-023, ADR-036B, ADR-039

## License

Dual-licensed under MIT or Apache 2.0, at your option. See `LICENSE-MIT` and
`LICENSE-APACHE`.

## Contributing

See `AGENTS.md` and `CONTRIBUTING.md`. For security issues, see `SECURITY.md`.
