# Authorization Guide (Igbo)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/AUTHZ_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/AUTHZ_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/AUTHZ_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/AUTHZ_GUIDE.md)

---

> **Isi iyi nke eziokwu:** `src/server/authz/`, `src/shared/constants/publicApiRoutes.ts`, `src/lib/api/requireManagementAuth.ts`, `src/shared/utils/apiAuth.ts`
> **Emelitere ikpeazụ:** 2026-09-22 — oghere aha oghere na-atụ aka na MCP-SERVER.md

OmniRoute nwere usoro ikike nwere ike ịmata ụzọ nke na-echebe arịrịọ API ọ bụla. Nchịkọta bụ **nke doro anya** na **nke na-ada ada** — ihe ọ bụla a na-apụghị ịhazi na-ejedebe dị ka `MANAGEMENT` ma na-achọ nnọkọ ma ọ bụ akara ngosi ọkwa njikwa. Ibe a na-akọwa ụdị maka ndị injinia na-elekọta ụzọ ma ọ bụ na-emepụta ebe njedebe ọhụrụ.

![AuthZ pipeline (3 ụdị ụzọ + nyocha amụma)](../diagrams/exported/authz-pipeline.svg)

> Isi iyi: [diagrams/authz-pipeline.mmd](../diagrams/authz-pipeline.mmd)

## Ụzọ Auth Abụọ

### 1. API Key (Bearer)

A na-eji ya maka API ndị client kwekọrọ na OpenAI/Anthropic/Gemini nakwa maka route njikwa ole na ole mgbe key ahụ nwere scope `manage`.

```
Authorization: Bearer <api-key>
```

