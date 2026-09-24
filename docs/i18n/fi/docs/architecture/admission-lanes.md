# Admission lanes (#9654) — two lane systems, what gates each, where each reports (Suomi)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/admission-lanes.md) · 🇪🇹 [am](../../../am/docs/architecture/admission-lanes.md) · 🇸🇦 [ar](../../../ar/docs/architecture/admission-lanes.md) · 🇦🇿 [az](../../../az/docs/architecture/admission-lanes.md) · 🇧🇬 [bg](../../../bg/docs/architecture/admission-lanes.md) · 🇧🇩 [bn](../../../bn/docs/architecture/admission-lanes.md) · 🇧🇦 [bs](../../../bs/docs/architecture/admission-lanes.md) · 🇨🇿 [cs](../../../cs/docs/architecture/admission-lanes.md) · 🇩🇰 [da](../../../da/docs/architecture/admission-lanes.md) · 🇩🇪 [de](../../../de/docs/architecture/admission-lanes.md) · 🇬🇷 [el](../../../el/docs/architecture/admission-lanes.md) · 🇪🇸 [es](../../../es/docs/architecture/admission-lanes.md) · 🇪🇪 [et](../../../et/docs/architecture/admission-lanes.md) · 🇮🇷 [fa](../../../fa/docs/architecture/admission-lanes.md) · 🇫🇷 [fr](../../../fr/docs/architecture/admission-lanes.md) · 🇮🇪 [ga](../../../ga/docs/architecture/admission-lanes.md) · 🇮🇳 [gu](../../../gu/docs/architecture/admission-lanes.md) · 🇳🇬 [ha](../../../ha/docs/architecture/admission-lanes.md) · 🇮🇱 [he](../../../he/docs/architecture/admission-lanes.md) · 🇮🇳 [hi](../../../hi/docs/architecture/admission-lanes.md) · 🇭🇷 [hr](../../../hr/docs/architecture/admission-lanes.md) · 🇭🇺 [hu](../../../hu/docs/architecture/admission-lanes.md) · 🇦🇲 [hy](../../../hy/docs/architecture/admission-lanes.md) · 🇮🇩 [id](../../../id/docs/architecture/admission-lanes.md) · 🇳🇬 [ig](../../../ig/docs/architecture/admission-lanes.md) · 🇮🇹 [it](../../../it/docs/architecture/admission-lanes.md) · 🇯🇵 [ja](../../../ja/docs/architecture/admission-lanes.md) · 🇬🇪 [ka](../../../ka/docs/architecture/admission-lanes.md) · 🇰🇭 [km](../../../km/docs/architecture/admission-lanes.md) · 🇮🇳 [kn](../../../kn/docs/architecture/admission-lanes.md) · 🇰🇷 [ko](../../../ko/docs/architecture/admission-lanes.md) · 🇱🇹 [lt](../../../lt/docs/architecture/admission-lanes.md) · 🇱🇻 [lv](../../../lv/docs/architecture/admission-lanes.md) · 🇮🇳 [ml](../../../ml/docs/architecture/admission-lanes.md) · 🇮🇳 [mr](../../../mr/docs/architecture/admission-lanes.md) · 🇲🇾 [ms](../../../ms/docs/architecture/admission-lanes.md) · 🇲🇹 [mt](../../../mt/docs/architecture/admission-lanes.md) · 🇲🇲 [my](../../../my/docs/architecture/admission-lanes.md) · 🇳🇵 [ne](../../../ne/docs/architecture/admission-lanes.md) · 🇳🇱 [nl](../../../nl/docs/architecture/admission-lanes.md) · 🇳🇴 [no](../../../no/docs/architecture/admission-lanes.md) · 🇮🇳 [or](../../../or/docs/architecture/admission-lanes.md) · 🇮🇳 [pa](../../../pa/docs/architecture/admission-lanes.md) · 🇵🇭 [phi](../../../phi/docs/architecture/admission-lanes.md) · 🇵🇱 [pl](../../../pl/docs/architecture/admission-lanes.md) · 🇵🇹 [pt](../../../pt/docs/architecture/admission-lanes.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/admission-lanes.md) · 🇷🇴 [ro](../../../ro/docs/architecture/admission-lanes.md) · 🇷🇺 [ru](../../../ru/docs/architecture/admission-lanes.md) · 🇱🇰 [si](../../../si/docs/architecture/admission-lanes.md) · 🇸🇰 [sk](../../../sk/docs/architecture/admission-lanes.md) · 🇸🇮 [sl](../../../sl/docs/architecture/admission-lanes.md) · 🇷🇸 [sr](../../../sr/docs/architecture/admission-lanes.md) · 🇸🇪 [sv](../../../sv/docs/architecture/admission-lanes.md) · 🇰🇪 [sw](../../../sw/docs/architecture/admission-lanes.md) · 🇮🇳 [ta](../../../ta/docs/architecture/admission-lanes.md) · 🇮🇳 [te](../../../te/docs/architecture/admission-lanes.md) · 🇹🇭 [th](../../../th/docs/architecture/admission-lanes.md) · 🇹🇷 [tr](../../../tr/docs/architecture/admission-lanes.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/admission-lanes.md) · 🇵🇰 [ur](../../../ur/docs/architecture/admission-lanes.md) · 🇺🇿 [uz](../../../uz/docs/architecture/admission-lanes.md) · 🇻🇳 [vi](../../../vi/docs/architecture/admission-lanes.md) · 🇳🇬 [yo](../../../yo/docs/architecture/admission-lanes.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/admission-lanes.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/admission-lanes.md)

