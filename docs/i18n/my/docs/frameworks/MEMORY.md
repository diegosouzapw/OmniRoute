# Memory System (မြန်မာ)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/MEMORY.md) · 🇪🇹 [am](../../../am/docs/frameworks/MEMORY.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/MEMORY.md) · 🇦🇿 [az](../../../az/docs/frameworks/MEMORY.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/MEMORY.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/MEMORY.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/MEMORY.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/MEMORY.md) · 🇩🇰 [da](../../../da/docs/frameworks/MEMORY.md) · 🇩🇪 [de](../../../de/docs/frameworks/MEMORY.md) · 🇬🇷 [el](../../../el/docs/frameworks/MEMORY.md) · 🇪🇸 [es](../../../es/docs/frameworks/MEMORY.md) · 🇪🇪 [et](../../../et/docs/frameworks/MEMORY.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/MEMORY.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/MEMORY.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/MEMORY.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/MEMORY.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/MEMORY.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/MEMORY.md) · 🇮🇱 [he](../../../he/docs/frameworks/MEMORY.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/MEMORY.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/MEMORY.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/MEMORY.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/MEMORY.md) · 🇮🇩 [id](../../../id/docs/frameworks/MEMORY.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/MEMORY.md) · 🇮🇹 [it](../../../it/docs/frameworks/MEMORY.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/MEMORY.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/MEMORY.md) · 🇰🇭 [km](../../../km/docs/frameworks/MEMORY.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/MEMORY.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/MEMORY.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/MEMORY.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/MEMORY.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/MEMORY.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/MEMORY.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/MEMORY.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/MEMORY.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/MEMORY.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/MEMORY.md) · 🇳🇴 [no](../../../no/docs/frameworks/MEMORY.md) · 🇮🇳 [or](../../../or/docs/frameworks/MEMORY.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/MEMORY.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/MEMORY.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/MEMORY.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/MEMORY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/MEMORY.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/MEMORY.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/MEMORY.md) · 🇱🇰 [si](../../../si/docs/frameworks/MEMORY.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/MEMORY.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/MEMORY.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/MEMORY.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/MEMORY.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/MEMORY.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/MEMORY.md) · 🇮🇳 [te](../../../te/docs/frameworks/MEMORY.md) · 🇹🇭 [th](../../../th/docs/frameworks/MEMORY.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/MEMORY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/MEMORY.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/MEMORY.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/MEMORY.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/MEMORY.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/MEMORY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/MEMORY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/MEMORY.md)

---

> **အမှန်တကယ် ကိုးကားရမည့် ရင်းမြစ်:** `src/lib/memory/` နှင့် `src/app/api/memory/`
> **နောက်ဆုံး အပ်ဒိတ်လုပ်ထားသည့်ရက်:** 2026-06-28 — v3.8.40 (ပုံသေဖြင့် ပိတ်ထားခြင်း + int8 quantization အမီလိုက်မွမ်းမံမှု)

OmniRoute သည် API key (နှင့် ရွေးချယ်နိုင်သော session id) ဖြင့် ခွဲခြားသတ်မှတ်ထားသည့် အမြဲတမ်းသိမ်းဆည်းထားသော စကားဝိုင်းမှတ်ဉာဏ်ကို ပံ့ပိုးပေးသည်။ ပေါ့ပါးသော regex ပုံစံတိုက်ဆိုင်စစ်ဆေးမှုမှတစ်ဆင့် LLM တုံ့ပြန်ချက်များမှ မှတ်ဉာဏ်များကို အလိုအလျောက် ထုတ်ယူပြီး နောက်ဆက်တွဲ request များတွင် ရှေ့ဆုံး system message အဖြစ် (သို့မဟုတ် system role ကို လက်မခံသော provider များအတွက် ပထမဆုံး user message အဖြစ်) ပြန်လည်ထည့်သွင်းပေးသည်။

> **မှတ်ဉာဏ်ကို ပုံသေအားဖြင့် ပိတ်ထားသည် (v3.8.30+)။** `DEFAULT_MEMORY_SETTINGS.enabled` သည်
> ယခု `false` ဖြစ်သည် (`src/lib/memory/settings.ts`)။ မှတ်ဉာဏ်ကို ဖွင့်ထားပါက
> ရယူထားသော context ကို `maxTokens` (~2k) အထိ **chat request တိုင်း** ထဲသို့
> ထည့်သွင်းပြီး ယင်းအတွက် ကျသင့်ငွေကောက်ခံသည် — အသစ်ထည့်သွင်းအသုံးပြုမှုများနှင့်
> ကိုယ်ပိုင် context ကို စီမံသော client များအတွက် မမျှော်လင့်ထားသည့် ကုန်ကျစရိတ် ဖြစ်နိုင်သည်။
> **Settings → Memory** အောက်တွင် အတိအလင်း ရွေးချယ်ဖွင့်ပါ (မှတ်ဉာဏ်ကို ဖွင့်ထားသည့်အခါ
> `MemorySkillsTab` သည် token ကုန်ကျစရိတ် သတိပေးချက်ကို ပြသသည်)။
> Client တစ်ခုသည် request header `x-omniroute-no-memory`
> (`true`/`1`/`yes`) ဖြင့် request တစ်ခုတည်းကို မသုံးရန် ရွေးချယ်နိုင်သည် —
> [API_REFERENCE.md](../reference/API_REFERENCE.md) ရှိ request-header ဇယားကို ကြည့်ပါ။
> မှတ်ဉာဏ်မသုံးသည့် request သည် `memoryOwnerId = null` ဟု သတ်မှတ်သောကြောင့်
> ထို request အတွက် မှတ်ဉာဏ်နှင့် skill ထည့်သွင်းခြင်း **နှစ်မျိုးစလုံး** ကို ပိတ်ထားသည်
> (`open-sse/handlers/chatCore/headers.ts::isNoMemoryRequested`)။

မှတ်ဉာဏ်ကို user တစ်ဦးချင်းအလိုက် မဟုတ်ဘဲ **API key တစ်ခုချင်းအလိုက် နယ်ပယ်သတ်မှတ်ထားသည်** — တူညီသော API key ဖြင့် အထောက်အထားစစ်ဆေးထားသည့် request အားလုံးသည် တူညီသော memory pool ကို မျှဝေပြီး `sessionId` ဖြင့် ထပ်မံနယ်ပယ်သတ်မှတ်ရန် ရွေးချယ်နိုင်သည်။

## တည်ဆောက်ပုံ

```
Client → /v1/chat/completions (apiKeyInfo ကို upstream တွင် ဖြေရှင်းထားသည်)
  → handleChatCore() [open-sse/handlers/chatCore.ts]
    → resolveMemoryOwnerId(apiKeyInfo)        # id ကို ထုတ်ယူသည်
    → getMemorySettings()                     # cache လုပ်ထားသော settings
    → shouldInjectMemory(body, {enabled})     # ဝင်ခွင့်ထိန်းချုပ်မှု
    → retrieveMemories(apiKeyId, config)      # SQL + FTS5 + ရွေးချယ်နိုင်သော vector
    → injectMemory(body, memories, provider)  # system သို့မဟုတ် user message
  → upstream provider ကို ခေါ်ဆိုမှု
  → တုံ့ပြန်ချက်တွင်: extractFacts(text, apiKeyId, sessionId)  # ပိတ်ဆို့စောင့်ဆိုင်းခြင်းမရှိ
    → setImmediate → ကိုက်ညီမှုတစ်ခုစီအတွက် createMemory(fact)
                   → embed(content) + upsertVector(id, vec)
```

ထည့်သွင်းခြင်းနှင့် ထုတ်ယူခြင်းဆိုင်ရာ ခေါ်ဆိုရာနေရာများကို
`open-sse/handlers/chatCore.ts` တွင် ချိတ်ဆက်ထားသည် (`retrieveMemories`၊ `injectMemory`
နှင့် `extractFacts` ကို ရှာပါ)။

## Engine တည်ဆောက်ပုံ (အဆင့် ၃ ဆင့် ဖြေရှင်းမှု)

Memory Engine သည် ရရှိနိုင်သော အခြေခံအဆောက်အအုံနှင့် settings များအပေါ် အခြေခံ၍ retrieval လမ်းကြောင်းကို runtime တွင် ဖြေရှင်းသတ်မှတ်သည်။ ဦးစားပေးအစီအစဉ်အလိုက် အသုံးချသည့် အဆင့်သုံးဆင့် ရှိသည်-

```
  ┌─────────────────────────────────────────────────────────────┐
  │  အဆင့် 0 — Keyword (FTS5)                                   │
  │  စမ်းသပ်စစ်ဆေးမှုအပေါ် မူတည်သည့် ရရှိနိုင်မှု- SQLite build  │
  │  က ပံ့ပိုးသည့်အခါ FTS5 ကို အသုံးပြုသည်                       │
  │  (better-sqlite3 / node:sqlite / bun:sqlite)၊ FTS5 မပါသည့်  │
  │  build များတွင် မရရှိနိုင်ပါ (ဥပမာ sql.js/WASM —            │
  │  "no such module: fts5")။ strategy = "exact" ဖြစ်သည့်အခါ    │
  │  သို့မဟုတ် fallback အဖြစ် အသုံးပြုသည်၊ engine-status ရှိ     │
  │  keyword သည် စမ်းသပ်စစ်ဆေးမှုရလဒ်ကို ထင်ဟပ်သည်။             │
  └──────────────────────────────────┬──────────────────────────┘
                                     │ strategy = semantic|hybrid?
                                     ▼
  ┌─────────────────────────────────────────────────────────────┐
  │  အဆင့် 1 — Embedded Vector (sqlite-vec)                      │
  │  sqlite-vec v0.1.9 ကို db.loadExtension() ဖြင့် တင်သည်။      │
  │  Float32 vector များပေါ်တွင် KNN brute-force လုပ်သည်။        │
  │  အောက်ပါအခြေအနေများတွင် အသက်ဝင်သည်-                         │
  │   • sqlite-vec loadExtension အောင်မြင်သည်                    │
  │   • Float32Array ထုတ်လုပ်နိုင်သည့် embedding source          │
  │     (remote | static | transformers) ရရှိနိုင်သည်            │
  │   • vec_memories table ရှိသည် (ပထမဆုံး ready() တွင် ဖန်တီးသည်)│
  └──────────────────────────────────┬──────────────────────────┘
                                     │ qdrant.enabled?
                                     ▼
  ┌─────────────────────────────────────────────────────────────┐
  │  အဆင့် 2 — Qdrant (ရွေးချယ်ဖွင့်ရသည့် ပြင်ပ vector database) │
  │  ဖွင့်ထားသည့်အခါ semantic/hybrid အတွက် sqlite-vec ကို        │
  │  အစားထိုးသည်။ လည်ပတ်နေသော Qdrant instance နှင့်             │
  │  စီစဉ်သတ်မှတ်ထားသော host/port လိုအပ်သည်။                    │
  └─────────────────────────────────────────────────────────────┘
```

အဆင့်လျှော့ပြောင်းမှုသည် အလိုအလျောက်ဖြစ်ပြီး အသုံးပြုသူမသိသာအောင် လုပ်ဆောင်သည်-

- sqlite-vec ကို တင်၍မရပါက အဆင့် 1 ကို မရရှိနိုင်တော့ဘဲ → အဆင့် 0 သို့ ပြန်လည်ကျဆင်းသည်။
- embedding source က error ပြန်ပေးပါက အဆင့် 1 သည် အဆင့် 0 သို့ ပြန်လည်ကျဆင်းသည်။
- Qdrant မကောင်းမွန်ပါက အဆင့် 2 သည် အဆင့် 1 သို့ ပြန်လည်ကျဆင်းသည် (သို့မဟုတ် အဆင့် 1
  ကိုလည်း မရရှိနိုင်ပါက အဆင့် 0 သို့ ပြန်လည်ကျဆင်းသည်)။

## Embedding ရင်းမြစ်များ

Embedding အလွှာ (`src/lib/memory/embedding/`) သည် `MemorySettingsExtended.embeddingSource` ကို အခြေခံ၍ အသုံးပြုမည့် ရင်းမြစ်ကို သတ်မှတ်ရွေးချယ်သည်-

| ရင်းမြစ်       | ဖော်ပြချက်                                                                                   | Key လိုအပ်မှု        | Cold start           |
| -------------- | -------------------------------------------------------------------------------------------- | -------------------- | -------------------- |
| `remote`       | ပြင်ဆင်သတ်မှတ်ထားသော provider ၏ embedding API (OpenAI၊ Cohere စသည်) ကို အသုံးပြုသည်          | လိုအပ်သည်            | မရှိ                 |
| `static`       | `potion-base-8M` မှတစ်ဆင့် local lookup-table embedding (WordPiece + mean pooling)           | မလိုအပ်ပါ            | ~200ms               |
| `transformers` | `@huggingface/transformers` v4၊ `all-MiniLM-L6-v2` မှတစ်ဆင့် local ONNX inference ပြုလုပ်သည် | မလိုအပ်ပါ            | ~3s + ~400MB RAM     |
| `auto`         | Runtime တွင် ရွေးချယ်ခြင်း- remote (key ရှိပါက) → static → transformers → null               | အခြေအနေပေါ် မူတည်သည် | အခြေအနေပေါ် မူတည်သည် |

**`auto` အတွက် ရွေးချယ်မှုအစဉ်-**

1. `listEmbeddingProviders()` ထဲမှ `hasKey === true` ဖြစ်သော ပထမဆုံး provider ကို ရှာပါ → `remote`။
2. `settings.staticEnabled === true` ဖြစ်ပါက → `static`။
3. `settings.transformersEnabled === true` ဖြစ်ပါက → `transformers`။
4. ထိုသို့မဟုတ်ပါက → `null` (FTS5 keyword search သို့ အဆင့်လျှော့သုံးစွဲသည်)။

