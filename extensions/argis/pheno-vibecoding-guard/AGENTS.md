# `pheno-vibecoding-guard` — substrate agent guide

## Substrate

`pheno-vibecoding-guard` is a **lib substrate** (pure reusable library) under
the `pheno-vibe-*` naming convention. It is the canonical guard rail for
AI-assisted PRs (ADR-023 Rule 3 — substrate placement).

## Scope

- Static detection of common vibecoding failure modes (hallucinated
  imports, missing type annotations, prompt-injection-shaped comments).
- A small Python library + CLI other `pheno-*` packages can depend on.
- Rule registry that the consumer can extend.

## Non-scope

- Detecting deep semantic issues (use `mypy` for that).
- Network calls to external services (this lib is fully offline by design).
- Auto-fixing code (this lib only **reports** — fixing is the model's job).

## Tier-0 meta-bundle (this batch, w15)

This path received tier-0 governance hygiene on 2026-06-20:

- Meta-bundle: `README.md`, `AGENTS.md`, `SPEC.md`, `llms.txt`,
  `CHANGELOG.md`, `WORKLOG.md` (v2.1 schema with `device:` field), `LICENSE-MIT`,
  `LICENSE-APACHE`.
- Repo config: `pyproject.toml`, `ruff.toml` (per ADR-039), `.gitignore`, `py.typed`.
- CI: `.github/workflows/ci.yml` (test + lint + coverage at 80% gate).
- Source: `src/pheno_vibecoding_guard/{__init__,scanner,rules,__main__}.py`.
- Tests: `tests/test_scanner.py` + `tests/test_rules.py`.
- Example: `examples/quickstart.py`.

## Cross-references

- ADR-023 — Agent-effort governance (lib substrate placement).
- ADR-036B — pheno-tracing canonical (structlog mirror for Python).
- ADR-039 — pheno-flake refresh template (ruff.toml for Python).
- ADR-040 — Test coverage gates per tier (80% lib).
- ADR-025 / ADR-030 — pheno-worklog-schema v2.1 (WORKLOG.md `device:` field).

## License

Dual-licensed under MIT or Apache 2.0, at your option.

## Contributing

See `CONTRIBUTING.md`. For security issues, see `SECURITY.md`.
