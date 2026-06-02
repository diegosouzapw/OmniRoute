---
title: "OmniRoute Upstream Issues and PRs"
---

# OmniRoute Upstream Issues and PRs

Prepared from the current local OmniRoute working tree on 2026-06-01.

This document is intentionally practical: it separates upstream-ready changes from fork-only/local changes, and it leaves issue text, PR text, commands, branch names, commit messages, and compare URLs ready to copy and paste.

Assumption used below: your fork is `zhiru/OmniRoute`, because `origin` currently points to that repository.

## Recommended upstream candidates now

1. VS Code Copilot BYOK / Ollama compatibility via token-scoped routes and catalog normalization.
2. SQL.js bootstrap hardening and optional FTS5 migration deferral.

## Do not upstream as-is from the current tree

- `.gitignore`, local Apache files, `apache.http-proxy.md`, `server-access.md`, and `docs/ops/deploy/neuraltalk-omni-production.md` are fork-specific.
- `docker-compose.prod.yml` is deployment-specific.
- `.source/browser.ts` and `.source/server.ts` are generated artifacts and currently include a local deploy doc path.
- The proxy/dashboard text and i18n changes are valid, but they should be isolated later as a separate polish PR instead of being mixed with the two core upstream candidates.

## Shared setup

Use this once before preparing any upstream branch:

```bash
cd /home/aireset/projetos/docker/omniroute
git remote get-url upstream >/dev/null 2>&1 || git remote add upstream git@github.com:diegosouzapw/OmniRoute.git
git fetch upstream
git status --short
```

If you want to confirm whether your local base already matches upstream main:

```bash
cd /home/aireset/projetos/docker/omniroute
git rev-parse main
git rev-parse upstream/main
git diff --stat upstream/main...main
```

## Candidate 1

### Feature

VS Code Copilot BYOK / Ollama compatibility using token-scoped OmniRoute aliases.

### Candidate 2 upstream rationale

- It is general product functionality, not a fork-only deployment tweak.
- It helps OmniRoute act as a BYOK-compatible backend for VS Code Copilot in Ollama endpoint mode.
- It adds tests for routing, model discovery, reasoning metadata, and MCP catalog aggregation.

### Candidate 2 files to include

```text
open-sse/mcp-server/schemas/tools.ts
open-sse/mcp-server/server.ts
src/app/(dashboard)/dashboard/endpoint/ApiEndpointsTab.tsx
src/app/(dashboard)/dashboard/endpoint/EndpointPageClient.tsx
src/app/(dashboard)/dashboard/endpoint/VscodeTokenAliasCard.tsx
src/app/(dashboard)/dashboard/endpoint/__tests__/ApiEndpointsTab.test.tsx
src/app/(dashboard)/dashboard/endpoint/__tests__/EndpointPageClient.test.tsx
src/app/(dashboard)/dashboard/providers/[id]/page.tsx
src/app/api/v1/models/catalog.ts
src/app/api/v1/vscode/VS_CODE_COPILOT_OLLAMA_CONTRACT.md
src/app/api/v1/vscode/[token]/api/chat/route.ts
src/app/api/v1/vscode/[token]/api/show/route.ts
src/app/api/v1/vscode/[token]/api/tags/route.ts
src/app/api/v1/vscode/[token]/api/version/route.ts
src/app/api/v1/vscode/[token]/chat/completions/route.ts
src/app/api/v1/vscode/[token]/modelPresentation.ts
src/app/api/v1/vscode/[token]/models/route.ts
src/app/api/v1/vscode/[token]/reasoningMetadata.ts
src/app/api/v1/vscode/[token]/responses/route.ts
src/app/api/v1/vscode/[token]/route.ts
src/app/api/v1/vscode/[token]/v1/chat/completions/route.ts
src/app/api/v1/vscode/[token]/v1/models/route.ts
src/i18n/messages/en.json
src/i18n/messages/pt-BR.json
src/lib/modelMetadataRegistry.ts
src/shared/constants/modelSpecs.ts
src/shared/utils/apiAuth.ts
src/sse/services/auth.ts
tests/unit/api-auth.test.ts
tests/unit/mcp-model-catalog.test.ts
tests/unit/models-catalog-route.test.ts
tests/unit/provider-models-route.test.ts
tests/unit/sse-auth.test.ts
tests/unit/vscode-token-routes.test.ts
```

