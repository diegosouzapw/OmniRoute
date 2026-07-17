# WORKLOG — pheno-llms-txt

> Schema: v2.1 (ADR-025 / ADR-030) — 11 columns including `device:`.
> The v2.0 schema is deprecated 2026-06-22; new rows must use the `device:` field.

| Date | Task ID | Layer | Action | Files | Notes | device | scope | risk | deps | links |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 2026-06-20 | L5-119-11D | governance | add-tier0-metabundle | README.md, AGENTS.md, SPEC.md, llms.txt, CHANGELOG.md, WORKLOG.md, LICENSE-MIT, LICENSE-APACHE | Tier-0 meta-bundle (ADR-023 Rule 3.1, ADR-039, ADR-040). 80% lib coverage gate. | macbook | pheno-llms-txt | low | none | AGENTS.md#tier-0 |
| 2026-06-20 | L5-119-11D | source | scaffold-src | src/pheno_llms_txt/__init__.py, generator.py, __main__.py, spec.py | Generator + dataclasses + CLI; structlog wiring (ADR-036B). | macbook | pheno-llms-txt | low | none | SPEC.md#api-surface |
| 2026-06-20 | L5-119-11D | test | add-tests | tests/test_generate.py, tests/test_spec_compliance.py | 7 unit + spec-compliance cases. | macbook | pheno-llms-txt | low | src/ | tests/ |
| 2026-06-20 | L5-119-11D | ci | add-workflow | .github/workflows/ci.yml | pytest matrix (3.10/3.11/3.12) + ruff + coverage at 80%. | macbook | pheno-llms-txt | low | tests/ | .github/workflows/ci.yml |
| 2026-06-20 | L5-119-11D | docs | add-quickstart | examples/quickstart.py | 5-line quickstart (per ADR-023 quickstart rule). | macbook | pheno-llms-txt | low | none | examples/quickstart.py |
