# Traceability Matrix

Minimal traceability of core OmniRoute features to source and test files.

| Requirement | Source file(s) | Test file(s) | Status |
|---|---|---|---|
| LLM request routing & proxying | `src/lib/api/`, `src/domain/router/port.ts`, `src/proxy.ts` | `tests/unit/bifrost-routing-core.test.ts`, `tests/unit/auto-routing-settings-resolve.test.ts` | 🟡 Partial |
| Provider registration & rotation | `src/lib/providers/`, `src/lib/oauth/` | `tests/unit/cli-providers-command.test.ts`, `tests/unit/cli-providers-rotate.test.ts` | 🟡 Partial |
| Authorization & route guards | `src/server/authz/`, `src/lib/middleware/` | `tests/unit/authz/routeGuard.test.ts`, `tests/unit/authz/proxy-contract.test.ts` | 🟡 Partial |
| Guardrails (prompt injection, vision) | `src/lib/guardrails/promptInjection.ts`, `src/lib/guardrails/visionBridge.ts` | `tests/unit/guardrails/visionBridge.test.ts` | 🟡 Partial |
| Batch job processing | `src/lib/batches/` | `tests/unit/batch-processor.test.ts`, `tests/unit/batch-deletion.test.ts`, `tests/unit/batch_api.test.ts` | 🟡 Partial |
| Evaluation runner | `src/lib/evals/evalRunner.ts` | `tests/unit/cli-eval-commands.test.ts` | 🟡 Partial |
| Agent-to-Agent (A2A) protocol | `src/lib/a2a/`, `src/app/a2a/` | *(none found)* | 🔴 Missing |
| Account fallback & resilience | `src/lib/resilience/settings.ts` | `tests/unit/account-fallback-service.test.ts`, `tests/unit/account-fallback-anthropic-quota.test.ts` | 🟡 Partial |
| API key lifecycle | `src/lib/apiBridgeServer.ts`, `src/lib/system/` | `tests/unit/api-key-policy.test.ts`, `tests/unit/api-key-rotator-health.test.ts` | 🟡 Partial |
| Usage & quota tracking | `src/lib/usage/`, `src/lib/providerModels/` | `tests/unit/antigravity-usage-service.test.ts`, `tests/unit/antigravity-usage-fetcher.test.ts` | 🟡 Partial |

**Legend**
- 🟢 Covered — tests exist and are passing in CI
- 🟡 Partial — some tests exist but coverage is incomplete or not fully wired in CI
- 🔴 Missing — no dedicated tests found or feature is experimental

> This is a living skeleton. Update rows as features stabilize and tests are added.