Embedding cache (`src/lib/memory/embedding/cache.ts`) သည် `${source}:${model}:${dim}:${sha256(text)}` ဖြင့် key သတ်မှတ်ထားသော in-memory LRU map ကို အသုံးပြုသည်။ ၎င်းတွင် entry အရေအတွက်ကို `MEMORY_EMBEDDING_CACHE_MAX` (ပုံသေ 1000) ဖြင့် ကန့်သတ်ထားပြီး TTL ကို `MEMORY_EMBEDDING_CACHE_TTL_MS` (ပုံသေ 5 မိနစ်) ဖြင့် သတ်မှတ်ထားသည်။ Process lifecycle တစ်ခုအတွင်း caller အားလုံးက မျှဝေအသုံးပြုသည်။

## Hybrid RRF (k=60)

`strategy = "hybrid"` ဖြစ်ပြီး vector store ကို အသုံးပြုနိုင်သည့်အခါ retrieval သည် FTS5 နှင့် vector ရလဒ်များကို ပေါင်းစည်းရန် Reciprocal Rank Fusion ကို အသုံးပြုသည်-

```
RRF(d) = Σ  1 / (k + rank_i(d))      k = 60 ဖြစ်သည် (MEMORY_RRF_K မှတစ်ဆင့် ပြင်ဆင်သတ်မှတ်နိုင်သည်)
          i
```

အသေးစိတ်အားဖြင့်-

1. FTS5 search ကို လုပ်ဆောင်ပါ → အဆင့်သတ်မှတ်ထားသော စာရင်း `R_fts` (နေရာ 1..N)။
2. KNN vector search ကို လုပ်ဆောင်ပါ → အဆင့်သတ်မှတ်ထားသော စာရင်း `R_vec` (နေရာ 1..M)။
3. ထပ်တူမရှိသော `memoryId` တစ်ခုစီအတွက်-  
   `rrf_score = 1/(60 + fts_rank)` + `1/(60 + vec_rank)` (စာရင်းတွင် မရှိပါက 0)။
4. `rrf_score` ကို DESC အစဉ်ဖြင့် စီပြီး token budget walk ကို အသုံးချပါ။

RRF သည် မတူညီသော retrieval system များအကြား score normalization ပြုလုပ်ရန် မလိုအပ်ဘဲ ထိရောက်ကြောင်း လူသိများသည်။ ပုံသေ `k=60` သည် မူရင်း Cormack et al. စာတမ်းမှ ဖြစ်ပြီး corpus အသေးစားများအတွက် (<10k memories) ကောင်းစွာ အလုပ်လုပ်သည်။

## Backfill (lazy + reindex)

Embedding model ပြောင်းလဲသည့်အခါ (`embedding_signature` မှတစ်ဆင့် သိရှိသည်) vector store ကို ပြန်လည်တည်ဆောက်ပြီး ရှိပြီးသား memory အားလုံးကို `memories` table တွင် `needs_reindex = 1` ဟု သတ်မှတ်သည်။

**Lazy backfill**- နောက်တစ်ကြိမ် retrieval ပြုလုပ်ရာတွင် vector entry မရှိသည့် မည်သည့် memory ကိုမဆို search မလုပ်ဆောင်မီ embed လုပ်ပြီး `vec_memories` ထဲသို့ ထည့်သွင်းသည်။ ထိုသို့လုပ်ဆောင်ခြင်းဖြင့် startup ကို ပိတ်ဆို့ခြင်းမရှိဘဲ အမှန်တကယ် request များတစ်လျှောက် backfill ကုန်ကျစရိတ်ကို ခွဲဝေခံယူစေသည်။

**Explicit reindex**- `/dashboard/memory` ရှိ Engine tab တွင် `POST /api/memory/reindex` ကို ခေါ်ဆိုသည့် "ယခုပင် Reindex လုပ်ရန်" button ပါရှိသည်။ Handler သည် `src/lib/memory/reindex.ts` မှ `runReindexBatch()` ကို ခေါ်ဆိုပြီး request တစ်ခုလျှင် ဆိုင်းငံ့နေသော entry များကို `limit` အထိ လုပ်ဆောင်ပေးသည်။ တိုးတက်မှုအခြေအနေကို `GET /api/memory/engine-status` (`vectorStore.needsReindex`) မှတစ်ဆင့် အချိန်အပိုင်းအခြားအလိုက် စစ်ဆေးနိုင်သည်။

`memory_vec_meta` table (migration `083_memory_vec.sql`) တွင် အောက်ပါတို့ကို သိမ်းဆည်းထားသည်-

- `active_dim` — လက်ရှိ vector dimension (null = မချိန်ညှိရသေးပါ)။
- `embedding_signature` — ပြောင်းလဲမှုများကို သိရှိရန် အသုံးပြုသော `${source}:${model}:${dim}`။
- `last_reset_at` — နောက်ဆုံး အပြည့်အဝ reset လုပ်ခဲ့သည့် timestamp။
- `vec_loaded` — sqlite-vec အောင်မြင်စွာ load ဖြစ်၊ မဖြစ်ကို ဖော်ပြသည့် 0/1 flag။

## ဆက်တင် တိုးချဲ့မှု

Embedding နှင့် vector field ကိုးခုကို `src/shared/schemas/memory.ts` ရှိ
`MemorySettingsExtended` တွင် ရရှိနိုင်ပြီး `src/lib/db/settings.ts` မှတစ်ဆင့် အမြဲတမ်းသိမ်းဆည်းထားသည်-

| Field                    | Type                                               | Default  | Description                                                                               |
| ------------------------ | -------------------------------------------------- | -------- | ----------------------------------------------------------------------------------------- |
| `embeddingSource`        | `"remote" \| "static" \| "transformers" \| "auto"` | `"auto"` | အသုံးပြုမည့် embedding ရင်းမြစ်                                                           |
| `embeddingProviderModel` | `string \| null`                                   | `null`   | `provider/model` ဖော်မတ်ဖြင့် provider/model                                              |
| `customBaseUrl`          | `string \| null`                                   | `null`   | Memory အတွက်သာဖြစ်သော OpenAI-compatible endpoint အခြေခံ URL                               |
| `customModelId`          | `string \| null`                                   | `null`   | စိတ်ကြိုက် endpoint သို့ ပေးပို့မည့် model ID                                             |
| `transformersEnabled`    | `boolean`                                          | `false`  | Transformers.js အတွက် အသုံးပြုရန် ရွေးချယ်ခြင်း (MiniLM, ~400MB)                          |
| `staticEnabled`          | `boolean`                                          | `false`  | static potion-base-8M local model အတွက် အသုံးပြုရန် ရွေးချယ်ခြင်း                         |
| `rerankEnabled`          | `boolean`                                          | `false`  | ပြန်လည်အဆင့်သတ်မှတ်ခြင်း အဆင့်ကို ဖွင့်ရန် (တောင်းဆိုမှုတစ်ခုလျှင် +200-500ms ထပ်တိုးသည်) |
| `rerankProviderModel`    | `string \| null`                                   | `null`   | `provider/model` ဖော်မတ်ဖြင့် ပြန်လည်အဆင့်သတ်မှတ်မှု provider/model                       |

`rerankProviderModel` ကို `POST /v1/rerank` က ဖြေရှင်းပေးသည် (loopback မှတစ်ဆင့် ခေါ်ယူသည်)။ ထို့ကြောင့် ထို route က လက်ခံသည့် မည်သည့်အရာကိုမဆို လက်ခံသည်- ရွေးချယ်စုစည်းထားသော cloud rerank model (`cohere/rerank-v3.5`, `jina-ai/jina-reranker-v3.5`, …) သို့မဟုတ် `<node-prefix>/<model>` ပုံစံဖြင့် OpenAI-compatible provider node (ဥပမာ TEI/Infinity box အတွက် `skilled-mini/bge-reranker-v2-m3`) ဖြစ်သည်။ Loopback node များကို အမြဲတမ်း အသုံးပြုနိုင်သည်။ အခြား host (LAN, Tailscale) ပေါ်ရှိ node တစ်ခုသည် ထပ်မံ၍ `RERANK_REMOTE_PROVIDER_NODES` feature flag လိုအပ်ပြီး provider outbound URL policy ကိုလည်း အောင်မြင်ရမည် — [Feature Flags](../reference/FEATURE_FLAGS.md) ကို ကြည့်ပါ။ Dashboard selector သည် ရွေးချယ်စုစည်းထားသော provider များနှင့် local node များကို စာရင်းပြုစုဖော်ပြသည်။ မှန်ကန်သော `provider/model` string မည်သည့်ခုကိုမဆို `PUT /api/settings/memory` မှတစ်ဆင့် တိုက်ရိုက်သတ်မှတ်နိုင်သည်။
| `vectorStore` | `"sqlite-vec" \| "qdrant" \| "auto"` | `"auto"` | အသုံးပြုမည့် vector backend |

၎င်းတို့ကို `GET /PUT /api/settings/memory` (schema `MemorySettingsExtendedSchema`) မှတစ်ဆင့် အသုံးပြုနိုင်သည်။

`remote` ရင်းမြစ်အတွက် Memory သည် ရွေးချယ်နိုင်သော `customBaseUrl` နှင့်
`customModelId` ဆက်တင်များကိုလည်း လက်ခံသည်။ ၎င်းတို့ကို တွဲဖက်အသုံးပြုခြင်းဖြင့် global embedding registry ကို မပြောင်းလဲဘဲ OpenAI-compatible `/embeddings`
endpoint နှင့် model ကို ရွေးချယ်နိုင်သည်။ အသုံးမပြုမီ endpoint ကို
စံပုံစံဖြစ်အောင် ပြောင်းလဲပြီး provider outbound URL policy ဖြင့် စစ်ဆေးသည်- HTTP(S) ကို
မဖြစ်မနေလိုအပ်သည်၊ ထည့်သွင်းမြှုပ်နှံထားသော credential များနှင့် query string များကို ပယ်ချပြီး cloud-metadata
လိပ်စာများကို ဆက်လက်ပိတ်ပင်ထားသည်။ အလွတ်တန်ဖိုးများသည် ရွေးချယ်ထားသော registry provider ကို မပြောင်းလဲဘဲ ထိန်းသိမ်းပေးသည်။ Dashboard သို့
ပြန်ပေးသည့် error များကို အရေးကြီးအချက်အလက်များ ဖယ်ရှားသန့်စင်ထားပြီး endpoint credential များကို မည်သည့်အခါမျှ log မှတ်တမ်းမတင်ပါ။

> **TODO (D20):** Scope `global` (API key အားလုံးတွင် memory များ မျှဝေခြင်း) ကို ဤ release တွင်
> အကောင်အထည်မဖော်ရသေးပါ။ ၎င်းသည် schema ပြောင်းလဲမှုများနှင့် global retrieval
> လမ်းကြောင်းတစ်ခု လိုအပ်သည်။ သီးခြားခြေရာခံပါ။

## သိုလှောင်မှု အလွှာများ

### အဓိက- SQLite (`memories` table)

Migration `015_create_memories.sql` ဖြင့် ဖန်တီးထားသည်-

| Column                      | Type               | မှတ်ချက်များ                                                                                |
| --------------------------- | ------------------ | ------------------------------------------------------------------------------------------- |
| `id`                        | `TEXT PRIMARY KEY` | `crypto.randomUUID()` မှတစ်ဆင့် ထုတ်ပေးသော UUID                                             |
| `api_key_id`                | `TEXT NOT NULL`    | ပိုင်ဆိုင်သည့် API key                                                                      |
| `session_id`                | `TEXT`             | စကားဝိုင်းတစ်ခုချင်းအလိုက် ရွေးချယ်နိုင်သော scope                                           |
| `type`                      | `TEXT NOT NULL`    | `factual`, `episodic`, `procedural`, `semantic` တို့အနက် တစ်ခု                              |
| `key`                       | `TEXT`             | တည်ငြိမ်သော upsert key၊ ဥပမာ `preference:i_prefer_python`                                   |
| `content`                   | `TEXT NOT NULL`    | အမှန်တကယ် fact စာသား                                                                        |
| `metadata`                  | `TEXT`             | JSON blob (category, extractedAt, source, ...)                                              |
| `created_at` / `updated_at` | `TEXT`             | ISO 8601 string များ                                                                        |
| `expires_at`                | `TEXT`             | ရွေးချယ်နိုင်သော သက်တမ်းကုန်ဆုံးချိန်၊ `NULL` သည် အမြဲတမ်းဟု ဆိုလိုသည်                      |
| `memory_id`                 | `INTEGER UNIQUE`   | UUID များ ↔ FTS5 rowid များကို ချိတ်ဆက်ရန် `023_fix_memory_fts_uuid.sql` မှ ထည့်သွင်းထားသည် |

Index များ- `api_key_id`, `session_id`, `type`, `expires_at` နှင့် unique
`memory_id` index။

**Upsert လုပ်ဆောင်ပုံ**- `createMemory()` သည် တူညီသော
`(api_key_id, key)` ပါသည့် ရှိပြီးသား row ကို ရှာဖွေကာ တွေ့ရှိပါက ထိုနေရာတွင်ပင် အပ်ဒိတ်လုပ်သည် (`metadata` ကို
shallow spread ဖြင့် ပေါင်းစည်းသည်)။ ထို့ကြောင့် ထပ်ခါတလဲလဲ preference ဖော်ပြချက်များကြောင့် table
အကန့်အသတ်မရှိ ကြီးထွားလာခြင်းကို တားဆီးပေးသည်။

### Full-text ရှာဖွေမှု (`memory_fts` virtual table)

