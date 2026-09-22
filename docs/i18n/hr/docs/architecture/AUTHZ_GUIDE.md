# Authorization Guide (Hrvatski)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/AUTHZ_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/AUTHZ_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/AUTHZ_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/AUTHZ_GUIDE.md)

---

> **Izvor istine:** `src/server/authz/`, `src/shared/constants/publicApiRoutes.ts`, `src/lib/api/requireManagementAuth.ts`, `src/shared/utils/apiAuth.ts`
> **Posljednje ažuriranje:** 2026-06-28 — v3.8.40

OmniRoute ima autorizacijski cjevovod koji uzima u obzir rute i kontrolira svaki API zahtjev. Klasifikacija je **deterministička** i **zatvorena u slučaju pogreške** — sve što se ne može klasificirati završava kao `MANAGEMENT` i zahtijeva sesiju ili token s ovlastima za upravljanje. Ova stranica objašnjava model inženjerima koji održavaju rute ili dizajniraju nove krajnje točke.

![Autorizacijski cjevovod (3 klase ruta + evaluacija pravila)](../diagrams/exported/authz-pipeline.svg)

> Izvor: [diagrams/authz-pipeline.mmd](../diagrams/authz-pipeline.mmd)

## Dva načina autentifikacije

### 1. API ključ (Bearer)

Upotrebljava se za klijentske API-je kompatibilne s OpenAI/Anthropic/Gemini te za nekoliko ruta za upravljanje kada ključ ima opseg `manage`.

```
Authorization: Bearer <api-key>
```

