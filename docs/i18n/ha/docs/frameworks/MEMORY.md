# Memory System (Hausa)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/MEMORY.md) · 🇪🇹 [am](../../../am/docs/frameworks/MEMORY.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/MEMORY.md) · 🇦🇿 [az](../../../az/docs/frameworks/MEMORY.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/MEMORY.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/MEMORY.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/MEMORY.md) · 🇩🇰 [da](../../../da/docs/frameworks/MEMORY.md) · 🇩🇪 [de](../../../de/docs/frameworks/MEMORY.md) · 🇬🇷 [el](../../../el/docs/frameworks/MEMORY.md) · 🇪🇸 [es](../../../es/docs/frameworks/MEMORY.md) · 🇪🇪 [et](../../../et/docs/frameworks/MEMORY.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/MEMORY.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/MEMORY.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/MEMORY.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/MEMORY.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/MEMORY.md) · 🇮🇱 [he](../../../he/docs/frameworks/MEMORY.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/MEMORY.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/MEMORY.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/MEMORY.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/MEMORY.md) · 🇮🇩 [id](../../../id/docs/frameworks/MEMORY.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/MEMORY.md) · 🇮🇹 [it](../../../it/docs/frameworks/MEMORY.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/MEMORY.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/MEMORY.md) · 🇰🇭 [km](../../../km/docs/frameworks/MEMORY.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/MEMORY.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/MEMORY.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/MEMORY.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/MEMORY.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/MEMORY.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/MEMORY.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/MEMORY.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/MEMORY.md) · 🇲🇲 [my](../../../my/docs/frameworks/MEMORY.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/MEMORY.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/MEMORY.md) · 🇳🇴 [no](../../../no/docs/frameworks/MEMORY.md) · 🇮🇳 [or](../../../or/docs/frameworks/MEMORY.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/MEMORY.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/MEMORY.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/MEMORY.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/MEMORY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/MEMORY.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/MEMORY.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/MEMORY.md) · 🇱🇰 [si](../../../si/docs/frameworks/MEMORY.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/MEMORY.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/MEMORY.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/MEMORY.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/MEMORY.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/MEMORY.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/MEMORY.md) · 🇮🇳 [te](../../../te/docs/frameworks/MEMORY.md) · 🇹🇭 [th](../../../th/docs/frameworks/MEMORY.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/MEMORY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/MEMORY.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/MEMORY.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/MEMORY.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/MEMORY.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/MEMORY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/MEMORY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/MEMORY.md)

---

> **Tushen gaskiya:** `src/lib/memory/` da `src/app/api/memory/`
> **Sabuntawa ta ƙarshe:** 2026-06-28 — v3.8.40 (a kashe ta tsohuwa + cim ma ƙididdigar int8)

OmniRoute yana samar da ma’adanar tattaunawa mai ɗorewa wadda aka ware bisa API key (da
session id idan ana so). Ana fitar da abubuwan tunawa kai tsaye daga amsoshin LLM
ta hanyar daidaita tsarin regex mai sauƙi, sannan a sake saka su cikin buƙatu na gaba
a matsayin saƙon system na farko (ko saƙon user na farko ga masu samar da sabis waɗanda
ba sa karɓar matsayin system).

> **Memory tana KASHE ta tsohuwa (v3.8.30+).** `DEFAULT_MEMORY_SETTINGS.enabled`
> yanzu `false` ne (`src/lib/memory/settings.ts`). Kunna memory yana saka har zuwa
> `maxTokens` (~2k) na bayanan mahallin da aka dawo da su cikin **kowace** buƙatar chat,
> kuma ana cajin hakan — kuɗin da ba a zata ba ga sabbin girkawa da kuma abokan ciniki
> waɗanda suke sarrafa mahallinsu da kansu. Yi zaɓin kunnawa a sarari ƙarƙashin
> **Settings → Memory** (`MemorySkillsTab` yana nuna sanarwar gargaɗin kuɗin token
> lokacin da aka kunna memory). Abokin ciniki zai iya cire buƙata guda ɗaya daga wannan
> ta amfani da request header na `x-omniroute-no-memory` (`true`/`1`/`yes`) — duba
> teburin request-header a [API_REFERENCE.md](../reference/API_REFERENCE.md). Buƙatar
> no-memory tana saita `memoryOwnerId = null`, wanda ke kashe **duka** saka memory da
> skill ga wannan buƙatar (`open-sse/handlers/chatCore/headers.ts::isNoMemoryRequested`).

An **ware memory ga kowane API key**, ba ga kowane mai amfani ba — kowace buƙatar da aka
tantance da API key iri ɗaya tana amfani da rumbun memory iri ɗaya, tare da ƙarin
iyaka ta `sessionId` idan ana so.

## Tsarin gine-gine

```
Client → /v1/chat/completions (an warware apiKeyInfo a matakin sama)
  → handleChatCore() [open-sse/handlers/chatCore.ts]
    → resolveMemoryOwnerId(apiKeyInfo)        # yana fitar da id
    → getMemorySettings()                     # saituna da aka adana a cache
    → shouldInjectMemory(body, {enabled})     # ƙofar sarrafawa
    → retrieveMemories(apiKeyId, config)      # SQL + FTS5 + vector na zaɓi
    → injectMemory(body, memories, provider)  # saƙon system ko user
  → kira zuwa mai samar da sabis na upstream
  → yayin amsa: extractFacts(text, apiKeyId, sessionId)  # ba ya toshewa
    → setImmediate → createMemory(fact) ga kowane sakamakon da ya dace
                   → embed(content) + upsertVector(id, vec)
```

An haɗa wuraren kiran saka bayanai da fitar da bayanai a cikin
`open-sse/handlers/chatCore.ts` (nemi `retrieveMemories`, `injectMemory`,
da `extractFacts`).

## Tsarin injin (warwarewa mai matakai 3)

Memory Engine yana tantance hanyar dawo da bayanai yayin aiki bisa kayayyakin
more rayuwa da saitunan da ake da su. Akwai matakai uku, waɗanda ake amfani da su
bisa wannan jerin fifiko:

```
  ┌─────────────────────────────────────────────────────────────┐
  │  MATAKI 0 — Kalmar nema (FTS5)                              │
  │  Samuwa bisa gwaji: FTS5 lokacin da sigar SQLite ke          │
  │  goyon bayansa (better-sqlite3 / node:sqlite / bun:sqlite); │
  │  ba ya samuwa a sifofin da ba su da FTS5 (misali            │
  │  sql.js/WASM — "no such module: fts5"). Ana amfani da shi   │
  │  lokacin strategy = "exact" ko a matsayin madadin; matsayin │
  │  keyword na engine-status yana nuna sakamakon gwajin.       │
  └──────────────────────────────────┬──────────────────────────┘
                                     │ strategy = semantic|hybrid?
                                     ▼
  ┌─────────────────────────────────────────────────────────────┐
  │  MATAKI 1 — Vector na Ciki (sqlite-vec)                      │
  │  Ana loda sqlite-vec v0.1.9 ta db.loadExtension().           │
  │  Binciken KNN na brute-force a kan vector na Float32. Yana   │
  │  aiki lokacin da:                                            │
  │   • sqlite-vec loadExtension ya yi nasara                    │
  │   • Akwai tushen embedding (remote | static |                │
  │     transformers) da zai iya samar da Float32Array           │
  │   • Akwai teburin vec_memories (ana ƙirƙirarsa a ready()     │
  │     na farko)                                                │
  └──────────────────────────────────┬──────────────────────────┘
                                     │ qdrant.enabled?
                                     ▼
  ┌─────────────────────────────────────────────────────────────┐
  │  MATAKI 2 — Qdrant (ma’ajiyar vector ta waje ta zaɓi)        │
  │  Idan an kunna shi, yana maye gurbin sqlite-vec don          │
  │  semantic/hybrid.                                           │
  │  Yana buƙatar Qdrant instance mai aiki + host/port da aka    │
  │  saita.                                                      │
  └─────────────────────────────────────────────────────────────┘
```

Saukar da mataki yana faruwa kai tsaye kuma ba tare da tangarda ba:

- Idan sqlite-vec ya kasa lodawa, mataki na 1 ba zai samu ba → sai a koma mataki na 0.
- Idan tushen embedding ya dawo da kuskure, mataki na 1 zai koma mataki na 0.
- Idan Qdrant ba ya cikin ƙoshin lafiya, mataki na 2 zai koma mataki na 1 (ko mataki na 0 idan mataki na 1
  ma ba ya samuwa).

## Tushen embedding

Layer ɗin embedding (`src/lib/memory/embedding/`) yana tantance tushen da za a yi amfani da shi
bisa `MemorySettingsExtended.embeddingSource`:

| Tushe          | Bayani                                                                                     | Ana buƙatar maɓalli | Farawa daga sanyi |
| -------------- | ------------------------------------------------------------------------------------------ | ------------------- | ----------------- |
| `remote`       | Yana amfani da API na embedding na mai bayarwa da aka saita (OpenAI, Cohere, da sauransu.) | Eh                  | Babu              |
| `static`       | Embedding na gida ta hanyar lookup-table da `potion-base-8M` (WordPiece + mean pooling)    | A'a                 | ~200ms            |
| `transformers` | Gudanar da ONNX a gida ta `@huggingface/transformers` v4, `all-MiniLM-L6-v2`               | A'a                 | ~3s + ~400MB RAM  |
| `auto`         | Tantancewa yayin gudana: remote (idan akwai maɓalli) → static → transformers → null        | Ya danganta         | Ya danganta       |

**Jerin tantancewa don `auto`:**

