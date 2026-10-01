# Authorization Guide (Suomi)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/AUTHZ_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/AUTHZ_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/AUTHZ_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/AUTHZ_GUIDE.md)

---

> **Totuuden lähde:** `src/server/authz/`, `src/shared/constants/publicApiRoutes.ts`, `src/lib/api/requireManagementAuth.ts`, `src/shared/utils/apiAuth.ts`
> **Viimeksi päivitetty:** 2026-09-22 — laajuuden nimiavaruudet osoittavat tiedostoon MCP-SERVER.md

OmniRoutessa on reittitietoinen valtuutusputki, joka valvoo jokaista API-pyyntöä. Luokittelu on **deterministinen** ja **fail-closed** — kaikki, mitä ei voida luokitella, päätyy `MANAGEMENT`-luokkaan ja vaatii istunnon tai hallintatason tunnuksen. Tämä sivu selittää mallin insinööreille, jotka ylläpitävät reittejä tai suunnittelevat uusia päätepisteitä.

![Valtuutusputki (3 reittiluokkaa + käytäntöjen arviointi)](../diagrams/exported/authz-pipeline.svg)

> Lähde: [diagrams/authz-pipeline.mmd](../diagrams/authz-pipeline.mmd)

## Kaksi todennustapaa

### 1. API-avain (Bearer)

Käytetään OpenAI-/Anthropic-/Gemini-yhteensopivissa asiakas-API-rajapinnoissa sekä joillakin hallintareiteillä, kun avaimella on `manage`-käyttöoikeusalue.

```
Authorization: Bearer <api-avain>
```

