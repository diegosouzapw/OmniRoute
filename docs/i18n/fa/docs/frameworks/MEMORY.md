# Memory System (فارسی)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/MEMORY.md) · 🇪🇹 [am](../../../am/docs/frameworks/MEMORY.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/MEMORY.md) · 🇦🇿 [az](../../../az/docs/frameworks/MEMORY.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/MEMORY.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/MEMORY.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/MEMORY.md) · 🇩🇰 [da](../../../da/docs/frameworks/MEMORY.md) · 🇩🇪 [de](../../../de/docs/frameworks/MEMORY.md) · 🇬🇷 [el](../../../el/docs/frameworks/MEMORY.md) · 🇪🇸 [es](../../../es/docs/frameworks/MEMORY.md) · 🇪🇪 [et](../../../et/docs/frameworks/MEMORY.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/MEMORY.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/MEMORY.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/MEMORY.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/MEMORY.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/MEMORY.md) · 🇮🇱 [he](../../../he/docs/frameworks/MEMORY.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/MEMORY.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/MEMORY.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/MEMORY.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/MEMORY.md) · 🇮🇩 [id](../../../id/docs/frameworks/MEMORY.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/MEMORY.md) · 🇮🇹 [it](../../../it/docs/frameworks/MEMORY.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/MEMORY.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/MEMORY.md) · 🇰🇭 [km](../../../km/docs/frameworks/MEMORY.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/MEMORY.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/MEMORY.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/MEMORY.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/MEMORY.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/MEMORY.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/MEMORY.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/MEMORY.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/MEMORY.md) · 🇲🇲 [my](../../../my/docs/frameworks/MEMORY.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/MEMORY.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/MEMORY.md) · 🇳🇴 [no](../../../no/docs/frameworks/MEMORY.md) · 🇮🇳 [or](../../../or/docs/frameworks/MEMORY.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/MEMORY.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/MEMORY.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/MEMORY.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/MEMORY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/MEMORY.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/MEMORY.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/MEMORY.md) · 🇱🇰 [si](../../../si/docs/frameworks/MEMORY.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/MEMORY.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/MEMORY.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/MEMORY.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/MEMORY.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/MEMORY.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/MEMORY.md) · 🇮🇳 [te](../../../te/docs/frameworks/MEMORY.md) · 🇹🇭 [th](../../../th/docs/frameworks/MEMORY.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/MEMORY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/MEMORY.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/MEMORY.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/MEMORY.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/MEMORY.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/MEMORY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/MEMORY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/MEMORY.md)

---

> **منبع حقیقت:** `src/lib/memory/` و `src/app/api/memory/`
> **آخرین بهروزرسانی:** 2026-06-28 — v3.8.40 (غیرفعال بهصورت پیشفرض + تکمیل کوانتیزهسازی int8)

OmniRoute حافظهٔ مکالمهای پایداری را ارائه میدهد که بر اساس کلید API (و
در صورت تمایل، شناسهٔ نشست) کلیدگذاری میشود. حافظهها بهطور خودکار از پاسخهای LLM
از طریق تطبیق سبکوزن الگوهای regex استخراج شده و بهعنوان یک پیام system ابتدایی
(یا برای ارائهدهندگانی که نقش system را رد میکنند، بهعنوان نخستین پیام user)
دوباره به درخواستهای بعدی تزریق میشوند.

> **حافظه بهصورت پیشفرض خاموش است (v3.8.30+).** مقدار `DEFAULT_MEMORY_SETTINGS.enabled`
> اکنون `false` است (`src/lib/memory/settings.ts`). فعالکردن حافظه تا سقف
> `maxTokens` (~2k) از زمینهٔ بازیابیشده را به **هر** درخواست چت تزریق میکند که
> هزینهٔ آن محاسبه میشود — هزینهای غیرمنتظره برای نصبهای جدید و کلاینتهایی که
> زمینهٔ خود را مدیریت میکنند. آن را بهطور صریح از مسیر **Settings → Memory**
> فعال کنید (`MemorySkillsTab` هنگام فعالبودن حافظه، هشدار هزینهٔ توکن را نمایش میدهد).
> یک کلاینت میتواند با هدر درخواست `x-omniroute-no-memory`
> (`true`/`1`/`yes`) حافظه را برای یک درخواست منفرد غیرفعال کند — جدول هدرهای درخواست را در
> [API_REFERENCE.md](../reference/API_REFERENCE.md) ببینید. یک درخواست بدون حافظه،
> `memoryOwnerId = null` را تنظیم میکند که **هم** تزریق حافظه و **هم** تزریق مهارت را برای
> آن درخواست غیرفعال میکند (`open-sse/handlers/chatCore/headers.ts::isNoMemoryRequested`).

دامنهٔ حافظه **بهازای هر کلید API** است، نه بهازای هر کاربر — هر درخواستی که
با همان کلید API احراز هویت شود، از مخزن حافظهٔ یکسانی استفاده میکند و در صورت
تمایل میتوان دامنه را بیشتر با `sessionId` محدود کرد.

## معماری

```
کلاینت → /v1/chat/completions (apiKeyInfo در بالادست تعیین میشود)
  → handleChatCore() [open-sse/handlers/chatCore.ts]
    → resolveMemoryOwnerId(apiKeyInfo)        # شناسه را استخراج میکند
    → getMemorySettings()                     # تنظیمات ذخیرهشده در کش
    → shouldInjectMemory(body, {enabled})     # دروازه
    → retrieveMemories(apiKeyId, config)      # SQL + FTS5 + بردار اختیاری
    → injectMemory(body, memories, provider)  # پیام system یا user
  → فراخوانی ارائهدهندهٔ بالادست
  → هنگام پاسخ: extractFacts(text, apiKeyId, sessionId)  # غیرمسدودکننده
    → setImmediate → createMemory(fact) برای هر تطابق
                   → embed(content) + upsertVector(id, vec)
```

نقاط فراخوانی تزریق و استخراج در
`open-sse/handlers/chatCore.ts` متصل شدهاند (بهدنبال `retrieveMemories`، `injectMemory`
و `extractFacts` بگردید).

## معماری موتور (تفکیک سهلایهای)

موتور حافظه، مسیر بازیابی را هنگام اجرا بر اساس زیرساخت و تنظیمات موجود
تعیین میکند. سه لایه وجود دارد که بهترتیب اولویت اعمال میشوند:

```
  ┌─────────────────────────────────────────────────────────────┐
  │  لایهٔ ۰ — کلیدواژه (FTS5)                                  │
  │  دسترسپذیری مبتنی بر کاوش: هنگامی که بیلد SQLite از آن      │
  │  پشتیبانی کند، FTS5 در دسترس است                             │
  │  (better-sqlite3 / node:sqlite / bun:sqlite)؛ در بیلدهای فاقد │
  │  FTS5 در دسترس نیست (برای مثال sql.js/WASM —                 │
  │  "no such module: fts5"). وقتی strategy = "exact" باشد یا    │
  │  بهعنوان مسیر جایگزین استفاده میشود؛ وضعیت keyword در      │
  │  engine-status نتیجهٔ کاوش را منعکس میکند.                  │
  └──────────────────────────────────┬──────────────────────────┘
                                     │ strategy = semantic|hybrid؟
                                     ▼
  ┌─────────────────────────────────────────────────────────────┐
  │  لایهٔ ۱ — بردار تعبیهشده (sqlite-vec)                      │
  │  sqlite-vec v0.1.9 از طریق db.loadExtension() بارگذاری میشود.│
  │  جستوجوی KNN به روش نیروی کامل روی بردارهای Float32. فعال   │
  │  است هنگامی که:                                              │
  │   • بارگذاری sqlite-vec با loadExtension موفق شود            │
  │   • یک منبع embedding در دسترس باشد (remote | static |       │
  │     transformers) که بتواند یک Float32Array تولید کند        │
  │   • جدول vec_memories وجود داشته باشد (در نخستین ready()     │
  │     ایجاد میشود)                                            │
  └──────────────────────────────────┬──────────────────────────┘
                                     │ qdrant.enabled؟
                                     ▼
  ┌─────────────────────────────────────────────────────────────┐
  │  لایهٔ ۲ — Qdrant (پایگاه دادهٔ برداری خارجی با فعالسازی    │
  │  اختیاری)                                                    │
  │  در صورت فعالبودن، برای semantic/hybrid جایگزین sqlite-vec  │
  │  میشود. به نمونهٔ در حال اجرای Qdrant و host/port           │
  │  پیکربندیشده نیاز دارد.                                     │
  └─────────────────────────────────────────────────────────────┘
```

تنزل سطح بهصورت خودکار و شفاف انجام میشود:

- اگر sqlite-vec بارگذاری نشود، لایهٔ ۱ در دسترس نخواهد بود ← به لایهٔ ۰ بازمیگردد.
- اگر منبع embedding خطایی برگرداند، لایهٔ ۱ به لایهٔ ۰ بازمیگردد.
- اگر Qdrant سالم نباشد، لایهٔ ۲ به لایهٔ ۱ بازمیگردد (یا اگر لایهٔ ۱ نیز
  در دسترس نباشد، به لایهٔ ۰).

## منابع تعبیهسازی

لایهٔ تعبیهسازی (`src/lib/memory/embedding/`) بر اساس
`MemorySettingsExtended.embeddingSource` مشخص میکند که از کدام منبع استفاده شود:

| منبع           | توضیحات                                                                                       | نیازمند کلید | شروع سرد         |
| -------------- | --------------------------------------------------------------------------------------------- | ------------ | ---------------- |
| `remote`       | از API تعبیهسازی ارائهدهندهٔ پیکربندیشده استفاده میکند (OpenAI، Cohere و غیره)                | بله          | ندارد            |
| `static`       | تعبیهسازی محلی مبتنی بر جدول جستوجو از طریق `potion-base-8M` (WordPiece + میانگینگیری تجمیعی) | خیر          | ~200ms           |
| `transformers` | استنتاج محلی ONNX از طریق `@huggingface/transformers` v4، `all-MiniLM-L6-v2`                  | خیر          | ~3s + ~400MB RAM |
| `auto`         | انتخاب در زمان اجرا: remote (اگر کلید وجود داشته باشد) → static → transformers → null         | بستگی دارد   | بستگی دارد       |

**ترتیب انتخاب برای `auto`:**

