"""Tests for pheno_llms_txt.generate() and Section."""

from __future__ import annotations

import io
from contextlib import redirect_stdout
from pathlib import Path

import pytest

from pheno_llms_txt import Section, __version__, generate


def test_version_is_set() -> None:
    assert __version__ == "0.1.0"


def test_basic_generate_to_string() -> None:
    text = generate(
        project_name="x",
        summary="y",
        sections=[Section("Docs", [("README", "https://e/README")])],
        out_path="-",
    )
    assert "# x" in text
    assert "> y" in text
    assert "## Docs" in text
    assert "[README](https://e/README)" in text


def test_sections_sorted_by_title() -> None:
    text = generate(
        project_name="x",
        summary="y",
        sections=[
            Section("Zeta", [("Z", "https://e/z")]),
            Section("Alpha", [("A", "https://e/a")]),
        ],
        out_path="-",
    )
    assert text.index("## Alpha") < text.index("## Zeta")


def test_empty_project_name_raises() -> None:
    with pytest.raises(ValueError):
        generate(project_name="", summary="y", sections=[])


def test_empty_summary_raises() -> None:
    with pytest.raises(ValueError):
        generate(project_name="x", summary="", sections=[])


def test_empty_section_title_raises() -> None:
    with pytest.raises(ValueError):
        Section(title="", links=[("a", "b")])


def test_empty_section_links_raises() -> None:
    with pytest.raises(ValueError):
        Section(title="X", links=[])


def test_write_to_file(tmp_path: Path) -> None:
    out = tmp_path / "llms.txt"
    text = generate(
        project_name="p",
        summary="s",
        sections=[Section("Docs", [("README", "https://e/r")])],
        out_path=out,
    )
    assert out.read_text(encoding="utf-8") == text


def test_three_tuple_link_includes_description() -> None:
    text = generate(
        project_name="p",
        summary="s",
        sections=[Section("Docs", [("README", "https://e/r", "the readme")])],
        out_path="-",
    )
    assert "[README](https://e/r): the readme" in text


def test_stdout_output_uses_redirect(tmp_path: Path) -> None:
    buf = io.StringIO()
    with redirect_stdout(buf):
        generate(project_name="p", summary="s", sections=[Section("A", [("B", "c")])], out_path="-")
    out = buf.getvalue()
    assert "# p" in out
