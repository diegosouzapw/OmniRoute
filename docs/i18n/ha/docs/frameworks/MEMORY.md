# Memory System (Hausa)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/MEMORY.md) · 🇪🇹 [am](../../../am/docs/frameworks/MEMORY.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/MEMORY.md) · 🇦🇿 [az](../../../az/docs/frameworks/MEMORY.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/MEMORY.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/MEMORY.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/MEMORY.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/MEMORY.md) · 🇩🇰 [da](../../../da/docs/frameworks/MEMORY.md) · 🇩🇪 [de](../../../de/docs/frameworks/MEMORY.md) · 🇬🇷 [el](../../../el/docs/frameworks/MEMORY.md) · 🇪🇸 [es](../../../es/docs/frameworks/MEMORY.md) · 🇪🇪 [et](../../../et/docs/frameworks/MEMORY.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/MEMORY.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/MEMORY.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/MEMORY.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/MEMORY.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/MEMORY.md) · 🇮🇱 [he](../../../he/docs/frameworks/MEMORY.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/MEMORY.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/MEMORY.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/MEMORY.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/MEMORY.md) · 🇮🇩 [id](../../../id/docs/frameworks/MEMORY.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/MEMORY.md) · 🇮🇹 [it](../../../it/docs/frameworks/MEMORY.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/MEMORY.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/MEMORY.md) · 🇰🇭 [km](../../../km/docs/frameworks/MEMORY.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/MEMORY.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/MEMORY.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/MEMORY.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/MEMORY.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/MEMORY.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/MEMORY.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/MEMORY.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/MEMORY.md) · 🇲🇲 [my](../../../my/docs/frameworks/MEMORY.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/MEMORY.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/MEMORY.md) · 🇳🇴 [no](../../../no/docs/frameworks/MEMORY.md) · 🇮🇳 [or](../../../or/docs/frameworks/MEMORY.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/MEMORY.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/MEMORY.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/MEMORY.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/MEMORY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/MEMORY.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/MEMORY.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/MEMORY.md) · 🇱🇰 [si](../../../si/docs/frameworks/MEMORY.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/MEMORY.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/MEMORY.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/MEMORY.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/MEMORY.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/MEMORY.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/MEMORY.md) · 🇮🇳 [te](../../../te/docs/frameworks/MEMORY.md) · 🇹🇭 [th](../../../th/docs/frameworks/MEMORY.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/MEMORY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/MEMORY.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/MEMORY.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/MEMORY.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/MEMORY.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/MEMORY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/MEMORY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/MEMORY.md)

---

> **Tushen gaskiya:** `src/lib/memory/` da `src/app/api/memory/`
> **Sabuntawa ta ƙarshe:** 2026-06-28 — v3.8.40 (a kashe ta tsohuwa + cike gibin quantization na int8)

OmniRoute yana samar da ma’adanar tattaunawa mai ɗorewa wadda aka ware bisa API key (da
session id idan ana so). Ana cire abubuwan tunawa kai tsaye daga amsoshin LLM
ta hanyar daidaita tsarin regex mai sauƙi, sannan a sake saka su cikin buƙatu
na gaba a matsayin saƙon system na farko (ko saƙon user na farko ga masu samarwa waɗanda
ba sa karɓar rawar system).

> **Memory tana KASHE ta tsohuwa (v3.8.30+).** `DEFAULT_MEMORY_SETTINGS.enabled`
> yanzu `false` ce (`src/lib/memory/settings.ts`). Kunna memory yana saka har zuwa
> `maxTokens` (~2k) na mahallin da aka dawo da shi cikin **kowace** buƙatar chat, wanda
> ake cajinsa — kuɗin da ba a zata ba ga sabbin shigarwa da abokan ciniki waɗanda ke sarrafa
> nasu mahallin. Yi zaɓin shiga a sarari ƙarƙashin **Settings → Memory** (`MemorySkillsTab`
> yana nuna gargaɗin kuɗin token lokacin da aka kunna memory).
> Abokin ciniki zai iya cire buƙata guda daga memory ta amfani da header ɗin buƙata
> `x-omniroute-no-memory` (`true`/`1`/`yes`) — duba teburin header na buƙata a
> [API_REFERENCE.md](../reference/API_REFERENCE.md). Buƙatar no-memory tana saita
> `memoryOwnerId = null`, wanda ke kashe **duka biyun** saka memory da skill ga
> wannan buƙatar (`open-sse/handlers/chatCore/headers.ts::isNoMemoryRequested`).

An **keɓance memory ga kowane API key**, ba ga kowane mai amfani ba — duk buƙatar da aka tantance
da API key iri ɗaya tana amfani da tafkin memory iri ɗaya, tare da ƙarin
keɓancewa ta `sessionId` idan ana so.

## Tsarin gine-gine

```
Abokin ciniki → /v1/chat/completions (an warware apiKeyInfo a sama)
  → handleChatCore() [open-sse/handlers/chatCore.ts]
    → resolveMemoryOwnerId(apiKeyInfo)        # yana fitar da id
    → getMemorySettings()                     # saituna da aka adana a cache
    → shouldInjectMemory(body, {enabled})     # ƙofar sarrafawa
    → retrieveMemories(apiKeyId, config)      # SQL + FTS5 + vector na zaɓi
    → injectMemory(body, memories, provider)  # saƙon system ko user
  → kira zuwa mai samarwa na waje
  → kan amsa: extractFacts(text, apiKeyId, sessionId)  # ba ya toshewa
    → setImmediate → createMemory(fact) ga kowane abin da ya dace
                   → embed(content) + upsertVector(id, vec)
```

An haɗa wuraren kiran sakawa da cirewa a cikin
`open-sse/handlers/chatCore.ts` (nemo `retrieveMemories`, `injectMemory`,
da `extractFacts`).

## Tsarin injin (warwarewa mai matakai 3)

Memory Engine yana tantance hanyar dawo da bayanai a lokacin aiki bisa ababen more rayuwa
da saitunan da ake da su. Akwai matakai uku, waɗanda ake amfani da su bisa jerin fifiko:

```
  ┌─────────────────────────────────────────────────────────────┐
  │  MATAKI 0 — Kalma mai muhimmanci (FTS5)                     │
  │  Samuwa bisa gwaji: FTS5 idan tsarin SQLite                  │
  │  yana goyon bayansa (better-sqlite3 / node:sqlite / bun:sqlite);│
  │  ba ya samuwa a tsarin da ba shi da FTS5 (misali sql.js/WASM —│
  │  "no such module: fts5"). Ana amfani da shi idan strategy =  │
  │  "exact" ko a matsayin madadin; keyword na engine-status     │
  │  yana nuna sakamakon gwajin.                                 │
  └──────────────────────────────────┬──────────────────────────┘
                                     │ strategy = semantic|hybrid?
                                     ▼
  ┌─────────────────────────────────────────────────────────────┐
  │  MATAKI 1 — Embedded Vector (sqlite-vec)                     │
  │  Ana loda sqlite-vec v0.1.9 ta db.loadExtension().           │
  │  Binciken KNN kai tsaye a kan vector na Float32. Yana aiki idan:│
  │   • loda sqlite-vec ta loadExtension ya yi nasara            │
  │   • Akwai tushen embedding (remote | static |                │
  │     transformers) da zai iya samar da Float32Array           │
  │   • teburin vec_memories yana nan (ana ƙirƙirarsa a ready()  │
  │     na farko)                                                 │
  └──────────────────────────────────┬──────────────────────────┘
                                     │ qdrant.enabled?
                                     ▼
  ┌─────────────────────────────────────────────────────────────┐
  │  MATAKI 2 — Qdrant (ma’ajiyar bayanan vector ta waje ta zaɓi)│
  │  Idan an kunna, yana maye gurbin sqlite-vec don semantic/hybrid.│
  │  Yana buƙatar Qdrant mai aiki + host/port da aka saita.      │
  └─────────────────────────────────────────────────────────────┘
```

Rage mataki yana faruwa kai tsaye kuma ba tare da ɓoyayyen tasiri ba:

- Idan sqlite-vec ya kasa loduwa, mataki na 1 ba zai samu ba → sai a koma mataki na 0.
- Idan tushen embedding ya dawo da kuskure, mataki na 1 zai koma mataki na 0.
- Idan Qdrant ba ya cikin ƙoshin lafiya, mataki na 2 zai koma mataki na 1 (ko mataki na 0 idan mataki na 1
  shi ma ba ya samuwa).

## Tushen embedding

Layer ɗin embedding (`src/lib/memory/embedding/`) yana tantance tushen da za a yi amfani da shi
bisa `MemorySettingsExtended.embeddingSource`:

| Tushe          | Bayani                                                                                       | Ana buƙatar maɓalli | Farawa daga sanyi |
| -------------- | -------------------------------------------------------------------------------------------- | ------------------- | ----------------- |
| `remote`       | Yana amfani da API na embedding na mai samarwa da aka saita (OpenAI, Cohere, da sauransu)    | Eh                  | Babu              |
| `static`       | Embedding na gida ta hanyar jadawalin bincike na `potion-base-8M` (WordPiece + mean pooling) | A'a                 | ~200ms            |
| `transformers` | Gudanar da inference na ONNX a gida ta `@huggingface/transformers` v4, `all-MiniLM-L6-v2`    | A'a                 | ~3s + ~400MB RAM  |
| `auto`         | Tantancewa lokacin gudana: remote (idan akwai maɓalli) → static → transformers → null        | Ya danganta         | Ya danganta       |

