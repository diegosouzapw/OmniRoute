# Authorization Guide (Gaeilge)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/AUTHZ_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/AUTHZ_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/AUTHZ_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/AUTHZ_GUIDE.md)

---

> **Foinse na fírinne:** `src/server/authz/`, `src/shared/constants/publicApiRoutes.ts`, `src/lib/api/requireManagementAuth.ts`, `src/shared/utils/apiAuth.ts`
> **Nuashonraithe go deireanach:** 2026-06-28 — v3.8.40

Tá píblíne údaraithe ag OmniRoute atá feasach ar bhealaí agus a dhéanann rialú rochtana ar gach iarratas API. Tá an t-aicmiú **cinntitheach** agus **dúnta i gcás teipe** — déantar `MANAGEMENT` d'aon rud nach féidir a aicmiú agus éilítear seisiún nó comhartha ar ghrád bainistíochta. Mínítear ar an leathanach seo an tsamhail d'innealtóirí a chothaíonn bealaí nó a dhearann críochphointí nua.

![Píblíne AuthZ (3 aicme bealaigh + measúnú beartais)](../diagrams/exported/authz-pipeline.svg)

> Foinse: [diagrams/authz-pipeline.mmd](../diagrams/authz-pipeline.mmd)

## Dhá Mhód Fíordheimhnithe

### 1. Eochair API (Bearer)

Úsáidtear í le haghaidh APIanna cliaint atá comhoiriúnach le OpenAI/Anthropic/Gemini agus le haghaidh roinnt bealaí bainistíochta nuair atá an scóip `manage` ag an eochair.

```
Authorization: Bearer <api-key>
```

