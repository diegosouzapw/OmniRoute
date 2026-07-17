# SPEC — `pheno-worklog-schema`

## What

`pheno-worklog-schema` is a Python library + CLI that parses, validates,
and emits the Phenotype fleet's `WORKLOG.md` files. The canonical
schema is **v2.1** (ADR-025 / ADR-030) with 11 columns including
`device:`.

## When

Use it when:
- Validating a `WORKLOG.md` file in CI.
- Migrating a v2.0 (10-col) worklog to v2.1 (11-col).
- Generating a `WORKLOG.md` from a typed manifest in a scaffold template.
- Building a fleet-wide audit that reads every repo's `WORKLOG.md`.

## When NOT

- The worklog is the AgilePlus JSONL format. Use `pheno-agileplus-worklog`
  (per ADR-032, the two formats coexist).
- You need a database or persistent store (this lib is stateless).
- The worklog is non-tabular (e.g. free-form prose). This lib expects a
  Markdown table.

## Quickstart (5 lines)

```python
from pheno_worklog_schema import parse, to_markdown

rows = parse(Path("WORKLOG.md").read_text())
for r in rows:
    print(r.date, r.task_id, r.device)
md = to_markdown(rows)
```

## API surface

```python
@dataclass(frozen=True)
class Row:
    date: str
    task_id: str
    layer: str
    action: str
    files: str
    notes: str
    device: str  # v2.1 field
    scope: str = ""
    risk: str = "low"
    deps: str = ""
    links: str = ""

def parse(text: str) -> list[Row]: ...               # accepts v2.0 + v2.1
def to_markdown(rows: list[Row]) -> str: ...        # emits v2.1
def migrate_v20_to_v21(rows: list[Row]) -> list[Row]: ...  # device=ci
```

## Tier-0 (ADR-023 Rule 3.1)

- Spec: this file.
- Docs: `README.md` + `AGENTS.md`.
- Tests: unit + migration (v2.0 → v2.1) + emitter.
- Observability: `structlog` (ADR-036B).
- Coverage gate: 80% (ADR-040, lib tier).
- CI: `.github/workflows/ci.yml`.
- Worklog: v2.1 schema with `device:` field (dogfooding).
- Quickstart: `examples/quickstart.py`.
- License: dual MIT/Apache.
