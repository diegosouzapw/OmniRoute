# Memory System (বাংলা)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/MEMORY.md) · 🇪🇹 [am](../../../am/docs/frameworks/MEMORY.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/MEMORY.md) · 🇦🇿 [az](../../../az/docs/frameworks/MEMORY.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/MEMORY.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/MEMORY.md) · 🇩🇰 [da](../../../da/docs/frameworks/MEMORY.md) · 🇩🇪 [de](../../../de/docs/frameworks/MEMORY.md) · 🇬🇷 [el](../../../el/docs/frameworks/MEMORY.md) · 🇪🇸 [es](../../../es/docs/frameworks/MEMORY.md) · 🇪🇪 [et](../../../et/docs/frameworks/MEMORY.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/MEMORY.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/MEMORY.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/MEMORY.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/MEMORY.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/MEMORY.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/MEMORY.md) · 🇮🇱 [he](../../../he/docs/frameworks/MEMORY.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/MEMORY.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/MEMORY.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/MEMORY.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/MEMORY.md) · 🇮🇩 [id](../../../id/docs/frameworks/MEMORY.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/MEMORY.md) · 🇮🇹 [it](../../../it/docs/frameworks/MEMORY.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/MEMORY.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/MEMORY.md) · 🇰🇭 [km](../../../km/docs/frameworks/MEMORY.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/MEMORY.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/MEMORY.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/MEMORY.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/MEMORY.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/MEMORY.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/MEMORY.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/MEMORY.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/MEMORY.md) · 🇲🇲 [my](../../../my/docs/frameworks/MEMORY.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/MEMORY.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/MEMORY.md) · 🇳🇴 [no](../../../no/docs/frameworks/MEMORY.md) · 🇮🇳 [or](../../../or/docs/frameworks/MEMORY.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/MEMORY.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/MEMORY.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/MEMORY.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/MEMORY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/MEMORY.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/MEMORY.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/MEMORY.md) · 🇱🇰 [si](../../../si/docs/frameworks/MEMORY.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/MEMORY.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/MEMORY.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/MEMORY.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/MEMORY.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/MEMORY.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/MEMORY.md) · 🇮🇳 [te](../../../te/docs/frameworks/MEMORY.md) · 🇹🇭 [th](../../../th/docs/frameworks/MEMORY.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/MEMORY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/MEMORY.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/MEMORY.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/MEMORY.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/MEMORY.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/MEMORY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/MEMORY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/MEMORY.md)

---

> **প্রামাণিক উৎস:** `src/lib/memory/` এবং `src/app/api/memory/`
> **সর্বশেষ হালনাগাদ:** 2026-06-28 — v3.8.40 (ডিফল্টভাবে বন্ধ + int8 কোয়ান্টাইজেশন সমন্বয়)

OmniRoute API key (এবং ঐচ্ছিকভাবে session id) দ্বারা চিহ্নিত স্থায়ী কথোপকথনমূলক
মেমোরি প্রদান করে। হালকা regex প্যাটার্ন ম্যাচিংয়ের মাধ্যমে LLM প্রতিক্রিয়া থেকে
মেমোরিগুলো স্বয়ংক্রিয়ভাবে নিষ্কাশন করা হয় এবং পরবর্তী অনুরোধগুলোতে একটি অগ্রবর্তী
system message হিসেবে (অথবা system ভূমিকা প্রত্যাখ্যানকারী provider-গুলোর ক্ষেত্রে
প্রথম user message হিসেবে) পুনরায় প্রবেশ করানো হয়।

> **মেমোরি ডিফল্টভাবে বন্ধ (v3.8.30+)।** `DEFAULT_MEMORY_SETTINGS.enabled`
> এখন `false` (`src/lib/memory/settings.ts`)। মেমোরি সক্রিয় করলে পুনরুদ্ধার করা
> প্রসঙ্গের `maxTokens` পর্যন্ত (~2k) **প্রতিটি** chat অনুরোধে প্রবেশ করানো হয়,
> যার জন্য বিল করা হয় — নতুন ইনস্টলেশন এবং নিজেদের প্রসঙ্গ পরিচালনাকারী client-দের
> জন্য এটি একটি অপ্রত্যাশিত খরচ। **Settings → Memory**-এর অধীনে স্পষ্টভাবে সম্মতি
> দিয়ে সক্রিয় করুন (মেমোরি সক্রিয় থাকলে `MemorySkillsTab` token-খরচের একটি
> সতর্কতামূলক callout দেখায়)। কোনো client `x-omniroute-no-memory`
> request header (`true`/`1`/`yes`) ব্যবহার করে একটি নির্দিষ্ট অনুরোধকে এর বাইরে
> রাখতে পারে — [API_REFERENCE.md](../reference/API_REFERENCE.md)-এর request-header
> টেবিল দেখুন। একটি no-memory অনুরোধ `memoryOwnerId = null` সেট করে, যা সেই
> অনুরোধের জন্য মেমোরি এবং skill injection **উভয়ই** নিষ্ক্রিয় করে
> (`open-sse/handlers/chatCore/headers.ts::isNoMemoryRequested`)।

মেমোরি user-প্রতি নয়, বরং **প্রতি API key অনুযায়ী সীমাবদ্ধ** — একই API key দিয়ে
প্রমাণীকৃত প্রতিটি অনুরোধ একই মেমোরি পুল ভাগ করে, যা ঐচ্ছিকভাবে `sessionId`
দিয়ে আরও সীমাবদ্ধ করা যায়।

## আর্কিটেকচার

```
Client → /v1/chat/completions (apiKeyInfo আগে থেকেই সমাধান করা হয়েছে)
  → handleChatCore() [open-sse/handlers/chatCore.ts]
    → resolveMemoryOwnerId(apiKeyInfo)        # id নিষ্কাশন করে
    → getMemorySettings()                     # ক্যাশ করা settings
    → shouldInjectMemory(body, {enabled})     # নিয়ন্ত্রণ-দ্বার
    → retrieveMemories(apiKeyId, config)      # SQL + FTS5 + ঐচ্ছিক vector
    → injectMemory(body, memories, provider)  # system অথবা user message
  → upstream provider কল
  → প্রতিক্রিয়ায়: extractFacts(text, apiKeyId, sessionId)  # non-blocking
    → setImmediate → প্রতিটি match-এর জন্য createMemory(fact)
                   → embed(content) + upsertVector(id, vec)
```

Injection এবং extraction-এর call-site-গুলো
`open-sse/handlers/chatCore.ts`-এ সংযুক্ত করা হয়েছে (`retrieveMemories`,
`injectMemory` এবং `extractFacts` খুঁজুন)।

## Engine আর্কিটেকচার (3-স্তরীয় সমাধান)

Memory Engine উপলভ্য অবকাঠামো এবং settings-এর ভিত্তিতে runtime-এ retrieval path
নির্ধারণ করে। অগ্রাধিকারের ক্রমে প্রয়োগযোগ্য তিনটি tier রয়েছে:

```
  ┌─────────────────────────────────────────────────────────────┐
  │  TIER 0 — Keyword (FTS5)                                    │
  │  Probe-নির্ধারিত উপলভ্যতা: SQLite build এটি সমর্থন করলে     │
  │  FTS5 ব্যবহৃত হয় (better-sqlite3 / node:sqlite / bun:sqlite);│
  │  FTS5-বিহীন build-এ অনুপলভ্য (যেমন sql.js/WASM —            │
  │  "no such module: fts5")। strategy = "exact" হলে অথবা       │
  │  fallback হিসেবে ব্যবহৃত হয়; engine-status keyword         │
  │  probe-এর ফলাফল প্রতিফলিত করে।                              │
  └──────────────────────────────────┬──────────────────────────┘
                                     │ strategy = semantic|hybrid?
                                     ▼
  ┌─────────────────────────────────────────────────────────────┐
  │  TIER 1 — Embedded Vector (sqlite-vec)                       │
  │  sqlite-vec v0.1.9 db.loadExtension() দিয়ে লোড করা হয়।     │
  │  Float32 vector-এর ওপর KNN brute-force। সক্রিয় হয় যখন:     │
  │   • sqlite-vec loadExtension সফল হয়                         │
  │   • এমন একটি embedding source উপলভ্য থাকে (remote | static |│
  │     transformers), যা একটি Float32Array তৈরি করতে পারে      │
  │   • vec_memories table বিদ্যমান থাকে (প্রথম ready()-তে তৈরি)│
  └──────────────────────────────────┬──────────────────────────┘
                                     │ qdrant.enabled?
                                     ▼
  ┌─────────────────────────────────────────────────────────────┐
  │  TIER 2 — Qdrant (ঐচ্ছিক external vector database)          │
  │  সক্রিয় থাকলে semantic/hybrid-এর জন্য sqlite-vec-কে         │
  │  প্রতিস্থাপন করে। চলমান Qdrant instance + কনফিগার করা       │
  │  host/port প্রয়োজন।                                        │
  └─────────────────────────────────────────────────────────────┘
```

অবনমন স্বয়ংক্রিয় ও স্বচ্ছ:

- sqlite-vec লোড হতে ব্যর্থ হলে tier 1 অনুপলভ্য হয় → tier 0-তে fallback করে।
- embedding source কোনো error ফেরত দিলে tier 1, tier 0-তে fallback করে।
- Qdrant অস্বাস্থ্যকর হলে tier 2, tier 1-এ fallback করে (অথবা tier 1-ও
  অনুপলভ্য হলে tier 0-তে)।

## এমবেডিং উৎসসমূহ

এমবেডিং স্তরটি (`src/lib/memory/embedding/`) `MemorySettingsExtended.embeddingSource`-এর ভিত্তিতে কোন উৎস ব্যবহার করতে হবে তা নির্ধারণ করে:

| উৎস            | বিবরণ                                                                              | কী প্রয়োজন | কোল্ড স্টার্ট    |
| -------------- | ---------------------------------------------------------------------------------- | ----------- | ---------------- |
| `remote`       | কনফিগার করা প্রদানকারীর এমবেডিং API (OpenAI, Cohere ইত্যাদি) ব্যবহার করে           | হ্যাঁ       | নেই              |
| `static`       | `potion-base-8M`-এর মাধ্যমে লোকাল লুকআপ-টেবিল এমবেডিং (WordPiece + গড় পুলিং)      | না          | ~200ms           |
| `transformers` | `@huggingface/transformers` v4, `all-MiniLM-L6-v2`-এর মাধ্যমে লোকাল ONNX ইনফারেন্স | না          | ~3s + ~400MB RAM |
| `auto`         | রানটাইম নির্ধারণ: remote (কী থাকলে) → static → transformers → null                 | নির্ভরশীল   | নির্ভরশীল        |

**`auto`-এর নির্ধারণের ক্রম:**

1. `listEmbeddingProviders()`-এ `hasKey === true`-সহ প্রথম প্রদানকারী খুঁজুন → `remote`।
2. যদি `settings.staticEnabled === true` হয় → `static`।
3. যদি `settings.transformersEnabled === true` হয় → `transformers`।
4. অন্যথায় → `null` (FTS5 কীওয়ার্ড অনুসন্ধানে অবনমিত হয়)।

এমবেডিং ক্যাশ (`src/lib/memory/embedding/cache.ts`) `${source}:${model}:${dim}:${sha256(text)}` দ্বারা কীকৃত একটি ইন-মেমরি LRU ম্যাপ ব্যবহার করে, যা `MEMORY_EMBEDDING_CACHE_MAX` সংখ্যক এন্ট্রিতে (ডিফল্ট 1000) সীমাবদ্ধ এবং যার TTL হলো `MEMORY_EMBEDDING_CACHE_TTL_MS` (ডিফল্ট 5 মিনিট)। প্রতিটি প্রসেসের জীবনচক্রে এটি সব কলারের মধ্যে শেয়ার করা হয়।

