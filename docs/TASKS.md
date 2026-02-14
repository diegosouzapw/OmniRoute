# TASKS — Lista Completa de Tarefas Executáveis

> **Roteiro prático para desenvolvimento do OmniRoute**  
> **Total de tarefas:** 46  
> **Status possíveis:** `Pendente` | `Em Progresso` | `Concluído` | `Bloqueado`

---

## Legenda

| Campo          | Descrição                                           |
| -------------- | --------------------------------------------------- |
| **ID**         | Identificador único no formato `T-XX`               |
| **Fase**       | Fase de origem (`F01`–`F09`)                        |
| **Prioridade** | 🔴 Crítica · 🟠 Importante · 🟡 Moderada · 🟢 Menor |
| **Deps**       | Tarefas das quais esta depende (IDs)                |
| **Status**     | Estado atual da tarefa                              |

---

## FASE 01 — Security Hardening

| ID   | Descrição                                                                                                               | Prioridade  | Deps             | Status    |
| ---- | ----------------------------------------------------------------------------------------------------------------------- | ----------- | ---------------- | --------- |
| T-01 | Remover fallback hardcoded de `JWT_SECRET` em `src/proxy.js` e implementar validação fail-fast na inicialização         | 🔴 Crítica  | —                | Concluído |
| T-02 | Remover fallback hardcoded de `API_KEY_SECRET` em `src/shared/utils/apiKey.js` e implementar validação fail-fast        | 🔴 Crítica  | —                | Concluído |
| T-03 | Atualizar `.env.example` e README com instruções para gerar segredos fortes (openssl rand)                              | 🔴 Crítica  | T-01, T-02       | Concluído |
| T-04 | Adicionar logging estruturado em todos os `catch` blocks silenciosos de `src/proxy.js` (auth_error, settings_error)     | 🔴 Crítica  | —                | Concluído |
| T-05 | Criar módulo `src/shared/utils/inputSanitizer.js` com detecção de prompt injection e PII redaction                      | 🔴 Crítica  | —                | Concluído |
| T-06 | Integrar `inputSanitizer` no pipeline de request em `src/sse/handlers/chat.js` antes de `translateRequest()`            | 🔴 Crítica  | T-05             | Concluído |
| T-07 | Remover `.passthrough()` de `updateSettingsSchema` em `src/shared/validation/schemas.js` e listar campos explicitamente | 🟡 Moderada | —                | Concluído |
| T-08 | Remover dependência `"fs": "^0.0.1-security"` do `package.json` e verificar imports                                     | 🟢 Menor    | —                | Concluído |
| T-09 | Criar testes unitários para validação de segredos e sanitizador de inputs                                               | 🔴 Crítica  | T-01, T-02, T-05 | Concluído |

---

## FASE 02 — CI/CD & Infraestrutura de Testes

| ID   | Descrição                                                                                                                                 | Prioridade    | Deps | Status    |
| ---- | ----------------------------------------------------------------------------------------------------------------------------------------- | ------------- | ---- | --------- |
| T-10 | Criar `.github/workflows/ci.yml` com jobs: lint, build, test:unit, test:e2e (Node 18+22, trigger PR/push)                                 | 🔴 Crítica    | T-01 | Concluído |
| T-11 | Alterar script `"test"` no `package.json` para `node --test tests/unit/*.test.mjs`; adicionar scripts `test:unit`, `test:e2e`, `test:all` | 🔴 Crítica    | —    | Concluído |
| T-12 | Configurar `c8` como ferramenta de cobertura de testes com script `test:coverage` e target mínimo 40%                                     | 🔴 Crítica    | T-11 | Concluído |
| T-13 | Instalar e configurar `eslint-plugin-security` e `eslint-plugin-react-hooks` no `eslint.config.mjs`                                       | 🟠 Importante | —    | Concluído |
| T-14 | Converter 4 scripts de `tests/security/` em testes programáticos `.test.mjs` em `tests/integration/`                                      | 🟠 Importante | T-11 | Concluído |

---

## FASE 03 — Refatoração Arquitetural