1. Nemo mai bayarwa na farko a cikin `listEmbeddingProviders()` mai `hasKey === true` → `remote`.
2. Idan `settings.staticEnabled === true` → `static`.
3. Idan `settings.transformersEnabled === true` → `transformers`.
4. In ba haka ba → `null` (yana koma wa binciken kalmomi na FTS5).

Ma'ajiyar wucin gadi ta embedding (`src/lib/memory/embedding/cache.ts`) tana amfani da taswirar
LRU ta cikin ƙwaƙwalwa wadda maɓallinta shi ne `${source}:${model}:${dim}:${sha256(text)}`, kuma iyakarta ita ce
shigarwar `MEMORY_EMBEDDING_CACHE_MAX` (tsoho 1000) tare da TTL na
`MEMORY_EMBEDDING_CACHE_TTL_MS` (tsoho mintuna 5). Ana raba ta tsakanin duk masu kira
a tsawon rayuwar kowace process.

## Hybrid RRF (k=60)

Lokacin da `strategy = "hybrid"` kuma vector store yana samuwa, maidowa tana amfani da
Reciprocal Rank Fusion don haɗa sakamakon FTS5 da na vector:

```
RRF(d) = Σ  1 / (k + rank_i(d))      inda k = 60 (ana iya saita shi ta MEMORY_RRF_K)
          i
```

A zahiri:

1. Gudanar da binciken FTS5 → jeri mai darajoji `R_fts` (matsayi 1..N).
2. Gudanar da binciken vector na KNN → jeri mai darajoji `R_vec` (matsayi 1..M).
3. Ga kowane `memoryId` na musamman:  
   `rrf_score = 1/(60 + fts_rank)` + `1/(60 + vec_rank)` (0 idan ba ya cikin jerin).
4. Jera bisa `rrf_score` DESC, sannan a yi amfani da kewayar iyakar token.

An san RRF da yin aiki yadda ya kamata ba tare da buƙatar daidaita maki tsakanin
tsarukan maidowa masu bambancin hali ba. Tsohon ƙimar `k=60` ta fito ne daga ainihin
takardar Cormack et al. kuma tana aiki da kyau ga ƙananan tarin bayanai (<10k memories).

## Cike bayanan baya (lazy + reindex)

Lokacin da samfurin embedding ya canza (wanda ake ganowa ta `embedding_signature`), ana
sake gina vector store kuma ana yi wa duk memories da ke akwai alamar
`needs_reindex = 1` a cikin teburin `memories`.

**Lazy backfill**: A maidowa ta gaba, duk memory da ba ta da shigarwar vector za a
yi mata embedding kuma a saka ta cikin `vec_memories` kafin binciken ya gudana. Wannan
yana rarraba kuɗin backfill a kan buƙatu na ainihi ba tare da hana farawa ba.

**Explicit reindex**: Shafin Engine da ke `/dashboard/memory` yana samar da maɓallin
"Yi Reindex Yanzu" wanda ke kiran `POST /api/memory/reindex`. Handler ɗin yana kiran
`runReindexBatch()` daga `src/lib/memory/reindex.ts`, wanda ke sarrafa har zuwa
shigarwar `limit` masu jiran aiki a kowace buƙata. Ana iya duba ci gaba lokaci-lokaci ta
`GET /api/memory/engine-status` (`vectorStore.needsReindex`).

Teburin `memory_vec_meta` (migration `083_memory_vec.sql`) yana adana:

- `active_dim` — girman vector na yanzu (null = ba a daidaita ba tukuna).
- `embedding_signature` — `${source}:${model}:${dim}` da ake amfani da shi don gano sauye-sauye.
- `last_reset_at` — timestamp na cikakken reset na ƙarshe.
- `vec_loaded` — alamar 0/1 da ke nuna ko sqlite-vec ya loda cikin nasara.

## Faɗaɗa saituna

Ana samun filayen embedding da vector guda tara a cikin `MemorySettingsExtended` a
`src/shared/schemas/memory.ts`, kuma ana adana su ta hanyar `src/lib/db/settings.ts`:

| Fili                     | Nau'i                                              | Tsoho    | Bayani                                                        |
| ------------------------ | -------------------------------------------------- | -------- | ------------------------------------------------------------- |
| `embeddingSource`        | `"remote" \| "static" \| "transformers" \| "auto"` | `"auto"` | Tushen embedding da za a yi amfani da shi                     |
| `embeddingProviderModel` | `string \| null`                                   | `null`   | Mai bayarwa/samfuri a tsarin `provider/model`                 |
| `customBaseUrl`          | `string \| null`                                   | `null`   | URL na asalin endpoint mai dacewa da OpenAI don Memory kawai  |
| `customModelId`          | `string \| null`                                   | `null`   | ID na samfurin da ake aika wa endpoint na musamman            |
| `transformersEnabled`    | `boolean`                                          | `false`  | Zaɓin shiga don Transformers.js (MiniLM, ~400MB)              |
| `staticEnabled`          | `boolean`                                          | `false`  | Zaɓin shiga don samfurin gida na static potion-base-8M        |
| `rerankEnabled`          | `boolean`                                          | `false`  | Kunna matakin sake jerantawa (yana ƙara +200-500ms/req)       |
| `rerankProviderModel`    | `string \| null`                                   | `null`   | Mai bayarwa/samfurin sake jerantawa a tsarin `provider/model` |

Ana tantance `rerankProviderModel` ta `POST /v1/rerank` (wanda ake kira ta loopback), saboda haka yana karɓar duk abin da wannan route ɗin ke karɓa: samfurin sake jerantawa na cloud da aka zaɓa (`cohere/rerank-v3.5`, `jina-ai/jina-reranker-v3.5`, …) ko node na mai bayarwa mai dacewa da OpenAI a matsayin `<node-prefix>/<model>` (misali `skilled-mini/bge-reranker-v2-m3` don akwatin TEI/Infinity). Node na loopback koyaushe sun cancanta; node da ke kan wani host (LAN, Tailscale) yana kuma buƙatar feature flag na `RERANK_REMOTE_PROVIDER_NODES` kuma dole ne ya cika ƙa'idar URL mai fita ta mai bayarwa — duba [Feature Flags](../reference/FEATURE_FLAGS.md). Mai zaɓin dashboard yana jera zaɓaɓɓun masu bayarwa tare da node na gida; ana iya saita kowace ingantacciyar ƙimar `provider/model` kai tsaye ta `PUT /api/settings/memory`.
| `vectorStore` | `"sqlite-vec" \| "qdrant" \| "auto"` | `"auto"` | Backend na vector da za a yi amfani da shi |

Ana samar da waɗannan ta `GET /PUT /api/settings/memory` (schema `MemorySettingsExtendedSchema`).

Ga tushen `remote`, Memory kuma yana karɓar saitunan `customBaseUrl` da
`customModelId` na zaɓi. Tare, suna zaɓar endpoint na `/embeddings` mai dacewa da
OpenAI da kuma samfurinsa ba tare da canza rajistar embedding ta duniya ba. Ana
daidaita endpoint kafin amfani sannan a duba shi da ƙa'idar URL mai fita ta mai bayarwa:
ana buƙatar HTTP(S), ana ƙin bayanan shaidar shiga da query strings da aka saka a ciki,
kuma adireshin cloud-metadata suna ci gaba da kasancewa a katange. Ƙimomin da babu
komai a cikinsu suna kiyaye zaɓaɓɓen mai bayarwa na rajista. Ana tsabtace kurakuran da
ake mayarwa zuwa dashboard, kuma ba a taɓa rubuta bayanan shaidar endpoint a log ba.

> **TODO (D20):** Ba a aiwatar da scope na `global` (raba memories tsakanin dukkan
> API keys) a wannan sakin ba. Yana buƙatar sauye-sauyen schema da hanyar retrieval
> ta duniya. A bi diddiginsa daban.

## Matakan ma'ajiyar bayanai

### Na farko: SQLite (jadawalin `memories`)

Migration `015_create_memories.sql` ne ya ƙirƙire shi:

| Shafi                       | Nau'i              | Bayanan kula                                                              |
| --------------------------- | ------------------ | ------------------------------------------------------------------------- |
| `id`                        | `TEXT PRIMARY KEY` | UUID da aka samar ta hanyar `crypto.randomUUID()`                         |
| `api_key_id`                | `TEXT NOT NULL`    | API key mai mallaka                                                       |
| `session_id`                | `TEXT`             | Scope na kowace tattaunawa na zaɓi                                        |
| `type`                      | `TEXT NOT NULL`    | Ɗaya daga cikin `factual`, `episodic`, `procedural`, `semantic`           |
| `key`                       | `TEXT`             | Tsayayyen maɓallin upsert, misali `preference:i_prefer_python`            |
| `content`                   | `TEXT NOT NULL`    | Ainihin rubutun bayanin gaskiya                                           |
| `metadata`                  | `TEXT`             | Tarin JSON (category, extractedAt, source, ...)                           |
| `created_at` / `updated_at` | `TEXT`             | Strings na ISO 8601                                                       |
| `expires_at`                | `TEXT`             | Ƙarewar lokaci ta zaɓi; `NULL` na nufin dindindin                         |
| `memory_id`                 | `INTEGER UNIQUE`   | `023_fix_memory_fts_uuid.sql` ne ya ƙara shi don haɗa UUIDs ↔ FTS5 rowids |

Indexes: `api_key_id`, `session_id`, `type`, `expires_at`, tare da index na musamman
na `memory_id`.

**Ma'anar upsert**: `createMemory()` yana neman row da ke akwai mai
`(api_key_id, key)` iri ɗaya, kuma yana sabunta shi a wurinsa idan an same shi (yana haɗa
`metadata` ta shallow spread). Wannan yana hana jadawalin girma ba tare da iyaka ba saboda
maimaita maganganun fifiko.

