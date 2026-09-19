# Authorization Guide (Slovenščina)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/AUTHZ_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/AUTHZ_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/AUTHZ_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/AUTHZ_GUIDE.md)

---

> **Vir resnice:** `src/server/authz/`, `src/shared/constants/publicApiRoutes.ts`, `src/lib/api/requireManagementAuth.ts`, `src/shared/utils/apiAuth.ts`
> **Nazadnje posodobljeno:** 2026-06-28 — v3.8.40

OmniRoute uporablja avtorizacijski cevovod, ki upošteva poti in preverja vsako zahtevo API. Razvrščanje je **deterministično** in **privzeto zavrača dostop** — vse, česar ni mogoče razvrstiti, je obravnavano kot `MANAGEMENT` ter zahteva sejo ali žeton z upravljavskimi pravicami. Ta stran pojasnjuje model za inženirje, ki vzdržujejo poti ali načrtujejo nove končne točke.

![Cevovod AuthZ (3 razredi poti + vrednotenje pravilnikov)](../diagrams/exported/authz-pipeline.svg)

> Vir: [diagrams/authz-pipeline.mmd](../diagrams/authz-pipeline.mmd)

## Dva načina preverjanja pristnosti

### 1. Ključ API (Bearer)

Uporablja se za odjemalske API-je, združljive z OpenAI/Anthropic/Gemini, in za nekaj upravljavskih poti, kadar ima ključ obseg `manage`.

```
Authorization: Bearer <api-key>
```

