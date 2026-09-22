# Authorization Guide (Հայերեն)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/AUTHZ_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/AUTHZ_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/AUTHZ_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/AUTHZ_GUIDE.md)

---

> **Ճշմարտության աղբյուր՝** `src/server/authz/`, `src/shared/constants/publicApiRoutes.ts`, `src/lib/api/requireManagementAuth.ts`, `src/shared/utils/apiAuth.ts`
> **Վերջին թարմացումը՝** 2026-06-28 — v3.8.40

OmniRoute-ն ունի երթուղիները հաշվի առնող թույլտվությունների կառավարման շղթա, որը վերահսկում է API-ի յուրաքանչյուր հարցում։ Դասակարգումը **դետերմինիստական** է և **անորոշության դեպքում մերժող**․ այն ամենը, ինչը հնարավոր չէ դասակարգել, հայտնվում է `MANAGEMENT` դասում և պահանջում է սեսիա կամ կառավարման մակարդակի թոքեն։ Այս էջը բացատրում է մոդելը՝ երթուղիները սպասարկող կամ նոր վերջնակետեր նախագծող ինժեներների համար։

![AuthZ շղթա (երթուղիների 3 դաս + քաղաքականության գնահատում)](../diagrams/exported/authz-pipeline.svg)

> Աղբյուր՝ [diagrams/authz-pipeline.mmd](../diagrams/authz-pipeline.mmd)

## Նույնականացման երկու ռեժիմ

### 1. API բանալի (Bearer)

Օգտագործվում է OpenAI/Anthropic/Gemini-ի հետ համատեղելի հաճախորդային API-ների, ինչպես նաև կառավարման որոշ երթուղիների համար, երբ բանալին ունի `manage` տիրույթը։

```
Authorization: Bearer <api-key>
```

