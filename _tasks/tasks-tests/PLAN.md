# OmniRoute — Test Coverage Plan: 79% → 90%

## Regras de Execução

> **OBRIGATÓRIO**: Antes de iniciar qualquer tarefa, o agente DEVE ler o arquivo `.md` da tarefa correspondente usando `view_file`.
> Cada arquivo contém instruções detalhadas, contexto de código, cenários de teste e critérios de aceite específicos.

## Frameworks & Convenções

| Tipo | Framework | Localização | Comando |
|------|-----------|-------------|---------|
| Unit | `node:test` + `assert` | `tests/unit/` | `node --import tsx/esm --test tests/unit/<file>.test.mjs` |
| Unit (collocated) | Vitest | `*/__tests__/` | `npm run test:vitest` |
| Integration | `node:test` | `tests/integration/` | `node --import tsx/esm --test tests/integration/<file>.test.mjs` |
| E2E | Playwright | `tests/e2e/` | `npm run test:e2e` |
| Coverage | c8 | wraps node:test | `npm run test:coverage` |

## Status Atual — 2026-04-05

- **Phases 1 → 5**: concluídas e mantidas abaixo como histórico do push anterior.
- **Gate atual (`npm run test:coverage`)**:
  - Statements: **79.00%**
  - Lines: **79.00%**
  - Functions: **81.30%**
  - Branches: **72.85%**
- **Validação atual (`npm run test:unit`)**:
  - `2006` testes passando
  - `133` suites
  - `0` falhas
- **Hotspots prioritários atuais**:
  - `src/lib/skills/` — 31.35% lines
  - `open-sse/transformer/` — 53.31% lines
  - `src/sse/` — 59.45% lines
  - `src/app/api/` — 60.64% lines / 44.57% branches
  - `open-sse/executors/` — 71.02% lines
  - `open-sse/utils/` — 74.00% lines
  - `src/lib/db/` — 76.59% lines
  - `src/shared/services/` — 58.02% lines

## Baseline Atual

```
Statements: 79.00% | Branches: 72.85% | Functions: 81.30% | Lines: 79.00%
Tests: 133 suites | 2,006 testes passando | 0 falhas
```

---

## Phase 1 — Translators + Executors (64% → 72%)

> Histórico concluído. As fases abaixo permanecem como rastreabilidade do trabalho já entregue.

> Módulos com menor cobertura e maior impacto (todo request passa por eles).

| # | Task File | Target | Coverage Atual |
|---|-----------|--------|----------------|
| 1.01 | [phase-1/task-1.01-translator-openai-to-claude.md](phase-1/task-1.01-translator-openai-to-claude.md) | `openai-to-claude.ts` request | 45.88% |
| 1.02 | [phase-1/task-1.02-translator-openai-to-gemini.md](phase-1/task-1.02-translator-openai-to-gemini.md) | `openai-to-gemini.ts` request | 45.88% |
| 1.03 | [phase-1/task-1.03-translator-claude-to-openai.md](phase-1/task-1.03-translator-claude-to-openai.md) | `claude-to-openai.ts` request | 45.88% |
| 1.04 | [phase-1/task-1.04-translators-remaining-request.md](phase-1/task-1.04-translators-remaining-request.md) | Remaining request translators | 45.88% |
| 1.05 | [phase-1/task-1.05-translator-resp-gemini-openai.md](phase-1/task-1.05-translator-resp-gemini-openai.md) | `gemini-to-openai.ts` response | 47.21% |
| 1.06 | [phase-1/task-1.06-translator-resp-claude-openai.md](phase-1/task-1.06-translator-resp-claude-openai.md) | `claude-to-openai.ts` response | 47.21% |
| 1.07 | [phase-1/task-1.07-translators-remaining-response.md](phase-1/task-1.07-translators-remaining-response.md) | Remaining response translators | 47.21% |
| 1.08 | [phase-1/task-1.08-executor-default-base.md](phase-1/task-1.08-executor-default-base.md) | `default.ts` + `base.ts` executors | 40.76% |
| 1.09 | [phase-1/task-1.09-executor-vertex-cloudflare-cursor.md](phase-1/task-1.09-executor-vertex-cloudflare-cursor.md) | `vertex.ts`, `cloudflare-ai.ts`, `cursor.ts` | 40.76% |
| 1.10 | [phase-1/task-1.10-executor-remaining.md](phase-1/task-1.10-executor-remaining.md) | Remaining executors | 40.76% |

**Gate**: Após Phase 1, rodar `npm run test:coverage` — statements devem estar ≥ 72%.

---

## Phase 2 — Handlers + Services + Utils (72% → 78%)

> Pipeline de processamento de requests e lógica de routing.

