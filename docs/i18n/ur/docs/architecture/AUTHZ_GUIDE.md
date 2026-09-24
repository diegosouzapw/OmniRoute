# Authorization Guide (اردو)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/AUTHZ_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/AUTHZ_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/AUTHZ_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/AUTHZ_GUIDE.md)

---

> **معلومات کا ماخذ:** `src/server/authz/`, `src/shared/constants/publicApiRoutes.ts`, `src/lib/api/requireManagementAuth.ts`, `src/shared/utils/apiAuth.ts`
> **آخری بار اپ ڈیٹ کیا گیا:** 2026-09-22 — اسکوپ نیم اسپیسز MCP-SERVER.md کی طرف اشارہ کرتے ہیں

OmniRoute کے پاس ایک روٹ-آگاہ اجازت پائپ لائن ہے جو ہر API درخواست کو روکتی ہے۔ درجہ بندی **مقرر** اور **فیل-کلوزڈ** ہے — کوئی بھی چیز جس کی درجہ بندی نہیں کی جا سکتی وہ `MANAGEMENT` کے طور پر ختم ہوتی ہے اور ایک سیشن یا مینجمنٹ-گریڈ ٹوکن کا مطالبہ کرتی ہے۔ یہ صفحہ ان انجینئرز کے لیے ماڈل کی وضاحت کرتا ہے جو روٹس کو برقرار رکھتے ہیں یا نئے اینڈ پوائنٹس ڈیزائن کرتے ہیں۔

![AuthZ پائپ لائن (3 روٹ کلاسز + پالیسی کی تشخیص)](../diagrams/exported/authz-pipeline.svg)

> ماخذ: [diagrams/authz-pipeline.mmd](../diagrams/authz-pipeline.mmd)

## تصدیق کے دو طریقے

### 1. API کلید (Bearer)

OpenAI/Anthropic/Gemini سے ہم آہنگ کلائنٹ APIs اور چند انتظامی روٹس کے لیے استعمال ہوتی ہے، جب کلید کے پاس `manage` اسکوپ ہو۔

```
Authorization: Bearer <api-key>
```

