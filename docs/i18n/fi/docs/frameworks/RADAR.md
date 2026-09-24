# Radar Free-Model Catalog (Suomi)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/RADAR.md) · 🇪🇹 [am](../../../am/docs/frameworks/RADAR.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/RADAR.md) · 🇦🇿 [az](../../../az/docs/frameworks/RADAR.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/RADAR.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/RADAR.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/RADAR.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/RADAR.md) · 🇩🇰 [da](../../../da/docs/frameworks/RADAR.md) · 🇩🇪 [de](../../../de/docs/frameworks/RADAR.md) · 🇬🇷 [el](../../../el/docs/frameworks/RADAR.md) · 🇪🇸 [es](../../../es/docs/frameworks/RADAR.md) · 🇪🇪 [et](../../../et/docs/frameworks/RADAR.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/RADAR.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/RADAR.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/RADAR.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/RADAR.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/RADAR.md) · 🇮🇱 [he](../../../he/docs/frameworks/RADAR.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/RADAR.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/RADAR.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/RADAR.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/RADAR.md) · 🇮🇩 [id](../../../id/docs/frameworks/RADAR.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/RADAR.md) · 🇮🇹 [it](../../../it/docs/frameworks/RADAR.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/RADAR.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/RADAR.md) · 🇰🇭 [km](../../../km/docs/frameworks/RADAR.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/RADAR.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/RADAR.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/RADAR.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/RADAR.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/RADAR.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/RADAR.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/RADAR.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/RADAR.md) · 🇲🇲 [my](../../../my/docs/frameworks/RADAR.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/RADAR.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/RADAR.md) · 🇳🇴 [no](../../../no/docs/frameworks/RADAR.md) · 🇮🇳 [or](../../../or/docs/frameworks/RADAR.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/RADAR.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/RADAR.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/RADAR.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/RADAR.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/RADAR.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/RADAR.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/RADAR.md) · 🇱🇰 [si](../../../si/docs/frameworks/RADAR.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/RADAR.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/RADAR.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/RADAR.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/RADAR.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/RADAR.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/RADAR.md) · 🇮🇳 [te](../../../te/docs/frameworks/RADAR.md) · 🇹🇭 [th](../../../th/docs/frameworks/RADAR.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/RADAR.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/RADAR.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/RADAR.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/RADAR.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/RADAR.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/RADAR.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/RADAR.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/RADAR.md)

---

> **Totuuden lähde:** `src/lib/radar/`, `src/lib/db/radar.ts`, `src/app/api/radar/`
> **Päivitetty viimeksi:** 2026-09-01 — v3.8.51
> **Isännöidyn palvelun todentamisen rajaus:** tässä kuvatut palvelinpuolen säännöt vahvistettiin
> 2026-09-01 tarkoituksella yksityistä Radar-palvelinta vasten täsmällisessä revisiossa
> `main@dce70f004364912f3f144cdb69f4cbcde16093ed`. Tätä toteutusta ei jaella tässä
> OSS-repositoriossa; saatavuus isännöitynä palveluna on edelleen erillinen operatiivinen tila.

Radar on **valinnainen lisäosa**, joka lisää julkaisuun sisältyvän perustason luettelon
(`FREE_MODEL_BUDGETS` tiedostossa
`open-sse/config/freeModelCatalog.data.ts`) päälle allekirjoitetun ja vastikään kuratoidun
ilmaismalliluettelon. Se on olemassa, koska ilmaisten käyttöluokkien tarjonta muuttuu
julkaisutahtia nopeammin — palveluntarjoajat lisäävät, pienentävät tai lopettavat ilmaisia
kiintiöitä julkaisujen välillä, ja perustason luettelo voidaan päivittää vain uuden version
julkaisun yhteydessä.