`022_add_memory_fts5.sql` သည် `content` နှင့်
`key` တို့အပေါ် FTS5 virtual table တစ်ခု ဖန်တီးသည်။ `023_fix_memory_fts_uuid.sql` သည် UUID
primary key ကို FTS5 ၏ integer rowid နှင့် join မလုပ်နိုင်ခဲ့သော လက်တွေ့ bug ကို ပြင်ဆင်သည် — migration က
`memory_id` column ကို ထည့်သွင်းကာ FTS table ကို ပြန်လည်ဖန်တီးပြီး INSERT, DELETE နှင့် UPDATE လုပ်သည့်အခါ
FTS ကို တစ်ပြေးညီဖြစ်နေစေရန် trigger များ
(`memory_fts_ai`, `memory_fts_ad`, `memory_fts_au`) ကို ချိတ်ဆက်ပေးသည်။

`semantic` နှင့် `hybrid` strategy များအတွက် `retrieval.ts` က အသုံးပြုသည် (အောက်တွင်ကြည့်ပါ)။
Retrieval code သည် `hasTable("memory_fts")` ဖြင့် စစ်ဆေးကာ FTS table မရှိလျှင် သို့မဟုတ် FTS query က error ပစ်လျှင်
အချိန်စဉ်အလိုက် အစီအစဉ်သို့ ပြန်လည်အသုံးပြုသည်။

### ရွေးချယ်နိုင်သော- Qdrant (vector store အဆင့် 2)

`src/lib/memory/qdrant.ts` သည် အဆင့် 2
vector store အဖြစ် ရွေးချယ်နိုင်သော Qdrant ပေါင်းစည်းမှုကို ဖော်ဆောင်ထားသည်။ Engine selector
`memoryVectorStore === "qdrant"` ဖြစ်သည့်အခါမှသာ retrieval ကို Qdrant သို့ လမ်းကြောင်းပေးသည် — မူလ `"auto"` (နှင့် `"sqlite-vec"`)
သည် Qdrant ကို **မည်သည့်အခါမျှ** မရွေးချယ်ပါ။ Engine tab ရှိ toggle သည် `qdrantEnabled` နှင့်
`memoryVectorStore` **နှစ်ခုလုံး** ကို အတူတကွ သတ်မှတ်သည်- ဖွင့်လိုက်ပါက Qdrant ကို အဓိက store အဖြစ် သတ်မှတ်ပြီး ပိတ်လိုက်ပါက
`"auto"` သို့ ပြန်လည်သတ်မှတ်သည် (#5597 — ထိုပြင်ဆင်မှုမတိုင်မီ မည်သည့်အရာကမျှ engine selector ကို
မရေးသားသောကြောင့် ဖွင့်ခြင်းသည် အကျိုးသက်ရောက်မှုမရှိခဲ့ပါ)။ Qdrant သို့ ဆက်သွယ်၍မရပါက သို့မဟုတ် မည်သည့်ရလဒ်မျှ မပြန်ပါက retrieval သည်
sqlite-vec → FTS5 သို့ အဆင့်ဆင့် ပြန်လည်အသုံးပြုသည်။

- `upsertSemanticMemoryPoint()` — ပြင်ဆင်သတ်မှတ်ထားသော embedding model ဖြင့် `key + content` ကို embed လုပ်သည်၊ collection ရှိကြောင်း သေချာစေသည် (ပထမဆုံးအသုံးပြုချိန်တွင် cosine-distance vector များကို ဖန်တီးသည်)၊ ထို့နောက် payload `{memoryId,
apiKeyId, sessionId, key, content, metadata, createdAtUnix, expiresAtUnix}` ပါသော point တစ်ခုကို upsert လုပ်သည်။
- `searchSemanticMemory(query, topK, scope)` — query ကို embed လုပ်ပြီး
  `kind = "omniroute_memory"` ဖြင့် filter လုပ်ထားသော collection ကို ရှာဖွေကာ
  `apiKeyId` / `sessionId` ဖြင့်လည်း လိုအပ်သလို filter လုပ်နိုင်သည်။ `topK` ကို `[1, 20]` အတွင်း ကန့်သတ်ထားသည်။
- `deleteSemanticMemoryPoint(id)` — point တစ်ခုချင်း ဖျက်ခြင်း။ SQLite row ကို ဖယ်ရှားပြီးနောက်
  `deleteMemory()` က ခေါ်ယူသည် (D15)။
- `cleanupSemanticMemoryPoints({retentionDays})` — `expiresAtUnix` သည် လက်ရှိအချိန်ထက် ကျော်လွန်ပြီးသားဖြစ်သော သို့မဟုတ် `createdAtUnix` သည် retention cutoff ထက် ပိုဟောင်းသော point များကို အစုလိုက်ဖျက်သည်။ Dashboard တွင် အမှန်တကယ် အရေအတွက်များကို ပြသနိုင်ရန် ဦးစွာ ရေတွက်သည်။
- `checkQdrantHealth()` — latency ပါဝင်သော `GET /readyz` health probe။

Settings UI သည် `/dashboard/memory` ၏ **Engine tab** တွင် Qdrant configuration၊ health check၊ semantic search စမ်းသပ်မှုနှင့် cleanup တို့ကို အသုံးပြုနိုင်စေသည်။ `src/app/api/settings/qdrant/` အောက်ရှိ သက်ဆိုင်ရာ route များအားလုံးကို v3.8.6 မှစ၍ ချိတ်ဆက်ပြီးဖြစ်သည်-

| Route                                   | Method        | ဖော်ပြချက်                                          |
| --------------------------------------- | ------------- | --------------------------------------------------- |
| `/api/settings/qdrant`                  | `GET` / `PUT` | Qdrant settings ကို ဖတ်ရန် / ပြင်ဆင်ရန်             |
| `/api/settings/qdrant/health`           | `GET`         | Liveness probe + latency                            |
| `/api/settings/qdrant/search`           | `POST`        | Semantic search စမ်းသပ်မှု                          |
| `/api/settings/qdrant/cleanup`          | `POST`        | သက်တမ်းကုန် / ဟောင်းနေသော point များကို ဖယ်ရှားရန်  |
| `/api/settings/qdrant/embedding-models` | `GET`         | ရရှိနိုင်သော embedding model များကို စာရင်းပြုစုရန် |

**အပြုအမူဆိုင်ရာ မှတ်ချက်များ (မျှော်လင့်ထားရမည့်အရာများ)-**