### Binciken cikakken rubutu (virtual table na `memory_fts`)

`022_add_memory_fts5.sql` yana ƙirƙirar virtual table na FTS5 a kan `content` da
`key`. `023_fix_memory_fts_uuid.sql` yana gyara wata matsala ta ainihin amfani inda UUID
primary key bai haɗu da integer rowid na FTS5 ba — migration ɗin yana ƙara shafin
`memory_id`, yana sake ƙirƙirar jadawalin FTS, sannan yana haɗa triggers
(`memory_fts_ai`, `memory_fts_ad`, `memory_fts_au`) waɗanda ke kiyaye daidaituwar FTS yayin
INSERT, DELETE, da UPDATE.

`retrieval.ts` yana amfani da shi don dabarun `semantic` da `hybrid` (duba ƙasa).
Lambar retrieval tana kare kanta da `hasTable("memory_fts")`, sannan tana koma wa
jeri bisa tsarin lokaci idan jadawalin FTS ya ɓace ko query na FTS ya jefa kuskure.

### Na zaɓi: Qdrant (mataki na 2 na ma'ajiyar vector)

`src/lib/memory/qdrant.ts` yana aiwatar da haɗin Qdrant na zaɓi a matsayin mataki na 2
na ma'ajiyar vector. Retrieval yana turawa zuwa Qdrant ne kawai lokacin da mai zaɓin engine
`memoryVectorStore === "qdrant"` — tsohon zaɓin `"auto"` (da `"sqlite-vec"`)
**ba sa taɓa** zaɓar Qdrant. Toggle na shafin Engine yana saita **duka biyun** `qdrantEnabled` da
`memoryVectorStore` tare: kunna shi yana mai da Qdrant babban ma'aji, kashe shi kuma
yana mayar da saitin zuwa `"auto"` (#5597 — kafin wannan gyaran, kunnawa ba ya yin tasiri saboda babu abin da
ke rubuta mai zaɓin engine). Idan ba za a iya isa Qdrant ba ko bai dawo da komai ba, retrieval
yana koma wa sqlite-vec → FTS5.

- `upsertSemanticMemoryPoint()` — haɗa `key + content` zuwa embedding ta amfani da
  embedding model da aka saita, tabbatar cewa collection ɗin yana wanzuwa (yana ƙirƙirar vectors masu
  cosine-distance a amfani na farko), sannan ya saka ko sabunta point mai payload `{memoryId,
apiKeyId, sessionId, key, content, metadata, createdAtUnix, expiresAtUnix}`.
- `searchSemanticMemory(query, topK, scope)` — haɗa query zuwa embedding, bincika
  collection ɗin da aka tace ta `kind = "omniroute_memory"` sannan, idan ana so, ta
  `apiKeyId` / `sessionId`. Yana iyakance `topK` zuwa `[1, 20]`.
- `deleteSemanticMemoryPoint(id)` — share point guda ɗaya. Ana kiransa daga
  `deleteMemory()` bayan an cire row ɗin SQLite (D15).
- `cleanupSemanticMemoryPoints({retentionDays})` — share points da yawa waɗanda
  `expiresAtUnix` nasu ya wuce ko kuma `createdAtUnix` nasu ya girmi iyakar lokacin
  riƙewa. Yana fara ƙirga su domin dashboard ya iya nuna ainihin lambobi.
- `checkQdrantHealth()` — gwajin lafiya na `GET /readyz` tare da latency.

UI na saituna yana nuna saitunan Qdrant, gwajin lafiya, gwajin binciken semantic,
da tsaftacewa a **shafin Engine** na `/dashboard/memory`. Duk routes masu alaƙa
da ke ƙarƙashin `src/app/api/settings/qdrant/` an haɗa su tun daga v3.8.6:

| Route                                   | Hanya         | Bayani                                |
| --------------------------------------- | ------------- | ------------------------------------- |
| `/api/settings/qdrant`                  | `GET` / `PUT` | Karanta / sabunta saitunan Qdrant     |
| `/api/settings/qdrant/health`           | `GET`         | Gwajin liveness + latency             |
| `/api/settings/qdrant/search`           | `POST`        | Gwajin binciken semantic              |
| `/api/settings/qdrant/cleanup`          | `POST`        | Cire points da suka ƙare / tsufa      |
| `/api/settings/qdrant/embedding-models` | `GET`         | Jeranta embedding models da ake da su |

**Bayanan halayya (abin da za a sa ran gani):**

- **Zaɓin engine** — kunna Qdrant a shafin Engine yana mai da shi babban
  ma'ajiya (yana saita `memoryVectorStore="qdrant"`); kashe shi yana mayarwa zuwa `"auto"` (#5597).
- **Babu cike bayan nan** — memories da aka ƙirƙira/sabunta **bayan** an kunna Qdrant ne kawai
  ake rubutawa a cikinsa (dual-write na fire-and-forget). Memories na SQLite da suka riga suka wanzu **ba a**
  ƙaura da su; "Reindex Now" yana sake gina index na sqlite-vec kawai, ba Qdrant ba.
- **Ana gano girman vector ta atomatik** daga ainihin embedding a amfani na farko — babu
  filin dimension da za a cike. Canza embedding model bayan collection ya riga
  ya wanzu **ba a** sarrafa shi ta atomatik: ana barin collection ɗin da yake akwai ba tare da sauyi ba, rubutu/bincike
  masu dimension marar dacewa suna gaza sannan su koma sqlite-vec. Sake ƙirƙirar collection ɗin
  (sabon suna, ko share shi a Qdrant) domin sauya embedders.
- **Ma'aunin tazara** — koyaushe **Cosine** ne (an hardcode shi lokacin ƙirƙirar collection; ba
  za a iya saita shi ba).
- **Auth** — API key kawai (ana aika shi a matsayin header na `api-key`; ba dole ba ne ga local Docker
  marar tantancewa). Ba a amfani da JWT/RBAC.
- **Filayen saiti** — UI yana nuna `host`, `port`, `collection`, `embeddingModel`,
  `apiKey`. `vectorSize` / `hnswEfConstruct` na env/DB ne kawai kuma ba a amfani da `vectorSize`
  wajen ƙirƙirar collection (dimension yana fitowa daga embedding).

### Quantization na vector (int8 — sai an zaɓa, duka backends)

Dukkan vector backends suna goyon bayan **int8 quantization na zaɓi** domin rage girman
memory da vectors da aka adana ke amfani da shi (~ƙarami sau 4 fiye da Float32) tare da ɗan raguwar recall.
Ta tsohuwa **a kashe** yake a dukansu — vectors suna ci gaba da kasancewa da cikakkiyar precision sai an
kunna shi a sarari.

| Backend    | Saiti                           | Nau'i                          | Na tsohuwa | Inda ake karantawa                                          |
| ---------- | ------------------------------- | ------------------------------ | ---------- | ----------------------------------------------------------- |
| Qdrant     | `qdrantQuantization` (DB key)   | `"none" \| "int8" \| "binary"` | `"none"`   | `src/lib/memory/qdrant.ts::normalizeQdrantConfig()`         |
| sqlite-vec | `MEMORY_VEC_QUANTIZATION` (env) | `"none" \| "int8"`             | `"none"`   | `src/lib/memory/vectorStore.ts::requestedVecQuantization()` |

- Ana saita **Qdrant** ga kowane instance ta hanyar setting key na `qdrantQuantization`
  (wanda ake nunawa a matsayin filin `quantization` a `PUT /api/settings/qdrant`). Lokacin da yake
  `"int8"`, `buildQuantizationConfig()` yana buƙatar scalar quantization
  (`always_ram`, quantile `0.99`) sannan bincike yana kunna `rescore: true` domin
  vectors masu cikakkiyar precision su inganta jerin candidates na int8.
- Quantization na **sqlite-vec** na **environment kawai** ne (ba saitin DB ba): saita
  `MEMORY_VEC_QUANTIZATION=int8` domin adana local vectors a matsayin column na `int8[dim]`
  ta hanyar `vec_quantize_int8(?, 'unit')`. Ana haɗa mode ɗin da aka zaɓa cikin
  `embedding_signature` (suffix na `:int8`), don haka sauya modes yana jawo cikakken
  sake yin index na table na `vec_memories` — irin lazy-backfill path ɗin da ake amfani da shi lokacin da
  embedding model ya sauya.

## Nau’ikan Ƙwaƙwalwa

`MemoryType` (`src/lib/memory/types.ts`):

| Nau’i        | Abin da ake amfani da shi                                                                    |
| ------------ | -------------------------------------------------------------------------------------------- |
| `factual`    | Zaɓuɓɓuka, tabbatattun bayanan mai amfani, salon ɗabi’a                                      |
| `episodic`   | Shawarwarin da ke da alaƙa da wani takamaiman lokaci ("Na zaɓi Postgres")                    |
| `procedural` | Ƙwaƙwalwar tsarin aiki / yadda ake yi (an tanada; babu mai cire bayanai ta atomatik a yanzu) |
| `semantic`   | An tanada don shigarwar vector-store                                                         |

Dabarar dawo da bayanai ta `MemoryConfig` tana ɗaya daga cikin `exact`, `semantic`, ko `hybrid`,
kuma iyakarta tana ɗaya daga cikin `session`, `apiKey`, ko `global`. Tsohuwar iyakar da ake samu daga
`getMemorySettings()` ita ce `apiKey`.

## Ciro Bayanai (`extraction.ts`)