### Candidate 2 files to keep out of this PR

```text
.gitignore
.dockerignore
docker-compose.prod.yml
.source/browser.ts
.source/server.ts
src/app/(dashboard)/dashboard/settings/components/ProxyTab.tsx
src/app/(dashboard)/dashboard/settings/components/proxy/DocumentationTab.tsx
src/app/(dashboard)/dashboard/settings/components/proxy/FreePoolTab.tsx
src/app/(dashboard)/dashboard/settings/components/proxy/VercelRelayModal.tsx
docs/guides/SETUP_GUIDE.md
docs/reference/API_REFERENCE.md
docs/reference/CLI-TOOLS.md
scripts/build/bootstrap-env.mjs
scripts/dev/run-next.mjs
tests/integration/integration-wiring.test.ts
```

### Candidate 2 suggested branch

```text
feat/upstream-vscode-ollama-compat
```

### Candidate 2 copy/paste commands

```bash
cd /home/aireset/projetos/docker/omniroute
git switch -c feat/upstream-vscode-ollama-compat upstream/main
git add \
  'open-sse/mcp-server/schemas/tools.ts' \
  'open-sse/mcp-server/server.ts' \
  'src/app/(dashboard)/dashboard/endpoint/ApiEndpointsTab.tsx' \
  'src/app/(dashboard)/dashboard/endpoint/EndpointPageClient.tsx' \
  'src/app/(dashboard)/dashboard/endpoint/VscodeTokenAliasCard.tsx' \
  'src/app/(dashboard)/dashboard/endpoint/__tests__/ApiEndpointsTab.test.tsx' \
  'src/app/(dashboard)/dashboard/endpoint/__tests__/EndpointPageClient.test.tsx' \
  'src/app/(dashboard)/dashboard/providers/[id]/page.tsx' \
  'src/app/api/v1/models/catalog.ts' \
  'src/app/api/v1/vscode/VS_CODE_COPILOT_OLLAMA_CONTRACT.md' \
  'src/app/api/v1/vscode/[token]/api/chat/route.ts' \
  'src/app/api/v1/vscode/[token]/api/show/route.ts' \
  'src/app/api/v1/vscode/[token]/api/tags/route.ts' \
  'src/app/api/v1/vscode/[token]/api/version/route.ts' \
  'src/app/api/v1/vscode/[token]/chat/completions/route.ts' \
  'src/app/api/v1/vscode/[token]/modelPresentation.ts' \
  'src/app/api/v1/vscode/[token]/models/route.ts' \
  'src/app/api/v1/vscode/[token]/reasoningMetadata.ts' \
  'src/app/api/v1/vscode/[token]/responses/route.ts' \
  'src/app/api/v1/vscode/[token]/route.ts' \
  'src/app/api/v1/vscode/[token]/v1/chat/completions/route.ts' \
  'src/app/api/v1/vscode/[token]/v1/models/route.ts' \
  'src/i18n/messages/en.json' \
  'src/i18n/messages/pt-BR.json' \
  'src/lib/modelMetadataRegistry.ts' \
  'src/shared/constants/modelSpecs.ts' \
  'src/shared/utils/apiAuth.ts' \
  'src/sse/services/auth.ts' \
  'tests/unit/api-auth.test.ts' \
  'tests/unit/mcp-model-catalog.test.ts' \
  'tests/unit/models-catalog-route.test.ts' \
  'tests/unit/provider-models-route.test.ts' \
  'tests/unit/sse-auth.test.ts' \
  'tests/unit/vscode-token-routes.test.ts'
git diff --cached --stat
node --import tsx/esm --test tests/unit/vscode-token-routes.test.ts
node --import tsx/esm --test tests/unit/mcp-model-catalog.test.ts
node --import tsx/esm --test tests/unit/api-auth.test.ts tests/unit/sse-auth.test.ts tests/unit/models-catalog-route.test.ts tests/unit/provider-models-route.test.ts
npm run test:coverage
git commit -m "feat(vscode): add Ollama-compatible token routes for BYOK"
git push -u origin feat/upstream-vscode-ollama-compat
```

