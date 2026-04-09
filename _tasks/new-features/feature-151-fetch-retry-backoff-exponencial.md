# Feature 51 - Fetch retry com backoff exponencial

## Resumo executivo

- Feature 51 priorizada como **P1**, com foco em fortalecer sync, ownership de tokens e discovery dinâmico com rastreabilidade em /v1/chat/completions, /v1/responses, /v1/models.
- A proposta fixa comportamento em contrato, execução e observabilidade, removendo decisões implícitas.
- Parâmetros operacionais são definidos por padrão: `sync.share_code.ttl_seconds=900`, `oauth.pool.ownership_mode=strict`, `antigravity.discovery.interval_ms=180000`.
- A semântica de erro passa a ser tipada com códigos como `INTERNAL_PROXY_ERROR`, `SYNC_TOKEN_INVALID`, `SYNC_CONFLICT`.
- O rollout é faseado com feature flag e gate por erro/latência antes da expansão global.
- O documento descreve implementação por arquivo para execução futura sem lacunas de decisão.

## Problema atual e contexto técnico

Hoje sync/discovery multi-conta depende de reconciliação manual em cenários de conflito, com baixa rastreabilidade de ownership e fallback.

A feature impacta diretamente `/v1/chat/completions`, `/v1/responses`, `/v1/models`. O objetivo técnico fechado é fortalecer sync, ownership de tokens e discovery dinâmico com rastreabilidade em /v1/chat/completions, /v1/responses, /v1/models.

## Motivação de produto e de engenharia

Produto: operação multi-ambiente e multi-conta com menos fricção, compartilhamento seguro e rastreável de configurações e ownership.

Engenharia: estrutura fluxo de sync/discovery com estados e erros tipados, permitindo rollback sem perda de consistência.

## O que ganhamos

- Sync multi-ambiente auditável com ownership claro de tokens e configurações.
- Headers padronizados para diagnóstico: `X-Request-Id`, `Retry-After`, `X-RateLimit-Remaining`.
- Métricas acionáveis para operação: `omniroute_feature_51_requests_total`, `omniroute_feature_51_errors_total`, `omniroute_feature_51_latency_ms`.
- Menor MTTR por erros tipados e rollback previsível por feature flag.

## Antes x Depois

| Dimensão           | Antes                        | Depois                                               |
| ------------------ | ---------------------------- | ---------------------------------------------------- |
| Sync e ownership   | Conciliação manual de estado | Sync tokenizado com ownership e conflito tipado      |
| Discovery/fallback | Listas estáticas por release | Discovery dinâmico com cadeia de fallback controlada |
| Operação           | Diagnóstico reativo          | Métricas e alertas orientados por SLO                |

## Escopo (in/out)

**In scope**

- Fortalecer retry/fallback/cooldown com regras explícitas.
- Reduzir falhas transitórias com estratégia orientada a estado.
- Melhorar previsibilidade operacional sob quota/rate-limit.

**Out of scope**

- Orquestração distribuída entre múltiplas instâncias.
- Garantia absoluta de disponibilidade em falha total de upstream.

## Impacto em APIs, interfaces e tipos

**Endpoints e superfícies impactadas**

- `/v1/chat/completions`
- `/v1/responses`
- `/v1/models`

**Interfaces/tipos**

- Campos novos devem iniciar como opcionais para evitar breaking change imediato.
- Mudanças de shape precisam refletir em `docs/openapi.yaml` e testes de contrato.
- Erros devem preservar semântica HTTP e incluir código estruturado quando aplicável.

## Desenho técnico proposto

