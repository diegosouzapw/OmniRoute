# Memory System (العربية)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/MEMORY.md) · 🇪🇹 [am](../../../am/docs/frameworks/MEMORY.md) · 🇦🇿 [az](../../../az/docs/frameworks/MEMORY.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/MEMORY.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/MEMORY.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/MEMORY.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/MEMORY.md) · 🇩🇰 [da](../../../da/docs/frameworks/MEMORY.md) · 🇩🇪 [de](../../../de/docs/frameworks/MEMORY.md) · 🇬🇷 [el](../../../el/docs/frameworks/MEMORY.md) · 🇪🇸 [es](../../../es/docs/frameworks/MEMORY.md) · 🇪🇪 [et](../../../et/docs/frameworks/MEMORY.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/MEMORY.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/MEMORY.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/MEMORY.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/MEMORY.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/MEMORY.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/MEMORY.md) · 🇮🇱 [he](../../../he/docs/frameworks/MEMORY.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/MEMORY.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/MEMORY.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/MEMORY.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/MEMORY.md) · 🇮🇩 [id](../../../id/docs/frameworks/MEMORY.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/MEMORY.md) · 🇮🇹 [it](../../../it/docs/frameworks/MEMORY.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/MEMORY.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/MEMORY.md) · 🇰🇭 [km](../../../km/docs/frameworks/MEMORY.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/MEMORY.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/MEMORY.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/MEMORY.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/MEMORY.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/MEMORY.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/MEMORY.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/MEMORY.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/MEMORY.md) · 🇲🇲 [my](../../../my/docs/frameworks/MEMORY.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/MEMORY.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/MEMORY.md) · 🇳🇴 [no](../../../no/docs/frameworks/MEMORY.md) · 🇮🇳 [or](../../../or/docs/frameworks/MEMORY.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/MEMORY.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/MEMORY.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/MEMORY.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/MEMORY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/MEMORY.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/MEMORY.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/MEMORY.md) · 🇱🇰 [si](../../../si/docs/frameworks/MEMORY.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/MEMORY.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/MEMORY.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/MEMORY.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/MEMORY.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/MEMORY.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/MEMORY.md) · 🇮🇳 [te](../../../te/docs/frameworks/MEMORY.md) · 🇹🇭 [th](../../../th/docs/frameworks/MEMORY.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/MEMORY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/MEMORY.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/MEMORY.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/MEMORY.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/MEMORY.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/MEMORY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/MEMORY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/MEMORY.md)

---

> **المصدر الموثوق:** `src/lib/memory/` و`src/app/api/memory/`
> **آخر تحديث:** 2026-06-28 — v3.8.40 (تعطيل افتراضي + استدراك تكميم int8)

يوفّر OmniRoute ذاكرة دائمة للمحادثات مرتبطة بمفتاح API (ومعرّف الجلسة اختياريًا). تُستخرج الذكريات تلقائيًا من استجابات LLM عبر مطابقة أنماط regex خفيفة، ثم تُحقن مرة أخرى في الطلبات اللاحقة على هيئة رسالة نظام في البداية (أو أول رسالة مستخدم لدى المزوّدين الذين يرفضون دور النظام).

> **الذاكرة معطّلة افتراضيًا (v3.8.30+).** أصبحت قيمة `DEFAULT_MEMORY_SETTINGS.enabled`
> الآن `false` (`src/lib/memory/settings.ts`). يؤدي تمكين الذاكرة إلى حقن ما يصل إلى
> `maxTokens` (~2k) من السياق المسترجع في **كل** طلب محادثة، وتُحتسب تكلفته —
> وهي تكلفة قد تكون مفاجئة لعمليات التثبيت الجديدة وللعملاء الذين يديرون سياقهم
> بأنفسهم. اشترك صراحةً من خلال **الإعدادات ← الذاكرة** (تعرض
> `MemorySkillsTab` تنبيهًا تحذيريًا بشأن تكلفة الرموز عند تمكين الذاكرة).
> يمكن للعميل استثناء طلب واحد باستخدام ترويسة الطلب `x-omniroute-no-memory`
> (`true`/`1`/`yes`) — راجع جدول ترويسات الطلب في
> [API_REFERENCE.md](../reference/API_REFERENCE.md). يضبط الطلب من دون ذاكرة
> `memoryOwnerId = null`، ما يعطّل **كلاً من** حقن الذاكرة والمهارات لهذا
> الطلب (`open-sse/handlers/chatCore/headers.ts::isNoMemoryRequested`).

يقتصر نطاق الذاكرة **على كل مفتاح API**، وليس على كل مستخدم — تشترك جميع الطلبات المصادَق عليها باستخدام مفتاح API نفسه في مخزون الذاكرة ذاته، مع إمكانية تضييق النطاق بشكل إضافي عبر `sessionId`.

## البنية

```
العميل → /v1/chat/completions (يُحل apiKeyInfo في مرحلة سابقة)
  → handleChatCore() [open-sse/handlers/chatCore.ts]
    → resolveMemoryOwnerId(apiKeyInfo)        # يستخرج المعرّف
    → getMemorySettings()                     # إعدادات مخزّنة مؤقتًا
    → shouldInjectMemory(body, {enabled})     # بوابة التحكم
    → retrieveMemories(apiKeyId, config)      # SQL + FTS5 + متجه اختياري
    → injectMemory(body, memories, provider)  # رسالة نظام أو مستخدم
  → استدعاء المزوّد في المنبع
  → عند الاستجابة: extractFacts(text, apiKeyId, sessionId)  # غير حاجب
    → setImmediate → createMemory(fact) لكل تطابق
                   → embed(content) + upsertVector(id, vec)
```

ترتبط مواضع استدعاء الحقن والاستخراج في
`open-sse/handlers/chatCore.ts` (ابحث عن `retrieveMemories` و`injectMemory`
و`extractFacts`).

## بنية المحرك (حلّ من 3 طبقات)

يحدّد محرك الذاكرة مسار الاسترجاع في وقت التشغيل استنادًا إلى البنية التحتية والإعدادات المتاحة. توجد ثلاث طبقات، تُطبّق بحسب ترتيب الأولوية:

```
  ┌─────────────────────────────────────────────────────────────┐
  │  الطبقة 0 — الكلمات المفتاحية (FTS5)                         │
  │  التوفر القائم على الفحص: يتوفر FTS5 عندما تدعمه بنية SQLite │
  │  (better-sqlite3 / node:sqlite / bun:sqlite)؛                │
  │  ولا يتوفر في البنى التي تفتقر إلى FTS5 (مثل sql.js/WASM —   │
  │  "no such module: fts5"). يُستخدم عندما تكون                 │
  │  strategy = "exact" أو كخيار احتياطي؛ وتعكس حالة keyword في  │
  │  engine-status نتيجة الفحص.                                  │
  └──────────────────────────────────┬──────────────────────────┘
                                     │ هل strategy = semantic|hybrid؟
                                     ▼
  ┌─────────────────────────────────────────────────────────────┐
  │  الطبقة 1 — المتجه المضمّن (sqlite-vec)                      │
  │  يُحمَّل sqlite-vec v0.1.9 عبر db.loadExtension().            │
  │  بحث KNN شامل في متجهات Float32. تكون نشطة عندما:            │
  │   • ينجح sqlite-vec loadExtension                            │
  │   • يتوفر مصدر تضمين (remote | static | transformers)        │
  │     قادر على إنتاج Float32Array                              │
  │   • يكون جدول vec_memories موجودًا (يُنشأ عند أول ready())   │
  └──────────────────────────────────┬──────────────────────────┘
                                     │ هل qdrant.enabled؟
                                     ▼
  ┌─────────────────────────────────────────────────────────────┐
  │  الطبقة 2 — Qdrant (قاعدة بيانات متجهية خارجية اختيارية)     │
  │  عند تمكينها، تحل محل sqlite-vec للاستراتيجية الدلالية/      │
  │  الهجينة. تتطلب مثيل Qdrant قيد التشغيل ومضيفًا/منفذًا       │
  │  مهيّأين.                                                     │
  └─────────────────────────────────────────────────────────────┘
```

يحدث التراجع تلقائيًا وبشفافية:

- إذا فشل تحميل sqlite-vec، تصبح الطبقة 1 غير متاحة ← ويجري الرجوع إلى الطبقة 0.
- إذا أعاد مصدر التضمين خطأً، ترجع الطبقة 1 إلى الطبقة 0.
- إذا كان Qdrant غير سليم، ترجع الطبقة 2 إلى الطبقة 1 (أو الطبقة 0 إذا كانت الطبقة 1 غير متاحة أيضًا).

## مصادر التضمين

تحدّد طبقة التضمين (`src/lib/memory/embedding/`) المصدر الذي يجب استخدامه
استنادًا إلى `MemorySettingsExtended.embeddingSource`:

| المصدر         | الوصف                                                                             | يتطلب مفتاحًا | البدء البارد     |
| -------------- | --------------------------------------------------------------------------------- | ------------- | ---------------- |
| `remote`       | يستخدم واجهة API للتضمين من موفّر مُهيأ (OpenAI وCohere وغيرهما)                  | نعم           | لا يوجد          |
| `static`       | تضمين محلي عبر جدول بحث باستخدام `potion-base-8M` ‏(WordPiece + التجميع بالمتوسط) | لا            | ~200ms           |
| `transformers` | استدلال ONNX محلي عبر `@huggingface/transformers` v4 و`all-MiniLM-L6-v2`          | لا            | ~3s + ~400MB RAM |
| `auto`         | تحديد أثناء التشغيل: remote (إذا وُجد مفتاح) → static → transformers → null       | يعتمد         | يعتمد            |

**ترتيب التحديد لـ `auto`:**

1. ابحث عن أول موفّر في `listEmbeddingProviders()` تكون لديه `hasKey === true` ← `remote`.
2. إذا كانت `settings.staticEnabled === true` ← `static`.
3. إذا كانت `settings.transformersEnabled === true` ← `transformers`.
4. بخلاف ذلك ← `null` (يتراجع إلى البحث بالكلمات المفتاحية باستخدام FTS5).

