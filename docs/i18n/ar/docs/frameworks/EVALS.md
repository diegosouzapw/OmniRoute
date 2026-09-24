# Evaluations (Evals) (العربية)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/EVALS.md) · 🇪🇹 [am](../../../am/docs/frameworks/EVALS.md) · 🇦🇿 [az](../../../az/docs/frameworks/EVALS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/EVALS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/EVALS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/EVALS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/EVALS.md) · 🇩🇰 [da](../../../da/docs/frameworks/EVALS.md) · 🇩🇪 [de](../../../de/docs/frameworks/EVALS.md) · 🇬🇷 [el](../../../el/docs/frameworks/EVALS.md) · 🇪🇸 [es](../../../es/docs/frameworks/EVALS.md) · 🇪🇪 [et](../../../et/docs/frameworks/EVALS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/EVALS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/EVALS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/EVALS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/EVALS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/EVALS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/EVALS.md) · 🇮🇱 [he](../../../he/docs/frameworks/EVALS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/EVALS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/EVALS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/EVALS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/EVALS.md) · 🇮🇩 [id](../../../id/docs/frameworks/EVALS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/EVALS.md) · 🇮🇹 [it](../../../it/docs/frameworks/EVALS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/EVALS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/EVALS.md) · 🇰🇭 [km](../../../km/docs/frameworks/EVALS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/EVALS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/EVALS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/EVALS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/EVALS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/EVALS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/EVALS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/EVALS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/EVALS.md) · 🇲🇲 [my](../../../my/docs/frameworks/EVALS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/EVALS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/EVALS.md) · 🇳🇴 [no](../../../no/docs/frameworks/EVALS.md) · 🇮🇳 [or](../../../or/docs/frameworks/EVALS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/EVALS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/EVALS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/EVALS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/EVALS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/EVALS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/EVALS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/EVALS.md) · 🇱🇰 [si](../../../si/docs/frameworks/EVALS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/EVALS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/EVALS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/EVALS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/EVALS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/EVALS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/EVALS.md) · 🇮🇳 [te](../../../te/docs/frameworks/EVALS.md) · 🇹🇭 [th](../../../th/docs/frameworks/EVALS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/EVALS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/EVALS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/EVALS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/EVALS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/EVALS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/EVALS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/EVALS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/EVALS.md)

---

> **مصدر الحقيقة:** `src/lib/evals/`، `src/lib/db/evals.ts`، `src/app/api/evals/`
> **آخر تحديث:** 2026-06-28 — v3.8.40

يتضمن OmniRoute إطار عمل عامًا للتقييم يمكنك استخدامه لقياس أداء تكوينات التوجيه، أو المزوّدين/النماذج المنفردة، أو حزم «المجموعة الذهبية» المرفقة.
استخدمه للتحقق من تغييرات التوجيه، والتحقق من صحة المزوّدين الجدد، وفرض شروط على الإصدارات قبل توجيه حركة الإنتاج إليها.

يُنفَّذ إطار العمل على النحو الآتي:

- مُشغِّل مستقل (`src/lib/evals/evalRunner.ts`) يسجّل حزمًا مدمجة في الذاكرة، ويقيّم المخرجات وفقًا للمعايير المتوقعة، ويُجمّع بطاقات النتائج.
- طبقة استدامة (`src/lib/db/evals.ts`) للحزم المخصصة (المعرّفة من قِبل المستخدم) وعمليات التشغيل السابقة في SQLite.
- طبقة تنسيق (`src/lib/evals/runtime.ts`) تنفّذ كل حالة عبر إرسال استدعاءات فعلية إلى `POST /v1/chat/completions`، وتلتقط زمن الاستجابة والمخرجات، وتحفظ عملية التشغيل.
- نقاط نهاية REST ضمن `/api/evals/*` (متاحة فقط عبر مصادقة الإدارة).
- واجهة لوحة معلومات في `Dashboard → Usage → Evals` (`EvalsTab.tsx`).

## المفاهيم

### الحزمة

الحزمة هي مجموعة مسمّاة من حالات الاختبار، تتضمن `description` وحالة واحدة أو أكثر. تأتي الحزم من مصدرين:

| المصدر     | موضع التعريف                                      | هل يمكن تعديلها في وقت التشغيل؟ |
| ---------- | ------------------------------------------------- | ------------------------------- |
| `built-in` | تُسجَّل عبر `registerSuite()` عند بدء التشغيل     | لا (مُعرَّفة برمجيًا)           |
| `custom`   | مخزّنة في SQLite ضمن `eval_suites` + `eval_cases` | نعم (عبر API/UI)                |

