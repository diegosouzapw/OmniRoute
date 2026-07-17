#!/usr/bin/env bash
# pheno-port-adapter coverage script.
# Per ADR-040 (test-coverage-gates-per-tier), `pheno-*-lib` tier requires >=80% line coverage.
set -euo pipefail

cd "$(dirname "$0")/.."

if ! command -v cargo-llvm-cov >/dev/null 2>&1; then
    echo "cargo-llvm-cov not installed. Install via: cargo install cargo-llvm-cov"
    exit 1
fi

echo "[pheno-port-adapter] running tests + coverage (gate: 80%)..."
cargo llvm-cov --config llvm-cov.toml --summary-only --fail-under-lines 80
echo "[pheno-port-adapter] coverage OK"