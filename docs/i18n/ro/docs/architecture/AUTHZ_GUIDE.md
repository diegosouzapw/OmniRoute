# Authorization Guide (Română)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/AUTHZ_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/AUTHZ_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/AUTHZ_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/AUTHZ_GUIDE.md)

---

> **Sursa adevărului:** `src/server/authz/`, `src/shared/constants/publicApiRoutes.ts`, `src/lib/api/requireManagementAuth.ts`, `src/shared/utils/apiAuth.ts`
> **Ultima actualizare:** 2026-06-28 — v3.8.40

OmniRoute are un flux de autorizare care ține cont de rute și controlează fiecare solicitare API. Clasificarea este **deterministă** și **se închide în mod securizat în caz de eroare** — orice element care nu poate fi clasificat ajunge în categoria `MANAGEMENT` și necesită o sesiune sau un token cu privilegii de administrare. Această pagină explică modelul pentru inginerii care întrețin rutele sau proiectează endpointuri noi.

![Fluxul AuthZ (3 clase de rute + evaluarea politicilor)](../diagrams/exported/authz-pipeline.svg)

> Sursă: [diagrams/authz-pipeline.mmd](../diagrams/authz-pipeline.mmd)

## Două moduri de autentificare

### 1. Cheie API (Bearer)

Utilizată pentru API-urile client compatibile cu OpenAI/Anthropic/Gemini și pentru câteva rute de administrare atunci când cheia are domeniul de autorizare `manage`.

```
Authorization: Bearer <api-key>
```

