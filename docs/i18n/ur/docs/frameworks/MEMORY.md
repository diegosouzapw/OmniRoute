# Memory System (اردو)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/MEMORY.md) · 🇪🇹 [am](../../../am/docs/frameworks/MEMORY.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/MEMORY.md) · 🇦🇿 [az](../../../az/docs/frameworks/MEMORY.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/MEMORY.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/MEMORY.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/MEMORY.md) · 🇩🇰 [da](../../../da/docs/frameworks/MEMORY.md) · 🇩🇪 [de](../../../de/docs/frameworks/MEMORY.md) · 🇬🇷 [el](../../../el/docs/frameworks/MEMORY.md) · 🇪🇸 [es](../../../es/docs/frameworks/MEMORY.md) · 🇪🇪 [et](../../../et/docs/frameworks/MEMORY.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/MEMORY.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/MEMORY.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/MEMORY.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/MEMORY.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/MEMORY.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/MEMORY.md) · 🇮🇱 [he](../../../he/docs/frameworks/MEMORY.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/MEMORY.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/MEMORY.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/MEMORY.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/MEMORY.md) · 🇮🇩 [id](../../../id/docs/frameworks/MEMORY.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/MEMORY.md) · 🇮🇹 [it](../../../it/docs/frameworks/MEMORY.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/MEMORY.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/MEMORY.md) · 🇰🇭 [km](../../../km/docs/frameworks/MEMORY.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/MEMORY.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/MEMORY.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/MEMORY.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/MEMORY.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/MEMORY.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/MEMORY.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/MEMORY.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/MEMORY.md) · 🇲🇲 [my](../../../my/docs/frameworks/MEMORY.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/MEMORY.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/MEMORY.md) · 🇳🇴 [no](../../../no/docs/frameworks/MEMORY.md) · 🇮🇳 [or](../../../or/docs/frameworks/MEMORY.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/MEMORY.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/MEMORY.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/MEMORY.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/MEMORY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/MEMORY.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/MEMORY.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/MEMORY.md) · 🇱🇰 [si](../../../si/docs/frameworks/MEMORY.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/MEMORY.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/MEMORY.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/MEMORY.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/MEMORY.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/MEMORY.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/MEMORY.md) · 🇮🇳 [te](../../../te/docs/frameworks/MEMORY.md) · 🇹🇭 [th](../../../th/docs/frameworks/MEMORY.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/MEMORY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/MEMORY.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/MEMORY.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/MEMORY.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/MEMORY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/MEMORY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/MEMORY.md)

---

> **مستند ماخذ:** `src/lib/memory/` اور `src/app/api/memory/`
> **آخری بار اپ ڈیٹ کیا گیا:** 2026-06-28 — v3.8.40 (بطور ڈیفالٹ غیر فعال + int8 کوانٹائزیشن کی تکمیل)

OmniRoute، API کلید (اور اختیاری طور پر سیشن آئی ڈی) سے وابستہ مستقل مکالماتی میموری فراہم کرتا ہے۔ ہلکے پھلکے regex پیٹرن میچنگ کے ذریعے LLM جوابات سے یادداشتیں خودکار طور پر اخذ کی جاتی ہیں اور بعد کی درخواستوں میں ابتدائی سسٹم پیغام کے طور پر دوبارہ شامل کر دی جاتی ہیں (یا ان فراہم کنندگان کے لیے پہلے صارف پیغام کے طور پر جو سسٹم رول کو مسترد کرتے ہیں)۔

> **میموری بطور ڈیفالٹ غیر فعال ہے (v3.8.30+)۔** `DEFAULT_MEMORY_SETTINGS.enabled`
> اب `false` ہے (`src/lib/memory/settings.ts`)۔ میموری فعال کرنے سے حاصل کردہ سیاق و سباق کے
> `maxTokens` (~2k) تک **ہر** چیٹ درخواست میں شامل ہوتے ہیں، جن کی قیمت وصول کی جاتی ہے —
> یہ نئی تنصیبات اور اپنا سیاق و سباق خود منظم کرنے والے کلائنٹس کے لیے ایک غیر متوقع لاگت ہے۔
> **Settings → Memory** کے تحت واضح طور پر رضامندی دے کر اسے فعال کریں (میموری فعال ہونے پر
> `MemorySkillsTab` ٹوکن لاگت سے متعلق انتباہی کال آؤٹ دکھاتا ہے)۔
> کوئی کلائنٹ `x-omniroute-no-memory` درخواست ہیڈر (`true`/`1`/`yes`) کے ذریعے کسی ایک
> درخواست کو اس سے خارج کر سکتا ہے — [API_REFERENCE.md](../reference/API_REFERENCE.md) میں
> درخواست کے ہیڈرز کی جدول دیکھیں۔ میموری کے بغیر درخواست `memoryOwnerId = null` مقرر کرتی ہے،
> جو اس درخواست کے لیے میموری اور اسکل انجیکشن **دونوں** کو غیر فعال کر دیتا ہے
> (`open-sse/handlers/chatCore/headers.ts::isNoMemoryRequested`)۔

میموری کی **حد بندی فی API کلید** ہوتی ہے، فی صارف نہیں — ایک ہی API کلید سے تصدیق شدہ ہر درخواست ایک ہی میموری پول کا اشتراک کرتی ہے، جسے اختیاری طور پر `sessionId` کے ذریعے مزید محدود کیا جا سکتا ہے۔

## معماری

```
کلائنٹ → /v1/chat/completions (apiKeyInfo کو پہلے کے مرحلے میں حل کیا گیا)
  → handleChatCore() [open-sse/handlers/chatCore.ts]
    → resolveMemoryOwnerId(apiKeyInfo)        # آئی ڈی اخذ کرتا ہے
    → getMemorySettings()                     # کیش شدہ ترتیبات
    → shouldInjectMemory(body, {enabled})     # کنٹرول گیٹ
    → retrieveMemories(apiKeyId, config)      # SQL + FTS5 + اختیاری ویکٹر
    → injectMemory(body, memories, provider)  # سسٹم یا صارف پیغام
  → اپ اسٹریم فراہم کنندہ کو کال
  → جواب پر: extractFacts(text, apiKeyId, sessionId)  # نان بلاکنگ
    → setImmediate → ہر میچ کے لیے createMemory(fact)
                   → embed(content) + upsertVector(id, vec)
```

انجیکشن اور اخذ کرنے کے کال سائٹس
`open-sse/handlers/chatCore.ts` میں منسلک ہیں (`retrieveMemories`، `injectMemory`،
اور `extractFacts` تلاش کریں)۔

## انجن کی معماری (3-درجاتی ریزولیوشن)

Memory Engine دستیاب انفراسٹرکچر اور ترتیبات کی بنیاد پر رن ٹائم کے دوران بازیافت کا راستہ طے کرتا ہے۔ تین درجے موجود ہیں، جنہیں ترجیحی ترتیب سے لاگو کیا جاتا ہے:

```
  ┌─────────────────────────────────────────────────────────────┐
  │  درجہ 0 — کلیدی لفظ (FTS5)                                  │
  │  پروب پر مبنی دستیابی: جب SQLite بلڈ اسے سپورٹ کرے تو FTS5  │
  │  (better-sqlite3 / node:sqlite / bun:sqlite)؛ FTS5 کے بغیر  │
  │  بلڈز پر دستیاب نہیں (مثلاً sql.js/WASM —                   │
  │  "no such module: fts5")۔ جب strategy = "exact" ہو یا       │
  │  متبادل کے طور پر استعمال ہوتا ہے؛ engine-status keyword    │
  │  پروب کے نتیجے کی عکاسی کرتا ہے۔                            │
  └──────────────────────────────────┬──────────────────────────┘
                                     │ strategy = semantic|hybrid؟
                                     ▼
  ┌─────────────────────────────────────────────────────────────┐
  │  درجہ 1 — ایمبیڈڈ ویکٹر (sqlite-vec)                        │
  │  sqlite-vec v0.1.9 کو db.loadExtension() کے ذریعے لوڈ کیا   │
  │  جاتا ہے۔ Float32 ویکٹرز پر KNN بروٹ فورس۔ فعال جب:         │
  │   • sqlite-vec loadExtension کامیاب ہو                       │
  │   • کوئی ایمبیڈنگ ماخذ دستیاب ہو (remote | static |         │
  │     transformers) جو Float32Array بنا سکے                    │
  │   • vec_memories جدول موجود ہو (پہلے ready() پر تخلیق شدہ)  │
  └──────────────────────────────────┬──────────────────────────┘
                                     │ qdrant.enabled؟
                                     ▼
  ┌─────────────────────────────────────────────────────────────┐
  │  درجہ 2 — Qdrant (آپٹ اِن بیرونی ویکٹر ڈیٹابیس)             │
  │  فعال ہونے پر semantic/hybrid کے لیے sqlite-vec کی جگہ لیتا │
  │  ہے۔ چلتا ہوا Qdrant انسٹینس + ترتیب شدہ host/port درکار۔   │
  └─────────────────────────────────────────────────────────────┘
```

تنزلی خودکار اور شفاف ہے:

- اگر sqlite-vec لوڈ ہونے میں ناکام ہو جائے تو درجہ 1 دستیاب نہیں رہتا → درجہ 0 پر واپس چلا جاتا ہے۔
- اگر ایمبیڈنگ ماخذ کوئی خرابی واپس کرے تو درجہ 1، درجہ 0 پر واپس چلا جاتا ہے۔
- اگر Qdrant درست حالت میں نہ ہو تو درجہ 2، درجہ 1 پر واپس چلا جاتا ہے (یا اگر درجہ 1 بھی دستیاب نہ ہو تو درجہ 0 پر)۔

## ایمبیڈنگ کے ذرائع

ایمبیڈنگ لیئر (`src/lib/memory/embedding/`) یہ طے کرتی ہے کہ کون سا ذریعہ استعمال کیا جائے، جس کی بنیاد `MemorySettingsExtended.embeddingSource` پر ہوتی ہے:

| ذریعہ          | تفصیل                                                                          | کلید درکار ہے | کولڈ اسٹارٹ      |
| -------------- | ------------------------------------------------------------------------------ | ------------- | ---------------- |
| `remote`       | تشکیل شدہ فراہم کنندہ کی ایمبیڈنگ API (OpenAI، Cohere وغیرہ) استعمال کرتا ہے   | ہاں           | کوئی نہیں        |
| `static`       | `potion-base-8M` کے ذریعے مقامی لُک اَپ ٹیبل ایمبیڈنگ (WordPiece + اوسط پولنگ) | نہیں          | ~200ms           |
| `transformers` | `@huggingface/transformers` v4، `all-MiniLM-L6-v2` کے ذریعے مقامی ONNX انفرنس  | نہیں          | ~3s + ~400MB RAM |
| `auto`         | رن ٹائم ریزولیوشن: remote (اگر کلید موجود ہو) → static → transformers → null   | منحصر ہے      | منحصر ہے         |

**`auto` کے لیے ریزولیوشن کی ترتیب:**

