# Contributing to OmniRoute (Filipino)

🌐 **Languages:** 🇺🇸 [English](../../../CONTRIBUTING.md) · 🇪🇸 [es](../es/CONTRIBUTING.md) · 🇫🇷 [fr](../fr/CONTRIBUTING.md) · 🇩🇪 [de](../de/CONTRIBUTING.md) · 🇮🇹 [it](../it/CONTRIBUTING.md) · 🇷🇺 [ru](../ru/CONTRIBUTING.md) · 🇨🇳 [zh-CN](../zh-CN/CONTRIBUTING.md) · 🇯🇵 [ja](../ja/CONTRIBUTING.md) · 🇰🇷 [ko](../ko/CONTRIBUTING.md) · 🇸🇦 [ar](../ar/CONTRIBUTING.md) · 🇮🇳 [in](../in/CONTRIBUTING.md) · 🇹🇭 [th](../th/CONTRIBUTING.md) · 🇻🇳 [vi](../vi/CONTRIBUTING.md) · 🇮🇩 [id](../id/CONTRIBUTING.md) · 🇲🇾 [ms](../ms/CONTRIBUTING.md) · 🇳🇱 [nl](../nl/CONTRIBUTING.md) · 🇵🇱 [pl](../pl/CONTRIBUTING.md) · 🇸🇪 [sv](../sv/CONTRIBUTING.md) · 🇳🇴 [no](../no/CONTRIBUTING.md) · 🇩🇰 [da](../da/CONTRIBUTING.md) · 🇫🇮 [fi](../fi/CONTRIBUTING.md) · 🇵🇹 [pt](../pt/CONTRIBUTING.md) · 🇷🇴 [ro](../ro/CONTRIBUTING.md) · 🇭🇺 [hu](../hu/CONTRIBUTING.md) · 🇧🇬 [bg](../bg/CONTRIBUTING.md) · 🇸🇰 [sk](../sk/CONTRIBUTING.md) · 🇺🇦 [uk-UA](../uk-UA/CONTRIBUTING.md) · 🇮🇱 [he](../he/CONTRIBUTING.md) · 🇵🇭 [phi](../phi/CONTRIBUTING.md) · 🇧🇷 [pt-BR](../pt-BR/CONTRIBUTING.md) · 🇨🇿 [cs](../cs/CONTRIBUTING.md)

---

Thank you for your interest in contributing! This guide covers everything you need to get started.

---

## Development Setup

### Prerequisites

- **Node.js** >= 18 < 24 (recommended: 22 LTS)
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

| Variable               | Development Default      | Description           |
| ---------------------- | ------------------------ | --------------------- |
| `PORT`                 | `20128`                  | Server port           |
| `NEXT_PUBLIC_BASE_URL` | `http://localhost:20128` | Base URL for frontend |
| `JWT_SECRET`           | (generate above)         | JWT signing secret    |
| `INITIAL_PASSWORD`     | `CHANGEME`               | First login password  |
| `APP_LOG_LEVEL`        | `info`                   | Log verbosity level   |

### Dashboard Settings

The dashboard provides UI toggles for features that can also be configured via environment variables:

| Setting Location    | Toggle             | Description                    |
| ------------------- | ------------------ | ------------------------------ |
| Settings → Advanced | Debug Mode         | Enable debug request logs (UI) |
| Settings → General  | Sidebar Visibility | Show/hide sidebar sections     |

These settings are stored in the database and persist across restarts, overriding env var defaults when set.

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

- **Dashboard**: `http://localhost:20128/dashboard`
- **API**: `http://localhost:20128/v1`

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

Scopes: `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`.

---

## Running Tests

```bash
# All tests (unit + vitest + ecosystem + e2e)
npm run test:all

# Single test file (Node.js native test runner — most tests use this)
node --import tsx/esm --test tests/unit/your-file.test.mjs

# Vitest (MCP server, autoCombo, cache)
npm run test:vitest

# E2E tests (requires Playwright)
npm run test:e2e

# Protocol clients E2E (MCP transports, A2A)
npm run test:protocols:e2e

# Ecosystem compatibility tests
npm run test:ecosystem

# Coverage (55% min statements/lines/functions; 60% branches)
npm run test:coverage
npm run coverage:report

# Lint + format check
npm run lint
npm run check
```

Coverage notes:

- `npm run test:coverage` measures source coverage for the main unit test suite, excludes `tests/**`, and includes `open-sse/**`
- `npm run coverage:report` prints the detailed file-by-file report from the latest coverage run
- `npm run test:coverage:legacy` preserves the older metric for historical comparison
- See `docs/COVERAGE_PLAN.md` for the phased coverage improvement roadmap

Current test status: **122 unit test files** covering:

- Provider translators and format conversion
- Rate limiting, circuit breaker, and resilience
- Semantic cache, idempotency, progress tracking
- Database operations and schema (21 DB modules)
- OAuth flows and authentication
- API endpoint validation (Zod v4)
- MCP server tools and scope enforcement
- Memory and Skills systems

