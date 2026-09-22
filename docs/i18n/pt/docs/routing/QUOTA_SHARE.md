# Quota Sharing Engine (Português (Portugal))

🌐 **Languages:** 🇺🇸 [English](../../../../routing/QUOTA_SHARE.md) · 🇪🇹 [am](../../../am/docs/routing/QUOTA_SHARE.md) · 🇸🇦 [ar](../../../ar/docs/routing/QUOTA_SHARE.md) · 🇦🇿 [az](../../../az/docs/routing/QUOTA_SHARE.md) · 🇧🇬 [bg](../../../bg/docs/routing/QUOTA_SHARE.md) · 🇧🇩 [bn](../../../bn/docs/routing/QUOTA_SHARE.md) · 🇨🇿 [cs](../../../cs/docs/routing/QUOTA_SHARE.md) · 🇩🇰 [da](../../../da/docs/routing/QUOTA_SHARE.md) · 🇩🇪 [de](../../../de/docs/routing/QUOTA_SHARE.md) · 🇬🇷 [el](../../../el/docs/routing/QUOTA_SHARE.md) · 🇪🇸 [es](../../../es/docs/routing/QUOTA_SHARE.md) · 🇪🇪 [et](../../../et/docs/routing/QUOTA_SHARE.md) · 🇮🇷 [fa](../../../fa/docs/routing/QUOTA_SHARE.md) · 🇫🇮 [fi](../../../fi/docs/routing/QUOTA_SHARE.md) · 🇫🇷 [fr](../../../fr/docs/routing/QUOTA_SHARE.md) · 🇮🇪 [ga](../../../ga/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [gu](../../../gu/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [ha](../../../ha/docs/routing/QUOTA_SHARE.md) · 🇮🇱 [he](../../../he/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [hi](../../../hi/docs/routing/QUOTA_SHARE.md) · 🇭🇷 [hr](../../../hr/docs/routing/QUOTA_SHARE.md) · 🇭🇺 [hu](../../../hu/docs/routing/QUOTA_SHARE.md) · 🇦🇲 [hy](../../../hy/docs/routing/QUOTA_SHARE.md) · 🇮🇩 [id](../../../id/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [ig](../../../ig/docs/routing/QUOTA_SHARE.md) · 🇮🇹 [it](../../../it/docs/routing/QUOTA_SHARE.md) · 🇯🇵 [ja](../../../ja/docs/routing/QUOTA_SHARE.md) · 🇬🇪 [ka](../../../ka/docs/routing/QUOTA_SHARE.md) · 🇰🇭 [km](../../../km/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [kn](../../../kn/docs/routing/QUOTA_SHARE.md) · 🇰🇷 [ko](../../../ko/docs/routing/QUOTA_SHARE.md) · 🇱🇹 [lt](../../../lt/docs/routing/QUOTA_SHARE.md) · 🇱🇻 [lv](../../../lv/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [ml](../../../ml/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [mr](../../../mr/docs/routing/QUOTA_SHARE.md) · 🇲🇾 [ms](../../../ms/docs/routing/QUOTA_SHARE.md) · 🇲🇹 [mt](../../../mt/docs/routing/QUOTA_SHARE.md) · 🇲🇲 [my](../../../my/docs/routing/QUOTA_SHARE.md) · 🇳🇵 [ne](../../../ne/docs/routing/QUOTA_SHARE.md) · 🇳🇱 [nl](../../../nl/docs/routing/QUOTA_SHARE.md) · 🇳🇴 [no](../../../no/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [or](../../../or/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [pa](../../../pa/docs/routing/QUOTA_SHARE.md) · 🇵🇭 [phi](../../../phi/docs/routing/QUOTA_SHARE.md) · 🇵🇱 [pl](../../../pl/docs/routing/QUOTA_SHARE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/QUOTA_SHARE.md) · 🇷🇴 [ro](../../../ro/docs/routing/QUOTA_SHARE.md) · 🇷🇺 [ru](../../../ru/docs/routing/QUOTA_SHARE.md) · 🇱🇰 [si](../../../si/docs/routing/QUOTA_SHARE.md) · 🇸🇰 [sk](../../../sk/docs/routing/QUOTA_SHARE.md) · 🇸🇮 [sl](../../../sl/docs/routing/QUOTA_SHARE.md) · 🇷🇸 [sr](../../../sr/docs/routing/QUOTA_SHARE.md) · 🇸🇪 [sv](../../../sv/docs/routing/QUOTA_SHARE.md) · 🇰🇪 [sw](../../../sw/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [ta](../../../ta/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [te](../../../te/docs/routing/QUOTA_SHARE.md) · 🇹🇭 [th](../../../th/docs/routing/QUOTA_SHARE.md) · 🇹🇷 [tr](../../../tr/docs/routing/QUOTA_SHARE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/QUOTA_SHARE.md) · 🇵🇰 [ur](../../../ur/docs/routing/QUOTA_SHARE.md) · 🇺🇿 [uz](../../../uz/docs/routing/QUOTA_SHARE.md) · 🇻🇳 [vi](../../../vi/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [yo](../../../yo/docs/routing/QUOTA_SHARE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/QUOTA_SHARE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/QUOTA_SHARE.md)

---

> **Referência do documento**: `docs/routing/QUOTA_SHARE.md`
> Parte do Grupo B (planos 16 + 22).

---

## Visão geral

O Motor de Partilha de Quotas distribui de forma justa a quota temporal de um fornecedor (por exemplo, janela de 5 horas do Codex, 1500 pedidos/h do Kimi) entre várias chaves de API que partilham a mesma ligação.

**Problema que resolve:** o OmniRoute encaminha várias chaves de API para a mesma conta do fornecedor a montante. Sem lógica de partilha, um pico de pedidos da chave A pode esgotar a quota do fornecedor para essa hora, deixando as chaves B e C bloqueadas até a janela ser reiniciada. O motor evita isto ao:

1. Monitorizar o consumo contínuo de cada chave por dimensão (%, pedidos, tokens, $).
2. Aplicar um algoritmo de partilha justa que conserva a capacidade: uma chave pode utilizar quotas inativas enquanto o conjunto global não estiver saturado.
3. Aplicar o resultado no caminho crítico (`chatCore.ts`) antes de o pedido chegar ao executor a montante.

---

## Algoritmo: Partilha Justa com Conservação de Capacidade

Implementado em `src/lib/quota/fairShare.ts`.

### Modos

| Condição                                   | Modo         | Comportamento                                                      |
| ------------------------------------------ | ------------ | ------------------------------------------------------------------ |
| `globalUsedPercent < saturationThreshold`  | **Generoso** | A chave pode utilizar até ao limite global menos o total consumido |
| `globalUsedPercent >= saturationThreshold` | **Estrito**  | Aplica rigorosamente a quota justa individual                      |

O valor predefinido de `saturationThreshold` é `0.5` (variável de ambiente `QUOTA_SATURATION_THRESHOLD`).

### Decisão por dimensão

Para cada dimensão ativa no conjunto, o motor calcula:

```
fairShareAllowed = limite do conjunto × (peso de alocação / 100)
consumed        = valor contínuo atual desta chave (de QuotaStore.peek)
remaining       = fairShareAllowed - consumed
```

Em seguida:

- **`policy = hard`**: se `consumed > fairShareAllowed` e o modo for estrito → **bloquear**.
- **`policy = soft`**: se `consumed > fairShareAllowed` e o modo for estrito → **penalizar** (reduzir a prioridade na combinação; nunca bloquear de forma rígida).
- **`policy = burst`**: permitir enquanto existir capacidade global disponível, independentemente da quota justa.

### Limite absoluto

`capValue` + `capUnit` numa alocação constituem um limite máximo rígido, independente do modo ou da política. Qualquer dimensão em que `consumed >= capValue` **bloqueia** sempre o pedido.

### Verificação multidimensional

Um pedido é bloqueado se **qualquer** dimensão do conjunto o bloquear. As dimensões são independentes — o esgotamento da percentagem de 5 horas não afeta a dimensão da percentagem semanal.

### Utilização de quotas disponíveis

No modo generoso, uma chave cuja alocação esteja subutilizada pode usar o excedente das quotas não utilizadas por outras chaves. A fórmula é:

```
maxAllowed = limite global - consumido pelas outras chaves
```

em que `consumedByOtherKeys = consumedTotal - consumedByThisKey`. O limite global (o `limit` do conjunto para essa dimensão) é sempre o limite máximo rígido.

---

## Contador de Janela Deslizante

Implementado em `src/lib/quota/sqliteQuotaStore.ts` e `redisQuotaStore.ts`.

Dois intervalos por `(apiKeyId, dimensionKey)`:

- `curr`: intervalo atual (`floor(nowMs / windowMs)`)
- `prev`: intervalo anterior (`curr - 1`)

Valor contínuo efetivo:

```
effectiveBucketIndex = floor(nowMs / windowMs)
bucketStartMs        = effectiveBucketIndex × windowMs
elapsed              = nowMs - bucketStartMs
weight               = 1 - elapsed / windowMs

effective = prev × weight + curr
```

**Precisão**: aproximadamente 99%. O erro é, no máximo, 1% do tamanho da janela no limite entre intervalos (inerente à aproximação de 2 intervalos).

### Concorrência

Controlador SQLite: um mutex em memória por chave `(apiKeyId | dimensionKey)` evita a condição de corrida de leitura-modificação-escrita. O padrão segue o mecanismo anti-thundering-herd de `src/sse/services/auth.ts`.

Controlador Redis: script Lua EVAL para incremento atómico — é executado como um único comando Redis.

---

## Drivers

### SQLite (predefinido, sem instalação)

- Tabela: `quota_consumption` (consulte a migração `073_quota_pools.sql` / `074_quota_consumption.sql`).
- Mais adequado para implementações de instância única.
- Toda a persistência é efetuada na BD SQLite existente do OmniRoute (`DATA_DIR/storage.sqlite`).

### Redis (opcional, várias instâncias)

- Requer o pacote npm `ioredis`.
- Os contadores são armazenados no Redis; os metadados (conjuntos/alocações) permanecem no SQLite.
- Mais adequado para implementações com várias réplicas, nas quais os contadores têm de ser partilhados.

### Alternar entre drivers

Através da interface de definições (`/dashboard/settings` → Armazenamento de Quotas), ou através de variáveis de ambiente:

```bash
QUOTA_STORE_DRIVER=redis
QUOTA_STORE_REDIS_URL=redis://localhost:6379
```

A definição da BD tem precedência sobre a variável de ambiente. Se `driver=redis`, mas o URL estiver ausente ou o
`ioredis` não estiver instalado, a fábrica reverte para SQLite e regista um aviso.

Ordem de seleção do driver:

1. Definição da BD `quotaStore.driver`
2. Variável de ambiente `QUOTA_STORE_DRIVER`
3. Predefinição: `sqlite`

---

## Múltiplas dimensões

Um conjunto pode ter várias dimensões. Cada dimensão é independente:

```ts
QuotaDimension {
  unit: "percent" | "requests" | "tokens" | "usd",
  window: "5h" | "hourly" | "daily" | "weekly" | "monthly",
  limit: number,  // limite máximo global do conjunto para esta dimensão
}
```

**Exemplo: plano Codex** (5h% + semanal%):

```json
[
  { "unit": "percent", "window": "5h", "limit": 100 },
  { "unit": "percent", "window": "weekly", "limit": 100 }
]
```

Um pedido tem de satisfazer todas as dimensões para ser permitido.

---

## Resolvedor de planos

Implementado em `src/lib/quota/planResolver.ts`.

Precedência (da mais alta para a mais baixa):

1. **Substituição manual na BD** — tabela `provider_plans`, por `connectionId`.
2. **Catálogo conhecido** — `src/lib/quota/planRegistry.ts` (apenas dados).
3. **Plano vazio** — sem dimensões; é necessária configuração manual.

### Catálogo conhecido

| Fornecedor            | Dimensões                                                     |
| --------------------- | ------------------------------------------------------------- |
| `codex`               | `percent/5h/100`, `percent/weekly/100`                        |
| `glm`                 | `tokens/5h` (limit=0, desconhecido), `tokens/weekly`          |
| `minimax`             | `tokens/5h`, `tokens/weekly`                                  |
| `bailian`             | `percent/5h/100`, `percent/weekly/100`, `percent/monthly/100` |
| `kimi`                | `requests/hourly/1500`                                        |
| `alibaba`             | `requests/monthly/90000`                                      |
| `openai`, `anthropic` | Sem predefinição — é necessária configuração manual           |

---

## Integração no pipeline

### Hook PRE (`open-sse/handlers/chatCore.ts`)

É executado antes do executor a montante, após as verificações de autenticação e políticas:

```
resolveComboTargets / handleSingleModel
  → enforceQuotaShare(apiKeyId, connectionId, provider, estimatedCost)
      → getQuotaStore().peek() por dimensão
      → fairShare.decideFairShare()
      → se bloquear → devolver 429 (buildErrorBody, Regra Rígida n.º 12)
      → se permitir + despriorizar → definir quotaSoftPenalty=true no candidato
  → executor.execute()
```

**Falha permissiva**: se `enforceQuotaShare` gerar uma exceção, o pedido é autorizado
com um registo `pino.warn`. Isto impede que um erro do motor de quotas bloqueie todo o
tráfego.

### Hook POST (registar consumo)

Após uma resposta bem-sucedida:

```
o executor devolve sucesso
  → spendRecorder.recordConsumption(apiKeyId, connectionId, provider, actualCost)
      → getQuotaStore().consume() por dimensão
      → falha permissiva: os erros são registados como pino.warn e nunca propagados ao cliente
```

**Nota sobre desvios**: se `consume` falhar após a resposta, o contador móvel fica abaixo do valor real.
O sinal de saturação do fornecedor (por exemplo, `anthropic-ratelimit-unified-5h-utilization`)
corrige a estimativa global no pedido seguinte.

### Penalização ligeira de combinação (`open-sse/services/combo.ts`)

Quando `decision.deprioritize === true`:

```ts
if (candidate.quotaSoftPenalty) {
  score *= QUOTA_SOFT_DEPRIORITIZE_FACTOR; // predefinição: 0.7
}
```

A penalização é aplicada depois de todos os outros fatores de pontuação. Reduz a
probabilidade de a combinação automática selecionar uma chave saturada sem a bloquear por completo.

---

## Visita Guiada à IU

### `/dashboard/costs/quota-share` — Página principal dos grupos

Componentes (todos em `src/app/(dashboard)/dashboard/costs/quota-share/`):

| Componente             | Finalidade                                                                                           |
| ---------------------- | ---------------------------------------------------------------------------------------------------- |
| `QuotaConceptCard`     | Cartão introdutório que explica a partilha de quotas a novos utilizadores                            |
| `CreatePoolModal`      | Criar um novo grupo de quotas (ligação + nome + alocações iniciais)                                  |
| `PoolCard`             | Resumo por grupo: nome, ligação, número de alocações                                                 |
| `DimensionBar`         | Barra empilhada por dimensão: quota de cada chave + utilização global                                |
| `AllocationTable`      | Tabela com consumo, quota justa, défice/excedente e indicador de empréstimo                          |
| `BurnRateChart`        | Gráfico de linhas da taxa de consumo EMA (Recharts com carregamento diferido através de `dynamic()`) |
| `EditAllocationsModal` | Editar ponderações, limites e políticas de alocação de um grupo                                      |

Os hooks da página:

- `usePools` — obtém `GET /api/quota/pools` a cada 30 s.
- `usePoolUsage` — obtém `GET /api/quota/pools/[id]/usage` mediante pedido.
- `useLocalStoragePoolMigration` — é executado uma vez ao montar, para migrar dados antigos do LS.

### `/dashboard/costs/quota-share/plans` — Configuração do plano do fornecedor

- `ProviderPlanConfigClient.tsx`: lista pendente para selecionar um fornecedor, consultar o
  plano resolvido (automaticamente a partir do catálogo ou por substituição manual) e editar dimensões.
- As alterações são gravadas através de `PUT /api/quota/plans/[connectionId]`.
- A eliminação reverte para o catálogo ou para um plano vazio.

---

## Variáveis de Ambiente

| Variável                           | Predefinição | Descrição                                                          |
| ---------------------------------- | ------------ | ------------------------------------------------------------------ |
| `QUOTA_STORE_DRIVER`               | `sqlite`     | Controlador a utilizar: `sqlite` ou `redis`                        |
| `QUOTA_STORE_REDIS_URL`            | _(vazio)_    | URL do Redis, por exemplo, `redis://localhost:6379`                |
| `QUOTA_SATURATION_THRESHOLD`       | `0.5`        | 0..1; `>= limiar` ativa o modo estrito                             |
| `QUOTA_SOFT_DEPRIORITIZE_FACTOR`   | `0.7`        | 0..1; multiplicador da pontuação combinada da política flexível    |
| `QUOTA_CONSUMPTION_RETENTION_DAYS` | `14`         | Dias até que o GC remova os buckets antigos de `quota_consumption` |

As definições da BD (`quotaStore.*`) substituem as variáveis de ambiente.

---

## Resolução de Problemas

### Redis configurado, mas sem estabelecer ligação

Verifique se `ioredis` está instalado (`npm ls ioredis`) e se `QUOTA_STORE_REDIS_URL`
está acessível. Em caso de falha de ligação, a fábrica recorre ao SQLite (registado
ao nível `warn`).

### `peek` devolve dados desatualizados / modo de falha aberta

Se `peek` lançar uma exceção, `enforceQuotaShare` interpreta o resultado como "permitir" (falha aberta).
Consulte os registos do `pino` para as entradas `quota:enforce` e `quota:factory`, a fim de identificar
a causa raiz.

### Desvio do contador de consumo

Se a utilização real do fornecedor diferir dos contadores, isso é esperado — a
janela deslizante de 2 buckets apresenta um erro de ~1% nos limites da janela, e `consume` é
executado sem aguardar resposta após a resposta. O sinal de saturação (`saturationSignals.ts`)
lê a utilização real do fornecedor com um TTL de 30 s e ajusta `globalUsedPercent`
em conformidade.

### O grupo apresenta "sem dados" para a taxa de consumo

`computeBurnRate` requer, pelo menos, 2 amostras históricas. Os novos grupos sem chamadas
`consume` anteriores apresentam `tokensPerSecond: 0` e `timeToExhaustionMs: null`.

---

## Migração a partir de localStorage

Quando `/dashboard/costs/quota-share` é carregado pela primeira vez, o hook `useLocalStoragePoolMigration`
verifica:

1. `localStorage.getItem("omniroute:quota-share:pools")` não está vazio.
2. `GET /api/quota/pools` devolve `[]` (a BD está vazia).

Se ambas as condições forem verdadeiras, envia cada pool legado em lote para `POST /api/quota/pools`
e, em seguida, remove a chave de localStorage. A migração é idempotente: a condição 2 impede
uma nova migração.

---

## Classificação da Estratégia Interna

`quota-share` é uma estratégia de encaminhamento **exclusivamente interna** (`INTERNAL_ROUTING_STRATEGY_VALUES` em
`src/shared/constants/routingStrategies.ts`). É utilizada exclusivamente por combinações de pools
`qtSd/` geradas pelo sistema e é deliberadamente excluída de `ROUTING_STRATEGY_VALUES`, para que nunca
apareça como uma opção selecionável pelo utilizador na IU ou na API.

---

## Cobertura de Testes

O motor quota-share inclui duas camadas de cobertura automatizada:

| Conjunto             | Comando                                                                | O que abrange                                                                                                                                                                                                                                        |
| :------------------- | :--------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Unitário (29 testes) | `node --import tsx/esm --test tests/unit/quota-share-strategy.test.ts` | Agendador DRR, controlo de saturação, limites de simultaneidade, cálculos de fairShare, colocação em fila do backlog                                                                                                                                 |
| Matriz de integração | `npm run test:combo:matrix`                                            | Decisão de encaminhamento de ponta a ponta através do pipeline real de combinações; equidade DRR + despriorização por saturação através de pontos de integração ativos (`registerQuotaFetcher`, `setLKGP`, `__setHeadroomSaturationFetcherForTests`) |

A matriz de integração é executada em CI juntamente com as 19 estratégias públicas. O conjunto de testes unitários
pode ser executado de forma autónoma.

---

## Resumo do Esquema da BD

Três tabelas adicionadas pelas migrações `078`, `079` e `085`:

- `quota_pools` + `quota_allocations` — definições de pools e alocações por chave.
- `quota_consumption` — contadores móveis de 2 buckets por `(apiKeyId, dimensionKey)`.
- `provider_plans` — substituições manuais dos planos dos fornecedores (dimensões em JSON por connectionId).

Todas as tabelas são adicionadas através de migrações idempotentes `CREATE TABLE IF NOT EXISTS`.