`isValidApiKey()` / `extractApiKey()` dị na `src/sse/services/auth.ts` na-enyocha ya, a na-ebupụkwa ha ọzọ site na `src/shared/utils/apiAuth.ts`. Validator ahụ na-anabatakwa env vars `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` dị ka keys passthrough na-adịgide adịgide (okwu #1350).

### 2. Dashboard Session (cookie auth_token)

Maka ibe dashboard na ọrụ admin.

```
Cookie: auth_token=<JWT signed with JWT_SECRET>
```

Cookie bụ session naanị mgbe JWT gafere nyocha **ma** nwee `authenticated: true`
(`src/shared/utils/dashboardSessionToken.ts` → `verifyDashboardSessionToken`). Onye ọ bụla
na-eji cookie ahụ (route guard, authz pipeline refresh, WebSocket handshake, live
server, `/api/settings/require-login`, `/api/auth/status`) na-agafe na helper ahụ.
JWT ndị ọzọ e ji `JWT_SECRET` bịanye aka dị — Cursor CLI passthrough na-emepụta
tokens `iss "omniroute" / aud "cursor-cli"` maka ndị ji key — ma ha anaghị abụ sessions
(#13298).

`isDashboardSessionAuthenticated()` dị na `src/shared/utils/apiAuth.ts` na-enyocha ya. Pipeline ahụ na-eme JWT auto-refresh mgbe oge fọdụrụ tupu njedebe ya pere mpe karịa ụbọchị 7 n'ime ndụ ụbọchị 30 ya.

Ụfọdụ routes njikwa na-anabata **nke ọ bụla** n'ime ụzọ abụọ ahụ: cookie MA Ọ BỤ `Bearer <key>` mgbe API key nwere scope `manage` (ma ọ bụ `admin`). Nke a bụ ihe na-eme ka usoro ọrụ "a pụrụ ịhazi site na API calls" nke agbakwunyere na v3.8 kwe omume.

#### Ọnụ ụzọ nbanye OIDC nhọrọ (#6973)

Nbanye admin nke dashboard na-akwadowakwa usoro OIDC (OpenID Connect) nke bụ **nhọrọ a ga-agbanye**
n'akụkụ nbanye password ndabara — anaghị ewepụ nbanye password mgbe ọ bụla, a na-
agbakwụnye naanị ụzọ ọzọ:

- Ọ na-anọ na disabled belụsọ ma `settings.oidcEnabled === true` **ma** ahaziela `oidcIssuer` /
  `oidcClientId` / `oidcClientSecret` niile (Settings → Auth).
  `GET /api/auth/oidc/login` na-eweghachi `400` ma ọ bụghị ya.
- `GET /api/auth/oidc/login` na-achọpụta `authorization_endpoint` site na
  `/.well-known/openid-configuration` nke issuer (ọ bụrụ na nke ahụ adịghị, ọ na-eji
  `<issuer>/authorize`), na-ewulite redirect URI site na arịrịọ batara
  (na-eburu `x-forwarded-proto` n'uche), wee redirect gaa na IdP na `state`
  random echekwara n'ime cookie `oidc_state` nke bụ `httpOnly`.
- `GET /api/auth/oidc/callback` na-enyocha `state`, na-agbanwe authorization
  code, ma na-enyocha signature nke ID token site na JWKS nke issuer
  (`createRemoteJWKSet` nke `jose`, nke echekwara na cache maka JWKS URI ọ bụla) tinyere nyocha `issuer`/`audience`.
  Allowlist `oidcAllowedSubjects` nke bụ nhọrọ na-atụnyere claim `sub`
  nke token ma ọ bụ claim `email` ya — a na-anabata claim email naanị mgbe
  `email_verified === true`, ya mere email IdP na-akwadoghị enweghị ike ịgafe
  ọnụ ụzọ ahụ.
- Mgbe ọ gara nke ọma, ọ na-emepụta **otu kpọmkwem** JWT `auth_token` nke ụbọchị 30
  nbanye password na-emepụta (`src/app/api/auth/login/route.ts`), ya mere akụkụ ndị ọzọ nke
  dashboard session pipeline (auto-refresh, cookie flags) anaghị agbanwe —
  OIDC na-edochi naanị ụzọ e si emepụta cookie ahụ, ọ bụghị ikike ọ na-enye.

## Klas Ụzọ

`src/server/authz/types.ts` na-akọwapụta klas atọ; ụzọ ọ bụla a na-apụghị ikewa n'ụzọ doro anya ga-adaba na `MANAGEMENT`.

| Klas         | Nkọwa                                                                                                                                                            | Nkwenye njirimara achọrọ                                                 |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| `PUBLIC`     | Ụzọ ndị e kwuru hoo haa na ha dị nchebe — nbanye, ọpụpụ, ọnọdụ, mmalite, ahụike, na mbido onboarding.                                                            | Ọ dịghị                                                                  |
| `CLIENT_API` | Ebe njedebe ndị na-enye model — `/api/v1/*`, `/api/v1beta/*`, tinyere aha nnọchi `/v1/*`, `/v1beta/*`, `/chat/completions`, `/responses`, `/models`, `/codex/*`. | Igodo Bearer mgbe e nyere ọkọlọtọ atụmatụ `REQUIRE_API_KEY` dị irè ikike |
| `MANAGEMENT` | Peeji dashboard, ntọala, providers, igodo, yana ebe njedebe nchịkwa na nyocha nsogbu.                                                                            | Oge nnọkọ dashboard MA Ọ BỤ Bearer nwere scope `manage`                  |

## Usoro Nhazi

```
Arịrịọ na-abata → src/proxy.ts
  → runAuthzPipeline() n'ime src/server/authz/pipeline.ts
    1. Wepụ headers ime ndị a tụkwasịrị obi (x-omniroute-auth-*, x-omniroute-route-class)
    2. Mepụta id arịrịọ, jiri classifyRoute() kewaa ụzọ
    3. Ọ bụrụ na pathname == "/" → bugharịa gaa /dashboard
    4. Ọ bụrụ na a na-eme draining (mgbanyụ dị nro) ma bụrụ /api/* → 503
    5. Ọ bụrụ na ọ bụghị GET ma bụrụ /api/* → ihe nche checkBodySize()
    6. Ọ bụrụ na ọ bụ OPTIONS → CORS preflight 204
    7. Ọ bụrụ na options.enforce == false → hapụ ya ka ọ gafee na headers klas-ụzọ
    8. Ma ọ bụghị ya: POLICIES[routeClass].evaluate(ctx)
       - kwe → tinye x-omniroute-auth-{kind,id,label,scopes} → NextResponse.next()
       - jụ → njehie JSON nwere correlation_id (peeji dashboard → 302 /login)
```

A na-**ewepụ headers ime ndị a tụkwasịrị obi n'arịrịọ na-abata** (akọwapụtara na `src/server/authz/headers.ts`) tupu nkewa — ndị ahịa enweghị ike ibu ụzọ tinye `x-omniroute-auth-*` iji mee ka à ga-asị na ha bụ subject ọzọ.

### Nkwekọrịta policy

Klas ụzọ ọ bụla nwere policy na `src/server/authz/policies/`:

- **`publicPolicy`** (`policies/public.ts`) — na-eweghachi `allow({ kind: "anonymous", id: "anonymous" })` mgbe niile.
- **`clientApiPolicy`** (`policies/clientApi.ts`) — na-ewepụta Bearer, wee jiri `validateApiKey()` nyochaa ya. Ọ na-adaba na anonymous naanị mgbe agbanyụrụ ọkọlọtọ atụmatụ `REQUIRE_API_KEY` dị irè. A na-ekpebi ọkọlọtọ dị irè site na `isRequireApiKeyEnabled()` (`mgbanwe ọkọlọtọ atụmatụ DB > process.env.REQUIRE_API_KEY > uru ndabara`) ka Dashboard Feature Flags na environment variables nwee ike ịchịkwa `/api/v1/*`, `/api/v1beta/*`, na aha nnọchi n'otu ụzọ; ọdịda resolver na-eme ka usoro ahụ jụ arịrịọ. Ọ na-ekwe arịrịọ oge nnọkọ dashboard n'ụzọ client API (gụnyere `/api/v1/models`, nke katalọgụ model dashboard na-eji).
- **`managementPolicy`** (`policies/management.ts`) — na-anabata oge nnọkọ dashboard, arịrịọ model-sync ime (nke e jiri `/api/providers/[name]/(sync-models|models)` tụnyere), ma ọ bụ na-awụfe kpamkpam ma ọ bụrụ na `isAuthRequired()` weghachiri false. Ọ na-eweghachi 403 (`AUTH_001`) mgbe token Bearer dị mana ọ bụghị nke ziri ezi, ma ọ bụghị ya ọ na-eweghachi 401. Ọ na-amanyekwa ọkwa route-guard (LOCAL_ONLY / ALWAYS_PROTECTED) tupu ngalaba nkwenye njirimara ọ bụla — lee [Ọkwa Route Guard](../security/ROUTE_GUARD_TIERS.md). Enwere ike ịnweta ụzọ LOCAL_ONLY dị na `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` (ugbu a: `/api/mcp/`) site na ebe na-abụghị loopback mgbe igodo Bearer nwere scope `manage`; ụzọ LOCAL_ONLY ndị ọzọ niile ga-anọgide na-achọ loopback kpọmkwem n'agbanyeghị scope.

Policy gara nke ọma na-eweghachi `AuthSubject` nwere `kind ∈ { client_api_key, dashboard_session, management_key, anonymous }`. Ndị handler nọ n'okpuru nwere ike iji `assertAuth(request, "CLIENT_API")` dị na `src/server/authz/assertAuth.ts` gụọ ya kama ịmegharị logic nkwenye njirimara ọzọ.

## Ndepụta Ụzọ Ọha

`src/shared/constants/publicApiRoutes.ts` bụ ndepụta nnabata akọwapụtara kpọmkwem:

E kewara ndepụta ahụ dịka **ọdịdị** ya si dị, nkewa ahụ dịkwa oke mkpa (GHSA-74g9-q8f6-793h): a na-eji `startsWith()` atụnyere prefix, ya mere ọ na-adabakwa n’ụzọ niile dị ya n’akụkụ nke nwere mkpụrụedemede mmalite ndị ahụ. Iji `/api/usage/om-usage` dịka prefix mere ka `/api/usage/om-usage<anything>` bụrụ nke ỌHA, Next wee tụgharịa nke ahụ gaa na `/api/usage/[connectionId]` — handler na-enweghị nyocha njirimara nke ya.

```ts
// Ezi subtrees. Ntinye ọ bụla GA-EJEDebe na "/" (unit test na-enyocha nke a).
PUBLIC_API_ROUTE_PREFIXES = [
  "/api/auth/oidc/",
  "/api/v1/", // a na-ewere ya dịka CLIENT_API na classify, ọ bụghị dịka ọha “na-enweghị auth”
  "/api/oauth/",
  "/api/codex/connect/",
  "/api/telegram/",
  "/api/cursor-cli/",
];

// Ụzọ ndị kwụụrụ onwe ha, a na-atụnyere ha KPỌMKWEM (ma ha nwere slash ikpeazụ ma ọ bụ na ha enweghị).
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

// Ụzọ ndị kwụụrụ onwe ha nke bụ naanị maka ịgụ ma na-enwetakwa mbelata mmachi origin nke CORS.
PUBLIC_READONLY_CORS_API_ROUTES = [
  "/api/health/ping",
  "/api/monitoring/health",
  "/api/settings/require-login",
];

// Otu ụzọ kwụụrụ onwe ya nke bụ naanị maka ịgụ NA-ENWEGHỊ mbelata mmachi CORS.
PUBLIC_READONLY_API_ROUTES_EXACT = new Set(["/api/health"]);

PUBLIC_READONLY_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
```

Ụzọ ndị bụ naanị maka ịgụ bụ nke ọha **naanị** maka method ndị dị nchebe. Rịba ama: `classifyRoute()` na-ewepụ `/api/v1/*` na `/api/v1beta/*` na PUBLIC fall-through — ndị ahụ na-abụ `CLIENT_API` mgbe niile ka iwu Bearer-key ka na-emetụta ha.

## Ịgbakwunye Ụzọ Ọhụrụ

### Ụkpụrụ 1 — Endpoint API client nke ọha (Bearer-auth)

A na-ekewa ụzọ ndị dị n’okpuru `/api/v1/` na `/api/v1beta/` dịka `CLIENT_API` na-akpaghị aka. Middleware na-amanye nyocha Bearer; route handlers adịghị mkpa imegharị ya, mana ha nwere ike ịgụ subject ma ọ bụrụ na ọ bara uru.

```typescript
// src/app/api/v1/your-route/route.ts
import { NextRequest, NextResponse } from "next/server";
import { assertAuth } from "@/server/authz/assertAuth";

export async function POST(req: NextRequest) {
  const subject = assertAuth(req, "CLIENT_API");
  // subject.kind === "client_api_key" | "anonymous" | "dashboard_session"
  // ... loojik handler
}
```

### Ụkpụrụ 2 — Endpoint njikwa (session ma ọ bụ Bearer + manage)

Jiri `requireManagementAuth()` sitere na `src/lib/api/requireManagementAuth.ts`:

```typescript
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

export async function POST(request: Request) {
  const rejection = await requireManagementAuth(request);
  if (rejection) return rejection;
  // ... loojik handler
}
```

`requireManagementAuth()` na-eweghachi `null` mgbe ọ gara nke ọma, ma ọ bụ `Response` njehie JSON:

- 401 `AUTH_001` "Achọrọ nkwenye njirimara" — enweghị credentials ọ bụla
- 403 — Bearer adịghị irè **ma ọ bụ** Bearer dị, mana key enweghị scope `manage` / `admin`

`hasManageScope(scopes)` na-eweghachi true maka `"manage"` ma ọ bụ `"admin"`.

### Ụkpụrụ 3 — Ịgbakwunye na ndepụta nnabata ọha

Họrọ set dịka ọdịdị si dị, ọ bụghị dịka mfe si dị. Otu ụzọ ga-abanye na `PUBLIC_API_ROUTES_EXACT` (ma ọ bụ `PUBLIC_READONLY_CORS_API_ROUTES` ma ọ bụrụ na ọ bụ naanị GET); naanị ezigbo subtree ga-abanye na `PUBLIC_API_ROUTE_PREFIXES`, ọ **ga-ejedebekwa na `/`**. Itinye otu ụzọ na ndepụta prefix na-emekwa ka ụzọ niile dị ya n’akụkụ nke nwere mkpụrụedemede mmalite ndị ahụ bụrụ nke ọha — gụnyere dynamic-segment siblings ndị a ga-agbakwunye n’ọdịnihu (GHSA-74g9-q8f6-793h). Melite unit tests dị na `tests/unit/public-api-routes.test.ts`, `tests/unit/authz/public-route-exact-match.test.ts` na `tests/unit/authz/classify.test.ts`.

## Scopes

Oghere aha atọ. Nyocha ọ bụla na-agụ naanị eriri nke ya. N'akụkụ,
gụnyere ihe mere `manage` ji ada `scopeMatches` maka `read:compression` na ihe mere
akara ngosi nnweta `read` enweghị ike `PATCH /api/keys/{id}`, bụ
[Oghere aha atọ](../frameworks/MCP-SERVER.md#three-scope-namespaces).

Igodo API na-ebu usoro `scopes` (echekwara dị ka JSON na `api_keys.scopes`, lee `src/lib/db/apiKeys.ts`).

### Oghere njikwa

- `manage` / `admin` — `hasManageScope`. Nnweta onye na-ebu ụzọ na ụzọ API njikwa.
- `mcp:connect`, `self:usage`, `self:account-quota`, na
  `policy:bypass-provider-quota` bụ oghere mgbakwunye kwekọrọ kpọmkwem. Ha nọ ọdụ
  na mpụga `MANAGEMENT_API_KEY_SCOPES`. `mcp:connect` na-emepe naanị
  `/api/mcp/` ihe osise na-abụghị loopback.

### Oghere ngwaọrụ MCP

Ndepụta na iwu dakọtara (eriri yiri ya, ma ọ bụ oghere enyere na-ejedebe na `*`):
[Oghere ngwaọrụ MCP](../frameworks/MCP-SERVER.md#mcp-tool-scopes).
`MCP_SCOPE_LIST` na `src/shared/constants/mcpScopes.ts` bụ obere ụdị mbụ,
ọ bụghị ndepụta zuru ezu ahụ. Mmejuputa iwu na-agba ọsọ na
`open-sse/mcp-server/scopeEnforcement.ts` mgbe `resolveCallerScopeContext()`
doziri oghere site na ozi nkwenye MCP, metadata arịrịọ, ma ọ bụ `OMNIROUTE_MCP_SCOPES`.
Ọ na-anọgide na-agbanyụ ma ọ bụrụ na `OMNIROUTE_MCP_ENFORCE_SCOPES=true`.

### Oghere akara ngosi nnweta

`read` / `write` / `admin` na akara ngosi `oma_live_…`, nke `scopeSatisfies`
(`src/lib/accessTokens/scopes.ts`) depụtara. Ọkwa a na-emetụta naanị
asambodo akara ngosi nnweta. Lee [Nkwenye Njikwa](../guides/MANAGEMENT-AUTH.md).

## Mgbanwe Nhọrọ Maka Ịchọ Nnyocha Njirimara

`isAuthRequired()` dị na `src/shared/utils/apiAuth.ts` na-ekpebi ma a ga-amanye nyocha njirimara **ọ bụla** maka arịrịọ:

- `settings.requireLogin === false` → agbanyụrụ nyocha njirimara n'ụwa niile.
- Ọ bụrụ na ahazighị okwuntughe **ma** enweghị env var `INITIAL_PASSWORD` → ọnọdụ bootstrap na-ekwe ka ọkachamara ntọlite mbụ na arịrịọ loopback gafee, mana arịrịọ netwọkụ ekpughere ka chọrọ ozi nzere.
- Njehie DB ọ bụla → na-ajụ ohere mgbe njehie mere (nchekwa-na-mbụ).

Mmanye igodo API nke ahịa na-eji `isRequireApiKeyEnabled()` dị na `src/shared/utils/featureFlags.ts`, ọ bụghị ịgụ `process.env.REQUIRE_API_KEY` ozugbo. Nke a dị mkpa maka nrụnye ndị ebugoro: ịgbanwe `REQUIRE_API_KEY` na Dashboard → Feature Flags na-echekwa mgbanwe DB ma na-emetụta ozugbo `/v1/*`, `/v1beta/*`, `/models`, `/responses`, `/chat/completions`, `/codex/*`, na nyocha njirimara API ahịa ndị ọzọ na-eji otu ihe enyemaka a. Ọ bụrụ na enweghị ike ịgụ ebe nchekwa ọkọlọtọ njirimara ahụ, nyocha njirimara API ahịa na-ajụ ohere mgbe njehie mere ma chọọ igodo.

## Mgbanwe Na-emebi Ndakọrịta — v3.8.0

Ebe njedebe `/api/v1/agents/tasks/*` na `/api/resilience/model-cooldowns` **chọrọ ugbu a nyocha njirimara njikwa** (commit `588a0333`). Ndị ahịa na-ezibu igodo API nkịtị na-enweghị oke ikike `manage` ga-enweta `403`. Mbugharị: nye igodo ahụ oke ikike `manage` na dashboard API Keys, ma ọ bụ jiri session dashboard nke abanyela.

## Mgbanwe Omume — v3.8.2

`/api/mcp/*` (sava MCP dịpụrụ adịpụ) ka bụ LOCAL_ONLY na ndabara mana ugbu a ọ na-anabata arịrịọ na-abụghị loopback mgbe header `Authorization: Bearer <api-key>` nwere oke ikike `manage`. A na-achịkwa mwepu a kpọmkwem n'ụzọ ọ bụla site na `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` dị na `src/server/authz/routeGuard.ts`; a kpachaara anya mee ka prefix LOCAL_ONLY ibe ya `/api/cli-tools/runtime/*` ghara inwe ike ịgafe mmachi n'ihi na ọ nwere ike ịmalite subprocess ọ bụla. Arịrịọ na-enweghị njirimara e zigara `/api/mcp/*` site na ebe na-abụghị loopback ka ga-enwetakwa `403 LOCAL_ONLY` — ndabara maka ụzọ LOCAL_ONLY ọhụrụ ọ bụla ka bụ naanị-loopback siri ike. Lee [Ọkwa Nchekwa Ụzọ](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out).

## Nnwale

- Nnwale unit: `tests/unit/authz/` — `classify.test.ts`, `pipeline.test.ts`, `client-api-policy.test.ts`, `management-policy.test.ts`, `public-policy.test.ts`.
- Ndepụta ohere ọha: `tests/unit/public-api-routes.test.ts`.
- Gbaa nnwale lekwasịrị anya: `node --import tsx/esm --test tests/unit/authz/classify.test.ts`.

## Nchọpụta nsogbu

Pipeline ahụ na-etinye ihe ndị a mgbe niile na nzaghachi:

```
x-request-id:               <NJ njikọ, a na-emegharị ya n'ime ahụ njehie>
x-omniroute-route-class:    PUBLIC | CLIENT_API | MANAGEMENT
```

Maka arịrịọ ndị enyochala njirimara ha, nkụnye isi arịrịọ upstream (n'akụkụ handler) na-agụnyekwa:

```
x-omniroute-auth-kind:      client_api_key | dashboard_session | management_key | anonymous
x-omniroute-auth-id:        key_<last-4> | "dashboard" | "anonymous"
x-omniroute-auth-label:     (nhọrọ)
x-omniroute-auth-scopes:    ndepụta e ji rikoma kewaa
```

Jiri `assertAuth(req, expectedClass)` n'ime handlers — ọ na-atụpụta `AuthzAssertionError` nwere koodu `AUTHZ_NOT_INITIALIZED` ma ọ bụrụ na agafere middleware ahụ (nke a bara uru maka ịchọpụta ndaghachi azụ na nhazi n'ime ule).

## Hụkwa

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — akara nkwenye maka njedebe ọ bụla
- [COMPLIANCE.md](../security/COMPLIANCE.md) — ndekọ nyocha maka ihe omume nkwenye
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md#three-scope-namespaces) — oghere aha atọ na katalọgụ ngwaọrụ MCP
- Isi mmalite: `src/server/authz/`, `src/lib/api/requireManagementAuth.ts`
