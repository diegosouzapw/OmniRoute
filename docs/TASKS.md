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

| ID   | Descrição                                                                                                               | Prioridade  | Deps             | Status   |
| ---- | ----------------------------------------------------------------------------------------------------------------------- | ----------- | ---------------- | -------- |
| T-01 | Remover fallback hardcoded de `JWT_SECRET` em `src/proxy.js` e implementar validação fail-fast na inicialização         | 🔴 Crítica  | —                | Pendente |
| T-02 | Remover fallback hardcoded de `API_KEY_SECRET` em `src/shared/utils/apiKey.js` e implementar validação fail-fast        | 🔴 Crítica  | —                | Pendente |
| T-03 | Atualizar `.env.example` e README com instruções para gerar segredos fortes (openssl rand)                              | 🔴 Crítica  | T-01, T-02       | Pendente |
| T-04 | Adicionar logging estruturado em todos os `catch` blocks silenciosos de `src/proxy.js` (auth_error, settings_error)     | 🔴 Crítica  | —                | Pendente |
| T-05 | Criar módulo `src/shared/utils/inputSanitizer.js` com detecção de prompt injection e PII redaction                      | 🔴 Crítica  | —                | Pendente |
| T-06 | Integrar `inputSanitizer` no pipeline de request em `src/sse/handlers/chat.js` antes de `translateRequest()`            | 🔴 Crítica  | T-05             | Pendente |
| T-07 | Remover `.passthrough()` de `updateSettingsSchema` em `src/shared/validation/schemas.js` e listar campos explicitamente | 🟡 Moderada | —                | Pendente |
| T-08 | Remover dependência `"fs": "^0.0.1-security"` do `package.json` e verificar imports                                     | 🟢 Menor    | —                | Pendente |
| T-09 | Criar testes unitários para validação de segredos e sanitizador de inputs                                               | 🔴 Crítica  | T-01, T-02, T-05 | Pendente |

---

## FASE 02 — CI/CD & Infraestrutura de Testes

| ID   | Descrição                                                                                                                                 | Prioridade    | Deps | Status   |
| ---- | ----------------------------------------------------------------------------------------------------------------------------------------- | ------------- | ---- | -------- |
| T-10 | Criar `.github/workflows/ci.yml` com jobs: lint, build, test:unit, test:e2e (Node 18+22, trigger PR/push)                                 | 🔴 Crítica    | T-01 | Pendente |
| T-11 | Alterar script `"test"` no `package.json` para `node --test tests/unit/*.test.mjs`; adicionar scripts `test:unit`, `test:e2e`, `test:all` | 🔴 Crítica    | —    | Pendente |
| T-12 | Configurar `c8` como ferramenta de cobertura de testes com script `test:coverage` e target mínimo 40%                                     | 🔴 Crítica    | T-11 | Pendente |
| T-13 | Instalar e configurar `eslint-plugin-security` e `eslint-plugin-react-hooks` no `eslint.config.mjs`                                       | 🟠 Importante | —    | Pendente |
| T-14 | Converter 4 scripts de `tests/security/` em testes programáticos `.test.mjs` em `tests/integration/`                                      | 🟠 Importante | T-11 | Pendente |

---

## FASE 03 — Refatoração Arquitetural

| ID   | Descrição                                                                                                                           | Prioridade    | Deps | Status   |
| ---- | ----------------------------------------------------------------------------------------------------------------------------------- | ------------- | ---- | -------- |
| T-15 | Decompor `src/lib/usageDb.js` em 5 módulos: `usageHistory.js`, `callLogs.js`, `costCalculator.js`, `usageStats.js`, `migrations.js` | 🟠 Importante | T-10 | Pendente |
| T-16 | Criar base class `OAuthProvider` em `src/lib/oauth/base/` e factory `providerFactory.js`                                            | 🟠 Importante | T-10 | Pendente |
| T-17 | Extrair 12 providers OAuth em subclasses individuais em `src/lib/oauth/providers/`                                                  | 🟠 Importante | T-16 | Pendente |
| T-18 | Eliminar self-fetch no middleware: criar `src/lib/settingsCache.js` com cache in-memory (TTL 5s) e refatorar `proxy.js`             | 🔴 Crítica    | T-04 | Pendente |
| T-19 | Criar domain layer `src/domain/` com: `modelAvailability.js`, `costRules.js`, `fallbackPolicy.js`                                   | 🟡 Moderada   | T-15 | Pendente |
| T-20 | Adicionar `antigravity-manager-analysis/` ao `.gitignore` e consolidar endpoints `rate-limit/` vs `rate-limits/`                    | 🟢 Menor      | —    | Pendente |

