# Memory System (සිංහල)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/MEMORY.md) · 🇪🇹 [am](../../../am/docs/frameworks/MEMORY.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/MEMORY.md) · 🇦🇿 [az](../../../az/docs/frameworks/MEMORY.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/MEMORY.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/MEMORY.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/MEMORY.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/MEMORY.md) · 🇩🇰 [da](../../../da/docs/frameworks/MEMORY.md) · 🇩🇪 [de](../../../de/docs/frameworks/MEMORY.md) · 🇬🇷 [el](../../../el/docs/frameworks/MEMORY.md) · 🇪🇸 [es](../../../es/docs/frameworks/MEMORY.md) · 🇪🇪 [et](../../../et/docs/frameworks/MEMORY.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/MEMORY.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/MEMORY.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/MEMORY.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/MEMORY.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/MEMORY.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/MEMORY.md) · 🇮🇱 [he](../../../he/docs/frameworks/MEMORY.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/MEMORY.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/MEMORY.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/MEMORY.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/MEMORY.md) · 🇮🇩 [id](../../../id/docs/frameworks/MEMORY.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/MEMORY.md) · 🇮🇹 [it](../../../it/docs/frameworks/MEMORY.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/MEMORY.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/MEMORY.md) · 🇰🇭 [km](../../../km/docs/frameworks/MEMORY.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/MEMORY.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/MEMORY.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/MEMORY.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/MEMORY.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/MEMORY.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/MEMORY.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/MEMORY.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/MEMORY.md) · 🇲🇲 [my](../../../my/docs/frameworks/MEMORY.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/MEMORY.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/MEMORY.md) · 🇳🇴 [no](../../../no/docs/frameworks/MEMORY.md) · 🇮🇳 [or](../../../or/docs/frameworks/MEMORY.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/MEMORY.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/MEMORY.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/MEMORY.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/MEMORY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/MEMORY.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/MEMORY.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/MEMORY.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/MEMORY.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/MEMORY.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/MEMORY.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/MEMORY.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/MEMORY.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/MEMORY.md) · 🇮🇳 [te](../../../te/docs/frameworks/MEMORY.md) · 🇹🇭 [th](../../../th/docs/frameworks/MEMORY.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/MEMORY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/MEMORY.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/MEMORY.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/MEMORY.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/MEMORY.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/MEMORY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/MEMORY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/MEMORY.md)

---

> **සත්යයේ මූලාශ්රය:** `src/lib/memory/` සහ `src/app/api/memory/`
> **අවසන් වරට යාවත්කාලීන කළේ:** 2026-06-28 — v3.8.40 (පෙරනිමියෙන් අක්රිය + int8 quantization පසුගාමී සැකසුම)

OmniRoute විසින් API key එක අනුව (සහ විකල්ප ලෙස session id එක අනුව) හඳුනාගන්නා ස්ථිර සංවාද මතකයක් සපයයි. සැහැල්ලු regex රටා ගැළපීම මඟින් LLM ප්රතිචාරවලින් මතකයන් ස්වයංක්රීයව උකහාගෙන, පසුව සිදු කරන ඉල්ලීම්වලට ආරම්භක system පණිවිඩයක් ලෙස (හෝ system role එක ප්රතික්ෂේප කරන providers සඳහා පළමු user පණිවිඩය ලෙස) ඒවා නැවත ඇතුළත් කරයි.

> **පෙරනිමියෙන් මතකය අක්රියයි (v3.8.30+).** `DEFAULT_MEMORY_SETTINGS.enabled`
> දැන් `false` වේ (`src/lib/memory/settings.ts`). මතකය සක්රිය කිරීමෙන් නැවත ලබාගත් සන්දර්භයෙන්
> `maxTokens` දක්වා (~2k) **සෑම** chat ඉල්ලීමකටම ඇතුළත් වන අතර, ඒ සඳහා
> ගාස්තු අය කෙරේ — නව ස්ථාපනයන්ට සහ තමන්ගේම සන්දර්භය කළමනාකරණය කරන clients සඳහා
> මෙය අනපේක්ෂිත පිරිවැයක් විය හැක. **Settings → Memory** යටතේ පැහැදිලිවම සක්රිය වීමට තෝරන්න
> (මතකය සක්රිය කළ විට `MemorySkillsTab` මඟින් token පිරිවැය පිළිබඳ අනතුරු ඇඟවීමක් පෙන්වයි).
> client එකකට `x-omniroute-no-memory`
> ඉල්ලීම් header එක (`true`/`1`/`yes`) භාවිතයෙන් තනි ඉල්ලීමක් සඳහා මෙය අක්රිය කළ හැක —
> [API_REFERENCE.md](../reference/API_REFERENCE.md) හි ඉල්ලීම්-header වගුව බලන්න. මතකය භාවිත නොකරන ඉල්ලීමක්
> `memoryOwnerId = null` ලෙස සකසන අතර, එම ඉල්ලීම සඳහා මතකය සහ skill ඇතුළත් කිරීම යන
> **දෙකම** අක්රිය කරයි (`open-sse/handlers/chatCore/headers.ts::isNoMemoryRequested`).

මතකය user අනුව නොව, **API key එකකට වෙන වෙනම සීමා කර ඇත** — එකම API key එකෙන් සත්යාපනය කරන සෑම ඉල්ලීමක්ම එකම මතක සංචිතය බෙදාගන්නා අතර, `sessionId` මඟින් විකල්ප අමතර සීමා කිරීමක්ද කළ හැක.

## ගෘහනිර්මාණය

```
Client → /v1/chat/completions (apiKeyInfo ඉහළ මට්ටමේදී විසඳා ඇත)
  → handleChatCore() [open-sse/handlers/chatCore.ts]
    → resolveMemoryOwnerId(apiKeyInfo)        # id එක උකහා ගනී
    → getMemorySettings()                     # cache කළ සැකසුම්
    → shouldInjectMemory(body, {enabled})     # පාලන දොරටුව
    → retrieveMemories(apiKeyId, config)      # SQL + FTS5 + විකල්ප vector
    → injectMemory(body, memories, provider)  # system හෝ user පණිවිඩය
  → upstream provider ඇමතුම
  → ප්රතිචාරයේදී: extractFacts(text, apiKeyId, sessionId)  # අවහිර නොකරයි
    → setImmediate → සෑම ගැළපීමක් සඳහාම createMemory(fact)
                   → embed(content) + upsertVector(id, vec)
```

ඇතුළත් කිරීමේ සහ උකහා ගැනීමේ call-sites
`open-sse/handlers/chatCore.ts` තුළ සම්බන්ධ කර ඇත (`retrieveMemories`, `injectMemory`,
සහ `extractFacts` සොයන්න).

## Engine ගෘහනිර්මාණය (3-tier විසඳීම)

පවතින යටිතල පහසුකම් සහ සැකසුම් මත පදනම්ව Memory Engine එක runtime අවස්ථාවේදී නැවත ලබාගැනීමේ මාර්ගය තීරණය කරයි. ප්රමුඛතා අනුපිළිවෙළට යොදන tiers තුනක් පවතී:

```
  ┌─────────────────────────────────────────────────────────────┐
  │  TIER 0 — මූලපද (FTS5)                                      │
  │  පරීක්ෂණය මත තීරණය වන ලබාගත හැකි බව: SQLite build එක       │
  │  එයට සහය දක්වන විට FTS5 (better-sqlite3 / node:sqlite /     │
  │  bun:sqlite); FTS5 නොමැති builds මත ලබාගත නොහැක             │
  │  (උදා. sql.js/WASM — "no such module: fts5").                │
  │  strategy = "exact" විට හෝ fallback එකක් ලෙස භාවිත වේ;      │
  │  engine-status keyword එක පරීක්ෂණයේ ප්රතිඵලය පිළිබිඹු කරයි. │
  └──────────────────────────────────┬──────────────────────────┘
                                     │ strategy = semantic|hybrid?
                                     ▼
  ┌─────────────────────────────────────────────────────────────┐
  │  TIER 1 — Embedded Vector (sqlite-vec)                       │
  │  sqlite-vec v0.1.9, db.loadExtension() හරහා load කෙරේ.       │
  │  Float32 vectors මත KNN brute-force සෙවීම. පහත අවස්ථාවලදී   │
  │  සක්රිය වේ:                                                 │
  │   • sqlite-vec loadExtension සාර්ථක වේ                        │
  │   • Float32Array එකක් නිපදවිය හැකි embedding මූලාශ්රයක්     │
  │     (remote | static | transformers) ලබාගත හැක               │
  │   • vec_memories වගුව පවතී (පළමු ready() එකේදී සෑදේ)        │
  └──────────────────────────────────┬──────────────────────────┘
                                     │ qdrant.enabled?
                                     ▼
  ┌─────────────────────────────────────────────────────────────┐
  │  TIER 2 — Qdrant (විකල්ප බාහිර vector database එක)           │
  │  සක්රිය කළ විට semantic/hybrid සඳහා sqlite-vec ප්රතිස්ථාපනය │
  │  කරයි. ක්රියාත්මක Qdrant instance එකක් සහ වින්යාස කළ       │
  │  host/port අවශ්ය වේ.                                        │
  └─────────────────────────────────────────────────────────────┘
```

පහළ මට්ටමකට මාරුවීම ස්වයංක්රීය සහ පාරදෘශ්ය වේ:

- sqlite-vec load වීමට අසමත් වුවහොත්, tier 1 ලබාගත නොහැක → tier 0 වෙත fallback වේ.
- embedding මූලාශ්රය error එකක් ලබාදුනහොත්, tier 1, tier 0 වෙත fallback වේ.
- Qdrant සෞඛ්ය සම්පන්න නොවේ නම්, tier 2, tier 1 වෙත fallback වේ (හෝ tier 1 ද
  ලබාගත නොහැකි නම් tier 0 වෙත).

## එම්බෙඩිං මූලාශ්ර

එම්බෙඩිං ස්තරය (`src/lib/memory/embedding/`) භාවිත කළ යුතු මූලාශ්රය
`MemorySettingsExtended.embeddingSource` මත පදනම්ව තීරණය කරයි:

| මූලාශ්රය       | විස්තරය                                                                    | යතුරක් අවශ්යද | ආරම්භක ප්රමාදය   |
| -------------- | -------------------------------------------------------------------------- | ------------- | ---------------- |
| `remote`       | වින්යාස කළ සැපයුම්කරුවෙකුගේ එම්බෙඩිං API භාවිත කරයි (OpenAI, Cohere, ආදිය) | ඔව්           | නැත              |
| `static`       | `potion-base-8M` හරහා දේශීය සෙවුම්-වගු එම්බෙඩිං (WordPiece + මධ්ය පූලිං)   | නැත           | ~200ms           |
| `transformers` | `@huggingface/transformers` v4, `all-MiniLM-L6-v2` හරහා දේශීය ONNX අනුමානය | නැත           | ~3s + ~400MB RAM |
| `auto`         | ධාවන වේලාවේ තේරීම: remote (යතුරක් ඇත්නම්) → static → transformers → null   | තත්ත්වය අනුව  | තත්ත්වය අනුව     |

**`auto` සඳහා තේරීම් අනුපිළිවෙළ:**

1. `listEmbeddingProviders()` තුළ `hasKey === true` වන පළමු සැපයුම්කරු සොයන්න → `remote`.
2. `settings.staticEnabled === true` නම් → `static`.
3. `settings.transformersEnabled === true` නම් → `transformers`.
4. එසේ නොමැති නම් → `null` (FTS5 මූලපද සෙවුමට පසුබසී).

එම්බෙඩිං හැඹිලිය (`src/lib/memory/embedding/cache.ts`) `${source}:${model}:${dim}:${sha256(text)}`
මඟින් යතුරුගත කළ මතකය තුළ පවතින LRU සිතියමක් භාවිත කරයි. එය
`MEMORY_EMBEDDING_CACHE_MAX` ඇතුළත් කිරීම් ගණනකට (පෙරනිමිය 1000) සීමා වන අතර,
`MEMORY_EMBEDDING_CACHE_TTL_MS` TTL එකක් (පෙරනිමිය මිනිත්තු 5) ඇත. එක් එක් ක්රියාවලි
ජීවන චක්රය තුළ සියලු කැඳවුම්කරුවන් අතර මෙය බෙදා ගැනේ.

