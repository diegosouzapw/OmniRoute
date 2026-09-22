# Memory System (Português (Brasil))

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/MEMORY.md) · 🇪🇹 [am](../../../am/docs/frameworks/MEMORY.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/MEMORY.md) · 🇦🇿 [az](../../../az/docs/frameworks/MEMORY.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/MEMORY.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/MEMORY.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/MEMORY.md) · 🇩🇰 [da](../../../da/docs/frameworks/MEMORY.md) · 🇩🇪 [de](../../../de/docs/frameworks/MEMORY.md) · 🇬🇷 [el](../../../el/docs/frameworks/MEMORY.md) · 🇪🇸 [es](../../../es/docs/frameworks/MEMORY.md) · 🇪🇪 [et](../../../et/docs/frameworks/MEMORY.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/MEMORY.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/MEMORY.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/MEMORY.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/MEMORY.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/MEMORY.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/MEMORY.md) · 🇮🇱 [he](../../../he/docs/frameworks/MEMORY.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/MEMORY.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/MEMORY.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/MEMORY.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/MEMORY.md) · 🇮🇩 [id](../../../id/docs/frameworks/MEMORY.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/MEMORY.md) · 🇮🇹 [it](../../../it/docs/frameworks/MEMORY.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/MEMORY.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/MEMORY.md) · 🇰🇭 [km](../../../km/docs/frameworks/MEMORY.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/MEMORY.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/MEMORY.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/MEMORY.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/MEMORY.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/MEMORY.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/MEMORY.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/MEMORY.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/MEMORY.md) · 🇲🇲 [my](../../../my/docs/frameworks/MEMORY.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/MEMORY.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/MEMORY.md) · 🇳🇴 [no](../../../no/docs/frameworks/MEMORY.md) · 🇮🇳 [or](../../../or/docs/frameworks/MEMORY.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/MEMORY.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/MEMORY.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/MEMORY.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/MEMORY.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/MEMORY.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/MEMORY.md) · 🇱🇰 [si](../../../si/docs/frameworks/MEMORY.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/MEMORY.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/MEMORY.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/MEMORY.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/MEMORY.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/MEMORY.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/MEMORY.md) · 🇮🇳 [te](../../../te/docs/frameworks/MEMORY.md) · 🇹🇭 [th](../../../th/docs/frameworks/MEMORY.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/MEMORY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/MEMORY.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/MEMORY.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/MEMORY.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/MEMORY.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/MEMORY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/MEMORY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/MEMORY.md)

---

> **Fonte oficial:** `src/lib/memory/` e `src/app/api/memory/`
> **Última atualização:** 2026-06-28 — v3.8.40 (desativada por padrão + atualização de quantização int8)

O OmniRoute fornece memória conversacional persistente identificada pela chave de API (e
opcionalmente pelo ID da sessão). As memórias são extraídas automaticamente das respostas do LLM
por meio de correspondência leve de padrões com expressões regulares e reinseridas nas
solicitações subsequentes como uma mensagem inicial do sistema (ou como a primeira mensagem do usuário para provedores que
rejeitam a função de sistema).

> **A memória está DESATIVADA por padrão (v3.8.30+).** `DEFAULT_MEMORY_SETTINGS.enabled` agora é
> `false` (`src/lib/memory/settings.ts`). A ativação da memória injeta até
> `maxTokens` (~2k) de contexto recuperado em **todas** as solicitações de chat, o que é
> cobrado — um custo inesperado para novas instalações e clientes que gerenciam seu
> próprio contexto. Ative-a explicitamente em **Configurações → Memória** (a
> `MemorySkillsTab` exibe um aviso sobre o custo de tokens quando a memória está ativada).
> Um cliente pode desativá-la para uma única solicitação com o cabeçalho de solicitação
> `x-omniroute-no-memory` (`true`/`1`/`yes`) — consulte a tabela de cabeçalhos de solicitação em
> [API_REFERENCE.md](../reference/API_REFERENCE.md). Uma solicitação sem memória define
> `memoryOwnerId = null`, o que desativa **tanto** a injeção de memória quanto a de habilidades
> nessa solicitação (`open-sse/handlers/chatCore/headers.ts::isNoMemoryRequested`).

A memória tem **escopo por chave de API**, não por usuário — todas as solicitações autenticadas
com a mesma chave de API compartilham o mesmo conjunto de memórias, com escopo adicional opcional
por `sessionId`.

## Arquitetura

```
Cliente → /v1/chat/completions (apiKeyInfo resolvido anteriormente)
  → handleChatCore() [open-sse/handlers/chatCore.ts]
    → resolveMemoryOwnerId(apiKeyInfo)        # extrai o ID
    → getMemorySettings()                     # configurações em cache
    → shouldInjectMemory(body, {enabled})     # controle
    → retrieveMemories(apiKeyId, config)      # SQL + FTS5 + vetor opcional
    → injectMemory(body, memories, provider)  # mensagem do sistema ou do usuário
  → chamada ao provedor upstream
  → na resposta: extractFacts(text, apiKeyId, sessionId)  # não bloqueante
    → setImmediate → createMemory(fact) para cada correspondência
                   → embed(content) + upsertVector(id, vec)
```

Os pontos de chamada de injeção e extração estão conectados em
`open-sse/handlers/chatCore.ts` (procure por `retrieveMemories`, `injectMemory`
e `extractFacts`).

## Arquitetura do mecanismo (resolução em 3 camadas)

O Mecanismo de Memória determina o caminho de recuperação em tempo de execução com base na
infraestrutura e nas configurações disponíveis. Existem três camadas, aplicadas em ordem de prioridade:

```
  ┌─────────────────────────────────────────────────────────────┐
  │  CAMADA 0 — Palavra-chave (FTS5)                            │
  │  Disponibilidade determinada por sondagem: FTS5 quando a    │
  │  compilação do SQLite oferece suporte a ele                 │
  │  (better-sqlite3 / node:sqlite / bun:sqlite); indisponível  │
  │  em compilações sem FTS5 (por exemplo, sql.js/WASM —        │
  │  "no such module: fts5"). Usada quando strategy = "exact"   │
  │  ou como fallback; o status keyword do mecanismo reflete    │
  │  a sondagem.                                                │
  └──────────────────────────────────┬──────────────────────────┘
                                     │ strategy = semantic|hybrid?
                                     ▼
  ┌─────────────────────────────────────────────────────────────┐
  │  CAMADA 1 — Vetor incorporado (sqlite-vec)                  │
  │  sqlite-vec v0.1.9 carregado via db.loadExtension().        │
  │  KNN por força bruta sobre vetores Float32. Ativa quando:   │
  │   • o loadExtension do sqlite-vec é bem-sucedido            │
  │   • Uma fonte de embeddings está disponível                 │
  │     (remote | static | transformers) e consegue produzir    │
  │     um Float32Array                                         │
  │   • a tabela vec_memories existe (criada no primeiro        │
  │     ready())                                                │
  └──────────────────────────────────┬──────────────────────────┘
                                     │ qdrant.enabled?
                                     ▼
  ┌─────────────────────────────────────────────────────────────┐
  │  CAMADA 2 — Qdrant (banco de dados vetorial externo com     │
  │  ativação opcional)                                        │
  │  Quando ativado, substitui o sqlite-vec para                │
  │  semantic/hybrid.                                          │
  │  Requer uma instância do Qdrant em execução e host/porta    │
  │  configurados.                                             │
  └─────────────────────────────────────────────────────────────┘
```

A degradação é automática e transparente:

- Se o sqlite-vec não carregar, a camada 1 ficará indisponível → haverá fallback para a camada 0.
- Se a fonte de embeddings retornar um erro, a camada 1 fará fallback para a camada 0.
- Se o Qdrant não estiver íntegro, a camada 2 fará fallback para a camada 1 (ou para a camada 0 se a camada 1
  também estiver indisponível).

## Fontes de embeddings

A camada de embeddings (`src/lib/memory/embedding/`) determina qual fonte usar
com base em `MemorySettingsExtended.embeddingSource`:

