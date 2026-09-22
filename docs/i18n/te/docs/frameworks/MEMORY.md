# Memory System (తెలుగు)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/MEMORY.md) · 🇪🇹 [am](../../../am/docs/frameworks/MEMORY.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/MEMORY.md) · 🇦🇿 [az](../../../az/docs/frameworks/MEMORY.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/MEMORY.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/MEMORY.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/MEMORY.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/MEMORY.md) · 🇩🇰 [da](../../../da/docs/frameworks/MEMORY.md) · 🇩🇪 [de](../../../de/docs/frameworks/MEMORY.md) · 🇬🇷 [el](../../../el/docs/frameworks/MEMORY.md) · 🇪🇸 [es](../../../es/docs/frameworks/MEMORY.md) · 🇪🇪 [et](../../../et/docs/frameworks/MEMORY.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/MEMORY.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/MEMORY.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/MEMORY.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/MEMORY.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/MEMORY.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/MEMORY.md) · 🇮🇱 [he](../../../he/docs/frameworks/MEMORY.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/MEMORY.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/MEMORY.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/MEMORY.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/MEMORY.md) · 🇮🇩 [id](../../../id/docs/frameworks/MEMORY.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/MEMORY.md) · 🇮🇹 [it](../../../it/docs/frameworks/MEMORY.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/MEMORY.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/MEMORY.md) · 🇰🇭 [km](../../../km/docs/frameworks/MEMORY.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/MEMORY.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/MEMORY.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/MEMORY.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/MEMORY.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/MEMORY.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/MEMORY.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/MEMORY.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/MEMORY.md) · 🇲🇲 [my](../../../my/docs/frameworks/MEMORY.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/MEMORY.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/MEMORY.md) · 🇳🇴 [no](../../../no/docs/frameworks/MEMORY.md) · 🇮🇳 [or](../../../or/docs/frameworks/MEMORY.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/MEMORY.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/MEMORY.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/MEMORY.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/MEMORY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/MEMORY.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/MEMORY.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/MEMORY.md) · 🇱🇰 [si](../../../si/docs/frameworks/MEMORY.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/MEMORY.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/MEMORY.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/MEMORY.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/MEMORY.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/MEMORY.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/MEMORY.md) · 🇹🇭 [th](../../../th/docs/frameworks/MEMORY.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/MEMORY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/MEMORY.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/MEMORY.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/MEMORY.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/MEMORY.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/MEMORY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/MEMORY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/MEMORY.md)

---

> **ప్రామాణిక మూలం:** `src/lib/memory/` మరియు `src/app/api/memory/`
> **చివరిగా నవీకరించబడింది:** 2026-06-28 — v3.8.40 (డిఫాల్ట్గా ఆఫ్ + int8 క్వాంటైజేషన్ క్యాచ్-అప్)

OmniRoute, API కీ ఆధారంగా (మరియు ఐచ్ఛికంగా సెషన్ id ఆధారంగా) నిరంతర సంభాషణ మెమరీని అందిస్తుంది. తేలికపాటి regex నమూనా సరిపోలిక ద్వారా LLM ప్రతిస్పందనల నుంచి మెమరీలు స్వయంచాలకంగా సంగ్రహించబడతాయి మరియు తదుపరి అభ్యర్థనలలో ప్రారంభ సిస్టమ్ సందేశంగా (లేదా సిస్టమ్ పాత్రను తిరస్కరించే ప్రొవైడర్ల కోసం మొదటి వినియోగదారు సందేశంగా) తిరిగి చొప్పించబడతాయి.

> **డిఫాల్ట్గా మెమరీ ఆఫ్లో ఉంటుంది (v3.8.30+).** `DEFAULT_MEMORY_SETTINGS.enabled`
> ఇప్పుడు `false` (`src/lib/memory/settings.ts`). మెమరీని ప్రారంభిస్తే, తిరిగి పొందిన సందర్భంలో గరిష్ఠంగా
> `maxTokens` (~2k) ప్రతి చాట్ అభ్యర్థనలోకి చొప్పించబడతాయి, దీనికి
> బిల్లు విధించబడుతుంది — కొత్త ఇన్స్టాలేషన్లకు మరియు తమ స్వంత సందర్భాన్ని నిర్వహించే
> క్లయింట్లకు ఇది ఊహించని ఖర్చు కావచ్చు. **Settings → Memory** కింద స్పష్టంగా ఎంపిక చేసి ప్రారంభించండి (
> మెమరీ ప్రారంభించబడినప్పుడు `MemorySkillsTab` టోకెన్-ఖర్చు హెచ్చరిక కాల్అవుట్ను చూపిస్తుంది).
> క్లయింట్ `x-omniroute-no-memory`
> అభ్యర్థన హెడర్ను (`true`/`1`/`yes`) ఉపయోగించి ఒక్క అభ్యర్థనను మినహాయించవచ్చు — అభ్యర్థన-హెడర్ పట్టికను
> [API_REFERENCE.md](../reference/API_REFERENCE.md)లో చూడండి. మెమరీ-రహిత అభ్యర్థన
> `memoryOwnerId = null`గా సెట్ చేస్తుంది, దీనివల్ల ఆ అభ్యర్థనకు మెమరీ మరియు నైపుణ్య చొప్పింపు
> **రెండూ** నిలిపివేయబడతాయి (`open-sse/handlers/chatCore/headers.ts::isNoMemoryRequested`).

మెమరీ **ప్రతి API కీకి ప్రత్యేకంగా** పరిమితం చేయబడుతుంది, ప్రతి వినియోగదారుకు కాదు — ఒకే API కీతో ధృవీకరించబడిన ప్రతి అభ్యర్థన, ఐచ్ఛికంగా `sessionId` ద్వారా మరింత పరిమితం చేయబడే అదే మెమరీ పూల్ను పంచుకుంటుంది.

## ఆర్కిటెక్చర్

```
క్లయింట్ → /v1/chat/completions (apiKeyInfo అప్స్ట్రీమ్లో పరిష్కరించబడింది)
  → handleChatCore() [open-sse/handlers/chatCore.ts]
    → resolveMemoryOwnerId(apiKeyInfo)        # idని సంగ్రహిస్తుంది
    → getMemorySettings()                     # క్యాష్ చేసిన సెట్టింగ్లు
    → shouldInjectMemory(body, {enabled})     # గేట్
    → retrieveMemories(apiKeyId, config)      # SQL + FTS5 + ఐచ్ఛిక వెక్టర్
    → injectMemory(body, memories, provider)  # సిస్టమ్ లేదా వినియోగదారు సందేశం
  → అప్స్ట్రీమ్ ప్రొవైడర్ కాల్
  → ప్రతిస్పందనపై: extractFacts(text, apiKeyId, sessionId)  # నిరోధించనిది
    → setImmediate → ప్రతి సరిపోలికకు createMemory(fact)
                   → embed(content) + upsertVector(id, vec)
```

చొప్పింపు మరియు సంగ్రహణ కాల్-సైట్లు
`open-sse/handlers/chatCore.ts`లో అనుసంధానించబడ్డాయి (`retrieveMemories`, `injectMemory`,
మరియు `extractFacts` కోసం చూడండి).

## ఇంజిన్ ఆర్కిటెక్చర్ (3-స్థాయి పరిష్కారం)

అందుబాటులో ఉన్న మౌలిక సదుపాయాలు మరియు సెట్టింగ్ల ఆధారంగా మెమరీ ఇంజిన్ రన్టైమ్లో తిరిగి పొందే మార్గాన్ని పరిష్కరిస్తుంది. మూడు స్థాయిలు ఉన్నాయి, అవి ప్రాధాన్యతా క్రమంలో వర్తింపజేయబడతాయి:

```
  ┌─────────────────────────────────────────────────────────────┐
  │  స్థాయి 0 — కీవర్డ్ (FTS5)                                  │
  │  ప్రోబ్-ఆధారిత లభ్యత: SQLite బిల్డ్ దీనికి మద్దతిస్తే       │
  │  FTS5 (better-sqlite3 / node:sqlite / bun:sqlite);          │
  │  FTS5 లేని బిల్డ్లలో అందుబాటులో ఉండదు (ఉదా. sql.js/WASM — │
  │  "no such module: fts5"). strategy = "exact" అయినప్పుడు     │
  │  లేదా ఫాల్బ్యాక్గా ఉపయోగించబడుతుంది; engine-statusలోని    │
  │  keyword ప్రోబ్ ఫలితాన్ని ప్రతిబింబిస్తుంది.                 │
  └──────────────────────────────────┬──────────────────────────┘
                                     │ strategy = semantic|hybrid?
                                     ▼
  ┌─────────────────────────────────────────────────────────────┐
  │  స్థాయి 1 — ఎంబెడ్డెడ్ వెక్టర్ (sqlite-vec)                 │
  │  sqlite-vec v0.1.9, db.loadExtension() ద్వారా లోడ్ అవుతుంది.│
  │  Float32 వెక్టర్లపై KNN బ్రూట్-ఫోర్స్. కింది సందర్భాల్లో    │
  │  సక్రియంగా ఉంటుంది:                                         │
  │   • sqlite-vec loadExtension విజయవంతమవుతుంది               │
  │   • Float32Arrayను ఉత్పత్తి చేయగల ఎంబెడ్డింగ్ మూలం          │
  │     (remote | static | transformers) అందుబాటులో ఉంటుంది     │
  │   • vec_memories పట్టిక ఉంటుంది (మొదటి ready()లో సృష్టించబడుతుంది)│
  └──────────────────────────────────┬──────────────────────────┘
                                     │ qdrant.enabled?
                                     ▼
  ┌─────────────────────────────────────────────────────────────┐
  │  స్థాయి 2 — Qdrant (ఐచ్ఛిక బాహ్య వెక్టర్ డేటాబేస్)          │
  │  ప్రారంభించబడినప్పుడు semantic/hybrid కోసం sqlite-vecను     │
  │  భర్తీ చేస్తుంది. నడుస్తున్న Qdrant ఇన్స్టాన్స్తో పాటు     │
  │  కాన్ఫిగర్ చేసిన host/port అవసరం.                            │
  └─────────────────────────────────────────────────────────────┘
```

క్షీణత స్వయంచాలకంగా మరియు పారదర్శకంగా జరుగుతుంది:

- sqlite-vec లోడ్ కావడంలో విఫలమైతే, స్థాయి 1 అందుబాటులో ఉండదు → స్థాయి 0కి ఫాల్బ్యాక్ అవుతుంది.
- ఎంబెడ్డింగ్ మూలం లోపాన్ని అందిస్తే, స్థాయి 1 స్థాయి 0కి ఫాల్బ్యాక్ అవుతుంది.
- Qdrant ఆరోగ్యకరంగా లేకపోతే, స్థాయి 2 స్థాయి 1కి (లేదా స్థాయి 1 కూడా అందుబాటులో లేకపోతే స్థాయి 0కి) ఫాల్బ్యాక్ అవుతుంది.

## ఎంబెడ్డింగ్ మూలాలు

ఎంబెడ్డింగ్ లేయర్ (`src/lib/memory/embedding/`) ఏ మూలాన్ని ఉపయోగించాలో
`MemorySettingsExtended.embeddingSource` ఆధారంగా నిర్ణయిస్తుంది:

| మూలం           | వివరణ                                                                               | కీ అవసరమా       | కోల్డ్ స్టార్ట్  |
| -------------- | ----------------------------------------------------------------------------------- | --------------- | ---------------- |
| `remote`       | కాన్ఫిగర్ చేసిన ప్రొవైడర్ ఎంబెడ్డింగ్ APIని ఉపయోగిస్తుంది (OpenAI, Cohere మొదలైనవి) | అవును           | లేదు             |
| `static`       | `potion-base-8M` ద్వారా లోకల్ లుకప్-టేబుల్ ఎంబెడ్డింగ్ (WordPiece + మీన్ పూలింగ్)   | కాదు            | ~200ms           |
| `transformers` | `@huggingface/transformers` v4, `all-MiniLM-L6-v2` ద్వారా లోకల్ ONNX ఇన్ఫరెన్స్     | కాదు            | ~3s + ~400MB RAM |
| `auto`         | రన్టైమ్ పరిష్కారం: remote (కీ ఉంటే) → static → transformers → null                  | ఆధారపడి ఉంటుంది | ఆధారపడి ఉంటుంది  |

**`auto` కోసం పరిష్కార క్రమం:**

1. `listEmbeddingProviders()`లో `hasKey === true`గా ఉన్న మొదటి ప్రొవైడర్ను కనుగొనండి → `remote`.
2. `settings.staticEnabled === true` అయితే → `static`.
3. `settings.transformersEnabled === true` అయితే → `transformers`.
4. లేకపోతే → `null` (FTS5 కీవర్డ్ శోధనకు దిగజారుతుంది).