**Mikään tänään ilmainen ei lakkaa olemasta ilmainen etäsyötteen vuoksi.** Radar ei koskaan
aseta perustason merkintää maksumuurin taakse; se ainoastaan päivittää rajat ja tilakentät
lukuhetkellä ja voi lisätä julkaisujen välillä uusia löydettyjä ilmaismalleja. Ylläpitäjä voi
edelleen piilottaa mallin paikallisesti ja palauttaa sen samasta hallintapaneelista. Itse
perustason luetteloa ei koskaan muuteta levyllä — katso alta
[Lukuhetken päällekkäiskuvan yhdistämissäännöt](#read-time-overlay-merge-rules).

---

## Toimitustila versiossa v3.8.51

Seuraava tila erottaa tämän OSS-julkaisun toteuttamat ominaisuudet myöhemmistä Radarin
kehityskokonaisuuksista. Kyse on kooditason tilasta, ei lupauksesta siitä, että jokin tietty
isännöity käyttöönotto tai ulkoinen integraatio olisi tällä hetkellä saatavilla.

| Osa-alue                           | Tila tässä julkaisussa                                                                                                                                                                                                                                                                                             |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Allekirjoitetun luettelon asiakas  | Toteutettu `RADAR_ENABLED`-asetuksen taakse erillisellä käyttöönottovalinnalla, Ed25519-varmennuksella, paikallisilla salatuilla asetuksilla ja välimuistilla, pysyvillä näyttö- ja käyttöönottotilan ohituksilla, palautettavilla hautakivimerkinnöillä, ajoittimella ja hallintapaneelilla.                      |
| Osallistujan aktivointi            | Hallintapaneeli linkittää palvelimella isännöityyn GitHub-lunastusprosessiin ja hyväksyy olemassa olevan `omr_…`-avaimen. Yksityinen palvelu ratkaisee osallistujan kelpoisuuden; OSS-asiakas ei sisällä GitHub-tunnusta eikä avainten myöntämislogiikkaa.                                                         |
| Tukija-avaimella aktivointi        | Toteutettu. Raaka avain validoidaan, salataan levossa, peitetään lukutoiminnoissa ja lähetetään vain palvelinpuolen synkronoinnissa. Avaimen muuttaminen tai tyhjentäminen mitätöi kaikki neljä käyttöoikeuksista riippuvaa syötevälimuistia.                                                                      |
| Suosittelulinkit                   | Toteutettu erikseen allekirjoitettuna, tunneittain päivitettävänä syötteenä. Kiinteät linkit ovat heti yhteisötason käytettävissä; rajoitetut kampanjat säilyvät reaaliaikaisen tason datana.                                                                                                                      |
| Tukijatarjoukset                   | Toteutettu erillisenä allekirjoitettuna, vain reaaliaikaisena syötteenä ja hallintapaneelin sivuna. Asiakas validoi suljetun etuskeeman uudelleen, säilyttää viimeisen kelvollisen välimuistin, suodattaa vanhentuneet merkinnät ja merkitsee kumppanitarjoukset erikseen.                                         |
| Tiedot ja tukijan tunnustaminen    | Toteutettu tiukkana allekirjoitettuna, vain reaaliaikaisena syötteenä, joka sisältää Radarin hallinnoiman ELO-luokituksen, tosiasioihin perustuvat luettelon ajantasaisuus- ja trenditiedot, vahvistetun paikallisen tukijamerkin, hallintapaneelin sivun sekä vain paikalliset CLI-tila- ja synkronointikomennot. |
| Maksut ja tapahtumasähköpostit     | Ei toteutettu OSS-asiakkaassa. Ostot, lahjoitukset, kuittien tarkistus, palautus ja sähköpostien toimitus kuuluvat yksityiselle palvelulle; saatavuus isännöitynä palveluna riippuu edelleen sen valvotusta käyttöönotosta ja palveluntarjoajan määrityksistä.                                                     |
| Tutkimusagentin kehityskokonaisuus | Ei kuulu tähän asiakasjulkaisuun. Kuratoitujen syötteiden sisältö säilyy palvelinpuolen datana; OmniRoute-asennuksessa ei suoriteta autonomista tutkimusagenttia.                                                                                                                                                  |

---

## Julkisten ilmoitusten lukija

Yleinen ilmoitusten lukija on erillinen Radar-ominaisuuslipusta. Hallintapaneelin etusivu ja
muutoslokin katselin hakevat repositorion julkisen `news.json`-tiedoston tavallisella `GET`-pyynnöllä
osoitteesta `NEWS_JSON_URL` (`src/shared/utils/releaseNotes.ts`). Ne eivät lähetä Radar-asetuksia, kehotteita, palveluntarjoajan
määrityksiä, käyttötietueita tai paikallista sivuutustilaa.

`news.json` käyttää suljettua v2-skeemaa, jonka `parseNewsPayload()` toteuttaa:

- `schemaVersion: 2` ja kooltaan rajoitettu `items[]`-kokoelma;
- vakaat ja yksilölliset ilmoitusten `id`-arvot;
- eksplisiittiset `active`- ja ISO-muotoiset `publishedAt`-kentät;
- pakollinen englanninkielinen sisältö ja valinnainen lokalisoitu sisältö;
- valinnaiset HTTPS-linkit, jotka eivät edellytä tunnistetietoja, sekä sallittujen luettelossa oleva kuvake;
- uusimman aktiivisen ilmoituksen valinta ensin, varakielenä englanti ja paikallinen sivuuttaminen tunnuskohtaisesti.

Jäsennin hyväksyy väliaikaisesti aiemman yksiköllisen `{ active, title, message, ... }`-muodon, jotta
vanhemmat fork-versiot voidaan siirtää rikkomatta muutoslokinäkymää. Virheelliset syötteet eivät tee mitään. Radarin julkaisuilmoitus
toimitetaan arvolla `active: false`; sen muuttaminen arvoon `true` on erillinen yhdistämisen ja käyttöönoton jälkeinen
julkaisutoimenpide, eikä se muuta `RADAR_ENABLED`-asetusta tai erillistä syötteen synkronoinnin suostumusta.

---

## Ominaisuuslippu: `RADAR_ENABLED` (oletuksena pois käytöstä)

Radar on suojattu päästä päähän `RADAR_ENABLED`-ominaisuuslipulla
(`src/shared/constants/featureFlagDefinitions.ts`, luokka `policies`,
`defaultValue: "false"`).

**Kun ominaisuuslippu on pois käytöstä, käyttöliittymäpintaa ei ole olemassa:**

- Kaikki `/api/radar/*`-päätepisteet, mukaan lukien paikallisen mallitilan luku- ja kirjoitustoiminnot,
  palauttavat `404` ennen minkään Radar-moduulin käsittelyä.
- Hallintapaneelin näkymät (`/dashboard/radar`, `/dashboard/radar/setup`,
  `/dashboard/radar/combos`, `/dashboard/radar/offers`, `/dashboard/radar/intel`) suorittavat
  `notFound()`-kutsun.
- `getRadarCatalog()` (`src/lib/radar/index.ts`) palauttaa muuttamattoman perustason —
  sama tietuemäärä, samat arvot ja jokaisessa tietueessa tunniste `origin: "baseline"` — eikä koskaan
  lue syötteen välimuistia.
- Radar ei koskaan tee verkkokutsuja; jokainen synkronointimoduuli palauttaa `{ status: "disabled" }`
  ennen `fetch`-funktion käsittelyä.

Tämä on tiukka kattava portti: ominaisuuslipun ottaminen käyttöön avaa vain _näkymät_, ei
mitään muuta. Se ei lähetä tietoja palvelimelle, käynnistä taustasynkronointia eikä muuta
reititystä tai mallin valintaa — katso erillinen suostumus alta.

---

## Tietojen synkronointi on ERILLINEN suostumus — tietosuojalupaus

`RADAR_ENABLED`-asetuksen ottaminen käyttöön avaa vain käyttöliittymän. Syötteen synkronointi edellyttää toista,
erillistä suostumusta, joka tallennetaan kenttään `radar_settings.opt_in` (`src/lib/db/radar.ts`,
migraatio `136_radar_cache_settings.sql`). `syncRadar()` tarkistaa ominaisuuslipun _ja_ suostumuksen
ennen minkään verkkokutsun tekemistä:

```
Ominaisuuslippu pois käytöstä → { status: "disabled" }   — ei verkkokutsua
Suostumusta ei annettu        → { status: "opt_out" }    — ei verkkokutsua
```

Kun molemmat ovat käytössä, synkronointipolku on seuraava:

1. `GET <syötteen perus-URL>/v1/catalog/latest`, otsakkeena `x-omniroute-radar-schema: 2` ja valinnaisena
   otsakkeena `Authorization: Bearer <tukija-avain>` (katso alta). Jos skeemaotsake puuttuu, palvelimet käyttävät oletuksena erikseen
   allekirjoitettua v1-siirtymäartefaktia, jotta vanhemmat asennetut asiakasohjelmat saavat edelleen
   päivityksiä.
2. Tämä on vain tietoja lataava sovellusprosessi, mutta kyseessä on silti HTTPS-pyyntö. Isännöity
   infrastruktuuri vastaanottaa tavanomaisia yhteyden metatietoja, kuten lähde-IP-osoitteen. Kun tukija-avain
   on määritetty, synkronointi lähettää myös kyseisen avaimen Bearer-otsakkeessa, jotta palvelu voi selvittää
   käyttöoikeuden. Yllä määritetyssä todisterajauksessa yksilöidyn yksityisen palvelimen täsmällisessä versiossa
   syötepyyntöjen kirjanpito käyttää avainten tiivisteitä, koostettuja käyttötietoja ja IP-osoitteesta päivittäin vaihtuvalla avaimella laskettua katkaistua HMAC-arvoa
   väärinkäytösten manuaalista tarkastelua varten; näihin tauluihin ei tallenneta avainta tai IP-osoitetta käsittelemättömässä muodossa.
   Infrastruktuurin käyttölokit ja salattu toimituksen lähtevien viestien jono ovat erillisiä operatiivisia
   rajoja.
3. OmniRoute ei koskaan lähetä Radar-palveluun kehotteita, vastauksia, keskusteluja, palveluntarjoajien tunnistetietoja, malliliikennettä,
   käytettävyysaikaa, viivettä tai paikallisia palveluntarjoajamäärityksiä.
4. Vastaus todennetaan, validoidaan ja tallennetaan paikalliseen välimuistiin (katso
   [Suojausmalli](#security-model)). Radarilla on täsmälleen neljä palvelinpuolen verkkopolkua:
   `syncRadar()` luetteloa varten, `syncRadarReferrals()` suosituksia varten sekä
   `syncRadarOffers()` / `syncRadarIntel()` vain tukijoille tarkoitettuja tarjouksia ja Intel-tietoja varten.

**Tukija-avain** on valinnainen Bearer-tunnus (`radar_settings.supporter_key`),
jonka avulla syötepalvelu voi päättää tarjottavan tason (katso
[Tasot](#tiers-community-and-live)). Se:

- Tallennetaan **levossa salattuna** samoilla AES-256-GCM-`encrypt()`/`decrypt()`-apufunktioilla
  (`src/lib/db/encryption.ts`), joita käytetään palveluntarjoajien tunnistetietoihin.
- Asetetaan `POST /api/radar/settings` -pyynnöllä (`{ supporterKey: "omr_" + 40 hex chars }`), eikä sitä
  **koskaan palauteta sellaisenaan** — vastaus palauttaa peitetyn muodon (`omr_****abcd`).
- Sen muuttaminen tai poistaminen mitätöi atomisesti luettelon, suositusten, tarjousten ja Intel-tietojen välimuistit. Seuraava
  synkronointi tai luku selvittää uuden käyttöoikeuden palvelinpuolella; avaimen tallentaminen ei itsessään tee
  verkkopyyntöä eikä kuluta kertakäyttöistä aktivointiavainta.
- Lähetetään syötepalvelulle Bearer-tunnuksena synkronoinnin GET-pyynnössä — mitään muuta avaimeen liittyvää
  ei koskaan poistu asiakasohjelmasta.

---

## Ennen suostumusta näytettävät käyttöoikeus- ja turvallisuussäännöt

Passiivinen hallintapaneeli näyttää nämä säännöt tiedostosta
`src/app/(dashboard)/dashboard/radar/RadarAccessExplainer.tsx` **ennen** kumpaakin aktivointitoimintoa.
Virallinen käyttöoikeusasteikko on:

| Taso                         | Kelpoisuus                                                                                                 | Käyttöoikeus                                                 | Toisto-/vanhenemissääntö                                                          |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ | --------------------------------------------------------------------------------- |
| Yhteisö                      | Kuka tahansa; avainta ei tarvita                                                                           | Koko katalogi noin 30 päivän viiveellä                       | Aina käytettävissä; ei myöntämistä                                                |
| Tähti + seuraaminen          | GitHub OAuth vahvistaa sekä tähden repositoriossa että omistajan seuraamisen                               | Yksi reaaliaikainen katalogin luku, sitten Yhteisö           | Yksi myöntökerta kirjautumista kohden; ei myönnetä uudelleen                      |
| Osallistuja Top 10           | Sijat 1–10 viimeisimmässä täydellisessä viikoittaisessa sijoituksessa                                      | 365 reaaliaikaista päivää                                    | Lunastetaan pyynnöstä; sijoituksesta poistuminen ei lyhennä myönnettyä ajanjaksoa |
| Osallistuja Top 100          | Sijat 11–100 kyseisessä sijoituksessa                                                                      | 90 reaaliaikaista päivää                                     | Sama pyynnöstä tehtävä/idempotentti lunastussääntö                                |
| Tukijan ostos                | Kertaluonteinen 6 kuukauden, 1 vuoden tai elinikäinen ostos                                                | Reaaliaikainen katalogi, allekirjoitetut tarjoukset ja Intel | Ei automaattista uusimista                                                        |
| Lahjoitus/manuaalinen myöntö | Omistajan tarkistama lahjoitus tai omistajan myöntämä nimenomainen määrä päiviä / elinikäinen käyttöoikeus | Sama reaaliaikainen käyttöoikeus myönnetyn ajanjakson ajan   | Auditoitu, idempotentti myöntö                                                    |

Yhdistetyt PR:t, commitit ja muutetut rivit ovat **ainoastaan sijoituksen syötteitä**. Top 100:n
ulkopuolelle jäävä kirjautuminen ei saa osallistujaetua PR:ien määrästä riippumatta. Määräaikaiset
ostokset, lahjoitukset, osallistujajaksot ja manuaaliset myönnöt kertyvät nykyisen vanhenemisajan
jatkoksi; elinikäinen käyttöoikeus on ensisijainen. Sijoituksen muutos ei koskaan peruuta
takautuvasti tai lyhennä jo myönnettyä aikaa.

Isännöity lisenssi on henkilökohtainen, ja käyttäjälle ilmoitettu sääntö sallii yhden aktiivisen
asennuksen kerrallaan. Tämä julkaisu **ei** väitä käyttävänsä laitteistolukitusta: OSS-synkronointi
ei muodosta laitteiston sormenjälkeä eikä ylläpidä kryptografista laitevuokraa. Edellä mainitussa
vahvistetussa yksityisen palvelimen revisiossa toteutettu valvonta koostuu käyttöoikeuden
vahvistamisesta sekä manuaalisen tarkistuksen signaalista, kun sama reaaliaikainen avain havaitaan
neljännestä erillisestä IP-osoitteesta 24 tunnin sisällä. Tämä signaali ei koskaan estä tai peruuta
avainta automaattisesti. Palautus peruuttaa ja korvaa kadonneen avaimen säilyttäen nykyisen
vanhenemisajan; se ei käynnistä ostettua tai myönnettyä ajanjaksoa uudelleen.

Reaaliaikaiset tarjoukset kuratoidaan manuaalisesti, ja ne voivat muuttua tai vanhentua.
Suostumusnäytössä ilmoitetaan myös täsmällinen yksityisyyden raja: allekirjoitetut katalogi- ja
viittausmetatiedot ladataan; kelvollinen avain avaa lisäksi allekirjoitetut tarjoukset ja Intelin;
Bearer-avain ja tavanomaiset yhteyden metatiedot välitetään isännöidylle palvelulle; kehotteita,
vastauksia, keskusteluja, palveluntarjoajan tunnistetietoja, malliliikennettä, käytettävyysaikaa,
viivettä ja paikallisen palveluntarjoajan määrityksiä ei välitetä.

---

## Tukija-avaimen hankkiminen

Aktivointinäyttö (`/dashboard/radar`) sisältää linkit kahteen tapaan **hankkia**
tukija-avain. Itse OSS-repositorio ei koskaan myönnä avaimia, suorita maksukoodia
eikä **koskaan ilmoita hintaa** — hinnoittelu päätetään ja näytetään kokonaisuudessaan
kohdesivuilla, ei tässä repositoriossa (määrittelypäätös D14).

- **"Olen osallistuja"** — avaa osoitteen `RADAR_CONTRIBUTOR_CLAIM_URL` (oletuksena
  `https://radar.omniroute.online/auth/github`), joka on yksityisellä Radar-palvelimella ylläpidetty
  GitHub OAuth -lunastusprosessi. Se tarkistaa uusimman valmiin viikoittaisen sijoituksen: kymmenen
  parasta saa 365 päivää ja sijoille 11–100 sijoittuneet saavat 90 päivää. Sadan parhaan
  ulkopuolella PR-määrä ei koskaan anna käyttöoikeutta, vaan prosessi tarkistaa sen sijaan erillisen
  tähteen + seuraamiseen perustuvan kertakäyttöisen tason.
- **"Tue projektia"** — avaa osoitteen `RADAR_SUPPORTER_PLANS_URL` (oletuksena
  `https://radar.omniroute.online/planos`), joka on kertamaksullisten 6 kuukauden, 1 vuoden ja
  elinikäisten vaihtoehtojen ylläpidetty sivu. OSS-sivu ei edelleenkään näytä rahallista arvoa.

Molemmat URL-osoitteet ratkaistaan palvelinpuolella (`src/lib/radar/links.ts`, sama
ympäristömuuttujalla ohitettava malli kuin muuttujalla `RADAR_FEED_URL`) ja välitetään
koontinäyttöön olemassa olevan `GET /api/radar/settings` -vastauksen kautta
(`contributorClaimUrl`, `supporterPlansUrl`) — asiakaskomponentti ei koskaan lue itse
`process.env`-arvoa.

| Muuttuja                      | Tarkoitus                                                                                          |
| ----------------------------- | -------------------------------------------------------------------------------------------------- |
| `RADAR_CONTRIBUTOR_CLAIM_URL` | Ohittaa osallistujan lunastus-URL-osoitteen (oletus `https://radar.omniroute.online/auth/github`). |
| `RADAR_SUPPORTER_PLANS_URL`   | Ohittaa tukijapakettien URL-osoitteen (oletus `https://radar.omniroute.online/planos`).            |

### Kadonneen tukija-avaimen palauttaminen

Ylläpidetyn palvelun palautuksen aloituspiste on `https://radar.omniroute.online/recover`; siihen on
linkki myös pakettisivulta. Palautus tapahtuu kokonaan OSS-asiakkaan ulkopuolella, koska paikallinen
asennus ei koskaan vastaanota ostajan/osallistujan sähköpostiosoitetta eikä pysty muodostamaan
raakamuotoista avainta uudelleen salatuista asetuksistaan.

1. Lähetä avaimeen liitetty sähköpostiosoite. Palvelu palauttaa saman hyväksymissivun riippumatta
   siitä, onko palautettavissa olevaa lisenssiä olemassa, joten lomake ei paljasta tilejä.
2. Jos käyttäjä täyttää ehdot, toimitustyöntekijä lähettää lyhytikäisen kertakäyttölinkin. Sen
   avaaminen siirtää tunnisteen välittömästi tilapäiseen salattuun `HttpOnly`/`Secure`-evästeeseen
   ja uudelleenohjaa puhtaaseen `/recover`-URL-osoitteeseen; sivu ei sisällä tunnistetta,
   sähköpostiosoitetta, vanhaa avainta eikä korvaavaa avainta.
3. Vahvista mitätöinti. Yksityinen palvelu mitätöi aiemman avaimen, luo korvaavan avaimen samalla
   paketilla/vanhenemisajalla ja lisää sen sähköpostijonoon yhdessä tapahtumassa. Korvaavaa avainta
   ei koskaan palauteta selaimelle.
4. Liitä korvaava avain näkymään `/dashboard/radar`. Vanhan avaimen on nyt alennuttava
   `community`-tasolle ja korvaavan avaimen on tuotettava vahvistettu `live`-synkronointi. Saman
   palautuslinkin avaamisen uudelleen on epäonnistuttava yleisluontoisella virheellinen/vanhentunut-vastauksella.

Ylläpidetyn palautusreitin ja sähköpostityöntekijän koodi voi olla olemassa, vaikka ne eivät olisi
käytettävissä tietyssä käyttöönotossa. Älä kutsu prosessia tuotantovalmiiksi, ennen kuin palvelin on
otettu käyttöön, toimituspalveluntarjoaja on määritetty hallitulla vastaanottajalla ja koko
kertakäyttölinkki on testattu.

Kun kävijällä on avain (`omr_` + 40 heksadesimaalimerkkiä), aktivointinäytön
(`src/app/(dashboard)/dashboard/radar/page.tsx`) ensisijainen toimintatapa on avaimen
liittämiseen tarkoitettu syöttökenttä: avaimen liittäminen ja lähettäminen lähettää pyynnön
`POST /api/radar/settings` (`{ optIn: true, supporterKey }`) yhdellä kutsulla — avaimen
liittäminen sekä asettaa sen että ottaa toiminnon käyttöön ja avaa näytön. Muoto (`omr_` +
40 heksadesimaalimerkkiä) tarkistetaan ensin asiakaspuolella jaetulla
`isValidSupporterKeyFormat()`-apufunktiolla (`src/lib/radar/supporterKey.ts`)
käyttökokemuksen parantamiseksi; palvelimen Zod-skeema on joka tapauksessa määräävä
tarkistus. Kun avain on asetettu, aktivointinäyttö näyttää peitetyn muodon
(`supporterKeyMasked` vastauksesta `GET /api/radar/settings`) tyhjän syöttökentän sijaan
sekä "vaihda avain" -säätimen uuden avaimen liittämistä varten — raakamuotoista avainta
ei koskaan näytetä uudelleen. Yllä olevat kaksi lunastus-/pakettipainiketta ovat edelleen
tapa _hankkia_ avain alun perin; tässä syöttökentässä avaimen jo omistava ylläpitäjä
aktivoi sen.

### Kokonaisvaltainen aktivointi ja ohjattu määritys

Yksityisellä syötepalvelulla ja tällä OSS-asiakkaalla on tarkoituksellisesti tarkasti rajattu
vastuunjako: palvelu myöntää ja vahvistaa tukija-avaimen, kun taas paikallinen OmniRoute-asennus
salaa avaimen, synkronoi allekirjoitetut artefaktit palvelinpuolella ja opastaa palveluntarjoajan
määrityksessä. Avustetun vahvistuksen järjestys on:

1. Hanki uusi tai palautettu avain tukijan lunastuksesta, paketeista/kassalta, palautuspolusta tai valtuutetulta yksityisen palvelimen ylläpitäjältä. Älä liitä raakaa avainta lokeihin, kuvakaappauksiin, ongelmaraporttien kommentteihin tai komentoriviargumentteihin.
2. Ota `RADAR_ENABLED`-ominaisuuslippu käyttöön paikallisessa OmniRoute-asennuksessa. Tämä tuo käyttöliittymän näkyviin, mutta verkkoyhteyksiä ei käytetä, ennen kuin erillinen suostumus on tallennettu.
3. Avaa `/dashboard/radar`, liitä avain ja aktivoi. Selain lähettää paikallisesti yhden `POST /api/radar/settings` -pyynnön, jonka sisältö on `{ optIn: true, supporterKey }`; avain salataan paikallisesti, ja vastaus sisältää vain arvon `omr_****<last4>`.
4. Anna aktivointinäytön suorittaa luettelon synkronointi tai valitse **Synkronoi nyt**. Varmista, että sivu näyttää tilan `live`, syötteen version ja noutoajan. Todennusta edellyttävää paikallista diagnostiikkaa varten `GET /api/radar/status` ilmoittaa suostumuksen ja avaimen olemassaolon sekä neljä välimuistin tilaa palauttamatta avainta. `POST /api/radar/sync-all` voi päivittää erikseen luettelon, suosittelut, tarjoukset ja Intel-tiedot.
5. Avaa `/dashboard/radar/setup?provider=<provider>`. Siirry palveluntarjoajan ylläpitämään tunnistetietojen URL-osoitteeseen, valitse **Lisää API-avain**, tallenna oikealla palveluntarjoajan lomakkeella, palaa oppaaseen ja suorita **Testaa yhteys**. Opas käyttää tavallisia `/api/providers`- ja `/api/providers/<connection-id>/test`-reittejä; se ei luo erillistä Radar-tunnistetietoa.
6. Avaa `/dashboard/radar/combos`, kun vähintään kaksi yhteensopivaa palveluntarjoajayhteyttä on aktiivisena. Tarkista ehdotettu perhe ja luo yhdistelmä olemassa olevan yhdistelmä-API:n kautta. Tarjoukset ja Intel-tiedot säilyvät erillisinä, vain live-tasolla käytettävinä allekirjoitettuina välimuisteina, ja ne voidaan tarkistaa omilla Radar-sivuillaan.
7. Lataa `/dashboard/radar` ja määrityssivu uudelleen. Suostumuksen, peitetyn avaimen tilan, vahvistetun välimuistin, tallennetun palveluntarjoajayhteyden ja testaustoiminnon on säilyttävä uudelleenlatauksen jälkeen. Tallenna todisteet vasta, kun raaka avain ja palveluntarjoajan tunnistetieto eivät enää ole näkyvissä.

Avaimen tallentaminen ei itsessään todista voimassa olevaa live-käyttöoikeutta. Todiste muodostuu yksityisen palvelun `GET /v1/license/check` -tuloksen, avoimen lähdekoodin luettelon tarjoaman `live`-tason, vahvistetun allekirjoitetun välimuistin sekä oikean palveluntarjoajayhteyden ja sen testausprosessin yhdistelmästä. Virheellinen, vanhentunut tai peruutettu avain palauttaa luettelon turvallisesti `community`-tasolle; sitä ei saa ilmoittaa onnistuneeksi live-avaimen vahvistukseksi.

### Yksityisen hallintapaneelin linkki

`RADAR_ADMIN_URL` lisää valinnaisesti **Radar Admin ↗** -kohdan välittömästi käyttäjälle näkyvän Radar-kohdan jälkeen sivupalkin Kustannukset-osioon. Sillä ei tarkoituksella ole oletusarvoa: kun muuttujaa ei ole asetettu tai se on virheellinen, staattinen sivupalkki, komentopaletti ja sivupalkin mukautusnäyttö eivät sisällä hallintakohdetta eivätkä yksityistä URL-osoitetta.

Arvo selvitetään palvelinpuolella ja välitetään hallintatodennusta edellyttävän `GET /api/settings` -vastauksen kautta vain todennetulle hallintapaneeli-istunnolle tai luotetulle loopback-omistajalle paikallisen kirjautumattoman alkumäärityksen aikana. CLI-, sisäisen palvelun ja manage-scope API-avaintodennus eivät saa sitä. Selain tarkistaa vastauksen uudelleen ennen ulkoisen linkin luomista, ja linkki avataan määritteillä `noopener noreferrer`.

Käytä tunnistetiedotonta HTTPS-tunneli- tai tailnet-URL-osoitetta. Salaamaton HTTP hyväksytään vain loopback-SSH-edelleenohjaukselle, kuten `http://127.0.0.1:9351`; muut skeemat, upotetut tunnistetiedot, virheellisesti muodostetut URL-osoitteet ja HTTP-etäkohteet hylätään turvallisesti, jolloin navigointi ei toimi.

---

## Suojausmalli

### Ed25519-allekirjoitus täsmällisille tavuille

Syötteen hyötykuorma on allekirjoitettu Ed25519:llä. `verifyFeedBytes()`
(`src/lib/radar/verify.ts`) tarkistaa allekirjoituksen verkon kautta vastaanotetuista
**täsmällisistä vastaustavuista** — hyötykuormaa ei koskaan sarjoiteta uudelleen ennen
tarkistusta, joten tavuntarkka uudelleenkoodaus ei voi huomaamatta mitätöidä tai
ohittaa allekirjoituksen tarkistusta. Tarkistuksen epäonnistuminen
(`invalid_signature`) keskeyttää synkronoinnin ennen kuin hyötykuormaa edes jäsennetään
tai tallennetaan välimuistiin.

### Kiinnitetty julkinen avain + avaimen vaihto

Tarkistuksessa käytettävä julkinen avain on kiinnitetty tiedostossa
`src/lib/radar/pinnedKeys.ts` olevaan taulukkoon (`PINNED_FEED_PUBLIC_KEYS`), jotta uusi
avain voidaan lisätä taulukon alkuun ennen avaimen vaihtoa ja edellisellä avaimella
allekirjoitetut vanhat välimuistissa olevat syötteet pysyvät kelvollisina seuraavaan
synkronointiin asti.

### Haarautuksia tukevat ympäristömuuttujien ohitukset

Kahden ympäristömuuttujan avulla haarautusten ja itse ylläpidettyjen asennusten
käyttäjät voivat ohjata asiakkaan oletusarvoisen OmniRoute-palvelun sijasta omaan
syötteeseensä — katso alta
[Syötteen ylläpitäminen itse](#how-to-self-host-a-feed):

| Muuttuja            | Tarkoitus                                                                                                                        |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `RADAR_FEED_URL`    | Ohittaa syötteen perus-URL-osoitteen (oletus `https://radar.omniroute.online`).                                                  |
| `RADAR_FEED_PUBKEY` | Ohittaa kiinnitetyn julkisen avaimen (base64-DER SPKI tai PEM) korvaten sisäänrakennetun taulukon tällä yksittäisellä avaimella. |

### Version alaraja

`syncRadar()` hylkää ladatun syötteen, jos sen `version` ei ole ehdottomasti nykyistä
välimuistiin tallennettua versiota uudempi (`compareVersions()`, pisteillä eroteltujen
`YYYY.MM.DD.n`-versioiden vertailu) — `{ status: "stale" }`. Tämä estää vaarantunutta
tai virheellisesti määritettyä syötepäätepistettä palauttamasta asiakasta vanhempaan,
eri tavalla allekirjoitettuun hyötykuormaan.

### Kaksi päivämäärää ja miksi molemmat säilytetään

Välimuistiin tallennetulla syötteellä on kaksi erillistä päivämäärää, ja niiden
sekoittumisen estäminen on juuri syy molempien säilyttämiseen:

| Kenttä        | Alkuperä                       | Kertoo                              |
| ------------- | ------------------------------ | ----------------------------------- |
| `generatedAt` | allekirjoitettu syötteen runko | kuinka vanhaa **data** on           |
| `fetchedAt`   | tämän asennuksen kello         | milloin tämä asennus **latasi** sen |

Muutama minuutti sitten haettu syöte voi sisältää viikkoja vanhoja lukuja, joten
pelkkä `fetchedAt` ei kerro ylläpitäjälle, ovatko päällekkäiskerroksen tiedot tuoreempia
kuin niiden alla olevat perustiedot. Molemmat tallennetaan pysyvästi
`radar_feed_cache`-välimuistiin, palautetaan `getRadarCatalog().meta`-arvossa ja
raportoidaan erikseen päätepisteessä `GET /api/radar/status`. Ennen `generated_at`-sarakkeen
lisäämistä (migraatio 163) välimuistiin tallennetun rivin arvoksi luetaan `null` —
tuntematon pysyy tuntemattomana eikä sille käytetä hakuajankohtaa. Välimuisti
`radar_referrals_cache` on säilyttänyt oman `generated_at`-arvonsa migraatiosta 142
lähtien.

Edellä kuvattu version alaraja vertaa `version`-arvoa, ei kumpaakaan päivämäärää.

Kaksi puutetta on edelleen jäljellä, molemmat tarkoituksellisesti: hallintapaneeli näyttää
edelleen vain tekstin `Last fetched`, joten koontipäivämäärän näyttäminen siellä vaatii
uuden selitteen (ja sen 41 lokalisointimerkintää); lisäksi tarjousten ja
tiedustelutietojen välimuistit eivät säilytä koontipäivämäärää lainkaan, vaikka niiden
syöteskeemat sisältävät sellaisen — siksi `GET /api/radar/status` jättää kentän pois
näiden kahden osalta sen sijaan, että se raportoisi arvon `null`, joka tulkittaisiin
"tuntemattomaksi".

### Skeeman validointi

Ladatut tavut jäsennetään ja validoidaan `RadarFeedSchema`-skeemaa
(`src/lib/radar/feedSchema.ts`, Zod-skeema) vasten **allekirjoituksen tarkistuksen jälkeen**.
Skeeman vastaamattomuus palauttaa `{ status: "invalid_schema" }`, eikä välimuistiin
tehdä muutoksia. Välimuistiin tallennettu hyötykuorma validoidaan varmuuden vuoksi
uudelleen jokaisella lukukerralla (`getRadarCatalog()`) — vioittuneen tai käsin
muokatun välimuistirivin tapauksessa käytetään perustietoja sen sijaan, että rivi
palveltaisiin.

### Vastauksen kokoraja (10 Mt)

`syncRadar()` asettaa syötteen vastausrungolle **10 Mt:n ehdottoman ylärajan** —
allekirjoitettu syöte on kilotavujen kokoinen JSON-dokumentti, joten tämän ylittävä
koko viittaa virheellisesti määritettyyn tai vihamieliseen `RADAR_FEED_URL`-osoitteeseen
(tai roskaa tarjoavaan ylävirran palveluun), ei kelvolliseen luetteloon. Raja
tarkistetaan kahdella tasolla:

1. `Content-Length`-otsakkeen ennakkotarkistus ohittaa rungon lukemisen kokonaan, kun
   otsake ilmoittaa jo enimmäisrajan ylittävän arvon.
2. Rungon lukemisen aikana tehtävä juoksevan kokonaissumman tarkistus valvoo rajaa
   myös silloin, kun `Content-Length` puuttuu tai ilmoittaa todellista kokoa pienemmän
   arvon — pelkkään otsakkeeseen ei koskaan luoteta. Kertyneiden osien yhdistäminen
   säilyttää täsmälliset tavut, joita tarvitaan myöhemmin tehtävään
   Ed25519-allekirjoituksen tarkistukseen.

Rajan ylittäminen palauttaa `{ status: "too_large" }` eikä muuta välimuistia, mikä
noudattaa samaa tietoja muuttamatonta toimintamallia kuin kaikki muutkin
synkronointivirheet (`invalid_signature`, `invalid_schema`, `stale`).

---

## Tasot: `community` ja `live`

Syötteen skeema sisältää kentän `tier: "community" | "live"`, jonka syötepalvelu määrittää **palvelinpuolella**
pyynnön perusteella (tukija-avaimen olemassaolo ja kelvollisuus)
— asiakas ei koskaan määritä omaa tasoaan.

- **`community`** — maksuton luettelo, joka on noin 30 päivää tuoreimpia
  tietoja jäljessä. Todentamaton pyyntö tai virheellisen avaimen sisältävä pyyntö saa tämän.
- **`live`** — tuorein luettelo, joka toimitetaan kelvollisen tukija-avaimen
  sisältäville pyynnöille.

**Virheellinen tai vanhentunut tukija-avain alentaa tason tasolle `community` — se ei koskaan ole
virhe.** Synkronointipolku erottaa vain allekirjoitus-, skeema- ja versiovirheet (kaikki
palautuvia eivätkä vaikuta välimuistissa olevaan tilaan kohtalokkaasti) onnistuneesta tuloksesta `{ status:
"updated", version, tier }`. Asiakkaan ei tarvitse käsitellä mitään tasokohtaista virhepolkua.

### Tarjottu taso tulee vastausotsakkeesta, ei allekirjoitetusta rungosta

Allekirjoitetun syötteen **rungon** `tier`-kenttä on aina `"live"` — syötepalvelu julkaisee
**kaksi allekirjoitettua artefaktia versiota kohden**: live sisältää nykyiset kampanjat, kun taas community
jättää ne pois. Kukin artefakti allekirjoitetaan omien täsmällisten tavujensa perusteella. Runko ei silti
toimi käyttöoikeuspäätöksen lähteenä, vaan pyynnölle tosiasiallisesti valittu taso välitetään
**`x-omniroute-feed-tier`-vastausotsakkeessa**, jonka palvelin määrittää pyynnön
`Authorization`-avaimen perusteella.

`syncRadar()` (`src/lib/radar/sync.ts::parseServedTierHeader()`) on ainoa paikka,
joka ratkaisee asiakkaan luottaman tason:

1. Jäsennä `x-omniroute-feed-tier` käyttäen `RadarTierSchema`-skeemaa (Zod) — puuttuva otsake tai
   arvo, joka ei ole täsmälleen `"community"` tai `"live"`, käsitellään **puuttuvana
   arvona** (sitä ei koskaan sellaisenaan hyväksytä välimuistiin tai käyttöliittymään; tämä kattaa myös vanhemmat syötepalvelimet,
   jotka ovat otsaketta vanhempia).
2. Käytä allekirjoitetun rungon `tier`-kenttää (aina `"live"`) varavaihtoehtona vain, jos vaihe 1
   ei tuota arvoa.
3. Ratkaistu taso tallennetaan välimuistiin ja palautetaan muodossa `{ status: "updated",
version, tier }` — hallintapaneeli näyttää tämän arvon, ei koskaan rungon raakaa
   kenttäarvoa.

---

## Lukuhetken yhdistämissäännöt

`applyFeed()` (`src/lib/radar/applyFeed.ts`) yhdistää välimuistissa olevan syötteen staattisen
perustason **päälle** **lukuhetkellä** `getRadarCatalog()`-funktion sisällä. Perustasotaulukkoa
(`FREE_MODEL_BUDGETS`) ei koskaan muokata — uusi `MergedEntry[]` lasketaan jokaisella
kutsulla.

Neljä sääntöä tärkeysjärjestyksessä:

1. **Syöte ei koskaan korvaa paikallista ohitusta.** Kenttäkohtaisesti: jos operaattori on
   mukauttanut tietueen kenttää (`localOverrides`-kartta, jonka avaimena on `provider:modelId`),
   syötteen arvo kyseiselle kentälle ohitetaan — operaattorin arvo voittaa.
2. **`enabled: false` poistaa tietueen käytöstä ja tallentaa alkuperän.** Syötetietue, joka poistaa
   tietueen käytöstä, asettaa yhdistettyyn tulokseen arvot `enabled: false` ja `disabledBy: "radar"`,
   jotta käyttöliittymä voi selittää, _miksi_ tietue muuttui käytettävissä olevasta poistetuksi käytöstä.
3. **Käyttäjän lisäämä tietue, jota ei ole syötteessä, säilyy muuttumattomana.** Tietueet, jotka
   ovat olemassa vain perustasossa (tai jotka lisättiin paikallisesti) ja joilla ei ole vastaavaa syötetietuetta,
   säilyvät muuttumattomina.
4. **Poistomerkinnällä merkittyä tietuetta ei koskaan palauteta.** Jos operaattori on nimenomaisesti poistanut
   tietueen (`tombstones`-joukko), syötteen myöhemmässä versiossa uudelleen lisäämä
   `provider:modelId` ei palauta sitä.

Muokattavat kentät ja poistomerkinnät säilytetään
`radar_local_model_state`-taulussa (migraatio `153_radar_local_model_state.sql`). Julkinen tietokanta-
adapteri (`src/lib/db/radar.ts`) muuntaa nämä rivit `applyFeed()`-funktion käyttämäksi `localOverrides`-kartaksi ja
`tombstones`-joukoksi; tuotantoympäristön `getRadarCatalog()` lataa tämän tilan,
kun ominaisuuslipun, välimuistin ja skeeman tarkistukset on läpäisty. Operaattori voi muokata vain kenttiä `displayName` ja `enabled`.
Palveluntarjoajan tai mallin identiteettiä, syötteen alkuperätietoja, kiintiötä, ominaisuuksia, käyttöehtoja
ja määritystietoja ei voi kirjoittaa tämän rajapinnan kautta.

Hallintapaneeli tarjoaa neljä paikallista toimintoa:

- **Muokkaa** muuttaa paikallista näyttönimeä ja käyttöönottotilaa.
- **Nollaa paikalliset muutokset** tyhjentää molemmat muokattavat kentät muuttamatta poistomerkintää.
- **Piilota** luo poistomerkinnän, jotta myöhemmät syötepäivitykset eivät voi luoda riviä uudelleen.
- **Palauta** poistaa poistomerkinnän; erikseen tallennettu ohitus säilyy voimassa.

Syötteen `enabled: false` säilyy turvallisuuspoikkeuksena: se ohittaa vanhentuneen paikallisen
`enabled: true`-arvon, pitää yhdistetyn tietueen poissa käytöstä ja tallentaa arvon `disabledBy: "radar"`.

Luettelojulkaisut käyttävät arvoa `schemaVersion: 2`. `contextWindow` sekä kukin kentistä `tools`, `vision` ja
`thinking` ovat toisistaan riippumatta tyyppiä `number | null` / `boolean | null`: `null` tarkoittaa tuntematonta, kun taas
`false` tarkoittaa, että D16-vahvistettu palveluntarjoajan virallinen lähde ilmoittaa nimenomaisesti ominaisuuden puuttuvan.
Sisäisiä OmniRoute-rekisterin tai mallimäärityksen lippuja ei koskaan ylennetä suoraan syötteen faktatiedoiksi. Asiakas
hyväksyy edelleen v1-tilannekuvat; koska vanha muodostin käytti arvoa `false` puuttumisen paikkamerkkinä, v1-version `false`
normalisoidaan tuntemattomaksi, kun taas v1-version `true` säilyy faktatietona. Tuntemattomat skeemaversiot hylätään turvallisesti, ja
viimeisin kelvollinen välimuisti säilyy käytettävissä. Jokaisella v2-mallilla, jolla on muu kuin null-arvoinen konteksti tai ominaisuus, on oltava
ilman tunnistetietoja käytettävä HTTPS-osoite `metadataEvidenceUrls[]`; muussa tapauksessa skeeman validointi epäonnistuu eikä välimuistia
korvata. Luettelotaulukko esittää kaikki kolme tilaa merkinnöillä `✓`, `✕` ja `?`.

### Ohjatut yhdistelmät ja MCP-käyttö

Vahvistetut `familyId`-arvot säilyvät lukuhetken yhdistämisessä ja ohjaavat puhdasta
`buildRadarComboSuggestions()`-moduulia (`src/lib/radar/comboSuggestions.ts`). Perhettä ehdotetaan
vain, kun vähintään kahdella eri palveluntarjoajalla on aktiiviset yhteydet ja ne tarjoavat täsmälleen kuratoidun malli-
ID:n. Käytöstä poistetut mallit, passiiviset palveluntarjoajat, puuttuvat malli-ID:t, vain yhden jäsenen perheet ja monitulkintaiset
alias- tai etuliiteosumat hylätään turvallisesti. Ehdotukset käyttävät olemassa olevaa `priority`-strategiaa ja järjestävät
suurimman toistuvan kuukausibudjetin ensimmäiseksi; käyttöliittymä luo ne vain kutsulla `POST /api/combos`.

Ohjattu käyttöliittymä sijaitsee polussa `/dashboard/radar/combos`. Se lukee vain paikallisia
`GET /api/radar/catalog`- ja `GET /api/combos/builder/options`-päätepisteitä. Se ei koskaan käynnistä Radar-synkronointia,
lue palveluntarjoajan tunnistetietoja tai kirjoita suoraan yhdistelmätietokantaan.

MCP-asiakkaat voivat lukea saman paikallisen projektion komennolla `omniroute_radar_catalog` (`read:radar`).
Valinnaiset `provider`-, `familyId`- ja `enabledOnly`-suodattimet arvioidaan yhden paikallisen
`GET /api/radar/catalog`-luvun jälkeen. Sen rajattu tuloste sisältää luettelon metatiedot sekä palveluntarjoajan/mallin,
näyttönimen, `familyId`-arvon, kiintiön, ominaisuudet, käyttöönottotilan, alkuperän ja `disabledBy`-arvon. Määritys-URL-osoitteita,
vaiheita, yhteyksiä, sähköpostiosoitteita, avaimia tai suosittelutietoja ei koskaan palauteta. Tämä työkalu on
vain luku -tilassa eikä koskaan kutsu päätepistettä `/api/radar/sync`.

### Alkuperämerkinnät

Jokaisessa yhdistetyssä merkinnässä on `origin`-kenttä, jonka käyttöliittymä näyttää tunnisteena:

- `"baseline"` — muuttumaton staattisesta julkaisuluettelosta.
- `"radar"` — yksi tai useampi kenttä on päivitetty syötteestä.
- `"local"` — operaattorilla on vähintään yksi paikallinen ohitus tässä merkinnässä (paikalliset
  ohitukset ovat aina syötteen edellä säännön 1 mukaisesti riippumatta siitä, mitä syöte ilmoittaa).

---

## Paikalliset rajapinnat — eivät koskaan syöteproxya

Alla olevat paikalliset Radar-reittiperheet palvelevat käyttöliittymää hakemistossa `src/app/api/radar/`:

| Reitti                         | Metodi | Tarkoitus                                                                                                                                                |
| ------------------------------ | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/api/radar/catalog`           | GET    | Palauttaa yhdistetyn katalogin (`getRadarCatalog()`) paikallisesta välimuistista.                                                                        |
| `/api/radar/sync`              | POST   | Käynnistää palvelinpuolella `syncRadar()`-toiminnon ja palauttaa tuloksena olevan tilan.                                                                 |
| `/api/radar/settings`          | GET    | Palauttaa `{ optIn, hasSupporterKey, supporterKeyMasked }` — ei koskaan salaamatonta avainta.                                                            |
| `/api/radar/settings`          | POST   | Määrittää suostumuksen ja/tai (salatun) tukija-avaimen.                                                                                                  |
| `/api/radar/referrals`         | GET    | Palauttaa `{ fixed, campaigns, tier }` paikallisesta välimuistista — katso [Suosittelulinkit](#referral-links-free-credits) alta.                        |
| `/api/radar/offers`            | GET    | Palauttaa aktiiviset tarjoukset vahvistetusta paikallisesta live-välimuistista; ei koskaan palauta tukija-avainta.                                       |
| `/api/radar/offers/sync`       | POST   | Käynnistää palvelinpuolen vain live-avainta käyttävän `syncRadarOffers()`-putken.                                                                        |
| `/api/radar/intel`             | GET    | Palauttaa vahvistetun paikallisen reaaliaikaisen Intel-datan sekä tukijan tunnistamisen ilmaisevan totuusarvon; ei koskaan henkilöllisyyttä tai avainta. |
| `/api/radar/intel/sync`        | POST   | Käynnistää palvelinpuolen vain live-avainta käyttävän `syncRadarIntel()`-putken.                                                                         |
| `/api/radar/status`            | GET    | Palauttaa vain luku -muotoisen paikallisten asetusten ja välimuistin tilan katalogille, suositteluille, tarjouksille ja Intelille ilman salaisuuksia.    |
| `/api/radar/sync-all`          | POST   | Suorittaa kaikki neljä palvelinpuolen synkronointimoduulia ja palauttaa kullekin syötteelle erillisen tilan.                                             |
| `/api/radar/local-model-state` | GET    | Listaa pysyvästi tallennetut ohitukset ja hautakivet muokkaus- ja palautussäätimiä varten.                                                               |
| `/api/radar/local-model-state` | PATCH  | Asettaa tai tyhjentää validoidut `displayName`/`enabled`-ohituskentät.                                                                                   |
| `/api/radar/local-model-state` | PUT    | Luo tai poistaa hautakiven arvolla `{ provider, modelId, tombstoned }`.                                                                                  |
| `/api/radar/local-model-state` | DELETE | Tyhjentää muokattavat ohituskentät säilyttäen mahdollisen hautakiven.                                                                                    |

**Ehdoton sääntö: nämä reitit eivät koskaan toimi syötepalvelun proxyna.** Selain kommunikoi vain
paikallisen OmniRoute-palvelimen kanssa. Radar-palveluun yhteydessä olevat neljä moduulia ovat
`src/lib/radar/sync.ts` (katalogi), `src/lib/radar/referralsSync.ts` (suosittelut) ja
`src/lib/radar/offersSync.ts` (tarjoukset) sekä `src/lib/radar/intelSync.ts` (Intel); ne kaikki suoritetaan
palvelinpuolella, ei koskaan asiakaspuolella. Näin syötteen URL-osoite ja mahdollinen tukija-avain
pysyvät kokonaan poissa asiakkaalle näkyvästä verkkoliikenteestä.

Kaikki Radar-päätepisteet palauttavat `404`, kun `RADAR_ENABLED` on pois käytöstä (katso
[Ominaisuusvalitsin](#flag-radar_enabled-default-off) yllä), ja reittien virhevastaukset käsitellään
`buildErrorBody()`/`sanitizeErrorMessage()`-toiminnoilla koko tietovaraston kattavan virheiden
sanitointisäännön mukaisesti (`docs/security/ERROR_SANITIZATION.md`).

### Todennus

Kaikki Radar-päätepisteet edellyttävät todennusta `isAuthenticated()`-toiminnolla
(`src/shared/utils/apiAuth.ts`) — koontinäytön istuntoevästeellä tai hallintaoikeuksilla
rajatulla API-avaimella eli samalla suojauksella, joka suojaa muut `/api/settings/*`-reitit.
Ominaisuusvalitsimen ollessa pois käytöstä `404`-tarkistus suoritetaan aina **ennen**
todennustarkistusta, joten asennus, jossa `RADAR_ENABLED` on pois käytöstä, pysyy tavutasolla
identtisenä (ei todennuskehotetta vain sen selvittämiseksi, ettei rajapintaa ole olemassa).
Kun ominaisuusvalitsin otetaan käyttöön, todentamaton pyyntö saa vastauksen `401` ennen
tietokannan lukemista tai kirjoittamista. `GET /api/radar/settings` ei koskaan palauta
salaamatonta tukija-avainta todennustilasta riippumatta — ainoastaan peitetyn muodon ja
`hasSupporterKey`-totuusarvon.

---

## Tukijatarjoukset

Tarjoukset käyttävät omaa allekirjoitettua artefaktiaan, `GET /v1/offers/latest`, eivätkä koskaan jaa katalogin tai viittausten välimuistia. Palvelimen päätepiste edellyttää voimassa olevaa tukijan Bearer-avainta; yhteisöversioon ei palata vararatkaisuna. `syncRadarOffers()` pysähtyy siksi ennen verkkopyyntöä, kun ominaisuuslippu ei ole käytössä, operaattori ei ole antanut suostumustaan tai tukija-avainta ei ole määritetty.

Onnistuneen GET-pyynnön jälkeen asiakas tarkistaa täsmällisten vastaustavujen Ed25519-allekirjoituksen, validoi `RadarOffersFeedSchema`-skeeman, edellyttää sekä allekirjoitetun rungon että `x-omniroute-feed-tier`-otsakkeen arvoksi `live`, vaatii pisteillä erotellun version olevan ehdottomasti uudempi ja korvaa vasta sitten `radar_offers_cache`-välimuistin atomisesti (migraatio `144_radar_offers_cache.sql`). Myös tähän sovelletaan muiden syötteiden käyttämää 10 MB:n otsakkeet ja tietovirran kattavaa rajaa. Allekirjoitus-, skeema-, taso-, toisto-, koko-, HTTP- ja verkkovirheissä viimeisin varmennettu välimuisti säilytetään.

Suljettu tarjousrakenne tukee kolmea vertailukelpoista etutyyppiä: prosenttiosuutta peruspisteinä, hyvitystä valuutan pienimmissä yksiköissä tai kokeilupäiviä. Kumppanitarjouksen on sisällettävä samantyyppinen julkinen vertailutaso, ja sen edun on oltava ehdottomasti suurempi; virallisilla tarjouksilla ei ole kumppanin vertailutasoa. URL-osoitteiden on oltava tunnistetiedottomia HTTPS-osoitteita. `getRadarOffers()` validoi välimuistiin tallennetun hyötykuorman varmuuden vuoksi uudelleen ja suodattaa vanhentuneet merkinnät jokaisella paikallisella lukukerralla; `/dashboard/radar/offers` suodattaa vanhentuneet tarjoukset uudelleen ennen hahmonnusta, käyttää portugalinkielistä tekstiä sen ollessa saatavilla ja muutoin englanninkielistä tekstiä sekä merkitsee kumppanitarjoukset selvästi.

Selain kutsuu vain paikallisia reittejä: se lukee peitetyn asetusten tilannevedoksen, pyytää palvelinpuolen päivitystä kutsulla `POST /api/radar/offers/sync` ja lukee sitten `GET /api/radar/offers`. Ilman avainta se näyttää olemassa olevat osallistumis- ja tukilinkit syötepyynnön yrittämisen sijaan. Ulkoiset tarjouslinkit avautuvat uudelle välilehdelle määritteillä `noopener noreferrer`. Tässä julkaisussa ei tarjota `radar_offers`-MCP-työkalua.

---

## Radar Intel, tukijamerkki ja CLI

Intel on allekirjoitettu artefakti osoitteessa `GET /v1/intel/latest`. Suljettu `RadarIntelFeedSchema` hyväksyy vain Radarin omistamat ELO-sijoitukset, jotka yksityinen kuraattori on johtanut vahvistetuista vertailuista, sekä allekirjoitettujen katalogitilannevedosten perusteella johdetut tosiasialliset katalogin ikä- ja lukumääräerot. Menetelmän kiinteät arvot ovat lähtöluokitus 1000 ja K=32. Tyhjä sijoituslista on kelvollinen, kun yhtäkään vertailua ei ole vahvistettu; asiakas ei koskaan muodosta sellaista synteettisesti.

`syncRadarIntel()` käyttää samoja tarjousten kanssa samoja vaatimuksia: palvelinpuolen Bearer-todennusta, 30 sekunnin aikakatkaisua, suoratoistettua 10 MiB:n rajaa, täsmällisten tavujen Ed25519-varmennusta, tiukkaa skeemaa, rungon ja otsakkeen `live`-vaatimusta, version alarajaa sekä viimeisimmän toimivan välimuistin säilyttämistä. Kun varmennettu aktiivinen tilannevedos on tallennettu pysyvästi, asiakas johtaa arvon `radar:<sha256(supporter key)>`, tallentaa vain tämän yksisuuntaisen tunnisteen ja lähettää erillisen `radar_supporter`-tunnustustapahtuman. Sen `radar-supporter`-merkki on idempotentti ja antaa nolla XP:tä; se ei koskaan päivitä tulostaulukoita eikä käytä `token_share`-toimintoa uudelleen. `/dashboard/radar/intel` hahmontaa merkin vain varmennetun paikallisen välimuistin metatiedoista.

CLI tarjoaa komennot `omniroute radar status` ja `omniroute radar sync`. Molemmat viestivät vain paikallisen OmniRoute-API:n kanssa. `status` suorittaa vain luku -tyyppisen pyynnön `GET /api/radar/status`; `sync` lähettää yhden pyynnön `POST /api/radar/sync-all` ja tulostaa tuloksen syötekohtaisesti. Kumpikaan komento ei lue, hyväksy tai tulosta tukija-avainta, eikä kumpikaan ota suoraan yhteyttä Radar-palveluun.

---

## Suosittelulinkit (ilmaiset krediitit)

Suosittelulinkit toimitetaan **erillisestä, aina ajantasaisesta** syötteestä —
`GET /v1/referrals/latest` — erillään katalogisyötteestä. Tämä on tarkoituksellista:
yhteisötason katalogisyöte on tilannevedos, joka voi olla jopa 30 päivää vanha, joten
siitä poimittu suosittelulinkki oli aiemmin yhtä paljon jäljessä palvelimen todellisesta
linkkiluettelosta (uusi suosittelulinkki saattoi saavuttaa ilmaisen/yhteisötason käyttäjän
vasta kuukauden kuluttua). Suosittelusyöte poistaa tämän viiveen synkronoitumalla omalla,
huomattavasti tiheämmällä aikataulullaan.

```ts
// GET /v1/referrals/latest-vastauksen runko (Ed25519-allekirjoitettu, sama kiinnitetty avain kuin
// katalogisyötteessä):
{
  feed: "omniroute-radar-referrals",
  schemaVersion: 1,
  generatedAt: string,           // ISO — deterministinen: suosittelulinkkien suurin max(updatedAt),
                                  // joten kaksi identtistä pyyntöä tuottaa täsmälleen
                                  // samat allekirjoitetut tavut/allekirjoituksen
  referrals: {
    fixed: RadarReferral[],      // mukana KAIKILLA tasoilla, myös ilman tunnistautumista/yhteisötasolla
    campaigns: RadarReferral[],  // täytetään vain kelvolliselle aktiiviselle (tukija-) Bearer-
                                  // avaimelle; ilman tunnistautumista tai vanhentuneella avaimella tehdyt pyynnöt saavat arvon []
  },
}
// RadarReferral = { provider, url, kind: "fixo" | "campanha", validUntil,
//                    requiredAction, isDefault }
```

Toisin kuin katalogisyötteessä, tässä rungossa ei ole lainkaan `tier`-kenttää —
palvelin päättää pyynnön perusteella `Authorization`-avaimen avulla, mitä sisällytetään,
joten `x-omniroute-feed-tier`-vastausotsake on AINOA lähde toimitetulle tasolle
(`referralsSync.ts::syncRadarReferrals`); puuttuva tai tunnistamaton otsake alennetaan
arvoon `"community"`, joka on vähiten oikeuksia sisältävä oletus. `RadarReferralsFeedSchema`
(`src/lib/radar/referralsFeedSchema.ts`) validoi koko rungon käyttäen uudelleen samaa
`feedSchema.ts`-tiedostosta vietyä suosittelukohtaista `RadarReferralSchema`-skeemaa,
jotta molemmat syötteet validoivat yksittäiset suosittelut identtisesti. Jokaisen
`RadarReferral.url`-arvon on käytettävä `https://`-protokollaa — `http://`-URL ei läpäise
skeeman validointia.

VANHA katalogiin upotettu `RadarFeedSchema`-skeeman `referrals`-kenttä (`feedSchema.ts`)
säilytetään taaksepäin yhteensopivana jo välimuistiin tallennettujen katalogisyötteiden
kanssa, mutta `getRadarReferrals()` ei enää lue sitä — katso [Aksessori](#accessor) alta.

### Synkronointi

`syncRadarReferrals()` (`src/lib/radar/referralsSync.ts`) on AINOA moduuli, joka
käyttää verkkoa suositteluja varten, ja se vastaa täsmälleen `syncRadar()`-funktion
sopimusta: ominaisuus pois käytöstä → `disabled`; suostumus epätosi → `opt_out`;
lataa osoitteesta `${RADAR_FEED_URL}/v1/referrals/latest` (samat katalogin
`RADAR_FEED_URL`/`RADAR_FEED_PUBKEY`-haarautuksen ohitukset), tarkistaa Ed25519-
allekirjoituksen täsmällisten vastaustavujen perusteella (`verifyFeedBytes`), validoi
`RadarReferralsFeedSchema`-skeemaa vasten ja tallentaa välimuistiin
`radar_referrals_cache`-tauluun (migraatio `142_radar_referrals_cache.sql`) — tauluun,
joka on täysin erillinen katalogin `radar_feed_cache`-taulusta. 10 Mt:n vastausraja ja
`generatedAt`-alaraja hylkäävät saapuvan syötteen, joka on välimuistissa olevaa vanhempi,
mikä suojaa vanhemman allekirjoitetun artefaktin uudelleentoistolta. Sama aikaleima
hyväksytään: palvelin antaa tarkoituksellisesti yhteisö- ja aktiiviselle suositteluversiolle
saman deterministisen `generatedAt`-arvon, jotta allekirjoitettu hyötykuorma ja toimitettu
taso voivat muuttua tukija-avaimen muutoksen jälkeen ilman, että taustalla oleva
linkkijoukko muuttuu. Ei koskaan heitä poikkeusta — palauttaa aina tilaobjektin;
`reason`-kentän virheet eivät koskaan sisällä pinojälkeä.

Kaksi käynnistintä pitää suositteluvälimuistin lämpimänä, ja molemmat ovat riippumattomia
katalogin omasta 24 tunnin aikataulusta:

- **Synkronointi luettaessa** — `GET /api/radar/referrals` kutsuu itse
  `syncRadarReferrals()`-funktiota suoraan aina, kun välimuisti puuttuu tai on vanhempi
  kuin `REFERRALS_STALE_MS` (1 tunti, `shouldSyncReferralsOnRead()`), ennen vastauksen
  toimittamista. Tämän ansiosta kiinteät linkit ovat "aina ajantasaisia" heti seuraavalla
  hallintapaneelin latauskerralla tarvitsematta odottaa tausta-ajastinta.
- **Ajastimen sivusynkronointi** — `radarSchedulerTick()` (`scheduler.ts`) arvioi
  suosittelujen vanhentuneisuuden itsenäisesti samalla tunnittaisella ajokerralla, jota
  käytetään katalogille, ja kutsuu tarvittaessa `syncRadarReferrals()`-funktiota. Tämä
  suoritetaan riippumatta siitä, oliko katalogin synkronointi ajankohtainen kyseisellä
  ajokerralla, eikä se koskaan vaikuta `RadarTickResult`-rakenteeseen (vain
  parhaansa yrittävä sivuvaikutus, jonka virheet ohitetaan).

### Aksessori

`src/lib/radar/index.ts` vie kaksi vain lukuun tarkoitettua aksessoria, joista kumpikaan
ei koskaan heitä poikkeusta (sama puolustava sopimus kuin `getRadarCatalog()`-funktiolla —
ominaisuus pois käytöstä, välimuistin puuttuminen tai vioittunut välimuistiin tallennettu
hyötykuorma palauttavat kaikki tyhjän rakenteen virheen sijaan):

- `getRadarReferrals()` → `{ fixed: RadarReferral[], campaigns: RadarReferral[] }`,
  lukee `radar_referrals_cache`-välimuistista (`getRadarReferralsCache()`-funktion
  kautta) ja validoi `RadarReferralsFeedSchema`-skeeman avulla — **ei**
  katalogivälimuistista.
- `getDefaultReferralFor(provider)` → kyseisen palveluntarjoajan `fixed`-suosittelu,
  jolla on `isDefault: true`, tai `null`. Tarkastelee vain `fixed`-suositteluja —
  kampanjaa ei koskaan käytetä palveluntarjoajan "oletuslinkkinä".

Varsinainen sääntö sille, "mikä suosittelu on palveluntarjoajan oletus", sijaitsee
`findDefaultReferral()`-funktiossa (`src/lib/radar/referrals.ts`), joka on pieni puhdas
funktio **ilman DB-tuontia** — sen voi turvallisesti tuoda `"use client"`-komponenttiin.
`getRadarReferrals`/`getDefaultReferralFor` (`index.ts`-tiedostossa) tuovat
`@/lib/db/radar`-moduulin ja pysyvät siksi vain palvelinpuolella; palveluntarjoajien
hallintapaneeli tuo `referrals.ts`-tiedoston suoraan `index.ts`-tiedoston sijaan
(katso alta), jotta `better-sqlite3` ei päädy selainpakettiin.

### `GET /api/radar/referrals`

Noudattaa täsmälleen samaa tarkistusten järjestystä kuin kaikki muut Radar-reitit: `RADAR_ENABLED` pois käytöstä →
`404` (tarkistetaan ensin, tavutasolla identtinen toiminta); todentamaton → `401`; muussa tapauksessa
käynnistää vanhentuneille tiedoille synkronoinnin luvun yhteydessä (katso edellä) ja palauttaa sitten `200` sekä
`{ fixed, campaigns, tier }` — `tier` tulee suoraan (mahdollisesti juuri päivitetystä)
välimuistirivistä ja on puhtaasti informatiivinen (ohjaa käyttöliittymän alla kuvattua hienovaraista lisämyyntitekstiä). Ei koskaan
välitä syötepalvelimen vastauksia suoraan — reitin oma lähdekoodi ei sisällä `fetch(`-kutsua;
verkkoyhteys muodostetaan aina vain `syncRadarReferrals()`-funktion sisällä, samalla vain paikallista välimuistia käyttävällä
periaatteella kuin `/api/radar/catalog`.

### Hallintapaneelin käyttöliittymä — "Ilmaiset krediitit" -välilehti sivulla `/dashboard/radar`

Käyttää olemassa olevaa Radar-sivua (`src/app/(dashboard)/dashboard/radar/page.tsx`) uutena
välilehtenä uuden reitin sijaan — näin reititys- ja i18n-pinta-ala pysyy pienempänä ominaisuudelle, joka on
muunnelma sivun jo hakemista tiedoista. Käyttöönoton jälkeen välilehtipalkissa näkyvät
**Katalogi** (nykyinen taulukko) ja **Ilmaiset krediitit**:

- Kiinteät linkit ryhmitellään palveluntarjoajan mukaan. Jokaisessa näytetään `requiredAction` (kun se on määritetty)
  sekä viittaus-URL-osoitteeseen johtava `target="_blank" rel="noopener noreferrer"`-painike.
- Kampanjoissa näytetään samat tiedot sekä `validUntil`, kun se on määritetty.
- Kun `campaigns` on tyhjä **ja** tarjottu taso on `community`, käyttöliittymä näyttää
  lyhyen lisämyyntihuomautuksen ("määräaikaiset kampanjat ovat tukijoille tarkoitettu lisäetu") — tämä **ei koskaan**
  piilota tai rajoita kiinteiden linkkien luetteloa, joka pysyy täysin täytettynä kaikilla tasoilla. Tämä
  on vain hienovaraista lisämyyntiviestintää, ei koskaan este.

### Viittauslinkki palveluntarjoajan nimessä (palveluntarjoajien hallintapaneeli)

`ProviderPageHeader` (`src/app/(dashboard)/dashboard/providers/[id]/components/`)
linkitti palveluntarjoajan nimen jo aiemmin kohteeseen `providerInfo.website`, kun se oli määritetty, ja sisälsi yhden
ennakkotapauksen kaupallistetusta linkistä: Kimin (Moonshot AI) kumppanilinkkihuomautuksen
(`providers.kimiPartnerLinkNote`-i18n-avain). D28 käyttää oletusarvoisille Radar-viittauksille täsmälleen samaa hienovaraista huomautusmallia
uuden avaimen lisäämisen sijaan.

Tarkoituksella löyhä kytkentä:

- `resolveProviderHeaderLink()` (`src/app/(dashboard)/dashboard/providers/providerPageUtils.ts`)
  on **puhdas** funktio — `(staticWebsite, referralUrl) => { website, isReferralLink }`
  — ilman riippuvuutta kohteisiin `@/lib/radar` tai `@/lib/db/*`. `providerPageUtils.ts` pysyy
  kokonaisuudessaan vapaana näistä tuonneista (tämän varmistaa
  `tests/unit/provider-header-referral-link.test.ts`).
- `ProviderDetailPageClient.tsx` (`"use client"`-komponentti) on ainoa paikka, jossa
  Radar-tietoja saa hakea — kutsulla `fetch("/api/radar/referrals")`, käyttäen samaa paikallisen reitin
  mallia kuin Radar-hallintapaneelisivu — ja se määrittää oletusviittauksen
  asiakaspuolella DB-riippumattoman `src/lib/radar/referrals.ts`-tiedoston `findDefaultReferral()`-funktiolla.
- Kun `RADAR_ENABLED` on pois käytöstä, haku palauttaa 404:n, `referralUrl` pysyy arvossa `null` ja
  `resolveProviderHeaderLink()` palauttaa staattisen katalogin `website`-arvon muuttumattomana —
  palveluntarjoajasivu on tavutasolla identtinen tämän ominaisuuden käyttöönottoa edeltäneen version kanssa. Lopputulos on sama, kun
  välimuistia ei vielä ole tai kyseiselle palveluntarjoajalle ei ole oletusviittausta.
- Kun oletusviittausta käytetään, `ProviderPageHeader` saa `isReferralLink`-arvon
  ja näyttää saman hienovaraisen huomautuksen/työkaluvihjeen kuin Kimin kumppanilinkki (käyttäen uudelleen
  `providers.kimiPartnerLinkNote`-avainta) — eikä koskaan uutta, erillistä visuaalista esitystapaa.

---

## Syötteen itseisännöinti

Täyden hallinnan luetteloon haluava fork tai itseisännöijä voi suorittaa oman syötepalvelunsa
muuttamatta asiakaskoodia:

1. Tarjoa `GET /v1/catalog/latest` -päätepiste, joka palauttaa
   `RadarFeedSchema`-skeeman (`src/lib/radar/feedSchema.ts`) mukaisen JSON-rungon — ylätasolla `feed:
"omniroute-radar"`, `schemaVersion: 2`, `version`, `tier`, `providers`, `models`,
   `quirks` ja `totals`. Kunnioita `x-omniroute-radar-schema: 2` -otsaketta; siirtymän kanssa yhteensopivan palvelimen
   tulisi käyttää ilman sitä tehtyjen pyyntöjen oletuksena erikseen allekirjoitettua v1-artefaktia.
2. Allekirjoita vastauksen täsmälliset tavut Ed25519-avainparilla ja palauta base64-muotoinen
   allekirjoitus `x-omniroute-feed-signature`-vastausotsakkeessa.
3. Aseta `RADAR_FEED_URL` uudeksi perus-URL-osoitteeksi ja `RADAR_FEED_PUBKEY` sitä vastaavaksi
   julkiseksi avaimeksi (base64-DER SPKI tai PEM) — katso
   [ympäristömuuttujien viite](../reference/ENVIRONMENT.md#27-radar-feed-self-hosting).
4. Ota `RADAR_ENABLED` käyttöön ja hyväksy osallistuminen kutsulla `POST /api/radar/settings`
   (`{ optIn: true }`).

Muita koodimuutoksia ei tarvita — `verifyFeedBytes()` ottaa ohituksen käyttöön
automaattisesti (`getFeedPublicKeys()` tiedostossa `src/lib/radar/pinnedKeys.ts`), ja versioiden
vertailua, skeeman validointia sekä yhdistämissääntöjä sovelletaan itseisännöityyn
syötteeseen samalla tavalla.

Suosittelulinkit (katso yllä oleva kohta [Suosittelulinkit (ilmaiset krediitit)](#referral-links-free-credits))
ovat erillinen, valinnainen artefakti: fork, joka tarjoaa vain päätepisteen `/v1/catalog/latest`,
toimii silti täysin — `syncRadarReferrals()` palauttaa hallitusti arvon `{ status: "error" }`, kun
`/v1/referrals/latest` palauttaa vastauksen `404`, ja välimuisti pysyy yksinkertaisesti tyhjänä, joten
`GET /api/radar/referrals` palauttaa edelleen arvon `{ fixed: [], campaigns: [], tier: null }`
sen sijaan, että sivun muu osa lakkaisi toimimasta. Jos haluat tarjota myös suosittelulinkkejä, tarjoa
`RadarReferralsFeedSchema`-skeeman (`src/lib/radar/referralsFeedSchema.ts`) mukainen
`GET /v1/referrals/latest` ja allekirjoita se samalla Ed25519-avainparilla kuin
luettelosyöte.

Tukijoiden tarjoukset ovat toinen valinnainen artefakti. Voit tarjota niitä toteuttamalla
`GET /v1/offers/latest` suljetulla `RadarOffersFeedSchema`-skeemalla
(`src/lib/radar/offersFeedSchema.ts`), vaatimalla voimassa olevan käyttöoikeuden, palauttamalla
`x-omniroute-feed-tier: live` ja allekirjoittamalla täsmälliset tavut samalla avaimella. Jos fork jättää tämän
päätepisteen pois, luettelon ja suosittelujen toiminta säilyy ennallaan; tarjousten päivitys epäonnistuu rikkomatta olemassa olevia tietoja, ja
viimeisin vahvistettu paikallinen tarjousvälimuisti pysyy käytettävissä.

Intel on samalla tavalla valinnainen. Itseisännöijä voi tarjota päätepisteen `GET /v1/intel/latest`
käyttämällä `RadarIntelFeedSchema`-skeemaa (`src/lib/radar/intelFeedSchema.ts`), vaatia voimassa olevan käyttöoikeuden, palauttaa
`x-omniroute-feed-tier: live` ja allekirjoittaa täsmälliset tavut jaetulla Ed25519-avaimella. Päätepisteen
pois jättäminen ei vaikuta luetteloon, suositteluihin eikä tarjouksiin; Intel-päivitys säilyttää viimeisimmän vahvistetun
paikallisen tilannevedoksen.

---

## Aiheeseen liittyvät dokumentit

- [`docs/security/ERROR_SANITIZATION.md`](../security/ERROR_SANITIZATION.md) — virhevastausmalli, jota
  `/api/radar/*`-reitit noudattavat.
- [`docs/reference/ENVIRONMENT.md`](../reference/ENVIRONMENT.md#27-radar-feed-self-hosting)
  — muuttujien `RADAR_FEED_URL` / `RADAR_FEED_PUBKEY` viite.
