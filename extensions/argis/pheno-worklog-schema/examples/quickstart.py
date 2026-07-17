"""5-line quickstart for pheno-worklog-schema (per ADR-023 quickstart rule)."""

from pathlib import Path

from pheno_worklog_schema import parse, to_markdown

text = Path("WORKLOG.md").read_text(encoding="utf-8")
rows = parse(text)
Path("WORKLOG.md").write_text(to_markdown(rows), encoding="utf-8")
