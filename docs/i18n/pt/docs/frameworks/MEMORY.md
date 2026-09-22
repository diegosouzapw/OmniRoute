# Memory System (Português (Portugal))

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/MEMORY.md) · 🇪🇹 [am](../../../am/docs/frameworks/MEMORY.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/MEMORY.md) · 🇦🇿 [az](../../../az/docs/frameworks/MEMORY.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/MEMORY.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/MEMORY.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/MEMORY.md) · 🇩🇰 [da](../../../da/docs/frameworks/MEMORY.md) · 🇩🇪 [de](../../../de/docs/frameworks/MEMORY.md) · 🇬🇷 [el](../../../el/docs/frameworks/MEMORY.md) · 🇪🇸 [es](../../../es/docs/frameworks/MEMORY.md) · 🇪🇪 [et](../../../et/docs/frameworks/MEMORY.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/MEMORY.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/MEMORY.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/MEMORY.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/MEMORY.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/MEMORY.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/MEMORY.md) · 🇮🇱 [he](../../../he/docs/frameworks/MEMORY.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/MEMORY.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/MEMORY.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/MEMORY.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/MEMORY.md) · 🇮🇩 [id](../../../id/docs/frameworks/MEMORY.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/MEMORY.md) · 🇮🇹 [it](../../../it/docs/frameworks/MEMORY.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/MEMORY.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/MEMORY.md) · 🇰🇭 [km](../../../km/docs/frameworks/MEMORY.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/MEMORY.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/MEMORY.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/MEMORY.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/MEMORY.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/MEMORY.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/MEMORY.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/MEMORY.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/MEMORY.md) · 🇲🇲 [my](../../../my/docs/frameworks/MEMORY.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/MEMORY.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/MEMORY.md) · 🇳🇴 [no](../../../no/docs/frameworks/MEMORY.md) · 🇮🇳 [or](../../../or/docs/frameworks/MEMORY.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/MEMORY.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/MEMORY.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/MEMORY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/MEMORY.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/MEMORY.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/MEMORY.md) · 🇱🇰 [si](../../../si/docs/frameworks/MEMORY.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/MEMORY.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/MEMORY.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/MEMORY.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/MEMORY.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/MEMORY.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/MEMORY.md) · 🇮🇳 [te](../../../te/docs/frameworks/MEMORY.md) · 🇹🇭 [th](../../../th/docs/frameworks/MEMORY.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/MEMORY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/MEMORY.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/MEMORY.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/MEMORY.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/MEMORY.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/MEMORY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/MEMORY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/MEMORY.md)

---

> **Fonte fidedigna:** `src/lib/memory/` e `src/app/api/memory/`
> **Última atualização:** 2026-06-28 — v3.8.40 (desativada por predefinição + recuperação de quantização int8)

O OmniRoute fornece memória conversacional persistente associada à chave de API (e,
opcionalmente, ao ID da sessão). As memórias são extraídas automaticamente das respostas
do LLM através de correspondência leve de padrões com expressões regulares e reinjetadas
nos pedidos subsequentes como uma mensagem de sistema inicial (ou como a primeira mensagem
do utilizador para fornecedores que rejeitem a função de sistema).

> **A memória está DESATIVADA por predefinição (v3.8.30+).** `DEFAULT_MEMORY_SETTINGS.enabled`
> é agora `false` (`src/lib/memory/settings.ts`). A ativação da memória injeta até
> `maxTokens` (~2k) de contexto recuperado em **todos** os pedidos de conversação, o que é
> faturado — um custo inesperado para novas instalações e para clientes que gerem o seu
> próprio contexto. Ative-a explicitamente em **Definições → Memória** (o
> `MemorySkillsTab` apresenta um aviso sobre o custo de tokens quando a memória está ativada).
> Um cliente pode excluir um único pedido através do cabeçalho de pedido
> `x-omniroute-no-memory` (`true`/`1`/`yes`) — consulte a tabela de cabeçalhos de pedido em
> [API_REFERENCE.md](../reference/API_REFERENCE.md). Um pedido sem memória define
> `memoryOwnerId = null`, o que desativa **tanto** a injeção de memória como a de competências
> nesse pedido (`open-sse/handlers/chatCore/headers.ts::isNoMemoryRequested`).

A memória tem um **âmbito por chave de API**, não por utilizador — todos os pedidos autenticados
com a mesma chave de API partilham o mesmo conjunto de memórias, com a possibilidade de restringir
adicionalmente o âmbito através de `sessionId`.

## Arquitetura

```
Cliente → /v1/chat/completions (apiKeyInfo resolvido anteriormente)
  → handleChatCore() [open-sse/handlers/chatCore.ts]
    → resolveMemoryOwnerId(apiKeyInfo)        # extrai o ID
    → getMemorySettings()                     # definições em cache
    → shouldInjectMemory(body, {enabled})     # controlo
    → retrieveMemories(apiKeyId, config)      # SQL + FTS5 + vetor opcional
    → injectMemory(body, memories, provider)  # mensagem de sistema ou do utilizador
  → chamada ao fornecedor a montante
  → na resposta: extractFacts(text, apiKeyId, sessionId)  # não bloqueante
    → setImmediate → createMemory(fact) por correspondência
                   → embed(content) + upsertVector(id, vec)
```

Os pontos de chamada de injeção e extração estão ligados em
`open-sse/handlers/chatCore.ts` (procure `retrieveMemories`, `injectMemory`
e `extractFacts`).

## Arquitetura do motor (resolução em 3 níveis)

O Motor de Memória determina o caminho de recuperação em tempo de execução com base na
infraestrutura e nas definições disponíveis. Existem três níveis, aplicados por ordem de prioridade:

```
  ┌─────────────────────────────────────────────────────────────┐
  │  NÍVEL 0 — Palavra-chave (FTS5)                              │
  │  Disponibilidade determinada por sondagem: FTS5 quando a     │
  │  compilação do SQLite o suporta (better-sqlite3 /            │
  │  node:sqlite / bun:sqlite); indisponível em compilações sem  │
  │  FTS5 (por exemplo, sql.js/WASM — "no such module: fts5").   │
  │  Utilizado quando strategy = "exact" ou como alternativa;    │
  │  a palavra-chave do estado do motor reflete a sondagem.      │
  └──────────────────────────────────┬──────────────────────────┘
                                     │ strategy = semantic|hybrid?
                                     ▼
  ┌─────────────────────────────────────────────────────────────┐
  │  NÍVEL 1 — Vetor incorporado (sqlite-vec)                    │
  │  sqlite-vec v0.1.9 carregado através de db.loadExtension().  │
  │  KNN por força bruta sobre vetores Float32. Ativo quando:    │
  │   • o loadExtension do sqlite-vec é bem-sucedido             │
  │   • está disponível uma origem de incorporações (remote |    │
  │     static | transformers) capaz de produzir Float32Array    │
  │   • existe a tabela vec_memories (criada no primeiro ready())│
  └──────────────────────────────────┬──────────────────────────┘
                                     │ qdrant.enabled?
                                     ▼
  ┌─────────────────────────────────────────────────────────────┐
  │  NÍVEL 2 — Qdrant (base de dados vetorial externa opcional)  │
  │  Quando ativado, substitui o sqlite-vec para semantic/hybrid.│
  │  Requer uma instância Qdrant em execução e host/porta        │
  │  configurados.                                               │
  └─────────────────────────────────────────────────────────────┘
```

A degradação é automática e transparente:

- Se o sqlite-vec não for carregado, o nível 1 fica indisponível → recorre ao nível 0.
- Se a origem de incorporações devolver um erro, o nível 1 recorre ao nível 0.
- Se o Qdrant não estiver operacional, o nível 2 recorre ao nível 1 (ou ao nível 0 se o nível 1
  também estiver indisponível).

## Fontes de embeddings

A camada de embeddings (`src/lib/memory/embedding/`) determina a fonte a utilizar
com base em `MemorySettingsExtended.embeddingSource`:

| Fonte          | Descrição                                                                                             | Chave necessária | Arranque a frio     |
| -------------- | ----------------------------------------------------------------------------------------------------- | ---------------- | ------------------- |
| `remote`       | Utiliza a API de embeddings de um fornecedor configurado (OpenAI, Cohere, etc.)                       | Sim              | Nenhum              |
| `static`       | Embedding local por tabela de consulta através de `potion-base-8M` (WordPiece + agregação pela média) | Não              | ~200ms              |
| `transformers` | Inferência ONNX local através de `@huggingface/transformers` v4, `all-MiniLM-L6-v2`                   | Não              | ~3s + ~400MB de RAM |
| `auto`         | Resolução em tempo de execução: remota (se existir uma chave) → estática → transformers → null        | Depende          | Depende             |

**Ordem de resolução para `auto`:**

