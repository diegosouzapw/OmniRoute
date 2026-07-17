"""pheno-worklog-schema — parse, validate, and emit WORKLOG.md (v2.1 schema, ADR-025).

Lib substrate per ADR-023 (substrate placement) + ADR-025 (v2.1 schema)
+ ADR-032 (complementary to AgilePlus JSONL, not a duplicate) +
ADR-036B (pheno-tracing mirror for Python via structlog).
"""

from __future__ import annotations

from pheno_worklog_schema.emitter import to_markdown
from pheno_worklog_schema.parser import Row, parse, migrate_v20_to_v21

__version__ = "0.1.0"

__all__ = ["Row", "parse", "to_markdown", "migrate_v20_to_v21", "__version__"]
