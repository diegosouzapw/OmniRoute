# Memory System (Igbo)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/MEMORY.md) · 🇪🇹 [am](../../../am/docs/frameworks/MEMORY.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/MEMORY.md) · 🇦🇿 [az](../../../az/docs/frameworks/MEMORY.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/MEMORY.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/MEMORY.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/MEMORY.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/MEMORY.md) · 🇩🇰 [da](../../../da/docs/frameworks/MEMORY.md) · 🇩🇪 [de](../../../de/docs/frameworks/MEMORY.md) · 🇬🇷 [el](../../../el/docs/frameworks/MEMORY.md) · 🇪🇸 [es](../../../es/docs/frameworks/MEMORY.md) · 🇪🇪 [et](../../../et/docs/frameworks/MEMORY.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/MEMORY.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/MEMORY.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/MEMORY.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/MEMORY.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/MEMORY.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/MEMORY.md) · 🇮🇱 [he](../../../he/docs/frameworks/MEMORY.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/MEMORY.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/MEMORY.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/MEMORY.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/MEMORY.md) · 🇮🇩 [id](../../../id/docs/frameworks/MEMORY.md) · 🇮🇹 [it](../../../it/docs/frameworks/MEMORY.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/MEMORY.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/MEMORY.md) · 🇰🇭 [km](../../../km/docs/frameworks/MEMORY.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/MEMORY.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/MEMORY.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/MEMORY.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/MEMORY.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/MEMORY.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/MEMORY.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/MEMORY.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/MEMORY.md) · 🇲🇲 [my](../../../my/docs/frameworks/MEMORY.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/MEMORY.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/MEMORY.md) · 🇳🇴 [no](../../../no/docs/frameworks/MEMORY.md) · 🇮🇳 [or](../../../or/docs/frameworks/MEMORY.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/MEMORY.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/MEMORY.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/MEMORY.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/MEMORY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/MEMORY.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/MEMORY.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/MEMORY.md) · 🇱🇰 [si](../../../si/docs/frameworks/MEMORY.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/MEMORY.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/MEMORY.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/MEMORY.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/MEMORY.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/MEMORY.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/MEMORY.md) · 🇮🇳 [te](../../../te/docs/frameworks/MEMORY.md) · 🇹🇭 [th](../../../th/docs/frameworks/MEMORY.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/MEMORY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/MEMORY.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/MEMORY.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/MEMORY.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/MEMORY.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/MEMORY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/MEMORY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/MEMORY.md)

---

> **Isi mmalite eziokwu:** `src/lib/memory/` na `src/app/api/memory/`
> **Emelitere ikpeazụ:** 2026-06-28 — v3.8.40 (agbanyụrụ-na-ndabara + mmejuputa quantization int8)

OmniRoute na-enye ebe nchekwa mkparịta ụka na-adịgide adịgide nke a na-eji API key
amata (yana session id ma ọ bụrụ na achọrọ). A na-ewepụta ncheta na-akpaghị aka site
na nzaghachi LLM site n'iji regex dị mfe achọ ụkpụrụ, wee tinye ha ọzọ n'arịrịọ
ndị na-esote dịka ozi system dị n'isi (ma ọ bụ ozi user mbụ maka ndị na-eweta ọrụ
na-ajụ role system).

> **Agbanyụrụ ebe nchekwa na ndabara (v3.8.30+).** `DEFAULT_MEMORY_SETTINGS.enabled`
> bụzi `false` (`src/lib/memory/settings.ts`). Ịgbanye ebe nchekwa na-etinye ihe ruru
> `maxTokens` (~2k) nke context eweghachitere n'ime arịrịọ chat **ọ bụla**, nke a
> na-akwụ ụgwọ ya — ụgwọ a na-atụghị anya ya maka nrụnye ọhụrụ na maka ndị ahịa
> na-ejikwa context nke ha. Họrọ ịbanye n'ụzọ doro anya n'okpuru **Settings → Memory**
> (`MemorySkillsTab` na-egosi ọkwa ịdọ aka ná ntị banyere ụgwọ token mgbe agbanyere
> ebe nchekwa). Onye ahịa nwere ike wepụ otu arịrịọ site na iji header arịrịọ
> `x-omniroute-no-memory` (`true`/`1`/`yes`) — lee tebụl header arịrịọ dị na
> [API_REFERENCE.md](../reference/API_REFERENCE.md). Arịrịọ na-enweghị ebe nchekwa
> na-edobe `memoryOwnerId = null`, nke na-agbanyụ ntinye **ma** ebe nchekwa **ma**
> skill maka arịrịọ ahụ (`open-sse/handlers/chatCore/headers.ts::isNoMemoryRequested`).

A na-ekewa ebe nchekwa **n'otu API key**, ọ bụghị n'otu onye ọrụ — arịrịọ ọ bụla
ejiri otu API key mee nkwenye njirimara na-ekekọrịta otu nchịkọta ebe nchekwa,
ma enwere ike iji `sessionId` kewaa ya karịa ma ọ bụrụ na achọrọ.

## Nhazi usoro

```
Client → /v1/chat/completions (a chọpụtala apiKeyInfo tupu nke a)
  → handleChatCore() [open-sse/handlers/chatCore.ts]
    → resolveMemoryOwnerId(apiKeyInfo)        # na-ewepụta id
    → getMemorySettings()                     # ntọala echekwara na cache
    → shouldInjectMemory(body, {enabled})     # ọnụ ụzọ njikwa
    → retrieveMemories(apiKeyId, config)      # SQL + FTS5 + vector ma ọ bụrụ na achọrọ
    → injectMemory(body, memories, provider)  # ozi system ma ọ bụ user
  → oku nye onye na-eweta ọrụ dị n'elu
  → mgbe nzaghachi bịara: extractFacts(text, apiKeyId, sessionId)  # anaghị egbochi usoro
    → setImmediate → createMemory(fact) maka ihe ọ bụla dabara
                   → embed(content) + upsertVector(id, vec)
```

A jikọtara ebe a na-akpọ ọrụ ntinye na iwepụta na
`open-sse/handlers/chatCore.ts` (chọọ `retrieveMemories`, `injectMemory`,
na `extractFacts`).

## Nhazi injin (mkpebi ọkwa atọ)

Memory Engine na-ekpebi ụzọ iweghachite n'oge arụmọrụ dabere na akụrụngwa
na ntọala dị. E nwere ọkwa atọ, a na-etinye ha n'usoro mkpa:

```
  ┌─────────────────────────────────────────────────────────────┐
  │  ỌKWA 0 — Okwu nchọta (FTS5)                                │
  │  Nnweta nke nyocha na-achịkwa: FTS5 mgbe build SQLite       │
  │  na-akwado ya (better-sqlite3 / node:sqlite / bun:sqlite);  │
  │  adịghị na build ndị na-enweghị FTS5 (dịka sql.js/WASM —    │
  │  "no such module: fts5"). A na-eji ya mgbe strategy =       │
  │  "exact" ma ọ bụ dịka ụzọ ndabere; keyword dị na            │
  │  engine-status na-egosipụta nsonaazụ nyocha ahụ.             │
  └──────────────────────────────────┬──────────────────────────┘
                                     │ strategy = semantic|hybrid?
                                     ▼
  ┌─────────────────────────────────────────────────────────────┐
  │  ỌKWA 1 — Vector agbakwunyere (sqlite-vec)                  │
  │  sqlite-vec v0.1.9 nke ebunyere site na db.loadExtension(). │
  │  Nchọta KNN zuru ezu n'elu vector Float32. Ọ na-arụ ọrụ mgbe:│
  │   • sqlite-vec loadExtension gara nke ọma                    │
  │   • Isi iyi embedding dị (remote | static | transformers)   │
  │     nke nwere ike ịmepụta Float32Array                       │
  │   • tebụl vec_memories dị (a na-emepụta ya na ready() mbụ)  │
  └──────────────────────────────────┬──────────────────────────┘
                                     │ qdrant.enabled?
                                     ▼
  ┌─────────────────────────────────────────────────────────────┐
  │  ỌKWA 2 — Qdrant (vector database mpụga a na-ahọrọ ịgbanye) │
  │  Mgbe agbanyere ya, ọ na-anọchi sqlite-vec maka             │
  │  semantic/hybrid.                                           │
  │  Ọ chọrọ instance Qdrant na-arụ ọrụ + host/port ahaziri.     │
  └─────────────────────────────────────────────────────────────┘
```

Mbelata ikike na-eme na-akpaghị aka ma na-enweghị nsogbu pụtara ìhè:

- Ọ bụrụ na sqlite-vec enweghị ike ibunye, ọkwa 1 agaghị adị → ọ ga-alaghachi
  n'ọkwa 0.
- Ọ bụrụ na isi iyi embedding weghachite njehie, ọkwa 1 ga-alaghachi n'ọkwa 0.
- Ọ bụrụ na Qdrant adịghị mma, ọkwa 2 ga-alaghachi n'ọkwa 1 (ma ọ bụ ọkwa 0 ma
  ọ bụrụ na ọkwa 1 adịghịkwa).

## Isi mmalite embedding

Oyi akwa embedding (`src/lib/memory/embedding/`) na-ekpebi isi mmalite a ga-eji
dabere na `MemorySettingsExtended.embeddingSource`:

| Isi mmalite    | Nkọwa                                                                                 | Igodo dị mkpa | Mbido oyi        |
| -------------- | ------------------------------------------------------------------------------------- | ------------- | ---------------- |
| `remote`       | Na-eji embedding API nke onye na-eweta ahaziri (OpenAI, Cohere, wdg.)                 | Ee            | Ọ dịghị          |
| `static`       | Embedding tebụl-nyocha mpaghara site na `potion-base-8M` (WordPiece + mean pooling)   | Mba           | ~200ms           |
| `transformers` | Ntụle ONNX mpaghara site na `@huggingface/transformers` v4, `all-MiniLM-L6-v2`        | Mba           | ~3s + ~400MB RAM |
| `auto`         | Mkpebi n'oge ọ na-arụ ọrụ: remote (ọ bụrụ na igodo dị) → static → transformers → null | Ọ dabere      | Ọ dabere         |