تستخدم ذاكرة التخزين المؤقت للتضمين (`src/lib/memory/embedding/cache.ts`) خريطة
LRU داخل الذاكرة، بمفاتيح على النمط `${source}:${model}:${dim}:${sha256(text)}`، وبحد أقصى
`MEMORY_EMBEDDING_CACHE_MAX` من الإدخالات (القيمة الافتراضية 1000)، مع مدة صلاحية
`MEMORY_EMBEDDING_CACHE_TTL_MS` (القيمة الافتراضية 5 دقائق). وتكون مشتركة بين جميع المستدعين
طوال دورة حياة العملية.

## الدمج الهجين باستخدام RRF ‏(k=60)

عندما تكون `strategy = "hybrid"` ويكون مخزن المتجهات متاحًا، يستخدم الاسترجاع
دمج الرتب المتبادلة لدمج نتائج FTS5 ونتائج المتجهات:

```
RRF(d) = Σ  1 / (k + rank_i(d))      حيث k = 60 (قابل للتهيئة عبر MEMORY_RRF_K)
          i
```

وتحديدًا:

1. نفّذ بحث FTS5 ← القائمة المرتبة `R_fts` (المواضع 1..N).
2. نفّذ بحث المتجهات KNN ← القائمة المرتبة `R_vec` (المواضع 1..M).
3. لكل `memoryId` فريد:  
   `rrf_score = 1/(60 + fts_rank)` + `1/(60 + vec_rank)` (تكون القيمة 0 إذا لم يكن موجودًا في القائمة).
4. رتّب حسب `rrf_score` ترتيبًا تنازليًا، ثم طبّق اجتياز ميزانية الرموز.

من المعروف أن RRF فعّال دون الحاجة إلى تطبيع الدرجات بين
أنظمة الاسترجاع غير المتجانسة. تأتي القيمة الافتراضية `k=60` من ورقة
Cormack وآخرين الأصلية، وتعمل جيدًا مع المجموعات الصغيرة (<10k من الذكريات).

## الملء اللاحق (الكسول + إعادة الفهرسة)

عندما يتغير نموذج التضمين (ويُكتشف ذلك عبر `embedding_signature`)، يُعاد
بناء مخزن المتجهات، وتُعلَّم جميع الذكريات الموجودة بالقيمة
`needs_reindex = 1` في جدول `memories`.

**الملء اللاحق الكسول**: عند عملية الاسترجاع التالية، تُضمَّن أي ذاكرة ينقصها إدخال متجه
وتُدرج في `vec_memories` قبل تشغيل البحث. يؤدي ذلك إلى توزيع تكلفة الملء اللاحق
على الطلبات الفعلية دون حظر بدء التشغيل.

**إعادة الفهرسة الصريحة**: توفّر علامة تبويب Engine في `/dashboard/memory` زرًا
باسم "إعادة الفهرسة الآن"، يستدعي `POST /api/memory/reindex`. يستدعي المعالج
`runReindexBatch()` من `src/lib/memory/reindex.ts`، الذي يعالج ما يصل إلى
`limit` من الإدخالات المعلّقة لكل طلب. ويمكن استطلاع التقدم عبر
`GET /api/memory/engine-status` ‏(`vectorStore.needsReindex`).

يخزّن جدول `memory_vec_meta` (الترحيل `083_memory_vec.sql`) ما يلي:

- `active_dim` — بُعد المتجه الحالي (null = لم تتم معايرته بعد).
- `embedding_signature` — القيمة `${source}:${model}:${dim}` المستخدمة لاكتشاف التغييرات.
- `last_reset_at` — الطابع الزمني لآخر إعادة تعيين كاملة.
- `vec_loaded` — علامة 0/1 تشير إلى ما إذا تم تحميل sqlite-vec بنجاح.

## امتداد الإعدادات

تتوفر تسعة حقول للتضمين والمتجهات في `MemorySettingsExtended` ضمن
`src/shared/schemas/memory.ts`، ويتم حفظها عبر `src/lib/db/settings.ts`:

| الحقل                    | النوع                                              | القيمة الافتراضية | الوصف                                                               |
| ------------------------ | -------------------------------------------------- | ----------------- | ------------------------------------------------------------------- |
| `embeddingSource`        | `"remote" \| "static" \| "transformers" \| "auto"` | `"auto"`          | مصدر التضمين الذي سيُستخدم                                          |
| `embeddingProviderModel` | `string \| null`                                   | `null`            | المزوّد/النموذج بتنسيق `provider/model`                             |
| `customBaseUrl`          | `string \| null`                                   | `null`            | عنوان URL الأساسي لنقطة نهاية متوافقة مع OpenAI ومخصّصة للذاكرة فقط |
| `customModelId`          | `string \| null`                                   | `null`            | معرّف النموذج المُرسل إلى نقطة النهاية المخصّصة                     |
| `transformersEnabled`    | `boolean`                                          | `false`           | الاشتراك الاختياري في Transformers.js ‏(MiniLM، بحجم ~400MB)        |
| `staticEnabled`          | `boolean`                                          | `false`           | الاشتراك الاختياري في نموذج potion-base-8M المحلي الثابت            |
| `rerankEnabled`          | `boolean`                                          | `false`           | تمكين خطوة إعادة الترتيب (تضيف +200-500ms/req)                      |
| `rerankProviderModel`    | `string \| null`                                   | `null`            | مزوّد/نموذج إعادة الترتيب بتنسيق `provider/model`                   |

يتم تحليل `rerankProviderModel` بواسطة `POST /v1/rerank` (ويُستدعى عبر واجهة الاسترجاع المحلية)، لذا فهو يقبل أي قيمة يقبلها ذلك المسار: نموذج إعادة ترتيب سحابي منسّق (`cohere/rerank-v3.5`، `jina-ai/jina-reranker-v3.5`، …) أو عقدة مزوّد متوافقة مع OpenAI بالصيغة `<node-prefix>/<model>` (مثل `skilled-mini/bge-reranker-v2-m3` لصندوق TEI/Infinity). تكون عقد الاسترجاع المحلية مؤهلة دائمًا؛ أما العقدة الموجودة على مضيف آخر (LAN، Tailscale) فتتطلب أيضًا علامة الميزة `RERANK_REMOTE_PROVIDER_NODES` ويجب أن تجتاز سياسة عناوين URL الصادرة الخاصة بالمزوّد — راجع [علامات الميزات](../reference/FEATURE_FLAGS.md). تعرض أداة الاختيار في لوحة المعلومات المزوّدين المنسّقين بالإضافة إلى العقد المحلية؛ ويمكن تعيين أي سلسلة `provider/model` صالحة مباشرةً عبر `PUT /api/settings/memory`.
| `vectorStore` | `"sqlite-vec" \| "qdrant" \| "auto"` | `"auto"` | مخزن المتجهات الخلفي الذي سيُستخدم |

تُعرض هذه الإعدادات عبر `GET /PUT /api/settings/memory` (المخطط `MemorySettingsExtendedSchema`).

بالنسبة إلى المصدر `remote`، تقبل الذاكرة أيضًا الإعدادين الاختياريين `customBaseUrl` و
`customModelId`. ويحددان معًا نقطة نهاية `/embeddings` متوافقة مع OpenAI
والنموذج، من دون تغيير سجل التضمين العام. تتم تسوية نقطة النهاية
قبل استخدامها وفحصها وفقًا لسياسة عناوين URL الصادرة الخاصة بالمزوّد: يلزم استخدام HTTP(S)،
وتُرفض بيانات الاعتماد المضمّنة وسلاسل الاستعلام، كما تظل عناوين
بيانات تعريف السحابة محظورة. تحافظ القيم الفارغة على مزوّد السجل المحدد. تُنقَّح الأخطاء
المُعادة إلى لوحة المعلومات، ولا تُسجَّل بيانات اعتماد نقطة النهاية مطلقًا.

> **مهمة مطلوبة (D20):** النطاق `global` (مشاركة الذكريات عبر جميع مفاتيح API) غير
> مطبّق في هذا الإصدار. فهو يتطلب تغييرات في المخطط ومسار استرجاع
> عامًا. يجب تتبعه بشكل منفصل.

## طبقات التخزين

### الأساسية: SQLite (جدول `memories`)

يُنشأ بواسطة الترحيل `015_create_memories.sql`:

| العمود                      | النوع              | ملاحظات                                                                              |
| --------------------------- | ------------------ | ------------------------------------------------------------------------------------ |
| `id`                        | `TEXT PRIMARY KEY` | معرّف UUID مولّد عبر `crypto.randomUUID()`                                           |
| `api_key_id`                | `TEXT NOT NULL`    | مفتاح API المالك                                                                     |
| `session_id`                | `TEXT`             | نطاق اختياري لكل محادثة                                                              |
| `type`                      | `TEXT NOT NULL`    | إحدى القيم `factual`، أو `episodic`، أو `procedural`، أو `semantic`                  |
| `key`                       | `TEXT`             | مفتاح upsert ثابت، مثل `preference:i_prefer_python`                                  |
| `content`                   | `TEXT NOT NULL`    | نص المعلومة الفعلي                                                                   |
| `metadata`                  | `TEXT`             | كتلة JSON ‏(الفئة، ووقت الاستخراج، والمصدر، ...)                                     |
| `created_at` / `updated_at` | `TEXT`             | سلاسل ISO 8601                                                                       |
| `expires_at`                | `TEXT`             | انتهاء صلاحية اختياري؛ تعني `NULL` أنه دائم                                          |
| `memory_id`                 | `INTEGER UNIQUE`   | أُضيف بواسطة `023_fix_memory_fts_uuid.sql` للربط بين معرّفات UUID ومعرّفات صفوف FTS5 |

الفهارس: `api_key_id`، و`session_id`، و`type`، و`expires_at`، بالإضافة إلى الفهرس الفريد
`memory_id`.

**دلالات upsert**: تبحث `createMemory()` عن صف موجود بالقيمتين نفسيهما
`(api_key_id, key)` وتحدّثه في موضعه عند العثور عليه (مع دمج `metadata` عبر
نشر سطحي). يمنع ذلك نمو الجدول بلا حدود بسبب عبارات
التفضيلات المتكررة.