1. `listEmbeddingProviders()` میں پہلا ایسا فراہم کنندہ تلاش کریں جس کے لیے `hasKey === true` ہو → `remote`۔
2. اگر `settings.staticEnabled === true` ہو → `static`۔
3. اگر `settings.transformersEnabled === true` ہو → `transformers`۔
4. بصورت دیگر → `null` (FTS5 کلیدی لفظ کی تلاش تک محدود ہو جاتا ہے)۔

ایمبیڈنگ کیش (`src/lib/memory/embedding/cache.ts`) ایک اِن میموری
LRU میپ استعمال کرتا ہے، جس کی کلید `${source}:${model}:${dim}:${sha256(text)}` ہوتی ہے، اور جو
`MEMORY_EMBEDDING_CACHE_MAX` اندراجات (ڈیفالٹ 1000) تک محدود ہے، جس کا TTL
`MEMORY_EMBEDDING_CACHE_TTL_MS` (ڈیفالٹ 5 منٹ) ہے۔ یہ فی پروسیس لائف سائیکل
تمام کالرز کے درمیان مشترک ہوتا ہے۔

## ہائبرڈ RRF (k=60)

جب `strategy = "hybrid"` ہو اور ویکٹر اسٹور دستیاب ہو، تو بازیافت
FTS5 اور ویکٹر نتائج کو ضم کرنے کے لیے Reciprocal Rank Fusion استعمال کرتی ہے:

```
RRF(d) = Σ  1 / (k + rank_i(d))      جہاں k = 60 ہے (MEMORY_RRF_K کے ذریعے قابلِ تشکیل)
          i
```

عملی طور پر:

1. FTS5 تلاش چلائیں → درجہ بند فہرست `R_fts` (پوزیشن 1..N)۔
2. KNN ویکٹر تلاش چلائیں → درجہ بند فہرست `R_vec` (پوزیشن 1..M)۔
3. ہر منفرد `memoryId` کے لیے:  
   `rrf_score = 1/(60 + fts_rank)` + `1/(60 + vec_rank)` (اگر فہرست میں نہ ہو تو 0)۔
4. `rrf_score` کے لحاظ سے نزولی ترتیب میں مرتب کریں، پھر ٹوکن بجٹ واک لاگو کریں۔

RRF مختلف نوعیت کے بازیافتی نظاموں میں اسکور نارملائزیشن کی ضرورت کے بغیر
موثر ہونے کے لیے معروف ہے۔ ڈیفالٹ `k=60` اصل
Cormack وغیرہ کے مقالے سے لیا گیا ہے اور چھوٹے کارپس (<10k میموریز) کے لیے اچھی طرح کام کرتا ہے۔

## بیک فل (لیزی + ری انڈیکس)

جب ایمبیڈنگ ماڈل تبدیل ہوتا ہے (`embedding_signature` کے ذریعے پتہ چلتا ہے)، تو
ویکٹر اسٹور دوبارہ بنایا جاتا ہے اور تمام موجودہ میموریز کو `memories` ٹیبل میں
`needs_reindex = 1` کے طور پر نشان زد کیا جاتا ہے۔

**لیزی بیک فل**: اگلی بازیافت کے وقت، ویکٹر اندراج سے محروم کسی بھی میموری کو
تلاش چلنے سے پہلے ایمبیڈ کر کے `vec_memories` میں داخل کیا جاتا ہے۔ اس طرح
اسٹارٹ اَپ کو بلاک کیے بغیر حقیقی درخواستوں میں بیک فل کی لاگت تقسیم ہو جاتی ہے۔

**واضح ری انڈیکس**: `/dashboard/memory` میں Engine ٹیب ایک
"ابھی ری انڈیکس کریں" بٹن فراہم کرتا ہے، جو `POST /api/memory/reindex` کو کال کرتا ہے۔ ہینڈلر
`src/lib/memory/reindex.ts` سے `runReindexBatch()` کو کال کرتا ہے، جو فی درخواست
زیادہ سے زیادہ `limit` زیرِ التوا اندراجات پر کارروائی کرتا ہے۔ پیش رفت کو
`GET /api/memory/engine-status` (`vectorStore.needsReindex`) کے ذریعے پول کیا جا سکتا ہے۔

`memory_vec_meta` ٹیبل (مائیگریشن `083_memory_vec.sql`) درج ذیل کو محفوظ کرتا ہے:

- `active_dim` — موجودہ ویکٹر ڈائمینشن (null = ابھی کیلیبریٹ نہیں ہوئی)۔
- `embedding_signature` — تبدیلیوں کا پتہ لگانے کے لیے استعمال ہونے والا `${source}:${model}:${dim}`۔
- `last_reset_at` — آخری مکمل ری سیٹ کا ٹائم اسٹیمپ۔
- `vec_loaded` — یہ بتانے والا 0/1 فلیگ کہ آیا sqlite-vec کامیابی سے لوڈ ہوا۔

## ترتیبات کی توسیع

`MemorySettingsExtended` میں نو embedding اور vector فیلڈز دستیاب ہیں، جو
`src/shared/schemas/memory.ts` میں موجود ہیں اور `src/lib/db/settings.ts` کے ذریعے محفوظ کیے جاتے ہیں:

| فیلڈ                     | قسم                                                | ڈیفالٹ   | وضاحت                                                                |
| ------------------------ | -------------------------------------------------- | -------- | -------------------------------------------------------------------- |
| `embeddingSource`        | `"remote" \| "static" \| "transformers" \| "auto"` | `"auto"` | استعمال کیے جانے والے embedding ماخذ کا تعین                         |
| `embeddingProviderModel` | `string \| null`                                   | `null`   | `provider/model` فارمیٹ میں provider/model                           |
| `customBaseUrl`          | `string \| null`                                   | `null`   | صرف Memory کے لیے OpenAI سے مطابقت رکھنے والے endpoint کا بنیادی URL |
| `customModelId`          | `string \| null`                                   | `null`   | حسبِ ضرورت endpoint کو بھیجی جانے والی model ID                      |
| `transformersEnabled`    | `boolean`                                          | `false`  | Transformers.js (MiniLM، ~400MB) کے لیے اختیاری شمولیت               |
| `staticEnabled`          | `boolean`                                          | `false`  | مقامی static potion-base-8M model کے لیے اختیاری شمولیت              |
| `rerankEnabled`          | `boolean`                                          | `false`  | دوبارہ درجہ بندی کا مرحلہ فعال کریں (+200-500ms/req کا اضافہ)        |
| `rerankProviderModel`    | `string \| null`                                   | `null`   | `provider/model` فارمیٹ میں دوبارہ درجہ بندی کا provider/model       |
| `vectorStore`            | `"sqlite-vec" \| "qdrant" \| "auto"`               | `"auto"` | استعمال کیے جانے والے vector backend کا تعین                         |

یہ `GET /PUT /api/settings/memory` کے ذریعے دستیاب ہیں (schema `MemorySettingsExtendedSchema`)۔

`remote` ماخذ کے لیے، Memory اختیاری `customBaseUrl` اور
`customModelId` ترتیبات بھی قبول کرتا ہے۔ یہ دونوں مل کر عالمی embedding registry کو تبدیل کیے بغیر OpenAI سے مطابقت رکھنے والے `/embeddings`
endpoint اور model کا انتخاب کرتے ہیں۔ استعمال سے پہلے endpoint کو
معیاری بنایا جاتا ہے اور provider کی outbound URL پالیسی کے تحت جانچا جاتا ہے: HTTP(S)
لازمی ہے، شامل کردہ اسناد اور query strings مسترد کر دی جاتی ہیں، اور cloud-metadata
پتے بدستور مسدود رہتے ہیں۔ خالی اقدار منتخب کردہ registry provider کو برقرار رکھتی ہیں۔ dashboard کو
واپس بھیجی جانے والی خرابیاں صاف کی جاتی ہیں اور endpoint کی اسناد کبھی log نہیں کی جاتیں۔

> **TODO (D20):** `global` دائرۂ کار (تمام API keys کے درمیان memories کا اشتراک) اس
> ریلیز میں نافذ نہیں کیا گیا۔ اس کے لیے schema میں تبدیلیاں اور عالمی retrieval
> راستہ درکار ہے۔ اسے الگ سے ٹریک کریں۔

## اسٹوریج کی تہیں

### بنیادی: SQLite (`memories` ٹیبل)

migration `015_create_memories.sql` کے ذریعے بنائی گئی:

| کالم                        | قسم                | نوٹس                                                                                 |
| --------------------------- | ------------------ | ------------------------------------------------------------------------------------ |
| `id`                        | `TEXT PRIMARY KEY` | `crypto.randomUUID()` کے ذریعے تیار کردہ UUID                                        |
| `api_key_id`                | `TEXT NOT NULL`    | ملکیت رکھنے والی API key                                                             |
| `session_id`                | `TEXT`             | اختیاری، فی گفتگو دائرۂ کار                                                          |
| `type`                      | `TEXT NOT NULL`    | `factual`، `episodic`، `procedural`، `semantic` میں سے ایک                           |
| `key`                       | `TEXT`             | مستحکم upsert key، مثلاً `preference:i_prefer_python`                                |
| `content`                   | `TEXT NOT NULL`    | اصل حقیقت کا متن                                                                     |
| `metadata`                  | `TEXT`             | JSON blob (category، extractedAt، source، ...)                                       |
| `created_at` / `updated_at` | `TEXT`             | ISO 8601 strings                                                                     |
| `expires_at`                | `TEXT`             | اختیاری میعاد؛ `NULL` کا مطلب مستقل ہے                                               |
| `memory_id`                 | `INTEGER UNIQUE`   | UUIDs ↔ FTS5 rowids کو جوڑنے کے لیے `023_fix_memory_fts_uuid.sql` کے ذریعے شامل کردہ |

Indexes: `api_key_id`، `session_id`، `type`، `expires_at`، نیز منفرد
`memory_id` index۔

**Upsert کی معنویت**: `createMemory()` اسی
`(api_key_id, key)` کے ساتھ موجود row تلاش کرتا ہے اور ملنے پر اسے اسی جگہ update کر دیتا ہے (`metadata` کو
shallow spread کے ذریعے merge کرتے ہوئے)۔ اس سے ترجیحات کے بار بار دہرائے جانے والے
بیانات کی وجہ سے ٹیبل کی لامحدود توسیع رکتی ہے۔

### مکمل متنی تلاش (`memory_fts` ورچوئل ٹیبل)

`022_add_memory_fts5.sql`، `content` اور
`key` پر ایک FTS5 ورچوئل ٹیبل بناتا ہے۔ `023_fix_memory_fts_uuid.sql` عملی استعمال میں سامنے آنے والے اس bug کو درست کرتا ہے جس میں UUID
primary key، FTS5 کے integer rowid کے ساتھ join نہیں ہوتی تھی — migration
`memory_id` کالم شامل کرتی ہے، FTS ٹیبل دوبارہ بناتی ہے، اور triggers
(`memory_fts_ai`، `memory_fts_ad`، `memory_fts_au`) کو منسلک کرتی ہے جو INSERT، DELETE، اور UPDATE پر
FTS کو ہم آہنگ رکھتے ہیں۔

