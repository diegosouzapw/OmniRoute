# Router Backends & Embedded Services — architecture contract (ADR) (فارسی)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/ROUTER_BACKENDS.md) · 🇪🇹 [am](../../../am/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇦 [ar](../../../ar/docs/architecture/ROUTER_BACKENDS.md) · 🇦🇿 [az](../../../az/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇬 [bg](../../../bg/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇩 [bn](../../../bn/docs/architecture/ROUTER_BACKENDS.md) · 🇨🇿 [cs](../../../cs/docs/architecture/ROUTER_BACKENDS.md) · 🇩🇰 [da](../../../da/docs/architecture/ROUTER_BACKENDS.md) · 🇩🇪 [de](../../../de/docs/architecture/ROUTER_BACKENDS.md) · 🇬🇷 [el](../../../el/docs/architecture/ROUTER_BACKENDS.md) · 🇪🇸 [es](../../../es/docs/architecture/ROUTER_BACKENDS.md) · 🇪🇪 [et](../../../et/docs/architecture/ROUTER_BACKENDS.md) · 🇫🇮 [fi](../../../fi/docs/architecture/ROUTER_BACKENDS.md) · 🇫🇷 [fr](../../../fr/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇪 [ga](../../../ga/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [gu](../../../gu/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [ha](../../../ha/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇱 [he](../../../he/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [hi](../../../hi/docs/architecture/ROUTER_BACKENDS.md) · 🇭🇷 [hr](../../../hr/docs/architecture/ROUTER_BACKENDS.md) · 🇭🇺 [hu](../../../hu/docs/architecture/ROUTER_BACKENDS.md) · 🇦🇲 [hy](../../../hy/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇩 [id](../../../id/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [ig](../../../ig/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇹 [it](../../../it/docs/architecture/ROUTER_BACKENDS.md) · 🇯🇵 [ja](../../../ja/docs/architecture/ROUTER_BACKENDS.md) · 🇬🇪 [ka](../../../ka/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇭 [km](../../../km/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [kn](../../../kn/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇷 [ko](../../../ko/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇹 [lt](../../../lt/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇻 [lv](../../../lv/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [ml](../../../ml/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [mr](../../../mr/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇾 [ms](../../../ms/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇹 [mt](../../../mt/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇲 [my](../../../my/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇵 [ne](../../../ne/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇱 [nl](../../../nl/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇴 [no](../../../no/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [or](../../../or/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [pa](../../../pa/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇭 [phi](../../../phi/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇱 [pl](../../../pl/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇹 [pt](../../../pt/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇴 [ro](../../../ro/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇺 [ru](../../../ru/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇰 [si](../../../si/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇰 [sk](../../../sk/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇮 [sl](../../../sl/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇸 [sr](../../../sr/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇪 [sv](../../../sv/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇪 [sw](../../../sw/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [ta](../../../ta/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [te](../../../te/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇭 [th](../../../th/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇷 [tr](../../../tr/docs/architecture/ROUTER_BACKENDS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇰 [ur](../../../ur/docs/architecture/ROUTER_BACKENDS.md) · 🇺🇿 [uz](../../../uz/docs/architecture/ROUTER_BACKENDS.md) · 🇻🇳 [vi](../../../vi/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [yo](../../../yo/docs/architecture/ROUTER_BACKENDS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/ROUTER_BACKENDS.md)

---

