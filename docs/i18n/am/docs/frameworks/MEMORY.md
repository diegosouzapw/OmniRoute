# Memory System (አማርኛ)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/MEMORY.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/MEMORY.md) · 🇦🇿 [az](../../../az/docs/frameworks/MEMORY.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/MEMORY.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/MEMORY.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/MEMORY.md) · 🇩🇰 [da](../../../da/docs/frameworks/MEMORY.md) · 🇩🇪 [de](../../../de/docs/frameworks/MEMORY.md) · 🇬🇷 [el](../../../el/docs/frameworks/MEMORY.md) · 🇪🇸 [es](../../../es/docs/frameworks/MEMORY.md) · 🇪🇪 [et](../../../et/docs/frameworks/MEMORY.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/MEMORY.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/MEMORY.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/MEMORY.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/MEMORY.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/MEMORY.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/MEMORY.md) · 🇮🇱 [he](../../../he/docs/frameworks/MEMORY.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/MEMORY.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/MEMORY.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/MEMORY.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/MEMORY.md) · 🇮🇩 [id](../../../id/docs/frameworks/MEMORY.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/MEMORY.md) · 🇮🇹 [it](../../../it/docs/frameworks/MEMORY.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/MEMORY.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/MEMORY.md) · 🇰🇭 [km](../../../km/docs/frameworks/MEMORY.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/MEMORY.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/MEMORY.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/MEMORY.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/MEMORY.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/MEMORY.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/MEMORY.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/MEMORY.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/MEMORY.md) · 🇲🇲 [my](../../../my/docs/frameworks/MEMORY.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/MEMORY.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/MEMORY.md) · 🇳🇴 [no](../../../no/docs/frameworks/MEMORY.md) · 🇮🇳 [or](../../../or/docs/frameworks/MEMORY.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/MEMORY.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/MEMORY.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/MEMORY.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/MEMORY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/MEMORY.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/MEMORY.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/MEMORY.md) · 🇱🇰 [si](../../../si/docs/frameworks/MEMORY.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/MEMORY.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/MEMORY.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/MEMORY.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/MEMORY.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/MEMORY.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/MEMORY.md) · 🇮🇳 [te](../../../te/docs/frameworks/MEMORY.md) · 🇹🇭 [th](../../../th/docs/frameworks/MEMORY.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/MEMORY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/MEMORY.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/MEMORY.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/MEMORY.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/MEMORY.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/MEMORY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/MEMORY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/MEMORY.md)

---

> **የእውነት ምንጭ፦** `src/lib/memory/` እና `src/app/api/memory/`
> **ለመጨረሻ ጊዜ የዘመነው፦** 2026-06-28 — v3.8.40 (በነባሪ የተሰናከለ + የ int8 quantization ማሟያ)

OmniRoute በAPI ቁልፍ (እና እንደ አማራጭ በክፍለ-ጊዜ መታወቂያ) የሚለይ ቋሚ የውይይት ማህደረ ትውስታ ያቀርባል።
ትውስታዎች ቀላል የregex ስርዓተ-ጥለት ማዛመድን በመጠቀም ከLLM ምላሾች
በራስ-ሰር ይወጣሉ፣ ከዚያም የመጀመሪያ የስርዓት መልዕክት ሆነው ወደ ቀጣይ
ጥያቄዎች ይካተታሉ (ወይም የስርዓት ሚናን ለማይቀበሉ አቅራቢዎች
እንደ መጀመሪያው የተጠቃሚ መልዕክት ይካተታሉ)።

> **ማህደረ ትውስታ በነባሪ ተሰናክሏል (v3.8.30+)።** `DEFAULT_MEMORY_SETTINGS.enabled`
> አሁን `false` ነው (`src/lib/memory/settings.ts`)። ማህደረ ትውስታን ማንቃት
> እስከ `maxTokens` (~2k) የተመለሰ ዐውድ በ**እያንዳንዱ** የውይይት ጥያቄ ውስጥ
> ያካትታል፣ ለዚህም ክፍያ ይከፈላል — ይህ ለአዲስ ጭነቶች እና የራሳቸውን
> ዐውድ ለሚያስተዳድሩ ደንበኞች ያልተጠበቀ ወጪ ነው። በ**Settings → Memory** ስር
> በግልጽ ያንቁት (`MemorySkillsTab` ማህደረ ትውስታ ሲነቃ የቶከን ወጪ ማስጠንቀቂያ
> ጥሪ ያሳያል)። አንድ ደንበኛ የ`x-omniroute-no-memory`
> የጥያቄ ራስጌን (`true`/`1`/`yes`) በመጠቀም አንድን ጥያቄ ከዚህ ማስወጣት
> ይችላል — በ[API_REFERENCE.md](../reference/API_REFERENCE.md) ውስጥ ያለውን የጥያቄ-ራስጌ ሰንጠረዥ
> ይመልከቱ። ማህደረ ትውስታ የሌለው ጥያቄ `memoryOwnerId = null` ያዘጋጃል፣ ይህም
> ለዚያ ጥያቄ **ሁለቱንም** የማህደረ ትውስታ እና የክህሎት ማካተትን ያሰናክላል
> (`open-sse/handlers/chatCore/headers.ts::isNoMemoryRequested`)።

ማህደረ ትውስታው **በእያንዳንዱ API ቁልፍ የተወሰነ** እንጂ በተጠቃሚ የተወሰነ አይደለም — በተመሳሳይ
API ቁልፍ የተረጋገጠ እያንዳንዱ ጥያቄ ተመሳሳይ የማህደረ ትውስታ ስብስብን ይጋራል፣
እንደ አማራጭም በ`sessionId` የበለጠ ሊወሰን ይችላል።

## አርክቴክቸር

```
ደንበኛ → /v1/chat/completions (apiKeyInfo በቅድሚያ ተፈቷል)
  → handleChatCore() [open-sse/handlers/chatCore.ts]
    → resolveMemoryOwnerId(apiKeyInfo)        # መታወቂያውን ያወጣል
    → getMemorySettings()                     # የተሸጎጡ ቅንብሮች
    → shouldInjectMemory(body, {enabled})     # መቆጣጠሪያ
    → retrieveMemories(apiKeyId, config)      # SQL + FTS5 + እንደ አማራጭ vector
    → injectMemory(body, memories, provider)  # የስርዓት ወይም የተጠቃሚ መልዕክት
  → ወደ ውጫዊ አቅራቢ ጥሪ
  → በምላሹ ጊዜ፦ extractFacts(text, apiKeyId, sessionId)  # የማያግድ
    → setImmediate → createMemory(fact) ለእያንዳንዱ ማዛመድ
                   → embed(content) + upsertVector(id, vec)
```

የማካተት እና የማውጣት ጥሪ ቦታዎች በ
`open-sse/handlers/chatCore.ts` ውስጥ ተገናኝተዋል (`retrieveMemories`፣ `injectMemory`
እና `extractFacts`ን ይፈልጉ)።

## የሞተር አርክቴክቸር (ባለ3-ደረጃ መፍትሔ)

የማህደረ ትውስታ ሞተሩ በሚገኙ መሠረተ ልማቶች እና ቅንብሮች መሠረት
በስራ ላይ ባለበት ጊዜ የሰርስሮ ማውጣት መንገዱን ይወስናል። በቅድሚያ ቅደም ተከተል
የሚተገበሩ ሦስት ደረጃዎች አሉ፦

```
  ┌─────────────────────────────────────────────────────────────┐
  │  ደረጃ 0 — ቁልፍ ቃል (FTS5)                                 │
  │  በፍተሻ የሚወሰን ተገኝነት፦ የSQLite ግንባታው               │
  │  ሲደግፈው FTS5 (better-sqlite3 / node:sqlite / bun:sqlite)፤│
  │  FTS5 በሌላቸው ግንባታዎች (ለምሳሌ sql.js/WASM —             │
  │  "no such module: fts5") ላይ አይገኝም። strategy = "exact"   │
  │  ሲሆን ወይም እንደ አማራጭ መመለሻ ይጠቀማል፤ የengine-status  │
  │  keyword ፍተሻውን ያንጸባርቃል።                            │
  └──────────────────────────────────┬──────────────────────────┘
                                     │ strategy = semantic|hybrid?
                                     ▼
  ┌─────────────────────────────────────────────────────────────┐
  │  ደረጃ 1 — የተካተተ Vector (sqlite-vec)                       │
  │  sqlite-vec v0.1.9 በdb.loadExtension() ይጫናል።             │
  │  በFloat32 vectors ላይ KNN brute-force። ንቁ የሚሆነው፦       │
  │   • sqlite-vec loadExtension ሲሳካ                            │
  │   • Float32Array ማምረት የሚችል የembedding ምንጭ              │
  │     (remote | static | transformers) ሲገኝ                   │
  │   • vec_memories ሰንጠረዥ ሲኖር (በመጀመሪያው ready() ይፈጠራል)│
  └──────────────────────────────────┬──────────────────────────┘
                                     │ qdrant.enabled?
                                     ▼
  ┌─────────────────────────────────────────────────────────────┐
  │  ደረጃ 2 — Qdrant (በምርጫ የሚነቃ ውጫዊ vector database)      │
  │  ሲነቃ ለsemantic/hybrid sqlite-vecን ይተካል።                 │
  │  እየሰራ ያለ Qdrant instance + የተዋቀረ host/port ይፈልጋል።  │
  └─────────────────────────────────────────────────────────────┘
```

ወደ ዝቅተኛ ደረጃ መመለስ ራስ-ሰር እና ግልጽ ነው፦

- sqlite-vec መጫን ካልቻለ፣ ደረጃ 1 አይገኝም → ወደ ደረጃ 0 ይመለሳል።
- የembedding ምንጩ ስህተት ከመለሰ፣ ደረጃ 1 ወደ ደረጃ 0 ይመለሳል።
- Qdrant ጤናማ ካልሆነ፣ ደረጃ 2 ወደ ደረጃ 1 ይመለሳል (ወይም ደረጃ 1ም
  የማይገኝ ከሆነ ወደ ደረጃ 0 ይመለሳል)።

## የEmbedding ምንጮች

የembedding ንብርብሩ (`src/lib/memory/embedding/`) በ`MemorySettingsExtended.embeddingSource` ላይ ተመስርቶ የትኛውን ምንጭ መጠቀም እንዳለበት ይወስናል፦

| ምንጭ            | መግለጫ                                                                                 | ቁልፍ ያስፈልጋል | የመጀመሪያ ማስነሻ      |
| -------------- | ------------------------------------------------------------------------------------ | ---------- | ---------------- |
| `remote`       | የተዋቀረ አቅራቢ embedding APIን ይጠቀማል (OpenAI፣ Cohere፣ ወዘተ)                                | አዎ         | የለም              |
| `static`       | በ`potion-base-8M` በኩል የሚከናወን አካባቢያዊ የፍለጋ-ሰንጠረዥ embedding (WordPiece + አማካይ pooling)  | አይ         | ~200ms           |
| `transformers` | በ`@huggingface/transformers` v4፣ `all-MiniLM-L6-v2` በኩል የሚከናወን አካባቢያዊ ONNX inference | አይ         | ~3s + ~400MB RAM |
| `auto`         | በruntime ጊዜ መወሰን፦ remote (ቁልፍ ካለ) → static → transformers → null                     | እንደሁኔታው    | እንደሁኔታው          |

**የ`auto` መወሰኛ ቅደም ተከተል፦**

1. በ`listEmbeddingProviders()` ውስጥ `hasKey === true` የሆነውን የመጀመሪያ አቅራቢ ያግኙ → `remote`።
2. `settings.staticEnabled === true` ከሆነ → `static`።
3. `settings.transformersEnabled === true` ከሆነ → `transformers`።
4. ካልሆነ → `null` (ወደ FTS5 ቁልፍ-ቃል ፍለጋ ዝቅ ይላል)።

