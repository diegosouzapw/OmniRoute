# Account-Ban / Banned-Keyword Detection (Suomi)

🌐 **Languages:** 🇺🇸 [English](../../../../security/BAN_DETECTION.md) · 🇪🇹 [am](../../../am/docs/security/BAN_DETECTION.md) · 🇸🇦 [ar](../../../ar/docs/security/BAN_DETECTION.md) · 🇦🇿 [az](../../../az/docs/security/BAN_DETECTION.md) · 🇧🇬 [bg](../../../bg/docs/security/BAN_DETECTION.md) · 🇧🇩 [bn](../../../bn/docs/security/BAN_DETECTION.md) · 🇧🇦 [bs](../../../bs/docs/security/BAN_DETECTION.md) · 🇨🇿 [cs](../../../cs/docs/security/BAN_DETECTION.md) · 🇩🇰 [da](../../../da/docs/security/BAN_DETECTION.md) · 🇩🇪 [de](../../../de/docs/security/BAN_DETECTION.md) · 🇬🇷 [el](../../../el/docs/security/BAN_DETECTION.md) · 🇪🇸 [es](../../../es/docs/security/BAN_DETECTION.md) · 🇪🇪 [et](../../../et/docs/security/BAN_DETECTION.md) · 🇮🇷 [fa](../../../fa/docs/security/BAN_DETECTION.md) · 🇫🇷 [fr](../../../fr/docs/security/BAN_DETECTION.md) · 🇮🇪 [ga](../../../ga/docs/security/BAN_DETECTION.md) · 🇮🇳 [gu](../../../gu/docs/security/BAN_DETECTION.md) · 🇳🇬 [ha](../../../ha/docs/security/BAN_DETECTION.md) · 🇮🇱 [he](../../../he/docs/security/BAN_DETECTION.md) · 🇮🇳 [hi](../../../hi/docs/security/BAN_DETECTION.md) · 🇭🇷 [hr](../../../hr/docs/security/BAN_DETECTION.md) · 🇭🇺 [hu](../../../hu/docs/security/BAN_DETECTION.md) · 🇦🇲 [hy](../../../hy/docs/security/BAN_DETECTION.md) · 🇮🇩 [id](../../../id/docs/security/BAN_DETECTION.md) · 🇳🇬 [ig](../../../ig/docs/security/BAN_DETECTION.md) · 🇮🇹 [it](../../../it/docs/security/BAN_DETECTION.md) · 🇯🇵 [ja](../../../ja/docs/security/BAN_DETECTION.md) · 🇬🇪 [ka](../../../ka/docs/security/BAN_DETECTION.md) · 🇰🇭 [km](../../../km/docs/security/BAN_DETECTION.md) · 🇮🇳 [kn](../../../kn/docs/security/BAN_DETECTION.md) · 🇰🇷 [ko](../../../ko/docs/security/BAN_DETECTION.md) · 🇱🇹 [lt](../../../lt/docs/security/BAN_DETECTION.md) · 🇱🇻 [lv](../../../lv/docs/security/BAN_DETECTION.md) · 🇮🇳 [ml](../../../ml/docs/security/BAN_DETECTION.md) · 🇮🇳 [mr](../../../mr/docs/security/BAN_DETECTION.md) · 🇲🇾 [ms](../../../ms/docs/security/BAN_DETECTION.md) · 🇲🇹 [mt](../../../mt/docs/security/BAN_DETECTION.md) · 🇲🇲 [my](../../../my/docs/security/BAN_DETECTION.md) · 🇳🇵 [ne](../../../ne/docs/security/BAN_DETECTION.md) · 🇳🇱 [nl](../../../nl/docs/security/BAN_DETECTION.md) · 🇳🇴 [no](../../../no/docs/security/BAN_DETECTION.md) · 🇮🇳 [or](../../../or/docs/security/BAN_DETECTION.md) · 🇮🇳 [pa](../../../pa/docs/security/BAN_DETECTION.md) · 🇵🇭 [phi](../../../phi/docs/security/BAN_DETECTION.md) · 🇵🇱 [pl](../../../pl/docs/security/BAN_DETECTION.md) · 🇵🇹 [pt](../../../pt/docs/security/BAN_DETECTION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/BAN_DETECTION.md) · 🇷🇴 [ro](../../../ro/docs/security/BAN_DETECTION.md) · 🇷🇺 [ru](../../../ru/docs/security/BAN_DETECTION.md) · 🇱🇰 [si](../../../si/docs/security/BAN_DETECTION.md) · 🇸🇰 [sk](../../../sk/docs/security/BAN_DETECTION.md) · 🇸🇮 [sl](../../../sl/docs/security/BAN_DETECTION.md) · 🇷🇸 [sr](../../../sr/docs/security/BAN_DETECTION.md) · 🇸🇪 [sv](../../../sv/docs/security/BAN_DETECTION.md) · 🇰🇪 [sw](../../../sw/docs/security/BAN_DETECTION.md) · 🇮🇳 [ta](../../../ta/docs/security/BAN_DETECTION.md) · 🇮🇳 [te](../../../te/docs/security/BAN_DETECTION.md) · 🇹🇭 [th](../../../th/docs/security/BAN_DETECTION.md) · 🇹🇷 [tr](../../../tr/docs/security/BAN_DETECTION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/BAN_DETECTION.md) · 🇵🇰 [ur](../../../ur/docs/security/BAN_DETECTION.md) · 🇺🇿 [uz](../../../uz/docs/security/BAN_DETECTION.md) · 🇻🇳 [vi](../../../vi/docs/security/BAN_DETECTION.md) · 🇳🇬 [yo](../../../yo/docs/security/BAN_DETECTION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/BAN_DETECTION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/BAN_DETECTION.md)