> **وضعیت:** پذیرفتهشده · **زمینه:** [#5670](https://github.com/diegosouzapw/OmniRoute/issues/5670)،
> [#5603](https://github.com/diegosouzapw/OmniRoute/issues/5603) · **قرارداد:** `domain/routing/routerBackends.ts`
> (رجیستری نوعدار — کد در [#5868](https://github.com/diegosouzapw/OmniRoute/pull/5868) ادغام میشود)

این ADR مشخص میکند که موتورهای `ts` (بومی)، `bifrost`، `cliproxy`، `9router` و
موتورهای سازگار با VibeProxy چگونه با یکدیگر ارتباط دارند، تا مشارکتکنندگان
دیگر دو مفهوم متمایز از نظر معماری را با هم اشتباه نگیرند. همچنین رجیستری نوعدار
معرفیشده توسط کار router-backend-registry را بهعنوان تنها منبع حقیقت برای
این مدل مستند میکند.

## تمایز اصلی — دو محور مستقل

نقش یک موتور با **دو محور مستقل** توصیف میشود که در
`RouterBackendDefinition` رجیستری با هم کدگذاری شدهاند:

1. **چرخهٔ حیات** (`RouterBackendLifecycle`) — _موتور چگونه اجرا میشود_:
   - `in-process` — درون فرایند Node متعلق به OmniRoute اجرا میشود (خط لولهٔ بومی TS).
   - `supervised` — یک فرایند فرزند محلی که OmniRoute آن را از طریق
     `ServiceSupervisor` نصب/راهاندازی/متوقف/سلامتسنجی میکند و سپس بهعنوان
     اتصال ارائهدهنده از آن استفاده میکند.
   - `external` — یک نقطهٔ پایانی HTTP که OmniRoute درخواستها را به آن ارسال
     میکند، اما آن را مدیریت **نمیکند** (با URL پایهٔ تعریفشده در متغیر محیطی پیکربندی میشود).
   - `disabled` — ثبت شده است، اما قابل انتخاب نیست.
2. **محور انتخاب** (بکاند مسیریابی رله) — _آیا رله درخواستها را به آن ارسال میکند_:
   `RelayRoutingBackend = "ts" | "bifrost" | "auto"` در
   `src/app/api/v1/relay/chat/completions/routingBackend.ts`.

اشتباهی که باید از آن اجتناب کرد: در نظر گرفتن «سرویس تعبیهشده» و «بکاند
مسیریابی» بهعنوان یک فهرست واحد. اینطور نیست. یک موتور `supervised`
(9router/cliproxy) یک **اتصال ارائهدهنده است که توسط خط لولهٔ بومی مصرف میشود**،
نه یک بکاند جایگزین برای ارسال رله. `bifrost` حالت معکوس است — یک بکاند ارسال
رله که (از نظر تاریخی) فقط `external` بوده است.

## رجیستری — تنها منبع حقیقت

قرارداد `domain/routing/routerBackends.ts` (کد در
[#5868](https://github.com/diegosouzapw/OmniRoute/pull/5868) ادغام میشود) هر موتور را دقیقاً یکبار،
همراه با چرخهٔ حیات، قابلیتها، هویت سرویس، پورت پیشفرض، پیکربندی سلامت و
پشتیبانی تلهمتری آن تعریف میکند. مصرفکنندگان بهجای پیادهسازی منطق ویژه
برای هر sidecar، موتورهای موردنظر را از طریق `getRouterBackend(id)`،
`listRouterBackends()` و `listRouterBackendsByCapability(cap)` جستوجو میکنند.

| بکاند       | چرخهٔ حیات   | سرویس (محور A) | بکاند رله (محور B)     | سلامت         | پورت پیشفرض |
| ----------- | ------------ | -------------- | ---------------------- | ------------- | ----------- |
| `ts`        | `in-process` | —              | `ts` (بومی)            | —             | —           |
| `bifrost`   | `external`¹  | —¹             | `bifrost` / `auto`     | `/health`     | —           |
| `cliproxy`  | `supervised` | `cliproxy`     | — (ارائهدهنده)         | `/v1/models`  | 8317        |
| `9router`   | `supervised` | `9router`      | — (ارائهدهنده)         | `/api/health` | 20130       |
| `vibeproxy` | `external`   | —              | — (آداپتور ارائهدهنده) | `/v1/models`  | —           |

¹ ارتقای Bifrost به یک سرویس تعبیهشدهٔ `supervised` (قابل نصب/راهاندازی
از `/api/services/bifrost/`) در
[#5817](https://github.com/diegosouzapw/OmniRoute/pull/5817) پیگیری میشود؛ تا زمانی که ادغام نشود،
Bifrost فقط `external` است (و صرفاً از طریق `BIFROST_BASE_URL` قابل دسترسی است).

`capabilities` (`chat`، `responses`، `streaming`، `tools`، `vision`،
`oauth-backed`، `dashboard-embed`، `model-sync`، `native-hot-path`) به فراخوانندگان
اجازه میدهد بر اساس توانایی واقعی هر موتور فیلتر کنند، نه اینکه برای هر شناسه
شاخههای سختکدشده تعریف کنند.

## محور A — سرویسهای تعبیهشده (سمت فرایند تحت نظارت)

- **رجیستری فرایندهای تحت نظارت:** `src/lib/services/bootstrap.ts` `SERVICES[]`
  (در حال حاضر: `9router`، `cliproxy`).
- **مالک چرخهٔ حیات:** `src/lib/services/ServiceSupervisor.ts` — متد `start()` فرایند
  فرزند را ایجاد میکند، ادامهٔ کار را به موفقیت `waitForHealthy()` مشروط میکند و stdout/stderr را در یک بافر حلقوی ثبت میکند؛
  `stop()` از SIGTERM→SIGKILL استفاده میکند؛ همهٔ عملیات زیر یک قفل بهصورت سریالی اجرا میشوند.
- **نوع اجتماع وضعیتها** (`src/lib/services/types.ts`):
  `not_installed | stopped | starting | running | stopping | error`، بهعلاوهٔ یک
  `HealthState = healthy | unhealthy | unknown` مستقل از آن.
- **چرا یک فرایند جداگانه (و نه یک SDK درونفرایندی)؟** جداسازی فرایند همان چیزی است که
  امکان کنترل مستقل نصب/شروع/توقف/سلامت/لاگها را برای هر سایدکار فراهم میکند و اجازه میدهد
  محافظ ایجاد فرایند روی loopback اعمال شود. مدلسازی یک آداپتور درونفرایندی جزو کارهای آینده است —
  پرچم قابلیت `native-hot-path` محل بیان چنین قابلیتی خواهد بود.

### قرارداد مسیر چرخهٔ حیات (`/api/services/<tool>/…`)

کدهای وضعیت **عامدانه مختص وضعیت/فعل/مسیر هستند** — این یک قرارداد است، نه
ناسازگاری:

| فراخوانی                     | شرط                                       | وضعیت                                |
| ---------------------------- | ----------------------------------------- | ------------------------------------ |
| `POST .../start`             | سرویس در وضعیت `not_installed`            | **409** (پیششرط)                     |
| `POST .../stop`              | از قبل متوقف شده است                      | **200** (عملیات بدون اثرِ تکرارپذیر) |
| `GET .../status`             | موفق                                      | **200** (`live ?? row ?? "unknown"`) |
| `POST .../start`             | شکست در ایجاد فرایند                      | **503** (موقتی)                      |
| `GET .../status`, `.../stop` | خطای مدیریتنشده                           | **500**                              |
| `GET /api/services/<x>/logs` | ابزار ناشناختهٔ `<x>`                     | **404** `Service '<x>' not found`    |
| `GET .../status?reveal=key`  | نبود `X-Reveal-Confirm: yes`              | **403** (فقط 9router)                |
| **هر** `/api/services/*`     | فراخواننده خارج از loopback/LAN خصوصی است | **403 LOCAL_ONLY**                   |

ساختار بدنهٔ همهٔ خطاها توسط `createErrorResponse()` تعیین میشود →
`{ error: { message, type }, requestId }`، که در آن `type` از کد وضعیت مشتق میشود
(`500→server_error`، `404→not_found`، `409→conflict`، و در غیر این صورت `invalid_request`) و
تمایزدهندهای قابل استفاده توسط ماشین است. پیامها از قبل پاکسازی میشوند
(`sanitizeErrorMessage()`، قانون سختگیرانهٔ شمارهٔ 12).

**محافظ loopback** رایجترین منبع یک `403` است: `/api/services/` در
`LOCAL_ONLY_API_PREFIXES` (`src/server/authz/routeGuard.ts`) قرار دارد و
`src/server/authz/policies/management.ts` هر فراخوانندهٔ غیر-loopback / خارج از LAN خصوصی را
**پیش از احراز هویت** رد میکند، زیرا این مسیرها فرایندهای فرزند ایجاد میکنند (قوانین سختگیرانهٔ 15
و 17). دسترسی به آنها از طریق یک تونل عمومی طبق طراحی منجر به `403` میشود.

## محور B — بکاند مسیریابی رله (سمت توزیع)

فقط مسیر پراکسی رلهٔ `/api/v1/relay/chat/completions` یک بکاند توزیع را
انتخاب میکند؛ سطح اصلی `/api/v1/chat/completions` هرگز به
`routingBackend.ts` مراجعه نمیکند.

- **انتخاب** (`resolveRelayRoutingBackend`): یک کلید سراسری واحد در متغیر محیطی —
  `OMNIROUTE_RELAY_BACKEND` / `RELAY_ROUTING_BACKEND` ∈ {`ts`, `bifrost`, `auto`}.
  اگر تنظیم نشده باشد، زمانی که Bifrost پیکربندی و فعال است مقدار `auto`، و در غیر این صورت `ts` انتخاب میشود.
- **رفتار:**
  - `bifrost` (اجباری): شکست Bifrost → خطای قطعی `502`، بدون بازگشت جایگزین.
  - `auto`: ابتدا Bifrost را امتحان میکند و در صورت شکست/دورهٔ انتظار، بدون اعلام به پیادهسازی بومی منتقل میشود.
  - `ts` / پس از بازگشت جایگزین: خط لولهٔ بومی مترجم/اجراکنندهٔ `open-sse`.
- **دورهٔ انتظار:** دورهٔ انتظار پس از شکست برای هر `baseUrl` در `bifrostCooldown.ts`.

انتخاب در حال حاضر **در سطح رله همهیاهیچ است** — در `release/v3.8.43` هیچ جابهجایی موتور
بهازای ارائهدهنده یا بهازای درخواست وجود ندارد. دروازهٔ بهازای درخواست توسط
کار مربوط به مانیفست سایدکار در حال اضافهشدن است
([#5869](https://github.com/diegosouzapw/OmniRoute/pull/5869) مانیفست +
[#5870](https://github.com/diegosouzapw/OmniRoute/pull/5870) `shouldTryBifrostForRequest`)،
که به `auto` اجازه میدهد فقط ارائهدهندگان واجد شرایط در مانیفست را از طریق Bifrost مسیریابی کند.

## یکپارچهسازی داشبورد

داشبورد سرویسها هر ۵ ثانیه یکبار از طریق
`src/app/(dashboard)/dashboard/providers/services/hooks/useServiceStatus.ts`
نشانی `GET /api/services/<tool>/status` را پیمایش میکند و
`{ tool, state, pid, port, health, installedVersion, latestVersion,
updateAvailable, autoStart, … }` را برمیگرداند. هیچ ارائهدهندهٔ مشترکی برای زمینهٔ دسترسپذیری وجود ندارد —
هر مؤلفه، هوک را جداگانه برای هر ابزار فراخوانی میکند. در صورت `!res.ok`، هوک در حال حاضر فقط
`HTTP <status>` را نمایش میدهد؛ نگاشت فیلد `error.type` به توضیحی قابلفهم برای کاربر،
یک بهبود تجربهٔ کاربریِ ثبتشده است، نه تغییری در قرارداد.

## پیامدها

- موتورهای جدید یکبار در `ROUTER_BACKENDS` ثبت میشوند؛ مصرفکنندگان بدون نیاز به
  شاخههای جدید برای هر شناسه، از طریق پرسوجوهای قابلیت به آنها دسترسی پیدا میکنند.
- پاسخ پرسش «آیا این یک سرویس است یا یک بکاند مسیریابی؟» را فیلد `lifecycle` مشخص میکند،
  نه فهرستی که یک شناسه بهطور اتفاقی در آن ظاهر شده است.
- نظارت Bifrost (#5817) و مهاجرت مسیر داغ بومی (#5670) بهجای در نظر گرفتن
  حالتهای ویژه برای هر sidecar، بر این قرارداد مشترک بنا میشوند.
