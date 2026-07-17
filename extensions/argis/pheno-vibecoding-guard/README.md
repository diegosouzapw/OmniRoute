# `pheno-vibecoding-guard`

> **Static guard rails for AI-assisted coding sessions (lib substrate, ADR-023).**

`pheno-vibecoding-guard` is a Python library + CLI that detects common
vibecoding failure modes in generated code: hallucinated imports, missing
type annotations, prompt-injection-shaped comments, and unbounded retries.
It is the canonical pre-commit + CI guard for the fleet's AI-assisted
PRs.

## Why

The fleet increasingly ships code that was partially or fully
AI-generated. A small set of recurring failure modes (e.g. "the model
imported `os.path.join` from `os` even though it doesn't exist there")
need to be caught before review. `pheno-vibecoding-guard` codifies the
guard rails so every repo can run the same lint, pre-commit, and CI gate.

## Where the code lives

- **Governance + meta-bundle:** this path (`pheno-vibecoding-guard/` at the monorepo root)
- **Executable Python source:** `src/pheno_vibecoding_guard/`
- **Rule definitions:** `src/pheno_vibecoding_guard/rules.py`

## 5-line quickstart

```python
from pheno_vibecoding_guard import scan_text

findings = scan_text(
    "import os\nx = os.path.join('a', 'b')\n",
    rules=["no-hallucinated-imports", "require-type-annotations"],
)
for f in findings:
    print(f.rule, f.line, f.message)
```

## When to use

- Pre-commit hook: catch vibecoding failures before they reach review.
- CI gate: block PRs that introduce known hallucination patterns.
- Editor integration: surface findings as the model writes code.

## When NOT to use

- The repo is fully human-written and the team has no AI-assisted PRs.
- You need a general-purpose linter (use `ruff` per ADR-039).
- You need to detect deep semantic issues (use a static type checker like
  `mypy` — `pheno-vibecoding-guard` is intentionally shallow).

## Features

- Pluggable rule registry.
- Pure Python stdlib + `structlog` (ADR-036B). No network calls.
- CLI: `python -m pheno_vibecoding_guard <file>`.
- Library: `scan_text(text, rules=...)` returns `list[Finding]`.

## Status

- **Tier:** 0 (lib substrate, per ADR-023)
- **Coverage gate:** 80% (ADR-040)
- **Substrate canonicals:** ADR-023, ADR-036B

## License

Dual-licensed under MIT or Apache 2.0, at your option. See `LICENSE-MIT` and
`LICENSE-APACHE`.

## Contributing

See `AGENTS.md` and `CONTRIBUTING.md`. For security issues, see `SECURITY.md`.
