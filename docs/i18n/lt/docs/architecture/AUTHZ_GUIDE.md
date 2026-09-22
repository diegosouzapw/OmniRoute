# Authorization Guide (Lietuvių)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/AUTHZ_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/AUTHZ_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/AUTHZ_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/AUTHZ_GUIDE.md)

---

> **Pirminis tiesos šaltinis:** `src/server/authz/`, `src/shared/constants/publicApiRoutes.ts`, `src/lib/api/requireManagementAuth.ts`, `src/shared/utils/apiAuth.ts`
> **Paskutinį kartą atnaujinta:** 2026-06-28 — v3.8.40

OmniRoute turi maršrutus atpažįstančią autorizavimo seką, kuri kontroliuoja kiekvieną API užklausą. Klasifikavimas yra **deterministinis** ir **uždaras klaidos atveju** — viskas, ko nepavyksta klasifikuoti, priskiriama `MANAGEMENT` ir tam reikalinga sesija arba valdymo lygio prieigos raktas. Šiame puslapyje aprašomas modelis, skirtas maršrutus prižiūrintiems arba naujas galines prieigos vietas projektuojantiems inžinieriams.

![AuthZ seka (3 maršrutų klasės + strategijos vertinimas)](../diagrams/exported/authz-pipeline.svg)

> Šaltinis: [diagrams/authz-pipeline.mmd](../diagrams/authz-pipeline.mmd)

## Du autentifikavimo režimai

### 1. API raktas (Bearer)

Naudojamas su OpenAI / Anthropic / Gemini suderinamoms kliento API ir keliems valdymo maršrutams, kai raktas turi `manage` aprėptį.

```
Authorization: Bearer <api-key>
```

