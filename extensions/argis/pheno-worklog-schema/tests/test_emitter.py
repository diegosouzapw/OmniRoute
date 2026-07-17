"""Tests for pheno_worklog_schema.to_markdown() (v2.1 emitter)."""

from __future__ import annotations

from pheno_worklog_schema import Row, to_markdown


def test_to_markdown_emits_header_and_separator() -> None:
    md = to_markdown([])
    assert "| Date | Task ID | Layer | Action | Files | Notes | device | scope | risk | deps | links |" in md
    assert "| --- |" in md


def test_to_markdown_roundtrips_a_row() -> None:
    row = Row(
        date="2026-06-20",
        task_id="L5-119",
        layer="governance",
        action="add",
        files="README.md",
        notes="note",
        device="macbook",
    )
    md = to_markdown([row])
    for piece in [
        "| 2026-06-20 |",
        "L5-119",
        "governance",
        "macbook",
    ]:
        assert piece in md


def test_to_markdown_emits_one_line_per_row() -> None:
    rows = [
        Row(date="2026-06-20", task_id="A", layer="x", action="a", files="f", notes="n", device="macbook"),
        Row(date="2026-06-20", task_id="B", layer="y", action="b", files="g", notes="o", device="ci"),
    ]
    md = to_markdown(rows)
    data_lines = [ln for ln in md.splitlines() if ln.startswith("| 2026-06-20")]
    assert len(data_lines) == 2
