# Memory System (ខ្មែរ)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/MEMORY.md) · 🇪🇹 [am](../../../am/docs/frameworks/MEMORY.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/MEMORY.md) · 🇦🇿 [az](../../../az/docs/frameworks/MEMORY.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/MEMORY.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/MEMORY.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/MEMORY.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/MEMORY.md) · 🇩🇰 [da](../../../da/docs/frameworks/MEMORY.md) · 🇩🇪 [de](../../../de/docs/frameworks/MEMORY.md) · 🇬🇷 [el](../../../el/docs/frameworks/MEMORY.md) · 🇪🇸 [es](../../../es/docs/frameworks/MEMORY.md) · 🇪🇪 [et](../../../et/docs/frameworks/MEMORY.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/MEMORY.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/MEMORY.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/MEMORY.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/MEMORY.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/MEMORY.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/MEMORY.md) · 🇮🇱 [he](../../../he/docs/frameworks/MEMORY.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/MEMORY.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/MEMORY.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/MEMORY.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/MEMORY.md) · 🇮🇩 [id](../../../id/docs/frameworks/MEMORY.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/MEMORY.md) · 🇮🇹 [it](../../../it/docs/frameworks/MEMORY.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/MEMORY.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/MEMORY.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/MEMORY.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/MEMORY.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/MEMORY.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/MEMORY.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/MEMORY.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/MEMORY.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/MEMORY.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/MEMORY.md) · 🇲🇲 [my](../../../my/docs/frameworks/MEMORY.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/MEMORY.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/MEMORY.md) · 🇳🇴 [no](../../../no/docs/frameworks/MEMORY.md) · 🇮🇳 [or](../../../or/docs/frameworks/MEMORY.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/MEMORY.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/MEMORY.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/MEMORY.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/MEMORY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/MEMORY.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/MEMORY.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/MEMORY.md) · 🇱🇰 [si](../../../si/docs/frameworks/MEMORY.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/MEMORY.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/MEMORY.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/MEMORY.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/MEMORY.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/MEMORY.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/MEMORY.md) · 🇮🇳 [te](../../../te/docs/frameworks/MEMORY.md) · 🇹🇭 [th](../../../th/docs/frameworks/MEMORY.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/MEMORY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/MEMORY.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/MEMORY.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/MEMORY.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/MEMORY.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/MEMORY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/MEMORY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/MEMORY.md)

---

> **ប្រភពយោងចម្បង:** `src/lib/memory/` និង `src/app/api/memory/`
> **បានធ្វើបច្ចុប្បន្នភាពចុងក្រោយ:** 2026-06-28 — v3.8.40 (បិទតាមលំនាំដើម + ការបំពេញបន្ថែមសម្រាប់ int8 quantization)

OmniRoute ផ្តល់អង្គចងចាំការសន្ទនាដែលរក្សាទុកជាអចិន្ត្រៃយ៍ ដោយកំណត់តាម API key (និង
ជាជម្រើសតាម session id)។ អង្គចងចាំត្រូវបានស្រង់ចេញដោយស្វ័យប្រវត្តិពីការឆ្លើយតបរបស់ LLM
តាមរយៈការផ្គូផ្គងលំនាំ regex ដែលស្រាល ហើយត្រូវបានបញ្ចូលត្រឡប់ទៅក្នុង
សំណើបន្ទាប់ជាសារ system នៅខាងដើម (ឬជាសារ user ដំបូងសម្រាប់ provider ដែល
បដិសេធតួនាទី system)។

> **Memory ត្រូវបានបិទតាមលំនាំដើម (v3.8.30+)។** `DEFAULT_MEMORY_SETTINGS.enabled`
> ឥឡូវនេះគឺ `false` (`src/lib/memory/settings.ts`)។ ការបើក memory នឹងបញ្ចូលបរិបទដែលបាន
> ទាញយករហូតដល់ `maxTokens` (~2k) ទៅក្នុងសំណើ chat **ទាំងអស់** ដែលត្រូវបាន
> គិតថ្លៃ — ជាការចំណាយដែលអាចនឹកស្មានមិនដល់សម្រាប់ការដំឡើងថ្មី និងសម្រាប់ client ដែលគ្រប់គ្រង
> បរិបទរបស់ពួកគេដោយខ្លួនឯង។ សូមជ្រើសរើសបើកដោយច្បាស់លាស់នៅក្រោម **Settings → Memory** (`MemorySkillsTab`
> បង្ហាញប្រអប់ព្រមានអំពីថ្លៃ token នៅពេល memory ត្រូវបានបើក)។
> Client អាចជ្រើសរើសមិនប្រើ memory សម្រាប់សំណើតែមួយដោយប្រើ request header
> `x-omniroute-no-memory` (`true`/`1`/`yes`) — សូមមើលតារាង request-header ក្នុង
> [API_REFERENCE.md](../reference/API_REFERENCE.md)។ សំណើដែលមិនប្រើ memory នឹងកំណត់
> `memoryOwnerId = null` ដែលបិទការបញ្ចូល **ទាំង** memory និង skill សម្រាប់
> សំណើនោះ (`open-sse/handlers/chatCore/headers.ts::isNoMemoryRequested`)។

Memory ត្រូវបាន **កំណត់ដែនតាម API key** មិនមែនតាម user ទេ — រាល់សំណើដែលបានផ្ទៀងផ្ទាត់
ដោយប្រើ API key ដូចគ្នា នឹងចែករំលែកបណ្តុំ memory ដូចគ្នា ហើយអាចកំណត់ដែនបន្ថែម
តាម `sessionId` ជាជម្រើស។

## ស្ថាបត្យកម្ម

```
Client → /v1/chat/completions (apiKeyInfo ត្រូវបានដោះស្រាយនៅដំណាក់កាលខាងលើ)
  → handleChatCore() [open-sse/handlers/chatCore.ts]
    → resolveMemoryOwnerId(apiKeyInfo)        # ស្រង់យក id
    → getMemorySettings()                     # settings ដែលបានរក្សាទុកក្នុង cache
    → shouldInjectMemory(body, {enabled})     # ច្រកត្រួតពិនិត្យ
    → retrieveMemories(apiKeyId, config)      # SQL + FTS5 + vector ជាជម្រើស
    → injectMemory(body, memories, provider)  # សារ system ឬ user
  → ការហៅទៅកាន់ provider ខាងលើ
  → នៅពេលមានការឆ្លើយតប: extractFacts(text, apiKeyId, sessionId)  # មិនរាំងខ្ទប់
    → setImmediate → createMemory(fact) សម្រាប់ការផ្គូផ្គងនីមួយៗ
                   → embed(content) + upsertVector(id, vec)
```

ទីតាំងហៅសម្រាប់ការបញ្ចូល និងការស្រង់ចេញ ត្រូវបានភ្ជាប់ក្នុង
`open-sse/handlers/chatCore.ts` (សូមស្វែងរក `retrieveMemories`, `injectMemory`,
និង `extractFacts`)។

## ស្ថាបត្យកម្ម Engine (ការដោះស្រាយ 3 កម្រិត)

Memory Engine កំណត់ផ្លូវទាញយកនៅពេលដំណើរការ ដោយផ្អែកលើ
ហេដ្ឋារចនាសម្ព័ន្ធ និង settings ដែលមាន។ មានបីកម្រិត ដែលត្រូវបានអនុវត្តតាមលំដាប់អាទិភាព៖

```
  ┌─────────────────────────────────────────────────────────────┐
  │  កម្រិត 0 — ពាក្យគន្លឹះ (FTS5)                               │
  │  ភាពអាចប្រើបានដែលកំណត់ដោយការសាកល្បង៖ FTS5 នៅពេល SQLite build │
  │  គាំទ្រវា (better-sqlite3 / node:sqlite / bun:sqlite);       │
  │  មិនអាចប្រើបានលើ build ដែលគ្មាន FTS5 (ឧ. sql.js/WASM —      │
  │  "no such module: fts5")។ ប្រើនៅពេល strategy = "exact" ឬ   │
  │  ជាជម្រើសបម្រុង; keyword របស់ engine-status ឆ្លុះបញ្ចាំងពីការសាកល្បង។│
  └──────────────────────────────────┬──────────────────────────┘
                                     │ strategy = semantic|hybrid?
                                     ▼
  ┌─────────────────────────────────────────────────────────────┐
  │  កម្រិត 1 — Vector ដែលបានបង្កប់ (sqlite-vec)                 │
  │  sqlite-vec v0.1.9 ត្រូវបានផ្ទុកតាមរយៈ db.loadExtension()។   │
  │  ការស្វែងរក KNN ដោយ brute-force លើ vector ប្រភេទ Float32។ សកម្មនៅពេល៖│
  │   • ការហៅ loadExtension របស់ sqlite-vec បានជោគជ័យ            │
  │   • មានប្រភព embedding (remote | static |                    │
  │     transformers) ដែលអាចបង្កើត Float32Array                  │
  │   • មានតារាង vec_memories (បង្កើតនៅពេលហៅ ready() ដំបូង)      │
  └──────────────────────────────────┬──────────────────────────┘
                                     │ qdrant.enabled?
                                     ▼
  ┌─────────────────────────────────────────────────────────────┐
  │  កម្រិត 2 — Qdrant (មូលដ្ឋានទិន្នន័យ vector ខាងក្រៅដែលត្រូវជ្រើសរើសបើក)│
  │  នៅពេលបើក វាជំនួស sqlite-vec សម្រាប់ semantic/hybrid។        │
  │  តម្រូវឱ្យមាន Qdrant instance កំពុងដំណើរការ + host/port ដែលបានកំណត់។│
  └─────────────────────────────────────────────────────────────┘
```

ការបន្ថយកម្រិតសមត្ថភាពកើតឡើងដោយស្វ័យប្រវត្តិ និងដោយតម្លាភាព៖

- ប្រសិនបើ sqlite-vec បរាជ័យក្នុងការផ្ទុក កម្រិត 1 នឹងមិនអាចប្រើបាន → ត្រឡប់ទៅប្រើកម្រិត 0។
- ប្រសិនបើប្រភព embedding ត្រឡប់ error កម្រិត 1 នឹងត្រឡប់ទៅប្រើកម្រិត 0។
- ប្រសិនបើ Qdrant មិនដំណើរការល្អ កម្រិត 2 នឹងត្រឡប់ទៅប្រើកម្រិត 1 (ឬកម្រិត 0 ប្រសិនបើកម្រិត 1
  ក៏មិនអាចប្រើបានដែរ)។

## ប្រភព Embedding

ស្រទាប់ embedding (`src/lib/memory/embedding/`) កំណត់ថាត្រូវប្រើប្រភពណា
ដោយផ្អែកលើ `MemorySettingsExtended.embeddingSource`៖

| ប្រភព          | សេចក្តីពិពណ៌នា                                                                               | តម្រូវឱ្យមាន Key | ការចាប់ផ្ដើមត្រជាក់ |
| -------------- | -------------------------------------------------------------------------------------------- | ---------------- | ------------------- |
| `remote`       | ប្រើ embedding API របស់ provider ដែលបានកំណត់រចនាសម្ព័ន្ធ (OpenAI, Cohere ជាដើម)              | បាទ/ចាស          | គ្មាន               |
| `static`       | Embedding តារាងស្វែងរកក្នុងម៉ាស៊ីនតាមរយៈ `potion-base-8M` (WordPiece + mean pooling)         | ទេ               | ~200ms              |
| `transformers` | ការធ្វើ inference ONNX ក្នុងម៉ាស៊ីនតាមរយៈ `@huggingface/transformers` v4, `all-MiniLM-L6-v2` | ទេ               | ~3s + RAM ~400MB    |
| `auto`         | ការកំណត់នៅពេលដំណើរការ៖ remote (បើមាន key) → static → transformers → null                     | អាស្រ័យលើ        | អាស្រ័យលើ           |

**លំដាប់កំណត់សម្រាប់ `auto`៖**

1. ស្វែងរក provider ដំបូងក្នុង `listEmbeddingProviders()` ដែលមាន `hasKey === true` → `remote`។
2. បើ `settings.staticEnabled === true` → `static`។
3. បើ `settings.transformersEnabled === true` → `transformers`។
4. បើមិនដូច្នោះទេ → `null` (បន្ថយមកប្រើការស្វែងរកពាក្យគន្លឹះ FTS5)។

ឃ្លាំងសម្ងាត់ embedding (`src/lib/memory/embedding/cache.ts`) ប្រើ
ផែនទី LRU ក្នុងអង្គចងចាំ ដែលកំណត់ key ដោយ `${source}:${model}:${dim}:${sha256(text)}` និងកំណត់ត្រឹម
`MEMORY_EMBEDDING_CACHE_MAX` ធាតុ (លំនាំដើម 1000) ជាមួយ TTL
`MEMORY_EMBEDDING_CACHE_TTL_MS` (លំនាំដើម 5 នាទី)។ វាត្រូវបានចែករំលែករវាងអ្នកហៅទាំងអស់
ក្នុងមួយវដ្តជីវិតរបស់ process។

## Hybrid RRF (k=60)

នៅពេល `strategy = "hybrid"` ហើយ vector store អាចប្រើបាន ការទាញយកប្រើ
Reciprocal Rank Fusion ដើម្បីបញ្ចូលលទ្ធផល FTS5 និង vector ចូលគ្នា៖

