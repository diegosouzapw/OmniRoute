# Memory System (Kiswahili)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/MEMORY.md) · 🇪🇹 [am](../../../am/docs/frameworks/MEMORY.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/MEMORY.md) · 🇦🇿 [az](../../../az/docs/frameworks/MEMORY.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/MEMORY.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/MEMORY.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/MEMORY.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/MEMORY.md) · 🇩🇰 [da](../../../da/docs/frameworks/MEMORY.md) · 🇩🇪 [de](../../../de/docs/frameworks/MEMORY.md) · 🇬🇷 [el](../../../el/docs/frameworks/MEMORY.md) · 🇪🇸 [es](../../../es/docs/frameworks/MEMORY.md) · 🇪🇪 [et](../../../et/docs/frameworks/MEMORY.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/MEMORY.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/MEMORY.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/MEMORY.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/MEMORY.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/MEMORY.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/MEMORY.md) · 🇮🇱 [he](../../../he/docs/frameworks/MEMORY.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/MEMORY.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/MEMORY.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/MEMORY.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/MEMORY.md) · 🇮🇩 [id](../../../id/docs/frameworks/MEMORY.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/MEMORY.md) · 🇮🇹 [it](../../../it/docs/frameworks/MEMORY.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/MEMORY.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/MEMORY.md) · 🇰🇭 [km](../../../km/docs/frameworks/MEMORY.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/MEMORY.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/MEMORY.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/MEMORY.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/MEMORY.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/MEMORY.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/MEMORY.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/MEMORY.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/MEMORY.md) · 🇲🇲 [my](../../../my/docs/frameworks/MEMORY.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/MEMORY.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/MEMORY.md) · 🇳🇴 [no](../../../no/docs/frameworks/MEMORY.md) · 🇮🇳 [or](../../../or/docs/frameworks/MEMORY.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/MEMORY.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/MEMORY.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/MEMORY.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/MEMORY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/MEMORY.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/MEMORY.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/MEMORY.md) · 🇱🇰 [si](../../../si/docs/frameworks/MEMORY.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/MEMORY.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/MEMORY.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/MEMORY.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/MEMORY.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/MEMORY.md) · 🇮🇳 [te](../../../te/docs/frameworks/MEMORY.md) · 🇹🇭 [th](../../../th/docs/frameworks/MEMORY.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/MEMORY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/MEMORY.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/MEMORY.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/MEMORY.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/MEMORY.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/MEMORY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/MEMORY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/MEMORY.md)

---

> **Chanzo cha ukweli:** `src/lib/memory/` na `src/app/api/memory/`
> **Ilisasishwa mwisho:** 2026-06-28 — v3.8.40 (imezimwa kwa chaguo-msingi + ulandanishaji wa ukadiriaji wa int8)

OmniRoute hutoa kumbukumbu endelevu ya mazungumzo inayotambulishwa kwa ufunguo wa API (na
kwa hiari kitambulisho cha kipindi). Kumbukumbu hutolewa kiotomatiki kutoka kwenye majibu ya LLM
kupitia ulinganishaji mwepesi wa ruwaza za regex na kuingizwa tena katika
maombi yanayofuata kama ujumbe wa mfumo unaotangulia (au ujumbe wa kwanza wa mtumiaji kwa watoa huduma
wanaokataa jukumu la mfumo).

> **Kumbukumbu IMEZIMWA kwa chaguo-msingi (v3.8.30+).** `DEFAULT_MEMORY_SETTINGS.enabled` sasa
> ni `false` (`src/lib/memory/settings.ts`). Kuwasha kumbukumbu huingiza hadi
> `maxTokens` (~2k) za muktadha uliorejeshwa katika **kila** ombi la gumzo, ambalo
> hutozwa — gharama isiyotarajiwa kwa usakinishaji mpya na kwa viteja vinavyodhibiti
> muktadha wao wenyewe. Jiunge kwa uwazi chini ya **Mipangilio → Kumbukumbu** (`MemorySkillsTab`
> huonyesha tahadhari ya gharama ya tokeni wakati kumbukumbu imewashwa).
> Kitega kinaweza kuzuia matumizi ya kumbukumbu kwa ombi moja kwa kutumia kichwa cha ombi cha
> `x-omniroute-no-memory` (`true`/`1`/`yes`) — tazama jedwali la vichwa vya maombi katika
> [API_REFERENCE.md](../reference/API_REFERENCE.md). Ombi lisilotumia kumbukumbu huweka
> `memoryOwnerId = null`, jambo linalozima **zote mbili**, uingizaji wa kumbukumbu na ujuzi, kwa
> ombi hilo (`open-sse/handlers/chatCore/headers.ts::isNoMemoryRequested`).

Kumbukumbu **huwekewa upeo kwa kila ufunguo wa API**, si kwa kila mtumiaji — kila ombi lililothibitishwa
kwa ufunguo uleule wa API hushiriki hifadhi ileile ya kumbukumbu, huku kukiwa na uwezekano wa kuweka upeo zaidi
kwa kutumia `sessionId`.

## Usanifu

```
Kitega → /v1/chat/completions (apiKeyInfo imetatuliwa katika hatua ya awali)
  → handleChatCore() [open-sse/handlers/chatCore.ts]
    → resolveMemoryOwnerId(apiKeyInfo)        # hutoa id
    → getMemorySettings()                     # mipangilio iliyohifadhiwa kwenye kache
    → shouldInjectMemory(body, {enabled})     # kigezo cha kuruhusu
    → retrieveMemories(apiKeyId, config)      # SQL + FTS5 + vekta ya hiari
    → injectMemory(body, memories, provider)  # ujumbe wa mfumo au wa mtumiaji
  → mwito kwa mtoa huduma wa nje
  → baada ya jibu: extractFacts(text, apiKeyId, sessionId)  # hauzuii utekelezaji
    → setImmediate → createMemory(fact) kwa kila ulinganifu
                   → embed(content) + upsertVector(id, vec)
```

Sehemu za miito ya uingizaji na utoaji zimeunganishwa katika
`open-sse/handlers/chatCore.ts` (tafuta `retrieveMemories`, `injectMemory`,
na `extractFacts`).

## Usanifu wa injini (utatuzi wa ngazi 3)

Injini ya Kumbukumbu hutatua njia ya urejeshaji wakati wa utekelezaji kulingana na miundombinu
na mipangilio inayopatikana. Kuna ngazi tatu, zinazotumika kwa mpangilio wa kipaumbele:

```
  ┌─────────────────────────────────────────────────────────────┐
  │  NGAZI 0 — Neno kuu (FTS5)                                  │
  │  Upatikanaji unaotegemea ukaguzi: FTS5 wakati toleo la       │
  │  SQLite linaiunga mkono (better-sqlite3 / node:sqlite /      │
  │  bun:sqlite); haipatikani kwenye matoleo yasiyo na FTS5      │
  │  (k.m. sql.js/WASM — "no such module: fts5"). Hutumika       │
  │  wakati strategy = "exact" au kama mbadala; hali ya neno     │
  │  kuu ya injini huakisi ukaguzi huo.                          │
  └──────────────────────────────────┬──────────────────────────┘
                                     │ strategy = semantic|hybrid?
                                     ▼
  ┌─────────────────────────────────────────────────────────────┐
  │  NGAZI 1 — Vekta Iliyopachikwa (sqlite-vec)                  │
  │  sqlite-vec v0.1.9 hupakiwa kupitia db.loadExtension().      │
  │  Utafutaji wa moja kwa moja wa KNN kwenye vekta za Float32.  │
  │  Hufanya kazi wakati:                                        │
  │   • sqlite-vec loadExtension inafanikiwa                     │
  │   • Chanzo cha upachikaji kinapatikana (remote | static |    │
  │     transformers) kinachoweza kutoa Float32Array             │
  │   • Jedwali la vec_memories lipo (huundwa ready()            │
  │     inapoitwa kwa mara ya kwanza)                            │
  └──────────────────────────────────┬──────────────────────────┘
                                     │ qdrant.enabled?
                                     ▼
  ┌─────────────────────────────────────────────────────────────┐
  │  NGAZI 2 — Qdrant (hifadhidata ya nje ya vekta ya hiari)     │
  │  Inapowashwa, huchukua nafasi ya sqlite-vec kwa              │
  │  semantic/hybrid.                                            │
  │  Inahitaji programu ya Qdrant inayoendeshwa + host/port      │
  │  iliyosanidiwa.                                              │
  └─────────────────────────────────────────────────────────────┘
```

Ushushaji wa kiwango hutokea kiotomatiki na kwa uwazi:

- Ikiwa sqlite-vec itashindwa kupakiwa, ngazi ya 1 haipatikani → hutumia ngazi ya 0 kama mbadala.
- Ikiwa chanzo cha upachikaji kitarudisha hitilafu, ngazi ya 1 hutumia ngazi ya 0 kama mbadala.
- Ikiwa Qdrant haifanyi kazi vizuri, ngazi ya 2 hutumia ngazi ya 1 kama mbadala (au ngazi ya 0 ikiwa ngazi ya 1
  pia haipatikani).

## Vyanzo vya upachikaji

Safu ya upachikaji (`src/lib/memory/embedding/`) hubainisha chanzo cha kutumia
kulingana na `MemorySettingsExtended.embeddingSource`:

| Chanzo         | Maelezo                                                                                                   | Ufunguo unahitajika | Uanzishaji wa kwanza |
| -------------- | --------------------------------------------------------------------------------------------------------- | ------------------- | -------------------- |
| `remote`       | Hutumia API ya upachikaji ya mtoa huduma aliyesanidiwa (OpenAI, Cohere, n.k.)                             | Ndiyo               | Hakuna               |
| `static`       | Upachikaji wa ndani kupitia jedwali la utafutaji la `potion-base-8M` (WordPiece + ujumuishaji wa wastani) | Hapana              | ~200ms               |
| `transformers` | Utekelezaji wa ONNX wa ndani kupitia `@huggingface/transformers` v4, `all-MiniLM-L6-v2`                   | Hapana              | ~3s + ~400MB RAM     |
| `auto`         | Ubainishaji wakati wa utekelezaji: remote (ikiwa ufunguo upo) → static → transformers → null              | Inategemea          | Inategemea           |

