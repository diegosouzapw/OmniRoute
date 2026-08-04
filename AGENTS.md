# OmniRoute agent guide

## Project

OmniRoute is a unified AI proxy/router. The repository contains the Next.js application
(`src/`), streaming engine workspace (`open-sse/`), Electron desktop app (`electron/`),
CLI (`bin/`), and tests (`tests/`).

## Setup and focused checks

- Runtime: Node.js `>=22.22.3 <23` or `>=24.0.0 <27`; npm 10+.
- Install dependencies: `npm install`.
- Start development: `npm run dev`.
- Build: `npm run build`; release build: `npm run build:release`.
- Lint: `npm run lint`.
- Core type check: `npm run typecheck:core`.
- Run the most focused test for changed code first:
  `node --import tsx/esm --test tests/unit/<file>.test.ts`.
- Other suites: `npm run test:vitest`, `npm run test:e2e`,
  `npm run test:protocols:e2e`, and `npm run test:ecosystem`.
- Run `npm run check:docs-all` after changing documentation.

For the complete test matrix, coverage requirements, and pull-request gates, read
[`CONTRIBUTING.md`](CONTRIBUTING.md#running-tests).

## Documentation accuracy

Documentation must describe verified behavior, not plausible behavior.

1. Before documenting an API name, endpoint, path, CLI command, or environment variable,
   search for it: `rg -n "name" src/ open-sse/ bin/`. If it has no source match, do not
   document it.
2. Measure mutable counts instead of writing them from memory: use `wc -l <file>` or a
   directory-specific count command.
3. Copy code examples from working usage or run them. Prefer a source link such as
   `path/to/file.ts:line` to an invented signature.
4. Run `npm run check:docs-all` for edits under `docs/`; it includes the fabricated-docs
   validation.

## Code conventions

- Format with Prettier: two spaces, semicolons, double quotes, 100-character line width,
  and ES5 trailing commas. Run Prettier on changed files.
- TypeScript target is ES2022 with bundler module resolution. Prefer explicit types.
- Import order: external, internal (`@/` and `@omniroute/open-sse`), then relative.
- Do not add logic to `src/lib/localDb.ts`; import from the owning `src/lib/db/` module.
- Use specific errors and contextual logging. Do not silently swallow SSE-stream failures;
  use abort signals for cleanup and return appropriate HTTP status codes.

## Security requirements

- Never commit credentials or log SQLite encryption keys.
- Validate API inputs with Zod and use the route's required authentication path.
- Sanitize user HTML with DOMPurify.
- Use `resolvePublicCred()` for public upstream OAuth identifiers; never add them as string
  literals. See [`docs/security/PUBLIC_CREDS.md`](docs/security/PUBLIC_CREDS.md).
- Use `buildErrorBody()` or `sanitizeErrorMessage()` for HTTP, SSE, executor, and MCP errors;
  do not return raw `err.stack` or `err.message`. See
  [`docs/security/ERROR_SANITIZATION.md`](docs/security/ERROR_SANITIZATION.md).
- Pass runtime values to `exec()` or `spawn()` through `env`, not interpolation into a script.

## Repository map

Read the nearest `AGENTS.md` and the linked deep-dive before making a non-trivial change.

| Area                               | Location                                                | Start here                                                                                                                                       |
| ---------------------------------- | ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| API routes                         | `src/app/api/v1/`                                       | [`docs/architecture/ARCHITECTURE.md`](docs/architecture/ARCHITECTURE.md)                                                                         |
| Streaming request handling         | `open-sse/handlers/`                                    | [`docs/architecture/ARCHITECTURE.md`](docs/architecture/ARCHITECTURE.md)                                                                         |
| Provider execution and translation | `open-sse/executors/`, `open-sse/translator/`           | [`docs/architecture/CODEBASE_DOCUMENTATION.md`](docs/architecture/CODEBASE_DOCUMENTATION.md)                                                     |
| Routing and resilience             | `open-sse/services/`                                    | [`open-sse/services/AGENTS.md`](open-sse/services/AGENTS.md), [`docs/routing/AUTO-COMBO.md`](docs/routing/AUTO-COMBO.md)                         |
| Database and migrations            | `src/lib/db/`, `db/migrations/`                         | [`src/lib/db/AGENTS.md`](src/lib/db/AGENTS.md)                                                                                                   |
| Domain policy                      | `src/domain/`                                           | [`docs/architecture/ARCHITECTURE.md`](docs/architecture/ARCHITECTURE.md)                                                                         |
| MCP and A2A                        | `open-sse/mcp-server/`, `src/lib/a2a/`                  | [`docs/frameworks/MCP-SERVER.md`](docs/frameworks/MCP-SERVER.md), [`docs/frameworks/A2A-SERVER.md`](docs/frameworks/A2A-SERVER.md)               |
| Agent features                     | `src/lib/{acp,memory,skills,cloudAgent}/`               | [`docs/frameworks/AGENT_PROTOCOLS_GUIDE.md`](docs/frameworks/AGENT_PROTOCOLS_GUIDE.md), [`docs/frameworks/SKILLS.md`](docs/frameworks/SKILLS.md) |
| Safety and governance              | `src/lib/{guardrails,compliance}/`, `src/server/authz/` | [`docs/security/GUARDRAILS.md`](docs/security/GUARDRAILS.md), [`docs/architecture/AUTHZ_GUIDE.md`](docs/architecture/AUTHZ_GUIDE.md)             |
| Operations                         | `src/mitm/`, tunnel modules, `electron/`                | [`docs/ops/TUNNELS_GUIDE.md`](docs/ops/TUNNELS_GUIDE.md), [`docs/guides/ELECTRON_GUIDE.md`](docs/guides/ELECTRON_GUIDE.md)                       |

## Review focus

- Keep database operations in `src/lib/db/`; do not issue raw SQL from routes.
- Send provider requests through `open-sse/handlers/`.
- Keep MCP and A2A pages as tabs inside `/dashboard/endpoint`.
- Preserve SSE cleanup, rate-limit header parsing, Zod validation, and provider-schema
  validation.
- Treat Memory and Skills as cross-cutting changes that can affect MCP tools, the request
  pipeline, and A2A skills.
- Do not close a contributor pull request after using its code; merge it through GitHub so
  the contributor receives credit.

## Upstream contributions

This checkout is a fork of `diegosouzapw/OmniRoute`. Keep fork-only deployment and personal
automation changes out of upstream PRs.

Start upstream work from the active upstream default branch, not `main`:

```bash
git fetch upstream
git switch -c <branch-name> upstream/<default-branch>
```

Target that same release branch in the pull request. Stage only the intended files, run the
focused checks, and use a Conventional Commit message (for example, `docs: slim AGENTS.md`).

## Reference documentation

Use the source of truth for the area you are changing:

| Area                                   | Reference                                                                                                                                                                                                                                              |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Repository navigation and architecture | [`docs/architecture/REPOSITORY_MAP.md`](docs/architecture/REPOSITORY_MAP.md), [`docs/architecture/ARCHITECTURE.md`](docs/architecture/ARCHITECTURE.md)                                                                                                 |
| API and providers                      | [`docs/reference/API_REFERENCE.md`](docs/reference/API_REFERENCE.md), [`docs/reference/PROVIDER_REFERENCE.md`](docs/reference/PROVIDER_REFERENCE.md), [`docs/openapi.yaml`](docs/openapi.yaml)                                                         |
| Routing, resilience, and reasoning     | [`docs/routing/AUTO-COMBO.md`](docs/routing/AUTO-COMBO.md), [`docs/architecture/RESILIENCE_GUIDE.md`](docs/architecture/RESILIENCE_GUIDE.md), [`docs/routing/REASONING_REPLAY.md`](docs/routing/REASONING_REPLAY.md)                                   |
| Security                               | [`docs/security/GUARDRAILS.md`](docs/security/GUARDRAILS.md), [`docs/security/COMPLIANCE.md`](docs/security/COMPLIANCE.md), [`docs/security/STEALTH_GUIDE.md`](docs/security/STEALTH_GUIDE.md)                                                         |
| Platform features                      | [`docs/frameworks/MCP-SERVER.md`](docs/frameworks/MCP-SERVER.md), [`docs/frameworks/A2A-SERVER.md`](docs/frameworks/A2A-SERVER.md), [`docs/frameworks/SKILLS.md`](docs/frameworks/SKILLS.md), [`docs/frameworks/MEMORY.md`](docs/frameworks/MEMORY.md) |
| Releases and quality                   | [`docs/ops/RELEASE_CHECKLIST.md`](docs/ops/RELEASE_CHECKLIST.md), [`docs/architecture/QUALITY_GATES.md`](docs/architecture/QUALITY_GATES.md)                                                                                                           |