```
RRF(d) = Σ  1 / (k + rank_i(d))      where k = 60 (configurable via MEMORY_RRF_K)
          i
```

ជាក់ស្ដែង៖

1. ដំណើរការការស្វែងរក FTS5 → បញ្ជីដែលបានចាត់ចំណាត់ថ្នាក់ `R_fts` (ទីតាំង 1..N)។
2. ដំណើរការការស្វែងរក vector KNN → បញ្ជីដែលបានចាត់ចំណាត់ថ្នាក់ `R_vec` (ទីតាំង 1..M)។
3. សម្រាប់ `memoryId` នីមួយៗដែលមិនស្ទួន៖  
   `rrf_score = 1/(60 + fts_rank)` + `1/(60 + vec_rank)` (0 បើមិនស្ថិតក្នុងបញ្ជី)។
4. តម្រៀបតាម `rrf_score` DESC រួចអនុវត្តការឆ្លងកាត់តាមកញ្ចប់ថវិកា token។

RRF ត្រូវបានគេស្គាល់ថាមានប្រសិទ្ធភាព ដោយមិនចាំបាច់ធ្វើ normalization ពិន្ទុរវាង
ប្រព័ន្ធទាញយកដែលមានលក្ខណៈខុសៗគ្នា។ តម្លៃលំនាំដើម `k=60` មកពី
អត្ថបទស្រាវជ្រាវដើមរបស់ Cormack et al. ហើយដំណើរការបានល្អសម្រាប់ corpus តូចៗ (<10k memories)។

## Backfill (lazy + reindex)

នៅពេល model embedding ផ្លាស់ប្ដូរ (រកឃើញតាមរយៈ `embedding_signature`)
vector store ត្រូវបានបង្កើតឡើងវិញ ហើយ memory ដែលមានស្រាប់ទាំងអស់ត្រូវបានសម្គាល់ជា
`needs_reindex = 1` ក្នុងតារាង `memories`។

**Lazy backfill**៖ នៅពេលទាញយកលើកក្រោយ memory ណាមួយដែលខ្វះធាតុ vector នឹងត្រូវបាន
ធ្វើ embedding និងបញ្ចូលទៅក្នុង `vec_memories` មុនពេលការស្វែងរកដំណើរការ។ វា
បែងចែកថ្លៃដើម backfill ទៅតាមសំណើពិតប្រាកដ ដោយមិនរារាំងការចាប់ផ្ដើមប្រព័ន្ធ។

**Explicit reindex**៖ ផ្ទាំង Engine ក្នុង `/dashboard/memory` ផ្ដល់ប៊ូតុង
"ធ្វើ Index ឡើងវិញឥឡូវនេះ" ដែលហៅ `POST /api/memory/reindex`។ Handler ហៅ
`runReindexBatch()` ពី `src/lib/memory/reindex.ts` ដែលដំណើរការធាតុកំពុងរង់ចាំរហូតដល់
`limit` ក្នុងមួយសំណើ។ វឌ្ឍនភាពអាចត្រូវបានពិនិត្យជាប្រចាំតាមរយៈ
`GET /api/memory/engine-status` (`vectorStore.needsReindex`)។

តារាង `memory_vec_meta` (migration `083_memory_vec.sql`) រក្សាទុក៖

- `active_dim` — វិមាត្រ vector បច្ចុប្បន្ន (null = មិនទាន់បានក្រិតតម្រូវ)។
- `embedding_signature` — `${source}:${model}:${dim}` ដែលប្រើដើម្បីរកឃើញការផ្លាស់ប្ដូរ។
- `last_reset_at` — timestamp នៃការកំណត់ឡើងវិញទាំងស្រុងចុងក្រោយ។
- `vec_loaded` — flag 0/1 ដែលបញ្ជាក់ថា sqlite-vec បានផ្ទុកដោយជោគជ័យឬអត់។

## ផ្នែកបន្ថែមនៃការកំណត់

វាល embedding និង vector ចំនួនប្រាំបួនមាននៅក្នុង `MemorySettingsExtended` ក្នុង
`src/shared/schemas/memory.ts` ហើយត្រូវបានរក្សាទុកតាមរយៈ `src/lib/db/settings.ts`៖

| វាល                      | ប្រភេទ                                             | តម្លៃលំនាំដើម | ការពិពណ៌នា                                                                 |
| ------------------------ | -------------------------------------------------- | ------------- | -------------------------------------------------------------------------- |
| `embeddingSource`        | `"remote" \| "static" \| "transformers" \| "auto"` | `"auto"`      | ប្រភព embedding ដែលត្រូវប្រើ                                               |
| `embeddingProviderModel` | `string \| null`                                   | `null`        | អ្នកផ្តល់សេវា/ម៉ូដែលក្នុងទម្រង់ `provider/model`                           |
| `customBaseUrl`          | `string \| null`                                   | `null`        | URL មូលដ្ឋានរបស់ endpoint ដែលត្រូវគ្នាជាមួយ OpenAI សម្រាប់ Memory ប៉ុណ្ណោះ |
| `customModelId`          | `string \| null`                                   | `null`        | លេខសម្គាល់ម៉ូដែលដែលត្រូវផ្ញើទៅ endpoint ផ្ទាល់ខ្លួន                        |
| `transformersEnabled`    | `boolean`                                          | `false`       | ការជ្រើសរើសប្រើ Transformers.js (MiniLM, ~400MB)                           |
| `staticEnabled`          | `boolean`                                          | `false`       | ការជ្រើសរើសប្រើម៉ូដែលមូលដ្ឋាន static potion-base-8M                        |
| `rerankEnabled`          | `boolean`                                          | `false`       | បើកជំហានរៀបលំដាប់ឡើងវិញ (បន្ថែម +200-500ms/req)                            |
| `rerankProviderModel`    | `string \| null`                                   | `null`        | អ្នកផ្តល់សេវា/ម៉ូដែលសម្រាប់រៀបលំដាប់ឡើងវិញក្នុងទម្រង់ `provider/model`     |

`rerankProviderModel` ត្រូវបានដោះស្រាយដោយ `POST /v1/rerank` (ហៅតាម loopback) ដូច្នេះវាទទួលយកអ្វីក៏ដោយដែល route នោះទទួលយក៖ ម៉ូដែល cloud សម្រាប់រៀបលំដាប់ឡើងវិញដែលបានជ្រើសសម្រិតសម្រាំង (`cohere/rerank-v3.5`, `jina-ai/jina-reranker-v3.5`, …) ឬ node របស់អ្នកផ្តល់សេវាដែលត្រូវគ្នាជាមួយ OpenAI ក្នុងទម្រង់ `<node-prefix>/<model>` (ឧ. `skilled-mini/bge-reranker-v2-m3` សម្រាប់ម៉ាស៊ីន TEI/Infinity)។ Node ប្រភេទ loopback តែងតែមានសិទ្ធិប្រើប្រាស់។ Node នៅលើ host ផ្សេងទៀត (LAN, Tailscale) ត្រូវការបន្ថែមនូវ feature flag `RERANK_REMOTE_PROVIDER_NODES` ហើយត្រូវតែឆ្លងកាត់គោលការណ៍ URL ចេញក្រៅរបស់អ្នកផ្តល់សេវា — សូមមើល [Feature Flags](../reference/FEATURE_FLAGS.md)។ កម្មវិធីជ្រើសរើសលើ dashboard បង្ហាញអ្នកផ្តល់សេវាដែលបានជ្រើសសម្រិតសម្រាំង រួមជាមួយ node មូលដ្ឋាន។ string `provider/model` ដែលត្រឹមត្រូវណាមួយអាចត្រូវបានកំណត់ដោយផ្ទាល់តាមរយៈ `PUT /api/settings/memory`។
| `vectorStore` | `"sqlite-vec" \| "qdrant" \| "auto"` | `"auto"` | backend សម្រាប់ vector ដែលត្រូវប្រើ |

ការកំណត់ទាំងនេះត្រូវបានបង្ហាញឱ្យប្រើតាមរយៈ `GET /PUT /api/settings/memory` (schema `MemorySettingsExtendedSchema`)។

សម្រាប់ប្រភព `remote` Memory ក៏ទទួលយកការកំណត់ជាជម្រើស `customBaseUrl` និង
`customModelId` ផងដែរ។ នៅពេលប្រើរួមគ្នា ពួកវាជ្រើសរើស endpoint `/embeddings`
និងម៉ូដែលដែលត្រូវគ្នាជាមួយ OpenAI ដោយមិនផ្លាស់ប្តូរ registry សកលរបស់ embedding។ Endpoint ត្រូវបាន
ធ្វើឱ្យមានទម្រង់ស្តង់ដារមុនពេលប្រើ និងត្រូវបានត្រួតពិនិត្យដោយគោលការណ៍ URL ចេញក្រៅរបស់អ្នកផ្តល់សេវា៖ តម្រូវឱ្យប្រើ HTTP(S)
ព័ត៌មានសម្ងាត់ដែលបានបង្កប់ និង query string ត្រូវបានបដិសេធ ហើយអាសយដ្ឋាន cloud-metadata
នៅតែត្រូវបានទប់ស្កាត់។ តម្លៃទទេរក្សាទុកអ្នកផ្តល់សេវា registry ដែលបានជ្រើស។ កំហុស
ដែលបញ្ជូនត្រឡប់ទៅ dashboard ត្រូវបានសម្អាត ហើយព័ត៌មានសម្ងាត់របស់ endpoint មិនត្រូវបានកត់ត្រាក្នុង log ឡើយ។

> **TODO (D20)៖** Scope `global` (ការចែករំលែក memory នៅទូទាំង API key ទាំងអស់) មិនទាន់ត្រូវបាន
> អនុវត្តនៅក្នុងការចេញផ្សាយនេះទេ។ វាតម្រូវឱ្យមានការផ្លាស់ប្តូរ schema និងផ្លូវ retrieval
> សកល។ តាមដានវាដោយឡែក។

## ស្រទាប់ផ្ទុកទិន្នន័យ

### ស្រទាប់ចម្បង៖ SQLite (តារាង `memories`)

បង្កើតដោយ migration `015_create_memories.sql`៖

| ជួរឈរ                       | ប្រភេទ             | កំណត់សម្គាល់                                                             |
| --------------------------- | ------------------ | ------------------------------------------------------------------------ |
| `id`                        | `TEXT PRIMARY KEY` | UUID ដែលបង្កើតតាមរយៈ `crypto.randomUUID()`                               |
| `api_key_id`                | `TEXT NOT NULL`    | API key ដែលជាម្ចាស់                                                      |
| `session_id`                | `TEXT`             | Scope តាមការសន្ទនាដែលជាជម្រើស                                            |
| `type`                      | `TEXT NOT NULL`    | មួយក្នុងចំណោម `factual`, `episodic`, `procedural`, `semantic`            |
| `key`                       | `TEXT`             | Upsert key ថេរ ឧ. `preference:i_prefer_python`                           |
| `content`                   | `TEXT NOT NULL`    | អត្ថបទព័ត៌មានពិតជាក់ស្ដែង                                                |
| `metadata`                  | `TEXT`             | បណ្ដុំទិន្នន័យ JSON (category, extractedAt, source, ...)                 |
| `created_at` / `updated_at` | `TEXT`             | String ISO 8601                                                          |
| `expires_at`                | `TEXT`             | កាលបរិច្ឆេទផុតកំណត់ជាជម្រើស; `NULL` មានន័យថាអចិន្ត្រៃយ៍                  |
| `memory_id`                 | `INTEGER UNIQUE`   | បន្ថែមដោយ `023_fix_memory_fts_uuid.sql` ដើម្បីភ្ជាប់ UUIDs ↔ FTS5 rowids |

Index៖ `api_key_id`, `session_id`, `type`, `expires_at` ព្រមទាំង index
`memory_id` ដែលមានតែមួយគត់។

**អត្ថន័យ Upsert**៖ `createMemory()` ស្វែងរកជួរដេកដែលមានស្រាប់ និងមាន
`(api_key_id, key)` ដូចគ្នា ហើយធ្វើបច្ចុប្បន្នភាពវានៅទីតាំងដើមនៅពេលរកឃើញ (ដោយបញ្ចូល `metadata` តាមរយៈ
shallow spread)។ វារារាំងមិនឱ្យតារាងកើនឡើងដោយគ្មានដែនកំណត់ពីសេចក្ដីថ្លែងការណ៍
អំពីចំណូលចិត្តដដែលៗ។

### ការស្វែងរកអត្ថបទពេញលេញ (តារាងនិម្មិត `memory_fts`)

`022_add_memory_fts5.sql` បង្កើតតារាងនិម្មិត FTS5 លើ `content` និង
`key`។ `023_fix_memory_fts_uuid.sql` ជួសជុលកំហុសដែលកើតមានក្នុងការប្រើប្រាស់ជាក់ស្ដែង ដែល UUID
primary key មិនអាច join ជាមួយ integer rowid របស់ FTS5 បាន — migration នេះបន្ថែមជួរឈរ
`memory_id` បង្កើតតារាង FTS ឡើងវិញ និងភ្ជាប់ trigger
(`memory_fts_ai`, `memory_fts_ad`, `memory_fts_au`) ដែលរក្សា FTS ឱ្យសមកាលកម្មនៅពេល
INSERT, DELETE និង UPDATE។

