# justfile for OmniRoute — https://just.systems
# Run `just` (or `just default`) to list recipes.

set dotenv-load
set shell := ["bash", "-uc"]

# Default — list available recipes
default:
    @just --list

# Install dependencies
install:
    npm install

# Start the Next.js dev server
dev:
    npm run dev

# Produce release artifacts (Next.js isolated build)
build:
    npm run build

# Run the unit test suite
test:
    npm run test

# Coverage report (SSOT for how to measure coverage)
coverage:
    npm test -- --coverage

# Lint the project (ESLint)
lint:
    npm run lint

# Apply formatter (Prettier)
fmt:
    npx --yes prettier --write .

# Type-check (TypeScript)
typecheck:
    npx tsc --noEmit

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

# CI: install + build + test + lint + audit
ci: install build test lint audit deny

# Remove build artifacts and caches
clean:
    rm -rf .next .turbo out dist build node_modules/.cache
    rm -rf open-sse/dist open-sse/build
    rm -rf coverage
