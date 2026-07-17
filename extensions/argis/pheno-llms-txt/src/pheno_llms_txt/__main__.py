"""CLI entry point for pheno-llms-txt (per ADR-023 quickstart rule)."""

from __future__ import annotations

import json
import sys
from pathlib import Path

import click

from pheno_llms_txt import Section, generate


@click.command()
@click.argument("manifest", type=click.Path(exists=True), required=False)
@click.option("--project-name", help="Project name (H1).")
@click.option("--summary", help="One-line summary (blockquote).")
@click.option("--out", "out_path", default="llms.txt", show_default=True, help="Output file (use '-' for stdout).")
def main(manifest: str | None, project_name: str | None, summary: str | None, out_path: str) -> None:
    """Generate an llms.txt from a JSON manifest.

    Manifest schema::

        {
          "project_name": "...",
          "summary": "...",
          "sections": [
            {"title": "Docs", "links": [["README", "https://...", "optional desc"], ...]},
            ...
          ]
        }
    """
    if manifest is None and (project_name is None or summary is None):
        click.echo("ERROR: provide a manifest path OR --project-name + --summary", err=True)
        sys.exit(2)

    if manifest is not None:
        data = json.loads(Path(manifest).read_text(encoding="utf-8"))
        project_name = data["project_name"]
        summary = data["summary"]
        sections = [
            Section(title=s["title"], links=[tuple(link) for link in s["links"]])
            for s in data["sections"]
        ]
    else:
        sections = []

    try:
        generate(project_name=project_name, summary=summary, sections=sections, out_path=out_path)
    except (ValueError, KeyError) as e:
        click.echo(f"ERROR: {e}", err=True)
        sys.exit(1)


if __name__ == "__main__":
    main()
