# CORS Configuration & Security (فارسی)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CORS.md) · 🇪🇹 [am](../../../am/docs/security/CORS.md) · 🇸🇦 [ar](../../../ar/docs/security/CORS.md) · 🇦🇿 [az](../../../az/docs/security/CORS.md) · 🇧🇬 [bg](../../../bg/docs/security/CORS.md) · 🇧🇩 [bn](../../../bn/docs/security/CORS.md) · 🇧🇦 [bs](../../../bs/docs/security/CORS.md) · 🇨🇿 [cs](../../../cs/docs/security/CORS.md) · 🇩🇰 [da](../../../da/docs/security/CORS.md) · 🇩🇪 [de](../../../de/docs/security/CORS.md) · 🇬🇷 [el](../../../el/docs/security/CORS.md) · 🇪🇸 [es](../../../es/docs/security/CORS.md) · 🇪🇪 [et](../../../et/docs/security/CORS.md) · 🇫🇮 [fi](../../../fi/docs/security/CORS.md) · 🇫🇷 [fr](../../../fr/docs/security/CORS.md) · 🇮🇪 [ga](../../../ga/docs/security/CORS.md) · 🇮🇳 [gu](../../../gu/docs/security/CORS.md) · 🇳🇬 [ha](../../../ha/docs/security/CORS.md) · 🇮🇱 [he](../../../he/docs/security/CORS.md) · 🇮🇳 [hi](../../../hi/docs/security/CORS.md) · 🇭🇷 [hr](../../../hr/docs/security/CORS.md) · 🇭🇺 [hu](../../../hu/docs/security/CORS.md) · 🇦🇲 [hy](../../../hy/docs/security/CORS.md) · 🇮🇩 [id](../../../id/docs/security/CORS.md) · 🇳🇬 [ig](../../../ig/docs/security/CORS.md) · 🇮🇹 [it](../../../it/docs/security/CORS.md) · 🇯🇵 [ja](../../../ja/docs/security/CORS.md) · 🇬🇪 [ka](../../../ka/docs/security/CORS.md) · 🇰🇭 [km](../../../km/docs/security/CORS.md) · 🇮🇳 [kn](../../../kn/docs/security/CORS.md) · 🇰🇷 [ko](../../../ko/docs/security/CORS.md) · 🇱🇹 [lt](../../../lt/docs/security/CORS.md) · 🇱🇻 [lv](../../../lv/docs/security/CORS.md) · 🇮🇳 [ml](../../../ml/docs/security/CORS.md) · 🇮🇳 [mr](../../../mr/docs/security/CORS.md) · 🇲🇾 [ms](../../../ms/docs/security/CORS.md) · 🇲🇹 [mt](../../../mt/docs/security/CORS.md) · 🇲🇲 [my](../../../my/docs/security/CORS.md) · 🇳🇵 [ne](../../../ne/docs/security/CORS.md) · 🇳🇱 [nl](../../../nl/docs/security/CORS.md) · 🇳🇴 [no](../../../no/docs/security/CORS.md) · 🇮🇳 [or](../../../or/docs/security/CORS.md) · 🇮🇳 [pa](../../../pa/docs/security/CORS.md) · 🇵🇭 [phi](../../../phi/docs/security/CORS.md) · 🇵🇱 [pl](../../../pl/docs/security/CORS.md) · 🇵🇹 [pt](../../../pt/docs/security/CORS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CORS.md) · 🇷🇴 [ro](../../../ro/docs/security/CORS.md) · 🇷🇺 [ru](../../../ru/docs/security/CORS.md) · 🇱🇰 [si](../../../si/docs/security/CORS.md) · 🇸🇰 [sk](../../../sk/docs/security/CORS.md) · 🇸🇮 [sl](../../../sl/docs/security/CORS.md) · 🇷🇸 [sr](../../../sr/docs/security/CORS.md) · 🇸🇪 [sv](../../../sv/docs/security/CORS.md) · 🇰🇪 [sw](../../../sw/docs/security/CORS.md) · 🇮🇳 [ta](../../../ta/docs/security/CORS.md) · 🇮🇳 [te](../../../te/docs/security/CORS.md) · 🇹🇭 [th](../../../th/docs/security/CORS.md) · 🇹🇷 [tr](../../../tr/docs/security/CORS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CORS.md) · 🇵🇰 [ur](../../../ur/docs/security/CORS.md) · 🇺🇿 [uz](../../../uz/docs/security/CORS.md) · 🇻🇳 [vi](../../../vi/docs/security/CORS.md) · 🇳🇬 [yo](../../../yo/docs/security/CORS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CORS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CORS.md)

