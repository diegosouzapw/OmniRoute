# Subscription-first routing (Suomi)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/SUBSCRIPTION_LADDER.md) · 🇪🇹 [am](../../../am/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇦 [ar](../../../ar/docs/routing/SUBSCRIPTION_LADDER.md) · 🇦🇿 [az](../../../az/docs/routing/SUBSCRIPTION_LADDER.md) · 🇧🇬 [bg](../../../bg/docs/routing/SUBSCRIPTION_LADDER.md) · 🇧🇩 [bn](../../../bn/docs/routing/SUBSCRIPTION_LADDER.md) · 🇨🇿 [cs](../../../cs/docs/routing/SUBSCRIPTION_LADDER.md) · 🇩🇰 [da](../../../da/docs/routing/SUBSCRIPTION_LADDER.md) · 🇩🇪 [de](../../../de/docs/routing/SUBSCRIPTION_LADDER.md) · 🇬🇷 [el](../../../el/docs/routing/SUBSCRIPTION_LADDER.md) · 🇪🇸 [es](../../../es/docs/routing/SUBSCRIPTION_LADDER.md) · 🇪🇪 [et](../../../et/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇷 [fa](../../../fa/docs/routing/SUBSCRIPTION_LADDER.md) · 🇫🇷 [fr](../../../fr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇪 [ga](../../../ga/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [gu](../../../gu/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇬 [ha](../../../ha/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇱 [he](../../../he/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [hi](../../../hi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇭🇷 [hr](../../../hr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇭🇺 [hu](../../../hu/docs/routing/SUBSCRIPTION_LADDER.md) · 🇦🇲 [hy](../../../hy/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇩 [id](../../../id/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇬 [ig](../../../ig/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇹 [it](../../../it/docs/routing/SUBSCRIPTION_LADDER.md) · 🇯🇵 [ja](../../../ja/docs/routing/SUBSCRIPTION_LADDER.md) · 🇬🇪 [ka](../../../ka/docs/routing/SUBSCRIPTION_LADDER.md) · 🇰🇭 [km](../../../km/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [kn](../../../kn/docs/routing/SUBSCRIPTION_LADDER.md) · 🇰🇷 [ko](../../../ko/docs/routing/SUBSCRIPTION_LADDER.md) · 🇱🇹 [lt](../../../lt/docs/routing/SUBSCRIPTION_LADDER.md) · 🇱🇻 [lv](../../../lv/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [ml](../../../ml/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [mr](../../../mr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇲🇾 [ms](../../../ms/docs/routing/SUBSCRIPTION_LADDER.md) · 🇲🇹 [mt](../../../mt/docs/routing/SUBSCRIPTION_LADDER.md) · 🇲🇲 [my](../../../my/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇵 [ne](../../../ne/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇱 [nl](../../../nl/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇴 [no](../../../no/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [or](../../../or/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [pa](../../../pa/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇭 [phi](../../../phi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇱 [pl](../../../pl/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇹 [pt](../../../pt/docs/routing/SUBSCRIPTION_LADDER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/SUBSCRIPTION_LADDER.md) · 🇷🇴 [ro](../../../ro/docs/routing/SUBSCRIPTION_LADDER.md) · 🇷🇺 [ru](../../../ru/docs/routing/SUBSCRIPTION_LADDER.md) · 🇱🇰 [si](../../../si/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇰 [sk](../../../sk/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇮 [sl](../../../sl/docs/routing/SUBSCRIPTION_LADDER.md) · 🇷🇸 [sr](../../../sr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇪 [sv](../../../sv/docs/routing/SUBSCRIPTION_LADDER.md) · 🇰🇪 [sw](../../../sw/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [ta](../../../ta/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [te](../../../te/docs/routing/SUBSCRIPTION_LADDER.md) · 🇹🇭 [th](../../../th/docs/routing/SUBSCRIPTION_LADDER.md) · 🇹🇷 [tr](../../../tr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇰 [ur](../../../ur/docs/routing/SUBSCRIPTION_LADDER.md) · 🇺🇿 [uz](../../../uz/docs/routing/SUBSCRIPTION_LADDER.md) · 🇻🇳 [vi](../../../vi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇬 [yo](../../../yo/docs/routing/SUBSCRIPTION_LADDER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/SUBSCRIPTION_LADDER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/SUBSCRIPTION_LADDER.md)

