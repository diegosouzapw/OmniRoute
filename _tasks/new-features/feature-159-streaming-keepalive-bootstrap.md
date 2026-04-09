# Feature 41 - Streaming keepalive e bootstrap resiliente

## Resumo executivo

- Feature 41 priorizada como **P1**, com foco em elevar previsibilidade de execução com regras de payload, cache e streaming em /v1/ws.
- A proposta fixa comportamento em contrato, execução e observabilidade, removendo decisões implícitas.
- Parâmetros operacionais são definidos por padrão: `proxy.execution.precedence=credential>provider>global`, `proxy.rules.enabled=true`, `proxy.stream.keepalive_ms=15000`.
- A semântica de erro passa a ser tipada com códigos como `INTERNAL_PROXY_ERROR`, `PAYLOAD_RULE_REJECTED`, `CACHE_BACKEND_UNAVAILABLE`.
- O rollout é faseado com feature flag e gate por erro/latência antes da expansão global.
- O documento descreve implementação por arquivo para execução futura sem lacunas de decisão.

## Problema atual e contexto técnico

Hoje as regras de execução (precedência de proxy, manipulação de payload e cache) variam por caminho de código, o que gera comportamento imprevisível.

A feature impacta diretamente `/v1/ws`. O objetivo técnico fechado é elevar previsibilidade de execução com regras de payload, cache e streaming em /v1/ws.

## Motivação de produto e de engenharia

Produto: respostas mais rápidas e consistentes por conta de regras explícitas de cache, keepalive e manipulação de payload.

Engenharia: define pipeline de execução com precedência explícita e pontos de extensão previsíveis para novas features.

## O que ganhamos

- Menor latência e custo com regras de cache e execução definidas por política.
- Headers padronizados para diagnóstico: `X-Request-Id`.
- Métricas acionáveis para operação: `omniroute_feature_41_requests_total`, `omniroute_feature_41_errors_total`, `omniroute_feature_41_latency_ms`.
- Menor MTTR por erros tipados e rollback previsível por feature flag.

## Antes x Depois

| Dimensão           | Antes                     | Depois                                        |
| ------------------ | ------------------------- | --------------------------------------------- |
| Regras de execução | Comportamentos implícitos | Ordem de precedência definida e testada       |
| Performance        | Sem cache consistente     | Prompt/response cache e keepalive observáveis |
| Operação           | Diagnóstico reativo       | Métricas e alertas orientados por SLO         |

## Escopo (in/out)

**In scope**

- Melhorar confiabilidade do transporte streaming/websocket.
- Adicionar keepalive/recovery com regras seguras.
- Preservar compatibilidade com clientes SSE/WS.

**Out of scope**

- Substituir SSE por WS como padrão obrigatório.
- Replay completo de stream interrompido em qualquer ponto.

## Impacto em APIs, interfaces e tipos

**Endpoints e superfícies impactadas**

- `/v1/chat/completions` (stream)
- `/v1/responses` (stream)
- `/v1/ws`

**Interfaces/tipos**

- Campos novos devem iniciar como opcionais para evitar breaking change imediato.
- Mudanças de shape precisam refletir em `docs/openapi.yaml` e testes de contrato.
- Erros devem preservar semântica HTTP e incluir código estruturado quando aplicável.

## Desenho técnico proposto

- Definir contrato interno imutável (input normalizado -> decisão -> output) para evitar lógica condicional espalhada.
- Concentrar regras em `open-sse/handlers/sseParser.js` e utilitários compartilhados em `open-sse/utils/stream.js` para reduzir divergência entre rotas.
- Adaptar a borda HTTP em `open-sse/handlers/chatCore.js` para expor headers, erros tipados e semântica uniforme.
- Defaults operacionais fixados: `proxy.execution.precedence=credential>provider>global`, `proxy.rules.enabled=true`, `proxy.stream.keepalive_ms=15000`.
- Headers obrigatórios de diagnóstico: `X-Request-Id`.
- Códigos de erro obrigatórios: `INTERNAL_PROXY_ERROR`, `PAYLOAD_RULE_REJECTED`, `CACHE_BACKEND_UNAVAILABLE`.
- Telemetria mínima para gate de rollout: `omniroute_feature_41_requests_total`, `omniroute_feature_41_errors_total`, `omniroute_feature_41_latency_ms`.

## Passo a passo de implementação por arquivo

1. Em `open-sse/handlers/sseParser.js`, introduzir schema/config para a feature com defaults `proxy.execution.precedence=credential>provider>global`, `proxy.rules.enabled=true`, `proxy.stream.keepalive_ms=15000` e validação de tipo/faixa.
2. Em `open-sse/utils/stream.js`, criar/ajustar constantes, enums e helpers para erros tipados (`INTERNAL_PROXY_ERROR`, `PAYLOAD_RULE_REJECTED`, `CACHE_BACKEND_UNAVAILABLE`).
3. Em `open-sse/handlers/chatCore.js`, integrar a regra no fluxo principal, incluindo headers de diagnóstico e propagação correta de status HTTP.
4. Em `src/sse/services/streamState.js` e `docs/API_REFERENCE.md`, atualizar contrato público, exemplos e matriz de compatibilidade.
5. Em `tests/unit/semantic-cache.test.mjs` (unitário) e `tests/unit/context-manager.test.mjs` (integração/contrato), cobrir caminho feliz, erro tipado e regressão do fluxo legado.
6. Publicar dashboard/alertas da feature, habilitar por flag em canário e promover após atingir os gates definidos.