**Tsarin tantancewa na `auto`:**

1. Nemo mai samarwa na farko a cikin `listEmbeddingProviders()` mai `hasKey === true` → `remote`.
2. Idan `settings.staticEnabled === true` → `static`.
3. Idan `settings.transformersEnabled === true` → `transformers`.
4. In ba haka ba → `null` (yana koma wa binciken kalmomi na FTS5).

Ma'ajiyar wucin-gadi ta embedding (`src/lib/memory/embedding/cache.ts`) tana amfani da taswirar
LRU da ke cikin ƙwaƙwalwar aiki, wadda maɓallinta shi ne `${source}:${model}:${dim}:${sha256(text)}`, kuma aka iyakance ta zuwa
shigarwar `MEMORY_EMBEDDING_CACHE_MAX` (tsoho 1000) tare da TTL na
`MEMORY_EMBEDDING_CACHE_TTL_MS` (tsoho mintuna 5). Ana raba ta tsakanin duk masu kira
a tsawon rayuwar kowace process.

## RRF Haɗaɗɗe (k=60)

Lokacin da `strategy = "hybrid"` kuma akwai ma'ajiyar vector, aikin dawo da bayanai yana amfani da
Reciprocal Rank Fusion don haɗa sakamakon FTS5 da na vector:

```
RRF(d) = Σ  1 / (k + rank_i(d))      inda k = 60 (ana iya saita shi ta MEMORY_RRF_K)
          i
```

A zahiri:

1. Gudanar da binciken FTS5 → jerin da aka jera `R_fts` (matsayi 1..N).
2. Gudanar da binciken vector na KNN → jerin da aka jera `R_vec` (matsayi 1..M).
3. Ga kowane `memoryId` na musamman:  
   `rrf_score = 1/(60 + fts_rank)` + `1/(60 + vec_rank)` (0 idan ba ya cikin jerin).
4. Jera bisa `rrf_score` DESC, sannan a yi amfani da zagayen kasafin token.

An san RRF da yin aiki yadda ya kamata ba tare da buƙatar daidaita makin tsakanin
tsarukan dawo da bayanai masu bambanci ba. Tsohon ƙimar `k=60` ta fito ne daga ainihin
takardar Cormack et al. kuma tana aiki sosai ga ƙananan kundin bayanai (<10k memories).

## Cike gibin baya (lazy + reindex)

Lokacin da samfurin embedding ya canza (wanda ake ganowa ta `embedding_signature`),
ana sake gina ma'ajiyar vector kuma ana yi wa duk memories da ke akwai alamar
`needs_reindex = 1` a cikin teburin `memories`.

**Cike gibin baya na lazy**: A aikin dawo da bayanai na gaba, duk wani memory da ba shi da shigarwar vector
za a yi masa embedding kuma a saka shi cikin `vec_memories` kafin a fara binciken. Wannan
yana rarraba kuɗin cike gibin baya a kan buƙatu na ainihi ba tare da toshe farawa ba.

**Sake yin fihirisa kai tsaye**: Shafin Engine da ke `/dashboard/memory` yana samar da
maɓallin "Sake Yin Fihirisa Yanzu" wanda ke kiran `POST /api/memory/reindex`. Handler ɗin yana kiran
`runReindexBatch()` daga `src/lib/memory/reindex.ts`, wanda ke sarrafa har zuwa
shigarwar da ke jira guda `limit` a kowace buƙata. Ana iya duba ci gaban lokaci-lokaci ta
`GET /api/memory/engine-status` (`vectorStore.needsReindex`).

Teburin `memory_vec_meta` (migration `083_memory_vec.sql`) yana adana:

- `active_dim` — girman vector na yanzu (null = ba a daidaita ba tukuna).
- `embedding_signature` — `${source}:${model}:${dim}` da ake amfani da shi don gano canje-canje.
- `last_reset_at` — timestamp na sake saitawa gaba ɗaya na ƙarshe.
- `vec_loaded` — tutar 0/1 da ke nuna ko an loda sqlite-vec cikin nasara.

## Faɗaɗa saituna

Akwai filayen embedding da vector guda tara a cikin `MemorySettingsExtended` da ke
`src/shared/schemas/memory.ts`, waɗanda ake adanawa ta hanyar `src/lib/db/settings.ts`:

| Fili                     | Nau'i                                              | Na asali | Bayani                                                            |
| ------------------------ | -------------------------------------------------- | -------- | ----------------------------------------------------------------- |
| `embeddingSource`        | `"remote" \| "static" \| "transformers" \| "auto"` | `"auto"` | Tushen embedding da za a yi amfani da shi                         |
| `embeddingProviderModel` | `string \| null`                                   | `null`   | Mai samarwa/model a tsarin `provider/model`                       |
| `customBaseUrl`          | `string \| null`                                   | `null`   | URL na asalin endpoint mai dacewa da OpenAI don Memory kawai      |
| `customModelId`          | `string \| null`                                   | `null`   | ID na model da ake aikawa zuwa endpoint na musamman               |
| `transformersEnabled`    | `boolean`                                          | `false`  | Zaɓin shiga don Transformers.js (MiniLM, ~400MB)                  |
| `staticEnabled`          | `boolean`                                          | `false`  | Zaɓin shiga don model na cikin gida static potion-base-8M         |
| `rerankEnabled`          | `boolean`                                          | `false`  | Kunna matakin sake tsara matsayi (yana ƙara +200-500ms/req)       |
| `rerankProviderModel`    | `string \| null`                                   | `null`   | Mai samarwa/model na sake tsara matsayi a tsarin `provider/model` |

Ana tantance `rerankProviderModel` ta hanyar `POST /v1/rerank` (ana kiransa ta loopback), don haka yana karɓar duk abin da wannan route ɗin ke karɓa: zaɓaɓɓen model na sake tsara matsayi na cloud (`cohere/rerank-v3.5`, `jina-ai/jina-reranker-v3.5`, …) ko node na mai samarwa mai dacewa da OpenAI a matsayin `<node-prefix>/<model>` (misali `skilled-mini/bge-reranker-v2-m3` don akwatin TEI/Infinity). Nodes na loopback koyaushe sun cancanta; node da ke kan wani host (LAN, Tailscale) kuma yana buƙatar feature flag na `RERANK_REMOTE_PROVIDER_NODES` kuma dole ne ya bi ƙa'idar URL mai fita ta mai samarwa — duba [Feature Flags](../reference/FEATURE_FLAGS.md). Mai zaɓen dashboard yana jera zaɓaɓɓun masu samarwa tare da nodes na cikin gida; ana iya saita kowane ingantaccen string na `provider/model` kai tsaye ta hanyar `PUT /api/settings/memory`.
| `vectorStore` | `"sqlite-vec" \| "qdrant" \| "auto"` | `"auto"` | Backend na vector da za a yi amfani da shi |

Ana samar da waɗannan ta hanyar `GET /PUT /api/settings/memory` (schema `MemorySettingsExtendedSchema`).

Don tushen `remote`, Memory kuma yana karɓar saitunan `customBaseUrl` da
`customModelId` na zaɓi. Tare suna zaɓar endpoint na `/embeddings` mai dacewa da
OpenAI da kuma model ba tare da canza rajistar embedding ta duniya ba. Ana daidaita
endpoint kafin amfani kuma ana bincikarsa ta ƙa'idar URL mai fita ta mai samarwa:
ana buƙatar HTTP(S), ana ƙin bayanan shiga da aka saka a ciki da query strings,
kuma ana ci gaba da toshe adiresoshin metadata na cloud. Ƙimomin da babu komai suna
barin zaɓaɓɓen mai samarwa na rajista yadda yake. Ana tsabtace kurakuran da ake
mayarwa dashboard, kuma ba a taɓa rubuta bayanan shiga na endpoint a log ba.

> **TODO (D20):** Ba a aiwatar da scope na `global` (raba memories tsakanin dukkan
> API keys) a wannan sakin ba. Yana buƙatar canje-canjen schema da hanyar retrieval
> ta duniya. A bibiyi wannan daban.

## Matakan Ma'ajiya

### Na Farko: SQLite (teburin `memories`)

Hijirar `015_create_memories.sql` ce ta ƙirƙire shi:

| Ginshiƙi                    | Nau'i              | Bayanan kula                                                           |
| --------------------------- | ------------------ | ---------------------------------------------------------------------- |
| `id`                        | `TEXT PRIMARY KEY` | UUID da aka samar ta hanyar `crypto.randomUUID()`                      |
| `api_key_id`                | `TEXT NOT NULL`    | Maɓallin API mai mallaka                                               |
| `session_id`                | `TEXT`             | Iyakokin kowace tattaunawa na zaɓi                                     |
| `type`                      | `TEXT NOT NULL`    | Ɗaya daga cikin `factual`, `episodic`, `procedural`, `semantic`        |
| `key`                       | `TEXT`             | Tsayayyen maɓallin upsert, misali `preference:i_prefer_python`         |
| `content`                   | `TEXT NOT NULL`    | Ainihin rubutun bayani                                                 |
| `metadata`                  | `TEXT`             | Tarin JSON (category, extractedAt, source, ...)                        |
| `created_at` / `updated_at` | `TEXT`             | Kirtanin ISO 8601                                                      |
| `expires_at`                | `TEXT`             | Ƙarewar wa'adi ta zaɓi; `NULL` na nufin dindindin                      |
| `memory_id`                 | `INTEGER UNIQUE`   | `023_fix_memory_fts_uuid.sql` ya ƙara shi don haɗa UUIDs ↔ FTS5 rowids |

