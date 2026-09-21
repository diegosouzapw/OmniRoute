# Quota Sharing Engine (العربية)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/QUOTA_SHARE.md) · 🇪🇹 [am](../../../am/docs/routing/QUOTA_SHARE.md) · 🇦🇿 [az](../../../az/docs/routing/QUOTA_SHARE.md) · 🇧🇬 [bg](../../../bg/docs/routing/QUOTA_SHARE.md) · 🇧🇩 [bn](../../../bn/docs/routing/QUOTA_SHARE.md) · 🇨🇿 [cs](../../../cs/docs/routing/QUOTA_SHARE.md) · 🇩🇰 [da](../../../da/docs/routing/QUOTA_SHARE.md) · 🇩🇪 [de](../../../de/docs/routing/QUOTA_SHARE.md) · 🇬🇷 [el](../../../el/docs/routing/QUOTA_SHARE.md) · 🇪🇸 [es](../../../es/docs/routing/QUOTA_SHARE.md) · 🇪🇪 [et](../../../et/docs/routing/QUOTA_SHARE.md) · 🇮🇷 [fa](../../../fa/docs/routing/QUOTA_SHARE.md) · 🇫🇮 [fi](../../../fi/docs/routing/QUOTA_SHARE.md) · 🇫🇷 [fr](../../../fr/docs/routing/QUOTA_SHARE.md) · 🇮🇪 [ga](../../../ga/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [gu](../../../gu/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [ha](../../../ha/docs/routing/QUOTA_SHARE.md) · 🇮🇱 [he](../../../he/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [hi](../../../hi/docs/routing/QUOTA_SHARE.md) · 🇭🇷 [hr](../../../hr/docs/routing/QUOTA_SHARE.md) · 🇭🇺 [hu](../../../hu/docs/routing/QUOTA_SHARE.md) · 🇦🇲 [hy](../../../hy/docs/routing/QUOTA_SHARE.md) · 🇮🇩 [id](../../../id/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [ig](../../../ig/docs/routing/QUOTA_SHARE.md) · 🇮🇹 [it](../../../it/docs/routing/QUOTA_SHARE.md) · 🇯🇵 [ja](../../../ja/docs/routing/QUOTA_SHARE.md) · 🇬🇪 [ka](../../../ka/docs/routing/QUOTA_SHARE.md) · 🇰🇭 [km](../../../km/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [kn](../../../kn/docs/routing/QUOTA_SHARE.md) · 🇰🇷 [ko](../../../ko/docs/routing/QUOTA_SHARE.md) · 🇱🇹 [lt](../../../lt/docs/routing/QUOTA_SHARE.md) · 🇱🇻 [lv](../../../lv/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [ml](../../../ml/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [mr](../../../mr/docs/routing/QUOTA_SHARE.md) · 🇲🇾 [ms](../../../ms/docs/routing/QUOTA_SHARE.md) · 🇲🇹 [mt](../../../mt/docs/routing/QUOTA_SHARE.md) · 🇲🇲 [my](../../../my/docs/routing/QUOTA_SHARE.md) · 🇳🇵 [ne](../../../ne/docs/routing/QUOTA_SHARE.md) · 🇳🇱 [nl](../../../nl/docs/routing/QUOTA_SHARE.md) · 🇳🇴 [no](../../../no/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [or](../../../or/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [pa](../../../pa/docs/routing/QUOTA_SHARE.md) · 🇵🇭 [phi](../../../phi/docs/routing/QUOTA_SHARE.md) · 🇵🇱 [pl](../../../pl/docs/routing/QUOTA_SHARE.md) · 🇵🇹 [pt](../../../pt/docs/routing/QUOTA_SHARE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/QUOTA_SHARE.md) · 🇷🇴 [ro](../../../ro/docs/routing/QUOTA_SHARE.md) · 🇷🇺 [ru](../../../ru/docs/routing/QUOTA_SHARE.md) · 🇱🇰 [si](../../../si/docs/routing/QUOTA_SHARE.md) · 🇸🇰 [sk](../../../sk/docs/routing/QUOTA_SHARE.md) · 🇸🇮 [sl](../../../sl/docs/routing/QUOTA_SHARE.md) · 🇷🇸 [sr](../../../sr/docs/routing/QUOTA_SHARE.md) · 🇸🇪 [sv](../../../sv/docs/routing/QUOTA_SHARE.md) · 🇰🇪 [sw](../../../sw/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [ta](../../../ta/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [te](../../../te/docs/routing/QUOTA_SHARE.md) · 🇹🇭 [th](../../../th/docs/routing/QUOTA_SHARE.md) · 🇹🇷 [tr](../../../tr/docs/routing/QUOTA_SHARE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/QUOTA_SHARE.md) · 🇵🇰 [ur](../../../ur/docs/routing/QUOTA_SHARE.md) · 🇺🇿 [uz](../../../uz/docs/routing/QUOTA_SHARE.md) · 🇻🇳 [vi](../../../vi/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [yo](../../../yo/docs/routing/QUOTA_SHARE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/QUOTA_SHARE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/QUOTA_SHARE.md)