**Usoro mkpebi maka `auto`:**

1. Chọta onye na-eweta mbụ n'ime `listEmbeddingProviders()` nke nwere `hasKey === true` → `remote`.
2. Ọ bụrụ na `settings.staticEnabled === true` → `static`.
3. Ọ bụrụ na `settings.transformersEnabled === true` → `transformers`.
4. Ma ọ bụghị ya → `null` (ọ na-agbada gaa na ọchụchọ mkpụrụokwu FTS5).

Cache embedding (`src/lib/memory/embedding/cache.ts`) na-eji map LRU dị n'ime ebe nchekwa
nke `${source}:${model}:${dim}:${sha256(text)}` bụ igodo ya, ma a kpachiri ya na ntinye
`MEMORY_EMBEDDING_CACHE_MAX` (ndabara 1000), yana TTL nke
`MEMORY_EMBEDDING_CACHE_TTL_MS` (ndabara nkeji 5). Ndị niile na-akpọ ya na-ekerịta ya
n'ime okirikiri ndụ nke process ọ bụla.

## RRF ngwakọ (k=60)

Mgbe `strategy = "hybrid"` ma vector store dị, retrieval na-eji
Reciprocal Rank Fusion jikọta nsonaazụ FTS5 na vector:

```
RRF(d) = Σ  1 / (k + rank_i(d))      ebe k = 60 (enwere ike ịhazi ya site na MEMORY_RRF_K)
          i
```

N'ụzọ doro anya:

1. Mee ọchụchọ FTS5 → ndepụta ahaziri `R_fts` (ọnọdụ 1..N).
2. Mee ọchụchọ vector KNN → ndepụta ahaziri `R_vec` (ọnọdụ 1..M).
3. Maka `memoryId` pụrụ iche ọ bụla:  
   `rrf_score = 1/(60 + fts_rank)` + `1/(60 + vec_rank)` (0 ma ọ bụrụ na ọ nọghị na ndepụta ahụ).
4. Hazie site na `rrf_score` DESC, wee tinye ngagharị mmefu token.

A maara RRF nke ọma dị ka usoro na-arụpụta ezigbo nsonaazụ n'achọghị ime ka akara
nke usoro retrieval dị iche iche nwee otu nha. `k=60` ndabara sitere n'akwụkwọ mbụ
nke Cormack et al., ọ na-arụkwa ọrụ nke ọma maka corpora pere mpe (<10k memories).

## Backfill (lazy + reindex)

Mgbe model embedding gbanwere (nke a na-achọpụta site na `embedding_signature`), a na-ewughachi
vector store, a na-akakwa memories niile dị adị
`needs_reindex = 1` n'ime tebụl `memories`.

**Lazy backfill**: N'oge retrieval na-esote, memory ọ bụla na-enweghị ntinye vector
ka a na-eme embedding ma tinye ya n'ime `vec_memories` tupu ọchụchọ ahụ amalite. Nke a
na-ekesa ọnụ ahịa backfill n'etiti arịrịọ ndị dị adị n'egbochighị startup.

**Reindex doro anya**: Taabụ Engine dị na `/dashboard/memory` nwere bọtịnụ
"Reindex Ugbu a" nke na-akpọ `POST /api/memory/reindex`. Handler ahụ na-akpọ
`runReindexBatch()` sitere na `src/lib/memory/reindex.ts`, nke na-ahazi ihe ruru
ntinye `limit` na-echere n'arịrịọ ọ bụla. Enwere ike iji
`GET /api/memory/engine-status` (`vectorStore.needsReindex`) nyochaa ọganihu.

Tebụl `memory_vec_meta` (migration `083_memory_vec.sql`) na-echekwa:

- `active_dim` — dimension vector dị ugbu a (null = a kabeghị ya).
- `embedding_signature` — `${source}:${model}:${dim}` eji achọpụta mgbanwe.
- `last_reset_at` — timestamp nke reset zuru ezu ikpeazụ.
- `vec_loaded` — ọkọlọtọ 0/1 na-egosi ma sqlite-vec ebulitere nke ọma.

## Mgbatị ntọala

E nwere oghere embedding na vector itoolu dị na `MemorySettingsExtended` n'ime
`src/shared/schemas/memory.ts`, nke a na-echekwa site na `src/lib/db/settings.ts`:

| Oghere                   | Ụdị                                                | Ndabara  | Nkọwa                                                                  |
| ------------------------ | -------------------------------------------------- | -------- | ---------------------------------------------------------------------- |
| `embeddingSource`        | `"remote" \| "static" \| "transformers" \| "auto"` | `"auto"` | Isi iyi embedding a ga-eji                                             |
| `embeddingProviderModel` | `string \| null`                                   | `null`   | Onye na-eweta/model n'ụdị `provider/model`                             |
| `customBaseUrl`          | `string \| null`                                   | `null`   | URL ntọala endpoint dakọtara na OpenAI maka Memory naanị               |
| `customModelId`          | `string \| null`                                   | `null`   | ID model a na-eziga na endpoint ahaziri iche                           |
| `transformersEnabled`    | `boolean`                                          | `false`  | Nhọrọ iji Transformers.js (MiniLM, ~400MB)                             |
| `staticEnabled`          | `boolean`                                          | `false`  | Nhọrọ iji model mpaghara static potion-base-8M                         |
| `rerankEnabled`          | `boolean`                                          | `false`  | Mee ka usoro nhazigharị ọkwa rụọ ọrụ (na-agbakwunye +200-500ms/arịrịọ) |
| `rerankProviderModel`    | `string \| null`                                   | `null`   | Onye na-eweta/model nhazigharị ọkwa n'ụdị `provider/model`             |

`rerankProviderModel` na-enweta mkpebi ya site na `POST /v1/rerank` (nke a na-akpọ site na loopback), ya mere ọ na-anabata ihe ọ bụla route ahụ na-anabata: model nhazigharị ọkwa cloud ahọpụtara (`cohere/rerank-v3.5`, `jina-ai/jina-reranker-v3.5`, …) ma ọ bụ node onye na-eweta dakọtara na OpenAI n'ụdị `<node-prefix>/<model>` (dịka `skilled-mini/bge-reranker-v2-m3` maka igbe TEI/Infinity). A na-ekwe ka node loopback rụọ ọrụ mgbe niile; node dị na host ọzọ (LAN, Tailscale) chọrọ ọkọlọtọ atụmatụ `RERANK_REMOTE_PROVIDER_NODES` ọzọ ma ga-agafekwa iwu URL ọpụpụ nke onye na-eweta — lee [Ọkọlọtọ Atụmatụ](../reference/FEATURE_FLAGS.md). Ihe nhọpụta dashboard na-egosi ndị na-eweta ahọpụtara yana node mpaghara; enwere ike ịtọ string `provider/model` ọ bụla ziri ezi ozugbo site na `PUT /api/settings/memory`.
| `vectorStore` | `"sqlite-vec" \| "qdrant" \| "auto"` | `"auto"` | Backend vector a ga-eji |

A na-eme ka ndị a dị site na `GET /PUT /api/settings/memory` (schema `MemorySettingsExtendedSchema`).

Maka isi iyi `remote`, Memory na-anabatakwa ntọala `customBaseUrl` na
`customModelId` ndị bụ nhọrọ. Ha abụọ na-ahọrọ endpoint `/embeddings`
na model dakọtara na OpenAI n'agbanweghị ndekọ embedding zuru ụwa ọnụ. A na-eme ka endpoint ahụ
dịrị n'ụdị ọkọlọtọ tupu eji ya, a na-enyochakwa ya site n'iwu URL ọpụpụ nke onye na-eweta: a chọrọ
HTTP(S), a na-ajụ credentials agbakwunyere na query strings, adreesị metadata
cloud ka na-adịkwa egbochiri. Uru efu na-echekwa onye na-eweta ndekọ ahọpụtara. A na-ehicha njehie
eweghachiri na dashboard ka ozi nzuzo ghara ịpụta, a naghịkwa edekọ credentials endpoint na log.

> **TODO (D20):** Scope `global` (ịkekọrịta memories n'etiti API keys niile) adịghị
> arụ ọrụ na release a. Ọ chọrọ mgbanwe schema na ụzọ retrieval zuru ụwa ọnụ.
> Soro ya dịka ọrụ dị iche.

## Ọkwa Nchekwa

### Nke bụ isi: SQLite (tebụl `memories`)

Migration `015_create_memories.sql` mepụtara ya:

| Kọlụm                       | Ụdị                | Ndetu                                                                       |
| --------------------------- | ------------------ | --------------------------------------------------------------------------- |
| `id`                        | `TEXT PRIMARY KEY` | UUID nke `crypto.randomUUID()` mepụtara                                     |
| `api_key_id`                | `TEXT NOT NULL`    | API key nwe ya                                                              |
| `session_id`                | `TEXT`             | Scope nhọrọ maka mkparịta ụka ọ bụla                                        |
| `type`                      | `TEXT NOT NULL`    | Otu n'ime `factual`, `episodic`, `procedural`, `semantic`                   |
| `key`                       | `TEXT`             | Key upsert kwụsiri ike, dịka `preference:i_prefer_python`                   |
| `content`                   | `TEXT NOT NULL`    | Ederede eziokwu n'onwe ya                                                   |
| `metadata`                  | `TEXT`             | Ngwugwu JSON (category, extractedAt, source, ...)                           |
| `created_at` / `updated_at` | `TEXT`             | Eriri ISO 8601                                                              |
| `expires_at`                | `TEXT`             | Oge mmebi nke bụ nhọrọ; `NULL` pụtara na ọ ga-adịgide                       |
| `memory_id`                 | `INTEGER UNIQUE`   | `023_fix_memory_fts_uuid.sql` gbakwunyere ya iji jikọta UUIDs ↔ FTS5 rowids |

Indexes: `api_key_id`, `session_id`, `type`, `expires_at`, tinyere index
`memory_id` pụrụ iche.

**Ụkpụrụ upsert**: `createMemory()` na-achọ row dị adị nke nwere otu
`(api_key_id, key)` ma na-emelite ya n'otu ebe mgbe achọtara ya (na-ejikọta
`metadata` site na shallow spread). Nke a na-egbochi tebụl ahụ ito n'enweghị
oke n'ihi nkwupụta mmasị a na-eme ugboro ugboro.