**Mpangilio wa ubainishaji kwa `auto`:**

1. Tafuta mtoa huduma wa kwanza katika `listEmbeddingProviders()` mwenye `hasKey === true` → `remote`.
2. Ikiwa `settings.staticEnabled === true` → `static`.
3. Ikiwa `settings.transformersEnabled === true` → `transformers`.
4. Vinginevyo → `null` (hushuka hadi utafutaji wa maneno muhimu wa FTS5).

Akiba ya upachikaji (`src/lib/memory/embedding/cache.ts`) hutumia ramani ya LRU
iliyo ndani ya kumbukumbu, yenye funguo za `${source}:${model}:${dim}:${sha256(text)}`,
na kikomo cha rekodi `MEMORY_EMBEDDING_CACHE_MAX` (chaguomsingi 1000), pamoja na
TTL ya `MEMORY_EMBEDDING_CACHE_TTL_MS` (chaguomsingi dakika 5). Inashirikiwa na
wapigaji wote katika mzunguko wa uhai wa kila mchakato.

## RRF mseto (k=60)

Wakati `strategy = "hybrid"` na hifadhi ya vekta inapatikana, urejeshaji hutumia
Reciprocal Rank Fusion kuunganisha matokeo ya FTS5 na ya vekta:

```
RRF(d) = Σ  1 / (k + rank_i(d))      ambapo k = 60 (inaweza kusanidiwa kupitia MEMORY_RRF_K)
          i
```

Kwa undani:

1. Endesha utafutaji wa FTS5 → orodha iliyopangwa `R_fts` (nafasi 1..N).
2. Endesha utafutaji wa vekta wa KNN → orodha iliyopangwa `R_vec` (nafasi 1..M).
3. Kwa kila `memoryId` ya kipekee:  
   `rrf_score = 1/(60 + fts_rank)` + `1/(60 + vec_rank)` (0 ikiwa haimo kwenye orodha).
4. Panga kwa `rrf_score` kwa mpangilio wa DESC, kisha tumia upitiaji wa bajeti ya tokeni.

RRF inajulikana kuwa na ufanisi bila kuhitaji usawazishaji wa alama kati ya
mifumo tofauti ya urejeshaji. `k=60` ya chaguomsingi imetokana na makala ya awali
ya Cormack et al. na hufanya kazi vizuri kwa mikusanyo midogo (<10k kumbukumbu).

## Ujazaji wa nyuma (wa polepole + uwekaji upya wa faharasa)

Muundo wa upachikaji unapobadilika (hugunduliwa kupitia `embedding_signature`),
hifadhi ya vekta huundwa upya na kumbukumbu zote zilizopo huwekewa
`needs_reindex = 1` katika jedwali la `memories`.

**Ujazaji wa nyuma wa polepole**: Wakati wa urejeshaji unaofuata, kumbukumbu yoyote
isiyo na rekodi ya vekta hupachikwa na kuingizwa katika `vec_memories` kabla ya
utafutaji kuendeshwa. Hii husambaza gharama ya ujazaji wa nyuma katika maombi
halisi bila kuzuia uanzishaji.

**Uwekaji upya wa faharasa wa moja kwa moja**: Kichupo cha Engine katika
`/dashboard/memory` kina kitufe cha "Weka Faharasa Upya Sasa" kinachoita
`POST /api/memory/reindex`. Kishughulikiaji huita `runReindexBatch()` kutoka
`src/lib/memory/reindex.ts`, ambacho huchakata hadi rekodi `limit` zinazosubiri
kwa kila ombi. Maendeleo yanaweza kukaguliwa mara kwa mara kupitia
`GET /api/memory/engine-status` (`vectorStore.needsReindex`).

Jedwali la `memory_vec_meta` (uhamishaji `083_memory_vec.sql`) huhifadhi:

- `active_dim` — kipimo cha sasa cha vekta (null = bado hakijarekebishwa).
- `embedding_signature` — `${source}:${model}:${dim}` inayotumika kugundua mabadiliko.
- `last_reset_at` — muhuri wa muda wa uwekaji upya kamili wa mwisho.
- `vec_loaded` — alama ya 0/1 inayoonyesha ikiwa sqlite-vec ilipakiwa kwa mafanikio.

## Kiendelezi cha mipangilio

Sehemu tisa za embedding na vekta zinapatikana katika `MemorySettingsExtended` ndani ya
`src/shared/schemas/memory.ts`, na huhifadhiwa kupitia `src/lib/db/settings.ts`:

| Sehemu                   | Aina                                               | Chaguo-msingi | Maelezo                                                               |
| ------------------------ | -------------------------------------------------- | ------------- | --------------------------------------------------------------------- |
| `embeddingSource`        | `"remote" \| "static" \| "transformers" \| "auto"` | `"auto"`      | Chanzo cha embedding kitakachotumika                                  |
| `embeddingProviderModel` | `string \| null`                                   | `null`        | Mtoa huduma/modeli katika muundo wa `provider/model`                  |
| `customBaseUrl`          | `string \| null`                                   | `null`        | URL msingi ya endpoint inayooana na OpenAI kwa Kumbukumbu pekee       |
| `customModelId`          | `string \| null`                                   | `null`        | Kitambulisho cha modeli kinachotumwa kwenye endpoint maalum           |
| `transformersEnabled`    | `boolean`                                          | `false`       | Hiari ya kutumia Transformers.js (MiniLM, ~400MB)                     |
| `staticEnabled`          | `boolean`                                          | `false`       | Hiari ya kutumia modeli tuli ya ndani ya potion-base-8M               |
| `rerankEnabled`          | `boolean`                                          | `false`       | Washa hatua ya kupanga upya (huongeza +200-500ms/ombi)                |
| `rerankProviderModel`    | `string \| null`                                   | `null`        | Mtoa huduma/modeli ya upangaji upya katika muundo wa `provider/model` |
| `vectorStore`            | `"sqlite-vec" \| "qdrant" \| "auto"`               | `"auto"`      | Mfumo wa nyuma wa vekta utakaotumika                                  |

Hizi zinapatikana kupitia `GET /PUT /api/settings/memory` (schema `MemorySettingsExtendedSchema`).

Kwa chanzo cha `remote`, Kumbukumbu pia hukubali mipangilio ya hiari ya `customBaseUrl` na
`customModelId`. Kwa pamoja, huchagua endpoint ya `/embeddings` inayooana na OpenAI
na modeli bila kubadilisha sajili ya kimataifa ya embedding. Endpoint husawazishwa
kabla ya kutumiwa na hukaguliwa na sera ya URL ya nje ya mtoa huduma: HTTP(S)
inahitajika, vitambulisho vilivyopachikwa na mifuatano ya hoja hukataliwa, na anwani
za metadata za wingu huendelea kuzuiwa. Thamani tupu huhifadhi mtoa huduma wa sajili
aliyechaguliwa. Hitilafu zinazorejeshwa kwenye dashibodi husafishwa na vitambulisho
vya endpoint haviwekwi kamwe kwenye kumbukumbu za matukio.

> **TODO (D20):** Upeo wa `global` (kushiriki kumbukumbu kwenye funguo zote za API)
> haujatekelezwa katika toleo hili. Unahitaji mabadiliko ya schema na njia ya
> urejeshaji ya kimataifa. Ufuatilie kando.

## Tabaka za Hifadhi

### Msingi: SQLite (jedwali la `memories`)

Limeundwa na uhamishaji `015_create_memories.sql`:

| Safu                        | Aina               | Maelezo                                                                      |
| --------------------------- | ------------------ | ---------------------------------------------------------------------------- |
| `id`                        | `TEXT PRIMARY KEY` | UUID inayozalishwa kupitia `crypto.randomUUID()`                             |
| `api_key_id`                | `TEXT NOT NULL`    | Ufunguo wa API unaomiliki                                                    |
| `session_id`                | `TEXT`             | Upeo wa hiari kwa kila mazungumzo                                            |
| `type`                      | `TEXT NOT NULL`    | Moja kati ya `factual`, `episodic`, `procedural`, `semantic`                 |
| `key`                       | `TEXT`             | Ufunguo thabiti wa upsert, k.m. `preference:i_prefer_python`                 |
| `content`                   | `TEXT NOT NULL`    | Maandishi halisi ya ukweli                                                   |
| `metadata`                  | `TEXT`             | Kifurushi cha JSON (category, extractedAt, source, ...)                      |
| `created_at` / `updated_at` | `TEXT`             | Mifuatano ya ISO 8601                                                        |
| `expires_at`                | `TEXT`             | Muda wa hiari wa kuisha; `NULL` humaanisha ya kudumu                         |
| `memory_id`                 | `INTEGER UNIQUE`   | Imeongezwa na `023_fix_memory_fts_uuid.sql` kuunganisha UUID ↔ rowid za FTS5 |

Indeksi: `api_key_id`, `session_id`, `type`, `expires_at`, pamoja na indeksi ya kipekee ya
`memory_id`.

**Semantiki za upsert**: `createMemory()` hutafuta safu iliyopo yenye
`(api_key_id, key)` sawa na kuisasisha hapo hapo inapopatikana (ikiunganisha
`metadata` kupitia usambazaji wa juu juu). Hii huzuia jedwali kukua bila kikomo
kutokana na kauli za mapendeleo zinazojirudia.

### Utafutaji wa Maandishi Kamili (jedwali pepe la `memory_fts`)

`022_add_memory_fts5.sql` huunda jedwali pepe la FTS5 juu ya `content` na
`key`. `023_fix_memory_fts_uuid.sql` hurekebisha hitilafu ya matumizi halisi ambapo
ufunguo msingi wa UUID haukuunganishwa na rowid kamili ya FTS5 — uhamishaji huongeza
safu ya `memory_id`, huunda upya jedwali la FTS, na huunganisha vichochezi
(`memory_fts_ai`, `memory_fts_ad`, `memory_fts_au`) vinavyoweka FTS katika
ulinganifu wakati wa INSERT, DELETE, na UPDATE.

