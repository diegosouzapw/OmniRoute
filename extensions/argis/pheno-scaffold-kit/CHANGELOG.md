# Changelog

All notable changes to **pheno-scaffold-kit** are recorded here. The format
follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and the
project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Tier-0 meta-bundle (per ADR-023 Rule 3.1, ADR-039, ADR-040, ADR-025).
- `pyproject.toml` with `structlog` + `cookiecutter` deps (ADR-036B).
- `ruff.toml` (per ADR-039; replaces `deny.toml` for Python).
- `.github/workflows/ci.yml` (test + lint + coverage at 70% gate).
- `src/pheno_scaffold_kit/{__init__,scaffold,__main__}.py`.
- `tests/test_render.py` + `tests/test_integration.py`.
- `templates/cookiecutter/{manifest.json,README.md}` (Cookiecutter source).
- `examples/quickstart.py` (5-line demo).
- `docs/governance.md` (cross-reference hub for constraining ADRs).
- `WORKLOG.md` v2.1 schema with `device:` field (ADR-025).
- `LICENSE-MIT` + `LICENSE-APACHE` (dual license).

## [0.0.0] — initial bootstrap

### Added
- Tier-0 governance hygiene path (governance + meta-bundle only; no source yet).
