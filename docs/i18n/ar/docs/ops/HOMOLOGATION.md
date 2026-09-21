# Homologation Suite (`npm run homolog`) (العربية)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/HOMOLOGATION.md) · 🇪🇹 [am](../../../am/docs/ops/HOMOLOGATION.md) · 🇦🇿 [az](../../../az/docs/ops/HOMOLOGATION.md) · 🇧🇬 [bg](../../../bg/docs/ops/HOMOLOGATION.md) · 🇧🇩 [bn](../../../bn/docs/ops/HOMOLOGATION.md) · 🇨🇿 [cs](../../../cs/docs/ops/HOMOLOGATION.md) · 🇩🇰 [da](../../../da/docs/ops/HOMOLOGATION.md) · 🇩🇪 [de](../../../de/docs/ops/HOMOLOGATION.md) · 🇬🇷 [el](../../../el/docs/ops/HOMOLOGATION.md) · 🇪🇸 [es](../../../es/docs/ops/HOMOLOGATION.md) · 🇪🇪 [et](../../../et/docs/ops/HOMOLOGATION.md) · 🇮🇷 [fa](../../../fa/docs/ops/HOMOLOGATION.md) · 🇫🇮 [fi](../../../fi/docs/ops/HOMOLOGATION.md) · 🇫🇷 [fr](../../../fr/docs/ops/HOMOLOGATION.md) · 🇮🇪 [ga](../../../ga/docs/ops/HOMOLOGATION.md) · 🇮🇳 [gu](../../../gu/docs/ops/HOMOLOGATION.md) · 🇳🇬 [ha](../../../ha/docs/ops/HOMOLOGATION.md) · 🇮🇱 [he](../../../he/docs/ops/HOMOLOGATION.md) · 🇮🇳 [hi](../../../hi/docs/ops/HOMOLOGATION.md) · 🇭🇷 [hr](../../../hr/docs/ops/HOMOLOGATION.md) · 🇭🇺 [hu](../../../hu/docs/ops/HOMOLOGATION.md) · 🇦🇲 [hy](../../../hy/docs/ops/HOMOLOGATION.md) · 🇮🇩 [id](../../../id/docs/ops/HOMOLOGATION.md) · 🇳🇬 [ig](../../../ig/docs/ops/HOMOLOGATION.md) · 🇮🇹 [it](../../../it/docs/ops/HOMOLOGATION.md) · 🇯🇵 [ja](../../../ja/docs/ops/HOMOLOGATION.md) · 🇬🇪 [ka](../../../ka/docs/ops/HOMOLOGATION.md) · 🇰🇭 [km](../../../km/docs/ops/HOMOLOGATION.md) · 🇮🇳 [kn](../../../kn/docs/ops/HOMOLOGATION.md) · 🇰🇷 [ko](../../../ko/docs/ops/HOMOLOGATION.md) · 🇱🇹 [lt](../../../lt/docs/ops/HOMOLOGATION.md) · 🇱🇻 [lv](../../../lv/docs/ops/HOMOLOGATION.md) · 🇮🇳 [ml](../../../ml/docs/ops/HOMOLOGATION.md) · 🇮🇳 [mr](../../../mr/docs/ops/HOMOLOGATION.md) · 🇲🇾 [ms](../../../ms/docs/ops/HOMOLOGATION.md) · 🇲🇹 [mt](../../../mt/docs/ops/HOMOLOGATION.md) · 🇲🇲 [my](../../../my/docs/ops/HOMOLOGATION.md) · 🇳🇵 [ne](../../../ne/docs/ops/HOMOLOGATION.md) · 🇳🇱 [nl](../../../nl/docs/ops/HOMOLOGATION.md) · 🇳🇴 [no](../../../no/docs/ops/HOMOLOGATION.md) · 🇮🇳 [or](../../../or/docs/ops/HOMOLOGATION.md) · 🇮🇳 [pa](../../../pa/docs/ops/HOMOLOGATION.md) · 🇵🇭 [phi](../../../phi/docs/ops/HOMOLOGATION.md) · 🇵🇱 [pl](../../../pl/docs/ops/HOMOLOGATION.md) · 🇵🇹 [pt](../../../pt/docs/ops/HOMOLOGATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/HOMOLOGATION.md) · 🇷🇴 [ro](../../../ro/docs/ops/HOMOLOGATION.md) · 🇷🇺 [ru](../../../ru/docs/ops/HOMOLOGATION.md) · 🇱🇰 [si](../../../si/docs/ops/HOMOLOGATION.md) · 🇸🇰 [sk](../../../sk/docs/ops/HOMOLOGATION.md) · 🇸🇮 [sl](../../../sl/docs/ops/HOMOLOGATION.md) · 🇷🇸 [sr](../../../sr/docs/ops/HOMOLOGATION.md) · 🇸🇪 [sv](../../../sv/docs/ops/HOMOLOGATION.md) · 🇰🇪 [sw](../../../sw/docs/ops/HOMOLOGATION.md) · 🇮🇳 [ta](../../../ta/docs/ops/HOMOLOGATION.md) · 🇮🇳 [te](../../../te/docs/ops/HOMOLOGATION.md) · 🇹🇭 [th](../../../th/docs/ops/HOMOLOGATION.md) · 🇹🇷 [tr](../../../tr/docs/ops/HOMOLOGATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/HOMOLOGATION.md) · 🇵🇰 [ur](../../../ur/docs/ops/HOMOLOGATION.md) · 🇺🇿 [uz](../../../uz/docs/ops/HOMOLOGATION.md) · 🇻🇳 [vi](../../../vi/docs/ops/HOMOLOGATION.md) · 🇳🇬 [yo](../../../yo/docs/ops/HOMOLOGATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/HOMOLOGATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/HOMOLOGATION.md)

