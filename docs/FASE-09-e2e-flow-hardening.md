# FASE 09 — Hardening de Fluxo Ponta a Ponta

> **Prioridade:** 🟡 Moderado / 🟢 Menor  
> **Estimativa de Complexidade:** Média (3–5 dias)  
> **Dimensões do Relatório:** D9 (Fluxo Ponta a Ponta)  
> **Dependências:** FASE-04 (correlation ID e error codes), FASE-08 (policy engine e cache)

---

## Objetivo

Endurecer o fluxo completo de requisição (request lifecycle), adicionando state tracking para streams, telemetria por etapa, e extraindo regras de negócio residuais dos controllers para domain services.

---

## Escopo Detalhado

### 9.1 — State Machine para Streams SSE

**Origem no relatório:** D9 — Sem State Machine para Processos Longos (🟠 Importante)

#### Especificação Técnica

- **Criar** `src/sse/services/streamState.js`:

  ```javascript
  export const STREAM_STATES = {
    INITIALIZED: "initialized",
    CONNECTING: "connecting",
    STREAMING: "streaming",
    COMPLETED: "completed",
    FAILED: "failed",
    CANCELLED: "cancelled",
  };

  export class StreamTracker {
    constructor(requestId) {
      this.requestId = requestId;
      this.state = STREAM_STATES.INITIALIZED;
      this.transitions = [];
    }
    transition(newState, metadata = {}) {
      this.transitions.push({ from: this.state, to: newState, at: Date.now(), ...metadata });
      this.state = newState;
    }
  }
  ```

- **Integrar** no pipeline de streaming em `handleSingleModelChat`:
  - `INITIALIZED` → `CONNECTING` (antes do fetch).
  - `CONNECTING` → `STREAMING` (primeiro chunk recebido).
  - `STREAMING` → `COMPLETED` (stream finalizado).
  - `STREAMING` → `FAILED` (erro durante stream).
  - Qualquer → `CANCELLED` (client disconnect).
- **Logar** transições de estado com requestId.
- **Expor** estado ativo via endpoint `/api/streams/active`.

#### Critérios de Aceite

- [ ] Cada stream tem tracking de estado explícito.
- [ ] Transições são logadas.
- [ ] Endpoint mostra streams ativos e seus estados.
- [ ] Client disconnect detectado e marcado como CANCELLED.

---

### 9.2 — Telemetria por Etapa do Request Pipeline

**Origem no relatório:** D9 — Telemetria por Jornada Ausente (🟡 Moderado)

#### Especificação Técnica

- **Criar** `src/shared/utils/requestTelemetry.js`:
  - Metrificação por etapa:
    ```javascript
    export class RequestTelemetry {
      constructor(requestId) {
        this.requestId = requestId;
        this.timings = {};
      }
      startPhase(phase) {
        this.timings[phase] = { start: performance.now() };
      }
      endPhase(phase) {
        this.timings[phase].end = performance.now();
      }
      getSummary() {
        return Object.entries(this.timings).reduce((acc, [k, v]) => {
          acc[k] = v.end - v.start;
          return acc;
        }, {});
      }
    }
    ```
  - Fases medidas:
    1. `parse` — Parse do body e validação.
    2. `model_resolution` — Resolução de modelo/combo.
    3. `credential_selection` — Seleção de conta.
    4. `translation` — Tradução de request.
    5. `provider_fetch` — Fetch para o provider.
    6. `response_translation` — Tradução da resposta.
    7. `total` — End-to-end.
- **Armazenar** telemetria no call log (campo `timings`).
- **Expor** via endpoint `/api/telemetry/summary` — p50, p95, p99 por fase.
- **Exibir** no dashboard (gráfico de latência por fase).

#### Critérios de Aceite

- [ ] Cada request tem telemetria por fase.
- [ ] Call logs armazenam campo `timings`.
- [ ] Endpoint de summary retorna p50/p95/p99.
- [ ] Dashboard exibe gráfico de latência.

---

### 9.3 — Extração de Regras de Negócio Residuais

**Origem no relatório:** D9 — Regra de Negócio em Controller (🟡 Moderado)

#### Especificação Técnica

- **Auditar** `src/sse/handlers/chat.js` para regras de negócio em controller:
  - `isModelAvailable()` → mover para `src/domain/modelAvailability.js` (FASE-03).
  - Lógica de per-model lockout → mover para `src/domain/lockoutPolicy.js`.
  - Lógica de "combo resolution" → mover para `src/domain/comboResolver.js`.
- **Refatorar** handler para ser um "thin controller":
  ```javascript
  // sse/handlers/chat.js — objetivo final
  async function handleChat(request) {
    const body = parseRequest(request);
    const model = comboResolver.resolve(body.model);
    const credentials = await credentialService.select(model);
    const translated = translator.translate(body, model.format);
    const response = await providerService.execute(credentials, translated);
    return translator.translateResponse(response, body.format);
  }
  ```
- **Garantir** que cada módulo domain tenha testes unitários.

#### Critérios de Aceite

- [ ] Handler `handleChat` tem < 50 linhas de lógica.
- [ ] ≥ 3 funções extraídas para domain layer.
- [ ] Domain modules testados unitariamente.
- [ ] Nenhuma regra de negócio no handler.

---

## Pré-Requisitos

- FASE-04 (correlation ID para integração com telemetria).
- FASE-03 (domain layer como destino das regras extraídas).
- FASE-08 (policy engine como parte do pipeline).

## Entregáveis

1. Stream state machine com tracking.
2. Telemetria por fase com métricas p50/p95/p99.
3. Handler refatorado como thin controller.

## Critérios de Conclusão da Fase

- [ ] Streams com tracking de estado.
- [ ] Telemetria armazenada e acessível.
- [ ] Handler < 50 linhas de lógica de negócio.

## Riscos Identificados

| Risco                                  | Probabilidade | Impacto | Mitigação                                   |
| -------------------------------------- | ------------- | ------- | ------------------------------------------- |
| Telemetria overhead em high-throughput | Média         | Médio   | Sampling configurável (1%, 10%, 100%)       |
| State machine complexidade adicional   | Baixa         | Baixo   | Implementação minimalista; apenas 6 estados |
| Extração de regras cria regressões     | Média         | Médio   | Testes completos do pipeline antes e depois |
