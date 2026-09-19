# Memory System (தமிழ்)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/MEMORY.md) · 🇪🇹 [am](../../../am/docs/frameworks/MEMORY.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/MEMORY.md) · 🇦🇿 [az](../../../az/docs/frameworks/MEMORY.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/MEMORY.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/MEMORY.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/MEMORY.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/MEMORY.md) · 🇩🇰 [da](../../../da/docs/frameworks/MEMORY.md) · 🇩🇪 [de](../../../de/docs/frameworks/MEMORY.md) · 🇬🇷 [el](../../../el/docs/frameworks/MEMORY.md) · 🇪🇸 [es](../../../es/docs/frameworks/MEMORY.md) · 🇪🇪 [et](../../../et/docs/frameworks/MEMORY.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/MEMORY.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/MEMORY.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/MEMORY.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/MEMORY.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/MEMORY.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/MEMORY.md) · 🇮🇱 [he](../../../he/docs/frameworks/MEMORY.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/MEMORY.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/MEMORY.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/MEMORY.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/MEMORY.md) · 🇮🇩 [id](../../../id/docs/frameworks/MEMORY.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/MEMORY.md) · 🇮🇹 [it](../../../it/docs/frameworks/MEMORY.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/MEMORY.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/MEMORY.md) · 🇰🇭 [km](../../../km/docs/frameworks/MEMORY.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/MEMORY.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/MEMORY.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/MEMORY.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/MEMORY.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/MEMORY.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/MEMORY.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/MEMORY.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/MEMORY.md) · 🇲🇲 [my](../../../my/docs/frameworks/MEMORY.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/MEMORY.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/MEMORY.md) · 🇳🇴 [no](../../../no/docs/frameworks/MEMORY.md) · 🇮🇳 [or](../../../or/docs/frameworks/MEMORY.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/MEMORY.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/MEMORY.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/MEMORY.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/MEMORY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/MEMORY.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/MEMORY.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/MEMORY.md) · 🇱🇰 [si](../../../si/docs/frameworks/MEMORY.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/MEMORY.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/MEMORY.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/MEMORY.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/MEMORY.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/MEMORY.md) · 🇮🇳 [te](../../../te/docs/frameworks/MEMORY.md) · 🇹🇭 [th](../../../th/docs/frameworks/MEMORY.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/MEMORY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/MEMORY.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/MEMORY.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/MEMORY.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/MEMORY.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/MEMORY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/MEMORY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/MEMORY.md)

---

> **அதிகாரப்பூர்வ மூலம்:** `src/lib/memory/` மற்றும் `src/app/api/memory/`
> **கடைசியாகப் புதுப்பிக்கப்பட்டது:** 2026-06-28 — v3.8.40 (இயல்பாக முடக்கப்பட்டது + int8 அளவாக்க ஒத்திசைவு)

OmniRoute, API விசையின் அடிப்படையில் (மேலும் விருப்பத்திற்கேற்ப அமர்வு id-யின் அடிப்படையில்)
நிலையான உரையாடல் நினைவகத்தை வழங்குகிறது. இலகுவான regex வடிவப் பொருத்தத்தைப் பயன்படுத்தி
LLM பதில்களிலிருந்து நினைவுகள் தானாகப் பிரித்தெடுக்கப்பட்டு, அடுத்தடுத்த
கோரிக்கைகளில் முன்னிலை system செய்தியாக (அல்லது system பங்கை
நிராகரிக்கும் வழங்குநர்களுக்கு முதல் user செய்தியாக) மீண்டும் உட்செலுத்தப்படுகின்றன.

> **நினைவகம் இயல்பாக முடக்கப்பட்டுள்ளது (v3.8.30+).** `DEFAULT_MEMORY_SETTINGS.enabled`
> இப்போது `false` (`src/lib/memory/settings.ts`). நினைவகத்தை இயக்குவது, மீட்டெடுக்கப்பட்ட
> சூழலிலிருந்து `maxTokens` (~2k) வரை **ஒவ்வொரு** chat கோரிக்கையிலும் உட்செலுத்தும்;
> இதற்குக் கட்டணம் விதிக்கப்படும் — புதிய நிறுவல்களுக்கும் தங்கள் சொந்த சூழலை நிர்வகிக்கும்
> கிளையன்ட்களுக்கும் இது எதிர்பாராத செலவாக இருக்கலாம். **Settings → Memory** என்பதன் கீழ்
> வெளிப்படையாகத் தேர்வுசெய்து இயக்கவும் (நினைவகம் இயக்கப்பட்டிருக்கும்போது
> `MemorySkillsTab` token செலவு எச்சரிக்கைக் குறிப்பைக் காட்டும்).
> ஒரு கிளையன்ட், `x-omniroute-no-memory` கோரிக்கை header-ஐ
> (`true`/`1`/`yes`) பயன்படுத்தி ஒரு தனிப்பட்ட கோரிக்கைக்கு மட்டும் இதிலிருந்து விலகலாம் —
> [API_REFERENCE.md](../reference/API_REFERENCE.md)-இல் உள்ள கோரிக்கை-header அட்டவணையைப் பார்க்கவும்.
> நினைவகம் இல்லாத கோரிக்கை `memoryOwnerId = null` என அமைக்கும்; இது அந்தக் கோரிக்கைக்கான
> நினைவகம் மற்றும் திறன் உட்செலுத்தல் **இரண்டையும்** முடக்கும்
> (`open-sse/handlers/chatCore/headers.ts::isNoMemoryRequested`).

நினைவகம் **ஒவ்வொரு API விசைக்கும் தனித்தனியாக வரையறுக்கப்படுகிறது**, ஒவ்வொரு பயனருக்கும் அல்ல —
ஒரே API விசையால் அங்கீகரிக்கப்பட்ட ஒவ்வொரு கோரிக்கையும் ஒரே நினைவகத் தொகுப்பைப் பகிரும்;
விருப்பத்திற்கேற்ப `sessionId` மூலம் மேலும் வரையறுக்கலாம்.

## கட்டமைப்பு

```
கிளையன்ட் → /v1/chat/completions (apiKeyInfo முன்நிலையில் தீர்மானிக்கப்படுகிறது)
  → handleChatCore() [open-sse/handlers/chatCore.ts]
    → resolveMemoryOwnerId(apiKeyInfo)        # id-ஐப் பிரித்தெடுக்கிறது
    → getMemorySettings()                     # தற்காலிகமாகச் சேமிக்கப்பட்ட அமைப்புகள்
    → shouldInjectMemory(body, {enabled})     # நுழைவுக் கட்டுப்பாடு
    → retrieveMemories(apiKeyId, config)      # SQL + FTS5 + விருப்பமான vector
    → injectMemory(body, memories, provider)  # system அல்லது user செய்தி
  → மேல்நிலை வழங்குநர் அழைப்பு
  → பதில் கிடைக்கும்போது: extractFacts(text, apiKeyId, sessionId)  # தடையில்லாதது
    → setImmediate → ஒவ்வொரு பொருத்தத்திற்கும் createMemory(fact)
                   → embed(content) + upsertVector(id, vec)
```

உட்செலுத்தல் மற்றும் பிரித்தெடுத்தல் அழைப்புத் தளங்கள்
`open-sse/handlers/chatCore.ts`-இல் இணைக்கப்பட்டுள்ளன (`retrieveMemories`, `injectMemory`
மற்றும் `extractFacts` ஆகியவற்றைத் தேடவும்).

## இயந்திரக் கட்டமைப்பு (3-அடுக்கு தீர்மானம்)

கிடைக்கக்கூடிய உட்கட்டமைப்பு மற்றும் அமைப்புகளின் அடிப்படையில், இயக்க நேரத்தில்
மீட்டெடுப்புப் பாதையை Memory Engine தீர்மானிக்கிறது. முன்னுரிமை வரிசையில்
பயன்படுத்தப்படும் மூன்று அடுக்குகள் உள்ளன:

```
  ┌─────────────────────────────────────────────────────────────┐
  │  அடுக்கு 0 — முக்கியச் சொல் (FTS5)                           │
  │  சோதனை சார்ந்த கிடைப்புத்தன்மை: SQLite build அதை            │
  │  ஆதரிக்கும்போது FTS5 கிடைக்கும்                              │
  │  (better-sqlite3 / node:sqlite / bun:sqlite); FTS5 இல்லாத    │
  │  build-களில் கிடைக்காது (எ.கா. sql.js/WASM —                │
  │  "no such module: fts5"). strategy = "exact" ஆக இருக்கும்போது│
  │  அல்லது மாற்று வழியாகப் பயன்படுத்தப்படும்; engine-status     │
  │  keyword சோதனையின் முடிவைப் பிரதிபலிக்கும்.                 │
  └──────────────────────────────────┬──────────────────────────┘
                                     │ strategy = semantic|hybrid?
                                     ▼
  ┌─────────────────────────────────────────────────────────────┐
  │  அடுக்கு 1 — உட்பொதிக்கப்பட்ட Vector (sqlite-vec)            │
  │  db.loadExtension() வழியாக sqlite-vec v0.1.9 ஏற்றப்படுகிறது.│
  │  Float32 vector-கள் மீது KNN முழுமையான தேடல். பின்வரும்     │
  │  நிபந்தனைகளில் செயல்படும்:                                  │
  │   • sqlite-vec loadExtension வெற்றியடைகிறது                 │
  │   • Float32Array உருவாக்கக்கூடிய embedding மூலம்            │
  │     (remote | static | transformers) கிடைக்கிறது            │
  │   • vec_memories அட்டவணை உள்ளது (முதல் ready()-இல் உருவாகும்)│
  └──────────────────────────────────┬──────────────────────────┘
                                     │ qdrant.enabled?
                                     ▼
  ┌─────────────────────────────────────────────────────────────┐
  │  அடுக்கு 2 — Qdrant (விருப்பத் தேர்வான வெளிப்புற vector     │
  │  தரவுத்தளம்)                                                │
  │  இயக்கப்பட்டிருக்கும்போது semantic/hybrid பயன்பாட்டிற்காக    │
  │  sqlite-vec-ஐ மாற்றுகிறது. இயங்கும் Qdrant instance மற்றும் │
  │  கட்டமைக்கப்பட்ட host/port தேவை.                            │
  └─────────────────────────────────────────────────────────────┘
```

தரக்குறைப்பு தானாகவும் வெளிப்படையாகவும் நடைபெறும்:

- sqlite-vec ஏற்றப்படத் தவறினால், அடுக்கு 1 கிடைக்காது → அடுக்கு 0-க்கு மாறும்.
- embedding மூலம் பிழையை வழங்கினால், அடுக்கு 1 அடுக்கு 0-க்கு மாறும்.
- Qdrant ஆரோக்கியமற்ற நிலையில் இருந்தால், அடுக்கு 2 அடுக்கு 1-க்கு மாறும் (அடுக்கு 1-மும்
  கிடைக்கவில்லை என்றால் அடுக்கு 0-க்கு மாறும்).

## உட்பொதித்தல் மூலங்கள்

உட்பொதித்தல் அடுக்கு (`src/lib/memory/embedding/`), `MemorySettingsExtended.embeddingSource` அடிப்படையில் எந்த மூலத்தைப் பயன்படுத்த வேண்டும் என்பதைத் தீர்மானிக்கிறது:

| மூலம்          | விளக்கம்                                                                                   | விசை தேவை | தொடக்கத் தாமதம்  |
| -------------- | ------------------------------------------------------------------------------------------ | --------- | ---------------- |
| `remote`       | உள்ளமைக்கப்பட்ட வழங்குநரின் உட்பொதித்தல் API-ஐப் பயன்படுத்துகிறது (OpenAI, Cohere போன்றவை) | ஆம்       | இல்லை            |
| `static`       | `potion-base-8M` வழியான உள்ளமை தேடல்-அட்டவணை உட்பொதித்தல் (WordPiece + சராசரி pooling)     | இல்லை     | ~200ms           |
| `transformers` | `@huggingface/transformers` v4, `all-MiniLM-L6-v2` வழியான உள்ளமை ONNX அனுமானம்             | இல்லை     | ~3s + ~400MB RAM |
| `auto`         | இயக்கநேரத் தீர்மானம்: remote (விசை இருந்தால்) → static → transformers → null               | சார்ந்தது | சார்ந்தது        |

**`auto`-க்கான தீர்மான வரிசை:**

1. `listEmbeddingProviders()`-இல் `hasKey === true` கொண்ட முதல் வழங்குநரைக் கண்டறிதல் → `remote`.
2. `settings.staticEnabled === true` என்றால் → `static`.
3. `settings.transformersEnabled === true` என்றால் → `transformers`.
4. இல்லையெனில் → `null` (FTS5 திறவுச்சொல் தேடலுக்குத் தரம் குறைகிறது).