## হাইব্রিড RRF (k=60)

যখন `strategy = "hybrid"` এবং ভেক্টর স্টোর উপলভ্য থাকে, তখন পুনরুদ্ধার FTS5 ও ভেক্টর ফলাফল একত্রিত করতে Reciprocal Rank Fusion ব্যবহার করে:

```
RRF(d) = Σ  1 / (k + rank_i(d))      যেখানে k = 60 (MEMORY_RRF_K-এর মাধ্যমে কনফিগারযোগ্য)
          i
```

সুনির্দিষ্টভাবে:

1. FTS5 অনুসন্ধান চালান → র্যাঙ্ক করা তালিকা `R_fts` (অবস্থান 1..N)।
2. KNN ভেক্টর অনুসন্ধান চালান → র্যাঙ্ক করা তালিকা `R_vec` (অবস্থান 1..M)।
3. প্রতিটি অনন্য `memoryId`-এর জন্য:  
   `rrf_score = 1/(60 + fts_rank)` + `1/(60 + vec_rank)` (তালিকায় না থাকলে 0)।
4. `rrf_score` অনুযায়ী অবরোহী ক্রমে সাজান, তারপর টোকেন বাজেট অনুসারে অগ্রসর হন।

বিভিন্ন ধরনের পুনরুদ্ধার ব্যবস্থার স্কোর স্বাভাবিকীকরণের প্রয়োজন ছাড়াই RRF কার্যকর বলে সুপরিচিত। ডিফল্ট `k=60` মূল Cormack et al. গবেষণাপত্র থেকে নেওয়া এবং ছোট কর্পাসের (<10k মেমরি) জন্য ভালোভাবে কাজ করে।

## ব্যাকফিল (অলস + পুনরায় ইনডেক্স)

এমবেডিং মডেল পরিবর্তিত হলে (`embedding_signature`-এর মাধ্যমে শনাক্ত করা হয়), ভেক্টর স্টোর পুনর্নির্মাণ করা হয় এবং `memories` টেবিলের বিদ্যমান সব মেমরিকে `needs_reindex = 1` হিসেবে চিহ্নিত করা হয়।

**অলস ব্যাকফিল**: পরবর্তী পুনরুদ্ধারের সময়, কোনো মেমরিতে ভেক্টর এন্ট্রি না থাকলে অনুসন্ধান চালানোর আগে সেটির এমবেডিং তৈরি করে `vec_memories`-এ যোগ করা হয়। এটি স্টার্টআপ ব্লক না করে বাস্তব অনুরোধগুলোর মধ্যে ব্যাকফিলের খরচ বণ্টন করে।

**স্পষ্ট পুনরায় ইনডেক্সিং**: `/dashboard/memory`-এর Engine ট্যাবে একটি "এখনই পুনরায় ইনডেক্স করুন" বোতাম রয়েছে, যা `POST /api/memory/reindex` কল করে। হ্যান্ডলারটি `src/lib/memory/reindex.ts` থেকে `runReindexBatch()` কল করে, যা প্রতিটি অনুরোধে সর্বোচ্চ `limit` সংখ্যক অপেক্ষমাণ এন্ট্রি প্রক্রিয়া করে। `GET /api/memory/engine-status` (`vectorStore.needsReindex`)-এর মাধ্যমে অগ্রগতি পোল করা যায়।

`memory_vec_meta` টেবিলটি (মাইগ্রেশন `083_memory_vec.sql`) সংরক্ষণ করে:

- `active_dim` — বর্তমান ভেক্টর মাত্রা (null = এখনও ক্যালিব্রেট করা হয়নি)।
- `embedding_signature` — পরিবর্তন শনাক্ত করতে ব্যবহৃত `${source}:${model}:${dim}`।
- `last_reset_at` — সর্বশেষ পূর্ণ রিসেটের টাইমস্ট্যাম্প।
- `vec_loaded` — sqlite-vec সফলভাবে লোড হয়েছে কি না তা নির্দেশকারী 0/1 ফ্ল্যাগ।

## সেটিংস এক্সটেনশন

`src/shared/schemas/memory.ts`-এর `MemorySettingsExtended`-এ নয়টি এম্বেডিং ও ভেক্টর ফিল্ড উপলভ্য রয়েছে,
যেগুলো `src/lib/db/settings.ts`-এর মাধ্যমে সংরক্ষিত হয়:

| ফিল্ড                    | ধরন                                                | ডিফল্ট   | বিবরণ                                                             |
| ------------------------ | -------------------------------------------------- | -------- | ----------------------------------------------------------------- |
| `embeddingSource`        | `"remote" \| "static" \| "transformers" \| "auto"` | `"auto"` | কোন এম্বেডিং উৎস ব্যবহার করা হবে                                  |
| `embeddingProviderModel` | `string \| null`                                   | `null`   | `provider/model` ফরম্যাটে প্রোভাইডার/মডেল                         |
| `customBaseUrl`          | `string \| null`                                   | `null`   | শুধু মেমরির জন্য OpenAI-সামঞ্জস্যপূর্ণ এন্ডপয়েন্টের বেস URL      |
| `customModelId`          | `string \| null`                                   | `null`   | কাস্টম এন্ডপয়েন্টে পাঠানো মডেল ID                                |
| `transformersEnabled`    | `boolean`                                          | `false`  | Transformers.js-এর জন্য অপ্ট-ইন (MiniLM, ~400MB)                  |
| `staticEnabled`          | `boolean`                                          | `false`  | স্থানীয় static potion-base-8M মডেলের জন্য অপ্ট-ইন                |
| `rerankEnabled`          | `boolean`                                          | `false`  | পুনঃর্যাঙ্কিং ধাপ সক্রিয় করুন (প্রতি অনুরোধে +200-500ms যোগ করে) |
| `rerankProviderModel`    | `string \| null`                                   | `null`   | `provider/model` ফরম্যাটে পুনঃর্যাঙ্ক প্রোভাইডার/মডেল             |

`rerankProviderModel`-কে `POST /v1/rerank` দ্বারা সমাধান করা হয় (লুপব্যাকের মাধ্যমে কল করা হয়), তাই ওই রুট যা কিছু গ্রহণ করে, এটিও সেগুলো গ্রহণ করে: একটি নির্বাচিত ক্লাউড পুনঃর্যাঙ্ক মডেল (`cohere/rerank-v3.5`, `jina-ai/jina-reranker-v3.5`, …) অথবা `<node-prefix>/<model>` হিসেবে একটি OpenAI-সামঞ্জস্যপূর্ণ প্রোভাইডার নোড (যেমন, একটি TEI/Infinity বক্সের জন্য `skilled-mini/bge-reranker-v2-m3`)। লুপব্যাক নোডগুলো সর্বদা উপযুক্ত; অন্য কোনো হোস্টে থাকা একটি নোডের (LAN, Tailscale) জন্য অতিরিক্তভাবে `RERANK_REMOTE_PROVIDER_NODES` ফিচার ফ্ল্যাগ প্রয়োজন এবং সেটিকে প্রোভাইডারের আউটবাউন্ড URL নীতি পাস করতে হবে—[ফিচার ফ্ল্যাগ](../reference/FEATURE_FLAGS.md) দেখুন। ড্যাশবোর্ড নির্বাচকে নির্বাচিত প্রোভাইডারগুলোর পাশাপাশি স্থানীয় নোডগুলোও তালিকাভুক্ত থাকে; যেকোনো বৈধ `provider/model` স্ট্রিং `PUT /api/settings/memory`-এর মাধ্যমে সরাসরি সেট করা যায়।
| `vectorStore` | `"sqlite-vec" \| "qdrant" \| "auto"` | `"auto"` | কোন ভেক্টর ব্যাকএন্ড ব্যবহার করা হবে |

এগুলো `GET /PUT /api/settings/memory`-এর মাধ্যমে উন্মুক্ত করা হয় (স্কিমা `MemorySettingsExtendedSchema`)।

`remote` উৎসের জন্য, Memory ঐচ্ছিক `customBaseUrl` এবং
`customModelId` সেটিংসও গ্রহণ করে। একসঙ্গে এগুলো গ্লোবাল এম্বেডিং রেজিস্ট্রি পরিবর্তন না করেই একটি OpenAI-সামঞ্জস্যপূর্ণ `/embeddings`
এন্ডপয়েন্ট ও মডেল নির্বাচন করে। ব্যবহারের আগে এন্ডপয়েন্টটি
স্বাভাবিকীকরণ করা হয় এবং প্রোভাইডারের আউটবাউন্ড URL নীতি দ্বারা যাচাই করা হয়: HTTP(S)
আবশ্যক, এম্বেড করা পরিচয়পত্র এবং কোয়েরি স্ট্রিং প্রত্যাখ্যান করা হয় এবং ক্লাউড-মেটাডেটা
ঠিকানাগুলো অবরুদ্ধ থাকে। খালি মানগুলো নির্বাচিত রেজিস্ট্রি প্রোভাইডার অপরিবর্তিত রাখে। ড্যাশবোর্ডে
ফেরত দেওয়া ত্রুটিগুলো পরিশোধিত হয় এবং এন্ডপয়েন্টের পরিচয়পত্র কখনোই লগ করা হয় না।

> **TODO (D20):** `global` স্কোপ (সব API কী-এর মধ্যে মেমরি শেয়ার করা) এই রিলিজে
> বাস্তবায়িত হয়নি। এর জন্য স্কিমা পরিবর্তন এবং একটি গ্লোবাল পুনরুদ্ধার
> পাথ প্রয়োজন। আলাদাভাবে ট্র্যাক করুন।

## স্টোরেজ স্তরসমূহ

### প্রাথমিক: SQLite (`memories` table)

`015_create_memories.sql` migration দ্বারা তৈরি:

| কলাম                        | টাইপ               | নোট                                                                                |
| --------------------------- | ------------------ | ---------------------------------------------------------------------------------- |
| `id`                        | `TEXT PRIMARY KEY` | `crypto.randomUUID()`-এর মাধ্যমে তৈরি UUID                                         |
| `api_key_id`                | `TEXT NOT NULL`    | মালিকানাধীন API key                                                                |
| `session_id`                | `TEXT`             | ঐচ্ছিক প্রতি-conversation scope                                                    |
| `type`                      | `TEXT NOT NULL`    | `factual`, `episodic`, `procedural`, `semantic`-এর মধ্যে একটি                      |
| `key`                       | `TEXT`             | স্থিতিশীল upsert key, যেমন `preference:i_prefer_python`                            |
| `content`                   | `TEXT NOT NULL`    | প্রকৃত fact text                                                                   |
| `metadata`                  | `TEXT`             | JSON blob (category, extractedAt, source, ...)                                     |
| `created_at` / `updated_at` | `TEXT`             | ISO 8601 string                                                                    |
| `expires_at`                | `TEXT`             | ঐচ্ছিক মেয়াদোত্তীর্ণের সময়; `NULL` মানে স্থায়ী                                  |
| `memory_id`                 | `INTEGER UNIQUE`   | UUID ↔ FTS5 rowid সংযুক্ত করতে `023_fix_memory_fts_uuid.sql` দ্বারা যোগ করা হয়েছে |

Index: `api_key_id`, `session_id`, `type`, `expires_at`, এবং অনন্য
`memory_id` index।

**Upsert semantics**: `createMemory()` একই
`(api_key_id, key)`-সহ একটি বিদ্যমান row খোঁজে এবং পাওয়া গেলে সেটিকে একই স্থানে update করে (`metadata` shallow spread-এর
মাধ্যমে merge করে)। পুনরাবৃত্ত preference statement-এর কারণে এটি table-কে
সীমাহীনভাবে বেড়ে যাওয়া থেকে রক্ষা করে।