የembedding cache (`src/lib/memory/embedding/cache.ts`) በ`${source}:${model}:${dim}:${sha256(text)}` ቁልፍ የሚሰጠውን በማህደረ ትውስታ ውስጥ ያለ LRU map ይጠቀማል፤ በ`MEMORY_EMBEDDING_CACHE_MAX` ግቤቶች (ነባሪው 1000) የተገደበ ሲሆን TTL ደግሞ `MEMORY_EMBEDDING_CACHE_TTL_MS` (ነባሪው 5 ደቂቃ) ነው። በአንድ process lifecycle ውስጥ በሁሉም ጠሪዎች መካከል ይጋራል።

## ድብልቅ RRF (k=60)

`strategy = "hybrid"` ሲሆን እና vector store ሲገኝ፣ retrieval የFTS5 እና vector ውጤቶችን ለማዋሃድ Reciprocal Rank Fusionን ይጠቀማል፦

```
RRF(d) = Σ  1 / (k + rank_i(d))      k = 60 ሲሆን (በMEMORY_RRF_K ሊዋቀር ይችላል)
          i
```

በተግባር፦

1. የFTS5 ፍለጋን ያስኪዱ → ደረጃ የተሰጠው ዝርዝር `R_fts` (ቦታ 1..N)።
2. የKNN vector ፍለጋን ያስኪዱ → ደረጃ የተሰጠው ዝርዝር `R_vec` (ቦታ 1..M)።
3. ለእያንዳንዱ ልዩ `memoryId`፦  
   `rrf_score = 1/(60 + fts_rank)` + `1/(60 + vec_rank)` (በዝርዝሩ ውስጥ ከሌለ 0)።
4. በ`rrf_score` DESC ደርድሩ፣ የtoken budget ቅኝቱን ይተግብሩ።

RRF በልዩ ልዩ retrieval systems መካከል የውጤት መደበኛነት ሳያስፈልገው ውጤታማ እንደሆነ በሰፊው ይታወቃል። ነባሪው `k=60` ከመጀመሪያው የCormack et al. ጥናታዊ ጽሑፍ የተወሰደ ሲሆን ለአነስተኛ corpora (<10k ትውስታዎች) ጥሩ ይሰራል።

## Backfill (lazy + reindex)

የembedding model ሲቀየር (በ`embedding_signature` በኩል ይገኛል)፣ vector store እንደገና ይገነባል እና ሁሉም ነባር ትውስታዎች በ`memories` ሰንጠረዥ ውስጥ `needs_reindex = 1` ተብለው ምልክት ይደረግባቸዋል።

**Lazy backfill**፦ በሚቀጥለው retrieval ጊዜ፣ vector ግቤት የሌለው ማንኛውም ትውስታ ፍለጋው ከመከናወኑ በፊት embed ተደርጎ ወደ `vec_memories` ይገባል። ይህ ማስነሻውን ሳያግድ የbackfill ወጪውን በእውነተኛ ጥያቄዎች ላይ ያከፋፍላል።

**ግልጽ reindex**፦ በ`/dashboard/memory` ውስጥ ያለው Engine tab `POST /api/memory/reindex`ን የሚጠራ "አሁን Reindex አድርግ" የሚል አዝራር ያቀርባል። handlerው `src/lib/memory/reindex.ts` ውስጥ ያለውን `runReindexBatch()` ይጠራል፤ ይህም በእያንዳንዱ ጥያቄ እስከ `limit` የሚደርሱ በመጠባበቅ ላይ ያሉ ግቤቶችን ያስኬዳል። ሂደቱ በ`GET /api/memory/engine-status` (`vectorStore.needsReindex`) በኩል በተደጋጋሚ ሊፈተሽ ይችላል።

የ`memory_vec_meta` ሰንጠረዥ (migration `083_memory_vec.sql`) የሚከተሉትን ያከማቻል፦

- `active_dim` — የአሁኑ vector dimension (null = ገና አልተስተካከለም)።
- `embedding_signature` — ለውጦችን ለማግኘት የሚያገለግል `${source}:${model}:${dim}`።
- `last_reset_at` — የመጨረሻው ሙሉ reset timestamp።
- `vec_loaded` — sqlite-vec በተሳካ ሁኔታ መጫኑን የሚያሳይ 0/1 flag።

## የቅንብሮች ቅጥያ

ዘጠኝ የመክተቻና የቬክተር መስኮች በ`MemorySettingsExtended` ውስጥ
በ`src/shared/schemas/memory.ts` ይገኛሉ፣ በ`src/lib/db/settings.ts` በኩልም በቋሚነት ይቀመጣሉ፦

| መስክ                      | ዓይነት                                               | ነባሪ      | መግለጫ                                                   |
| ------------------------ | -------------------------------------------------- | -------- | ------------------------------------------------------ |
| `embeddingSource`        | `"remote" \| "static" \| "transformers" \| "auto"` | `"auto"` | የትኛውን የመክተቻ ምንጭ መጠቀም እንዳለበት                            |
| `embeddingProviderModel` | `string \| null`                                   | `null`   | አቅራቢ/ሞዴል በ`provider/model` ቅርጸት                        |
| `customBaseUrl`          | `string \| null`                                   | `null`   | ለMemory ብቻ የሚያገለግል OpenAI-ተኳሃኝ የመዳረሻ ነጥብ መሠረታዊ URL     |
| `customModelId`          | `string \| null`                                   | `null`   | ወደ ብጁ የመዳረሻ ነጥቡ የሚላክ የሞዴል ID                           |
| `transformersEnabled`    | `boolean`                                          | `false`  | ለTransformers.js የፈቃድ መርጦ መግባት (MiniLM፣ ~400MB)        |
| `staticEnabled`          | `boolean`                                          | `false`  | ለስታቲክ potion-base-8M አካባቢያዊ ሞዴል የፈቃድ መርጦ መግባት          |
| `rerankEnabled`          | `boolean`                                          | `false`  | የዳግም ደረጃ ማውጣት ደረጃን ማንቃት (በእያንዳንዱ ጥያቄ +200-500ms ይጨምራል) |
| `rerankProviderModel`    | `string \| null`                                   | `null`   | የዳግም ደረጃ ማውጣት አቅራቢ/ሞዴል በ`provider/model` ቅርጸት          |

`rerankProviderModel` በ`POST /v1/rerank` (በloopback በኩል የሚጠራ) ይፈታል፤ ስለዚህ ያ መንገድ የሚቀበለውን ማንኛውንም ነገር ይቀበላል፦ የተመረጠ የደመና ዳግም-ደረጃ ማውጫ ሞዴል (`cohere/rerank-v3.5`፣ `jina-ai/jina-reranker-v3.5`፣ …) ወይም OpenAI-ተኳሃኝ የአቅራቢ ኖድ እንደ `<node-prefix>/<model>` (ለምሳሌ፣ ለTEI/Infinity ሳጥን `skilled-mini/bge-reranker-v2-m3`)። Loopback ኖዶች ሁልጊዜ ብቁ ናቸው፤ በሌላ አስተናጋጅ (LAN፣ Tailscale) ላይ ያለ ኖድ በተጨማሪ የ`RERANK_REMOTE_PROVIDER_NODES` ባህሪ ሰንደቅን ይፈልጋል፣ እንዲሁም የአቅራቢውን ወጪ URL ፖሊሲ ማለፍ አለበት — [የባህሪ ሰንደቆች](../reference/FEATURE_FLAGS.md)ን ይመልከቱ። የዳሽቦርዱ መራጭ የተመረጡ አቅራቢዎችንና አካባቢያዊ ኖዶችን ይዘረዝራል፤ ማንኛውም ትክክለኛ `provider/model` ሕብረቁምፊ በ`PUT /api/settings/memory` በኩል በቀጥታ ሊዋቀር ይችላል።
| `vectorStore` | `"sqlite-vec" \| "qdrant" \| "auto"` | `"auto"` | የትኛውን የቬክተር ጀርባ አገልግሎት መጠቀም እንዳለበት |

እነዚህ በ`GET /PUT /api/settings/memory` (ስኪማ `MemorySettingsExtendedSchema`) በኩል ይቀርባሉ።

ለ`remote` ምንጭ፣ Memory አማራጭ የሆኑትን `customBaseUrl` እና
`customModelId` ቅንብሮችም ይቀበላል። ሁለቱ በአንድነት፣ ዓለም አቀፉን የመክተቻ መዝገብ ሳይቀይሩ OpenAI-ተኳሃኝ የ`/embeddings`
መዳረሻ ነጥብና ሞዴል ይመርጣሉ። የመዳረሻ ነጥቡ ከመጠቀሙ በፊት
መደበኛ ይደረጋል፣ እንዲሁም በአቅራቢው ወጪ URL ፖሊሲ ይፈተሻል፦ HTTP(S)
ያስፈልጋል፣ የተካተቱ ማረጋገጫዎችና የጥያቄ ሕብረቁምፊዎች ውድቅ ይደረጋሉ፣ እንዲሁም የደመና-ሜታዳታ
አድራሻዎች እንደታገዱ ይቆያሉ። ባዶ እሴቶች የተመረጠውን የመዝገብ አቅራቢ እንዳለ ያቆያሉ። ወደ
ዳሽቦርዱ የሚመለሱ ስህተቶች ከስሱ መረጃ ይጸዳሉ፣ የመዳረሻ ነጥብ ማረጋገጫዎችም በፍጹም አይመዘገቡም።

> **TODO (D20)፦** `global` ወሰን (በሁሉም API ቁልፎች መካከል ትውስታዎችን ማጋራት)
> በዚህ ልቀት ውስጥ አልተተገበረም። የስኪማ ለውጦችንና ዓለም አቀፍ የመልሶ ማግኛ
> መንገድን ይፈልጋል። በተናጠል ይከታተሉት።

## የማከማቻ ንብርብሮች

### ዋና፦ SQLite (`memories` table)

በmigration `015_create_memories.sql` የተፈጠረ፦

| ዓምድ                         | ዓይነት               | ማስታወሻዎች                                                        |
| --------------------------- | ------------------ | -------------------------------------------------------------- |
| `id`                        | `TEXT PRIMARY KEY` | በ`crypto.randomUUID()` የሚፈጠር UUID                              |
| `api_key_id`                | `TEXT NOT NULL`    | ባለቤት የሆነው API key                                              |
| `session_id`                | `TEXT`             | አማራጭ የውይይት-ተኮር scope                                           |
| `type`                      | `TEXT NOT NULL`    | ከ`factual`፣ `episodic`፣ `procedural`፣ `semantic` አንዱ           |
| `key`                       | `TEXT`             | የተረጋጋ upsert key፣ ለምሳሌ `preference:i_prefer_python`            |
| `content`                   | `TEXT NOT NULL`    | ትክክለኛው የእውነታ ጽሑፍ                                               |
| `metadata`                  | `TEXT`             | JSON blob (category, extractedAt, source, ...)                 |
| `created_at` / `updated_at` | `TEXT`             | ISO 8601 strings                                               |
| `expires_at`                | `TEXT`             | አማራጭ የማብቂያ ጊዜ፤ `NULL` ቋሚ ማለት ነው                                |
| `memory_id`                 | `INTEGER UNIQUE`   | UUIDs ↔ FTS5 rowids ለማገናኘት በ`023_fix_memory_fts_uuid.sql` የታከለ |

Indexes፦ `api_key_id`፣ `session_id`፣ `type`፣ `expires_at`፣ እንዲሁም ልዩ
የ`memory_id` index።

**የUpsert ባህሪ**፦ `createMemory()` ተመሳሳይ `(api_key_id, key)` ያለውን ነባር row
ይፈልጋል፣ ሲያገኘውም በቦታው ላይ ያዘምነዋል (`metadata`ን በshallow spread
በማዋሃድ)። ይህ ተደጋጋሚ የምርጫ መግለጫዎች ሲኖሩ table ያለገደብ እንዳያድግ
ያደርጋል።

### የሙሉ ጽሑፍ ፍለጋ (`memory_fts` virtual table)

