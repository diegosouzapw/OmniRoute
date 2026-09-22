# Authorization Guide (Nederlands)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/AUTHZ_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/AUTHZ_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/AUTHZ_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/AUTHZ_GUIDE.md)

---

> **Bron van waarheid:** `src/server/authz/`, `src/shared/constants/publicApiRoutes.ts`, `src/lib/api/requireManagementAuth.ts`, `src/shared/utils/apiAuth.ts`
> **Laatst bijgewerkt:** 2026-06-28 — v3.8.40

OmniRoute heeft een routebewuste autorisatiepipeline die elk API-verzoek controleert. De classificatie is **deterministisch** en **fail-closed** — alles wat niet kan worden geclassificeerd, wordt als `MANAGEMENT` aangemerkt en vereist een sessie of een token op beheerniveau. Deze pagina legt het model uit voor engineers die routes onderhouden of nieuwe endpoints ontwerpen.

![AuthZ-pipeline (3 routeklassen + beleidsevaluatie)](../diagrams/exported/authz-pipeline.svg)

> Bron: [diagrams/authz-pipeline.mmd](../diagrams/authz-pipeline.mmd)

## Twee authenticatiemethoden

### 1. API-sleutel (Bearer)

Wordt gebruikt voor de OpenAI/Anthropic/Gemini-compatibele client-API's en enkele beheerroutes wanneer de sleutel het bereik `manage` heeft.

```
Authorization: Bearer <api-sleutel>
```