### Ọchụchọ Ederede Zuru Ezu (tebụl virtual `memory_fts`)

`022_add_memory_fts5.sql` na-emepụta tebụl virtual FTS5 n'elu `content` na
`key`. `023_fix_memory_fts_uuid.sql` na-edozi bug mere n'ezie ebe primary key
UUID anaghị ejikọta na rowid integer nke FTS5 — migration ahụ na-agbakwunye
kọlụm `memory_id`, na-emepụta tebụl FTS ọzọ, ma na-ahazi triggers
(`memory_fts_ai`, `memory_fts_ad`, `memory_fts_au`) ndị na-eme ka FTS nọgide
na-emekọrịta mgbe e mere INSERT, DELETE, na UPDATE.

`retrieval.ts` na-eji ya maka atụmatụ `semantic` na `hybrid` (lee n'okpuru).
Koodu nchọta ahụ na-eji `hasTable("memory_fts")` echebe onwe ya ma laghachi
n'usoro oge ma ọ bụrụ na tebụl FTS adịghị ma ọ bụ ajụjụ FTS weta njehie.

### Nhọrọ: Qdrant (ọkwa vector store nke 2)

`src/lib/memory/qdrant.ts` na-etinye njikọ Qdrant nke bụ nhọrọ dị ka ọkwa nke 2
nke vector store. Nchọta na-aga Qdrant naanị mgbe engine selector
`memoryVectorStore === "qdrant"` — ndabara `"auto"` (na `"sqlite-vec"`)
**anaghị** ahọrọ Qdrant ma ọlị. Toggle dị na taabụ Engine na-ahazi **ma**
`qdrantEnabled` **ma** `memoryVectorStore` ọnụ: ịgbanye ya na-eme Qdrant ka ọ
bụrụ store bụ isi, ebe ịgbanyụ ya na-eweghachi ya na `"auto"` (#5597 — tupu
ndozi ahụ, ịgbanye ya enweghị mmetụta n'ihi na ọ dịghị ihe na-ede engine
selector). Ọ bụrụ na enweghị ike iru Qdrant ma ọ bụ na ọ naghị eweghachi ihe
ọ bụla, nchọta na-alaghachi na sqlite-vec → FTS5.

- `upsertSemanticMemoryPoint()` — jiri ụdị embedding ahaziri tinye `key + content`
  n'ime vector, hụ na collection ahụ dị (ọ na-emepụta vector ndị na-eji cosine-distance
  n'oge ojiji mbụ), ma mee upsert nke point nwere payload `{memoryId,
apiKeyId, sessionId, key, content, metadata, createdAtUnix, expiresAtUnix}`.
- `searchSemanticMemory(query, topK, scope)` — tinye query ahụ n'ime vector, chọọ n'ime
  collection ahụ nke e ji `kind = "omniroute_memory"` yọchaa, ma ọ bụrụ na achọrọ,
  jiri `apiKeyId` / `sessionId` yọchakwuo ya. Ọ na-amachi `topK` na `[1, 20]`.
- `deleteSemanticMemoryPoint(id)` — ihichapụ otu point. `deleteMemory()` na-akpọ ya
  mgbe ewepụchara row SQLite (D15).
- `cleanupSemanticMemoryPoints({retentionDays})` — hichapụ ọtụtụ point ndị
  `expiresAtUnix` ha gafere ma ọ bụ ndị `createdAtUnix` ha kara karịa oge njedebe
  retention. Ọ na-ebu ụzọ gụọ ha ka dashboard wee nwee ike igosi ọnụọgụ ziri ezi.
- `checkQdrantHealth()` — nyocha ahụike `GET /readyz` tinyere latency.

UI ntọala ahụ na-egosi nhazi Qdrant, nyocha ahụike, ule ọchụchọ semantic,
na cleanup na **taabụ Engine** nke `/dashboard/memory`. Route ndị kwekọrọ
n'okpuru `src/app/api/settings/qdrant/` ejikọtala ha niile kemgbe v3.8.6:

| Route                                   | Method        | Nkọwa                        |
| --------------------------------------- | ------------- | ---------------------------- |
| `/api/settings/qdrant`                  | `GET` / `PUT` | Gụọ / melite ntọala Qdrant   |
| `/api/settings/qdrant/health`           | `GET`         | Nnyocha ịdị ndụ + latency    |
| `/api/settings/qdrant/search`           | `POST`        | Ule ọchụchọ semantic         |
| `/api/settings/qdrant/cleanup`          | `POST`        | Wepụ point kubie ume / ochie |
| `/api/settings/qdrant/embedding-models` | `GET`         | Depụta ụdị embedding dị      |

**Nkọwa gbasara omume (ihe ị ga-atụ anya ya):**

- **Nhọrọ engine** — ime ka Qdrant rụọ ọrụ na taabụ Engine na-eme ya store bụ isi
  (na-edobe `memoryVectorStore="qdrant"`); ịkwụsị ya na-eweghachi ya na `"auto"` (#5597).
- **Enweghị back-fill** — naanị memory ndị e mepụtara/melite **mgbe** e mere ka Qdrant
  rụọ ọrụ ka a na-ede n'ime ya (dual-write ụdị fire-and-forget). **Anaghị**
  ebugharị memory SQLite ndị dịbu adị; "Reindex Now" na-ewughachi naanị index
  sqlite-vec, ọ bụghị Qdrant.
- **A na-achọpụta vector dimension na akpaghị aka** site na embedding n'ezie n'oge
  ojiji mbụ — enweghị field dimension ị ga-edeju. A **naghị** edozi mgbanwe ụdị
  embedding na akpaghị aka mgbe collection dịlarị: a na-ahapụ collection dị adị
  ka ọ dị, write/search ndị dimension ha ekwekọghị na-ada, wee laghachi na sqlite-vec.
  Megharịa collection ahụ (aha ọhụrụ, ma ọ bụ hichapụ ya na Qdrant) iji gbanwee embedder.
- **Metrik distance** — ọ bụ **Cosine** mgbe niile (e debere ya kpọmkwem n'ime code
  mgbe a na-emepụta collection; enweghị ike ịhazi ya).
- **Auth** — naanị API key (a na-eziga ya dịka header `api-key`; ọ bụghị iwu maka
  Docker local na-enweghị authentication). Anaghị eji JWT/RBAC.
- **Field nhazi** — UI na-egosi `host`, `port`, `collection`, `embeddingModel`,
  `apiKey`. `vectorSize` / `hnswEfConstruct` bụ naanị nke env/DB, a naghịkwa eji
  `vectorSize` emepụta collection (dimension na-esite na embedding).

### Vector quantization (int8 — nhọrọ, backend abụọ ahụ)

Backend vector abụọ ahụ na-akwado **int8 quantization a na-ahọrọ ime** iji belata
memory footprint nke vector echekwara (~4× pere mpe karịa Float32), na obere mfu
recall. Na ndabara, ọ **gbanyụrụ** na ha abụọ — vector na-anọgide na full-precision
ọ gwụla ma e mere ka ọ rụọ ọrụ n'ụzọ doro anya.

| Backend    | Ntọala                          | Ụdị                            | Ndabara  | Ebe a na-agụ ya                                             |
| ---------- | ------------------------------- | ------------------------------ | -------- | ----------------------------------------------------------- |
| Qdrant     | `qdrantQuantization` (DB key)   | `"none" \| "int8" \| "binary"` | `"none"` | `src/lib/memory/qdrant.ts::normalizeQdrantConfig()`         |
| sqlite-vec | `MEMORY_VEC_QUANTIZATION` (env) | `"none" \| "int8"`             | `"none"` | `src/lib/memory/vectorStore.ts::requestedVecQuantization()` |

- **Qdrant** na-enweta nhazi maka instance ọ bụla site na key ntọala
  `qdrantQuantization` (nke e gosipụtara dịka field `quantization` na
  `PUT /api/settings/qdrant`). Mgbe ọ bụ `"int8"`, `buildQuantizationConfig()`
  na-arịọ scalar quantization (`always_ram`, quantile `0.99`), ọchụchọ na-emekwa
  ka `rescore: true` rụọ ọrụ ka vector full-precision wee mee ka candidate set
  int8 zie ezi karịa.
- Quantization **sqlite-vec** bụ **naanị site na environment** (ọ bụghị ntọala DB):
  debe `MEMORY_VEC_QUANTIZATION=int8` iji chekwaa vector local dịka column
  `int8[dim]` site na `vec_quantize_int8(?, 'unit')`. A na-etinye mode ahọpụtara
  n'ime `embedding_signature` (suffix `:int8`), ya mere ịgbanwe mode na-akpalite
  reindex zuru ezu nke table `vec_memories` — otu lazy-backfill path ahụ a na-eji
  mgbe ụdị embedding gbanwere.

## Ụdị Ebe Nchekwa

`MemoryType` (`src/lib/memory/types.ts`):

| Ụdị          | Ihe eji ya eme                                                                                      |
| ------------ | --------------------------------------------------------------------------------------------------- |
| `factual`    | Mmasị, eziokwu ndị na-adịgide adịgide gbasara onye ọrụ, usoro omume                                 |
| `episodic`   | Mkpebi ndị metụtara otu oge kpọmkwem ("Ahọrọ m Postgres")                                           |
| `procedural` | Ebe nchekwa usoro ọrụ / otu esi eme ihe (edobere ya; enweghị onye na-ewepụta ya na-akpaghị aka taa) |
| `semantic`   | Edobere maka ndenye vector-store                                                                    |

Atụmatụ iweghachite nke `MemoryConfig` bụ otu n'ime `exact`, `semantic`, ma ọ bụ `hybrid`,
ebe oke ya bụ otu n'ime `session`, `apiKey`, ma ọ bụ `global`. Oke ndabara sitere na
`getMemorySettings()` bụ `apiKey`.

## Iwepụta Eziokwu (`extraction.ts`)

Iwepụta ihe a dabere na **regex**, ọ bụghị na LLM — ọ na-arụ n'ime usoro ahụ site na
`setImmediate()` ka ọ ghara igbochi iyi nzaghachi:

- **Ụkpụrụ mmasị** → `MemoryType.FACTUAL`
  (dịka `M na-ahọrọ …`, `Ihe a na-amasị m nke ukwuu bụ …`, `ọkacha mmasị m bụ …`, `Akpọrọ m … asị`)
- **Ụkpụrụ mkpebi** → `MemoryType.EPISODIC`
  (dịka `M ga-eji …`, `Ahọrọ m …`, `M họọrọ …`, `M ga-amalite iji …`)
- **Ụkpụrụ omume** → `MemoryType.FACTUAL`
  (dịka `M na-emekarị …`, `M na-eme … mgbe niile`, `M na-enwekarị ike …`)

A na-ehicha ndakọrịta ọ bụla (`trim`, ijikọ oghere ndị na-eso ibe ha, na ịkwụsị ya na mkpụrụedemede 500),
na-ewepụkwa oyiri n'ime otu ìgwè ahụ site na `factKey(category, content)` kwụsiri ike, wee
chekwaa ya site na `createMemory()` ya na metadata
`{category, extractedAt, source: "llm_response"}`. A na-akwụsị ederede ntinye na
64 KiB (`MAX_EXTRACTION_TEXT_LENGTH`) — mgbe ọ karịrị nke ahụ, a na-eji **ọdụ** ederede ahụ
ka ọdịnaya onye enyemaka kacha ọhụrụ nwee ike isonye mgbe niile.

A na-ebupụ `extractFactsFromText(text)` maka ule, ọ na-eweghachikwa eziokwu ndị ahaziri
n'enweghị ichekwa ha.

## Iweghachite (`retrieval.ts`)

`retrieveMemories(apiKeyId, config)` bụ isi ebe mbata. Ọ na-eme ihe ndị a:

1. Ọ na-eme ka config bụrụ nke kwekọrọ n'ụkpụrụ ma nyochaa ya site na `MemoryConfigSchema`.
2. Ọ na-eweghachi `[]` ozugbo mgbe `enabled` bụ false ma ọ bụ `maxTokens <= 0`.
3. Ọ na-amachibido `maxTokens` n'ime `[1, 8000]`.
4. Ọ na-achọpụta ma tebụl `memories` nke ọgbara ọhụrụ ọ dị (ma e jiri ya tụnyere tebụl `memory`
   ochie) ka ọdụ data ochie nwee ike ịga n'ihu na-arụ ọrụ.
5. Ọ na-ewulite ajụjụ ntọala ya na nchedo ngafe oge
   (`expires_at IS NULL OR datetime(expires_at) > datetime('now')`), oke session ma ọ bụrụ na achọrọ ya,
   na njedebe `retentionDays` ma ọ bụrụ na achọrọ ya.
6. Ọ na-ekewa usoro dabere na atụmatụ:
   - **`exact`** (ndabara): usoro oge `ORDER BY created_at DESC LIMIT 100`.
   - **`semantic`**: ọ bụrụ na `config.query` na `memory_fts` dị, ọ na-eme JOIN
     `memory_fts MATCH ?` ma hazie dịka ọkwa FTS; ọ na-alaghachi na usoro oge
     mgbe FTS weghachitere ahịrị 0.
   - **`hybrid`**: njikọ nke nsonaazụ FTS (mkpa dị elu) na nchịkọta
     usoro oge, ebe a na-ewepụ oyiri site na id.
7. Ọ na-agbakọ akara mkpa nke mkpụrụokwu (`getRelevanceScore`) n'elu
   `content`, `key`, na JSON `metadata` mgbe e nyere ajụjụ. A na-ewepụ ahịrị ndị nwere
   akara efu.
8. Ọ na-ahazi site na akara n'usoro mgbadata, emesịa `createdAt` n'usoro mgbadata.
9. Ọ na-agafe ndepụta ahaziri n'ọkwa ma nabata ndenye ka mkpokọta
   `estimateTokens(content)` (≈ `length / 4`) na-aga n'ihu ịnọ n'okpuru oke ahụ. Ọ na-eweghachi
   opekata mpe otu ndenye mgbe ọ bụla enwere ndakọrịta.

A na-ebupụ `estimateTokens`, iweghachite, nchịkọta, na ngwa MCP
`omniroute_memory_search` na-ejikwa ya.

## Ntinye (`injection.ts`)

`injectMemory(request, memories, provider)`:

1. Na-ejikọta ọdịnaya ebe nchekwa niile n'ime otu eriri `Memory context: …`.
2. Na-ahọrọ usoro dabere n'aha provider:
   - **Ozi sistemụ** (ndabara maka OpenAI, Anthropic, Gemini, …) — na-etinye
     `{role: "system", content: memoryText}` n'ihu ozi sistemụ ọ bụla dịbu adị
     ka ntụziaka sistemụ onye ọrụ ka nwee ike ibute ụzọ.
   - **Ozi onye ọrụ** (usoro ndabere) — maka providers ndị dị na
     `PROVIDERS_WITHOUT_SYSTEM_MESSAGE`: `o1`, `o1-mini`, `o1-preview`,
     `glm`, `glmt`, `glm-cn`, `zai`, `qianfan`. Ndị a anaghị anabata ọrụ sistemụ
     ma ga-eweghachi 400 ma e wezụga nke ahụ (lee nsogbu #1701 maka GLM/Zhipu).
3. Na-edekọ ọnụọgụ, usoro, na model n'okpuru `memory.injection.injected`.

A na-ebupụ `providerSupportsSystemMessage(provider)` maka ndị na-akpọ ya chọrọ
ime mkpebi routing nke ha. Providers ndị a na-amaghị na-eji `true`
(a na-anabata ọrụ sistemụ) dịka ndabara maka nchekwa.

## Ntọala (`settings.ts`)

A na-**echekwa nhazi ebe nchekwa na tebụl ntọala DB**, ọ bụghị na env vars.
`getMemorySettings()` na-agụ site na `getSettings()` ma na-echekwa nsonaazụ ya
na cache n'ime process; route PUT nke ntọala na-akpọ `invalidateMemorySettingsCache()`
mgbe emechara ide ihe.

### Fields ochie (ụdị niile)

| DB key                | Ụdị     | Ndabara                                               | Njikwa UI                                             |
| --------------------- | ------- | ----------------------------------------------------- | ----------------------------------------------------- |
| `memoryEnabled`       | boolean | `false` (agbanyụrụ na ndabara kemgbe v3.8.30)         | Ịgbanye/ịgbanyụ ebe nchekwa                           |
| `memoryMaxTokens`     | integer | `2000` (oke `0–16000`)                                | Oke token maka ntinye                                 |
| `memoryRetentionDays` | integer | `30` (oke `1–365`)                                    | Oge njigide                                           |
| `memoryStrategy`      | enum    | `"hybrid"` (otu n'ime `recent`, `semantic`, `hybrid`) | Usoro iweghachite                                     |
| `skillsEnabled`       | boolean | `false`                                               | Na-agbanye/agbanyụ ntinye nka kwa key (lee SKILLS.md) |

Rịba ama: usoro UI `"recent"` na-adakọ na usoro iweghachite ime `"exact"`
site na `toMemoryRetrievalConfig()` (usoro dịka oge si aga).

### Fields ọhụrụ (v3.8.6, atụmatụ 21 D9)

Leekwa ngalaba "Mgbasawanye ntọala" dị n'elu maka nkọwa fields.

| DB key                      | API field                | Ndabara  |
| --------------------------- | ------------------------ | -------- |
| `memoryEmbeddingSource`     | `embeddingSource`        | `"auto"` |
| `memoryEmbeddingModel`      | `embeddingProviderModel` | `null`   |
| `memoryTransformersEnabled` | `transformersEnabled`    | `false`  |
| `memoryStaticEnabled`       | `staticEnabled`          | `false`  |
| `memoryRerankEnabled`       | `rerankEnabled`          | `false`  |
| `memoryRerankModel`         | `rerankProviderModel`    | `null`   |
| `memoryVectorStore`         | `vectorStore`            | `"auto"` |

`normalizeQdrantConfig()` dị na `qdrant.ts` na-agụ DB keys metụtara Qdrant
(`qdrantEnabled`, `qdrantHost`, `qdrantPort`, `qdrantApiKey`,
`qdrantCollection` nke ndabara ya bụ `"omniroute_memory"`,
`qdrantEmbeddingModel` nke ndabara ya bụ `"openai/text-embedding-3-small"`).

### Environment variables (v3.8.6)

Env vars isii nhọrọ na-ahazi omume engine n'oge ọ na-arụ ọrụ (e depụtara ha na `.env.example`):

| Variable                        | Ndabara                    | Nkọwa                                                                                                                                                    |
| ------------------------------- | -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `MEMORY_EMBEDDING_CACHE_TTL_MS` | `300000`                   | TTL cache embedding (nkeji 5)                                                                                                                            |
| `MEMORY_EMBEDDING_CACHE_MAX`    | `1000`                     | Ọnụọgụ entries kachasị na cache LRU embedding                                                                                                            |
| `MEMORY_TRANSFORMERS_MODEL`     | `Xenova/all-MiniLM-L6-v2`  | Repo HF maka model Transformers.js                                                                                                                       |
| `MEMORY_STATIC_MODEL`           | `minishlab/potion-base-8M` | Repo HF maka model potion static                                                                                                                         |
| `MEMORY_STATIC_CACHE_DIR`       | `<DATA_DIR>/embeddings`    | Ebe a ga-echekwa models ebudatara                                                                                                                        |
| `MEMORY_VEC_TOP_K`              | `20`                       | Top-K ndabara maka ọchụchọ vector                                                                                                                        |
| `MEMORY_RRF_K`                  | `60`                       | Constant RRF k maka ọchụchọ hybrid                                                                                                                       |
| `MEMORY_VEC_QUANTIZATION`       | `none`                     | Tọọ ya ka ọ bụrụ `int8` iji chekwaa vectors sqlite-vec mpaghara n'ụdị quantized (~4× pere mpe; a ga-ahọrọ ya n'onwe ya). Mgbanwe mode na-amanye reindex. |

## Nchịkọta (`summarization.ts`)

`summarizeMemories(apiKeyId, sessionId?, maxTokens = 4000)` na-eme ka ọdịnaya ochie dị mkpụmkpụ mgbe mkpokọta token ndị na-aga n'ihu n'ime ebe nchekwa nke otu key gafere oke e nyere. Ọ na-agagharị n'ahịrị ndị ahụ n'usoro DESC site na `created_at`, na-edobe ahịrị ndị dabara, ma maka ndị fọdụrụ, ọ na-eji ahịrịokwu atọ mbụ nke ọdịnaya mbụ dochie `content` n'otu ebe ahụ. `tokensSaved` bụ ọdịiche dị na `estimateTokens` n'etiti ọdịnaya ochie na nke ọhụrụ.

Usoro a **dị mana anaghị akpọ ya na-akpaghị aka** n'ime pipeline nkata dị ugbu a — kpọọ ya site na cron, omume admin, ma ọ bụ njikọ `MemoryConfig.autoSummarize` ma ọ bụrụ na ịchọrọ mkpirisi na-aga n'ihu. Mfu data a bụ otu ụzọ: a na-edegharị ederede mbụ kpamkpam.

## REST API

Endpoint niile chọrọ njirimara njikwa (`requireManagementAuth`).

### Endpoint ebe nchekwa ndị bụ isi (ndị dịbu + ndị emelitere)

| Usoro    | Ụzọ                  | Nkọwa                                                                                                                                                                                        |
| -------- | -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `GET`    | `/api/memory`        | Ndepụta e kewara n'ibe nwere nzacha: `apiKeyId`, `type`, `sessionId`, `q`, `limit`, `page`, `offset`. Nzaghachi gụnyere `stats.total`, `stats.tokensUsed`, `stats.hitRate`, `cacheStats`     |
| `POST`   | `/api/memory`        | Mepụta ntinye (Zod kwadoro: `content`, `key`, yana `type`, `sessionId`, `apiKeyId`, `metadata`, `expiresAt` ndị bụ nhọrọ). Ọ na-akpọ `createMemory()` nke na-eme upsert na `(apiKeyId, key)` |
| `GET`    | `/api/memory/[id]`   | Weta otu ntinye site na UUID                                                                                                                                                                 |
| `PUT`    | `/api/memory/[id]`   | Melite field nke ntinye (`type`, `key`, `content`, `metadata`). Body: `MemoryUpdatePutSchema`. Ọ na-emekọkwa vector ma ọ bụrụ na isi mmalite embedding dị.                                   |
| `DELETE` | `/api/memory/[id]`   | Hichapụ ntinye; ọ na-ehichapụkwa ya na `vec_memories` (D15) na Qdrant dịka ike ya siri dị. Ọ na-eweghachi 404 mgbe ntinye ahụ adịghị.                                                        |
| `GET`    | `/api/memory/health` | Na-agba `verifyExtractionPipeline("health-check")` — usoro create→list→delete zuru ezu. Ọ na-eweghachi `{working, latencyMs, error?}`                                                        |

### Endpoint injin ebe nchekwa ọhụrụ (atụmatụ 21)

| Usoro  | Ụzọ                               | Nkọwa                                                                                                                                                                                                   |
| ------ | --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `POST` | `/api/memory/retrieve-preview`    | Nnwale na-enweghị mgbanwe nke `retrieveMemories` — ọ na-eweghachi nsonaazụ ahaziri dịka ogo ha, tinyere score, tier, tokens. Body: `RetrievePreviewSchema`. Ọ DỊGHỊ etinye ma ọ bụ gbanwee ebe nchekwa. |
| `GET`  | `/api/memory/embedding-providers` | Na-edepụta provider nwere model embedding, ma na-egosi ndị nwere API key ahaziri.                                                                                                                       |
| `GET`  | `/api/memory/engine-status`       | Na-eweghachi ọnọdụ injin zuru ezu: keyword tier, mkpebi embedding, ọnụ ọgụgụ vector store, ahụike Qdrant, nhazi rerank. Ọdịdị: `MemoryEngineStatusSchema`.                                              |
| `POST` | `/api/memory/summarize`           | Jiri aka kpalite mkpirisi ebe nchekwa. Body: `MemorySummarizeSchema` (`olderThanDays`, `apiKeyId?`, `dryRun`). Ọ na-eweghachi `{candidates, tokensSaved}`.                                              |
| `POST` | `/api/memory/reindex`             | Kpalite vector reindex maka ebe nchekwa nwere `needs_reindex=1`. Body: `MemoryReindexSchema` (`force`). Ọ na-eweghachi `{started, pending}`.                                                            |

### Endpoint ntọala

| Usoro  | Ụzọ                                     | Nkọwa                                                                                        |
| ------ | --------------------------------------- | -------------------------------------------------------------------------------------------- |
| `GET`  | `/api/settings/memory`                  | `MemorySettingsExtended` dị ugbu a nke ahazikọtara (field ọhụrụ 7 + nke ochie)               |
| `PUT`  | `/api/settings/memory`                  | Melite field ọ bụla sitere na `MemorySettingsExtendedSchema` (field 12 n'ozuzu)              |
| `GET`  | `/api/settings/qdrant`                  | Ntọala Qdrant dị ugbu a (`QdrantSettingsSchema`)                                             |
| `PUT`  | `/api/settings/qdrant`                  | Melite ntọala Qdrant. Body: `QdrantSettingsUpdateSchema`. `apiKey` = eriri efu na-ewepụ key. |
| `GET`  | `/api/settings/qdrant/health`           | Nnyocha ịdị ndụ megide instance Qdrant ahaziri. Ọ na-eweghachi `QdrantHealthResultSchema`.   |
| `POST` | `/api/settings/qdrant/search`           | Nnwale ọchụchọ semantic megide Qdrant. Body: `QdrantSearchSchema` (`query`, `topK`).         |
| `POST` | `/api/settings/qdrant/cleanup`          | Wepụ point Qdrant maka ebe nchekwa kubie ume / ochie.                                        |
| `GET`  | `/api/settings/qdrant/embedding-models` | Depụta model embedding dị maka Qdrant.                                                       |

Ajụjụ ndepụta `/api/memory` na-akwado ma pagination dabere na `page`
(`parsePaginationParams`) **ma ọ bụ** `offset` kpọmkwem — mgbe `offset` dị, ọ
na-ebute ụzọ, a na-agbakọkwa `page` sitere na ya maka ọdịdị nzaghachi ahụ.

## Ngwaọrụ MCP (`open-sse/mcp-server/tools/memoryTools.ts`)

Mgbe agbanyere sava MCP, a na-edebanye ngwaọrụ ebe nchekwa atọ:

- `omniroute_memory_search` — `{apiKeyId, query?, type?, maxTokens?, limit?}`
  → na-ekpuchi `retrieveMemories()`. Site na v3.8.6 (D16), a na-agụ `strategy`
  site na `getMemorySettings()` kama ịkpọchie ya ka ọ bụrụ `"exact"`. Ọ bụrụ na
  e nyere `query` ma `strategy` bụrụ `semantic` ma ọ bụ `hybrid`, a na-eji ebe
  nchekwa vector mgbe ọ dị.
- `omniroute_memory_add` — `{apiKeyId, sessionId?, type, key, content,
metadata?}` → na-ekpuchi `createMemory()`. Ọ na-anabata naanị ụdị 4 ndị bụ isi:
  `factual`, `episodic`, `procedural`, `semantic` (D17).
- `omniroute_memory_clear` — `{apiKeyId, type?, olderThan?}` → na-edepụta
  ndenye ndị dabara, na-enyocha ha ma ọ bụrụ na achọrọ site na timestamp nke tupu e kee ha, wee hichapụ nke ọ bụla
  site na `deleteMemory()` (nke na-ewepụkwa vectors na sqlite-vec + Qdrant).

Lee [MCP-SERVER.md](./MCP-SERVER.md) maka nkọwa gbasara mbufe na oke ọrụ.

## Dashboard (Memory Studio)

`src/app/(dashboard)/dashboard/memory/page.tsx` bụzi **Studio nwere taabụ 3**:

### Taabụ: Ebe Nchekwa

- Kaadị echiche (nkọwa "Otu o si arụ ọrụ" nke enwere ike ịgbasa ma ọ bụ kpokọta).
- Ndepụta ozugbo, ọchụchọ, na nkewa peeji (nkwụsị oge 300 ms).
- Nzacha ụdị (`factual` / `episodic` / `procedural` / `semantic` / niile).
- Modal ịgbakwunye ebe nchekwa (key, content, type).
- Ndezi n'ime ahịrị (bọtịnụ pensụl → `PUT /api/memory/[id]`).
- Hichapụ n'ahịrị ọ bụla (ya na dialog nkwenye).
- Mbupụ JSON nke peeji dị ugbu a; mbubata JSON site na ihe-ahọrọ faịlụ.
- Kaadị ọnụ ọgụgụ: `totalEntries`, `tokensUsed`, `hitRate`.
- Bọtịnụ "Kpokọta ndị ochie" → `POST /api/memory/summarize` (dry-run na-ebu ụzọ gosi
  ọnụọgụ ndị a họpụtara, emesịa kwado ya).
- Ntụpọ ahụike akwụkwọ ndụ/ọbara ọbara nke `GET /api/memory/health` na-achịkwa.

### Taabụ: Ebe Nnwale

- Ebe ntinye ajụjụ + ihe-ahọrọ atụmatụ (Exact / Semantic / Hybrid) + oke token.
- "Mee nnwale" → `POST /api/memory/retrieve-preview` — na-egosi nsonaazụ ndị a haziri n'usoro site na
  `score`, `tier`, `tokens`, `vecScore`, `ftsScore`.
- Panel mkpebi nke na-egosi isi iyi embedding / ebe nchekwa vector e jiri mee ihe na
  ma ọdịda laghachiri na nhọrọ ndabere.

### Taabụ: Engine

- Panel ọnọdụ engine (chip keyword FTS5, chip embedding, chip ebe nchekwa vector,
  chip ahụike Qdrant, chip rerank).
- Bọtịnụ "Tinye Index Ugbu a" → `POST /api/memory/reindex`.
- Ihe-ahọrọ isi iyi embedding (auto / remote / static / transformers + toggles).
- Kaadị nhazi Qdrant (toggle ịgbanye, host/port/collection/key, nwalee njikọ,
  nwalee ọchụchọ semantic, nhicha).
- Kaadị nhazi rerank (toggle ịgbanye, ihe-ahọrọ provider/model).

Ntọala Memory na Qdrant dịkwa n'okpuru
`/dashboard/settings → Memory & Skills` (`MemorySkillsTab.tsx`) maka
ihu ntọala legacy/zuru ụwa ọnụ.

## Nchekwa Cache

`src/lib/memory/store.ts` na-edobe cache yiri LRU nke na-arụ ọrụ n'ime usoro
(`MEMORY_CACHE_TTL = 1 min`, `MEMORY_MAX_CACHE_SIZE = 500`, na mwepụ 20 %
nke ndị kacha ochie) maka ọgụgụ `getMemory(id)`, yana layer `memoryCache`
key/value izugbe (`src/lib/memory/cache.ts`) nwere usoro `get`/`set`/`invalidate`
nke ndị na-akpọ ya nwere ike iji maka cache nke oke ọrụ nke ha (LRU nwere ndenye 1 000,
TTL ndabara 5 min).

## Nzuzo & Usoro Ndụ

- Onye nwe ebe nchekwa bụ njirimara API key (`resolveMemoryOwnerId` na
  `chatCore.ts`). Na-enweghị `apiKeyInfo.id`, iweghachite, itinye,
  ma ọ bụ iwepụta anaghị arụ ọrụ.
- A na-ewepụ n'iweghachite ndenye nwere `expires_at` nke dị n'ọdịnihu; a na-ewepụkwa
  ndenye ochie gafere `retentionDays` site na nkebi
  `created_at >= cutoff` dị na `retrieveMemories`.
- Maka ihichapụ kpamkpam, jiri `DELETE /api/memory/[id]` ma ọ bụ `omniroute_memory_clear`.
- Iwepụta na-arụ ọrụ n'azụ ozugbo site na `setImmediate`; a na-edekọ ọdịda n'okpuru
  `memory.extraction.background.failed`, ọ dịghịkwa mgbe a na-ezitere onye kpọrọ ya ozi banyere ya.
- Nnwale nkwenye ndị na-aga ma na-alọghachi (`verifyExtractionPipeline`) na-ehichapụ
  ndenye nnwale nke ha n'ime ngọngọ `finally`.

## Hụkwa

- [SKILLS.md](./SKILLS.md) — ntọala `skillsEnabled` na-etinye nkọwa ngwaọrụ
  tinyere ebe nchekwa.
- [MCP-SERVER.md](./MCP-SERVER.md) — nnyefe / oke ikike MCP.
- [API_REFERENCE.md](../reference/API_REFERENCE.md) — akụkụ API sara mbara.
- Modul isi mmalite:
  - `src/lib/memory/types.ts`, `schemas.ts`
  - `src/lib/memory/store.ts`, `retrieval.ts`, `injection.ts`, `reindex.ts`
  - `src/lib/memory/extraction.ts`, `summarization.ts`, `verify.ts`
  - `src/lib/memory/settings.ts`, `qdrant.ts`, `cache.ts`
  - `src/lib/memory/vectorStore.ts` — sqlite-vec + RRF ngwakọta
  - `src/lib/memory/embedding/index.ts` — oyi akwa embedding sitere n'ọtụtụ isi mmalite
  - `src/lib/memory/embedding/types.ts`, `remote.ts`, `staticPotion.ts`,
    `transformersLocal.ts`, `cache.ts`
  - `src/shared/schemas/memory.ts` — schema Zod maka body API ebe nchekwa niile
  - `src/shared/schemas/qdrant.ts` — schema Zod maka ntọala/arụmọrụ Qdrant
  - `src/lib/db/memoryVec.ts` — CRUD maka `memory_vec_meta`
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
  - `src/app/api/settings/qdrant/route.ts` + sub-routes
  - `src/app/(dashboard)/dashboard/memory/` — UI Studio (page + components +
    tabs + hooks)
  - `open-sse/handlers/chatCore.ts` (njikọ itinye / iwepụta)
  - `open-sse/mcp-server/tools/memoryTools.ts`

---

## Ịhọrọ Onye Na-enye Embedding (v3.8.16+)

Injin ebe nchekwa OmniRoute na-akwado **isi mmalite embedding anọ** (`src/lib/memory/embedding/`). Nke ọ bụla nwere uru na ọghọm dị iche iche n'ihe gbasara **oge nzaghachi, ọnụ ahịa, ogo model, na mgbagwoju anya nhazi**.

### Isi Mmalite Embedding Ndị Ahụ

| Onye na-enye   | Isi mmalite                                             | Oge nzaghachi                         | Ọnụ ahịa             | Ogo                                   | Nhazi                                                    |
| -------------- | ------------------------------------------------------- | ------------------------------------- | -------------------- | ------------------------------------- | -------------------------------------------------------- |
| `transformers` | Model ONNX mpaghara (Xenova/all-MiniLM-L6-v2)           | ~50-150ms (CPU)                       | N'efu                | Ọma                                   | Naanị `npm install`                                      |
| `static`       | Vector ndị agbakọtara tupu oge eruo (cached)            | <1ms                                  | N'efu                | N/A (dabere na cache hit)             | Ọ dịghị                                                  |
| `remote`       | API OpenAI / Cohere / Voyage                            | ~100-300ms                            | $0.02-0.10/1M tokens | Magburu onwe ya                       | API key                                                  |
| `auto`         | Na-ahọrọ isi mmalite kacha mma dị n'oge arụmọrụ         | Otu ihe ahụ dị ka isi mmalite a họọrọ | N'efu                | Otu ihe ahụ dị ka isi mmalite a họọrọ | Ọ dịghị                                                  |
| _(cache)_      | Oyi akwa LRU dị na ebe nchekwa n'elu isi mmalite ọ bụla | <1ms (hit), oge zuru ezu (miss)       | N'efu                | Otu ihe ahụ dị ka nke dị n'okpuru     | Na-arụ ọrụ mgbe niile (ọ bụghị isi mmalite a pụrụ ịhọrọ) |

### Osisi Mkpebi

```
                  Gịnị bụ ọnọdụ mbunye gị?
                  │
      ┌───────────┼───────────┬──────────────┐
      │           │           │              │
  DEV/NNWALE  PROD NTAKỊRỊ PROD UKWU     EDGE / NA-ANỌGHỊ N'ỊNTANET
      │           │           │              │
      ▼           ▼           ▼              ▼
  transformers transformers remote (Qdrant) transformers
  (n'efu, enweghị API)       (ogo kacha mma) (enweghị ịntanet)
      │           │           │              │
      └────────┬──┴───────────┴──────────────┘
               │
               ▼
            TINYE oyi akwa `cache` n'elu MGBE NIILE
            (LruCache na-ekpuchi onye na-enye ọ bụla)
```

### Nhazi Database & API

A na-ahazi nhọrọ embedding ebe nchekwa site na API/UI Ntọala, ọ bụghị site na environment variables. Igodo database ntọala ndị metụtara ya n'okpuru Ntọala (`normalizeMemorySettings` na `src/lib/memory/settings.ts`) bụ:

- `memoryEmbeddingSource`: `"transformers"` (mpaghara), `"remote"` (dabere na API, dịka OpenAI), `"static"` (ebe nchekwa mpụga), ma ọ bụ `"auto"`
- `memoryEmbeddingProviderModel`: Njirimara model maka isi mmalite remote/static (dịka, `"text-embedding-3-small"`)
- `memoryTransformersEnabled`: `true` | `false`
- `memoryStaticEnabled`: `true` | `false`
- `memoryVectorStore`: `"sqlite-vec"`, `"qdrant"`, ma ọ bụ `"auto"`

#### Model Mpaghara (`transformers`)

Na-eji transformers.js n'ime ya iji mee ka model mpaghara rụọ ọrụ:

```bash
# Env vars ndị a na-agụ na code (src/lib/memory/embedding/index.ts):
MEMORY_TRANSFORMERS_MODEL=Xenova/all-MiniLM-L6-v2  # Ebe nchekwa model HF
MEMORY_STATIC_MODEL=minishlab/potion-base-8M       # Model potion static HF
MEMORY_STATIC_CACHE_DIR=<DATA_DIR>/embeddings      # Ndekọ cache
```

#### Cache Embedding LRU

Cache na-arụ ọrụ mgbe niile na ndabara, a na-ahazikwa ya site na env vars:

```bash
MEMORY_EMBEDDING_CACHE_MAX=1000                    # Ọnụ ọgụgụ item cached kacha elu
MEMORY_EMBEDDING_CACHE_TTL_MS=300000               # TTL (nkeji 5)
```

### Ọnụọgụ Arụmọrụ

Nnwale arụmọrụ na sava x86 nwere isi 4 a na-ahụkarị (ederede ọ bụla nwere ihe dị ka token 100):

| Onye na-enye ọrụ     | p50   | p95   | p99   | Ọnụ ahịa / embeddings 1M           |
| -------------------- | ----- | ----- | ----- | ---------------------------------- |
| `transformers` (CPU) | 80ms  | 180ms | 350ms | N'efu                              |
| `remote` (OpenAI)    | 120ms | 220ms | 400ms | ~$0.02 (ada-002) / $0.13 (3-large) |
| `static` (Qdrant)    | 15ms  | 30ms  | 60ms  | Dabere na nnabata Qdrant           |
| `cache` (enwetara)   | <1ms  | <1ms  | 2ms   | N'efu                              |

---

## Usoro Nwepụta Eziokwu (v3.8.16+)

Modul `extraction.ts` (`src/lib/memory/extraction.ts`) na-eji **ndakọrịta usoro regex** ewepụta eziokwu ahaziri ahazi site na ozi mkparịta ụka. Ịghọta usoro ndị a na-enyere gị aka imezi ogo nwepụta maka ojiji gị.

### Otu Usoro Ndabara

| Otu                 | Ọmụmaatụ usoro                                                                 | Ihe ọ na-ejide                 |
| ------------------- | ------------------------------------------------------------------------------ | ------------------------------ |
| PREFERENCE_PATTERNS | `"Ihe <X> ka m na-ahọrọ"`, `"Ihe <X> na-amasị m"`, `"Akpọrọ m <X> asị"`        | Mmasị onye ọrụ                 |
| DECISION_PATTERNS   | `"Aga m eji <X>"`, `"Ekpebiri m ime <X>"`, `"Ahọrọ m <X>"`                     | Mkpebi onye ọrụ (episodic)     |
| PATTERN_PATTERNS    | `"M na-emekarị <X>"`, `"M na-eme <X> mgbe niile"`, `"Anaghị m eme <X> ma ọlị"` | Usoro omume na-adịgide adịgide |

### Ọmụmaatụ Usoro (E mere ka ha dị mfe)

```ts
// Site na src/lib/memory/extraction.ts
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

### Ihe A Na-ewepụta

Mgbe onye ọrụ kwuru:

> "TypeScript ka m na-ahọrọ. Aga m eji Postgres maka ọrụ a. M na-eme commit mgbe niile tupu m emee push. Python anaghị amasị m."
> Nwepụta ahụ na-emepụta ebe nchekwa 4:
>
> | Igodo                                | Otu    | Ụdị      | Ọdịnaya               |
> | ------------------------------------ | ------ | -------- | --------------------- |
> | `preference:typescript`              | mmasị  | eziokwu  | "TypeScript"          |
> | `decision:postgres_for_this_project` | mkpebi | episodic | "Postgres maka ọrụ a" |
> | `pattern:commit_before_pushing`      | usoro  | eziokwu  | "commit tupu push"    |
> | `preference:python`                  | mmasị  | eziokwu  | "Python"              |

### Oke Nwepụta

Iji gbochie nwepụta na-enweghị njedebe, oke ndị a na-emetụta ya:

| Ogologo ọdịnaya kacha nta | mkpụrụedemede 3 |
| Ogologo ọdịnaya kacha ukwuu | mkpụrụedemede 500 |

### Mgbe A Ga-agbanyụ Nwepụta

Nwepụta na-arụ ọrụ na-akpaghị aka mgbe ọ bụla agbanyere ebe nchekwa; enweghị mgba ọkụ
dị iche maka naanị nwepụta. Iji gbanyụọ ya, gbanyụọ ebe nchekwa kpamkpam (`enabled: false`
site na `PUT /api/settings/memory`). Tụlee ime nke a mgbe:

- Ị nwere ọtụtụ ozi, ọnụ ahịa nwepụta ahụ adịghịkwa ntakịrị
- Mkparịta ụka gị na-abụkarị nke nwa oge (nkata, idozi njehie) na-enweghị uru ogologo oge
- Ị na-eji plugin omenala echekwa ọnọdụ ugbua

---

## Mmezi Hybrid RRF (v3.8.16+)

Algọridim **Reciprocal Rank Fusion (RRF)** na-ejikọta nsonaazụ FTS5 (okwu isi) na vector (ọdịdị nghọta). Paramita `k` na-achịkwa oke ibu a na-enye nsonaazụ ndị nọ n'ọkwa dị ala.

### Usoro Ngụkọta

Maka ebe nchekwa ọ bụla a na-atụle, akara RRF bụ:

```
RRF(d) = Σ  1 / (k + rank_i(d))
```

Ebe:

- `k` bụ ọnụọgụ na-adịghị agbanwe agbanwe (ndabara bụ 60)
- `rank_i(d)` bụ ọkwa akwụkwọ `d` n'ime sistemụ nchọta nke i (FTS, vector)
- Nchịkọta ahụ na-agafe sistemụ nchọta niile

### Otu `k` Si Emetụta Nsonaazụ

| Uru `k`              | Mmetụta                                                                                                  | Nke kacha mma maka                           |
| -------------------- | -------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `k=0`                | Ngwakọta ọkwa nkịtị (enweghị ime ka ọ dị larịị)                                                          | Ntọala ntụnyere nke echiche                  |
| `k=10-30`            | Na-enye nsonaazụ ndị kacha elu nnukwu ibu; ndị nọ n'ọkwa dị ala anaghị atụnye nnukwu ihe                 | Mgbe nsonaazụ 3 kacha elu na-abụkarị eziokwu |
| **`k=60`** (ndabara) | Ziri ezi n'etiti — nsonaazụ 10 kacha elu niile na-atụnye ihe bara uru                                    | Nchọta maka ojiji izugbe                     |
| `k=100+`             | Dị larịị karịa — ọbụna nsonaazụ ndị nọ n'ọkwa dị ala nwere ike ịchị ma ọ bụrụ na ha pụta n'ọtụtụ sistemụ | Mgbe recall > precision dị oke mkpa          |

### Imezi `k` N'Ojiji N'Ezie

```bash
# Ndabara
MEMORY_RRF_K=60

# Nkenke siri ike (ebe nchekwa nta, akwụkwọ ole na ole)
MEMORY_RRF_K=20

# Nchọta kachasị (ebe nchekwa buru ibu, ajụjụ dịgasị iche)
MEMORY_RRF_K=120
```

**Ọmụmaatụ nwere `k=20`:**

- Ọkwa FTS 1 → ntinye `1/21 = 0.048`
- Ọkwa FTS 10 → ntinye `1/30 = 0.033`
- Ọkwa vector 1 → ntinye `0.048`
- Oke ngwakọta: `0.096`

**Ọmụmaatụ nwere `k=60`:**

- Ọkwa FTS 1 → ntinye `1/61 = 0.016`
- Ọkwa FTS 10 → ntinye `1/70 = 0.014`
- Ọkwa vector 1 → ntinye `0.016`
- Oke ngwakọta: `0.033`

Mgbe `k` dị elu, **ọdịiche n'ogo** dị n'etiti top-1 na rank-10 na-adị ntakịrị, ya mere algọridim ahụ na-adabere karịa na **nkwekọrịta n'etiti sistemụ nchọta** kama ịdabere na ntụkwasị obi nke ọkwa kacha elu.

### Mgbe A Ga-agbanwe `k`

| Mgbaàmà                                                             | Nwalee                                                                               |
| ------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| Nsonaazụ kacha elu na-emeri mgbe niile, mana ọ bụ ihe na-ezighi ezi | **Wedata** k (dịka ọmụmaatụ, 20) — ntụkwasị obi nke ọkwa kacha elu ga-adị mkpa karịa |
| Azịza ziri ezi dị na top-5 mana ọ bụghị top-1                       | **Bulie** k (dịka ọmụmaatụ, 100) — akara dị larịị na-akwụghachi nkwekọrịta           |
| Recall dị elu mana precision dị ala                                 | **Wedata** k — mee ka nhazi ọkwa sie ike                                             |
| Recall dị ala (akwụkwọ ndị metụtara ya na-efu)                      | **Bulie** k — nye akwụkwọ ndị nọ n'ọkwa dị ala ohere                                 |

### Inye RRF Ibu

Reciprocal rank fusion na-enye ọkwa semantic vector na ọkwa nchọta ederede zuru oke ibu hà nhata:

```
RRF(d) = 1/(k + rank_vector) + 1/(k + rank_fts)
```

Enweghị environment variables maka imezi ibu nke ọ bụla n'otu n'otu (`MEMORY_RRF_VECTOR_WEIGHT`/`MEMORY_RRF_FTS_WEIGHT` adịghị).

---

## Atụmatụ Nchịkọta (v3.8.16+)

Modul `summarization.ts` (`src/lib/memory/summarization.ts`) na-akpakọta ebe nchekwa ndị ochie iji mee ka nchịkọta ndị na-arụ ọrụ dị ntakịrị ma nọgide na-echekwa ikike icheta ha.

### Mgbe Nchịkọta Na-Amalite

| Ihe na-akpalite ya     | Oke (ndabara)  |
| ---------------------- | -------------- |
| Iji API aka kpalite ya | adịghị emetụta |

### Ihe A Na-achịkọta

A na-ebupụ ụzọ mbata abụọ site na `summarization.ts`:

- **`summarizeMemories(apiKeyId, sessionId?, maxTokens = 4000)`** — na-akpakọta
  ebe nchekwa nke nnọkọ ka ọ bụrụ otu ederede nchịkọta nke oke token nyere iwu.
- **`summarizeMemoriesOlderThan(apiKeyId, days, dryRun)`** — mkpakọ dabere
  n'afọ nke API na-eji: ọ na-ahọrọ ebe nchekwa niile karịrị `days`, mepụta
  otu ebe nchekwa nchịkọta e mere ka ọ dị mkpụmkpụ site na ha, ma (mgbe `dryRun` bụ `false`) hichapụ
  ndị mbụ ahụ. Nyefee `dryRun: true` iji hụ nlele nke nchịkọta ndị a ga-ahọrọ na mkpokọta token
  n'emeghị mgbanwe ọ bụla.

Enweghị usoro ijikọta tag/key ma ọ bụ inye ebe nchekwa ọ bụla akara "isi vs nke a pụrụ ịchịkọta" —
nhọpụta na-adabere naanị n'oke afọ, ebe ederede nchịkọta ahụ bụ ahịrị dị mkpụmkpụ nke
ụdị ya dị n'ihu maka onye ọ bụla a họpụtara.

### Ịkpalite Nchịkọta

Nchịkọta bụ ihe a na-eme **aka / site na nhọrọ** — ntọala `autoSummarize` bụ `false` na
ndabara, ya mere ọ dịghị ihe a na-akpakọta na-akpaghị aka. Jiri API kpalite ya:

```bash
curl -X POST http://localhost:20128/api/memory/summarize \
  -H "Authorization: Bearer $OMNIROUTE_KEY"
```

Iji hapụ ya ka ọ ghara ịrụ ọrụ, naanị debe `autoSummarize` na ndabara ya (`false`).

### Ndụmọdụ Maka Ogo Nchịkọta

- **Buru ụzọ jiri `dryRun` hụ nlele** — `summarizeMemoriesOlderThan(..., true)` na-eweghachi
  ndepụta ndị a ga-ahọrọ na mkpokọta token ka ị nwee ike ịkwado ihe ndị a ga-ejikọta
  tupu ihichapụ ndị mbụ.
- **Mee nchịkọta n'oge okporo ụzọ dị nta** ma ọ bụrụ na ị nwere nnukwu nchịkọta ebe nchekwa — oku LLM bụ akụkụ na-ewe oge

```bash
# Ụdị Cron: chịkọta kwa ụbọchị n'elekere atọ nke ụtụtụ
0 3 * * * curl -X POST http://localhost:20128/api/memory/summarize \
  -H "Authorization: Bearer $OMNIROUTE_KEY"
```

---

## Usoro Onye Na-enye MemoryBackend

> **Isi mmalite nke eziokwu:** `src/lib/memory/backend.ts`, `src/lib/memory/genericBackend.ts`, `src/lib/memory/manager.ts`
> **Nnwale:** `src/lib/memory/__tests__/generic-backend.test.ts`

Usoro onye na-enye MemoryBackend na-etinye **oyi akwa abstraction backend a pụrụ itinye ma wepụ** n'elu injin ebe nchekwa dị ugbu a. Kama ijikọ ya na naanị otu mmejuputa nchekwa, sistemụ ebe nchekwa na-akwado ọtụtụ backend ugbu a (SQLite, Obsidian, Notion, backend HTTP ahaziri iche) yana nhazi ụzọ primary/fallback.

### Nhazi Ụlọ

```
┌──────────────────────────────────────────────────────────┐
│                    Ụzọ API                               │
│            (src/app/api/memory/route.ts)                  │
└──────────────────────┬───────────────────────────────────┘
                       │
┌──────────────────────▼───────────────────────────────────┐
│                   MemoryManager                           │
│           Onye nhazi singleton (manager.ts)               │
│                                                          │
│  Nke Mbụ ──► Backend A  (dịka SQLite)                    │
│  Ndabere ───► Backend B  (dịka Obsidian)                 │
│              Backend C  (dịka Notion site na GenericBackend) │
└──────────────────────┬───────────────────────────────────┘
                       │
        ┌──────────────┼──────────────┐
        ▼              ▼              ▼
┌────────────┐ ┌────────────┐ ┌──────────────────┐
│ SQLite     │ │ Obsidian   │ │ GenericMemory    │
│ Backend    │ │ Backend    │ │ Backend (HTTP)   │
└────────────┘ └────────────┘ └──────────────────┘
```

#### Interface Isi (`backend.ts`)

Backend ọ bụla ga-emejuputa interface `MemoryBackend`:

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

  // Ọchụchọ
  search(config: SearchConfig): Promise<Memory[]>;

  // Ọnọdụ arụmọrụ
  health(): Promise<HealthCheckResult>;

  // Usoro ndụ (nhọrọ)
  initialize?(): Promise<void>;
  shutdown?(): Promise<void>;
}
```

#### MemoryManager (`manager.ts`)

Onye nhazi singleton nke:

- **Na-edebanye** backend site na `register(backend)` — a na-akpọ ya n'oge mbido site na `index.ts`
- **Na-ahazi** primary + fallback site na `configure(primary, fallbacks)`
- **Na-eduzi** CRUD/ọchụchọ gaa na primary, jiri usoro fallback mgbe ọ dara
- **Na-enyocha ọnọdụ arụmọrụ** nke backend niile n'oge dị iche iche

**Omume fallback:**

| Ọrụ      | Primary                  | Fallbacks                         |
| -------- | ------------------------ | --------------------------------- |
| `create` | ✅ Naanị primary         | ❌                                |
| `get`    | ✅ Buru ụzọ nwaa primary | ✅ Jiri fallback ma ọ bụrụ null   |
| `update` | ✅ Naanị primary         | ✅ Mmekọrịta fire-and-forget      |
| `delete` | ✅ Naanị primary         | ✅ Mmekọrịta fire-and-forget      |
| `list`   | ✅ Naanị primary         | ❌                                |
| `search` | ✅ Primary buru ụzọ      | ✅ Jiri fallback mgbe njehie mere |

#### GenericMemoryBackend (`genericBackend.ts`)

Njikọ HTTP izugbe nke na-eme ka REST API ọ bụla kwekọọ na MemoryBackend. Ọ bara uru maka:

- **Notion** — jikọọ site na Notion API
- **Obsidian** — jikọọ site na Obsidian Local REST API
- **Backend ahaziri iche** — ọrụ ọ bụla na-enye API ebe nchekwa RESTful

**Nhazi:**

```typescript
interface GenericBackendConfig {
  baseUrl: string;           // URL ntọala nke API azụọrụ
  apiKey?: string;           // Token Bearer maka nyocha njirimara
  headers?: Record<string, string>;  // Nkụnyeisi HTTP ahaziri ahazi
  timeout?: number;          // Oge nkwụsị arịrịọ (ndabara: 30000ms)
  backendType?: string;      // Maka ndekọ ihe omume

