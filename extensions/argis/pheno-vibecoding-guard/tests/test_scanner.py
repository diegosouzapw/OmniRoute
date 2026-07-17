"""Tests for pheno_vibecoding_guard.scan_text and scan_file."""

from __future__ import annotations

from pathlib import Path

import pytest

from pheno_vibecoding_guard import Finding, __version__, scan_file, scan_text


def test_version_is_set() -> None:
    assert __version__ == "0.1.0"


def test_scan_text_returns_finding_dataclass() -> None:
    text = "import os.path.join\n"
    findings = scan_text(text, rules=["no-hallucinated-imports"])
    assert all(isinstance(f, Finding) for f in findings)
    assert len(findings) == 1
    assert findings[0].line == 1
    assert findings[0].severity == "error"


def test_scan_text_unknown_rule_raises() -> None:
    with pytest.raises(KeyError):
        scan_text("x", rules=["does-not-exist"])


def test_scan_text_empty_text_returns_empty(tmp_path: Path) -> None:
    assert scan_text("") == []


def test_scan_file_reads_and_scans(tmp_path: Path) -> None:
    p = tmp_path / "x.py"
    p.write_text("import string.startswith\n", encoding="utf-8")
    findings = scan_file(p, rules=["no-hallucinated-imports"])
    assert len(findings) == 1
    assert findings[0].rule == "no-hallucinated-imports"


def test_scan_text_default_runs_all_rules() -> None:
    text = "def foo():\n    pass\nimport os.path.join\n"
    findings = scan_text(text)
    rules_hit = {f.rule for f in findings}
    assert "no-hallucinated-imports" in rules_hit
    assert "require-type-annotations" in rules_hit