---

OmniRoute tutkii ylävirran virhevastauksista merkkejä, jotka ilmaisevat, että palveluntarjoajan
**tili on pysyvästi käyttökelvoton** (jäädytetty / poistettu käytöstä / estetty käyttöehtojen rikkomisen vuoksi), ja kun
osuma löytyy, siirtää kyseisen yhteyden **lopulliseen `banned`-tilaan**, jotta sitä ei
enää valita pyyntöihin. Tätä määritetään **Security → Banned Keywords**
-asetuskortilla ("Lisäavainsanat, jotka käynnistävät tilin pysyvän
estämisen tunnistuksen. Sisäänrakennettuja avainsanoja käytetään aina.").

Tällä sivulla dokumentoidaan sisäänrakennettu luettelo, tunnistuksen kulku, sen laajuus, mukautettujen
avainsanojen turvallinen lisääminen ja merkityn yhteyden palauttaminen. Lopullinen
tila itsessään on osa vikasietoisuusmallia — katso
[RESILIENCE_GUIDE](../architecture/RESILIENCE_GUIDE.md) ("Lopulliset tilat").

**Ensisijainen lähde:** `open-sse/services/accountFallback.ts`
(`ACCOUNT_DEACTIVATED_SIGNALS`, `getMergedBannedSignals()`, `isAccountDeactivated()`).

## Sisäänrakennetut avainsanat

Näitä kahdeksaa osamerkkijonoa käytetään aina (kirjainkoosta riippumatta) mukautetusta luettelosta riippumatta:

```
account_deactivated
account has been deactivated
account has been disabled
your account has been suspended
this account is deactivated
verify your account to continue                                 (Antigravity / Google Cloud Code)
this service has been disabled in this account for violation    (Antigravity)
this service has been disabled in this account                  (Antigravity)
```

> Tämä luettelo muuttuu palveluntarjoajien muuttaessa estoviestiensä sanamuotoja. Auktoritatiivinen
> versio on `ACCOUNT_DEACTIVATED_SIGNALS` tiedostossa `open-sse/services/accountFallback.ts`;
> yllä olevaa lohkoa tulee pitää tilannekuvana.

Samassa tiedostossa on kaksi vierekkäistä, **erillistä** signaalitaulukkoa, jotka _eivät_ kuulu
estettyjen avainsanojen tunnistukseen:

- `CREDITS_EXHAUSTED_SIGNALS` — laskutuskiintiö käytetty loppuun (`insufficient_quota`,
  `credit_balance_too_low`, `payment required`, …) → lopullinen `credits_exhausted`.
- `OAUTH_INVALID_TOKEN_SIGNALS` — **ei-lopullinen**; tunnisteen päivitys voi palauttaa toiminnan.

Huomautus: yleiset tilapäiset ilmaukset, kuten **`rate limit`** / `429`, käsitellään
nopeusrajoitus-/yhteyden jäähdytyspolulla, eivätkä ne ole estosignaaleja.

## Tunnistuksen kulku

```
ylävirran virhevastaus
  → runko muunnetaan merkkijonoksi + pieniksi kirjaimiksi
  → isAccountDeactivated(body): getMergedBannedSignals().some(sig => body.includes(sig))   [osamerkkijonon täsmäys]
  → osuma?
      → yhteyden testStatus = "banned"      (pysyvä — yhden vuoden jäähdytys, ei palaudu koskaan automaattisesti)
      → jos asetus `autoDisableBannedAccounts` on käytössä ja `autoDisableBannedScope`
        sisältää tämän yhteyden (`all` tai `subscription` OAuth-/eväste-/istuntoyhteyksille)
        → myös isActive = false. Ennakkoon maksetut API-avaimet pysyvät aktiivisina, kun laajuus on
        `subscription`.
      → yhteys ohitetaan tiliä valittaessa (yhdistelmän QUOTA_BLOCKING-tilat)
```

- Täsmäys on kirjainkoosta riippumaton **osamerkkijonohaku** vastauksen **rungosta**
  (`isAccountDeactivated`, `accountFallback.ts`).
- Pysyvä siirtyminen lopulliseen `banned`-tilaan käynnistyy estosignaalin sisältävästä rungosta **millä
  tahansa HTTP-tilakoodilla** (ketjussa `markAccountUnavailable` → `checkFallbackError`). Suppeampi
  **`deactivated`**-tunniste (`isActive=false`, kun yhteydellä ei ole
  vara-API-avaimia) kirjoitetaan `chatCore.ts`-tiedoston sisäisellä polulla **HTTP 401 / 403** -tilakoodeilla
  (luokittelu ketjussa `classifyProviderError` → `ACCOUNT_DEACTIVATED`). Huomaa, että
  `markAccountUnavailable()`-polku kirjoittaa samalle `ACCOUNT_DEACTIVATED`-signaalille _eri_ lopullisen tilan —
  **`expired`** — (`resolveTerminalConnectionStatus`-toiminnon kautta), joten sama esto voi näkyä joko
  `deactivated`- tai `expired`-tilana riippuen siitä, kumpi polku käsitteli vastauksen. (Vanhemmassa
  koodikommentissa sanotaan "kun 401-vastauksen runko sisältää nämä merkkijonot" — tämä
  kuvaa nykyistä toimintaa puutteellisesti.)
- `banned`-yhteys jätetään valinnan ulkopuolelle kaikkialla, missä lopulliset tilat
  suodatetaan (`isTerminalConnectionStatus`, yhdistelmän `QUOTA_BLOCKING_CONNECTION_STATUSES`).

## Soveltamisala — mitkä palveluntarjoajat tarkistetaan

**Kaikki palveluntarjoajat.** Tarkistus suoritetaan yleisessä virheenkäsittelyputkessa,
jonka läpi jokainen epäonnistunut upstream-pyyntö kulkee — sitä **ei** ole rajattu
OAuth-/tilausskrepereihin. Tuloksena syntyvä lopullinen tila määritetään
**yhteyskohtaisesti**, ei palveluntarjoajakohtaisesti.

Sisäänrakennetut _merkkijonot_ on kuitenkin suunnattu tilaus-/OAuth-
palveluntarjoajille, joihin liittyy todellinen estoriski (ChatGPT Web Codex, Claude Web, Codex, Muse Spark,
Antigravity). API-avainpalveluntarjoaja laukaisee tunnistimen vain, jos sen virherunko
sisältää kirjaimellisesti jonkin alimerkkijonoista.

`autoDisableBannedScope` (`all` | `subscription`, oletus `all`) määrittää, asetetaanko
osuman yhteydessä myös `isActive=false`. `subscription` tarkoittaa kirjautumispohjaisia käyttöpaikkoja
(maksullisia tilauksia ja ilmaisia tilejä, mukaan lukien verkkoevästeistunnot). Se
kirjaa edelleen `testStatus=banned` ennakkoon maksetuille API-avaimille, mutta jättää ne reitityspooliin.
Kestävä ratkaisu on palveluntarjoaja- ja tilikohtainen ohitus; globaali
enum on ensimmäinen toteutusversio.

## Mukautetut estoon viittaavat avainsanat

Lisää tai poista avainsanoja kohdassa **Security → Banned Keywords** (tallennetaan globaalina
`customBannedSignals`-asetuksena rajapinnan `PATCH /api/settings` kautta). Ne **lisätään**
sisäänrakennettuun luetteloon — ne eivät koskaan korvaa sitä — ja ne ladataan uudelleen lennossa tallennettaessa (sekä käynnistyksen yhteydessä)
funktion `setCustomBannedSignals()` kautta. Kukin avainsana on rajattu 200 merkkiin; taulukon
pituutta ei ole rajoitettu.

**⚠ Väärien positiivisten riski — valitse täsmällisiä ilmauksia.** Tunnistus perustuu raakaan alimerkkijono-
osumaan koko vastauksen rungossa, ja osuma on **pysyvä** (1 vuoden jäähtymisaika,
manuaalinen palautus). Liian yleinen avainsana voi estää täysin toimivan yhteyden:

- **Huono:** `quota`, `limit`, `error`, `denied` — esiintyvät monissa tilapäisissä virheissä.
- **Hyvä:** täydelliset estolauseet, esim. `your account has been suspended for`,
  `account permanently banned`, `violation of our terms`.

Suosi pisintä yksiselitteistä ilmausta, jonka palveluntarjoaja palauttaa todellisen eston yhteydessä. Jos olet
epävarma, seuraa ensin yhteyden `lastError`-arvoa ja lisää sitten täsmällinen sanamuoto.

## Merkityn yhteyden palauttaminen

Lopulliset `banned`- / `deactivated`-tilat **eivät koskaan palaudu automaattisesti** (ne jätetään
ennakoivan palautuksen ajastetun suorituksen ulkopuolelle — vain `unavailable`-tilan jäähtymisajat palautuvat
itsestään). Ylläpitäjän on poistettava ne nimenomaisesti:

1. **Testaa yhteys uudelleen** — hallintapaneelin **Test**-toiminto
   (`POST /api/providers/{id}/test`); onnistunut tarkistus palauttaa `testStatus`-arvoksi
   `active` ja tyhjentää virhekentät.
2. **Todenna uudelleen / muokkaa tunnistetietoja** — suorita OAuth-palveluntarjoajille kirjautumis-
   / päivitysprosessi uudelleen; palveluntarjoajan luonti-/tuontireitit asettavat arvon `isActive = true`.
3. **Ota yhteys uudelleen käyttöön** — jos automaattinen käytöstäpoisto asetti arvon `isActive = false`
   (soveltamisala `all` tai `subscription` OAuth-/eväste-/istuntoyhteydelle),
   kytke se takaisin päälle tilin korjaamisen jälkeen.

Erillistä "tyhjennä estomerkintä" -painiketta ei ole — palautus tapahtuu testaamalla tai todentamalla uudelleen tai
ottamalla yhteys uudelleen käyttöön yleisen lopullisten tilojen säännön mukaisesti oppaassa
[RESILIENCE_GUIDE](../architecture/RESILIENCE_GUIDE.md).

## Tarkistusten eristäminen (kaikkien mallien testaus)

**Tarkistuksesta peräisin oleva virhe** (kaikkien mallien testauksen / kuntotarkistuksen lähetykset, jotka suoritetaan
kohteen `runAsProbe` sisällä) ei koskaan poista yhteyttä poolista (#9817): se
**kirjataan näkyvyyttä varten** (`last_error`, `last_error_type`, `error_code`,
`last_error_at`), mutta se ohittaa **kaikki** reititysmuutokset — jäähtymisajat, lopullisen
tilan (`banned` / `deactivated` / `credits_exhausted`), mallikohtaiset lukitukset,
palveluntarjoajan katkaisijan, 5 minuutin kiintiövälimuistin, OAuth-tunnisteen päivityksen
ja automaattisen käytöstäpoiston. Vain todellisella pyyntöpolulla tapahtuva virhe poistaa yhteyden käytöstä. Kirjattu
virhe tekee merkityn tilin näkyväksi hallintapaneelissa samalla, kun se jatkaa
liikenteen palvelemista.

Ainoa päätöspiste on `shouldIsolateProbeFailures()`
(`src/shared/utils/probeOrigin.ts`), jota käyttää **jokainen** kohta, joka voisi
muuttaa reititystilaa tarkistuksesta peräisin olevan virheen perusteella:

- `markAccountUnavailable` (`auth.ts`) — vain kirjaus (`lastError` raakana tekstinä,
  `lastErrorType`, `errorCode`, `lastErrorAt`; tarkoituksellisesti **ei**
  `backoffLevel`-arvoa, joka laukaisisi valinta-aikaisen automaattisen vaimenemisen ja pyyhkisi
  kirjauksen)
- `maybeAutoDisableBannedAccount` — ei automaattista käytöstäpoistoa
- `chatCore` — FORBIDDEN, ACCOUNT_DEACTIVATED, QUOTA_EXHAUSTED (vain kirjaus,
  ei lopullista `credits_exhausted`-tilaa), GEO_BLOCKED (ei 24 tunnin poissulkemista),
  MODEL_NOT_FOUND (ei `lockModel`-kutsua), codexin 429-tilikierron vikasieto
  (ei `markCodexScopeRateLimited`-kutsua, ei pysyvää `rate_limited_until`-arvoa, ei
  istuntosidonnaisuuden tyhjennystä), `persistCodexQuotaState` (ei kiintiötilan kirjoitusta,
  ei välimuistin mitätöintiä), `recordKeyHealthStatus` (avainten kunnon kierrättäjään
  ei kosketa)
- OAuth-päivitys — sekä ennakoiva päivitys suorittimen kantaluokassa
  (`base.ts` `execute()`, päivitystunnisteen kiertoa ei kuluteta) että
  reaktiivinen 401/403-polku kohteessa `chatCore` (ei `expired`-käytöstäpoistoa)
- `chat.ts` — palveluntarjoajan katkaisijaa ja 5 minuutin kiintiövälimuistia
  (`markAccountExhaustedFrom429`) ei koskaan heikennetä

Kirjattu virhe tekee merkityn tilin näkyväksi hallintapaneelissa
samalla, kun se jatkaa liikenteen palvelemista. Huomautus: tarkistuskirjaus tallentaa **raa'an**
(katkaisemattoman) virhetekstin, toisin kuin todellisen polun `slice(0,100)`-katkaisu.

Ylläpitäjät, jotka käyttävät kaikkien mallien testausta ylläpitotyökaluna, voivat palauttaa aiemman
toiminnan (tarkistus lasketaan todelliseksi generoinniksi) jommallakummalla tavalla:

- `probeCanDisable`-asetus (`POST /api/settings` rungolla
  `{"probeCanDisable": true}` tai suora `key_value`-tietokantamuokkaus), tai
- ominaisuuslippu **`PROBE_CAN_DISABLE=true`** (ympäristö- tai tietokantaohitus; ohittaa
  asetuksen).

Vikasuojaus: jos lipun tai asetuksen haku aiheuttaa poikkeuksen, eristys pysyy KÄYTÖSSÄ.

## Lähdetiedostot

| Kohde                                                    | Tiedosto                                                                                                      |
| -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| Signaalitaulukot + täsmäytys                             | `open-sse/services/accountFallback.ts`                                                                        |
| Päättäminen / pysyväistallennus                          | `src/sse/services/auth.ts` (`markAccountUnavailable`, `resolveTerminalConnectionStatus`, `clearAccountError`) |
| Automaattisen käytöstäpoiston laajuus                    | `src/shared/utils/autoDisableBanned.ts`, `src/sse/services/autoDisableBannedAccount.ts`                       |
| Upotettu luokittelu                                      | `open-sse/handlers/chatCore.ts`, `open-sse/services/errorClassifier.ts`                                       |
| Päätetilan palautuksesta poissulkeminen                  | `src/lib/quota/connectionRecovery.ts`                                                                         |
| Mukautettujen avainsanojen lataaminen suorituksen aikana | `src/lib/config/runtimeSettings.ts` (`setCustomBannedSignals`)                                                |
| Asetusten käyttöliittymä                                 | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`                                           |