## දෙමුහුන් RRF (k=60)

`strategy = "hybrid"` වන විට සහ දෛශික ගබඩාව ලබා ගත හැකි විට, ප්රතිඵල ලබාගැනීම
FTS5 සහ දෛශික ප්රතිඵල ඒකාබද්ධ කිරීම සඳහා Reciprocal Rank Fusion භාවිත කරයි:

```
RRF(d) = Σ  1 / (k + rank_i(d))      මෙහි k = 60 (MEMORY_RRF_K හරහා වින්යාස කළ හැක)
          i
```

නිශ්චිතව:

1. FTS5 සෙවුම ක්රියාත්මක කරන්න → ශ්රේණිගත කළ `R_fts` ලැයිස්තුව (ස්ථාන 1..N).
2. KNN දෛශික සෙවුම ක්රියාත්මක කරන්න → ශ්රේණිගත කළ `R_vec` ලැයිස්තුව (ස්ථාන 1..M).
3. සෑම අනන්ය `memoryId` එකක් සඳහාම:  
   `rrf_score = 1/(60 + fts_rank)` + `1/(60 + vec_rank)` (ලැයිස්තුවේ නොමැති නම් 0).
4. `rrf_score` අනුව අවරෝහණ පිළිවෙළට සකසා, ටෝකන් අයවැය පියමන යොදන්න.

විෂමජාතීය ප්රතිඵල ලබාගැනීමේ පද්ධති අතර ලකුණු සාමාන්යකරණය අවශ්ය නොවී
ඵලදායී වීම සඳහා RRF ප්රසිද්ධය. පෙරනිමි `k=60` අගය මුල් Cormack et al.
පර්යේෂණ පත්රයෙන් ගත් අතර කුඩා දත්ත එකතු (<10k මතක) සඳහා හොඳින් ක්රියා කරයි.

## පසුපිරවීම (අලස + නැවත සුචිගත කිරීම)

එම්බෙඩිං ආකෘතිය වෙනස් වන විට (`embedding_signature` හරහා අනාවරණය කරයි),
දෛශික ගබඩාව නැවත ගොඩනඟන අතර පවතින සියලු මතක `memories` වගුව තුළ
`needs_reindex = 1` ලෙස සලකුණු කෙරේ.

**අලස පසුපිරවීම**: ඊළඟ ප්රතිඵල ලබාගැනීමේදී, දෛශික ඇතුළත් කිරීමක් නොමැති ඕනෑම
මතකයක් සෙවුම ක්රියාත්මක වීමට පෙර එම්බෙඩ් කර `vec_memories` වෙත ඇතුළත් කෙරේ.
මෙය ආරම්භය අවහිර නොකර සැබෑ ඉල්ලීම් අතර පසුපිරවීමේ පිරිවැය ක්රමයෙන් බෙදාහරියි.

**පැහැදිලි නැවත සුචිගත කිරීම**: `/dashboard/memory` තුළ ඇති Engine පටිත්ත
`POST /api/memory/reindex` කැඳවන "දැන් නැවත සුචිගත කරන්න" බොත්තමක් සපයයි.
හැසිරවුම්කරු `src/lib/memory/reindex.ts` වෙතින් `runReindexBatch()` කැඳවයි;
එය එක් ඉල්ලීමකට පොරොත්තුවෙන් ඇති ඇතුළත් කිරීම් `limit` දක්වා සකසයි.
`GET /api/memory/engine-status` (`vectorStore.needsReindex`) හරහා ප්රගතිය
නිරීක්ෂණය කළ හැක.

`memory_vec_meta` වගුව (සංක්රමණය `083_memory_vec.sql`) පහත දෑ ගබඩා කරයි:

- `active_dim` — වත්මන් දෛශික මානය (null = තවම ක්රමාංකනය කර නැත).
- `embedding_signature` — වෙනස්කම් අනාවරණය කිරීමට භාවිත කරන `${source}:${model}:${dim}`.
- `last_reset_at` — අවසන් පූර්ණ යළි සැකසීමේ වේලා මුද්රාව.
- `vec_loaded` — sqlite-vec සාර්ථකව පූරණය වූයේද යන්න දක්වන 0/1 ධජය.

## සැකසුම් දිගුව

`src/shared/schemas/memory.ts` තුළ ඇති `MemorySettingsExtended` හි embedding සහ vector ක්ෂේත්ර නවයක් පවතින අතර, ඒවා `src/lib/db/settings.ts` හරහා සුරැකේ:

| ක්ෂේත්රය                 | වර්ගය                                              | පෙරනිමිය | විස්තරය                                                                   |
| ------------------------ | -------------------------------------------------- | -------- | ------------------------------------------------------------------------- |
| `embeddingSource`        | `"remote" \| "static" \| "transformers" \| "auto"` | `"auto"` | භාවිත කළ යුතු embedding මූලාශ්රය                                          |
| `embeddingProviderModel` | `string \| null`                                   | `null`   | `provider/model` ආකෘතියේ සැපයුම්කරු/මාදිලිය                               |
| `customBaseUrl`          | `string \| null`                                   | `null`   | Memory සඳහා පමණක් වන OpenAI-අනුකූල endpoint මූලික URL එක                  |
| `customModelId`          | `string \| null`                                   | `null`   | අභිරුචි endpoint එකට යවන මාදිලි ID එක                                     |
| `transformersEnabled`    | `boolean`                                          | `false`  | Transformers.js සඳහා කැමැත්ත පළ කිරීම (MiniLM, ~400MB)                    |
| `staticEnabled`          | `boolean`                                          | `false`  | ස්ථිතික potion-base-8M දේශීය මාදිලිය සඳහා කැමැත්ත පළ කිරීම                |
| `rerankEnabled`          | `boolean`                                          | `false`  | නැවත ශ්රේණිගත කිරීමේ පියවර සක්රීය කරන්න (එක් ඉල්ලීමකට +200-500ms එකතු වේ) |
| `rerankProviderModel`    | `string \| null`                                   | `null`   | `provider/model` ආකෘතියේ නැවත ශ්රේණිගත කිරීමේ සැපයුම්කරු/මාදිලිය          |

`rerankProviderModel` විසඳනු ලබන්නේ `POST /v1/rerank` මඟින්ය (loopback හරහා කැඳවනු ලැබේ), එබැවින් එම route එක පිළිගන්නා ඕනෑම දෙයක් එය පිළිගනී: තෝරාගත් cloud නැවත ශ්රේණිගත කිරීමේ මාදිලියක් (`cohere/rerank-v3.5`, `jina-ai/jina-reranker-v3.5`, …) හෝ `<node-prefix>/<model>` ආකාරයේ OpenAI-අනුකූල සැපයුම්කරු node එකක් (උදා. TEI/Infinity box එකක් සඳහා `skilled-mini/bge-reranker-v2-m3`). Loopback nodes සැමවිටම සුදුසුකම් ලබයි; වෙනත් host එකක (LAN, Tailscale) ඇති node එකකට අමතරව `RERANK_REMOTE_PROVIDER_NODES` feature flag එක අවශ්ය වන අතර, එය සැපයුම්කරුගේ outbound URL ප්රතිපත්තිය සමත් විය යුතුය — [Feature Flags](../reference/FEATURE_FLAGS.md) බලන්න. Dashboard selector එක තෝරාගත් සැපයුම්කරුවන් සහ දේශීය nodes ලැයිස්තුගත කරයි; වලංගු ඕනෑම `provider/model` string එකක් `PUT /api/settings/memory` හරහා සෘජුවම සැකසිය හැක.
| `vectorStore` | `"sqlite-vec" \| "qdrant" \| "auto"` | `"auto"` | භාවිත කළ යුතු vector backend එක |

මේවා `GET /PUT /api/settings/memory` හරහා නිරාවරණය කර ඇත (schema එක `MemorySettingsExtendedSchema`).

`remote` මූලාශ්රය සඳහා, Memory විසින් විකල්ප `customBaseUrl` සහ
`customModelId` සැකසුම් ද පිළිගනී. ගෝලීය embedding registry එක වෙනස් නොකර,
මේවා එක්ව OpenAI-අනුකූල `/embeddings` endpoint එකක් සහ මාදිලියක් තෝරයි. භාවිතයට
පෙර endpoint එක normalized කර සැපයුම්කරුගේ outbound URL ප්රතිපත්තිය මඟින් පරීක්ෂා
කරනු ලැබේ: HTTP(S) අවශ්යය, කාවැද්දූ credentials සහ query strings ප්රතික්ෂේප කරනු
ලබන අතර cloud-metadata ලිපින තවදුරටත් අවහිර කර ඇත. හිස් අගයන් තෝරාගත් registry
සැපයුම්කරු රඳවා ගනී. Dashboard එකට ආපසු යවන දෝෂ sanitize කරනු ලබන අතර endpoint
credentials කිසිවිටෙකත් log නොකෙරේ.

> **TODO (D20):** `global` scope එක (සියලු API keys හරහා memories බෙදාගැනීම) මෙම
> නිකුතුවේ ක්රියාත්මක කර නොමැත. ඒ සඳහා schema වෙනස්කම් සහ ගෝලීය retrieval
> path එකක් අවශ්ය වේ. වෙනම නිරීක්ෂණය කරන්න.

## ගබඩා ස්තර

### ප්රාථමික: SQLite (`memories` වගුව)

`015_create_memories.sql` migration එක මඟින් සාදනු ලැබේ:

| තීරුව                       | වර්ගය              | සටහන්                                                                            |
| --------------------------- | ------------------ | -------------------------------------------------------------------------------- |
| `id`                        | `TEXT PRIMARY KEY` | `crypto.randomUUID()` හරහා ජනනය කරන UUID එක                                      |
| `api_key_id`                | `TEXT NOT NULL`    | හිමිකාර API key එක                                                               |
| `session_id`                | `TEXT`             | එක් එක් සංවාදයට අදාළ විකල්ප විෂය පථය                                             |
| `type`                      | `TEXT NOT NULL`    | `factual`, `episodic`, `procedural`, `semantic` අතරින් එකක්                      |
| `key`                       | `TEXT`             | ස්ථාවර upsert key එක, උදා. `preference:i_prefer_python`                          |
| `content`                   | `TEXT NOT NULL`    | සත්ය කරුණු පෙළ                                                                   |
| `metadata`                  | `TEXT`             | JSON blob එක (category, extractedAt, source, ...)                                |
| `created_at` / `updated_at` | `TEXT`             | ISO 8601 string                                                                  |
| `expires_at`                | `TEXT`             | විකල්ප කල් ඉකුත්වීම; `NULL` යනු ස්ථිර බවයි                                       |
| `memory_id`                 | `INTEGER UNIQUE`   | UUID ↔ FTS5 rowid සම්බන්ධ කිරීමට `023_fix_memory_fts_uuid.sql` මඟින් එක් කරන ලදී |

Indexes: `api_key_id`, `session_id`, `type`, `expires_at`, සහ unique
`memory_id` index එක.

**Upsert අර්ථවිද්යාව**: `createMemory()` එකම
`(api_key_id, key)` සහිත පවතින row එකක් සොයා, හමු වූ විට එය තිබෙන තැනම යාවත්කාලීන කරයි (`metadata` shallow spread එකක් හරහා
ඒකාබද්ධ කරමින්). මෙය නැවත නැවත එන
අභිරුචි ප්රකාශ නිසා වගුව සීමාවකින් තොරව වර්ධනය වීම වළක්වයි.

### පූර්ණ-පෙළ සෙවීම (`memory_fts` virtual වගුව)

`022_add_memory_fts5.sql` මඟින් `content` සහ
`key` මත FTS5 virtual වගුවක් සාදයි. UUID
primary key එක FTS5 හි integer rowid සමඟ join නොවූ සැබෑ භාවිතයේ දෝෂයක් `023_fix_memory_fts_uuid.sql` විසින් නිවැරදි කරයි — migration එක
`memory_id` තීරුව එක් කර, FTS වගුව නැවත සාදා, INSERT, DELETE, සහ UPDATE වලදී FTS සමමුහුර්තව තබන
trigger (`memory_fts_ai`, `memory_fts_ad`, `memory_fts_au`) සම්බන්ධ කරයි.