உட்பொதித்தல் தற்காலிகச் சேமிப்பகம் (`src/lib/memory/embedding/cache.ts`), `${source}:${model}:${dim}:${sha256(text)}` மூலம் விசையிடப்பட்ட நினைவகத்திலுள்ள
LRU வரைபடத்தைப் பயன்படுத்துகிறது; இது அதிகபட்சமாக `MEMORY_EMBEDDING_CACHE_MAX`
உள்ளீடுகள் (இயல்புநிலை 1000) மற்றும் `MEMORY_EMBEDDING_CACHE_TTL_MS`
காலாவதி நேரத்துடன் (இயல்புநிலை 5 நிமிடம்) வரையறுக்கப்பட்டுள்ளது. ஒவ்வொரு செயல்முறை
வாழ்க்கைச் சுழற்சியிலும் அனைத்து அழைப்பாளர்களுக்கும் பகிரப்படுகிறது.

## கலப்பு RRF (k=60)

`strategy = "hybrid"` ஆகவும் வெக்டர் சேமிப்பகம் கிடைக்கக்கூடியதாகவும் இருக்கும்போது,
FTS5 மற்றும் வெக்டர் முடிவுகளை ஒன்றிணைக்க மீட்டெடுப்பு Reciprocal Rank Fusion-ஐப்
பயன்படுத்துகிறது:

```
RRF(d) = Σ  1 / (k + rank_i(d))      இங்கு k = 60 (MEMORY_RRF_K வழியாக உள்ளமைக்கக்கூடியது)
          i
```

குறிப்பாக:

1. FTS5 தேடலை இயக்குதல் → தரவரிசைப்படுத்தப்பட்ட பட்டியல் `R_fts` (நிலை 1..N).
2. KNN வெக்டர் தேடலை இயக்குதல் → தரவரிசைப்படுத்தப்பட்ட பட்டியல் `R_vec` (நிலை 1..M).
3. ஒவ்வொரு தனித்துவமான `memoryId`-க்கும்:  
   `rrf_score = 1/(60 + fts_rank)` + `1/(60 + vec_rank)` (பட்டியலில் இல்லையெனில் 0).
4. `rrf_score`-ஐ DESC வரிசையில் அடுக்கி, token budget walk-ஐப் பயன்படுத்துதல்.

பலவகைப்பட்ட மீட்டெடுப்பு அமைப்புகளுக்கு இடையே மதிப்பெண் இயல்பாக்கம் தேவையில்லாமலேயே
RRF பயனுள்ளதாக இருப்பது நன்கு அறியப்பட்டதாகும். இயல்புநிலை `k=60`, அசல்
Cormack et al. ஆய்வுக் கட்டுரையிலிருந்து பெறப்பட்டது; மேலும் இது சிறிய தரவுத்தொகுப்புகளுக்கு
(<10k நினைவுகள்) நன்றாகச் செயல்படுகிறது.

## பின்னிரப்புதல் (சோம்பேறி + மறுஅட்டவணையிடல்)

உட்பொதித்தல் மாதிரி மாறும்போது (`embedding_signature` வழியாகக் கண்டறியப்படுகிறது),
வெக்டர் சேமிப்பகம் மீண்டும் உருவாக்கப்பட்டு, ஏற்கனவே உள்ள அனைத்து நினைவுகளும்
`memories` அட்டவணையில் `needs_reindex = 1` எனக் குறிக்கப்படுகின்றன.

**சோம்பேறிப் பின்னிரப்புதல்**: அடுத்த மீட்டெடுப்பின்போது, வெக்டர் உள்ளீடு இல்லாத எந்த
நினைவும் உட்பொதிக்கப்பட்டு, தேடல் இயங்குவதற்கு முன் `vec_memories`-இல்
சேர்க்கப்படுகிறது. இது தொடக்கத்தைத் தடுக்காமல், உண்மையான கோரிக்கைகள் முழுவதும்
பின்னிரப்புதல் செலவைப் பகிர்ந்தளிக்கிறது.

**வெளிப்படையான மறுஅட்டவணையிடல்**: `/dashboard/memory`-இல் உள்ள Engine தாவல்,
`POST /api/memory/reindex`-ஐ அழைக்கும் "இப்போது மறுஅட்டவணையிடு" பொத்தானை
வழங்குகிறது. கையாளுநர் `src/lib/memory/reindex.ts`-இலிருந்து `runReindexBatch()`-ஐ
அழைக்கிறார்; இது ஒவ்வொரு கோரிக்கைக்கும் அதிகபட்சமாக `limit` நிலுவை உள்ளீடுகளைச்
செயலாக்குகிறது. முன்னேற்றத்தை `GET /api/memory/engine-status`
(`vectorStore.needsReindex`) வழியாக அவ்வப்போது சரிபார்க்கலாம்.

`memory_vec_meta` அட்டவணை (இடம்பெயர்வு `083_memory_vec.sql`) பின்வருவனவற்றைச் சேமிக்கிறது:

- `active_dim` — தற்போதைய வெக்டர் பரிமாணம் (null = இன்னும் அளவுத்திருத்தப்படவில்லை).
- `embedding_signature` — மாற்றங்களைக் கண்டறியப் பயன்படுத்தப்படும் `${source}:${model}:${dim}`.
- `last_reset_at` — கடைசி முழு மீட்டமைப்பின் நேரமுத்திரை.
- `vec_loaded` — sqlite-vec வெற்றிகரமாக ஏற்றப்பட்டதா என்பதைக் குறிக்கும் 0/1 கொடி.

## அமைப்புகள் நீட்டிப்பு

ஒன்பது embedding மற்றும் vector புலங்கள் `MemorySettingsExtended`-இல்
`src/shared/schemas/memory.ts` கோப்பில் கிடைக்கின்றன; அவை `src/lib/db/settings.ts` வழியாக நிலைநிறுத்தப்படுகின்றன:

| புலம்                    | வகை                                                | இயல்புநிலை | விளக்கம்                                                                           |
| ------------------------ | -------------------------------------------------- | ---------- | ---------------------------------------------------------------------------------- |
| `embeddingSource`        | `"remote" \| "static" \| "transformers" \| "auto"` | `"auto"`   | பயன்படுத்த வேண்டிய embedding மூலம்                                                 |
| `embeddingProviderModel` | `string \| null`                                   | `null`     | `provider/model` வடிவிலான வழங்குநர்/மாதிரி                                         |
| `customBaseUrl`          | `string \| null`                                   | `null`     | நினைவகத்திற்கு மட்டும் உரிய OpenAI-இணக்கமான endpoint அடிப்படை URL                  |
| `customModelId`          | `string \| null`                                   | `null`     | தனிப்பயன் endpoint-க்கு அனுப்பப்படும் மாதிரி ID                                    |
| `transformersEnabled`    | `boolean`                                          | `false`    | Transformers.js-க்கான விருப்பத் தேர்வு (MiniLM, ~400MB)                            |
| `staticEnabled`          | `boolean`                                          | `false`    | நிலையான potion-base-8M உள்ளூர் மாதிரிக்கான விருப்பத் தேர்வு                        |
| `rerankEnabled`          | `boolean`                                          | `false`    | மறுதரவரிசைப்படுத்தல் படியை இயக்கும் (ஒவ்வொரு கோரிக்கைக்கும் +200-500ms சேர்க்கும்) |
| `rerankProviderModel`    | `string \| null`                                   | `null`     | `provider/model` வடிவிலான மறுதரவரிசைப்படுத்தல் வழங்குநர்/மாதிரி                    |
| `vectorStore`            | `"sqlite-vec" \| "qdrant" \| "auto"`               | `"auto"`   | பயன்படுத்த வேண்டிய vector backend                                                  |

இவை `GET /PUT /api/settings/memory` வழியாக வெளிப்படுத்தப்படுகின்றன (`MemorySettingsExtendedSchema` schema).

`remote` மூலத்திற்கு, விருப்பத்திற்குரிய `customBaseUrl` மற்றும்
`customModelId` அமைப்புகளையும் Memory ஏற்கிறது. உலகளாவிய embedding பதிவகத்தை மாற்றாமல், இவை இரண்டும் இணைந்து OpenAI-இணக்கமான `/embeddings`
endpoint மற்றும் மாதிரியைத் தேர்ந்தெடுக்கின்றன. பயன்பாட்டிற்கு முன் endpoint
இயல்பாக்கப்பட்டு, வழங்குநரின் வெளிச்செல்லும் URL கொள்கையால் சரிபார்க்கப்படுகிறது: HTTP(S)
கட்டாயம்; உட்பொதிக்கப்பட்ட சான்றுகள் மற்றும் query strings நிராகரிக்கப்படுகின்றன; மேலும் cloud-metadata
முகவரிகள் தொடர்ந்து தடுக்கப்படுகின்றன. வெற்று மதிப்புகள் தேர்ந்தெடுக்கப்பட்ட பதிவக வழங்குநரை அப்படியே வைத்திருக்கும். Dashboard-க்கு
திருப்பியனுப்பப்படும் பிழைகள் பாதுகாப்பாக்கப்படுகின்றன; endpoint சான்றுகள் ஒருபோதும் பதிவு செய்யப்படுவதில்லை.

> **TODO (D20):** அனைத்து API keys-க்கும் இடையே நினைவுகளைப் பகிரும் `global` scope இந்த வெளியீட்டில்
> செயல்படுத்தப்படவில்லை. இதற்கு schema மாற்றங்களும் உலகளாவிய மீட்டெடுப்புப்
> பாதையும் தேவை. இதைத் தனியாகக் கண்காணிக்கவும்.

## சேமிப்பக அடுக்குகள்

### முதன்மை: SQLite (`memories` அட்டவணை)

`015_create_memories.sql` migration மூலம் உருவாக்கப்பட்டது:

| நெடுவரிசை                   | வகை                | குறிப்புகள்                                                                      |
| --------------------------- | ------------------ | -------------------------------------------------------------------------------- |
| `id`                        | `TEXT PRIMARY KEY` | `crypto.randomUUID()` வழியாக உருவாக்கப்பட்ட UUID                                 |
| `api_key_id`                | `TEXT NOT NULL`    | உரிமையாளரான API key                                                              |
| `session_id`                | `TEXT`             | ஒவ்வொரு உரையாடலுக்குமான விருப்பத்திற்குரிய scope                                 |
| `type`                      | `TEXT NOT NULL`    | `factual`, `episodic`, `procedural`, `semantic` ஆகியவற்றில் ஒன்று                |
| `key`                       | `TEXT`             | நிலையான upsert key, எ.கா. `preference:i_prefer_python`                           |
| `content`                   | `TEXT NOT NULL`    | உண்மையான தகவல் உரை                                                               |
| `metadata`                  | `TEXT`             | JSON தொகுதி (category, extractedAt, source, ...)                                 |
| `created_at` / `updated_at` | `TEXT`             | ISO 8601 சரங்கள்                                                                 |
| `expires_at`                | `TEXT`             | விருப்பத்திற்குரிய காலாவதி; `NULL` என்பது நிரந்தரத்தைக் குறிக்கும்               |
| `memory_id`                 | `INTEGER UNIQUE`   | UUIDs ↔ FTS5 rowids-ஐ இணைக்க `023_fix_memory_fts_uuid.sql` மூலம் சேர்க்கப்பட்டது |

Indexes: `api_key_id`, `session_id`, `type`, `expires_at`, மேலும் தனித்துவமான
`memory_id` index.

**Upsert செயல்முறை**: அதே `(api_key_id, key)` கொண்ட ஏற்கனவே உள்ள row-ஐ
`createMemory()` தேடி, கண்டறியப்பட்டால் அதே இடத்தில் புதுப்பிக்கிறது (`metadata`-வை
shallow spread மூலம் ஒன்றிணைக்கிறது). மீண்டும் மீண்டும் வரும் விருப்பக் கூற்றுகளால் அட்டவணை
வரம்பின்றி வளராமல் இது தடுக்கிறது.

### முழு-உரைத் தேடல் (`memory_fts` மெய்நிகர் அட்டவணை)

`022_add_memory_fts5.sql`, `content` மற்றும்
`key` மீது ஓர் FTS5 மெய்நிகர் அட்டவணையை உருவாக்குகிறது. UUID
primary key, FTS5-இன் integer rowid-உடன் இணையாத நடைமுறைப் பிழையை `023_fix_memory_fts_uuid.sql` சரிசெய்கிறது — இந்த migration
`memory_id` நெடுவரிசையைச் சேர்த்து, FTS அட்டவணையை மீண்டும் உருவாக்கி, INSERT, DELETE மற்றும் UPDATE நிகழ்வுகளில் FTS-ஐ
ஒத்திசைவாக வைத்திருக்கும் triggers-ஐ
(`memory_fts_ai`, `memory_fts_ad`, `memory_fts_au`) இணைக்கிறது.