---

OmniRoute کنترل میکند که کدام **مبدأهای مرورگر** بتوانند پاسخهای بینمبدأیی را
بر اساس یک فهرست مجاز واحد و متمرکز بخوانند. این مدل بهطور پیشفرض **بسته و بازدارنده** است:
تا زمانی که مبدأیی را صراحتاً مجاز نکنید، هیچ مبدأیی اجازه ندارد. این صفحه توضیح میدهد که فهرست مجاز
چگونه ارزیابی میشود، `CORS_ALLOW_ALL=true` واقعاً چه چیزهایی را در معرض دسترسی قرار میدهد
(و مهمتر از آن، چه چیزهایی را **قرار نمیدهد**)، چگونه محیط توسعه و تولید را بهشکلی ایمن
پیکربندی کنید، و داشبورد هنگام فعال بودن wildcard چه هشدار زمان اجراییای نمایش میدهد.

**مرجع اصلی:** `src/server/cors/origins.ts` (`resolveAllowedOrigin`،
`applyCorsHeaders`، `getCorsStatus`). فهرست مجاز فقط یکبار و در
middleware (`src/server/authz/pipeline.ts`) اعمال میشود — handlerهای هر route خودشان
`Access-Control-Allow-Origin` را تنظیم نمیکنند.

## نحوه تعیین یک مبدأ

برای هر درخواست، middleware مقدار `Access-Control-Allow-Origin` را
بهترتیب زیر محاسبه میکند:

1. **`CORS_ALLOW_ALL=true`** (یا `CORS_ORIGIN=*` قدیمی) ← `Origin` درخواستکننده
   را بازتاب میدهد (یا اگر header مربوط به `Origin` وجود نداشته باشد، `*` را برمیگرداند) و
   `Vary: Origin` را نیز تنظیم میکند تا cacheها بهدرستی کار کنند. همان گلوگاه
   `applyCorsHeaders()` همچنین `Vary: Accept-Encoding` را به هر پاسخ 2xx دارای body در سطح
   `/v1*`/`/v1beta*` که با token احراز هویت شده است اضافه میکند (`relaxForTokenAuth`،
   RFC 9110 §12.5.5، issue #6737)، تا cacheهای downstream/اشتراکی بتوانند گونههای
   فشرده و غیرفشرده را بهدرستی از هم تشخیص دهند.
2. در غیر این صورت، `Origin` درخواست نرمالسازی میشود (تبدیل به حروف کوچک و حذف
   slash انتهایی) و با **فهرست مجاز ادغامشده** تطبیق داده میشود:
   - متغیر محیطی **`CORS_ALLOWED_ORIGINS`** — فهرستی جداشده با ویرگول، و
   - تنظیم زمان اجرای **`corsOrigins`** (Dashboard → Security → _CORS Allowed
     Origins_) که از طریق `setRuntimeAllowedOrigins()` در
     `src/lib/config/runtimeSettings.ts` تزریق میشود.
3. نبود تطابق ← **هیچ header از نوع `Access-Control-Allow-Origin` ارسال نمیشود**. مرورگر
   خواندن بینمبدأیی را مسدود میکند. این همان رفتار پیشفرض بسته و موردنظر است.

| متغیر محیطی            | معنا                                                                                    |
| ---------------------- | --------------------------------------------------------------------------------------- |
| `CORS_ALLOWED_ORIGINS` | فهرست CSV از مبدأهای دقیقاً مجازشده (توصیهشده).                                         |
| `CORS_ALLOW_ALL`       | `true`/`1` ← بازتاب هر مبدأ (wildcard). فقط برای محیط توسعه.                            |
| `CORS_ORIGIN`          | قدیمی. `*` مانند `CORS_ALLOW_ALL` عمل میکند؛ یک مقدار منفرد به فهرست مجاز افزوده میشود. |

## مدل تهدید — `CORS_ALLOW_ALL=true` واقعاً چه چیزهایی را در معرض دسترسی قرار میدهد

هشدار عمومی OWASP («CORS با wildcard یعنی هر سایتی میتواند API شما را فراخوانی کند»)
باید جدی گرفته شود، اما دامنه مواجهه OmniRoute **محدودتر از حالت عمومی** است؛
زیرا یک واقعیت مشخص در پیادهسازی وجود دارد:

> **تابع مرکزی `applyCorsHeaders()` هرگز
> `Access-Control-Allow-Credentials` را ارسال نمیکند.** مرورگر یک پاسخ بینمبدأیی
> _دارای اعتبارنامه_ (حاوی cookie) را در اختیار صفحه قرار نمیدهد، مگر اینکه server مقدار
> `Access-Control-Allow-Credentials: true` را ارسال کند. مسیر اشتراکی CORS در OmniRoute
> هرگز این کار را انجام نمیدهد.

این موضوع برای هر سطح، حتی با `CORS_ALLOW_ALL=true`، به این معناست:

| سطح                                   | سازوکار احراز هویت                 | اثر CORS با wildcard                                                                                                                                                                                                              |
| ------------------------------------- | ---------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Dashboard / MANAGEMENT `/api/*`       | session مبتنی بر cookie            | مبدأ بازتاب داده میشود، اما مرورگر **بدون `Allow-Credentials`** خواندن دارای اعتبارنامه را **مسدود میکند**. یک سایت بینمبدأیی مخرب **نمیتواند پاسخهای احراز هویتشده داشبورد شما را بخواند** و session cookie نیز افشا نمیشود.     |
| Client API `/v1/*`، `/v1beta/*`       | header از نوع Bearer / `x-api-key` | از قبل **طبق طراحی** آزاد است (`relaxForTokenAuth`): مرورگرها هرگز `Authorization`/`x-api-key` را بهطور خودکار ضمیمه نمیکنند، بنابراین صفحه مهاجم نمیتواند کلید شما را ارائه کند. `CORS_ALLOW_ALL` این دسترسی را گستردهتر نمیکند. |
| عمومی و فقطخواندنی (`/api/health`، …) | هیچکدام                            | غیرحساس است؛ wildcard بیخطر است.                                                                                                                                                                                                  |

بنابراین مواجهه **باقیمانده** ناشی از `CORS_ALLOW_ALL=true` محدود است به: (الف)
**خواندنهای** بینمبدأیی بدون اعتبارنامه از دادههایی که از قبل بدون احراز هویت در دسترساند، و (ب)
اجازه دادن به عبور **preflight** مربوط به CORS در routeهای مدیریتی — که همچنان به احراز هویتی
نیاز دارند که یک صفحه بینمبدأیی نمیتواند فراهم کند. این وضعیت در مسیر اشتراکی CORS،
بردار ربودن session یا سرقت اعتبارنامه **نیست**.

### یک استثنای واقعی — `/api/v1/agents/`

routeهای Cloud-Agent (`/api/v1/agents/{health,credentials,tasks,tasks/[id]}`)،
headerهای CORS **مختص خودشان** را تنظیم میکنند
(`src/lib/cloudAgent/api.ts`، `getCloudAgentCorsHeaders`) و
`Access-Control-Allow-Origin: <origin>|*` را همراه با
`Access-Control-Allow-Credentials: true` **ارسال میکنند**. این تنها سطحی است که در آن
بازتاب مبدأ و اعتبارنامهها همزمان وجود دارند و این رفتار **مستقل از
`CORS_ALLOW_ALL`** است. این routeها با احراز هویت مدیریتی محافظت میشوند
(`requireManagementAuth`)؛ اپراتورهایی که داشبورد را خارج از host در دسترس قرار میدهند باید
بدانند که این تنها بخشی است که headerهای پاسخ در آن اجازه خواندن بینمبدأیی دارای اعتبارنامه را
میدهند. محدود کردن آن به یک فهرست مجاز صریح، جدا از این راهنمای CORS
پیگیری میشود.

## چکلیست محیط عملیاتی

- **هرگز در محیط عملیاتی `CORS_ALLOW_ALL=true` را تنظیم نکنید.** آن را تنظیمنشده باقی بگذارید.
- فهرستی **صریح** از مبدأها تنظیم کنید — یا از طریق متغیر محیطی یا فیلد برگه Security:

  ```bash
  CORS_ALLOWED_ORIGINS="https://app.example.com, https://admin.example.com"
  ```

- اگر OmniRoute پشت یک پراکسی معکوس / تونل (nginx، Caddy، Cloudflare
  Tunnel، Tailscale) اجرا میشود، CORS **تنها** کنترل امنیتی شما نیست — محافظ مسیر loopback
  همچنان از مسیرهایی که قابلیت spawn دارند محافظت میکند (به
  [ROUTE_GUARD_TIERS](./ROUTE_GUARD_TIERS.md) مراجعه کنید). برای «رفع» خطای 403،
  `X-Forwarded-For: 127.0.0.1` را جعل نکنید؛ این کار دوباره راه را برای دستهای از
  آسیبپذیریهای RCE باز میکند که محافظ مسیر مسدودشان کرده است.
- وضعیت زمان اجرا را تأیید کنید: هرگاه
  `CORS_ALLOW_ALL=true` فعال باشد، داشبورد در مسیر Dashboard → Security → Authorization Inventory یک **بنر کهربایی دائمی**
  نمایش میدهد و `/api/settings/authz-inventory` نیز یک پوشش
  `cors: { allowAll, allowedOrigins }` برمیگرداند که ابزارهای پایش میتوانند آن را بهصورت دورهای بررسی کنند.

## سهولت توسعه — اجازهدادن به مبدأهای محلی مشخص

حتی در محیط توسعه نیز بهندرت به wildcard نیاز دارید. فقط به سرورهای توسعهای که استفاده میکنید اجازه دهید:

```bash
# سرورهای توسعه Vite (5173) و Next.js (3000) که یک OmniRoute محلی را فراخوانی میکنند
CORS_ALLOWED_ORIGINS="http://localhost:5173, http://localhost:3000"
```

مبدأها بدون حساسیت به بزرگی و کوچکی حروف و با نادیدهگرفتن اسلش انتهایی تطبیق داده میشوند؛ بنابراین
`http://localhost:3000` و `http://localhost:3000/` معادل هستند. همین CSV
را میتوان هنگام اجرا، بدون نیاز به راهاندازی مجدد، در **Dashboard → Security → CORS Allowed Origins**
تنظیم کرد.

## کلیدهای API در برابر نشستهای کوکی

- **Bearer / `x-api-key` (سطح استنتاج `/v1/*`):** مرورگرها هرگز
  این موارد را بهطور خودکار ضمیمه نمیکنند. CORS در اینجا مانع معناداری نیست — کلید API
  مانع اصلی است — و به همین دلیل این سطح عمداً سهلگیرانه است تا کلاینتهای مرورگر و
  Electron بتوانند پاسخهایی را بخوانند که از قبل مجاز به دریافت آنها هستند.
- **نشست کوکی (داشبورد):** با پیشفرض fail-closed **و**
  نبود `Access-Control-Allow-Credentials` در مسیر مشترک محافظت میشود. مبدأهای
  مدیریتی/داشبورد را از هرگونه پیکربندی سهلگیرانه خارج نگه دارید؛ آنها باید دقیقاً
  در حالت fail-closed باقی بمانند.

## مثال: پراکسی معکوس در جلوی OmniRoute

CORS توسط خود OmniRoute اعمال میشود؛ بنابراین پراکسی معمولاً **نباید** هدرهای
`Access-Control-*` را اضافه یا بازنویسی کند (هدرهای تکراری باعث اختلال در مرورگرها میشوند). TLS را
خاتمه دهید و درخواست را فوروارد کنید — اجازه دهید OmniRoute به preflight پاسخ دهد:

```nginx
# nginx — درخواست را به OmniRoute فوروارد کنید؛ در اینجا Access-Control-* را تزریق نکنید
location / {
    proxy_pass http://127.0.0.1:20128;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-Proto $scheme;
    # X-Forwarded-For را روی 127.0.0.1 تنظیم نکنید — این کار محافظ مسیر loopback را بیاثر میکند.
}
```

مبدأهای مجاز مرورگر را در OmniRoute (`CORS_ALLOWED_ORIGINS` یا برگه
Security) تنظیم کنید، نه در پراکسی.

## فایلهای منبع

| موضوع                                     | فایل                                                                 |
| ----------------------------------------- | -------------------------------------------------------------------- |
| حل allowlist و `getCorsStatus()`          | `src/server/cors/origins.ts`                                         |
| اعمال middleware (منبع واحد حقیقت)        | `src/server/authz/pipeline.ts`                                       |
| Settings → تزریق مبدأ در زمان اجرا        | `src/lib/config/runtimeSettings.ts`                                  |
| وضعیت زمان اجرا برای داشبورد              | `src/app/api/settings/authz-inventory/route.ts`                      |
| بنر هشدار داشبورد                         | `src/app/(dashboard)/dashboard/settings/components/AuthzSection.tsx` |
| فیلد CORS Allowed Origins                 | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`  |
| CORS مختص هر مسیر در Cloud-Agent (استثنا) | `src/lib/cloudAgent/api.ts`                                          |

## همچنین ببینید

- [سطوح محافظ مسیر](./ROUTE_GUARD_TIERS.md) — اعمال محدودیت loopback برای
  مسیرهای دارای قابلیت spawn (کنترلی مجزا و مکمل).
- [راهنمای مجوزدهی](../architecture/AUTHZ_GUIDE.md) — خط لولهٔ کامل احراز هویت.
