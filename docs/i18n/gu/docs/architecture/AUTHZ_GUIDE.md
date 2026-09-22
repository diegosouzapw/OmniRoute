# Authorization Guide (ગુજરાતી)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/AUTHZ_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/AUTHZ_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/AUTHZ_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/AUTHZ_GUIDE.md)

---

> **સત્યનો અધિકૃત સ્રોત:** `src/server/authz/`, `src/shared/constants/publicApiRoutes.ts`, `src/lib/api/requireManagementAuth.ts`, `src/shared/utils/apiAuth.ts`
> **છેલ્લે અપડેટ કરેલું:** 2026-06-28 — v3.8.40

OmniRoute પાસે રૂટ-જાગૃત અધિકૃતતા પાઇપલાઇન છે, જે દરેક API વિનંતીને નિયંત્રિત કરે છે. વર્ગીકરણ **નિર્ણાયક** અને **નિષ્ફળતા વખતે બંધ** છે — જે કંઈપણ વર્ગીકૃત કરી શકાતું નથી તે `MANAGEMENT` તરીકે સમાપ્ત થાય છે અને સેશન અથવા મેનેજમેન્ટ-ગ્રેડ ટોકનની આવશ્યકતા રાખે છે. આ પાનું રૂટ્સની જાળવણી કરતા અથવા નવા એન્ડપોઇન્ટ્સ ડિઝાઇન કરતા એન્જિનિયરો માટે મોડેલ સમજાવે છે.

![AuthZ પાઇપલાઇન (3 રૂટ વર્ગો + નીતિ મૂલ્યાંકન)](../diagrams/exported/authz-pipeline.svg)

> સ્રોત: [diagrams/authz-pipeline.mmd](../diagrams/authz-pipeline.mmd)

## બે પ્રમાણીકરણ મોડ

### 1. API કી (Bearer)

OpenAI/Anthropic/Gemini-સુસંગત ક્લાયન્ટ APIs માટે અને કી પાસે `manage` સ્કોપ હોય ત્યારે કેટલાક મેનેજમેન્ટ રૂટ્સ માટે વપરાય છે.

```
Authorization: Bearer <api-key>
```