اس کی توثیق `src/sse/services/auth.ts` میں موجود `isValidApiKey()` / `extractApiKey()` کے ذریعے کی جاتی ہے اور اسے `src/shared/utils/apiAuth.ts` کے ذریعے دوبارہ برآمد کیا جاتا ہے۔ توثیق کنندہ `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` ماحولیاتی متغیرات کو مستقل پاس تھرو کلیدوں کے طور پر بھی قبول کرتا ہے (مسئلہ #1350)۔

### 2. ڈیش بورڈ سیشن (auth_token کوکی)

ڈیش بورڈ صفحات اور منتظم کارروائیوں کے لیے۔

```
Cookie: auth_token=<JWT signed with JWT_SECRET>
```

کوکی صرف اسی وقت سیشن ہوتی ہے جب JWT کی توثیق ہو **اور** اس میں `authenticated: true` موجود ہو
(`src/shared/utils/dashboardSessionToken.ts` → `verifyDashboardSessionToken`)۔ کوکی استعمال کرنے والا ہر
جزو (روٹ گارڈ، authz پائپ لائن ریفریش، WebSocket ہینڈ شیک، لائیو
سرور، `/api/settings/require-login`، `/api/auth/status`) اسی معاون سے گزرتا ہے۔
`JWT_SECRET` سے دستخط شدہ دیگر JWTs بھی موجود ہیں — Cursor CLI پاس تھرو کلید رکھنے والوں کے لیے
`iss "omniroute" / aud "cursor-cli"` ٹوکن بناتا ہے — اور انہیں کبھی سیشن نہیں سمجھا جاتا
(#13298)۔

اس کی توثیق `src/shared/utils/apiAuth.ts` میں موجود `isDashboardSessionAuthenticated()` کے ذریعے ہوتی ہے۔ جب JWT کی 30 روزہ مدت میں 7 دن سے کم باقی ہوں تو پائپ لائن اسے خودکار طور پر ریفریش کرتی ہے۔

کچھ انتظامی روٹس **دونوں میں سے کوئی ایک** طریقہ قبول کرتے ہیں: کوکی یا `Bearer <key>`، بشرطیکہ API کلید کے پاس `manage` (یا `admin`) اسکوپ ہو۔ یہی v3.8 میں شامل کیے گئے "API کالز کے ذریعے قابلِ ترتیب" ورک فلو کو ممکن بناتا ہے۔

#### اختیاری OIDC لاگ اِن گیٹ (#6973)

ڈیش بورڈ کا منتظم لاگ اِن، پہلے سے طے شدہ پاس ورڈ لاگ اِن کے ساتھ ایک **اختیاری طور پر فعال کیے جانے والے** OIDC (OpenID Connect) فلو کو بھی سپورٹ کرتا ہے — پاس ورڈ لاگ اِن کبھی ہٹایا نہیں جاتا، صرف اس میں اضافہ کیا جاتا ہے:

- یہ اس وقت تک غیر فعال رہتا ہے جب تک `settings.oidcEnabled === true` **اور** `oidcIssuer` /
  `oidcClientId` / `oidcClientSecret` سب ترتیب نہ دیے گئے ہوں (Settings → Auth)۔
  بصورتِ دیگر `GET /api/auth/oidc/login`، `400` لوٹاتا ہے۔
- `GET /api/auth/oidc/login` جاری کنندہ کے
  `/.well-known/openid-configuration` سے `authorization_endpoint` دریافت کرتا ہے (دستیاب نہ ہونے پر
  `<issuer>/authorize` استعمال کرتا ہے)، آنے والی درخواست سے ری ڈائریکٹ URI بناتا ہے
  (`x-forwarded-proto` سے آگاہ)، اور صارف کو ایک بے ترتیب `state` کے ساتھ IdP پر ری ڈائریکٹ کرتا ہے،
  جسے ایک `httpOnly` `oidc_state` کوکی میں محفوظ کیا جاتا ہے۔
- `GET /api/auth/oidc/callback`، `state` کی توثیق کرتا ہے، اجازت دہی
  کوڈ کا تبادلہ کرتا ہے، اور جاری کنندہ کے JWKS کے ذریعے ID ٹوکن کے دستخط کی توثیق کرتا ہے
  (`jose` کا `createRemoteJWKSet`، ہر JWKS URI کے لیے کیش شدہ)، نیز `issuer`/`audience`
  کی جانچ کرتا ہے۔ ایک اختیاری `oidcAllowedSubjects` اجازت فہرست ٹوکن کے
  `sub` دعوے یا اس کے `email` دعوے سے مماثلت کرتی ہے — ای میل کے دعوے کو صرف اسی وقت قبول کیا جاتا ہے جب
  `email_verified === true` ہو، لہٰذا IdP پر غیر تصدیق شدہ ای میل کبھی بھی
  اس گیٹ سے نہیں گزر سکتی۔
- کامیابی کی صورت میں یہ **بالکل وہی** 30 روزہ `auth_token` JWT بناتا ہے جو پاس ورڈ
  لاگ اِن جاری کرتا ہے (`src/app/api/auth/login/route.ts`)، اس لیے ڈیش بورڈ
  سیشن پائپ لائن کا باقی حصہ (خودکار ریفریش، کوکی فلیگز) تبدیل نہیں ہوتا —
  OIDC صرف یہ بدلتا ہے کہ کوکی کیسے بنائی جاتی ہے، یہ نہیں کہ وہ کیا اختیارات دیتی ہے۔

## روٹ کلاسز

`src/server/authz/types.ts` تین کلاسز کی تعریف کرتی ہے؛ کوئی بھی روٹ جس کی قطعی طور پر درجہ بندی نہ کی جا سکے، بطور متبادل `MANAGEMENT` میں شامل ہو جاتا ہے۔

| کلاس         | تفصیل                                                                                                                                                     | مطلوبہ توثیق                                              |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| `PUBLIC`     | واضح طور پر محفوظ روٹس — لاگ اِن، لاگ آؤٹ، اسٹیٹس، ابتدائی ترتیب، صحت، آن بورڈنگ بوٹسٹریپ۔                                                                | کوئی نہیں                                                 |
| `CLIENT_API` | ماڈل فراہم کرنے والے اینڈ پوائنٹس — `/api/v1/*`، `/api/v1beta/*`، نیز عرف `/v1/*`، `/v1beta/*`، `/chat/completions`، `/responses`، `/models`، `/codex/*`۔ | مؤثر `REQUIRE_API_KEY` فیچر فلیگ فعال ہونے پر Bearer کلید |
| `MANAGEMENT` | ڈیش بورڈ صفحات، ترتیبات، فراہم کنندگان، کلیدیں، ایڈمن اور تشخیصی اینڈ پوائنٹس۔                                                                            | ڈیش بورڈ سیشن یا `manage` اسکوپ کے ساتھ Bearer            |

## پائپ لائن

```
آنے والی درخواست → src/proxy.ts
  → src/server/authz/pipeline.ts میں runAuthzPipeline()
    1. قابلِ اعتماد داخلی ہیڈرز ہٹائیں (x-omniroute-auth-*, x-omniroute-route-class)
    2. درخواست کی id بنائیں، classifyRoute() کے ذریعے روٹ کی درجہ بندی کریں
    3. اگر pathname == "/" ہو → /dashboard پر ری ڈائریکٹ کریں
    4. اگر نظام ڈرین ہو رہا ہو (منظم شٹ ڈاؤن) اور /api/* ہو → 503
    5. اگر non-GET /api/* ہو → checkBodySize() گارڈ
    6. اگر OPTIONS ہو → CORS پری فلائٹ 204
    7. اگر options.enforce == false ہو → روٹ-کلاس ہیڈرز کے ساتھ بغیر روک ٹوک آگے بھیجیں
    8. بصورتِ دیگر: POLICIES[routeClass].evaluate(ctx)
       - allow  → x-omniroute-auth-{kind,id,label,scopes} ثبت کریں → NextResponse.next()
       - reject → correlation_id کے ساتھ JSON خرابی (ڈیش بورڈ صفحات → 302 /login)
```

قابلِ اعتماد داخلی ہیڈرز (`src/server/authz/headers.ts` میں متعین) درجہ بندی سے پہلے **آنے والی درخواستوں سے ہٹا دیے جاتے ہیں** — کلائنٹس کسی سبجیکٹ کی نقالی کے لیے `x-omniroute-auth-*` کو پہلے سے شامل نہیں کر سکتے۔

### پالیسی کے معاہدے

ہر روٹ کلاس کے لیے `src/server/authz/policies/` میں ایک پالیسی موجود ہے:

- **`publicPolicy`** (`policies/public.ts`) — ہمیشہ `allow({ kind: "anonymous", id: "anonymous" })` واپس کرتی ہے۔
- **`clientApiPolicy`** (`policies/clientApi.ts`) — Bearer اخذ کرتی ہے اور `validateApiKey()` کے ذریعے اس کی توثیق کرتی ہے۔ صرف اس صورت میں anonymous پر واپس آتی ہے جب مؤثر `REQUIRE_API_KEY` فیچر فلیگ غیر فعال ہو۔ مؤثر فلیگ کا تعین `isRequireApiKeyEnabled()` (`DB فیچر فلیگ اوور رائیڈ > process.env.REQUIRE_API_KEY > طے شدہ قدر`) کے ذریعے کیا جاتا ہے، تاکہ ڈیش بورڈ فیچر فلیگز اور ماحولیاتی متغیرات `/api/v1/*`، `/api/v1beta/*` اور عرف پر یکساں طور پر لاگو ہوں؛ ریزولوَر کی ناکامیاں رسائی بند کر دیتی ہیں۔ کلائنٹ API روٹس پر ڈیش بورڈ سیشن کی درخواستوں کی اجازت دیتی ہے (بشمول `/api/v1/models`، جسے ڈیش بورڈ ماڈل کیٹلاگ استعمال کرتا ہے)۔
- **`managementPolicy`** (`policies/management.ts`) — ڈیش بورڈ سیشن، داخلی ماڈل سنک درخواستیں (`/api/providers/[name]/(sync-models|models)` کے ساتھ مماثل)، قبول کرتی ہے، یا اگر `isAuthRequired()` false واپس کرے تو مکمل طور پر نظر انداز کر دیتی ہے۔ Bearer ٹوکن موجود مگر غیر معتبر ہونے پر 403 (`AUTH_001`) واپس کرتی ہے، بصورتِ دیگر 401۔ یہ کسی بھی توثیقی شاخ سے پہلے روٹ گارڈ کے درجات (LOCAL_ONLY / ALWAYS_PROTECTED) بھی نافذ کرتی ہے — [روٹ گارڈ کے درجات](../security/ROUTE_GUARD_TIERS.md) دیکھیں۔ `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` میں موجود LOCAL_ONLY راستوں (فی الحال: `/api/mcp/`) تک non-loopback سے اس وقت رسائی حاصل کی جا سکتی ہے جب Bearer کلید کے پاس `manage` اسکوپ ہو؛ دیگر تمام LOCAL_ONLY راستے اسکوپ سے قطع نظر strict-loopback رہتے ہیں۔

ایک کامیاب پالیسی `AuthSubject` واپس کرتی ہے، جس میں `kind ∈ { client_api_key, dashboard_session, management_key, anonymous }` ہوتا ہے۔ زیریں سطح کے ہینڈلرز توثیقی منطق دوبارہ چلانے کے بجائے اسے `src/server/authz/assertAuth.ts` میں موجود `assertAuth(request, "CLIENT_API")` کے ذریعے پڑھ سکتے ہیں۔

## عوامی روٹس کی فہرست

`src/shared/constants/publicApiRoutes.ts` واضح اجازت فہرست ہے:

فہرست کو **ساخت** کے لحاظ سے تقسیم کیا گیا ہے، اور یہ تقسیم نہایت اہم ہے (GHSA-74g9-q8f6-793h): کسی prefix کو
`startsWith()` کے ذریعے match کیا جاتا ہے، لہٰذا یہ ان تمام متصل paths سے بھی match ہوتا ہے جن کے ابتدائی حروف یکساں ہوں۔
prefix کے طور پر `/api/usage/om-usage` نے `/api/usage/om-usage<anything>` کو PUBLIC قرار دے دیا، اور Next اسے
`/api/usage/[connectionId]` سے resolve کرتا ہے — ایک ایسا handler جس کی اپنی کوئی auth نہیں۔

```ts
// حقیقی subtrees۔ ہر entry کا اختتام لازماً "/" پر ہونا چاہیے (اس کی تصدیق unit test کرتا ہے)۔
PUBLIC_API_ROUTE_PREFIXES = [
  "/api/auth/oidc/",
  "/api/v1/", // classify میں CLIENT_API سمجھا جاتا ہے، "no-auth public" نہیں
  "/api/oauth/",
  "/api/codex/connect/",
  "/api/telegram/",
  "/api/cursor-cli/",
];

// منفرد routes، جنہیں عین مطابق match کیا جاتا ہے (آخر میں slash کے ساتھ یا اس کے بغیر)۔
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

// صرف پڑھنے والے منفرد routes جن پر CORS origin کی نرمی بھی لاگو ہوتی ہے۔
PUBLIC_READONLY_CORS_API_ROUTES = [
  "/api/health/ping",
  "/api/monitoring/health",
  "/api/settings/require-login",
];

// CORS نرمی کے بغیر صرف پڑھنے والا منفرد route۔
PUBLIC_READONLY_API_ROUTES_EXACT = new Set(["/api/health"]);

PUBLIC_READONLY_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
```

صرف پڑھنے والے routes صرف محفوظ methods کے لیے عوامی ہیں۔ نوٹ: `classifyRoute()`، `/api/v1/*` اور `/api/v1beta/*` کو PUBLIC fall-through سے خارج کرتا ہے — یہ ہمیشہ `CLIENT_API` ہوتے ہیں، تاکہ Bearer-key پالیسی بدستور لاگو رہے۔

## نیا Route شامل کرنا

### طریقہ 1 — عوامی client API endpoint (Bearer-auth)

`/api/v1/` اور `/api/v1beta/` کے تحت routes خودکار طور پر `CLIENT_API` کے طور پر classify ہوتے ہیں۔ middleware، Bearer check نافذ کرتا ہے؛ route handlers کو اسے دوبارہ انجام دینے کی ضرورت نہیں، لیکن مفید ہونے کی صورت میں وہ subject پڑھ سکتے ہیں۔

```typescript
// src/app/api/v1/your-route/route.ts
import { NextRequest, NextResponse } from "next/server";
import { assertAuth } from "@/server/authz/assertAuth";

export async function POST(req: NextRequest) {
  const subject = assertAuth(req, "CLIENT_API");
  // subject.kind === "client_api_key" | "anonymous" | "dashboard_session"
  // ... handler کی منطق
}
```

### طریقہ 2 — Management endpoint (session یا Bearer + manage)

`src/lib/api/requireManagementAuth.ts` سے `requireManagementAuth()` استعمال کریں:

```typescript
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

export async function POST(request: Request) {
  const rejection = await requireManagementAuth(request);
  if (rejection) return rejection;
  // ... handler کی منطق
}
```

کامیابی پر `requireManagementAuth()`، `null` واپس کرتا ہے، بصورت دیگر JSON error `Response`:

- 401 `AUTH_001` "توثیق درکار ہے" — کوئی credentials موجود نہیں
- 403 — غلط Bearer **یا** Bearer موجود ہے لیکن key کے پاس `manage` / `admin` scope نہیں

`hasManageScope(scopes)`، `"manage"` یا `"admin"` کے لیے true واپس کرتا ہے۔

### طریقہ 3 — عوامی اجازت فہرست میں شامل کرنا

set کا انتخاب سہولت کے بجائے ساخت کے لحاظ سے کریں۔ ایک route کو `PUBLIC_API_ROUTES_EXACT` میں رکھا جاتا ہے (یا صرف GET کے لیے `PUBLIC_READONLY_CORS_API_ROUTES` میں)؛ صرف حقیقی subtree کو `PUBLIC_API_ROUTE_PREFIXES` میں رکھا جاتا ہے، اور اس کا اختتام **لازماً `/` پر ہونا چاہیے**۔ prefix فہرست میں ایک منفرد route رکھنے سے ہر وہ متصل path بھی عوامی ہو جاتا ہے جس کے ابتدائی حروف یکساں ہوں — بشمول بعد میں شامل کیے جانے والے dynamic-segment siblings (GHSA-74g9-q8f6-793h)۔ `tests/unit/public-api-routes.test.ts`، `tests/unit/authz/public-route-exact-match.test.ts` اور `tests/unit/authz/classify.test.ts` میں unit tests اپ ڈیٹ کریں۔

## سکوپس

تین نام اسپیسز۔ ہر چیکر صرف اپنی سٹرنگز پڑھتا ہے۔ ساتھ ساتھ موازنہ، بشمول یہ کہ `manage` `read:compression` کے لیے `scopeMatches` میں کیوں ناکام ہوتا ہے اور ایک `read` ایکسیس ٹوکن `PATCH /api/keys/{id}` کیوں نہیں کر سکتا، [تین سکوپ نام اسپیسز](../frameworks/MCP-SERVER.md#three-scope-namespaces) میں ہے۔

API کیز میں ایک `scopes` ایرے شامل ہوتا ہے (جو `api_keys.scopes` میں JSON کے طور پر محفوظ کیا جاتا ہے، دیکھیں `src/lib/db/apiKeys.ts`)۔

### مینجمنٹ سکوپ

- `manage` / `admin` — `hasManageScope`۔ مینجمنٹ API روٹس تک بیئرر رسائی۔
- `mcp:connect`، `self:usage`، `self:account-quota`، اور `policy:bypass-provider-quota` اضافی عین مطابق میچ سکوپس ہیں۔ یہ `MANAGEMENT_API_KEY_SCOPES` سے باہر رہتے ہیں۔ `mcp:connect` صرف `/api/mcp/` نان-لوپ بیک کارو آؤٹ کو کھولتا ہے۔

### MCP ٹول سکوپس

کیٹلاگ اور میچنگ کے قواعد (یکساں سٹرنگ، یا ایک عطا کردہ سکوپ جو `*` پر ختم ہوتا ہے): [MCP ٹول سکوپس](../frameworks/MCP-SERVER.md#mcp-tool-scopes)۔ `src/shared/constants/mcpScopes.ts` میں `MCP_SCOPE_LIST` اصل ٹائپ شدہ ذیلی سیٹ ہے، نہ کہ وہ مکمل کیٹلاگ۔ نفاذ `open-sse/mcp-server/scopeEnforcement.ts` میں `resolveCallerScopeContext()` کے بعد چلتا ہے جو MCP تصدیقی معلومات، ریکویسٹ میٹا ڈیٹا، یا `OMNIROUTE_MCP_SCOPES` سے سکوپس کو حل کرتا ہے۔ یہ بند رہتا ہے جب تک کہ `OMNIROUTE_MCP_ENFORCE_SCOPES=true` نہ ہو۔

### ایکسیس ٹوکن سکوپس

`oma_live_…` ٹوکنز پر `read` / `write` / `admin`، جن کی درجہ بندی `scopeSatisfies` (`src/lib/accessTokens/scopes.ts`) کے ذریعے کی جاتی ہے۔ یہ درجہ بندی صرف ایکسیس ٹوکن کریڈینشل پر لاگو ہوتی ہے۔ [مینجمنٹ تصدیق](../guides/MANAGEMENT-AUTH.md) دیکھیں۔

## توثیق درکار ہونے کا ٹوگل

`src/shared/utils/apiAuth.ts` میں موجود `isAuthRequired()` یہ طے کرتا ہے کہ آیا کسی درخواست کے لیے **کسی بھی** قسم کی توثیق نافذ کی جائے گی:

- `settings.requireLogin === false` → توثیق عالمی طور پر غیر فعال ہے۔
- کوئی پاس ورڈ کنفیگر نہ ہو **اور** کوئی `INITIAL_PASSWORD` ماحولیاتی متغیر نہ ہو → بوٹسٹریپ موڈ آن بورڈنگ وزرڈ اور لوپ بیک درخواستوں کی اجازت دیتا ہے، لیکن نیٹ ورک پر ظاہر کی گئی درخواستوں کو پھر بھی اسناد درکار ہوتی ہیں۔
- کوئی بھی DB خرابی → رسائی بند کر دی جاتی ہے (بطور ڈیفالٹ محفوظ)۔

کلائنٹ API کی کا نفاذ `src/shared/utils/featureFlags.ts` میں موجود `isRequireApiKeyEnabled()` استعمال کرتا ہے، نہ کہ براہِ راست `process.env.REQUIRE_API_KEY` کو پڑھنا۔ یہ تعینات شدہ انسٹینسز کے لیے اہم ہے: Dashboard → Feature Flags میں `REQUIRE_API_KEY` کو ٹوگل کرنے سے DB اوور رائیڈ محفوظ ہوتا ہے اور یہ فوراً `/v1/*`، `/v1beta/*`، `/models`، `/responses`، `/chat/completions`، `/codex/*`، اور اس ہیلپر کو مشترکہ طور پر استعمال کرنے والی دیگر کلائنٹ API توثیقی جانچوں پر اثر انداز ہوتا ہے۔ اگر فیچر فلیگ اسٹور کو پڑھا نہ جا سکے تو کلائنٹ API توثیق رسائی بند کر دیتی ہے اور ایک کی درکار ہوتی ہے۔

## بریکنگ تبدیلی — v3.8.0

`/api/v1/agents/tasks/*` اور `/api/resilience/model-cooldowns` اینڈ پوائنٹس کو **اب مینجمنٹ توثیق درکار ہے** (کمیٹ `588a0333`)۔ پہلے `manage` اسکوپ کے بغیر عام API کی بھیجنے والے کلائنٹس کو `403` موصول ہوتا ہے۔ مائیگریشن: یا API Keys ڈیش بورڈ میں کی کو `manage` اسکوپ جاری کریں، یا لاگ اِن شدہ ڈیش بورڈ سیشن استعمال کریں۔

## طرزِ عمل میں تبدیلی — v3.8.2

`/api/mcp/*` (ریموٹ MCP سرور) اب بھی بطور ڈیفالٹ LOCAL_ONLY ہے، لیکن اب غیر لوپ بیک درخواستیں قبول کرتا ہے جب `Authorization: Bearer <api-key>` ہیڈر میں `manage` اسکوپ موجود ہو۔ اس استثنا کو `src/server/authz/routeGuard.ts` میں `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` کے ذریعے واضح طور پر ہر پاتھ کے لیے گیٹ کیا گیا ہے؛ اس سے ملتا جلتا LOCAL_ONLY پری فکس `/api/cli-tools/runtime/*` دانستہ طور پر بائی پاس نہیں کیا جا سکتا کیونکہ یہ من مانی ذیلی پروسیسز چلا سکتا ہے۔ غیر لوپ بیک سے `/api/mcp/*` کو بھیجی گئی گمنام درخواستیں بدستور `403 LOCAL_ONLY` واپس کرتی ہیں — کسی بھی نئے LOCAL_ONLY پاتھ کے لیے ڈیفالٹ سخت لوپ بیک ہی رہتا ہے۔ [روٹ گارڈ درجات](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out) دیکھیں۔

## ٹیسٹنگ

- یونٹ ٹیسٹس: `tests/unit/authz/` — `classify.test.ts`، `pipeline.test.ts`، `client-api-policy.test.ts`، `management-policy.test.ts`، `public-policy.test.ts`۔
- عوامی اجازت فہرست: `tests/unit/public-api-routes.test.ts`۔
- مخصوص ٹیسٹ چلائیں: `node --import tsx/esm --test tests/unit/authz/classify.test.ts`۔

## ڈیبگنگ

پائپ لائن ہمیشہ جوابات پر یہ ہیڈرز ثبت کرتی ہے:

```
x-request-id:               <correlation id، جو خرابی کے متن میں بھی دہرائی جاتی ہے>
x-omniroute-route-class:    PUBLIC | CLIENT_API | MANAGEMENT
```

توثیق شدہ درخواستوں کے لیے upstream (ہینڈلر کی جانب) درخواست کے ہیڈرز میں یہ بھی شامل ہوتے ہیں:

```
x-omniroute-auth-kind:      client_api_key | dashboard_session | management_key | anonymous
x-omniroute-auth-id:        key_<last-4> | "dashboard" | "anonymous"
x-omniroute-auth-label:     (اختیاری)
x-omniroute-auth-scopes:    کوما سے جدا کردہ فہرست
```

ہینڈلرز کے اندر `assertAuth(req, expectedClass)` استعمال کریں — اگر middleware کو بائی پاس کیا گیا ہو تو یہ `AUTHZ_NOT_INITIALIZED` کوڈ کے ساتھ `AuthzAssertionError` پھینکتا ہے (ٹیسٹس میں کنفیگریشن کی تنزلیاں پکڑنے کے لیے مفید ہے)۔

## مزید دیکھیں

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — ہر اینڈ پوائنٹ کے لیے auth مارکر
- [COMPLIANCE.md](../security/COMPLIANCE.md) — auth ایونٹس کے لیے آڈٹ لاگ
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md#three-scope-namespaces) — تین اسکوپ نیم اسپیسز اور MCP ٹول-اسکوپ کیٹلاگ
- ماخذ: `src/server/authz/`, `src/lib/api/requireManagementAuth.ts`
