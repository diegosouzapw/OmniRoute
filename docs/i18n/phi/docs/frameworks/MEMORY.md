# Memory System (Filipino)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/MEMORY.md) · 🇪🇹 [am](../../../am/docs/frameworks/MEMORY.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/MEMORY.md) · 🇦🇿 [az](../../../az/docs/frameworks/MEMORY.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/MEMORY.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/MEMORY.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/MEMORY.md) · 🇩🇰 [da](../../../da/docs/frameworks/MEMORY.md) · 🇩🇪 [de](../../../de/docs/frameworks/MEMORY.md) · 🇬🇷 [el](../../../el/docs/frameworks/MEMORY.md) · 🇪🇸 [es](../../../es/docs/frameworks/MEMORY.md) · 🇪🇪 [et](../../../et/docs/frameworks/MEMORY.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/MEMORY.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/MEMORY.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/MEMORY.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/MEMORY.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/MEMORY.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/MEMORY.md) · 🇮🇱 [he](../../../he/docs/frameworks/MEMORY.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/MEMORY.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/MEMORY.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/MEMORY.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/MEMORY.md) · 🇮🇩 [id](../../../id/docs/frameworks/MEMORY.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/MEMORY.md) · 🇮🇹 [it](../../../it/docs/frameworks/MEMORY.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/MEMORY.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/MEMORY.md) · 🇰🇭 [km](../../../km/docs/frameworks/MEMORY.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/MEMORY.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/MEMORY.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/MEMORY.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/MEMORY.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/MEMORY.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/MEMORY.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/MEMORY.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/MEMORY.md) · 🇲🇲 [my](../../../my/docs/frameworks/MEMORY.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/MEMORY.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/MEMORY.md) · 🇳🇴 [no](../../../no/docs/frameworks/MEMORY.md) · 🇮🇳 [or](../../../or/docs/frameworks/MEMORY.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/MEMORY.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/MEMORY.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/MEMORY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/MEMORY.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/MEMORY.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/MEMORY.md) · 🇱🇰 [si](../../../si/docs/frameworks/MEMORY.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/MEMORY.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/MEMORY.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/MEMORY.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/MEMORY.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/MEMORY.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/MEMORY.md) · 🇮🇳 [te](../../../te/docs/frameworks/MEMORY.md) · 🇹🇭 [th](../../../th/docs/frameworks/MEMORY.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/MEMORY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/MEMORY.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/MEMORY.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/MEMORY.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/MEMORY.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/MEMORY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/MEMORY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/MEMORY.md)

---

> **Pinag-iisang sanggunian:** `src/lib/memory/` at `src/app/api/memory/`
> **Huling na-update:** 2026-06-28 — v3.8.40 (naka-off bilang default + paghahabol sa int8 quantization)

Nagbibigay ang OmniRoute ng persistent na memorya ng pag-uusap na tinutukoy ayon sa API key (at
opsyonal na session id). Awtomatikong kinukuha ang mga memorya mula sa mga tugon ng LLM
sa pamamagitan ng magaang regex pattern matching at muling ini-inject sa mga susunod na
kahilingan bilang nangungunang system message (o unang user message para sa mga provider na
tumatanggi sa system role).

> **Naka-OFF ang memorya bilang default (v3.8.30+).** Ang `DEFAULT_MEMORY_SETTINGS.enabled` ay
> `false` na ngayon (`src/lib/memory/settings.ts`). Kapag pinagana ang memorya, nag-i-inject ito ng hanggang
> `maxTokens` (~2k) ng nakuhang konteksto sa **bawat** chat request, na
> sinisingil — isang di-inaasahang gastos para sa mga bagong installation at para sa mga client na namamahala ng
> sarili nilang konteksto. Tahasang mag-opt in sa ilalim ng **Settings → Memory** (nagpapakita ang
> `MemorySkillsTab` ng babala tungkol sa gastos sa token kapag pinagana ang memorya).
> Maaaring mag-opt out ang isang client para sa isang kahilingan gamit ang `x-omniroute-no-memory`
> request header (`true`/`1`/`yes`) — tingnan ang talahanayan ng request-header sa
> [API_REFERENCE.md](../reference/API_REFERENCE.md). Itinatakda ng isang no-memory request ang
> `memoryOwnerId = null`, na nagdi-disable sa **parehong** pag-inject ng memorya at skill para
> sa kahilingang iyon (`open-sse/handlers/chatCore/headers.ts::isNoMemoryRequested`).

Ang memorya ay **nakasaklaw sa bawat API key**, hindi sa bawat user — ang bawat kahilingang na-authenticate
gamit ang parehong API key ay gumagamit ng parehong memory pool, na may opsyonal na karagdagang
pagsasaklaw ayon sa `sessionId`.

## Arkitektura

```
Client → /v1/chat/completions (na-resolve na ang apiKeyInfo sa upstream)
  → handleChatCore() [open-sse/handlers/chatCore.ts]
    → resolveMemoryOwnerId(apiKeyInfo)        # kinukuha ang id
    → getMemorySettings()                     # naka-cache na mga setting
    → shouldInjectMemory(body, {enabled})     # gate
    → retrieveMemories(apiKeyId, config)      # SQL + FTS5 + opsyonal na vector
    → injectMemory(body, memories, provider)  # system o user message
  → pagtawag sa upstream provider
  → sa tugon: extractFacts(text, apiKeyId, sessionId)  # hindi nagba-block
    → setImmediate → createMemory(fact) sa bawat match
                   → embed(content) + upsertVector(id, vec)
```

Ang mga call-site para sa injection at extraction ay naka-wire sa
`open-sse/handlers/chatCore.ts` (hanapin ang `retrieveMemories`, `injectMemory`,
at `extractFacts`).

## Arkitektura ng engine (3-tier na resolution)

Nire-resolve ng Memory Engine ang retrieval path sa runtime batay sa available na
imprastraktura at mga setting. May tatlong tier, na inilalapat ayon sa pagkakasunod-sunod ng priyoridad:

```
  ┌─────────────────────────────────────────────────────────────┐
  │  TIER 0 — Keyword (FTS5)                                    │
  │  Availability na tinutukoy ng probe: FTS5 kapag sinusuportahan│
  │  ito ng SQLite build (better-sqlite3 / node:sqlite /         │
  │  bun:sqlite); hindi available sa mga build na walang FTS5    │
  │  (hal. sql.js/WASM — "no such module: fts5"). Ginagamit kapag│
  │  strategy = "exact" o bilang fallback; ipinapakita ng        │
  │  keyword sa engine-status ang resulta ng probe.              │
  └──────────────────────────────────┬──────────────────────────┘
                                     │ strategy = semantic|hybrid?
                                     ▼
  ┌─────────────────────────────────────────────────────────────┐
  │  TIER 1 — Embedded Vector (sqlite-vec)                       │
  │  Nilo-load ang sqlite-vec v0.1.9 sa pamamagitan ng           │
  │  db.loadExtension().                                        │
  │  KNN brute-force sa mga Float32 vector. Aktibo kapag:        │
  │   • matagumpay ang sqlite-vec loadExtension                  │
  │   • May available na embedding source (remote | static |     │
  │     transformers) na makagagawa ng Float32Array              │
  │   • umiiral ang vec_memories table (ginagawa sa unang ready())│
  └──────────────────────────────────┬──────────────────────────┘
                                     │ qdrant.enabled?
                                     ▼
  ┌─────────────────────────────────────────────────────────────┐
  │  TIER 2 — Qdrant (opt-in na external vector database)        │
  │  Kapag pinagana, pinapalitan nito ang sqlite-vec para sa     │
  │  semantic/hybrid.                                           │
  │  Nangangailangan ng tumatakbong Qdrant instance + naka-      │
  │  configure na host/port.                                    │
  └─────────────────────────────────────────────────────────────┘
```

Awtomatiko at transparent ang degradation:

- Kung hindi ma-load ang sqlite-vec, hindi available ang tier 1 → babalik sa tier 0.
- Kung magbalik ng error ang embedding source, babalik ang tier 1 sa tier 0.
- Kung hindi healthy ang Qdrant, babalik ang tier 2 sa tier 1 (o tier 0 kung hindi rin
  available ang tier 1).

## Mga source ng embedding

Tinutukoy ng embedding layer (`src/lib/memory/embedding/`) kung aling source ang gagamitin
batay sa `MemorySettingsExtended.embeddingSource`:

| Source         | Paglalarawan                                                                                  | Kailangan ng key | Cold start       |
| -------------- | --------------------------------------------------------------------------------------------- | ---------------- | ---------------- |
| `remote`       | Gumagamit ng embedding API ng naka-configure na provider (OpenAI, Cohere, atbp.)              | Oo               | Wala             |
| `static`       | Lokal na lookup-table embedding sa pamamagitan ng `potion-base-8M` (WordPiece + mean pooling) | Hindi            | ~200ms           |
| `transformers` | Lokal na ONNX inference sa pamamagitan ng `@huggingface/transformers` v4, `all-MiniLM-L6-v2`  | Hindi            | ~3s + ~400MB RAM |
| `auto`         | Runtime resolution: remote (kung may key) → static → transformers → null                      | Depende          | Depende          |

