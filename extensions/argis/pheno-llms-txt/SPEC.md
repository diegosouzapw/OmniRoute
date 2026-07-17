# SPEC — `pheno-llms-txt`

## What

`pheno-llms-txt` generates a v1-spec compliant
[`llms.txt`](https://llmstxt.org) file from a typed Python manifest.
The manifest is a list of `Section(name, links)`. Output is plain
Markdown, deterministic, sorted.

## When

Use it when:
- Bootstrapping the `llms.txt` for a new `pheno-*` repo.
- Re-generating `llms.txt` in CI when the section list changes.
- A consumer wants a typed, machine-validated `llms.txt` (vs hand-writing).

## When NOT

- The repo already uses a non-`llms.txt` LLM context format (e.g. a custom
  JSONL). Stick with what the existing consumers expect.
- You need to **parse** an `llms.txt` (out of scope; this repo only emits).

## Quickstart (5 lines)

```python
from pheno_llms_txt import generate, Section

generate(
    project_name="pheno-foo",
    summary="One-line description.",
    sections=[Section("Docs", [("README", "https://example.com/README.md")])],
    out_path="llms.txt",
)
```

## Format spec (v1)

`llms.txt` is a single Markdown file with this structure:

```markdown
# <Project Name>

> <One-line summary>

## <Section 1 title>

- [<Link title>](<Link URL>): <Optional description>
- ...

## <Section 2 title>

- ...
```

- `#` is the project name (H1, exactly one).
- `>` is the one-line summary (blockquote, exactly one).
- `##` are section titles (H2, zero or more).
- `-` bullets are links under each section.

## API surface

```python
@dataclass(frozen=True)
class Section:
    title: str
    links: list[tuple[str, str]]  # (title, url) pairs

def generate(
    project_name: str,
    summary: str,
    sections: list[Section],
    out_path: str | Path | "-",  # "-" means stdout
) -> None: ...
```

## Tier-0 (ADR-023 Rule 3.1)

- Spec: this file.
- Docs: `README.md` + `AGENTS.md`.
- Tests: unit + spec-compliance.
- Observability: `structlog` (ADR-036B).
- Coverage gate: 80% (ADR-040, lib tier).
- CI: `.github/workflows/ci.yml`.
- Worklog: v2.1 schema with `device:` field.
- Quickstart: `examples/quickstart.py`.
- License: dual MIT/Apache.