Hutumiwa na `retrieval.ts` kwa mikakati ya `semantic` na `hybrid` (tazama hapa chini).
Msimbo wa urejeshaji hulinda kwa kutumia `hasTable("memory_fts")` na hurudi kwenye
mpangilio wa wakati ikiwa jedwali la FTS halipo au hoja ya FTS inaleta hitilafu.

### Hiari: Qdrant (hifadhi ya vekta ya kiwango cha 2)

`src/lib/memory/qdrant.ts` hutekeleza muunganisho wa hiari wa Qdrant kama hifadhi ya
vekta ya kiwango cha 2. Urejeshaji huelekezwa kwa Qdrant tu wakati kiteuzi cha injini
`memoryVectorStore === "qdrant"` — chaguo-msingi `"auto"` (na `"sqlite-vec"`)
**kamwe** havichagui Qdrant. Kitufe cha kuwasha/kuzima cha kichupo cha Engine huweka
**zote mbili**, `qdrantEnabled` na `memoryVectorStore`, kwa pamoja: kuwasha hufanya
Qdrant kuwa hifadhi msingi, na kuzima hurudisha kuwa `"auto"` (#5597 — kabla ya
marekebisho hayo, kuwasha hakukuwa na athari kwa sababu hakuna kitu kilichoandika
kiteuzi cha injini). Ikiwa Qdrant haipatikani au hairudishi chochote, urejeshaji
hurudi kwenye sqlite-vec → FTS5.

- `upsertSemanticMemoryPoint()` — hupachika `key + content` kwa kutumia modeli ya
  upachikaji iliyosanidiwa, huhakikisha mkusanyiko upo (huunda vekta za umbali wa
  kosaini inapotumika kwa mara ya kwanza), na huingiza au kusasisha pointi yenye payload `{memoryId,
apiKeyId, sessionId, key, content, metadata, createdAtUnix, expiresAtUnix}`.
- `searchSemanticMemory(query, topK, scope)` — hupachika hoja, hutafuta kwenye
  mkusanyiko uliochujwa kwa `kind = "omniroute_memory"` na, kwa hiari, kwa
  `apiKeyId` / `sessionId`. Huweka kikomo cha `topK` kuwa `[1, 20]`.
- `deleteSemanticMemoryPoint(id)` — hufuta pointi moja. Huitwa na
  `deleteMemory()` baada ya safu ya SQLite kuondolewa (D15).
- `cleanupSemanticMemoryPoints({retentionDays})` — hufuta kwa pamoja pointi ambazo
  `expiresAtUnix` yake imepita au ambazo `createdAtUnix` yake ni ya zamani kuliko
  kikomo cha uhifadhi. Huhesabu kwanza ili dashibodi iweze kuonyesha idadi halisi.
- `checkQdrantHealth()` — kipimo cha afya cha `GET /readyz` pamoja na muda wa kusubiri.

Kiolesura cha mipangilio kinaonyesha usanidi wa Qdrant, ukaguzi wa afya, jaribio la utafutaji wa kisemantiki,
na usafishaji katika **kichupo cha Engine** cha `/dashboard/memory`. Njia zinazohusiana
chini ya `src/app/api/settings/qdrant/` zote zimeunganishwa kuanzia v3.8.6:

| Njia                                    | Mbinu         | Maelezo                                       |
| --------------------------------------- | ------------- | --------------------------------------------- |
| `/api/settings/qdrant`                  | `GET` / `PUT` | Soma / sasisha mipangilio ya Qdrant           |
| `/api/settings/qdrant/health`           | `GET`         | Kipimo cha uhai + muda wa kusubiri            |
| `/api/settings/qdrant/search`           | `POST`        | Jaribio la utafutaji wa kisemantiki           |
| `/api/settings/qdrant/cleanup`          | `POST`        | Ondoa pointi zilizokwisha muda / za zamani    |
| `/api/settings/qdrant/embedding-models` | `GET`         | Orodhesha modeli za upachikaji zinazopatikana |

**Maelezo ya tabia (unachopaswa kutarajia):**