Preverjanje izvajata `isValidApiKey()` / `extractApiKey()` v `src/sse/services/auth.ts`, ki sta ponovno izvožena prek `src/shared/utils/apiAuth.ts`. Preverjevalnik sprejema tudi okoljski spremenljivki `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` kot trajna ključa za neposredno posredovanje (težava #1350).

### 2. Seja nadzorne plošče (piškotek auth_token)

Za strani nadzorne plošče in skrbniške operacije.

```
Cookie: auth_token=<JWT signed with JWT_SECRET>
```

Piškotek je seja samo, kadar je JWT uspešno preverjen **in** vsebuje `authenticated: true`
(`src/shared/utils/dashboardSessionToken.ts` → `verifyDashboardSessionToken`). Vsak
porabnik piškotka (varovalo poti, osveževanje avtorizacijskega cevovoda, rokovanje WebSocket, strežnik za
žive podatke, `/api/settings/require-login`, `/api/auth/status`) uporablja to pomožno funkcijo.
Obstajajo tudi drugi JWT-ji, podpisani z `JWT_SECRET` — neposredno posredovanje Cursor CLI za imetnike
ključev ustvarja žetone z `iss "omniroute" / aud "cursor-cli"` — in ti nikoli niso obravnavani kot seje
(#13298).

Preverjanje izvaja `isDashboardSessionAuthenticated()` v `src/shared/utils/apiAuth.ts`. Cevovod samodejno osveži JWT, ko je do izteka njegove 30-dnevne življenjske dobe manj kot 7 dni.

Nekatere upravljavske poti sprejemajo **kateri koli** način: piškotek ALI `Bearer <key>`, kadar ima ključ API obseg `manage` (ali `admin`). To omogoča potek dela »nastavljivo prek klicev API«, ki je bil dodan v v3.8.

#### Izbirna prijavna pregrada OIDC (#6973)

Skrbniška prijava v nadzorno ploščo poleg privzete prijave z geslom podpira tudi
**izbirni** potek OIDC (OpenID Connect) — prijava z geslom ni nikoli odstranjena,
temveč le dopolnjena:

- Onemogočeno je, razen če velja `settings.oidcEnabled === true` **in** so konfigurirani
  `oidcIssuer` / `oidcClientId` / `oidcClientSecret` (Nastavitve → Preverjanje pristnosti).
  V nasprotnem primeru `GET /api/auth/oidc/login` vrne `400`.
- `GET /api/auth/oidc/login` odkrije `authorization_endpoint` iz
  izdajateljevega `/.well-known/openid-configuration` (rezervno uporabi
  `<issuer>/authorize`), sestavi preusmeritveni URI iz dohodne zahteve
  (ob upoštevanju `x-forwarded-proto`) in preusmeri k ponudniku IdP z naključnim `state`,
  shranjenim v piškotku `oidc_state` z oznako `httpOnly`.
- `GET /api/auth/oidc/callback` preveri `state`, zamenja avtorizacijsko
  kodo in preveri podpis žetona ID prek izdajateljevega JWKS
  (`createRemoteJWKSet` iz `jose`, predpomnjen glede na URI JWKS) s preverjanji `issuer`/`audience`.
  Izbirni seznam dovoljenih vrednosti `oidcAllowedSubjects` se ujema z zahtevkom
  `sub` ali zahtevkom `email` žetona — zahtevek za e-poštni naslov se upošteva samo, kadar
  velja `email_verified === true`, zato nepreverjen e-poštni naslov pri ponudniku IdP nikoli ne more
  prestati prijavne pregrade.
- Ob uspehu ustvari **popolnoma enak** 30-dnevni JWT `auth_token`, kot ga izda prijava
  z geslom (`src/app/api/auth/login/route.ts`), zato ostane preostali del
  cevovoda seje nadzorne plošče (samodejno osveževanje, zastavice piškotkov) nespremenjen —
  OIDC nadomesti samo način ustvarjanja piškotka, ne pa pravic, ki jih ta podeljuje.

## Razredi poti

`src/server/authz/types.ts` določa tri razrede; vsaka pot, ki je ni mogoče deterministično razvrstiti, privzeto spada v `MANAGEMENT`.

| Razred       | Opis                                                                                                                                                         | Zahtevana avtentikacija                                                       |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------- |
| `PUBLIC`     | Izrecno varne poti — prijava, odjava, stanje, inicializacija, preverjanje zdravja, začetna nastavitev uvajanja.                                              | Brez                                                                          |
| `CLIENT_API` | Končne točke za streženje modelov — `/api/v1/*`, `/api/v1beta/*` ter vzdevki `/v1/*`, `/v1beta/*`, `/chat/completions`, `/responses`, `/models`, `/codex/*`. | Ključ Bearer, ko je veljavna funkcijska zastavica `REQUIRE_API_KEY` omogočena |
| `MANAGEMENT` | Strani nadzorne plošče, nastavitve, ponudniki, ključi ter skrbniške in diagnostične končne točke.                                                            | Seja nadzorne plošče ALI Bearer z obsegom `manage`                            |

## Cevovod

```
Dohodna zahteva → src/proxy.ts
  → runAuthzPipeline() v src/server/authz/pipeline.ts
    1. Odstrani zaupanja vredne notranje glave (x-omniroute-auth-*, x-omniroute-route-class)
    2. Ustvari ID zahteve in razvrsti pot prek classifyRoute()
    3. Če pathname == "/" → preusmeri na /dashboard
    4. Če poteka zaustavljanje (nadzorovana zaustavitev) in /api/* → 503
    5. Če metoda ni GET in /api/* → zaščita checkBodySize()
    6. Če OPTIONS → predhodna zahteva CORS 204
    7. Če options.enforce == false → posreduje naprej z glavami razreda poti
    8. Sicer: POLICIES[routeClass].evaluate(ctx)
       - dovoli  → doda x-omniroute-auth-{kind,id,label,scopes} → NextResponse.next()
       - zavrni → napaka JSON s correlation_id (strani nadzorne plošče → 302 /login)
```

Zaupanja vredne notranje glave (določene v `src/server/authz/headers.ts`) so **odstranjene iz dohodnih zahtev** pred razvrstitvijo — odjemalci ne morejo vnaprej nastaviti `x-omniroute-auth-*`, da bi se izdajali za subjekt.

### Pogodbe pravilnikov

Vsak razred poti ima pravilnik v `src/server/authz/policies/`:

- **`publicPolicy`** (`policies/public.ts`) — vedno vrne `allow({ kind: "anonymous", id: "anonymous" })`.
- **`clientApiPolicy`** (`policies/clientApi.ts`) — pridobi Bearer in ga preveri prek `validateApiKey()`. Na anonimni dostop preide le, ko je veljavna funkcijska zastavica `REQUIRE_API_KEY` onemogočena. Veljavna zastavica se razreši prek `isRequireApiKeyEnabled()` (`preglasitev funkcijske zastavice v podatkovni zbirki > process.env.REQUIRE_API_KEY > privzeta vrednost`), zato funkcijske zastavice nadzorne plošče in okoljske spremenljivke dosledno urejajo `/api/v1/*`, `/api/v1beta/*` ter vzdevke; napake razreševalnika povzročijo varno zavrnitev dostopa. Na poteh odjemalskega API-ja dovoljuje zahteve s sejo nadzorne plošče (vključno z `/api/v1/models`, ki jo uporablja katalog modelov nadzorne plošče).
- **`managementPolicy`** (`policies/management.ts`) — sprejme sejo nadzorne plošče, notranje zahteve za sinhronizacijo modelov (ujemanje z `/api/providers/[name]/(sync-models|models)`) ali preverjanje v celoti preskoči, če `isAuthRequired()` vrne false. Ko je žeton Bearer prisoten, vendar neveljaven, vrne 403 (`AUTH_001`), sicer pa 401. Pred katero koli vejo avtentikacije uveljavi tudi ravni varovanja poti (LOCAL_ONLY / ALWAYS_PROTECTED) — glejte [Ravni varovanja poti](../security/ROUTE_GUARD_TIERS.md). Do poti LOCAL_ONLY v `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` (trenutno: `/api/mcp/`) je mogoče dostopati iz naslovov, ki niso povratne zanke, kadar ima ključ Bearer obseg `manage`; vse druge poti LOCAL_ONLY ostanejo strogo omejene na povratno zanko ne glede na obseg.

Uspešen pravilnik vrne `AuthSubject` s `kind ∈ { client_api_key, dashboard_session, management_key, anonymous }`. Nadaljnji obdelovalniki ga lahko preberejo prek `assertAuth(request, "CLIENT_API")` v `src/server/authz/assertAuth.ts`, namesto da bi znova izvajali logiko avtentikacije.

## Seznam javnih poti

`src/shared/constants/publicApiRoutes.ts` je izrecni seznam dovoljenih poti:

Seznam je razdeljen glede na **obliko**, ta razdelitev pa je varnostno ključna (GHSA-74g9-q8f6-793h): predpona se primerja z `startsWith()`, zato se ujema tudi z vsako sosednjo potjo, ki ima enake začetne znake.
Predpona `/api/usage/om-usage` je označila `/api/usage/om-usage<anything>` kot JAVNO, Next pa to razreši v `/api/usage/[connectionId]` — obravnavalnik brez lastnega preverjanja pristnosti.

```ts
// Pristna poddrevesa. Vsak vnos se MORA končati z "/" (kar preverja test enote).
PUBLIC_API_ROUTE_PREFIXES = [
  "/api/auth/oidc/",
  "/api/v1/", // pri razvrščanju se obravnava kot CLIENT_API, ne kot javna pot »brez preverjanja pristnosti«
  "/api/oauth/",
  "/api/codex/connect/",
  "/api/telegram/",
  "/api/cursor-cli/",
];

// Posamezne poti, ki se ujemajo NATANČNO (s končno poševnico ali brez nje).
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

// Posamezne poti samo za branje, za katere velja tudi omilitev izvora CORS.
PUBLIC_READONLY_CORS_API_ROUTES = [
  "/api/health/ping",
  "/api/monitoring/health",
  "/api/settings/require-login",
];

// Posamezna pot samo za branje BREZ omilitve CORS.
PUBLIC_READONLY_API_ROUTES_EXACT = new Set(["/api/health"]);

PUBLIC_READONLY_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
```

Poti samo za branje so javne **samo** za varne metode. Opomba: `classifyRoute()` izloči `/api/v1/*` in `/api/v1beta/*` iz privzete razvrstitve PUBLIC — te poti so vedno `CLIENT_API`, zato pravilnik za ključ Bearer še vedno velja.

## Dodajanje nove poti

### Vzorec 1 — Javna končna točka odjemalskega API-ja (preverjanje pristnosti Bearer)

Poti pod `/api/v1/` in `/api/v1beta/` so samodejno razvrščene kot `CLIENT_API`. Vmesna programska oprema uveljavlja preverjanje Bearer; obravnavalnikom poti ga ni treba ponavljati, lahko pa po potrebi preberejo subjekt.

```typescript
// src/app/api/v1/your-route/route.ts
import { NextRequest, NextResponse } from "next/server";
import { assertAuth } from "@/server/authz/assertAuth";

export async function POST(req: NextRequest) {
  const subject = assertAuth(req, "CLIENT_API");
  // subject.kind === "client_api_key" | "anonymous" | "dashboard_session"
  // ... logika obravnavalnika
}
```

### Vzorec 2 — Upravljavska končna točka (seja ali Bearer + manage)

Uporabite `requireManagementAuth()` iz `src/lib/api/requireManagementAuth.ts`:

```typescript
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

export async function POST(request: Request) {
  const rejection = await requireManagementAuth(request);
  if (rejection) return rejection;
  // ... logika obravnavalnika
}
```

`requireManagementAuth()` ob uspehu vrne `null`, ob napaki pa JSON `Response`:

- 401 `AUTH_001` "Zahtevano je preverjanje pristnosti" — poverilnice sploh niso podane
- 403 — neveljaven Bearer **ali** Bearer je podan, vendar ključ nima obsega `manage` / `admin`

`hasManageScope(scopes)` vrne true za `"manage"` ali `"admin"`.

### Vzorec 3 — Dodajanje na javni seznam dovoljenih poti

Nabor izberite glede na obliko, ne glede na priročnost. Posamezna pot sodi v `PUBLIC_API_ROUTES_EXACT` (ali v `PUBLIC_READONLY_CORS_API_ROUTES`, če je namenjena samo metodi GET); samo pristno poddrevo sodi v `PUBLIC_API_ROUTE_PREFIXES` in se **mora končati z `/`**. Če posamezno pot dodate na seznam predpon, s tem objavite tudi vsako sosednjo pot, ki ima enake začetne znake — vključno s sorodnimi potmi z dinamičnimi segmenti, dodanimi pozneje (GHSA-74g9-q8f6-793h). Posodobite teste enot v `tests/unit/public-api-routes.test.ts`, `tests/unit/authz/public-route-exact-match.test.ts` in `tests/unit/authz/classify.test.ts`.

## Obsegi

Ključi API vsebujejo polje `scopes` (shranjeno kot JSON v `api_keys.scopes`, glejte `src/lib/db/apiKeys.ts`).

### Obseg za upravljanje

- `manage` / `admin` — ključu omogoči dostop do končnih točk upravljalnega API-ja, ko je poslan kot Bearer.

### Obsegi MCP (`src/shared/constants/mcpScopes.ts`)

Vsako orodje MCP prek `MCP_TOOL_SCOPES` zahteva določene obsege. Celoten seznam (`MCP_SCOPE_LIST`):

```
read:health, read:combos, write:combos, read:quota, read:usage,
read:models, execute:completions, execute:search, write:budget,
write:resilience, pricing:write, read:cache, write:cache,
read:compression, write:compression, read:proxies
```

Uveljavljanje obsegov v `open-sse/mcp-server/server.ts` posreduje seznam obsegov vsakega orodja funkciji
`evaluateToolScopes()`, potem ko `resolveCallerScopeContext()` razreši obsege iz podatkov za preverjanje pristnosti MCP,
metapodatkov zahtevka ali `OMNIROUTE_MCP_SCOPES`.

## Preklop zahteve za preverjanje pristnosti

`isAuthRequired()` v `src/shared/utils/apiAuth.ts` določa, ali se za zahtevek uveljavlja **kakršno koli** preverjanje pristnosti:

- `settings.requireLogin === false` → preverjanje pristnosti je globalno onemogočeno.
- Geslo ni nastavljeno **in** ni okoljske spremenljivke `INITIAL_PASSWORD` → zagonski način dovoljuje čarovnika za začetno nastavitev in zahtevke prek povratne zanke, vendar zahtevki iz izpostavljenega omrežja še vedno potrebujejo poverilnice.
- Vsaka napaka zbirke podatkov → dostop se zavrne (privzeto varno).

Uveljavljanje ključev API odjemalca uporablja `isRequireApiKeyEnabled()` v `src/shared/utils/featureFlags.ts`, ne pa neposrednega branja `process.env.REQUIRE_API_KEY`. To je pomembno za nameščene primerke: preklop možnosti `REQUIRE_API_KEY` v Dashboard → Feature Flags shrani preglasitev v zbirko podatkov in takoj vpliva na `/v1/*`, `/v1beta/*`, `/models`, `/responses`, `/chat/completions`, `/codex/*` ter druga preverjanja pristnosti odjemalskega API-ja, ki uporabljajo to pomožno funkcijo. Če shrambe zastavic funkcij ni mogoče prebrati, preverjanje pristnosti odjemalskega API-ja privzeto zavrne dostop in zahteva ključ.

## Nezdružljiva sprememba — v3.8.0

Končne točke `/api/v1/agents/tasks/*` in `/api/resilience/model-cooldowns` **zdaj zahtevajo upravljalsko preverjanje pristnosti** (potrditev `588a0333`). Odjemalci, ki so prej pošiljali običajen ključ API brez obsega `manage`, prejmejo `403`. Migracija: ključu bodisi dodelite obseg `manage` na nadzorni plošči API Keys bodisi uporabite prijavljeno sejo nadzorne plošče.

## Sprememba vedenja — v3.8.2

`/api/mcp/*` (oddaljeni strežnik MCP) je privzeto še vedno LOCAL_ONLY, vendar zdaj sprejema zahtevke, ki ne izvirajo iz povratne zanke, kadar glava `Authorization: Bearer <api-key>` vsebuje obseg `manage`. Izjema je za vsako pot izrecno nadzorovana prek `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` v `src/server/authz/routeGuard.ts`; sorodne predpone LOCAL_ONLY `/api/cli-tools/runtime/*` namenoma ni mogoče zaobiti, ker lahko zažene poljubne podprocese. Anonimni zahtevki za `/api/mcp/*`, ki ne izvirajo iz povratne zanke, še naprej vračajo `403 LOCAL_ONLY` — privzeto pravilo za vsako novo pot LOCAL_ONLY ostaja strogo omejeno na povratno zanko. Glejte [Ravni varovanja poti](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out).

## Preizkušanje

- Preizkusi enot: `tests/unit/authz/` — `classify.test.ts`, `pipeline.test.ts`, `client-api-policy.test.ts`, `management-policy.test.ts`, `public-policy.test.ts`.
- Javni seznam dovoljenih poti: `tests/unit/public-api-routes.test.ts`.
- Zagon izbranega preizkusa: `node --import tsx/esm --test tests/unit/authz/classify.test.ts`.

## Odpravljanje napak

Cevovod odzivom vedno doda naslednje glave:

```
x-request-id:               <ID korelacije, ponovljen v telesih napak>
x-omniroute-route-class:    PUBLIC | CLIENT_API | MANAGEMENT
```

Pri overjenih zahtevah glave zahteve v zalednem sistemu (na strani obdelovalnika) vključujejo tudi:

```
x-omniroute-auth-kind:      client_api_key | dashboard_session | management_key | anonymous
x-omniroute-auth-id:        key_<zadnje 4> | "dashboard" | "anonymous"
x-omniroute-auth-label:     (neobvezno)
x-omniroute-auth-scopes:    seznam, ločen z vejicami
```

Znotraj obdelovalnikov uporabite `assertAuth(req, expectedClass)` — ta sproži izjemo `AuthzAssertionError` s kodo `AUTHZ_NOT_INITIALIZED`, če je bila vmesna programska oprema zaobidena (uporabno za odkrivanje regresij konfiguracije v testih).

## Glejte tudi

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — oznaka preverjanja pristnosti za vsako končno točko
- [COMPLIANCE.md](../security/COMPLIANCE.md) — revizijski dnevnik dogodkov preverjanja pristnosti
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md) — podrobnosti uveljavljanja obsegov MCP
- Izvorna koda: `src/server/authz/`, `src/lib/api/requireManagementAuth.ts`
