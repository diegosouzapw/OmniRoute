"""Rule registry for pheno-vibecoding-guard.

Each rule is a callable that takes the source text and returns a list
of `Finding` objects. Rules should be **pure** — no I/O, no network.
"""

from __future__ import annotations

import re
from typing import Callable

from pheno_vibecoding_guard.scanner import Finding

# Hallucinated imports that the model commonly invents.
HALLUCINATED_IMPORTS = {
    "os.path.join": "use `from os.path import join` or `os.path.join(...)` from `os.path`",
    "string.startswith": "use `str.startswith` (it's a method, not a module)",
    "string.endswith": "use `str.endswith` (it's a method, not a module)",
}

# Comment patterns that look like prompt-injection attempts.
PROMPT_INJECTION_PATTERNS = [
    re.compile(r"ignore (all )?previous instructions", re.IGNORECASE),
    re.compile(r"disregard (the )?system prompt", re.IGNORECASE),
    re.compile(r"new instructions:", re.IGNORECASE),
]


def _no_hallucinated_imports(text: str) -> list[Finding]:
    findings: list[Finding] = []
    for lineno, line in enumerate(text.splitlines(), start=1):
        for hallucinated, fix in HALLUCINATED_IMPORTS.items():
            if hallucinated in line and "import" in line:
                findings.append(
                    Finding(
                        rule="no-hallucinated-imports",
                        line=lineno,
                        message=f"hallucinated import `{hallucinated}` — {fix}",
                        severity="error",
                    )
                )
    return findings


def _require_type_annotations(text: str) -> list[Finding]:
    """Flag public function definitions missing return type annotations."""
    findings: list[Finding] = []
    func_re = re.compile(r"^def\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*\(([^)]*)\)\s*:")
    for lineno, line in enumerate(text.splitlines(), start=1):
        m = func_re.match(line)
        if not m:
            continue
        name = m.group(1)
        if name.startswith("_"):
            continue
        if "->" not in line:
            findings.append(
                Finding(
                    rule="require-type-annotations",
                    line=lineno,
                    message=f"public function `{name}` is missing a return type annotation",
                    severity="warning",
                )
            )
    return findings


def _no_prompt_injection_shapes(text: str) -> list[Finding]:
    findings: list[Finding] = []
    for lineno, line in enumerate(text.splitlines(), start=1):
        for pat in PROMPT_INJECTION_PATTERNS:
            if pat.search(line):
                findings.append(
                    Finding(
                        rule="no-prompt-injection-shapes",
                        line=lineno,
                        message=f"comment matches prompt-injection pattern: {pat.pattern!r}",
                        severity="error",
                    )
                )
    return findings


def _no_unbounded_retries(text: str) -> list[Finding]:
    findings: list[Finding] = []
    for lineno, line in enumerate(text.splitlines(), start=1):
        stripped = line.strip()
        if stripped == "while True:":
            findings.append(
                Finding(
                    rule="no-unbounded-retries",
                    line=lineno,
                    message="`while True:` with no apparent exit condition",
                    severity="warning",
                )
            )
    return findings


RULES: dict[str, Callable[[str], list[Finding]]] = {
    "no-hallucinated-imports": _no_hallucinated_imports,
    "require-type-annotations": _require_type_annotations,
    "no-prompt-injection-shapes": _no_prompt_injection_shapes,
    "no-unbounded-retries": _no_unbounded_retries,
}
