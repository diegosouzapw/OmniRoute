# Modification Playbooks

Step-by-step checklists for the most common extension points. Moved here from
`CLAUDE.md` to keep the always-loaded instructions lean; the content is unchanged.

## Adding a New Provider

1. Register in `src/shared/constants/providers.ts` (Zod-validated at load)
2. Add executor in `open-sse/executors/` if custom logic needed (extend `BaseExecutor`)
3. Add translator in `open-sse/translator/` if non-OpenAI format
4. Add OAuth config in `src/lib/oauth/constants/oauth.ts` if OAuth-based — if the upstream CLI ships a public client_id/secret, embed via `resolvePublicCred()` (see `docs/security/PUBLIC_CREDS.md`), **never** as a literal
5. Register models in `open-sse/config/providerRegistry.ts`
6. Write tests in `tests/unit/` (include the publicCreds shape assertion if you added a new embedded default)

## Adding a New API Route

1. Create directory under `src/app/api/v1/your-route/`
2. Create `route.ts` with `GET`/`POST` handlers
3. Follow pattern: CORS → Zod body validation → optional auth → handler delegation
4. Handler goes in `open-sse/handlers/` (import from there, not inline)
5. Error responses use `buildErrorBody()` / `errorResponse()` from `open-sse/utils/error.ts` (auto-sanitized — never put `err.stack` or `err.message` raw in the body). See `docs/security/ERROR_SANITIZATION.md`.
6. Add tests — including at least one assertion that error responses do not leak stack traces (`!body.error.message.includes("at /")`)

## Adding a New DB Module

1. Create `src/lib/db/yourModule.ts` — import `getDbInstance` from `./core.ts`
2. Export CRUD functions for your domain table(s)
3. Add migration in `src/lib/db/migrations/` if new tables needed
4. Re-export from `src/lib/localDb.ts` (add to the re-export list only)
5. Write tests

## Adding a New MCP Tool

1. Add tool definition in `open-sse/mcp-server/tools/` with Zod input schema + async handler
2. Register in tool set (wired by `createMcpServer()`)
3. Assign to appropriate scope(s)
4. Write tests (tool invocation logged to `mcp_audit` table)

## Adding a New A2A Skill

1. Create skill in `src/lib/a2a/skills/` (5 already exist: smart-routing, quota-management, provider-discovery, cost-analysis, health-report)
2. Skill receives task context (messages, metadata) → returns structured result
3. Register in `A2A_SKILL_HANDLERS` in `src/lib/a2a/taskExecution.ts`
4. Expose in `src/app/.well-known/agent.json/route.ts` (Agent Card)
5. Write tests in `tests/unit/`
6. Document in `docs/frameworks/A2A-SERVER.md` skill table

## Adding a New Cloud Agent

1. Create agent class in `src/lib/cloudAgent/agents/` extending `CloudAgentBase` (3 already exist: codex-cloud, devin, jules)
2. Implement `createTask`, `getStatus`, `approvePlan`, `sendMessage`, `listSources`
3. Register in `src/lib/cloudAgent/registry.ts`
4. Add OAuth/credentials handling if needed (`src/lib/oauth/providers/`)
5. Tests + document in `docs/frameworks/CLOUD_AGENT.md`

## Adding a New Embedded Service

1. Create installer in `src/lib/services/installers/{name}.ts` modeled on `ninerouter.ts` (use `runNpm` from `installers/utils.ts` — no shell interpolation, hard rule #13).
2. Register the service in `src/lib/services/bootstrap.ts` (add to `SERVICES[]` array and extend `buildSpawnArgsFactory()`).
3. Add a DB seed row for the new service in `src/lib/db/migrations/` (`version_manager` table, `status='not_installed'`, `auto_start=0`).
4. Create 7 API endpoints under `src/app/api/services/{name}/` (`_lib.ts`, `install`, `start`, `stop`, `restart`, `update`, `status`, `auto-start`). All delegate errors through `createErrorResponse()`. The shared `logs` endpoint is already wired via `[name]/logs/route.ts`.
5. Verify `/api/services/` is in `LOCAL_ONLY_API_PREFIXES` in `src/server/authz/routeGuard.ts`; add a test asserting `isLocalOnlyPath()` returns `true` for the new prefix if you add one (hard rule #17).
6. Add a UI tab in `src/app/(dashboard)/dashboard/providers/services/tabs/` reusing `ServiceStatusCard`, `ServiceLifecycleButtons`, `ServiceLogsPanel`.
7. Document in `docs/frameworks/EMBEDDED-SERVICES.md` (update §1 service table + §4 API reference) and `docs/openapi.yaml`.
8. Write tests: unit (`tests/unit/services/`), integration (`tests/integration/services/`, gated by `RUN_SERVICES_INT=1`), and update `docs/ops/RELEASE_CHECKLIST.md` smoke section.

## Adding a New Guardrail / Eval / Skill / Webhook event

- Guardrail: `src/lib/guardrails/` → docs: `docs/security/GUARDRAILS.md`
- Eval suite: `src/lib/evals/` → docs: `docs/frameworks/EVALS.md`
- Skill (sandbox): `src/lib/skills/` → docs: `docs/frameworks/SKILLS.md`
- Webhook event: `src/lib/webhookDispatcher.ts` → docs: `docs/frameworks/WEBHOOKS.md`