---

> Kaksi uutta `auto/*`-tunnusta — `auto/subscription` ja `auto/thrifty`. Molemmat otetaan käyttöön
> pyytämällä niitä: niiden kautta ei reititetä mitään, ellei kutsuja pyydä tunnusta nimeltä, eivätkä
> olemassa olevat poolit, strategiat tai oletusarvot muutu.

## Miksi tämä on olemassa

OmniRoute vastaa jo kahteen kustannuksia koskevaan kysymykseen, mutta kumpikaan niistä ei ole se, jota useimmat operaattorit kysyvät.

| Olemassa oleva mekanismi                                 | Mihin se vastaa                                     |
| -------------------------------------------------------- | --------------------------------------------------- |
| `hidePaidModels` (`autoCombo/paidModelFilter.ts`)        | "onko tämä malli luetteloitu ilmaiseksi?"           |
| `freeAccessPolicy: "strict"` (`strictZeroCostFilter.ts`) | "voiko tämä yhteys koskaan aiheuttaa laskutusta?"   |
| `quotaPreflight` (`combo/quotaExhaustionCutoff.ts`)      | "onko tämä yhteys lähellä rajaansa?"                |
| `budgetCap` / `budgetFallback` (`autoCombo/engine.ts`)   | "rajoita kulutusta, siirry halvimpaan vaihtoehtoon" |

Jokainen vain ilmaisiin vaihtoehtoihin perustuva mekanismi **sulkeutuu turvallisesti** — loppuun käytetty ilmainen pooli on tyhjä pooli eikä koskaan
siirtyminen maksulliseen vaihtoehtoon — ja jokainen maksullisen puolen mekanismi on tasoista riippumaton. Kumpikaan ei vastaa tähän:

> "Käytä kiintiötä, josta jo maksan. Kun se loppuu, joko pysähdy tai nouse yksi taso kerrallaan
> halvimpien maksullisten vaihtoehtojen kautta — ja palaa heti, kun kiintiö nollautuu."

## Laskutus on yhteyden, ei mallin ominaisuus

`classifyTier()` (`open-sse/services/tierResolver.ts`) käyttää avaimena yhdistelmää `(provider, model)` ja palauttaa
luettelohinnoittelun perusteella arvon `free | cheap | premium`. Se, aiheuttaako pyyntö lisäkustannuksia,
riippuu kuitenkin siitä, **mikä yhteys sen käsittelee**: sama malli sisältyy tilaukseen Claude Code
OAuth -yhteyden kautta, mutta siitä laskutetaan tokenien mukaan API-avainyhteyden kautta.

`provider_connections.auth_type` ei ole luotettava indikaattori kumpaankaan suuntaan — käytön mukaan
laskutettavia OAuth-yhteyksiä on olemassa, samoin kuin tilaukseen sisältyviä API-avainyhteyksiä (Copilot-käyttäjäpaikan token ei ole
käytön mukaan laskutettava API-avain). Siksi laskutusluokka tulee **kuratoidusta luettelosta**,
`open-sse/config/connectionBillingCatalog.ts`, joka määritetään käsin kunkin palveluntarjoajan julkaisemien ehtojen perusteella —
samalla tavalla kuin `FreeModelBudget.hardStopGuaranteed` on jo määritetty ilmaisille malleille.

```ts
type ConnectionBillingClass = "subscription" | "metered" | "keyless" | "unknown";
type ConnectionOverageBehavior = "hard-stop" | "meters-to-paid" | "unknown";
```

Ratkaisujärjestys (`autoCombo/connectionBilling.ts`): synteettinen ilman todennusta toimiva sentinel-arvo →
`keyless`; luettelomerkintä, joka vastaa sekä palveluntarjoajaa **että** arvoa `authType`; palveluntarjoajan laajuinen merkintä;
muussa tapauksessa `unknown`. **Kuratoimaton ei tarkoita ilmaista** — `unknown` käsitellään kaikkialla arvona `metered`,
joten huomenna lisätty palveluntarjoaja aloittaa tilaustason ulkopuolelta ja on lisättävä siihen
tarkoituksella kuratoimalla.

