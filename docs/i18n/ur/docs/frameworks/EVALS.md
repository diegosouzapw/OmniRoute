# Evaluations (Evals) (اردو)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/EVALS.md) · 🇪🇹 [am](../../../am/docs/frameworks/EVALS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/EVALS.md) · 🇦🇿 [az](../../../az/docs/frameworks/EVALS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/EVALS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/EVALS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/EVALS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/EVALS.md) · 🇩🇰 [da](../../../da/docs/frameworks/EVALS.md) · 🇩🇪 [de](../../../de/docs/frameworks/EVALS.md) · 🇬🇷 [el](../../../el/docs/frameworks/EVALS.md) · 🇪🇸 [es](../../../es/docs/frameworks/EVALS.md) · 🇪🇪 [et](../../../et/docs/frameworks/EVALS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/EVALS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/EVALS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/EVALS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/EVALS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/EVALS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/EVALS.md) · 🇮🇱 [he](../../../he/docs/frameworks/EVALS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/EVALS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/EVALS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/EVALS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/EVALS.md) · 🇮🇩 [id](../../../id/docs/frameworks/EVALS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/EVALS.md) · 🇮🇹 [it](../../../it/docs/frameworks/EVALS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/EVALS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/EVALS.md) · 🇰🇭 [km](../../../km/docs/frameworks/EVALS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/EVALS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/EVALS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/EVALS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/EVALS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/EVALS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/EVALS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/EVALS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/EVALS.md) · 🇲🇲 [my](../../../my/docs/frameworks/EVALS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/EVALS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/EVALS.md) · 🇳🇴 [no](../../../no/docs/frameworks/EVALS.md) · 🇮🇳 [or](../../../or/docs/frameworks/EVALS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/EVALS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/EVALS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/EVALS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/EVALS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/EVALS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/EVALS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/EVALS.md) · 🇱🇰 [si](../../../si/docs/frameworks/EVALS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/EVALS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/EVALS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/EVALS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/EVALS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/EVALS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/EVALS.md) · 🇮🇳 [te](../../../te/docs/frameworks/EVALS.md) · 🇹🇭 [th](../../../th/docs/frameworks/EVALS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/EVALS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/EVALS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/EVALS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/EVALS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/EVALS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/EVALS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/EVALS.md)

---

> **مستند ماخذ:** `src/lib/evals/`، `src/lib/db/evals.ts`، `src/app/api/evals/`
> **آخری بار اپ ڈیٹ کیا گیا:** 2026-06-28 — v3.8.40

OmniRoute کے ساتھ ایک عمومی جانچ فریم ورک فراہم کیا جاتا ہے، جسے آپ روٹنگ
کنفیگریشنز، انفرادی فراہم کنندگان/ماڈلز، یا شامل شدہ "golden set" سویٹس کی کارکردگی
جانچنے کے لیے استعمال کر سکتے ہیں۔ اسے روٹنگ کی تبدیلیوں کی تصدیق، نئے فراہم کنندگان
کی توثیق، اور پروڈکشن ٹریفک میں منتقل کرنے سے پہلے ریلیزز کو مشروط کرنے کے لیے
استعمال کریں۔

فریم ورک کا نفاذ درج ذیل حصوں پر مشتمل ہے:

- ایک خالص رنر (`src/lib/evals/evalRunner.ts`) جو اِن میموری
  بلٹ اِن سویٹس رجسٹر کرتا ہے، متوقع معیار کے مطابق آؤٹ پٹس کا جائزہ لیتا ہے، اور
  اسکور کارڈز کو یکجا کرتا ہے۔
- SQLite میں حسبِ ضرورت (صارف کی متعین کردہ) سویٹس
  اور سابقہ رنز کے لیے ایک پرسسٹنس لیئر (`src/lib/db/evals.ts`)۔
- ایک آرکیسٹریشن لیئر (`src/lib/evals/runtime.ts`) جو ہر کیس کو
  `POST /v1/chat/completions` پر حقیقی کالز بھیج کر چلاتی ہے، لیٹنسی
  اور آؤٹ پٹس محفوظ کرتی ہے، اور رن کو مستقل طور پر محفوظ کرتی ہے۔
