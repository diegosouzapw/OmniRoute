# justfile for OmniRoute — https://just.systems
# Run `just` (or `just default`) to list recipes.

set dotenv-load
set shell := ["bash", "-uc"]

default:
    @just --list

# Start the Next.js dev server
dev:
    npm run dev

# Produce release artifacts (Next.js isolated build)
build:
    npm run build

# Run the unit test suite
test:
    npm run test

# Lint the project (ESLint)
lint:
    npm run lint

# Apply formatter (Prettier via eslint --fix when no standalone script)
fmt:
    npx --yes prettier --write .

# Remove build artifacts and caches
clean:
    rm -rf .next .turbo out dist build node_modules/.cache
    rm -rf open-sse/dist open-sse/build
    rm -rf coverage