Provjerava se funkcijama `isValidApiKey()` / `extractApiKey()` u `src/sse/services/auth.ts`, koje se ponovno izvoze putem `src/shared/utils/apiAuth.ts`. Validator također prihvaća varijable okruženja `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` kao trajne ključeve za izravno prosljeđivanje (problem #1350).

### 2. Sesija nadzorne ploče (kolačić auth_token)

Za stranice nadzorne ploče i administratorske operacije.

```
Cookie: auth_token=<JWT potpisan s JWT_SECRET>
```

Kolačić predstavlja sesiju samo kada je JWT uspješno provjeren **i** sadrži `authenticated: true`
(`src/shared/utils/dashboardSessionToken.ts` → `verifyDashboardSessionToken`). Svaki
potrošač kolačića (čuvar rute, osvježavanje autorizacijskog cjevovoda, WebSocket rukovanje, poslužitelj
uživo, `/api/settings/require-login`, `/api/auth/status`) prolazi kroz taj pomoćni program.
Postoje i drugi JWT-ovi potpisani s `JWT_SECRET` — izravno prosljeđivanje za Cursor CLI izdaje
tokene `iss "omniroute" / aud "cursor-cli"` vlasnicima ključeva — i oni nikada nisu sesije
(#13298).

Provjerava se funkcijom `isDashboardSessionAuthenticated()` u `src/shared/utils/apiAuth.ts`. Cjevovod automatski osvježava JWT kada mu je preostalo manje od 7 dana od ukupnog trajanja od 30 dana.

Neke rute za upravljanje prihvaćaju **bilo koji** način: kolačić ILI `Bearer <key>` kada API ključ ima opseg `manage` (ili `admin`). To omogućuje tijek rada „konfigurabilno putem API poziva” dodan u v3.8.

#### Neobavezna OIDC prijava (#6973)

Administratorska prijava na nadzornu ploču također podržava **opcijski** tijek OIDC-a (OpenID Connect)
uz zadanu prijavu lozinkom — prijava lozinkom nikada se ne uklanja, već se samo
nadopunjuje:

- Onemogućeno je osim ako vrijedi `settings.oidcEnabled === true` **i** ako su
  `oidcIssuer` / `oidcClientId` / `oidcClientSecret` svi konfigurirani (Postavke → Autentifikacija).
  U suprotnom `GET /api/auth/oidc/login` vraća `400`.
- `GET /api/auth/oidc/login` otkriva `authorization_endpoint` iz
  izdavateljeve konfiguracije `/.well-known/openid-configuration` (uz pričuvnu vrijednost
  `<issuer>/authorize`), izrađuje URI za preusmjeravanje iz dolaznog zahtjeva
  (uzimajući u obzir `x-forwarded-proto`) i preusmjerava na IdP s nasumičnim `state`
  pohranjenim u `httpOnly` kolačiću `oidc_state`.
- `GET /api/auth/oidc/callback` provjerava `state`, razmjenjuje autorizacijski
  kôd i provjerava potpis ID tokena putem izdavateljeva JWKS-a
  (`createRemoteJWKSet` iz paketa `jose`, predmemoriran po URI-ju JWKS-a), uz provjere
  `issuer`/`audience`. Neobavezan popis dopuštenih vrijednosti `oidcAllowedSubjects` uspoređuje se s
  tvrdnjom `sub` ili tvrdnjom `email` tokena — tvrdnja e-pošte uzima se u obzir samo kada je
  `email_verified === true`, pa neprovjerena adresa e-pošte kod IdP-a nikada ne može proći
  provjeru.
- Nakon uspješne provjere izdaje se **potpuno isti** 30-dnevni JWT `auth_token` koji izdaje prijava
  lozinkom (`src/app/api/auth/login/route.ts`), tako da ostatak
  cjevovoda sesije nadzorne ploče (automatsko osvježavanje, zastavice kolačića) ostaje nepromijenjen —
  OIDC mijenja samo način izdavanja kolačića, a ne ovlasti koje on daje.

## Klase ruta

`src/server/authz/types.ts` definira tri klase; svaka ruta koju nije moguće deterministički klasificirati zadano se svrstava u `MANAGEMENT`.

| Klasa        | Opis                                                                                                                                                               | Potrebna autentikacija                                              |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------- |
| `PUBLIC`     | Izričito sigurne rute — prijava, odjava, status, inicijalizacija, provjera stanja, početno postavljanje.                                                           | Nije potrebna                                                       |
| `CLIENT_API` | Krajnje točke za posluživanje modela — `/api/v1/*`, `/api/v1beta/*`, uz pseudonime `/v1/*`, `/v1beta/*`, `/chat/completions`, `/responses`, `/models`, `/codex/*`. | Bearer ključ kada je efektivna značajka `REQUIRE_API_KEY` omogućena |
| `MANAGEMENT` | Stranice nadzorne ploče, postavke, pružatelji usluga, ključevi te administratorske i dijagnostičke krajnje točke.                                                  | Sesija nadzorne ploče ILI Bearer s opsegom `manage`                 |

## Cjevovod

```
Dolazni zahtjev → src/proxy.ts
  → runAuthzPipeline() u src/server/authz/pipeline.ts
    1. Ukloni pouzdana interna zaglavlja (x-omniroute-auth-*, x-omniroute-route-class)
    2. Generiraj ID zahtjeva, klasificiraj rutu putem classifyRoute()
    3. Ako je pathname == "/" → preusmjeri na /dashboard
    4. Ako je u tijeku pražnjenje (kontrolirano gašenje) i ruta je /api/* → 503
    5. Ako metoda nije GET i ruta je /api/* → primijeni zaštitu checkBodySize()
    6. Ako je metoda OPTIONS → CORS predzahtjev 204
    7. Ako je options.enforce == false → proslijedi sa zaglavljima klase rute
    8. U suprotnom: POLICIES[routeClass].evaluate(ctx)
       - dopusti  → postavi x-omniroute-auth-{kind,id,label,scopes} → NextResponse.next()
       - odbij → JSON pogreška s correlation_id (stranice nadzorne ploče → 302 /login)
```

Pouzdana interna zaglavlja (definirana u `src/server/authz/headers.ts`) **uklanjaju se iz dolaznih zahtjeva** prije klasifikacije — klijenti ne mogu unaprijed postaviti `x-omniroute-auth-*` kako bi se lažno predstavili kao subjekt.

### Ugovori pravila

Svaka klasa rute ima pravilo u `src/server/authz/policies/`:

- **`publicPolicy`** (`policies/public.ts`) — uvijek vraća `allow({ kind: "anonymous", id: "anonymous" })`.
- **`clientApiPolicy`** (`policies/clientApi.ts`) — izdvaja Bearer token i provjerava ga putem `validateApiKey()`. Prelazi na anonimni pristup samo kada je efektivna značajka `REQUIRE_API_KEY` onemogućena. Efektivna vrijednost određuje se putem `isRequireApiKeyEnabled()` (`nadjačavanje značajkom iz baze podataka > process.env.REQUIRE_API_KEY > zadana vrijednost`), tako da značajke nadzorne ploče i varijable okruženja dosljedno upravljaju rutama `/api/v1/*`, `/api/v1beta/*` i pseudonimima; u slučaju pogreške određivanja pristup se odbija. Dopušta zahtjeve sa sesijom nadzorne ploče na klijentskim API rutama (uključujući `/api/v1/models`, koju koristi katalog modela nadzorne ploče).
- **`managementPolicy`** (`policies/management.ts`) — prihvaća sesiju nadzorne ploče, interne zahtjeve za sinkronizaciju modela (koji odgovaraju obrascu `/api/providers/[name]/(sync-models|models)`) ili u potpunosti preskače provjeru ako `isAuthRequired()` vrati false. Vraća 403 (`AUTH_001`) kada je Bearer token prisutan, ali nije valjan, a inače 401. Također provodi razine zaštite ruta (LOCAL_ONLY / ALWAYS_PROTECTED) prije bilo koje autentikacijske grane — pogledajte [Razine zaštite ruta](../security/ROUTE_GUARD_TIERS.md). Putanjama LOCAL_ONLY u `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` (trenutačno: `/api/mcp/`) može se pristupiti izvan lokalnog sučelja kada Bearer ključ ima opseg `manage`; sve ostale putanje LOCAL_ONLY ostaju strogo ograničene na lokalno sučelje bez obzira na opseg.

Uspješno pravilo vraća `AuthSubject` s `kind ∈ { client_api_key, dashboard_session, management_key, anonymous }`. Daljnji rukovatelji mogu ga dohvatiti putem `assertAuth(request, "CLIENT_API")` u `src/server/authz/assertAuth.ts` umjesto ponovnog izvođenja autentikacijske logike.

## Popis javnih ruta

`src/shared/constants/publicApiRoutes.ts` izričit je popis dopuštenih ruta:

Popis je podijeljen prema **obliku**, a ta je podjela ključna (GHSA-74g9-q8f6-793h): prefiks se
uspoređuje pomoću `startsWith()`, pa se podudara i sa svakom susjednom putanjom koja dijeli njegove početne znakove.
Prefiks `/api/usage/om-usage` označio je `/api/usage/om-usage<anything>` kao JAVAN, a Next to razrješava
u `/api/usage/[connectionId]` — rukovatelj bez vlastite autentifikacije.

```ts
// Stvarna podstabla. Svaki unos MORA završavati znakom "/" (što provjerava jedinični test).
PUBLIC_API_ROUTE_PREFIXES = [
  "/api/auth/oidc/",
  "/api/v1/", // u classify se tretira kao CLIENT_API, a ne kao javna ruta "bez autentifikacije"
  "/api/oauth/",
  "/api/codex/connect/",
  "/api/telegram/",
  "/api/cursor-cli/",
];

// Pojedinačne rute koje se podudaraju TOČNO (sa završnom kosom crtom ili bez nje).
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

// Pojedinačne rute samo za čitanje na koje se također primjenjuje ublažavanje ograničenja CORS izvora.
PUBLIC_READONLY_CORS_API_ROUTES = [
  "/api/health/ping",
  "/api/monitoring/health",
  "/api/settings/require-login",
];

// Pojedinačna ruta samo za čitanje BEZ ublažavanja CORS ograničenja.
PUBLIC_READONLY_API_ROUTES_EXACT = new Set(["/api/health"]);

PUBLIC_READONLY_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
```

Rute samo za čitanje javne su **samo** za sigurne metode. Napomena: `classifyRoute()` isključuje `/api/v1/*` i `/api/v1beta/*` iz rezervne klasifikacije PUBLIC — one su uvijek `CLIENT_API`, tako da se pravilo za Bearer ključ i dalje primjenjuje.

## Dodavanje nove rute

### Obrazac 1 — Javni API krajnji endpoint za klijente (Bearer autentifikacija)

Rute unutar `/api/v1/` i `/api/v1beta/` automatski se klasificiraju kao `CLIENT_API`. Middleware provodi provjeru Bearer vjerodajnice; rukovatelji rutama ne moraju je ponavljati, ali mogu pročitati subjekt ako im je to korisno.

```typescript
// src/app/api/v1/your-route/route.ts
import { NextRequest, NextResponse } from "next/server";
import { assertAuth } from "@/server/authz/assertAuth";

export async function POST(req: NextRequest) {
  const subject = assertAuth(req, "CLIENT_API");
  // subject.kind === "client_api_key" | "anonymous" | "dashboard_session"
  // ... logika rukovatelja
}
```

### Obrazac 2 — Upravljački endpoint (sesija ili Bearer + manage)

Upotrijebite `requireManagementAuth()` iz `src/lib/api/requireManagementAuth.ts`:

```typescript
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

export async function POST(request: Request) {
  const rejection = await requireManagementAuth(request);
  if (rejection) return rejection;
  // ... logika rukovatelja
}
```

`requireManagementAuth()` pri uspjehu vraća `null`, a pri pogrešci JSON `Response`:

- 401 `AUTH_001` "Potrebna je autentifikacija" — vjerodajnice uopće nisu navedene
- 403 — nevažeći Bearer **ili** je Bearer naveden, ali ključ nema opseg `manage` / `admin`

`hasManageScope(scopes)` vraća true za `"manage"` ili `"admin"`.

### Obrazac 3 — Dodavanje na javni popis dopuštenih ruta

Odaberite skup prema obliku, a ne prema praktičnosti. Jedna ruta ide u `PUBLIC_API_ROUTES_EXACT` (ili u `PUBLIC_READONLY_CORS_API_ROUTES` ako je namijenjena samo za GET); samo stvarno podstablo ide u `PUBLIC_API_ROUTE_PREFIXES` i ono **mora završavati znakom `/`**. Dodavanje pojedinačne rute na popis prefiksa također objavljuje svaku susjednu putanju koja dijeli njezine početne znakove — uključujući srodne rute s dinamičkim segmentima dodane kasnije (GHSA-74g9-q8f6-793h). Ažurirajte jedinične testove u `tests/unit/public-api-routes.test.ts`, `tests/unit/authz/public-route-exact-match.test.ts` i `tests/unit/authz/classify.test.ts`.

## Opsezi

API ključevi sadrže polje `scopes` (pohranjeno kao JSON u `api_keys.scopes`, pogledajte `src/lib/db/apiKeys.ts`).

### Opseg upravljanja

- `manage` / `admin` — ključu omogućuje pristup krajnjim točkama API-ja za upravljanje kada se šalje kao Bearer.

### MCP opsezi (`src/shared/constants/mcpScopes.ts`)

Svaki MCP alat zahtijeva određene opsege putem `MCP_TOOL_SCOPES`. Cjelovit popis (`MCP_SCOPE_LIST`):

```
read:health, read:combos, write:combos, read:quota, read:usage,
read:models, execute:completions, execute:search, write:budget,
write:resilience, pricing:write, read:cache, write:cache,
read:compression, write:compression, read:proxies
```

Provedba opsega u `open-sse/mcp-server/server.ts` prosljeđuje popis opsega svakog alata funkciji
`evaluateToolScopes()` nakon što `resolveCallerScopeContext()` razriješi opsege iz podataka za MCP autentifikaciju,
metapodataka zahtjeva ili `OMNIROUTE_MCP_SCOPES`.

## Prekidač za obveznu autentifikaciju

`isAuthRequired()` u `src/shared/utils/apiAuth.ts` određuje provodi li se **ikakva** autentifikacija za zahtjev:

- `settings.requireLogin === false` → autentifikacija je globalno onemogućena.
- Nije konfigurirana lozinka **i** ne postoji varijabla okruženja `INITIAL_PASSWORD` → početni način rada dopušta čarobnjak za uvođenje i zahtjeve s povratne petlje, ali zahtjevi iz izložene mreže i dalje zahtijevaju vjerodajnice.
- Bilo koja pogreška baze podataka → pristup se odbija (sigurno prema zadanim postavkama).

Provedba API ključa klijenta koristi `isRequireApiKeyEnabled()` u `src/shared/utils/featureFlags.ts`, a ne izravno čitanje `process.env.REQUIRE_API_KEY`. To je važno za implementirane instance: promjena postavke `REQUIRE_API_KEY` u Dashboard → Feature Flags pohranjuje nadjačavanje u bazu podataka i odmah utječe na `/v1/*`, `/v1beta/*`, `/models`, `/responses`, `/chat/completions`, `/codex/*` i druge provjere autentifikacije klijentskog API-ja koje koriste isti pomoćni element. Ako se spremište zastavica značajki ne može čitati, autentifikacija klijentskog API-ja odbija pristup i zahtijeva ključ.

## Nekompatibilna promjena — v3.8.0

Krajnje točke `/api/v1/agents/tasks/*` i `/api/resilience/model-cooldowns` **sada zahtijevaju autentifikaciju za upravljanje** (commit `588a0333`). Klijenti koji su prethodno slali običan API ključ bez opsega `manage` primaju `403`. Migracija: ključu dodijelite opseg `manage` na nadzornoj ploči API ključeva ili upotrijebite prijavljenu sesiju nadzorne ploče.

## Promjena ponašanja — v3.8.2

`/api/mcp/*` (udaljeni MCP poslužitelj) i dalje je prema zadanim postavkama LOCAL_ONLY, ali sada prihvaća zahtjeve koji ne dolaze s povratne petlje kada zaglavlje `Authorization: Bearer <api-key>` sadrži opseg `manage`. Iznimka se izričito omogućuje za svaku putanju putem `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` u `src/server/authz/routeGuard.ts`; srodni prefiks LOCAL_ONLY `/api/cli-tools/runtime/*` namjerno se ne može zaobići jer može pokrenuti proizvoljne potprocese. Anonimni zahtjevi prema `/api/mcp/*` koji ne dolaze s povratne petlje i dalje vraćaju `403 LOCAL_ONLY` — zadano ponašanje za svaku novu putanju LOCAL_ONLY ostaje strogo ograničeno na povratnu petlju. Pogledajte [Razine zaštite ruta](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out).

## Testiranje

- Jedinični testovi: `tests/unit/authz/` — `classify.test.ts`, `pipeline.test.ts`, `client-api-policy.test.ts`, `management-policy.test.ts`, `public-policy.test.ts`.
- Javni popis dopuštenih ruta: `tests/unit/public-api-routes.test.ts`.
- Pokretanje ciljanog testa: `node --import tsx/esm --test tests/unit/authz/classify.test.ts`.

## Otklanjanje pogrešaka

Pipeline uvijek označava odgovore sljedećim zaglavljima:

```
x-request-id:               <korelacijski ID, ponovljen u tijelima pogrešaka>
x-omniroute-route-class:    PUBLIC | CLIENT_API | MANAGEMENT
```

Za autentificirane zahtjeve zaglavlja zahtjeva prema nadređenom poslužitelju (na strani rukovatelja) također uključuju:

```
x-omniroute-auth-kind:      client_api_key | dashboard_session | management_key | anonymous
x-omniroute-auth-id:        key_<posljednje 4 znamenke> | "dashboard" | "anonymous"
x-omniroute-auth-label:     (neobavezno)
x-omniroute-auth-scopes:    popis odvojen zarezima
```

Upotrijebite `assertAuth(req, expectedClass)` unutar rukovatelja — izbacuje `AuthzAssertionError` s kodom `AUTHZ_NOT_INITIALIZED` ako je međuprogram zaobiđen (korisno za otkrivanje regresija konfiguracije u testovima).

## Pogledajte također

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — oznaka autentifikacije po krajnjoj točki
- [COMPLIANCE.md](../security/COMPLIANCE.md) — zapisnik revizije za događaje autentifikacije
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md) — pojedinosti o provođenju MCP opsega
- Izvor: `src/server/authz/`, `src/lib/api/requireManagementAuth.ts`
