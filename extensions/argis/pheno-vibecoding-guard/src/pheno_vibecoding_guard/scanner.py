"""Scanner entry points for pheno-vibecoding-guard."""

from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path
from typing import Callable

try:
    import structlog
    log = structlog.get_logger(__name__)
except ImportError:  # pragma: no cover
    import logging
    log = logging.getLogger(__name__)  # type: ignore[assignment]


@dataclass(frozen=True)
class Finding:
    """A single rule violation."""

    rule: str
    line: int
    message: str
    severity: str  # "error" | "warning" | "info"


def scan_text(
    text: str,
    rules: list[str] | None = None,
) -> list[Finding]:
    """Scan ``text`` with the named rules (default: all registered).

    Lazy-imports the rule registry to keep this module's import cost low.
    """
    from pheno_vibecoding_guard.rules import RULES

    selected: list[tuple[str, Callable[[str], list[Finding]]]] = []
    if rules is None:
        selected = list(RULES.items())
    else:
        for r in rules:
            if r not in RULES:
                raise KeyError(f"unknown rule: {r}")
            selected.append((r, RULES[r]))

    findings: list[Finding] = []
    for _rule_id, rule_fn in selected:
        findings.extend(rule_fn(text))
    log.info("vibecoding_guard.scan", rules=len(selected), findings=len(findings))
    return findings


def scan_file(
    path: str | Path,
    rules: list[str] | None = None,
) -> list[Finding]:
    """Read ``path`` and scan it."""
    text = Path(path).read_text(encoding="utf-8")
    return scan_text(text, rules)
