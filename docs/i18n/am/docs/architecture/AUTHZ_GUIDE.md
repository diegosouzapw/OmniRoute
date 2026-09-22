# Authorization Guide (አማርኛ)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/AUTHZ_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/AUTHZ_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/AUTHZ_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/AUTHZ_GUIDE.md)

---

> **ዋና የእውነት ምንጭ:** `src/server/authz/`, `src/shared/constants/publicApiRoutes.ts`, `src/lib/api/requireManagementAuth.ts`, `src/shared/utils/apiAuth.ts`
> **ለመጨረሻ ጊዜ የተዘመነው:** 2026-06-28 — v3.8.40

OmniRoute እያንዳንዱን የAPI ጥያቄ የሚቆጣጠር፣ መስመርን የሚያውቅ የፈቃድ መስጫ ቧንቧ መስመር አለው። ምደባው **ቆራጥ** እና **በስህተት ጊዜ ዝግ** ነው — ሊመደብ የማይችል ማንኛውም ነገር `MANAGEMENT` ሆኖ ያበቃል፣ እንዲሁም ክፍለ-ጊዜ ወይም የአስተዳደር ደረጃ ያለው ቶከን ይጠይቃል። ይህ ገጽ መስመሮችን ለሚንከባከቡ ወይም አዳዲስ መዳረሻዎችን ለሚነድፉ መሐንዲሶች ሞዴሉን ያብራራል።

![የAuthZ ቧንቧ መስመር (3 የመስመር ክፍሎች + የፖሊሲ ግምገማ)](../diagrams/exported/authz-pipeline.svg)

> ምንጭ፦ [diagrams/authz-pipeline.mmd](../diagrams/authz-pipeline.mmd)

## ሁለት የማረጋገጫ ሁነታዎች

### 1. API ቁልፍ (Bearer)

ከOpenAI/Anthropic/Gemini ጋር ተኳዃኝ ለሆኑ የደንበኛ APIዎች፣ እንዲሁም ቁልፉ `manage` ወሰን ሲኖረው ለጥቂት የአስተዳደር መስመሮች ይጠቅማል።

```
Authorization: Bearer <api-key>
```

