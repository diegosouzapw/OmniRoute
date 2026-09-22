# Authorization Guide (Filipino)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/AUTHZ_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/AUTHZ_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/AUTHZ_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/AUTHZ_GUIDE.md)

---

> **Pinagmumulan ng katotohanan:** `src/server/authz/`, `src/shared/constants/publicApiRoutes.ts`, `src/lib/api/requireManagementAuth.ts`, `src/shared/utils/apiAuth.ts`
> **Huling na-update:** 2026-06-28 — v3.8.40

Ang OmniRoute ay may pipeline ng awtorisasyon na nakabatay sa route at kumokontrol sa bawat kahilingan sa API. Ang pag-uuri ay **deterministiko** at **fail-closed** — anumang hindi maiuri ay mapupunta sa `MANAGEMENT` at mangangailangan ng session o management-grade na token. Ipinapaliwanag ng pahinang ito ang modelo para sa mga engineer na nagpapanatili ng mga route o nagdidisenyo ng mga bagong endpoint.

![Pipeline ng AuthZ (3 klase ng route + pagsusuri ng patakaran)](../diagrams/exported/authz-pipeline.svg)

> Pinagmulan: [diagrams/authz-pipeline.mmd](../diagrams/authz-pipeline.mmd)

## Dalawang Mode ng Auth

### 1. API Key (Bearer)

Ginagamit para sa mga client API na compatible sa OpenAI/Anthropic/Gemini at sa ilang management route kapag may `manage` scope ang key.

```
Authorization: Bearer <api-key>
```

