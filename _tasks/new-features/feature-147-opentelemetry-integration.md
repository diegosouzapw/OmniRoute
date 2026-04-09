# Feature 147 — OpenTelemetry Integration

## Resumo

Integrar OpenTelemetry (OTEL) no OmniRoute para observabilidade distribuída completa: traces de cada requisição end-to-end, métricas de latência/custo/tokens agregadas, e export para backends como Jaeger, Datadog, Grafana Cloud.

## Motivação

O LiteLLM integra OpenTelemetry nativamente como callback de logging, permitindo que cada requisição gere spans com metadata completo (modelo, provider, tokens, custo, latência). O OmniRoute tem `proxyLogger.js` e `usageAnalytics.js` para logging local, mas sem suporte a tracing distribuído. Isso impossibilita:

- Visualizar a jornada completa de uma requisição (auth → routing → upstream → response)
- Agregar métricas em dashboards como Grafana
- Correlacionar erros entre componentes

## O que ganhamos

- **Tracing completo**: Cada requisição como trace com spans por etapa
- **Métricas padronizadas**: Latência P50/P90/P99, tokens, custos via OTEL Metrics
- **Dashboards prontos**: Export para Grafana, Datadog, New Relic, etc.
- **Debug avançado**: Encontrar bottlenecks e falhas com trace waterfall
- **Padrão da indústria**: OTEL é o padrão universal de observabilidade

## Situação Atual (Antes)

```
Requisição falha em produção:
  → Log: "[ERROR] Request failed: 502"
  → Não sabe: qual provider? Quanto demorou o auth? O routing? A conexão upstream?
  → Debug manual: ler logs sequenciais, correlacionar timestamps
  → Sem métricas agregadas de P99 latency ou error rate
```

## Situação Proposta (Depois)

```
Requisição falha em produção:
  → Trace ID: abc123
  → Spans:
    [0-2ms]   auth ✓ (JWT validation)
    [2-5ms]   routing ✓ (combo resolver → selected cc-01)
    [5-8ms]   guardrails ✓ (PII masker, content mod)
    [8-508ms] upstream ✗ (cc-01 → 502 Bad Gateway, timeout)
    [508-510ms] fallback ✓ (selected ag-02)
    [510-850ms] upstream ✓ (ag-02 → 200 OK, 120 tokens)
    [850-852ms] cost recording ✓ ($0.001)
  → Total: 852ms, cost: $0.001, model: claude-sonnet-4.5
  → Dashboard: P99 latency spiked at 14:30 due to cc-01 issues

Métricas OTEL:
  omniroute.request.duration (histogram)
  omniroute.request.tokens.input (counter)
  omniroute.request.tokens.output (counter)
  omniroute.request.cost (counter)
  omniroute.request.errors (counter by type)
  omniroute.provider.latency (histogram by provider)
```

## Especificação Técnica

### Setup do OTEL SDK

```javascript
// src/lib/telemetry/otel.js

import { NodeSDK } from "@opentelemetry/sdk-node";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";
import { OTLPMetricExporter } from "@opentelemetry/exporter-metrics-otlp-http";
import { PeriodicExportingMetricReader } from "@opentelemetry/sdk-metrics";
import { Resource } from "@opentelemetry/resources";
import { ATTR_SERVICE_NAME, ATTR_SERVICE_VERSION } from "@opentelemetry/semantic-conventions";

let sdk = null;

export function initTelemetry(options = {}) {
  if (!process.env.OTEL_EXPORTER_OTLP_ENDPOINT) {
    console.log("[OTEL] No OTEL_EXPORTER_OTLP_ENDPOINT configured, telemetry disabled");
    return;
  }

  sdk = new NodeSDK({
    resource: new Resource({
      [ATTR_SERVICE_NAME]: "omniroute",
      [ATTR_SERVICE_VERSION]: process.env.npm_package_version || "0.8.5",
    }),
    traceExporter: new OTLPTraceExporter({
      url: `${process.env.OTEL_EXPORTER_OTLP_ENDPOINT}/v1/traces`,
    }),
    metricReader: new PeriodicExportingMetricReader({
      exporter: new OTLPMetricExporter({
        url: `${process.env.OTEL_EXPORTER_OTLP_ENDPOINT}/v1/metrics`,
      }),
      exportIntervalMillis: 60_000,
    }),
  });

  sdk.start();
  console.log("[OTEL] Telemetry initialized");
}

export function shutdownTelemetry() {
  return sdk?.shutdown();
}
```

### Request Tracer

