"""Tests for pheno_worklog_schema.parse() (v2.0 + v2.1 schemas)."""

from __future__ import annotations

from pheno_worklog_schema import Row, __version__, parse


def test_version_is_set() -> None:
    assert __version__ == "0.1.0"


V21_SAMPLE = """| Date | Task ID | Layer | Action | Files | Notes | device | scope | risk | deps | links |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 2026-06-20 | L5-119 | governance | add-meta-bundle | README.md | note | macbook | pheno-x | low | none | AGENTS.md |
"""


def test_parse_v21_returns_row_with_device() -> None:
    rows = parse(V21_SAMPLE)
    assert len(rows) == 1
    assert rows[0].device == "macbook"
    assert rows[0].date == "2026-06-20"
    assert rows[0].task_id == "L5-119"
    assert rows[0].scope == "pheno-x"
    assert rows[0].risk == "low"


V20_SAMPLE = """| Date | Task ID | Layer | Action | Files | Notes |
| --- | --- | --- | --- | --- | --- |
| 2026-06-20 | L5-119 | governance | add-meta-bundle | README.md | note |
"""


def test_parse_v20_returns_row_with_default_device() -> None:
    rows = parse(V20_SAMPLE)
    assert len(rows) == 1
    assert rows[0].device == "ci"  # default per migration policy
    assert rows[0].date == "2026-06-20"
    assert rows[0].task_id == "L5-119"


def test_parse_empty_text_returns_empty() -> None:
    assert parse("") == []


def test_parse_text_without_table_returns_empty() -> None:
    assert parse("no table here\njust prose\n") == []


def test_parse_unknown_row_count_is_skipped(caplog) -> None:
    bad = """| 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
"""
    rows = parse(bad)
    assert rows == []  # 12 cells doesn't match either schema; skipped
