# Feature OQueElaFaz 10 — Dual Cache Layer (Memória + Persistente)

**Origem:** padrão de cache multicamadas de gateways maduros  
**Prioridade:** P1  
**Impacto esperado:** menor latência, menor custo e menor pressão em providers

---

## O que ela faz

Cria estratégia de cache em duas camadas:

1. L1: memória local (rápida, TTL curto)
2. L2: persistente (SQLite/Redis, TTL maior)

Aplicável para:

- respostas idempotentes
- metadados de modelos
- descoberta de capabilities

---

## Motivação

Cache único limita escalabilidade. Em picos, perde-se benefício por reinício/processo isolado.

---

## O que ganhamos

1. Queda de latência em hits frequentes
2. Menos chamadas repetitivas para providers
3. Melhor eficiência de custo

---

## Antes e Depois

## Antes

- cache parcial e sem estratégia multicamada padronizada

## Depois

- L1 e L2 coordenados com política clara de invalidação
- métricas de `hit_l1`, `hit_l2`, `miss`

---

## Como fazer (passo a passo)

1. Definir interface única `cache.get/set/del`.
2. Implementar adaptador L1 em memória com TTL curto.
3. Implementar adaptador L2 em SQLite (ou Redis opcional).
4. Aplicar padrão read-through/write-through.
5. Expor métricas por namespace de cache.

---

## Arquivos-alvo sugeridos

- `src/lib/cache/l1MemoryCache.js`
- `src/lib/cache/l2PersistentCache.js`
- `src/lib/cache/cacheManager.js`
- `open-sse/handlers/*` (pontos de consumo)
- `src/lib/db/core.js`

---

## Critérios de aceite

- Cache funciona com fallback L1->L2.
- TTL e invalidação configuráveis por namespace.
- Métricas de hit/miss disponíveis em analytics.

---

## Riscos e mitigação

| Risco                  | Mitigação                                        |
| ---------------------- | ------------------------------------------------ |
| Stale data             | versionamento por chave e invalidação por evento |
| Crescimento de storage | limite de tamanho + limpeza periódica            |

---

## Métricas de sucesso

- taxa de hit L1 e L2
- redução de latência média
- redução de chamadas upstream
