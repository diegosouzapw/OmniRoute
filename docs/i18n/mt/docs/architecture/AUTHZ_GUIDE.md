# Authorization Guide (Malti)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/AUTHZ_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/AUTHZ_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/AUTHZ_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/AUTHZ_GUIDE.md)

---

> **Sors ewlieni tal-verità:** `src/server/authz/`, `src/shared/constants/publicApiRoutes.ts`, `src/lib/api/requireManagementAuth.ts`, `src/shared/utils/apiAuth.ts`
> **Aġġornat l-aħħar:** 2026-06-28 — v3.8.40

OmniRoute għandu pipeline ta’ awtorizzazzjoni konxju tar-rotot li jikkontrolla kull talba API. Il-klassifikazzjoni hija **deterministika** u **tingħalaq f’każ ta’ falliment** — kull ħaġa li ma tistax tiġi kklassifikata tispiċċa bħala `MANAGEMENT` u teħtieġ sessjoni jew token ta’ livell ta’ ġestjoni. Din il-paġna tispjega l-mudell għall-inġiniera li jżommu r-rotot jew jiddisinjaw endpoints ġodda.

![Pipeline tal-AuthZ (3 klassijiet ta’ rotot + evalwazzjoni tal-politika)](../diagrams/exported/authz-pipeline.svg)

> Sors: [diagrams/authz-pipeline.mmd](../diagrams/authz-pipeline.mmd)

## Żewġ Modi ta’ Awtentikazzjoni

### 1. API Key (Bearer)

Tintuża għall-APIs tal-klijent kompatibbli ma’ OpenAI/Anthropic/Gemini u għal ftit rotot ta’ ġestjoni meta ċ-ċavetta jkollha l-ambitu `manage`.

```
Authorization: Bearer <api-key>
```