- `/api/evals/*` کے تحت REST اینڈ پوائنٹس (صرف مینجمنٹ کی توثیق کے ساتھ)۔
- `Dashboard → Usage → Evals` پر ایک ڈیش بورڈ انٹرفیس (`EvalsTab.tsx`)۔

## تصورات

### سویٹ

سویٹ ٹیسٹ کیسز کا ایک نام زد مجموعہ ہے، جس میں ایک `description` اور ایک یا
زیادہ کیسز ہوتے ہیں۔ سویٹس دو ذرائع سے آتے ہیں:

| ماخذ       | کہاں متعین کیا گیا ہے                            | کیا رن ٹائم پر قابلِ تبدیلی ہے؟ |
| ---------- | ------------------------------------------------ | ------------------------------- |
| `built-in` | بوٹ کے وقت `registerSuite()` کے ذریعے رجسٹرڈ     | نہیں (کوڈ میں متعین)            |
| `custom`   | SQLite کے `eval_suites` + `eval_cases` میں محفوظ | ہاں (API/UI کے ذریعے)           |

موجودہ بلٹ اِن سویٹس (`src/lib/evals/evalRunner.ts` ملاحظہ کریں):

- `golden-set` — سلام/ریاضی/ترجمہ/حفاظت پر مشتمل 10 بنیادی کیسز
- `coding-proficiency` — Python/JS/SQL/TS/بگ کی شناخت
- `reasoning-logic` — قیاسی استدلال، لفظی مسائل، پیٹرن کی شناخت
- `multilingual` — ترجمہ اور زبان کی شناخت
- `safety-guardrails` — PII، جیل بریک، انکار، اور تعصب سے آگاہی
- `instruction-following` — صرف JSON، نمبر وار فہرستیں، زبان کی پابندیاں
- `codex-comparison` — تقابلی موڈ کے لیے براہِ راست مقابلے والے کوڈنگ ٹاسکس

### کیس

ہر کیس میں درج ذیل شامل ہوتے ہیں:

| فیلڈ       | وضاحت                                                                        |
| ---------- | ---------------------------------------------------------------------------- |
| `id`       | مستقل شناخت کنندہ (آؤٹ پٹس اور میٹرکس کے لیے کلید کے طور پر استعمال ہوتا ہے) |
| `name`     | انسان کے لیے قابلِ فہم لیبل                                                  |
| `model`    | جب رن `suite-default` ٹارگٹنگ استعمال کرے تو ڈیفالٹ ماڈل                     |
| `input`    | `{ messages, max_tokens? }` — `/v1/chat/completions` کو بھیجا جاتا ہے        |
| `expected` | `{ strategy, value }` — اسکورنگ کا معیار (ذیل میں دیکھیں)                    |
| `tags`     | اختیاری لیبلز (مثلاً `safety`، `pii`، `jailbreak`)                           |

### ہدف

ایک ہی سویٹ کو مختلف اہداف کے مقابل چلایا جا سکتا ہے۔ ہدف کا اسکیما
`src/shared/validation/schemas.ts` میں `evalTargetSchema` ہے:

| ہدف کی قسم      | `id`         | طرزِ عمل                                                        |
| --------------- | ------------ | --------------------------------------------------------------- |
| `suite-default` | `null`       | ہر کیس اپنا بلٹ اِن `model` فیلڈ استعمال کرتا ہے                |
| `model`         | ماڈل کا نام  | ہر کیس کو ایک براہِ راست ماڈل سے لازماً گزاریں (مثلاً `gpt-4o`) |
| `combo`         | کومبو کا نام | ہر کیس کو ایک کومبو سے چلائیں (روٹنگ انجن کو آزماتا ہے)         |