---

> **مرجع المستند**: `docs/routing/QUOTA_SHARE.md`
> جزء من المجموعة B (الخطتان 16 + 22).

---

## نظرة عامة

يوزّع محرك مشاركة الحصة الحصةَ الزمنية لمزوّد الخدمة (مثل نافذة Codex
البالغة 5 ساعات، أو 1500 طلب/ساعة في Kimi) بصورة عادلة بين عدة مفاتيح API تشترك في
الاتصال نفسه.

**المشكلة التي يحلّها:** يمرّر OmniRoute طلبات العديد من مفاتيح API عبر حساب مزوّد
الخدمة الخارجي نفسه. ومن دون منطق المشاركة، يمكن لدفعة طلبات من المفتاح A أن تستنفد
حصة المزوّد للساعة، ما يترك المفتاحين B وC محظورين حتى يُعاد ضبط النافذة.
يمنع المحرك ذلك من خلال:

1. تتبّع الاستهلاك المتجدد لكل مفتاح وفقًا لكل بُعد (النسبة المئوية، والطلبات، والرموز، والتكلفة بالدولار).
2. تطبيق خوارزمية حصة عادلة محافظة على العمل: يمكن للمفتاح الاقتراض من
   الحصص الخاملة ما دام المجمّع العام غير مشبَع.
3. فرض النتيجة في المسار الساخن (`chatCore.ts`) قبل أن يصل الطلب
   إلى منفّذ الخدمة الخارجية.

---

## الخوارزمية: الحصة العادلة المحافظة على العمل

مُنفَّذة في `src/lib/quota/fairShare.ts`.

### الأوضاع

| الشرط                                      | الوضع    | السلوك                                                            |
| ------------------------------------------ | -------- | ----------------------------------------------------------------- |
| `globalUsedPercent < saturationThreshold`  | **سخي**  | يمكن للمفتاح الاقتراض حتى الحد العام مطروحًا منه إجمالي الاستهلاك |
| `globalUsedPercent >= saturationThreshold` | **صارم** | تُفرض الحصة العادلة الفردية بصرامة                                |

القيمة الافتراضية هي `saturationThreshold = 0.5` (متغير البيئة `QUOTA_SATURATION_THRESHOLD`).

### القرار لكل بُعد

يحسب المحرك ما يلي لكل بُعد نشط في المجمّع:

```
fairShareAllowed = poolLimit × (allocationWeight / 100)
consumed        = القيمة المتجددة الحالية لهذا المفتاح (من QuotaStore.peek)
remaining       = fairShareAllowed - consumed
```

ثم:

- **`policy = hard`**: إذا كانت `consumed > fairShareAllowed` وكان الوضع صارمًا ← **احظر**.
- **`policy = soft`**: إذا كانت `consumed > fairShareAllowed` وكان الوضع صارمًا ← **طبّق عقوبة** (اخفض الأولوية في التركيبة؛ ولا تحظر حظرًا تامًا أبدًا).
- **`policy = burst`**: اسمح ما دامت هناك سعة عامة متاحة، بغض النظر عن الحصة العادلة.

### الحد الأقصى المطلق

