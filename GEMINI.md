# Security and Cleanliness Rules for AI Assistants

> **Scope:** rules for Gemini-based agents. For Claude Code, see `CLAUDE.md`. For other AI assistants, see `AGENTS.md`.

## 1. File Placement & Organization

- **Test Files**: ALL unit tests, integration tests, ecosystem tests, or Vitest files MUST strictly be placed within the `tests/` directory (e.g., `tests/unit/`, `tests/integration/`). NEVER create test files in the project root (`/`).
- **Scripts and Utilities**: ALL maintenance, debugging, generation, or experimental scripts (`.cjs`, `.mjs`, `.js`, `.ts`) MUST be placed strictly inside one of the `scripts/` subfolders (`build/`, `dev/`, `check/`, `docs/`, `i18n/`, `ad-hoc/`). One-shot or experimental code goes under `scripts/ad-hoc/`. NEVER dump loose scripts in the project root (`/`) or the top-level `scripts/` folder.

**The Project Root MUST ONLY CONTAIN:**

- Configuration files (`vitest.config.ts`, `next.config.mjs`, `eslint.config.mjs`, `tsconfig*.json`, `playwright.config.ts`, `prettier.config.mjs`, `postcss.config.mjs`, `sonar-project.properties`, `fly.toml`, `docker-compose*.yml`, `Dockerfile`)
- Dependency files (`package.json`, `package-lock.json`)
- Documentation files (`README.md`, `CHANGELOG.md`, `LICENSE`, `AGENTS.md`, `CLAUDE.md`, `GEMINI.md`, `CONTRIBUTING.md`, `SECURITY.md`, `CODE_OF_CONDUCT.md`, `llm.txt`, `Tuto_Qdrant.md`)
- CI/CD files and ignore definitions (`.gitignore`, `.dockerignore`, `.npmignore`, `.npmrc`, `.node-version`, `.nvmrc`, `.env.example`)

When creating _any_ validation tests or one-off logic scripts, default to using `scripts/ad-hoc/` or the `tests/unit/` directories according to your goals. Do not pollute the `/` root context.

## 2. Hard Rules (mirror of `CLAUDE.md`)

1. **Never commit secrets or credentials.** Use `.env` (auto-generated from `.env.example`) or a vault. Passwords, OAuth secrets, API keys, and Cookie values must never appear in committed files.
2. **Never add logic to `src/lib/localDb.ts`.** It is a re-export barrel only.
3. **Never use `eval()`, `new Function()`, or any implied eval.** ESLint enforces this.
4. **Never commit directly to `main`.** Use `feat/`, `fix/`, `refactor/`, `docs/`, `test/`, or `chore/` branches.
5. **Never write raw SQL in routes** — always go through `src/lib/db/` domain modules.
6. **Never silently swallow errors in SSE streams** — propagate them or abort the stream cleanly.
7. **Never bypass Husky hooks** (`--no-verify`, `--no-gpg-sign`) without explicit operator approval.
8. **Always validate inputs with Zod schemas** from `src/shared/validation/schemas.ts`.
9. **Always include tests when changing production code** (`src/`, `open-sse/`, `electron/`, `bin/`).
10. **Coverage must stay** ≥ 75 % statements / 75 % lines / 75 % functions / 70 % branches (real measured: ~82 %).

## 3. Codebase navigation

| Task                    | Read this first                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Understand the codebase | `docs/architecture/REPOSITORY_MAP.md`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| Architecture overview   | `docs/architecture/ARCHITECTURE.md`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| Engineering reference   | `docs/architecture/CODEBASE_DOCUMENTATION.md`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| Add a feature           | `CONTRIBUTING.md` + the matching `docs/<area>.md`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| Per-area deep dives     | `docs/frameworks/SKILLS.md`, `docs/frameworks/MEMORY.md`, `docs/frameworks/EVALS.md`, `docs/security/GUARDRAILS.md`, `docs/security/COMPLIANCE.md`, `docs/frameworks/CLOUD_AGENT.md`, `docs/frameworks/MCP-SERVER.md`, `docs/frameworks/A2A-SERVER.md`, `docs/architecture/AUTHZ_GUIDE.md`, `docs/architecture/RESILIENCE_GUIDE.md`, `docs/routing/AUTO-COMBO.md`, `docs/frameworks/WEBHOOKS.md`, `docs/routing/REASONING_REPLAY.md`, `docs/security/STEALTH_GUIDE.md`, `docs/ops/TUNNELS_GUIDE.md`, `docs/guides/ELECTRON_GUIDE.md`, `docs/reference/PROVIDER_REFERENCE.md` |
| Release flow            | `docs/ops/RELEASE_CHECKLIST.md`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |

## 4. Local development access

The dashboard is reachable at the operator's chosen URL/port (default `http://localhost:20128`). Credentials are operator-specific:

- **Initial admin password** is read from the `INITIAL_PASSWORD` env var on first install (defaults to `CHANGEME` in `.env.example`; rotate immediately after first login).
- **Local VPS / shared dev environments**: ask the operator for the URL and current credentials — they live in their personal vault, NOT in this repo.

> Any credential observed in a previous version of this file was a non-production demo value; treat it as compromised and do not reuse it.
