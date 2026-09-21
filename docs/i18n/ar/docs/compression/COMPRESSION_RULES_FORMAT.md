# Compression Rules Format (العربية)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_RULES_FORMAT.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_RULES_FORMAT.md)

---

قواعد الضغط هي ملفات JSON تُحمَّل في وقت التشغيل. وقد صُممت عمدًا لتحتوي على بيانات فقط، بحيث يمكن مراجعة حزم اللغات الجديدة ومرشحات أوامر RTK دون تغيير شيفرة المحرك.

> **المخطط القياسي (مصدر الحقيقة):** [`open-sse/services/compression/rules/_schema.json`](../../open-sse/services/compression/rules/_schema.json) ‏(JSON Schema، المسودة 2020-12).
> الأمثلة أدناه توضيحية — عند الشك، تحقّق من صحة حزمتك باستخدام `_schema.json`.

## حزم قواعد Caveman

توجد حزم قواعد Caveman ضمن:

```txt
open-sse/services/compression/rules/<language>/<pack>.json
```

تحتوي كل حزمة على عمليات استبدال تُطبَّق على النص النثري العادي بعد عزل المناطق المحمية.

```json
{
  "language": "en",
  "category": "filler",
  "rules": [
    {
      "name": "question_to_directive",
      "pattern": "\\b(?:Can you explain why|Could you show me how)\\b\\s*",
      "replacement": "Explain why ",
      "replacementMap": {
        "can you explain why": "Explain why ",
        "could you show me how": "Show how "
      },
      "flags": "gi",
      "context": "all",
      "category": "context",
      "minIntensity": "lite",
      "description": "Convert verbose questions into direct requests."
    }
  ]
}
```

### حقول Caveman

| الحقل                    | مطلوب | الوصف                                                                             |
| ------------------------ | ----- | --------------------------------------------------------------------------------- |
| `language`               | نعم   | مفتاح لغة شبيه بـ BCP-47 مثل `en` أو `pt-BR` أو `es`                              |
| `category`               | نعم   | اسم ملف/فئة الحزمة، مثل `filler` أو `dedup`                                       |
| `rules`                  | نعم   | مصفوفة من قواعد الاستبدال باستخدام التعابير النمطية                               |
| `rules[].name`           | نعم   | اسم ثابت للقاعدة                                                                  |
| `rules[].pattern`        | نعم   | مصدر تعبير نمطي في JavaScript                                                     |
| `rules[].flags`          | لا    | أعلام التعبير النمطي في JavaScript؛ القيمة الافتراضية `gi`                        |
| `rules[].replacement`    | لا    | سلسلة الاستبدال أو القيمة الاحتياطية عند عدم العثور على تطابق في `replacementMap` |
| `rules[].replacementMap` | لا    | استبدالات خاصة بكل تطابق، مفهرسة حسب النص المتطابق بعد تطبيعه                     |
| `rules[].context`        | لا    | `all` أو `user` أو `assistant` أو `system`؛ القيمة الافتراضية `all`               |
| `rules[].category`       | لا    | `filler` أو `context` أو `structural` أو `dedup` أو `terse` أو `ultra`            |
| `rules[].minIntensity`   | لا    | `lite` أو `full` أو `ultra`؛ القيمة الافتراضية `lite`                             |
| `rules[].description`    | لا    | ملخص للقاعدة قابل للقراءة البشرية                                                 |

استخدم `flags` عندما تكون المطابقة الحساسة لحالة الأحرف مهمة، مثل إزالة أداة التعريف قبل نص نثري بأحرف صغيرة دون حذفها من `the OpenAI API`. استخدم `replacementMap` عندما يحتوي تعبير نمطي واحد على بدائل متعددة تحتاج إلى مخرجات مختلفة؛ فهذا يحافظ على كون حزم قواعد JSON قائمة على البيانات فقط، مع الإبقاء على سلوك دوال الاستبدال المضمنة الأكثر ثراءً في TypeScript.

