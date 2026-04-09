# Feature 137 — Lowest Latency Routing Strategy

## Resumo

Adicionar uma nova estratégia de roteamento ao `comboResolver.js` que seleciona o deployment com a menor latência média observada. Para requisições streaming, priorizar o **Time to First Token (TTFT)** em vez da latência total.

## Motivação

O LiteLLM em `router_strategy/lowest_latency.py` (618 linhas) implementa um sistema sofisticado que rastreia latência por deployment com sliding window, TTFT para streaming, TPM/RPM por minuto, e buffer para evitar "flapping" entre deployments similares. O OmniRoute tem telemetria (`requestTelemetry.js`) mas não a usa para decisões de roteamento.

## O que ganhamos

- **Resposta mais rápida**: Automaticamente rota para o provider mais rápido no momento
- **Adaptação dinâmica**: Se um provider fica lento, tráfego migra automaticamente
- **Streaming otimizado**: TTFT é a métrica que mais importa para UX de streaming
- **Resiliência**: Timeouts são penalizados com 1000ms, removendo providers lentos

## Situação Atual (Antes)

```
Combo "claude-sonnet" → strategy: "priority"
  Providers: [cc (40ms avg), ag (120ms avg), anthropic (80ms avg)]

  → Sempre usa cc (primeiro da lista), mesmo se ag tiver TTFT melhor
  → Se cc tem um pico de latência (ex: 500ms), continua enviando para cc
  → Sem dados de performance para tomar decisão
```

## Situação Proposta (Depois)

```
Combo "claude-sonnet" → strategy: "lowest-latency"
  Providers: [cc, ag, anthropic]

  Latências rastreadas (últimas 10 requisições):
    cc:        avg=40ms, ttft=25ms
    ag:        avg=120ms, ttft=15ms  ← melhor TTFT!
    anthropic: avg=80ms, ttft=60ms

  → Streaming: roteia para ag (melhor TTFT)
  → Non-streaming: roteia para cc (melhor latência total)
  → cc tem timeout → penalidade de 1000ms → próx. request vai para anthropic
  → Buffer de 10%: se cc=40ms e anthropic=42ms, ambos elegíveis (random)
```

## Especificação Técnica

### Latency Tracker

```javascript
// src/domain/latencyTracker.js

const DEFAULT_TTL_MS = 3600_000; // 1 hora
const MAX_SAMPLES = 10;
const TIMEOUT_PENALTY_MS = 1000;
const LATENCY_BUFFER = 0.1; // 10%

class LatencyTracker {
  constructor() {
    this.data = new Map(); // deploymentId -> { latencies: [], ttft: [], tpm: {}, rpm: {} }
  }

  /**
   * Registar sucesso com métricas de latência.
   */
  recordSuccess(deploymentId, { latencyMs, ttftMs = null, totalTokens = 0, completionTokens = 0 }) {
    const entry = this._getOrCreate(deploymentId);

    // Latência normalizada por token (mais justo para comparação)
    const normalized = completionTokens > 0 ? latencyMs / completionTokens : latencyMs;
    entry.latencies = this._appendCapped(entry.latencies, normalized);

    if (ttftMs !== null) {
      const ttftNorm = completionTokens > 0 ? ttftMs / completionTokens : ttftMs;
      entry.ttft = this._appendCapped(entry.ttft, ttftNorm);
    }

    // TPM/RPM tracking por minuto
    const minuteKey = this._minuteKey();
    entry.minutes[minuteKey] = entry.minutes[minuteKey] || { tpm: 0, rpm: 0 };
    entry.minutes[minuteKey].tpm += totalTokens;
    entry.minutes[minuteKey].rpm += 1;

    entry.lastSuccess = Date.now();
  }

  /**
   * Registrar falha com penalidade.
   */
  recordFailure(deploymentId, isTimeout = false) {
    const entry = this._getOrCreate(deploymentId);
    if (isTimeout) {
      entry.latencies = this._appendCapped(entry.latencies, TIMEOUT_PENALTY_MS);
    }
  }

  /**
   * Selecionar o melhor deployment baseado em latência.
   */
  getBestDeployment(candidates, isStreaming = false) {
    if (candidates.length === 0) return null;
    if (candidates.length === 1) return candidates[0];

    const scored = candidates.map((d) => {
      const entry = this.data.get(d.id || d.connectionId);
      if (!entry) return { deployment: d, avgLatency: 0 }; // Nunca testado, prioridade

      const samples = isStreaming && entry.ttft.length > 0 ? entry.ttft : entry.latencies;
      const avg = samples.length > 0 ? samples.reduce((a, b) => a + b, 0) / samples.length : 0;

      return { deployment: d, avgLatency: avg };
    });

    // Priorizar deployments nunca testados (exploração)
    const untested = scored.filter((s) => s.avgLatency === 0);
    if (untested.length > 0) {
      return untested[Math.floor(Math.random() * untested.length)].deployment;
    }

    // Ordenar por latência
    scored.sort((a, b) => a.avgLatency - b.avgLatency);

    // Buffer: selecionar aleatoriamente entre deployments dentro de 10% do melhor
    const bestLatency = scored[0].avgLatency;
    const buffer = bestLatency * LATENCY_BUFFER;
    const eligible = scored.filter((s) => s.avgLatency <= bestLatency + buffer);

    return eligible[Math.floor(Math.random() * eligible.length)].deployment;
  }

  // ── Internals ──

  _getOrCreate(id) {
    if (!this.data.has(id)) {
      this.data.set(id, { latencies: [], ttft: [], minutes: {}, lastSuccess: 0 });
    }
    return this.data.get(id);
  }

  _appendCapped(arr, value) {
    return [...arr.slice(-(MAX_SAMPLES - 1)), value];
  }

  _minuteKey() {
    const d = new Date();
    return `${d.getUTCFullYear()}-${d.getUTCMonth()}-${d.getUTCDate()}-${d.getUTCHours()}-${d.getUTCMinutes()}`;
  }
}

export const latencyTracker = new LatencyTracker();
```