ប្រើដោយ `retrieval.ts` សម្រាប់យុទ្ធសាស្ត្រ `semantic` និង `hybrid` (សូមមើលខាងក្រោម)។
កូដ retrieval ធ្វើការការពារដោយប្រើ `hasTable("memory_fts")` ហើយត្រឡប់ទៅប្រើ
លំដាប់តាមពេលវេលា ប្រសិនបើបាត់តារាង FTS ឬ query FTS បោះកំហុស។

### ជាជម្រើស៖ Qdrant (vector store កម្រិតទី 2)

`src/lib/memory/qdrant.ts` អនុវត្តការរួមបញ្ចូល Qdrant ជាជម្រើស ដើម្បីធ្វើជា vector store
កម្រិតទី 2។ Retrieval បញ្ជូនទៅ Qdrant តែនៅពេល engine selector
`memoryVectorStore === "qdrant"` ប៉ុណ្ណោះ — លំនាំដើម `"auto"` (និង `"sqlite-vec"`)
**មិនដែល** ជ្រើសរើស Qdrant ទេ។ Toggle ក្នុងផ្ទាំង Engine កំណត់ **ទាំង** `qdrantEnabled` និង
`memoryVectorStore` ជាមួយគ្នា៖ ការបើកធ្វើឱ្យ Qdrant ក្លាយជា store ចម្បង ខណៈការបិទ
កំណត់ត្រឡប់ទៅ `"auto"` (#5597 — មុនការកែតម្រូវនោះ ការបើកមិនមានប្រសិទ្ធភាពទេ ព្រោះគ្មានអ្វី
សរសេរទៅ engine selector)។ ប្រសិនបើមិនអាចភ្ជាប់ទៅ Qdrant បាន ឬវាមិនត្រឡប់អ្វីមកវិញ retrieval
ត្រឡប់ទៅប្រើ sqlite-vec → FTS5។

- `upsertSemanticMemoryPoint()` — បង្កើត embedding សម្រាប់ `key + content` ដោយប្រើម៉ូដែល embedding ដែលបានកំណត់ ធានាថា collection មានរួច (បង្កើត vector ដែលប្រើ cosine-distance នៅពេលប្រើដំបូង) ហើយ upsert point មួយជាមួយ payload `{memoryId,
apiKeyId, sessionId, key, content, metadata, createdAtUnix, expiresAtUnix}`។
- `searchSemanticMemory(query, topK, scope)` — បង្កើត embedding សម្រាប់ query, ស្វែងរកក្នុង collection ដោយចម្រោះតាម `kind = "omniroute_memory"` ហើយអាចចម្រោះបន្ថែមតាម
  `apiKeyId` / `sessionId`។ កំណត់ `topK` ឱ្យស្ថិតក្នុងចន្លោះ `[1, 20]`។
- `deleteSemanticMemoryPoint(id)` — លុប point តែមួយ។ ត្រូវបានហៅដោយ
  `deleteMemory()` បន្ទាប់ពី row ក្នុង SQLite ត្រូវបានលុបចេញ (D15)។
- `cleanupSemanticMemoryPoints({retentionDays})` — លុប points ជាក្រុម ដែល
  `expiresAtUnix` បានផុតកំណត់ ឬ `createdAtUnix` ចាស់ជាងកាលកំណត់រក្សាទុក។
  រាប់ចំនួនជាមុន ដើម្បីឱ្យ dashboard អាចបង្ហាញចំនួនពិតប្រាកដ។
- `checkQdrantHealth()` — health probe តាម `GET /readyz` រួមជាមួយ latency។

UI ការកំណត់បង្ហាញ config របស់ Qdrant, ការពិនិត្យ health, ការសាកល្បង semantic search
និងការសម្អាតនៅក្នុង **ផ្ទាំង Engine** នៃ `/dashboard/memory`។ Routes ដែលត្រូវគ្នា
នៅក្រោម `src/app/api/settings/qdrant/` ត្រូវបានភ្ជាប់រួចរាល់ទាំងអស់គិតត្រឹម v3.8.6៖

| Route                                   | Method        | សេចក្ដីពិពណ៌នា                          |
| --------------------------------------- | ------------- | --------------------------------------- |
| `/api/settings/qdrant`                  | `GET` / `PUT` | អាន / ធ្វើបច្ចុប្បន្នភាពការកំណត់ Qdrant |
| `/api/settings/qdrant/health`           | `GET`         | Liveness probe + latency                |
| `/api/settings/qdrant/search`           | `POST`        | សាកល្បង semantic search                 |
| `/api/settings/qdrant/cleanup`          | `POST`        | លុប points ដែលផុតកំណត់ / ចាស់           |
| `/api/settings/qdrant/embedding-models` | `GET`         | រាយបញ្ជីម៉ូដែល embedding ដែលមាន         |

**កំណត់សម្គាល់អំពីឥរិយាបថ (អ្វីដែលត្រូវរំពឹងទុក)៖**

