# Authorization Guide (العربية)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/AUTHZ_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/AUTHZ_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/AUTHZ_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/AUTHZ_GUIDE.md)

---

> **مصدر الحقيقة:** `src/server/authz/`، `src/shared/constants/publicApiRoutes.ts`، `src/lib/api/requireManagementAuth.ts`، `src/shared/utils/apiAuth.ts`
> **آخر تحديث:** 2026-06-28 — v3.8.40

يحتوي OmniRoute على مسار معالجة للتفويض يراعي المسارات ويتحكم في كل طلب API. ويكون التصنيف **حتميًا** و**مغلقًا افتراضيًا عند الفشل** — فكل ما يتعذر تصنيفه ينتهي به المطاف ضمن `MANAGEMENT` ويتطلب جلسة أو رمزًا مميزًا بمستوى الإدارة. تشرح هذه الصفحة النموذج للمهندسين الذين يصونون المسارات أو يصممون نقاط نهاية جديدة.

![مسار معالجة AuthZ (3 فئات للمسارات + تقييم السياسة)](../diagrams/exported/authz-pipeline.svg)

> المصدر: [diagrams/authz-pipeline.mmd](../diagrams/authz-pipeline.mmd)

## وضعا المصادقة

### 1. مفتاح API ‏(Bearer)

يُستخدم لواجهات API الخاصة بالعملاء والمتوافقة مع OpenAI/Anthropic/Gemini، وكذلك لبعض مسارات الإدارة عندما يكون للمفتاح نطاق `manage`.

```
Authorization: Bearer <api-key>
```