### Full-text Search (`memory_fts` virtual table)

`022_add_memory_fts5.sql`, `content` এবং
`key`-এর ওপর একটি FTS5 virtual table তৈরি করে। `023_fix_memory_fts_uuid.sql` একটি বাস্তব bug ঠিক করে, যেখানে UUID
primary key FTS5-এর integer rowid-এর সঙ্গে join করেনি—migration-টি
`memory_id` column যোগ করে, FTS table পুনরায় তৈরি করে এবং trigger
(`memory_fts_ai`, `memory_fts_ad`, `memory_fts_au`) সংযুক্ত করে, যা
INSERT, DELETE এবং UPDATE-এর সময় FTS-কে sync-এ রাখে।

`semantic` এবং `hybrid` strategy-এর জন্য `retrieval.ts` দ্বারা ব্যবহৃত হয় (নিচে দেখুন)।
retrieval code `hasTable("memory_fts")` দিয়ে guard করে এবং
FTS table অনুপস্থিত থাকলে বা FTS query exception ছুড়লে chronological order-এ fallback করে।

### ঐচ্ছিক: Qdrant (vector store tier 2)

`src/lib/memory/qdrant.ts`, tier 2
vector store হিসেবে একটি ঐচ্ছিক Qdrant integration বাস্তবায়ন করে। engine selector
`memoryVectorStore === "qdrant"` হলেই কেবল retrieval Qdrant-এ route করে—ডিফল্ট `"auto"` (এবং `"sqlite-vec"`)
**কখনোই** Qdrant নির্বাচন করে না। Engine-tab toggle **উভয়** `qdrantEnabled` এবং
`memoryVectorStore`-কে একসঙ্গে সেট করে: সক্রিয় করলে Qdrant primary store হয়, নিষ্ক্রিয় করলে
`"auto"`-তে reset হয় (#5597—ওই fix-এর আগে, সক্রিয় করা নিষ্ক্রিয়ই থাকত কারণ কোনো কিছুই
engine selector-এ write করত না)। Qdrant-এ পৌঁছানো না গেলে বা এটি কিছু ফেরত না দিলে, retrieval
sqlite-vec → FTS5-এ fallback করে।

- `upsertSemanticMemoryPoint()` — কনফিগার করা embedding model দিয়ে `key + content` embed করে, collection-এর অস্তিত্ব নিশ্চিত করে (প্রথম ব্যবহারে cosine-distance vector তৈরি করে), এবং payload `{memoryId,
apiKeyId, sessionId, key, content, metadata, createdAtUnix, expiresAtUnix}`-সহ একটি point upsert করে।
- `searchSemanticMemory(query, topK, scope)` — query-টি embed করে, `kind = "omniroute_memory"` দ্বারা এবং ঐচ্ছিকভাবে
  `apiKeyId` / `sessionId` দ্বারা filter করা collection-এ search করে। `topK`-কে `[1, 20]` সীমার মধ্যে রাখে।
- `deleteSemanticMemoryPoint(id)` — একটি point delete করে। SQLite row সরানোর পরে
  `deleteMemory()` এটি কল করে (D15)।
- `cleanupSemanticMemoryPoints({retentionDays})` — যেসব point-এর
  `expiresAtUnix` অতীতে, অথবা যেসব point-এর `createdAtUnix` retention cutoff-এর চেয়ে পুরোনো, সেগুলো bulk delete করে। প্রথমে গণনা করে, যাতে dashboard-এ প্রকৃত সংখ্যা দেখানো যায়।
- `checkQdrantHealth()` — latency-সহ `GET /readyz` health probe।

settings UI-তে `/dashboard/memory`-এর **Engine tab**-এ Qdrant config, health check, semantic search test
এবং cleanup উপলভ্য। `src/app/api/settings/qdrant/`-এর অধীন সংশ্লিষ্ট
route-গুলো v3.8.6 অনুযায়ী সম্পূর্ণভাবে সংযুক্ত রয়েছে:

| Route                                   | Method        | বিবরণ                               |
| --------------------------------------- | ------------- | ----------------------------------- |
| `/api/settings/qdrant`                  | `GET` / `PUT` | Qdrant settings পড়া / আপডেট করা    |
| `/api/settings/qdrant/health`           | `GET`         | Liveness probe + latency            |
| `/api/settings/qdrant/search`           | `POST`        | Semantic search test                |
| `/api/settings/qdrant/cleanup`          | `POST`        | মেয়াদোত্তীর্ণ / পুরোনো point সরানো |
| `/api/settings/qdrant/embedding-models` | `GET`         | উপলভ্য embedding model-এর তালিকা    |

**আচরণসংক্রান্ত নোট (যা প্রত্যাশা করবেন):**