### البحث في النص الكامل (الجدول الافتراضي `memory_fts`)

ينشئ `022_add_memory_fts5.sql` جدول FTS5 افتراضيًا فوق `content` و
`key`. ويصلح `023_fix_memory_fts_uuid.sql` خطأً واقعيًا كان يمنع ربط مفتاح UUID
الأساسي بمعرّف الصف الصحيح في FTS5 — إذ يضيف الترحيل العمود
`memory_id`، ويعيد إنشاء جدول FTS، ويربط المشغلات
(`memory_fts_ai`، و`memory_fts_ad`، و`memory_fts_au`) التي تحافظ على مزامنة FTS عند
INSERT وDELETE وUPDATE.

يستخدمه `retrieval.ts` لاستراتيجيتي `semantic` و`hybrid` (انظر أدناه).
تحمي شيفرة الاسترجاع التنفيذ باستخدام `hasTable("memory_fts")`، وتعود إلى
الترتيب الزمني إذا كان جدول FTS مفقودًا أو أدى استعلام FTS إلى خطأ.

### اختياري: Qdrant (الطبقة الثانية لمخزن المتجهات)

ينفّذ `src/lib/memory/qdrant.ts` تكاملًا اختياريًا مع Qdrant بوصفه مخزن متجهات من الطبقة الثانية.
لا يوجّه الاسترجاع الطلبات إلى Qdrant إلا عندما يكون محدد المحرك
`memoryVectorStore === "qdrant"` — أما القيمة الافتراضية `"auto"` (وكذلك `"sqlite-vec"`)
فلا تحدد Qdrant **مطلقًا**. يضبط مفتاح التبديل في علامة تبويب المحرك **كلا** الإعدادين `qdrantEnabled` و
`memoryVectorStore` معًا: يؤدي التفعيل إلى جعل Qdrant المخزن الأساسي، بينما تعيد
عملية التعطيل القيمة إلى `"auto"` (#5597 — قبل ذلك الإصلاح، لم يكن للتفعيل أي أثر لأن لا شيء
كان يكتب إلى محدد المحرك). إذا تعذر الوصول إلى Qdrant أو لم يُرجع شيئًا، يعود الاسترجاع
إلى sqlite-vec ← FTS5.

- `upsertSemanticMemoryPoint()` — يضمّن `key + content` باستخدام نموذج التضمين
  المُهيأ، ويتأكد من وجود المجموعة (وينشئ متجهات بمسافة جيب التمام عند
  أول استخدام)، ثم يُدرج نقطة أو يحدّثها بحمولة `{memoryId,
apiKeyId, sessionId, key, content, metadata, createdAtUnix, expiresAtUnix}`.
- `searchSemanticMemory(query, topK, scope)` — يضمّن الاستعلام، ويبحث في
  المجموعة بعد تصفيتها حسب `kind = "omniroute_memory"`، واختياريًا حسب
  `apiKeyId` / `sessionId`. ويقيّد `topK` بالنطاق `[1, 20]`.
- `deleteSemanticMemoryPoint(id)` — يحذف نقطة واحدة. تستدعيه
  `deleteMemory()` بعد إزالة الصف من SQLite ‏(D15).
- `cleanupSemanticMemoryPoints({retentionDays})` — يحذف جماعيًا النقاط التي يكون
  `expiresAtUnix` لها في الماضي، أو التي يكون `createdAtUnix` لها أقدم من
  حد الاحتفاظ. ويحسب العدد أولًا لكي تتمكن لوحة المعلومات من عرض الأرقام الفعلية.
- `checkQdrantHealth()` — مسبار صحة `GET /readyz` مع قياس زمن الاستجابة.

تعرض واجهة مستخدم الإعدادات تهيئة Qdrant، وفحص الصحة، واختبار البحث الدلالي،
والتنظيف في **علامة تبويب المحرك** ضمن `/dashboard/memory`. جميع المسارات المقابلة
ضمن `src/app/api/settings/qdrant/` موصولة اعتبارًا من v3.8.6:

| المسار                                  | الطريقة       | الوصف                                  |
| --------------------------------------- | ------------- | -------------------------------------- |
| `/api/settings/qdrant`                  | `GET` / `PUT` | قراءة / تحديث إعدادات Qdrant           |
| `/api/settings/qdrant/health`           | `GET`         | مسبار الجاهزية + زمن الاستجابة         |
| `/api/settings/qdrant/search`           | `POST`        | اختبار البحث الدلالي                   |
| `/api/settings/qdrant/cleanup`          | `POST`        | إزالة النقاط منتهية الصلاحية / القديمة |
| `/api/settings/qdrant/embedding-models` | `GET`         | سرد نماذج التضمين المتاحة              |

**ملاحظات السلوك (ما يمكن توقعه):**

