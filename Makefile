.PHONY: help install dev start build build-release lint typecheck typecheck-strict \
        test test-unit test-vitest test-coverage test-all test-integration test-e2e \
        check check-cycles check-docs env-sync clean

# OmniRoute — convenience wrapper around the npm scripts.
# All targets delegate to the canonical package.json scripts (single source of truth).

help: ## Show this help
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-18s\033[0m %s\n", $$1, $$2}'

install: ## Install dependencies (auto-generates .env from .env.example)
	npm install

dev: ## Dev server at http://localhost:20128
	npm run dev

start: ## Production server (requires a prior build)
	npm run start

build: ## Production build (Next.js 16 standalone)
	npm run build

build-release: ## Release build
	npm run build:release

lint: ## ESLint (0 errors expected)
	npm run lint

typecheck: ## TypeScript check (core)
	npm run typecheck:core

typecheck-strict: ## Strict check (no implicit any)
	npm run typecheck:noimplicit:core

test: ## Unit tests (Node native runner)
	npm run test:unit

test-unit: ## Alias for `test`
	npm run test:unit

test-vitest: ## Vitest (MCP server, autoCombo, cache)
	npm run test:vitest

test-coverage: ## Unit tests + coverage gate (60/60/60/60)
	npm run test:coverage

test-all: ## All suites (unit + vitest + ecosystem + e2e)
	npm run test:all

test-integration: ## Integration tests
	npm run test:integration

test-e2e: ## E2E (Playwright)
	npm run test:e2e

check: ## lint + test combined
	npm run check

check-cycles: ## Detect circular dependencies
	npm run check:cycles

check-docs: ## Validate documentation (incl. fabricated-docs)
	npm run check:docs-all

env-sync: ## Sync .env from .env.example
	npm run env:sync

clean: ## Remove build artifacts
	rm -rf .build dist coverage .eslintcache