`model` اور `combo` کے لیے `id` فیلڈ لازمی ہے (Zod کے
`superRefine` کے ذریعے نافذ)۔ جب `compareTarget` فراہم کیا جائے تو دونوں اہداف کا مختلف ہونا
ضروری ہے — رنر A/B موازنے کے لیے دونوں رنز کو ایک ہی `runGroupId` کے تحت مستقل طور پر
محفوظ کرتا ہے۔

## اسکورنگ کے معیارات

`evaluateCase()` (evalRunner.ts) میں نافذ کیے گئے ہیں:

| حکمتِ عملی | کامیابی کی شرط…                                                        |
| ---------- | ---------------------------------------------------------------------- |
| `exact`    | `actualOutput === expected.value`                                      |
| `contains` | `actualOutput.toLowerCase().includes(expected.value.toLowerCase())`    |
| `regex`    | `new RegExp(expected.value).test(actualOutput)` کی قدر truthy ہو       |
| `custom`   | `expected.fn(actualOutput, evalCase)` کی واپسی truthy ہو (صرف بلٹ اِن) |

**نوٹ:** کسٹم فنکشن اسکورنگ کوڈ میں متعین (بلٹ اِن) سوٹس کے لیے مخصوص ہے، کیونکہ فنکشنز کو API کے ذریعے سیریلائز نہیں کیا جا سکتا۔ صارف کے بنائے ہوئے سوٹس کے لیے `evalCaseBuilderSchema` صرف `contains | exact | regex` قبول کرتا ہے۔

فی الحال کوئی LLM بطور جج یا embedding پر مبنی مماثلت اسکورر موجود نہیں — اسے `evaluateCase()` میں توسیع کے ایک واضح مقام کے طور پر شامل کیا جا سکتا ہے۔

## ڈیٹابیس اسکیما

تین ٹیبلز (مائیگریشنز `030_create_eval_runs.sql` اور `031_create_eval_suites.sql`):

| ٹیبل          | مقصد                                                                                                                   |
| ------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `eval_suites` | کسٹم سوٹ میٹا ڈیٹا (`id`، `name`، `description`)                                                                       |
| `eval_cases`  | ہر سوٹ کے کیسز — `input_json`، `expected_*`، `tags_json`                                                               |
| `eval_runs`   | سابقہ رنز — `pass_rate`، `total`، `passed`، `failed`، `avg_latency_ms`، `summary_json`، `results_json`، `outputs_json` |

بلٹ اِن سوٹس DB میں محفوظ **نہیں** کیے جاتے۔ وہ میموری میں موجود رہتے ہیں اور جب بھی `evalRunner.ts` امپورٹ کیا جاتا ہے، دوبارہ رجسٹر ہوتے ہیں۔

## REST API

تمام endpoints کے لیے انتظامی تصدیق (`requireManagementAuth`) درکار ہے — یہ عوامی پراکسی سطح کا حصہ نہیں ہیں۔

| Endpoint                      | طریقہ    | تفصیل                                                     |
| ----------------------------- | -------- | --------------------------------------------------------- |
| `/api/evals`                  | `GET`    | سوٹس + حالیہ رنز + اسکور کارڈ + اہداف + کلیدوں کی فہرست   |
| `/api/evals`                  | `POST`   | سوٹ چلائیں (واحد یا موازنہ) — اسکیما `evalRunSuiteSchema` |
| `/api/evals/{suiteId}`        | `GET`    | ایک سوٹ حاصل کریں (بلٹ اِن یا کسٹم)                       |
| `/api/evals/suites`           | `POST`   | کسٹم سوٹ بنائیں — اسکیما `evalSuiteSaveSchema`            |
| `/api/evals/suites/{suiteId}` | `GET`    | کسٹم سوٹ حاصل کریں                                        |
| `/api/evals/suites/{suiteId}` | `PUT`    | کسٹم سوٹ تبدیل کریں (کیسز دوبارہ داخل کیے جاتے ہیں)       |
| `/api/evals/suites/{suiteId}` | `DELETE` | کسٹم سوٹ اور اس کے کیسز حذف کریں                          |

### سوٹ چلانا

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

اختیاری فیلڈز:

