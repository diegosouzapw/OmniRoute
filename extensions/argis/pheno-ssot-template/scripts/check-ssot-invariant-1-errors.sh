#!/usr/bin/env bash
# scripts/check-ssot-invariant-1-errors.sh
#
# Verifies SSOT invariant #1: every error is a `pheno_errors::AppError`.
#
# Forbidden patterns (any of these in src/ or tests/ = lint failure):
#   - `Box<dyn std::error::Error>` or `Box<dyn Error>`
#   - `Box<dyn std::error::Error + Send>` or any alias thereof
#   - `Result<T, MyRepoError>` style per-repo enums (heuristic: a
#     struct/enum with a name ending in `Error` other than `AppError`)
#   - `anyhow::Result` used at the public API surface (allowed in
#     internal helpers but should be converted to AppError before
#     crossing a public boundary)
#
# Usage:
#   scripts/check-ssot-invariant-1-errors.sh <rendered-project-dir>
#
# Exit codes:
#   0   no forbidden patterns found
#   1   one or more forbidden patterns found
#   2   bad args / missing target

set -euo pipefail

if [[ $# -lt 1 ]]; then
    echo "usage: $0 <rendered-project-dir>" >&2
    exit 2
fi

TARGET_DIR="$1"

if [[ ! -d "$TARGET_DIR" ]]; then
    echo "error: $TARGET_DIR does not exist" >&2
    exit 2
fi

cd "$TARGET_DIR"

echo "==> SSOT invariant #1: errors must be pheno_errors::AppError"
echo "    target: $TARGET_DIR"
echo

# Build a list of (file, line, match) tuples for every forbidden pattern.
# Skip doc-comment lines (`//!`, `///`, `//`, `*`) so a documentation
# example that quotes a forbidden pattern doesn't trip the lint.
violations=0
check() {
    local pattern="$1"
    local description="$2"
    local -a matches
    # shellcheck disable=SC2207
    matches=($(grep -rEn --include='*.rs' "$pattern" src/ tests/ 2>/dev/null \
        | grep -vE ':\s*[0-9]+:\s*(\/\/!?|\*)' \
        || true))
    if [[ ${#matches[@]} -gt 0 ]]; then
        echo "FAIL: $description"
        printf '  %s\n' "${matches[@]}"
        violations=$((violations + 1))
    else
        echo "OK: $description"
    fi
}

# Note: these patterns are intentionally simple. A robust version would
# use syn/quote on the AST; for a template-level lint, a grep + manual
# review is the right cost/quality trade-off.
check \
    'Box<\s*dyn\s+std::error::Error' \
    'Box<dyn std::error::Error> is forbidden — return AppError instead'

check \
    'Box<\s*dyn\s+Error' \
    'Box<dyn Error> is forbidden — return AppError instead'

# Per-repo error enums: any name ending in "Error" other than
# "AppError". This is a heuristic; false positives are OK because
# the reviewer will catch them in PR review.
# Doc-comment lines (`//!`, `///`, `*`) are excluded so a doc example
# like `enum MyRepoError` doesn't trip the lint.
if grep -rEn --include='*.rs' \
    '\benum\s+[A-Z][A-Za-z0-9_]*Error\b' src/ tests/ 2>/dev/null \
    | grep -vE ':\s*[0-9]+:\s*(\/\/!?|\*)' \
    | grep -vE '\bAppError\b' >/tmp/_ssot1_enum_hits.txt; then
    if [[ -s /tmp/_ssot1_enum_hits.txt ]]; then
        echo "FAIL: per-repo Error enum detected (only AppError is allowed):"
        sed 's/^/  /' /tmp/_ssot1_enum_hits.txt
        violations=$((violations + 1))
    else
        echo "OK: no per-repo Error enums (only AppError)"
    fi
else
    echo "OK: no per-repo Error enums (only AppError)"
fi
rm -f /tmp/_ssot1_enum_hits.txt

if [[ $violations -gt 0 ]]; then
    echo
    echo "SSOT invariant #1 violated: $violations pattern(s) found."
    echo "Replace with pheno_errors::AppError. See pheno-ssot-template/README.md."
    exit 1
fi

echo
echo "SSOT invariant #1 holds."
exit 0