## حزم مرشحات RTK

توجد مرشحات RTK ضمن:

```txt
open-sse/services/compression/engines/rtk/filters/<filter>.json
```

يصف كل مرشح كيفية التعرّف على عائلة من مخرجات الأوامر وضغطها.

```json
{
  "id": "test-vitest",
  "label": "Vitest output",
  "category": "test",
  "priority": 92,
  "match": {
    "outputTypes": ["test-vitest"],
    "commands": ["vitest", "npm test", "npm run test"],
    "patterns": ["\\bFAIL\\b", "\\bPASS\\b", "\\bTest Files\\b"]
  },
  "rules": {
    "stripAnsi": true,
    "replace": [{ "pattern": "\\s+\\[[0-9]+ms\\]", "replacement": "" }],
    "matchOutput": [
      {
        "pattern": "All tests passed",
        "message": "vitest: ok",
        "unless": "FAIL|Error:"
      }
    ],
    "includePatterns": ["FAIL", "Error:", "Test Files", "Tests"],
    "dropPatterns": ["^\\s*$", "Duration\\s+\\d+"],
    "collapsePatterns": ["^\\s+at "],
    "deduplicate": true,
    "truncateLineAt": 240,
    "maxLines": 160,
    "headLines": 24,
    "tailLines": 40,
    "onEmpty": "vitest: ok",
    "filterStderr": false
  },
  "preserve": {
    "errorPatterns": ["FAIL", "Error:", "AssertionError"],
    "summaryPatterns": ["Test Files", "Tests", "Snapshots"]
  },
  "tests": [
    {
      "name": "keeps failing tests",
      "command": "vitest",
      "input": "FAIL test/a.test.ts\\nError: boom\\nTest Files 1 failed",
      "expected": "FAIL test/a.test.ts\\nError: boom\\nTest Files 1 failed"
    }
  ]
}
```

### حقول RTK

| الحقل                      | مطلوب | الوصف                                                                         |
| -------------------------- | ----- | ----------------------------------------------------------------------------- |
| `id`                       | نعم   | معرّف ثابت للمرشح                                                             |
| `label`                    | نعم   | اسم قابل للقراءة في لوحة المعلومات                                            |
| `category`                 | نعم   | عائلة المرشح: git، test، build، shell، docker، package، infra، cloud، generic |
| `priority`                 | لا    | تفوز الأولوية الأعلى عند تطابق عدة مرشحات                                     |
| `match.outputTypes`        | لا    | معرّفات مخرجات أداة الكشف التي تحدد هذا المرشح                                |
| `match.commands`           | لا    | رموز الأوامر التي تحدد هذا المرشح                                             |
| `match.patterns`           | لا    | أنماط التعبيرات النمطية التي تحدد هذا المرشح من نص المخرجات                   |
| `rules.stripAnsi`          | لا    | إزالة تسلسلات ANSI الخاصة قبل مراحل التعبيرات النمطية                         |
| `rules.replace`            | لا    | استبدالات تعبيرات نمطية مرتبة تُطبَّق سطرًا بسطر                              |
| `rules.matchOutput`        | لا    | قواعد مخرجات تُنهي المعالجة مبكرًا مع شرط `unless` اختياري                    |
| `rules.includePatterns`    | لا    | الأسطر التي يُفضّل الاحتفاظ بها                                               |
| `rules.dropPatterns`       | لا    | الأسطر التي يجب إزالتها باعتبارها ضوضاء                                       |
| `rules.collapsePatterns`   | لا    | الأسطر المتكررة المطابقة التي يمكن اختزالها                                   |
| `rules.deduplicate`        | لا    | اختزال الأسطر المتطابقة بعد تسويتها                                           |
| `rules.truncateLineAt`     | لا    | حد أحرف آمن مع Unicode لكل سطر                                                |
| `rules.maxLines`           | لا    | الحد الأقصى للأسطر المحتفظ بها قبل الحفاظ على الأسطر الأخيرة                  |
| `rules.headLines`          | لا    | الأسطر الأولى المحتفظ بها أثناء الاقتطاع                                      |
| `rules.tailLines`          | لا    | الأسطر الأخيرة المحتفظ بها لتوفير السياق الحديث                               |
| `rules.onEmpty`            | لا    | رسالة احتياطية عندما تؤدي التصفية إلى إزالة كل المحتوى                        |
| `rules.filterStderr`       | لا    | تسوية بادئات stderr الشائعة قبل مراحل التصفية اللاحقة                         |
| `preserve.errorPatterns`   | لا    | أسطر الأخطاء التي ينبغي أن تبقى بعد الاقتطاع                                  |
| `preserve.summaryPatterns` | لا    | أسطر الملخص التي ينبغي أن تبقى بعد الاقتطاع                                   |
| `tests[]`                  | لا    | عينات تحقق مضمنة تستخدمها بوابة التحقق الخاصة بـ RTK                          |