---

OmniRoutessa on **kaksi** prosessikohtaista kaistajärjestelmää, joilla on eri
soveltamisalat. Ne täydentävät toisiaan; ylläpitäjien tulee tietää, kumpaa he
tarkastelevat.

## 1. Tavutasoinen prosessinlaajuinen sisäänpääsyn hallinta (`chatBodyAdmission.ts`)

- **Laajuus:** puskuroidun rungon / keon käsittelypolku reiteille `POST /v1/chat/completions`,
  `/v1/messages`, `/v1/responses` ja muille chat-muotoisille reiteille. Suojaa
  suurten koodausagenttien pyyntörunkojen aiheuttamalta keon käytön moninkertaistumiselta (#4380).
- **Yksi prosessinlaajuinen ohjain, ei avainkohtaisia kaistoja (#10110).** Jokainen API-avain
  (hajautettuna) tai `anonymous`-istunto hakee sisäänpääsyä **samasta** jaetusta budjetista —
  hajautettua istuntotunnusta käytetään VAIN tasapuolisen ajoituksen avaimena (odottajien
  vuorotteluperusteinen käsittely), ei koskaan kapasiteetin ositukseen. Tämän dokumentin
  aiemmassa versiossa kuvattiin avainkohtaiset kaistat, joilla oli itsenäinen kapasiteetti;
  kyseinen malli poistettiin muutoksessa #10110, koska se mahdollisti prosessinlaajuisen
  rajan moninkertaistamisen todentamattomilla väärennetyillä tunnistetiedoilla.
- **Portti (#503-fanout): automaattisesti johdettu vastaanoton TAVUbudjetti, ei kiinteä pyyntömäärä.**
  Vanha `CHAT_MAX_HEAVY_IN_FLIGHT`-pyyntömääräraja (oletusarvo `1`
  ennen tätä korjausta) romahdutti koodausagenttien rinnakkaishaarauman (useita aliagentteja/CLI-työkaluja,
  pyyntörungot tavallisesti > 256 KB) tosiasiallisesti noin yhden pyynnön rinnakkaisuuteen, mikä aiheutti
  503-virheitä täysin normaalilla kuormituksella. Se rajoittaa nyt vain silloin, kun operaattori asettaa
  nimenomaisesti muuttujan `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT`. Kun sitä ei ole asetettu, sisäänpääsyä
  rajoittaa sen sijaan `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — budjetti, joka johdetaan automaattisesti
  prosessin todellisesta muistirajasta (`src/shared/middleware/admissionBudget.ts`):
  25 % V8-keon rajan ja mahdollisen cgroup-/säiliörajan pienemmästä arvosta
  jaettuna kahdeksankertaisella tilapäisen moninkertaistumisen kertoimella sekä rajattuna välille 8 MiB–
  2 GiB. Eksplisiittisiin ohituksiin sovelletaan samoja rajoja. Tämä skaalautuu automaattisesti
  512 MB:n säiliöstä 32 GB:n työpöytäkoneeseen ilman ympäristömuuttujien säätämistä. Pyyntörunko, joka ei
  mahdu efektiiviseen budjettiin, hylätään välittömästi virheellä `413 body_exceeds_budget`;
  vain yksittäin käsiteltävissä olevien pyyntörunkojen keskinäinen kilpailu päätyy rajattuun
  tasapuolisuusjonoon. Reaaliaikainen, useita signaaleja hyödyntävä resurssipaineen seuranta (V8-keon suhde,
  cgroup, PSI, OOM-tapahtumat — `open-sse/utils/resourcePressurePolicy.ts`) lyhentää
  rajattua odotusaikaa `high`-paineessa ja hylkää pyynnön välittömästi virheellä
  `503 resource_pressure` `critical`-paineessa jo ennen ensimmäisenkään tavun
  vastaanottamista. PSI luetaan tämän yksikön cgroupin `memory.pressure`-tiedostosta, kun se on olemassa
  (`open-sse/utils/resourcePressureSampler.ts`); `/proc/pressure/memory` kattaa
  koko isäntäkoneen, ja sitä käytetään vain varavaihtoehtona fyysisellä palvelimella / cgroup v1:ssä, joten sivuttava
  isäntäkone ei voi aiheuttaa 503-virhettä toimettomalle säiliölle.
- **Säätäminen:**
  - `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — automaattisesti johdetun tavubudjetin ohitus
  - `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` — vanha pyyntömääräraja, käytössä vain erikseen valittaessa
  - `OMNIROUTE_CHAT_ADMISSION_QUEUE_MS` — jonotusaika ennen 503-virhettä (oletus 2000)
  - `OMNIROUTE_CHAT_ADMISSION_MAX_QUEUED_BYTES` — jonotettujen tavujen kekoventtiili (oletus 4 MB)
  - `OMNIROUTE_CHAT_VIRTUAL_TTL_MS` / `OMNIROUTE_CHAT_VIRTUAL_MAX_SESSIONS` — vanhentuneet
    ja vaikutuksettomat muutoksesta #10110 lähtien (hyväksytään määritysten yhteensopivuuden vuoksi, mutta ohitetaan)
- **Raportointi:** `GET /api/monitoring/health` → `chatAdmission` (#11244) — sisältää
  #503-fanout-lisäykset `inflightBytes`, `maxInflightBytes`, `budgetSource`
  (`v8_heap` | `cgroup` | `override`), `pressureSeverity` ja `countCapEnabled`
  (oletuskäyttöönotossa false — vahvistaa, että rajoittava tekijä on tavubudjetti eikä vanha
  pyyntömääräraja).

## 2. Mukautuvat virtuaaliset ajonaikaiset kaistat (`open-sse/services/admission`)

- **Laajuus:** vuokraaja-avaimeen perustuva pääsynhallinta palveluntarjoajalle välitystä varten — jonon kustannus, viiveohjattu
  rajojen mukautus, kaistakohtainen jonotus ja kaistamittarit.
- **Käyttöönotto:** **valinnainen.** Poissa käytöstä, ellei `OMNIROUTE_CHAT_VIRTUAL_LANES=true`. Ilman sitä
  mukautuva ohjain säilyttää jaetun jonon toiminnan (ongelman #9654 ehto 1 täyttyy vasta,
  kun ylläpitäjä ottaa kaistat käyttöön).
- **Säätäminen:** `OMNIROUTE_CHAT_VIRTUAL_LANES` + mukautuva määritys (`maxQueueCount`,
  `maxQueueCost`, `defaultMaxWaitMs`, …).
- **Raportointi:** `GET /api/monitoring/health` → `adaptiveAdmission` → `laneCount`,
  `laneQueuedCount`, `laneQueuedCost`, `laneTenants` (läpinäkymättömät kaistatunnukset, eivät koskaan raakoja
  avaimia) ja `virtualLanes` — tilannevedoksen määräävä "kaistat ovat käytössä" -lippu.

## 3. Hajautuskyselyt — kohdekohtainen pääsynhallinta comboa/fuusiota varten (#9654, aalto 2)

Combo (prioriteetti / vuorottelu) ja fuusio hajauttavat N mallikohteeseen yhden ylätason
pyynnön alaisuudessa. Ongelman #9654 aallosta 2 lähtien **jokaisen hajautuskohteen pääsy tarkistetaan ennen välitystä**
kohdekohtaisella kyselyllä (`PerTargetAdmissionHook`, jonka rakentaa `createPerTargetAdmissionHook`)
**ylätason pyynnön** vuokraajakaistaa vasten.

- **Laajuus:** jokainen combin, fuusion ja kaaosmoottorin välittämä hajautuskohde.
  Järjestelmään 1 (tavutaso) tämä ei vaikuta — se ei koskaan tarkista hajautuskohteita.
- **Käyttöönotto:** **valinnainen järjestelmän 2 yhteydessä.** Ei tee mitään, kun `OMNIROUTE_CHAT_VIRTUAL_LANES`
  on asettamatta — ylätason pyynnöllä on jo jaetun jonon käyttöoikeus kyseisessä tilassa,
  joten tarkistus laskisi käytön kahdesti ja hylkäisi combin kohteita.
- **Semantiikka:**
  - **Täysin estämätön — ohita, älä koskaan jonota.** `maxWaitMs 0`: täysi kaista
    ohittaa kohteen, jolloin combin varamekanismi (tai fuusion jäljelle jääneiden
    paneeli) palvelee sen sijaan. Tämä on tarkoituksellista: hajautuskohde on ylimääräistä
    työtä, ja sen jonottaminen kasvattaisi kuormaa juuri niillä ruuhkautuneilla kaistoilla,
    joita kaistojen on tarkoitus suojata. `defaultMaxWaitMs` koskee siksi **vain ylätason pyyntöä**;
    hajautuskyselyt eivät koskaan odota, eikä niiden odottamisen sallimiseksi ole tarkoituksella
    **säätöä** (ongelman historia osoittaa, että odotussäädöt aiheuttivat laajoja 502/504-virheitä,
    joita #9654 ehkäisee — asiaan palataan vain, jos ylläpitäjä ilmoittaa ohitettujen hajautuskohteiden
    heikentävän vastausten laatua).
  - **Vapautus hyväksynnän yhteydessä.** Hyväksytty kysely vapauttaa käyttöoikeutensa välittömästi: se on
    kapasiteettiportti, ei kapasiteetin hallussapito. Ylätason pyynnön käyttöoikeus kattaa hajautuksen; N
    lisäoikeuden pitäminen kasvattaisi keinotekoisesti jaettua aktiivista kustannusta ja hylkäisi muita vuokraajia.
    Tämä on parhaan yrityksen tarkistus, ei varaus: kaista voi täyttyä uudelleen tarkistuksen ja välityksen välillä,
    joten kovassa kilpailutilanteessa portti saattaa hyväksyä kohteen kaistalle, joka on jälleen täynnä
    kohteen välityshetkellä.
  - **Hinnoittelu todellisen hajautusrungon perusteella.** Kysely arvioi kustannuksen
    kohteen todellisesta rungosta — mukaan lukien sen `stream`-lipusta johdettu pyyntöluokka,
    täsmälleen kuten ylätason pyynnön polulla — joten fuusiopaneelin jäsenet (`stream: false`)
    hinnoitellaan niiden todellisuudessa käyttämän ei-suoratoistavan luokan mukaan ja prioriteetti-/RR-kohteet
    käyttäjän pyytämän luokan mukaan.
- **Raportointi:** ensimmäisen kohteen jälkeen tapahtuva kyselyn ohitus kasvattaa combin pyyntökohtaista
  `fallbackCount`-arvoa (vastaten nykyistä varamekanismin semantiikkaa; näkyy combin
  lokeissa); fuusio palauttaa 503:n, kun jokainen paneelin jäsen ohitetaan. Tilannevedoksessa
  ei tällä hetkellä ole **koostelaskuria** (esim. `virtualFanoutSkipped`) —
  jos ylläpitäjä ilmoittaa, ettei pysty selvittämään, kuinka usein kaistaportti ohittaa hajautuskohteita,
  se on peruste sellaisen lisäämiselle.

## Kumpi näkyy hallintapaneelissa

- `adaptiveAdmission.laneCount` / `laneTenants` → **mukautuvat virtuaalikaistat** (järjestelmä 2).
- `adaptiveAdmission.virtualLanes === true` → myös osion 3 fan-out-tarkistukset ovat
  käytössä. Hyötykuorma, josta `virtualLanes` puuttuu tai jossa sen arvo on `false`, tarkoittaa,
  ettei `OMNIROUTE_CHAT_VIRTUAL_LANES`-muuttujaa ole asetettu — tavutason kaistat (järjestelmä 1)
  ovat edelleen käytössä, mutta mikään `adaptiveAdmission`-kohdan toiminnallisuus (eikä fan-out-rajoitus)
  ole käytössä ennen sen ottamista käyttöön.

## Miksi molemmat ovat olemassa

Tavutason kaistat rajoittavat paljon muistia käyttävää jäsennys-/pakkauspolkua; mukautuvat kaistat
rajoittavat välityskustannuksia vuokralaista kohden. Ongelman #9654 kriteeri 1 (”yhden istunnon purske ei aiheuta
503-virhettä toiselle”) toteutetaan ehdoitta järjestelmällä 1 ja erikseen käyttöön otettuna järjestelmällä 2.

## 4. Yksi prosessi, pitkät `/v1/responses`-pyynnöt (healthy-headroom)

[#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) lisäsi
`tryAcquireHealthyHeadroom`-toiminnon, jotta toinen rakenteellisesti raskas pyyntö hyväksytään,
kun keon käyttöaste alittaa `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`-arvon. `admitChatRequest`-toiminnon
käyttämä BYTE-polku (rungot ≥ `OMNIROUTE_CHAT_LARGE_BODY_BYTES`,
oletusarvo 256 KiB, mukaan lukien `POST /v1/responses`) käyttää **samaa** poikkeusta.

Tämä on tuettu **yhden prosessin** ratkaisu useammalle kuin kahdelle samanaikaiselle pitkälle
SSE `/v1/responses`-pyynnölle: nosta ensisijaista rajaa ja healthy-headroom-rajaa vain sen verran kuin keko
ja prosessinlaajuinen käsiteltävien tavujen budjetti (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`
/ #10110) sallivat. Kymmenet pitkät SSE-asiakkaat (40–50) ovat tähän muistibudjettiin
liittyvä kysymys, eivät tuotteen kiinteä ”enintään 2” -raja. Paineistettu keko hylkää pyyntöjä edelleen
uudelleenyrityksen sallivalla `503`-virheellä, jotta #7849 ei palaa.

Jos haluat **moninkertaistaa kekojen määrän**, suorita N itsenäistä `DATA_DIR`-hakemistoa (#11024). Älä koskaan käytä
asetusta `replicas > 1` yhdelle SQLite-tiedostolle (#10350). Tässä osiossa ei käsitellä
DATA_DIR-skaalausratkaisua uudelleen.
