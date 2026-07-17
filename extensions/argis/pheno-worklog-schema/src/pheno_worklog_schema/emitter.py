"""Emitter for the WORKLOG.md v2.1 schema (ADR-025)."""

from __future__ import annotations

from pheno_worklog_schema.parser import Row

#: The v2.1 header (11 columns).
HEADER = (
    "| Date | Task ID | Layer | Action | Files | Notes | device | scope | risk | deps | links |"
)
SEPARATOR = (
    "| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |"
)


def to_markdown(rows: list[Row]) -> str:
    """Render ``rows`` as a v2.1 WORKLOG.md Markdown table.

    The output is deterministic: rows are emitted in input order. The
    header + separator are always present.
    """
    lines = [HEADER, SEPARATOR]
    for r in rows:
        lines.append(
            f"| {r.date} | {r.task_id} | {r.layer} | {r.action} | {r.files} | "
            f"{r.notes} | {r.device} | {r.scope} | {r.risk} | {r.deps} | {r.links} |"
        )
    return "\n".join(lines) + "\n"