---

## FASE 04 — Error Handling & Observabilidade

| ID   | Descrição                                                                                                                                                       | Prioridade    | Deps | Status   |
| ---- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- | ---- | -------- |
| T-21 | Criar páginas de erro customizadas: `src/app/not-found.js`, `error.js`, `global-error.js` com design do sistema                                                 | 🟠 Importante | —    | Pendente |
| T-22 | Criar catálogo de error codes `src/shared/constants/errorCodes.js` com helper `createErrorResponse()`                                                           | 🟡 Moderada   | T-19 | Pendente |
| T-23 | Implementar middleware de correlation ID (`x-request-id`) em `src/shared/utils/requestId.js` e integrar no pipeline completo (proxy → handler → provider → log) | 🟠 Importante | T-04 | Pendente |
| T-24 | Implementar circuit breaker por provider em `src/lib/circuitBreaker.js` (CLOSED→OPEN→HALF_OPEN) e integrar em `sse/services/auth.js`                            | 🟠 Importante | T-18 | Pendente |
| T-25 | Definir timeout padrão explícito (`FETCH_TIMEOUT_MS=120000`) com `AbortController` em todas as `fetch()` para providers                                         | 🟠 Importante | —    | Pendente |

---

## FASE 05 — Qualidade do Código & Padronização

| ID   | Descrição                                                                                                                                           | Prioridade    | Deps | Status   |
| ---- | --------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- | ---- | -------- |
| T-26 | Criar logger centralizado `src/shared/utils/logger.js` com pino; substituir todos `console.log/error/warn` em `src/`                                | 🟠 Importante | T-04 | Pendente |
| T-27 | Adicionar `@ts-check` + JSDoc (`@param`, `@returns`) em ≥ 10 arquivos críticos (DB, services, domain)                                               | 🟠 Importante | T-19 | Pendente |
| T-28 | Decompor `handleSingleModelChat` (183 linhas) em subfunções <80 linhas; decompor `getUsageStats` (180 linhas)                                       | 🟡 Moderada   | T-15 | Pendente |
| T-29 | Decompor 5 componentes UI monolíticos (RequestLoggerV2, UsageStats, ProxyLogger, OAuthModal, ProxyConfigModal) em sub-componentes + hooks extraídos | 🟡 Moderada   | —    | Pendente |

---

## FASE 06 — Documentação & Governança

| ID   | Descrição                                                                                                                              | Prioridade  | Deps       | Status   |
| ---- | -------------------------------------------------------------------------------------------------------------------------------------- | ----------- | ---------- | -------- |
| T-30 | Criar diretório `docs/adr/` com template e ≥ 6 ADRs (SQLite, Fallback, OAuth Strategy, JS+JSDoc, Single-Tenant, Translator Registry)   | 🟡 Moderada | T-16, T-27 | Pendente |
| T-31 | Criar `CONTRIBUTING.md` na raiz (6 seções: setup, workflow, standards, testing, PR, architecture) e `.github/PULL_REQUEST_TEMPLATE.md` | 🟡 Moderada | T-26       | Pendente |
| T-32 | Expandir `SECURITY.md` para ≥ 2KB (disclosure, scope, SLA, contact, best practices, limitations)                                       | 🟡 Moderada | T-01       | Pendente |
| T-33 | Padronizar JSDoc em ≥ 80% das funções exportadas em módulos priorizados; ativar ESLint rule `jsdoc/require-jsdoc`                      | 🟢 Menor    | T-27       | Pendente |

---

## FASE 07 — UX & Microinterações

