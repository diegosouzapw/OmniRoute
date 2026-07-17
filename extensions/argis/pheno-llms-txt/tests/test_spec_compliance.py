"""Spec-compliance tests for the llms.txt v1 output."""

from __future__ import annotations

import re

from pheno_llms_txt import FORMAT_VERSION, Section, generate


def test_format_version_is_v1() -> None:
    assert FORMAT_VERSION == "v1"


def test_output_contains_h1_project_name() -> None:
    text = generate("proj", "sum", [Section("S", [("L", "u")])], "-")
    assert re.search(r"^# proj$", text, re.MULTILINE) is not None


def test_output_contains_blockquote_summary() -> None:
    text = generate("proj", "sum", [Section("S", [("L", "u")])], "-")
    assert re.search(r"^> sum$", text, re.MULTILINE) is not None


def test_output_contains_h2_section() -> None:
    text = generate("proj", "sum", [Section("Docs", [("R", "u")])], "-")
    assert re.search(r"^## Docs$", text, re.MULTILINE) is not None


def test_output_contains_markdown_link_bullet() -> None:
    text = generate("proj", "sum", [Section("Docs", [("R", "https://e")])], "-")
    assert re.search(r"^- \[R\]\(https://e\)$", text, re.MULTILINE) is not None


def test_no_extra_blank_lines_in_section() -> None:
    text = generate("proj", "sum", [Section("Docs", [("R", "u")])], "-")
    # Each section is exactly: H2 + blank + bullets + blank
    # There should be no consecutive blanks within a section.
    assert "\n\n\n" not in text