ఎంబెడ్డింగ్ క్యాష్ (`src/lib/memory/embedding/cache.ts`) `${source}:${model}:${dim}:${sha256(text)}` ఆధారంగా కీ చేయబడిన ఇన్-మెమరీ
LRU మ్యాప్ను ఉపయోగిస్తుంది. ఇది `MEMORY_EMBEDDING_CACHE_MAX` ఎంట్రీలకు (డిఫాల్ట్ 1000) పరిమితం చేయబడి,
`MEMORY_EMBEDDING_CACHE_TTL_MS` TTLను (డిఫాల్ట్ 5 నిమిషాలు) కలిగి ఉంటుంది. ప్రతి ప్రాసెస్ జీవితచక్రంలో
కాలర్లందరి మధ్య ఇది షేర్ చేయబడుతుంది.

## హైబ్రిడ్ RRF (k=60)

`strategy = "hybrid"`గా ఉండి, వెక్టర్ స్టోర్ అందుబాటులో ఉన్నప్పుడు, రిట్రీవల్
FTS5 మరియు వెక్టర్ ఫలితాలను విలీనం చేయడానికి Reciprocal Rank Fusionను ఉపయోగిస్తుంది:

```
RRF(d) = Σ  1 / (k + rank_i(d))      ఇక్కడ k = 60 (MEMORY_RRF_K ద్వారా కాన్ఫిగర్ చేయవచ్చు)
          i
```

స్పష్టంగా:

1. FTS5 శోధనను అమలు చేయండి → ర్యాంక్ చేసిన జాబితా `R_fts` (స్థానం 1..N).
2. KNN వెక్టర్ శోధనను అమలు చేయండి → ర్యాంక్ చేసిన జాబితా `R_vec` (స్థానం 1..M).
3. ప్రతి ప్రత్యేక `memoryId` కోసం:  
   `rrf_score = 1/(60 + fts_rank)` + `1/(60 + vec_rank)` (జాబితాలో లేకపోతే 0).
4. `rrf_score` ఆధారంగా DESC క్రమంలో సార్ట్ చేసి, టోకెన్ బడ్జెట్ వాక్ను వర్తింపజేయండి.

విభిన్న రిట్రీవల్ సిస్టమ్ల మధ్య స్కోర్ నార్మలైజేషన్ అవసరం లేకుండానే RRF ప్రభావవంతంగా
పనిచేస్తుందని ప్రసిద్ధి. డిఫాల్ట్ `k=60` అసలు Cormack తదితరుల పేపర్ నుండి తీసుకోబడింది
మరియు చిన్న కార్పొరాలకు (<10k మెమరీలు) బాగా పనిచేస్తుంది.

## బ్యాక్ఫిల్ (లేజీ + రీఇండెక్స్)

ఎంబెడ్డింగ్ మోడల్ మారినప్పుడు (`embedding_signature` ద్వారా గుర్తించబడుతుంది),
వెక్టర్ స్టోర్ మళ్లీ నిర్మించబడుతుంది మరియు ఇప్పటికే ఉన్న అన్ని మెమరీలు
`memories` టేబుల్లో `needs_reindex = 1`గా గుర్తించబడతాయి.

**లేజీ బ్యాక్ఫిల్**: తదుపరి రిట్రీవల్ సమయంలో, వెక్టర్ ఎంట్రీ లేని ప్రతి మెమరీని
శోధన అమలయ్యే ముందు ఎంబెడ్ చేసి `vec_memories`లో చేర్చుతారు. ఇది స్టార్టప్ను
బ్లాక్ చేయకుండా వాస్తవ అభ్యర్థనల అంతటా బ్యాక్ఫిల్ ఖర్చును విభజిస్తుంది.

**స్పష్టమైన రీఇండెక్స్**: `/dashboard/memory`లోని Engine ట్యాబ్
`POST /api/memory/reindex`ను కాల్ చేసే "ఇప్పుడే రీఇండెక్స్ చేయండి" బటన్ను అందిస్తుంది. హ్యాండ్లర్
`src/lib/memory/reindex.ts` నుండి `runReindexBatch()`ను కాల్ చేస్తుంది, ఇది ఒక్కో అభ్యర్థనకు
పెండింగ్లో ఉన్న గరిష్ఠంగా `limit` ఎంట్రీలను ప్రాసెస్ చేస్తుంది. ప్రోగ్రెస్ను
`GET /api/memory/engine-status` (`vectorStore.needsReindex`) ద్వారా పోల్ చేయవచ్చు.

`memory_vec_meta` టేబుల్ (మైగ్రేషన్ `083_memory_vec.sql`) వీటిని నిల్వ చేస్తుంది:

- `active_dim` — ప్రస్తుత వెక్టర్ డైమెన్షన్ (null = ఇంకా కాలిబ్రేట్ చేయబడలేదు).
- `embedding_signature` — మార్పులను గుర్తించడానికి ఉపయోగించే `${source}:${model}:${dim}`.
- `last_reset_at` — చివరి పూర్తి రీసెట్ టైమ్స్టాంప్.
- `vec_loaded` — sqlite-vec విజయవంతంగా లోడ్ అయిందో లేదో సూచించే 0/1 ఫ్లాగ్.

## సెట్టింగ్ల విస్తరణ

`src/shared/schemas/memory.ts`లోని `MemorySettingsExtended`లో తొమ్మిది ఎంబెడింగ్ మరియు వెక్టర్ ఫీల్డ్లు అందుబాటులో ఉన్నాయి, ఇవి `src/lib/db/settings.ts` ద్వారా స్థిరంగా భద్రపరచబడతాయి:

| ఫీల్డ్                   | రకం                                                | డిఫాల్ట్ | వివరణ                                                             |
| ------------------------ | -------------------------------------------------- | -------- | ----------------------------------------------------------------- |
| `embeddingSource`        | `"remote" \| "static" \| "transformers" \| "auto"` | `"auto"` | ఉపయోగించాల్సిన ఎంబెడింగ్ మూలం                                     |
| `embeddingProviderModel` | `string \| null`                                   | `null`   | `provider/model` ఆకృతిలో ప్రొవైడర్/మోడల్                          |
| `customBaseUrl`          | `string \| null`                                   | `null`   | మెమరీకి మాత్రమే వర్తించే OpenAI-అనుకూల ఎండ్పాయింట్ బేస్ URL       |
| `customModelId`          | `string \| null`                                   | `null`   | కస్టమ్ ఎండ్పాయింట్కు పంపే మోడల్ ID                                |
| `transformersEnabled`    | `boolean`                                          | `false`  | Transformers.js కోసం ఆప్ట్-ఇన్ (MiniLM, ~400MB)                   |
| `staticEnabled`          | `boolean`                                          | `false`  | స్టాటిక్ potion-base-8M స్థానిక మోడల్ కోసం ఆప్ట్-ఇన్              |
| `rerankEnabled`          | `boolean`                                          | `false`  | రీర్యాంకింగ్ దశను ప్రారంభించండి (+200-500ms/అభ్యర్థన జోడిస్తుంది) |
| `rerankProviderModel`    | `string \| null`                                   | `null`   | `provider/model` ఆకృతిలో రీర్యాంక్ ప్రొవైడర్/మోడల్                |

`rerankProviderModel` అనేది `POST /v1/rerank` ద్వారా పరిష్కరించబడుతుంది (లూప్బ్యాక్ ద్వారా కాల్ చేయబడుతుంది), కాబట్టి ఆ రూట్ అంగీకరించే దేనినైనా ఇది అంగీకరిస్తుంది: ఎంపిక చేసిన క్లౌడ్ రీర్యాంక్ మోడల్ (`cohere/rerank-v3.5`, `jina-ai/jina-reranker-v3.5`, …) లేదా `<node-prefix>/<model>` రూపంలో OpenAI-అనుకూల ప్రొవైడర్ నోడ్ (ఉదా. TEI/Infinity బాక్స్ కోసం `skilled-mini/bge-reranker-v2-m3`). లూప్బ్యాక్ నోడ్లు ఎల్లప్పుడూ అర్హమైనవే; మరొక హోస్ట్లోని నోడ్కు (LAN, Tailscale) అదనంగా `RERANK_REMOTE_PROVIDER_NODES` ఫీచర్ ఫ్లాగ్ అవసరం మరియు అది ప్రొవైడర్ అవుట్బౌండ్ URL విధానాన్ని తప్పనిసరిగా ఉత్తీర్ణం కావాలి — [ఫీచర్ ఫ్లాగ్లు](../reference/FEATURE_FLAGS.md) చూడండి. డ్యాష్బోర్డ్ సెలెక్టర్ ఎంపిక చేసిన ప్రొవైడర్లతో పాటు స్థానిక నోడ్లను జాబితా చేస్తుంది; చెల్లుబాటు అయ్యే ఏదైనా `provider/model` స్ట్రింగ్ను `PUT /api/settings/memory` ద్వారా నేరుగా సెట్ చేయవచ్చు.
| `vectorStore` | `"sqlite-vec" \| "qdrant" \| "auto"` | `"auto"` | ఉపయోగించాల్సిన వెక్టర్ బ్యాకెండ్ |

ఇవి `GET /PUT /api/settings/memory` ద్వారా బహిర్గతం చేయబడతాయి (స్కీమా `MemorySettingsExtendedSchema`).

`remote` మూలం కోసం, మెమరీ ఐచ్ఛిక `customBaseUrl` మరియు
`customModelId` సెట్టింగ్లను కూడా అంగీకరిస్తుంది. ఇవి రెండూ కలిసి గ్లోబల్ ఎంబెడింగ్ రిజిస్ట్రీని మార్చకుండా OpenAI-అనుకూల `/embeddings`
ఎండ్పాయింట్ మరియు మోడల్ను ఎంచుకుంటాయి. ఉపయోగించే ముందు ఎండ్పాయింట్ సాధారణీకరించబడుతుంది మరియు ప్రొవైడర్ అవుట్బౌండ్ URL విధానం ద్వారా తనిఖీ చేయబడుతుంది: HTTP(S)
తప్పనిసరి, పొందుపరిచిన ఆధారాలు మరియు క్వెరీ స్ట్రింగ్లు తిరస్కరించబడతాయి, అలాగే క్లౌడ్-మెటాడేటా
చిరునామాలు బ్లాక్ చేయబడే ఉంటాయి. ఖాళీ విలువలు ఎంచుకున్న రిజిస్ట్రీ ప్రొవైడర్ను అలాగే ఉంచుతాయి. డ్యాష్బోర్డ్కు
తిరిగి పంపే లోపాలు శుద్ధి చేయబడతాయి మరియు ఎండ్పాయింట్ ఆధారాలు ఎప్పటికీ లాగ్ చేయబడవు.

> **TODO (D20):** `global` స్కోప్ (అన్ని API కీల మధ్య మెమరీలను పంచుకోవడం) ఈ
> విడుదలలో అమలు చేయబడలేదు. దీనికి స్కీమా మార్పులు మరియు గ్లోబల్ రిట్రీవల్
> పాత్ అవసరం. దీన్ని విడిగా ట్రాక్ చేయండి.

## నిల్వ లేయర్లు

### ప్రాథమికం: SQLite (`memories` పట్టిక)

`015_create_memories.sql` మైగ్రేషన్ ద్వారా సృష్టించబడింది:

| కాలమ్                       | రకం                | గమనికలు                                                                                    |
| --------------------------- | ------------------ | ------------------------------------------------------------------------------------------ |
| `id`                        | `TEXT PRIMARY KEY` | `crypto.randomUUID()` ద్వారా రూపొందించబడిన UUID                                            |
| `api_key_id`                | `TEXT NOT NULL`    | యాజమాన్య API కీ                                                                            |
| `session_id`                | `TEXT`             | ప్రతి సంభాషణకు ఐచ్ఛిక స్కోప్                                                               |
| `type`                      | `TEXT NOT NULL`    | `factual`, `episodic`, `procedural`, `semantic`లో ఒకటి                                     |
| `key`                       | `TEXT`             | స్థిరమైన అప్సర్ట్ కీ, ఉదా. `preference:i_prefer_python`                                    |
| `content`                   | `TEXT NOT NULL`    | వాస్తవ ఫ్యాక్ట్ పాఠ్యం                                                                     |
| `metadata`                  | `TEXT`             | JSON బ్లాబ్ (వర్గం, సేకరించిన సమయం, మూలం, ...)                                             |
| `created_at` / `updated_at` | `TEXT`             | ISO 8601 స్ట్రింగ్లు                                                                       |
| `expires_at`                | `TEXT`             | ఐచ్ఛిక గడువు; `NULL` అంటే శాశ్వతం                                                          |
| `memory_id`                 | `INTEGER UNIQUE`   | UUIDలు ↔ FTS5 rowidలను అనుసంధానించడానికి `023_fix_memory_fts_uuid.sql` ద్వారా జోడించబడింది |

ఇండెక్స్లు: `api_key_id`, `session_id`, `type`, `expires_at`, అలాగే ప్రత్యేకమైన
`memory_id` ఇండెక్స్.

**అప్సర్ట్ సెమాంటిక్స్**: `createMemory()` అదే
`(api_key_id, key)` కలిగిన ఇప్పటికే ఉన్న వరుస కోసం వెతికి, అది కనుగొనబడితే దానినే అక్కడికక్కడే నవీకరిస్తుంది (`metadata`ను
షాలో స్ప్రెడ్ ద్వారా విలీనం చేస్తుంది). పునరావృతమయ్యే
ప్రాధాన్యత ప్రకటనల కారణంగా పట్టిక పరిమితి లేకుండా పెరగకుండా ఇది నిరోధిస్తుంది.