Tikrinamas naudojant `isValidApiKey()` / `extractApiKey()`, esančias `src/sse/services/auth.ts`, ir pakartotinai eksportuojamas per `src/shared/utils/apiAuth.ts`. Tikrintuvas taip pat priima `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` aplinkos kintamuosius kaip nuolatinius tiesioginio perdavimo raktus (problema #1350).

### 2. Valdymo skydelio sesija (auth_token slapukas)

Skirta valdymo skydelio puslapiams ir administravimo operacijoms.

```
Cookie: auth_token=<JWT signed with JWT_SECRET>
```

Slapukas laikomas sesija tik tada, kai JWT patikrinamas **ir** turi `authenticated: true`
(`src/shared/utils/dashboardSessionToken.ts` → `verifyDashboardSessionToken`). Kiekvienas
slapuko naudotojas (maršruto apsauga, authz sekos atnaujinimas, WebSocket ryšio užmezgimas, tiesioginis
serveris, `/api/settings/require-login`, `/api/auth/status`) naudoja šią pagalbinę funkciją.
Egzistuoja ir kitų JWT, pasirašytų naudojant `JWT_SECRET` — Cursor CLI tiesioginis perdavimas raktų
turėtojams išduoda žetonus su `iss "omniroute" / aud "cursor-cli"` — tačiau jie niekada nelaikomi sesijomis
(#13298).

Tikrinama naudojant `isDashboardSessionAuthenticated()`, esančią `src/shared/utils/apiAuth.ts`. Seka automatiškai atnaujina JWT, kai iš jo 30 dienų galiojimo laikotarpio lieka mažiau nei 7 dienos.

Kai kurie valdymo maršrutai priima **bet kurį** režimą: slapuką ARBA `Bearer <key>`, kai API raktas turi `manage` (arba `admin`) aprėptį. Būtent tai suteikia galimybę naudoti „konfigūravimo per API iškvietimus“ darbo eigą, pridėtą v3.8.

#### Pasirenkamas OIDC prisijungimo barjeras (#6973)

Valdymo skydelio administratoriaus prisijungimas kartu su numatytuoju prisijungimu naudojant slaptažodį taip pat palaiko **pasirenkamą** OIDC (OpenID Connect) eigą — prisijungimas naudojant slaptažodį niekada nepašalinamas, tik papildomas:

- Išjungta, nebent `settings.oidcEnabled === true` **ir** `oidcIssuer` /
  `oidcClientId` / `oidcClientSecret` yra sukonfigūruoti (Nustatymai → Autentifikavimas).
  Priešingu atveju `GET /api/auth/oidc/login` grąžina `400`.
- `GET /api/auth/oidc/login` aptinka `authorization_endpoint` iš išdavėjo
  `/.well-known/openid-configuration` (jei nepavyksta, naudojamas
  `<issuer>/authorize`), sukuria peradresavimo URI pagal gaunamą užklausą
  (atsižvelgdamas į `x-forwarded-proto`) ir peradresuoja į IdP, kartu perduodamas atsitiktinę `state`
  reikšmę, saugomą `httpOnly` `oidc_state` slapuke.
- `GET /api/auth/oidc/callback` patikrina `state`, iškeičia autorizavimo
  kodą ir patikrina ID žetono parašą naudodamas išdavėjo JWKS
  (`jose` funkciją `createRemoteJWKSet`, talpykloje saugomą pagal kiekvieną JWKS URI), atlikdamas `issuer` / `audience`
  patikras. Pasirenkamas `oidcAllowedSubjects` leidžiamųjų reikšmių sąrašas lyginamas su žetono
  `sub` arba `email` deklaracija — į el. pašto deklaraciją atsižvelgiama tik tada, kai
  `email_verified === true`, todėl IdP nepatvirtintas el. pašto adresas niekada negali
  įveikti šio barjero.
- Sėkmės atveju išduodamas **visiškai toks pats** 30 dienų `auth_token` JWT, kokį išduoda prisijungimas
  naudojant slaptažodį (`src/app/api/auth/login/route.ts`), todėl likusi
  valdymo skydelio sesijos seka (automatinis atnaujinimas, slapuko žymos) nesikeičia —
  OIDC pakeičia tik tai, kaip išduodamas slapukas, o ne jo suteikiamas teises.

## Maršrutų klasės

`src/server/authz/types.ts` apibrėžia tris klases; bet kuris maršrutas, kurio negalima deterministiškai klasifikuoti, priskiriamas `MANAGEMENT`.

| Klasė        | Aprašas                                                                                                                                                                      | Būtinas autentifikavimas                                               |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| `PUBLIC`     | Aiškiai saugūs maršrutai — prisijungimas, atsijungimas, būsena, inicijavimas, veikimo patikra, pirminis parengimas.                                                          | Nereikalingas                                                          |
| `CLIENT_API` | Modelių aptarnavimo galiniai taškai — `/api/v1/*`, `/api/v1beta/*` ir alternatyvūs maršrutai `/v1/*`, `/v1beta/*`, `/chat/completions`, `/responses`, `/models`, `/codex/*`. | Bearer raktas, kai įjungta galiojanti `REQUIRE_API_KEY` funkcijos žyma |
| `MANAGEMENT` | Valdymo skydelio puslapiai, nustatymai, teikėjai, raktai, administravimo ir diagnostikos galiniai taškai.                                                                    | Valdymo skydelio sesija ARBA Bearer su `manage` aprėptimi              |

## Vykdymo seka

```
Gaunama užklausa → src/proxy.ts
  → runAuthzPipeline(), esanti src/server/authz/pipeline.ts
    1. Pašalinti patikimas vidines antraštes (x-omniroute-auth-*, x-omniroute-route-class)
    2. Sugeneruoti užklausos ID, klasifikuoti maršrutą naudojant classifyRoute()
    3. Jei pathname == "/" → peradresuoti į /dashboard
    4. Jei vykdomas užbaigimas (tvarkingas išjungimas) ir /api/* → 503
    5. Jei ne GET /api/* → taikyti checkBodySize() apsaugą
    6. Jei OPTIONS → CORS pirminė užklausa 204
    7. Jei options.enforce == false → praleisti toliau su maršruto klasės antraštėmis
    8. Kitu atveju: POLICIES[routeClass].evaluate(ctx)
       - allow  → pridėti x-omniroute-auth-{kind,id,label,scopes} → NextResponse.next()
       - reject → JSON klaida su correlation_id (valdymo skydelio puslapiams → 302 /login)
```

Patikimos vidinės antraštės (apibrėžtos `src/server/authz/headers.ts`) yra **pašalinamos iš gaunamų užklausų** prieš klasifikuojant — klientai negali iš anksto nustatyti `x-omniroute-auth-*`, kad apsimestų kitu subjektu.

### Politikų sutartys

Kiekviena maršrutų klasė turi politiką kataloge `src/server/authz/policies/`:

- **`publicPolicy`** (`policies/public.ts`) — visada grąžina `allow({ kind: "anonymous", id: "anonymous" })`.
- **`clientApiPolicy`** (`policies/clientApi.ts`) — išskiria Bearer, patikrina naudodama `validateApiKey()`. Anoniminė prieiga leidžiama tik tada, kai galiojanti `REQUIRE_API_KEY` funkcijos žyma yra išjungta. Galiojanti žyma nustatoma naudojant `isRequireApiKeyEnabled()` (`DB funkcijos žymos perrašymas > process.env.REQUIRE_API_KEY > numatytoji reikšmė`), todėl valdymo skydelio funkcijų žymos ir aplinkos kintamieji nuosekliai valdo `/api/v1/*`, `/api/v1beta/*` ir alternatyvius maršrutus; sprendiklio klaidos užblokuoja prieigą. Kliento API maršrutuose leidžia valdymo skydelio sesijos užklausas (įskaitant `/api/v1/models`, kurį naudoja valdymo skydelio modelių katalogas).
- **`managementPolicy`** (`policies/management.ts`) — priima valdymo skydelio sesiją, vidines modelių sinchronizavimo užklausas (atitinkančias `/api/providers/[name]/(sync-models|models)`) arba visiškai praleidžia patikrą, jei `isAuthRequired()` grąžina false. Kai pateiktas Bearer prieigos raktas yra netinkamas, grąžina 403 (`AUTH_001`), kitu atveju — 401. Be to, prieš bet kurią autentifikavimo šaką taiko maršrutų apsaugos lygius (LOCAL_ONLY / ALWAYS_PROTECTED) — žr. [Maršrutų apsaugos lygiai](../security/ROUTE_GUARD_TIERS.md). `LOCAL_ONLY` keliai, esantys `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` (šiuo metu: `/api/mcp/`), gali būti pasiekiami ne iš vietinio grįžtamojo ryšio adreso, kai Bearer raktas turi `manage` aprėptį; visi kiti `LOCAL_ONLY` keliai išlieka griežtai pasiekiami tik per vietinį grįžtamojo ryšio adresą, nepriklausomai nuo aprėpties.

Sėkminga politika grąžina `AuthSubject`, kurio `kind ∈ { client_api_key, dashboard_session, management_key, anonymous }`. Tolesnės apdorojimo funkcijos gali jį nuskaityti naudodamos `assertAuth(request, "CLIENT_API")`, esančią `src/server/authz/assertAuth.ts`, užuot iš naujo vykdžiusios autentifikavimo logiką.

## Viešųjų maršrutų sąrašas

`src/shared/constants/publicApiRoutes.ts` yra aiškus leidžiamų maršrutų sąrašas:

Sąrašas suskirstytas pagal **formą**, ir šis suskirstymas yra kritiškai svarbus (GHSA-74g9-q8f6-793h): prefiksas lyginamas naudojant `startsWith()`, todėl jis taip pat atitinka kiekvieną gretimą kelią, turintį tuos pačius pradinius simbolius.
Naudojant `/api/usage/om-usage` kaip prefiksą, `/api/usage/om-usage<anything>` buvo pažymėtas kaip VIEŠAS, o Next jį susieja su
`/api/usage/[connectionId]` — apdorojimo funkcija, kuri pati neatlieka autentifikavimo.

```ts
// Tikri pomedžiai. Kiekvienas įrašas PRIVALO baigtis „/“ (tai tikrinama vienetiniu testu).
PUBLIC_API_ROUTE_PREFIXES = [
  "/api/auth/oidc/",
  "/api/v1/", // „classify“ funkcijoje laikoma CLIENT_API, o ne „vieša be autentifikavimo“
  "/api/oauth/",
  "/api/codex/connect/",
  "/api/telegram/",
  "/api/cursor-cli/",
];

// Atskiri maršrutai, lyginami TIKSLIAI (su baigiamuoju pasviruoju brūkšniu arba be jo).
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

// Tik skaitymui skirti atskiri maršrutai, kuriems taip pat taikomas CORS kilmės apribojimo sušvelninimas.
PUBLIC_READONLY_CORS_API_ROUTES = [
  "/api/health/ping",
  "/api/monitoring/health",
  "/api/settings/require-login",
];

// Tik skaitymui skirtas atskiras maršrutas BE CORS apribojimo sušvelninimo.
PUBLIC_READONLY_API_ROUTES_EXACT = new Set(["/api/health"]);

PUBLIC_READONLY_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
```

Tik skaitymui skirti maršrutai yra vieši **tik** naudojant saugius metodus. Pastaba: `classifyRoute()` neįtraukia `/api/v1/*` ir `/api/v1beta/*` į PUBLIC numatytąjį atvejį — jie visada yra `CLIENT_API`, todėl Bearer rakto politika vis tiek taikoma.

## Naujo maršruto pridėjimas

### 1 šablonas — viešasis kliento API galinis taškas (Bearer autentifikavimas)

Maršrutai, esantys `/api/v1/` ir `/api/v1beta/`, automatiškai klasifikuojami kaip `CLIENT_API`. Tarpinė programinė įranga užtikrina Bearer patikrą; maršrutų apdorojimo funkcijoms nereikia jos kartoti, tačiau prireikus jos gali nuskaityti subjektą.

```typescript
// src/app/api/v1/your-route/route.ts
import { NextRequest, NextResponse } from "next/server";
import { assertAuth } from "@/server/authz/assertAuth";

export async function POST(req: NextRequest) {
  const subject = assertAuth(req, "CLIENT_API");
  // subject.kind === "client_api_key" | "anonymous" | "dashboard_session"
  // ... apdorojimo funkcijos logika
}
```

### 2 šablonas — valdymo galinis taškas (seansas arba Bearer + manage)

Naudokite `requireManagementAuth()` iš `src/lib/api/requireManagementAuth.ts`:

```typescript
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

export async function POST(request: Request) {
  const rejection = await requireManagementAuth(request);
  if (rejection) return rejection;
  // ... apdorojimo funkcijos logika
}
```

Sėkmės atveju `requireManagementAuth()` grąžina `null`, o klaidos atveju — JSON klaidos objektą `Response`:

- 401 `AUTH_001` "Būtina autentifikuotis" — visiškai nėra prisijungimo duomenų
- 403 — netinkamas Bearer **arba** Bearer pateiktas, tačiau raktas neturi `manage` / `admin` aprėpties

`hasManageScope(scopes)` grąžina „true“, jei yra `"manage"` arba `"admin"`.

### 3 šablonas — įtraukimas į viešąjį leidžiamų maršrutų sąrašą

Rinkinį pasirinkite pagal formą, o ne pagal patogumą. Vienas maršrutas įtraukiamas į `PUBLIC_API_ROUTES_EXACT` (arba į `PUBLIC_READONLY_CORS_API_ROUTES`, jei jis skirtas tik GET); į `PUBLIC_API_ROUTE_PREFIXES` įtraukiamas tik tikras pomedis, ir jis **privalo baigtis `/`**. Į prefiksų sąrašą įtraukus vieną maršrutą, taip pat paviešinamas kiekvienas gretimas kelias, turintis tuos pačius pradinius simbolius, įskaitant vėliau pridėtus giminingus maršrutus su dinaminiais segmentais (GHSA-74g9-q8f6-793h). Atnaujinkite vienetinius testus failuose `tests/unit/public-api-routes.test.ts`, `tests/unit/authz/public-route-exact-match.test.ts` ir `tests/unit/authz/classify.test.ts`.

## Aprėptys

API raktai turi `scopes` masyvą (saugomą JSON formatu `api_keys.scopes`, žr. `src/lib/db/apiKeys.ts`).

### Valdymo aprėptis

- `manage` / `admin` — suteikia raktui prieigą prie valdymo API galinių taškų, kai jis siunčiamas kaip Bearer prieigos raktas.

### MCP aprėptys (`src/shared/constants/mcpScopes.ts`)

Kiekvienam MCP įrankiui per `MCP_TOOL_SCOPES` reikalingos konkrečios aprėptys. Visas sąrašas (`MCP_SCOPE_LIST`):

```
read:health, read:combos, write:combos, read:quota, read:usage,
read:models, execute:completions, execute:search, write:budget,
write:resilience, pricing:write, read:cache, write:cache,
read:compression, write:compression, read:proxies
```

Tikrinant aprėptis faile `open-sse/mcp-server/server.ts`, kiekvieno įrankio aprėpčių sąrašas perduodamas į
`evaluateToolScopes()` po to, kai `resolveCallerScopeContext()` nustato aprėptis pagal MCP autentifikavimo informaciją,
užklausos metaduomenis arba `OMNIROUTE_MCP_SCOPES`.

## Privalomo autentifikavimo perjungiklis

`isAuthRequired()` faile `src/shared/utils/apiAuth.ts` nustato, ar užklausai taikomas **koks nors** autentifikavimas:

- `settings.requireLogin === false` → autentifikavimas visuotinai išjungtas.
- Nesukonfigūruotas slaptažodis **ir** nėra `INITIAL_PASSWORD` aplinkos kintamojo → pradinės sąrankos režimu leidžiama naudoti parengimo vedlį ir siųsti užklausas iš vietinio grįžtamojo ryšio adreso, tačiau išoriniame tinkle siunčiamoms užklausoms vis tiek reikia prisijungimo duomenų.
- Bet kokia DB klaida → prieiga uždraudžiama (pagal numatytąją nuostatą užtikrinant saugumą).

Kliento API rakto reikalavimas tikrinamas naudojant `isRequireApiKeyEnabled()` faile `src/shared/utils/featureFlags.ts`, o ne tiesiogiai nuskaitant `process.env.REQUIRE_API_KEY`. Tai svarbu įdiegtuose egzemplioriuose: perjungus `REQUIRE_API_KEY` skiltyje Dashboard → Feature Flags, DB įrašoma pakeičianti nuostata, kuri iš karto paveikia `/v1/*`, `/v1beta/*`, `/models`, `/responses`, `/chat/completions`, `/codex/*` ir kitas kliento API autentifikavimo patikras, naudojančias šią pagalbinę funkciją. Jei funkcijų požymių saugyklos nuskaityti nepavyksta, kliento API autentifikavimas uždraudžia prieigą ir reikalauja rakto.

## Nesuderinamas pakeitimas — v3.8.0

Galiniams taškams `/api/v1/agents/tasks/*` ir `/api/resilience/model-cooldowns` **dabar reikalingas valdymo autentifikavimas** (įsipareigojimas `588a0333`). Klientai, anksčiau siuntę įprastą API raktą be `manage` aprėpties, gauna `403`. Migravimas: API Keys valdymo skydelyje suteikite raktui `manage` aprėptį arba naudokite prisijungto valdymo skydelio seansą.

## Veikimo pakeitimas — v3.8.2

`/api/mcp/*` (nuotolinis MCP serveris) pagal numatytąją nuostatą tebėra LOCAL_ONLY, tačiau dabar priima užklausas ne iš vietinio grįžtamojo ryšio adreso, kai antraštėje `Authorization: Bearer <api-key>` pateiktas raktas turi `manage` aprėptį. Ši išimtis kiekvienam keliui aiškiai valdoma per `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` faile `src/server/authz/routeGuard.ts`; susijusio LOCAL_ONLY prefikso `/api/cli-tools/runtime/*` tyčia negalima apeiti, nes jis gali paleisti bet kokius antrinius procesus. Anoniminėms užklausoms į `/api/mcp/*` ne iš vietinio grįžtamojo ryšio adreso ir toliau grąžinama `403 LOCAL_ONLY` — bet kuriam naujam LOCAL_ONLY keliui pagal numatytąją nuostatą tebėra taikomas griežtas vietinio grįžtamojo ryšio adreso reikalavimas. Žr. [Maršrutų apsaugos lygiai](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out).

## Testavimas

- Vienetų testai: `tests/unit/authz/` — `classify.test.ts`, `pipeline.test.ts`, `client-api-policy.test.ts`, `management-policy.test.ts`, `public-policy.test.ts`.
- Viešasis leidžiamų elementų sąrašas: `tests/unit/public-api-routes.test.ts`.
- Tikslinis paleidimas: `node --import tsx/esm --test tests/unit/authz/classify.test.ts`.

## Derinimas

Apdorojimo grandinė atsakymuose visada prideda šias antraštes:

```
x-request-id:               <koreliacijos ID, pakartojamas klaidų atsakymų turinyje>
x-omniroute-route-class:    PUBLIC | CLIENT_API | MANAGEMENT
```

Autentifikuotų užklausų atveju aukštesnio lygio sistemos (apdorojimo funkcijos pusėje) užklausų antraštėse taip pat yra:

```
x-omniroute-auth-kind:      client_api_key | dashboard_session | management_key | anonymous
x-omniroute-auth-id:        key_<paskutiniai 4> | "dashboard" | "anonymous"
x-omniroute-auth-label:     (neprivaloma)
x-omniroute-auth-scopes:    kableliais atskirtas sąrašas
```

Apdorojimo funkcijose naudokite `assertAuth(req, expectedClass)` — ši funkcija išmeta `AuthzAssertionError` su kodu `AUTHZ_NOT_INITIALIZED`, jei tarpinė programinė įranga buvo apeita (tai naudinga bandymuose aptinkant konfigūracijos regresijas).

## Taip pat žr.

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — kiekvieno galinio taško autentifikavimo žymuo
- [COMPLIANCE.md](../security/COMPLIANCE.md) — autentifikavimo įvykių audito žurnalas
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md) — išsami informacija apie MCP aprėpties užtikrinimą
- Šaltinis: `src/server/authz/`, `src/lib/api/requireManagementAuth.ts`