1. Encontrar o primeiro fornecedor em `listEmbeddingProviders()` com `hasKey === true` → `remote`.
2. Se `settings.staticEnabled === true` → `static`.
3. Se `settings.transformersEnabled === true` → `transformers`.
4. Caso contrário → `null` (degrada para pesquisa por palavras-chave FTS5).

A cache de embeddings (`src/lib/memory/embedding/cache.ts`) utiliza um mapa LRU
em memória, indexado por `${source}:${model}:${dim}:${sha256(text)}`, limitado a
`MEMORY_EMBEDDING_CACHE_MAX` entradas (predefinição: 1000), com um TTL de
`MEMORY_EMBEDDING_CACHE_TTL_MS` (predefinição: 5 min). É partilhada entre todos os
consumidores durante o ciclo de vida do processo.

## RRF híbrido (k=60)

Quando `strategy = "hybrid"` e o armazenamento vetorial está disponível, a recuperação utiliza
Reciprocal Rank Fusion para combinar os resultados FTS5 e vetoriais:

```
RRF(d) = Σ  1 / (k + rank_i(d))      onde k = 60 (configurável através de MEMORY_RRF_K)
          i
```

Mais concretamente:

1. Executar a pesquisa FTS5 → lista ordenada `R_fts` (posição 1..N).
2. Executar a pesquisa vetorial KNN → lista ordenada `R_vec` (posição 1..M).
3. Para cada `memoryId` único:  
   `rrf_score = 1/(60 + fts_rank)` + `1/(60 + vec_rank)` (0 se não estiver na lista).
4. Ordenar por `rrf_score` DESC e aplicar o percurso do orçamento de tokens.

É amplamente reconhecido que o RRF é eficaz sem necessitar de normalização das pontuações entre
sistemas de recuperação heterogéneos. O valor predefinido `k=60` provém do artigo original de
Cormack et al. e funciona bem para corpora pequenos (<10k memórias).

## Preenchimento retroativo (preguiçoso + reindexação)

Quando o modelo de embeddings é alterado (detetado através de `embedding_signature`), o
armazenamento vetorial é reconstruído e todas as memórias existentes são marcadas com
`needs_reindex = 1` na tabela `memories`.

**Preenchimento retroativo preguiçoso**: Na recuperação seguinte, qualquer memória sem uma entrada vetorial é
convertida num embedding e inserida em `vec_memories` antes de a pesquisa ser executada. Isto
amortiza o custo do preenchimento retroativo ao longo de pedidos reais, sem bloquear o arranque.

**Reindexação explícita**: O separador Engine em `/dashboard/memory` disponibiliza um botão
"Reindexar agora" que chama `POST /api/memory/reindex`. O processador chama
`runReindexBatch()` a partir de `src/lib/memory/reindex.ts`, que processa até
`limit` entradas pendentes por pedido. O progresso pode ser consultado através de
`GET /api/memory/engine-status` (`vectorStore.needsReindex`).

A tabela `memory_vec_meta` (migração `083_memory_vec.sql`) armazena:

- `active_dim` — dimensão vetorial atual (null = ainda não calibrada).
- `embedding_signature` — `${source}:${model}:${dim}` utilizada para detetar alterações.
- `last_reset_at` — carimbo de data/hora da última reposição completa.
- `vec_loaded` — indicador 0/1 que assinala se sqlite-vec foi carregado com êxito.

## Extensão das definições

Estão disponíveis nove campos de embeddings e vetores em `MemorySettingsExtended`, em
`src/shared/schemas/memory.ts`, persistidos através de `src/lib/db/settings.ts`:

| Campo                    | Tipo                                               | Predefinição | Descrição                                                        |
| ------------------------ | -------------------------------------------------- | ------------ | ---------------------------------------------------------------- |
| `embeddingSource`        | `"remote" \| "static" \| "transformers" \| "auto"` | `"auto"`     | Fonte de embeddings a utilizar                                   |
| `embeddingProviderModel` | `string \| null`                                   | `null`       | Fornecedor/modelo no formato `provider/model`                    |
| `customBaseUrl`          | `string \| null`                                   | `null`       | URL base de endpoint compatível com OpenAI apenas para a memória |
| `customModelId`          | `string \| null`                                   | `null`       | ID do modelo enviado para o endpoint personalizado               |
| `transformersEnabled`    | `boolean`                                          | `false`      | Adesão ao Transformers.js (MiniLM, ~400MB)                       |
| `staticEnabled`          | `boolean`                                          | `false`      | Adesão ao modelo local estático potion-base-8M                   |
| `rerankEnabled`          | `boolean`                                          | `false`      | Ativar a etapa de reordenação (adiciona +200-500ms/pedido)       |
| `rerankProviderModel`    | `string \| null`                                   | `null`       | Fornecedor/modelo de reordenação no formato `provider/model`     |

`rerankProviderModel` é resolvido por `POST /v1/rerank` (invocado através de loopback), pelo que aceita tudo o que essa rota aceita: um modelo de reordenação na nuvem selecionado (`cohere/rerank-v3.5`, `jina-ai/jina-reranker-v3.5`, …) ou um nó de fornecedor compatível com OpenAI no formato `<node-prefix>/<model>` (por exemplo, `skilled-mini/bge-reranker-v2-m3` para uma instância TEI/Infinity). Os nós de loopback são sempre elegíveis; um nó noutro anfitrião (LAN, Tailscale) requer adicionalmente o sinalizador de funcionalidade `RERANK_REMOTE_PROVIDER_NODES` e tem de cumprir a política de URLs de saída do fornecedor — consulte [Sinalizadores de funcionalidade](../reference/FEATURE_FLAGS.md). O seletor do painel apresenta os fornecedores selecionados e os nós locais; qualquer cadeia `provider/model` válida pode ser definida diretamente através de `PUT /api/settings/memory`.
| `vectorStore` | `"sqlite-vec" \| "qdrant" \| "auto"` | `"auto"` | Backend vetorial a utilizar |

Estes campos são expostos através de `GET /PUT /api/settings/memory` (esquema `MemorySettingsExtendedSchema`).

Para a origem `remote`, o Memory também aceita as definições opcionais `customBaseUrl` e
`customModelId`. Em conjunto, estas selecionam um endpoint `/embeddings` compatível com
OpenAI e um modelo sem alterar o registo global de embeddings. O endpoint é
normalizado antes da utilização e verificado pela política de URLs de saída do fornecedor:
é obrigatório usar HTTP(S), as credenciais incorporadas e as cadeias de consulta são
rejeitadas, e os endereços de metadados da nuvem permanecem bloqueados. Os valores vazios
preservam o fornecedor selecionado no registo. Os erros devolvidos ao painel são
sanitizados e as credenciais do endpoint nunca são registadas.

> **TODO (D20):** O âmbito `global` (partilha de memórias entre todas as chaves de API) não
> está implementado nesta versão. Requer alterações ao esquema e um caminho de recuperação
> global. Acompanhar separadamente.

## Camadas de armazenamento

### Principal: SQLite (tabela `memories`)

Criada pela migração `015_create_memories.sql`:

| Coluna                      | Tipo               | Notas                                                                          |
| --------------------------- | ------------------ | ------------------------------------------------------------------------------ |
| `id`                        | `TEXT PRIMARY KEY` | UUID gerado através de `crypto.randomUUID()`                                   |
| `api_key_id`                | `TEXT NOT NULL`    | Chave de API proprietária                                                      |
| `session_id`                | `TEXT`             | Âmbito opcional por conversa                                                   |
| `type`                      | `TEXT NOT NULL`    | Um de `factual`, `episodic`, `procedural`, `semantic`                          |
| `key`                       | `TEXT`             | Chave de upsert estável, por exemplo, `preference:i_prefer_python`             |
| `content`                   | `TEXT NOT NULL`    | O texto efetivo do facto                                                       |
| `metadata`                  | `TEXT`             | Bloco JSON (category, extractedAt, source, ...)                                |
| `created_at` / `updated_at` | `TEXT`             | Cadeias ISO 8601                                                               |
| `expires_at`                | `TEXT`             | Expiração opcional; `NULL` significa permanente                                |
| `memory_id`                 | `INTEGER UNIQUE`   | Adicionada por `023_fix_memory_fts_uuid.sql` para ligar UUIDs ↔ rowids do FTS5 |

Índices: `api_key_id`, `session_id`, `type`, `expires_at`, além do índice
único `memory_id`.

**Semântica de upsert**: `createMemory()` procura uma linha existente com o mesmo
`(api_key_id, key)` e atualiza-a no local quando é encontrada (combinando `metadata`
através de uma expansão superficial). Isto impede que a tabela cresça sem limites
devido a declarações de preferências repetidas.