| Fonte          | Descrição                                                                               | Chave necessária | Inicialização a frio |
| -------------- | --------------------------------------------------------------------------------------- | ---------------- | -------------------- |
| `remote`       | Usa a API de embeddings de um provedor configurado (OpenAI, Cohere etc.)                | Sim              | Nenhuma              |
| `static`       | Embedding local por tabela de consulta via `potion-base-8M` (WordPiece + mean pooling)  | Não              | ~200ms               |
| `transformers` | Inferência ONNX local via `@huggingface/transformers` v4, `all-MiniLM-L6-v2`            | Não              | ~3s + ~400MB de RAM  |
| `auto`         | Resolução em tempo de execução: remote (se houver chave) → static → transformers → null | Depende          | Depende              |

**Ordem de resolução para `auto`:**

1. Encontra o primeiro provedor em `listEmbeddingProviders()` com `hasKey === true` → `remote`.
2. Se `settings.staticEnabled === true` → `static`.
3. Se `settings.transformersEnabled === true` → `transformers`.
4. Caso contrário → `null` (recorre à busca por palavras-chave do FTS5).

O cache de embeddings (`src/lib/memory/embedding/cache.ts`) usa um mapa LRU em memória
indexado por `${source}:${model}:${dim}:${sha256(text)}`, limitado a
`MEMORY_EMBEDDING_CACHE_MAX` entradas (padrão: 1000), com um TTL de
`MEMORY_EMBEDDING_CACHE_TTL_MS` (padrão: 5 min). Ele é compartilhado entre todos os chamadores
durante o ciclo de vida do processo.

## RRF híbrido (k=60)

Quando `strategy = "hybrid"` e o armazenamento vetorial está disponível, a recuperação usa
Reciprocal Rank Fusion para mesclar os resultados do FTS5 e da busca vetorial:

```
RRF(d) = Σ  1 / (k + rank_i(d))      em que k = 60 (configurável via MEMORY_RRF_K)
          i
```

Mais especificamente:

1. Executa a busca FTS5 → lista classificada `R_fts` (posição 1..N).
2. Executa a busca vetorial KNN → lista classificada `R_vec` (posição 1..M).
3. Para cada `memoryId` único:  
   `rrf_score = 1/(60 + fts_rank)` + `1/(60 + vec_rank)` (0 se não estiver na lista).
4. Ordena por `rrf_score` DESC e aplica a iteração do orçamento de tokens.

O RRF é reconhecidamente eficaz sem exigir a normalização de pontuações entre
sistemas heterogêneos de recuperação. O valor padrão `k=60` vem do artigo original
de Cormack et al. e funciona bem para corpora pequenos (<10 mil memórias).

## Preenchimento retroativo (lazy + reindexação)

Quando o modelo de embedding muda (detectado por meio de `embedding_signature`), o
armazenamento vetorial é reconstruído e todas as memórias existentes são marcadas com
`needs_reindex = 1` na tabela `memories`.

**Preenchimento retroativo lazy**: Na próxima recuperação, qualquer memória sem uma entrada vetorial é
transformada em embedding e inserida em `vec_memories` antes da execução da busca. Isso
distribui o custo do preenchimento retroativo entre solicitações reais sem bloquear a inicialização.

**Reindexação explícita**: A aba Engine em `/dashboard/memory` fornece um
botão "Reindexar agora" que chama `POST /api/memory/reindex`. O manipulador chama
`runReindexBatch()` de `src/lib/memory/reindex.ts`, que processa até
`limit` entradas pendentes por solicitação. O progresso pode ser consultado por meio de
`GET /api/memory/engine-status` (`vectorStore.needsReindex`).

A tabela `memory_vec_meta` (migração `083_memory_vec.sql`) armazena:

- `active_dim` — dimensão vetorial atual (null = ainda não calibrada).
- `embedding_signature` — `${source}:${model}:${dim}` usado para detectar alterações.
- `last_reset_at` — carimbo de data/hora da última redefinição completa.
- `vec_loaded` — indicador 0/1 que informa se sqlite-vec foi carregado com sucesso.

## Extensão das configurações

Nove campos de embedding e vetores estão disponíveis em `MemorySettingsExtended` em
`src/shared/schemas/memory.ts`, persistidos por meio de `src/lib/db/settings.ts`:

| Campo                    | Tipo                                               | Padrão   | Descrição                                                       |
| ------------------------ | -------------------------------------------------- | -------- | --------------------------------------------------------------- |
| `embeddingSource`        | `"remote" \| "static" \| "transformers" \| "auto"` | `"auto"` | Qual fonte de embedding usar                                    |
| `embeddingProviderModel` | `string \| null`                                   | `null`   | Provedor/modelo no formato `provider/model`                     |
| `customBaseUrl`          | `string \| null`                                   | `null`   | URL base de endpoint compatível com OpenAI somente para memória |
| `customModelId`          | `string \| null`                                   | `null`   | ID do modelo enviado ao endpoint personalizado                  |
| `transformersEnabled`    | `boolean`                                          | `false`  | Adesão ao Transformers.js (MiniLM, ~400MB)                      |
| `staticEnabled`          | `boolean`                                          | `false`  | Adesão ao modelo local estático potion-base-8M                  |
| `rerankEnabled`          | `boolean`                                          | `false`  | Habilita a etapa de reranqueamento (adiciona +200-500ms/req)    |
| `rerankProviderModel`    | `string \| null`                                   | `null`   | Provedor/modelo de reranqueamento no formato `provider/model`   |

`rerankProviderModel` é resolvido por `POST /v1/rerank` (chamado via loopback), portanto aceita qualquer valor aceito por essa rota: um modelo de reranqueamento em nuvem selecionado (`cohere/rerank-v3.5`, `jina-ai/jina-reranker-v3.5`, …) ou um nó de provedor compatível com OpenAI como `<node-prefix>/<model>` (por exemplo, `skilled-mini/bge-reranker-v2-m3` para uma máquina TEI/Infinity). Nós de loopback são sempre elegíveis; um nó em outro host (LAN, Tailscale) também exige a feature flag `RERANK_REMOTE_PROVIDER_NODES` e deve passar pela política de URLs de saída do provedor — consulte [Feature Flags](../reference/FEATURE_FLAGS.md). O seletor do painel lista provedores selecionados e nós locais; qualquer string `provider/model` válida pode ser definida diretamente por meio de `PUT /api/settings/memory`.
| `vectorStore` | `"sqlite-vec" \| "qdrant" \| "auto"` | `"auto"` | Qual backend vetorial usar |

Esses campos são expostos por meio de `GET /PUT /api/settings/memory` (schema `MemorySettingsExtendedSchema`).

Para a fonte `remote`, o Memory também aceita as configurações opcionais `customBaseUrl` e
`customModelId`. Juntas, elas selecionam um endpoint `/embeddings` compatível com OpenAI
e um modelo sem alterar o registro global de embeddings. O endpoint é normalizado antes
do uso e verificado pela política de URLs de saída do provedor: HTTP(S) é obrigatório,
credenciais incorporadas e strings de consulta são rejeitadas, e endereços de metadados
de nuvem permanecem bloqueados. Valores vazios preservam o provedor selecionado no
registro. Os erros retornados ao painel são sanitizados, e as credenciais do endpoint
nunca são registradas em logs.

> **TODO (D20):** O escopo `global` (compartilhamento de memórias entre todas as chaves de API) não está
> implementado nesta versão. Ele exige alterações no schema e um caminho de recuperação
> global. Acompanhe separadamente.

## Camadas de armazenamento

### Principal: SQLite (tabela `memories`)

Criada pela migração `015_create_memories.sql`:

| Coluna                      | Tipo               | Observações                                                                       |
| --------------------------- | ------------------ | --------------------------------------------------------------------------------- |
| `id`                        | `TEXT PRIMARY KEY` | UUID gerado por meio de `crypto.randomUUID()`                                     |
| `api_key_id`                | `TEXT NOT NULL`    | Chave de API proprietária                                                         |
| `session_id`                | `TEXT`             | Escopo opcional por conversa                                                      |
| `type`                      | `TEXT NOT NULL`    | Um entre `factual`, `episodic`, `procedural`, `semantic`                          |
| `key`                       | `TEXT`             | Chave estável de upsert, por exemplo, `preference:i_prefer_python`                |
| `content`                   | `TEXT NOT NULL`    | O texto efetivo do fato                                                           |
| `metadata`                  | `TEXT`             | Blob JSON (categoria, extractedAt, origem, ...)                                   |
| `created_at` / `updated_at` | `TEXT`             | Strings ISO 8601                                                                  |
| `expires_at`                | `TEXT`             | Expiração opcional; `NULL` significa permanente                                   |
| `memory_id`                 | `INTEGER UNIQUE`   | Adicionada por `023_fix_memory_fts_uuid.sql` para vincular UUIDs ↔ rowids do FTS5 |