Fihirisa: `api_key_id`, `session_id`, `type`, `expires_at`, tare da fihirisar
`memory_id` ta musamman.

**Ma'anar Upsert**: `createMemory()` yana neman layin da ke akwai mai
`(api_key_id, key)` iri ɗaya, sannan ya sabunta shi a wurinsa idan an same shi
(yana haɗa `metadata` ta hanyar shallow spread). Wannan yana hana teburin ci gaba
da girma ba tare da iyaka ba saboda maimaita bayanan zaɓi.

### Binciken Cikakken Rubutu (teburin kama-da-wane na `memory_fts`)

`022_add_memory_fts5.sql` yana ƙirƙirar teburin kama-da-wane na FTS5 bisa
`content` da `key`. `023_fix_memory_fts_uuid.sql` yana gyara wata matsala ta
ainihin amfani inda UUID na maɓallin farko bai haɗu da integer rowid na FTS5 ba
— hijirar tana ƙara ginshiƙin `memory_id`, tana sake ƙirƙirar teburin FTS, sannan
tana haɗa triggers (`memory_fts_ai`, `memory_fts_ad`, `memory_fts_au`) waɗanda
ke daidaita FTS yayin INSERT, DELETE, da UPDATE.

`retrieval.ts` yana amfani da shi don dabarun `semantic` da `hybrid` (duba ƙasa).
Lambar dawo da bayanai tana yin kariya da `hasTable("memory_fts")`, sannan tana
komawa ga jerin lokaci idan teburin FTS bai wanzu ba ko kuma tambayar FTS ta
jawo kuskure.

### Na Zaɓi: Qdrant (mataki na 2 na ma'ajiyar vector)

`src/lib/memory/qdrant.ts` yana aiwatar da haɗin Qdrant na zaɓi a matsayin mataki
na 2 na ma'ajiyar vector. Dawo da bayanai yana karkata zuwa Qdrant ne kawai idan
mai zaɓin injin `memoryVectorStore === "qdrant"` — tsohon saitin `"auto"` (da
`"sqlite-vec"`) **ba sa taɓa** zaɓar Qdrant. Maɓallin kunnawa/kashewa na shafin
Engine yana saita **duka** `qdrantEnabled` da `memoryVectorStore` tare: kunnawa
yana sanya Qdrant ya zama ma'ajiya ta farko, yayin da kashewa ke mayar da shi zuwa
`"auto"` (#5597 — kafin wannan gyaran, kunnawa ba ya yin tasiri domin babu abin
da ke rubutawa zuwa mai zaɓin injin). Idan ba a iya isa ga Qdrant ba ko bai dawo
da komai ba, dawo da bayanai yana komawa ga sqlite-vec → FTS5.

- `upsertSemanticMemoryPoint()` — saka `key + content` cikin embedding ta amfani
  da samfurin embedding da aka saita, tabbatar da cewa collection ɗin yana nan
  (yana ƙirƙirar vectors masu cosine-distance a amfani na farko), sannan a yi
  upsert na point mai payload `{memoryId,
apiKeyId, sessionId, key, content, metadata, createdAtUnix, expiresAtUnix}`.
- `searchSemanticMemory(query, topK, scope)` — saka query cikin embedding, bincika
  collection ɗin da aka tace da `kind = "omniroute_memory"` kuma, idan an zaɓa,
  da `apiKeyId` / `sessionId`. Yana iyakance `topK` zuwa `[1, 20]`.
- `deleteSemanticMemoryPoint(id)` — share point guda ɗaya. `deleteMemory()` ne
  ke kiransa bayan an cire layin SQLite (D15).
- `cleanupSemanticMemoryPoints({retentionDays})` — share points da yawa waɗanda
  `expiresAtUnix` ɗinsu ya wuce ko kuma `createdAtUnix` ɗinsu ya girmi iyakar
  lokacin riƙewa. Yana fara ƙidayawa domin dashboard ya iya nuna ainihin lambobi.
- `checkQdrantHealth()` — gwajin lafiya na `GET /readyz` tare da latency.

UI na saituna yana samar da tsarin Qdrant, gwajin lafiya, gwajin binciken
semantic, da tsaftacewa a cikin **shafin Engine** na `/dashboard/memory`.
Dukkan routes masu alaƙa da ke ƙarƙashin `src/app/api/settings/qdrant/` an haɗa
su tun daga v3.8.6:

| Route                                   | Hanya         | Bayani                               |
| --------------------------------------- | ------------- | ------------------------------------ |
| `/api/settings/qdrant`                  | `GET` / `PUT` | Karanta / sabunta saitunan Qdrant    |
| `/api/settings/qdrant/health`           | `GET`         | Gwajin kasancewa a raye + latency    |
| `/api/settings/qdrant/search`           | `POST`        | Gwajin binciken semantic             |
| `/api/settings/qdrant/cleanup`          | `POST`        | Cire points da suka ƙare / tsufa     |
| `/api/settings/qdrant/embedding-models` | `GET`         | Jera samfuran embedding da ake da su |

**Bayanan halayya (abin da za a yi tsammani):**

- **Zaɓin engine** — kunna Qdrant a shafin Engine yana sanya shi babban
  ma'ajiyar bayanai (yana saita `memoryVectorStore="qdrant"`); kashe shi yana mayar da saitin zuwa `"auto"` (#5597).
- **Babu cike bayanan baya** — ƙwaƙwalwar da aka ƙirƙira/sabunta **bayan** an kunna Qdrant kaɗai ake
  rubutawa a cikinsa (rubutu biyu na fire-and-forget). Ƙwaƙwalwar SQLite da ta riga ta kasance **ba a**
  ƙaura da ita; "Sake Gina Fihirisa Yanzu" yana sake gina fihirisar sqlite-vec kaɗai, ba ta Qdrant ba.
- **Ana gano girman vector ta atomatik** daga embedding na ainihi a amfani na farko — babu
  filin girma da za a cike. Sauya samfurin embedding bayan an riga an ƙirƙiri collection
  **ba a** sarrafa shi ta atomatik: ana barin collection ɗin da yake akwai yadda yake, rubuce-rubuce/bincike
  masu rashin daidaiton girma suna gaza kuma su koma sqlite-vec. Sake ƙirƙirar collection ɗin
  (sabon suna, ko share shi a Qdrant) don sauya embedder.
- **Ma'aunin tazara** — koyaushe **Cosine** ne (an kayyade shi kai-tsaye lokacin ƙirƙirar collection; ba
  za a iya daidaita shi ba).
- **Tabbatar da izini** — maɓallin API kawai (ana aika shi a matsayin header na `api-key`; ba dole ba ne ga
  Docker na gida wanda ba ya buƙatar tabbatar da izini). Ba a amfani da JWT/RBAC.
- **Filayen saiti** — UI yana nuna `host`, `port`, `collection`, `embeddingModel`,
  `apiKey`. `vectorSize` / `hnswEfConstruct` na env/DB ne kawai, kuma ba a amfani da `vectorSize`
  wajen ƙirƙirar collection (ana samo girman daga embedding).

### Ƙididdigar vector (int8 — sai an zaɓa, a duka backend)

Duka backend na vector suna goyon bayan **ƙididdigar int8 da sai an zaɓa** don rage yawan
ƙwaƙwalwar da vector da aka adana ke amfani da ita (~sau 4 ƙasa da Float32), tare da ɗan raguwar ingancin dawo da sakamako.
Tsohon saiti shi ne **a kashe** a duka biyun — vector suna ci gaba da kasancewa da cikakken daidaito sai an
kunna shi kai-tsaye.

| Backend    | Saiti                              | Nau'i                          | Tsohon saiti | Inda ake karantawa                                          |
| ---------- | ---------------------------------- | ------------------------------ | ------------ | ----------------------------------------------------------- |
| Qdrant     | `qdrantQuantization` (maɓallin DB) | `"none" \| "int8" \| "binary"` | `"none"`     | `src/lib/memory/qdrant.ts::normalizeQdrantConfig()`         |
| sqlite-vec | `MEMORY_VEC_QUANTIZATION` (env)    | `"none" \| "int8"`             | `"none"`     | `src/lib/memory/vectorStore.ts::requestedVecQuantization()` |

- Ana saita **Qdrant** ga kowane instance ta hanyar maɓallin saitin `qdrantQuantization`
  (wanda ake nunawa a matsayin filin `quantization` a `PUT /api/settings/qdrant`). Lokacin da
  yake `"int8"`, `buildQuantizationConfig()` yana neman ƙididdigar scalar
  (`always_ram`, quantile `0.99`), kuma bincike yana kunna `rescore: true` domin
  vector masu cikakken daidaito su tace jerin candidates na int8.
- Ƙididdigar **sqlite-vec** ta **muhalli kawai** ce (ba saitin DB ba): saita
  `MEMORY_VEC_QUANTIZATION=int8` don adana vector na gida a matsayin column na `int8[dim]`
  ta hanyar `vec_quantize_int8(?, 'unit')`. Ana haɗa yanayin da aka zaɓa cikin
  `embedding_signature` (suffix na `:int8`), don haka sauya yanayi yana jawo cikakken
  sake gina fihirisar table na `vec_memories` — hanyar lazy-backfill iri ɗaya da ake amfani da ita lokacin da
  samfurin embedding ya sauya.

## Nau’ikan Ƙwaƙwalwa

`MemoryType` (`src/lib/memory/types.ts`):