1. نخستین ارائهدهنده را در `listEmbeddingProviders()` که `hasKey === true` دارد پیدا کن → `remote`.
2. اگر `settings.staticEnabled === true` باشد → `static`.
3. اگر `settings.transformersEnabled === true` باشد → `transformers`.
4. در غیر این صورت → `null` (به جستوجوی کلیدواژهای FTS5 تنزل مییابد).

کش تعبیهسازی (`src/lib/memory/embedding/cache.ts`) از یک نگاشت LRU درونحافظهای
با کلید `${source}:${model}:${dim}:${sha256(text)}` استفاده میکند که حداکثر
`MEMORY_EMBEDDING_CACHE_MAX` ورودی (مقدار پیشفرض 1000) و TTL برابر با
`MEMORY_EMBEDDING_CACHE_TTL_MS` (مقدار پیشفرض 5 دقیقه) دارد. این کش در طول
چرخهٔ حیات هر فرایند میان همهٔ فراخوانها مشترک است.

## RRF ترکیبی (k=60)

هنگامی که `strategy = "hybrid"` باشد و مخزن برداری در دسترس باشد، بازیابی از
ترکیب رتبهٔ متقابل برای ادغام نتایج FTS5 و برداری استفاده میکند:

```
RRF(d) = Σ  1 / (k + rank_i(d))      که در آن k = 60 است (قابل پیکربندی از طریق MEMORY_RRF_K)
          i
```

بهطور مشخص:

1. جستوجوی FTS5 را اجرا کن → فهرست رتبهبندیشدهٔ `R_fts` (موقعیت 1..N).
2. جستوجوی برداری KNN را اجرا کن → فهرست رتبهبندیشدهٔ `R_vec` (موقعیت 1..M).
3. برای هر `memoryId` یکتا:  
   `rrf_score = 1/(60 + fts_rank)` + `1/(60 + vec_rank)` (اگر در فهرست نباشد، 0).
4. بر اساس `rrf_score` بهصورت نزولی مرتب کن و پیمایش بودجهٔ توکن را اعمال کن.

RRF بهعنوان روشی مؤثر شناخته شده است که به نرمالسازی امتیاز میان سامانههای
بازیابی ناهمگون نیازی ندارد. مقدار پیشفرض `k=60` از مقالهٔ اصلی Cormack و
همکاران گرفته شده و برای مجموعههای کوچک (<10k حافظه) عملکرد خوبی دارد.

## بازپُرکنی (تنبل + نمایهسازی مجدد)

هنگامی که مدل تعبیهسازی تغییر کند (که از طریق `embedding_signature` تشخیص
داده میشود)، مخزن برداری از نو ساخته شده و همهٔ حافظههای موجود در جدول
`memories` با `needs_reindex = 1` علامتگذاری میشوند.

**بازپُرکنی تنبل**: در بازیابی بعدی، هر حافظهای که ورودی برداری نداشته باشد،
پیش از اجرای جستوجو تعبیه شده و در `vec_memories` درج میشود. این کار هزینهٔ
بازپُرکنی را بدون مسدود کردن راهاندازی، میان درخواستهای واقعی مستهلک میکند.

**نمایهسازی مجدد صریح**: زبانهٔ Engine در `/dashboard/memory` دکمهای با عنوان
"اکنون دوباره نمایهسازی کن" ارائه میدهد که `POST /api/memory/reindex` را فراخوانی میکند. گرداننده،
`runReindexBatch()` را از `src/lib/memory/reindex.ts` فراخوانی میکند که در هر
درخواست حداکثر `limit` ورودی معلق را پردازش میکند. پیشرفت را میتوان از طریق
`GET /api/memory/engine-status` (`vectorStore.needsReindex`) بهصورت دورهای بررسی کرد.

جدول `memory_vec_meta` (مهاجرت `083_memory_vec.sql`) موارد زیر را ذخیره میکند:

- `active_dim` — بُعد برداری فعلی (null = هنوز کالیبره نشده است).
- `embedding_signature` — `${source}:${model}:${dim}` که برای تشخیص تغییرات استفاده میشود.
- `last_reset_at` — مُهر زمانی آخرین بازنشانی کامل.
- `vec_loaded` — پرچم 0/1 که نشان میدهد آیا sqlite-vec با موفقیت بارگذاری شده است یا خیر.

## افزونهٔ تنظیمات

نه فیلد تعبیهسازی و برداری در `MemorySettingsExtended` واقع در
`src/shared/schemas/memory.ts` موجود است که از طریق `src/lib/db/settings.ts` ماندگار میشوند:

| فیلد                     | نوع                                                | پیشفرض   | توضیحات                                                         |
| ------------------------ | -------------------------------------------------- | -------- | --------------------------------------------------------------- |
| `embeddingSource`        | `"remote" \| "static" \| "transformers" \| "auto"` | `"auto"` | منبع تعبیهسازی مورد استفاده                                     |
| `embeddingProviderModel` | `string \| null`                                   | `null`   | ارائهدهنده/مدل با قالب `provider/model`                         |
| `customBaseUrl`          | `string \| null`                                   | `null`   | URL پایهٔ نقطهٔ پایانی سازگار با OpenAI، فقط برای حافظه         |
| `customModelId`          | `string \| null`                                   | `null`   | شناسهٔ مدل ارسالشده به نقطهٔ پایانی سفارشی                      |
| `transformersEnabled`    | `boolean`                                          | `false`  | فعالسازی اختیاری Transformers.js (MiniLM، حدود 400MB)           |
| `staticEnabled`          | `boolean`                                          | `false`  | فعالسازی اختیاری مدل محلی و ایستای potion-base-8M               |
| `rerankEnabled`          | `boolean`                                          | `false`  | فعالسازی مرحلهٔ رتبهبندی مجدد (افزودن +200-500ms به هر درخواست) |
| `rerankProviderModel`    | `string \| null`                                   | `null`   | ارائهدهنده/مدل رتبهبندی مجدد با قالب `provider/model`           |

`rerankProviderModel` توسط `POST /v1/rerank` تفکیک میشود (که از طریق loopback فراخوانی میشود)، بنابراین هر چیزی را که آن مسیر میپذیرد، قبول میکند: یک مدل ابری منتخب برای رتبهبندی مجدد (`cohere/rerank-v3.5`، `jina-ai/jina-reranker-v3.5`، …) یا یک گرهٔ ارائهدهندهٔ سازگار با OpenAI بهشکل `<node-prefix>/<model>` (برای مثال، `skilled-mini/bge-reranker-v2-m3` برای یک سامانهٔ TEI/Infinity). گرههای loopback همیشه واجد شرایط هستند؛ یک گره روی میزبانی دیگر (LAN، Tailscale) علاوه بر این به پرچم قابلیت `RERANK_REMOTE_PROVIDER_NODES` نیاز دارد و باید با خطمشی URL خروجی ارائهدهنده مطابقت داشته باشد — به [پرچمهای قابلیت](../reference/FEATURE_FLAGS.md) مراجعه کنید. انتخابگر داشبورد، ارائهدهندگان منتخب را بههمراه گرههای محلی فهرست میکند؛ هر رشتهٔ معتبر `provider/model` را میتوان مستقیماً از طریق `PUT /api/settings/memory` تنظیم کرد.
| `vectorStore` | `"sqlite-vec" \| "qdrant" \| "auto"` | `"auto"` | بکاند برداری مورد استفاده |

این موارد از طریق `GET /PUT /api/settings/memory` (طرحوارهٔ `MemorySettingsExtendedSchema`) در دسترس قرار میگیرند.

برای منبع `remote`، Memory همچنین تنظیمات اختیاری `customBaseUrl` و
`customModelId` را میپذیرد. این دو در کنار هم، یک نقطهٔ پایانی `/embeddings`
سازگار با OpenAI و مدل آن را بدون تغییر رجیستری سراسری تعبیهسازی انتخاب میکنند. نقطهٔ پایانی
پیش از استفاده نرمالسازی میشود و با خطمشی URL خروجی ارائهدهنده بررسی میشود: استفاده از HTTP(S)
الزامی است، اعتبارنامههای جاسازیشده و رشتههای پرسوجو رد میشوند و نشانیهای فرادادهٔ
ابری همچنان مسدود میمانند. مقادیر خالی، ارائهدهندهٔ انتخابشده از رجیستری را حفظ میکنند. خطاهای
بازگرداندهشده به داشبورد پاکسازی میشوند و اعتبارنامههای نقطهٔ پایانی هرگز ثبت نمیشوند.

> **TODO (D20):** دامنهٔ `global` (اشتراکگذاری حافظهها میان همهٔ کلیدهای API) در این
> نسخه پیادهسازی نشده است. این قابلیت به تغییرات طرحواره و یک مسیر بازیابی سراسری
> نیاز دارد. آن را جداگانه پیگیری کنید.

## لایههای ذخیرهسازی

### اصلی: SQLite (جدول `memories`)

توسط مهاجرت `015_create_memories.sql` ایجاد میشود:

| ستون                        | نوع                | نکات                                                                           |
| --------------------------- | ------------------ | ------------------------------------------------------------------------------ |
| `id`                        | `TEXT PRIMARY KEY` | UUID تولیدشده از طریق `crypto.randomUUID()`                                    |
| `api_key_id`                | `TEXT NOT NULL`    | کلید API مالک                                                                  |
| `session_id`                | `TEXT`             | دامنهٔ اختیاری برای هر مکالمه                                                  |
| `type`                      | `TEXT NOT NULL`    | یکی از `factual`، `episodic`، `procedural`، `semantic`                         |
| `key`                       | `TEXT`             | کلید پایدار درج یا بهروزرسانی، برای مثال `preference:i_prefer_python`          |
| `content`                   | `TEXT NOT NULL`    | متن واقعی واقعیت                                                               |
| `metadata`                  | `TEXT`             | دادهٔ JSON ‏(category، extractedAt، source، ...)                               |
| `created_at` / `updated_at` | `TEXT`             | رشتههای ISO 8601                                                               |
| `expires_at`                | `TEXT`             | انقضای اختیاری؛ `NULL` بهمعنای دائمی است                                       |
| `memory_id`                 | `INTEGER UNIQUE`   | افزودهشده توسط `023_fix_memory_fts_uuid.sql` برای اتصال UUIDها ↔ rowidهای FTS5 |

