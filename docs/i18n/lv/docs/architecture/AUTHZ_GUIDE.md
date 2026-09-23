# Authorization Guide (Latviešu)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/AUTHZ_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/AUTHZ_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/AUTHZ_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/AUTHZ_GUIDE.md)

---

> **Patiesības avots:** `src/server/authz/`, `src/shared/constants/publicApiRoutes.ts`, `src/lib/api/requireManagementAuth.ts`, `src/shared/utils/apiAuth.ts`
> **Pēdējoreiz atjaunināts:** 2026-06-28 — v3.8.40

OmniRoute izmanto maršrutus apzinošu autorizācijas konveijeru, kas kontrolē katru API pieprasījumu. Klasifikācija ir **deterministiska** un **kļūmes gadījumā slēgta** — viss, ko nevar klasificēt, tiek klasificēts kā `MANAGEMENT`, un tam ir nepieciešama sesija vai pārvaldības līmeņa pilnvara. Šajā lapā ir izskaidrots modelis inženieriem, kuri uztur maršrutus vai izstrādā jaunus galapunktus.

![AuthZ konveijers (3 maršrutu klases + politiku izvērtēšana)](../diagrams/exported/authz-pipeline.svg)

> Avots: [diagrams/authz-pipeline.mmd](../diagrams/authz-pipeline.mmd)

## Divi autentifikācijas režīmi

### 1. API atslēga (Bearer)

Tiek izmantota ar OpenAI/Anthropic/Gemini saderīgajām klientu API un dažiem pārvaldības maršrutiem, ja atslēgai ir tvērums `manage`.

```
Authorization: Bearer <api-key>
```