**Pagkakasunod-sunod ng resolution para sa `auto`:**

1. Hanapin ang unang provider sa `listEmbeddingProviders()` na may `hasKey === true` → `remote`.
2. Kung `settings.staticEnabled === true` → `static`.
3. Kung `settings.transformersEnabled === true` → `transformers`.
4. Kung hindi → `null` (bumababa sa FTS5 keyword search).

Gumagamit ang embedding cache (`src/lib/memory/embedding/cache.ts`) ng isang in-memory
LRU map na may key na `${source}:${model}:${dim}:${sha256(text)}`, na nililimitahan sa
`MEMORY_EMBEDDING_CACHE_MAX` entry (default na 1000) na may TTL na
`MEMORY_EMBEDDING_CACHE_TTL_MS` (default na 5 min). Ibinabahagi ito sa lahat ng caller
sa bawat lifecycle ng process.

## Hybrid RRF (k=60)

Kapag `strategy = "hybrid"` at available ang vector store, gumagamit ang retrieval ng
Reciprocal Rank Fusion upang pagsamahin ang mga resulta ng FTS5 at vector:

```
RRF(d) = Σ  1 / (k + rank_i(d))      kung saan k = 60 (maaaring i-configure sa pamamagitan ng MEMORY_RRF_K)
          i
```

Sa partikular:

1. Patakbuhin ang FTS5 search → ranked list na `R_fts` (posisyon 1..N).
2. Patakbuhin ang KNN vector search → ranked list na `R_vec` (posisyon 1..M).
3. Para sa bawat natatanging `memoryId`:  
   `rrf_score = 1/(60 + fts_rank)` + `1/(60 + vec_rank)` (0 kung wala sa listahan).
4. I-sort ayon sa `rrf_score` DESC, pagkatapos ay ilapat ang token budget walk.

Kilalang epektibo ang RRF nang hindi nangangailangan ng score normalization sa iba't ibang
heterogeneous retrieval system. Ang default na `k=60` ay mula sa orihinal na
papel nina Cormack et al. at mahusay itong gumagana para sa maliliit na corpus (<10k memory).

## Backfill (lazy + reindex)

Kapag nagbago ang embedding model (natutukoy sa pamamagitan ng `embedding_signature`), muling
binubuo ang vector store at minamarkahan ang lahat ng kasalukuyang memory bilang
`needs_reindex = 1` sa table na `memories`.

**Lazy backfill**: Sa susunod na retrieval, ang anumang memory na walang vector entry ay
ini-embed at ipinapasok sa `vec_memories` bago patakbuhin ang search. Dahil dito,
naipapamahagi ang gastos ng backfill sa mga aktuwal na request nang hindi bina-block ang startup.

**Tahasang reindex**: Nagbibigay ang tab na Engine sa `/dashboard/memory` ng
button na "I-reindex Ngayon" na tumatawag sa `POST /api/memory/reindex`. Tinatawag ng handler ang
`runReindexBatch()` mula sa `src/lib/memory/reindex.ts`, na nagpoproseso ng hanggang
`limit` na pending entry sa bawat request. Maaaring i-poll ang progreso sa pamamagitan ng
`GET /api/memory/engine-status` (`vectorStore.needsReindex`).

Iniimbak ng table na `memory_vec_meta` (migration na `083_memory_vec.sql`) ang:

- `active_dim` — kasalukuyang dimensyon ng vector (null = hindi pa naka-calibrate).
- `embedding_signature` — `${source}:${model}:${dim}` na ginagamit upang matukoy ang mga pagbabago.
- `last_reset_at` — timestamp ng huling ganap na pag-reset.
- `vec_loaded` — 0/1 flag kung matagumpay na na-load ang sqlite-vec.

## Extension ng mga setting

Siyam na field para sa embedding at vector ang available sa `MemorySettingsExtended` sa
`src/shared/schemas/memory.ts`, at pinapanatili sa pamamagitan ng `src/lib/db/settings.ts`:

| Field                    | Type                                               | Default  | Paglalarawan                                                      |
| ------------------------ | -------------------------------------------------- | -------- | ----------------------------------------------------------------- |
| `embeddingSource`        | `"remote" \| "static" \| "transformers" \| "auto"` | `"auto"` | Aling source ng embedding ang gagamitin                           |
| `embeddingProviderModel` | `string \| null`                                   | `null`   | Provider/model sa format na `provider/model`                      |
| `customBaseUrl`          | `string \| null`                                   | `null`   | Base URL ng OpenAI-compatible endpoint para lamang sa Memory      |
| `customModelId`          | `string \| null`                                   | `null`   | Model ID na ipinapadala sa custom endpoint                        |
| `transformersEnabled`    | `boolean`                                          | `false`  | Kusang pag-enable sa Transformers.js (MiniLM, ~400MB)             |
| `staticEnabled`          | `boolean`                                          | `false`  | Kusang pag-enable sa lokal na static potion-base-8M model         |
| `rerankEnabled`          | `boolean`                                          | `false`  | I-enable ang hakbang ng reranking (nagdaragdag ng +200-500ms/req) |
| `rerankProviderModel`    | `string \| null`                                   | `null`   | Provider/model para sa rerank sa format na `provider/model`       |
| `vectorStore`            | `"sqlite-vec" \| "qdrant" \| "auto"`               | `"auto"` | Aling vector backend ang gagamitin                                |

Inilalantad ang mga ito sa pamamagitan ng `GET /PUT /api/settings/memory` (schema na `MemorySettingsExtendedSchema`).

Para sa source na `remote`, tinatanggap din ng Memory ang mga opsiyonal na setting na `customBaseUrl` at
`customModelId`. Kapag pinagsama, pinipili ng mga ito ang isang OpenAI-compatible na `/embeddings`
endpoint at model nang hindi binabago ang pandaigdigang registry ng embedding. Isinasailalim sa
normalization ang endpoint bago gamitin at sinusuri ito ayon sa patakaran ng provider para sa outbound URL:
kinakailangan ang HTTP(S), tinatanggihan ang mga naka-embed na credential at query string, at nananatiling
naka-block ang mga address ng cloud metadata. Pinapanatili ng mga walang-lamang value ang napiling registry
provider. Sinasala ang mga error na ibinabalik sa dashboard at hindi kailanman nila-log ang mga credential
ng endpoint.

> **TODO (D20):** Ang scope na `global` (pagbabahagi ng mga memory sa lahat ng API key) ay hindi
> ipinatupad sa release na ito. Nangangailangan ito ng mga pagbabago sa schema at ng pandaigdigang retrieval
> path. Subaybayan ito nang hiwalay.

## Mga Layer ng Storage

### Pangunahin: SQLite (`memories` table)

Ginawa ng migration na `015_create_memories.sql`:

| Column                      | Type               | Mga Tala                                                                               |
| --------------------------- | ------------------ | -------------------------------------------------------------------------------------- |
| `id`                        | `TEXT PRIMARY KEY` | UUID na binuo sa pamamagitan ng `crypto.randomUUID()`                                  |
| `api_key_id`                | `TEXT NOT NULL`    | API key na nagmamay-ari                                                                |
| `session_id`                | `TEXT`             | Opsiyonal na scope para sa bawat pag-uusap                                             |
| `type`                      | `TEXT NOT NULL`    | Isa sa `factual`, `episodic`, `procedural`, `semantic`                                 |
| `key`                       | `TEXT`             | Matatag na upsert key, hal. `preference:i_prefer_python`                               |
| `content`                   | `TEXT NOT NULL`    | Ang aktuwal na teksto ng fact                                                          |
| `metadata`                  | `TEXT`             | JSON blob (category, extractedAt, source, ...)                                         |
| `created_at` / `updated_at` | `TEXT`             | Mga string na ISO 8601                                                                 |
| `expires_at`                | `TEXT`             | Opsiyonal na pag-expire; ang `NULL` ay nangangahulugang permanente                     |
| `memory_id`                 | `INTEGER UNIQUE`   | Idinagdag ng `023_fix_memory_fts_uuid.sql` upang pag-ugnayin ang mga UUID ↔ FTS5 rowid |

Mga index: `api_key_id`, `session_id`, `type`, `expires_at`, kasama ang natatanging
`memory_id` index.

**Semantika ng upsert**: Naghahanap ang `createMemory()` ng umiiral na row na may parehong
`(api_key_id, key)` at ina-update ito sa mismong kinalalagyan kapag natagpuan (pinagsasama ang `metadata` sa
pamamagitan ng shallow spread). Pinipigilan nitong lumaki nang walang hanggan ang table dahil sa mga
paulit-ulit na pahayag ng kagustuhan.

### Full-text Search (`memory_fts` virtual table)

Gumagawa ang `022_add_memory_fts5.sql` ng FTS5 virtual table sa ibabaw ng `content` at
`key`. Inaayos ng `023_fix_memory_fts_uuid.sql` ang isang bug na naranasan sa aktuwal na paggamit kung saan
hindi ma-join ang UUID primary key sa integer rowid ng FTS5—idinadagdag ng migration ang
column na `memory_id`, muling ginagawa ang FTS table, at ikinakabit ang mga trigger
(`memory_fts_ai`, `memory_fts_ad`, `memory_fts_au`) na nagpapanatiling naka-sync ang FTS sa
INSERT, DELETE, at UPDATE.