- Definir contrato interno imutável (input normalizado -> decisão -> output) para evitar lógica condicional espalhada.
- Concentrar regras em `open-sse/services/accountFallback.js` e utilitários compartilhados em `open-sse/services/rateLimitManager.js` para reduzir divergência entre rotas.
- Adaptar a borda HTTP em `open-sse/services/accountSelector.js` para expor headers, erros tipados e semântica uniforme.
- Defaults operacionais fixados: `sync.share_code.ttl_seconds=900`, `oauth.pool.ownership_mode=strict`, `antigravity.discovery.interval_ms=180000`, `routing.retry.jitter_ratio=0.2`.
- Headers obrigatórios de diagnóstico: `X-Request-Id`, `Retry-After`, `X-RateLimit-Remaining`, `X-Sync-Version`, `X-Sync-Source`.
- Códigos de erro obrigatórios: `INTERNAL_PROXY_ERROR`, `SYNC_TOKEN_INVALID`, `SYNC_CONFLICT`.
- Telemetria mínima para gate de rollout: `omniroute_feature_51_requests_total`, `omniroute_feature_51_errors_total`, `omniroute_feature_51_latency_ms`, `omniroute_feature_51_retry_attempt_total`.

## Passo a passo de implementação por arquivo

1. Em `open-sse/services/accountFallback.js`, introduzir schema/config para a feature com defaults `sync.share_code.ttl_seconds=900`, `oauth.pool.ownership_mode=strict`, `antigravity.discovery.interval_ms=180000` e validação de tipo/faixa.
2. Em `open-sse/services/rateLimitManager.js`, criar/ajustar constantes, enums e helpers para erros tipados (`INTERNAL_PROXY_ERROR`, `SYNC_TOKEN_INVALID`, `SYNC_CONFLICT`).
3. Em `open-sse/services/accountSelector.js`, integrar a regra no fluxo principal, incluindo headers de diagnóstico e propagação correta de status HTTP.
4. Em `open-sse/config/constants.js` e `docs/API_REFERENCE.md`, atualizar contrato público, exemplos e matriz de compatibilidade.
5. Em `tests/security/test-cloud-sync-and-call.sh` (unitário) e `tests/security/test-cloud-openai-compatible.sh` (integração/contrato), cobrir caminho feliz, erro tipado e regressão do fluxo legado.
6. Publicar dashboard/alertas da feature, habilitar por flag em canário e promover após atingir os gates definidos.

## Regras de compatibilidade e migração

- Migração aditiva: novos campos e parâmetros entram como opcionais na primeira release.
- Janela de transição recomendada: 2 releases menores com compatibilidade backward.
- Quando houver quebra inevitável, publicar `deprecation` em resposta e changelog com data de corte.
- Garantir suporte aos defaults documentados (`sync.share_code.ttl_seconds=900`, `oauth.pool.ownership_mode=strict`) mesmo sem configuração explícita.
- Preservar semântica dos headers legados e adicionar novos headers sem sobrescrever existentes (`X-Request-Id`, `Retry-After`).
- Erros novos devem coexistir com fallback para códigos genéricos até final da janela (`INTERNAL_PROXY_ERROR`, `SYNC_TOKEN_INVALID`).

## Segurança, abuso e compliance

- Não registrar tokens, API keys, cookies, refresh tokens ou payloads sensíveis em logs.
- Validar entrada com schema estrito antes de alcançar camada de execução do provider.
- Propagar `requestId` em todo o fluxo para rastreabilidade e auditoria.
- Aplicar allowlist de hosts/protocolos e bloquear ranges privados (`127.0.0.0/8`, `10.0.0.0/8`, `169.254.0.0/16`).

## Observabilidade (logs, métricas, alertas)

- Instrumentar métricas obrigatórias: `omniroute_feature_51_requests_total`, `omniroute_feature_51_errors_total`, `omniroute_feature_51_latency_ms`, `omniroute_feature_51_retry_attempt_total`.
- Criar painéis com cortes por provider, modelo, rota e tipo de erro.
- Log estruturado mínimo: `requestId`, `featureId`, `provider`, `model`, `status`, `errorCode`, `X-Request-Id`, `Retry-After`, `X-RateLimit-Remaining`.
- Alertas recomendados: erro > 2% por 5 min, p95 latência +30% por 10 min, aumento súbito de fallback/retry.
- Registrar evento de ativação/desativação da feature flag para correlação de incidentes.

