# Memory System (ଓଡ଼ିଆ)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/MEMORY.md) · 🇪🇹 [am](../../../am/docs/frameworks/MEMORY.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/MEMORY.md) · 🇦🇿 [az](../../../az/docs/frameworks/MEMORY.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/MEMORY.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/MEMORY.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/MEMORY.md) · 🇩🇰 [da](../../../da/docs/frameworks/MEMORY.md) · 🇩🇪 [de](../../../de/docs/frameworks/MEMORY.md) · 🇬🇷 [el](../../../el/docs/frameworks/MEMORY.md) · 🇪🇸 [es](../../../es/docs/frameworks/MEMORY.md) · 🇪🇪 [et](../../../et/docs/frameworks/MEMORY.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/MEMORY.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/MEMORY.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/MEMORY.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/MEMORY.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/MEMORY.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/MEMORY.md) · 🇮🇱 [he](../../../he/docs/frameworks/MEMORY.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/MEMORY.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/MEMORY.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/MEMORY.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/MEMORY.md) · 🇮🇩 [id](../../../id/docs/frameworks/MEMORY.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/MEMORY.md) · 🇮🇹 [it](../../../it/docs/frameworks/MEMORY.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/MEMORY.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/MEMORY.md) · 🇰🇭 [km](../../../km/docs/frameworks/MEMORY.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/MEMORY.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/MEMORY.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/MEMORY.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/MEMORY.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/MEMORY.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/MEMORY.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/MEMORY.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/MEMORY.md) · 🇲🇲 [my](../../../my/docs/frameworks/MEMORY.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/MEMORY.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/MEMORY.md) · 🇳🇴 [no](../../../no/docs/frameworks/MEMORY.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/MEMORY.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/MEMORY.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/MEMORY.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/MEMORY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/MEMORY.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/MEMORY.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/MEMORY.md) · 🇱🇰 [si](../../../si/docs/frameworks/MEMORY.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/MEMORY.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/MEMORY.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/MEMORY.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/MEMORY.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/MEMORY.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/MEMORY.md) · 🇮🇳 [te](../../../te/docs/frameworks/MEMORY.md) · 🇹🇭 [th](../../../th/docs/frameworks/MEMORY.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/MEMORY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/MEMORY.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/MEMORY.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/MEMORY.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/MEMORY.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/MEMORY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/MEMORY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/MEMORY.md)

---

> **ପ୍ରାମାଣିକ ଉତ୍ସ:** `src/lib/memory/` ଏବଂ `src/app/api/memory/`
> **ଶେଷ ଅଦ୍ୟତନ:** 2026-06-28 — v3.8.40 (ଡିଫଲ୍ଟ ଭାବେ ବନ୍ଦ + int8 କ୍ୱାଣ୍ଟାଇଜେସନ୍ କ୍ୟାଚ୍-ଅପ୍)

OmniRoute, API କୀ (ଏବଂ ଇଚ୍ଛାଧୀନ ଭାବେ ସେସନ୍ id) ଦ୍ୱାରା ଚିହ୍ନିତ ସ୍ଥାୟୀ କଥୋପକଥନ ସ୍ମୃତି ପ୍ରଦାନ କରେ। ହାଲୁକା regex ପ୍ୟାଟର୍ନ ମେଳ ମାଧ୍ୟମରେ LLM ପ୍ରତିକ୍ରିୟାଗୁଡ଼ିକରୁ ସ୍ମୃତି ସ୍ୱୟଂଚାଳିତ ଭାବେ ନିଷ୍କାସିତ ହୁଏ ଏବଂ ପରବର୍ତ୍ତୀ ଅନୁରୋଧଗୁଡ଼ିକରେ ଏକ ପ୍ରାରମ୍ଭିକ ସିଷ୍ଟମ୍ ସନ୍ଦେଶ ଭାବେ (କିମ୍ବା ସିଷ୍ଟମ୍ ଭୂମିକାକୁ ପ୍ରତ୍ୟାଖ୍ୟାନ କରୁଥିବା ପ୍ରଦାନକାରୀଙ୍କ ପାଇଁ ପ୍ରଥମ ବ୍ୟବହାରକାରୀ ସନ୍ଦେଶ ଭାବେ) ପୁଣି ଅନ୍ତର୍ଭୁକ୍ତ କରାଯାଏ।

> **ସ୍ମୃତି ଡିଫଲ୍ଟ ଭାବେ ବନ୍ଦ ଅଛି (v3.8.30+)।** `DEFAULT_MEMORY_SETTINGS.enabled`
> ଏବେ `false` ଅଟେ (`src/lib/memory/settings.ts`)। ସ୍ମୃତି ସକ୍ଷମ କଲେ
> ପୁନରୁଦ୍ଧାର କରାଯାଇଥିବା ପ୍ରସଙ୍ଗର ସର୍ବାଧିକ `maxTokens` (~2k) **ପ୍ରତ୍ୟେକ** ଚାଟ୍ ଅନୁରୋଧରେ
> ଅନ୍ତର୍ଭୁକ୍ତ ହୁଏ, ଯାହା ପାଇଁ ଶୁଳ୍କ ଲାଗେ — ନୂଆ ଇନ୍ଷ୍ଟଲେସନ୍ ଏବଂ ନିଜସ୍ୱ
> ପ୍ରସଙ୍ଗ ପରିଚାଳନା କରୁଥିବା କ୍ଲାଏଣ୍ଟମାନଙ୍କ ପାଇଁ ଏହା ଏକ ଅପ୍ରତ୍ୟାଶିତ ଖର୍ଚ୍ଚ। **Settings → Memory** ଅଧୀନରେ ସ୍ପଷ୍ଟ ଭାବେ ଅପ୍ଟ-ଇନ୍ କରନ୍ତୁ (
> ସ୍ମୃତି ସକ୍ଷମ ଥିବାବେଳେ `MemorySkillsTab` ଏକ ଟୋକେନ୍-ଖର୍ଚ୍ଚ ସତର୍କତା କଲ୍ଆଉଟ୍ ଦେଖାଏ)।
> କୌଣସି କ୍ଲାଏଣ୍ଟ `x-omniroute-no-memory`
> ଅନୁରୋଧ ହେଡର୍ (`true`/`1`/`yes`) ସହିତ ଗୋଟିଏ ଅନୁରୋଧକୁ ଏଥିରୁ ବାଦ୍ ଦେଇପାରେ — ଏଥିପାଇଁ
> [API_REFERENCE.md](../reference/API_REFERENCE.md) ରେ ଥିବା ଅନୁରୋଧ-ହେଡର୍ ସାରଣୀ ଦେଖନ୍ତୁ। ଏକ no-memory ଅନୁରୋଧ
> `memoryOwnerId = null` ସେଟ୍ କରେ, ଯାହା ସେହି ଅନୁରୋଧ ପାଇଁ ସ୍ମୃତି ଏବଂ ଦକ୍ଷତା ଅନ୍ତର୍ଭୁକ୍ତି
> **ଉଭୟକୁ** ଅକ୍ଷମ କରେ (`open-sse/handlers/chatCore/headers.ts::isNoMemoryRequested`)।

ସ୍ମୃତି **ପ୍ରତ୍ୟେକ API କୀ ଅନୁସାରେ ପରିସରଭୁକ୍ତ**, ପ୍ରତ୍ୟେକ ବ୍ୟବହାରକାରୀ ଅନୁସାରେ ନୁହେଁ — ସମାନ API କୀ ସହିତ ପ୍ରମାଣୀକୃତ ପ୍ରତ୍ୟେକ ଅନୁରୋଧ ସମାନ ସ୍ମୃତି ପୁଲ୍ ସେୟାର୍ କରେ, ଏବଂ `sessionId` ଦ୍ୱାରା ଅଧିକ ଇଚ୍ଛାଧୀନ ପରିସର ନିର୍ଦ୍ଧାରଣ କରାଯାଇପାରେ।

## ସ୍ଥାପତ୍ୟ

```
କ୍ଲାଏଣ୍ଟ → /v1/chat/completions (apiKeyInfo ଅପ୍ଷ୍ଟ୍ରିମ୍ରେ ସମାଧାନ କରାଯାଇଛି)
  → handleChatCore() [open-sse/handlers/chatCore.ts]
    → resolveMemoryOwnerId(apiKeyInfo)        # id ନିଷ୍କାସନ କରେ
    → getMemorySettings()                     # କ୍ୟାଶ୍ ହୋଇଥିବା ସେଟିଂସ୍
    → shouldInjectMemory(body, {enabled})     # ଗେଟ୍
    → retrieveMemories(apiKeyId, config)      # SQL + FTS5 + ଇଚ୍ଛାଧୀନ ଭେକ୍ଟର୍
    → injectMemory(body, memories, provider)  # ସିଷ୍ଟମ୍ କିମ୍ବା ବ୍ୟବହାରକାରୀ ସନ୍ଦେଶ
  → ଅପ୍ଷ୍ଟ୍ରିମ୍ ପ୍ରଦାନକାରୀ କଲ୍
  → ପ୍ରତିକ୍ରିୟାରେ: extractFacts(text, apiKeyId, sessionId)  # ଅବରୋଧହୀନ
    → setImmediate → ପ୍ରତ୍ୟେକ ମେଳ ପାଇଁ createMemory(fact)
                   → embed(content) + upsertVector(id, vec)
```

ଅନ୍ତର୍ଭୁକ୍ତି ଏବଂ ନିଷ୍କାସନ କଲ୍-ସାଇଟ୍ଗୁଡ଼ିକ
`open-sse/handlers/chatCore.ts` ରେ ସଂଯୋଜିତ ହୋଇଛି (`retrieveMemories`, `injectMemory`,
ଏବଂ `extractFacts` ଖୋଜନ୍ତୁ)।

## ଇଞ୍ଜିନ୍ ସ୍ଥାପତ୍ୟ (3-ସ୍ତରୀୟ ସମାଧାନ)

ଉପଲବ୍ଧ ଭିତ୍ତିଭୂମି ଏବଂ ସେଟିଂସ୍ ଆଧାରରେ Memory Engine ରନ୍ଟାଇମ୍ରେ ପୁନରୁଦ୍ଧାର ପଥ ସମାଧାନ କରେ। ତିନୋଟି ସ୍ତର ରହିଛି, ଯାହା ପ୍ରାଥମିକତା କ୍ରମରେ ପ୍ରୟୋଗ କରାଯାଏ:

```
  ┌─────────────────────────────────────────────────────────────┐
  │  ସ୍ତର 0 — କୀୱାର୍ଡ (FTS5)                                  │
  │  ପ୍ରୋବ୍-ଚାଳିତ ଉପଲବ୍ଧତା: SQLite ବିଲ୍ଡ ଏହାକୁ ସମର୍ଥନ        │
  │  କରୁଥିବାବେଳେ FTS5 (better-sqlite3 / node:sqlite /          │
  │  bun:sqlite); FTS5-ବିହୀନ ବିଲ୍ଡରେ ଅନୁପଲବ୍ଧ                 │
  │  (ଉଦାହରଣ ସ୍ୱରୂପ, sql.js/WASM — "no such module: fts5")।     │
  │  strategy = "exact" ଥିବାବେଳେ କିମ୍ବା ଫଲ୍ବ୍ୟାକ୍ ଭାବେ       │
  │  ବ୍ୟବହୃତ; engine-status keyword ପ୍ରୋବ୍କୁ ପ୍ରତିଫଳିତ କରେ। │
  └──────────────────────────────────┬──────────────────────────┘
                                     │ strategy = semantic|hybrid?
                                     ▼
  ┌─────────────────────────────────────────────────────────────┐
  │  ସ୍ତର 1 — ଏମ୍ବେଡେଡ୍ ଭେକ୍ଟର୍ (sqlite-vec)                  │
  │  db.loadExtension() ମାଧ୍ୟମରେ sqlite-vec v0.1.9 ଲୋଡ୍ ହୁଏ।  │
  │  Float32 ଭେକ୍ଟର୍ଗୁଡ଼ିକ ଉପରେ KNN ବ୍ରୁଟ୍-ଫୋର୍ସ। ସକ୍ରିୟ    │
  │  ହେବାର ସର୍ତ୍ତ:                                               │
  │   • sqlite-vec loadExtension ସଫଳ ହୁଏ                         │
  │   • Float32Array ଉତ୍ପାଦନ କରିପାରୁଥିବା ଏକ ଏମ୍ବେଡିଂ ଉତ୍ସ    │
  │     ଉପଲବ୍ଧ ଥାଏ (remote | static | transformers)             │
  │   • vec_memories ସାରଣୀ ବିଦ୍ୟମାନ ଥାଏ (ପ୍ରଥମ ready() ରେ ସୃଷ୍ଟି ହୁଏ) │
  └──────────────────────────────────┬──────────────────────────┘
                                     │ qdrant.enabled?
                                     ▼
  ┌─────────────────────────────────────────────────────────────┐
  │  ସ୍ତର 2 — Qdrant (ଅପ୍ଟ-ଇନ୍ ବାହ୍ୟ ଭେକ୍ଟର୍ ଡାଟାବେସ୍)        │
  │  ସକ୍ଷମ ଥିବାବେଳେ semantic/hybrid ପାଇଁ sqlite-vec କୁ         │
  │  ପ୍ରତିସ୍ଥାପନ କରେ। ଏକ ଚାଲୁଥିବା Qdrant ଇନ୍ଷ୍ଟାନ୍ସ +        │
  │  ବିନ୍ୟାସିତ host/port ଆବଶ୍ୟକ।                               │
  └─────────────────────────────────────────────────────────────┘
```

ଅବନତି ସ୍ୱୟଂଚାଳିତ ଏବଂ ପାରଦର୍ଶୀ:

- sqlite-vec ଲୋଡ୍ ହେବାରେ ବିଫଳ ହେଲେ, ସ୍ତର 1 ଅନୁପଲବ୍ଧ ହୁଏ → ସ୍ତର 0 କୁ ଫଲ୍ବ୍ୟାକ୍ କରେ।
- ଏମ୍ବେଡିଂ ଉତ୍ସ ଏକ ତ୍ରୁଟି ଫେରାଇଲେ, ସ୍ତର 1 ସ୍ତର 0 କୁ ଫଲ୍ବ୍ୟାକ୍ କରେ।
- Qdrant ଅସ୍ୱାସ୍ଥ୍ୟକର ଥିଲେ, ସ୍ତର 2 ସ୍ତର 1 କୁ ଫଲ୍ବ୍ୟାକ୍ କରେ (କିମ୍ବା ସ୍ତର 1 ମଧ୍ୟ
  ଅନୁପଲବ୍ଧ ଥିଲେ ସ୍ତର 0 କୁ)।

## ଏମ୍ବେଡିଂ ଉତ୍ସଗୁଡ଼ିକ

ଏମ୍ବେଡିଂ ସ୍ତର (`src/lib/memory/embedding/`) `MemorySettingsExtended.embeddingSource` ଆଧାରରେ କେଉଁ ଉତ୍ସ ବ୍ୟବହାର କରାଯିବ ତାହା ନିର୍ଦ୍ଧାରଣ କରେ:

| ଉତ୍ସ           | ବର୍ଣ୍ଣନା                                                                           | କୀ ଆବଶ୍ୟକ  | କୋଲ୍ଡ ଷ୍ଟାର୍ଟ    |
| -------------- | ---------------------------------------------------------------------------------- | ---------- | ---------------- |
| `remote`       | ବିନ୍ୟାସିତ ପ୍ରଦାନକାରୀଙ୍କ ଏମ୍ବେଡିଂ API (OpenAI, Cohere, ଇତ୍ୟାଦି) ବ୍ୟବହାର କରେ         | ହଁ         | କିଛି ନାହିଁ       |
| `static`       | `potion-base-8M` ମାଧ୍ୟମରେ ସ୍ଥାନୀୟ ଲୁକ୍ଅପ୍-ଟେବୁଲ୍ ଏମ୍ବେଡିଂ (WordPiece + ମିନ୍ ପୁଲିଂ) | ନା         | ~200ms           |
| `transformers` | `@huggingface/transformers` v4, `all-MiniLM-L6-v2` ମାଧ୍ୟମରେ ସ୍ଥାନୀୟ ONNX ଇନ୍ଫରେନ୍ସ | ନା         | ~3s + ~400MB RAM |
| `auto`         | ରନ୍ଟାଇମ୍ ନିର୍ଦ୍ଧାରଣ: ରିମୋଟ୍ (କୀ ଥିଲେ) → ଷ୍ଟାଟିକ୍ → ଟ୍ରାନ୍ସଫର୍ମର୍ସ → ନଲ୍            | ନିର୍ଭର କରେ | ନିର୍ଭର କରେ       |

**`auto` ପାଇଁ ନିର୍ଦ୍ଧାରଣ କ୍ରମ:**

1. `listEmbeddingProviders()`ରେ `hasKey === true` ଥିବା ପ୍ରଥମ ପ୍ରଦାନକାରୀକୁ ଖୋଜନ୍ତୁ → `remote`।
2. ଯଦି `settings.staticEnabled === true` → `static`।
3. ଯଦି `settings.transformersEnabled === true` → `transformers`।
4. ଅନ୍ୟଥା → `null` (FTS5 କୀୱାର୍ଡ ସନ୍ଧାନକୁ ଅବନମିତ ହୁଏ)।

ଏମ୍ବେଡିଂ କ୍ୟାଶ୍ (`src/lib/memory/embedding/cache.ts`) `${source}:${model}:${dim}:${sha256(text)}` ଦ୍ୱାରା କୀକୃତ ଏକ ଇନ୍-ମେମୋରି LRU ମ୍ୟାପ୍ ବ୍ୟବହାର କରେ, ଯାହା `MEMORY_EMBEDDING_CACHE_MAX` ଏଣ୍ଟ୍ରି (ଡିଫଲ୍ଟ 1000) ପର୍ଯ୍ୟନ୍ତ ସୀମିତ ଏବଂ ଏହାର TTL `MEMORY_EMBEDDING_CACHE_TTL_MS` (ଡିଫଲ୍ଟ 5 ମିନିଟ୍)। ପ୍ରତ୍ୟେକ ପ୍ରୋସେସ୍ର ଜୀବନଚକ୍ରରେ ଏହା ସମସ୍ତ କଲର୍ଙ୍କ ମଧ୍ୟରେ ସେୟାର୍ ହୁଏ।

## ହାଇବ୍ରିଡ୍ RRF (k=60)

ଯେତେବେଳେ `strategy = "hybrid"` ଥାଏ ଏବଂ ଭେକ୍ଟର୍ ଷ୍ଟୋର୍ ଉପଲବ୍ଧ ଥାଏ, ସେତେବେଳେ ପୁନରୁଦ୍ଧାର FTS5 ଏବଂ ଭେକ୍ଟର୍ ଫଳାଫଳକୁ ମିଶ୍ରଣ କରିବା ପାଇଁ Reciprocal Rank Fusion ବ୍ୟବହାର କରେ:

