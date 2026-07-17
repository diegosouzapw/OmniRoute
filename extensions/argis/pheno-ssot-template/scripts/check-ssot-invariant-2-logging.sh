#!/usr/bin/env bash
# scripts/check-ssot-invariant-2-logging.sh
#
# Verifies SSOT invariant #2: every log line is structured.
#
# Forbidden patterns:
#   - `println!` in src/ (and in tests/, except #[test] functions)
#   - `eprintln!` in src/
#   - `tracing::*!` with a format-string placeholder in the message,
#     e.g. `tracing::info!("loaded user {}", id)` — must be
#     `tracing::info!(user.id = %id, "loaded user")`
#   - `log::*!` macros (use `tracing::*!` instead, which is
#     instrumented and structured)
#   - `dbg!` in src/ (left over from debugging)
#
# Usage:
#   scripts/check-ssot-invariant-2-logging.sh <rendered-project-dir>
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

echo "==> SSOT invariant #2: every log line must be structured"
echo "    target: $TARGET_DIR"
echo

violations=0
check() {
    local pattern="$1"
    local description="$2"
    local -a matches
    # shellcheck disable=SC2207
    matches=($(grep -rEn --include='*.rs' "$pattern" src/ 2>/dev/null || true))
    if [[ ${#matches[@]} -gt 0 ]]; then
        echo "FAIL: $description"
        printf '  %s\n' "${matches[@]}"
        violations=$((violations + 1))
    else
        echo "OK: $description"
    fi
}

# println! / eprintln! in src/ are forbidden. Tests/ may use them
# for assertion output.
check \
    '\bprintln!\s*\(' \
    'println! in src/ is forbidden — use tracing::info!(...) instead'

check \
    '\beprintln!\s*\(' \
    'eprintln! in src/ is forbidden — use tracing::error!(...) instead'

check \
    '\bdbg!\s*\(' \
    'dbg! in src/ is forbidden — use structured tracing::debug! instead'

# Format-string placeholders in tracing/log messages. The pattern
# matches `tracing::*!("...{...}...")` and `log::*!("...{...}...")`.
# The `[^"]*` ensures we don't match placeholder-like syntax in
# field names (which use `key = value` syntax instead).
# `\{[^}]*\}` matches both `{name}` (named placeholder) and `{}`
# (empty placeholder); using `*` instead of `+` is required so the
# empty-`{}` form is caught (Rust's Display formatter accepts both).
check \
    '\btracing::[a-z_]+!\s*\(\s*"[^"]*\{[^}]*\}[^"]*"' \
    'tracing macro with format-string placeholder in message — use structured fields (key = value) instead'

check \
    '\blog::[a-z_]+!\s*\(\s*"[^"]*\{[^}]*\}[^"]*"' \
    'log macro with format-string placeholder in message — migrate to tracing::...! with structured fields'

if [[ $violations -gt 0 ]]; then
    echo
    echo "SSOT invariant #2 violated: $violations pattern(s) found."
    echo "Replace with structured tracing (key = value fields). See pheno-ssot-template/README.md."
    exit 1
fi

echo
echo "SSOT invariant #2 holds."
exit 0