Ana yin ciro bayanai ne bisa **regex**, ba bisa LLM ba — yana gudana a cikin tsarin aikin
ta amfani da `setImmediate()` don kada ya taɓa toshe rafin amsa:

- **Tsarin zaɓi** → `MemoryType.FACTUAL`
  (misali `Na fi son …`, `Ina matuƙar son …`, `abin da na fi so shi ne …`, `Na ƙi …`)
- **Tsarin shawara** → `MemoryType.EPISODIC`
  (misali `Zan yi amfani da …`, `Na zaɓi …`, `Na ɗauki …`, `Zan fara amfani da …`)
- **Tsarin ɗabi’a** → `MemoryType.FACTUAL`
  (misali `Na saba …`, `Kullum ina …`, `Nakan …`)

Ana tsaftace kowace dacewa (`trim`, haɗa sararin rubutu, iyakancewa zuwa haruffa 500),
ana cire maimaituwa a cikin rukunin ta hanyar tabbataccen `factKey(category, content)`, sannan
a adana ta ta amfani da `createMemory()` tare da metadata
`{category, extractedAt, source: "llm_response"}`. An iyakance rubutun shigarwa zuwa
64 KiB (`MAX_EXTRACTION_TEXT_LENGTH`) — idan ya fi haka tsawo, ana amfani da **ƙarshen** rubutun
domin tabbatar da cewa sabon abun da mataimaki ya rubuta koyaushe yana cikin aikin.

Ana fitar da `extractFactsFromText(text)` don gwaje-gwaje, kuma yana dawo da bayanan da aka tsara
ba tare da adana su ba.

## Dawo da Bayanai (`retrieval.ts`)

`retrieveMemories(apiKeyId, config)` ita ce babbar hanyar shiga. Tana:

1. Daidaita tare da tabbatar da ingancin config ta hanyar `MemoryConfigSchema`.
2. Dawo da `[]` nan take idan `enabled` ya kasance false ko `maxTokens <= 0`.
3. Iyakance `maxTokens` zuwa `[1, 8000]`.
4. Gano ko teburin zamani na `memories` yana nan (maimakon tsohon teburin `memory`)
   domin tsofaffin ma’ajin bayanai su ci gaba da aiki.
5. Gina ainihin query tare da kariyar ƙarewar lokaci
   (`expires_at IS NULL OR datetime(expires_at) > datetime('now')`), iyakar
   session idan an bayar, da kuma iyakar `retentionDays` idan an bayar.
6. Rarraba aiki bisa dabara:
   - **`exact`** (tsohuwar dabi’a): jerin lokaci `ORDER BY created_at DESC LIMIT 100`.
   - **`semantic`**: idan `config.query` da `memory_fts` suna nan, a yi JOIN da
     `memory_fts MATCH ?` sannan a jera bisa matsayin FTS; a koma jerin lokaci
     idan FTS ya dawo da layuka 0.
   - **`hybrid`**: haɗin sakamakon FTS (mafi girman dacewa) da saitin
     jerin lokaci, tare da cire maimaituwa bisa id.
7. Lissafa makin dacewar kalmomin maɓalli (`getRelevanceScore`) a kan
   `content`, `key`, da metadata JSON idan an bayar da query. Ana tace layukan
   da makinsu ya zama sifili.
8. Jera bisa score daga mafi girma zuwa ƙasa, sannan `createdAt` daga sabo zuwa tsoho.
9. Bi jerin da aka jera sannan a karɓi shigarwa muddin jimillar
   `estimateTokens(content)` (≈ `length / 4`) ba ta wuce kasafin ba. Koyaushe
   yana dawo da aƙalla shigarwa guda idan an sami kowace dacewa.

Ana fitar da `estimateTokens`, kuma tsarin dawo da bayanai, taƙaitawa, da kayan aikin MCP
na `omniroute_memory_search` suna amfani da shi.

## Shigarwa (`injection.ts`)

`injectMemory(request, memories, provider)`:

