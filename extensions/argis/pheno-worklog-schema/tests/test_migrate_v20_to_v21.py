"""Tests for pheno_worklog_schema.migrate_v20_to_v21."""

from __future__ import annotations

from pheno_worklog_schema import Row, migrate_v20_to_v21, parse


V20_SAMPLE = """| Date | Task ID | Layer | Action | Files | Notes |
| --- | --- | --- | --- | --- | --- |
| 2026-06-20 | L5-119 | governance | add | README.md | note |
"""


def test_migrate_v20_to_v21_is_idempotent() -> None:
    rows = parse(V20_SAMPLE)
    migrated = migrate_v20_to_v21(rows)
    assert all(r.device == "ci" for r in migrated)
    again = migrate_v20_to_v21(migrated)
    assert again == migrated


def test_migrate_fills_empty_device() -> None:
    """A row with device='' should be migrated to device='ci'."""
    r = Row(date="d", task_id="t", layer="l", action="a", files="f", notes="n", device="")
    migrated = migrate_v20_to_v21([r])
    assert migrated[0].device == "ci"


def test_migrate_preserves_device_when_set() -> None:
    r = Row(date="d", task_id="t", layer="l", action="a", files="f", notes="n", device="macbook")
    migrated = migrate_v20_to_v21([r])
    assert migrated[0].device == "macbook"
