# `pheno-llms-txt`

> **Generate the [`llms.txt`](https://llmstxt.org) index file for any Python project.**

`pheno-llms-txt` is a tiny, dependency-light Python library that produces
the standardised `llms.txt` index file for LLM consumption. It reads a
declarative manifest of sections + links and emits the canonical Markdown
format. It is the substrate canonical for the fleet's `llms.txt` files
(see ADR-039, ADR-040).

## Why

The `llms.txt` convention is becoming a fleet-wide norm: every `pheno-*`
repo needs a stable, parseable `llms.txt` at the root. Hand-writing
these is error-prone and drifts between repos. `pheno-llms-txt` codifies
the format so all 30+ repos emit a uniform `llms.txt`.

## Where the code lives

- **Governance + meta-bundle:** this path (`pheno-llms-txt/` at the monorepo root)
- **Executable Python source:** `src/pheno_llms_txt/`
- **Spec:** [`llms.txt`](https://llmstxt.org)

## 5-line quickstart

```python
from pheno_llms_txt import generate, Section

generate(
    project_name="pheno-llms-txt",
    summary="Generate the llms.txt index file for any Python project.",
    sections=[
        Section("Docs",    [("README",  "https://example.com/README.md")]),
        Section("Source",  [("Repo",    "https://github.com/KooshaPari/phenotype-apps")]),
    ],
    out_path="llms.txt",
)
```

## When to use

- Bootstrapping the `llms.txt` for a new repo.
- Re-generating `llms.txt` in CI when the section list changes.
- Converting an existing `README.md` to a parser-friendly index.

## When NOT to use

- The repo already uses a fully-maintained llms.txt generator (e.g. fastapi's
  custom one) — there is no benefit to switching.
- You need a non-Markdown LLM context format (use a JSONL export tool).

## Features

- Generates [`llms.txt`](https://llmstxt.org) v1 spec-compliant output.
- Deterministic ordering of sections + links (sorted by title).
- `Section` and `Link` dataclasses for typed construction.
- CLI: `python -m pheno_llms_txt <manifest.json>`.
- Pure Python, no I/O deps.

## Status

- **Tier:** 0 (lib substrate, per ADR-023)
- **Coverage gate:** 80% (ADR-040)
- **Substrate canonicals:** ADR-023, ADR-036B
- **Format spec:** <https://llmstxt.org>

## License

Dual-licensed under MIT or Apache 2.0, at your option. See `LICENSE-MIT` and
`LICENSE-APACHE`.

## Contributing

See `AGENTS.md` and `CONTRIBUTING.md`. For security issues, see `SECURITY.md`.
