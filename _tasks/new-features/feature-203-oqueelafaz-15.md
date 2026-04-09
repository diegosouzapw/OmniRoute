# Feature OQueElaFaz 15 — Observabilidade OpenTelemetry e SLOs de Proxy

**Origem:** gap de observabilidade comparado ao LiteLLM  
**Prioridade:** P2  
**Impacto esperado:** diagnóstico rápido, operação orientada a SLO e melhor capacity planning

---

## O que ela faz

Adiciona instrumentação OpenTelemetry para traces, métricas e logs correlacionados do pipeline de proxy.

Sinais principais:

- `request_count`, `error_rate`
- `latency_p50/p95/p99`, `ttft`
- `retry_count`, `fallback_rate`
- custo por provider/modelo

---

## Motivação

Sem telemetria padronizada fica difícil identificar gargalo por provider, endpoint e estratégia de roteamento.

---

## O que ganhamos

1. RCA mais rápido em incidentes
2. Visibilidade de performance por componente
3. Gestão de SLO baseada em dados

---

## Antes e Depois

## Antes

- logs úteis, porém sem correlação distribuída completa
- pouca visão de série temporal por dimensões técnicas

## Depois

- tracing fim a fim com `trace_id`
- dashboards e alertas de SLO por endpoint/provider

---

## Como fazer (passo a passo)

1. Definir SDK OTel no bootstrap do servidor.
2. Instrumentar handlers/executors com spans nomeados.
3. Exportar métricas para backend escolhido (Prometheus/OTLP).
4. Criar painéis de operação e alertas críticos.
5. Definir SLO inicial (ex.: disponibilidade e latência).

---

## Arquivos-alvo sugeridos

- `src/lib/observability/otel.js`
- `open-sse/handlers/*`
- `open-sse/executors/*`
- `src/lib/proxyLogger.js`
- `docs/TROUBLESHOOTING.md`

---

## Critérios de aceite

- traces disponíveis com correlação request->upstream.
- métricas mínimas publicadas por endpoint/provider.
- alertas básicos de erro e latência configurados.

---

## Riscos e mitigação

| Risco                       | Mitigação                         |
| --------------------------- | --------------------------------- |
| custo de cardinalidade alta | limitar labels e aplicar sampling |
| overhead de instrumentação  | profiling e ajuste de sample rate |

---

## Métricas de sucesso

- MTTR de incidentes
- cobertura de traces em requests críticos
- aderência aos SLOs definidos
