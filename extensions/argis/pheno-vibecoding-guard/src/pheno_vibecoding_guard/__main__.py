"""CLI entry point for pheno-vibecoding-guard (per ADR-023 quickstart rule)."""

from __future__ import annotations

import sys
from pathlib import Path

import click

from pheno_vibecoding_guard import scan_file


@click.command()
@click.argument("path", type=click.Path(exists=True))
@click.option(
    "--rule", "rules", multiple=True, help="Rule to apply (repeatable). Default: all."
)
@click.option(
    "--fail-on", default="error", show_default=True, help="Severity to fail on."
)
def main(path: str, rules: tuple[str, ...], fail_on: str) -> None:
    """Scan a file for vibecoding failure modes."""
    findings = scan_file(path, list(rules) if rules else None)
    severity_order = {"error": 0, "warning": 1, "info": 2}
    fail_rank = severity_order[fail_on]
    for f in findings:
        click.echo(f"{f.rule}\t{f.line}\t{f.severity}\t{f.message}")
    bad = [f for f in findings if severity_order[f.severity] <= fail_rank]
    if bad:
        click.echo(f"\nFAIL: {len(bad)} finding(s) >= {fail_on}", err=True)
        sys.exit(1)
    click.echo(f"OK: {len(findings)} finding(s)")


if __name__ == "__main__":
    main()