- **Uteuzi wa injini** — kuwezesha Qdrant katika kichupo cha Engine huifanya kuwa hifadhi kuu
  (huweka `memoryVectorStore="qdrant"`); kuizima hurejesha kuwa `"auto"` (#5597).
- **Hakuna ujazaji wa data za awali** — ni kumbukumbu zilizoundwa/kusasishwa **baada** ya Qdrant kuwezeshwa pekee
  ndizo zinazoandikwa humo (uandishi wa hifadhi mbili usiosubiri matokeo). Kumbukumbu zilizokuwapo awali katika SQLite **hazihamishwi**;
  "Reindex Now" huunda upya faharasa ya sqlite-vec pekee, si Qdrant.
- **Kipimo cha vekta hutambuliwa kiotomatiki** kutoka kwenye upachikaji halisi wakati wa matumizi ya kwanza — hakuna
  sehemu ya kipimo ya kujaza. Kubadilisha modeli ya upachikaji baada ya mkusanyiko
  kuwepo **hakushughulikiwi** kiotomatiki: mkusanyiko uliopo huachwa bila kubadilishwa, na uandishi/utafutaji
  wenye vipimo visivyolingana hushindwa na kurejea kwa sqlite-vec. Unda mkusanyiko upya
  (jina jipya, au uufute katika Qdrant) ili kubadilisha modeli ya upachikaji.
- **Metriki ya umbali** — daima ni **Cosine** (imewekwa moja kwa moja wakati wa kuunda mkusanyiko; haiwezi
  kusanidiwa).
- **Uthibitishaji** — ufunguo wa API pekee (hutumwa kama kichwa cha `api-key`; ni wa hiari kwa Docker ya ndani
  isiyotumia uthibitishaji). JWT/RBAC hazitumiki.
- **Sehemu za usanidi** — kiolesura kinaonyesha `host`, `port`, `collection`, `embeddingModel`,
  `apiKey`. `vectorSize` / `hnswEfConstruct` ni za mazingira/DB pekee na `vectorSize`
  haitumiki kuunda mkusanyiko (kipimo hutokana na upachikaji).

### Ukadiriaji wa vekta (int8 — wa hiari, mifumo yote miwili)

Mifumo yote miwili ya vekta inasaidia **ukadiriaji wa int8 wa hiari** ili kupunguza
kumbukumbu inayotumiwa na vekta zilizohifadhiwa (~ndogo mara 4 kuliko Float32) kwa gharama ndogo ya uwezo wa kurejesha matokeo.
Kwa chaguo-msingi, kipengele hiki **kimezimwa** kwenye mifumo yote miwili — vekta hubaki na usahihi kamili isipokuwa
kikiwezeshwa waziwazi.

| Mfumo      | Mpangilio                             | Aina                           | Chaguo-msingi | Mahali inaposomwa                                           |
| ---------- | ------------------------------------- | ------------------------------ | ------------- | ----------------------------------------------------------- |
| Qdrant     | `qdrantQuantization` (ufunguo wa DB)  | `"none" \| "int8" \| "binary"` | `"none"`      | `src/lib/memory/qdrant.ts::normalizeQdrantConfig()`         |
| sqlite-vec | `MEMORY_VEC_QUANTIZATION` (mazingira) | `"none" \| "int8"`             | `"none"`      | `src/lib/memory/vectorStore.ts::requestedVecQuantization()` |

- **Qdrant** husanidiwa kwa kila instansi kupitia ufunguo wa mpangilio wa `qdrantQuantization`
  (unaoonyeshwa kama sehemu ya `quantization` kwenye `PUT /api/settings/qdrant`). Wakati ni
  `"int8"`, `buildQuantizationConfig()` huomba ukadiriaji wa skala
  (`always_ram`, kantili `0.99`) na utafutaji huwezesha `rescore: true` ili
  vekta za usahihi kamili ziboreshe seti ya matokeo tarajiwa ya int8.
- Ukadiriaji wa **sqlite-vec** ni wa **mazingira pekee** (si mpangilio wa DB): weka
  `MEMORY_VEC_QUANTIZATION=int8` ili kuhifadhi vekta za ndani kama safu wima ya `int8[dim]`
  kupitia `vec_quantize_int8(?, 'unit')`. Hali iliyochaguliwa hujumuishwa kwenye
  `embedding_signature` (kiambishi tamati cha `:int8`), kwa hivyo kubadilisha hali husababisha
  uundaji upya kamili wa faharasa ya jedwali la `vec_memories` — njia ileile ya kujaza data za awali polepole inayotumika wakati
  modeli ya upachikaji inapobadilika.

## Aina za Kumbukumbu

`MemoryType` (`src/lib/memory/types.ts`):

| Aina         | Hutumika kwa                                                                                             |
| ------------ | -------------------------------------------------------------------------------------------------------- |
| `factual`    | Mapendeleo, taarifa thabiti za mtumiaji, mifumo ya tabia                                                 |
| `episodic`   | Maamuzi yanayohusishwa na wakati mahususi ("Nilichagua Postgres")                                        |
| `procedural` | Kumbukumbu ya mtiririko wa kazi / jinsi ya kufanya (imehifadhiwa; kwa sasa hakuna kichopozi kiotomatiki) |
| `semantic`   | Imehifadhiwa kwa maingizo ya hifadhi ya vekta                                                            |

Mkakati wa urejeshaji wa `MemoryConfig` ni mojawapo ya `exact`, `semantic`, au `hybrid`,
na upeo ni mojawapo ya `session`, `apiKey`, au `global`. Upeo chaguo-msingi kutoka
`getMemorySettings()` ni `apiKey`.

## Utopoaji wa Taarifa (`extraction.ts`)

Utopoaji **unategemea regex**, si LLM — huendeshwa ndani ya mchakato kwa
`setImmediate()` ili kamwe usizuie mtiririko wa jibu:

- **Mifumo ya mapendeleo** → `MemoryType.FACTUAL`
  (k.m. `Napendelea …`, `Ninapenda sana …`, `ninachopenda zaidi ni …`, `Nachukia …`)
- **Mifumo ya maamuzi** → `MemoryType.EPISODIC`
  (k.m. `Nitatumia …`, `Nilichagua …`, `Niliamua kutumia …`, `Nitapitisha …`)
- **Mifumo ya tabia** → `MemoryType.FACTUAL`
  (k.m. `Kwa kawaida mimi …`, `Daima mimi …`, `Mimi huwa …`)

Kila ulinganifu husafishwa (`trim`, kuunganisha nafasi tupu, na kuwekewa kikomo cha herufi 500),
huondolewa nakala ndani ya kundi kupitia `factKey(category, content)` thabiti, na
huhifadhiwa kupitia `createMemory()` ikiwa na metadata
`{category, extractedAt, source: "llm_response"}`. Maandishi ya ingizo yanawekewa kikomo cha
64 KiB (`MAX_EXTRACTION_TEXT_LENGTH`) — yanapokuwa marefu zaidi, **sehemu ya mwisho** ya maandishi
hutumika ili maudhui ya hivi karibuni zaidi ya msaidizi yashirikishwe kila wakati.

`extractFactsFromText(text)` husafirishwa kwa ajili ya majaribio na hurudisha taarifa
zilizopangwa bila kuzihifadhi.

## Urejeshaji (`retrieval.ts`)

`retrieveMemories(apiKeyId, config)` ndiyo sehemu kuu ya kuingilia. Hufanya yafuatayo:

1. Husawazisha na kuthibitisha usanidi kupitia `MemoryConfigSchema`.
2. Hurudisha `[]` mara moja wakati `enabled` ni false au `maxTokens <= 0`.
3. Huweka `maxTokens` ndani ya masafa ya `[1, 8000]`.
4. Hutambua iwapo jedwali la kisasa la `memories` lipo (dhidi ya jedwali la zamani la `memory`)
   ili hifadhidata za zamani ziendelee kufanya kazi.
5. Huunda hoja msingi yenye kinga ya muda wa kuisha
   (`expires_at IS NULL OR datetime(expires_at) > datetime('now')`), upeo wa hiari wa
   kipindi, na kikomo cha hiari cha `retentionDays`.
6. Hugawanyika kulingana na mkakati:
   - **`exact`** (chaguo-msingi): mpangilio wa mfuatano wa muda `ORDER BY created_at DESC LIMIT 100`.
   - **`semantic`**: ikiwa `config.query` na `memory_fts` zipo, hutumia JOIN ya
     `memory_fts MATCH ?` na kupanga kulingana na nafasi ya FTS; hurudi kwenye mpangilio wa mfuatano wa muda
     wakati FTS inarudisha safu 0.
   - **`hybrid`**: muungano wa matokeo ya FTS (umuhimu wa juu zaidi) na seti ya
     mfuatano wa muda, huku nakala zikiondolewa kwa id.
7. Hukokotoa alama ya umuhimu wa maneno muhimu (`getRelevanceScore`) katika
   `content`, `key`, na JSON ya `metadata` wakati hoja imetolewa. Safu zenye
   alama sifuri huchujwa.
8. Hupanga kwa alama kwa mpangilio wa kushuka, kisha `createdAt` kwa mpangilio wa kushuka.
9. Hupitia orodha iliyopangwa na kukubali maingizo mradi jumla inayoendelea ya
   `estimateTokens(content)` (≈ `length / 4`) ibaki chini ya bajeti. Daima
   hurudisha angalau ingizo moja wakati kuna ulinganifu wowote.

`estimateTokens` husafirishwa na kutumiwa na urejeshaji, ufupishaji, na zana ya MCP ya
`omniroute_memory_search`.

## Uingizaji (`injection.ts`)

`injectMemory(request, memories, provider)`:

1. Huunganisha maudhui yote ya kumbukumbu kuwa mfuatano mmoja wa `Memory context: …`.
2. Huchagua mkakati kulingana na jina la mtoa huduma:
   - **Ujumbe wa mfumo** (chaguo-msingi kwa OpenAI, Anthropic, Gemini, …) — huongeza
     `{role: "system", content: memoryText}` mwanzoni kabla ya ujumbe wowote uliopo wa mfumo
     ili vidokezo vya mfumo vya mtumiaji viendelee kupewa kipaumbele.
   - **Ujumbe wa mtumiaji** (chaguo la akiba) — kwa watoa huduma walio katika
     `PROVIDERS_WITHOUT_SYSTEM_MESSAGE`: `o1`, `o1-mini`, `o1-preview`,
     `glm`, `glmt`, `glm-cn`, `zai`, `qianfan`. Hawa hukataa jukumu la mfumo
     na vinginevyo wangerejesha 400 (taz. suala #1701 la GLM/Zhipu).
3. Hurekodi idadi, mkakati na modeli chini ya `memory.injection.injected`.

`providerSupportsSystemMessage(provider)` husafirishwa kwa wapigaji wanaohitaji
kufanya maamuzi yao wenyewe ya uelekezaji. Watoa huduma wasiojulikana hutumia `true`
(jukumu la mfumo linaruhusiwa) kama chaguo-msingi kwa usalama.

## Mipangilio (`settings.ts`)

Usanidi wa kumbukumbu **huhifadhiwa katika jedwali la mipangilio la DB**, si katika vigezo vya mazingira.
`getMemorySettings()` husoma kutoka `getSettings()` na huhifadhi matokeo katika kache
ndani ya mchakato; `invalidateMemorySettingsCache()` huitwa na njia ya PUT ya mipangilio
baada ya uandishi.

### Sehemu za zamani (matoleo yote)

| Ufunguo wa DB         | Aina    | Chaguo-msingi                                       | Kidhibiti cha UI                                                         |
| --------------------- | ------- | --------------------------------------------------- | ------------------------------------------------------------------------ |
| `memoryEnabled`       | boolean | `false` (imezimwa kwa chaguo-msingi tangu v3.8.30)  | Kuwasha/kuzima kumbukumbu                                                |
| `memoryMaxTokens`     | integer | `2000` (masafa `0–16000`)                           | Bajeti ya tokeni za uingizaji                                            |
| `memoryRetentionDays` | integer | `30` (masafa `1–365`)                               | Kipindi cha kuhifadhi                                                    |
| `memoryStrategy`      | enum    | `"hybrid"` (moja ya `recent`, `semantic`, `hybrid`) | Mkakati wa urejeshaji                                                    |
| `skillsEnabled`       | boolean | `false`                                             | Huwasha au kuzima uingizaji wa ujuzi kwa kila ufunguo (tazama SKILLS.md) |

Kumbuka: mkakati wa UI `"recent"` hulingana na mkakati wa ndani wa urejeshaji
`"exact"` kupitia `toMemoryRetrievalConfig()` (mpangilio wa kikronolojia).

### Sehemu mpya (v3.8.6, mpango 21 D9)

Tazama pia sehemu ya "Kiendelezi cha mipangilio" hapo juu kwa maelezo ya sehemu.

| Ufunguo wa DB               | Sehemu ya API            | Chaguo-msingi |
| --------------------------- | ------------------------ | ------------- |
| `memoryEmbeddingSource`     | `embeddingSource`        | `"auto"`      |
| `memoryEmbeddingModel`      | `embeddingProviderModel` | `null`        |
| `memoryTransformersEnabled` | `transformersEnabled`    | `false`       |
| `memoryStaticEnabled`       | `staticEnabled`          | `false`       |
| `memoryRerankEnabled`       | `rerankEnabled`          | `false`       |
| `memoryRerankModel`         | `rerankProviderModel`    | `null`        |
| `memoryVectorStore`         | `vectorStore`            | `"auto"`      |

Funguo za DB zinazohusiana na Qdrant (`qdrantEnabled`, `qdrantHost`, `qdrantPort`,
`qdrantApiKey`, `qdrantCollection` yenye chaguo-msingi `"omniroute_memory"`,
`qdrantEmbeddingModel` yenye chaguo-msingi `"openai/text-embedding-3-small"`) husomwa na
`normalizeQdrantConfig()` katika `qdrant.ts`.

### Vigezo vya mazingira (v3.8.6)

Vigezo sita vya mazingira vya hiari hurekebisha tabia ya injini wakati wa utekelezaji (vimeandikwa katika `.env.example`):

| Kigezo                          | Chaguo-msingi              | Maelezo                                                                                                                                                        |
| ------------------------------- | -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `MEMORY_EMBEDDING_CACHE_TTL_MS` | `300000`                   | TTL ya kache ya upachikaji (dakika 5)                                                                                                                          |
| `MEMORY_EMBEDDING_CACHE_MAX`    | `1000`                     | Idadi ya juu zaidi ya vipengee katika kache ya LRU ya upachikaji                                                                                               |
| `MEMORY_TRANSFORMERS_MODEL`     | `Xenova/all-MiniLM-L6-v2`  | Hazina ya HF ya modeli ya Transformers.js                                                                                                                      |
| `MEMORY_STATIC_MODEL`           | `minishlab/potion-base-8M` | Hazina ya HF ya modeli tuli ya potion                                                                                                                          |
| `MEMORY_STATIC_CACHE_DIR`       | `<DATA_DIR>/embeddings`    | Mahali pa kuhifadhi modeli zilizopakuliwa                                                                                                                      |
| `MEMORY_VEC_TOP_K`              | `20`                       | Top-K ya chaguo-msingi kwa utafutaji wa vekta                                                                                                                  |
| `MEMORY_RRF_K`                  | `60`                       | Konstanti ya RRF k kwa utafutaji mseto                                                                                                                         |
| `MEMORY_VEC_QUANTIZATION`       | `none`                     | Weka kuwa `int8` ili kuhifadhi vekta za ndani za sqlite-vec zilizokwantishwa (~ndogo mara 4; ni hiari). Kubadilisha modi hulazimisha uundaji upya wa faharasa. |

## Ufupishaji (`summarization.ts`)

`summarizeMemories(apiKeyId, sessionId?, maxTokens = 4000)` hubana maudhui ya zamani
wakati jumla inayoendelea ya tokeni katika kumbukumbu za ufunguo inapozidi
kikomo. Hupitia safu kwa mpangilio wa DESC kulingana na `created_at`, huhifadhi safu zinazotoshea, na kwa
zilizosalia hubadilisha `content` papo hapo kwa sentensi tatu za kwanza za
maudhui asili. `tokensSaved` ni tofauti ya `estimateTokens` kati ya maudhui ya
zamani na mapya.

Utaratibu huu **unapatikana lakini hauitwi kiotomatiki** katika mtiririko wa sasa wa
gumzo — uite kutoka kwenye cron, kitendo cha msimamizi, au kiunganishi cha
`MemoryConfig.autoSummarize` ikiwa unahitaji ubanaji endelevu. Upotevu wa data
ni wa njia moja: maandishi asili yanaandikwa juu.

## API ya REST

Endpoint zote zinahitaji uthibitishaji wa usimamizi (`requireManagementAuth`).

### Endpoint za msingi za kumbukumbu (zilizopo + zilizosasishwa)

| Mbinu    | Njia                 | Maelezo                                                                                                                                                                                                |
| -------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `GET`    | `/api/memory`        | Orodha iliyogawanywa katika kurasa yenye vichujio: `apiKeyId`, `type`, `sessionId`, `q`, `limit`, `page`, `offset`. Jibu linajumuisha `stats.total`, `stats.tokensUsed`, `stats.hitRate`, `cacheStats` |
| `POST`   | `/api/memory`        | Unda ingizo (lililothibitishwa na Zod: `content`, `key`, `type` ya hiari, `sessionId`, `apiKeyId`, `metadata`, `expiresAt`). Huita `createMemory()` ambayo hufanya upsert kwenye `(apiKeyId, key)`     |
| `GET`    | `/api/memory/[id]`   | Leta ingizo moja kwa UUID                                                                                                                                                                              |
| `PUT`    | `/api/memory/[id]`   | Sasisha sehemu za ingizo (`type`, `key`, `content`, `metadata`). Mwili: `MemoryUpdatePutSchema`. Pia husawazisha vekta ikiwa chanzo cha embedding kinapatikana.                                        |
| `DELETE` | `/api/memory/[id]`   | Futa ingizo; pia hufuta kutoka `vec_memories` (D15) na Qdrant kwa kadiri iwezekanavyo. Hurejesha 404 likikosekana.                                                                                     |
| `GET`    | `/api/memory/health` | Huendesha `verifyExtractionPipeline("health-check")` — mzunguko kamili wa unda→orodhesha→futa. Hurejesha `{working, latencyMs, error?}`                                                                |

### Endpoint mpya za injini ya kumbukumbu (mpango wa 21)

| Mbinu  | Njia                              | Maelezo                                                                                                                                                                                        |
| ------ | --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `POST` | `/api/memory/retrieve-preview`    | Uendeshaji wa majaribio wa `retrieveMemories` — hurejesha matokeo yaliyopangwa kwa alama, kiwango na tokeni. Mwili: `RetrievePreviewSchema`. HAIINGIZI wala kubadilisha kumbukumbu.            |
| `GET`  | `/api/memory/embedding-providers` | Huorodhesha watoa huduma pamoja na modeli za embedding, ikionyesha ni zipi zina ufunguo wa API uliosanidiwa.                                                                                   |
| `GET`  | `/api/memory/engine-status`       | Hurejesha hali kamili ya injini: kiwango cha maneno muhimu, utatuzi wa embedding, takwimu za hifadhi ya vekta, afya ya Qdrant na usanidi wa upangaji upya. Muundo: `MemoryEngineStatusSchema`. |
| `POST` | `/api/memory/summarize`           | Anzisha ubanaji wa kumbukumbu kwa mikono. Mwili: `MemorySummarizeSchema` (`olderThanDays`, `apiKeyId?`, `dryRun`). Hurejesha `{candidates, tokensSaved}`.                                      |
| `POST` | `/api/memory/reindex`             | Anzisha uundaji upya wa faharasa ya vekta kwa kumbukumbu zenye `needs_reindex=1`. Mwili: `MemoryReindexSchema` (`force`). Hurejesha `{started, pending}`.                                      |

### Endpoint za mipangilio

| Mbinu  | Njia                                    | Maelezo                                                                                                      |
| ------ | --------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `GET`  | `/api/settings/memory`                  | `MemorySettingsExtended` ya sasa iliyosawazishwa (sehemu 7 mpya + za zamani)                                 |
| `PUT`  | `/api/settings/memory`                  | Sasisha sehemu yoyote kutoka `MemorySettingsExtendedSchema` (jumla ya sehemu 12)                             |
| `GET`  | `/api/settings/qdrant`                  | Mipangilio ya sasa ya Qdrant (`QdrantSettingsSchema`)                                                        |
| `PUT`  | `/api/settings/qdrant`                  | Sasisha mipangilio ya Qdrant. Mwili: `QdrantSettingsUpdateSchema`. `apiKey` = mfuatano tupu huondoa ufunguo. |
| `GET`  | `/api/settings/qdrant/health`           | Uchunguzi wa upatikanaji dhidi ya instance ya Qdrant iliyosanidiwa. Hurejesha `QdrantHealthResultSchema`.    |
| `POST` | `/api/settings/qdrant/search`           | Jaribio la utafutaji wa kisemantiki dhidi ya Qdrant. Mwili: `QdrantSearchSchema` (`query`, `topK`).          |
| `POST` | `/api/settings/qdrant/cleanup`          | Ondoa pointi za Qdrant za kumbukumbu zilizokwisha muda / za zamani.                                          |
| `GET`  | `/api/settings/qdrant/embedding-models` | Orodhesha modeli za embedding zinazopatikana kwa Qdrant.                                                     |

Hoja ya orodha ya `/api/memory` inatumia ama ugawaji katika kurasa unaotegemea `page`
(`parsePaginationParams`) **au** `offset` ghafi — `offset` inapokuwepo,
hupewa kipaumbele na `page` inayotokana nayo huhesabiwa kwa ajili ya muundo wa jibu.

## Zana za MCP (`open-sse/mcp-server/tools/memoryTools.ts`)

Seva ya MCP inapowashwa, zana tatu za kumbukumbu husajiliwa:

- `omniroute_memory_search` — `{apiKeyId, query?, type?, maxTokens?, limit?}`
  → hufunika `retrieveMemories()`. Kuanzia v3.8.6 (D16), `strategy` husomwa
  kutoka `getMemorySettings()` badala ya kuwekwa moja kwa moja kuwa `"exact"`. Ikiwa
  `query` imetolewa na `strategy` ni `semantic` au `hybrid`, hifadhi ya vekta
  hutumika inapopatikana.
- `omniroute_memory_add` — `{apiKeyId, sessionId?, type, key, content,
metadata?}` → hufunika `createMemory()`. Hukubali aina 4 rasmi pekee:
  `factual`, `episodic`, `procedural`, `semantic` (D17).
- `omniroute_memory_clear` — `{apiKeyId, type?, olderThan?}` → huorodhesha
  rekodi zinazolingana, kwa hiari huchuja kwa muhuri wa muda wa kuundwa kabla ya muda fulani, kisha hufuta kila
  moja kupitia `deleteMemory()` (ambayo pia huondoa vekta kutoka sqlite-vec + Qdrant).

Tazama [MCP-SERVER.md](./MCP-SERVER.md) kwa maelezo ya usafirishaji na upeo.

## Dashibodi (Studio ya Kumbukumbu)

`src/app/(dashboard)/dashboard/memory/page.tsx` sasa ni **Studio yenye vichupo 3**:

### Kichupo: Kumbukumbu

- Kadi ya dhana (maelezo ya "Jinsi inavyofanya kazi" yanayoweza kukunjwa).
- Orodha ya wakati halisi, utafutaji na ugawaji wa kurasa (ucheleweshaji wa ms 300).
- Kichujio cha aina (`factual` / `episodic` / `procedural` / `semantic` / zote).
- Dirisha la kuongeza kumbukumbu (ufunguo, maudhui, aina).
- Uhariri wa moja kwa moja (kitufe cha penseli → `PUT /api/memory/[id]`).
- Kufuta kila safu (pamoja na kisanduku cha uthibitishaji).
- Uhamishaji wa ukurasa wa sasa kama JSON; uingizaji wa JSON kupitia kichagua faili.
- Kadi za takwimu: `totalEntries`, `tokensUsed`, `hitRate`.
- Kitufe cha "Fupisha za zamani" → `POST /api/memory/summarize` (utekelezaji wa majaribio kwanza huonyesha
  idadi ya rekodi zinazofaa, kisha huomba uthibitisho).
- Nukta ya kijani/nyekundu ya hali inayoendeshwa na `GET /api/memory/health`.

### Kichupo: Eneo la Majaribio

- Sehemu ya kuingiza hoja + kichagua mkakati (Halisi / Kisemantiki / Mseto) + kikomo cha tokeni.
- "Iga" → `POST /api/memory/retrieve-preview` — huonyesha matokeo yaliyopangwa pamoja na
  `score`, `tier`, `tokens`, `vecScore`, `ftsScore`.
- Paneli ya utatuzi inayoonyesha chanzo cha upachikaji / hifadhi ya vekta iliyotumika na
  ikiwa mbinu mbadala ilitumika.

### Kichupo: Injini

- Paneli ya hali ya injini (kiashiria cha neno muhimu la FTS5, kiashiria cha upachikaji, kiashiria cha hifadhi ya vekta,
  kiashiria cha afya ya Qdrant, kiashiria cha upangaji upya).
- Kitufe cha "Weka Faharasa Upya Sasa" → `POST /api/memory/reindex`.
- Kichagua chanzo cha upachikaji (kiotomatiki / cha mbali / tuli / transformers + vigeuzi).
- Kadi ya usanidi wa Qdrant (kigeuzi cha kuwezesha, seva mlango/mkusanyiko/ufunguo, jaribio la muunganisho,
  jaribio la utafutaji wa kisemantiki, usafishaji).
- Kadi ya usanidi wa upangaji upya (kigeuzi cha kuwezesha, kichagua mtoa huduma/muundo).

Mipangilio ya Kumbukumbu na Qdrant pia inapatikana chini ya
`/dashboard/settings → Memory & Skills` (`MemorySkillsTab.tsx`) kwa
kiolesura cha mipangilio ya zamani/ya jumla.

## Uakibishaji

`src/lib/memory/store.ts` hudumisha akiba inayokaribia LRU ndani ya mchakato
(`MEMORY_CACHE_TTL = 1 min`, `MEMORY_MAX_CACHE_SIZE = 500`, huku 20 %
ya rekodi za zamani zaidi zikiondolewa) kwa usomaji wa `getMemory(id)`, pamoja na safu ya jumla ya ufunguo/thamani ya
`memoryCache` (`src/lib/memory/cache.ts`) yenye mbinu za `get`/`set`/`invalidate`
zinazotumiwa na wapigaji wanaotaka akiba yao wenyewe yenye upeo maalum (LRU ya rekodi 1 000,
TTL chaguomsingi ya dakika 5).

## Faragha na Mzunguko wa Maisha

- Umiliki wa kumbukumbu ni kitambulisho cha ufunguo wa API (`resolveMemoryOwnerId` katika
  `chatCore.ts`). Bila `apiKeyInfo.id`, urejeshaji, udungaji,
  wala uchimbaji hautekelezwi.
- Maingizo yenye `expires_at` ya wakati ujao huchujwa kutoka kwenye urejeshaji; maingizo ya zamani
  yanayozidi `retentionDays` huondolewa na kisharti cha
  `created_at >= cutoff` katika `retrieveMemories`.
- Kwa ufutaji wa kudumu, tumia `DELETE /api/memory/[id]` au `omniroute_memory_clear`.
- Uchimbaji huanzishwa bila kusubiri matokeo kupitia `setImmediate`; hitilafu huandikwa kwenye kumbukumbu chini ya
  `memory.extraction.background.failed` na kamwe hazionyeshwi kwa mpigaji.
- Mizunguko ya uthibitishaji (`verifyExtractionPipeline`) husafisha maingizo yake yenyewe ya
  majaribio katika kizuizi cha `finally`.

## Tazama Pia

- [SKILLS.md](./SKILLS.md) — mpangilio wa `skillsEnabled` hudunga ufafanuzi wa zana
  pamoja na kumbukumbu.
- [MCP-SERVER.md](./MCP-SERVER.md) — usafirishaji / mawanda ya MCP.
- [API_REFERENCE.md](../reference/API_REFERENCE.md) — eneo pana zaidi la API.
- Moduli za chanzo:
  - `src/lib/memory/types.ts`, `schemas.ts`
  - `src/lib/memory/store.ts`, `retrieval.ts`, `injection.ts`, `reindex.ts`
  - `src/lib/memory/extraction.ts`, `summarization.ts`, `verify.ts`
  - `src/lib/memory/settings.ts`, `qdrant.ts`, `cache.ts`
  - `src/lib/memory/vectorStore.ts` — sqlite-vec + RRF mseto
  - `src/lib/memory/embedding/index.ts` — safu ya upachikaji yenye vyanzo vingi
  - `src/lib/memory/embedding/types.ts`, `remote.ts`, `staticPotion.ts`,
    `transformersLocal.ts`, `cache.ts`
  - `src/shared/schemas/memory.ts` — skima za Zod kwa miili yote ya API ya kumbukumbu
  - `src/shared/schemas/qdrant.ts` — skima za Zod kwa mipangilio/operesheni za Qdrant
  - `src/lib/db/memoryVec.ts` — CRUD ya `memory_vec_meta`
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
  - `src/app/api/settings/qdrant/route.ts` + njia ndogo
  - `src/app/(dashboard)/dashboard/memory/` — Kiolesura cha Studio (ukurasa + vijenzi +
    vichupo + hooks)
  - `open-sse/handlers/chatCore.ts` (muunganisho wa udungaji / uchimbaji)
  - `open-sse/mcp-server/tools/memoryTools.ts`

---

## Kuchagua Mtoa Huduma wa Upachikaji (v3.8.16+)

Injini ya kumbukumbu ya OmniRoute inatumia **vyanzo vinne vya upachikaji** (`src/lib/memory/embedding/`). Kila kimoja kina uwiano tofauti katika **ukawiaji, gharama, ubora wa modeli, na utata wa usanidi**.

### Vyanzo vya Upachikaji

| Mtoa huduma    | Chanzo                                                       | Ukawiaji                                            | Gharama              | Ubora                                         | Usanidi                                                        |
| -------------- | ------------------------------------------------------------ | --------------------------------------------------- | -------------------- | --------------------------------------------- | -------------------------------------------------------------- |
| `transformers` | Modeli ya ndani ya ONNX (Xenova/all-MiniLM-L6-v2)            | ~50-150ms (CPU)                                     | Bila malipo          | Mzuri                                         | `npm install` pekee                                            |
| `static`       | Vekta zilizokokotolewa mapema (zilizohifadhiwa kwenye kache) | <1ms                                                | Bila malipo          | Haitumiki (hutegemea kupatikana kwenye kache) | Hakuna                                                         |
| `remote`       | API ya OpenAI / Cohere / Voyage                              | ~100-300ms                                          | $0.02-0.10/1M tokeni | Bora sana                                     | Ufunguo wa API                                                 |
| `auto`         | Huchagua chanzo bora kinachopatikana wakati wa utekelezaji   | Sawa na chanzo kilichochaguliwa                     | Bila malipo          | Sawa na chanzo kilichochaguliwa               | Hakuna                                                         |
| _(cache)_      | Safu ya LRU ya ndani ya kumbukumbu juu ya chanzo chochote    | <1ms (ikipatikana), ukawiaji kamili (isipopatikana) | Bila malipo          | Sawa na chanzo cha msingi                     | Huwa imewashwa kila wakati (si chanzo kinachoweza kuchaguliwa) |

### Mti wa Maamuzi

```
                  Muktadha wako wa upelekaji ni upi?
                  │
      ┌───────────┼───────────┬──────────────┐
      │           │           │              │
  UUNDaji/JARIBIO UZALISHAJI MDOGO UZALISHAJI MKUBWA UKINGO / NJE YA MTANDAO
      │           │           │              │
      ▼           ▼           ▼              ▼
  transformers transformers remote (Qdrant) transformers
  (bila malipo, hakuna API)  (ubora bora)    (hakuna intaneti)
      │           │           │              │
      └────────┬──┴───────────┴──────────────┘
               │
               ▼
            DAIMA ongeza safu ya `cache` juu
            (`LruCache` hufunika mtoa huduma yeyote)
```

### Usanidi wa Hifadhidata na API

Chaguo za upachikaji wa kumbukumbu husanidiwa kupitia API/Kiolesura cha Mipangilio, si vigeu vya mazingira. Funguo husika za hifadhidata ya mipangilio chini ya Mipangilio (`normalizeMemorySettings` katika `src/lib/memory/settings.ts`) ni:

- `memoryEmbeddingSource`: `"transformers"` (ya ndani), `"remote"` (inayotumia API, k.m. OpenAI), `"static"` (hifadhi ya nje), au `"auto"`
- `memoryEmbeddingProviderModel`: Kitambulisho cha modeli kwa vyanzo vya remote/static (k.m., `"text-embedding-3-small"`)
- `memoryTransformersEnabled`: `true` | `false`
- `memoryStaticEnabled`: `true` | `false`
- `memoryVectorStore`: `"sqlite-vec"`, `"qdrant"`, au `"auto"`

#### Modeli ya Ndani (`transformers`)

Hutumia transformers.js ndani yake kuendesha modeli za ndani:

```bash
# Vigeu vya mazingira vinavyosomwa katika msimbo (src/lib/memory/embedding/index.ts):
MEMORY_TRANSFORMERS_MODEL=Xenova/all-MiniLM-L6-v2  # Hazina ya modeli ya HF
MEMORY_STATIC_MODEL=minishlab/potion-base-8M       # Modeli tuli ya potion ya HF
MEMORY_STATIC_CACHE_DIR=<DATA_DIR>/embeddings      # Saraka ya kache
```

#### Kache ya Upachikaji ya LRU

Kache huwashwa kila wakati kwa chaguo-msingi na husanidiwa kupitia vigeu vya mazingira:

```bash
MEMORY_EMBEDDING_CACHE_MAX=1000                    # Idadi ya juu zaidi ya vipengee vilivyohifadhiwa kwenye kache
MEMORY_EMBEDDING_CACHE_TTL_MS=300000               # TTL (dakika 5)
```

### Vipimo vya Utendaji

Kipimo linganishi kwenye seva ya kawaida ya x86 yenye viini 4 (maandishi yenye takriban tokeni 100 kila moja):

| Mtoa huduma           | p50   | p95   | p99   | Gharama / embeddings milioni 1     |
| --------------------- | ----- | ----- | ----- | ---------------------------------- |
| `transformers` (CPU)  | 80ms  | 180ms | 350ms | Bila malipo                        |
| `remote` (OpenAI)     | 120ms | 220ms | 400ms | ~$0.02 (ada-002) / $0.13 (3-large) |
| `static` (Qdrant)     | 15ms  | 30ms  | 60ms  | Inategemea upangishaji wa Qdrant   |
| `cache` (imepatikana) | <1ms  | <1ms  | 2ms   | Bila malipo                        |

---

## Mifumo ya Uchimbaji wa Taarifa (v3.8.16+)

Moduli ya `extraction.ts` (`src/lib/memory/extraction.ts`) hutumia **ulinganishaji wa mifumo ya regex** ili kuchimba taarifa zilizopangwa kutoka kwenye ujumbe wa mazungumzo. Kuelewa mifumo hii hukusaidia kuboresha ubora wa uchimbaji kwa hali yako ya matumizi.

### Kategoria Chaguo-msingi za Mifumo

| Kategoria           | Mfano wa mfumo                                              | Kinachonaswa                    |
| ------------------- | ----------------------------------------------------------- | ------------------------------- |
| PREFERENCE_PATTERNS | `"Ninapendelea <X>"`, `"Ninapenda <X>"`, `"Ninachukia <X>"` | Mapendeleo ya mtumiaji          |
| DECISION_PATTERNS   | `"Nitatumia <X>"`, `"Niliamua <X>"`, `"Nilichagua <X>"`     | Maamuzi ya mtumiaji (kiepisodi) |
| PATTERN_PATTERNS    | `"Kwa kawaida <X>"`, `"Daima <X>"`, `"Kamwe <X>"`           | Mifumo endelevu ya tabia        |

### Mifano ya Mifumo (Imerahisishwa)

```ts
// Kutoka src/lib/memory/extraction.ts
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

### Kinachochimbwa

Mtumiaji anaposema:

> "Ninapendelea TypeScript. Nitatumia Postgres kwa mradi huu. Daima nafanya commit kabla ya push. Sipendi Python."
> Uchimbaji hutoa kumbukumbu 4:
>
> | Ufunguo                              | Kategoria  | Aina      | Maudhui                  |
> | ------------------------------------ | ---------- | --------- | ------------------------ |
> | `preference:typescript`              | mapendeleo | taarifa   | "TypeScript"             |
> | `decision:postgres_for_this_project` | uamuzi     | kiepisodi | "Postgres kwa mradi huu" |
> | `pattern:commit_before_pushing`      | mfumo      | taarifa   | "commit kabla ya push"   |
> | `preference:python`                  | mapendeleo | taarifa   | "Python"                 |

### Vikomo vya Uchimbaji

Ili kuzuia uchimbaji usiodhibitiwa, vikomo vifuatavyo hutumika:

| Urefu wa chini wa maudhui | herufi 3 |
| Urefu wa juu wa maudhui | herufi 500 |

### Wakati wa Kuzima Uchimbaji

Uchimbaji huendeshwa kiotomatiki wakati wowote kumbukumbu inapowezeshwa; hakuna
kibadilishaji tofauti cha uchimbaji pekee. Ili kuuzima, zima kumbukumbu kabisa (`enabled: false`
kupitia `PUT /api/settings/memory`). Fikiria kufanya hivyo wakati:

- Una ujazo mkubwa wa ujumbe na gharama ya uchimbaji si ndogo
- Mazungumzo yako mengi ni ya muda mfupi (gumzo, utatuzi wa hitilafu) bila thamani ya muda mrefu
- Tayari unanasa muktadha kupitia programu-jalizi maalum

---

## Urekebishaji wa Hybrid RRF (v3.8.16+)

Algoriti ya **Reciprocal Rank Fusion (RRF)** huunganisha matokeo ya FTS5 (neno muhimu) na vekta (kisemantiki). Kigezo cha `k` hudhibiti uzito unaotolewa kwa matokeo yaliyo katika nafasi za chini.

### Fomula

Kwa kila kumbukumbu inayotarajiwa, alama ya RRF ni:

```
RRF(d) = Σ  1 / (k + rank_i(d))
```

Ambapo:

- `k` ni thamani isiyobadilika (chaguo-msingi 60)
- `rank_i(d)` ni nafasi ya hati `d` katika mfumo wa i wa urejeshaji (FTS, vekta)
- Jumla inajumuisha mifumo yote ya urejeshaji

### Jinsi `k` Inavyoathiri Matokeo

| Thamani ya `k`             | Athari                                                                                              | Inafaa zaidi kwa                              |
| -------------------------- | --------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| `k=0`                      | Muunganisho halisi wa nafasi (bila ulainishaji)                                                     | Msingi wa kinadharia                          |
| `k=10-30`                  | Huyapa matokeo ya juu uzito mkubwa, nafasi za chini huchangia kwa kiasi kidogo                      | Wakati matokeo 3 ya juu kwa kawaida ni sahihi |
| **`k=60`** (chaguo-msingi) | Uwiano — matokeo 10 ya juu yote huchangia kwa kiasi kikubwa                                         | Urejeshaji wa matumizi ya jumla               |
| `k=100+`                   | Tambarare zaidi — hata matokeo ya nafasi za chini yanaweza kutawala yakionekana katika mifumo mingi | Wakati urejeshaji > usahihi ni muhimu         |

### Kurekebisha `k` kwa Vitendo

```bash
# Chaguo-msingi
MEMORY_RRF_K=60

# Usahihi mkali (kumbukumbu ndogo, hati chache)
MEMORY_RRF_K=20

# Urejeshaji wa kiwango cha juu (kumbukumbu kubwa, hoja mbalimbali)
MEMORY_RRF_K=120
```

**Mfano wenye `k=20`:**

- Nafasi ya FTS 1 → mchango `1/21 = 0.048`
- Nafasi ya FTS 10 → mchango `1/30 = 0.033`
- Nafasi ya vekta 1 → mchango `0.048`
- Kiwango cha juu kilichounganishwa: `0.096`

**Mfano wenye `k=60`:**

- Nafasi ya FTS 1 → mchango `1/61 = 0.016`
- Nafasi ya FTS 10 → mchango `1/70 = 0.014`
- Nafasi ya vekta 1 → mchango `0.016`
- Kiwango cha juu kilichounganishwa: `0.033`

Kwa `k` ya juu zaidi, **tofauti ya uwiano** kati ya nafasi ya 1 na nafasi ya 10 huwa ndogo zaidi, kwa hivyo algoriti hutegemea zaidi **makubaliano kati ya mifumo ya urejeshaji** kuliko uhakika wa nafasi ya juu.

### Wakati wa Kubadilisha `k`

| Dalili                                             | Jaribu                                                                             |
| -------------------------------------------------- | ---------------------------------------------------------------------------------- |
| Tokeo la juu daima hushinda, lakini si sahihi      | **Punguza** k (k.m., 20) — uhakika wa nafasi ya juu una umuhimu zaidi              |
| Jibu sahihi liko katika 5 bora lakini si la kwanza | **Ongeza** k (k.m., 100) — utoaji alama ulio tambarare zaidi huzawadia makubaliano |
| Urejeshaji ni wa juu lakini usahihi ni wa chini    | **Punguza** k — boresha mpangilio wa nafasi                                        |
| Urejeshaji ni wa chini (hati zinazohusiana hazipo) | **Ongeza** k — zipe hati za nafasi za chini nafasi                                 |

### Uwekaji Uzito wa RRF

Muunganisho wa nafasi zinazokinzana hutumia uzito sawa kwa nafasi ya vekta ya kisemantiki na nafasi ya utafutaji wa maandishi kamili:

```
RRF(d) = 1/(k + rank_vector) + 1/(k + rank_fts)
```

Hakuna viambajengo vya mazingira vya kurekebisha uzito mmoja mmoja (`MEMORY_RRF_VECTOR_WEIGHT`/`MEMORY_RRF_FTS_WEIGHT` havipo).

---

## Mkakati wa Ufupishaji (v3.8.16+)

Moduli ya `summarization.ts` (`src/lib/memory/summarization.ts`) hubana kumbukumbu za zamani ili kuweka seti inayotumika ikiwa ndogo huku ikihifadhi uwezo wa kukumbuka.

### Wakati Ufupishaji Unapoanzishwa

| Kichochezi                       | Kizingiti (chaguo-msingi) |
| -------------------------------- | ------------------------- |
| Kichochezi cha mkono kupitia API | haitumiki                 |

### Kinachofupishwa

Sehemu mbili za kuingilia zinasafirishwa kutoka `summarization.ts`:

- **`summarizeMemories(apiKeyId, sessionId?, maxTokens = 4000)`** — hubana
  kumbukumbu za kipindi kuwa matini moja ya muhtasari iliyowekewa kikomo na bajeti ya tokeni.
- **`summarizeMemoriesOlderThan(apiKeyId, days, dryRun)`** — ubanaji unaotegemea
  umri unaotumiwa na API: huchagua kila kumbukumbu iliyo na umri unaozidi `days`, huunda
  kumbukumbu moja ya muhtasari uliobanwa kutoka kwazo, na (`dryRun` ikiwa `false`) hufuta
  kumbukumbu asili. Pitisha `dryRun: true` ili kuhakiki seti ya kumbukumbu zinazolengwa na jumla ya tokeni
  bila kubadilisha chochote.

Hakuna hatua ya kuzipanga kwa makundi ya lebo/ufunguo wala ukadiriaji wa kila kumbukumbu wa "msingi dhidi ya inayoweza kufupishwa" —
uteuzi unategemea kikomo cha umri pekee, na matini ya muhtasari ni mstari uliobanwa
wenye kiambishi awali cha aina kwa kila kumbukumbu inayolengwa.

### Kuanzisha Ufupishaji

Ufupishaji ni wa **mkono / hiari** — mpangilio wa `autoSummarize` ni `false` kwa
chaguo-msingi, kwa hivyo hakuna chochote kinachobanwa kiotomatiki. Uanzishe kupitia API:

```bash
curl -X POST http://localhost:20128/api/memory/summarize \
  -H "Authorization: Bearer $OMNIROUTE_KEY"
```

Ili kuendelea kuuzima, acha tu `autoSummarize` katika thamani yake ya chaguo-msingi (`false`).

### Vidokezo vya Ubora wa Ufupishaji

- **Hakiki kwanza kwa kutumia `dryRun`** — `summarizeMemoriesOlderThan(..., true)` hurejesha
  orodha ya kumbukumbu zinazolengwa na jumla ya tokeni ili uweze kuthibitisha kitakachounganishwa
  kabla ya kufuta kumbukumbu asili.
- **Tekeleza ufupishaji wakati wa saa zenye msongamano mdogo** ikiwa una mkusanyiko mkubwa wa kumbukumbu — mwito wa LLM ndio sehemu ya polepole

```bash
# Kwa mtindo wa Cron: fupisha kila siku saa 3 asubuhi
0 3 * * * curl -X POST http://localhost:20128/api/memory/summarize \
  -H "Authorization: Bearer $OMNIROUTE_KEY"
```

---

## Muundo wa Mtoa Huduma wa MemoryBackend

> **Chanzo rasmi:** `src/lib/memory/backend.ts`, `src/lib/memory/genericBackend.ts`, `src/lib/memory/manager.ts`
> **Majaribio:** `src/lib/memory/__tests__/generic-backend.test.ts`

Muundo wa mtoa huduma wa MemoryBackend unaanzisha **safu ya uondoaji ya sehemu ya nyuma inayoweza kuchomekwa** juu ya injini iliyopo ya kumbukumbu. Badala ya kutegemea utekelezaji mmoja wa hifadhi, mfumo wa kumbukumbu sasa unatumia sehemu nyingi za nyuma (SQLite, Obsidian, Notion, sehemu maalum za nyuma za HTTP) zenye uelekezaji unaoweza kusanidiwa wa msingi/mbadala.

### Usanifu

```
┌──────────────────────────────────────────────────────────┐
│                    Njia za API                            │
│            (src/app/api/memory/route.ts)                  │
└──────────────────────┬───────────────────────────────────┘
                       │
┌──────────────────────▼───────────────────────────────────┐
│                   MemoryManager                           │
│         Mratibu wa singleton (manager.ts)                 │
│                                                          │
│  Msingi ───► Sehemu ya Nyuma A  (mf. SQLite)             │
│  Mbadala ──► Sehemu ya Nyuma B  (mf. Obsidian)           │
│              Sehemu ya Nyuma C  (mf. Notion kupitia       │
│              GenericBackend)                             │
└──────────────────────┬───────────────────────────────────┘
                       │
        ┌──────────────┼──────────────┐
        ▼              ▼              ▼
┌────────────┐ ┌────────────┐ ┌──────────────────┐
│ Sehemu ya  │ │ Sehemu ya  │ │ GenericMemory    │
│ Nyuma ya   │ │ Nyuma ya   │ │ Backend (HTTP)   │
│ SQLite     │ │ Obsidian   │ │                  │
└────────────┘ └────────────┘ └──────────────────┘
```

#### Kiolesura cha Msingi (`backend.ts`)

Kila sehemu ya nyuma lazima itekeleze kiolesura cha `MemoryBackend`:

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

  // Utafutaji
  search(config: SearchConfig): Promise<Memory[]>;

  // Hali ya mfumo
  health(): Promise<HealthCheckResult>;

  // Mzunguko wa maisha (si lazima)
  initialize?(): Promise<void>;
  shutdown?(): Promise<void>;
}
```

#### MemoryManager (`manager.ts`)

Mratibu wa singleton ambaye:

- **Husajili** sehemu za nyuma kupitia `register(backend)` — huitwa wakati wa kuanzisha kutoka `index.ts`
- **Husanidi** sehemu ya msingi na mbadala kupitia `configure(primary, fallbacks)`
- **Huelekeza** CRUD/utafutaji kwenda sehemu ya msingi, akitumia mlolongo wa sehemu mbadala inaposhindikana
- **Hukagua hali** ya sehemu zote za nyuma mara kwa mara

**Tabia ya sehemu mbadala:**

| Operesheni | Sehemu ya msingi           | Sehemu mbadala                  |
| ---------- | -------------------------- | ------------------------------- |
| `create`   | ✅ Ya msingi pekee         | ❌                              |
| `get`      | ✅ Jaribu ya msingi kwanza | ✅ Tumia mbadala ikiwa ni null  |
| `update`   | ✅ Ya msingi pekee         | ✅ Usawazishaji usiosubiri jibu |
| `delete`   | ✅ Ya msingi pekee         | ✅ Usawazishaji usiosubiri jibu |
| `list`     | ✅ Ya msingi pekee         | ❌                              |
| `search`   | ✅ Ya msingi kwanza        | ✅ Mbadala kunapotokea hitilafu |

#### GenericMemoryBackend (`genericBackend.ts`)

Kiunganishi cha jumla cha HTTP ambacho hurekebisha API yoyote ya REST kuwa MemoryBackend. Kinafaa kwa:

- **Notion** — unganisha kupitia Notion API
- **Obsidian** — unganisha kupitia Obsidian Local REST API
- **Sehemu maalum za nyuma** — huduma yoyote inayotoa API ya kumbukumbu ya RESTful

**Usanidi:**

```typescript
interface GenericBackendConfig {
  baseUrl: string;           // URL ya msingi ya API ya backend
  apiKey?: string;           // Tokeni ya Bearer kwa ajili ya uthibitishaji
  headers?: Record<string, string>;  // Vichwa maalum vya HTTP
  timeout?: number;          // Muda wa mwisho wa ombi (chaguomsingi: 30000ms)
  backendType?: string;      // Kwa ajili ya kumbukumbu za matukio

  // Ubatilishaji wa endpoint (chaguomsingi hutumia kanuni za REST)
  endpoints?: {
    search?: string;   // chaguomsingi: "/memories/search"
    create?: string;   // chaguomsingi: "/memories"
    list?: string;     // chaguomsingi: "/memories"
    get?: string;      // chaguomsingi: "/memories/{id}"
    update?: string;   // chaguomsingi: "/memories/{id}"
    delete?: string;   // chaguomsingi: "/memories/{id}"
    health?: string;   // chaguomsingi: "/health"
  };

  // Ulinganishaji wa majina ya vigezo vya hoja
  queryParams?: {
    query?/apiKeyId?/limit?/offset?/strategy?/maxTokens?/type?/sessionId?/orderBy?/orderDir?/options?
  };

  // Ulinganishaji wa majina ya vigezo vya njia
  pathParams?: {
    id?/memoryId?
  };
}
```

**Backend zinazojulikana** zimesanidiwa mapema katika `KNOWN_BACKENDS`:

```typescript
createKnownBackend("obsidian"); // → GenericMemoryBackend iliyoelekezwa kwenye localhost:27123
createKnownBackend("notion"); // → GenericMemoryBackend iliyoelekezwa kwenye api.notion.com/v1
```

#### Backend Zilizojumuishwa

##### SQLiteBackend (`sqliteBackend.ts`)

Backend msingi ya chaguomsingi. Hufunika hifadhi iliyopo ya kumbukumbu inayotumia SQLite kupitia `src/lib/memory/store.ts`. Husajiliwa kiotomatiki wakati wa kuwasha.

```typescript
import { sqliteBackend } from "./sqliteBackend";
memoryManager.register(sqliteBackend);
```

##### ObsidianBackend (`obsidianBackend.ts`)

Hufunika muunganisho uliopo wa Obsidian (`src/lib/memory/obsidianBackend.ts`). Huunganisha kwenye vault ya Obsidian kupitia Obsidian Local REST API.

### Mipangilio

Mipangilio ya backend ya kumbukumbu huhifadhiwa katika jedwali la mipangilio ya programu na kudhibitiwa kupitia `src/lib/memory/settings.ts`:

| Mpangilio           | Ufunguo wa Env/Usanidi   | Chaguomsingi | Maelezo                                  |
| ------------------- | ------------------------ | ------------ | ---------------------------------------- |
| Backend msingi      | `memoryPrimaryBackend`   | `"sqlite"`   | ID ya backend msingi                     |
| Backend za akiba    | `memoryFallbackBackends` | `[]`         | ID za backend za akiba zilizopangwa      |
| Misanidi ya backend | `memoryBackendConfigs`   | `{}`         | Ubatilishaji wa usanidi kwa kila backend |

Mipangilio husawazishwa kupitia `normalizeMemorySettings()` na kuhifadhiwa kwenye akiba katika `getMemorySettings()`.

### Mtiririko wa Uanzishaji

```
Uanzishaji wa programu
  → uingizaji wa index.ts (athari ya pembeni): husajili SQLiteBackend
  → initMemoryBackends() huitwa kutoka kwenye mzunguko wa maisha wa programu:
      1. Pakia mipangilio (getMemorySettings)
      2. Sanidi backend msingi + za akiba
      3. Anzisha backend zote (ukaguzi wa afya)
      4. Tayari kwa maombi
```

### Kuongeza Backend Mpya

1. **Tekeleza kiolesura cha `MemoryBackend`** katika `src/lib/memory/<name>Backend.ts`
2. **Hamisha** kutoka `src/lib/memory/index.ts`
3. **Sajili** kwa `memoryManager.register(yourBackend)` wakati wa kuwasha
4. **Sanidi** kupitia mipangilio: weka `memoryPrimaryBackend` kuwa ID ya backend yako
5. **Jaribu** ukitumia `src/lib/memory/__tests__/generic-backend.test.ts` kama rejeleo

#### Mfano: Backend ya Brain

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

### Uthibitishaji

#### Majaribio ya kitengo

```bash
npx vitest run src/lib/memory/__tests__/generic-backend.test.ts --reporter=verbose
```

Matokeo yanayotarajiwa: **majaribio 35, yote yakifaulu** yakijumuisha:

- Kijenzi (2)
- Ukaguzi wa afya (4) — mafanikio, hitilafu 500, hitilafu ya mtandao, ucheleweshaji
- Uanzishaji (2) — mafanikio, kushindwa
- Uundaji (2) — endpoint ya chaguomsingi, endpoint maalum
- Upataji (4) — mafanikio, 404 → null, isiyo 404 husababisha hitilafu, vigezo maalum vya njia
- Usasishaji (2) — mafanikio, 404 → false
- Ufutaji (2) — mafanikio, 404 → false
- Uorodheshaji (2) — vigezo vya hoja, majina maalum ya vigezo
- Utafutaji (3) — vigezo vya hoja, endpoint maalum, ubadilishaji wa options kuwa mfuatano
- Vichwa vya uthibitishaji (2) — tokeni ya Bearer, vichwa maalum
- Kiwanda (1)

#### Ukaguzi wa aina

```bash
npm run typecheck:core
```

Inayotarajiwa: **hitilafu 0**.
