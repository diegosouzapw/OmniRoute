"""CLI entry point for pheno-worklog-schema (per ADR-023 quickstart rule)."""

from __future__ import annotations

import sys
from pathlib import Path

import click

from pheno_worklog_schema import migrate_v20_to_v21, parse, to_markdown


@click.group()
def main() -> None:
    """Validate, migrate, and emit WORKLOG.md files (v2.1 schema, ADR-025)."""


@main.command()
@click.argument("path", type=click.Path(exists=True))
def validate(path: str) -> None:
    """Validate a WORKLOG.md file (parse + schema check)."""
    text = Path(path).read_text(encoding="utf-8")
    rows = parse(text)
    if not rows:
        click.echo(f"ERROR: no data rows found in {path}", err=True)
        sys.exit(1)
    v21_count = sum(1 for r in rows if r.device)
    click.echo(f"OK: {len(rows)} row(s); {v21_count} v2.1 (with device field)")


@main.command()
@click.argument("path", type=click.Path(exists=True))
def migrate(path: str) -> None:
    """Migrate a v2.0 WORKLOG.md → v2.1 (add the `device:` column, default `ci`)."""
    text = Path(path).read_text(encoding="utf-8")
    rows = parse(text)
    migrated = migrate_v20_to_v21(rows)
    Path(path).write_text(to_markdown(migrated), encoding="utf-8")
    click.echo(f"OK: migrated {path} ({len(migrated)} row(s))")


@main.command()
@click.argument("path", type=click.Path(exists=True))
@click.option("--out", "out_path", default="-", show_default=True, help="Output file or '-' for stdout.")
def emit(path: str, out_path: str) -> None:
    """Re-emit a WORKLOG.md in canonical v2.1 form (deterministic)."""
    text = Path(path).read_text(encoding="utf-8")
    rows = parse(text)
    out = to_markdown(migrate_v20_to_v21(rows))
    if out_path == "-":
        click.echo(out, nl=False)
    else:
        Path(out_path).write_text(out, encoding="utf-8")
        click.echo(f"OK: wrote {out_path}")


if __name__ == "__main__":
    main()
