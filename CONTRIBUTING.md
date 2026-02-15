# Contributing to OmniRoute

Thank you for your interest in contributing! This guide covers everything you need to get started.

---

## Development Setup

### Prerequisites

- **Node.js** 20+ (recommended: 22 LTS)
- **npm** 10+
- **Git**

### Clone & Install

```bash
git clone https://github.com/diegosouzapw/OmniRoute.git
cd OmniRoute
npm install
```

### Environment Variables

```bash
# Create your .env from the template
cp .env.example .env

# Generate required secrets
echo "JWT_SECRET=$(openssl rand -base64 48)" >> .env
echo "API_KEY_SECRET=$(openssl rand -hex 32)" >> .env
```

Key variables for development:

| Variable               | Development Default     | Description               |
| ---------------------- | ----------------------- | ------------------------- |
| `PORT`                 | `3000`                  | Server port               |
| `NEXT_PUBLIC_BASE_URL` | `http://localhost:3000` | Base URL for frontend     |
| `JWT_SECRET`           | (generate above)        | JWT signing secret        |
| `INITIAL_PASSWORD`     | `123456`                | First login password      |
| `ENABLE_REQUEST_LOGS`  | `false`                 | Enable debug request logs |

### Running Locally

```bash
# Development mode (hot reload)
npm run dev

# Production build
npm run build
npm run start

# Common port configuration
PORT=20128 NEXT_PUBLIC_BASE_URL=http://localhost:20128 npm run dev
```

Default URLs:

- **Dashboard**: `http://localhost:3000/dashboard`
- **API**: `http://localhost:3000/v1`

---

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
refactor(db): consolidate rate limit tables
```

Scopes: `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`.

---

## Running Tests

```bash
# All unit tests
npm test
npm run test:unit

# Specific test suites
npm run test:security     # Security tests
npm run test:fixes        # Fix verification tests

# With coverage
npm run test:coverage

# E2E tests (requires Playwright)
npm run test:e2e

# Lint + format check
npm run lint
npm run check
```

Current test status: **320+ unit tests** covering:

- Provider translators and format conversion
- Rate limiting, circuit breaker, and resilience
- Semantic cache, idempotency, progress tracking
- Database operations and schema
- OAuth flows and authentication
- API endpoint validation

---

## Code Style

- **ESLint** — Run `npm run lint` before committing
- **Prettier** — Auto-formatted via `lint-staged` on commit
- **JSDoc** — Document public functions with `@param`, `@returns`, `@throws`
- **No `eval()`** — ESLint enforces `no-eval`, `no-implied-eval`, `no-new-func`
- **Zod validation** — Use Zod schemas for API input validation

---

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (dashboard)/        # Dashboard pages
│   ├── api/                # API routes
│   └── login/              # Auth pages
├── domain/                 # Domain types and response helpers
├── lib/                    # Core business logic
│   ├── db/                 # SQLite database layer
│   ├── oauth/              # OAuth services per provider
│   ├── cacheLayer.js       # LRU cache
│   ├── semanticCache.js    # Semantic response cache
│   ├── idempotencyLayer.js # Request deduplication
│   └── localDb.js          # LowDB (JSON) storage
├── shared/
│   ├── components/         # React components
│   ├── middleware/          # Correlation IDs, etc.
│   ├── utils/              # Circuit breaker, sanitizer, etc.
│   └── validation/         # Zod schemas
└── sse/                    # SSE chat handlers

open-sse/                   # @omniroute/open-sse workspace
├── handlers/               # chatCore.js — main request handler
├── services/               # Rate limit, fallback
├── translators/            # Format converters (OpenAI ↔ Claude ↔ Gemini)
└── utils/                  # Progress tracker, stream helpers

tests/
├── unit/                   # Node.js test runner
└── e2e/                    # Playwright tests

docs/                       # Documentation
├── USER_GUIDE.md           # Provider setup, CLI integration
├── API_REFERENCE.md        # All endpoints
├── TROUBLESHOOTING.md      # Common issues
├── ARCHITECTURE.md         # System architecture
└── adr/                    # Architecture Decision Records
```

---

## Adding a New Provider

### Step 1: OAuth Service (if using OAuth)

Create `src/lib/oauth/services/your-provider.js` extending `OAuthService`:

```javascript
import { OAuthService } from "../OAuthService.js";

export class YourProviderService extends OAuthService {
  constructor() {
    super({
      name: "your-provider",
      authUrl: "https://provider.com/oauth/authorize",
      tokenUrl: "https://provider.com/oauth/token",
      clientId: "...",
      scopes: ["..."],
    });
  }
}
```

### Step 2: Register Provider

Add to `src/lib/oauth/providers.js`:

```javascript
import { YourProviderService } from "./services/your-provider.js";
// Add to the providers map
```

### Step 3: Add Constants

Add provider constants in `src/lib/providerConstants.js`:

- Provider prefix (e.g., `yp/`)
- Default models
- Pricing info

### Step 4: Add Translator (if non-OpenAI format)

Create translator in `open-sse/translators/` if the provider uses a custom API format.

### Step 5: Add Timeout

Add request timeout configuration in `src/shared/utils/requestTimeout.js`.

### Step 6: Add Tests

Write unit tests in `tests/unit/` covering at minimum:

- Provider registration
- Request/response translation
- Error handling

---

## Pull Request Checklist

- [ ] Tests pass (`npm test`)
- [ ] Linting passes (`npm run lint`)
- [ ] Build succeeds (`npm run build`)
- [ ] JSDoc added for new public functions
- [ ] No hardcoded secrets or fallback values
- [ ] CHANGELOG updated (if user-facing change)
- [ ] Documentation updated (if applicable)

---

## Releasing

When a new GitHub Release is created (e.g. `v0.3.0`), the package is **automatically published to npm** via GitHub Actions:

```bash
gh release create v0.3.0 --title "v0.3.0" --generate-notes
```

---

## Getting Help

- **Architecture**: See [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md)
- **Issues**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
- **ADRs**: See `docs/adr/` for architectural decision records
