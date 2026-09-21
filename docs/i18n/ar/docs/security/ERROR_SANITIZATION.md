# Error Message Sanitization (العربية)

🌐 **Languages:** 🇺🇸 [English](../../../../security/ERROR_SANITIZATION.md) · 🇪🇹 [am](../../../am/docs/security/ERROR_SANITIZATION.md) · 🇦🇿 [az](../../../az/docs/security/ERROR_SANITIZATION.md) · 🇧🇬 [bg](../../../bg/docs/security/ERROR_SANITIZATION.md) · 🇧🇩 [bn](../../../bn/docs/security/ERROR_SANITIZATION.md) · 🇨🇿 [cs](../../../cs/docs/security/ERROR_SANITIZATION.md) · 🇩🇰 [da](../../../da/docs/security/ERROR_SANITIZATION.md) · 🇩🇪 [de](../../../de/docs/security/ERROR_SANITIZATION.md) · 🇬🇷 [el](../../../el/docs/security/ERROR_SANITIZATION.md) · 🇪🇸 [es](../../../es/docs/security/ERROR_SANITIZATION.md) · 🇪🇪 [et](../../../et/docs/security/ERROR_SANITIZATION.md) · 🇮🇷 [fa](../../../fa/docs/security/ERROR_SANITIZATION.md) · 🇫🇮 [fi](../../../fi/docs/security/ERROR_SANITIZATION.md) · 🇫🇷 [fr](../../../fr/docs/security/ERROR_SANITIZATION.md) · 🇮🇪 [ga](../../../ga/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [gu](../../../gu/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [ha](../../../ha/docs/security/ERROR_SANITIZATION.md) · 🇮🇱 [he](../../../he/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [hi](../../../hi/docs/security/ERROR_SANITIZATION.md) · 🇭🇷 [hr](../../../hr/docs/security/ERROR_SANITIZATION.md) · 🇭🇺 [hu](../../../hu/docs/security/ERROR_SANITIZATION.md) · 🇦🇲 [hy](../../../hy/docs/security/ERROR_SANITIZATION.md) · 🇮🇩 [id](../../../id/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [ig](../../../ig/docs/security/ERROR_SANITIZATION.md) · 🇮🇹 [it](../../../it/docs/security/ERROR_SANITIZATION.md) · 🇯🇵 [ja](../../../ja/docs/security/ERROR_SANITIZATION.md) · 🇬🇪 [ka](../../../ka/docs/security/ERROR_SANITIZATION.md) · 🇰🇭 [km](../../../km/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [kn](../../../kn/docs/security/ERROR_SANITIZATION.md) · 🇰🇷 [ko](../../../ko/docs/security/ERROR_SANITIZATION.md) · 🇱🇹 [lt](../../../lt/docs/security/ERROR_SANITIZATION.md) · 🇱🇻 [lv](../../../lv/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [ml](../../../ml/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [mr](../../../mr/docs/security/ERROR_SANITIZATION.md) · 🇲🇾 [ms](../../../ms/docs/security/ERROR_SANITIZATION.md) · 🇲🇹 [mt](../../../mt/docs/security/ERROR_SANITIZATION.md) · 🇲🇲 [my](../../../my/docs/security/ERROR_SANITIZATION.md) · 🇳🇵 [ne](../../../ne/docs/security/ERROR_SANITIZATION.md) · 🇳🇱 [nl](../../../nl/docs/security/ERROR_SANITIZATION.md) · 🇳🇴 [no](../../../no/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [or](../../../or/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [pa](../../../pa/docs/security/ERROR_SANITIZATION.md) · 🇵🇭 [phi](../../../phi/docs/security/ERROR_SANITIZATION.md) · 🇵🇱 [pl](../../../pl/docs/security/ERROR_SANITIZATION.md) · 🇵🇹 [pt](../../../pt/docs/security/ERROR_SANITIZATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/ERROR_SANITIZATION.md) · 🇷🇴 [ro](../../../ro/docs/security/ERROR_SANITIZATION.md) · 🇷🇺 [ru](../../../ru/docs/security/ERROR_SANITIZATION.md) · 🇱🇰 [si](../../../si/docs/security/ERROR_SANITIZATION.md) · 🇸🇰 [sk](../../../sk/docs/security/ERROR_SANITIZATION.md) · 🇸🇮 [sl](../../../sl/docs/security/ERROR_SANITIZATION.md) · 🇷🇸 [sr](../../../sr/docs/security/ERROR_SANITIZATION.md) · 🇸🇪 [sv](../../../sv/docs/security/ERROR_SANITIZATION.md) · 🇰🇪 [sw](../../../sw/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [ta](../../../ta/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [te](../../../te/docs/security/ERROR_SANITIZATION.md) · 🇹🇭 [th](../../../th/docs/security/ERROR_SANITIZATION.md) · 🇹🇷 [tr](../../../tr/docs/security/ERROR_SANITIZATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/ERROR_SANITIZATION.md) · 🇵🇰 [ur](../../../ur/docs/security/ERROR_SANITIZATION.md) · 🇺🇿 [uz](../../../uz/docs/security/ERROR_SANITIZATION.md) · 🇻🇳 [vi](../../../vi/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [yo](../../../yo/docs/security/ERROR_SANITIZATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/ERROR_SANITIZATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/ERROR_SANITIZATION.md)

---

> **مصدر الحقيقة:** `open-sse/utils/errorSanitization.ts`،
> و`open-sse/utils/errorPathRedaction.ts`، وأدوات البناء العامة في `open-sse/utils/error.ts`
> **الاختبارات:** `tests/unit/error-message-sanitization.test.ts`،
> `tests/unit/error-public-boundaries-hardening.test.ts`
> **آخر تحديث:** 2026-09-02 — v3.8.51
> **الجمهور المستهدف:** أي مهندس يتعامل مع استجابات الأخطاء (مسارات HTTP، وتدفقات SSE، والمنفّذات، ومعالجات MCP).
> **الحالة:** **إلزامي** لكل مسار برمجي يعيد رسالة خطأ إلى العميل.

## سبب وجود هذا

تضع قاعدة CodeQL المسماة `js/stack-trace-exposure` ‏(CWE-209) علامة على أي مسار برمجي تصل عبره رسالة خطأ ناشئة عن استثناء في وقت التشغيل إلى استجابة HTTP / SSE من دون تنقيتها. تمنح تتبعات المكدس ومسارات الملفات المطلقة في استجابات بيئة الإنتاج المهاجمين:

- بنية المجلدات الداخلية (`/srv/app/src/lib/...`) ← استطلاعًا لشن هجمات إضافية.
- إصدارات المكتبات / أطر العمل المستنتجة من إطارات المكدس ← اختيارًا موجّهًا للثغرات المستغلة.
- قيمًا حساسة لوقت التشغيل ربما أُدرجت في الأخطاء بواسطة استيفاء السلاسل النصية (استعلامات DB، وقيم الإعدادات).

تزيل الدالة المساعدة `sanitizeErrorMessage` التي يصدّرها `open-sse/utils/error.ts` هذه الفئات من
التسريب:

1. ذيول إطارات مكدس JavaScript الفعلية والمتسلسلة والمضمّنة بوضوح.
2. مسارات نظام الملفات المطلقة بصيغ POSIX وWindows وUNC و`file://`، مع الحفاظ على عناوين URL الآمنة التي تستخدم HTTPS
   ومسارات API المعلَّمة صراحةً.
3. إسنادات بيانات الاعتماد، وتنسيقات رموز المزوّدين الشائعة، وكتل PEM للمفاتيح الخاصة، وعناوين URL للبيانات المشفّرة بصيغة base64.

تضع أداة التنقية حدًا أقصى لطول الإدخال، وتغلق بأمان عندما ترفض قيمة مطروحة التحويل إلى سلسلة نصية.
كما تُسقط التنقية العودية لبيانات JSON الواردة من المصدر مفاتيح بيانات الاعتماد/المسارات غير الآمنة، والأسماء البديلة للجلسات،
ومفاتيح التحكم في النماذج الأولية قبل إجراء تسلسل للاستجابة.

## النمط الإلزامي

### 1. إنشاء استجابة خطأ (مسارات HTTP / API)

استخدم `buildErrorBody()` — التنقية مضمّنة:

```ts
import { buildErrorBody } from "@omniroute/open-sse/utils/error.ts";

export async function POST(req: Request) {
  try {
    // ... منطق المعالج ...
  } catch (err) {
    return new Response(JSON.stringify(buildErrorBody(500, String(err))), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
```

أو استخدم الأغلفة الملائمة الموجودة في الوحدة نفسها:

```ts
import {
  errorResponse, // كائن Response للاستخدام مرة واحدة
  writeStreamError, // كاتب SSE
  createErrorResult, // بنية { success: false, status, response, ... }
  unavailableResponse, // يضيف Retry-After
  providerCircuitOpenResponse,
  modelCooldownResponse,
} from "@omniroute/open-sse/utils/error.ts";
```

تطبّق جميعها الحدّ القياسي للأخطاء العامة. تمرّر `errorResponse` و`writeStreamError`
و`createErrorResult` البيانات عبر `buildErrorBody`؛ بينما تعرض الأدوات المساعدة المتخصصة الثلاث لإعادة المحاولة/قاطع الدائرة
سياقها العام وتنقّيه مباشرةً. **لن تحتاج أبدًا إلى استدعاء
`sanitizeErrorMessage` يدويًا** عند استخدام هذه الأدوات المساعدة.

### 2. أغلفة الأخطاء المخصصة (نادرًا)

عندما يتعذر استخدام الأدوات المساعدة أعلاه (مثلًا عندما يفرض بروتوكول مصدر مثل Connect-RPC بنية الاستجابة)، استورد `sanitizeErrorMessage` مباشرةً:

```ts
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error.ts";

const body = JSON.stringify({
  error: {
    message: sanitizeErrorMessage(rawMessage),
    type: "invalid_request_error",
    code: "",
  },
});
```

هذه هي الطريقة الوحيدة المعتمدة لإنشاء جسم خطأ مخصص. راجع `open-sse/executors/cursor.ts::buildErrorResponse` للاطلاع على التطبيق المرجعي.

### 3. التسجيل مقابل الاستجابة

يمكن أن تحتفظ الاستثناءات الداخلية الموثوقة برسالتها وتتبع المكدس كاملين كي يتمكن المشغّلون من تصحيح الأخطاء. أما القيم
الناشئة عند حدود المزوّد أو التحقق أو جلسة المتصفح أو المواضع المجاورة لبيانات الاعتماد، فيجب
تنقيتها قبل إدخالها في مخرجات وحدة التحكم أو بيانات تعريف التدقيق أو سجلات الاستدعاءات الدائمة. النمط:

```ts
try {
  // ...
} catch (err) {
  log.error({ err }, "handler failed"); // استثناء داخلي موثوق فقط
  return errorResponse(500, getErrorMessage(err)); // منقّى — يُرسل إلى العميل
}
```

بالنسبة إلى حالات الفشل التي يتحكم فيها المزوّد، اعرض القيمة المسجّلة أيضًا:

```ts
log.error({ message: sanitizeErrorMessage(err) || "Provider request failed" });
```

### 4. الأنماط المحظورة

❌ **لا تضع أبدًا** مخرجات الاستثناء الخام في جسم Response:

```ts
// سيئ: يصل تتبع المكدس + مسارات الملفات إلى العميل
return new Response(JSON.stringify({ error: { message: err.stack || err.message } }), {
  status: 500,
});
```

❌ **لا تنشئ أبدًا** أداة خاصة بك لتقسيم السطر الأول:

```ts
// سيئ: لا يزيل المسارات المطلقة، وقد ينحرف عن الأداة المساعدة القياسية
const safe = String(err).split("\n")[0];
```

❌ **لا تجرِ التنقية أبدًا** في المسار ثم تنسَ مسار SSE. يجب أن يمر أي شيء يكتب إلى تدفق عبر `writeStreamError` (أو `buildErrorBody` الأساسي الخاص به).

❌ **لا تُضمّن أبدًا** `process.cwd()` أو `__filename` أو `__dirname` أو المسارات المشتقة من متغيرات البيئة عمدًا
في رسائل الخطأ. تتعامل أداة التنقية مع المسارات المطلقة بوصف ذلك دفاعًا متعدد الطبقات، لكن يجب ألّا
تنشئ الجهات المستدعية رسائل تكشف بنية النظام من الأساس.

## التغطية في CI

يفرض `tests/unit/error-message-sanitization.test.ts` ما يلي:

- يعيد كل مسار ضمن `/api/model-combo-mappings/*` أجسام استجابة منقّحة عند أخطاء 4xx/5xx.
- تزيل `sanitizeErrorMessage` تتبعات المكدس متعددة الأسطر.
- تستبدل `sanitizeErrorMessage` المسارات المطلقة في POSIX وWindows بالقيمة `<path>`.
- تتعامل `sanitizeErrorMessage` بأمان مع مدخلات `null` و`undefined` ومثيلات `Error`.
- لا تكشف `buildErrorBody` أبدًا تتبعات المكدس في حقل `message` الخاص بها.

عند إضافة مسار أو منفّذ جديد، انسخ نمط التحقق من هذا الملف. تفرض بوابة التغطية (`npm run test:coverage`) تغطية بنسبة ≥60% للتعليمات/الأسطر/الدوال/الفروع — ويجب تغطية مسارات الأخطاء.

## الضوابط ذات الصلة

- يجب دائمًا **إما** إصلاح تنبيهات CodeQL الخاصة بـ`js/stack-trace-exposure` في `.github/security` باستخدام هذه الأدوات المساعدة، **أو** رفضها مع تعليق يشير إلى هذا المستند.
- تتعامل تهيئة التنقيح في `pino`‏ (`src/shared/utils/logRedaction.ts`) مع السجلات المهيكلة الموثوقة
  بشكل منفصل. يغطي هذا المستند رسائل الاستجابة العامة والقيم التي يتحكم فيها المزوّد والتي
  تعبر حدود الاستدعاءات الدائمة/سجلات الوكيل.
- تغطي قائمة حظر ترويسات المصدر (`src/shared/constants/upstreamHeaders.ts`) تسرّب الترويسات — حافظ على اتساق الملفين عند إضافة مصدر قلق جديد متعلق باستخراج البيانات.

## تمرير تفاصيل المصدر

تقبل `buildErrorBody` وسيطة ثالثة اختيارية باسم `upstreamDetails` (الجسم الخام
المحلل من المزوّد المصدر). عند توفيرها، تُنقّح بواسطة
`sanitizeUpstreamDetails` قبل تضمينها في الاستجابة باسم `upstream_details`.

تقبل وسيطة رابعة اختيارية باسم `classification`
‏(`{ type?: string; code?: string; reason?: string }`) تصنيفًا عامًا صريحًا.
يُسقط كل حقل على مفردات المعرّفات العامة المحدودة. تعود القيم غير الآمنة، أو التي تشبه بيانات الاعتماد،
أو التي تحتوي على محارف تحكم، أو المفرطة في الطول إلى النوع/الرمز المشتق من الحالة؛ ويُحذف
السبب الاختياري غير الآمن. تظل معرّفات حالة HTTP المكوّنة من ثلاثة أرقام (`100` إلى `599`) صالحة
لعقود المزوّد التي تعرض حالة المصدر الرقمية كرمز قابل للقراءة آليًا. ويُقبل النطاق المحدود نفسه
في صيغة العنصر النائب لحالة HTTP المُنشأة محليًا؛ بينما تظل أرقام المزوّد وأسماؤه الاعتباطية
خارج نطاق المفردات.

مرّر كل تصنيف صريح في تلك الوسيطة الرابعة. لا تستبدل أبدًا
`body.error.code` أو `body.error.type` أو `body.error.reason` بعد أن تعيد `buildErrorBody()` نتيجتها؛
فالتعديل بعد الإنشاء يتجاوز الإسقاط العام.

قواعد التنقيح المطبقة على `upstreamDetails`:

1. القيم النصية الطرفية: تُمرر عبر `sanitizeErrorMessage` (لإزالة تتبعات المكدس والمسارات المطلقة).
2. تُزال مفاتيح المسارات غير الآمنة وبيانات الاعتماد وأسماء الجلسات المستعارة والتحكم في النماذج الأولية.
3. حد العمق: يُستبدل التداخل الذي يتجاوز 4 مستويات بالسلسلة النصية `"[truncated]"`.
4. تُحد المصفوفات إلى 32 عنصرًا.

يجب ألا تمرر `upstreamDetails` إلا مواضع الاستدعاء التي لديها جسم خطأ محلل من المزوّد. يجب ألا تتضمنها أخطاء OmniRoute
الداخلية (فشل تحليل SSE، أو المحتوى الفارغ، أو حظر حواجز الحماية).

لا تمرر `err.stack` أو `err.message` الخام، أو أي سلسلة نصية من استثناء وقت التشغيل، إلى
`upstreamDetails`. يجب أن تمر هذه القيم عبر `errorResponse` / `buildErrorBody(code, msg)`
من دون جسم مصدر.

يحافظ التمرير الانتقائي لأخطاء 4xx من المصدر على بنية JSON الآمنة الخاصة بالمزوّد وصياغتها المطلوبة
للاسترداد التلقائي من جانب العميل، لكنه ليس تمريرًا مطابقًا على مستوى البايتات: يعمل المنقّح التكراري دائمًا
قبل التسلسل. تُرفض بشكل آمن الأجسام الدورية، أو التي تحتوي على BigInt، أو التي تتضمن `toJSON()` عدائيًا،
ولا تكون مؤهلة للتمرير. يطبق OCR والإشراف القاعدة نفسها؛ وتُحوّل أجسام المصدر غير التابعة لـJSON، أو الفارغة،
أو ذات النوع المُسمّى بشكل خاطئ إلى غلاف خطأ JSON القياسي الخاص بـOmniRoute.

## قصور معروف في CodeQL: عدم التعرّف على أدوات التنقية المخصّصة

يستخدم استعلام CodeQL‏ [`js/stack-trace-exposure`](https://codeql.github.com/codeql-query-help/javascript/js-stack-trace-exposure/) قائمة سماح ثابتة لأنماط أدوات التنقية (مثل استخدام `.split("\n")[0]` مضمّنًا، و`String#replace` مع أشكال محددة من التعبيرات النمطية، والوصول إلى `.message` في `Error`). وهو **لا** يتعرّف على الاستدعاء غير المباشر عبر دالة مساعدة مخصّصة مثل `sanitizeErrorMessage()` لدينا.

يعني ذلك أن مواضع الاستدعاء التي تنفّذ التنقية بشكل مُثبت عبر هذه الوحدة — مثل `open-sse/utils/error.ts::errorResponse` و`open-sse/executors/cursor.ts::buildErrorResponse` — قد تستمر في إطلاق التنبيه رغم أن الشيفرة آمنة وظيفيًا. حالات الاستبعاد السابقة: `#224` و`#231` (مايو 2026)، وقد وُسمت كلتاهما بأنها `false positive` مع تقديم مبررات تقنية.

**كيفية التعامل مع حالة جديدة:**

1. تأكّد من أن موضع الاستدعاء يمرّر الرسالة فعليًا عبر `sanitizeErrorMessage` / `buildErrorBody` / إحدى الدوال المغلّفة الموثّقة أعلاه (اقرأ سلسلة الاستدعاءات كاملةً من بدايتها إلى نهايتها — ولا تثق بمجرد تعليق).
2. تأكّد من أن `tests/unit/error-message-sanitization.test.ts` يختبر هذا المسار (أو أضف تغطية اختبارية).
3. استبعد التنبيه عبر `gh api ... -X PATCH state=dismissed -f 'dismissed_reason=false positive'` مع الإشارة إلى هذا المستند.
4. **لا** تحاول «الإصلاح» عبر تضمين `.split("\n")[0]` في كل موضع — فالدالة المساعدة هي المصدر الوحيد للحقيقة؛ وتكرار النمط يُضعف أداة التنقية (إذ يفقد تنقية المسارات، والحد الأقصى للطول، وتحويل النوع) فقط لإعطاء انطباع بإرضاء أداة الفحص.

إن اعتماد ميزات اختيارية مثل إعداد أداة التنقية المخصّصة [`@codeql/javascript-models`](https://codeql.github.com/docs/codeql-language-guides/customizing-library-models-for-javascript/) في CodeQL هو الحل طويل الأمد؛ وهو خارج نطاق هذا المستند.

## المراجع

- [CWE-209: كشف المعلومات من خلال رسالة خطأ](https://cwe.mitre.org/data/definitions/209.html)
- [CodeQL `js/stack-trace-exposure`](https://codeql.github.com/codeql-query-help/javascript/js-stack-trace-exposure/)
- [OWASP: ورقة مرجعية لمعالجة الأخطاء](https://cheatsheetseries.owasp.org/cheatsheets/Error_Handling_Cheat_Sheet.html)
- الالتزام الذي جعل الدالة المساعدة مركزية: `1a39c31f` — _fix(security): إخفاء بيانات اعتماد المصادر العلوية العامة + جعل تنقية الأخطاء مركزية_