ایندکسها: `api_key_id`، `session_id`، `type`، `expires_at`، بهعلاوهٔ ایندکس
یکتای `memory_id`.

**معنای درج یا بهروزرسانی**: `createMemory()` بهدنبال ردیفی موجود با
`(api_key_id, key)` یکسان میگردد و در صورت یافتن، آن را درجا بهروزرسانی
میکند (`metadata` با استفاده از انتشار سطحی ادغام میشود). این کار مانع از رشد
نامحدود جدول در اثر تکرار عبارتهای مربوط به ترجیحات میشود.

### جستوجوی تماممتن (جدول مجازی `memory_fts`)

`022_add_memory_fts5.sql` یک جدول مجازی FTS5 روی `content` و
`key` ایجاد میکند. `023_fix_memory_fts_uuid.sql` یک باگ واقعی را برطرف میکند
که در آن کلید اصلی UUID به rowid عدد صحیح FTS5 متصل نمیشد — این مهاجرت ستون
`memory_id` را اضافه میکند، جدول FTS را دوباره میسازد و تریگرهای
(`memory_fts_ai`، `memory_fts_ad`، `memory_fts_au`) را متصل میکند تا FTS را
هنگام INSERT، DELETE و UPDATE همگام نگه دارند.

این قابلیت توسط `retrieval.ts` برای راهبردهای `semantic` و `hybrid` استفاده
میشود (پایین را ببینید). کد بازیابی با `hasTable("memory_fts")` محافظت میشود
و اگر جدول FTS موجود نباشد یا پرسوجوی FTS خطا ایجاد کند، به ترتیب زمانی
بازمیگردد.

### اختیاری: Qdrant (سطح ۲ ذخیرهگاه برداری)

`src/lib/memory/qdrant.ts` یک یکپارچهسازی اختیاری Qdrant را بهعنوان سطح ۲
ذخیرهگاه برداری پیادهسازی میکند. بازیابی فقط زمانی به Qdrant هدایت میشود که
انتخابگر موتور `memoryVectorStore === "qdrant"` باشد — مقدار پیشفرض `"auto"`
(و `"sqlite-vec"`) **هرگز** Qdrant را انتخاب نمیکند. کلید تغییر وضعیت زبانهٔ
Engine، **هر دو** گزینهٔ `qdrantEnabled` و `memoryVectorStore` را با هم تنظیم
میکند: فعالسازی، Qdrant را به ذخیرهگاه اصلی تبدیل میکند و غیرفعالسازی آن را
به `"auto"` بازنشانی میکند (#5597 — پیش از این اصلاح، فعالسازی بیاثر بود،
زیرا هیچچیز انتخابگر موتور را مقداردهی نمیکرد). اگر Qdrant قابل دسترسی نباشد
یا چیزی برنگرداند، بازیابی به sqlite-vec → FTS5 بازمیگردد.

- `upsertSemanticMemoryPoint()` — با استفاده از مدل embedding پیکربندیشده، `key + content` را embed میکند، از وجود collection اطمینان حاصل میکند (در نخستین استفاده، بردارهایی با فاصلهٔ کسینوسی ایجاد میکند) و یک point را با payload برابر با `{memoryId,
apiKeyId, sessionId, key, content, metadata, createdAtUnix, expiresAtUnix}` درج یا بهروزرسانی میکند.
- `searchSemanticMemory(query, topK, scope)` — query را embed میکند و collection را با فیلتر `kind = "omniroute_memory"` و در صورت نیاز بر اساس `apiKeyId` / `sessionId` جستوجو میکند. مقدار `topK` را به بازهٔ `[1, 20]` محدود میکند.
- `deleteSemanticMemoryPoint(id)` — یک point را حذف میکند. پس از حذف ردیف SQLite توسط `deleteMemory()` فراخوانی میشود (D15).
- `cleanupSemanticMemoryPoints({retentionDays})` — pointهایی را که `expiresAtUnix` آنها در گذشته است یا `createdAtUnix` آنها از حد آستانهٔ نگهداری قدیمیتر است، بهصورت گروهی حذف میکند. ابتدا آنها را میشمارد تا داشبورد بتواند اعداد واقعی را نمایش دهد.
- `checkQdrantHealth()` — بررسی سلامت با `GET /readyz` همراه با سنجش تأخیر.

رابط کاربری تنظیمات، پیکربندی Qdrant، بررسی سلامت، آزمایش جستوجوی معنایی و پاکسازی را در **زبانهٔ Engine** در `/dashboard/memory` ارائه میکند. از v3.8.6، تمام routeهای متناظر در `src/app/api/settings/qdrant/` متصل و فعال هستند:

| Route                                   | متد           | توضیحات                            |
| --------------------------------------- | ------------- | ---------------------------------- |
| `/api/settings/qdrant`                  | `GET` / `PUT` | خواندن / بهروزرسانی تنظیمات Qdrant |
| `/api/settings/qdrant/health`           | `GET`         | بررسی زندهبودن + تأخیر             |
| `/api/settings/qdrant/search`           | `POST`        | آزمایش جستوجوی معنایی              |
| `/api/settings/qdrant/cleanup`          | `POST`        | حذف pointهای منقضی / قدیمی         |
| `/api/settings/qdrant/embedding-models` | `GET`         | فهرست مدلهای embedding موجود       |

**نکات رفتاری (آنچه باید انتظار داشته باشید):**

