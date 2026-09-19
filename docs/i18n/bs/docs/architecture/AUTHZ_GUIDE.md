# AUTHZ_GUIDE (Bosanski)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/AUTHZ_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/AUTHZ_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/AUTHZ_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/AUTHZ_GUIDE.md)

---

# Vodič za autorizaciju

> **Izvor istine:** `src/server/authz/`, `src/shared/constants/publicApiRoutes.ts`, `src/lib/api/requireManagementAuth.ts`, `src/shared/utils/apiAuth.ts`
> **Posljednje ažurirano:** 2026-06-28 — v3.8.40

OmniRoute posjeduje cjevovod za autorizaciju svjestan ruta koji kontroliše svaki API zahtjev. Klasifikacija je **deterministička** i **fail-closed** — sve što se ne može klasifikovati završava kao `MANAGEMENT` i zahtijeva sesiju ili token upravljačkog nivoa. Ova stranica objašnjava model za inženjere koji održavaju rute ili dizajniraju nove krajnje tačke.

![AuthZ cjevovod (3 klase ruta + evaluacija politika)](../diagrams/exported/authz-pipeline.svg)

> Izvor: [diagrams/authz-pipeline.mmd](../diagrams/authz-pipeline.mmd)

## Dva načina autorizacije

### 1. API ključ (Bearer)

Koristi se za klijentske API-je kompatibilne sa OpenAI/Anthropic/Gemini i nekoliko upravljačkih ruta kada ključ ima `manage` opseg.

```
Authorization: Bearer <api-key>
```