`retrieval.ts` اسے `semantic` اور `hybrid` حکمتِ عملیوں کے لیے استعمال کرتا ہے (ذیل میں دیکھیں)۔
retrieval کوڈ `hasTable("memory_fts")` کے ذریعے تحفظ فراہم کرتا ہے اور اگر FTS ٹیبل موجود نہ ہو یا FTS query میں خرابی آئے تو
تاریخی ترتیب پر واپس چلا جاتا ہے۔

### اختیاری: Qdrant (vector store کی سطح 2)

`src/lib/memory/qdrant.ts`، سطح 2
vector store کے طور پر اختیاری Qdrant انضمام نافذ کرتا ہے۔ Retrieval صرف اس وقت Qdrant کی طرف بھیجا جاتا ہے جب engine selector
`memoryVectorStore === "qdrant"` ہو — ڈیفالٹ `"auto"` (اور `"sqlite-vec"`)
Qdrant کو **کبھی** منتخب نہیں کرتے۔ Engine-tab toggle، `qdrantEnabled` اور
`memoryVectorStore` **دونوں** کو ایک ساتھ سیٹ کرتا ہے: فعال کرنے پر Qdrant بنیادی store بن جاتا ہے، جبکہ غیر فعال کرنے پر
یہ `"auto"` پر reset ہو جاتا ہے (#5597 — اس اصلاح سے پہلے فعال کرنا بے اثر تھا کیونکہ کوئی چیز
engine selector نہیں لکھتی تھی)۔ اگر Qdrant ناقابلِ رسائی ہو یا کچھ واپس نہ کرے تو retrieval
sqlite-vec → FTS5 پر واپس چلا جاتا ہے۔

- `upsertSemanticMemoryPoint()` — ترتیب شدہ embedding ماڈل کے ساتھ `key + content` کو embed کرتا ہے، یقینی بناتا ہے کہ collection موجود ہو (پہلی بار استعمال پر cosine-distance vectors بناتا ہے)، اور payload `{memoryId,
apiKeyId, sessionId, key, content, metadata, createdAtUnix, expiresAtUnix}` کے ساتھ ایک point کو upsert کرتا ہے۔
- `searchSemanticMemory(query, topK, scope)` — query کو embed کرتا ہے، `kind = "omniroute_memory"` کے ذریعے filter کردہ collection میں تلاش کرتا ہے اور اختیاری طور پر
  `apiKeyId` / `sessionId` کے ذریعے بھی۔ `topK` کو `[1, 20]` تک محدود کرتا ہے۔
- `deleteSemanticMemoryPoint(id)` — ایک point کو حذف کرتا ہے۔ SQLite row ہٹائے جانے کے بعد
  `deleteMemory()` اسے کال کرتا ہے (D15)۔
- `cleanupSemanticMemoryPoints({retentionDays})` — ان points کو bulk میں حذف کرتا ہے جن کا
  `expiresAtUnix` گزر چکا ہو یا جن کا `createdAtUnix`، retention cutoff سے پرانا ہو۔
  پہلے گنتی کرتا ہے تاکہ dashboard اصل اعداد دکھا سکے۔
- `checkQdrantHealth()` — latency کے ساتھ `GET /readyz` health probe۔

Settings UI، `/dashboard/memory` کے **Engine tab** میں Qdrant config، health check، semantic search test،
اور cleanup فراہم کرتا ہے۔ `src/app/api/settings/qdrant/` کے تحت متعلقہ
routes، v3.8.6 تک، سب منسلک ہیں:

| Route                                   | طریقہ         | وضاحت                               |
| --------------------------------------- | ------------- | ----------------------------------- |
| `/api/settings/qdrant`                  | `GET` / `PUT` | Qdrant settings پڑھیں / اپ ڈیٹ کریں |
| `/api/settings/qdrant/health`           | `GET`         | Liveness probe + latency            |
| `/api/settings/qdrant/search`           | `POST`        | Semantic search test                |
| `/api/settings/qdrant/cleanup`          | `POST`        | میعاد ختم شدہ / پرانے points ہٹائیں |
| `/api/settings/qdrant/embedding-models` | `GET`         | دستیاب embedding models کی فہرست    |

**رویہ سے متعلق نوٹس (کیا توقع کریں):**