- **Engine ရွေးချယ်ခြင်း** — Engine tab တွင် Qdrant ကို ဖွင့်ထားပါက ၎င်းသည် အဓိက
  store ဖြစ်လာသည် (`memoryVectorStore="qdrant"` ဟု သတ်မှတ်သည်)။ ပိတ်လိုက်ပါက `"auto"` သို့ ပြန်သတ်မှတ်သည် (#5597)။
- **နောက်ကြောင်းပြန်ဖြည့်ခြင်း မရှိပါ** — Qdrant ကို ဖွင့်ပြီး **နောက်ပိုင်း** ဖန်တီး/ပြင်ဆင်သော memory များကိုသာ
  ၎င်းထဲသို့ ရေးသားသည် (fire-and-forget dual-write)။ ယခင်ရှိပြီးသား SQLite memory များကို **မရွှေ့ပြောင်းပါ**။
  "Reindex Now" သည် sqlite-vec index ကိုသာ ပြန်လည်တည်ဆောက်ပြီး Qdrant ကို မတည်ဆောက်ပါ။
- **Vector dimension ကို ပထမဆုံးအသုံးပြုချိန်ရှိ အမှန်တကယ် embedding မှ အလိုအလျောက်ရှာဖွေသတ်မှတ်သည်** —
  ဖြည့်သွင်းရမည့် dimension field မရှိပါ။ Collection တစ်ခုရှိပြီးနောက် embedding model ကို ပြောင်းလဲခြင်းအား
  **အလိုအလျောက် မကိုင်တွယ်ပါ**။ ရှိပြီးသား collection ကို မပြောင်းလဲဘဲထားပြီး dimension မကိုက်ညီသော
  write/search များ မအောင်မြင်ပါက sqlite-vec သို့ fallback လုပ်သည်။ Embedder ပြောင်းရန် collection ကို
  ပြန်လည်ဖန်တီးပါ (အမည်အသစ်သုံးပါ သို့မဟုတ် Qdrant ထဲတွင် ဖျက်ပါ)။
- **Distance metric** — အမြဲတမ်း **Cosine** ဖြစ်သည် (collection ဖန်တီးချိန်တွင် hardcode လုပ်ထားပြီး
  ပြင်ဆင်သတ်မှတ်၍ မရပါ)။
- **Auth** — API key သာ အသုံးပြုသည် (`api-key` header အဖြစ် ပေးပို့သည်၊ authentication မလိုသော
  local Docker အတွက် မဖြစ်မနေ မဟုတ်ပါ)။ JWT/RBAC ကို မသုံးပါ။
- **Config field များ** — UI တွင် `host`, `port`, `collection`, `embeddingModel`,
  `apiKey` တို့ကို အသုံးပြုနိုင်သည်။ `vectorSize` / `hnswEfConstruct` တို့သည် env/DB မှတစ်ဆင့်သာ အသုံးပြုနိုင်ပြီး
  collection ဖန်တီးရာတွင် `vectorSize` ကို မသုံးပါ (dimension သည် embedding မှ ရရှိသည်)။

### Vector quantization (int8 — ရွေးချယ်ဖွင့်နိုင်ပြီး backend နှစ်ခုလုံးအတွက်)

Vector backend နှစ်ခုလုံးသည် သိမ်းဆည်းထားသော vector များ၏ memory အသုံးပြုမှုပမာဏကို
လျှော့ချရန် (Float32 ထက် ~4× သေးငယ်) **ရွေးချယ်ဖွင့်နိုင်သော int8 quantization** ကို
ပံ့ပိုးသည်။ ထိုသို့ လျှော့ချခြင်းကြောင့် recall အနည်းငယ် ကျဆင်းနိုင်သည်။
Backend နှစ်ခုလုံးတွင် မူလသတ်မှတ်ချက်အရ **ပိတ်ထားသည်** — အတိအလင်း ဖွင့်မထားပါက
vector များကို full-precision အဖြစ် ဆက်လက်ထားရှိသည်။

| Backend    | Setting                         | Type                           | မူလတန်ဖိုး | ဖတ်ယူသည့်နေရာ                                               |
| ---------- | ------------------------------- | ------------------------------ | ---------- | ----------------------------------------------------------- |
| Qdrant     | `qdrantQuantization` (DB key)   | `"none" \| "int8" \| "binary"` | `"none"`   | `src/lib/memory/qdrant.ts::normalizeQdrantConfig()`         |
| sqlite-vec | `MEMORY_VEC_QUANTIZATION` (env) | `"none" \| "int8"`             | `"none"`   | `src/lib/memory/vectorStore.ts::requestedVecQuantization()` |

- **Qdrant** ကို `qdrantQuantization` setting key မှတစ်ဆင့် instance တစ်ခုချင်းအလိုက်
  ပြင်ဆင်သတ်မှတ်သည် (`PUT /api/settings/qdrant` ရှိ `quantization` field အဖြစ် ဖော်ပြထားသည်)။
  `"int8"` ဖြစ်ပါက `buildQuantizationConfig()` သည် scalar quantization
  (`always_ram`, quantile `0.99`) ကို တောင်းဆိုပြီး search များတွင် `rescore: true` ကို ဖွင့်ပေးသဖြင့်
  full-precision vector များက int8 candidate set ကို ပိုမိုတိကျအောင် ပြန်လည်စိစစ်ပေးသည်။
- **sqlite-vec** quantization သည် **environment မှတစ်ဆင့်သာ** ပြင်ဆင်နိုင်သည် (DB setting မဟုတ်ပါ)။
  Local vector များကို `vec_quantize_int8(?, 'unit')` မှတစ်ဆင့် `int8[dim]`
  column အဖြစ် သိမ်းဆည်းရန် `MEMORY_VEC_QUANTIZATION=int8` ဟု သတ်မှတ်ပါ။ ရွေးချယ်ထားသော mode ကို
  `embedding_signature` ထဲသို့ (`:int8` suffix အဖြစ်) ထည့်သွင်းထားသောကြောင့် mode ပြောင်းလိုက်ပါက
  `vec_memories` table တစ်ခုလုံးကို reindex လုပ်စေသည် — ၎င်းသည် embedding model ပြောင်းချိန်တွင်
  အသုံးပြုသည့် lazy-backfill လမ်းကြောင်းနှင့် အတူတူဖြစ်သည်။

## မှတ်ဉာဏ် အမျိုးအစားများ

`MemoryType` (`src/lib/memory/types.ts`):

| အမျိုးအစား   | အသုံးပြုသည့်နေရာ                                                                                      |
| ------------ | ----------------------------------------------------------------------------------------------------- |
| `factual`    | နှစ်သက်မှုများ၊ တည်ငြိမ်သော အသုံးပြုသူအချက်အလက်များ၊ အပြုအမူပုံစံများ                                 |
| `episodic`   | သီးခြားအချိန်တစ်ခုနှင့် ဆက်စပ်နေသော ဆုံးဖြတ်ချက်များ ("I chose Postgres")                             |
| `procedural` | လုပ်ငန်းစဉ် / လုပ်ဆောင်ပုံမှတ်ဉာဏ် (သီးသန့်လျာထားသည်၊ လက်ရှိတွင် အလိုအလျောက်ထုတ်ယူသည့်စနစ် မရှိသေးပါ) |
| `semantic`   | vector-store ထည့်သွင်းချက်များအတွက် သီးသန့်လျာထားသည်                                                  |

`MemoryConfig` ၏ ရယူရေးမဟာဗျူဟာသည် `exact`၊ `semantic` သို့မဟုတ် `hybrid`
တို့အနက် တစ်ခုဖြစ်ပြီး၊ scope သည် `session`၊ `apiKey` သို့မဟုတ် `global`
တို့အနက် တစ်ခုဖြစ်သည်။ `getMemorySettings()` မှ မူလသတ်မှတ်ထားသော scope သည်
`apiKey` ဖြစ်သည်။

## အချက်အလက် ထုတ်ယူခြင်း (`extraction.ts`)

ထုတ်ယူမှုသည် LLM အခြေခံမဟုတ်ဘဲ **regex အခြေခံ** ဖြစ်သည် — ၎င်းသည်
တုံ့ပြန်မှု stream ကို မည်သည့်အခါမျှ ပိတ်ဆို့မထားစေရန် `setImmediate()` ဖြင့်
လုပ်ငန်းစဉ်အတွင်း အလုပ်လုပ်သည်-

- **နှစ်သက်မှုပုံစံများ** → `MemoryType.FACTUAL`
  (ဥပမာ `I prefer …`၊ `I really like …`၊ `my favorite is …`၊ `I hate …`)
- **ဆုံးဖြတ်ချက်ပုံစံများ** → `MemoryType.EPISODIC`
  (ဥပမာ `I'll use …`၊ `I chose …`၊ `I went with …`၊ `I'm going to adopt …`)
- **အလေ့အထပုံစံများ** → `MemoryType.FACTUAL`
  (ဥပမာ `I usually …`၊ `I always …`၊ `I tend to …`)

ကိုက်ညီမှုတစ်ခုစီကို သန့်စင်သည် (`trim`၊ whitespace များကို စုစည်းခြင်း၊
အများဆုံး စာလုံး 500 အထိ ကန့်သတ်ခြင်း)၊ တည်ငြိမ်သော
`factKey(category, content)` ဖြင့် batch အတွင်း ထပ်နေမှုများကို ဖယ်ရှားပြီး
metadata `{category, extractedAt, source: "llm_response"}` နှင့်အတူ
`createMemory()` မှတစ်ဆင့် သိမ်းဆည်းသည်။ ထည့်သွင်းစာသားကို 64 KiB
(`MAX_EXTRACTION_TEXT_LENGTH`) အထိ ကန့်သတ်ထားသည် — ထိုပမာဏထက် ကျော်လွန်ပါက
နောက်ဆုံး assistant အကြောင်းအရာ အမြဲပါဝင်စေရန် စာသား၏ **နောက်ပိုင်းအပိုင်း** ကို
အသုံးပြုသည်။

`extractFactsFromText(text)` ကို စမ်းသပ်မှုများအတွက် export လုပ်ထားပြီး
သိမ်းဆည်းခြင်းမပြုဘဲ ဖွဲ့စည်းပုံကျသော အချက်အလက်များကို ပြန်ပေးသည်။

## ပြန်လည်ရယူခြင်း (`retrieval.ts`)

`retrieveMemories(apiKeyId, config)` သည် အဓိက ဝင်ပေါက်ဖြစ်သည်။ ၎င်းသည်-

1. `MemoryConfigSchema` မှတစ်ဆင့် config ကို ပုံမှန်ပုံစံဖြစ်အောင် ပြုလုပ်ပြီး အတည်ပြုသည်။
2. `enabled` သည် false ဖြစ်သောအခါ သို့မဟုတ် `maxTokens <= 0` ဖြစ်သောအခါ `[]` ကို ချက်ချင်းပြန်ပေးသည်။
3. `maxTokens` ကို `[1, 8000]` အတွင်း ကန့်သတ်သည်။
4. ဒေတာဘေ့စ်အဟောင်းများ ဆက်လက်အလုပ်လုပ်နိုင်ရန် ခေတ်မီ `memories` table ရှိမရှိကို legacy `memory`
   table နှင့် နှိုင်းယှဉ်စစ်ဆေးသည်။
5. သက်တမ်းကုန်ဆုံးမှု ကာကွယ်ချက်
   (`expires_at IS NULL OR datetime(expires_at) > datetime('now')`)၊ ရွေးချယ်နိုင်သော
   session scope နှင့် ရွေးချယ်နိုင်သော `retentionDays` ဖြတ်တောက်ကန့်သတ်ချက်တို့ဖြင့်
   အခြေခံ query ကို တည်ဆောက်သည်။
6. မဟာဗျူဟာအလိုက် ခွဲ၍လုပ်ဆောင်သည်-
   - **`exact`** (မူလသတ်မှတ်ချက်)- အချိန်စဉ်အလိုက် `ORDER BY created_at DESC LIMIT 100`။
   - **`semantic`**- `config.query` နှင့် `memory_fts` ရှိပါက
     `memory_fts MATCH ?` ဖြင့် JOIN လုပ်ပြီး FTS rank အလိုက် စီသည်။ FTS က row 0 ခု
     ပြန်ပေးသောအခါ အချိန်စဉ်အလိုက် ရယူမှုသို့ ပြန်လည်ပြောင်းသုံးသည်။
   - **`hybrid`**- FTS ရလဒ်များ (ပိုမြင့်သော ဆက်စပ်မှုရှိသည်) နှင့်
     အချိန်စဉ်အလိုက် ရလဒ်အစုတို့ကို ပေါင်းစည်းပြီး id အလိုက် ထပ်နေမှုများကို ဖယ်ရှားသည်။
7. query တစ်ခု ပေးထားပါက `content`၊ `key` နှင့် `metadata` JSON တို့အပေါ်
   သော့ချက်စာလုံးဆိုင်ရာ ဆက်စပ်မှုရမှတ် (`getRelevanceScore`) ကို တွက်ချက်သည်။
   ရမှတ် သုညရှိသော row များကို စစ်ထုတ်ဖယ်ရှားသည်။
8. ရမှတ်ကို ကြီးစဉ်ငယ်လိုက် စီပြီး၊ ထို့နောက် `createdAt` ကို ကြီးစဉ်ငယ်လိုက် စီသည်။
9. အဆင့်သတ်မှတ်ထားသော စာရင်းကို အစဉ်လိုက် စစ်ဆေးပြီး စုစုပေါင်း
   `estimateTokens(content)` (ခန့်မှန်းခြေ `length / 4`) သည် သတ်မှတ်ထားသော
   ပမာဏအောက်တွင် ရှိနေသရွေ့ ထည့်သွင်းချက်များကို လက်ခံသည်။ ကိုက်ညီမှုတစ်ခုခုရှိပါက
   အနည်းဆုံး ထည့်သွင်းချက်တစ်ခုကို အမြဲပြန်ပေးသည်။

`estimateTokens` ကို export လုပ်ထားပြီး ပြန်လည်ရယူခြင်း၊ အကျဉ်းချုပ်ခြင်းနှင့် MCP
`omniroute_memory_search` tool တို့က အသုံးပြုသည်။

## ထည့်သွင်းခြင်း (`injection.ts`)

`injectMemory(request, memories, provider)`:

1. memory အကြောင်းအရာအားလုံးကို `Memory context: …` string တစ်ခုတည်းအဖြစ် ပေါင်းစည်းသည်။
2. provider အမည်အလိုက် နည်းဗျူဟာတစ်ခုကို ရွေးချယ်သည်-
   - **System message** (OpenAI, Anthropic, Gemini၊ … တို့အတွက် ပုံသေ) — ရှိပြီးသား system message များအားလုံး၏ရှေ့တွင် `{role: "system", content: memoryText}` ကို ထည့်သွင်းပေးသဖြင့် အသုံးပြုသူ၏ system prompt များက ဦးစားပေးမှု ဆက်လက်ရရှိသည်။
   - **User message** (အရန်နည်းလမ်း) — `PROVIDERS_WITHOUT_SYSTEM_MESSAGE` ထဲရှိ provider များဖြစ်သော `o1`, `o1-mini`, `o1-preview`, `glm`, `glmt`, `glm-cn`, `zai`, `qianfan` အတွက်ဖြစ်သည်။ ၎င်းတို့သည် system role ကို လက်မခံသဖြင့် ဤနည်းလမ်းမသုံးပါက 400 error ဖြစ်မည် (GLM/Zhipu အတွက် issue #1701 ကိုကြည့်ပါ)။
3. အရေအတွက်၊ နည်းဗျူဟာနှင့် model ကို `memory.injection.injected` အောက်တွင် log မှတ်တမ်းတင်သည်။

ကိုယ်ပိုင် routing ဆုံးဖြတ်ချက်များ ပြုလုပ်ရန်လိုအပ်သော caller များအတွက် `providerSupportsSystemMessage(provider)` ကို export လုပ်ထားသည်။ မသိရှိသော provider များကို လုံခြုံရေးအတွက် ပုံသေအားဖြင့် `true` (system role ကို ခွင့်ပြုသည်) ဟု သတ်မှတ်သည်။

## ဆက်တင်များ (`settings.ts`)

Memory configuration ကို env var များထဲတွင်မဟုတ်ဘဲ **DB settings table ထဲတွင် သိမ်းဆည်းထားသည်**။ `getMemorySettings()` သည် `getSettings()` မှ ဖတ်ယူပြီး ရလဒ်ကို လုပ်ဆောင်နေသည့် process အတွင်း cache ပြုလုပ်ထားသည်။ ရေးသားပြင်ဆင်ပြီးနောက် settings PUT route က `invalidateMemorySettingsCache()` ကို ခေါ်သည်။

### အဟောင်း field များ (version အားလုံး)

| DB key                | အမျိုးအစား | ပုံသေ                                                      | UI ထိန်းချုပ်မှု                                                                  |
| --------------------- | ---------- | ---------------------------------------------------------- | --------------------------------------------------------------------------------- |
| `memoryEnabled`       | boolean    | `false` (v3.8.30 မှစ၍ ပုံသေအားဖြင့် ပိတ်ထားသည်)            | Memory ဖွင့်/ပိတ်                                                                 |
| `memoryMaxTokens`     | integer    | `2000` (`0–16000` အပိုင်းအခြား)                            | ထည့်သွင်းမှုအတွက် token ဘတ်ဂျက်                                                   |
| `memoryRetentionDays` | integer    | `30` (`1–365` အပိုင်းအခြား)                                | ထိန်းသိမ်းထားမည့် အချိန်ကာလ                                                       |
| `memoryStrategy`      | enum       | `"hybrid"` (`recent`, `semantic`, `hybrid` တို့ထဲမှ တစ်ခု) | ပြန်လည်ရယူရေး နည်းဗျူဟာ                                                           |
| `skillsEnabled`       | boolean    | `false`                                                    | key တစ်ခုချင်းစီအလိုက် skill ထည့်သွင်းမှုကို ဖွင့်/ပိတ်သည် (SKILLS.md ကိုကြည့်ပါ) |

မှတ်ချက်- UI နည်းဗျူဟာ `"recent"` ကို `toMemoryRetrievalConfig()` မှတစ်ဆင့် အတွင်းပိုင်း `"exact"` ပြန်လည်ရယူရေး နည်းဗျူဟာနှင့် ချိတ်ဆက်သတ်မှတ်သည် (အချိန်စဉ်အလိုက် အစီအစဉ်)။

### Field အသစ်များ (v3.8.6, plan 21 D9)

Field ဖော်ပြချက်များအတွက် အထက်ပါ "Settings extension" အပိုင်းကိုလည်း ကြည့်ပါ။

| DB key                      | API field                | ပုံသေ    |
| --------------------------- | ------------------------ | -------- |
| `memoryEmbeddingSource`     | `embeddingSource`        | `"auto"` |
| `memoryEmbeddingModel`      | `embeddingProviderModel` | `null`   |
| `memoryTransformersEnabled` | `transformersEnabled`    | `false`  |
| `memoryStaticEnabled`       | `staticEnabled`          | `false`  |
| `memoryRerankEnabled`       | `rerankEnabled`          | `false`  |
| `memoryRerankModel`         | `rerankProviderModel`    | `null`   |
| `memoryVectorStore`         | `vectorStore`            | `"auto"` |

Qdrant နှင့်သက်ဆိုင်သော DB key များ (`qdrantEnabled`, `qdrantHost`, `qdrantPort`, `qdrantApiKey`, ပုံသေ `"omniroute_memory"` ဖြစ်သည့် `qdrantCollection`၊ ပုံသေ `"openai/text-embedding-3-small"` ဖြစ်သည့် `qdrantEmbeddingModel`) ကို `qdrant.ts` ရှိ `normalizeQdrantConfig()` က ဖတ်ယူသည်။

### Environment variable များ (v3.8.6)

ရွေးချယ်သတ်မှတ်နိုင်သော env var ခြောက်ခုသည် engine ၏ runtime လုပ်ဆောင်ပုံကို ချိန်ညှိပေးသည် (`.env.example` တွင် မှတ်တမ်းပြုစုထားသည်)-

| Variable                        | ပုံသေ                      | ဖော်ပြချက်                                                                                                                                                                         |
| ------------------------------- | -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `MEMORY_EMBEDDING_CACHE_TTL_MS` | `300000`                   | Embedding cache TTL (5 မိနစ်)                                                                                                                                                      |
| `MEMORY_EMBEDDING_CACHE_MAX`    | `1000`                     | Embedding LRU cache အတွင်း အများဆုံး entry အရေအတွက်                                                                                                                                |
| `MEMORY_TRANSFORMERS_MODEL`     | `Xenova/all-MiniLM-L6-v2`  | Transformers.js model အတွက် HF repo                                                                                                                                                |
| `MEMORY_STATIC_MODEL`           | `minishlab/potion-base-8M` | static potion model အတွက် HF repo                                                                                                                                                  |
| `MEMORY_STATIC_CACHE_DIR`       | `<DATA_DIR>/embeddings`    | Download လုပ်ထားသော model များ သိမ်းဆည်းမည့်နေရာ                                                                                                                                   |
| `MEMORY_VEC_TOP_K`              | `20`                       | vector search အတွက် ပုံသေ top-K                                                                                                                                                    |
| `MEMORY_RRF_K`                  | `60`                       | hybrid search အတွက် RRF k ကိန်းသေ                                                                                                                                                  |
| `MEMORY_VEC_QUANTIZATION`       | `none`                     | local sqlite-vec vector များကို quantize လုပ်၍ သိမ်းဆည်းရန် `int8` ဟု သတ်မှတ်ပါ (~4× ပိုသေးသည်၊ ရွေးချယ်အသုံးပြုရသည်)။ Mode ပြောင်းလဲခြင်းသည် reindex ကို မဖြစ်မနေ လုပ်ဆောင်စေသည်။ |

## အကျဉ်းချုပ်ခြင်း (`summarization.ts`)

`summarizeMemories(apiKeyId, sessionId?, maxTokens = 4000)` သည် key တစ်ခု၏ memories များအတွက် လက်ရှိ token စုစုပေါင်းက သတ်မှတ် budget ကို ကျော်လွန်သောအခါ အဟောင်း content များကို ချုံ့ပေးသည်။ ၎င်းသည် row များကို `created_at` အလိုက် DESC ဖြင့် တစ်ကြောင်းချင်းစီ ဖြတ်သန်းပြီး အံဝင်ခွင်ကျဖြစ်သော row များကို ဆက်လက်ထိန်းသိမ်းကာ ကျန်ရှိသော row များ၏ `content` ကို မူရင်းစာသားမှ ပထမဆုံး စာကြောင်းသုံးကြောင်းဖြင့် မူလနေရာတွင် အစားထိုးသည်။ `tokensSaved` သည် content အဟောင်းနှင့် အသစ်ကြားရှိ `estimateTokens` ကွာခြားချက်ဖြစ်သည်။

လက်ရှိ chat pipeline တွင် ဤ routine ကို **အသုံးပြုနိုင်သော်လည်း အလိုအလျောက် ခေါ်ယူခြင်းမရှိပါ** — ဆက်တိုက်ချုံ့သိမ်းရန် လိုအပ်ပါက cron တစ်ခု၊ admin action တစ်ခု သို့မဟုတ် `MemoryConfig.autoSummarize` ချိတ်ဆက်မှုမှ ခေါ်ယူပါ။ Data ဆုံးရှုံးမှုသည် တစ်လမ်းသွားဖြစ်သည်။ မူရင်းစာသားကို ထပ်ရေးသွားမည်ဖြစ်သည်။

## REST API

Endpoint အားလုံးတွင် management auth (`requireManagementAuth`) လိုအပ်သည်။

### အဓိက memory endpoint များ (ရှိပြီးသား + မွမ်းမံထားသော)

| Method   | Path                 | Description                                                                                                                                                                                                             |
| -------- | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `GET`    | `/api/memory`        | Filter များဖြစ်သော `apiKeyId`, `type`, `sessionId`, `q`, `limit`, `page`, `offset` ပါဝင်သည့် pagination လုပ်ထားသော စာရင်း။ Response တွင် `stats.total`, `stats.tokensUsed`, `stats.hitRate`, `cacheStats` ပါဝင်သည်      |
| `POST`   | `/api/memory`        | Entry ဖန်တီးသည် (Zod ဖြင့် validate လုပ်ထားသော `content`, `key`, ရွေးချယ်နိုင်သည့် `type`, `sessionId`, `apiKeyId`, `metadata`, `expiresAt`)။ `(apiKeyId, key)` ပေါ်တွင် upsert လုပ်သည့် `createMemory()` ကို ခေါ်ယူသည် |
| `GET`    | `/api/memory/[id]`   | UUID ဖြင့် entry တစ်ခုတည်းကို ရယူသည်                                                                                                                                                                                    |
| `PUT`    | `/api/memory/[id]`   | Entry field များ (`type`, `key`, `content`, `metadata`) ကို မွမ်းမံသည်။ Body: `MemoryUpdatePutSchema`။ Embedding source ရရှိနိုင်ပါက vector ကိုလည်း sync လုပ်သည်။                                                       |
| `DELETE` | `/api/memory/[id]`   | Entry တစ်ခုကို ဖျက်သည်။ `vec_memories` (D15) နှင့် Qdrant မှလည်း အတတ်နိုင်ဆုံး ဖျက်သည်။ မရှိပါက 404 ကို ပြန်ပေးသည်။                                                                                                     |
| `GET`    | `/api/memory/health` | `verifyExtractionPipeline("health-check")` ကို လုပ်ဆောင်သည် — create→list→delete အပြည့်အစုံ စမ်းသပ်ခြင်း။ `{working, latencyMs, error?}` ကို ပြန်ပေးသည်                                                                 |

### Memory engine endpoint အသစ်များ (အစီအစဉ် 21)

| Method | Path                              | Description                                                                                                                                                                                                    |
| ------ | --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `POST` | `/api/memory/retrieve-preview`    | `retrieveMemories` ကို dry-run လုပ်သည် — score, tier, tokens တို့နှင့်အတူ အဆင့်စီထားသော result များကို ပြန်ပေးသည်။ Body: `RetrievePreviewSchema`။ Memory များကို inject သို့မဟုတ် ပြင်ဆင်ခြင်း **မပြုလုပ်ပါ**။ |
| `GET`  | `/api/memory/embedding-providers` | Embedding model များပါရှိသော provider များကို စာရင်းပြုစုပြီး မည်သည့် provider တွင် API key ကို configure လုပ်ထားကြောင်း ဖော်ပြသည်။                                                                            |
| `GET`  | `/api/memory/engine-status`       | Keyword tier, embedding resolution, vector store stats, Qdrant health နှင့် rerank config အပါအဝင် engine status အပြည့်အစုံကို ပြန်ပေးသည်။ ပုံစံ: `MemoryEngineStatusSchema`။                                   |
| `POST` | `/api/memory/summarize`           | Memory ချုံ့သိမ်းမှုကို ကိုယ်တိုင် စတင်လုပ်ဆောင်သည်။ Body: `MemorySummarizeSchema` (`olderThanDays`, `apiKeyId?`, `dryRun`)။ `{candidates, tokensSaved}` ကို ပြန်ပေးသည်။                                       |
| `POST` | `/api/memory/reindex`             | `needs_reindex=1` ဖြစ်သော memory များအတွက် vector reindex ကို စတင်သည်။ Body: `MemoryReindexSchema` (`force`)။ `{started, pending}` ကို ပြန်ပေးသည်။                                                             |

### Settings endpoint များ

| Method | Path                                    | Description                                                                                                               |
| ------ | --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `GET`  | `/api/settings/memory`                  | လက်ရှိ ပုံမှန်ပြုလုပ်ထားသော `MemorySettingsExtended` (field အသစ် 7 ခု + legacy)                                           |
| `PUT`  | `/api/settings/memory`                  | `MemorySettingsExtendedSchema` မှ မည်သည့် field ကိုမဆို မွမ်းမံသည် (field စုစုပေါင်း 12 ခု)                               |
| `GET`  | `/api/settings/qdrant`                  | လက်ရှိ Qdrant setting များ (`QdrantSettingsSchema`)                                                                       |
| `PUT`  | `/api/settings/qdrant`                  | Qdrant setting များကို မွမ်းမံသည်။ Body: `QdrantSettingsUpdateSchema`။ `apiKey` = string အလွတ်ဖြစ်ပါက key ကို ဖယ်ရှားသည်။ |
| `GET`  | `/api/settings/qdrant/health`           | Configure လုပ်ထားသော Qdrant instance ကို liveness probe လုပ်သည်။ `QdrantHealthResultSchema` ကို ပြန်ပေးသည်။               |
| `POST` | `/api/settings/qdrant/search`           | Qdrant ကို အသုံးပြု၍ semantic search ကို စမ်းသပ်သည်။ Body: `QdrantSearchSchema` (`query`, `topK`)။                        |
| `POST` | `/api/settings/qdrant/cleanup`          | သက်တမ်းကုန်ဆုံးသွားသော / အဟောင်း memory များအတွက် Qdrant point များကို ဖယ်ရှားသည်။                                        |
| `GET`  | `/api/settings/qdrant/embedding-models` | Qdrant အတွက် အသုံးပြုနိုင်သော embedding model များကို စာရင်းပြုစုသည်။                                                     |

`/api/memory` စာရင်း query သည် `page` အခြေပြု pagination (`parsePaginationParams`) **သို့မဟုတ်** raw `offset` ကို ပံ့ပိုးသည် — `offset` ပါရှိပါက ၎င်းကို ဦးစားပေးပြီး response ပုံစံအတွက် တွက်ချက်ရရှိသည့် `page` တစ်ခုကို ထုတ်ပေးသည်။

## MCP ကိရိယာများ (`open-sse/mcp-server/tools/memoryTools.ts`)

MCP ဆာဗာကို ဖွင့်ထားသည့်အခါ memory ကိရိယာသုံးခုကို မှတ်ပုံတင်ပေးသည်-

- `omniroute_memory_search` — `{apiKeyId, query?, type?, maxTokens?, limit?}`
  → `retrieveMemories()` ကို wrapper လုပ်ထားသည်။ v3.8.6 (D16) မှစ၍ `strategy` ကို
  `"exact"` အဖြစ် hardcode လုပ်ထားမည့်အစား `getMemorySettings()` မှ
  ဖတ်ယူသည်။ `query` ကို ပေးထားပြီး `strategy` သည် `semantic` သို့မဟုတ်
  `hybrid` ဖြစ်ပါက vector store ရရှိနိုင်သည့်အချိန်တွင် ၎င်းကို အသုံးပြုသည်။
- `omniroute_memory_add` — `{apiKeyId, sessionId?, type, key, content,
metadata?}` → `createMemory()` ကို wrapper လုပ်ထားသည်။ သတ်မှတ်ထားသည့် canonical type
  ၄ မျိုးဖြစ်သော `factual`, `episodic`, `procedural`, `semantic` တို့ကိုသာ
  လက်ခံသည် (D17)။
- `omniroute_memory_clear` — `{apiKeyId, type?, olderThan?}` → ကိုက်ညီသော
  entry များကို စာရင်းပြုစုပြီး၊ လိုအပ်ပါက သတ်မှတ် timestamp မတိုင်မီ ဖန်တီးထားမှုအလိုက်
  စစ်ထုတ်ကာ entry တစ်ခုစီကို `deleteMemory()` မှတစ်ဆင့် ဖျက်သည်
  (၎င်းသည် sqlite-vec + Qdrant မှ vector များကိုလည်း ဖယ်ရှားပေးသည်)။

ပို့ဆောင်မှုနှင့် scope အသေးစိတ်အချက်အလက်များအတွက် [MCP-SERVER.md](./MCP-SERVER.md) ကို ကြည့်ပါ။

## Dashboard (Memory Studio)

`src/app/(dashboard)/dashboard/memory/page.tsx` သည် ယခုအခါ **tab ၃ ခုပါ Studio** ဖြစ်သည်-

### Tab: Memories

- Concept card (`"How it works"` ရှင်းလင်းချက်ကို ချုံ့/ဖြန့်နိုင်သည်)။
- အချိန်နှင့်တစ်ပြေးညီ စာရင်း၊ ရှာဖွေမှုနှင့် စာမျက်နှာခွဲခြင်း (300 ms debounce)။
- Type filter (`factual` / `episodic` / `procedural` / `semantic` / အားလုံး)။
- Memory ထည့်ရန် modal (key၊ content၊ type)။
- Inline တည်းဖြတ်ခြင်း (ခဲတံခလုတ် → `PUT /api/memory/[id]`)။
- Row တစ်ခုချင်းစီအလိုက် ဖျက်ခြင်း (အတည်ပြု dialog ဖြင့်)။
- လက်ရှိစာမျက်နှာကို JSON အဖြစ် export လုပ်ခြင်း၊ file picker မှတစ်ဆင့် JSON import လုပ်ခြင်း။
- စာရင်းအင်း card များ- `totalEntries`, `tokensUsed`, `hitRate`။
- `"Compact old"` ခလုတ် → `POST /api/memory/summarize` (ပထမဆုံး dry-run တွင်
  candidate အရေအတွက်ကို ပြသပြီးနောက် အတည်ပြုစေသည်)။
- `GET /api/memory/health` ဖြင့် အခြေအနေသတ်မှတ်ထားသော အစိမ်း/အနီ health dot။

### Tab: Playground

- Query input + strategy ရွေးချယ်မှု (Exact / Semantic / Hybrid) + token budget။
- `"Simulate"` → `POST /api/memory/retrieve-preview` — အဆင့်စီထားသော ရလဒ်များကို
  `score`, `tier`, `tokens`, `vecScore`, `ftsScore` တို့နှင့်အတူ ပြသသည်။
- မည်သည့် embedding source / vector store ကို အသုံးပြုခဲ့ကြောင်းနှင့်
  fallback ဖြစ်ပွားခဲ့ခြင်းရှိ/မရှိကို ပြသသော resolution panel။

### Tab: Engine

- Engine အခြေအနေ panel (keyword FTS5 chip၊ embedding chip၊ vector store chip၊
  Qdrant health chip၊ rerank chip)။
- `"Reindex Now"` ခလုတ် → `POST /api/memory/reindex`။
- Embedding source ရွေးချယ်မှု (auto / remote / static / transformers + toggle များ)။
- Qdrant config card (ဖွင့်/ပိတ် toggle၊ host/port/collection/key၊ connection စမ်းသပ်မှု၊
  semantic search စမ်းသပ်မှု၊ cleanup)။
- Rerank config card (ဖွင့်/ပိတ် toggle၊ provider/model ရွေးချယ်မှု)။

Legacy/global settings interface အတွက် Memory နှင့် Qdrant ဆက်တင်များကို
`/dashboard/settings → Memory & Skills` (`MemorySkillsTab.tsx`) အောက်တွင်လည်း
တွေ့နိုင်သည်။

## Caching

`src/lib/memory/store.ts` သည် `getMemory(id)` ဖတ်ရှုမှုများအတွက် process အတွင်းရှိ
LRU ပုံစံ cache (`MEMORY_CACHE_TTL = 1 min`, `MEMORY_MAX_CACHE_SIZE = 500`၊
သက်တမ်းအဟောင်းဆုံး 20 % ကို ဖယ်ရှားခြင်းဖြင့်) ကို ထိန်းသိမ်းထားသည်။ ထို့အပြင်
ကိုယ်ပိုင် scoped cache လိုအပ်သော caller များ အသုံးပြုနိုင်ရန် `get`/`set`/`invalidate`
method များပါဝင်သည့် ယေဘုယျ key/value `memoryCache` layer
(`src/lib/memory/cache.ts`) ကိုလည်း ထားရှိသည် (entry 1 000 ပါ LRU၊ မူလ TTL 5 min)။

## ကိုယ်ရေးကိုယ်တာနှင့် သက်တမ်းစက်ဝန်း

- Memory ပိုင်ဆိုင်မှုကို API key id (`chatCore.ts` ထဲရှိ
  `resolveMemoryOwnerId`) ဖြင့် သတ်မှတ်သည်။ `apiKeyInfo.id` မရှိပါက retrieval၊ injection
  သို့မဟုတ် extraction တစ်ခုမျှ လုပ်ဆောင်မည်မဟုတ်ပါ။
- အနာဂတ်အချိန်ဖြစ်သော `expires_at` ပါဝင်သည့် entry များကို retrieval မှ စစ်ထုတ်ဖယ်ရှားထားသည်။ `retentionDays` ထက် ကျော်လွန်သည့်
  entry အဟောင်းများကို `retrieveMemories` ရှိ
  `created_at >= cutoff` clause ဖြင့် ဖယ်ထုတ်ထားသည်။
- အပြီးတိုင်ဖျက်ရန် `DELETE /api/memory/[id]` သို့မဟုတ် `omniroute_memory_clear` ကို အသုံးပြုပါ။
- Extraction ကို `setImmediate` မှတစ်ဆင့် fire-and-forget ပုံစံဖြင့် လုပ်ဆောင်သည်။ ပျက်ကွက်မှုများကို
  `memory.extraction.background.failed` အောက်တွင် မှတ်တမ်းတင်ပြီး ခေါ်ယူသူထံ မည်သည့်အခါမျှ ဖော်ပြမည်မဟုတ်ပါ။
- Verification round-trip များ (`verifyExtractionPipeline`) သည် `finally` block တစ်ခုထဲတွင်
  ၎င်းတို့၏ ကိုယ်ပိုင် စမ်းသပ် entry များကို ရှင်းလင်းသည်။

## ထပ်မံကြည့်ရှုရန်

- [SKILLS.md](./SKILLS.md) — `skillsEnabled` setting သည် memory နှင့်အတူ tool
  definition များကို ထည့်သွင်းပေးသည်။
- [MCP-SERVER.md](./MCP-SERVER.md) — MCP transport / scope များ။
- [API_REFERENCE.md](../reference/API_REFERENCE.md) — ပိုမိုကျယ်ပြန့်သော API မျက်နှာပြင်။
- Source module များ:
  - `src/lib/memory/types.ts`, `schemas.ts`
  - `src/lib/memory/store.ts`, `retrieval.ts`, `injection.ts`, `reindex.ts`
  - `src/lib/memory/extraction.ts`, `summarization.ts`, `verify.ts`
  - `src/lib/memory/settings.ts`, `qdrant.ts`, `cache.ts`
  - `src/lib/memory/vectorStore.ts` — sqlite-vec + hybrid RRF
  - `src/lib/memory/embedding/index.ts` — source မျိုးစုံသုံး embedding layer
  - `src/lib/memory/embedding/types.ts`, `remote.ts`, `staticPotion.ts`,
    `transformersLocal.ts`, `cache.ts`
  - `src/shared/schemas/memory.ts` — memory API body အားလုံးအတွက် Zod schema များ
  - `src/shared/schemas/qdrant.ts` — Qdrant setting/operation များအတွက် Zod schema များ
  - `src/lib/db/memoryVec.ts` — `memory_vec_meta` အတွက် CRUD
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
  - `src/app/api/settings/qdrant/route.ts` + sub-route များ
  - `src/app/(dashboard)/dashboard/memory/` — Studio UI (စာမျက်နှာ + component များ +
    tab များ + hook များ)
  - `open-sse/handlers/chatCore.ts` (injection / extraction ချိတ်ဆက်မှု)
  - `open-sse/mcp-server/tools/memoryTools.ts`

---

## Embedding Provider ရွေးချယ်ခြင်း (v3.8.16+)

OmniRoute ၏ memory engine သည် **embedding source လေးမျိုး** (`src/lib/memory/embedding/`) ကို ပံ့ပိုးပေးသည်။ တစ်ခုချင်းစီတွင် **ကြာချိန်၊ ကုန်ကျစရိတ်၊ model အရည်အသွေးနှင့် စနစ်ထည့်သွင်းမှု ရှုပ်ထွေးခြင်း** တို့အကြား အားသာချက်၊ အားနည်းချက် မတူညီကြပါသည်။

### Embedding Source များ

| Provider       | Source                                                          | ကြာချိန်                            | ကုန်ကျစရိတ်              | အရည်အသွေး                           | စနစ်ထည့်သွင်းမှု                                  |
| -------------- | --------------------------------------------------------------- | ----------------------------------- | ------------------------ | ----------------------------------- | ------------------------------------------------- |
| `transformers` | Local ONNX model (Xenova/all-MiniLM-L6-v2)                      | ~50-150ms (CPU)                     | အခမဲ့                    | ကောင်းမွန်                          | `npm install` သာ လိုအပ်သည်                        |
| `static`       | ကြိုတင်တွက်ချက်ထားသော vector များ (cache လုပ်ထားသည်)            | <1ms                                | အခမဲ့                    | မသက်ဆိုင် (cache hit ပေါ် မူတည်သည်) | မလိုအပ်                                           |
| `remote`       | OpenAI / Cohere / Voyage API                                    | ~100-300ms                          | $0.02-0.10/1M token များ | အထူးကောင်းမွန်                      | API key                                           |
| `auto`         | Runtime တွင် ရရှိနိုင်သော အကောင်းဆုံး source ကို ရွေးချယ်သည်    | ရွေးချယ်ထားသော source နှင့် တူညီသည် | အခမဲ့                    | ရွေးချယ်ထားသော source နှင့် တူညီသည် | မလိုအပ်                                           |
| _(cache)_      | မည်သည့် source မဆို အပေါ်တွင် ထပ်ဆင့်ထားသော in-memory LRU layer | <1ms (hit), ကြာချိန်အပြည့် (miss)   | အခမဲ့                    | အောက်ခံ source နှင့် တူညီသည်        | အမြဲဖွင့်ထားသည် (ရွေးချယ်နိုင်သော source မဟုတ်ပါ) |

### ဆုံးဖြတ်ချက် Tree

```
                  သင်၏ deployment context က ဘာလဲ။
                  │
      ┌───────────┼───────────┬──────────────┐
      │           │           │              │
  DEV/စမ်းသပ်မှု    အသေးစား PROD   အကြီးစား PROD    EDGE / OFFLINE
      │           │           │              │
      ▼           ▼           ▼              ▼
  transformers transformers remote (Qdrant) transformers
  (အခမဲ့၊ API မလို)           (အကောင်းဆုံးအရည်အသွေး) (အင်တာနက်မလို)
      │           │           │              │
      └────────┬──┴───────────┴──────────────┘
               │
               ▼
            အပေါ်ဆုံးတွင် `cache` layer ကို အမြဲထည့်ပါ
            (LruCache က မည်သည့် provider ကိုမဆို wrap လုပ်ပေးသည်)
```

### Database နှင့် API Configuration

Memory embedding option များကို environment variable များဖြင့် မဟုတ်ဘဲ Settings API/UI မှတစ်ဆင့် configure လုပ်သည်။ Settings အောက်ရှိ သက်ဆိုင်ရာ settings database key များ (`src/lib/memory/settings.ts` ထဲရှိ `normalizeMemorySettings`) မှာ-

- `memoryEmbeddingSource`: `"transformers"` (local)၊ `"remote"` (API အခြေပြု၊ ဥပမာ OpenAI)၊ `"static"` (ပြင်ပ store) သို့မဟုတ် `"auto"`
- `memoryEmbeddingProviderModel`: remote/static source များအတွက် Model identifier (ဥပမာ၊ `"text-embedding-3-small"`)
- `memoryTransformersEnabled`: `true` | `false`
- `memoryStaticEnabled`: `true` | `false`
- `memoryVectorStore`: `"sqlite-vec"`၊ `"qdrant"` သို့မဟုတ် `"auto"`

#### Local Model (`transformers`)

Local model များကို run ရန် transformers.js ကို အတွင်းပိုင်း၌ အသုံးပြုသည်-

```bash
# Code ထဲတွင် ဖတ်ယူသော env var များ (src/lib/memory/embedding/index.ts):
MEMORY_TRANSFORMERS_MODEL=Xenova/all-MiniLM-L6-v2  # HF model repository
MEMORY_STATIC_MODEL=minishlab/potion-base-8M       # HF static potion model
MEMORY_STATIC_CACHE_DIR=<DATA_DIR>/embeddings      # Cache directory
```

#### LRU Embedding Cache

Cache ကို ပုံမှန်အားဖြင့် အမြဲဖွင့်ထားပြီး env var များမှတစ်ဆင့် configure လုပ်သည်-

```bash
MEMORY_EMBEDDING_CACHE_MAX=1000                    # Cache ထားနိုင်သည့် item အများဆုံးအရေအတွက်
MEMORY_EMBEDDING_CACHE_TTL_MS=300000               # TTL (၅ မိနစ်)
```

### စွမ်းဆောင်ရည် ကိန်းဂဏန်းများ

ပုံမှန် 4-core x86 ဆာဗာပေါ်ရှိ စွမ်းဆောင်ရည်စမ်းသပ်ချက် (စာသားတစ်ခုလျှင် ~100 tokens):

| ဝန်ဆောင်မှုပေးသူ     | p50   | p95   | p99   | embeddings 1M အတွက် ကုန်ကျစရိတ်    |
| -------------------- | ----- | ----- | ----- | ---------------------------------- |
| `transformers` (CPU) | 80ms  | 180ms | 350ms | အခမဲ့                              |
| `remote` (OpenAI)    | 120ms | 220ms | 400ms | ~$0.02 (ada-002) / $0.13 (3-large) |
| `static` (Qdrant)    | 15ms  | 30ms  | 60ms  | Qdrant hosting ပေါ် မူတည်သည်       |
| `cache` (တွေ့ရှိမှု) | <1ms  | <1ms  | 2ms   | အခမဲ့                              |

---

## အချက်အလက် ထုတ်ယူမှုပုံစံများ (v3.8.16+)

`extraction.ts` မော်ဂျူး (`src/lib/memory/extraction.ts`) သည် စကားဝိုင်းမက်ဆေ့ချ်များမှ ဖွဲ့စည်းပုံကျသော အချက်အလက်များကို ထုတ်ယူရန် **regex ပုံစံကိုက်ညီမှုစစ်ဆေးခြင်း** ကို အသုံးပြုသည်။ ဤပုံစံများကို နားလည်ခြင်းဖြင့် သင့်အသုံးပြုမှုအခြေအနေအတွက် ထုတ်ယူမှုအရည်အသွေးကို ချိန်ညှိနိုင်သည်။

### ပုံသေ ပုံစံအမျိုးအစားများ

| အမျိုးအစား          | နမူနာပုံစံ                                                  | ဖမ်းယူသည့်အရာများ                             |
| ------------------- | ----------------------------------------------------------- | --------------------------------------------- |
| PREFERENCE_PATTERNS | `"I prefer <X>"`, `"I like <X>"`, `"I hate <X>"`            | အသုံးပြုသူ၏ နှစ်သက်မှုများ                    |
| DECISION_PATTERNS   | `"I'll use <X>"`, `"I decided to <X>"`, `"I went with <X>"` | အသုံးပြုသူ၏ ဆုံးဖြတ်ချက်များ (ဖြစ်စဉ်အခြေပြု) |
| PATTERN_PATTERNS    | `"I usually <X>"`, `"I always <X>"`, `"I never <X>"`        | ဆက်လက်တည်ရှိသော အပြုအမူပုံစံများ              |

### နမူနာပုံစံများ (ရိုးရှင်းအောင် ပြုလုပ်ထားသည်)

```ts
// src/lib/memory/extraction.ts မှ
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

### ထုတ်ယူသည့်အရာများ

အသုံးပြုသူက အောက်ပါအတိုင်း ပြောသောအခါ-

> "I prefer TypeScript. I'll use Postgres for this project. I always commit before pushing. I don't like Python."
> ထုတ်ယူမှုမှ မှတ်ဉာဏ် ၄ ခုကို ဖန်တီးပေးသည်-
>
> | ကီး                                  | အမျိုးအစား | အမျိုးအစားခွဲ | အကြောင်းအရာ                 |
> | ------------------------------------ | ---------- | ------------- | --------------------------- |
> | `preference:typescript`              | preference | factual       | "TypeScript"                |
> | `decision:postgres_for_this_project` | decision   | episodic      | "Postgres for this project" |
> | `pattern:commit_before_pushing`      | pattern    | factual       | "commit before pushing"     |
> | `preference:python`                  | preference | factual       | "Python"                    |

### ထုတ်ယူမှု ကန့်သတ်ချက်များ

အလွန်အကျွံ ထုတ်ယူမှုမဖြစ်စေရန် အောက်ပါကန့်သတ်ချက်များကို သတ်မှတ်ထားသည်-

| အနည်းဆုံး အကြောင်းအရာအရှည် | စာလုံး 3 လုံး |
| အများဆုံး အကြောင်းအရာအရှည် | စာလုံး 500 လုံး |

### ထုတ်ယူမှုကို ပိတ်သင့်သည့်အချိန်

မှတ်ဉာဏ်ကို ဖွင့်ထားသည့်အခါတိုင်း ထုတ်ယူမှုသည် အလိုအလျောက် လုပ်ဆောင်သည်။ ထုတ်ယူမှုအတွက်သာ သီးခြားခလုတ်မရှိပါ။
၎င်းကို ပိတ်ရန် `PUT /api/settings/memory` မှတစ်ဆင့် မှတ်ဉာဏ်တစ်ခုလုံးကို ပိတ်ပါ (`enabled: false`)။
အောက်ပါအခြေအနေများတွင် ပိတ်ရန် စဉ်းစားပါ-

- မက်ဆေ့ချ်ပမာဏ များပြားပြီး ထုတ်ယူမှုကုန်ကျစရိတ်ကို လျစ်လျူရှု၍မရသောအခါ
- သင့်စကားဝိုင်းများသည် ရေရှည်တန်ဖိုးမရှိဘဲ ယာယီသဘောသက်သက် (စကားပြောခြင်း၊ အမှားရှာခြင်း) ဖြစ်နေသောအခါ
- စိတ်ကြိုက်ပလပ်ဂင်များမှတစ်ဆင့် အကြောင်းအရာအခြေအနေကို ဖမ်းယူထားပြီးဖြစ်သောအခါ

---

## ပေါင်းစပ် RRF ချိန်ညှိခြင်း (v3.8.16+)

**Reciprocal Rank Fusion (RRF)** အယ်လ်ဂိုရီသမ်သည် FTS5 (သော့ချက်စာလုံး) နှင့် vector (အဓိပ္ပာယ်ဆိုင်ရာ) ရလဒ်များကို ပေါင်းစပ်သည်။ `k` ပါရာမီတာသည် အဆင့်နိမ့်ရလဒ်များကို အလေးချိန်မည်မျှပေးမည်ကို ထိန်းချုပ်သည်။

### ဖော်မြူလာ

ဖြစ်နိုင်ခြေရှိသော မှတ်ဉာဏ်တစ်ခုစီအတွက် RRF ရမှတ်မှာ-

```
RRF(d) = Σ  1 / (k + rank_i(d))
```

ဤနေရာတွင်-

- `k` သည် ကိန်းသေဖြစ်သည် (ပုံသေ 60)
- `rank_i(d)` သည် i ခုမြောက် ပြန်လည်ရယူမှုစနစ် (FTS၊ vector) အတွင်းရှိ စာရွက်စာတမ်း `d` ၏ အဆင့်ဖြစ်သည်
- ပေါင်းလဒ်သည် ပြန်လည်ရယူမှုစနစ်အားလုံးအပေါ် အကျုံးဝင်သည်

### `k` က ရလဒ်များအပေါ် သက်ရောက်ပုံ

| `k` တန်ဖိုး        | အကျိုးသက်ရောက်မှု                                                                       | အသင့်တော်ဆုံးအခြေအနေ                             |
| ------------------ | --------------------------------------------------------------------------------------- | ------------------------------------------------ |
| `k=0`              | စစ်စစ်အဆင့် ပေါင်းစပ်မှု (ချောမွေ့စေခြင်းမရှိ)                                          | သီအိုရီဆိုင်ရာ အခြေခံနှိုင်းယှဉ်ချက်             |
| `k=10-30`          | ထိပ်ပိုင်းရလဒ်များကို အလေးချိန်များစွာပေးပြီး အဆင့်နိမ့်ရလဒ်များ၏ ပါဝင်မှု အလွန်နည်းသည် | ထိပ်ဆုံးရလဒ် ၃ ခုက ပုံမှန်အားဖြင့် မှန်ကန်သောအခါ |
| **`k=60`** (ပုံသေ) | မျှတသည် — ထိပ်ဆုံးရလဒ် ၁၀ ခုလုံး အဓိပ္ပာယ်ရှိစွာ ပါဝင်သည်                               | ယေဘုယျရည်ရွယ်ချက်သုံး ပြန်လည်ရယူမှု              |
| `k=100+`           | ပိုမိုပြန့်ပြူးသည် — အဆင့်နိမ့်ရလဒ်များပင် စနစ်များစွာတွင် ပါဝင်ပါက လွှမ်းမိုးနိုင်သည်  | recall > precision သည် အရေးကြီးသောအခါ            |

### လက်တွေ့တွင် `k` ကို ချိန်ညှိခြင်း

```bash
# ပုံသေ
MEMORY_RRF_K=60

# တိကျမှုကို ပြင်းပြင်းထန်ထန် ဦးစားပေးခြင်း (မှတ်ဉာဏ်သေးငယ်၊ စာရွက်စာတမ်းနည်းပါး)
MEMORY_RRF_K=20

# အများဆုံး ပြန်လည်ရှာဖွေတွေ့ရှိမှု (မှတ်ဉာဏ်ကြီးမား၊ မေးမြန်းချက်မျိုးစုံ)
MEMORY_RRF_K=120
```

**`k=20` ဖြင့် နမူနာ-**

- FTS အဆင့် 1 → ပါဝင်မှု `1/21 = 0.048`
- FTS အဆင့် 10 → ပါဝင်မှု `1/30 = 0.033`
- Vector အဆင့် 1 → ပါဝင်မှု `0.048`
- ပေါင်းစပ်အများဆုံး- `0.096`

**`k=60` ဖြင့် နမူနာ-**

- FTS အဆင့် 1 → ပါဝင်မှု `1/61 = 0.016`
- FTS အဆင့် 10 → ပါဝင်မှု `1/70 = 0.014`
- Vector အဆင့် 1 → ပါဝင်မှု `0.016`
- ပေါင်းစပ်အများဆုံး- `0.033`

`k` ပိုမြင့်လာသောအခါ ထိပ်ဆုံးအဆင့် 1 နှင့် အဆင့် 10 ကြားရှိ **နှိုင်းရကွာခြားချက်** သည် ပိုသေးလာသောကြောင့် အယ်လ်ဂိုရီသမ်သည် ထိပ်ဆုံးအဆင့်၏ ယုံကြည်စိတ်ချရမှုထက် **ပြန်လည်ရယူမှုစနစ်များအကြား သဘောတူညီမှု** ကို ပိုမိုအားထားသည်။

### `k` ကို ပြောင်းသင့်သည့်အချိန်

| လက္ခဏာ                                                    | စမ်းကြည့်ရန်                                                                            |
| --------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| ထိပ်ဆုံးရလဒ်က အမြဲအနိုင်ရသော်လည်း မှားနေသည်               | k ကို **လျှော့ပါ** (ဥပမာ၊ 20) — ထိပ်ဆုံးအဆင့်၏ ယုံကြည်စိတ်ချရမှုက ပိုအရေးကြီးလာသည်      |
| အဖြေမှန်က ထိပ်ဆုံး ၅ ခုတွင်ရှိသော်လည်း နံပါတ် ၁ မဟုတ်ပါ   | k ကို **မြှင့်ပါ** (ဥပမာ၊ 100) — ပိုမိုပြန့်ပြူးသော ရမှတ်ပေးမှုက သဘောတူညီမှုကို ဆုချသည် |
| Recall မြင့်သော်လည်း precision နိမ့်သည်                   | k ကို **လျှော့ပါ** — အဆင့်သတ်မှတ်မှုကို ပိုပြတ်သားစေပါ                                  |
| Recall နိမ့်သည် (သက်ဆိုင်ရာ စာရွက်စာတမ်းများ ပျောက်နေသည်) | k ကို **မြှင့်ပါ** — အဆင့်နိမ့်စာရွက်စာတမ်းများကို အခွင့်အရေးပေးပါ                      |

### RRF အလေးချိန်ပေးခြင်း

Reciprocal rank fusion သည် အဓိပ္ပာယ်ဆိုင်ရာ vector အဆင့်နှင့် စာသားအပြည့်အစုံရှာဖွေမှုအဆင့်အတွက် တူညီသော အလေးချိန်များကို အသုံးပြုသည်-

```
RRF(d) = 1/(k + rank_vector) + 1/(k + rank_fts)
```

တစ်ခုချင်းစီ၏ အလေးချိန်များကို ချိန်ညှိရန် environment variable များ မရှိပါ (`MEMORY_RRF_VECTOR_WEIGHT`/`MEMORY_RRF_FTS_WEIGHT` တို့ မရှိပါ)။

---

## အကျဉ်းချုပ်ခြင်း မဟာဗျူဟာ (v3.8.16+)

`summarization.ts` module (`src/lib/memory/summarization.ts`) သည် ပြန်လည်မှတ်မိနိုင်စွမ်းကို ထိန်းသိမ်းထားစဉ် လက်ရှိအသုံးပြုနေသော မှတ်ဉာဏ်အစုကို သေးငယ်စေရန် မှတ်ဉာဏ်အဟောင်းများကို ချုံ့ပေးသည်။

### အကျဉ်းချုပ်ခြင်း စတင်သည့်အချိန်

| စတင်စေသည့်အရာ                     | သတ်မှတ်ချက် (မူလတန်ဖိုး) |
| --------------------------------- | ------------------------ |
| API မှတစ်ဆင့် ကိုယ်တိုင်စတင်ခြင်း | မသက်ဆိုင်                |

### အကျဉ်းချုပ်ခံရမည့်အရာများ

`summarization.ts` မှ entry point နှစ်ခုကို export လုပ်ထားသည်-

- **`summarizeMemories(apiKeyId, sessionId?, maxTokens = 4000)`** — session တစ်ခု၏
  မှတ်ဉာဏ်များကို token ပမာဏကန့်သတ်ချက်အတွင်းရှိသော အကျဉ်းချုပ်စာသားတစ်ခုအဖြစ် ချုံ့ပေးသည်။
- **`summarizeMemoriesOlderThan(apiKeyId, days, dryRun)`** — API က အသုံးပြုသည့်
  သက်တမ်းအခြေပြု ချုံ့ခြင်းဖြစ်သည်။ ၎င်းသည် `days` ထက် ပိုဟောင်းသော မှတ်ဉာဏ်တိုင်းကို ရွေးချယ်ကာ
  ၎င်းတို့မှ ချုံ့ထားသော အကျဉ်းချုပ်မှတ်ဉာဏ်တစ်ခုကို တည်ဆောက်ပြီး (`dryRun` သည် `false` ဖြစ်သောအခါ)
  မူရင်းများကို ဖျက်ပစ်သည်။ မည်သည့်အရာကိုမျှ မပြောင်းလဲဘဲ ရွေးချယ်ခံရမည့်အစုနှင့် token စုစုပေါင်းကို
  ကြိုတင်ကြည့်ရှုရန် `dryRun: true` ကို ပေးပါ။

tag/key clustering အဆင့် သို့မဟုတ် မှတ်ဉာဏ်တစ်ခုချင်းစီအလိုက် "အဓိကနှင့် အကျဉ်းချုပ်နိုင်သော" အမှတ်ပေးခြင်း မရှိပါ —
ရွေးချယ်မှုသည် သက်တမ်းသတ်မှတ်ချက်ပေါ်တွင်သာ အခြေခံပြီး အကျဉ်းချုပ်စာသားသည် ရွေးချယ်ခံရသူတစ်ခုစီအတွက်
အမျိုးအစားရှေ့ဆက်ပါသော ချုံ့ထားသည့် စာကြောင်းတစ်ကြောင်း ဖြစ်သည်။

### အကျဉ်းချုပ်ခြင်းကို စတင်ခြင်း

အကျဉ်းချုပ်ခြင်းသည် **ကိုယ်တိုင်လုပ်ဆောင်ရသော / ရွေးချယ်အသုံးပြုရသော** လုပ်ဆောင်ချက်ဖြစ်သည် — `autoSummarize` setting သည်
မူလအားဖြင့် `false` ဖြစ်သောကြောင့် မည်သည့်အရာကိုမျှ အလိုအလျောက် ချုံ့မည်မဟုတ်ပါ။ API မှတစ်ဆင့် စတင်ပါ-

```bash
curl -X POST http://localhost:20128/api/memory/summarize \
  -H "Authorization: Bearer $OMNIROUTE_KEY"
```

၎င်းကို ပိတ်ထားရန် `autoSummarize` ကို ၎င်း၏ မူလတန်ဖိုး (`false`) အတိုင်း ထားပါ။

### အကျဉ်းချုပ်ခြင်း အရည်အသွေးဆိုင်ရာ အကြံပြုချက်များ

- **`dryRun` ဖြင့် ဦးစွာ ကြိုတင်ကြည့်ရှုပါ** — `summarizeMemoriesOlderThan(..., true)` သည်
  မူရင်းများကို မဖျက်မီ မည်သည့်အရာများ ပေါင်းစည်းခံရမည်ကို အတည်ပြုနိုင်ရန်
  ရွေးချယ်ခံရမည့်စာရင်းနှင့် token စုစုပေါင်းကို ပြန်ပေးသည်။
- **မှတ်ဉာဏ်ဒေတာ အများအပြားရှိပါက traffic နည်းသောအချိန်များတွင် အကျဉ်းချုပ်ခြင်းကို လုပ်ဆောင်ပါ** — LLM call သည် အချိန်အကြာဆုံးအပိုင်းဖြစ်သည်

```bash
# Cron ပုံစံ- နေ့စဉ် နံနက် ၃ နာရီတွင် အကျဉ်းချုပ်ပါ
0 3 * * * curl -X POST http://localhost:20128/api/memory/summarize \
  -H "Authorization: Bearer $OMNIROUTE_KEY"
```

---

## MemoryBackend Provider ပုံစံ

> **အမှန်တကယ် ကိုးကားရမည့် အရင်းအမြစ်:** `src/lib/memory/backend.ts`, `src/lib/memory/genericBackend.ts`, `src/lib/memory/manager.ts`
> **စမ်းသပ်မှုများ:** `src/lib/memory/__tests__/generic-backend.test.ts`

MemoryBackend provider ပုံစံသည် လက်ရှိ memory engine အပေါ်တွင် **တပ်ဆင်ပြောင်းလဲနိုင်သော backend abstraction layer** တစ်ခုကို မိတ်ဆက်ပေးသည်။ storage implementation တစ်ခုတည်းနှင့် ချည်နှောင်ထားမည့်အစား memory system သည် ယခုအခါ ပြင်ဆင်သတ်မှတ်နိုင်သော primary/fallback routing ဖြင့် backend အများအပြား (SQLite, Obsidian, Notion, စိတ်ကြိုက် HTTP backend များ) ကို ပံ့ပိုးပေးသည်။

### တည်ဆောက်ပုံ

```
┌──────────────────────────────────────────────────────────┐
│                    API Route များ                         │
│            (src/app/api/memory/route.ts)                  │
└──────────────────────┬───────────────────────────────────┘
                       │
┌──────────────────────▼───────────────────────────────────┐
│                   MemoryManager                           │
│           Singleton စီမံညှိနှိုင်းသူ (manager.ts)          │
│                                                          │
│  Primary ──► Backend A  (ဥပမာ SQLite)                    │
│  Fallback ─► Backend B  (ဥပမာ Obsidian)                  │
│             Backend C  (ဥပမာ GenericBackend မှတစ်ဆင့် Notion)│
└──────────────────────┬───────────────────────────────────┘
                       │
        ┌──────────────┼──────────────┐
        ▼              ▼              ▼
┌────────────┐ ┌────────────┐ ┌──────────────────┐
│ SQLite     │ │ Obsidian   │ │ GenericMemory    │
│ Backend    │ │ Backend    │ │ Backend (HTTP)   │
└────────────┘ └────────────┘ └──────────────────┘
```

#### အဓိက Interface (`backend.ts`)

backend တိုင်းသည် `MemoryBackend` interface ကို implement လုပ်ရမည်-

```typescript
interface MemoryBackend {
  readonly id: string;
  readonly displayName: string;

  // ဖန်တီးခြင်း၊ ဖတ်ရှုခြင်း၊ ပြင်ဆင်ခြင်းနှင့် ဖျက်ခြင်း
  create(input: CreateMemoryInput): Promise<Memory>;
  get(id: string): Promise<Memory | null>;
  update(id: string, updates: Partial<...>): Promise<boolean>;
  delete(id: string): Promise<boolean>;
  list(filter: MemoryFilter): Promise<{ data: Memory[]; total: number; byType: Record<string, number> }>;

  // ရှာဖွေခြင်း
  search(config: SearchConfig): Promise<Memory[]>;

  // စနစ်အခြေအနေ
  health(): Promise<HealthCheckResult>;

  // သက်တမ်းစက်ဝန်း (မဖြစ်မနေ မဟုတ်)
  initialize?(): Promise<void>;
  shutdown?(): Promise<void>;
}
```

#### MemoryManager (`manager.ts`)

အောက်ပါတို့ကို လုပ်ဆောင်သည့် Singleton စီမံညှိနှိုင်းသူ-

- `register(backend)` မှတစ်ဆင့် backend များကို **စာရင်းသွင်းသည်** — `index.ts` မှ စတင်တက်လာချိန်တွင် ခေါ်ယူသည်
- `configure(primary, fallbacks)` မှတစ်ဆင့် primary + fallback ကို **ပြင်ဆင်သတ်မှတ်သည်**
- လုပ်ဆောင်မှု ပျက်ကွက်ပါက fallback chain ကို အသုံးပြု၍ CRUD/search ကို primary ထံ **လမ်းကြောင်းပေးသည်**
- backend အားလုံး၏ **စနစ်အခြေအနေကို** အချိန်မှန် စစ်ဆေးသည်

**Fallback လုပ်ဆောင်ပုံ-**

| လုပ်ဆောင်ချက် | Primary                          | Fallback များ                        |
| ------------- | -------------------------------- | ------------------------------------ |
| `create`      | ✅ Primary သာ                    | ❌                                   |
| `get`         | ✅ Primary ကို ဦးစွာ စမ်းသပ်သည်  | ✅ null ဖြစ်ပါက Fallback             |
| `update`      | ✅ Primary သာ                    | ✅ တုံ့ပြန်မှုမစောင့်ဘဲ sync လုပ်သည် |
| `delete`      | ✅ Primary သာ                    | ✅ တုံ့ပြန်မှုမစောင့်ဘဲ sync လုပ်သည် |
| `list`        | ✅ Primary သာ                    | ❌                                   |
| `search`      | ✅ Primary ကို ဦးစွာ အသုံးပြုသည် | ✅ error ဖြစ်ပါက Fallback            |

#### GenericMemoryBackend (`genericBackend.ts`)

မည်သည့် REST API ကိုမဆို MemoryBackend တစ်ခုအဖြစ် ပြောင်းလဲအသုံးပြုနိုင်စေသော ယေဘုယျ HTTP connector တစ်ခုဖြစ်သည်။ အောက်ပါတို့အတွက် အသုံးဝင်သည်-

- **Notion** — Notion API မှတစ်ဆင့် ချိတ်ဆက်ပါ
- **Obsidian** — Obsidian Local REST API မှတစ်ဆင့် ချိတ်ဆက်ပါ
- **စိတ်ကြိုက် backend များ** — RESTful memory API ကို ဖော်ထုတ်ပေးသည့် မည်သည့် service မဆို

**ပြင်ဆင်သတ်မှတ်မှု:**

```typescript
interface GenericBackendConfig {
  baseUrl: string;           // နောက်ခံ API ၏ အခြေခံ URL
  apiKey?: string;           // အထောက်အထားစိစစ်မှုအတွက် Bearer token
  headers?: Record<string, string>;  // စိတ်ကြိုက် HTTP headers
  timeout?: number;          // တောင်းဆိုမှု အချိန်ကုန်ဆုံးကန့်သတ်ချက် (မူလတန်ဖိုး: 30000ms)
  backendType?: string;      // မှတ်တမ်းတင်ရန်

  // Endpoint အစားထိုးသတ်မှတ်ချက်များ (မူလတန်ဖိုးများသည် REST စံသတ်မှတ်ချက်များကို အသုံးပြုသည်)
  endpoints?: {
    search?: string;   // မူလတန်ဖိုး: "/memories/search"
    create?: string;   // မူလတန်ဖိုး: "/memories"
    list?: string;     // မူလတန်ဖိုး: "/memories"
    get?: string;      // မူလတန်ဖိုး: "/memories/{id}"
    update?: string;   // မူလတန်ဖိုး: "/memories/{id}"
    delete?: string;   // မူလတန်ဖိုး: "/memories/{id}"
    health?: string;   // မူလတန်ဖိုး: "/health"
  };

  // Query parameter အမည် ချိတ်ဆက်သတ်မှတ်ချက်များ
  queryParams?: {
    query?/apiKeyId?/limit?/offset?/strategy?/maxTokens?/type?/sessionId?/orderBy?/orderDir?/options?
  };

  // Path parameter အမည် ချိတ်ဆက်သတ်မှတ်ချက်များ
  pathParams?: {
    id?/memoryId?
  };
}
```

**လူသိများသော နောက်ခံစနစ်များ** ကို `KNOWN_BACKENDS` တွင် ကြိုတင်ပြင်ဆင်သတ်မှတ်ထားသည်-

```typescript
createKnownBackend("obsidian"); // → localhost:27123 ကို ညွှန်ပြထားသော GenericMemoryBackend
createKnownBackend("notion"); // → api.notion.com/v1 ကို ညွှန်ပြထားသော GenericMemoryBackend
```

#### အသင့်ပါဝင်သော နောက်ခံစနစ်များ

##### SQLiteBackend (`sqliteBackend.ts`)

မူလ ပင်မနောက်ခံစနစ်ဖြစ်သည်။ `src/lib/memory/store.ts` ကို အသုံးပြု၍ ရှိပြီးသား SQLite အခြေပြု memory store ကို ထုပ်ပိုးထားသည်။ စတင်ချိန်တွင် အလိုအလျောက် မှတ်ပုံတင်ပေးသည်။

```typescript
import { sqliteBackend } from "./sqliteBackend";
memoryManager.register(sqliteBackend);
```

##### ObsidianBackend (`obsidianBackend.ts`)

ရှိပြီးသား Obsidian ပေါင်းစည်းမှု (`src/lib/memory/obsidianBackend.ts`) ကို ထုပ်ပိုးထားသည်။ Obsidian Local REST API မှတစ်ဆင့် Obsidian vault တစ်ခုနှင့် ချိတ်ဆက်သည်။

### ဆက်တင်များ

Memory နောက်ခံစနစ် ဆက်တင်များကို အက်ပ်ဆက်တင်ဇယားတွင် သိမ်းဆည်းထားပြီး `src/lib/memory/settings.ts` မှတစ်ဆင့် စီမံခန့်ခွဲသည်-

| ဆက်တင်                           | Env/Config Key           | မူလတန်ဖိုး | ဖော်ပြချက်                                                   |
| -------------------------------- | ------------------------ | ---------- | ------------------------------------------------------------ |
| ပင်မနောက်ခံစနစ်                  | `memoryPrimaryBackend`   | `"sqlite"` | ပင်မနောက်ခံစနစ်၏ ID                                          |
| အရန်နောက်ခံစနစ်များ              | `memoryFallbackBackends` | `[]`       | အစဉ်လိုက် စီထားသော အရန်နောက်ခံစနစ် ID များ                   |
| နောက်ခံစနစ် စီစဉ်သတ်မှတ်ချက်များ | `memoryBackendConfigs`   | `{}`       | နောက်ခံစနစ်တစ်ခုချင်းအလိုက် စီစဉ်သတ်မှတ်ချက် အစားထိုးမှုများ |

ဆက်တင်များကို `normalizeMemorySettings()` မှတစ်ဆင့် စံပုံစံဖြစ်အောင် ပြုလုပ်ပြီး `getMemorySettings()` တွင် ယာယီသိမ်းဆည်းထားသည်။

### စတင်ပြင်ဆင်ခြင်း လုပ်ငန်းစဉ်

```
အက်ပ် စတင်ခြင်း
  → index.ts မှ ထည့်သွင်းမှုများ (ဘေးထွက်အကျိုးသက်ရောက်မှု)- SQLiteBackend ကို မှတ်ပုံတင်သည်
  → အက်ပ်၏ lifecycle မှ initMemoryBackends() ကို ခေါ်သည်-
      1. ဆက်တင်များကို ဖွင့်ယူသည် (getMemorySettings)
      2. ပင်မနှင့် အရန်နောက်ခံစနစ်များကို စီစဉ်သတ်မှတ်သည်
      3. နောက်ခံစနစ်အားလုံးကို စတင်ပြင်ဆင်သည် (ကျန်းမာရေး စစ်ဆေးမှု)
      4. တောင်းဆိုမှုများအတွက် အသင့်ဖြစ်ပြီ
```

### နောက်ခံစနစ်အသစ် ထည့်သွင်းခြင်း

1. `src/lib/memory/<name>Backend.ts` တွင် **`MemoryBackend` interface ကို အကောင်အထည်ဖော်ပါ**
2. `src/lib/memory/index.ts` မှ **Export လုပ်ပါ**
3. စတင်ချိန်တွင် `memoryManager.register(yourBackend)` ဖြင့် **မှတ်ပုံတင်ပါ**
4. ဆက်တင်များမှတစ်ဆင့် **စီစဉ်သတ်မှတ်ပါ**- `memoryPrimaryBackend` ကို သင့်နောက်ခံစနစ် ID အဖြစ် သတ်မှတ်ပါ
5. `src/lib/memory/__tests__/generic-backend.test.ts` ကို ကိုးကား၍ **စမ်းသပ်ပါ**

#### ဥပမာ- Brain နောက်ခံစနစ်

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

### အတည်ပြုခြင်း

#### Unit စမ်းသပ်မှုများ

```bash
npx vitest run src/lib/memory/__tests__/generic-backend.test.ts --reporter=verbose
```

မျှော်မှန်းထားသော အထွက်- အောက်ပါတို့ကို လွှမ်းခြုံသည့် **စမ်းသပ်မှု 35 ခုလုံး အောင်မြင်သည်**-

- Constructor (2)
- ကျန်းမာရေး စစ်ဆေးမှု (4) — အောင်မြင်မှု၊ 500 ချို့ယွင်းမှု၊ ကွန်ရက်အမှား၊ latency
- စတင်ပြင်ဆင်ခြင်း (2) — အောင်မြင်မှု၊ ချို့ယွင်းမှု
- ဖန်တီးခြင်း (2) — မူလ endpoint၊ စိတ်ကြိုက် endpoint
- ရယူခြင်း (4) — အောင်မြင်မှု၊ 404 → null၊ 404 မဟုတ်သော အမှားကို ပစ်ခြင်း၊ စိတ်ကြိုက် path params
- အပ်ဒိတ်လုပ်ခြင်း (2) — အောင်မြင်မှု၊ 404 → false
- ဖျက်ခြင်း (2) — အောင်မြင်မှု၊ 404 → false
- စာရင်းပြုစုခြင်း (2) — query params၊ စိတ်ကြိုက် parameter အမည်များ
- ရှာဖွေခြင်း (3) — query params၊ စိတ်ကြိုက် endpoint၊ options serialization
- အထောက်အထားစိစစ်မှု headers (2) — Bearer token၊ စိတ်ကြိုက် headers
- Factory (1)

#### Type စစ်ဆေးမှု

```bash
npm run typecheck:core
```

မျှော်မှန်းချက်- **အမှား 0 ခု**။