### Candidate 2 compare URL

```text
https://github.com/diegosouzapw/OmniRoute/compare/main...zhiru:feat/upstream-vscode-ollama-compat?expand=1
```

### Candidate 2 suggested issue title

```text
Support VS Code Copilot BYOK Ollama mode with token-scoped discovery and chat aliases
```

### Candidate 2 suggested issue body

```md
## Summary

OmniRoute already exposes OpenAI-compatible routes, but VS Code Copilot BYOK in Ollama mode expects an Ollama-style discovery contract before it will use a custom endpoint.

Right now this makes integration harder when OmniRoute is running with API key auth enabled, because the extension expects paths like `/api/version`, `/api/tags`, `/api/show`, and `/v1/chat/completions` under a single base endpoint.

## Problem

- VS Code Copilot BYOK Ollama mode first validates the endpoint through Ollama-style discovery routes.
- A custom OmniRoute deployment may require authentication for model discovery.
- The extension benefits from stable model naming, capability hints, and reasoning metadata so imported models are usable without manual cleanup.

## Proposal

Add a token-scoped compatibility surface such as `/api/v1/vscode/{token}/...` that:

- mirrors the OpenAI-compatible model catalog,
- serves Ollama-compatible discovery endpoints,
- forwards chat traffic to OpenAI-compatible completions routes,
- accepts path-scoped API keys,
- normalizes provider aliases and capabilities,
- exposes reasoning effort metadata where supported.

## Expected benefit

- Easier VS Code Copilot BYOK onboarding
- Cleaner model import experience
- Better interoperability without weakening OmniRoute auth

## Notes

I already have a local implementation and tests for this, and I can open a focused PR if this direction is welcome.
```

### Candidate 2 suggested PR title

```text
feat(vscode): add Ollama-compatible token routes for VS Code BYOK
```

### Candidate 2 suggested PR body

```md
## Summary

This PR adds a token-scoped VS Code compatibility surface so OmniRoute can behave like an Ollama-compatible BYOK endpoint for VS Code Copilot while keeping OmniRoute auth in place.

## What changed

- added `/api/v1/vscode/{token}` discovery and chat aliases
- added Ollama-compatible `/api/version`, `/api/tags`, and `/api/show` responses
- reused the OpenAI-compatible model catalog behind token-scoped routes
- taught auth helpers to accept path-scoped API keys for these routes
- normalized model/provider metadata for VS Code import flows
- exposed reasoning effort metadata where available
- added dashboard endpoint cards to show the ready-to-copy VS Code URLs
- expanded MCP model catalog aggregation to include provider alias resolution and thinking effort metadata
- added unit tests for routes, auth, and catalog behavior

## Why

VS Code Copilot BYOK in Ollama mode validates a specific discovery contract before using a custom endpoint. OmniRoute already has most of the necessary building blocks, but not the token-scoped compatibility layer.

## Testing

- `node --import tsx/esm --test tests/unit/vscode-token-routes.test.ts`
- `node --import tsx/esm --test tests/unit/mcp-model-catalog.test.ts`
- `node --import tsx/esm --test tests/unit/api-auth.test.ts tests/unit/sse-auth.test.ts tests/unit/models-catalog-route.test.ts tests/unit/provider-models-route.test.ts`
- `npm run test:coverage`
```

## Candidate 2

### Fix

Harden SQL.js startup and defer optional FTS5 migrations when the active SQLite driver does not support FTS5.

### Why this belongs upstream

- It improves runtime robustness for valid OmniRoute installations.
- It prevents startup failures in environments that rely on `sql.js` or a SQLite driver without FTS5.
- It keeps the application usable while clearly warning that memory search falls back until FTS5 support is available.

### Files to include

```text
src/lib/db/adapters/sqljsAdapter.ts
src/lib/db/core.ts
src/lib/db/migrationRunner.ts
tests/unit/db-core-native-error.test.ts
tests/unit/db-migration-runner.test.ts
```

