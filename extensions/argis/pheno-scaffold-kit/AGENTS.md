# `pheno-scaffold-kit` — substrate agent guide

## Substrate

`pheno-scaffold-kit` is a **framework substrate** (per ADR-023 Rule 3 — substrate
placement). It hosts the canonical Cookiecutter template that generates new
`pheno-*` Python repos at Tier-0.

## Scope

- Generating a new `pheno-*` Python repo (library, service, or CLI) with the
  ADR-023 Rule 3.1 meta-bundle pre-applied.
- Wiring `structlog` (ADR-036B) and `ruff.toml` (ADR-039) into the generated
  `pyproject.toml` + `ruff.toml`.
- Enforcing the 70% framework-tier coverage gate (ADR-040) at scaffold-time.

## Non-scope

- Scaffolding non-Python repos. For Rust, use `pheno-cargo-template`.
- Running the generated CI workflows (the consumer repo does that).
- Maintaining the canonical list of `pheno-*` repo names. The list is in
  `phenotype-registry` (out of scope here).

## Tier-0 meta-bundle (this batch, w15)

This path received tier-0 governance hygiene on 2026-06-20:

- Meta-bundle: `README.md`, `AGENTS.md`, `SPEC.md`, `llms.txt`,
  `CHANGELOG.md`, `WORKLOG.md` (v2.1 schema with `device:` field), `LICENSE-MIT`,
  `LICENSE-APACHE`.
- Repo config: `pyproject.toml`, `ruff.toml`, `.gitignore`, `py.typed`.
- CI: `.github/workflows/ci.yml` (test + lint + coverage at 70% gate).
- Source: `src/pheno_scaffold_kit/{__init__,scaffold,__main__}.py`.
- Tests: `tests/test_render.py` + `tests/test_integration.py`.
- Template: `templates/cookiecutter/manifest.json` (Cookiecutter source).
- Example: `examples/quickstart.py`.

## Cross-references

- ADR-023 — Agent-effort governance (framework substrate placement).
- ADR-025 / ADR-030 — pheno-worklog-schema v2.1 (WORKLOG.md `device:` field).
- ADR-036B — pheno-tracing canonical (structlog mirror for Python).
- ADR-039 — pheno-flake refresh template (ruff.toml for Python).
- ADR-040 — Test coverage gates per tier (70% framework).

## License

Dual-licensed under MIT or Apache 2.0, at your option.

## Contributing

See `CONTRIBUTING.md`. For security issues, see `SECURITY.md`.
