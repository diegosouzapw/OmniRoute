# Error Message Sanitization (فارسی)

🌐 **Languages:** 🇺🇸 [English](../../../../security/ERROR_SANITIZATION.md) · 🇪🇹 [am](../../../am/docs/security/ERROR_SANITIZATION.md) · 🇸🇦 [ar](../../../ar/docs/security/ERROR_SANITIZATION.md) · 🇦🇿 [az](../../../az/docs/security/ERROR_SANITIZATION.md) · 🇧🇬 [bg](../../../bg/docs/security/ERROR_SANITIZATION.md) · 🇧🇩 [bn](../../../bn/docs/security/ERROR_SANITIZATION.md) · 🇨🇿 [cs](../../../cs/docs/security/ERROR_SANITIZATION.md) · 🇩🇰 [da](../../../da/docs/security/ERROR_SANITIZATION.md) · 🇩🇪 [de](../../../de/docs/security/ERROR_SANITIZATION.md) · 🇬🇷 [el](../../../el/docs/security/ERROR_SANITIZATION.md) · 🇪🇸 [es](../../../es/docs/security/ERROR_SANITIZATION.md) · 🇪🇪 [et](../../../et/docs/security/ERROR_SANITIZATION.md) · 🇫🇮 [fi](../../../fi/docs/security/ERROR_SANITIZATION.md) · 🇫🇷 [fr](../../../fr/docs/security/ERROR_SANITIZATION.md) · 🇮🇪 [ga](../../../ga/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [gu](../../../gu/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [ha](../../../ha/docs/security/ERROR_SANITIZATION.md) · 🇮🇱 [he](../../../he/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [hi](../../../hi/docs/security/ERROR_SANITIZATION.md) · 🇭🇷 [hr](../../../hr/docs/security/ERROR_SANITIZATION.md) · 🇭🇺 [hu](../../../hu/docs/security/ERROR_SANITIZATION.md) · 🇦🇲 [hy](../../../hy/docs/security/ERROR_SANITIZATION.md) · 🇮🇩 [id](../../../id/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [ig](../../../ig/docs/security/ERROR_SANITIZATION.md) · 🇮🇹 [it](../../../it/docs/security/ERROR_SANITIZATION.md) · 🇯🇵 [ja](../../../ja/docs/security/ERROR_SANITIZATION.md) · 🇬🇪 [ka](../../../ka/docs/security/ERROR_SANITIZATION.md) · 🇰🇭 [km](../../../km/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [kn](../../../kn/docs/security/ERROR_SANITIZATION.md) · 🇰🇷 [ko](../../../ko/docs/security/ERROR_SANITIZATION.md) · 🇱🇹 [lt](../../../lt/docs/security/ERROR_SANITIZATION.md) · 🇱🇻 [lv](../../../lv/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [ml](../../../ml/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [mr](../../../mr/docs/security/ERROR_SANITIZATION.md) · 🇲🇾 [ms](../../../ms/docs/security/ERROR_SANITIZATION.md) · 🇲🇹 [mt](../../../mt/docs/security/ERROR_SANITIZATION.md) · 🇲🇲 [my](../../../my/docs/security/ERROR_SANITIZATION.md) · 🇳🇵 [ne](../../../ne/docs/security/ERROR_SANITIZATION.md) · 🇳🇱 [nl](../../../nl/docs/security/ERROR_SANITIZATION.md) · 🇳🇴 [no](../../../no/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [or](../../../or/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [pa](../../../pa/docs/security/ERROR_SANITIZATION.md) · 🇵🇭 [phi](../../../phi/docs/security/ERROR_SANITIZATION.md) · 🇵🇱 [pl](../../../pl/docs/security/ERROR_SANITIZATION.md) · 🇵🇹 [pt](../../../pt/docs/security/ERROR_SANITIZATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/ERROR_SANITIZATION.md) · 🇷🇴 [ro](../../../ro/docs/security/ERROR_SANITIZATION.md) · 🇷🇺 [ru](../../../ru/docs/security/ERROR_SANITIZATION.md) · 🇱🇰 [si](../../../si/docs/security/ERROR_SANITIZATION.md) · 🇸🇰 [sk](../../../sk/docs/security/ERROR_SANITIZATION.md) · 🇸🇮 [sl](../../../sl/docs/security/ERROR_SANITIZATION.md) · 🇷🇸 [sr](../../../sr/docs/security/ERROR_SANITIZATION.md) · 🇸🇪 [sv](../../../sv/docs/security/ERROR_SANITIZATION.md) · 🇰🇪 [sw](../../../sw/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [ta](../../../ta/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [te](../../../te/docs/security/ERROR_SANITIZATION.md) · 🇹🇭 [th](../../../th/docs/security/ERROR_SANITIZATION.md) · 🇹🇷 [tr](../../../tr/docs/security/ERROR_SANITIZATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/ERROR_SANITIZATION.md) · 🇵🇰 [ur](../../../ur/docs/security/ERROR_SANITIZATION.md) · 🇺🇿 [uz](../../../uz/docs/security/ERROR_SANITIZATION.md) · 🇻🇳 [vi](../../../vi/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [yo](../../../yo/docs/security/ERROR_SANITIZATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/ERROR_SANITIZATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/ERROR_SANITIZATION.md)

---

> **منبع حقیقت:** `open-sse/utils/errorSanitization.ts`،
> `open-sse/utils/errorPathRedaction.ts` و سازندههای عمومی در `open-sse/utils/error.ts`
> **آزمونها:** `tests/unit/error-message-sanitization.test.ts`،
> `tests/unit/error-public-boundaries-hardening.test.ts`
> **آخرین بهروزرسانی:** 2026-09-02 — v3.8.51
> **مخاطبان:** هر مهندسی که با پاسخهای خطا سروکار دارد (مسیرهای HTTP، جریانهای SSE، اجراکنندهها، کنترلکنندههای MCP).
> **وضعیت:** برای هر مسیر کدی که پیام خطا را به کلاینت بازمیگرداند، **الزامی** است.

## دلیل وجود این سند

قاعدهٔ `js/stack-trace-exposure` در CodeQL‏ (CWE-209) هر مسیر کدی را علامتگذاری میکند که در آن پیام خطای ناشی از یک استثنای زمان اجرا، بدون پاکسازی به پاسخ HTTP / SSE میرسد. ردگیریهای پشته و مسیرهای مطلق فایل در پاسخهای محیط عملیاتی، اطلاعات زیر را در اختیار مهاجمان قرار میدهند:

- ساختار داخلی دایرکتوریها (`/srv/app/src/lib/...`) ← شناسایی اولیه برای حملات بعدی.
- نسخههای کتابخانه / فریمورک که از فریمهای پشته استنباط میشوند ← انتخاب هدفمند اکسپلویت.
- مقادیر حساس زمان اجرا که ممکن است بهصورت درونیابی رشتهای در خطاها قرار گرفته باشند (کوئریهای DB، مقادیر پیکربندی).

تابع کمکی `sanitizeErrorMessage` که توسط `open-sse/utils/error.ts` صادر میشود، این دستههای نشت اطلاعات را حذف میکند:

1. دنبالههای فریم پشتهٔ JavaScript که فیزیکی، سریالشده یا بهوضوح درونخطی هستند.
2. مسیرهای مطلق فایلسیستم در قالبهای POSIX، Windows، UNC و `file://`، درحالیکه URLهای امن HTTPS و مسیرهای API که صراحتاً علامتگذاری شدهاند حفظ میشوند.
3. انتسابهای اطلاعات احراز هویت، قالبهای رایج توکن ارائهدهندگان، بلوکهای PEM کلید خصوصی و URLهای دادهٔ base64.

پاکساز، طول ورودی را محدود میکند و هنگامی که یک مقدار پرتابشده تبدیل به رشته را رد میکند، با رویکرد بسته و امن شکست میخورد.
پاکسازی بازگشتی JSON بالادستی همچنین کلیدهای ناامن مربوط به اطلاعات احراز هویت/مسیر، نامهای مستعار نشست و کلیدهای کنترل prototype را پیش از سریالسازی پاسخ حذف میکند.

## الگوی الزامی

### 1. ساخت پاسخ خطا (مسیرهای HTTP / API)

از `buildErrorBody()` استفاده کنید — پاکسازی درون آن تعبیه شده است:

```ts
import { buildErrorBody } from "@omniroute/open-sse/utils/error.ts";

export async function POST(req: Request) {
  try {
    // ... منطق کنترلکننده ...
  } catch (err) {
    return new Response(JSON.stringify(buildErrorBody(500, String(err))), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
```

یا از پوششدهندههای سادهساز در همان ماژول استفاده کنید:

```ts
import {
  errorResponse, // شیء Response یکمرحلهای
  writeStreamError, // نویسندهٔ SSE
  createErrorResult, // ساختار { success: false, status, response, ... }
  unavailableResponse, // Retry-After را اضافه میکند
  providerCircuitOpenResponse,
  modelCooldownResponse,
} from "@omniroute/open-sse/utils/error.ts";
```

همهٔ این موارد، مرز استاندارد خطای عمومی را اعمال میکنند. `errorResponse`، `writeStreamError` و
`createErrorResult` از مسیر `buildErrorBody` عبور میکنند؛ سه تابع کمکی تخصصی مربوط به تلاش مجدد/مدار، زمینهٔ عمومی خود را مستقیماً فرافکنی و پاکسازی میکنند. هنگام استفاده از این توابع کمکی، **هرگز نیازی نیست `sanitizeErrorMessage` را بهصورت دستی فراخوانی کنید**.

### 2. پوششهای سفارشی خطا (بهندرت)

هنگامی که نمیتوانید از توابع کمکی بالا استفاده کنید (برای مثال، وقتی ساختار پاسخ توسط یک پروتکل بالادستی مانند Connect-RPC تعیین شده است)، `sanitizeErrorMessage` را مستقیماً وارد کنید:

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

این تنها روش مجاز برای ساخت بدنهٔ سفارشی خطا است. برای پیادهسازی مرجع، به `open-sse/executors/cursor.ts::buildErrorResponse` مراجعه کنید.

### 3. ثبت لاگ در برابر ارسال پاسخ

استثناهای داخلی مورداعتماد میتوانند پیام و پشتهٔ کامل خود را حفظ کنند تا اپراتورها بتوانند اشکالزدایی کنند. مقادیری که از مرزهای مربوط به ارائهدهنده، اعتبارسنجی، نشست مرورگر یا اطلاعات احراز هویت منشأ میگیرند، باید پیش از ورود به خروجی کنسول، فرادادهٔ ممیزی یا لاگهای ماندگار فراخوانی پاکسازی شوند. الگو:

```ts
try {
  // ...
} catch (err) {
  log.error({ err }, "handler failed"); // فقط استثنای داخلی مورداعتماد
  return errorResponse(500, getErrorMessage(err)); // پاکسازیشده — برای کلاینت ارسال میشود
}
```

برای خطاهایی که توسط ارائهدهنده کنترل میشوند، مقدار ثبتشده در لاگ را نیز فرافکنی کنید:

```ts
log.error({ message: sanitizeErrorMessage(err) || "Provider request failed" });
```

### 4. الگوهای ممنوع

❌ **هرگز** خروجی خام استثنا را در بدنهٔ Response قرار ندهید:

```ts
// بد: ردگیری پشته و مسیرهای فایل به کلاینت میرسند
return new Response(JSON.stringify({ error: { message: err.stack || err.message } }), {
  status: 500,
});
```

❌ **هرگز** جداکنندهٔ خط اول اختصاصی خودتان را نسازید:

```ts
// بد: حذف مسیرهای مطلق را فراموش میکند و ممکن است از تابع کمکی استاندارد منحرف شود
const safe = String(err).split("\n")[0];
```

❌ **هرگز** فقط در مسیر، پاکسازی را انجام ندهید و مسیر SSE را فراموش نکنید. هر چیزی که در یک جریان مینویسد باید از `writeStreamError` (یا `buildErrorBody` زیربنایی آن) عبور کند.

❌ **هرگز** عمداً `process.cwd()`، `__filename`، `__dirname` یا مسیرهای مشتقشده از متغیرهای محیطی را در پیامهای خطا قرار ندهید. پاکساز بهعنوان یک دفاع چندلایه، مسیرهای مطلق را پوشش میدهد؛ اما فراخوانها اساساً نباید پیامهایی حاوی اطلاعات توپولوژی ایجاد کنند.

## پوشش در CI

`tests/unit/error-message-sanitization.test.ts` موارد زیر را اعمال میکند:

- هر مسیر زیرمجموعهٔ `/api/model-combo-mappings/*` برای پاسخهای 4xx/5xx بدنههای پاکسازیشده برمیگرداند.
- `sanitizeErrorMessage` ردهای پشتهٔ چندخطی را حذف میکند.
- `sanitizeErrorMessage` مسیرهای مطلق POSIX و Windows را با `<path>` جایگزین میکند.
- `sanitizeErrorMessage` ورودیهای نمونهٔ `null`/`undefined`/`Error` را بهصورت ایمن مدیریت میکند.
- `buildErrorBody` هرگز ردهای پشته را در فیلد `message` خود افشا نمیکند.

هنگام افزودن یک مسیر یا اجراکنندهٔ جدید، الگوی assertion را از این فایل کپی کنید. دروازهٔ پوشش (`npm run test:coverage`) حداقل 60٪ پوشش برای statements/lines/functions/branches را الزامی میکند — مسیرهای خطا باید پوشش داده شوند.

## کنترلهای مرتبط

- هشدارهای CodeQL مربوط به `js/stack-trace-exposure` در `.github/security` باید همیشه **یا** با استفاده از این helperها برطرف شوند **یا** با نظری که به این سند ارجاع میدهد، رد شوند.
- پیکربندی حذف اطلاعات حساس در `pino` (`src/shared/utils/logRedaction.ts`) گزارشهای ساختیافتهٔ مورداعتماد را
  جداگانه مدیریت میکند. این سند پیامهای پاسخ عمومی و مقادیر تحت کنترل ارائهدهنده را پوشش میدهد که
  از مرزهای پایدار فراخوانی/گزارش پراکسی عبور میکنند.
- فهرست ممنوعهٔ هدرهای upstream (`src/shared/constants/upstreamHeaders.ts`) نشت هدر را پوشش میدهد — هنگام افزودن یک نگرانی جدید دربارهٔ استخراج غیرمجاز داده، هر دو فایل را همراستا نگه دارید.

## عبور جزئیات upstream

`buildErrorBody` آرگومان سوم اختیاری `upstreamDetails` (بدنهٔ خام
تجزیهشده از ارائهدهندهٔ upstream) را میپذیرد. در صورت ارائه، پیش از گنجاندن در پاسخ با نام `upstream_details`،
توسط `sanitizeUpstreamDetails` پاکسازی میشود.

آرگومان چهارم اختیاری `classification`
(`{ type?: string; code?: string; reason?: string }`) یک طبقهبندی عمومی صریح را میپذیرد.
هر فیلد به واژگان محدود شناسههای عمومی نگاشت میشود. مقادیر ناامن، مشابه اعتبارنامه،
دارای نویسهٔ کنترلی یا بیشازحد طولانی، به type/code مشتقشده از وضعیت بازمیگردند؛ reason اختیاریِ
ناامن حذف میشود. شناسههای سهرقمی وضعیت HTTP (از `100` تا `599`) برای
قراردادهای ارائهدهندهای که وضعیت عددی upstream را بهعنوان کدی قابلخواندن برای ماشین ارائه میکنند، معتبر باقی میمانند. همین
بازهٔ محدود در قالب placeholder وضعیت HTTP تولیدشده بهصورت محلی نیز پذیرفته میشود؛ اعداد
و نامهای دلخواه ارائهدهنده خارج از این واژگان باقی میمانند.

هر طبقهبندی صریح را در همان آرگومان چهارم ارسال کنید. پس از بازگشت
`buildErrorBody()`، هرگز `body.error.code`، `body.error.type` یا `body.error.reason` را بازنویسی نکنید؛
تغییر پس از builder، نگاشت عمومی را دور میزند.

قواعد پاکسازی اعمالشده بر `upstreamDetails`:

1. برگهای رشتهای: از `sanitizeErrorMessage` عبور داده میشوند (ردهای پشته و مسیرهای مطلق را حذف میکند).
2. کلیدهای ناامن مربوط به مسیر، اعتبارنامه، نام مستعار نشست و کنترل prototype حذف میشوند.
3. محدودیت عمق: تودرتویی فراتر از 4 سطح با رشتهٔ `"[truncated]"` جایگزین میشود.
4. آرایهها به 32 عنصر محدود میشوند.

فقط محلهای فراخوانی دارای بدنهٔ خطای تجزیهشده از ارائهدهنده باید `upstreamDetails` را ارسال کنند. خطاهای داخلی OmniRoute
(شکست تجزیهٔ SSE، محتوای خالی، مسدودسازیهای guardrail) نباید آن را دربر بگیرند.

هرگز `err.stack` یا `err.message` خام، یا هیچ رشتهای از یک استثنای زمان اجرا را به
`upstreamDetails` ارسال نکنید. این موارد همچنان باید بدون بدنهٔ upstream از
`errorResponse` / `buildErrorBody(code, msg)` عبور کنند.

عبور انتخابی خطاهای 4xx از upstream، شکل ایمن JSON و عبارتبندی ارائهدهنده را که برای
بازیابی خودکار کلاینت لازم است حفظ میکند، اما این عبور بایتبهبایت نیست: پاکساز بازگشتی همیشه
پیش از سریالسازی اجرا میشود. بدنههای چرخهای، دارای BigInt یا دارای `toJSON()` مخرب، بهصورت امن رد میشوند و
واجد شرایط عبور نیستند. OCR و moderation نیز همین قاعده را اعمال میکنند؛ بدنههای upstream غیر JSON، خالی یا
دارای برچسب نادرست به پوشش خطای استاندارد JSON در OmniRoute تبدیل میشوند.

## محدودیت شناختهشدهٔ CodeQL: پاکسازهای سفارشی شناسایی نمیشوند

پرسوجوی CodeQL با نام [`js/stack-trace-exposure`](https://codeql.github.com/codeql-query-help/javascript/js-stack-trace-exposure/) از یک فهرست مجاز ثابت از الگوهای پاکساز استفاده میکند (برای مثال، `.split("\n")[0]` بهصورت درونخطی، `String#replace` با شکلهای مشخصی از عبارت منظم، و دسترسی به `.message` در `Error`). این پرسوجو، ارجاع غیرمستقیم از طریق یک تابع کمکی سفارشی مانند `sanitizeErrorMessage()` ما را شناسایی **نمیکند**.

این بدان معناست که محلهای فراخوانیای که بهطور قابل اثبات از طریق این ماژول پاکسازی را انجام میدهند — برای مثال `open-sse/utils/error.ts::errorResponse` و `open-sse/executors/cursor.ts::buildErrorResponse` — ممکن است همچنان هشدار ایجاد کنند، حتی اگر کد از نظر عملکردی امن باشد. موارد پیشین رد هشدار: `#224` و `#231` (مهٔ ۲۰۲۶) که هر دو با ارائهٔ توجیه فنی بهعنوان `false positive` علامتگذاری شدهاند.

**نحوهٔ رسیدگی به یک مورد جدید:**

1. تأیید کنید که محل فراخوانی واقعاً پیام را از `sanitizeErrorMessage` / `buildErrorBody` / یکی از پوششدهندههای مستندشده در بالا عبور میدهد (زنجیرهٔ فراخوانی را از ابتدا تا انتها بررسی کنید — به یک توضیح اعتماد نکنید).
2. تأیید کنید که `tests/unit/error-message-sanitization.test.ts` این مسیر را آزمایش میکند (یا پوشش آزمایشی اضافه کنید).
3. هشدار را با استفاده از `gh api ... -X PATCH state=dismissed -f 'dismissed_reason=false positive'` رد کنید و به این سند ارجاع دهید.
4. برای «رفع» مشکل، `.split("\n")[0]` را در همهجا بهصورت درونخطی تکرار **نکنید** — تابع کمکی منبع واحد حقیقت است؛ تکرار این الگو صرفاً برای راضیکردن ظاهری اسکنر، پاکساز را تضعیف میکند (حذف مسیرها، محدودیت طول و تبدیل نوع از دست میروند).

پذیرش قابلیتهای اختیاری مانند [پیکربندی پاکساز سفارشی `@codeql/javascript-models` در CodeQL](https://codeql.github.com/docs/codeql-language-guides/customizing-library-models-for-javascript/) راهحل بلندمدت است؛ این موضوع خارج از محدودهٔ این سند قرار دارد.

## منابع

- [CWE-209: افشای اطلاعات از طریق پیام خطا](https://cwe.mitre.org/data/definitions/209.html)
- [CodeQL `js/stack-trace-exposure`](https://codeql.github.com/codeql-query-help/javascript/js-stack-trace-exposure/)
- [OWASP: برگهٔ راهنمای مدیریت خطا](https://cheatsheetseries.owasp.org/cheatsheets/Error_Handling_Cheat_Sheet.html)
- کامیتی که تابع کمکی را متمرکز کرده است: `1a39c31f` — _fix(security): پنهانسازی اطلاعات ورود عمومی بالادستی + متمرکزسازی پاکسازی خطا_
