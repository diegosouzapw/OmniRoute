# Evaluations (Evals) (فارسی)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/EVALS.md) · 🇪🇹 [am](../../../am/docs/frameworks/EVALS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/EVALS.md) · 🇦🇿 [az](../../../az/docs/frameworks/EVALS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/EVALS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/EVALS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/EVALS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/EVALS.md) · 🇩🇰 [da](../../../da/docs/frameworks/EVALS.md) · 🇩🇪 [de](../../../de/docs/frameworks/EVALS.md) · 🇬🇷 [el](../../../el/docs/frameworks/EVALS.md) · 🇪🇸 [es](../../../es/docs/frameworks/EVALS.md) · 🇪🇪 [et](../../../et/docs/frameworks/EVALS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/EVALS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/EVALS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/EVALS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/EVALS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/EVALS.md) · 🇮🇱 [he](../../../he/docs/frameworks/EVALS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/EVALS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/EVALS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/EVALS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/EVALS.md) · 🇮🇩 [id](../../../id/docs/frameworks/EVALS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/EVALS.md) · 🇮🇹 [it](../../../it/docs/frameworks/EVALS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/EVALS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/EVALS.md) · 🇰🇭 [km](../../../km/docs/frameworks/EVALS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/EVALS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/EVALS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/EVALS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/EVALS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/EVALS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/EVALS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/EVALS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/EVALS.md) · 🇲🇲 [my](../../../my/docs/frameworks/EVALS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/EVALS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/EVALS.md) · 🇳🇴 [no](../../../no/docs/frameworks/EVALS.md) · 🇮🇳 [or](../../../or/docs/frameworks/EVALS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/EVALS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/EVALS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/EVALS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/EVALS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/EVALS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/EVALS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/EVALS.md) · 🇱🇰 [si](../../../si/docs/frameworks/EVALS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/EVALS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/EVALS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/EVALS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/EVALS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/EVALS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/EVALS.md) · 🇮🇳 [te](../../../te/docs/frameworks/EVALS.md) · 🇹🇭 [th](../../../th/docs/frameworks/EVALS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/EVALS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/EVALS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/EVALS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/EVALS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/EVALS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/EVALS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/EVALS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/EVALS.md)

---

> **منبع حقیقت:** `src/lib/evals/`، `src/lib/db/evals.ts`، `src/app/api/evals/`
> **آخرین بهروزرسانی:** 2026-06-28 — v3.8.40

OmniRoute یک چارچوب ارزیابی عمومی ارائه میکند که میتوانید از آن برای محکزدن پیکربندیهای مسیریابی، ارائهدهندگان/مدلهای منفرد یا مجموعههای همراه «golden set» استفاده کنید.
از این چارچوب برای بررسی تغییرات مسیریابی، اعتبارسنجی ارائهدهندگان جدید و کنترل انتشارها پیش از هدایت ترافیک عملیاتی به آنها استفاده کنید.

این چارچوب بهشکل زیر پیادهسازی شده است:

- یک اجراکنندهٔ خالص (`src/lib/evals/evalRunner.ts`) که مجموعههای داخلی درونحافظهای را ثبت میکند، خروجیها را بر اساس معیارهای مورد انتظار ارزیابی میکند و کارتهای امتیاز را تجمیع میکند.
- یک لایهٔ ماندگاری (`src/lib/db/evals.ts`) برای مجموعههای سفارشی (تعریفشده توسط کاربر) و اجراهای تاریخی در SQLite.
- یک لایهٔ هماهنگسازی (`src/lib/evals/runtime.ts`) که هر مورد را با ارسال فراخوانیهای واقعی به `POST /v1/chat/completions` اجرا میکند، تأخیر و خروجیها را ثبت میکند و اجرای مربوطه را ماندگار میسازد.
- نقاط پایانی REST در مسیر `/api/evals/*` (فقط با احراز هویت مدیریتی).
- یک بخش داشبورد در `Dashboard → Usage → Evals` (`EvalsTab.tsx`).

## مفاهیم

### مجموعه

یک مجموعه، گردایهای نامگذاریشده از موارد آزمون است که دارای یک `description` و یک یا چند مورد است. مجموعهها از دو منبع میآیند:

| منبع       | محل تعریف                                           | قابل تغییر هنگام اجرا؟ |
| ---------- | --------------------------------------------------- | ---------------------- |
| `built-in` | ثبتشده از طریق `registerSuite()` هنگام راهاندازی    | خیر (تعریفشده در کد)   |
| `custom`   | ذخیرهشده در SQLite، در `eval_suites` + `eval_cases` | بله (از طریق API/UI)   |