يطبّق RTK المراحل التصريحية بهذا الترتيب: `stripAnsi`، و`filterStderr`، و`replace`،
و`matchOutput`، و`dropPatterns`/`includePatterns`، و`truncateLineAt`، و`headLines`/`tailLines`،
و`maxLines`، و`onEmpty`.

يمكن تحميل المرشحات المخصصة من:

1. ملفات المشروع `.rtk/filters.json` فقط بعد وجود تجزئة مطابقة في `.rtk/trust.json` أو
   عند تمكين `trustProjectFilters`.
2. الملف العام `DATA_DIR/rtk/filters.json`.
3. المرشحات المضمنة.

قد تحتوي الملفات المخصصة على مستوى المشروع/المستوى العام على كائن مرشح واحد أو مصفوفة من كائنات المرشحات. يتم تخطي
المرشحات المخصصة غير الصالحة مع عرض معلومات تشخيصية؛ أما المرشحات المضمنة غير الصالحة فتؤدي إلى فشل التحقق.

ملف ثقة المشروع:

```json
{
  "filtersSha256": "0123456789abcdef..."
}
```

يتجاوز متغير البيئة `OMNIROUTE_RTK_TRUST_PROJECT_FILTERS=1` متطلبات التجزئة ويمنح الثقة لمرشحات المشروع دون
تجزئة، وينبغي قصر استخدامه على التطوير المحلي ضمن بيئة خاضعة للتحكم.

## قواعد السلامة

- حافظ على خاصية عدم التأثر بالتكرار في القواعد: يجب ألا يؤدي تشغيل عامل التصفية نفسه مرتين إلى إتلاف المخرجات.
- حافظ قدر الإمكان على نصوص الأخطاء ومسارات الملفات وأرقام الأسطر وملخصات الأوامر كما هي تمامًا.
- تجنّب القواعد التي تعدّل كتل التعليمات البرمجية أو حمولات JSON أو عناوين URL أو الأسرار.
- أضف تغطية باختبارات الوحدات لعائلات الأوامر الجديدة في اختبارات الكاشف/عامل التصفية.
- أضف عينات `tests[]` إلى كل عامل تصفية مضمّن وإلى عوامل التصفية المخصصة المشتركة.

## التحقق

يُتحقق من صحة حزم القواعد قبل استخدامها. تفشل حزم Caveman المضمّنة وعوامل تصفية RTK المضمّنة فورًا
أثناء التحقق، بحيث تُكتشف أصول الإصدار المعطّلة قبل الشحن. يتم تخطي عوامل تصفية RTK المخصصة
مع عرض معلومات تشخيصية عند فشل التحليل أو التحقق من الثقة.

التحقق المركّز:

```bash
node --import tsx/esm --test tests/unit/compression/rule-loader.test.ts tests/unit/compression/language-packs.test.ts
node --import tsx/esm --test tests/unit/compression/rtk-verify.test.ts tests/unit/compression/rtk-dsl-pipeline.test.ts
```
