"""pheno-vibecoding-guard — static guard rails for AI-assisted coding sessions.

Lib substrate per ADR-023 (substrate placement) + ADR-036B
(pheno-tracing mirror for Python via structlog).
"""

from __future__ import annotations

from pheno_vibecoding_guard.scanner import Finding, scan_file, scan_text

__version__ = "0.1.0"

__all__ = ["Finding", "scan_file", "scan_text", "__version__"]