በ`src/sse/services/auth.ts` ውስጥ ባሉት `isValidApiKey()` / `extractApiKey()` የሚረጋገጥ ሲሆን፣ በ`src/shared/utils/apiAuth.ts` በኩል እንደገና ወደ ውጭ ይላካል። አረጋጋጩ `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` የአካባቢ ተለዋዋጮችንም እንደ ቋሚ የማሳለፊያ ቁልፎች ይቀበላል (ጉዳይ #1350)።

### 2. የዳሽቦርድ ክፍለ-ጊዜ (auth_token ኩኪ)

ለዳሽቦርድ ገጾች እና ለአስተዳዳሪ ክዋኔዎች።

```
Cookie: auth_token=<JWT signed with JWT_SECRET>
```

JWTው ሲረጋገጥ **እና** `authenticated: true` ሲይዝ ብቻ ኩኪው ክፍለ-ጊዜ ይሆናል
(`src/shared/utils/dashboardSessionToken.ts` → `verifyDashboardSessionToken`)። ኩኪውን
የሚጠቀም እያንዳንዱ አካል (የመስመር ጠባቂ፣ የauthz ቧንቧ መስመር ማደስ፣ የWebSocket መጨባበጥ፣ ቀጥታ
አገልጋይ፣ `/api/settings/require-login`፣ `/api/auth/status`) በዚያ አጋዥ በኩል ያልፋል።
በ`JWT_SECRET` የተፈረሙ ሌሎች JWTዎች አሉ — የCursor CLI ማሳለፊያው ለቁልፍ ባለቤቶች
`iss "omniroute" / aud "cursor-cli"` ቶከኖችን ይፈጥራል — እና እነዚህ በፍጹም ክፍለ-ጊዜዎች አይደሉም
(#13298)።

በ`src/shared/utils/apiAuth.ts` ውስጥ ባለው `isDashboardSessionAuthenticated()` ይረጋገጣል። ቧንቧ መስመሩ JWTው ከ30 ቀናት የዕድሜ ገደቡ ውስጥ ከ7 ቀናት ያነሰ ጊዜ ሲቀረው በራስ-ሰር ያድሰዋል።

አንዳንድ የአስተዳደር መስመሮች **ከሁለቱ አንዱን** ሁነታ ይቀበላሉ፦ ኩኪ ወይም የAPI ቁልፉ `manage` (ወይም `admin`) ወሰን ሲኖረው `Bearer <key>`። በv3.8 የታከለውን «በAPI ጥሪዎች ሊዋቀር የሚችል» የስራ ፍሰት የሚያስችለው ይህ ነው።

#### አማራጭ የOIDC መግቢያ በር (#6973)

የዳሽቦርድ አስተዳዳሪ መግቢያው ከነባሪው የይለፍ ቃል መግቢያ ጎን ለጎን **በምርጫ የሚነቃ** የOIDC (OpenID Connect) ፍሰትንም
ይደግፋል — የይለፍ ቃል መግቢያው በፍጹም አይወገድም፣ የሚደረገው መጨመር ብቻ
ነው፦

- `settings.oidcEnabled === true` ካልሆነ **እና** `oidcIssuer` /
  `oidcClientId` / `oidcClientSecret` ሁሉም ካልተዋቀሩ በስተቀር የተሰናከለ ነው (Settings → Auth)።
  ካልሆነ `GET /api/auth/oidc/login` `400` ይመልሳል።
- `GET /api/auth/oidc/login` `authorization_endpoint`ን ከአውጪው
  `/.well-known/openid-configuration` ይፈልጋል (`<issuer>/authorize`ን
  እንደ አማራጭ ይጠቀማል)፣ የመልሶ ማዞሪያ URIውን ከገቢው ጥያቄ
  (`x-forwarded-proto`ን የሚያውቅ) ይገነባል፣ እና በ`httpOnly` `oidc_state` ኩኪ ውስጥ
  በተከማቸ የዘፈቀደ `state` ወደ IdPው መልሶ ያዞራል።
- `GET /api/auth/oidc/callback` `state`ን ያረጋግጣል፣ የፈቃድ
  ኮዱን ይለዋወጣል፣ እና የID ቶከኑን ፊርማ በአውጪው JWKS
  (የ`jose` `createRemoteJWKSet`፣ በእያንዳንዱ JWKS URI የሚሸጎጥ) ከ`issuer`/`audience`
  ማረጋገጫዎች ጋር ያረጋግጣል። አማራጭ የ`oidcAllowedSubjects` የተፈቀዱ ዝርዝር ከቶከኑ
  `sub` ይገባኛል ወይም ከ`email` ይገባኛል ጋር ያዛምዳል — የኢሜይል ይገባኛል የሚከበረው
  `email_verified === true` ሲሆን ብቻ ነው፤ ስለዚህ በIdPው ላይ ያልተረጋገጠ ኢሜይል በፍጹም
  በበሩ ማለፍ አይችልም።
- ሲሳካ፣ የይለፍ ቃል መግቢያው የሚያወጣውን **በትክክል ተመሳሳይ** የ30 ቀናት `auth_token` JWT
  (`src/app/api/auth/login/route.ts`) ይፈጥራል፤ በመሆኑም የተቀረው
  የዳሽቦርድ ክፍለ-ጊዜ ቧንቧ መስመር (ራስ-ሰር ማደስ፣ የኩኪ ጠቋሚዎች) ሳይለወጥ ይቆያል —
  OIDC የሚተካው ኩኪው የሚፈጠርበትን መንገድ ብቻ ነው፣ ኩኪው የሚሰጠውን ፈቃድ አይደለም።

## የRoute ክፍሎች

`src/server/authz/types.ts` ሦስት ክፍሎችን ይገልጻል፤ በወሳኝ ሁኔታ ሊመደብ የማይችል ማንኛውም route ወደ `MANAGEMENT` ይመለሳል።

| ክፍል          | መግለጫ                                                                                                                                              | የሚያስፈልግ ማረጋገጫ                                       |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------- |
| `PUBLIC`     | በግልጽ ደህንነታቸው የተረጋገጠ routes — መግቢያ፣ መውጫ፣ ሁኔታ፣ ማስጀመሪያ፣ ጤና እና onboarding bootstrap።                                                                  | ምንም                                                 |
| `CLIENT_API` | ሞዴል ማቅረቢያ endpoints — `/api/v1/*`፣ `/api/v1beta/*`፣ እንዲሁም aliases `/v1/*`፣ `/v1beta/*`፣ `/chat/completions`፣ `/responses`፣ `/models`፣ `/codex/*`። | ውጤታማው `REQUIRE_API_KEY` feature flag ሲነቃ Bearer key |
| `MANAGEMENT` | የDashboard ገጾች፣ ቅንብሮች፣ providers፣ keys፣ admin እና የምርመራ endpoints።                                                                                 | የDashboard session ወይም `manage` scope ያለው Bearer    |

## Pipeline

```
የሚመጣ request → src/proxy.ts
  → runAuthzPipeline() በ src/server/authz/pipeline.ts
    1. የታመኑ internal headersን አስወግድ (x-omniroute-auth-*, x-omniroute-route-class)
    2. request id ፍጠር፣ routeን በ classifyRoute() መድብ
    3. pathname == "/" ከሆነ → ወደ /dashboard redirect አድርግ
    4. draining (graceful shutdown) ላይ ከሆነ እና /api/* ከሆነ → 503
    5. GET ያልሆነ /api/* ከሆነ → checkBodySize() guardን ፈትሽ
    6. OPTIONS ከሆነ → CORS preflight 204
    7. options.enforce == false ከሆነ → ከroute-class headers ጋር እንዲያልፍ አድርግ
    8. አለበለዚያ፦ POLICIES[routeClass].evaluate(ctx)
       - allow  → x-omniroute-auth-{kind,id,label,scopes} አክል → NextResponse.next()
       - reject → የJSON ስህተት ከ correlation_id ጋር (የdashboard ገጾች → 302 /login)
```

የታመኑ internal headers (በ`src/server/authz/headers.ts` የተገለጹ) ከመመደባቸው በፊት **ከሚመጡ requests ይወገዳሉ** — clients አንድን subject ለማስመሰል `x-omniroute-auth-*`ን አስቀድመው መሙላት አይችሉም።

### የPolicy ውሎች

እያንዳንዱ የroute ክፍል በ`src/server/authz/policies/` ውስጥ policy አለው፦

- **`publicPolicy`** (`policies/public.ts`) — ሁልጊዜ `allow({ kind: "anonymous", id: "anonymous" })` ይመልሳል።
- **`clientApiPolicy`** (`policies/clientApi.ts`) — Bearerን አውጥቶ በ`validateApiKey()` ያረጋግጣል። ወደ anonymous የሚያልፈው ውጤታማው `REQUIRE_API_KEY` feature flag ሲሰናከል ብቻ ነው። ውጤታማው flag በ`isRequireApiKeyEnabled()` (`DB feature flag override > process.env.REQUIRE_API_KEY > default`) በኩል ይወሰናል፤ በዚህም የDashboard Feature Flags እና environment variables `/api/v1/*`፣ `/api/v1beta/*` እና aliasesን በወጥነት ይቆጣጠራሉ፤ የresolver ውድቀቶች መዳረሻን ይዘጋሉ። በclient API routes ላይ የDashboard-session requestsን ይፈቅዳል (በdashboard model catalog የሚጠቀሙበትን `/api/v1/models` ጨምሮ)።
- **`managementPolicy`** (`policies/management.ts`) — የDashboard session፣ internal model-sync requests (`/api/providers/[name]/(sync-models|models)` ጋር የሚዛመዱ) ይቀበላል፣ ወይም `isAuthRequired()` false ከመለሰ ሙሉ በሙሉ ይዘለዋል። Bearer token ካለ ነገር ግን invalid ከሆነ 403 (`AUTH_001`)፣ አለበለዚያ 401 ይመልሳል። ከማንኛውም auth branch በፊት የroute-guard tiersን (LOCAL_ONLY / ALWAYS_PROTECTED) ያስገድዳል — [የRoute Guard Tiers](../security/ROUTE_GUARD_TIERS.md)ን ይመልከቱ። በ`LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` ውስጥ ያሉ LOCAL_ONLY paths (በአሁኑ ጊዜ፦ `/api/mcp/`) Bearer keyው `manage` scopeን ከያዘ ከnon-loopback ላይ ሊደረስባቸው ይችላል፤ ሌሎች ሁሉም LOCAL_ONLY paths scope ምንም ይሁን ምን strict-loopback ሆነው ይቆያሉ።

የተሳካ policy `kind ∈ { client_api_key, dashboard_session, management_key, anonymous }` ያለውን `AuthSubject` ይመልሳል። Downstream handlers የauth logicን እንደገና ከማስኬድ ይልቅ በ`src/server/authz/assertAuth.ts` ውስጥ ባለው `assertAuth(request, "CLIENT_API")` በኩል ሊያነቡት ይችላሉ።

## የይፋዊ መስመሮች ዝርዝር

`src/shared/constants/publicApiRoutes.ts` ግልጽ የፈቃድ ዝርዝሩ ነው፦

ዝርዝሩ በ**ቅርጽ** የተከፈለ ሲሆን፣ ይህ ክፍፍል ለደህንነት ወሳኝ ነው (GHSA-74g9-q8f6-793h)፦ prefix በ`startsWith()` ስለሚዛመድ፣ ተመሳሳይ መሪ ቁምፊዎችን የሚጋራ እያንዳንዱን አጎራባች pathም ያዛምዳል።
`/api/usage/om-usage` እንደ prefix ሲጠቀም `/api/usage/om-usage<anything>`ን PUBLIC አድርጎ ምልክት አድርጎት ነበር፤ Next ደግሞ ይህንን ወደ `/api/usage/[connectionId]` ይፈታዋል — የራሱ auth የሌለው handler።

```ts
// እውነተኛ ንዑስ ዛፎች። እያንዳንዱ ግቤት በ"/" መጨረስ አለበት (በunit test የተረጋገጠ)።
PUBLIC_API_ROUTE_PREFIXES = [
  "/api/auth/oidc/",
  "/api/v1/", // በclassify ውስጥ እንደ CLIENT_API ይቆጠራል፣ እንደ "auth የማያስፈልገው ይፋዊ" አይደለም
  "/api/oauth/",
  "/api/codex/connect/",
  "/api/telegram/",
  "/api/cursor-cli/",
];

// በትክክል የሚዛመዱ ነጠላ መስመሮች (በመጨረሻ slash ያላቸውም ሆነ የሌላቸው)።
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

// የCORS origin ማላላትንም የሚቀበሉ ለንባብ-ብቻ የሆኑ ነጠላ መስመሮች።
PUBLIC_READONLY_CORS_API_ROUTES = [
  "/api/health/ping",
  "/api/monitoring/health",
  "/api/settings/require-login",
];

// የCORS ማላላት የሌለው ለንባብ-ብቻ የሆነ ነጠላ መስመር።
PUBLIC_READONLY_API_ROUTES_EXACT = new Set(["/api/health"]);

PUBLIC_READONLY_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
```

ለንባብ-ብቻ የሆኑ መስመሮች ይፋዊ የሚሆኑት **ለደህንነታቸው አስተማማኝ** methods ብቻ ነው። ማስታወሻ፦ `classifyRoute()` `/api/v1/*`ን እና `/api/v1beta/*`ን ከPUBLIC fall-through ያስወጣቸዋል — የBearer-key ፖሊሲው አሁንም እንዲተገበር እነዚህ ሁልጊዜ `CLIENT_API` ናቸው።

## አዲስ መስመር ማከል

### ንድፍ 1 — ይፋዊ የclient API endpoint (Bearer-auth)

በ`/api/v1/` እና `/api/v1beta/` ስር ያሉ መስመሮች በራስ-ሰር `CLIENT_API` ተብለው ይመደባሉ። middlewareው የBearer ማረጋገጫውን ያስገድዳል፤ route handlers ይህንን እንደገና ማከናወን አያስፈልጋቸውም፣ ነገር ግን ጠቃሚ ከሆነ subjectን ማንበብ ይችላሉ።

```typescript
// src/app/api/v1/your-route/route.ts
import { NextRequest, NextResponse } from "next/server";
import { assertAuth } from "@/server/authz/assertAuth";

export async function POST(req: NextRequest) {
  const subject = assertAuth(req, "CLIENT_API");
  // subject.kind === "client_api_key" | "anonymous" | "dashboard_session"
  // ... የhandler አመክንዮ
}
```

### ንድፍ 2 — የአስተዳደር endpoint (session ወይም Bearer + manage)

ከ`src/lib/api/requireManagementAuth.ts` የሚገኘውን `requireManagementAuth()` ይጠቀሙ፦

```typescript
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

export async function POST(request: Request) {
  const rejection = await requireManagementAuth(request);
  if (rejection) return rejection;
  // ... የhandler አመክንዮ
}
```

`requireManagementAuth()` ሲሳካ `null`ን፣ ካልሆነ ደግሞ የJSON ስህተት `Response`ን ይመልሳል፦

- 401 `AUTH_001` "ማረጋገጫ ያስፈልጋል" — ምንም credentials የሉም
- 403 — ልክ ያልሆነ Bearer **ወይም** Bearer አለ፣ ነገር ግን keyው የ`manage` / `admin` scope የለውም

`hasManageScope(scopes)` ለ`"manage"` ወይም `"admin"` true ይመልሳል።

### ንድፍ 3 — ወደ ይፋዊ የፈቃድ ዝርዝሩ ማከል

setን በቅርጹ መሠረት ይምረጡ፣ በአመቺነት መሠረት አይደለም። አንድ መስመር ወደ `PUBLIC_API_ROUTES_EXACT` ይገባል (ወይም GET-only ከሆነ ወደ `PUBLIC_READONLY_CORS_API_ROUTES`)፤ ወደ `PUBLIC_API_ROUTE_PREFIXES` የሚገባው እውነተኛ ንዑስ ዛፍ ብቻ ነው፣ እና **በ`/` መጨረስ አለበት**። ነጠላ መስመርን በprefix ዝርዝሩ ውስጥ ማስቀመጥ፣ ተመሳሳይ መሪ ቁምፊዎችን የሚጋሩ ሁሉንም አጎራባች paths ይፋዊ ያደርጋል — ይህም በኋላ የሚታከሉ dynamic-segment siblingsን ይጨምራል (GHSA-74g9-q8f6-793h)። በ`tests/unit/public-api-routes.test.ts`፣ `tests/unit/authz/public-route-exact-match.test.ts` እና `tests/unit/authz/classify.test.ts` ያሉ unit testsን ያዘምኑ።

## የተደራሽነት ወሰኖች

የAPI ቁልፎች የ`scopes` ድርድር ይይዛሉ (እንደ JSON በ`api_keys.scopes` ውስጥ ይቀመጣል፤ `src/lib/db/apiKeys.ts`ን ይመልከቱ)።

### የአስተዳደር ወሰን

- `manage` / `admin` — ቁልፉ እንደ Bearer ሲላክ የአስተዳደር API መጨረሻ ነጥቦችን እንዲደርስ ፈቃድ ይሰጠዋል።

### MCP ወሰኖች (`src/shared/constants/mcpScopes.ts`)

እያንዳንዱ MCP መሣሪያ በ`MCP_TOOL_SCOPES` በኩል የተወሰኑ ወሰኖችን ይፈልጋል። ሙሉ ዝርዝሩ (`MCP_SCOPE_LIST`)፦

```
read:health, read:combos, write:combos, read:quota, read:usage,
read:models, execute:completions, execute:search, write:budget,
write:resilience, pricing:write, read:cache, write:cache,
read:compression, write:compression, read:proxies
```

በ`open-sse/mcp-server/server.ts` ውስጥ ያለው የወሰን ማስፈጸሚያ፣ `resolveCallerScopeContext()` ወሰኖችን ከMCP የማረጋገጫ መረጃ፣
ከጥያቄ ሜታዳታ ወይም ከ`OMNIROUTE_MCP_SCOPES` ከፈታ በኋላ የእያንዳንዱን መሣሪያ የወሰን ዝርዝር ወደ
`evaluateToolScopes()` ያስተላልፋል።

## ማረጋገጫ ያስፈልጋል መቀያየሪያ

በ`src/shared/utils/apiAuth.ts` ውስጥ ያለው `isAuthRequired()` ለአንድ ጥያቄ **ማንኛውም** ማረጋገጫ ተፈጻሚ መሆን አለበት ወይስ የለበትም ብሎ ይወስናል፦

- `settings.requireLogin === false` → ማረጋገጫ በዓለም አቀፍ ደረጃ ተሰናክሏል።
- ምንም የይለፍ ቃል ካልተዋቀረ **እና** የ`INITIAL_PASSWORD` የአካባቢ ተለዋዋጭ ከሌለ → የማስነሻ ሁነታ የመጀመሪያ ማዋቀሪያ አዋቂውን እና loopback ጥያቄዎችን ይፈቅዳል፤ ነገር ግን ለአውታረ መረብ የተጋለጡ ጥያቄዎች አሁንም የማረጋገጫ መረጃ ያስፈልጋቸዋል።
- ማንኛውም የDB ስህተት → መዳረሻውን ዘግቶ ያቆማል (በነባሪነት ደህንነቱ የተጠበቀ)።

የደንበኛ API ቁልፍ ማስፈጸሚያ በ`src/shared/utils/featureFlags.ts` ውስጥ ያለውን `isRequireApiKeyEnabled()` ይጠቀማል፤ `process.env.REQUIRE_API_KEY`ን በቀጥታ አያነብም። ይህ ለተሰማሩ ኢንስታንሶች አስፈላጊ ነው፦ በDashboard → Feature Flags ውስጥ `REQUIRE_API_KEY`ን መቀያየር የDB ተተኪ ቅንብርን ያከማቻል፣ እናም ወዲያውኑ `/v1/*`፣ `/v1beta/*`፣ `/models`፣ `/responses`፣ `/chat/completions`፣ `/codex/*` እና ይህን ረዳት የሚጋሩ ሌሎች የደንበኛ-API ማረጋገጫዎች ላይ ተጽዕኖ ያሳድራል። የባህሪ ምልክት ማከማቻው ሊነበብ ካልቻለ፣ የደንበኛ API ማረጋገጫ መዳረሻውን ዘግቶ ያቆማል እና ቁልፍ ይፈልጋል።

## ተኳሃኝነትን የሚያፈርስ ለውጥ — v3.8.0

የ`/api/v1/agents/tasks/*` እና `/api/resilience/model-cooldowns` መጨረሻ ነጥቦች **አሁን የአስተዳደር ማረጋገጫ ይፈልጋሉ** (commit `588a0333`)። ከዚህ በፊት የ`manage` ወሰን የሌለውን መደበኛ API ቁልፍ ይልኩ የነበሩ ደንበኞች `403` ይቀበላሉ። ፍልሰት፦ በAPI Keys dashboard ውስጥ ለቁልፉ የ`manage` ወሰንን ይስጡ፣ ወይም የገቡበትን dashboard ክፍለ ጊዜ ይጠቀሙ።

## የባህሪ ለውጥ — v3.8.2

`/api/mcp/*` (የርቀት MCP አገልጋዩ) አሁንም በነባሪ LOCAL_ONLY ነው፤ ሆኖም የ`Authorization: Bearer <api-key>` ራስጌው የ`manage` ወሰንን ሲይዝ አሁን loopback ያልሆኑ ጥያቄዎችን ይቀበላል። ይህ ልዩ ማስቀረት በ`src/server/authz/routeGuard.ts` ውስጥ ባለው `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` በኩል ለእያንዳንዱ ዱካ በግልጽ ሁኔታ የሚቆጣጠር ነው፤ የወንድም LOCAL_ONLY ቅድመ ቅጥያ `/api/cli-tools/runtime/*` ማናቸውንም ንዑስ ሂደቶች ሊያስነሳ ስለሚችል ሆን ተብሎ ሊታለፍ የማይችል ተደርጓል። loopback ካልሆነ ምንጭ ወደ `/api/mcp/*` የሚላኩ ስም-አልባ ጥያቄዎች `403 LOCAL_ONLY`ን መመለሳቸውን ይቀጥላሉ — ለማንኛውም አዲስ LOCAL_ONLY ዱካ ነባሪው ጥብቅ-loopback ሆኖ ይቀጥላል። [የRoute Guard ደረጃዎች](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out)ን ይመልከቱ።

## ሙከራ

- የክፍል ሙከራዎች፦ `tests/unit/authz/` — `classify.test.ts`፣ `pipeline.test.ts`፣ `client-api-policy.test.ts`፣ `management-policy.test.ts`፣ `public-policy.test.ts`።
- የሕዝብ ፍቃድ ዝርዝር፦ `tests/unit/public-api-routes.test.ts`።
- ያተኮረ ሙከራን ያሂዱ፦ `node --import tsx/esm --test tests/unit/authz/classify.test.ts`።

## ማረም

ፓይፕላይኑ ሁልጊዜ ምላሾችን በሚከተሉት ራስጌዎች ያትማል፦

```
x-request-id:               <correlation id, echoed in error bodies>
x-omniroute-route-class:    PUBLIC | CLIENT_API | MANAGEMENT
```

ማንነት ለተረጋገጠባቸው ጥያቄዎች፣ ወደላይኛው አገልግሎት የሚላኩት (በhandler በኩል ያሉ) የጥያቄ ራስጌዎች የሚከተሉትንም ያካትታሉ፦

```
x-omniroute-auth-kind:      client_api_key | dashboard_session | management_key | anonymous
x-omniroute-auth-id:        key_<last-4> | "dashboard" | "anonymous"
x-omniroute-auth-label:     (optional)
x-omniroute-auth-scopes:    comma-separated list
```

በhandler ውስጥ `assertAuth(req, expectedClass)`ን ይጠቀሙ — middlewareው ከተዘለለ፣ `AUTHZ_NOT_INITIALIZED` ኮድ ያለውን `AuthzAssertionError` ይጥላል (ይህም በሙከራዎች ውስጥ የውቅር ወደኋላ መመለሶችን ለመለየት ጠቃሚ ነው)።

## ተጨማሪ ይመልከቱ

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — ለእያንዳንዱ endpoint የማንነት ማረጋገጫ ምልክት
- [COMPLIANCE.md](../security/COMPLIANCE.md) — ለማንነት ማረጋገጫ ክስተቶች የኦዲት መዝገብ
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md) — የMCP scope ማስፈጸሚያ ዝርዝሮች
- ምንጭ፦ `src/server/authz/`, `src/lib/api/requireManagementAuth.ts`