| Nau’i        | Abin da ake amfani da shi don                                                        |
| ------------ | ------------------------------------------------------------------------------------ |
| `factual`    | Zaɓuɓɓuka, tabbatattun bayanan mai amfani, tsarin ɗabi’a                             |
| `episodic`   | Shawarwarin da ke da alaƙa da wani takamaiman lokaci ("Na zaɓi Postgres")            |
| `procedural` | Ƙwaƙwalwar tsarin aiki / yadda ake yi (an keɓe; babu mai cirewa ta atomatik a yanzu) |
| `semantic`   | An keɓe don shigarwar vector-store                                                   |

Dabarar dawo da bayanai ta `MemoryConfig` tana ɗaya daga cikin `exact`, `semantic`, ko `hybrid`,
kuma iyakarta tana ɗaya daga cikin `session`, `apiKey`, ko `global`. Tsohuwar iyakar da ake samu daga
`getMemorySettings()` ita ce `apiKey`.

## Cire Bayanai (`extraction.ts`)

Ana yin cire bayanai ne bisa **regex**, ba bisa LLM ba — yana gudana a cikin tsari ta amfani da
`setImmediate()` don haka ba ya taɓa tare rafin amsa:

- **Tsarin zaɓi** → `MemoryType.FACTUAL`
  (misali `Na fi son …`, `Ina matuƙar son …`, `wanda na fi so shi ne …`, `Na ƙi …`)
- **Tsarin shawara** → `MemoryType.EPISODIC`
  (misali `Zan yi amfani da …`, `Na zaɓi …`, `Na ɗauki …`, `Zan fara amfani da …`)
- **Tsarin ɗabi’a** → `MemoryType.FACTUAL`
  (misali `Yawanci ina …`, `Kullum ina …`, `Na saba …`)

Ana tsabtace kowace daidaituwa (`trim`, haɗa sararin-fari, iyakancewa zuwa haruffa 500),
ana cire maimaituwa a cikin rukuni ta amfani da tabbataccen `factKey(category, content)`, sannan
a adana ta ta hanyar `createMemory()` tare da metadata
`{category, extractedAt, source: "llm_response"}`. Ana iyakance rubutun shigarwa zuwa
64 KiB (`MAX_EXTRACTION_TEXT_LENGTH`) — idan ya fi haka tsawo, ana amfani da **ƙarshen** rubutun
domin tabbatar da cewa sabon abun cikin mataimaki koyaushe yana shiga.

Ana fitar da `extractFactsFromText(text)` don gwaje-gwaje, kuma yana mayar da bayanan da aka tsara
ba tare da adana su ba.

## Dawo da Bayanai (`retrieval.ts`)

`retrieveMemories(apiKeyId, config)` ita ce babbar mashigar aiki. Tana:

1. Daidaitawa da tabbatar da config ta hanyar `MemoryConfigSchema`.
2. Mayar da `[]` nan take idan `enabled` ƙarya ne ko `maxTokens <= 0`.
3. Takaita `maxTokens` zuwa `[1, 8000]`.
4. Gano ko teburin zamani na `memories` yana nan (saɓanin tsohon teburin `memory`)
   domin tsofaffin ma’ajin bayanai su ci gaba da aiki.
5. Gina ainihin query tare da kariyar ƙarewar wa’adi
   (`expires_at IS NULL OR datetime(expires_at) > datetime('now')`), iyakar
   session ta zaɓi, da ranar yankewar `retentionDays` ta zaɓi.
6. Rarrabewa bisa dabara:
   - **`exact`** (tsoho): jerin lokaci `ORDER BY created_at DESC LIMIT 100`.
   - **`semantic`**: idan `config.query` da `memory_fts` suna nan, a yi JOIN da
     `memory_fts MATCH ?` sannan a tsara bisa matsayin FTS; a koma ga jerin lokaci
     idan FTS ya mayar da layuka 0.
   - **`hybrid`**: haɗin sakamakon FTS (mafi muhimmanci) da
     jerin lokaci, tare da cire maimaituwa bisa id.
7. Ƙididdige makin dacewar kalmomi (`getRelevanceScore`) a kan
   `content`, `key`, da JSON na `metadata` idan an bayar da query. Ana tace layukan
   da makinsu sifili ne.
8. Tsarawa bisa score daga mafi girma, sannan `createdAt` daga mafi sabo.
9. Bi cikin jerin da aka tsara bisa matsayi tare da karɓar shigarwa muddin jimillar
   `estimateTokens(content)` (≈ `length / 4`) ba ta wuce kasafin ba. Koyaushe
   yana mayar da aƙalla shigarwa ɗaya idan an sami wata da ta dace.

Ana fitar da `estimateTokens`, kuma dawo da bayanai, taƙaitawa, da kayan aikin MCP
`omniroute_memory_search` suna amfani da shi.

## Shigarwa (`injection.ts`)

`injectMemory(request, memories, provider)`:

1. Yana haɗa duk abubuwan da ke cikin ƙwaƙwalwa zuwa zaren `Memory context: …` guda ɗaya.
2. Yana zaɓar dabara bisa sunan mai samarwa:
   - **Saƙon tsarin** (tsoho ga OpenAI, Anthropic, Gemini, …) — yana ƙara
     `{role: "system", content: memoryText}` a gaban duk wani saƙon tsarin da
     yake akwai domin har yanzu umarnin tsarin mai amfani ya kasance da fifiko.
   - **Saƙon mai amfani** (madadin) — ga masu samarwa da ke cikin
     `PROVIDERS_WITHOUT_SYSTEM_MESSAGE`: `o1`, `o1-mini`, `o1-preview`,
     `glm`, `glmt`, `glm-cn`, `zai`, `qianfan`. Waɗannan suna ƙin rawar tsarin
     kuma in ba haka ba za su mayar da 400 (duba matsala #1701 don GLM/Zhipu).
3. Yana rubuta adadi, dabara, da samfurin a ƙarƙashin `memory.injection.injected`.

Ana fitar da `providerSupportsSystemMessage(provider)` don masu kira da ke buƙatar
yanke nasu shawarar zaɓin hanya. Masu samarwa da ba a sani ba suna komawa zuwa `true`
(an yarda da rawar tsarin) don aminci.

## Saituna (`settings.ts`)

Ana **adana saitunan ƙwaƙwalwa a cikin jadawalin saitunan DB**, ba a cikin masu canjin muhalli ba.
`getMemorySettings()` yana karantawa daga `getSettings()` kuma yana ma'ajiyar sakamakon
a cikin tsari mai gudana; hanyar PUT ta saituna tana kiran
`invalidateMemorySettingsCache()` bayan rubutawa.

### Filayen gado (duk nau'ikan)

| Mabuɗin DB            | Nau'i   | Tsoho                                                 | Ikon UI                                                              |
| --------------------- | ------- | ----------------------------------------------------- | -------------------------------------------------------------------- |
| `memoryEnabled`       | boolean | `false` (a kashe ta tsohuwa tun daga v3.8.30)         | Kunna/kashe ƙwaƙwalwa                                                |
| `memoryMaxTokens`     | integer | `2000` (kewayo `0–16000`)                             | Kasafin token don shigarwa                                           |
| `memoryRetentionDays` | integer | `30` (kewayo `1–365`)                                 | Tsawon lokacin riƙewa                                                |
| `memoryStrategy`      | enum    | `"hybrid"` (ɗaya daga `recent`, `semantic`, `hybrid`) | Dabarar dawo da bayanai                                              |
| `skillsEnabled`       | boolean | `false`                                               | Yana kunna/kashe shigar da ƙwarewa ga kowane mabuɗi (duba SKILLS.md) |

Lura: dabarar UI `"recent"` tana dacewa da dabarar dawo da bayanai ta ciki
`"exact"` ta hanyar `toMemoryRetrievalConfig()` (tsari bisa lokaci).

### Sabbin filaye (v3.8.6, tsari 21 D9)

Duba kuma sashen "Faɗaɗa saituna" da ke sama don bayanin filayen.

| Mabuɗin DB                  | Filin API                | Tsoho    |
| --------------------------- | ------------------------ | -------- |
| `memoryEmbeddingSource`     | `embeddingSource`        | `"auto"` |
| `memoryEmbeddingModel`      | `embeddingProviderModel` | `null`   |
| `memoryTransformersEnabled` | `transformersEnabled`    | `false`  |
| `memoryStaticEnabled`       | `staticEnabled`          | `false`  |
| `memoryRerankEnabled`       | `rerankEnabled`          | `false`  |
| `memoryRerankModel`         | `rerankProviderModel`    | `null`   |
| `memoryVectorStore`         | `vectorStore`            | `"auto"` |

`normalizeQdrantConfig()` da ke cikin `qdrant.ts` yana karanta mabuɗan DB masu alaƙa da
Qdrant (`qdrantEnabled`, `qdrantHost`, `qdrantPort`,
`qdrantApiKey`, `qdrantCollection` mai tsohon ƙima `"omniroute_memory"`,
`qdrantEmbeddingModel` mai tsohon ƙima `"openai/text-embedding-3-small"`).

### Masu canjin muhalli (v3.8.6)

Masu canjin muhalli na zaɓi guda shida suna daidaita halayen injin yayin aiki (an rubuta bayaninsu a cikin `.env.example`):

| Mai canji                       | Tsoho                      | Bayani                                                                                                                                                      |
| ------------------------------- | -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `MEMORY_EMBEDDING_CACHE_TTL_MS` | `300000`                   | TTL na ma'ajiyar embedding (minti 5)                                                                                                                        |
| `MEMORY_EMBEDDING_CACHE_MAX`    | `1000`                     | Matsakaicin adadin shigarwar da ke cikin ma'ajiyar embedding ta LRU                                                                                         |
| `MEMORY_TRANSFORMERS_MODEL`     | `Xenova/all-MiniLM-L6-v2`  | Ma'ajiyar HF don samfurin Transformers.js                                                                                                                   |
| `MEMORY_STATIC_MODEL`           | `minishlab/potion-base-8M` | Ma'ajiyar HF don samfurin potion na tsayayyen nau'i                                                                                                         |
| `MEMORY_STATIC_CACHE_DIR`       | `<DATA_DIR>/embeddings`    | Inda za a adana samfuran da aka sauke                                                                                                                       |
| `MEMORY_VEC_TOP_K`              | `20`                       | Tsohon top-K don binciken vector                                                                                                                            |
| `MEMORY_RRF_K`                  | `60`                       | Ƙimar k ta RRF don binciken hybrid                                                                                                                          |
| `MEMORY_VEC_QUANTIZATION`       | `none`                     | Saita zuwa `int8` don adana vector na sqlite-vec na gida da aka rage daidaitonsu (~sau 4 ƙanana; sai an zaɓa). Sauya yanayi yana tilasta sake yin fihirisa. |

## Taƙaitawa (`summarization.ts`)

`summarizeMemories(apiKeyId, sessionId?, maxTokens = 4000)` yana taƙaita tsohon
abun ciki idan jimillar tokens da ke gudana a cikin memories na wani key ta wuce
kasafin da aka ware. Yana bi ta rows a tsarin DESC bisa `created_at`, yana riƙe rows
da suka dace da kasafin, sannan ga sauran yana maye gurbin `content` a wurinsa da
jimloli uku na farko na asalin abun ciki. `tokensSaved` shi ne bambancin
`estimateTokens` tsakanin tsohon da sabon abun ciki.

Wannan routine ɗin **yana samuwa amma ba a kiransa ta atomatik** a cikin chat
pipeline na yanzu — kira shi daga cron, admin action, ko haɗin
`MemoryConfig.autoSummarize` idan kana buƙatar ci gaba da taƙaitawa. Asarar bayanan
ta hanya ɗaya ce: ana sake rubuta asalin rubutun.

## REST API

Duk endpoints suna buƙatar management auth (`requireManagementAuth`).

### Muhimman memory endpoints (na yanzu + waɗanda aka sabunta)

| Method   | Path                 | Bayani                                                                                                                                                                                            |
| -------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `GET`    | `/api/memory`        | Jerin da aka raba shafuka tare da filters: `apiKeyId`, `type`, `sessionId`, `q`, `limit`, `page`, `offset`. Response ya haɗa da `stats.total`, `stats.tokensUsed`, `stats.hitRate`, `cacheStats`  |
| `POST`   | `/api/memory`        | Ƙirƙiri entry (wanda Zod ya tantance: `content`, `key`, `type` na zaɓi, `sessionId`, `apiKeyId`, `metadata`, `expiresAt`). Yana kiran `createMemory()` wanda ke yin upsert bisa `(apiKeyId, key)` |
| `GET`    | `/api/memory/[id]`   | Ɗauko entry guda ta UUID                                                                                                                                                                          |
| `PUT`    | `/api/memory/[id]`   | Sabunta fields na entry (`type`, `key`, `content`, `metadata`). Body: `MemoryUpdatePutSchema`. Haka kuma yana daidaita vector idan embedding source yana samuwa.                                  |
| `DELETE` | `/api/memory/[id]`   | Goge entry; haka kuma yana gogewa daga `vec_memories` (D15) da Qdrant gwargwadon iko. Yana mayar da 404 idan babu entry ɗin.                                                                      |
| `GET`    | `/api/memory/health` | Yana gudanar da `verifyExtractionPipeline("health-check")` — ƙirƙira→jera→gogewa na zagaye cikakke. Yana mayar da `{working, latencyMs, error?}`                                                  |

### Sabbin memory engine endpoints (tsari na 21)

| Method | Path                              | Bayani                                                                                                                                                                                   |
| ------ | --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `POST` | `/api/memory/retrieve-preview`    | Gwajin da ba ya aiwatar da canji na `retrieveMemories` — yana mayar da sakamakon da aka jera tare da score, tier, tokens. Body: `RetrievePreviewSchema`. BA ya inject ko gyara memories. |
| `GET`  | `/api/memory/embedding-providers` | Yana jera providers tare da embedding models, yana nuna waɗanda suke da API key da aka saita.                                                                                            |
| `GET`  | `/api/memory/engine-status`       | Yana mayar da cikakken matsayin engine: keyword tier, embedding resolution, vector store stats, lafiyar Qdrant, rerank config. Tsari: `MemoryEngineStatusSchema`.                        |
| `POST` | `/api/memory/summarize`           | Fara taƙaita memory da hannu. Body: `MemorySummarizeSchema` (`olderThanDays`, `apiKeyId?`, `dryRun`). Yana mayar da `{candidates, tokensSaved}`.                                         |
| `POST` | `/api/memory/reindex`             | Fara sake yin vector index ga memories masu `needs_reindex=1`. Body: `MemoryReindexSchema` (`force`). Yana mayar da `{started, pending}`.                                                |

### Settings endpoints

| Method | Path                                    | Bayani                                                                                                 |
| ------ | --------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `GET`  | `/api/settings/memory`                  | `MemorySettingsExtended` na yanzu da aka daidaita (sabbin fields 7 + legacy)                           |
| `PUT`  | `/api/settings/memory`                  | Sabunta kowane field daga `MemorySettingsExtendedSchema` (fields 12 gaba ɗaya)                         |
| `GET`  | `/api/settings/qdrant`                  | Settings na Qdrant na yanzu (`QdrantSettingsSchema`)                                                   |
| `PUT`  | `/api/settings/qdrant`                  | Sabunta settings na Qdrant. Body: `QdrantSettingsUpdateSchema`. `apiKey` = empty string yana cire key. |
| `GET`  | `/api/settings/qdrant/health`           | Liveness probe kan Qdrant instance da aka saita. Yana mayar da `QdrantHealthResultSchema`.             |
| `POST` | `/api/settings/qdrant/search`           | Gwajin semantic search kan Qdrant. Body: `QdrantSearchSchema` (`query`, `topK`).                       |
| `POST` | `/api/settings/qdrant/cleanup`          | Cire Qdrant points na memories da wa'adinsu ya ƙare / tsofaffi.                                        |
| `GET`  | `/api/settings/qdrant/embedding-models` | Jera embedding models da suke samuwa ga Qdrant.                                                        |

Query na jerin `/api/memory` yana goyon bayan pagination bisa `page`
(`parsePaginationParams`) **ko** `offset` kai tsaye — idan `offset` yana nan, shi
ne yake da fifiko sannan a ƙididdige `page` daga gare shi don tsarin response.

## Kayan Aikin MCP (`open-sse/mcp-server/tools/memoryTools.ts`)

Lokacin da aka kunna uwar garken MCP, ana rajistar kayan aikin ƙwaƙwalwa guda uku:

- `omniroute_memory_search` — `{apiKeyId, query?, type?, maxTokens?, limit?}`
  → yana naɗe `retrieveMemories()`. Tun daga v3.8.6 (D16), ana karanta `strategy`
  daga `getMemorySettings()` maimakon a ƙayyade shi kai tsaye zuwa `"exact"`. Idan
  an samar da `query` kuma `strategy` ya kasance `semantic` ko `hybrid`, ana
  amfani da ma'ajiyar vector idan tana samuwa.
- `omniroute_memory_add` — `{apiKeyId, sessionId?, type, key, content,
metadata?}` → yana naɗe `createMemory()`. Yana karɓar nau'ukan hukuma guda 4 kawai:
  `factual`, `episodic`, `procedural`, `semantic` (D17).
- `omniroute_memory_clear` — `{apiKeyId, type?, olderThan?}` → yana jera
  shigarwar da suka dace, yana tace su bisa tambarin lokaci na kafin-ƙirƙira idan
  an zaɓa, sannan yana share kowannensu ta hanyar `deleteMemory()` (wanda kuma
  yake cire vectors daga sqlite-vec + Qdrant).

Duba [MCP-SERVER.md](./MCP-SERVER.md) don cikakkun bayanan jigilar bayanai da iyaka.

## Dashboard (Memory Studio)

`src/app/(dashboard)/dashboard/memory/page.tsx` yanzu **Studio mai shafuka 3** ne:

### Shafi: Memories

- Katin bayani (mai iya naɗewa na bayanin "Yadda yake aiki").
- Jeri na ainihin lokaci, bincike, da rarraba shafuka (an jinkirta daƙiƙa 300 ms).
- Tace nau'i (`factual` / `episodic` / `procedural` / `semantic` / duka).
- Modal na ƙara ƙwaƙwalwa (maɓalli, abun ciki, nau'i).
- Gyara kai tsaye (maɓallin fensir → `PUT /api/memory/[id]`).
- Share kowane layi (tare da akwatin tabbatarwa).
- Fitar da JSON na shafin da ake kai; shigo da JSON ta hanyar mai zaɓar fayil.
- Katunan ƙididdiga: `totalEntries`, `tokensUsed`, `hitRate`.
- Maɓallin "Taƙaita tsofaffi" → `POST /api/memory/summarize` (gwajin farko
  yana nuna adadin waɗanda suka cancanta, sannan ya nemi tabbaci).
- Koriyar/jajayen ɗigon lafiya wanda `GET /api/memory/health` ke sarrafawa.

### Shafi: Playground

- Filin tambaya + mai zaɓar dabarar (Exact / Semantic / Hybrid) + kasafin token.
- "Kwaikwaya" → `POST /api/memory/retrieve-preview` — yana nuna sakamakon da
  aka jera tare da `score`, `tier`, `tokens`, `vecScore`, `ftsScore`.
- Kwamitin tantancewa da ke nuna tushen embedding / ma'ajiyar vector da aka yi
  amfani da su da kuma ko an koma madadin.

### Shafi: Engine

- Kwamitin matsayin injin (alamar keyword FTS5, alamar embedding, alamar ma'ajiyar
  vector, alamar lafiyar Qdrant, alamar rerank).
- Maɓallin "Sake Gina Index Yanzu" → `POST /api/memory/reindex`.
- Mai zaɓar tushen embedding (auto / remote / static / transformers + maɓallan kunnawa).
- Katin saitunan Qdrant (maɓallin kunnawa, host/port/collection/key, gwada haɗi,
  gwajin binciken semantic, tsaftacewa).
- Katin saitunan rerank (maɓallin kunnawa, mai zaɓar provider/model).

Saitunan Memory da Qdrant kuma suna ƙarƙashin
`/dashboard/settings → Memory & Skills` (`MemorySkillsTab.tsx`) don
tsohuwar fuskar saituna ta gama-gari.

## Adana Bayanai na Ɗan Lokaci

`src/lib/memory/store.ts` yana riƙe da cache mai kama da LRU a cikin tsari
(`MEMORY_CACHE_TTL = 1 min`, `MEMORY_MAX_CACHE_SIZE = 500`, tare da korar
tsofaffin kashi 20 %) don karatun `getMemory(id)`, tare da shimfiɗar
`memoryCache` ta maɓalli/ƙima ta gama-gari (`src/lib/memory/cache.ts`) mai
hanyoyin `get`/`set`/`invalidate` waɗanda masu kira da ke son nasu cache mai
iyakantaccen fanni ke amfani da su (LRU mai shigarwa 1 000, tsohuwar TTL 5 min).

## Sirri & Zagayowar Rayuwa

- Mallakar ƙwaƙwalwa tana amfani da id na maɓallin API (`resolveMemoryOwnerId` a cikin
  `chatCore.ts`). Idan babu `apiKeyInfo.id`, dawo da bayanai ko shigarwa
  ko cire bayanai ba za su gudana ba.
- Ana tace bayanan da ke da `expires_at` na nan gaba daga sakamakon dawo da bayanai; tsofaffin
  bayanan da suka wuce `retentionDays` ana cire su ta hanyar sharadin
  `created_at >= cutoff` a cikin `retrieveMemories`.
- Don gogewa ta dindindin, yi amfani da `DELETE /api/memory/[id]` ko `omniroute_memory_clear`.
- Cire bayanai yana gudana a bango ba tare da jira ba ta hanyar `setImmediate`; ana rubuta gazawarsa ƙarƙashin
  `memory.extraction.background.failed` kuma ba a taɓa nuna ta ga mai kira.
- Zagayen tabbatarwa (`verifyExtractionPipeline`) suna share nasu
  bayanan gwaji a cikin bulon `finally`.

## Duba Kuma

- [SKILLS.md](./SKILLS.md) — saitin `skillsEnabled` yana shigar da ma’anonin kayan aiki
  tare da ƙwaƙwalwa.
- [MCP-SERVER.md](./MCP-SERVER.md) — jigilar MCP / iyakokin izini.
- [API_REFERENCE.md](../reference/API_REFERENCE.md) — faɗaɗɗen tsarin API.
- Manhajojin tushe:
  - `src/lib/memory/types.ts`, `schemas.ts`
  - `src/lib/memory/store.ts`, `retrieval.ts`, `injection.ts`, `reindex.ts`
  - `src/lib/memory/extraction.ts`, `summarization.ts`, `verify.ts`
  - `src/lib/memory/settings.ts`, `qdrant.ts`, `cache.ts`
  - `src/lib/memory/vectorStore.ts` — sqlite-vec + haɗaɗɗen RRF
  - `src/lib/memory/embedding/index.ts` — matakin embedding mai tushe da yawa
  - `src/lib/memory/embedding/types.ts`, `remote.ts`, `staticPotion.ts`,
    `transformersLocal.ts`, `cache.ts`
  - `src/shared/schemas/memory.ts` — tsare-tsaren Zod ga dukkan jikin buƙatun API na ƙwaƙwalwa
  - `src/shared/schemas/qdrant.ts` — tsare-tsaren Zod don saituna/ayyukan Qdrant
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
  - `open-sse/handlers/chatCore.ts` (haɗa shigarwa / cire bayanai)
  - `open-sse/mcp-server/tools/memoryTools.ts`

---

## Zaɓar Mai Bayar da Embedding (v3.8.16+)

Injin ƙwaƙwalwar OmniRoute yana goyon bayan **tushen embedding guda huɗu** (`src/lib/memory/embedding/`). Kowannensu yana da bambance-bambancen fifiko a **jinkiri, kuɗi, ingancin samfuri, da rikitarwar saiti**.

### Tushen Embedding

| Mai bayarwa    | Tushe                                                   | Jinkiri                                         | Kuɗi                 | Inganci                                 | Saiti                                            |
| -------------- | ------------------------------------------------------- | ----------------------------------------------- | -------------------- | --------------------------------------- | ------------------------------------------------ |
| `transformers` | Samfurin ONNX na cikin gida (Xenova/all-MiniLM-L6-v2)   | ~50-150ms (CPU)                                 | Kyauta               | Mai kyau                                | `npm install` kawai                              |
| `static`       | Vectors da aka riga aka lissafa (an cache)              | <1ms                                            | Kyauta               | Bai shafa ba (ya dogara da samun cache) | Babu                                             |
| `remote`       | API na OpenAI / Cohere / Voyage                         | ~100-300ms                                      | $0.02-0.10/1M tokens | Madalla                                 | Maɓallin API                                     |
| `auto`         | Yana zaɓar mafi kyawun tushe da ake samu lokacin gudana | Daidai da tushen da aka zaɓa                    | Kyauta               | Daidai da tushen da aka zaɓa            | Babu                                             |
| _(cache)_      | Matakin LRU na cikin ƙwaƙwalwa a kan kowane tushe       | <1ms (an samu), cikakken jinkiri (ba a samu ba) | Kyauta               | Daidai da tushen asali                  | Kullum a kunne (ba tushe ne da za a iya zaɓa ba) |

### Bishiyar Yanke Shawara

```
                  Mene ne mahallin turawar tsarin ku?
                  │
      ┌───────────┼───────────┬──────────────┐
      │           │           │              │
  HAƁAKAWA/    ƘARAMIN PROD  BABBAN PROD    EDGE / BA TARE
  GWAJI                                      DA INTANET BA
      │           │           │              │
      ▼           ▼           ▼              ▼
  transformers transformers remote (Qdrant) transformers
  (kyauta, babu API)         (mafi inganci)  (babu intanet)
      │           │           │              │
      └────────┬──┴───────────┴──────────────┘
               │
               ▼
            KULLUM ƙara matakin `cache` a sama
            (`LruCache` yana naɗe kowane mai bayarwa)
```

### Tsarin Bayanai & Saitin API

Ana saita zaɓuɓɓukan embedding na ƙwaƙwalwa ta API/UI na Saituna, ba ta environment variables ba. Maɓallan da suka dace na tsarin bayanan saituna ƙarƙashin Saituna (`normalizeMemorySettings` a cikin `src/lib/memory/settings.ts`) su ne:

- `memoryEmbeddingSource`: `"transformers"` (na cikin gida), `"remote"` (mai amfani da API, misali OpenAI), `"static"` (ma’ajiyar waje), ko `"auto"`
- `memoryEmbeddingProviderModel`: Mai gano samfuri don tushen remote/static (misali, `"text-embedding-3-small"`)
- `memoryTransformersEnabled`: `true` | `false`
- `memoryStaticEnabled`: `true` | `false`
- `memoryVectorStore`: `"sqlite-vec"`, `"qdrant"`, ko `"auto"`

#### Samfurin Cikin Gida (`transformers`)

Yana amfani da transformers.js a ciki don gudanar da samfuran cikin gida:

```bash
# Environment variables da ake karantawa a cikin lamba (src/lib/memory/embedding/index.ts):
MEMORY_TRANSFORMERS_MODEL=Xenova/all-MiniLM-L6-v2  # Ma'ajiyar samfurin HF
MEMORY_STATIC_MODEL=minishlab/potion-base-8M       # Samfurin static potion na HF
MEMORY_STATIC_CACHE_DIR=<DATA_DIR>/embeddings      # Kundin adireshin cache
```

#### Cache na LRU Embedding

Cache yana kunne koyaushe ta tsohuwa kuma ana saita shi ta environment variables:

```bash
MEMORY_EMBEDDING_CACHE_MAX=1000                    # Matsakaicin abubuwan da aka cache
MEMORY_EMBEDDING_CACHE_TTL_MS=300000               # TTL (minti 5)
```

### Alƙaluman Aiki

Gwajin ƙima a kan sabar x86 mai cibiya 4 ta yau da kullum (rubutu masu kusan token 100 kowanne):

| Mai samarwa          | p50   | p95   | p99   | Kuɗi / embeddings miliyan 1        |
| -------------------- | ----- | ----- | ----- | ---------------------------------- |
| `transformers` (CPU) | 80ms  | 180ms | 350ms | Kyauta                             |
| `remote` (OpenAI)    | 120ms | 220ms | 400ms | ~$0.02 (ada-002) / $0.13 (3-large) |
| `static` (Qdrant)    | 15ms  | 30ms  | 60ms  | Ya danganta da masaukin Qdrant     |
| `cache` (an samu)    | <1ms  | <1ms  | 2ms   | Kyauta                             |

---

## Tsarukan Ciro Bayanai (v3.8.16+)

Modulin `extraction.ts` (`src/lib/memory/extraction.ts`) yana amfani da **daidaita tsarin regex** don ciro bayanai masu tsari daga saƙonnin tattaunawa. Fahimtar waɗannan tsarukan yana taimaka maka daidaita ingancin ciro bayanai bisa ga yanayin amfaninka.

### Rukunonin Tsari na Asali

| Rukuni              | Misalin tsari                                                        | Abin da ake kamawa                 |
| ------------------- | -------------------------------------------------------------------- | ---------------------------------- |
| PREFERENCE_PATTERNS | `"Na fi son <X>"`, `"Ina son <X>"`, `"Na ƙi <X>"`                    | Abubuwan da mai amfani ya fi so    |
| DECISION_PATTERNS   | `"Zan yi amfani da <X>"`, `"Na yanke shawarar <X>"`, `"Na zaɓi <X>"` | Shawarwarin mai amfani (na aukuwa) |
| PATTERN_PATTERNS    | `"Yawanci ina <X>"`, `"Kullum ina <X>"`, `"Ban taɓa <X> ba"`         | Tsarukan ɗabi'a masu ɗorewa        |

### Misalan Tsaruka (An Sauƙaƙa)

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

> "Na fi son TypeScript. Zan yi amfani da Postgres don wannan aikin. Kullum ina yin commit kafin pushing. Ba na son Python."
> Ciro bayanan yana samar da ƙwaƙwalwa guda 4:
>
> | Maɓalli                              | Rukuni  | Nau'i      | Abun ciki                   |
> | ------------------------------------ | ------- | ---------- | --------------------------- |
> | `preference:typescript`              | fifiko  | na gaskiya | "TypeScript"                |
> | `decision:postgres_for_this_project` | shawara | na aukuwa  | "Postgres don wannan aikin" |
> | `pattern:commit_before_pushing`      | tsari   | na gaskiya | "yin commit kafin pushing"  |
> | `preference:python`                  | fifiko  | na gaskiya | "Python"                    |

### Iyakokin Ciro Bayanai

Don hana ciro bayanai fiye da kima, ana amfani da waɗannan iyakoki:

| Mafi ƙarancin tsawon abun ciki | haruffa 3 |
| Mafi girman tsawon abun ciki | haruffa 500 |

### Lokacin da Ya Kamata a Kashe Ciro Bayanai

Ciro bayanai yana gudana ta atomatik duk lokacin da aka kunna ƙwaƙwalwa; babu wani maɓalli na musamman
don ciro bayanai kaɗai. Don kashe shi, kashe ƙwaƙwalwa gaba ɗaya (`enabled: false`
ta hanyar `PUT /api/settings/memory`). Yi la'akari da yin hakan idan:

- Kana da saƙonni masu yawa kuma kuɗin ciro bayanan ba ƙarami ba ne
- Yawancin tattaunawarka na ɗan lokaci ne kawai (hira, gyaran kurakurai) ba tare da wata ƙima ta dogon lokaci ba
- Tuni kana tattara mahallin bayanai ta hanyar plugins na musamman

---

## Daidaita Hybrid RRF (v3.8.16+)

Algoritim ɗin **Reciprocal Rank Fusion (RRF)** yana haɗa sakamakon FTS5 (kalmar maɓalli) da vector (na ma'ana). Ma'aunin `k` yana sarrafa irin nauyin da ake bai wa sakamakon da ke ƙananan matsayi.

### Ƙa'idar Lissafi

Ga kowace ƙwaƙwalwar da za a iya zaɓa, makin RRF shi ne:

```
RRF(d) = Σ  1 / (k + rank_i(d))
```

Inda:

- `k` shi ne ƙayyadadden adadi (na asali 60)
- `rank_i(d)` shi ne matsayin takardar `d` a cikin tsarin dawo da bayanai na i-th (FTS, vector)
- Ana yin jimillar ne a kan dukkan tsarin dawo da bayanai

### Yadda `k` Ke Shafar Sakamako

| Ƙimar `k`             | Tasiri                                                                                         | Ya fi dacewa da                                        |
| --------------------- | ---------------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| `k=0`                 | Haɗa matsayi kai tsaye (ba tare da sassautawa ba)                                              | Ma'aunin tushe na ka'ida                               |
| `k=10-30`             | Yana bai wa sakamakon sama nauyi sosai, ƙananan matsayi ba sa bayar da gudummawa sosai         | Lokacin da sakamakon top-3 yawanci daidai ne           |
| **`k=60`** (na asali) | Daidaitacce — duk sakamakon top-10 suna bayar da gudummawa mai ma'ana                          | Dawo da bayanai na gama-gari                           |
| `k=100+`              | Ya fi shimfiɗa — ko sakamakon ƙananan matsayi na iya rinjaye idan ya bayyana a tsaruka da yawa | Lokacin da recall > precision ke da matuƙar muhimmanci |

### Daidaita `k` a Aikace

```bash
# Na asali
MEMORY_RRF_K=60

# Tsauraran precision (ƙaramar ƙwaƙwalwa, takardu kaɗan)
MEMORY_RRF_K=20

# Matsakaicin recall (babbar ƙwaƙwalwa, tambayoyi iri-iri)
MEMORY_RRF_K=120
```

**Misali da `k=20`:**

- Matsayin FTS 1 → gudummawa `1/21 = 0.048`
- Matsayin FTS 10 → gudummawa `1/30 = 0.033`
- Matsayin vector 1 → gudummawa `0.048`
- Matsakaicin haɗe: `0.096`

**Misali da `k=60`:**

- Matsayin FTS 1 → gudummawa `1/61 = 0.016`
- Matsayin FTS 10 → gudummawa `1/70 = 0.014`
- Matsayin vector 1 → gudummawa `0.016`
- Matsakaicin haɗe: `0.033`

Idan `k` ya fi girma, **bambancin dangi** tsakanin top-1 da rank-10 yana raguwa, don haka algoritim ɗin yana ƙara dogaro da **yarjejeniya tsakanin tsarin dawo da bayanai** fiye da ƙarfin amincewar matsayi na sama.

### Lokacin da Ya Kamata a Canza `k`

| Alama                                                       | Abin da za a gwada                                                          |
| ----------------------------------------------------------- | --------------------------------------------------------------------------- |
| Sakamakon sama kullum yana yin nasara, amma ba daidai ba ne | **Rage** k (misali, 20) — amincewar matsayi na sama ta fi muhimmanci        |
| Amsar daidai tana cikin top-5 amma ba top-1 ba              | **Ƙara** k (misali, 100) — makin da ya fi shimfiɗa yana ba yarjejeniya lada |
| Recall yana da yawa amma precision yana da ƙasa             | **Rage** k — ƙara kaifin jeri                                               |
| Recall yana da ƙasa (ana rasa takardun da suka dace)        | **Ƙara** k — bai wa takardun ƙananan matsayi dama                           |

### Nauyin RRF

Haɗa matsayi ta hanyar reciprocal rank yana amfani da nauyi iri ɗaya ga matsayin semantic vector da matsayin binciken cikakken rubutu:

```
RRF(d) = 1/(k + rank_vector) + 1/(k + rank_fts)
```

Babu environment variables da za a yi amfani da su don daidaita nauyin kowannensu (`MEMORY_RRF_VECTOR_WEIGHT`/`MEMORY_RRF_FTS_WEIGHT` ba su wanzu).

---

## Dabarar Taƙaitawa (v3.8.16+)

Manhajar `summarization.ts` (`src/lib/memory/summarization.ts`) tana matse tsofaffin abubuwan ƙwaƙwalwa domin kiyaye saitin da ake amfani da shi ya kasance ƙarami tare da adana damar tuna bayanai.

### Lokacin da Taƙaitawa ke Farawa

| Abin da ke farawa      | Iyaka (tsoho) |
| ---------------------- | ------------- |
| Farawa da hannu ta API | babu          |

### Abin da Ake Taƙaitawa

Ana fitar da hanyoyin shiga guda biyu daga `summarization.ts`:

- **`summarizeMemories(apiKeyId, sessionId?, maxTokens = 4000)`** — tana taƙaita
  abubuwan ƙwaƙwalwar zama zuwa rubutaccen taƙaitawa guda ɗaya wanda kasafin token ya iyakance.
- **`summarizeMemoriesOlderThan(apiKeyId, days, dryRun)`** — matsewa bisa shekaru
  da API ke amfani da shi: tana zaɓar kowane abin ƙwaƙwalwa da ya girmi `days`, ta gina
  taƙaitaccen abin ƙwaƙwalwa guda ɗaya daga gare su, sannan (idan `dryRun` ya kasance `false`) ta share
  na asali. Tura `dryRun: true` domin duba saitin da za a zaɓa da jimillar token
  ba tare da gyara komai ba.

Babu matakin tara bayanai bisa alama/maɓalli ko ƙididdigar "ainihin vs mai yiwuwa a taƙaita" ga kowane abin ƙwaƙwalwa —
zaɓin yana dogara ne kawai kan iyakar shekaru, kuma rubutun taƙaitawar
layi ne da aka taƙaita tare da gabatar da nau'i ga kowane abin da aka zaɓa.

### Fara Taƙaitawa

Taƙaitawa **ta hannu ce / sai an zaɓa** — saitin `autoSummarize` yana kasancewa `false`
ta tsohuwa, saboda haka ba a matse komai kai tsaye. Fara shi ta API:

```bash
curl -X POST http://localhost:20128/api/memory/summarize \
  -H "Authorization: Bearer $OMNIROUTE_KEY"
```

Domin barin sa a kashe, kawai ka bar `autoSummarize` a ƙimarsa ta tsohuwa (`false`).

### Shawarwari don Ingancin Taƙaitawa

- **Fara da samfoti ta amfani da `dryRun`** — `summarizeMemoriesOlderThan(..., true)` tana dawo da
  jerin abubuwan da za a zaɓa da jimillar adadin token domin ka tabbatar da abin da za a haɗa
  kafin a share na asali.
- **Gudanar da taƙaitawa a lokutan ƙarancin zirga-zirga** idan kana da tarin abubuwan ƙwaƙwalwa masu yawa — kiran LLM shi ne ɓangaren da ya fi jinkiri

```bash
# Salon Cron: yi taƙaitawa kullum da ƙarfe 3 na safe
0 3 * * * curl -X POST http://localhost:20128/api/memory/summarize \
  -H "Authorization: Bearer $OMNIROUTE_KEY"
```

---

## Tsarin Mai Samar da MemoryBackend

> **Tushen gaskiya:** `src/lib/memory/backend.ts`, `src/lib/memory/genericBackend.ts`, `src/lib/memory/manager.ts`
> **Gwaje-gwaje:** `src/lib/memory/__tests__/generic-backend.test.ts`

Tsarin mai samar da MemoryBackend yana gabatar da **shimfiɗar abstraction ta backend mai sauƙin sauyawa** a saman injin ƙwaƙwalwar da ake da shi. Maimakon a ɗaure shi ga aiwatarwar ma'ajiya guda ɗaya, tsarin ƙwaƙwalwar yanzu yana goyon bayan backend da yawa (SQLite, Obsidian, Notion, backend na HTTP na musamman) tare da hanyar tura buƙatu zuwa primary/fallback mai iya daidaitawa.

### Tsari

```
┌──────────────────────────────────────────────────────────┐
│                    Hanyoyin API                           │
│            (src/app/api/memory/route.ts)                  │
└──────────────────────┬───────────────────────────────────┘
                       │
┌──────────────────────▼───────────────────────────────────┐
│                   MemoryManager                           │
│           Mai tsara aiki na Singleton (manager.ts)        │
│                                                          │
│  Primary ──► Backend A  (misali SQLite)                  │
│  Fallback ─► Backend B  (misali Obsidian)                │
│             Backend C  (misali Notion ta GenericBackend)  │
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

  // Lafiyar tsari
  health(): Promise<HealthCheckResult>;

  // Zagayowar rayuwa (na zaɓi)
  initialize?(): Promise<void>;
  shutdown?(): Promise<void>;
}
```

#### MemoryManager (`manager.ts`)

Mai tsara aiki na Singleton wanda yake:

- **Rijistar** backend ta hanyar `register(backend)` — ana kiransa lokacin farawa daga `index.ts`
- **Daidaita** primary + fallback ta hanyar `configure(primary, fallbacks)`
- **Tura** CRUD/bincike zuwa primary, tare da jerin fallback idan aka samu gazawa
- **Duba lafiyar** dukkan backend lokaci-lokaci

**Halayen fallback:**

| Aiki     | Primary               | Fallbacks                        |
| -------- | --------------------- | -------------------------------- |
| `create` | ✅ Primary kawai      | ❌                               |
| `get`    | ✅ Fara gwada primary | ✅ Fallback idan null            |
| `update` | ✅ Primary kawai      | ✅ Aiki tare ba tare da jira ba  |
| `delete` | ✅ Primary kawai      | ✅ Aiki tare ba tare da jira ba  |
| `list`   | ✅ Primary kawai      | ❌                               |
| `search` | ✅ Primary da farko   | ✅ Fallback idan an samu kuskure |

#### GenericMemoryBackend (`genericBackend.ts`)

Haɗin HTTP na gama-gari wanda yake daidaita kowane REST API zuwa MemoryBackend. Yana da amfani ga:

- **Notion** — haɗa ta Notion API
- **Obsidian** — haɗa ta Obsidian Local REST API
- **Backend na musamman** — duk wani sabis da ke samar da RESTful memory API

**Daidaitawa:**

```typescript
interface GenericBackendConfig {
  baseUrl: string;           // Tushen URL na backend API
  apiKey?: string;           // Bearer token don tantancewa
  headers?: Record<string, string>;  // Keɓaɓɓun HTTP headers
  timeout?: number;          // Wa'adin ƙarewar buƙata (tsoho: 30000ms)
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

  // Taswirar sunayen sigogin query
  queryParams?: {
    query?/apiKeyId?/limit?/offset?/strategy?/maxTokens?/type?/sessionId?/orderBy?/orderDir?/options?
  };

  // Taswirar sunayen sigogin path
  pathParams?: {
    id?/memoryId?
  };
}
```

An riga an saita **sanannun backends** a cikin `KNOWN_BACKENDS`:

```typescript
createKnownBackend("obsidian"); // → GenericMemoryBackend wanda aka nuna wa localhost:27123
createKnownBackend("notion"); // → GenericMemoryBackend wanda aka nuna wa api.notion.com/v1
```

#### Ginannun Backends

##### SQLiteBackend (`sqliteBackend.ts`)

Tsohon babban backend. Yana naɗe ma'ajiyar ƙwaƙwalwa da ke amfani da SQLite ta hanyar `src/lib/memory/store.ts`. Ana yi masa rajista ta atomatik lokacin farawa.

```typescript
import { sqliteBackend } from "./sqliteBackend";
memoryManager.register(sqliteBackend);
```

##### ObsidianBackend (`obsidianBackend.ts`)

Yana naɗe haɗin Obsidian da ake da shi (`src/lib/memory/obsidianBackend.ts`). Yana haɗuwa da ma'ajiyar Obsidian ta hanyar Obsidian Local REST API.

### Saituna

Ana adana saitunan backend na ƙwaƙwalwa a cikin teburin saitunan manhaja kuma ana sarrafa su ta hanyar `src/lib/memory/settings.ts`:

| Saiti               | Maɓallin Env/Config      | Tsoho      | Bayani                               |
| ------------------- | ------------------------ | ---------- | ------------------------------------ |
| Babban backend      | `memoryPrimaryBackend`   | `"sqlite"` | ID na babban backend                 |
| Backends na madadin | `memoryFallbackBackends` | `[]`       | IDs na backends na madadin a jere    |
| Saitunan backends   | `memoryBackendConfigs`   | `{}`       | Sauye-sauyen saiti ga kowane backend |

Ana daidaita saitunan ta hanyar `normalizeMemorySettings()` kuma ana adana su a cache a `getMemorySettings()`.

### Tsarin Farawa

```
Fara manhaja
  → shigarwar index.ts (sakamakon gefe): tana yi wa SQLiteBackend rajista
  → ana kiran initMemoryBackends() daga tsarin rayuwar manhaja:
      1. Loda saituna (getMemorySettings)
      2. Saita babban backend + na madadin
      3. Fara dukkan backends (duba lafiya)
      4. A shirye don buƙatu
```

### Ƙara Sabon Backend

1. **Aiwatar da interface na `MemoryBackend`** a cikin `src/lib/memory/<name>Backend.ts`
2. **Fitar da shi** daga `src/lib/memory/index.ts`
3. **Yi rajista** da `memoryManager.register(yourBackend)` lokacin farawa
4. **Saita shi** ta saituna: saita `memoryPrimaryBackend` zuwa ID na backend ɗinka
5. **Gwada shi** ta amfani da `src/lib/memory/__tests__/generic-backend.test.ts` a matsayin madogara

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

#### Gwaje-gwajen ɓangare

```bash
npx vitest run src/lib/memory/__tests__/generic-backend.test.ts --reporter=verbose
```

Sakamakon da ake sa ran samu: **gwaje-gwaje 35, duk sun yi nasara**, waɗanda suka haɗa da:

- Constructor (2)
- Duba lafiya (4) — nasara, gazawar 500, kuskuren hanyar sadarwa, jinkiri
- Farawa (2) — nasara, gazawa
- Ƙirƙira (2) — tsohon endpoint, keɓaɓɓen endpoint
- Samu (4) — nasara, 404 → null, jefa kuskure idan ba 404 ba, keɓaɓɓun sigogin path
- Sabuntawa (2) — nasara, 404 → false
- Sharewa (2) — nasara, 404 → false
- Jerantawa (2) — sigogin query, keɓaɓɓun sunayen sigogi
- Bincike (3) — sigogin query, keɓaɓɓen endpoint, mayar da options zuwa tsari
- Auth headers (2) — Bearer token, keɓaɓɓun headers
- Factory (1)

#### Duba nau'i

```bash
npm run typecheck:core
```

Abin da ake sa ran samu: **kurakurai 0**.
