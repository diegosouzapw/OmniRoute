# CLAUDE.md (فارسی)

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇦🇿 [az](../az/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇮🇩 [in](../in/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md) · 🇨🇳 [zh-CN](../zh-CN/CLAUDE.md)

---

این فایل راهنمایی برای Claude Code (claude.ai/code) هنگام کار با کد در این مخزن ارائه می‌دهد.

## شروع سریع

```bash
npm install                    # نصب وابستگی‌ها (به‌طور خودکار .env را از .env.example تولید می‌کند)
npm run dev                    # سرور توسعه در http://localhost:20128
npm run build                  # ساخت تولید (نسخه مستقل Next.js 16)
npm run lint                   # ESLint (انتظار می‌رود 0 خطا؛ هشدارها از قبل وجود دارند)
npm run typecheck:core         # بررسی TypeScript (باید تمیز باشد)
npm run typecheck:noimplicit:core  # بررسی سخت‌گیرانه (بدون any ضمنی)
npm run test:coverage          # تست‌های واحد + دروازه پوشش (75/75/75/70 — بیانیه‌ها/خطوط/توابع/شاخه‌ها)
npm run check                  # lint + تست ترکیب شده
npm run check:cycles           # شناسایی وابستگی‌های دایره‌ای
```

### اجرای تست‌ها

```bash
# فایل تست تکی (رانر تست بومی Node.js — بیشتر تست‌ها)
node --import tsx/esm --test tests/unit/your-file.test.ts

# Vitest (سرور MCP، autoCombo، کش)
npm run test:vitest

# همه مجموعه‌ها
npm run test:all
```

برای ماتریس کامل تست، به `CONTRIBUTING.md` → "اجرای تست‌ها" مراجعه کنید. برای معماری عمیق، به `AGENTS.md` مراجعه کنید.

---

## پروژه در یک نگاه

**OmniRoute** — پروکسی/روتر AI یکپارچه. یک نقطه انتهایی، بیش از 160 ارائه‌دهنده LLM، بازگشت خودکار.

| لایه          | مکان                    | هدف                                                            |
| ------------- | ----------------------- | -------------------------------------------------------------- |
| API Routes    | `src/app/api/v1/`       | روتر برنامه Next.js — نقاط ورودی                               |
| Handlers      | `open-sse/handlers/`    | پردازش درخواست (چت، جاسازی‌ها و غیره)                          |
| Executors     | `open-sse/executors/`   | ارسال HTTP خاص ارائه‌دهنده                                     |
| Translators   | `open-sse/translator/`  | تبدیل فرمت (OpenAI↔Claude↔Gemini)                              |
| Transformer   | `open-sse/transformer/` | API پاسخ‌ها ↔ تکمیل‌های چت                                     |
| Services      | `open-sse/services/`    | مسیریابی ترکیبی، محدودیت‌های نرخ، کش و غیره                    |
| Database      | `src/lib/db/`           | ماژول‌های دامنه SQLite (بیش از 45 فایل، 55 مهاجرت)             |
| Domain/Policy | `src/domain/`           | موتور سیاست، قوانین هزینه، منطق بازگشت                         |
| MCP Server    | `open-sse/mcp-server/`  | 37 ابزار (30 پایه + 3 حافظه + 4 مهارت)، 3 حمل و نقل، ~13 دامنه |
| A2A Server    | `src/lib/a2a/`          | پروتکل عامل JSON-RPC 2.0                                       |
| Skills        | `src/lib/skills/`       | چارچوب مهارت قابل گسترش                                        |
| Memory        | `src/lib/memory/`       | حافظه گفتگوی پایدار                                            |

مونوریپو: `src/` (برنامه Next.js 16)، `open-sse/` (فضای کار موتور استریمینگ)، `electron/` (برنامه دسکتاپ)، `tests/`، `bin/` (نقطه ورودی CLI).

---

## خط لوله درخواست

```
Client → /v1/chat/completions (مسیر Next.js)
  → CORS → اعتبارسنجی Zod → احراز هویت؟ → بررسی سیاست → محافظت در برابر تزریق پرامپت
  → handleChatCore() [open-sse/handlers/chatCore.ts]
    → بررسی کش → محدودیت نرخ → مسیریابی ترکیبی؟
      → resolveComboTargets() → handleSingleModel() برای هر هدف
    → translateRequest() → getExecutor() → executor.execute()
      → fetch() upstream → retry w/ backoff
    → ترجمه پاسخ → جریان SSE یا JSON
    → اگر API Responses: responsesTransformer.ts TransformStream
```

مسیرهای API الگوی ثابتی را دنبال می‌کنند: `Route → CORS preflight → اعتبارسنجی بدنه Zod → احراز هویت اختیاری (extractApiKey/isValidApiKey) → اجرای سیاست کلید API → واگذاری Handler (open-sse)`. هیچ middleware جهانی Next.js وجود ندارد — قطع ارتباط خاص مسیر است.

**مسیریابی ترکیبی** (`open-sse/services/combo.ts`): 14 استراتژی (اولویت، وزن‌دار، پر کردن اول، گردشی، P2C، تصادفی، کمترین استفاده، بهینه‌سازی هزینه، آگاه به بازنشانی، تصادفی سخت، خودکار، lkgp، بهینه‌سازی زمینه، انتقال زمینه). هر هدف `handleSingleModel()` را فراخوانی می‌کند که `handleChatCore()` را با مدیریت خطا برای هر هدف و بررسی‌های مدار شکن احاطه می‌کند. برای نمره‌دهی Auto-Combo با 9 عامل به `docs/routing/AUTO-COMBO.md` و برای 3 لایه تاب‌آوری به `docs/architecture/RESILIENCE_GUIDE.md` مراجعه کنید.

---

## وضعیت زمان اجرای تاب‌آوری

OmniRoute سه مکانیزم موقت شکست مرتبط اما متمایز دارد. دامنه آن‌ها را هنگام اشکال‌زدایی رفتار مسیریابی جدا نگه دارید. برای یک نمای کلی، به
[نقشه تاب‌آوری 3 لایه](./docs/diagrams/exported/resilience-3layers.svg)
(منبع: [docs/diagrams/resilience-3layers.mmd](./docs/diagrams/resilience-3layers.mmd))
مراجعه کنید.

### مدار شکن ارائه‌دهنده

**دامنه**: کل ارائه‌دهنده، به عنوان مثال `glm`، `openai`، `anthropic`.

**هدف**: متوقف کردن ارسال ترافیک به یک ارائه‌دهنده که به طور مکرر در سطح upstream/service شکست می‌خورد، تا یک ارائه‌دهنده ناسالم باعث کند شدن هر درخواست نشود.

**پیاده‌سازی**:

- کلاس اصلی: `src/shared/utils/circuitBreaker.ts`
- سیم‌کشی دروازه/اجرا چت: `src/sse/handlers/chatHelpers.ts`، `src/sse/handlers/chat.ts`
- API وضعیت زمان اجرا: `src/app/api/monitoring/health/route.ts`
- پوشش‌های مشترک: `open-sse/services/accountFallback.ts`
- جدول وضعیت پایدار: `domain_circuit_breakers`

**وضعیت‌ها**:

- `CLOSED`: ترافیک عادی مجاز است.
- `OPEN`: ارائه‌دهنده به طور موقت مسدود شده است؛ فراخوانی‌کنندگان پاسخ مدار-شکن-باز ارائه‌دهنده را دریافت می‌کنند یا مسیریابی ترکیبی به هدف دیگری می‌رود.
- `HALF_OPEN`: زمان بازنشانی سپری شده است؛ اجازه یک درخواست آزمایشی داده می‌شود. موفقیت مدار شکن را می‌بندد، و شکست دوباره آن را باز می‌کند.

**پیش‌فرض‌ها** (`open-sse/config/constants.ts`):

- ارائه‌دهندگان OAuth: آستانه `3`، زمان بازنشانی `60s`.
- ارائه‌دهندگان کلید API: آستانه `5`، زمان بازنشانی `30s`.
- ارائه‌دهندگان محلی: آستانه `2`، زمان بازنشانی `15s`.

فقط وضعیت‌های شکست در سطح ارائه‌دهنده باید مدار شکن ارائه‌دهنده را فعال کنند:

```ts
(408, 500, 502, 503, 504);
```

مدار شکن کل ارائه‌دهنده را برای خطاهای عادی حساب/کلید/مدل مانند بیشتر موارد `401`، `403` یا `429` فعال نکنید. این موارد معمولاً به خنک‌سازی اتصال یا قفل مدل مربوط می‌شوند. یک خطای عمومی کلید API `403` باید قابل بازیابی باشد مگر اینکه به عنوان یک خطای نهایی ارائه‌دهنده/حساب طبقه‌بندی شود.

مدار شکن از بازیابی تنبل استفاده می‌کند، نه یک تایمر پس‌زمینه. وقتی `OPEN` منقضی می‌شود، خواندن‌هایی مانند `getStatus()`, `canExecute()`, و `getRetryAfterMs()` وضعیت را به `HALF_OPEN` تازه می‌کنند، بنابراین داشبوردها و سازندگان نامزد ترکیبی به طور مداوم یک ارائه‌دهنده منقضی شده را حذف نمی‌کنند.

### خنک‌سازی اتصال

**دامنه**: یک اتصال/حساب/کلید ارائه‌دهنده.

**هدف**: به طور موقت یک کلید/حساب بد را رد کنید در حالی که اجازه می‌دهید اتصالات دیگر برای همان ارائه‌دهنده به خدمت‌رسانی ادامه دهند.

**پیاده‌سازی**:

- مسیر نوشتن/به‌روزرسانی: `src/sse/services/auth.ts::markAccountUnavailable()`
- انتخاب/فیلتر کردن حساب: `src/sse/services/auth.ts::getProviderCredentials...`
- محاسبه خنک‌سازی: `open-sse/services/accountFallback.ts::checkFallbackError()`
- تنظیمات: `src/lib/resilience/settings.ts`

فیلدهای مهم در اتصالات ارائه‌دهنده:

```ts
rateLimitedUntil;
testStatus: "unavailable";
lastError;
lastErrorType;
errorCode;
backoffLevel;
```

در طول انتخاب حساب، یک اتصال در حالی که:

```ts
new Date(rateLimitedUntil).getTime() > Date.now();
```

خنک‌سازی‌ها نیز تنبل هستند: وقتی `rateLimitedUntil` در گذشته است، اتصال دوباره واجد شرایط می‌شود. در صورت استفاده موفق، `clearAccountError()` `testStatus`، `rateLimitedUntil`، فیلدهای خطا و `backoffLevel` را پاک می‌کند.

رفتار پیش‌فرض خنک‌سازی اتصال:

- خنک‌سازی پایه OAuth: `5s`.
- خنک‌سازی پایه کلید API: `3s`.
- کلید API `429` باید در صورت موجود بودن، به نشانه‌های تلاش مجدد upstream (`Retry-After`، هدرهای بازنشانی، یا متن بازنشانی قابل تجزیه) ترجیح داده شود.
- شکست‌های قابل بازیابی مکرر از بازگشت نمایی استفاده می‌کنند:

```ts
baseCooldownMs * 2 ** failureIndex;
```

محافظ ضد جمع‌آوری همزمان از شکست‌های همزمان در یک اتصال جلوگیری می‌کند که به طور مکرر خنک‌سازی را تمدید یا `backoffLevel` را دو برابر کند.

وضعیت‌های نهایی خنک‌سازی نیستند. `banned`، `expired` و `credits_exhausted` به طور خاص برای عدم دسترسی تا زمانی که اعتبارنامه‌ها/تنظیمات تغییر کنند یا یک اپراتور آن‌ها را بازنشانی کند، طراحی شده‌اند. وضعیت‌های نهایی را با وضعیت خنک‌سازی موقتی بازنویسی نکنید.

### قفل مدل

**دامنه**: ارائه‌دهنده + اتصال + مدل.

**هدف**: جلوگیری از غیرفعال کردن یک اتصال کامل زمانی که فقط یک مدل در دسترس نیست یا برای آن اتصال محدودیت سهمیه دارد.

مثال‌ها:

- ارائه‌دهندگان سهمیه به ازای مدل که `429` برمی‌گردانند.
- ارائه‌دهندگان محلی که برای یک مدل گم‌شده `404` برمی‌گردانند.
- شکست‌های مجوز مدل/حالت خاص ارائه‌دهنده مانند حالت‌های Grok انتخاب شده.

قفل مدل در `open-sse/services/accountFallback.ts` زندگی می‌کند و به همان اتصال اجازه می‌دهد تا به خدمت‌رسانی به مدل‌های دیگر ادامه دهد.

### راهنمای اشکال‌زدایی

- اگر همه کلیدها برای یک ارائه‌دهنده رد شده‌اند، وضعیت مدار شکن ارائه‌دهنده و `rateLimitedUntil`/`testStatus` هر اتصال را بررسی کنید.
- اگر یک ارائه‌دهنده پس از پنجره بازنشانی به طور دائمی حذف شده به نظر می‌رسد، بررسی کنید که آیا کد به جای استفاده از `getStatus()`/`canExecute()`، `state` خام را می‌خواند.
- اگر یک کلید ارائه‌دهنده شکست بخورد اما دیگران باید کار کنند، خنک‌سازی اتصال را به مدار شکن ارائه‌دهنده ترجیح دهید.
- اگر فقط یک مدل شکست بخورد، قفل مدل را به خنک‌سازی اتصال ترجیح دهید.
- اگر یک وضعیت باید خود را بازیابی کند، باید یک زمان‌سنج آینده/زمان بازنشانی و یک مسیر خواندن داشته باشد که وضعیت منقضی شده را تازه کند. وضعیت‌های دائمی نیاز به تغییرات دستی در اعتبارنامه یا پیکربندی دارند.

## کنوانسیون‌های کلیدی

### سبک کد

- **۲ فاصله**، نقطه‌ویرگول‌ها، نقل‌قول‌های دوتایی، عرض ۱۰۰ کاراکتر، کاماهای انتهایی es5 (توسط lint-staged از طریق Prettier اعمال می‌شود)
- **واردات**: خارجی → داخلی (`@/`, `@omniroute/open-sse`) → نسبی
- **نام‌گذاری**: فایل‌ها=camelCase/kebab، کامپوننت‌ها=PascalCase، ثابت‌ها=UPPER_SNAKE
- **ESLint**: `no-eval`، `no-implied-eval`، `no-new-func` = خطا در همه جا؛ `no-explicit-any` = هشدار در `open-sse/` و `tests/`
- **TypeScript**: `strict: false`، هدف ES2022، ماژول esnext، رزولوشن bundler. نوع‌های صریح را ترجیح دهید.

### پایگاه داده

- **همیشه** از ماژول‌های دامنه `src/lib/db/` عبور کنید — **هرگز** SQL خام در مسیرها یا هندلرها ننویسید
- **هرگز** منطق را به `src/lib/localDb.ts` اضافه نکنید (فقط لایه‌ی مجدد صادرات)
- **هرگز** از `localDb.ts` به صورت بارل وارد نکنید — به جای آن ماژول‌های خاص `db/` را وارد کنید
- DB singleton: `getDbInstance()` از `src/lib/db/core.ts` (ثبت‌نام WAL)
- مهاجرت‌ها: `src/lib/db/migrations/` — فایل‌های SQL نسخه‌بندی شده، ایپیدموت، اجرا در تراکنش‌ها

### مدیریت خطا

- try/catch با نوع‌های خطای خاص، ثبت با زمینه pino
- هرگز خطاها را در جریان‌های SSE نبلعید — از سیگنال‌های ابطال برای تمیزکاری استفاده کنید
- کدهای وضعیت HTTP مناسب را برگردانید (۴xx/۵xx)

### امنیت

- **هرگز** از `eval()`، `new Function()`، یا eval ضمنی استفاده نکنید
- تمام ورودی‌ها را با طرح‌های Zod اعتبارسنجی کنید
- اعتبارنامه‌ها را در حالت استراحت رمزگذاری کنید (AES-256-GCM)
- لیست رد هدرهای upstream: `src/shared/constants/upstreamHeaders.ts` — هنگام ویرایش، sanitize، طرح‌های Zod و تست‌های واحد را هم‌راستا نگه دارید
- **اعتبارنامه‌های عمومی upstream** (client_id/secret OAuth به سبک Gemini/Antigravity/Windsurf + کلیدهای وب Firebase استخراج شده از CLI‌های عمومی): **باید** از طریق `resolvePublicCred()` از `open-sse/utils/publicCreds.ts` جاسازی شوند — **هرگز** به عنوان رشته‌های ادبی. به `docs/security/PUBLIC_CREDS.md` برای الگوی الزامی مراجعه کنید.
- **پاسخ‌های خطا** (HTTP / SSE / executor / MCP handler): **باید** از طریق `buildErrorBody()` یا `sanitizeErrorMessage()` از `open-sse/utils/error.ts` مسیریابی شوند — **هرگز** `err.stack` یا `err.message` خام را در بدنه پاسخ قرار ندهید. به `docs/security/ERROR_SANITIZATION.md` مراجعه کنید.
- **دستورات شل ساخته شده از متغیرها**: هنگام فراخوانی `exec()`/`spawn()` با اسکریپتی که به مقادیر زمان اجرا نیاز دارد، آنها را از طریق گزینه `env` (به طور خودکار شل-فرار شده) منتقل کنید — **هرگز** مسیرهای غیرقابل اعتماد/خارجی را به بدنه اسکریپت رشته‌ای نکنید. مرجع: `src/mitm/cert/install.ts::updateNssDatabases`.
- **کتابخانه‌های امن به طور پیش‌فرض** ([tldrsec/awesome-secure-defaults](https://github.com/tldrsec/awesome-secure-defaults)): هنگام افزودن سطوح جدید حساس به امنیت، به Helmet.js، DOMPurify، ssrf-req-filter، safe-regex، Google Tink نسبت به پیاده‌سازی‌های سفارشی ترجیح دهید.

---

## سناریوهای رایج تغییر

### افزودن یک ارائه‌دهنده جدید

1. در `src/shared/constants/providers.ts` ثبت‌نام کنید (در زمان بارگذاری با Zod اعتبارسنجی می‌شود)
2. در `open-sse/executors/` اگر منطق سفارشی نیاز است، executor اضافه کنید (از `BaseExecutor` گسترش دهید)
3. در `open-sse/translator/` اگر فرمت غیر OpenAI است، مترجم اضافه کنید
4. در `src/lib/oauth/constants/oauth.ts` اگر مبتنی بر OAuth است، پیکربندی OAuth را اضافه کنید — اگر CLI upstream یک client_id/secret عمومی ارسال کند، از طریق `resolvePublicCred()` جاسازی کنید (به `docs/security/PUBLIC_CREDS.md` مراجعه کنید)، **هرگز** به عنوان یک ادبی
5. مدل‌ها را در `open-sse/config/providerRegistry.ts` ثبت کنید
6. در `tests/unit/` تست بنویسید (شکل اعتبارسنجی publicCreds را شامل کنید اگر یک پیش‌فرض جدید جاسازی شده اضافه کردید)

### افزودن یک مسیر API جدید

1. دایرکتوری‌ای تحت `src/app/api/v1/your-route/` ایجاد کنید
2. `route.ts` را با هندلرهای `GET`/`POST` ایجاد کنید
3. الگو را دنبال کنید: CORS → اعتبارسنجی بدنه Zod → احراز هویت اختیاری → واگذاری هندلر
4. هندلر در `open-sse/handlers/` قرار می‌گیرد (از آنجا وارد کنید، نه به صورت درون‌خط)
5. پاسخ‌های خطا از `buildErrorBody()` / `errorResponse()` از `open-sse/utils/error.ts` استفاده می‌کنند (به طور خودکار تمیز شده — هرگز `err.stack` یا `err.message` خام را در بدنه قرار ندهید). به `docs/security/ERROR_SANITIZATION.md` مراجعه کنید.
6. تست‌ها را اضافه کنید — شامل حداقل یک اعتبارسنجی که پاسخ‌های خطا نشت‌های ردیابی را ندهند (`!body.error.message.includes("at /")`)

### افزودن یک ماژول DB جدید

1. `src/lib/db/yourModule.ts` را ایجاد کنید — `getDbInstance` را از `./core.ts` وارد کنید
2. توابع CRUD را برای جدول(های) دامنه خود صادر کنید
3. در `src/lib/db/migrations/` اگر جداول جدید نیاز است، مهاجرت اضافه کنید
4. از `src/lib/localDb.ts` مجدداً صادرات کنید (فقط به لیست مجدد صادرات اضافه کنید)
5. تست بنویسید

### افزودن یک ابزار MCP جدید

1. تعریف ابزار را در `open-sse/mcp-server/tools/` با طرح ورودی Zod + هندلر async اضافه کنید
2. در مجموعه ابزار ثبت‌نام کنید (از طریق `createMcpServer()` متصل شده)
3. به دامنه(های) مناسب اختصاص دهید
4. تست بنویسید (فراخوانی ابزار در جدول `mcp_audit` ثبت می‌شود)

### افزودن یک مهارت A2A جدید

1. مهارت را در `src/lib/a2a/skills/` ایجاد کنید (۵ مورد قبلاً وجود دارد: smart-routing، quota-management، provider-discovery، cost-analysis، health-report)
2. مهارت زمینه وظیفه را دریافت می‌کند (پیام‌ها، متاداده) → نتیجه ساختاری را برمی‌گرداند
3. در `A2A_SKILL_HANDLERS` در `src/lib/a2a/taskExecution.ts` ثبت‌نام کنید
4. در `src/app/.well-known/agent.json/route.ts` (کارت عامل) نمایان کنید
5. در `tests/unit/` تست بنویسید
6. در جدول مهارت در `docs/frameworks/A2A-SERVER.md` مستند کنید

### افزودن یک عامل ابری جدید

1. کلاس عامل را در `src/lib/cloudAgent/agents/` ایجاد کنید که از `CloudAgentBase` گسترش یافته باشد (۳ مورد قبلاً وجود دارد: codex-cloud، devin، jules)
2. `createTask`، `getStatus`، `approvePlan`، `sendMessage`، `listSources` را پیاده‌سازی کنید
3. در `src/lib/cloudAgent/registry.ts` ثبت‌نام کنید
4. اگر نیاز است، مدیریت OAuth/اعتبارنامه‌ها را اضافه کنید (`src/lib/oauth/providers/`)
5. تست‌ها + مستند در `docs/frameworks/CLOUD_AGENT.md`

### افزودن یک Guardrail / Eval / Skill / رویداد Webhook جدید

- Guardrail: `src/lib/guardrails/` → مستندات: `docs/security/GUARDRAILS.md`
- مجموعه Eval: `src/lib/evals/` → مستندات: `docs/frameworks/EVALS.md`
- مهارت (sandbox): `src/lib/skills/` → مستندات: `docs/frameworks/SKILLS.md`
- رویداد Webhook: `src/lib/webhookDispatcher.ts` → مستندات: `docs/frameworks/WEBHOOKS.md`

## مستندات مرجع

برای هر تغییر غیر جزئی، ابتدا عمیقاً به مستندات مربوطه مراجعه کنید:

| حوزه                                          | مستند                                                             |
| --------------------------------------------- | ----------------------------------------------------------------- |
| ناوبری مخزن                                   | `docs/architecture/REPOSITORY_MAP.md`                             |
| معماری                                        | `docs/architecture/ARCHITECTURE.md`                               |
| مرجع مهندسی                                   | `docs/architecture/CODEBASE_DOCUMENTATION.md`                     |
| Auto-Combo (امتیازدهی 9 عاملی، 14 استراتژی)   | `docs/routing/AUTO-COMBO.md`                                      |
| تاب‌آوری (3 مکانیزم)                          | `docs/architecture/RESILIENCE_GUIDE.md`                           |
| پخش استدلال                                   | `docs/routing/REASONING_REPLAY.md`                                |
| چارچوب مهارت‌ها                               | `docs/frameworks/SKILLS.md`                                       |
| سیستم حافظه (FTS5 + Qdrant)                   | `docs/frameworks/MEMORY.md`                                       |
| عوامل ابری                                    | `docs/frameworks/CLOUD_AGENT.md`                                  |
| راهنماهای حفاظتی (PII / تزریق / بینش)         | `docs/security/GUARDRAILS.md`                                     |
| اعتبارنامه‌های عمومی بالادستی (Gemini/etc.)   | `docs/security/PUBLIC_CREDS.md`                                   |
| پاک‌سازی پیام‌های خطا                         | `docs/security/ERROR_SANITIZATION.md`                             |
| ارزیابی‌ها                                    | `docs/frameworks/EVALS.md`                                        |
| انطباق / حسابرسی                              | `docs/security/COMPLIANCE.md`                                     |
| وب‌هوک‌ها                                     | `docs/frameworks/WEBHOOKS.md`                                     |
| خط لوله مجوزدهی                               | `docs/architecture/AUTHZ_GUIDE.md`                                |
| پنهان‌کاری (TLS / اثر انگشت)                  | `docs/security/STEALTH_GUIDE.md`                                  |
| پروتکل‌های عامل (A2A / ACP / Cloud)           | `docs/frameworks/AGENT_PROTOCOLS_GUIDE.md`                        |
| سرور MCP                                      | `docs/frameworks/MCP-SERVER.md`                                   |
| سرور A2A                                      | `docs/frameworks/A2A-SERVER.md`                                   |
| مرجع API + OpenAPI                            | `docs/reference/API_REFERENCE.md` + `docs/reference/openapi.yaml` |
| کاتالوگ ارائه‌دهنده (به‌طور خودکار تولید شده) | `docs/reference/PROVIDER_REFERENCE.md`                            |
| جریان انتشار                                  | `docs/ops/RELEASE_CHECKLIST.md`                                   |

---

## تست

| چه چیزی                 | دستور                                                                |
| ----------------------- | -------------------------------------------------------------------- |
| تست‌های واحد            | `npm run test:unit`                                                  |
| فایل تکی                | `node --import tsx/esm --test tests/unit/file.test.ts`               |
| Vitest (MCP، autoCombo) | `npm run test:vitest`                                                |
| E2E (Playwright)        | `npm run test:e2e`                                                   |
| پروتکل E2E (MCP+A2A)    | `npm run test:protocols:e2e`                                         |
| اکوسیستم                | `npm run test:ecosystem`                                             |
| دروازه پوشش             | `npm run test:coverage` (75/75/75/70 — بیانیه‌ها/خطوط/توابع/شاخه‌ها) |
| گزارش پوشش              | `npm run coverage:report`                                            |

**قانون PR**: اگر کد تولید را در `src/`، `open-sse/`، `electron/` یا `bin/` تغییر دهید، باید تست‌ها را در همان PR شامل یا به‌روزرسانی کنید.

**ترجیح لایه تست**: واحد اول → ادغام (چند ماژول یا وضعیت DB) → e2e (فقط UI/جریان کار). تولید باگ‌ها را به عنوان تست‌های خودکار قبل یا همزمان با رفع مشکل کدگذاری کنید.

**سیاست پوشش Copilot**: وقتی یک PR کد تولید را تغییر می‌دهد و پوشش زیر 75% (بیانیه‌ها/خطوط/توابع) یا 70% (شاخه‌ها) است، فقط گزارش ندهید — تست‌ها را اضافه یا به‌روزرسانی کنید، دروازه پوشش را دوباره اجرا کنید، سپس درخواست تأیید کنید. دستورات اجرا شده، فایل‌های تست تغییر یافته و نتیجه نهایی پوشش را در گزارش PR شامل کنید.

---

## جریان کار Git

```bash
# هرگز مستقیماً به main کامیت نکنید
git checkout -b feat/your-feature
git commit -m "feat: تغییرات خود را توصیف کنید"
git push -u origin feat/your-feature
```

**پیشوندهای شاخه**: `feat/`, `fix/`, `refactor/`, `docs/`, `test/`, `chore/`

**فرمت کامیت** (کامیت‌های متعارف): `feat(db): add circuit breaker` — دامنه‌ها: `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`

**هوک‌های Husky**:

- **pre-commit**: lint-staged + `check-docs-sync` + `check:any-budget:t11`
- **pre-push**: `npm run test:unit`

---

## محیط

- **زمان اجرا**: Node.js ≥20.20.2 <21 || ≥22.22.2 <23 || ≥24 <25، ماژول‌های ES
- **TypeScript**: 5.9+، هدف ES2022، ماژول esnext، حل‌گر بسته
- **آلیاس‌های مسیر**: `@/*` → `src/`، `@omniroute/open-sse` → `open-sse/`، `@omniroute/open-sse/*` → `open-sse/*`
- **پورت پیش‌فرض**: 20128 (API + داشبورد در همان پورت)
- **دایرکتوری داده**: متغیر محیطی `DATA_DIR`، به طور پیش‌فرض به `~/.omniroute/`
- **متغیرهای کلیدی محیط**: `PORT`, `JWT_SECRET`, `API_KEY_SECRET`, `INITIAL_PASSWORD`, `REQUIRE_API_KEY`, `APP_LOG_LEVEL`
- راه‌اندازی: `cp .env.example .env` سپس `JWT_SECRET` (`openssl rand -base64 48`) و `API_KEY_SECRET` (`openssl rand -hex 32`) را تولید کنید.

---

## قوانین سخت

1. هرگز اسرار یا اعتبارنامه‌ها را کامیت نکنید
2. هرگز منطق را به `localDb.ts` اضافه نکنید
3. هرگز از `eval()` / `new Function()` / eval ضمنی استفاده نکنید
4. هرگز مستقیماً به `main` کامیت نکنید
5. هرگز SQL خام را در مسیرها ننویسید — از ماژول‌های `src/lib/db/` استفاده کنید
6. هرگز خطاها را به طور خاموش در جریان‌های SSE نبلعید
7. همیشه ورودی‌ها را با طرح‌های Zod اعتبارسنجی کنید
8. همیشه هنگام تغییر کد تولید، تست‌ها را شامل کنید
9. پوشش باید ≥75% (بیانیه‌ها، خطوط، توابع) / ≥70% (شاخه‌ها) باقی بماند. اندازه‌گیری فعلی: ~82%.
10. هرگز هوک‌های Husky را بدون تأیید صریح اپراتور دور نزنید (`--no-verify`, `--no-gpg-sign`).
11. هرگز کلیدهای عمومی OAuth client_id/secret یا کلیدهای Firebase Web را به عنوان رشته‌های ادبی جاسازی نکنید — همیشه از `resolvePublicCred()` (`open-sse/utils/publicCreds.ts`) استفاده کنید. به `docs/security/PUBLIC_CREDS.md` مراجعه کنید.
12. هرگز `err.stack` / `err.message` خام را در پاسخ‌های HTTP / SSE / executor برنگردانید — همیشه از `buildErrorBody()` یا `sanitizeErrorMessage()` (`open-sse/utils/error.ts`) استفاده کنید. به `docs/security/ERROR_SANITIZATION.md` مراجعه کنید.
13. هرگز مسیرهای خارجی یا مقادیر زمان اجرا را به صورت رشته‌ای در اسکریپت‌های شل که به `exec()`/`spawn()` منتقل می‌شوند، جاسازی نکنید — به جای آن از گزینه `env` استفاده کنید. مرجع: `src/mitm/cert/install.ts::updateNssDatabases`.
14. هرگز یک هشدار CodeQL / Secret-Scanning را بدون (الف) بررسی الگوهای مستندات بالا برای دیدن اینکه آیا کمک‌کننده اعمال می‌شود و (ب) ثبت توجیه فنی در نظر dismissal نادیده نگیرید. سابقه: `js/stack-trace-exposure` که در callsites که قبلاً از `sanitizeErrorMessage()` عبور کرده‌اند، یک محدودیت شناخته شده CodeQL است (sanitizers سفارشی شناسایی نمی‌شوند) — به عنوان `false positive` با اشاره به `docs/security/ERROR_SANITIZATION.md` نادیده بگیرید.
15. هرگز مسیرهایی که فرایندهای فرزند را ایجاد می‌کنند (`/api/mcp/`, `/api/cli-tools/runtime/`) را بدون طبقه‌بندی `isLocalOnlyPath()` در `src/server/authz/routeGuard.ts` افشا نکنید. اجرای loopback بدون قید و شرط قبل از هر بررسی احراز هویت انجام می‌شود — JWT نشت شده از طریق تونل نمی‌تواند فرایند را ایجاد کند. به `docs/security/ROUTE_GUARD_TIERS.md` مراجعه کنید.
16. هرگز ملحقات `Co-Authored-By` که به دستیار هوش مصنوعی، LLM یا حساب خودکار اعتبار می‌دهد را اضافه نکنید (مثلاً نام‌های شامل "Claude"، "GPT"، "Copilot"، "Bot"؛ ایمیل‌های `anthropic.com` / `openai.com` / آدرس‌های `noreply.github.com` متعلق به بات‌ها). چنین ملحقاتی انتساب commit را به حساب بات در GitHub هدایت می‌کنند و نویسنده واقعی (`diegosouzapw`) را در تاریخچه PR پنهان می‌کنند. همکاران انسانی — از جمله نویسندگان PR upstream و گزارش‌دهندگان issue که به OmniRoute پورت می‌شوند — می‌توانند و باید با ملحقات استاندارد `Co-authored-by: Name <email>` اعتبار داده شوند؛ گردش‌کارهای upstream-port (`/port-upstream-features`، `/port-upstream-issues`) به این بستگی دارد.