- **Engine নির্বাচন** — Engine tab-এ Qdrant সক্রিয় করলে এটি primary
  store হয় (`memoryVectorStore="qdrant"` সেট করে); নিষ্ক্রিয় করলে `"auto"`-তে reset হয় (#5597)।
- **কোনো back-fill নেই** — Qdrant সক্রিয় করার **পরে** তৈরি/আপডেট করা memory-গুলোই
  এতে লেখা হয় (fire-and-forget dual-write)। আগে থেকে থাকা SQLite memory-গুলো **মাইগ্রেট করা হয় না**;
  "Reindex Now" শুধু sqlite-vec index পুনর্নির্মাণ করে, Qdrant নয়।
- **Vector dimension প্রথম ব্যবহারে প্রকৃত embedding থেকে স্বয়ংক্রিয়ভাবে শনাক্ত করা হয়** — পূরণ করার জন্য
  কোনো dimension field নেই। একটি collection তৈরি হওয়ার পরে embedding model পরিবর্তন করলে তা
  **স্বয়ংক্রিয়ভাবে** পরিচালিত হয় না: বিদ্যমান collection অপরিবর্তিত থাকে, dimension-
  mismatched write/search ব্যর্থ হয় এবং sqlite-vec-এ fallback করে। embedder পরিবর্তন করতে
  collection পুনরায় তৈরি করুন (নতুন নাম ব্যবহার করে, অথবা Qdrant-এ এটি delete করে)।
- **Distance metric** — সবসময় **Cosine** (collection তৈরির সময় hardcoded;
  configurable নয়)।
- **Auth** — শুধু API key (`api-key` header হিসেবে পাঠানো হয়; authentication-বিহীন
  local Docker-এর জন্য ঐচ্ছিক)। JWT/RBAC ব্যবহার করা হয় না।
- **Config field** — UI-তে `host`, `port`, `collection`, `embeddingModel`,
  `apiKey` উপলভ্য। `vectorSize` / `hnswEfConstruct` শুধু env/DB-তে থাকে এবং collection তৈরির জন্য `vectorSize`
  ব্যবহার করা হয় না (dimension embedding থেকে আসে)।

### Vector quantization (int8 — opt-in, উভয় backend)

সংরক্ষিত vector-এর memory footprint কমাতে (~Float32-এর তুলনায় 4× ছোট), সামান্য recall হ্রাসের বিনিময়ে
উভয় vector backend-ই **opt-in int8 quantization** সমর্থন করে।
উভয়ের ক্ষেত্রেই default হলো **off** — স্পষ্টভাবে সক্রিয় না করলে vector-গুলো full-precision-এ থাকে।

| Backend    | Setting                         | Type                           | Default  | যেখান থেকে পড়া হয়                                         |
| ---------- | ------------------------------- | ------------------------------ | -------- | ----------------------------------------------------------- |
| Qdrant     | `qdrantQuantization` (DB key)   | `"none" \| "int8" \| "binary"` | `"none"` | `src/lib/memory/qdrant.ts::normalizeQdrantConfig()`         |
| sqlite-vec | `MEMORY_VEC_QUANTIZATION` (env) | `"none" \| "int8"`             | `"none"` | `src/lib/memory/vectorStore.ts::requestedVecQuantization()` |

- **Qdrant** প্রতি instance-এর জন্য `qdrantQuantization` setting
  key-এর মাধ্যমে configure করা হয় (`PUT /api/settings/qdrant`-এ `quantization` field হিসেবে উপলভ্য)। এটি
  `"int8"` হলে, `buildQuantizationConfig()` scalar quantization
  (`always_ram`, quantile `0.99`) অনুরোধ করে এবং search-এ `rescore: true` সক্রিয় হয়, যাতে
  full-precision vector-গুলো int8 candidate set পরিশোধন করতে পারে।
- **sqlite-vec** quantization **শুধু environment-এর মাধ্যমে** নিয়ন্ত্রিত হয় (DB setting নয়): local vector-গুলোকে
  `vec_quantize_int8(?, 'unit')`-এর মাধ্যমে `int8[dim]`
  column হিসেবে সংরক্ষণ করতে `MEMORY_VEC_QUANTIZATION=int8` সেট করুন। নির্বাচিত mode-টি
  `embedding_signature`-এ (`:int8` suffix হিসেবে) অন্তর্ভুক্ত করা হয়, তাই mode পরিবর্তন করলে
  `vec_memories` table সম্পূর্ণ reindex হয় — embedding model পরিবর্তনের সময় ব্যবহৃত একই
  lazy-backfill path অনুসরণ করে।

## মেমোরির ধরন

`MemoryType` (`src/lib/memory/types.ts`):

| ধরন          | যে কাজে ব্যবহৃত হয়                                                                                     |
| ------------ | ------------------------------------------------------------------------------------------------------- |
| `factual`    | পছন্দ, ব্যবহারকারীর স্থিতিশীল তথ্য, আচরণগত ধরন                                                          |
| `episodic`   | নির্দিষ্ট কোনো মুহূর্তের সঙ্গে সম্পর্কিত সিদ্ধান্ত ("I chose Postgres")                                 |
| `procedural` | কর্মপ্রবাহ / কীভাবে করতে হয়-সংক্রান্ত মেমোরি (সংরক্ষিত; বর্তমানে কোনো স্বয়ংক্রিয় এক্সট্র্যাক্টর নেই) |
| `semantic`   | ভেক্টর-স্টোর এন্ট্রির জন্য সংরক্ষিত                                                                     |

`MemoryConfig`-এর পুনরুদ্ধার কৌশল হলো `exact`, `semantic`, অথবা `hybrid`-এর মধ্যে একটি,
এবং স্কোপ হলো `session`, `apiKey`, অথবা `global`-এর মধ্যে একটি। `getMemorySettings()`
থেকে পাওয়া ডিফল্ট স্কোপ হলো `apiKey`।

## তথ্য নিষ্কাশন (`extraction.ts`)

নিষ্কাশনটি **regex-ভিত্তিক**, LLM-ভিত্তিক নয় — এটি `setImmediate()` ব্যবহার করে
ইন-প্রসেসে চলে, ফলে এটি কখনোই রেসপন্স স্ট্রিমকে ব্লক করে না:

- **পছন্দের প্যাটার্ন** → `MemoryType.FACTUAL`
  (যেমন `I prefer …`, `I really like …`, `my favorite is …`, `I hate …`)
- **সিদ্ধান্তের প্যাটার্ন** → `MemoryType.EPISODIC`
  (যেমন `I'll use …`, `I chose …`, `I went with …`, `I'm going to adopt …`)
- **আচরণগত প্যাটার্ন** → `MemoryType.FACTUAL`
  (যেমন `I usually …`, `I always …`, `I tend to …`)

প্রতিটি ম্যাচ স্যানিটাইজ করা হয় (`trim`, হোয়াইটস্পেস সংকোচন, সর্বোচ্চ 500 অক্ষরে সীমাবদ্ধ),
একটি স্থিতিশীল `factKey(category, content)` ব্যবহার করে ব্যাচের মধ্যে ডিডুপ্লিকেট করা হয় এবং
`createMemory()`-এর মাধ্যমে `{category, extractedAt, source: "llm_response"}` মেটাডেটাসহ
সংরক্ষণ করা হয়। ইনপুট টেক্সট সর্বোচ্চ 64 KiB (`MAX_EXTRACTION_TEXT_LENGTH`) পর্যন্ত
সীমাবদ্ধ — এর চেয়ে দীর্ঘ হলে টেক্সটের **শেষাংশ** ব্যবহার করা হয়, যাতে অ্যাসিস্ট্যান্টের
সাম্প্রতিকতম কনটেন্ট সবসময় প্রক্রিয়ায় অন্তর্ভুক্ত থাকে।

`extractFactsFromText(text)` পরীক্ষার জন্য এক্সপোর্ট করা হয় এবং তথ্যগুলো সংরক্ষণ না করে
কাঠামোবদ্ধ আকারে ফেরত দেয়।

## পুনরুদ্ধার (`retrieval.ts`)

`retrieveMemories(apiKeyId, config)` হলো প্রধান এন্ট্রি পয়েন্ট। এটি:

1. `MemoryConfigSchema`-এর মাধ্যমে কনফিগ স্বাভাবিকীকরণ ও যাচাই করে।
2. `enabled` false হলে অথবা `maxTokens <= 0` হলে তাৎক্ষণিকভাবে `[]` ফেরত দেয়।
3. `maxTokens`-কে `[1, 8000]` সীমার মধ্যে আবদ্ধ করে।
4. আধুনিক `memories` টেবিলটি বিদ্যমান কি না (লিগ্যাসি `memory`
   টেবিলের বিপরীতে) তা শনাক্ত করে, যাতে পুরোনো ডেটাবেসগুলোও কাজ করতে থাকে।
5. মেয়াদ-সংক্রান্ত গার্ড
   (`expires_at IS NULL OR datetime(expires_at) > datetime('now')`), ঐচ্ছিক
   সেশন স্কোপ এবং ঐচ্ছিক `retentionDays` কাটঅফসহ বেস কোয়েরি তৈরি করে।
6. কৌশল অনুযায়ী শাখায় বিভক্ত হয়:
   - **`exact`** (ডিফল্ট): কালানুক্রমিক `ORDER BY created_at DESC LIMIT 100`।
   - **`semantic`**: `config.query` এবং `memory_fts` বিদ্যমান থাকলে
     `memory_fts MATCH ?` দিয়ে JOIN করে এবং FTS র্যাঙ্ক অনুযায়ী সাজায়; FTS 0টি
     সারি ফেরত দিলে কালানুক্রমিক পদ্ধতিতে ফিরে যায়।
   - **`hybrid`**: FTS ফলাফল (উচ্চতর প্রাসঙ্গিকতা) ও কালানুক্রমিক
     সেটের ইউনিয়ন তৈরি করে এবং id অনুযায়ী ডিডুপ্লিকেট করে।
7. কোয়েরি দেওয়া থাকলে `content`, `key` এবং `metadata` JSON-এর ওপর
   একটি কীওয়ার্ড প্রাসঙ্গিকতা স্কোর (`getRelevanceScore`) গণনা করে। শূন্য
   স্কোরের সারিগুলো ফিল্টার করে বাদ দেওয়া হয়।
8. প্রথমে স্কোরের অবরোহ ক্রমে, তারপর `createdAt`-এর অবরোহ ক্রমে সাজায়।
9. র্যাঙ্ক করা তালিকা ধরে এগিয়ে যায় এবং চলমান `estimateTokens(content)`
   (≈ `length / 4`) বাজেটের মধ্যে থাকা পর্যন্ত এন্ট্রি গ্রহণ করে। কোনো ম্যাচ থাকলে
   সর্বদা অন্তত একটি এন্ট্রি ফেরত দেয়।

`estimateTokens` এক্সপোর্ট করা হয় এবং পুনরুদ্ধার, সারসংক্ষেপ তৈরি ও MCP
`omniroute_memory_search` টুলে ব্যবহৃত হয়।

## ইনজেকশন (`injection.ts`)

`injectMemory(request, memories, provider)`:

1. সব মেমরির বিষয়বস্তু একটি একক `Memory context: …` স্ট্রিংয়ে যুক্ত করে।
2. প্রোভাইডারের নাম অনুযায়ী একটি কৌশল নির্বাচন করে:
   - **সিস্টেম বার্তা** (OpenAI, Anthropic, Gemini, …-এর জন্য ডিফল্ট) — বিদ্যমান যেকোনো সিস্টেম
     বার্তার আগে একটি `{role: "system", content: memoryText}` যোগ করে,
     যাতে ব্যবহারকারীর সিস্টেম প্রম্পটগুলোর অগ্রাধিকার বজায় থাকে।
   - **ব্যবহারকারী বার্তা** (ফলব্যাক) — `PROVIDERS_WITHOUT_SYSTEM_MESSAGE`-এ থাকা
     প্রোভাইডারগুলোর জন্য: `o1`, `o1-mini`, `o1-preview`,
     `glm`, `glmt`, `glm-cn`, `zai`, `qianfan`। এগুলো সিস্টেম রোল প্রত্যাখ্যান করে
     এবং তা না হলে 400 ত্রুটি দেবে (GLM/Zhipu-এর জন্য issue #1701 দেখুন)।
3. `memory.injection.injected`-এর অধীনে সংখ্যা, কৌশল এবং মডেল লগ করে।

`providerSupportsSystemMessage(provider)` এমন কলারদের জন্য এক্সপোর্ট করা হয়, যাদের
নিজস্ব রাউটিং সিদ্ধান্ত নিতে হয়। নিরাপত্তার জন্য অজানা প্রোভাইডারগুলোর ডিফল্ট মান `true`
(সিস্টেম রোল অনুমোদিত)।

## সেটিংস (`settings.ts`)

মেমরি কনফিগারেশন env var-এ নয়, **DB settings টেবিলে সংরক্ষিত থাকে**।
`getMemorySettings()` `getSettings()` থেকে ডেটা পড়ে এবং ফলাফলটি
ইন-প্রসেস ক্যাশ করে; লেখার পর settings PUT
রুট থেকে `invalidateMemorySettingsCache()` কল করা হয়।

### লিগ্যাসি ফিল্ড (সব সংস্করণ)

| DB কী                 | ধরন         | ডিফল্ট                                              | UI নিয়ন্ত্রণ                                    |
| --------------------- | ----------- | --------------------------------------------------- | ------------------------------------------------ |
| `memoryEnabled`       | বুলিয়ান    | `false` (v3.8.30 থেকে ডিফল্টভাবে বন্ধ)              | মেমরি চালু/বন্ধ                                  |
| `memoryMaxTokens`     | পূর্ণসংখ্যা | `2000` (পরিসর `0–16000`)                            | ইনজেকশনের জন্য টোকেন বাজেট                       |
| `memoryRetentionDays` | পূর্ণসংখ্যা | `30` (পরিসর `1–365`)                                | সংরক্ষণকাল                                       |
| `memoryStrategy`      | enum        | `"hybrid"` (`recent`, `semantic`, `hybrid`-এর একটি) | পুনরুদ্ধার কৌশল                                  |
| `skillsEnabled`       | বুলিয়ান    | `false`                                             | প্রতি-কী স্কিল ইনজেকশন টগল করে (SKILLS.md দেখুন) |

দ্রষ্টব্য: UI কৌশল `"recent"` `toMemoryRetrievalConfig()`-এর মাধ্যমে অভ্যন্তরীণ `"exact"` পুনরুদ্ধার
কৌশলে ম্যাপ হয় (কালানুক্রমিক ক্রম)।

### নতুন ফিল্ড (v3.8.6, পরিকল্পনা 21 D9)

ফিল্ডের বিবরণের জন্য উপরের "Settings extension" বিভাগটিও দেখুন।

| DB কী                       | API ফিল্ড                | ডিফল্ট   |
| --------------------------- | ------------------------ | -------- |
| `memoryEmbeddingSource`     | `embeddingSource`        | `"auto"` |
| `memoryEmbeddingModel`      | `embeddingProviderModel` | `null`   |
| `memoryTransformersEnabled` | `transformersEnabled`    | `false`  |
| `memoryStaticEnabled`       | `staticEnabled`          | `false`  |
| `memoryRerankEnabled`       | `rerankEnabled`          | `false`  |
| `memoryRerankModel`         | `rerankProviderModel`    | `null`   |
| `memoryVectorStore`         | `vectorStore`            | `"auto"` |

Qdrant-সম্পর্কিত DB কীগুলো (`qdrantEnabled`, `qdrantHost`, `qdrantPort`,
`qdrantApiKey`, `qdrantCollection`-এর ডিফল্ট `"omniroute_memory"`,
`qdrantEmbeddingModel`-এর ডিফল্ট `"openai/text-embedding-3-small"`) `qdrant.ts`-এর
`normalizeQdrantConfig()` দ্বারা পড়া হয়।

### এনভায়রনমেন্ট ভেরিয়েবল (v3.8.6)

ছয়টি ঐচ্ছিক env var ইঞ্জিনের রানটাইম আচরণ সমন্বয় করে (`.env.example`-এ নথিভুক্ত):

| ভেরিয়েবল                       | ডিফল্ট                     | বিবরণ                                                                                                                                              |
| ------------------------------- | -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| `MEMORY_EMBEDDING_CACHE_TTL_MS` | `300000`                   | এমবেডিং ক্যাশ TTL (5 মিনিট)                                                                                                                        |
| `MEMORY_EMBEDDING_CACHE_MAX`    | `1000`                     | এমবেডিং LRU ক্যাশে সর্বোচ্চ এন্ট্রি                                                                                                                |
| `MEMORY_TRANSFORMERS_MODEL`     | `Xenova/all-MiniLM-L6-v2`  | Transformers.js মডেলের জন্য HF রেপো                                                                                                                |
| `MEMORY_STATIC_MODEL`           | `minishlab/potion-base-8M` | স্ট্যাটিক potion মডেলের জন্য HF রেপো                                                                                                               |
| `MEMORY_STATIC_CACHE_DIR`       | `<DATA_DIR>/embeddings`    | ডাউনলোড করা মডেল কোথায় সংরক্ষণ করতে হবে                                                                                                           |
| `MEMORY_VEC_TOP_K`              | `20`                       | ভেক্টর অনুসন্ধানের জন্য ডিফল্ট top-K                                                                                                               |
| `MEMORY_RRF_K`                  | `60`                       | হাইব্রিড অনুসন্ধানের জন্য RRF k ধ্রুবক                                                                                                             |
| `MEMORY_VEC_QUANTIZATION`       | `none`                     | স্থানীয় sqlite-vec ভেক্টরগুলো কোয়ান্টাইজ করে সংরক্ষণ করতে `int8` সেট করুন (~4× ছোট; অপ্ট-ইন)। মোড পরিবর্তন করলে পুনরায় ইনডেক্স করা বাধ্যতামূলক। |

## সারসংক্ষেপকরণ (`summarization.ts`)

কোনো key-এর memories-এর চলমান মোট token সংখ্যা budget অতিক্রম করলে `summarizeMemories(apiKeyId, sessionId?, maxTokens = 4000)` পুরোনো content সংকুচিত করে। এটি `created_at` অনুযায়ী DESC ক্রমে row-গুলো পুনরাবৃত্তি করে, যেগুলো সীমার মধ্যে থাকে সেগুলো রেখে দেয় এবং বাকিগুলোর `content` মূল লেখার প্রথম তিনটি sentence দিয়ে একই স্থানে প্রতিস্থাপন করে। পুরোনো ও নতুন content-এর `estimateTokens`-এর পার্থক্যই হলো `tokensSaved`।

বর্তমান chat pipeline-এ এই routine **উপলভ্য, তবে স্বয়ংক্রিয়ভাবে call করা হয় না** — নিয়মিত compaction প্রয়োজন হলে এটিকে কোনো cron, admin action অথবা `MemoryConfig.autoSummarize` glue থেকে call করুন। data loss একমুখী: মূল text overwrite হয়ে যায়।

## REST API

সব endpoint-এর জন্য management auth (`requireManagementAuth`) আবশ্যক।

### মূল memory endpoint-সমূহ (বিদ্যমান + হালনাগাদ)

| Method   | Path                 | বিবরণ                                                                                                                                                                                     |
| -------- | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `GET`    | `/api/memory`        | filter-সহ paginated তালিকা: `apiKeyId`, `type`, `sessionId`, `q`, `limit`, `page`, `offset`। Response-এ `stats.total`, `stats.tokensUsed`, `stats.hitRate`, `cacheStats` অন্তর্ভুক্ত থাকে |
| `POST`   | `/api/memory`        | entry তৈরি করে (Zod-validated: `content`, `key`, ঐচ্ছিক `type`, `sessionId`, `apiKeyId`, `metadata`, `expiresAt`)। `createMemory()` call করে, যা `(apiKeyId, key)`-এর ভিত্তিতে upsert করে |
| `GET`    | `/api/memory/[id]`   | UUID অনুযায়ী একটি entry fetch করে                                                                                                                                                        |
| `PUT`    | `/api/memory/[id]`   | entry-এর field-গুলো (`type`, `key`, `content`, `metadata`) update করে। Body: `MemoryUpdatePutSchema`। embedding source উপলভ্য থাকলে vector-ও sync করে।                                    |
| `DELETE` | `/api/memory/[id]`   | একটি entry delete করে; `vec_memories` (D15) এবং best-effort ভিত্তিতে Qdrant থেকেও delete করে। entry না থাকলে 404 return করে।                                                              |
| `GET`    | `/api/memory/health` | `verifyExtractionPipeline("health-check")` চালায় — round-trip create→list→delete। `{working, latencyMs, error?}` return করে                                                              |

### নতুন memory engine endpoint-সমূহ (plan 21)

| Method | Path                              | বিবরণ                                                                                                                                                       |
| ------ | --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `POST` | `/api/memory/retrieve-preview`    | `retrieveMemories`-এর dry-run — score, tier ও token-সহ ranked result return করে। Body: `RetrievePreviewSchema`। memory inject বা modify করে না।             |
| `GET`  | `/api/memory/embedding-providers` | embedding model-সহ provider-গুলোর তালিকা দেখায় এবং কোনগুলোর জন্য API key configure করা আছে তা নির্দেশ করে।                                                 |
| `GET`  | `/api/memory/engine-status`       | সম্পূর্ণ engine status return করে: keyword tier, embedding resolution, vector store stats, Qdrant health, rerank config। Shape: `MemoryEngineStatusSchema`। |
| `POST` | `/api/memory/summarize`           | memory compaction ম্যানুয়ালি trigger করে। Body: `MemorySummarizeSchema` (`olderThanDays`, `apiKeyId?`, `dryRun`)। `{candidates, tokensSaved}` return করে।  |
| `POST` | `/api/memory/reindex`             | `needs_reindex=1` থাকা memory-গুলোর জন্য vector reindex trigger করে। Body: `MemoryReindexSchema` (`force`)। `{started, pending}` return করে।                |

### Settings endpoint-সমূহ

| Method | Path                                    | বিবরণ                                                                                                           |
| ------ | --------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `GET`  | `/api/settings/memory`                  | বর্তমান normalised `MemorySettingsExtended` (7টি নতুন field + legacy)                                           |
| `PUT`  | `/api/settings/memory`                  | `MemorySettingsExtendedSchema` থেকে যেকোনো field update করে (মোট 12টি field)                                    |
| `GET`  | `/api/settings/qdrant`                  | বর্তমান Qdrant settings (`QdrantSettingsSchema`)                                                                |
| `PUT`  | `/api/settings/qdrant`                  | Qdrant settings update করে। Body: `QdrantSettingsUpdateSchema`। `apiKey` = খালি string হলে key সরিয়ে ফেলা হয়। |
| `GET`  | `/api/settings/qdrant/health`           | configured Qdrant instance-এর বিরুদ্ধে liveness probe চালায়। `QdrantHealthResultSchema` return করে।            |
| `POST` | `/api/settings/qdrant/search`           | Qdrant-এর বিরুদ্ধে semantic search test চালায়। Body: `QdrantSearchSchema` (`query`, `topK`)।                   |
| `POST` | `/api/settings/qdrant/cleanup`          | expired / পুরোনো memory-গুলোর Qdrant point সরিয়ে দেয়।                                                         |
| `GET`  | `/api/settings/qdrant/embedding-models` | Qdrant-এর জন্য উপলভ্য embedding model-গুলোর তালিকা দেখায়।                                                      |

`/api/memory` list query, `page`-ভিত্তিক pagination (`parsePaginationParams`) **অথবা** raw `offset`—উভয়ই সমর্থন করে; `offset` উপস্থিত থাকলে সেটিই অগ্রাধিকার পায় এবং response shape-এর জন্য একটি derived `page` গণনা করা হয়।

## MCP টুলসমূহ (`open-sse/mcp-server/tools/memoryTools.ts`)

MCP সার্ভার সক্রিয় থাকলে তিনটি মেমরি টুল নিবন্ধিত হয়:

- `omniroute_memory_search` — `{apiKeyId, query?, type?, maxTokens?, limit?}`
  → `retrieveMemories()`-কে র্যাপ করে। v3.8.6 (D16) অনুযায়ী, `strategy`-কে
  `"exact"` হিসেবে হার্ডকোড করার পরিবর্তে `getMemorySettings()` থেকে পড়া
  হয়। যদি `query` প্রদান করা হয় এবং `strategy` হয় `semantic` বা `hybrid`,
  তাহলে উপলভ্য থাকলে ভেক্টর স্টোর ব্যবহার করা হয়।
- `omniroute_memory_add` — `{apiKeyId, sessionId?, type, key, content,
metadata?}` → `createMemory()`-কে র্যাপ করে। কেবল ৪টি আদর্শ টাইপ গ্রহণ করে:
  `factual`, `episodic`, `procedural`, `semantic` (D17)।
- `omniroute_memory_clear` — `{apiKeyId, type?, olderThan?}` → মিলে যাওয়া
  এন্ট্রিগুলোর তালিকা তৈরি করে, ঐচ্ছিকভাবে নির্দিষ্ট সময়ের আগে তৈরি হওয়ার
  টাইমস্ট্যাম্প অনুযায়ী ফিল্টার করে, তারপর প্রতিটিকে `deleteMemory()`-এর
  মাধ্যমে মুছে দেয় (যা sqlite-vec + Qdrant থেকেও ভেক্টর সরিয়ে দেয়)।

ট্রান্সপোর্ট ও স্কোপের বিস্তারিত জানতে [MCP-SERVER.md](./MCP-SERVER.md) দেখুন।

## ড্যাশবোর্ড (মেমরি স্টুডিও)

`src/app/(dashboard)/dashboard/memory/page.tsx` এখন একটি **৩-ট্যাবের স্টুডিও**:

### ট্যাব: মেমোরিজ

- ধারণা কার্ড (সংকোচনযোগ্য "এটি কীভাবে কাজ করে" ব্যাখ্যা)।
- রিয়েল-টাইম তালিকা, অনুসন্ধান ও পেজিনেশন (৩০০ ms ডিবাউন্সড)।
- টাইপ ফিল্টার (`factual` / `episodic` / `procedural` / `semantic` / সব)।
- মেমরি যোগ করার মডাল (কী, কনটেন্ট, টাইপ)।
- ইনলাইন সম্পাদনা (পেন্সিল বোতাম → `PUT /api/memory/[id]`)।
- প্রতি সারিতে মুছে ফেলার সুবিধা (নিশ্চিতকরণ ডায়ালগসহ)।
- বর্তমান পৃষ্ঠার JSON এক্সপোর্ট; ফাইল পিকারের মাধ্যমে JSON ইমপোর্ট।
- পরিসংখ্যান কার্ড: `totalEntries`, `tokensUsed`, `hitRate`।
- "পুরোনোগুলো সংকুচিত করুন" বোতাম → `POST /api/memory/summarize` (প্রথমে ড্রাই-রান
  সম্ভাব্য আইটেমের সংখ্যা দেখায়, তারপর নিশ্চিত করে)।
- `GET /api/memory/health` দ্বারা নিয়ন্ত্রিত একটি সবুজ/লাল স্বাস্থ্যসূচক বিন্দু।

### ট্যাব: প্লেগ্রাউন্ড

- কোয়েরি ইনপুট + কৌশল নির্বাচক (সুনির্দিষ্ট / সিমান্টিক / হাইব্রিড) + টোকেন বাজেট।
- "সিমুলেট করুন" → `POST /api/memory/retrieve-preview` — `score`, `tier`,
  `tokens`, `vecScore`, `ftsScore`-সহ র্যাঙ্ক করা ফলাফল দেখায়।
- কোন এম্বেডিং উৎস / ভেক্টর স্টোর ব্যবহৃত হয়েছে এবং কোনো ফলব্যাক ঘটেছে কি না,
  তা দেখানো রেজোলিউশন প্যানেল।

### ট্যাব: ইঞ্জিন

- ইঞ্জিন স্ট্যাটাস প্যানেল (কীওয়ার্ড FTS5 চিপ, এম্বেডিং চিপ, ভেক্টর স্টোর চিপ,
  Qdrant স্বাস্থ্য চিপ, রির্যাঙ্ক চিপ)।
- "এখনই পুনরায় ইনডেক্স করুন" বোতাম → `POST /api/memory/reindex`।
- এম্বেডিং উৎস নির্বাচক (স্বয়ংক্রিয় / রিমোট / স্ট্যাটিক / ট্রান্সফর্মারস + টগলসমূহ)।
- Qdrant কনফিগ কার্ড (সক্রিয় করার টগল, হোস্ট/পোর্ট/কালেকশন/কী, সংযোগ পরীক্ষা,
  সিমান্টিক অনুসন্ধান পরীক্ষা, পরিষ্কারকরণ)।
- রির্যাঙ্ক কনফিগ কার্ড (সক্রিয় করার টগল, প্রোভাইডার/মডেল নির্বাচক)।

লিগ্যাসি/গ্লোবাল সেটিংস ইন্টারফেসের জন্য মেমরি ও Qdrant সেটিংস
`/dashboard/settings → মেমরি ও দক্ষতা` (`MemorySkillsTab.tsx`)-এর
অধীনেও রয়েছে।

## ক্যাশিং

`src/lib/memory/store.ts`, `getMemory(id)` রিডের জন্য একটি ইন-প্রসেস LRU-সদৃশ ক্যাশ
(`MEMORY_CACHE_TTL = ১ মিনিট`, `MEMORY_MAX_CACHE_SIZE = 500`, যেখানে সবচেয়ে পুরোনো
২০ % অপসারণ করা হয়) বজায় রাখে; পাশাপাশি রয়েছে `get`/`set`/`invalidate`
মেথডসহ একটি জেনেরিক কী/ভ্যালু `memoryCache` স্তর (`src/lib/memory/cache.ts`),
যা নিজস্ব স্কোপযুক্ত ক্যাশ প্রয়োজন এমন কলাররা ব্যবহার করে (১ ০০০-এন্ট্রির LRU,
ডিফল্ট TTL ৫ মিনিট)।

## গোপনীয়তা ও জীবনচক্র

- মেমরির মালিকানা API key id-এর (`chatCore.ts`-এ `resolveMemoryOwnerId`)। কোনো `apiKeyInfo.id` না থাকলে পুনরুদ্ধার, ইনজেকশন বা এক্সট্রাকশন—কোনোটিই চলে না।
- ভবিষ্যতের `expires_at`-সহ এন্ট্রিগুলো পুনরুদ্ধার থেকে বাদ দেওয়া হয়; `retentionDays`-এর চেয়ে পুরোনো এন্ট্রিগুলো `retrieveMemories`-এর `created_at >= cutoff` ক্লজের মাধ্যমে বাদ দেওয়া হয়।
- স্থায়ীভাবে মুছে ফেলার জন্য `DELETE /api/memory/[id]` বা `omniroute_memory_clear` ব্যবহার করুন।
- এক্সট্রাকশন `setImmediate`-এর মাধ্যমে fire-and-forget পদ্ধতিতে চলে; ব্যর্থতাগুলো `memory.extraction.background.failed`-এর অধীনে লগ করা হয় এবং কখনোই কলারের কাছে প্রকাশ পায় না।
- যাচাইকরণ রাউন্ড-ট্রিপগুলো (`verifyExtractionPipeline`) একটি `finally` ব্লকে নিজেদের পরীক্ষামূলক এন্ট্রি পরিষ্কার করে।

## আরও দেখুন

- [SKILLS.md](./SKILLS.md) — `skillsEnabled` সেটিংটি মেমরির পাশাপাশি টুলের সংজ্ঞাও ইনজেক্ট করে।
- [MCP-SERVER.md](./MCP-SERVER.md) — MCP ট্রান্সপোর্ট / স্কোপ।
- [API_REFERENCE.md](../reference/API_REFERENCE.md) — আরও বিস্তৃত API পৃষ্ঠ।
- সোর্স মডিউলসমূহ:
  - `src/lib/memory/types.ts`, `schemas.ts`
  - `src/lib/memory/store.ts`, `retrieval.ts`, `injection.ts`, `reindex.ts`
  - `src/lib/memory/extraction.ts`, `summarization.ts`, `verify.ts`
  - `src/lib/memory/settings.ts`, `qdrant.ts`, `cache.ts`
  - `src/lib/memory/vectorStore.ts` — sqlite-vec + হাইব্রিড RRF
  - `src/lib/memory/embedding/index.ts` — বহু-উৎস এমবেডিং স্তর
  - `src/lib/memory/embedding/types.ts`, `remote.ts`, `staticPotion.ts`,
    `transformersLocal.ts`, `cache.ts`
  - `src/shared/schemas/memory.ts` — সব মেমরি API বডির জন্য Zod স্কিমা
  - `src/shared/schemas/qdrant.ts` — Qdrant সেটিংস/অপারেশনের জন্য Zod স্কিমা
  - `src/lib/db/memoryVec.ts` — `memory_vec_meta`-এর জন্য CRUD
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
  - `src/app/api/settings/qdrant/route.ts` + সাব-রুটসমূহ
  - `src/app/(dashboard)/dashboard/memory/` — Studio UI (পৃষ্ঠা + কম্পোনেন্ট +
    ট্যাব + হুক)
  - `open-sse/handlers/chatCore.ts` (ইনজেকশন / এক্সট্রাকশন ওয়্যারিং)
  - `open-sse/mcp-server/tools/memoryTools.ts`

---

## একটি এমবেডিং প্রোভাইডার নির্বাচন করা (v3.8.16+)

OmniRoute-এর মেমরি ইঞ্জিন **চারটি এমবেডিং উৎস** (`src/lib/memory/embedding/`) সমর্থন করে। **ল্যাটেন্সি, খরচ, মডেলের গুণমান এবং সেটআপের জটিলতার** ক্ষেত্রে প্রতিটির ভিন্ন সুবিধা ও সীমাবদ্ধতা রয়েছে।

### এমবেডিং উৎসসমূহ

| প্রোভাইডার     | উৎস                                          | ল্যাটেন্সি                         | খরচ                 | গুণমান                                   | সেটআপ                               |
| -------------- | -------------------------------------------- | ---------------------------------- | ------------------- | ---------------------------------------- | ----------------------------------- |
| `transformers` | স্থানীয় ONNX মডেল (Xenova/all-MiniLM-L6-v2) | ~50-150ms (CPU)                    | বিনামূল্যে          | ভালো                                     | শুধু `npm install`                  |
| `static`       | পূর্ব-গণনাকৃত ভেক্টর (ক্যাশ করা)             | <1ms                               | বিনামূল্যে          | প্রযোজ্য নয় (ক্যাশ হিটের ওপর নির্ভরশীল) | কিছুই নয়                           |
| `remote`       | OpenAI / Cohere / Voyage API                 | ~100-300ms                         | $0.02-0.10/1M টোকেন | চমৎকার                                   | API key                             |
| `auto`         | রানটাইমে সেরা উপলভ্য উৎস নির্বাচন করে        | নির্বাচিত উৎসের সমান               | বিনামূল্যে          | নির্বাচিত উৎসের সমান                     | কিছুই নয়                           |
| _(cache)_      | যেকোনো উৎসের ওপর ইন-মেমরি LRU স্তর           | <1ms (হিট), পূর্ণ ল্যাটেন্সি (মিস) | বিনামূল্যে          | অন্তর্নিহিত উৎসের সমান                   | সর্বদা চালু (নির্বাচনযোগ্য উৎস নয়) |

### সিদ্ধান্ত বৃক্ষ

```
                  আপনার ডিপ্লয়মেন্টের প্রেক্ষাপট কী?
                  │
      ┌───────────┼───────────┬──────────────┐
      │           │           │              │
  ডেভ/টেস্ট    ছোট প্রোড    বড় প্রোড     এজ / অফলাইন
      │           │           │              │
      ▼           ▼           ▼              ▼
  transformers transformers remote (Qdrant) transformers
  (বিনামূল্যে, API নেই)      (সেরা গুণমান)   (ইন্টারনেট নেই)
      │           │           │              │
      └────────┬──┴───────────┴──────────────┘
               │
               ▼
            উপরে সর্বদা `cache` স্তর যোগ করুন
            (LruCache যেকোনো প্রোভাইডারকে র্যাপ করে)
```

### ডেটাবেস ও API কনফিগারেশন

মেমরি এমবেডিংয়ের বিকল্পগুলো environment variable-এর পরিবর্তে Settings API/UI-এর মাধ্যমে কনফিগার করা হয়। Settings-এর অধীনে প্রাসঙ্গিক সেটিংস ডেটাবেস key-গুলো (`src/lib/memory/settings.ts`-এ `normalizeMemorySettings`) হলো:

- `memoryEmbeddingSource`: `"transformers"` (স্থানীয়), `"remote"` (API-ভিত্তিক, যেমন OpenAI), `"static"` (বহিরাগত স্টোর), অথবা `"auto"`
- `memoryEmbeddingProviderModel`: remote/static উৎসের মডেল শনাক্তকারী (যেমন, `"text-embedding-3-small"`)
- `memoryTransformersEnabled`: `true` | `false`
- `memoryStaticEnabled`: `true` | `false`
- `memoryVectorStore`: `"sqlite-vec"`, `"qdrant"`, অথবা `"auto"`

#### স্থানীয় মডেল (`transformers`)

স্থানীয় মডেল চালানোর জন্য অভ্যন্তরীণভাবে transformers.js ব্যবহার করে:

```bash
# কোডে পড়া env var-সমূহ (src/lib/memory/embedding/index.ts):
MEMORY_TRANSFORMERS_MODEL=Xenova/all-MiniLM-L6-v2  # HF মডেল রিপোজিটরি
MEMORY_STATIC_MODEL=minishlab/potion-base-8M       # HF স্ট্যাটিক potion মডেল
MEMORY_STATIC_CACHE_DIR=<DATA_DIR>/embeddings      # ক্যাশ ডিরেক্টরি
```

#### LRU এমবেডিং ক্যাশ

ক্যাশটি ডিফল্টভাবে সর্বদা চালু থাকে এবং env var-এর মাধ্যমে কনফিগার করা হয়:

```bash
MEMORY_EMBEDDING_CACHE_MAX=1000                    # ক্যাশ করা আইটেমের সর্বোচ্চ সংখ্যা
MEMORY_EMBEDDING_CACHE_TTL_MS=300000               # TTL (5 মিনিট)
```

### পারফরম্যান্সের পরিসংখ্যান

সাধারণ একটি 4-core x86 সার্ভারে বেঞ্চমার্ক (প্রতিটি টেক্সট ~100 টোকেন):

| প্রদানকারী           | p50   | p95   | p99   | প্রতি 1M এম্বেডিংয়ের খরচ          |
| -------------------- | ----- | ----- | ----- | ---------------------------------- |
| `transformers` (CPU) | 80ms  | 180ms | 350ms | বিনামূল্যে                         |
| `remote` (OpenAI)    | 120ms | 220ms | 400ms | ~$0.02 (ada-002) / $0.13 (3-large) |
| `static` (Qdrant)    | 15ms  | 30ms  | 60ms  | Qdrant হোস্টিংয়ের ওপর নির্ভরশীল   |
| `cache` (হিট)        | <1ms  | <1ms  | 2ms   | বিনামূল্যে                         |

---

## ফ্যাক্ট এক্সট্র্যাকশন প্যাটার্ন (v3.8.16+)

`extraction.ts` মডিউলটি (`src/lib/memory/extraction.ts`) কথোপকথনের বার্তা থেকে কাঠামোবদ্ধ তথ্য বের করতে **regex pattern matching** ব্যবহার করে। এই প্যাটার্নগুলো বোঝা আপনার ব্যবহারের ক্ষেত্র অনুযায়ী এক্সট্র্যাকশনের মান সমন্বয় করতে সাহায্য করে।

### ডিফল্ট প্যাটার্ন বিভাগসমূহ

| বিভাগ               | উদাহরণ প্যাটার্ন                                                                      | যা ক্যাপচার করে                   |
| ------------------- | ------------------------------------------------------------------------------------- | --------------------------------- |
| PREFERENCE_PATTERNS | `"আমি <X> পছন্দ করি"`, `"আমার <X> ভালো লাগে"`, `"আমি <X> ঘৃণা করি"`                   | ব্যবহারকারীর পছন্দ                |
| DECISION_PATTERNS   | `"আমি <X> ব্যবহার করব"`, `"আমি <X> করার সিদ্ধান্ত নিয়েছি"`, `"আমি <X> বেছে নিয়েছি"` | ব্যবহারকারীর সিদ্ধান্ত (episodic) |
| PATTERN_PATTERNS    | `"আমি সাধারণত <X>"`, `"আমি সবসময় <X>"`, `"আমি কখনোই <X> করি না"`                     | স্থায়ী আচরণগত প্যাটার্ন          |

### উদাহরণ প্যাটার্ন (সরলীকৃত)

```ts
// src/lib/memory/extraction.ts থেকে
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

### যা এক্সট্র্যাক্ট করা হয়

যখন একজন ব্যবহারকারী বলেন:

> "আমি TypeScript পছন্দ করি। এই প্রকল্পের জন্য আমি Postgres ব্যবহার করব। আমি সবসময় পুশ করার আগে কমিট করি। আমার Python ভালো লাগে না।"
> এক্সট্র্যাকশনের ফলে ৪টি মেমোরি তৈরি হয়:
>
> | কী                                   | বিভাগ      | ধরন      | বিষয়বস্তু                   |
> | ------------------------------------ | ---------- | -------- | ---------------------------- |
> | `preference:typescript`              | preference | factual  | "TypeScript"                 |
> | `decision:postgres_for_this_project` | decision   | episodic | "এই প্রকল্পের জন্য Postgres" |
> | `pattern:commit_before_pushing`      | pattern    | factual  | "পুশ করার আগে কমিট করা"      |
> | `preference:python`                  | preference | factual  | "Python"                     |

### এক্সট্র্যাকশনের সীমা

অনিয়ন্ত্রিত এক্সট্র্যাকশন প্রতিরোধ করতে নিম্নলিখিত সীমাগুলো প্রযোজ্য:

| বিষয়বস্তুর সর্বনিম্ন দৈর্ঘ্য | ৩টি অক্ষর |
| বিষয়বস্তুর সর্বোচ্চ দৈর্ঘ্য | ৫০০টি অক্ষর |

### কখন এক্সট্র্যাকশন নিষ্ক্রিয় করবেন

মেমোরি সক্রিয় থাকলেই এক্সট্র্যাকশন স্বয়ংক্রিয়ভাবে চলে; শুধু এক্সট্র্যাকশনের জন্য আলাদা কোনো টগল নেই। এটি বন্ধ করতে মেমোরি সম্পূর্ণভাবে নিষ্ক্রিয় করুন (`enabled: false`
ব্যবহার করে `PUT /api/settings/memory`)। নিম্নলিখিত ক্ষেত্রে এটি করার কথা বিবেচনা করুন:

- আপনার বার্তার পরিমাণ বেশি এবং এক্সট্র্যাকশনের ব্যয় উপেক্ষণীয় নয়
- আপনার কথোপকথনগুলো অধিকাংশই সাময়িক (চ্যাট, ডিবাগিং), যেগুলোর দীর্ঘমেয়াদি মূল্য নেই
- আপনি ইতিমধ্যেই কাস্টম প্লাগইনের মাধ্যমে প্রসঙ্গ ক্যাপচার করছেন

---

## হাইব্রিড RRF টিউনিং (v3.8.16+)

**Reciprocal Rank Fusion (RRF)** অ্যালগরিদম FTS5 (কীওয়ার্ড) এবং ভেক্টর (সেমান্টিক) ফলাফল একত্রিত করে। নিচের দিকে র্যাঙ্ক করা ফলাফলগুলোকে কতটা ওজন দেওয়া হবে, তা `k` প্যারামিটার নিয়ন্ত্রণ করে।

### সূত্র

প্রতিটি প্রার্থী মেমোরির জন্য RRF স্কোর হলো:

```
RRF(d) = Σ  1 / (k + rank_i(d))
```

যেখানে:

- `k` হলো ধ্রুবক (ডিফল্ট 60)
- `rank_i(d)` হলো i-তম রিট্রিভাল সিস্টেমে (FTS, ভেক্টর) ডকুমেন্ট `d`-এর র্যাঙ্ক
- যোগফলটি সব রিট্রিভাল সিস্টেমের ওপর গণনা করা হয়

### `k` যেভাবে ফলাফলকে প্রভাবিত করে

| `k`-এর মান          | প্রভাব                                                                                  | যে ক্ষেত্রে সবচেয়ে উপযোগী                        |
| ------------------- | --------------------------------------------------------------------------------------- | ------------------------------------------------- |
| `k=0`               | বিশুদ্ধ র্যাঙ্ক ফিউশন (কোনো স্মুথিং নেই)                                                | তাত্ত্বিক বেসলাইন                                 |
| `k=10-30`           | শীর্ষ ফলাফলগুলোকে অনেক বেশি ওজন দেয়, নিচু র্যাঙ্কের অবদান প্রায় নেই                   | যখন শীর্ষ ৩টি ফলাফল সাধারণত সঠিক হয়              |
| **`k=60`** (ডিফল্ট) | ভারসাম্যপূর্ণ — শীর্ষ ১০টি ফলাফলই অর্থপূর্ণভাবে অবদান রাখে                              | সাধারণ উদ্দেশ্যের রিট্রিভাল                       |
| `k=100+`            | অপেক্ষাকৃত সমতল — একাধিক সিস্টেমে উপস্থিত হলে নিচু র্যাঙ্কের ফলাফলও প্রাধান্য পেতে পারে | যখন recall > precision হওয়া অত্যন্ত গুরুত্বপূর্ণ |

### ব্যবহারিকভাবে `k` টিউন করা

```bash
# ডিফল্ট
MEMORY_RRF_K=60

# আক্রমণাত্মক প্রিসিশন (ছোট মেমোরি, অল্প কয়েকটি ডকুমেন্ট)
MEMORY_RRF_K=20

# সর্বোচ্চ রিকল (বড় মেমোরি, বৈচিত্র্যময় কোয়েরি)
MEMORY_RRF_K=120
```

**`k=20`-সহ উদাহরণ:**

- FTS র্যাঙ্ক ১ → অবদান `1/21 = 0.048`
- FTS র্যাঙ্ক ১০ → অবদান `1/30 = 0.033`
- ভেক্টর র্যাঙ্ক ১ → অবদান `0.048`
- সম্মিলিত সর্বোচ্চ: `0.096`

**`k=60`-সহ উদাহরণ:**

- FTS র্যাঙ্ক ১ → অবদান `1/61 = 0.016`
- FTS র্যাঙ্ক ১০ → অবদান `1/70 = 0.014`
- ভেক্টর র্যাঙ্ক ১ → অবদান `0.016`
- সম্মিলিত সর্বোচ্চ: `0.033`

`k` বেশি হলে শীর্ষ-১ এবং র্যাঙ্ক-১০-এর মধ্যকার **আপেক্ষিক পার্থক্য** কম হয়, ফলে অ্যালগরিদম শীর্ষ র্যাঙ্কের আত্মবিশ্বাসের চেয়ে **রিট্রিভাল সিস্টেমগুলোর মধ্যকার ঐকমত্যের** ওপর বেশি নির্ভর করে।

### কখন `k` পরিবর্তন করবেন

| লক্ষণ                                          | যা চেষ্টা করবেন                                                     |
| ---------------------------------------------- | ------------------------------------------------------------------- |
| শীর্ষ ফলাফল সবসময় জেতে, কিন্তু সেটি ভুল       | **কম** k (যেমন, 20) — শীর্ষ র্যাঙ্কের আত্মবিশ্বাস বেশি গুরুত্বপূর্ণ |
| সঠিক উত্তর শীর্ষ ৫-এ আছে, কিন্তু শীর্ষ ১-এ নয় | **বেশি** k (যেমন, 100) — সমতলতর স্কোরিং ঐকমত্যকে পুরস্কৃত করে       |
| রিকল বেশি, কিন্তু প্রিসিশন কম                  | **কম** k — র্যাঙ্কিংকে আরও তীক্ষ্ণ করুন                             |
| রিকল কম (প্রাসঙ্গিক ডকুমেন্ট বাদ পড়ছে)        | **বেশি** k — নিচু র্যাঙ্কের ডকুমেন্টগুলোকে সুযোগ দিন                |

### RRF ওয়েটিং

রেসিপ্রোকাল র্যাঙ্ক ফিউশন সেমান্টিক ভেক্টর র্যাঙ্ক এবং ফুল-টেক্সট সার্চ র্যাঙ্কের জন্য সমান ওজন ব্যবহার করে:

```
RRF(d) = 1/(k + rank_vector) + 1/(k + rank_fts)
```

পৃথক ওজন সমন্বয় করার জন্য কোনো এনভায়রনমেন্ট ভেরিয়েবল নেই (`MEMORY_RRF_VECTOR_WEIGHT`/`MEMORY_RRF_FTS_WEIGHT` বিদ্যমান নয়)।

---

## সারসংক্ষেপ কৌশল (v3.8.16+)

`সারসংক্ষেপ.ts` মডিউলটি (`src/lib/memory/summarization.ts`) স্মৃতি পুনরুদ্ধারের সক্ষমতা বজায় রেখে সক্রিয় সেটকে ছোট রাখতে পুরোনো মেমোরিগুলোকে সংকুচিত করে।

### কখন সারসংক্ষেপ চালু হয়

| ট্রিগার                           | থ্রেশহোল্ড (ডিফল্ট) |
| --------------------------------- | ------------------- |
| API-এর মাধ্যমে ম্যানুয়াল ট্রিগার | প্রযোজ্য নয়        |

### কী কী সারসংক্ষেপ করা হয়

`summarization.ts` থেকে দুটি এন্ট্রি পয়েন্ট এক্সপোর্ট করা হয়েছে:

- **`summarizeMemories(apiKeyId, sessionId?, maxTokens = 4000)`** — একটি সেশনের
  মেমোরিগুলোকে একটি একক সারসংক্ষেপ টেক্সটে সংকুচিত করে, যা একটি টোকেন বাজেটের মধ্যে সীমাবদ্ধ।
- **`summarizeMemoriesOlderThan(apiKeyId, days, dryRun)`** — API দ্বারা ব্যবহৃত
  বয়সভিত্তিক সংকোচন: এটি `days`-এর চেয়ে পুরোনো প্রতিটি মেমোরি নির্বাচন করে, সেগুলো থেকে
  একটি সংকুচিত সারসংক্ষেপ মেমোরি তৈরি করে এবং (`dryRun` যদি `false` হয়) মূল
  মেমোরিগুলো মুছে দেয়। কোনো কিছু পরিবর্তন না করেই প্রার্থী সেট ও মোট টোকেনের
  পূর্বরূপ দেখতে `dryRun: true` পাস করুন।

কোনো ট্যাগ/কী ক্লাস্টারিং ধাপ বা প্রতি-মেমোরি "মূল বনাম সারসংক্ষেপযোগ্য" স্কোরিং নেই —
নির্বাচন সম্পূর্ণভাবে বয়সের কাটঅফের ওপর নির্ভরশীল, এবং সারসংক্ষেপ টেক্সটটি প্রতিটি
প্রার্থীর জন্য একটি সংকুচিত, টাইপ-প্রিফিক্সযুক্ত লাইন।

### সারসংক্ষেপ ট্রিগার করা

সারসংক্ষেপ **ম্যানুয়াল / অপ্ট-ইন** — `autoSummarize` সেটিংটি ডিফল্টভাবে `false`,
তাই কোনো কিছু স্বয়ংক্রিয়ভাবে সংকুচিত হয় না। API-এর মাধ্যমে এটি ট্রিগার করুন:

```bash
curl -X POST http://localhost:20128/api/memory/summarize \
  -H "Authorization: Bearer $OMNIROUTE_KEY"
```

এটি বন্ধ রাখতে, শুধু `autoSummarize`-কে এর ডিফল্ট মানে (`false`) রাখুন।

### সারসংক্ষেপের গুণমান উন্নত করার পরামর্শ

- **প্রথমে `dryRun` দিয়ে পূর্বরূপ দেখুন** — `summarizeMemoriesOlderThan(..., true)`
  প্রার্থী তালিকা এবং মোট টোকেন সংখ্যা ফেরত দেয়, ফলে মূল মেমোরিগুলো মুছে ফেলার
  আগে কী কী একত্রিত হবে তা নিশ্চিত করতে পারবেন।
- **আপনার মেমোরি কর্পাস বড় হলে কম ট্রাফিকের সময় সারসংক্ষেপ চালান** — LLM কলটিই ধীর অংশ

```bash
# Cron-ধাঁচে: প্রতিদিন রাত ৩টায় সারসংক্ষেপ করুন
0 3 * * * curl -X POST http://localhost:20128/api/memory/summarize \
  -H "Authorization: Bearer $OMNIROUTE_KEY"
```

---

## MemoryBackend প্রোভাইডার প্যাটার্ন

> **মূল সত্যের উৎস:** `src/lib/memory/backend.ts`, `src/lib/memory/genericBackend.ts`, `src/lib/memory/manager.ts`
> **টেস্ট:** `src/lib/memory/__tests__/generic-backend.test.ts`

MemoryBackend প্রোভাইডার প্যাটার্ন বিদ্যমান মেমোরি ইঞ্জিনের ওপর একটি **প্লাগযোগ্য ব্যাকএন্ড অ্যাবস্ট্রাকশন স্তর** প্রবর্তন করে। একটি একক স্টোরেজ বাস্তবায়নের সঙ্গে আবদ্ধ থাকার পরিবর্তে, মেমোরি সিস্টেমটি এখন কনফিগারযোগ্য প্রাইমারি/ফলব্যাক রাউটিংসহ একাধিক ব্যাকএন্ড (SQLite, Obsidian, Notion, কাস্টম HTTP ব্যাকএন্ড) সমর্থন করে।

### আর্কিটেকচার

```
┌──────────────────────────────────────────────────────────┐
│                    API রুটসমূহ                            │
│            (src/app/api/memory/route.ts)                  │
└──────────────────────┬───────────────────────────────────┘
                       │
┌──────────────────────▼───────────────────────────────────┐
│                   MemoryManager                           │
│           সিঙ্গেলটন অর্কেস্ট্রেটর (manager.ts)             │
│                                                          │
│  প্রাইমারি ──► ব্যাকএন্ড A  (যেমন SQLite)                 │
│  ফলব্যাক   ──► ব্যাকএন্ড B  (যেমন Obsidian)               │
│                ব্যাকএন্ড C  (যেমন GenericBackend-এর মাধ্যমে Notion) │
└──────────────────────┬───────────────────────────────────┘
                       │
        ┌──────────────┼──────────────┐
        ▼              ▼              ▼
┌────────────┐ ┌────────────┐ ┌──────────────────┐
│ SQLite     │ │ Obsidian   │ │ GenericMemory    │
│ ব্যাকএন্ড   │ │ ব্যাকএন্ড   │ │ ব্যাকএন্ড (HTTP) │
└────────────┘ └────────────┘ └──────────────────┘
```

#### মূল ইন্টারফেস (`backend.ts`)

প্রতিটি ব্যাকএন্ডকে অবশ্যই `MemoryBackend` ইন্টারফেস বাস্তবায়ন করতে হবে:

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

  // অনুসন্ধান
  search(config: SearchConfig): Promise<Memory[]>;

  // স্বাস্থ্য
  health(): Promise<HealthCheckResult>;

  // জীবনচক্র (ঐচ্ছিক)
  initialize?(): Promise<void>;
  shutdown?(): Promise<void>;
}
```

#### MemoryManager (`manager.ts`)

সিঙ্গেলটন অর্কেস্ট্রেটর, যা:

- `register(backend)`-এর মাধ্যমে ব্যাকএন্ড **নিবন্ধন** করে — বুটের সময় `index.ts` থেকে কল করা হয়
- `configure(primary, fallbacks)`-এর মাধ্যমে প্রাইমারি + ফলব্যাক **কনফিগার** করে
- ব্যর্থ হলে ফলব্যাক চেইন ব্যবহার করে CRUD/অনুসন্ধান প্রাইমারিতে **রাউট** করে
- পর্যায়ক্রমে সব ব্যাকএন্ডের **স্বাস্থ্য পরীক্ষা** করে

**ফলব্যাক আচরণ:**

| অপারেশন  | প্রাইমারি                      | ফলব্যাকসমূহ                   |
| -------- | ------------------------------ | ----------------------------- |
| `create` | ✅ কেবল প্রাইমারি              | ❌                            |
| `get`    | ✅ প্রথমে প্রাইমারি চেষ্টা করে | ✅ null হলে ফলব্যাক           |
| `update` | ✅ কেবল প্রাইমারি              | ✅ ফায়ার-অ্যান্ড-ফরগেট সিঙ্ক |
| `delete` | ✅ কেবল প্রাইমারি              | ✅ ফায়ার-অ্যান্ড-ফরগেট সিঙ্ক |
| `list`   | ✅ কেবল প্রাইমারি              | ❌                            |
| `search` | ✅ প্রথমে প্রাইমারি            | ✅ ত্রুটি হলে ফলব্যাক         |

#### GenericMemoryBackend (`genericBackend.ts`)

একটি সাধারণ HTTP সংযোগকারী, যা যেকোনো REST API-কে MemoryBackend-এ অভিযোজিত করে। এটি যেসব ক্ষেত্রে উপযোগী:

- **Notion** — Notion API-এর মাধ্যমে সংযোগ করুন
- **Obsidian** — Obsidian Local REST API-এর মাধ্যমে সংযোগ করুন
- **কাস্টম ব্যাকএন্ড** — RESTful মেমোরি API প্রকাশ করে এমন যেকোনো পরিষেবা

**কনফিগারেশন:**

```typescript
interface GenericBackendConfig {
  baseUrl: string;           // ব্যাকএন্ড API-এর বেস URL
  apiKey?: string;           // প্রমাণীকরণের জন্য Bearer টোকেন
  headers?: Record<string, string>;  // কাস্টম HTTP হেডার
  timeout?: number;          // অনুরোধের সময়সীমা (ডিফল্ট: 30000ms)
  backendType?: string;      // লগিংয়ের জন্য

  // এন্ডপয়েন্ট ওভাররাইড (ডিফল্টে REST রীতিনীতি ব্যবহৃত হয়)
  endpoints?: {
    search?: string;   // ডিফল্ট: "/memories/search"
    create?: string;   // ডিফল্ট: "/memories"
    list?: string;     // ডিফল্ট: "/memories"
    get?: string;      // ডিফল্ট: "/memories/{id}"
    update?: string;   // ডিফল্ট: "/memories/{id}"
    delete?: string;   // ডিফল্ট: "/memories/{id}"
    health?: string;   // ডিফল্ট: "/health"
  };

  // কোয়েরি প্যারামিটারের নামের ম্যাপিং
  queryParams?: {
    query?/apiKeyId?/limit?/offset?/strategy?/maxTokens?/type?/sessionId?/orderBy?/orderDir?/options?
  };

  // পাথ প্যারামিটারের নামের ম্যাপিং
  pathParams?: {
    id?/memoryId?
  };
}
```

**পরিচিত ব্যাকএন্ডগুলো** `KNOWN_BACKENDS`-এ আগে থেকেই কনফিগার করা আছে:

```typescript
createKnownBackend("obsidian"); // → localhost:27123-এর দিকে নির্দেশিত GenericMemoryBackend
createKnownBackend("notion"); // → api.notion.com/v1-এর দিকে নির্দেশিত GenericMemoryBackend
```

#### বিল্ট-ইন ব্যাকএন্ড

##### SQLiteBackend (`sqliteBackend.ts`)

ডিফল্ট প্রাথমিক ব্যাকএন্ড। `src/lib/memory/store.ts` ব্যবহার করে বিদ্যমান SQLite-ভিত্তিক মেমরি স্টোরকে আবৃত করে। বুটের সময় স্বয়ংক্রিয়ভাবে নিবন্ধিত হয়।

```typescript
import { sqliteBackend } from "./sqliteBackend";
memoryManager.register(sqliteBackend);
```

##### ObsidianBackend (`obsidianBackend.ts`)

বিদ্যমান Obsidian ইন্টিগ্রেশনকে (`src/lib/memory/obsidianBackend.ts`) আবৃত করে। Obsidian Local REST API-এর মাধ্যমে একটি Obsidian vault-এর সঙ্গে সংযোগ স্থাপন করে।

### সেটিংস

মেমরি ব্যাকএন্ডের সেটিংস অ্যাপের সেটিংস টেবিলে সংরক্ষিত থাকে এবং `src/lib/memory/settings.ts`-এর মাধ্যমে পরিচালিত হয়:

| সেটিং              | এনভায়রনমেন্ট/কনফিগ কী   | ডিফল্ট     | বিবরণ                            |
| ------------------ | ------------------------ | ---------- | -------------------------------- |
| প্রাথমিক ব্যাকএন্ড | `memoryPrimaryBackend`   | `"sqlite"` | প্রাথমিক ব্যাকএন্ডের ID          |
| ফলব্যাক ব্যাকএন্ড  | `memoryFallbackBackends` | `[]`       | ক্রমানুসারে ফলব্যাক ব্যাকএন্ড ID |
| ব্যাকএন্ড কনফিগ    | `memoryBackendConfigs`   | `{}`       | প্রতি-ব্যাকএন্ড কনফিগ ওভাররাইড   |

সেটিংস `normalizeMemorySettings()`-এর মাধ্যমে স্বাভাবিকীকরণ করা হয় এবং `getMemorySettings()`-এ ক্যাশ করা হয়।

### ইনিশিয়ালাইজেশন প্রবাহ

```
অ্যাপ বুটস্ট্র্যাপ
  → index.ts ইমপোর্ট (পার্শ্বপ্রতিক্রিয়া): SQLiteBackend নিবন্ধন করে
  → অ্যাপের লাইফসাইকেল থেকে initMemoryBackends() কল করা হয়:
      1. সেটিংস লোড করা (getMemorySettings)
      2. প্রাথমিক + ফলব্যাক কনফিগার করা
      3. সব ব্যাকএন্ড ইনিশিয়ালাইজ করা (স্বাস্থ্য পরীক্ষা)
      4. অনুরোধের জন্য প্রস্তুত
```

### নতুন ব্যাকএন্ড যোগ করা

1. `src/lib/memory/<name>Backend.ts`-এ **`MemoryBackend` বাস্তবায়ন করুন**
2. `src/lib/memory/index.ts` থেকে **এক্সপোর্ট করুন**
3. বুটের সময় `memoryManager.register(yourBackend)` দিয়ে **নিবন্ধন করুন**
4. সেটিংসের মাধ্যমে **কনফিগার করুন**: `memoryPrimaryBackend`-কে আপনার ব্যাকএন্ড ID-তে সেট করুন
5. রেফারেন্স হিসেবে `src/lib/memory/__tests__/generic-backend.test.ts` ব্যবহার করে **পরীক্ষা করুন**

#### উদাহরণ: Brain ব্যাকএন্ড

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

### যাচাইকরণ

#### ইউনিট টেস্ট

```bash
npx vitest run src/lib/memory/__tests__/generic-backend.test.ts --reporter=verbose
```

প্রত্যাশিত আউটপুট: নিম্নলিখিত বিষয়গুলো অন্তর্ভুক্ত করে **35টি টেস্ট, সবগুলো পাস করবে**:

- কনস্ট্রাক্টর (2)
- স্বাস্থ্য পরীক্ষা (4) — সফলতা, ব্যর্থতা 500, নেটওয়ার্ক ত্রুটি, বিলম্ব
- ইনিশিয়ালাইজ (2) — সফলতা, ব্যর্থতা
- তৈরি (2) — ডিফল্ট এন্ডপয়েন্ট, কাস্টম এন্ডপয়েন্ট
- প্রাপ্তি (4) — সফলতা, 404 → null, 404 ছাড়া অন্য ক্ষেত্রে throw, কাস্টম পাথ প্যারামিটার
- আপডেট (2) — সফলতা, 404 → false
- মুছে ফেলা (2) — সফলতা, 404 → false
- তালিকা (2) — কোয়েরি প্যারামিটার, কাস্টম প্যারামিটার নাম
- অনুসন্ধান (3) — কোয়েরি প্যারামিটার, কাস্টম এন্ডপয়েন্ট, অপশন সিরিয়ালাইজেশন
- প্রমাণীকরণ হেডার (2) — Bearer টোকেন, কাস্টম হেডার
- ফ্যাক্টরি (1)

#### টাইপ পরীক্ষা

```bash
npm run typecheck:core
```

প্রত্যাশিত ফলাফল: **0টি ত্রুটি**।
