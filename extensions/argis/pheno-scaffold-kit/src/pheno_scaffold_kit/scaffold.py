"""Scaffold rendering for pheno-scaffold-kit.

The scaffold renders a Cookiecutter template (`templates/cookiecutter/`)
into a target directory. The template embeds the ADR-023 Rule 3.1
quality bar (Tier-0 meta-bundle) so every new repo starts at Tier-0.
"""

from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path
from typing import Any

try:
    import structlog
    log = structlog.get_logger(__name__)
except ImportError:  # pragma: no cover
    import logging
    log = logging.getLogger(__name__)  # type: ignore[assignment]

# Path to the bundled Cookiecutter template (relative to the package root).
TEMPLATE_DIR = Path(__file__).parent.parent.parent / "templates" / "cookiecutter"


@dataclass(frozen=True)
class ScaffoldVars:
    """Variables consumed by the Cookiecutter template."""

    repo_name: str
    description: str
    author: str
    author_email: str
    license: str  # "MIT" | "Apache-2.0" | "MIT AND Apache-2.0"
    python_version: str
    use_structlog: bool = True
    use_opentelemetry: bool = False

    def to_context(self) -> dict[str, Any]:
        return {
            "repo_name": self.repo_name,
            "description": self.description,
            "author": self.author,
            "author_email": self.author_email,
            "license": self.license,
            "python_version": self.python_version,
            "use_structlog": self.use_structlog,
            "use_opentelemetry": self.use_opentelemetry,
        }


def render(vars: ScaffoldVars, out_dir: str | Path) -> Path:
    """Render the scaffold template to ``out_dir``.

    Returns the resolved output path. Raises ``FileNotFoundError`` if
    the bundled template directory is missing.
    """
    if not TEMPLATE_DIR.exists():
        raise FileNotFoundError(f"bundled template not found at {TEMPLATE_DIR}")

    try:
        from cookiecutter.main import cookiecutter
    except ImportError as e:  # pragma: no cover
        raise ImportError(
            "cookiecutter is required; install with `pip install cookiecutter`"
        ) from e

    log.info("scaffold.render", repo=vars.repo_name, out=str(out_dir))
    cookiecutter(
        str(TEMPLATE_DIR),
        no_input=True,
        extra_context=vars.to_context(),
        output_dir=str(out_dir),
    )
    return Path(out_dir) / vars.repo_name
