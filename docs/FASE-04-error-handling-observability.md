# FASE 04 — Error Handling & Observabilidade

> **Prioridade:** 🟠 Importante  
> **Estimativa de Complexidade:** Média (4–6 dias)  
> **Dimensões do Relatório:** D5 (Fluxos Ausentes), D8 (LLM Proxy), D9 (Fluxo Ponta a Ponta)  
> **Dependências:** FASE-01 (logging corrigido), FASE-03 (domain layer para catálogo de erros)

---

## Objetivo

Implementar tratamento de erros consistente ponta a ponta, observabilidade com correlation IDs, padrões de resiliência (circuit breaker), e telas de erro personalizadas para elevar a maturidade operacional do sistema.

---

## Escopo Detalhado

### 4.1 — Telas de Erro Personalizadas (404, 500, 403)

**Origem no relatório:** D5 — Telas de Erro Personalizadas (🟠 Importante)

#### Especificação Técnica

- **Criar** `src/app/not-found.js` — Página 404 com design do sistema:
  - Mensagem amigável: "Página não encontrada".
  - Link para dashboard, search de documentação.
  - Design consistente com tema do dashboard.
- **Criar** `src/app/error.js` — Boundary de erro para erros de runtime:
  - Botão de "Tentar novamente".
  - Informação mínima do erro (sem stacktrace).
  - Logging do erro completo no server.
- **Criar** `src/app/global-error.js` — Fallback de último recurso.

#### Critérios de Aceite

- [ ] Navegação para rota inexistente mostra página 404 customizada.
- [ ] Erro de runtime no dashboard mostra error boundary customizado.
- [ ] Todas as páginas de erro seguem o tema visual do sistema.
- [ ] Testes e2e validam renderização das páginas de erro.

---

### 4.2 — Catálogo de Error Codes Padronizado

**Origem no relatório:** D9 — Tratamento de Erro Genérico (🟡 Moderado)

#### Especificação Técnica

- **Criar** `src/shared/constants/errorCodes.js`:
  ```javascript
  export const ERROR_CODES = {
    PROVIDER_UNAVAILABLE: { code: "OMNIROUTE_PROVIDER_UNAVAILABLE", status: 503 },
    AUTH_FAILED: { code: "OMNIROUTE_AUTH_FAILED", status: 401 },
    RATE_LIMITED: { code: "OMNIROUTE_RATE_LIMITED", status: 429 },
    MODEL_NOT_FOUND: { code: "OMNIROUTE_MODEL_NOT_FOUND", status: 404 },
    INVALID_REQUEST: { code: "OMNIROUTE_INVALID_REQUEST", status: 400 },
    TRANSLATION_ERROR: { code: "OMNIROUTE_TRANSLATION_ERROR", status: 502 },
    TIMEOUT: { code: "OMNIROUTE_TIMEOUT", status: 504 },
    INTERNAL_ERROR: { code: "OMNIROUTE_INTERNAL_ERROR", status: 500 },
  };
  ```
- **Criar** helper `createErrorResponse(errorCode, details)` para respostas padronizadas.
- **Refatorar** handlers SSE e API routes para usar o catálogo.
- **Documentar** todos os error codes no OpenAPI spec (`docs/openapi.yaml`).

#### Critérios de Aceite

- [ ] Todos os erros do proxy retornam formato `{ error: { code, message, details } }`.
- [ ] Error codes documentados no OpenAPI spec.
- [ ] Testes unitários para `createErrorResponse`.

---

### 4.3 — Correlation ID (x-request-id)

**Origem no relatório:** D8 — Observabilidade Limitada (🟠 Importante)

#### Especificação Técnica

- **Criar** middleware `src/shared/utils/requestId.js`:
  - Gerar UUID v4 como `x-request-id` se não presente no request.
  - Propagar em todas as respostas como header.
  - Incluir no logging de pino como campo `requestId`.
- **Integrar** no pipeline:
  - `proxy.js` — adicionar requestId ao contexto.
  - `sse/handlers/chat.js` — propagar requestId para providers upstream.
  - `usageDb.js` / `callLogs` — armazenar requestId.
- **Expor** no dashboard Logger — filtro por requestId.

#### Critérios de Aceite

- [ ] Responses incluem header `x-request-id`.
- [ ] Logs do pino incluem campo `requestId`.
- [ ] Call logs no DB armazenam requestId.
- [ ] Dashboard Logger permite filtro por requestId.

---

### 4.4 — Circuit Breaker Pattern

**Origem no relatório:** D8 — Sem Circuit Breaker (🟠 Importante)

#### Especificação Técnica

- **Implementar** circuit breaker por provider em `src/lib/circuitBreaker.js`:
  - Estados: `CLOSED` → `OPEN` → `HALF_OPEN`.
  - Threshold: 5 falhas consecutivas → OPEN.
  - Timeout: 30 segundos em OPEN → tenta HALF_OPEN.
  - Reset: 1 sucesso em HALF_OPEN → CLOSED.
- **Integrar** em `sse/services/auth.js` antes de `getProviderCredentials()`.
- **Expor** estado dos circuits no dashboard (endpoint `/api/provider-health`).

#### Critérios de Aceite

- [ ] Circuit breaker previne retry storms quando provider está down.
- [ ] Estado OPEN rejeita requests imediatamente com erro `PROVIDER_UNAVAILABLE`.
- [ ] Transição HALF_OPEN testa provider automaticamente.
- [ ] Dashboard mostra estado de cada circuit.

---

### 4.5 — Timeout Padrão Explícito

**Origem no relatório:** D9 — Request Síncrono sem Timeout (🟠 Importante)

#### Especificação Técnica

- **Definir** valores padrão explícitos:
  ```javascript
  const FETCH_TIMEOUT_MS = parseInt(process.env.FETCH_TIMEOUT_MS) || 120_000;
  const STREAM_IDLE_TIMEOUT_MS = parseInt(process.env.STREAM_IDLE_TIMEOUT_MS) || 60_000;
  ```
- **Aplicar** `AbortController` com timeout em todas as `fetch()` para providers.
- **Documentar** valores padrão em `.env.example` (não comentado).

#### Critérios de Aceite

- [ ] Nenhum fetch() para provider sem timeout.
- [ ] Timeout excedido gera erro `OMNIROUTE_TIMEOUT` (do catálogo).
- [ ] Valores padrão documentados e configuráveis via env.

---

## Pré-Requisitos

- FASE-01 (logging correto para erros) e FASE-03 (domain layer onde error codes vivem).

## Entregáveis

1. Páginas de erro customizadas (404, 500, 403).
2. Catálogo de error codes com helper.
3. Middleware de correlation ID.
4. Circuit breaker por provider.
5. Timeouts explícitos em todas as fetch calls.

## Critérios de Conclusão da Fase

- [ ] Todas as respostas de erro seguem formato padronizado.
- [ ] Correlation ID presente em 100% dos responses.
- [ ] Circuit breaker ativo e testado por unit tests.

## Riscos Identificados

| Risco                                                      | Probabilidade | Impacto | Mitigação                                   |
| ---------------------------------------------------------- | ------------- | ------- | ------------------------------------------- |
| Circuit breaker muito agressivo bloqueia providers válidos | Média         | Alto    | Threshold configurável; começar conservador |
| Correlation ID overhead em high-throughput                 | Baixa         | Baixo   | UUID v4 é rápido (~ns)                      |
| Timeout default 120s muito longo para alguns endpoints     | Média         | Médio   | Override por provider config                |