## Tasomalli

Viisi tasoa eskalointijärjestyksessä. Ne eroavat toisistaan muussakin kuin hinnassa — jokaisella on **oma**
ehtymissignaalinsa, minkä vuoksi kyse ei ole pelkästä lajittelusta.

| #   | Taso           | Jäsenyys                                                          | Ehtynyt, kun                               |
| --- | -------------- | ----------------------------------------------------------------- | ------------------------------------------ |
| 0   | `subscription` | kuratoitu `billing: "subscription"`                               | kiintiöikkuna on raja-arvossa tai sen alla |
| 1   | `keyless`      | synteettinen ilman todennusta toimiva polku                       | yhteyden jäähdytys / katkaisija            |
| 2   | `free`         | käytön mukaan laskutettava yhteys, `classifyTier() === "free"`    | ilmainen käyttövara on käytetty loppuun    |
| 3   | `cheap`        | käytön mukaan laskutettava yhteys, `classifyTier() === "cheap"`   | tasokohtainen budjetti on käytetty         |
| 4   | `premium`      | käytön mukaan laskutettava yhteys, `classifyTier() === "premium"` | tasokohtainen budjetti on käytetty         |

Tasot 0–2 ehtyvät **kiintiön** perusteella, mikä on havaittavissa ja mitä jo seurataan. Tasoilla 3–4 ei ole
kiintiötä — maksullinen yhteys jatkaa palvelemista loputtomasti — joten niiden ainoa järkevä ehtymissignaali on tasokohtainen
**budjetti**. Ilman sitä ehdolla "eskaloi, kun halpa taso on ehtynyt" ei ole mitään laukaisinta.

## `auto/subscription` — sulkeutuu turvallisesti

Pooli = vain porras 0, rajattuna yhteyksiin, joiden ylitys on dokumentoitu `hard-stop`-toiminnoksi ja joista jokaisella on reaaliaikaisesti varmennettua kiintiövaraa. Kaikki monitulkintainen jätetään pois: kuratoimaton palveluntarjoaja, kiintiölukema, jota ei voi varmentaa, vanhentunut lukema tai ylitys, joka mitataan maksulliseksi.

Tyhjä pooli on **tarkoituksellinen** tulos, ei vika — kutsujan olemassa oleva tyhjän poolin käsittelypolku muuttaa sen selkeäksi virheeksi hiljaisen, laskutettavan varavaihtoehdon sijaan. Tämä on tunnisteen koko lupaus.

`keyless` ei tarkoituksella **täytä** ehtoja: tämä ryhmittely tarkoittaa ”tilausta, josta maksan”, joten todennusta vaatimaton taustapalvelu ei kuulu siihen. Käytä siihen `auto/thrifty`-ryhmittelyä (tai `auto/best-free`-ryhmittelyä).

### Yhteyksien turvallisuus

Ehdokas ei aina ole sidottu yhteen yhteyteen — loogisella ehdokkaalla on `allowedConnectionIds`-sallittujen luettelo, ja tosiasiallisesti käytettävä tili valitaan myöhemmin lähetysvaiheessa tiedostossa `open-sse/services/combo/autoStrategy.ts`. Siksi kumpikin ryhmittely varmentaa **jokaisen yhteyden erikseen** ja kirjoittaa `allowedConnectionIds`-arvon uudelleen sisältämään täsmälleen hyväksyttyjen yhteyksien osajoukon — ei koskaan koko alkuperäistä luetteloa eikä yhtä mielivaltaisesti valittua jäsentä. Koska `autoStrategy.ts` valvoo jo kyseistä taulukkoa tiukkana sallittujen luettelona, sen uudelleenkirjoittaminen tässä tekee ”varmennetuista” ja ”tosiasiallisesti käytetyistä” rakenteellisesti saman joukon. Tämä on sama invariantti ja sama perustelu kuin dokumentissa [STRICT_ZERO_COST](./STRICT_ZERO_COST.md).