---

تحقق E2E في بيئة حقيقية من نشر OmniRoute العامل على خادم VPS الخاص ببيئة الاعتماد
(`HOMOLOG_BASE_URL`، مثل `http://192.168.0.15:20128`). يستبدل أمر واحد قائمة التحقق اليدوية
للإصدار عند نقطة التوقف رقم 2 بتشغيل آلي يُنتج أدلة.

## ما الذي يغطيه

| الطبقة                   | ما الذي يتحقق منه                                                                                                                                                                             | التنفيذ                                                                       |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| L0 — الصحة/التطابق       | تستجيب `/api/monitoring/health` بالحالة `200` مع `status: "healthy"` والإصدار المتوقع                                                                                                         | `scripts/homolog/lib/parity.mjs`                                              |
| L1a — مفتاح مؤقت         | تسجيل دخول المسؤول ← ينشئ `POST /api/keys` مفتاح API مقيّد النطاق للتشغيل، ويُلغى (`DELETE /api/keys/:id`) داخل كتلة `finally` بغض النظر عن النتيجة                                           | `scripts/homolog/lib/adminClient.mjs`                                         |
| L1b — واجهة API          | كتالوج `/v1/models`، وإكمال محادثة حقيقي غير متدفق (نموذج حرج للمستوى، `max_tokens: 5`)، واستجابة `401` لمفتاح غير صالح، و`/api/monitoring/health` العامة                                     | `tests/homolog/api/core.http` (httpYac)                                       |
| L1c — تدفق SSE           | إكمال محادثة حقيقي متدفق؛ يتحقق من `text/event-stream`، ومن وجود جزء محتوى واحد على الأقل، ومن علامة إنهاء `[DONE]`                                                                           | `scripts/homolog/lib/sseCheck.mjs`                                            |
| L2 — مزودون حقيقيون      | طلب محادثة واحد بأقل تكلفة لكل مزود حرج موجود في كتالوج `/v1/models` المباشر، ويُنشأ فورياً عبر promptfoo                                                                                     | `scripts/homolog/gen-promptfoo.mjs` + `scripts/homolog/lib/providerTiers.mjs` |
| L4a — مصادقة الواجهة     | يسجّل الدخول مرة واحدة عبر نموذج تسجيل الدخول الحقيقي ويعيد استخدام الجلسة (`storageState`) عبر طبقة الواجهة                                                                                  | `tests/homolog/ui/auth.setup.ts`                                              |
| L4b — مسارات الواجهة     | تُحمَّل كل صفحة `page.tsx` ثابتة ضمن `src/app/(dashboard)/dashboard` (تُكتشف من نظام الملفات، مع تخطي المسارات الديناميكية `[param]`) دون خطأ HTTP أو خطأ في الصفحة أو تفعيل حد أخطاء Next.js | `tests/homolog/ui/routes.spec.ts`                                             |
| L4c — تدفق الواجهة الحرج | ينشئ مفتاح API عبر واجهة لوحة المعلومات ثم يلغيه مجدداً (من دون ترك أي بقايا على خادم VPS)                                                                                                    | `tests/homolog/ui/api-key-flow.spec.ts`                                       |
| L5 — تقرير موحد          | يدمج httpYac (عبر `junit-to-ctrf`) ومحوّل promptfoo→CTRF ومُبلّغ Playwright CTRF في ملف `homolog-ctrf.json` واحد، بالإضافة إلى `homolog-report/summary.md` المقروء للبشر                      | `scripts/homolog/run.mjs`                                                     |