Ginagamit ng `retrieval.ts` para sa mga estratehiyang `semantic` at `hybrid` (tingnan sa ibaba).
Naglalagay ng proteksiyon ang retrieval code gamit ang `hasTable("memory_fts")` at bumabalik sa
kronolohikal na pagkakasunod-sunod kung nawawala ang FTS table o nagdudulot ng error ang FTS query.

### Opsiyonal: Qdrant (vector store tier 2)

Ipinapatupad ng `src/lib/memory/qdrant.ts` ang isang opsiyonal na integrasyon sa Qdrant bilang tier 2
vector store. Irinu-route lamang sa Qdrant ang retrieval kapag ang engine selector na
`memoryVectorStore === "qdrant"`—**hindi kailanman** pinipili ng default na `"auto"` (at ng `"sqlite-vec"`)
ang Qdrant. Sabay na itinatakda ng toggle sa Engine tab ang **parehong** `qdrantEnabled` at
`memoryVectorStore`: kapag ini-enable, ginagawang pangunahing store ang Qdrant; kapag dini-disable,
nire-reset ito sa `"auto"` (#5597—bago ang pag-aayos na iyon, walang epekto ang pag-enable dahil walang
sumusulat sa engine selector). Kung hindi maabot ang Qdrant o wala itong ibinalik, babalik ang retrieval
sa sqlite-vec → FTS5.

- `upsertSemanticMemoryPoint()` — i-embed ang `key + content` gamit ang naka-configure na
  embedding model, tiyaking umiiral ang collection (gumagawa ng mga vector na may cosine-distance
  sa unang paggamit), at mag-upsert ng point na may payload na `{memoryId,
apiKeyId, sessionId, key, content, metadata, createdAtUnix, expiresAtUnix}`.
- `searchSemanticMemory(query, topK, scope)` — i-embed ang query, hanapin sa
  collection na na-filter ayon sa `kind = "omniroute_memory"` at, kung kinakailangan, ayon sa
  `apiKeyId` / `sessionId`. Nililimitahan ang `topK` sa `[1, 20]`.
- `deleteSemanticMemoryPoint(id)` — pagtanggal ng isang point. Tinatawag ng
  `deleteMemory()` pagkatapos alisin ang SQLite row (D15).
- `cleanupSemanticMemoryPoints({retentionDays})` — maramihang pagtanggal ng mga point na ang
  `expiresAtUnix` ay lumipas na o ang `createdAtUnix` ay mas luma kaysa sa
  retention cutoff. Binibilang muna upang maipakita ng dashboard ang aktuwal na mga bilang.
- `checkQdrantHealth()` — `GET /readyz` health probe na may latency.

Inilalantad ng UI ng mga setting ang config ng Qdrant, health check, pagsubok sa semantic search,
at cleanup sa **Engine tab** ng `/dashboard/memory`. Ang mga kaukulang
route sa ilalim ng `src/app/api/settings/qdrant/` ay nakakonekta na simula v3.8.6:

| Route                                   | Paraan        | Paglalarawan                                 |
| --------------------------------------- | ------------- | -------------------------------------------- |
| `/api/settings/qdrant`                  | `GET` / `PUT` | Basahin / i-update ang mga setting ng Qdrant |
| `/api/settings/qdrant/health`           | `GET`         | Liveness probe + latency                     |
| `/api/settings/qdrant/search`           | `POST`        | Pagsubok sa semantic search                  |
| `/api/settings/qdrant/cleanup`          | `POST`        | Alisin ang mga nag-expire / lumang point     |
| `/api/settings/qdrant/embedding-models` | `GET`         | Ilista ang mga available na embedding model  |

**Mga tala sa gawi (kung ano ang aasahan):**