```
RRF(d) = Σ  1 / (k + rank_i(d))      ଯେଉଁଠାରେ k = 60 (MEMORY_RRF_K ମାଧ୍ୟମରେ ବିନ୍ୟାସଯୋଗ୍ୟ)
          i
```

ବିଶେଷ ଭାବରେ:

1. FTS5 ସନ୍ଧାନ ଚଲାନ୍ତୁ → କ୍ରମାଙ୍କିତ ତାଲିକା `R_fts` (ସ୍ଥାନ 1..N)।
2. KNN ଭେକ୍ଟର୍ ସନ୍ଧାନ ଚଲାନ୍ତୁ → କ୍ରମାଙ୍କିତ ତାଲିକା `R_vec` (ସ୍ଥାନ 1..M)।
3. ପ୍ରତ୍ୟେକ ଅନନ୍ୟ `memoryId` ପାଇଁ:  
   `rrf_score = 1/(60 + fts_rank)` + `1/(60 + vec_rank)` (ତାଲିକାରେ ନଥିଲେ 0)।
4. `rrf_score` ଅନୁସାରେ DESC କ୍ରମରେ ସଜାନ୍ତୁ, ଟୋକନ୍ ବଜେଟ୍ ୱାକ୍ ପ୍ରୟୋଗ କରନ୍ତୁ।

ବିଭିନ୍ନ ପ୍ରକାରର ପୁନରୁଦ୍ଧାର ପ୍ରଣାଳୀଗୁଡ଼ିକ ମଧ୍ୟରେ ସ୍କୋର୍ ସାମାନ୍ୟୀକରଣର ଆବଶ୍ୟକତା ବିନା RRF ପ୍ରଭାବଶାଳୀ ବୋଲି ସୁପରିଚିତ। ଡିଫଲ୍ଟ `k=60` ମୂଳ Cormack et al. ପେପର୍ରୁ ନିଆଯାଇଛି ଏବଂ ଛୋଟ କର୍ପସ୍ଗୁଡ଼ିକ (<10k ମେମୋରି) ପାଇଁ ଭଲ କାମ କରେ।

## ବ୍ୟାକ୍ଫିଲ୍ (ଲେଜି + ରିଇଣ୍ଡେକ୍ସ)

ଯେତେବେଳେ ଏମ୍ବେଡିଂ ମଡେଲ୍ ପରିବର୍ତ୍ତନ ହୁଏ (`embedding_signature` ମାଧ୍ୟମରେ ଚିହ୍ନଟ), ଭେକ୍ଟର୍ ଷ୍ଟୋର୍କୁ ପୁନଃନିର୍ମାଣ କରାଯାଏ ଏବଂ `memories` ଟେବୁଲ୍ରେ ଥିବା ସମସ୍ତ ବିଦ୍ୟମାନ ମେମୋରିକୁ `needs_reindex = 1` ଭାବେ ଚିହ୍ନିତ କରାଯାଏ।

**ଲେଜି ବ୍ୟାକ୍ଫିଲ୍**: ପରବର୍ତ୍ତୀ ପୁନରୁଦ୍ଧାର ସମୟରେ, ଭେକ୍ଟର୍ ଏଣ୍ଟ୍ରି ନଥିବା ଯେକୌଣସି ମେମୋରିକୁ ସନ୍ଧାନ ଚାଲିବା ପୂର୍ବରୁ ଏମ୍ବେଡ୍ କରି `vec_memories`ରେ ଯୋଡ଼ାଯାଏ। ଏହା ଷ୍ଟାର୍ଟଅପ୍କୁ ବ୍ଲକ୍ ନକରି ପ୍ରକୃତ ଅନୁରୋଧଗୁଡ଼ିକ ମଧ୍ୟରେ ବ୍ୟାକ୍ଫିଲ୍ ଖର୍ଚ୍ଚକୁ ବିଭକ୍ତ କରେ।

**ସ୍ପଷ୍ଟ ରିଇଣ୍ଡେକ୍ସ**: `/dashboard/memory`ରେ ଥିବା Engine ଟ୍ୟାବ୍ ଏକ "ବର୍ତ୍ତମାନ ରିଇଣ୍ଡେକ୍ସ କରନ୍ତୁ" ବଟନ୍ ପ୍ରଦାନ କରେ, ଯାହା `POST /api/memory/reindex`କୁ କଲ୍ କରେ। ହ୍ୟାଣ୍ଡଲର୍ `src/lib/memory/reindex.ts`ରୁ `runReindexBatch()`କୁ କଲ୍ କରେ, ଯାହା ପ୍ରତ୍ୟେକ ଅନୁରୋଧରେ `limit` ପର୍ଯ୍ୟନ୍ତ ବିଚାରାଧୀନ ଏଣ୍ଟ୍ରି ପ୍ରକ୍ରିୟାକରଣ କରେ। `GET /api/memory/engine-status` (`vectorStore.needsReindex`) ମାଧ୍ୟମରେ ପ୍ରଗତିକୁ ପୋଲ୍ କରାଯାଇପାରେ।

`memory_vec_meta` ଟେବୁଲ୍ (ମାଇଗ୍ରେସନ୍ `083_memory_vec.sql`) ଏଗୁଡ଼ିକୁ ସଂରକ୍ଷଣ କରେ:

- `active_dim` — ବର୍ତ୍ତମାନର ଭେକ୍ଟର୍ ଡାଇମେନ୍ସନ୍ (null = ଏପର୍ଯ୍ୟନ୍ତ କ୍ୟାଲିବ୍ରେଟ୍ ହୋଇନାହିଁ)।
- `embedding_signature` — ପରିବର୍ତ୍ତନ ଚିହ୍ନଟ କରିବା ପାଇଁ ବ୍ୟବହୃତ `${source}:${model}:${dim}`।
- `last_reset_at` — ଶେଷ ସମ୍ପୂର୍ଣ୍ଣ ରିସେଟ୍ର ଟାଇମ୍ଷ୍ଟାମ୍ପ।
- `vec_loaded` — sqlite-vec ସଫଳତାର ସହ ଲୋଡ୍ ହୋଇଛି କି ନାହିଁ ଦର୍ଶାଉଥିବା 0/1 ଫ୍ଲାଗ୍।

## ସେଟିଂସ୍ ଏକ୍ସଟେନ୍ସନ୍

`src/shared/schemas/memory.ts` ରେ ଥିବା `MemorySettingsExtended` ଭିତରେ ନଅଟି ଏମ୍ବେଡିଂ ଏବଂ ଭେକ୍ଟର୍ ଫିଲ୍ଡ ଉପଲବ୍ଧ ଅଛି, ଯାହା `src/lib/db/settings.ts` ମାଧ୍ୟମରେ ସ୍ଥାୟୀ ଭାବରେ ସଂରକ୍ଷିତ ହୁଏ:

| ଫିଲ୍ଡ                    | ପ୍ରକାର                                             | ଡିଫଲ୍ଟ   | ବର୍ଣ୍ଣନା                                                     |
| ------------------------ | -------------------------------------------------- | -------- | ------------------------------------------------------------ |
| `embeddingSource`        | `"remote" \| "static" \| "transformers" \| "auto"` | `"auto"` | କେଉଁ ଏମ୍ବେଡିଂ ଉତ୍ସ ବ୍ୟବହାର କରାଯିବ                            |
| `embeddingProviderModel` | `string \| null`                                   | `null`   | `provider/model` ଫର୍ମାଟ୍ରେ ପ୍ରଦାତା/ମଡେଲ୍                     |
| `customBaseUrl`          | `string \| null`                                   | `null`   | କେବଳ ମେମୋରି ପାଇଁ OpenAI-ସୁସଙ୍ଗତ ଏଣ୍ଡପଏଣ୍ଟ ବେସ୍ URL           |
| `customModelId`          | `string \| null`                                   | `null`   | କଷ୍ଟମ୍ ଏଣ୍ଡପଏଣ୍ଟକୁ ପଠାଯାଉଥିବା ମଡେଲ୍ ID                       |
| `transformersEnabled`    | `boolean`                                          | `false`  | Transformers.js (MiniLM, ~400MB) ପାଇଁ ସ୍ପଷ୍ଟ ସମ୍ମତି          |
| `staticEnabled`          | `boolean`                                          | `false`  | ସ୍ଥାନୀୟ static potion-base-8M ମଡେଲ୍ ପାଇଁ ସ୍ପଷ୍ଟ ସମ୍ମତି       |
| `rerankEnabled`          | `boolean`                                          | `false`  | ପୁନଃ-ର୍ୟାଙ୍କିଂ ପଦକ୍ଷେପ ସକ୍ଷମ କରନ୍ତୁ (+200-500ms/req ଯୋଗ କରେ) |
| `rerankProviderModel`    | `string \| null`                                   | `null`   | `provider/model` ଫର୍ମାଟ୍ରେ ପୁନଃ-ର୍ୟାଙ୍କ ପ୍ରଦାତା/ମଡେଲ୍        |
| `vectorStore`            | `"sqlite-vec" \| "qdrant" \| "auto"`               | `"auto"` | କେଉଁ ଭେକ୍ଟର୍ ବ୍ୟାକଏଣ୍ଡ ବ୍ୟବହାର କରାଯିବ                        |

ଏଗୁଡ଼ିକ `GET /PUT /api/settings/memory` (ସ୍କିମା `MemorySettingsExtendedSchema`) ମାଧ୍ୟମରେ ଉପଲବ୍ଧ କରାଯାଇଛି।

`remote` ଉତ୍ସ ପାଇଁ, Memory ଇଚ୍ଛାଧୀନ `customBaseUrl` ଏବଂ
`customModelId` ସେଟିଂସ୍କୁ ମଧ୍ୟ ଗ୍ରହଣ କରେ। ଏକତ୍ର ଏଗୁଡ଼ିକ ଗ୍ଲୋବାଲ୍ ଏମ୍ବେଡିଂ ରେଜିଷ୍ଟ୍ରିକୁ ପରିବର୍ତ୍ତନ ନକରି ଏକ OpenAI-ସୁସଙ୍ଗତ `/embeddings`
ଏଣ୍ଡପଏଣ୍ଟ ଏବଂ ମଡେଲ୍ ଚୟନ କରେ। ବ୍ୟବହାର ପୂର୍ବରୁ ଏଣ୍ଡପଏଣ୍ଟକୁ
ସାମାନ୍ୟୀକୃତ କରାଯାଏ ଏବଂ ପ୍ରଦାତାର ଆଉଟବାଉଣ୍ଡ URL ନୀତି ଦ୍ୱାରା ଯାଞ୍ଚ କରାଯାଏ: HTTP(S)
ଆବଶ୍ୟକ, ଏମ୍ବେଡ୍ କରାଯାଇଥିବା ପ୍ରମାଣପତ୍ର ଏବଂ କ୍ୱେରି ଷ୍ଟ୍ରିଂଗୁଡ଼ିକୁ ପ୍ରତ୍ୟାଖ୍ୟାନ କରାଯାଏ, ଏବଂ କ୍ଲାଉଡ୍-ମେଟାଡାଟା
ଠିକଣାଗୁଡ଼ିକ ଅବରୋଧିତ ରହେ। ଖାଲି ମୂଲ୍ୟଗୁଡ଼ିକ ଚୟନିତ ରେଜିଷ୍ଟ୍ରି ପ୍ରଦାତାକୁ ଅପରିବର୍ତ୍ତିତ ରଖେ। ଡ୍ୟାସ୍ବୋର୍ଡକୁ
ଫେରାଯାଇଥିବା ତ୍ରୁଟିଗୁଡ଼ିକୁ ସାନିଟାଇଜ୍ କରାଯାଏ ଏବଂ ଏଣ୍ଡପଏଣ୍ଟ ପ୍ରମାଣପତ୍ରଗୁଡ଼ିକ କେବେବି ଲଗ୍ କରାଯାଏ ନାହିଁ।

> **TODO (D20):** `global` ସ୍କୋପ୍ (ସମସ୍ତ API କୀ ମଧ୍ୟରେ ମେମୋରି ଅଂଶୀଦାର କରିବା)
> ଏହି ରିଲିଜ୍ରେ କାର୍ଯ୍ୟାନ୍ୱିତ ହୋଇନାହିଁ। ଏଥିପାଇଁ ସ୍କିମା ପରିବର୍ତ୍ତନ ଏବଂ ଏକ ଗ୍ଲୋବାଲ୍ ପୁନରୁଦ୍ଧାର
> ପଥ ଆବଶ୍ୟକ। ଏହାକୁ ପୃଥକ ଭାବେ ଟ୍ରାକ୍ କରନ୍ତୁ।

## ଷ୍ଟୋରେଜ୍ ସ୍ତରଗୁଡ଼ିକ

### ପ୍ରାଥମିକ: SQLite (`memories` ଟେବୁଲ୍)

ମାଇଗ୍ରେସନ୍ `015_create_memories.sql` ଦ୍ୱାରା ସୃଷ୍ଟି:

| କଲମ୍                        | ପ୍ରକାର             | ଟିପ୍ପଣୀ                                                                                  |
| --------------------------- | ------------------ | ---------------------------------------------------------------------------------------- |
| `id`                        | `TEXT PRIMARY KEY` | `crypto.randomUUID()` ମାଧ୍ୟମରେ ସୃଷ୍ଟ UUID                                                |
| `api_key_id`                | `TEXT NOT NULL`    | ମାଲିକାନାଧୀନ API କୀ                                                                       |
| `session_id`                | `TEXT`             | ଇଚ୍ଛାଧୀନ ପ୍ରତି-ବାର୍ତ୍ତାଳାପ ସ୍କୋପ୍                                                        |
| `type`                      | `TEXT NOT NULL`    | `factual`, `episodic`, `procedural`, `semantic` ମଧ୍ୟରୁ ଗୋଟିଏ                             |
| `key`                       | `TEXT`             | ସ୍ଥିର ଅପ୍ସର୍ଟ କୀ, ଯଥା `preference:i_prefer_python`                                       |
| `content`                   | `TEXT NOT NULL`    | ପ୍ରକୃତ ତଥ୍ୟ ପାଠ୍ୟ                                                                        |
| `metadata`                  | `TEXT`             | JSON ବ୍ଲବ୍ (ବର୍ଗ, ନିଷ୍କାସନ ସମୟ, ଉତ୍ସ, ...)                                               |
| `created_at` / `updated_at` | `TEXT`             | ISO 8601 ଷ୍ଟ୍ରିଂଗୁଡ଼ିକ                                                                   |
| `expires_at`                | `TEXT`             | ଇଚ୍ଛାଧୀନ ମିଆଦ ସମାପ୍ତି; `NULL` ଅର୍ଥ ସ୍ଥାୟୀ                                                |
| `memory_id`                 | `INTEGER UNIQUE`   | UUIDଗୁଡ଼ିକ ↔ FTS5 rowids ସଂଯୋଗ କରିବାକୁ `023_fix_memory_fts_uuid.sql` ଦ୍ୱାରା ଯୋଗ କରାଯାଇଛି |

ଇଣ୍ଡେକ୍ସଗୁଡ଼ିକ: `api_key_id`, `session_id`, `type`, `expires_at`, ଏବଂ ଅନନ୍ୟ
`memory_id` ଇଣ୍ଡେକ୍ସ।

**ଅପ୍ସର୍ଟ ଅର୍ଥବିଜ୍ଞାନ**: `createMemory()` ସମାନ
`(api_key_id, key)` ଥିବା ଏକ ବିଦ୍ୟମାନ ରୋ ଖୋଜେ ଏବଂ ମିଳିଲେ ସେହି ସ୍ଥାନରେ ତାହାକୁ ଅଦ୍ୟତନ କରେ (`metadata`କୁ
ଶାଲୋ ସ୍ପ୍ରେଡ୍ ମାଧ୍ୟମରେ ମିଶ୍ରଣ କରି)। ଏହା ବାରମ୍ବାର ଦିଆଯାଉଥିବା
ପସନ୍ଦ ବିବୃତି ପାଇଁ ଟେବୁଲ୍କୁ ସୀମାହୀନ ଭାବେ ବଢ଼ିବାରୁ ରୋକେ।

### ପୂର୍ଣ୍ଣ-ପାଠ୍ୟ ସନ୍ଧାନ (`memory_fts` ଭର୍ଚୁଆଲ୍ ଟେବୁଲ୍)

`022_add_memory_fts5.sql`, `content` ଏବଂ
`key` ଉପରେ ଏକ FTS5 ଭର୍ଚୁଆଲ୍ ଟେବୁଲ୍ ସୃଷ୍ଟି କରେ। `023_fix_memory_fts_uuid.sql` ଏକ ବାସ୍ତବ-ପରିସ୍ଥିତିର ବଗ୍ ସମାଧାନ କରେ, ଯେଉଁଠାରେ UUID
ପ୍ରାଥମିକ କୀ FTS5ର ଇଣ୍ଟିଜର୍ rowid ସହ ଯୋଡ଼ି ହେଉନଥିଲା — ମାଇଗ୍ରେସନ୍ଟି
`memory_id` କଲମ୍ ଯୋଗ କରେ, FTS ଟେବୁଲ୍କୁ ପୁନଃସୃଷ୍ଟି କରେ, ଏବଂ ଟ୍ରିଗର୍ଗୁଡ଼ିକୁ
(`memory_fts_ai`, `memory_fts_ad`, `memory_fts_au`) ସଂଯୋଗ କରେ, ଯେଉଁଗୁଡ଼ିକ INSERT, DELETE, ଏବଂ UPDATE ସମୟରେ FTSକୁ ସିଙ୍କ୍ରେ ରଖେ।

`semantic` ଏବଂ `hybrid` ରଣନୀତି ପାଇଁ `retrieval.ts` ଦ୍ୱାରା ବ୍ୟବହୃତ (ନିମ୍ନରେ ଦେଖନ୍ତୁ)।
ପୁନରୁଦ୍ଧାର କୋଡ୍ `hasTable("memory_fts")` ଦ୍ୱାରା ସୁରକ୍ଷା ଯାଞ୍ଚ କରେ ଏବଂ FTS ଟେବୁଲ୍ ନଥିଲେ କିମ୍ବା FTS କ୍ୱେରି ତ୍ରୁଟି ଦେଲେ
କାଳକ୍ରମିକ କ୍ରମକୁ ଫଲ୍ବ୍ୟାକ୍ କରେ।

### ଇଚ୍ଛାଧୀନ: Qdrant (ଭେକ୍ଟର୍ ଷ୍ଟୋର୍ ସ୍ତର 2)