يشكّل `capValue` + `capUnit` في أحد التخصيصات سقفًا صارمًا مستقلًا عن الوضع أو
السياسة. أي بُعد تكون فيه `consumed >= capValue` يؤدي دائمًا إلى **حظر** الطلب.

### التحقق متعدد الأبعاد

يُحظر الطلب إذا كان **أي** بُعد في المجمّع سيؤدي إلى حظره. الأبعاد
مستقلة — فاستنفاد نسبة 5h% لا يؤثر في بُعد النسبة الأسبوعية weekly%.

### الاقتراض

في الوضع السخي، يمكن للمفتاح الذي لم يستهلك كامل تخصيصه استخدام الفائض من
الحصص غير المستخدَمة للمفاتيح الأخرى. الصيغة هي:

```
maxAllowed = globalLimit - consumedByOtherKeys
```

حيث `consumedByOtherKeys = consumedTotal - consumedByThisKey`. ويظل السقف العام
(`limit` الخاص بالمجمّع لذلك البُعد) دائمًا هو الحد الأقصى الصارم.

---

## عدّاد النافذة المنزلقة

مُنفَّذ في `src/lib/quota/sqliteQuotaStore.ts` و`redisQuotaStore.ts`.

حاويتان لكل `(apiKeyId, dimensionKey)`:

- `curr`: الحاوية الحالية (`floor(nowMs / windowMs)`)
- `prev`: الحاوية السابقة (`curr - 1`)

القيمة المتجددة الفعلية:

```
effectiveBucketIndex = floor(nowMs / windowMs)
bucketStartMs        = effectiveBucketIndex × windowMs
elapsed              = nowMs - bucketStartMs
weight               = 1 - elapsed / windowMs

effective = prev × weight + curr
```

**الدقة**: تبلغ نحو 99%. ولا يتجاوز الخطأ 1% من حجم النافذة عند
الحد الفاصل بين الحاويات (وهو أمر ملازم لتقريب الحاويتين).

### التزامن

برنامج تشغيل SQLite: يمنع قفل تبادلي داخل الذاكرة لكل مفتاح `(apiKeyId | dimensionKey)`
حالة التسابق بين القراءة والتعديل والكتابة. ويتبع النمط أسلوب منع تدافع الطلبات في `src/sse/services/auth.ts`.

برنامج تشغيل Redis: برنامج Lua نصي باستخدام EVAL للزيادة الذرية — يُنفَّذ كأمر Redis واحد.

---

## برامج التشغيل

### SQLite (افتراضي، دون تثبيت)

- الجدول: `quota_consumption` (راجع الترحيل `073_quota_pools.sql` / `074_quota_consumption.sql`).
- الأنسب لعمليات النشر ذات النسخة الواحدة.
- تُحفظ جميع البيانات في قاعدة بيانات OmniRoute الحالية المبنية على SQLite (`DATA_DIR/storage.sqlite`).

### Redis (اختياري، متعدد النسخ)

- يتطلب حزمة npm المسماة `ioredis`.
- تُخزَّن العدّادات في Redis، بينما تظل البيانات الوصفية (المجمّعات/التخصيصات) في SQLite.
- الأنسب لعمليات النشر متعددة النسخ المتماثلة حيث يجب مشاركة العدّادات.

### التبديل بين برامج التشغيل

عبر واجهة إعدادات المستخدم (`/dashboard/settings` → مخزن الحصص)، أو عبر متغيرات البيئة:

```bash
QUOTA_STORE_DRIVER=redis
QUOTA_STORE_REDIS_URL=redis://localhost:6379
```

لإعداد قاعدة البيانات أسبقية على متغيرات البيئة. إذا كانت القيمة `driver=redis` لكن عنوان URL غير موجود أو كانت `ioredis` غير مثبّتة، يعود المصنع إلى SQLite ويسجّل تحذيرًا.

ترتيب اختيار برنامج التشغيل:

1. إعداد قاعدة البيانات `quotaStore.driver`
2. متغير البيئة `QUOTA_STORE_DRIVER`
3. الافتراضي: `sqlite`

---