الحزم المدمجة الحالية (راجع `src/lib/evals/evalRunner.ts`):

- `golden-set` — 10 حالات أساسية تشمل التحية/الرياضيات/الترجمة/السلامة
- `coding-proficiency` — Python/JS/SQL/TS/اكتشاف الأخطاء
- `reasoning-logic` — القياسات المنطقية، والمسائل الكلامية، والتعرّف على الأنماط
- `multilingual` — الترجمة واكتشاف اللغة
- `safety-guardrails` — معلومات التعريف الشخصية، وكسر القيود، والرفض، والوعي بالتحيز
- `instruction-following` — JSON فقط، والقوائم المرقمة، وقيود اللغة
- `codex-comparison` — مهام برمجية للمقارنة المباشرة ومخصصة لوضع المقارنة

### الحالة

تتضمن كل حالة ما يلي:

| الحقل      | الوصف                                                                |
| ---------- | -------------------------------------------------------------------- |
| `id`       | معرّف ثابت (يُستخدم كمفتاح للمخرجات والمقاييس)                       |
| `name`     | تسمية مقروءة للبشر                                                   |
| `model`    | النموذج الافتراضي عندما تستخدم عملية التشغيل استهداف `suite-default` |
| `input`    | `{ messages, max_tokens? }` — يُرسَل إلى `/v1/chat/completions`      |
| `expected` | `{ strategy, value }` — معيار التقييم (راجع أدناه)                   |
| `tags`     | تسميات اختيارية (مثل `safety` و`pii` و`jailbreak`)                   |

### الهدف

يمكن تشغيل الحزمة نفسها مقابل أهداف مختلفة. مخطط الهدف هو
`evalTargetSchema` في `src/shared/validation/schemas.ts`:

| نوع الهدف       | `id`         | السلوك                                                     |
| --------------- | ------------ | ---------------------------------------------------------- |
| `suite-default` | `null`       | تستخدم كل حالة حقل `model` المدمج الخاص بها                |
| `model`         | اسم النموذج  | تمرير كل حالة إجباريًا عبر نموذج مباشر واحد (مثل `gpt-4o`) |
| `combo`         | اسم المجموعة | تشغيل كل حالة عبر مجموعة واحدة (لاختبار محرك التوجيه)      |

بالنسبة إلى `model` و`combo`، يكون الحقل `id` مطلوبًا (ويفرض ذلك `superRefine` في Zod). عند توفير `compareTarget`، يجب أن يكون الهدفان مختلفين — يحفظ المُشغِّل عمليتي التشغيل كلتيهما ضمن `runGroupId` نفسه لإجراء مقارنة A/B.

## معايير التقييم

مُنفَّذة في `evaluateCase()` ‏(evalRunner.ts):

| الاستراتيجية | شرط الاجتياز…                                                       |
| ------------ | ------------------------------------------------------------------- |
| `exact`      | `actualOutput === expected.value`                                   |
| `contains`   | `actualOutput.toLowerCase().includes(expected.value.toLowerCase())` |
| `regex`      | `new RegExp(expected.value).test(actualOutput)` تُرجع قيمة صحيحة    |
| `custom`     | `expected.fn(actualOutput, evalCase)` تُرجع قيمة صحيحة (مدمجة فقط)  |

**ملاحظة:** التقييم باستخدام دالة مخصصة محجوز للحِزم المعرَّفة برمجيًا (المدمجة)،
لأنه لا يمكن إجراء تسلسل للدوال عبر واجهة API. لا يقبل
`evalCaseBuilderSchema` سوى `contains | exact | regex` للحِزم
التي ينشئها المستخدمون.

لا تتوفر حاليًا آلية تقييم تستخدم نموذج LLM كمُحكِّم، ولا مُقيِّم تشابه قائم على التضمينات — وسيكون ذلك
نقطة توسعة واضحة في `evaluateCase()`.

## مخطط قاعدة البيانات

ثلاثة جداول (عمليتا الترحيل `030_create_eval_runs.sql` و
`031_create_eval_suites.sql`):

| الجدول        | الغرض                                                                                                                                      |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `eval_suites` | بيانات تعريف الحِزم المخصصة (`id`، و`name`، و`description`)                                                                                |
| `eval_cases`  | الحالات لكل حزمة — `input_json`، و`expected_*`، و`tags_json`                                                                               |
| `eval_runs`   | عمليات التشغيل السابقة — `pass_rate`، و`total`، و`passed`، و`failed`، و`avg_latency_ms`، و`summary_json`، و`results_json`، و`outputs_json` |