مجموعههای داخلی فعلی (نگاه کنید به `src/lib/evals/evalRunner.ts`):

- `golden-set` — ۱۰ مورد پایه در زمینههای احوالپرسی/ریاضیات/ترجمه/ایمنی
- `coding-proficiency` — Python/JS/SQL/TS/تشخیص باگ
- `reasoning-logic` — قیاسهای منطقی، مسائل متنی، تشخیص الگو
- `multilingual` — ترجمه و تشخیص زبان
- `safety-guardrails` — PII، جیلبریک، امتناع، آگاهی از سوگیری
- `instruction-following` — فقط JSON، فهرستهای شمارهدار، محدودیتهای زبانی
- `codex-comparison` — وظایف برنامهنویسی رودررو که برای حالت مقایسه در نظر گرفته شدهاند

### مورد

هر مورد شامل موارد زیر است:

| فیلد       | توضیحات                                                             |
| ---------- | ------------------------------------------------------------------- |
| `id`       | شناسهٔ پایدار (برای کلیدگذاری خروجیها و معیارها استفاده میشود)      |
| `name`     | برچسب خوانا برای انسان                                              |
| `model`    | مدل پیشفرض هنگامی که اجرا از هدفگذاری `suite-default` استفاده میکند |
| `input`    | `{ messages, max_tokens? }` — به `/v1/chat/completions` ارسال میشود |
| `expected` | `{ strategy, value }` — معیار امتیازدهی (پایینتر را ببینید)         |
| `tags`     | برچسبهای اختیاری (برای مثال `safety`، `pii`، `jailbreak`)           |

### هدف

یک مجموعهٔ یکسان را میتوان در برابر هدفهای مختلف اجرا کرد. شِمای هدف
`evalTargetSchema` در `src/shared/validation/schemas.ts` است:

| نوع هدف         | `id`      | رفتار                                                                  |
| --------------- | --------- | ---------------------------------------------------------------------- |
| `suite-default` | `null`    | هر مورد از فیلد `model` داخلی خود استفاده میکند                        |
| `model`         | نام مدل   | همهٔ موارد را بهاجبار از یک مدل مستقیم عبور میدهد (برای مثال `gpt-4o`) |
| `combo`         | نام combo | همهٔ موارد را از یک combo عبور میدهد (موتور مسیریابی را به کار میگیرد) |

برای `model` و `combo`، فیلد `id` الزامی است (با `superRefine` از Zod اعمال میشود).
هنگامی که `compareTarget` ارائه شود، دو هدف باید متفاوت باشند — اجراکننده هر دو اجرا را برای مقایسهٔ A/B تحت یک `runGroupId` یکسان ماندگار میکند.

## معیارهای امتیازدهی

در `evaluateCase()` (`evalRunner.ts`) پیادهسازی شدهاند:

| راهبرد     | زمانی قبول میشود که…                                                    |
| ---------- | ----------------------------------------------------------------------- |
| `exact`    | `actualOutput === expected.value`                                       |
| `contains` | `actualOutput.toLowerCase().includes(expected.value.toLowerCase())`     |
| `regex`    | `new RegExp(expected.value).test(actualOutput)` مقدار truthy باشد       |
| `custom`   | `expected.fn(actualOutput, evalCase)` مقدار truthy برگرداند (فقط داخلی) |

**نکته:** امتیازدهی با تابع سفارشی مخصوص مجموعههایی است که در کد تعریف شدهاند
(داخلی)، زیرا توابع را نمیتوان از طریق API سریالسازی کرد.
`evalCaseBuilderSchema` برای مجموعههای ایجادشده توسط کاربر فقط
`contains | exact | regex` را میپذیرد.

در حال حاضر، امتیازدهندهای مبتنی بر LLM بهعنوان داور یا شباهت مبتنی بر embedding
وجود ندارد — افزودن آن به `evaluateCase()` یک نقطهٔ توسعهٔ تمیز خواهد بود.

## شِمای پایگاه داده

سه جدول (مایگریشنهای `030_create_eval_runs.sql` و
`031_create_eval_suites.sql`):