### Integração com comboResolver.js

```javascript
// Adicionar case 'lowest-latency' ao switch em resolveComboModel()

case 'lowest-latency': {
  const best = latencyTracker.getBestDeployment(
    normalized.map((m, i) => ({ ...m, id: m.model, index: i })),
    context.isStreaming || false
  );
  return { model: best.model, index: best.index };
}
```

### Coleta de Métricas no SSE Handler

```javascript
// Em handleSingleModelChat — após resposta bem-sucedida
import { latencyTracker } from "../../domain/latencyTracker.js";

// Após receber resposta
latencyTracker.recordSuccess(connectionId, {
  latencyMs: Date.now() - startTime,
  ttftMs: firstTokenTime ? firstTokenTime - startTime : null,
  totalTokens: usage?.total_tokens || 0,
  completionTokens: usage?.completion_tokens || 0,
});

// Em caso de erro
latencyTracker.recordFailure(connectionId, error instanceof TimeoutError);
```

## Arquivos a Criar/Modificar

| Arquivo                        | Ação                                                     |
| ------------------------------ | -------------------------------------------------------- |
| `src/domain/latencyTracker.js` | **NOVO** — Rastreamento de latência por deployment       |
| `src/domain/comboResolver.js`  | **MODIFICAR** — Adicionar strategy `lowest-latency`      |
| `src/sse/handlers/chat.js`     | **MODIFICAR** — Coletar métricas de latência e TTFT      |
| `src/domain/types.js`          | **MODIFICAR** — Adicionar `lowest-latency` às strategies |

## Critérios de Aceite

- [ ] Strategy `lowest-latency` seleciona deployment com menor latência média
- [ ] Para streaming, usa TTFT em vez de latência total
- [ ] Deployments nunca testados recebem prioridade (exploração)
- [ ] Buffer de 10% evita "flapping" entre deployments similares
- [ ] Timeout penalizado com 1000ms na média
- [ ] Sliding window de 10 amostras (mais recentes)
- [ ] TPM/RPM por minuto rastreados para futura integração

## Referência

- [LiteLLM: router_strategy/lowest_latency.py](https://github.com/BerriAI/litellm/blob/main/litellm/router_strategy/lowest_latency.py) — 618 linhas, implementação completa com DualCache
