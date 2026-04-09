# Feature 18 - Monitoramento de quota em tempo real por provider

## Resumo executivo

- Feature 18 priorizada como **P1**, com foco em reduzir falhas transitórias com retry/cooldown/failover determinísticos em /api/monitoring/health, /api/provider-metrics, /api/usage/analytics.
- A proposta fixa comportamento em contrato, execução e observabilidade, removendo decisões implícitas.
- Parâmetros operacionais são definidos por padrão: `routing.retry.max_attempts=2`, `routing.retry.base_delay_ms=250`, `routing.cooldown.default_ttl_ms=30000`.
- A semântica de erro passa a ser tipada com códigos como `INTERNAL_PROXY_ERROR`, `RETRY_EXHAUSTED`, `UPSTREAM_RATE_LIMITED`.
- O rollout é faseado com feature flag e gate por erro/latência antes da expansão global.
- O documento descreve implementação por arquivo para execução futura sem lacunas de decisão.

## Problema atual e contexto técnico

Hoje a resiliência depende de decisões locais em cada fluxo de chamada, resultando em retries cegos, cooldown inconsistente e failover tardio sob pressão de quota.

A feature impacta diretamente `/api/monitoring/health`, `/api/provider-metrics`, `/api/usage/analytics`. O objetivo técnico fechado é reduzir falhas transitórias com retry/cooldown/failover determinísticos em /api/monitoring/health, /api/provider-metrics, /api/usage/analytics.

## Motivação de produto e de engenharia

Produto: menos erros para o usuário final em rajadas e picos, com menor variabilidade de latência percebida sob limitações de upstream.

Engenharia: centraliza decisões de retry/cooldown/failover em serviços reutilizáveis, reduzindo duplicidade e thundering herd.

## O que ganhamos

- Menos falhas por rate limit/quota com comutação proativa e cooldown observável.
- Headers padronizados para diagnóstico: `X-Request-Id`, `Retry-After`, `X-RateLimit-Remaining`.
- Métricas acionáveis para operação: `omniroute_feature_18_requests_total`, `omniroute_feature_18_errors_total`, `omniroute_feature_18_latency_ms`.
- Menor MTTR por erros tipados e rollback previsível por feature flag.

## Antes x Depois

| Dimensão       | Antes                    | Depois                                                    |
| -------------- | ------------------------ | --------------------------------------------------------- |
| Retry/Fallback | Tentativas fixas e cegas | Retry com jitter, cooldown e failover dirigido por estado |
| Quota          | Troca reativa após erro  | Preflight e comutação proativa antes da falha             |
| Operação       | Diagnóstico reativo      | Métricas e alertas orientados por SLO                     |

## Escopo (in/out)

**In scope**

- Melhorar sinalização operacional com métricas e auditoria.
- Aumentar detectabilidade de regressões e degradação.
- Padronizar eventos observáveis para suporte e SRE.

**Out of scope**

- Plataforma completa de APM externa embutida.
- Dashboards custom complexos fora do escopo de API.

## Impacto em APIs, interfaces e tipos

**Endpoints e superfícies impactadas**

- `/api/monitoring/health`
- `/api/provider-metrics`
- `/api/usage/analytics`

**Interfaces/tipos**

- Campos novos devem iniciar como opcionais para evitar breaking change imediato.
- Mudanças de shape precisam refletir em `docs/openapi.yaml` e testes de contrato.
- Erros devem preservar semântica HTTP e incluir código estruturado quando aplicável.

## Desenho técnico proposto

- Definir contrato interno imutável (input normalizado -> decisão -> output) para evitar lógica condicional espalhada.
- Concentrar regras em `src/app/api/monitoring/health/route.js` e utilitários compartilhados em `src/lib/usageAnalytics.js` para reduzir divergência entre rotas.
- Adaptar a borda HTTP em `src/lib/tokenHealthCheck.js` para expor headers, erros tipados e semântica uniforme.
- Defaults operacionais fixados: `routing.retry.max_attempts=2`, `routing.retry.base_delay_ms=250`, `routing.cooldown.default_ttl_ms=30000`, `routing.quota.preflight.enabled=true`.
- Headers obrigatórios de diagnóstico: `X-Request-Id`, `Retry-After`, `X-RateLimit-Remaining`.
- Códigos de erro obrigatórios: `INTERNAL_PROXY_ERROR`, `RETRY_EXHAUSTED`, `UPSTREAM_RATE_LIMITED`, `QUOTA_EXHAUSTED`.
- Telemetria mínima para gate de rollout: `omniroute_feature_18_requests_total`, `omniroute_feature_18_errors_total`, `omniroute_feature_18_latency_ms`, `omniroute_feature_18_quota_switch_total`.

## Passo a passo de implementação por arquivo

1. Em `src/app/api/monitoring/health/route.js`, introduzir schema/config para a feature com defaults `routing.retry.max_attempts=2`, `routing.retry.base_delay_ms=250`, `routing.cooldown.default_ttl_ms=30000` e validação de tipo/faixa.
2. Em `src/lib/usageAnalytics.js`, criar/ajustar constantes, enums e helpers para erros tipados (`INTERNAL_PROXY_ERROR`, `RETRY_EXHAUSTED`, `UPSTREAM_RATE_LIMITED`).
3. Em `src/lib/tokenHealthCheck.js`, integrar a regra no fluxo principal, incluindo headers de diagnóstico e propagação correta de status HTTP.
4. Em `src/lib/proxyLogger.js` e `docs/API_REFERENCE.md`, atualizar contrato público, exemplos e matriz de compatibilidade.
5. Em `tests/unit/account-selector.test.mjs` (unitário) e `tests/unit/thundering-herd.test.mjs` (integração/contrato), cobrir caminho feliz, erro tipado e regressão do fluxo legado.
6. Publicar dashboard/alertas da feature, habilitar por flag em canário e promover após atingir os gates definidos.

