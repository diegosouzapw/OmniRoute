# Authorization Guide (עברית)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/AUTHZ_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/AUTHZ_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/AUTHZ_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/AUTHZ_GUIDE.md)

---

> **מקור האמת:** `src/server/authz/`, `src/shared/constants/publicApiRoutes.ts`, `src/lib/api/requireManagementAuth.ts`, `src/shared/utils/apiAuth.ts`
> **עדכון אחרון:** 2026-06-28 — v3.8.40

ל-OmniRoute יש תהליך הרשאה המודע לנתיבים, אשר מסנן כל בקשת API. הסיווג הוא **דטרמיניסטי** ופועל בגישת **כשל-סגור** — כל דבר שלא ניתן לסווג מגיע ל-`MANAGEMENT` ודורש סשן או אסימון ברמת ניהול. דף זה מסביר את המודל למהנדסים שמתחזקים נתיבים או מתכננים נקודות קצה חדשות.

![תהליך AuthZ (שלוש מחלקות נתיבים + הערכת מדיניות)](../diagrams/exported/authz-pipeline.svg)

> מקור: [diagrams/authz-pipeline.mmd](../diagrams/authz-pipeline.mmd)

## שני מצבי אימות

### 1. מפתח API ‏(Bearer)

משמש עבור ממשקי ה-API ללקוחות התואמים ל-OpenAI/Anthropic/Gemini, וכן עבור כמה נתיבי ניהול כאשר למפתח יש את ההיקף `manage`.

```
Authorization: Bearer <api-key>
```