`src/lib/memory/qdrant.ts`, ସ୍ତର 2
ଭେକ୍ଟର୍ ଷ୍ଟୋର୍ ଭାବେ ଏକ ଇଚ୍ଛାଧୀନ Qdrant ସମନ୍ୱୟ କାର୍ଯ୍ୟାନ୍ୱିତ କରେ। ଇଞ୍ଜିନ୍ ଚୟନକାରୀ
`memoryVectorStore === "qdrant"` ହୋଇଥିବା ବେଳେ ହିଁ ପୁନରୁଦ୍ଧାର Qdrantକୁ ରୁଟ୍ କରେ — ଡିଫଲ୍ଟ `"auto"` (ଏବଂ `"sqlite-vec"`)
**କେବେବି** Qdrant ଚୟନ କରେ ନାହିଁ। Engine ଟ୍ୟାବ୍ର ଟଗଲ୍ **ଉଭୟ** `qdrantEnabled` ଏବଂ
`memoryVectorStore`କୁ ଏକାସାଙ୍ଗରେ ସେଟ୍ କରେ: ସକ୍ଷମ କଲେ Qdrant ପ୍ରାଥମିକ ଷ୍ଟୋର୍ ହୁଏ, ଅକ୍ଷମ କଲେ
ଏହା `"auto"`କୁ ରିସେଟ୍ ହୁଏ (#5597 — ସେହି ସମାଧାନ ପୂର୍ବରୁ, ସକ୍ଷମ କରିବା ନିଷ୍କ୍ରିୟ ଥିଲା କାରଣ କୌଣସି କୋଡ୍
ଇଞ୍ଜିନ୍ ଚୟନକାରୀକୁ ଲେଖୁନଥିଲା)। ଯଦି Qdrant ପହଞ୍ଚଯୋଗ୍ୟ ନୁହେଁ କିମ୍ବା କିଛି ଫେରାଏ ନାହିଁ, ତେବେ ପୁନରୁଦ୍ଧାର
sqlite-vec → FTS5କୁ ଫଲ୍ବ୍ୟାକ୍ କରେ।

- `upsertSemanticMemoryPoint()` — ବିନ୍ୟାସିତ ଏମ୍ବେଡିଂ ମଡେଲ୍ ସହିତ `key + content`କୁ ଏମ୍ବେଡ୍ କରେ, କଲେକ୍ସନ୍ ଅଛି ବୋଲି ସୁନିଶ୍ଚିତ କରେ (ପ୍ରଥମ ବ୍ୟବହାରରେ କୋସାଇନ୍-ଦୂରତା ଭେକ୍ଟର୍ ସୃଷ୍ଟି କରେ), ଏବଂ `{memoryId,
apiKeyId, sessionId, key, content, metadata, createdAtUnix, expiresAtUnix}` ପେଲୋଡ୍ ସହିତ ଏକ ପଏଣ୍ଟ ଅପ୍ସର୍ଟ କରେ।
- `searchSemanticMemory(query, topK, scope)` — କ୍ୱେରୀକୁ ଏମ୍ବେଡ୍ କରେ, `kind = "omniroute_memory"` ଦ୍ୱାରା ଫିଲ୍ଟର୍ ହୋଇଥିବା କଲେକ୍ସନ୍ରେ ସନ୍ଧାନ କରେ ଏବଂ ଇଚ୍ଛାନୁସାରେ `apiKeyId` / `sessionId` ଦ୍ୱାରା ମଧ୍ୟ ଫିଲ୍ଟର୍ କରେ। `topK`କୁ `[1, 20]` ମଧ୍ୟରେ ସୀମିତ ରଖେ।
- `deleteSemanticMemoryPoint(id)` — ଗୋଟିଏ ପଏଣ୍ଟ ବିଲୋପ କରେ। SQLite ରୋ ହଟାଯିବା ପରେ `deleteMemory()` ଦ୍ୱାରା କଲ୍ କରାଯାଏ (D15)।
- `cleanupSemanticMemoryPoints({retentionDays})` — ଯେଉଁ ପଏଣ୍ଟଗୁଡ଼ିକର `expiresAtUnix` ଅତୀତରେ ଅଛି କିମ୍ବା `createdAtUnix` ରିଟେନ୍ସନ୍ କଟ୍ଅଫ୍ଠାରୁ ପୁରୁଣା, ସେଗୁଡ଼ିକୁ ଏକାସାଙ୍ଗରେ ବିଲୋପ କରେ। ଡ୍ୟାସ୍ବୋର୍ଡ ପ୍ରକୃତ ସଂଖ୍ୟା ଦେଖାଇପାରିବା ପାଇଁ ପ୍ରଥମେ ଗଣନା କରେ।
- `checkQdrantHealth()` — ବିଳମ୍ବତା ସହିତ `GET /readyz` ସ୍ୱାସ୍ଥ୍ୟ ଯାଞ୍ଚ।

ସେଟିଂସ୍ UI, `/dashboard/memory`ର **Engine ଟ୍ୟାବ୍**ରେ Qdrant ବିନ୍ୟାସ, ସ୍ୱାସ୍ଥ୍ୟ ଯାଞ୍ଚ, ସିମାଣ୍ଟିକ୍ ସର୍ଚ୍ଚ ପରୀକ୍ଷା ଏବଂ କ୍ଲିନ୍ଅପ୍ ଉପଲବ୍ଧ କରାଏ। `src/app/api/settings/qdrant/` ଅଧୀନରେ ଥିବା ସମ୍ପର୍କିତ ରୁଟ୍ଗୁଡ଼ିକ v3.8.6 ଠାରୁ ସମ୍ପୂର୍ଣ୍ଣ ଭାବେ ସଂଯୋଜିତ:

| ରୁଟ୍                                    | ପଦ୍ଧତି        | ବର୍ଣ୍ଣନା                               |
| --------------------------------------- | ------------- | -------------------------------------- |
| `/api/settings/qdrant`                  | `GET` / `PUT` | Qdrant ସେଟିଂସ୍ ପଢ଼ନ୍ତୁ / ଅଦ୍ୟତନ କରନ୍ତୁ |
| `/api/settings/qdrant/health`           | `GET`         | ସକ୍ରିୟତା ଯାଞ୍ଚ + ବିଳମ୍ବତା              |
| `/api/settings/qdrant/search`           | `POST`        | ସିମାଣ୍ଟିକ୍ ସର୍ଚ୍ଚ ପରୀକ୍ଷା              |
| `/api/settings/qdrant/cleanup`          | `POST`        | ମିଆଦ ଶେଷ / ପୁରୁଣା ପଏଣ୍ଟ ହଟାନ୍ତୁ        |
| `/api/settings/qdrant/embedding-models` | `GET`         | ଉପଲବ୍ଧ ଏମ୍ବେଡିଂ ମଡେଲ୍ର ତାଲିକା          |

**ଆଚରଣ ସମ୍ବନ୍ଧୀୟ ଟିପ୍ପଣୀ (କ’ଣ ଆଶା କରିବେ):**

