# Authorization Guide (Magyar)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/AUTHZ_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/AUTHZ_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/AUTHZ_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/AUTHZ_GUIDE.md)

---

> **Hiteles forrás:** `src/server/authz/`, `src/shared/constants/publicApiRoutes.ts`, `src/lib/api/requireManagementAuth.ts`, `src/shared/utils/apiAuth.ts`
> **Utolsó frissítés:** 2026-06-28 — v3.8.40

Az OmniRoute útvonal-tudatos engedélyezési folyamattal védi az összes API-kérést. A besorolás **determinisztikus** és **alapértelmezetten tiltó** — minden, ami nem sorolható be, `MANAGEMENT` besorolást kap, és munkamenetet vagy kezelési szintű tokent igényel. Ez az oldal az útvonalakat karbantartó vagy új végpontokat tervező mérnökök számára ismerteti a modellt.

![AuthZ-folyamat (3 útvonalosztály + házirend-kiértékelés)](../diagrams/exported/authz-pipeline.svg)

> Forrás: [diagrams/authz-pipeline.mmd](../diagrams/authz-pipeline.mmd)

## Két hitelesítési mód

### 1. API-kulcs (Bearer)

Az OpenAI-/Anthropic-/Gemini-kompatibilis kliens-API-khoz, valamint néhány kezelési útvonalhoz használatos, ha a kulcs rendelkezik `manage` hatókörrel.

```
Authorization: Bearer <api-key>
```