Bine-validate ng `isValidApiKey()` / `extractApiKey()` sa `src/sse/services/auth.ts` at muling ine-export sa pamamagitan ng `src/shared/utils/apiAuth.ts`. Tinatanggap din ng validator ang mga env var na `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` bilang mga persistent passthrough key (isyu #1350).

### 2. Dashboard Session (auth_token cookie)

Para sa mga pahina ng dashboard at mga operasyong pang-admin.

```
Cookie: auth_token=<JWT na nilagdaan gamit ang JWT_SECRET>
```

Ang isang cookie ay maituturing lamang na session kapag napatunayan ang JWT **at** naglalaman ito ng `authenticated: true`
(`src/shared/utils/dashboardSessionToken.ts` → `verifyDashboardSessionToken`). Ang bawat
gumagamit ng cookie (route guard, pag-refresh ng authz pipeline, WebSocket handshake, live
server, `/api/settings/require-login`, `/api/auth/status`) ay dumaraan sa helper na iyon.
May iba pang JWT na nilagdaan gamit ang `JWT_SECRET` — ang Cursor CLI passthrough ay lumilikha ng
mga token na `iss "omniroute" / aud "cursor-cli"` para sa mga may hawak ng key — at hindi kailanman
itinuturing na mga session (#13298).

Bine-verify ng `isDashboardSessionAuthenticated()` sa `src/shared/utils/apiAuth.ts`. Awtomatikong nire-refresh ng pipeline ang JWT kapag wala pang 7 araw ang natitira sa 30-araw nitong bisa.

Tumatanggap ang ilang management route ng **alinman** sa dalawang mode: cookie O `Bearer <key>` kapag may `manage` (o `admin`) scope ang API key. Ito ang nagbibigay-daan sa workflow na "nako-configure sa pamamagitan ng mga API call" na idinagdag sa v3.8.

#### Opsyonal na OIDC login gate (#6973)

Sinusuportahan din ng dashboard admin login ang isang **opt-in** na daloy ng OIDC (OpenID Connect)
kasabay ng default na password login — hindi kailanman inaalis ang password login, dinaragdagan
lamang ito:

- Naka-disable maliban kung `settings.oidcEnabled === true` **at** naka-configure ang lahat ng
  `oidcIssuer` / `oidcClientId` / `oidcClientSecret` (Settings → Auth).
  Kung hindi, nagbabalik ang `GET /api/auth/oidc/login` ng `400`.
- Tinutuklas ng `GET /api/auth/oidc/login` ang `authorization_endpoint` mula sa
  `/.well-known/openid-configuration` ng issuer (bumabalik sa
  `<issuer>/authorize` bilang fallback), binubuo ang redirect URI mula sa papasok na kahilingan
  (isinasaalang-alang ang `x-forwarded-proto`), at nagre-redirect sa IdP gamit ang random na `state`
  na nakaimbak sa isang `httpOnly` na `oidc_state` cookie.
- Bine-validate ng `GET /api/auth/oidc/callback` ang `state`, ipinagpapalit ang authorization
  code, at bine-verify ang signature ng ID token sa pamamagitan ng JWKS ng issuer
  (`createRemoteJWKSet` ng `jose`, naka-cache bawat JWKS URI) na may mga pagsusuri sa `issuer`/`audience`.
  Itinutugma ng isang opsyonal na allowlist na `oidcAllowedSubjects` ang `sub` claim
  ng token o ang `email` claim nito — kinikilala lamang ang email claim kapag
  `email_verified === true`, kaya hindi kailanman makalalampas sa gate ang isang hindi na-verify
  na email sa IdP.
- Kapag matagumpay, lumilikha ito ng **eksaktong kaparehong** 30-araw na `auth_token` JWT na ibinibigay
  ng password login (`src/app/api/auth/login/route.ts`), kaya nananatiling hindi nagbabago ang iba pang
  bahagi ng dashboard session pipeline (awtomatikong pag-refresh, mga cookie flag) —
  pinapalitan lamang ng OIDC kung paano nalilikha ang cookie, hindi kung ano ang mga pahintulot na ibinibigay nito.

## Mga Klase ng Route

Tinutukoy ng `src/server/authz/types.ts` ang tatlong klase; ang anumang route na hindi matukoy nang tiyak ang klasipikasyon ay ibinabalik sa `MANAGEMENT`.

| Klase        | Paglalarawan                                                                                                                                                                      | Kinakailangang auth                                                        |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| `PUBLIC`     | Mga route na tahasang ligtas — pag-login, pag-logout, status, init, health, onboarding bootstrap.                                                                                 | Wala                                                                       |
| `CLIENT_API` | Mga endpoint para sa paghahatid ng modelo — `/api/v1/*`, `/api/v1beta/*`, kasama ang mga alias na `/v1/*`, `/v1beta/*`, `/chat/completions`, `/responses`, `/models`, `/codex/*`. | Bearer key kapag naka-enable ang epektibong `REQUIRE_API_KEY` feature flag |
| `MANAGEMENT` | Mga dashboard page, setting, provider, key, admin, at diagnostics endpoint.                                                                                                       | Dashboard session O Bearer na may `manage` scope                           |

## Pipeline

```
Papasok na request → src/proxy.ts
  → runAuthzPipeline() sa src/server/authz/pipeline.ts
    1. Alisin ang mga pinagkakatiwalaang internal header (x-omniroute-auth-*, x-omniroute-route-class)
    2. Bumuo ng request id, iklasipika ang route sa pamamagitan ng classifyRoute()
    3. Kung pathname == "/" → i-redirect sa /dashboard
    4. Kung nagda-drain (graceful shutdown) at /api/* → 503
    5. Kung hindi GET ang /api/* → checkBodySize() guard
    6. Kung OPTIONS → CORS preflight 204
    7. Kung options.enforce == false → direktang ipasa na may mga route-class header
    8. Kung hindi: POLICIES[routeClass].evaluate(ctx)
       - payagan  → itatak ang x-omniroute-auth-{kind,id,label,scopes} → NextResponse.next()
       - tanggihan → JSON error na may correlation_id (mga dashboard page → 302 /login)
```

Ang mga pinagkakatiwalaang internal header (na tinukoy sa `src/server/authz/headers.ts`) ay **inaalis mula sa mga papasok na request** bago ang klasipikasyon — hindi maaaring paunang lagyan ng mga client ang `x-omniroute-auth-*` upang magpanggap bilang isang subject.

### Mga kontrata ng policy

Ang bawat klase ng route ay may policy sa `src/server/authz/policies/`:

- **`publicPolicy`** (`policies/public.ts`) — palaging nagbabalik ng `allow({ kind: "anonymous", id: "anonymous" })`.
- **`clientApiPolicy`** (`policies/clientApi.ts`) — kinukuha ang Bearer at bine-validate ito sa pamamagitan ng `validateApiKey()`. Nagpapatuloy lamang sa anonymous kapag naka-disable ang epektibong `REQUIRE_API_KEY` feature flag. Nireresolba ang epektibong flag sa pamamagitan ng `isRequireApiKeyEnabled()` (`DB feature flag override > process.env.REQUIRE_API_KEY > default`) upang pare-parehong pamahalaan ng mga Dashboard Feature Flag at environment variable ang `/api/v1/*`, `/api/v1beta/*`, at mga alias; kapag nabigo ang resolver, isinasara ang access. Pinapayagan ang mga dashboard-session request sa mga client API route (kabilang ang `/api/v1/models`, na ginagamit ng dashboard model catalog).
- **`managementPolicy`** (`policies/management.ts`) — tumatanggap ng dashboard session, mga internal model-sync request (itinutugma sa `/api/providers/[name]/(sync-models|models)`), o ganap na nilalaktawan kung nagbabalik ng false ang `isAuthRequired()`. Nagbabalik ng 403 (`AUTH_001`) kapag may Bearer token ngunit hindi ito valid, at 401 naman kung wala. Ipinapatupad din nito ang mga tier ng route guard (LOCAL_ONLY / ALWAYS_PROTECTED) bago ang anumang auth branch — tingnan ang [Mga Tier ng Route Guard](../security/ROUTE_GUARD_TIERS.md). Maaaring i-access mula sa non-loopback ang mga LOCAL_ONLY path sa `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` (sa kasalukuyan: `/api/mcp/`) kapag taglay ng Bearer key ang `manage` scope; nananatiling mahigpit na loopback-only ang lahat ng iba pang LOCAL_ONLY path anuman ang scope.

Ang matagumpay na policy ay nagbabalik ng `AuthSubject` na may `kind ∈ { client_api_key, dashboard_session, management_key, anonymous }`. Mababasa ito ng mga downstream handler sa pamamagitan ng `assertAuth(request, "CLIENT_API")` sa `src/server/authz/assertAuth.ts` sa halip na muling patakbuhin ang auth logic.

## Listahan ng mga Pampublikong Route

Ang `src/shared/constants/publicApiRoutes.ts` ang tahasang allowlist:

Hinahati ang listahan ayon sa **hugis**, at kritikal ang paghahating ito (GHSA-74g9-q8f6-793h): itinutugma ang isang prefix gamit ang `startsWith()`, kaya tumutugma rin ito sa bawat katabing path na may parehong mga panimulang character.
Nang gawing prefix ang `/api/usage/om-usage`, namarkahan nitong PUBLIC ang `/api/usage/om-usage<anything>`, at nire-resolve iyon ng Next sa `/api/usage/[connectionId]` — isang handler na walang sarili nitong auth.

```ts
// Mga tunay na subtree. DAPAT magtapos sa "/" ang bawat entry (sinusuri ng isang unit test).
PUBLIC_API_ROUTE_PREFIXES = [
  "/api/auth/oidc/",
  "/api/v1/", // itinuturing na CLIENT_API sa classify, hindi bilang "no-auth public"
  "/api/oauth/",
  "/api/codex/connect/",
  "/api/telegram/",
  "/api/cursor-cli/",
];

// Mga indibidwal na route, EKSAKTONG itinutugma (mayroon man o walang trailing slash).
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

// Mga read-only na indibidwal na route na gumagamit din ng CORS origin relaxation.
PUBLIC_READONLY_CORS_API_ROUTES = [
  "/api/health/ping",
  "/api/monitoring/health",
  "/api/settings/require-login",
];

// Read-only na indibidwal na route na WALANG CORS relaxation.
PUBLIC_READONLY_API_ROUTES_EXACT = new Set(["/api/health"]);

PUBLIC_READONLY_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
```

Pampubliko **lamang** ang mga read-only na route para sa mga ligtas na method. Tandaan: ibinubukod ng `classifyRoute()` ang `/api/v1/*` at `/api/v1beta/*` mula sa PUBLIC fall-through — palaging `CLIENT_API` ang mga iyon upang patuloy na mailapat ang patakaran sa Bearer key.

## Pagdaragdag ng Bagong Route

### Pattern 1 — Pampublikong client API endpoint (Bearer-auth)

Awtomatikong inuuri bilang `CLIENT_API` ang mga route sa ilalim ng `/api/v1/` at `/api/v1beta/`. Ipinapatupad ng middleware ang Bearer check; hindi na ito kailangang ulitin ng mga route handler, ngunit maaari nilang basahin ang subject kung kapaki-pakinabang.

```typescript
// src/app/api/v1/your-route/route.ts
import { NextRequest, NextResponse } from "next/server";
import { assertAuth } from "@/server/authz/assertAuth";

export async function POST(req: NextRequest) {
  const subject = assertAuth(req, "CLIENT_API");
  // subject.kind === "client_api_key" | "anonymous" | "dashboard_session"
  // ... lohika ng handler
}
```

### Pattern 2 — Management endpoint (session o Bearer + manage)

Gamitin ang `requireManagementAuth()` mula sa `src/lib/api/requireManagementAuth.ts`:

```typescript
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

export async function POST(request: Request) {
  const rejection = await requireManagementAuth(request);
  if (rejection) return rejection;
  // ... lohika ng handler
}
```

Nagbabalik ang `requireManagementAuth()` ng `null` kapag matagumpay, o ng JSON error na `Response`:

- 401 `AUTH_001` "Kailangan ang pagpapatotoo" — walang anumang credential
- 403 — hindi wastong Bearer **o** may Bearer ngunit walang `manage` / `admin` scope ang key

Nagbabalik ng true ang `hasManageScope(scopes)` para sa `"manage"` o `"admin"`.

### Pattern 3 — Pagdaragdag sa pampublikong allowlist

Piliin ang set ayon sa hugis, hindi ayon sa kaginhawaan. Ang isang route ay inilalagay sa `PUBLIC_API_ROUTES_EXACT` (o sa `PUBLIC_READONLY_CORS_API_ROUTES` kung GET-only); isang tunay na subtree lamang ang inilalagay sa `PUBLIC_API_ROUTE_PREFIXES`, at **dapat itong magtapos sa `/`**. Kapag naglagay ng isang indibidwal na route sa listahan ng prefix, nailalantad din sa publiko ang bawat katabing path na may kaparehong mga panimulang character — kabilang ang mga kapatid na dynamic-segment na idadagdag sa hinaharap (GHSA-74g9-q8f6-793h). I-update ang mga unit test sa `tests/unit/public-api-routes.test.ts`, `tests/unit/authz/public-route-exact-match.test.ts`, at `tests/unit/authz/classify.test.ts`.

## Mga Scope

Ang mga API key ay may `scopes` array (nakaimbak bilang JSON sa `api_keys.scopes`; tingnan ang `src/lib/db/apiKeys.ts`).

### Scope ng pamamahala

- `manage` / `admin` — nagbibigay sa key ng access sa mga management API endpoint kapag ipinadala bilang Bearer.

### Mga MCP scope (`src/shared/constants/mcpScopes.ts`)

Nangangailangan ang bawat MCP tool ng mga partikular na scope sa pamamagitan ng `MCP_TOOL_SCOPES`. Kumpletong listahan (`MCP_SCOPE_LIST`):

```
read:health, read:combos, write:combos, read:quota, read:usage,
read:models, execute:completions, execute:search, write:budget,
write:resilience, pricing:write, read:cache, write:cache,
read:compression, write:compression, read:proxies
```

Ipinapasa ng pagpapatupad ng scope sa `open-sse/mcp-server/server.ts` ang listahan ng scope ng bawat tool sa
`evaluateToolScopes()` pagkatapos matukoy ng `resolveCallerScopeContext()` ang mga scope mula sa impormasyon ng MCP auth,
metadata ng request, o `OMNIROUTE_MCP_SCOPES`.

## Toggle na Kinakailangan ang Auth

Tinutukoy ng `isAuthRequired()` sa `src/shared/utils/apiAuth.ts` kung ipatutupad ang **anumang** auth para sa isang request:

- `settings.requireLogin === false` → naka-disable ang auth sa buong sistema.
- Walang naka-configure na password **at** walang `INITIAL_PASSWORD` env var → pinapayagan ng bootstrap mode ang onboarding wizard at mga loopback request, ngunit nangangailangan pa rin ng mga kredensyal ang mga request mula sa nakalantad na network.
- Anumang error sa DB → awtomatikong tumatanggi (secure-by-default).

Ginagamit ng pagpapatupad ng client API key ang `isRequireApiKeyEnabled()` sa `src/shared/utils/featureFlags.ts`, hindi ang direktang pagbasa sa `process.env.REQUIRE_API_KEY`. Mahalaga ito para sa mga naka-deploy na instance: ang pag-toggle sa `REQUIRE_API_KEY` sa Dashboard → Feature Flags ay nag-iimbak ng DB override at agad na nakaaapekto sa `/v1/*`, `/v1beta/*`, `/models`, `/responses`, `/chat/completions`, `/codex/*`, at iba pang pagsusuri ng client-API auth na gumagamit din ng helper na ito. Kung hindi mabasa ang feature flag store, awtomatikong tatanggi ang client API auth at mangangailangan ng key.

## Breaking Change — v3.8.0

Ang mga endpoint na `/api/v1/agents/tasks/*` at `/api/resilience/model-cooldowns` ay **nangangailangan na ngayon ng management auth** (commit `588a0333`). Ang mga client na dati ay nagpapadala ng karaniwang API key na walang `manage` scope ay makatatanggap ng `403`. Pag-migrate: italaga sa key ang `manage` scope sa API Keys dashboard, o gumamit ng naka-log-in na dashboard session.

## Pagbabago sa Gawi — v3.8.2

Ang `/api/mcp/*` (ang remote MCP server) ay LOCAL_ONLY pa rin bilang default ngunit tumatanggap na ngayon ng mga non-loopback request kapag ang `Authorization: Bearer <api-key>` header ay may `manage` scope. Tahasang nililimitahan ang eksepsiyon sa bawat path sa pamamagitan ng `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` sa `src/server/authz/routeGuard.ts`; sadyang HINDI maaaring i-bypass ang kapatid na LOCAL_ONLY prefix na `/api/cli-tools/runtime/*` dahil maaari itong magsimula ng anumang subprocess. Patuloy na magbabalik ng `403 LOCAL_ONLY` ang mga anonymous na request sa `/api/mcp/*` mula sa non-loopback — nananatiling strict-loopback ang default para sa anumang bagong LOCAL_ONLY path. Tingnan ang [Mga Antas ng Route Guard](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out).

## Pagsubok

- Mga unit test: `tests/unit/authz/` — `classify.test.ts`, `pipeline.test.ts`, `client-api-policy.test.ts`, `management-policy.test.ts`, `public-policy.test.ts`.
- Pampublikong allowlist: `tests/unit/public-api-routes.test.ts`.
- Patakbuhin nang nakatuon: `node --import tsx/esm --test tests/unit/authz/classify.test.ts`.

## Pag-debug

Palaging nilalagyan ng pipeline ang mga tugon ng:

```
x-request-id:               <correlation id, inuulit sa mga katawan ng error>
x-omniroute-route-class:    PUBLIC | CLIENT_API | MANAGEMENT
```

Para sa mga napatotohanang kahilingan, kasama rin sa mga upstream (panig ng handler) na header ng kahilingan ang:

```
x-omniroute-auth-kind:      client_api_key | dashboard_session | management_key | anonymous
x-omniroute-auth-id:        key_<last-4> | "dashboard" | "anonymous"
x-omniroute-auth-label:     (opsyonal)
x-omniroute-auth-scopes:    listahang pinaghihiwalay ng kuwit
```

Gamitin ang `assertAuth(req, expectedClass)` sa loob ng mga handler — naglalabas ito ng `AuthzAssertionError` na may code na `AUTHZ_NOT_INITIALIZED` kung nalampasan ang middleware (kapaki-pakinabang para matukoy ang mga pag-urong sa configuration sa mga test).

## Tingnan Din

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — marker ng auth sa bawat endpoint
- [COMPLIANCE.md](../security/COMPLIANCE.md) — audit log para sa mga event ng auth
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md) — mga detalye ng pagpapatupad ng saklaw ng MCP
- Source: `src/server/authz/`, `src/lib/api/requireManagementAuth.ts`