- **انتخاب Engine** — فعالکردن Qdrant در زبانهٔ Engine، آن را به store اصلی تبدیل میکند (`memoryVectorStore="qdrant"` را تنظیم میکند)؛ غیرفعالکردن آن، مقدار را به `"auto"` بازنشانی میکند (#5597).
- **بدون back-fill** — فقط memoryهایی که **پس از** فعالشدن Qdrant ایجاد/بهروزرسانی میشوند، در آن نوشته خواهند شد (dual-write از نوع fire-and-forget). memoryهای ازپیشموجود SQLite مهاجرت **نمیشوند**؛ «Reindex Now» فقط index مربوط به sqlite-vec را بازسازی میکند، نه Qdrant را.
- **بُعد بردار بهصورت خودکار تشخیص داده میشود** و در نخستین استفاده از embedding واقعی به دست میآید — هیچ فیلدی برای واردکردن بُعد وجود ندارد. تغییر مدل embedding پس از ایجاد یک collection بهطور خودکار مدیریت **نمیشود**: collection موجود بدون تغییر باقی میماند، عملیات نوشتن/جستوجو با بُعد ناسازگار شکست میخورند و سامانه به sqlite-vec بازمیگردد. برای تغییر embedder، collection را دوباره ایجاد کنید (با نامی جدید، یا با حذف آن در Qdrant).
- **معیار فاصله** — همیشه **Cosine** است (هنگام ایجاد collection بهصورت hardcoded تنظیم میشود و قابل پیکربندی نیست).
- **احراز هویت** — فقط API key (بهصورت header با نام `api-key` ارسال میشود؛ برای Docker محلی بدون احراز هویت اختیاری است). از JWT/RBAC استفاده نمیشود.
- **فیلدهای پیکربندی** — رابط کاربری `host`، `port`، `collection`، `embeddingModel` و `apiKey` را ارائه میکند. `vectorSize` / `hnswEfConstruct` فقط از طریق env/DB در دسترساند و `vectorSize` برای ایجاد collection استفاده نمیشود (بُعد از embedding به دست میآید).

### کوانتیزهسازی بردار (int8 — اختیاری، در هر دو backend)

هر دو backend برداری از **کوانتیزهسازی اختیاری int8** پشتیبانی میکنند تا حجم حافظهٔ بردارهای ذخیرهشده را با هزینهٔ کاهش اندک recall کم کنند (حدود ۴ برابر کوچکتر از Float32). مقدار پیشفرض در هر دو **غیرفعال** است — مگر اینکه صریحاً فعال شود، بردارها با دقت کامل باقی میمانند.

| Backend    | تنظیم                           | نوع                            | پیشفرض   | محل خواندن                                                  |
| ---------- | ------------------------------- | ------------------------------ | -------- | ----------------------------------------------------------- |
| Qdrant     | `qdrantQuantization` (کلید DB)  | `"none" \| "int8" \| "binary"` | `"none"` | `src/lib/memory/qdrant.ts::normalizeQdrantConfig()`         |
| sqlite-vec | `MEMORY_VEC_QUANTIZATION` (env) | `"none" \| "int8"`             | `"none"` | `src/lib/memory/vectorStore.ts::requestedVecQuantization()` |

- **Qdrant** برای هر instance از طریق کلید تنظیمات `qdrantQuantization` پیکربندی میشود (بهصورت فیلد `quantization` در `PUT /api/settings/qdrant` ارائه شده است). هنگام استفاده از `"int8"`، تابع `buildQuantizationConfig()` کوانتیزهسازی scalar را درخواست میکند (`always_ram`، با quantile برابر با `0.99`) و جستوجوها `rescore: true` را فعال میکنند تا بردارهای با دقت کامل، مجموعهٔ کاندیداهای int8 را پالایش کنند.
- کوانتیزهسازی **sqlite-vec** **فقط از طریق environment** انجام میشود (نه یک تنظیم DB): مقدار `MEMORY_VEC_QUANTIZATION=int8` را تنظیم کنید تا بردارهای محلی از طریق `vec_quantize_int8(?, 'unit')` بهصورت یک ستون `int8[dim]` ذخیره شوند. حالت انتخابشده در `embedding_signature` گنجانده میشود (با پسوند `:int8`)، بنابراین تغییر حالت باعث reindex کامل جدول `vec_memories` میشود — همان مسیر lazy-backfill که هنگام تغییر مدل embedding استفاده میشود.

## انواع حافظه

`MemoryType` (`src/lib/memory/types.ts`):

| نوع          | کاربرد                                                                           |
| ------------ | -------------------------------------------------------------------------------- |
| `factual`    | ترجیحات، واقعیتهای پایدار دربارهٔ کاربر، الگوهای رفتاری                          |
| `episodic`   | تصمیمهای مرتبط با یک لحظهٔ خاص («Postgres را انتخاب کردم»)                       |
| `procedural` | حافظهٔ گردشکار / چگونگی انجام کار (رزروشده؛ در حال حاضر استخراجگر خودکاری ندارد) |
| `semantic`   | برای ورودیهای مخزن برداری رزرو شده است                                           |

راهبرد بازیابی `MemoryConfig` یکی از `exact`، `semantic` یا `hybrid` است،
و دامنه یکی از `session`، `apiKey` یا `global` است. دامنهٔ پیشفرض حاصل از
`getMemorySettings()` برابر با `apiKey` است.

## استخراج واقعیت (`extraction.ts`)

استخراج **مبتنی بر عبارت منظم** است، نه مبتنی بر LLM — این فرایند درونپردازشی و با
`setImmediate()` اجرا میشود؛ بنابراین هرگز جریان پاسخ را مسدود نمیکند:

- **الگوهای ترجیح** ← `MemoryType.FACTUAL`
  (برای مثال `I prefer …`، `I really like …`، `my favorite is …`، `I hate …`)
- **الگوهای تصمیم** ← `MemoryType.EPISODIC`
  (برای مثال `I'll use …`، `I chose …`، `I went with …`، `I'm going to adopt …`)
- **الگوهای رفتاری** ← `MemoryType.FACTUAL`
  (برای مثال `I usually …`، `I always …`، `I tend to …`)

هر تطبیق پاکسازی میشود (`trim`، فشردهسازی فاصلههای سفید، محدودسازی به 500 نویسه)،
درون دسته با استفاده از `factKey(category, content)` پایدار رفع تکرار میشود و
از طریق `createMemory()` با فرادادهٔ
`{category, extractedAt, source: "llm_response"}` ذخیره میشود. متن ورودی به
64 KiB (`MAX_EXTRACTION_TEXT_LENGTH`) محدود است — اگر طولانیتر باشد، از **انتهای** متن
استفاده میشود تا جدیدترین محتوای دستیار همیشه در پردازش مشارکت داشته باشد.

`extractFactsFromText(text)` برای آزمونها export شده است و واقعیتهای ساختاریافته را
بدون ذخیرهسازی آنها بازمیگرداند.

## بازیابی (`retrieval.ts`)

`retrieveMemories(apiKeyId, config)` نقطهٔ ورود اصلی است. این تابع:

1. پیکربندی را از طریق `MemoryConfigSchema` نرمالسازی و اعتبارسنجی میکند.
2. هنگامی که `enabled` برابر با false باشد یا `maxTokens <= 0` باشد، بلافاصله `[]` را بازمیگرداند.
3. مقدار `maxTokens` را به بازهٔ `[1, 8000]` محدود میکند.
4. تشخیص میدهد که آیا جدول مدرن `memories` وجود دارد یا جدول قدیمی `memory`،
   تا پایگاههای دادهٔ قدیمی همچنان کار کنند.
5. کوئری پایه را با محافظ انقضا
   (`expires_at IS NULL OR datetime(expires_at) > datetime('now')`)، دامنهٔ اختیاری
   نشست و آستانهٔ اختیاری `retentionDays` میسازد.
6. بر اساس راهبرد منشعب میشود:
   - **`exact`** (پیشفرض): ترتیب زمانی `ORDER BY created_at DESC LIMIT 100`.
   - **`semantic`**: اگر `config.query` و `memory_fts` وجود داشته باشند، از
     `memory_fts MATCH ?` با JOIN استفاده میکند و بر اساس رتبهٔ FTS مرتب میکند؛
     اگر FTS تعداد 0 ردیف بازگرداند، به ترتیب زمانی بازمیگردد.
   - **`hybrid`**: اجتماع نتایج FTS (با ارتباط بیشتر) و مجموعهٔ زمانی که
     بر اساس id رفع تکرار شدهاند.
7. در صورت ارائهٔ کوئری، امتیاز ارتباط کلیدواژه (`getRelevanceScore`) را بر روی
   JSON مربوط به `content`، `key` و `metadata` محاسبه میکند. ردیفهای دارای
   امتیاز صفر فیلتر میشوند.
8. ابتدا بر اساس امتیاز بهصورت نزولی و سپس بر اساس `createdAt` بهصورت نزولی مرتب میکند.
9. فهرست رتبهبندیشده را پیمایش میکند و تا زمانی ورودیها را میپذیرد که مجموع جاری
   `estimateTokens(content)` (تقریباً `length / 4`) از بودجه فراتر نرود. در صورت
   وجود هرگونه تطبیق، همیشه حداقل یک ورودی بازمیگرداند.

`estimateTokens` export شده است و در بازیابی، خلاصهسازی و ابزار MCP با نام
`omniroute_memory_search` استفاده میشود.

## تزریق (`injection.ts`)

`injectMemory(request, memories, provider)`:

1. تمام محتوای حافظهها را در یک رشتهٔ واحد بهشکل `Memory context: …` به هم متصل میکند.
2. راهبردی را بر اساس نام ارائهدهنده انتخاب میکند:
   - **پیام سیستمی** (پیشفرض برای OpenAI، Anthropic، Gemini و غیره) — یک
     `{role: "system", content: memoryText}` را پیش از تمام پیامهای سیستمی
     موجود قرار میدهد تا اعلانهای سیستمی کاربر همچنان اولویت داشته باشند.
   - **پیام کاربر** (راهکار جایگزین) — برای ارائهدهندگان موجود در
     `PROVIDERS_WITHOUT_SYSTEM_MESSAGE`: `o1`، `o1-mini`، `o1-preview`،
     `glm`، `glmt`، `glm-cn`، `zai`، `qianfan`. این ارائهدهندگان نقش سیستمی را
     رد میکنند و در غیر این صورت خطای 400 برمیگردانند (رجوع کنید به مسئلهٔ #1701 برای GLM/Zhipu).
3. تعداد، راهبرد و مدل را تحت `memory.injection.injected` ثبت میکند.

`providerSupportsSystemMessage(provider)` برای فراخوانهایی که لازم است
تصمیمهای مسیریابی خود را بگیرند، صادر شده است. ارائهدهندگان ناشناخته برای
اطمینان، بهطور پیشفرض مقدار `true` دارند (نقش سیستمی مجاز است).

## تنظیمات (`settings.ts`)

پیکربندی حافظه **در جدول تنظیمات DB ذخیره میشود**، نه در متغیرهای محیطی.
`getMemorySettings()` دادهها را از `getSettings()` میخواند و نتیجه را
درون پردازه کش میکند؛ `invalidateMemorySettingsCache()` پس از عملیات نوشتن،
توسط مسیر PUT تنظیمات فراخوانی میشود.

### فیلدهای قدیمی (همهٔ نسخهها)

| کلید DB               | نوع      | پیشفرض                                             | کنترل UI                                                           |
| --------------------- | -------- | -------------------------------------------------- | ------------------------------------------------------------------ |
| `memoryEnabled`       | بولی     | `false` (از v3.8.30 بهطور پیشفرض غیرفعال است)      | روشن/خاموش کردن حافظه                                              |
| `memoryMaxTokens`     | عدد صحیح | `2000` (محدودهٔ `0–16000`)                         | بودجهٔ توکن برای تزریق                                             |
| `memoryRetentionDays` | عدد صحیح | `30` (محدودهٔ `1–365`)                             | بازهٔ نگهداری                                                      |
| `memoryStrategy`      | شمارشی   | `"hybrid"` (یکی از `recent`، `semantic`، `hybrid`) | راهبرد بازیابی                                                     |
| `skillsEnabled`       | بولی     | `false`                                            | تزریق مهارت بهازای هر کلید را تغییر میدهد (رجوع کنید به SKILLS.md) |

نکته: راهبرد `"recent"` در UI از طریق `toMemoryRetrievalConfig()` به
راهبرد بازیابی داخلی `"exact"` نگاشت میشود (ترتیب زمانی).

### فیلدهای جدید (v3.8.6، طرح 21 D9)

برای توضیحات فیلدها، بخش «گسترش تنظیمات» در بالا را نیز ببینید.

| کلید DB                     | فیلد API                 | پیشفرض   |
| --------------------------- | ------------------------ | -------- |
| `memoryEmbeddingSource`     | `embeddingSource`        | `"auto"` |
| `memoryEmbeddingModel`      | `embeddingProviderModel` | `null`   |
| `memoryTransformersEnabled` | `transformersEnabled`    | `false`  |
| `memoryStaticEnabled`       | `staticEnabled`          | `false`  |
| `memoryRerankEnabled`       | `rerankEnabled`          | `false`  |
| `memoryRerankModel`         | `rerankProviderModel`    | `null`   |
| `memoryVectorStore`         | `vectorStore`            | `"auto"` |

کلیدهای DB مرتبط با Qdrant (`qdrantEnabled`، `qdrantHost`، `qdrantPort`،
`qdrantApiKey`، `qdrantCollection` با مقدار پیشفرض `"omniroute_memory"`،
`qdrantEmbeddingModel` با مقدار پیشفرض `"openai/text-embedding-3-small"`) توسط
`normalizeQdrantConfig()` در `qdrant.ts` خوانده میشوند.

### متغیرهای محیطی (v3.8.6)

شش متغیر محیطی اختیاری، رفتار زمان اجرای موتور را تنظیم میکنند (مستندشده در `.env.example`):

| متغیر                           | پیشفرض                     | توضیحات                                                                                                                                                       |
| ------------------------------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `MEMORY_EMBEDDING_CACHE_TTL_MS` | `300000`                   | TTL کش تعبیهسازی (۵ دقیقه)                                                                                                                                    |
| `MEMORY_EMBEDDING_CACHE_MAX`    | `1000`                     | حداکثر تعداد ورودیها در کش LRU تعبیهسازی                                                                                                                      |
| `MEMORY_TRANSFORMERS_MODEL`     | `Xenova/all-MiniLM-L6-v2`  | مخزن HF برای مدل Transformers.js                                                                                                                              |
| `MEMORY_STATIC_MODEL`           | `minishlab/potion-base-8M` | مخزن HF برای مدل ثابت potion                                                                                                                                  |
| `MEMORY_STATIC_CACHE_DIR`       | `<DATA_DIR>/embeddings`    | محل ذخیرهٔ مدلهای دانلودشده                                                                                                                                   |
| `MEMORY_VEC_TOP_K`              | `20`                       | مقدار پیشفرض top-K برای جستوجوی برداری                                                                                                                        |
| `MEMORY_RRF_K`                  | `60`                       | ثابت k در RRF برای جستوجوی ترکیبی                                                                                                                             |
| `MEMORY_VEC_QUANTIZATION`       | `none`                     | برای ذخیرهٔ بردارهای محلی sqlite-vec بهصورت کوانتیزه، آن را روی `int8` تنظیم کنید (حدود ۴ برابر کوچکتر؛ اختیاری). تغییر حالت، نمایهسازی مجدد را اجباری میکند. |

## خلاصهسازی (`summarization.ts`)

`summarizeMemories(apiKeyId, sessionId?, maxTokens = 4000)` زمانی محتوای قدیمیتر را فشرده میکند که مجموع جاری توکنهای حافظههای یک کلید از بودجه فراتر رود. این تابع ردیفها را بهترتیب نزولی `created_at` پیمایش میکند، ردیفهایی را که در بودجه جا میشوند نگه میدارد و برای بقیه، `content` را در همان محل با سه جملهٔ نخست محتوای اصلی جایگزین میکند. `tokensSaved` اختلاف مقدار `estimateTokens` بین محتوای قدیمی و جدید است.

این روال در پایپلاین فعلی چت **در دسترس است، اما بهصورت خودکار فراخوانی نمیشود** — اگر به فشردهسازی مداوم نیاز دارید، آن را از طریق یک cron، یک اقدام مدیریتی یا کد اتصال `MemoryConfig.autoSummarize` فراخوانی کنید. از دست رفتن داده یکطرفه است: متن اصلی بازنویسی میشود.

## API REST

همهٔ endpointها به احراز هویت مدیریتی (`requireManagementAuth`) نیاز دارند.

### endpointهای اصلی حافظه (موجود + بهروزشده)

| متد      | مسیر                 | توضیحات                                                                                                                                                                                                                              |
| -------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `GET`    | `/api/memory`        | فهرست صفحهبندیشده با فیلترهای `apiKeyId`، `type`، `sessionId`، `q`، `limit`، `page` و `offset`. پاسخ شامل `stats.total`، `stats.tokensUsed`، `stats.hitRate` و `cacheStats` است                                                      |
| `POST`   | `/api/memory`        | ایجاد ورودی (اعتبارسنجیشده با Zod:‏ `content`، `key`، و مقادیر اختیاری `type`، `sessionId`، `apiKeyId`، `metadata` و `expiresAt`). تابع `createMemory()` را فراخوانی میکند که بر اساس `(apiKeyId, key)` عملیات upsert را انجام میدهد |
| `GET`    | `/api/memory/[id]`   | دریافت یک ورودی منفرد بر اساس UUID                                                                                                                                                                                                   |
| `PUT`    | `/api/memory/[id]`   | بهروزرسانی فیلدهای ورودی (`type`، `key`، `content` و `metadata`). بدنه: `MemoryUpdatePutSchema`. در صورت موجود بودن منبع embedding، بردار را نیز همگام میکند.                                                                        |
| `DELETE` | `/api/memory/[id]`   | حذف یک ورودی؛ همچنین آن را از `vec_memories` (D15) حذف میکند و بهصورت best-effort از Qdrant نیز پاک میکند. در صورت موجود نبودن، 404 برمیگرداند.                                                                                      |
| `GET`    | `/api/memory/health` | تابع `verifyExtractionPipeline("health-check")` را اجرا میکند — چرخهٔ کامل ایجاد←فهرستکردن←حذف. مقدار `{working, latencyMs, error?}` را برمیگرداند                                                                                   |

### endpointهای جدید موتور حافظه (برنامهٔ 21)

| متد    | مسیر                              | توضیحات                                                                                                                                                                |
| ------ | --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `POST` | `/api/memory/retrieve-preview`    | اجرای آزمایشی `retrieveMemories` — نتایج رتبهبندیشده را همراه با امتیاز، سطح و توکنها برمیگرداند. بدنه: `RetrievePreviewSchema`. حافظهها را تزریق یا تغییر **نمیدهد**. |
| `GET`  | `/api/memory/embedding-providers` | ارائهدهندگان دارای مدلهای embedding را فهرست میکند و نشان میدهد کدامیک API key پیکربندیشده دارند.                                                                      |
| `GET`  | `/api/memory/engine-status`       | وضعیت کامل موتور را برمیگرداند: سطح کلیدواژه، تفکیک embedding، آمار ذخیرهساز برداری، سلامت Qdrant و پیکربندی رتبهبندی مجدد. ساختار: `MemoryEngineStatusSchema`.        |
| `POST` | `/api/memory/summarize`           | فشردهسازی حافظه را بهصورت دستی فعال میکند. بدنه: `MemorySummarizeSchema` (`olderThanDays`، `apiKeyId?`، `dryRun`). مقدار `{candidates, tokensSaved}` را برمیگرداند.    |
| `POST` | `/api/memory/reindex`             | بازایندکسگذاری برداری را برای حافظههایی با `needs_reindex=1` فعال میکند. بدنه: `MemoryReindexSchema` (`force`). مقدار `{started, pending}` را برمیگرداند.              |

### endpointهای تنظیمات

| متد    | مسیر                                    | توضیحات                                                                                                    |
| ------ | --------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `GET`  | `/api/settings/memory`                  | مقدار نرمالسازیشدهٔ فعلی `MemorySettingsExtended` (7 فیلد جدید + فیلدهای قدیمی)                            |
| `PUT`  | `/api/settings/memory`                  | بهروزرسانی هر فیلدی از `MemorySettingsExtendedSchema` (در مجموع 12 فیلد)                                   |
| `GET`  | `/api/settings/qdrant`                  | تنظیمات فعلی Qdrant (`QdrantSettingsSchema`)                                                               |
| `PUT`  | `/api/settings/qdrant`                  | بهروزرسانی تنظیمات Qdrant. بدنه: `QdrantSettingsUpdateSchema`. رشتهٔ خالی برای `apiKey` کلید را حذف میکند. |
| `GET`  | `/api/settings/qdrant/health`           | اجرای پروب زندهبودن روی نمونهٔ پیکربندیشدهٔ Qdrant. مقدار `QdrantHealthResultSchema` را برمیگرداند.        |
| `POST` | `/api/settings/qdrant/search`           | آزمایش جستوجوی معنایی در Qdrant. بدنه: `QdrantSearchSchema` (`query`، `topK`).                             |
| `POST` | `/api/settings/qdrant/cleanup`          | حذف نقاط Qdrant مربوط به حافظههای منقضیشده / قدیمی.                                                        |
| `GET`  | `/api/settings/qdrant/embedding-models` | فهرستکردن مدلهای embedding موجود برای Qdrant.                                                              |

کوئری فهرست `/api/memory` هم از صفحهبندی مبتنی بر `page` (`parsePaginationParams`) و هم از `offset` خام پشتیبانی میکند — در صورت وجود `offset`، این مقدار اولویت دارد و یک `page` مشتقشده برای ساختار پاسخ محاسبه میشود.

## ابزارهای MCP (`open-sse/mcp-server/tools/memoryTools.ts`)

هنگامی که سرور MCP فعال است، سه ابزار حافظه ثبت میشوند:

- `omniroute_memory_search` — `{apiKeyId, query?, type?, maxTokens?, limit?}`
  → تابع `retrieveMemories()` را پوشش میدهد. از نسخهٔ v3.8.6 (D16)، مقدار `strategy`
  بهجای اینکه بهصورت ثابت روی `"exact"` تنظیم شود، از `getMemorySettings()`
  خوانده میشود. اگر `query` ارائه شده باشد و `strategy` برابر با `semantic` یا
  `hybrid` باشد، در صورت موجود بودن، از مخزن برداری استفاده میشود.
- `omniroute_memory_add` — `{apiKeyId, sessionId?, type, key, content,
metadata?}` → تابع `createMemory()` را پوشش میدهد. فقط ۴ نوع استاندارد را
  میپذیرد: `factual`، `episodic`، `procedural`، `semantic` (D17).
- `omniroute_memory_clear` — `{apiKeyId, type?, olderThan?}` → ورودیهای منطبق
  را فهرست میکند، در صورت نیاز آنها را بر اساس برچسب زمانیِ ایجاد پیش از یک
  زمان مشخص فیلتر میکند و سپس هرکدام را از طریق `deleteMemory()` حذف میکند
  (این تابع بردارها را نیز از sqlite-vec و Qdrant حذف میکند).

برای جزئیات انتقال و دامنه، به [MCP-SERVER.md](./MCP-SERVER.md) مراجعه کنید.

## داشبورد (استودیوی حافظه)

`src/app/(dashboard)/dashboard/memory/page.tsx` اکنون یک **استودیوی ۳زبانه** است:

### زبانه: حافظهها

- کارت مفهومی (توضیح جمعشوندهٔ «نحوهٔ کار»).
- فهرست، جستوجو و صفحهبندی بلادرنگ (با تأخیر 300 ms).
- فیلتر نوع (`factual` / `episodic` / `procedural` / `semantic` / همه).
- پنجرهٔ افزودن حافظه (کلید، محتوا، نوع).
- ویرایش درونخطی (دکمهٔ مداد → `PUT /api/memory/[id]`).
- حذف هر ردیف (همراه با کادر گفتوگوی تأیید).
- خروجی JSON از صفحهٔ فعلی؛ ورودی JSON از طریق انتخابگر فایل.
- کارتهای آماری: `totalEntries`، `tokensUsed`، `hitRate`.
- دکمهٔ «فشردهسازی موارد قدیمی» → `POST /api/memory/summarize` (اجرای آزمایشی
  ابتدا تعداد نامزدها را نمایش میدهد و سپس تأیید میگیرد).
- یک نشانگر سبز/قرمز سلامت که توسط `GET /api/memory/health` کنترل میشود.

### زبانه: محیط آزمایش

- ورودی پرسوجو + انتخابگر راهبرد (دقیق / معنایی / ترکیبی) + بودجهٔ توکن.
- «شبیهسازی» → `POST /api/memory/retrieve-preview` — نتایج رتبهبندیشده را
  همراه با `score`، `tier`، `tokens`، `vecScore`، `ftsScore` نمایش میدهد.
- پنل تفکیک که نشان میدهد از کدام منبع تعبیهسازی / مخزن برداری استفاده شده
  و آیا بازگشت به روش جایگزین رخ داده است یا خیر.

### زبانه: موتور

- پنل وضعیت موتور (نشان FTS5 کلیدواژه، نشان تعبیهسازی، نشان مخزن برداری،
  نشان سلامت Qdrant، نشان بازرتبهبندی).
- دکمهٔ «بازنمایهسازی اکنون» → `POST /api/memory/reindex`.
- انتخابگر منبع تعبیهسازی (خودکار / راهدور / ایستا / تبدیلگرها + کلیدهای
  تغییر وضعیت).
- کارت پیکربندی Qdrant (کلید فعالسازی، میزبان/درگاه/مجموعه/کلید، آزمایش
  اتصال، آزمایش جستوجوی معنایی، پاکسازی).
- کارت پیکربندی بازرتبهبندی (کلید فعالسازی، انتخابگر ارائهدهنده/مدل).

تنظیمات حافظه و Qdrant همچنین برای رابط تنظیمات قدیمی/سراسری در
`/dashboard/settings → Memory & Skills` (`MemorySkillsTab.tsx`) قرار دارند.

## ذخیرهسازی موقت

`src/lib/memory/store.ts` برای خواندنهای `getMemory(id)` یک حافظهٔ نهان
درونفرایندی تقریباً مبتنی بر LRU نگه میدارد
(`MEMORY_CACHE_TTL = 1 min`، `MEMORY_MAX_CACHE_SIZE = 500`، با حذف 20 %
از قدیمیترین موارد). همچنین یک لایهٔ عمومی حافظهٔ نهان کلید/مقدار با نام
`memoryCache` (`src/lib/memory/cache.ts`) و متدهای `get`/`set`/`invalidate`
وجود دارد که فراخوانهایی با نیاز به حافظهٔ نهان محدودهبندیشدهٔ اختصاصی
از آن استفاده میکنند (LRU با 1 000 ورودی و TTL پیشفرض 5 min).

## حریم خصوصی و چرخهٔ عمر

- مالکیت حافظه بر اساس شناسهٔ کلید API است (`resolveMemoryOwnerId` در
  `chatCore.ts`). بدون `apiKeyInfo.id`، نه بازیابی، نه تزریق و نه استخراج
  اجرا نمیشود.
- ورودیهایی که `expires_at` آنها در آینده است، از نتایج بازیابی حذف میشوند؛
  ورودیهای قدیمیتر از `retentionDays` نیز توسط عبارت
  `created_at >= cutoff` در `retrieveMemories` کنار گذاشته میشوند.
- برای حذف دائمی، از `DELETE /api/memory/[id]` یا `omniroute_memory_clear` استفاده کنید.
- استخراج بهصورت بدون انتظار برای نتیجه، از طریق `setImmediate` انجام میشود؛ خطاها با
  `memory.extraction.background.failed` ثبت میشوند و هرگز به فراخواننده نمایش داده
  نمیشوند.
- رفتوبرگشتهای اعتبارسنجی (`verifyExtractionPipeline`)، ورودیهای آزمایشی خود را
  در یک بلوک `finally` پاکسازی میکنند.

## همچنین ببینید

- [SKILLS.md](./SKILLS.md) — تنظیم `skillsEnabled` تعاریف ابزارها را
  همراه با حافظه تزریق میکند.
- [MCP-SERVER.md](./MCP-SERVER.md) — انتقال / محدودههای MCP.
- [API_REFERENCE.md](../reference/API_REFERENCE.md) — سطح گستردهتر API.
- ماژولهای منبع:
  - `src/lib/memory/types.ts`, `schemas.ts`
  - `src/lib/memory/store.ts`, `retrieval.ts`, `injection.ts`, `reindex.ts`
  - `src/lib/memory/extraction.ts`, `summarization.ts`, `verify.ts`
  - `src/lib/memory/settings.ts`, `qdrant.ts`, `cache.ts`
  - `src/lib/memory/vectorStore.ts` — sqlite-vec + روش ترکیبی RRF
  - `src/lib/memory/embedding/index.ts` — لایهٔ تعبیهسازی چندمنبعی
  - `src/lib/memory/embedding/types.ts`, `remote.ts`, `staticPotion.ts`,
    `transformersLocal.ts`, `cache.ts`
  - `src/shared/schemas/memory.ts` — طرحوارههای Zod برای بدنهٔ تمام APIهای حافظه
  - `src/shared/schemas/qdrant.ts` — طرحوارههای Zod برای تنظیمات/عملیات Qdrant
  - `src/lib/db/memoryVec.ts` — عملیات CRUD برای `memory_vec_meta`
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
  - `src/app/api/settings/qdrant/route.ts` + مسیرهای فرعی
  - `src/app/(dashboard)/dashboard/memory/` — رابط کاربری Studio (صفحه + مؤلفهها +
    زبانهها + هوکها)
  - `open-sse/handlers/chatCore.ts` (سیمکشی تزریق / استخراج)
  - `open-sse/mcp-server/tools/memoryTools.ts`

---

## انتخاب ارائهدهندهٔ تعبیهسازی (v3.8.16+)

موتور حافظهٔ OmniRoute از **چهار منبع تعبیهسازی** (`src/lib/memory/embedding/`) پشتیبانی میکند. هرکدام از نظر **تأخیر، هزینه، کیفیت مدل و پیچیدگی راهاندازی** موازنههای متفاوتی دارند.

### منابع تعبیهسازی

| ارائهدهنده     | منبع                                         | تأخیر                                | هزینه              | کیفیت                        | راهاندازی                         |
| -------------- | -------------------------------------------- | ------------------------------------ | ------------------ | ---------------------------- | --------------------------------- |
| `transformers` | مدل محلی ONNX (Xenova/all-MiniLM-L6-v2)      | ~50-150ms (CPU)                      | رایگان             | خوب                          | فقط `npm install`                 |
| `static`       | بردارهای ازپیشمحاسبهشده (کششده)              | <1ms                                 | رایگان             | نامرتبط (وابسته به اصابت کش) | هیچکدام                           |
| `remote`       | API مربوط به OpenAI / Cohere / Voyage        | ~100-300ms                           | $0.02-0.10/1M توکن | عالی                         | کلید API                          |
| `auto`         | بهترین منبع موجود را هنگام اجرا انتخاب میکند | همانند منبع انتخابشده                | رایگان             | همانند منبع انتخابشده        | هیچکدام                           |
| _(کش)_         | لایهٔ LRU درونحافظهای روی هر منبع            | <1ms (اصابت)، تأخیر کامل (عدم اصابت) | رایگان             | همانند منبع زیربنایی         | همیشه فعال (منبع قابلانتخاب نیست) |

### درخت تصمیم

```
                  زمینهٔ استقرار شما چیست؟
                  │
      ┌───────────┼───────────┬──────────────┐
      │           │           │              │
 توسعه/آزمایش  تولید کوچک   تولید بزرگ    لبه / آفلاین
      │           │           │              │
      ▼           ▼           ▼              ▼
  transformers transformers remote (Qdrant) transformers
  (رایگان، بدون API)        (بهترین کیفیت)   (بدون اینترنت)
      │           │           │              │
      └────────┬──┴───────────┴──────────────┘
               │
               ▼
            همیشه لایهٔ `cache` را روی آن اضافه کنید
            (LruCache هر ارائهدهندهای را پوشش میدهد)
```

### پیکربندی پایگاه داده و API

گزینههای تعبیهسازی حافظه از طریق API/رابط کاربری تنظیمات پیکربندی میشوند، نه متغیرهای محیطی. کلیدهای مرتبط پایگاه دادهٔ تنظیمات در بخش Settings (`normalizeMemorySettings` در `src/lib/memory/settings.ts`) عبارتاند از:

- `memoryEmbeddingSource`: `"transformers"` (محلی)، `"remote"` (مبتنی بر API، مانند OpenAI)، `"static"` (ذخیرهساز خارجی)، یا `"auto"`
- `memoryEmbeddingProviderModel`: شناسهٔ مدل برای منابع remote/static (برای مثال، `"text-embedding-3-small"`)
- `memoryTransformersEnabled`: `true` | `false`
- `memoryStaticEnabled`: `true` | `false`
- `memoryVectorStore`: `"sqlite-vec"`، `"qdrant"`، یا `"auto"`

#### مدل محلی (`transformers`)

برای اجرای مدلهای محلی، در داخل از transformers.js استفاده میکند:

```bash
# متغیرهای محیطی خواندهشده در کد (src/lib/memory/embedding/index.ts):
MEMORY_TRANSFORMERS_MODEL=Xenova/all-MiniLM-L6-v2  # مخزن مدل HF
MEMORY_STATIC_MODEL=minishlab/potion-base-8M       # مدل static potion در HF
MEMORY_STATIC_CACHE_DIR=<DATA_DIR>/embeddings      # پوشهٔ کش
```

#### کش تعبیهسازی LRU

کش بهطور پیشفرض همیشه فعال است و از طریق متغیرهای محیطی پیکربندی میشود:

```bash
MEMORY_EMBEDDING_CACHE_MAX=1000                    # حداکثر موارد کششده
MEMORY_EMBEDDING_CACHE_TTL_MS=300000               # TTL (۵ دقیقه)
```

### اعداد عملکردی

بنچمارک روی یک سرور معمولی x86 با ۴ هسته (متنها هرکدام حدود ۱۰۰ توکن):

| ارائهدهنده           | p50   | p95   | p99   | هزینه / ۱ میلیون امبدینگ               |
| -------------------- | ----- | ----- | ----- | -------------------------------------- |
| `transformers` (CPU) | 80ms  | 180ms | 350ms | رایگان                                 |
| `remote` (OpenAI)    | 120ms | 220ms | 400ms | حدود $0.02 (ada-002) / $0.13 (3-large) |
| `static` (Qdrant)    | 15ms  | 30ms  | 60ms  | به میزبانی Qdrant بستگی دارد           |
| `cache` (اصابت)      | <1ms  | <1ms  | 2ms   | رایگان                                 |

---

## الگوهای استخراج واقعیت (v3.8.16+)

ماژول `extraction.ts` (`src/lib/memory/extraction.ts`) از **تطبیق الگو با عبارتهای منظم** برای استخراج واقعیتهای ساختاریافته از پیامهای مکالمه استفاده میکند. درک این الگوها به شما کمک میکند کیفیت استخراج را برای مورد استفادهٔ خود تنظیم کنید.

### دستهبندیهای پیشفرض الگوها

| دستهبندی            | الگوی نمونه                                                                     | موارد استخراجشده         |
| ------------------- | ------------------------------------------------------------------------------- | ------------------------ |
| PREFERENCE_PATTERNS | `"من <X> را ترجیح میدهم"`، `"من <X> را دوست دارم"`، `"من از <X> متنفرم"`        | ترجیحات کاربر            |
| DECISION_PATTERNS   | `"من از <X> استفاده خواهم کرد"`، `"تصمیم گرفتم <X>"`، `"من <X> را انتخاب کردم"` | تصمیمهای کاربر (رویدادی) |
| PATTERN_PATTERNS    | `"من معمولاً <X>"`، `"من همیشه <X>"`، `"من هرگز <X>"`                           | الگوهای رفتاری پایدار    |

### الگوهای نمونه (سادهشده)

```ts
// از src/lib/memory/extraction.ts
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

### چه چیزهایی استخراج میشوند

وقتی کاربری میگوید:

> "من TypeScript را ترجیح میدهم. برای این پروژه از Postgres استفاده خواهم کرد. همیشه پیش از push کردن commit میکنم. Python را دوست ندارم."
> استخراج، ۴ حافظه تولید میکند:
>
> | کلید                                 | دستهبندی | نوع     | محتوا                     |
> | ------------------------------------ | -------- | ------- | ------------------------- |
> | `preference:typescript`              | ترجیح    | واقعی   | "TypeScript"              |
> | `decision:postgres_for_this_project` | تصمیم    | رویدادی | "Postgres برای این پروژه" |
> | `pattern:commit_before_pushing`      | الگو     | واقعی   | "commit پیش از pushing"   |
> | `preference:python`                  | ترجیح    | واقعی   | "Python"                  |

### محدودیتهای استخراج

برای جلوگیری از استخراج کنترلنشده، محدودیتهای زیر اعمال میشوند:

| حداقل طول محتوا | ۳ نویسه |
| حداکثر طول محتوا | ۵۰۰ نویسه |

### چه زمانی استخراج را غیرفعال کنیم

هر زمان که حافظه فعال باشد، استخراج بهطور خودکار اجرا میشود؛ گزینهٔ جداگانهای
برای فعال یا غیرفعال کردن صرفاً استخراج وجود ندارد. برای خاموش کردن آن، حافظه را بهطور کامل غیرفعال کنید (`enabled: false`
از طریق `PUT /api/settings/memory`). در شرایط زیر این کار را در نظر بگیرید:

- حجم پیامهای شما زیاد است و هزینهٔ استخراج قابلتوجه است
- مکالمات شما عمدتاً موقتی هستند (گفتوگو، اشکالزدایی) و ارزش بلندمدتی ندارند
- از قبل زمینه را از طریق افزونههای سفارشی ثبت میکنید

---

## تنظیم RRF ترکیبی (v3.8.16+)

الگوریتم **ادغام رتبهٔ متقابل (RRF)** نتایج FTS5 (کلیدواژهای) و برداری (معنایی) را ترکیب میکند. پارامتر `k` میزان وزنی را که به نتایج با رتبهٔ پایینتر داده میشود کنترل میکند.

### فرمول

برای هر حافظهٔ کاندید، امتیاز RRF بهشکل زیر است:

```
RRF(d) = Σ  1 / (k + rank_i(d))
```

که در آن:

- `k` مقدار ثابت است (مقدار پیشفرض 60)
- `rank_i(d)` رتبهٔ سند `d` در iاُمین سامانهٔ بازیابی (FTS، برداری) است
- جمع روی تمام سامانههای بازیابی انجام میشود

### تأثیر `k` بر نتایج

| مقدار `k`           | تأثیر                                                                                      | مناسب برای                            |
| ------------------- | ------------------------------------------------------------------------------------------ | ------------------------------------- |
| `k=0`               | ادغام رتبهٔ خالص (بدون هموارسازی)                                                          | خط مبنای نظری                         |
| `k=10-30`           | وزندهی زیاد به نتایج برتر؛ رتبههای پایین مشارکت ناچیزی دارند                               | وقتی ۳ نتیجهٔ برتر معمولاً درست هستند |
| **`k=60`** (پیشفرض) | متعادل — همهٔ ۱۰ نتیجهٔ برتر مشارکت معناداری دارند                                         | بازیابی چندمنظوره                     |
| `k=100+`            | یکنواختتر — حتی نتایج با رتبهٔ پایین نیز در صورت ظاهر شدن در چند سامانه میتوانند غالب شوند | وقتی یادآوری > دقت اهمیت حیاتی دارد   |

### تنظیم عملی `k`

```bash
# پیشفرض
MEMORY_RRF_K=60

# دقت تهاجمی (حافظهٔ کوچک، اسناد کم)
MEMORY_RRF_K=20

# حداکثر یادآوری (حافظهٔ بزرگ، پرسوجوهای متنوع)
MEMORY_RRF_K=120
```

**مثال با `k=20`:**

- رتبهٔ ۱ FTS ← سهم `1/21 = 0.048`
- رتبهٔ ۱۰ FTS ← سهم `1/30 = 0.033`
- رتبهٔ ۱ برداری ← سهم `0.048`
- حداکثر ترکیبی: `0.096`

**مثال با `k=60`:**

- رتبهٔ ۱ FTS ← سهم `1/61 = 0.016`
- رتبهٔ ۱۰ FTS ← سهم `1/70 = 0.014`
- رتبهٔ ۱ برداری ← سهم `0.016`
- حداکثر ترکیبی: `0.033`

با `k` بزرگتر، **تفاوت نسبی** میان رتبهٔ ۱ و رتبهٔ ۱۰ کمتر میشود؛ بنابراین الگوریتم، بهجای اطمینان به رتبهٔ برتر، بیشتر به **اجماع میان سامانههای بازیابی** متکی خواهد بود.

### چه زمانی `k` را تغییر دهیم

| نشانه                                                 | پیشنهاد                                                                         |
| ----------------------------------------------------- | ------------------------------------------------------------------------------- |
| نتیجهٔ برتر همیشه برنده میشود، اما اشتباه است         | `k` را **کاهش دهید** (مثلاً 20) — اطمینان به رتبهٔ برتر اهمیت بیشتری پیدا میکند |
| پاسخ درست در میان ۵ نتیجهٔ برتر است، اما رتبهٔ ۱ نیست | `k` را **افزایش دهید** (مثلاً 100) — امتیازدهی یکنواختتر به اجماع پاداش میدهد   |
| یادآوری بالا است، اما دقت پایین است                   | `k` را **کاهش دهید** — رتبهبندی را دقیقتر کنید                                  |
| یادآوری پایین است (اسناد مرتبط پیدا نمیشوند)          | `k` را **افزایش دهید** — به اسناد با رتبهٔ پایینتر فرصت بدهید                   |

### وزندهی RRF

ادغام رتبهٔ متقابل از وزنهای برابر برای رتبهٔ برداری معنایی و رتبهٔ جستوجوی متن کامل استفاده میکند:

```
RRF(d) = 1/(k + rank_vector) + 1/(k + rank_fts)
```

هیچ متغیر محیطی برای تنظیم وزنهای جداگانه وجود ندارد (`MEMORY_RRF_VECTOR_WEIGHT`/`MEMORY_RRF_FTS_WEIGHT` وجود ندارند).

---

## راهبرد خلاصهسازی (v3.8.16+)

ماژول `summarization.ts` (`src/lib/memory/summarization.ts`) حافظههای قدیمیتر را فشرده میکند تا ضمن حفظ قابلیت بازیابی، مجموعهٔ فعال کوچک باقی بماند.

### زمان فعالشدن خلاصهسازی

| عامل فعالسازی             | آستانه (پیشفرض) |
| ------------------------- | --------------- |
| فعالسازی دستی از طریق API | نامرتبط         |

### مواردی که خلاصه میشوند

دو نقطهٔ ورود از `summarization.ts` صادر میشوند:

- **`summarizeMemories(apiKeyId, sessionId?, maxTokens = 4000)`** — حافظههای
  یک نشست را در یک متن خلاصه که به بودجهٔ توکن محدود است، فشرده میکند.
- **`summarizeMemoriesOlderThan(apiKeyId, days, dryRun)`** — فشردهسازی مبتنی بر
  سن که توسط API استفاده میشود: تمام حافظههای قدیمیتر از `days` را انتخاب میکند،
  یک حافظهٔ خلاصه و فشرده از آنها میسازد و (هنگامی که `dryRun` برابر با `false` است)
  موارد اصلی را حذف میکند. برای پیشنمایش مجموعهٔ نامزدها و مجموع توکنها، بدون
  تغییر هیچچیز، `dryRun: true` را ارسال کنید.

هیچ مرحلهای برای خوشهبندی بر اساس برچسب/کلید یا امتیازدهی «اصلی در برابر قابلخلاصهسازی» برای هر حافظه وجود ندارد —
انتخاب صرفاً بر اساس حد آستانهٔ سن انجام میشود و متن خلاصه، شامل یک خط فشرده با
پیشوند نوع برای هر نامزد است.

### فعالسازی خلاصهسازی

خلاصهسازی **دستی / اختیاری** است — تنظیم `autoSummarize` بهصورت پیشفرض
`false` است، بنابراین هیچچیز بهطور خودکار فشرده نمیشود. آن را از طریق API فعال کنید:

```bash
curl -X POST http://localhost:20128/api/memory/summarize \
  -H "Authorization: Bearer $OMNIROUTE_KEY"
```

برای غیرفعال نگهداشتن آن، کافی است `autoSummarize` را روی مقدار پیشفرضش (`false`) نگه دارید.

### نکات مربوط به کیفیت خلاصهسازی

- **ابتدا با `dryRun` پیشنمایش بگیرید** — `summarizeMemoriesOlderThan(..., true)`
  فهرست نامزدها و مجموع تعداد توکنها را برمیگرداند تا پیش از حذف موارد اصلی،
  بتوانید مواردی را که ادغام خواهند شد تأیید کنید.
- **اگر مجموعهٔ حافظهٔ بزرگی دارید، خلاصهسازی را در ساعات کمترافیک اجرا کنید** — فراخوانی LLM بخش زمانبر عملیات است

```bash
# به سبک Cron: خلاصهسازی روزانه در ساعت ۳ بامداد
0 3 * * * curl -X POST http://localhost:20128/api/memory/summarize \
  -H "Authorization: Bearer $OMNIROUTE_KEY"
```

---

## الگوی ارائهدهندهٔ MemoryBackend

> **منبع مرجع:** `src/lib/memory/backend.ts`، `src/lib/memory/genericBackend.ts`، `src/lib/memory/manager.ts`
> **آزمونها:** `src/lib/memory/__tests__/generic-backend.test.ts`

الگوی ارائهدهندهٔ MemoryBackend یک **لایهٔ انتزاعی قابلاتصال برای بکاند** روی موتور حافظهٔ موجود معرفی میکند. بهجای وابستگی به یک پیادهسازی ذخیرهسازی واحد، سیستم حافظه اکنون از چندین بکاند (SQLite، Obsidian، Notion و بکاندهای سفارشی HTTP) با مسیریابی اصلی/جایگزین قابلپیکربندی پشتیبانی میکند.

### معماری

```
┌──────────────────────────────────────────────────────────┐
│                    مسیرهای API                            │
│            (src/app/api/memory/route.ts)                  │
└──────────────────────┬───────────────────────────────────┘
                       │
┌──────────────────────▼───────────────────────────────────┐
│                   MemoryManager                           │
│           هماهنگکنندهٔ Singleton (manager.ts)            │
│                                                          │
│  اصلی ─────► بکاند A  (برای مثال SQLite)                │
│  جایگزین ──► بکاند B  (برای مثال Obsidian)              │
│             بکاند C  (برای مثال Notion از طریق GenericBackend) │
└──────────────────────┬───────────────────────────────────┘
                       │
        ┌──────────────┼──────────────┐
        ▼              ▼              ▼
┌────────────┐ ┌────────────┐ ┌──────────────────┐
│ بکاند     │ │ بکاند     │ │ بکاند           │
│ SQLite     │ │ Obsidian   │ │ GenericMemory    │
│            │ │            │ │ (HTTP)           │
└────────────┘ └────────────┘ └──────────────────┘
```

#### رابط اصلی (`backend.ts`)

هر بکاند باید رابط `MemoryBackend` را پیادهسازی کند:

```typescript
interface MemoryBackend {
  readonly id: string;
  readonly displayName: string;

  // عملیات CRUD
  create(input: CreateMemoryInput): Promise<Memory>;
  get(id: string): Promise<Memory | null>;
  update(id: string, updates: Partial<...>): Promise<boolean>;
  delete(id: string): Promise<boolean>;
  list(filter: MemoryFilter): Promise<{ data: Memory[]; total: number; byType: Record<string, number> }>;

  // جستوجو
  search(config: SearchConfig): Promise<Memory[]>;

  // سلامت
  health(): Promise<HealthCheckResult>;

  // چرخهٔ حیات (اختیاری)
  initialize?(): Promise<void>;
  shutdown?(): Promise<void>;
}
```

#### MemoryManager (`manager.ts`)

هماهنگکنندهٔ Singleton که:

- بکاندها را از طریق `register(backend)` **ثبت میکند** — هنگام راهاندازی از `index.ts` فراخوانی میشود
- بکاند اصلی و جایگزینها را از طریق `configure(primary, fallbacks)` **پیکربندی میکند**
- عملیات CRUD/جستوجو را به بکاند اصلی **مسیریابی میکند** و در صورت شکست از زنجیرهٔ جایگزین استفاده میکند
- بهصورت دورهای **سلامت تمام بکاندها را بررسی میکند**

**رفتار جایگزینی:**

| عملیات   | اصلی                                | جایگزینها                       |
| -------- | ----------------------------------- | ------------------------------- |
| `create` | ✅ فقط اصلی                         | ❌                              |
| `get`    | ✅ ابتدا بکاند اصلی را امتحان میکند | ✅ اگر نتیجه null باشد، جایگزین |
| `update` | ✅ فقط اصلی                         | ✅ همگامسازی بدون انتظار نتیجه  |
| `delete` | ✅ فقط اصلی                         | ✅ همگامسازی بدون انتظار نتیجه  |
| `list`   | ✅ فقط اصلی                         | ❌                              |
| `search` | ✅ ابتدا اصلی                       | ✅ در صورت خطا، جایگزین         |

#### GenericMemoryBackend (`genericBackend.ts`)

یک اتصالدهندهٔ عمومی HTTP که هر REST API را با MemoryBackend سازگار میکند. مناسب برای:

- **Notion** — اتصال از طریق Notion API
- **Obsidian** — اتصال از طریق Obsidian Local REST API
- **بکاندهای سفارشی** — هر سرویسی که یک API حافظهٔ RESTful ارائه میدهد

**پیکربندی:**

```typescript
interface GenericBackendConfig {
  baseUrl: string;           // نشانی پایه API بکاند
  apiKey?: string;           // توکن Bearer برای احراز هویت
  headers?: Record<string, string>;  // هدرهای HTTP سفارشی
  timeout?: number;          // مهلت زمانی درخواست (پیشفرض: 30000ms)
  backendType?: string;      // برای ثبت گزارش

  // بازنویسی نقاط پایانی (مقادیر پیشفرض از قراردادهای REST استفاده میکنند)
  endpoints?: {
    search?: string;   // پیشفرض: "/memories/search"
    create?: string;   // پیشفرض: "/memories"
    list?: string;     // پیشفرض: "/memories"
    get?: string;      // پیشفرض: "/memories/{id}"
    update?: string;   // پیشفرض: "/memories/{id}"
    delete?: string;   // پیشفرض: "/memories/{id}"
    health?: string;   // پیشفرض: "/health"
  };

  // نگاشت نام پارامترهای کوئری
  queryParams?: {
    query?/apiKeyId?/limit?/offset?/strategy?/maxTokens?/type?/sessionId?/orderBy?/orderDir?/options?
  };

  // نگاشت نام پارامترهای مسیر
  pathParams?: {
    id?/memoryId?
  };
}
```

**بکاندهای شناختهشده** در `KNOWN_BACKENDS` از پیش پیکربندی شدهاند:

```typescript
createKnownBackend("obsidian"); // → GenericMemoryBackend با اشاره به localhost:27123
createKnownBackend("notion"); // → GenericMemoryBackend با اشاره به api.notion.com/v1
```

#### بکاندهای داخلی

##### SQLiteBackend (`sqliteBackend.ts`)

بکاند اصلی پیشفرض. ذخیرهساز حافظه مبتنی بر SQLite موجود را با استفاده از `src/lib/memory/store.ts` پوشش میدهد. هنگام راهاندازی بهطور خودکار ثبت میشود.

```typescript
import { sqliteBackend } from "./sqliteBackend";
memoryManager.register(sqliteBackend);
```

##### ObsidianBackend (`obsidianBackend.ts`)

یکپارچهسازی موجود Obsidian (`src/lib/memory/obsidianBackend.ts`) را پوشش میدهد. از طریق Obsidian Local REST API به یک خزانه Obsidian متصل میشود.

### تنظیمات

تنظیمات بکاند حافظه در جدول تنظیمات برنامه ذخیره شده و از طریق `src/lib/memory/settings.ts` مدیریت میشوند:

| تنظیم             | کلید محیط/پیکربندی       | پیشفرض     | توضیحات                           |
| ----------------- | ------------------------ | ---------- | --------------------------------- |
| بکاند اصلی        | `memoryPrimaryBackend`   | `"sqlite"` | شناسه بکاند اصلی                  |
| بکاندهای جایگزین  | `memoryFallbackBackends` | `[]`       | شناسههای مرتبشده بکاندهای جایگزین |
| پیکربندیهای بکاند | `memoryBackendConfigs`   | `{}`       | بازنویسی پیکربندی برای هر بکاند   |

تنظیمات از طریق `normalizeMemorySettings()` نرمالسازی و در `getMemorySettings()` کش میشوند.

### جریان مقداردهی اولیه

```
راهاندازی برنامه
  → واردکردنهای index.ts (اثر جانبی): SQLiteBackend را ثبت میکند
  → initMemoryBackends() از چرخه حیات برنامه فراخوانی میشود:
      1. بارگذاری تنظیمات (getMemorySettings)
      2. پیکربندی بکاند اصلی و جایگزین
      3. مقداردهی اولیه همه بکاندها (بررسی سلامت)
      4. آماده دریافت درخواستها
```

### افزودن یک بکاند جدید

1. رابط **`MemoryBackend` را پیادهسازی کنید** در `src/lib/memory/<name>Backend.ts`
2. **صادر کنید** از `src/lib/memory/index.ts`
3. **ثبت کنید** با `memoryManager.register(yourBackend)` هنگام راهاندازی
4. **پیکربندی کنید** از طریق تنظیمات: مقدار `memoryPrimaryBackend` را روی شناسه بکاند خود تنظیم کنید
5. **آزمایش کنید** با استفاده از `src/lib/memory/__tests__/generic-backend.test.ts` بهعنوان مرجع

#### نمونه: بکاند Brain

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

### اعتبارسنجی

#### آزمونهای واحد

```bash
npx vitest run src/lib/memory/__tests__/generic-backend.test.ts --reporter=verbose
```

خروجی مورد انتظار: **35 آزمون، همگی موفق** که موارد زیر را پوشش میدهند:

- سازنده (2)
- بررسی سلامت (4) — موفقیت، خطای 500، خطای شبکه، تأخیر
- مقداردهی اولیه (2) — موفقیت، شکست
- ایجاد (2) — نقطه پایانی پیشفرض، نقطه پایانی سفارشی
- دریافت (4) — موفقیت، 404 ← null، پرتاب خطا برای موارد غیر از 404، پارامترهای مسیر سفارشی
- بهروزرسانی (2) — موفقیت، 404 ← false
- حذف (2) — موفقیت، 404 ← false
- فهرست (2) — پارامترهای کوئری، نامهای سفارشی پارامترها
- جستوجو (3) — پارامترهای کوئری، نقطه پایانی سفارشی، سریالسازی گزینهها
- هدرهای احراز هویت (2) — توکن Bearer، هدرهای سفارشی
- کارخانه (1)

#### بررسی نوع

```bash
npm run typecheck:core
```

مورد انتظار: **0 خطا**.