| جدول          | هدف                                                                                                                         |
| ------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `eval_suites` | فرادادهٔ مجموعههای سفارشی (`id`، `name`، `description`)                                                                     |
| `eval_cases`  | موارد هر مجموعه — `input_json`، `expected_*`، `tags_json`                                                                   |
| `eval_runs`   | اجراهای تاریخی — `pass_rate`، `total`، `passed`، `failed`، `avg_latency_ms`، `summary_json`، `results_json`، `outputs_json` |

مجموعههای داخلی در DB ذخیره **نمیشوند**. آنها در حافظه قرار دارند و هر بار که
`evalRunner.ts` وارد میشود، دوباره ثبت میشوند.

## REST API

همهٔ endpointها به احراز هویت مدیریتی (`requireManagementAuth`) نیاز دارند — آنها
بخشی از سطح پراکسی عمومی نیستند.

| Endpoint                      | متد      | توضیحات                                                        |
| ----------------------------- | -------- | -------------------------------------------------------------- |
| `/api/evals`                  | `GET`    | فهرست مجموعهها + اجراهای اخیر + کارت امتیاز + اهداف + کلیدها   |
| `/api/evals`                  | `POST`   | اجرای یک مجموعه (تکی یا مقایسهای) — شِمای `evalRunSuiteSchema` |
| `/api/evals/{suiteId}`        | `GET`    | دریافت یک مجموعه (داخلی یا سفارشی)                             |
| `/api/evals/suites`           | `POST`   | ایجاد یک مجموعهٔ سفارشی — شِمای `evalSuiteSaveSchema`          |
| `/api/evals/suites/{suiteId}` | `GET`    | دریافت یک مجموعهٔ سفارشی                                       |
| `/api/evals/suites/{suiteId}` | `PUT`    | جایگزینی یک مجموعهٔ سفارشی (موارد دوباره درج میشوند)           |
| `/api/evals/suites/{suiteId}` | `DELETE` | حذف یک مجموعهٔ سفارشی و موارد آن                               |

### اجرای یک مجموعه

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

فیلدهای اختیاری:

- `outputs` — یک `Record<caseId, string>` از خروجیهای ازپیشمحاسبهشده. در صورت
  ارائه، اجراکننده **ارسال درخواست را نادیده میگیرد** و فقط خروجیهای cacheشده را
  امتیازدهی میکند (برای ارزیابی آفلاین مفید است).
- `compareTarget` — هدف دومی که بهصورت موازی اجرا میشود؛ هر دو اجرا یک
  `runGroupId` تولیدشده را برای نمایش مقایسهٔ مستقیم به اشتراک میگذارند.
- `apiKeyId` — کلید API داخلی که برای احراز هویت فراخوانیهای ارسالشده به
  `/v1/chat/completions` استفاده میشود. هنگامی که `REQUIRE_API_KEY` فعال است،
  الزامی است.

### ایجاد یک مجموعهٔ سفارشی

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

## خط لولهٔ ارسال

`runEvalSuiteAgainstTarget()` (`src/lib/evals/runtime.ts`):

1. مجموعه را (داخلی یا سفارشی) تعیین میکند.
2. برای هر مورد، یک `Request` به `/v1/chat/completions` با `messages` همان مورد، `model` تعیینشده، `stream: false` و `max_tokens: 512` (یا مقدار بازنویسیشدهٔ مورد) میسازد.
3. مدیریتکنندهٔ چت را مستقیماً فراخوانی میکند (درونپردازهای — بدون رفتوبرگشت HTTP اضافی).
4. تأخیر را ثبت کرده و متن را از `choices[0].message.content` یا بار دادهٔ `output[]` متعلق به Responses-API استخراج میکند.
5. همهٔ خروجیها را از طریق `runSuite()` امتیازدهی کرده و سپس با `saveEvalRun()` ذخیره میکند.

موارد بهصورت **ترتیبی** اجرا میشوند. در حال حاضر هیچ پرچم همزمانی وجود ندارد.

## داشبورد

رابط کاربری در `Dashboard → Usage → Evals`
(`src/app/(dashboard)/dashboard/usage/components/EvalsTab.tsx`) قرار دارد. از آنجا میتوانید:

- مجموعههای داخلی و سفارشی را همراه با پیشنمایش موردبهمورد مرور کنید.
- با سازندهٔ موارد، مجموعههای سفارشی را ایجاد، ویرایش یا حذف کنید.
- یک هدف (پیشفرضهای مجموعه / مدل / ترکیب)، در صورت نیاز یک `compareTarget` دوم و در صورت نیاز یک کلید API انتخاب کنید، سپس اجرا را بهصورت درخواستی آغاز کنید.
- تاریخچهٔ اجرا، وضعیت قبولی/رد هر مورد، تأخیر و خروجیهای ثبتشده را بررسی کنید.
- کارت امتیاز جاری را که بر اساس آخرین اجرا در هر محدودهٔ `(suite, target)` تجمیع شده است، مشاهده کنید.

## ارتباط با RFC ارزیابی خودکار

یک زیرسامانهٔ ارزیابی مجزا و محدودتر در `src/domain/assessment/` قرار دارد
(برای موتور امتیازدهی فعال، [AUTO-COMBO.md](../routing/AUTO-COMBO.md) را نیز ببینید).
این زیرسامانه موتور Auto Combo را هدف قرار میدهد — ارائهدهندگان و مدلها را بهصورت خودکار امتیازدهی میکند تا در صورت خرابی سرویسهای بالادستی، ترکیبها بتوانند خودترمیم شوند. این زیرسامانه از اجراکننده، دستهبندیکننده و منطق امتیازدهی مخصوص به خود استفاده میکند.

چارچوب Evals که در اینجا مستند شده است، **بستر آزمایش گستردهتر و همهمنظوره** است. برای مجموعههای رگرسیون دلخواه، مقایسههای A/B و آزمونهای دود هر انتشار، استفاده از آن را ترجیح دهید. زمانی از زیرسامانهٔ ارزیابی خودکار استفاده کنید که لازم است سلامت بلادرنگ ارائهدهنده بر تصمیمهای مسیریابی تأثیر بگذارد.

## یکپارچهسازی CI

در حال حاضر اسکریپت اختصاصی `eval:ci` برای npm وجود ندارد. اگر میخواهید انتشارها را بر اساس نتایج ارزیابی مشروط کنید، دو مسیر وجود دارد:

- **مسیر HTTP**: سرور را راهاندازی کنید، با یک `suiteId` + `target` مشخص به `POST /api/evals` درخواست بفرستید و در پاسخ، شرط `runs[].summary.passRate >= N` را بررسی کنید.
- **مسیر درونپردازهای**: `runEvalSuiteAgainstTarget()` را از `@/lib/evals/runtime` در یک اسکریپت وارد کنید، آن را در برابر یک پایگاه دادهٔ آزمایشی اجرا کنید و `PersistedEvalRun.summary` بازگرداندهشده را بررسی کنید.

آزمونهای مربوط به مسیر و تاریخچه در
`tests/unit/evals-route.test.ts` و `tests/unit/evals-history.test.ts` قرار دارند.

## نقاط توسعه

تغییرات متداول و محل اعمال آنها:

- **راهبرد امتیازدهی جدید** — بلوک `switch (evalCase.expected.strategy)` را در `evaluateCase()` (`evalRunner.ts`) گسترش دهید و `EvalCaseStrategy` را در `src/lib/db/evals.ts` و نیز `evalCaseBuilderSchema` را در `schemas.ts` توسعه دهید.
- **مجموعهٔ داخلی جدید** — یک شیء مجموعه تعریف کنید و در انتهای `evalRunner.ts`، تابع `registerSuite()` را فراخوانی کنید. این مجموعه بهصورت خودکار توسط `listSuites()` شناسایی خواهد شد.
- **اجرا با همزمانی** — حلقهٔ ترتیبی `for` را در `runEvalSuiteAgainstTarget()` به یک `Promise.all` محدودشده تغییر دهید (در حال حاضر هیچ کنترل همزمانی وجود ندارد).
- **موارد جریانی/فراخوانی ابزار** — در حال حاضر اجراکننده مقدار `stream: false` را اجباری میکند. ارزیابی جریانی یا آگاه از ابزار به تغییراتی در `runtime.ts` نیاز دارد (ثبت و تجمیع قطعههای SSE پیش از امتیازدهی).

## همچنین ببینید

- [USER_GUIDE.md](../guides/USER_GUIDE.md) — راهنمای کلی محصول
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — مرجع خط لولهٔ درخواست
- [AUTO-COMBO.md](../routing/AUTO-COMBO.md) — موتور امتیازدهی Auto Combo (زمان اجرای زنده)
- منبع: `src/lib/evals/`، `src/lib/db/evals.ts`، `src/app/api/evals/`
- رابط کاربری: `src/app/(dashboard)/dashboard/usage/components/EvalsTab.tsx`