- `outputs` — پہلے سے کمپیوٹ کیے گئے outputs کا `Record<caseId, string>`۔ اسے فراہم کرنے پر runner **ڈسپیچ چھوڑ دیتا ہے** اور صرف کیش شدہ outputs کو اسکور کرتا ہے (آف لائن جانچ کے لیے مفید)۔
- `compareTarget` — متوازی طور پر چلانے کے لیے دوسرا ہدف؛ بالمقابل جائزے کے لیے دونوں رنز ایک ہی تیار کردہ `runGroupId` استعمال کرتے ہیں۔
- `apiKeyId` — ڈسپیچ کی گئی `/v1/chat/completions` کالز کی تصدیق کے لیے استعمال ہونے والی داخلی API کلید۔ جب `REQUIRE_API_KEY` فعال ہو تو یہ درکار ہے۔

### کسٹم سوٹ بنانا

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

## ڈسپیچ پائپ لائن

`runEvalSuiteAgainstTarget()` (`src/lib/evals/runtime.ts`):

1. سوٹ کو حل کرتا ہے (بلٹ اِن یا حسبِ ضرورت)۔
2. ہر کیس کے لیے، کیس کے `messages`، حل شدہ `model`، `stream: false`، اور `max_tokens: 512` (یا کیس کی جانب سے فراہم کردہ متبادل قدر) کے ساتھ `/v1/chat/completions` کے لیے ایک `Request` بناتا ہے۔
3. چیٹ ہینڈلر کو براہِ راست کال کرتا ہے (اسی پراسیس کے اندر — کوئی اضافی HTTP مرحلہ نہیں)۔
4. تاخیر ریکارڈ کرتا ہے اور متن کو یا تو `choices[0].message.content` سے یا Responses-API کے `output[]` پے لوڈ سے اخذ کرتا ہے۔
5. `runSuite()` کے ذریعے تمام آؤٹ پٹس کو اسکور کرتا ہے، پھر `saveEvalRun()` کے ذریعے محفوظ کرتا ہے۔

کیسز **یکے بعد دیگرے** چلتے ہیں۔ فی الحال کنکرنسی کا کوئی فلیگ موجود نہیں ہے۔

## ڈیش بورڈ

UI، `Dashboard → Usage → Evals`
(`src/app/(dashboard)/dashboard/usage/components/EvalsTab.tsx`) پر موجود ہے۔ وہاں سے آپ یہ کر سکتے ہیں:

- بلٹ اِن اور حسبِ ضرورت سوٹس کو ہر کیس کے الگ پیش منظر کے ساتھ براؤز کرنا۔
- کیس بلڈر کے ذریعے حسبِ ضرورت سوٹس بنانا، ان میں ترمیم کرنا، یا انہیں حذف کرنا۔
- کوئی ہدف (سوٹ کی ڈیفالٹ اقدار / ماڈل / کومبو) منتخب کرنا، اختیاری طور پر دوسرا `compareTarget` اور API کلید منتخب کرنا، پھر حسبِ ضرورت رَن کرنا۔
- رَن کی تاریخ، ہر کیس کی کامیابی/ناکامی، تاخیر، اور محفوظ کیے گئے آؤٹ پٹس کا معائنہ کرنا۔
- ہر `(suite, target)` دائرۂ کار کے تازہ ترین رَن پر مجموعی طور پر مرتب کردہ رولنگ اسکور کارڈ دیکھنا۔

## Auto-Assessment RFC کے ساتھ تعلق

ایک الگ اور زیادہ محدود اسیسمنٹ ذیلی نظام `src/domain/assessment/` میں موجود ہے
(لائیو اسکورنگ انجن کے لیے [AUTO-COMBO.md](../routing/AUTO-COMBO.md) بھی دیکھیں)۔
یہ ذیلی نظام Auto Combo انجن کو ہدف بناتا ہے — پرووائیڈرز اور ماڈلز کو خودکار طور پر اسکور کرتا ہے تاکہ اپ اسٹریمز کی ناکامی کی صورت میں کومبوز خود اپنی اصلاح کر سکیں۔ یہ اپنا رَنر، اپنا کیٹیگرائزر، اور اپنی اسکورنگ منطق استعمال کرتا ہے۔