---

## Code Style

- **ESLint** — Run `npm run lint` before committing
- **Prettier** — Auto-formatted via `lint-staged` on commit (2 spaces, semicolons, double quotes, 100 char width, es5 trailing commas)
- **TypeScript** — All `src/` code uses `.ts`/`.tsx`; `open-sse/` uses `.ts`/`.js`; document with TSDoc (`@param`, `@returns`, `@throws`)
- **No `eval()`** — ESLint enforces `no-eval`, `no-implied-eval`, `no-new-func`
- **Zod validation** — Use Zod v4 schemas for all API input validation
- **Naming**: Files = camelCase/kebab-case, components = PascalCase, constants = UPPER_SNAKE

---

## Project Structure

```
src/                        # TypeScript (.ts / .tsx)
├── app/                    # Next.js 16 App Router
│   ├── (dashboard)/        # Dashboard pages (23 sections)
│   ├── api/                # API routes (51 directories)
│   └── login/              # Auth pages (.tsx)
├── domain/                 # Policy engine (policyEngine, comboResolver, costRules, etc.)
├── lib/                    # Core business logic (.ts)
│   ├── a2a/                # Agent-to-Agent v0.3 protocol server
│   ├── acp/                # Agent Communication Protocol registry
│   ├── compliance/         # Compliance policy engine
│   ├── db/                 # SQLite database layer (21 modules + 16 migrations)
│   ├── memory/             # Persistent conversational memory
│   ├── oauth/              # OAuth providers, services, and utilities
│   ├── skills/             # Extensible skill framework
│   ├── usage/              # Usage tracking and cost calculation
│   └── localDb.ts          # Re-export layer only — never add logic here
├── middleware/              # Request middleware (promptInjectionGuard)
├── mitm/                   # MITM proxy (cert, DNS, target routing)
├── shared/
│   ├── components/         # React components (.tsx)
│   ├── constants/          # Provider definitions (60+), MCP scopes, routing strategies
│   ├── utils/              # Circuit breaker, sanitizer, auth helpers
│   └── validation/         # Zod v4 schemas
└── sse/                    # SSE proxy pipeline

open-sse/                   # @omniroute/open-sse workspace
├── executors/              # 14 provider-specific request executors
├── handlers/               # 11 request handlers (chat, responses, embeddings, images, etc.)
├── mcp-server/             # MCP server (25 tools, 3 transports, 10 scopes)
├── services/               # 36+ services (combo, autoCombo, rateLimitManager, etc.)
├── translator/             # Format translators (OpenAI ↔ Claude ↔ Gemini ↔ Responses ↔ Ollama)
├── transformer/            # Responses API transformer
└── utils/                  # 22 utility modules (stream, TLS, proxy, logging)

electron/                   # Electron desktop app (cross-platform)

tests/
├── unit/                   # Node.js test runner (122 test files)
├── integration/            # Integration tests
├── e2e/                    # Playwright tests
├── security/               # Security tests
├── translator/             # Translator-specific tests
└── load/                   # Load tests

docs/                       # Documentation
├── ARCHITECTURE.md         # System architecture
├── API_REFERENCE.md        # All endpoints
├── USER_GUIDE.md           # Provider setup, CLI integration
├── TROUBLESHOOTING.md      # Common issues
├── MCP-SERVER.md           # MCP server (25 tools)
├── A2A-SERVER.md           # A2A agent protocol
├── AUTO-COMBO.md           # Auto-combo engine
├── CLI-TOOLS.md            # CLI tools integration
├── COVERAGE_PLAN.md        # Test coverage improvement plan
├── openapi.yaml            # OpenAPI specification
└── adr/                    # Architecture Decision Records
```

---

## Adding a New Provider

### Step 1: Register Provider Constants

Add to `src/shared/constants/providers.ts` — Zod-validated at module load.

### Step 2: Add Executor (if custom logic needed)

Create executor in `open-sse/executors/your-provider.ts` extending the base executor.

### Step 3: Add Translator (if non-OpenAI format)

Create request/response translators in `open-sse/translator/`.

### Step 4: Add OAuth Config (if OAuth-based)

Add OAuth credentials in `src/lib/oauth/constants/oauth.ts` and service in `src/lib/oauth/services/`.

### Step 5: Register Models

Add model definitions in `open-sse/config/providerRegistry.ts`.

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
- [ ] TypeScript types added for new public functions and interfaces
- [ ] No hardcoded secrets or fallback values
- [ ] All inputs validated with Zod schemas
- [ ] CHANGELOG updated (if user-facing change)
- [ ] Documentation updated (if applicable)

---

## Releasing

Releases are managed via the `/generate-release` workflow. When a new GitHub Release is created, the package is **automatically published to npm** via GitHub Actions.

---

## Getting Help

- **Architecture**: See [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md)
- **API Reference**: See [`docs/API_REFERENCE.md`](docs/API_REFERENCE.md)
- **Issues**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
- **ADRs**: See `docs/adr/` for architectural decision records
