"""pheno-scaffold-kit — canonical scaffolding framework for new pheno-* Python repos.

Framework substrate per ADR-023 (substrate placement) + ADR-036B
(pheno-tracing mirror for Python via structlog).
"""

from __future__ import annotations

from pheno_scaffold_kit.scaffold import ScaffoldVars, render

__version__ = "0.1.0"

__all__ = ["ScaffoldVars", "render", "__version__"]