Este validată de `isValidApiKey()` / `extractApiKey()` în `src/sse/services/auth.ts` și reexportată prin `src/shared/utils/apiAuth.ts`. Validatorul acceptă și variabilele de mediu `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` drept chei persistente de tip passthrough (problema #1350).

### 2. Sesiune de dashboard (cookie auth_token)

Pentru paginile dashboardului și operațiunile de administrare.

```
Cookie: auth_token=<JWT semnat cu JWT_SECRET>
```

Un cookie reprezintă o sesiune numai atunci când JWT-ul este verificat **și** conține `authenticated: true`
(`src/shared/utils/dashboardSessionToken.ts` → `verifyDashboardSessionToken`). Fiecare
consumator al cookie-ului (protecția rutelor, reîmprospătarea fluxului authz, negocierea WebSocket, serverul
live, `/api/settings/require-login`, `/api/auth/status`) trece prin acel utilitar.
Există și alte JWT-uri semnate cu `JWT_SECRET` — mecanismul passthrough al Cursor CLI emite
tokenuri `iss "omniroute" / aud "cursor-cli"` pentru deținătorii de chei — iar acestea nu reprezintă niciodată sesiuni
(#13298).

Este verificată de `isDashboardSessionAuthenticated()` în `src/shared/utils/apiAuth.ts`. Fluxul reîmprospătează automat JWT-ul atunci când au rămas mai puțin de 7 zile din durata sa de viață de 30 de zile.

Unele rute de administrare acceptă **oricare** dintre cele două moduri: cookie SAU `Bearer <key>` atunci când cheia API are domeniul de autorizare `manage` (sau `admin`). Acest lucru permite fluxul de lucru „configurabil prin apeluri API” adăugat în v3.8.

#### Control opțional al autentificării OIDC (#6973)

Autentificarea de administrator în dashboard acceptă și un flux OIDC (OpenID Connect) **opțional**, alături de autentificarea implicită prin parolă — autentificarea prin parolă nu este eliminată niciodată, ci doar completată:

- Este dezactivat dacă `settings.oidcEnabled === true` **și** `oidcIssuer` /
  `oidcClientId` / `oidcClientSecret` nu sunt toate configurate (Settings → Auth).
  În caz contrar, `GET /api/auth/oidc/login` returnează `400`.
- `GET /api/auth/oidc/login` identifică `authorization_endpoint` din
  configurația `/.well-known/openid-configuration` a emitentului (cu revenire la
  `<issuer>/authorize`), construiește URI-ul de redirecționare din solicitarea primită
  (ținând cont de `x-forwarded-proto`) și redirecționează către IdP cu o valoare `state`
  aleatorie, stocată într-un cookie `oidc_state` cu atributul `httpOnly`.
- `GET /api/auth/oidc/callback` validează `state`, schimbă codul de autorizare
  și verifică semnătura tokenului ID prin JWKS-ul emitentului
  (`createRemoteJWKSet` din `jose`, memorat în cache pentru fiecare URI JWKS), cu verificări pentru `issuer`/`audience`.
  O listă opțională de permisiuni `oidcAllowedSubjects` compară revendicarea
  `sub` a tokenului sau revendicarea `email` — revendicarea de e-mail este luată în considerare numai când
  `email_verified === true`, astfel încât o adresă de e-mail neverificată la IdP nu poate trece niciodată
  de control.
- În caz de succes, emite **exact același** JWT `auth_token` cu valabilitate de 30 de zile pe care îl emite autentificarea
  prin parolă (`src/app/api/auth/login/route.ts`), astfel încât restul fluxului
  sesiunii dashboardului (reîmprospătarea automată, atributele cookie-ului) rămâne neschimbat —
  OIDC înlocuiește doar modul în care este emis cookie-ul, nu și permisiunile pe care acesta le acordă.

## Clase de rute

`src/server/authz/types.ts` definește trei clase; orice rută care nu poate fi clasificată în mod determinist revine implicit la `MANAGEMENT`.

| Clasă        | Descriere                                                                                                                                                             | Autentificare necesară                                                                  |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| `PUBLIC`     | Rute explicit sigure — autentificare, deconectare, stare, inițializare, verificarea stării de funcționare, inițializarea integrării.                                  | Niciuna                                                                                 |
| `CLIENT_API` | Endpointuri pentru servirea modelelor — `/api/v1/*`, `/api/v1beta/*`, plus aliasurile `/v1/*`, `/v1beta/*`, `/chat/completions`, `/responses`, `/models`, `/codex/*`. | Cheie Bearer când indicatorul de funcționalitate efectiv `REQUIRE_API_KEY` este activat |
| `MANAGEMENT` | Pagini ale panoului de control, setări, furnizori, chei, endpointuri de administrare și diagnosticare.                                                                | Sesiune a panoului de control SAU Bearer cu domeniul `manage`                           |

## Flux de procesare

```
Cerere primită → src/proxy.ts
  → runAuthzPipeline() în src/server/authz/pipeline.ts
    1. Elimină anteturile interne de încredere (x-omniroute-auth-*, x-omniroute-route-class)
    2. Generează ID-ul cererii, clasifică ruta prin classifyRoute()
    3. Dacă pathname == "/" → redirecționează către /dashboard
    4. Dacă serviciul este în curs de oprire (oprire controlată) și ruta este /api/* → 503
    5. Dacă metoda nu este GET și ruta este /api/* → verificarea de protecție checkBodySize()
    6. Dacă metoda este OPTIONS → răspuns preliminar CORS 204
    7. Dacă options.enforce == false → transmite mai departe cu anteturile clasei rutei
    8. În caz contrar: POLICIES[routeClass].evaluate(ctx)
       - allow  → aplică x-omniroute-auth-{kind,id,label,scopes} → NextResponse.next()
       - reject → eroare JSON cu correlation_id (pagini ale panoului de control → 302 /login)
```

Anteturile interne de încredere (definite în `src/server/authz/headers.ts`) sunt **eliminate din cererile primite** înainte de clasificare — clienții nu pot precompleta `x-omniroute-auth-*` pentru a uzurpa identitatea unui subiect.

### Contractele politicilor

Fiecare clasă de rută are o politică în `src/server/authz/policies/`:

- **`publicPolicy`** (`policies/public.ts`) — returnează întotdeauna `allow({ kind: "anonymous", id: "anonymous" })`.
- **`clientApiPolicy`** (`policies/clientApi.ts`) — extrage Bearer și îl validează prin `validateApiKey()`. Permite continuarea ca anonim numai când indicatorul de funcționalitate efectiv `REQUIRE_API_KEY` este dezactivat. Valoarea efectivă a indicatorului este determinată prin `isRequireApiKeyEnabled()` (`suprascriere prin indicatorul de funcționalitate din DB > process.env.REQUIRE_API_KEY > valoare implicită`), astfel încât indicatorii de funcționalitate din panoul de control și variabilele de mediu să controleze în mod consecvent `/api/v1/*`, `/api/v1beta/*` și aliasurile; erorile mecanismului de determinare duc la refuzarea accesului. Permite cereri cu sesiune a panoului de control pe rutele API pentru clienți (inclusiv `/api/v1/models`, utilizată de catalogul de modele al panoului de control).
- **`managementPolicy`** (`policies/management.ts`) — acceptă sesiunea panoului de control, cererile interne de sincronizare a modelelor (potrivite cu `/api/providers/[name]/(sync-models|models)`) sau omite complet verificarea dacă `isAuthRequired()` returnează false. Returnează 403 (`AUTH_001`) când este prezent un token Bearer nevalid și 401 în caz contrar. De asemenea, aplică nivelurile de protecție a rutelor (LOCAL_ONLY / ALWAYS_PROTECTED) înaintea oricărei ramuri de autentificare — consultați [Nivelurile de protecție a rutelor](../security/ROUTE_GUARD_TIERS.md). Căile LOCAL_ONLY din `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` (în prezent: `/api/mcp/`) pot fi accesate din afara interfeței loopback când cheia Bearer include domeniul `manage`; toate celelalte căi LOCAL_ONLY rămân limitate strict la interfața loopback, indiferent de domeniu.

O politică reușită returnează `AuthSubject` cu `kind ∈ { client_api_key, dashboard_session, management_key, anonymous }`. Gestionarii din aval îl pot citi prin `assertAuth(request, "CLIENT_API")` în `src/server/authz/assertAuth.ts`, în loc să execute din nou logica de autentificare.

## Lista rutelor publice

`src/shared/constants/publicApiRoutes.ts` reprezintă lista explicită de permisiuni:

Lista este împărțită după **formă**, iar această separare este esențială (GHSA-74g9-q8f6-793h): un prefix este
comparat folosind `startsWith()`, astfel încât acesta corespunde și fiecărei căi adiacente care are aceleași caractere inițiale.
Folosirea `/api/usage/om-usage` ca prefix a marcat `/api/usage/om-usage<anything>` drept PUBLIC, iar Next asociază
această cale cu `/api/usage/[connectionId]` — un handler fără autentificare proprie.

```ts
// Subarbori autentici. Fiecare intrare TREBUIE să se termine cu „/” (verificat printr-un test unitar).
PUBLIC_API_ROUTE_PREFIXES = [
  "/api/auth/oidc/",
  "/api/v1/", // tratat drept CLIENT_API în classify, nu drept public „fără autentificare”
  "/api/oauth/",
  "/api/codex/connect/",
  "/api/telegram/",
  "/api/cursor-cli/",
];

// Rute individuale, comparate EXACT (cu sau fără bară oblică finală).
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

// Rute individuale doar pentru citire, care beneficiază și de relaxarea restricției privind originea CORS.
PUBLIC_READONLY_CORS_API_ROUTES = [
  "/api/health/ping",
  "/api/monitoring/health",
  "/api/settings/require-login",
];

// Rută individuală doar pentru citire, FĂRĂ relaxarea restricției CORS.
PUBLIC_READONLY_API_ROUTES_EXACT = new Set(["/api/health"]);

PUBLIC_READONLY_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
```

Rutele doar pentru citire sunt publice **numai** pentru metode sigure. Notă: `classifyRoute()` exclude `/api/v1/*` și `/api/v1beta/*` din mecanismul alternativ PUBLIC — acestea sunt întotdeauna `CLIENT_API`, astfel încât politica pentru cheia Bearer se aplică în continuare.

## Adăugarea unei rute noi

### Modelul 1 — Endpoint API public pentru clienți (autentificare Bearer)

Rutele de sub `/api/v1/` și `/api/v1beta/` sunt clasificate automat drept `CLIENT_API`. Middleware-ul aplică verificarea Bearer; handler-ele rutelor nu trebuie să o repete, dar pot citi subiectul dacă este util.

```typescript
// src/app/api/v1/your-route/route.ts
import { NextRequest, NextResponse } from "next/server";
import { assertAuth } from "@/server/authz/assertAuth";

export async function POST(req: NextRequest) {
  const subject = assertAuth(req, "CLIENT_API");
  // subject.kind === "client_api_key" | "anonymous" | "dashboard_session"
  // ... logica handler-ului
}
```

### Modelul 2 — Endpoint de administrare (sesiune sau Bearer + manage)

Utilizați `requireManagementAuth()` din `src/lib/api/requireManagementAuth.ts`:

```typescript
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

export async function POST(request: Request) {
  const rejection = await requireManagementAuth(request);
  if (rejection) return rejection;
  // ... logica handler-ului
}
```

`requireManagementAuth()` returnează `null` în caz de succes sau un `Response` de eroare JSON:

- 401 `AUTH_001` "Autentificare necesară" — nu există deloc credențiale
- 403 — Bearer nevalid **sau** Bearer prezent, dar cheia nu are domeniul de aplicare `manage` / `admin`

`hasManageScope(scopes)` returnează true pentru `"manage"` sau `"admin"`.

### Modelul 3 — Adăugarea în lista publică de permisiuni

Alegeți setul în funcție de formă, nu de comoditate. O rută individuală trebuie adăugată în `PUBLIC_API_ROUTES_EXACT` (sau în `PUBLIC_READONLY_CORS_API_ROUTES` dacă acceptă doar GET); numai un subarbore autentic trebuie adăugat în `PUBLIC_API_ROUTE_PREFIXES`, iar acesta **trebuie să se termine cu `/`**. Adăugarea unei rute individuale în lista de prefixe face publică și fiecare cale adiacentă care are aceleași caractere inițiale — inclusiv rutele înrudite cu segmente dinamice adăugate ulterior (GHSA-74g9-q8f6-793h). Actualizați testele unitare din `tests/unit/public-api-routes.test.ts`, `tests/unit/authz/public-route-exact-match.test.ts` și `tests/unit/authz/classify.test.ts`.

## Domenii de acces

Cheile API conțin un array `scopes` (stocat ca JSON în `api_keys.scopes`, consultați `src/lib/db/apiKeys.ts`).

### Domeniul de acces pentru administrare

- `manage` / `admin` — acordă cheii acces la endpointurile API-ului de administrare atunci când este trimisă ca Bearer.

### Domenii de acces MCP (`src/shared/constants/mcpScopes.ts`)

Fiecare instrument MCP necesită anumite domenii de acces prin `MCP_TOOL_SCOPES`. Lista completă (`MCP_SCOPE_LIST`):

```
read:health, read:combos, write:combos, read:quota, read:usage,
read:models, execute:completions, execute:search, write:budget,
write:resilience, pricing:write, read:cache, write:cache,
read:compression, write:compression, read:proxies
```

Aplicarea domeniilor de acces în `open-sse/mcp-server/server.ts` transmite lista de domenii de acces a fiecărui instrument către
`evaluateToolScopes()`, după ce `resolveCallerScopeContext()` determină domeniile de acces din informațiile de autentificare MCP,
metadatele cererii sau `OMNIROUTE_MCP_SCOPES`.

## Comutatorul pentru autentificare obligatorie

`isAuthRequired()` din `src/shared/utils/apiAuth.ts` stabilește dacă este impusă **vreo** formă de autentificare pentru o cerere:

- `settings.requireLogin === false` → autentificarea este dezactivată global.
- Nu este configurată nicio parolă **și** nu există nicio variabilă de mediu `INITIAL_PASSWORD` → modul de inițializare permite expertul de configurare inițială și cererile loopback, însă cererile de rețea expuse necesită în continuare acreditări.
- Orice eroare a bazei de date → accesul este refuzat (securizat în mod implicit).

Impunerea cheii API pentru client utilizează `isRequireApiKeyEnabled()` din `src/shared/utils/featureFlags.ts`, nu o citire directă a `process.env.REQUIRE_API_KEY`. Acest aspect este important pentru instanțele implementate: comutarea opțiunii `REQUIRE_API_KEY` în Dashboard → Feature Flags stochează o suprascriere în baza de date și afectează imediat `/v1/*`, `/v1beta/*`, `/models`, `/responses`, `/chat/completions`, `/codex/*` și alte verificări de autentificare ale API-ului pentru clienți care utilizează această funcție auxiliară. Dacă stocarea indicatorilor de funcționalitate nu poate fi citită, autentificarea API-ului pentru clienți refuză accesul și necesită o cheie.

## Modificare incompatibilă — v3.8.0

Endpointurile `/api/v1/agents/tasks/*` și `/api/resilience/model-cooldowns` **necesită acum autentificare pentru administrare** (commitul `588a0333`). Clienții care trimiteau anterior o cheie API obișnuită, fără domeniul de acces `manage`, primesc `403`. Migrare: fie acordați cheii domeniul de acces `manage` în panoul API Keys, fie utilizați o sesiune autentificată în panoul de control.

## Modificare de comportament — v3.8.2

`/api/mcp/*` (serverul MCP la distanță) este în continuare LOCAL_ONLY în mod implicit, dar acceptă acum cereri non-loopback atunci când antetul `Authorization: Bearer <api-key>` conține domeniul de acces `manage`. Excepția este activată explicit pentru fiecare cale prin `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` în `src/server/authz/routeGuard.ts`; prefixul LOCAL_ONLY înrudit `/api/cli-tools/runtime/*` nu poate fi eludat în mod intenționat, deoarece poate genera subprocese arbitrare. Cererile anonime către `/api/mcp/*` provenite din afara interfeței loopback continuă să returneze `403 LOCAL_ONLY` — comportamentul implicit pentru orice cale LOCAL_ONLY nouă rămâne restricționarea strictă la loopback. Consultați [Nivelurile mecanismului de protecție a rutelor](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out).

## Testare

- Teste unitare: `tests/unit/authz/` — `classify.test.ts`, `pipeline.test.ts`, `client-api-policy.test.ts`, `management-policy.test.ts`, `public-policy.test.ts`.
- Lista de permisiuni publice: `tests/unit/public-api-routes.test.ts`.
- Rulare focalizată: `node --import tsx/esm --test tests/unit/authz/classify.test.ts`.

## Depanare

Pipeline-ul marchează întotdeauna răspunsurile cu:

```
x-request-id:               <ID de corelare, reprodus în corpurile erorilor>
x-omniroute-route-class:    PUBLIC | CLIENT_API | MANAGEMENT
```

Pentru solicitările autentificate, antetele solicitării upstream (din partea handlerului) includ și:

```
x-omniroute-auth-kind:      client_api_key | dashboard_session | management_key | anonymous
x-omniroute-auth-id:        key_<ultimele-4> | "dashboard" | "anonymous"
x-omniroute-auth-label:     (opțional)
x-omniroute-auth-scopes:    listă separată prin virgule
```

Utilizați `assertAuth(req, expectedClass)` în interiorul handlerelor — aceasta generează `AuthzAssertionError` cu codul `AUTHZ_NOT_INITIALIZED` dacă middleware-ul a fost ocolit (util pentru detectarea regresiilor de configurare în teste).

## Consultați și

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — marcajul de autentificare pentru fiecare endpoint
- [COMPLIANCE.md](../security/COMPLIANCE.md) — jurnalul de audit pentru evenimentele de autentificare
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md) — detalii despre aplicarea scope-urilor MCP
- Sursă: `src/server/authz/`, `src/lib/api/requireManagementAuth.ts`
