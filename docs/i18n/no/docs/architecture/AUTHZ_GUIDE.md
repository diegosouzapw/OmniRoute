# Authorization Guide (Norsk)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/AUTHZ_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/AUTHZ_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/AUTHZ_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/AUTHZ_GUIDE.md)

---

> **Sannhetskilde:** `src/server/authz/`, `src/shared/constants/publicApiRoutes.ts`, `src/lib/api/requireManagementAuth.ts`, `src/shared/utils/apiAuth.ts`
> **Sist oppdatert:** 2026-06-28 — v3.8.40

OmniRoute har en rutebevisst autorisasjonskjede som kontrollerer hver API-forespørsel. Klassifiseringen er **deterministisk** og **lukket ved feil** — alt som ikke kan klassifiseres, ender opp som `MANAGEMENT` og krever en økt eller et token med administrasjonstilgang. Denne siden forklarer modellen for utviklere som vedlikeholder ruter eller utformer nye endepunkter.

![AuthZ-kjede (3 ruteklasser + policyevaluering)](../diagrams/exported/authz-pipeline.svg)

> Kilde: [diagrams/authz-pipeline.mmd](../diagrams/authz-pipeline.mmd)

## To autentiseringsmoduser

### 1. API-nøkkel (Bearer)

Brukes for de OpenAI-/Anthropic-/Gemini-kompatible klient-API-ene og enkelte administrasjonsruter når nøkkelen har `manage`-omfanget.

```
Authorization: Bearer <api-nøkkel>
```