يتم التحقق منه بواسطة `isValidApiKey()` / `extractApiKey()` في `src/sse/services/auth.ts`، وتُعاد تصديرهما عبر `src/shared/utils/apiAuth.ts`. يقبل المدقق أيضًا متغيري البيئة `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` بوصفهما مفتاحي تمرير دائمين (المشكلة #1350).

### 2. جلسة لوحة المعلومات (ملف تعريف الارتباط auth_token)

تُستخدم لصفحات لوحة المعلومات وعمليات الإدارة.

```
Cookie: auth_token=<JWT signed with JWT_SECRET>
```

لا يُعد ملف تعريف الارتباط جلسةً إلا عندما يتم التحقق من JWT **ويحمل** `authenticated: true`
(`src/shared/utils/dashboardSessionToken.ts` ← `verifyDashboardSessionToken`). يمر كل
مستهلك لملف تعريف الارتباط (حارس المسار، وتحديث مسار معالجة التفويض، ومصافحة WebSocket، والخادم
المباشر، و`/api/settings/require-login`، و`/api/auth/status`) عبر تلك الدالة المساعدة.
توجد رموز JWT أخرى موقعة باستخدام `JWT_SECRET` — إذ يُصدر تمرير Cursor CLI
رموزًا تحمل `iss "omniroute" / aud "cursor-cli"` لحاملي المفاتيح — ولا تُعد جلسات مطلقًا
(#13298).

يتم التحقق منها بواسطة `isDashboardSessionAuthenticated()` في `src/shared/utils/apiAuth.ts`. يُحدّث مسار المعالجة JWT تلقائيًا عندما يتبقى أقل من 7 أيام من مدة صلاحيته البالغة 30 يومًا.

تقبل بعض مسارات الإدارة **أيًا من** الوضعين: ملف تعريف ارتباط أو `Bearer <key>` عندما يكون لمفتاح API نطاق `manage` (أو `admin`). وهذا ما يتيح سير عمل «القابل للتهيئة عبر استدعاءات API» المضاف في v3.8.

#### بوابة تسجيل دخول OIDC اختيارية (#6973)

يدعم تسجيل دخول مسؤول لوحة المعلومات أيضًا تدفق OIDC ‏(OpenID Connect) **اختياري التفعيل**
إلى جانب تسجيل الدخول الافتراضي بكلمة المرور — ولا تتم إزالة تسجيل الدخول بكلمة المرور مطلقًا، بل
يُستكمل فقط:

- يكون معطلًا ما لم تكن `settings.oidcEnabled === true` **و**تكون جميع القيم `oidcIssuer` /
  `oidcClientId` / `oidcClientSecret` مهيأة (الإعدادات ← المصادقة).
  وإلا، فيُرجع `GET /api/auth/oidc/login` الحالة `400`.
- يكتشف `GET /api/auth/oidc/login` قيمة `authorization_endpoint` من
  `/.well-known/openid-configuration` الخاص بجهة الإصدار (مع الرجوع احتياطيًا إلى
  `<issuer>/authorize`)، وينشئ URI لإعادة التوجيه من الطلب الوارد
  (مع مراعاة `x-forwarded-proto`)، ثم يعيد التوجيه إلى موفر الهوية IdP مع قيمة `state`
  عشوائية مخزنة في ملف تعريف ارتباط `oidc_state` ذي السمة `httpOnly`.
- يتحقق `GET /api/auth/oidc/callback` من `state`، ويستبدل رمز التفويض،
  ويتحقق من توقيع رمز ID عبر JWKS الخاص بجهة الإصدار
  (`createRemoteJWKSet` من `jose`، مع التخزين المؤقت لكل URI خاص بـJWKS)، مع إجراء عمليات تحقق
  من `issuer`/`audience`. تطابق قائمة السماح الاختيارية `oidcAllowedSubjects` مطالبة
  `sub` في الرمز أو مطالبة `email` — ولا تُقبل مطالبة البريد الإلكتروني إلا عندما تكون
  `email_verified === true`، ولذلك لا يمكن لبريد إلكتروني غير متحقق منه لدى موفر الهوية IdP تجاوز
  البوابة مطلقًا.
- عند النجاح، يُصدر التدفق رمز JWT ‏`auth_token` **نفسه تمامًا** بصلاحية 30 يومًا، وهو الرمز الذي
  يصدره تسجيل الدخول بكلمة المرور (`src/app/api/auth/login/route.ts`)، ولذلك يبقى باقي
  مسار معالجة جلسة لوحة المعلومات (التحديث التلقائي، وسمات ملفات تعريف الارتباط) دون تغيير —
  إذ لا يستبدل OIDC سوى كيفية إصدار ملف تعريف الارتباط، وليس الصلاحيات التي يمنحها.

## فئات المسارات

يعرّف `src/server/authz/types.ts` ثلاث فئات؛ وأي مسار لا يمكن تصنيفه بشكل حتمي يعود افتراضيًا إلى `MANAGEMENT`.

| الفئة        | الوصف                                                                                                                                                                       | المصادقة المطلوبة                                             |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| `PUBLIC`     | مسارات آمنة صراحةً — تسجيل الدخول، وتسجيل الخروج، والحالة، والتهيئة، والتحقق من السلامة، والتمهيد للإعداد الأولي.                                                           | لا شيء                                                        |
| `CLIENT_API` | نقاط نهاية تقديم النماذج — `/api/v1/*`، و`/api/v1beta/*`، بالإضافة إلى الأسماء البديلة `/v1/*`، و`/v1beta/*`، و`/chat/completions`، و`/responses`، و`/models`، و`/codex/*`. | مفتاح Bearer عند تمكين علامة الميزة الفعلية `REQUIRE_API_KEY` |
| `MANAGEMENT` | صفحات لوحة المعلومات، والإعدادات، ومزوّدو الخدمة، والمفاتيح، ونقاط نهاية الإدارة والتشخيص.                                                                                  | جلسة لوحة المعلومات أو Bearer بنطاق `manage`                  |

## خط المعالجة

```
الطلب الوارد → src/proxy.ts
  → runAuthzPipeline() في src/server/authz/pipeline.ts
    1. إزالة الترويسات الداخلية الموثوقة (x-omniroute-auth-*, x-omniroute-route-class)
    2. إنشاء معرّف للطلب، وتصنيف المسار عبر classifyRoute()
    3. إذا كان pathname == "/" → إعادة التوجيه إلى /dashboard
    4. إذا كان النظام في وضع التفريغ (إيقاف تشغيل سلس) وكان المسار /api/* → 503
    5. إذا لم تكن الطريقة GET وكان المسار /api/* → تطبيق حاجز checkBodySize()
    6. إذا كانت الطريقة OPTIONS → استجابة تمهيدية لـ CORS بالحالة 204
    7. إذا كان options.enforce == false → تمرير الطلب مع ترويسات فئة المسار
    8. خلاف ذلك: POLICIES[routeClass].evaluate(ctx)
       - السماح  → تعيين x-omniroute-auth-{kind,id,label,scopes} → NextResponse.next()
       - الرفض → خطأ JSON يتضمن correlation_id (صفحات لوحة المعلومات → 302 /login)
```

تُزال الترويسات الداخلية الموثوقة (المعرّفة في `src/server/authz/headers.ts`) **من الطلبات الواردة** قبل التصنيف — ولا يمكن للعملاء تعبئة `x-omniroute-auth-*` مسبقًا لانتحال هوية جهة ما.

### عقود السياسات

لكل فئة مسار سياسة في `src/server/authz/policies/`:

- **`publicPolicy`** (`policies/public.ts`) — تعيد دائمًا `allow({ kind: "anonymous", id: "anonymous" })`.
- **`clientApiPolicy`** (`policies/clientApi.ts`) — تستخرج Bearer وتتحقق منه عبر `validateApiKey()`. ولا تنتقل إلى الوصول المجهول إلا عند تعطيل علامة الميزة الفعلية `REQUIRE_API_KEY`. تُحدَّد العلامة الفعلية من خلال `isRequireApiKeyEnabled()` (`تجاوز علامة الميزة في قاعدة البيانات > process.env.REQUIRE_API_KEY > القيمة الافتراضية`)، بحيث تتحكم علامات الميزات في لوحة المعلومات ومتغيرات البيئة في `/api/v1/*`، و`/api/v1beta/*`، والأسماء البديلة بشكل متسق؛ وتؤدي إخفاقات أداة الحل إلى الرفض الآمن. تسمح بطلبات جلسة لوحة المعلومات على مسارات واجهة API الخاصة بالعميل (بما فيها `/api/v1/models`، الذي يستخدمه كتالوج النماذج في لوحة المعلومات).
- **`managementPolicy`** (`policies/management.ts`) — تقبل جلسة لوحة المعلومات، أو طلبات مزامنة النماذج الداخلية (المطابَقة مع `/api/providers/[name]/(sync-models|models)`)، أو تتخطى التحقق بالكامل إذا أعادت `isAuthRequired()` القيمة false. تعيد 403 (`AUTH_001`) عند وجود رمز Bearer لكنه غير صالح، وتعيد 401 خلاف ذلك. كما تفرض مستويات حراسة المسارات (LOCAL_ONLY / ALWAYS_PROTECTED) قبل أي فرع للمصادقة — راجع [مستويات حراسة المسارات](../security/ROUTE_GUARD_TIERS.md). يمكن الوصول إلى مسارات LOCAL_ONLY الموجودة في `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` (حاليًا: `/api/mcp/`) من خارج عنوان الاسترجاع المحلي عندما يحمل مفتاح Bearer النطاق `manage`؛ وتظل جميع مسارات LOCAL_ONLY الأخرى مقتصرة بشكل صارم على عنوان الاسترجاع المحلي بغض النظر عن النطاق.

تعيد السياسة الناجحة `AuthSubject` بحيث تكون `kind ∈ { client_api_key, dashboard_session, management_key, anonymous }`. ويمكن للمعالِجات اللاحقة قراءته عبر `assertAuth(request, "CLIENT_API")` في `src/server/authz/assertAuth.ts` بدلًا من إعادة تنفيذ منطق المصادقة.

## قائمة المسارات العامة

الملف `src/shared/constants/publicApiRoutes.ts` هو قائمة السماح الصريحة:

تُقسَّم القائمة حسب **الشكل**، وهذا التقسيم ضروري للأمان (GHSA-74g9-q8f6-793h): تتم مطابقة البادئة باستخدام
`startsWith()`، ولذلك فإنها تطابق أيضًا كل مسار مجاور يشترك معها في المحارف الأولى.
أدّى استخدام `/api/usage/om-usage` كبادئة إلى جعل `/api/usage/om-usage<anything>` عامًا، ويحوّل Next ذلك
إلى `/api/usage/[connectionId]` — وهو معالج لا يملك آلية مصادقة خاصة به.

```ts
// أشجار فرعية فعلية. يجب أن ينتهي كل إدخال بـ "/" (ويتحقق من ذلك اختبار وحدة).
PUBLIC_API_ROUTE_PREFIXES = [
  "/api/auth/oidc/",
  "/api/v1/", // يُعامل على أنه CLIENT_API في classify، وليس عامًا «من دون مصادقة»
  "/api/oauth/",
  "/api/codex/connect/",
  "/api/telegram/",
  "/api/cursor-cli/",
];

// مسارات منفردة، تُطابق بصورة تامة (مع شرطة مائلة ختامية أو من دونها).
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

// مسارات منفردة للقراءة فقط تستفيد أيضًا من تخفيف قيود أصل CORS.
PUBLIC_READONLY_CORS_API_ROUTES = [
  "/api/health/ping",
  "/api/monitoring/health",
  "/api/settings/require-login",
];

// مسار منفرد للقراءة فقط من دون تخفيف قيود CORS.
PUBLIC_READONLY_API_ROUTES_EXACT = new Set(["/api/health"]);

PUBLIC_READONLY_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
```

تكون مسارات القراءة فقط عامة **فقط** مع الطرق الآمنة. ملاحظة: تستثني `classifyRoute()` المسارين `/api/v1/*` و`/api/v1beta/*` من الرجوع الافتراضي إلى PUBLIC — إذ يُصنَّفان دائمًا على أنهما `CLIENT_API` كي تظل سياسة مفتاح Bearer مطبقة.

## إضافة مسار جديد

### النمط 1 — نقطة نهاية عامة لواجهة API الخاصة بالعميل (مصادقة Bearer)

تُصنَّف المسارات الواقعة تحت `/api/v1/` و`/api/v1beta/` تلقائيًا على أنها `CLIENT_API`. تفرض البرمجية الوسيطة التحقق من Bearer؛ ولا تحتاج معالجات المسارات إلى تكراره، لكن يمكنها قراءة هوية صاحب الطلب عند الحاجة.

```typescript
// src/app/api/v1/your-route/route.ts
import { NextRequest, NextResponse } from "next/server";
import { assertAuth } from "@/server/authz/assertAuth";

export async function POST(req: NextRequest) {
  const subject = assertAuth(req, "CLIENT_API");
  // subject.kind === "client_api_key" | "anonymous" | "dashboard_session"
  // ... منطق المعالج
}
```

### النمط 2 — نقطة نهاية إدارية (جلسة أو Bearer + manage)

استخدم `requireManagementAuth()` من `src/lib/api/requireManagementAuth.ts`:

```typescript
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

export async function POST(request: Request) {
  const rejection = await requireManagementAuth(request);
  if (rejection) return rejection;
  // ... منطق المعالج
}
```

تعيد `requireManagementAuth()` القيمة `null` عند النجاح، أو `Response` لخطأ بصيغة JSON:

- 401 `AUTH_001` "المصادقة مطلوبة" — لا توجد أي بيانات اعتماد
- 403 — بيانات Bearer غير صالحة **أو** توجد بيانات Bearer لكن المفتاح يفتقر إلى النطاق `manage` / `admin`

تعيد `hasManageScope(scopes)` القيمة true عند وجود `"manage"` أو `"admin"`.

### النمط 3 — الإضافة إلى قائمة السماح العامة

اختر المجموعة بناءً على الشكل، لا على سهولة الاستخدام. يوضع المسار المنفرد في `PUBLIC_API_ROUTES_EXACT` (أو في `PUBLIC_READONLY_CORS_API_ROUTES` إذا كان مخصصًا لـ GET فقط)؛ ولا يوضع في `PUBLIC_API_ROUTE_PREFIXES` سوى شجرة فرعية فعلية، ويجب أن **تنتهي بـ `/`**. يؤدي وضع مسار منفرد في قائمة البادئات أيضًا إلى نشر كل مسار مجاور يشترك معه في المحارف الأولى — بما في ذلك المسارات الشقيقة ذات المقاطع الديناميكية التي تُضاف لاحقًا (GHSA-74g9-q8f6-793h). حدّث اختبارات الوحدة في `tests/unit/public-api-routes.test.ts` و`tests/unit/authz/public-route-exact-match.test.ts` و`tests/unit/authz/classify.test.ts`.

## النطاقات

تحمل مفاتيح API مصفوفة `scopes` (تُخزَّن بصيغة JSON في `api_keys.scopes`، راجع `src/lib/db/apiKeys.ts`).

### نطاق الإدارة

- `manage` / `admin` — يمنح المفتاح صلاحية الوصول إلى نقاط نهاية API الإدارية عند إرساله كرمز Bearer.

### نطاقات MCP (`src/shared/constants/mcpScopes.ts`)

تتطلب كل أداة MCP نطاقات محددة عبر `MCP_TOOL_SCOPES`. القائمة الكاملة (`MCP_SCOPE_LIST`):

```
read:health, read:combos, write:combos, read:quota, read:usage,
read:models, execute:completions, execute:search, write:budget,
write:resilience, pricing:write, read:cache, write:cache,
read:compression, write:compression, read:proxies
```

يفرض التحقق من النطاقات في `open-sse/mcp-server/server.ts` قائمة نطاقات كل أداة من خلال تمريرها إلى
`evaluateToolScopes()` بعد أن تحلّ `resolveCallerScopeContext()` النطاقات من معلومات مصادقة MCP،
أو بيانات الطلب الوصفية، أو `OMNIROUTE_MCP_SCOPES`.

## مفتاح تبديل اشتراط المصادقة

تحدد `isAuthRequired()` في `src/shared/utils/apiAuth.ts` ما إذا كان سيتم فرض **أي** مصادقة على الطلب:

- `settings.requireLogin === false` → تكون المصادقة معطلة عالميًا.
- عدم تكوين كلمة مرور **و** عدم وجود متغير البيئة `INITIAL_PASSWORD` → يسمح وضع التهيئة بمعالج الإعداد الأولي وطلبات الاسترجاع المحلي، لكن طلبات الشبكة المكشوفة تظل بحاجة إلى بيانات اعتماد.
- أي خطأ في قاعدة البيانات → يؤدي إلى الإغلاق الآمن (الأمان افتراضيًا).

يستخدم فرض مفتاح API الخاص بالعميل الدالة `isRequireApiKeyEnabled()` في `src/shared/utils/featureFlags.ts`، وليس قراءة مباشرة من `process.env.REQUIRE_API_KEY`. وهذا مهم للمثيلات المنشورة: يؤدي تبديل `REQUIRE_API_KEY` في Dashboard → Feature Flags إلى تخزين تجاوز في قاعدة البيانات، ويؤثر فورًا في `/v1/*` و`/v1beta/*` و`/models` و`/responses` و`/chat/completions` و`/codex/*` وغيرها من عمليات التحقق من مصادقة API العميل التي تشترك في هذه الدالة المساعدة. إذا تعذرت قراءة مخزن علامات الميزات، تفشل مصادقة API العميل بإغلاق آمن وتتطلب مفتاحًا.

## تغيير غير متوافق — v3.8.0

أصبحت نقطتا النهاية `/api/v1/agents/tasks/*` و`/api/resilience/model-cooldowns` **تتطلبان الآن مصادقة إدارية** (الالتزام `588a0333`). تتلقى تطبيقات العميل التي كانت ترسل سابقًا مفتاح API عاديًا من دون نطاق `manage` استجابة `403`. الترحيل: امنح المفتاح نطاق `manage` من لوحة معلومات API Keys، أو استخدم جلسة مسجَّلة الدخول في لوحة المعلومات.

## تغيير في السلوك — v3.8.2

لا يزال `/api/mcp/*` (خادم MCP البعيد) مضبوطًا افتراضيًا على LOCAL_ONLY، لكنه يقبل الآن الطلبات غير الواردة من عنوان الاسترجاع المحلي عندما يحمل الترويس `Authorization: Bearer <api-key>` نطاق `manage`. يُقيَّد هذا الاستثناء صراحةً لكل مسار عبر `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` في `src/server/authz/routeGuard.ts`؛ أما بادئة LOCAL_ONLY الشقيقة `/api/cli-tools/runtime/*` فلا يمكن تجاوزها عمدًا لأنها تستطيع تشغيل عمليات فرعية عشوائية. تستمر الطلبات المجهولة إلى `/api/mcp/*` من عناوين غير محلية في تلقي `403 LOCAL_ONLY` — ويظل الإعداد الافتراضي لأي مسار LOCAL_ONLY جديد مقتصرًا بصرامة على الاسترجاع المحلي. راجع [مستويات حارس المسارات](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out).

## الاختبار

- اختبارات الوحدة: `tests/unit/authz/` — `classify.test.ts` و`pipeline.test.ts` و`client-api-policy.test.ts` و`management-policy.test.ts` و`public-policy.test.ts`.
- قائمة السماح العامة: `tests/unit/public-api-routes.test.ts`.
- لتشغيل اختبار محدد: `node --import tsx/esm --test tests/unit/authz/classify.test.ts`.

## تصحيح الأخطاء

يُضيف خط الأنابيب دائمًا الترويسات التالية إلى الاستجابات:

```
x-request-id:               <معرّف الارتباط، يُعاد في نصوص الأخطاء>
x-omniroute-route-class:    PUBLIC | CLIENT_API | MANAGEMENT
```

بالنسبة إلى الطلبات المُصادَق عليها، تتضمن ترويسات طلب المنبع (من جهة المعالج) أيضًا:

```
x-omniroute-auth-kind:      client_api_key | dashboard_session | management_key | anonymous
x-omniroute-auth-id:        key_<آخر 4 أحرف> | "dashboard" | "anonymous"
x-omniroute-auth-label:     (اختياري)
x-omniroute-auth-scopes:    قائمة مفصولة بفواصل
```

استخدم `assertAuth(req, expectedClass)` داخل المعالجات — إذ يرمي الخطأ `AuthzAssertionError` بالرمز `AUTHZ_NOT_INITIALIZED` إذا تم تجاوز البرمجية الوسيطة (وهو أمر مفيد لاكتشاف حالات التراجع في الإعدادات ضمن الاختبارات).

## انظر أيضًا

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — علامة المصادقة لكل نقطة نهاية
- [COMPLIANCE.md](../security/COMPLIANCE.md) — سجل تدقيق لأحداث المصادقة
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md) — تفاصيل فرض نطاقات MCP
- المصدر: `src/server/authz/`، `src/lib/api/requireManagementAuth.ts`