لا يوجد أي تدخل من نماذج LLM في إعادة التشغيل نفسها — فهذه حزمة اختبارات انحدار حتمية،
وليست عملية تقييم. لا يدخل الذكاء الاصطناعي إلا في أعمال الصيانة المستقبلية (راجع خارطة الطريق أدناه).

## المتطلبات الأساسية

1. انسخ `.env.homolog.example` إلى `.env.homolog` (متجاهَل بواسطة git — لا تُدرجه مطلقًا في أي commit) واملأ ما يلي:
   - `HOMOLOG_BASE_URL` — النشر المستهدف، مثل `http://192.168.0.15:20128`.
   - `HOMOLOG_ADMIN_PASSWORD` — كلمة مرور إدارة لوحة المعلومات لذلك النشر.
   - `HOMOLOG_CRITICAL_PROVIDERS` — بادئات المزوّدين المفصولة بفواصل والتي تتلقى طلب
     محادثة تجريبيًا حقيقيًا (مثل `openai,anthropic,gemini,codex,grok,glm,deepseek,openrouter`).
   - `HOMOLOG_API_KEY` — اتركه فارغًا في عمليات التشغيل العادية؛ تنشئ الحزمة مفتاحًا
     مؤقتًا خاصًا بها ثم تلغيه. عيّن هذا فقط لتصحيح أخطاء طبقة واحدة بمعزل عن غيرها.
2. نفّذ `npm install` في المستودع (تبعيات الحزمة — `httpyac` و`promptfoo` و
   `playwright-ctrf-json-reporter` و`junit-to-ctrf` و`ctrf` — هي devDependencies عادية).
3. نفّذ `npx playwright install` إذا لم تكن ملفات المتصفح الثنائية موجودة بالفعل.

## كيفية التشغيل

```bash
npm run homolog
```

للتحقق من نشر لا يتطابق إصداره مع `package.json` المحلي
(مثل بيئة اعتماد لا تزال تستخدم إصدار تصحيح سابقًا)، تجاوز الإصدار المتوقع
صراحةً:

```bash
HOMOLOG_EXPECT_VERSION=3.8.47 npm run homolog
```

تنتهي عملية التشغيل برمز غير صفري إذا فشلت أي طبقة، وتحاول دائمًا إلغاء المفتاح المؤقت
الذي أنشأته، حتى عند الفشل (كتلة `finally` في `scripts/homolog/run.mjs`).

## قراءة التقرير

تُحفظ جميع المخرجات في `homolog-report/` (متجاهَل بواسطة git):