Índices: `api_key_id`, `session_id`, `type`, `expires_at`, além do índice exclusivo
`memory_id`.

**Semântica de upsert**: `createMemory()` procura uma linha existente com o mesmo
`(api_key_id, key)` e a atualiza no local quando encontrada (mesclando `metadata` por meio de
spread superficial). Isso evita que a tabela cresça sem limites devido a declarações
de preferência repetidas.

### Pesquisa de texto completo (tabela virtual `memory_fts`)

`022_add_memory_fts5.sql` cria uma tabela virtual FTS5 sobre `content` e
`key`. `023_fix_memory_fts_uuid.sql` corrige um bug encontrado no uso real, no qual a chave primária
UUID não era vinculada ao rowid inteiro do FTS5 — a migração adiciona a
coluna `memory_id`, recria a tabela FTS e configura gatilhos
(`memory_fts_ai`, `memory_fts_ad`, `memory_fts_au`) que mantêm o FTS sincronizado em
INSERT, DELETE e UPDATE.

Usada por `retrieval.ts` para as estratégias `semantic` e `hybrid` (veja abaixo).
O código de recuperação verifica com `hasTable("memory_fts")` e recorre à
ordem cronológica se a tabela FTS estiver ausente ou se a consulta FTS gerar um erro.

### Opcional: Qdrant (armazenamento vetorial de nível 2)

`src/lib/memory/qdrant.ts` implementa uma integração opcional com o Qdrant como armazenamento
vetorial de nível 2. A recuperação somente é encaminhada ao Qdrant quando o seletor de mecanismo
`memoryVectorStore === "qdrant"` — o padrão `"auto"` (e `"sqlite-vec"`)
**nunca** seleciona o Qdrant. O controle na aba Engine define **ambos** `qdrantEnabled` e
`memoryVectorStore` em conjunto: habilitá-lo torna o Qdrant o armazenamento principal, enquanto desabilitá-lo
redefine para `"auto"` (#5597 — antes dessa correção, a habilitação não tinha efeito porque nada
gravava o seletor de mecanismo). Se o Qdrant estiver inacessível ou não retornar nada, a recuperação
recorre a sqlite-vec → FTS5.

- `upsertSemanticMemoryPoint()` — gera o embedding de `key + content` com o modelo de
  embedding configurado, garante que a coleção exista (cria vetores com distância de
  cosseno no primeiro uso) e insere ou atualiza um ponto com o payload `{memoryId,
apiKeyId, sessionId, key, content, metadata, createdAtUnix, expiresAtUnix}`.
- `searchSemanticMemory(query, topK, scope)` — gera o embedding da consulta, pesquisa na
  coleção filtrando por `kind = "omniroute_memory"` e, opcionalmente, por
  `apiKeyId` / `sessionId`. Limita `topK` ao intervalo `[1, 20]`.
- `deleteSemanticMemoryPoint(id)` — exclui um único ponto. Chamada por
  `deleteMemory()` após a linha do SQLite ser removida (D15).
- `cleanupSemanticMemoryPoints({retentionDays})` — exclui em massa os pontos cujo
  `expiresAtUnix` está no passado ou cujo `createdAtUnix` é anterior ao limite de
  retenção. Faz a contagem primeiro para que o painel possa mostrar os números reais.
- `checkQdrantHealth()` — verificação de integridade `GET /readyz` com latência.

A interface de configurações disponibiliza a configuração do Qdrant, a verificação de integridade, o teste de pesquisa semântica
e a limpeza na **aba Engine** de `/dashboard/memory`. As rotas correspondentes
em `src/app/api/settings/qdrant/` estão todas conectadas desde a v3.8.6:

| Rota                                    | Método        | Descrição                               |
| --------------------------------------- | ------------- | --------------------------------------- |
| `/api/settings/qdrant`                  | `GET` / `PUT` | Ler / atualizar configurações do Qdrant |
| `/api/settings/qdrant/health`           | `GET`         | Verificação de atividade + latência     |
| `/api/settings/qdrant/search`           | `POST`        | Teste de pesquisa semântica             |
| `/api/settings/qdrant/cleanup`          | `POST`        | Remover pontos expirados / antigos      |
| `/api/settings/qdrant/embedding-models` | `GET`         | Listar modelos de embedding disponíveis |

**Observações sobre o comportamento (o que esperar):**

