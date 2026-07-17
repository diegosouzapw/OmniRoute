"""Parser for the WORKLOG.md v2.1 schema (ADR-025).

The v2.1 schema is the canonical 11-column Markdown table format used
across the Phenotype fleet. v2.0 (10-column) is also accepted for
backwards compatibility — see ``migrate_v20_to_v21``.

The v2.1 columns are:

    1. Date
    2. Task ID
    3. Layer
    4. Action
    5. Files
    6. Notes
    7. device           (new in v2.1)
    8. scope
    9. risk
   10. deps
   11. links

v2.0 had 6 data columns (Date | Task ID | Layer | Action | Files | Notes),
i.e. 7 cells. v2.1 has 11 cells. The parser auto-detects by counting
the pipe-delimited cells in each data row.
"""

from __future__ import annotations

from dataclasses import dataclass

try:
    import structlog
    log = structlog.get_logger(__name__)
except ImportError:  # pragma: no cover
    import logging
    log = logging.getLogger(__name__)  # type: ignore[assignment]

# Cell counts (excludes the empty leading + trailing pipe tokens).
V20_CELLS = 6   # v2.0 schema: Date | Task ID | Layer | Action | Files | Notes
V21_CELLS = 11  # v2.1 schema: 11 columns including device


@dataclass(frozen=True)
class Row:
    date: str
    task_id: str
    layer: str
    action: str
    files: str
    notes: str
    device: str  # v2.1 field
    scope: str = ""
    risk: str = "low"
    deps: str = ""
    links: str = ""


def _split_row(line: str) -> list[str]:
    """Split a Markdown table row by `|`, trimming whitespace and dropping empty edges."""
    parts = [p.strip() for p in line.split("|")]
    if parts and parts[0] == "":
        parts = parts[1:]
    if parts and parts[-1] == "":
        parts = parts[:-1]
    return parts


def _is_separator(line: str) -> bool:
    """Return True if the line is a Markdown table separator (e.g. |---|---|)."""
    cells = _split_row(line)
    if not cells:
        return False
    return all(set(c) <= set("-: ") and c for c in cells)


def parse(text: str) -> list[Row]:
    """Parse a WORKLOG.md ``text`` into a list of ``Row`` objects.

    Accepts both v2.0 (7-cell) and v2.1 (11-cell) schemas. v2.0 rows get
    a default ``device="ci"`` (per the v2.0→v2.1 migration policy).
    """
    rows: list[Row] = []
    saw_separator = False
    header_seen = False
    for line in text.splitlines():
        stripped = line.strip()
        if not stripped.startswith("|"):
            saw_separator = False
            header_seen = False
            continue
        if _is_separator(stripped):
            saw_separator = True
            continue
        if not saw_separator:
            # Header row. The header names (Date | Task ID | ...) appear
            # before the separator; data rows appear after.
            cells = _split_row(stripped)
            if len(cells) in (V20_CELLS, V21_CELLS):
                header_seen = True
            continue
        if not header_seen:
            continue
        cells = _split_row(stripped)
        if len(cells) == V21_CELLS:
            rows.append(
                Row(
                    date=cells[0],
                    task_id=cells[1],
                    layer=cells[2],
                    action=cells[3],
                    files=cells[4],
                    notes=cells[5],
                    device=cells[6],
                    scope=cells[7],
                    risk=cells[8] or "low",
                    deps=cells[9],
                    links=cells[10],
                )
            )
        elif len(cells) == V20_CELLS:
            # v2.0 — default `device=ci` per the migration policy.
            rows.append(
                Row(
                    date=cells[0],
                    task_id=cells[1],
                    layer=cells[2],
                    action=cells[3],
                    files=cells[4],
                    notes=cells[5],
                    device="ci",
                )
            )
        else:
            # Unknown schema — skip with a warning log.
            log.warning(
                "worklog_schema.unknown_row", cells=len(cells), line=stripped[:80]
            )
    return rows


def migrate_v20_to_v21(rows: list[Row]) -> list[Row]:
    """Idempotently ensure every row has a non-empty ``device`` field.

    Rows that were parsed from a v2.0 schema already have ``device="ci"``
    (set by ``parse``). This helper exists so a consumer can call it
    explicitly to "migrate" a parsed list; it is a no-op for v2.1 rows.
    """
    out: list[Row] = []
    for r in rows:
        if r.device:
            out.append(r)
        else:
            out.append(
                Row(
                    date=r.date,
                    task_id=r.task_id,
                    layer=r.layer,
                    action=r.action,
                    files=r.files,
                    notes=r.notes,
                    device="ci",
                    scope=r.scope,
                    risk=r.risk,
                    deps=r.deps,
                    links=r.links,
                )
            )
    return out