`semantic` සහ `hybrid` උපායමාර්ග සඳහා `retrieval.ts` විසින් භාවිත කෙරේ (පහත බලන්න).
Retrieval කේතය `hasTable("memory_fts")` මඟින් ආරක්ෂිත පරීක්ෂාවක් සිදු කරන අතර FTS වගුව නොමැති නම් හෝ FTS query එක දෝෂයක් නිකුත් කළහොත්
කාලානුක්රමික අනුපිළිවෙළට fallback කරයි.

### විකල්ප: Qdrant (vector store tier 2)

`src/lib/memory/qdrant.ts` විසින් tier 2
vector store එකක් ලෙස විකල්ප Qdrant ඒකාබද්ධ කිරීමක් ක්රියාත්මක කරයි. Engine selector එකේ
`memoryVectorStore === "qdrant"` වූ විට පමණක් retrieval එක Qdrant වෙත යොමු කෙරේ — පෙරනිමි `"auto"` (සහ `"sqlite-vec"`)
**කිසිවිටෙකත්** Qdrant තෝරා නොගනී. Engine-tab toggle එක `qdrantEnabled` සහ
`memoryVectorStore` දෙකම එක්ව සකසයි: සක්රිය කිරීමෙන් Qdrant ප්රාථමික store එක බවට පත් වන අතර, අක්රිය කිරීමෙන්
එය `"auto"` වෙත යළි සකසයි (#5597 — එම නිවැරදි කිරීමකට පෙර, engine selector එකට කිසිවක්
ලියා නොතිබූ බැවින් සක්රිය කිරීම අක්රියව පැවතුණි). Qdrant වෙත ළඟා විය නොහැකි නම් හෝ එය කිසිවක් ආපසු ලබා නොදුනහොත්, retrieval එක
sqlite-vec → FTS5 වෙත fallback කරයි.

- `upsertSemanticMemoryPoint()` — වින්යාස කළ embedding model එක භාවිතයෙන් `key + content` embed කරයි, collection එක පවතින බව තහවුරු කරයි (පළමු භාවිතයේදී cosine-distance vectors සාදයි), සහ `{memoryId,
apiKeyId, sessionId, key, content, metadata, createdAtUnix, expiresAtUnix}` payload එක සහිත point එකක් upsert කරයි.
- `searchSemanticMemory(query, topK, scope)` — query එක embed කර, `kind = "omniroute_memory"` අනුවත්, අවශ්ය නම්
  `apiKeyId` / `sessionId` අනුවත් පෙරහන් කළ collection එක සොයයි. `topK` අගය `[1, 20]` පරාසයට සීමා කරයි.
- `deleteSemanticMemoryPoint(id)` — තනි point එකක් මකයි. SQLite row එක ඉවත් කිරීමෙන් පසු
  `deleteMemory()` මඟින් මෙය කැඳවනු ලැබේ (D15).
- `cleanupSemanticMemoryPoints({retentionDays})` — `expiresAtUnix` අතීතයේ ඇති හෝ
  `createdAtUnix` retention cutoff එකට වඩා පැරණි points තොග වශයෙන් මකයි.
  dashboard එකට සත්ය සංඛ්යා පෙන්විය හැකි වන පරිදි පළමුව ඒවා ගණන් කරයි.
- `checkQdrantHealth()` — latency සමඟ `GET /readyz` health probe එකක් සිදු කරයි.

settings UI එක `/dashboard/memory` හි **Engine ටැබය** තුළ Qdrant වින්යාසය, health check එක, semantic search පරීක්ෂණය,
සහ cleanup පහසුකම සපයයි. `src/app/api/settings/qdrant/` යටතේ ඇති අදාළ
routes සියල්ල v3.8.6 වන විට සම්බන්ධ කර ඇත:

| Route                                   | ක්රමය         | විස්තරය                                   |
| --------------------------------------- | ------------- | ----------------------------------------- |
| `/api/settings/qdrant`                  | `GET` / `PUT` | Qdrant settings කියවීම / යාවත්කාලීන කිරීම |
| `/api/settings/qdrant/health`           | `GET`         | Liveness probe එක + latency               |
| `/api/settings/qdrant/search`           | `POST`        | Semantic search පරීක්ෂණය                  |
| `/api/settings/qdrant/cleanup`          | `POST`        | කල් ඉකුත් වූ / පැරණි points ඉවත් කිරීම    |
| `/api/settings/qdrant/embedding-models` | `GET`         | පවතින embedding models ලැයිස්තුගත කිරීම   |

**හැසිරීම පිළිබඳ සටහන් (අපේක්ෂා කළ යුතු දේ):**

