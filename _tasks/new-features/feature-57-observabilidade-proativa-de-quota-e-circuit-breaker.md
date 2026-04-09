# 1. Título da Feature

Feature 24 — Observabilidade Proativa de Quota e Circuit Breaker

## 2. Objetivo

Ampliar observabilidade operacional para quota, fallback, circuit breaker e saúde de providers com métricas e painéis acionáveis para operação proativa.

## 3. Motivação

O projeto já possui componentes fortes (`requestTelemetry`, `circuitBreaker`, `usage`, `resilience routes`), mas ainda falta uma camada consolidada focada em sinais preditivos e correlação operacional de quota/fallback.

## 4. Problema Atual (Antes)

- Métricas relevantes estão distribuídas em múltiplos endpoints e módulos.
- Falta painel orientado a ação para risco de exaustão/circuit open.
- Correlação entre quota baixa e abertura de circuit breaker não é imediata.

### Antes vs Depois

| Dimensão             | Antes       | Depois                              |
| -------------------- | ----------- | ----------------------------------- |
| Visão operacional    | Fragmentada | Consolidada                         |
| Alertas acionáveis   | Limitados   | Baseados em thresholds e tendências |
| Correlação de sinais | Manual      | Semi-automática                     |
| Resposta a incidente | Mais lenta  | Mais rápida                         |

## 5. Estado Futuro (Depois)

Criar pipeline de eventos/métricas para:

- risco de quota,
- trocas de conta preflight,
- estados de circuit breaker,
- saturação de fallback.

Expor no dashboard e APIs internas para diagnóstico rápido.

## 6. O que Ganhamos

- Detecção antecipada de degradação.
- Menor MTTR em incidentes de provider.
- Melhor qualidade de decisão para rollout de features de resiliência.

## 7. Escopo

- Consolidar métricas em endpoint de resumo operacional.
- Painel em dashboard com sinais de risco por provider/account.
- Regras de alerta com thresholds configuráveis.

## 8. Fora de Escopo

- Integração com sistemas externos de observabilidade (Datadog/Prometheus) nesta fase.
- Alertas por e-mail/Slack automatizados.

## 9. Arquitetura Proposta

```mermaid
flowchart LR
  A[Request lifecycle] --> B[Telemetry events]
  C[Quota monitor/preflight] --> B
  D[Circuit breaker transitions] --> B
  B --> E[Aggregation service]
  E --> F[/api/telemetry/summary]
  E --> G[Dashboard Resilience + Usage]
```

## 10. Mudanças Técnicas Detalhadas

Arquivos de referência:

- `src/shared/utils/requestTelemetry.js`
- `src/shared/utils/circuitBreaker.js`
- `open-sse/services/usage.js`
- `src/app/api/telemetry/summary/route.js`
- `src/app/api/resilience/route.js`
- `src/app/(dashboard)/dashboard/usage/components/RateLimitStatus.js`
- `src/lib/db/domainState.js`

Exemplo de evento:

```json
{
  "eventType": "quota_risk",
  "provider": "antigravity",
  "connectionId": "abc123",
  "quotaPercent": 4.8,
  "threshold": 5,
  "timestamp": "2026-02-16T18:00:00Z"
}
```

## 11. Impacto em APIs Públicas / Interfaces / Tipos

- APIs novas (internas): extensão de `GET /api/telemetry/summary` para quota/circuit/fallback.
- APIs alteradas: possíveis campos adicionais em `GET /api/resilience`.
- Tipos/interfaces: novos tipos de evento/indicador (`QuotaRiskEvent`, `CircuitStateSnapshot`).
- Compatibilidade: **non-breaking** (adição de campos).
- Estratégia de transição: rollout gradual por feature flag e fallback para comportamento anterior quando aplicável.
- Registro explícito: sem impacto em API pública externa (`/v1/*`); mudanças aditivas em telemetria interna.

## 12. Passo a Passo de Implementação Futura

1. Definir taxonomia de eventos operacionais.
2. Instrumentar pontos críticos (preflight, monitor, circuit transitions).
3. Agregar indicadores por provider/account/time-window.
4. Expor payload consolidado em endpoint de summary.
5. Integrar painel de risco no dashboard.
6. Definir thresholds de alerta configuráveis.

## 13. Plano de Testes

Cenários positivos:

1. Dado evento de quota baixa, quando agregado, então resumo mostra risco no provider correto.
2. Dado transição de circuit breaker para OPEN, quando agregado, então painel exibe estado atualizado.
3. Dado normalização de janela temporal, quando consultar summary, então métricas por período batem com eventos.

Cenários de erro:

4. Dado evento malformado, quando agregador processa, então descarta com log e não quebra pipeline.
5. Dado endpoint de summary com falha parcial de fonte, quando chamado, então retorna payload parcial com status claro.

Regressão:

6. Dado endpoint atual de telemetry, quando novos campos são adicionados, então consumidores antigos continuam funcionando.

Compatibilidade retroativa:

7. Dado ambiente sem eventos novos (feature flags desligadas), quando summary é consultado, então payload mínimo permanece válido.

## 14. Critérios de Aceite

- [ ] Given eventos de quota e transições de circuit breaker, When o agregador processa a janela configurada, Then os indicadores aparecem corretamente por provider/account.
- [ ] Given consulta ao `GET /api/telemetry/summary`, When a feature está habilitada, Then o payload retorna métricas acionáveis com latência dentro do SLO definido.
- [ ] Given dashboard operacional com novos cards de saúde, When os dados são renderizados, Then não há regressão visual/funcional nos componentes existentes.
- [ ] Given consumidores antigos dos endpoints de telemetria, When novos campos são adicionados, Then a compatibilidade permanece por adição não breaking.

## 15. Riscos e Mitigações

- Risco: aumento de volume de eventos.
- Mitigação: sampling, agregação por janela e limites de retenção.

- Risco: ruído de alerta.
- Mitigação: hysteresis, deduplicação e thresholds ajustáveis.

## 16. Plano de Rollout

1. Instrumentação com flags de observabilidade.
2. Habilitar coleta em staging com validação de cardinalidade.
3. Habilitar em produção com thresholds conservadores.

## 17. Métricas de Sucesso

- MTTR de incidentes de provider reduzido.
- Tempo para identificar causa raiz (quota vs circuit vs fallback) reduzido.
- Taxa de alertas úteis vs ruído.

## 18. Dependências entre Features

- Consolida sinais de `feature-quota-preflight-e-troca-proativa-02.md`.
- Consolida sinais de `feature-monitoramento-quota-em-sessao-03.md`.
- Complementa `feature-modo-proxy-remoto-local-controlado-10.md`.

## 19. Checklist Final da Feature

- [ ] Taxonomia de eventos definida.
- [ ] Agregador de métricas especificado.
- [ ] Endpoints internos atualizados de forma aditiva.
- [ ] Painel operacional desenhado e validado.
- [ ] Testes cobrindo fluxo normal/erro/regressão/compatibilidade.
