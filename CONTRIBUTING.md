# Contributing to OmniRoute

Thank you for your interest in contributing! This guide will help you get started.

## Development Setup

```bash
# Clone and install
git clone https://github.com/diegosouzapw/OmniRoute.git
cd OmniRoute
npm install

# Create your .env from the template
cp .env.example .env

# Generate required secrets
echo "JWT_SECRET=$(openssl rand -base64 48)" >> .env
echo "API_KEY_SECRET=$(openssl rand -hex 32)" >> .env

# Start development server
npm run dev
```

## Git Workflow

> ⚠️ **NEVER commit directly to `main`.** Always use feature branches.

```bash
git checkout -b feat/your-feature-name
# ... make changes ...
git commit -m "feat: describe your change"
git push -u origin feat/your-feature-name
# Open a Pull Request on GitHub
```

### Branch Naming

| Prefix      | Purpose                   |
| ----------- | ------------------------- |
| `feat/`     | New features              |
| `fix/`      | Bug fixes                 |
| `refactor/` | Code restructuring        |
| `docs/`     | Documentation changes     |
| `test/`     | Test additions/fixes      |
| `chore/`    | Tooling, CI, dependencies |

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add circuit breaker for provider calls
fix: resolve JWT secret validation edge case
docs: update SECURITY.md with PII protection
test: add observability unit tests
```

## Running Tests

```bash
# All unit tests
npm test

# Specific test suites
npm run test:security     # FASE-01 security tests
npm run test:fixes        # Fix verification tests

# With coverage
npm run test:coverage

# E2E tests (requires Playwright)
npm run test:e2e

# Lint + test
npm run check
```

## Code Style

- **ESLint** — Run `npm run lint` before committing
- **Prettier** — Auto-formatted via `lint-staged` on commit
- **JSDoc** — Document public functions with `@param`, `@returns`, `@throws`
- **No `eval()`** — ESLint enforces `no-eval`, `no-implied-eval`, `no-new-func`

## Architecture Overview

```
src/
├── app/              # Next.js pages and API routes
├── domain/           # Domain types and response helpers
├── lib/              # Database, OAuth, and core logic
├── shared/
│   ├── middleware/    # Correlation IDs, etc.
│   ├── utils/        # Sanitizer, circuit breaker, etc.
│   └── validation/   # Zod schemas
└── sse/              # SSE chat handlers and services
```

## Adding a New Provider

1. Create `src/lib/oauth/services/your-provider.js` extending `OAuthService`
2. Register in `src/lib/oauth/providers.js`
3. Add timeout in `src/shared/utils/requestTimeout.js`
4. Add tests in `tests/unit/`

## Pull Request Checklist

- [ ] Tests pass (`npm test`)
- [ ] Linting passes (`npm run lint`)
- [ ] JSDoc added for new public functions
- [ ] No hardcoded secrets or fallback values
- [ ] CHANGELOG updated (if user-facing change)