## Regras de compatibilidade e migração

- Migração aditiva: novos campos e parâmetros entram como opcionais na primeira release.
- Janela de transição recomendada: 2 releases menores com compatibilidade backward.
- Quando houver quebra inevitável, publicar `deprecation` em resposta e changelog com data de corte.
- Garantir suporte aos defaults documentados (`routing.retry.max_attempts=2`, `routing.retry.base_delay_ms=250`) mesmo sem configuração explícita.
- Preservar semântica dos headers legados e adicionar novos headers sem sobrescrever existentes (`X-Request-Id`, `Retry-After`).
- Erros novos devem coexistir com fallback para códigos genéricos até final da janela (`INTERNAL_PROXY_ERROR`, `RETRY_EXHAUSTED`).

## Segurança, abuso e compliance

- Não registrar tokens, API keys, cookies, refresh tokens ou payloads sensíveis em logs.
- Validar entrada com schema estrito antes de alcançar camada de execução do provider.
- Propagar `requestId` em todo o fluxo para rastreabilidade e auditoria.

## Observabilidade (logs, métricas, alertas)

- Instrumentar métricas obrigatórias: `omniroute_feature_18_requests_total`, `omniroute_feature_18_errors_total`, `omniroute_feature_18_latency_ms`, `omniroute_feature_18_quota_switch_total`.
- Criar painéis com cortes por provider, modelo, rota e tipo de erro.
- Log estruturado mínimo: `requestId`, `featureId`, `provider`, `model`, `status`, `errorCode`, `X-Request-Id`, `Retry-After`, `X-RateLimit-Remaining`.
- Alertas recomendados: erro > 2% por 5 min, p95 latência +30% por 10 min, aumento súbito de fallback/retry.
- Registrar evento de ativação/desativação da feature flag para correlação de incidentes.

## Plano de rollout (faseado + rollback)

1. Fase 0 (dark launch): código ativo com decisão em modo sombra e logs comparativos.
2. Fase 1 (canário 5%): habilitar por workspace/control plane e validar semântica de erro/headers.
3. Gate para avançar: `omniroute_feature_18_errors_total` <= baseline + 1% e `omniroute_feature_18_latency_ms` <= baseline + 15% por 24h.
4. Fase 2 (25% -> 50%): ampliar gradualmente com monitoramento contínuo e freeze de mudanças paralelas.
5. Fase 3 (100%): remover fallback temporário somente após 2 ciclos estáveis.
6. Rollback: desativar feature flag, invalidar cache relacionado (se houver) e manter telemetria de causa-raiz.

## Plano de testes (unitário, integração, contrato, regressão)

- Unitário: validar regras internas e normalização de entradas no arquivo `tests/unit/account-selector.test.mjs`.
- Integração: exercer fluxo completo das rotas `/api/monitoring/health`, `/api/provider-metrics`, `/api/usage/analytics` em `tests/unit/thundering-herd.test.mjs` com mocks realistas de upstream.
- Contrato: garantir status/headers/body e códigos de erro (`INTERNAL_PROXY_ERROR`, `RETRY_EXHAUSTED`, `UPSTREAM_RATE_LIMITED`) em fixtures versionadas.
- Regressão e2e: assegurar não quebra de comportamento existente em `tests/unit/error-classification.test.mjs`.
- Testes negativos: timeout, upstream 429/5xx, credencial inválida, payload incompleto e falha de rede.

## Critérios de aceite

- Contrato atualizado em `docs/openapi.yaml` e `docs/API_REFERENCE.md`, incluindo exemplos de `X-Request-Id`, `Retry-After`.
- Erros tipados entregues e documentados, cobrindo ao menos `INTERNAL_PROXY_ERROR`, `RETRY_EXHAUSTED`, `UPSTREAM_RATE_LIMITED`.
- Cobertura de testes: unitário + integração + contrato + regressão para caminho feliz e falhas críticas.
- Observabilidade ativa com métricas `omniroute_feature_18_requests_total`, `omniroute_feature_18_errors_total`, `omniroute_feature_18_latency_ms` e alertas configurados.
- Rollout concluído com canário aprovado e rollback validado em ambiente de teste.

## Riscos, trade-offs e mitigação

- Risco: aumento inicial de complexidade por formalização de regras e contratos.
- Mitigação: implementação incremental por flag, com documentação e testes de contrato no mesmo PR.
- Risco: regressão em caminhos legados pouco exercitados.
- Mitigação: suite de regressão obrigatória antes de cada promoção de fase.
- Trade-off: retries mais inteligentes reduzem erro, mas podem elevar latência em cenários extremos; limite por budget de tentativa.

## Estimativa de esforço

- Complexidade estimada: **Alta (4-7 dias)**.
- Estratégia recomendada: 2-4 PRs pequenos (contrato, implementação, testes, rollout).
- Pré-requisitos: flags prontas, telemetria mínima e plano de rollback validado.

## Referências de código

- `src/app/api/monitoring/health/route.js`
- `src/lib/usageAnalytics.js`
- `src/lib/tokenHealthCheck.js`
- `src/lib/proxyLogger.js`
- `src/app/api/provider-metrics/route.js`
- `docs/ARCHITECTURE.md`
- `open-sse/config/providerRegistry.js`
- `open-sse/config/constants.js`

## Notas herdadas

**Documentos legados consolidados neste canônico**

- `docs/new_features/feature-87-monitoramento-quota-realtime-por-provider.md`

**Nota:** conteúdos equivalentes foram deduplicados por capability para evitar sobreposição e retrabalho no desenvolvimento futuro.
