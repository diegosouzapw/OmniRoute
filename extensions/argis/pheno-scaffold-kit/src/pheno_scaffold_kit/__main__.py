"""CLI entry point for pheno-scaffold-kit (per ADR-023 quickstart rule)."""

from __future__ import annotations

import sys
from pathlib import Path

import click

from pheno_scaffold_kit import ScaffoldVars, render


@click.command()
@click.option("--repo-name", required=True, help="Repo name (e.g. 'pheno-foo').")
@click.option("--description", required=True, help="One-line description.")
@click.option("--author", required=True, help="Author name.")
@click.option("--author-email", required=True, help="Author email.")
@click.option(
    "--license", default="MIT AND Apache-2.0", show_default=True, help="SPDX license expression."
)
@click.option("--python-version", default="3.10", show_default=True, help="Minimum Python version.")
@click.option(
    "--use-structlog/--no-structlog", default=True, help="Wire structlog (ADR-036B)."
)
@click.option(
    "--use-opentelemetry/--no-opentelemetry",
    default=False,
    help="Wire opentelemetry-api (ADR-036).",
)
@click.option("--out-dir", type=click.Path(), default=".", help="Output directory.")
def main(
    repo_name: str,
    description: str,
    author: str,
    author_email: str,
    license: str,
    python_version: str,
    use_structlog: bool,
    use_opentelemetry: bool,
    out_dir: str,
) -> None:
    """Render a new pheno-* Python repo from the bundled template."""
    vars = ScaffoldVars(
        repo_name=repo_name,
        description=description,
        author=author,
        author_email=author_email,
        license=license,
        python_version=python_version,
        use_structlog=use_structlog,
        use_opentelemetry=use_opentelemetry,
    )
    try:
        out = render(vars, out_dir)
    except (FileNotFoundError, ImportError) as e:
        click.echo(f"ERROR: {e}", err=True)
        sys.exit(1)
    click.echo(f"OK: scaffolded {out}")


if __name__ == "__main__":
    main()