### Pesquisa de texto integral (tabela virtual `memory_fts`)

`022_add_memory_fts5.sql` cria uma tabela virtual FTS5 sobre `content` e
`key`. `023_fix_memory_fts_uuid.sql` corrige um erro real em que a chave primária
UUID não era associada ao rowid inteiro do FTS5 — a migração adiciona a coluna
`memory_id`, recria a tabela FTS e configura triggers
(`memory_fts_ai`, `memory_fts_ad`, `memory_fts_au`) que mantêm o FTS sincronizado em
INSERT, DELETE e UPDATE.

Utilizada por `retrieval.ts` para as estratégias `semantic` e `hybrid` (ver abaixo).
O código de recuperação verifica com `hasTable("memory_fts")` e recorre à
ordem cronológica se a tabela FTS estiver ausente ou se a consulta FTS gerar um erro.

### Opcional: Qdrant (nível 2 do armazenamento vetorial)

`src/lib/memory/qdrant.ts` implementa uma integração opcional com o Qdrant como
armazenamento vetorial de nível 2. A recuperação só é encaminhada para o Qdrant
quando o seletor do motor `memoryVectorStore === "qdrant"` — a predefinição
`"auto"` (e `"sqlite-vec"`) **nunca** seleciona o Qdrant. O seletor do separador
Engine define **ambos** `qdrantEnabled` e `memoryVectorStore` em conjunto: a
ativação torna o Qdrant no armazenamento principal e a desativação repõe `"auto"`
(#5597 — antes dessa correção, a ativação não tinha efeito porque nada escrevia no
seletor do motor). Se o Qdrant estiver inacessível ou não devolver resultados, a
recuperação recorre a sqlite-vec → FTS5.

- `upsertSemanticMemoryPoint()` — gera o embedding de `key + content` com o modelo de
  embedding configurado, garante que a coleção existe (cria vetores com distância
  de cosseno na primeira utilização) e insere ou atualiza um ponto com o payload `{memoryId,
apiKeyId, sessionId, key, content, metadata, createdAtUnix, expiresAtUnix}`.
- `searchSemanticMemory(query, topK, scope)` — gera o embedding da consulta, pesquisa na
  coleção filtrada por `kind = "omniroute_memory"` e, opcionalmente, por
  `apiKeyId` / `sessionId`. Limita `topK` ao intervalo `[1, 20]`.
- `deleteSemanticMemoryPoint(id)` — elimina um único ponto. É chamada por
  `deleteMemory()` depois de a linha SQLite ser removida (D15).
- `cleanupSemanticMemoryPoints({retentionDays})` — elimina em massa os pontos cujo
  `expiresAtUnix` já passou ou cujo `createdAtUnix` é anterior ao limite de
  retenção. Efetua primeiro a contagem para que o painel possa apresentar os números reais.
- `checkQdrantHealth()` — sonda de estado `GET /readyz` com latência.

A interface de definições disponibiliza a configuração do Qdrant, a verificação de estado, o teste
de pesquisa semântica e a limpeza no **separador Engine** de `/dashboard/memory`. As rotas
correspondentes em `src/app/api/settings/qdrant/` estão todas ligadas desde a v3.8.6:

| Rota                                    | Método        | Descrição                               |
| --------------------------------------- | ------------- | --------------------------------------- |
| `/api/settings/qdrant`                  | `GET` / `PUT` | Ler / atualizar definições do Qdrant    |
| `/api/settings/qdrant/health`           | `GET`         | Sonda de atividade + latência           |
| `/api/settings/qdrant/search`           | `POST`        | Teste de pesquisa semântica             |
| `/api/settings/qdrant/cleanup`          | `POST`        | Remover pontos expirados / antigos      |
| `/api/settings/qdrant/embedding-models` | `GET`         | Listar modelos de embedding disponíveis |

**Notas de comportamento (o que esperar):**