`semantic` மற்றும் `hybrid` உத்திகளுக்காக `retrieval.ts` பயன்படுத்துகிறது (கீழே காண்க).
மீட்டெடுப்புக் குறியீடு `hasTable("memory_fts")` மூலம் பாதுகாப்புச் சரிபார்ப்பு செய்து, FTS அட்டவணை இல்லாவிட்டாலோ அல்லது FTS query பிழை எழுப்பினாலோ,
காலவரிசை வரிசைக்குத் திரும்புகிறது.

### விருப்பத்திற்குரியது: Qdrant (vector store tier 2)

`src/lib/memory/qdrant.ts`, tier 2
vector store ஆக விருப்பத்திற்குரிய Qdrant ஒருங்கிணைப்பைச் செயல்படுத்துகிறது. Engine selector
`memoryVectorStore === "qdrant"` ஆக இருக்கும்போது மட்டுமே மீட்டெடுப்பு Qdrant-க்கு வழிமாற்றப்படுகிறது — இயல்புநிலையான `"auto"` (மற்றும் `"sqlite-vec"`)
Qdrant-ஐ **ஒருபோதும்** தேர்ந்தெடுக்காது. Engine-tab toggle, `qdrantEnabled` மற்றும்
`memoryVectorStore` ஆகிய **இரண்டையும்** ஒன்றாக அமைக்கிறது: இயக்குவது Qdrant-ஐ முதன்மை store ஆக மாற்றும்; முடக்குவது
`"auto"`-க்கு மீட்டமைக்கும் (#5597 — அந்தத் திருத்தத்திற்கு முன், engine selector-இல் எதுவும்
எழுதாததால் இயக்குவது செயலற்றிருந்தது). Qdrant-ஐ அணுக முடியாவிட்டாலோ அல்லது அது எதையும் திருப்பியளிக்காவிட்டாலோ, மீட்டெடுப்பு
sqlite-vec → FTS5 என்பதற்குத் திரும்புகிறது.

- `upsertSemanticMemoryPoint()` — உள்ளமைக்கப்பட்ட embedding model-ஐப் பயன்படுத்தி `key + content`-ஐ embed செய்து, collection இருப்பதை உறுதிசெய்கிறது (முதல் பயன்பாட்டில் cosine-distance vectors-ஐ உருவாக்குகிறது), மேலும் `{memoryId,
apiKeyId, sessionId, key, content, metadata, createdAtUnix, expiresAtUnix}` payload உடன் ஒரு point-ஐ upsert செய்கிறது.
- `searchSemanticMemory(query, topK, scope)` — query-ஐ embed செய்து, `kind = "omniroute_memory"` அடிப்படையில் வடிகட்டப்பட்ட collection-இல் தேடுகிறது; விருப்பமாக `apiKeyId` / `sessionId` அடிப்படையிலும் வடிகட்டுகிறது. `topK`-ஐ `[1, 20]` வரம்பிற்குள் கட்டுப்படுத்துகிறது.
- `deleteSemanticMemoryPoint(id)` — ஒற்றை point-ஐ நீக்குகிறது. SQLite row அகற்றப்பட்ட பிறகு `deleteMemory()` மூலம் அழைக்கப்படுகிறது (D15).
- `cleanupSemanticMemoryPoints({retentionDays})` — `expiresAtUnix` கடந்த காலத்தில் உள்ள அல்லது `createdAtUnix` retention cutoff-ஐவிடப் பழையதாக உள்ள points-ஐ மொத்தமாக நீக்குகிறது. dashboard உண்மையான எண்ணிக்கைகளைக் காட்டுவதற்காக முதலில் எண்ணுகிறது.
- `checkQdrantHealth()` — latency உடனான `GET /readyz` health probe.

settings UI, Qdrant config, health check, semantic search test மற்றும் cleanup ஆகியவற்றை `/dashboard/memory`-இன் **Engine tab**-இல் வழங்குகிறது. `src/app/api/settings/qdrant/`-இன் கீழுள்ள தொடர்புடைய routes அனைத்தும் v3.8.6 முதல் இணைக்கப்பட்டுள்ளன:

| Route                                   | முறை          | விளக்கம்                                          |
| --------------------------------------- | ------------- | ------------------------------------------------- |
| `/api/settings/qdrant`                  | `GET` / `PUT` | Qdrant settings-ஐப் படித்தல் / புதுப்பித்தல்      |
| `/api/settings/qdrant/health`           | `GET`         | Liveness probe + latency                          |
| `/api/settings/qdrant/search`           | `POST`        | Semantic search test                              |
| `/api/settings/qdrant/cleanup`          | `POST`        | காலாவதியான / பழைய points-ஐ அகற்றுதல்              |
| `/api/settings/qdrant/embedding-models` | `GET`         | கிடைக்கக்கூடிய embedding models-ஐப் பட்டியலிடுதல் |

**செயல்பாட்டுக் குறிப்புகள் (எதிர்பார்க்க வேண்டியவை):**