- **Engine තේරීම** — Engine ටැබය තුළ Qdrant සක්රීය කිරීමෙන් එය ප්රධාන
  store එක බවට පත් වේ (`memoryVectorStore="qdrant"` ලෙස සකසයි); අක්රීය කිරීමෙන් `"auto"` වෙත යළි සකසයි (#5597).
- **පසුකාලීන පිරවීමක් නැත** — Qdrant සක්රීය කිරීමෙන් **පසු** සාදන/යාවත්කාලීන කරන memories පමණක්
  එයට ලියනු ලැබේ (fire-and-forget dual-write). පෙර සිට පැවති SQLite memories
  migrate **නොකෙරේ**; "Reindex Now" මඟින් යළි ගොඩනඟන්නේ sqlite-vec index එක පමණක් වන අතර Qdrant නොවේ.
- **Vector dimension එක ස්වයංක්රීයව හඳුනාගැනේ** — පළමු භාවිතයේදී සැබෑ embedding එකෙන් එය හඳුනාගනී;
  පිරවීමට dimension field එකක් නොමැත. Collection එකක් පවතින විට embedding model එක
  වෙනස් කිරීම ස්වයංක්රීයව **හසුරුවනු නොලැබේ**: පවතින collection එක වෙනස් නොකර තබන අතර, dimension-
  mismatched writes/searches අසාර්ථක වී sqlite-vec වෙත fallback වේ. Embedder එක මාරු කිරීමට collection එක
  නැවත සාදන්න (නව නමක් භාවිතයෙන් හෝ Qdrant තුළ එය මකා දැමීමෙන්).
- **Distance metric** — සැමවිටම **Cosine** වේ (collection නිර්මාණයේදී hardcode කර ඇත;
  වින්යාස කළ නොහැක).
- **Auth** — API key එක පමණි (`api-key` header එක ලෙස යවයි; authentication නොමැති
  local Docker සඳහා එය විකල්පයකි). JWT/RBAC භාවිත නොකෙරේ.
- **Config fields** — UI එක `host`, `port`, `collection`, `embeddingModel`,
  `apiKey` පෙන්වයි. `vectorSize` / `hnswEfConstruct` ලබාගත හැක්කේ env/DB හරහා පමණක් වන අතර collection නිර්මාණයට `vectorSize`
  භාවිත නොකෙරේ (dimension එක embedding එකෙන් ලැබේ).

### Vector quantization (int8 — විකල්පයෙන් සක්රීය කළ හැකි, backends දෙකටම)

Vector backends දෙකම, ගබඩා කළ vectors සඳහා වැය වන memory ප්රමාණය
කුඩා recall අලාභයක් සමඟ අඩු කිරීමට (~Float32 ට වඩා 4× කුඩා) **විකල්පයෙන් සක්රීය කළ හැකි int8 quantization** සඳහා සහාය දක්වයි.
දෙකෙහිම පෙරනිමියෙන් එය **අක්රීයයි** — පැහැදිලිව සක්රීය නොකළහොත් vectors පූර්ණ නිරවද්යතාවයෙන්ම පවතී.

| Backend    | Setting                         | Type                           | පෙරනිමිය | කියවන ස්ථානය                                                |
| ---------- | ------------------------------- | ------------------------------ | -------- | ----------------------------------------------------------- |
| Qdrant     | `qdrantQuantization` (DB key)   | `"none" \| "int8" \| "binary"` | `"none"` | `src/lib/memory/qdrant.ts::normalizeQdrantConfig()`         |
| sqlite-vec | `MEMORY_VEC_QUANTIZATION` (env) | `"none" \| "int8"`             | `"none"` | `src/lib/memory/vectorStore.ts::requestedVecQuantization()` |

- **Qdrant** සෑම instance එකක් සඳහාම `qdrantQuantization` setting
  key එක හරහා වින්යාස කරයි (`PUT /api/settings/qdrant` හි `quantization` field එක ලෙස පෙන්වයි). එය
  `"int8"` වූ විට, `buildQuantizationConfig()` scalar quantization
  (`always_ram`, quantile `0.99`) ඉල්ලා සිටින අතර, පූර්ණ නිරවද්යතාවයේ vectors මඟින් int8 candidate set එක
  තවදුරටත් පිරිපහදු කිරීමට searches විසින් `rescore: true` සක්රීය කරයි.
- **sqlite-vec** quantization එක **environment හරහා පමණක්** වින්යාස කළ හැකිය (DB setting එකක් නොවේ): local vectors
  `vec_quantize_int8(?, 'unit')` හරහා `int8[dim]` column එකක් ලෙස ගබඩා කිරීමට
  `MEMORY_VEC_QUANTIZATION=int8` සකසන්න. තෝරාගත් mode එක `embedding_signature` තුළට
  (`:int8` suffix එකක් ලෙස) ඇතුළත් වන බැවින්, modes මාරු කිරීම `vec_memories` table එකේ සම්පූර්ණ
  reindex එකක් අවුලුවයි — embedding model එක වෙනස් වන විට භාවිත වන lazy-backfill මාර්ගයම මෙහිදීත් භාවිත වේ.

## මතක වර්ග

`MemoryType` (`src/lib/memory/types.ts`):

| වර්ගය        | භාවිත කරන්නේ                                                                              |
| ------------ | ----------------------------------------------------------------------------------------- |
| `factual`    | අභිරුචි, ස්ථාවර පරිශීලක කරුණු, හැසිරීම් රටා                                               |
| `episodic`   | නිශ්චිත මොහොතකට සම්බන්ධ තීරණ ("I chose Postgres")                                         |
| `procedural` | කාර්ය ප්රවාහ / සිදු කරන ආකාරය පිළිබඳ මතකය (වෙන් කර ඇත; දැනට ස්වයංක්රීය නිස්සාරකයක් නොමැත) |
| `semantic`   | දෛශික-ගබඩා ඇතුළත් කිරීම් සඳහා වෙන් කර ඇත                                                  |

`MemoryConfig` ලබාගැනීමේ උපායමාර්ගය `exact`, `semantic`, හෝ `hybrid` යන ඒවායින් එකක් වන අතර,
විෂය පථය `session`, `apiKey`, හෝ `global` යන ඒවායින් එකකි. `getMemorySettings()` වෙතින් ලැබෙන පෙරනිමි විෂය පථය
`apiKey` වේ.

## කරුණු නිස්සාරණය (`extraction.ts`)

නිස්සාරණය LLM-මත පදනම් වූවක් නොව, **regex-මත පදනම් වූවකි** — එය ක්රියාවලිය තුළම
`setImmediate()` සමඟ ධාවනය වන බැවින් ප්රතිචාර ප්රවාහය කිසිවිටෙක අවහිර නොකරයි:

- **අභිරුචි රටා** → `MemoryType.FACTUAL`
  (උදා. `I prefer …`, `I really like …`, `my favorite is …`, `I hate …`)
- **තීරණ රටා** → `MemoryType.EPISODIC`
  (උදා. `I'll use …`, `I chose …`, `I went with …`, `I'm going to adopt …`)
- **පුරුදු රටා** → `MemoryType.FACTUAL`
  (උදා. `I usually …`, `I always …`, `I tend to …`)

සෑම ගැළපීමක්ම පිරිසිදු කරනු ලැබේ (`trim`, හිස්තැන් සංකෝචනය, අක්ෂර 500කට සීමා කිරීම),
ස්ථාවර `factKey(category, content)` එකක් හරහා කාණ්ඩය තුළ අනුපිටපත් ඉවත් කරනු ලැබේ, සහ
`{category, extractedAt, source: "llm_response"}` පාරදත්ත සමඟ
`createMemory()` හරහා ගබඩා කරනු ලැබේ. ආදාන පෙළ
64 KiBකට (`MAX_EXTRACTION_TEXT_LENGTH`) සීමා කර ඇත — එය ඊට වඩා දිගු වූ විට, වඩාත්ම මෑත සහායක අන්තර්ගතය සැමවිටම ඇතුළත් වන ලෙස පෙළේ **අග කොටස** භාවිත කරයි.

`extractFactsFromText(text)` පරීක්ෂණ සඳහා නිර්යාත කර ඇති අතර, ඒවා ගබඩා නොකර ව්යුහගත
කරුණු ආපසු ලබා දෙයි.

## ලබාගැනීම (`retrieval.ts`)

`retrieveMemories(apiKeyId, config)` ප්රධාන ප්රවේශ ලක්ෂ්යයයි. එය:

1. `MemoryConfigSchema` හරහා වින්යාසය සාමාන්යකරණය කර වලංගු කරයි.
2. `enabled` අසත්ය වූ විට හෝ `maxTokens <= 0` වූ විට වහාම `[]` ආපසු ලබා දෙයි.
3. `maxTokens` අගය `[1, 8000]` පරාසයට සීමා කරයි.
4. පැරණි දත්ත සමුදායන් දිගටම ක්රියාකරන ලෙස නවීන `memories` වගුව පවතින්නේද (පැරණි `memory`
   වගුවට සාපේක්ෂව) යන්න හඳුනා ගනී.
5. කල් ඉකුත්වීමේ ආරක්ෂාව
   (`expires_at IS NULL OR datetime(expires_at) > datetime('now')`), විකල්ප
   සැසි විෂය පථය, සහ විකල්ප `retentionDays` කඩඉම සමඟ මූලික විමසුම ගොඩනඟයි.
6. උපායමාර්ගය අනුව ශාඛාගත වෙයි:
   - **`exact`** (පෙරනිමිය): කාලානුක්රමික `ORDER BY created_at DESC LIMIT 100`.
   - **`semantic`**: `config.query` සහ `memory_fts` පවතී නම්,
     `memory_fts MATCH ?` සමඟ JOIN කර FTS ශ්රේණිය අනුව අනුපිළිවෙළට සකසයි; FTS පේළි 0ක් ආපසු ලබා දුන් විට කාලානුක්රමික ක්රමයට ආපසු යයි.
   - **`hybrid`**: FTS ප්රතිඵල (ඉහළ අදාළත්වයක් සහිත) සහ
     කාලානුක්රමික කට්ටලයේ ඒකාබද්ධයක් වන අතර, id අනුව අනුපිටපත් ඉවත් කරයි.
7. විමසුමක් ලබා දී ඇති විට `content`, `key`, සහ `metadata` JSON මත
   මූලපද අදාළත්ව ලකුණක් (`getRelevanceScore`) ගණනය කරයි. ලකුණ ශුන්ය වන පේළි ඉවත් කරනු ලැබේ.
8. ලකුණ අවරෝහණ පිළිවෙළටත්, ඉන්පසු `createdAt` අවරෝහණ පිළිවෙළටත් සකසයි.
9. ශ්රේණිගත ලැයිස්තුව හරහා ගමන් කරමින්, ධාවන
   `estimateTokens(content)` අගය (≈ `length / 4`) අයවැය යටතේ පවතින තුරු ඇතුළත් කිරීම් පිළිගනී. ගැළපීමක් තිබේ නම් සැමවිටම අවම වශයෙන් එක් ඇතුළත් කිරීමක්වත් ආපසු ලබා දෙයි.

`estimateTokens` නිර්යාත කර ඇති අතර ලබාගැනීම, සාරාංශකරණය, සහ MCP
`omniroute_memory_search` මෙවලම විසින් භාවිත කරනු ලැබේ.

## ඉන්ජෙක්ෂන් (`injection.ts`)

`injectMemory(request, memories, provider)`:

1. සියලුම මතක අන්තර්ගතයන් තනි `Memory context: …` තන්තුවකට ඒකාබද්ධ කරයි.
2. සපයන්නාගේ නම අනුව උපායමාර්ගයක් තෝරයි:
   - **පද්ධති පණිවිඩය** (OpenAI, Anthropic, Gemini, … සඳහා පෙරනිමිය) — පවතින ඕනෑම පද්ධති පණිවිඩයකට ඉදිරියෙන්
     `{role: "system", content: memoryText}` එකක් එක් කරන බැවින් පරිශීලක පද්ධති ප්රේරකවලට තවමත් ප්රමුඛත්වය හිමි වේ.
   - **පරිශීලක පණිවිඩය** (විකල්ප ක්රමය) — `PROVIDERS_WITHOUT_SYSTEM_MESSAGE` හි ඇති
     `o1`, `o1-mini`, `o1-preview`, `glm`, `glmt`, `glm-cn`, `zai`, `qianfan` වැනි සපයන්නන් සඳහාය. මොවුන් පද්ධති භූමිකාව ප්රතික්ෂේප කරන අතර,
     එසේ නොකළහොත් 400 දෝෂයක් ලබා දෙනු ඇත (GLM/Zhipu සඳහා issue #1701 බලන්න).
3. ගණන, උපායමාර්ගය සහ මොඩලය `memory.injection.injected` යටතේ ලොග් කරයි.

තමන්ගේම මාර්ගගත කිරීමේ තීරණ ගැනීමට අවශ්ය ඇමතුම්කරුවන් සඳහා `providerSupportsSystemMessage(provider)` අපනයනය කර ඇත. ආරක්ෂාව සඳහා, නොදන්නා සපයන්නන් පෙරනිමියෙන් `true`
(පද්ධති භූමිකාවට අවසර ඇත) ලෙස සලකනු ලැබේ.

## සැකසුම් (`settings.ts`)

මතක වින්යාසය env vars තුළ නොව, **DB සැකසුම් වගුවේ ගබඩා කර ඇත**.
`getMemorySettings()` විසින් `getSettings()` වෙතින් කියවා ප්රතිඵලය
ක්රියාවලි-තුළ හැඹිලිගත කරයි; ලිවීම්වලින් පසු settings PUT
මාර්ගය විසින් `invalidateMemorySettingsCache()` අමතනු ලැබේ.

### පැරණි ක්ෂේත්ර (සියලුම අනුවාද)

| DB යතුර               | වර්ගය         | පෙරනිමිය                                                | UI පාලකය                                                        |
| --------------------- | ------------- | ------------------------------------------------------- | --------------------------------------------------------------- |
| `memoryEnabled`       | බූලියන්       | `false` (v3.8.30 සිට පෙරනිමියෙන් අක්රියයි)              | මතකය සක්රිය/අක්රිය කිරීම                                        |
| `memoryMaxTokens`     | පූර්ණ සංඛ්යාව | `2000` (පරාසය `0–16000`)                                | ඉන්ජෙක්ෂන් සඳහා ටෝකන අයවැය                                      |
| `memoryRetentionDays` | පූර්ණ සංඛ්යාව | `30` (පරාසය `1–365`)                                    | රඳවාගැනීමේ කාල පරාසය                                            |
| `memoryStrategy`      | enum          | `"hybrid"` (`recent`, `semantic`, `hybrid` අතරින් එකක්) | ලබාගැනීමේ උපායමාර්ගය                                            |
| `skillsEnabled`       | බූලියන්       | `false`                                                 | එක් එක් යතුර සඳහා කුසලතා ඉන්ජෙක්ෂන් මාරු කරයි (SKILLS.md බලන්න) |

සටහන: `toMemoryRetrievalConfig()` හරහා UI උපායමාර්ගය වන `"recent"` අභ්යන්තර
`"exact"` ලබාගැනීමේ උපායමාර්ගයට සිතියම්ගත වේ (කාලානුක්රමික අනුපිළිවෙළ).

### නව ක්ෂේත්ර (v3.8.6, සැලැස්ම 21 D9)

ක්ෂේත්ර විස්තර සඳහා ඉහත "සැකසුම් දිගුව" කොටසද බලන්න.

| DB යතුර                     | API ක්ෂේත්රය             | පෙරනිමිය |
| --------------------------- | ------------------------ | -------- |
| `memoryEmbeddingSource`     | `embeddingSource`        | `"auto"` |
| `memoryEmbeddingModel`      | `embeddingProviderModel` | `null`   |
| `memoryTransformersEnabled` | `transformersEnabled`    | `false`  |
| `memoryStaticEnabled`       | `staticEnabled`          | `false`  |
| `memoryRerankEnabled`       | `rerankEnabled`          | `false`  |
| `memoryRerankModel`         | `rerankProviderModel`    | `null`   |
| `memoryVectorStore`         | `vectorStore`            | `"auto"` |

Qdrant-සම්බන්ධ DB යතුරු (`qdrantEnabled`, `qdrantHost`, `qdrantPort`,
`qdrantApiKey`, `qdrantCollection` හි පෙරනිමිය `"omniroute_memory"`,
`qdrantEmbeddingModel` හි පෙරනිමිය `"openai/text-embedding-3-small"`) `qdrant.ts` හි
`normalizeQdrantConfig()` විසින් කියවනු ලැබේ.

### පරිසර විචල්ය (v3.8.6)

විකල්ප env vars හයක් එන්ජිමේ ධාවනකාල හැසිරීම සුසර කරයි (`.env.example` හි ලේඛනගත කර ඇත):

| විචල්යය                         | පෙරනිමිය                   | විස්තරය                                                                                                                                                      |
| ------------------------------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `MEMORY_EMBEDDING_CACHE_TTL_MS` | `300000`                   | එම්බෙඩිං හැඹිලියේ TTL (මිනිත්තු 5)                                                                                                                           |
| `MEMORY_EMBEDDING_CACHE_MAX`    | `1000`                     | එම්බෙඩිං LRU හැඹිලියේ උපරිම ප්රවේශ සංඛ්යාව                                                                                                                   |
| `MEMORY_TRANSFORMERS_MODEL`     | `Xenova/all-MiniLM-L6-v2`  | Transformers.js මොඩලය සඳහා HF ගබඩාව                                                                                                                          |
| `MEMORY_STATIC_MODEL`           | `minishlab/potion-base-8M` | ස්ථිතික potion මොඩලය සඳහා HF ගබඩාව                                                                                                                           |
| `MEMORY_STATIC_CACHE_DIR`       | `<DATA_DIR>/embeddings`    | බාගත කළ මොඩල ගබඩා කළ යුතු ස්ථානය                                                                                                                             |
| `MEMORY_VEC_TOP_K`              | `20`                       | දෛශික සෙවුම සඳහා පෙරනිමි top-K                                                                                                                               |
| `MEMORY_RRF_K`                  | `60`                       | දෙමුහුන් සෙවුම සඳහා RRF k නියතය                                                                                                                              |
| `MEMORY_VEC_QUANTIZATION`       | `none`                     | දේශීය sqlite-vec දෛශික ප්රමාණකරණය කර ගබඩා කිරීමට `int8` ලෙස සකසන්න (~4× කුඩාය; කැමැත්තෙන් සක්රිය කළ යුතුය). ප්රකාරය වෙනස් කිරීම නැවත සුචිගත කිරීමක් බල කරයි. |

## සාරාංශකරණය (`summarization.ts`)

යතුරක මතකයන්හි ක්රියාත්මක ටෝකන එකතුව අයවැය ඉක්මවන විට `summarizeMemories(apiKeyId, sessionId?, maxTokens = 4000)` පැරණි අන්තර්ගතය සංක්ෂිප්ත කරයි. එය `created_at` අනුව DESC පිළිවෙළට පේළි හරහා ගමන් කරමින්, සීමාවට ගැළපෙන පේළි තබාගෙන, ඉතිරි පේළි සඳහා `content` එම ස්ථානයේම මුල් අන්තර්ගතයේ පළමු වාක්ය තුනෙන් ප්රතිස්ථාපනය කරයි. `tokensSaved` යනු පැරණි සහ නව අන්තර්ගත අතර `estimateTokens` හි වෙනසයි.

මෙම ක්රියාවලිය වත්මන් කතාබස් නලමාර්ගය තුළ **ලබා ගත හැකි නමුත් ස්වයංක්රීයව කැඳවනු නොලැබේ** — ඔබට අඛණ්ඩ සංක්ෂිප්තකරණය අවශ්ය නම්, එය cron එකකින්, පරිපාලක ක්රියාවකින්, හෝ `MemoryConfig.autoSummarize` සම්බන්ධකයකින් කැඳවන්න. දත්ත අහිමි වීම එක් දිශාවකට පමණි: මුල් පෙළ උඩින් ලියනු ලැබේ.

## REST API

සියලුම අන්ත ලක්ෂ්ය සඳහා කළමනාකරණ සත්යාපනය (`requireManagementAuth`) අවශ්ය වේ.

### මූලික මතක අන්ත ලක්ෂ්ය (පවතින + යාවත්කාලීන කළ)

| ක්රමය    | මාර්ගය               | විස්තරය                                                                                                                                                                               |
| -------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `GET`    | `/api/memory`        | පෙරහන් සහිත පිටුගත ලැයිස්තුව: `apiKeyId`, `type`, `sessionId`, `q`, `limit`, `page`, `offset`. ප්රතිචාරයට `stats.total`, `stats.tokensUsed`, `stats.hitRate`, `cacheStats` ඇතුළත් වේ  |
| `POST`   | `/api/memory`        | ඇතුළත් කිරීමක් සාදයි (Zod මගින් වලංගු කළ: `content`, `key`, විකල්ප `type`, `sessionId`, `apiKeyId`, `metadata`, `expiresAt`). `(apiKeyId, key)` මත upsert කරන `createMemory()` කැඳවයි |
| `GET`    | `/api/memory/[id]`   | UUID අනුව තනි ඇතුළත් කිරීමක් ලබා ගනී                                                                                                                                                  |
| `PUT`    | `/api/memory/[id]`   | ඇතුළත් කිරීමේ ක්ෂේත්ර (`type`, `key`, `content`, `metadata`) යාවත්කාලීන කරයි. ඉල්ලීම් අන්තර්ගතය: `MemoryUpdatePutSchema`. embedding මූලාශ්රයක් තිබේ නම් vector එකද සමමුහුර්ත කරයි.    |
| `DELETE` | `/api/memory/[id]`   | ඇතුළත් කිරීමක් මකයි; `vec_memories` (D15) සහ Qdrant වෙතින්ද හැකි උපරිමයෙන් මකයි. නොමැති විට 404 ආපසු ලබා දෙයි.                                                                        |
| `GET`    | `/api/memory/health` | `verifyExtractionPipeline("health-check")` ධාවනය කරයි — සෑදීම→ලැයිස්තුගත කිරීම→මැකීම යන සම්පූර්ණ වටය. `{working, latencyMs, error?}` ආපසු ලබා දෙයි                                    |

### නව මතක එන්ජින් අන්ත ලක්ෂ්ය (සැලැස්ම 21)

| ක්රමය  | මාර්ගය                            | විස්තරය                                                                                                                                                                            |
| ------ | --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `POST` | `/api/memory/retrieve-preview`    | `retrieveMemories` හි පරීක්ෂණ ධාවනයක් — ලකුණ, ස්තරය සහ ටෝකන සමඟ ශ්රේණිගත ප්රතිඵල ලබා දෙයි. ඉල්ලීම් අන්තර්ගතය: `RetrievePreviewSchema`. මතක ඇතුළු කිරීම හෝ වෙනස් කිරීම සිදු නොකරයි. |
| `GET`  | `/api/memory/embedding-providers` | embedding ආකෘති සහිත සැපයුම්කරුවන් ලැයිස්තුගත කරමින්, වින්යාස කළ API යතුරක් ඇත්තේ කවර සැපයුම්කරුවන්ටද යන්න දක්වයි.                                                                 |
| `GET`  | `/api/memory/engine-status`       | සම්පූර්ණ එන්ජින් තත්ත්වය ලබා දෙයි: keyword ස්තරය, embedding විභේදනය, vector ගබඩා සංඛ්යාලේඛන, Qdrant සෞඛ්යය, rerank වින්යාසය. ආකෘතිය: `MemoryEngineStatusSchema`.                   |
| `POST` | `/api/memory/summarize`           | මතක සංක්ෂිප්තකරණය අතින් ක්රියාත්මක කරයි. ඉල්ලීම් අන්තර්ගතය: `MemorySummarizeSchema` (`olderThanDays`, `apiKeyId?`, `dryRun`). `{candidates, tokensSaved}` ආපසු ලබා දෙයි.           |
| `POST` | `/api/memory/reindex`             | `needs_reindex=1` සහිත මතක සඳහා vector නැවත සුචිගත කිරීම ක්රියාත්මක කරයි. ඉල්ලීම් අන්තර්ගතය: `MemoryReindexSchema` (`force`). `{started, pending}` ආපසු ලබා දෙයි.                  |

### සැකසුම් අන්ත ලක්ෂ්ය

| ක්රමය  | මාර්ගය                                  | විස්තරය                                                                                                                   |
| ------ | --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `GET`  | `/api/settings/memory`                  | වත්මන් සාමාන්යකරණය කළ `MemorySettingsExtended` (නව ක්ෂේත්ර 7 + පැරණි ක්ෂේත්ර)                                             |
| `PUT`  | `/api/settings/memory`                  | `MemorySettingsExtendedSchema` වෙතින් ඕනෑම ක්ෂේත්රයක් යාවත්කාලීන කරයි (මුළු ක්ෂේත්ර 12)                                   |
| `GET`  | `/api/settings/qdrant`                  | වත්මන් Qdrant සැකසුම් (`QdrantSettingsSchema`)                                                                            |
| `PUT`  | `/api/settings/qdrant`                  | Qdrant සැකසුම් යාවත්කාලීන කරයි. ඉල්ලීම් අන්තර්ගතය: `QdrantSettingsUpdateSchema`. `apiKey` = හිස් තන්තුවක් යතුර ඉවත් කරයි. |
| `GET`  | `/api/settings/qdrant/health`           | වින්යාස කළ Qdrant අවස්ථාවට එරෙහි සජීවීතා පරීක්ෂාව. `QdrantHealthResultSchema` ආපසු ලබා දෙයි.                              |
| `POST` | `/api/settings/qdrant/search`           | Qdrant සඳහා අර්ථවිද්යාත්මක සෙවුම් පරීක්ෂාව. ඉල්ලීම් අන්තර්ගතය: `QdrantSearchSchema` (`query`, `topK`).                    |
| `POST` | `/api/settings/qdrant/cleanup`          | කල් ඉකුත් වූ / පැරණි මතක සඳහා Qdrant ලක්ෂ්ය ඉවත් කරයි.                                                                    |
| `GET`  | `/api/settings/qdrant/embedding-models` | Qdrant සඳහා ලබා ගත හැකි embedding ආකෘති ලැයිස්තුගත කරයි.                                                                  |

`/api/memory` ලැයිස්තු විමසුම `page`-මත පදනම් වූ පිටුකරණය
(`parsePaginationParams`) **හෝ** සෘජු `offset` සඳහා සහාය දක්වයි — `offset` තිබෙන විට එයට
ප්රමුඛතාව ලැබෙන අතර ප්රතිචාර ආකෘතිය සඳහා ව්යුත්පන්න `page` එකක් ගණනය කෙරේ.

## MCP මෙවලම් (`open-sse/mcp-server/tools/memoryTools.ts`)

MCP සේවාදායකය සක්රීය කර ඇති විට, මතක මෙවලම් තුනක් ලියාපදිංචි කෙරේ:

- `omniroute_memory_search` — `{apiKeyId, query?, type?, maxTokens?, limit?}`
  → `retrieveMemories()` ආවරණය කරයි. v3.8.6 (D16) සිට, `strategy` එක
  `"exact"` ලෙස දෘඪ-කේතනය කිරීම වෙනුවට `getMemorySettings()` වෙතින් කියවනු
  ලැබේ. `query` සපයා ඇති අතර `strategy` එක `semantic` හෝ `hybrid` නම්,
  ලබා ගත හැකි විට දෛශික ගබඩාව භාවිත කෙරේ.
- `omniroute_memory_add` — `{apiKeyId, sessionId?, type, key, content,
metadata?}` → `createMemory()` ආවරණය කරයි. පිළිගන්නේ සම්මත වර්ග 4 පමණි:
  `factual`, `episodic`, `procedural`, `semantic` (D17).
- `omniroute_memory_clear` — `{apiKeyId, type?, olderThan?}` → ගැළපෙන
  ඇතුළත් කිරීම් ලැයිස්තුගත කරයි, අවශ්ය නම් නිර්මාණය කළ-පෙර කාල මුද්රාව අනුව
  පෙරහන් කරයි, ඉන්පසු `deleteMemory()` හරහා එකින් එක මකයි (එමඟින්
  sqlite-vec + Qdrant වෙතින් දෛශික ද ඉවත් කෙරේ).

ප්රවාහනය සහ විෂයපථය පිළිබඳ විස්තර සඳහා [MCP-SERVER.md](./MCP-SERVER.md) බලන්න.

## උපකරණ පුවරුව (Memory Studio)

`src/app/(dashboard)/dashboard/memory/page.tsx` දැන් **ටැබ් 3කින් යුත් Studio** එකකි:

### ටැබය: මතකයන්

- සංකල්ප කාඩ්පත (හකුළා තැබිය හැකි "එය ක්රියා කරන ආකාරය" පැහැදිලි කිරීම).
- තත්ය-කාලීන ලැයිස්තුව, සෙවීම සහ පිටුකරණය (300 ms ප්රමාද-පාලනය සමඟ).
- වර්ග පෙරහන (`factual` / `episodic` / `procedural` / `semantic` / සියල්ල).
- මතකය එක් කිරීමේ මොඩලය (යතුර, අන්තර්ගතය, වර්ගය).
- පේළිය තුළ සංස්කරණය (පැන්සල් බොත්තම → `PUT /api/memory/[id]`).
- එක් එක් පේළිය සඳහා මැකීම (තහවුරු කිරීමේ සංවාදයක් සමඟ).
- වත්මන් පිටුව JSON ලෙස නිර්යාත කිරීම; ගොනු තෝරනය හරහා JSON ආයාත කිරීම.
- සංඛ්යාලේඛන කාඩ්පත්: `totalEntries`, `tokensUsed`, `hitRate`.
- "පැරණි ඒවා සංක්ෂිප්ත කරන්න" බොත්තම → `POST /api/memory/summarize` (පළමුව වියළි ධාවනයක්
  අපේක්ෂක සංඛ්යාව පෙන්වා, පසුව තහවුරු කරයි).
- `GET /api/memory/health` මඟින් පාලනය වන කොළ/රතු සෞඛ්ය තිතක්.

### ටැබය: පරීක්ෂණ භූමිය

- විමසුම් ආදානය + උපාය තෝරනය (නිශ්චිත / අර්ථානුසාරී / දෙමුහුන්) + ටෝකන සීමාව.
- "අනුකරණය කරන්න" → `POST /api/memory/retrieve-preview` — ශ්රේණිගත ප්රතිඵල
  `score`, `tier`, `tokens`, `vecScore`, `ftsScore` සමඟ පෙන්වයි.
- භාවිත කළ කාවැද්දීමේ මූලාශ්රය / දෛශික ගබඩාව සහ
  විකල්පයකට මාරුවීමක් සිදු වූයේද යන්න පෙන්වන නිරාකරණ පැනලය.

### ටැබය: එන්ජිම

- එන්ජින් තත්ත්ව පැනලය (මූලපද FTS5 චිපය, කාවැද්දීමේ චිපය, දෛශික ගබඩා චිපය,
  Qdrant සෞඛ්ය චිපය, නැවත-ශ්රේණිගත කිරීමේ චිපය).
- "දැන් නැවත සුචිගත කරන්න" බොත්තම → `POST /api/memory/reindex`.
- කාවැද්දීමේ මූලාශ්ර තෝරනය (ස්වයංක්රීය / දුරස්ථ / ස්ථිතික / පරිවර්තක + මාරු පාලක).
- Qdrant වින්යාස කාඩ්පත (සක්රීය කිරීමේ මාරු පාලකය, ධාරකය/තොට/එකතුව/යතුර, සම්බන්ධතාව පරීක්ෂා කිරීම,
  අර්ථානුසාරී සෙවුම් පරීක්ෂණය, පිරිසිදු කිරීම).
- නැවත-ශ්රේණිගත කිරීමේ වින්යාස කාඩ්පත (සක්රීය කිරීමේ මාරු පාලකය, සැපයුම්කරු/මාදිලි තෝරනය).

පැරණි/ගෝලීය සැකසුම් අතුරුමුහුණත සඳහා මතක සහ Qdrant සැකසුම්
`/dashboard/settings → Memory & Skills` (`MemorySkillsTab.tsx`) යටතේ ද ඇත.

## හැඹිලිගත කිරීම

`src/lib/memory/store.ts`, `getMemory(id)` කියවීම් සඳහා ක්රියාවලිය තුළ පවතින LRU-සමාන හැඹිලියක්
(`MEMORY_CACHE_TTL = 1 min`, `MEMORY_MAX_CACHE_SIZE = 500`, පැරණිතම 20 %
ඉවත් කිරීම සමඟ) පවත්වාගෙන යන අතර, තමන්ටම විෂයපථගත හැඹිලියක් අවශ්ය කැඳවුම්කරුවන් විසින් භාවිත කරන
`get`/`set`/`invalidate` ක්රම සහිත සාමාන්ය යතුරු/අගය
`memoryCache` ස්තරයක් (`src/lib/memory/cache.ts`) ද පවත්වාගෙන යයි (ඇතුළත් කිරීම් 1 000ක LRU,
පෙරනිමි TTL 5 min).

## පෞද්ගලිකත්වය සහ ජීවන චක්රය

- මතකයේ හිමිකාරිත්වය API යතුරු id එකයි (`chatCore.ts` තුළ
  `resolveMemoryOwnerId`). `apiKeyInfo.id` එකක් නොමැතිව නැවත ලබාගැනීම,
  ඇතුළු කිරීම හෝ උපුටාගැනීම ක්රියාත්මක නොවේ.
- අනාගත `expires_at` අගයක් සහිත ඇතුළත් කිරීම් නැවත ලබාගැනීමෙන් පෙරා ඉවත්
  කෙරේ; `retentionDays` ඉක්මවා පැරණි ඇතුළත් කිරීම් `retrieveMemories` හි
  `created_at >= cutoff` වගන්තිය මඟින් බැහැර කෙරේ.
- ස්ථිර මකාදැමීම සඳහා, `DELETE /api/memory/[id]` හෝ `omniroute_memory_clear` භාවිත කරන්න.
- උපුටාගැනීම `setImmediate` හරහා ප්රතිචාරය බලා නොසිට ක්රියාත්මක කෙරේ; අසාර්ථකවීම්
  `memory.extraction.background.failed` යටතේ සටහන් කෙරෙන අතර ඒවා කිසිවිටෙක
  ඇමතුම්කරුට අනාවරණය නොවේ.
- සත්යාපන වට-චාරිකා (`verifyExtractionPipeline`) `finally` කොටසක් තුළ
  තමන්ගේම පරීක්ෂණ ඇතුළත් කිරීම් පිරිසිදු කරයි.

## මෙයද බලන්න

- [SKILLS.md](./SKILLS.md) — `skillsEnabled` සැකසුම මතකය සමඟ මෙවලම්
  අර්ථදැක්වීම් ඇතුළු කරයි.
- [MCP-SERVER.md](./MCP-SERVER.md) — MCP ප්රවාහනය / විෂය පථ.
- [API_REFERENCE.md](../reference/API_REFERENCE.md) — පුළුල් API පරාසය.
- මූලාශ්ර මොඩියුල:
  - `src/lib/memory/types.ts`, `schemas.ts`
  - `src/lib/memory/store.ts`, `retrieval.ts`, `injection.ts`, `reindex.ts`
  - `src/lib/memory/extraction.ts`, `summarization.ts`, `verify.ts`
  - `src/lib/memory/settings.ts`, `qdrant.ts`, `cache.ts`
  - `src/lib/memory/vectorStore.ts` — sqlite-vec + දෙමුහුන් RRF
  - `src/lib/memory/embedding/index.ts` — බහු-මූලාශ්ර embedding ස්තරය
  - `src/lib/memory/embedding/types.ts`, `remote.ts`, `staticPotion.ts`,
    `transformersLocal.ts`, `cache.ts`
  - `src/shared/schemas/memory.ts` — සියලු මතක API body සඳහා Zod schema
  - `src/shared/schemas/qdrant.ts` — Qdrant සැකසුම්/මෙහෙයුම් සඳහා Zod schema
  - `src/lib/db/memoryVec.ts` — `memory_vec_meta` සඳහා CRUD
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
  - `src/app/api/settings/qdrant/route.ts` + උප-මාර්ග
  - `src/app/(dashboard)/dashboard/memory/` — Studio UI (පිටුව + සංරචක +
    tab + hook)
  - `open-sse/handlers/chatCore.ts` (ඇතුළු කිරීමේ / උපුටාගැනීමේ සම්බන්ධක)
  - `open-sse/mcp-server/tools/memoryTools.ts`

---

## Embedding සපයන්නෙකු තෝරාගැනීම (v3.8.16+)

OmniRoute හි මතක එන්ජිම **embedding මූලාශ්ර හතරකට** (`src/lib/memory/embedding/`) සහාය දක්වයි. එක් එක් මූලාශ්රයේ **ප්රමාදය, පිරිවැය, ආකෘති ගුණාත්මකභාවය සහ සැකසුම් සංකීර්ණතාව** සම්බන්ධයෙන් වෙනස් වාසි හා අවාසි ඇත.

### Embedding මූලාශ්ර

| සපයන්නා        | මූලාශ්රය                                     | ප්රමාදය                             | පිරිවැය             | ගුණාත්මකභාවය                         | සැකසුම                                         |
| -------------- | -------------------------------------------- | ----------------------------------- | ------------------- | ------------------------------------ | ---------------------------------------------- |
| `transformers` | දේශීය ONNX ආකෘතිය (Xenova/all-MiniLM-L6-v2)  | ~50-150ms (CPU)                     | නොමිලේ              | හොඳ                                  | `npm install` පමණි                             |
| `static`       | පෙර-ගණනය කළ දෛශික (cache කළ)                 | <1ms                                | නොමිලේ              | අදාළ නොවේ (cache hit එක මත රඳා පවතී) | කිසිවක් නැත                                    |
| `remote`       | OpenAI / Cohere / Voyage API                 | ~100-300ms                          | $0.02-0.10/1M token | විශිෂ්ට                              | API යතුර                                       |
| `auto`         | ධාවන වේලාවේදී ලබාගත හැකි හොඳම මූලාශ්රය තෝරයි | තෝරාගත් මූලාශ්රයට සමාන              | නොමිලේ              | තෝරාගත් මූලාශ්රයට සමාන               | කිසිවක් නැත                                    |
| _(cache)_      | ඕනෑම මූලාශ්රයක් මත ඇති මතක-තුළ LRU ස්තරය     | <1ms (hit), සම්පූර්ණ ප්රමාදය (miss) | නොමිලේ              | යටින් පවතින මූලාශ්රයට සමාන           | සැමවිටම සක්රියයි (තෝරාගත හැකි මූලාශ්රයක් නොවේ) |

### තීරණ වෘක්ෂය

```
                  ඔබගේ යෙදවීමේ පසුබිම කුමක්ද?
                  │
      ┌───────────┼───────────┬──────────────┐
      │           │           │              │
  DEV/TEST    කුඩා PROD   විශාල PROD    EDGE / OFFLINE
      │           │           │              │
      ▼           ▼           ▼              ▼
  transformers transformers remote (Qdrant) transformers
  (නොමිලේ, API නැත)          (හොඳම ගුණාත්මකභාවය) (අන්තර්ජාලය නැත)
      │           │           │              │
      └────────┬──┴───────────┴──────────────┘
               │
               ▼
            සැමවිටම ඉහළින් `cache` ස්තරයක් එක් කරන්න
            (LruCache ඕනෑම සපයන්නෙකු ආවරණය කරයි)
```

### දත්ත සමුදාය සහ API වින්යාසය

මතක embedding විකල්ප පරිසර විචල්ය හරහා නොව, Settings API/UI හරහා වින්යාස කෙරේ. Settings යටතේ ඇති අදාළ සැකසුම් දත්ත සමුදා යතුරු (`src/lib/memory/settings.ts` තුළ `normalizeMemorySettings`) මෙසේය:

- `memoryEmbeddingSource`: `"transformers"` (දේශීය), `"remote"` (API-පාදක, උදා. OpenAI), `"static"` (බාහිර ගබඩාව), හෝ `"auto"`
- `memoryEmbeddingProviderModel`: remote/static මූලාශ්ර සඳහා ආකෘති හඳුනාගැනීමේ අගය (උදා., `"text-embedding-3-small"`)
- `memoryTransformersEnabled`: `true` | `false`
- `memoryStaticEnabled`: `true` | `false`
- `memoryVectorStore`: `"sqlite-vec"`, `"qdrant"`, හෝ `"auto"`

#### දේශීය ආකෘතිය (`transformers`)

දේශීය ආකෘති ධාවනය කිරීමට අභ්යන්තරව transformers.js භාවිත කරයි:

```bash
# කේතය තුළ කියවන පරිසර විචල්ය (src/lib/memory/embedding/index.ts):
MEMORY_TRANSFORMERS_MODEL=Xenova/all-MiniLM-L6-v2  # HF ආකෘති repository එක
MEMORY_STATIC_MODEL=minishlab/potion-base-8M       # HF static potion ආකෘතිය
MEMORY_STATIC_CACHE_DIR=<DATA_DIR>/embeddings      # Cache නාමාවලිය
```

#### LRU Embedding Cache

cache එක පෙරනිමියෙන් සැමවිටම සක්රිය අතර පරිසර විචල්ය හරහා වින්යාස කෙරේ:

```bash
MEMORY_EMBEDDING_CACHE_MAX=1000                    # Cache කළ හැකි උපරිම අයිතම
MEMORY_EMBEDDING_CACHE_TTL_MS=300000               # TTL (මිනිත්තු 5)
```

### කාර්යසාධන අගයන්

සාමාන්ය 4-core x86 සේවාදායකයක මිණුම් පරීක්ෂණය (එක් පෙළකට ටෝකන ~100):

| සැපයුම්කරු           | p50   | p95   | p99   | embeddings මිලියන 1කට පිරිවැය      |
| -------------------- | ----- | ----- | ----- | ---------------------------------- |
| `transformers` (CPU) | 80ms  | 180ms | 350ms | නොමිලේ                             |
| `remote` (OpenAI)    | 120ms | 220ms | 400ms | ~$0.02 (ada-002) / $0.13 (3-large) |
| `static` (Qdrant)    | 15ms  | 30ms  | 60ms  | Qdrant සත්කාරක සේවාව මත රඳා පවතී   |
| `cache` (ගැළපීමක්)   | <1ms  | <1ms  | 2ms   | නොමිලේ                             |

---

## කරුණු නිස්සාරණ රටා (v3.8.16+)

`extraction.ts` මොඩියුලය (`src/lib/memory/extraction.ts`) සංවාද පණිවිඩවලින් ව්යුහගත කරුණු නිස්සාරණය කිරීමට **regex රටා ගැළපීම** භාවිත කරයි. මෙම රටා අවබෝධ කර ගැනීම, ඔබේ භාවිත අවස්ථාව සඳහා නිස්සාරණයේ ගුණාත්මකභාවය සීරුමාරු කිරීමට උපකාරී වේ.

### පෙරනිමි රටා ප්රවර්ග

| ප්රවර්ගය            | උදාහරණ රටාව                                                 | ග්රහණය කරගන්නා දෑ         |
| ------------------- | ----------------------------------------------------------- | ------------------------- |
| PREFERENCE_PATTERNS | `"I prefer <X>"`, `"I like <X>"`, `"I hate <X>"`            | පරිශීලක මනාප              |
| DECISION_PATTERNS   | `"I'll use <X>"`, `"I decided to <X>"`, `"I went with <X>"` | පරිශීලක තීරණ (සිදුවීම්මය) |
| PATTERN_PATTERNS    | `"I usually <X>"`, `"I always <X>"`, `"I never <X>"`        | ස්ථාවර හැසිරීම් රටා       |

### උදාහරණ රටා (සරල කළ)

```ts
// src/lib/memory/extraction.ts වෙතින්
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

### නිස්සාරණය වන දෑ

පරිශීලකයෙකු මෙසේ පවසන විට:

> "I prefer TypeScript. I'll use Postgres for this project. I always commit before pushing. I don't like Python."
> නිස්සාරණය මඟින් මතක 4ක් නිපදවයි:
>
> | යතුර                                 | ප්රවර්ගය   | වර්ගය    | අන්තර්ගතය                   |
> | ------------------------------------ | ---------- | -------- | --------------------------- |
> | `preference:typescript`              | preference | factual  | "TypeScript"                |
> | `decision:postgres_for_this_project` | decision   | episodic | "Postgres for this project" |
> | `pattern:commit_before_pushing`      | pattern    | factual  | "commit before pushing"     |
> | `preference:python`                  | preference | factual  | "Python"                    |

### නිස්සාරණ සීමා

පාලනයෙන් තොර නිස්සාරණය වැළැක්වීමට, පහත සීමා අදාළ වේ:

| අවම අන්තර්ගත දිග | අක්ෂර 3ක් |
| උපරිම අන්තර්ගත දිග | අක්ෂර 500ක් |

### නිස්සාරණය අක්රිය කළ යුත්තේ කවදාද

මතකය සක්රිය කර ඇති සෑම විටම නිස්සාරණය ස්වයංක්රීයව ක්රියාත්මක වේ; නිස්සාරණය සඳහා පමණක් වූ වෙනම මාරුවක් නොමැත. එය අක්රිය කිරීමට, `PUT /api/settings/memory` හරහා මතකය සම්පූර්ණයෙන්ම අක්රිය කරන්න (`enabled: false`). පහත අවස්ථාවලදී එසේ කිරීම සලකා බලන්න:

- ඔබට ඉහළ පණිවිඩ පරිමාවක් ඇති අතර නිස්සාරණ පිරිවැය නොසලකා හැරිය නොහැකි විට
- ඔබේ සංවාද බොහෝ දුරට දිගුකාලීන වටිනාකමක් නොමැති තාවකාලික ඒවා වන විට (කතාබස්, දෝෂහරණය)
- ඔබ දැනටමත් අභිරුචි ප්ලගින හරහා සන්දර්භය ග්රහණය කරමින් සිටින විට

---

## දෙමුහුම් RRF සීරුමාරු කිරීම (v3.8.16+)

**Reciprocal Rank Fusion (RRF)** ඇල්ගොරිතමය FTS5 (මූලපද) සහ දෛශික (අර්ථමය) ප්රතිඵල ඒකාබද්ධ කරයි. පහළ ශ්රේණිගත ප්රතිඵලවලට ලබා දෙන බර ප්රමාණය `k` පරාමිතිය මඟින් පාලනය කරයි.

### සූත්රය

එක් එක් අපේක්ෂක මතකය සඳහා, RRF ලකුණ වන්නේ:

```
RRF(d) = Σ  1 / (k + rank_i(d))
```

මෙහි:

- `k` යනු නියතයයි (පෙරනිමිය 60)
- `rank_i(d)` යනු i-වන ලබාගැනීමේ පද්ධතියෙහි (FTS, දෛශික) `d` ලේඛනයේ ශ්රේණියයි
- එකතුව සියලු ලබාගැනීමේ පද්ධති හරහා සිදු වේ

### `k` ප්රතිඵලවලට බලපාන ආකාරය

| `k` අගය              | බලපෑම                                                                             | වඩාත් සුදුසු වන්නේ                     |
| -------------------- | --------------------------------------------------------------------------------- | -------------------------------------- |
| `k=0`                | පිරිසිදු ශ්රේණි සංයෝජනය (සුමට කිරීමක් නැත)                                        | න්යායාත්මක මූලික පදනම                  |
| `k=10-30`            | ඉහළ ප්රතිඵලවලට දැඩි බරක් ලබා දෙයි, පහළ ශ්රේණිවල දායකත්වය ඉතා අඩුය                 | ඉහළම ප්රතිඵල 3 සාමාන්යයෙන් නිවැරදි විට |
| **`k=60`** (පෙරනිමි) | සමතුලිතයි — ඉහළම ප්රතිඵල 10 සියල්ලම අර්ථවත් ලෙස දායක වේ                           | සාමාන්ය අරමුණු ලබාගැනීම                |
| `k=100+`             | වඩා සමතලායි — පහළ ශ්රේණිගත ප්රතිඵල පවා පද්ධති කිහිපයක දිස් වුවහොත් ප්රමුඛ විය හැක | ප්රතිස්මරණය > නිරවද්යතාව තීරණාත්මක විට |

### ප්රායෝගිකව `k` සීරුමාරු කිරීම

```bash
# පෙරනිමිය
MEMORY_RRF_K=60

# ආක්රමණශීලී නිරවද්යතාව (කුඩා මතකය, ලේඛන ස්වල්පයක්)
MEMORY_RRF_K=20

# උපරිම ප්රතිස්මරණය (විශාල මතකය, විවිධ විමසුම්)
MEMORY_RRF_K=120
```

**`k=20` සමඟ උදාහරණයක්:**

- FTS ශ්රේණිය 1 → දායකත්වය `1/21 = 0.048`
- FTS ශ්රේණිය 10 → දායකත්වය `1/30 = 0.033`
- දෛශික ශ්රේණිය 1 → දායකත්වය `0.048`
- ඒකාබද්ධ උපරිමය: `0.096`

**`k=60` සමඟ උදාහරණයක්:**

- FTS ශ්රේණිය 1 → දායකත්වය `1/61 = 0.016`
- FTS ශ්රේණිය 10 → දායකත්වය `1/70 = 0.014`
- දෛශික ශ්රේණිය 1 → දායකත්වය `0.016`
- ඒකාබද්ධ උපරිමය: `0.033`

`k` ඉහළ යන විට, ඉහළම-1 සහ ශ්රේණි-10 අතර **සාපේක්ෂ වෙනස** කුඩා වේ. එබැවින් ඇල්ගොරිතමය ඉහළ ශ්රේණියේ විශ්වාසයට වඩා **ලබාගැනීමේ පද්ධති අතර එකඟතාව** මත වැඩි වශයෙන් රඳා පවතී.

### `k` වෙනස් කළ යුත්තේ කවදාද

| රෝග ලක්ෂණය                                     | උත්සාහ කළ යුතු දේ                                             |
| ---------------------------------------------- | ------------------------------------------------------------- |
| ඉහළම ප්රතිඵලය සැමවිටම ජයගන්නා නමුත් එය වැරදියි | **පහළ** k (උදා., 20) — ඉහළ ශ්රේණියේ විශ්වාසය වඩා වැදගත් වේ    |
| නිවැරදි පිළිතුර ඉහළම 5 තුළ තිබුණද ඉහළම 1 නොවේ  | **ඉහළ** k (උදා., 100) — සමතලා ලකුණුකරණය එකඟතාවට ප්රතිලාභ දෙයි |
| ප්රතිස්මරණය ඉහළ නමුත් නිරවද්යතාව අඩුය          | **පහළ** k — ශ්රේණිගත කිරීම වඩා තියුණු කරන්න                   |
| ප්රතිස්මරණය අඩුය (අදාළ ලේඛන මඟ හැරේ)           | **ඉහළ** k — පහළ ශ්රේණිගත ලේඛනවලට අවස්ථාවක් ලබා දෙන්න          |

### RRF බර තැබීම

ප්රතිලෝම ශ්රේණි සංයෝජනය අර්ථමය දෛශික ශ්රේණිය සහ පූර්ණ-පෙළ සෙවුම් ශ්රේණිය සඳහා සමාන බර භාවිත කරයි:

```
RRF(d) = 1/(k + rank_vector) + 1/(k + rank_fts)
```

තනි බර සීරුමාරු කිරීමට පරිසර විචල්ය නොමැත (`MEMORY_RRF_VECTOR_WEIGHT`/`MEMORY_RRF_FTS_WEIGHT` නොපවතී).

---

## සාරාංශකරණ උපායමාර්ගය (v3.8.16+)

`summaryization.ts` මොඩියුලය (`src/lib/memory/summarization.ts`) නැවත සිහිපත් කිරීමේ හැකියාව රැකගනිමින් සක්රිය කට්ටලය කුඩාව තබා ගැනීමට පැරණි මතක සම්පීඩනය කරයි.

### සාරාංශකරණය ක්රියාත්මක වන අවස්ථා

| ප්රේරකය                      | සීමාව (පෙරනිමි) |
| ---------------------------- | --------------- |
| API හරහා අතින් ප්රේරණය කිරීම | අදාළ නොවේ       |

### සාරාංශගත කරනු ලබන දේ

`summaryization.ts` වෙතින් ප්රවේශ ස්ථාන දෙකක් නිර්යාත කෙරේ:

- **`summarizeMemories(apiKeyId, sessionId?, maxTokens = 4000)`** — සැසියක් සඳහා ඇති
  මතක, ටෝකන අයවැයකට සීමා වූ තනි සාරාංශ පෙළකට සංක්ෂිප්ත කරයි.
- **`summarizeMemoriesOlderThan(apiKeyId, days, dryRun)`** — API විසින් භාවිත කරන
  වයස මත පදනම් වූ සම්පීඩනයයි: එය `days` වඩා පැරණි සෑම මතකයක්ම තෝරා,
  ඒවායින් එක් සංක්ෂිප්ත සාරාංශ මතකයක් ගොඩනඟා, (`dryRun` යනු `false` වන විට)
  මුල් මතක මකා දමයි. කිසිවක් වෙනස් නොකර අපේක්ෂිත කට්ටලය සහ සමස්ත ටෝකන
  ගණන පෙරදැක්මට `dryRun: true` ලබා දෙන්න.

ටැග්/යතුරු සමූහකරණ අදියරක් හෝ එක් එක් මතකය සඳහා "මූලික එදිරිව සාරාංශගත කළ හැකි" ලකුණු කිරීමක් නොමැත —
තේරීම සම්පූර්ණයෙන්ම වයස් සීමාව මත සිදු වන අතර, සාරාංශ පෙළ යනු එක් එක් අපේක්ෂිත මතකය සඳහා
වර්ග උපසර්ගයක් සහිත සංක්ෂිප්ත පේළියකි.

### සාරාංශකරණය ප්රේරණය කිරීම

සාරාංශකරණය **අතින් සිදු කරන / තෝරා සක්රීය කරන** ක්රියාවකි — `autoSummarize` සැකසුම
පෙරනිමියෙන් `false` වන බැවින් කිසිවක් ස්වයංක්රීයව සම්පීඩනය නොවේ. API හරහා එය ප්රේරණය කරන්න:

```bash
curl -X POST http://localhost:20128/api/memory/summarize \
  -H "Authorization: Bearer $OMNIROUTE_KEY"
```

එය අක්රියව තැබීමට, `autoSummarize` එහි පෙරනිමි අගය (`false`) ලෙසම තබන්න.

### සාරාංශකරණයේ ගුණාත්මකභාවය සඳහා උපදෙස්

- **පළමුව `dryRun` සමඟ පෙරදකින්න** — `summarizeMemoriesOlderThan(..., true)` මගින්
  අපේක්ෂිත ලැයිස්තුව සහ සමස්ත ටෝකන ගණන ආපසු ලබා දෙන බැවින්, මුල් මතක මකා දැමීමට පෙර
  ඒකාබද්ධ වන්නේ මොනවාදැයි තහවුරු කළ හැක.
- **ඔබට විශාල මතක සමුච්චයක් තිබේ නම් අඩු තදබදයක් ඇති වේලාවන්හි සාරාංශකරණය ක්රියාත්මක කරන්න** — මන්දගාමී කොටස LLM ඇමතුමයි

```bash
# Cron ආකාරයට: දිනපතා පාන්දර 3ට සාරාංශගත කරන්න
0 3 * * * curl -X POST http://localhost:20128/api/memory/summarize \
  -H "Authorization: Bearer $OMNIROUTE_KEY"
```

---

## MemoryBackend සැපයුම්කරු රටාව

> **සත්යයේ මූලාශ්රය:** `src/lib/memory/backend.ts`, `src/lib/memory/genericBackend.ts`, `src/lib/memory/manager.ts`
> **පරීක්ෂණ:** `src/lib/memory/__tests__/generic-backend.test.ts`

MemoryBackend සැපයුම්කරු රටාව, පවතින මතක එන්ජිම මත **සම්බන්ධ කළ හැකි පසුඅන්ත වියුක්තකරණ ස්තරයක්** හඳුන්වා දෙයි. තනි ආචයන ක්රියාත්මක කිරීමකට බැඳී සිටීම වෙනුවට, මතක පද්ධතිය දැන් වින්යාස කළ හැකි ප්රාථමික/විකල්ප මාර්ගගත කිරීම සමඟ බහුවිධ පසුඅන්තවලට (SQLite, Obsidian, Notion, අභිරුචි HTTP පසුඅන්ත) සහාය දක්වයි.

### ගෘහනිර්මාණය

```
┌──────────────────────────────────────────────────────────┐
│                    API මාර්ග                              │
│            (src/app/api/memory/route.ts)                  │
└──────────────────────┬───────────────────────────────────┘
                       │
┌──────────────────────▼───────────────────────────────────┐
│                   MemoryManager                           │
│           තනි අවස්ථා සංවිධායකය (manager.ts)              │
│                                                          │
│  ප්රාථමික ──► පසුඅන්තය A  (උදා. SQLite)                 │
│  විකල්ප    ──► පසුඅන්තය B  (උදා. Obsidian)               │
│                පසුඅන්තය C  (උදා. GenericBackend හරහා Notion)│
└──────────────────────┬───────────────────────────────────┘
                       │
        ┌──────────────┼──────────────┐
        ▼              ▼              ▼
┌────────────┐ ┌────────────┐ ┌──────────────────┐
│ SQLite     │ │ Obsidian   │ │ GenericMemory    │
│ පසුඅන්තය   │ │ පසුඅන්තය   │ │ පසුඅන්තය (HTTP) │
└────────────┘ └────────────┘ └──────────────────┘
```

#### මූලික අතුරුමුහුණත (`backend.ts`)

සෑම පසුඅන්තයක්ම `MemoryBackend` අතුරුමුහුණත ක්රියාත්මක කළ යුතුය:

```typescript
interface MemoryBackend {
  readonly id: string;
  readonly displayName: string;

  // නිර්මාණය, කියවීම, යාවත්කාලීන කිරීම සහ මකා දැමීම
  create(input: CreateMemoryInput): Promise<Memory>;
  get(id: string): Promise<Memory | null>;
  update(id: string, updates: Partial<...>): Promise<boolean>;
  delete(id: string): Promise<boolean>;
  list(filter: MemoryFilter): Promise<{ data: Memory[]; total: number; byType: Record<string, number> }>;

  // සෙවීම
  search(config: SearchConfig): Promise<Memory[]>;

  // සෞඛ්ය තත්ත්වය
  health(): Promise<HealthCheckResult>;

  // ජීවන චක්රය (විකල්ප)
  initialize?(): Promise<void>;
  shutdown?(): Promise<void>;
}
```

#### MemoryManager (`manager.ts`)

පහත දේ සිදු කරන තනි අවස්ථා සංවිධායකයකි:

- `register(backend)` හරහා පසුඅන්ත **ලියාපදිංචි කරයි** — ආරම්භයේදී `index.ts` වෙතින් කැඳවනු ලැබේ
- `configure(primary, fallbacks)` හරහා ප්රාථමික + විකල්ප පසුඅන්ත **වින්යාස කරයි**
- අසාර්ථක වූ විට විකල්ප දාමය භාවිත කරමින් CRUD/සෙවීම් ප්රාථමික පසුඅන්තයට **මාර්ගගත කරයි**
- සියලු පසුඅන්තවල **සෞඛ්ය පරීක්ෂණ** කාලානුරූපව සිදු කරයි

**විකල්ප ක්රියාකාරීත්වය:**

| මෙහෙයුම  | ප්රාථමිකය                      | විකල්ප                                |
| -------- | ------------------------------ | ------------------------------------- |
| `create` | ✅ ප්රාථමිකය පමණි              | ❌                                    |
| `get`    | ✅ පළමුව ප්රාථමිකය උත්සාහ කරයි | ✅ null නම් විකල්පය                   |
| `update` | ✅ ප්රාථමිකය පමණි              | ✅ ප්රතිඵලය බලා නොසිටින සමමුහුර්තකරණය |
| `delete` | ✅ ප්රාථමිකය පමණි              | ✅ ප්රතිඵලය බලා නොසිටින සමමුහුර්තකරණය |
| `list`   | ✅ ප්රාථමිකය පමණි              | ❌                                    |
| `search` | ✅ පළමුව ප්රාථමිකය             | ✅ දෝෂයකදී විකල්පය                    |

#### GenericMemoryBackend (`genericBackend.ts`)

ඕනෑම REST API එකක් MemoryBackend එකකට අනුවර්තනය කරන සාමාන්ය HTTP සම්බන්ධකයකි. පහත දෑ සඳහා ප්රයෝජනවත් වේ:

- **Notion** — Notion API හරහා සම්බන්ධ කරන්න
- **Obsidian** — Obsidian Local REST API හරහා සම්බන්ධ කරන්න
- **අභිරුචි පසුඅන්ත** — RESTful මතක API එකක් නිරාවරණය කරන ඕනෑම සේවාවක්

**වින්යාසය:**

```typescript
interface GenericBackendConfig {
  baseUrl: string;           // පසුඅන්ත API හි මූලික URL එක
  apiKey?: string;           // සත්යාපනය සඳහා Bearer ටෝකනය
  headers?: Record<string, string>;  // අභිරුචි HTTP ශීර්ෂක
  timeout?: number;          // ඉල්ලීමේ කාල සීමාව (පෙරනිමිය: 30000ms)
  backendType?: string;      // ලොග් කිරීම සඳහා

  // අන්ත ලක්ෂ්ය අතික්රමණ (පෙරනිමි REST සම්මුතීන් භාවිත කරයි)
  endpoints?: {
    search?: string;   // පෙරනිමිය: "/memories/search"
    create?: string;   // පෙරනිමිය: "/memories"
    list?: string;     // පෙරනිමිය: "/memories"
    get?: string;      // පෙරනිමිය: "/memories/{id}"
    update?: string;   // පෙරනිමිය: "/memories/{id}"
    delete?: string;   // පෙරනිමිය: "/memories/{id}"
    health?: string;   // පෙරනිමිය: "/health"
  };

  // විමසුම් පරාමිති නාම සිතියම්ගත කිරීම්
  queryParams?: {
    query?/apiKeyId?/limit?/offset?/strategy?/maxTokens?/type?/sessionId?/orderBy?/orderDir?/options?
  };

  // මාර්ග පරාමිති නාම සිතියම්ගත කිරීම්
  pathParams?: {
    id?/memoryId?
  };
}
```

**දන්නා පසුඅන්ත** `KNOWN_BACKENDS` තුළ පූර්ව-වින්යාස කර ඇත:

```typescript
createKnownBackend("obsidian"); // → localhost:27123 වෙත යොමු කළ GenericMemoryBackend
createKnownBackend("notion"); // → api.notion.com/v1 වෙත යොමු කළ GenericMemoryBackend
```

#### අන්තර්ගත පසුඅන්ත

##### SQLiteBackend (`sqliteBackend.ts`)

පෙරනිමි ප්රාථමික පසුඅන්තයයි. `src/lib/memory/store.ts` භාවිතයෙන් පවතින SQLite-පාදක මතක ගබඩාව ආවරණය කරයි. ආරම්භයේදී ස්වයංක්රීයව ලියාපදිංචි කෙරේ.

```typescript
import { sqliteBackend } from "./sqliteBackend";
memoryManager.register(sqliteBackend);
```

##### ObsidianBackend (`obsidianBackend.ts`)

පවතින Obsidian ඒකාබද්ධතාව (`src/lib/memory/obsidianBackend.ts`) ආවරණය කරයි. Obsidian Local REST API හරහා Obsidian vault එකකට සම්බන්ධ වෙයි.

### සැකසුම්

මතක පසුඅන්ත සැකසුම් යෙදුම් සැකසුම් වගුවේ ගබඩා කර ඇති අතර `src/lib/memory/settings.ts` හරහා කළමනාකරණය කෙරේ:

| සැකසුම            | පරිසර/වින්යාස යතුර       | පෙරනිමිය   | විස්තරය                                   |
| ----------------- | ------------------------ | ---------- | ----------------------------------------- |
| ප්රාථමික පසුඅන්තය | `memoryPrimaryBackend`   | `"sqlite"` | ප්රාථමික පසුඅන්තයේ ID එක                  |
| විකල්ප පසුඅන්ත    | `memoryFallbackBackends` | `[]`       | අනුපිළිවෙළට සකස් කළ විකල්ප පසුඅන්ත ID     |
| පසුඅන්ත වින්යාස   | `memoryBackendConfigs`   | `{}`       | එක් එක් පසුඅන්තය සඳහා වන වින්යාස අතික්රමණ |

සැකසුම් `normalizeMemorySettings()` හරහා සාමාන්යකරණය කර `getMemorySettings()` හි නිහිත කරනු ලැබේ.

### ආරම්භක ප්රවාහය

```
යෙදුම ඇරඹීම
  → index.ts ආයාත කිරීම් (අතුරු ප්රතිඵලයක් ලෙස): SQLiteBackend ලියාපදිංචි කරයි
  → යෙදුමේ ජීවන චක්රයෙන් initMemoryBackends() කැඳවනු ලැබේ:
      1. සැකසුම් පූරණය කරන්න (getMemorySettings)
      2. ප්රාථමික + විකල්ප පසුඅන්ත වින්යාස කරන්න
      3. සියලු පසුඅන්ත ආරම්භ කරන්න (සෞඛ්ය පරීක්ෂාව)
      4. ඉල්ලීම් සඳහා සූදානම්
```

### නව පසුඅන්තයක් එක් කිරීම

1. `src/lib/memory/<name>Backend.ts` තුළ **`MemoryBackend` අතුරුමුහුණත ක්රියාත්මක කරන්න**
2. `src/lib/memory/index.ts` වෙතින් **නිර්යාත කරන්න**
3. ආරම්භයේදී `memoryManager.register(yourBackend)` සමඟ **ලියාපදිංචි කරන්න**
4. සැකසුම් හරහා **වින්යාස කරන්න**: `memoryPrimaryBackend` ඔබේ පසුඅන්ත ID එකට සකසන්න
5. `src/lib/memory/__tests__/generic-backend.test.ts` යොමුවක් ලෙස භාවිතයෙන් **පරීක්ෂා කරන්න**

#### උදාහරණය: Brain පසුඅන්තය

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

### සත්යාපනය

#### ඒකක පරීක්ෂණ

```bash
npx vitest run src/lib/memory/__tests__/generic-backend.test.ts --reporter=verbose
```

අපේක්ෂිත ප්රතිදානය: පහත කරුණු ආවරණය කරන **පරීක්ෂණ 35ක්, සියල්ල සමත්**:

- නිර්මාපකය (2)
- සෞඛ්ය පරීක්ෂාව (4) — සාර්ථකත්වය, 500 අසාර්ථකත්වය, ජාල දෝෂය, ප්රමාදය
- ආරම්භ කිරීම (2) — සාර්ථකත්වය, අසාර්ථකත්වය
- නිර්මාණය කිරීම (2) — පෙරනිමි අන්ත ලක්ෂ්යය, අභිරුචි අන්ත ලක්ෂ්යය
- ලබා ගැනීම (4) — සාර්ථකත්වය, 404 → null, 404 නොවන අවස්ථාවක throw කිරීම, අභිරුචි මාර්ග පරාමිති
- යාවත්කාලීන කිරීම (2) — සාර්ථකත්වය, 404 → false
- මකා දැමීම (2) — සාර්ථකත්වය, 404 → false
- ලැයිස්තුගත කිරීම (2) — විමසුම් පරාමිති, අභිරුචි පරාමිති නාම
- සෙවීම (3) — විමසුම් පරාමිති, අභිරුචි අන්ත ලක්ෂ්යය, විකල්ප ශ්රේණිගතකරණය
- සත්යාපන ශීර්ෂක (2) — Bearer ටෝකනය, අභිරුචි ශීර්ෂක
- Factory (1)

#### වර්ග පරීක්ෂාව

```bash
npm run typecheck:core
```

අපේක්ෂිත ප්රතිඵලය: **දෝෂ 0යි**.