- **Seleção do motor** — ativar o Qdrant no separador Engine torna-o no armazenamento
  principal (define `memoryVectorStore="qdrant"`); desativá-lo repõe `"auto"` (#5597).
- **Sem preenchimento retroativo** — apenas as memórias criadas/atualizadas **depois** de o Qdrant ser
  ativado são nele gravadas (escrita dupla assíncrona sem espera). As memórias SQLite preexistentes **não**
  são migradas; "Reindex Now" reconstrói apenas o índice sqlite-vec, não o Qdrant.
- **A dimensão vetorial é detetada automaticamente** a partir do embedding efetivo na primeira utilização — não
  existe qualquer campo de dimensão para preencher. A alteração do modelo de embedding depois de uma coleção
  existir **não** é tratada automaticamente: a coleção existente permanece inalterada, e as escritas/pesquisas
  com dimensões incompatíveis falham e recorrem ao sqlite-vec. Recrie a coleção
  (com um novo nome ou eliminando-a no Qdrant) para mudar de modelo de embedding.
- **Métrica de distância** — sempre **Cosseno** (definida diretamente no código durante a criação da coleção; não
  configurável).
- **Autenticação** — apenas chave de API (enviada no cabeçalho `api-key`; opcional para Docker local sem
  autenticação). JWT/RBAC não são utilizados.
- **Campos de configuração** — a interface disponibiliza `host`, `port`, `collection`, `embeddingModel`,
  `apiKey`. `vectorSize` / `hnswEfConstruct` estão disponíveis apenas através do ambiente/BD, e `vectorSize` não é
  utilizado para criar a coleção (a dimensão provém do embedding).

### Quantização vetorial (int8 — adesão opcional, ambos os backends)

Ambos os backends vetoriais suportam **quantização int8 opcional** para reduzir a utilização
de memória dos vetores armazenados (aproximadamente 4× menor do que Float32), com um pequeno custo na revocação.
A predefinição é **desativada** em ambos — os vetores mantêm a precisão total, a menos que seja
explicitamente ativada.

| Backend    | Definição                            | Tipo                           | Predefinição | Onde é lida                                                 |
| ---------- | ------------------------------------ | ------------------------------ | ------------ | ----------------------------------------------------------- |
| Qdrant     | `qdrantQuantization` (chave BD)      | `"none" \| "int8" \| "binary"` | `"none"`     | `src/lib/memory/qdrant.ts::normalizeQdrantConfig()`         |
| sqlite-vec | `MEMORY_VEC_QUANTIZATION` (ambiente) | `"none" \| "int8"`             | `"none"`     | `src/lib/memory/vectorStore.ts::requestedVecQuantization()` |

- O **Qdrant** é configurado por instância através da chave de definição
  `qdrantQuantization` (disponibilizada como o campo `quantization` em `PUT /api/settings/qdrant`). Quando
  definida como `"int8"`, `buildQuantizationConfig()` solicita quantização escalar
  (`always_ram`, quantil `0.99`) e as pesquisas ativam `rescore: true` para que os
  vetores de precisão total refinem o conjunto de candidatos int8.
- A quantização do **sqlite-vec** é configurada **apenas através do ambiente** (não é uma definição da BD): defina
  `MEMORY_VEC_QUANTIZATION=int8` para armazenar os vetores locais como uma coluna `int8[dim]`
  através de `vec_quantize_int8(?, 'unit')`. O modo escolhido é incorporado na
  `embedding_signature` (um sufixo `:int8`), pelo que a mudança de modo desencadeia uma
  reindexação completa da tabela `vec_memories` — o mesmo processo de preenchimento retroativo diferido utilizado quando
  o modelo de embedding é alterado.

## Tipos de memória

`MemoryType` (`src/lib/memory/types.ts`):

| Tipo         | Utilizado para                                                                           |
| ------------ | ---------------------------------------------------------------------------------------- |
| `factual`    | Preferências, factos estáveis do utilizador, padrões comportamentais                     |
| `episodic`   | Decisões associadas a um momento específico ("Escolhi o Postgres")                       |
| `procedural` | Memória de fluxos de trabalho/instruções (reservada; atualmente sem extrator automático) |
| `semantic`   | Reservada para entradas do armazenamento vetorial                                        |

A estratégia de obtenção de `MemoryConfig` é `exact`, `semantic` ou `hybrid`,
e o âmbito é `session`, `apiKey` ou `global`. O âmbito predefinido de
`getMemorySettings()` é `apiKey`.

## Extração de factos (`extraction.ts`)

A extração é **baseada em expressões regulares**, não num LLM — é executada no processo com
`setImmediate()`, para nunca bloquear o fluxo da resposta:

- **Padrões de preferência** → `MemoryType.FACTUAL`
  (por exemplo, `Prefiro …`, `Gosto muito de …`, `o meu favorito é …`, `Odeio …`)
- **Padrões de decisão** → `MemoryType.EPISODIC`
  (por exemplo, `Vou utilizar …`, `Escolhi …`, `Optei por …`, `Vou adotar …`)
- **Padrões comportamentais** → `MemoryType.FACTUAL`
  (por exemplo, `Normalmente …`, `Faço sempre …`, `Tenho tendência para …`)

Cada correspondência é sanitizada (`trim`, redução de espaços em branco, limitada a 500 caracteres),
desduplicada dentro do lote através de uma `factKey(category, content)` estável e
armazenada através de `createMemory()` com os metadados
`{category, extractedAt, source: "llm_response"}`. O texto de entrada é limitado a
64 KiB (`MAX_EXTRACTION_TEXT_LENGTH`) — quando é mais longo, é utilizada a **parte final** do texto
para garantir que o conteúdo mais recente do assistente é sempre considerado.

`extractFactsFromText(text)` é exportada para testes e devolve os factos estruturados
sem os armazenar.

## Obtenção (`retrieval.ts`)

`retrieveMemories(apiKeyId, config)` é o ponto de entrada principal. Esta função:

1. Normaliza e valida a configuração através de `MemoryConfigSchema`.
2. Devolve imediatamente `[]` quando `enabled` é falso ou `maxTokens <= 0`.
3. Limita `maxTokens` ao intervalo `[1, 8000]`.
4. Deteta se a tabela moderna `memories` existe (em vez da tabela legada `memory`)
   para que as bases de dados mais antigas continuem a funcionar.
5. Constrói a consulta base com a proteção de expiração
   (`expires_at IS NULL OR datetime(expires_at) > datetime('now')`), um âmbito de
   sessão opcional e um limite opcional de `retentionDays`.
6. Ramifica com base na estratégia:
   - **`exact`** (predefinida): ordem cronológica `ORDER BY created_at DESC LIMIT 100`.
   - **`semantic`**: se `config.query` estiver definida e `memory_fts` existir, efetua um JOIN com
     `memory_fts MATCH ?` e ordena por classificação FTS; recorre à ordem cronológica
     quando o FTS devolve 0 linhas.
   - **`hybrid`**: união dos resultados FTS (maior relevância) com o
     conjunto cronológico, desduplicada por id.
7. Calcula uma pontuação de relevância de palavras-chave (`getRelevanceScore`) sobre
   `content`, `key` e o JSON de `metadata` quando é fornecida uma consulta. As linhas com
   pontuação zero são filtradas.
8. Ordena pela pontuação em ordem decrescente e, em seguida, por `createdAt` em ordem decrescente.
9. Percorre a lista ordenada e aceita entradas enquanto o valor acumulado de
   `estimateTokens(content)` (≈ `length / 4`) permanecer dentro do orçamento. Devolve
   sempre pelo menos uma entrada quando existe alguma correspondência.

`estimateTokens` é exportada e utilizada pela obtenção, pelo resumo e pela ferramenta MCP
`omniroute_memory_search`.

## Injeção (`injection.ts`)

`injectMemory(request, memories, provider)`:

1. Agrega todos os conteúdos da memória numa única cadeia `Memory context: …`.
2. Seleciona uma estratégia pelo nome do fornecedor:
   - **Mensagem de sistema** (predefinição para OpenAI, Anthropic, Gemini, …) — adiciona
     uma `{role: "system", content: memoryText}` antes de quaisquer mensagens de sistema
     existentes, para que os pedidos de sistema do utilizador continuem a ter precedência.
   - **Mensagem do utilizador** (alternativa) — para fornecedores em
     `PROVIDERS_WITHOUT_SYSTEM_MESSAGE`: `o1`, `o1-mini`, `o1-preview`,
     `glm`, `glmt`, `glm-cn`, `zai`, `qianfan`. Estes rejeitam a função de sistema
     e, caso contrário, devolveriam um erro 400 (cf. problema #1701 para GLM/Zhipu).
3. Regista a contagem, a estratégia e o modelo em `memory.injection.injected`.

`providerSupportsSystemMessage(provider)` é exportada para os chamadores que necessitem de
tomar as suas próprias decisões de encaminhamento. Por segurança, os fornecedores desconhecidos têm
como predefinição `true` (função de sistema permitida).

## Definições (`settings.ts`)

A configuração da memória é **armazenada na tabela de definições da BD**, não em variáveis de ambiente.
`getMemorySettings()` lê a partir de `getSettings()` e coloca o resultado em cache
no processo; `invalidateMemorySettingsCache()` é chamada pela rota PUT das definições
após as escritas.

### Campos legados (todas as versões)

| Chave da BD           | Tipo    | Predefinição                                        | Controlo da IU                                                   |
| --------------------- | ------- | --------------------------------------------------- | ---------------------------------------------------------------- |
| `memoryEnabled`       | boolean | `false` (desativada por predefinição desde v3.8.30) | Ativar/desativar memória                                         |
| `memoryMaxTokens`     | integer | `2000` (intervalo `0–16000`)                        | Orçamento de tokens para injeção                                 |
| `memoryRetentionDays` | integer | `30` (intervalo `1–365`)                            | Período de retenção                                              |
| `memoryStrategy`      | enum    | `"hybrid"` (um de `recent`, `semantic`, `hybrid`)   | Estratégia de recuperação                                        |
| `skillsEnabled`       | boolean | `false`                                             | Alterna a injeção de competências por chave (consulte SKILLS.md) |

Nota: a estratégia `"recent"` da IU corresponde à estratégia de recuperação
interna `"exact"` através de `toMemoryRetrievalConfig()` (ordem cronológica).

### Novos campos (v3.8.6, plano 21 D9)

Consulte também a secção "Extensão das definições" acima para obter descrições dos campos.

| Chave da BD                 | Campo da API             | Predefinição |
| --------------------------- | ------------------------ | ------------ |
| `memoryEmbeddingSource`     | `embeddingSource`        | `"auto"`     |
| `memoryEmbeddingModel`      | `embeddingProviderModel` | `null`       |
| `memoryTransformersEnabled` | `transformersEnabled`    | `false`      |
| `memoryStaticEnabled`       | `staticEnabled`          | `false`      |
| `memoryRerankEnabled`       | `rerankEnabled`          | `false`      |
| `memoryRerankModel`         | `rerankProviderModel`    | `null`       |
| `memoryVectorStore`         | `vectorStore`            | `"auto"`     |

As chaves da BD relacionadas com o Qdrant (`qdrantEnabled`, `qdrantHost`, `qdrantPort`,
`qdrantApiKey`, `qdrantCollection` com a predefinição `"omniroute_memory"`,
`qdrantEmbeddingModel` com a predefinição `"openai/text-embedding-3-small"`) são lidas por
`normalizeQdrantConfig()` em `qdrant.ts`.

### Variáveis de ambiente (v3.8.6)

Seis variáveis de ambiente opcionais ajustam o comportamento do motor em tempo de execução (documentadas em `.env.example`):

| Variável                        | Predefinição               | Descrição                                                                                                                                 |
| ------------------------------- | -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `MEMORY_EMBEDDING_CACHE_TTL_MS` | `300000`                   | TTL da cache de embeddings (5 min)                                                                                                        |
| `MEMORY_EMBEDDING_CACHE_MAX`    | `1000`                     | Número máximo de entradas na cache LRU de embeddings                                                                                      |
| `MEMORY_TRANSFORMERS_MODEL`     | `Xenova/all-MiniLM-L6-v2`  | Repositório HF para o modelo Transformers.js                                                                                              |
| `MEMORY_STATIC_MODEL`           | `minishlab/potion-base-8M` | Repositório HF para o modelo potion estático                                                                                              |
| `MEMORY_STATIC_CACHE_DIR`       | `<DATA_DIR>/embeddings`    | Local onde armazenar os modelos transferidos                                                                                              |
| `MEMORY_VEC_TOP_K`              | `20`                       | Top-K predefinido para pesquisa vetorial                                                                                                  |
| `MEMORY_RRF_K`                  | `60`                       | Constante k de RRF para pesquisa híbrida                                                                                                  |
| `MEMORY_VEC_QUANTIZATION`       | `none`                     | Defina como `int8` para armazenar vetores sqlite-vec locais quantizados (~4× menores; opcional). A mudança de modo força uma reindexação. |

## Sumarização (`summarization.ts`)

`summarizeMemories(apiKeyId, sessionId?, maxTokens = 4000)` compacta conteúdo
mais antigo quando o total acumulado de tokens nas memórias de uma chave excede
o limite. Percorre as linhas por ordem DESC de `created_at`, mantém as linhas
que cabem e, nas restantes, substitui `content` no local pelas três primeiras
frases do original. `tokensSaved` é a diferença em `estimateTokens` entre o
conteúdo antigo e o novo.

Esta rotina está **disponível, mas não é chamada automaticamente** no pipeline
de chat atual — chame-a a partir de um cron, de uma ação administrativa ou da
integração de `MemoryConfig.autoSummarize` se precisar de compactação contínua.
A perda de dados é irreversível: o texto original é substituído.

## API REST

Todos os endpoints exigem autenticação de gestão (`requireManagementAuth`).

### Endpoints principais de memória (existentes + atualizados)

| Método   | Caminho              | Descrição                                                                                                                                                                             |
| -------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `GET`    | `/api/memory`        | Lista paginada com filtros: `apiKeyId`, `type`, `sessionId`, `q`, `limit`, `page`, `offset`. A resposta inclui `stats.total`, `stats.tokensUsed`, `stats.hitRate`, `cacheStats`       |
| `POST`   | `/api/memory`        | Cria uma entrada (validada por Zod: `content`, `key`, `type` opcional, `sessionId`, `apiKeyId`, `metadata`, `expiresAt`). Chama `createMemory()`, que faz upsert em `(apiKeyId, key)` |
| `GET`    | `/api/memory/[id]`   | Obtém uma única entrada por UUID                                                                                                                                                      |
| `PUT`    | `/api/memory/[id]`   | Atualiza os campos da entrada (`type`, `key`, `content`, `metadata`). Corpo: `MemoryUpdatePutSchema`. Também sincroniza o vetor se estiver disponível uma fonte de embeddings.        |
| `DELETE` | `/api/memory/[id]`   | Elimina uma entrada; também a elimina de `vec_memories` (D15) e, numa abordagem de melhor esforço, do Qdrant. Devolve 404 quando não existe.                                          |
| `GET`    | `/api/memory/health` | Executa `verifyExtractionPipeline("health-check")` — ciclo completo de criação→listagem→eliminação. Devolve `{working, latencyMs, error?}`                                            |

### Novos endpoints do motor de memória (plano 21)

| Método | Caminho                           | Descrição                                                                                                                                                                                                        |
| ------ | --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `POST` | `/api/memory/retrieve-preview`    | Simulação de `retrieveMemories` — devolve resultados ordenados com pontuação, nível e tokens. Corpo: `RetrievePreviewSchema`. NÃO injeta nem modifica memórias.                                                  |
| `GET`  | `/api/memory/embedding-providers` | Lista fornecedores com modelos de embeddings, indicando quais têm uma chave de API configurada.                                                                                                                  |
| `GET`  | `/api/memory/engine-status`       | Devolve o estado completo do motor: nível de palavras-chave, resolução de embeddings, estatísticas do armazenamento vetorial, estado do Qdrant e configuração de reranking. Formato: `MemoryEngineStatusSchema`. |
| `POST` | `/api/memory/summarize`           | Aciona manualmente a compactação de memórias. Corpo: `MemorySummarizeSchema` (`olderThanDays`, `apiKeyId?`, `dryRun`). Devolve `{candidates, tokensSaved}`.                                                      |
| `POST` | `/api/memory/reindex`             | Aciona a reindexação vetorial das memórias com `needs_reindex=1`. Corpo: `MemoryReindexSchema` (`force`). Devolve `{started, pending}`.                                                                          |

### Endpoints de definições

| Método | Caminho                                 | Descrição                                                                                                          |
| ------ | --------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `GET`  | `/api/settings/memory`                  | `MemorySettingsExtended` atualmente normalizado (7 novos campos + campos legados)                                  |
| `PUT`  | `/api/settings/memory`                  | Atualiza qualquer campo de `MemorySettingsExtendedSchema` (12 campos no total)                                     |
| `GET`  | `/api/settings/qdrant`                  | Definições atuais do Qdrant (`QdrantSettingsSchema`)                                                               |
| `PUT`  | `/api/settings/qdrant`                  | Atualiza as definições do Qdrant. Corpo: `QdrantSettingsUpdateSchema`. `apiKey` = uma string vazia remove a chave. |
| `GET`  | `/api/settings/qdrant/health`           | Sonda de disponibilidade da instância Qdrant configurada. Devolve `QdrantHealthResultSchema`.                      |
| `POST` | `/api/settings/qdrant/search`           | Teste de pesquisa semântica no Qdrant. Corpo: `QdrantSearchSchema` (`query`, `topK`).                              |
| `POST` | `/api/settings/qdrant/cleanup`          | Remove pontos do Qdrant relativos a memórias expiradas/antigas.                                                    |
| `GET`  | `/api/settings/qdrant/embedding-models` | Lista os modelos de embeddings disponíveis para o Qdrant.                                                          |

A consulta de listagem de `/api/memory` suporta paginação baseada em `page`
(`parsePaginationParams`) **ou** `offset` em bruto — quando `offset` está
presente, tem precedência e é calculado um `page` derivado para o formato da
resposta.

## Ferramentas MCP (`open-sse/mcp-server/tools/memoryTools.ts`)

Quando o servidor MCP está ativado, são registadas três ferramentas de memória:

- `omniroute_memory_search` — `{apiKeyId, query?, type?, maxTokens?, limit?}`
  → encapsula `retrieveMemories()`. Desde a v3.8.6 (D16), a `strategy` é lida
  a partir de `getMemorySettings()` em vez de estar definida diretamente como `"exact"`. Se
  `query` for fornecida e `strategy` for `semantic` ou `hybrid`, o armazenamento
  vetorial é utilizado quando disponível.
- `omniroute_memory_add` — `{apiKeyId, sessionId?, type, key, content,
metadata?}` → encapsula `createMemory()`. Aceita apenas os 4 tipos canónicos:
  `factual`, `episodic`, `procedural`, `semantic` (D17).
- `omniroute_memory_clear` — `{apiKeyId, type?, olderThan?}` → lista as entradas
  correspondentes, filtra-as opcionalmente pela data/hora de criação anterior à indicada e, em seguida, elimina cada
  uma através de `deleteMemory()` (que também remove os vetores de sqlite-vec + Qdrant).

Consulte [MCP-SERVER.md](./MCP-SERVER.md) para obter detalhes sobre o transporte e o âmbito.

## Painel de controlo (Memory Studio)

`src/app/(dashboard)/dashboard/memory/page.tsx` é agora um **Studio com 3 separadores**:

### Separador: Memórias

- Cartão de conceito (explicação recolhível "Como funciona").
- Lista em tempo real, pesquisa e paginação (atraso de 300 ms).
- Filtro por tipo (`factual` / `episodic` / `procedural` / `semantic` / todos).
- Janela modal para adicionar memória (chave, conteúdo, tipo).
- Edição em linha (botão de lápis → `PUT /api/memory/[id]`).
- Eliminação por linha (com caixa de diálogo de confirmação).
- Exportação JSON da página atual; importação JSON através do seletor de ficheiros.
- Cartões de estatísticas: `totalEntries`, `tokensUsed`, `hitRate`.
- Botão "Compactar antigas" → `POST /api/memory/summarize` (uma simulação mostra primeiro
  o número de candidatas e, em seguida, pede confirmação).
- Um indicador verde/vermelho do estado, controlado por `GET /api/memory/health`.

### Separador: Área de testes

- Campo de consulta + seletor de estratégia (Exata / Semântica / Híbrida) + orçamento de tokens.
- "Simular" → `POST /api/memory/retrieve-preview` — apresenta resultados ordenados com
  `score`, `tier`, `tokens`, `vecScore`, `ftsScore`.
- Painel de resolução que mostra a origem dos embeddings/armazenamento vetorial utilizados e
  se ocorreu um fallback.

### Separador: Motor

- Painel de estado do motor (indicador de palavras-chave FTS5, indicador de embeddings, indicador do armazenamento vetorial,
  indicador do estado do Qdrant, indicador de reordenação).
- Botão "Reindexar agora" → `POST /api/memory/reindex`.
- Seletor da origem dos embeddings (automática / remota / estática / transformers + opções).
- Cartão de configuração do Qdrant (opção de ativação, anfitrião/porta/coleção/chave, teste de ligação,
  teste de pesquisa semântica, limpeza).
- Cartão de configuração da reordenação (opção de ativação, seletor de fornecedor/modelo).

As definições de memória e do Qdrant também se encontram em
`/dashboard/settings → Memória e competências` (`MemorySkillsTab.tsx`) para
a interface de definições legada/global.

## Colocação em cache

`src/lib/memory/store.ts` mantém uma cache em processo semelhante a LRU
(`MEMORY_CACHE_TTL = 1 min`, `MEMORY_MAX_CACHE_SIZE = 500`, com remoção dos 20 %
mais antigos) para leituras de `getMemory(id)`, além de uma camada genérica
de chave/valor `memoryCache` (`src/lib/memory/cache.ts`) com métodos
`get`/`set`/`invalidate`, utilizada por consumidores que pretendam a sua própria cache com âmbito definido (LRU
de 1 000 entradas, TTL predefinido de 5 min).

## Privacidade e Ciclo de Vida

- A memória pertence ao ID da chave de API (`resolveMemoryOwnerId` em
  `chatCore.ts`). Sem um `apiKeyInfo.id`, não são executadas a recuperação,
  a injeção nem a extração.
- As entradas com um `expires_at` futuro são excluídas da recuperação; as
  entradas antigas para além de `retentionDays` são excluídas pela cláusula
  `created_at >= cutoff` em `retrieveMemories`.
- Para eliminação definitiva, utilize `DELETE /api/memory/[id]` ou `omniroute_memory_clear`.
- A extração é executada de forma assíncrona via `setImmediate`; as falhas são
  registadas em `memory.extraction.background.failed` e nunca são apresentadas
  ao autor da chamada.
- As verificações completas (`verifyExtractionPipeline`) eliminam as suas
  próprias entradas de teste num bloco `finally`.

## Consulte Também

- [SKILLS.md](./SKILLS.md) — a definição `skillsEnabled` injeta definições de
  ferramentas juntamente com a memória.
- [MCP-SERVER.md](./MCP-SERVER.md) — transporte/âmbitos do MCP.
- [API_REFERENCE.md](../reference/API_REFERENCE.md) — interface mais abrangente da API.
- Módulos de origem:
  - `src/lib/memory/types.ts`, `schemas.ts`
  - `src/lib/memory/store.ts`, `retrieval.ts`, `injection.ts`, `reindex.ts`
  - `src/lib/memory/extraction.ts`, `summarization.ts`, `verify.ts`
  - `src/lib/memory/settings.ts`, `qdrant.ts`, `cache.ts`
  - `src/lib/memory/vectorStore.ts` — sqlite-vec + RRF híbrido
  - `src/lib/memory/embedding/index.ts` — camada de embeddings com várias fontes
  - `src/lib/memory/embedding/types.ts`, `remote.ts`, `staticPotion.ts`,
    `transformersLocal.ts`, `cache.ts`
  - `src/shared/schemas/memory.ts` — esquemas Zod para todos os corpos da API de memória
  - `src/shared/schemas/qdrant.ts` — esquemas Zod para definições/operações do Qdrant
  - `src/lib/db/memoryVec.ts` — operações CRUD para `memory_vec_meta`
  - `src/lib/db/migrations/015_create_memories.sql`,
    `022_add_memory_fts5.sql`, `023_fix_memory_fts_uuid.sql`,
    `083_memory_vec.sql`
  - `src/app/api/memory/route.ts`, `[id]/route.ts`, `health/route.ts`
  - `src/app/api/memory/retrieve-preview/route.ts`
  - `src/app/api/memory/engine-status/route.ts`
  - `src/app/api/memory/embedding-providers/route.ts`
  - `src/app/api/memory/summarize/route.ts`
  - `src/app/api/memory/reindex/route.ts`
  - `src/app/api/settings/memory/route.ts`
  - `src/app/api/settings/qdrant/route.ts` + sub-rotas
  - `src/app/(dashboard)/dashboard/memory/` — IU do Studio (página + componentes +
    separadores + hooks)
  - `open-sse/handlers/chatCore.ts` (ligações de injeção/extração)
  - `open-sse/mcp-server/tools/memoryTools.ts`

---

## Escolher um Fornecedor de Embeddings (v3.8.16+)

O motor de memória do OmniRoute suporta **quatro fontes de embeddings** (`src/lib/memory/embedding/`). Cada uma apresenta diferentes compromissos em termos de **latência, custo, qualidade do modelo e complexidade da configuração**.

### As Fontes de Embeddings

| Fornecedor     | Fonte                                                    | Latência                              | Custo                | Qualidade                         | Configuração                                |
| -------------- | -------------------------------------------------------- | ------------------------------------- | -------------------- | --------------------------------- | ------------------------------------------- |
| `transformers` | Modelo ONNX local (Xenova/all-MiniLM-L6-v2)              | ~50-150ms (CPU)                       | Gratuito             | Boa                               | Apenas `npm install`                        |
| `static`       | Vetores pré-calculados (em cache)                        | <1ms                                  | Gratuito             | N/D (depende de existir no cache) | Nenhuma                                     |
| `remote`       | API da OpenAI/Cohere/Voyage                              | ~100-300ms                            | $0.02-0.10/1M tokens | Excelente                         | Chave de API                                |
| `auto`         | Seleciona a melhor fonte disponível em tempo de execução | Igual à fonte selecionada             | Gratuito             | Igual à fonte selecionada         | Nenhuma                                     |
| _(cache)_      | Camada LRU em memória sobre qualquer fonte               | <1ms (acerto), latência total (falha) | Gratuito             | Igual à fonte subjacente          | Sempre ativa (não é uma fonte selecionável) |

### Árvore de Decisão

```
                  Qual é o contexto da sua implementação?
                  │
      ┌───────────┼───────────┬──────────────┐
      │           │           │              │
 DESENV./TESTE  PROD. PEQUENA  PROD. GRANDE  EDGE / OFFLINE
      │           │           │              │
      ▼           ▼           ▼              ▼
  transformers transformers remote (Qdrant) transformers
  (grátis, sem API)          (melhor qualidade) (sem Internet)
      │           │           │              │
      └────────┬──┴───────────┴──────────────┘
               │
               ▼
            Adicione SEMPRE a camada `cache` por cima
            (`LruCache` envolve qualquer fornecedor)
```

### Configuração da Base de Dados e da API

As opções de embeddings da memória são configuradas através da API/IU de Definições, e não de variáveis de ambiente. As chaves relevantes da base de dados de definições em Definições (`normalizeMemorySettings` em `src/lib/memory/settings.ts`) são:

- `memoryEmbeddingSource`: `"transformers"` (local), `"remote"` (baseada em API, por exemplo, OpenAI), `"static"` (armazenamento externo) ou `"auto"`
- `memoryEmbeddingProviderModel`: Identificador do modelo para fontes remotas/estáticas (por exemplo, `"text-embedding-3-small"`)
- `memoryTransformersEnabled`: `true` | `false`
- `memoryStaticEnabled`: `true` | `false`
- `memoryVectorStore`: `"sqlite-vec"`, `"qdrant"` ou `"auto"`

#### Modelo Local (`transformers`)

Utiliza internamente transformers.js para executar modelos locais:

```bash
# Variáveis de ambiente lidas no código (src/lib/memory/embedding/index.ts):
MEMORY_TRANSFORMERS_MODEL=Xenova/all-MiniLM-L6-v2  # Repositório do modelo no HF
MEMORY_STATIC_MODEL=minishlab/potion-base-8M       # Modelo potion estático do HF
MEMORY_STATIC_CACHE_DIR=<DATA_DIR>/embeddings      # Diretório da cache
```

#### Cache LRU de Embeddings

A cache está sempre ativa por predefinição e é configurada através de variáveis de ambiente:

```bash
MEMORY_EMBEDDING_CACHE_MAX=1000                    # Máximo de itens em cache
MEMORY_EMBEDDING_CACHE_TTL_MS=300000               # TTL (5 min)
```

### Valores de Desempenho

Benchmark num servidor x86 típico de 4 núcleos (textos com ~100 tokens cada):

| Fornecedor           | p50   | p95   | p99   | Custo / 1M de embeddings           |
| -------------------- | ----- | ----- | ----- | ---------------------------------- |
| `transformers` (CPU) | 80ms  | 180ms | 350ms | Gratuito                           |
| `remote` (OpenAI)    | 120ms | 220ms | 400ms | ~$0.02 (ada-002) / $0.13 (3-large) |
| `static` (Qdrant)    | 15ms  | 30ms  | 60ms  | Depende do alojamento do Qdrant    |
| `cache` (acerto)     | <1ms  | <1ms  | 2ms   | Gratuito                           |

---

## Padrões de Extração de Factos (v3.8.16+)

O módulo `extraction.ts` (`src/lib/memory/extraction.ts`) utiliza **correspondência de padrões com expressões regulares** para extrair factos estruturados das mensagens de conversação. Compreender estes padrões ajuda a ajustar a qualidade da extração ao seu caso de utilização.

### Categorias de Padrões Predefinidas

| Categoria           | Padrão de exemplo                                           | Captura                              |
| ------------------- | ----------------------------------------------------------- | ------------------------------------ |
| PREFERENCE_PATTERNS | `"I prefer <X>"`, `"I like <X>"`, `"I hate <X>"`            | Preferências do utilizador           |
| DECISION_PATTERNS   | `"I'll use <X>"`, `"I decided to <X>"`, `"I went with <X>"` | Decisões do utilizador (episódicas)  |
| PATTERN_PATTERNS    | `"I usually <X>"`, `"I always <X>"`, `"I never <X>"`        | Padrões comportamentais persistentes |

### Padrões de Exemplo (Simplificados)

```ts
// De src/lib/memory/extraction.ts
const PREFERENCE_PATTERNS = [
  /\bI\s+(?:really\s+)?prefer\s+([^.,\n]+)/gi,
  /\bI\s+(?:really\s+)?like\s+([^.,\n]+)/gi,
  /\bI\s+(?:hate|dislike|avoid)\s+([^.,\n]+)/gi,
];
const DECISION_PATTERNS = [
  /\bI'?(?:ll|will)\s+use\s+([^.,\n]+)/gi,
  /\bI\s+(?:have\s+)?decided\s+(?:to\s+)?([^.,\n]+)/gi,
];
const PATTERN_PATTERNS = [/\bI\s+usually\s+([^.,\n]+)/gi, /\bI\s+always\s+([^.,\n]+)/gi];
```

### O Que É Extraído

Quando um utilizador diz:

> "I prefer TypeScript. I'll use Postgres for this project. I always commit before pushing. I don't like Python."
> A extração produz 4 memórias:
>
> | Chave                                | Categoria  | Tipo     | Conteúdo                    |
> | ------------------------------------ | ---------- | -------- | --------------------------- |
> | `preference:typescript`              | preference | factual  | "TypeScript"                |
> | `decision:postgres_for_this_project` | decision   | episodic | "Postgres for this project" |
> | `pattern:commit_before_pushing`      | pattern    | factual  | "commit before pushing"     |
> | `preference:python`                  | preference | factual  | "Python"                    |

### Limites de Extração

Para evitar uma extração descontrolada, aplicam-se os seguintes limites:

| Comprimento mínimo do conteúdo | 3 caracteres |
| Comprimento máximo do conteúdo | 500 caracteres |

### Quando Desativar a Extração

A extração é executada automaticamente sempre que a memória está ativada; não existe uma opção
separada apenas para a extração. Para a desativar, desative totalmente a memória (`enabled: false`
através de `PUT /api/settings/memory`). Considere fazê-lo quando:

- Tem um elevado volume de mensagens e o custo da extração não é insignificante
- As suas conversas são, na sua maioria, transitórias (conversação, depuração) e não têm valor a longo prazo
- Já está a capturar contexto através de plugins personalizados

---

## Ajuste do RRF Híbrido (v3.8.16+)

O algoritmo **Reciprocal Rank Fusion (RRF)** combina resultados FTS5 (palavras-chave) e vetoriais (semânticos). O parâmetro `k` controla o peso atribuído aos resultados com classificações inferiores.

### A Fórmula

Para cada memória candidata, a pontuação RRF é:

```
RRF(d) = Σ  1 / (k + rank_i(d))
```

Em que:

- `k` é a constante (predefinição: 60)
- `rank_i(d)` é a classificação do documento `d` no i-ésimo sistema de recuperação (FTS, vetorial)
- A soma abrange todos os sistemas de recuperação

### Como `k` Afeta os Resultados

| Valor de `k`              | Efeito                                                                                                    | Mais adequado para                                         |
| ------------------------- | --------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| `k=0`                     | Fusão pura de classificações (sem suavização)                                                             | Referência teórica                                         |
| `k=10-30`                 | Atribui muito peso aos primeiros resultados; classificações baixas quase não contribuem                   | Quando os 3 primeiros resultados estão geralmente corretos |
| **`k=60`** (predefinição) | Equilibrado — todos os 10 primeiros resultados contribuem significativamente                              | Recuperação de uso geral                                   |
| `k=100+`                  | Mais uniforme — mesmo resultados com classificações baixas podem dominar se aparecerem em vários sistemas | Quando a revocação > precisão é crucial                    |

### Ajustar `k` na Prática

```bash
# Predefinição
MEMORY_RRF_K=60

# Precisão agressiva (memória pequena, poucos documentos)
MEMORY_RRF_K=20

# Revocação máxima (memória grande, consultas variadas)
MEMORY_RRF_K=120
```

**Exemplo com `k=20`:**

- Classificação FTS 1 → contribuição `1/21 = 0.048`
- Classificação FTS 10 → contribuição `1/30 = 0.033`
- Classificação vetorial 1 → contribuição `0.048`
- Máximo combinado: `0.096`

**Exemplo com `k=60`:**

- Classificação FTS 1 → contribuição `1/61 = 0.016`
- Classificação FTS 10 → contribuição `1/70 = 0.014`
- Classificação vetorial 1 → contribuição `0.016`
- Máximo combinado: `0.033`

Com um `k` mais elevado, a **diferença relativa** entre a 1.ª e a 10.ª posição é menor, pelo que o algoritmo depende mais do **consenso entre sistemas de recuperação** do que da confiança na classificação mais elevada.

### Quando Alterar `k`

| Sintoma                                                            | Experimente                                                                                       |
| ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------- |
| O primeiro resultado ganha sempre, mas está errado                 | **Diminuir** k (por exemplo, 20) — a confiança na classificação mais elevada tem mais importância |
| A resposta correta está entre as 5 primeiras, mas não em 1.º lugar | **Aumentar** k (por exemplo, 100) — uma pontuação mais uniforme recompensa o consenso             |
| A revocação é elevada, mas a precisão é baixa                      | **Diminuir** k — tornar a classificação mais precisa                                              |
| A revocação é baixa (faltam documentos relevantes)                 | **Aumentar** k — dar uma oportunidade aos documentos com classificações inferiores                |

### Ponderação RRF

A fusão recíproca de classificações utiliza pesos iguais para a classificação vetorial semântica e para a classificação da pesquisa de texto integral:

```
RRF(d) = 1/(k + rank_vector) + 1/(k + rank_fts)
```

Não existem variáveis de ambiente para ajustar pesos individuais (`MEMORY_RRF_VECTOR_WEIGHT`/`MEMORY_RRF_FTS_WEIGHT` não existem).

---

## Estratégia de Resumo (v3.8.16+)

O módulo `summarization.ts` (`src/lib/memory/summarization.ts`) comprime memórias mais antigas para manter reduzido o conjunto ativo, preservando simultaneamente a capacidade de recuperação.

### Quando é Acionado o Resumo

| Acionador                  | Limiar (predefinição) |
| -------------------------- | --------------------- |
| Acionamento manual via API | n/a                   |

### O Que é Resumido

São exportados dois pontos de entrada de `summarization.ts`:

- **`summarizeMemories(apiKeyId, sessionId?, maxTokens = 4000)`** — condensa as
  memórias de uma sessão num único texto de resumo limitado por um orçamento de tokens.
- **`summarizeMemoriesOlderThan(apiKeyId, days, dryRun)`** — a compactação baseada
  na idade utilizada pela API: seleciona todas as memórias com mais de `days`, cria
  uma memória de resumo condensada a partir delas e, quando `dryRun` é `false`, elimina
  os originais. Passe `dryRun: true` para pré-visualizar o conjunto de candidatos e o
  total de tokens sem modificar nada.

Não existe nenhuma etapa de agrupamento por etiqueta/chave nem classificação individual
das memórias como "essenciais vs resumíveis" — a seleção baseia-se exclusivamente no
limite de idade, e o texto do resumo é uma linha condensada, prefixada pelo tipo, para
cada candidato.

### Acionar o Resumo

O resumo é **manual / opcional** — a definição `autoSummarize` é `false` por
predefinição, pelo que nada é compactado automaticamente. Acione-o através da API:

```bash
curl -X POST http://localhost:20128/api/memory/summarize \
  -H "Authorization: Bearer $OMNIROUTE_KEY"
```

Para o manter desativado, basta manter `autoSummarize` no respetivo valor predefinido (`false`).

### Sugestões para Melhorar a Qualidade do Resumo

- **Pré-visualize primeiro com `dryRun`** — `summarizeMemoriesOlderThan(..., true)` devolve
  a lista de candidatos e a contagem total de tokens, para que possa confirmar o que seria
  combinado antes de eliminar os originais.
- **Execute o resumo durante períodos de pouco tráfego** se tiver um grande acervo de memórias — a chamada ao LLM é a parte mais demorada

```bash
# Ao estilo Cron: resumir diariamente às 3h
0 3 * * * curl -X POST http://localhost:20128/api/memory/summarize \
  -H "Authorization: Bearer $OMNIROUTE_KEY"
```

---

## Padrão de Fornecedor MemoryBackend

> **Fonte fidedigna:** `src/lib/memory/backend.ts`, `src/lib/memory/genericBackend.ts`, `src/lib/memory/manager.ts`
> **Testes:** `src/lib/memory/__tests__/generic-backend.test.ts`

O padrão de fornecedor MemoryBackend introduz uma **camada de abstração de backend modular** sobre o motor de memória existente. Em vez de estar associado a uma única implementação de armazenamento, o sistema de memória suporta agora vários backends (SQLite, Obsidian, Notion e backends HTTP personalizados), com encaminhamento configurável para o backend principal e os backends de contingência.

### Arquitetura

```
┌──────────────────────────────────────────────────────────┐
│                    Rotas da API                           │
│            (src/app/api/memory/route.ts)                  │
└──────────────────────┬───────────────────────────────────┘
                       │
┌──────────────────────▼───────────────────────────────────┐
│                   MemoryManager                           │
│       Orquestrador singleton (manager.ts)                 │
│                                                          │
│  Principal ──► Backend A  (por ex., SQLite)              │
│  Contingência ► Backend B  (por ex., Obsidian)           │
│                 Backend C  (por ex., Notion via          │
│                             GenericBackend)               │
└──────────────────────┬───────────────────────────────────┘
                       │
        ┌──────────────┼──────────────┐
        ▼              ▼              ▼
┌────────────┐ ┌────────────┐ ┌──────────────────┐
│ Backend    │ │ Backend    │ │ Backend de       │
│ SQLite     │ │ Obsidian   │ │ Memória Genérico │
│            │ │            │ │ (HTTP)           │
└────────────┘ └────────────┘ └──────────────────┘
```

#### Interface Principal (`backend.ts`)

Cada backend tem de implementar a interface `MemoryBackend`:

```typescript
interface MemoryBackend {
  readonly id: string;
  readonly displayName: string;

  // CRUD
  create(input: CreateMemoryInput): Promise<Memory>;
  get(id: string): Promise<Memory | null>;
  update(id: string, updates: Partial<...>): Promise<boolean>;
  delete(id: string): Promise<boolean>;
  list(filter: MemoryFilter): Promise<{ data: Memory[]; total: number; byType: Record<string, number> }>;

  // Pesquisa
  search(config: SearchConfig): Promise<Memory[]>;

  // Estado
  health(): Promise<HealthCheckResult>;

  // Ciclo de vida (opcional)
  initialize?(): Promise<void>;
  shutdown?(): Promise<void>;
}
```

#### MemoryManager (`manager.ts`)

Orquestrador singleton que:

- **Regista** backends através de `register(backend)` — chamado no arranque a partir de `index.ts`
- **Configura** o backend principal e os de contingência através de `configure(primary, fallbacks)`
- **Encaminha** operações CRUD/pesquisas para o backend principal, com uma cadeia de contingência em caso de falha
- **Verifica o estado** de todos os backends periodicamente

**Comportamento de contingência:**

| Operação | Principal                      | Contingências                           |
| -------- | ------------------------------ | --------------------------------------- |
| `create` | ✅ Apenas principal            | ❌                                      |
| `get`    | ✅ Tentar primeiro o principal | ✅ Contingência se o resultado for nulo |
| `update` | ✅ Apenas principal            | ✅ Sincronização sem aguardar resposta  |
| `delete` | ✅ Apenas principal            | ✅ Sincronização sem aguardar resposta  |
| `list`   | ✅ Apenas principal            | ❌                                      |
| `search` | ✅ Principal primeiro          | ✅ Contingência em caso de erro         |

#### GenericMemoryBackend (`genericBackend.ts`)

Um conector HTTP genérico que adapta qualquer API REST a um MemoryBackend. É útil para:

- **Notion** — estabelecer ligação através da API do Notion
- **Obsidian** — estabelecer ligação através da API REST Local do Obsidian
- **Backends personalizados** — qualquer serviço que disponibilize uma API RESTful de memória

**Configuração:**

```typescript
interface GenericBackendConfig {
  baseUrl: string;           // URL base da API do backend
  apiKey?: string;           // Token Bearer para autenticação
  headers?: Record<string, string>;  // Cabeçalhos HTTP personalizados
  timeout?: number;          // Tempo limite do pedido (predefinição: 30000ms)
  backendType?: string;      // Para registo de eventos

  // Substituições de endpoints (as predefinições utilizam convenções REST)
  endpoints?: {
    search?: string;   // predefinição: "/memories/search"
    create?: string;   // predefinição: "/memories"
    list?: string;     // predefinição: "/memories"
    get?: string;      // predefinição: "/memories/{id}"
    update?: string;   // predefinição: "/memories/{id}"
    delete?: string;   // predefinição: "/memories/{id}"
    health?: string;   // predefinição: "/health"
  };

  // Mapeamentos de nomes dos parâmetros de consulta
  queryParams?: {
    query?/apiKeyId?/limit?/offset?/strategy?/maxTokens?/type?/sessionId?/orderBy?/orderDir?/options?
  };

  // Mapeamentos de nomes dos parâmetros de caminho
  pathParams?: {
    id?/memoryId?
  };
}
```

Os **backends conhecidos** estão pré-configurados em `KNOWN_BACKENDS`:

```typescript
createKnownBackend("obsidian"); // → GenericMemoryBackend direcionado para localhost:27123
createKnownBackend("notion"); // → GenericMemoryBackend direcionado para api.notion.com/v1
```

#### Backends incorporados

##### SQLiteBackend (`sqliteBackend.ts`)

O backend principal predefinido. Encapsula o armazenamento de memória existente baseado em SQLite, utilizando `src/lib/memory/store.ts`. É registado automaticamente no arranque.

```typescript
import { sqliteBackend } from "./sqliteBackend";
memoryManager.register(sqliteBackend);
```

##### ObsidianBackend (`obsidianBackend.ts`)

Encapsula a integração existente com o Obsidian (`src/lib/memory/obsidianBackend.ts`). Liga-se a um cofre do Obsidian através da API REST local do Obsidian.

### Definições

As definições do backend de memória são armazenadas na tabela de definições da aplicação e geridas através de `src/lib/memory/settings.ts`:

| Definição                | Chave de ambiente/configuração | Predefinição | Descrição                                 |
| ------------------------ | ------------------------------ | ------------ | ----------------------------------------- |
| Backend principal        | `memoryPrimaryBackend`         | `"sqlite"`   | ID do backend principal                   |
| Backends alternativos    | `memoryFallbackBackends`       | `[]`         | IDs ordenados dos backends alternativos   |
| Configurações de backend | `memoryBackendConfigs`         | `{}`         | Substituições de configuração por backend |

As definições são normalizadas através de `normalizeMemorySettings()` e armazenadas em cache em `getMemorySettings()`.

### Fluxo de inicialização

```
Arranque da aplicação
  → importações de index.ts (efeito secundário): regista SQLiteBackend
  → initMemoryBackends() chamado a partir do ciclo de vida da aplicação:
      1. Carregar definições (getMemorySettings)
      2. Configurar backend principal + alternativos
      3. Inicializar todos os backends (verificação de estado)
      4. Pronto para pedidos
```

### Adicionar um novo backend

1. **Implemente a interface `MemoryBackend`** em `src/lib/memory/<name>Backend.ts`
2. **Exporte** a partir de `src/lib/memory/index.ts`
3. **Registe** com `memoryManager.register(yourBackend)` no arranque
4. **Configure** através das definições: defina `memoryPrimaryBackend` como o ID do seu backend
5. **Teste** utilizando `src/lib/memory/__tests__/generic-backend.test.ts` como referência

#### Exemplo: backend Brain

```typescript
import { createGenericMemoryBackend } from "./genericBackend";

const brainBackend = createGenericMemoryBackend("brain", "BK-Brain", {
  baseUrl: process.env.BRAIN_API_URL || "http://localhost:9099",
  apiKey: process.env.BRAIN_API_KEY,
  endpoints: {
    search: "/api/memory/search",
    create: "/api/memory",
    health: "/api/health",
  },
});

memoryManager.register(brainBackend);
```

### Verificação

#### Testes unitários

```bash
npx vitest run src/lib/memory/__tests__/generic-backend.test.ts --reporter=verbose
```

Resultado esperado: **35 testes, todos aprovados**, abrangendo:

- Construtor (2)
- Verificação de estado (4) — sucesso, falha 500, erro de rede, latência
- Inicialização (2) — sucesso, falha
- Criação (2) — endpoint predefinido, endpoint personalizado
- Obtenção (4) — sucesso, 404 → null, erro diferente de 404, parâmetros de caminho personalizados
- Atualização (2) — sucesso, 404 → false
- Eliminação (2) — sucesso, 404 → false
- Listagem (2) — parâmetros de consulta, nomes de parâmetros personalizados
- Pesquisa (3) — parâmetros de consulta, endpoint personalizado, serialização de opções
- Cabeçalhos de autenticação (2) — token Bearer, cabeçalhos personalizados
- Fábrica (1)

#### Verificação de tipos

```bash
npm run typecheck:core
```

Esperado: **0 erros**.
