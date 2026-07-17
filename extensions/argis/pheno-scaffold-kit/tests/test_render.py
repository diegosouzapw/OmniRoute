"""Tests for pheno_scaffold_kit.render() and ScaffoldVars."""

from __future__ import annotations

from pathlib import Path

import pytest

from pheno_scaffold_kit import ScaffoldVars, __version__


def test_version_is_set() -> None:
    assert __version__ == "0.1.0"


def test_scaffold_vars_to_context_includes_all_fields() -> None:
    vars = ScaffoldVars(
        repo_name="pheno-foo",
        description="A foo service.",
        author="Test Author",
        author_email="test@example.com",
        license="MIT",
        python_version="3.10",
        use_structlog=True,
        use_opentelemetry=False,
    )
    ctx = vars.to_context()
    assert ctx["repo_name"] == "pheno-foo"
    assert ctx["description"] == "A foo service."
    assert ctx["author"] == "Test Author"
    assert ctx["author_email"] == "test@example.com"
    assert ctx["license"] == "MIT"
    assert ctx["python_version"] == "3.10"
    assert ctx["use_structlog"] is True
    assert ctx["use_opentelemetry"] is False


def test_scaffold_vars_is_frozen() -> None:
    from dataclasses import FrozenInstanceError

    vars = ScaffoldVars(
        repo_name="x", description="y", author="z", author_email="a@b", license="MIT", python_version="3.10"
    )
    with pytest.raises(FrozenInstanceError):
        vars.repo_name = "other"  # type: ignore[misc]


def test_render_raises_if_template_missing(tmp_path: Path, monkeypatch) -> None:
    """If the bundled template is missing, render() should raise FileNotFoundError."""
    from pheno_scaffold_kit import scaffold

    monkeypatch.setattr(scaffold, "TEMPLATE_DIR", tmp_path / "does-not-exist")
    vars = ScaffoldVars(
        repo_name="pheno-foo",
        description="x",
        author="y",
        author_email="z@a",
        license="MIT",
        python_version="3.10",
    )
    with pytest.raises(FileNotFoundError):
        scaffold.render(vars, tmp_path)