### Files to keep out of this PR

```text
.gitignore
.dockerignore
docker-compose.prod.yml
.source/browser.ts
.source/server.ts
src/app/api/v1/vscode/**
src/app/(dashboard)/dashboard/**
src/app/api/v1/models/catalog.ts
src/shared/utils/apiAuth.ts
open-sse/mcp-server/**
```

### Suggested branch

```text
fix/upstream-sqljs-fts5-bootstrap
```

### Copy/paste commands

```bash
cd /home/aireset/projetos/docker/omniroute
git switch -c fix/upstream-sqljs-fts5-bootstrap upstream/main
git add \
  'src/lib/db/adapters/sqljsAdapter.ts' \
  'src/lib/db/core.ts' \
  'src/lib/db/migrationRunner.ts' \
  'tests/unit/db-core-native-error.test.ts' \
  'tests/unit/db-migration-runner.test.ts'
git diff --cached --stat
node --import tsx/esm --test tests/unit/db-core-native-error.test.ts
node --import tsx/esm --test tests/unit/db-migration-runner.test.ts
npm run test:coverage
git commit -m "fix(db): harden sql.js startup and skip unsupported FTS5 migrations"
git push -u origin fix/upstream-sqljs-fts5-bootstrap
```

### Compare URL

```text
https://github.com/diegosouzapw/OmniRoute/compare/main...zhiru:fix/upstream-sqljs-fts5-bootstrap?expand=1
```

### Suggested issue title

```text
Avoid SQL.js startup failures and defer optional FTS5 migrations on drivers without FTS5 support
```

### Suggested issue body

```md
## Summary

Some OmniRoute environments can run with `sql.js` or with SQLite drivers that do not expose FTS5. In those cases, startup can fail for two avoidable reasons:

1. `sql.js` may not resolve `sql-wasm.wasm` correctly in bundled/standalone layouts.
2. Optional FTS5 migrations can abort the migration runner even though the rest of the database is usable.

## Problem

- a valid `sql.js` deployment can fail before the database is initialized if the WASM asset is not located correctly
- optional memory-search migrations should not block the whole app on a driver that lacks FTS5
- current behavior is harsher than necessary because the fallback mode is still usable

## Proposal

- resolve `sql-wasm.wasm` from both regular and standalone runtime layouts
- classify pre-init driver-unavailable errors explicitly
- defer optional FTS5 migrations when the active driver reports `no such module: fts5`
- keep a clear warning so operators know memory search is degraded until a driver with FTS5 support is available

## Expected benefit

- safer startup on sql.js-based installs
- fewer false-positive migration aborts
- clearer degraded-mode behavior instead of full startup failure

## Notes

I already have a local implementation and tests for this and can open a focused PR if this direction is useful.
```

### Suggested PR title

```text
fix(db): harden sql.js startup and skip unsupported FTS5 migrations
```

### Suggested PR body

```md
## Summary

This PR makes SQLite startup more resilient in environments that use `sql.js` or SQLite drivers without FTS5 support.

## What changed

- resolved `sql-wasm.wasm` from both regular `node_modules` and standalone runtime layouts
- added explicit detection for pre-init driver-unavailable errors
- treated those driver-unavailable errors as startup-critical where appropriate
- marked the FTS5 migrations as optional when the active driver does not support FTS5
- kept the migration runner warning so degraded memory search remains visible
- added unit coverage for the new error classification and deferred migration behavior

## Why

The application can still function in degraded mode without FTS5, so optional FTS5 migrations should not crash startup. Likewise, `sql.js` installations should not fail only because the WASM file is resolved from a different runtime layout.

## Testing

- `node --import tsx/esm --test tests/unit/db-core-native-error.test.ts`
- `node --import tsx/esm --test tests/unit/db-migration-runner.test.ts`
- `npm run test:coverage`
```

## Optional future split

If you want a third upstream item later, the most promising one is a separate docs/container fix around the Dashboard Docs viewer needing the English markdown tree available at runtime. That needs cleanup first so it does not include fork-only files or generated `.source/*` noise.