Վավերացվում է `src/sse/services/auth.ts`-ի `isValidApiKey()` / `extractApiKey()` գործառույթներով և վերաարտահանվում է `src/shared/utils/apiAuth.ts`-ի միջոցով։ Վավերացուցիչը նաև ընդունում է `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` միջավայրի փոփոխականները՝ որպես մշտական միջանցիկ բանալիներ (խնդիր #1350)։

### 2. Կառավարման վահանակի սեսիա (auth_token cookie)

Կառավարման վահանակի էջերի և ադմինիստրատիվ գործողությունների համար։

```
Cookie: auth_token=<JWT signed with JWT_SECRET>
```

Cookie-ն սեսիա է միայն այն դեպքում, երբ JWT-ն անցնում է ստուգումը **և** պարունակում է `authenticated: true`
(`src/shared/utils/dashboardSessionToken.ts` → `verifyDashboardSessionToken`)։ Cookie-ի յուրաքանչյուր
սպառող (երթուղու պաշտպանիչ, authz շղթայի թարմացում, WebSocket-ի կապի հաստատում, իրական ժամանակի
սերվեր, `/api/settings/require-login`, `/api/auth/status`) անցնում է այդ օգնական գործառույթի միջով։
Գոյություն ունեն `JWT_SECRET`-ով ստորագրված այլ JWT-ներ․ Cursor CLI-ի միջանցիկ մեխանիզմը բանալի
ունեցողների համար թողարկում է `iss "omniroute" / aud "cursor-cli"` թոքեններ, որոնք երբեք սեսիա
չեն համարվում (#13298)։

Ստուգվում է `src/shared/utils/apiAuth.ts`-ի `isDashboardSessionAuthenticated()` գործառույթով։ Շղթան ավտոմատ կերպով թարմացնում է JWT-ն, երբ դրա 30-օրյա վավերականության ժամկետից մնացել է 7 օրից պակաս։

Կառավարման որոշ երթուղիներ ընդունում են **ցանկացած** ռեժիմ՝ cookie ԿԱՄ `Bearer <key>`, երբ API բանալին ունի `manage` (կամ `admin`) տիրույթը։ Հենց սա է հնարավոր դարձնում v3.8-ում ավելացված «API կանչերի միջոցով կարգավորվող» աշխատանքային ընթացքը։

#### OIDC մուտքի ընտրովի սահմանափակում (#6973)

Կառավարման վահանակում ադմինիստրատորի մուտքը նաև աջակցում է **ըստ ցանկության միացվող** OIDC (OpenID Connect) հոսքին՝
լռելյայն գաղտնաբառով մուտքի հետ մեկտեղ․ գաղտնաբառով մուտքը երբեք չի հեռացվում, այլ միայն
լրացվում է՝

- Անջատված է, եթե `settings.oidcEnabled === true` չէ **և** `oidcIssuer` /
  `oidcClientId` / `oidcClientSecret` բոլորն էլ կարգավորված չեն (Settings → Auth)։
  Հակառակ դեպքում `GET /api/auth/oidc/login`-ը վերադարձնում է `400`։
- `GET /api/auth/oidc/login`-ը հայտնաբերում է `authorization_endpoint`-ը թողարկողի
  `/.well-known/openid-configuration`-ից (անհաջողության դեպքում օգտագործում է
  `<issuer>/authorize`), մուտքային հարցումից կառուցում է վերահղման URI-ն
  (`x-forwarded-proto`-ն հաշվի առնելով) և պատահական `state`-ով վերահղում է դեպի IdP,
  որը պահվում է `httpOnly` `oidc_state` cookie-ում։
- `GET /api/auth/oidc/callback`-ը վավերացնում է `state`-ը, փոխանակում է նույնականացման
  կոդը և թողարկողի JWKS-ի միջոցով ստուգում ID թոքենի ստորագրությունը
  (`jose`-ի `createRemoteJWKSet`, քեշավորված յուրաքանչյուր JWKS URI-ի համար)՝ կատարելով `issuer`/`audience`
  ստուգումներ։ Ոչ պարտադիր `oidcAllowedSubjects` թույլատրված արժեքների ցանկը համեմատվում է թոքենի
  `sub` դաշտի կամ դրա `email` դաշտի հետ․ `email` դաշտը հաշվի է առնվում միայն այն դեպքում, երբ
  `email_verified === true`, ուստի IdP-ում չստուգված էլփոստի հասցեն երբեք չի կարող
  անցնել սահմանափակումը։
- Հաջողության դեպքում այն թողարկում է գաղտնաբառով մուտքի կողմից թողարկվող **ճիշտ նույն** 30-օրյա `auth_token` JWT-ն
  (`src/app/api/auth/login/route.ts`), ուստի կառավարման վահանակի
  սեսիայի մնացած շղթան (ավտոմատ թարմացում, cookie-ի դրոշներ) մնում է անփոփոխ․
  OIDC-ն փոխարինում է միայն cookie-ի թողարկման եղանակը, ոչ թե դրա տրամադրած թույլտվությունները։

## Երթուղիների դասեր

`src/server/authz/types.ts`-ը սահմանում է երեք դաս․ ցանկացած երթուղի, որը հնարավոր չէ միարժեք դասակարգել, լռելյայն դասվում է `MANAGEMENT`-ի տակ։

| Դաս          | Նկարագրություն                                                                                                                                                         | Պահանջվող նույնականացում                                                     |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| `PUBLIC`     | Բացահայտ անվտանգ երթուղիներ՝ մուտք, ելք, կարգավիճակ, սկզբնավորում, համակարգի վիճակ, նախնական կարգավորման մեկնարկ։                                                      | Չի պահանջվում                                                                |
| `CLIENT_API` | Մոդելները սպասարկող վերջնակետեր՝ `/api/v1/*`, `/api/v1beta/*`, ինչպես նաև `/v1/*`, `/v1beta/*`, `/chat/completions`, `/responses`, `/models`, `/codex/*` այլանունները։ | Bearer բանալի, երբ արդյունավետ `REQUIRE_API_KEY` գործառույթի դրոշը միացված է |
| `MANAGEMENT` | Վահանակի էջեր, կարգավորումներ, մատակարարներ, բանալիներ, ադմինիստրատիվ և ախտորոշիչ վերջնակետեր։                                                                         | Վահանակի աշխատաշրջան ԿԱՄ `manage` տիրույթով Bearer                           |

## Խողովակաշար

```
Մուտքային հարցում → src/proxy.ts
  → runAuthzPipeline()՝ src/server/authz/pipeline.ts-ում
    1. Հեռացնել վստահելի ներքին վերնագրերը (x-omniroute-auth-*, x-omniroute-route-class)
    2. Ստեղծել հարցման նույնացուցիչ, դասակարգել երթուղին classifyRoute()-ի միջոցով
    3. Եթե pathname == "/" → վերահղել դեպի /dashboard
    4. Եթե կատարվում է սպասարկման ավարտ (սահուն անջատում), և երթուղին /api/* է → 503
    5. Եթե ոչ GET /api/* է → կիրառել checkBodySize() պաշտպանիչ ստուգումը
    6. Եթե OPTIONS է → CORS նախնական հարցման պատասխան՝ 204
    7. Եթե options.enforce == false → փոխանցել անփոփոխ՝ երթուղու դասի վերնագրերով
    8. Հակառակ դեպքում՝ POLICIES[routeClass].evaluate(ctx)
       - թույլատրել → դրոշմել x-omniroute-auth-{kind,id,label,scopes} → NextResponse.next()
       - մերժել → JSON սխալ՝ correlation_id-ով (վահանակի էջեր → 302 /login)
```

Վստահելի ներքին վերնագրերը (սահմանված են `src/server/authz/headers.ts`-ում) դասակարգումից առաջ **հեռացվում են մուտքային հարցումներից**․ հաճախորդները չեն կարող նախապես լրացնել `x-omniroute-auth-*`-ը՝ որևէ սուբյեկտի անունից հանդես գալու համար։

### Քաղաքականությունների պայմանագրեր

Երթուղիների յուրաքանչյուր դաս ունի քաղաքականություն `src/server/authz/policies/`-ում․

- **`publicPolicy`** (`policies/public.ts`) — միշտ վերադարձնում է `allow({ kind: "anonymous", id: "anonymous" })`։
- **`clientApiPolicy`** (`policies/clientApi.ts`) — դուրս է բերում Bearer-ը և վավերացնում `validateApiKey()`-ի միջոցով։ Անանուն հասանելիությանն անցնում է միայն այն դեպքում, երբ արդյունավետ `REQUIRE_API_KEY` գործառույթի դրոշն անջատված է։ Արդյունավետ դրոշը որոշվում է `isRequireApiKeyEnabled()`-ի միջոցով (`DB գործառույթի դրոշի վերագրում > process.env.REQUIRE_API_KEY > լռելյայն արժեք`), որպեսզի Վահանակի գործառույթի դրոշները և միջավայրի փոփոխականները հետևողականորեն կառավարեն `/api/v1/*`, `/api/v1beta/*` և այլանունները․ որոշիչի խափանումների դեպքում հասանելիությունը փակվում է։ Թույլատրում է վահանակի աշխատաշրջանով հարցումները հաճախորդի API-ի երթուղիներում (ներառյալ `/api/v1/models`-ը, որն օգտագործվում է վահանակի մոդելների կատալոգի կողմից)։
- **`managementPolicy`** (`policies/management.ts`) — ընդունում է վահանակի աշխատաշրջանը, մոդելների ներքին համաժամացման հարցումները (համադրվող `/api/providers/[name]/(sync-models|models)`-ի հետ) կամ ամբողջությամբ բաց է թողնում ստուգումը, եթե `isAuthRequired()`-ը վերադարձնում է false։ Վերադարձնում է 403 (`AUTH_001`), երբ Bearer թոքենն առկա է, բայց անվավեր է, իսկ հակառակ դեպքում՝ 401։ Նաև նույնականացման ցանկացած ճյուղից առաջ կիրառում է երթուղու պաշտպանիչ մակարդակները (LOCAL_ONLY / ALWAYS_PROTECTED)․ տե՛ս [Երթուղու պաշտպանիչ մակարդակներ](../security/ROUTE_GUARD_TIERS.md)։ `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES`-ում գտնվող LOCAL_ONLY ուղիները (ներկայում՝ `/api/mcp/`) կարող են հասանելի լինել ոչ loopback հասցեներից, երբ Bearer բանալին ունի `manage` տիրույթը․ մնացած բոլոր LOCAL_ONLY ուղիների համար, անկախ տիրույթից, շարունակում է գործել խիստ loopback սահմանափակումը։

Հաջող քաղաքականությունը վերադարձնում է `AuthSubject`՝ `kind ∈ { client_api_key, dashboard_session, management_key, anonymous }` արժեքով։ Հետագա մշակիչները կարող են այն կարդալ `src/server/authz/assertAuth.ts`-ում գտնվող `assertAuth(request, "CLIENT_API")`-ի միջոցով՝ նույնականացման տրամաբանությունը կրկին չգործարկելով։

## Հանրային երթուղիների ցանկ

`src/shared/constants/publicApiRoutes.ts`-ը բացահայտ թույլատրված երթուղիների ցանկն է․

Ցանկը բաժանված է ըստ **կառուցվածքի**, և այս բաժանումը կարևոր նշանակություն ունի (GHSA-74g9-q8f6-793h)․ նախածանցը համեմատվում է `startsWith()`-ի միջոցով, ուստի այն համընկնում է նաև նույն սկզբնական նիշերն ունեցող յուրաքանչյուր հարակից ուղու հետ։
Եթե `/api/usage/om-usage`-ը նախածանց լիներ, ապա `/api/usage/om-usage<anything>`-ը կնշվեր որպես ՀԱՆՐԱՅԻՆ, իսկ Next-ը դա կփոխակերպեր `/api/usage/[connectionId]`-ի՝ մշակիչի, որը չունի սեփական նույնականացման ստուգում։

```ts
// Իրական ենթածառեր։ Յուրաքանչյուր տարր ՊԵՏՔ Է ավարտվի «/»-ով (ստուգվում է միավորային թեստով)։
PUBLIC_API_ROUTE_PREFIXES = [
  "/api/auth/oidc/",
  "/api/v1/", // classify-ում դիտարկվում է որպես CLIENT_API, ոչ թե որպես «առանց նույնականացման հանրային»
  "/api/oauth/",
  "/api/codex/connect/",
  "/api/telegram/",
  "/api/cursor-cli/",
];

// Առանձին երթուղիներ, որոնք համեմատվում են ՃՇԳՐԻՏ կերպով (վերջավոր «/»-ով կամ առանց դրա)։
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

// Միայն ընթերցման համար նախատեսված առանձին երթուղիներ, որոնց վրա կիրառվում է նաև CORS origin-ի սահմանափակման թուլացումը։
PUBLIC_READONLY_CORS_API_ROUTES = [
  "/api/health/ping",
  "/api/monitoring/health",
  "/api/settings/require-login",
];

// Միայն ընթերցման համար նախատեսված առանձին երթուղի՝ ԱՌԱՆՑ CORS-ի սահմանափակման թուլացման։
PUBLIC_READONLY_API_ROUTES_EXACT = new Set(["/api/health"]);

PUBLIC_READONLY_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
```

Միայն ընթերցման համար նախատեսված երթուղիները հանրային են **միայն** անվտանգ մեթոդների դեպքում։ Նկատի ունեցեք․ `classifyRoute()`-ը `/api/v1/*`-ը և `/api/v1beta/*`-ը բացառում է PUBLIC պահուստային տարբերակից․ դրանք միշտ `CLIENT_API` են, որպեսզի Bearer բանալու քաղաքականությունը շարունակի գործել։

## Նոր երթուղու ավելացում

### Ձևանմուշ 1 — Հանրային հաճախորդային API վերջնակետ (Bearer նույնականացմամբ)

`/api/v1/`-ի և `/api/v1beta/`-ի տակ գտնվող երթուղիներն ինքնաբերաբար դասակարգվում են որպես `CLIENT_API`։ Middleware-ը պարտադրում է Bearer-ի ստուգումը․ երթուղու մշակիչները կարիք չունեն այն կրկնելու, սակայն անհրաժեշտության դեպքում կարող են կարդալ սուբյեկտը։

```typescript
// src/app/api/v1/your-route/route.ts
import { NextRequest, NextResponse } from "next/server";
import { assertAuth } from "@/server/authz/assertAuth";

export async function POST(req: NextRequest) {
  const subject = assertAuth(req, "CLIENT_API");
  // subject.kind === "client_api_key" | "anonymous" | "dashboard_session"
  // ... մշակիչի տրամաբանությունը
}
```

### Ձևանմուշ 2 — Կառավարման վերջնակետ (նստաշրջան կամ Bearer + manage)

Օգտագործեք `requireManagementAuth()`-ը `src/lib/api/requireManagementAuth.ts`-ից․

```typescript
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

export async function POST(request: Request) {
  const rejection = await requireManagementAuth(request);
  if (rejection) return rejection;
  // ... մշակիչի տրամաբանությունը
}
```

Հաջողության դեպքում `requireManagementAuth()`-ը վերադարձնում է `null`, իսկ սխալի դեպքում՝ JSON սխալ պարունակող `Response`․

- 401 `AUTH_001` "Նույնականացում է պահանջվում" — նույնականացման տվյալներն ամբողջությամբ բացակայում են
- 403 — անվավեր Bearer **կամ** Bearer-ը առկա է, սակայն բանալին չունի `manage` / `admin` scope

`hasManageScope(scopes)`-ը վերադարձնում է true՝ `"manage"`-ի կամ `"admin"`-ի դեպքում։

### Ձևանմուշ 3 — Հանրային թույլատրված երթուղիների ցանկում ավելացում

Բազմությունն ընտրեք ըստ կառուցվածքի, ոչ թե հարմարության։ Մեկ երթուղին տեղադրվում է `PUBLIC_API_ROUTES_EXACT`-ում (կամ `PUBLIC_READONLY_CORS_API_ROUTES`-ում, եթե այն միայն GET-ի համար է)։ Միայն իրական ենթածառն է տեղադրվում `PUBLIC_API_ROUTE_PREFIXES`-ում, և այն **պետք է ավարտվի `/`-ով**։ Մեկ երթուղին նախածանցների ցանկում տեղադրելը նաև հրապարակային է դարձնում նույն սկզբնական նիշերն ունեցող յուրաքանչյուր հարակից ուղի՝ ներառյալ ավելի ուշ ավելացված դինամիկ հատվածներով հարակից երթուղիները (GHSA-74g9-q8f6-793h)։ Թարմացրեք `tests/unit/public-api-routes.test.ts`, `tests/unit/authz/public-route-exact-match.test.ts` և `tests/unit/authz/classify.test.ts` միավորային թեստերը։

## Թույլատրությունների շրջանակներ

API բանալիները պարունակում են `scopes` զանգված (պահվում է որպես JSON՝ `api_keys.scopes`-ում, տե՛ս `src/lib/db/apiKeys.ts`)։

### Կառավարման թույլատրությունների շրջանակ

- `manage` / `admin` — բանալուն տրամադրում է հասանելիություն կառավարման API վերջնակետերին, երբ այն ուղարկվում է որպես Bearer։

### MCP թույլատրությունների շրջանակներ (`src/shared/constants/mcpScopes.ts`)

Յուրաքանչյուր MCP գործիք `MCP_TOOL_SCOPES`-ի միջոցով պահանջում է որոշակի թույլատրությունների շրջանակներ։ Ամբողջական ցանկը (`MCP_SCOPE_LIST`)՝

```
read:health, read:combos, write:combos, read:quota, read:usage,
read:models, execute:completions, execute:search, write:budget,
write:resilience, pricing:write, read:cache, write:cache,
read:compression, write:compression, read:proxies
```

`open-sse/mcp-server/server.ts`-ում թույլատրությունների շրջանակների հարկադիր ստուգումը յուրաքանչյուր գործիքի շրջանակների ցանկը փոխանցում է
`evaluateToolScopes()`-ին այն բանից հետո, երբ `resolveCallerScopeContext()`-ը որոշում է շրջանակները MCP նույնականացման տվյալներից,
հարցման մետատվյալներից կամ `OMNIROUTE_MCP_SCOPES`-ից։

## Նույնականացման պարտադիր լինելու փոխարկիչ

`src/shared/utils/apiAuth.ts`-ում գտնվող `isAuthRequired()`-ը որոշում է՝ արդյոք հարցման համար կիրառվում է **որևէ** նույնականացման ստուգում․

- `settings.requireLogin === false` → նույնականացումը գլոբալ անջատված է։
- Գաղտնաբառ սահմանված չէ, **և** չկա `INITIAL_PASSWORD` միջավայրի փոփոխական → սկզբնական կարգավորման ռեժիմը թույլատրում է նախնական կարգավորման հրաշագործն ու loopback հարցումները, սակայն արտաքին ցանցում հասանելի հարցումների համար դեռևս անհրաժեշտ են հավատարմագրեր։
- DB-ի ցանկացած սխալ → հասանելիությունը մերժվում է (անվտանգություն՝ լռելյայն)։

Հաճախորդի API բանալու պարտադիր ստուգումն օգտագործում է `src/shared/utils/featureFlags.ts`-ում գտնվող `isRequireApiKeyEnabled()`-ը, այլ ոչ թե `process.env.REQUIRE_API_KEY`-ի ուղղակի ընթերցումը։ Սա կարևոր է տեղակայված օրինակների համար․ Dashboard → Feature Flags բաժնում `REQUIRE_API_KEY`-ի փոխարկումը DB-ում պահպանում է վերասահմանում և անմիջապես ազդում է `/v1/*`, `/v1beta/*`, `/models`, `/responses`, `/chat/completions`, `/codex/*` և հաճախորդի API-ի նույնականացման մյուս ստուգումների վրա, որոնք համատեղ օգտագործում են այս օգնական ֆունկցիան։ Եթե հնարավոր չէ կարդալ գործառույթի դրոշակների պահոցը, հաճախորդի API-ի նույնականացումը գործում է փակ ձախողման սկզբունքով և պահանջում է բանալի։

## Համատեղելիությունը խախտող փոփոխություն — v3.8.0

`/api/v1/agents/tasks/*` և `/api/resilience/model-cooldowns` վերջնակետերն **այժմ պահանջում են կառավարման նույնականացում** (commit `588a0333`)։ Նախկինում առանց `manage` թույլատրությունների շրջանակի սովորական API բանալի ուղարկող հաճախորդները ստանում են `403`։ Միգրացիա․ API Keys կառավարման վահանակում բանալուն տրամադրեք `manage` թույլատրությունների շրջանակը կամ օգտագործեք մուտք գործած կառավարման վահանակի աշխատաշրջան։

## Վարքագծի փոփոխություն — v3.8.2

`/api/mcp/*`-ը (հեռակա MCP սերվերը) լռելյայն դեռևս LOCAL_ONLY է, սակայն այժմ ընդունում է ոչ loopback հարցումները, երբ `Authorization: Bearer <api-key>` վերնագիրը պարունակում է `manage` թույլատրությունների շրջանակը։ Այս բացառությունը յուրաքանչյուր ուղու համար հստակ կառավարվում է `src/server/authz/routeGuard.ts`-ի `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES`-ի միջոցով։ Նույն մակարդակի LOCAL_ONLY նախածանցը՝ `/api/cli-tools/runtime/*`, միտումնավոր հնարավոր չէ շրջանցել, քանի որ այն կարող է գործարկել կամայական ենթագործընթացներ։ Ոչ loopback աղբյուրներից դեպի `/api/mcp/*` անանուն հարցումները շարունակում են վերադարձնել `403 LOCAL_ONLY`․ ցանկացած նոր LOCAL_ONLY ուղու լռելյայն վարքագիծը շարունակում է թույլատրել միայն խիստ loopback հարցումները։ Տե՛ս [Երթուղիների պաշտպանության մակարդակներ](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out)։

## Թեստավորում

- Մոդուլային թեստեր՝ `tests/unit/authz/` — `classify.test.ts`, `pipeline.test.ts`, `client-api-policy.test.ts`, `management-policy.test.ts`, `public-policy.test.ts`։
- Հանրային թույլատրացանկ՝ `tests/unit/public-api-routes.test.ts`։
- Ընտրովի գործարկում՝ `node --import tsx/esm --test tests/unit/authz/classify.test.ts`։

## Վրիպազերծում

Փոխանցման շղթան պատասխաններին միշտ ավելացնում է՝

```
x-request-id:               <կոռելյացիայի նույնացուցիչ, կրկնվում է սխալի մարմիններում>
x-omniroute-route-class:    PUBLIC | CLIENT_API | MANAGEMENT
```

Նույնականացված հարցումների դեպքում վերին հոսքի (մշակիչի կողմի) հարցման վերնագրերը ներառում են նաև՝

```
x-omniroute-auth-kind:      client_api_key | dashboard_session | management_key | anonymous
x-omniroute-auth-id:        key_<վերջին 4-ը> | "dashboard" | "anonymous"
x-omniroute-auth-label:     (ըստ ցանկության)
x-omniroute-auth-scopes:    ստորակետերով բաժանված ցանկ
```

Մշակիչների ներսում օգտագործեք `assertAuth(req, expectedClass)`․ եթե միջանկյալ ծրագրաշարը շրջանցվել է, այն նետում է `AuthzAssertionError`՝ `AUTHZ_NOT_INITIALIZED` կոդով (օգտակար է թեստերում կազմաձևման հետընթացները հայտնաբերելու համար)։

## Տե՛ս նաև

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — նույնականացման նշիչն ըստ վերջնակետի
- [COMPLIANCE.md](../security/COMPLIANCE.md) — նույնականացման իրադարձությունների աուդիտի մատյան
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md) — MCP տիրույթների պարտադրման մանրամասներ
- Աղբյուր՝ `src/server/authz/`, `src/lib/api/requireManagementAuth.ts`
