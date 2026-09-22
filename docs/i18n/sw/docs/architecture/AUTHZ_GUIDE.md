# Authorization Guide (Kiswahili)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/AUTHZ_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/AUTHZ_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/AUTHZ_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/AUTHZ_GUIDE.md)

---

> **Chanzo rasmi:** `src/server/authz/`, `src/shared/constants/publicApiRoutes.ts`, `src/lib/api/requireManagementAuth.ts`, `src/shared/utils/apiAuth.ts`
> **Ilisasishwa mara ya mwisho:** 2026-06-28 — v3.8.40

OmniRoute ina mtiririko wa uidhinishaji unaotambua njia, ambao hudhibiti kila ombi la API. Uainishaji ni **wa kuamuliwa bila utata** na **hufungwa unaposhindwa** — chochote kisichoweza kuainishwa huishia kuwa `MANAGEMENT` na huhitaji kipindi au tokeni ya kiwango cha usimamizi. Ukurasa huu unafafanua muundo huo kwa wahandisi wanaodumisha njia au kubuni endpoints mpya.

![Mtiririko wa AuthZ (madarasa 3 ya njia + tathmini ya sera)](../diagrams/exported/authz-pipeline.svg)

> Chanzo: [diagrams/authz-pipeline.mmd](../diagrams/authz-pipeline.mmd)

## Njia Mbili za Uthibitishaji

### 1. Ufunguo wa API (Bearer)

Hutumika kwa API za wateja zinazooana na OpenAI/Anthropic/Gemini na kwa njia chache za usimamizi wakati ufunguo una upeo wa `manage`.

```
Authorization: Bearer <api-key>
```