- **Seleção do mecanismo** — habilitar o Qdrant na aba Engine faz com que ele seja o armazenamento
  principal (define `memoryVectorStore="qdrant"`); desabilitá-lo redefine para `"auto"` (#5597).
- **Sem preenchimento retroativo** — somente as memórias criadas/atualizadas **depois** que o Qdrant é habilitado são
  gravadas nele (gravação dupla assíncrona, sem aguardar o resultado). As memórias preexistentes no SQLite **não** são
  migradas; "Reindex Now" reconstrói apenas o índice sqlite-vec, não o Qdrant.
- **A dimensão do vetor é detectada automaticamente** a partir do embedding real no primeiro uso — não há
  um campo de dimensão a ser preenchido. A alteração do modelo de embedding depois que uma coleção
  já existe **não** é tratada automaticamente: a coleção existente permanece inalterada; gravações/pesquisas
  com dimensões incompatíveis falham e usam sqlite-vec como alternativa. Recrie a coleção
  (com um novo nome ou excluindo-a no Qdrant) para trocar o gerador de embeddings.
- **Métrica de distância** — sempre **cosseno** (definida diretamente na criação da coleção; não é
  configurável).
- **Autenticação** — somente chave de API (enviada no cabeçalho `api-key`; opcional para uma instância
  local do Docker sem autenticação). JWT/RBAC não são usados.
- **Campos de configuração** — a interface disponibiliza `host`, `port`, `collection`, `embeddingModel`,
  `apiKey`. `vectorSize` / `hnswEfConstruct` estão disponíveis apenas via ambiente/DB, e `vectorSize` não é
  usado na criação da coleção (a dimensão vem do embedding).

### Quantização de vetores (int8 — opcional, em ambos os backends)

Ambos os backends de vetores oferecem suporte à **quantização int8 opcional** para reduzir o consumo
de memória dos vetores armazenados (cerca de 4× menores que Float32), com uma pequena perda de recuperação.
O padrão é **desativado** em ambos — os vetores permanecem com precisão total, a menos que o recurso seja
explicitamente habilitado.

| Backend    | Configuração                    | Tipo                           | Padrão   | Onde é lida                                                 |
| ---------- | ------------------------------- | ------------------------------ | -------- | ----------------------------------------------------------- |
| Qdrant     | `qdrantQuantization` (chave DB) | `"none" \| "int8" \| "binary"` | `"none"` | `src/lib/memory/qdrant.ts::normalizeQdrantConfig()`         |
| sqlite-vec | `MEMORY_VEC_QUANTIZATION` (env) | `"none" \| "int8"`             | `"none"` | `src/lib/memory/vectorStore.ts::requestedVecQuantization()` |

- **Qdrant** é configurado por instância por meio da chave de configuração `qdrantQuantization`
  (disponibilizada como o campo `quantization` em `PUT /api/settings/qdrant`). Quando
  definida como `"int8"`, `buildQuantizationConfig()` solicita quantização escalar
  (`always_ram`, quantil `0.99`), e as pesquisas habilitam `rescore: true` para que os
  vetores com precisão total refinem o conjunto de candidatos int8.
- A quantização do **sqlite-vec** é configurada **somente por variável de ambiente** (não é uma configuração do DB): defina
  `MEMORY_VEC_QUANTIZATION=int8` para armazenar os vetores locais como uma coluna `int8[dim]`
  por meio de `vec_quantize_int8(?, 'unit')`. O modo escolhido é incorporado à
  `embedding_signature` (com um sufixo `:int8`), portanto a troca de modo aciona uma
  reindexação completa da tabela `vec_memories` — o mesmo processo de preenchimento retroativo sob demanda usado quando
  o modelo de embedding é alterado.

## Tipos de memória

`MemoryType` (`src/lib/memory/types.ts`):

| Tipo         | Usado para                                                                              |
| ------------ | --------------------------------------------------------------------------------------- |
| `factual`    | Preferências, fatos estáveis do usuário, padrões comportamentais                        |
| `episodic`   | Decisões vinculadas a um momento específico ("Eu escolhi o Postgres")                   |
| `procedural` | Memória de fluxo de trabalho/instruções (reservada; sem extrator automático atualmente) |
| `semantic`   | Reservada para entradas do armazenamento vetorial                                       |

A estratégia de recuperação de `MemoryConfig` é `exact`, `semantic` ou `hybrid`,
e o escopo é `session`, `apiKey` ou `global`. O escopo padrão de
`getMemorySettings()` é `apiKey`.

## Extração de fatos (`extraction.ts`)

A extração é **baseada em expressões regulares**, não em LLM — ela é executada
no processo com `setImmediate()`, portanto nunca bloqueia o fluxo de resposta:

- **Padrões de preferência** → `MemoryType.FACTUAL`
  (por exemplo, `Eu prefiro …`, `Eu gosto muito de …`, `meu favorito é …`, `Eu odeio …`)
- **Padrões de decisão** → `MemoryType.EPISODIC`
  (por exemplo, `Vou usar …`, `Eu escolhi …`, `Optei por …`, `Vou adotar …`)
- **Padrões comportamentais** → `MemoryType.FACTUAL`
  (por exemplo, `Eu geralmente …`, `Eu sempre …`, `Eu costumo …`)

Cada correspondência é sanitizada (`trim`, compactação de espaços em branco,
limite de 500 caracteres), desduplicada dentro do lote por meio de uma
`factKey(category, content)` estável e armazenada via `createMemory()` com os
metadados `{category, extractedAt, source: "llm_response"}`. O texto de entrada
é limitado a 64 KiB (`MAX_EXTRACTION_TEXT_LENGTH`) — quando é maior, a
**parte final** do texto é usada para que o conteúdo mais recente do assistente
sempre seja considerado.

`extractFactsFromText(text)` é exportada para testes e retorna os fatos
estruturados sem armazená-los.

## Recuperação (`retrieval.ts`)

`retrieveMemories(apiKeyId, config)` é o principal ponto de entrada. Ela:

1. Normaliza e valida a configuração por meio de `MemoryConfigSchema`.
2. Retorna `[]` imediatamente quando `enabled` é false ou `maxTokens <= 0`.
3. Limita `maxTokens` ao intervalo `[1, 8000]`.
4. Detecta se a tabela moderna `memories` existe (em vez da tabela legada
   `memory`), para que bancos de dados mais antigos continuem funcionando.
5. Cria a consulta base com a proteção de expiração
   (`expires_at IS NULL OR datetime(expires_at) > datetime('now')`), escopo
   opcional de sessão e limite opcional de `retentionDays`.
6. Ramifica de acordo com a estratégia:
   - **`exact`** (padrão): ordem cronológica com `ORDER BY created_at DESC LIMIT 100`.
   - **`semantic`**: se `config.query` estiver presente e `memory_fts` existir,
     executa `JOIN` com `memory_fts MATCH ?` e ordena pela classificação FTS;
     volta à ordem cronológica quando o FTS retorna 0 linhas.
   - **`hybrid`**: união dos resultados FTS (maior relevância) com o conjunto
     cronológico, desduplicada por id.
7. Calcula uma pontuação de relevância por palavra-chave (`getRelevanceScore`)
   sobre `content`, `key` e o JSON de `metadata` quando uma consulta é fornecida.
   Linhas com pontuação zero são filtradas.
8. Ordena pela pontuação em ordem decrescente e, em seguida, por `createdAt`
   em ordem decrescente.
9. Percorre a lista classificada e aceita entradas enquanto o total acumulado
   de `estimateTokens(content)` (≈ `length / 4`) permanece dentro do orçamento.
   Sempre retorna pelo menos uma entrada quando há alguma correspondência.

`estimateTokens` é exportada e usada pela recuperação, sumarização e pela
ferramenta MCP `omniroute_memory_search`.

## Injeção (`injection.ts`)

`injectMemory(request, memories, provider)`:

1. Combina todo o conteúdo das memórias em uma única string `Memory context: …`.
2. Seleciona uma estratégia pelo nome do provedor:
   - **Mensagem do sistema** (padrão para OpenAI, Anthropic, Gemini, …) — adiciona
     um `{role: "system", content: memoryText}` antes de quaisquer mensagens do sistema
     existentes, para que os prompts de sistema do usuário ainda tenham precedência.
   - **Mensagem do usuário** (fallback) — para provedores em
     `PROVIDERS_WITHOUT_SYSTEM_MESSAGE`: `o1`, `o1-mini`, `o1-preview`,
     `glm`, `glmt`, `glm-cn`, `zai`, `qianfan`. Eles rejeitam o papel de sistema
     e, caso contrário, retornariam 400 (consulte a issue #1701 para GLM/Zhipu).
3. Registra a contagem, a estratégia e o modelo em `memory.injection.injected`.

`providerSupportsSystemMessage(provider)` é exportada para chamadores que precisam
tomar suas próprias decisões de roteamento. Provedores desconhecidos usam `true`
por padrão (papel de sistema permitido) por segurança.

## Configurações (`settings.ts`)

A configuração de memória é **armazenada na tabela de configurações do banco de dados**, não em variáveis de ambiente.
`getMemorySettings()` lê os dados de `getSettings()` e armazena o resultado em cache
no processo; `invalidateMemorySettingsCache()` é chamada pela rota PUT de configurações
após as gravações.

### Campos legados (todas as versões)

| Chave do banco de dados | Tipo    | Padrão                                            | Controle da interface                                           |
| ----------------------- | ------- | ------------------------------------------------- | --------------------------------------------------------------- |
| `memoryEnabled`         | boolean | `false` (desativado por padrão desde v3.8.30)     | Ativar/desativar memória                                        |
| `memoryMaxTokens`       | integer | `2000` (intervalo `0–16000`)                      | Orçamento de tokens para injeção                                |
| `memoryRetentionDays`   | integer | `30` (intervalo `1–365`)                          | Janela de retenção                                              |
| `memoryStrategy`        | enum    | `"hybrid"` (um de `recent`, `semantic`, `hybrid`) | Estratégia de recuperação                                       |
| `skillsEnabled`         | boolean | `false`                                           | Alterna a injeção de habilidades por chave (consulte SKILLS.md) |

Observação: a estratégia `"recent"` da interface é mapeada para a estratégia interna
de recuperação `"exact"` por meio de `toMemoryRetrievalConfig()` (ordem cronológica).

### Novos campos (v3.8.6, plano 21 D9)

Consulte também a seção "Extensão das configurações" acima para obter descrições dos campos.

| Chave do banco de dados     | Campo da API             | Padrão   |
| --------------------------- | ------------------------ | -------- |
| `memoryEmbeddingSource`     | `embeddingSource`        | `"auto"` |
| `memoryEmbeddingModel`      | `embeddingProviderModel` | `null`   |
| `memoryTransformersEnabled` | `transformersEnabled`    | `false`  |
| `memoryStaticEnabled`       | `staticEnabled`          | `false`  |
| `memoryRerankEnabled`       | `rerankEnabled`          | `false`  |
| `memoryRerankModel`         | `rerankProviderModel`    | `null`   |
| `memoryVectorStore`         | `vectorStore`            | `"auto"` |

As chaves do banco de dados relacionadas ao Qdrant (`qdrantEnabled`, `qdrantHost`, `qdrantPort`,
`qdrantApiKey`, `qdrantCollection` com padrão `"omniroute_memory"`,
`qdrantEmbeddingModel` com padrão `"openai/text-embedding-3-small"`) são lidas por
`normalizeQdrantConfig()` em `qdrant.ts`.

### Variáveis de ambiente (v3.8.6)

Seis variáveis de ambiente opcionais ajustam o comportamento do mecanismo em tempo de execução (documentadas em `.env.example`):

| Variável                        | Padrão                     | Descrição                                                                                                                                            |
| ------------------------------- | -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `MEMORY_EMBEDDING_CACHE_TTL_MS` | `300000`                   | TTL do cache de embeddings (5 min)                                                                                                                   |
| `MEMORY_EMBEDDING_CACHE_MAX`    | `1000`                     | Número máximo de entradas no cache LRU de embeddings                                                                                                 |
| `MEMORY_TRANSFORMERS_MODEL`     | `Xenova/all-MiniLM-L6-v2`  | Repositório do HF para o modelo Transformers.js                                                                                                      |
| `MEMORY_STATIC_MODEL`           | `minishlab/potion-base-8M` | Repositório do HF para o modelo estático potion                                                                                                      |
| `MEMORY_STATIC_CACHE_DIR`       | `<DATA_DIR>/embeddings`    | Local de armazenamento dos modelos baixados                                                                                                          |
| `MEMORY_VEC_TOP_K`              | `20`                       | top-K padrão para busca vetorial                                                                                                                     |
| `MEMORY_RRF_K`                  | `60`                       | Constante k do RRF para busca híbrida                                                                                                                |
| `MEMORY_VEC_QUANTIZATION`       | `none`                     | Defina como `int8` para armazenar vetores locais do sqlite-vec quantizados (cerca de 4× menores; opcional). A mudança de modo força uma reindexação. |

## Sumarização (`summarization.ts`)

`summarizeMemories(apiKeyId, sessionId?, maxTokens = 4000)` compacta o conteúdo
mais antigo quando o total acumulado de tokens nas memórias de uma chave excede
o limite. A função itera pelas linhas em ordem DESC por `created_at`, mantém as
linhas que cabem no limite e, para as demais, substitui `content` no próprio
registro pelas três primeiras frases do original. `tokensSaved` é a diferença
em `estimateTokens` entre o conteúdo antigo e o novo.

Essa rotina está **disponível, mas não é chamada automaticamente** no pipeline
de chat atual — chame-a por meio de um cron, de uma ação administrativa ou da
integração com `MemoryConfig.autoSummarize` caso precise de compactação contínua.
A perda de dados é irreversível: o texto original é sobrescrito.

## API REST

Todos os endpoints exigem autenticação de gerenciamento (`requireManagementAuth`).

### Endpoints principais de memória (existentes + atualizados)

| Método   | Caminho              | Descrição                                                                                                                                                                              |
| -------- | -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `GET`    | `/api/memory`        | Lista paginada com filtros: `apiKeyId`, `type`, `sessionId`, `q`, `limit`, `page`, `offset`. A resposta inclui `stats.total`, `stats.tokensUsed`, `stats.hitRate`, `cacheStats`        |
| `POST`   | `/api/memory`        | Cria uma entrada (validada pelo Zod: `content`, `key`, `type` opcional, `sessionId`, `apiKeyId`, `metadata`, `expiresAt`). Chama `createMemory()`, que faz upsert em `(apiKeyId, key)` |
| `GET`    | `/api/memory/[id]`   | Busca uma única entrada por UUID                                                                                                                                                       |
| `PUT`    | `/api/memory/[id]`   | Atualiza os campos da entrada (`type`, `key`, `content`, `metadata`). Corpo: `MemoryUpdatePutSchema`. Também sincroniza o vetor se a fonte do embedding estiver disponível.            |
| `DELETE` | `/api/memory/[id]`   | Exclui uma entrada; também a exclui de `vec_memories` (D15) e do Qdrant em regime de melhor esforço. Retorna 404 quando não encontrada.                                                |
| `GET`    | `/api/memory/health` | Executa `verifyExtractionPipeline("health-check")` — ciclo completo de criação→listagem→exclusão. Retorna `{working, latencyMs, error?}`                                               |

### Novos endpoints do mecanismo de memória (plano 21)

| Método | Caminho                           | Descrição                                                                                                                                                                                                                       |
| ------ | --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `POST` | `/api/memory/retrieve-preview`    | Simulação de `retrieveMemories` — retorna resultados classificados com pontuação, camada e tokens. Corpo: `RetrievePreviewSchema`. NÃO injeta nem modifica memórias.                                                            |
| `GET`  | `/api/memory/embedding-providers` | Lista provedores com modelos de embedding, indicando quais têm uma chave de API configurada.                                                                                                                                    |
| `GET`  | `/api/memory/engine-status`       | Retorna o status completo do mecanismo: camada de palavras-chave, resolução de embeddings, estatísticas do armazenamento vetorial, integridade do Qdrant e configuração de reranqueamento. Formato: `MemoryEngineStatusSchema`. |
| `POST` | `/api/memory/summarize`           | Aciona manualmente a compactação de memória. Corpo: `MemorySummarizeSchema` (`olderThanDays`, `apiKeyId?`, `dryRun`). Retorna `{candidates, tokensSaved}`.                                                                      |
| `POST` | `/api/memory/reindex`             | Aciona a reindexação vetorial para memórias com `needs_reindex=1`. Corpo: `MemoryReindexSchema` (`force`). Retorna `{started, pending}`.                                                                                        |

### Endpoints de configurações

| Método | Caminho                                 | Descrição                                                                                                         |
| ------ | --------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `GET`  | `/api/settings/memory`                  | `MemorySettingsExtended` atual normalizado (7 novos campos + legados)                                             |
| `PUT`  | `/api/settings/memory`                  | Atualiza qualquer campo de `MemorySettingsExtendedSchema` (12 campos no total)                                    |
| `GET`  | `/api/settings/qdrant`                  | Configurações atuais do Qdrant (`QdrantSettingsSchema`)                                                           |
| `PUT`  | `/api/settings/qdrant`                  | Atualiza as configurações do Qdrant. Corpo: `QdrantSettingsUpdateSchema`. `apiKey` = string vazia remove a chave. |
| `GET`  | `/api/settings/qdrant/health`           | Verificação de disponibilidade na instância configurada do Qdrant. Retorna `QdrantHealthResultSchema`.            |
| `POST` | `/api/settings/qdrant/search`           | Teste de pesquisa semântica no Qdrant. Corpo: `QdrantSearchSchema` (`query`, `topK`).                             |
| `POST` | `/api/settings/qdrant/cleanup`          | Remove do Qdrant os pontos referentes a memórias expiradas/antigas.                                               |
| `GET`  | `/api/settings/qdrant/embedding-models` | Lista os modelos de embedding disponíveis para o Qdrant.                                                          |

A consulta de listagem de `/api/memory` oferece suporte à paginação baseada em
`page` (`parsePaginationParams`) **ou** ao `offset` bruto — quando `offset` está
presente, ele tem precedência, e um `page` derivado é calculado para o formato
da resposta.

## Ferramentas MCP (`open-sse/mcp-server/tools/memoryTools.ts`)

Quando o servidor MCP está habilitado, três ferramentas de memória são registradas:

- `omniroute_memory_search` — `{apiKeyId, query?, type?, maxTokens?, limit?}`
  → encapsula `retrieveMemories()`. A partir da v3.8.6 (D16), a `strategy` é lida
  de `getMemorySettings()` em vez de ser definida diretamente como `"exact"`. Se
  `query` for fornecida e `strategy` for `semantic` ou `hybrid`, o armazenamento
  vetorial será usado quando estiver disponível.
- `omniroute_memory_add` — `{apiKeyId, sessionId?, type, key, content,
metadata?}` → encapsula `createMemory()`. Aceita apenas os 4 tipos canônicos:
  `factual`, `episodic`, `procedural`, `semantic` (D17).
- `omniroute_memory_clear` — `{apiKeyId, type?, olderThan?}` → lista as entradas
  correspondentes, opcionalmente filtra pelo carimbo de data/hora de criação anterior,
  e então exclui cada uma por meio de `deleteMemory()` (que também remove vetores do sqlite-vec + Qdrant).

Consulte [MCP-SERVER.md](./MCP-SERVER.md) para obter detalhes sobre transporte e escopo.

## Painel (Memory Studio)

`src/app/(dashboard)/dashboard/memory/page.tsx` agora é um **Studio com 3 abas**:

### Aba: Memórias

- Cartão conceitual (explicação recolhível "Como funciona").
- Lista, pesquisa e paginação em tempo real (debounce de 300 ms).
- Filtro de tipo (`factual` / `episodic` / `procedural` / `semantic` / todos).
- Modal para adicionar memória (chave, conteúdo, tipo).
- Edição em linha (botão de lápis → `PUT /api/memory/[id]`).
- Exclusão por linha (com diálogo de confirmação).
- Exportação JSON da página atual; importação JSON por meio do seletor de arquivos.
- Cartões de estatísticas: `totalEntries`, `tokensUsed`, `hitRate`.
- Botão "Compactar antigas" → `POST /api/memory/summarize` (uma simulação primeiro mostra
  a quantidade de candidatas e, em seguida, solicita confirmação).
- Um indicador verde/vermelho de integridade controlado por `GET /api/memory/health`.

### Aba: Playground

- Campo de consulta + seletor de estratégia (Exata / Semântica / Híbrida) + orçamento de tokens.
- "Simular" → `POST /api/memory/retrieve-preview` — mostra resultados classificados com
  `score`, `tier`, `tokens`, `vecScore`, `ftsScore`.
- Painel de resolução mostrando qual fonte de embeddings / armazenamento vetorial foi usado e
  se ocorreu um fallback.

### Aba: Mecanismo

- Painel de status do mecanismo (indicador de palavra-chave FTS5, indicador de embeddings, indicador de armazenamento vetorial,
  indicador de integridade do Qdrant, indicador de reclassificação).
- Botão "Reindexar agora" → `POST /api/memory/reindex`.
- Seletor de fonte de embeddings (automática / remota / estática / transformers + opções de ativação).
- Cartão de configuração do Qdrant (opção de ativação, host/porta/coleção/chave, teste de conexão,
  teste de pesquisa semântica, limpeza).
- Cartão de configuração de reclassificação (opção de ativação, seletor de provedor/modelo).

As configurações de memória e do Qdrant também ficam em
`/dashboard/settings → Memory & Skills` (`MemorySkillsTab.tsx`) para
a interface de configurações legada/global.

## Cache

`src/lib/memory/store.ts` mantém um cache semelhante a LRU em processo
(`MEMORY_CACHE_TTL = 1 min`, `MEMORY_MAX_CACHE_SIZE = 500`, com remoção dos 20 %
mais antigos) para leituras de `getMemory(id)`, além de uma camada genérica
de chave/valor `memoryCache` (`src/lib/memory/cache.ts`) com métodos
`get`/`set`/`invalidate`, usada por chamadores que desejam seu próprio cache com escopo definido (LRU
de 1 000 entradas, TTL padrão de 5 min).

## Privacidade e Ciclo de Vida

- A propriedade da memória é definida pelo ID da chave de API (`resolveMemoryOwnerId` em
  `chatCore.ts`). Sem um `apiKeyInfo.id`, nem a recuperação, nem a injeção,
  nem a extração são executadas.
- Entradas com um `expires_at` futuro são excluídas da recuperação; entradas
  antigas além de `retentionDays` são excluídas pela cláusula
  `created_at >= cutoff` em `retrieveMemories`.
- Para exclusão permanente, use `DELETE /api/memory/[id]` ou `omniroute_memory_clear`.
- A extração é executada de forma assíncrona, sem aguardar o resultado, via `setImmediate`; falhas são registradas em
  `memory.extraction.background.failed` e nunca são expostas ao chamador.
- Os ciclos de verificação (`verifyExtractionPipeline`) removem suas próprias
  entradas de teste em um bloco `finally`.

## Consulte Também

- [SKILLS.md](./SKILLS.md) — a configuração `skillsEnabled` injeta definições
  de ferramentas junto com a memória.
- [MCP-SERVER.md](./MCP-SERVER.md) — transporte / escopos do MCP.
- [API_REFERENCE.md](../reference/API_REFERENCE.md) — superfície mais ampla da API.
- Módulos-fonte:
  - `src/lib/memory/types.ts`, `schemas.ts`
  - `src/lib/memory/store.ts`, `retrieval.ts`, `injection.ts`, `reindex.ts`
  - `src/lib/memory/extraction.ts`, `summarization.ts`, `verify.ts`
  - `src/lib/memory/settings.ts`, `qdrant.ts`, `cache.ts`
  - `src/lib/memory/vectorStore.ts` — sqlite-vec + RRF híbrido
  - `src/lib/memory/embedding/index.ts` — camada de embeddings de múltiplas fontes
  - `src/lib/memory/embedding/types.ts`, `remote.ts`, `staticPotion.ts`,
    `transformersLocal.ts`, `cache.ts`
  - `src/shared/schemas/memory.ts` — esquemas Zod para todos os corpos da API de memória
  - `src/shared/schemas/qdrant.ts` — esquemas Zod para configurações/operações do Qdrant
  - `src/lib/db/memoryVec.ts` — CRUD para `memory_vec_meta`
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
  - `src/app/(dashboard)/dashboard/memory/` — interface do Studio (página + componentes +
    abas + hooks)
  - `open-sse/handlers/chatCore.ts` (integração da injeção / extração)
  - `open-sse/mcp-server/tools/memoryTools.ts`

---

## Escolhendo um Provedor de Embeddings (v3.8.16+)

O mecanismo de memória do OmniRoute oferece suporte a **quatro fontes de embeddings** (`src/lib/memory/embedding/`). Cada uma apresenta diferentes relações de compromisso entre **latência, custo, qualidade do modelo e complexidade de configuração**.

### As Fontes de Embeddings

| Provedor       | Fonte                                                    | Latência                              | Custo                | Qualidade                        | Configuração                                |
| -------------- | -------------------------------------------------------- | ------------------------------------- | -------------------- | -------------------------------- | ------------------------------------------- |
| `transformers` | Modelo ONNX local (Xenova/all-MiniLM-L6-v2)              | ~50-150ms (CPU)                       | Grátis               | Boa                              | Apenas `npm install`                        |
| `static`       | Vetores pré-calculados (em cache)                        | <1ms                                  | Grátis               | N/D (depende de acerto no cache) | Nenhuma                                     |
| `remote`       | API da OpenAI / Cohere / Voyage                          | ~100-300ms                            | $0.02-0.10/1M tokens | Excelente                        | Chave de API                                |
| `auto`         | Seleciona a melhor fonte disponível em tempo de execução | Igual à fonte selecionada             | Grátis               | Igual à fonte selecionada        | Nenhuma                                     |
| _(cache)_      | Camada LRU em memória sobre qualquer fonte               | <1ms (acerto), latência total (falha) | Grátis               | Igual à fonte subjacente         | Sempre ativa (não é uma fonte selecionável) |

### Árvore de Decisão

```
                  Qual é o contexto da sua implantação?
                  │
      ┌───────────┼───────────┬──────────────┐
      │           │           │              │
  DEV/TESTE   PROD PEQUENA PROD GRANDE    EDGE / OFFLINE
      │           │           │              │
      ▼           ▼           ▼              ▼
  transformers transformers remote (Qdrant) transformers
  (grátis, sem API)          (melhor qualidade) (sem internet)
      │           │           │              │
      └────────┬──┴───────────┴──────────────┘
               │
               ▼
            SEMPRE adicione a camada `cache` por cima
            (LruCache envolve qualquer provedor)
```

### Configuração do Banco de Dados e da API

As opções de embeddings da memória são configuradas por meio da API/interface de Configurações, não por variáveis de ambiente. As chaves relevantes do banco de dados de configurações, em Configurações (`normalizeMemorySettings` em `src/lib/memory/settings.ts`), são:

- `memoryEmbeddingSource`: `"transformers"` (local), `"remote"` (baseada em API, por exemplo, OpenAI), `"static"` (armazenamento externo) ou `"auto"`
- `memoryEmbeddingProviderModel`: identificador do modelo para fontes remotas/estáticas (por exemplo, `"text-embedding-3-small"`)
- `memoryTransformersEnabled`: `true` | `false`
- `memoryStaticEnabled`: `true` | `false`
- `memoryVectorStore`: `"sqlite-vec"`, `"qdrant"` ou `"auto"`

#### Modelo Local (`transformers`)

Usa transformers.js internamente para executar modelos locais:

```bash
# Variáveis de ambiente lidas no código (src/lib/memory/embedding/index.ts):
MEMORY_TRANSFORMERS_MODEL=Xenova/all-MiniLM-L6-v2  # Repositório do modelo no HF
MEMORY_STATIC_MODEL=minishlab/potion-base-8M       # Modelo potion estático do HF
MEMORY_STATIC_CACHE_DIR=<DATA_DIR>/embeddings      # Diretório do cache
```

#### Cache LRU de Embeddings

O cache está sempre ativo por padrão e é configurado por meio de variáveis de ambiente:

```bash
MEMORY_EMBEDDING_CACHE_MAX=1000                    # Máximo de itens em cache
MEMORY_EMBEDDING_CACHE_TTL_MS=300000               # TTL (5 min)
```

### Números de Desempenho

Benchmark em um servidor x86 típico de 4 núcleos (textos com ~100 tokens cada):

| Provedor             | p50   | p95   | p99   | Custo / 1 milhão de embeddings     |
| -------------------- | ----- | ----- | ----- | ---------------------------------- |
| `transformers` (CPU) | 80ms  | 180ms | 350ms | Gratuito                           |
| `remote` (OpenAI)    | 120ms | 220ms | 400ms | ~$0,02 (ada-002) / $0,13 (3-large) |
| `static` (Qdrant)    | 15ms  | 30ms  | 60ms  | Depende da hospedagem do Qdrant    |
| `cache` (acerto)     | <1ms  | <1ms  | 2ms   | Gratuito                           |

---

## Padrões de Extração de Fatos (v3.8.16+)

O módulo `extraction.ts` (`src/lib/memory/extraction.ts`) usa **correspondência de padrões com expressões regulares** para extrair fatos estruturados de mensagens de conversas. Entender esses padrões ajuda você a ajustar a qualidade da extração para seu caso de uso.

### Categorias de Padrões Padrão

| Categoria           | Exemplo de padrão                                           | Captura                              |
| ------------------- | ----------------------------------------------------------- | ------------------------------------ |
| PREFERENCE_PATTERNS | `"I prefer <X>"`, `"I like <X>"`, `"I hate <X>"`            | Preferências do usuário              |
| DECISION_PATTERNS   | `"I'll use <X>"`, `"I decided to <X>"`, `"I went with <X>"` | Decisões do usuário (episódicas)     |
| PATTERN_PATTERNS    | `"I usually <X>"`, `"I always <X>"`, `"I never <X>"`        | Padrões comportamentais persistentes |

### Exemplos de Padrões (Simplificados)

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

Quando um usuário diz:

> "I prefer TypeScript. I'll use Postgres for this project. I always commit before pushing. I don't like Python."
> A extração produz 4 memórias:
>
> | Chave                                | Categoria   | Tipo      | Conteúdo                    |
> | ------------------------------------ | ----------- | --------- | --------------------------- |
> | `preference:typescript`              | preferência | factual   | "TypeScript"                |
> | `decision:postgres_for_this_project` | decisão     | episódica | "Postgres for this project" |
> | `pattern:commit_before_pushing`      | padrão      | factual   | "commit before pushing"     |
> | `preference:python`                  | preferência | factual   | "Python"                    |

### Limites da Extração

Para evitar extrações descontroladas, aplicam-se os seguintes limites:

| Tamanho mínimo do conteúdo | 3 caracteres |
| Tamanho máximo do conteúdo | 500 caracteres |

### Quando Desativar a Extração

A extração é executada automaticamente sempre que a memória está habilitada; não há uma opção separada
exclusiva para extração. Para desativá-la, desabilite completamente a memória (`enabled: false`
por meio de `PUT /api/settings/memory`). Considere fazer isso quando:

- Você tem um alto volume de mensagens e o custo da extração não é insignificante
- Suas conversas são, em sua maioria, transitórias (bate-papo, depuração), sem valor de longo prazo
- Você já está capturando o contexto por meio de plugins personalizados

---

## Ajuste do RRF Híbrido (v3.8.16+)

O algoritmo **Reciprocal Rank Fusion (RRF)** combina resultados do FTS5 (palavras-chave) e de vetores (semânticos). O parâmetro `k` controla quanto peso é atribuído aos resultados com classificação mais baixa.

### A Fórmula

Para cada memória candidata, a pontuação RRF é:

```
RRF(d) = Σ  1 / (k + rank_i(d))
```

Onde:

- `k` é a constante (padrão 60)
- `rank_i(d)` é a classificação do documento `d` no i-ésimo sistema de recuperação (FTS, vetor)
- A soma abrange todos os sistemas de recuperação

### Como `k` Afeta os Resultados

| Valor de `k`        | Efeito                                                                                                | Mais adequado para                                         |
| ------------------- | ----------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| `k=0`               | Fusão pura de classificações (sem suavização)                                                         | Referência teórica                                         |
| `k=10-30`           | Atribui muito peso aos principais resultados; classificações baixas pouco contribuem                  | Quando os 3 primeiros resultados geralmente estão corretos |
| **`k=60`** (padrão) | Equilibrado — todos os 10 primeiros resultados contribuem de maneira significativa                    | Recuperação de uso geral                                   |
| `k=100+`            | Mais uniforme — até resultados com classificação baixa podem dominar caso apareçam em vários sistemas | Quando a revocação > precisão é essencial                  |

### Ajustando `k` na Prática

```bash
# Padrão
MEMORY_RRF_K=60

# Precisão agressiva (memória pequena, poucos documentos)
MEMORY_RRF_K=20

# Revocação máxima (memória grande, consultas variadas)
MEMORY_RRF_K=120
```

**Exemplo com `k=20`:**

- Classificação 1 no FTS → contribuição `1/21 = 0.048`
- Classificação 10 no FTS → contribuição `1/30 = 0.033`
- Classificação 1 no vetor → contribuição `0.048`
- Máximo combinado: `0.096`

**Exemplo com `k=60`:**

- Classificação 1 no FTS → contribuição `1/61 = 0.016`
- Classificação 10 no FTS → contribuição `1/70 = 0.014`
- Classificação 1 no vetor → contribuição `0.016`
- Máximo combinado: `0.033`

Com um `k` mais alto, a **diferença relativa** entre a primeira e a décima posição é menor, portanto o algoritmo depende mais do **consenso entre os sistemas de recuperação** do que da confiança na primeira posição.

### Quando Alterar `k`

| Sintoma                                                                 | Experimente                                                                           |
| ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| O primeiro resultado sempre vence, mas está errado                      | **Diminuir** k (por exemplo, 20) — a confiança na primeira posição importa mais       |
| A resposta correta está entre as 5 primeiras, mas não em primeiro lugar | **Aumentar** k (por exemplo, 100) — uma pontuação mais uniforme recompensa o consenso |
| A revocação é alta, mas a precisão é baixa                              | **Diminuir** k — torne a classificação mais precisa                                   |
| A revocação é baixa (documentos relevantes ausentes)                    | **Aumentar** k — dê uma chance aos documentos com classificação mais baixa            |

### Ponderação do RRF

A fusão recíproca de classificações usa pesos iguais para a classificação vetorial semântica e a classificação da pesquisa de texto completo:

```
RRF(d) = 1/(k + rank_vector) + 1/(k + rank_fts)
```

Não há variáveis de ambiente para ajustar pesos individuais (`MEMORY_RRF_VECTOR_WEIGHT`/`MEMORY_RRF_FTS_WEIGHT` não existem).

---

## Estratégia de sumarização (v3.8.16+)

O módulo `summarization.ts` (`src/lib/memory/summarization.ts`) compacta memórias antigas para manter pequeno o conjunto ativo, preservando a capacidade de recuperação.

### Quando a sumarização é acionada

| Acionador                  | Limite (padrão) |
| -------------------------- | --------------- |
| Acionamento manual via API | não se aplica   |

### O que é sumarizado

Dois pontos de entrada são exportados de `summarization.ts`:

- **`summarizeMemories(apiKeyId, sessionId?, maxTokens = 4000)`** — condensa as
  memórias de uma sessão em um único texto de resumo, limitado por um orçamento de tokens.
- **`summarizeMemoriesOlderThan(apiKeyId, days, dryRun)`** — a compactação baseada
  em idade usada pela API: seleciona todas as memórias mais antigas que `days`, cria
  uma única memória de resumo condensada a partir delas e, quando `dryRun` é `false`, exclui
  os originais. Passe `dryRun: true` para visualizar o conjunto candidato e o total de tokens
  sem modificar nada.

Não há uma etapa de agrupamento por tag/chave nem uma pontuação por memória de "essencial vs. sumarizável" —
a seleção é feita exclusivamente pelo limite de idade, e o texto do resumo é uma linha condensada,
prefixada pelo tipo, para cada candidata.

### Acionando a sumarização

A sumarização é **manual / opcional** — a configuração `autoSummarize` é `false` por
padrão, portanto nada é compactado automaticamente. Acione-a por meio da API:

```bash
curl -X POST http://localhost:20128/api/memory/summarize \
  -H "Authorization: Bearer $OMNIROUTE_KEY"
```

Para mantê-la desativada, basta deixar `autoSummarize` com seu valor padrão (`false`).

### Dicas para a qualidade da sumarização

- **Visualize primeiro com `dryRun`** — `summarizeMemoriesOlderThan(..., true)` retorna
  a lista de candidatas e a contagem total de tokens, permitindo confirmar o que seria mesclado
  antes de excluir os originais.
- **Execute a sumarização durante horários de baixo tráfego** se você tiver um grande corpus de memórias — a chamada ao LLM é a parte lenta

```bash
# Estilo cron: sumarizar diariamente às 3h
0 3 * * * curl -X POST http://localhost:20128/api/memory/summarize \
  -H "Authorization: Bearer $OMNIROUTE_KEY"
```

---

## Padrão de provedor MemoryBackend

> **Fonte da verdade:** `src/lib/memory/backend.ts`, `src/lib/memory/genericBackend.ts`, `src/lib/memory/manager.ts`
> **Testes:** `src/lib/memory/__tests__/generic-backend.test.ts`

O padrão de provedor MemoryBackend introduz uma **camada de abstração de backend conectável** sobre o mecanismo de memória existente. Em vez de ficar vinculado a uma única implementação de armazenamento, o sistema de memória agora oferece suporte a vários backends (SQLite, Obsidian, Notion e backends HTTP personalizados), com roteamento configurável de primário/fallback.

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
│  Primário ──► Backend A  (por exemplo, SQLite)           │
│  Fallback ──► Backend B  (por exemplo, Obsidian)         │
│              Backend C  (por exemplo, Notion via GenericBackend) │
└──────────────────────┬───────────────────────────────────┘
                       │
        ┌──────────────┼──────────────┐
        ▼              ▼              ▼
┌────────────┐ ┌────────────┐ ┌──────────────────┐
│ Backend    │ │ Backend    │ │ Backend de       │
│ SQLite     │ │ Obsidian   │ │ memória genérico │
│            │ │            │ │ (HTTP)           │
└────────────┘ └────────────┘ └──────────────────┘
```

#### Interface principal (`backend.ts`)

Todo backend deve implementar a interface `MemoryBackend`:

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

  // Integridade
  health(): Promise<HealthCheckResult>;

  // Ciclo de vida (opcional)
  initialize?(): Promise<void>;
  shutdown?(): Promise<void>;
}
```

#### MemoryManager (`manager.ts`)

Orquestrador singleton que:

- **Registra** backends por meio de `register(backend)` — chamado na inicialização a partir de `index.ts`
- **Configura** o primário e os fallbacks por meio de `configure(primary, fallbacks)`
- **Roteia** operações CRUD/pesquisas para o primário, com uma cadeia de fallback em caso de falha
- **Verifica a integridade** de todos os backends periodicamente

**Comportamento de fallback:**

| Operação | Primário                     | Fallbacks                     |
| -------- | ---------------------------- | ----------------------------- |
| `create` | ✅ Somente o primário        | ❌                            |
| `get`    | ✅ Tenta primeiro o primário | ✅ Fallback se for null       |
| `update` | ✅ Somente o primário        | ✅ Sincronização sem aguardar |
| `delete` | ✅ Somente o primário        | ✅ Sincronização sem aguardar |
| `list`   | ✅ Somente o primário        | ❌                            |
| `search` | ✅ Primeiro o primário       | ✅ Fallback em caso de erro   |

#### GenericMemoryBackend (`genericBackend.ts`)

Um conector HTTP genérico que adapta qualquer API REST a um MemoryBackend. Útil para:

- **Notion** — conecte por meio da API do Notion
- **Obsidian** — conecte por meio da API REST local do Obsidian
- **Backends personalizados** — qualquer serviço que exponha uma API RESTful de memória

**Configuração:**

```typescript
interface GenericBackendConfig {
  baseUrl: string;           // URL base da API do backend
  apiKey?: string;           // Token Bearer para autenticação
  headers?: Record<string, string>;  // Cabeçalhos HTTP personalizados
  timeout?: number;          // Tempo limite da solicitação (padrão: 30000ms)
  backendType?: string;      // Para registro de logs

  // Substituições de endpoints (os padrões usam convenções REST)
  endpoints?: {
    search?: string;   // padrão: "/memories/search"
    create?: string;   // padrão: "/memories"
    list?: string;     // padrão: "/memories"
    get?: string;      // padrão: "/memories/{id}"
    update?: string;   // padrão: "/memories/{id}"
    delete?: string;   // padrão: "/memories/{id}"
    health?: string;   // padrão: "/health"
  };

  // Mapeamentos de nomes de parâmetros de consulta
  queryParams?: {
    query?/apiKeyId?/limit?/offset?/strategy?/maxTokens?/type?/sessionId?/orderBy?/orderDir?/options?
  };

  // Mapeamentos de nomes de parâmetros de caminho
  pathParams?: {
    id?/memoryId?
  };
}
```

Os **backends conhecidos** são pré-configurados em `KNOWN_BACKENDS`:

```typescript
createKnownBackend("obsidian"); // → GenericMemoryBackend apontando para localhost:27123
createKnownBackend("notion"); // → GenericMemoryBackend apontando para api.notion.com/v1
```

#### Backends integrados

##### SQLiteBackend (`sqliteBackend.ts`)

O backend primário padrão. Encapsula o armazenamento de memória existente baseado em SQLite usando `src/lib/memory/store.ts`. Registrado automaticamente na inicialização.

```typescript
import { sqliteBackend } from "./sqliteBackend";
memoryManager.register(sqliteBackend);
```

##### ObsidianBackend (`obsidianBackend.ts`)

Encapsula a integração existente com o Obsidian (`src/lib/memory/obsidianBackend.ts`). Conecta-se a um cofre do Obsidian por meio da API REST local do Obsidian.

### Configurações

As configurações do backend de memória são armazenadas na tabela de configurações do aplicativo e gerenciadas por meio de `src/lib/memory/settings.ts`:

| Configuração               | Chave de ambiente/configuração | Padrão     | Descrição                                 |
| -------------------------- | ------------------------------ | ---------- | ----------------------------------------- |
| Backend primário           | `memoryPrimaryBackend`         | `"sqlite"` | ID do backend primário                    |
| Backends de fallback       | `memoryFallbackBackends`       | `[]`       | IDs ordenados dos backends de fallback    |
| Configurações dos backends | `memoryBackendConfigs`         | `{}`       | Substituições de configuração por backend |

As configurações são normalizadas por meio de `normalizeMemorySettings()` e armazenadas em cache em `getMemorySettings()`.

### Fluxo de inicialização

```
Inicialização do aplicativo
  → importações de index.ts (efeito colateral): registram SQLiteBackend
  → initMemoryBackends() chamado a partir do ciclo de vida do aplicativo:
      1. Carregar configurações (getMemorySettings)
      2. Configurar backend primário + fallback
      3. Inicializar todos os backends (verificação de integridade)
      4. Pronto para solicitações
```

### Adicionando um novo backend

1. **Implemente a interface `MemoryBackend`** em `src/lib/memory/<name>Backend.ts`
2. **Exporte** a partir de `src/lib/memory/index.ts`
3. **Registre** com `memoryManager.register(yourBackend)` na inicialização
4. **Configure** por meio das configurações: defina `memoryPrimaryBackend` como o ID do seu backend
5. **Teste** usando `src/lib/memory/__tests__/generic-backend.test.ts` como referência

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

Saída esperada: **35 testes, todos aprovados**, abrangendo:

- Construtor (2)
- Verificação de integridade (4) — sucesso, falha 500, erro de rede, latência
- Inicialização (2) — sucesso, falha
- Criação (2) — endpoint padrão, endpoint personalizado
- Obtenção (4) — sucesso, 404 → null, lançamento de erro diferente de 404, parâmetros de caminho personalizados
- Atualização (2) — sucesso, 404 → false
- Exclusão (2) — sucesso, 404 → false
- Listagem (2) — parâmetros de consulta, nomes de parâmetros personalizados
- Pesquisa (3) — parâmetros de consulta, endpoint personalizado, serialização de opções
- Cabeçalhos de autenticação (2) — token Bearer, cabeçalhos personalizados
- Fábrica (1)

#### Verificação de tipos

```bash
npm run typecheck:core
```

Esperado: **0 erros**.