Valideres av `isValidApiKey()` / `extractApiKey()` i `src/sse/services/auth.ts` og reeksporteres gjennom `src/shared/utils/apiAuth.ts`. Validatoren godtar også miljøvariablene `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` som vedvarende passthrough-nøkler (problem #1350).

### 2. Kontrollpaneløkt (auth_token-informasjonskapsel)

For kontrollpanelsider og administratoroperasjoner.

```
Cookie: auth_token=<JWT signert med JWT_SECRET>
```

En informasjonskapsel er bare en økt når JWT-en verifiseres **og** inneholder `authenticated: true`
(`src/shared/utils/dashboardSessionToken.ts` → `verifyDashboardSessionToken`). Alle
som bruker informasjonskapselen (rutevakt, oppdatering av AuthZ-kjeden, WebSocket-håndtrykk, live-
server, `/api/settings/require-login`, `/api/auth/status`), går gjennom denne hjelpefunksjonen.
Det finnes andre JWT-er signert med `JWT_SECRET` — Cursor CLI-passthrough oppretter
tokener med `iss "omniroute" / aud "cursor-cli"` for nøkkelinnehavere — og disse er aldri økter
(#13298).

Verifiseres av `isDashboardSessionAuthenticated()` i `src/shared/utils/apiAuth.ts`. Kjeden oppdaterer JWT-en automatisk når det gjenstår mindre enn 7 dager av dens 30-dagers levetid.

Enkelte administrasjonsruter godtar **begge** moduser: informasjonskapsel ELLER `Bearer <key>` når API-nøkkelen har `manage`- (eller `admin`-) omfanget. Dette muliggjør arbeidsflyten «konfigurerbar via API-kall» som ble lagt til i v3.8.

#### Valgfri OIDC-påloggingsport (#6973)

Administratorpåloggingen for kontrollpanelet støtter også en **valgfri** OIDC-flyt (OpenID Connect)
ved siden av standard pålogging med passord — pålogging med passord fjernes aldri, men
suppleres:

- Deaktivert med mindre `settings.oidcEnabled === true` **og** `oidcIssuer` /
  `oidcClientId` / `oidcClientSecret` alle er konfigurert (Innstillinger → Autentisering).
  `GET /api/auth/oidc/login` returnerer ellers `400`.
- `GET /api/auth/oidc/login` finner `authorization_endpoint` fra utstederens
  `/.well-known/openid-configuration` (faller tilbake til
  `<issuer>/authorize`), bygger URI-en for omdirigering fra den innkommende forespørselen
  (med støtte for `x-forwarded-proto`) og omdirigerer til IdP-en med en tilfeldig `state`
  lagret i en `httpOnly` `oidc_state`-informasjonskapsel.
- `GET /api/auth/oidc/callback` validerer `state`, utveksler autorisasjonskoden
  og verifiserer ID-tokenets signatur via utstederens JWKS
  (`jose` sin `createRemoteJWKSet`, bufret per JWKS-URI) med kontroller av `issuer`/`audience`.
  En valgfri `oidcAllowedSubjects`-tillatelsesliste samsvarer med tokenets
  `sub`-krav eller dets `email`-krav — e-postkravet godtas bare når
  `email_verified === true`, slik at en ubekreftet e-postadresse hos IdP-en aldri kan passere
  porten.
- Ved vellykket pålogging opprettes **nøyaktig samme** 30-dagers `auth_token`-JWT som utstedes ved
  passordpålogging (`src/app/api/auth/login/route.ts`), slik at resten av
  øktkjeden for kontrollpanelet (automatisk oppdatering, innstillinger for informasjonskapsler) er uendret —
  OIDC erstatter bare hvordan informasjonskapselen opprettes, ikke hvilke tilganger den gir.

## Ruteklasser

`src/server/authz/types.ts` definerer tre klasser. Alle ruter som ikke kan klassifiseres deterministisk, faller tilbake til `MANAGEMENT`.

| Klasse       | Beskrivelse                                                                                                                                                   | Autentisering kreves                                                           |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| `PUBLIC`     | Eksplisitt sikre ruter — innlogging, utlogging, status, initialisering, helsesjekk og oppstart av onboarding.                                                 | Ingen                                                                          |
| `CLIENT_API` | Endepunkter for modellservering — `/api/v1/*`, `/api/v1beta/*`, samt aliasene `/v1/*`, `/v1beta/*`, `/chat/completions`, `/responses`, `/models`, `/codex/*`. | Bearer-nøkkel når det effektive funksjonsflagget `REQUIRE_API_KEY` er aktivert |
| `MANAGEMENT` | Dashbord-sider, innstillinger, leverandører, nøkler samt administrator- og diagnostikkendepunkter.                                                            | Dashbordøkt ELLER Bearer med `manage`-omfang                                   |

## Behandlingsflyt

```
Innkommende forespørsel → src/proxy.ts
  → runAuthzPipeline() i src/server/authz/pipeline.ts
    1. Fjern klarerte interne headere (x-omniroute-auth-*, x-omniroute-route-class)
    2. Generer forespørsels-ID, klassifiser ruten via classifyRoute()
    3. Hvis pathname == "/" → omdiriger til /dashboard
    4. Hvis systemet tømmes (kontrollert nedstenging) og /api/* → 503
    5. Hvis annet enn GET mot /api/* → bruk checkBodySize()-sperren
    6. Hvis OPTIONS → CORS-preflight 204
    7. Hvis options.enforce == false → slipp gjennom med ruteklasse-headere
    8. Ellers: POLICIES[routeClass].evaluate(ctx)
       - allow  → sett x-omniroute-auth-{kind,id,label,scopes} → NextResponse.next()
       - reject → JSON-feil med correlation_id (dashbord-sider → 302 /login)
```

Klarerte interne headere (definert i `src/server/authz/headers.ts`) **fjernes fra innkommende forespørsler** før klassifisering — klienter kan ikke forhåndsutfylle `x-omniroute-auth-*` for å utgi seg for å være et subjekt.

### Policykontrakter

Hver ruteklasse har en policy i `src/server/authz/policies/`:

- **`publicPolicy`** (`policies/public.ts`) — returnerer alltid `allow({ kind: "anonymous", id: "anonymous" })`.
- **`clientApiPolicy`** (`policies/clientApi.ts`) — trekker ut Bearer og validerer via `validateApiKey()`. Faller bare tilbake til anonym tilgang når det effektive funksjonsflagget `REQUIRE_API_KEY` er deaktivert. Det effektive flagget fastsettes gjennom `isRequireApiKeyEnabled()` (`overstyring med funksjonsflagg i DB > process.env.REQUIRE_API_KEY > standardverdi`), slik at funksjonsflagg i dashbordet og miljøvariabler styrer `/api/v1/*`, `/api/v1beta/*` og aliasene konsekvent. Feil i fastsettingen fører til avvisning. Tillater forespørsler med dashbordøkt på klient-API-ruter (inkludert `/api/v1/models`, som brukes av dashbordets modellkatalog).
- **`managementPolicy`** (`policies/management.ts`) — godtar dashbordøkt og interne forespørsler om modellsynkronisering (samsvart mot `/api/providers/[name]/(sync-models|models)`), eller hopper over alt hvis `isAuthRequired()` returnerer false. Returnerer 403 (`AUTH_001`) når et Bearer-token finnes, men er ugyldig, ellers 401. Håndhever også nivåene for rutebeskyttelse (LOCAL_ONLY / ALWAYS_PROTECTED) før enhver autentiseringsgren — se [Nivåer for rutebeskyttelse](../security/ROUTE_GUARD_TIERS.md). LOCAL_ONLY-baner i `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` (for øyeblikket: `/api/mcp/`) kan nås fra adresser utenfor loopback når Bearer-nøkkelen har `manage`-omfanget. Alle andre LOCAL_ONLY-baner forblir strengt begrenset til loopback uavhengig av omfang.

En vellykket policy returnerer `AuthSubject` med `kind ∈ { client_api_key, dashboard_session, management_key, anonymous }`. Nedstrøms behandlere kan lese det via `assertAuth(request, "CLIENT_API")` i `src/server/authz/assertAuth.ts` i stedet for å kjøre autentiseringslogikken på nytt.

## Liste over offentlige ruter

`src/shared/constants/publicApiRoutes.ts` er den eksplisitte tillatelseslisten:

Listen er delt etter **form**, og inndelingen er sikkerhetskritisk (GHSA-74g9-q8f6-793h): Et prefiks
sammenlignes med `startsWith()`, så det samsvarer også med alle tilstøtende stier som deler de innledende tegnene.
Da `/api/usage/om-usage` ble brukt som prefiks, ble `/api/usage/om-usage<anything>` merket som OFFENTLIG, og Next tolker
dette som `/api/usage/[connectionId]` — en håndterer uten egen autentisering.

```ts
// Reelle undertrær. Hver oppføring MÅ slutte med "/" (håndheves av en enhetstest).
PUBLIC_API_ROUTE_PREFIXES = [
  "/api/auth/oidc/",
  "/api/v1/", // behandles som CLIENT_API i classify, ikke som offentlig uten autentisering
  "/api/oauth/",
  "/api/codex/connect/",
  "/api/telegram/",
  "/api/cursor-cli/",
];

// Enkeltstående ruter, med EKSAKT samsvar (med eller uten avsluttende skråstrek).
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

// Skrivebeskyttede enkeltstående ruter som også får en lemping av CORS-opprinnelseskravet.
PUBLIC_READONLY_CORS_API_ROUTES = [
  "/api/health/ping",
  "/api/monitoring/health",
  "/api/settings/require-login",
];

// Skrivebeskyttet enkeltstående rute UTEN lemping av CORS-kravet.
PUBLIC_READONLY_API_ROUTES_EXACT = new Set(["/api/health"]);

PUBLIC_READONLY_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
```

Skrivebeskyttede ruter er offentlige **bare** for sikre metoder. Merk: `classifyRoute()` utelukker `/api/v1/*` og `/api/v1beta/*` fra PUBLIC-standardutfallet — disse er alltid `CLIENT_API`, slik at policyen for Bearer-nøkler fortsatt gjelder.

## Legge til en ny rute

### Mønster 1 — Offentlig klient-API-endepunkt (Bearer-autentisering)

Ruter under `/api/v1/` og `/api/v1beta/` klassifiseres automatisk som `CLIENT_API`. Mellomvaren håndhever Bearer-kontrollen. Rutehåndtererne trenger ikke å gjenta den, men kan lese subjektet dersom det er nyttig.

```typescript
// src/app/api/v1/your-route/route.ts
import { NextRequest, NextResponse } from "next/server";
import { assertAuth } from "@/server/authz/assertAuth";

export async function POST(req: NextRequest) {
  const subject = assertAuth(req, "CLIENT_API");
  // subject.kind === "client_api_key" | "anonymous" | "dashboard_session"
  // ... håndteringslogikk
}
```

### Mønster 2 — Administrasjonsendepunkt (økt eller Bearer + administrasjon)

Bruk `requireManagementAuth()` fra `src/lib/api/requireManagementAuth.ts`:

```typescript
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

export async function POST(request: Request) {
  const rejection = await requireManagementAuth(request);
  if (rejection) return rejection;
  // ... håndteringslogikk
}
```

`requireManagementAuth()` returnerer `null` ved suksess eller en JSON-feil som `Response`:

- 401 `AUTH_001` "Autentisering kreves" — ingen påloggingsopplysninger
- 403 — ugyldig Bearer **eller** Bearer finnes, men nøkkelen mangler omfanget `manage` / `admin`

`hasManageScope(scopes)` returnerer true for `"manage"` eller `"admin"`.

### Mønster 3 — Legge til i den offentlige tillatelseslisten

Velg mengde etter form, ikke bekvemmelighet. Én rute skal legges i `PUBLIC_API_ROUTES_EXACT` (eller `PUBLIC_READONLY_CORS_API_ROUTES` dersom den bare støtter GET). Bare et reelt undertre skal legges i `PUBLIC_API_ROUTE_PREFIXES`, og det **må slutte med `/`**. Hvis en enkeltstående rute legges i prefikslisten, blir også alle tilstøtende stier som deler de innledende tegnene, offentlige — inkludert søskenruter med dynamiske segmenter som legges til senere (GHSA-74g9-q8f6-793h). Oppdater enhetstestene i `tests/unit/public-api-routes.test.ts`, `tests/unit/authz/public-route-exact-match.test.ts` og `tests/unit/authz/classify.test.ts`.

## Tilgangsområder

API-nøkler har en `scopes`-matrise (lagret som JSON i `api_keys.scopes`, se `src/lib/db/apiKeys.ts`).

### Administrasjonstilgang

- `manage` / `admin` — gir nøkkelen tilgang til endepunkter i administrasjons-API-et når den sendes som Bearer-token.

### MCP-tilgangsområder (`src/shared/constants/mcpScopes.ts`)

Hvert MCP-verktøy krever bestemte tilgangsområder via `MCP_TOOL_SCOPES`. Fullstendig liste (`MCP_SCOPE_LIST`):

```
read:health, read:combos, write:combos, read:quota, read:usage,
read:models, execute:completions, execute:search, write:budget,
write:resilience, pricing:write, read:cache, write:cache,
read:compression, write:compression, read:proxies
```

Håndheving av tilgangsområder i `open-sse/mcp-server/server.ts` sender hvert verktøys liste over tilgangsområder til
`evaluateToolScopes()` etter at `resolveCallerScopeContext()` har fastslått tilgangsområdene fra MCP-autentiseringsinformasjon,
metadata i forespørselen eller `OMNIROUTE_MCP_SCOPES`.

## Bryter for krav om autentisering

`isAuthRequired()` i `src/shared/utils/apiAuth.ts` avgjør om **noen form for** autentisering håndheves for en forespørsel:

- `settings.requireLogin === false` → autentisering er deaktivert globalt.
- Ingen konfigurert passord **og** ingen `INITIAL_PASSWORD`-miljøvariabel → oppstartsmodus tillater introduksjonsveiviseren og forespørsler fra tilbakekoblingsgrensesnittet, men eksponerte nettverksforespørsler krever fortsatt påloggingsinformasjon.
- Enhver databasefeil → avviser forespørselen (sikkert som standard).

Håndheving av klient-API-nøkler bruker `isRequireApiKeyEnabled()` i `src/shared/utils/featureFlags.ts`, ikke direkte avlesning av `process.env.REQUIRE_API_KEY`. Dette er viktig for utrullede instanser: Når `REQUIRE_API_KEY` endres i Dashboard → Feature Flags, lagres en databaseoverstyring som umiddelbart påvirker `/v1/*`, `/v1beta/*`, `/models`, `/responses`, `/chat/completions`, `/codex/*` og andre autentiseringskontroller for klient-API-er som bruker denne hjelpefunksjonen. Hvis funksjonsflagglageret ikke kan leses, avvises klient-API-autentisering som standard, og en nøkkel kreves.

## Inkompatibel endring — v3.8.0

Endepunktene `/api/v1/agents/tasks/*` og `/api/resilience/model-cooldowns` **krever nå administrasjonsautentisering** (commit `588a0333`). Klienter som tidligere sendte en vanlig API-nøkkel uten tilgangsområdet `manage`, mottar `403`. Migrering: Gi enten nøkkelen tilgangsområdet `manage` i API Keys-kontrollpanelet, eller bruk en innlogget kontrollpaneløkt.

## Atferdsendring — v3.8.2

`/api/mcp/*` (den eksterne MCP-serveren) er fortsatt LOCAL_ONLY som standard, men godtar nå forespørsler som ikke kommer fra tilbakekoblingsgrensesnittet, når `Authorization: Bearer <api-key>`-headeren har tilgangsområdet `manage`. Unntaket aktiveres eksplisitt per bane via `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` i `src/server/authz/routeGuard.ts`; det beslektede LOCAL_ONLY-prefikset `/api/cli-tools/runtime/*` kan med hensikt IKKE omgås fordi det kan starte vilkårlige underprosesser. Anonyme forespørsler til `/api/mcp/*` som ikke kommer fra tilbakekoblingsgrensesnittet, returnerer fortsatt `403 LOCAL_ONLY` — standarden for alle nye LOCAL_ONLY-baner er fortsatt streng tilbakekobling. Se [Nivåer for rutebeskyttelse](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out).

## Testing

- Enhetstester: `tests/unit/authz/` — `classify.test.ts`, `pipeline.test.ts`, `client-api-policy.test.ts`, `management-policy.test.ts`, `public-policy.test.ts`.
- Offentlig tillatelsesliste: `tests/unit/public-api-routes.test.ts`.
- Kjør målrettet: `node --import tsx/esm --test tests/unit/authz/classify.test.ts`.

## Feilsøking

Pipelinen merker alltid svar med:

```
x-request-id:               <korrelasjons-ID, gjengitt i feilmeldinger>
x-omniroute-route-class:    PUBLIC | CLIENT_API | MANAGEMENT
```

For autentiserte forespørsler inkluderer forespørselshodene oppstrøms (på handlersiden) også:

```
x-omniroute-auth-kind:      client_api_key | dashboard_session | management_key | anonymous
x-omniroute-auth-id:        key_<last-4> | "dashboard" | "anonymous"
x-omniroute-auth-label:     (valgfri)
x-omniroute-auth-scopes:    kommadelt liste
```

Bruk `assertAuth(req, expectedClass)` i handlere — den utløser `AuthzAssertionError` med koden `AUTHZ_NOT_INITIALIZED` hvis mellomvaren ble omgått (nyttig for å oppdage konfigurasjonsregresjoner i tester).

## Se også

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — autentiseringsmarkør per endepunkt
- [COMPLIANCE.md](../security/COMPLIANCE.md) — revisjonslogg for autentiseringshendelser
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md) — detaljer om håndheving av MCP-omfang
- Kilde: `src/server/authz/`, `src/lib/api/requireManagementAuth.ts`
