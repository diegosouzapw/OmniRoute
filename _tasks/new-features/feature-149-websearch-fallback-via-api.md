# Feature 52 - Websearch fallback via API

## Resumo executivo

- Feature 52 priorizada como **P1**, com foco em fortalecer sync, ownership de tokens e discovery dinâmico com rastreabilidade em superfícies de proxy e management.
- A proposta fixa comportamento em contrato, execução e observabilidade, removendo decisões implícitas.
- Parâmetros operacionais são definidos por padrão: `sync.share_code.ttl_seconds=900`, `oauth.pool.ownership_mode=strict`, `antigravity.discovery.interval_ms=180000`.
- A semântica de erro passa a ser tipada com códigos como `INTERNAL_PROXY_ERROR`, `SYNC_TOKEN_INVALID`, `SYNC_CONFLICT`.
- O rollout é faseado com feature flag e gate por erro/latência antes da expansão global.
- O documento descreve implementação por arquivo para execução futura sem lacunas de decisão.

## Problema atual e contexto técnico

Hoje sync/discovery multi-conta depende de reconciliação manual em cenários de conflito, com baixa rastreabilidade de ownership e fallback.

A feature impacta as principais superfícies de proxy e management. O objetivo técnico fechado é fortalecer sync, ownership de tokens e discovery dinâmico com rastreabilidade em superfícies de proxy e management.

## Motivação de produto e de engenharia

Produto: operação multi-ambiente e multi-conta com menos fricção, compartilhamento seguro e rastreável de configurações e ownership.

Engenharia: estrutura fluxo de sync/discovery com estados e erros tipados, permitindo rollback sem perda de consistência.

## O que ganhamos

- Sync multi-ambiente auditável com ownership claro de tokens e configurações.
- Headers padronizados para diagnóstico: `X-Request-Id`, `X-Sync-Version`, `X-Sync-Source`.
- Métricas acionáveis para operação: `omniroute_feature_52_requests_total`, `omniroute_feature_52_errors_total`, `omniroute_feature_52_latency_ms`.
- Menor MTTR por erros tipados e rollback previsível por feature flag.

## Antes x Depois

| Dimensão           | Antes                        | Depois                                               |
| ------------------ | ---------------------------- | ---------------------------------------------------- |
| Sync e ownership   | Conciliação manual de estado | Sync tokenizado com ownership e conflito tipado      |
| Discovery/fallback | Listas estáticas por release | Discovery dinâmico com cadeia de fallback controlada |
| Fallback de busca  | Sem recuperação contextual   | Fallback HTTP controlado com telemetria              |
| Operação           | Diagnóstico reativo          | Métricas e alertas orientados por SLO                |

## Escopo (in/out)

**In scope**

- Fallback para fontes secundárias com governança de custo.
- Padronizar resposta entre fontes alternativas.
- Garantir continuidade funcional em indisponibilidade primária.

**Out of scope**

- Meta-search paralelo de alto custo.
- Garantia de mesma qualidade sem diferenças de provedor.

## Impacto em APIs, interfaces e tipos

**Endpoints e superfícies impactadas**

- Rotas internas que dependem de busca externa/API remota.

**Interfaces/tipos**

- Campos novos devem iniciar como opcionais para evitar breaking change imediato.
- Mudanças de shape precisam refletir em `docs/openapi.yaml` e testes de contrato.
- Erros devem preservar semântica HTTP e incluir código estruturado quando aplicável.

## Desenho técnico proposto

- Definir contrato interno imutável (input normalizado -> decisão -> output) para evitar lógica condicional espalhada.
- Concentrar regras em `src/app/api/providers/test-batch/route.js` e utilitários compartilhados em `src/app/api/providers/validate/route.js` para reduzir divergência entre rotas.
- Adaptar a borda HTTP em `src/lib/cloudSync.js` para expor headers, erros tipados e semântica uniforme.
- Defaults operacionais fixados: `sync.share_code.ttl_seconds=900`, `oauth.pool.ownership_mode=strict`, `antigravity.discovery.interval_ms=180000`, `websearch.fallback.enabled=true`.
- Headers obrigatórios de diagnóstico: `X-Request-Id`, `X-Sync-Version`, `X-Sync-Source`, `X-Websearch-Fallback`.
- Códigos de erro obrigatórios: `INTERNAL_PROXY_ERROR`, `SYNC_TOKEN_INVALID`, `SYNC_CONFLICT`, `WEBSEARCH_UPSTREAM_TIMEOUT`.
- Telemetria mínima para gate de rollout: `omniroute_feature_52_requests_total`, `omniroute_feature_52_errors_total`, `omniroute_feature_52_latency_ms`, `omniroute_feature_52_websearch_fallback_total`.

## Passo a passo de implementação por arquivo

1. Em `src/app/api/providers/test-batch/route.js`, introduzir schema/config para a feature com defaults `sync.share_code.ttl_seconds=900`, `oauth.pool.ownership_mode=strict`, `antigravity.discovery.interval_ms=180000` e validação de tipo/faixa.
2. Em `src/app/api/providers/validate/route.js`, criar/ajustar constantes, enums e helpers para erros tipados (`INTERNAL_PROXY_ERROR`, `SYNC_TOKEN_INVALID`, `SYNC_CONFLICT`).
3. Em `src/lib/cloudSync.js`, integrar a regra no fluxo principal, incluindo headers de diagnóstico e propagação correta de status HTTP.
4. Em `open-sse/config/constants.js` e `docs/API_REFERENCE.md`, atualizar contrato público, exemplos e matriz de compatibilidade.
5. Em `tests/security/test-cloud-sync-and-call.sh` (unitário) e `tests/security/test-cloud-openai-compatible.sh` (integração/contrato), cobrir caminho feliz, erro tipado e regressão do fluxo legado.
6. Publicar dashboard/alertas da feature, habilitar por flag em canário e promover após atingir os gates definidos.