یہاں دستاویزی شکل میں بیان کردہ Evals فریم ورک **زیادہ وسیع، عمومی مقاصد کے لیے ٹیسٹنگ سطح** ہے۔ اسے صوابدیدی ریگریشن سوٹس، A/B موازنوں، اور ہر ریلیز کے اسموک ٹیسٹس کے لیے ترجیح دیں۔ جب آپ چاہتے ہوں کہ پرووائیڈر کی حقیقی وقت کی صحت روٹنگ کے فیصلوں پر اثر انداز ہو، تو Auto-Assessment ذیلی نظام استعمال کریں۔

## CI انٹیگریشن

فی الحال کوئی مخصوص `eval:ci` npm اسکرپٹ موجود نہیں ہے۔ اگر آپ eval نتائج کی بنیاد پر ریلیزز کو مشروط کرنا چاہتے ہیں تو دو راستے ہیں:

- **HTTP راستہ**: سرور چلائیں، معلوم `suiteId` + `target` کے ساتھ `POST /api/evals` کو درخواست بھیجیں، اور رسپانس میں تصدیق کریں کہ `runs[].summary.passRate >= N` ہے۔
- **اِن-پراسیس راستہ**: کسی اسکرپٹ سے `@/lib/evals/runtime` میں موجود `runEvalSuiteAgainstTarget()` درآمد کریں، ٹیسٹ DB کے خلاف چلائیں، اور واپس کیے گئے `PersistedEvalRun.summary` کو چیک کریں۔

روٹ اور ہسٹری کا احاطہ کرنے والے ٹیسٹس
`tests/unit/evals-route.test.ts` اور `tests/unit/evals-history.test.ts` میں موجود ہیں۔

## توسیعی مقامات

عام تبدیلیاں اور انہیں کرنے کے مقامات:

- **نئی اسکورنگ حکمتِ عملی** — `evaluateCase()` (`evalRunner.ts`) میں موجود `switch (evalCase.expected.strategy)` بلاک کو وسعت دیں، اور `src/lib/db/evals.ts` میں `EvalCaseStrategy` نیز `schemas.ts` میں `evalCaseBuilderSchema` کو وسیع کریں۔
- **نیا بلٹ اِن سوٹ** — ایک سوٹ آبجیکٹ متعین کریں اور `evalRunner.ts` کے آخر میں `registerSuite()` کو کال کریں۔ اسے `listSuites()` خودکار طور پر دریافت کر لے گا۔
- **کنکرنسی کے ساتھ رَن کرنا** — `runEvalSuiteAgainstTarget()` میں موجود یکے بعد دیگرے چلنے والے `for` لوپ کو محدود `Promise.all` میں تبدیل کریں (فی الحال کنکرنسی کا کوئی کنٹرول موجود نہیں ہے)۔
- **اسٹریم/ٹول-کال کیسز** — فی الحال رَنر لازماً `stream: false` استعمال کرتا ہے۔ اسٹریمنگ یا ٹول سے آگاہ ایویلیوایشن کے لیے `runtime.ts` میں تبدیلیاں درکار ہوں گی (اسکورنگ سے پہلے SSE حصوں کو محفوظ اور یکجا کریں)۔

## مزید دیکھیں

- [USER_GUIDE.md](../guides/USER_GUIDE.md) — پروڈکٹ کا مجموعی مرحلہ وار تعارف
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — درخواست پائپ لائن کا حوالہ
- [AUTO-COMBO.md](../routing/AUTO-COMBO.md) — آٹو کومبو اسکورنگ انجن (لائیو رن ٹائم)
- ماخذ: `src/lib/evals/`, `src/lib/db/evals.ts`, `src/app/api/evals/`
- یوزر انٹرفیس: `src/app/(dashboard)/dashboard/usage/components/EvalsTab.tsx`