- **ការជ្រើសរើស Engine** — ការបើក Qdrant ក្នុងផ្ទាំង Engine ធ្វើឱ្យវាក្លាយជា
  store ចម្បង (កំណត់ `memoryVectorStore="qdrant"`); ការបិទវានឹងកំណត់ឡើងវិញទៅ
  `"auto"` (#5597)។
- **គ្មានការ back-fill** — មានតែ memories ដែលបានបង្កើត/ធ្វើបច្ចុប្បន្នភាព
  **បន្ទាប់ពី** បើក Qdrant ប៉ុណ្ណោះដែលត្រូវបានសរសេរទៅវា (ការ dual-write បែប
  fire-and-forget)។ Memories ក្នុង SQLite ដែលមានស្រាប់ **មិនត្រូវបាន** migrate
  ទេ; "Reindex Now" បង្កើត index របស់ sqlite-vec ឡើងវិញតែប៉ុណ្ណោះ មិនមែន Qdrant ទេ។
- **វិមាត្រ vector ត្រូវបានរកឃើញដោយស្វ័យប្រវត្តិ** ពី embedding ពិតប្រាកដនៅពេល
  ប្រើដំបូង — មិនមាន field សម្រាប់វិមាត្រដែលត្រូវបំពេញទេ។ ការផ្លាស់ប្តូរម៉ូដែល
  embedding បន្ទាប់ពីមាន collection រួចហើយ **មិនត្រូវបាន** ដោះស្រាយដោយស្វ័យប្រវត្តិទេ៖
  collection ដែលមានស្រាប់ត្រូវបានរក្សាទុកដដែល ហើយការ write/search ដែលមានវិមាត្រ
  មិនត្រូវគ្នានឹងបរាជ័យ រួច fallback ទៅ sqlite-vec។ បង្កើត collection ឡើងវិញ
  (ប្រើឈ្មោះថ្មី ឬលុបវាក្នុង Qdrant) ដើម្បីប្តូរ embedder។
- **រង្វាស់ចម្ងាយ** — តែងតែជា **Cosine** (hardcoded នៅពេលបង្កើត collection;
  មិនអាចកំណត់រចនាសម្ព័ន្ធបានទេ)។
- **ការផ្ទៀងផ្ទាត់អត្តសញ្ញាណ** — ប្រើតែ API key ប៉ុណ្ណោះ (ផ្ញើជា header `api-key`;
  ជាជម្រើសសម្រាប់ Docker មូលដ្ឋានដែលមិនទាមទារការផ្ទៀងផ្ទាត់អត្តសញ្ញាណ)។
  JWT/RBAC មិនត្រូវបានប្រើទេ។
- **Fields នៃ config** — UI បង្ហាញ `host`, `port`, `collection`, `embeddingModel`,
  `apiKey`។ `vectorSize` / `hnswEfConstruct` អាចប្រើបានតែតាម env/DB ប៉ុណ្ណោះ ហើយ
  `vectorSize` មិនត្រូវបានប្រើសម្រាប់ការបង្កើត collection ទេ (វិមាត្រមកពី embedding)។

### ការធ្វើ quantization លើ vector (int8 — ត្រូវបើកជាជម្រើស, backends ទាំងពីរ)

Vector backends ទាំងពីរគាំទ្រ **int8 quantization ដែលត្រូវបើកជាជម្រើស** ដើម្បីកាត់បន្ថយ
ទំហំ memory របស់ vectors ដែលបានរក្សាទុក (~4× តូចជាង Float32) ដោយមានការថយចុះ
recall បន្តិចបន្តួច។ តាមលំនាំដើម វា **បិទ** លើ backend ទាំងពីរ — vectors រក្សា
full-precision ដដែល លុះត្រាតែបានបើកយ៉ាងច្បាស់លាស់។

| Backend    | ការកំណត់                        | ប្រភេទ                         | លំនាំដើម | កន្លែងដែលត្រូវបានអាន                                        |
| ---------- | ------------------------------- | ------------------------------ | -------- | ----------------------------------------------------------- |
| Qdrant     | `qdrantQuantization` (DB key)   | `"none" \| "int8" \| "binary"` | `"none"` | `src/lib/memory/qdrant.ts::normalizeQdrantConfig()`         |
| sqlite-vec | `MEMORY_VEC_QUANTIZATION` (env) | `"none" \| "int8"`             | `"none"` | `src/lib/memory/vectorStore.ts::requestedVecQuantization()` |

- **Qdrant** ត្រូវបានកំណត់រចនាសម្ព័ន្ធតាម instance នីមួយៗ តាមរយៈ key ការកំណត់
  `qdrantQuantization` (បង្ហាញជា field `quantization` នៅលើ
  `PUT /api/settings/qdrant`)។ នៅពេលកំណត់ជា `"int8"`,
  `buildQuantizationConfig()` ស្នើ scalar quantization (`always_ram`, quantile
  `0.99`) ហើយការស្វែងរកបើក `rescore: true` ដើម្បីឱ្យ vectors ដែលមាន
  full-precision កែលម្អសំណុំ candidate របស់ int8។
- Quantization របស់ **sqlite-vec** អាចកំណត់បាន **តែតាម environment ប៉ុណ្ណោះ**
  (មិនមែនជាការកំណត់ DB ទេ)៖ កំណត់ `MEMORY_VEC_QUANTIZATION=int8` ដើម្បីរក្សាទុក
  vectors មូលដ្ឋានជា column `int8[dim]` តាមរយៈ
  `vec_quantize_int8(?, 'unit')`។ Mode ដែលបានជ្រើសត្រូវបានបញ្ចូលទៅក្នុង
  `embedding_signature` (suffix `:int8`) ដូច្នេះការប្តូរ mode នឹងបង្កឱ្យមាន
  reindex ពេញលេញលើ table `vec_memories` — ជា lazy-backfill path ដូចគ្នាដែលត្រូវបាន
  ប្រើនៅពេលម៉ូដែល embedding ផ្លាស់ប្តូរ។

## ប្រភេទអង្គចងចាំ

`MemoryType` (`src/lib/memory/types.ts`):

| ប្រភេទ       | ប្រើសម្រាប់                                                                                             |
| ------------ | ------------------------------------------------------------------------------------------------------- |
| `factual`    | ចំណូលចិត្ត អង្គហេតុស្ថិររបស់អ្នកប្រើ និងលំនាំឥរិយាបថ                                                    |
| `episodic`   | ការសម្រេចចិត្តដែលពាក់ព័ន្ធនឹងពេលវេលាជាក់លាក់ ("I chose Postgres")                                       |
| `procedural` | អង្គចងចាំអំពីលំហូរការងារ / របៀបអនុវត្ត (បានបម្រុងទុក; បច្ចុប្បន្នមិនមានកម្មវិធីស្រង់ដោយស្វ័យប្រវត្តិទេ) |
| `semantic`   | បានបម្រុងទុកសម្រាប់ធាតុនៅក្នុង vector-store                                                             |

យុទ្ធសាស្ត្រទាញយករបស់ `MemoryConfig` គឺមួយក្នុងចំណោម `exact`, `semantic` ឬ `hybrid`,
ហើយវិសាលភាពគឺមួយក្នុងចំណោម `session`, `apiKey` ឬ `global`។ វិសាលភាពលំនាំដើមពី
`getMemorySettings()` គឺ `apiKey`។

## ការស្រង់អង្គហេតុ (`extraction.ts`)

ការស្រង់គឺផ្អែកលើ **regex** មិនមែនផ្អែកលើ LLM ទេ — វាដំណើរការនៅក្នុងដំណើរការតែមួយជាមួយ
`setImmediate()` ដូច្នេះវាមិនដែលរាំងខ្ទប់ស្ទ្រីមឆ្លើយតបទេ៖

- **លំនាំចំណូលចិត្ត** → `MemoryType.FACTUAL`
  (ឧ. `I prefer …`, `I really like …`, `my favorite is …`, `I hate …`)
- **លំនាំការសម្រេចចិត្ត** → `MemoryType.EPISODIC`
  (ឧ. `I'll use …`, `I chose …`, `I went with …`, `I'm going to adopt …`)
- **លំនាំទម្លាប់** → `MemoryType.FACTUAL`
  (ឧ. `I usually …`, `I always …`, `I tend to …`)

លទ្ធផលផ្គូផ្គងនីមួយៗត្រូវបានសម្អាត (`trim`, បង្រួមចន្លោះទទេ និងកំណត់ត្រឹម 500 តួអក្សរ),
លុបធាតុស្ទួននៅក្នុងបាច់តាមរយៈ `factKey(category, content)` ដែលមានស្ថិរភាព និង
រក្សាទុកតាមរយៈ `createMemory()` ជាមួយទិន្នន័យមេតា
`{category, extractedAt, source: "llm_response"}`។ អត្ថបទបញ្ចូលត្រូវបានកំណត់ត្រឹម
64 KiB (`MAX_EXTRACTION_TEXT_LENGTH`) — នៅពេលវាវែងជាងនេះ **ផ្នែកខាងចុង** នៃអត្ថបទ
ត្រូវបានប្រើ ដើម្បីឱ្យខ្លឹមសារចុងក្រោយបំផុតរបស់ជំនួយការតែងតែត្រូវបានរួមបញ្ចូល។

`extractFactsFromText(text)` ត្រូវបាននាំចេញសម្រាប់ការធ្វើតេស្ត និងត្រឡប់
អង្គហេតុដែលមានរចនាសម្ព័ន្ធដោយមិនរក្សាទុកពួកវា។

## ការទាញយក (`retrieval.ts`)

`retrieveMemories(apiKeyId, config)` គឺជាចំណុចចូលសំខាន់។ វា៖

1. ធ្វើឱ្យ config មានទម្រង់ស្តង់ដារ និងផ្ទៀងផ្ទាត់វាតាមរយៈ `MemoryConfigSchema`។
2. ត្រឡប់ `[]` ភ្លាមៗ នៅពេល `enabled` ជា false ឬ `maxTokens <= 0`។
3. កម្រិត `maxTokens` ឱ្យស្ថិតក្នុងចន្លោះ `[1, 8000]`។
4. រកឃើញថាតើតារាង `memories` ទំនើបមានឬអត់ (ធៀបនឹងតារាង `memory`
   ចាស់) ដើម្បីឱ្យមូលដ្ឋានទិន្នន័យចាស់ៗនៅតែបន្តដំណើរការ។
5. បង្កើត query មូលដ្ឋានជាមួយលក្ខខណ្ឌការពារការផុតកំណត់
   (`expires_at IS NULL OR datetime(expires_at) > datetime('now')`), វិសាលភាព
   session ជាជម្រើស និងចំណុចកាត់ `retentionDays` ជាជម្រើស។
6. បែងចែកដំណើរការតាមយុទ្ធសាស្ត្រ៖
   - **`exact`** (លំនាំដើម)៖ តម្រៀបតាមលំដាប់ពេលវេលា `ORDER BY created_at DESC LIMIT 100`។
   - **`semantic`**៖ ប្រសិនបើមាន `config.query` និង `memory_fts` សូមធ្វើ JOIN
     ដោយប្រើ `memory_fts MATCH ?` ហើយតម្រៀបតាមចំណាត់ថ្នាក់ FTS; ត្រឡប់ទៅប្រើលំដាប់ពេលវេលា
     នៅពេល FTS ត្រឡប់ 0 ជួរ។
   - **`hybrid`**៖ សហភាពនៃលទ្ធផល FTS (ភាពពាក់ព័ន្ធខ្ពស់ជាង) និងសំណុំ
     តាមលំដាប់ពេលវេលា ដោយលុបធាតុស្ទួនតាម id។
7. គណនាពិន្ទុភាពពាក់ព័ន្ធនៃពាក្យគន្លឹះ (`getRelevanceScore`) លើ
   `content`, `key` និង JSON `metadata` នៅពេលមាន query។ ជួរដែលមាន
   ពិន្ទុសូន្យត្រូវបានច្រោះចេញ។
8. តម្រៀបតាមពិន្ទុពីខ្ពស់ទៅទាប បន្ទាប់មកតាម `createdAt` ពីថ្មីទៅចាស់។
9. ពិនិត្យបញ្ជីដែលបានចាត់ថ្នាក់ និងទទួលយកធាតុនានា ដរាបណា
   `estimateTokens(content)` ដែលគណនាបន្តបន្ទាប់ (≈ `length / 4`) នៅតែស្ថិតក្រោមកញ្ចប់កំណត់។ តែងតែ
   ត្រឡប់យ៉ាងហោចណាស់មួយធាតុ នៅពេលមានលទ្ធផលផ្គូផ្គងណាមួយ។

`estimateTokens` ត្រូវបាននាំចេញ និងប្រើដោយការទាញយក ការសង្ខេប និងឧបករណ៍ MCP
`omniroute_memory_search`។

## ការបញ្ចូល (`injection.ts`)

`injectMemory(request, memories, provider)`៖

1. ភ្ជាប់ខ្លឹមសារអង្គចងចាំទាំងអស់ចូលគ្នាជាខ្សែអក្សរ `Memory context: …` តែមួយ។
2. ជ្រើសរើសយុទ្ធសាស្ត្រតាមឈ្មោះអ្នកផ្តល់សេវា៖
   - **សារប្រព័ន្ធ** (លំនាំដើមសម្រាប់ OpenAI, Anthropic, Gemini, …) — បន្ថែម
     `{role: "system", content: memoryText}` នៅពីមុខសារ system ដែលមានស្រាប់
     ដើម្បីឱ្យ prompt ប្រព័ន្ធរបស់អ្នកប្រើនៅតែមានអាទិភាព។
   - **សារអ្នកប្រើ** (ជម្រើសបម្រុង) — សម្រាប់អ្នកផ្តល់សេវានៅក្នុង
     `PROVIDERS_WITHOUT_SYSTEM_MESSAGE`៖ `o1`, `o1-mini`, `o1-preview`,
     `glm`, `glmt`, `glm-cn`, `zai`, `qianfan`។ ទាំងនេះបដិសេធតួនាទី system
     ហើយបើមិនដូច្នោះទេនឹងត្រឡប់ 400 (សូមមើលបញ្ហា #1701 សម្រាប់ GLM/Zhipu)។
3. កត់ត្រាចំនួន យុទ្ធសាស្ត្រ និងម៉ូដែលក្រោម `memory.injection.injected`។

`providerSupportsSystemMessage(provider)` ត្រូវបាននាំចេញសម្រាប់អ្នកហៅដែលត្រូវការ
ធ្វើការសម្រេចចិត្តកំណត់ទិសដៅដោយខ្លួនឯង។ អ្នកផ្តល់សេវាដែលមិនស្គាល់មានលំនាំដើមជា `true`
(អនុញ្ញាតតួនាទី system) ដើម្បីសុវត្ថិភាព។

## ការកំណត់ (`settings.ts`)

ការកំណត់រចនាសម្ព័ន្ធអង្គចងចាំត្រូវបាន **រក្សាទុកក្នុងតារាង settings របស់ DB** មិនមែនក្នុង env vars ទេ។
`getMemorySettings()` អានពី `getSettings()` ហើយរក្សាទុកលទ្ធផលក្នុង cache
ក្នុង process; `invalidateMemorySettingsCache()` ត្រូវបានហៅដោយ route PUT របស់ settings
បន្ទាប់ពីការសរសេរ។

### វាលចាស់ (គ្រប់កំណែ)

| សោ DB                 | ប្រភេទ  | លំនាំដើម                                                  | វត្ថុបញ្ជា UI                                      |
| --------------------- | ------- | --------------------------------------------------------- | -------------------------------------------------- |
| `memoryEnabled`       | boolean | `false` (បិទតាមលំនាំដើមចាប់តាំងពី v3.8.30)                | បើក/បិទអង្គចងចាំ                                   |
| `memoryMaxTokens`     | integer | `2000` (ចន្លោះ `0–16000`)                                 | ថវិកា token សម្រាប់ការបញ្ចូល                       |
| `memoryRetentionDays` | integer | `30` (ចន្លោះ `1–365`)                                     | រយៈពេលរក្សាទុក                                     |
| `memoryStrategy`      | enum    | `"hybrid"` (មួយក្នុងចំណោម `recent`, `semantic`, `hybrid`) | យុទ្ធសាស្ត្រទាញយក                                  |
| `skillsEnabled`       | boolean | `false`                                                   | បិទបើកការបញ្ចូលជំនាញតាមសោនីមួយៗ (សូមមើល SKILLS.md) |

ចំណាំ៖ យុទ្ធសាស្ត្រ UI `"recent"` ផ្គូផ្គងទៅនឹងយុទ្ធសាស្ត្រទាញយកខាងក្នុង `"exact"`
តាមរយៈ `toMemoryRetrievalConfig()` (តម្រៀបតាមលំដាប់ពេលវេលា)។

### វាលថ្មី (v3.8.6, ផែនការ 21 D9)

សូមមើលផងដែរនូវផ្នែក "ផ្នែកបន្ថែមការកំណត់" ខាងលើសម្រាប់សេចក្ដីពិពណ៌នាអំពីវាល។

| សោ DB                       | វាល API                  | លំនាំដើម |
| --------------------------- | ------------------------ | -------- |
| `memoryEmbeddingSource`     | `embeddingSource`        | `"auto"` |
| `memoryEmbeddingModel`      | `embeddingProviderModel` | `null`   |
| `memoryTransformersEnabled` | `transformersEnabled`    | `false`  |
| `memoryStaticEnabled`       | `staticEnabled`          | `false`  |
| `memoryRerankEnabled`       | `rerankEnabled`          | `false`  |
| `memoryRerankModel`         | `rerankProviderModel`    | `null`   |
| `memoryVectorStore`         | `vectorStore`            | `"auto"` |

សោ DB ដែលទាក់ទងនឹង Qdrant (`qdrantEnabled`, `qdrantHost`, `qdrantPort`,
`qdrantApiKey`, `qdrantCollection` មានលំនាំដើម `"omniroute_memory"`,
`qdrantEmbeddingModel` មានលំនាំដើម `"openai/text-embedding-3-small"`) ត្រូវបានអានដោយ
`normalizeQdrantConfig()` ក្នុង `qdrant.ts`។

### អថេរបរិស្ថាន (v3.8.6)

env vars ជាជម្រើសចំនួនប្រាំមួយកែសម្រួលឥរិយាបថពេលដំណើរការរបស់ម៉ាស៊ីន (មានឯកសារពន្យល់ក្នុង `.env.example`)៖

| អថេរ                            | លំនាំដើម                   | សេចក្ដីពិពណ៌នា                                                                                                                                                   |
| ------------------------------- | -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `MEMORY_EMBEDDING_CACHE_TTL_MS` | `300000`                   | TTL របស់ cache សម្រាប់ embedding (5 នាទី)                                                                                                                        |
| `MEMORY_EMBEDDING_CACHE_MAX`    | `1000`                     | ចំនួនធាតុអតិបរមាក្នុង cache LRU សម្រាប់ embedding                                                                                                                |
| `MEMORY_TRANSFORMERS_MODEL`     | `Xenova/all-MiniLM-L6-v2`  | ឃ្លាំង HF សម្រាប់ម៉ូដែល Transformers.js                                                                                                                          |
| `MEMORY_STATIC_MODEL`           | `minishlab/potion-base-8M` | ឃ្លាំង HF សម្រាប់ម៉ូដែល potion ឋិតិវន្ត                                                                                                                          |
| `MEMORY_STATIC_CACHE_DIR`       | `<DATA_DIR>/embeddings`    | ទីតាំងរក្សាទុកម៉ូដែលដែលបានទាញយក                                                                                                                                  |
| `MEMORY_VEC_TOP_K`              | `20`                       | top-K លំនាំដើមសម្រាប់ការស្វែងរក vector                                                                                                                           |
| `MEMORY_RRF_K`                  | `60`                       | ថេរ k របស់ RRF សម្រាប់ការស្វែងរកបែប hybrid                                                                                                                       |
| `MEMORY_VEC_QUANTIZATION`       | `none`                     | កំណត់ជា `int8` ដើម្បីរក្សាទុក vector sqlite-vec មូលដ្ឋានដោយ quantization (~4× តូចជាងមុន; ត្រូវជ្រើសរើសបើកដោយចេតនា)។ ការផ្លាស់ប្តូររបៀបបង្ខំឱ្យធ្វើ index ឡើងវិញ។ |

## ការសង្ខេប (`summarization.ts`)

`summarizeMemories(apiKeyId, sessionId?, maxTokens = 4000)` បង្រួមមាតិកាចាស់ៗ នៅពេលចំនួន token សរុបដែលកំពុងប្រើក្នុងអង្គចងចាំរបស់ key មួយលើសពីកម្រិតកំណត់។ វាដំណើរការឆ្លងកាត់ជួរទិន្នន័យតាមលំដាប់ DESC ដោយ `created_at` រក្សាទុកជួរដែលអាចដាក់បាន ហើយសម្រាប់ជួរដែលនៅសល់ វាជំនួស `content` នៅនឹងកន្លែងដោយប្រយោគបីដំបូងនៃមាតិកាដើម។ `tokensSaved` គឺជាភាពខុសគ្នានៃ `estimateTokens` រវាងមាតិកាចាស់ និងមាតិកាថ្មី។

ទម្រង់ការងារនេះ **មានឱ្យប្រើ ប៉ុន្តែមិនត្រូវបានហៅដោយស្វ័យប្រវត្តិទេ** ក្នុង pipeline ជជែកបច្ចុប្បន្ន — សូមហៅវាពី cron, សកម្មភាពរបស់អ្នកគ្រប់គ្រង ឬកូដតភ្ជាប់ `MemoryConfig.autoSummarize` ប្រសិនបើអ្នកត្រូវការការបង្រួមជាបន្តបន្ទាប់។ ការបាត់បង់ទិន្នន័យមានទិសតែមួយ៖ អត្ថបទដើមត្រូវបានសរសេរជាន់ពីលើ។

## REST API

endpoint ទាំងអស់ទាមទារការផ្ទៀងផ្ទាត់ភាពត្រឹមត្រូវសម្រាប់ការគ្រប់គ្រង (`requireManagementAuth`)។

### endpoint អង្គចងចាំស្នូល (មានស្រាប់ + បានធ្វើបច្ចុប្បន្នភាព)

| វិធីសាស្ត្រ | Path                 | ការពិពណ៌នា                                                                                                                                                                                         |
| ----------- | -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `GET`       | `/api/memory`        | បញ្ជីដែលបែងចែកជាទំព័រជាមួយតម្រង៖ `apiKeyId`, `type`, `sessionId`, `q`, `limit`, `page`, `offset`។ response រួមបញ្ចូល `stats.total`, `stats.tokensUsed`, `stats.hitRate`, `cacheStats`              |
| `POST`      | `/api/memory`        | បង្កើតធាតុ (បានធ្វើសុពលកម្មដោយ Zod៖ `content`, `key`, និង `type`, `sessionId`, `apiKeyId`, `metadata`, `expiresAt` ដែលអាចដាក់ឬមិនដាក់បាន)។ ហៅ `createMemory()` ដែលធ្វើ upsert លើ `(apiKeyId, key)` |
| `GET`       | `/api/memory/[id]`   | ទាញយកធាតុតែមួយតាម UUID                                                                                                                                                                             |
| `PUT`       | `/api/memory/[id]`   | ធ្វើបច្ចុប្បន្នភាពវាលរបស់ធាតុ (`type`, `key`, `content`, `metadata`)។ Body៖ `MemoryUpdatePutSchema`។ វាក៏ធ្វើសមកាលកម្ម vector ផងដែរ ប្រសិនបើមានប្រភព embedding។                                    |
| `DELETE`    | `/api/memory/[id]`   | លុបធាតុមួយ ហើយក៏លុបចេញពី `vec_memories` (D15) និង Qdrant តាមលទ្ធភាពដែលអាចធ្វើបាន។ ត្រឡប់ 404 នៅពេលរកមិនឃើញ។                                                                                        |
| `GET`       | `/api/memory/health` | ដំណើរការ `verifyExtractionPipeline("health-check")` — បង្កើត→រាយបញ្ជី→លុប ក្នុងវដ្តពេញលេញ។ ត្រឡប់ `{working, latencyMs, error?}`                                                                   |

### endpoint ម៉ាស៊ីនអង្គចងចាំថ្មី (ផែនការ 21)

| វិធីសាស្ត្រ | Path                              | ការពិពណ៌នា                                                                                                                                                                                    |
| ----------- | --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `POST`      | `/api/memory/retrieve-preview`    | ការសាកល្បងដំណើរការ `retrieveMemories` ដោយមិនអនុវត្តពិត — ត្រឡប់លទ្ធផលដែលបានតម្រៀបចំណាត់ថ្នាក់ រួមជាមួយពិន្ទុ កម្រិត និង token។ Body៖ `RetrievePreviewSchema`។ វាមិនបញ្ចូល ឬកែប្រែអង្គចងចាំទេ។ |
| `GET`       | `/api/memory/embedding-providers` | រាយបញ្ជី provider ដែលមានម៉ូដែល embedding ដោយបង្ហាញថា provider ណាខ្លះមាន API key ដែលបានកំណត់រចនាសម្ព័ន្ធ។                                                                                      |
| `GET`       | `/api/memory/engine-status`       | ត្រឡប់ស្ថានភាពពេញលេញរបស់ម៉ាស៊ីន៖ កម្រិត keyword, ការកំណត់ embedding, ស្ថិតិ vector store, សុខភាព Qdrant និងការកំណត់រចនាសម្ព័ន្ធ rerank។ ទម្រង់៖ `MemoryEngineStatusSchema`។                   |
| `POST`      | `/api/memory/summarize`           | បង្កឱ្យមានការបង្រួមអង្គចងចាំដោយដៃ។ Body៖ `MemorySummarizeSchema` (`olderThanDays`, `apiKeyId?`, `dryRun`)។ ត្រឡប់ `{candidates, tokensSaved}`។                                                |
| `POST`      | `/api/memory/reindex`             | បង្កឱ្យមានការធ្វើ index ឡើងវិញសម្រាប់ vector នៃអង្គចងចាំដែលមាន `needs_reindex=1`។ Body៖ `MemoryReindexSchema` (`force`)។ ត្រឡប់ `{started, pending}`។                                         |

### endpoint ការកំណត់

| វិធីសាស្ត្រ | Path                                    | ការពិពណ៌នា                                                                                                        |
| ----------- | --------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `GET`       | `/api/settings/memory`                  | `MemorySettingsExtended` បច្ចុប្បន្នដែលបានធ្វើឱ្យមានទម្រង់ស្តង់ដារ (វាលថ្មី 7 + វាល legacy)                       |
| `PUT`       | `/api/settings/memory`                  | ធ្វើបច្ចុប្បន្នភាពវាលណាមួយពី `MemorySettingsExtendedSchema` (សរុប 12 វាល)                                         |
| `GET`       | `/api/settings/qdrant`                  | ការកំណត់ Qdrant បច្ចុប្បន្ន (`QdrantSettingsSchema`)                                                              |
| `PUT`       | `/api/settings/qdrant`                  | ធ្វើបច្ចុប្បន្នភាពការកំណត់ Qdrant។ Body៖ `QdrantSettingsUpdateSchema`។ `apiKey` = ខ្សែអក្សរទទេនឹងដក key ចេញ។      |
| `GET`       | `/api/settings/qdrant/health`           | ការត្រួតពិនិត្យថានៅដំណើរការប្រឆាំងនឹង instance Qdrant ដែលបានកំណត់រចនាសម្ព័ន្ធ។ ត្រឡប់ `QdrantHealthResultSchema`។ |
| `POST`      | `/api/settings/qdrant/search`           | ការសាកល្បងស្វែងរកតាមន័យប្រឆាំងនឹង Qdrant។ Body៖ `QdrantSearchSchema` (`query`, `topK`)។                           |
| `POST`      | `/api/settings/qdrant/cleanup`          | ដក point របស់ Qdrant សម្រាប់អង្គចងចាំដែលផុតកំណត់ / ចាស់ៗចេញ។                                                      |
| `GET`       | `/api/settings/qdrant/embedding-models` | រាយបញ្ជីម៉ូដែល embedding ដែលអាចប្រើបានសម្រាប់ Qdrant។                                                             |

query សម្រាប់បញ្ជី `/api/memory` គាំទ្រទាំងការបែងចែកជាទំព័រដោយផ្អែកលើ `page`
(`parsePaginationParams`) **ឬ** `offset` ដើម — នៅពេលមាន `offset` វានឹងមានអាទិភាព ហើយ `page` ដែលបានគណនាដោយផ្អែកលើវា នឹងត្រូវបានបង្កើតសម្រាប់ទម្រង់ response។

## ឧបករណ៍ MCP (`open-sse/mcp-server/tools/memoryTools.ts`)

នៅពេលម៉ាស៊ីនមេ MCP ត្រូវបានបើក ឧបករណ៍អង្គចងចាំចំនួនបីត្រូវបានចុះឈ្មោះ៖

- `omniroute_memory_search` — `{apiKeyId, query?, type?, maxTokens?, limit?}`
  → ហៅគ្រប `retrieveMemories()`។ ចាប់ពី v3.8.6 (D16) តទៅ `strategy` ត្រូវបានអាន
  ពី `getMemorySettings()` ជំនួសឱ្យការកំណត់ថេរជា `"exact"`។ ប្រសិនបើ
  `query` ត្រូវបានផ្តល់ ហើយ `strategy` គឺ `semantic` ឬ `hybrid` នោះឃ្លាំងវ៉ិចទ័រ
  នឹងត្រូវបានប្រើ នៅពេលមាន។
- `omniroute_memory_add` — `{apiKeyId, sessionId?, type, key, content,
metadata?}` → ហៅគ្រប `createMemory()`។ ទទួលយកតែប្រភេទស្តង់ដារទាំង 4 ប៉ុណ្ណោះ៖
  `factual`, `episodic`, `procedural`, `semantic` (D17)។
- `omniroute_memory_clear` — `{apiKeyId, type?, olderThan?}` → រាយធាតុដែលត្រូវគ្នា
  ច្រោះតាមត្រាពេលវេលាដែលបានបង្កើតមុនជាជម្រើស ហើយបន្ទាប់មកលុបធាតុនីមួយៗ
  តាមរយៈ `deleteMemory()` (ដែលក៏លុបវ៉ិចទ័រចេញពី sqlite-vec + Qdrant ផងដែរ)។

សូមមើល [MCP-SERVER.md](./MCP-SERVER.md) សម្រាប់ព័ត៌មានលម្អិតអំពីការបញ្ជូន និងវិសាលភាព។

## ផ្ទាំងគ្រប់គ្រង (ស្ទូឌីយោអង្គចងចាំ)

`src/app/(dashboard)/dashboard/memory/page.tsx` ឥឡូវនេះគឺជា **ស្ទូឌីយោដែលមាន 3 ផ្ទាំង**៖

### ផ្ទាំង៖ អង្គចងចាំ

- កាតគោលគំនិត (សេចក្តីពន្យល់ "របៀបដែលវាដំណើរការ" ដែលអាចបង្រួមបាន)។
- បញ្ជី ការស្វែងរក និងការបែងចែកទំព័រតាមពេលវេលាជាក់ស្តែង (ពន្យារ 300 ms)។
- តម្រងប្រភេទ (`factual` / `episodic` / `procedural` / `semantic` / ទាំងអស់)។
- ម៉ូឌុលបន្ថែមអង្គចងចាំ (សោ មាតិកា ប្រភេទ)។
- កែសម្រួលក្នុងជួរ (ប៊ូតុងខ្មៅដៃ → `PUT /api/memory/[id]`)។
- លុបតាមជួរនីមួយៗ (ជាមួយប្រអប់បញ្ជាក់)។
- នាំចេញ JSON នៃទំព័របច្ចុប្បន្ន; នាំចូល JSON តាមរយៈឧបករណ៍ជ្រើសរើសឯកសារ។
- កាតស្ថិតិ៖ `totalEntries`, `tokensUsed`, `hitRate`។
- ប៊ូតុង "បង្រួមទិន្នន័យចាស់" → `POST /api/memory/summarize` (ការសាកល្បងដោយមិនអនុវត្តជាមុន បង្ហាញ
  ចំនួនបេក្ខភាព បន្ទាប់មកស្នើឱ្យបញ្ជាក់)។
- ចំណុចស្ថានភាពពណ៌បៃតង/ក្រហម ដែលដំណើរការដោយ `GET /api/memory/health`។

### ផ្ទាំង៖ កន្លែងសាកល្បង

- ប្រអប់បញ្ចូលសំណួរ + ឧបករណ៍ជ្រើសរើសយុទ្ធសាស្ត្រ (ត្រូវគ្នាពិតប្រាកដ / តាមន័យ / ចម្រុះ) + ថវិកាតូខិន។
- "ក្លែងធ្វើ" → `POST /api/memory/retrieve-preview` — បង្ហាញលទ្ធផលដែលបានចាត់ចំណាត់ថ្នាក់ជាមួយ
  `score`, `tier`, `tokens`, `vecScore`, `ftsScore`។
- ផ្ទាំងដំណោះស្រាយដែលបង្ហាញថាប្រភព embedding / ឃ្លាំងវ៉ិចទ័រណាមួយត្រូវបានប្រើ និង
  ថាតើមានការប្រើជម្រើសបម្រុងឬអត់។

### ផ្ទាំង៖ ម៉ាស៊ីន

- ផ្ទាំងស្ថានភាពម៉ាស៊ីន (ស្លាក keyword FTS5, ស្លាក embedding, ស្លាកឃ្លាំងវ៉ិចទ័រ,
  ស្លាកសុខភាព Qdrant, ស្លាករៀបចំណាត់ថ្នាក់ឡើងវិញ)។
- ប៊ូតុង "ធ្វើលិបិក្រមឡើងវិញឥឡូវនេះ" → `POST /api/memory/reindex`។
- ឧបករណ៍ជ្រើសរើសប្រភព embedding (ស្វ័យប្រវត្តិ / ពីចម្ងាយ / ឋិតិវន្ត / transformers + ប៊ូតុងបិទបើក)។
- កាតកំណត់រចនាសម្ព័ន្ធ Qdrant (ប៊ូតុងបិទបើក កម្មវិធីបង្ហោះ/ច្រក/បណ្តុំ/សោ សាកល្បងការតភ្ជាប់
  សាកល្បងការស្វែងរកតាមន័យ ការសម្អាត)។
- កាតកំណត់រចនាសម្ព័ន្ធការរៀបចំណាត់ថ្នាក់ឡើងវិញ (ប៊ូតុងបិទបើក ឧបករណ៍ជ្រើសរើសអ្នកផ្តល់សេវា/ម៉ូដែល)។

ការកំណត់អង្គចងចាំ និង Qdrant ក៏ស្ថិតនៅក្រោម
`/dashboard/settings → Memory & Skills` (`MemorySkillsTab.tsx`) សម្រាប់
ផ្ទៃការកំណត់សកល/ចាស់។

## ការរក្សាទុកក្នុងឃ្លាំងសម្ងាត់

`src/lib/memory/store.ts` រក្សាឃ្លាំងសម្ងាត់បែប LRU-ish ក្នុងដំណើរការ
(`MEMORY_CACHE_TTL = 1 min`, `MEMORY_MAX_CACHE_SIZE = 500`, ជាមួយការបណ្តេញធាតុចាស់បំផុត 20 %
ចេញ) សម្រាប់ការអាន `getMemory(id)` បូករួមទាំងស្រទាប់ឃ្លាំងសម្ងាត់សោ/តម្លៃទូទៅ
`memoryCache` (`src/lib/memory/cache.ts`) ដែលមានវិធីសាស្ត្រ `get`/`set`/`invalidate`
ប្រើដោយអ្នកហៅដែលចង់បានឃ្លាំងសម្ងាត់មានវិសាលភាពផ្ទាល់ខ្លួន (LRU ចំនួន 1 000 ធាតុ,
TTL លំនាំដើម 5 min)។

## ភាពឯកជន & វដ្តជីវិត

- កម្មសិទ្ធិអង្គចងចាំគឺជា ID របស់ API key (`resolveMemoryOwnerId` នៅក្នុង
  `chatCore.ts`)។ បើគ្មាន `apiKeyInfo.id` ទេ ទាំងការទាញយក ការបញ្ចូល
  និងការស្រង់ចេញនឹងមិនដំណើរការឡើយ។
- ធាតុដែលមាន `expires_at` នៅពេលអនាគត ត្រូវបានច្រោះចេញពីការទាញយក។ ធាតុចាស់ៗ
  ដែលហួសពី `retentionDays` ត្រូវបានដកចេញដោយឃ្លា
  `created_at >= cutoff` នៅក្នុង `retrieveMemories`។
- សម្រាប់ការលុបជាអចិន្ត្រៃយ៍ សូមប្រើ `DELETE /api/memory/[id]` ឬ `omniroute_memory_clear`។
- ការស្រង់ចេញដំណើរការដោយមិនរង់ចាំលទ្ធផលតាមរយៈ `setImmediate`។ កំហុសត្រូវបានកត់ត្រាក្រោម
  `memory.extraction.background.failed` ហើយមិនត្រូវបានបង្ហាញទៅអ្នកហៅឡើយ។
- ការធ្វើដំណើរទៅមកសម្រាប់ការផ្ទៀងផ្ទាត់ (`verifyExtractionPipeline`) សម្អាត
  ធាតុសាកល្បងរបស់ខ្លួននៅក្នុងប្លុក `finally`។

## សូមមើលផងដែរ

- [SKILLS.md](./SKILLS.md) — ការកំណត់ `skillsEnabled` បញ្ចូលនិយមន័យឧបករណ៍
  រួមជាមួយអង្គចងចាំ។
- [MCP-SERVER.md](./MCP-SERVER.md) — មធ្យោបាយបញ្ជូន / វិសាលភាព MCP។
- [API_REFERENCE.md](../reference/API_REFERENCE.md) — ផ្ទៃប្រើប្រាស់ API ដែលទូលំទូលាយជាងនេះ។
- ម៉ូឌុលប្រភព៖
  - `src/lib/memory/types.ts`, `schemas.ts`
  - `src/lib/memory/store.ts`, `retrieval.ts`, `injection.ts`, `reindex.ts`
  - `src/lib/memory/extraction.ts`, `summarization.ts`, `verify.ts`
  - `src/lib/memory/settings.ts`, `qdrant.ts`, `cache.ts`
  - `src/lib/memory/vectorStore.ts` — sqlite-vec + RRF កូនកាត់
  - `src/lib/memory/embedding/index.ts` — ស្រទាប់ embedding ពហុប្រភព
  - `src/lib/memory/embedding/types.ts`, `remote.ts`, `staticPotion.ts`,
    `transformersLocal.ts`, `cache.ts`
  - `src/shared/schemas/memory.ts` — Zod schemas សម្រាប់ body ទាំងអស់របស់ memory API
  - `src/shared/schemas/qdrant.ts` — Zod schemas សម្រាប់ការកំណត់/ប្រតិបត្តិការ Qdrant
  - `src/lib/db/memoryVec.ts` — CRUD សម្រាប់ `memory_vec_meta`
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
  - `src/app/api/settings/qdrant/route.ts` + ផ្លូវរង
  - `src/app/(dashboard)/dashboard/memory/` — UI របស់ Studio (ទំព័រ + សមាសភាគ +
    ផ្ទាំង + hooks)
  - `open-sse/handlers/chatCore.ts` (ការតភ្ជាប់ការបញ្ចូល / ការស្រង់ចេញ)
  - `open-sse/mcp-server/tools/memoryTools.ts`

---

## ការជ្រើសរើសអ្នកផ្តល់ Embedding (v3.8.16+)

ម៉ាស៊ីនអង្គចងចាំរបស់ OmniRoute គាំទ្រ **ប្រភព embedding ចំនួនបួន** (`src/lib/memory/embedding/`)។ ប្រភពនីមួយៗមានការដោះដូរខុសៗគ្នាទាក់ទងនឹង **រយៈពេលឆ្លើយតប ថ្លៃចំណាយ គុណភាពម៉ូដែល និងភាពស្មុគស្មាញនៃការដំឡើង**។

### ប្រភព Embedding

| អ្នកផ្តល់      | ប្រភព                                          | រយៈពេលឆ្លើយតប                   | ថ្លៃចំណាយ            | គុណភាព                           | ការដំឡើង                                    |
| -------------- | ---------------------------------------------- | ------------------------------- | -------------------- | -------------------------------- | ------------------------------------------- |
| `transformers` | ម៉ូដែល ONNX មូលដ្ឋាន (Xenova/all-MiniLM-L6-v2) | ~50-150ms (CPU)                 | ឥតគិតថ្លៃ            | ល្អ                              | ត្រឹមតែ `npm install`                       |
| `static`       | វ៉ិចទ័រដែលបានគណនាជាមុន (បាន cache)             | <1ms                            | ឥតគិតថ្លៃ            | មិនអនុវត្ត (អាស្រ័យលើ cache hit) | គ្មាន                                       |
| `remote`       | OpenAI / Cohere / Voyage API                   | ~100-300ms                      | $0.02-0.10/1M tokens | ល្អឥតខ្ចោះ                       | API key                                     |
| `auto`         | ជ្រើសរើសប្រភពល្អបំផុតដែលមាននៅពេលដំណើរការ       | ដូចគ្នានឹងប្រភពដែលបានជ្រើសរើស   | ឥតគិតថ្លៃ            | ដូចគ្នានឹងប្រភពដែលបានជ្រើសរើស    | គ្មាន                                       |
| _(cache)_      | ស្រទាប់ LRU ក្នុងអង្គចងចាំពីលើប្រភពណាមួយ       | <1ms (hit), រយៈពេលពេញលេញ (miss) | ឥតគិតថ្លៃ            | ដូចគ្នានឹងប្រភពមូលដ្ឋាន          | បើកជានិច្ច (មិនមែនជាប្រភពដែលអាចជ្រើសរើសបាន) |

### មែកធាងសម្រេចចិត្ត

```
                  បរិបទនៃការដាក់ឱ្យដំណើរការរបស់អ្នកជាអ្វី?
                  │
      ┌───────────┼───────────┬──────────────┐
      │           │           │              │
  អភិវឌ្ឍន៍/សាកល្បង ផលិតកម្មតូច ផលិតកម្មធំ    EDGE / ក្រៅបណ្តាញ
      │           │           │              │
      ▼           ▼           ▼              ▼
  transformers transformers remote (Qdrant) transformers
  (ឥតគិតថ្លៃ គ្មាន API)      (គុណភាពល្អបំផុត) (គ្មានអ៊ីនធឺណិត)
      │           │           │              │
      └────────┬──┴───────────┴──────────────┘
               │
               ▼
            ត្រូវបន្ថែមស្រទាប់ `cache` នៅពីលើជានិច្ច
            (LruCache រុំជុំវិញអ្នកផ្តល់ណាមួយ)
```

### ការកំណត់រចនាសម្ព័ន្ធមូលដ្ឋានទិន្នន័យ & API

ជម្រើស memory embedding ត្រូវបានកំណត់តាមរយៈ Settings API/UI មិនមែន environment variables ទេ។ Database keys នៃការកំណត់ដែលពាក់ព័ន្ធក្រោម Settings (`normalizeMemorySettings` នៅក្នុង `src/lib/memory/settings.ts`) គឺ៖

- `memoryEmbeddingSource`: `"transformers"` (មូលដ្ឋាន), `"remote"` (ផ្អែកលើ API ឧ. OpenAI), `"static"` (ឃ្លាំងខាងក្រៅ) ឬ `"auto"`
- `memoryEmbeddingProviderModel`: អត្តសញ្ញាណម៉ូដែលសម្រាប់ប្រភព remote/static (ឧ. `"text-embedding-3-small"`)
- `memoryTransformersEnabled`: `true` | `false`
- `memoryStaticEnabled`: `true` | `false`
- `memoryVectorStore`: `"sqlite-vec"`, `"qdrant"` ឬ `"auto"`

#### ម៉ូដែលមូលដ្ឋាន (`transformers`)

ប្រើ transformers.js នៅខាងក្នុង ដើម្បីដំណើរការម៉ូដែលមូលដ្ឋាន៖

```bash
# Environment variables ដែលបានអាននៅក្នុងកូដ (src/lib/memory/embedding/index.ts):
MEMORY_TRANSFORMERS_MODEL=Xenova/all-MiniLM-L6-v2  # ឃ្លាំងម៉ូដែល HF
MEMORY_STATIC_MODEL=minishlab/potion-base-8M       # ម៉ូដែល static potion របស់ HF
MEMORY_STATIC_CACHE_DIR=<DATA_DIR>/embeddings      # ថត cache
```

#### LRU Embedding Cache

Cache ត្រូវបានបើកជានិច្ចតាមលំនាំដើម ហើយកំណត់រចនាសម្ព័ន្ធតាមរយៈ environment variables៖

```bash
MEMORY_EMBEDDING_CACHE_MAX=1000                    # ចំនួនធាតុដែលបាន cache អតិបរមា
MEMORY_EMBEDDING_CACHE_TTL_MS=300000               # TTL (5 នាទី)
```

### តួលេខសមត្ថភាពដំណើរការ

ការធ្វើតេស្តសមត្ថភាពលើម៉ាស៊ីនមេ x86 ដែលមាន 4-core ទូទៅ (អត្ថបទនីមួយៗមានប្រហែល 100 token)៖

| អ្នកផ្តល់សេវា        | p50   | p95   | p99   | តម្លៃ / embedding 1M               |
| -------------------- | ----- | ----- | ----- | ---------------------------------- |
| `transformers` (CPU) | 80ms  | 180ms | 350ms | ឥតគិតថ្លៃ                          |
| `remote` (OpenAI)    | 120ms | 220ms | 400ms | ~$0.02 (ada-002) / $0.13 (3-large) |
| `static` (Qdrant)    | 15ms  | 30ms  | 60ms  | អាស្រ័យលើសេវាបង្ហោះ Qdrant         |
| `cache` (ត្រូវគ្នា)  | <1ms  | <1ms  | 2ms   | ឥតគិតថ្លៃ                          |

---

## លំនាំស្រង់ទិន្នន័យជាក់ស្តែង (v3.8.16+)

ម៉ូឌុល `extraction.ts` (`src/lib/memory/extraction.ts`) ប្រើ **ការផ្គូផ្គងលំនាំ regex** ដើម្បីស្រង់ទិន្នន័យជាក់ស្តែងដែលមានរចនាសម្ព័ន្ធពីសារសន្ទនា។ ការយល់ដឹងអំពីលំនាំទាំងនេះអាចជួយអ្នកកែសម្រួលគុណភាពនៃការស្រង់ឱ្យសមនឹងករណីប្រើប្រាស់របស់អ្នក។

### ប្រភេទលំនាំលំនាំដើម

| ប្រភេទ              | ឧទាហរណ៍លំនាំ                                                | ទិន្នន័យដែលចាប់យក                             |
| ------------------- | ----------------------------------------------------------- | --------------------------------------------- |
| PREFERENCE_PATTERNS | `"I prefer <X>"`, `"I like <X>"`, `"I hate <X>"`            | ចំណូលចិត្តរបស់អ្នកប្រើ                        |
| DECISION_PATTERNS   | `"I'll use <X>"`, `"I decided to <X>"`, `"I went with <X>"` | ការសម្រេចចិត្តរបស់អ្នកប្រើ (តាមព្រឹត្តិការណ៍) |
| PATTERN_PATTERNS    | `"I usually <X>"`, `"I always <X>"`, `"I never <X>"`        | លំនាំឥរិយាបថដែលបន្តមានជាប់លាប់                |

### ឧទាហរណ៍លំនាំ (បានសម្រួល)

```ts
// ពី src/lib/memory/extraction.ts
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

### អ្វីដែលត្រូវបានស្រង់ចេញ

នៅពេលអ្នកប្រើនិយាយថា៖

> "ខ្ញុំចូលចិត្ត TypeScript។ ខ្ញុំនឹងប្រើ Postgres សម្រាប់គម្រោងនេះ។ ខ្ញុំតែងតែ commit មុនពេល pushing។ ខ្ញុំមិនចូលចិត្ត Python ទេ។"
> ការស្រង់បង្កើតអង្គចងចាំ 4៖
>
> | សោ                                   | ប្រភេទ         | ប្រភេទទិន្នន័យ   | ខ្លឹមសារ                    |
> | ------------------------------------ | -------------- | ---------------- | --------------------------- |
> | `preference:typescript`              | ចំណូលចិត្ត     | ជាក់ស្តែង        | "TypeScript"                |
> | `decision:postgres_for_this_project` | ការសម្រេចចិត្ត | តាមព្រឹត្តិការណ៍ | "Postgres សម្រាប់គម្រោងនេះ" |
> | `pattern:commit_before_pushing`      | លំនាំ          | ជាក់ស្តែង        | "commit មុនពេល pushing"     |
> | `preference:python`                  | ចំណូលចិត្ត     | ជាក់ស្តែង        | "Python"                    |

### ដែនកំណត់នៃការស្រង់

ដើម្បីទប់ស្កាត់ការស្រង់ដែលកើនឡើងដោយមិនអាចគ្រប់គ្រងបាន ដែនកំណត់ខាងក្រោមត្រូវបានអនុវត្ត៖

| ប្រវែងខ្លឹមសារអប្បបរមា | 3 តួអក្សរ |
| ប្រវែងខ្លឹមសារអតិបរមា | 500 តួអក្សរ |

### ពេលណាគួរបិទការស្រង់

ការស្រង់ដំណើរការដោយស្វ័យប្រវត្តិរាល់ពេលអង្គចងចាំត្រូវបានបើក។ មិនមានប៊ូតុងបិទបើកដាច់ដោយឡែកសម្រាប់តែការស្រង់នោះទេ។ ដើម្បីបិទវា សូមបិទអង្គចងចាំទាំងស្រុង (`enabled: false`
តាមរយៈ `PUT /api/settings/memory`)។ សូមពិចារណាធ្វើដូច្នេះនៅពេល៖

- អ្នកមានបរិមាណសារច្រើន ហើយចំណាយលើការស្រង់មានទំហំគួរឱ្យកត់សម្គាល់
- ការសន្ទនារបស់អ្នកភាគច្រើនមានលក្ខណៈបណ្តោះអាសន្ន (ជជែក កែបញ្ហាកូដ) និងមិនមានតម្លៃរយៈពេលវែង
- អ្នកកំពុងចាប់យកបរិបទរួចហើយតាមរយៈកម្មវិធីជំនួយផ្ទាល់ខ្លួន

---

## ការកែសម្រួល Hybrid RRF (v3.8.16+)

ក្បួនដោះស្រាយ **Reciprocal Rank Fusion (RRF)** រួមបញ្ចូលលទ្ធផល FTS5 (ពាក្យគន្លឹះ) និងវ៉ិចទ័រ (អត្ថន័យ)។ ប៉ារ៉ាម៉ែត្រ `k` គ្រប់គ្រងទម្ងន់ដែលផ្តល់ឱ្យលទ្ធផលដែលមានចំណាត់ថ្នាក់ទាប។

### រូបមន្ត

សម្រាប់អង្គចងចាំបេក្ខភាពនីមួយៗ ពិន្ទុ RRF គឺ៖

```
RRF(d) = Σ  1 / (k + rank_i(d))
```

ដែល៖

- `k` គឺជាថេរ (លំនាំដើម 60)
- `rank_i(d)` គឺជាចំណាត់ថ្នាក់នៃឯកសារ `d` នៅក្នុងប្រព័ន្ធស្វែងរកទី i (FTS, វ៉ិចទ័រ)
- ផលបូកគ្របដណ្តប់លើប្រព័ន្ធស្វែងរកទាំងអស់

### របៀបដែល `k` ប៉ះពាល់ដល់លទ្ធផល

| តម្លៃ `k`             | ឥទ្ធិពល                                                                                      | សមស្របបំផុតសម្រាប់                     |
| --------------------- | -------------------------------------------------------------------------------------------- | -------------------------------------- |
| `k=0`                 | ការរួមបញ្ចូលចំណាត់ថ្នាក់សុទ្ធ (គ្មានការធ្វើឱ្យរលូន)                                          | មូលដ្ឋានទ្រឹស្តី                       |
| `k=10-30`             | ផ្តល់ទម្ងន់ខ្លាំងដល់លទ្ធផលកំពូល ខណៈចំណាត់ថ្នាក់ទាបចូលរួមចំណែកតិចតួចបំផុត                     | នៅពេលលទ្ធផលកំពូល 3 ជាទូទៅត្រឹមត្រូវ    |
| **`k=60`** (លំនាំដើម) | មានតុល្យភាព — លទ្ធផលកំពូល 10 សុទ្ធតែចូលរួមចំណែកយ៉ាងមានន័យ                                    | ការស្វែងរកសម្រាប់គោលបំណងទូទៅ           |
| `k=100+`              | រាបស្មើជាងមុន — សូម្បីតែលទ្ធផលចំណាត់ថ្នាក់ទាបក៏អាចលេចធ្លោ ប្រសិនបើវាបង្ហាញក្នុងប្រព័ន្ធច្រើន | នៅពេល recall > precision មានសារៈសំខាន់ |

### ការកែសម្រួល `k` ក្នុងការអនុវត្ត

```bash
# លំនាំដើម
MEMORY_RRF_K=60

# ភាពជាក់លាក់ខ្ពស់ (អង្គចងចាំតូច ឯកសារតិច)
MEMORY_RRF_K=20

# ការរកឃើញអតិបរមា (អង្គចងចាំធំ សំណួរចម្រុះ)
MEMORY_RRF_K=120
```

**ឧទាហរណ៍ជាមួយ `k=20`៖**

- ចំណាត់ថ្នាក់ FTS 1 → ការចូលរួមចំណែក `1/21 = 0.048`
- ចំណាត់ថ្នាក់ FTS 10 → ការចូលរួមចំណែក `1/30 = 0.033`
- ចំណាត់ថ្នាក់វ៉ិចទ័រ 1 → ការចូលរួមចំណែក `0.048`
- អតិបរមារួមបញ្ចូលគ្នា៖ `0.096`

**ឧទាហរណ៍ជាមួយ `k=60`៖**

- ចំណាត់ថ្នាក់ FTS 1 → ការចូលរួមចំណែក `1/61 = 0.016`
- ចំណាត់ថ្នាក់ FTS 10 → ការចូលរួមចំណែក `1/70 = 0.014`
- ចំណាត់ថ្នាក់វ៉ិចទ័រ 1 → ការចូលរួមចំណែក `0.016`
- អតិបរមារួមបញ្ចូលគ្នា៖ `0.033`

ជាមួយ `k` ខ្ពស់ជាងមុន **ភាពខុសគ្នាដែលទាក់ទងគ្នា** រវាងចំណាត់ថ្នាក់កំពូល 1 និងចំណាត់ថ្នាក់ 10 កាន់តែតូច ដូច្នេះក្បួនដោះស្រាយពឹងផ្អែកលើ **ការឯកភាពគ្នារវាងប្រព័ន្ធស្វែងរក** ច្រើនជាងភាពជឿជាក់លើចំណាត់ថ្នាក់កំពូល។

### ពេលណាគួរផ្លាស់ប្តូរ `k`

| រោគសញ្ញា                                               | សាកល្បង                                                                    |
| ------------------------------------------------------ | -------------------------------------------------------------------------- |
| លទ្ធផលកំពូលតែងតែឈ្នះ ប៉ុន្តែវាខុស                      | **បន្ថយ** k (ឧ., 20) — ភាពជឿជាក់លើចំណាត់ថ្នាក់កំពូលមានសារៈសំខាន់ជាង        |
| ចម្លើយត្រឹមត្រូវស្ថិតក្នុងកំពូល 5 ប៉ុន្តែមិនមែនកំពូល 1 | **បង្កើន** k (ឧ., 100) — ការដាក់ពិន្ទុរាបស្មើជាងមុនផ្តល់រង្វាន់ដល់ការឯកភាព |
| Recall ខ្ពស់ ប៉ុន្តែ precision ទាប                     | **បន្ថយ** k — ធ្វើឱ្យចំណាត់ថ្នាក់កាន់តែច្បាស់                              |
| Recall ទាប (ខកខានឯកសារដែលពាក់ព័ន្ធ)                    | **បង្កើន** k — ផ្តល់ឱកាសឱ្យឯកសារដែលមានចំណាត់ថ្នាក់ទាប                      |

### ការផ្តល់ទម្ងន់ RRF

ការរួមបញ្ចូលចំណាត់ថ្នាក់ច្រាសប្រើទម្ងន់ស្មើគ្នាសម្រាប់ចំណាត់ថ្នាក់វ៉ិចទ័រតាមអត្ថន័យ និងចំណាត់ថ្នាក់ស្វែងរកអត្ថបទពេញលេញ៖

```
RRF(d) = 1/(k + rank_vector) + 1/(k + rank_fts)
```

មិនមានអថេរបរិស្ថានសម្រាប់កែសម្រួលទម្ងន់នីមួយៗទេ (`MEMORY_RRF_VECTOR_WEIGHT`/`MEMORY_RRF_FTS_WEIGHT` មិនមានឡើយ)។

---

## យុទ្ធសាស្ត្រសង្ខេប (v3.8.16+)

ម៉ូឌុល `summarization.ts` (`src/lib/memory/summarization.ts`) បង្រួមអង្គចងចាំចាស់ៗ ដើម្បីរក្សាសំណុំដែលសកម្មឱ្យមានទំហំតូច ខណៈពេលនៅតែរក្សាសមត្ថភាពរំឭកឡើងវិញ។

### ពេលដែលការសង្ខេបត្រូវបានចាប់ផ្ដើម

| កត្តាចាប់ផ្ដើម        | កម្រិតកំណត់ (លំនាំដើម) |
| --------------------- | ---------------------- |
| ចាប់ផ្ដើមដោយដៃតាម API | មិនអនុវត្ត             |

### អ្វីដែលត្រូវបានសង្ខេប

មានចំណុចចូលពីរដែលត្រូវបាន export ចេញពី `summarization.ts`៖

- **`summarizeMemories(apiKeyId, sessionId?, maxTokens = 4000)`** — បង្រួម
  អង្គចងចាំសម្រាប់ session មួយទៅជាអត្ថបទសង្ខេបតែមួយ ដែលកំណត់ដោយថវិកា token។
- **`summarizeMemoriesOlderThan(apiKeyId, days, dryRun)`** — ការបង្រួមផ្អែកលើ
  អាយុ ដែលប្រើដោយ API៖ វាជ្រើសរើសរាល់អង្គចងចាំដែលចាស់ជាង `days` បង្កើត
  អង្គចងចាំសង្ខេបដែលបានបង្រួមមួយពីពួកវា ហើយ (នៅពេល `dryRun` ជា `false`) លុប
  អង្គចងចាំដើមចេញ។ បញ្ជូន `dryRun: true` ដើម្បីមើលសំណុំដែលជាបេក្ខភាព និងចំនួន token សរុប
  ជាមុន ដោយមិនកែប្រែអ្វីទាំងអស់។

មិនមានដំណាក់កាលដាក់ជាក្រុមតាម tag/key ឬការដាក់ពិន្ទុ "ស្នូល ទល់នឹង អាចសង្ខេបបាន" សម្រាប់អង្គចងចាំនីមួយៗទេ —
ការជ្រើសរើសគឺផ្អែកតែទៅលើកម្រិតកាត់អាយុប៉ុណ្ណោះ ហើយអត្ថបទសង្ខេបគឺជាបន្ទាត់
ដែលមានបុព្វបទប្រភេទ និងត្រូវបានបង្រួម សម្រាប់បេក្ខភាពនីមួយៗ។

### ការចាប់ផ្ដើមការសង្ខេប

ការសង្ខេបគឺ **ដោយដៃ / ជ្រើសរើសប្រើ** — ការកំណត់ `autoSummarize` គឺ `false` តាម
លំនាំដើម ដូច្នេះគ្មានអ្វីត្រូវបានបង្រួមដោយស្វ័យប្រវត្តិទេ។ ចាប់ផ្ដើមវាតាម API៖

```bash
curl -X POST http://localhost:20128/api/memory/summarize \
  -H "Authorization: Bearer $OMNIROUTE_KEY"
```

ដើម្បីទុកវាឱ្យបិទ គ្រាន់តែរក្សា `autoSummarize` នៅតម្លៃលំនាំដើមរបស់វា (`false`)។

### គន្លឹះសម្រាប់គុណភាពនៃការសង្ខេប

- **មើលជាមុនសិនដោយប្រើ `dryRun`** — `summarizeMemoriesOlderThan(..., true)` ត្រឡប់
  បញ្ជីបេក្ខភាព និងចំនួន token សរុប ដូច្នេះអ្នកអាចបញ្ជាក់អ្វីដែលនឹងត្រូវបញ្ចូលគ្នា
  មុនពេលលុបអង្គចងចាំដើម។
- **ដំណើរការការសង្ខេបក្នុងម៉ោងដែលមានចរាចរណ៍ទាប** ប្រសិនបើអ្នកមានបណ្ដុំអង្គចងចាំធំ — ការហៅ LLM គឺជាផ្នែកដែលយឺត

```bash
# របៀប Cron៖ សង្ខេបរៀងរាល់ថ្ងៃនៅម៉ោង 3 ព្រឹក
0 3 * * * curl -X POST http://localhost:20128/api/memory/summarize \
  -H "Authorization: Bearer $OMNIROUTE_KEY"
```

---

## លំនាំអ្នកផ្ដល់សេវា MemoryBackend

> **ប្រភពពិតប្រាកដ៖** `src/lib/memory/backend.ts`, `src/lib/memory/genericBackend.ts`, `src/lib/memory/manager.ts`
> **ការធ្វើតេស្ត៖** `src/lib/memory/__tests__/generic-backend.test.ts`

លំនាំអ្នកផ្ដល់សេវា MemoryBackend ណែនាំនូវ **ស្រទាប់អរូបី backend ដែលអាចដោតប្ដូរបាន** លើម៉ាស៊ីនអង្គចងចាំដែលមានស្រាប់។ ជំនួសឱ្យការជាប់ពាក់ព័ន្ធនឹងការអនុវត្តការផ្ទុកតែមួយ ឥឡូវនេះប្រព័ន្ធអង្គចងចាំគាំទ្រ backend ជាច្រើន (SQLite, Obsidian, Notion និង backend HTTP ផ្ទាល់ខ្លួន) ជាមួយការកំណត់រចនាសម្ព័ន្ធនៃការបញ្ជូនផ្លូវ primary/fallback។

### ស្ថាបត្យកម្ម

```
┌──────────────────────────────────────────────────────────┐
│                    ផ្លូវ API                              │
│            (src/app/api/memory/route.ts)                  │
└──────────────────────┬───────────────────────────────────┘
                       │
┌──────────────────────▼───────────────────────────────────┐
│                   MemoryManager                           │
│           អ្នកសម្របសម្រួល Singleton (manager.ts)          │
│                                                          │
│  ចម្បង ──► Backend A  (ឧ. SQLite)                        │
│  បម្រុង ─► Backend B  (ឧ. Obsidian)                      │
│             Backend C  (ឧ. Notion តាម GenericBackend)    │
└──────────────────────┬───────────────────────────────────┘
                       │
        ┌──────────────┼──────────────┐
        ▼              ▼              ▼
┌────────────┐ ┌────────────┐ ┌──────────────────┐
│ SQLite     │ │ Obsidian   │ │ GenericMemory    │
│ Backend    │ │ Backend    │ │ Backend (HTTP)   │
└────────────┘ └────────────┘ └──────────────────┘
```

#### ចំណុចប្រទាក់ស្នូល (`backend.ts`)

រាល់ backend ត្រូវតែអនុវត្តចំណុចប្រទាក់ `MemoryBackend`៖

```typescript
interface MemoryBackend {
  readonly id: string;
  readonly displayName: string;

  // បង្កើត អាន ធ្វើបច្ចុប្បន្នភាព និងលុប
  create(input: CreateMemoryInput): Promise<Memory>;
  get(id: string): Promise<Memory | null>;
  update(id: string, updates: Partial<...>): Promise<boolean>;
  delete(id: string): Promise<boolean>;
  list(filter: MemoryFilter): Promise<{ data: Memory[]; total: number; byType: Record<string, number> }>;

  // ស្វែងរក
  search(config: SearchConfig): Promise<Memory[]>;

  // ស្ថានភាពដំណើរការ
  health(): Promise<HealthCheckResult>;

  // វដ្ដជីវិត (ជាជម្រើស)
  initialize?(): Promise<void>;
  shutdown?(): Promise<void>;
}
```

#### MemoryManager (`manager.ts`)

អ្នកសម្របសម្រួល Singleton ដែល៖

- **ចុះឈ្មោះ** backend តាមរយៈ `register(backend)` — ត្រូវបានហៅនៅពេលចាប់ផ្ដើមពី `index.ts`
- **កំណត់រចនាសម្ព័ន្ធ** primary + fallback តាមរយៈ `configure(primary, fallbacks)`
- **បញ្ជូនផ្លូវ** CRUD/ការស្វែងរកទៅ primary ដោយប្រើខ្សែសង្វាក់ fallback នៅពេលបរាជ័យ
- **ត្រួតពិនិត្យស្ថានភាពដំណើរការ** របស់ backend ទាំងអស់តាមកាលកំណត់

**ឥរិយាបថ fallback៖**

| ប្រតិបត្តិការ | Primary                  | Fallbacks                          |
| ------------- | ------------------------ | ---------------------------------- |
| `create`      | ✅ តែ Primary ប៉ុណ្ណោះ   | ❌                                 |
| `get`         | ✅ សាកល្បង primary ជាមុន | ✅ Fallback ប្រសិនបើ null          |
| `update`      | ✅ តែ Primary ប៉ុណ្ណោះ   | ✅ ធ្វើសមកាលកម្មដោយមិនរង់ចាំលទ្ធផល |
| `delete`      | ✅ តែ Primary ប៉ុណ្ណោះ   | ✅ ធ្វើសមកាលកម្មដោយមិនរង់ចាំលទ្ធផល |
| `list`        | ✅ តែ Primary ប៉ុណ្ណោះ   | ❌                                 |
| `search`      | ✅ Primary ជាមុន         | ✅ Fallback នៅពេលមានកំហុស          |

#### GenericMemoryBackend (`genericBackend.ts`)

ឧបករណ៍តភ្ជាប់ HTTP ទូទៅដែលសម្រប REST API ណាមួយឱ្យទៅជា MemoryBackend។ មានប្រយោជន៍សម្រាប់៖

- **Notion** — តភ្ជាប់តាម Notion API
- **Obsidian** — តភ្ជាប់តាម Obsidian Local REST API
- **Backend ផ្ទាល់ខ្លួន** — សេវាណាមួយដែលបង្ហាញ RESTful memory API

**ការកំណត់រចនាសម្ព័ន្ធ៖**

```typescript
interface GenericBackendConfig {
  baseUrl: string;           // URL មូលដ្ឋានរបស់ backend API
  apiKey?: string;           // Bearer token សម្រាប់ការផ្ទៀងផ្ទាត់អត្តសញ្ញាណ
  headers?: Record<string, string>;  // HTTP headers ផ្ទាល់ខ្លួន
  timeout?: number;          // រយៈពេលអស់សុពលភាពនៃសំណើ (លំនាំដើម៖ 30000ms)
  backendType?: string;      // សម្រាប់ការកត់ត្រា log

  // ការកំណត់ជំនួស endpoint (តម្លៃលំនាំដើមប្រើអនុសញ្ញា REST)
  endpoints?: {
    search?: string;   // លំនាំដើម៖ "/memories/search"
    create?: string;   // លំនាំដើម៖ "/memories"
    list?: string;     // លំនាំដើម៖ "/memories"
    get?: string;      // លំនាំដើម៖ "/memories/{id}"
    update?: string;   // លំនាំដើម៖ "/memories/{id}"
    delete?: string;   // លំនាំដើម៖ "/memories/{id}"
    health?: string;   // លំនាំដើម៖ "/health"
  };

  // ការផ្គូផ្គងឈ្មោះ query parameter
  queryParams?: {
    query?/apiKeyId?/limit?/offset?/strategy?/maxTokens?/type?/sessionId?/orderBy?/orderDir?/options?
  };

  // ការផ្គូផ្គងឈ្មោះ path parameter
  pathParams?: {
    id?/memoryId?
  };
}
```

**Backend ដែលស្គាល់រួច** ត្រូវបានកំណត់ជាមុននៅក្នុង `KNOWN_BACKENDS`៖

```typescript
createKnownBackend("obsidian"); // → GenericMemoryBackend ដែលចង្អុលទៅ localhost:27123
createKnownBackend("notion"); // → GenericMemoryBackend ដែលចង្អុលទៅ api.notion.com/v1
```

#### Backend ដែលមានស្រាប់

##### SQLiteBackend (`sqliteBackend.ts`)

ជា backend ចម្បងលំនាំដើម។ វារុំឃ្លាំងអង្គចងចាំដែលមានស្រាប់ និងផ្អែកលើ SQLite ដោយប្រើ `src/lib/memory/store.ts`។ វាត្រូវបានចុះឈ្មោះដោយស្វ័យប្រវត្តិនៅពេលចាប់ផ្ដើម។

```typescript
import { sqliteBackend } from "./sqliteBackend";
memoryManager.register(sqliteBackend);
```

##### ObsidianBackend (`obsidianBackend.ts`)

រុំការរួមបញ្ចូល Obsidian ដែលមានស្រាប់ (`src/lib/memory/obsidianBackend.ts`)។ ភ្ជាប់ទៅ Obsidian vault តាមរយៈ Obsidian Local REST API។

### ការកំណត់

ការកំណត់ memory backend ត្រូវបានរក្សាទុកក្នុងតារាងការកំណត់របស់កម្មវិធី និងគ្រប់គ្រងតាមរយៈ `src/lib/memory/settings.ts`៖

| ការកំណត់                     | កូនសោ Env/Config         | លំនាំដើម   | ការពិពណ៌នា                          |
| ---------------------------- | ------------------------ | ---------- | ----------------------------------- |
| Backend ចម្បង                | `memoryPrimaryBackend`   | `"sqlite"` | ID របស់ backend ចម្បង               |
| Backend បម្រុង               | `memoryFallbackBackends` | `[]`       | ID របស់ backend បម្រុងតាមលំដាប់     |
| ការកំណត់រចនាសម្ព័ន្ធ backend | `memoryBackendConfigs`   | `{}`       | ការកំណត់ជំនួសសម្រាប់ backend នីមួយៗ |

ការកំណត់ត្រូវបានធ្វើឱ្យមានទម្រង់ស្តង់ដារតាមរយៈ `normalizeMemorySettings()` និងរក្សាទុកក្នុង cache នៅ `getMemorySettings()`។

### លំហូរនៃការចាប់ផ្ដើម

```
ការចាប់ផ្ដើមកម្មវិធី
  → ការ import របស់ index.ts (ផលប៉ះពាល់បន្ទាប់បន្សំ)៖ ចុះឈ្មោះ SQLiteBackend
  → initMemoryBackends() ត្រូវបានហៅពី lifecycle របស់កម្មវិធី៖
      1. ផ្ទុកការកំណត់ (getMemorySettings)
      2. កំណត់រចនាសម្ព័ន្ធ backend ចម្បង + backend បម្រុង
      3. ចាប់ផ្ដើម backend ទាំងអស់ (ពិនិត្យស្ថានភាពដំណើរការ)
      4. រួចរាល់សម្រាប់សំណើ
```

### ការបន្ថែម Backend ថ្មី

1. **អនុវត្ត interface `MemoryBackend`** ក្នុង `src/lib/memory/<name>Backend.ts`
2. **Export** ពី `src/lib/memory/index.ts`
3. **ចុះឈ្មោះ** ដោយប្រើ `memoryManager.register(yourBackend)` នៅពេលចាប់ផ្ដើម
4. **កំណត់រចនាសម្ព័ន្ធ** តាមរយៈការកំណត់៖ កំណត់ `memoryPrimaryBackend` ទៅជា ID របស់ backend របស់អ្នក
5. **ធ្វើតេស្ត** ដោយយោងទៅលើ `src/lib/memory/__tests__/generic-backend.test.ts`

#### ឧទាហរណ៍៖ Brain Backend

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

### ការផ្ទៀងផ្ទាត់

#### Unit test

```bash
npx vitest run src/lib/memory/__tests__/generic-backend.test.ts --reporter=verbose
```

លទ្ធផលដែលរំពឹងទុក៖ **35 តេស្ត ដែលទាំងអស់ឆ្លងកាត់** គ្របដណ្ដប់លើ៖

- Constructor (2)
- ការពិនិត្យស្ថានភាពដំណើរការ (4) — ជោគជ័យ, បរាជ័យ 500, កំហុសបណ្ដាញ, latency
- ការចាប់ផ្ដើម (2) — ជោគជ័យ, បរាជ័យ
- ការបង្កើត (2) — endpoint លំនាំដើម, endpoint ផ្ទាល់ខ្លួន
- ការទទួលយក (4) — ជោគជ័យ, 404 → null, non-404 បោះ exception, path params ផ្ទាល់ខ្លួន
- ការធ្វើបច្ចុប្បន្នភាព (2) — ជោគជ័យ, 404 → false
- ការលុប (2) — ជោគជ័យ, 404 → false
- បញ្ជី (2) — query params, ឈ្មោះ parameter ផ្ទាល់ខ្លួន
- ការស្វែងរក (3) — query params, endpoint ផ្ទាល់ខ្លួន, options serialization
- Auth headers (2) — Bearer token, headers ផ្ទាល់ខ្លួន
- Factory (1)

#### ការពិនិត្យ type

```bash
npm run typecheck:core
```

លទ្ធផលដែលរំពឹងទុក៖ **0 កំហុស**។
