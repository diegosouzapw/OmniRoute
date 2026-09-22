# Error Message Sanitization (اردو)

🌐 **Languages:** 🇺🇸 [English](../../../../security/ERROR_SANITIZATION.md) · 🇪🇹 [am](../../../am/docs/security/ERROR_SANITIZATION.md) · 🇸🇦 [ar](../../../ar/docs/security/ERROR_SANITIZATION.md) · 🇦🇿 [az](../../../az/docs/security/ERROR_SANITIZATION.md) · 🇧🇬 [bg](../../../bg/docs/security/ERROR_SANITIZATION.md) · 🇧🇩 [bn](../../../bn/docs/security/ERROR_SANITIZATION.md) · 🇨🇿 [cs](../../../cs/docs/security/ERROR_SANITIZATION.md) · 🇩🇰 [da](../../../da/docs/security/ERROR_SANITIZATION.md) · 🇩🇪 [de](../../../de/docs/security/ERROR_SANITIZATION.md) · 🇬🇷 [el](../../../el/docs/security/ERROR_SANITIZATION.md) · 🇪🇸 [es](../../../es/docs/security/ERROR_SANITIZATION.md) · 🇪🇪 [et](../../../et/docs/security/ERROR_SANITIZATION.md) · 🇮🇷 [fa](../../../fa/docs/security/ERROR_SANITIZATION.md) · 🇫🇮 [fi](../../../fi/docs/security/ERROR_SANITIZATION.md) · 🇫🇷 [fr](../../../fr/docs/security/ERROR_SANITIZATION.md) · 🇮🇪 [ga](../../../ga/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [gu](../../../gu/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [ha](../../../ha/docs/security/ERROR_SANITIZATION.md) · 🇮🇱 [he](../../../he/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [hi](../../../hi/docs/security/ERROR_SANITIZATION.md) · 🇭🇷 [hr](../../../hr/docs/security/ERROR_SANITIZATION.md) · 🇭🇺 [hu](../../../hu/docs/security/ERROR_SANITIZATION.md) · 🇦🇲 [hy](../../../hy/docs/security/ERROR_SANITIZATION.md) · 🇮🇩 [id](../../../id/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [ig](../../../ig/docs/security/ERROR_SANITIZATION.md) · 🇮🇹 [it](../../../it/docs/security/ERROR_SANITIZATION.md) · 🇯🇵 [ja](../../../ja/docs/security/ERROR_SANITIZATION.md) · 🇬🇪 [ka](../../../ka/docs/security/ERROR_SANITIZATION.md) · 🇰🇭 [km](../../../km/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [kn](../../../kn/docs/security/ERROR_SANITIZATION.md) · 🇰🇷 [ko](../../../ko/docs/security/ERROR_SANITIZATION.md) · 🇱🇹 [lt](../../../lt/docs/security/ERROR_SANITIZATION.md) · 🇱🇻 [lv](../../../lv/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [ml](../../../ml/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [mr](../../../mr/docs/security/ERROR_SANITIZATION.md) · 🇲🇾 [ms](../../../ms/docs/security/ERROR_SANITIZATION.md) · 🇲🇹 [mt](../../../mt/docs/security/ERROR_SANITIZATION.md) · 🇲🇲 [my](../../../my/docs/security/ERROR_SANITIZATION.md) · 🇳🇵 [ne](../../../ne/docs/security/ERROR_SANITIZATION.md) · 🇳🇱 [nl](../../../nl/docs/security/ERROR_SANITIZATION.md) · 🇳🇴 [no](../../../no/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [or](../../../or/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [pa](../../../pa/docs/security/ERROR_SANITIZATION.md) · 🇵🇭 [phi](../../../phi/docs/security/ERROR_SANITIZATION.md) · 🇵🇱 [pl](../../../pl/docs/security/ERROR_SANITIZATION.md) · 🇵🇹 [pt](../../../pt/docs/security/ERROR_SANITIZATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/ERROR_SANITIZATION.md) · 🇷🇴 [ro](../../../ro/docs/security/ERROR_SANITIZATION.md) · 🇷🇺 [ru](../../../ru/docs/security/ERROR_SANITIZATION.md) · 🇱🇰 [si](../../../si/docs/security/ERROR_SANITIZATION.md) · 🇸🇰 [sk](../../../sk/docs/security/ERROR_SANITIZATION.md) · 🇸🇮 [sl](../../../sl/docs/security/ERROR_SANITIZATION.md) · 🇷🇸 [sr](../../../sr/docs/security/ERROR_SANITIZATION.md) · 🇸🇪 [sv](../../../sv/docs/security/ERROR_SANITIZATION.md) · 🇰🇪 [sw](../../../sw/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [ta](../../../ta/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [te](../../../te/docs/security/ERROR_SANITIZATION.md) · 🇹🇭 [th](../../../th/docs/security/ERROR_SANITIZATION.md) · 🇹🇷 [tr](../../../tr/docs/security/ERROR_SANITIZATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/ERROR_SANITIZATION.md) · 🇺🇿 [uz](../../../uz/docs/security/ERROR_SANITIZATION.md) · 🇻🇳 [vi](../../../vi/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [yo](../../../yo/docs/security/ERROR_SANITIZATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/ERROR_SANITIZATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/ERROR_SANITIZATION.md)

---

> **مستند ماخذ:** `open-sse/utils/errorSanitization.ts`،
> `open-sse/utils/errorPathRedaction.ts`، اور `open-sse/utils/error.ts` میں موجود عوامی بلڈرز
> **ٹیسٹس:** `tests/unit/error-message-sanitization.test.ts`،
> `tests/unit/error-public-boundaries-hardening.test.ts`
> **آخری بار اپ ڈیٹ کیا گیا:** 2026-09-02 — v3.8.51
> **قارئین:** ایرر ریسپانسز (HTTP روٹس، SSE اسٹریمز، ایگزیکیوٹرز، MCP ہینڈلرز) پر کام کرنے والا کوئی بھی انجینئر۔
> **حیثیت:** کلائنٹ کو ایرر پیغام واپس کرنے والے ہر کوڈ پاتھ کے لیے **لازمی**۔

## یہ کیوں موجود ہے

CodeQL کا اصول `js/stack-trace-exposure` (CWE-209) ایسے ہر کوڈ پاتھ کو نشان زد کرتا ہے جہاں کسی رن ٹائم ایکسیپشن سے پیدا ہونے والا ایرر پیغام، صاف کیے بغیر، HTTP / SSE ریسپانس تک پہنچتا ہے۔ پروڈکشن ریسپانسز میں اسٹیک ٹریسز اور مطلق فائل پاتھ حملہ آوروں کو درج ذیل معلومات فراہم کرتے ہیں:

- اندرونی ڈائریکٹری کی ساخت (`/srv/app/src/lib/...`) → مزید حملوں کے لیے ابتدائی معلومات اکٹھی کرنا۔
- اسٹیک فریمز سے اخذ کردہ لائبریری / فریم ورک ورژنز → مخصوص ایکسپلائٹس کا انتخاب۔
- حساس رن ٹائم اقدار جو ایررز میں اسٹرنگ انٹرپولیشن کے ذریعے شامل ہو سکتی ہیں (DB کوئریز، کنفیگریشن اقدار)۔

`open-sse/utils/error.ts` سے ایکسپورٹ کیا گیا `sanitizeErrorMessage` ہیلپر افشا ہونے والی معلومات کی ان اقسام کو ہٹا دیتا ہے:

1. فزیکل، سیریلائزڈ، اور واضح طور پر اِن لائن JavaScript اسٹیک فریم کے اختتامی حصے۔
2. مطلق POSIX، Windows، UNC، اور `file://` فائل سسٹم پاتھ، جبکہ محفوظ HTTPS URLs اور واضح طور پر نشان زد API روٹس برقرار رکھے جاتے ہیں۔
3. کریڈینشل اسائنمنٹس، عام پرووائیڈر ٹوکن فارمیٹس، نجی کلید کے PEM بلاکس، اور base64 ڈیٹا URLs۔

سینیٹائزر اِن پٹ کی لمبائی محدود کرتا ہے اور اگر پھینکی گئی قدر اسٹرنگ میں تبدیلی کو مسترد کرے تو محفوظ انداز میں ناکام ہوتا ہے۔
ریکرسیو اَپ اسٹریم JSON سینیٹائزیشن، ریسپانس کو سیریلائز کرنے سے پہلے، غیر محفوظ کریڈینشل/پاتھ کیز، سیشن عرفیات، اور پروٹوٹائپ کنٹرول کیز کو بھی خارج کر دیتی ہے۔

## لازمی طریقۂ کار

### 1. ایرر ریسپانس بنانا (HTTP / API روٹس)

`buildErrorBody()` استعمال کریں — سینیٹائزیشن اس میں پہلے سے شامل ہے:

```ts
import { buildErrorBody } from "@omniroute/open-sse/utils/error.ts";

export async function POST(req: Request) {
  try {
    // ... ہینڈلر کی منطق ...
  } catch (err) {
    return new Response(JSON.stringify(buildErrorBody(500, String(err))), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
```

یا اسی ماڈیول میں موجود سہولتی ریپرز کے لیے:

```ts
import {
  errorResponse, // یک مرحلہ Response آبجیکٹ
  writeStreamError, // SSE رائٹر
  createErrorResult, // { success: false, status, response, ... } ساخت
  unavailableResponse, // Retry-After شامل کرتا ہے
  providerCircuitOpenResponse,
  modelCooldownResponse,
} from "@omniroute/open-sse/utils/error.ts";
```

یہ سب معیاری عوامی ایرر باؤنڈری لاگو کرتے ہیں۔ `errorResponse`، `writeStreamError`، اور `createErrorResult`، `buildErrorBody` کے ذریعے گزرتے ہیں؛ تین خصوصی ری ٹرائی/سرکٹ ہیلپرز اپنے عوامی سیاق کو براہِ راست پروجیکٹ اور سینیٹائز کرتے ہیں۔ یہ ہیلپرز استعمال کرتے وقت **آپ کو کبھی بھی
`sanitizeErrorMessage` کو دستی طور پر کال کرنے کی ضرورت نہیں**۔

### 2. حسبِ ضرورت ایرر انویلپس (شاذ و نادر)

جب آپ اوپر دیے گئے ہیلپرز استعمال نہ کر سکیں (مثلاً ریسپانس کی ساخت Connect-RPC جیسے کسی اَپ اسٹریم پروٹوکول کے مطابق ہونا ضروری ہو)، تو `sanitizeErrorMessage` کو براہِ راست امپورٹ کریں:

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

حسبِ ضرورت ایرر باڈی بنانے کا یہی واحد منظور شدہ طریقہ ہے۔ حوالہ جاتی عمل درآمد کے لیے `open-sse/executors/cursor.ts::buildErrorResponse` دیکھیں۔

### 3. لاگنگ بمقابلہ ریسپانس دینا

قابلِ اعتماد اندرونی ایکسیپشنز اپنا مکمل پیغام اور اسٹیک برقرار رکھ سکتے ہیں تاکہ آپریٹرز ڈیبگ کر سکیں۔ پرووائیڈر، ویلیڈیشن، براؤزر سیشن، یا کریڈینشل سے متصل باؤنڈریز سے آنے والی اقدار کو کنسول آؤٹ پٹ، آڈٹ میٹا ڈیٹا، یا مستقل کال لاگز میں داخل ہونے سے پہلے سینیٹائز کرنا ضروری ہے۔ طریقۂ کار:

```ts
try {
  // ...
} catch (err) {
  log.error({ err }, "ہینڈلر ناکام ہو گیا"); // صرف قابلِ اعتماد اندرونی ایکسیپشن
  return errorResponse(500, getErrorMessage(err)); // سینیٹائز شدہ — کلائنٹ کو بھیجا گیا
}
```

پرووائیڈر کے زیرِ اختیار ناکامیوں کے لیے، لاگ کی جانے والی قدر کو بھی پروجیکٹ کریں:

```ts
log.error({
  message: sanitizeErrorMessage(err) || "پرووائیڈر کی درخواست ناکام ہو گئی",
});
```

### 4. ممنوعہ طریقے

❌ **کبھی بھی** خام ایکسیپشن آؤٹ پٹ کو Response باڈی میں نہ ڈالیں:

```ts
// غلط: اسٹیک ٹریس + فائل پاتھ کلائنٹ تک پہنچ جاتے ہیں
return new Response(JSON.stringify({ error: { message: err.stack || err.message } }), {
  status: 500,
});
```

❌ **کبھی بھی** اپنا فرسٹ لائن اسپلٹر نہ بنائیں:

```ts
// غلط: مطلق پاتھ ہٹانا بھول جاتا ہے، معیاری ہیلپر سے مختلف ہو سکتا ہے
const safe = String(err).split("\n")[0];
```

❌ **کبھی بھی** روٹ میں سینیٹائز کر کے SSE پاتھ کو نہ بھولیں۔ اسٹریم میں لکھنے والی ہر چیز `writeStreamError` (یا اس کے زیریں `buildErrorBody`) سے گزرے گی۔

❌ **کبھی بھی** جان بوجھ کر `process.cwd()`، `__filename`، `__dirname`، یا env سے اخذ کردہ پاتھ
ایرر پیغامات میں شامل نہ کریں۔ سینیٹائزر دفاع کی اضافی تہہ کے طور پر مطلق پاتھز کا احاطہ کرتا ہے، لیکن کالرز کو ابتدا ہی سے نظام کی ساخت ظاہر کرنے والے پیغامات نہیں بنانے چاہییں۔

## CI میں کوریج

`tests/unit/error-message-sanitization.test.ts` یہ یقینی بناتی ہے:

- `/api/model-combo-mappings/*` کے تحت ہر روٹ 4xx/5xx پر صاف شدہ باڈیز واپس کرتا ہے۔
- `sanitizeErrorMessage` متعدد سطروں والے اسٹیک ٹریسز کو ہٹا دیتا ہے۔
- `sanitizeErrorMessage` POSIX اور Windows کے مطلق پاتھز کو `<path>` سے بدل دیتا ہے۔
- `sanitizeErrorMessage`، `null`/`undefined`/`Error` انسٹینس ان پٹس کو محفوظ طریقے سے سنبھالتا ہے۔
- `buildErrorBody` اپنی `message` فیلڈ میں کبھی بھی اسٹیک ٹریسز ظاہر نہیں کرتا۔

نیا روٹ یا ایگزیکیوٹر شامل کرتے وقت، اس فائل سے assertion کا پیٹرن نقل کریں۔ کوریج گیٹ (`npm run test:coverage`) اسٹیٹمنٹس/لائنز/فنکشنز/برانچز کے لیے ≥60% نافذ کرتا ہے — ایرر پاتھز کا احاطہ ہونا لازمی ہے۔

## متعلقہ کنٹرولز

- `.github/security` میں موجود `js/stack-trace-exposure` CodeQL الرٹس کو ہمیشہ **یا تو** ان ہیلپرز کے ذریعے درست کیا جانا چاہیے **یا** اس دستاویز کا حوالہ دینے والے تبصرے کے ساتھ مسترد کیا جانا چاہیے۔
- `pino` ریڈیکشن کنفگ (`src/shared/utils/logRedaction.ts`) قابلِ اعتماد اسٹرکچرڈ لاگز کو علیحدہ طور پر سنبھالتا ہے۔ یہ دستاویز عوامی رسپانس پیغامات اور فراہم کنندہ کے زیرِ کنٹرول ان اقدار کا احاطہ کرتی ہے جو مستقل کال/پراکسی-لاگ کی حدود عبور کرتی ہیں۔
- اپ اسٹریم ہیڈر denylist (`src/shared/constants/upstreamHeaders.ts`) ہیڈر کے اخراج کا احاطہ کرتی ہے — اخراج کی کوئی نئی تشویش شامل کرتے وقت دونوں فائلوں کو ہم آہنگ رکھیں۔

## اپ اسٹریم تفصیلات کی براہِ راست منتقلی

`buildErrorBody` ایک اختیاری تیسری آرگومنٹ `upstreamDetails` (اپ اسٹریم فراہم کنندہ سے حاصل شدہ خام پارس شدہ باڈی) قبول کرتا ہے۔ فراہم کیے جانے پر، رسپانس میں `upstream_details` کے طور پر شامل کرنے سے پہلے اسے `sanitizeUpstreamDetails` کے ذریعے صاف کیا جاتا ہے۔

ایک اختیاری چوتھی آرگومنٹ `classification`
(`{ type?: string; code?: string; reason?: string }`) واضح عوامی درجہ بندی قبول کرتی ہے۔
ہر فیلڈ کو محدود عوامی identifier vocabulary پر پروجیکٹ کیا جاتا ہے۔ غیر محفوظ، اسناد جیسی ساخت رکھنے والی، کنٹرول کریکٹرز پر مشتمل، یا حد سے زیادہ طویل اقدار اسٹیٹس سے اخذ شدہ type/code پر واپس آ جاتی ہیں؛ غیر محفوظ اختیاری reason کو حذف کر دیا جاتا ہے۔ تین ہندسوں والے HTTP اسٹیٹس identifiers (`100` سے `599` تک) ان فراہم کنندہ معاہدوں کے لیے درست رہتے ہیں جو عددی اپ اسٹریم اسٹیٹس کو مشین کے ذریعے قابلِ مطالعہ کوڈ کے طور پر ظاہر کرتے ہیں۔ یہی محدود رینج مقامی طور پر تیار کردہ HTTP-status پلیس ہولڈر فارم میں بھی قبول کی جاتی ہے؛ فراہم کنندہ کے صوابدیدی اعداد اور نام vocabulary سے باہر رہتے ہیں۔

ہر واضح classification کو اسی چوتھی آرگومنٹ میں پاس کریں۔ `buildErrorBody()` کے واپس آنے کے بعد کبھی بھی
`body.error.code`، `body.error.type`، یا `body.error.reason` کو اوور رائٹ نہ کریں؛
بلڈر کے بعد کی میوٹیشن عوامی پروجیکشن کو بائی پاس کر دیتی ہے۔

`upstreamDetails` پر لاگو ہونے والے صفائی کے اصول:

1. اسٹرنگ لیوز: `sanitizeErrorMessage` سے گزاریں (اسٹیکس + مطلق پاتھز ہٹاتا ہے)۔
2. غیر محفوظ پاتھ، اسناد، سیشن-عرف، اور پروٹوٹائپ-کنٹرول کیز ہٹا دی جاتی ہیں۔
3. گہرائی کی حد: 4 لیولز سے زیادہ نیسٹنگ کو اسٹرنگ `"[truncated]"` سے بدل دیا جاتا ہے۔
4. arrays کو 32 عناصر تک محدود کیا جاتا ہے۔

صرف ان کال سائٹس کو `upstreamDetails` پاس کرنا چاہیے جن کے پاس فراہم کنندہ کی پارس شدہ ایرر باڈی ہو۔ اندرونی OmniRoute ایررز (SSE پارس کی ناکامیاں، خالی مواد، guardrail بلاکس) میں اسے شامل نہیں کرنا چاہیے۔

خام `err.stack`، `err.message`، یا رن ٹائم exception سے حاصل ہونے والی کوئی بھی اسٹرنگ
`upstreamDetails` کو پاس **نہ** کریں۔ انہیں اب بھی کسی اپ اسٹریم باڈی کے بغیر
`errorResponse` / `buildErrorBody(code, msg)` سے گزارنا ضروری ہے۔

منتخب اپ اسٹریم 4xx کی براہِ راست منتقلی، کلائنٹ کی خودکار بحالی کے لیے مطلوب فراہم کنندہ کی محفوظ JSON ساخت اور عبارت کو برقرار رکھتی ہے، لیکن یہ بائٹ بہ بائٹ براہِ راست منتقلی نہیں ہے: serialization سے پہلے recursive sanitizer ہمیشہ چلتا ہے۔ cyclic، BigInt پر مشتمل، یا ضرر رساں `toJSON()` باڈیز محفوظ طور پر ناکام ہو جاتی ہیں اور براہِ راست منتقلی کی اہل نہیں ہوتیں۔ OCR اور moderation پر بھی یہی اصول لاگو ہوتا ہے؛ غیر JSON، خالی، یا غلط لیبل شدہ اپ اسٹریم باڈیز کو معیاری OmniRoute JSON ایرر envelope میں تبدیل کر دیا جاتا ہے۔

## CodeQL کی معلوم حد: حسبِ ضرورت سینیٹائزرز شناخت نہیں کیے جاتے

CodeQL کوئری [`js/stack-trace-exposure`](https://codeql.github.com/codeql-query-help/javascript/js-stack-trace-exposure/) سینیٹائزر پیٹرنز کی ایک مقررہ اجازت فہرست استعمال کرتی ہے (مثلاً اِن لائن `.split("\n")[0]`، مخصوص regex ساختوں کے ساتھ `String#replace`، اور `Error` پر `.message` تک رسائی)۔ یہ ہمارے `sanitizeErrorMessage()` جیسے حسبِ ضرورت معاون کے ذریعے ہونے والی بالواسطہ کارروائی کو شناخت **نہیں** کرتی۔

اس کا مطلب یہ ہے کہ وہ کال سائٹس جو واضح طور پر اس ماڈیول کے ذریعے سینیٹائز کرتی ہیں — مثلاً `open-sse/utils/error.ts::errorResponse` اور `open-sse/executors/cursor.ts::buildErrorResponse` — الرٹ جاری رکھ سکتی ہیں، حالاں کہ کوڈ عملی طور پر محفوظ ہے۔ سابقہ اخراج: `#224`، `#231` (مئی 2026)، دونوں کو تکنیکی جواز کے ساتھ `false positive` نشان زد کیا گیا۔

**کسی نئے وقوعے سے نمٹنے کا طریقہ:**

1. تصدیق کریں کہ کال سائٹ واقعی پیغام کو `sanitizeErrorMessage` / `buildErrorBody` / اوپر دستاویز کیے گئے کسی wrapper کے ذریعے گزارتی ہے (کال چین کو ابتدا سے انتہا تک پڑھیں — کسی تبصرے پر بھروسا نہ کریں)۔
2. تصدیق کریں کہ `tests/unit/error-message-sanitization.test.ts` اس راستے کی جانچ کرتی ہے (یا کوریج شامل کریں)۔
3. اس دستاویز کا حوالہ دیتے ہوئے `gh api ... -X PATCH state=dismissed -f 'dismissed_reason=false positive'` کے ذریعے الرٹ خارج کریں۔
4. ہر جگہ `.split("\n")[0]` اِن لائن کر کے اسے "درست" **نہ** کریں — معاون ہی واحد مستند ماخذ ہے؛ اسکینر کو مطمئن کرنے کی ظاہری کوشش میں پیٹرن کی نقل سینیٹائزر کو کمزور کرتی ہے (راستوں کی صفائی، طوالت کی حد، اور قسم کی جبری تبدیلی ختم ہو جاتی ہے)۔

CodeQL کی [`@codeql/javascript-models` custom sanitizer config](https://codeql.github.com/docs/codeql-language-guides/customizing-library-models-for-javascript/) جیسی آپٹ اِن خصوصیات کو اپنانا طویل مدتی حل ہے؛ یہ اس دستاویز کے دائرۂ کار سے باہر ہے۔

## حوالہ جات

- [CWE-209: خرابی کے پیغام کے ذریعے معلومات کا افشا](https://cwe.mitre.org/data/definitions/209.html)
- [CodeQL `js/stack-trace-exposure`](https://codeql.github.com/codeql-query-help/javascript/js-stack-trace-exposure/)
- [OWASP: خرابیوں سے نمٹنے کی چیٹ شیٹ](https://cheatsheetseries.owasp.org/cheatsheets/Error_Handling_Cheat_Sheet.html)
- معاون کو مرکزی بنانے والی commit: `1a39c31f` — _fix(security): عوامی upstream اسناد کو مخفی کریں + خرابیوں کی سینیٹائزیشن کو مرکزی بنائیں_