Gevalideerd door `isValidApiKey()` / `extractApiKey()` in `src/sse/services/auth.ts` en opnieuw geëxporteerd via `src/shared/utils/apiAuth.ts`. De validator accepteert ook de omgevingsvariabelen `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` als permanente passthrough-sleutels (issue #1350).

### 2. Dashboardsessie (auth_token-cookie)

Voor dashboardpagina's en beheerdersbewerkingen.

```
Cookie: auth_token=<JWT ondertekend met JWT_SECRET>
```

Een cookie is alleen een sessie wanneer de JWT met succes wordt geverifieerd **en** `authenticated: true`
bevat (`src/shared/utils/dashboardSessionToken.ts` → `verifyDashboardSessionToken`). Elke
gebruiker van de cookie (routebeveiliging, vernieuwing van de authz-pipeline, WebSocket-handshake, live
server, `/api/settings/require-login`, `/api/auth/status`) gebruikt daarvoor die helper.
Er bestaan andere met `JWT_SECRET` ondertekende JWT's — de Cursor CLI-passthrough maakt
tokens met `iss "omniroute" / aud "cursor-cli"` aan voor sleutelhouders — en die gelden nooit als sessies
(#13298).

Geverifieerd door `isDashboardSessionAuthenticated()` in `src/shared/utils/apiAuth.ts`. De pipeline vernieuwt de JWT automatisch wanneer er minder dan 7 dagen over zijn van de geldigheidsduur van 30 dagen.

Sommige beheerroutes accepteren **beide** methoden: cookie OF `Bearer <sleutel>` wanneer de API-sleutel het bereik `manage` (of `admin`) heeft. Dit maakt de in v3.8 toegevoegde workflow mogelijk waarbij configuratie via API-aanroepen plaatsvindt.

#### Optionele OIDC-inlogbeveiliging (#6973)

De beheerdersaanmelding voor het dashboard ondersteunt ook een **optionele** OIDC-stroom (OpenID Connect)
naast de standaardaanmelding met een wachtwoord — aanmelden met een wachtwoord wordt nooit verwijderd, maar alleen
aangevuld:

- Uitgeschakeld tenzij `settings.oidcEnabled === true` **en** `oidcIssuer` /
  `oidcClientId` / `oidcClientSecret` allemaal zijn geconfigureerd (Instellingen → Authenticatie).
  `GET /api/auth/oidc/login` retourneert anders `400`.
- `GET /api/auth/oidc/login` haalt het `authorization_endpoint` op uit de
  `/.well-known/openid-configuration` van de uitgever (met
  `<issuer>/authorize` als terugvaloptie), bouwt de omleidings-URI op basis van het inkomende verzoek
  (rekening houdend met `x-forwarded-proto`) en leidt om naar de IdP met een willekeurige `state`
  die wordt opgeslagen in een `httpOnly`-cookie met de naam `oidc_state`.
- `GET /api/auth/oidc/callback` valideert `state`, wisselt de autorisatiecode
  in en verifieert de handtekening van het ID-token via de JWKS van de uitgever
  (`createRemoteJWKSet` van `jose`, gecachet per JWKS-URI), met controles op `issuer`/`audience`.
  Een optionele allowlist `oidcAllowedSubjects` vergelijkt de `sub`-claim of
  de `email`-claim van het token — de e-mailclaim wordt alleen geaccepteerd wanneer
  `email_verified === true`, zodat een niet-geverifieerd e-mailadres bij de IdP de
  beveiliging nooit kan passeren.
- Bij succes wordt **exact dezelfde** 30 dagen geldige `auth_token`-JWT aangemaakt die ook bij
  aanmelding met een wachtwoord wordt uitgegeven (`src/app/api/auth/login/route.ts`), zodat de rest van de
  dashboardsessiepipeline (automatische vernieuwing, cookiekenmerken) ongewijzigd blijft —
  OIDC vervangt alleen de manier waarop de cookie wordt aangemaakt, niet welke rechten deze verleent.

## Routeklassen

`src/server/authz/types.ts` definieert drie klassen; elke route die niet deterministisch kan worden geclassificeerd, valt terug op `MANAGEMENT`.

| Klasse       | Beschrijving                                                                                                                                                | Authenticatie vereist                                                              |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| `PUBLIC`     | Expliciet veilige routes — inloggen, uitloggen, status, initialisatie, statuscontrole, onboarding-bootstrap.                                                | Geen                                                                               |
| `CLIENT_API` | Endpoints voor modelaanroepen — `/api/v1/*`, `/api/v1beta/*`, plus aliassen `/v1/*`, `/v1beta/*`, `/chat/completions`, `/responses`, `/models`, `/codex/*`. | Bearer-sleutel wanneer de effectieve featureflag `REQUIRE_API_KEY` is ingeschakeld |
| `MANAGEMENT` | Dashboardpagina's, instellingen, providers, sleutels en endpoints voor beheer en diagnostiek.                                                               | Dashboardsessie OF Bearer met het bereik `manage`                                  |

## Pipeline

```
Binnenkomend verzoek → src/proxy.ts
  → runAuthzPipeline() in src/server/authz/pipeline.ts
    1. Verwijder vertrouwde interne headers (x-omniroute-auth-*, x-omniroute-route-class)
    2. Genereer verzoek-ID, classificeer route via classifyRoute()
    3. Als pathname == "/" → omleiden naar /dashboard
    4. Als het systeem wordt leeggemaakt (gecontroleerd afsluiten) en /api/* → 503
    5. Als niet-GET /api/* → checkBodySize()-controle
    6. Als OPTIONS → CORS-preflight 204
    7. Als options.enforce == false → doorlaten met routeklasseheaders
    8. Anders: POLICIES[routeClass].evaluate(ctx)
       - toestaan → voeg x-omniroute-auth-{kind,id,label,scopes} toe → NextResponse.next()
       - weigeren → JSON-fout met correlation_id (dashboardpagina's → 302 /login)
```

Vertrouwde interne headers (gedefinieerd in `src/server/authz/headers.ts`) worden vóór classificatie **uit binnenkomende verzoeken verwijderd** — clients kunnen `x-omniroute-auth-*` niet vooraf invullen om zich als een subject voor te doen.

### Policycontracten

Elke routeklasse heeft een policy in `src/server/authz/policies/`:

- **`publicPolicy`** (`policies/public.ts`) — retourneert altijd `allow({ kind: "anonymous", id: "anonymous" })`.
- **`clientApiPolicy`** (`policies/clientApi.ts`) — extraheert Bearer en valideert deze via `validateApiKey()`. Valt alleen terug op anonieme toegang wanneer de effectieve featureflag `REQUIRE_API_KEY` is uitgeschakeld. De effectieve vlag wordt bepaald via `isRequireApiKeyEnabled()` (`overschrijving door DB-featureflag > process.env.REQUIRE_API_KEY > standaardwaarde`), zodat Dashboard-featureflags en omgevingsvariabelen `/api/v1/*`, `/api/v1beta/*` en aliassen consistent beheren; fouten in de resolver leiden tot weigering. Staat verzoeken met een dashboardsessie toe op client-API-routes (waaronder `/api/v1/models`, gebruikt door de modelcatalogus van het dashboard).
- **`managementPolicy`** (`policies/management.ts`) — accepteert een dashboardsessie en interne modelsynchronisatieverzoeken (gematcht met `/api/providers/[name]/(sync-models|models)`), of slaat alles over als `isAuthRequired()` false retourneert. Retourneert 403 (`AUTH_001`) wanneer een Bearer-token aanwezig maar ongeldig is, anders 401. Dwingt ook de routebeveiligingsniveaus (LOCAL_ONLY / ALWAYS_PROTECTED) af vóór elke authenticatievertakking — zie [Routebeveiligingsniveaus](../security/ROUTE_GUARD_TIERS.md). LOCAL_ONLY-paden in `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` (momenteel: `/api/mcp/`) zijn toegankelijk vanaf niet-loopbackadressen wanneer de Bearer-sleutel het bereik `manage` bevat; alle andere LOCAL_ONLY-paden blijven strikt beperkt tot loopback, ongeacht het bereik.

Een geslaagde policy retourneert `AuthSubject` met `kind ∈ { client_api_key, dashboard_session, management_key, anonymous }`. Downstream-handlers kunnen dit lezen via `assertAuth(request, "CLIENT_API")` in `src/server/authz/assertAuth.ts` in plaats van de authenticatielogica opnieuw uit te voeren.

## Lijst met openbare routes

`src/shared/constants/publicApiRoutes.ts` is de expliciete toelatingslijst:

De lijst is opgesplitst op basis van **vorm**, en deze opsplitsing is essentieel (GHSA-74g9-q8f6-793h): een prefix wordt vergeleken met `startsWith()`, waardoor deze ook overeenkomt met elk aangrenzend pad dat dezelfde begintekens heeft.
Met `/api/usage/om-usage` als prefix werd `/api/usage/om-usage<anything>` OPENBAAR, en Next herleidt dat tot `/api/usage/[connectionId]` — een handler zonder eigen authenticatie.

```ts
// Echte substructuren. Elk item MOET eindigen op "/" (gecontroleerd door een unit-test).
PUBLIC_API_ROUTE_PREFIXES = [
  "/api/auth/oidc/",
  "/api/v1/", // behandeld als CLIENT_API in classify, niet als openbaar zonder authenticatie
  "/api/oauth/",
  "/api/codex/connect/",
  "/api/telegram/",
  "/api/cursor-cli/",
];

// Afzonderlijke routes, die EXACT overeenkomen (met of zonder afsluitende slash).
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

// Alleen-lezen afzonderlijke routes waarvoor ook de CORS-originversoepeling geldt.
PUBLIC_READONLY_CORS_API_ROUTES = [
  "/api/health/ping",
  "/api/monitoring/health",
  "/api/settings/require-login",
];

// Alleen-lezen afzonderlijke route ZONDER de CORS-versoepeling.
PUBLIC_READONLY_API_ROUTES_EXACT = new Set(["/api/health"]);

PUBLIC_READONLY_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
```

Alleen-lezen routes zijn uitsluitend openbaar voor **veilige** methoden. Let op: `classifyRoute()` sluit `/api/v1/*` en `/api/v1beta/*` uit van de terugval naar PUBLIC — deze zijn altijd `CLIENT_API`, zodat het beleid voor Bearer-sleutels van toepassing blijft.

## Een nieuwe route toevoegen

### Patroon 1 — Openbaar client-API-eindpunt (Bearer-authenticatie)

Routes onder `/api/v1/` en `/api/v1beta/` worden automatisch geclassificeerd als `CLIENT_API`. De middleware dwingt de Bearer-controle af; routehandlers hoeven deze niet opnieuw uit te voeren, maar kunnen het subject uitlezen als dat nuttig is.

```typescript
// src/app/api/v1/your-route/route.ts
import { NextRequest, NextResponse } from "next/server";
import { assertAuth } from "@/server/authz/assertAuth";

export async function POST(req: NextRequest) {
  const subject = assertAuth(req, "CLIENT_API");
  // subject.kind === "client_api_key" | "anonymous" | "dashboard_session"
  // ... handlerlogica
}
```

### Patroon 2 — Beheereindpunt (sessie of Bearer + manage)

Gebruik `requireManagementAuth()` uit `src/lib/api/requireManagementAuth.ts`:

```typescript
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

export async function POST(request: Request) {
  const rejection = await requireManagementAuth(request);
  if (rejection) return rejection;
  // ... handlerlogica
}
```

`requireManagementAuth()` retourneert `null` bij succes of een JSON-fout-`Response`:

- 401 `AUTH_001` "Authenticatie vereist" — er zijn helemaal geen referenties aanwezig
- 403 — ongeldige Bearer **of** Bearer aanwezig, maar de sleutel mist het bereik `manage` / `admin`

`hasManageScope(scopes)` retourneert true voor `"manage"` of `"admin"`.

### Patroon 3 — Toevoegen aan de openbare toelatingslijst

Kies de verzameling op basis van de vorm, niet op basis van gemak. Eén route hoort in `PUBLIC_API_ROUTES_EXACT` (of in `PUBLIC_READONLY_CORS_API_ROUTES` als deze alleen GET ondersteunt); alleen een echte substructuur hoort in `PUBLIC_API_ROUTE_PREFIXES`, en deze **moet eindigen op `/`**. Door één route in de prefixlijst te plaatsen, worden ook alle aangrenzende paden met dezelfde begintekens openbaar gemaakt — inclusief later toegevoegde siblings met dynamische segmenten (GHSA-74g9-q8f6-793h). Werk de unit-tests bij in `tests/unit/public-api-routes.test.ts`, `tests/unit/authz/public-route-exact-match.test.ts` en `tests/unit/authz/classify.test.ts`.

## Scopes

API-sleutels bevatten een `scopes`-array (opgeslagen als JSON in `api_keys.scopes`, zie `src/lib/db/apiKeys.ts`).

### Beheerscope

- `manage` / `admin` — geeft de sleutel toegang tot beheer-API-eindpunten wanneer deze als Bearer-token wordt verzonden.

### MCP-scopes (`src/shared/constants/mcpScopes.ts`)

Elke MCP-tool vereist specifieke scopes via `MCP_TOOL_SCOPES`. Volledige lijst (`MCP_SCOPE_LIST`):

```
read:health, read:combos, write:combos, read:quota, read:usage,
read:models, execute:completions, execute:search, write:budget,
write:resilience, pricing:write, read:cache, write:cache,
read:compression, write:compression, read:proxies
```

Scopehandhaving in `open-sse/mcp-server/server.ts` geeft de scopelijst van elke tool door aan
`evaluateToolScopes()` nadat `resolveCallerScopeContext()` scopes heeft bepaald op basis van MCP-authenticatiegegevens,
requestmetadata of `OMNIROUTE_MCP_SCOPES`.

## Schakelaar voor vereiste authenticatie

`isAuthRequired()` in `src/shared/utils/apiAuth.ts` bepaalt of voor een request **enige** vorm van authenticatie wordt afgedwongen:

- `settings.requireLogin === false` → authenticatie is globaal uitgeschakeld.
- Geen wachtwoord geconfigureerd **en** geen `INITIAL_PASSWORD`-omgevingsvariabele → de bootstrapmodus staat de onboardingwizard en loopbackrequests toe, maar requests via het externe netwerk vereisen nog steeds inloggegevens.
- Elke databasefout → wordt gesloten bij fouten (standaard veilig).

De handhaving van API-sleutels voor clients gebruikt `isRequireApiKeyEnabled()` in `src/shared/utils/featureFlags.ts`, niet een rechtstreekse uitlezing van `process.env.REQUIRE_API_KEY`. Dit is van belang voor geïmplementeerde instanties: wanneer `REQUIRE_API_KEY` wordt omgeschakeld in Dashboard → Feature Flags, wordt een database-override opgeslagen die onmiddellijk invloed heeft op `/v1/*`, `/v1beta/*`, `/models`, `/responses`, `/chat/completions`, `/codex/*` en andere authenticatiecontroles voor de client-API die deze helper delen. Als de featureflagopslag niet kan worden uitgelezen, wordt client-API-authenticatie gesloten bij fouten en is een sleutel vereist.

## Incompatibele wijziging — v3.8.0

De eindpunten `/api/v1/agents/tasks/*` en `/api/resilience/model-cooldowns` **vereisen nu beheerauthenticatie** (commit `588a0333`). Clients die eerder een normale API-sleutel zonder de scope `manage` verzonden, ontvangen `403`. Migratie: wijs de scope `manage` toe aan de sleutel in het API Keys-dashboard of gebruik een aangemelde dashboardsessie.

## Gedragswijziging — v3.8.2

`/api/mcp/*` (de externe MCP-server) is standaard nog steeds LOCAL_ONLY, maar accepteert nu niet-loopbackrequests wanneer de header `Authorization: Bearer <api-key>` de scope `manage` bevat. De uitzondering wordt expliciet per pad beheerd via `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` in `src/server/authz/routeGuard.ts`; het verwante LOCAL_ONLY-prefix `/api/cli-tools/runtime/*` kan bewust NIET worden omzeild, omdat het willekeurige subprocessen kan starten. Anonieme requests naar `/api/mcp/*` die niet van loopback afkomstig zijn, blijven `403 LOCAL_ONLY` retourneren — de standaard voor elk nieuw LOCAL_ONLY-pad blijft strikt beperkt tot loopback. Zie [Route Guard-niveaus](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out).

## Testen

- Unittests: `tests/unit/authz/` — `classify.test.ts`, `pipeline.test.ts`, `client-api-policy.test.ts`, `management-policy.test.ts`, `public-policy.test.ts`.
- Openbare toelatingslijst: `tests/unit/public-api-routes.test.ts`.
- Gericht uitvoeren: `node --import tsx/esm --test tests/unit/authz/classify.test.ts`.

## Foutopsporing

De pipeline voorziet antwoorden altijd van:

```
x-request-id:               <correlatie-id, herhaald in foutresponsen>
x-omniroute-route-class:    PUBLIC | CLIENT_API | MANAGEMENT
```

Voor geauthenticeerde verzoeken bevatten de upstream verzoekheaders (aan de handlerzijde) ook:

```
x-omniroute-auth-kind:      client_api_key | dashboard_session | management_key | anonymous
x-omniroute-auth-id:        key_<laatste-4> | "dashboard" | "anonymous"
x-omniroute-auth-label:     (optioneel)
x-omniroute-auth-scopes:    door komma's gescheiden lijst
```

Gebruik `assertAuth(req, expectedClass)` in handlers — dit genereert een `AuthzAssertionError` met de code `AUTHZ_NOT_INITIALIZED` als de middleware is omzeild (nuttig om configuratieregressies in tests te detecteren).

## Zie ook

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — authenticatiemarkering per endpoint
- [COMPLIANCE.md](../security/COMPLIANCE.md) — auditlogboek voor authenticatiegebeurtenissen
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md) — details over het afdwingen van MCP-bereiken
- Bron: `src/server/authz/`, `src/lib/api/requireManagementAuth.ts`