`src/sse/services/auth.ts` માં `isValidApiKey()` / `extractApiKey()` દ્વારા માન્ય કરવામાં આવે છે અને `src/shared/utils/apiAuth.ts` મારફતે ફરીથી નિકાસ કરવામાં આવે છે. વેલિડેટર `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` એન્વાયરમેન્ટ વેરિએબલ્સને સ્થાયી પાસથ્રૂ કીઓ તરીકે પણ સ્વીકારે છે (ઇશ્યૂ #1350).

### 2. ડૅશબોર્ડ સેશન (auth_token કૂકી)

ડૅશબોર્ડ પાનાંઓ અને એડમિન ઑપરેશન્સ માટે.

```
Cookie: auth_token=<JWT signed with JWT_SECRET>
```

કૂકી માત્ર ત્યારે જ સેશન ગણાય છે જ્યારે JWT ચકાસાય **અને** તેમાં `authenticated: true`
હોય (`src/shared/utils/dashboardSessionToken.ts` → `verifyDashboardSessionToken`). કૂકીનો દરેક
ઉપભોક્તા (રૂટ ગાર્ડ, authz પાઇપલાઇન રિફ્રેશ, WebSocket હૅન્ડશેક, લાઇવ
સર્વર, `/api/settings/require-login`, `/api/auth/status`) તે હેલ્પર મારફતે જાય છે.
`JWT_SECRET` વડે સહી કરાયેલા અન્ય JWTs પણ અસ્તિત્વમાં છે — Cursor CLI પાસથ્રૂ કી ધારકો માટે
`iss "omniroute" / aud "cursor-cli"` ટોકન્સ બનાવે છે — અને તે ક્યારેય સેશન્સ નથી
(#13298).

`src/shared/utils/apiAuth.ts` માં `isDashboardSessionAuthenticated()` દ્વારા ચકાસવામાં આવે છે. જ્યારે JWTના 30-દિવસના જીવનકાળમાંથી 7 દિવસથી ઓછો સમય બાકી હોય ત્યારે પાઇપલાઇન તેને આપમેળે રિફ્રેશ કરે છે.

કેટલાક મેનેજમેન્ટ રૂટ્સ **બેમાંથી કોઈપણ** મોડ સ્વીકારે છે: કૂકી અથવા `Bearer <key>`, જ્યારે API કી પાસે `manage` (અથવા `admin`) સ્કોપ હોય. આ જ બાબત v3.8 માં ઉમેરાયેલ "API કૉલ્સ દ્વારા કૉન્ફિગર કરી શકાય તેવું" વર્કફ્લો સક્ષમ કરે છે.

#### વૈકલ્પિક OIDC લૉગિન ગેટ (#6973)

ડૅશબોર્ડ એડમિન લૉગિન ડિફૉલ્ટ પાસવર્ડ લૉગિનની સાથે **ઑપ્ટ-ઇન** OIDC (OpenID Connect) ફ્લોને પણ સપોર્ટ કરે છે — પાસવર્ડ લૉગિન ક્યારેય દૂર થતું નથી, માત્ર તેમાં ઉમેરો થાય છે:

- જ્યાં સુધી `settings.oidcEnabled === true` **અને** `oidcIssuer` /
  `oidcClientId` / `oidcClientSecret` બધાં કૉન્ફિગર થયેલાં ન હોય ત્યાં સુધી અક્ષમ રહે છે (સેટિંગ્સ → પ્રમાણીકરણ).
  અન્યથા `GET /api/auth/oidc/login` `400` પરત કરે છે.
- `GET /api/auth/oidc/login` ઇશ્યૂઅરના
  `/.well-known/openid-configuration` માંથી `authorization_endpoint` શોધે છે (`<issuer>/authorize`
  નો ફૉલબૅક તરીકે ઉપયોગ કરે છે), આવનારી વિનંતીમાંથી રીડાયરેક્ટ URI બનાવે છે
  (`x-forwarded-proto`-જાગૃત), અને `httpOnly` `oidc_state` કૂકીમાં સંગ્રહિત રૅન્ડમ `state`
  સાથે IdP તરફ રીડાયરેક્ટ કરે છે.
- `GET /api/auth/oidc/callback` `state` ને માન્ય કરે છે, ઑથોરાઇઝેશન
  કોડની અદલાબદલી કરે છે અને ઇશ્યૂઅરના JWKS મારફતે ID ટોકનની સહી ચકાસે છે
  (`jose`નું `createRemoteJWKSet`, દરેક JWKS URI માટે કૅશ કરેલું), જેમાં `issuer`/`audience`
  ચકાસણીઓ સામેલ છે. વૈકલ્પિક `oidcAllowedSubjects` અનુમતિસૂચિ ટોકનના
  `sub` ક્લેમ અથવા તેના `email` ક્લેમ સાથે મેળ ખાય છે — email ક્લેમને માત્ર ત્યારે જ માન્ય ગણવામાં આવે છે જ્યારે
  `email_verified === true` હોય, તેથી IdP પરનું અચકાસાયેલું email ક્યારેય
  ગેટ પાર કરી શકતું નથી.
- સફળતા પર તે પાસવર્ડ લૉગિન દ્વારા જારી થતા **ચોક્કસ એ જ** 30-દિવસના `auth_token` JWT ને
  બનાવે છે (`src/app/api/auth/login/route.ts`), તેથી બાકીની
  ડૅશબોર્ડ સેશન પાઇપલાઇન (ઑટો-રિફ્રેશ, કૂકી ફ્લૅગ્સ) યથાવત્ રહે છે —
  OIDC માત્ર કૂકી કેવી રીતે બનાવવામાં આવે છે તેને બદલે છે, તે કયા અધિકારો આપે છે તેને નહીં.

## રૂટ વર્ગો

`src/server/authz/types.ts` ત્રણ વર્ગો વ્યાખ્યાયિત કરે છે; જે કોઈ રૂટનું નિશ્ચિતપણે વર્ગીકરણ કરી શકાતું નથી તે `MANAGEMENT` પર પાછું જાય છે.

| વર્ગ         | વર્ણન                                                                                                                                                 | જરૂરી પ્રમાણીકરણ                                                |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| `PUBLIC`     | સ્પષ્ટપણે સુરક્ષિત રૂટ્સ — લૉગિન, લૉગઆઉટ, સ્થિતિ, પ્રારંભ, હેલ્થ, ઑનબોર્ડિંગ બુટસ્ટ્રૅપ.                                                              | કોઈ નહીં                                                        |
| `CLIENT_API` | મૉડલ-સર્વિંગ એન્ડપોઇન્ટ્સ — `/api/v1/*`, `/api/v1beta/*`, તેમજ ઉપનામો `/v1/*`, `/v1beta/*`, `/chat/completions`, `/responses`, `/models`, `/codex/*`. | અસરકારક `REQUIRE_API_KEY` ફીચર ફ્લૅગ સક્ષમ હોય ત્યારે Bearer કી |
| `MANAGEMENT` | ડૅશબોર્ડ પૃષ્ઠો, સેટિંગ્સ, પ્રોવાઇડર્સ, કીઓ, ઍડમિન અને ડાયગ્નોસ્ટિક્સ એન્ડપોઇન્ટ્સ.                                                                   | ડૅશબોર્ડ સેશન અથવા `manage` સ્કોપ ધરાવતું Bearer                |

## પાઇપલાઇન

```
આવતી રિક્વેસ્ટ → src/proxy.ts
  → src/server/authz/pipeline.ts માં runAuthzPipeline()
    1. વિશ્વસનીય આંતરિક હેડર્સ દૂર કરો (x-omniroute-auth-*, x-omniroute-route-class)
    2. રિક્વેસ્ટ id બનાવો, classifyRoute() દ્વારા રૂટનું વર્ગીકરણ કરો
    3. જો pathname == "/" → /dashboard પર રીડાયરેક્ટ કરો
    4. જો ડ્રેઇનિંગ (ગ્રેસફુલ શટડાઉન) ચાલુ હોય અને /api/* હોય → 503
    5. જો non-GET /api/* હોય → checkBodySize() ગાર્ડ
    6. જો OPTIONS હોય → CORS પ્રીફ્લાઇટ 204
    7. જો options.enforce == false હોય → route-class હેડર્સ સાથે પાસ-થ્રૂ
    8. અન્યથા: POLICIES[routeClass].evaluate(ctx)
       - મંજૂર કરો  → x-omniroute-auth-{kind,id,label,scopes} લગાવો → NextResponse.next()
       - નકારો → correlation_id સાથે JSON ભૂલ (ડૅશબોર્ડ પૃષ્ઠો → 302 /login)
```

વિશ્વસનીય આંતરિક હેડર્સ (`src/server/authz/headers.ts` માં વ્યાખ્યાયિત) વર્ગીકરણ પહેલાં **આવતી રિક્વેસ્ટ્સમાંથી દૂર કરવામાં આવે છે** — ક્લાયન્ટ્સ કોઈ સબ્જેક્ટનો ઢોંગ કરવા માટે `x-omniroute-auth-*` ને અગાઉથી ભરી શકતા નથી.

### પૉલિસી કરારો

દરેક રૂટ વર્ગ માટે `src/server/authz/policies/` માં એક પૉલિસી છે:

- **`publicPolicy`** (`policies/public.ts`) — હંમેશા `allow({ kind: "anonymous", id: "anonymous" })` પરત કરે છે.
- **`clientApiPolicy`** (`policies/clientApi.ts`) — Bearer કાઢે છે, `validateApiKey()` દ્વારા તેને માન્ય કરે છે. અસરકારક `REQUIRE_API_KEY` ફીચર ફ્લૅગ અક્ષમ હોય ત્યારે જ અનામી ઍક્સેસ પર આગળ વધે છે. અસરકારક ફ્લૅગનું નિરાકરણ `isRequireApiKeyEnabled()` (`DB ફીચર ફ્લૅગ ઓવરરાઇડ > process.env.REQUIRE_API_KEY > ડિફૉલ્ટ`) દ્વારા થાય છે, જેથી ડૅશબોર્ડ ફીચર ફ્લૅગ્સ અને એન્વાયર્નમેન્ટ વેરિએબલ્સ `/api/v1/*`, `/api/v1beta/*` અને ઉપનામોને સુસંગત રીતે નિયંત્રિત કરે; રિઝોલ્વર નિષ્ફળતાઓ સુરક્ષિત રીતે ઍક્સેસ નકારે છે. ક્લાયન્ટ API રૂટ્સ પર ડૅશબોર્ડ-સેશન રિક્વેસ્ટ્સને મંજૂરી આપે છે (ડૅશબોર્ડ મૉડલ કૅટલૉગ દ્વારા ઉપયોગમાં લેવાતા `/api/v1/models` સહિત).
- **`managementPolicy`** (`policies/management.ts`) — ડૅશબોર્ડ સેશન, આંતરિક મૉડલ-સિંક રિક્વેસ્ટ્સ (`/api/providers/[name]/(sync-models|models)` સામે મેળ ખાતી) સ્વીકારે છે અથવા જો `isAuthRequired()` false પરત કરે તો સંપૂર્ણપણે અવગણે છે. Bearer ટોકન હાજર પરંતુ અમાન્ય હોય ત્યારે 403 (`AUTH_001`), અન્યથા 401 પરત કરે છે. કોઈપણ પ્રમાણીકરણ શાખા પહેલાં રૂટ-ગાર્ડ સ્તરો (LOCAL_ONLY / ALWAYS_PROTECTED) પણ લાગુ કરે છે — [રૂટ ગાર્ડ સ્તરો](../security/ROUTE_GUARD_TIERS.md) જુઓ. `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` માં રહેલા LOCAL_ONLY પાથ્સ (હાલમાં: `/api/mcp/`) ને Bearer કી `manage` સ્કોપ ધરાવતી હોય ત્યારે non-loopback પરથી ઍક્સેસ કરી શકાય છે; અન્ય તમામ LOCAL_ONLY પાથ્સ સ્કોપને ધ્યાનમાં લીધા વિના strict-loopback જ રહે છે.

સફળ પૉલિસી `kind ∈ { client_api_key, dashboard_session, management_key, anonymous }` સાથે `AuthSubject` પરત કરે છે. ડાઉનસ્ટ્રીમ હૅન્ડલર્સ પ્રમાણીકરણ લૉજિક ફરીથી ચલાવવાને બદલે `src/server/authz/assertAuth.ts` માં `assertAuth(request, "CLIENT_API")` દ્વારા તેને વાંચી શકે છે.

## જાહેર રૂટ્સની સૂચિ

`src/shared/constants/publicApiRoutes.ts` એ સ્પષ્ટ allowlist છે:

સૂચિને **આકાર** અનુસાર વિભાજિત કરવામાં આવી છે, અને આ વિભાજન અત્યંત મહત્ત્વપૂર્ણ છે (GHSA-74g9-q8f6-793h): prefix ને
`startsWith()` વડે match કરવામાં આવે છે, તેથી તે સમાન શરૂઆતના અક્ષરો ધરાવતા દરેક નજીકના path સાથે પણ match થાય છે.
prefix તરીકે `/api/usage/om-usage` એ `/api/usage/om-usage<anything>` ને PUBLIC તરીકે ચિહ્નિત કર્યું હતું, અને Next તેને
`/api/usage/[connectionId]` તરીકે resolve કરે છે — એવો handler જેનું પોતાનું કોઈ auth નથી.

```ts
// વાસ્તવિક subtrees. દરેક entry "/" પર સમાપ્ત થવી જ જોઈએ (unit test દ્વારા ચકાસાયેલ).
PUBLIC_API_ROUTE_PREFIXES = [
  "/api/auth/oidc/",
  "/api/v1/", // classify માં CLIENT_API તરીકે ગણાય છે, "no-auth public" તરીકે નહીં
  "/api/oauth/",
  "/api/codex/connect/",
  "/api/telegram/",
  "/api/cursor-cli/",
];

// એકલ routes, EXACTLY match કરવામાં આવે છે (અંતે slash હોય કે ન હોય).
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

// ફક્ત વાંચવા માટેના એકલ routes, જેમને CORS origin relaxation પણ મળે છે.
PUBLIC_READONLY_CORS_API_ROUTES = [
  "/api/health/ping",
  "/api/monitoring/health",
  "/api/settings/require-login",
];

// CORS relaxation વિનાનો ફક્ત વાંચવા માટેનો એકલ route.
PUBLIC_READONLY_API_ROUTES_EXACT = new Set(["/api/health"]);

PUBLIC_READONLY_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
```

ફક્ત વાંચવા માટેના routes માત્ર સુરક્ષિત methods માટે જ જાહેર છે. નોંધ: `classifyRoute()` `/api/v1/*` અને `/api/v1beta/*` ને PUBLIC fall-through માંથી બાકાત રાખે છે — તે હંમેશાં `CLIENT_API` હોય છે, જેથી Bearer-key policy હજી પણ લાગુ પડે.

## નવો Route ઉમેરવો

### Pattern 1 — જાહેર client API endpoint (Bearer-auth)

`/api/v1/` અને `/api/v1beta/` હેઠળના routes આપમેળે `CLIENT_API` તરીકે classify થાય છે. middleware Bearer check લાગુ કરે છે; route handlers એ તેને ફરી કરવાની જરૂર નથી, પરંતુ ઉપયોગી હોય તો subject વાંચી શકે છે.

```typescript
// src/app/api/v1/your-route/route.ts
import { NextRequest, NextResponse } from "next/server";
import { assertAuth } from "@/server/authz/assertAuth";

export async function POST(req: NextRequest) {
  const subject = assertAuth(req, "CLIENT_API");
  // subject.kind === "client_api_key" | "anonymous" | "dashboard_session"
  // ... handler logic
}
```

### Pattern 2 — Management endpoint (session અથવા Bearer + manage)

`src/lib/api/requireManagementAuth.ts` માંથી `requireManagementAuth()` નો ઉપયોગ કરો:

```typescript
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

export async function POST(request: Request) {
  const rejection = await requireManagementAuth(request);
  if (rejection) return rejection;
  // ... handler logic
}
```

સફળતા પર `requireManagementAuth()` `null` પરત કરે છે અથવા JSON error `Response` પરત કરે છે:

- 401 `AUTH_001` "પ્રમાણીકરણ જરૂરી છે" — કોઈ credentials જ નથી
- 403 — અમાન્ય Bearer **અથવા** Bearer હાજર છે, પરંતુ key પાસે `manage` / `admin` scope નથી

`hasManageScope(scopes)` `"manage"` અથવા `"admin"` માટે true પરત કરે છે.

### Pattern 3 — જાહેર allowlist માં ઉમેરવું

સુવિધા અનુસાર નહીં, પણ આકાર અનુસાર set પસંદ કરો. એક route `PUBLIC_API_ROUTES_EXACT` માં જાય છે (અથવા માત્ર GET માટે `PUBLIC_READONLY_CORS_API_ROUTES` માં); માત્ર વાસ્તવિક subtree જ `PUBLIC_API_ROUTE_PREFIXES` માં જાય છે, અને તે **`/` પર સમાપ્ત થવું જ જોઈએ**. prefix સૂચિમાં એકલ route મૂકવાથી સમાન શરૂઆતના અક્ષરો ધરાવતા દરેક નજીકના path પણ જાહેર થઈ જાય છે — જેમાં પછીથી ઉમેરાયેલા dynamic-segment siblings પણ સામેલ છે (GHSA-74g9-q8f6-793h). `tests/unit/public-api-routes.test.ts`, `tests/unit/authz/public-route-exact-match.test.ts` અને `tests/unit/authz/classify.test.ts` ખાતેના unit tests અપડેટ કરો.

## સ્કોપ્સ

API કીઓમાં `scopes` ઍરે હોય છે (જે `api_keys.scopes` માં JSON તરીકે સંગ્રહિત થાય છે, `src/lib/db/apiKeys.ts` જુઓ).

### મેનેજમેન્ટ સ્કોપ

- `manage` / `admin` — Bearer તરીકે મોકલવામાં આવે ત્યારે કીને મેનેજમેન્ટ API એન્ડપોઇન્ટ્સની ઍક્સેસ આપે છે.

### MCP સ્કોપ્સ (`src/shared/constants/mcpScopes.ts`)

દરેક MCP ટૂલને `MCP_TOOL_SCOPES` મારફતે ચોક્કસ સ્કોપ્સની જરૂર પડે છે. સંપૂર્ણ સૂચિ (`MCP_SCOPE_LIST`):

```
read:health, read:combos, write:combos, read:quota, read:usage,
read:models, execute:completions, execute:search, write:budget,
write:resilience, pricing:write, read:cache, write:cache,
read:compression, write:compression, read:proxies
```

`open-sse/mcp-server/server.ts` માં સ્કોપ અમલીકરણ, `resolveCallerScopeContext()` દ્વારા MCP પ્રમાણીકરણ માહિતી,
વિનંતી મેટાડેટા અથવા `OMNIROUTE_MCP_SCOPES` માંથી સ્કોપ્સ ઉકેલાયા પછી, દરેક ટૂલની સ્કોપ સૂચિ
`evaluateToolScopes()` માં પસાર કરે છે.

## પ્રમાણીકરણ આવશ્યકતા ટૉગલ

`src/shared/utils/apiAuth.ts` માંનું `isAuthRequired()` નક્કી કરે છે કે વિનંતી માટે **કોઈપણ** પ્રમાણીકરણ લાગુ કરવામાં આવે છે કે નહીં:

- `settings.requireLogin === false` → પ્રમાણીકરણ વૈશ્વિક રીતે અક્ષમ છે.
- કોઈ પાસવર્ડ કૉન્ફિગર કરેલો ન હોય **અને** `INITIAL_PASSWORD` env var ન હોય → બૂટસ્ટ્રૅપ મોડ ઑનબોર્ડિંગ વિઝાર્ડ અને લૂપબૅક વિનંતીઓને મંજૂરી આપે છે, પરંતુ નેટવર્ક પર એક્સપોઝ કરેલી વિનંતીઓ માટે હજુ પણ ઓળખપત્રો જરૂરી છે.
- કોઈપણ DB ભૂલ → ઍક્સેસ નકારી દે છે (મૂળભૂત રીતે સુરક્ષિત).

ક્લાયન્ટ API કીનું અમલીકરણ સીધું `process.env.REQUIRE_API_KEY` વાંચવાને બદલે `src/shared/utils/featureFlags.ts` માંના `isRequireApiKeyEnabled()` નો ઉપયોગ કરે છે. ડિપ્લોય કરેલા ઇન્સ્ટન્સ માટે આ મહત્ત્વપૂર્ણ છે: Dashboard → Feature Flags માં `REQUIRE_API_KEY` ટૉગલ કરવાથી DB ઓવરરાઇડ સંગ્રહિત થાય છે અને તરત જ `/v1/*`, `/v1beta/*`, `/models`, `/responses`, `/chat/completions`, `/codex/*` તથા આ હેલ્પરનો ઉપયોગ કરતી અન્ય ક્લાયન્ટ-API પ્રમાણીકરણ ચકાસણીઓને અસર કરે છે. જો ફીચર ફ્લૅગ સ્ટોર વાંચી ન શકાય, તો ક્લાયન્ટ API પ્રમાણીકરણ ઍક્સેસ નકારી દે છે અને કી જરૂરી બનાવે છે.

## બ્રેકિંગ ફેરફાર — v3.8.0

`/api/v1/agents/tasks/*` અને `/api/resilience/model-cooldowns` એન્ડપોઇન્ટ્સને **હવે મેનેજમેન્ટ પ્રમાણીકરણ જરૂરી છે** (કમિટ `588a0333`). અગાઉ `manage` સ્કોપ વિના સામાન્ય API કી મોકલતા ક્લાયન્ટ્સને `403` મળે છે. માઇગ્રેશન: API Keys ડૅશબોર્ડમાં કીને `manage` સ્કોપ આપો અથવા લૉગ-ઇન કરેલા ડૅશબોર્ડ સેશનનો ઉપયોગ કરો.

## વર્તન ફેરફાર — v3.8.2

`/api/mcp/*` (રિમોટ MCP સર્વર) મૂળભૂત રીતે હજુ પણ LOCAL_ONLY છે, પરંતુ હવે જ્યારે `Authorization: Bearer <api-key>` હેડરમાં `manage` સ્કોપ હોય ત્યારે તે નૉન-લૂપબૅક વિનંતીઓ સ્વીકારે છે. આ અપવાદને `src/server/authz/routeGuard.ts` માં `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` મારફતે દરેક પાથ માટે સ્પષ્ટ રીતે નિયંત્રિત કરવામાં આવે છે; સમકક્ષ LOCAL_ONLY પ્રીફિક્સ `/api/cli-tools/runtime/*` ને ઇરાદાપૂર્વક બાયપાસ કરી શકાતું નથી, કારણ કે તે મનસ્વી સબપ્રોસેસ શરૂ કરી શકે છે. નૉન-લૂપબૅકમાંથી `/api/mcp/*` માટેની અનામી વિનંતીઓ હજુ પણ `403 LOCAL_ONLY` પરત કરે છે — કોઈપણ નવા LOCAL_ONLY પાથ માટે મૂળભૂત નિયમ કડક-લૂપબૅક જ રહે છે. [રાઉટ ગાર્ડ સ્તરો](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out) જુઓ.

## પરીક્ષણ

- યુનિટ પરીક્ષણો: `tests/unit/authz/` — `classify.test.ts`, `pipeline.test.ts`, `client-api-policy.test.ts`, `management-policy.test.ts`, `public-policy.test.ts`.
- જાહેર અલાઉલિસ્ટ: `tests/unit/public-api-routes.test.ts`.
- કેન્દ્રિત પરીક્ષણ ચલાવો: `node --import tsx/esm --test tests/unit/authz/classify.test.ts`.

## ડિબગિંગ

પાઇપલાઇન હંમેશા પ્રતિસાદો પર નીચેના હેડર્સ મૂકે છે:

```
x-request-id:               <correlation id, ભૂલના પ્રતિસાદના મુખ્ય ભાગમાં પુનરાવર્તિત>
x-omniroute-route-class:    PUBLIC | CLIENT_API | MANAGEMENT
```

પ્રમાણિત વિનંતીઓ માટે અપસ્ટ્રીમ (હેન્ડલર-સાઇડ) વિનંતીના હેડર્સમાં નીચેના પણ સામેલ હોય છે:

```
x-omniroute-auth-kind:      client_api_key | dashboard_session | management_key | anonymous
x-omniroute-auth-id:        key_<last-4> | "dashboard" | "anonymous"
x-omniroute-auth-label:     (વૈકલ્પિક)
x-omniroute-auth-scopes:    અલ્પવિરામથી અલગ કરેલી સૂચિ
```

હેન્ડલર્સની અંદર `assertAuth(req, expectedClass)` નો ઉપયોગ કરો — જો મિડલવેરને બાયપાસ કરવામાં આવ્યું હોય, તો તે `AUTHZ_NOT_INITIALIZED` કોડ સાથે `AuthzAssertionError` થ્રો કરે છે (ટેસ્ટ્સમાં કન્ફિગરેશન રિગ્રેશન્સ શોધવા માટે ઉપયોગી).

## આ પણ જુઓ

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — દરેક એન્ડપોઇન્ટ માટે ઑથ માર્કર
- [COMPLIANCE.md](../security/COMPLIANCE.md) — ઑથ ઇવેન્ટ્સ માટે ઑડિટ લૉગ
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md) — MCP સ્કોપ અમલીકરણની વિગતો
- સ્રોત: `src/server/authz/`, `src/lib/api/requireManagementAuth.ts`
