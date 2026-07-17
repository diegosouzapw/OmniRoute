"""pheno-llms-txt — generate the v1-spec llms.txt index for any Python project.

Lib substrate per ADR-023 (substrate placement) + ADR-036B
(pheno-tracing mirror for Python via structlog).
"""

from __future__ import annotations

from pheno_llms_txt.generator import Section, generate
from pheno_llms_txt.spec import FORMAT_VERSION

__version__ = "0.1.0"

__all__ = ["Section", "generate", "FORMAT_VERSION", "__version__"]
