# OmniRoute Justfile
# Standard Phenotype-org task runner.
set shell := ["bash", "-cu"]

default:
    @just --list

install:
    npm install

build:
    npm run build

test:
    npm test

lint:
    npx eslint . --ext .ts
    npx prettier --check "**/*.ts"

fmt:
    npx prettier --write "**/*.ts"

# Security advisories (npm audit)
audit:
    npm audit --omit=dev || true

# License + advisory + ban + source checks (no-op for Node — npm audit covers this)
deny:
    @echo "deny: no-op (Rust-only concept); use 'just audit' for Node dep security"

# Fleet-wide grading gate (uses vendored or central grade.sh)
grade:
    @if [ -f grade.sh ]; then ./grade.sh; \
    elif [ -f ../grade.sh ]; then bash ../grade.sh; \
    else echo "no grade.sh found (vendored or central)"; exit 1; \
    fi

grade-fast:
    @if [ -f grade.sh ]; then ./grade.sh --fast; \
    elif [ -f ../grade.sh ]; then bash ../grade.sh --fast; \
    else echo "no grade.sh found"; exit 1; \
    fi

ci: install build test lint audit deny

clean:
    rm -rf node_modules dist