| # | Task File | Target | Coverage Atual |
|---|-----------|--------|----------------|
| 2.01 | [phase-2/task-2.01-chatcore-sanitization.md](phase-2/task-2.01-chatcore-sanitization.md) | `chatCore.ts` — sanitization logic | 50.97% |
| 2.02 | [phase-2/task-2.02-chatcore-translation.md](phase-2/task-2.02-chatcore-translation.md) | `chatCore.ts` — translation paths | 50.97% |
| 2.03 | [phase-2/task-2.03-handler-usage-responses.md](phase-2/task-2.03-handler-usage-responses.md) | `usageExtractor.ts`, `responsesHandler.ts` | 50.97% |
| 2.04 | [phase-2/task-2.04-handler-media.md](phase-2/task-2.04-handler-media.md) | embeddings, imageGen, audio handlers | 50.97% |
| 2.05 | [phase-2/task-2.05-handler-search-sse-sanitizer.md](phase-2/task-2.05-handler-search-sse-sanitizer.md) | `search.ts`, `sseParser.ts`, `responseSanitizer.ts` | 50.97% |
| 2.06 | [phase-2/task-2.06-service-combo-routing.md](phase-2/task-2.06-service-combo-routing.md) | `combo.ts` routing engine | 60.80% |
| 2.07 | [phase-2/task-2.07-service-fallback-token.md](phase-2/task-2.07-service-fallback-token.md) | `accountFallback.ts`, `tokenRefresh.ts` | 60.80% |
| 2.08 | [phase-2/task-2.08-service-emergency-quota-role.md](phase-2/task-2.08-service-emergency-quota-role.md) | `emergencyFallback.ts`, `quotaMonitor.ts`, `roleNormalizer.ts` | 60.80% |
| 2.09 | [phase-2/task-2.09-service-cc-compat-selector-config.md](phase-2/task-2.09-service-cc-compat-selector-config.md) | `claudeCodeCompatible.ts`, `accountSelector.ts`, `comboConfig.ts` | 60.80% |
| 2.10 | [phase-2/task-2.10-utils-coverage.md](phase-2/task-2.10-utils-coverage.md) | Utils (thinkTag, cacheControl, aiSdk, ollama, cors, etc.) | 51.97% |

**Gate**: Após Phase 2, `npm run test:coverage` — statements ≥ 78%.

---

## Phase 3 — Data Layer + Domain + OAuth + Middleware (78% → 82%)

> Persistência, políticas de negócio, autenticação.

| # | Task File | Target | Coverage Atual |
|---|-----------|--------|----------------|
| 3.01 | [phase-3/task-3.01-db-core-migration.md](phase-3/task-3.01-db-core-migration.md) | `db/core.ts`, `migrationRunner.ts` | 58.40% |
| 3.02 | [phase-3/task-3.02-db-providers-models-combos.md](phase-3/task-3.02-db-providers-models-combos.md) | `providers.ts`, `models.ts`, `combos.ts` | 58.40% |
| 3.03 | [phase-3/task-3.03-db-apikeys-settings-logs.md](phase-3/task-3.03-db-apikeys-settings-logs.md) | `apiKeys.ts`, `settings.ts`, `detailedLogs.ts` | 58.40% |
| 3.04 | [phase-3/task-3.04-db-encryption-cache-proxies.md](phase-3/task-3.04-db-encryption-cache-proxies.md) | `encryption.ts`, `readCache.ts`, `proxies.ts`, `secrets.ts` | 58.40% |
| 3.05 | [phase-3/task-3.05-memory-store-summarize-cache.md](phase-3/task-3.05-memory-store-summarize-cache.md) | `store.ts`, `summarization.ts`, `cache.ts` | 57.28% |
| 3.06 | [phase-3/task-3.06-domain-policies.md](phase-3/task-3.06-domain-policies.md) | `fallbackPolicy.ts`, `costRules.ts`, `degradation.ts`, `lockoutPolicy.ts` | 83.18% |
| 3.07 | [phase-3/task-3.07-oauth-providers-config.md](phase-3/task-3.07-oauth-providers-config.md) | All 13 OAuth provider configs | 46.37% |
| 3.08 | [phase-3/task-3.08-middleware-injection-guard.md](phase-3/task-3.08-middleware-injection-guard.md) | `promptInjectionGuard.ts` | 48.30% |

**Gate**: Após Phase 3, `npm run test:coverage` — statements ≥ 82%.

---

## Phase 4 — API Routes + Integration + E2E (82% → 85%)

> Cobertura de rotas HTTP e fluxos end-to-end.