Validoinnin tekevät `isValidApiKey()` / `extractApiKey()` tiedostossa `src/sse/services/auth.ts`, ja ne viedään uudelleen tiedoston `src/shared/utils/apiAuth.ts` kautta. Validoija hyväksyy myös ympäristömuuttujat `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` pysyvinä läpivientiavaimina (ongelma #1350).

### 2. Hallintapaneelin istunto (auth_token-eväste)

Hallintapaneelin sivuja ja ylläpitotoimintoja varten.

```
Cookie: auth_token=<JWT, joka on allekirjoitettu JWT_SECRET-arvolla>
```

Eväste on istunto vain, kun JWT:n allekirjoitus varmistetaan **ja** se sisältää arvon `authenticated: true`
(`src/shared/utils/dashboardSessionToken.ts` → `verifyDashboardSessionToken`). Jokainen
evästeen käyttäjä (reittisuojaus, authz-putken päivitys, WebSocket-kättely, reaaliaikainen
palvelin, `/api/settings/require-login`, `/api/auth/status`) käyttää kyseistä apufunktiota.
Muitakin `JWT_SECRET`-arvolla allekirjoitettuja JWT-tunnisteita on olemassa — Cursor CLI:n läpivienti luo
avainten haltijoille tunnisteita, joiden arvot ovat `iss "omniroute" / aud "cursor-cli"` — eivätkä ne koskaan ole istuntoja
(#13298).

Varmistuksen tekee `isDashboardSessionAuthenticated()` tiedostossa `src/shared/utils/apiAuth.ts`. Putki päivittää JWT:n automaattisesti, kun sen 30 päivän voimassaoloajasta on jäljellä alle 7 päivää.

Jotkin hallintareitit hyväksyvät **kumman tahansa** tavan: evästeen TAI `Bearer <key>` -tunnisteen, kun API-avaimella on `manage`- (tai `admin`-) käyttöoikeusalue. Tämä mahdollistaa versiossa v3.8 lisätyn työnkulun, jossa määrityksiä voidaan tehdä API-kutsuilla.

#### Valinnainen OIDC-kirjautumisrajoitus (#6973)

Hallintapaneelin ylläpitäjäkirjautuminen tukee oletusarvoisen salasanakirjautumisen rinnalla myös **valinnaista** OIDC (OpenID Connect) -työnkulkua — salasanakirjautumista ei koskaan poisteta, vaan sitä ainoastaan täydennetään:

- Poissa käytöstä, ellei `settings.oidcEnabled === true` **ja** kaikkia asetuksia `oidcIssuer` /
  `oidcClientId` / `oidcClientSecret` ole määritetty (Asetukset → Todennus).
  Muussa tapauksessa `GET /api/auth/oidc/login` palauttaa arvon `400`.
- `GET /api/auth/oidc/login` hakee `authorization_endpoint`-päätepisteen myöntäjän
  `/.well-known/openid-configuration`-määrityksestä (varavaihtoehtona
  `<issuer>/authorize`), muodostaa uudelleenohjaus-URI:n saapuvasta pyynnöstä
  (`x-forwarded-proto` huomioiden) ja uudelleenohjaa IdP:hen satunnaisella `state`-arvolla,
  joka tallennetaan `httpOnly`-määritteen sisältävään `oidc_state`-evästeeseen.
- `GET /api/auth/oidc/callback` validoi `state`-arvon, vaihtaa valtuutuskoodin
  tunnisteisiin ja varmistaa ID-tunnisteen allekirjoituksen myöntäjän JWKS:n avulla
  (`jose`-paketin `createRemoteJWKSet`, välimuistissa JWKS-URI-kohtaisesti) käyttäen `issuer`/`audience`-
  tarkistuksia. Valinnainen `oidcAllowedSubjects`-sallittujen luettelo vertaa tunnisteen
  `sub`-väitettä tai sen `email`-väitettä — sähköpostiväite huomioidaan vain, kun
  `email_verified === true`, joten IdP:n vahvistamaton sähköpostiosoite ei voi koskaan läpäistä
  rajoitusta.
- Onnistumisen yhteydessä luodaan **täsmälleen sama** 30 päivää voimassa oleva `auth_token`-JWT, jonka salasanalla
  kirjautuminen luo (`src/app/api/auth/login/route.ts`), joten hallintapaneelin
  istuntoputken muu toiminta (automaattinen päivitys, evästeiden määritteet) säilyy ennallaan —
  OIDC korvaa vain evästeen luontitavan, ei sen myöntämiä oikeuksia.

## Reittiluokat

`src/server/authz/types.ts` määrittelee kolme luokkaa; kaikki reitit, joita ei voida luokitella deterministisesti, kuuluvat oletusarvoisesti luokkaan `MANAGEMENT`.

| Luokka       | Kuvaus                                                                                                                                                      | Vaadittu todennus                                                              |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| `PUBLIC`     | Nimenomaisesti turvalliset reitit — sisäänkirjautuminen, uloskirjautuminen, tila, alustus, kuntotarkistus, käyttöönoton käynnistys.                         | Ei mitään                                                                      |
| `CLIENT_API` | Mallia palvelevat päätepisteet — `/api/v1/*`, `/api/v1beta/*` sekä aliakset `/v1/*`, `/v1beta/*`, `/chat/completions`, `/responses`, `/models`, `/codex/*`. | Bearer-avain, kun voimassa oleva `REQUIRE_API_KEY`-ominaisuuslippu on käytössä |
| `MANAGEMENT` | Hallintapaneelin sivut, asetukset, palveluntarjoajat, avaimet sekä ylläpito- ja diagnostiikkapäätepisteet.                                                  | Hallintapaneeli-istunto TAI Bearer, jolla on `manage`-käyttöoikeus             |

## Putki

```
Saapuva pyyntö → src/proxy.ts
  → runAuthzPipeline() tiedostossa src/server/authz/pipeline.ts
    1. Poista luotetut sisäiset otsakkeet (x-omniroute-auth-*, x-omniroute-route-class)
    2. Luo pyynnön tunniste ja luokittele reitti funktiolla classifyRoute()
    3. Jos pathname == "/" → uudelleenohjaa kohteeseen /dashboard
    4. Jos tyhjennystila (hallittu sammutus) on käynnissä ja reitti on /api/* → 503
    5. Jos menetelmä ei ole GET ja reitti on /api/* → suorita checkBodySize()-tarkistus
    6. Jos menetelmä on OPTIONS → CORS-esitarkistus 204
    7. Jos options.enforce == false → päästä läpi reittiluokan otsakkeiden kanssa
    8. Muussa tapauksessa: POLICIES[routeClass].evaluate(ctx)
       - hyväksy → lisää x-omniroute-auth-{kind,id,label,scopes} → NextResponse.next()
       - hylkää  → JSON-virhe ja correlation_id (hallintapaneelin sivut → 302 /login)
```

Luotetut sisäiset otsakkeet (määritelty tiedostossa `src/server/authz/headers.ts`) **poistetaan saapuvista pyynnöistä** ennen luokittelua — asiakkaat eivät voi asettaa ennalta `x-omniroute-auth-*`-otsakkeita esiintyäkseen toisena subjektina.

### Käytäntösopimukset

Jokaisella reittiluokalla on käytäntö hakemistossa `src/server/authz/policies/`:

- **`publicPolicy`** (`policies/public.ts`) — palauttaa aina `allow({ kind: "anonymous", id: "anonymous" })`.
- **`clientApiPolicy`** (`policies/clientApi.ts`) — poimii Bearer-tunnisteen ja validoi sen funktiolla `validateApiKey()`. Siirtyy anonyymiin käyttöön vain, kun voimassa oleva `REQUIRE_API_KEY`-ominaisuuslippu on poistettu käytöstä. Voimassa oleva lippu ratkaistaan funktion `isRequireApiKeyEnabled()` avulla (`tietokannan ominaisuuslipun ohitus > process.env.REQUIRE_API_KEY > oletusarvo`), joten hallintapaneelin ominaisuusliput ja ympäristömuuttujat hallitsevat reittejä `/api/v1/*`, `/api/v1beta/*` ja aliaksia yhdenmukaisesti; ratkaisijan virheet estävät pääsyn. Sallii hallintapaneeli-istunnon pyynnöt asiakas-API-reiteillä (mukaan lukien `/api/v1/models`, jota hallintapaneelin malliluettelo käyttää).
- **`managementPolicy`** (`policies/management.ts`) — hyväksyy hallintapaneeli-istunnon ja sisäiset mallien synkronointipyynnöt (jotka täsmäytetään malliin `/api/providers/[name]/(sync-models|models)`) tai ohittaa tarkistuksen kokonaan, jos `isAuthRequired()` palauttaa arvon false. Palauttaa tilakoodin 403 (`AUTH_001`), kun Bearer-tunnus on annettu mutta se on virheellinen, ja muussa tapauksessa tilakoodin 401. Pakottaa myös reittisuojausten tasot (LOCAL_ONLY / ALWAYS_PROTECTED) ennen mitään todennushaaraa — katso [Reittisuojausten tasot](../security/ROUTE_GUARD_TIERS.md). Kohdassa `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` olevia LOCAL_ONLY-polkuja (tällä hetkellä `/api/mcp/`) voidaan käyttää muualta kuin loopback-osoitteesta, kun Bearer-avaimella on `manage`-käyttöoikeus; kaikki muut LOCAL_ONLY-polut on rajattu tiukasti loopback-osoitteeseen käyttöoikeudesta riippumatta.

Onnistunut käytäntö palauttaa `AuthSubject`-olion, jonka `kind ∈ { client_api_key, dashboard_session, management_key, anonymous }`. Myöhemmät käsittelijät voivat lukea sen kutsumalla `assertAuth(request, "CLIENT_API")` tiedostossa `src/server/authz/assertAuth.ts` sen sijaan, että ne suorittaisivat todennuslogiikan uudelleen.

## Julkisten reittien luettelo

`src/shared/constants/publicApiRoutes.ts` on eksplisiittinen sallittujen reittien luettelo:

Luettelo on jaettu **muodon** perusteella, ja jako on toiminnan kannalta kriittinen (GHSA-74g9-q8f6-793h): etuliite täsmäytetään
`startsWith()`-menetelmällä, joten se täsmää myös kaikkiin viereisiin polkuihin, joilla on samat alkumerkit.
Etuliitteenä `/api/usage/om-usage` merkitsi polun `/api/usage/om-usage<anything>` JULKISEKSI, ja Next ohjaa
sen reittiin `/api/usage/[connectionId]` — käsittelijään, jolla ei ole omaa todennusta.

```ts
// Aidot alipuut. Jokaisen merkinnän TÄYTYY päättyä merkkiin "/" (yksikkötesti varmistaa tämän).
PUBLIC_API_ROUTE_PREFIXES = [
  "/api/auth/oidc/",
  "/api/v1/", // käsitellään luokittelussa CLIENT_API-reittinä, ei "todennusta vaatimattomana julkisena" reittinä
  "/api/oauth/",
  "/api/codex/connect/",
  "/api/telegram/",
  "/api/cursor-cli/",
];

// Yksittäiset reitit, jotka täsmäytetään TÄSMÄLLEEN (lopussa olevan vinoviivan kanssa tai ilman sitä).
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

// Vain luku -muotoiset yksittäiset reitit, joihin sovelletaan myös CORS-alkuperän lievennystä.
PUBLIC_READONLY_CORS_API_ROUTES = [
  "/api/health/ping",
  "/api/monitoring/health",
  "/api/settings/require-login",
];

// Vain luku -muotoinen yksittäinen reitti ILMAN CORS-lievennystä.
PUBLIC_READONLY_API_ROUTES_EXACT = new Set(["/api/health"]);

PUBLIC_READONLY_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
```

Vain luku -reitit ovat julkisia **vain** turvallisille metodeille. Huomaa: `classifyRoute()` sulkee `/api/v1/*`- ja `/api/v1beta/*`-reitit PUBLIC-varaluokituksen ulkopuolelle — ne ovat aina `CLIENT_API`-reittejä, joten Bearer-avainten käytäntöä sovelletaan edelleen.

## Uuden reitin lisääminen

### Malli 1 — Julkinen asiakas-API:n päätepiste (Bearer-todennus)

Reitit `/api/v1/`- ja `/api/v1beta/`-polkujen alla luokitellaan automaattisesti `CLIENT_API`-reiteiksi. Väliohjelmisto suorittaa Bearer-tarkistuksen; reittikäsittelijöiden ei tarvitse tehdä sitä uudelleen, mutta ne voivat tarvittaessa lukea subjektin.

```typescript
// src/app/api/v1/your-route/route.ts
import { NextRequest, NextResponse } from "next/server";
import { assertAuth } from "@/server/authz/assertAuth";

export async function POST(req: NextRequest) {
  const subject = assertAuth(req, "CLIENT_API");
  // subject.kind === "client_api_key" | "anonymous" | "dashboard_session"
  // ... käsittelijän logiikka
}
```

### Malli 2 — Hallinnan päätepiste (istunto tai Bearer + manage)

Käytä `requireManagementAuth()`-funktiota tiedostosta `src/lib/api/requireManagementAuth.ts`:

```typescript
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

export async function POST(request: Request) {
  const rejection = await requireManagementAuth(request);
  if (rejection) return rejection;
  // ... käsittelijän logiikka
}
```

`requireManagementAuth()` palauttaa onnistuessaan arvon `null` tai virhetilanteessa JSON-virheen sisältävän `Response`-vastauksen:

- 401 `AUTH_001` "Todennus vaaditaan" — tunnistetietoja ei ole lainkaan
- 403 — virheellinen Bearer **tai** Bearer on annettu, mutta avaimelta puuttuu `manage`- / `admin`-käyttöalue

`hasManageScope(scopes)` palauttaa arvon true, jos käyttöalue on `"manage"` tai `"admin"`.

### Malli 3 — Lisääminen julkisten reittien sallittujen luetteloon

Valitse joukko muodon, älä helppouden perusteella. Yksittäinen reitti lisätään joukkoon `PUBLIC_API_ROUTES_EXACT` (tai vain GET-pyynnöille joukkoon `PUBLIC_READONLY_CORS_API_ROUTES`); vain aito alipuu lisätään joukkoon `PUBLIC_API_ROUTE_PREFIXES`, ja sen **täytyy päättyä merkkiin `/`**. Yksittäisen reitin lisääminen etuliiteluetteloon julkaisee myös kaikki viereiset polut, joilla on samat alkumerkit — mukaan lukien myöhemmin lisättävät dynaamisten segmenttien sisarreitit (GHSA-74g9-q8f6-793h). Päivitä yksikkötestit tiedostoissa `tests/unit/public-api-routes.test.ts`, `tests/unit/authz/public-route-exact-match.test.ts` ja `tests/unit/authz/classify.test.ts`.

## Laajuudet

Kolme nimiavaruutta. Jokainen tarkistaja lukee vain omat merkkijononsa. Vertailu,
mukaan lukien miksi `manage` epäonnistuu `scopeMatches`-tarkistuksessa `read:compression`-kohdalla ja miksi `read`-käyttöoikeustunnus ei voi `PATCH /api/keys/{id}`, löytyy
[Kolme laajuuden nimiavaruutta](../frameworks/MCP-SERVER.md#three-scope-namespaces).

API-avaimet sisältävät `scopes`-taulukon (tallennetaan JSON-muodossa `api_keys.scopes`-kenttään, katso `src/lib/db/apiKeys.ts`).

### Hallintalaajuus

- `manage` / `admin` — `hasManageScope`. Bearer-pääsy hallinnan API-reitteihin.
- `mcp:connect`, `self:usage`, `self:account-quota` ja
  `policy:bypass-provider-quota` ovat additiivisia tarkkoja vastaavuuslaajuuksia. Ne ovat
  `MANAGEMENT_API_KEY_SCOPES`-ulkopuolella. `mcp:connect` avaa vain
  `/api/mcp/`-reitin, joka on ei-loopback-poikkeus.

### MCP-työkalun laajuudet

Luettelo ja vastaavuussäännöt (identtinen merkkijono tai myönnetty laajuus, joka päättyy `*`):
[MCP-työkalun laajuudet](../frameworks/MCP-SERVER.md#mcp-tool-scopes).
`MCP_SCOPE_LIST` tiedostossa `src/shared/constants/mcpScopes.ts` on alkuperäinen tyypitetty
osajoukko, ei koko luettelo. Täytäntöönpano tapahtuu
`open-sse/mcp-server/scopeEnforcement.ts`-tiedostossa sen jälkeen, kun `resolveCallerScopeContext()`
ratkaisee laajuudet MCP-todennustiedoista, pyynnön metatiedoista tai `OMNIROUTE_MCP_SCOPES`-muuttujasta.
Se pysyy poissa käytöstä, ellei `OMNIROUTE_MCP_ENFORCE_SCOPES=true`.

### Käyttöoikeustunnuksen laajuudet

`read` / `write` / `admin` `oma_live_…`-tunnuksissa, järjestetty `scopeSatisfies`-funktion mukaan
(`src/lib/accessTokens/scopes.ts`). Tämä järjestys koskee vain käyttöoikeustunnuksen
tunnistetietoja. Katso [Hallinnan todennus](../guides/MANAGEMENT-AUTH.md).

## Todennusvaatimuksen valitsin

Tiedoston `src/shared/utils/apiAuth.ts` funktio `isAuthRequired()` määrittää, valvotaanko pyynnölle **mitään** todennusta:

- `settings.requireLogin === false` → todennus on poistettu käytöstä maailmanlaajuisesti.
- Salasanaa ei ole määritetty **eikä** `INITIAL_PASSWORD`-ympäristömuuttujaa ole asetettu → alustustila sallii käyttöönottotoiminnon ja loopback-pyynnöt, mutta verkon kautta tulevat pyynnöt edellyttävät silti tunnistetietoja.
- Mikä tahansa tietokantavirhe → pääsy estetään (oletusarvoisesti turvallinen toimintatapa).

Asiakkaan API-avaimen vaatimuksen valvonta käyttää tiedoston `src/shared/utils/featureFlags.ts` funktiota `isRequireApiKeyEnabled()`, eikä lue suoraan arvoa `process.env.REQUIRE_API_KEY`. Tämä on tärkeää käyttöönotetuissa instansseissa: asetuksen `REQUIRE_API_KEY` muuttaminen kohdassa Dashboard → Feature Flags tallentaa tietokantaan ohitusarvon ja vaikuttaa välittömästi reitteihin `/v1/*`, `/v1beta/*`, `/models`, `/responses`, `/chat/completions`, `/codex/*` sekä muihin tätä apufunktiota käyttäviin asiakas-API:n todennustarkistuksiin. Jos ominaisuuslippujen tallennustilaa ei voida lukea, asiakas-API:n todennus estää pääsyn ja vaatii avaimen.

## Rikkova muutos — v3.8.0

Päätepisteet `/api/v1/agents/tasks/*` ja `/api/resilience/model-cooldowns` **edellyttävät nyt hallinnan todennusta** (commit `588a0333`). Asiakkaat, jotka aiemmin lähettivät tavallisen API-avaimen ilman `manage`-käyttöoikeusaluetta, saavat vastauksen `403`. Siirtyminen: myönnä avaimelle `manage`-käyttöoikeusalue API Keys -hallintapaneelissa tai käytä sisäänkirjautunutta hallintapaneeli-istuntoa.

## Toiminnan muutos — v3.8.2

`/api/mcp/*` (MCP-etäpalvelin) on edelleen oletusarvoisesti LOCAL_ONLY, mutta hyväksyy nyt muut kuin loopback-pyynnöt, kun `Authorization: Bearer <api-key>` -otsake sisältää `manage`-käyttöoikeusalueen. Poikkeus sallitaan eksplisiittisesti reittikohtaisesti tiedoston `src/server/authz/routeGuard.ts` määrityksellä `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES`; rinnakkaista LOCAL_ONLY-etuliitettä `/api/cli-tools/runtime/*` ei tarkoituksella voi ohittaa, koska se voi käynnistää mielivaltaisia aliprosesseja. Anonyymit pyynnöt reitille `/api/mcp/*` muista kuin loopback-osoitteista saavat edelleen vastauksen `403 LOCAL_ONLY` — uusien LOCAL_ONLY-reittien oletuksena säilyy tiukka loopback-rajoitus. Katso [Reittisuojauksen tasot](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out).

## Testaus

- Yksikkötestit: `tests/unit/authz/` — `classify.test.ts`, `pipeline.test.ts`, `client-api-policy.test.ts`, `management-policy.test.ts`, `public-policy.test.ts`.
- Julkisten reittien sallittujen luettelo: `tests/unit/public-api-routes.test.ts`.
- Kohdennetun testin suorittaminen: `node --import tsx/esm --test tests/unit/authz/classify.test.ts`.

## Virheenkorjaus

Putki lisää vastauksiin aina seuraavat otsakkeet:

```
x-request-id:               <korrelaatiotunnus, toistetaan virhevastausten rungossa>
x-omniroute-route-class:    PUBLIC | CLIENT_API | MANAGEMENT
```

Todennettujen pyyntöjen käsittelijäpuolen upstream-pyyntöotsakkeet sisältävät lisäksi:

```
x-omniroute-auth-kind:      client_api_key | dashboard_session | management_key | anonymous
x-omniroute-auth-id:        key_<viimeiset-4> | "dashboard" | "anonymous"
x-omniroute-auth-label:     (valinnainen)
x-omniroute-auth-scopes:    pilkuilla eroteltu luettelo
```

Käytä käsittelijöissä funktiota `assertAuth(req, expectedClass)` — se heittää `AuthzAssertionError`-virheen koodilla `AUTHZ_NOT_INITIALIZED`, jos väliohjelmisto ohitettiin (tästä on hyötyä määritysregressioiden havaitsemisessa testeissä).

## Katso myös

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — todennusmerkintä päätepistettä kohti
- [COMPLIANCE.md](../security/COMPLIANCE.md) — tarkastusloki todennustapahtumille
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md#three-scope-namespaces) — kolme laajuusnimiavaruutta ja MCP-työkalun laajuuskatalogi
- Lähde: `src/server/authz/`, `src/lib/api/requireManagementAuth.ts`
