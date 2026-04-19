# Security and Cleanliness Rules for AI Assistants

## 1. File Placement & Organization

- **Test Files**: ALL unit tests, integration tests, ecosystem tests, or Vitest files MUST strictly be placed within the `tests/` directory (e.g., `tests/unit/`, `tests/integration/`). NEVER create test files in the project root (`/`).
- **Scripts and Utilities**: ALL maintenance, debugging, generation, or experimental scripts (`.cjs`, `.mjs`, `.js`, `.ts`) MUST be placed strictly inside the `scripts/` directory or `scripts/scratch/` for temporary one-offs. NEVER dump loose scripts in the project root (`/`).

**The Project Root MUST ONLY CONTAIN:**

- Configuration files (`vitest.config.ts`, `next.config.mjs`, `eslint.config.mjs`, etc.)
- Dependency files (`package.json`, `package-lock.json`)
- Documentation files (`README.md`, `CHANGELOG.md`, `AGENTS.md`)
- CI/CD files and ignore definitions (`.gitignore`, `.dockerignore`)

When creating _any_ validation tests or one-off logic scripts, default to using `scripts/scratch/` or the `tests/unit/` directories according to your goals. Do not pollute the `/` root context.

## 2. VPS Dashboard Credentials

| Environment | URL                       | Password |
| ----------- | ------------------------- | -------- |
| Local VPS   | http://192.168.0.15:20128 | 123456   |