## `auto/thrifty` — etene yksi porras kerrallaan

Pooli = kaikki portaat porrasindeksin mukaisessa järjestyksessä, loppuun käytetyt ehdokkaat pois rajattuina. `auto`-moottori pisteyttää edelleen jäljelle jääneen poolin **sisällä**: porrastus ratkaisee, mitkä portaat ovat mukana, ja pisteytys ratkaisee, mikä niiden ehdokkaista voittaa. Järjestys säilyy vakaana portaan sisällä, joten tämä lisäkerros ei koskaan järjestä pisteyttäjän omaa sijoitusta uudelleen.

Tämä on järjestys- ja rajauskerros, **ei** uusi välitysmekanismi: `combo.ts`-tiedoston spekulatiivinen silmukka käy jo kohteet läpi järjestyksessä ja siirtyy epäonnistumisen jälkeen seuraavaan, joten ennakkotarkistukselta huomaamatta jäänyt suorituksenaikainen kiintiön loppuminen johtaa edelleen saman pyynnön sisällä seuraavalle portaalle siirtymiseen.

Siinä missä `auto/subscription` sulkeutuu turvallisesti, `auto/thrifty` pysyy **avoimena**: tilaukseen sisältyvää yhteyttä, jolle ei ole käytettävissä kelvollista kiintiölukemaa, yritetään silti ensin. Sen yrittäminen ei maksa mitään, ja jos se osoittautuu loppuun käytetyksi, varapolku saavuttaa joka tapauksessa seuraavan portaan — kun taas yrityksestä kieltäytyminen lähettäisi pyynnön maksulliselle portaalle puuttuvan telemetrian vuoksi, mikä on täsmälleen se lopputulos, jota ryhmittelyllä pyritään välttämään.

## Palaaminen tilaukseen nollauksen jälkeen

Kolmen toisistaan riippumattoman asian on vanhennuttava, ennen kuin reititys palaa portaalle 0. Vain yhden korjaaminen jättää porrastuksen jumiin maksullisille portaille vielä pitkäksi aikaa tilauksen kiintiön täyttymisen jälkeen.

1. **Kiintiötilan välimuisti** — `freeAccessQuota.ts` tallentaa välimuistiin yhteyskohtaiset tiedot avaimella `(provider, connection)` käyttäen 180 sekunnin TTL-arvoa. Välimuistimerkintä, jonka oma `resetAt`-ajankohta on jo ohitettu, kuvaa ikkunaa, jota ei enää ole, joten sitä käsitellään nyt vanhentuneena **iästä riippumatta** ja se pakottaa päivityksen. Ilman tätä keskiyöllä täyttynyt tilaus näkyy loppuun käytettynä, kunnes TTL sattuu umpeutumaan.
2. **Porrastuksen oma tila** — sellaista ei suunnitellusti ole. Portaiden kelpoisuus lasketaan uudelleen reaaliaikaisesta kiintiötilasta jokaisella poolin muodostuskerralla; mitään pysyvää ”nyt portaalla 3” -tietuetta ei ole, joten sellainen ei voi säilyä nollauksen yli ja jumittaa reititystä.
3. **Yhteyden jäähdytysaika** — kiintiön kuluttava 429 asettaa `rateLimitedUntil`-arvon eksponentiaalisen viiveen perusteella, mikä voi tilaussopimuksen yhteydellä ylittää todellisen nollausajankohdan. `clampCooldownToReset()` (`subscriptionLadder.ts`) lyhentää jäähdytysajan ylävirran omaan nollausajankohtaan eikä voi koskaan pidentää sitä. **Se on toteutettu ja testattu, mutta sitä ei ole vielä kytketty käyttöön**: kiintiövälimuisti mitätöidään tiedostossa `src/sse/services/auth.ts` _ennen_ jäähdytysajan kirjoittamista, joten `resetAt` on tallennettava aiemmin kyseisessä funktiossa — kyseessä on vikasietoisuuden kriittisen suorituspolun muutos, joka kuuluu omaan tarkastettavaan PR:äänsä. Siihen asti uudelleen käyttöönotto odottaa yhteyden jäähdytysajan päättymistä (ja jäähdytysaika suosii jo ylävirran `Retry-After`-vihjeitä, kun palveluntarjoaja lähettää niitä).

