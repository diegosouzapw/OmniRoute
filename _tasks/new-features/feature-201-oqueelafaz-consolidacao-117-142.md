# Consolidação — Features 117 a 142 vs Série feature-oqueelafaz

## Objetivo

Consolidar a documentação existente (`feature-117` até `feature-142`) com a nova trilha canônica `feature-oqueelafaz-*`, evitando duplicidade e deixando claro qual documento guia o desenvolvimento futuro.

---

## Regra de Consolidação

1. A série `feature-oqueelafaz-*` é a referência canônica de roadmap e implementação por fases.
2. Os arquivos `feature-117..142` permanecem como detalhamento tático/legado, quando agregam exemplos e contexto útil.
3. Quando houver sobreposição direta, o desenvolvimento deve seguir o documento canônico da série `feature-oqueelafaz-*`.

---

## Mapeamento Consolidado

| Feature Legada                                      | Tema                          | Status Consolidado                  | Documento Canônico                                                                         |
| --------------------------------------------------- | ----------------------------- | ----------------------------------- | ------------------------------------------------------------------------------------------ |
| `feature-117-dynamic-model-registry.md`             | Dynamic model registry        | Mesclar (complementar)              | `docs/new_features/feature-oqueelafaz-01.md`, `docs/new_features/feature-oqueelafaz-03.md` |
| `feature-118-amp-cli-integration.md`                | Amp CLI integration           | Manter independente                 | `docs/new_features/feature-118-amp-cli-integration.md`                                     |
| `feature-119-per-credential-priority.md`            | Prioridade por credencial     | Manter independente                 | `docs/new_features/feature-119-per-credential-priority.md`                                 |
| `feature-120-websocket-api.md`                      | Endpoint WebSocket            | Manter independente                 | `docs/new_features/feature-120-websocket-api.md`                                           |
| `feature-121-nonstream-keepalive.md`                | Keepalive non-stream          | Manter independente                 | `docs/new_features/feature-121-nonstream-keepalive.md`                                     |
| `feature-122-commercial-mode.md`                    | Modo de performance           | Manter independente                 | `docs/new_features/feature-122-commercial-mode.md`                                         |
| `feature-123-tls-nativo.md`                         | TLS nativo                    | Manter independente                 | `docs/new_features/feature-123-tls-nativo.md`                                              |
| `feature-124-config-hot-reload.md`                  | Hot reload de config          | Manter independente                 | `docs/new_features/feature-124-config-hot-reload.md`                                       |
| `feature-125-management-secret-hashing.md`          | Hashing de segredo management | Manter independente                 | `docs/new_features/feature-125-management-secret-hashing.md`                               |
| `feature-126-distributed-config-store.md`           | Config store distribuído      | Manter independente                 | `docs/new_features/feature-126-distributed-config-store.md`                                |
| `feature-127-kimi-channel.md`                       | Canal Kimi                    | Manter independente                 | `docs/new_features/feature-127-kimi-channel.md`                                            |
| `feature-128-qoder-multi-provider-hub.md`           | Hub Qoder                     | Manter (complementar ao catálogo)   | `docs/new_features/feature-oqueelafaz-03.md`                                               |
| `feature-129-antigravity-oauth-constants-update.md` | Constantes OAuth Antigravity  | Manter independente                 | `docs/new_features/feature-129-antigravity-oauth-constants-update.md`                      |
| `feature-130-per-account-excluded-models.md`        | Exclusão por conta            | Manter independente                 | `docs/new_features/feature-130-per-account-excluded-models.md`                             |
| `feature-131-response-cost-headers.md`              | Headers de custo              | Mesclar (sobreposição direta)       | `docs/new_features/feature-oqueelafaz-09.md`                                               |
| `feature-132-deployment-cooldowns-escalonados.md`   | Cooldown escalonado           | Mesclar (sobreposição direta)       | `docs/new_features/feature-oqueelafaz-08.md`                                               |
| `feature-133-budget-reset-automatico.md`            | Reset automático de budget    | Mesclar (sobreposição direta)       | `docs/new_features/feature-oqueelafaz-11.md`                                               |
| `feature-134-provider-endpoints-config-completo.md` | Matriz de endpoints           | Mesclar (sobreposição direta)       | `docs/new_features/feature-oqueelafaz-02.md`                                               |
| `feature-135-tag-based-routing.md`                  | Roteamento por tags           | Manter (complementar ao roteamento) | `docs/new_features/feature-oqueelafaz-05.md`                                               |
| `feature-136-model-registry-json-centralizado.md`   | Registry JSON centralizado    | Mesclar (sobreposição direta)       | `docs/new_features/feature-oqueelafaz-01.md`                                               |
| `feature-137-lowest-latency-routing-strategy.md`    | Menor latência                | Mesclar (sobreposição direta)       | `docs/new_features/feature-oqueelafaz-04.md`                                               |
| `feature-138-tpm-rpm-rate-limiting.md`              | Limites TPM/RPM               | Mesclar (sobreposição direta)       | `docs/new_features/feature-oqueelafaz-06.md`                                               |
| `feature-139-parallel-request-limiter.md`           | Limite de concorrência        | Mesclar (sobreposição direta)       | `docs/new_features/feature-oqueelafaz-06.md`                                               |
| `feature-140-spend-batch-writer.md`                 | Writer de custos em lote      | Mesclar (sobreposição direta)       | `docs/new_features/feature-oqueelafaz-11.md`                                               |
| `feature-141-dual-cache-layer.md`                   | Cache em duas camadas         | Mesclar (sobreposição direta)       | `docs/new_features/feature-oqueelafaz-10.md`                                               |
| `feature-142-guardrail-registry-extensivel.md`      | Guardrails extensíveis        | Mesclar (sobreposição direta)       | `docs/new_features/feature-oqueelafaz-14.md`                                               |

---

## Resultado da Revisão Aplicada

1. Todos os arquivos `feature-117..142` foram revisados para garantir presença de seções essenciais (motivação, ganhos, antes/depois e implementação).
2. Arquivos com lacuna de implementação receberam seção explícita `Como fazer (passo a passo)`.
3. O `feature-129` foi ajustado para remover secret hardcoded, adotando variável de ambiente para segurança.

---

## Diretriz para Desenvolvimento Futuro

1. Para execução de roadmap, comece sempre pelos documentos `feature-oqueelafaz-*`.
2. Use `feature-117..142` quando precisar de exemplos táticos mais detalhados.
3. Em caso de conflito, prevalece o documento canônico da série `feature-oqueelafaz-*`.