| ID   | Descrição                                                                                                                           | Prioridade    | Deps | Status    |
| ---- | ----------------------------------------------------------------------------------------------------------------------------------- | ------------- | ---- | --------- |
| T-15 | Decompor `src/lib/usageDb.js` em 5 módulos: `usageHistory.js`, `callLogs.js`, `costCalculator.js`, `usageStats.js`, `migrations.js` | 🟠 Importante | T-10 | Concluído |
| T-16 | Criar base class `OAuthProvider` em `src/lib/oauth/base/` e factory `providerFactory.js`                                            | 🟠 Importante | T-10 | Concluído |
| T-17 | Extrair 12 providers OAuth em subclasses individuais em `src/lib/oauth/providers/`                                                  | 🟠 Importante | T-16 | Concluído |
| T-18 | Eliminar self-fetch no middleware: criar `src/lib/settingsCache.js` com cache in-memory (TTL 5s) e refatorar `proxy.js`             | 🔴 Crítica    | T-04 | Concluído |
| T-19 | Criar domain layer `src/domain/` com: `modelAvailability.js`, `costRules.js`, `fallbackPolicy.js`                                   | 🟡 Moderada   | T-15 | Concluído |
| T-20 | Adicionar `antigravity-manager-analysis/` ao `.gitignore` e consolidar endpoints `rate-limit/` vs `rate-limits/`                    | 🟢 Menor      | —    | Concluído |

---

## FASE 04 — Error Handling & Observabilidade

| ID   | Descrição                                                                                                                                                       | Prioridade    | Deps | Status    |
| ---- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- | ---- | --------- |
| T-21 | Criar páginas de erro customizadas: `src/app/not-found.js`, `error.js`, `global-error.js` com design do sistema                                                 | 🟠 Importante | —    | Concluído |
| T-22 | Criar catálogo de error codes `src/shared/constants/errorCodes.js` com helper `createErrorResponse()`                                                           | 🟡 Moderada   | T-19 | Concluído |
| T-23 | Implementar middleware de correlation ID (`x-request-id`) em `src/shared/utils/requestId.js` e integrar no pipeline completo (proxy → handler → provider → log) | 🟠 Importante | T-04 | Concluído |
| T-24 | Implementar circuit breaker por provider em `src/lib/circuitBreaker.js` (CLOSED→OPEN→HALF_OPEN) e integrar em `sse/services/auth.js`                            | 🟠 Importante | T-18 | Concluído |
| T-25 | Definir timeout padrão explícito (`FETCH_TIMEOUT_MS=120000`) com `AbortController` em todas as `fetch()` para providers                                         | 🟠 Importante | —    | Concluído |

---

## FASE 05 — Qualidade do Código & Padronização

| ID   | Descrição                                                                                                                                           | Prioridade    | Deps | Status    |
| ---- | --------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- | ---- | --------- |
| T-26 | Criar logger centralizado `src/shared/utils/logger.js` com pino; substituir todos `console.log/error/warn` em `src/`                                | 🟠 Importante | T-04 | Concluído |
| T-27 | Adicionar `@ts-check` + JSDoc (`@param`, `@returns`) em ≥ 10 arquivos críticos (DB, services, domain)                                               | 🟠 Importante | T-19 | Concluído |
| T-28 | Decompor `handleSingleModelChat` (183 linhas) em subfunções <80 linhas; decompor `getUsageStats` (180 linhas)                                       | 🟡 Moderada   | T-15 | Concluído |
| T-29 | Decompor 5 componentes UI monolíticos (RequestLoggerV2, UsageStats, ProxyLogger, OAuthModal, ProxyConfigModal) em sub-componentes + hooks extraídos | 🟡 Moderada   | —    | Concluído |

---

## FASE 06 — Documentação & Governança

| ID   | Descrição                                                                                                                              | Prioridade  | Deps       | Status    |
| ---- | -------------------------------------------------------------------------------------------------------------------------------------- | ----------- | ---------- | --------- |
| T-30 | Criar diretório `docs/adr/` com template e ≥ 6 ADRs (SQLite, Fallback, OAuth Strategy, JS+JSDoc, Single-Tenant, Translator Registry)   | 🟡 Moderada | T-16, T-27 | Pendente  |
| T-31 | Criar `CONTRIBUTING.md` na raiz (6 seções: setup, workflow, standards, testing, PR, architecture) e `.github/PULL_REQUEST_TEMPLATE.md` | 🟡 Moderada | T-26       | Concluído |
| T-32 | Expandir `SECURITY.md` para ≥ 2KB (disclosure, scope, SLA, contact, best practices, limitations)                                       | 🟡 Moderada | T-01       | Concluído |
| T-33 | Padronizar JSDoc em ≥ 80% das funções exportadas em módulos priorizados; ativar ESLint rule `jsdoc/require-jsdoc`                      | 🟢 Menor    | T-27       | Pendente  |

---

## FASE 07 — UX & Microinterações