لا تُخزَّن الحِزم المدمجة في قاعدة البيانات. بل تبقى في الذاكرة ويُعاد
تسجيلها في كل مرة يُستورد فيها `evalRunner.ts`.

## واجهة REST API

تتطلب جميع نقاط النهاية مصادقة إدارية (`requireManagementAuth`) — وهي ليست
جزءًا من واجهة الوكيل العامة.

| نقطة النهاية                  | الطريقة  | الوصف                                                                    |
| ----------------------------- | -------- | ------------------------------------------------------------------------ |
| `/api/evals`                  | `GET`    | سرد الحِزم + عمليات التشغيل الأخيرة + بطاقة النتائج + الأهداف + المفاتيح |
| `/api/evals`                  | `POST`   | تشغيل حزمة (منفردة أو مقارنة) — المخطط `evalRunSuiteSchema`              |
| `/api/evals/{suiteId}`        | `GET`    | جلب حزمة واحدة (مدمجة أو مخصصة)                                          |
| `/api/evals/suites`           | `POST`   | إنشاء حزمة مخصصة — المخطط `evalSuiteSaveSchema`                          |
| `/api/evals/suites/{suiteId}` | `GET`    | جلب حزمة مخصصة                                                           |
| `/api/evals/suites/{suiteId}` | `PUT`    | استبدال حزمة مخصصة (تُعاد إضافة الحالات)                                 |
| `/api/evals/suites/{suiteId}` | `DELETE` | حذف حزمة مخصصة وحالاتها                                                  |

### تشغيل حزمة

```bash
curl -X POST http://localhost:20128/api/evals \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{
    "suiteId": "golden-set",
    "target": { "type": "combo", "id": "my-combo" },
    "apiKeyId": "optional-api-key-uuid"
  }'
```

الحقول الاختيارية:

- `outputs` — قيمة `Record<caseId, string>` للمخرجات المحسوبة مسبقًا. عند توفيرها،
  يتخطى المُشغِّل **الإرسال** ويقيّم المخرجات المخزنة مؤقتًا فقط (وهو أمر مفيد
  للتقييم دون اتصال).
- `compareTarget` — هدف ثانٍ للتشغيل بالتوازي؛ تشترك عمليتا التشغيل في
  `runGroupId` مُنشأ لعرض المقارنة المباشرة.
- `apiKeyId` — مفتاح API داخلي يُستخدم لمصادقة استدعاءات
  `/v1/chat/completions` المُرسلة. يكون مطلوبًا عند تمكين `REQUIRE_API_KEY`.

### إنشاء حزمة مخصصة

```bash
curl -X POST http://localhost:20128/api/evals/suites \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Production smoke",
    "description": "Quick sanity check before deploy",
    "cases": [
      {
        "name": "JSON shape",
        "model": "gpt-4o",
        "input": { "messages": [{ "role": "user", "content": "Reply with {\"ok\": true}" }] },
        "expected": { "strategy": "regex", "value": "\"ok\"\\s*:\\s*true" }
      }
    ]
  }'
```

## مسار التنفيذ

`runEvalSuiteAgainstTarget()` (`src/lib/evals/runtime.ts`):

1. يحلّ مجموعة الاختبارات (مدمجة أو مخصّصة).
2. ينشئ، لكل حالة، كائن `Request` إلى `/v1/chat/completions` باستخدام
   `messages` الخاصة بالحالة، و`model` الذي تم حله، و`stream: false`، و`max_tokens: 512`
   (أو القيمة البديلة المحددة في الحالة).
3. يستدعي معالج المحادثة مباشرةً (داخل العملية — من دون قفزة HTTP إضافية).
4. يسجّل زمن الاستجابة ويستخرج النص إما من `choices[0].message.content`
   أو من حمولة `output[]` الخاصة بـ Responses API.
5. يقيّم جميع المخرجات عبر `runSuite()`، ثم يحفظها عبر `saveEvalRun()`.

تُشغّل الحالات **تسلسليًا**. لا يوجد حاليًا خيار للتزامن.

## لوحة المعلومات

توجد واجهة المستخدم في `Dashboard → Usage → Evals`
(`src/app/(dashboard)/dashboard/usage/components/EvalsTab.tsx`). ومن هناك يمكنك:

