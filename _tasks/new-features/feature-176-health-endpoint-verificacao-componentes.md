# Feature 25 - Health endpoint com verificação real de componentes

## Resumo executivo

- Feature 25 priorizada como **P1**, com foco em endurecer a borda do serviço contra abuso, SSRF e chamadas inseguras em /api/monitoring/health, /api/provider-metrics, /api/usage/analytics.
- A proposta fixa comportamento em contrato, execução e observabilidade, removendo decisões implícitas.
- Parâmetros operacionais são definidos por padrão: `security.outbound.allowlist.enforced=true`, `security.login.rate_limit_per_min=10`, `security.ssrf.block_private_ranges=true`.
- A semântica de erro passa a ser tipada com códigos como `INTERNAL_PROXY_ERROR`, `SSRF_BLOCKED`, `AUTH_RATE_LIMITED`.
- O rollout é faseado com feature flag e gate por erro/latência antes da expansão global.
- O documento descreve implementação por arquivo para execução futura sem lacunas de decisão.

## Problema atual e contexto técnico

Hoje os controles de borda não estão completamente centralizados, elevando risco de SSRF, abuso de endpoints sensíveis e respostas inconsistentes para clientes.

A feature impacta diretamente `/api/monitoring/health`, `/api/provider-metrics`, `/api/usage/analytics`. O objetivo técnico fechado é endurecer a borda do serviço contra abuso, SSRF e chamadas inseguras em /api/monitoring/health, /api/provider-metrics, /api/usage/analytics.

## Motivação de produto e de engenharia

Produto: confiança operacional maior para ambientes multi-tenant e deploys expostos, reduzindo risco de bloqueio por abuso e falhas de compliance.

Engenharia: concentra validação de rede/autenticação em pontos únicos, facilitando auditoria e revisão de segurança contínua.

## O que ganhamos

- Redução de superfície de ataque com controles de rede e autenticação centralizados.
- Headers padronizados para diagnóstico: `X-Request-Id`.
- Métricas acionáveis para operação: `omniroute_feature_25_requests_total`, `omniroute_feature_25_errors_total`, `omniroute_feature_25_latency_ms`.
- Menor MTTR por erros tipados e rollback previsível por feature flag.

## Antes x Depois

| Dimensão             | Antes                                 | Depois                                          |
| -------------------- | ------------------------------------- | ----------------------------------------------- |
| Superfície de ataque | Validação parcial de destino e origem | Allowlist/denylist centralizadas e verificáveis |
| Proteção de login    | Rate limit básico                     | Rate limit adaptativo com bloqueio progressivo  |
| Operação             | Diagnóstico reativo                   | Métricas e alertas orientados por SLO           |

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
- Defaults operacionais fixados: `security.outbound.allowlist.enforced=true`, `security.login.rate_limit_per_min=10`, `security.ssrf.block_private_ranges=true`, `observability.health.deep_check.enabled=true`.
- Headers obrigatórios de diagnóstico: `X-Request-Id`.
- Códigos de erro obrigatórios: `INTERNAL_PROXY_ERROR`, `SSRF_BLOCKED`, `AUTH_RATE_LIMITED`.
- Telemetria mínima para gate de rollout: `omniroute_feature_25_requests_total`, `omniroute_feature_25_errors_total`, `omniroute_feature_25_latency_ms`.

## Passo a passo de implementação por arquivo

1. Em `src/app/api/monitoring/health/route.js`, introduzir schema/config para a feature com defaults `security.outbound.allowlist.enforced=true`, `security.login.rate_limit_per_min=10`, `security.ssrf.block_private_ranges=true` e validação de tipo/faixa.
2. Em `src/lib/usageAnalytics.js`, criar/ajustar constantes, enums e helpers para erros tipados (`INTERNAL_PROXY_ERROR`, `SSRF_BLOCKED`, `AUTH_RATE_LIMITED`).
3. Em `src/lib/tokenHealthCheck.js`, integrar a regra no fluxo principal, incluindo headers de diagnóstico e propagação correta de status HTTP.
4. Em `src/lib/proxyLogger.js` e `docs/API_REFERENCE.md`, atualizar contrato público, exemplos e matriz de compatibilidade.
5. Em `tests/integration/security-hardening.test.mjs` (unitário) e `tests/security/test-docker-hardening.sh` (integração/contrato), cobrir caminho feliz, erro tipado e regressão do fluxo legado.
6. Publicar dashboard/alertas da feature, habilitar por flag em canário e promover após atingir os gates definidos.

## Regras de compatibilidade e migração