| # | Task File | Target | Coverage Atual |
|---|-----------|--------|----------------|
| 4.01 | [phase-4/task-4.01-api-keys-route.md](phase-4/task-4.01-api-keys-route.md) | `/api/keys/` route | 35.21% |
| 4.02 | [phase-4/task-4.02-api-routes-critical.md](phase-4/task-4.02-api-routes-critical.md) | `/api/v1/management/proxies/`, `/api/v1/models/`, `/api/settings/proxy/` | 40-52% |
| 4.03 | [phase-4/task-4.03-integration-chat-pipeline.md](phase-4/task-4.03-integration-chat-pipeline.md) | Full chat request pipeline integration | N/A |
| 4.04 | [phase-4/task-4.04-integration-combo-memory-skills.md](phase-4/task-4.04-integration-combo-memory-skills.md) | Combo routing + Memory + Skills integration | N/A |
| 4.05 | [phase-4/task-4.05-e2e-ui-flows.md](phase-4/task-4.05-e2e-ui-flows.md) | Playwright: providers, API keys, skills, memory | N/A |

**Gate**: Após Phase 4, `npm run test:coverage` — statements ≥ 85%.

---

## Phase 5 — Hardening + Fix Failures (85% stable)

> Cobertura de branches pendentes e correção de testes falhando.

| # | Task File | Target | Coverage Atual |
|---|-----------|--------|----------------|
| 5.01 | [phase-5/task-5.01-branch-hardening-domain-helpers.md](phase-5/task-5.01-branch-hardening-domain-helpers.md) | Branch coverage: `src/domain/`, `translator/helpers/` | 67-72% branches |
| 5.02 | [phase-5/task-5.02-branch-hardening-services-compliance.md](phase-5/task-5.02-branch-hardening-services-compliance.md) | Branch coverage: `services/`, `compliance/`, `providers/` | 55-69% branches |
| 5.03 | [phase-5/task-5.03-fix-existing-failures.md](phase-5/task-5.03-fix-existing-failures.md) | Fix 7 failing tests (context-manager, qoder-executor) | 7 failures |

**Gate Final (Histórico)**: `npm run test:coverage` — all metrics ≥ 85%. Zero test failures.

---

## Phase 6 — Coverage Push: 79% → 90%

> Nova fase ativa. O objetivo aqui é atacar os maiores gaps reais do relatório atual, mantendo o gate de CI em 60% enquanto o repositório sobe com folga até 90%.

| # | Task File | Target | Coverage Atual |
|---|-----------|--------|----------------|
| 6.01 | [phase-6/task-6.01-chatcore-and-combo-deep-coverage.md](phase-6/task-6.01-chatcore-and-combo-deep-coverage.md) | `chatCore.ts` + `combo.ts` | 67.22% / 56.89% lines |
| 6.02 | [phase-6/task-6.02-media-handlers-and-responses-transformer.md](phase-6/task-6.02-media-handlers-and-responses-transformer.md) | media handlers + `responsesTransformer.ts` | 53%–56% lines |
| 6.03 | [phase-6/task-6.03-sse-auth-chat-and-model-routes.md](phase-6/task-6.03-sse-auth-chat-and-model-routes.md) | `src/sse/` auth/chat + model routes | 52%–59% lines |
| 6.04 | [phase-6/task-6.04-executors-and-stream-utils.md](phase-6/task-6.04-executors-and-stream-utils.md) | executors low-coverage + stream utils | 24%–70% lines |
| 6.05 | [phase-6/task-6.05-db-long-tail-and-versioning.md](phase-6/task-6.05-db-long-tail-and-versioning.md) | DB long tail + versioning helpers | 24%–44% lines |
| 6.06 | [phase-6/task-6.06-skills-runtime-and-cloud-sync.md](phase-6/task-6.06-skills-runtime-and-cloud-sync.md) | `src/lib/skills/*` + `cloudSync.ts` | 12%–31% lines |
| 6.07 | [phase-6/task-6.07-shared-services-and-platform-utils.md](phase-6/task-6.07-shared-services-and-platform-utils.md) | shared services, platform utils, runtime env | 20%–44% lines |
| 6.08 | [phase-6/task-6.08-route-edge-cases-and-token-refresh.md](phase-6/task-6.08-route-edge-cases-and-token-refresh.md) | route edge cases + `src/sse/services/tokenRefresh.ts` | 30%–51% lines |
| 6.09 | [phase-6/task-6.09-final-gap-closure-and-ratchet.md](phase-6/task-6.09-final-gap-closure-and-ratchet.md) | final sweep, regression coverage, ratchet plan | fresh report |

**Gate 6.A**: Após `6.01` → `6.03`, `npm run test:coverage` — statements / lines ≥ 82%.

**Gate 6.B**: Após `6.04` → `6.06`, `npm run test:coverage` — statements / lines ≥ 86%, branches ≥ 78%.

**Gate 6.C**: Após `6.07` → `6.09`, `npm run test:coverage` — statements / lines ≥ 90%, branches ≥ 85%, functions ≥ 88%.