## Regras de compatibilidade e migração

- Migração aditiva: novos campos e parâmetros entram como opcionais na primeira release.
- Janela de transição recomendada: 2 releases menores com compatibilidade backward.
- Quando houver quebra inevitável, publicar `deprecation` em resposta e changelog com data de corte.
- Garantir suporte aos defaults documentados (`proxy.execution.precedence=credential>provider>global`, `proxy.rules.enabled=true`) mesmo sem configuração explícita.
- Preservar semântica dos headers legados e adicionar novos headers sem sobrescrever existentes (`X-Request-Id`).
- Erros novos devem coexistir com fallback para códigos genéricos até final da janela (`INTERNAL_PROXY_ERROR`, `PAYLOAD_RULE_REJECTED`).

## Segurança, abuso e compliance

- Não registrar tokens, API keys, cookies, refresh tokens ou payloads sensíveis em logs.
- Validar entrada com schema estrito antes de alcançar camada de execução do provider.
- Propagar `requestId` em todo o fluxo para rastreabilidade e auditoria.

## Observabilidade (logs, métricas, alertas)

- Instrumentar métricas obrigatórias: `omniroute_feature_41_requests_total`, `omniroute_feature_41_errors_total`, `omniroute_feature_41_latency_ms`.
- Criar painéis com cortes por provider, modelo, rota e tipo de erro.
- Log estruturado mínimo: `requestId`, `featureId`, `provider`, `model`, `status`, `errorCode`, `X-Request-Id`.
- Alertas recomendados: erro > 2% por 5 min, p95 latência +30% por 10 min, aumento súbito de fallback/retry.
- Registrar evento de ativação/desativação da feature flag para correlação de incidentes.

## Plano de rollout (faseado + rollback)

1. Fase 0 (dark launch): código ativo com decisão em modo sombra e logs comparativos.
2. Fase 1 (canário 5%): habilitar por workspace/control plane e validar semântica de erro/headers.
3. Gate para avançar: `omniroute_feature_41_errors_total` <= baseline + 1% e `omniroute_feature_41_latency_ms` <= baseline + 15% por 24h.
4. Fase 2 (25% -> 50%): ampliar gradualmente com monitoramento contínuo e freeze de mudanças paralelas.
5. Fase 3 (100%): remover fallback temporário somente após 2 ciclos estáveis.
6. Rollback: desativar feature flag, invalidar cache relacionado (se houver) e manter telemetria de causa-raiz.

## Plano de testes (unitário, integração, contrato, regressão)

- Unitário: validar regras internas e normalização de entradas no arquivo `tests/unit/semantic-cache.test.mjs`.
- Integração: exercer fluxo completo das rotas `/v1/ws` em `tests/unit/context-manager.test.mjs` com mocks realistas de upstream.
- Contrato: garantir status/headers/body e códigos de erro (`INTERNAL_PROXY_ERROR`, `PAYLOAD_RULE_REJECTED`, `CACHE_BACKEND_UNAVAILABLE`) em fixtures versionadas.
- Regressão e2e: assegurar não quebra de comportamento existente em `tests/unit/idempotency.test.mjs`.
- Testes negativos: timeout, upstream 429/5xx, credencial inválida, payload incompleto e falha de rede.

## Critérios de aceite

- Contrato atualizado em `docs/openapi.yaml` e `docs/API_REFERENCE.md`, incluindo exemplos de `X-Request-Id`.
- Erros tipados entregues e documentados, cobrindo ao menos `INTERNAL_PROXY_ERROR`, `PAYLOAD_RULE_REJECTED`, `CACHE_BACKEND_UNAVAILABLE`.
- Cobertura de testes: unitário + integração + contrato + regressão para caminho feliz e falhas críticas.
- Observabilidade ativa com métricas `omniroute_feature_41_requests_total`, `omniroute_feature_41_errors_total`, `omniroute_feature_41_latency_ms` e alertas configurados.
- Rollout concluído com canário aprovado e rollback validado em ambiente de teste.

## Riscos, trade-offs e mitigação

- Risco: aumento inicial de complexidade por formalização de regras e contratos.
- Mitigação: implementação incremental por flag, com documentação e testes de contrato no mesmo PR.
- Risco: regressão em caminhos legados pouco exercitados.
- Mitigação: suite de regressão obrigatória antes de cada promoção de fase.
- Trade-off: cache melhora latência/custo, mas pode entregar dado antigo; controlar por TTL curto e invalidação explícita.

## Estimativa de esforço

- Complexidade estimada: **Média (2-4 dias)**.
- Estratégia recomendada: 2-4 PRs pequenos (contrato, implementação, testes, rollout).
- Pré-requisitos: flags prontas, telemetria mínima e plano de rollback validado.

## Referências de código

- `open-sse/handlers/sseParser.js`
- `open-sse/utils/stream.js`
- `open-sse/handlers/chatCore.js`
- `src/sse/services/streamState.js`
- `open-sse/config/constants.js`
- `src/app/api/v1/route.js`
- `open-sse/config/providerRegistry.js`
- `docs/openapi.yaml`

## Notas herdadas

**Documentos legados consolidados neste canônico**

- `docs/new_features/feature-115-streaming-keepalive.md`

**Nota:** conteúdos equivalentes foram deduplicados por capability para evitar sobreposição e retrabalho no desenvolvimento futuro.