`022_add_memory_fts5.sql` በ`content` እና `key` ላይ FTS5 virtual table ይፈጥራል።
`023_fix_memory_fts_uuid.sql` የUUID primary key ከFTS5 integer rowid ጋር የማይገናኝበትን
በተግባር የታየ ስህተት ያስተካክላል — migration የ`memory_id` ዓምድን ይጨምራል፣
የFTS tableን እንደገና ይፈጥራል፣ እና INSERT፣ DELETE እና UPDATE ሲደረጉ FTSን
የተመሳሰለ እንዲያቆዩ የሚያደርጉ triggers
(`memory_fts_ai`, `memory_fts_ad`, `memory_fts_au`) ያገናኛል።

በ`retrieval.ts` ውስጥ ለ`semantic` እና `hybrid` strategies ጥቅም ላይ ይውላል
(ከታች ይመልከቱ)። የretrieval code በ`hasTable("memory_fts")` ማረጋገጫ ያደርጋል፣
እና የFTS table ከሌለ ወይም የFTS query ስህተት ካስነሳ ወደ ቅደም ተከተላዊ የጊዜ
አደራደር ይመለሳል።

### አማራጭ፦ Qdrant (vector store tier 2)

`src/lib/memory/qdrant.ts` እንደ tier 2 vector store አማራጭ የQdrant ውህደትን
ይተገብራል። Retrieval ወደ Qdrant የሚመራው የengine selector
`memoryVectorStore === "qdrant"` ሲሆን ብቻ ነው — ነባሪው `"auto"` (እና
`"sqlite-vec"`) Qdrantን **ፈጽሞ** አይመርጥም። የEngine-tab toggle **ሁለቱንም**
`qdrantEnabled` እና `memoryVectorStore` በአንድነት ያቀናብራል፦ ማንቃት Qdrantን
ዋና store ያደርገዋል፣ ማሰናከል ደግሞ ወደ `"auto"` ይመልሰዋል (#5597 — ከዚያ
ማስተካከያ በፊት ምንም ነገር የengine selectorን ስለማይጽፍ ማንቃቱ ውጤት አልነበረውም)።
Qdrant የማይደረስ ከሆነ ወይም ምንም ውጤት ካልመለሰ፣ retrieval ወደ
sqlite-vec → FTS5 ይመለሳል።

- `upsertSemanticMemoryPoint()` — በተዋቀረው embedding model `key + content`-ን embed ያደርጋል፣ collection-ው መኖሩን ያረጋግጣል (በመጀመሪያ አጠቃቀም cosine-distance vectors ይፈጥራል)፣ እና payload `{memoryId,
apiKeyId, sessionId, key, content, metadata, createdAtUnix, expiresAtUnix}` ያለውን point upsert ያደርጋል።
- `searchSemanticMemory(query, topK, scope)` — query-ውን embed ያደርጋል፣ በ`kind = "omniroute_memory"` እና እንደ አማራጭ በ`apiKeyId` / `sessionId` የተጣራውን collection ይፈልጋል። `topK`-ን በ`[1, 20]` ውስጥ ይገድባል።
- `deleteSemanticMemoryPoint(id)` — አንድ point ይሰርዛል። የSQLite row ከተወገደ በኋላ በ`deleteMemory()` ይጠራል (D15)።
- `cleanupSemanticMemoryPoints({retentionDays})` — `expiresAtUnix` ጊዜው ያለፈ ወይም `createdAtUnix` ከretention cutoff በላይ ያረጀባቸውን points በጅምላ ይሰርዛል። dashboard-ው ትክክለኛዎቹን ቁጥሮች ማሳየት እንዲችል መጀመሪያ ይቆጥራል።
- `checkQdrantHealth()` — latencyን ያካተተ `GET /readyz` የጤንነት ምርመራ።

የsettings UI የQdrant config፣ የጤንነት ምርመራ፣ የsemantic search ሙከራ እና cleanupን በ`/dashboard/memory` **Engine tab** ውስጥ ያቀርባል። በ`src/app/api/settings/qdrant/` ስር ያሉት ተጓዳኝ routes ከv3.8.6 ጀምሮ ሁሉም ተገናኝተዋል፦

| Route                                   | ዘዴ            | መግለጫ                          |
| --------------------------------------- | ------------- | ----------------------------- |
| `/api/settings/qdrant`                  | `GET` / `PUT` | የQdrant settingsን ማንበብ / ማዘመን |
| `/api/settings/qdrant/health`           | `GET`         | የLiveness ምርመራ + latency      |
| `/api/settings/qdrant/search`           | `POST`        | የSemantic search ሙከራ          |
| `/api/settings/qdrant/cleanup`          | `POST`        | ጊዜያቸው ያለፈ / ያረጁ pointsን ማስወገድ |
| `/api/settings/qdrant/embedding-models` | `GET`         | ያሉትን embedding models መዘርዘር   |

**የባህሪ ማስታወሻዎች (ምን እንደሚጠበቅ)፦**