| ID   | Descrição                                                                                                                                           | Prioridade  | Deps | Status    |
| ---- | --------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- | ---- | --------- |
| T-34 | Criar Zustand store `notificationStore.js` e componente `NotificationToast.js` com 4 tipos (success, error, warning, info); integrar no layout root | 🟡 Moderada | T-29 | Concluído |
| T-35 | Executar auditoria a11y com axe-core em 4 páginas; corrigir: `role="dialog"`, focus trap, `aria-label`, contraste WCAG AA                           | 🟡 Moderada | T-29 | Pendente  |
| T-36 | Criar componente `Breadcrumbs.js` com mapeamento de paths para labels amigáveis e integrar no layout do dashboard                                   | 🟡 Moderada | —    | Concluído |
| T-37 | Criar componente `EmptyState.js` e implementar em 4 seções (Providers, Combos, Usage, Request Logger)                                               | 🟡 Moderada | —    | Concluído |
| T-38 | Implementar reset de senha via CLI (`npx omniroute reset-password`) e documentar no README e login page                                             | 🟡 Moderada | T-01 | Pendente  |
| T-39 | Criar testes Playwright de responsividade (viewport 375px e 768px) para Login, Dashboard, Providers, Settings                                       | 🟢 Menor    | T-14 | Pendente  |

---

## FASE 08 — LLM Proxy: Recursos Avançados

| ID   | Descrição                                                                                                                                                    | Prioridade    | Deps       | Status    |
| ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------- | ---------- | --------- |
| T-40 | Criar Policy Engine declarativo `src/lib/policies/policyEngine.js` com 3 tipos (routing, budget, access); API CRUD e tela no dashboard                       | 🟡 Moderada   | T-19, T-24 | Concluído |
| T-41 | Implementar cache layer LRU `src/lib/cacheLayer.js` com hash key, TTL configurável, bypass via `x-no-cache`, e endpoint `/api/cache/stats`                   | 🟠 Importante | T-25       | Concluído |
| T-42 | Criar framework de evals `src/lib/evals/evalRunner.js` com golden set (≥10 cases), endpoints trigger/results, e scorecard no dashboard                       | 🟡 Moderada   | T-22       | Pendente  |
| T-43 | Implementar controles de compliance: `LOG_RETENTION_DAYS` com limpeza automática, opt-out `noLog` por API key, tabela `audit_log` para ações administrativas | 🟡 Moderada   | T-15       | Pendente  |

---

## FASE 09 — Hardening de Fluxo Ponta a Ponta

| ID   | Descrição                                                                                                                                                          | Prioridade  | Deps       | Status    |
| ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------- | ---------- | --------- |
| T-44 | Criar `StreamTracker` em `src/sse/services/streamState.js` com 6 estados (INITIALIZED→CANCELLED); integrar no pipeline SSE e expor via `/api/streams/active`       | 🟡 Moderada | T-23       | Concluído |
| T-45 | Criar `RequestTelemetry` em `src/shared/utils/requestTelemetry.js` medindo 7 fases; armazenar timings no call log e expor p50/p95/p99 via `/api/telemetry/summary` | 🟡 Moderada | T-23, T-15 | Concluído |
| T-46 | Extrair regras de negócio residuais de `handleChat` para domain layer (`lockoutPolicy.js`, `comboResolver.js`); refatorar handler para <50 linhas                  | 🟡 Moderada | T-19, T-28 | Concluído |

---

## Resumo por Prioridade

| Prioridade    | Total  | Concluídas | Pendentes |
| ------------- | ------ | ---------- | --------- |
| 🔴 Crítica    | 11     | 11         | 0         |
| 🟠 Importante | 12     | 12         | 0         |
| 🟡 Moderada   | 19     | 12         | 7         |
| 🟢 Menor      | 4      | 2          | 2         |
| **Total**     | **46** | **37**     | **9**     |

## Tarefas Pendentes

| ID   | Fase | Descrição                         | Prioridade  |
| ---- | ---- | --------------------------------- | ----------- |
| T-30 | F06  | ADRs (6+ decisões arquiteturais)  | 🟡 Moderada |
| T-33 | F06  | JSDoc coverage ≥80% + ESLint rule | 🟢 Menor    |
| T-35 | F07  | Auditoria a11y com axe-core       | 🟡 Moderada |
| T-38 | F07  | Password reset CLI                | 🟡 Moderada |
| T-39 | F07  | Playwright responsive tests       | 🟢 Menor    |
| T-42 | F08  | Eval framework (golden set)       | 🟡 Moderada |
| T-43 | F08  | Compliance (retention, audit log) | 🟡 Moderada |