To validē `isValidApiKey()` / `extractApiKey()` failā `src/sse/services/auth.ts`, un tā tiek atkārtoti eksportēta, izmantojot `src/shared/utils/apiAuth.ts`. Validētājs pieņem arī vides mainīgos `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` kā pastāvīgas tranzīta atslēgas (problēma #1350).

### 2. Informācijas paneļa sesija (`auth_token` sīkdatne)

Informācijas paneļa lapām un administratora darbībām.

```
Cookie: auth_token=<JWT signed with JWT_SECRET>
```

Sīkdatne ir sesija tikai tad, ja JWT ir sekmīgi pārbaudīts **un** satur `authenticated: true`
(`src/shared/utils/dashboardSessionToken.ts` → `verifyDashboardSessionToken`). Katrs
sīkdatnes patērētājs (maršruta aizsargs, authz konveijera atsvaidzināšana, WebSocket rokasspiediens, tiešraides
serveris, `/api/settings/require-login`, `/api/auth/status`) izmanto šo palīgfunkciju.
Pastāv arī citi JWT, kas parakstīti ar `JWT_SECRET` — Cursor CLI tranzīta mehānisms atslēgu
turētājiem izveido pilnvaras ar `iss "omniroute" / aud "cursor-cli"` —, un tie nekad nav sesijas
(#13298).

To pārbauda `isDashboardSessionAuthenticated()` failā `src/shared/utils/apiAuth.ts`. Konveijers automātiski atsvaidzina JWT, ja līdz tā 30 dienu derīguma termiņa beigām ir atlikušas mazāk nekā 7 dienas.

Daži pārvaldības maršruti pieņem **jebkuru** no abiem režīmiem: sīkdatni VAI `Bearer <key>`, ja API atslēgai ir tvērums `manage` (vai `admin`). Tas nodrošina darbplūsmu „konfigurējams, izmantojot API izsaukumus”, kas tika pievienota versijā v3.8.

#### Neobligāta OIDC pieteikšanās piekļuves kontrole (#6973)

Informācijas paneļa administratora pieteikšanās atbalsta arī **brīvprātīgi iespējojamu** OIDC (OpenID Connect) plūsmu
līdzās noklusējuma pieteikšanās metodei ar paroli — pieteikšanās ar paroli nekad netiek noņemta, bet tikai
papildināta:

- Tā ir atspējota, ja vien `settings.oidcEnabled === true` **un** visi parametri `oidcIssuer` /
  `oidcClientId` / `oidcClientSecret` nav konfigurēti (Iestatījumi → Autentifikācija).
  Pretējā gadījumā `GET /api/auth/oidc/login` atgriež `400`.
- `GET /api/auth/oidc/login` nosaka `authorization_endpoint` no izdevēja
  `/.well-known/openid-configuration` (atkāpvariantā izmanto
  `<issuer>/authorize`), izveido novirzīšanas URI no ienākošā pieprasījuma
  (ņemot vērā `x-forwarded-proto`) un novirza uz IdP ar nejauši ģenerētu `state`,
  kas tiek glabāts `httpOnly` sīkdatnē `oidc_state`.
- `GET /api/auth/oidc/callback` validē `state`, apmaina autorizācijas
  kodu un pārbauda ID pilnvaras parakstu, izmantojot izdevēja JWKS
  (`jose` funkciju `createRemoteJWKSet`, kas tiek kešota katram JWKS URI), kā arī veicot `issuer`/`audience`
  pārbaudes. Neobligāts `oidcAllowedSubjects` atļauto vērtību saraksts tiek salīdzināts ar pilnvaras
  deklarāciju `sub` vai deklarāciju `email` — e-pasta deklarācija tiek ņemta vērā tikai tad, ja
  `email_verified === true`, tādēļ IdP nepārbaudīta e-pasta adrese nekad nevar izturēt
  piekļuves pārbaudi.
- Veiksmes gadījumā tiek izveidots **tieši tāds pats** 30 dienu `auth_token` JWT, kādu izsniedz pieteikšanās
  ar paroli (`src/app/api/auth/login/route.ts`), tādēļ pārējais
  informācijas paneļa sesijas konveijers (automātiskā atsvaidzināšana, sīkdatņu karodziņi) paliek nemainīgs —
  OIDC aizstāj tikai sīkdatnes izveides veidu, nevis tās piešķirtās tiesības.

## Maršrutu klases

`src/server/authz/types.ts` definē trīs klases; jebkurš maršruts, kuru nevar deterministiski klasificēt, pēc noklusējuma tiek klasificēts kā `MANAGEMENT`.

| Klase        | Apraksts                                                                                                                                                             | Nepieciešamā autentifikācija                                                         |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| `PUBLIC`     | Nepārprotami droši maršruti — pieteikšanās, atteikšanās, statuss, inicializācija, darbspējas pārbaude, sākotnējā iestatīšana.                                        | Nav                                                                                  |
| `CLIENT_API` | Modeļu apkalpošanas galapunkti — `/api/v1/*`, `/api/v1beta/*`, kā arī aizstājējvārdi `/v1/*`, `/v1beta/*`, `/chat/completions`, `/responses`, `/models`, `/codex/*`. | Bearer atslēga, ja ir iespējots efektīvais `REQUIRE_API_KEY` funkcionalitātes karogs |
| `MANAGEMENT` | Informācijas paneļa lapas, iestatījumi, nodrošinātāji, atslēgas, administrēšanas un diagnostikas galapunkti.                                                         | Informācijas paneļa sesija VAI Bearer ar `manage` tvērumu                            |

## Konveijers

```
Ienākošais pieprasījums → src/proxy.ts
  → runAuthzPipeline() failā src/server/authz/pipeline.ts
    1. Noņemt uzticamos iekšējos header laukus (x-omniroute-auth-*, x-omniroute-route-class)
    2. Ģenerēt pieprasījuma id, klasificēt maršrutu ar classifyRoute()
    3. Ja pathname == "/" → novirzīt uz /dashboard
    4. Ja notiek pieprasījumu apkalpošanas pārtraukšana (graceful shutdown) un /api/* → 503
    5. Ja /api/* pieprasījums nav GET → checkBodySize() pārbaude
    6. Ja OPTIONS → CORS pirmslidojuma pārbaude 204
    7. Ja options.enforce == false → turpināt apstrādi ar maršruta klases header laukiem
    8. Pretējā gadījumā: POLICIES[routeClass].evaluate(ctx)
       - atļaut  → pievienot x-omniroute-auth-{kind,id,label,scopes} → NextResponse.next()
       - noraidīt → JSON kļūda ar correlation_id (informācijas paneļa lapas → 302 /login)
```

Uzticamie iekšējie header lauki (definēti `src/server/authz/headers.ts`) tiek **noņemti no ienākošajiem pieprasījumiem** pirms klasifikācijas — klienti nevar iepriekš pievienot `x-omniroute-auth-*`, lai uzdotos par subjektu.

### Politiku līgumi

Katrai maršrutu klasei ir politika direktorijā `src/server/authz/policies/`:

- **`publicPolicy`** (`policies/public.ts`) — vienmēr atgriež `allow({ kind: "anonymous", id: "anonymous" })`.
- **`clientApiPolicy`** (`policies/clientApi.ts`) — izgūst Bearer un validē to ar `validateApiKey()`. Pāriet uz anonīmu piekļuvi tikai tad, ja efektīvais `REQUIRE_API_KEY` funkcionalitātes karogs ir atspējots. Efektīvais karogs tiek noteikts ar `isRequireApiKeyEnabled()` (`DB funkcionalitātes karoga pārrakstīšana > process.env.REQUIRE_API_KEY > noklusējums`), lai informācijas paneļa funkcionalitātes karogi un vides mainīgie konsekventi pārvaldītu `/api/v1/*`, `/api/v1beta/*` un aizstājējvārdus; atrisinātāja kļūmes izraisa piekļuves liegšanu. Atļauj informācijas paneļa sesijas pieprasījumus klienta API maršrutos (tostarp `/api/v1/models`, ko izmanto informācijas paneļa modeļu katalogs).
- **`managementPolicy`** (`policies/management.ts`) — pieņem informācijas paneļa sesiju un iekšējos modeļu sinhronizācijas pieprasījumus (kas atbilst `/api/providers/[name]/(sync-models|models)`) vai pilnībā izlaiž pārbaudi, ja `isAuthRequired()` atgriež false. Atgriež 403 (`AUTH_001`), ja Bearer pilnvara ir norādīta, bet nederīga; citos gadījumos atgriež 401. Pirms jebkura autentifikācijas atzara piemēro arī maršrutu aizsardzības līmeņus (LOCAL_ONLY / ALWAYS_PROTECTED) — skatiet [Maršrutu aizsardzības līmeņi](../security/ROUTE_GUARD_TIERS.md). `LOCAL_ONLY` ceļiem, kas iekļauti `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` (pašlaik: `/api/mcp/`), var piekļūt no adresēm ārpus lokālās atgriezeniskās cilpas, ja Bearer atslēgai ir `manage` tvērums; visi pārējie `LOCAL_ONLY` ceļi neatkarīgi no tvēruma joprojām ir stingri pieejami tikai no lokālās atgriezeniskās cilpas.

Sekmīga politika atgriež `AuthSubject` ar `kind ∈ { client_api_key, dashboard_session, management_key, anonymous }`. Pakārtotie apstrādātāji var to nolasīt ar `assertAuth(request, "CLIENT_API")` failā `src/server/authz/assertAuth.ts`, atkārtoti neizpildot autentifikācijas loģiku.

## Publisko maršrutu saraksts

`src/shared/constants/publicApiRoutes.ts` ir skaidri definētais atļauto maršrutu saraksts:

Saraksts ir sadalīts pēc **struktūras**, un šis sadalījums ir kritiski svarīgs (GHSA-74g9-q8f6-793h): prefikss tiek
salīdzināts ar `startsWith()`, tādēļ tas atbilst arī katram blakus esošajam ceļam ar tādiem pašiem sākuma simboliem.
Prefikss `/api/usage/om-usage` padarīja `/api/usage/om-usage<anything>` PUBLISKU, un Next to novirza uz
`/api/usage/[connectionId]` — apstrādātāju bez savas autentifikācijas.

```ts
// Īsti apakškoki. Katram ierakstam OBLIGĀTI jābeidzas ar "/" (to pārbauda vienībtests).
PUBLIC_API_ROUTE_PREFIXES = [
  "/api/auth/oidc/",
  "/api/v1/", // klasifikācijā apstrādāts kā CLIENT_API, nevis kā publisks bez autentifikācijas
  "/api/oauth/",
  "/api/codex/connect/",
  "/api/telegram/",
  "/api/cursor-cli/",
];

// Atsevišķi maršruti, kas tiek salīdzināti PRECĪZI (ar vai bez beigu slīpsvītras).
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

// Atsevišķi tikai lasāmi maršruti, kuriem piemēro arī CORS izcelsmes ierobežojuma atvieglojumu.
PUBLIC_READONLY_CORS_API_ROUTES = [
  "/api/health/ping",
  "/api/monitoring/health",
  "/api/settings/require-login",
];

// Atsevišķs tikai lasāms maršruts BEZ CORS ierobežojuma atvieglojuma.
PUBLIC_READONLY_API_ROUTES_EXACT = new Set(["/api/health"]);

PUBLIC_READONLY_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
```

Tikai lasāmi maršruti ir publiski **tikai** drošajām metodēm. Piezīme: `classifyRoute()` izslēdz `/api/v1/*` un `/api/v1beta/*` no PUBLIC noklusējuma klasifikācijas — tie vienmēr ir `CLIENT_API`, lai joprojām tiktu piemērota Bearer atslēgas politika.

## Jauna maršruta pievienošana

### 1. modelis — publisks klienta API galapunkts (Bearer autentifikācija)

Maršruti zem `/api/v1/` un `/api/v1beta/` tiek automātiski klasificēti kā `CLIENT_API`. Starpprogrammatūra veic Bearer pārbaudi; maršrutu apstrādātājiem tā nav jāatkārto, bet vajadzības gadījumā tie var nolasīt subjektu.

```typescript
// src/app/api/v1/your-route/route.ts
import { NextRequest, NextResponse } from "next/server";
import { assertAuth } from "@/server/authz/assertAuth";

export async function POST(req: NextRequest) {
  const subject = assertAuth(req, "CLIENT_API");
  // subject.kind === "client_api_key" | "anonymous" | "dashboard_session"
  // ... apstrādātāja loģika
}
```

### 2. modelis — pārvaldības galapunkts (sesija vai Bearer + manage)

Izmantojiet `requireManagementAuth()` no `src/lib/api/requireManagementAuth.ts`:

```typescript
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

export async function POST(request: Request) {
  const rejection = await requireManagementAuth(request);
  if (rejection) return rejection;
  // ... apstrādātāja loģika
}
```

Veiksmes gadījumā `requireManagementAuth()` atgriež `null`, bet kļūdas gadījumā — JSON kļūdas `Response`:

- 401 `AUTH_001` "Nepieciešama autentifikācija" — akreditācijas datu nav vispār
- 403 — nederīgs Bearer **vai** Bearer ir norādīts, bet atslēgai nav tvēruma `manage` / `admin`

`hasManageScope(scopes)` atgriež true vērtībai `"manage"` vai `"admin"`.

### 3. modelis — pievienošana publiskajam atļauto maršrutu sarakstam

Izvēlieties kopu pēc struktūras, nevis ērtības. Viens maršruts jāievieto `PUBLIC_API_ROUTES_EXACT` (vai `PUBLIC_READONLY_CORS_API_ROUTES`, ja atļauts tikai GET); tikai īsts apakškoks jāievieto `PUBLIC_API_ROUTE_PREFIXES`, un tam **obligāti jābeidzas ar `/`**. Ievietojot vienu maršrutu prefiksu sarakstā, tiek publicēts arī katrs blakus esošais ceļš ar tādiem pašiem sākuma simboliem — tostarp vēlāk pievienoti dinamisko segmentu līdzvērtīgie maršruti (GHSA-74g9-q8f6-793h). Atjauniniet vienībtestus failos `tests/unit/public-api-routes.test.ts`, `tests/unit/authz/public-route-exact-match.test.ts` un `tests/unit/authz/classify.test.ts`.

## Tvērumi

API atslēgām ir `scopes` masīvs (saglabāts kā JSON laukā `api_keys.scopes`; skatiet `src/lib/db/apiKeys.ts`).

### Pārvaldības tvērums

- `manage` / `admin` — piešķir atslēgai piekļuvi pārvaldības API galapunktiem, ja tā tiek nosūtīta kā Bearer pilnvara.

### MCP tvērumi (`src/shared/constants/mcpScopes.ts`)

Katram MCP rīkam ir nepieciešami konkrēti tvērumi, kas definēti, izmantojot `MCP_TOOL_SCOPES`. Pilns saraksts (`MCP_SCOPE_LIST`):

```
read:health, read:combos, write:combos, read:quota, read:usage,
read:models, execute:completions, execute:search, write:budget,
write:resilience, pricing:write, read:cache, write:cache,
read:compression, write:compression, read:proxies
```

Tvērumu piemērošana failā `open-sse/mcp-server/server.ts` nodod katra rīka tvērumu sarakstu funkcijai
`evaluateToolScopes()` pēc tam, kad `resolveCallerScopeContext()` ir noteikusi tvērumus no MCP autentifikācijas informācijas,
pieprasījuma metadatiem vai `OMNIROUTE_MCP_SCOPES`.

## Autentifikācijas prasības pārslēgs

`isAuthRequired()` failā `src/shared/utils/apiAuth.ts` nosaka, vai pieprasījumam tiek piemērota **jebkāda** autentifikācija:

- `settings.requireLogin === false` → autentifikācija ir globāli atspējota.
- Nav konfigurēta parole **un** nav vides mainīgā `INITIAL_PASSWORD` → sāknēšanas režīms atļauj sākotnējās iestatīšanas vedni un lokālās atgriezeniskās cilpas pieprasījumus, taču no tīkla pieejamiem pieprasījumiem joprojām ir nepieciešami akreditācijas dati.
- Jebkura DB kļūda → piekļuve tiek liegta (drošība pēc noklusējuma).

Klienta API atslēgas prasības piemērošanai tiek izmantota `isRequireApiKeyEnabled()` failā `src/shared/utils/featureFlags.ts`, nevis tieša `process.env.REQUIRE_API_KEY` nolasīšana. Tas ir svarīgi izvietotām instancēm: pārslēdzot `REQUIRE_API_KEY` sadaļā Dashboard → Feature Flags, DB tiek saglabāta pārrakstīšanas vērtība, kas nekavējoties ietekmē `/v1/*`, `/v1beta/*`, `/models`, `/responses`, `/chat/completions`, `/codex/*` un citas klienta API autentifikācijas pārbaudes, kurās tiek izmantota šī palīgfunkcija. Ja funkciju karodziņu krātuvi nevar nolasīt, klienta API autentifikācija liedz piekļuvi un pieprasa atslēgu.

## Nesaderīgas izmaiņas — v3.8.0

Galapunktiem `/api/v1/agents/tasks/*` un `/api/resilience/model-cooldowns` **tagad ir nepieciešama pārvaldības autentifikācija** (komits `588a0333`). Klienti, kas iepriekš nosūtīja parastu API atslēgu bez `manage` tvēruma, saņem `403`. Migrācija: piešķiriet atslēgai `manage` tvērumu API Keys informācijas panelī vai izmantojiet informācijas paneļa sesiju, kurā esat pieteicies.

## Darbības izmaiņas — v3.8.2

`/api/mcp/*` (attālais MCP serveris) pēc noklusējuma joprojām ir LOCAL_ONLY, taču tagad pieņem pieprasījumus, kas nav no lokālās atgriezeniskās cilpas, ja galvene `Authorization: Bearer <api-key>` ietver `manage` tvērumu. Šis izņēmums katram ceļam tiek nepārprotami ierobežots, izmantojot `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` failā `src/server/authz/routeGuard.ts`; saistīto LOCAL_ONLY prefiksu `/api/cli-tools/runtime/*` apzināti nevar apiet, jo tas var palaist patvaļīgus apakšprocesus. Anonīmi pieprasījumi uz `/api/mcp/*`, kas nav no lokālās atgriezeniskās cilpas, joprojām saņem `403 LOCAL_ONLY` — jebkuram jaunam LOCAL_ONLY ceļam pēc noklusējuma joprojām ir spēkā stingra lokālās atgriezeniskās cilpas prasība. Skatiet [Maršrutu aizsarga līmeņi](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out).

## Testēšana

- Vienībtesti: `tests/unit/authz/` — `classify.test.ts`, `pipeline.test.ts`, `client-api-policy.test.ts`, `management-policy.test.ts`, `public-policy.test.ts`.
- Publiskais atļauto maršrutu saraksts: `tests/unit/public-api-routes.test.ts`.
- Fokusēta palaišana: `node --import tsx/esm --test tests/unit/authz/classify.test.ts`.

## Atkļūdošana

Konveijers atbildēm vienmēr pievieno šādas galvenes:

```
x-request-id:               <korelācijas id, atkārtots kļūdu atbilžu pamattekstā>
x-omniroute-route-class:    PUBLIC | CLIENT_API | MANAGEMENT
```

Autentificētiem pieprasījumiem augšupstraumes (apdarinātāja puses) pieprasījumu galvenēs ir iekļauts arī:

```
x-omniroute-auth-kind:      client_api_key | dashboard_session | management_key | anonymous
x-omniroute-auth-id:        key_<pēdējie-4> | "dashboard" | "anonymous"
x-omniroute-auth-label:     (neobligāts)
x-omniroute-auth-scopes:    ar komatiem atdalīts saraksts
```

Apdarinātājos izmantojiet `assertAuth(req, expectedClass)` — tas izmet `AuthzAssertionError` ar kodu `AUTHZ_NOT_INITIALIZED`, ja starpprogrammatūra tika apieta (tas palīdz testos konstatēt konfigurācijas regresijas).

## Skatiet arī

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — autentifikācijas marķieris katram galapunktam
- [COMPLIANCE.md](../security/COMPLIANCE.md) — autentifikācijas notikumu audita žurnāls
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md) — detalizēta informācija par MCP tvērumu piemērošanu
- Avots: `src/server/authz/`, `src/lib/api/requireManagementAuth.ts`