1. Yana haɗa duk abubuwan da ke cikin ƙwaƙwalwar ajiya zuwa rubutu guda ɗaya na `Memory context: …`.
2. Yana zaɓar dabara bisa sunan mai samarwa:
   - **Saƙon tsarin** (tsoho ga OpenAI, Anthropic, Gemini, …) — yana saka
     `{role: "system", content: memoryText}` a gaba da duk wani saƙon tsarin
     da yake akwai domin umarnin tsarin mai amfani su ci gaba da kasancewa mafi fifiko.
   - **Saƙon mai amfani** (madadin) — ga masu samarwa da ke cikin
     `PROVIDERS_WITHOUT_SYSTEM_MESSAGE`: `o1`, `o1-mini`, `o1-preview`,
     `glm`, `glmt`, `glm-cn`, `zai`, `qianfan`. Waɗannan suna ƙin rawar tsarin
     kuma in ba haka ba za su mayar da 400 (duba matsala #1701 don GLM/Zhipu).
3. Yana rubuta adadi, dabara, da samfurin a ƙarƙashin `memory.injection.injected`.

Ana fitar da `providerSupportsSystemMessage(provider)` domin masu kira da ke buƙatar
yanke nasu shawarar zaɓin hanya. Masu samarwa da ba a sani ba suna amfani da `true`
(ana yarda da rawar tsarin) a matsayin tsoho don aminci.

## Saituna (`settings.ts`)

Ana **adana tsarin ƙwaƙwalwar ajiya a cikin jadawalin saitunan DB**, ba a cikin sauye-sauyen muhalli ba.
`getMemorySettings()` yana karantawa daga `getSettings()` kuma yana adana sakamakon
na ɗan lokaci a cikin tsarin aiki; hanyar PUT ta saituna tana kiran
`invalidateMemorySettingsCache()` bayan rubutawa.

### Filayen gado (duk nau'ikan)

| Maɓallin DB           | Nau'i   | Tsoho                                                 | Ikon UI                                                                 |
| --------------------- | ------- | ----------------------------------------------------- | ----------------------------------------------------------------------- |
| `memoryEnabled`       | boolean | `false` (a kashe ta tsohuwa tun daga v3.8.30)         | Kunna/kashe ƙwaƙwalwar ajiya                                            |
| `memoryMaxTokens`     | integer | `2000` (kewayo `0–16000`)                             | Kasafin token don shigarwa                                              |
| `memoryRetentionDays` | integer | `30` (kewayo `1–365`)                                 | Tsawon lokacin riƙewa                                                   |
| `memoryStrategy`      | enum    | `"hybrid"` (ɗaya daga `recent`, `semantic`, `hybrid`) | Dabarar dawo da bayanai                                                 |
| `skillsEnabled`       | boolean | `false`                                               | Yana kunna/kashe shigar da ƙwarewa bisa kowane maɓalli (duba SKILLS.md) |

Lura: Dabarar UI ta `"recent"` tana daidaita da dabarar dawo da bayanai ta ciki
mai suna `"exact"` ta hanyar `toMemoryRetrievalConfig()` (tsarin lokaci).

### Sabbin filaye (v3.8.6, tsari 21 D9)

Duba kuma sashen "Faɗaɗa saituna" da ke sama don bayanin filayen.

| Maɓallin DB                 | Filin API                | Tsoho    |
| --------------------------- | ------------------------ | -------- |
| `memoryEmbeddingSource`     | `embeddingSource`        | `"auto"` |
| `memoryEmbeddingModel`      | `embeddingProviderModel` | `null`   |
| `memoryTransformersEnabled` | `transformersEnabled`    | `false`  |
| `memoryStaticEnabled`       | `staticEnabled`          | `false`  |
| `memoryRerankEnabled`       | `rerankEnabled`          | `false`  |
| `memoryRerankModel`         | `rerankProviderModel`    | `null`   |
| `memoryVectorStore`         | `vectorStore`            | `"auto"` |

Maɓallan DB masu alaƙa da Qdrant (`qdrantEnabled`, `qdrantHost`, `qdrantPort`,
`qdrantApiKey`, `qdrantCollection` mai tsohon ƙima `"omniroute_memory"`,
`qdrantEmbeddingModel` mai tsohon ƙima `"openai/text-embedding-3-small"`) ana karanta su ta
`normalizeQdrantConfig()` a cikin `qdrant.ts`.

### Sauye-sauyen muhalli (v3.8.6)

Sauye-sauyen muhalli na zaɓi guda shida suna daidaita halayen injin yayin aiki (an rubuta bayaninsu a cikin `.env.example`):

| Sauyi                           | Tsoho                      | Bayani                                                                                                                                      |
| ------------------------------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `MEMORY_EMBEDDING_CACHE_TTL_MS` | `300000`                   | TTL na ma'ajiyar embedding (minti 5)                                                                                                        |
| `MEMORY_EMBEDDING_CACHE_MAX`    | `1000`                     | Matsakaicin adadin abubuwa a ma'ajiyar embedding ta LRU                                                                                     |
| `MEMORY_TRANSFORMERS_MODEL`     | `Xenova/all-MiniLM-L6-v2`  | Ma'ajiyar HF don samfurin Transformers.js                                                                                                   |
| `MEMORY_STATIC_MODEL`           | `minishlab/potion-base-8M` | Ma'ajiyar HF don samfurin potion na dindindin                                                                                               |
| `MEMORY_STATIC_CACHE_DIR`       | `<DATA_DIR>/embeddings`    | Inda za a adana samfuran da aka sauke                                                                                                       |
| `MEMORY_VEC_TOP_K`              | `20`                       | Tsohon top-K don binciken vector                                                                                                            |
| `MEMORY_RRF_K`                  | `60`                       | Ƙimar dindindin ta RRF k don binciken hybrid                                                                                                |
| `MEMORY_VEC_QUANTIZATION`       | `none`                     | Saita zuwa `int8` don adana vector na sqlite-vec na gida a matse (~4× ƙanƙanta; sai an zaɓa). Canjin yanayi yana tilasta sake yin fihirisa. |

## Taƙaitawa (`summarization.ts`)

`summarizeMemories(apiKeyId, sessionId?, maxTokens = 4000)` yana taƙaita tsohon
abun ciki lokacin da jimillar token da ake amfani da ita a memories na wani key ta zarce
kasafin. Yana bi ta rows a tsarin DESC bisa `created_at`, yana riƙe rows da suka dace, sannan ga
sauran yana maye gurbin `content` a wurin da jimloli uku na farko na
ainihin rubutun. `tokensSaved` shi ne bambancin `estimateTokens` tsakanin tsohon
da sabon abun ciki.

Wannan aikin yana **samuwa amma ba a kiran sa kai tsaye** a cikin tsarin
chat na yanzu — kira shi daga cron, wani aikin admin, ko
hanyar haɗin `MemoryConfig.autoSummarize` idan kana buƙatar ci gaba da taƙaitawa. Asarar
bayanan hanya ɗaya ce: ana rubuta sabon rubutu a kan ainihin rubutun.

## REST API

Dukkan endpoints suna buƙatar authentication na gudanarwa (`requireManagementAuth`).

### Muhimman endpoints na memory (na yanzu + waɗanda aka sabunta)

| Method   | Path                 | Bayani                                                                                                                                                                                              |
| -------- | -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `GET`    | `/api/memory`        | Jerin da aka raba shafuka tare da matatu: `apiKeyId`, `type`, `sessionId`, `q`, `limit`, `page`, `offset`. Amsa ta ƙunshi `stats.total`, `stats.tokensUsed`, `stats.hitRate`, `cacheStats`          |
| `POST`   | `/api/memory`        | Ƙirƙiri entry (an inganta ta da Zod: `content`, `key`, da `type`, `sessionId`, `apiKeyId`, `metadata`, `expiresAt` na zaɓi). Yana kiran `createMemory()` wanda ke yin upsert bisa `(apiKeyId, key)` |
| `GET`    | `/api/memory/[id]`   | Ɗauko entry guda ta UUID                                                                                                                                                                            |
| `PUT`    | `/api/memory/[id]`   | Sabunta fields na entry (`type`, `key`, `content`, `metadata`). Body: `MemoryUpdatePutSchema`. Haka kuma yana daidaita vector idan akwai tushen embedding.                                          |
| `DELETE` | `/api/memory/[id]`   | Share entry; haka kuma yana sharewa daga `vec_memories` (D15) da Qdrant gwargwadon iko. Yana mayar da 404 idan babu shi.                                                                            |
| `GET`    | `/api/memory/health` | Yana gudanar da `verifyExtractionPipeline("health-check")` — zagayen ƙirƙira→jera→sharewa. Yana mayar da `{working, latencyMs, error?}`                                                             |

### Sabbin endpoints na memory engine (tsari na 21)

| Method | Path                              | Bayani                                                                                                                                                                    |
| ------ | --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `POST` | `/api/memory/retrieve-preview`    | Gwajin bushe na `retrieveMemories` — yana mayar da sakamakon da aka jera tare da score, tier, tokens. Body: `RetrievePreviewSchema`. BA YA shigarwa ko sauya memories.    |
| `GET`  | `/api/memory/embedding-providers` | Yana jera providers tare da embedding models, yana nuna waɗanda aka saita musu API key.                                                                                   |
| `GET`  | `/api/memory/engine-status`       | Yana mayar da cikakken matsayin engine: keyword tier, embedding resolution, ƙididdigar vector store, lafiyar Qdrant, da saitin rerank. Tsari: `MemoryEngineStatusSchema`. |
| `POST` | `/api/memory/summarize`           | Ƙaddamar da taƙaita memory da hannu. Body: `MemorySummarizeSchema` (`olderThanDays`, `apiKeyId?`, `dryRun`). Yana mayar da `{candidates, tokensSaved}`.                   |
| `POST` | `/api/memory/reindex`             | Ƙaddamar da sake yin vector index ga memories masu `needs_reindex=1`. Body: `MemoryReindexSchema` (`force`). Yana mayar da `{started, pending}`.                          |

### Endpoints na saituna

| Method | Path                                    | Bayani                                                                                              |
| ------ | --------------------------------------- | --------------------------------------------------------------------------------------------------- |
| `GET`  | `/api/settings/memory`                  | `MemorySettingsExtended` na yanzu da aka daidaita (sabbin fields 7 + tsofaffi)                      |
| `PUT`  | `/api/settings/memory`                  | Sabunta kowane field daga `MemorySettingsExtendedSchema` (jimillar fields 12)                       |
| `GET`  | `/api/settings/qdrant`                  | Saitunan Qdrant na yanzu (`QdrantSettingsSchema`)                                                   |
| `PUT`  | `/api/settings/qdrant`                  | Sabunta saitunan Qdrant. Body: `QdrantSettingsUpdateSchema`. `apiKey` = empty string yana cire key. |
| `GET`  | `/api/settings/qdrant/health`           | Gwajin liveness a kan Qdrant instance da aka saita. Yana mayar da `QdrantHealthResultSchema`.       |
| `POST` | `/api/settings/qdrant/search`           | Gwajin semantic search a kan Qdrant. Body: `QdrantSearchSchema` (`query`, `topK`).                  |
| `POST` | `/api/settings/qdrant/cleanup`          | Cire Qdrant points na memories da wa'adinsu ya ƙare / suka tsufa.                                   |
| `GET`  | `/api/settings/qdrant/embedding-models` | Jera embedding models da ake da su don Qdrant.                                                      |

Query na jerin `/api/memory` yana goyon bayan ko dai pagination bisa `page`
(`parsePaginationParams`) **ko** `offset` kai tsaye — idan `offset` yana nan shi
ne ke da fifiko, sannan a ƙirƙiri `page` daga gare shi don tsarin amsar.

## Kayan Aikin MCP (`open-sse/mcp-server/tools/memoryTools.ts`)

Lokacin da aka kunna uwar garken MCP, ana rijistar kayan aikin ƙwaƙwalwa guda uku:

- `omniroute_memory_search` — `{apiKeyId, query?, type?, maxTokens?, limit?}`
  → yana kunshe da `retrieveMemories()`. Tun daga v3.8.6 (D16), ana karanta
  `strategy` daga `getMemorySettings()` maimakon a ƙayyade shi kai tsaye zuwa
  `"exact"`. Idan an samar da `query` kuma `strategy` ya kasance `semantic` ko
  `hybrid`, ana amfani da ma'ajiyar vector idan tana samuwa.
- `omniroute_memory_add` — `{apiKeyId, sessionId?, type, key, content,
metadata?}` → yana kunshe da `createMemory()`. Yana karɓar nau'ikan hukuma guda 4
  kawai: `factual`, `episodic`, `procedural`, `semantic` (D17).
- `omniroute_memory_clear` — `{apiKeyId, type?, olderThan?}` → yana jera
  shigarwar da suka dace, yana tace su bisa tambarin lokacin da aka ƙirƙira kafin
  wani lokaci idan an buƙata, sannan yana share kowacce ta hanyar
  `deleteMemory()` (wanda kuma yake cire vector daga sqlite-vec + Qdrant).

Duba [MCP-SERVER.md](./MCP-SERVER.md) don cikakkun bayanai game da jigilar bayanai da iyakar aiki.

## Dashboard (Memory Studio)

`src/app/(dashboard)/dashboard/memory/page.tsx` yanzu **Studio ne mai shafuka 3**:

### Shafi: Ƙwaƙwalwa

- Katin bayani (mai iya naɗewa na bayanin "Yadda yake aiki").
- Jerin lokaci-ainihi, bincike, da rarraba shafuka (jinkirin 300 ms).
- Tace nau'i (`factual` / `episodic` / `procedural` / `semantic` / duka).
- Tagar ƙara ƙwaƙwalwa (maɓalli, abun ciki, nau'i).
- Gyara a layi (maɓallin fensir → `PUT /api/memory/[id]`).
- Share kowane layi (tare da akwatin tabbatarwa).
- Fitar da JSON na shafin yanzu; shigo da JSON ta hanyar mai zaɓar fayil.
- Katunan ƙididdiga: `totalEntries`, `tokensUsed`, `hitRate`.
- Maɓallin "Taƙaita tsofaffi" → `POST /api/memory/summarize` (gwajin farko
  yana nuna adadin 'yan takara, sannan a tabbatar).
- Alamar lafiya kore/ja wadda `GET /api/memory/health` ke sarrafawa.

### Shafi: Playground

- Filin tambaya + mai zaɓar dabara (Exact / Semantic / Hybrid) + kasafin token.
- "Gwada kwaikwayo" → `POST /api/memory/retrieve-preview` — yana nuna sakamakon
  da aka jera tare da `score`, `tier`, `tokens`, `vecScore`, `ftsScore`.
- Kwamitin tantancewa da ke nuna tushen embedding / ma'ajiyar vector da aka yi
  amfani da su da kuma ko an koma ga madadin.

### Shafi: Engine

- Kwamitin matsayin engine (alamar keyword FTS5, alamar embedding, alamar
  ma'ajiyar vector, alamar lafiyar Qdrant, alamar rerank).
- Maɓallin "Sake Fihirisa Yanzu" → `POST /api/memory/reindex`.
- Mai zaɓar tushen embedding (auto / remote / static / transformers + maɓallan kunnawa).
- Katin saitin Qdrant (maɓallin kunnawa, host/port/collection/key, gwajin
  haɗi, gwajin binciken semantic, tsaftacewa).
- Katin saitin rerank (maɓallin kunnawa, mai zaɓar provider/model).

Saitunan Memory da Qdrant kuma suna ƙarƙashin
`/dashboard/settings → Memory & Skills` (`MemorySkillsTab.tsx`) don
tsohuwar fuskar saituna ta gama-gari.

## Adana Bayanai na Wucin Gadi

`src/lib/memory/store.ts` yana riƙe da cache irin na LRU a cikin tsari
(`MEMORY_CACHE_TTL = 1 min`, `MEMORY_MAX_CACHE_SIZE = 500`, tare da korar tsofaffin
kashi 20 %) don karatun `getMemory(id)`, tare da matakin `memoryCache` na
maɓalli/ƙima na gama-gari (`src/lib/memory/cache.ts`) mai hanyoyin
`get`/`set`/`invalidate`, wanda masu kira masu son nasu cache mai keɓantacciyar
iyaka suke amfani da shi (LRU mai shigarwa 1 000, TTL na asali minti 5).

## Sirri & Zagayowar Rayuwa

- Mallakar ƙwaƙwalwa tana amfani da id na maɓallin API (`resolveMemoryOwnerId` a cikin
  `chatCore.ts`). Idan babu `apiKeyInfo.id`, ba za a gudanar da dawo da bayanai,
  shigarwa, ko fitarwa ba.
- Ana tace shigarwar da ke da `expires_at` na nan gaba daga sakamakon dawo da
  bayanai; ana cire tsofaffin shigarwar da suka wuce `retentionDays` ta hanyar
  sharadin `created_at >= cutoff` a cikin `retrieveMemories`.
- Don gogewa ta dindindin, yi amfani da `DELETE /api/memory/[id]` ko `omniroute_memory_clear`.
- Ana gudanar da fitarwa ba tare da jiran sakamako ba ta hanyar `setImmediate`;
  ana rubuta gazawarta ƙarƙashin `memory.extraction.background.failed` kuma ba a
  taɓa nuna ta ga mai kiran ba.
- Zagayen tabbatarwa (`verifyExtractionPipeline`) suna share nasu shigarwar
  gwaji a cikin tubalin `finally`.

## Duba Kuma

- [SKILLS.md](./SKILLS.md) — saitin `skillsEnabled` yana shigar da
  ma’anonin kayan aiki tare da ƙwaƙwalwa.
- [MCP-SERVER.md](./MCP-SERVER.md) — jigilar MCP / iyakokin izini.
- [API_REFERENCE.md](../reference/API_REFERENCE.md) — cikakken faɗin API.
- Modulan tushe:
  - `src/lib/memory/types.ts`, `schemas.ts`
  - `src/lib/memory/store.ts`, `retrieval.ts`, `injection.ts`, `reindex.ts`
  - `src/lib/memory/extraction.ts`, `summarization.ts`, `verify.ts`
  - `src/lib/memory/settings.ts`, `qdrant.ts`, `cache.ts`
  - `src/lib/memory/vectorStore.ts` — sqlite-vec + gaurayayyen RRF
  - `src/lib/memory/embedding/index.ts` — shimfiɗar embedding mai tushe da yawa
  - `src/lib/memory/embedding/types.ts`, `remote.ts`, `staticPotion.ts`,
    `transformersLocal.ts`, `cache.ts`
  - `src/shared/schemas/memory.ts` — tsarin Zod ga dukkan jikin API na ƙwaƙwalwa
  - `src/shared/schemas/qdrant.ts` — tsarin Zod don saituna/ayyukan Qdrant
  - `src/lib/db/memoryVec.ts` — CRUD don `memory_vec_meta`
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
  - `src/app/api/settings/qdrant/route.ts` + ƙananan hanyoyi
  - `src/app/(dashboard)/dashboard/memory/` — UI na Studio (shafi + ɓangarori +
    shafuka + hooks)
  - `open-sse/handlers/chatCore.ts` (haɗin shigarwa / fitarwa)
  - `open-sse/mcp-server/tools/memoryTools.ts`

---

## Zaɓar Mai Samar da Embedding (v3.8.16+)

Injin ƙwaƙwalwar OmniRoute yana goyon bayan **tushen embedding guda huɗu** (`src/lib/memory/embedding/`). Kowannensu yana da bambancin fa’ida da rashin fa’ida dangane da **jinkiri, kuɗi, ingancin samfuri, da sarƙaƙƙiyar saiti**.

### Tushen Embedding

| Mai samarwa    | Tushe                                                 | Jinkiri                             | Kuɗi                 | Inganci                                 | Saiti                                            |
| -------------- | ----------------------------------------------------- | ----------------------------------- | -------------------- | --------------------------------------- | ------------------------------------------------ |
| `transformers` | Samfurin ONNX na gida (Xenova/all-MiniLM-L6-v2)       | ~50-150ms (CPU)                     | Kyauta               | Mai kyau                                | `npm install` kawai                              |
| `static`       | Vectors da aka riga aka lissafa (cached)              | <1ms                                | Kyauta               | Bai shafa ba (ya danganta da cache hit) | Babu                                             |
| `remote`       | API na OpenAI / Cohere / Voyage                       | ~100-300ms                          | $0.02-0.10/1M tokens | Madalla                                 | Maɓallin API                                     |
| `auto`         | Yana zaɓar mafi kyawun tushe da ake da shi yayin aiki | Daidai da tushen da aka zaɓa        | Kyauta               | Daidai da tushen da aka zaɓa            | Babu                                             |
| _(cache)_      | Shimfiɗar LRU ta cikin ƙwaƙwalwa a kan kowane tushe   | <1ms (hit), cikakken jinkiri (miss) | Kyauta               | Daidai da tushen da ke ƙasa             | Kullum a kunne (ba tushe ne da za a iya zaɓa ba) |

### Bishiyar Yanke Shawara

```
                  Mene ne yanayin turawar tsarin ku?
                  │
      ┌───────────┼───────────┬──────────────┐
      │           │           │              │
  HAƁAKAWA/    ƘARAMIN PROD  BABBAN PROD   EDGE / BA TARE
  GWAJI                                      DA INTANET BA
      │           │           │              │
      ▼           ▼           ▼              ▼
  transformers transformers remote (Qdrant) transformers
  (kyauta, babu API)        (mafi inganci)   (babu intanet)
      │           │           │              │
      └────────┬──┴───────────┴──────────────┘
               │
               ▼
            KULLUM ƙara shimfiɗar `cache` a sama
            (`LruCache` yana naɗe kowane mai samarwa)
```

### Tsarin Bayanan Bayanai & Saitin API

Ana saita zaɓuɓɓukan embedding na ƙwaƙwalwa ta hanyar API/UI na Saituna, ba ta hanyar environment variables ba. Maɓallan da suka dace na bayanan saituna ƙarƙashin Saituna (`normalizeMemorySettings` a cikin `src/lib/memory/settings.ts`) su ne:

- `memoryEmbeddingSource`: `"transformers"` (na gida), `"remote"` (mai amfani da API, misali OpenAI), `"static"` (ma’ajiyar waje), ko `"auto"`
- `memoryEmbeddingProviderModel`: Mai gano samfuri don tushen remote/static (misali, `"text-embedding-3-small"`)
- `memoryTransformersEnabled`: `true` | `false`
- `memoryStaticEnabled`: `true` | `false`
- `memoryVectorStore`: `"sqlite-vec"`, `"qdrant"`, ko `"auto"`

#### Samfurin Gida (`transformers`)

Yana amfani da transformers.js a ciki don gudanar da samfuran gida:

```bash
# Environment variables da ake karantawa a cikin lamba (src/lib/memory/embedding/index.ts):
MEMORY_TRANSFORMERS_MODEL=Xenova/all-MiniLM-L6-v2  # Ma'ajiyar samfurin HF
MEMORY_STATIC_MODEL=minishlab/potion-base-8M       # Samfurin static potion na HF
MEMORY_STATIC_CACHE_DIR=<DATA_DIR>/embeddings      # Kundin cache
```

#### Cache na LRU Embedding

Cache yana kunne ta tsohuwa koyaushe kuma ana saita shi ta hanyar environment variables:

```bash
MEMORY_EMBEDDING_CACHE_MAX=1000                    # Matsakaicin abubuwan da aka adana a cache
MEMORY_EMBEDDING_CACHE_TTL_MS=300000               # TTL (mintuna 5)
```

### Alƙaluman Aiki

Gwajin ma'auni a kan sabar x86 mai ƙwayoyi 4 da aka saba amfani da ita (rubutu ~tokens 100 kowanne):

| Mai samarwa          | p50   | p95   | p99   | Kuɗi / embeddings miliyan 1        |
| -------------------- | ----- | ----- | ----- | ---------------------------------- |
| `transformers` (CPU) | 80ms  | 180ms | 350ms | Kyauta                             |
| `remote` (OpenAI)    | 120ms | 220ms | 400ms | ~$0.02 (ada-002) / $0.13 (3-large) |
| `static` (Qdrant)    | 15ms  | 30ms  | 60ms  | Ya danganta da masaukin Qdrant     |
| `cache` (an samu)    | <1ms  | <1ms  | 2ms   | Kyauta                             |

---

## Tsarin Ciro Bayanai (v3.8.16+)

Modulin `extraction.ts` (`src/lib/memory/extraction.ts`) yana amfani da **daidaita tsarin regex** don ciro bayanai masu tsari daga saƙonnin tattaunawa. Fahimtar waɗannan tsare-tsare yana taimaka maka daidaita ingancin ciro bayanai gwargwadon yanayin amfaninka.

### Rukunonin Tsari na Asali

| Rukuni              | Misalin tsari                                                        | Abin da ake kamawa                 |
| ------------------- | -------------------------------------------------------------------- | ---------------------------------- |
| PREFERENCE_PATTERNS | `"Na fi son <X>"`, `"Ina son <X>"`, `"Na ƙi <X>"`                    | Abubuwan da mai amfani ya fi so    |
| DECISION_PATTERNS   | `"Zan yi amfani da <X>"`, `"Na yanke shawarar <X>"`, `"Na zaɓi <X>"` | Shawarwarin mai amfani (na aukuwa) |
| PATTERN_PATTERNS    | `"Yawanci ina <X>"`, `"Koyaushe ina <X>"`, `"Ban taɓa <X>"`          | Tsarukan ɗabi'a masu ɗorewa        |

### Misalan Tsare-tsare (An Sauƙaƙa)

```ts
// Daga src/lib/memory/extraction.ts
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

### Abin da Ake Ciro

Lokacin da mai amfani ya ce:

> "Na fi son TypeScript. Zan yi amfani da Postgres don wannan aikin. Koyaushe ina yin commit kafin pushing. Ba na son Python."
> Ciro bayanan yana samar da abubuwan ƙwaƙwalwa guda 4:
>
> | Maɓalli                              | Rukuni            | Nau'i      | Abun ciki                   |
> | ------------------------------------ | ----------------- | ---------- | --------------------------- |
> | `preference:typescript`              | abin da aka fi so | na gaskiya | "TypeScript"                |
> | `decision:postgres_for_this_project` | shawara           | na aukuwa  | "Postgres don wannan aikin" |
> | `pattern:commit_before_pushing`      | tsari             | na gaskiya | "yin commit kafin pushing"  |
> | `preference:python`                  | abin da aka fi so | na gaskiya | "Python"                    |

### Iyakokin Ciro Bayanai

Don hana ciro bayanai fiye da kima, ana amfani da iyakoki masu zuwa:

| Mafi ƙarancin tsawon abun ciki | haruffa 3 |
| Mafi girman tsawon abun ciki | haruffa 500 |

### Lokacin da Ya Kamata a Kashe Ciro Bayanai

Ciro bayanai yana gudana ta atomatik a duk lokacin da aka kunna ƙwaƙwalwa; babu wani maɓalli na musamman
don ciro bayanai kaɗai. Don kashe shi, kashe ƙwaƙwalwa gaba ɗaya (`enabled: false`
ta hanyar `PUT /api/settings/memory`). Ka yi la'akari da yin hakan idan:

- Kana da saƙonni masu yawa kuma kuɗin ciro bayanan ba ƙarami ba ne
- Yawancin tattaunawoyinka na ɗan lokaci ne kawai (hira, gyaran kurakurai) ba tare da amfanin dogon lokaci ba
- Tuni kana tattara mahallin bayanai ta hanyar keɓaɓɓun plugins

---

## Daidaita Hybrid RRF (v3.8.16+)

Algoritim ɗin **Reciprocal Rank Fusion (RRF)** yana haɗa sakamakon FTS5 (kalmar bincike) da vector (na ma'ana). Ma'aunin `k` yana sarrafa yawan nauyin da ake bai wa sakamakon da ke ƙananan matsayi.

### Tsarin Lissafi

Ga kowane abin ƙwaƙwalwa da ake tantancewa, makin RRF shi ne:

```
RRF(d) = Σ  1 / (k + rank_i(d))
```

Inda:

- `k` shi ne ƙayyadadden adadi (asali 60)
- `rank_i(d)` shi ne matsayin takardar `d` a tsarin dawo da bayanai na i-th (FTS, vector)
- Ana yin jimillar a kan dukkan tsarin dawo da bayanai

### Yadda `k` Ke Shafar Sakamako

| Ƙimar `k`          | Tasiri                                                                                              | Ya fi dacewa da                                          |
| ------------------ | --------------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| `k=0`              | Haɗa matsayi kai tsaye (ba tare da sassautawa ba)                                                   | Ma'aunin tushe na ƙa'ida                                 |
| `k=10-30`          | Yana bai wa sakamakon farko nauyi sosai, ƙananan matsayi ba sa ba da gudummawa sosai                | Lokacin da sakamakon farko guda 3 yawanci daidai ne      |
| **`k=60`** (asali) | Daidaitacce — duk sakamakon farko guda 10 suna ba da gudummawa mai ma'ana                           | Dawo da bayanai na gaba ɗaya                             |
| `k=100+`           | Ya fi shimfiɗa — har sakamakon ƙananan matsayi na iya rinjaye idan ya bayyana a tsare-tsare da yawa | Lokacin da recall > precision yake da matuƙar muhimmanci |

### Daidaita `k` a Aiki

```bash
# Na asali
MEMORY_RRF_K=60

# Tsauraran precision (ƙaramin ƙwaƙwalwa, takardu kaɗan)
MEMORY_RRF_K=20

# Matsakaicin recall (babban ƙwaƙwalwa, tambayoyi iri-iri)
MEMORY_RRF_K=120
```

**Misali da `k=20`:**

- Matsayin FTS na 1 → gudummawa `1/21 = 0.048`
- Matsayin FTS na 10 → gudummawa `1/30 = 0.033`
- Matsayin vector na 1 → gudummawa `0.048`
- Matsakaicin haɗaɗɗen maki: `0.096`

**Misali da `k=60`:**

- Matsayin FTS na 1 → gudummawa `1/61 = 0.016`
- Matsayin FTS na 10 → gudummawa `1/70 = 0.014`
- Matsayin vector na 1 → gudummawa `0.016`
- Matsakaicin haɗaɗɗen maki: `0.033`

Idan `k` ya fi girma, **bambancin dangantaka** tsakanin na farko da na matsayi na 10 yana raguwa, don haka algoritim ɗin yana ƙara dogaro da **yarjejeniya tsakanin tsarin dawo da bayanai** maimakon amincewa da matsayi na farko.

### Lokacin da Ya Kamata a Canza `k`

| Alama                                                           | Gwada                                                                   |
| --------------------------------------------------------------- | ----------------------------------------------------------------------- |
| Sakamakon farko kullum yana yin nasara, amma kuskure ne         | **Rage** k (misali, 20) — amincewa da matsayi na farko ta fi muhimmanci |
| Amsar daidai tana cikin sakamako 5 na farko amma ba ta farko ba | **Ƙara** k (misali, 100) — shimfiɗa makin yana ƙarfafa yarjejeniya      |
| Recall yana da yawa amma precision yana da ƙasa                 | **Rage** k — ƙara kaifin jerin matsayi                                  |
| Recall yana da ƙasa (ana rasa takardun da suka dace)            | **Ƙara** k — bai wa takardu masu ƙananan matsayi dama                   |

### Nauyin RRF

Haɗa matsayi ta hanyar reciprocal rank fusion yana amfani da nauyi iri ɗaya ga matsayin semantic vector da matsayin binciken cikakken rubutu:

```
RRF(d) = 1/(k + rank_vector) + 1/(k + rank_fts)
```

Babu environment variables don daidaita kowane nauyi daban-daban (`MEMORY_RRF_VECTOR_WEIGHT`/`MEMORY_RRF_FTS_WEIGHT` babu su).

---

## Dabarar Taƙaitawa (v3.8.16+)

Manhajar `summarization.ts` (`src/lib/memory/summarization.ts`) tana matse tsofaffin bayanai domin kiyaye saitin da ake amfani da shi ƙarami tare da riƙe damar tuno su.

### Lokacin da Taƙaitawa ke Farawa

| Abin da ke Farawa      | Iyaka (na asali) |
| ---------------------- | ---------------- |
| Farawa da hannu ta API | bai shafa ba     |

### Abin da Ake Taƙaitawa

Ana fitar da wuraren shiga guda biyu daga `summarization.ts`:

- **`summarizeMemories(apiKeyId, sessionId?, maxTokens = 4000)`** — yana taƙaita
  bayanan zaman zuwa rubutun taƙaitawa guda ɗaya wanda aka iyakance da kasafin token.
- **`summarizeMemoriesOlderThan(apiKeyId, days, dryRun)`** — matsewa bisa shekaru
  da API ke amfani da shi: yana zaɓar kowane bayani da ya girmi `days`, ya gina
  taƙaitaccen bayani guda ɗaya daga cikinsu, sannan (idan `dryRun` ya kasance `false`) ya goge
  na asali. Shigar da `dryRun: true` domin ganin samfotin saitin da za a zaɓa da jimillar token
  ba tare da sauya komai ba.

Babu matakin haɗa bayanai bisa tag/key ko ƙididdigar "core vs summarizable" ga kowane bayani —
zaɓin ya dogara ne kawai da iyakar shekaru, kuma rubutun taƙaitawar layi ne da aka matse,
wanda aka fara da nau'i, ga kowane ɗan takara.

### Fara Taƙaitawa

Taƙaitawa **ta hannu ce / sai an zaɓa** — saitin `autoSummarize` yana kasancewa `false` ta
asali, don haka ba a matse komai kai-tsaye. Fara shi ta API:

```bash
curl -X POST http://localhost:20128/api/memory/summarize \
  -H "Authorization: Bearer $OMNIROUTE_KEY"
```

Domin barin sa a kashe, kawai riƙe `autoSummarize` a ƙimarsa ta asali (`false`).

### Shawarwari Don Ingancin Taƙaitawa

- **Fara da samfoti ta amfani da `dryRun`** — `summarizeMemoriesOlderThan(..., true)` yana dawo da
  jerin waɗanda za a zaɓa da jimillar adadin token domin ka tabbatar da abin da za a haɗa
  kafin a goge na asali.
- **Gudanar da taƙaitawa a lokutan da cunkoso ya yi ƙasa** idan kana da tarin bayanai mai yawa — kiran LLM shi ne ɓangaren da ke ɗaukar lokaci

```bash
# Salon Cron: yi taƙaitawa kowace rana da ƙarfe 3 na safe
0 3 * * * curl -X POST http://localhost:20128/api/memory/summarize \
  -H "Authorization: Bearer $OMNIROUTE_KEY"
```

---

## Tsarin Mai Bayar da MemoryBackend

> **Tushen gaskiya:** `src/lib/memory/backend.ts`, `src/lib/memory/genericBackend.ts`, `src/lib/memory/manager.ts`
> **Gwaje-gwaje:** `src/lib/memory/__tests__/generic-backend.test.ts`

Tsarin mai bayar da MemoryBackend yana gabatar da **matakin keɓantawa na backend mai sauƙin sauyawa** a saman injin bayanai da ake da shi. Maimakon a ɗaure shi da aiwatarwar ma'ajiya guda ɗaya, tsarin bayanai yanzu yana goyon bayan backend da yawa (SQLite, Obsidian, Notion, backend na HTTP na musamman) tare da zaɓuɓɓukan daidaita turawar primary/fallback.

### Tsarin Gina

```
┌──────────────────────────────────────────────────────────┐
│                    Hanyoyin API                           │
│            (src/app/api/memory/route.ts)                  │
└──────────────────────┬───────────────────────────────────┘
                       │
┌──────────────────────▼───────────────────────────────────┐
│                   MemoryManager                           │
│        Mai tsara aiki na Singleton (manager.ts)           │
│                                                          │
│  Na Farko ──► Backend A  (misali SQLite)                 │
│  Madadin  ──► Backend B  (misali Obsidian)               │
│               Backend C  (misali Notion ta GenericBackend)│
└──────────────────────┬───────────────────────────────────┘
                       │
        ┌──────────────┼──────────────┐
        ▼              ▼              ▼
┌────────────┐ ┌────────────┐ ┌──────────────────┐
│ SQLite     │ │ Obsidian   │ │ GenericMemory    │
│ Backend    │ │ Backend    │ │ Backend (HTTP)   │
└────────────┘ └────────────┘ └──────────────────┘
```

#### Babban Interface (`backend.ts`)

Dole ne kowane backend ya aiwatar da interface na `MemoryBackend`:

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

  // Bincike
  search(config: SearchConfig): Promise<Memory[]>;

  // Lafiya
  health(): Promise<HealthCheckResult>;

  // Zagayowar rayuwa (na zaɓi)
  initialize?(): Promise<void>;
  shutdown?(): Promise<void>;
}
```

#### MemoryManager (`manager.ts`)

Mai tsara aiki na Singleton wanda:

- Yana **rajistar** backend ta `register(backend)` — ana kiransa lokacin farawa daga `index.ts`
- Yana **daidaita** primary + fallback ta `configure(primary, fallbacks)`
- Yana **tura** CRUD/bincike zuwa primary, tare da jerin fallback idan an samu gazawa
- Yana yin **duba lafiyar** dukkan backend lokaci-lokaci

**Halin fallback:**

| Aiki     | Primary               | Fallbacks                        |
| -------- | --------------------- | -------------------------------- |
| `create` | ✅ Primary kawai      | ❌                               |
| `get`    | ✅ Fara gwada primary | ✅ Fallback idan null            |
| `update` | ✅ Primary kawai      | ✅ Daidaitawa ba tare da jira ba |
| `delete` | ✅ Primary kawai      | ✅ Daidaitawa ba tare da jira ba |
| `list`   | ✅ Primary kawai      | ❌                               |
| `search` | ✅ Primary da farko   | ✅ Fallback idan an samu kuskure |

#### GenericMemoryBackend (`genericBackend.ts`)

Mai haɗin HTTP na gama-gari wanda yake daidaita kowace REST API ta zama MemoryBackend. Yana da amfani ga:

- **Notion** — haɗa ta Notion API
- **Obsidian** — haɗa ta Obsidian Local REST API
- **Backend na musamman** — duk wata sabis da ke samar da RESTful memory API

**Daidaitawa:**

```typescript
interface GenericBackendConfig {
  baseUrl: string;           // Tushen URL na API ɗin backend
  apiKey?: string;           // Alamar Bearer don tantancewa
  headers?: Record<string, string>;  // Keɓaɓɓun taken HTTP
  timeout?: number;          // Lokacin ƙarewar buƙata (tsoho: 30000ms)
  backendType?: string;      // Don yin rajista

  // Sauya endpoints (tsoffin ƙimomi suna amfani da ƙa'idojin REST)
  endpoints?: {
    search?: string;   // tsoho: "/memories/search"
    create?: string;   // tsoho: "/memories"
    list?: string;     // tsoho: "/memories"
    get?: string;      // tsoho: "/memories/{id}"
    update?: string;   // tsoho: "/memories/{id}"
    delete?: string;   // tsoho: "/memories/{id}"
    health?: string;   // tsoho: "/health"
  };

  // Daidaita sunayen sigogin tambaya
  queryParams?: {
    query?/apiKeyId?/limit?/offset?/strategy?/maxTokens?/type?/sessionId?/orderBy?/orderDir?/options?
  };

  // Daidaita sunayen sigogin hanya
  pathParams?: {
    id?/memoryId?
  };
}
```

**Sanannun backends** an riga an saita su a cikin `KNOWN_BACKENDS`:

```typescript
createKnownBackend("obsidian"); // → GenericMemoryBackend da aka nuna zuwa localhost:27123
createKnownBackend("notion"); // → GenericMemoryBackend da aka nuna zuwa api.notion.com/v1
```

#### Backends da Aka Gina a Ciki

##### SQLiteBackend (`sqliteBackend.ts`)

Tsohon babban backend. Yana naɗe ma'ajiyar ƙwaƙwalwar da ke amfani da SQLite ta hanyar `src/lib/memory/store.ts`. Ana yi masa rajista ta atomatik yayin farawa.

```typescript
import { sqliteBackend } from "./sqliteBackend";
memoryManager.register(sqliteBackend);
```

##### ObsidianBackend (`obsidianBackend.ts`)

Yana naɗe haɗin Obsidian da ake da shi (`src/lib/memory/obsidianBackend.ts`). Yana haɗuwa da ma'ajiyar Obsidian ta hanyar Obsidian Local REST API.

### Saituna

Ana adana saitunan backend na ƙwaƙwalwa a teburin saitunan manhaja kuma ana sarrafa su ta hanyar `src/lib/memory/settings.ts`:

| Saiti               | Maɓallin Muhalli/Saiti   | Tsoho      | Bayani                               |
| ------------------- | ------------------------ | ---------- | ------------------------------------ |
| Babban backend      | `memoryPrimaryBackend`   | `"sqlite"` | ID na babban backend                 |
| Backends na madadin | `memoryFallbackBackends` | `[]`       | ID na backends na madadin bisa jeri  |
| Saitunan backend    | `memoryBackendConfigs`   | `{}`       | Sauye-sauyen saiti na kowane backend |

Ana daidaita saituna ta hanyar `normalizeMemorySettings()` kuma ana adana su a cache a `getMemorySettings()`.

### Tsarin Farawa

```
Fara manhaja
  → shigo da index.ts (sakamako na gefe): yana yi wa SQLiteBackend rajista
  → ana kiran initMemoryBackends() daga zagayowar rayuwar manhaja:
      1. Loda saituna (getMemorySettings)
      2. Saita babban backend + na madadin
      3. Fara dukkan backends (duba lafiya)
      4. Shirye don karɓar buƙatu
```

### Ƙara Sabon Backend

1. **Aiwatar da interface ɗin `MemoryBackend`** a cikin `src/lib/memory/<name>Backend.ts`
2. **Fitar da shi** daga `src/lib/memory/index.ts`
3. **Yi rajista** da `memoryManager.register(yourBackend)` yayin farawa
4. **Saita shi** ta cikin saituna: saita `memoryPrimaryBackend` zuwa ID na backend ɗinka
5. **Gwada shi** ta amfani da `src/lib/memory/__tests__/generic-backend.test.ts` a matsayin abin dubawa

#### Misali: Brain Backend

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

### Tabbatarwa

#### Gwaje-gwajen sashe

```bash
npx vitest run src/lib/memory/__tests__/generic-backend.test.ts --reporter=verbose
```

Fitowar da ake tsammani: **gwaje-gwaje 35, duk sun yi nasara** waɗanda suka ƙunshi:

- Constructor (2)
- Duba lafiya (4) — nasara, gazawar 500, kuskuren hanyar sadarwa, jinkiri
- Initialize (2) — nasara, gazawa
- Create (2) — tsohon endpoint, keɓaɓɓen endpoint
- Get (4) — nasara, 404 → null, jefa kuskure idan ba 404 ba, keɓaɓɓun sigogin hanya
- Update (2) — nasara, 404 → false
- Delete (2) — nasara, 404 → false
- List (2) — sigogin tambaya, keɓaɓɓun sunayen sigogi
- Search (3) — sigogin tambaya, keɓaɓɓen endpoint, jera options
- Taken tantancewa (2) — alamar Bearer, keɓaɓɓun taken
- Factory (1)

#### Duba nau'i

```bash
npm run typecheck:core
```

Abin da ake tsammani: **kurakurai 0**.