## Plano de rollout (faseado + rollback)

1. Fase 0 (dark launch): código ativo com decisão em modo sombra e logs comparativos.
2. Fase 1 (canário 5%): habilitar por workspace/control plane e validar semântica de erro/headers.
3. Gate para avançar: `omniroute_feature_51_errors_total` <= baseline + 1% e `omniroute_feature_51_latency_ms` <= baseline + 15% por 24h.
4. Fase 2 (25% -> 50%): ampliar gradualmente com monitoramento contínuo e freeze de mudanças paralelas.
5. Fase 3 (100%): remover fallback temporário somente após 2 ciclos estáveis.
6. Rollback: desativar feature flag, invalidar cache relacionado (se houver) e manter telemetria de causa-raiz.

## Plano de testes (unitário, integração, contrato, regressão)

- Unitário: validar regras internas e normalização de entradas no arquivo `tests/security/test-cloud-sync-and-call.sh`.
- Integração: exercer fluxo completo das rotas `/v1/chat/completions`, `/v1/responses`, `/v1/models` em `tests/security/test-cloud-openai-compatible.sh` com mocks realistas de upstream.
- Contrato: garantir status/headers/body e códigos de erro (`INTERNAL_PROXY_ERROR`, `SYNC_TOKEN_INVALID`, `SYNC_CONFLICT`) em fixtures versionadas.
- Regressão e2e: assegurar não quebra de comportamento existente em `tests/unit/domain-persistence.test.mjs`.
- Testes negativos: timeout, upstream 429/5xx, credencial inválida, payload incompleto e falha de rede.

## Critérios de aceite

- Contrato atualizado em `docs/openapi.yaml` e `docs/API_REFERENCE.md`, incluindo exemplos de `X-Request-Id`, `Retry-After`.
- Erros tipados entregues e documentados, cobrindo ao menos `INTERNAL_PROXY_ERROR`, `SYNC_TOKEN_INVALID`, `SYNC_CONFLICT`.
- Cobertura de testes: unitário + integração + contrato + regressão para caminho feliz e falhas críticas.
- Observabilidade ativa com métricas `omniroute_feature_51_requests_total`, `omniroute_feature_51_errors_total`, `omniroute_feature_51_latency_ms` e alertas configurados.
- Rollout concluído com canário aprovado e rollback validado em ambiente de teste.

## Riscos, trade-offs e mitigação

- Risco: aumento inicial de complexidade por formalização de regras e contratos.
- Mitigação: implementação incremental por flag, com documentação e testes de contrato no mesmo PR.
- Risco: regressão em caminhos legados pouco exercitados.
- Mitigação: suite de regressão obrigatória antes de cada promoção de fase.
- Trade-off: retries mais inteligentes reduzem erro, mas podem elevar latência em cenários extremos; limite por budget de tentativa.
- Trade-off: ownership estrito reduz conflito, mas exige resolução explícita de disputa; manter fluxo de reconciliação guiado.

## Estimativa de esforço

- Complexidade estimada: **Baixa (1-3 dias)**.
- Estratégia recomendada: 2-4 PRs pequenos (contrato, implementação, testes, rollout).
- Pré-requisitos: flags prontas, telemetria mínima e plano de rollback validado.

## Referências de código

- `open-sse/services/accountFallback.js`
- `open-sse/services/rateLimitManager.js`
- `open-sse/services/accountSelector.js`
- `open-sse/config/constants.js`
- `open-sse/handlers/chatCore.js`
- `src/app/api/rate-limit/route.js`
- `open-sse/config/providerRegistry.js`
- `docs/openapi.yaml`

## Notas herdadas

**Documentos legados consolidados neste canônico**

- `docs/new_features/feature-95-fetch-retry-com-backoff-exponencial.md`

**Nota:** conteúdos equivalentes foram deduplicados por capability para evitar sobreposição e retrabalho no desenvolvimento futuro.
