# Feature 32 - Validação de thinking budget por modelo

## Resumo executivo

- Feature 32 priorizada como **P1**, com foco em garantir catálogo de modelos atualizado, alias resolvidos e metadados confiáveis em /v1/models, /api/models/catalog, /api/models/alias.
- A proposta fixa comportamento em contrato, execução e observabilidade, removendo decisões implícitas.
- Parâmetros operacionais são definidos por padrão: `models.registry.sync_interval_ms=300000`, `models.alias.strict_mode=true`, `models.capabilities.versioned=true`.
- A semântica de erro passa a ser tipada com códigos como `INTERNAL_PROXY_ERROR`, `MODEL_NOT_MAPPED`, `MODEL_ALIAS_AMBIGUOUS`.
- O rollout é faseado com feature flag e gate por erro/latência antes da expansão global.
- O documento descreve implementação por arquivo para execução futura sem lacunas de decisão.

## Problema atual e contexto técnico

Hoje o catálogo de modelos e aliases sofre drift entre fontes, o que afeta seleção correta de modelo, capabilities expostas e compatibilidade entre providers.

A feature impacta diretamente `/v1/models`, `/api/models/catalog`, `/api/models/alias`. O objetivo técnico fechado é garantir catálogo de modelos atualizado, alias resolvidos e metadados confiáveis em /v1/models, /api/models/catalog, /api/models/alias.

## Motivação de produto e de engenharia

Produto: cobertura de modelos atualizada e previsível para equipes que dependem de novos releases de providers sem ciclos longos de ajuste manual.

Engenharia: cria trilha única para registro de capabilities, alias e sincronização, com regras determinísticas e idempotentes.

## O que ganhamos

- Cobertura de modelos e capabilities com menos drift entre catálogo e execução.
- Headers padronizados para diagnóstico: `X-Request-Id`, `X-Model-Alias-Resolved`, `X-Model-Catalog-Version`.
- Métricas acionáveis para operação: `omniroute_feature_32_requests_total`, `omniroute_feature_32_errors_total`, `omniroute_feature_32_latency_ms`.
- Menor MTTR por erros tipados e rollback previsível por feature flag.

## Antes x Depois

| Dimensão            | Antes                                | Depois                                               |
| ------------------- | ------------------------------------ | ---------------------------------------------------- |
| Catálogo de modelos | Atualização manual e sujeita a drift | Catálogo versionado com sync e validações            |
| Alias de modelo     | Mapeamentos implícitos               | Alias explícitos com prioridade e fallback definidos |
| Operação            | Diagnóstico reativo                  | Métricas e alertas orientados por SLO                |

## Escopo (in/out)

**In scope**

- Atualizar catálogo/capabilities/aliases de modelo.
- Garantir consistência entre resolução de modelo e execução.
- Expor metadados úteis para UI e automação.

**Out of scope**

- Implementar imediatamente todo modelo novo sem suporte de executor.
- Sincronização em tempo real sem controle de custo.

## Impacto em APIs, interfaces e tipos

**Endpoints e superfícies impactadas**

- `/v1/models`
- `/api/models/catalog`
- `/api/models/alias`

**Interfaces/tipos**

- Campos novos devem iniciar como opcionais para evitar breaking change imediato.
- Mudanças de shape precisam refletir em `docs/openapi.yaml` e testes de contrato.
- Erros devem preservar semântica HTTP e incluir código estruturado quando aplicável.

## Desenho técnico proposto

- Definir contrato interno imutável (input normalizado -> decisão -> output) para evitar lógica condicional espalhada.
- Concentrar regras em `open-sse/config/providerRegistry.js` e utilitários compartilhados em `open-sse/config/providerModels.js` para reduzir divergência entre rotas.
- Adaptar a borda HTTP em `src/app/api/models/catalog/route.js` para expor headers, erros tipados e semântica uniforme.
- Defaults operacionais fixados: `models.registry.sync_interval_ms=300000`, `models.alias.strict_mode=true`, `models.capabilities.versioned=true`, `models.reasoning.max_budget_tokens=32000`.
- Headers obrigatórios de diagnóstico: `X-Request-Id`, `X-Model-Alias-Resolved`, `X-Model-Catalog-Version`.
- Códigos de erro obrigatórios: `INTERNAL_PROXY_ERROR`, `MODEL_NOT_MAPPED`, `MODEL_ALIAS_AMBIGUOUS`.
- Telemetria mínima para gate de rollout: `omniroute_feature_32_requests_total`, `omniroute_feature_32_errors_total`, `omniroute_feature_32_latency_ms`, `omniroute_feature_32_alias_resolve_total`.

## Passo a passo de implementação por arquivo

1. Em `open-sse/config/providerRegistry.js`, introduzir schema/config para a feature com defaults `models.registry.sync_interval_ms=300000`, `models.alias.strict_mode=true`, `models.capabilities.versioned=true` e validação de tipo/faixa.
2. Em `open-sse/config/providerModels.js`, criar/ajustar constantes, enums e helpers para erros tipados (`INTERNAL_PROXY_ERROR`, `MODEL_NOT_MAPPED`, `MODEL_ALIAS_AMBIGUOUS`).
3. Em `src/app/api/models/catalog/route.js`, integrar a regra no fluxo principal, incluindo headers de diagnóstico e propagação correta de status HTTP.
4. Em `src/lib/db/models.js` e `docs/API_REFERENCE.md`, atualizar contrato público, exemplos e matriz de compatibilidade.
5. Em `tests/unit/wildcard-router.test.mjs` (unitário) e `tests/unit/thinking-budget.test.mjs` (integração/contrato), cobrir caminho feliz, erro tipado e regressão do fluxo legado.
6. Publicar dashboard/alertas da feature, habilitar por flag em canário e promover após atingir os gates definidos.