A `src/sse/services/auth.ts` fájlban található `isValidApiKey()` / `extractApiKey()` ellenőrzi, és a `src/shared/utils/apiAuth.ts` fájl exportálja újra. Az ellenőrző az `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` környezeti változókat is elfogadja állandó átengedési kulcsokként (#1350. probléma).

### 2. Irányítópult-munkamenet (auth_token cookie)

Az irányítópult oldalaihoz és a rendszergazdai műveletekhez.

```
Cookie: auth_token=<JWT signed with JWT_SECRET>
```

Egy cookie csak akkor számít munkamenetnek, ha a JWT ellenőrzése sikeres, **és** tartalmazza az `authenticated: true` értéket
(`src/shared/utils/dashboardSessionToken.ts` → `verifyDashboardSessionToken`). A cookie minden
felhasználója (útvonalőr, az authz-folyamat frissítése, WebSocket-kézfogás, élő
szerver, `/api/settings/require-login`, `/api/auth/status`) ezen a segédfüggvényen halad keresztül.
Léteznek más, `JWT_SECRET` használatával aláírt JWT-k is — a Cursor CLI átengedési mechanizmusa
`iss "omniroute" / aud "cursor-cli"` tokeneket bocsát ki a kulcsok birtokosai számára —, ezek azonban soha nem minősülnek munkamenetnek
(#13298).

A `src/shared/utils/apiAuth.ts` fájlban található `isDashboardSessionAuthenticated()` ellenőrzi. A folyamat automatikusan frissíti a JWT-t, ha a 30 napos élettartamából kevesebb mint 7 nap van hátra.

Egyes kezelési útvonalak **mindkét** módot elfogadják: cookie VAGY `Bearer <key>`, ha az API-kulcs rendelkezik `manage` (vagy `admin`) hatókörrel. Ez teszi lehetővé a v3.8-ban bevezetett, „API-hívásokon keresztül konfigurálható” munkafolyamatot.

#### Opcionális OIDC-bejelentkezési védelem (#6973)

Az irányítópult rendszergazdai bejelentkezése az alapértelmezett jelszavas bejelentkezés mellett egy **külön engedélyezhető** OIDC- (OpenID Connect-) folyamatot is támogat — a jelszavas bejelentkezés soha nem szűnik meg, csak kiegészül:

- Letiltva marad, hacsak a `settings.oidcEnabled === true` feltétel **és** az `oidcIssuer` /
  `oidcClientId` / `oidcClientSecret` nincs mind konfigurálva (Beállítások → Hitelesítés).
  Ellenkező esetben a `GET /api/auth/oidc/login` `400` választ ad vissza.
- A `GET /api/auth/oidc/login` felderíti az `authorization_endpoint` értékét a kibocsátó
  `/.well-known/openid-configuration` végpontjáról (ennek hiányában az
  `<issuer>/authorize` útvonalat használja), a bejövő kérésből összeállítja az átirányítási URI-t
  (figyelembe véve az `x-forwarded-proto` fejlécet), majd átirányít az IdP-hez egy véletlenszerű `state`
  értékkel, amelyet egy `httpOnly` attribútumú `oidc_state` cookie tárol.
- A `GET /api/auth/oidc/callback` ellenőrzi a `state` értékét, beváltja az engedélyezési
  kódot, majd a kibocsátó JWKS-készletével ellenőrzi az ID-token aláírását
  (a `jose` `createRemoteJWKSet` függvényével, JWKS URI-nként gyorsítótárazva), továbbá elvégzi az `issuer`/`audience`
  ellenőrzéseket. Az opcionális `oidcAllowedSubjects` engedélyezési lista a token
  `sub` jogcímével vagy `email` jogcímével keres egyezést — az e-mail-jogcímet csak akkor fogadja el,
  ha `email_verified === true`, így az IdP-nél nem ellenőrzött e-mail-cím soha nem juthat át
  a védelmen.
- Siker esetén **pontosan ugyanazt** a 30 napos `auth_token` JWT-t bocsátja ki, mint a jelszavas
  bejelentkezés (`src/app/api/auth/login/route.ts`), így az irányítópult
  munkamenet-folyamatának többi része (automatikus frissítés, cookie-attribútumok) változatlan marad —
  az OIDC csak a cookie kibocsátásának módját helyettesíti, nem az általa biztosított jogosultságokat.

## Útvonalosztályok

A `src/server/authz/types.ts` három osztályt definiál; minden olyan útvonal, amely nem sorolható be determinisztikusan, alapértelmezetten a `MANAGEMENT` osztályba kerül.

| Osztály      | Leírás                                                                                                                                                        | Szükséges hitelesítés                                                        |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| `PUBLIC`     | Kifejezetten biztonságos útvonalak — bejelentkezés, kijelentkezés, állapot, inicializálás, rendszerállapot-ellenőrzés, bevezetési rendszerindítás.            | Nincs                                                                        |
| `CLIENT_API` | Modellkiszolgáló végpontok — `/api/v1/*`, `/api/v1beta/*`, valamint a `/v1/*`, `/v1beta/*`, `/chat/completions`, `/responses`, `/models`, `/codex/*` aliasok. | Bearer-kulcs, ha az effektív `REQUIRE_API_KEY` funkciójelző engedélyezve van |
| `MANAGEMENT` | Vezérlőpultoldalak, beállítások, szolgáltatók, kulcsok, adminisztrációs és diagnosztikai végpontok.                                                           | Vezérlőpult-munkamenet VAGY `manage` hatókörrel rendelkező Bearer            |

## Feldolgozási folyamat

```
Bejövő kérés → src/proxy.ts
  → runAuthzPipeline() a src/server/authz/pipeline.ts fájlban
    1. Megbízható belső fejlécek eltávolítása (x-omniroute-auth-*, x-omniroute-route-class)
    2. Kérésazonosító létrehozása, az útvonal besorolása a classifyRoute() segítségével
    3. Ha pathname == "/" → átirányítás ide: /dashboard
    4. Ha leállítási állapotban van (szabályos leállítás), és /api/* → 503
    5. Ha nem GET /api/* → checkBodySize() ellenőrzés
    6. Ha OPTIONS → CORS előzetes kérés, 204
    7. Ha options.enforce == false → változatlan továbbítás útvonalosztály-fejlécekkel
    8. Egyébként: POLICIES[routeClass].evaluate(ctx)
       - engedélyezés  → x-omniroute-auth-{kind,id,label,scopes} beállítása → NextResponse.next()
       - elutasítás → JSON-hiba correlation_id értékkel (vezérlőpultoldalak → 302 /login)
```

A megbízható belső fejléceket (amelyeket a `src/server/authz/headers.ts` definiál) a rendszer a besorolás előtt **eltávolítja a bejövő kérésekből** — az ügyfelek nem adhatják meg előre az `x-omniroute-auth-*` fejléceket egy alany megszemélyesítéséhez.

### Szabályzati szerződések

Minden útvonalosztályhoz tartozik egy szabályzat a `src/server/authz/policies/` könyvtárban:

- **`publicPolicy`** (`policies/public.ts`) — mindig az `allow({ kind: "anonymous", id: "anonymous" })` értéket adja vissza.
- **`clientApiPolicy`** (`policies/clientApi.ts`) — kinyeri a Bearer-token értékét, és a `validateApiKey()` segítségével ellenőrzi. Csak akkor engedélyez névtelen hozzáférést, ha az effektív `REQUIRE_API_KEY` funkciójelző le van tiltva. Az effektív jelzőt az `isRequireApiKeyEnabled()` oldja fel (`DB feature flag override > process.env.REQUIRE_API_KEY > default`), így a vezérlőpult funkciójelzői és a környezeti változók egységesen szabályozzák az `/api/v1/*`, `/api/v1beta/*` útvonalakat és aliasaikat; a feloldási hibák zárt módon meghiúsítják a hozzáférést. Engedélyezi a vezérlőpult-munkamenettel rendelkező kéréseket az ügyfél-API útvonalain (beleértve a vezérlőpult modellkatalógusa által használt `/api/v1/models` útvonalat).
- **`managementPolicy`** (`policies/management.ts`) — elfogad vezérlőpult-munkamenetet és belső modell-szinkronizálási kéréseket (amelyeket az `/api/providers/[name]/(sync-models|models)` mintával egyeztet), vagy teljesen kihagyja az ellenőrzést, ha az `isAuthRequired()` false értéket ad vissza. 403-as (`AUTH_001`) választ ad, ha van Bearer-token, de az érvénytelen; egyébként 401-es választ ad. Emellett minden hitelesítési ág előtt érvényesíti az útvonalvédelmi szinteket (LOCAL_ONLY / ALWAYS_PROTECTED) — lásd: [Útvonalvédelmi szintek](../security/ROUTE_GUARD_TIERS.md). A `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` listában szereplő LOCAL_ONLY útvonalak (jelenleg: `/api/mcp/`) nem loopback címről is elérhetők, ha a Bearer-kulcs rendelkezik `manage` hatókörrel; minden más LOCAL_ONLY útvonal a hatókörtől függetlenül szigorúan csak loopback címről érhető el.

A sikeres szabályzat egy `AuthSubject` értéket ad vissza, ahol `kind ∈ { client_api_key, dashboard_session, management_key, anonymous }`. Az alsóbb szintű kezelők ezt az `assertAuth(request, "CLIENT_API")` segítségével olvashatják ki a `src/server/authz/assertAuth.ts` fájlban, a hitelesítési logika ismételt végrehajtása helyett.

## Nyilvános útvonalak listája

A `src/shared/constants/publicApiRoutes.ts` tartalmazza az explicit engedélyezési listát:

A lista **alak** szerint van felosztva, és ez a felosztás biztonságkritikus (GHSA-74g9-q8f6-793h): a rendszer az előtagokat a `startsWith()` használatával illeszti, így minden olyan szomszédos útvonalra is illeszkednek, amelynek azonosak a kezdő karakterei.
Az `/api/usage/om-usage` előtagként az `/api/usage/om-usage<anything>` mintának megfelelő összes útvonalat NYILVÁNOSSÁ tette, a Next pedig ezt az `/api/usage/[connectionId]` útvonalra oldja fel — egy olyan kezelőre, amely nem rendelkezik saját hitelesítéssel.

```ts
// Valódi részfák. Minden bejegyzésnek "/" karakterrel KELL végződnie (ezt egységteszt ellenőrzi).
PUBLIC_API_ROUTE_PREFIXES = [
  "/api/auth/oidc/",
  "/api/v1/", // a classify CLIENT_API-ként kezeli, nem „hitelesítés nélküli nyilvánosként”
  "/api/oauth/",
  "/api/codex/connect/",
  "/api/telegram/",
  "/api/cursor-cli/",
];

// Egyedi útvonalak, PONTOS illesztéssel (záró perjellel vagy anélkül).
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

// Csak olvasható egyedi útvonalak, amelyekre a CORS-eredetre vonatkozó enyhítés is érvényes.
PUBLIC_READONLY_CORS_API_ROUTES = [
  "/api/health/ping",
  "/api/monitoring/health",
  "/api/settings/require-login",
];

// Csak olvasható egyedi útvonal a CORS-enyhítés NÉLKÜL.
PUBLIC_READONLY_API_ROUTES_EXACT = new Set(["/api/health"]);

PUBLIC_READONLY_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
```

A csak olvasható útvonalak **csak** biztonságos metódusok esetén nyilvánosak. Megjegyzés: a `classifyRoute()` kizárja az `/api/v1/*` és `/api/v1beta/*` útvonalakat a PUBLIC alapértelmezett ágból — ezek mindig `CLIENT_API` besorolást kapnak, így a Bearer-kulcsokra vonatkozó szabályzat továbbra is érvényesül.

## Új útvonal hozzáadása

### 1. minta — Nyilvános kliens-API-végpont (Bearer-hitelesítés)

Az `/api/v1/` és `/api/v1beta/` alatti útvonalak automatikusan `CLIENT_API` besorolást kapnak. A middleware kikényszeríti a Bearer-ellenőrzést; az útvonalkezelőknek nem kell azt megismételniük, de szükség esetén kiolvashatják az alanyt.

```typescript
// src/app/api/v1/your-route/route.ts
import { NextRequest, NextResponse } from "next/server";
import { assertAuth } from "@/server/authz/assertAuth";

export async function POST(req: NextRequest) {
  const subject = assertAuth(req, "CLIENT_API");
  // subject.kind === "client_api_key" | "anonymous" | "dashboard_session"
  // ... a kezelő logikája
}
```

### 2. minta — Felügyeleti végpont (munkamenet vagy Bearer + manage)

Használd a `requireManagementAuth()` függvényt a `src/lib/api/requireManagementAuth.ts` fájlból:

```typescript
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

export async function POST(request: Request) {
  const rejection = await requireManagementAuth(request);
  if (rejection) return rejection;
  // ... a kezelő logikája
}
```

Siker esetén a `requireManagementAuth()` visszatérési értéke `null`, egyébként pedig egy JSON-hibát tartalmazó `Response`:

- 401 `AUTH_001` „Hitelesítés szükséges” — egyáltalán nincsenek hitelesítő adatok
- 403 — érvénytelen Bearer, **vagy** van Bearer, de a kulcs nem rendelkezik `manage` / `admin` hatókörrel

A `hasManageScope(scopes)` igaz értéket ad vissza a `"manage"` vagy `"admin"` esetén.

### 3. minta — Hozzáadás a nyilvános engedélyezési listához

A halmazt az alak, ne pedig a kényelmi szempontok alapján válaszd ki. Egyetlen útvonal a `PUBLIC_API_ROUTES_EXACT` halmazba kerüljön (GET-only útvonal esetén pedig a `PUBLIC_READONLY_CORS_API_ROUTES` listába); csak valódi részfa kerülhet a `PUBLIC_API_ROUTE_PREFIXES` listába, és **`/` karakterrel kell végződnie**. Ha egyetlen útvonalat teszel az előtaglistába, azzal minden olyan szomszédos útvonalat is nyilvánossá teszel, amelynek azonosak a kezdő karakterei — beleértve a később hozzáadott, dinamikus szegmenst tartalmazó testvérútvonalakat is (GHSA-74g9-q8f6-793h). Frissítsd az egységteszteket a `tests/unit/public-api-routes.test.ts`, `tests/unit/authz/public-route-exact-match.test.ts` és `tests/unit/authz/classify.test.ts` fájlokban.

## Hatókörök

Az API-kulcsok egy `scopes` tömböt tartalmaznak (JSON-ként tárolva az `api_keys.scopes` mezőben, lásd: `src/lib/db/apiKeys.ts`).

### Felügyeleti hatókör

- `manage` / `admin` — hozzáférést biztosít a kulcs számára a felügyeleti API-végpontokhoz, ha Bearer-tokenként küldik el.

### MCP-hatókörök (`src/shared/constants/mcpScopes.ts`)

Minden MCP-eszköz meghatározott hatóköröket igényel az `MCP_TOOL_SCOPES` alapján. A teljes lista (`MCP_SCOPE_LIST`):

```
read:health, read:combos, write:combos, read:quota, read:usage,
read:models, execute:completions, execute:search, write:budget,
write:resilience, pricing:write, read:cache, write:cache,
read:compression, write:compression, read:proxies
```

A hatókörök kikényszerítése az `open-sse/mcp-server/server.ts` fájlban minden eszköz hatókörlistáját átadja az
`evaluateToolScopes()` függvénynek, miután a `resolveCallerScopeContext()` feloldotta a hatóköröket az MCP hitelesítési adataiból,
a kérés metaadataiból vagy az `OMNIROUTE_MCP_SCOPES` változóból.

## Hitelesítési követelmény kapcsolója

A `src/shared/utils/apiAuth.ts` fájlban található `isAuthRequired()` dönti el, hogy egy kéréshez szükséges-e **bármilyen** hitelesítés:

- `settings.requireLogin === false` → a hitelesítés globálisan le van tiltva.
- Nincs beállítva jelszó, **és** nincs `INITIAL_PASSWORD` környezeti változó → a rendszerindítási mód engedélyezi a bevezető varázslót és a loopback kéréseket, de a hálózaton elérhető kérésekhez továbbra is szükségesek hitelesítő adatok.
- Bármilyen adatbázishiba → zárt módon hiúsul meg (alapértelmezetten biztonságos).

A kliensoldali API-kulcsok kikényszerítése a `src/shared/utils/featureFlags.ts` fájlban található `isRequireApiKeyEnabled()` függvényt használja, nem pedig a `process.env.REQUIRE_API_KEY` közvetlen kiolvasását. Ez fontos a telepített példányoknál: a `REQUIRE_API_KEY` átkapcsolása a Vezérlőpult → Funkciójelzők felületen adatbázis-felülírást tárol, és azonnal hatással van a `/v1/*`, `/v1beta/*`, `/models`, `/responses`, `/chat/completions`, `/codex/*` és más, ezt a segédfüggvényt használó kliens-API hitelesítési ellenőrzésekre. Ha a funkciójelzők tárhelye nem olvasható, a kliens-API hitelesítése zárt módon hiúsul meg, és kulcsot követel meg.

## Inkompatibilis változás — v3.8.0

A `/api/v1/agents/tasks/*` és `/api/resilience/model-cooldowns` végpontokhoz **mostantól felügyeleti hitelesítés szükséges** (`588a0333` commit). Azok a kliensek, amelyek korábban normál, `manage` hatókör nélküli API-kulcsot küldtek, `403` választ kapnak. Migráció: vagy rendelje hozzá a kulcshoz a `manage` hatókört az API-kulcsok vezérlőpultján, vagy használjon bejelentkezett vezérlőpulti munkamenetet.

## Viselkedésbeli változás — v3.8.2

Az `/api/mcp/*` (a távoli MCP-kiszolgáló) alapértelmezés szerint továbbra is LOCAL_ONLY, de mostantól elfogadja a nem loopback címről érkező kéréseket, ha az `Authorization: Bearer <api-key>` fejléc tartalmazza a `manage` hatókört. A kivétel útvonalanként kifejezetten az `src/server/authz/routeGuard.ts` fájlban található `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` használatával van szabályozva; a kapcsolódó LOCAL_ONLY `/api/cli-tools/runtime/*` előtag szándékosan nem kerülhető meg, mert tetszőleges alfolyamatokat indíthat el. Az `/api/mcp/*` útvonalra nem loopback címről érkező névtelen kérések továbbra is `403 LOCAL_ONLY` választ kapnak — minden új LOCAL_ONLY útvonal alapértelmezése továbbra is szigorúan loopback. Lásd: [Útvonalvédelmi szintek](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out).

## Tesztelés

- Egységtesztek: `tests/unit/authz/` — `classify.test.ts`, `pipeline.test.ts`, `client-api-policy.test.ts`, `management-policy.test.ts`, `public-policy.test.ts`.
- Nyilvános engedélyezési lista: `tests/unit/public-api-routes.test.ts`.
- Célzott futtatás: `node --import tsx/esm --test tests/unit/authz/classify.test.ts`.

## Hibakeresés

A feldolgozási folyamat a válaszokat mindig a következő fejlécekkel látja el:

```
x-request-id:               <korrelációs azonosító, a hibatörzsekben is visszaküldve>
x-omniroute-route-class:    PUBLIC | CLIENT_API | MANAGEMENT
```

Hitelesített kérések esetén a felsőbb rétegbeli (kezelőoldali) kérésfejlécek a következőket is tartalmazzák:

```
x-omniroute-auth-kind:      client_api_key | dashboard_session | management_key | anonymous
x-omniroute-auth-id:        key_<utolsó 4> | "dashboard" | "anonymous"
x-omniroute-auth-label:     (opcionális)
x-omniroute-auth-scopes:    vesszővel elválasztott lista
```

A kezelőkön belül használja az `assertAuth(req, expectedClass)` függvényt — ez `AUTHZ_NOT_INITIALIZED` kódú `AuthzAssertionError` hibát vált ki, ha a köztes szoftvert megkerülték (hasznos a konfigurációs regressziók tesztekben történő észleléséhez).

## Lásd még

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — hitelesítési jelölő végpontonként
- [COMPLIANCE.md](../security/COMPLIANCE.md) — hitelesítési események naplója
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md) — az MCP-hatókörök kikényszerítésének részletei
- Forrás: `src/server/authz/`, `src/lib/api/requireManagementAuth.ts`