Validirano pomoću `isValidApiKey()` / `extractApiKey()` u `src/sse/services/auth.ts` i ponovo izvezeno kroz `src/shared/utils/apiAuth.ts`. Validator takođe prihvata `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` varijable okruženja kao trajne prolazne ključeve (issue #1350).

### 2. Sesija kontrolne table (auth_token kolačić)

Za stranice kontrolne table i administratorske operacije.

```
Cookie: auth_token=<JWT signed with JWT_SECRET>
```

Kolačić je sesija samo kada se JWT verifikuje **i** nosi `authenticated: true` (`src/shared/utils/dashboardSessionToken.ts` → `verifyDashboardSessionToken`). Svaki potrošač kolačića (čuvar rute, osvježavanje authz cjevovoda, WebSocket rukovanje, live server, `/api/settings/require-login`, `/api/auth/status`) prolazi kroz tog pomoćnika. Postoje i drugi JWT-ovi potpisani sa `JWT_SECRET` — Cursor CLI passthrough kreira `iss "omniroute" / aud "cursor-cli"` tokene za vlasnike ključeva — i oni nikada nisu sesije (#13298).

Verifikovano pomoću `isDashboardSessionAuthenticated()` u `src/shared/utils/apiAuth.ts`. Cjevovod automatski osvježava JWT kada mu ostane manje od 7 dana do isteka njegovog 30-dnevnog životnog vijeka.

Neke upravljačke rute prihvataju **bilo koji** način: kolačić ILI `Bearer <key>` kada API ključ ima `manage` (ili `admin`) opseg. Ovo omogućava radni tok "konfigurabilno putem API poziva" dodan u v3.8.

#### Opciona OIDC kapija za prijavu (#6973)

Administratorska prijava na kontrolnu tablu takođe podržava **opt-in** OIDC (OpenID Connect) tok uz podrazumevanu prijavu lozinkom — prijava lozinkom se nikada ne uklanja, samo dopunjuje:

- Onemogućeno osim ako `settings.oidcEnabled === true` **i** `oidcIssuer` / `oidcClientId` / `oidcClientSecret` nisu svi konfigurisani (Postavke → Autorizacija). `GET /api/auth/oidc/login` u suprotnom vraća `400`.
- `GET /api/auth/oidc/login` otkriva `authorization_endpoint` iz izdavačevog `/.well-known/openid-configuration` (vraća se na `<issuer>/authorize`), gradi URI za preusmjeravanje iz dolaznog zahtjeva (`x-forwarded-proto`-svjestan) i preusmjerava na IdP sa nasumičnim `state` pohranjenim u `httpOnly` `oidc_state` kolačiću.
- `GET /api/auth/oidc/callback` validira `state`, razmjenjuje autorizacioni kod i verifikuje potpis ID tokena putem izdavačevog JWKS (`jose`-ov `createRemoteJWKSet`, keširan po JWKS URI) sa `issuer`/`audience` provjerama. Opciona `oidcAllowedSubjects` lista dozvoljenih podudara se sa `sub` zahtjevom tokena ili njegovim `email` zahtjevom — `email` zahtjev se uvažava samo kada je `email_verified === true`, tako da neprovjerena e-pošta na IdP-u nikada ne može proći kroz kapiju.
- U slučaju uspjeha, kreira **potpuno isti** 30-dnevni `auth_token` JWT koji izdaje prijava lozinkom (`src/app/api/auth/login/route.ts`), tako da ostatak cjevovoda sesije kontrolne table (automatsko osvježavanje, zastavice kolačića) ostaje nepromijenjen — OIDC samo zamjenjuje način na koji se kolačić kreira, a ne ono što on odobrava.

## Klase ruta

`src/server/authz/types.ts` definiše tri klase; svaka ruta koja se ne može deterministički klasifikovati vraća se na `MANAGEMENT`.

| Klasa        | Opis                                                                                                                                                             | Potrebna autorizacija                                                        |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| `PUBLIC`     | Eksplicitno sigurne rute — login, logout, status, init, health, onboarding bootstrap.                                                                            | Nijedna                                                                      |
| `CLIENT_API` | Krajnje tačke za posluživanje modela — `/api/v1/*`, `/api/v1beta/*`, plus aliasi `/v1/*`, `/v1beta/*`, `/chat/completions`, `/responses`, `/models`, `/codex/*`. | Bearer ključ kada je omogućena efektivna feature zastavica `REQUIRE_API_KEY` |
| `MANAGEMENT` | Stranice kontrolne table, postavke, provajderi, ključevi, admin i dijagnostičke krajnje tačke.                                                                   | Sesija kontrolne table ILI Bearer sa `manage` opsegom (scope)                |

## Pipeline

```
Dolazni zahtjev → src/proxy.ts
  → runAuthzPipeline() u src/server/authz/pipeline.ts
    1. Ukloni pouzdana interna zaglavlja (x-omniroute-auth-*, x-omniroute-route-class)
    2. Generiši ID zahtjeva, klasifikuj rutu putem classifyRoute()
    3. Ako je pathname == "/" → preusmjeri na /dashboard
    4. Ako je u toku pražnjenje (graceful shutdown) i /api/* → 503
    5. Ako nije GET /api/* → checkBodySize() zaštita
    6. Ako je OPTIONS → CORS preflight 204
    7. Ako je options.enforce == false → propusti sa route-class zaglavljima
    8. U suprotnom: POLICIES[routeClass].evaluate(ctx)
       - allow  → označi x-omniroute-auth-{kind,id,label,scopes} → NextResponse.next()
       - reject → JSON greška sa correlation_id (stranice kontrolne table → 302 /login)
```

Pouzdana interna zaglavlja (definisana u `src/server/authz/headers.ts`) se **uklanjaju iz dolaznih zahtjeva** prije klasifikacije — klijenti ne mogu unaprijed popuniti `x-omniroute-auth-*` da bi se lažno predstavili kao subjekat.

### Ugovori o politikama

Svaka klasa rute ima politiku u `src/server/authz/policies/`:

- **`publicPolicy`** (`policies/public.ts`) — uvijek vraća `allow({ kind: "anonymous", id: "anonymous" })`.
- **`clientApiPolicy`** (`policies/clientApi.ts`) — izvlači Bearer, validira putem `validateApiKey()`. Prelazi na anonymous samo kada je onemogućena efektivna feature zastavica `REQUIRE_API_KEY`. Efektivna zastavica se razrješava kroz `isRequireApiKeyEnabled()` (`DB feature flag override > process.env.REQUIRE_API_KEY > default`) tako da Dashboard Feature Flags i varijable okruženja konzistentno upravljaju sa `/api/v1/*`, `/api/v1beta/*` i aliasima; neuspjesi razrješivača rezultiraju blokiranjem. Dozvoljava zahtjeve sesije kontrolne table na klijentskim API rutama (uključujući `/api/v1/models`, koje koristi katalog modela kontrolne table).
- **`managementPolicy`** (`policies/management.ts`) — prihvata sesiju kontrolne table, interne zahtjeve za sinhronizaciju modela (podudaranje sa `/api/providers/[name]/(sync-models|models)`), ili u potpunosti preskače ako `isAuthRequired()` vrati false. Vraća 403 (`AUTH_001`) kada je Bearer token prisutan, ali nevažeći, u suprotnom 401. Takođe sprovodi nivoe zaštite ruta (`LOCAL_ONLY` / `ALWAYS_PROTECTED`) prije bilo koje grane autorizacije — pogledajte [Route Guard Tiers](../security/ROUTE_GUARD_TIERS.md). `LOCAL_ONLY` putanjama u `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` (danas: `/api/mcp/`) se može pristupiti sa ne-loopback adresa kada Bearer ključ nosi `manage` opseg; sve ostale `LOCAL_ONLY` putanje ostaju strogo loopback bez obzira na opseg.

Uspješna politika vraća `AuthSubject` sa `kind ∈ { client_api_key, dashboard_session, management_key, anonymous }`. Handleri nizvodno ga mogu pročitati putem `assertAuth(request, "CLIENT_API")` u `src/server/authz/assertAuth.ts` umjesto ponovnog pokretanja logike autorizacije.

## Lista javnih ruta

`src/shared/constants/publicApiRoutes.ts` je eksplicitna lista dozvoljenih ruta:

Lista je podijeljena prema **obliku**, a ta podjela je ključna (GHSA-74g9-q8f6-793h): prefiks se podudara sa `startsWith()`, tako da se podudara i sa svakom susjednom putanjom koja dijeli iste početne znakove.
`/api/usage/om-usage` kao prefiks označava `/api/usage/om-usage<bilo_šta>` kao JAVNO, a Next to razrješava u `/api/usage/[connectionId]` — rukovalac (handler) bez sopstvene autentifikacije.

```ts
// Autentična podstabla. Svaki unos MORA završavati sa "/" (potvrđeno jediničnim testom).
PUBLIC_API_ROUTE_PREFIXES = [
  "/api/auth/oidc/",
  "/api/v1/", // tretira se kao CLIENT_API u klasifikaciji, a ne kao "javno bez autentifikacije"
  "/api/oauth/",
  "/api/codex/connect/",
  "/api/telegram/",
  "/api/cursor-cli/",
];

// Pojedinačne rute, podudaraju se TAČNO (sa ili bez kose crte na kraju).
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

// Pojedinačne rute samo za čitanje koje takođe koriste CORS relaksaciju porijekla.
PUBLIC_READONLY_CORS_API_ROUTES = [
  "/api/health/ping",
  "/api/monitoring/health",
  "/api/settings/require-login",
];

// Pojedinačna ruta samo za čitanje BEZ CORS relaksacije.
PUBLIC_READONLY_API_ROUTES_EXACT = new Set(["/api/health"]);

PUBLIC_READONLY_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
```

Rute samo za čitanje su javne **samo** za sigurne metode. Napomena: `classifyRoute()` isključuje `/api/v1/*` i `/api/v1beta/*` iz PUBLIC "fall-through" mehanizma — one su uvijek `CLIENT_API`, tako da se politika Bearer-ključa i dalje primjenjuje.

## Dodavanje nove rute

### Obrazac 1 — Javni klijentski API krajnja tačka (Bearer-auth)

Rute pod `/api/v1/` i `/api/v1beta/` se automatski klasifikuju kao `CLIENT_API`. Middleware sprovodi Bearer provjeru; rukovaoci ruta ne moraju to ponovo raditi, ali mogu pročitati subjekat ako je korisno.

```typescript
// src/app/api/v1/your-route/route.ts
import { NextRequest, NextResponse } from "next/server";
import { assertAuth } from "@/server/authz/assertAuth";

export async function POST(req: NextRequest) {
  const subject = assertAuth(req, "CLIENT_API");
  // subject.kind === "client_api_key" | "anonymous" | "dashboard_session"
  // ... logika rukovaoca
}
```

### Obrazac 2 — Upravljačka krajnja tačka (sesija ili Bearer + manage)

Koristite `requireManagementAuth()` iz `src/lib/api/requireManagementAuth.ts`:

```typescript
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

export async function POST(request: Request) {
  const rejection = await requireManagementAuth(request);
  if (rejection) return rejection;
  // ... logika rukovaoca
}
```

`requireManagementAuth()` vraća `null` u slučaju uspjeha ili JSON grešku `Response`:

- 401 `AUTH_001` "Authentication required" — uopšte nema akreditiva
- 403 — nevažeći Bearer **ili** Bearer je prisutan, ali ključ nema `manage` / `admin` opseg (scope)

`hasManageScope(scopes)` vraća true za `"manage"` ili `"admin"`.

### Obrazac 3 — Dodavanje na javnu listu dozvoljenih (allowlist)

Odaberite skup prema obliku, a ne prema pogodnosti. Jedna ruta ide u `PUBLIC_API_ROUTES_EXACT` (ili `PUBLIC_READONLY_CORS_API_ROUTES` samo za GET); samo autentično podstablo ide u `PUBLIC_API_ROUTE_PREFIXES`, i ono **mora završavati sa `/`**. Stavljanje pojedinačne rute u listu prefiksa takođe objavljuje svaku susjednu putanju koja dijeli iste početne znakove — uključujući i srodne dinamičke segmente dodate kasnije (GHSA-74g9-q8f6-793h). Ažurirajte jedinične testove u `tests/unit/public-api-routes.test.ts`, `tests/unit/authz/public-route-exact-match.test.ts` i `tests/unit/authz/classify.test.ts`.

## Opsezi

API ključevi sadrže niz `scopes` (pohranjen kao JSON u `api_keys.scopes`, pogledajte `src/lib/db/apiKeys.ts`).

### Upravljački opseg

- `manage` / `admin` — dodjeljuje ključu pristup upravljačkim API krajnjim tačkama kada se šalje kao Bearer.

### MCP opsezi (`src/shared/constants/mcpScopes.ts`)

Svaki MCP alat zahtijeva specifične opsege putem `MCP_TOOL_SCOPES`. Puna lista (`MCP_SCOPE_LIST`):

```
read:health, read:combos, write:combos, read:quota, read:usage,
read:models, execute:completions, execute:search, write:budget,
write:resilience, pricing:write, read:cache, write:cache,
read:compression, write:compression, read:proxies
```

Sprovođenje opsega u `open-sse/mcp-server/server.ts` prosljeđuje listu opsega svakog alata u `evaluateToolScopes()` nakon što `resolveCallerScopeContext()` razriješi opsege iz MCP informacija o autorizaciji, metapodataka zahtjeva ili `OMNIROUTE_MCP_SCOPES`.

## Prekidač za obaveznu autorizaciju

`isAuthRequired()` u `src/shared/utils/apiAuth.ts` odlučuje da li se **bilo kakva** autorizacija sprovodi za zahtjev:

- `settings.requireLogin === false` → autorizacija je globalno onemogućena.
- Nije konfigurirana lozinka **i** nema `INITIAL_PASSWORD` varijable okruženja → bootstrap način rada omogućava čarobnjak za uvođenje (onboarding) i loopback zahtjeve, ali izloženi mrežni zahtjevi i dalje trebaju vjerodajnice.
- Bilo kakva greška baze podataka → blokira pristup u slučaju greške (sigurno po zadanim postavkama).

Sprovođenje klijentskog API ključa koristi `isRequireApiKeyEnabled()` u `src/shared/utils/featureFlags.ts`, a ne direktno čitanje `process.env.REQUIRE_API_KEY`. Ovo je važno za raspoređene instance: prebacivanje `REQUIRE_API_KEY` u Dashboard → Feature Flags pohranjuje nadjačavanje u bazi podataka i odmah utiče na `/v1/*`, `/v1beta/*`, `/models`, `/responses`, `/chat/completions`, `/codex/*` i druge provjere autorizacije klijentskog API-ja koje dijele ovaj pomoćni program. Ako se spremište feature flagova ne može pročitati, autorizacija klijentskog API-ja blokira pristup i zahtijeva ključ.

## Promjena koja prekida kompatibilnost — v3.8.0

Krajnje tačke `/api/v1/agents/tasks/*` i `/api/resilience/model-cooldowns` **sada zahtijevaju upravljačku autorizaciju** (commit `588a0333`). Klijenti koji su prethodno slali normalan API ključ bez `manage` opsega dobijaju `403`. Migracija: ili dodijelite ključu `manage` opseg na kontrolnoj tabli API ključeva, ili koristite prijavljenu sesiju kontrolne table.

## Promjena ponašanja — v3.8.2

`/api/mcp/*` (udaljeni MCP server) je i dalje LOCAL_ONLY po zadanim postavkama, ali sada prihvata non-loopback zahtjeve kada `Authorization: Bearer <api-key>` zaglavlje nosi `manage` opseg. Izuzetak je eksplicitno ograničen po putanji putem `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` u `src/server/authz/routeGuard.ts`; sestrinski LOCAL_ONLY prefiks `/api/cli-tools/runtime/*` namjerno NIJE moguće zaobići jer može pokrenuti proizvoljne podprocese. Anonimni zahtjevi prema `/api/mcp/*` sa non-loopback adresa i dalje vraćaju `403 LOCAL_ONLY` — zadana vrijednost za bilo koju novu LOCAL_ONLY putanju ostaje strogi loopback. Pogledajte [Route Guard Tiers](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out).

## Testiranje

- Jedinični testovi: `tests/unit/authz/` — `classify.test.ts`, `pipeline.test.ts`, `client-api-policy.test.ts`, `management-policy.test.ts`, `public-policy.test.ts`.
- Javna lista dozvoljenih (allowlist): `tests/unit/public-api-routes.test.ts`.
- Pokretanje fokusiranog testa: `node --import tsx/esm --test tests/unit/authz/classify.test.ts`.

## Otklanjanje grešaka

Pipeline uvijek označava odgovore sa:

```
x-request-id:               <id korelacije, ponovljen u tijelima grešaka>
x-omniroute-route-class:    PUBLIC | CLIENT_API | MANAGEMENT
```

Za autentifikovane zahtjeve, zaglavlja zahtjeva na strani upstream-a (strana handlera) takođe uključuju:

```
x-omniroute-auth-kind:      client_api_key | dashboard_session | management_key | anonymous
x-omniroute-auth-id:        key_<last-4> | "dashboard" | "anonymous"
x-omniroute-auth-label:     (opciono)
x-omniroute-auth-scopes:    lista razdvojena zarezima
```

Koristite `assertAuth(req, expectedClass)` unutar handlera — on izbacuje `AuthzAssertionError` sa kodom `AUTHZ_NOT_INITIALIZED` ako je middleware zaobiđen (korisno za hvatanje regresija konfiguracije u testovima).

## Vidi takođe

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — auth marker po endpointu
- [COMPLIANCE.md](../security/COMPLIANCE.md) — audit log za auth događaje
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md) — detalji o primjeni MCP opsega
- Izvor: `src/server/authz/`, `src/lib/api/requireManagementAuth.ts`
