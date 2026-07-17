# SPEC — `pheno-vibecoding-guard`

## What

`pheno-vibecoding-guard` is a Python library + CLI that statically scans
code (or text) for known vibecoding failure modes. Each rule is a small
function that returns zero or more `Finding` objects. The scanner is
pluggable; consumers can register custom rules.

## When

Use it when:
- Running a pre-commit hook on AI-assisted PRs.
- Running a CI gate that blocks hallucinated imports.
- Surfacing findings inline as the model writes code.

## When NOT

- The repo is fully human-written and the team has no AI-assisted PRs.
- You need deep semantic analysis (use `mypy`).
- You need auto-fix capability (this lib only reports).

## Quickstart (5 lines)

```python
from pheno_vibecoding_guard import scan_text

for f in scan_text("import os\nx = os.path.join('a', 'b')\n",
                   rules=["no-hallucinated-imports"]):
    print(f.rule, f.line, f.message)
```

## API surface

```python
@dataclass(frozen=True)
class Finding:
    rule: str
    line: int
    message: str
    severity: str  # "error" | "warning" | "info"

def scan_text(text: str, rules: list[str] | None = None) -> list[Finding]: ...
def scan_file(path: str | Path, rules: list[str] | None = None) -> list[Finding]: ...
```

## Rule registry

| Rule ID                       | Severity | Detects                                                         |
| ----------------------------- | -------- | --------------------------------------------------------------- |
| `no-hallucinated-imports`     | error    | Imports that are commonly hallucinated (`os.path.join` is one). |
| `require-type-annotations`    | warning  | Public function definitions missing return type annotations.    |
| `no-prompt-injection-shapes`  | error    | Comments matching known prompt-injection patterns.              |
| `no-unbounded-retries`        | warning  | `while True` loops in scripts with no exit condition.           |

## Tier-0 (ADR-023 Rule 3.1)

- Spec: this file.
- Docs: `README.md` + `AGENTS.md`.
- Tests: unit + rule-by-rule compliance.
- Observability: `structlog` (ADR-036B).
- Coverage gate: 80% (ADR-040, lib tier).
- CI: `.github/workflows/ci.yml`.
- Worklog: v2.1 schema with `device:` field.
- Quickstart: `examples/quickstart.py`.
- License: dual MIT/Apache.
