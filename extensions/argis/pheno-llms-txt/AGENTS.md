# `pheno-llms-txt` — substrate agent guide

## Substrate

`pheno-llms-txt` is a **lib substrate** (pure reusable library) under
the `pheno-llms-*` naming convention. It is the canonical generator for
`llms.txt` files across the fleet (ADR-023 Rule 3 — substrate placement).

## Scope

- Generating a v1-spec [`llms.txt`](https://llmstxt.org) from a typed manifest.
- CLI entry point for batch / CI use.
- A small Python library that other `pheno-*` packages can depend on.

## Non-scope

- Generating `llms-full.txt` (the full-document variant). Tracked separately.
- Parsing existing `llms.txt` files. Use `pheno-llms-txt-parser` (if/when it
  exists) — this repo only **emits** the file.
- Re-implementing the `llms.txt` v2 spec (when it lands). v2 will be a
  breaking change and will live in `pheno-llms-txt-v2`.

## Tier-0 meta-bundle (this batch, w15)

This path received tier-0 governance hygiene on 2026-06-20:

- Meta-bundle: `README.md`, `AGENTS.md`, `SPEC.md`, `llms.txt`,
  `CHANGELOG.md`, `WORKLOG.md` (v2.1 schema with `device:` field), `LICENSE-MIT`,
  `LICENSE-APACHE`.
- Repo config: `pyproject.toml`, `ruff.toml` (per ADR-039), `.gitignore`, `py.typed`.
- CI: `.github/workflows/ci.yml` (test + lint + coverage at 80% gate).
- Source: `src/pheno_llms_txt/{__init__,generator,__main__,spec}.py`.
- Tests: `tests/test_generate.py` + `tests/test_spec_compliance.py`.
- Example: `examples/quickstart.py`.

## Cross-references

- ADR-023 — Agent-effort governance (lib substrate placement).
- ADR-036B — pheno-tracing canonical (structlog mirror for Python).
- ADR-039 — pheno-flake refresh template (ruff.toml for Python).
- ADR-040 — Test coverage gates per tier (80% lib).
- ADR-025 — pheno-worklog-schema v2.1 (WORKLOG.md `device:` field).

## License

Dual-licensed under MIT or Apache 2.0, at your option.

## Contributing

See `CONTRIBUTING.md`. For security issues, see `SECURITY.md`.