Tiġi vvalidata minn `isValidApiKey()` / `extractApiKey()` f’`src/sse/services/auth.ts` u esportata mill-ġdid permezz ta’ `src/shared/utils/apiAuth.ts`. Il-validatur jaċċetta wkoll il-varjabbli tal-ambjent `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` bħala ċwievet passthrough persistenti (kwistjoni #1350).

### 2. Sessjoni tad-Dashboard (cookie auth_token)

Għall-paġni tad-dashboard u l-operazzjonijiet amministrattivi.

```
Cookie: auth_token=<JWT iffirmat b’JWT_SECRET>
```

Cookie tkun sessjoni biss meta l-JWT jiġi vverifikat **u** jkollu `authenticated: true`
(`src/shared/utils/dashboardSessionToken.ts` → `verifyDashboardSessionToken`). Kull
konsumatur tal-cookie (il-gwardja tar-rotta, l-aġġornament tal-pipeline tal-authz, il-handshake
tal-WebSocket, is-server live, `/api/settings/require-login`, `/api/auth/status`) jgħaddi
minn dak il-helper. Jeżistu JWTs oħra ffirmati b’`JWT_SECRET` — il-passthrough tas-CLI
ta’ Cursor joħloq tokens `iss "omniroute" / aud "cursor-cli"` għad-detenturi taċ-ċwievet —
u dawn qatt ma jkunu sessjonijiet (#13298).

Tiġi vverifikata minn `isDashboardSessionAuthenticated()` f’`src/shared/utils/apiAuth.ts`. Il-pipeline jaġġorna l-JWT awtomatikament meta jkun fadallu inqas minn 7 ijiem mill-ħajja tiegħu ta’ 30 jum.

Xi rotot ta’ ġestjoni jaċċettaw **kwalunkwe wieħed** miż-żewġ modi: cookie JEW `Bearer <key>` meta l-API key ikollha l-ambitu `manage` (jew `admin`). Dan huwa dak li jippermetti l-fluss tax-xogħol “konfigurabbli permezz ta’ sejħiet API” miżjud f’v3.8.

#### Gate fakultattiv tal-login OIDC (#6973)

Il-login tal-amministratur tad-dashboard jappoġġja wkoll fluss OIDC (OpenID Connect)
**fakultattiv** flimkien mal-login standard bil-password — il-login bil-password qatt
ma jitneħħa, iżda jiġi biss issupplimentat:

- Ikun diżattivat sakemm `settings.oidcEnabled === true` **u** `oidcIssuer` /
  `oidcClientId` / `oidcClientSecret` ma jkunux kollha kkonfigurati (Settings → Auth).
  Inkella, `GET /api/auth/oidc/login` jirritorna `400`.
- `GET /api/auth/oidc/login` jiskopri l-`authorization_endpoint` mill-
  `/.well-known/openid-configuration` tal-issuer (u juża
  `<issuer>/authorize` bħala alternattiva), jibni l-URI tar-ridirezzjoni mit-talba
  li tkun dieħla (konxju ta’ `x-forwarded-proto`), u jirridirezzjona lejn l-IdP bi `state`
  każwali maħżun f’cookie `oidc_state` `httpOnly`.
- `GET /api/auth/oidc/callback` jivvalida `state`, jibdel il-kodiċi tal-awtorizzazzjoni,
  u jivverifika l-firma tat-token tal-ID permezz tal-JWKS tal-issuer
  (`createRemoteJWKSet` ta’ `jose`, miżmum fil-cache għal kull URI tal-JWKS) b’kontrolli
  ta’ `issuer`/`audience`. Lista fakultattiva ta’ suġġetti permessi,
  `oidcAllowedSubjects`, tqabbel il-claim `sub` tat-token jew il-claim `email` tiegħu —
  il-claim tal-email tiġi aċċettata biss meta `email_verified === true`, għalhekk email
  mhux ivverifikata fl-IdP qatt ma tista’ tgħaddi mill-gate.
- Meta jirnexxi, joħloq **eżattament l-istess** JWT `auth_token` ta’ 30 jum li joħloq
  il-login bil-password (`src/app/api/auth/login/route.ts`), għalhekk il-bqija
  tal-pipeline tas-sessjoni tad-dashboard (aġġornament awtomatiku, flags tal-cookie)
  jibqa’ l-istess — OIDC jibdel biss kif tinħoloq il-cookie, mhux x’permessi tagħti.

## Klassijiet tar-Rotot

`src/server/authz/types.ts` jiddefinixxi tliet klassijiet; kwalunkwe rotta li ma tistax tiġi kklassifikata b’mod deterministiku taqa’ lura għal `MANAGEMENT`.

| Klassi       | Deskrizzjoni                                                                                                                                                       | Awtentikazzjoni meħtieġa                                                   |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------- |
| `PUBLIC`     | Rotot espliċitament sikuri — login, logout, status, init, health, bootstrap tal-onboarding.                                                                        | Xejn                                                                       |
| `CLIENT_API` | Endpoints li jservu l-mudelli — `/api/v1/*`, `/api/v1beta/*`, flimkien mal-aliases `/v1/*`, `/v1beta/*`, `/chat/completions`, `/responses`, `/models`, `/codex/*`. | Ċavetta Bearer meta l-feature flag effettiv `REQUIRE_API_KEY` ikun attivat |
| `MANAGEMENT` | Paġni tad-dashboard, settings, providers, keys, endpoints tal-amministrazzjoni u tad-dijanjostika.                                                                 | Sessjoni tad-dashboard JEW Bearer bl-ambitu `manage`                       |

## Pipeline

```
Talba deħlin → src/proxy.ts
  → runAuthzPipeline() f’src/server/authz/pipeline.ts
    1. Neħħi l-headers interni fdati (x-omniroute-auth-*, x-omniroute-route-class)
    2. Iġġenera l-id tat-talba, ikklassifika r-rotta permezz ta’ classifyRoute()
    3. Jekk pathname == "/" → idderieġi mill-ġdid lejn /dashboard
    4. Jekk qed isir draining (għeluq gradwali) u /api/* → 503
    5. Jekk mhux GET /api/* → gwardja checkBodySize()
    6. Jekk OPTIONS → preflight CORS 204
    7. Jekk options.enforce == false → għaddi direttament bil-headers tal-klassi tar-rotta
    8. Inkella: POLICIES[routeClass].evaluate(ctx)
       - allow  → żid x-omniroute-auth-{kind,id,label,scopes} → NextResponse.next()
       - reject → żball JSON b’correlation_id (paġni tad-dashboard → 302 /login)
```

Il-headers interni fdati (iddefiniti f’`src/server/authz/headers.ts`) **jitneħħew mit-talbiet deħlin** qabel il-klassifikazzjoni — il-klijenti ma jistgħux jimlew minn qabel `x-omniroute-auth-*` biex jimpersonaw suġġett.

### Kuntratti tal-politiki

Kull klassi ta’ rotta għandha politika f’`src/server/authz/policies/`:

- **`publicPolicy`** (`policies/public.ts`) — dejjem tirritorna `allow({ kind: "anonymous", id: "anonymous" })`.
- **`clientApiPolicy`** (`policies/clientApi.ts`) — testratta l-Bearer u tivvalidah permezz ta’ `validateApiKey()`. Tgħaddi għal aċċess anonimu biss meta l-feature flag effettiv `REQUIRE_API_KEY` ikun diżattivat. Il-flag effettiv jiġi riżolt permezz ta’ `isRequireApiKeyEnabled()` (`override tal-feature flag fid-DB > process.env.REQUIRE_API_KEY > valur predefinit`) sabiex il-Feature Flags tad-Dashboard u l-varjabbli tal-ambjent jirregolaw `/api/v1/*`, `/api/v1beta/*`, u l-aliases b’mod konsistenti; fallimenti tar-resolver iwasslu għal rifjut awtomatiku. Tippermetti talbiet b’sessjoni tad-dashboard fuq rotot tal-API tal-klijent (inkluża `/api/v1/models`, użata mill-katalgu tal-mudelli tad-dashboard).
- **`managementPolicy`** (`policies/management.ts`) — taċċetta sessjoni tad-dashboard, talbiet interni għas-sinkronizzazzjoni tal-mudelli (imqabbla ma’ `/api/providers/[name]/(sync-models|models)`), jew taqbeż il-verifika kompletament jekk `isAuthRequired()` tirritorna false. Tirritorna 403 (`AUTH_001`) meta jkun preżenti token Bearer iżda jkun invalidu, u 401 f’każijiet oħra. Tinforza wkoll il-livelli tal-gwardja tar-rotot (LOCAL_ONLY / ALWAYS_PROTECTED) qabel kwalunkwe fergħa tal-awtentikazzjoni — ara [Livelli tal-Gwardja tar-Rotot](../security/ROUTE_GUARD_TIERS.md). Il-paths LOCAL_ONLY f’`LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` (illum: `/api/mcp/`) jistgħu jiġu aċċessati minn indirizzi li mhumiex loopback meta ċ-ċavetta Bearer ikollha l-ambitu `manage`; il-paths LOCAL_ONLY l-oħra kollha jibqgħu limitati strettament għal loopback irrispettivament mill-ambitu.

Politika li tirnexxi tirritorna `AuthSubject` b’`kind ∈ { client_api_key, dashboard_session, management_key, anonymous }`. Il-handlers downstream jistgħu jaqrawh permezz ta’ `assertAuth(request, "CLIENT_API")` f’`src/server/authz/assertAuth.ts` minflok jerġgħu jeżegwixxu l-loġika tal-awtentikazzjoni.

## Lista ta’ Rotot Pubbliċi

`src/shared/constants/publicApiRoutes.ts` hija l-lista espliċita ta’ permessi:

Il-lista hija maqsuma skont il-**forma**, u din il-qasma hija essenzjali (GHSA-74g9-q8f6-793h): prefiss jitqabbel permezz ta’ `startsWith()`, għalhekk jaqbel ukoll ma’ kull mogħdija biswitu li jkollha l-istess karattri inizjali.
Meta `/api/usage/om-usage` intuża bħala prefiss, dan immarka `/api/usage/om-usage<anything>` bħala PUBBLIKU, u Next jirriżolvi dan għal `/api/usage/[connectionId]` — handler mingħajr awtentikazzjoni tiegħu stess.

```ts
// Sottosiġar ġenwini. Kull entrata TRID tispiċċa b’"/" (ivverifikat minn test tal-unità).
PUBLIC_API_ROUTE_PREFIXES = [
  "/api/auth/oidc/",
  "/api/v1/", // ittrattat bħala CLIENT_API fi classify, mhux bħala "pubbliku mingħajr awtentikazzjoni"
  "/api/oauth/",
  "/api/codex/connect/",
  "/api/telegram/",
  "/api/cursor-cli/",
];

// Rotot individwali, imqabbla B'MOD EŻATT (bi jew mingħajr slash finali).
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

// Rotot individwali li jinqraw biss u li jieħdu wkoll ir-rilassament tal-oriġini CORS.
PUBLIC_READONLY_CORS_API_ROUTES = [
  "/api/health/ping",
  "/api/monitoring/health",
  "/api/settings/require-login",
];

// Rotta individwali li tinqara biss MINGĦAJR ir-rilassament CORS.
PUBLIC_READONLY_API_ROUTES_EXACT = new Set(["/api/health"]);

PUBLIC_READONLY_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
```

Ir-rotot li jinqraw biss huma pubbliċi **biss** għal metodi sikuri. Nota: `classifyRoute()` jeskludi `/api/v1/*` u `/api/v1beta/*` mill-każ awtomatiku PUBLIC — dawn huma dejjem `CLIENT_API`, sabiex il-politika taċ-ċavetta Bearer tibqa’ tapplika.

## Kif Iżżid Rotta Ġdida

### Mudell 1 — Endpoint pubbliku tal-API tal-klijent (awtentikazzjoni Bearer)

Ir-rotot taħt `/api/v1/` u `/api/v1beta/` jiġu kklassifikati awtomatikament bħala `CLIENT_API`. Il-middleware jinforza l-verifika Bearer; il-handlers tar-rotta m’għandhomx għalfejn jerġgħu jagħmluha, iżda jistgħu jaqraw is-suġġett jekk ikun utli.

```typescript
// src/app/api/v1/your-route/route.ts
import { NextRequest, NextResponse } from "next/server";
import { assertAuth } from "@/server/authz/assertAuth";

export async function POST(req: NextRequest) {
  const subject = assertAuth(req, "CLIENT_API");
  // subject.kind === "client_api_key" | "anonymous" | "dashboard_session"
  // ... il-loġika tal-handler
}
```

### Mudell 2 — Endpoint ta’ ġestjoni (sessjoni jew Bearer + manage)

Uża `requireManagementAuth()` minn `src/lib/api/requireManagementAuth.ts`:

```typescript
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

export async function POST(request: Request) {
  const rejection = await requireManagementAuth(request);
  if (rejection) return rejection;
  // ... il-loġika tal-handler
}
```

`requireManagementAuth()` tirritorna `null` meta tirnexxi jew `Response` ta’ żball JSON:

- 401 `AUTH_001` "Awtentikazzjoni meħtieġa" — ebda kredenzjali
- 403 — Bearer invalidu **jew** Bearer preżenti iżda ċ-ċavetta m’għandhiex l-ambitu `manage` / `admin`

`hasManageScope(scopes)` tirritorna true għal `"manage"` jew `"admin"`.

### Mudell 3 — Żieda mal-lista pubblika ta’ permessi

Agħżel is-sett skont il-forma, mhux skont il-konvenjenza. Rotta waħda tidħol f’`PUBLIC_API_ROUTES_EXACT` (jew f’`PUBLIC_READONLY_CORS_API_ROUTES` jekk hija GET-only); sottosiġra ġenwina biss tidħol f’`PUBLIC_API_ROUTE_PREFIXES`, u **trid tispiċċa b’`/`**. Jekk tpoġġi rotta individwali fil-lista tal-prefissi, tkun qiegħed tippubblika wkoll kull mogħdija biswitu li taqsam magħha l-karattri inizjali — inklużi rotot aħwa b’segmenti dinamiċi li jiżdiedu aktar tard (GHSA-74g9-q8f6-793h). Aġġorna t-testijiet tal-unità f’`tests/unit/public-api-routes.test.ts`, `tests/unit/authz/public-route-exact-match.test.ts` u `tests/unit/authz/classify.test.ts`.

## Ambiti

Iċ-ċwievet tal-API jinkludu array `scopes` (maħżuna bħala JSON f’`api_keys.scopes`, ara `src/lib/db/apiKeys.ts`).

### Ambitu ta’ ġestjoni

- `manage` / `admin` — jagħti liċ-ċavetta aċċess għall-endpoints tal-API tal-ġestjoni meta tintbagħat bħala Bearer.

### Ambiti tal-MCP (`src/shared/constants/mcpScopes.ts`)

Kull għodda tal-MCP teħtieġ ambiti speċifiċi permezz ta’ `MCP_TOOL_SCOPES`. Lista sħiħa (`MCP_SCOPE_LIST`):

```
read:health, read:combos, write:combos, read:quota, read:usage,
read:models, execute:completions, execute:search, write:budget,
write:resilience, pricing:write, read:cache, write:cache,
read:compression, write:compression, read:proxies
```

L-infurzar tal-ambiti f’`open-sse/mcp-server/server.ts` jgħaddi l-lista tal-ambiti ta’ kull għodda lil
`evaluateToolScopes()` wara li `resolveCallerScopeContext()` jirriżolvi l-ambiti mill-informazzjoni tal-awtentikazzjoni tal-MCP,
mill-metadata tat-talba, jew minn `OMNIROUTE_MCP_SCOPES`.

## Swiċċ tar-Rekwiżit tal-Awtentikazzjoni

`isAuthRequired()` f’`src/shared/utils/apiAuth.ts` jiddeċiedi jekk għandhiex tiġi infurzata **xi forma ta’** awtentikazzjoni għal talba:

- `settings.requireLogin === false` → l-awtentikazzjoni tkun diżattivata globalment.
- Ebda password ikkonfigurata **u** ebda varjabbli tal-ambjent `INITIAL_PASSWORD` → il-modalità bootstrap tippermetti l-wizard tal-konfigurazzjoni inizjali u t-talbiet loopback, iżda t-talbiet minn netwerk espost xorta jeħtieġu kredenzjali.
- Kwalunkwe żball fid-DB → l-aċċess jiġi miċħud (sigurtà awtomatika).

L-infurzar taċ-ċavetta tal-API tal-klijent juża `isRequireApiKeyEnabled()` f’`src/shared/utils/featureFlags.ts`, mhux qari dirett ta’ `process.env.REQUIRE_API_KEY`. Dan huwa importanti għall-istanzi skjerati: meta taqleb `REQUIRE_API_KEY` f’Dashboard → Feature Flags, jinħażen override fid-DB u dan jaffettwa minnufih `/v1/*`, `/v1beta/*`, `/models`, `/responses`, `/chat/completions`, `/codex/*`, u kontrolli oħra tal-awtentikazzjoni tal-API tal-klijent li jużaw dan il-helper. Jekk il-ħażna tal-feature flags ma tkunx tista’ tinqara, l-awtentikazzjoni tal-API tal-klijent timblokka l-aċċess u teħtieġ ċavetta.

## Bidla li Tkisser il-Kompatibbiltà — v3.8.0

L-endpoints `/api/v1/agents/tasks/*` u `/api/resilience/model-cooldowns` **issa jeħtieġu awtentikazzjoni tal-ġestjoni** (commit `588a0333`). Klijenti li qabel kienu jibagħtu ċavetta tal-API normali mingħajr l-ambitu `manage` jirċievu `403`. Migrazzjoni: jew assenja l-ambitu `manage` liċ-ċavetta fid-dashboard API Keys, jew uża sessjoni tad-dashboard illoggjata.

## Bidla fl-Imġiba — v3.8.2

`/api/mcp/*` (is-server remot tal-MCP) għadu LOCAL_ONLY b’mod awtomatiku, iżda issa jaċċetta talbiet mhux loopback meta l-header `Authorization: Bearer <api-key>` ikun fih l-ambitu `manage`. L-eċċezzjoni hija kkontrollata espliċitament għal kull path permezz ta’ `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` f’`src/server/authz/routeGuard.ts`; il-prefiss LOCAL_ONLY relatat `/api/cli-tools/runtime/*` intenzjonalment ma jistax jiġi bypassed għax jista’ jniedi subproċessi arbitrarji. Talbiet anonimi lejn `/api/mcp/*` minn konnessjonijiet mhux loopback jibqgħu jirritornaw `403 LOCAL_ONLY` — l-imġiba awtomatika għal kull path LOCAL_ONLY ġdid tibqa’ strict-loopback. Ara [Livelli tal-Gwardja tar-Rotot](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out).

## Ittestjar

- Testijiet tal-unità: `tests/unit/authz/` — `classify.test.ts`, `pipeline.test.ts`, `client-api-policy.test.ts`, `management-policy.test.ts`, `public-policy.test.ts`.
- Lista ta’ permessi pubbliċi: `tests/unit/public-api-routes.test.ts`.
- Ħaddem test speċifiku: `node --import tsx/esm --test tests/unit/authz/classify.test.ts`.

## Dijanjostika

Il-pipeline dejjem iżid dawn l-intestaturi mat-tweġibiet:

```
x-request-id:               <correlation id, echoed in error bodies>
x-omniroute-route-class:    PUBLIC | CLIENT_API | MANAGEMENT
```

Għal talbiet awtentikati, l-intestaturi tat-talba upstream (min-naħa tal-handler) jinkludu wkoll:

```
x-omniroute-auth-kind:      client_api_key | dashboard_session | management_key | anonymous
x-omniroute-auth-id:        key_<last-4> | "dashboard" | "anonymous"
x-omniroute-auth-label:     (optional)
x-omniroute-auth-scopes:    comma-separated list
```

Uża `assertAuth(req, expectedClass)` ġewwa l-handlers — din tarmi `AuthzAssertionError` bil-kodiċi `AUTHZ_NOT_INITIALIZED` jekk il-middleware jkun ġie evitat (utli biex jinqabdu regressjonijiet fil-konfigurazzjoni waqt it-testijiet).

## Ara Wkoll

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — markatur tal-awtentikazzjoni għal kull endpoint
- [COMPLIANCE.md](../security/COMPLIANCE.md) — reġistru tal-awditjar għall-avvenimenti tal-awtentikazzjoni
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md) — dettalji dwar l-infurzar tal-ambitu tal-MCP
- Sors: `src/server/authz/`, `src/lib/api/requireManagementAuth.ts`