- **اختيار المحرك** — يؤدي تمكين Qdrant في علامة تبويب المحرك إلى جعله
  المخزن الأساسي (يضبط `memoryVectorStore="qdrant"`)، بينما تؤدي إعاقته إلى
  إعادة الضبط إلى `"auto"` ‏(#5597).
- **لا توجد تعبئة رجعية** — لا تُكتب إليه سوى الذكريات التي يتم إنشاؤها/تحديثها
  **بعد** تمكين Qdrant (كتابة مزدوجة بنمط الإرسال دون انتظار). لا يتم ترحيل
  ذكريات SQLite الموجودة مسبقًا؛ إذ يعيد "إعادة الفهرسة الآن" بناء فهرس
  sqlite-vec فقط، وليس Qdrant.
- **يُكتشف بُعد المتجه تلقائيًا** من التضمين الفعلي عند أول استخدام — ولا يوجد
  حقل للبُعد يجب ملؤه. لا تتم معالجة تغيير نموذج التضمين تلقائيًا بعد وجود
  مجموعة: تُترك المجموعة الحالية دون تغيير، وتفشل عمليات الكتابة/البحث ذات
  الأبعاد غير المتطابقة وتعود إلى sqlite-vec. أعد إنشاء المجموعة (باسم جديد،
  أو احذفها في Qdrant) للتبديل بين نماذج التضمين.
- **مقياس المسافة** — يكون دائمًا **جيب التمام** (مُضمّن برمجيًا عند إنشاء
  المجموعة، وغير قابل للتهيئة).
- **المصادقة** — مفتاح API فقط (يُرسل في ترويسة `api-key`؛ وهو اختياري
  لـ Docker المحلي غير المحمي بالمصادقة). لا يُستخدم JWT/RBAC.
- **حقول التهيئة** — تعرض واجهة المستخدم `host`، و`port`، و`collection`،
  و`embeddingModel`، و`apiKey`. أما `vectorSize` / `hnswEfConstruct` فهما
  متاحان عبر متغيرات البيئة/قاعدة البيانات فقط، ولا يُستخدم `vectorSize`
  لإنشاء المجموعة (إذ يأتي البُعد من التضمين).

### تكميم المتجهات (int8 — اختياري، لكلا الواجهتين الخلفيتين)

تدعم كلتا الواجهتين الخلفيتين للمتجهات **تكميم int8 الاختياري** لتقليل
البصمة الذاكرية للمتجهات المخزنة (أصغر بنحو 4 مرات من Float32) مقابل انخفاض
طفيف في الاسترجاع. يكون الخيار الافتراضي **معطلًا** في كلتيهما — وتظل
المتجهات بكامل الدقة ما لم يُمكّن صراحةً.

| الواجهة الخلفية | الإعداد                                | النوع                          | الافتراضي | موضع القراءة                                                |
| --------------- | -------------------------------------- | ------------------------------ | --------- | ----------------------------------------------------------- |
| Qdrant          | `qdrantQuantization` (مفتاح DB)        | `"none" \| "int8" \| "binary"` | `"none"`  | `src/lib/memory/qdrant.ts::normalizeQdrantConfig()`         |
| sqlite-vec      | `MEMORY_VEC_QUANTIZATION` (متغير بيئة) | `"none" \| "int8"`             | `"none"`  | `src/lib/memory/vectorStore.ts::requestedVecQuantization()` |

- تتم تهيئة **Qdrant** لكل مثيل عبر مفتاح الإعداد `qdrantQuantization`
  (المعروض باعتباره الحقل `quantization` في `PUT /api/settings/qdrant`). عندما
  تكون قيمته `"int8"`، تطلب `buildQuantizationConfig()` تكميمًا قياسيًا
  (`always_ram`، وبكمّية `0.99`)، وتُمكّن عمليات البحث `rescore: true` لكي
  تُحسّن المتجهات كاملة الدقة مجموعة مرشحي int8.
- يكون تكميم **sqlite-vec** **عبر البيئة فقط** (وليس إعدادًا في DB): اضبط
  `MEMORY_VEC_QUANTIZATION=int8` لتخزين المتجهات المحلية كعمود `int8[dim]`
  عبر `vec_quantize_int8(?, 'unit')`. يُدمج الوضع المختار في
  `embedding_signature` (لاحقة `:int8`)، ولذلك يؤدي تبديل الأوضاع إلى إعادة
  فهرسة كاملة لجدول `vec_memories` — وهو مسار التعبئة الرجعية الكسولة نفسه
  المستخدم عند تغيير نموذج التضمين.

## أنواع الذاكرة

`MemoryType` (`src/lib/memory/types.ts`):

| النوع        | الاستخدام                                                              |
| ------------ | ---------------------------------------------------------------------- |
| `factual`    | التفضيلات، وحقائق المستخدم الثابتة، والأنماط السلوكية                  |
| `episodic`   | القرارات المرتبطة بلحظة محددة ("اخترت Postgres")                       |
| `procedural` | ذاكرة سير العمل / كيفية التنفيذ (محجوزة؛ لا يوجد مستخرج تلقائي حاليًا) |
| `semantic`   | محجوزة لإدخالات مخزن المتجهات                                          |

تكون استراتيجية الاسترجاع في `MemoryConfig` واحدة من `exact` أو `semantic` أو `hybrid`،
ويكون النطاق واحدًا من `session` أو `apiKey` أو `global`. النطاق الافتراضي من
`getMemorySettings()` هو `apiKey`.

## استخراج الحقائق (`extraction.ts`)

يعتمد الاستخراج على **التعبيرات النمطية**، وليس على LLM — ويُنفَّذ داخل العملية باستخدام
`setImmediate()` كي لا يحظر تدفق الاستجابة مطلقًا:

- **أنماط التفضيلات** → `MemoryType.FACTUAL`
  (مثل `أفضل …`، `أحب حقًا …`، `المفضل لدي هو …`، `أكره …`)
- **أنماط القرارات** → `MemoryType.EPISODIC`
  (مثل `سأستخدم …`، `اخترت …`، `قررت استخدام …`، `سأعتمد …`)
- **أنماط السلوك** → `MemoryType.FACTUAL`
  (مثل `عادةً ما …`، `دائمًا ما …`، `أميل إلى …`)

تُعقَّم كل مطابقة (`trim`، ودمج المسافات البيضاء، وتحديد الحد الأقصى عند 500 حرف)،
وتُزال تكراراتها داخل الدفعة باستخدام `factKey(category, content)` ثابت، ثم
تُخزَّن عبر `createMemory()` مع البيانات الوصفية
`{category, extractedAt, source: "llm_response"}`. يُحدَّد نص الإدخال بحد أقصى
يبلغ 64 KiB (`MAX_EXTRACTION_TEXT_LENGTH`) — وعندما يكون أطول من ذلك، يُستخدم **ذيل** النص
بحيث يشارك دائمًا أحدث محتوى من المساعد.

تُصدَّر `extractFactsFromText(text)` للاختبارات، وتُعيد الحقائق المنظَّمة
دون تخزينها.

## الاسترجاع (`retrieval.ts`)

تُعد `retrieveMemories(apiKeyId, config)` نقطة الدخول الرئيسية. وهي:

1. تطبّع الإعدادات وتتحقق من صحتها عبر `MemoryConfigSchema`.
2. تُعيد `[]` فورًا عندما تكون `enabled` بقيمة false أو تكون `maxTokens <= 0`.
3. تقيّد `maxTokens` ضمن النطاق `[1, 8000]`.
4. تكتشف ما إذا كان جدول `memories` الحديث موجودًا (مقابل جدول `memory`
   القديم) لضمان استمرار عمل قواعد البيانات الأقدم.
5. تُنشئ الاستعلام الأساسي مع شرط انتهاء الصلاحية
   (`expires_at IS NULL OR datetime(expires_at) > datetime('now')`)، ونطاق
   جلسة اختياري، وحد `retentionDays` اختياري.
6. تتفرع بحسب الاستراتيجية:
   - **`exact`** (الافتراضية): ترتيب زمني `ORDER BY created_at DESC LIMIT 100`.
   - **`semantic`**: إذا كانت `config.query` موجودة وكان `memory_fts` موجودًا، تُجري JOIN
     باستخدام `memory_fts MATCH ?` وترتب حسب رتبة FTS؛ وتعود إلى الترتيب الزمني
     عندما يعيد FTS عدد 0 من الصفوف.
   - **`hybrid`**: اتحاد نتائج FTS (ذات الصلة الأعلى) والمجموعة
     الزمنية، مع إزالة التكرارات بحسب المعرّف.
7. تحسب درجة صلة بالكلمات المفتاحية (`getRelevanceScore`) عبر
   `content` و`key` وJSON الخاص بـ`metadata` عند توفير استعلام. وتُستبعد الصفوف
   ذات الدرجة الصفرية.
8. ترتب بحسب الدرجة تنازليًا، ثم بحسب `createdAt` تنازليًا.
9. تمر عبر القائمة المرتبة وتقبل الإدخالات ما دام إجمالي
   `estimateTokens(content)` التراكمي (≈ `length / 4`) ضمن الميزانية. وتُعيد دائمًا
   إدخالًا واحدًا على الأقل عند وجود أي مطابقة.

تُصدَّر `estimateTokens` وتُستخدم في الاسترجاع والتلخيص وأداة MCP
`omniroute_memory_search`.

## الحقن (`injection.ts`)

`injectMemory(request, memories, provider)`:

1. يدمج جميع محتويات الذاكرة في سلسلة نصية واحدة بالشكل `Memory context: …`.
2. يختار استراتيجيةً حسب اسم المزوّد:
   - **رسالة النظام** (الافتراضية لـ OpenAI وAnthropic وGemini وغيرها) — يضيف
     `{role: "system", content: memoryText}` في البداية قبل أي رسائل نظام
     موجودة، بحيث تظل مطالبات النظام الخاصة بالمستخدم ذات الأولوية.
   - **رسالة المستخدم** (احتياطية) — للمزوّدين الموجودين في
     `PROVIDERS_WITHOUT_SYSTEM_MESSAGE`: `o1`، و`o1-mini`، و`o1-preview`،
     و`glm`، و`glmt`، و`glm-cn`، و`zai`، و`qianfan`. يرفض هؤلاء دور النظام،
     وإلا فسيُرجعون الخطأ 400 (راجع المشكلة #1701 الخاصة بـ GLM/Zhipu).
3. يسجّل العدد والاستراتيجية والنموذج ضمن `memory.injection.injected`.

يتم تصدير `providerSupportsSystemMessage(provider)` للجهات المستدعية التي تحتاج إلى
اتخاذ قرارات التوجيه الخاصة بها. يستخدم المزوّدون غير المعروفين القيمة الافتراضية `true`
(دور النظام مسموح) لضمان السلامة.

## الإعدادات (`settings.ts`)

يتم **تخزين إعدادات الذاكرة في جدول إعدادات قاعدة البيانات**، وليس في متغيرات البيئة.
تقرأ `getMemorySettings()` من `getSettings()` وتخزّن النتيجة مؤقتًا
داخل العملية؛ ويستدعي مسار PUT الخاص بالإعدادات الدالة
`invalidateMemorySettingsCache()` بعد عمليات الكتابة.

### الحقول القديمة (جميع الإصدارات)

| مفتاح قاعدة البيانات  | النوع    | القيمة الافتراضية                                      | عنصر تحكم واجهة المستخدم                      |
| --------------------- | -------- | ------------------------------------------------------ | --------------------------------------------- |
| `memoryEnabled`       | منطقي    | `false` (متوقفة افتراضيًا منذ v3.8.30)                 | تشغيل/إيقاف الذاكرة                           |
| `memoryMaxTokens`     | عدد صحيح | `2000` (النطاق `0–16000`)                              | ميزانية الرموز للحقن                          |
| `memoryRetentionDays` | عدد صحيح | `30` (النطاق `1–365`)                                  | نافذة الاحتفاظ                                |
| `memoryStrategy`      | تعداد    | `"hybrid"` (إحدى `recent`، أو `semantic`، أو `hybrid`) | استراتيجية الاسترجاع                          |
| `skillsEnabled`       | منطقي    | `false`                                                | يبدّل حقن المهارات لكل مفتاح (راجع SKILLS.md) |

ملاحظة: تُطابِق استراتيجية واجهة المستخدم `"recent"` استراتيجية الاسترجاع الداخلية
`"exact"` عبر `toMemoryRetrievalConfig()` (بالترتيب الزمني).

### الحقول الجديدة (v3.8.6، الخطة 21 D9)

راجع أيضًا قسم "امتداد الإعدادات" أعلاه للاطلاع على أوصاف الحقول.

| مفتاح قاعدة البيانات        | حقل API                  | القيمة الافتراضية |
| --------------------------- | ------------------------ | ----------------- |
| `memoryEmbeddingSource`     | `embeddingSource`        | `"auto"`          |
| `memoryEmbeddingModel`      | `embeddingProviderModel` | `null`            |
| `memoryTransformersEnabled` | `transformersEnabled`    | `false`           |
| `memoryStaticEnabled`       | `staticEnabled`          | `false`           |
| `memoryRerankEnabled`       | `rerankEnabled`          | `false`           |
| `memoryRerankModel`         | `rerankProviderModel`    | `null`            |
| `memoryVectorStore`         | `vectorStore`            | `"auto"`          |

تُقرأ مفاتيح قاعدة البيانات المتعلقة بـ Qdrant (`qdrantEnabled`، و`qdrantHost`، و`qdrantPort`،
و`qdrantApiKey`، و`qdrantCollection` بقيمة افتراضية `"omniroute_memory"`،
و`qdrantEmbeddingModel` بقيمة افتراضية `"openai/text-embedding-3-small"`) بواسطة
`normalizeQdrantConfig()` في `qdrant.ts`.

### متغيرات البيئة (v3.8.6)

تضبط ستة متغيرات بيئة اختيارية سلوك المحرك أثناء التشغيل (موثقة في `.env.example`):

| المتغير                         | القيمة الافتراضية          | الوصف                                                                                                                                  |
| ------------------------------- | -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `MEMORY_EMBEDDING_CACHE_TTL_MS` | `300000`                   | مدة صلاحية ذاكرة التخزين المؤقت للتضمينات (5 دقائق)                                                                                    |
| `MEMORY_EMBEDDING_CACHE_MAX`    | `1000`                     | الحد الأقصى لعدد الإدخالات في ذاكرة LRU المؤقتة للتضمينات                                                                              |
| `MEMORY_TRANSFORMERS_MODEL`     | `Xenova/all-MiniLM-L6-v2`  | مستودع HF لنموذج Transformers.js                                                                                                       |
| `MEMORY_STATIC_MODEL`           | `minishlab/potion-base-8M` | مستودع HF لنموذج potion الثابت                                                                                                         |
| `MEMORY_STATIC_CACHE_DIR`       | `<DATA_DIR>/embeddings`    | مكان تخزين النماذج التي تم تنزيلها                                                                                                     |
| `MEMORY_VEC_TOP_K`              | `20`                       | قيمة top-K الافتراضية للبحث المتجهي                                                                                                    |
| `MEMORY_RRF_K`                  | `60`                       | ثابت k الخاص بـ RRF للبحث الهجين                                                                                                       |
| `MEMORY_VEC_QUANTIZATION`       | `none`                     | اضبطه على `int8` لتخزين متجهات sqlite-vec المحلية بعد تكميمها (أصغر بنحو 4 مرات؛ خيار اشتراك). يؤدي تغيير الوضع إلى فرض إعادة الفهرسة. |

## التلخيص (`summarization.ts`)

تضغط `summarizeMemories(apiKeyId, sessionId?, maxTokens = 4000)` المحتوى الأقدم
عندما يتجاوز إجمالي الرموز التراكمي لذاكرات أحد المفاتيح
الميزانية. تمرّ على الصفوف تنازليًا حسب `created_at`، وتحتفظ بالصفوف التي تتسع لها
الميزانية، وتستبدل في بقية الصفوف قيمة `content` في موضعها بأول ثلاث جمل من
النص الأصلي. تمثّل `tokensSaved` الفرق في `estimateTokens` بين المحتوى القديم
والجديد.

هذا الإجراء **متاح، لكنه لا يُستدعى تلقائيًا** في مسار
المحادثة الحالي — استدعِه من مهمة cron، أو إجراء إداري، أو
آلية ربط `MemoryConfig.autoSummarize` إذا كنت بحاجة إلى ضغط مستمر. فقدان
البيانات أحادي الاتجاه: إذ يُستبدل النص الأصلي.

## واجهة REST API

تتطلب جميع نقاط النهاية مصادقة الإدارة (`requireManagementAuth`).

### نقاط نهاية الذاكرة الأساسية (الحالية + المحدّثة)

| الطريقة  | المسار               | الوصف                                                                                                                                                                                                     |
| -------- | -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `GET`    | `/api/memory`        | قائمة مرقّمة الصفحات مع عوامل التصفية: `apiKeyId`، و`type`، و`sessionId`، و`q`، و`limit`، و`page`، و`offset`. تتضمن الاستجابة `stats.total`، و`stats.tokensUsed`، و`stats.hitRate`، و`cacheStats`         |
| `POST`   | `/api/memory`        | إنشاء إدخال (مع التحقق بواسطة Zod: ‏`content`، و`key`، واختياريًا `type`، و`sessionId`، و`apiKeyId`، و`metadata`، و`expiresAt`). يستدعي `createMemory()` الذي يُجري upsert استنادًا إلى `(apiKeyId, key)` |
| `GET`    | `/api/memory/[id]`   | جلب إدخال واحد بواسطة UUID                                                                                                                                                                                |
| `PUT`    | `/api/memory/[id]`   | تحديث حقول الإدخال (`type`، و`key`، و`content`، و`metadata`). المتن: `MemoryUpdatePutSchema`. يزامن المتجه أيضًا إذا كان مصدر التضمين متاحًا.                                                             |
| `DELETE` | `/api/memory/[id]`   | حذف إدخال؛ ويحذفه أيضًا من `vec_memories` ‏(D15) ومن Qdrant بأفضل جهد ممكن. يعيد 404 عند عدم وجوده.                                                                                                       |
| `GET`    | `/api/memory/health` | يشغّل `verifyExtractionPipeline("health-check")` — دورة كاملة من الإنشاء←السرد←الحذف. يعيد `{working, latencyMs, error?}`                                                                                 |

### نقاط نهاية محرك الذاكرة الجديدة (الخطة 21)

| الطريقة | المسار                            | الوصف                                                                                                                                                              |
| ------- | --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `POST`  | `/api/memory/retrieve-preview`    | تشغيل تجريبي لـ`retrieveMemories` — يعيد نتائج مرتبة مع الدرجة، والمستوى، والرموز. المتن: `RetrievePreviewSchema`. لا يحقن الذكريات أو يعدّلها.                    |
| `GET`   | `/api/memory/embedding-providers` | يسرد المزوّدين الذين لديهم نماذج تضمين، مع الإشارة إلى مَن لديه مفتاح API مهيأ.                                                                                    |
| `GET`   | `/api/memory/engine-status`       | يعيد حالة المحرك الكاملة: مستوى الكلمات المفتاحية، ودقة التضمين، وإحصاءات مخزن المتجهات، وحالة Qdrant، وإعدادات إعادة الترتيب. البنية: `MemoryEngineStatusSchema`. |
| `POST`  | `/api/memory/summarize`           | تشغيل ضغط الذاكرة يدويًا. المتن: `MemorySummarizeSchema` ‏(`olderThanDays`، و`apiKeyId?`، و`dryRun`). يعيد `{candidates, tokensSaved}`.                            |
| `POST`  | `/api/memory/reindex`             | تشغيل إعادة فهرسة المتجهات للذكريات التي تحتوي على `needs_reindex=1`. المتن: `MemoryReindexSchema` ‏(`force`). يعيد `{started, pending}`.                          |

### نقاط نهاية الإعدادات

| الطريقة | المسار                                  | الوصف                                                                                                         |
| ------- | --------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `GET`   | `/api/settings/memory`                  | القيمة الحالية الموحّدة لـ`MemorySettingsExtended` ‏(7 حقول جديدة + الحقول القديمة)                           |
| `PUT`   | `/api/settings/memory`                  | تحديث أي حقل من `MemorySettingsExtendedSchema` ‏(إجمالي 12 حقلًا)                                             |
| `GET`   | `/api/settings/qdrant`                  | إعدادات Qdrant الحالية (`QdrantSettingsSchema`)                                                               |
| `PUT`   | `/api/settings/qdrant`                  | تحديث إعدادات Qdrant. المتن: `QdrantSettingsUpdateSchema`. تؤدي قيمة `apiKey` كسلسلة فارغة إلى إزالة المفتاح. |
| `GET`   | `/api/settings/qdrant/health`           | فحص الحيوية لمثيل Qdrant المهيأ. يعيد `QdrantHealthResultSchema`.                                             |
| `POST`  | `/api/settings/qdrant/search`           | اختبار بحث دلالي في Qdrant. المتن: `QdrantSearchSchema` ‏(`query`، و`topK`).                                  |
| `POST`  | `/api/settings/qdrant/cleanup`          | إزالة نقاط Qdrant الخاصة بالذكريات المنتهية الصلاحية / القديمة.                                               |
| `GET`   | `/api/settings/qdrant/embedding-models` | سرد نماذج التضمين المتاحة لـQdrant.                                                                           |

يدعم استعلام القائمة `/api/memory` إما ترقيم الصفحات المستند إلى `page`
‏(`parsePaginationParams`) **أو** قيمة `offset` أولية — وعند وجود `offset` تكون لها
الأولوية، وتُحسب قيمة `page` مشتقة لبنية الاستجابة.

## أدوات MCP (`open-sse/mcp-server/tools/memoryTools.ts`)

عند تمكين خادم MCP، تُسجَّل ثلاث أدوات للذاكرة:

- `omniroute_memory_search` — `{apiKeyId, query?, type?, maxTokens?, limit?}`
  → تغلّف `retrieveMemories()`. اعتبارًا من v3.8.6 (D16)، تُقرأ `strategy`
  من `getMemorySettings()` بدلًا من ترميزها بشكل ثابت إلى `"exact"`. إذا تم
  توفير `query` وكانت `strategy` هي `semantic` أو `hybrid`، فيُستخدم مخزن
  المتجهات عند توفره.
- `omniroute_memory_add` — `{apiKeyId, sessionId?, type, key, content,
metadata?}` → تغلّف `createMemory()`. لا تقبل سوى الأنواع الأساسية الأربعة:
  `factual` و`episodic` و`procedural` و`semantic` (D17).
- `omniroute_memory_clear` — `{apiKeyId, type?, olderThan?}` → تسرد الإدخالات
  المطابقة، وتُرشّحها اختياريًا حسب الطابع الزمني للإنشاء قبل تاريخ محدد، ثم
  تحذف كلًا منها عبر `deleteMemory()` (التي تزيل أيضًا المتجهات من sqlite-vec وQdrant).

راجع [MCP-SERVER.md](./MCP-SERVER.md) للحصول على تفاصيل النقل والنطاق.

## لوحة المعلومات (استوديو الذاكرة)

أصبح `src/app/(dashboard)/dashboard/memory/page.tsx` الآن **استوديو مكوّنًا من 3 علامات تبويب**:

### علامة التبويب: الذكريات

- بطاقة مفاهيم (شرح قابل للطي بعنوان "كيفية العمل").
- قائمة وبحث وترقيم صفحات في الوقت الفعلي (مع مهلة ارتداد قدرها 300 مللي ثانية).
- عامل تصفية حسب النوع (`factual` / `episodic` / `procedural` / `semantic` / الكل).
- نافذة منبثقة لإضافة ذاكرة (المفتاح، المحتوى، النوع).
- تحرير مضمّن (زر القلم → `PUT /api/memory/[id]`).
- حذف لكل صف (مع مربع حوار للتأكيد).
- تصدير صفحة العرض الحالية بصيغة JSON؛ واستيراد JSON عبر منتقي الملفات.
- بطاقات الإحصاءات: `totalEntries` و`tokensUsed` و`hitRate`.
- زر "ضغط القديم" → `POST /api/memory/summarize` (يعرض التشغيل التجريبي أولًا
  عدد العناصر المرشحة، ثم يطلب التأكيد).
- مؤشر صحة أخضر/أحمر يعتمد على `GET /api/memory/health`.

### علامة التبويب: ساحة التجربة

- حقل إدخال للاستعلام + محدد للاستراتيجية (مطابقة تامة / دلالية / هجينة) + ميزانية الرموز.
- "محاكاة" → `POST /api/memory/retrieve-preview` — تعرض النتائج المرتبة مع
  `score` و`tier` و`tokens` و`vecScore` و`ftsScore`.
- لوحة تحليل توضّح مصدر التضمين / مخزن المتجهات الذي استُخدم وما إذا حدث
  رجوع إلى خيار احتياطي.

### علامة التبويب: المحرك

- لوحة حالة المحرك (شارة FTS5 للكلمات المفتاحية، وشارة التضمين، وشارة مخزن المتجهات،
  وشارة صحة Qdrant، وشارة إعادة الترتيب).
- زر "إعادة الفهرسة الآن" → `POST /api/memory/reindex`.
- محدد مصدر التضمين (تلقائي / بعيد / ثابت / transformers + مفاتيح تبديل).
- بطاقة إعداد Qdrant (مفتاح تبديل التمكين، المضيف/المنفذ/المجموعة/المفتاح، اختبار الاتصال،
  اختبار البحث الدلالي، التنظيف).
- بطاقة إعداد إعادة الترتيب (مفتاح تبديل التمكين، محدد المزوّد/النموذج).

توجد إعدادات الذاكرة وQdrant أيضًا ضمن
`/dashboard/settings → Memory & Skills` (`MemorySkillsTab.tsx`) لواجهة
الإعدادات القديمة/العامة.

## التخزين المؤقت

يحتفظ `src/lib/memory/store.ts` بذاكرة تخزين مؤقت داخل العملية شبيهة بـ LRU
(`MEMORY_CACHE_TTL = 1 min` و`MEMORY_MAX_CACHE_SIZE = 500`، مع إزالة أقدم 20 %
من العناصر) لعمليات قراءة `getMemory(id)`، بالإضافة إلى طبقة عامة للذاكرة المؤقتة
بصيغة مفتاح/قيمة باسم `memoryCache` (`src/lib/memory/cache.ts`) تتضمن أساليب
`get`/`set`/`invalidate` وتستخدمها الجهات المستدعية التي تحتاج إلى ذاكرة مؤقتة
خاصة بنطاقها (LRU بسعة 1 000 إدخال، ومدة TTL افتراضية قدرها 5 دقائق).

## الخصوصية ودورة الحياة

- تعود ملكية الذاكرة إلى معرّف مفتاح API (`resolveMemoryOwnerId` في
  `chatCore.ts`). من دون `apiKeyInfo.id`، لا تُنفَّذ عمليات الاسترجاع أو الحقن
  أو الاستخراج.
- تُستبعد الإدخالات ذات قيمة `expires_at` المستقبلية من الاسترجاع؛ كما تُستبعد
  الإدخالات القديمة التي تتجاوز `retentionDays` بواسطة عبارة
  `created_at >= cutoff` في `retrieveMemories`.
- للحذف النهائي، استخدم `DELETE /api/memory/[id]` أو `omniroute_memory_clear`.
- يُنفَّذ الاستخراج بأسلوب الإطلاق والنسيان عبر `setImmediate`؛ وتُسجَّل حالات الفشل تحت
  `memory.extraction.background.failed` ولا تظهر أبدًا للمتصل.
- تنظّف دورات التحقق ذهابًا وإيابًا (`verifyExtractionPipeline`) إدخالات
  الاختبار الخاصة بها ضمن كتلة `finally`.

## انظر أيضًا

- [SKILLS.md](./SKILLS.md) — يحقن الإعداد `skillsEnabled` تعريفات الأدوات
  إلى جانب الذاكرة.
- [MCP-SERVER.md](./MCP-SERVER.md) — نقل MCP / النطاقات.
- [API_REFERENCE.md](../reference/API_REFERENCE.md) — نطاق أوسع لواجهة API.
- وحدات المصدر:
  - `src/lib/memory/types.ts`, `schemas.ts`
  - `src/lib/memory/store.ts`, `retrieval.ts`, `injection.ts`, `reindex.ts`
  - `src/lib/memory/extraction.ts`, `summarization.ts`, `verify.ts`
  - `src/lib/memory/settings.ts`, `qdrant.ts`, `cache.ts`
  - `src/lib/memory/vectorStore.ts` — sqlite-vec + ‏RRF هجين
  - `src/lib/memory/embedding/index.ts` — طبقة تضمين متعددة المصادر
  - `src/lib/memory/embedding/types.ts`, `remote.ts`, `staticPotion.ts`,
    `transformersLocal.ts`, `cache.ts`
  - `src/shared/schemas/memory.ts` — مخططات Zod لجميع أجسام طلبات API الخاصة بالذاكرة
  - `src/shared/schemas/qdrant.ts` — مخططات Zod لإعدادات/عمليات Qdrant
  - `src/lib/db/memoryVec.ts` — عمليات CRUD لـ `memory_vec_meta`
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
  - `src/app/api/settings/qdrant/route.ts` + المسارات الفرعية
  - `src/app/(dashboard)/dashboard/memory/` — واجهة Studio (الصفحة + المكوّنات +
    علامات التبويب + الخطافات)
  - `open-sse/handlers/chatCore.ts` (توصيل الحقن / الاستخراج)
  - `open-sse/mcp-server/tools/memoryTools.ts`

---

## اختيار موفّر تضمين (v3.8.16+)

يدعم محرك الذاكرة في OmniRoute **أربعة مصادر للتضمين** (`src/lib/memory/embedding/`). ولكل منها مفاضلات مختلفة من حيث **زمن الاستجابة والتكلفة وجودة النموذج وتعقيد الإعداد**.

### مصادر التضمين

| الموفّر        | المصدر                                    | زمن الاستجابة                              | التكلفة           | الجودة                                          | الإعداد                                     |
| -------------- | ----------------------------------------- | ------------------------------------------ | ----------------- | ----------------------------------------------- | ------------------------------------------- |
| `transformers` | نموذج ONNX محلي (Xenova/all-MiniLM-L6-v2) | ~50-150ms (CPU)                            | مجاني             | جيدة                                            | `npm install` فقط                           |
| `static`       | متجهات محسوبة مسبقًا (مخزنة مؤقتًا)       | <1ms                                       | مجاني             | لا ينطبق (يعتمد على إصابة ذاكرة التخزين المؤقت) | لا شيء                                      |
| `remote`       | واجهة API لـ OpenAI / Cohere / Voyage     | ~100-300ms                                 | $0.02-0.10/1M رمز | ممتازة                                          | مفتاح API                                   |
| `auto`         | يختار أفضل مصدر متاح في وقت التشغيل       | مماثل للمصدر المختار                       | مجاني             | مماثلة للمصدر المختار                           | لا شيء                                      |
| _(cache)_      | طبقة LRU في الذاكرة فوق أي مصدر           | <1ms (إصابة)، زمن الاستجابة الكامل (إخفاق) | مجاني             | مماثلة للمصدر الأساسي                           | مفعّلة دائمًا (ليست مصدرًا قابلًا للاختيار) |

### شجرة القرار

```
                  ما سياق النشر لديك؟
                  │
      ┌───────────┼───────────┬──────────────┐
      │           │           │              │
  تطوير/اختبار  إنتاج صغير  إنتاج كبير   طرفي / دون اتصال
      │           │           │              │
      ▼           ▼           ▼              ▼
  transformers transformers remote (Qdrant) transformers
  (مجاني، بلا API)          (أفضل جودة)     (بلا إنترنت)
      │           │           │              │
      └────────┬──┴───────────┴──────────────┘
               │
               ▼
            أضف دائمًا طبقة `cache` في الأعلى
            (يلتف LruCache حول أي موفّر)
```

### تهيئة قاعدة البيانات وواجهة API

تُهيّأ خيارات تضمين الذاكرة عبر واجهة API/واجهة المستخدم الخاصة بالإعدادات، وليس عبر متغيرات البيئة. مفاتيح قاعدة بيانات الإعدادات ذات الصلة ضمن الإعدادات (`normalizeMemorySettings` في `src/lib/memory/settings.ts`) هي:

- `memoryEmbeddingSource`: ‏`"transformers"` (محلي)، أو `"remote"` (معتمد على API، مثل OpenAI)، أو `"static"` (مخزن خارجي)، أو `"auto"`
- `memoryEmbeddingProviderModel`: معرّف النموذج للمصادر البعيدة/الثابتة (مثل `"text-embedding-3-small"`)
- `memoryTransformersEnabled`: ‏`true` | `false`
- `memoryStaticEnabled`: ‏`true` | `false`
- `memoryVectorStore`: ‏`"sqlite-vec"`، أو `"qdrant"`، أو `"auto"`

#### النموذج المحلي (`transformers`)

يستخدم transformers.js داخليًا لتشغيل النماذج المحلية:

```bash
# متغيرات البيئة المقروءة في الشيفرة (src/lib/memory/embedding/index.ts):
MEMORY_TRANSFORMERS_MODEL=Xenova/all-MiniLM-L6-v2  # مستودع نموذج HF
MEMORY_STATIC_MODEL=minishlab/potion-base-8M       # نموذج potion ثابت من HF
MEMORY_STATIC_CACHE_DIR=<DATA_DIR>/embeddings      # دليل ذاكرة التخزين المؤقت
```

#### ذاكرة التخزين المؤقت LRU للتضمين

تكون ذاكرة التخزين المؤقت مفعّلة دائمًا بصورة افتراضية، وتُهيّأ عبر متغيرات البيئة:

```bash
MEMORY_EMBEDDING_CACHE_MAX=1000                    # الحد الأقصى للعناصر المخزنة مؤقتًا
MEMORY_EMBEDDING_CACHE_TTL_MS=300000               # مدة البقاء (5 دقائق)
```

### أرقام الأداء

اختبار أداء على خادم x86 نموذجي رباعي النوى (نصوص يبلغ طول كل منها نحو 100 رمز):

| المزوّد              | p50   | p95   | p99   | التكلفة لكل مليون تضمين               |
| -------------------- | ----- | ----- | ----- | ------------------------------------- |
| `transformers` (CPU) | 80ms  | 180ms | 350ms | مجانًا                                |
| `remote` (OpenAI)    | 120ms | 220ms | 400ms | نحو $0.02 (ada-002) / $0.13 (3-large) |
| `static` (Qdrant)    | 15ms  | 30ms  | 60ms  | تعتمد على استضافة Qdrant              |
| `cache` (إصابة)      | <1ms  | <1ms  | 2ms   | مجانًا                                |

---

## أنماط استخراج الحقائق (v3.8.16+)

تستخدم الوحدة `extraction.ts` (`src/lib/memory/extraction.ts`) **مطابقة أنماط التعبيرات النمطية** لاستخراج حقائق منظّمة من رسائل المحادثة. يساعدك فهم هذه الأنماط على ضبط جودة الاستخراج بما يناسب حالة استخدامك.

### فئات الأنماط الافتراضية

| الفئة               | مثال على النمط                                          | ما يتم التقاطه            |
| ------------------- | ------------------------------------------------------- | ------------------------- |
| PREFERENCE_PATTERNS | `"أفضّل <X>"`، `"أحب <X>"`، `"أكره <X>"`                | تفضيلات المستخدم          |
| DECISION_PATTERNS   | `"سأستخدم <X>"`، `"قررت أن <X>"`، `"اخترت <X>"`         | قرارات المستخدم (عرضية)   |
| PATTERN_PATTERNS    | `"عادةً ما <X>"`، `"دائمًا <X>"`، `"لا أفعل <X> أبدًا"` | الأنماط السلوكية المستمرة |

### أمثلة على الأنماط (مبسّطة)

```ts
// من src/lib/memory/extraction.ts
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

### ما يتم استخراجه

عندما يقول مستخدم:

> "أفضّل TypeScript. سأستخدم Postgres لهذا المشروع. ألتزم دائمًا بالتغييرات قبل دفعها. لا أحب Python."
> ينتج عن الاستخراج 4 ذكريات:
>
> | المفتاح                              | الفئة | النوع | المحتوى                 |
> | ------------------------------------ | ----- | ----- | ----------------------- |
> | `preference:typescript`              | تفضيل | واقعي | "TypeScript"            |
> | `decision:postgres_for_this_project` | قرار  | عرضي  | "Postgres لهذا المشروع" |
> | `pattern:commit_before_pushing`      | نمط   | واقعي | "الالتزام قبل الدفع"    |
> | `preference:python`                  | تفضيل | واقعي | "Python"                |

### حدود الاستخراج

لمنع الاستخراج غير المنضبط، تُطبّق الحدود التالية:

| الحد الأدنى لطول المحتوى | 3 أحرف |
| الحد الأقصى لطول المحتوى | 500 حرف |

### متى يجب تعطيل الاستخراج

يعمل الاستخراج تلقائيًا كلما كانت الذاكرة مفعّلة؛ ولا يوجد مفتاح تبديل منفصل
للاستخراج فقط. لإيقافه، عطّل الذاكرة بالكامل (`enabled: false`
عبر `PUT /api/settings/memory`). فكّر في فعل ذلك عندما:

- يكون لديك حجم كبير من الرسائل وتكون تكلفة الاستخراج غير بسيطة
- تكون محادثاتك مؤقتة في معظمها (دردشة، تصحيح أخطاء) ولا تحمل قيمة طويلة الأمد
- تكون قد بدأت بالفعل بالتقاط السياق عبر إضافات مخصّصة

---

## ضبط RRF الهجين (v3.8.16+)

تجمع خوارزمية **دمج الرتب المتبادلة (RRF)** بين نتائج FTS5 (الكلمات المفتاحية) والنتائج المتجهية (الدلالية). تتحكم المعلمة `k` في مقدار الوزن الممنوح للنتائج ذات الرتب الأدنى.

### الصيغة

لكل ذاكرة مرشّحة، تكون درجة RRF كما يلي:

```
RRF(d) = Σ  1 / (k + rank_i(d))
```

حيث:

- `k` هو الثابت (القيمة الافتراضية 60)
- `rank_i(d)` هي رتبة المستند `d` في نظام الاسترجاع رقم i (FTS، متجهي)
- يمتد المجموع عبر جميع أنظمة الاسترجاع

### كيفية تأثير `k` في النتائج

| قيمة `k`               | التأثير                                                                    | الأنسب لـ                                    |
| ---------------------- | -------------------------------------------------------------------------- | -------------------------------------------- |
| `k=0`                  | دمج رتب خالص (دون تنعيم)                                                   | خط الأساس النظري                             |
| `k=10-30`              | يمنح النتائج العليا وزنًا كبيرًا، بينما تكاد الرتب المنخفضة لا تسهم        | عندما تكون النتائج الثلاث الأولى صحيحة عادةً |
| **`k=60`** (الافتراضي) | متوازن — تسهم النتائج العشر الأولى جميعها بصورة ملحوظة                     | الاسترجاع للأغراض العامة                     |
| `k=100+`               | أكثر تسطّحًا — حتى النتائج منخفضة الرتبة قد تهيمن إذا ظهرت في أنظمة متعددة | عندما يكون الاستدعاء > الدقة أمرًا حاسمًا    |

### ضبط `k` عمليًا

```bash
# القيمة الافتراضية
MEMORY_RRF_K=60

# دقة صارمة (ذاكرة صغيرة، مستندات قليلة)
MEMORY_RRF_K=20

# أقصى استدعاء (ذاكرة كبيرة، استعلامات متنوعة)
MEMORY_RRF_K=120
```

**مثال باستخدام `k=20`:**

- رتبة FTS هي 1 ← المساهمة `1/21 = 0.048`
- رتبة FTS هي 10 ← المساهمة `1/30 = 0.033`
- الرتبة المتجهية 1 ← المساهمة `0.048`
- الحد الأقصى المدمج: `0.096`

**مثال باستخدام `k=60`:**

- رتبة FTS هي 1 ← المساهمة `1/61 = 0.016`
- رتبة FTS هي 10 ← المساهمة `1/70 = 0.014`
- الرتبة المتجهية 1 ← المساهمة `0.016`
- الحد الأقصى المدمج: `0.033`

مع ارتفاع `k`، يصبح **الفرق النسبي** بين المرتبة الأولى والمرتبة العاشرة أصغر، لذا تعتمد الخوارزمية بدرجة أكبر على **التوافق بين أنظمة الاسترجاع** بدلًا من الثقة في المرتبة الأولى.

### متى يجب تغيير `k`

| العَرَض                                      | ما يمكن تجربته                                                 |
| -------------------------------------------- | -------------------------------------------------------------- |
| تفوز النتيجة الأولى دائمًا، لكنها خاطئة      | **اخفض** k (مثلًا، 20) — تصبح الثقة في المرتبة العليا أهم      |
| الإجابة الصحيحة ضمن أول 5 ولكنها ليست الأولى | **ارفع** k (مثلًا، 100) — يكافئ التسجيل الأكثر تسطّحًا التوافق |
| الاستدعاء مرتفع لكن الدقة منخفضة             | **اخفض** k — اجعل الترتيب أكثر حدّة                            |
| الاستدعاء منخفض (مستندات ذات صلة مفقودة)     | **ارفع** k — امنح المستندات ذات الرتب الأدنى فرصة              |

### ترجيح RRF

يستخدم دمج الرتب المتبادلة أوزانًا متساوية لرتبة المتجه الدلالي ورتبة البحث في النص الكامل:

```
RRF(d) = 1/(k + rank_vector) + 1/(k + rank_fts)
```

لا توجد متغيرات بيئة لضبط الأوزان الفردية (`MEMORY_RRF_VECTOR_WEIGHT`/`MEMORY_RRF_FTS_WEIGHT` غير موجودين).

---

## استراتيجية التلخيص (v3.8.16+)

تضغط وحدة `summarization.ts` (`src/lib/memory/summarization.ts`) الذكريات الأقدم لإبقاء المجموعة النشطة صغيرة مع الحفاظ على إمكانية الاسترجاع.

### متى يتم تشغيل التلخيص

| المُشغِّل          | الحد (الافتراضي) |
| ------------------ | ---------------- |
| تشغيل يدوي عبر API | لا ينطبق         |

### ما الذي يتم تلخيصه

تُصدَّر نقطتا دخول من `summarization.ts`:

- **`summarizeMemories(apiKeyId, sessionId?, maxTokens = 4000)`** — تُكثّف
  ذكريات جلسة ما في نص ملخص واحد مقيّد بميزانية من الرموز.
- **`summarizeMemoriesOlderThan(apiKeyId, days, dryRun)`** — الضغط المستند إلى
  العمر والمستخدم بواسطة API: يحدد كل ذاكرة أقدم من `days`، وينشئ
  منها ذاكرة ملخصة ومكثفة واحدة، ويحذف النسخ الأصلية (عندما تكون `dryRun` بقيمة `false`).
  مرّر `dryRun: true` لمعاينة مجموعة العناصر المرشحة وإجمالي الرموز
  دون تعديل أي شيء.

لا توجد مرحلة تجميع حسب الوسم/المفتاح ولا عملية تقييم لكل ذاكرة على أساس "أساسية مقابل قابلة للتلخيص" —
يعتمد التحديد فقط على الحد العمري، ويكون نص الملخص عبارة عن سطر مكثف
تسبقه بادئة النوع لكل عنصر مرشح.

### تشغيل التلخيص

التلخيص **يدوي / اختياري** — يكون إعداد `autoSummarize` بقيمة `false`
افتراضيًا، لذلك لا يتم ضغط أي شيء تلقائيًا. شغّله عبر API:

```bash
curl -X POST http://localhost:20128/api/memory/summarize \
  -H "Authorization: Bearer $OMNIROUTE_KEY"
```

لإبقائه معطّلًا، ما عليك سوى إبقاء `autoSummarize` على قيمته الافتراضية (`false`).

### نصائح لتحسين جودة التلخيص

- **عاين أولًا باستخدام `dryRun`** — تُرجع `summarizeMemoriesOlderThan(..., true)`
  قائمة العناصر المرشحة وإجمالي عدد الرموز، حتى تتمكن من تأكيد ما سيتم دمجه
  قبل حذف النسخ الأصلية.
- **شغّل التلخيص خلال ساعات انخفاض حركة الاستخدام** إذا كانت لديك مجموعة كبيرة من الذكريات — فاستدعاء LLM هو الجزء البطيء

```bash
# على نمط Cron: لخّص يوميًا عند الساعة 3 صباحًا
0 3 * * * curl -X POST http://localhost:20128/api/memory/summarize \
  -H "Authorization: Bearer $OMNIROUTE_KEY"
```

---

## نمط موفّر MemoryBackend

> **المصدر المرجعي:** `src/lib/memory/backend.ts`، `src/lib/memory/genericBackend.ts`، `src/lib/memory/manager.ts`
> **الاختبارات:** `src/lib/memory/__tests__/generic-backend.test.ts`

يقدم نمط موفّر MemoryBackend **طبقة تجريدية قابلة للتوصيل للواجهة الخلفية** فوق محرك الذاكرة الحالي. وبدلًا من الارتباط بتنفيذ تخزين واحد، يدعم نظام الذاكرة الآن عدة واجهات خلفية (SQLite وObsidian وNotion وواجهات HTTP خلفية مخصصة) مع توجيه قابل للتهيئة بين الواجهة الأساسية والواجهات الاحتياطية.

### البنية

```
┌──────────────────────────────────────────────────────────┐
│                    مسارات API                             │
│            (src/app/api/memory/route.ts)                  │
└──────────────────────┬───────────────────────────────────┘
                       │
┌──────────────────────▼───────────────────────────────────┐
│                   MemoryManager                           │
│           مُنسّق Singleton (manager.ts)                   │
│                                                          │
│  الأساسية ──► الواجهة الخلفية A  (مثل SQLite)           │
│  الاحتياطية ─► الواجهة الخلفية B  (مثل Obsidian)        │
│                الواجهة الخلفية C  (مثل Notion عبر GenericBackend) │
└──────────────────────┬───────────────────────────────────┘
                       │
        ┌──────────────┼──────────────┐
        ▼              ▼              ▼
┌────────────┐ ┌────────────┐ ┌──────────────────┐
│ SQLite     │ │ Obsidian   │ │ GenericMemory    │
│ الواجهة    │ │ الواجهة    │ │ الواجهة الخلفية │
│ الخلفية    │ │ الخلفية    │ │ (HTTP)           │
└────────────┘ └────────────┘ └──────────────────┘
```

#### الواجهة الأساسية (`backend.ts`)

يجب على كل واجهة خلفية تنفيذ واجهة `MemoryBackend`:

```typescript
interface MemoryBackend {
  readonly id: string;
  readonly displayName: string;

  // عمليات CRUD
  create(input: CreateMemoryInput): Promise<Memory>;
  get(id: string): Promise<Memory | null>;
  update(id: string, updates: Partial<...>): Promise<boolean>;
  delete(id: string): Promise<boolean>;
  list(filter: MemoryFilter): Promise<{ data: Memory[]; total: number; byType: Record<string, number> }>;

  // البحث
  search(config: SearchConfig): Promise<Memory[]>;

  // حالة التشغيل
  health(): Promise<HealthCheckResult>;

  // دورة الحياة (اختيارية)
  initialize?(): Promise<void>;
  shutdown?(): Promise<void>;
}
```

#### MemoryManager (`manager.ts`)

مُنسّق Singleton يقوم بما يلي:

- **يسجّل** الواجهات الخلفية عبر `register(backend)` — ويُستدعى عند بدء التشغيل من `index.ts`
- **يهيئ** الواجهة الأساسية والواجهات الاحتياطية عبر `configure(primary, fallbacks)`
- **يوجّه** عمليات CRUD/البحث إلى الواجهة الأساسية، مع سلسلة انتقال إلى الواجهات الاحتياطية عند الفشل
- **يفحص حالة تشغيل** جميع الواجهات الخلفية دوريًا

**سلوك الواجهات الاحتياطية:**

| العملية  | الأساسية                 | الواجهات الاحتياطية                 |
| -------- | ------------------------ | ----------------------------------- |
| `create` | ✅ الأساسية فقط          | ❌                                  |
| `get`    | ✅ محاولة الأساسية أولًا | ✅ الاحتياطية إذا كانت النتيجة null |
| `update` | ✅ الأساسية فقط          | ✅ مزامنة دون انتظار النتيجة        |
| `delete` | ✅ الأساسية فقط          | ✅ مزامنة دون انتظار النتيجة        |
| `list`   | ✅ الأساسية فقط          | ❌                                  |
| `search` | ✅ الأساسية أولًا        | ✅ الاحتياطية عند حدوث خطأ          |

#### GenericMemoryBackend (`genericBackend.ts`)

موصّل HTTP عام يكيّف أي REST API ليصبح MemoryBackend. وهو مفيد من أجل:

- **Notion** — الاتصال عبر Notion API
- **Obsidian** — الاتصال عبر Obsidian Local REST API
- **واجهات خلفية مخصصة** — أي خدمة توفر RESTful API للذاكرة

**التهيئة:**

```typescript
interface GenericBackendConfig {
  baseUrl: string;           // عنوان URL الأساسي لواجهة API الخاصة بالواجهة الخلفية
  apiKey?: string;           // رمز Bearer للمصادقة
  headers?: Record<string, string>;  // ترويسات HTTP مخصصة
  timeout?: number;          // مهلة الطلب (القيمة الافتراضية: 30000ms)
  backendType?: string;      // لأغراض التسجيل

  // تجاوزات نقاط النهاية (تستخدم القيم الافتراضية اصطلاحات REST)
  endpoints?: {
    search?: string;   // القيمة الافتراضية: "/memories/search"
    create?: string;   // القيمة الافتراضية: "/memories"
    list?: string;     // القيمة الافتراضية: "/memories"
    get?: string;      // القيمة الافتراضية: "/memories/{id}"
    update?: string;   // القيمة الافتراضية: "/memories/{id}"
    delete?: string;   // القيمة الافتراضية: "/memories/{id}"
    health?: string;   // القيمة الافتراضية: "/health"
  };

  // تعيينات أسماء معاملات الاستعلام
  queryParams?: {
    query?/apiKeyId?/limit?/offset?/strategy?/maxTokens?/type?/sessionId?/orderBy?/orderDir?/options?
  };

  // تعيينات أسماء معاملات المسار
  pathParams?: {
    id?/memoryId?
  };
}
```

**الواجهات الخلفية المعروفة** مُهيأة مسبقًا في `KNOWN_BACKENDS`:

```typescript
createKnownBackend("obsidian"); // → GenericMemoryBackend تشير إلى localhost:27123
createKnownBackend("notion"); // → GenericMemoryBackend تشير إلى api.notion.com/v1
```

#### الواجهات الخلفية المضمنة

##### SQLiteBackend (`sqliteBackend.ts`)

الواجهة الخلفية الأساسية الافتراضية. تُغلّف مخزن الذاكرة الحالي المستند إلى SQLite باستخدام `src/lib/memory/store.ts`. تُسجَّل تلقائيًا عند بدء التشغيل.

```typescript
import { sqliteBackend } from "./sqliteBackend";
memoryManager.register(sqliteBackend);
```

##### ObsidianBackend (`obsidianBackend.ts`)

تُغلّف تكامل Obsidian الحالي (`src/lib/memory/obsidianBackend.ts`). تتصل بخزنة Obsidian عبر واجهة Obsidian Local REST API.

### الإعدادات

تُخزَّن إعدادات الواجهة الخلفية للذاكرة في جدول إعدادات التطبيق، وتُدار عبر `src/lib/memory/settings.ts`:

| الإعداد                     | مفتاح البيئة/التهيئة     | القيمة الافتراضية | الوصف                                        |
| --------------------------- | ------------------------ | ----------------- | -------------------------------------------- |
| الواجهة الخلفية الأساسية    | `memoryPrimaryBackend`   | `"sqlite"`        | معرّف الواجهة الخلفية الأساسية               |
| الواجهات الخلفية الاحتياطية | `memoryFallbackBackends` | `[]`              | معرّفات الواجهات الخلفية الاحتياطية بالترتيب |
| تهيئات الواجهات الخلفية     | `memoryBackendConfigs`   | `{}`              | تجاوزات التهيئة لكل واجهة خلفية              |

تُطبَّع الإعدادات عبر `normalizeMemorySettings()` وتُخزَّن مؤقتًا في `getMemorySettings()`.

### تدفق التهيئة

```
بدء تشغيل التطبيق
  → عمليات استيراد index.ts (كتأثير جانبي): تسجّل SQLiteBackend
  → يُستدعى initMemoryBackends() من دورة حياة التطبيق:
      1. تحميل الإعدادات (getMemorySettings)
      2. تهيئة الواجهة الأساسية + الاحتياطية
      3. تهيئة جميع الواجهات الخلفية (فحص السلامة)
      4. جاهز لاستقبال الطلبات
```

### إضافة واجهة خلفية جديدة

1. **نفّذ واجهة `MemoryBackend`** في `src/lib/memory/<name>Backend.ts`
2. **صدّرها** من `src/lib/memory/index.ts`
3. **سجّلها** باستخدام `memoryManager.register(yourBackend)` عند بدء التشغيل
4. **هيّئها** عبر الإعدادات: اضبط `memoryPrimaryBackend` على معرّف واجهتك الخلفية
5. **اختبرها** بالاستعانة بـ `src/lib/memory/__tests__/generic-backend.test.ts` كمرجع

#### مثال: واجهة Brain الخلفية

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

### التحقق

#### اختبارات الوحدة

```bash
npx vitest run src/lib/memory/__tests__/generic-backend.test.ts --reporter=verbose
```

الناتج المتوقع: **35 اختبارًا، جميعها ناجحة** وتغطي:

- المُنشئ (2)
- فحص السلامة (4) — نجاح، فشل 500، خطأ في الشبكة، زمن الاستجابة
- التهيئة (2) — نجاح، فشل
- الإنشاء (2) — نقطة النهاية الافتراضية، نقطة نهاية مخصصة
- الجلب (4) — نجاح، 404 ← null، طرح خطأ لرمز غير 404، معاملات مسار مخصصة
- التحديث (2) — نجاح، 404 ← false
- الحذف (2) — نجاح، 404 ← false
- السرد (2) — معاملات الاستعلام، أسماء معاملات مخصصة
- البحث (3) — معاملات الاستعلام، نقطة نهاية مخصصة، تسلسل الخيارات
- ترويسات المصادقة (2) — رمز Bearer، ترويسات مخصصة
- دالة المصنع (1)

#### فحص الأنواع

```bash
npm run typecheck:core
```

المتوقع: **0 أخطاء**.
