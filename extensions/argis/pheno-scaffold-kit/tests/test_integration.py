"""Integration test: render the template to a tmp dir, assert the meta-bundle exists.

This test is opt-in (skipped if cookiecutter is not installed). The CI
runs the full test matrix including this test.
"""

from __future__ import annotations

from pathlib import Path

import pytest

cookiecutter = pytest.importorskip("cookiecutter")

from pheno_scaffold_kit import ScaffoldVars, render


def test_render_produces_tier0_metabundle(tmp_path: Path) -> None:
    vars = ScaffoldVars(
        repo_name="pheno-test-svc",
        description="A test service scaffolded by pheno-scaffold-kit.",
        author="Test Author",
        author_email="test@example.com",
        license="MIT",
        python_version="3.10",
    )
    out = render(vars, tmp_path)
    assert out.exists()
    # Assert the ADR-023 Rule 3.1 meta-bundle is present.
    for required in [
        "README.md",
        "AGENTS.md",
        "SPEC.md",
        "llms.txt",
        "CHANGELOG.md",
        "WORKLOG.md",
        "LICENSE-MIT",
        "LICENSE-APACHE",
        "pyproject.toml",
        "ruff.toml",
        ".github/workflows/ci.yml",
        "src/pheno_test_svc/__init__.py",
        "examples/quickstart.py",
        "docs/governance.md",
    ]:
        assert (out / required).exists(), f"missing meta-bundle file: {required}"


def test_worklog_uses_v21_device_field(tmp_path: Path) -> None:
    vars = ScaffoldVars(
        repo_name="pheno-w21-svc",
        description="A worklog-v2.1 test.",
        author="Test Author",
        author_email="test@example.com",
        license="MIT",
        python_version="3.10",
    )
    out = render(vars, tmp_path)
    worklog = (out / "WORKLOG.md").read_text(encoding="utf-8")
    assert "device" in worklog, "WORKLOG.md must include the v2.1 `device:` field (ADR-025)"