```javascript
// src/lib/telemetry/tracer.js

import { trace, SpanStatusCode, metrics } from "@opentelemetry/api";

const tracer = trace.getTracer("omniroute");
const meter = metrics.getMeter("omniroute");

// Métricas
const requestDuration = meter.createHistogram("omniroute.request.duration", {
  description: "Request duration in milliseconds",
  unit: "ms",
});
const tokensIn = meter.createCounter("omniroute.tokens.input");
const tokensOut = meter.createCounter("omniroute.tokens.output");
const requestCost = meter.createCounter("omniroute.request.cost");
const requestErrors = meter.createCounter("omniroute.request.errors");

/**
 * Wrap uma operação num span OTEL.
 */
export async function withSpan(name, attributes, fn) {
  return tracer.startActiveSpan(name, { attributes }, async (span) => {
    try {
      const result = await fn(span);
      span.setStatus({ code: SpanStatusCode.OK });
      return result;
    } catch (err) {
      span.setStatus({ code: SpanStatusCode.ERROR, message: err.message });
      span.recordException(err);
      throw err;
    } finally {
      span.end();
    }
  });
}

/**
 * Registrar métricas de uma requisição completa.
 */
export function recordRequestMetrics({
  durationMs,
  model,
  provider,
  inputTokens,
  outputTokens,
  cost,
  error,
}) {
  const labels = { model, provider };

  requestDuration.record(durationMs, labels);
  tokensIn.add(inputTokens || 0, labels);
  tokensOut.add(outputTokens || 0, labels);
  requestCost.add(cost || 0, labels);

  if (error) {
    requestErrors.add(1, { ...labels, error_type: error });
  }
}
```

### Integração no SSE Handler

```javascript
// Em src/sse/handlers/chat.js
import { withSpan, recordRequestMetrics } from "../../lib/telemetry/tracer.js";

export async function handleChat(req) {
  return withSpan("omniroute.chat", { "http.method": "POST" }, async (span) => {
    // Auth span
    const authResult = await withSpan("omniroute.auth", {}, async () => {
      return validateAuth(req);
    });

    span.setAttribute("omniroute.model", model);
    span.setAttribute("omniroute.provider", provider);

    // Routing span
    const route = await withSpan("omniroute.routing", {}, async () => {
      return resolveComboModel(combo, context);
    });

    // Upstream span
    const response = await withSpan(
      "omniroute.upstream",
      {
        "omniroute.provider": route.provider,
      },
      async (upstreamSpan) => {
        return fetchUpstream(route);
      }
    );

    // Record metrics
    recordRequestMetrics({
      durationMs: Date.now() - startTime,
      model,
      provider,
      inputTokens: usage.prompt_tokens,
      outputTokens: usage.completion_tokens,
      cost,
    });

    return response;
  });
}
```

## Variáveis de Ambiente

```bash
# .env
OTEL_EXPORTER_OTLP_ENDPOINT=http://localhost:4318  # Jaeger/Grafana Agent
OTEL_SERVICE_NAME=omniroute                        # Opcional, override
OTEL_TRACES_SAMPLER=parentbased_traceidratio       # Sampling strategy
OTEL_TRACES_SAMPLER_ARG=0.1                        # 10% sampling em produção
```

## Arquivos a Criar/Modificar

| Arquivo                       | Ação                                           |
| ----------------------------- | ---------------------------------------------- |
| `src/lib/telemetry/otel.js`   | **NOVO** — Setup do OTEL SDK                   |
| `src/lib/telemetry/tracer.js` | **NOVO** — Tracer + métricas                   |
| `src/sse/handlers/chat.js`    | **MODIFICAR** — Wrap operações em spans        |
| `src/server-init.js`          | **MODIFICAR** — Inicializar OTEL               |
| `package.json`                | **MODIFICAR** — Dependências @opentelemetry/\* |
| `.env.example`                | **MODIFICAR** — Adicionar vars OTEL\_          |

## Critérios de Aceite

- [ ] Traces gerados para cada requisição com spans por etapa
- [ ] Métricas de duration, tokens, cost, errors exportadas via OTEL
- [ ] Export funcional para OTLP endpoints (Jaeger, Grafana)
- [ ] Desabilitado por default (ativação por OTEL_EXPORTER_OTLP_ENDPOINT)
- [ ] Sampling configurável para controlar volume em produção
- [ ] Zero overhead quando desabilitado

## Referência

- [LiteLLM: litellm/\_service_logger.py](https://github.com/BerriAI/litellm/blob/main/litellm/_service_logger.py) — OTEL integration
- [LiteLLM: proxy/common_request_processing.py](https://github.com/BerriAI/litellm/blob/main/litellm/proxy/common_request_processing.py) — span creation
- [OpenTelemetry JS SDK](https://opentelemetry.io/docs/languages/js/)