Déanann `isValidApiKey()` / `extractApiKey()` in `src/sse/services/auth.ts` í a bhailíochtú agus déantar í a ath-easpórtáil trí `src/shared/utils/apiAuth.ts`. Glacann an bailíochtóir freisin leis na hathróga timpeallachta `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` mar eochracha buana pas-trí (saincheist #1350).

### 2. Seisiún Deaise (fianán auth_token)

Le haghaidh leathanaigh na deaise agus oibríochtaí riaracháin.

```
Cookie: auth_token=<JWT signed with JWT_SECRET>
```

Ní seisiún é fianán ach amháin nuair a fhíoraítear an JWT **agus** nuair atá `authenticated: true`
ann (`src/shared/utils/dashboardSessionToken.ts` → `verifyDashboardSessionToken`). Gach
tomhaltóir den fhianán (garda bealaigh, athnuachan phíblíne authz, croitheadh láimhe WebSocket, freastalaí
beo, `/api/settings/require-login`, `/api/auth/status`), téann sé tríd an gcúntóir sin.
Tá JWTanna eile sínithe le `JWT_SECRET` ann — gineann pas-trí Cursor CLI
comharthaí `iss "omniroute" / aud "cursor-cli"` do shealbhóirí eochrach — agus ní seisiúin iad
riamh (#13298).

Déanann `isDashboardSessionAuthenticated()` in `src/shared/utils/apiAuth.ts` é a fhíorú. Athnuachan an phíblíne an JWT go huathoibríoch nuair atá níos lú ná 7 lá fágtha dá shaolré 30 lá.

Glacann roinnt bealaí bainistíochta le **ceachtar** mód: fianán NÓ `Bearer <key>` nuair atá an scóip `manage` (nó `admin`) ag an eochair API. Is é seo a chumasaíonn an sreabhadh oibre „inchumraithe trí ghlaonna API” a cuireadh leis in v3.8.

#### Geata logála isteach roghnach OIDC (#6973)

Tacaíonn logáil isteach riarthóra na deaise freisin le sreabhadh OIDC (OpenID Connect) **roghnach**
in éineacht leis an logáil isteach réamhshocraithe le pasfhocal — ní bhaintear an logáil isteach le pasfhocal riamh,
ní dhéantar ach cur leis:

- Bíonn sé díchumasaithe mura bhfuil `settings.oidcEnabled === true` **agus** mura bhfuil `oidcIssuer` /
  `oidcClientId` / `oidcClientSecret` cumraithe ar fad (Socruithe → Fíordheimhniú).
  Tugann `GET /api/auth/oidc/login` `400` ar ais murach sin.
- Aimsíonn `GET /api/auth/oidc/login` an `authorization_endpoint` ó
  `/.well-known/openid-configuration` an eisitheora (agus titeann sé siar ar
  `<issuer>/authorize`), tógann sé an URI atreoraithe ón iarratas isteach
  (agus `x-forwarded-proto` á chur san áireamh), agus atreoraíonn sé chuig an IdP le `state`
  randamach stóráilte i bhfianán `oidc_state` `httpOnly`.
- Bailíochtaíonn `GET /api/auth/oidc/callback` `state`, malartaíonn sé an cód údaraithe,
  agus fíoraíonn sé síniú an chomhartha ID trí JWKS an eisitheora
  (`createRemoteJWKSet` de chuid `jose`, i dtaisce de réir URI JWKS) le seiceálacha
  `issuer`/`audience`. Meaitseálann liosta ceada roghnach `oidcAllowedSubjects`
  éileamh `sub` an chomhartha nó a éileamh `email` — ní ghlactar leis an éileamh ríomhphoist
  ach amháin nuair atá `email_verified === true`, mar sin ní féidir le ríomhphost neamhfhíoraithe
  ag an IdP dul tríd an ngeata choíche.
- Má éiríonn leis, gineann sé an JWT `auth_token` 30 lá **ceannann céanna** a eisíonn an logáil
  isteach le pasfhocal (`src/app/api/auth/login/route.ts`), mar sin fanann an chuid eile de
  phíblíne sheisiún na deaise (uath-athnuachan, bratacha fianáin) gan athrú —
  ní athraíonn OIDC ach an chaoi a ngintear an fianán, ní na ceadanna a thugann sé.

## Aicmí Bealaigh

Sainmhíníonn `src/server/authz/types.ts` trí aicme; téann aon bhealach nach féidir a aicmiú go cinntitheach ar ais chuig `MANAGEMENT`.

| Aicme        | Cur síos                                                                                                                                                                            | Fíordheimhniú riachtanach                                                          |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| `PUBLIC`     | Bealaí atá sábháilte go sainráite — logáil isteach, logáil amach, stádas, tosú, sláinte, bútstrapáil ionduchtaithe.                                                                 | Dada                                                                               |
| `CLIENT_API` | Críochphointí chun samhlacha a riar — `/api/v1/*`, `/api/v1beta/*`, chomh maith leis na hailiasanna `/v1/*`, `/v1beta/*`, `/chat/completions`, `/responses`, `/models`, `/codex/*`. | Eochair Bearer nuair atá an bhratach ghné éifeachtach `REQUIRE_API_KEY` cumasaithe |
| `MANAGEMENT` | Leathanaigh deais, socruithe, soláthraithe, eochracha, agus críochphointí riaracháin agus diagnóisice.                                                                              | Seisiún deais NÓ Bearer leis an scóip `manage`                                     |

## Píblíne

```
Iarratas isteach → src/proxy.ts
  → runAuthzPipeline() in src/server/authz/pipeline.ts
    1. Bain ceanntásca inmheánacha iontaofa (x-omniroute-auth-*, x-omniroute-route-class)
    2. Gin aitheantas iarratais, aicmigh an bealach trí classifyRoute()
    3. Má tá pathname == "/" → atreoraigh chuig /dashboard
    4. Má tá an córas ag folmhú (múchadh grástúil) agus /api/* → 503
    5. Más iarratas neamh-GET é ar /api/* → seiceáil an chosaint checkBodySize()
    6. Más OPTIONS é → réamheitilt CORS 204
    7. Má tá options.enforce == false → lig tríd le ceanntásca aicme bealaigh
    8. Seachas sin: POLICIES[routeClass].evaluate(ctx)
       - ceadaigh  → stampáil x-omniroute-auth-{kind,id,label,scopes} → NextResponse.next()
       - diúltaigh → earráid JSON le correlation_id (leathanaigh deais → 302 /login)
```

Déantar ceanntásca inmheánacha iontaofa (a shainmhínítear in `src/server/authz/headers.ts`) a **bhaint ó iarratais isteach** roimh an aicmiú — ní féidir le cliaint `x-omniroute-auth-*` a réamhlíonadh chun aithris a dhéanamh ar shuibiacht.

### Conarthaí polasaí

Tá polasaí ag gach aicme bealaigh in `src/server/authz/policies/`:

- **`publicPolicy`** (`policies/public.ts`) — tugann sé `allow({ kind: "anonymous", id: "anonymous" })` ar ais i gcónaí.
- **`clientApiPolicy`** (`policies/clientApi.ts`) — baineann sé Bearer amach agus bailíochtaíonn sé é trí `validateApiKey()`. Ní théann sé ar aghaidh chuig rochtain anaithnid ach amháin nuair atá an bhratach ghné éifeachtach `REQUIRE_API_KEY` díchumasaithe. Réitítear an bhratach éifeachtach trí `isRequireApiKeyEnabled()` (`DB feature flag override > process.env.REQUIRE_API_KEY > default`) ionas go rialaíonn Bratacha Gné na Deaise agus athróga timpeallachta `/api/v1/*`, `/api/v1beta/*`, agus na hailiasanna ar bhealach comhsheasmhach; má theipeann ar an réiteoir, diúltaítear don rochtain. Ceadaíonn sé iarratais ó sheisiún deais ar bhealaí API cliaint (lena n-áirítear `/api/v1/models`, a úsáideann catalóg samhlacha na deaise).
- **`managementPolicy`** (`policies/management.ts`) — glacann sé le seisiún deais, iarratais inmheánacha sioncronaithe samhlacha (a mheaitseáiltear le `/api/providers/[name]/(sync-models|models)`), nó scipeálann sé go hiomlán má thugann `isAuthRequired()` false ar ais. Tugann sé 403 (`AUTH_001`) ar ais nuair atá comhartha Bearer i láthair ach neamhbhailí, agus 401 i ngach cás eile. Cuireann sé cisil chosanta na mbealaí (LOCAL_ONLY / ALWAYS_PROTECTED) i bhfeidhm freisin roimh aon bhrainse fíordheimhnithe — féach [Cisil Chosanta na mBealaí](../security/ROUTE_GUARD_TIERS.md). Is féidir rochtain a fháil ar chosáin LOCAL_ONLY in `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` (faoi láthair: `/api/mcp/`) ó sheoladh nach seoladh lúb-ais é nuair atá an scóip `manage` ag an eochair Bearer; fanann gach cosán LOCAL_ONLY eile teoranta go docht do sheoltaí lúb-ais, beag beann ar an scóip.

Tugann polasaí rathúil `AuthSubject` ar ais le `kind ∈ { client_api_key, dashboard_session, management_key, anonymous }`. Is féidir le láimhseálaithe iartheachtacha é a léamh trí `assertAuth(request, "CLIENT_API")` in `src/server/authz/assertAuth.ts` seachas an loighic fíordheimhnithe a rith arís.

## Liosta Bealaí Poiblí

Is é `src/shared/constants/publicApiRoutes.ts` an liosta ceada sainráite:

Roinntear an liosta de réir **crutha**, agus tá an deighilt ríthábhachtach (GHSA-74g9-q8f6-793h): déantar réimír a
mheaitseáil le `startsWith()`, mar sin meaitseálann sí gach cosán cóngarach a bhfuil na carachtair thosaigh chéanna aige freisin.
Nuair a úsáideadh `/api/usage/om-usage` mar réimír, marcáladh `/api/usage/om-usage<anything>` mar PUBLIC, agus réitíonn Next
é sin go `/api/usage/[connectionId]` — láimhseálaí nach bhfuil fíordheimhniú dá chuid féin aige.

```ts
// Fíorfhochrainn. NÍ MÓR do gach iontráil críochnú le "/" (deimhnithe le tástáil aonaid).
PUBLIC_API_ROUTE_PREFIXES = [
  "/api/auth/oidc/",
  "/api/v1/", // caitear leis mar CLIENT_API in classify, ní mar "poiblí gan fíordheimhniú"
  "/api/oauth/",
  "/api/codex/connect/",
  "/api/telegram/",
  "/api/cursor-cli/",
];

// Bealaí aonair, meaitseáilte GO BEACHT (le slais deiridh nó gan í).
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

// Bealaí aonair inléite amháin a fhaigheann maolú tionscnaimh CORS freisin.
PUBLIC_READONLY_CORS_API_ROUTES = [
  "/api/health/ping",
  "/api/monitoring/health",
  "/api/settings/require-login",
];

// Bealach aonair inléite amháin GAN an maolú CORS.
PUBLIC_READONLY_API_ROUTES_EXACT = new Set(["/api/health"]);

PUBLIC_READONLY_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
```

Ní bhíonn bealaí inléite amháin poiblí **ach amháin** i gcás modhanna sábháilte. Tabhair faoi deara: eisiann `classifyRoute()` `/api/v1/*` agus `/api/v1beta/*` ón gcúlrogha PUBLIC — is `CLIENT_API` iad sin i gcónaí, ionas go mbeidh feidhm fós ag beartas na heochrach Bearer.

## Bealach Nua a Chur Leis

### Patrún 1 — Críochphointe poiblí API cliaint (fíordheimhniú Bearer)

Aicmítear bealaí faoi `/api/v1/` agus `/api/v1beta/` mar `CLIENT_API` go huathoibríoch. Forfheidhmíonn an lárearraí an tseiceáil Bearer; ní gá do láimhseálaithe bealaigh í a dhéanamh arís, ach is féidir leo an t-ábhar a léamh más úsáideach é.

```typescript
// src/app/api/v1/your-route/route.ts
import { NextRequest, NextResponse } from "next/server";
import { assertAuth } from "@/server/authz/assertAuth";

export async function POST(req: NextRequest) {
  const subject = assertAuth(req, "CLIENT_API");
  // subject.kind === "client_api_key" | "anonymous" | "dashboard_session"
  // ... loighic an láimhseálaí
}
```

### Patrún 2 — Críochphointe bainistíochta (seisiún nó Bearer + manage)

Úsáid `requireManagementAuth()` ó `src/lib/api/requireManagementAuth.ts`:

```typescript
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

export async function POST(request: Request) {
  const rejection = await requireManagementAuth(request);
  if (rejection) return rejection;
  // ... loighic an láimhseálaí
}
```

Filleann `requireManagementAuth()` `null` ar éirigh leis, nó `Response` earráide JSON:

- 401 `AUTH_001` "Authentication required" — níl aon dintiúir ann ar chor ar bith
- 403 — Bearer neamhbhailí **nó** Bearer i láthair ach níl an raon feidhme `manage` / `admin` ag an eochair

Filleann `hasManageScope(scopes)` true i gcás `"manage"` nó `"admin"`.

### Patrún 3 — Cur leis an liosta ceada poiblí

Roghnaigh an tacar de réir crutha, ní de réir áisiúlachta. Cuirtear bealach aonair in `PUBLIC_API_ROUTES_EXACT` (nó in `PUBLIC_READONLY_CORS_API_ROUTES` más bealach GET-amháin é); ní chuirtear ach fíorfhochraobh in `PUBLIC_API_ROUTE_PREFIXES`, agus **ní mór di críochnú le `/`**. Má chuirtear bealach aonair sa liosta réimíreanna, foilsítear gach cosán cóngarach a bhfuil na carachtair thosaigh chéanna aige freisin — lena n-áirítear siblíní deighleoige dinimiciúla a chuirfear leis níos déanaí (GHSA-74g9-q8f6-793h). Nuashonraigh na tástálacha aonaid ag `tests/unit/public-api-routes.test.ts`, `tests/unit/authz/public-route-exact-match.test.ts` agus `tests/unit/authz/classify.test.ts`.

## Scóip

Tá eagar `scopes` ag eochracha API (stóráilte mar JSON in `api_keys.scopes`, féach `src/lib/db/apiKeys.ts`).

### Scóip bhainistíochta

- `manage` / `admin` — tugann sé rochtain don eochair ar chríochphointí API bainistíochta nuair a sheoltar í mar Bearer.

### Scóip MCP (`src/shared/constants/mcpScopes.ts`)

Teastaíonn scóip shonracha ó gach uirlis MCP trí `MCP_TOOL_SCOPES`. An liosta iomlán (`MCP_SCOPE_LIST`):

```
read:health, read:combos, write:combos, read:quota, read:usage,
read:models, execute:completions, execute:search, write:budget,
write:resilience, pricing:write, read:cache, write:cache,
read:compression, write:compression, read:proxies
```

Le linn fhorfheidhmiú na scóp in `open-sse/mcp-server/server.ts`, cuirtear liosta scóp gach uirlise ar aghaidh chuig
`evaluateToolScopes()` tar éis do `resolveCallerScopeContext()` scóip a réiteach ó fhaisnéis fíordheimhnithe MCP,
ó mheiteashonraí an iarratais, nó ó `OMNIROUTE_MCP_SCOPES`.

## Scorán Riachtanais Fíordheimhnithe

Cinneann `isAuthRequired()` in `src/shared/utils/apiAuth.ts` an gcuirtear **aon** fhíordheimhniú i bhfeidhm ar iarratas:

- `settings.requireLogin === false` → tá fíordheimhniú díchumasaithe go domhanda.
- Gan aon fhocal faire cumraithe **agus** gan aon athróg timpeallachta `INITIAL_PASSWORD` → ceadaíonn mód tosaithe an draoi ionduchtúcháin agus iarratais loopback, ach tá dintiúir fós ag teastáil ó iarratais líonra nochta.
- Aon earráid DB → teipeann sé go dúnta (slán de réir réamhshocraithe).

Úsáideann forfheidhmiú eochrach API an chliaint `isRequireApiKeyEnabled()` in `src/shared/utils/featureFlags.ts`, seachas léamh díreach ar `process.env.REQUIRE_API_KEY`. Tá sé seo tábhachtach d’áscanna imscartha: nuair a scoránaítear `REQUIRE_API_KEY` in Dashboard → Feature Flags, stóráiltear sárú DB agus bíonn éifeacht láithreach aige ar `/v1/*`, `/v1beta/*`, `/models`, `/responses`, `/chat/completions`, `/codex/*`, agus ar sheiceálacha eile fíordheimhnithe API cliaint a úsáideann an cúntóir seo. Murar féidir stór na mbratach gné a léamh, teipeann fíordheimhniú API an chliaint go dúnta agus teastaíonn eochair.

## Athrú Bristeach — v3.8.0

Teastaíonn fíordheimhniú bainistíochta **anois** ó na críochphointí `/api/v1/agents/tasks/*` agus `/api/resilience/model-cooldowns` (tiomantas `588a0333`). Faigheann cliaint a sheol eochair API ghnáth gan an scóip `manage` roimhe seo freagra `403`. Aistriú: tabhair an scóip `manage` don eochair i ndeais na nEochracha API, nó úsáid seisiún deaise ina bhfuil tú logáilte isteach.

## Athrú Iompraíochta — v3.8.2

Tá `/api/mcp/*` (an cianfhreastalaí MCP) fós LOCAL_ONLY de réir réamhshocraithe, ach glacann sé anois le hiarratais neamh-loopback nuair a bhíonn an scóip `manage` sa cheanntásc `Authorization: Bearer <api-key>`. Geataítear an díolúine go sainráite de réir conair trí `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` in `src/server/authz/routeGuard.ts`; ní féidir dul timpeall ar an réimír ghaolmhar LOCAL_ONLY `/api/cli-tools/runtime/*` d’aon ghnó toisc gur féidir léi fophróisis threallacha a thosú. Leanann iarratais anaithnide chuig `/api/mcp/*` ó fhoinsí neamh-loopback de `403 LOCAL_ONLY` a thabhairt ar ais — is é dian-loopback an réamhshocrú i gcónaí d’aon chonair nua LOCAL_ONLY. Féach [Sraitheanna Garda Bealaigh](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out).

## Tástáil

- Tástálacha aonaid: `tests/unit/authz/` — `classify.test.ts`, `pipeline.test.ts`, `client-api-policy.test.ts`, `management-policy.test.ts`, `public-policy.test.ts`.
- Liosta ceada poiblí: `tests/unit/public-api-routes.test.ts`.
- Rith dírithe: `node --import tsx/esm --test tests/unit/authz/classify.test.ts`.

## Dífhabhtú

Marcálann an phíblíne freagraí i gcónaí leis na ceanntásca seo:

```
x-request-id:               <correlation id, echoed in error bodies>
x-omniroute-route-class:    PUBLIC | CLIENT_API | MANAGEMENT
```

I gcás iarrataí fíordheimhnithe, áirítear na ceanntásca iarratais réamhtheachtacha (ar thaobh an láimhseálaí) seo freisin:

```
x-omniroute-auth-kind:      client_api_key | dashboard_session | management_key | anonymous
x-omniroute-auth-id:        key_<last-4> | "dashboard" | "anonymous"
x-omniroute-auth-label:     (optional)
x-omniroute-auth-scopes:    comma-separated list
```

Úsáid `assertAuth(req, expectedClass)` laistigh de láimhseálaithe — caitheann sé `AuthzAssertionError` leis an gcód `AUTHZ_NOT_INITIALIZED` má seachnaíodh an meánearra (rud atá úsáideach chun cúlchéimnithe cumraíochta a bhrath i dtástálacha).

## Féach Freisin

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — marcóir fíordheimhnithe de réir críochphointe
- [COMPLIANCE.md](../security/COMPLIANCE.md) — loga iniúchóireachta le haghaidh teagmhais fíordheimhnithe
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md) — sonraí faoi fhorfheidhmiú scóip MCP
- Foinse: `src/server/authz/`, `src/lib/api/requireManagementAuth.ts`