## الأبعاد المتعددة

يمكن أن يحتوي المجمّع على أبعاد متعددة. كل بُعد مستقل:

```ts
QuotaDimension {
  unit: "percent" | "requests" | "tokens" | "usd",
  window: "5h" | "hourly" | "daily" | "weekly" | "monthly",
  limit: number,  // الحد الأقصى العام للمجمّع لهذا البُعد
}
```

**مثال: خطة Codex** ‏(5h% + weekly%):

```json
[
  { "unit": "percent", "window": "5h", "limit": 100 },
  { "unit": "percent", "window": "weekly", "limit": 100 }
]
```

يجب أن يستوفي الطلب جميع الأبعاد حتى يُسمح به.

---

## محلّل الخطة

مُنفَّذ في `src/lib/quota/planResolver.ts`.

ترتيب الأسبقية (من الأعلى إلى الأدنى):

1. **تجاوز يدوي في قاعدة البيانات** — جدول `provider_plans`، لكل `connectionId`.
2. **الكتالوج المعروف** — `src/lib/quota/planRegistry.ts` (بيانات فقط).
3. **خطة فارغة** — بلا أبعاد، ويلزم تكوين يدوي.

### الكتالوج المعروف

| المزوّد               | الأبعاد                                                       |
| --------------------- | ------------------------------------------------------------- |
| `codex`               | `percent/5h/100`، `percent/weekly/100`                        |
| `glm`                 | `tokens/5h` ‏(limit=0، غير معروف)، `tokens/weekly`            |
| `minimax`             | `tokens/5h`، `tokens/weekly`                                  |
| `bailian`             | `percent/5h/100`، `percent/weekly/100`، `percent/monthly/100` |
| `kimi`                | `requests/hourly/1500`                                        |
| `alibaba`             | `requests/monthly/90000`                                      |
| `openai`، `anthropic` | لا إعداد افتراضي — يلزم تكوين يدوي                            |

---

## التكامل مع خط المعالجة

### خطاف PRE ‏(`open-sse/handlers/chatCore.ts`)

يعمل قبل منفّذ المنبع، وبعد عمليات التحقق من المصادقة والسياسات:

```
resolveComboTargets / handleSingleModel
  → enforceQuotaShare(apiKeyId, connectionId, provider, estimatedCost)
      → getQuotaStore().peek() لكل بُعد
      → fairShare.decideFairShare()
      → في حال الحظر → إرجاع 429 (buildErrorBody، القاعدة الصارمة رقم 12)
      → في حال السماح + خفض الأولوية → تعيين quotaSoftPenalty=true على المرشّح
  → executor.execute()
```

**السماح عند الفشل**: إذا أطلقت `enforceQuotaShare` استثناءً، يُسمح بمرور الطلب مع تسجيل `pino.warn`. يمنع ذلك أي خلل في محرّك الحصص من حظر جميع الزيارات.

### خطاف POST (تسجيل الاستهلاك)

بعد استجابة ناجحة:

```
يعيد executor نتيجة ناجحة
  → spendRecorder.recordConsumption(apiKeyId, connectionId, provider, actualCost)
      → getQuotaStore().consume() لكل بُعد
      → السماح عند الفشل: تُسجَّل الأخطاء كـ pino.warn ولا تُمرَّر مطلقًا إلى العميل
```

**ملاحظة حول الانحراف**: إذا فشلت `consume` بعد الاستجابة، فسيُظهر العدّاد المتحرك استهلاكًا أقل من الحقيقي. تعمل إشارة التشبّع الواردة من المزوّد (مثل `anthropic-ratelimit-unified-5h-utilization`) على تصحيح التقدير العام عند الطلب التالي.

### عقوبة Combo المرنة (`open-sse/services/combo.ts`)

عندما تكون `decision.deprioritize === true`:

```ts
if (candidate.quotaSoftPenalty) {
  score *= QUOTA_SOFT_DEPRIORITIZE_FACTOR; // القيمة الافتراضية 0.7
}
```

تُطبَّق العقوبة بعد جميع عوامل التقييم الأخرى. وهي تقلّل احتمال اختيار مفتاح مشبّع بواسطة Combo التلقائي دون حظره بشكل صارم.