מאומת באמצעות `isValidApiKey()` / `extractApiKey()` שבקובץ `src/sse/services/auth.ts`, ומיוצא מחדש דרך `src/shared/utils/apiAuth.ts`. המאמת מקבל גם את משתני הסביבה `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` כמפתחות העברה מתמשכים (גיליון #1350).

### 2. סשן לוח הבקרה (קובץ cookie בשם auth_token)

עבור דפי לוח הבקרה ופעולות ניהול.

```
Cookie: auth_token=<JWT signed with JWT_SECRET>
```

קובץ cookie נחשב לסשן רק כאשר ה-JWT מאומת **וגם** מכיל `authenticated: true`
‏(`src/shared/utils/dashboardSessionToken.ts` ← `verifyDashboardSessionToken`). כל
צרכן של קובץ ה-cookie (שומר הנתיב, רענון תהליך ה-authz, לחיצת היד של WebSocket, השרת
הפעיל, `/api/settings/require-login`,‏ `/api/auth/status`) עובר דרך פונקציית העזר הזו.
קיימים אסימוני JWT נוספים החתומים באמצעות `JWT_SECRET` — מנגנון ההעברה של Cursor CLI מנפיק
אסימוני `iss "omniroute" / aud "cursor-cli"` למחזיקי מפתחות — והם לעולם אינם נחשבים לסשנים
(#13298).

מאומת באמצעות `isDashboardSessionAuthenticated()` שבקובץ `src/shared/utils/apiAuth.ts`. התהליך מרענן את ה-JWT אוטומטית כאשר נותרו פחות מ-7 ימים מתוך אורך החיים שלו, שהוא 30 יום.

נתיבי ניהול מסוימים מקבלים **כל אחד** מהמצבים: קובץ cookie או `Bearer <key>` כאשר למפתח ה-API יש את ההיקף `manage` (או `admin`). זה מה שמאפשר את תהליך העבודה „ניתן להגדרה באמצעות קריאות API” שנוסף ב-v3.8.

#### שער כניסה אופציונלי באמצעות OIDC ‏(#6973)

כניסת מנהל המערכת ללוח הבקרה תומכת גם בתהליך OIDC (‏OpenID Connect) **אופציונלי**
לצד הכניסה המוגדרת כברירת מחדל באמצעות סיסמה — הכניסה באמצעות סיסמה לעולם אינה מוסרת, אלא רק
מקבלת חלופה נוספת:

- מושבת אלא אם `settings.oidcEnabled === true` **וגם** `oidcIssuer` /
  `oidcClientId` / `oidcClientSecret` מוגדרים כולם (הגדרות ← אימות).
  `GET /api/auth/oidc/login` מחזיר `400` כאשר התנאים אינם מתקיימים.
- `GET /api/auth/oidc/login` מאתר את `authorization_endpoint` מתוך
  `/.well-known/openid-configuration` של המנפיק (עם חזרה ל-
  `<issuer>/authorize`), בונה את URI ההפניה מחדש מתוך הבקשה הנכנסת
  (תוך התחשבות ב-`x-forwarded-proto`), ומפנה אל ה-IdP עם ערך `state`
  אקראי המאוחסן בקובץ cookie מסוג `oidc_state` עם `httpOnly`.
- `GET /api/auth/oidc/callback` מאמת את `state`, מחליף את קוד ההרשאה
  ומאמת את חתימת אסימון ה-ID באמצעות ה-JWKS של המנפיק
  (`createRemoteJWKSet` של `jose`, הנשמר במטמון לפי URI של JWKS), עם בדיקות
  `issuer`/`audience`. רשימת ההיתרים האופציונלית `oidcAllowedSubjects` מתאימה מול
  מאפיין `sub` של האסימון או מאפיין `email` שלו — מאפיין הדוא״ל מתקבל רק כאשר
  `email_verified === true`, כך שכתובת דוא״ל לא מאומתת אצל ה-IdP לעולם אינה יכולה לעבור
  את השער.
- לאחר הצלחה, הוא מנפיק **בדיוק את אותו** JWT מסוג `auth_token` ל-30 יום שמונפק
  בכניסה באמצעות סיסמה (`src/app/api/auth/login/route.ts`), כך ששאר
  תהליך סשן לוח הבקרה (רענון אוטומטי, דגלי cookie) נותר ללא שינוי —
  OIDC מחליף רק את האופן שבו קובץ ה-cookie מונפק, ולא את ההרשאות שהוא מעניק.

## מחלקות נתיבים

`src/server/authz/types.ts` מגדיר שלוש מחלקות; כל נתיב שלא ניתן לסווג באופן דטרמיניסטי מסווג כברירת מחדל כ-`MANAGEMENT`.

| מחלקה        | תיאור                                                                                                                                                | אימות נדרש                                                   |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| `PUBLIC`     | נתיבים שהוגדרו במפורש כבטוחים — כניסה, יציאה, סטטוס, אתחול, בדיקת תקינות ואתחול תהליך הקליטה.                                                        | ללא                                                          |
| `CLIENT_API` | נקודות קצה להגשת מודלים — `/api/v1/*`, `/api/v1beta/*`, וכן הכינויים `/v1/*`, `/v1beta/*`, `/chat/completions`, `/responses`, `/models`, `/codex/*`. | מפתח Bearer כאשר דגל היכולת האפקטיבי `REQUIRE_API_KEY` מופעל |
| `MANAGEMENT` | דפי לוח הבקרה, הגדרות, ספקים, מפתחות ונקודות קצה לניהול ולאבחון.                                                                                     | הפעלת לוח בקרה או Bearer עם תחום ההרשאה `manage`             |

## צינור העיבוד

```
בקשה נכנסת → src/proxy.ts
  → runAuthzPipeline() בתוך src/server/authz/pipeline.ts
    1. הסרת כותרות פנימיות מהימנות (x-omniroute-auth-*, x-omniroute-route-class)
    2. יצירת מזהה בקשה, סיווג הנתיב באמצעות classifyRoute()
    3. אם pathname == "/" → הפניה אל /dashboard
    4. אם המערכת בתהליך ריקון (כיבוי הדרגתי) והנתיב הוא /api/* → 503
    5. אם זו בקשה שאינה GET אל /api/* → הפעלת מנגנון ההגנה checkBodySize()
    6. אם OPTIONS → קדם-בדיקת CORS עם 204
    7. אם options.enforce == false → העברה ללא שינוי עם כותרות מחלקת הנתיב
    8. אחרת: POLICIES[routeClass].evaluate(ctx)
       - אישור  → החתמת x-omniroute-auth-{kind,id,label,scopes} → NextResponse.next()
       - דחייה → שגיאת JSON עם correlation_id (דפי לוח הבקרה → 302 /login)
```

כותרות פנימיות מהימנות (המוגדרות ב-`src/server/authz/headers.ts`) **מוסרות מבקשות נכנסות** לפני הסיווג — לקוחות אינם יכולים לאכלס מראש את `x-omniroute-auth-*` כדי להתחזות לזהות אחרת.

### חוזי מדיניות

לכל מחלקת נתיבים יש מדיניות תחת `src/server/authz/policies/`:

- **`publicPolicy`** (`policies/public.ts`) — תמיד מחזירה `allow({ kind: "anonymous", id: "anonymous" })`.
- **`clientApiPolicy`** (`policies/clientApi.ts`) — מחלצת Bearer ומאמתת אותו באמצעות `validateApiKey()`. עוברת לגישה אנונימית רק כאשר דגל היכולת האפקטיבי `REQUIRE_API_KEY` מושבת. הדגל האפקטיבי נקבע באמצעות `isRequireApiKeyEnabled()` (`עקיפת דגל יכולת במסד הנתונים > process.env.REQUIRE_API_KEY > ברירת מחדל`), כך שדגלי היכולת בלוח הבקרה ומשתני הסביבה שולטים באופן עקבי ב-`/api/v1/*`, ב-`/api/v1beta/*` ובכינויים; כשל בפותר מוביל לדחייה. מאפשרת בקשות עם הפעלת לוח בקרה בנתיבי API של לקוח (כולל `/api/v1/models`, המשמש את קטלוג המודלים של לוח הבקרה).
- **`managementPolicy`** (`policies/management.ts`) — מקבלת הפעלת לוח בקרה, בקשות פנימיות לסנכרון מודלים (המותאמות מול `/api/providers/[name]/(sync-models|models)`), או מדלגת לחלוטין אם `isAuthRequired()` מחזירה false. מחזירה 403 (`AUTH_001`) כאשר קיים אסימון Bearer אך הוא אינו תקין, ו-401 בכל מקרה אחר. בנוסף, היא אוכפת את רמות ההגנה על נתיבים (LOCAL_ONLY / ALWAYS_PROTECTED) לפני כל ענף אימות — ראו [רמות הגנה על נתיבים](../security/ROUTE_GUARD_TIERS.md). ניתן לגשת לנתיבי LOCAL_ONLY תחת `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` (כיום: `/api/mcp/`) מכתובת שאינה loopback כאשר מפתח ה-Bearer כולל את תחום ההרשאה `manage`; כל שאר נתיבי LOCAL_ONLY נותרים מוגבלים בקפדנות ל-loopback, ללא תלות בתחום ההרשאה.

מדיניות שהצליחה מחזירה `AuthSubject` עם `kind ∈ { client_api_key, dashboard_session, management_key, anonymous }`. מטפלים בהמשך השרשרת יכולים לקרוא אותו באמצעות `assertAuth(request, "CLIENT_API")` מתוך `src/server/authz/assertAuth.ts`, במקום להריץ מחדש את לוגיקת האימות.

## רשימת נתיבים ציבוריים

`src/shared/constants/publicApiRoutes.ts` היא רשימת ההיתרים המפורשת:

הרשימה מחולקת לפי **מבנה**, והחלוקה חיונית לאבטחה (GHSA-74g9-q8f6-793h): קידומת מותאמת באמצעות `startsWith()`, ולכן היא מתאימה גם לכל נתיב סמוך שחולק את התווים הפותחים שלה.
השימוש ב-`/api/usage/om-usage` כקידומת סימן את `/api/usage/om-usage<anything>` כציבורי, ו-Next מנתב זאת אל `/api/usage/[connectionId]` — מטפל ללא אימות משלו.

```ts
// תתי-עצים אמיתיים. כל רשומה חייבת להסתיים ב-"/" (נבדק באמצעות בדיקת יחידה).
PUBLIC_API_ROUTE_PREFIXES = [
  "/api/auth/oidc/",
  "/api/v1/", // מטופל כ-CLIENT_API ב-classify, ולא כציבורי "ללא אימות"
  "/api/oauth/",
  "/api/codex/connect/",
  "/api/telegram/",
  "/api/cursor-cli/",
];

// נתיבים יחידים, המותאמים באופן מדויק (עם או בלי לוכסן מסיים).
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

// נתיבים יחידים לקריאה בלבד, שמקבלים גם את ההקלה על מקור CORS.
PUBLIC_READONLY_CORS_API_ROUTES = [
  "/api/health/ping",
  "/api/monitoring/health",
  "/api/settings/require-login",
];

// נתיב יחיד לקריאה בלבד ללא ההקלה על CORS.
PUBLIC_READONLY_API_ROUTES_EXACT = new Set(["/api/health"]);

PUBLIC_READONLY_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
```

נתיבים לקריאה בלבד הם ציבוריים **רק** עבור שיטות בטוחות. שימו לב: `classifyRoute()` מחריגה את `/api/v1/*` ואת `/api/v1beta/*` מברירת המחדל של PUBLIC — הם תמיד `CLIENT_API`, כך שמדיניות מפתח ה-Bearer עדיין חלה.

## הוספת נתיב חדש

### תבנית 1 — נקודת קצה ציבורית של API ללקוח (אימות Bearer)

נתיבים תחת `/api/v1/` ו-`/api/v1beta/` מסווגים אוטומטית כ-`CLIENT_API`. שכבת התווך אוכפת את בדיקת ה-Bearer; מטפלי הנתיבים אינם צריכים לבצע אותה מחדש, אך יכולים לקרוא את הזהות אם הדבר שימושי.

```typescript
// src/app/api/v1/your-route/route.ts
import { NextRequest, NextResponse } from "next/server";
import { assertAuth } from "@/server/authz/assertAuth";

export async function POST(req: NextRequest) {
  const subject = assertAuth(req, "CLIENT_API");
  // subject.kind === "client_api_key" | "anonymous" | "dashboard_session"
  // ... לוגיקת המטפל
}
```

### תבנית 2 — נקודת קצה לניהול (הפעלה או Bearer + הרשאת ניהול)

השתמשו ב-`requireManagementAuth()` מתוך `src/lib/api/requireManagementAuth.ts`:

```typescript
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

export async function POST(request: Request) {
  const rejection = await requireManagementAuth(request);
  if (rejection) return rejection;
  // ... לוגיקת המטפל
}
```

`requireManagementAuth()` מחזירה `null` במקרה של הצלחה, או `Response` עם שגיאת JSON:

- 401 `AUTH_001` "נדרש אימות" — אין פרטי אימות כלל
- 403 — Bearer לא תקין **או** Bearer קיים, אך למפתח חסר ההיקף `manage` / `admin`

`hasManageScope(scopes)` מחזירה true עבור `"manage"` או `"admin"`.

### תבנית 3 — הוספה לרשימת ההיתרים הציבורית

בחרו את הקבוצה לפי המבנה, ולא לפי הנוחות. נתיב יחיד נכנס ל-`PUBLIC_API_ROUTES_EXACT` (או ל-`PUBLIC_READONLY_CORS_API_ROUTES` אם הוא מיועד ל-GET בלבד); רק תת-עץ אמיתי נכנס ל-`PUBLIC_API_ROUTE_PREFIXES`, והוא **חייב להסתיים ב-`/`**. הוספת נתיב יחיד לרשימת הקידומות הופכת לציבורי גם כל נתיב סמוך שחולק את התווים הפותחים שלו — כולל נתיבים אחים בעלי מקטע דינמי שיתווספו בהמשך (GHSA-74g9-q8f6-793h). עדכנו את בדיקות היחידה ב-`tests/unit/public-api-routes.test.ts`, ב-`tests/unit/authz/public-route-exact-match.test.ts` וב-`tests/unit/authz/classify.test.ts`.

## היקפי הרשאה

מפתחות API מכילים מערך `scopes` (המאוחסן כ-JSON ב-`api_keys.scopes`, ראו `src/lib/db/apiKeys.ts`).

### היקף הרשאת ניהול

- `manage` / `admin` — מעניק למפתח גישה לנקודות קצה של API הניהול כאשר הוא נשלח כ-Bearer.

### היקפי הרשאה של MCP (`src/shared/constants/mcpScopes.ts`)

כל כלי MCP דורש היקפי הרשאה מסוימים באמצעות `MCP_TOOL_SCOPES`. הרשימה המלאה (`MCP_SCOPE_LIST`):

```
read:health, read:combos, write:combos, read:quota, read:usage,
read:models, execute:completions, execute:search, write:budget,
write:resilience, pricing:write, read:cache, write:cache,
read:compression, write:compression, read:proxies
```

אכיפת היקפי ההרשאה ב-`open-sse/mcp-server/server.ts` מעבירה את רשימת היקפי ההרשאה של כל כלי אל
`evaluateToolScopes()` לאחר ש-`resolveCallerScopeContext()` פותרת את היקפי ההרשאה מפרטי האימות של MCP,
ממטא-נתוני הבקשה או מ-`OMNIROUTE_MCP_SCOPES`.

## מתג דרישת אימות

`isAuthRequired()` שב-`src/shared/utils/apiAuth.ts` קובעת אם נאכף אימות **כלשהו** עבור בקשה:

- `settings.requireLogin === false` → האימות מושבת באופן גלובלי.
- לא הוגדרה סיסמה **וגם** אין משתנה סביבה `INITIAL_PASSWORD` → מצב האתחול מאפשר את אשף ההגדרה הראשונית ובקשות loopback, אך בקשות מרשת חשופה עדיין דורשות פרטי גישה.
- כל שגיאת DB → המערכת נכשלת באופן סגור (מאובטח כברירת מחדל).

אכיפת מפתח API של לקוח משתמשת ב-`isRequireApiKeyEnabled()` שב-`src/shared/utils/featureFlags.ts`, ולא בקריאה ישירה של `process.env.REQUIRE_API_KEY`. הדבר חשוב עבור מופעים שנפרסו: החלפת המצב של `REQUIRE_API_KEY` ב-Dashboard → Feature Flags שומרת דריסה ב-DB ומשפיעה מיד על `/v1/*`,‏ `/v1beta/*`,‏ `/models`,‏ `/responses`,‏ `/chat/completions`,‏ `/codex/*` ובדיקות אימות אחרות של API הלקוח המשתמשות באותה פונקציית עזר. אם לא ניתן לקרוא את מאגר דגלי התכונות, אימות API הלקוח נכשל באופן סגור ודורש מפתח.

## שינוי שובר תאימות — v3.8.0

נקודות הקצה `/api/v1/agents/tasks/*` ו-`/api/resilience/model-cooldowns` **דורשות כעת אימות ניהול** (commit `588a0333`). לקוחות ששלחו בעבר מפתח API רגיל ללא היקף ההרשאה `manage` מקבלים `403`. מיגרציה: יש להעניק למפתח את היקף ההרשאה `manage` בלוח הבקרה API Keys, או להשתמש בהפעלת Dashboard שבה המשתמש מחובר.

## שינוי התנהגות — v3.8.2

`/api/mcp/*` (שרת ה-MCP המרוחק) עדיין מוגדר כברירת מחדל כ-LOCAL_ONLY, אך כעת מקבל בקשות שאינן loopback כאשר הכותרת `Authorization: Bearer <api-key>` מכילה את היקף ההרשאה `manage`. החריגה נשלטת במפורש עבור כל נתיב באמצעות `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` שב-`src/server/authz/routeGuard.ts`; בכוונה לא ניתן לעקוף את תחילית ה-LOCAL_ONLY המקבילה `/api/cli-tools/runtime/*`, משום שהיא יכולה להפעיל תהליכי משנה שרירותיים. בקשות אנונימיות אל `/api/mcp/*` שאינן מ-loopback ממשיכות להחזיר `403 LOCAL_ONLY` — ברירת המחדל עבור כל נתיב LOCAL_ONLY חדש נותרת loopback בלבד באופן מחמיר. ראו [רמות הגנת נתיבים](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out).

## בדיקות

- בדיקות יחידה: `tests/unit/authz/` — `classify.test.ts`,‏ `pipeline.test.ts`,‏ `client-api-policy.test.ts`,‏ `management-policy.test.ts`,‏ `public-policy.test.ts`.
- רשימת ההיתרים הציבורית: `tests/unit/public-api-routes.test.ts`.
- הרצה ממוקדת: `node --import tsx/esm --test tests/unit/authz/classify.test.ts`.

## איתור באגים

צינור העיבוד תמיד מוסיף לחותמת התגובות את הכותרות הבאות:

```
x-request-id:               <מזהה מתאם, מוחזר גם בגופי שגיאה>
x-omniroute-route-class:    PUBLIC | CLIENT_API | MANAGEMENT
```

עבור בקשות מאומתות, כותרות הבקשה המועברות לשירות שבמעלה הזרם (בצד המטפל) כוללות גם:

```
x-omniroute-auth-kind:      client_api_key | dashboard_session | management_key | anonymous
x-omniroute-auth-id:        key_<4 הספרות האחרונות> | "dashboard" | "anonymous"
x-omniroute-auth-label:     (אופציונלי)
x-omniroute-auth-scopes:    רשימה מופרדת בפסיקים
```

השתמשו ב-`assertAuth(req, expectedClass)` בתוך מטפלים — היא זורקת `AuthzAssertionError` עם הקוד `AUTHZ_NOT_INITIALIZED` אם תוכנת התווך נעקפה (שימושי לזיהוי נסיגות תצורה בבדיקות).

## ראו גם

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — סמן אימות לכל נקודת קצה
- [COMPLIANCE.md](../security/COMPLIANCE.md) — יומן ביקורת לאירועי אימות
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md) — פרטי אכיפת היקפי MCP
- קוד מקור: `src/server/authz/`, `src/lib/api/requireManagementAuth.ts`