Huthibitishwa na `isValidApiKey()` / `extractApiKey()` katika `src/sse/services/auth.ts` na kusafirishwa tena kupitia `src/shared/utils/apiAuth.ts`. Kithibitishaji pia hukubali vigeu vya mazingira vya `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` kama funguo endelevu za kupitishia (suala #1350).

### 2. Kipindi cha Dashibodi (kidakuzi cha auth_token)

Kwa kurasa za dashibodi na shughuli za msimamizi.

```
Cookie: auth_token=<JWT signed with JWT_SECRET>
```

Kidakuzi ni kipindi ikiwa tu JWT imethibitishwa **na** ina `authenticated: true`
(`src/shared/utils/dashboardSessionToken.ts` → `verifyDashboardSessionToken`). Kila
mtumiaji wa kidakuzi hicho (kilinzi cha njia, uonyeshaji upya wa mtiririko wa authz, makubaliano ya awali ya WebSocket, seva
ya moja kwa moja, `/api/settings/require-login`, `/api/auth/status`) hupitia kisaidizi hicho.
JWT nyingine zilizotiwa saini kwa `JWT_SECRET` zipo — upitishaji wa Cursor CLI hutengeneza
tokeni za `iss "omniroute" / aud "cursor-cli"` kwa wamiliki wa funguo — na kamwe si vipindi
(#13298).

Huthibitishwa na `isDashboardSessionAuthenticated()` katika `src/shared/utils/apiAuth.ts`. Mtiririko huonyesha upya JWT kiotomatiki ikiwa imebakiza chini ya siku 7 katika muda wake wa matumizi wa siku 30.

Baadhi ya njia za usimamizi hukubali **mojawapo** ya njia hizi: kidakuzi AU `Bearer <key>` wakati ufunguo wa API una upeo wa `manage` (au `admin`). Hili ndilo linalowezesha mtiririko wa kazi wa "kusanidi kupitia miito ya API" ulioongezwa katika v3.8.

#### Kizuizi cha hiari cha kuingia kwa OIDC (#6973)

Kuingia kwa msimamizi wa dashibodi pia kunaauni mtiririko wa **hiari** wa OIDC (OpenID Connect)
pamoja na njia chaguomsingi ya kuingia kwa nenosiri — kuingia kwa nenosiri hakuondolewi kamwe,
bali huongezewa tu:

- Huzimwa isipokuwa `settings.oidcEnabled === true` **na** `oidcIssuer` /
  `oidcClientId` / `oidcClientSecret` zote zimesanidiwa (Mipangilio → Uthibitishaji).
  `GET /api/auth/oidc/login` hurejesha `400` vinginevyo.
- `GET /api/auth/oidc/login` hugundua `authorization_endpoint` kutoka kwenye
  `/.well-known/openid-configuration` ya mtoaji (na hutumia
  `<issuer>/authorize` ikiwa hilo halipatikani), huunda URI ya kuelekeza upya kutoka kwenye ombi linaloingia
  (kwa kuzingatia `x-forwarded-proto`), na huelekeza upya kwenda kwa IdP ikiwa na `state`
  ya nasibu iliyohifadhiwa katika kidakuzi cha `oidc_state` cha `httpOnly`.
- `GET /api/auth/oidc/callback` huthibitisha `state`, hubadilishana msimbo wa uidhinishaji,
  na kuthibitisha saini ya tokeni ya ID kupitia JWKS ya mtoaji
  (`createRemoteJWKSet` ya `jose`, iliyohifadhiwa kwenye akiba kwa kila URI ya JWKS) pamoja na ukaguzi wa `issuer`/`audience`.
  Orodha ya hiari ya ruhusa ya `oidcAllowedSubjects` hulinganisha dai la `sub`
  la tokeni au dai lake la `email` — dai la barua pepe hukubaliwa tu wakati
  `email_verified === true`, kwa hivyo barua pepe ambayo haijathibitishwa katika IdP haiwezi kamwe kupita
  kizuizi.
- Ikifaulu, hutengeneza JWT **ileile kabisa** ya `auth_token` ya siku 30 inayotolewa na njia ya kuingia
  kwa nenosiri (`src/app/api/auth/login/route.ts`), kwa hivyo sehemu nyingine ya
  mtiririko wa kipindi cha dashibodi (uonyeshaji upya kiotomatiki, bendera za vidakuzi) haibadiliki —
  OIDC hubadilisha tu jinsi kidakuzi kinavyotengenezwa, si ruhusa kinazotoa.

## Aina za Njia

`src/server/authz/types.ts` inafafanua aina tatu; njia yoyote ambayo haiwezi kuainishwa kwa uhakika huwekwa katika `MANAGEMENT`.

| Aina         | Maelezo                                                                                                                                                                        | Uthibitishaji unaohitajika                                                      |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------- |
| `PUBLIC`     | Njia ambazo zimethibitishwa kuwa salama — kuingia, kutoka, hali, uanzishaji, afya, na uanzishaji wa mwanzo wa mchakato wa kuanza kutumia mfumo.                                | Hakuna                                                                          |
| `CLIENT_API` | Vituo vya mwisho vya kuhudumia modeli — `/api/v1/*`, `/api/v1beta/*`, pamoja na majina mbadala `/v1/*`, `/v1beta/*`, `/chat/completions`, `/responses`, `/models`, `/codex/*`. | Ufunguo wa Bearer wakati alama amilifu ya kipengele `REQUIRE_API_KEY` imewashwa |
| `MANAGEMENT` | Kurasa za dashibodi, mipangilio, watoa huduma, funguo, pamoja na vituo vya mwisho vya usimamizi na uchunguzi.                                                                  | Kikao cha dashibodi AU Bearer yenye upeo wa `manage`                            |

## Msururu wa Uchakataji

```
Ombi linaloingia → src/proxy.ts
  → runAuthzPipeline() katika src/server/authz/pipeline.ts
    1. Ondoa vichwa vya ndani vinavyoaminika (x-omniroute-auth-*, x-omniroute-route-class)
    2. Tengeneza kitambulisho cha ombi, ainisha njia kupitia classifyRoute()
    3. Ikiwa pathname == "/" → elekeza upya kwenda /dashboard
    4. Ikiwa mfumo unaacha kufanya kazi taratibu (kuzima kwa utaratibu) na /api/* → 503
    5. Ikiwa ni ombi lisilo la GET kwa /api/* → tumia kinga ya checkBodySize()
    6. Ikiwa ni OPTIONS → ukaguzi wa awali wa CORS 204
    7. Ikiwa options.enforce == false → pitisha moja kwa moja ukiwa na vichwa vya aina ya njia
    8. Vinginevyo: POLICIES[routeClass].evaluate(ctx)
       - ruhusu  → weka x-omniroute-auth-{kind,id,label,scopes} → NextResponse.next()
       - kataa → hitilafu ya JSON yenye correlation_id (kurasa za dashibodi → 302 /login)
```

Vichwa vya ndani vinavyoaminika (vilivyofafanuliwa katika `src/server/authz/headers.ts`) **huondolewa kwenye maombi yanayoingia** kabla ya uainishaji — wateja hawawezi kujaza mapema `x-omniroute-auth-*` ili kujifanya mhusika mwingine.

### Mikataba ya sera

Kila aina ya njia ina sera katika `src/server/authz/policies/`:

- **`publicPolicy`** (`policies/public.ts`) — daima hurejesha `allow({ kind: "anonymous", id: "anonymous" })`.
- **`clientApiPolicy`** (`policies/clientApi.ts`) — huchukua Bearer na kuithibitisha kupitia `validateApiKey()`. Huruhusu ufikiaji bila utambulisho pale tu ambapo alama amilifu ya kipengele `REQUIRE_API_KEY` imezimwa. Alama amilifu hubainishwa kupitia `isRequireApiKeyEnabled()` (`ubatilishaji wa alama ya kipengele kwenye DB > process.env.REQUIRE_API_KEY > chaguo-msingi`) ili Alama za Vipengele za Dashibodi na vigeu vya mazingira vidhibiti `/api/v1/*`, `/api/v1beta/*`, na majina mbadala kwa uthabiti; hitilafu za kibainishi husababisha ombi kukataliwa. Huruhusu maombi ya kikao cha dashibodi kwenye njia za API ya mteja (ikiwemo `/api/v1/models`, inayotumiwa na katalogi ya modeli ya dashibodi).
- **`managementPolicy`** (`policies/management.ts`) — hukubali kikao cha dashibodi, maombi ya ndani ya ulandanishaji wa modeli (yanayolinganishwa na `/api/providers/[name]/(sync-models|models)`), au huruka kabisa ikiwa `isAuthRequired()` inarejesha false. Hurejesha 403 (`AUTH_001`) wakati tokeni ya Bearer ipo lakini si halali, na 401 katika hali nyingine. Pia hutekeleza viwango vya ulinzi wa njia (LOCAL_ONLY / ALWAYS_PROTECTED) kabla ya tawi lolote la uthibitishaji — tazama [Viwango vya Ulinzi wa Njia](../security/ROUTE_GUARD_TIERS.md). Njia za LOCAL_ONLY katika `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` (kwa sasa: `/api/mcp/`) zinaweza kufikiwa kutoka anwani zisizo za loopback wakati ufunguo wa Bearer una upeo wa `manage`; njia nyingine zote za LOCAL_ONLY zinasalia kuwa za loopback pekee bila kujali upeo.

Sera iliyofaulu hurejesha `AuthSubject` yenye `kind ∈ { client_api_key, dashboard_session, management_key, anonymous }`. Vishughulikiaji vya chini ya msururu vinaweza kuisoma kupitia `assertAuth(request, "CLIENT_API")` katika `src/server/authz/assertAuth.ts` badala ya kutekeleza upya mantiki ya uthibitishaji.

## Orodha ya Njia za Umma

`src/shared/constants/publicApiRoutes.ts` ndiyo orodha bayana ya njia zinazoruhusiwa:

Orodha imegawanywa kulingana na **muundo**, na mgawanyo huu ni muhimu kwa usalama (GHSA-74g9-q8f6-793h): kiambishi awali
hulinganishwa kwa kutumia `startsWith()`, kwa hivyo pia hulingana na kila njia iliyo karibu inayoshiriki herufi zake za mwanzo.
Kutumia `/api/usage/om-usage` kama kiambishi awali kuliweka `/api/usage/om-usage<anything>` kuwa ya UMMA, na Next huelekeza
hiyo kwa `/api/usage/[connectionId]` — kishughulikiaji kisicho na uthibitishaji wake chenyewe.

```ts
// Vitawi halisi. Kila ingizo LAZIMA liishie kwa "/" (inathibitishwa na jaribio la kitengo).
PUBLIC_API_ROUTE_PREFIXES = [
  "/api/auth/oidc/",
  "/api/v1/", // huchukuliwa kama CLIENT_API katika classify, si kama "ya umma isiyohitaji uthibitishaji"
  "/api/oauth/",
  "/api/codex/connect/",
  "/api/telegram/",
  "/api/cursor-cli/",
];

// Njia moja moja, zinazolinganishwa HASA (zikiwa na au bila mkwaju wa mwisho).
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

// Njia moja moja za kusoma pekee ambazo pia hupata ulegezaji wa asili ya CORS.
PUBLIC_READONLY_CORS_API_ROUTES = [
  "/api/health/ping",
  "/api/monitoring/health",
  "/api/settings/require-login",
];

// Njia moja ya kusoma pekee BILA ulegezaji wa CORS.
PUBLIC_READONLY_API_ROUTES_EXACT = new Set(["/api/health"]);

PUBLIC_READONLY_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
```

Njia za kusoma pekee ni za umma **tu** kwa mbinu salama. Kumbuka: `classifyRoute()` huondoa `/api/v1/*` na `/api/v1beta/*` kwenye chaguo-msingi la PUBLIC — hizi huwa `CLIENT_API` kila wakati ili sera ya ufunguo wa Bearer iendelee kutumika.

## Kuongeza Njia Mpya

### Muundo wa 1 — Endpoint ya API ya mteja ya umma (uthibitishaji wa Bearer)

Njia zilizo chini ya `/api/v1/` na `/api/v1beta/` huainishwa kiotomatiki kama `CLIENT_API`. Middleware hutekeleza ukaguzi wa Bearer; vishughulikiaji vya njia havihitaji kuurudia lakini vinaweza kusoma mhusika ikiwa ni muhimu.

```typescript
// src/app/api/v1/your-route/route.ts
import { NextRequest, NextResponse } from "next/server";
import { assertAuth } from "@/server/authz/assertAuth";

export async function POST(req: NextRequest) {
  const subject = assertAuth(req, "CLIENT_API");
  // subject.kind === "client_api_key" | "anonymous" | "dashboard_session"
  // ... mantiki ya kishughulikiaji
}
```

### Muundo wa 2 — Endpoint ya usimamizi (kikao au Bearer + manage)

Tumia `requireManagementAuth()` kutoka `src/lib/api/requireManagementAuth.ts`:

```typescript
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

export async function POST(request: Request) {
  const rejection = await requireManagementAuth(request);
  if (rejection) return rejection;
  // ... mantiki ya kishughulikiaji
}
```

`requireManagementAuth()` hurudisha `null` ikifaulu au `Response` ya hitilafu ya JSON:

- 401 `AUTH_001` "Uthibitishaji unahitajika" — hakuna vitambulisho kabisa
- 403 — Bearer batili **au** Bearer ipo lakini ufunguo hauna upeo wa `manage` / `admin`

`hasManageScope(scopes)` hurudisha true kwa `"manage"` au `"admin"`.

### Muundo wa 3 — Kuongeza kwenye orodha ya umma ya zinazoruhusiwa

Chagua seti kulingana na muundo, si urahisi. Njia moja huwekwa katika `PUBLIC_API_ROUTES_EXACT` (au `PUBLIC_READONLY_CORS_API_ROUTES` ikiwa ni ya GET pekee); ni kitawi halisi pekee kinachowekwa katika `PUBLIC_API_ROUTE_PREFIXES`, na **lazima kiishie kwa `/`**. Kuweka njia moja katika orodha ya viambishi awali pia hufanya kila njia iliyo karibu inayoshiriki herufi zake za mwanzo kuwa ya umma — ikijumuisha njia zinazohusiana zenye sehemu zinazobadilika ambazo zitaongezwa baadaye (GHSA-74g9-q8f6-793h). Sasisha majaribio ya kitengo katika `tests/unit/public-api-routes.test.ts`, `tests/unit/authz/public-route-exact-match.test.ts` na `tests/unit/authz/classify.test.ts`.

## Mawanda

Funguo za API zina safu ya `scopes` (iliyohifadhiwa kama JSON katika `api_keys.scopes`, angalia `src/lib/db/apiKeys.ts`).

### Wigo wa usimamizi

- `manage` / `admin` — huipa funguo ufikiaji wa vituo vya mwisho vya API ya usimamizi inapotumwa kama Bearer.

### Mawanda ya MCP (`src/shared/constants/mcpScopes.ts`)

Kila zana ya MCP huhitaji mawanda mahususi kupitia `MCP_TOOL_SCOPES`. Orodha kamili (`MCP_SCOPE_LIST`):

```
read:health, read:combos, write:combos, read:quota, read:usage,
read:models, execute:completions, execute:search, write:budget,
write:resilience, pricing:write, read:cache, write:cache,
read:compression, write:compression, read:proxies
```

Utekelezaji wa mawanda katika `open-sse/mcp-server/server.ts` hupitisha orodha ya mawanda ya kila zana kwa
`evaluateToolScopes()` baada ya `resolveCallerScopeContext()` kubaini mawanda kutoka kwenye taarifa za uthibitishaji za MCP,
metadata ya ombi, au `OMNIROUTE_MCP_SCOPES`.

## Kibadilishaji cha Uhitaji wa Uthibitishaji

`isAuthRequired()` katika `src/shared/utils/apiAuth.ts` huamua ikiwa uthibitishaji **wowote** unatekelezwa kwa ombi:

- `settings.requireLogin === false` → uthibitishaji umezimwa kwa mfumo mzima.
- Hakuna nenosiri lililosanidiwa **na** hakuna kigezo cha mazingira cha `INITIAL_PASSWORD` → hali ya uanzishaji huruhusu mchawi wa utambulishaji wa mwanzo na maombi ya loopback, lakini maombi yaliyowekwa wazi kwenye mtandao bado yanahitaji vitambulisho.
- Hitilafu yoyote ya DB → hufunga ufikiaji (usalama kwa chaguo-msingi).

Utekelezaji wa funguo za API za mteja hutumia `isRequireApiKeyEnabled()` katika `src/shared/utils/featureFlags.ts`, wala si usomaji wa moja kwa moja wa `process.env.REQUIRE_API_KEY`. Hili ni muhimu kwa matukio yaliyotumwa: kubadilisha `REQUIRE_API_KEY` katika Dashboard → Feature Flags huhifadhi ubatilishaji wa DB na huathiri mara moja `/v1/*`, `/v1beta/*`, `/models`, `/responses`, `/chat/completions`, `/codex/*`, na ukaguzi mwingine wa uthibitishaji wa API ya mteja unaotumia kisaidizi hiki. Ikiwa hifadhi ya alama za vipengele haiwezi kusomwa, uthibitishaji wa API ya mteja hufunga ufikiaji na kuhitaji funguo.

## Mabadiliko Yasiyooana — v3.8.0

Vituo vya mwisho vya `/api/v1/agents/tasks/*` na `/api/resilience/model-cooldowns` **sasa vinahitaji uthibitishaji wa usimamizi** (commit `588a0333`). Wateja ambao hapo awali walituma funguo ya kawaida ya API bila wigo wa `manage` hupokea `403`. Uhamishaji: ama ipe funguo wigo wa `manage` katika dashibodi ya API Keys, au tumia kipindi cha dashibodi ambacho kimeingia katika akaunti.

## Mabadiliko ya Tabia — v3.8.2

`/api/mcp/*` (seva ya mbali ya MCP) bado ni LOCAL_ONLY kwa chaguo-msingi lakini sasa inakubali maombi yasiyo ya loopback wakati kichwa cha `Authorization: Bearer <api-key>` kina wigo wa `manage`. Ruhusa hii maalum inadhibitiwa wazi kwa kila njia kupitia `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` katika `src/server/authz/routeGuard.ts`; kiambishi awali kingine cha LOCAL_ONLY, `/api/cli-tools/runtime/*`, kwa makusudi hakiwezi kurukwa kwa sababu kinaweza kuanzisha michakato-tanzu kiholela. Maombi yasiyojulikana kwenda `/api/mcp/*` kutoka mahali pasipo loopback yanaendelea kurudisha `403 LOCAL_ONLY` — chaguo-msingi kwa njia yoyote mpya ya LOCAL_ONLY hubaki kuwa loopback pekee kwa masharti makali. Angalia [Viwango vya Kilinzi cha Njia](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out).

## Majaribio

- Majaribio ya vipengele: `tests/unit/authz/` — `classify.test.ts`, `pipeline.test.ts`, `client-api-policy.test.ts`, `management-policy.test.ts`, `public-policy.test.ts`.
- Orodha ya umma inayoruhusiwa: `tests/unit/public-api-routes.test.ts`.
- Endesha jaribio lengwa: `node --import tsx/esm --test tests/unit/authz/classify.test.ts`.

## Utatuzi

Bomba la uchakataji huweka mihuri ifuatayo kwenye majibu kila wakati:

```
x-request-id:               <kitambulisho cha uhusianishaji, hurudiwa katika miili ya hitilafu>
x-omniroute-route-class:    PUBLIC | CLIENT_API | MANAGEMENT
```

Kwa maombi yaliyothibitishwa, vichwa vya ombi la upande wa seva lengwa (upstream) pia hujumuisha:

```
x-omniroute-auth-kind:      client_api_key | dashboard_session | management_key | anonymous
x-omniroute-auth-id:        key_<last-4> | "dashboard" | "anonymous"
x-omniroute-auth-label:     (si lazima)
x-omniroute-auth-scopes:    orodha iliyotenganishwa kwa koma
```

Tumia `assertAuth(req, expectedClass)` ndani ya vishughulikiaji — hutupa `AuthzAssertionError` yenye msimbo `AUTHZ_NOT_INITIALIZED` ikiwa middleware ilipitishwa bila kutekelezwa (husaidia kugundua hitilafu za mipangilio zinapojirudia katika majaribio).

## Tazama Pia

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — kiashiria cha uthibitishaji kwa kila endpoint
- [COMPLIANCE.md](../security/COMPLIANCE.md) — kumbukumbu ya ukaguzi wa matukio ya uthibitishaji
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md) — maelezo ya utekelezaji wa wigo wa MCP
- Chanzo: `src/server/authz/`, `src/lib/api/requireManagementAuth.ts`