---

## جولة في واجهة المستخدم

### `/dashboard/costs/quota-share` — صفحة المجموعات الرئيسية

المكوّنات (جميعها في `src/app/(dashboard)/dashboard/costs/quota-share/`):

| المكوّن                | الغرض                                                                       |
| ---------------------- | --------------------------------------------------------------------------- |
| `QuotaConceptCard`     | بطاقة تمهيدية تشرح مشاركة الحصة للمستخدمين الجدد                            |
| `CreatePoolModal`      | إنشاء مجموعة حصة جديدة (اتصال + اسم + تخصيصات أولية)                        |
| `PoolCard`             | ملخص لكل مجموعة: الاسم، والاتصال، وعدد التخصيصات                            |
| `DimensionBar`         | شريط مكدّس لكل بُعد: حصة كل مفتاح + الاستخدام العام                         |
| `AllocationTable`      | جدول يعرض المستهلَك، والحصة العادلة، والعجز/الفائض، وعلامة الاستعارة        |
| `BurnRateChart`        | مخطط خطي لمعدل الاستهلاك بتقنية EMA (تحميل Recharts الكسول عبر `dynamic()`) |
| `EditAllocationsModal` | تعديل أوزان التخصيصات وحدودها وسياساتها لمجموعة                             |

خطافات الصفحة:

- `usePools` — يجلب `GET /api/quota/pools` كل 30 ثانية.
- `usePoolUsage` — يجلب `GET /api/quota/pools/[id]/usage` عند الطلب.
- `useLocalStoragePoolMigration` — يعمل مرة واحدة عند التحميل لنقل بيانات LS القديمة.

### `/dashboard/costs/quota-share/plans` — إعداد خطة المزوّد

- `ProviderPlanConfigClient.tsx`: قائمة منسدلة لتحديد مزوّد، وعرض الخطة المحسومة
  (تلقائيًا من الكتالوج أو عبر تجاوز يدوي)، وتعديل الأبعاد.
- تُكتب التغييرات إلى `PUT /api/quota/plans/[connectionId]`.
- يعيد الحذف الإعداد إلى الكتالوج أو إلى خطة فارغة.

---

## متغيرات البيئة

| المتغير                            | القيمة الافتراضية | الوصف                                                        |
| ---------------------------------- | ----------------- | ------------------------------------------------------------ |
| `QUOTA_STORE_DRIVER`               | `sqlite`          | برنامج التشغيل المستخدم: `sqlite` أو `redis`                 |
| `QUOTA_STORE_REDIS_URL`            | _(فارغ)_          | عنوان URL لـ Redis، مثل `redis://localhost:6379`             |
| `QUOTA_SATURATION_THRESHOLD`       | `0.5`             | 0..1؛ تؤدي `>= threshold` إلى تفعيل الوضع الصارم             |
| `QUOTA_SOFT_DEPRIORITIZE_FACTOR`   | `0.7`             | 0..1؛ مُضاعِف للنتيجة المركبة للسياسة المرنة                 |
| `QUOTA_CONSUMPTION_RETENTION_DAYS` | `14`              | عدد الأيام قبل أن تزيل GC حاويات `quota_consumption` القديمة |

تتجاوز إعدادات قاعدة البيانات (`quotaStore.*`) متغيرات البيئة.

---

## استكشاف الأخطاء وإصلاحها

### تم إعداد Redis لكنه لا يتصل

تحقق من تثبيت `ioredis` باستخدام (`npm ls ioredis`) ومن إمكانية الوصول إلى
`QUOTA_STORE_REDIS_URL`. عند فشل الاتصال، يعود المصنع إلى SQLite (ويُسجَّل ذلك
بالمستوى `warn`).

### تُرجع `peek` بيانات قديمة / تسمح بالمرور عند الفشل

إذا طرحت `peek` استثناءً، فإن `enforceQuotaShare` يعامل النتيجة على أنها "سماح"
(السماح بالمرور عند الفشل). تحقق من سجلات `pino` بحثًا عن إدخالات `quota:enforce`
و`quota:factory` لتحديد السبب الجذري.