### పూర్తి-పాఠ్య శోధన (`memory_fts` వర్చువల్ పట్టిక)

`022_add_memory_fts5.sql`, `content` మరియు
`key`పై FTS5 వర్చువల్ పట్టికను సృష్టిస్తుంది. UUID
ప్రాథమిక కీ FTS5 యొక్క పూర్ణాంక rowidతో జాయిన్ కాకపోవడం వల్ల ఏర్పడిన వాస్తవ వినియోగ బగ్ను `023_fix_memory_fts_uuid.sql` పరిష్కరిస్తుంది — ఈ మైగ్రేషన్
`memory_id` కాలమ్ను జోడించి, FTS పట్టికను తిరిగి సృష్టించి,
INSERT, DELETE మరియు UPDATE జరిగినప్పుడు FTSను సమకాలీకరించే ట్రిగ్గర్లను
(`memory_fts_ai`, `memory_fts_ad`, `memory_fts_au`) అనుసంధానిస్తుంది.

`semantic` మరియు `hybrid` వ్యూహాల కోసం `retrieval.ts` దీన్ని ఉపయోగిస్తుంది (క్రింద చూడండి).
రిట్రీవల్ కోడ్ `hasTable("memory_fts")`తో రక్షణ తనిఖీ చేసి, FTS పట్టిక లేకపోతే లేదా FTS క్వెరీ దోషాన్ని విసిరితే
కాలక్రమ క్రమానికి తిరిగి మారుతుంది.

### ఐచ్ఛికం: Qdrant (వెక్టర్ స్టోర్ టైర్ 2)

`src/lib/memory/qdrant.ts`, టైర్ 2
వెక్టర్ స్టోర్గా ఐచ్ఛిక Qdrant అనుసంధానాన్ని అమలు చేస్తుంది. ఇంజిన్ సెలెక్టర్
`memoryVectorStore === "qdrant"` అయినప్పుడు మాత్రమే రిట్రీవల్ Qdrantకు మళ్లుతుంది — డిఫాల్ట్ `"auto"` (మరియు `"sqlite-vec"`)
Qdrantను **ఎప్పటికీ** ఎంచుకోవు. Engine-ట్యాబ్ టాగుల్ `qdrantEnabled` మరియు
`memoryVectorStore` రెండింటినీ కలిపి సెట్ చేస్తుంది: ప్రారంభిస్తే Qdrant ప్రాథమిక స్టోర్ అవుతుంది, నిలిపివేస్తే
`"auto"`కు రీసెట్ అవుతుంది (#5597 — ఆ పరిష్కారానికి ముందు, ఇంజిన్ సెలెక్టర్కు ఏదీ
వ్రాయకపోవడంతో ప్రారంభించడం వల్ల ఎటువంటి ప్రభావం ఉండేది కాదు). Qdrantను చేరుకోలేకపోయినా లేదా అది ఏమీ తిరిగి ఇవ్వకపోయినా, రిట్రీవల్
sqlite-vec → FTS5కు తిరిగి మారుతుంది.

- `upsertSemanticMemoryPoint()` — కాన్ఫిగర్ చేసిన embedding మోడల్తో `key + content`ను embed చేస్తుంది, collection ఉనికిలో ఉందని నిర్ధారిస్తుంది (మొదటిసారి ఉపయోగించినప్పుడు cosine-distance vectorsను సృష్టిస్తుంది), అలాగే `{memoryId,
apiKeyId, sessionId, key, content, metadata, createdAtUnix, expiresAtUnix}` payloadతో ఒక pointను upsert చేస్తుంది.
- `searchSemanticMemory(query, topK, scope)` — queryని embed చేసి,
  `kind = "omniroute_memory"` ద్వారా filter చేసిన collectionలో search చేస్తుంది; ఐచ్ఛికంగా
  `apiKeyId` / `sessionId` ద్వారా కూడా filter చేస్తుంది. `topK`ను `[1, 20]` పరిధికి పరిమితం చేస్తుంది.
- `deleteSemanticMemoryPoint(id)` — ఒకే pointను తొలగిస్తుంది. SQLite row తొలగించిన తర్వాత
  `deleteMemory()` ద్వారా పిలవబడుతుంది (D15).
- `cleanupSemanticMemoryPoints({retentionDays})` — `expiresAtUnix` గతంలో ఉన్న లేదా
  `createdAtUnix` retention cutoff కంటే పాతదైన pointsను bulkగా తొలగిస్తుంది.
  dashboard వాస్తవ సంఖ్యలను చూపగలిగేలా ముందుగా వాటిని లెక్కిస్తుంది.
- `checkQdrantHealth()` — latencyతో కూడిన `GET /readyz` health probe.

settings UIలోని `/dashboard/memory` యొక్క **Engine tab**లో Qdrant config, health check, semantic search test,
మరియు cleanup అందుబాటులో ఉంటాయి. `src/app/api/settings/qdrant/` కింద సంబంధిత
routes అన్నీ v3.8.6 నాటికి అనుసంధానించబడ్డాయి:

| Route                                   | పద్ధతి        | వివరణ                                   |
| --------------------------------------- | ------------- | --------------------------------------- |
| `/api/settings/qdrant`                  | `GET` / `PUT` | Qdrant settingsను చదవడం / నవీకరించడం    |
| `/api/settings/qdrant/health`           | `GET`         | Liveness probe + latency                |
| `/api/settings/qdrant/search`           | `POST`        | Semantic search test                    |
| `/api/settings/qdrant/cleanup`          | `POST`        | గడువు ముగిసిన / పాత pointsను తొలగించడం  |
| `/api/settings/qdrant/embedding-models` | `GET`         | అందుబాటులో ఉన్న embedding models జాబితా |

**ప్రవర్తన గమనికలు (ఏమి ఆశించాలి):**

