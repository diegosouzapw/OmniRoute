# Quota Sharing Engine (Português (Brasil))

🌐 **Languages:** 🇺🇸 [English](../../../../routing/QUOTA_SHARE.md) · 🇪🇹 [am](../../../am/docs/routing/QUOTA_SHARE.md) · 🇸🇦 [ar](../../../ar/docs/routing/QUOTA_SHARE.md) · 🇦🇿 [az](../../../az/docs/routing/QUOTA_SHARE.md) · 🇧🇬 [bg](../../../bg/docs/routing/QUOTA_SHARE.md) · 🇧🇩 [bn](../../../bn/docs/routing/QUOTA_SHARE.md) · 🇧🇦 [bs](../../../bs/docs/routing/QUOTA_SHARE.md) · 🇨🇿 [cs](../../../cs/docs/routing/QUOTA_SHARE.md) · 🇩🇰 [da](../../../da/docs/routing/QUOTA_SHARE.md) · 🇩🇪 [de](../../../de/docs/routing/QUOTA_SHARE.md) · 🇬🇷 [el](../../../el/docs/routing/QUOTA_SHARE.md) · 🇪🇸 [es](../../../es/docs/routing/QUOTA_SHARE.md) · 🇪🇪 [et](../../../et/docs/routing/QUOTA_SHARE.md) · 🇮🇷 [fa](../../../fa/docs/routing/QUOTA_SHARE.md) · 🇫🇮 [fi](../../../fi/docs/routing/QUOTA_SHARE.md) · 🇫🇷 [fr](../../../fr/docs/routing/QUOTA_SHARE.md) · 🇮🇪 [ga](../../../ga/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [gu](../../../gu/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [ha](../../../ha/docs/routing/QUOTA_SHARE.md) · 🇮🇱 [he](../../../he/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [hi](../../../hi/docs/routing/QUOTA_SHARE.md) · 🇭🇷 [hr](../../../hr/docs/routing/QUOTA_SHARE.md) · 🇭🇺 [hu](../../../hu/docs/routing/QUOTA_SHARE.md) · 🇦🇲 [hy](../../../hy/docs/routing/QUOTA_SHARE.md) · 🇮🇩 [id](../../../id/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [ig](../../../ig/docs/routing/QUOTA_SHARE.md) · 🇮🇹 [it](../../../it/docs/routing/QUOTA_SHARE.md) · 🇯🇵 [ja](../../../ja/docs/routing/QUOTA_SHARE.md) · 🇬🇪 [ka](../../../ka/docs/routing/QUOTA_SHARE.md) · 🇰🇭 [km](../../../km/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [kn](../../../kn/docs/routing/QUOTA_SHARE.md) · 🇰🇷 [ko](../../../ko/docs/routing/QUOTA_SHARE.md) · 🇱🇹 [lt](../../../lt/docs/routing/QUOTA_SHARE.md) · 🇱🇻 [lv](../../../lv/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [ml](../../../ml/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [mr](../../../mr/docs/routing/QUOTA_SHARE.md) · 🇲🇾 [ms](../../../ms/docs/routing/QUOTA_SHARE.md) · 🇲🇹 [mt](../../../mt/docs/routing/QUOTA_SHARE.md) · 🇲🇲 [my](../../../my/docs/routing/QUOTA_SHARE.md) · 🇳🇵 [ne](../../../ne/docs/routing/QUOTA_SHARE.md) · 🇳🇱 [nl](../../../nl/docs/routing/QUOTA_SHARE.md) · 🇳🇴 [no](../../../no/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [or](../../../or/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [pa](../../../pa/docs/routing/QUOTA_SHARE.md) · 🇵🇭 [phi](../../../phi/docs/routing/QUOTA_SHARE.md) · 🇵🇱 [pl](../../../pl/docs/routing/QUOTA_SHARE.md) · 🇵🇹 [pt](../../../pt/docs/routing/QUOTA_SHARE.md) · 🇷🇴 [ro](../../../ro/docs/routing/QUOTA_SHARE.md) · 🇷🇺 [ru](../../../ru/docs/routing/QUOTA_SHARE.md) · 🇱🇰 [si](../../../si/docs/routing/QUOTA_SHARE.md) · 🇸🇰 [sk](../../../sk/docs/routing/QUOTA_SHARE.md) · 🇸🇮 [sl](../../../sl/docs/routing/QUOTA_SHARE.md) · 🇷🇸 [sr](../../../sr/docs/routing/QUOTA_SHARE.md) · 🇸🇪 [sv](../../../sv/docs/routing/QUOTA_SHARE.md) · 🇰🇪 [sw](../../../sw/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [ta](../../../ta/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [te](../../../te/docs/routing/QUOTA_SHARE.md) · 🇹🇭 [th](../../../th/docs/routing/QUOTA_SHARE.md) · 🇹🇷 [tr](../../../tr/docs/routing/QUOTA_SHARE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/QUOTA_SHARE.md) · 🇵🇰 [ur](../../../ur/docs/routing/QUOTA_SHARE.md) · 🇺🇿 [uz](../../../uz/docs/routing/QUOTA_SHARE.md) · 🇻🇳 [vi](../../../vi/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [yo](../../../yo/docs/routing/QUOTA_SHARE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/QUOTA_SHARE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/QUOTA_SHARE.md)

---

> **Referência do documento**: `docs/routing/QUOTA_SHARE.md`
> Parte do Grupo B (planos 16 + 22).

---

## Visão geral

O Mecanismo de Compartilhamento de Cota distribui de forma justa a cota baseada em tempo de um provedor (por exemplo, janela de 5 horas do Codex, 1500 req/h do Kimi) entre várias chaves de API que compartilham a mesma conexão.

**Problema que ele resolve:** o OmniRoute encaminha muitas chaves de API para a mesma conta de provedor upstream. Sem uma lógica de compartilhamento, uma rajada da chave A pode esgotar a cota do provedor durante aquela hora, deixando as chaves B e C bloqueadas até que a janela seja redefinida. O mecanismo evita isso:

1. Rastreando o consumo contínuo de cada chave por dimensão (%, requisições, tokens, $).
2. Aplicando um algoritmo de compartilhamento justo com conservação de trabalho: uma chave pode tomar emprestadas cotas ociosas enquanto o pool global não estiver saturado.
3. Aplicando o resultado no caminho crítico (`chatCore.ts`) antes que a requisição chegue ao executor upstream.

---

## Algoritmo: compartilhamento justo com conservação de trabalho

Implementado em `src/lib/quota/fairShare.ts`.

### Modos

| Condição                                   | Modo         | Comportamento                                                             |
| ------------------------------------------ | ------------ | ------------------------------------------------------------------------- |
| `globalUsedPercent < saturationThreshold`  | **Generoso** | A chave pode tomar emprestado até o limite global menos o total consumido |
| `globalUsedPercent >= saturationThreshold` | **Estrito**  | Aplica rigorosamente a cota justa individual                              |

O `saturationThreshold` padrão é `0.5` (env `QUOTA_SATURATION_THRESHOLD`).

### Decisão por dimensão

Para cada dimensão ativa no pool, o mecanismo calcula:

```
fairShareAllowed = poolLimit × (allocationWeight / 100)
consumed        = valor contínuo atual desta chave (de QuotaStore.peek)
remaining       = fairShareAllowed - consumed
```

Em seguida:

- **`policy = hard`**: se `consumed > fairShareAllowed` e o modo for estrito → **bloquear**.
- **`policy = soft`**: se `consumed > fairShareAllowed` e o modo for estrito → **penalizar** (reduzir a prioridade na combinação; nunca bloquear de forma rígida).
- **`policy = burst`**: permitir enquanto houver capacidade global disponível, independentemente da cota justa.

### Limite absoluto

`capValue` + `capUnit` em uma alocação constituem um limite máximo rígido, independente do modo ou da política. Qualquer dimensão em que `consumed >= capValue` sempre **bloqueia** a requisição.

### Verificação multidimensional

Uma requisição é bloqueada se **qualquer** dimensão do pool a bloquear. As dimensões são independentes — o esgotamento de 5h% não afeta a dimensão semanal%.

### Empréstimo

No modo generoso, uma chave cuja alocação esteja subutilizada pode usar o excedente das cotas não alocadas de outras chaves. A fórmula é:

```
maxAllowed = globalLimit - consumedByOtherKeys
```

onde `consumedByOtherKeys = consumedTotal - consumedByThisKey`. O limite global (o `limit` do pool para essa dimensão) é sempre o limite máximo rígido.

---

## Contador de janela deslizante

Implementado em `src/lib/quota/sqliteQuotaStore.ts` e `redisQuotaStore.ts`.

Dois buckets por `(apiKeyId, dimensionKey)`:

- `curr`: bucket atual (`floor(nowMs / windowMs)`)
- `prev`: bucket anterior (`curr - 1`)

Valor contínuo efetivo:

```
effectiveBucketIndex = floor(nowMs / windowMs)
bucketStartMs        = effectiveBucketIndex × windowMs
elapsed              = nowMs - bucketStartMs
weight               = 1 - elapsed / windowMs

effective = prev × weight + curr
```

**Precisão**: ~99% de precisão. O erro é de, no máximo, 1% do tamanho da janela no limite entre buckets (inerente à aproximação de 2 buckets).

### Concorrência

Driver SQLite: um mutex em memória por chave `(apiKeyId | dimensionKey)` evita a condição de corrida de leitura-modificação-gravação. O padrão espelha a prevenção de thundering herd de `src/sse/services/auth.ts`.

Driver Redis: script Lua EVAL para incremento atômico — executado como um único comando do Redis.

---

## Drivers

### SQLite (padrão, sem instalação)

- Tabela: `quota_consumption` (consulte as migrações `073_quota_pools.sql` / `074_quota_consumption.sql`).
- Ideal para implantações de instância única.
- Toda a persistência fica no banco de dados SQLite existente do OmniRoute (`DATA_DIR/storage.sqlite`).

### Redis (opcional, múltiplas instâncias)

- Requer o pacote npm `ioredis`.
- Os contadores são armazenados no Redis; os metadados (pools/alocações) permanecem no SQLite.
- Ideal para implantações com múltiplas réplicas nas quais os contadores precisam ser compartilhados.

### Alternância de drivers

Por meio da interface de configurações (`/dashboard/settings` → Armazenamento de Cotas) ou de variáveis de ambiente:

```bash
QUOTA_STORE_DRIVER=redis
QUOTA_STORE_REDIS_URL=redis://localhost:6379
```

A configuração do banco de dados tem precedência sobre as variáveis de ambiente. Se `driver=redis`, mas a URL estiver ausente ou
`ioredis` não estiver instalado, a fábrica volta a usar SQLite e registra um aviso.

Ordem de seleção do driver:

1. Configuração do banco de dados `quotaStore.driver`
2. Variável de ambiente `QUOTA_STORE_DRIVER`
3. Padrão: `sqlite`

---

## Múltiplas dimensões

Um pool pode ter várias dimensões. Cada dimensão é independente:

```ts
QuotaDimension {
  unit: "percent" | "requests" | "tokens" | "usd",
  window: "5h" | "hourly" | "daily" | "weekly" | "monthly",
  limit: number,  // limite máximo global do pool para esta dimensão
}
```

**Exemplo: plano Codex** (5h% + semanal%):

```json
[
  { "unit": "percent", "window": "5h", "limit": 100 },
  { "unit": "percent", "window": "weekly", "limit": 100 }
]
```

Uma solicitação deve satisfazer todas as dimensões para ser permitida.

---

## Resolvedor de planos

Implementado em `src/lib/quota/planResolver.ts`.

Precedência (da mais alta para a mais baixa):

1. **Substituição manual no banco de dados** — tabela `provider_plans`, por `connectionId`.
2. **Catálogo conhecido** — `src/lib/quota/planRegistry.ts` (somente dados).
3. **Plano vazio** — sem dimensões; configuração manual necessária.

### Catálogo conhecido

| Provedor              | Dimensões                                                     |
| --------------------- | ------------------------------------------------------------- |
| `codex`               | `percent/5h/100`, `percent/weekly/100`                        |
| `glm`                 | `tokens/5h` (limit=0, desconhecido), `tokens/weekly`          |
| `minimax`             | `tokens/5h`, `tokens/weekly`                                  |
| `bailian`             | `percent/5h/100`, `percent/weekly/100`, `percent/monthly/100` |
| `kimi`                | `requests/hourly/1500`                                        |
| `alibaba`             | `requests/monthly/90000`                                      |
| `openai`, `anthropic` | Sem padrão — configuração manual necessária                   |

---

## Integração com o pipeline

### Hook PRE (`open-sse/handlers/chatCore.ts`)

É executado antes do executor upstream, após as verificações de autenticação e política:

```
resolveComboTargets / handleSingleModel
  → enforceQuotaShare(apiKeyId, connectionId, provider, estimatedCost)
      → getQuotaStore().peek() por dimensão
      → fairShare.decideFairShare()
      → se bloquear → retornar 429 (buildErrorBody, Regra Rígida nº 12)
      → se permitir + reduzir prioridade → definir quotaSoftPenalty=true no candidato
  → executor.execute()
```

**Fail-open**: se `enforceQuotaShare` lançar uma exceção, a solicitação será permitida
com um registro `pino.warn`. Isso evita que um bug no mecanismo de cotas bloqueie todo
o tráfego.

### Hook POST (registrar consumo)

Após uma resposta bem-sucedida:

```
executor retorna sucesso
  → spendRecorder.recordConsumption(apiKeyId, connectionId, provider, actualCost)
      → getQuotaStore().consume() por dimensão
      → fail-open: erros registrados como pino.warn, nunca propagados ao cliente
```

**Observação sobre divergência**: se `consume` falhar após a resposta, o contador contínuo contabilizará um valor menor.
O sinal de saturação do provedor (por exemplo, `anthropic-ratelimit-unified-5h-utilization`)
corrige a estimativa global na próxima solicitação.

### Penalidade suave de combo (`open-sse/services/combo.ts`)

Quando `decision.deprioritize === true`:

```ts
if (candidate.quotaSoftPenalty) {
  score *= QUOTA_SOFT_DEPRIORITIZE_FACTOR; // padrão 0.7
}
```

A penalidade é aplicada após todos os outros fatores de pontuação. Ela reduz a probabilidade
de o auto-combo selecionar uma chave saturada sem bloqueá-la de forma rígida.

---

## Passo a passo da interface

### `/dashboard/costs/quota-share` — Página principal de pools

Componentes (todos em `src/app/(dashboard)/dashboard/costs/quota-share/`):

| Componente             | Finalidade                                                                                  |
| ---------------------- | ------------------------------------------------------------------------------------------- |
| `QuotaConceptCard`     | Card introdutório que explica o compartilhamento de cotas para novos usuários               |
| `CreatePoolModal`      | Cria um novo pool de cotas (conexão + nome + alocações iniciais)                            |
| `PoolCard`             | Resumo por pool: nome, conexão, quantidade de alocações                                     |
| `DimensionBar`         | Barra empilhada por dimensão: participação de cada chave + uso global                       |
| `AllocationTable`      | Tabela com consumo, cota justa, déficit/excedente e indicador de empréstimo                 |
| `BurnRateChart`        | Gráfico de linhas da taxa de consumo EMA (Recharts com carregamento adiado via `dynamic()`) |
| `EditAllocationsModal` | Edita pesos de alocação, limites e políticas de um pool                                     |

Hooks da página:

- `usePools` — busca `GET /api/quota/pools` a cada 30s.
- `usePoolUsage` — busca `GET /api/quota/pools/[id]/usage` sob demanda.
- `useLocalStoragePoolMigration` — executado uma vez na montagem para migrar dados legados do armazenamento local.

### `/dashboard/costs/quota-share/plans` — Configuração do plano do provedor

- `ProviderPlanConfigClient.tsx`: menu suspenso para selecionar um provedor, visualizar o
  plano resolvido (automaticamente pelo catálogo ou por substituição manual) e editar dimensões.
- As alterações são gravadas em `PUT /api/quota/plans/[connectionId]`.
- A exclusão reverte para o catálogo ou para um plano vazio.

---

## Variáveis de ambiente

| Variável                           | Padrão    | Descrição                                                         |
| ---------------------------------- | --------- | ----------------------------------------------------------------- |
| `QUOTA_STORE_DRIVER`               | `sqlite`  | Driver a ser usado: `sqlite` ou `redis`                           |
| `QUOTA_STORE_REDIS_URL`            | _(vazio)_ | URL do Redis, por exemplo, `redis://localhost:6379`               |
| `QUOTA_SATURATION_THRESHOLD`       | `0.5`     | 0..1; `>= threshold` ativa o modo estrito                         |
| `QUOTA_SOFT_DEPRIORITIZE_FACTOR`   | `0.7`     | 0..1; multiplicador da pontuação combinada da política suave      |
| `QUOTA_CONSUMPTION_RETENTION_DAYS` | `14`      | Dias antes de o GC remover buckets antigos de `quota_consumption` |

As configurações do banco de dados (`quotaStore.*`) substituem as variáveis de ambiente.

---

## Solução de problemas

### Redis configurado, mas não está se conectando

Verifique se `ioredis` está instalado (`npm ls ioredis`) e se `QUOTA_STORE_REDIS_URL`
está acessível. Em caso de falha de conexão, a factory recorre ao SQLite (registrado no
nível `warn`).

### `peek` retorna dados desatualizados / fail-open

Se `peek` lançar uma exceção, `enforceQuotaShare` tratará o resultado como "permitir" (fail-open).
Verifique nos logs do `pino` as entradas `quota:enforce` e `quota:factory` para identificar
a causa raiz.

### Divergência do contador de consumo

Se o uso real do provedor for diferente dos contadores, isso é esperado — a
janela deslizante de 2 buckets tem um erro de aproximadamente 1% nos limites da janela, e `consume` é
executado no modo fire-and-forget após a resposta. O sinal de saturação (`saturationSignals.ts`)
lê a utilização real do provedor com um TTL de 30s e ajusta `globalUsedPercent`
adequadamente.

### O pool mostra "sem dados" para a taxa de consumo

`computeBurnRate` requer pelo menos 2 amostras históricas. Novos pools sem chamadas
anteriores a `consume` exibirão `tokensPerSecond: 0` e `timeToExhaustionMs: null`.

---

## Migração do localStorage

Quando `/dashboard/costs/quota-share` é carregado pela primeira vez, o hook `useLocalStoragePoolMigration`
verifica:

1. `localStorage.getItem("omniroute:quota-share:pools")` não está vazio.
2. `GET /api/quota/pools` retorna `[]` (o banco de dados está vazio).

Se ambas as condições forem verdadeiras, ele envia cada pool legado para `POST /api/quota/pools` em lote
e, em seguida, remove a chave do localStorage. A migração é idempotente: a condição 2 impede
que a migração seja executada novamente.

---

## Classificação interna da estratégia

`quota-share` é uma estratégia de roteamento **exclusivamente interna** (`INTERNAL_ROUTING_STRATEGY_VALUES` em
`src/shared/constants/routingStrategies.ts`). Ela é usada exclusivamente por combos de pool `qtSd/`
gerados pelo sistema e é deliberadamente excluída de `ROUTING_STRATEGY_VALUES` para que nunca
apareça como uma opção selecionável pelo usuário na interface ou na API.

---

## Cobertura de testes

Duas camadas de cobertura automatizada acompanham o mecanismo quota-share:

| Suíte                 | Comando                                                                | O que abrange                                                                                                                                                                                                                            |
| :-------------------- | :--------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Unitários (29 testes) | `node --import tsx/esm --test tests/unit/quota-share-strategy.test.ts` | Agendador DRR, bloqueio por saturação, limites de simultaneidade, cálculo de fairShare, enfileiramento do backlog                                                                                                                        |
| Matriz de integração  | `npm run test:combo:matrix`                                            | Decisão de roteamento de ponta a ponta pelo pipeline real de combos; justiça do DRR + despriorização por saturação por meio de pontos de integração ativos (`registerQuotaFetcher`, `setLKGP`, `__setHeadroomSaturationFetcherForTests`) |

A matriz de integração é executada na CI junto com todas as 19 estratégias públicas. A suíte de testes unitários
pode ser executada de forma independente.

---

## Resumo do esquema do banco de dados

Três tabelas adicionadas pelas migrações `078`, `079` e `085`:

- `quota_pools` + `quota_allocations` — definições de pools e alocações por chave.
- `quota_consumption` — contadores contínuos de 2 buckets por `(apiKeyId, dimensionKey)`.
- `provider_plans` — substituições manuais dos planos de provedores (JSON de dimensões por connectionId).

Todas as tabelas foram adicionadas por meio de migrações idempotentes com `CREATE TABLE IF NOT EXISTS`.