## Regras de compatibilidade e migração

- Migração aditiva: novos campos e parâmetros entram como opcionais na primeira release.
- Janela de transição recomendada: 2 releases menores com compatibilidade backward.
- Quando houver quebra inevitável, publicar `deprecation` em resposta e changelog com data de corte.
- Garantir suporte aos defaults documentados (`sync.share_code.ttl_seconds=900`, `oauth.pool.ownership_mode=strict`) mesmo sem configuração explícita.
- Preservar semântica dos headers legados e adicionar novos headers sem sobrescrever existentes (`X-Request-Id`, `X-Sync-Version`).
- Erros novos devem coexistir com fallback para códigos genéricos até final da janela (`INTERNAL_PROXY_ERROR`, `SYNC_TOKEN_INVALID`).

## Segurança, abuso e compliance

- Não registrar tokens, API keys, cookies, refresh tokens ou payloads sensíveis em logs.
- Validar entrada com schema estrito antes de alcançar camada de execução do provider.
- Propagar `requestId` em todo o fluxo para rastreabilidade e auditoria.

## Observabilidade (logs, métricas, alertas)

- Instrumentar métricas obrigatórias: `omniroute_feature_52_requests_total`, `omniroute_feature_52_errors_total`, `omniroute_feature_52_latency_ms`, `omniroute_feature_52_websearch_fallback_total`.
- Criar painéis com cortes por provider, modelo, rota e tipo de erro.
- Log estruturado mínimo: `requestId`, `featureId`, `provider`, `model`, `status`, `errorCode`, `X-Request-Id`, `X-Sync-Version`, `X-Sync-Source`.
- Alertas recomendados: erro > 2% por 5 min, p95 latência +30% por 10 min, aumento súbito de fallback/retry.
- Registrar evento de ativação/desativação da feature flag para correlação de incidentes.

## Plano de rollout (faseado + rollback)

1. Fase 0 (dark launch): código ativo com decisão em modo sombra e logs comparativos.
2. Fase 1 (canário 5%): habilitar por workspace/control plane e validar semântica de erro/headers.
3. Gate para avançar: `omniroute_feature_52_errors_total` <= baseline + 1% e `omniroute_feature_52_latency_ms` <= baseline + 15% por 24h.
4. Fase 2 (25% -> 50%): ampliar gradualmente com monitoramento contínuo e freeze de mudanças paralelas.
5. Fase 3 (100%): remover fallback temporário somente após 2 ciclos estáveis.
6. Rollback: desativar feature flag, invalidar cache relacionado (se houver) e manter telemetria de causa-raiz.

## Plano de testes (unitário, integração, contrato, regressão)

- Unitário: validar regras internas e normalização de entradas no arquivo `tests/security/test-cloud-sync-and-call.sh`.
- Integração: exercer fluxo completo das rotas `/api/*` em `tests/security/test-cloud-openai-compatible.sh` com mocks realistas de upstream.
- Contrato: garantir status/headers/body e códigos de erro (`INTERNAL_PROXY_ERROR`, `SYNC_TOKEN_INVALID`, `SYNC_CONFLICT`) em fixtures versionadas.
- Regressão e2e: assegurar não quebra de comportamento existente em `tests/unit/domain-persistence.test.mjs`.
- Testes negativos: timeout, upstream 429/5xx, credencial inválida, payload incompleto e falha de rede.

## Critérios de aceite

- Contrato atualizado em `docs/openapi.yaml` e `docs/API_REFERENCE.md`, incluindo exemplos de `X-Request-Id`, `X-Sync-Version`.
- Erros tipados entregues e documentados, cobrindo ao menos `INTERNAL_PROXY_ERROR`, `SYNC_TOKEN_INVALID`, `SYNC_CONFLICT`.
- Cobertura de testes: unitário + integração + contrato + regressão para caminho feliz e falhas críticas.
- Observabilidade ativa com métricas `omniroute_feature_52_requests_total`, `omniroute_feature_52_errors_total`, `omniroute_feature_52_latency_ms` e alertas configurados.
- Rollout concluído com canário aprovado e rollback validado em ambiente de teste.

## Riscos, trade-offs e mitigação

- Risco: aumento inicial de complexidade por formalização de regras e contratos.
- Mitigação: implementação incremental por flag, com documentação e testes de contrato no mesmo PR.
- Risco: regressão em caminhos legados pouco exercitados.
- Mitigação: suite de regressão obrigatória antes de cada promoção de fase.
- Trade-off: ownership estrito reduz conflito, mas exige resolução explícita de disputa; manter fluxo de reconciliação guiado.

## Estimativa de esforço

- Complexidade estimada: **Média (2-4 dias)**.
- Estratégia recomendada: 2-4 PRs pequenos (contrato, implementação, testes, rollout).
- Pré-requisitos: flags prontas, telemetria mínima e plano de rollback validado.

## Referências de código

- `src/app/api/providers/test-batch/route.js`
- `src/app/api/providers/validate/route.js`
- `src/lib/cloudSync.js`
- `open-sse/config/constants.js`
- `src/lib/proxyLogger.js`
- `docs/TROUBLESHOOTING.md`
- `open-sse/config/providerRegistry.js`
- `docs/openapi.yaml`

## Notas herdadas

**Documentos legados consolidados neste canônico**

- `docs/new_features/feature-100-websearch-fallback-via-api.md`

**Nota:** conteúdos equivalentes foram deduplicados por capability para evitar sobreposição e retrabalho no desenvolvimento futuro.