### Heilahtelun esto

Juuri nollattu porras hyväksytään takaisin vasta, kun `reentryMinRemainingPercent` ylittyy (oletus 5), kun taas jo käytössä olevan yhteyden tarvitsee vain pysyä `exitCutoffPercent`-arvon yläpuolella (oletus 2, sama kuin `quotaPreflight.defaultThresholdPercent`). Arvojen välinen ero muodostaa hystereesialueen — ilman sitä raja-arvon tuntumassa oleva yhteys heilahtelisi peräkkäisissä pyynnöissä portaiden välillä.

## Määritykset

Vain hienosäätöä varten. Tarkoituksella **ei** ole `enabled`-lippua: valitsin, jolla nämä voisi poistaa käytöstä,
jättäisi `auto/subscription`-tunnuksen tarjoamaan kaikessa hiljaisuudessa koko mallivalikoimaa — maksulliset mallit mukaan lukien — nimellä,
joka lupaa päinvastaista.

```jsonc
{
  "subscriptionLadder": {
    "exitCutoffPercent": 2,
    "reentryMinRemainingPercent": 5,
    "rungBudgetUsd": { "cheap": 5.0, "premium": 0 }, // 0 poistaa portaan kokonaan käytöstä
  },
}
```

Budjettirajoitus ei vaikuta mihinkään, ennen kuin kulutuksen selvittäjä on kytketty: jos kirjanpitotietoja ei ole saatavilla, maksullinen
porras järjestetään mutta sitä ei koskaan rajoiteta. Versiosta v3.8.51 alkaen skeema hyväksyy `rungBudgetUsd`-asetuksen,
mutta sitä EI vielä valvota — käsittele sitä varattuna määrityksenä, älä aktiivisena kulutusrajana. Portaiden järjestys, kiintiöön perustuva ehtyminen ja palautumisen jälkeinen uudelleenaktivointi
toimivat ilman sitä.

## Koostaminen

`subscription` ja `thrifty` ovat `AutoTier`-arvoja, joten niitä voi yhdistää kaikkiin luokkiin:
`auto/coding:thrifty`, `auto/reasoning:subscription` ja niin edelleen. Kaksi perustunnusta
(`auto/subscription`, `auto/thrifty`) ovat esillä `/v1/models`-rajapinnassa ja hallintapaneelissa.

Kumpikaan tunnus ei kuulu maksulliseen tasoon, joten `isPaidTierAutoId()` palauttaa molemmille arvon `false`, ja
`auto/subscription` säilyy `hidePaidModels`-asetuksesta huolimatta.

## Koodin sijainti

| Osa-alue                                             | Tiedosto                                            |
| ---------------------------------------------------- | --------------------------------------------------- |
| Kuratoidut laskutustiedot                            | `open-sse/config/connectionBillingCatalog.ts`       |
| Luokittelija                                         | `open-sse/services/autoCombo/connectionBilling.ts`  |
| Portaat, molemmat ryhmittelyt ja uudelleenaktivointi | `open-sse/services/autoCombo/subscriptionLadder.ts` |
| Kytkentä ehdokasjoukkoon                             | `open-sse/services/autoCombo/virtualFactory.ts`     |
| Palautumisen huomioiva välimuistin vanhentuminen     | `open-sse/services/autoCombo/freeAccessQuota.ts`    |
| Tasojen rajapinta                                    | `open-sse/services/autoCombo/suffixComposition.ts`  |
| Ilmoitetut tunnukset                                 | `open-sse/services/autoCombo/builtinCatalog.ts`     |
| Testit                                               | `tests/unit/autoCombo/subscription-ladder.test.ts`  |
