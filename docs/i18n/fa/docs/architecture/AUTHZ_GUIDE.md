# Authorization Guide (فارسی)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/AUTHZ_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/AUTHZ_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/AUTHZ_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/AUTHZ_GUIDE.md)

---

> **منبع حقیقت:** `src/server/authz/`، `src/shared/constants/publicApiRoutes.ts`، `src/lib/api/requireManagementAuth.ts`، `src/shared/utils/apiAuth.ts`
> **آخرین بهروزرسانی:** 2026-06-28 — v3.8.40

OmniRoute دارای یک خط لولهٔ مجوزدهی آگاه از مسیر است که تمام درخواستهای API را کنترل میکند. طبقهبندی **قطعی** و **بسته در صورت شکست** است — هر چیزی که قابل طبقهبندی نباشد، در نهایت `MANAGEMENT` در نظر گرفته میشود و به یک نشست یا توکنی با سطح دسترسی مدیریتی نیاز دارد. این صفحه مدل را برای مهندسانی توضیح میدهد که مسیرها را نگهداری میکنند یا endpointهای جدید طراحی میکنند.

![خط لولهٔ AuthZ (۳ کلاس مسیر + ارزیابی سیاست)](../diagrams/exported/authz-pipeline.svg)

> منبع: [diagrams/authz-pipeline.mmd](../diagrams/authz-pipeline.mmd)

## دو حالت احراز هویت

### 1. کلید API (Bearer)

برای APIهای کلاینت سازگار با OpenAI/Anthropic/Gemini و چند مسیر مدیریتی، زمانی که کلید دارای scope با نام `manage` باشد، استفاده میشود.

```
Authorization: Bearer <api-key>
```