- **Engine کا انتخاب** — Engine tab میں Qdrant کو فعال کرنے سے یہ بنیادی
  store بن جاتا ہے (`memoryVectorStore="qdrant"` سیٹ ہوتا ہے)؛ اسے غیر فعال کرنے سے قدر دوبارہ `"auto"` ہو جاتی ہے (#5597)۔
- **کوئی back-fill نہیں** — صرف وہ memories جو Qdrant فعال ہونے کے **بعد** بنائی/اپ ڈیٹ کی جائیں
  اس میں لکھی جاتی ہیں (fire-and-forget dual-write)۔ پہلے سے موجود SQLite memories کو **منتقل نہیں**
  کیا جاتا؛ "Reindex Now" صرف sqlite-vec index دوبارہ بناتا ہے، Qdrant کو نہیں۔
- **Vector dimension خودکار طور پر معلوم کیا جاتا ہے**، یعنی پہلے استعمال پر حقیقی embedding سے — پُر کرنے کے لیے
  کوئی dimension field نہیں ہے۔ Collection کے وجود میں آنے کے بعد embedding model تبدیل کرنا
  خودکار طور پر **handle نہیں** ہوتا: موجودہ collection میں کوئی تبدیلی نہیں کی جاتی، dimension-
  mismatched writes/searches ناکام ہو کر sqlite-vec پر واپس آتے ہیں۔ Embedder تبدیل کرنے کے لیے collection
  دوبارہ بنائیں (نیا نام استعمال کریں، یا Qdrant میں اسے حذف کریں)۔
- **Distance metric** — ہمیشہ **Cosine** (collection بنانے کے وقت hardcoded؛
  قابلِ ترتیب نہیں)۔
- **Auth** — صرف API key (`api-key` header کے طور پر بھیجی جاتی ہے؛ بغیر authentication والے
  مقامی Docker کے لیے اختیاری)۔ JWT/RBAC استعمال نہیں ہوتے۔
- **Config fields** — UI میں `host`، `port`، `collection`، `embeddingModel`،
  `apiKey` دستیاب ہیں۔ `vectorSize` / `hnswEfConstruct` صرف env/DB میں ہیں اور `vectorSize`
  collection بنانے کے لیے استعمال نہیں ہوتا (dimension، embedding سے آتا ہے)۔

### Vector quantization (int8 — اختیاری، دونوں backends)

دونوں vector backends، محفوظ کردہ vectors کی memory
footprint کم کرنے کے لیے **اختیاری int8 quantization** کی معاونت کرتے ہیں (Float32 سے تقریباً 4× چھوٹا)، جس کے نتیجے میں recall میں معمولی کمی آتی ہے۔
دونوں میں default طور پر یہ **بند** ہوتا ہے — vectors اس وقت تک full-precision رہتے ہیں جب تک اسے واضح طور پر
فعال نہ کیا جائے۔

| Backend    | Setting                         | Type                           | Default  | کہاں پڑھا جاتا ہے                                           |
| ---------- | ------------------------------- | ------------------------------ | -------- | ----------------------------------------------------------- |
| Qdrant     | `qdrantQuantization` (DB key)   | `"none" \| "int8" \| "binary"` | `"none"` | `src/lib/memory/qdrant.ts::normalizeQdrantConfig()`         |
| sqlite-vec | `MEMORY_VEC_QUANTIZATION` (env) | `"none" \| "int8"`             | `"none"` | `src/lib/memory/vectorStore.ts::requestedVecQuantization()` |

- **Qdrant** کو ہر instance کے لیے `qdrantQuantization` setting
  key کے ذریعے ترتیب دیا جاتا ہے (جو `PUT /api/settings/qdrant` پر `quantization` field کے طور پر دستیاب ہے)۔ جب
  `"int8"` ہو، تو `buildQuantizationConfig()` scalar quantization کی درخواست کرتا ہے
  (`always_ram`، quantile `0.99`) اور searches، `rescore: true` فعال کرتی ہیں تاکہ
  full-precision vectors، int8 candidate set کو بہتر بنا سکیں۔
- **sqlite-vec** quantization صرف **environment کے ذریعے** ہے (DB setting نہیں): مقامی vectors کو
  `vec_quantize_int8(?, 'unit')` کے ذریعے `int8[dim]`
  column کے طور پر محفوظ کرنے کے لیے `MEMORY_VEC_QUANTIZATION=int8` سیٹ کریں۔ منتخب کردہ mode کو
  `embedding_signature` میں شامل کیا جاتا ہے (`:int8` suffix)، لہٰذا modes تبدیل کرنے سے
  `vec_memories` table کی مکمل reindex متحرک ہوتی ہے — یہی وہ lazy-backfill path ہے جو
  embedding model تبدیل ہونے پر استعمال ہوتا ہے۔

## میموری کی اقسام

`MemoryType` (`src/lib/memory/types.ts`):

| قسم          | استعمال                                                                     |
| ------------ | --------------------------------------------------------------------------- |
| `factual`    | ترجیحات، صارف کے مستقل حقائق، طرزِ عمل کے نمونے                             |
| `episodic`   | کسی مخصوص لمحے سے منسلک فیصلے ("میں نے Postgres منتخب کیا")                 |
| `procedural` | ورک فلو / طریقۂ کار کی میموری (محفوظ؛ فی الحال کوئی خودکار ایکسٹریکٹر نہیں) |
| `semantic`   | ویکٹر اسٹور کے اندراجات کے لیے محفوظ                                        |

`MemoryConfig` کی بازیافت کی حکمتِ عملی `exact`، `semantic`، یا `hybrid` میں سے ایک ہوتی ہے،
اور دائرۂ کار `session`، `apiKey`، یا `global` میں سے ایک ہوتا ہے۔ `getMemorySettings()`
سے طے شدہ دائرۂ کار `apiKey` ہے۔

## حقائق کا اخذ (`extraction.ts`)

اخذ کا عمل **regex-based** ہے، LLM-based نہیں — یہ `setImmediate()` کے ساتھ
اسی پراسیس میں چلتا ہے، اس لیے یہ کبھی بھی رسپانس اسٹریم کو بلاک نہیں کرتا:

- **ترجیحی پیٹرنز** → `MemoryType.FACTUAL`
  (مثلاً `I prefer …`، `I really like …`، `my favorite is …`، `I hate …`)
- **فیصلے کے پیٹرنز** → `MemoryType.EPISODIC`
  (مثلاً `I'll use …`، `I chose …`، `I went with …`، `I'm going to adopt …`)
- **معمول کے پیٹرنز** → `MemoryType.FACTUAL`
  (مثلاً `I usually …`، `I always …`، `I tend to …`)

ہر مماثلت کو صاف کیا جاتا ہے (`trim`، خالی جگہوں کا انضمام، زیادہ سے زیادہ 500 حروف)،
ایک مستحکم `factKey(category, content)` کے ذریعے بیچ کے اندر نقل سے پاک کیا جاتا ہے، اور
`createMemory()` کے ذریعے
`{category, extractedAt, source: "llm_response"}` میٹا ڈیٹا کے ساتھ محفوظ کیا جاتا ہے۔ ان پٹ متن
64 KiB (`MAX_EXTRACTION_TEXT_LENGTH`) تک محدود ہے — زیادہ طویل ہونے کی صورت میں متن کا **آخری حصہ**
استعمال کیا جاتا ہے، تاکہ اسسٹنٹ کا تازہ ترین مواد ہمیشہ شامل رہے۔

`extractFactsFromText(text)` کو ٹیسٹس کے لیے ایکسپورٹ کیا گیا ہے اور یہ حقائق کو محفوظ کیے بغیر
ساخت یافتہ حقائق واپس کرتا ہے۔

## بازیافت (`retrieval.ts`)

`retrieveMemories(apiKeyId, config)` مرکزی انٹری پوائنٹ ہے۔ یہ:

1. `MemoryConfigSchema` کے ذریعے کنفیگ کو نارملائز اور ویلیڈیٹ کرتا ہے۔
2. جب `enabled` غلط ہو یا `maxTokens <= 0` ہو تو فوراً `[]` واپس کرتا ہے۔
3. `maxTokens` کو `[1, 8000]` کی حد میں رکھتا ہے۔
4. یہ پتہ لگاتا ہے کہ جدید `memories` ٹیبل موجود ہے یا نہیں (بمقابلہ پرانے `memory`
   ٹیبل کے)، تاکہ پرانے ڈیٹابیس کام کرتے رہیں۔
5. ایکسپائری گارڈ
   (`expires_at IS NULL OR datetime(expires_at) > datetime('now')`)، اختیاری
   سیشن دائرۂ کار، اور اختیاری `retentionDays` کٹ آف کے ساتھ بنیادی کوئری بناتا ہے۔
6. حکمتِ عملی کے مطابق شاخ بناتا ہے:
   - **`exact`** (طے شدہ): زمانی ترتیب میں `ORDER BY created_at DESC LIMIT 100`۔
   - **`semantic`**: اگر `config.query` موجود ہو اور `memory_fts` موجود ہو، تو
     `memory_fts MATCH ?` کو JOIN کرتا ہے اور FTS رینک کے مطابق ترتیب دیتا ہے؛ جب
     FTS سے 0 قطاریں واپس آئیں تو زمانی ترتیب پر واپس آ جاتا ہے۔
   - **`hybrid`**: FTS نتائج (زیادہ موزونیت) اور زمانی سیٹ کا اتحاد، جس میں id کے لحاظ سے
     نقول ہٹا دی جاتی ہیں۔
7. جب کوئری فراہم کی گئی ہو تو `content`، `key`، اور `metadata` JSON پر
   کلیدی الفاظ کی موزونیت کا اسکور (`getRelevanceScore`) شمار کرتا ہے۔ صفر اسکور والی
   قطاریں خارج کر دی جاتی ہیں۔
8. پہلے اسکور کی نزولی ترتیب، پھر `createdAt` کی نزولی ترتیب کے مطابق مرتب کرتا ہے۔
9. درجہ بند فہرست پر چلتا ہے اور اندراجات اس وقت تک قبول کرتا ہے جب تک جاری
   `estimateTokens(content)` (تقریباً `length / 4`) بجٹ کے اندر رہتا ہے۔ جب بھی کوئی
   مماثلت موجود ہو، ہمیشہ کم از کم ایک اندراج واپس کرتا ہے۔

`estimateTokens` کو ایکسپورٹ کیا گیا ہے اور اسے بازیافت، خلاصہ سازی، اور MCP
`omniroute_memory_search` ٹول استعمال کرتے ہیں۔

## انجیکشن (`injection.ts`)

`injectMemory(request, memories, provider)`:

1. میموری کے تمام مشمولات کو ایک واحد `Memory context: …` اسٹرنگ میں یکجا کرتا ہے۔
2. فراہم کنندہ کے نام کے مطابق حکمتِ عملی منتخب کرتا ہے:
   - **سسٹم پیغام** (OpenAI، Anthropic، Gemini، … کے لیے ڈیفالٹ) — کسی بھی موجودہ سسٹم پیغام سے پہلے
     ایک `{role: "system", content: memoryText}` شامل کرتا ہے، تاکہ صارف کے سسٹم پرامپٹس کو بدستور ترجیح حاصل رہے۔
   - **صارف کا پیغام** (متبادل) — `PROVIDERS_WITHOUT_SYSTEM_MESSAGE` میں موجود فراہم کنندگان کے لیے:
     `o1`، `o1-mini`، `o1-preview`،
     `glm`، `glmt`، `glm-cn`، `zai`، `qianfan`۔ یہ سسٹم رول کو مسترد کرتے ہیں
     اور بصورتِ دیگر 400 خرابی دیتے ہیں (GLM/Zhipu کے لیے مسئلہ #1701 ملاحظہ کریں)۔
3. `memory.injection.injected` کے تحت تعداد، حکمتِ عملی، اور ماڈل کو لاگ کرتا ہے۔

`providerSupportsSystemMessage(provider)` کو ان کالرز کے لیے ایکسپورٹ کیا جاتا ہے جنہیں
اپنے روٹنگ فیصلے خود کرنے کی ضرورت ہو۔ حفاظت کی خاطر نامعلوم فراہم کنندگان کے لیے ڈیفالٹ
`true` (سسٹم رول کی اجازت) ہوتا ہے۔

## ترتیبات (`settings.ts`)

میموری کی کنفیگریشن env vars میں نہیں بلکہ **DB کی settings ٹیبل میں محفوظ ہوتی ہے**۔
`getMemorySettings()`، `getSettings()` سے معلومات پڑھتا ہے اور نتیجے کو
پروسیس کے اندر کیش کرتا ہے؛ تحریر کے بعد settings PUT روٹ
`invalidateMemorySettingsCache()` کو کال کرتا ہے۔

### سابقہ فیلڈز (تمام ورژنز)

| DB کلید               | قسم     | ڈیفالٹ                                                 | UI کنٹرول                                                   |
| --------------------- | ------- | ------------------------------------------------------ | ----------------------------------------------------------- |
| `memoryEnabled`       | boolean | `false` (v3.8.30 سے ڈیفالٹ طور پر بند)                 | میموری آن/آف                                                |
| `memoryMaxTokens`     | integer | `2000` (حد `0–16000`)                                  | انجیکشن کے لیے ٹوکن بجٹ                                     |
| `memoryRetentionDays` | integer | `30` (حد `1–365`)                                      | برقرار رکھنے کی مدت                                         |
| `memoryStrategy`      | enum    | `"hybrid"` (`recent`، `semantic`، `hybrid` میں سے ایک) | بازیافت کی حکمتِ عملی                                       |
| `skillsEnabled`       | boolean | `false`                                                | فی کلید مہارت کے انجیکشن کو ٹوگل کرتا ہے (SKILLS.md دیکھیں) |

نوٹ: UI کی حکمتِ عملی `"recent"`، `toMemoryRetrievalConfig()` کے ذریعے داخلی
`"exact"` بازیافت کی حکمتِ عملی سے میپ ہوتی ہے (تاریخی ترتیب)۔

### نئے فیلڈز (v3.8.6، منصوبہ 21 D9)

فیلڈز کی وضاحت کے لیے اوپر موجود "Settings extension" سیکشن بھی دیکھیں۔

| DB کلید                     | API فیلڈ                 | ڈیفالٹ   |
| --------------------------- | ------------------------ | -------- |
| `memoryEmbeddingSource`     | `embeddingSource`        | `"auto"` |
| `memoryEmbeddingModel`      | `embeddingProviderModel` | `null`   |
| `memoryTransformersEnabled` | `transformersEnabled`    | `false`  |
| `memoryStaticEnabled`       | `staticEnabled`          | `false`  |
| `memoryRerankEnabled`       | `rerankEnabled`          | `false`  |
| `memoryRerankModel`         | `rerankProviderModel`    | `null`   |
| `memoryVectorStore`         | `vectorStore`            | `"auto"` |

Qdrant سے متعلق DB کلیدیں (`qdrantEnabled`، `qdrantHost`، `qdrantPort`،
`qdrantApiKey`، `qdrantCollection` جس کا ڈیفالٹ `"omniroute_memory"` ہے،
`qdrantEmbeddingModel` جس کا ڈیفالٹ `"openai/text-embedding-3-small"` ہے) کو
`qdrant.ts` میں `normalizeQdrantConfig()` پڑھتا ہے۔

### ماحولیاتی متغیرات (v3.8.6)

چھ اختیاری env vars انجن کے رن ٹائم رویے کو ایڈجسٹ کرتے ہیں (`.env.example` میں دستاویزی شکل میں موجود):

| متغیر                           | ڈیفالٹ                     | وضاحت                                                                                                                                                            |
| ------------------------------- | -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `MEMORY_EMBEDDING_CACHE_TTL_MS` | `300000`                   | ایمبیڈنگ کیش TTL (5 منٹ)                                                                                                                                         |
| `MEMORY_EMBEDDING_CACHE_MAX`    | `1000`                     | ایمبیڈنگ LRU کیش میں زیادہ سے زیادہ اندراجات                                                                                                                     |
| `MEMORY_TRANSFORMERS_MODEL`     | `Xenova/all-MiniLM-L6-v2`  | Transformers.js ماڈل کے لیے HF ریپو                                                                                                                              |
| `MEMORY_STATIC_MODEL`           | `minishlab/potion-base-8M` | اسٹیٹک potion ماڈل کے لیے HF ریپو                                                                                                                                |
| `MEMORY_STATIC_CACHE_DIR`       | `<DATA_DIR>/embeddings`    | ڈاؤن لوڈ کیے گئے ماڈلز کو محفوظ کرنے کی جگہ                                                                                                                      |
| `MEMORY_VEC_TOP_K`              | `20`                       | ویکٹر تلاش کے لیے ڈیفالٹ top-K                                                                                                                                   |
| `MEMORY_RRF_K`                  | `60`                       | ہائبرڈ تلاش کے لیے RRF k مستقل                                                                                                                                   |
| `MEMORY_VEC_QUANTIZATION`       | `none`                     | مقامی sqlite-vec ویکٹرز کو کوانٹائزڈ صورت میں محفوظ کرنے کے لیے `int8` پر سیٹ کریں (تقریباً 4× چھوٹے؛ اختیاری)۔ موڈ کی تبدیلی دوبارہ انڈیکسنگ کو لازمی بناتی ہے۔ |

## خلاصہ سازی (`summarization.ts`)

`summarizeMemories(apiKeyId, sessionId?, maxTokens = 4000)` اُس وقت پرانے
مواد کو مختصر کرتا ہے جب کسی کلید کی یادداشتوں کے ٹوکنز کی موجودہ مجموعی تعداد
مقررہ حد سے تجاوز کر جائے۔ یہ `created_at` کے لحاظ سے DESC ترتیب میں قطاروں کا جائزہ لیتا ہے،
حد میں سما جانے والی قطاروں کو برقرار رکھتا ہے، اور باقی قطاروں میں موجود `content`
کو اصل متن کے پہلے تین جملوں سے وہیں تبدیل کر دیتا ہے۔ `tokensSaved` پرانے اور
نئے مواد کے درمیان `estimateTokens` کا فرق ہے۔

یہ معمول موجودہ چیٹ پائپ لائن میں **دستیاب ہے لیکن خودکار طور پر کال نہیں ہوتا** —
اگر آپ کو مسلسل اختصار درکار ہو تو اسے cron، کسی ایڈمن کارروائی، یا
`MemoryConfig.autoSummarize` گلو سے کال کریں۔ ڈیٹا کا ضیاع یک طرفہ ہے:
اصل متن اوور رائٹ کر دیا جاتا ہے۔

## REST API

تمام اینڈ پوائنٹس کے لیے انتظامی توثیق (`requireManagementAuth`) درکار ہے۔

### بنیادی میموری اینڈ پوائنٹس (موجودہ + اپ ڈیٹ شدہ)

| طریقہ    | راستہ                | وضاحت                                                                                                                                                                                         |
| -------- | -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `GET`    | `/api/memory`        | فلٹرز کے ساتھ صفحات میں تقسیم شدہ فہرست: `apiKeyId`، `type`، `sessionId`، `q`، `limit`، `page`، `offset`۔ جواب میں `stats.total`، `stats.tokensUsed`، `stats.hitRate`، `cacheStats` شامل ہیں  |
| `POST`   | `/api/memory`        | اندراج بنائیں (Zod سے توثیق شدہ: `content`، `key`، اختیاری `type`، `sessionId`، `apiKeyId`، `metadata`، `expiresAt`)۔ `createMemory()` کو کال کرتا ہے، جو `(apiKeyId, key)` پر اپ سرٹ کرتا ہے |
| `GET`    | `/api/memory/[id]`   | UUID کے ذریعے ایک اندراج حاصل کریں                                                                                                                                                            |
| `PUT`    | `/api/memory/[id]`   | اندراج کے فیلڈز (`type`، `key`، `content`، `metadata`) اپ ڈیٹ کریں۔ باڈی: `MemoryUpdatePutSchema`۔ اگر ایمبیڈنگ کا ماخذ دستیاب ہو تو ویکٹر کو بھی ہم وقت کرتا ہے۔                             |
| `DELETE` | `/api/memory/[id]`   | ایک اندراج حذف کریں؛ `vec_memories` (D15) اور، بہترین ممکنہ کوشش کے طور پر، Qdrant سے بھی حذف کرتا ہے۔ اندراج موجود نہ ہونے پر 404 واپس کرتا ہے۔                                              |
| `GET`    | `/api/memory/health` | `verifyExtractionPipeline("health-check")` چلاتا ہے — بنائیں→فہرست بنائیں→حذف کریں کا مکمل چکر۔ `{working, latencyMs, error?}` واپس کرتا ہے                                                   |

### نئے میموری انجن اینڈ پوائنٹس (منصوبہ 21)

| طریقہ  | راستہ                             | وضاحت                                                                                                                                                                      |
| ------ | --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `POST` | `/api/memory/retrieve-preview`    | `retrieveMemories` کا آزمائشی اجرا — اسکور، درجے اور ٹوکنز کے ساتھ درجہ بند نتائج واپس کرتا ہے۔ باڈی: `RetrievePreviewSchema`۔ یادداشتوں کو انجیکٹ یا تبدیل **نہیں** کرتا۔ |
| `GET`  | `/api/memory/embedding-providers` | ایمبیڈنگ ماڈلز والے فراہم کنندگان کی فہرست دکھاتا ہے، اور نشاندہی کرتا ہے کہ کن کے لیے API کلید تشکیل دی گئی ہے۔                                                           |
| `GET`  | `/api/memory/engine-status`       | انجن کی مکمل حیثیت واپس کرتا ہے: کلیدی لفظ کا درجہ، ایمبیڈنگ ریزولوشن، ویکٹر اسٹور کے اعداد و شمار، Qdrant کی صحت، ری رینک تشکیل۔ ساخت: `MemoryEngineStatusSchema`۔        |
| `POST` | `/api/memory/summarize`           | میموری اختصار کو دستی طور پر شروع کریں۔ باڈی: `MemorySummarizeSchema` (`olderThanDays`، `apiKeyId?`، `dryRun`)۔ `{candidates, tokensSaved}` واپس کرتا ہے۔                  |
| `POST` | `/api/memory/reindex`             | `needs_reindex=1` والی یادداشتوں کے لیے ویکٹر کی دوبارہ اشاریہ سازی شروع کریں۔ باڈی: `MemoryReindexSchema` (`force`)۔ `{started, pending}` واپس کرتا ہے۔                   |

### ترتیبات کے اینڈ پوائنٹس

| طریقہ  | راستہ                                   | وضاحت                                                                                                       |
| ------ | --------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `GET`  | `/api/settings/memory`                  | موجودہ معمول پر لایا گیا `MemorySettingsExtended` (7 نئے فیلڈز + سابقہ فیلڈز)                               |
| `PUT`  | `/api/settings/memory`                  | `MemorySettingsExtendedSchema` کے کسی بھی فیلڈ کو اپ ڈیٹ کریں (کل 12 فیلڈز)                                 |
| `GET`  | `/api/settings/qdrant`                  | موجودہ Qdrant ترتیبات (`QdrantSettingsSchema`)                                                              |
| `PUT`  | `/api/settings/qdrant`                  | Qdrant ترتیبات اپ ڈیٹ کریں۔ باڈی: `QdrantSettingsUpdateSchema`۔ `apiKey` = خالی اسٹرنگ کلید کو ہٹا دیتی ہے۔ |
| `GET`  | `/api/settings/qdrant/health`           | تشکیل کردہ Qdrant انسٹینس پر فعالیت کی جانچ۔ `QdrantHealthResultSchema` واپس کرتا ہے۔                       |
| `POST` | `/api/settings/qdrant/search`           | Qdrant پر معنوی تلاش کا ٹیسٹ۔ باڈی: `QdrantSearchSchema` (`query`، `topK`)۔                                 |
| `POST` | `/api/settings/qdrant/cleanup`          | میعاد ختم شدہ / پرانی یادداشتوں کے Qdrant پوائنٹس ہٹائیں۔                                                   |
| `GET`  | `/api/settings/qdrant/embedding-models` | Qdrant کے لیے دستیاب ایمبیڈنگ ماڈلز کی فہرست دکھائیں۔                                                       |

`/api/memory` فہرست کی کوئری یا تو `page` پر مبنی صفحہ بندی
(`parsePaginationParams`) **یا** خام `offset` کی معاونت کرتی ہے — جب `offset` موجود ہو تو
اسے ترجیح دی جاتی ہے، اور جواب کی ساخت کے لیے اخذ کردہ `page` شمار کیا جاتا ہے۔

## MCP ٹولز (`open-sse/mcp-server/tools/memoryTools.ts`)

جب MCP سرور فعال ہو، تو تین میموری ٹولز رجسٹر کیے جاتے ہیں:

- `omniroute_memory_search` — `{apiKeyId, query?, type?, maxTokens?, limit?}`
  → `retrieveMemories()` کو ریپ کرتا ہے۔ v3.8.6 (D16) سے، `strategy` کو
  `"exact"` کے طور پر ہارڈ کوڈ کرنے کے بجائے `getMemorySettings()` سے پڑھا
  جاتا ہے۔ اگر `query` فراہم کی گئی ہو اور `strategy`، `semantic` یا `hybrid`
  ہو، تو دستیاب ہونے کی صورت میں ویکٹر اسٹور استعمال کیا جاتا ہے۔
- `omniroute_memory_add` — `{apiKeyId, sessionId?, type, key, content,
metadata?}` → `createMemory()` کو ریپ کرتا ہے۔ صرف 4 معیاری اقسام قبول کرتا ہے:
  `factual`، `episodic`، `procedural`، `semantic` (D17)۔
- `omniroute_memory_clear` — `{apiKeyId, type?, olderThan?}` → مماثل
  اندراجات کی فہرست بناتا ہے، اختیاری طور پر تخلیق سے پہلے کے ٹائم اسٹیمپ کے لحاظ سے فلٹر کرتا ہے، پھر ہر ایک کو
  `deleteMemory()` کے ذریعے حذف کرتا ہے (جو sqlite-vec + Qdrant سے ویکٹرز بھی ہٹاتا ہے)۔

ٹرانسپورٹ اور اسکوپ کی تفصیلات کے لیے [MCP-SERVER.md](./MCP-SERVER.md) دیکھیں۔

## ڈیش بورڈ (میموری اسٹوڈیو)

`src/app/(dashboard)/dashboard/memory/page.tsx` اب ایک **3-ٹیب اسٹوڈیو** ہے:

### ٹیب: یادداشتیں

- تصوراتی کارڈ (قابلِ سکیڑاؤ "یہ کیسے کام کرتا ہے" وضاحت)۔
- ریئل ٹائم فہرست، تلاش، اور صفحہ بندی (300 ms ڈی باؤنس)۔
- قسم کا فلٹر (`factual` / `episodic` / `procedural` / `semantic` / تمام)۔
- یادداشت شامل کرنے کا موڈل (کلید، مواد، قسم)۔
- اِن لائن ترمیم (پنسل بٹن → `PUT /api/memory/[id]`)۔
- ہر قطار کے لیے حذف کرنے کا اختیار (تصدیقی ڈائیلاگ کے ساتھ)۔
- موجودہ صفحے کی JSON ایکسپورٹ؛ فائل پِکر کے ذریعے JSON امپورٹ۔
- شماریاتی کارڈز: `totalEntries`، `tokensUsed`، `hitRate`۔
- "پرانے کو مختصر کریں" بٹن → `POST /api/memory/summarize` (پہلے ڈرائی رَن
  امیدواروں کی تعداد دکھاتا ہے، پھر تصدیق کرتا ہے)۔
- `GET /api/memory/health` کے ذریعے چلنے والا سبز/سرخ صحت کا نقطہ۔

### ٹیب: پلے گراؤنڈ

- استفسار کا اِن پٹ + حکمتِ عملی کا سلیکٹر (عین مطابق / معنوی / ہائبرڈ) + ٹوکن بجٹ۔
- "سمیولیٹ کریں" → `POST /api/memory/retrieve-preview` — درجہ بند نتائج
  `score`، `tier`، `tokens`، `vecScore`، `ftsScore` کے ساتھ دکھاتا ہے۔
- ریزولیوشن پینل دکھاتا ہے کہ کون سا ایمبیڈنگ ماخذ / ویکٹر اسٹور استعمال ہوا اور
  آیا فال بیک ہوا تھا۔

### ٹیب: انجن

- انجن اسٹیٹس پینل (کلیدی لفظ FTS5 چِپ، ایمبیڈنگ چِپ، ویکٹر اسٹور چِپ،
  Qdrant ہیلتھ چِپ، ری رینک چِپ)۔
- "ابھی دوبارہ انڈیکس کریں" بٹن → `POST /api/memory/reindex`۔
- ایمبیڈنگ ماخذ سلیکٹر (خودکار / ریموٹ / اسٹیٹک / ٹرانسفارمرز + ٹوگلز)۔
- Qdrant کنفیگریشن کارڈ (فعال کرنے کا ٹوگل، ہوسٹ/پورٹ/کلیکشن/کلید، کنکشن ٹیسٹ،
  معنوی تلاش کا ٹیسٹ، صفائی)۔
- ری رینک کنفیگریشن کارڈ (فعال کرنے کا ٹوگل، فراہم کنندہ/ماڈل سلیکٹر)۔

میموری اور Qdrant کی ترتیبات لیگیسی/عالمی ترتیبات کی سطح کے لیے
`/dashboard/settings → Memory & Skills` (`MemorySkillsTab.tsx`) کے تحت بھی
موجود ہیں۔

## کیشنگ

`src/lib/memory/store.ts`، `getMemory(id)` ریڈز کے لیے ایک اِن پروسیس LRU نما کیش
(`MEMORY_CACHE_TTL = 1 منٹ`، `MEMORY_MAX_CACHE_SIZE = 500`، جس میں 20 %
قدیم ترین اندراجات کا اخراج ہوتا ہے) رکھتا ہے، نیز ایک عمومی کلید/قدر
`memoryCache` تہہ (`src/lib/memory/cache.ts`) بھی موجود ہے، جس میں `get`/`set`/`invalidate`
طریقے ہیں اور اسے وہ کالرز استعمال کرتے ہیں جو اپنا مخصوص اسکوپ والا کیش چاہتے ہیں (1 000-اندراج LRU،
ڈیفالٹ TTL 5 منٹ)۔

## رازداری اور لائف سائیکل

- میموری کی ملکیت API key id کی ہوتی ہے (`resolveMemoryOwnerId` جو
  `chatCore.ts` میں ہے)۔ `apiKeyInfo.id` کے بغیر نہ بازیافت، نہ انجیکشن
  اور نہ ہی اخذ کرنے کا عمل چلتا ہے۔
- مستقبل کی `expires_at` رکھنے والی اندراجات کو بازیافت سے خارج کر دیا جاتا ہے؛
  `retentionDays` سے زیادہ پرانی اندراجات کو `retrieveMemories` میں
  `created_at >= cutoff` شق کے ذریعے خارج کیا جاتا ہے۔
- مستقل حذف کے لیے `DELETE /api/memory/[id]` یا `omniroute_memory_clear` استعمال کریں۔
- اخذ کرنے کا عمل `setImmediate` کے ذریعے fire-and-forget انداز میں ہوتا ہے؛ ناکامیاں
  `memory.extraction.background.failed` کے تحت لاگ کی جاتی ہیں اور کبھی کالر کے سامنے ظاہر نہیں ہوتیں۔
- توثیقی راؤنڈ ٹرپس (`verifyExtractionPipeline`) ایک `finally` بلاک میں اپنی
  آزمائشی اندراجات خود صاف کرتی ہیں۔

## مزید دیکھیں

- [SKILLS.md](./SKILLS.md) — `skillsEnabled` سیٹنگ میموری کے ساتھ ٹول کی
  تعریفیں بھی انجیکٹ کرتی ہے۔
- [MCP-SERVER.md](./MCP-SERVER.md) — MCP ٹرانسپورٹ / اسکوپس۔
- [API_REFERENCE.md](../reference/API_REFERENCE.md) — API کی وسیع تر سطح۔
- سورس ماڈیولز:
  - `src/lib/memory/types.ts`, `schemas.ts`
  - `src/lib/memory/store.ts`, `retrieval.ts`, `injection.ts`, `reindex.ts`
  - `src/lib/memory/extraction.ts`, `summarization.ts`, `verify.ts`
  - `src/lib/memory/settings.ts`, `qdrant.ts`, `cache.ts`
  - `src/lib/memory/vectorStore.ts` — sqlite-vec + ہائبرڈ RRF
  - `src/lib/memory/embedding/index.ts` — متعدد ذرائع والی embedding تہہ
  - `src/lib/memory/embedding/types.ts`, `remote.ts`, `staticPotion.ts`,
    `transformersLocal.ts`, `cache.ts`
  - `src/shared/schemas/memory.ts` — تمام memory API باڈیز کے لیے Zod اسکیمے
  - `src/shared/schemas/qdrant.ts` — Qdrant سیٹنگز/آپریشنز کے لیے Zod اسکیمے
  - `src/lib/db/memoryVec.ts` — `memory_vec_meta` کے لیے CRUD
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
  - `src/app/api/settings/qdrant/route.ts` + ذیلی روٹس
  - `src/app/(dashboard)/dashboard/memory/` — Studio UI (صفحہ + اجزا +
    ٹیبز + ہکس)
  - `open-sse/handlers/chatCore.ts` (انجیکشن / اخذ کی وائرنگ)
  - `open-sse/mcp-server/tools/memoryTools.ts`

---

## Embedding فراہم کنندہ منتخب کرنا (v3.8.16+)

OmniRoute کا میموری انجن **چار embedding ذرائع** (`src/lib/memory/embedding/`) کو سپورٹ کرتا ہے۔ ہر ایک کے **تاخیر، لاگت، ماڈل کے معیار، اور سیٹ اپ کی پیچیدگی** کے لحاظ سے مختلف فوائد اور نقصانات ہیں۔

### Embedding کے ذرائع

| فراہم کنندہ    | ذریعہ                                        | تاخیر                       | لاگت                | معیار                       | سیٹ اپ                               |
| -------------- | -------------------------------------------- | --------------------------- | ------------------- | --------------------------- | ------------------------------------ |
| `transformers` | مقامی ONNX ماڈل (Xenova/all-MiniLM-L6-v2)    | ~50-150ms (CPU)             | مفت                 | اچھا                        | صرف `npm install`                    |
| `static`       | پہلے سے حساب شدہ ویکٹرز (کیش شدہ)            | <1ms                        | مفت                 | لاگو نہیں (کیش ہٹ پر منحصر) | کوئی نہیں                            |
| `remote`       | OpenAI / Cohere / Voyage API                 | ~100-300ms                  | $0.02-0.10/1M ٹوکنز | بہترین                      | API key                              |
| `auto`         | رن ٹائم پر بہترین دستیاب ذریعہ منتخب کرتا ہے | منتخب کردہ ذریعے کے برابر   | مفت                 | منتخب کردہ ذریعے کے برابر   | کوئی نہیں                            |
| _(cache)_      | کسی بھی ذریعے کے اوپر اِن میموری LRU تہہ     | <1ms (ہٹ)، مکمل تاخیر (مِس) | مفت                 | بنیادی ذریعے کے برابر       | ہمیشہ فعال (قابلِ انتخاب ذریعہ نہیں) |

### فیصلہ سازی کا درخت

```
                  آپ کی تعیناتی کا سیاق کیا ہے؟
                  │
      ┌───────────┼───────────┬──────────────┐
      │           │           │              │
  DEV/TEST    چھوٹا PROD   بڑا PROD    EDGE / آف لائن
      │           │           │              │
      ▼           ▼           ▼              ▼
  transformers transformers remote (Qdrant) transformers
  (مفت، API نہیں)            (بہترین معیار)   (انٹرنیٹ نہیں)
      │           │           │              │
      └────────┬──┴───────────┴──────────────┘
               │
               ▼
            اوپر `cache` تہہ ہمیشہ شامل کریں
            (LruCache کسی بھی فراہم کنندہ کو لپیٹتا ہے)
```

### ڈیٹابیس اور API کنفیگریشن

میموری embedding کے اختیارات environment variables کے بجائے Settings API/UI کے ذریعے کنفیگر کیے جاتے ہیں۔ Settings کے تحت متعلقہ سیٹنگز کی ڈیٹابیس keys (`normalizeMemorySettings` جو `src/lib/memory/settings.ts` میں ہے) یہ ہیں:

- `memoryEmbeddingSource`: `"transformers"` (مقامی)، `"remote"` (API پر مبنی، مثلاً OpenAI)، `"static"` (بیرونی اسٹور)، یا `"auto"`
- `memoryEmbeddingProviderModel`: remote/static ذرائع کے لیے ماڈل شناخت کنندہ (مثلاً، `"text-embedding-3-small"`)
- `memoryTransformersEnabled`: `true` | `false`
- `memoryStaticEnabled`: `true` | `false`
- `memoryVectorStore`: `"sqlite-vec"`, `"qdrant"`, یا `"auto"`

#### مقامی ماڈل (`transformers`)

مقامی ماڈلز چلانے کے لیے اندرونی طور پر transformers.js استعمال کرتا ہے:

```bash
# کوڈ میں پڑھے جانے والے Env vars (src/lib/memory/embedding/index.ts):
MEMORY_TRANSFORMERS_MODEL=Xenova/all-MiniLM-L6-v2  # HF ماڈل ریپو
MEMORY_STATIC_MODEL=minishlab/potion-base-8M       # HF static potion ماڈل
MEMORY_STATIC_CACHE_DIR=<DATA_DIR>/embeddings      # کیش ڈائریکٹری
```

#### LRU Embedding کیش

کیش بطور ڈیفالٹ ہمیشہ فعال ہوتا ہے اور env vars کے ذریعے کنفیگر کیا جاتا ہے:

```bash
MEMORY_EMBEDDING_CACHE_MAX=1000                    # زیادہ سے زیادہ کیش شدہ آئٹمز
MEMORY_EMBEDDING_CACHE_TTL_MS=300000               # TTL (5 منٹ)
```

### کارکردگی کے اعداد و شمار

ایک عام 4-core x86 سرور پر بینچ مارک (ہر متن تقریباً 100 ٹوکنز):

| فراہم کنندہ          | p50   | p95   | p99   | فی 1M ایمبیڈنگز لاگت                      |
| -------------------- | ----- | ----- | ----- | ----------------------------------------- |
| `transformers` (CPU) | 80ms  | 180ms | 350ms | مفت                                       |
| `remote` (OpenAI)    | 120ms | 220ms | 400ms | تقریباً $0.02 (ada-002) / $0.13 (3-large) |
| `static` (Qdrant)    | 15ms  | 30ms  | 60ms  | Qdrant ہوسٹنگ پر منحصر                    |
| `cache` (ہِٹ)        | <1ms  | <1ms  | 2ms   | مفت                                       |

---

## حقائق اخذ کرنے کے پیٹرنز (v3.8.16+)

`extraction.ts` ماڈیول (`src/lib/memory/extraction.ts`) گفتگو کے پیغامات سے منظم حقائق اخذ کرنے کے لیے **regex pattern matching** استعمال کرتا ہے۔ ان پیٹرنز کو سمجھنے سے آپ اپنے استعمال کے معاملے کے لیے اخذ کرنے کے معیار کو بہتر بنا سکتے ہیں۔

### ڈیفالٹ پیٹرن کیٹیگریز

| کیٹیگری             | مثالی پیٹرن                                                 | اخذ کردہ معلومات        |
| ------------------- | ----------------------------------------------------------- | ----------------------- |
| PREFERENCE_PATTERNS | `"I prefer <X>"`, `"I like <X>"`, `"I hate <X>"`            | صارف کی ترجیحات         |
| DECISION_PATTERNS   | `"I'll use <X>"`, `"I decided to <X>"`, `"I went with <X>"` | صارف کے فیصلے (واقعاتی) |
| PATTERN_PATTERNS    | `"I usually <X>"`, `"I always <X>"`, `"I never <X>"`        | مستقل رویّے کے پیٹرنز   |

### مثالی پیٹرنز (سادہ کردہ)

```ts
// src/lib/memory/extraction.ts سے
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

### کیا اخذ کیا جاتا ہے

جب کوئی صارف کہتا ہے:

> "I prefer TypeScript. I'll use Postgres for this project. I always commit before pushing. I don't like Python."
> اخذ کرنے کا عمل 4 یادداشتیں بناتا ہے:
>
> | کلید                                 | کیٹیگری | قسم           | مواد                        |
> | ------------------------------------ | ------- | ------------- | --------------------------- |
> | `preference:typescript`              | ترجیح   | حقائق پر مبنی | "TypeScript"                |
> | `decision:postgres_for_this_project` | فیصلہ   | واقعاتی       | "Postgres for this project" |
> | `pattern:commit_before_pushing`      | پیٹرن   | حقائق پر مبنی | "commit before pushing"     |
> | `preference:python`                  | ترجیح   | حقائق پر مبنی | "Python"                    |

### اخذ کرنے کی حدود

بے قابو اخذ کو روکنے کے لیے درج ذیل حدود لاگو ہوتی ہیں:

| مواد کی کم از کم لمبائی | 3 حروف |
| مواد کی زیادہ سے زیادہ لمبائی | 500 حروف |

### اخذ کرنے کو کب غیر فعال کریں

جب بھی میموری فعال ہو، اخذ کرنے کا عمل خودکار طور پر چلتا ہے؛ صرف اخذ کرنے کے لیے کوئی علیحدہ
ٹوگل موجود نہیں ہے۔ اسے بند کرنے کے لیے میموری کو مکمل طور پر غیر فعال کریں (`enabled: false`
بذریعہ `PUT /api/settings/memory`)۔ درج ذیل صورتوں میں ایسا کرنے پر غور کریں:

- آپ کے پیغامات کا حجم زیادہ ہو اور اخذ کرنے کی لاگت قابلِ ذکر ہو
- آپ کی گفتگو زیادہ تر عارضی ہو (چیٹ، ڈیبگنگ) اور اس کی کوئی طویل مدتی قدر نہ ہو
- آپ پہلے ہی حسبِ ضرورت پلگ اِنز کے ذریعے سیاق و سباق محفوظ کر رہے ہوں

---

## ہائبرڈ RRF ٹیوننگ (v3.8.16+)

**Reciprocal Rank Fusion (RRF)** الگورتھم FTS5 (کلیدی لفظ) اور ویکٹر (معنوی) نتائج کو یکجا کرتا ہے۔ `k` پیرامیٹر یہ کنٹرول کرتا ہے کہ کم درجہ بندی والے نتائج کو کتنا وزن دیا جائے۔

### فارمولا

ہر امیدوار میموری کے لیے RRF اسکور یہ ہے:

```
RRF(d) = Σ  1 / (k + rank_i(d))
```

جہاں:

- `k` مستقل قدر ہے (ڈیفالٹ 60)
- `rank_i(d)`، i-ویں بازیافت کے نظام (FTS، ویکٹر) میں دستاویز `d` کا درجہ ہے
- مجموعہ بازیافت کے تمام نظاموں پر لاگو ہوتا ہے

### `k` نتائج کو کیسے متاثر کرتا ہے

| `k` کی قدر          | اثر                                                                             | کس کے لیے بہترین ہے                |
| ------------------- | ------------------------------------------------------------------------------- | ---------------------------------- |
| `k=0`               | خالص درجہ جاتی امتزاج (کوئی smoothing نہیں)                                     | نظریاتی بنیادی معیار               |
| `k=10-30`           | اعلیٰ نتائج کو بہت زیادہ وزن دیتا ہے، کم درجہ نتائج کا حصہ نہایت معمولی ہوتا ہے | جب اولین 3 نتائج عموماً درست ہوں   |
| **`k=60`** (ڈیفالٹ) | متوازن — اولین 10 نتائج سبھی بامعنی حصہ ڈالتے ہیں                               | عمومی مقصد کی بازیافت              |
| `k=100+`            | زیادہ ہموار — متعدد نظاموں میں ظاہر ہونے والے کم درجہ نتائج بھی غالب آ سکتے ہیں | جب recall > precision نہایت اہم ہو |

### عملی طور پر `k` کی ٹیوننگ

```bash
# ڈیفالٹ
MEMORY_RRF_K=60

# جارحانہ درستگی (چھوٹی میموری، چند دستاویزات)
MEMORY_RRF_K=20

# زیادہ سے زیادہ بازیافت (بڑی میموری، متنوع سوالات)
MEMORY_RRF_K=120
```

**`k=20` کے ساتھ مثال:**

- FTS درجہ 1 → حصہ `1/21 = 0.048`
- FTS درجہ 10 → حصہ `1/30 = 0.033`
- ویکٹر درجہ 1 → حصہ `0.048`
- مشترکہ زیادہ سے زیادہ: `0.096`

**`k=60` کے ساتھ مثال:**

- FTS درجہ 1 → حصہ `1/61 = 0.016`
- FTS درجہ 10 → حصہ `1/70 = 0.014`
- ویکٹر درجہ 1 → حصہ `0.016`
- مشترکہ زیادہ سے زیادہ: `0.033`

زیادہ `k` کے ساتھ، اولین-1 اور درجہ-10 کے درمیان **نسبتی فرق** کم ہوتا ہے، اس لیے الگورتھم اعلیٰ درجے کے اعتماد کی نسبت **بازیافت کے نظاموں کے درمیان اتفاقِ رائے** پر زیادہ انحصار کرتا ہے۔

### `k` کو کب تبدیل کریں

| علامت                                           | یہ آزمائیں                                                                          |
| ----------------------------------------------- | ----------------------------------------------------------------------------------- |
| اولین نتیجہ ہمیشہ جیتتا ہے، لیکن وہ غلط ہوتا ہے | k کو **کم** کریں (مثلاً، 20) — اعلیٰ درجے کا اعتماد زیادہ اہم ہوگا                  |
| درست جواب اولین-5 میں ہے لیکن اولین-1 نہیں      | k کو **زیادہ** کریں (مثلاً، 100) — زیادہ ہموار اسکورنگ اتفاقِ رائے کو فائدہ دیتی ہے |
| recall زیادہ ہے لیکن precision کم ہے            | k کو **کم** کریں — درجہ بندی کو زیادہ واضح بنائیں                                   |
| recall کم ہے (متعلقہ دستاویزات غائب ہیں)        | k کو **زیادہ** کریں — کم درجہ دستاویزات کو موقع دیں                                 |

### RRF کی وزن دہی

reciprocal rank fusion معنوی ویکٹر کے درجے اور مکمل متن کی تلاش کے درجے کے لیے مساوی وزن استعمال کرتا ہے:

```
RRF(d) = 1/(k + rank_vector) + 1/(k + rank_fts)
```

انفرادی وزنوں کو ایڈجسٹ کرنے کے لیے کوئی environment variables موجود نہیں ہیں (`MEMORY_RRF_VECTOR_WEIGHT`/`MEMORY_RRF_FTS_WEIGHT` موجود نہیں ہیں)۔

---

## خلاصہ سازی کی حکمتِ عملی (v3.8.16+)

`summarization.ts` ماڈیول (`src/lib/memory/summarization.ts`) پرانی یادداشتوں کو مختصر کرتا ہے تاکہ بازیافت کی صلاحیت برقرار رکھتے ہوئے فعال مجموعہ چھوٹا رکھا جا سکے۔

### خلاصہ سازی کب متحرک ہوتی ہے

| محرک                   | حد (پہلے سے طے شدہ) |
| ---------------------- | ------------------- |
| API کے ذریعے دستی محرک | لاگو نہیں           |

### کن چیزوں کا خلاصہ بنایا جاتا ہے

`summarization.ts` سے دو انٹری پوائنٹس ایکسپورٹ کیے جاتے ہیں:

- **`summarizeMemories(apiKeyId, sessionId?, maxTokens = 4000)`** — کسی سیشن کی
  یادداشتوں کو ٹوکن بجٹ تک محدود ایک واحد خلاصہ متن میں مختصر کرتا ہے۔
- **`summarizeMemoriesOlderThan(apiKeyId, days, dryRun)`** — API کے زیرِ استعمال
  عمر پر مبنی اختصار: یہ `days` سے زیادہ پرانی ہر یادداشت منتخب کرتا ہے، ان سے
  ایک مختصر خلاصہ یادداشت بناتا ہے، اور (`dryRun` کے `false` ہونے پر) اصل
  یادداشتیں حذف کر دیتا ہے۔ کسی چیز میں ترمیم کیے بغیر امیدوار مجموعے اور ٹوکنز
  کی کل تعداد کا پیش منظر دیکھنے کے لیے `dryRun: true` پاس کریں۔

ٹیگ/کلید کی کلسٹرنگ کا کوئی مرحلہ یا فی یادداشت "بنیادی بمقابلہ قابلِ خلاصہ" اسکورنگ
موجود نہیں ہے — انتخاب مکمل طور پر عمر کی حد کی بنیاد پر ہوتا ہے، اور خلاصہ متن
ہر امیدوار کے لیے قسم کے سابقے والی ایک مختصر سطر ہوتا ہے۔

### خلاصہ سازی متحرک کرنا

خلاصہ سازی **دستی / اختیاری** ہے — `autoSummarize` کی ترتیب پہلے سے طے شدہ طور پر
`false` ہے، اس لیے کسی چیز کا خودکار طور پر اختصار نہیں ہوتا۔ اسے API کے ذریعے متحرک کریں:

```bash
curl -X POST http://localhost:20128/api/memory/summarize \
  -H "Authorization: Bearer $OMNIROUTE_KEY"
```

اسے بند رکھنے کے لیے، بس `autoSummarize` کو اس کی پہلے سے طے شدہ قدر (`false`) پر رکھیں۔

### خلاصہ سازی کے معیار کے لیے تجاویز

- **پہلے `dryRun` کے ساتھ پیش منظر دیکھیں** — `summarizeMemoriesOlderThan(..., true)`
  امیدواروں کی فہرست اور ٹوکنز کی کل تعداد واپس کرتا ہے، تاکہ اصل یادداشتیں حذف
  کرنے سے پہلے آپ تصدیق کر سکیں کہ کن چیزوں کو ضم کیا جائے گا۔
- اگر آپ کے پاس یادداشتوں کا بڑا ذخیرہ ہے تو **کم ٹریفک والے اوقات میں خلاصہ سازی چلائیں** — LLM کال سست مرحلہ ہے

```bash
# Cron طرز: روزانہ صبح 3 بجے خلاصہ بنائیں
0 3 * * * curl -X POST http://localhost:20128/api/memory/summarize \
  -H "Authorization: Bearer $OMNIROUTE_KEY"
```

---

## MemoryBackend فراہم کنندہ پیٹرن

> **مستند ماخذ:** `src/lib/memory/backend.ts`, `src/lib/memory/genericBackend.ts`, `src/lib/memory/manager.ts`
> **ٹیسٹس:** `src/lib/memory/__tests__/generic-backend.test.ts`

MemoryBackend فراہم کنندہ پیٹرن موجودہ میموری انجن کے اوپر ایک **قابلِ تبدیل بیک اینڈ تجریدی تہہ** متعارف کراتا ہے۔ کسی ایک اسٹوریج نفاذ سے منسلک ہونے کے بجائے، میموری سسٹم اب قابلِ ترتیب بنیادی/متبادل روٹنگ کے ساتھ متعدد بیک اینڈز (SQLite، Obsidian، Notion، حسبِ ضرورت HTTP بیک اینڈز) کی معاونت کرتا ہے۔

### ساخت

```
┌──────────────────────────────────────────────────────────┐
│                    API روٹس                               │
│            (src/app/api/memory/route.ts)                  │
└──────────────────────┬───────────────────────────────────┘
                       │
┌──────────────────────▼───────────────────────────────────┐
│                   MemoryManager                           │
│           واحد مثالی منتظم (manager.ts)                   │
│                                                          │
│  بنیادی ───► بیک اینڈ A  (مثلاً SQLite)                  │
│  متبادل ───► بیک اینڈ B  (مثلاً Obsidian)                │
│             بیک اینڈ C  (مثلاً GenericBackend کے ذریعے Notion) │
└──────────────────────┬───────────────────────────────────┘
                       │
        ┌──────────────┼──────────────┐
        ▼              ▼              ▼
┌────────────┐ ┌────────────┐ ┌──────────────────┐
│ SQLite     │ │ Obsidian   │ │ GenericMemory    │
│ بیک اینڈ   │ │ بیک اینڈ   │ │ بیک اینڈ (HTTP) │
└────────────┘ └────────────┘ └──────────────────┘
```

#### بنیادی انٹرفیس (`backend.ts`)

ہر بیک اینڈ کو `MemoryBackend` انٹرفیس نافذ کرنا ضروری ہے:

```typescript
interface MemoryBackend {
  readonly id: string;
  readonly displayName: string;

  // تخلیق، مطالعہ، ترمیم اور حذف
  create(input: CreateMemoryInput): Promise<Memory>;
  get(id: string): Promise<Memory | null>;
  update(id: string, updates: Partial<...>): Promise<boolean>;
  delete(id: string): Promise<boolean>;
  list(filter: MemoryFilter): Promise<{ data: Memory[]; total: number; byType: Record<string, number> }>;

  // تلاش
  search(config: SearchConfig): Promise<Memory[]>;

  // صحت
  health(): Promise<HealthCheckResult>;

  // دورِ حیات (اختیاری)
  initialize?(): Promise<void>;
  shutdown?(): Promise<void>;
}
```

#### MemoryManager (`manager.ts`)

ایک واحد مثالی منتظم جو:

- `register(backend)` کے ذریعے بیک اینڈز کو **رجسٹر** کرتا ہے — جسے بوٹ کے وقت `index.ts` سے کال کیا جاتا ہے
- `configure(primary, fallbacks)` کے ذریعے بنیادی + متبادل کو **ترتیب دیتا** ہے
- ناکامی پر متبادل سلسلے کے ساتھ، CRUD/تلاش کو بنیادی بیک اینڈ تک **روٹ** کرتا ہے
- وقتاً فوقتاً تمام بیک اینڈز کی **صحت کی جانچ** کرتا ہے

**متبادل طرزِ عمل:**

| عمل      | بنیادی                    | متبادل                               |
| -------- | ------------------------- | ------------------------------------ |
| `create` | ✅ صرف بنیادی             | ❌                                   |
| `get`    | ✅ پہلے بنیادی کو آزمائیں | ✅ null ہونے پر متبادل               |
| `update` | ✅ صرف بنیادی             | ✅ پس منظر میں غیر منتظر ہم وقت سازی |
| `delete` | ✅ صرف بنیادی             | ✅ پس منظر میں غیر منتظر ہم وقت سازی |
| `list`   | ✅ صرف بنیادی             | ❌                                   |
| `search` | ✅ پہلے بنیادی            | ✅ خرابی کی صورت میں متبادل          |

#### GenericMemoryBackend (`genericBackend.ts`)

ایک عمومی HTTP کنیکٹر جو کسی بھی REST API کو MemoryBackend کے مطابق ڈھالتا ہے۔ درج ذیل کے لیے مفید ہے:

- **Notion** — Notion API کے ذریعے منسلک کریں
- **Obsidian** — Obsidian Local REST API کے ذریعے منسلک کریں
- **حسبِ ضرورت بیک اینڈز** — کوئی بھی سروس جو RESTful میموری API فراہم کرتی ہو

**ترتیب:**

```typescript
interface GenericBackendConfig {
  baseUrl: string;           // بیک اینڈ API کا بنیادی URL
  apiKey?: string;           // تصدیق کے لیے Bearer ٹوکن
  headers?: Record<string, string>;  // حسبِ ضرورت HTTP ہیڈرز
  timeout?: number;          // درخواست کا ٹائم آؤٹ (ڈیفالٹ: 30000ms)
  backendType?: string;      // لاگنگ کے لیے

  // اینڈ پوائنٹ اوور رائیڈز (ڈیفالٹس REST روایات استعمال کرتے ہیں)
  endpoints?: {
    search?: string;   // ڈیفالٹ: "/memories/search"
    create?: string;   // ڈیفالٹ: "/memories"
    list?: string;     // ڈیفالٹ: "/memories"
    get?: string;      // ڈیفالٹ: "/memories/{id}"
    update?: string;   // ڈیفالٹ: "/memories/{id}"
    delete?: string;   // ڈیفالٹ: "/memories/{id}"
    health?: string;   // ڈیفالٹ: "/health"
  };

  // کوئری پیرامیٹر کے ناموں کی میپنگز
  queryParams?: {
    query?/apiKeyId?/limit?/offset?/strategy?/maxTokens?/type?/sessionId?/orderBy?/orderDir?/options?
  };

  // پاتھ پیرامیٹر کے ناموں کی میپنگز
  pathParams?: {
    id?/memoryId?
  };
}
```

**معلوم بیک اینڈز** `KNOWN_BACKENDS` میں پہلے سے تشکیل شدہ ہیں:

```typescript
createKnownBackend("obsidian"); // → GenericMemoryBackend جس کا رخ localhost:27123 کی طرف ہے
createKnownBackend("notion"); // → GenericMemoryBackend جس کا رخ api.notion.com/v1 کی طرف ہے
```

#### بلٹ اِن بیک اینڈز

##### SQLiteBackend (`sqliteBackend.ts`)

ڈیفالٹ بنیادی بیک اینڈ۔ `src/lib/memory/store.ts` استعمال کرتے ہوئے موجودہ SQLite پر مبنی میموری اسٹور کو ریپ کرتا ہے۔ بوٹ کے وقت خودکار طور پر رجسٹر ہو جاتا ہے۔

```typescript
import { sqliteBackend } from "./sqliteBackend";
memoryManager.register(sqliteBackend);
```

##### ObsidianBackend (`obsidianBackend.ts`)

موجودہ Obsidian انٹیگریشن (`src/lib/memory/obsidianBackend.ts`) کو ریپ کرتا ہے۔ Obsidian Local REST API کے ذریعے ایک Obsidian والٹ سے منسلک ہوتا ہے۔

### سیٹنگز

میموری بیک اینڈ کی سیٹنگز ایپ سیٹنگز ٹیبل میں محفوظ ہوتی ہیں اور `src/lib/memory/settings.ts` کے ذریعے منظم کی جاتی ہیں:

| سیٹنگ             | Env/Config کلید          | ڈیفالٹ     | وضاحت                          |
| ----------------- | ------------------------ | ---------- | ------------------------------ |
| بنیادی بیک اینڈ   | `memoryPrimaryBackend`   | `"sqlite"` | بنیادی بیک اینڈ کی ID          |
| فال بیک بیک اینڈز | `memoryFallbackBackends` | `[]`       | ترتیب وار فال بیک بیک اینڈ IDs |
| بیک اینڈ کنفیگز   | `memoryBackendConfigs`   | `{}`       | فی بیک اینڈ کنفیگ اوور رائیڈز  |

سیٹنگز کو `normalizeMemorySettings()` کے ذریعے معمول کے مطابق بنایا جاتا ہے اور `getMemorySettings()` میں کیش کیا جاتا ہے۔

### ابتدائیہ کا بہاؤ

```
ایپ بوٹسٹریپ
  → index.ts امپورٹس (ضمنی اثر): SQLiteBackend کو رجسٹر کرتے ہیں
  → ایپ لائف سائیکل سے initMemoryBackends() کال کیا جاتا ہے:
      1. سیٹنگز لوڈ کریں (getMemorySettings)
      2. بنیادی + فال بیک تشکیل دیں
      3. تمام بیک اینڈز شروع کریں (ہیلتھ چیک)
      4. درخواستوں کے لیے تیار
```

### نیا بیک اینڈ شامل کرنا

1. `src/lib/memory/<name>Backend.ts` میں **`MemoryBackend` نافذ کریں**
2. `src/lib/memory/index.ts` سے **ایکسپورٹ کریں**
3. بوٹ کے وقت `memoryManager.register(yourBackend)` کے ساتھ **رجسٹر کریں**
4. سیٹنگز کے ذریعے **تشکیل دیں**: `memoryPrimaryBackend` کو اپنے بیک اینڈ کی ID پر سیٹ کریں
5. حوالہ کے طور پر `src/lib/memory/__tests__/generic-backend.test.ts` کے ساتھ **ٹیسٹ کریں**

#### مثال: Brain بیک اینڈ

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

### توثیق

#### یونٹ ٹیسٹس

```bash
npx vitest run src/lib/memory/__tests__/generic-backend.test.ts --reporter=verbose
```

متوقع آؤٹ پٹ: **35 ٹیسٹس، سب کامیاب**، جن میں شامل ہیں:

- کنسٹرکٹر (2)
- ہیلتھ چیک (4) — کامیابی، ناکامی 500، نیٹ ورک کی خرابی، تاخیر
- ابتدائیہ (2) — کامیابی، ناکامی
- تخلیق (2) — ڈیفالٹ اینڈ پوائنٹ، حسبِ ضرورت اینڈ پوائنٹ
- حاصل کرنا (4) — کامیابی، 404 → null، غیر 404 تھرو، حسبِ ضرورت پاتھ پیرامیٹرز
- اپ ڈیٹ (2) — کامیابی، 404 → false
- حذف کرنا (2) — کامیابی، 404 → false
- فہرست (2) — کوئری پیرامیٹرز، حسبِ ضرورت پیرامیٹر کے نام
- تلاش (3) — کوئری پیرامیٹرز، حسبِ ضرورت اینڈ پوائنٹ، آپشنز سیریلائزیشن
- تصدیقی ہیڈرز (2) — Bearer ٹوکن، حسبِ ضرورت ہیڈرز
- فیکٹری (1)

#### ٹائپ چیک

```bash
npm run typecheck:core
```

متوقع نتیجہ: **0 خرابیاں**۔