- **ଇଞ୍ଜିନ୍ ଚୟନ** — Engine ଟ୍ୟାବ୍ରେ Qdrant ସକ୍ଷମ କଲେ ଏହା ପ୍ରାଥମିକ ଷ୍ଟୋର୍ ହୁଏ (`memoryVectorStore="qdrant"` ସେଟ୍ କରେ); ଅକ୍ଷମ କଲେ ଏହା `"auto"`କୁ ପୁନଃସେଟ୍ ହୁଏ (#5597)।
- **କୌଣସି ବ୍ୟାକ୍ଫିଲ୍ ନାହିଁ** — Qdrant ସକ୍ଷମ କରାଯିବାର **ପରେ** ସୃଷ୍ଟି/ଅଦ୍ୟତନ ହୋଇଥିବା ମେମୋରୀଗୁଡ଼ିକୁ ମାତ୍ର ଏଥିରେ ଲେଖାଯାଏ (ଫାୟାର୍-ଆଣ୍ଡ୍-ଫର୍ଗେଟ୍ ଡୁଆଲ୍-ରାଇଟ୍)। ପୂର୍ବରୁ ଥିବା SQLite ମେମୋରୀଗୁଡ଼ିକୁ ସ୍ଥାନାନ୍ତର କରାଯାଏ **ନାହିଁ**; "Reindex Now" କେବଳ sqlite-vec ଇଣ୍ଡେକ୍ସକୁ ପୁନଃନିର୍ମାଣ କରେ, Qdrantକୁ ନୁହେଁ।
- **ଭେକ୍ଟର୍ ଡାଇମେନ୍ସନ୍ ପ୍ରଥମ ବ୍ୟବହାରରେ ପ୍ରକୃତ ଏମ୍ବେଡିଂରୁ ସ୍ୱୟଂଚାଳିତ ଭାବେ ଚିହ୍ନଟ ହୁଏ** — ପୂରଣ କରିବା ପାଇଁ କୌଣସି ଡାଇମେନ୍ସନ୍ ଫିଲ୍ଡ ନାହିଁ। ଏକ କଲେକ୍ସନ୍ ଥିବା ପରେ ଏମ୍ବେଡିଂ ମଡେଲ୍ ପରିବର୍ତ୍ତନ କରାଗଲେ ତାହା **ସ୍ୱୟଂଚାଳିତ ଭାବେ** ପରିଚାଳିତ ହୁଏ ନାହିଁ: ବିଦ୍ୟମାନ କଲେକ୍ସନ୍ ଅପରିବର୍ତ୍ତିତ ରହେ, ଡାଇମେନ୍ସନ୍-ଅସଙ୍ଗତ ରାଇଟ୍/ସର୍ଚ୍ଚ ବିଫଳ ହୁଏ ଏବଂ sqlite-vecକୁ ଫଲ୍ବ୍ୟାକ୍ କରେ। ଏମ୍ବେଡର୍ ପରିବର୍ତ୍ତନ କରିବାକୁ କଲେକ୍ସନ୍କୁ ପୁନଃସୃଷ୍ଟି କରନ୍ତୁ (ନୂଆ ନାମ ଦିଅନ୍ତୁ କିମ୍ବା Qdrantରେ ଏହାକୁ ବିଲୋପ କରନ୍ତୁ)।
- **ଦୂରତା ମେଟ୍ରିକ୍** — ସର୍ବଦା **Cosine** (କଲେକ୍ସନ୍ ସୃଷ୍ଟି ସମୟରେ ହାର୍ଡକୋଡ୍ ହୋଇଥାଏ; ବିନ୍ୟାସଯୋଗ୍ୟ ନୁହେଁ)।
- **ପ୍ରମାଣୀକରଣ** — କେବଳ API କି (`api-key` ହେଡର୍ ଭାବେ ପଠାଯାଏ; ପ୍ରମାଣୀକରଣବିହୀନ ସ୍ଥାନୀୟ Docker ପାଇଁ ଇଚ୍ଛାଧୀନ)। JWT/RBAC ବ୍ୟବହୃତ ହୁଏ ନାହିଁ।
- **ବିନ୍ୟାସ ଫିଲ୍ଡଗୁଡ଼ିକ** — UIରେ `host`, `port`, `collection`, `embeddingModel`, `apiKey` ଉପଲବ୍ଧ। `vectorSize` / `hnswEfConstruct` କେବଳ env/DBରେ ଅଛି ଏବଂ କଲେକ୍ସନ୍ ସୃଷ୍ଟି ପାଇଁ `vectorSize` ବ୍ୟବହୃତ ହୁଏ ନାହିଁ (ଡାଇମେନ୍ସନ୍ ଏମ୍ବେଡିଂରୁ ଆସେ)।

### ଭେକ୍ଟର୍ କ୍ୱାଣ୍ଟାଇଜେସନ୍ (int8 — ଇଚ୍ଛାଧୀନ, ଉଭୟ ବ୍ୟାକେଣ୍ଡ)

ଉଭୟ ଭେକ୍ଟର୍ ବ୍ୟାକେଣ୍ଡ ସଞ୍ଚିତ ଭେକ୍ଟର୍ଗୁଡ଼ିକର ମେମୋରୀ ବ୍ୟବହାର କମାଇବା ପାଇଁ **ଇଚ୍ଛାଧୀନ int8 କ୍ୱାଣ୍ଟାଇଜେସନ୍** ସମର୍ଥନ କରେ (Float32 ତୁଳନାରେ ପ୍ରାୟ 4× ଛୋଟ), ଯାହା ପାଇଁ ରିକଲ୍ରେ ସାମାନ୍ୟ ହ୍ରାସ ହୋଇପାରେ। ଉଭୟରେ ଡିଫଲ୍ଟ ଭାବେ ଏହା **ବନ୍ଦ** — ସ୍ପଷ୍ଟ ଭାବେ ସକ୍ଷମ ନ କରାଯାଏ ପର୍ଯ୍ୟନ୍ତ ଭେକ୍ଟର୍ଗୁଡ଼ିକ ପୂର୍ଣ୍ଣ-ପ୍ରିସିଜନ୍ରେ ରହେ।

| ବ୍ୟାକେଣ୍ଡ  | ସେଟିଂ                           | ପ୍ରକାର                         | ଡିଫଲ୍ଟ   | କେଉଁଠାରେ ପଢ଼ାଯାଏ                                            |
| ---------- | ------------------------------- | ------------------------------ | -------- | ----------------------------------------------------------- |
| Qdrant     | `qdrantQuantization` (DB କି)    | `"none" \| "int8" \| "binary"` | `"none"` | `src/lib/memory/qdrant.ts::normalizeQdrantConfig()`         |
| sqlite-vec | `MEMORY_VEC_QUANTIZATION` (env) | `"none" \| "int8"`             | `"none"` | `src/lib/memory/vectorStore.ts::requestedVecQuantization()` |

- **Qdrant**କୁ `qdrantQuantization` ସେଟିଂ କି ମାଧ୍ୟମରେ ପ୍ରତି ଇନ୍ଷ୍ଟାନ୍ସ ପାଇଁ ବିନ୍ୟାସ କରାଯାଏ (`PUT /api/settings/qdrant`ରେ `quantization` ଫିଲ୍ଡ ଭାବେ ଉପଲବ୍ଧ)। `"int8"` ହେଲେ, `buildQuantizationConfig()` ସ୍କେଲାର୍ କ୍ୱାଣ୍ଟାଇଜେସନ୍ (`always_ram`, କ୍ୱାଣ୍ଟାଇଲ୍ `0.99`) ଅନୁରୋଧ କରେ ଏବଂ ସର୍ଚ୍ଚରେ `rescore: true` ସକ୍ଷମ ହୁଏ, ଯାହାଦ୍ୱାରା ପୂର୍ଣ୍ଣ-ପ୍ରିସିଜନ୍ ଭେକ୍ଟର୍ଗୁଡ଼ିକ int8 ପ୍ରାର୍ଥୀ ସେଟ୍କୁ ଅଧିକ ପରିଶୋଧିତ କରେ।
- **sqlite-vec** କ୍ୱାଣ୍ଟାଇଜେସନ୍ **କେବଳ ପରିବେଶ-ଆଧାରିତ** (DB ସେଟିଂ ନୁହେଁ): ସ୍ଥାନୀୟ ଭେକ୍ଟର୍ଗୁଡ଼ିକୁ `vec_quantize_int8(?, 'unit')` ମାଧ୍ୟମରେ ଏକ `int8[dim]` କଲମ୍ ଭାବେ ସଞ୍ଚୟ କରିବାକୁ `MEMORY_VEC_QUANTIZATION=int8` ସେଟ୍ କରନ୍ତୁ। ଚୟନିତ ମୋଡ୍କୁ `embedding_signature`ରେ (ଏକ `:int8` ସଫିକ୍ସ) ସାମିଲ କରାଯାଏ, ତେଣୁ ମୋଡ୍ ପରିବର୍ତ୍ତନ କଲେ `vec_memories` ଟେବୁଲ୍ର ସମ୍ପୂର୍ଣ୍ଣ ପୁନଃ-ଇଣ୍ଡେକ୍ସ ଆରମ୍ଭ ହୁଏ — ଏମ୍ବେଡିଂ ମଡେଲ୍ ପରିବର୍ତ୍ତନ ସମୟରେ ବ୍ୟବହୃତ ସେହି ଲେଜି-ବ୍ୟାକ୍ଫିଲ୍ ପଥ।

## ମେମୋରୀ ପ୍ରକାରଗୁଡ଼ିକ

`MemoryType` (`src/lib/memory/types.ts`):

| ପ୍ରକାର       | ବ୍ୟବହାର                                                                                  |
| ------------ | ---------------------------------------------------------------------------------------- |
| `factual`    | ପସନ୍ଦ, ସ୍ଥିର ବ୍ୟବହାରକାରୀ ତଥ୍ୟ, ଆଚରଣଗତ ଧାରା                                               |
| `episodic`   | ଏକ ନିର୍ଦ୍ଦିଷ୍ଟ ମୁହୂର୍ତ୍ତ ସହ ସମ୍ବନ୍ଧିତ ନିଷ୍ପତ୍ତି ("ମୁଁ Postgres ବାଛିଥିଲି")                |
| `procedural` | କାର୍ଯ୍ୟପ୍ରବାହ / କିପରି-କରିବେ ମେମୋରୀ (ସଂରକ୍ଷିତ; ବର୍ତ୍ତମାନ କୌଣସି ସ୍ୱୟଂଚାଳିତ ନିଷ୍କାସକ ନାହିଁ) |
| `semantic`   | ଭେକ୍ଟର୍-ଷ୍ଟୋର୍ ଏଣ୍ଟ୍ରିଗୁଡ଼ିକ ପାଇଁ ସଂରକ୍ଷିତ                                               |

`MemoryConfig` ପୁନରୁଦ୍ଧାର କୌଶଳ `exact`, `semantic`, କିମ୍ବା `hybrid` ମଧ୍ୟରୁ ଗୋଟିଏ,
ଏବଂ ପରିସର `session`, `apiKey`, କିମ୍ବା `global` ମଧ୍ୟରୁ ଗୋଟିଏ। `getMemorySettings()` ରୁ
ଡିଫଲ୍ଟ ପରିସର ହେଉଛି `apiKey`।

## ତଥ୍ୟ ନିଷ୍କାସନ (`extraction.ts`)

ନିଷ୍କାସନ **regex-ଆଧାରିତ**, LLM-ଆଧାରିତ ନୁହେଁ — ଏହା `setImmediate()` ସହିତ
ପ୍ରକ୍ରିୟା ଭିତରେ ଚାଲେ, ତେଣୁ ଏହା କେବେବି ପ୍ରତିକ୍ରିୟା ଷ୍ଟ୍ରିମ୍କୁ ଅବରୋଧ କରେନାହିଁ:

- **ପସନ୍ଦ ପ୍ୟାଟର୍ନଗୁଡ଼ିକ** → `MemoryType.FACTUAL`
  (ଉଦାହରଣସ୍ୱରୂପ `ମୁଁ … ପସନ୍ଦ କରେ`, `ମୁଁ … କୁ ବହୁତ ପସନ୍ଦ କରେ`, `ମୋର ପ୍ରିୟ ହେଉଛି …`, `ମୁଁ … କୁ ଘୃଣା କରେ`)
- **ନିଷ୍ପତ୍ତି ପ୍ୟାଟର୍ନଗୁଡ଼ିକ** → `MemoryType.EPISODIC`
  (ଉଦାହରଣସ୍ୱରୂପ `ମୁଁ … ବ୍ୟବହାର କରିବି`, `ମୁଁ … ବାଛିଲି`, `ମୁଁ … ସହିତ ଆଗକୁ ବଢ଼ିଲି`, `ମୁଁ … ଗ୍ରହଣ କରିବାକୁ ଯାଉଛି`)
- **ଆଚରଣ ପ୍ୟାଟର୍ନଗୁଡ଼ିକ** → `MemoryType.FACTUAL`
  (ଉଦାହରଣସ୍ୱରୂପ `ମୁଁ ସାଧାରଣତଃ …`, `ମୁଁ ସବୁବେଳେ …`, `ମୋର … କରିବାର ପ୍ରବୃତ୍ତି ଅଛି`)

ପ୍ରତ୍ୟେକ ମେଳକୁ ପରିଶୋଧିତ କରାଯାଏ (`trim`, ଖାଲି ସ୍ଥାନ ସଂକୋଚନ, ସର୍ବାଧିକ 500 ଅକ୍ଷରରେ ସୀମିତ),
ଏକ ସ୍ଥିର `factKey(category, content)` ମାଧ୍ୟମରେ ବ୍ୟାଚ୍ ମଧ୍ୟରେ ଡିଡୁପ୍ଲିକେଟ୍ କରାଯାଏ, ଏବଂ
`{category, extractedAt, source: "llm_response"}` ମେଟାଡାଟା ସହିତ `createMemory()` ମାଧ୍ୟମରେ
ସଂରକ୍ଷଣ କରାଯାଏ। ଇନ୍ପୁଟ୍ ପାଠ୍ୟ 64 KiB (`MAX_EXTRACTION_TEXT_LENGTH`) ରେ ସୀମିତ — ଏହାଠାରୁ ଲମ୍ବା ହେଲେ,
ପାଠ୍ୟର **ଶେଷ ଭାଗ** ବ୍ୟବହାର କରାଯାଏ, ଯାହାଦ୍ୱାରା ସବୁଠାରୁ ସାମ୍ପ୍ରତିକ ସହାୟକ ବିଷୟବସ୍ତୁ ସର୍ବଦା ସାମିଲ ହୁଏ।

`extractFactsFromText(text)` ପରୀକ୍ଷାଗୁଡ଼ିକ ପାଇଁ ଏକ୍ସପୋର୍ଟ କରାଯାଇଛି ଏବଂ ସେଗୁଡ଼ିକୁ ସଂରକ୍ଷଣ ନକରି
ସଂରଚିତ ତଥ୍ୟଗୁଡ଼ିକ ଫେରାଏ।

## ପୁନରୁଦ୍ଧାର (`retrieval.ts`)

`retrieveMemories(apiKeyId, config)` ହେଉଛି ମୁଖ୍ୟ ପ୍ରବେଶ ବିନ୍ଦୁ। ଏହା:

1. `MemoryConfigSchema` ମାଧ୍ୟମରେ କନ୍ଫିଗ୍କୁ ସାମାନ୍ୟୀକୃତ ଏବଂ ବୈଧ କରେ।
2. `enabled` false ଥିଲେ କିମ୍ବା `maxTokens <= 0` ହେଲେ ତୁରନ୍ତ `[]` ଫେରାଏ।
3. `maxTokens` କୁ `[1, 8000]` ମଧ୍ୟରେ ସୀମିତ କରେ।
4. ଆଧୁନିକ `memories` ଟେବୁଲ୍ ଅଛି କି ନାହିଁ (ଲେଗାସି `memory`
   ଟେବୁଲ୍ ତୁଳନାରେ) ଚିହ୍ନଟ କରେ, ଯାହାଦ୍ୱାରା ପୁରୁଣା ଡାଟାବେସ୍ଗୁଡ଼ିକ କାମ କରିଚାଲେ।
5. ମିଆଦ ସୁରକ୍ଷା
   (`expires_at IS NULL OR datetime(expires_at) > datetime('now')`), ବୈକଳ୍ପିକ
   ସେସନ୍ ପରିସର, ଏବଂ ବୈକଳ୍ପିକ `retentionDays` କଟଅଫ୍ ସହିତ ମୂଳ କ୍ୱେରୀ ନିର୍ମାଣ କରେ।
6. କୌଶଳ ଆଧାରରେ ଶାଖା ବାଛେ:
   - **`exact`** (ଡିଫଲ୍ଟ): କାଳକ୍ରମିକ `ORDER BY created_at DESC LIMIT 100`।
   - **`semantic`**: ଯଦି `config.query` ଏବଂ `memory_fts` ଅଛି, ତେବେ
     `memory_fts MATCH ?` ସହିତ JOIN କରେ ଏବଂ FTS ର୍ୟାଙ୍କ୍ ଅନୁସାରେ କ୍ରମବଦ୍ଧ କରେ; FTS 0ଟି ଧାଡ଼ି ଫେରାଇଲେ
     କାଳକ୍ରମିକ କ୍ରମକୁ ଫେରିଯାଏ।
   - **`hybrid`**: FTS ଫଳାଫଳ (ଉଚ୍ଚତର ପ୍ରାସଙ୍ଗିକତା) ଏବଂ
     କାଳକ୍ରମିକ ସେଟ୍ର ସଂଯୋଗ, id ଦ୍ୱାରା ଡିଡୁପ୍ଲିକେଟ୍ କରାଯାଏ।
7. ଏକ କ୍ୱେରୀ ପ୍ରଦାନ କରାଯାଇଥିଲେ `content`, `key`, ଏବଂ `metadata` JSON ଉପରେ
   ଏକ କୀୱାର୍ଡ ପ୍ରାସଙ୍ଗିକତା ସ୍କୋର୍ (`getRelevanceScore`) ଗଣନା କରେ। ଶୂନ୍ୟ ସ୍କୋର୍ ଥିବା ଧାଡ଼ିଗୁଡ଼ିକୁ
   ଛାଣି ବାହାର କରାଯାଏ।
8. ପ୍ରଥମେ ସ୍କୋର୍କୁ ଅବରୋହୀ କ୍ରମରେ, ତା’ପରେ `createdAt` କୁ ଅବରୋହୀ କ୍ରମରେ ସଜାଏ।
9. ର୍ୟାଙ୍କ୍ କରାଯାଇଥିବା ତାଲିକା ଦେଇ ଅଗ୍ରସର ହୁଏ ଏବଂ ଚାଲୁଥିବା
   `estimateTokens(content)` (≈ `length / 4`) ବଜେଟ୍ ଅତିକ୍ରମ ନକରିବା ପର୍ଯ୍ୟନ୍ତ ଏଣ୍ଟ୍ରିଗୁଡ଼ିକୁ ଗ୍ରହଣ କରେ। କୌଣସି ମେଳ ମିଳିଲେ
   ସର୍ବଦା ଅତିକମରେ ଗୋଟିଏ ଏଣ୍ଟ୍ରି ଫେରାଏ।

`estimateTokens` ଏକ୍ସପୋର୍ଟ କରାଯାଇଛି ଏବଂ ପୁନରୁଦ୍ଧାର, ସାରାଂଶକରଣ, ଏବଂ MCP
`omniroute_memory_search` ଟୁଲ୍ ଦ୍ୱାରା ବ୍ୟବହୃତ ହୁଏ।

## ଇଞ୍ଜେକ୍ସନ୍ (`injection.ts`)

`injectMemory(request, memories, provider)`:

1. ସମସ୍ତ ମେମୋରି ବିଷୟବସ୍ତୁକୁ ଏକକ `Memory context: …` ଷ୍ଟ୍ରିଙ୍ଗ୍ରେ ଯୋଡ଼େ।
2. ପ୍ରଦାନକାରୀଙ୍କ ନାମ ଅନୁଯାୟୀ ଏକ କୌଶଳ ବାଛେ:
   - **ସିଷ୍ଟମ୍ ମେସେଜ୍** (OpenAI, Anthropic, Gemini, … ପାଇଁ ଡିଫଲ୍ଟ) — ପୂର୍ବରୁ ଥିବା ଯେକୌଣସି ସିଷ୍ଟମ୍
     ମେସେଜ୍ର ଆଗରେ ଏକ `{role: "system", content: memoryText}` ଯୋଡ଼େ,
     ଯାହାଦ୍ୱାରା ବ୍ୟବହାରକାରୀଙ୍କ ସିଷ୍ଟମ୍ ପ୍ରମ୍ପ୍ଟଗୁଡ଼ିକର ପ୍ରାଥମିକତା ବଜାୟ ରହେ।
   - **ବ୍ୟବହାରକାରୀ ମେସେଜ୍** (ଫଲ୍ବ୍ୟାକ୍) — `PROVIDERS_WITHOUT_SYSTEM_MESSAGE`ରେ ଥିବା
     ପ୍ରଦାନକାରୀମାନଙ୍କ ପାଇଁ: `o1`, `o1-mini`, `o1-preview`,
     `glm`, `glmt`, `glm-cn`, `zai`, `qianfan`। ଏଗୁଡ଼ିକ ସିଷ୍ଟମ୍ ଭୂମିକାକୁ
     ପ୍ରତ୍ୟାଖ୍ୟାନ କରନ୍ତି ଏବଂ ନଚେତ୍ 400 ଫେରାଇବେ (GLM/Zhipu ପାଇଁ issue #1701 ଦେଖନ୍ତୁ)।
3. `memory.injection.injected` ଅଧୀନରେ ସଂଖ୍ୟା, କୌଶଳ ଏବଂ ମଡେଲ୍କୁ ଲଗ୍ କରେ।

ନିଜସ୍ୱ ରାଉଟିଂ ନିଷ୍ପତ୍ତି ନେବାକୁ ଆବଶ୍ୟକ କରୁଥିବା କଲର୍ମାନଙ୍କ ପାଇଁ
`providerSupportsSystemMessage(provider)` ଏକ୍ସପୋର୍ଟ କରାଯାଇଛି। ସୁରକ୍ଷା ପାଇଁ ଅଜଣା ପ୍ରଦାନକାରୀମାନଙ୍କର ଡିଫଲ୍ଟ ମୂଲ୍ୟ `true`
(ସିଷ୍ଟମ୍ ଭୂମିକା ଅନୁମୋଦିତ) ହୋଇଥାଏ।

## ସେଟିଂସ୍ (`settings.ts`)

ମେମୋରି ବିନ୍ୟାସ env varsରେ ନୁହେଁ, **DB settings ଟେବୁଲ୍ରେ ସଂରକ୍ଷିତ ହୁଏ**।
`getMemorySettings()`ଟି `getSettings()`ରୁ ପଢ଼େ ଏବଂ ଫଳାଫଳକୁ
ପ୍ରକ୍ରିୟା ମଧ୍ୟରେ କ୍ୟାଶ୍ କରେ; ଲେଖା ସମ୍ପୂର୍ଣ୍ଣ ହେବା ପରେ settings PUT
ରୁଟ୍ ଦ୍ୱାରା `invalidateMemorySettingsCache()` କଲ୍ କରାଯାଏ।

### ପୁରୁଣା ଫିଲ୍ଡଗୁଡ଼ିକ (ସମସ୍ତ ସଂସ୍କରଣ)

| DB କୀ                 | ପ୍ରକାର  | ଡିଫଲ୍ଟ                                                   | UI ନିୟନ୍ତ୍ରଣ                                               |
| --------------------- | ------- | -------------------------------------------------------- | ---------------------------------------------------------- |
| `memoryEnabled`       | boolean | `false` (v3.8.30ଠାରୁ ଡିଫଲ୍ଟ ଭାବେ ବନ୍ଦ)                   | ମେମୋରି ଚାଲୁ/ବନ୍ଦ                                           |
| `memoryMaxTokens`     | integer | `2000` (ପରିସର `0–16000`)                                 | ଇଞ୍ଜେକ୍ସନ୍ ପାଇଁ ଟୋକନ୍ ବଜେଟ୍                                |
| `memoryRetentionDays` | integer | `30` (ପରିସର `1–365`)                                     | ଧାରଣ ଅବଧି                                                  |
| `memoryStrategy`      | enum    | `"hybrid"` (`recent`, `semantic`, `hybrid` ମଧ୍ୟରୁ ଗୋଟିଏ) | ପୁନରୁଦ୍ଧାର କୌଶଳ                                            |
| `skillsEnabled`       | boolean | `false`                                                  | ପ୍ରତି-କୀ ଦକ୍ଷତା ଇଞ୍ଜେକ୍ସନ୍କୁ ଟୋଗଲ୍ କରେ (SKILLS.md ଦେଖନ୍ତୁ) |

ଟିପ୍ପଣୀ: UI କୌଶଳ `"recent"`ଟି `toMemoryRetrievalConfig()` ମାଧ୍ୟମରେ ଆଭ୍ୟନ୍ତରୀଣ `"exact"` ପୁନରୁଦ୍ଧାର
କୌଶଳ ସହିତ ମ୍ୟାପ୍ ହୁଏ (କାଳକ୍ରମିକ କ୍ରମ)।

### ନୂତନ ଫିଲ୍ଡଗୁଡ଼ିକ (v3.8.6, ପ୍ଲାନ୍ 21 D9)

ଫିଲ୍ଡ ବିବରଣୀ ପାଇଁ ଉପରେ ଥିବା "Settings extension" ବିଭାଗ ମଧ୍ୟ ଦେଖନ୍ତୁ।

| DB କୀ                       | API ଫିଲ୍ଡ                | ଡିଫଲ୍ଟ   |
| --------------------------- | ------------------------ | -------- |
| `memoryEmbeddingSource`     | `embeddingSource`        | `"auto"` |
| `memoryEmbeddingModel`      | `embeddingProviderModel` | `null`   |
| `memoryTransformersEnabled` | `transformersEnabled`    | `false`  |
| `memoryStaticEnabled`       | `staticEnabled`          | `false`  |
| `memoryRerankEnabled`       | `rerankEnabled`          | `false`  |
| `memoryRerankModel`         | `rerankProviderModel`    | `null`   |
| `memoryVectorStore`         | `vectorStore`            | `"auto"` |

Qdrant-ସମ୍ବନ୍ଧିତ DB କୀଗୁଡ଼ିକ (`qdrantEnabled`, `qdrantHost`, `qdrantPort`,
`qdrantApiKey`, `qdrantCollection` ଡିଫଲ୍ଟ `"omniroute_memory"`,
`qdrantEmbeddingModel` ଡିଫଲ୍ଟ `"openai/text-embedding-3-small"`) `qdrant.ts`ରେ ଥିବା
`normalizeQdrantConfig()` ଦ୍ୱାରା ପଢ଼ାଯାଏ।

### ପରିବେଶ ଭେରିଏବଲ୍ଗୁଡ଼ିକ (v3.8.6)

ଇଞ୍ଜିନ୍ର ରନ୍ଟାଇମ୍ ଆଚରଣକୁ ସମନ୍ୱୟ କରିବା ପାଇଁ ଛଅଟି ଇଚ୍ଛାଧୀନ env vars ରହିଛି (`.env.example`ରେ ଲିପିବଦ୍ଧ):

| ଭେରିଏବଲ୍                        | ଡିଫଲ୍ଟ                     | ବିବରଣୀ                                                                                                                                                        |
| ------------------------------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `MEMORY_EMBEDDING_CACHE_TTL_MS` | `300000`                   | ଏମ୍ବେଡିଂ କ୍ୟାଶ୍ TTL (5 ମିନିଟ୍)                                                                                                                                |
| `MEMORY_EMBEDDING_CACHE_MAX`    | `1000`                     | ଏମ୍ବେଡିଂ LRU କ୍ୟାଶ୍ରେ ସର୍ବାଧିକ ଏଣ୍ଟ୍ରି                                                                                                                        |
| `MEMORY_TRANSFORMERS_MODEL`     | `Xenova/all-MiniLM-L6-v2`  | Transformers.js ମଡେଲ୍ ପାଇଁ HF ରିପୋ                                                                                                                            |
| `MEMORY_STATIC_MODEL`           | `minishlab/potion-base-8M` | ସ୍ଥିର potion ମଡେଲ୍ ପାଇଁ HF ରିପୋ                                                                                                                               |
| `MEMORY_STATIC_CACHE_DIR`       | `<DATA_DIR>/embeddings`    | ଡାଉନଲୋଡ୍ ହୋଇଥିବା ମଡେଲ୍ଗୁଡ଼ିକ କେଉଁଠାରେ ସଂରକ୍ଷଣ କରାଯିବ                                                                                                          |
| `MEMORY_VEC_TOP_K`              | `20`                       | ଭେକ୍ଟର୍ ସନ୍ଧାନ ପାଇଁ ଡିଫଲ୍ଟ top-K                                                                                                                              |
| `MEMORY_RRF_K`                  | `60`                       | ହାଇବ୍ରିଡ୍ ସନ୍ଧାନ ପାଇଁ RRF k ଧ୍ରୁବକ                                                                                                                            |
| `MEMORY_VEC_QUANTIZATION`       | `none`                     | ସ୍ଥାନୀୟ sqlite-vec ଭେକ୍ଟର୍ଗୁଡ଼ିକୁ କ୍ୱାଣ୍ଟାଇଜ୍ ଭାବେ ସଂରକ୍ଷଣ କରିବା ପାଇଁ `int8`ରେ ସେଟ୍ କରନ୍ତୁ (~4× ଛୋଟ; ଅପ୍ଟ-ଇନ୍)। ମୋଡ୍ ପରିବର୍ତ୍ତନ ଏକ ପୁନଃ-ଇଣ୍ଡେକ୍ସକୁ ବାଧ୍ୟ କରେ। |

## ସାରାଂଶକରଣ (`summarization.ts`)

କୌଣସି କୀର ମେମୋରିଗୁଡ଼ିକର ଚାଲୁଥିବା ମୋଟ ଟୋକେନ୍ ବଜେଟ୍ ଅତିକ୍ରମ କଲେ, `summarizeMemories(apiKeyId, sessionId?, maxTokens = 4000)` ପୁରୁଣା ବିଷୟବସ୍ତୁକୁ ସଂକ୍ଷିପ୍ତ କରେ। ଏହା `created_at` ଅନୁସାରେ DESC କ୍ରମରେ ଧାଡ଼ିଗୁଡ଼ିକ ମଧ୍ୟରେ ପୁନରାବୃତ୍ତି କରେ, ସ୍ଥାନ ହେଉଥିବା ଧାଡ଼ିଗୁଡ଼ିକୁ ରଖେ, ଏବଂ ଅବଶିଷ୍ଟ ଧାଡ଼ିଗୁଡ଼ିକର `content`କୁ ସେହି ସ୍ଥାନରେ ମୂଳ ବିଷୟବସ୍ତୁର ପ୍ରଥମ ତିନୋଟି ବାକ୍ୟ ସହିତ ପ୍ରତିସ୍ଥାପିତ କରେ। `tokensSaved` ହେଉଛି ପୁରୁଣା ଏବଂ ନୂତନ ବିଷୟବସ୍ତୁ ମଧ୍ୟରେ `estimateTokens`ର ପାର୍ଥକ୍ୟ।

ଏହି ରୁଟିନ୍ଟି ବର୍ତ୍ତମାନର ଚାଟ୍ ପାଇପଲାଇନ୍ରେ **ଉପଲବ୍ଧ, କିନ୍ତୁ ସ୍ୱୟଂଚାଳିତ ଭାବରେ କଲ୍ କରାଯାଏ ନାହିଁ** — ଯଦି ଆପଣଙ୍କୁ ନିରନ୍ତର ସଂକ୍ଷିପ୍ତକରଣ ଆବଶ୍ୟକ, ତେବେ ଏହାକୁ cron, ଏକ ଆଡ୍ମିନ୍ କାର୍ଯ୍ୟ, କିମ୍ବା `MemoryConfig.autoSummarize` ଗ୍ଲୁରୁ କଲ୍ କରନ୍ତୁ। ଡାଟା ହାନି ଏକମୁଖୀ: ମୂଳ ଟେକ୍ସଟ୍ ଓଭରରାଇଟ୍ ହୋଇଯାଏ।

## REST API

ସମସ୍ତ ଏଣ୍ଡପଏଣ୍ଟ ପାଇଁ ପରିଚାଳନା ପ୍ରମାଣୀକରଣ (`requireManagementAuth`) ଆବଶ୍ୟକ।

### ମୁଖ୍ୟ ମେମୋରି ଏଣ୍ଡପଏଣ୍ଟଗୁଡ଼ିକ (ବିଦ୍ୟମାନ + ଅଦ୍ୟତନ)

| ପଦ୍ଧତି   | ପଥ                   | ବର୍ଣ୍ଣନା                                                                                                                                                                                           |
| -------- | -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `GET`    | `/api/memory`        | ଫିଲ୍ଟର୍ଗୁଡ଼ିକ ସହିତ ପୃଷ୍ଠାଙ୍କିତ ତାଲିକା: `apiKeyId`, `type`, `sessionId`, `q`, `limit`, `page`, `offset`। ପ୍ରତିକ୍ରିୟାରେ `stats.total`, `stats.tokensUsed`, `stats.hitRate`, `cacheStats` ଅନ୍ତର୍ଭୁକ୍ତ |
| `POST`   | `/api/memory`        | ଏଣ୍ଟ୍ରି ତିଆରି କରେ (Zod-ବୈଧୀକୃତ: `content`, `key`, ବୈକଳ୍ପିକ `type`, `sessionId`, `apiKeyId`, `metadata`, `expiresAt`)। `(apiKeyId, key)` ଉପରେ ଅପସର୍ଟ କରୁଥିବା `createMemory()`କୁ କଲ୍ କରେ             |
| `GET`    | `/api/memory/[id]`   | UUID ଦ୍ୱାରା ଗୋଟିଏ ଏଣ୍ଟ୍ରି ଆଣେ                                                                                                                                                                      |
| `PUT`    | `/api/memory/[id]`   | ଏଣ୍ଟ୍ରି ଫିଲ୍ଡଗୁଡ଼ିକ (`type`, `key`, `content`, `metadata`) ଅଦ୍ୟତନ କରେ। ବଡି: `MemoryUpdatePutSchema`। ଏମ୍ବେଡିଂ ଉତ୍ସ ଉପଲବ୍ଧ ଥିଲେ ଭେକ୍ଟରକୁ ମଧ୍ୟ ସିଙ୍କ୍ କରେ।                                           |
| `DELETE` | `/api/memory/[id]`   | ଗୋଟିଏ ଏଣ୍ଟ୍ରି ବିଲୋପ କରେ; `vec_memories` (D15) ଏବଂ ସର୍ବୋତ୍ତମ ପ୍ରୟାସରେ Qdrantରୁ ମଧ୍ୟ ବିଲୋପ କରେ। ନ ମିଳିଲେ 404 ଫେରାଏ।                                                                                  |
| `GET`    | `/api/memory/health` | `verifyExtractionPipeline("health-check")` ଚଲାଏ — ରାଉଣ୍ଡ-ଟ୍ରିପ୍ ତିଆରି→ତାଲିକା→ବିଲୋପ। `{working, latencyMs, error?}` ଫେରାଏ                                                                           |

### ନୂତନ ମେମୋରି ଇଞ୍ଜିନ୍ ଏଣ୍ଡପଏଣ୍ଟଗୁଡ଼ିକ (ଯୋଜନା 21)

| ପଦ୍ଧତି | ପଥ                                | ବର୍ଣ୍ଣନା                                                                                                                                                               |
| ------ | --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `POST` | `/api/memory/retrieve-preview`    | `retrieveMemories`ର ଡ୍ରାଇ-ରନ୍ — ସ୍କୋର୍, ସ୍ତର ଏବଂ ଟୋକେନ୍ ସହିତ କ୍ରମାଙ୍କିତ ଫଳାଫଳ ଫେରାଏ। ବଡି: `RetrievePreviewSchema`। ମେମୋରିଗୁଡ଼ିକୁ ଇଞ୍ଜେକ୍ଟ କିମ୍ବା ପରିବର୍ତ୍ତନ କରେ ନାହିଁ। |
| `GET`  | `/api/memory/embedding-providers` | ଏମ୍ବେଡିଂ ମଡେଲ୍ଗୁଡ଼ିକ ସହିତ ପ୍ରଦାନକାରୀମାନଙ୍କୁ ତାଲିକାଭୁକ୍ତ କରେ ଏବଂ କେଉଁଗୁଡ଼ିକ ପାଇଁ API କୀ ବିନ୍ୟାସିତ ଅଛି ତାହା ସୂଚାଏ।                                                       |
| `GET`  | `/api/memory/engine-status`       | ସମ୍ପୂର୍ଣ୍ଣ ଇଞ୍ଜିନ୍ ସ୍ଥିତି ଫେରାଏ: କୀୱାର୍ଡ ସ୍ତର, ଏମ୍ବେଡିଂ ରିଜୋଲ୍ୟୁସନ୍, ଭେକ୍ଟର ଷ୍ଟୋର୍ ପରିସଂଖ୍ୟାନ, Qdrant ସ୍ୱାସ୍ଥ୍ୟ, ରିର୍ୟାଙ୍କ ବିନ୍ୟାସ। ଆକୃତି: `MemoryEngineStatusSchema`। |
| `POST` | `/api/memory/summarize`           | ମେମୋରି ସଂକ୍ଷିପ୍ତକରଣକୁ ମାନୁଆଲ୍ ଭାବରେ ଟ୍ରିଗର୍ କରେ। ବଡି: `MemorySummarizeSchema` (`olderThanDays`, `apiKeyId?`, `dryRun`)। `{candidates, tokensSaved}` ଫେରାଏ।             |
| `POST` | `/api/memory/reindex`             | `needs_reindex=1` ଥିବା ମେମୋରିଗୁଡ଼ିକ ପାଇଁ ଭେକ୍ଟର ପୁନଃସୂଚୀକରଣ ଟ୍ରିଗର୍ କରେ। ବଡି: `MemoryReindexSchema` (`force`)। `{started, pending}` ଫେରାଏ।                             |

### ସେଟିଂସ୍ ଏଣ୍ଡପଏଣ୍ଟଗୁଡ଼ିକ

| ପଦ୍ଧତି | ପଥ                                      | ବର୍ଣ୍ଣନା                                                                                                  |
| ------ | --------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| `GET`  | `/api/settings/memory`                  | ବର୍ତ୍ତମାନର ସାମାନ୍ୟୀକୃତ `MemorySettingsExtended` (7ଟି ନୂତନ ଫିଲ୍ଡ + ପୁରୁଣା)                                 |
| `PUT`  | `/api/settings/memory`                  | `MemorySettingsExtendedSchema`ରୁ ଯେକୌଣସି ଫିଲ୍ଡ ଅଦ୍ୟତନ କରେ (ମୋଟ 12ଟି ଫିଲ୍ଡ)                                |
| `GET`  | `/api/settings/qdrant`                  | ବର୍ତ୍ତମାନର Qdrant ସେଟିଂସ୍ (`QdrantSettingsSchema`)                                                        |
| `PUT`  | `/api/settings/qdrant`                  | Qdrant ସେଟିଂସ୍ ଅଦ୍ୟତନ କରେ। ବଡି: `QdrantSettingsUpdateSchema`। `apiKey` = ଖାଲି ଷ୍ଟ୍ରିଙ୍ଗ୍ କୀକୁ ଅପସାରଣ କରେ। |
| `GET`  | `/api/settings/qdrant/health`           | ବିନ୍ୟାସିତ Qdrant ଇନ୍ଷ୍ଟାନ୍ସ ବିରୁଦ୍ଧରେ ସଜୀବତା ଯାଞ୍ଚ। `QdrantHealthResultSchema` ଫେରାଏ।                     |
| `POST` | `/api/settings/qdrant/search`           | Qdrant ବିରୁଦ୍ଧରେ ସେମାଣ୍ଟିକ୍ ସନ୍ଧାନ ପରୀକ୍ଷା। ବଡି: `QdrantSearchSchema` (`query`, `topK`)।                  |
| `POST` | `/api/settings/qdrant/cleanup`          | ମেয়ାଦୋତ୍ତୀର୍ଣ୍ଣ / ପୁରୁଣା ମେମୋରିଗୁଡ଼ିକ ପାଇଁ Qdrant ପଏଣ୍ଟଗୁଡ଼ିକ ଅପସାରଣ କରେ।                                |
| `GET`  | `/api/settings/qdrant/embedding-models` | Qdrant ପାଇଁ ଉପଲବ୍ଧ ଏମ୍ବେଡିଂ ମଡେଲ୍ଗୁଡ଼ିକୁ ତାଲିକାଭୁକ୍ତ କରେ।                                                 |

`/api/memory` ତାଲିକା କ୍ୱେରୀ `page`-ଆଧାରିତ ପୃଷ୍ଠାଙ୍କନ (`parsePaginationParams`) **କିମ୍ବା** କଞ୍ଚା `offset`କୁ ସମର୍ଥନ କରେ — `offset` ଉପସ୍ଥିତ ଥିଲେ ଏହାକୁ ପ୍ରାଥମିକତା ଦିଆଯାଏ ଏବଂ ପ୍ରତିକ୍ରିୟା ଆକୃତି ପାଇଁ ଏକ ବ୍ୟୁତ୍ପନ୍ନ `page` ଗଣନା କରାଯାଏ।

## MCP ଟୁଲ୍ଗୁଡ଼ିକ (`open-sse/mcp-server/tools/memoryTools.ts`)

MCP ସର୍ଭର୍ ସକ୍ଷମ ଥିବାବେଳେ, ତିନୋଟି ମେମୋରି ଟୁଲ୍ ପଞ୍ଜୀକୃତ ହୁଏ:

- `omniroute_memory_search` — `{apiKeyId, query?, type?, maxTokens?, limit?}`
  → `retrieveMemories()`କୁ ରାପ୍ କରେ। v3.8.6 (D16) ଠାରୁ, `strategy`କୁ
  `"exact"` ଭାବେ ହାର୍ଡକୋଡ୍ କରିବା ପରିବର୍ତ୍ତେ `getMemorySettings()`ରୁ ପଢ଼ାଯାଏ।
  ଯଦି `query` ପ୍ରଦାନ କରାଯାଇଛି ଏବଂ `strategy` ହେଉଛି `semantic` କିମ୍ବା
  `hybrid`, ତେବେ ଉପଲବ୍ଧ ଥିଲେ ଭେକ୍ଟର୍ ଷ୍ଟୋର୍ ବ୍ୟବହାର କରାଯାଏ।
- `omniroute_memory_add` — `{apiKeyId, sessionId?, type, key, content,
metadata?}` → `createMemory()`କୁ ରାପ୍ କରେ। କେବଳ 4ଟି କାନୋନିକାଲ୍ ପ୍ରକାର
  ଗ୍ରହଣ କରେ: `factual`, `episodic`, `procedural`, `semantic` (D17)।
- `omniroute_memory_clear` — `{apiKeyId, type?, olderThan?}` → ମେଳ ଖାଉଥିବା
  ଏଣ୍ଟ୍ରିଗୁଡ଼ିକୁ ତାଲିକାଭୁକ୍ତ କରେ, ଇଚ୍ଛାନୁସାରେ ସୃଷ୍ଟି-ପୂର୍ବ ଟାଇମ୍ଷ୍ଟାମ୍ପ ଅନୁଯାୟୀ
  ଫିଲ୍ଟର୍ କରେ, ତାପରେ `deleteMemory()` ମାଧ୍ୟମରେ ପ୍ରତ୍ୟେକଟିକୁ ବିଲୋପ କରେ
  (ଯାହା sqlite-vec + Qdrantରୁ ଭେକ୍ଟର୍ଗୁଡ଼ିକୁ ମଧ୍ୟ ହଟାଏ)।

ଟ୍ରାନ୍ସପୋର୍ଟ ଏବଂ ସ୍କୋପ୍ ବିବରଣୀ ପାଇଁ [MCP-SERVER.md](./MCP-SERVER.md) ଦେଖନ୍ତୁ।

## ଡ୍ୟାସ୍ବୋର୍ଡ୍ (ମେମୋରି ଷ୍ଟୁଡିଓ)

`src/app/(dashboard)/dashboard/memory/page.tsx` ବର୍ତ୍ତମାନ ଏକ **3-ଟ୍ୟାବ୍ ଷ୍ଟୁଡିଓ**:

### ଟ୍ୟାବ୍: ମେମୋରିଗୁଡ଼ିକ

- ଧାରଣା କାର୍ଡ୍ (ସଂକୁଚିତ କରିହେବା ଯୋଗ୍ୟ "ଏହା କିପରି କାମ କରେ" ବ୍ୟାଖ୍ୟା)।
- ରିଅଲ୍-ଟାଇମ୍ ତାଲିକା, ସନ୍ଧାନ ଏବଂ ପୃଷ୍ଠାଙ୍କନ (300 ms ଡିବାଉନ୍ସ୍ ସହିତ)।
- ପ୍ରକାର ଫିଲ୍ଟର୍ (`factual` / `episodic` / `procedural` / `semantic` / ସମସ୍ତ)।
- ମେମୋରି-ଯୋଗ ମୋଡାଲ୍ (କୀ, ବିଷୟବସ୍ତୁ, ପ୍ରକାର)।
- ଇନ୍ଲାଇନ୍ ସମ୍ପାଦନା (ପେନ୍ସିଲ୍ ବଟନ୍ → `PUT /api/memory/[id]`)।
- ପ୍ରତ୍ୟେକ ଧାଡ଼ି ପାଇଁ ବିଲୋପ (ନିଶ୍ଚିତକରଣ ଡାୟଲଗ୍ ସହିତ)।
- ବର୍ତ୍ତମାନ ପୃଷ୍ଠାର JSON ରପ୍ତାନି; ଫାଇଲ୍ ପିକର୍ ମାଧ୍ୟମରେ JSON ଆମଦାନି।
- ପରିସଂଖ୍ୟାନ କାର୍ଡ୍ଗୁଡ଼ିକ: `totalEntries`, `tokensUsed`, `hitRate`।
- "ପୁରୁଣାଗୁଡ଼ିକୁ ସଂକ୍ଷିପ୍ତ କରନ୍ତୁ" ବଟନ୍ → `POST /api/memory/summarize` (ଡ୍ରାଇ-ରନ୍ ପ୍ରଥମେ
  ପ୍ରାର୍ଥୀ ସଂଖ୍ୟା ଦେଖାଏ, ତାପରେ ନିଶ୍ଚିତ କରେ)।
- `GET /api/memory/health` ଦ୍ୱାରା ପରିଚାଳିତ ଏକ ସବୁଜ/ଲାଲ୍ ସ୍ୱାସ୍ଥ୍ୟ ସୂଚକ ବିନ୍ଦୁ।

### ଟ୍ୟାବ୍: ପ୍ଲେଗ୍ରାଉଣ୍ଡ୍

- କ୍ୱେରୀ ଇନ୍ପୁଟ୍ + କୌଶଳ ଚୟନକାରୀ (ସଠିକ୍ / ସେମାଣ୍ଟିକ୍ / ହାଇବ୍ରିଡ୍) + ଟୋକନ୍ ବଜେଟ୍।
- "ଅନୁକରଣ କରନ୍ତୁ" → `POST /api/memory/retrieve-preview` — `score`, `tier`,
  `tokens`, `vecScore`, `ftsScore` ସହିତ କ୍ରମାଙ୍କିତ ଫଳାଫଳ ଦେଖାଏ।
- କେଉଁ ଏମ୍ବେଡିଂ ସୋର୍ସ୍ / ଭେକ୍ଟର୍ ଷ୍ଟୋର୍ ବ୍ୟବହାର କରାଯାଇଥିଲା ଏବଂ
  ଫଲ୍ବ୍ୟାକ୍ ଘଟିଥିଲା କି ନାହିଁ, ତାହା ଦେଖାଉଥିବା ରିଜୋଲ୍ୟୁସନ୍ ପ୍ୟାନେଲ୍।

### ଟ୍ୟାବ୍: ଇଞ୍ଜିନ୍

- ଇଞ୍ଜିନ୍ ସ୍ଥିତି ପ୍ୟାନେଲ୍ (କୀୱାର୍ଡ୍ FTS5 ଚିପ୍, ଏମ୍ବେଡିଂ ଚିପ୍, ଭେକ୍ଟର୍ ଷ୍ଟୋର୍ ଚିପ୍,
  Qdrant ସ୍ୱାସ୍ଥ୍ୟ ଚିପ୍, ପୁନଃ-ରାଙ୍କିଂ ଚିପ୍)।
- "ବର୍ତ୍ତମାନ ପୁନଃ-ଇଣ୍ଡେକ୍ସ କରନ୍ତୁ" ବଟନ୍ → `POST /api/memory/reindex`।
- ଏମ୍ବେଡିଂ ସୋର୍ସ୍ ଚୟନକାରୀ (ସ୍ୱୟଂଚାଳିତ / ରିମୋଟ୍ / ସ୍ଥିର / ଟ୍ରାନ୍ସଫର୍ମର୍ସ୍ + ଟଗଲ୍ଗୁଡ଼ିକ)।
- Qdrant ବିନ୍ୟାସ କାର୍ଡ୍ (ସକ୍ଷମ ଟଗଲ୍, ହୋଷ୍ଟ୍/ପୋର୍ଟ୍/କଲେକ୍ସନ୍/କୀ, ସଂଯୋଗ ପରୀକ୍ଷା,
  ସେମାଣ୍ଟିକ୍ ସନ୍ଧାନ ପରୀକ୍ଷା, ପରିଷ୍କାରକରଣ)।
- ପୁନଃ-ରାଙ୍କିଂ ବିନ୍ୟାସ କାର୍ଡ୍ (ସକ୍ଷମ ଟଗଲ୍, ପ୍ରଦାନକାରୀ/ମଡେଲ୍ ଚୟନକାରୀ)।

ପୁରୁଣା/ବିଶ୍ୱସ୍ତରୀୟ ସେଟିଂସ୍ ପୃଷ୍ଠ ପାଇଁ ମେମୋରି ଏବଂ Qdrant ସେଟିଂସ୍
`/dashboard/settings → ମେମୋରି ଏବଂ ଦକ୍ଷତାଗୁଡ଼ିକ` (`MemorySkillsTab.tsx`) ଅଧୀନରେ
ମଧ୍ୟ ଉପଲବ୍ଧ।

## କ୍ୟାଶିଂ

`src/lib/memory/store.ts`, `getMemory(id)` ପଠନ ପାଇଁ ଏକ ଇନ୍-ପ୍ରୋସେସ୍ LRU-ସଦୃଶ କ୍ୟାଶ୍
(`MEMORY_CACHE_TTL = 1 min`, `MEMORY_MAX_CACHE_SIZE = 500`, 20 %
ସର୍ବପୁରାତନ ଏଭିକ୍ସନ୍ ସହିତ) ରଖେ, ଏହା ସହିତ ଏକ ସାଧାରଣ କୀ/ମୂଲ୍ୟ
`memoryCache` ସ୍ତର (`src/lib/memory/cache.ts`) ମଧ୍ୟ ରହିଛି, ଯାହାର `get`/`set`/`invalidate`
ପଦ୍ଧତିଗୁଡ଼ିକୁ ନିଜସ୍ୱ ସ୍କୋପ୍ କ୍ୟାଶ୍ ଚାହୁଁଥିବା କଲର୍ମାନେ ବ୍ୟବହାର କରନ୍ତି (1 000-ଏଣ୍ଟ୍ରି LRU,
ଡିଫଲ୍ଟ TTL 5 min)।

## ଗୋପନୀୟତା ଏବଂ ଜୀବନଚକ୍ର

- ମେମୋରିର ମାଲିକାନା API କୀ ID (`chatCore.ts`ରେ `resolveMemoryOwnerId`) ଉପରେ ନିର୍ଭରଶୀଳ। `apiKeyInfo.id` ବିନା ପୁନରୁଦ୍ଧାର, ଇଞ୍ଜେକ୍ସନ୍ କିମ୍ବା ନିଷ୍କାସନ—କୌଣସିଟି ଚାଲେ ନାହିଁ।
- ଭବିଷ୍ୟତର `expires_at` ଥିବା ଏଣ୍ଟ୍ରିଗୁଡ଼ିକୁ ପୁନରୁଦ୍ଧାରରୁ ଫିଲ୍ଟର୍ କରାଯାଏ; `retentionDays`ଠାରୁ ପୁରୁଣା ଏଣ୍ଟ୍ରିଗୁଡ଼ିକୁ `retrieveMemories`ର `created_at >= cutoff` ଧାରା ଦ୍ୱାରା ବାଦ ଦିଆଯାଏ।
- ସ୍ଥାୟୀ ବିଲୋପ ପାଇଁ `DELETE /api/memory/[id]` କିମ୍ବା `omniroute_memory_clear` ବ୍ୟବହାର କରନ୍ତୁ।
- ନିଷ୍କାସନ `setImmediate` ମାଧ୍ୟମରେ ଫାୟର୍-ଆଣ୍ଡ୍-ଫର୍ଗେଟ୍ ଭାବେ ଚାଲେ; ବିଫଳତାଗୁଡ଼ିକ `memory.extraction.background.failed` ଅଧୀନରେ ଲଗ୍ କରାଯାଏ ଏବଂ କଲର୍ଙ୍କୁ କେବେ ମଧ୍ୟ ଦେଖାଯାଏ ନାହିଁ।
- ଯାଞ୍ଚ ରାଉଣ୍ଡ-ଟ୍ରିପ୍ଗୁଡ଼ିକ (`verifyExtractionPipeline`) ଏକ `finally` ବ୍ଲକ୍ରେ ନିଜର ପରୀକ୍ଷଣ ଏଣ୍ଟ୍ରିଗୁଡ଼ିକୁ ସଫା କରନ୍ତି।

## ଏହା ମଧ୍ୟ ଦେଖନ୍ତୁ

- [SKILLS.md](./SKILLS.md) — `skillsEnabled` ସେଟିଂ ମେମୋରି ସହିତ ଟୁଲ୍ ସଂଜ୍ଞାଗୁଡ଼ିକୁ ଇଞ୍ଜେକ୍ଟ କରେ।
- [MCP-SERVER.md](./MCP-SERVER.md) — MCP ପରିବହନ / ସ୍କୋପ୍ଗୁଡ଼ିକ।
- [API_REFERENCE.md](../reference/API_REFERENCE.md) — ବ୍ୟାପକ API ପୃଷ୍ଠଭାଗ।
- ଉତ୍ସ ମଡ୍ୟୁଲ୍ଗୁଡ଼ିକ:
  - `src/lib/memory/types.ts`, `schemas.ts`
  - `src/lib/memory/store.ts`, `retrieval.ts`, `injection.ts`, `reindex.ts`
  - `src/lib/memory/extraction.ts`, `summarization.ts`, `verify.ts`
  - `src/lib/memory/settings.ts`, `qdrant.ts`, `cache.ts`
  - `src/lib/memory/vectorStore.ts` — sqlite-vec + ହାଇବ୍ରିଡ୍ RRF
  - `src/lib/memory/embedding/index.ts` — ବହୁ-ଉତ୍ସ ଏମ୍ବେଡିଂ ସ୍ତର
  - `src/lib/memory/embedding/types.ts`, `remote.ts`, `staticPotion.ts`,
    `transformersLocal.ts`, `cache.ts`
  - `src/shared/schemas/memory.ts` — ସମସ୍ତ ମେମୋରି API ବଡି ପାଇଁ Zod ସ୍କିମା
  - `src/shared/schemas/qdrant.ts` — Qdrant ସେଟିଂ/ଅପରେସନ୍ ପାଇଁ Zod ସ୍କିମା
  - `src/lib/db/memoryVec.ts` — `memory_vec_meta` ପାଇଁ CRUD
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
  - `src/app/api/settings/qdrant/route.ts` + ଉପ-ରୁଟ୍ଗୁଡ଼ିକ
  - `src/app/(dashboard)/dashboard/memory/` — Studio UI (ପୃଷ୍ଠା + କମ୍ପୋନେଣ୍ଟ୍ +
    ଟ୍ୟାବ୍ + ହୁକ୍)
  - `open-sse/handlers/chatCore.ts` (ଇଞ୍ଜେକ୍ସନ୍ / ନିଷ୍କାସନ ୱାୟରିଂ)
  - `open-sse/mcp-server/tools/memoryTools.ts`

---

## ଏକ ଏମ୍ବେଡିଂ ପ୍ରଦାନକାରୀ ବାଛିବା (v3.8.16+)

OmniRouteର ମେମୋରି ଇଞ୍ଜିନ୍ **ଚାରିଟି ଏମ୍ବେଡିଂ ଉତ୍ସ** (`src/lib/memory/embedding/`) ସମର୍ଥନ କରେ। ପ୍ରତ୍ୟେକର **ବିଳମ୍ବ, ମୂଲ୍ୟ, ମଡେଲ୍ ଗୁଣବତ୍ତା ଏବଂ ସେଟଅପ୍ ଜଟିଳତା** ସମ୍ପର୍କିତ ଭିନ୍ନ ଲାଭ-କ୍ଷତି ରହିଛି।

### ଏମ୍ବେଡିଂ ଉତ୍ସଗୁଡ଼ିକ

| ପ୍ରଦାନକାରୀ     | ଉତ୍ସ                                             | ବିଳମ୍ବ                                | ମୂଲ୍ୟ               | ଗୁଣବତ୍ତା                                    | ସେଟଅପ୍                                       |
| -------------- | ------------------------------------------------ | ------------------------------------- | ------------------- | ------------------------------------------- | -------------------------------------------- |
| `transformers` | ସ୍ଥାନୀୟ ONNX ମଡେଲ୍ (Xenova/all-MiniLM-L6-v2)     | ~50-150ms (CPU)                       | ମାଗଣା               | ଭଲ                                          | କେବଳ `npm install`                           |
| `static`       | ପୂର୍ବରୁ ଗଣନା କରାଯାଇଥିବା ଭେକ୍ଟର୍ (କ୍ୟାଶ୍ ହୋଇଥିବା) | <1ms                                  | ମାଗଣା               | ପ୍ରଯୁଜ୍ୟ ନୁହେଁ (କ୍ୟାଶ୍ ହିଟ୍ ଉପରେ ନିର୍ଭରଶୀଳ) | କିଛି ନାହିଁ                                   |
| `remote`       | OpenAI / Cohere / Voyage API                     | ~100-300ms                            | $0.02-0.10/1M ଟୋକନ୍ | ଅତ୍ୟୁତ୍କୃଷ୍ଟ                                | API କୀ                                       |
| `auto`         | ରନ୍ଟାଇମ୍ରେ ଉପଲବ୍ଧ ସର୍ବୋତ୍ତମ ଉତ୍ସ ବାଛେ            | ବାଛିଥିବା ଉତ୍ସ ସହିତ ସମାନ               | ମାଗଣା               | ବାଛିଥିବା ଉତ୍ସ ସହିତ ସମାନ                     | କିଛି ନାହିଁ                                   |
| _(କ୍ୟାଶ୍)_     | ଯେକୌଣସି ଉତ୍ସ ଉପରେ ଇନ୍-ମେମୋରି LRU ସ୍ତର            | <1ms (ହିଟ୍), ସମ୍ପୂର୍ଣ୍ଣ ବିଳମ୍ବ (ମିସ୍) | ମାଗଣା               | ଅନ୍ତର୍ନିହିତ ଉତ୍ସ ସହିତ ସମାନ                  | ସବୁବେଳେ ସକ୍ରିୟ (ବାଛିପାରିବା ଯୋଗ୍ୟ ଉତ୍ସ ନୁହେଁ) |

### ନିଷ୍ପତ୍ତି ବୃକ୍ଷ

```
                  ଆପଣଙ୍କର ଡିପ୍ଲୟମେଣ୍ଟ ପ୍ରସଙ୍ଗ କ’ଣ?
                  │
      ┌───────────┼───────────┬──────────────┐
      │           │           │              │
  DEV/TEST    କ୍ଷୁଦ୍ର PROD   ବୃହତ୍ PROD    EDGE / ଅଫଲାଇନ୍
      │           │           │              │
      ▼           ▼           ▼              ▼
  transformers transformers remote (Qdrant) transformers
  (ମାଗଣା, API ନାହିଁ)            (ସର୍ବୋତ୍ତମ ଗୁଣବତ୍ତା)   (ଇଣ୍ଟରନେଟ୍ ନାହିଁ)
      │           │           │              │
      └────────┬──┴───────────┴──────────────┘
               │
               ▼
            ସବୁବେଳେ ଉପରେ `cache` ସ୍ତର ଯୋଡ଼ନ୍ତୁ
            (LruCache ଯେକୌଣସି ପ୍ରଦାନକାରୀକୁ ଆବୃତ କରେ)
```

### ଡାଟାବେସ୍ ଏବଂ API ବିନ୍ୟାସ

ମେମୋରି ଏମ୍ବେଡିଂ ବିକଳ୍ପଗୁଡ଼ିକ ପରିବେଶ ଭେରିଏବଲ୍ଗୁଡ଼ିକ ମାଧ୍ୟମରେ ନୁହେଁ, Settings API/UI ମାଧ୍ୟମରେ ବିନ୍ୟାସ କରାଯାଏ। Settings ଅଧୀନରେ ସମ୍ପର୍କିତ ସେଟିଂ ଡାଟାବେସ୍ କୀଗୁଡ଼ିକ (`src/lib/memory/settings.ts`ରେ `normalizeMemorySettings`) ହେଲା:

- `memoryEmbeddingSource`: `"transformers"` (ସ୍ଥାନୀୟ), `"remote"` (API-ଆଧାରିତ, ଯଥା OpenAI), `"static"` (ବାହ୍ୟ ଷ୍ଟୋର୍), କିମ୍ବା `"auto"`
- `memoryEmbeddingProviderModel`: ରିମୋଟ୍/ଷ୍ଟାଟିକ୍ ଉତ୍ସଗୁଡ଼ିକ ପାଇଁ ମଡେଲ୍ ପରିଚାୟକ (ଯଥା, `"text-embedding-3-small"`)
- `memoryTransformersEnabled`: `true` | `false`
- `memoryStaticEnabled`: `true` | `false`
- `memoryVectorStore`: `"sqlite-vec"`, `"qdrant"`, କିମ୍ବା `"auto"`

#### ସ୍ଥାନୀୟ ମଡେଲ୍ (`transformers`)

ସ୍ଥାନୀୟ ମଡେଲ୍ଗୁଡ଼ିକ ଚଲାଇବା ପାଇଁ ଆଭ୍ୟନ୍ତରୀଣ ଭାବେ transformers.js ବ୍ୟବହାର କରେ:

```bash
# କୋଡ୍ରେ ପଢ଼ାଯାଉଥିବା ପରିବେଶ ଭେରିଏବଲ୍ଗୁଡ଼ିକ (src/lib/memory/embedding/index.ts):
MEMORY_TRANSFORMERS_MODEL=Xenova/all-MiniLM-L6-v2  # HF ମଡେଲ୍ ରିପୋ
MEMORY_STATIC_MODEL=minishlab/potion-base-8M       # HF ଷ୍ଟାଟିକ୍ ପୋସନ୍ ମଡେଲ୍
MEMORY_STATIC_CACHE_DIR=<DATA_DIR>/embeddings      # କ୍ୟାଶ୍ ଡିରେକ୍ଟୋରି
```

#### LRU ଏମ୍ବେଡିଂ କ୍ୟାଶ୍

କ୍ୟାଶ୍ ଡିଫଲ୍ଟ ଭାବେ ସବୁବେଳେ ସକ୍ରିୟ ଥାଏ ଏବଂ ପରିବେଶ ଭେରିଏବଲ୍ଗୁଡ଼ିକ ମାଧ୍ୟମରେ ବିନ୍ୟାସ କରାଯାଏ:

```bash
MEMORY_EMBEDDING_CACHE_MAX=1000                    # ସର୍ବାଧିକ କ୍ୟାଶ୍ ହୋଇଥିବା ଆଇଟମ୍
MEMORY_EMBEDDING_CACHE_TTL_MS=300000               # TTL (5 ମିନିଟ୍)
```

### କାର୍ଯ୍ୟଦକ୍ଷତା ସଂଖ୍ୟାଗୁଡ଼ିକ

ଏକ ସାଧାରଣ 4-core x86 ସର୍ଭର୍ରେ ବେଞ୍ଚମାର୍କ (ପ୍ରତ୍ୟେକ ଟେକ୍ସଟ୍ରେ ~100 ଟୋକନ୍):

| ପ୍ରଦାନକାରୀ           | p50   | p95   | p99   | 1M ଏମ୍ବେଡିଂ ପିଛା ଖର୍ଚ୍ଚ            |
| -------------------- | ----- | ----- | ----- | ---------------------------------- |
| `transformers` (CPU) | 80ms  | 180ms | 350ms | ମାଗଣା                              |
| `remote` (OpenAI)    | 120ms | 220ms | 400ms | ~$0.02 (ada-002) / $0.13 (3-large) |
| `static` (Qdrant)    | 15ms  | 30ms  | 60ms  | Qdrant ହୋଷ୍ଟିଂ ଉପରେ ନିର୍ଭରଶୀଳ      |
| `cache` (ହିଟ୍)       | <1ms  | <1ms  | 2ms   | ମାଗଣା                              |

---

## ତଥ୍ୟ ନିଷ୍କାଷଣ ପ୍ୟାଟର୍ନଗୁଡ଼ିକ (v3.8.16+)

`extraction.ts` ମଡ୍ୟୁଲ୍ (`src/lib/memory/extraction.ts`) କଥୋପକଥନ ସନ୍ଦେଶଗୁଡ଼ିକରୁ ସଂରଚିତ ତଥ୍ୟ ନିଷ୍କାଷଣ କରିବା ପାଇଁ **regex ପ୍ୟାଟର୍ନ ମେଳକ** ବ୍ୟବହାର କରେ। ଏହି ପ୍ୟାଟର୍ନଗୁଡ଼ିକୁ ବୁଝିବା ଆପଣଙ୍କ ବ୍ୟବହାର କ୍ଷେତ୍ର ପାଇଁ ନିଷ୍କାଷଣ ଗୁଣବତ୍ତା ସମନ୍ୱୟ କରିବାରେ ସାହାଯ୍ୟ କରେ।

### ଡିଫଲ୍ଟ ପ୍ୟାଟର୍ନ ବର୍ଗଗୁଡ଼ିକ

| ବର୍ଗ                | ଉଦାହରଣ ପ୍ୟାଟର୍ନ                                                                   | ଯାହା କ୍ୟାପ୍ଚର୍ କରେ                  |
| ------------------- | --------------------------------------------------------------------------------- | ----------------------------------- |
| PREFERENCE_PATTERNS | `"ମୁଁ <X> ପସନ୍ଦ କରେ"`, `"ମୋତେ <X> ଭଲ ଲାଗେ"`, `"ମୁଁ <X>କୁ ଘୃଣା କରେ"`               | ବ୍ୟବହାରକାରୀଙ୍କ ପସନ୍ଦ                |
| DECISION_PATTERNS   | `"ମୁଁ <X> ବ୍ୟବହାର କରିବି"`, `"ମୁଁ <X> କରିବାକୁ ନିଷ୍ପତ୍ତି ନେଲି"`, `"ମୁଁ <X> ବାଛିଲି"` | ବ୍ୟବହାରକାରୀଙ୍କ ନିଷ୍ପତ୍ତି (ଘଟଣାମୂଳକ) |
| PATTERN_PATTERNS    | `"ମୁଁ ସାଧାରଣତଃ <X>"`, `"ମୁଁ ସବୁବେଳେ <X>"`, `"ମୁଁ କେବେବି <X> ନୁହେଁ"`               | ସ୍ଥାୟୀ ଆଚରଣମୂଳକ ପ୍ୟାଟର୍ନଗୁଡ଼ିକ      |

### ଉଦାହରଣ ପ୍ୟାଟର୍ନଗୁଡ଼ିକ (ସରଳୀକୃତ)

```ts
// src/lib/memory/extraction.ts ରୁ
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

### କ’ଣ ନିଷ୍କାଷିତ ହୁଏ

ଯେତେବେଳେ ଜଣେ ବ୍ୟବହାରକାରୀ କହନ୍ତି:

> "ମୁଁ TypeScript ପସନ୍ଦ କରେ। ଏହି ପ୍ରକଳ୍ପ ପାଇଁ ମୁଁ Postgres ବ୍ୟବହାର କରିବି। push କରିବା ପୂର୍ବରୁ ମୁଁ ସବୁବେଳେ commit କରେ। ମୋତେ Python ଭଲ ଲାଗେ ନାହିଁ।"
> ନିଷ୍କାଷଣ 4ଟି ସ୍ମୃତି ଉତ୍ପନ୍ନ କରେ:
>
> | କୀ                                   | ବର୍ଗ      | ପ୍ରକାର   | ବିଷୟବସ୍ତୁ                   |
> | ------------------------------------ | --------- | -------- | --------------------------- |
> | `preference:typescript`              | ପସନ୍ଦ     | ତଥ୍ୟମୂଳକ | "TypeScript"                |
> | `decision:postgres_for_this_project` | ନିଷ୍ପତ୍ତି | ଘଟଣାମୂଳକ | "ଏହି ପ୍ରକଳ୍ପ ପାଇଁ Postgres" |
> | `pattern:commit_before_pushing`      | ପ୍ୟାଟର୍ନ  | ତଥ୍ୟମୂଳକ | "push କରିବା ପୂର୍ବରୁ commit" |
> | `preference:python`                  | ପସନ୍ଦ     | ତଥ୍ୟମୂଳକ | "Python"                    |

### ନିଷ୍କାଷଣ ସୀମାଗୁଡ଼ିକ

ଅନିୟନ୍ତ୍ରିତ ନିଷ୍କାଷଣକୁ ରୋକିବା ପାଇଁ, ନିମ୍ନଲିଖିତ ସୀମାଗୁଡ଼ିକ ପ୍ରଯୁଜ୍ୟ:

| ସର୍ବନିମ୍ନ ବିଷୟବସ୍ତୁ ଦୈର୍ଘ୍ୟ | 3ଟି ଅକ୍ଷର |
| ସର୍ବାଧିକ ବିଷୟବସ୍ତୁ ଦୈର୍ଘ୍ୟ | 500ଟି ଅକ୍ଷର |

### କେବେ ନିଷ୍କାଷଣ ଅକ୍ଷମ କରିବେ

ସ୍ମୃତି ସକ୍ଷମ ଥିବାବେଳେ ନିଷ୍କାଷଣ ସ୍ୱୟଂଚାଳିତ ଭାବେ ଚାଲେ; କେବଳ
ନିଷ୍କାଷଣ ପାଇଁ କୌଣସି ପୃଥକ ଟଗଲ୍ ନାହିଁ। ଏହାକୁ ବନ୍ଦ କରିବା ପାଇଁ, ସ୍ମୃତିକୁ ସମ୍ପୂର୍ଣ୍ଣ ଭାବେ ଅକ୍ଷମ କରନ୍ତୁ (`enabled: false`
କୁ `PUT /api/settings/memory` ମାଧ୍ୟମରେ)। ନିମ୍ନ ପରିସ୍ଥିତିରେ ଏହା କରିବା ବିଚାର କରନ୍ତୁ:

- ଆପଣଙ୍କର ସନ୍ଦେଶ ପରିମାଣ ଅଧିକ ଏବଂ ନିଷ୍କାଷଣ ଖର୍ଚ୍ଚ ଅଣଦେଖା କରିବା ଯୋଗ୍ୟ ନୁହେଁ
- ଆପଣଙ୍କ କଥୋପକଥନଗୁଡ଼ିକ ପ୍ରାୟତଃ ଅସ୍ଥାୟୀ (ଚାଟ୍, ଡିବଗିଂ) ଏବଂ ସେଗୁଡ଼ିକର କୌଣସି ଦୀର୍ଘକାଳୀନ ମୂଲ୍ୟ ନାହିଁ
- ଆପଣ ପୂର୍ବରୁ କଷ୍ଟମ୍ ପ୍ଲଗ୍ଇନ୍ଗୁଡ଼ିକ ମାଧ୍ୟମରେ ପ୍ରସଙ୍ଗ କ୍ୟାପ୍ଚର୍ କରୁଛନ୍ତି

---

## ହାଇବ୍ରିଡ୍ RRF ସମନ୍ୱୟ (v3.8.16+)

**Reciprocal Rank Fusion (RRF)** ଆଲଗୋରିଦମ୍ FTS5 (କୀୱାର୍ଡ) ଏବଂ ଭେକ୍ଟର୍ (ଅର୍ଥଗତ) ଫଳାଫଳଗୁଡ଼ିକୁ ଏକତ୍ର କରେ। ନିମ୍ନ-କ୍ରମର ଫଳାଫଳଗୁଡ଼ିକୁ କେତେ ଓଜନ ଦିଆଯିବ, ତାହା `k` ପାରାମିଟର୍ ନିୟନ୍ତ୍ରଣ କରେ।

### ସୂତ୍ର

ପ୍ରତ୍ୟେକ ପ୍ରାର୍ଥୀ ସ୍ମୃତି ପାଇଁ, RRF ସ୍କୋର୍ ହେଉଛି:

```
RRF(d) = Σ  1 / (k + rank_i(d))
```

ଯେଉଁଠାରେ:

- `k` ହେଉଛି ଧ୍ରୁବାଙ୍କ (ଡିଫଲ୍ଟ 60)
- `rank_i(d)` ହେଉଛି i-ତମ ପୁନରୁଦ୍ଧାର ପ୍ରଣାଳୀରେ (FTS, ଭେକ୍ଟର୍) ଡକ୍ୟୁମେଣ୍ଟ୍ `d`ର କ୍ରମ
- ସମସ୍ତ ପୁନରୁଦ୍ଧାର ପ୍ରଣାଳୀ ଉପରେ ଯୋଗ କରାଯାଏ

### `k` କିପରି ଫଳାଫଳକୁ ପ୍ରଭାବିତ କରେ

| `k` ମୂଲ୍ୟ           | ପ୍ରଭାବ                                                                        | ଯାହା ପାଇଁ ସର୍ବୋତ୍ତମ                        |
| ------------------- | ----------------------------------------------------------------------------- | ------------------------------------------ |
| `k=0`               | ଶୁଦ୍ଧ କ୍ରମ ସଂଯୋଜନ (କୌଣସି ସ୍ମୁଦିଂ ନାହିଁ)                                       | ତାତ୍ତ୍ୱିକ ଆଧାରରେଖା                         |
| `k=10-30`           | ଶୀର୍ଷ ଫଳାଫଳଗୁଡ଼ିକୁ ଅଧିକ ଓଜନ ଦିଏ, ନିମ୍ନ କ୍ରମର ଅବଦାନ ଅତ୍ୟନ୍ତ କମ୍                | ଯେତେବେଳେ ଶୀର୍ଷ-3 ଫଳାଫଳ ସାଧାରଣତଃ ସଠିକ୍      |
| **`k=60`** (ଡିଫଲ୍ଟ) | ସନ୍ତୁଳିତ — ଶୀର୍ଷ-10 ଫଳାଫଳ ସମସ୍ତେ ଅର୍ଥପୂର୍ଣ୍ଣ ଭାବେ ଅବଦାନ ଦିଅନ୍ତି               | ସାଧାରଣ-ଉଦ୍ଦେଶ୍ୟ ପୁନରୁଦ୍ଧାର                 |
| `k=100+`            | ଅଧିକ ସମତଳ — ନିମ୍ନ-କ୍ରମ ଫଳାଫଳ ମଧ୍ୟ ଏକାଧିକ ପ୍ରଣାଳୀରେ ଦେଖାଦେଲେ ପ୍ରାଧାନ୍ୟ ପାଇପାରେ | ଯେତେବେଳେ recall > precision ଗୁରୁତ୍ୱପୂର୍ଣ୍ଣ |

### ବ୍ୟବହାରିକ ଭାବେ `k` ସମନ୍ୱୟ କରିବା

```bash
# ଡିଫଲ୍ଟ
MEMORY_RRF_K=60

# ଆକ୍ରାମକ ସଠିକତା (ଛୋଟ ସ୍ମୃତି, ଅଳ୍ପ ଡକ୍ୟୁମେଣ୍ଟ୍)
MEMORY_RRF_K=20

# ସର୍ବାଧିକ ରିକଲ୍ (ବଡ଼ ସ୍ମୃତି, ବିବିଧ କ୍ୱେରୀ)
MEMORY_RRF_K=120
```

**`k=20` ସହିତ ଉଦାହରଣ:**

- FTS କ୍ରମ 1 → ଅବଦାନ `1/21 = 0.048`
- FTS କ୍ରମ 10 → ଅବଦାନ `1/30 = 0.033`
- ଭେକ୍ଟର୍ କ୍ରମ 1 → ଅବଦାନ `0.048`
- ସଂଯୁକ୍ତ ସର୍ବାଧିକ: `0.096`

**`k=60` ସହିତ ଉଦାହରଣ:**

- FTS କ୍ରମ 1 → ଅବଦାନ `1/61 = 0.016`
- FTS କ୍ରମ 10 → ଅବଦାନ `1/70 = 0.014`
- ଭେକ୍ଟର୍ କ୍ରମ 1 → ଅବଦାନ `0.016`
- ସଂଯୁକ୍ତ ସର୍ବାଧିକ: `0.033`

ଅଧିକ `k` ସହିତ, ଶୀର୍ଷ-1 ଏବଂ କ୍ରମ-10 ମଧ୍ୟରେ **ଆପେକ୍ଷିକ ପାର୍ଥକ୍ୟ** କମ୍ ହୁଏ, ତେଣୁ ଆଲଗୋରିଦମ୍ ଶୀର୍ଷ-କ୍ରମର ଆତ୍ମବିଶ୍ୱାସ ଅପେକ୍ଷା **ପୁନରୁଦ୍ଧାର ପ୍ରଣାଳୀଗୁଡ଼ିକ ମଧ୍ୟରେ ସହମତି** ଉପରେ ଅଧିକ ନିର୍ଭର କରେ।

### କେବେ `k` ପରିବର୍ତ୍ତନ କରିବେ

| ଲକ୍ଷଣ                                             | ଚେଷ୍ଟା କରନ୍ତୁ                                                             |
| ------------------------------------------------- | ------------------------------------------------------------------------- |
| ଶୀର୍ଷ ଫଳାଫଳ ସବୁବେଳେ ଜିତେ, କିନ୍ତୁ ଏହା ଭୁଲ୍         | k **କମାନ୍ତୁ** (ଯେପରିକି, 20) — ଶୀର୍ଷ-କ୍ରମର ଆତ୍ମବିଶ୍ୱାସ ଅଧିକ ଗୁରୁତ୍ୱପୂର୍ଣ୍ଣ |
| ସଠିକ୍ ଉତ୍ତର ଶୀର୍ଷ-5ରେ ଅଛି, କିନ୍ତୁ ଶୀର୍ଷ-1ରେ ନାହିଁ | k **ବଢ଼ାନ୍ତୁ** (ଯେପରିକି, 100) — ସମତଳ ସ୍କୋରିଂ ସହମତିକୁ ପୁରସ୍କୃତ କରେ         |
| ରିକଲ୍ ଅଧିକ କିନ୍ତୁ ସଠିକତା କମ୍                      | k **କମାନ୍ତୁ** — କ୍ରମାଙ୍କନକୁ ଅଧିକ ତୀକ୍ଷ୍ଣ କରନ୍ତୁ                           |
| ରିକଲ୍ କମ୍ (ପ୍ରାସଙ୍ଗିକ ଡକ୍ୟୁମେଣ୍ଟ୍ ଛାଡ଼ିଯାଉଛି)     | k **ବଢ଼ାନ୍ତୁ** — ନିମ୍ନ-କ୍ରମ ଡକ୍ୟୁମେଣ୍ଟ୍ଗୁଡ଼ିକୁ ସୁଯୋଗ ଦିଅନ୍ତୁ              |

### RRF ଓଜନ ନିର୍ଦ୍ଧାରଣ

ରେସିପ୍ରୋକାଲ୍ ର୍ୟାଙ୍କ୍ ଫ୍ୟୁଜନ୍ ଅର୍ଥଗତ ଭେକ୍ଟର୍ କ୍ରମ ଏବଂ ପୂର୍ଣ୍ଣ-ପାଠ୍ୟ ସନ୍ଧାନ କ୍ରମ ପାଇଁ ସମାନ ଓଜନ ବ୍ୟବହାର କରେ:

```
RRF(d) = 1/(k + rank_vector) + 1/(k + rank_fts)
```

ବ୍ୟକ୍ତିଗତ ଓଜନଗୁଡ଼ିକୁ ସମନ୍ୱୟ କରିବା ପାଇଁ କୌଣସି ପରିବେଶ ଭେରିଏବଲ୍ ନାହିଁ (`MEMORY_RRF_VECTOR_WEIGHT`/`MEMORY_RRF_FTS_WEIGHT` ଅବସ୍ଥିତ ନାହିଁ)।

---

## ସାରାଂଶକରଣ କୌଶଳ (v3.8.16+)

`src/lib/memory/summarization.ts` ମଡ୍ୟୁଲ୍ (`src/lib/memory/summarization.ts`) ସ୍ମରଣ କ୍ଷମତାକୁ ସଂରକ୍ଷିତ ରଖି ସକ୍ରିୟ ସେଟ୍କୁ ଛୋଟ ରଖିବା ପାଇଁ ପୁରୁଣା ସ୍ମୃତିଗୁଡ଼ିକୁ ସଂକୁଚିତ କରେ।

### ସାରାଂଶକରଣ କେବେ ଟ୍ରିଗର୍ ହୁଏ

| ଟ୍ରିଗର୍                      | ସୀମା (ଡିଫଲ୍ଟ)  |
| ---------------------------- | -------------- |
| API ମାଧ୍ୟମରେ ମାନୁଆଲ୍ ଟ୍ରିଗର୍ | ପ୍ରଯୁଜ୍ୟ ନୁହେଁ |

### କ’ଣ ସାରାଂଶିତ ହୁଏ

`src/lib/memory/summarization.ts`ରୁ ଦୁଇଟି ପ୍ରବେଶ ବିନ୍ଦୁ ଏକ୍ସପୋର୍ଟ କରାଯାଏ:

- **`summarizeMemories(apiKeyId, sessionId?, maxTokens = 4000)`** — ଗୋଟିଏ ସେସନ୍ର
  ସ୍ମୃତିଗୁଡ଼ିକୁ ଟୋକେନ୍ ବଜେଟ୍ଦ୍ୱାରା ସୀମିତ ଗୋଟିଏ ସାରାଂଶ ପାଠ୍ୟରେ ସଂକ୍ଷିପ୍ତ କରେ।
- **`summarizeMemoriesOlderThan(apiKeyId, days, dryRun)`** — API ଦ୍ୱାରା ବ୍ୟବହୃତ
  ବୟସ-ଆଧାରିତ ସଂକୁଚନ: ଏହା `days` ଠାରୁ ପୁରୁଣା ପ୍ରତ୍ୟେକ ସ୍ମୃତିକୁ ବାଛେ, ସେଗୁଡ଼ିକରୁ
  ଗୋଟିଏ ସଂକ୍ଷିପ୍ତ ସାରାଂଶ ସ୍ମୃତି ତିଆରି କରେ, ଏବଂ (`dryRun` `false` ଥିବାବେଳେ)
  ମୂଳଗୁଡ଼ିକୁ ଡିଲିଟ୍ କରେ। କିଛି ପରିବର୍ତ୍ତନ ନକରି ପ୍ରାର୍ଥୀ ସେଟ୍ ଏବଂ ମୋଟ ଟୋକେନ୍
  ପୂର୍ବାବଲୋକନ କରିବାକୁ `dryRun: true` ପାସ୍ କରନ୍ତୁ।

କୌଣସି ଟ୍ୟାଗ୍/କି କ୍ଲଷ୍ଟରିଂ ପାସ୍ କିମ୍ବା ପ୍ରତି-ସ୍ମୃତି "ମୂଳ ବନାମ ସାରାଂଶଯୋଗ୍ୟ" ସ୍କୋରିଂ ନାହିଁ —
ଚୟନ ସମ୍ପୂର୍ଣ୍ଣ ଭାବେ ବୟସ ସୀମା ଉପରେ ନିର୍ଭରଶୀଳ, ଏବଂ ସାରାଂଶ ପାଠ୍ୟ ହେଉଛି ପ୍ରତ୍ୟେକ ପ୍ରାର୍ଥୀ ପାଇଁ
ଏକ ସଂକ୍ଷିପ୍ତ, ପ୍ରକାର-ଉପସର୍ଗଯୁକ୍ତ ଧାଡ଼ି।

### ସାରାଂଶକରଣ ଟ୍ରିଗର୍ କରିବା

ସାରାଂଶକରଣ **ମାନୁଆଲ୍ / ଇଚ୍ଛାଧୀନ** — `autoSummarize` ସେଟିଂ ଡିଫଲ୍ଟ ଭାବେ
`false`, ତେଣୁ କିଛି ମଧ୍ୟ ସ୍ୱୟଂଚାଳିତ ଭାବେ ସଂକୁଚିତ ହୁଏ ନାହିଁ। API ମାଧ୍ୟମରେ ଏହାକୁ ଟ୍ରିଗର୍ କରନ୍ତୁ:

```bash
curl -X POST http://localhost:20128/api/memory/summarize \
  -H "Authorization: Bearer $OMNIROUTE_KEY"
```

ଏହାକୁ ବନ୍ଦ ରଖିବା ପାଇଁ, କେବଳ `autoSummarize`କୁ ଏହାର ଡିଫଲ୍ଟ (`false`) ମୂଲ୍ୟରେ ରଖନ୍ତୁ।

### ସାରାଂଶକରଣ ଗୁଣବତ୍ତା ସମ୍ବନ୍ଧୀୟ ପରାମର୍ଶ

- **ପ୍ରଥମେ `dryRun` ସହିତ ପୂର୍ବାବଲୋକନ କରନ୍ତୁ** — `summarizeMemoriesOlderThan(..., true)`
  ପ୍ରାର୍ଥୀ ତାଲିକା ଏବଂ ମୋଟ ଟୋକେନ୍ ସଂଖ୍ୟା ଫେରାଏ, ଯାହାଦ୍ୱାରା ମୂଳଗୁଡ଼ିକୁ ଡିଲିଟ୍ କରିବା ପୂର୍ବରୁ
  କ’ଣ ମିଶ୍ରଣ କରାଯିବ ତାହା ନିଶ୍ଚିତ କରିପାରିବେ।
- **ଯଦି ଆପଣଙ୍କର ଏକ ବଡ଼ ସ୍ମୃତି ସଂଗ୍ରହ ଅଛି, ତେବେ କମ୍-ଟ୍ରାଫିକ୍ ସମୟରେ ସାରାଂଶକରଣ ଚଲାନ୍ତୁ** — LLM କଲ୍ ହେଉଛି ଧୀର ଅଂଶ

```bash
# Cron-ଶୈଳୀ: ପ୍ରତିଦିନ ଭୋର 3ଟାରେ ସାରାଂଶିତ କରନ୍ତୁ
0 3 * * * curl -X POST http://localhost:20128/api/memory/summarize \
  -H "Authorization: Bearer $OMNIROUTE_KEY"
```

---

## MemoryBackend ପ୍ରଦାନକାରୀ ପ୍ୟାଟର୍ନ

> **ସତ୍ୟର ଉତ୍ସ:** `src/lib/memory/backend.ts`, `src/lib/memory/genericBackend.ts`, `src/lib/memory/manager.ts`
> **ପରୀକ୍ଷାଗୁଡ଼ିକ:** `src/lib/memory/__tests__/generic-backend.test.ts`

MemoryBackend ପ୍ରଦାନକାରୀ ପ୍ୟାଟର୍ନ ବିଦ୍ୟମାନ ମେମୋରି ଇଞ୍ଜିନ୍ ଉପରେ ଏକ **ପ୍ଲଗ୍ କରାଯୋଗ୍ୟ ବ୍ୟାକେଣ୍ଡ ଅବ୍ୟକ୍ତୀକରଣ ସ୍ତର** ପ୍ରଚଳନ କରେ। ଏକକ ଷ୍ଟୋରେଜ୍ କାର୍ଯ୍ୟାନ୍ୱୟନ ସହିତ ବନ୍ଧା ରହିବା ପରିବର୍ତ୍ତେ, ମେମୋରି ସିଷ୍ଟମ୍ ବର୍ତ୍ତମାନ ବିନ୍ୟାସଯୋଗ୍ୟ ପ୍ରାଥମିକ/ଫଲ୍ବ୍ୟାକ୍ ରାଉଟିଂ ସହିତ ଏକାଧିକ ବ୍ୟାକେଣ୍ଡ (SQLite, Obsidian, Notion, କଷ୍ଟମ୍ HTTP ବ୍ୟାକେଣ୍ଡ) ସମର୍ଥନ କରେ।

### ସ୍ଥାପତ୍ୟ

```
┌──────────────────────────────────────────────────────────┐
│                    API ରୁଟ୍ଗୁଡ଼ିକ                       │
│            (src/app/api/memory/route.ts)                  │
└──────────────────────┬───────────────────────────────────┘
                       │
┌──────────────────────▼───────────────────────────────────┐
│                   MemoryManager                           │
│           ସିଙ୍ଗଲ୍ଟନ୍ ସଂଯୋଜକ (manager.ts)                 │
│                                                          │
│  ପ୍ରାଥମିକ ──► ବ୍ୟାକେଣ୍ଡ A  (ଯଥା SQLite)                 │
│  ଫଲ୍ବ୍ୟାକ୍ ─► ବ୍ୟାକେଣ୍ଡ B  (ଯଥା Obsidian)              │
│             ବ୍ୟାକେଣ୍ଡ C  (ଯଥା GenericBackend ମାଧ୍ୟମରେ Notion) │
└──────────────────────┬───────────────────────────────────┘
                       │
        ┌──────────────┼──────────────┐
        ▼              ▼              ▼
┌────────────┐ ┌────────────┐ ┌──────────────────┐
│ SQLite     │ │ Obsidian   │ │ GenericMemory    │
│ ବ୍ୟାକେଣ୍ଡ  │ │ ବ୍ୟାକେଣ୍ଡ  │ │ ବ୍ୟାକେଣ୍ଡ (HTTP)   │
└────────────┘ └────────────┘ └──────────────────┘
```

#### ମୂଳ ଇଣ୍ଟରଫେସ୍ (`backend.ts`)

ପ୍ରତ୍ୟେକ ବ୍ୟାକେଣ୍ଡକୁ `MemoryBackend` ଇଣ୍ଟରଫେସ୍ କାର୍ଯ୍ୟାନ୍ୱୟନ କରିବାକୁ ପଡ଼ିବ:

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

  // ସନ୍ଧାନ
  search(config: SearchConfig): Promise<Memory[]>;

  // ସ୍ୱାସ୍ଥ୍ୟ
  health(): Promise<HealthCheckResult>;

  // ଜୀବନଚକ୍ର (ଇଚ୍ଛାଧୀନ)
  initialize?(): Promise<void>;
  shutdown?(): Promise<void>;
}
```

#### MemoryManager (`manager.ts`)

ଏକ ସିଙ୍ଗଲ୍ଟନ୍ ସଂଯୋଜକ ଯାହା:

- `register(backend)` ମାଧ୍ୟମରେ ବ୍ୟାକେଣ୍ଡଗୁଡ଼ିକୁ **ପଞ୍ଜୀକୃତ** କରେ — ବୁଟ୍ ସମୟରେ `index.ts`ରୁ କଲ୍ କରାଯାଏ
- `configure(primary, fallbacks)` ମାଧ୍ୟମରେ ପ୍ରାଥମିକ + ଫଲ୍ବ୍ୟାକ୍କୁ **ବିନ୍ୟାସ** କରେ
- ବିଫଳତା ସମୟରେ ଫଲ୍ବ୍ୟାକ୍ ଶୃଙ୍ଖଳ ସହିତ CRUD/ସନ୍ଧାନକୁ ପ୍ରାଥମିକ ବ୍ୟାକେଣ୍ଡକୁ **ରୁଟ୍** କରେ
- ନିୟମିତ ଭାବରେ ସମସ୍ତ ବ୍ୟାକେଣ୍ଡର **ସ୍ୱାସ୍ଥ୍ୟ ଯାଞ୍ଚ** କରେ

**ଫଲ୍ବ୍ୟାକ୍ ଆଚରଣ:**

| କାର୍ଯ୍ୟ  | ପ୍ରାଥମିକ                           | ଫଲ୍ବ୍ୟାକ୍ଗୁଡ଼ିକ                |
| -------- | ---------------------------------- | ------------------------------ |
| `create` | ✅ କେବଳ ପ୍ରାଥମିକ                   | ❌                             |
| `get`    | ✅ ପ୍ରଥମେ ପ୍ରାଥମିକକୁ ଚେଷ୍ଟା କରନ୍ତୁ | ✅ null ହେଲେ ଫଲ୍ବ୍ୟାକ୍         |
| `update` | ✅ କେବଳ ପ୍ରାଥମିକ                   | ✅ ଫାୟାର୍-ଆଣ୍ଡ୍-ଫର୍ଗେଟ୍ ସିଙ୍କ୍ |
| `delete` | ✅ କେବଳ ପ୍ରାଥମିକ                   | ✅ ଫାୟାର୍-ଆଣ୍ଡ୍-ଫର୍ଗେଟ୍ ସିଙ୍କ୍ |
| `list`   | ✅ କେବଳ ପ୍ରାଥମିକ                   | ❌                             |
| `search` | ✅ ପ୍ରଥମେ ପ୍ରାଥମିକ                 | ✅ ତ୍ରୁଟି ହେଲେ ଫଲ୍ବ୍ୟାକ୍       |

#### GenericMemoryBackend (`genericBackend.ts`)

ଏକ ସାଧାରଣ HTTP କନେକ୍ଟର୍ ଯାହା ଯେକୌଣସି REST APIକୁ ଏକ MemoryBackendରେ ଅନୁକୂଳିତ କରେ। ନିମ୍ନଲିଖିତ ପାଇଁ ଉପଯୋଗୀ:

- **Notion** — Notion API ମାଧ୍ୟମରେ ସଂଯୋଗ କରନ୍ତୁ
- **Obsidian** — Obsidian Local REST API ମାଧ୍ୟମରେ ସଂଯୋଗ କରନ୍ତୁ
- **କଷ୍ଟମ୍ ବ୍ୟାକେଣ୍ଡଗୁଡ଼ିକ** — RESTful ମେମୋରି API ପ୍ରକାଶ କରୁଥିବା ଯେକୌଣସି ସେବା

**ବିନ୍ୟାସ:**

```typescript
interface GenericBackendConfig {
  baseUrl: string;           // ବ୍ୟାକଏଣ୍ଡ APIର ମୂଳ URL
  apiKey?: string;           // ପ୍ରମାଣୀକରଣ ପାଇଁ ବିୟରର୍ ଟୋକେନ୍
  headers?: Record<string, string>;  // କଷ୍ଟମ୍ HTTP ହେଡର୍
  timeout?: number;          // ଅନୁରୋଧ ସମୟସୀମା (ଡିଫଲ୍ଟ: 30000ms)
  backendType?: string;      // ଲଗିଂ ପାଇଁ

  // ଏଣ୍ଡପଏଣ୍ଟ ଓଭରରାଇଡ୍ (ଡିଫଲ୍ଟଗୁଡ଼ିକ REST ପ୍ରଥା ବ୍ୟବହାର କରନ୍ତି)
  endpoints?: {
    search?: string;   // ଡିଫଲ୍ଟ: "/memories/search"
    create?: string;   // ଡିଫଲ୍ଟ: "/memories"
    list?: string;     // ଡିଫଲ୍ଟ: "/memories"
    get?: string;      // ଡିଫଲ୍ଟ: "/memories/{id}"
    update?: string;   // ଡିଫଲ୍ଟ: "/memories/{id}"
    delete?: string;   // ଡିଫଲ୍ଟ: "/memories/{id}"
    health?: string;   // ଡିଫଲ୍ଟ: "/health"
  };

  // କ୍ୱେରୀ ପାରାମିଟର୍ ନାମ ମ୍ୟାପିଂ
  queryParams?: {
    query?/apiKeyId?/limit?/offset?/strategy?/maxTokens?/type?/sessionId?/orderBy?/orderDir?/options?
  };

  // ପାଥ୍ ପାରାମିଟର୍ ନାମ ମ୍ୟାପିଂ
  pathParams?: {
    id?/memoryId?
  };
}
```

**ଜଣାଶୁଣା ବ୍ୟାକଏଣ୍ଡଗୁଡ଼ିକ** `KNOWN_BACKENDS`ରେ ପୂର୍ବରୁ କନଫିଗର୍ କରାଯାଇଛି:

```typescript
createKnownBackend("obsidian"); // → localhost:27123କୁ ନିର୍ଦ୍ଦେଶ କରୁଥିବା GenericMemoryBackend
createKnownBackend("notion"); // → api.notion.com/v1କୁ ନିର୍ଦ୍ଦେଶ କରୁଥିବା GenericMemoryBackend
```

#### ବିଲ୍ଟ-ଇନ୍ ବ୍ୟାକଏଣ୍ଡଗୁଡ଼ିକ

##### SQLiteBackend (`sqliteBackend.ts`)

ଡିଫଲ୍ଟ ପ୍ରାଥମିକ ବ୍ୟାକଏଣ୍ଡ। `src/lib/memory/store.ts` ବ୍ୟବହାର କରି ବିଦ୍ୟମାନ SQLite-ଆଧାରିତ ମେମୋରୀ ଷ୍ଟୋର୍କୁ ରାପ୍ କରେ। ବୁଟ୍ ସମୟରେ ସ୍ୱୟଂଚାଳିତ ଭାବରେ ପଞ୍ଜୀକୃତ ହୁଏ।

```typescript
import { sqliteBackend } from "./sqliteBackend";
memoryManager.register(sqliteBackend);
```

##### ObsidianBackend (`obsidianBackend.ts`)

ବିଦ୍ୟମାନ Obsidian ଇଣ୍ଟିଗ୍ରେସନ୍ (`src/lib/memory/obsidianBackend.ts`)କୁ ରାପ୍ କରେ। Obsidian Local REST API ମାଧ୍ୟମରେ ଏକ Obsidian ଭଲ୍ଟ ସହିତ ସଂଯୋଗ କରେ।

### ସେଟିଂସ୍

ମେମୋରୀ ବ୍ୟାକଏଣ୍ଡ ସେଟିଂସ୍ ଆପ୍ ସେଟିଂସ୍ ଟେବୁଲ୍ରେ ସଂରକ୍ଷିତ ହୁଏ ଏବଂ `src/lib/memory/settings.ts` ମାଧ୍ୟମରେ ପରିଚାଳିତ ହୁଏ:

| ସେଟିଂ                    | ପରିବେଶ/କନଫିଗ୍ କୀ         | ଡିଫଲ୍ଟ     | ବିବରଣୀ                            |
| ------------------------ | ------------------------ | ---------- | --------------------------------- |
| ପ୍ରାଥମିକ ବ୍ୟାକଏଣ୍ଡ       | `memoryPrimaryBackend`   | `"sqlite"` | ପ୍ରାଥମିକ ବ୍ୟାକଏଣ୍ଡର ID            |
| ଫଲବ୍ୟାକ୍ ବ୍ୟାକଏଣ୍ଡଗୁଡ଼ିକ | `memoryFallbackBackends` | `[]`       | କ୍ରମାନୁସାରେ ଫଲବ୍ୟାକ୍ ବ୍ୟାକଏଣ୍ଡ ID |
| ବ୍ୟାକଏଣ୍ଡ କନଫିଗ୍ଗୁଡ଼ିକ   | `memoryBackendConfigs`   | `{}`       | ପ୍ରତି-ବ୍ୟାକଏଣ୍ଡ କନଫିଗ୍ ଓଭରରାଇଡ୍   |

ସେଟିଂସ୍କୁ `normalizeMemorySettings()` ମାଧ୍ୟମରେ ସାମାନ୍ୟୀକୃତ କରାଯାଏ ଏବଂ `getMemorySettings()`ରେ କ୍ୟାଶ୍ କରାଯାଏ।

### ଆରମ୍ଭୀକରଣ ପ୍ରବାହ

```
ଆପ୍ ବୁଟ୍ଷ୍ଟ୍ରାପ୍
  → index.ts ଇମ୍ପୋର୍ଟଗୁଡ଼ିକ (ପାର୍ଶ୍ୱ-ପ୍ରଭାବ): SQLiteBackendକୁ ପଞ୍ଜୀକୃତ କରେ
  → ଆପ୍ ଲାଇଫ୍ସାଇକଲ୍ରୁ initMemoryBackends() କଲ୍ କରାଯାଏ:
      1. ସେଟିଂସ୍ ଲୋଡ୍ କରନ୍ତୁ (getMemorySettings)
      2. ପ୍ରାଥମିକ + ଫଲବ୍ୟାକ୍ କନଫିଗର୍ କରନ୍ତୁ
      3. ସମସ୍ତ ବ୍ୟାକଏଣ୍ଡକୁ ଆରମ୍ଭ କରନ୍ତୁ (ସ୍ୱାସ୍ଥ୍ୟ ଯାଞ୍ଚ)
      4. ଅନୁରୋଧ ପାଇଁ ପ୍ରସ୍ତୁତ
```

### ଏକ ନୂତନ ବ୍ୟାକଏଣ୍ଡ ଯୋଡ଼ିବା

1. `src/lib/memory/<name>Backend.ts`ରେ **`MemoryBackend` ଇଣ୍ଟରଫେସ୍ କାର୍ଯ୍ୟକାରୀ କରନ୍ତୁ**
2. `src/lib/memory/index.ts`ରୁ **ଏକ୍ସପୋର୍ଟ କରନ୍ତୁ**
3. ବୁଟ୍ ସମୟରେ `memoryManager.register(yourBackend)` ସହିତ **ପଞ୍ଜୀକୃତ କରନ୍ତୁ**
4. ସେଟିଂସ୍ ମାଧ୍ୟମରେ **କନଫିଗର୍ କରନ୍ତୁ**: `memoryPrimaryBackend`କୁ ଆପଣଙ୍କ ବ୍ୟାକଏଣ୍ଡ IDରେ ସେଟ୍ କରନ୍ତୁ
5. ସନ୍ଦର୍ଭ ଭାବରେ `src/lib/memory/__tests__/generic-backend.test.ts` ବ୍ୟବହାର କରି **ପରୀକ୍ଷା କରନ୍ତୁ**

#### ଉଦାହରଣ: Brain ବ୍ୟାକଏଣ୍ଡ

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

### ଯାଞ୍ଚ

#### ୟୁନିଟ୍ ପରୀକ୍ଷା

```bash
npx vitest run src/lib/memory/__tests__/generic-backend.test.ts --reporter=verbose
```

ଆଶାକରାଯାଉଥିବା ଆଉଟପୁଟ୍: **35ଟି ପରୀକ୍ଷା, ସବୁ ପାସ୍**, ଯେଉଁଥିରେ ଅନ୍ତର୍ଭୁକ୍ତ:

- କନ୍ଷ୍ଟ୍ରକ୍ଟର୍ (2)
- ସ୍ୱାସ୍ଥ୍ୟ ଯାଞ୍ଚ (4) — ସଫଳତା, ବିଫଳତା 500, ନେଟୱର୍କ ତ୍ରୁଟି, ବିଳମ୍ବତା
- ଆରମ୍ଭୀକରଣ (2) — ସଫଳତା, ବିଫଳତା
- ସୃଷ୍ଟି (2) — ଡିଫଲ୍ଟ ଏଣ୍ଡପଏଣ୍ଟ, କଷ୍ଟମ୍ ଏଣ୍ଡପଏଣ୍ଟ
- ପ୍ରାପ୍ତି (4) — ସଫଳତା, 404 → null, ଅଣ-404 ଥ୍ରୋ, କଷ୍ଟମ୍ ପାଥ୍ ପାରାମିଟର୍
- ଅପଡେଟ୍ (2) — ସଫଳତା, 404 → false
- ବିଲୋପ (2) — ସଫଳତା, 404 → false
- ତାଲିକା (2) — କ୍ୱେରୀ ପାରାମିଟର୍, କଷ୍ଟମ୍ ପାରାମିଟର୍ ନାମ
- ସନ୍ଧାନ (3) — କ୍ୱେରୀ ପାରାମିଟର୍, କଷ୍ଟମ୍ ଏଣ୍ଡପଏଣ୍ଟ, ଅପ୍ସନ୍ ସିରିଆଲାଇଜେସନ୍
- ପ୍ରମାଣୀକରଣ ହେଡର୍ (2) — ବିୟରର୍ ଟୋକେନ୍, କଷ୍ଟମ୍ ହେଡର୍
- ଫ୍ୟାକ୍ଟରୀ (1)

#### ଟାଇପ୍ ଯାଞ୍ଚ

```bash
npm run typecheck:core
```

ଆଶାକରାଯାଉଥିବା ଫଳାଫଳ: **0ଟି ତ୍ରୁଟି**।