اعتبارسنجی توسط `isValidApiKey()` / `extractApiKey()` در `src/sse/services/auth.ts` انجام و از طریق `src/shared/utils/apiAuth.ts` مجدداً صادر میشود. اعتبارسنج همچنین متغیرهای محیطی `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` را بهعنوان کلیدهای عبوری دائمی میپذیرد (issue #1350).

### 2. نشست داشبورد (کوکی auth_token)

برای صفحات داشبورد و عملیات مدیریتی استفاده میشود.

```
Cookie: auth_token=<JWT signed with JWT_SECRET>
```

یک کوکی تنها زمانی نشست محسوب میشود که JWT با موفقیت تأیید شود **و** دارای `authenticated: true` باشد
(`src/shared/utils/dashboardSessionToken.ts` → `verifyDashboardSessionToken`). تمام
مصرفکنندگان این کوکی (محافظ مسیر، نوسازی خط لولهٔ authz، دستدهی WebSocket، سرور
زنده، `/api/settings/require-login`، `/api/auth/status`) از این helper عبور میکنند.
JWTهای دیگری نیز که با `JWT_SECRET` امضا شدهاند وجود دارند — قابلیت عبور Cursor CLI برای
دارندگان کلید، توکنهای `iss "omniroute" / aud "cursor-cli"` صادر میکند — و این توکنها هرگز
نشست محسوب نمیشوند (#13298).

تأیید توسط `isDashboardSessionAuthenticated()` در `src/shared/utils/apiAuth.ts` انجام میشود. هنگامی که کمتر از ۷ روز از طول عمر ۳۰روزهٔ JWT باقی مانده باشد، خط لوله آن را بهطور خودکار نوسازی میکند.

برخی مسیرهای مدیریتی **هر یک** از این دو حالت را میپذیرند: کوکی یا `Bearer <key>`، مشروط بر اینکه کلید API دارای scope با نام `manage` (یا `admin`) باشد. این همان قابلیتی است که گردش کار «قابل پیکربندی از طریق فراخوانیهای API» افزودهشده در v3.8 را ممکن میکند.

#### دروازهٔ اختیاری ورود OIDC (#6973)

ورود مدیر داشبورد در کنار ورود پیشفرض با گذرواژه، از یک جریان **اختیاری** OIDC (OpenID Connect) نیز پشتیبانی میکند — ورود با گذرواژه هرگز حذف نمیشود و فقط
تکمیل میشود:

- غیرفعال است، مگر اینکه `settings.oidcEnabled === true` باشد **و** همهٔ
  `oidcIssuer` / `oidcClientId` / `oidcClientSecret` پیکربندی شده باشند (Settings → Auth).
  در غیر این صورت، `GET /api/auth/oidc/login` مقدار `400` را برمیگرداند.
- `GET /api/auth/oidc/login`، `authorization_endpoint` را از
  `/.well-known/openid-configuration` صادرکننده کشف میکند (و در صورت عدم موفقیت، از
  `<issuer>/authorize` استفاده میکند)، URI تغییرمسیر را از درخواست ورودی
  (با در نظر گرفتن `x-forwarded-proto`) میسازد و با یک `state` تصادفی که
  در کوکی `oidc_state` از نوع `httpOnly` ذخیره شده است، کاربر را به IdP هدایت میکند.
- `GET /api/auth/oidc/callback`، مقدار `state` را اعتبارسنجی میکند، کد مجوز را
  مبادله میکند و امضای توکن ID را از طریق JWKS صادرکننده
  (`createRemoteJWKSet` متعلق به `jose`، با cache مجزا برای هر URI مربوط به JWKS) و با بررسیهای `issuer`/`audience`
  تأیید میکند. allowlist اختیاری `oidcAllowedSubjects` با claim مربوط به
  `sub` یا claim مربوط به `email` در توکن تطبیق داده میشود — claim مربوط به ایمیل فقط زمانی پذیرفته میشود که
  `email_verified === true` باشد؛ بنابراین ایمیل تأییدنشده در IdP هرگز نمیتواند
  از این دروازه عبور کند.
- در صورت موفقیت، **دقیقاً همان** JWT سیروزهٔ `auth_token` صادرشده توسط ورود با گذرواژه
  (`src/app/api/auth/login/route.ts`) ایجاد میشود؛ بنابراین سایر بخشهای
  خط لولهٔ نشست داشبورد (نوسازی خودکار و flagهای کوکی) بدون تغییر باقی میمانند —
  OIDC تنها نحوهٔ ایجاد کوکی را جایگزین میکند، نه مجوزهایی را که کوکی اعطا میکند.

## کلاسهای مسیر

فایل `src/server/authz/types.ts` سه کلاس را تعریف میکند؛ هر مسیری که نتوان آن را بهصورت قطعی طبقهبندی کرد، بهطور پیشفرض در کلاس `MANAGEMENT` قرار میگیرد.

| کلاس         | توضیحات                                                                                                                                                     | احراز هویت موردنیاز                                                |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| `PUBLIC`     | مسیرهای صراحتاً امن — ورود، خروج، وضعیت، مقداردهی اولیه، سلامت و راهاندازی اولیه فرایند پذیرش.                                                              | هیچکدام                                                            |
| `CLIENT_API` | نقاط پایانی ارائه مدل — `/api/v1/*`، `/api/v1beta/*`، بههمراه نامهای مستعار `/v1/*`، `/v1beta/*`، `/chat/completions`، `/responses`، `/models`، `/codex/*`. | کلید Bearer، زمانی که پرچم قابلیت مؤثر `REQUIRE_API_KEY` فعال باشد |
| `MANAGEMENT` | صفحات داشبورد، تنظیمات، ارائهدهندگان، کلیدها و نقاط پایانی مدیریت و عیبیابی.                                                                                | نشست داشبورد یا Bearer با حوزه دسترسی `manage`                     |

## خط لوله

```
درخواست ورودی → src/proxy.ts
  → runAuthzPipeline() در src/server/authz/pipeline.ts
    1. حذف هدرهای داخلی مورداعتماد (x-omniroute-auth-*, x-omniroute-route-class)
    2. تولید شناسه درخواست و طبقهبندی مسیر از طریق classifyRoute()
    3. اگر pathname == "/" → هدایت به /dashboard
    4. اگر در حال تخلیه (خاموشسازی تدریجی) باشد و مسیر /api/* باشد → 503
    5. اگر درخواست غیر GET به /api/* باشد → بررسی محافظ checkBodySize()
    6. اگر OPTIONS باشد → پیشدرخواست CORS با وضعیت 204
    7. اگر options.enforce == false باشد → عبور مستقیم همراه با هدرهای کلاس مسیر
    8. در غیر این صورت: POLICIES[routeClass].evaluate(ctx)
       - مجاز  → درج x-omniroute-auth-{kind,id,label,scopes} → NextResponse.next()
       - رد → خطای JSON همراه با correlation_id (صفحات داشبورد → 302 /login)
```

هدرهای داخلی مورداعتماد (تعریفشده در `src/server/authz/headers.ts`) پیش از طبقهبندی، **از درخواستهای ورودی حذف میشوند** — کلاینتها نمیتوانند برای جعل هویت یک موجودیت، `x-omniroute-auth-*` را از پیش مقداردهی کنند.

### قراردادهای سیاست

هر کلاس مسیر، یک سیاست در `src/server/authz/policies/` دارد:

- **`publicPolicy`** (`policies/public.ts`) — همیشه `allow({ kind: "anonymous", id: "anonymous" })` را برمیگرداند.
- **`clientApiPolicy`** (`policies/clientApi.ts`) — Bearer را استخراج کرده و از طریق `validateApiKey()` اعتبارسنجی میکند. تنها زمانی به حالت ناشناس بازمیگردد که پرچم قابلیت مؤثر `REQUIRE_API_KEY` غیرفعال باشد. پرچم مؤثر از طریق `isRequireApiKeyEnabled()` (`بازنویسی پرچم قابلیت پایگاه داده > process.env.REQUIRE_API_KEY > مقدار پیشفرض`) تعیین میشود تا پرچمهای قابلیت داشبورد و متغیرهای محیطی، `/api/v1/*`، `/api/v1beta/*` و نامهای مستعار را بهطور یکسان کنترل کنند؛ خطاهای تعیین مقدار باعث رد بسته درخواست میشوند. درخواستهای دارای نشست داشبورد را در مسیرهای API کلاینت مجاز میداند (از جمله `/api/v1/models` که کاتالوگ مدل داشبورد از آن استفاده میکند).
- **`managementPolicy`** (`policies/management.ts`) — نشست داشبورد یا درخواستهای داخلی همگامسازی مدل را میپذیرد (که با `/api/providers/[name]/(sync-models|models)` تطبیق داده میشوند)، یا اگر `isAuthRequired()` مقدار false برگرداند، بهطور کامل از بررسی صرفنظر میکند. اگر توکن Bearer وجود داشته باشد اما نامعتبر باشد، 403 (`AUTH_001`) و در غیر این صورت 401 برمیگرداند. همچنین پیش از هر شاخه احراز هویت، سطوح محافظ مسیر (LOCAL_ONLY / ALWAYS_PROTECTED) را اعمال میکند — به [سطوح محافظ مسیر](../security/ROUTE_GUARD_TIERS.md) مراجعه کنید. مسیرهای LOCAL_ONLY در `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` (در حال حاضر: `/api/mcp/`) زمانی از نشانی غیر loopback قابلدسترسی هستند که کلید Bearer دارای حوزه دسترسی `manage` باشد؛ سایر مسیرهای LOCAL_ONLY، صرفنظر از حوزه دسترسی، همچنان بهطور سختگیرانه به loopback محدود میمانند.

یک سیاست موفق، `AuthSubject` را با `kind ∈ { client_api_key, dashboard_session, management_key, anonymous }` برمیگرداند. کنترلکنندههای پاییندستی میتوانند بهجای اجرای مجدد منطق احراز هویت، آن را از طریق `assertAuth(request, "CLIENT_API")` در `src/server/authz/assertAuth.ts` بخوانند.

## فهرست مسیرهای عمومی

`src/shared/constants/publicApiRoutes.ts` فهرست مجاز صریح است:

این فهرست بر اساس **شکل** تقسیم شده است و این تفکیک نقشی حیاتی دارد (GHSA-74g9-q8f6-793h): یک پیشوند با `startsWith()` تطبیق داده میشود، بنابراین هر مسیر مجاوری را که نویسههای ابتدایی یکسانی داشته باشد نیز تطبیق میدهد.
قرار دادن `/api/usage/om-usage` بهعنوان پیشوند، مسیر `/api/usage/om-usage<anything>` را PUBLIC میکرد و Next آن را به `/api/usage/[connectionId]` نگاشت میکند — کنترلگری که احراز هویت مستقلی ندارد.

```ts
// زیردرختهای واقعی. هر ورودی باید با "/" پایان یابد (این موضوع با یک تست واحد بررسی میشود).
PUBLIC_API_ROUTE_PREFIXES = [
  "/api/auth/oidc/",
  "/api/v1/", // در classify بهعنوان CLIENT_API در نظر گرفته میشود، نه بهعنوان عمومیِ «بدون احراز هویت»
  "/api/oauth/",
  "/api/codex/connect/",
  "/api/telegram/",
  "/api/cursor-cli/",
];

// مسیرهای تکی که بهصورت دقیق تطبیق داده میشوند (با یا بدون اسلش انتهایی).
PUBLIC_API_ROUTES_EXACT = new Set([
  "/api/auth/login",
  "/api/auth/logout",
  "/api/auth/status",
  "/api/init",
  "/api/sync/bundle",
  "/api/cli/connect",
  "/api/usage/om-usage",
  "/api/skills/collect/chaos",
]);

// مسیرهای تکیِ فقطخواندنی که تسهیل مبدأ CORS نیز برای آنها اعمال میشود.
PUBLIC_READONLY_CORS_API_ROUTES = [
  "/api/health/ping",
  "/api/monitoring/health",
  "/api/settings/require-login",
];

// مسیر تکیِ فقطخواندنی بدون تسهیل CORS.
PUBLIC_READONLY_API_ROUTES_EXACT = new Set(["/api/health"]);

PUBLIC_READONLY_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
```

مسیرهای فقطخواندنی **فقط** برای متدهای امن عمومی هستند. توجه: `classifyRoute()` مسیرهای `/api/v1/*` و `/api/v1beta/*` را از حالت پیشفرض PUBLIC مستثنا میکند — این مسیرها همیشه `CLIENT_API` هستند تا سیاست کلید Bearer همچنان اعمال شود.

## افزودن یک مسیر جدید

### الگوی 1 — نقطه پایانی عمومی API کلاینت (احراز هویت Bearer)

مسیرهای زیر `/api/v1/` و `/api/v1beta/` بهطور خودکار بهعنوان `CLIENT_API` طبقهبندی میشوند. میانافزار بررسی Bearer را اعمال میکند؛ کنترلگرهای مسیر نیازی به تکرار آن ندارند، اما در صورت نیاز میتوانند subject را بخوانند.

```typescript
// src/app/api/v1/your-route/route.ts
import { NextRequest, NextResponse } from "next/server";
import { assertAuth } from "@/server/authz/assertAuth";

export async function POST(req: NextRequest) {
  const subject = assertAuth(req, "CLIENT_API");
  // subject.kind === "client_api_key" | "anonymous" | "dashboard_session"
  // ... منطق کنترلگر
}
```

### الگوی 2 — نقطه پایانی مدیریتی (نشست یا Bearer + manage)

از `requireManagementAuth()` در `src/lib/api/requireManagementAuth.ts` استفاده کنید:

```typescript
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

export async function POST(request: Request) {
  const rejection = await requireManagementAuth(request);
  if (rejection) return rejection;
  // ... منطق کنترلگر
}
```

`requireManagementAuth()` در صورت موفقیت `null` و در صورت خطا یک `Response` از نوع JSON برمیگرداند:

- 401 `AUTH_001` "احراز هویت الزامی است" — هیچ اعتبارنامهای ارائه نشده است
- 403 — Bearer نامعتبر است **یا** Bearer وجود دارد، اما کلید فاقد محدوده `manage` / `admin` است

`hasManageScope(scopes)` برای `"manage"` یا `"admin"` مقدار true برمیگرداند.

### الگوی 3 — افزودن به فهرست مجاز عمومی

مجموعه را بر اساس شکل انتخاب کنید، نه بر اساس سهولت. یک مسیر تکی باید در `PUBLIC_API_ROUTES_EXACT` قرار گیرد (یا برای مسیرهای فقط-GET در `PUBLIC_READONLY_CORS_API_ROUTES`)؛ تنها یک زیردرخت واقعی باید در `PUBLIC_API_ROUTE_PREFIXES` قرار گیرد و **حتماً باید به `/` ختم شود**. قرار دادن یک مسیر تکی در فهرست پیشوندها، تمام مسیرهای مجاوری را که نویسههای ابتدایی یکسانی دارند نیز عمومی میکند — از جمله مسیرهای همخانواده با سگمنت پویا که بعداً اضافه میشوند (GHSA-74g9-q8f6-793h). تستهای واحد موجود در `tests/unit/public-api-routes.test.ts`، `tests/unit/authz/public-route-exact-match.test.ts` و `tests/unit/authz/classify.test.ts` را بهروزرسانی کنید.

## محدودهها

کلیدهای API دارای یک آرایهٔ `scopes` هستند (که بهصورت JSON در `api_keys.scopes` ذخیره میشود؛ به `src/lib/db/apiKeys.ts` مراجعه کنید).

### محدودهٔ مدیریتی

- `manage` / `admin` — هنگامی که کلید بهصورت Bearer ارسال شود، دسترسی به نقاط پایانی API مدیریتی را فراهم میکند.

### محدودههای MCP (`src/shared/constants/mcpScopes.ts`)

هر ابزار MCP از طریق `MCP_TOOL_SCOPES` به محدودههای مشخصی نیاز دارد. فهرست کامل (`MCP_SCOPE_LIST`):

```
read:health, read:combos, write:combos, read:quota, read:usage,
read:models, execute:completions, execute:search, write:budget,
write:resilience, pricing:write, read:cache, write:cache,
read:compression, write:compression, read:proxies
```

اعمال محدودهها در `open-sse/mcp-server/server.ts`، پس از آنکه `resolveCallerScopeContext()` محدودهها را از اطلاعات احراز هویت MCP، فرادادهٔ درخواست یا `OMNIROUTE_MCP_SCOPES` استخراج میکند، فهرست محدودهٔ هر ابزار را به `evaluateToolScopes()` ارسال میکند.

## کلید تغییر وضعیت الزام احراز هویت

تابع `isAuthRequired()` در `src/shared/utils/apiAuth.ts` تعیین میکند که آیا **هرگونه** احراز هویت برای یک درخواست اعمال شود یا خیر:

- `settings.requireLogin === false` → احراز هویت بهصورت سراسری غیرفعال است.
- اگر هیچ گذرواژهای پیکربندی نشده باشد **و** متغیر محیطی `INITIAL_PASSWORD` نیز وجود نداشته باشد → حالت راهاندازی اولیه، ویزارد شروع به کار و درخواستهای loopback را مجاز میکند، اما درخواستهای شبکهای در معرض دسترسی همچنان به اعتبارنامه نیاز دارند.
- هرگونه خطای DB → بهصورت بسته و امن عمل میکند (امنیت بهصورت پیشفرض).

اعمال الزام کلید API سمت کلاینت از `isRequireApiKeyEnabled()` در `src/shared/utils/featureFlags.ts` استفاده میکند، نه از خواندن مستقیم `process.env.REQUIRE_API_KEY`. این موضوع برای نمونههای استقراریافته اهمیت دارد: تغییر `REQUIRE_API_KEY` در Dashboard → Feature Flags یک مقدار بازنویسیشده را در DB ذخیره میکند و بلافاصله بر `/v1/*`، `/v1beta/*`، `/models`، `/responses`، `/chat/completions`، `/codex/*` و سایر بررسیهای احراز هویت API کلاینت که از این تابع کمکی مشترک استفاده میکنند، تأثیر میگذارد. اگر خواندن از مخزن feature flag ممکن نباشد، احراز هویت API کلاینت بهصورت بسته و امن عمل کرده و به کلید نیاز خواهد داشت.

## تغییر ناسازگار — v3.8.0

نقاط پایانی `/api/v1/agents/tasks/*` و `/api/resilience/model-cooldowns` **اکنون به احراز هویت مدیریتی نیاز دارند** (commit `588a0333`). کلاینتهایی که پیشتر یک کلید API عادی را بدون محدودهٔ `manage` ارسال میکردند، پاسخ `403` دریافت میکنند. مهاجرت: یا از طریق داشبورد API Keys محدودهٔ `manage` را به کلید اختصاص دهید، یا از یک نشست واردشده در داشبورد استفاده کنید.

## تغییر رفتار — v3.8.2

`/api/mcp/*` (سرور راه دور MCP) همچنان بهصورت پیشفرض LOCAL_ONLY است، اما اکنون درخواستهای غیر-loopback را زمانی میپذیرد که هدر `Authorization: Bearer <api-key>` دارای محدودهٔ `manage` باشد. این استثنا برای هر مسیر بهطور صریح از طریق `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` در `src/server/authz/routeGuard.ts` کنترل میشود؛ پیشوند همسطح LOCAL_ONLY یعنی `/api/cli-tools/runtime/*` عمداً قابل دور زدن نیست، زیرا میتواند زیرفرایندهای دلخواه را اجرا کند. درخواستهای ناشناس به `/api/mcp/*` از مبدأ غیر-loopback همچنان پاسخ `403 LOCAL_ONLY` دریافت میکنند — حالت پیشفرض برای هر مسیر جدید LOCAL_ONLY همچنان الزام سختگیرانهٔ loopback است. به [سطوح محافظ مسیر](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out) مراجعه کنید.

## آزمایش

- آزمونهای واحد: `tests/unit/authz/` — `classify.test.ts`، `pipeline.test.ts`، `client-api-policy.test.ts`، `management-policy.test.ts`، `public-policy.test.ts`.
- فهرست مجاز عمومی: `tests/unit/public-api-routes.test.ts`.
- اجرای متمرکز: `node --import tsx/esm --test tests/unit/authz/classify.test.ts`.

## اشکالزدایی

پایپلاین همیشه پاسخها را با موارد زیر نشانهگذاری میکند:

```
x-request-id:               <شناسه همبستگی، تکرارشده در بدنه خطاها>
x-omniroute-route-class:    PUBLIC | CLIENT_API | MANAGEMENT
```

برای درخواستهای احراز هویتشده، هدرهای درخواست بالادستی (سمت هندلر) نیز شامل موارد زیر هستند:

```
x-omniroute-auth-kind:      client_api_key | dashboard_session | management_key | anonymous
x-omniroute-auth-id:        key_<چهار نویسه آخر> | "dashboard" | "anonymous"
x-omniroute-auth-label:     (اختیاری)
x-omniroute-auth-scopes:    فهرست جداشده با ویرگول
```

درون هندلرها از `assertAuth(req, expectedClass)` استفاده کنید — اگر میانافزار دور زده شده باشد، این تابع خطای `AuthzAssertionError` را با کد `AUTHZ_NOT_INITIALIZED` ایجاد میکند (که برای شناسایی پسرفتهای پیکربندی در تستها مفید است).

## همچنین ببینید

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — نشانگر احراز هویت برای هر نقطه پایانی
- [COMPLIANCE.md](../security/COMPLIANCE.md) — گزارش ممیزی رویدادهای احراز هویت
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md) — جزئیات اعمال محدوده MCP
- منبع: `src/server/authz/`، `src/lib/api/requireManagementAuth.ts`
