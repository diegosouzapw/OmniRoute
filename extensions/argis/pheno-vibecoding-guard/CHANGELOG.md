# Changelog

All notable changes to **pheno-vibecoding-guard** are recorded here. The
format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and
the project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Tier-0 meta-bundle (per ADR-023 Rule 3.1, ADR-039, ADR-040, ADR-025).
- `pyproject.toml` with `structlog` dep (ADR-036B).
- `ruff.toml` (per ADR-039; replaces `deny.toml` for Python).
- `.github/workflows/ci.yml` (test + lint + coverage at 80% gate).
- `src/pheno_vibecoding_guard/{__init__,scanner,rules,__main__}.py`.
- `tests/test_scanner.py` + `tests/test_rules.py`.
- `examples/quickstart.py` (5-line demo).
- `docs/governance.md` (cross-reference hub for constraining ADRs).
- `WORKLOG.md` v2.1 schema with `device:` field (ADR-025).
- `LICENSE-MIT` + `LICENSE-APACHE` (dual license).

## [0.0.0] — initial bootstrap

### Added
- Tier-0 governance hygiene path (governance + meta-bundle only; no source yet).