- استعراض مجموعات الاختبارات المدمجة والمخصّصة مع معاينة كل حالة على حدة.
- إنشاء مجموعات اختبارات مخصّصة وتعديلها وحذفها باستخدام أداة إنشاء الحالات.
- اختيار هدف (الإعدادات الافتراضية للمجموعة / نموذج / Combo)، واختياريًا هدف ثانٍ
  `compareTarget`، واختياريًا مفتاح API، ثم التشغيل عند الطلب.
- فحص سجل التشغيل، وحالة النجاح/الفشل لكل حالة، وزمن الاستجابة، والمخرجات المسجّلة.
- عرض بطاقة النتائج المتجددة والمجمّعة عبر أحدث تشغيل لكل نطاق
  `(suite, target)`.

## العلاقة مع RFC الخاص بالتقييم التلقائي

يوجد نظام تقييم منفصل وأضيق نطاقًا في `src/domain/assessment/`
(راجع أيضًا [AUTO-COMBO.md](../routing/AUTO-COMBO.md) للاطلاع على محرك التقييم المباشر).
يستهدف هذا النظام محرك Auto Combo — إذ يقيّم المزوّدين والنماذج تلقائيًا
بحيث تستطيع تركيبات Combo إصلاح نفسها عند تعطل الجهات المصدرية. ويستخدم مشغّله الخاص،
ومصنّفه الخاص، ومنطق التقييم الخاص به.

إطار Evals الموثّق هنا هو **واجهة الاختبار الأوسع ذات الأغراض العامة**.
استخدمه بصورة مفضّلة لمجموعات اختبارات الانحدار العشوائية، ومقارنات A/B،
واختبارات الدخان لكل إصدار. استخدم نظام Auto-Assessment عندما تحتاج
إلى أن تؤثر الحالة الفورية للمزوّد في قرارات التوجيه.

## التكامل مع CI

لا يوجد حاليًا برنامج npm نصي مخصّص باسم `eval:ci`. هناك مساران إذا أردت
اشتراط نتائج التقييم للموافقة على الإصدارات:

- **مسار HTTP**: شغّل الخادم، وأرسل طلبًا إلى `POST /api/evals` باستخدام
  `suiteId` + `target` معروفين، وتحقق من أن `runs[].summary.passRate >= N` في
  الاستجابة.
- **المسار داخل العملية**: استورد `runEvalSuiteAgainstTarget()` من
  `@/lib/evals/runtime` داخل برنامج نصي، وشغّله على قاعدة بيانات اختبار، وتحقق من
  `PersistedEvalRun.summary` المُعاد.

توجد الاختبارات التي تغطي المسار والسجل في
`tests/unit/evals-route.test.ts` و`tests/unit/evals-history.test.ts`.

## نقاط التوسعة

التغييرات الشائعة والمواضع التي يجب إجراؤها فيها:

- **استراتيجية تقييم جديدة** — وسّع كتلة `switch (evalCase.expected.strategy)`
  في `evaluateCase()` (`evalRunner.ts`)، ووسّع `EvalCaseStrategy` في
  `src/lib/db/evals.ts` بالإضافة إلى `evalCaseBuilderSchema` في `schemas.ts`.
- **مجموعة اختبارات مدمجة جديدة** — عرّف كائن مجموعة واستدعِ `registerSuite()` في
  أسفل `evalRunner.ts`. سيكتشفه `listSuites()` تلقائيًا.
- **التشغيل بالتزامن** — غيّر حلقة `for` التسلسلية في
  `runEvalSuiteAgainstTarget()` إلى `Promise.all` محدود (لا توجد حاليًا
  آلية للتحكم في التزامن).
- **حالات البث/استدعاء الأدوات** — يفرض المشغّل حاليًا `stream: false`.
  سيتطلب التقييم المدرك للبث أو الأدوات تغييرات في `runtime.ts`
  (التقاط أجزاء SSE وتجميعها قبل التقييم).

## انظر أيضًا

- [USER_GUIDE.md](../guides/USER_GUIDE.md) — شرح شامل للمنتج
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — مرجع مسار معالجة الطلبات
- [AUTO-COMBO.md](../routing/AUTO-COMBO.md) — محرك تقييم Auto Combo (بيئة التشغيل الفعلية)
- المصدر: `src/lib/evals/`، `src/lib/db/evals.ts`، `src/app/api/evals/`
- واجهة المستخدم: `src/app/(dashboard)/dashboard/usage/components/EvalsTab.tsx`