## Regras de compatibilidade e migração

- Migração aditiva: novos campos e parâmetros entram como opcionais na primeira release.
- Janela de transição recomendada: 2 releases menores com compatibilidade backward.
- Quando houver quebra inevitável, publicar `deprecation` em resposta e changelog com data de corte.
- Garantir suporte aos defaults documentados (`models.registry.sync_interval_ms=300000`, `models.alias.strict_mode=true`) mesmo sem configuração explícita.
- Preservar semântica dos headers legados e adicionar novos headers sem sobrescrever existentes (`X-Request-Id`, `X-Model-Alias-Resolved`).
- Erros novos devem coexistir com fallback para códigos genéricos até final da janela (`INTERNAL_PROXY_ERROR`, `MODEL_NOT_MAPPED`).

## Segurança, abuso e compliance

- Não registrar tokens, API keys, cookies, refresh tokens ou payloads sensíveis em logs.
- Validar entrada com schema estrito antes de alcançar camada de execução do provider.
- Propagar `requestId` em todo o fluxo para rastreabilidade e auditoria.

## Observabilidade (logs, métricas, alertas)

- Instrumentar métricas obrigatórias: `omniroute_feature_32_requests_total`, `omniroute_feature_32_errors_total`, `omniroute_feature_32_latency_ms`, `omniroute_feature_32_alias_resolve_total`.
- Criar painéis com cortes por provider, modelo, rota e tipo de erro.
- Log estruturado mínimo: `requestId`, `featureId`, `provider`, `model`, `status`, `errorCode`, `X-Request-Id`, `X-Model-Alias-Resolved`, `X-Model-Catalog-Version`.
- Alertas recomendados: erro > 2% por 5 min, p95 latência +30% por 10 min, aumento súbito de fallback/retry.
- Registrar evento de ativação/desativação da feature flag para correlação de incidentes.

## Plano de rollout (faseado + rollback)

1. Fase 0 (dark launch): código ativo com decisão em modo sombra e logs comparativos.
2. Fase 1 (canário 5%): habilitar por workspace/control plane e validar semântica de erro/headers.
3. Gate para avançar: `omniroute_feature_32_errors_total` <= baseline + 1% e `omniroute_feature_32_latency_ms` <= baseline + 15% por 24h.
4. Fase 2 (25% -> 50%): ampliar gradualmente com monitoramento contínuo e freeze de mudanças paralelas.
5. Fase 3 (100%): remover fallback temporário somente após 2 ciclos estáveis.
6. Rollback: desativar feature flag, invalidar cache relacionado (se houver) e manter telemetria de causa-raiz.

## Plano de testes (unitário, integração, contrato, regressão)

- Unitário: validar regras internas e normalização de entradas no arquivo `tests/unit/wildcard-router.test.mjs`.
- Integração: exercer fluxo completo das rotas `/v1/models`, `/api/models/catalog`, `/api/models/alias` em `tests/unit/thinking-budget.test.mjs` com mocks realistas de upstream.
- Contrato: garantir status/headers/body e códigos de erro (`INTERNAL_PROXY_ERROR`, `MODEL_NOT_MAPPED`, `MODEL_ALIAS_AMBIGUOUS`) em fixtures versionadas.
- Regressão e2e: assegurar não quebra de comportamento existente em `tests/unit/plan3-p0.test.mjs`.
- Testes negativos: timeout, upstream 429/5xx, credencial inválida, payload incompleto e falha de rede.

## Critérios de aceite

- Contrato atualizado em `docs/openapi.yaml` e `docs/API_REFERENCE.md`, incluindo exemplos de `X-Request-Id`, `X-Model-Alias-Resolved`.
- Erros tipados entregues e documentados, cobrindo ao menos `INTERNAL_PROXY_ERROR`, `MODEL_NOT_MAPPED`, `MODEL_ALIAS_AMBIGUOUS`.
- Cobertura de testes: unitário + integração + contrato + regressão para caminho feliz e falhas críticas.
- Observabilidade ativa com métricas `omniroute_feature_32_requests_total`, `omniroute_feature_32_errors_total`, `omniroute_feature_32_latency_ms` e alertas configurados.
- Rollout concluído com canário aprovado e rollback validado em ambiente de teste.

## Riscos, trade-offs e mitigação

- Risco: aumento inicial de complexidade por formalização de regras e contratos.
- Mitigação: implementação incremental por flag, com documentação e testes de contrato no mesmo PR.
- Risco: regressão em caminhos legados pouco exercitados.
- Mitigação: suite de regressão obrigatória antes de cada promoção de fase.

## Estimativa de esforço

- Complexidade estimada: **Média (3-5 dias)**.
- Estratégia recomendada: 2-4 PRs pequenos (contrato, implementação, testes, rollout).
- Pré-requisitos: flags prontas, telemetria mínima e plano de rollback validado.

## Referências de código

- `open-sse/config/providerRegistry.js`
- `open-sse/config/providerModels.js`
- `src/app/api/models/catalog/route.js`
- `src/lib/db/models.js`
- `src/shared/constants/providers.js`
- `open-sse/services/thinkingBudget.js`
- `open-sse/config/constants.js`
- `docs/openapi.yaml`

## Notas herdadas

**Documentos legados consolidados neste canônico**

- `docs/new_features/feature-88-validacao-thinking-budget-reasoning-effort.md`
- `docs/new_features/feature-116-thinking-budget-validation.md`

**Nota:** conteúdos equivalentes foram deduplicados por capability para evitar sobreposição e retrabalho no desenvolvimento futuro.
