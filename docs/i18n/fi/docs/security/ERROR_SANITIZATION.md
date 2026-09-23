# Error Message Sanitization (Suomi)

🌐 **Languages:** 🇺🇸 [English](../../../../security/ERROR_SANITIZATION.md) · 🇪🇹 [am](../../../am/docs/security/ERROR_SANITIZATION.md) · 🇸🇦 [ar](../../../ar/docs/security/ERROR_SANITIZATION.md) · 🇦🇿 [az](../../../az/docs/security/ERROR_SANITIZATION.md) · 🇧🇬 [bg](../../../bg/docs/security/ERROR_SANITIZATION.md) · 🇧🇩 [bn](../../../bn/docs/security/ERROR_SANITIZATION.md) · 🇧🇦 [bs](../../../bs/docs/security/ERROR_SANITIZATION.md) · 🇨🇿 [cs](../../../cs/docs/security/ERROR_SANITIZATION.md) · 🇩🇰 [da](../../../da/docs/security/ERROR_SANITIZATION.md) · 🇩🇪 [de](../../../de/docs/security/ERROR_SANITIZATION.md) · 🇬🇷 [el](../../../el/docs/security/ERROR_SANITIZATION.md) · 🇪🇸 [es](../../../es/docs/security/ERROR_SANITIZATION.md) · 🇪🇪 [et](../../../et/docs/security/ERROR_SANITIZATION.md) · 🇮🇷 [fa](../../../fa/docs/security/ERROR_SANITIZATION.md) · 🇫🇷 [fr](../../../fr/docs/security/ERROR_SANITIZATION.md) · 🇮🇪 [ga](../../../ga/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [gu](../../../gu/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [ha](../../../ha/docs/security/ERROR_SANITIZATION.md) · 🇮🇱 [he](../../../he/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [hi](../../../hi/docs/security/ERROR_SANITIZATION.md) · 🇭🇷 [hr](../../../hr/docs/security/ERROR_SANITIZATION.md) · 🇭🇺 [hu](../../../hu/docs/security/ERROR_SANITIZATION.md) · 🇦🇲 [hy](../../../hy/docs/security/ERROR_SANITIZATION.md) · 🇮🇩 [id](../../../id/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [ig](../../../ig/docs/security/ERROR_SANITIZATION.md) · 🇮🇹 [it](../../../it/docs/security/ERROR_SANITIZATION.md) · 🇯🇵 [ja](../../../ja/docs/security/ERROR_SANITIZATION.md) · 🇬🇪 [ka](../../../ka/docs/security/ERROR_SANITIZATION.md) · 🇰🇭 [km](../../../km/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [kn](../../../kn/docs/security/ERROR_SANITIZATION.md) · 🇰🇷 [ko](../../../ko/docs/security/ERROR_SANITIZATION.md) · 🇱🇹 [lt](../../../lt/docs/security/ERROR_SANITIZATION.md) · 🇱🇻 [lv](../../../lv/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [ml](../../../ml/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [mr](../../../mr/docs/security/ERROR_SANITIZATION.md) · 🇲🇾 [ms](../../../ms/docs/security/ERROR_SANITIZATION.md) · 🇲🇹 [mt](../../../mt/docs/security/ERROR_SANITIZATION.md) · 🇲🇲 [my](../../../my/docs/security/ERROR_SANITIZATION.md) · 🇳🇵 [ne](../../../ne/docs/security/ERROR_SANITIZATION.md) · 🇳🇱 [nl](../../../nl/docs/security/ERROR_SANITIZATION.md) · 🇳🇴 [no](../../../no/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [or](../../../or/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [pa](../../../pa/docs/security/ERROR_SANITIZATION.md) · 🇵🇭 [phi](../../../phi/docs/security/ERROR_SANITIZATION.md) · 🇵🇱 [pl](../../../pl/docs/security/ERROR_SANITIZATION.md) · 🇵🇹 [pt](../../../pt/docs/security/ERROR_SANITIZATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/ERROR_SANITIZATION.md) · 🇷🇴 [ro](../../../ro/docs/security/ERROR_SANITIZATION.md) · 🇷🇺 [ru](../../../ru/docs/security/ERROR_SANITIZATION.md) · 🇱🇰 [si](../../../si/docs/security/ERROR_SANITIZATION.md) · 🇸🇰 [sk](../../../sk/docs/security/ERROR_SANITIZATION.md) · 🇸🇮 [sl](../../../sl/docs/security/ERROR_SANITIZATION.md) · 🇷🇸 [sr](../../../sr/docs/security/ERROR_SANITIZATION.md) · 🇸🇪 [sv](../../../sv/docs/security/ERROR_SANITIZATION.md) · 🇰🇪 [sw](../../../sw/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [ta](../../../ta/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [te](../../../te/docs/security/ERROR_SANITIZATION.md) · 🇹🇭 [th](../../../th/docs/security/ERROR_SANITIZATION.md) · 🇹🇷 [tr](../../../tr/docs/security/ERROR_SANITIZATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/ERROR_SANITIZATION.md) · 🇵🇰 [ur](../../../ur/docs/security/ERROR_SANITIZATION.md) · 🇺🇿 [uz](../../../uz/docs/security/ERROR_SANITIZATION.md) · 🇻🇳 [vi](../../../vi/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [yo](../../../yo/docs/security/ERROR_SANITIZATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/ERROR_SANITIZATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/ERROR_SANITIZATION.md)

---

> **Totuuden lähde:** `open-sse/utils/errorSanitization.ts`,
> `open-sse/utils/errorPathRedaction.ts` ja julkiset rakentajat tiedostossa `open-sse/utils/error.ts`
> **Testit:** `tests/unit/error-message-sanitization.test.ts`,
> `tests/unit/error-public-boundaries-hardening.test.ts`
> **Viimeksi päivitetty:** 2026-09-02 — v3.8.51
> **Kohderyhmä:** Kaikki virhevastauksia käsittelevät kehittäjät (HTTP-reitit, SSE-virrat, suorittajat, MCP-käsittelijät).
> **Tila:** **PAKOLLINEN** jokaiselle koodipolulle, joka palauttaa virheilmoituksen asiakkaalle.

## Miksi tämä on olemassa

CodeQL-sääntö `js/stack-trace-exposure` (CWE-209) merkitsee kaikki koodipolut, joissa suorituksenaikaisesta poikkeuksesta peräisin oleva virheilmoitus päätyy HTTP- tai SSE-vastaukseen puhdistamatta. Pinojäljet ja absoluuttiset tiedostopolut tuotantovastauksissa antavat hyökkääjille:

- Sisäisen hakemistorakenteen (`/srv/app/src/lib/...`) → tiedustelutietoa myöhempiä hyökkäyksiä varten.
- Pinokehyksistä pääteltävät kirjastojen ja sovelluskehysten versiot → kohdennettujen hyökkäysten valinta.
- Arkaluonteisia suorituksenaikaisia arvoja, joita on saatettu interpoloida merkkijonoina virheisiin (tietokantakyselyt, määritysarvot).

`open-sse/utils/error.ts`-tiedoston viemä `sanitizeErrorMessage`-apufunktio poistaa nämä
tietovuotoluokat:

1. Fyysiset, sarjallistetut ja yksiselitteisesti tekstin sisäiset JavaScript-pinokehysten loppuosat.
2. Absoluuttiset POSIX-, Windows-, UNC- ja `file://`-tiedostojärjestelmäpolut säilyttäen samalla turvalliset HTTPS-URL-osoitteet
   sekä erikseen merkityt API-reitit.
3. Tunnistetietomääritykset, yleiset palveluntarjoajien tunnusmuodot, yksityisten avainten PEM-lohkot ja base64-data-URL-osoitteet.

Puhdistaja rajoittaa syötteen pituutta ja epäonnistuu turvallisesti, jos heitetyn arvon muuntaminen merkkijonoksi epäonnistuu.
Rekursiivinen ylävirran JSON-puhdistus poistaa myös vaaralliset tunnistetieto- ja polkuavaimet, istuntoaliakset sekä
prototyypin hallinta-avaimet ennen vastauksen sarjallistamista.

## Pakollinen malli

### 1. Virhevastauksen muodostaminen (HTTP- ja API-reitit)

Käytä `buildErrorBody()`-funktiota — puhdistus on sisäänrakennettu:

```ts
import { buildErrorBody } from "@omniroute/open-sse/utils/error.ts";

export async function POST(req: Request) {
  try {
    // ... käsittelijän logiikka ...
  } catch (err) {
    return new Response(JSON.stringify(buildErrorBody(500, String(err))), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
```

Tai käytä saman moduulin kätevyyskääreitä:

```ts
import {
  errorResponse, // kertakäyttöinen Response-olio
  writeStreamError, // SSE-kirjoitin
  createErrorResult, // muoto { success: false, status, response, ... }
  unavailableResponse, // lisää Retry-After-otsakkeen
  providerCircuitOpenResponse,
  modelCooldownResponse,
} from "@omniroute/open-sse/utils/error.ts";
```

Kaikki nämä käyttävät kanonista julkisen virheen rajapintaa. `errorResponse`, `writeStreamError` ja
`createErrorResult` kulkevat `buildErrorBody`-funktion kautta; kolme erikoistunutta uudelleenyritys-/katkaisija-apufunktiota
projisoivat ja puhdistavat julkisen kontekstinsa suoraan. **Sinun ei koskaan tarvitse kutsua
`sanitizeErrorMessage`-funktiota manuaalisesti**, kun käytät näitä apufunktioita.

### 2. Mukautetut virherakenteet (harvinaisia)

Kun et voi käyttää yllä olevia apufunktioita (esim. vastauksen muodon määrää ylävirran protokolla, kuten Connect-RPC), tuo `sanitizeErrorMessage` suoraan:

```ts
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error.ts";

const body = JSON.stringify({
  error: {
    message: sanitizeErrorMessage(rawMessage),
    type: "invalid_request_error",
    code: "",
  },
});
```

Tämä on ainoa hyväksytty tapa muodostaa mukautettu virherunko. Katso viitetoteutus kohdasta `open-sse/executors/cursor.ts::buildErrorResponse`.

### 3. Lokitus vs. vastaaminen

Luotettavat sisäiset poikkeukset voivat säilyttää koko viestinsä ja pinojälkensä, jotta ylläpitäjät voivat tehdä vianmääritystä. Arvot,
jotka ovat peräisin palveluntarjoaja-, validointi-, selainistunto- tai tunnistetietojen läheisiltä rajapinnoilta, on
puhdistettava ennen kuin ne päätyvät konsolitulosteeseen, auditointimetatietoihin tai pysyviin kutsulokeihin. Malli:

```ts
try {
  // ...
} catch (err) {
  log.error({ err }, "handler failed"); // vain luotettava sisäinen poikkeus
  return errorResponse(500, getErrorMessage(err)); // puhdistettu — lähetetään asiakkaalle
}
```

Projisoi myös lokitettava arvo palveluntarjoajan hallitsemissa virhetilanteissa:

```ts
log.error({ message: sanitizeErrorMessage(err) || "Provider request failed" });
```

### 4. Kielletyt mallit

❌ **Älä koskaan** sijoita käsittelemätöntä poikkeustulostetta Response-rungon sisään:

```ts
// HUONO: pinojälki ja tiedostopolut päätyvät asiakkaalle
return new Response(JSON.stringify({ error: { message: err.stack || err.message } }), {
  status: 500,
});
```

❌ **Älä koskaan** toteuta omaa ensimmäisen rivin erotinta:

```ts
// HUONO: absoluuttiset polut jäävät poistamatta ja toteutus voi erkaantua kanonisesta apufunktiosta
const safe = String(err).split("\n")[0];
```

❌ **Älä koskaan** puhdista vain reitissä ja unohda SSE-polkua. Kaiken virtaan kirjoitettavan on kuljettava `writeStreamError`-funktion (tai sen käyttämän `buildErrorBody`-funktion) kautta.

❌ **Älä koskaan** sisällytä tarkoituksella `process.cwd()`-funktion, `__filename`- tai `__dirname`-arvoa tai ympäristöstä johdettuja polkuja
virheilmoituksiin. Puhdistaja käsittelee absoluuttiset polut lisäsuojana, mutta kutsujat eivät saa
alun perinkään muodostaa järjestelmätopologian paljastavia viestejä.

## Kattavuus CI:ssä

`tests/unit/error-message-sanitization.test.ts` varmistaa seuraavat asiat:

- Jokainen reitti polun `/api/model-combo-mappings/*` alla palauttaa puhdistetut vastausrungot 4xx/5xx-tilanteissa.
- `sanitizeErrorMessage` poistaa moniriviset pinojäljitykset.
- `sanitizeErrorMessage` korvaa POSIX- ja Windows-järjestelmien absoluuttiset polut arvolla `<path>`.
- `sanitizeErrorMessage` käsittelee `null`-, `undefined`- ja `Error`-instanssisyötteet turvallisesti.
- `buildErrorBody` ei koskaan paljasta pinojäljityksiä `message`-kentässään.

Kun lisäät uuden reitin tai suorittajan, kopioi tarkistusmalli tästä tiedostosta. Kattavuusraja (`npm run test:coverage`) edellyttää vähintään 60 %:n kattavuutta lauseille/riveille/funktioille/haaroille — myös virhepolut on katettava.

## Liittyvät hallintakeinot

- `js/stack-trace-exposure`-CodeQL-hälytykset hakemistossa `.github/security` tulee aina **joko** korjata näiden apufunktioiden avulla **tai** hylätä kommentilla, jossa viitataan tähän dokumenttiin.
- `pino`-peittomääritys (`src/shared/utils/logRedaction.ts`) käsittelee luotetut rakenteiset lokit erikseen. Tämä dokumentti kattaa julkisten vastausten viestit sekä palveluntarjoajan hallitsemat arvot, jotka ylittävät pysyvien kutsu- tai välityslokien rajat.
- Ylävirran otsakkeiden estolista (`src/shared/constants/upstreamHeaders.ts`) estää otsakevuodot — pidä molemmat tiedostot yhdenmukaisina, kun lisäät uuden tietojen vuotamiseen liittyvän huolenaiheen.

## Ylävirran tietojen välitys

`buildErrorBody` hyväksyy valinnaisen kolmannen argumentin `upstreamDetails` (ylävirran palveluntarjoajalta saatu raaka jäsennetty runko). Kun se annetaan, se puhdistetaan funktiolla `sanitizeUpstreamDetails` ennen sen sisällyttämistä vastaukseen kenttänä `upstream_details`.

Valinnainen neljäs argumentti `classification`
(`{ type?: string; code?: string; reason?: string }`) hyväksyy eksplisiittisen julkisen luokituksen.
Jokainen kenttä projisoidaan rajattuun julkisten tunnisteiden sanastoon. Turvattomat, tunnistetietojen kaltaiset, ohjausmerkkejä sisältävät tai liian pitkät arvot korvataan tilasta johdetulla tyypillä tai koodilla; turvaton valinnainen syy jätetään pois. Kolminumeroiset HTTP-tilatunnisteet (`100`–`599`) säilyvät kelvollisina sellaisissa palveluntarjoajasopimuksissa, joissa ylävirran numeerinen tila ilmoitetaan koneellisesti luettavana koodina. Sama rajattu alue hyväksytään paikallisesti luodussa HTTP-tilan paikkamerkkimuodossa; mielivaltaiset palveluntarjoajan numerot ja nimet jäävät sanaston ulkopuolelle.

Välitä jokainen eksplisiittinen luokitus neljännessä argumentissa. Älä koskaan ylikirjoita kenttiä
`body.error.code`, `body.error.type` tai `body.error.reason` sen jälkeen, kun `buildErrorBody()` on palauttanut arvon;
muodostuksen jälkeinen muokkaus ohittaa julkisen projektion.

Kohteeseen `upstreamDetails` sovellettavat puhdistussäännöt:

1. Merkkijonoarvot: käsitellään funktiolla `sanitizeErrorMessage` (poistaa pinojäljitykset ja absoluuttiset polut).
2. Turvattomat polku-, tunnistetieto-, istuntoalias- ja prototyypinhallinta-avaimet poistetaan.
3. Syvyysraja: yli neljän tason menevä sisäkkäisyys korvataan merkkijonolla `"[truncated]"`.
4. Taulukot rajataan 32 alkioon.

Vain kutsukohtien, joilla on jäsennetty palveluntarjoajan virherunko, tulee välittää `upstreamDetails`. Sisäiset OmniRoute-virheet (SSE-jäsennysvirheet, tyhjä sisältö, suojakaiteiden estot) eivät saa sisältää sitä.

ÄLÄ välitä raakaa `err.stack`- tai `err.message`-arvoa äläkä mitään suorituksenaikaisesta poikkeuksesta peräisin olevaa merkkijonoa kohteeseen
`upstreamDetails`. Ne on edelleen käsiteltävä funktioilla `errorResponse` / `buildErrorBody(code, msg)`
ilman ylävirran runkoa.

Valikoiva ylävirran 4xx-vastausten välitys säilyttää palveluntarjoajan turvallisen JSON-rakenteen ja sanamuodon, joita asiakkaan automaattinen palautuminen edellyttää, mutta välitys ei tapahdu tavu tavulta: rekursiivinen puhdistus suoritetaan aina ennen sarjallistamista. Sykliset, BigInt-arvoja sisältävät tai vihamielisiä `toJSON()`-toteutuksia sisältävät rungot hylätään turvallisesti, eivätkä ne kelpaa välitettäviksi. Tekstintunnistus ja moderointi soveltavat samaa sääntöä; muut kuin JSON-muotoiset, tyhjät tai virheellisesti merkityt ylävirran rungot muunnetaan kanoniseksi OmniRoute-JSON-virhekääreeksi.

## Tunnettu CodeQL-rajoitus: mukautettuja puhdistajia ei tunnisteta

CodeQL-kysely [`js/stack-trace-exposure`](https://codeql.github.com/codeql-query-help/javascript/js-stack-trace-exposure/) käyttää kiinteää sallittujen puhdistusmallien luetteloa (esim. rivinsisäinen `.split("\n")[0]`, `String#replace` tietyillä säännöllisten lausekkeiden muodoilla sekä `Error`-olion `.message`-ominaisuuden käyttö). Se **ei** tunnista epäsuoraa käyttöä mukautetun apufunktion, kuten `sanitizeErrorMessage()`, kautta.

Tämä tarkoittaa, että kutsukohdat, jotka todistettavasti puhdistavat tiedot tämän moduulin kautta — esimerkiksi `open-sse/utils/error.ts::errorResponse` ja `open-sse/executors/cursor.ts::buildErrorResponse` — voivat edelleen laukaista hälytyksen, vaikka koodi on toiminnallisesti turvallinen. Aiemmat hylkäykset: `#224`, `#231` (toukokuu 2026), molemmat merkitty `false positive` teknisin perusteluin.

**Uuden esiintymän käsittely:**

1. Varmista, että kutsukohta todella välittää viestin funktion `sanitizeErrorMessage` / `buildErrorBody` / jonkin edellä dokumentoidun kääreen kautta (lue kutsuketju alusta loppuun — älä luota kommenttiin).
2. Varmista, että `tests/unit/error-message-sanitization.test.ts` testaa kyseisen polun (tai lisää testikattavuus).
3. Hylkää hälytys komennolla `gh api ... -X PATCH state=dismissed -f 'dismissed_reason=false positive'` ja viittaa tähän dokumenttiin.
4. **Älä** korjaa ongelmaa lisäämällä `.split("\n")[0]` suoraan kaikkialle — apufunktio on ainoa totuuden lähde; mallin monistaminen heikentää puhdistajaa (polkujen poistaminen, pituusrajoitus ja tyyppimuunnos menetetään) vain siksi, että tarkistin saataisiin näennäisesti tyytyväiseksi.

Pitkän aikavälin ratkaisu on ottaa käyttöön CodeQL:n [`@codeql/javascript-models`-mukautettu puhdistajamääritys](https://codeql.github.com/docs/codeql-language-guides/customizing-library-models-for-javascript/) tai vastaavia erikseen käyttöönotettavia ominaisuuksia; se ei kuulu tämän dokumentin piiriin.

## Viitteet

- [CWE-209: Tietojen paljastuminen virheviestin kautta](https://cwe.mitre.org/data/definitions/209.html)
- [CodeQL `js/stack-trace-exposure`](https://codeql.github.com/codeql-query-help/javascript/js-stack-trace-exposure/)
- [OWASP: Virheenkäsittelyn pikaopas](https://cheatsheetseries.owasp.org/cheatsheets/Error_Handling_Cheat_Sheet.html)
- Apufunktion keskittävä commit: `1a39c31f` — _fix(security): peitä julkiset ylävirran tunnistetiedot + keskitä virheiden puhdistus_