- `summary.md` — الجدول نفسه المطبوع إلى stdout، بصف واحد لكل طبقة (✅/❌ + التفاصيل).
- `homolog-ctrf.json` — تقرير CTRF الموحّد (دمج نتائج API/SSE وفحص المزوّدين التجريبي
  وواجهة المستخدم) — وهذا هو العنصر الذي يجب إرفاقه بقائمة تحقق STOP #2 الخاصة بالإصدار.
- `httpyac-junit.xml` و`api-ctrf.json` و`providers-ctrf.json` و`ui-ctrf.json` — التقارير
  الأولية/الوسيطة لكل طبقة.
- `promptfooconfig.yaml` و`provider-misses.json` — إعداد promptfoo المُنشأ لعملية
  التشغيل الحالية وأي مزوّدين مهمين كانوا مفقودين من الكتالوج الفعلي.

يؤدي فشل L0 إلى الإنهاء فورًا (من دون إنشاء مفتاح مؤقت)، لأن عدم تطابق الإصدار/الحالة
يعني أن كل طبقة لاحقة ستتحقق من النشر الخطأ.

## إعادة ضبط الخط الأساسي عند إجراء تغييرات مشروعة على واجهة المستخدم

تُشغَّل L4b (الفحص التجريبي للمسارات) وL4c (تدفق واجهة مستخدم مفتاح API) بواسطة محددات DOM حقيقية، وليس
لقطات، ولذلك لا تتطلب معظم تغييرات واجهة المستخدم المشروعة أي تحديث للحزمة. عندما يؤدي تغيير
إلى تعطيل محدد (مثل إعادة تسمية تسمية زر أو نقل صفحة إعدادات):

1. أعد التحقق من المحدد بمقارنته مع المصدر الحالي (توثّق المواصفات بالفعل
   الملف/السطر الذي تم التحقق من كل محدد بالاستناد إليه — اتبع النمط نفسه، ولا تخمّن).
2. حدّث المواصفة في `tests/homolog/ui/`.
3. أعد تشغيل `npm run homolog` (أو مواصفة Playwright المتأثرة فقط) مقابل VPS
   لتأكيد الإصلاح، ثم أنشئ commit.

لا يوجد خط أساس مرئي/على مستوى البكسل في هذه الحزمة (F1) — راجع خريطة الطريق لمعرفة المزيد.

## خريطة الطريق (F2 / F3)

يتوفر التصميم وخطة الطرح المرحلي في مواصفة التخطيط الداخلية
`_tasks/superpowers/specs/2026-07-13-homolog-e2e-suite-design.md` (غير مرتبطة — عنصر داخلي
ضمن `_tasks/`، وليس جزءًا من وثائق هذا المستودع المتتبعة). الملخص:

- **F2** — تسجيل تفصيلي كامل → تحوّله Playwright Test Agents (`planner`/`generator`)
  إلى مواصفات تدفق (إنشاء مجموعة، واختبار مزوّد، وتعديل الإعدادات، وأدوات MCP) +
  خط أساس للانحدار المرئي (Lost Pixel) مع أقنعة فوق البيانات الديناميكية (المقاييس
  والطوابع الزمنية والسجلات) + روتين صيانة `healer` لكل إصدار.
- **F3** — تغطية المرونة/العقود/التوصيلات: toxiproxy + مزوّد وهمي متوافق مع OpenAI
  على devbox، ومجموعة `homolog-resilience` على VPS تشير إليه
  (مهلة زمنية مُحقنة → تأكيد الرجوع الاحتياطي + فتح/إغلاق قاطع الدائرة عبر
  `/api/monitoring/health`)؛ واختبار عقود Schemathesis المقيّد مقابل
  `docs/openapi.yaml` (قيمة منخفضة لـ`--max-examples`، وبذور ثابتة، ونقاط نهاية غير خاصة بـLLM فقط)؛
  وتوصيل `npm run homolog` وملف `summary.md` الخاص به بمرحلة STOP #2 في `/generate-release`.