- **Engine ఎంపిక** — Engine tabలో Qdrantను enable చేస్తే అది primary
  store అవుతుంది (`memoryVectorStore="qdrant"`ను సెట్ చేస్తుంది); disable చేస్తే `"auto"`కు reset అవుతుంది (#5597).
- **Back-fill లేదు** — Qdrant enable చేసిన **తర్వాత** సృష్టించిన/నవీకరించిన memories మాత్రమే
  దానిలో వ్రాయబడతాయి (ప్రతిస్పందన కోసం వేచి ఉండని dual-write). ఇప్పటికే ఉన్న SQLite memories
  migrate చేయబడవు; "Reindex Now" sqlite-vec indexను మాత్రమే పునర్నిర్మిస్తుంది, Qdrantను కాదు.
- **Vector dimension స్వయంచాలకంగా గుర్తించబడుతుంది** — మొదటిసారి ఉపయోగించినప్పుడు వాస్తవ embedding నుండి
  గుర్తించబడుతుంది; పూరించాల్సిన dimension field ఏదీ లేదు. ఒక collection ఉనికిలోకి వచ్చిన తర్వాత
  embedding modelను మార్చడం **స్వయంచాలకంగా** నిర్వహించబడదు: ఇప్పటికే ఉన్న collectionను మార్చకుండా ఉంచుతుంది,
  dimension సరిపోని writes/searches విఫలమై sqlite-vecకు fallback అవుతాయి. Embeddersను మార్చడానికి
  collectionను మళ్లీ సృష్టించండి (కొత్త పేరు ఉపయోగించండి లేదా Qdrantలో దాన్ని తొలగించండి).
- **Distance metric** — ఎల్లప్పుడూ **Cosine** (collection సృష్టించేటప్పుడు hardcode చేయబడింది;
  కాన్ఫిగర్ చేయలేరు).
- **Auth** — API key మాత్రమే (`api-key` headerగా పంపబడుతుంది; authentication లేని
  local Docker కోసం ఐచ్ఛికం). JWT/RBAC ఉపయోగించబడవు.
- **Config fields** — UIలో `host`, `port`, `collection`, `embeddingModel`,
  `apiKey` అందుబాటులో ఉంటాయి. `vectorSize` / `hnswEfConstruct` env/DB ద్వారా మాత్రమే అందుబాటులో ఉంటాయి; collection
  సృష్టించడానికి `vectorSize` ఉపయోగించబడదు (dimension embedding నుండి వస్తుంది).

### Vector quantization (int8 — opt-in, రెండు backendsలోనూ)

నిల్వ చేసిన vectors యొక్క memory footprintను తగ్గించడానికి (~Float32 కంటే 4× చిన్నది), స్వల్ప recall
నష్టంతో, రెండు vector backends కూడా **opt-in int8 quantization**కు మద్దతు ఇస్తాయి.
రెండింటిలోనూ defaultగా ఇది **off** — స్పష్టంగా enable చేయకపోతే vectors full-precisionలోనే
ఉంటాయి.

| Backend    | Setting                         | రకం                            | Default  | ఎక్కడ చదవబడుతుంది                                           |
| ---------- | ------------------------------- | ------------------------------ | -------- | ----------------------------------------------------------- |
| Qdrant     | `qdrantQuantization` (DB key)   | `"none" \| "int8" \| "binary"` | `"none"` | `src/lib/memory/qdrant.ts::normalizeQdrantConfig()`         |
| sqlite-vec | `MEMORY_VEC_QUANTIZATION` (env) | `"none" \| "int8"`             | `"none"` | `src/lib/memory/vectorStore.ts::requestedVecQuantization()` |

- **Qdrant**ను ప్రతి instanceకు `qdrantQuantization` setting
  key ద్వారా కాన్ఫిగర్ చేస్తారు (`PUT /api/settings/qdrant`లో `quantization` fieldగా అందుబాటులో ఉంటుంది).
  ఇది `"int8"`గా ఉన్నప్పుడు, `buildQuantizationConfig()` scalar quantizationను
  (`always_ram`, quantile `0.99`) అభ్యర్థిస్తుంది; అలాగే full-precision vectorsతో int8 candidate
  setను మెరుగుపరచడానికి searches `rescore: true`ను enable చేస్తాయి.
- **sqlite-vec** quantization **environment ద్వారా మాత్రమే** కాన్ఫిగర్ చేయబడుతుంది (DB setting కాదు): local vectorsను
  `vec_quantize_int8(?, 'unit')` ద్వారా `int8[dim]` columnగా నిల్వ చేయడానికి
  `MEMORY_VEC_QUANTIZATION=int8`ను సెట్ చేయండి. ఎంచుకున్న mode `embedding_signature`లో
  (`:int8` suffixతో) చేర్చబడుతుంది; కాబట్టి modesను మార్చితే `vec_memories` table యొక్క పూర్తి
  reindex ప్రారంభమవుతుంది — embedding model మారినప్పుడు ఉపయోగించే అదే lazy-backfill మార్గం ఇది.

## మెమరీ రకాలు

`MemoryType` (`src/lib/memory/types.ts`):

| రకం          | దీని కోసం ఉపయోగించబడుతుంది                                                              |
| ------------ | --------------------------------------------------------------------------------------- |
| `factual`    | ప్రాధాన్యతలు, స్థిరమైన వినియోగదారు వాస్తవాలు, ప్రవర్తనా నమూనాలు                         |
| `episodic`   | నిర్దిష్ట సందర్భంతో ముడిపడిన నిర్ణయాలు ("I chose Postgres")                             |
| `procedural` | వర్క్ఫ్లో / ఎలా చేయాలి అనే మెమరీ (రిజర్వ్ చేయబడింది; ప్రస్తుతం ఆటో-ఎక్స్ట్రాక్టర్ లేదు) |
| `semantic`   | వెక్టర్-స్టోర్ ఎంట్రీల కోసం రిజర్వ్ చేయబడింది                                           |

`MemoryConfig` రిట్రీవల్ వ్యూహం `exact`, `semantic`, లేదా `hybrid`లో ఒకటి,
మరియు స్కోప్ `session`, `apiKey`, లేదా `global`లో ఒకటి. `getMemorySettings()`
నుంచి వచ్చే డిఫాల్ట్ స్కోప్ `apiKey`.

## వాస్తవాల సంగ్రహణ (`extraction.ts`)

సంగ్రహణ **regex-ఆధారితమైనది**, LLM-ఆధారితమైనది కాదు — ఇది
`setImmediate()`తో ప్రాసెస్లోనే నడుస్తుంది, కాబట్టి ప్రతిస్పందన స్ట్రీమ్ను
ఎప్పుడూ నిరోధించదు:

- **ప్రాధాన్యత నమూనాలు** → `MemoryType.FACTUAL`
  (ఉదా. `I prefer …`, `I really like …`, `my favorite is …`, `I hate …`)
- **నిర్ణయ నమూనాలు** → `MemoryType.EPISODIC`
  (ఉదా. `I'll use …`, `I chose …`, `I went with …`, `I'm going to adopt …`)
- **అలవాటు నమూనాలు** → `MemoryType.FACTUAL`
  (ఉదా. `I usually …`, `I always …`, `I tend to …`)

ప్రతి సరిపోలిక శుద్ధి చేయబడుతుంది (`trim`, వైట్స్పేస్ను కుదించడం, గరిష్ఠంగా
500 అక్షరాలకు పరిమితం చేయడం), స్థిరమైన `factKey(category, content)` ద్వారా
బ్యాచ్లో డీడూప్లికేట్ చేయబడుతుంది, మరియు
`{category, extractedAt, source: "llm_response"}` మెటాడేటాతో `createMemory()`
ద్వారా నిల్వ చేయబడుతుంది. ఇన్పుట్ టెక్స్ట్ 64 KiB
(`MAX_EXTRACTION_TEXT_LENGTH`)కు పరిమితం చేయబడుతుంది — అంతకంటే పొడవుగా ఉంటే,
అత్యంత ఇటీవలి అసిస్టెంట్ కంటెంట్ ఎల్లప్పుడూ పాల్గొనేలా టెక్స్ట్ యొక్క **చివరి
భాగం** ఉపయోగించబడుతుంది.

`extractFactsFromText(text)` పరీక్షల కోసం ఎక్స్పోర్ట్ చేయబడుతుంది మరియు
వాస్తవాలను నిల్వ చేయకుండా నిర్మిత రూపంలో తిరిగి ఇస్తుంది.

## రిట్రీవల్ (`retrieval.ts`)

`retrieveMemories(apiKeyId, config)` ప్రధాన ఎంట్రీ పాయింట్. ఇది:

1. `MemoryConfigSchema` ద్వారా కాన్ఫిగ్ను సాధారణీకరించి, ధృవీకరిస్తుంది.
2. `enabled` falseగా ఉన్నప్పుడు లేదా `maxTokens <= 0` అయినప్పుడు వెంటనే `[]`ను తిరిగి ఇస్తుంది.
3. `maxTokens`ను `[1, 8000]` పరిధికి పరిమితం చేస్తుంది.
4. పాత డేటాబేస్లు పని చేస్తూనే ఉండేలా ఆధునిక `memories` టేబుల్ ఉందో లేదో
   (లెగసీ `memory` టేబుల్తో పోల్చి) గుర్తిస్తుంది.
5. గడువు రక్షణ
   (`expires_at IS NULL OR datetime(expires_at) > datetime('now')`), ఐచ్ఛిక
   సెషన్ స్కోప్, మరియు ఐచ్ఛిక `retentionDays` కటాఫ్తో బేస్ క్వెరీని నిర్మిస్తుంది.
6. వ్యూహం ఆధారంగా విభజిస్తుంది:
   - **`exact`** (డిఫాల్ట్): కాలక్రమానుసారంగా `ORDER BY created_at DESC LIMIT 100`.
   - **`semantic`**: `config.query` మరియు `memory_fts` ఉంటే, `memory_fts MATCH ?`
     ద్వారా JOIN చేసి FTS ర్యాంక్ ఆధారంగా క్రమబద్ధీకరిస్తుంది; FTS 0 వరుసలను
     తిరిగి ఇస్తే కాలక్రమ క్రమానికి తిరిగి వెళ్తుంది.
   - **`hybrid`**: FTS ఫలితాలు (అధిక సంబంధితత) మరియు కాలక్రమ సెట్ల యూనియన్ను
     రూపొందించి, id ఆధారంగా డీడూప్లికేట్ చేస్తుంది.
7. క్వెరీ అందించబడినప్పుడు `content`, `key`, మరియు `metadata` JSONపై కీవర్డ్
   సంబంధితత స్కోర్ను (`getRelevanceScore`) గణిస్తుంది. సున్నా స్కోర్ ఉన్న
   వరుసలు ఫిల్టర్ చేయబడతాయి.
8. ముందుగా స్కోర్ అవరోహణ క్రమంలో, తర్వాత `createdAt` అవరోహణ క్రమంలో సార్ట్ చేస్తుంది.
9. ర్యాంక్ చేసిన జాబితాను క్రమంగా పరిశీలిస్తూ, కొనసాగుతున్న
   `estimateTokens(content)` (≈ `length / 4`) బడ్జెట్లో ఉన్నంతవరకు ఎంట్రీలను
   అంగీకరిస్తుంది. ఏవైనా సరిపోలినప్పుడు ఎల్లప్పుడూ కనీసం ఒక ఎంట్రీని తిరిగి ఇస్తుంది.

`estimateTokens` ఎక్స్పోర్ట్ చేయబడుతుంది మరియు రిట్రీవల్, సంగ్రహీకరణ, అలాగే
MCP `omniroute_memory_search` టూల్ ద్వారా ఉపయోగించబడుతుంది.

## ఇంజెక్షన్ (`injection.ts`)

`injectMemory(request, memories, provider)`:

1. అన్ని మెమరీ కంటెంట్లను ఒకే `Memory context: …` స్ట్రింగ్గా కలుపుతుంది.
2. ప్రొవైడర్ పేరు ఆధారంగా ఒక వ్యూహాన్ని ఎంచుకుంటుంది:
   - **సిస్టమ్ సందేశం** (OpenAI, Anthropic, Gemini, … కోసం డిఫాల్ట్) — ఇప్పటికే ఉన్న ఏవైనా సిస్టమ్ సందేశాలకు ముందు
     `{role: "system", content: memoryText}`ను జోడిస్తుంది, తద్వారా వినియోగదారు సిస్టమ్ ప్రాంప్ట్లకే ఇప్పటికీ ప్రాధాన్యం ఉంటుంది.
   - **వినియోగదారు సందేశం** (ఫాల్బ్యాక్) — `PROVIDERS_WITHOUT_SYSTEM_MESSAGE`లోని
     ప్రొవైడర్ల కోసం: `o1`, `o1-mini`, `o1-preview`,
     `glm`, `glmt`, `glm-cn`, `zai`, `qianfan`. ఇవి సిస్టమ్ పాత్రను తిరస్కరిస్తాయి,
     లేదంటే 400 లోపం వస్తుంది (GLM/Zhipu కోసం issue #1701 చూడండి).
3. సంఖ్య, వ్యూహం మరియు మోడల్ను `memory.injection.injected` కింద లాగ్ చేస్తుంది.

తమ స్వంత రూటింగ్ నిర్ణయాలు తీసుకోవాల్సిన కాలర్ల కోసం
`providerSupportsSystemMessage(provider)` ఎగుమతి చేయబడుతుంది. భద్రత కోసం తెలియని ప్రొవైడర్లు డిఫాల్ట్గా `true`
(సిస్టమ్ పాత్ర అనుమతించబడుతుంది)గా పరిగణించబడతారు.

## సెట్టింగ్లు (`settings.ts`)

మెమరీ కాన్ఫిగరేషన్ env varsలో కాకుండా **DB సెట్టింగ్ల పట్టికలో నిల్వ చేయబడుతుంది**.
`getMemorySettings()` అనేది `getSettings()` నుండి చదివి, ఫలితాన్ని
ప్రాసెస్లోనే క్యాష్ చేస్తుంది; రైట్ల తర్వాత సెట్టింగ్ల PUT
రూట్ ద్వారా `invalidateMemorySettingsCache()` కాల్ చేయబడుతుంది.

### లెగసీ ఫీల్డ్లు (అన్ని వెర్షన్లు)

| DB కీ                 | రకం     | డిఫాల్ట్                                           | UI నియంత్రణ                                                       |
| --------------------- | ------- | -------------------------------------------------- | ----------------------------------------------------------------- |
| `memoryEnabled`       | boolean | `false` (v3.8.30 నుండి డిఫాల్ట్గా ఆఫ్)             | మెమరీ ఆన్/ఆఫ్                                                     |
| `memoryMaxTokens`     | integer | `2000` (పరిధి `0–16000`)                           | ఇంజెక్షన్ కోసం టోకెన్ బడ్జెట్                                     |
| `memoryRetentionDays` | integer | `30` (పరిధి `1–365`)                               | నిలుపుదల వ్యవధి                                                   |
| `memoryStrategy`      | enum    | `"hybrid"` (`recent`, `semantic`, `hybrid`లో ఒకటి) | రిట్రీవల్ వ్యూహం                                                  |
| `skillsEnabled`       | boolean | `false`                                            | ప్రతి కీకి స్కిల్ ఇంజెక్షన్ను టాగుల్ చేస్తుంది (SKILLS.md చూడండి) |

గమనిక: UI వ్యూహం `"recent"` అనేది `toMemoryRetrievalConfig()` ద్వారా అంతర్గత `"exact"` రిట్రీవల్
వ్యూహానికి మ్యాప్ అవుతుంది (కాలక్రమ క్రమం).

### కొత్త ఫీల్డ్లు (v3.8.6, ప్లాన్ 21 D9)

ఫీల్డ్ వివరణల కోసం పైన ఉన్న "సెట్టింగ్ల విస్తరణ" విభాగాన్ని కూడా చూడండి.

| DB కీ                       | API ఫీల్డ్               | డిఫాల్ట్ |
| --------------------------- | ------------------------ | -------- |
| `memoryEmbeddingSource`     | `embeddingSource`        | `"auto"` |
| `memoryEmbeddingModel`      | `embeddingProviderModel` | `null`   |
| `memoryTransformersEnabled` | `transformersEnabled`    | `false`  |
| `memoryStaticEnabled`       | `staticEnabled`          | `false`  |
| `memoryRerankEnabled`       | `rerankEnabled`          | `false`  |
| `memoryRerankModel`         | `rerankProviderModel`    | `null`   |
| `memoryVectorStore`         | `vectorStore`            | `"auto"` |

Qdrant-సంబంధిత DB కీలు (`qdrantEnabled`, `qdrantHost`, `qdrantPort`,
`qdrantApiKey`, `qdrantCollection` డిఫాల్ట్ `"omniroute_memory"`,
`qdrantEmbeddingModel` డిఫాల్ట్ `"openai/text-embedding-3-small"`) `qdrant.ts`లోని
`normalizeQdrantConfig()` ద్వారా చదవబడతాయి.

### ఎన్విరాన్మెంట్ వేరియబుల్స్ (v3.8.6)

ఆరు ఐచ్ఛిక env vars ఇంజిన్ రన్టైమ్ ప్రవర్తనను సర్దుబాటు చేస్తాయి (`.env.example`లో డాక్యుమెంట్ చేయబడ్డాయి):

| వేరియబుల్                       | డిఫాల్ట్                   | వివరణ                                                                                                                                                     |
| ------------------------------- | -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `MEMORY_EMBEDDING_CACHE_TTL_MS` | `300000`                   | ఎంబెడింగ్ క్యాష్ TTL (5 నిమి)                                                                                                                             |
| `MEMORY_EMBEDDING_CACHE_MAX`    | `1000`                     | ఎంబెడింగ్ LRU క్యాష్లో గరిష్ఠ ఎంట్రీలు                                                                                                                    |
| `MEMORY_TRANSFORMERS_MODEL`     | `Xenova/all-MiniLM-L6-v2`  | Transformers.js మోడల్ కోసం HF రిపో                                                                                                                        |
| `MEMORY_STATIC_MODEL`           | `minishlab/potion-base-8M` | స్టాటిక్ potion మోడల్ కోసం HF రిపో                                                                                                                        |
| `MEMORY_STATIC_CACHE_DIR`       | `<DATA_DIR>/embeddings`    | డౌన్లోడ్ చేసిన మోడల్లను నిల్వ చేసే స్థానం                                                                                                                 |
| `MEMORY_VEC_TOP_K`              | `20`                       | వెక్టర్ శోధన కోసం డిఫాల్ట్ top-K                                                                                                                          |
| `MEMORY_RRF_K`                  | `60`                       | హైబ్రిడ్ శోధన కోసం RRF k స్థిరాంకం                                                                                                                        |
| `MEMORY_VEC_QUANTIZATION`       | `none`                     | స్థానిక sqlite-vec వెక్టర్లను క్వాంటైజ్ చేసి నిల్వ చేయడానికి `int8`గా సెట్ చేయండి (~4× చిన్నవి; ఆప్ట్-ఇన్). మోడ్ మార్పు రీఇండెక్స్ను తప్పనిసరి చేస్తుంది. |

## సారాంశీకరణ (`summarization.ts`)

ఒక కీకి సంబంధించిన మెమరీలలో అమలులో ఉన్న మొత్తం టోకెన్ల సంఖ్య బడ్జెట్ను మించినప్పుడు, `summarizeMemories(apiKeyId, sessionId?, maxTokens = 4000)` పాత కంటెంట్ను సంక్షిప్తం చేస్తుంది. ఇది `created_at` ఆధారంగా అడ్డు వరుసలను DESC క్రమంలో పునరావృతం చేస్తూ, పరిమితిలో సరిపోయే అడ్డు వరుసలను ఉంచుతుంది; మిగిలిన వాటిలోని `content`ను అదే స్థానంలో అసలు కంటెంట్లోని మొదటి మూడు వాక్యాలతో భర్తీ చేస్తుంది. పాత, కొత్త కంటెంట్ల మధ్య `estimateTokens` వ్యత్యాసమే `tokensSaved`.

ప్రస్తుత చాట్ పైప్లైన్లో ఈ రొటీన్ **అందుబాటులో ఉంది, కానీ స్వయంచాలకంగా కాల్ చేయబడదు** — నిరంతర సంక్షిప్తీకరణ అవసరమైతే దీన్ని cron, అడ్మిన్ చర్య లేదా `MemoryConfig.autoSummarize` అనుసంధానం నుండి కాల్ చేయండి. డేటా నష్టం ఏకదిశాత్మకం: అసలు టెక్స్ట్ ఓవర్రైట్ చేయబడుతుంది.

## REST API

అన్ని ఎండ్పాయింట్లకు నిర్వహణ ప్రామాణీకరణ (`requireManagementAuth`) అవసరం.

### ప్రధాన మెమరీ ఎండ్పాయింట్లు (ఇప్పటికే ఉన్నవి + నవీకరించినవి)

| పద్ధతి   | మార్గం               | వివరణ                                                                                                                                                                                                        |
| -------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `GET`    | `/api/memory`        | ఫిల్టర్లతో పేజీలుగా విభజించిన జాబితా: `apiKeyId`, `type`, `sessionId`, `q`, `limit`, `page`, `offset`. ప్రతిస్పందనలో `stats.total`, `stats.tokensUsed`, `stats.hitRate`, `cacheStats` ఉంటాయి                 |
| `POST`   | `/api/memory`        | ఎంట్రీని సృష్టిస్తుంది (Zod ద్వారా ధృవీకరించబడినవి: `content`, `key`, ఐచ్ఛికంగా `type`, `sessionId`, `apiKeyId`, `metadata`, `expiresAt`). `(apiKeyId, key)`పై upsert చేసే `createMemory()`ని కాల్ చేస్తుంది |
| `GET`    | `/api/memory/[id]`   | UUID ద్వారా ఒకే ఎంట్రీని పొందుతుంది                                                                                                                                                                          |
| `PUT`    | `/api/memory/[id]`   | ఎంట్రీ ఫీల్డ్లను (`type`, `key`, `content`, `metadata`) నవీకరిస్తుంది. బాడీ: `MemoryUpdatePutSchema`. ఎంబెడ్డింగ్ మూలం అందుబాటులో ఉంటే వెక్టర్ను కూడా సమకాలీకరిస్తుంది.                                      |
| `DELETE` | `/api/memory/[id]`   | ఒక ఎంట్రీని తొలగిస్తుంది; `vec_memories` (D15) మరియు Qdrant నుండి కూడా సాధ్యమైనంతవరకు తొలగిస్తుంది. ఎంట్రీ లేనప్పుడు 404ను తిరిగి ఇస్తుంది.                                                                  |
| `GET`    | `/api/memory/health` | `verifyExtractionPipeline("health-check")`ను అమలు చేస్తుంది — సృష్టించడం→జాబితా చేయడం→తొలగించడం అనే పూర్తి చక్రం. `{working, latencyMs, error?}`ను తిరిగి ఇస్తుంది                                           |

### కొత్త మెమరీ ఇంజిన్ ఎండ్పాయింట్లు (ప్రణాళిక 21)

| పద్ధతి | మార్గం                            | వివరణ                                                                                                                                                                             |
| ------ | --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `POST` | `/api/memory/retrieve-preview`    | `retrieveMemories` డ్రై-రన్ — స్కోర్, టైర్, టోకెన్లతో ర్యాంక్ చేసిన ఫలితాలను తిరిగి ఇస్తుంది. బాడీ: `RetrievePreviewSchema`. మెమరీలను ఇంజెక్ట్ చేయదు లేదా సవరించదు.               |
| `GET`  | `/api/memory/embedding-providers` | ఎంబెడ్డింగ్ మోడళ్లతో ప్రొవైడర్లను జాబితా చేస్తుంది, కాన్ఫిగర్ చేసిన API కీ ఏవాటికి ఉందో సూచిస్తుంది.                                                                              |
| `GET`  | `/api/memory/engine-status`       | పూర్తి ఇంజిన్ స్థితిని తిరిగి ఇస్తుంది: కీవర్డ్ టైర్, ఎంబెడ్డింగ్ రిజల్యూషన్, వెక్టర్ స్టోర్ గణాంకాలు, Qdrant ఆరోగ్యం, రీర్యాంక్ కాన్ఫిగరేషన్. ఆకృతి: `MemoryEngineStatusSchema`. |
| `POST` | `/api/memory/summarize`           | మెమరీ సంక్షిప్తీకరణను మాన్యువల్గా ప్రారంభిస్తుంది. బాడీ: `MemorySummarizeSchema` (`olderThanDays`, `apiKeyId?`, `dryRun`). `{candidates, tokensSaved}`ను తిరిగి ఇస్తుంది.         |
| `POST` | `/api/memory/reindex`             | `needs_reindex=1` ఉన్న మెమరీల కోసం వెక్టర్ రీఇండెక్స్ను ప్రారంభిస్తుంది. బాడీ: `MemoryReindexSchema` (`force`). `{started, pending}`ను తిరిగి ఇస్తుంది.                           |

### సెట్టింగ్ల ఎండ్పాయింట్లు

| పద్ధతి | మార్గం                                  | వివరణ                                                                                                               |
| ------ | --------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `GET`  | `/api/settings/memory`                  | ప్రస్తుత సాధారణీకరించిన `MemorySettingsExtended` (7 కొత్త ఫీల్డ్లు + లెగసీ)                                         |
| `PUT`  | `/api/settings/memory`                  | `MemorySettingsExtendedSchema`లోని ఏదైనా ఫీల్డ్ను నవీకరిస్తుంది (మొత్తం 12 ఫీల్డ్లు)                                |
| `GET`  | `/api/settings/qdrant`                  | ప్రస్తుత Qdrant సెట్టింగ్లు (`QdrantSettingsSchema`)                                                                |
| `PUT`  | `/api/settings/qdrant`                  | Qdrant సెట్టింగ్లను నవీకరిస్తుంది. బాడీ: `QdrantSettingsUpdateSchema`. `apiKey` = ఖాళీ స్ట్రింగ్ కీని తొలగిస్తుంది. |
| `GET`  | `/api/settings/qdrant/health`           | కాన్ఫిగర్ చేసిన Qdrant ఇన్స్టాన్స్కు వ్యతిరేకంగా లైవ్నెస్ ప్రోబ్. `QdrantHealthResultSchema`ను తిరిగి ఇస్తుంది.     |
| `POST` | `/api/settings/qdrant/search`           | Qdrantకు వ్యతిరేకంగా సెమాంటిక్ శోధన పరీక్ష. బాడీ: `QdrantSearchSchema` (`query`, `topK`).                           |
| `POST` | `/api/settings/qdrant/cleanup`          | గడువు ముగిసిన / పాత మెమరీలకు సంబంధించిన Qdrant పాయింట్లను తొలగిస్తుంది.                                             |
| `GET`  | `/api/settings/qdrant/embedding-models` | Qdrantకు అందుబాటులో ఉన్న ఎంబెడ్డింగ్ మోడళ్లను జాబితా చేస్తుంది.                                                     |

`/api/memory` జాబితా క్వెరీ `page`-ఆధారిత పేజినేషన్
(`parsePaginationParams`) **లేదా** నేరుగా `offset`కు మద్దతు ఇస్తుంది — `offset` ఉన్నప్పుడు దానికే
ప్రాధాన్యం ఇవ్వబడుతుంది మరియు ప్రతిస్పందన ఆకృతి కోసం ఉత్పన్నమైన `page` లెక్కించబడుతుంది.

## MCP సాధనాలు (`open-sse/mcp-server/tools/memoryTools.ts`)

MCP సర్వర్ ప్రారంభించబడినప్పుడు, మూడు మెమరీ సాధనాలు నమోదు చేయబడతాయి:

- `omniroute_memory_search` — `{apiKeyId, query?, type?, maxTokens?, limit?}`
  → `retrieveMemories()`ను ర్యాప్ చేస్తుంది. v3.8.6 (D16) నుండి, `strategy`ని
  `"exact"`గా హార్డ్కోడ్ చేయడానికి బదులుగా `getMemorySettings()` నుంచి చదువుతుంది. ఒకవేళ
  `query` అందించబడి, `strategy` అనేది `semantic` లేదా `hybrid` అయితే, అందుబాటులో ఉన్నప్పుడు
  వెక్టర్ స్టోర్ ఉపయోగించబడుతుంది.
- `omniroute_memory_add` — `{apiKeyId, sessionId?, type, key, content,
metadata?}` → `createMemory()`ను ర్యాప్ చేస్తుంది. ఈ 4 ప్రామాణిక రకాలను మాత్రమే అంగీకరిస్తుంది:
  `factual`, `episodic`, `procedural`, `semantic` (D17).
- `omniroute_memory_clear` — `{apiKeyId, type?, olderThan?}` → సరిపోలే
  ఎంట్రీలను జాబితా చేస్తుంది, ఐచ్ఛికంగా నిర్దిష్ట టైమ్స్టాంప్కు ముందు సృష్టించిన వాటిని ఫిల్టర్ చేసి, ఆపై ప్రతి దానిని
  `deleteMemory()` ద్వారా తొలగిస్తుంది (ఇది sqlite-vec + Qdrant నుంచి వెక్టర్లను కూడా తొలగిస్తుంది).

ట్రాన్స్పోర్ట్ మరియు స్కోప్ వివరాల కోసం [MCP-SERVER.md](./MCP-SERVER.md) చూడండి.

## డ్యాష్బోర్డ్ (మెమరీ స్టూడియో)

`src/app/(dashboard)/dashboard/memory/page.tsx` ఇప్పుడు **3-ట్యాబ్ స్టూడియో**:

### ట్యాబ్: మెమరీలు

- కాన్సెప్ట్ కార్డ్ (కుదించగల "ఇది ఎలా పనిచేస్తుంది" వివరణ).
- రియల్-టైమ్ జాబితా, శోధన మరియు పేజినేషన్ (300 ms డీబౌన్స్ చేయబడింది).
- రకం ఫిల్టర్ (`factual` / `episodic` / `procedural` / `semantic` / అన్నీ).
- మెమరీని జోడించే మోడల్ (కీ, కంటెంట్, రకం).
- ఇన్లైన్ సవరణ (పెన్సిల్ బటన్ → `PUT /api/memory/[id]`).
- ప్రతి వరుసకు తొలగింపు ఎంపిక (నిర్ధారణ డైలాగ్తో).
- ప్రస్తుత పేజీని JSONగా ఎగుమతి చేయడం; ఫైల్ పికర్ ద్వారా JSON దిగుమతి.
- గణాంక కార్డ్లు: `totalEntries`, `tokensUsed`, `hitRate`.
- "పాతవాటిని కాంపాక్ట్ చేయి" బటన్ → `POST /api/memory/summarize` (ముందుగా డ్రై-రన్
  అభ్యర్థుల సంఖ్యను చూపుతుంది, ఆపై నిర్ధారిస్తుంది).
- `GET /api/memory/health` ద్వారా నియంత్రించబడే ఆకుపచ్చ/ఎరుపు హెల్త్ డాట్.

### ట్యాబ్: ప్లేగ్రౌండ్

- క్వెరీ ఇన్పుట్ + వ్యూహ ఎంపిక సాధనం (ఖచ్చితమైనది / సెమాంటిక్ / హైబ్రిడ్) + టోకెన్ బడ్జెట్.
- "సిమ్యులేట్ చేయి" → `POST /api/memory/retrieve-preview` — ర్యాంక్ చేసిన ఫలితాలను
  `score`, `tier`, `tokens`, `vecScore`, `ftsScore`తో చూపుతుంది.
- ఏ ఎంబెడింగ్ సోర్స్ / వెక్టర్ స్టోర్ ఉపయోగించబడిందో మరియు
  ఫాల్బ్యాక్ జరిగిందో లేదో చూపించే రిజల్యూషన్ ప్యానెల్.

### ట్యాబ్: ఇంజిన్

- ఇంజిన్ స్థితి ప్యానెల్ (కీవర్డ్ FTS5 చిప్, ఎంబెడింగ్ చిప్, వెక్టర్ స్టోర్ చిప్,
  Qdrant హెల్త్ చిప్, రీర్యాంక్ చిప్).
- "ఇప్పుడే రీఇండెక్స్ చేయి" బటన్ → `POST /api/memory/reindex`.
- ఎంబెడింగ్ సోర్స్ ఎంపిక సాధనం (ఆటో / రిమోట్ / స్టాటిక్ / ట్రాన్స్ఫార్మర్లు + టాగుల్లు).
- Qdrant కాన్ఫిగ్ కార్డ్ (ప్రారంభించే టాగుల్, హోస్ట్/పోర్ట్/కలెక్షన్/కీ, కనెక్షన్ పరీక్ష,
  సెమాంటిక్ శోధన పరీక్ష, క్లీనప్).
- రీర్యాంక్ కాన్ఫిగ్ కార్డ్ (ప్రారంభించే టాగుల్, ప్రొవైడర్/మోడల్ ఎంపిక సాధనం).

లెగసీ/గ్లోబల్ సెట్టింగ్ల ఉపరితలం కోసం మెమరీ మరియు Qdrant సెట్టింగ్లు
`/dashboard/settings → మెమరీ & నైపుణ్యాలు` (`MemorySkillsTab.tsx`) కింద కూడా
అందుబాటులో ఉంటాయి.

## క్యాషింగ్

`src/lib/memory/store.ts`, `getMemory(id)` రీడ్ల కోసం ఇన్-ప్రాసెస్ LRU-తరహా క్యాష్ను
(`MEMORY_CACHE_TTL = 1 min`, `MEMORY_MAX_CACHE_SIZE = 500`, 20 %
పురాతన ఎంట్రీల తొలగింపుతో) నిర్వహిస్తుంది; అలాగే తమ స్వంత స్కోప్ చేసిన క్యాష్ను కోరుకునే కాలర్లు ఉపయోగించే
`get`/`set`/`invalidate` పద్ధతులతో కూడిన సాధారణ కీ/విలువ
`memoryCache` లేయర్ను (`src/lib/memory/cache.ts`) కూడా నిర్వహిస్తుంది (1 000-ఎంట్రీ LRU,
డిఫాల్ట్ TTL 5 min).

## గోప్యత & జీవితచక్రం

- మెమరీ యాజమాన్యం API కీ id (`chatCore.ts`లోని `resolveMemoryOwnerId`).
  `apiKeyInfo.id` లేకుండా రిట్రీవల్, ఇంజెక్షన్ లేదా ఎక్స్ట్రాక్షన్ ఏదీ
  అమలు కాదు.
- భవిష్యత్ `expires_at` కలిగిన ఎంట్రీలు రిట్రీవల్ నుండి ఫిల్టర్ చేయబడతాయి;
  `retentionDays`కు మించిన పాత ఎంట్రీలు `retrieveMemories`లోని
  `created_at >= cutoff` క్లాజ్ ద్వారా మినహాయించబడతాయి.
- హార్డ్ డిలీషన్ కోసం, `DELETE /api/memory/[id]` లేదా `omniroute_memory_clear` ఉపయోగించండి.
- ఎక్స్ట్రాక్షన్ `setImmediate` ద్వారా ఫైర్-అండ్-ఫర్గెట్ పద్ధతిలో జరుగుతుంది;
  వైఫల్యాలు `memory.extraction.background.failed` కింద లాగ్ చేయబడతాయి మరియు
  కాలర్కు ఎప్పుడూ కనిపించవు.
- వెరిఫికేషన్ రౌండ్-ట్రిప్లు (`verifyExtractionPipeline`) తమ సొంత
  టెస్ట్ ఎంట్రీలను `finally` బ్లాక్లో తొలగిస్తాయి.

## ఇవి కూడా చూడండి

- [SKILLS.md](./SKILLS.md) — `skillsEnabled` సెట్టింగ్ మెమరీతో పాటు టూల్
  నిర్వచనాలను ఇంజెక్ట్ చేస్తుంది.
- [MCP-SERVER.md](./MCP-SERVER.md) — MCP ట్రాన్స్పోర్ట్ / స్కోప్లు.
- [API_REFERENCE.md](../reference/API_REFERENCE.md) — విస్తృతమైన API ఉపరితలం.
- సోర్స్ మాడ్యూల్లు:
  - `src/lib/memory/types.ts`, `schemas.ts`
  - `src/lib/memory/store.ts`, `retrieval.ts`, `injection.ts`, `reindex.ts`
  - `src/lib/memory/extraction.ts`, `summarization.ts`, `verify.ts`
  - `src/lib/memory/settings.ts`, `qdrant.ts`, `cache.ts`
  - `src/lib/memory/vectorStore.ts` — sqlite-vec + హైబ్రిడ్ RRF
  - `src/lib/memory/embedding/index.ts` — బహుళ-సోర్స్ ఎంబెడ్డింగ్ లేయర్
  - `src/lib/memory/embedding/types.ts`, `remote.ts`, `staticPotion.ts`,
    `transformersLocal.ts`, `cache.ts`
  - `src/shared/schemas/memory.ts` — అన్ని మెమరీ API బాడీల కోసం Zod స్కీమాలు
  - `src/shared/schemas/qdrant.ts` — Qdrant సెట్టింగ్లు/ఆపరేషన్ల కోసం Zod స్కీమాలు
  - `src/lib/db/memoryVec.ts` — `memory_vec_meta` కోసం CRUD
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
  - `src/app/api/settings/qdrant/route.ts` + సబ్-రూట్లు
  - `src/app/(dashboard)/dashboard/memory/` — Studio UI (పేజీ + కాంపోనెంట్లు +
    ట్యాబ్లు + హుక్లు)
  - `open-sse/handlers/chatCore.ts` (ఇంజెక్షన్ / ఎక్స్ట్రాక్షన్ వైరింగ్)
  - `open-sse/mcp-server/tools/memoryTools.ts`

---

## ఎంబెడ్డింగ్ ప్రొవైడర్ను ఎంచుకోవడం (v3.8.16+)

OmniRoute మెమరీ ఇంజిన్ **నాలుగు ఎంబెడ్డింగ్ సోర్స్లకు** (`src/lib/memory/embedding/`) మద్దతు ఇస్తుంది. ప్రతి దానికీ **లేటెన్సీ, ఖర్చు, మోడల్ నాణ్యత మరియు సెటప్ సంక్లిష్టత** పరంగా వేర్వేరు ప్రయోజనాలు, పరిమితులు ఉన్నాయి.

### ఎంబెడ్డింగ్ సోర్స్లు

| ప్రొవైడర్      | సోర్స్                                                | లేటెన్సీ                            | ఖర్చు                  | నాణ్యత                                    | సెటప్                                             |
| -------------- | ----------------------------------------------------- | ----------------------------------- | ---------------------- | ----------------------------------------- | ------------------------------------------------- |
| `transformers` | లోకల్ ONNX మోడల్ (Xenova/all-MiniLM-L6-v2)            | ~50-150ms (CPU)                     | ఉచితం                  | మంచిది                                    | `npm install` మాత్రమే                             |
| `static`       | ముందుగా గణించిన వెక్టర్లు (క్యాష్ చేసినవి)            | <1ms                                | ఉచితం                  | వర్తించదు (క్యాష్ హిట్పై ఆధారపడి ఉంటుంది) | ఏదీ లేదు                                          |
| `remote`       | OpenAI / Cohere / Voyage API                          | ~100-300ms                          | $0.02-0.10/1M టోకెన్లు | అత్యుత్తమం                                | API కీ                                            |
| `auto`         | రన్టైమ్లో అందుబాటులో ఉన్న ఉత్తమ సోర్స్ను ఎంచుకుంటుంది | ఎంచుకున్న సోర్స్తో సమానం            | ఉచితం                  | ఎంచుకున్న సోర్స్తో సమానం                  | ఏదీ లేదు                                          |
| _(cache)_      | ఏ సోర్స్పైనైనా ఇన్-మెమరీ LRU లేయర్                    | <1ms (హిట్), పూర్తి లేటెన్సీ (మిస్) | ఉచితం                  | అంతర్లీన సోర్స్తో సమానం                   | ఎల్లప్పుడూ ఆన్లో ఉంటుంది (ఎంచుకోదగిన సోర్స్ కాదు) |

### నిర్ణయ వృక్షం

```
                  మీ డిప్లాయ్మెంట్ సందర్భం ఏమిటి?
                  │
      ┌───────────┼───────────┬──────────────┐
      │           │           │              │
  DEV/TEST    చిన్న PROD   పెద్ద PROD    EDGE / OFFLINE
      │           │           │              │
      ▼           ▼           ▼              ▼
  transformers transformers remote (Qdrant) transformers
  (ఉచితం, API లేదు)          (ఉత్తమ నాణ్యత)   (ఇంటర్నెట్ లేదు)
      │           │           │              │
      └────────┬──┴───────────┴──────────────┘
               │
               ▼
            పైన ఎల్లప్పుడూ `cache` లేయర్ను జోడించండి
            (LruCache ఏ ప్రొవైడర్నైనా ర్యాప్ చేస్తుంది)
```

### డేటాబేస్ & API కాన్ఫిగరేషన్

మెమరీ ఎంబెడ్డింగ్ ఎంపికలు ఎన్విరాన్మెంట్ వేరియబుల్ల ద్వారా కాకుండా Settings API/UI ద్వారా కాన్ఫిగర్ చేయబడతాయి. Settings కింద సంబంధిత సెట్టింగ్ల డేటాబేస్ కీలు (`src/lib/memory/settings.ts`లోని `normalizeMemorySettings`):

- `memoryEmbeddingSource`: `"transformers"` (లోకల్), `"remote"` (API-ఆధారితం, ఉదా. OpenAI), `"static"` (బాహ్య స్టోర్), లేదా `"auto"`
- `memoryEmbeddingProviderModel`: రిమోట్/స్టాటిక్ సోర్స్ల కోసం మోడల్ ఐడెంటిఫయర్ (ఉదా., `"text-embedding-3-small"`)
- `memoryTransformersEnabled`: `true` | `false`
- `memoryStaticEnabled`: `true` | `false`
- `memoryVectorStore`: `"sqlite-vec"`, `"qdrant"`, లేదా `"auto"`

#### లోకల్ మోడల్ (`transformers`)

లోకల్ మోడల్లను అమలు చేయడానికి అంతర్గతంగా transformers.jsను ఉపయోగిస్తుంది:

```bash
# కోడ్లో చదివే ఎన్విరాన్మెంట్ వేరియబుల్లు (src/lib/memory/embedding/index.ts):
MEMORY_TRANSFORMERS_MODEL=Xenova/all-MiniLM-L6-v2  # HF model repo
MEMORY_STATIC_MODEL=minishlab/potion-base-8M       # HF static potion model
MEMORY_STATIC_CACHE_DIR=<DATA_DIR>/embeddings      # Cache directory
```

#### LRU ఎంబెడ్డింగ్ క్యాష్

క్యాష్ డిఫాల్ట్గా ఎల్లప్పుడూ ఆన్లో ఉంటుంది మరియు ఎన్విరాన్మెంట్ వేరియబుల్ల ద్వారా కాన్ఫిగర్ చేయబడుతుంది:

```bash
MEMORY_EMBEDDING_CACHE_MAX=1000                    # Max cached items
MEMORY_EMBEDDING_CACHE_TTL_MS=300000               # TTL (5 min)
```

### పనితీరు గణాంకాలు

సాధారణ 4-core x86 సర్వర్పై బెంచ్మార్క్ (ఒక్కో టెక్స్ట్లో ~100 టోకెన్లు):

| ప్రొవైడర్            | p50   | p95   | p99   | 1M ఎంబెడ్డింగ్లకు ఖర్చు            |
| -------------------- | ----- | ----- | ----- | ---------------------------------- |
| `transformers` (CPU) | 80ms  | 180ms | 350ms | ఉచితం                              |
| `remote` (OpenAI)    | 120ms | 220ms | 400ms | ~$0.02 (ada-002) / $0.13 (3-large) |
| `static` (Qdrant)    | 15ms  | 30ms  | 60ms  | Qdrant హోస్టింగ్పై ఆధారపడి ఉంటుంది |
| `cache` (హిట్)       | <1ms  | <1ms  | 2ms   | ఉచితం                              |

---

## వాస్తవ సంగ్రహణ నమూనాలు (v3.8.16+)

`extraction.ts` మాడ్యూల్ (`src/lib/memory/extraction.ts`) సంభాషణ సందేశాల నుండి నిర్మిత వాస్తవాలను సంగ్రహించడానికి **రెగ్యులర్ ఎక్స్ప్రెషన్ నమూనా సరిపోలికను** ఉపయోగిస్తుంది. ఈ నమూనాలను అర్థం చేసుకోవడం ద్వారా మీ వినియోగ సందర్భానికి అనుగుణంగా సంగ్రహణ నాణ్యతను సర్దుబాటు చేయవచ్చు.

### డిఫాల్ట్ నమూనా వర్గాలు

| వర్గం               | ఉదాహరణ నమూనా                                                                                      | సంగ్రహించేవి                       |
| ------------------- | ------------------------------------------------------------------------------------------------- | ---------------------------------- |
| PREFERENCE_PATTERNS | `"నేను <X>ని ఇష్టపడతాను"`, `"నాకు <X> నచ్చుతుంది"`, `"నేను <X>ని ద్వేషిస్తాను"`                   | వినియోగదారు ప్రాధాన్యతలు           |
| DECISION_PATTERNS   | `"నేను <X>ని ఉపయోగిస్తాను"`, `"నేను <X> చేయాలని నిర్ణయించుకున్నాను"`, `"నేను <X>ని ఎంచుకున్నాను"` | వినియోగదారు నిర్ణయాలు (సంఘటనాత్మక) |
| PATTERN_PATTERNS    | `"నేను సాధారణంగా <X>"`, `"నేను ఎల్లప్పుడూ <X>"`, `"నేను ఎప్పుడూ <X> చేయను"`                       | స్థిరమైన ప్రవర్తనా నమూనాలు         |

### ఉదాహరణ నమూనాలు (సరళీకరించినవి)

```ts
// src/lib/memory/extraction.ts నుండి
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

### ఏమి సంగ్రహించబడుతుంది

ఒక వినియోగదారు ఇలా చెప్పినప్పుడు:

> "నేను TypeScriptని ఇష్టపడతాను. ఈ ప్రాజెక్ట్ కోసం Postgresని ఉపయోగిస్తాను. push చేసే ముందు నేను ఎల్లప్పుడూ commit చేస్తాను. నాకు Python నచ్చదు."
> సంగ్రహణ 4 జ్ఞాపకాలను ఉత్పత్తి చేస్తుంది:
>
> | కీ                                   | వర్గం      | రకం      | కంటెంట్                      |
> | ------------------------------------ | ---------- | -------- | ---------------------------- |
> | `preference:typescript`              | preference | factual  | "TypeScript"                 |
> | `decision:postgres_for_this_project` | decision   | episodic | "ఈ ప్రాజెక్ట్ కోసం Postgres" |
> | `pattern:commit_before_pushing`      | pattern    | factual  | "push చేసే ముందు commit"     |
> | `preference:python`                  | preference | factual  | "Python"                     |

### సంగ్రహణ పరిమితులు

అదుపు లేని సంగ్రహణను నివారించడానికి, క్రింది పరిమితులు వర్తిస్తాయి:

| కనిష్ఠ కంటెంట్ పొడవు | 3 అక్షరాలు |
| గరిష్ఠ కంటెంట్ పొడవు | 500 అక్షరాలు |

### సంగ్రహణను ఎప్పుడు నిలిపివేయాలి

మెమరీ ప్రారంభించబడినప్పుడల్లా సంగ్రహణ స్వయంచాలకంగా అమలవుతుంది; సంగ్రహణ కోసం మాత్రమే ప్రత్యేక టాగుల్ లేదు. దాన్ని నిలిపివేయడానికి, `PUT /api/settings/memory` ద్వారా మెమరీని పూర్తిగా నిలిపివేయండి (`enabled: false`). క్రింది సందర్భాల్లో అలా చేయడాన్ని పరిగణించండి:

- మీకు అధిక సందేశ పరిమాణం ఉండి, సంగ్రహణ వ్యయం గణనీయంగా ఉన్నప్పుడు
- మీ సంభాషణలు ఎక్కువగా తాత్కాలికమైనవి (చాట్, డీబగ్గింగ్) అయి, దీర్ఘకాలిక విలువ లేనప్పుడు
- మీరు ఇప్పటికే అనుకూల ప్లగిన్ల ద్వారా సందర్భాన్ని సంగ్రహిస్తున్నప్పుడు

---

## హైబ్రిడ్ RRF సర్దుబాటు (v3.8.16+)

**Reciprocal Rank Fusion (RRF)** అల్గోరిథం FTS5 (కీవర్డ్) మరియు వెక్టర్ (అర్థసంబంధిత) ఫలితాలను కలుపుతుంది. దిగువ ర్యాంక్ ఫలితాలకు ఎంత బరువు ఇవ్వాలో `k` పరామితి నియంత్రిస్తుంది.

### సూత్రం

ప్రతి అభ్యర్థి జ్ఞాపకానికి, RRF స్కోర్ ఇలా ఉంటుంది:

```
RRF(d) = Σ  1 / (k + rank_i(d))
```

ఇక్కడ:

- `k` స్థిరాంకం (డిఫాల్ట్ 60)
- `rank_i(d)` అనేది i-వ రిట్రీవల్ సిస్టమ్లో (FTS, వెక్టర్) `d` డాక్యుమెంట్ ర్యాంక్
- అన్ని రిట్రీవల్ సిస్టమ్లపై మొత్తం లెక్కించబడుతుంది

### `k` ఫలితాలను ఎలా ప్రభావితం చేస్తుంది

| `k` విలువ             | ప్రభావం                                                                                  | ఉత్తమ వినియోగం                       |
| --------------------- | ---------------------------------------------------------------------------------------- | ------------------------------------ |
| `k=0`                 | స్వచ్ఛమైన ర్యాంక్ ఫ్యూజన్ (స్మూతింగ్ లేదు)                                               | సైద్ధాంతిక ప్రామాణిక ఆధారం           |
| `k=10-30`             | అగ్ర ఫలితాలకు అధిక బరువు ఇస్తుంది, దిగువ ర్యాంక్ సహకారం చాలా తక్కువగా ఉంటుంది            | అగ్ర-3 ఫలితాలు సాధారణంగా సరైనప్పుడు  |
| **`k=60`** (డిఫాల్ట్) | సమతుల్యం — అగ్ర-10 ఫలితాలన్నీ అర్థవంతంగా సహకరిస్తాయి                                     | సాధారణ-ప్రయోజన రిట్రీవల్             |
| `k=100+`              | మరింత సమతలం — అనేక సిస్టమ్లలో కనిపిస్తే దిగువ ర్యాంక్ ఫలితాలు కూడా ఆధిపత్యం చెలాయించగలవు | ఖచ్చితత్వం కంటే రీకాల్ కీలకమైనప్పుడు |

### ఆచరణలో `k`ని సర్దుబాటు చేయడం

```bash
# డిఫాల్ట్
MEMORY_RRF_K=60

# దూకుడైన ఖచ్చితత్వం (చిన్న మెమరీ, కొద్ది డాక్యుమెంట్లు)
MEMORY_RRF_K=20

# గరిష్ఠ రీకాల్ (పెద్ద మెమరీ, వైవిధ్యమైన క్వెరీలు)
MEMORY_RRF_K=120
```

**`k=20`తో ఉదాహరణ:**

- FTS ర్యాంక్ 1 → సహకారం `1/21 = 0.048`
- FTS ర్యాంక్ 10 → సహకారం `1/30 = 0.033`
- వెక్టర్ ర్యాంక్ 1 → సహకారం `0.048`
- సంయుక్త గరిష్ఠం: `0.096`

**`k=60`తో ఉదాహరణ:**

- FTS ర్యాంక్ 1 → సహకారం `1/61 = 0.016`
- FTS ర్యాంక్ 10 → సహకారం `1/70 = 0.014`
- వెక్టర్ ర్యాంక్ 1 → సహకారం `0.016`
- సంయుక్త గరిష్ఠం: `0.033`

అధిక `k`తో, అగ్ర-1 మరియు ర్యాంక్-10 మధ్య **సాపేక్ష వ్యత్యాసం** తక్కువగా ఉంటుంది, కాబట్టి అల్గోరిథం అగ్ర-ర్యాంక్ నమ్మకంపై కాకుండా **రిట్రీవల్ సిస్టమ్ల మధ్య ఏకాభిప్రాయంపై** ఎక్కువగా ఆధారపడుతుంది.

### `k`ని ఎప్పుడు మార్చాలి

| లక్షణం                                             | ప్రయత్నించాల్సింది                                                            |
| -------------------------------------------------- | ----------------------------------------------------------------------------- |
| అగ్ర ఫలితం ఎల్లప్పుడూ గెలుస్తుంది, కానీ అది తప్పు  | **తక్కువ** k (ఉదా., 20) — అగ్ర-ర్యాంక్ నమ్మకానికి ఎక్కువ ప్రాధాన్యం ఉంటుంది   |
| సరైన సమాధానం అగ్ర-5లో ఉంది కానీ అగ్ర-1లో లేదు      | **ఎక్కువ** k (ఉదా., 100) — సమతలమైన స్కోరింగ్ ఏకాభిప్రాయాన్ని ప్రోత్సహిస్తుంది |
| రీకాల్ ఎక్కువగా ఉంది కానీ ఖచ్చితత్వం తక్కువగా ఉంది | **తక్కువ** k — ర్యాంకింగ్ను మరింత పదును పెట్టండి                              |
| రీకాల్ తక్కువగా ఉంది (సంబంధిత డాక్యుమెంట్లు లేవు)  | **ఎక్కువ** k — దిగువ ర్యాంక్ డాక్యుమెంట్లకు అవకాశం ఇవ్వండి                    |

### RRF బరువు కేటాయింపు

రిసిప్రోకల్ ర్యాంక్ ఫ్యూజన్ అర్థసంబంధిత వెక్టర్ ర్యాంక్ మరియు పూర్తి-పాఠ్య శోధన ర్యాంక్ కోసం సమాన బరువులను ఉపయోగిస్తుంది:

```
RRF(d) = 1/(k + rank_vector) + 1/(k + rank_fts)
```

వ్యక్తిగత బరువులను సర్దుబాటు చేయడానికి ఎలాంటి ఎన్విరాన్మెంట్ వేరియబుల్లు లేవు (`MEMORY_RRF_VECTOR_WEIGHT`/`MEMORY_RRF_FTS_WEIGHT` ఉనికిలో లేవు).

---

## సారాంశీకరణ వ్యూహం (v3.8.16+)

`సారాంశీకరణ.ts` మాడ్యూల్ (`src/lib/memory/summarization.ts`) రీకాల్ సామర్థ్యాన్ని సంరక్షిస్తూ, సక్రియ సెట్ను చిన్నదిగా ఉంచడానికి పాత మెమరీలను సంక్షిప్తం చేస్తుంది.

### సారాంశీకరణ ఎప్పుడు ట్రిగ్గర్ అవుతుంది

| ట్రిగ్గర్                      | థ్రెషోల్డ్ (డిఫాల్ట్) |
| ------------------------------ | --------------------- |
| API ద్వారా మాన్యువల్ ట్రిగ్గర్ | వర్తించదు             |

### ఏమి సారాంశీకరించబడుతుంది

`సారాంశీకరణ.ts` నుండి రెండు ఎంట్రీ పాయింట్లు ఎగుమతి చేయబడతాయి:

- **`summarizeMemories(apiKeyId, sessionId?, maxTokens = 4000)`** — ఒక సెషన్కు సంబంధించిన
  మెమరీలను, టోకెన్ బడ్జెట్కు పరిమితమైన ఒకే సారాంశ టెక్స్ట్గా సంక్షిప్తం చేస్తుంది.
- **`summarizeMemoriesOlderThan(apiKeyId, days, dryRun)`** — API ఉపయోగించే వయస్సు-ఆధారిత
  సంక్షిప్తీకరణ: ఇది `days` కంటే పాత ప్రతి మెమరీని ఎంచుకుని, వాటి నుండి
  ఒక సంక్షిప్త సారాంశ మెమరీని రూపొందిస్తుంది, అలాగే (`dryRun` `false`గా ఉన్నప్పుడు)
  అసలైన వాటిని తొలగిస్తుంది. ఏదీ మార్చకుండా అభ్యర్థి సెట్ను మరియు మొత్తం టోకెన్ల సంఖ్యను
  ముందస్తుగా పరిశీలించడానికి `dryRun: true`ను పంపండి.

ట్యాగ్/కీ క్లస్టరింగ్ పాస్ లేదా ప్రతి మెమరీకి "కోర్ vs సారాంశీకరించదగినది" అనే స్కోరింగ్ లేదు —
ఎంపిక పూర్తిగా వయస్సు పరిమితిపై ఆధారపడి ఉంటుంది, అలాగే సారాంశ టెక్స్ట్ అనేది ప్రతి అభ్యర్థికి
రకం-ప్రిఫిక్స్తో కూడిన సంక్షిప్త పంక్తి.

### సారాంశీకరణను ట్రిగ్గర్ చేయడం

సారాంశీకరణ **మాన్యువల్ / ఆప్ట్-ఇన్** — `autoSummarize` సెట్టింగ్ డిఫాల్ట్గా
`false`గా ఉంటుంది, కాబట్టి ఏదీ స్వయంచాలకంగా సంక్షిప్తీకరించబడదు. API ద్వారా దీన్ని ట్రిగ్గర్ చేయండి:

```bash
curl -X POST http://localhost:20128/api/memory/summarize \
  -H "Authorization: Bearer $OMNIROUTE_KEY"
```

దీన్ని ఆఫ్లో ఉంచడానికి, `autoSummarize`ను దాని డిఫాల్ట్ విలువ (`false`) వద్దే ఉంచండి.

### సారాంశీకరణ నాణ్యత చిట్కాలు

- **ముందుగా `dryRun`తో ప్రివ్యూ చేయండి** — `summarizeMemoriesOlderThan(..., true)`
  అభ్యర్థుల జాబితాను మరియు మొత్తం టోకెన్ల సంఖ్యను అందిస్తుంది, తద్వారా అసలైన వాటిని తొలగించే
  ముందు ఏవి విలీనం చేయబడతాయో మీరు నిర్ధారించవచ్చు.
- **మీ వద్ద పెద్ద మెమరీ కార్పస్ ఉంటే, తక్కువ ట్రాఫిక్ ఉన్న సమయాల్లో సారాంశీకరణను అమలు చేయండి** — LLM కాల్ నెమ్మదిగా జరిగే భాగం

```bash
# Cron-శైలి: ప్రతిరోజూ ఉదయం 3 గంటలకు సారాంశీకరించండి
0 3 * * * curl -X POST http://localhost:20128/api/memory/summarize \
  -H "Authorization: Bearer $OMNIROUTE_KEY"
```

---

## MemoryBackend ప్రొవైడర్ నమూనా

> **ప్రామాణిక మూలం:** `src/lib/memory/backend.ts`, `src/lib/memory/genericBackend.ts`, `src/lib/memory/manager.ts`
> **పరీక్షలు:** `src/lib/memory/__tests__/generic-backend.test.ts`

MemoryBackend ప్రొవైడర్ నమూనా, ఇప్పటికే ఉన్న మెమరీ ఇంజిన్పై ఒక **ప్లగ్ చేయదగిన బ్యాకెండ్ అబ్స్ట్రాక్షన్ లేయర్ను** పరిచయం చేస్తుంది. ఒకే స్టోరేజ్ అమలుకు పరిమితం కాకుండా, మెమరీ సిస్టమ్ ఇప్పుడు కాన్ఫిగర్ చేయగల ప్రైమరీ/ఫాల్బ్యాక్ రూటింగ్తో బహుళ బ్యాకెండ్లకు (SQLite, Obsidian, Notion, కస్టమ్ HTTP బ్యాకెండ్లు) మద్దతు ఇస్తుంది.

### ఆర్కిటెక్చర్

```
┌──────────────────────────────────────────────────────────┐
│                    API రూట్లు                            │
│            (src/app/api/memory/route.ts)                  │
└──────────────────────┬───────────────────────────────────┘
                       │
┌──────────────────────▼───────────────────────────────────┐
│                   MemoryManager                           │
│           సింగిల్టన్ ఆర్కెస్ట్రేటర్ (manager.ts)          │
│                                                          │
│  ప్రైమరీ ──► బ్యాకెండ్ A  (ఉదా. SQLite)                  │
│  ఫాల్బ్యాక్ ─► బ్యాకెండ్ B  (ఉదా. Obsidian)             │
│             బ్యాకెండ్ C  (ఉదా. GenericBackend ద్వారా Notion)│
└──────────────────────┬───────────────────────────────────┘
                       │
        ┌──────────────┼──────────────┐
        ▼              ▼              ▼
┌────────────┐ ┌────────────┐ ┌──────────────────┐
│ SQLite     │ │ Obsidian   │ │ GenericMemory    │
│ బ్యాకెండ్   │ │ బ్యాకెండ్   │ │ బ్యాకెండ్ (HTTP) │
└────────────┘ └────────────┘ └──────────────────┘
```

#### ప్రధాన ఇంటర్ఫేస్ (`backend.ts`)

ప్రతి బ్యాకెండ్ తప్పనిసరిగా `MemoryBackend` ఇంటర్ఫేస్ను అమలు చేయాలి:

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

  // శోధన
  search(config: SearchConfig): Promise<Memory[]>;

  // ఆరోగ్య స్థితి
  health(): Promise<HealthCheckResult>;

  // జీవితచక్రం (ఐచ్ఛికం)
  initialize?(): Promise<void>;
  shutdown?(): Promise<void>;
}
```

#### MemoryManager (`manager.ts`)

కింది పనులు చేసే సింగిల్టన్ ఆర్కెస్ట్రేటర్:

- `register(backend)` ద్వారా బ్యాకెండ్లను **రిజిస్టర్ చేస్తుంది** — బూట్ సమయంలో `index.ts` నుండి కాల్ చేయబడుతుంది
- `configure(primary, fallbacks)` ద్వారా ప్రైమరీ + ఫాల్బ్యాక్ను **కాన్ఫిగర్ చేస్తుంది**
- వైఫల్యం సంభవించినప్పుడు ఫాల్బ్యాక్ చైన్తో, CRUD/శోధనను ప్రైమరీకి **రూట్ చేస్తుంది**
- అన్ని బ్యాకెండ్లపై క్రమానుగతంగా **ఆరోగ్య తనిఖీలు** నిర్వహిస్తుంది

**ఫాల్బ్యాక్ ప్రవర్తన:**

| ఆపరేషన్  | ప్రైమరీ                              | ఫాల్బ్యాక్లు                   |
| -------- | ------------------------------------ | ------------------------------ |
| `create` | ✅ ప్రైమరీ మాత్రమే                   | ❌                             |
| `get`    | ✅ ముందుగా ప్రైమరీని ప్రయత్నిస్తుంది | ✅ ఫలితం null అయితే ఫాల్బ్యాక్ |
| `update` | ✅ ప్రైమరీ మాత్రమే                   | ✅ ఫైర్-అండ్-ఫర్గెట్ సింక్     |
| `delete` | ✅ ప్రైమరీ మాత్రమే                   | ✅ ఫైర్-అండ్-ఫర్గెట్ సింక్     |
| `list`   | ✅ ప్రైమరీ మాత్రమే                   | ❌                             |
| `search` | ✅ ముందుగా ప్రైమరీ                   | ✅ ఎర్రర్ సంభవిస్తే ఫాల్బ్యాక్ |

#### GenericMemoryBackend (`genericBackend.ts`)

ఏదైనా REST APIని MemoryBackendగా అడాప్ట్ చేసే సాధారణ HTTP కనెక్టర్. కింది వాటికి ఉపయోగకరం:

- **Notion** — Notion API ద్వారా కనెక్ట్ చేయండి
- **Obsidian** — Obsidian Local REST API ద్వారా కనెక్ట్ చేయండి
- **కస్టమ్ బ్యాకెండ్లు** — RESTful మెమరీ APIని అందించే ఏదైనా సర్వీస్

**కాన్ఫిగరేషన్:**

```typescript
interface GenericBackendConfig {
  baseUrl: string;           // బ్యాకెండ్ API యొక్క బేస్ URL
  apiKey?: string;           // ప్రామాణీకరణ కోసం బేరర్ టోకెన్
  headers?: Record<string, string>;  // అనుకూల HTTP హెడర్లు
  timeout?: number;          // అభ్యర్థన సమయ పరిమితి (డిఫాల్ట్: 30000ms)
  backendType?: string;      // లాగింగ్ కోసం

  // ఎండ్పాయింట్ ఓవర్రైడ్లు (డిఫాల్ట్లు REST సంప్రదాయాలను ఉపయోగిస్తాయి)
  endpoints?: {
    search?: string;   // డిఫాల్ట్: "/memories/search"
    create?: string;   // డిఫాల్ట్: "/memories"
    list?: string;     // డిఫాల్ట్: "/memories"
    get?: string;      // డిఫాల్ట్: "/memories/{id}"
    update?: string;   // డిఫాల్ట్: "/memories/{id}"
    delete?: string;   // డిఫాల్ట్: "/memories/{id}"
    health?: string;   // డిఫాల్ట్: "/health"
  };

  // క్వెరీ పారామీటర్ పేరు మ్యాపింగ్లు
  queryParams?: {
    query?/apiKeyId?/limit?/offset?/strategy?/maxTokens?/type?/sessionId?/orderBy?/orderDir?/options?
  };

  // పాత్ పారామీటర్ పేరు మ్యాపింగ్లు
  pathParams?: {
    id?/memoryId?
  };
}
```

**తెలిసిన బ్యాకెండ్లు** `KNOWN_BACKENDS`లో ముందుగానే కాన్ఫిగర్ చేయబడ్డాయి:

```typescript
createKnownBackend("obsidian"); // → localhost:27123ను సూచించే GenericMemoryBackend
createKnownBackend("notion"); // → api.notion.com/v1ను సూచించే GenericMemoryBackend
```

#### అంతర్నిర్మిత బ్యాకెండ్లు

##### SQLiteBackend (`sqliteBackend.ts`)

డిఫాల్ట్ ప్రాథమిక బ్యాకెండ్. `src/lib/memory/store.ts`ను ఉపయోగించి ఇప్పటికే ఉన్న SQLite-ఆధారిత మెమరీ స్టోర్ను ర్యాప్ చేస్తుంది. బూట్ సమయంలో స్వయంచాలకంగా నమోదు చేయబడుతుంది.

```typescript
import { sqliteBackend } from "./sqliteBackend";
memoryManager.register(sqliteBackend);
```

##### ObsidianBackend (`obsidianBackend.ts`)

ఇప్పటికే ఉన్న Obsidian ఇంటిగ్రేషన్ను (`src/lib/memory/obsidianBackend.ts`) ర్యాప్ చేస్తుంది. Obsidian Local REST API ద్వారా Obsidian వాల్ట్కు కనెక్ట్ అవుతుంది.

### సెట్టింగ్లు

మెమరీ బ్యాకెండ్ సెట్టింగ్లు యాప్ సెట్టింగ్ల పట్టికలో నిల్వ చేయబడి, `src/lib/memory/settings.ts` ద్వారా నిర్వహించబడతాయి:

| సెట్టింగ్              | ఎన్విరాన్మెంట్/కాన్ఫిగ్ కీ | డిఫాల్ట్   | వివరణ                                            |
| ---------------------- | -------------------------- | ---------- | ------------------------------------------------ |
| ప్రాథమిక బ్యాకెండ్     | `memoryPrimaryBackend`     | `"sqlite"` | ప్రాథమిక బ్యాకెండ్ ID                            |
| ఫాల్బ్యాక్ బ్యాకెండ్లు | `memoryFallbackBackends`   | `[]`       | క్రమబద్ధీకరించిన ఫాల్బ్యాక్ బ్యాకెండ్ IDలు       |
| బ్యాకెండ్ కాన్ఫిగ్లు   | `memoryBackendConfigs`     | `{}`       | ఒక్కో బ్యాకెండ్కు సంబంధించిన కాన్ఫిగ్ ఓవర్రైడ్లు |

సెట్టింగ్లు `normalizeMemorySettings()` ద్వారా సాధారణీకరించబడి, `getMemorySettings()` వద్ద క్యాష్ చేయబడతాయి.

### ప్రారంభీకరణ ప్రవాహం

```
యాప్ బూట్స్ట్రాప్
  → index.ts దిగుమతులు (సైడ్-ఎఫెక్ట్): SQLiteBackendను నమోదు చేస్తాయి
  → యాప్ లైఫ్సైకిల్ నుండి initMemoryBackends() కాల్ చేయబడుతుంది:
      1. సెట్టింగ్లను లోడ్ చేయండి (getMemorySettings)
      2. ప్రాథమిక + ఫాల్బ్యాక్ను కాన్ఫిగర్ చేయండి
      3. అన్ని బ్యాకెండ్లను ప్రారంభించండి (ఆరోగ్య తనిఖీ)
      4. అభ్యర్థనల కోసం సిద్ధం
```

### కొత్త బ్యాకెండ్ను జోడించడం

1. `src/lib/memory/<name>Backend.ts`లో **`MemoryBackend`ను అమలు చేయండి**
2. `src/lib/memory/index.ts` నుండి **ఎగుమతి చేయండి**
3. బూట్ సమయంలో `memoryManager.register(yourBackend)`తో **నమోదు చేయండి**
4. సెట్టింగ్ల ద్వారా **కాన్ఫిగర్ చేయండి**: `memoryPrimaryBackend`ను మీ బ్యాకెండ్ IDకి సెట్ చేయండి
5. `src/lib/memory/__tests__/generic-backend.test.ts`ను సూచనగా ఉపయోగించి **పరీక్షించండి**

#### ఉదాహరణ: Brain బ్యాకెండ్

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

### ధృవీకరణ

#### యూనిట్ పరీక్షలు

```bash
npx vitest run src/lib/memory/__tests__/generic-backend.test.ts --reporter=verbose
```

ఆశించిన అవుట్పుట్: కింది వాటిని కవర్ చేస్తూ **35 పరీక్షలు, అన్నీ ఉత్తీర్ణం**:

- కన్స్ట్రక్టర్ (2)
- ఆరోగ్య తనిఖీ (4) — విజయం, వైఫల్యం 500, నెట్వర్క్ లోపం, లేటెన్సీ
- ప్రారంభీకరణ (2) — విజయం, వైఫల్యం
- సృష్టించడం (2) — డిఫాల్ట్ ఎండ్పాయింట్, అనుకూల ఎండ్పాయింట్
- పొందడం (4) — విజయం, 404 → null, 404 కానప్పుడు త్రో చేయడం, అనుకూల పాత్ పారామీటర్లు
- నవీకరించడం (2) — విజయం, 404 → false
- తొలగించడం (2) — విజయం, 404 → false
- జాబితా (2) — క్వెరీ పారామీటర్లు, అనుకూల పారామీటర్ పేర్లు
- శోధన (3) — క్వెరీ పారామీటర్లు, అనుకూల ఎండ్పాయింట్, ఆప్షన్ల సీరియలైజేషన్
- ప్రామాణీకరణ హెడర్లు (2) — బేరర్ టోకెన్, అనుకూల హెడర్లు
- ఫ్యాక్టరీ (1)

#### టైప్ తనిఖీ

```bash
npm run typecheck:core
```

ఆశించిన ఫలితం: **0 లోపాలు**.