### انحراف عدّاد الاستهلاك

إذا اختلف الاستخدام الفعلي للمزوّد عن العدّادات، فهذا متوقع — فالنافذة المنزلقة
ذات الحاويتين لديها هامش خطأ يبلغ نحو 1% عند حدود النافذة، وتعمل `consume`
بعد الاستجابة بأسلوب الإطلاق والنسيان. تقرأ إشارة التشبع (`saturationSignals.ts`)
الاستخدام الفعلي للمزوّد بقيمة TTL تبلغ 30 ثانية، وتضبط `globalUsedPercent`
وفقًا لذلك.

### تعرض المجموعة "لا توجد بيانات" لمعدل الاستهلاك

تتطلب `computeBurnRate` عينتين تاريخيتين على الأقل. ستعرض المجموعات الجديدة التي
لا تحتوي على استدعاءات سابقة لـ `consume` القيمتين `tokensPerSecond: 0`
و`timeToExhaustionMs: null`.

---

## الترحيل من localStorage

عند تحميل `/dashboard/costs/quota-share` لأول مرة، يتحقق الـ hook المسمى `useLocalStoragePoolMigration`
مما يلي:

1. أن تكون نتيجة `localStorage.getItem("omniroute:quota-share:pools")` غير فارغة.
2. أن يعيد `GET /api/quota/pools` القيمة `[]` (قاعدة البيانات فارغة).

إذا تحقق الشرطان، يرسل كل تجمّع قديم إلى `POST /api/quota/pools` على دفعات،
ثم يزيل مفتاح localStorage. عملية الترحيل متكررة بأمان: يمنع الشرط 2
إعادة الترحيل.

---

## تصنيف الاستراتيجية الداخلية

تُعد `quota-share` استراتيجية توجيه **داخلية فقط** (`INTERNAL_ROUTING_STRATEGY_VALUES` في
`src/shared/constants/routingStrategies.ts`). وتُستخدم حصريًا بواسطة تركيبات التجمّعات `qtSd/`
التي ينشئها النظام، كما أنها مستبعدة عمدًا من `ROUTING_STRATEGY_VALUES` كي لا تظهر أبدًا
كخيار يمكن للمستخدم تحديده في واجهة المستخدم أو واجهة API.

---

## تغطية الاختبارات

يتضمن محرك quota-share مستويين من التغطية الآلية:

| الحزمة                        | الأمر                                                                  | ما تغطيه                                                                                                                                                                                            |
| :---------------------------- | :--------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| اختبارات الوحدة (29 اختبارًا) | `node --import tsx/esm --test tests/unit/quota-share-strategy.test.ts` | مجدول DRR، وبوابة التشبع، وحدود التزامن، وحسابات fairShare، ووضع الطلبات المتراكمة في قائمة الانتظار                                                                                                |
| مصفوفة التكامل                | `npm run test:combo:matrix`                                            | قرار التوجيه من البداية إلى النهاية عبر مسار التركيبات الفعلي؛ وعدالة DRR مع خفض أولوية التشبع عبر نقاط الربط الحية (`registerQuotaFetcher`، و`setLKGP`، و`__setHeadroomSaturationFetcherForTests`) |

تعمل مصفوفة التكامل ضمن CI إلى جانب جميع الاستراتيجيات العامة البالغ عددها 19. ويمكن تشغيل حزمة اختبارات الوحدة
بشكل مستقل.

---

## ملخص مخطط قاعدة البيانات

ثلاثة جداول أضيفت بواسطة عمليات الترحيل `078` و`079` و`085`:

- `quota_pools` + `quota_allocations` — تعريفات التجمّعات والتخصيصات لكل مفتاح.
- `quota_consumption` — عدادات متجددة ذات دلويْن لكل `(apiKeyId, dimensionKey)`.
- `provider_plans` — تجاوزات يدوية لخطط المزوّد (أبعاد JSON لكل connectionId).

أضيفت جميع الجداول عبر عمليات ترحيل متكررة بأمان باستخدام `CREATE TABLE IF NOT EXISTS`.