| ID   | Descrição                                                                                                                                           | Prioridade  | Deps | Status   |
| ---- | --------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- | ---- | -------- |
| T-34 | Criar Zustand store `notificationStore.js` e componente `NotificationToast.js` com 4 tipos (success, error, warning, info); integrar no layout root | 🟡 Moderada | T-29 | Pendente |
| T-35 | Executar auditoria a11y com axe-core em 4 páginas; corrigir: `role="dialog"`, focus trap, `aria-label`, contraste WCAG AA                           | 🟡 Moderada | T-29 | Pendente |
| T-36 | Criar componente `Breadcrumbs.js` com mapeamento de paths para labels amigáveis e integrar no layout do dashboard                                   | 🟡 Moderada | —    | Pendente |
| T-37 | Criar componente `EmptyState.js` e implementar em 4 seções (Providers, Combos, Usage, Request Logger)                                               | 🟡 Moderada | —    | Pendente |
| T-38 | Implementar reset de senha via CLI (`npx omniroute reset-password`) e documentar no README e login page                                             | 🟡 Moderada | T-01 | Pendente |
| T-39 | Criar testes Playwright de responsividade (viewport 375px e 768px) para Login, Dashboard, Providers, Settings                                       | 🟢 Menor    | T-14 | Pendente |

---

## FASE 08 — LLM Proxy: Recursos Avançados

| ID   | Descrição                                                                                                                                                    | Prioridade    | Deps       | Status   |
| ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------- | ---------- | -------- |
| T-40 | Criar Policy Engine declarativo `src/lib/policies/policyEngine.js` com 3 tipos (routing, budget, access); API CRUD e tela no dashboard                       | 🟡 Moderada   | T-19, T-24 | Pendente |
| T-41 | Implementar cache layer LRU `src/lib/cacheLayer.js` com hash key, TTL configurável, bypass via `x-no-cache`, e endpoint `/api/cache/stats`                   | 🟠 Importante | T-25       | Pendente |
| T-42 | Criar framework de evals `src/lib/evals/evalRunner.js` com golden set (≥10 cases), endpoints trigger/results, e scorecard no dashboard                       | 🟡 Moderada   | T-22       | Pendente |
| T-43 | Implementar controles de compliance: `LOG_RETENTION_DAYS` com limpeza automática, opt-out `noLog` por API key, tabela `audit_log` para ações administrativas | 🟡 Moderada   | T-15       | Pendente |

---

## FASE 09 — Hardening de Fluxo Ponta a Ponta

| ID   | Descrição                                                                                                                                                          | Prioridade  | Deps       | Status   |
| ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------- | ---------- | -------- |
| T-44 | Criar `StreamTracker` em `src/sse/services/streamState.js` com 6 estados (INITIALIZED→CANCELLED); integrar no pipeline SSE e expor via `/api/streams/active`       | 🟡 Moderada | T-23       | Pendente |
| T-45 | Criar `RequestTelemetry` em `src/shared/utils/requestTelemetry.js` medindo 7 fases; armazenar timings no call log e expor p50/p95/p99 via `/api/telemetry/summary` | 🟡 Moderada | T-23, T-15 | Pendente |
| T-46 | Extrair regras de negócio residuais de `handleChat` para domain layer (`lockoutPolicy.js`, `comboResolver.js`); refatorar handler para <50 linhas                  | 🟡 Moderada | T-19, T-28 | Pendente |

---

## Resumo por Prioridade

| Prioridade    | Tarefas | IDs                                                                                                              |
| ------------- | ------- | ---------------------------------------------------------------------------------------------------------------- |
| 🔴 Crítica    | 11      | T-01, T-02, T-03, T-04, T-05, T-06, T-09, T-10, T-11, T-12, T-18                                                 |
| 🟠 Importante | 12      | T-13, T-14, T-15, T-16, T-17, T-21, T-23, T-24, T-25, T-26, T-27, T-41                                           |
| 🟡 Moderada   | 19      | T-07, T-19, T-22, T-28, T-29, T-30, T-31, T-32, T-34, T-35, T-36, T-37, T-38, T-40, T-42, T-43, T-44, T-45, T-46 |
| 🟢 Menor      | 4       | T-08, T-20, T-33, T-39                                                                                           |

## Sugestão de Ordem de Execução

> **Regra:** Sempre executar tarefas cujas dependências (`Deps`) estejam com status `Concluído`.

**Caminho crítico:** T-01 → T-02 → T-03 → T-10 → T-11 → T-12 → T-15 → T-16 → T-17 → T-18 → T-19 → T-24 → T-40