  // Mgbanwe endpoint (ndabara na-eji usoro REST)
  endpoints?: {
    search?: string;   // ndabara: "/memories/search"
    create?: string;   // ndabara: "/memories"
    list?: string;     // ndabara: "/memories"
    get?: string;      // ndabara: "/memories/{id}"
    update?: string;   // ndabara: "/memories/{id}"
    delete?: string;   // ndabara: "/memories/{id}"
    health?: string;   // ndabara: "/health"
  };

  // Nhazi njikọ aha paramita ajụjụ
  queryParams?: {
    query?/apiKeyId?/limit?/offset?/strategy?/maxTokens?/type?/sessionId?/orderBy?/orderDir?/options?
  };

  // Nhazi njikọ aha paramita ụzọ
  pathParams?: {
    id?/memoryId?
  };
}
```

**Azụọrụ ndị amaara** ahazirilarị na `KNOWN_BACKENDS`:

```typescript
createKnownBackend("obsidian"); // → GenericMemoryBackend na-arụtụ aka na localhost:27123
createKnownBackend("notion"); // → GenericMemoryBackend na-arụtụ aka na api.notion.com/v1
```

#### Azụọrụ Ndị E Wunyere N'ime Ya

##### SQLiteBackend (`sqliteBackend.ts`)

Azụọrụ bụ isi ndabara. Ọ na-ekpuchi ebe nchekwa memori dị ugbu a nke dabeere na SQLite site n'iji `src/lib/memory/store.ts`. A na-edebanye aha ya na-akpaghị aka mgbe usoro na-amalite.

```typescript
import { sqliteBackend } from "./sqliteBackend";
memoryManager.register(sqliteBackend);
```

##### ObsidianBackend (`obsidianBackend.ts`)

Ọ na-ekpuchi njikọta Obsidian dị ugbu a (`src/lib/memory/obsidianBackend.ts`). Ọ na-ejikọta na vault Obsidian site na Obsidian Local REST API.

### Ntọala

A na-echekwa ntọala azụọrụ memori na tebụl ntọala ngwa ahụ ma na-ejikwa ha site na `src/lib/memory/settings.ts`:

| Ntọala         | Igodo Env/Config         | Ndabara    | Nkọwa                             |
| -------------- | ------------------------ | ---------- | --------------------------------- |
| Azụọrụ bụ isi  | `memoryPrimaryBackend`   | `"sqlite"` | ID nke azụọrụ bụ isi              |
| Azụọrụ ndabere | `memoryFallbackBackends` | `[]`       | ID azụọrụ ndabere ahaziri n'usoro |
| Nhazi azụọrụ   | `memoryBackendConfigs`   | `{}`       | Mgbanwe nhazi maka azụọrụ ọ bụla  |

A na-ahazi ntọala site na `normalizeMemorySettings()` ma na-echekwa ya na cache na `getMemorySettings()`.

### Usoro Mbido

```
Mbido ngwa
  → mbubata index.ts (mmetụta n'akụkụ): na-edebanye aha SQLiteBackend
  → a na-akpọ initMemoryBackends() site na usoro ndụ ngwa:
      1. Bulite ntọala (getMemorySettings)
      2. Hazie azụọrụ bụ isi + azụọrụ ndabere
      3. Bido azụọrụ niile (nyocha ahụike)
      4. Dị njikere maka arịrịọ
```

### Ịgbakwunye Azụọrụ Ọhụrụ

1. **Mejuputa interface `MemoryBackend`** na `src/lib/memory/<name>Backend.ts`
2. **Bupụ** site na `src/lib/memory/index.ts`
3. **Debanye aha** site na `memoryManager.register(yourBackend)` mgbe usoro na-amalite
4. **Hazie** site na ntọala: tọọ `memoryPrimaryBackend` ka ọ bụrụ ID azụọrụ gị
5. **Nwalee** site n'iji `src/lib/memory/__tests__/generic-backend.test.ts` dịka ntụaka

#### Ọmụmaatụ: Azụọrụ Brain

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

### Nkwenye

#### Nnwale nkeji

```bash
npx vitest run src/lib/memory/__tests__/generic-backend.test.ts --reporter=verbose
```

Nsonaazụ a tụrụ anya ya: **nnwale 35, ha niile gafere** nke gụnyere:

- Constructor (2)
- Nnyocha ahụike (4) — ịga nke ọma, ọdịda 500, njehie netwọkụ, igbu oge
- Mbido (2) — ịga nke ọma, ọdịda
- Mepụta (2) — endpoint ndabara, endpoint ahaziri ahazi
- Nweta (4) — ịga nke ọma, 404 → null, tụpụ njehie na-abụghị 404, paramita ụzọ ahaziri ahazi
- Melite (2) — ịga nke ọma, 404 → false
- Hichapụ (2) — ịga nke ọma, 404 → false
- Depụta (2) — paramita ajụjụ, aha paramita ahaziri ahazi
- Chọọ (3) — paramita ajụjụ, endpoint ahaziri ahazi, ịgbanwe options ka ọ bụrụ usoro e nwere ike ichekwa
- Nkụnyeisi nyocha njirimara (2) — token Bearer, nkụnyeisi ahaziri ahazi
- Factory (1)

#### Nnyocha ụdị

```bash
npm run typecheck:core
```

Ihe a tụrụ anya ya: **njehie 0**.