- **Engine தேர்வு** — Engine tab-இல் Qdrant-ஐ இயக்குவது அதை முதன்மை store-ஆக மாற்றுகிறது (`memoryVectorStore="qdrant"` என அமைக்கிறது); முடக்குவது `"auto"`-வுக்கு மீட்டமைக்கிறது (#5597).
- **Back-fill இல்லை** — Qdrant இயக்கப்பட்ட **பிறகு** உருவாக்கப்பட்ட/புதுப்பிக்கப்பட்ட memories மட்டுமே அதில் எழுதப்படுகின்றன (fire-and-forget dual-write). ஏற்கனவே உள்ள SQLite memories இடமாற்றம் செய்யப்படுவதில்லை; "Reindex Now" sqlite-vec index-ஐ மட்டுமே மீண்டும் உருவாக்குகிறது, Qdrant-ஐ அல்ல.
- **Vector dimension முதல் பயன்பாட்டில் கிடைக்கும் உண்மையான embedding-இலிருந்து தானாகக் கண்டறியப்படுகிறது** — நிரப்புவதற்கு dimension field எதுவும் இல்லை. ஒரு collection உருவான பிறகு embedding model-ஐ மாற்றுவது **தானாகக் கையாளப்படுவதில்லை**: ஏற்கனவே உள்ள collection மாற்றமின்றி விடப்படுகிறது; dimension பொருந்தாத writes/searches தோல்வியடைந்து sqlite-vec-க்கு fallback ஆகின்றன. Embedders-ஐ மாற்ற, collection-ஐ மீண்டும் உருவாக்கவும் (புதிய பெயர், அல்லது Qdrant-இல் அதை நீக்கவும்).
- **Distance metric** — எப்போதும் **Cosine** (collection உருவாக்கும்போது hardcode செய்யப்பட்டுள்ளது; உள்ளமைக்க முடியாது).
- **Auth** — API key மட்டும் (`api-key` header ஆக அனுப்பப்படுகிறது; authentication இல்லாத local Docker-க்கு விருப்பத்திற்குரியது). JWT/RBAC பயன்படுத்தப்படுவதில்லை.
- **Config fields** — UI ஆனது `host`, `port`, `collection`, `embeddingModel`, `apiKey` ஆகியவற்றை வழங்குகிறது. `vectorSize` / `hnswEfConstruct` ஆகியவை env/DB-இல் மட்டுமே உள்ளன; மேலும் collection உருவாக்க `vectorSize` பயன்படுத்தப்படுவதில்லை (dimension embedding-இலிருந்து பெறப்படுகிறது).

### Vector quantization (int8 — தேர்வுசெய்து இயக்கக்கூடியது, இரு backends-லும்)

சேமிக்கப்பட்ட vectors-இன் memory footprint-ஐக் குறைக்க (~Float32-ஐவிட 4× சிறியது), சிறிய recall இழப்புடன் இரு vector backends-லும் **தேர்வுசெய்து இயக்கக்கூடிய int8 quantization** ஆதரிக்கப்படுகிறது. இரண்டிலும் இயல்பாக இது **முடக்கப்பட்டிருக்கும்** — வெளிப்படையாக இயக்கப்படாவிட்டால் vectors முழுத் துல்லியத்திலேயே இருக்கும்.

| Backend    | Setting                         | வகை                            | இயல்புநிலை | படிக்கப்படும் இடம்                                          |
| ---------- | ------------------------------- | ------------------------------ | ---------- | ----------------------------------------------------------- |
| Qdrant     | `qdrantQuantization` (DB key)   | `"none" \| "int8" \| "binary"` | `"none"`   | `src/lib/memory/qdrant.ts::normalizeQdrantConfig()`         |
| sqlite-vec | `MEMORY_VEC_QUANTIZATION` (env) | `"none" \| "int8"`             | `"none"`   | `src/lib/memory/vectorStore.ts::requestedVecQuantization()` |

- **Qdrant**, `qdrantQuantization` setting key மூலம் ஒவ்வொரு instance-க்கும் தனித்தனியாக உள்ளமைக்கப்படுகிறது (`PUT /api/settings/qdrant`-இல் `quantization` field ஆக வழங்கப்படுகிறது). இது `"int8"` ஆக இருக்கும்போது, `buildQuantizationConfig()` scalar quantization-ஐ (`always_ram`, quantile `0.99`) கோருகிறது; மேலும் முழுத் துல்லிய vectors மூலம் int8 candidate set-ஐ மேம்படுத்த, searches `rescore: true`-ஐ இயக்குகின்றன.
- **sqlite-vec** quantization என்பது **environment-only** (DB setting அல்ல): local vectors-ஐ `vec_quantize_int8(?, 'unit')` மூலம் `int8[dim]` column ஆகச் சேமிக்க `MEMORY_VEC_QUANTIZATION=int8` என அமைக்கவும். தேர்ந்தெடுக்கப்பட்ட mode, `embedding_signature`-இல் (`:int8` suffix) சேர்க்கப்படுகிறது; எனவே modes-ஐ மாற்றுவது `vec_memories` table-இன் முழுமையான reindex-ஐத் தூண்டும் — embedding model மாறும்போது பயன்படுத்தப்படும் அதே lazy-backfill பாதை.

## நினைவக வகைகள்

`MemoryType` (`src/lib/memory/types.ts`):

| வகை          | பயன்பாடு                                                                                        |
| ------------ | ----------------------------------------------------------------------------------------------- |
| `factual`    | விருப்பத்தேர்வுகள், நிலையான பயனர் உண்மைகள், நடத்தைப் பாங்குகள்                                  |
| `episodic`   | குறிப்பிட்ட தருணத்துடன் தொடர்புடைய முடிவுகள் ("I chose Postgres")                               |
| `procedural` | பணிப்பாய்வு / செயல்முறை நினைவகம் (ஒதுக்கப்பட்டுள்ளது; தற்போது தானியங்கி பிரித்தெடுப்பான் இல்லை) |
| `semantic`   | வெக்டர்-ஸ்டோர் உள்ளீடுகளுக்காக ஒதுக்கப்பட்டுள்ளது                                               |

`MemoryConfig` மீட்டெடுப்பு உத்தி `exact`, `semantic`, அல்லது `hybrid`
ஆகியவற்றில் ஒன்றாகவும், அதன் வரம்பு `session`, `apiKey`, அல்லது `global` ஆகியவற்றில்
ஒன்றாகவும் இருக்கும். `getMemorySettings()` வழங்கும் இயல்புநிலை வரம்பு `apiKey` ஆகும்.

## உண்மைத் தகவல் பிரித்தெடுப்பு (`extraction.ts`)

பிரித்தெடுப்பு **regex-அடிப்படையிலானது**, LLM-அடிப்படையிலானது அல்ல — இது செயல்முறைக்குள்ளேயே
`setImmediate()` மூலம் இயங்குவதால், பதில் ஸ்ட்ரீமை ஒருபோதும் தடுக்காது:

- **விருப்பத்தேர்வு வடிவங்கள்** → `MemoryType.FACTUAL`
  (எ.கா. `I prefer …`, `I really like …`, `my favorite is …`, `I hate …`)
- **முடிவு வடிவங்கள்** → `MemoryType.EPISODIC`
  (எ.கா. `I'll use …`, `I chose …`, `I went with …`, `I'm going to adopt …`)
- **பழக்க வடிவங்கள்** → `MemoryType.FACTUAL`
  (எ.கா. `I usually …`, `I always …`, `I tend to …`)

ஒவ்வொரு பொருத்தமும் தூய்மைப்படுத்தப்பட்டு (`trim`, இடைவெளிகளைச் சுருக்குதல், அதிகபட்சம் 500 எழுத்துகளாகக் கட்டுப்படுத்துதல்),
நிலையான `factKey(category, content)` மூலம் தொகுதிக்குள் நகல் நீக்கம் செய்யப்பட்டு,
`{category, extractedAt, source: "llm_response"}` என்ற மெட்டாடேட்டாவுடன்
`createMemory()` மூலம் சேமிக்கப்படுகிறது. உள்ளீட்டு உரை
64 KiB (`MAX_EXTRACTION_TEXT_LENGTH`) ஆகக் கட்டுப்படுத்தப்படுகிறது — இதைவிட நீளமாக இருக்கும்போது, மிகச் சமீபத்திய
உதவியாளர் உள்ளடக்கம் எப்போதும் சேர்க்கப்படுவதை உறுதிப்படுத்த உரையின் **இறுதிப் பகுதி** பயன்படுத்தப்படுகிறது.

`extractFactsFromText(text)` சோதனைகளுக்காக ஏற்றுமதி செய்யப்பட்டுள்ளது; இது உண்மைகளைச் சேமிக்காமல்
கட்டமைக்கப்பட்ட வடிவில் திருப்பித் தருகிறது.

## மீட்டெடுப்பு (`retrieval.ts`)

`retrieveMemories(apiKeyId, config)` முதன்மை நுழைவுப் புள்ளியாகும். இது:

1. `MemoryConfigSchema` மூலம் கட்டமைப்பை இயல்பாக்கி, சரிபார்க்கிறது.
2. `enabled` false ஆக இருந்தாலோ அல்லது `maxTokens <= 0` ஆக இருந்தாலோ உடனடியாக `[]` ஐத் திருப்பித் தருகிறது.
3. `maxTokens` ஐ `[1, 8000]` வரம்பிற்குள் கட்டுப்படுத்துகிறது.
4. பழைய தரவுத்தளங்கள் தொடர்ந்து இயங்குவதற்காக, நவீன `memories` அட்டவணை உள்ளதா
   (அல்லது பழைய `memory` அட்டவணையா) என்பதைக் கண்டறிகிறது.
5. காலாவதி பாதுகாப்பு
   (`expires_at IS NULL OR datetime(expires_at) > datetime('now')`), விருப்பத்திற்குரிய
   அமர்வு வரம்பு மற்றும் விருப்பத்திற்குரிய `retentionDays` வரம்புடன் அடிப்படை வினவலை உருவாக்குகிறது.
6. உத்திக்கேற்ப கிளைப்படுகிறது:
   - **`exact`** (இயல்புநிலை): காலவரிசைப்படி `ORDER BY created_at DESC LIMIT 100`.
   - **`semantic`**: `config.query` மற்றும் `memory_fts` இருந்தால், `memory_fts MATCH ?`
     உடன் JOIN செய்து FTS தரவரிசைப்படி வரிசைப்படுத்துகிறது; FTS 0 வரிசைகளைத் திருப்பினால்
     காலவரிசை முறைக்குத் திரும்புகிறது.
   - **`hybrid`**: FTS முடிவுகள் (அதிகத் தொடர்புத்தன்மை) மற்றும்
     காலவரிசைத் தொகுப்பின் ஒன்றியம்; id அடிப்படையில் நகல் நீக்கம் செய்யப்படுகிறது.
7. ஒரு வினவல் வழங்கப்பட்டிருந்தால், `content`, `key` மற்றும் `metadata` JSON ஆகியவற்றின் மீது
   முக்கியச்சொல் தொடர்புத்தன்மை மதிப்பெண்ணை (`getRelevanceScore`) கணக்கிடுகிறது. பூஜ்ஜிய
   மதிப்பெண் கொண்ட வரிசைகள் வடிகட்டப்படுகின்றன.
8. முதலில் மதிப்பெண் இறங்குவரிசையிலும், பின்னர் `createdAt` இறங்குவரிசையிலும் வரிசைப்படுத்துகிறது.
9. தரவரிசைப்படுத்தப்பட்ட பட்டியலை வரிசையாகச் சென்று, தொடர்ந்து கணக்கிடப்படும்
   `estimateTokens(content)` (≈ `length / 4`) பட்ஜெட்டிற்குள் இருக்கும் வரை உள்ளீடுகளை ஏற்கிறது. ஏதேனும்
   பொருத்தம் இருந்தால் எப்போதும் குறைந்தது ஒரு உள்ளீட்டையாவது திருப்பித் தருகிறது.

`estimateTokens` ஏற்றுமதி செய்யப்பட்டு, மீட்டெடுப்பு, சுருக்கமாக்கல் மற்றும் MCP
`omniroute_memory_search` கருவி ஆகியவற்றால் பயன்படுத்தப்படுகிறது.

## உட்செலுத்தல் (`injection.ts`)

`injectMemory(request, memories, provider)`:

1. அனைத்து நினைவக உள்ளடக்கங்களையும் ஒரே `Memory context: …` சரமாக இணைக்கிறது.
2. வழங்குநரின் பெயரின் அடிப்படையில் ஒரு உத்தியைத் தேர்ந்தெடுக்கிறது:
   - **கணினிச் செய்தி** (OpenAI, Anthropic, Gemini, … ஆகியவற்றுக்கு இயல்புநிலை) — ஏற்கனவே உள்ள எந்தக் கணினிச் செய்திகளுக்கும் முன்பாக
     `{role: "system", content: memoryText}` என்பதைச் சேர்க்கிறது; இதனால் பயனரின் கணினித் தூண்டுதல்களுக்கு இன்னும் முன்னுரிமை கிடைக்கும்.
   - **பயனர் செய்தி** (மாற்று வழி) — `PROVIDERS_WITHOUT_SYSTEM_MESSAGE` பட்டியலில் உள்ள
     `o1`, `o1-mini`, `o1-preview`, `glm`, `glmt`, `glm-cn`, `zai`, `qianfan` வழங்குநர்களுக்கு. இவை கணினிப் பாத்திரத்தை நிராகரிப்பதால்,
     இல்லையெனில் 400 பிழை ஏற்படும் (GLM/Zhipu தொடர்பாக issue #1701 ஐப் பார்க்கவும்).
3. எண்ணிக்கை, உத்தி மற்றும் மாதிரியை `memory.injection.injected` என்பதன் கீழ் பதிவுசெய்கிறது.

தங்களுக்கான வழித்தடத் தீர்மானங்களை எடுக்க வேண்டிய அழைப்பாளர்களுக்காக `providerSupportsSystemMessage(provider)` ஏற்றுமதி செய்யப்படுகிறது. பாதுகாப்பிற்காக, அறியப்படாத வழங்குநர்களுக்கு இயல்புநிலையாக `true`
(கணினிப் பாத்திரம் அனுமதிக்கப்பட்டது) அமைக்கப்படுகிறது.

## அமைப்புகள் (`settings.ts`)

நினைவக உள்ளமைவு சூழல் மாறிகளில் அல்லாமல், **DB அமைப்புகள் அட்டவணையில் சேமிக்கப்படுகிறது**.
`getMemorySettings()` என்பது `getSettings()` இலிருந்து படித்து, செயல்முறைக்குள் முடிவைத் தற்காலிகச் சேமிப்பில் வைக்கிறது; எழுதப்பட்ட பிறகு அமைப்புகளின் PUT
வழித்தடத்தால் `invalidateMemorySettingsCache()` அழைக்கப்படுகிறது.

### மரபுவழிப் புலங்கள் (அனைத்துப் பதிப்புகளும்)

| DB விசை               | வகை     | இயல்புநிலை                                                    | UI கட்டுப்பாடு                                                                 |
| --------------------- | ------- | ------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| `memoryEnabled`       | boolean | `false` (v3.8.30 முதல் இயல்புநிலையில் முடக்கப்பட்டுள்ளது)     | நினைவகத்தை இயக்குதல்/முடக்குதல்                                                |
| `memoryMaxTokens`     | integer | `2000` (வரம்பு `0–16000`)                                     | உட்செலுத்தலுக்கான டோக்கன் வரம்பு                                               |
| `memoryRetentionDays` | integer | `30` (வரம்பு `1–365`)                                         | தக்கவைப்புக் காலச் சாளரம்                                                      |
| `memoryStrategy`      | enum    | `"hybrid"` (`recent`, `semantic`, `hybrid` ஆகியவற்றில் ஒன்று) | மீட்டெடுப்பு உத்தி                                                             |
| `skillsEnabled`       | boolean | `false`                                                       | ஒவ்வொரு விசைக்குமான திறன் உட்செலுத்தலை மாற்றுகிறது (SKILLS.md ஐப் பார்க்கவும்) |

குறிப்பு: UI உத்தியான `"recent"` என்பது `toMemoryRetrievalConfig()` வழியாக உள்ளமை `"exact"` மீட்டெடுப்பு
உத்திக்கு வரைபடமாக்கப்படுகிறது (காலவரிசை ஒழுங்கு).

### புதிய புலங்கள் (v3.8.6, திட்டம் 21 D9)

புல விளக்கங்களுக்கு மேலே உள்ள "அமைப்புகளின் நீட்டிப்பு" பகுதியையும் பார்க்கவும்.

| DB விசை                     | API புலம்                | இயல்புநிலை |
| --------------------------- | ------------------------ | ---------- |
| `memoryEmbeddingSource`     | `embeddingSource`        | `"auto"`   |
| `memoryEmbeddingModel`      | `embeddingProviderModel` | `null`     |
| `memoryTransformersEnabled` | `transformersEnabled`    | `false`    |
| `memoryStaticEnabled`       | `staticEnabled`          | `false`    |
| `memoryRerankEnabled`       | `rerankEnabled`          | `false`    |
| `memoryRerankModel`         | `rerankProviderModel`    | `null`     |
| `memoryVectorStore`         | `vectorStore`            | `"auto"`   |

Qdrant தொடர்பான DB விசைகள் (`qdrantEnabled`, `qdrantHost`, `qdrantPort`,
`qdrantApiKey`, `qdrantCollection` இயல்புநிலை `"omniroute_memory"`,
`qdrantEmbeddingModel` இயல்புநிலை `"openai/text-embedding-3-small"`) `qdrant.ts` இல் உள்ள
`normalizeQdrantConfig()` மூலம் படிக்கப்படுகின்றன.

### சூழல் மாறிகள் (v3.8.6)

விருப்பத்திற்குரிய ஆறு சூழல் மாறிகள் இயந்திரத்தின் இயக்கநேர நடத்தையைச் சீரமைக்கின்றன (`.env.example` இல் ஆவணப்படுத்தப்பட்டுள்ளன):

| மாறி                            | இயல்புநிலை                 | விளக்கம்                                                                                                                                                          |
| ------------------------------- | -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `MEMORY_EMBEDDING_CACHE_TTL_MS` | `300000`                   | உட்பொதித்தல் தற்காலிகச் சேமிப்பின் TTL (5 நிமிடம்)                                                                                                                |
| `MEMORY_EMBEDDING_CACHE_MAX`    | `1000`                     | உட்பொதித்தல் LRU தற்காலிகச் சேமிப்பிலுள்ள அதிகபட்சப் பதிவுகள்                                                                                                     |
| `MEMORY_TRANSFORMERS_MODEL`     | `Xenova/all-MiniLM-L6-v2`  | Transformers.js மாதிரிக்கான HF களஞ்சியம்                                                                                                                          |
| `MEMORY_STATIC_MODEL`           | `minishlab/potion-base-8M` | நிலையான potion மாதிரிக்கான HF களஞ்சியம்                                                                                                                           |
| `MEMORY_STATIC_CACHE_DIR`       | `<DATA_DIR>/embeddings`    | பதிவிறக்கப்பட்ட மாதிரிகளைச் சேமிக்க வேண்டிய இடம்                                                                                                                  |
| `MEMORY_VEC_TOP_K`              | `20`                       | திசையன் தேடலுக்கான இயல்புநிலை top-K                                                                                                                               |
| `MEMORY_RRF_K`                  | `60`                       | கலப்புத் தேடலுக்கான RRF k மாறிலி                                                                                                                                  |
| `MEMORY_VEC_QUANTIZATION`       | `none`                     | உள்ளமை sqlite-vec திசையன்களை அளவீடாக்கிச் சேமிக்க `int8` ஆக அமைக்கவும் (~4× சிறியது; விருப்பத்தின் பேரில்). பயன்முறை மாற்றம் மறுஅட்டவணையிடலைக் கட்டாயப்படுத்தும். |

## சுருக்கமாக்கல் (`summarization.ts`)

ஒரு விசையின் நினைவகங்களில் தொடர்ச்சியான மொத்த டோக்கன் எண்ணிக்கை வரம்பை மீறும்போது, `summarizeMemories(apiKeyId, sessionId?, maxTokens = 4000)` பழைய உள்ளடக்கத்தைச் சுருக்குகிறது. இது வரிசைகளை `created_at` அடிப்படையில் DESC வரிசையில் சுழன்று, வரம்பிற்குள் பொருந்தும் வரிசைகளை வைத்துக்கொண்டு, மீதமுள்ளவற்றின் `content`-ஐ மூல உள்ளடக்கத்தின் முதல் மூன்று வாக்கியங்களைக் கொண்டு அதே இடத்தில் மாற்றுகிறது. பழைய மற்றும் புதிய உள்ளடக்கங்களுக்கிடையிலான `estimateTokens` வேறுபாடே `tokensSaved` ஆகும்.

இந்த நடைமுறை தற்போதைய அரட்டைச் செயலாக்கத் தொடரில் **கிடைக்கிறது, ஆனால் தானாக அழைக்கப்படுவதில்லை** — தொடர்ச்சியான சுருக்கம் தேவைப்பட்டால், இதை cron, நிர்வாகச் செயல் அல்லது `MemoryConfig.autoSummarize` இணைப்பிலிருந்து அழைக்கவும். தரவு இழப்பு ஒருவழிப் பாதையாகும்: மூல உரை மேலெழுதப்படும்.

## REST API

அனைத்து முனைப்புள்ளிகளுக்கும் மேலாண்மை அங்கீகாரம் (`requireManagementAuth`) தேவை.

### முதன்மை நினைவக முனைப்புள்ளிகள் (ஏற்கனவே உள்ளவை + புதுப்பிக்கப்பட்டவை)

| முறை     | பாதை                 | விளக்கம்                                                                                                                                                                                                   |
| -------- | -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `GET`    | `/api/memory`        | வடிப்பான்களுடன் பக்கமிடப்பட்ட பட்டியல்: `apiKeyId`, `type`, `sessionId`, `q`, `limit`, `page`, `offset`. பதிலில் `stats.total`, `stats.tokensUsed`, `stats.hitRate`, `cacheStats` ஆகியவை அடங்கும்          |
| `POST`   | `/api/memory`        | பதிவை உருவாக்குகிறது (Zod-சரிபார்க்கப்பட்டது: `content`, `key`, விருப்பமான `type`, `sessionId`, `apiKeyId`, `metadata`, `expiresAt`). `(apiKeyId, key)` மீது upsert செய்யும் `createMemory()`-ஐ அழைக்கிறது |
| `GET`    | `/api/memory/[id]`   | UUID மூலம் ஒரு தனிப்பட்ட பதிவைப் பெறுகிறது                                                                                                                                                                 |
| `PUT`    | `/api/memory/[id]`   | பதிவுப் புலங்களைப் (`type`, `key`, `content`, `metadata`) புதுப்பிக்கிறது. உடல்: `MemoryUpdatePutSchema`. embedding மூலம் கிடைத்தால் vector-ஐயும் ஒத்திசைக்கிறது.                                          |
| `DELETE` | `/api/memory/[id]`   | ஒரு பதிவை நீக்குகிறது; `vec_memories` (D15) மற்றும் Qdrant-இலிருந்தும் இயன்றவரை நீக்குகிறது. பதிவு இல்லாதபோது 404-ஐ வழங்குகிறது.                                                                           |
| `GET`    | `/api/memory/health` | `verifyExtractionPipeline("health-check")`-ஐ இயக்குகிறது — உருவாக்கம்→பட்டியலிடல்→நீக்குதல் முழுச் சுற்று. `{working, latencyMs, error?}`-ஐ வழங்குகிறது                                                    |

### புதிய நினைவக இயந்திர முனைப்புள்ளிகள் (திட்டம் 21)

| முறை   | பாதை                              | விளக்கம்                                                                                                                                                                                       |
| ------ | --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `POST` | `/api/memory/retrieve-preview`    | `retrieveMemories`-இன் சோதனை இயக்கம் — மதிப்பெண், அடுக்கு, டோக்கன்களுடன் தரவரிசைப்படுத்தப்பட்ட முடிவுகளை வழங்குகிறது. உடல்: `RetrievePreviewSchema`. நினைவகங்களைச் சேர்க்கவோ மாற்றவோ செய்யாது. |
| `GET`  | `/api/memory/embedding-providers` | embedding மாதிரிகளுடன் வழங்குநர்களைப் பட்டியலிட்டு, எவற்றுக்கு API விசை உள்ளமைக்கப்பட்டுள்ளது என்பதைக் குறிக்கிறது.                                                                            |
| `GET`  | `/api/memory/engine-status`       | முழுமையான இயந்திர நிலையைக் கொடுக்கிறது: முக்கியச்சொல் அடுக்கு, embedding தீர்மானம், vector store புள்ளிவிவரங்கள், Qdrant நிலை, மறுதரவரிசை உள்ளமைவு. வடிவம்: `MemoryEngineStatusSchema`.        |
| `POST` | `/api/memory/summarize`           | நினைவகச் சுருக்கத்தை கைமுறையாகத் தூண்டுகிறது. உடல்: `MemorySummarizeSchema` (`olderThanDays`, `apiKeyId?`, `dryRun`). `{candidates, tokensSaved}`-ஐ வழங்குகிறது.                               |
| `POST` | `/api/memory/reindex`             | `needs_reindex=1` கொண்ட நினைவகங்களுக்கு vector மறுஅட்டவணையிடலைத் தூண்டுகிறது. உடல்: `MemoryReindexSchema` (`force`). `{started, pending}`-ஐ வழங்குகிறது.                                       |

### அமைப்புகள் முனைப்புள்ளிகள்

| முறை   | பாதை                                    | விளக்கம்                                                                                                         |
| ------ | --------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `GET`  | `/api/settings/memory`                  | தற்போதைய இயல்பாக்கப்பட்ட `MemorySettingsExtended` (7 புதிய புலங்கள் + மரபுவழிப் புலங்கள்)                        |
| `PUT`  | `/api/settings/memory`                  | `MemorySettingsExtendedSchema`-இலுள்ள எந்தப் புலத்தையும் புதுப்பிக்கிறது (மொத்தம் 12 புலங்கள்)                   |
| `GET`  | `/api/settings/qdrant`                  | தற்போதைய Qdrant அமைப்புகள் (`QdrantSettingsSchema`)                                                              |
| `PUT`  | `/api/settings/qdrant`                  | Qdrant அமைப்புகளைப் புதுப்பிக்கிறது. உடல்: `QdrantSettingsUpdateSchema`. `apiKey` = வெற்று சரம் விசையை அகற்றும். |
| `GET`  | `/api/settings/qdrant/health`           | உள்ளமைக்கப்பட்ட Qdrant நிகழ்வுக்கு எதிரான இயங்குநிலைச் சோதனை. `QdrantHealthResultSchema`-ஐ வழங்குகிறது.          |
| `POST` | `/api/settings/qdrant/search`           | Qdrant-க்கு எதிரான சொற்பொருள் தேடல் சோதனை. உடல்: `QdrantSearchSchema` (`query`, `topK`).                         |
| `POST` | `/api/settings/qdrant/cleanup`          | காலாவதியான / பழைய நினைவகங்களுக்கான Qdrant புள்ளிகளை அகற்றுகிறது.                                                 |
| `GET`  | `/api/settings/qdrant/embedding-models` | Qdrant-க்குக் கிடைக்கும் embedding மாதிரிகளைப் பட்டியலிடுகிறது.                                                  |

`/api/memory` பட்டியல் வினவல், `page` அடிப்படையிலான பக்கமிடல் (`parsePaginationParams`) **அல்லது** நேரடி `offset` ஆகியவற்றில் ஒன்றை ஆதரிக்கிறது — `offset` குறிப்பிடப்பட்டிருந்தால் அதற்கு முன்னுரிமை அளிக்கப்பட்டு, பதில் வடிவத்திற்காக அதிலிருந்து `page` கணக்கிடப்படுகிறது.

## MCP கருவிகள் (`open-sse/mcp-server/tools/memoryTools.ts`)

MCP சேவையகம் இயக்கப்பட்டிருக்கும்போது, மூன்று நினைவகக் கருவிகள் பதிவு செய்யப்படுகின்றன:

- `omniroute_memory_search` — `{apiKeyId, query?, type?, maxTokens?, limit?}`
  → `retrieveMemories()`-ஐ சுற்றிப் பயன்படுத்துகிறது. v3.8.6 (D16) முதல், `strategy`
  `"exact"` என நிரந்தரமாகக் குறியிடப்படுவதற்குப் பதிலாக `getMemorySettings()`-இலிருந்து
  வாசிக்கப்படுகிறது. `query` வழங்கப்பட்டு, `strategy` என்பது `semantic` அல்லது
  `hybrid` ஆக இருந்தால், கிடைக்கும்போது vector store பயன்படுத்தப்படும்.
- `omniroute_memory_add` — `{apiKeyId, sessionId?, type, key, content,
metadata?}` → `createMemory()`-ஐ சுற்றிப் பயன்படுத்துகிறது. பின்வரும் 4 நிலையான வகைகளை
  மட்டுமே ஏற்கிறது: `factual`, `episodic`, `procedural`, `semantic` (D17).
- `omniroute_memory_clear` — `{apiKeyId, type?, olderThan?}` → பொருந்தும்
  பதிவுகளைப் பட்டியலிட்டு, விருப்பத்திற்கேற்ப உருவாக்கப்பட்ட நேர முத்திரைக்கு முந்தையவற்றை
  வடிகட்டி, பின்னர் ஒவ்வொன்றையும் `deleteMemory()` வழியாக நீக்குகிறது (இது
  sqlite-vec + Qdrant ஆகியவற்றிலிருந்தும் vectors-ஐ நீக்குகிறது).

போக்குவரத்து மற்றும் scope விவரங்களுக்கு [MCP-SERVER.md](./MCP-SERVER.md)-ஐப் பார்க்கவும்.

## Dashboard (Memory Studio)

`src/app/(dashboard)/dashboard/memory/page.tsx` இப்போது ஒரு **3-tab Studio** ஆகும்:

### Tab: Memories

- கருத்து அட்டை (சுருக்கக்கூடிய "இது எவ்வாறு செயல்படுகிறது" விளக்கம்).
- நிகழ்நேரப் பட்டியல், தேடல் மற்றும் pagination (300 ms debounce செய்யப்பட்டது).
- வகை filter (`factual` / `episodic` / `procedural` / `semantic` / அனைத்தும்).
- நினைவகத்தைச் சேர்ப்பதற்கான modal (key, content, type).
- வரிக்குள்ளேயே திருத்துதல் (பென்சில் பொத்தான் → `PUT /api/memory/[id]`).
- ஒவ்வொரு வரியிலும் நீக்குதல் (உறுதிப்படுத்தல் dialog உடன்).
- தற்போதைய பக்கத்தின் JSON export; file picker வழியாக JSON import.
- புள்ளிவிவர அட்டைகள்: `totalEntries`, `tokensUsed`, `hitRate`.
- "பழையவற்றைச் சுருக்கு" பொத்தான் → `POST /api/memory/summarize` (முதலில் dry-run
  candidate எண்ணிக்கையைக் காட்டி, பின்னர் உறுதிப்படுத்துகிறது).
- `GET /api/memory/health` மூலம் இயக்கப்படும் பச்சை/சிவப்பு health புள்ளி.

### Tab: Playground

- Query உள்ளீடு + strategy selector (Exact / Semantic / Hybrid) + token budget.
- "உருவகப்படுத்து" → `POST /api/memory/retrieve-preview` — தரவரிசைப்படுத்தப்பட்ட
  முடிவுகளை `score`, `tier`, `tokens`, `vecScore`, `ftsScore` ஆகியவற்றுடன் காட்டுகிறது.
- எந்த embedding source / vector store பயன்படுத்தப்பட்டது என்பதையும்,
  fallback நிகழ்ந்ததா என்பதையும் காட்டும் resolution panel.

### Tab: Engine

- Engine நிலை panel (keyword FTS5 chip, embedding chip, vector store chip,
  Qdrant health chip, rerank chip).
- "இப்போது மறுஅட்டவணைப்படுத்து" பொத்தான் → `POST /api/memory/reindex`.
- Embedding source selector (auto / remote / static / transformers + toggles).
- Qdrant config அட்டை (இயக்குவதற்கான toggle, host/port/collection/key, connection
  சோதனை, semantic search சோதனை, cleanup).
- Rerank config அட்டை (இயக்குவதற்கான toggle, provider/model selector).

Memory மற்றும் Qdrant அமைப்புகள், பழைய/global settings இடைமுகத்திற்காக
`/dashboard/settings → Memory & Skills` (`MemorySkillsTab.tsx`) என்பதன் கீழும்
உள்ளன.

## Caching

`src/lib/memory/store.ts`, `getMemory(id)` வாசிப்புகளுக்காக process-க்குள் இயங்கும்
LRU போன்ற cache-ஐ (`MEMORY_CACHE_TTL = 1 min`, `MEMORY_MAX_CACHE_SIZE = 500`,
20 % பழைய பதிவுகளை வெளியேற்றுவதுடன்) வைத்திருக்கிறது. மேலும், தங்களுக்கென scope
செய்யப்பட்ட cache-ஐ விரும்பும் callers பயன்படுத்தும் `get`/`set`/`invalidate`
முறைகளைக் கொண்ட பொதுவான key/value `memoryCache` layer
(`src/lib/memory/cache.ts`) ஒன்றும் உள்ளது (1 000-entry LRU, இயல்புநிலை TTL
5 min).

## தனியுரிமை & வாழ்நாள் சுழற்சி

- நினைவகத்தின் உரிமையாளர் API விசையின் id ஆகும் (`chatCore.ts`-இல் உள்ள
  `resolveMemoryOwnerId`). `apiKeyInfo.id` இல்லாமல் மீட்டெடுத்தல், உட்செலுத்தல்,
  பிரித்தெடுத்தல் ஆகிய எதுவும் இயங்காது.
- எதிர்கால `expires_at` மதிப்பைக் கொண்ட பதிவுகள் மீட்டெடுத்தலிலிருந்து வடிகட்டப்படுகின்றன;
  `retentionDays`-ஐத் தாண்டிய பழைய பதிவுகள் `retrieveMemories`-இல் உள்ள
  `created_at >= cutoff` பிரிவால் விலக்கப்படுகின்றன.
- நிரந்தரமாக நீக்க, `DELETE /api/memory/[id]` அல்லது `omniroute_memory_clear`-ஐப் பயன்படுத்தவும்.
- பிரித்தெடுத்தல் `setImmediate` வழியாகத் தொடங்கி விடப்படும்; தோல்விகள்
  `memory.extraction.background.failed` என்பதன் கீழ் பதிவுசெய்யப்படும், மேலும்
  அவை அழைப்பவருக்கு ஒருபோதும் வெளிப்படுத்தப்படாது.
- சரிபார்ப்பு சுற்றுப்பயணங்கள் (`verifyExtractionPipeline`) தங்களுடைய சோதனைப்
  பதிவுகளை `finally` தொகுதியில் தாமாகவே சுத்தம் செய்கின்றன.

## மேலும் காண்க

- [SKILLS.md](./SKILLS.md) — `skillsEnabled` அமைப்பு நினைவகத்துடன் கருவி
  வரையறைகளையும் உட்செலுத்துகிறது.
- [MCP-SERVER.md](./MCP-SERVER.md) — MCP போக்குவரத்து / அணுகல் வரம்புகள்.
- [API_REFERENCE.md](../reference/API_REFERENCE.md) — விரிவான API பரப்பு.
- மூலத் தொகுதிகள்:
  - `src/lib/memory/types.ts`, `schemas.ts`
  - `src/lib/memory/store.ts`, `retrieval.ts`, `injection.ts`, `reindex.ts`
  - `src/lib/memory/extraction.ts`, `summarization.ts`, `verify.ts`
  - `src/lib/memory/settings.ts`, `qdrant.ts`, `cache.ts`
  - `src/lib/memory/vectorStore.ts` — sqlite-vec + கலப்பு RRF
  - `src/lib/memory/embedding/index.ts` — பல-மூல உட்பொதித்தல் அடுக்கு
  - `src/lib/memory/embedding/types.ts`, `remote.ts`, `staticPotion.ts`,
    `transformersLocal.ts`, `cache.ts`
  - `src/shared/schemas/memory.ts` — அனைத்து நினைவக API உடல்களுக்குமான Zod திட்டவடிவங்கள்
  - `src/shared/schemas/qdrant.ts` — Qdrant அமைப்புகள்/செயல்பாடுகளுக்கான Zod திட்டவடிவங்கள்
  - `src/lib/db/memoryVec.ts` — `memory_vec_meta`-க்கான CRUD
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
  - `src/app/api/settings/qdrant/route.ts` + துணை வழித்தடங்கள்
  - `src/app/(dashboard)/dashboard/memory/` — Studio UI (பக்கம் + கூறுகள் +
    தாவல்கள் + hooks)
  - `open-sse/handlers/chatCore.ts` (உட்செலுத்தல் / பிரித்தெடுத்தல் இணைப்பு)
  - `open-sse/mcp-server/tools/memoryTools.ts`

---

## உட்பொதித்தல் வழங்குநரைத் தேர்ந்தெடுத்தல் (v3.8.16+)

OmniRoute-இன் நினைவக இயந்திரம் **நான்கு உட்பொதித்தல் மூலங்களை** ஆதரிக்கிறது (`src/lib/memory/embedding/`). ஒவ்வொன்றுக்கும் **தாமதம், செலவு, மாதிரித் தரம் மற்றும் அமைப்புச் சிக்கல்தன்மை** ஆகியவற்றில் வெவ்வேறு சாதக-பாதகங்கள் உள்ளன.

### உட்பொதித்தல் மூலங்கள்

| வழங்குநர்      | மூலம்                                                            | தாமதம்                                    | செலவு                    | தரம்                                         | அமைப்பு                                                 |
| -------------- | ---------------------------------------------------------------- | ----------------------------------------- | ------------------------ | -------------------------------------------- | ------------------------------------------------------- |
| `transformers` | உள்ளூர் ONNX மாதிரி (Xenova/all-MiniLM-L6-v2)                    | ~50-150ms (CPU)                           | இலவசம்                   | நல்லது                                       | `npm install` மட்டும்                                   |
| `static`       | முன்கணக்கிடப்பட்ட திசையன்கள் (தேக்கப்பட்டது)                     | <1ms                                      | இலவசம்                   | பொருந்தாது (தேக்கப் பொருத்தத்தைச் சார்ந்தது) | எதுவுமில்லை                                             |
| `remote`       | OpenAI / Cohere / Voyage API                                     | ~100-300ms                                | $0.02-0.10/1M டோக்கன்கள் | சிறப்பானது                                   | API விசை                                                |
| `auto`         | இயக்கநேரத்தில் கிடைக்கக்கூடிய சிறந்த மூலத்தைத் தேர்ந்தெடுக்கிறது | தேர்ந்தெடுக்கப்பட்ட மூலத்தைப் போன்றதே     | இலவசம்                   | தேர்ந்தெடுக்கப்பட்ட மூலத்தைப் போன்றதே        | எதுவுமில்லை                                             |
| _(cache)_      | எந்த மூலத்திற்கும் மேலான நினைவகத்திலுள்ள LRU அடுக்கு             | <1ms (பொருத்தம்), முழுத் தாமதம் (தவறுதல்) | இலவசம்                   | அடிப்படை மூலத்தைப் போன்றதே                   | எப்போதும் இயக்கத்தில் (தேர்ந்தெடுக்கக்கூடிய மூலம் அல்ல) |

### முடிவெடுக்கும் மரம்

```
                  உங்கள் பயன்படுத்தல் சூழல் என்ன?
                  │
      ┌───────────┼───────────┬──────────────┐
      │           │           │              │
  DEV/TEST    சிறிய PROD   பெரிய PROD    EDGE / OFFLINE
      │           │           │              │
      ▼           ▼           ▼              ▼
  transformers transformers remote (Qdrant) transformers
  (இலவசம், API இல்லை)       (சிறந்த தரம்)     (இணையம் இல்லை)
      │           │           │              │
      └────────┬──┴───────────┴──────────────┘
               │
               ▼
            எப்போதும் மேலே `cache` அடுக்கைச் சேர்க்கவும்
            (LruCache எந்த வழங்குநரையும் சுற்றிக்கொள்கிறது)
```

### தரவுத்தளம் & API உள்ளமைவு

நினைவக உட்பொதித்தல் விருப்பங்கள் சூழல் மாறிகள் வழியாக அல்லாமல், Settings API/UI வழியாக உள்ளமைக்கப்படுகின்றன. Settings-இன் கீழுள்ள தொடர்புடைய அமைப்புத் தரவுத்தள விசைகள் (`src/lib/memory/settings.ts`-இல் உள்ள `normalizeMemorySettings`) பின்வருமாறு:

- `memoryEmbeddingSource`: `"transformers"` (உள்ளூர்), `"remote"` (API-அடிப்படையிலானது, எ.கா. OpenAI), `"static"` (வெளிப்புற சேமிப்பகம்), அல்லது `"auto"`
- `memoryEmbeddingProviderModel`: தொலைநிலை/static மூலங்களுக்கான மாதிரி அடையாளங்காட்டி (எ.கா., `"text-embedding-3-small"`)
- `memoryTransformersEnabled`: `true` | `false`
- `memoryStaticEnabled`: `true` | `false`
- `memoryVectorStore`: `"sqlite-vec"`, `"qdrant"`, அல்லது `"auto"`

#### உள்ளூர் மாதிரி (`transformers`)

உள்ளூர் மாதிரிகளை இயக்க உள்புறமாக transformers.js-ஐப் பயன்படுத்துகிறது:

```bash
# குறியீட்டில் வாசிக்கப்படும் சூழல் மாறிகள் (src/lib/memory/embedding/index.ts):
MEMORY_TRANSFORMERS_MODEL=Xenova/all-MiniLM-L6-v2  # HF மாதிரிக் களஞ்சியம்
MEMORY_STATIC_MODEL=minishlab/potion-base-8M       # HF static potion மாதிரி
MEMORY_STATIC_CACHE_DIR=<DATA_DIR>/embeddings      # தேக்க அடைவு
```

#### LRU உட்பொதித்தல் தேக்கம்

தேக்கம் இயல்பாக எப்போதும் இயக்கத்தில் இருக்கும்; இது சூழல் மாறிகள் வழியாக உள்ளமைக்கப்படுகிறது:

```bash
MEMORY_EMBEDDING_CACHE_MAX=1000                    # தேக்கத்தில் வைக்கப்படும் உருப்படிகளின் அதிகபட்ச எண்ணிக்கை
MEMORY_EMBEDDING_CACHE_TTL_MS=300000               # TTL (5 நிமி)
```

### செயல்திறன் அளவுகள்

வழக்கமான 4-core x86 சேவையகத்தில் அளவீட்டுச் சோதனை (ஒவ்வொரு உரையும் ~100 டோக்கன்கள்):

| வழங்குநர்            | p50   | p95   | p99   | 1M embeddings-க்கான செலவு          |
| -------------------- | ----- | ----- | ----- | ---------------------------------- |
| `transformers` (CPU) | 80ms  | 180ms | 350ms | இலவசம்                             |
| `remote` (OpenAI)    | 120ms | 220ms | 400ms | ~$0.02 (ada-002) / $0.13 (3-large) |
| `static` (Qdrant)    | 15ms  | 30ms  | 60ms  | Qdrant ஹோஸ்டிங்கைப் பொறுத்தது      |
| `cache` (ஹிட்)       | <1ms  | <1ms  | 2ms   | இலவசம்                             |

---

## உண்மைத் தகவல் பிரித்தெடுப்பு வடிவங்கள் (v3.8.16+)

`extraction.ts` தொகுதி (`src/lib/memory/extraction.ts`), உரையாடல் செய்திகளிலிருந்து கட்டமைக்கப்பட்ட உண்மைத் தகவல்களைப் பிரித்தெடுக்க **regex வடிவப் பொருத்தத்தைப்** பயன்படுத்துகிறது. இந்த வடிவங்களைப் புரிந்துகொள்வது, உங்கள் பயன்பாட்டிற்கேற்ப பிரித்தெடுப்புத் தரத்தைச் சீரமைக்க உதவுகிறது.

### இயல்புநிலை வடிவ வகைகள்

| வகை                 | எடுத்துக்காட்டு வடிவம்                                                                                 | கைப்பற்றுவது                  |
| ------------------- | ------------------------------------------------------------------------------------------------------ | ----------------------------- |
| PREFERENCE_PATTERNS | `"எனக்கு <X> விருப்பம்"`, `"எனக்கு <X> பிடிக்கும்"`, `"எனக்கு <X> பிடிக்காது"`                         | பயனர் விருப்பங்கள்            |
| DECISION_PATTERNS   | `"நான் <X>-ஐப் பயன்படுத்துவேன்"`, `"நான் <X> செய்ய முடிவெடுத்தேன்"`, `"நான் <X>-ஐத் தேர்ந்தெடுத்தேன்"` | பயனர் முடிவுகள் (நிகழ்வுசார்) |
| PATTERN_PATTERNS    | `"நான் வழக்கமாக <X>"`, `"நான் எப்போதும் <X>"`, `"நான் ஒருபோதும் <X> இல்லை"`                            | நிலையான நடத்தை வடிவங்கள்      |

### எடுத்துக்காட்டு வடிவங்கள் (எளிமைப்படுத்தப்பட்டவை)

```ts
// src/lib/memory/extraction.ts இலிருந்து
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

### எவை பிரித்தெடுக்கப்படுகின்றன

ஒரு பயனர் இவ்வாறு கூறும்போது:

> "எனக்கு TypeScript விருப்பம். இந்தத் திட்டத்திற்கு Postgres பயன்படுத்துவேன். push செய்வதற்கு முன் எப்போதும் commit செய்வேன். எனக்கு Python பிடிக்காது."
> பிரித்தெடுப்பு 4 நினைவுகளை உருவாக்குகிறது:
>
> | விசை                                 | வகை       | வகையினம்    | உள்ளடக்கம்                            |
> | ------------------------------------ | --------- | ----------- | ------------------------------------- |
> | `preference:typescript`              | விருப்பம் | உண்மைசார்   | "TypeScript"                          |
> | `decision:postgres_for_this_project` | முடிவு    | நிகழ்வுசார் | "இந்தத் திட்டத்திற்கான Postgres"      |
> | `pattern:commit_before_pushing`      | வடிவம்    | உண்மைசார்   | "push செய்வதற்கு முன் commit செய்வது" |
> | `preference:python`                  | விருப்பம் | உண்மைசார்   | "Python"                              |

### பிரித்தெடுப்பு வரம்புகள்

கட்டுப்பாடற்ற பிரித்தெடுப்பைத் தடுக்க, பின்வரும் வரம்புகள் பொருந்தும்:

| குறைந்தபட்ச உள்ளடக்க நீளம் | 3 எழுத்துகள் |
| அதிகபட்ச உள்ளடக்க நீளம் | 500 எழுத்துகள் |

### பிரித்தெடுப்பை எப்போது முடக்க வேண்டும்

நினைவகம் இயக்கப்பட்டிருக்கும்போதெல்லாம் பிரித்தெடுப்பு தானாக இயங்கும்; பிரித்தெடுப்புக்கு மட்டும் தனியான நிலைமாற்றி இல்லை. அதை முடக்க, `PUT /api/settings/memory` வழியாக நினைவகத்தை முழுமையாக முடக்கவும் (`enabled: false`). பின்வரும் சூழல்களில் இதைச் செய்வதைக் கருத்தில் கொள்ளுங்கள்:

- உங்களிடம் அதிக செய்தி அளவு இருந்து, பிரித்தெடுப்புச் செலவு குறிப்பிடத்தக்கதாக இருக்கும்போது
- உங்கள் உரையாடல்கள் பெரும்பாலும் தற்காலிகமானவையாக (அரட்டை, பிழைத்திருத்தம்) இருந்து, நீண்டகாலப் பயன் இல்லாதபோது
- தனிப்பயன் செருகுநிரல்கள் வழியாக நீங்கள் ஏற்கெனவே சூழலைப் பதிவு செய்துகொண்டிருக்கும்போது

---

## கலப்பு RRF சீரமைப்பு (v3.8.16+)

**Reciprocal Rank Fusion (RRF)** வழிமுறை, FTS5 (முக்கியச் சொல்) மற்றும் vector (பொருள்சார்) முடிவுகளை ஒருங்கிணைக்கிறது. குறைந்த தரவரிசையிலுள்ள முடிவுகளுக்கு எவ்வளவு எடை வழங்கப்படுகிறது என்பதை `k` அளவுரு கட்டுப்படுத்துகிறது.

### சூத்திரம்

ஒவ்வொரு சாத்தியமான நினைவிற்குமான RRF மதிப்பெண்:

```
RRF(d) = Σ  1 / (k + rank_i(d))
```

இதில்:

- `k` என்பது மாறிலி (இயல்புநிலை 60)
- `rank_i(d)` என்பது i-வது மீட்டெடுப்பு அமைப்பில் (FTS, vector), ஆவணம் `d`-இன் தரவரிசை
- கூட்டுத்தொகை அனைத்து மீட்டெடுப்பு அமைப்புகளிலும் கணக்கிடப்படுகிறது

### முடிவுகளை `k` எவ்வாறு பாதிக்கிறது

| `k` மதிப்பு             | விளைவு                                                                                           | மிகவும் ஏற்றது                                   |
| ----------------------- | ------------------------------------------------------------------------------------------------ | ------------------------------------------------ |
| `k=0`                   | தூய தரவரிசை இணைப்பு (சமனாக்கம் இல்லை)                                                            | கோட்பாட்டு அடிப்படை                              |
| `k=10-30`               | முன்னணி முடிவுகளுக்கு அதிக எடை அளிக்கிறது; குறைந்த தரவரிசை மிகக் குறைவாகவே பங்களிக்கிறது         | முதல் 3 முடிவுகள் பொதுவாகச் சரியாக இருக்கும்போது |
| **`k=60`** (இயல்புநிலை) | சமநிலையானது — முதல் 10 முடிவுகள் அனைத்தும் குறிப்பிடத்தக்க வகையில் பங்களிக்கின்றன                | பொது நோக்க மீட்டெடுப்பு                          |
| `k=100+`                | மேலும் சமமானது — பல அமைப்புகளில் இடம்பெற்றால், குறைந்த தரவரிசை முடிவுகள்கூட ஆதிக்கம் செலுத்தலாம் | recall > precision மிகவும் முக்கியமானபோது        |

### நடைமுறையில் `k`-ஐச் சீரமைத்தல்

```bash
# இயல்புநிலை
MEMORY_RRF_K=60

# தீவிரத் துல்லியம் (சிறிய நினைவகம், சில ஆவணங்கள்)
MEMORY_RRF_K=20

# அதிகபட்ச recall (பெரிய நினைவகம், பல்வேறு வினவல்கள்)
MEMORY_RRF_K=120
```

**`k=20` உடனான எடுத்துக்காட்டு:**

- FTS தரவரிசை 1 → பங்களிப்பு `1/21 = 0.048`
- FTS தரவரிசை 10 → பங்களிப்பு `1/30 = 0.033`
- Vector தரவரிசை 1 → பங்களிப்பு `0.048`
- ஒருங்கிணைந்த அதிகபட்சம்: `0.096`

**`k=60` உடனான எடுத்துக்காட்டு:**

- FTS தரவரிசை 1 → பங்களிப்பு `1/61 = 0.016`
- FTS தரவரிசை 10 → பங்களிப்பு `1/70 = 0.014`
- Vector தரவரிசை 1 → பங்களிப்பு `0.016`
- ஒருங்கிணைந்த அதிகபட்சம்: `0.033`

அதிக `k` உடன், முதல் தரவரிசைக்கும் 10-வது தரவரிசைக்கும் இடையிலான **ஒப்பீட்டு வேறுபாடு** குறைவாக இருக்கும். எனவே, வழிமுறை முன்னணி தரவரிசை நம்பிக்கையைவிட **மீட்டெடுப்பு அமைப்புகளுக்கு இடையிலான ஒருமித்த கருத்தை** அதிகம் சார்ந்திருக்கும்.

### `k`-ஐ எப்போது மாற்ற வேண்டும்

| அறிகுறி                                                   | முயற்சிக்க வேண்டியது                                                             |
| --------------------------------------------------------- | -------------------------------------------------------------------------------- |
| முதல் முடிவு எப்போதும் வெல்கிறது, ஆனால் அது தவறானது       | **குறைந்த** k (எ.கா., 20) — முன்னணி தரவரிசை நம்பிக்கை அதிக முக்கியத்துவம் பெறும் |
| சரியான பதில் முதல் 5-ல் உள்ளது, ஆனால் முதலிடத்தில் இல்லை  | **அதிக** k (எ.கா., 100) — சமமான மதிப்பீடு ஒருமித்த கருத்துக்கு வெகுமதி அளிக்கும் |
| Recall அதிகமாக உள்ளது, ஆனால் precision குறைவாக உள்ளது     | **குறைந்த** k — தரவரிசையைக் கூர்மையாக்கும்                                       |
| Recall குறைவாக உள்ளது (தொடர்புடைய ஆவணங்கள் விடுபடுகின்றன) | **அதிக** k — குறைந்த தரவரிசை ஆவணங்களுக்கு வாய்ப்பளிக்கும்                        |

### RRF எடையிடல்

Reciprocal rank fusion, பொருள்சார் vector தரவரிசைக்கும் முழு-உரைத் தேடல் தரவரிசைக்கும் சமமான எடைகளைப் பயன்படுத்துகிறது:

```
RRF(d) = 1/(k + rank_vector) + 1/(k + rank_fts)
```

தனிப்பட்ட எடைகளைச் சரிசெய்வதற்கான சூழல் மாறிகள் எதுவும் இல்லை (`MEMORY_RRF_VECTOR_WEIGHT`/`MEMORY_RRF_FTS_WEIGHT` இல்லை).

---

## சுருக்கமாக்கல் உத்தி (v3.8.16+)

`summarization.ts` தொகுதி (`src/lib/memory/summarization.ts`), மீட்டெடுக்கும் திறனைப் பாதுகாத்தவாறு செயலில் உள்ள தொகுப்பைச் சிறியதாக வைத்திருக்க பழைய நினைவுகளைச் சுருக்குகிறது.

### சுருக்கமாக்கல் தூண்டப்படும் நேரம்

| தூண்டுதல்                     | வரம்பு (இயல்புநிலை) |
| ----------------------------- | ------------------- |
| API வழியான கைமுறைத் தூண்டுதல் | பொருந்தாது          |

### சுருக்கமாக்கப்படுபவை

`summarization.ts`-இலிருந்து இரண்டு நுழைவுப் புள்ளிகள் ஏற்றுமதி செய்யப்படுகின்றன:

- **`summarizeMemories(apiKeyId, sessionId?, maxTokens = 4000)`** — ஒரு அமர்வுக்கான
  நினைவுகளை, டோக்கன் வரவுசெலவு வரம்பிற்குள் அடங்கும் ஒற்றைச் சுருக்க உரையாகச் சுருக்குகிறது.
- **`summarizeMemoriesOlderThan(apiKeyId, days, dryRun)`** — API பயன்படுத்தும்
  வயது அடிப்படையிலான சுருக்கமாக்கல்: இது `days`-ஐ விடப் பழைய ஒவ்வொரு நினைவையும் தேர்ந்தெடுத்து,
  அவற்றிலிருந்து ஒரு சுருக்கப்பட்ட நினைவை உருவாக்குகிறது; மேலும் (`dryRun` என்பது `false` ஆக இருக்கும்போது)
  அசல்களை நீக்குகிறது. எதையும் மாற்றாமல் தேர்வுக்குரிய தொகுப்பையும் மொத்த டோக்கன்
  எண்ணிக்கையையும் முன்னோட்டமிட `dryRun: true` என்பதை அனுப்பவும்.

குறிச்சொல்/விசைத் தொகுப்பாக்கச் சுற்றோ அல்லது ஒவ்வொரு நினைவுக்குமான "மையம் மற்றும் சுருக்கக்கூடியது" மதிப்பீடோ இல்லை —
தேர்வு முழுமையாக வயது வரம்பை அடிப்படையாகக் கொண்டது; மேலும் சுருக்க உரையானது ஒவ்வொரு தேர்வுக்குரிய உருப்படிக்கும்
வகை முன்னொட்டுடன் கூடிய சுருக்கப்பட்ட வரியாகும்.

### சுருக்கமாக்கலைத் தூண்டுதல்

சுருக்கமாக்கல் **கைமுறையானது / விருப்பத் தேர்வுக்குரியது** — `autoSummarize` அமைப்பு இயல்பாகவே
`false` ஆக இருப்பதால், எதுவும் தானாகச் சுருக்கப்படாது. API வழியாக இதைத் தூண்டவும்:

```bash
curl -X POST http://localhost:20128/api/memory/summarize \
  -H "Authorization: Bearer $OMNIROUTE_KEY"
```

அதை முடக்கியே வைத்திருக்க, `autoSummarize`-ஐ அதன் இயல்புநிலையான (`false`) மதிப்பிலேயே வைத்திருக்கவும்.

### சுருக்கமாக்கல் தரத்தை மேம்படுத்துவதற்கான குறிப்புகள்

- **முதலில் `dryRun` மூலம் முன்னோட்டமிடவும்** — `summarizeMemoriesOlderThan(..., true)`,
  தேர்வுக்குரிய பட்டியலையும் மொத்த டோக்கன் எண்ணிக்கையையும் வழங்குவதால், அசல்களை நீக்குவதற்கு முன்
  எவை ஒன்றிணைக்கப்படும் என்பதை நீங்கள் உறுதிப்படுத்தலாம்.
- **உங்களிடம் பெரிய நினைவுத் தொகுப்பு இருந்தால், போக்குவரத்து குறைவான நேரங்களில் சுருக்கமாக்கலை இயக்கவும்** — LLM அழைப்பே மெதுவான பகுதியாகும்

```bash
# Cron பாணி: தினமும் அதிகாலை 3 மணிக்குச் சுருக்கமாக்கவும்
0 3 * * * curl -X POST http://localhost:20128/api/memory/summarize \
  -H "Authorization: Bearer $OMNIROUTE_KEY"
```

---

## MemoryBackend வழங்குநர் வடிவமைப்பு

> **அதிகாரப்பூர்வ மூலம்:** `src/lib/memory/backend.ts`, `src/lib/memory/genericBackend.ts`, `src/lib/memory/manager.ts`
> **சோதனைகள்:** `src/lib/memory/__tests__/generic-backend.test.ts`

MemoryBackend வழங்குநர் வடிவமைப்பு, ஏற்கனவே உள்ள நினைவக இயந்திரத்தின் மீது **செருகக்கூடிய பின்தள அருவமாக்கல் அடுக்கை** அறிமுகப்படுத்துகிறது. ஒற்றைச் சேமிப்பகச் செயலாக்கத்துடன் பிணைக்கப்பட்டிருப்பதற்குப் பதிலாக, நினைவக அமைப்பு இப்போது கட்டமைக்கக்கூடிய முதன்மை/மாற்று வழிப்படுத்தலுடன் பல பின்தளங்களை (SQLite, Obsidian, Notion, தனிப்பயன் HTTP பின்தளங்கள்) ஆதரிக்கிறது.

### கட்டமைப்பு

```
┌──────────────────────────────────────────────────────────┐
│                    API வழித்தடங்கள்                       │
│            (src/app/api/memory/route.ts)                  │
└──────────────────────┬───────────────────────────────────┘
                       │
┌──────────────────────▼───────────────────────────────────┐
│                   MemoryManager                           │
│           ஒற்றை நிகழ்வு ஒருங்கிணைப்பாளர் (manager.ts)     │
│                                                          │
│  முதன்மை ──► பின்தளம் A  (எ.கா. SQLite)                  │
│  மாற்று   ──► பின்தளம் B  (எ.கா. Obsidian)                │
│             பின்தளம் C  (எ.கா. GenericBackend வழி Notion) │
└──────────────────────┬───────────────────────────────────┘
                       │
        ┌──────────────┼──────────────┐
        ▼              ▼              ▼
┌────────────┐ ┌────────────┐ ┌──────────────────┐
│ SQLite     │ │ Obsidian   │ │ GenericMemory    │
│ பின்தளம்   │ │ பின்தளம்   │ │ பின்தளம் (HTTP) │
└────────────┘ └────────────┘ └──────────────────┘
```

#### மைய இடைமுகம் (`backend.ts`)

ஒவ்வொரு பின்தளமும் `MemoryBackend` இடைமுகத்தைச் செயலாக்க வேண்டும்:

```typescript
interface MemoryBackend {
  readonly id: string;
  readonly displayName: string;

  // உருவாக்குதல், படித்தல், புதுப்பித்தல், நீக்குதல்
  create(input: CreateMemoryInput): Promise<Memory>;
  get(id: string): Promise<Memory | null>;
  update(id: string, updates: Partial<...>): Promise<boolean>;
  delete(id: string): Promise<boolean>;
  list(filter: MemoryFilter): Promise<{ data: Memory[]; total: number; byType: Record<string, number> }>;

  // தேடல்
  search(config: SearchConfig): Promise<Memory[]>;

  // ஆரோக்கிய நிலை
  health(): Promise<HealthCheckResult>;

  // வாழ்க்கைச் சுழற்சி (விருப்பத்திற்குரியது)
  initialize?(): Promise<void>;
  shutdown?(): Promise<void>;
}
```

#### MemoryManager (`manager.ts`)

பின்வருவனவற்றைச் செய்யும் ஒற்றை நிகழ்வு ஒருங்கிணைப்பாளர்:

- `register(backend)` வழியாகப் பின்தளங்களைப் **பதிவு செய்கிறது** — தொடக்கத்தின்போது `index.ts`-இலிருந்து அழைக்கப்படுகிறது
- `configure(primary, fallbacks)` வழியாக முதன்மை + மாற்றுப் பின்தளங்களை **உள்ளமைக்கிறது**
- தோல்வியின்போது மாற்றுச் சங்கிலியைப் பயன்படுத்தி, CRUD/தேடல் செயல்பாடுகளை முதன்மைப் பின்தளத்திற்கு **வழிப்படுத்துகிறது**
- அனைத்து பின்தளங்களிலும் அவ்வப்போது **ஆரோக்கியச் சோதனைகளை** மேற்கொள்கிறது

**மாற்றுப் பின்தள நடத்தை:**

| செயல்பாடு | முதன்மை                      | மாற்றுப் பின்தளங்கள்              |
| --------- | ---------------------------- | --------------------------------- |
| `create`  | ✅ முதன்மை மட்டும்           | ❌                                |
| `get`     | ✅ முதலில் முதன்மையை முயலும் | ✅ null எனில் மாற்றுப் பின்தளம்   |
| `update`  | ✅ முதன்மை மட்டும்           | ✅ காத்திருக்காமல் ஒத்திசைத்தல்   |
| `delete`  | ✅ முதன்மை மட்டும்           | ✅ காத்திருக்காமல் ஒத்திசைத்தல்   |
| `list`    | ✅ முதன்மை மட்டும்           | ❌                                |
| `search`  | ✅ முதலில் முதன்மை           | ✅ பிழையின்போது மாற்றுப் பின்தளம் |

#### GenericMemoryBackend (`genericBackend.ts`)

எந்த REST API-யையும் MemoryBackend ஆக மாற்றியமைக்கும் பொதுவான HTTP இணைப்பி. பின்வருவனவற்றிற்கு இது பயனுள்ளதாக இருக்கும்:

- **Notion** — Notion API வழியாக இணைக்கவும்
- **Obsidian** — Obsidian Local REST API வழியாக இணைக்கவும்
- **தனிப்பயன் பின்தளங்கள்** — RESTful நினைவக API-ஐ வெளிப்படுத்தும் எந்தச் சேவையும்

**உள்ளமைவு:**

```typescript
interface GenericBackendConfig {
  baseUrl: string;           // பின்தள API-இன் அடிப்படை URL
  apiKey?: string;           // அங்கீகாரத்திற்கான Bearer token
  headers?: Record<string, string>;  // தனிப்பயன் HTTP தலைப்புகள்
  timeout?: number;          // கோரிக்கை காலக்கெடு (இயல்புநிலை: 30000ms)
  backendType?: string;      // பதிவிடுவதற்காக

  // முனைப்புள்ளி மேலெழுதல்கள் (இயல்புநிலைகள் REST மரபுகளைப் பயன்படுத்துகின்றன)
  endpoints?: {
    search?: string;   // இயல்புநிலை: "/memories/search"
    create?: string;   // இயல்புநிலை: "/memories"
    list?: string;     // இயல்புநிலை: "/memories"
    get?: string;      // இயல்புநிலை: "/memories/{id}"
    update?: string;   // இயல்புநிலை: "/memories/{id}"
    delete?: string;   // இயல்புநிலை: "/memories/{id}"
    health?: string;   // இயல்புநிலை: "/health"
  };

  // வினவல் அளவுருப் பெயர் பொருத்தங்கள்
  queryParams?: {
    query?/apiKeyId?/limit?/offset?/strategy?/maxTokens?/type?/sessionId?/orderBy?/orderDir?/options?
  };

  // பாதை அளவுருப் பெயர் பொருத்தங்கள்
  pathParams?: {
    id?/memoryId?
  };
}
```

**அறியப்பட்ட பின்தளங்கள்** `KNOWN_BACKENDS`-இல் முன்கூட்டியே உள்ளமைக்கப்பட்டுள்ளன:

```typescript
createKnownBackend("obsidian"); // → localhost:27123-ஐச் சுட்டும் GenericMemoryBackend
createKnownBackend("notion"); // → api.notion.com/v1-ஐச் சுட்டும் GenericMemoryBackend
```

#### உள்ளமைக்கப்பட்ட பின்தளங்கள்

##### SQLiteBackend (`sqliteBackend.ts`)

இயல்புநிலை முதன்மைப் பின்தளம். `src/lib/memory/store.ts`-ஐப் பயன்படுத்தி, ஏற்கனவே உள்ள SQLite-அடிப்படையிலான நினைவகச் சேமிப்பகத்தைப் பொதிகிறது. தொடக்கத்தின்போது தானாகப் பதிவுசெய்யப்படும்.

```typescript
import { sqliteBackend } from "./sqliteBackend";
memoryManager.register(sqliteBackend);
```

##### ObsidianBackend (`obsidianBackend.ts`)

ஏற்கனவே உள்ள Obsidian ஒருங்கிணைப்பை (`src/lib/memory/obsidianBackend.ts`) பொதிகிறது. Obsidian Local REST API வழியாக ஓர் Obsidian vault-உடன் இணைகிறது.

### அமைப்புகள்

நினைவகப் பின்தள அமைப்புகள் பயன்பாட்டு அமைப்புகள் அட்டவணையில் சேமிக்கப்பட்டு, `src/lib/memory/settings.ts` வழியாக நிர்வகிக்கப்படுகின்றன:

| அமைப்பு              | சூழல்/உள்ளமைவு விசை      | இயல்புநிலை | விளக்கம்                                        |
| -------------------- | ------------------------ | ---------- | ----------------------------------------------- |
| முதன்மைப் பின்தளம்   | `memoryPrimaryBackend`   | `"sqlite"` | முதன்மைப் பின்தளத்தின் ID                       |
| மாற்றுப் பின்தளங்கள் | `memoryFallbackBackends` | `[]`       | வரிசைப்படுத்தப்பட்ட மாற்றுப் பின்தள ID-கள்      |
| பின்தள உள்ளமைவுகள்   | `memoryBackendConfigs`   | `{}`       | ஒவ்வொரு பின்தளத்திற்குமான உள்ளமைவு மேலெழுதல்கள் |

அமைப்புகள் `normalizeMemorySettings()` வழியாகச் சீராக்கப்பட்டு, `getMemorySettings()`-இல் இடைநினைவகப்படுத்தப்படுகின்றன.

### துவக்க ஓட்டம்

```
பயன்பாட்டின் துவக்கம்
  → index.ts இறக்குமதிகள் (பக்க விளைவு): SQLiteBackend-ஐப் பதிவுசெய்கின்றன
  → பயன்பாட்டு வாழ்க்கைச் சுழற்சியிலிருந்து initMemoryBackends() அழைக்கப்படுகிறது:
      1. அமைப்புகளை ஏற்றுதல் (getMemorySettings)
      2. முதன்மை + மாற்றுப் பின்தளங்களை உள்ளமைத்தல்
      3. அனைத்துப் பின்தளங்களையும் துவக்குதல் (நலநிலைச் சரிபார்ப்பு)
      4. கோரிக்கைகளுக்குத் தயார்
```

### புதிய பின்தளத்தைச் சேர்த்தல்

1. `src/lib/memory/<name>Backend.ts`-இல் **`MemoryBackend` இடைமுகத்தைச் செயல்படுத்தவும்**
2. `src/lib/memory/index.ts`-இலிருந்து **ஏற்றுமதி செய்யவும்**
3. தொடக்கத்தின்போது `memoryManager.register(yourBackend)` மூலம் **பதிவுசெய்யவும்**
4. அமைப்புகள் வழியாக **உள்ளமைக்கவும்**: `memoryPrimaryBackend`-ஐ உங்கள் பின்தள ID-க்கு அமைக்கவும்
5. `src/lib/memory/__tests__/generic-backend.test.ts`-ஐ மேற்கோளாகக் கொண்டு **சோதிக்கவும்**

#### எடுத்துக்காட்டு: Brain பின்தளம்

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

### சரிபார்ப்பு

#### அலகுச் சோதனைகள்

```bash
npx vitest run src/lib/memory/__tests__/generic-backend.test.ts --reporter=verbose
```

எதிர்பார்க்கப்படும் வெளியீடு: பின்வருவனவற்றை உள்ளடக்கும் **35 சோதனைகள், அனைத்தும் தேர்ச்சி**:

- கட்டமைப்பான் (2)
- நலநிலைச் சரிபார்ப்பு (4) — வெற்றி, 500 தோல்வி, பிணையப் பிழை, தாமதம்
- துவக்குதல் (2) — வெற்றி, தோல்வி
- உருவாக்குதல் (2) — இயல்புநிலை முனைப்புள்ளி, தனிப்பயன் முனைப்புள்ளி
- பெறுதல் (4) — வெற்றி, 404 → null, 404 அல்லாதபோது பிழை எறிதல், தனிப்பயன் பாதை அளவுருக்கள்
- புதுப்பித்தல் (2) — வெற்றி, 404 → false
- நீக்குதல் (2) — வெற்றி, 404 → false
- பட்டியலிடுதல் (2) — வினவல் அளவுருக்கள், தனிப்பயன் அளவுருப் பெயர்கள்
- தேடுதல் (3) — வினவல் அளவுருக்கள், தனிப்பயன் முனைப்புள்ளி, விருப்பங்களின் தொடராக்கம்
- அங்கீகாரத் தலைப்புகள் (2) — Bearer token, தனிப்பயன் தலைப்புகள்
- உருவாக்கி (1)

#### வகைச் சரிபார்ப்பு

```bash
npm run typecheck:core
```

எதிர்பார்க்கப்படுவது: **0 பிழைகள்**.