- Migração aditiva: novos campos e parâmetros entram como opcionais na primeira release.
- Janela de transição recomendada: 2 releases menores com compatibilidade backward.
- Quando houver quebra inevitável, publicar `deprecation` em resposta e changelog com data de corte.
- Garantir suporte aos defaults documentados (`security.outbound.allowlist.enforced=true`, `security.login.rate_limit_per_min=10`) mesmo sem configuração explícita.
- Preservar semântica dos headers legados e adicionar novos headers sem sobrescrever existentes (`X-Request-Id`).
- Erros novos devem coexistir com fallback para códigos genéricos até final da janela (`INTERNAL_PROXY_ERROR`, `SSRF_BLOCKED`).

## Segurança, abuso e compliance

- Não registrar tokens, API keys, cookies, refresh tokens ou payloads sensíveis em logs.
- Validar entrada com schema estrito antes de alcançar camada de execução do provider.
- Propagar `requestId` em todo o fluxo para rastreabilidade e auditoria.
- Aplicar allowlist de hosts/protocolos e bloquear ranges privados (`127.0.0.0/8`, `10.0.0.0/8`, `169.254.0.0/16`).

## Observabilidade (logs, métricas, alertas)

- Instrumentar métricas obrigatórias: `omniroute_feature_25_requests_total`, `omniroute_feature_25_errors_total`, `omniroute_feature_25_latency_ms`.
- Criar painéis com cortes por provider, modelo, rota e tipo de erro.
- Log estruturado mínimo: `requestId`, `featureId`, `provider`, `model`, `status`, `errorCode`, `X-Request-Id`.
- Alertas recomendados: erro > 2% por 5 min, p95 latência +30% por 10 min, aumento súbito de fallback/retry.
- Registrar evento de ativação/desativação da feature flag para correlação de incidentes.

## Plano de rollout (faseado + rollback)

1. Fase 0 (dark launch): código ativo com decisão em modo sombra e logs comparativos.
2. Fase 1 (canário 5%): habilitar por workspace/control plane e validar semântica de erro/headers.
3. Gate para avançar: `omniroute_feature_25_errors_total` <= baseline + 1% e `omniroute_feature_25_latency_ms` <= baseline + 15% por 24h.
4. Fase 2 (25% -> 50%): ampliar gradualmente com monitoramento contínuo e freeze de mudanças paralelas.
5. Fase 3 (100%): remover fallback temporário somente após 2 ciclos estáveis.
6. Rollback: desativar feature flag, invalidar cache relacionado (se houver) e manter telemetria de causa-raiz.

## Plano de testes (unitário, integração, contrato, regressão)

- Unitário: validar regras internas e normalização de entradas no arquivo `tests/integration/security-hardening.test.mjs`.
- Integração: exercer fluxo completo das rotas `/api/monitoring/health`, `/api/provider-metrics`, `/api/usage/analytics` em `tests/security/test-docker-hardening.sh` com mocks realistas de upstream.
- Contrato: garantir status/headers/body e códigos de erro (`INTERNAL_PROXY_ERROR`, `SSRF_BLOCKED`, `AUTH_RATE_LIMITED`) em fixtures versionadas.
- Regressão e2e: assegurar não quebra de comportamento existente em `tests/unit/ip-filter.test.mjs`.
- Testes negativos: timeout, upstream 429/5xx, credencial inválida, payload incompleto e falha de rede.

## Critérios de aceite

- Contrato atualizado em `docs/openapi.yaml` e `docs/API_REFERENCE.md`, incluindo exemplos de `X-Request-Id`.
- Erros tipados entregues e documentados, cobrindo ao menos `INTERNAL_PROXY_ERROR`, `SSRF_BLOCKED`, `AUTH_RATE_LIMITED`.
- Cobertura de testes: unitário + integração + contrato + regressão para caminho feliz e falhas críticas.
- Observabilidade ativa com métricas `omniroute_feature_25_requests_total`, `omniroute_feature_25_errors_total`, `omniroute_feature_25_latency_ms` e alertas configurados.
- Rollout concluído com canário aprovado e rollback validado em ambiente de teste.

## Riscos, trade-offs e mitigação

- Risco: aumento inicial de complexidade por formalização de regras e contratos.
- Mitigação: implementação incremental por flag, com documentação e testes de contrato no mesmo PR.
- Risco: regressão em caminhos legados pouco exercitados.
- Mitigação: suite de regressão obrigatória antes de cada promoção de fase.

## Estimativa de esforço

- Complexidade estimada: **Baixa (1-2 dias)**.
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

- `docs/new_features/feature-99-health-endpoint-real-com-verificacao-componentes.md`

**Nota:** conteúdos equivalentes foram deduplicados por capability para evitar sobreposição e retrabalho no desenvolvimento futuro.