- **Pagpili ng engine** — kapag pinagana ang Qdrant sa Engine tab, ito ang nagiging pangunahing
  store (itinatakda ang `memoryVectorStore="qdrant"`); kapag hindi pinagana, nire-reset ito sa `"auto"` (#5597).
- **Walang back-fill** — tanging mga memory na ginawa/na-update **pagkatapos** paganahin ang Qdrant ang
  isinusulat dito (fire-and-forget dual-write). Ang mga dati nang SQLite memory ay **hindi**
  mina-migrate; muling binubuo lamang ng "Reindex Now" ang sqlite-vec index, hindi ang Qdrant.
- **Awtomatikong natutukoy ang dimension ng vector** mula sa aktuwal na embedding sa unang paggamit — walang
  dimension field na kailangang punan. Ang pagpapalit ng embedding model pagkatapos umiral ang isang collection
  ay **hindi** awtomatikong pinangangasiwaan: hindi binabago ang umiiral na collection, mabibigo ang mga write/search
  na hindi tumutugma ang dimension at babalik sa sqlite-vec. Gawing muli ang collection
  (bagong pangalan, o tanggalin ito sa Qdrant) upang lumipat ng embedder.
- **Distance metric** — palaging **Cosine** (hardcoded sa paggawa ng collection; hindi
  nako-configure).
- **Auth** — API key lamang (ipinapadala bilang `api-key` header; opsyonal para sa walang-authentication na
  lokal na Docker). Hindi ginagamit ang JWT/RBAC.
- **Mga config field** — inilalantad ng UI ang `host`, `port`, `collection`, `embeddingModel`,
  `apiKey`. Ang `vectorSize` / `hnswEfConstruct` ay para lamang sa env/DB at ang `vectorSize` ay hindi
  ginagamit sa paggawa ng collection (nagmumula ang dimension sa embedding).

### Quantization ng vector (int8 — opt-in, parehong backend)

Sinusuportahan ng parehong vector backend ang **opt-in int8 quantization** upang bawasan ang memory
footprint ng mga naka-store na vector (~4× na mas maliit kaysa Float32) kapalit ng bahagyang pagbaba sa recall.
Bilang default, **naka-off** ito sa pareho — nananatiling full-precision ang mga vector maliban kung tahasang
pinagana.

| Backend    | Setting                         | Uri                            | Default  | Saan binabasa                                               |
| ---------- | ------------------------------- | ------------------------------ | -------- | ----------------------------------------------------------- |
| Qdrant     | `qdrantQuantization` (DB key)   | `"none" \| "int8" \| "binary"` | `"none"` | `src/lib/memory/qdrant.ts::normalizeQdrantConfig()`         |
| sqlite-vec | `MEMORY_VEC_QUANTIZATION` (env) | `"none" \| "int8"`             | `"none"` | `src/lib/memory/vectorStore.ts::requestedVecQuantization()` |

- **Qdrant** ay kino-configure kada instance sa pamamagitan ng `qdrantQuantization` setting
  key (inilalantad bilang `quantization` field sa `PUT /api/settings/qdrant`). Kapag
  `"int8"`, humihiling ang `buildQuantizationConfig()` ng scalar quantization
  (`always_ram`, quantile `0.99`) at pinapagana ng mga search ang `rescore: true` upang
  gamitin ng mga full-precision vector sa pagpino sa int8 candidate set.
- Ang quantization ng **sqlite-vec** ay **para lamang sa environment** (hindi isang DB setting): itakda ang
  `MEMORY_VEC_QUANTIZATION=int8` upang i-store ang mga lokal na vector bilang `int8[dim]`
  column sa pamamagitan ng `vec_quantize_int8(?, 'unit')`. Isinasama ang napiling mode sa
  `embedding_signature` (isang `:int8` suffix), kaya ang paglipat ng mode ay nagpapasimula ng buong
  reindex ng `vec_memories` table — ang parehong lazy-backfill path na ginagamit kapag
  nagbabago ang embedding model.

## Mga Uri ng Memorya

`MemoryType` (`src/lib/memory/types.ts`):

| Uri          | Pinaggagamitan                                                                               |
| ------------ | -------------------------------------------------------------------------------------------- |
| `factual`    | Mga kagustuhan, matatag na katotohanan tungkol sa user, mga pattern ng pag-uugali            |
| `episodic`   | Mga desisyong nauugnay sa isang partikular na sandali ("Pinili ko ang Postgres")             |
| `procedural` | Memorya ng workflow / mga tagubilin (nakalaan; walang awtomatikong extractor sa kasalukuyan) |
| `semantic`   | Nakalaan para sa mga entry ng vector store                                                   |

Ang estratehiya sa retrieval ng `MemoryConfig` ay isa sa `exact`, `semantic`, o `hybrid`,
at ang scope ay isa sa `session`, `apiKey`, o `global`. Ang default na scope mula sa
`getMemorySettings()` ay `apiKey`.

## Pagkuha ng Katotohanan (`extraction.ts`)

Ang extraction ay **nakabatay sa regex**, hindi sa LLM — tumatakbo ito sa loob ng proseso gamit ang
`setImmediate()` kaya hindi nito kailanman bina-block ang response stream:

- **Mga pattern ng kagustuhan** → `MemoryType.FACTUAL`
  (hal. `Mas gusto ko ang …`, `Talagang gusto ko ang …`, `paborito ko ang …`, `ayaw ko sa …`)
- **Mga pattern ng desisyon** → `MemoryType.EPISODIC`
  (hal. `Gagamitin ko ang …`, `Pinili ko ang …`, `Nagpasya ako sa …`, `Gagamitin ko na ang …`)
- **Mga pattern ng gawi** → `MemoryType.FACTUAL`
  (hal. `Karaniwan kong …`, `Palagi akong …`, `Madalas akong …`)

Ang bawat tugma ay nililinis (`trim`, pagsasama-sama ng whitespace, nililimitahan sa 500 character),
inaalisan ng mga duplicate sa loob ng batch sa pamamagitan ng matatag na `factKey(category, content)`, at
iniimbak sa pamamagitan ng `createMemory()` na may metadata na
`{category, extractedAt, source: "llm_response"}`. Nililimitahan ang input text sa
64 KiB (`MAX_EXTRACTION_TEXT_LENGTH`) — kapag mas mahaba, ang **hulihang bahagi** ng text
ang ginagamit upang palaging maisama ang pinakabagong content ng assistant.

Ang `extractFactsFromText(text)` ay ini-export para sa mga test at ibinabalik nito ang mga nakabalangkas
na katotohanan nang hindi iniimbak ang mga ito.

## Retrieval (`retrieval.ts`)

Ang `retrieveMemories(apiKeyId, config)` ang pangunahing entry point. Ginagawa nito ang mga sumusunod:

1. Nino-normalize at vina-validate ang config sa pamamagitan ng `MemoryConfigSchema`.
2. Agad na nagbabalik ng `[]` kapag false ang `enabled` o `maxTokens <= 0`.
3. Nililimitahan ang `maxTokens` sa `[1, 8000]`.
4. Tinutukoy kung umiiral ang modernong table na `memories` (kumpara sa legacy na table na `memory`)
   upang patuloy na gumana ang mga mas lumang database.
5. Binubuo ang base query na may expiry guard
   (`expires_at IS NULL OR datetime(expires_at) > datetime('now')`), opsyonal
   na session scope, at opsyonal na cutoff ng `retentionDays`.
6. Nagsasanga batay sa estratehiya:
   - **`exact`** (default): kronolohikal na `ORDER BY created_at DESC LIMIT 100`.
   - **`semantic`**: kung umiiral ang `config.query` at `memory_fts`, gumagawa ng JOIN sa
     `memory_fts MATCH ?` at nag-aayos ayon sa FTS rank; bumabalik sa kronolohikal
     na pagkakaayos kapag 0 row ang ibinalik ng FTS.
   - **`hybrid`**: union ng mga resulta ng FTS (mas mataas na relevance) at ng
     kronolohikal na set, na inaalisan ng mga duplicate ayon sa id.
7. Kinukuwenta ang keyword relevance score (`getRelevanceScore`) sa
   `content`, `key`, at `metadata` JSON kapag may ibinigay na query. Sinasala
   ang mga row na may score na zero.
8. Inaayos ayon sa score nang pababa, pagkatapos ay ayon sa `createdAt` nang pababa.
9. Sinusuri nang sunod-sunod ang ranked list at tinatanggap ang mga entry habang ang tumatakbong
   `estimateTokens(content)` (≈ `length / 4`) ay nananatiling pasok sa budget. Palaging
   nagbabalik ng kahit isang entry kapag may anumang tumugma.

Ini-export ang `estimateTokens` at ginagamit ito ng retrieval, summarisation, at ng MCP
tool na `omniroute_memory_search`.

## Injection (`injection.ts`)

`injectMemory(request, memories, provider)`:

1. Pinagsasama ang lahat ng nilalaman ng memory sa iisang string na `Memory context: …`.
2. Pumipili ng estratehiya batay sa pangalan ng provider:
   - **System message** (default para sa OpenAI, Anthropic, Gemini, …) — nagdaragdag sa unahan
     ng `{role: "system", content: memoryText}` bago ang anumang umiiral na system
     message upang manatiling mas mataas ang priyoridad ng mga system prompt ng user.
   - **User message** (fallback) — para sa mga provider na nasa
     `PROVIDERS_WITHOUT_SYSTEM_MESSAGE`: `o1`, `o1-mini`, `o1-preview`,
     `glm`, `glmt`, `glm-cn`, `zai`, `qianfan`. Hindi tinatanggap ng mga ito ang system role
     at kung hindi ay magbabalik ng 400 (tingnan ang issue #1701 para sa GLM/Zhipu).
3. Itinatala ang bilang, estratehiya, at modelo sa ilalim ng `memory.injection.injected`.

Ini-export ang `providerSupportsSystemMessage(provider)` para sa mga caller na kailangang
gumawa ng sarili nilang mga desisyon sa pagruruta. Nagde-default sa `true`
(pinapayagan ang system role) ang mga hindi kilalang provider bilang pag-iingat.

## Mga Setting (`settings.ts`)

Ang configuration ng memory ay **nakaimbak sa talahanayan ng mga setting sa DB**, hindi sa mga env var.
Nagbabasa ang `getMemorySettings()` mula sa `getSettings()` at kina-cache ang resulta
sa loob ng proseso; tinatawag ang `invalidateMemorySettingsCache()` ng settings PUT
route pagkatapos ng mga pagsusulat.

### Mga legacy na field (lahat ng bersyon)

| DB key                | Uri     | Default                                              | Kontrol sa UI                                                   |
| --------------------- | ------- | ---------------------------------------------------- | --------------------------------------------------------------- |
| `memoryEnabled`       | boolean | `false` (naka-off bilang default mula noong v3.8.30) | Pag-on/pag-off ng memory                                        |
| `memoryMaxTokens`     | integer | `2000` (saklaw na `0–16000`)                         | Badyet ng token para sa injection                               |
| `memoryRetentionDays` | integer | `30` (saklaw na `1–365`)                             | Palugit ng retention                                            |
| `memoryStrategy`      | enum    | `"hybrid"` (isa sa `recent`, `semantic`, `hybrid`)   | Estratehiya sa retrieval                                        |
| `skillsEnabled`       | boolean | `false`                                              | Nagto-toggle ng per-key skill injection (tingnan ang SKILLS.md) |

Tandaan: ang estratehiya sa UI na `"recent"` ay itinutugma sa panloob na `"exact"` na
estratehiya sa retrieval sa pamamagitan ng `toMemoryRetrievalConfig()` (kronolohikal na pagkakasunod-sunod).

### Mga bagong field (v3.8.6, plan 21 D9)

Tingnan din ang seksyong "Extension ng mga setting" sa itaas para sa mga paglalarawan ng field.

| DB key                      | API field                | Default  |
| --------------------------- | ------------------------ | -------- |
| `memoryEmbeddingSource`     | `embeddingSource`        | `"auto"` |
| `memoryEmbeddingModel`      | `embeddingProviderModel` | `null`   |
| `memoryTransformersEnabled` | `transformersEnabled`    | `false`  |
| `memoryStaticEnabled`       | `staticEnabled`          | `false`  |
| `memoryRerankEnabled`       | `rerankEnabled`          | `false`  |
| `memoryRerankModel`         | `rerankProviderModel`    | `null`   |
| `memoryVectorStore`         | `vectorStore`            | `"auto"` |

Ang mga DB key na nauugnay sa Qdrant (`qdrantEnabled`, `qdrantHost`, `qdrantPort`,
`qdrantApiKey`, `qdrantCollection` na may default na `"omniroute_memory"`,
`qdrantEmbeddingModel` na may default na `"openai/text-embedding-3-small"`) ay binabasa ng
`normalizeQdrantConfig()` sa `qdrant.ts`.

### Mga environment variable (v3.8.6)

Inaayos ng anim na opsyonal na env var ang runtime behavior ng engine (nakadokumento sa `.env.example`):

| Variable                        | Default                    | Paglalarawan                                                                                                                                                        |
| ------------------------------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `MEMORY_EMBEDDING_CACHE_TTL_MS` | `300000`                   | TTL ng embedding cache (5 min)                                                                                                                                      |
| `MEMORY_EMBEDDING_CACHE_MAX`    | `1000`                     | Pinakamaraming entry sa embedding LRU cache                                                                                                                         |
| `MEMORY_TRANSFORMERS_MODEL`     | `Xenova/all-MiniLM-L6-v2`  | HF repo para sa modelo ng Transformers.js                                                                                                                           |
| `MEMORY_STATIC_MODEL`           | `minishlab/potion-base-8M` | HF repo para sa static potion model                                                                                                                                 |
| `MEMORY_STATIC_CACHE_DIR`       | `<DATA_DIR>/embeddings`    | Lokasyon kung saan iimbak ang mga na-download na modelo                                                                                                             |
| `MEMORY_VEC_TOP_K`              | `20`                       | Default na top-K para sa vector search                                                                                                                              |
| `MEMORY_RRF_K`                  | `60`                       | RRF k constant para sa hybrid search                                                                                                                                |
| `MEMORY_VEC_QUANTIZATION`       | `none`                     | Itakda sa `int8` upang iimbak ang mga local sqlite-vec vector nang quantized (~4× na mas maliit; opt-in). Kapag binago ang mode, mapipilitang magsagawa ng reindex. |

## Pagbubuod (`summarization.ts`)

Pinaiikli ng `summarizeMemories(apiKeyId, sessionId?, maxTokens = 4000)` ang mas lumang
nilalaman kapag lumampas sa badyet ang kasalukuyang kabuuang bilang ng token sa mga memorya
ng isang key. Iniisa-isa nito ang mga row nang DESC ayon sa `created_at`, pinapanatili ang mga
row na kasya, at para sa natitira ay pinapalitan ang `content` sa mismong puwesto nito gamit ang
unang tatlong pangungusap ng orihinal. Ang `tokensSaved` ay ang pagkakaiba sa `estimateTokens`
sa pagitan ng luma at bagong nilalaman.

Ang routine na ito ay **magagamit ngunit hindi awtomatikong tinatawag** sa kasalukuyang
chat pipeline — tawagin ito mula sa isang cron, admin action, o
`MemoryConfig.autoSummarize` glue kung kailangan mo ng tuloy-tuloy na pagpapaikli. Isahang
direksiyon ang pagkawala ng data: nao-overwrite ang orihinal na teksto.

## REST API

Nangangailangan ang lahat ng endpoint ng management auth (`requireManagementAuth`).

### Mga pangunahing endpoint ng memorya (umiiral + na-update)

| Paraan   | Path                 | Paglalarawan                                                                                                                                                                                               |
| -------- | -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `GET`    | `/api/memory`        | Naka-pagination na listahan na may mga filter: `apiKeyId`, `type`, `sessionId`, `q`, `limit`, `page`, `offset`. Kasama sa tugon ang `stats.total`, `stats.tokensUsed`, `stats.hitRate`, `cacheStats`       |
| `POST`   | `/api/memory`        | Gumawa ng entry (na-validate ng Zod: `content`, `key`, opsyonal na `type`, `sessionId`, `apiKeyId`, `metadata`, `expiresAt`). Tinatawag ang `createMemory()` na nagsasagawa ng upsert sa `(apiKeyId, key)` |
| `GET`    | `/api/memory/[id]`   | Kunin ang isang entry ayon sa UUID                                                                                                                                                                         |
| `PUT`    | `/api/memory/[id]`   | I-update ang mga field ng entry (`type`, `key`, `content`, `metadata`). Body: `MemoryUpdatePutSchema`. Sini-sync din ang vector kung available ang embedding source.                                       |
| `DELETE` | `/api/memory/[id]`   | Mag-delete ng entry; nagde-delete rin mula sa `vec_memories` (D15) at sa Qdrant sa abot ng makakaya. Nagbabalik ng 404 kapag wala ang entry.                                                               |
| `GET`    | `/api/memory/health` | Pinapatakbo ang `verifyExtractionPipeline("health-check")` — round-trip na gumawa→maglista→mag-delete. Nagbabalik ng `{working, latencyMs, error?}`                                                        |

### Mga bagong endpoint ng memory engine (plano 21)

| Paraan | Path                              | Paglalarawan                                                                                                                                                                           |
| ------ | --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `POST` | `/api/memory/retrieve-preview`    | Dry-run ng `retrieveMemories` — nagbabalik ng mga naka-rank na resulta na may score, tier, at mga token. Body: `RetrievePreviewSchema`. HINDI nag-i-inject o nagbabago ng mga memorya. |
| `GET`  | `/api/memory/embedding-providers` | Inililista ang mga provider na may mga embedding model, at ipinapahiwatig kung alin ang may naka-configure na API key.                                                                 |
| `GET`  | `/api/memory/engine-status`       | Nagbabalik ng buong status ng engine: keyword tier, embedding resolution, mga estadistika ng vector store, kalagayan ng Qdrant, at rerank config. Hugis: `MemoryEngineStatusSchema`.   |
| `POST` | `/api/memory/summarize`           | Manu-manong simulan ang pagpapaikli ng memorya. Body: `MemorySummarizeSchema` (`olderThanDays`, `apiKeyId?`, `dryRun`). Nagbabalik ng `{candidates, tokensSaved}`.                     |
| `POST` | `/api/memory/reindex`             | Simulan ang vector reindex para sa mga memoryang may `needs_reindex=1`. Body: `MemoryReindexSchema` (`force`). Nagbabalik ng `{started, pending}`.                                     |

### Mga endpoint ng setting

| Paraan | Path                                    | Paglalarawan                                                                                                                |
| ------ | --------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `GET`  | `/api/settings/memory`                  | Kasalukuyang na-normalize na `MemorySettingsExtended` (7 bagong field + legacy)                                             |
| `PUT`  | `/api/settings/memory`                  | I-update ang anumang field mula sa `MemorySettingsExtendedSchema` (12 field sa kabuuan)                                     |
| `GET`  | `/api/settings/qdrant`                  | Kasalukuyang mga setting ng Qdrant (`QdrantSettingsSchema`)                                                                 |
| `PUT`  | `/api/settings/qdrant`                  | I-update ang mga setting ng Qdrant. Body: `QdrantSettingsUpdateSchema`. `apiKey` = inaalis ng walang-lamang string ang key. |
| `GET`  | `/api/settings/qdrant/health`           | Liveness probe laban sa naka-configure na Qdrant instance. Nagbabalik ng `QdrantHealthResultSchema`.                        |
| `POST` | `/api/settings/qdrant/search`           | Pagsubok ng semantic search laban sa Qdrant. Body: `QdrantSearchSchema` (`query`, `topK`).                                  |
| `POST` | `/api/settings/qdrant/cleanup`          | Alisin ang mga Qdrant point para sa mga nag-expire / lumang memorya.                                                        |
| `GET`  | `/api/settings/qdrant/embedding-models` | Ilista ang mga embedding model na available para sa Qdrant.                                                                 |

Sinusuportahan ng list query ng `/api/memory` ang alinman sa pagination na nakabatay sa `page`
(`parsePaginationParams`) **o** raw na `offset` — kapag naroroon ang `offset`, ito
ang inuuna at kinukuwenta ang isang hinangong `page` para sa hugis ng tugon.

## Mga MCP Tool (`open-sse/mcp-server/tools/memoryTools.ts`)

Kapag naka-enable ang MCP server, tatlong memory tool ang nirerehistro:

- `omniroute_memory_search` — `{apiKeyId, query?, type?, maxTokens?, limit?}`
  → binabalot ang `retrieveMemories()`. Simula sa v3.8.6 (D16), binabasa ang
  `strategy` mula sa `getMemorySettings()` sa halip na i-hardcode bilang
  `"exact"`. Kung ibinigay ang `query` at ang `strategy` ay `semantic` o
  `hybrid`, ginagamit ang vector store kapag available.
- `omniroute_memory_add` — `{apiKeyId, sessionId?, type, key, content,
metadata?}` → binabalot ang `createMemory()`. Tanging ang 4 na canonical type
  ang tinatanggap: `factual`, `episodic`, `procedural`, `semantic` (D17).
- `omniroute_memory_clear` — `{apiKeyId, type?, olderThan?}` → inililista ang
  mga tumutugmang entry, opsyonal na nagfi-filter ayon sa timestamp bago ang
  petsa ng paggawa, pagkatapos ay isa-isang dine-delete sa pamamagitan ng
  `deleteMemory()` (na nag-aalis din ng mga vector mula sa sqlite-vec + Qdrant).

Tingnan ang [MCP-SERVER.md](./MCP-SERVER.md) para sa mga detalye ng transport at saklaw.

## Dashboard (Memory Studio)

Ang `src/app/(dashboard)/dashboard/memory/page.tsx` ay isa na ngayong **Studio na may 3 tab**:

### Tab: Mga Memory

- Concept card (nako-collapse na paliwanag na "Paano ito gumagana").
- Real-time na listahan, paghahanap, at pagination (may 300 ms na debounce).
- Filter ayon sa type (`factual` / `episodic` / `procedural` / `semantic` / lahat).
- Modal para sa pagdagdag ng memory (key, content, type).
- Inline na pag-edit (pencil button → `PUT /api/memory/[id]`).
- Pag-delete sa bawat row (may dialog ng kumpirmasyon).
- JSON export ng kasalukuyang page; JSON import sa pamamagitan ng file picker.
- Mga stat card: `totalEntries`, `tokensUsed`, `hitRate`.
- Button na "I-compact ang mga luma" → `POST /api/memory/summarize` (ipinapakita
  muna ng dry-run ang bilang ng mga kandidato, pagkatapos ay humihingi ng kumpirmasyon).
- Isang berde/pulang health dot na pinapagana ng `GET /api/memory/health`.

### Tab: Playground

- Input para sa query + selector ng strategy (Eksakto / Semantiko / Hybrid) + token budget.
- "I-simulate" → `POST /api/memory/retrieve-preview` — nagpapakita ng mga
  resultang naka-rank kasama ang `score`, `tier`, `tokens`, `vecScore`, `ftsScore`.
- Resolution panel na nagpapakita kung aling embedding source / vector store
  ang ginamit at kung nagkaroon ng fallback.

### Tab: Engine

- Panel ng status ng engine (keyword FTS5 chip, embedding chip, vector store chip,
  Qdrant health chip, rerank chip).
- Button na "Mag-reindex Ngayon" → `POST /api/memory/reindex`.
- Selector ng embedding source (auto / remote / static / transformers + mga toggle).
- Qdrant config card (toggle para i-enable, host/port/collection/key, pagsubok sa
  koneksyon, pagsubok sa semantic search, cleanup).
- Rerank config card (toggle para i-enable, selector ng provider/model).

Makikita rin ang mga setting ng Memory at Qdrant sa
`/dashboard/settings → Memory & Skills` (`MemorySkillsTab.tsx`) para sa
legacy/global na interface ng mga setting.

## Pag-cache

Nagpapanatili ang `src/lib/memory/store.ts` ng in-process na LRU-ish cache
(`MEMORY_CACHE_TTL = 1 min`, `MEMORY_MAX_CACHE_SIZE = 500`, na may 20 %
na eviction ng pinakamatatanda) para sa mga pagbasa ng `getMemory(id)`, kasama
ang isang generic na key/value na `memoryCache` layer (`src/lib/memory/cache.ts`)
na may mga method na `get`/`set`/`invalidate` na ginagamit ng mga caller na
nais ng sarili nilang scoped cache (1 000-entry LRU, default na TTL na 5 min).

## Privacy at Lifecycle

- Ang pagmamay-ari ng memory ay nakabatay sa API key id (`resolveMemoryOwnerId` sa
  `chatCore.ts`). Kung walang `apiKeyInfo.id`, hindi isinasagawa ang retrieval,
  injection, o extraction.
- Ang mga entry na may `expires_at` sa hinaharap ay hindi isinasama sa retrieval;
  ang mga lumang entry na lampas sa `retentionDays` ay hindi isinasama ng
  `created_at >= cutoff` clause sa `retrieveMemories`.
- Para sa permanenteng pagbura, gamitin ang `DELETE /api/memory/[id]` o `omniroute_memory_clear`.
- Isinasagawa ang extraction bilang fire-and-forget sa pamamagitan ng `setImmediate`;
  itinatala ang mga pagkabigo sa ilalim ng `memory.extraction.background.failed`
  at hindi kailanman ipinapakita sa tumatawag.
- Nililinis ng mga verification round-trip (`verifyExtractionPipeline`) ang sarili
  nilang mga test entry sa isang `finally` block.

## Tingnan Din

- [SKILLS.md](./SKILLS.md) — ini-inject ng setting na `skillsEnabled` ang mga
  kahulugan ng tool kasama ng memory.
- [MCP-SERVER.md](./MCP-SERVER.md) — MCP transport / mga scope.
- [API_REFERENCE.md](../reference/API_REFERENCE.md) — mas malawak na saklaw ng API.
- Mga source module:
  - `src/lib/memory/types.ts`, `schemas.ts`
  - `src/lib/memory/store.ts`, `retrieval.ts`, `injection.ts`, `reindex.ts`
  - `src/lib/memory/extraction.ts`, `summarization.ts`, `verify.ts`
  - `src/lib/memory/settings.ts`, `qdrant.ts`, `cache.ts`
  - `src/lib/memory/vectorStore.ts` — sqlite-vec + hybrid RRF
  - `src/lib/memory/embedding/index.ts` — multi-source embedding layer
  - `src/lib/memory/embedding/types.ts`, `remote.ts`, `staticPotion.ts`,
    `transformersLocal.ts`, `cache.ts`
  - `src/shared/schemas/memory.ts` — mga Zod schema para sa lahat ng body ng memory API
  - `src/shared/schemas/qdrant.ts` — mga Zod schema para sa mga setting/operasyon ng Qdrant
  - `src/lib/db/memoryVec.ts` — CRUD para sa `memory_vec_meta`
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
  - `src/app/api/settings/qdrant/route.ts` + mga sub-route
  - `src/app/(dashboard)/dashboard/memory/` — Studio UI (page + mga component +
    mga tab + mga hook)
  - `open-sse/handlers/chatCore.ts` (wiring ng injection / extraction)
  - `open-sse/mcp-server/tools/memoryTools.ts`

---

## Pagpili ng Embedding Provider (v3.8.16+)

Sinusuportahan ng memory engine ng OmniRoute ang **apat na embedding source** (`src/lib/memory/embedding/`). Magkakaiba ang bawat isa pagdating sa **latency, gastos, kalidad ng model, at pagiging kumplikado ng setup**.

### Ang mga Embedding Source

| Provider       | Source                                                       | Latency                          | Gastos              | Kalidad                     | Setup                                      |
| -------------- | ------------------------------------------------------------ | -------------------------------- | ------------------- | --------------------------- | ------------------------------------------ |
| `transformers` | Lokal na ONNX model (Xenova/all-MiniLM-L6-v2)                | ~50-150ms (CPU)                  | Libre               | Maganda                     | `npm install` lamang                       |
| `static`       | Mga paunang kinompyut na vector (naka-cache)                 | <1ms                             | Libre               | N/A (depende sa cache hit)  | Wala                                       |
| `remote`       | OpenAI / Cohere / Voyage API                                 | ~100-300ms                       | $0.02-0.10/1M token | Napakahusay                 | API key                                    |
| `auto`         | Pinipili ang pinakamahusay na available na source sa runtime | Kapareho ng napiling source      | Libre               | Kapareho ng napiling source | Wala                                       |
| _(cache)_      | In-memory na LRU layer sa ibabaw ng anumang source           | <1ms (hit), buong latency (miss) | Libre               | Kapareho ng pinagbabatayan  | Palaging naka-on (hindi mapipiling source) |

### Decision Tree

```
                  Ano ang konteksto ng iyong deployment?
                  │
      ┌───────────┼───────────┬──────────────┐
      │           │           │              │
  DEV/TEST    MALIIT NA PROD MALAKING PROD EDGE / OFFLINE
      │           │           │              │
      ▼           ▼           ▼              ▼
  transformers transformers remote (Qdrant) transformers
  (libre, walang API)        (pinakamahusay   (walang internet)
                              na kalidad)
      │           │           │              │
      └────────┬──┴───────────┴──────────────┘
               │
               ▼
            PALAGING idagdag ang `cache` layer sa ibabaw
            (Binabalot ng LruCache ang anumang provider)
```

### Configuration ng Database at API

Kino-configure ang mga opsyon sa memory embedding sa pamamagitan ng Settings API/UI, hindi ng mga environment variable. Ang mga nauugnay na settings database key sa ilalim ng Settings (`normalizeMemorySettings` sa `src/lib/memory/settings.ts`) ay:

- `memoryEmbeddingSource`: `"transformers"` (lokal), `"remote"` (nakabatay sa API, hal. OpenAI), `"static"` (external store), o `"auto"`
- `memoryEmbeddingProviderModel`: Identifier ng model para sa mga remote/static source (hal., `"text-embedding-3-small"`)
- `memoryTransformersEnabled`: `true` | `false`
- `memoryStaticEnabled`: `true` | `false`
- `memoryVectorStore`: `"sqlite-vec"`, `"qdrant"`, o `"auto"`

#### Lokal na Model (`transformers`)

Gumagamit ng transformers.js sa loob upang magpatakbo ng mga lokal na model:

```bash
# Mga env var na binabasa sa code (src/lib/memory/embedding/index.ts):
MEMORY_TRANSFORMERS_MODEL=Xenova/all-MiniLM-L6-v2  # HF model repo
MEMORY_STATIC_MODEL=minishlab/potion-base-8M       # HF static potion model
MEMORY_STATIC_CACHE_DIR=<DATA_DIR>/embeddings      # Direktoryo ng cache
```

#### LRU Embedding Cache

Palaging naka-on ang cache bilang default at kino-configure sa pamamagitan ng mga env var:

```bash
MEMORY_EMBEDDING_CACHE_MAX=1000                    # Maximum na bilang ng mga naka-cache na item
MEMORY_EMBEDDING_CACHE_TTL_MS=300000               # TTL (5 min)
```

### Mga Sukatan ng Performance

Benchmark sa karaniwang 4-core x86 server (mga tekstong ~100 token bawat isa):

| Tagapagbigay         | p50   | p95   | p99   | Gastos / 1M embedding              |
| -------------------- | ----- | ----- | ----- | ---------------------------------- |
| `transformers` (CPU) | 80ms  | 180ms | 350ms | Libre                              |
| `remote` (OpenAI)    | 120ms | 220ms | 400ms | ~$0.02 (ada-002) / $0.13 (3-large) |
| `static` (Qdrant)    | 15ms  | 30ms  | 60ms  | Depende sa pagho-host ng Qdrant    |
| `cache` (hit)        | <1ms  | <1ms  | 2ms   | Libre                              |

---

## Mga Pattern sa Pagkuha ng Fact (v3.8.16+)

Gumagamit ang module na `extraction.ts` (`src/lib/memory/extraction.ts`) ng **pagtutugma ng regex pattern** upang kumuha ng mga naka-structure na fact mula sa mga mensahe ng pag-uusap. Ang pag-unawa sa mga pattern na ito ay makatutulong sa iyong isaayos ang kalidad ng pagkuha para sa iyong use case.

### Mga Default na Kategorya ng Pattern

| Kategorya           | Halimbawang pattern                                         | Kinukuha                           |
| ------------------- | ----------------------------------------------------------- | ---------------------------------- |
| PREFERENCE_PATTERNS | `"I prefer <X>"`, `"I like <X>"`, `"I hate <X>"`            | Mga kagustuhan ng user             |
| DECISION_PATTERNS   | `"I'll use <X>"`, `"I decided to <X>"`, `"I went with <X>"` | Mga desisyon ng user (episodic)    |
| PATTERN_PATTERNS    | `"I usually <X>"`, `"I always <X>"`, `"I never <X>"`        | Mga tuloy-tuloy na pattern ng gawi |

### Mga Halimbawang Pattern (Pinasimple)

```ts
// Mula sa src/lib/memory/extraction.ts
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

### Kung Ano ang Kinukuha

Kapag sinabi ng isang user:

> "I prefer TypeScript. I'll use Postgres for this project. I always commit before pushing. I don't like Python."
> Lumilikha ang pagkuha ng 4 na memory:
>
> | Key                                  | Kategorya  | Uri      | Nilalaman                   |
> | ------------------------------------ | ---------- | -------- | --------------------------- |
> | `preference:typescript`              | preference | factual  | "TypeScript"                |
> | `decision:postgres_for_this_project` | decision   | episodic | "Postgres for this project" |
> | `pattern:commit_before_pushing`      | pattern    | factual  | "commit before pushing"     |
> | `preference:python`                  | preference | factual  | "Python"                    |

### Mga Limitasyon sa Pagkuha

Upang maiwasan ang walang-kontrol na pagkuha, inilalapat ang mga sumusunod na limitasyon:

| Pinakamababang haba ng nilalaman | 3 character |
| Pinakamataas na haba ng nilalaman | 500 character |

### Kailan Dapat I-disable ang Pagkuha

Awtomatikong tumatakbo ang pagkuha tuwing naka-enable ang memory; walang hiwalay na
toggle na para lamang sa pagkuha. Upang i-off ito, i-disable nang buo ang memory (`enabled: false`
sa pamamagitan ng `PUT /api/settings/memory`). Isaalang-alang itong gawin kapag:

- Mataas ang dami ng iyong mga mensahe at hindi bale-wala ang gastos sa pagkuha
- Karamihan sa iyong mga pag-uusap ay pansamantala lamang (chat, debugging) at walang pangmatagalang halaga
- Kinukuha mo na ang context sa pamamagitan ng mga custom plugin

---

## Pag-tune ng Hybrid RRF (v3.8.16+)

Pinagsasama ng algorithm na **Reciprocal Rank Fusion (RRF)** ang mga resulta ng FTS5 (keyword) at vector (semantic). Kinokontrol ng parameter na `k` kung gaano kalaking weight ang ibinibigay sa mga resultang mas mababa ang ranggo.

### Ang Formula

Para sa bawat kandidatong memory, ang RRF score ay:

```
RRF(d) = Σ  1 / (k + rank_i(d))
```

Kung saan:

- Ang `k` ang constant (default na 60)
- Ang `rank_i(d)` ang ranggo ng dokumentong `d` sa i-th na retrieval system (FTS, vector)
- Isinasagawa ang pagdaragdag sa lahat ng retrieval system

### Paano Naaapektuhan ng `k` ang mga Resulta

| Value ng `k`         | Epekto                                                                                                                     | Pinakamainam para sa                       |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| `k=0`                | Purong rank fusion (walang smoothing)                                                                                      | Theoretical baseline                       |
| `k=10-30`            | Nagbibigay ng malaking weight sa mga nangungunang resulta; halos walang ambag ang mababang ranggo                          | Kapag karaniwang tama ang top-3 na resulta |
| **`k=60`** (default) | Balansyado — may makabuluhang ambag ang lahat ng top-10 na resulta                                                         | General-purpose na retrieval               |
| `k=100+`             | Mas patag — kahit ang mga resultang mababa ang ranggo ay maaaring mangibabaw kung lumilitaw ang mga ito sa maraming system | Kapag kritikal ang recall > precision      |

### Pag-tune ng `k` sa Praktikal na Paggamit

```bash
# Default
MEMORY_RRF_K=60

# Agresibong precision (maliit na memory, kaunting doc)
MEMORY_RRF_K=20

# Pinakamataas na recall (malaking memory, iba't ibang query)
MEMORY_RRF_K=120
```

**Halimbawa gamit ang `k=20`:**

- FTS rank 1 → ambag na `1/21 = 0.048`
- FTS rank 10 → ambag na `1/30 = 0.033`
- Vector rank 1 → ambag na `0.048`
- Pinakamataas na pinagsamang value: `0.096`

**Halimbawa gamit ang `k=60`:**

- FTS rank 1 → ambag na `1/61 = 0.016`
- FTS rank 10 → ambag na `1/70 = 0.014`
- Vector rank 1 → ambag na `0.016`
- Pinakamataas na pinagsamang value: `0.033`

Kapag mas mataas ang `k`, mas maliit ang **relative difference** sa pagitan ng top-1 at rank-10, kaya mas umaasa ang algorithm sa **consensus sa lahat ng retrieval system** kaysa sa kumpiyansa ng nangungunang ranggo.

### Kailan Dapat Baguhin ang `k`

| Sintomas                                                    | Subukan                                                                               |
| ----------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| Palaging nananalo ang nangungunang resulta, ngunit mali ito | **Babaan** ang k (hal., 20) — mas mahalaga ang kumpiyansa ng nangungunang ranggo      |
| Nasa top-5 ang tamang sagot ngunit wala sa top-1            | **Taasan** ang k (hal., 100) — ginagantimpalaan ng mas patag na scoring ang consensus |
| Mataas ang recall ngunit mababa ang precision               | **Babaan** ang k — gawing mas tiyak ang ranking                                       |
| Mababa ang recall (may mga nawawalang nauugnay na doc)      | **Taasan** ang k — bigyan ng pagkakataon ang mga doc na mas mababa ang ranggo         |

### RRF Weighting

Gumagamit ang reciprocal rank fusion ng magkakapantay na weight para sa semantic vector rank at full-text search rank:

```
RRF(d) = 1/(k + rank_vector) + 1/(k + rank_fts)
```

Walang mga environment variable para isaayos ang mga indibidwal na weight (hindi umiiral ang `MEMORY_RRF_VECTOR_WEIGHT`/`MEMORY_RRF_FTS_WEIGHT`).

---

## Estratehiya sa Pagbubuod (v3.8.16+)

Kino-compress ng module na `summarization.ts` (`src/lib/memory/summarization.ts`) ang mga mas lumang memory upang mapanatiling maliit ang aktibong set habang pinananatili ang kakayahang maalala ang mga ito.

### Kailan Nati-trigger ang Pagbubuod

| Trigger                    | Threshold (default) |
| -------------------------- | ------------------- |
| Manu-manong trigger sa API | hindi naaangkop     |

### Ano ang Binubuod

Dalawang entry point ang ini-export mula sa `summarization.ts`:

- **`summarizeMemories(apiKeyId, sessionId?, maxTokens = 4000)`** — pinaiikli ang
  mga memory para sa isang session upang maging iisang teksto ng buod na pasok sa limitasyon ng token.
- **`summarizeMemoriesOlderThan(apiKeyId, days, dryRun)`** — ang compaction batay sa
  edad na ginagamit ng API: pinipili nito ang bawat memory na mas matanda sa `days`, bumubuo
  ng isang pinaikling summary memory mula sa mga ito, at (kapag `false` ang `dryRun`) binubura
  ang mga orihinal. Ipasa ang `dryRun: true` upang i-preview ang candidate set at kabuuang bilang
  ng token nang walang binabago.

Walang pass para sa pag-cluster ayon sa tag/key o pag-score sa bawat memory bilang "core vs summarizable" —
nakabatay lamang ang pagpili sa cutoff ng edad, at ang teksto ng buod ay isang pinaikli at
may prefix na uri na linya para sa bawat kandidato.

### Pag-trigger sa Pagbubuod

Ang pagbubuod ay **manu-mano / opt-in** — `false` ang setting na `autoSummarize` bilang
default, kaya walang awtomatikong kino-compact. I-trigger ito sa pamamagitan ng API:

```bash
curl -X POST http://localhost:20128/api/memory/summarize \
  -H "Authorization: Bearer $OMNIROUTE_KEY"
```

Upang panatilihin itong naka-off, panatilihin lamang ang `autoSummarize` sa default nitong (`false`).

### Mga Tip para sa Kalidad ng Pagbubuod

- **Mag-preview muna gamit ang `dryRun`** — ibinabalik ng `summarizeMemoriesOlderThan(..., true)` ang
  listahan ng mga kandidato at kabuuang bilang ng token upang makumpirma mo kung ano ang pagsasamahin
  bago burahin ang mga orihinal.
- **Patakbuhin ang pagbubuod sa mga oras na mababa ang traffic** kung mayroon kang malaking corpus ng memory — ang LLM call ang mabagal na bahagi

```bash
# Cron-style: magbuod araw-araw nang 3am
0 3 * * * curl -X POST http://localhost:20128/api/memory/summarize \
  -H "Authorization: Bearer $OMNIROUTE_KEY"
```

---

## Pattern ng MemoryBackend Provider

> **Pinagmumulan ng katotohanan:** `src/lib/memory/backend.ts`, `src/lib/memory/genericBackend.ts`, `src/lib/memory/manager.ts`
> **Mga test:** `src/lib/memory/__tests__/generic-backend.test.ts`

Ipinakikilala ng pattern ng MemoryBackend provider ang isang **napapalitang backend abstraction layer** sa ibabaw ng umiiral na memory engine. Sa halip na matali sa iisang storage implementation, sinusuportahan na ngayon ng memory system ang maraming backend (SQLite, Obsidian, Notion, mga custom na HTTP backend) na may nako-configure na primary/fallback routing.

### Arkitektura

```
┌──────────────────────────────────────────────────────────┐
│                    Mga API Route                          │
│            (src/app/api/memory/route.ts)                  │
└──────────────────────┬───────────────────────────────────┘
                       │
┌──────────────────────▼───────────────────────────────────┐
│                   MemoryManager                           │
│         Singleton na orchestrator (manager.ts)            │
│                                                          │
│  Primary ──► Backend A  (hal. SQLite)                    │
│  Fallback ─► Backend B  (hal. Obsidian)                  │
│             Backend C  (hal. Notion sa GenericBackend)    │
└──────────────────────┬───────────────────────────────────┘
                       │
        ┌──────────────┼──────────────┐
        ▼              ▼              ▼
┌────────────┐ ┌────────────┐ ┌──────────────────┐
│ SQLite     │ │ Obsidian   │ │ GenericMemory    │
│ Backend    │ │ Backend    │ │ Backend (HTTP)   │
└────────────┘ └────────────┘ └──────────────────┘
```

#### Pangunahing Interface (`backend.ts`)

Dapat ipatupad ng bawat backend ang interface na `MemoryBackend`:

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

  // Paghahanap
  search(config: SearchConfig): Promise<Memory[]>;

  // Kalagayan
  health(): Promise<HealthCheckResult>;

  // Lifecycle (opsyonal)
  initialize?(): Promise<void>;
  shutdown?(): Promise<void>;
}
```

#### MemoryManager (`manager.ts`)

Singleton na orchestrator na:

- **Nagrerehistro** ng mga backend sa pamamagitan ng `register(backend)` — tinatawag sa boot mula sa `index.ts`
- **Nagse-set up** ng primary + fallback sa pamamagitan ng `configure(primary, fallbacks)`
- **Nagre-route** ng CRUD/paghahanap sa primary, na may fallback chain kapag nabigo
- **Nagsasagawa ng health check** sa lahat ng backend nang pana-panahon

**Gawi ng fallback:**

| Operasyon | Primary                     | Mga fallback                   |
| --------- | --------------------------- | ------------------------------ |
| `create`  | ✅ Primary lamang           | ❌                             |
| `get`     | ✅ Subukan muna ang primary | ✅ Fallback kung null          |
| `update`  | ✅ Primary lamang           | ✅ Fire-and-forget na pag-sync |
| `delete`  | ✅ Primary lamang           | ✅ Fire-and-forget na pag-sync |
| `list`    | ✅ Primary lamang           | ❌                             |
| `search`  | ✅ Primary muna             | ✅ Fallback kapag may error    |

#### GenericMemoryBackend (`genericBackend.ts`)

Isang generic na HTTP connector na nag-aangkop ng anumang REST API bilang isang MemoryBackend. Kapaki-pakinabang para sa:

- **Notion** — kumonekta sa pamamagitan ng Notion API
- **Obsidian** — kumonekta sa pamamagitan ng Obsidian Local REST API
- **Mga custom na backend** — anumang service na naglalantad ng RESTful memory API

**Configuration:**

```typescript
interface GenericBackendConfig {
  baseUrl: string;           // Base URL ng backend API
  apiKey?: string;           // Bearer token para sa auth
  headers?: Record<string, string>;  // Mga custom na HTTP header
  timeout?: number;          // Timeout ng request (default: 30000ms)
  backendType?: string;      // Para sa pag-log

  // Mga override ng endpoint (gumagamit ang mga default ng mga kumbensyon ng REST)
  endpoints?: {
    search?: string;   // default: "/memories/search"
    create?: string;   // default: "/memories"
    list?: string;     // default: "/memories"
    get?: string;      // default: "/memories/{id}"
    update?: string;   // default: "/memories/{id}"
    delete?: string;   // default: "/memories/{id}"
    health?: string;   // default: "/health"
  };

  // Mga mapping ng pangalan ng query parameter
  queryParams?: {
    query?/apiKeyId?/limit?/offset?/strategy?/maxTokens?/type?/sessionId?/orderBy?/orderDir?/options?
  };

  // Mga mapping ng pangalan ng path parameter
  pathParams?: {
    id?/memoryId?
  };
}
```

Ang mga **kilalang backend** ay naka-preconfigure sa `KNOWN_BACKENDS`:

```typescript
createKnownBackend("obsidian"); // → GenericMemoryBackend na nakaturo sa localhost:27123
createKnownBackend("notion"); // → GenericMemoryBackend na nakaturo sa api.notion.com/v1
```

#### Mga Built-in na Backend

##### SQLiteBackend (`sqliteBackend.ts`)

Ang default na pangunahing backend. Binalot nito ang umiiral na SQLite-based na memory store gamit ang `src/lib/memory/store.ts`. Awtomatikong nirerehistro sa pag-boot.

```typescript
import { sqliteBackend } from "./sqliteBackend";
memoryManager.register(sqliteBackend);
```

##### ObsidianBackend (`obsidianBackend.ts`)

Binalot nito ang umiiral na integrasyon ng Obsidian (`src/lib/memory/obsidianBackend.ts`). Kumokonekta ito sa isang Obsidian vault sa pamamagitan ng Obsidian Local REST API.

### Mga Setting

Ang mga setting ng memory backend ay nakaimbak sa app settings table at pinamamahalaan sa pamamagitan ng `src/lib/memory/settings.ts`:

| Setting                 | Env/Config Key           | Default    | Paglalarawan                                 |
| ----------------------- | ------------------------ | ---------- | -------------------------------------------- |
| Pangunahing backend     | `memoryPrimaryBackend`   | `"sqlite"` | ID ng pangunahing backend                    |
| Mga fallback na backend | `memoryFallbackBackends` | `[]`       | Mga nakaayos na ID ng fallback backend       |
| Mga config ng backend   | `memoryBackendConfigs`   | `{}`       | Mga override ng config para sa bawat backend |

Nino-normalize ang mga setting sa pamamagitan ng `normalizeMemorySettings()` at kino-cache sa `getMemorySettings()`.

### Daloy ng Initialization

```
Pag-bootstrap ng app
  → Mga import ng index.ts (side-effect): nirerehistro ang SQLiteBackend
  → Tinatawag ang initMemoryBackends() mula sa lifecycle ng app:
      1. I-load ang mga setting (getMemorySettings)
      2. I-configure ang pangunahing backend + fallback
      3. I-initialize ang lahat ng backend (health check)
      4. Handa na para sa mga request
```

### Pagdaragdag ng Bagong Backend

1. **Ipatupad ang interface na `MemoryBackend`** sa `src/lib/memory/<name>Backend.ts`
2. **I-export** mula sa `src/lib/memory/index.ts`
3. **Irehistro** gamit ang `memoryManager.register(yourBackend)` sa pag-boot
4. **I-configure** sa pamamagitan ng mga setting: itakda ang `memoryPrimaryBackend` sa ID ng iyong backend
5. **I-test** gamit ang `src/lib/memory/__tests__/generic-backend.test.ts` bilang sanggunian

#### Halimbawa: Brain Backend

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

### Pag-verify

#### Mga unit test

```bash
npx vitest run src/lib/memory/__tests__/generic-backend.test.ts --reporter=verbose
```

Inaasahang output: **35 test, lahat ay pumapasa** na sumasaklaw sa:

- Constructor (2)
- Health check (4) — tagumpay, failure 500, network error, latency
- Initialize (2) — tagumpay, failure
- Create (2) — default na endpoint, custom na endpoint
- Get (4) — tagumpay, 404 → null, non-404 throw, mga custom na path parameter
- Update (2) — tagumpay, 404 → false
- Delete (2) — tagumpay, 404 → false
- List (2) — mga query parameter, mga custom na pangalan ng parameter
- Search (3) — mga query parameter, custom na endpoint, serialization ng options
- Mga auth header (2) — Bearer token, mga custom na header
- Factory (1)

#### Pagsusuri ng type

```bash
npm run typecheck:core
```

Inaasahan: **0 error**.