- **Engine selection** — በEngine tab ውስጥ Qdrantን ማንቃት ዋናው store ያደርገዋል (`memoryVectorStore="qdrant"` ያዘጋጃል)፤ ማሰናከል ወደ `"auto"` ይመልሰዋል (#5597)።
- **No back-fill** — Qdrant ከነቃ **በኋላ** የተፈጠሩ/የተዘመኑ memories ብቻ ወደ እሱ ይጻፋሉ (fire-and-forget dual-write)። ቀድሞ የነበሩ SQLite memories **አይዛወሩም**፤ "Reindex Now" የsqlite-vec indexን ብቻ ነው እንደገና የሚገነባው፣ Qdrantን አይደለም።
- **Vector dimension በራስ-ሰር ይለያል**፤ ይህም በመጀመሪያ አጠቃቀም ከትክክለኛው embedding ይወሰዳል — የሚሞላ dimension field የለም። collection ከተፈጠረ በኋላ embedding modelን መቀየር **በራስ-ሰር** አይስተናገድም፦ ያለው collection ሳይነካ ይቀራል፣ dimension የማይዛመድባቸው writes/searches ይሳናሉ እና ወደ sqlite-vec fallback ያደርጋሉ። embeddersን ለመቀየር collection-ውን እንደገና ይፍጠሩ (አዲስ ስም ይጠቀሙ ወይም በQdrant ውስጥ ይሰርዙት)።
- **Distance metric** — ሁልጊዜ **Cosine** ነው (collection ሲፈጠር hardcoded ነው፤ ሊዋቀር አይችልም)።
- **Auth** — API key ብቻ (እንደ `api-key` header ይላካል፤ authentication ለማይጠቀም local Docker አማራጭ ነው)። JWT/RBAC ጥቅም ላይ አይውሉም።
- **Config fields** — UI-ው `host`፣ `port`፣ `collection`፣ `embeddingModel`፣ `apiKey`ን ያቀርባል። `vectorSize` / `hnswEfConstruct` በenv/DB ብቻ ይገኛሉ፣ እና `vectorSize` collectionን ለመፍጠር ጥቅም ላይ አይውልም (dimension-ው ከembedding ይመጣል)።

### Vector quantization (int8 — በምርጫ የሚነቃ፣ ለሁለቱም backends)

ሁለቱም vector backends የተከማቹ vectors የmemory footprintን ለመቀነስ (~ከFloat32 4× ያነሰ) በትንሽ የrecall ኪሳራ **በምርጫ የሚነቃ int8 quantization** ይደግፋሉ። በሁለቱም ላይ default-ው **off** ነው — በግልጽ ካልነቃ vectors ሙሉ precision ይዘው ይቆያሉ።

| Backend    | Setting                         | ዓይነት                           | Default  | የሚነበብበት ቦታ                                                  |
| ---------- | ------------------------------- | ------------------------------ | -------- | ----------------------------------------------------------- |
| Qdrant     | `qdrantQuantization` (DB key)   | `"none" \| "int8" \| "binary"` | `"none"` | `src/lib/memory/qdrant.ts::normalizeQdrantConfig()`         |
| sqlite-vec | `MEMORY_VEC_QUANTIZATION` (env) | `"none" \| "int8"`             | `"none"` | `src/lib/memory/vectorStore.ts::requestedVecQuantization()` |

- **Qdrant** በ`qdrantQuantization` setting key በኩል ለእያንዳንዱ instance ይዋቀራል (በ`PUT /api/settings/qdrant` ላይ እንደ `quantization` field ይቀርባል)። `"int8"` ሲሆን፣ `buildQuantizationConfig()` scalar quantization (`always_ram`፣ quantile `0.99`) ይጠይቃል፣ እና ሙሉ-precision vectors የint8 candidate setን እንዲያጣሩ searches `rescore: true`ን ያነቃሉ።
- **sqlite-vec** quantization **በenvironment ብቻ** ነው (የDB setting አይደለም)፦ local vectorsን በ`vec_quantize_int8(?, 'unit')` በኩል እንደ `int8[dim]` column ለማከማቸት `MEMORY_VEC_QUANTIZATION=int8`ን ያዘጋጁ። የተመረጠው mode በ`embedding_signature` ውስጥ (`:int8` suffix) ይካተታል፤ ስለዚህ modesን መቀየር የ`vec_memories` table ሙሉ reindexን ያስነሳል — embedding model ሲቀየር ጥቅም ላይ ከሚውለው lazy-backfill path ጋር ተመሳሳይ ነው።

## የማህደረ ትውስታ ዓይነቶች

`MemoryType` (`src/lib/memory/types.ts`):

| ዓይነት         | ጥቅም ላይ የሚውለው                                                   |
| ------------ | -------------------------------------------------------------- |
| `factual`    | ምርጫዎች፣ የማይለዋወጡ የተጠቃሚ መረጃዎች፣ የባህሪ ቅጦች                           |
| `episodic`   | ከተወሰነ ጊዜ ጋር የተያያዙ ውሳኔዎች ("I chose Postgres")                   |
| `procedural` | የሥራ ሂደት / እንዴት-እንደሚደረግ ማህደረ ትውስታ (የተያዘ፤ በአሁኑ ጊዜ ራስ-ሰር አውጪ የለም) |
| `semantic`   | ለ vector-store ግቤቶች የተያዘ                                       |

የ`MemoryConfig` ማምጫ ስልት ከ`exact`፣ `semantic`፣ ወይም `hybrid` አንዱ ሲሆን፣
ወሰኑም ከ`session`፣ `apiKey`፣ ወይም `global` አንዱ ነው። ከ
`getMemorySettings()` የሚመጣው ነባሪ ወሰን `apiKey` ነው።

## የእውነታ ማውጣት (`extraction.ts`)

ማውጣቱ **በregex ላይ የተመሠረተ** እንጂ በLLM ላይ የተመሠረተ አይደለም — በሂደቱ ውስጥ
በ`setImmediate()` ይሠራል፣ ስለዚህ የምላሽ ዥረቱን ፈጽሞ አያግድም፦

- **የምርጫ ቅጦች** → `MemoryType.FACTUAL`
  (ለምሳሌ `I prefer …`፣ `I really like …`፣ `my favorite is …`፣ `I hate …`)
- **የውሳኔ ቅጦች** → `MemoryType.EPISODIC`
  (ለምሳሌ `I'll use …`፣ `I chose …`፣ `I went with …`፣ `I'm going to adopt …`)
- **የልማድ ቅጦች** → `MemoryType.FACTUAL`
  (ለምሳሌ `I usually …`፣ `I always …`፣ `I tend to …`)

እያንዳንዱ ተዛማጅ ይጸዳል (`trim`፣ የነጭ ቦታ ማጣበቅ፣ እስከ 500 ቁምፊዎች
መገደብ)፣ በቋሚ `factKey(category, content)` አማካኝነት በቡድኑ ውስጥ
የተደጋገሙት ይወገዳሉ፣ እና በ`createMemory()` በኩል ከ
`{category, extractedAt, source: "llm_response"}` ሜታዳታ ጋር ይከማቻሉ። የግቤት ጽሑፉ
በ64 KiB (`MAX_EXTRACTION_TEXT_LENGTH`) ይገደባል — ከዚህ በላይ ሲሆን፣
በቅርብ ጊዜ የተፈጠረው የረዳት ይዘት ሁልጊዜ እንዲካተት የጽሑፉ **መጨረሻ** ጥቅም ላይ ይውላል።

`extractFactsFromText(text)` ለሙከራዎች ወደ ውጭ ይላካል፣ እና ሳያከማቻቸው
የተዋቀሩትን እውነታዎች ይመልሳል።

## ማምጣት (`retrieval.ts`)

`retrieveMemories(apiKeyId, config)` ዋናው የመግቢያ ነጥብ ነው። ይህ፦

1. ውቅሩን በ`MemoryConfigSchema` በኩል መደበኛ ያደርገዋል እና ያረጋግጠዋል።
2. `enabled` false ሲሆን ወይም `maxTokens <= 0` ሲሆን ወዲያውኑ `[]` ይመልሳል።
3. `maxTokens`ን በ`[1, 8000]` ክልል ውስጥ ይገድባል።
4. የቆዩ የውሂብ ጎታዎች እንደቀድሞው መሥራታቸውን እንዲቀጥሉ፣ ዘመናዊው `memories` ሰንጠረዥ
   መኖሩን (ከቀድሞው `memory` ሰንጠረዥ ጋር በማነጻጸር) ይለያል።
5. የማብቂያ ጊዜ ጥበቃ
   (`expires_at IS NULL OR datetime(expires_at) > datetime('now')`)፣ አማራጭ
   የክፍለ-ጊዜ ወሰን፣ እና አማራጭ የ`retentionDays` መቁረጫ ያለውን መሠረታዊ ጥያቄ ይገነባል።
6. በስልቱ መሠረት ቅርንጫፍ ይመርጣል፦
   - **`exact`** (ነባሪ)፦ በጊዜ ቅደም ተከተል `ORDER BY created_at DESC LIMIT 100`።
   - **`semantic`**፦ `config.query` ካለ እና `memory_fts` ካለ፣
     `memory_fts MATCH ?`ን JOIN አድርጎ በFTS ደረጃ ያዛል፤ FTS 0 ረድፎችን ሲመልስ
     ወደ ጊዜ ቅደም ተከተል ይመለሳል።
   - **`hybrid`**፦ የFTS ውጤቶችን (ከፍተኛ ተዛማጅነት ያላቸውን) እና
     በጊዜ ቅደም ተከተል የተዘጋጀውን ስብስብ ያዋህዳል፣ በid የተደጋገሙትንም ያስወግዳል።
7. ጥያቄ ሲቀርብ በ`content`፣ `key`፣ እና `metadata` JSON ላይ
   የቁልፍ ቃል ተዛማጅነት ውጤት (`getRelevanceScore`) ያሰላል። ውጤታቸው
   ዜሮ የሆኑ ረድፎች ይጣራሉ።
8. በውጤት ከከፍተኛ ወደ ዝቅተኛ፣ ከዚያም በ`createdAt` ከአዲስ ወደ አሮጌ ይደረድራል።
9. በደረጃ የተደረደረውን ዝርዝር በተከታታይ በማለፍ፣ እየተደመረ የሚሄደው
   `estimateTokens(content)` (≈ `length / 4`) ከበጀቱ በታች እስከቆየ ድረስ ግቤቶችን
   ይቀበላል። ማንኛውም ተዛማጅ ሲኖር ሁልጊዜ ቢያንስ አንድ ግቤት ይመልሳል።

`estimateTokens` ወደ ውጭ ይላካል፣ እና በማምጣት፣ በማጠቃለል፣ እና በMCP
`omniroute_memory_search` መሣሪያ ጥቅም ላይ ይውላል።

## ማስገባት (`injection.ts`)

`injectMemory(request, memories, provider)`:

1. ሁሉንም የማህደረ ትውስታ ይዘቶች ወደ አንድ `Memory context: …` ሕብረቁምፊ ያጣምራል።
2. በአቅራቢው ስም መሠረት ስልት ይመርጣል፦
   - **የስርዓት መልዕክት** (ለOpenAI፣ Anthropic፣ Gemini፣ … ነባሪ) — የተጠቃሚው የስርዓት መጠየቂያዎች አሁንም ቅድሚያ እንዲኖራቸው፣
     `{role: "system", content: memoryText}`ን ከማናቸውም ነባር የስርዓት
     መልዕክቶች በፊት ያስገባል።
   - **የተጠቃሚ መልዕክት** (የመጠባበቂያ አማራጭ) — በ
     `PROVIDERS_WITHOUT_SYSTEM_MESSAGE` ውስጥ ላሉ አቅራቢዎች፦ `o1`፣ `o1-mini`፣ `o1-preview`፣
     `glm`፣ `glmt`፣ `glm-cn`፣ `zai`፣ `qianfan`። እነዚህ የስርዓት ሚናውን ውድቅ
     ያደርጋሉ፤ አለበለዚያ 400 ስህተት ይመልሳሉ (ለGLM/Zhipu issue #1701ን ይመልከቱ)።
3. ብዛቱን፣ ስልቱን እና ሞዴሉን በ`memory.injection.injected` ስር ይመዘግባል።

`providerSupportsSystemMessage(provider)` የራሳቸውን የማዘዋወር ውሳኔዎች ማድረግ ለሚያስፈልጋቸው
ጠሪዎች ወደ ውጭ ይላካል። ያልታወቁ አቅራቢዎች ለደህንነት ሲባል በነባሪ `true`
(የስርዓት ሚና የተፈቀደ) ይጠቀማሉ።

## ቅንብሮች (`settings.ts`)

የማህደረ ትውስታ ውቅር በenv vars ውስጥ ሳይሆን **በDB ቅንብሮች ሰንጠረዥ ውስጥ ይከማቻል**።
`getMemorySettings()` ከ`getSettings()` ያነባል እና ውጤቱን
በሂደቱ ውስጥ በመሸጎጫ ያስቀምጣል፤ ከመጻፍ በኋላ በቅንብሮች PUT
መስመር `invalidateMemorySettingsCache()` ይጠራል።

### የቆዩ መስኮች (ሁሉም ስሪቶች)

| DB ቁልፍ                | ዓይነት    | ነባሪ                                              | የUI መቆጣጠሪያ                                           |
| --------------------- | ------- | ------------------------------------------------ | ---------------------------------------------------- |
| `memoryEnabled`       | boolean | `false` (ከv3.8.30 ጀምሮ በነባሪ ጠፍቷል)                 | ማህደረ ትውስታ ማብራት/ማጥፋት                                  |
| `memoryMaxTokens`     | integer | `2000` (ክልል `0–16000`)                           | ለማስገባት የቶከን በጀት                                      |
| `memoryRetentionDays` | integer | `30` (ክልል `1–365`)                               | የማቆያ ጊዜ መስኮት                                         |
| `memoryStrategy`      | enum    | `"hybrid"` (ከ`recent`፣ `semantic`፣ `hybrid` አንዱ) | የሰርስሮ ማውጣት ስልት                                       |
| `skillsEnabled`       | boolean | `false`                                          | በቁልፍ የሚደረግ የክህሎት ማስገባትን ያበራል/ያጠፋል (SKILLS.mdን ይመልከቱ) |

ማስታወሻ፦ የUI ስልት `"recent"` በ`toMemoryRetrievalConfig()` በኩል ወደ ውስጣዊው `"exact"` የሰርስሮ ማውጣት
ስልት ይዛመዳል (በጊዜ ቅደም ተከተል)።

### አዲስ መስኮች (v3.8.6፣ plan 21 D9)

ለመስኮች መግለጫዎች ከላይ ያለውን "የቅንብሮች ቅጥያ" ክፍልም ይመልከቱ።

| DB ቁልፍ                      | የAPI መስክ                 | ነባሪ      |
| --------------------------- | ------------------------ | -------- |
| `memoryEmbeddingSource`     | `embeddingSource`        | `"auto"` |
| `memoryEmbeddingModel`      | `embeddingProviderModel` | `null`   |
| `memoryTransformersEnabled` | `transformersEnabled`    | `false`  |
| `memoryStaticEnabled`       | `staticEnabled`          | `false`  |
| `memoryRerankEnabled`       | `rerankEnabled`          | `false`  |
| `memoryRerankModel`         | `rerankProviderModel`    | `null`   |
| `memoryVectorStore`         | `vectorStore`            | `"auto"` |

ከQdrant ጋር የተያያዙ DB ቁልፎች (`qdrantEnabled`፣ `qdrantHost`፣ `qdrantPort`፣
`qdrantApiKey`፣ `qdrantCollection` ነባሪ `"omniroute_memory"`፣
`qdrantEmbeddingModel` ነባሪ `"openai/text-embedding-3-small"`) በ
`qdrant.ts` ውስጥ ባለው `normalizeQdrantConfig()` ይነበባሉ።

### የአካባቢ ተለዋዋጮች (v3.8.6)

ስድስት አማራጭ env vars የኤንጂኑን የአሂድ ጊዜ ባህሪ ያስተካክላሉ (በ`.env.example` ውስጥ ተመዝግበዋል)፦

| ተለዋዋጭ                           | ነባሪ                        | መግለጫ                                                                                                                 |
| ------------------------------- | -------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `MEMORY_EMBEDDING_CACHE_TTL_MS` | `300000`                   | የembedding መሸጎጫ TTL (5 ደቂቃ)                                                                                          |
| `MEMORY_EMBEDDING_CACHE_MAX`    | `1000`                     | በembedding LRU መሸጎጫ ውስጥ ከፍተኛው የግቤቶች ብዛት                                                                              |
| `MEMORY_TRANSFORMERS_MODEL`     | `Xenova/all-MiniLM-L6-v2`  | ለTransformers.js ሞዴል የHF ማከማቻ                                                                                        |
| `MEMORY_STATIC_MODEL`           | `minishlab/potion-base-8M` | ለስታቲክ potion ሞዴል የHF ማከማቻ                                                                                            |
| `MEMORY_STATIC_CACHE_DIR`       | `<DATA_DIR>/embeddings`    | የወረዱ ሞዴሎች የሚከማቹበት                                                                                                    |
| `MEMORY_VEC_TOP_K`              | `20`                       | ለvector ፍለጋ ነባሪ top-K                                                                                                |
| `MEMORY_RRF_K`                  | `60`                       | ለhybrid ፍለጋ የRRF k ቋሚ                                                                                                |
| `MEMORY_VEC_QUANTIZATION`       | `none`                     | የአካባቢያዊ sqlite-vec vectorsን በquantized መልክ ለማከማቸት ወደ `int8` ያቀናብሩ (~4× ያነሰ፤ በምርጫ የሚነቃ)። ሁነታውን መቀየር ዳግም መጠቆምን ያስገድዳል። |

## ማጠቃለያ (`summarization.ts`)

`summarizeMemories(apiKeyId, sessionId?, maxTokens = 4000)` በአንድ ቁልፍ ትውስታዎች ውስጥ ያለው አጠቃላይ የቶከን ብዛት ከተመደበው ገደብ ሲያልፍ የቆየውን
ይዘት ያመቃል። ረድፎቹን በ`created_at` መሠረት DESC ቅደም ተከተል ይዞ ይደጋገማል፣ ከገደቡ ጋር የሚጣጣሙትን ረድፎች ያቆያል፣ ለቀሩት ደግሞ
`content`ን በቦታው በዋናው ይዘት የመጀመሪያ ሦስት ዓረፍተ ነገሮች ይተካል። `tokensSaved` በድሮው እና
በአዲሱ ይዘት መካከል ያለው የ`estimateTokens` ልዩነት ነው።

ይህ ሂደት **ይገኛል፣ ነገር ግን አሁን ባለው የውይይት ፓይፕላይን ውስጥ በራስ-ሰር አይጠራም** — ቀጣይነት ያለው ማመቅ ካስፈለገዎት ከcron፣ ከአስተዳዳሪ ድርጊት ወይም
ከ`MemoryConfig.autoSummarize` ማገናኛ ይጥሩት። የውሂብ
መጥፋቱ የአንድ አቅጣጫ ነው፤ ዋናው ጽሑፍ ተደርቦ ይጻፋል።

## REST API

ሁሉም መዳረሻዎች የአስተዳደር ማረጋገጫ (`requireManagementAuth`) ይፈልጋሉ።

### ዋና የትውስታ መዳረሻዎች (ነባር + የተዘመኑ)

| ዘዴ       | ዱካ                   | መግለጫ                                                                                                                                                                    |
| -------- | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `GET`    | `/api/memory`        | ገጽ የተከፋፈለ ዝርዝር ከማጣሪያዎች ጋር፦ `apiKeyId`፣ `type`፣ `sessionId`፣ `q`፣ `limit`፣ `page`፣ `offset`። ምላሹ `stats.total`፣ `stats.tokensUsed`፣ `stats.hitRate`፣ `cacheStats`ን ያካትታል |
| `POST`   | `/api/memory`        | ግቤት ይፍጠሩ (በZod የተረጋገጠ፦ `content`፣ `key`፣ አማራጭ `type`፣ `sessionId`፣ `apiKeyId`፣ `metadata`፣ `expiresAt`)። በ`(apiKeyId, key)` ላይ upsert የሚያደርገውን `createMemory()` ይጠራል    |
| `GET`    | `/api/memory/[id]`   | በUUID አንድ ግቤት ያምጡ                                                                                                                                                       |
| `PUT`    | `/api/memory/[id]`   | የግቤቱን መስኮች (`type`፣ `key`፣ `content`፣ `metadata`) ያዘምኑ። አካል፦ `MemoryUpdatePutSchema`። የembedding ምንጭ ካለ ቬክተሩንም ያመሳስላል።                                                  |
| `DELETE` | `/api/memory/[id]`   | ግቤትን ይሰርዙ፤ ከ`vec_memories` (D15) እና ከQdrantም በሚቻለው መጠን ይሰርዛል። ካልተገኘ 404 ይመልሳል።                                                                                          |
| `GET`    | `/api/memory/health` | `verifyExtractionPipeline("health-check")`ን ያስኬዳል — ሙሉ ዑደት ፍጠር→ዘርዝር→ሰርዝ። `{working, latencyMs, error?}`ን ይመልሳል                                                          |

### አዲስ የትውስታ ሞተር መዳረሻዎች (ዕቅድ 21)

| ዘዴ     | ዱካ                                | መግለጫ                                                                                                                             |
| ------ | --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `POST` | `/api/memory/retrieve-preview`    | የ`retrieveMemories` የሙከራ ሂደት — በውጤት ነጥብ፣ ደረጃ እና ቶከኖች የተሰናዱ ውጤቶችን ይመልሳል። አካል፦ `RetrievePreviewSchema`። ትውስታዎችን አያስገባም ወይም አያሻሽልም። |
| `GET`  | `/api/memory/embedding-providers` | የትኞቹ የተዋቀረ API ቁልፍ እንዳላቸው በማመልከት፣ አቅራቢዎችን ከembedding ሞዴሎች ጋር ይዘረዝራል።                                                             |
| `GET`  | `/api/memory/engine-status`       | ሙሉ የሞተሩን ሁኔታ ይመልሳል፦ የቁልፍ ቃል ደረጃ፣ የembedding ውሳኔ፣ የቬክተር ማከማቻ ስታቲስቲክስ፣ የQdrant ጤና፣ የrerank ውቅር። ቅርጽ፦ `MemoryEngineStatusSchema`።   |
| `POST` | `/api/memory/summarize`           | የትውስታ ማመቅን በእጅ ያስጀምሩ። አካል፦ `MemorySummarizeSchema` (`olderThanDays`፣ `apiKeyId?`፣ `dryRun`)። `{candidates, tokensSaved}`ን ይመልሳል። |
| `POST` | `/api/memory/reindex`             | `needs_reindex=1` ላላቸው ትውስታዎች የቬክተር ዳግም መረጃ ጠቋሚ ማዘጋጀትን ያስጀምሩ። አካል፦ `MemoryReindexSchema` (`force`)። `{started, pending}`ን ይመልሳል። |

### የቅንብሮች መዳረሻዎች

| ዘዴ     | ዱካ                                      | መግለጫ                                                                                      |
| ------ | --------------------------------------- | ----------------------------------------------------------------------------------------- |
| `GET`  | `/api/settings/memory`                  | የአሁኑ ደረጃውን የጠበቀ `MemorySettingsExtended` (7 አዲስ መስኮች + የቆየ)                               |
| `PUT`  | `/api/settings/memory`                  | ከ`MemorySettingsExtendedSchema` ውስጥ ማንኛውንም መስክ ያዘምኑ (በድምሩ 12 መስኮች)                        |
| `GET`  | `/api/settings/qdrant`                  | የአሁኑ የQdrant ቅንብሮች (`QdrantSettingsSchema`)                                               |
| `PUT`  | `/api/settings/qdrant`                  | የQdrant ቅንብሮችን ያዘምኑ። አካል፦ `QdrantSettingsUpdateSchema`። `apiKey` = ባዶ ሕብረቁምፊ ቁልፉን ያስወግዳል። |
| `GET`  | `/api/settings/qdrant/health`           | በተዋቀረው የQdrant አብነት ላይ የህያውነት ምርመራ ያካሂዳል። `QdrantHealthResultSchema`ን ይመልሳል።              |
| `POST` | `/api/settings/qdrant/search`           | በQdrant ላይ የትርጉም ፍለጋ ሙከራ ያካሂዳል። አካል፦ `QdrantSearchSchema` (`query`፣ `topK`)።              |
| `POST` | `/api/settings/qdrant/cleanup`          | ጊዜያቸው ላለፈ / ለቆዩ ትውስታዎች የQdrant ነጥቦችን ያስወግዱ።                                               |
| `GET`  | `/api/settings/qdrant/embedding-models` | ለQdrant የሚገኙትን embedding ሞዴሎች ይዘርዝሩ።                                                      |

የ`/api/memory` ዝርዝር መጠይቅ በ`page` ላይ የተመሠረተ ገጽ ክፍፍልን
(`parsePaginationParams`) **ወይም** ጥሬ `offset`ን ይደግፋል — `offset` ካለ
ቅድሚያ ይወስዳል፣ እና ለምላሹ ቅርጽ የተሰላ `page` ይፈጠራል።

## MCP መሣሪያዎች (`open-sse/mcp-server/tools/memoryTools.ts`)

MCP አገልጋዩ ሲነቃ፣ ሦስት የማህደረ ትውስታ መሣሪያዎች ይመዘገባሉ፦

- `omniroute_memory_search` — `{apiKeyId, query?, type?, maxTokens?, limit?}`
  → `retrieveMemories()`ን ይጠቀልላል። ከv3.8.6 (D16) ጀምሮ፣ `strategy`
  በቋሚነት ወደ `"exact"` ከመቀመጥ ይልቅ ከ`getMemorySettings()` ይነበባል።
  `query` ከቀረበ እና `strategy` `semantic` ወይም `hybrid` ከሆነ፣ ቬክተር
  ማከማቻው ሲኖር ጥቅም ላይ ይውላል።
- `omniroute_memory_add` — `{apiKeyId, sessionId?, type, key, content,
metadata?}` → `createMemory()`ን ይጠቀልላል። 4ቱን መደበኛ ዓይነቶች ብቻ
  ይቀበላል፦ `factual`፣ `episodic`፣ `procedural`፣ `semantic` (D17)።
- `omniroute_memory_clear` — `{apiKeyId, type?, olderThan?}` → የሚዛመዱ
  ግቤቶችን ይዘረዝራል፣ እንደ አማራጭ ከተወሰነ ጊዜ በፊት በተፈጠሩበት
  የጊዜ ማህተም ያጣራል፣ ከዚያም እያንዳንዱን በ`deleteMemory()` ይሰርዛል
  (ይህም ቬክተሮችን ከsqlite-vec + Qdrant ያስወግዳል)።

ስለ ማጓጓዣ እና ወሰን ዝርዝሮች [MCP-SERVER.md](./MCP-SERVER.md)ን ይመልከቱ።

## ዳሽቦርድ (የማህደረ ትውስታ ስቱዲዮ)

`src/app/(dashboard)/dashboard/memory/page.tsx` አሁን **ባለ3-ትር ስቱዲዮ** ነው፦

### ትር፦ ማህደረ ትውስታዎች

- የፅንሰ-ሐሳብ ካርድ (ሊታጠፍ የሚችል «እንዴት እንደሚሠራ» ማብራሪያ)።
- ቅጽበታዊ ዝርዝር፣ ፍለጋ እና ገጽ ክፍፍል (በ300 ms የዘገየ)።
- የዓይነት ማጣሪያ (`factual` / `episodic` / `procedural` / `semantic` / ሁሉም)።
- የማህደረ ትውስታ ማከያ ሞዳል (ቁልፍ፣ ይዘት፣ ዓይነት)።
- በቦታው ላይ ማርትዕ (የእርሳስ አዝራር → `PUT /api/memory/[id]`)።
- በየረድፉ መሰረዝ (ከማረጋገጫ መገናኛ ሳጥን ጋር)።
- የአሁኑን ገጽ ወደ JSON መላክ፤ በፋይል መራጭ በኩል JSON ማስገባት።
- የስታቲስቲክስ ካርዶች፦ `totalEntries`፣ `tokensUsed`፣ `hitRate`።
- «የቆዩትን አጠቃልል» አዝራር → `POST /api/memory/summarize` (በመጀመሪያ
  dry-run የዕጩዎችን ብዛት ያሳያል፣ ከዚያም ማረጋገጫ ይጠይቃል)።
- በ`GET /api/memory/health` የሚመራ አረንጓዴ/ቀይ የጤና ነጥብ።

### ትር፦ የሙከራ መድረክ

- የመጠይቅ ግቤት + የስልት መራጭ (ትክክለኛ / ትርጉማዊ / ድብልቅ) + የቶከን በጀት።
- «አስመስል» → `POST /api/memory/retrieve-preview` — በደረጃ የተደረደሩ
  ውጤቶችን ከ`score`፣ `tier`፣ `tokens`፣ `vecScore`፣ `ftsScore` ጋር ያሳያል።
- የትኛው የመክተቻ ምንጭ / ቬክተር ማከማቻ ጥቅም ላይ እንደዋለ እና
  የአማራጭ መመለሻ መከሰቱን የሚያሳይ የመፍትሔ ፓነል።

### ትር፦ ሞተር

- የሞተር ሁኔታ ፓነል (የቁልፍ ቃል FTS5 ቺፕ፣ የመክተቻ ቺፕ፣ የቬክተር ማከማቻ ቺፕ፣
  የQdrant ጤና ቺፕ፣ የድጋሚ ደረጃ አሰጣጥ ቺፕ)።
- «አሁን ዳግም አውጫ» አዝራር → `POST /api/memory/reindex`።
- የመክተቻ ምንጭ መራጭ (ራስ-ሰር / ሩቅ / የማይለወጥ / transformers + መቀያየሪያዎች)።
- የQdrant ውቅር ካርድ (የማንቃት መቀያየሪያ፣ አስተናጋጅ/ወደብ/ስብስብ/ቁልፍ፣ ግንኙነትን
  መሞከር፣ የትርጉማዊ ፍለጋ ሙከራ፣ ማጽዳት)።
- የድጋሚ ደረጃ አሰጣጥ ውቅር ካርድ (የማንቃት መቀያየሪያ፣ የአቅራቢ/ሞዴል መራጭ)።

የማህደረ ትውስታ እና Qdrant ቅንብሮች ለቀድሞው/ዓለም አቀፍ የቅንብሮች በይነገጽ
በ`/dashboard/settings → Memory & Skills` (`MemorySkillsTab.tsx`) ሥርም ይገኛሉ።

## መሸጎጫ

`src/lib/memory/store.ts` ለ`getMemory(id)` ንባቦች በሂደት ውስጥ ያለ LRU-መሰል
መሸጎጫ (`MEMORY_CACHE_TTL = 1 min`፣ `MEMORY_MAX_CACHE_SIZE = 500`፣ 20 %
ከቆዩት መጀመሪያ በማስወጣት) ይይዛል፤ በተጨማሪም የራሳቸውን ወሰን ያለው መሸጎጫ
መጠቀም በሚፈልጉ ጠሪዎች የሚጠቀሙበት `get`/`set`/`invalidate` ሜተዶች ያሉት
አጠቃላይ የቁልፍ/እሴት `memoryCache` ንብርብር (`src/lib/memory/cache.ts`) አለው
(1 000-ግቤት LRU፣ ነባሪ TTL 5 min)።

## ግላዊነት እና የሕይወት ዑደት

- የማህደረ ትውስታ ባለቤትነት የAPI ቁልፍ መለያ ነው (`resolveMemoryOwnerId` በ
  `chatCore.ts` ውስጥ)። `apiKeyInfo.id` ከሌለ ሰርስሮ ማውጣትም፣ ማስገባትም
  ሆነ ማውጣጣት አይከናወንም።
- ወደፊት የሚያልቅ `expires_at` ያላቸው ግቤቶች ከሰርስሮ ማውጣት ይጣራሉ፤
  ከ`retentionDays` በላይ ያረጁ ግቤቶች በ`retrieveMemories` ውስጥ ባለው
  `created_at >= cutoff` አንቀጽ አይካተቱም።
- ለቋሚ ስረዛ፣ `DELETE /api/memory/[id]` ወይም `omniroute_memory_clear` ይጠቀሙ።
- ማውጣጣት በ`setImmediate` በኩል ውጤቱን ሳይጠብቅ ይከናወናል፤ አለመሳካቶች
  በ`memory.extraction.background.failed` ስር ይመዘገባሉ እና ለጠሪው ፈጽሞ
  አይታዩም።
- የማረጋገጫ ዙር-ጉዞዎች (`verifyExtractionPipeline`) የራሳቸውን
  የሙከራ ግቤቶች በ`finally` ብሎክ ውስጥ ያጸዳሉ።

## በተጨማሪ ይመልከቱ

- [SKILLS.md](./SKILLS.md) — የ`skillsEnabled` ቅንብር ከማህደረ ትውስታ ጎን
  ለጎን የመሣሪያ ትርጓሜዎችን ያስገባል።
- [MCP-SERVER.md](./MCP-SERVER.md) — የMCP ማጓጓዣ / ወሰኖች።
- [API_REFERENCE.md](../reference/API_REFERENCE.md) — የበለጠ ሰፊ የAPI ወሰን።
- የምንጭ ሞጁሎች፦
  - `src/lib/memory/types.ts`, `schemas.ts`
  - `src/lib/memory/store.ts`, `retrieval.ts`, `injection.ts`, `reindex.ts`
  - `src/lib/memory/extraction.ts`, `summarization.ts`, `verify.ts`
  - `src/lib/memory/settings.ts`, `qdrant.ts`, `cache.ts`
  - `src/lib/memory/vectorStore.ts` — sqlite-vec + ዲቃላ RRF
  - `src/lib/memory/embedding/index.ts` — ባለብዙ-ምንጭ የኢምቤዲንግ ንብርብር
  - `src/lib/memory/embedding/types.ts`, `remote.ts`, `staticPotion.ts`,
    `transformersLocal.ts`, `cache.ts`
  - `src/shared/schemas/memory.ts` — ለሁሉም የማህደረ ትውስታ API አካሎች የZod ንድፎች
  - `src/shared/schemas/qdrant.ts` — ለQdrant ቅንብሮች/ክዋኔዎች የZod ንድፎች
  - `src/lib/db/memoryVec.ts` — ለ`memory_vec_meta` CRUD
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
  - `src/app/api/settings/qdrant/route.ts` + ንዑስ-መስመሮች
  - `src/app/(dashboard)/dashboard/memory/` — የStudio UI (ገጽ + ክፍሎች +
    ትሮች + hooks)
  - `open-sse/handlers/chatCore.ts` (የማስገባት / የማውጣጣት ሽቦ አያያዝ)
  - `open-sse/mcp-server/tools/memoryTools.ts`

---

## የኢምቤዲንግ አቅራቢን መምረጥ (v3.8.16+)

የOmniRoute ማህደረ ትውስታ ሞተር **አራት የኢምቤዲንግ ምንጮችን** (`src/lib/memory/embedding/`) ይደግፋል። እያንዳንዳቸው በ**መዘግየት፣ ወጪ፣ የሞዴል ጥራት እና የማዋቀር ውስብስብነት** ረገድ የተለያዩ ሚዛናዊ ምርጫዎች አሏቸው።

### የኢምቤዲንግ ምንጮች

| አቅራቢ           | ምንጭ                                       | መዘግየት                       | ወጪ                 | ጥራት                         | ማዋቀር                           |
| -------------- | ----------------------------------------- | --------------------------- | ------------------ | --------------------------- | ------------------------------ |
| `transformers` | አካባቢያዊ ONNX ሞዴል (Xenova/all-MiniLM-L6-v2) | ~50-150ms (CPU)             | ነጻ                 | ጥሩ                          | `npm install` ብቻ               |
| `static`       | አስቀድሞ የተሰሉ ቬክተሮች (የተሸጎጡ)                  | <1ms                        | ነጻ                 | አይመለከተውም (በመሸጎጫ መገኘት ይወሰናል) | ምንም                            |
| `remote`       | OpenAI / Cohere / Voyage API              | ~100-300ms                  | $0.02-0.10/1M ቶከኖች | እጅግ በጣም ጥሩ                  | API ቁልፍ                        |
| `auto`         | በአሂድ ጊዜ የሚገኘውን ምርጥ ምንጭ ይመርጣል              | ከተመረጠው ምንጭ ጋር ተመሳሳይ         | ነጻ                 | ከተመረጠው ምንጭ ጋር ተመሳሳይ         | ምንም                            |
| _(cache)_      | በማንኛውም ምንጭ ላይ ያለ የማህደረ ትውስታ ውስጥ LRU ንብርብር | <1ms (ሲገኝ)፣ ሙሉ መዘግየት (ሳይገኝ) | ነጻ                 | ከመሠረታዊው ጋር ተመሳሳይ            | ሁልጊዜ ክፍት (ሊመረጥ የሚችል ምንጭ አይደለም) |

### የውሳኔ ዛፍ

```
                  የማሰማሪያ አውድዎ ምንድን ነው?
                  │
      ┌───────────┼───────────┬──────────────┐
      │           │           │              │
  ልማት/ሙከራ    አነስተኛ ፕሮድ   ትልቅ ፕሮድ    ጠርዝ / ከመስመር ውጭ
      │           │           │              │
      ▼           ▼           ▼              ▼
  transformers transformers remote (Qdrant) transformers
  (ነጻ፣ API የለም)            (ምርጥ ጥራት)   (በይነመረብ የለም)
      │           │           │              │
      └────────┬──┴───────────┴──────────────┘
               │
               ▼
            ሁልጊዜ `cache` ንብርብርን ከላይ ያክሉ
            (LruCache ማንኛውንም አቅራቢ ይጠቀልላል)
```

### የውሂብ ጎታ እና API ውቅር

የማህደረ ትውስታ ኢምቤዲንግ አማራጮች የሚዋቀሩት በSettings API/UI በኩል እንጂ በአካባቢ ተለዋዋጮች አይደለም። በSettings ስር ያሉት አግባብነት ያላቸው የቅንብር ውሂብ ጎታ ቁልፎች (`normalizeMemorySettings` በ`src/lib/memory/settings.ts` ውስጥ) እነዚህ ናቸው፦

- `memoryEmbeddingSource`: `"transformers"` (አካባቢያዊ)፣ `"remote"` (በAPI ላይ የተመሠረተ፣ ለምሳሌ OpenAI)፣ `"static"` (ውጫዊ ማከማቻ)፣ ወይም `"auto"`
- `memoryEmbeddingProviderModel`: ለremote/static ምንጮች የሞዴል መለያ (ለምሳሌ፣ `"text-embedding-3-small"`)
- `memoryTransformersEnabled`: `true` | `false`
- `memoryStaticEnabled`: `true` | `false`
- `memoryVectorStore`: `"sqlite-vec"`, `"qdrant"`, ወይም `"auto"`

#### አካባቢያዊ ሞዴል (`transformers`)

አካባቢያዊ ሞዴሎችን ለማስኬድ transformers.jsን በውስጥ ይጠቀማል፦

```bash
# በኮዱ ውስጥ የሚነበቡ የአካባቢ ተለዋዋጮች (src/lib/memory/embedding/index.ts):
MEMORY_TRANSFORMERS_MODEL=Xenova/all-MiniLM-L6-v2  # የHF ሞዴል ማከማቻ
MEMORY_STATIC_MODEL=minishlab/potion-base-8M       # የHF static potion ሞዴል
MEMORY_STATIC_CACHE_DIR=<DATA_DIR>/embeddings      # የመሸጎጫ ማውጫ
```

#### የLRU ኢምቤዲንግ መሸጎጫ

መሸጎጫው በነባሪነት ሁልጊዜ ክፍት ሲሆን በአካባቢ ተለዋዋጮች በኩል ይዋቀራል፦

```bash
MEMORY_EMBEDDING_CACHE_MAX=1000                    # ከፍተኛው የተሸጎጡ ንጥሎች ብዛት
MEMORY_EMBEDDING_CACHE_TTL_MS=300000               # TTL (5 ደቂቃ)
```

### የአፈጻጸም ቁጥሮች

በተለመደ ባለ 4-ኮር x86 ሰርቨር ላይ የተደረገ የአፈጻጸም መለኪያ (እያንዳንዱ ጽሑፍ ~100 ቶከኖች)፦

| አቅራቢ                 | p50   | p95   | p99   | የ1M embeddings ወጪ                  |
| -------------------- | ----- | ----- | ----- | ---------------------------------- |
| `transformers` (CPU) | 80ms  | 180ms | 350ms | ነጻ                                 |
| `remote` (OpenAI)    | 120ms | 220ms | 400ms | ~$0.02 (ada-002) / $0.13 (3-large) |
| `static` (Qdrant)    | 15ms  | 30ms  | 60ms  | በQdrant ማስተናገጃ ላይ ይወሰናል            |
| `cache` (የተገኘ)       | <1ms  | <1ms  | 2ms   | ነጻ                                 |

---

## የእውነታ ማውጣት ንድፎች (v3.8.16+)

የ`extraction.ts` ሞጁል (`src/lib/memory/extraction.ts`) ከውይይት መልዕክቶች የተዋቀሩ እውነታዎችን ለማውጣት **የregex ንድፍ ማዛመድን** ይጠቀማል። እነዚህን ንድፎች መረዳት ለአጠቃቀም ሁኔታዎ የማውጣት ጥራትን እንዲያስተካክሉ ይረዳዎታል።

### ነባሪ የንድፍ ምድቦች

| ምድብ                 | የንድፍ ምሳሌ                                                    | የሚይዘው                |
| ------------------- | ----------------------------------------------------------- | -------------------- |
| PREFERENCE_PATTERNS | `"I prefer <X>"`, `"I like <X>"`, `"I hate <X>"`            | የተጠቃሚ ምርጫዎች          |
| DECISION_PATTERNS   | `"I'll use <X>"`, `"I decided to <X>"`, `"I went with <X>"` | የተጠቃሚ ውሳኔዎች (ክስተታዊ)  |
| PATTERN_PATTERNS    | `"I usually <X>"`, `"I always <X>"`, `"I never <X>"`        | ቀጣይነት ያላቸው የባህሪ ንድፎች |

### የንድፍ ምሳሌዎች (ቀለል የተደረጉ)

```ts
// ከ src/lib/memory/extraction.ts
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

### ምን ይወጣል

አንድ ተጠቃሚ እንዲህ ሲል፦

> "TypeScriptን እመርጣለሁ። ለዚህ ፕሮጀክት Postgresን እጠቀማለሁ። ከመግፋቴ በፊት ሁልጊዜ commit አደርጋለሁ። Pythonን አልወድም።"
> ማውጣቱ 4 ትውስታዎችን ያመነጫል፦
>
> | ቁልፍ                                  | ምድብ | ዓይነት  | ይዘት                     |
> | ------------------------------------ | --- | ----- | ----------------------- |
> | `preference:typescript`              | ምርጫ | እውነታዊ | "TypeScript"            |
> | `decision:postgres_for_this_project` | ውሳኔ | ክስተታዊ | "Postgres ለዚህ ፕሮጀክት"    |
> | `pattern:commit_before_pushing`      | ንድፍ | እውነታዊ | "ከመግፋት በፊት commit ማድረግ" |
> | `preference:python`                  | ምርጫ | እውነታዊ | "Python"                |

### የማውጣት ገደቦች

ከቁጥጥር ውጪ የሆነ ማውጣትን ለመከላከል፣ የሚከተሉት ገደቦች ተፈጻሚ ይሆናሉ፦

| ዝቅተኛው የይዘት ርዝመት | 3 ቁምፊዎች |
| ከፍተኛው የይዘት ርዝመት | 500 ቁምፊዎች |

### ማውጣትን መቼ ማሰናከል እንዳለብዎት

ትውስታ በነቃ ቁጥር ማውጣቱ በራስ-ሰር ይሠራል፤ የተለየ
ማውጣት-ብቻ መቀያየሪያ የለም። ለማጥፋት፣ ትውስታን ሙሉ በሙሉ ያሰናክሉ (`enabled: false`
በ`PUT /api/settings/memory` በኩል)። በሚከተሉት ሁኔታዎች ይህን ማድረግ ያስቡበት፦

- ከፍተኛ የመልዕክት መጠን ሲኖርዎት እና የማውጣቱ ወጪ ቀላል የማይባል ሲሆን
- ውይይቶችዎ አብዛኛውን ጊዜ ጊዜያዊ (ውይይት፣ ማረም) እና የረጅም ጊዜ ዋጋ የሌላቸው ሲሆኑ
- አውድን አስቀድመው በብጁ ተሰኪዎች እየመዘገቡ ከሆነ

---

## የድብልቅ RRF ማስተካከያ (v3.8.16+)

የ**Reciprocal Rank Fusion (RRF)** ስልተ ቀመር የFTS5 (ቁልፍ ቃል) እና የvector (ትርጉማዊ) ውጤቶችን ያጣምራል። የ`k` መለኪያ ዝቅተኛ ደረጃ ላላቸው ውጤቶች ምን ያህል ክብደት እንደሚሰጥ ይቆጣጠራል።

### ቀመሩ

ለእያንዳንዱ እጩ ትውስታ፣ የRRF ነጥብ፦

```
RRF(d) = Σ  1 / (k + rank_i(d))
```

ይህም፦

- `k` ቋሚው ነው (ነባሪ 60)
- `rank_i(d)` በiኛው የመልሶ ማግኛ ሥርዓት (FTS፣ vector) ውስጥ የሰነድ `d` ደረጃ ነው
- ድምሩ በሁሉም የመልሶ ማግኛ ሥርዓቶች ላይ ይከናወናል

### `k` ውጤቶችን እንዴት እንደሚነካ

| የ`k` ዋጋ          | ተጽዕኖ                                                               | ተስማሚ የሆነው                        |
| ---------------- | ------------------------------------------------------------------ | -------------------------------- |
| `k=0`            | ንጹሕ የደረጃ ውህደት (ማለስለስ የለም)                                          | የንድፈ ሐሳብ መነሻ                     |
| `k=10-30`        | ከፍተኛ ውጤቶችን በከፍተኛ ሁኔታ ይመዝናል፣ ዝቅተኛ ደረጃ ያለው የሚያበረክተው በጣም ትንሽ ነው       | ከፍተኛዎቹ 3 ውጤቶች ብዙውን ጊዜ ትክክል ሲሆኑ   |
| **`k=60`** (ነባሪ) | ሚዛናዊ — ከፍተኛዎቹ 10 ውጤቶች ሁሉ ትርጉም ባለው ሁኔታ ያበረክታሉ                       | ለአጠቃላይ ዓላማ መልሶ ማግኘት              |
| `k=100+`         | ይበልጥ ጠፍጣፋ — ዝቅተኛ ደረጃ ያላቸው ውጤቶች እንኳ በብዙ ሥርዓቶች ውስጥ ከታዩ የበላይ ሊሆኑ ይችላሉ | recall > precision ወሳኝ በሚሆንበት ጊዜ |

### `k`ን በተግባር ማስተካከል

```bash
# ነባሪ
MEMORY_RRF_K=60

# ከፍተኛ precision (አነስተኛ ትውስታ፣ ጥቂት ሰነዶች)
MEMORY_RRF_K=20

# ከፍተኛው recall (ትልቅ ትውስታ፣ የተለያዩ ጥያቄዎች)
MEMORY_RRF_K=120
```

**`k=20` ያለው ምሳሌ፦**

- FTS ደረጃ 1 → አስተዋጽኦ `1/21 = 0.048`
- FTS ደረጃ 10 → አስተዋጽኦ `1/30 = 0.033`
- Vector ደረጃ 1 → አስተዋጽኦ `0.048`
- ከፍተኛው ጥምር፦ `0.096`

**`k=60` ያለው ምሳሌ፦**

- FTS ደረጃ 1 → አስተዋጽኦ `1/61 = 0.016`
- FTS ደረጃ 10 → አስተዋጽኦ `1/70 = 0.014`
- Vector ደረጃ 1 → አስተዋጽኦ `0.016`
- ከፍተኛው ጥምር፦ `0.033`

ከፍ ያለ `k` ሲኖር፣ በከፍተኛ-1 እና በደረጃ-10 መካከል ያለው **አንጻራዊ ልዩነት** አነስተኛ ይሆናል፤ ስለዚህ ስልተ ቀመሩ ከከፍተኛ ደረጃ እምነት ይልቅ **በመልሶ ማግኛ ሥርዓቶች መካከል ባለ ስምምነት** ላይ የበለጠ ይመረኮዛል።

### `k`ን መቼ መቀየር እንዳለብዎት

| ምልክት                                         | ይህን ይሞክሩ                                                 |
| -------------------------------------------- | -------------------------------------------------------- |
| ከፍተኛው ውጤት ሁልጊዜ ያሸንፋል፣ ግን የተሳሳተ ነው            | kን **ዝቅ ያድርጉ** (ለምሳሌ፣ 20) — የከፍተኛ ደረጃ እምነት የበለጠ አስፈላጊ ነው |
| ትክክለኛው መልስ ከከፍተኛዎቹ 5 ውስጥ ነው፣ ግን ከፍተኛ-1 አይደለም | kን **ከፍ ያድርጉ** (ለምሳሌ፣ 100) — ጠፍጣፋ የነጥብ አሰጣጥ ስምምነትን ይሸልማል |
| Recall ከፍተኛ ነው፣ ግን precision ዝቅተኛ ነው         | kን **ዝቅ ያድርጉ** — ደረጃ አሰጣጡን ያጥሩ                           |
| Recall ዝቅተኛ ነው (ተዛማጅ ሰነዶች ጠፍተዋል)             | kን **ከፍ ያድርጉ** — ዝቅተኛ ደረጃ ላላቸው ሰነዶች ዕድል ይስጡ              |

### የRRF ክብደት አሰጣጥ

Reciprocal rank fusion ለትርጉማዊ vector ደረጃ እና ለሙሉ-ጽሑፍ ፍለጋ ደረጃ እኩል ክብደቶችን ይጠቀማል፦

```
RRF(d) = 1/(k + rank_vector) + 1/(k + rank_fts)
```

የእያንዳንዱን ክብደት ለማስተካከል የሚያስችሉ የአካባቢ ተለዋዋጮች የሉም (`MEMORY_RRF_VECTOR_WEIGHT`/`MEMORY_RRF_FTS_WEIGHT` አይኖሩም)።

---

## የማጠቃለያ ስልት (v3.8.16+)

የ`summarization.ts` ሞጁል (`src/lib/memory/summarization.ts`) የንቁ ስብስቡን መጠን አነስተኛ ለማድረግ፣ የማስታወስ ችሎታን እንደጠበቀ የቆዩ ትውስታዎችን ይጨምቃል።

### ማጠቃለያ የሚጀመርበት ጊዜ

| አስጀማሪ              | ገደብ (ነባሪ) |
| ------------------ | --------- |
| በAPI በኩል በእጅ ማስጀመር | አይመለከተውም  |

### ምን ይጠቃለላል

ከ`summarization.ts` ሁለት መግቢያ ነጥቦች ይላካሉ፦

- **`summarizeMemories(apiKeyId, sessionId?, maxTokens = 4000)`** — የአንድን
  ክፍለ ጊዜ ትውስታዎች በቶከን በጀት የተገደበ አንድ የማጠቃለያ ጽሑፍ አድርጎ ያጠቃልላል።
- **`summarizeMemoriesOlderThan(apiKeyId, days, dryRun)`** — በAPI የሚጠቀምበት
  በዕድሜ ላይ የተመሠረተ ማጨቅ፦ ከ`days` በላይ የቆየን እያንዳንዱን ትውስታ ይመርጣል፣
  ከእነሱ አንድ የታመቀ የማጠቃለያ ትውስታ ይፈጥራል፣ እና (`dryRun` `false` ሲሆን)
  የመጀመሪያዎቹን ይሰርዛል። ምንም ነገር ሳይለወጥ የዕጩዎችን ስብስብና አጠቃላይ የቶከን
  ብዛት ለማየት `dryRun: true` ያስተላልፉ።

የመለያ/ቁልፍ ማሰባሰቢያ ዙር ወይም ለእያንዳንዱ ትውስታ "ዋና ከማጠቃለል ከሚችል" የሚል የውጤት አሰጣጥ የለም —
ምርጫው ሙሉ በሙሉ በዕድሜ ገደቡ ላይ የተመሠረተ ሲሆን፣ የማጠቃለያው ጽሑፍም ለእያንዳንዱ ዕጩ
ዓይነት-ቅድመ ቅጥያ ያለው የታመቀ መስመር ነው።

### ማጠቃለያን ማስጀመር

ማጠቃለያ **በእጅ / በምርጫ የሚነቃ** ነው — የ`autoSummarize` ቅንብር በነባሪ
`false` ነው፣ ስለዚህ ምንም ነገር በራስ-ሰር አይጨመቅም። በAPI በኩል ያስጀምሩት፦

```bash
curl -X POST http://localhost:20128/api/memory/summarize \
  -H "Authorization: Bearer $OMNIROUTE_KEY"
```

እንዳይነቃ ለማድረግ፣ `autoSummarize`ን በነባሪ እሴቱ (`false`) ላይ ብቻ ያቆዩት።

### የማጠቃለያ ጥራት ምክሮች

- **መጀመሪያ በ`dryRun` ቅድመ ዕይታ ያድርጉ** — `summarizeMemoriesOlderThan(..., true)`
  የመጀመሪያዎቹን ከመሰረዝዎ በፊት ምን እንደሚዋሃድ ማረጋገጥ እንዲችሉ
  የዕጩዎችን ዝርዝርና አጠቃላይ የቶከን ብዛት ይመልሳል።
- **ብዙ የትውስታ ስብስብ ካለዎት ማጠቃለያውን ትራፊክ በሚቀንስባቸው ሰዓታት ያስኪዱ** — የLLM ጥሪው ዘገምተኛው ክፍል ነው

```bash
# የCron አይነት፦ በየቀኑ ከጠዋቱ 3 ሰዓት ላይ አጠቃልል
0 3 * * * curl -X POST http://localhost:20128/api/memory/summarize \
  -H "Authorization: Bearer $OMNIROUTE_KEY"
```

---

## የMemoryBackend አቅራቢ ንድፍ

> **ትክክለኛው የመረጃ ምንጭ፦** `src/lib/memory/backend.ts`, `src/lib/memory/genericBackend.ts`, `src/lib/memory/manager.ts`
> **ሙከራዎች፦** `src/lib/memory/__tests__/generic-backend.test.ts`

የMemoryBackend አቅራቢ ንድፍ በነባሩ የትውስታ ሞተር ላይ **ሊሰካ የሚችል የጀርባ-ክፍል ረቂቅ ንብርብር** ያስተዋውቃል። ከአንድ የማከማቻ ትግበራ ጋር ብቻ ከመታሰር ይልቅ፣ የትውስታ ሥርዓቱ አሁን ሊዋቀር የሚችል ዋና/ተተኪ ማዞሪያ ያላቸውን በርካታ የጀርባ ክፍሎች (SQLite፣ Obsidian፣ Notion፣ ብጁ HTTP የጀርባ ክፍሎች) ይደግፋል።

### አርክቴክቸር

```
┌──────────────────────────────────────────────────────────┐
│                    የAPI መንገዶች                          │
│            (src/app/api/memory/route.ts)                  │
└──────────────────────┬───────────────────────────────────┘
                       │
┌──────────────────────▼───────────────────────────────────┐
│                   MemoryManager                           │
│           ነጠላ አስተባባሪ (manager.ts)                     │
│                                                          │
│  ዋና ──────► የጀርባ ክፍል A  (ለምሳሌ SQLite)              │
│  ተተኪ ─────► የጀርባ ክፍል B  (ለምሳሌ Obsidian)            │
│             የጀርባ ክፍል C  (ለምሳሌ Notion በGenericBackend)│
└──────────────────────┬───────────────────────────────────┘
                       │
        ┌──────────────┼──────────────┐
        ▼              ▼              ▼
┌────────────┐ ┌────────────┐ ┌──────────────────┐
│ SQLite     │ │ Obsidian   │ │ GenericMemory    │
│ የጀርባ ክፍል │ │ የጀርባ ክፍል │ │ የጀርባ ክፍል (HTTP) │
└────────────┘ └────────────┘ └──────────────────┘
```

#### ዋና በይነገጽ (`backend.ts`)

እያንዳንዱ የጀርባ ክፍል የ`MemoryBackend` በይነገጽን መተግበር አለበት፦

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

  // ፍለጋ
  search(config: SearchConfig): Promise<Memory[]>;

  // ጤንነት
  health(): Promise<HealthCheckResult>;

  // የሕይወት ዑደት (አማራጭ)
  initialize?(): Promise<void>;
  shutdown?(): Promise<void>;
}
```

#### MemoryManager (`manager.ts`)

የሚከተሉትን የሚያከናውን ነጠላ አስተባባሪ፦

- የጀርባ ክፍሎችን በ`register(backend)` **ይመዘግባል** — ሲነሳ ከ`index.ts` ይጠራል
- ዋናውን + ተተኪዎችን በ`configure(primary, fallbacks)` **ያዋቅራል**
- CRUD/ፍለጋን ወደ ዋናው **ያዞራል**፣ ሲከሽፍም የተተኪ ሰንሰለትን ይጠቀማል
- ሁሉንም የጀርባ ክፍሎች በየጊዜው **የጤንነት ፍተሻ ያደርግባቸዋል**

**የተተኪ ባህሪ፦**

| ክወና      | ዋና                  | ተተኪዎች                  |
| -------- | ------------------- | ---------------------- |
| `create` | ✅ ዋናው ብቻ           | ❌                     |
| `get`    | ✅ መጀመሪያ ዋናውን ይሞክራል | ✅ null ከሆነ ተተኪን ይጠቀማል |
| `update` | ✅ ዋናው ብቻ           | ✅ ጀምሮ-ሳይጠብቅ ማመሳሰል     |
| `delete` | ✅ ዋናው ብቻ           | ✅ ጀምሮ-ሳይጠብቅ ማመሳሰል     |
| `list`   | ✅ ዋናው ብቻ           | ❌                     |
| `search` | ✅ መጀመሪያ ዋናው        | ✅ ስህተት ሲኖር ተተኪን ይጠቀማል |

#### GenericMemoryBackend (`genericBackend.ts`)

ማንኛውንም REST API ወደ MemoryBackend የሚያስማማ አጠቃላይ HTTP አገናኝ። ለሚከተሉት ጠቃሚ ነው፦

- **Notion** — በNotion API በኩል ያገናኙ
- **Obsidian** — በObsidian Local REST API በኩል ያገናኙ
- **ብጁ የጀርባ ክፍሎች** — RESTful የትውስታ API የሚያቀርብ ማንኛውም አገልግሎት

**ውቅር፦**

```typescript
interface GenericBackendConfig {
  baseUrl: string;           // የጀርባ API መሠረታዊ URL
  apiKey?: string;           // ለማረጋገጫ የBearer ቶከን
  headers?: Record<string, string>;  // ብጁ HTTP ራስጌዎች
  timeout?: number;          // የጥያቄ ጊዜ ገደብ (ነባሪ፦ 30000ms)
  backendType?: string;      // ለምዝግብ ማስቀመጥ

  // የመዳረሻ ነጥብ ሽረቶች (ነባሪዎች የREST ልማዶችን ይጠቀማሉ)
  endpoints?: {
    search?: string;   // ነባሪ፦ "/memories/search"
    create?: string;   // ነባሪ፦ "/memories"
    list?: string;     // ነባሪ፦ "/memories"
    get?: string;      // ነባሪ፦ "/memories/{id}"
    update?: string;   // ነባሪ፦ "/memories/{id}"
    delete?: string;   // ነባሪ፦ "/memories/{id}"
    health?: string;   // ነባሪ፦ "/health"
  };

  // የጥያቄ መለኪያ ስም ማዛመጃዎች
  queryParams?: {
    query?/apiKeyId?/limit?/offset?/strategy?/maxTokens?/type?/sessionId?/orderBy?/orderDir?/options?
  };

  // የዱካ መለኪያ ስም ማዛመጃዎች
  pathParams?: {
    id?/memoryId?
  };
}
```

**የታወቁ ጀርባዎች** በ`KNOWN_BACKENDS` ውስጥ አስቀድመው ተዋቅረዋል፦

```typescript
createKnownBackend("obsidian"); // → ወደ localhost:27123 የሚያመለክት GenericMemoryBackend
createKnownBackend("notion"); // → ወደ api.notion.com/v1 የሚያመለክት GenericMemoryBackend
```

#### አብሮገነብ ጀርባዎች

##### SQLiteBackend (`sqliteBackend.ts`)

ነባሪው ዋና ጀርባ። `src/lib/memory/store.ts`ን በመጠቀም ነባሩን SQLite-ተኮር የማህደረ ትውስታ ማከማቻ ይጠቀልላል። ሲነሳ በራስ-ሰር ይመዘገባል።

```typescript
import { sqliteBackend } from "./sqliteBackend";
memoryManager.register(sqliteBackend);
```

##### ObsidianBackend (`obsidianBackend.ts`)

ነባሩን የObsidian ውህደት (`src/lib/memory/obsidianBackend.ts`) ይጠቀልላል። በObsidian Local REST API በኩል ከObsidian ማከማቻ ጋር ይገናኛል።

### ቅንብሮች

የማህደረ ትውስታ ጀርባ ቅንብሮች በመተግበሪያው የቅንብሮች ሰንጠረዥ ውስጥ ይከማቻሉ፣ እንዲሁም በ`src/lib/memory/settings.ts` በኩል ይተዳደራሉ፦

| ቅንብር        | የአካባቢ/ውቅር ቁልፍ            | ነባሪ        | መግለጫ                            |
| ----------- | ------------------------ | ---------- | ------------------------------- |
| ዋና ጀርባ      | `memoryPrimaryBackend`   | `"sqlite"` | የዋናው ጀርባ ID                     |
| ተጠባባቂ ጀርባዎች | `memoryFallbackBackends` | `[]`       | በቅደም ተከተል የተደረደሩ ተጠባባቂ ጀርባ IDዎች |
| የጀርባ ውቅሮች   | `memoryBackendConfigs`   | `{}`       | ለእያንዳንዱ ጀርባ የሚደረጉ የውቅር ሽረቶች     |

ቅንብሮች በ`normalizeMemorySettings()` በኩል መደበኛ ቅርጽ ይይዛሉ፣ እና በ`getMemorySettings()` ላይ ይሸጎጣሉ።

### የማስጀመር ፍሰት

```
የመተግበሪያ ማስነሻ
  → index.ts ማስመጣቶች (እንደ ጎንዮሽ ውጤት)፦ SQLiteBackendን ይመዘግባሉ
  → initMemoryBackends() ከመተግበሪያው የሕይወት ዑደት ይጠራል፦
      1. ቅንብሮችን ጫን (getMemorySettings)
      2. ዋናውን + ተጠባባቂዎቹን አዋቅር
      3. ሁሉንም ጀርባዎች አስጀምር (የጤና ምርመራ)
      4. ለጥያቄዎች ዝግጁ
```

### አዲስ ጀርባ ማከል

1. በ`src/lib/memory/<name>Backend.ts` ውስጥ የ**`MemoryBackend`ን በይነገጽ ይተግብሩ**
2. ከ`src/lib/memory/index.ts` **ወደ ውጭ ይላኩ**
3. ሲነሳ በ`memoryManager.register(yourBackend)` **ይመዝግቡ**
4. በቅንብሮች በኩል **ያዋቅሩ**፦ `memoryPrimaryBackend`ን ወደ ጀርባዎ ID ያቀናብሩ
5. `src/lib/memory/__tests__/generic-backend.test.ts`ን እንደ ማጣቀሻ በመጠቀም **ይፈትሹ**

#### ምሳሌ፦ Brain ጀርባ

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

### ማረጋገጫ

#### የክፍል ፈተናዎች

```bash
npx vitest run src/lib/memory/__tests__/generic-backend.test.ts --reporter=verbose
```

የሚጠበቀው ውጤት፦ **35 ፈተናዎች፣ ሁሉም ያለፉ**፣ የሚከተሉትን ይሸፍናሉ፦

- ገንቢ (2)
- የጤና ምርመራ (4) — ስኬት፣ ውድቀት 500፣ የአውታረ መረብ ስህተት፣ መዘግየት
- ማስጀመር (2) — ስኬት፣ ውድቀት
- መፍጠር (2) — ነባሪ መዳረሻ ነጥብ፣ ብጁ መዳረሻ ነጥብ
- ማግኘት (4) — ስኬት፣ 404 → null፣ 404 ያልሆነ ስህተት መጣል፣ ብጁ የዱካ መለኪያዎች
- ማዘመን (2) — ስኬት፣ 404 → false
- መሰረዝ (2) — ስኬት፣ 404 → false
- መዘርዘር (2) — የጥያቄ መለኪያዎች፣ ብጁ የመለኪያ ስሞች
- መፈለግ (3) — የጥያቄ መለኪያዎች፣ ብጁ መዳረሻ ነጥብ፣ የአማራጮች ተከታታይ ማድረግ
- የማረጋገጫ ራስጌዎች (2) — Bearer ቶከን፣ ብጁ ራስጌዎች
- ፋብሪካ (1)

#### የዓይነት ምርመራ

```bash
npm run typecheck:core
```

የሚጠበቀው፦ **0 ስህተቶች**።
