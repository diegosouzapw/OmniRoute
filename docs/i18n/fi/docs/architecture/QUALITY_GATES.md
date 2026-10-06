# Quality Gates Reference (Suomi)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/QUALITY_GATES.md) · 🇪🇹 [am](../../../am/docs/architecture/QUALITY_GATES.md) · 🇸🇦 [ar](../../../ar/docs/architecture/QUALITY_GATES.md) · 🇦🇿 [az](../../../az/docs/architecture/QUALITY_GATES.md) · 🇧🇬 [bg](../../../bg/docs/architecture/QUALITY_GATES.md) · 🇧🇩 [bn](../../../bn/docs/architecture/QUALITY_GATES.md) · 🇧🇦 [bs](../../../bs/docs/architecture/QUALITY_GATES.md) · 🇨🇿 [cs](../../../cs/docs/architecture/QUALITY_GATES.md) · 🇩🇰 [da](../../../da/docs/architecture/QUALITY_GATES.md) · 🇩🇪 [de](../../../de/docs/architecture/QUALITY_GATES.md) · 🇬🇷 [el](../../../el/docs/architecture/QUALITY_GATES.md) · 🇪🇸 [es](../../../es/docs/architecture/QUALITY_GATES.md) · 🇪🇪 [et](../../../et/docs/architecture/QUALITY_GATES.md) · 🇮🇷 [fa](../../../fa/docs/architecture/QUALITY_GATES.md) · 🇫🇷 [fr](../../../fr/docs/architecture/QUALITY_GATES.md) · 🇮🇪 [ga](../../../ga/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [gu](../../../gu/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ha](../../../ha/docs/architecture/QUALITY_GATES.md) · 🇮🇱 [he](../../../he/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [hi](../../../hi/docs/architecture/QUALITY_GATES.md) · 🇭🇷 [hr](../../../hr/docs/architecture/QUALITY_GATES.md) · 🇭🇺 [hu](../../../hu/docs/architecture/QUALITY_GATES.md) · 🇦🇲 [hy](../../../hy/docs/architecture/QUALITY_GATES.md) · 🇮🇩 [id](../../../id/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ig](../../../ig/docs/architecture/QUALITY_GATES.md) · 🇮🇹 [it](../../../it/docs/architecture/QUALITY_GATES.md) · 🇯🇵 [ja](../../../ja/docs/architecture/QUALITY_GATES.md) · 🇬🇪 [ka](../../../ka/docs/architecture/QUALITY_GATES.md) · 🇰🇭 [km](../../../km/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [kn](../../../kn/docs/architecture/QUALITY_GATES.md) · 🇰🇷 [ko](../../../ko/docs/architecture/QUALITY_GATES.md) · 🇱🇹 [lt](../../../lt/docs/architecture/QUALITY_GATES.md) · 🇱🇻 [lv](../../../lv/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ml](../../../ml/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [mr](../../../mr/docs/architecture/QUALITY_GATES.md) · 🇲🇾 [ms](../../../ms/docs/architecture/QUALITY_GATES.md) · 🇲🇹 [mt](../../../mt/docs/architecture/QUALITY_GATES.md) · 🇲🇲 [my](../../../my/docs/architecture/QUALITY_GATES.md) · 🇳🇵 [ne](../../../ne/docs/architecture/QUALITY_GATES.md) · 🇳🇱 [nl](../../../nl/docs/architecture/QUALITY_GATES.md) · 🇳🇴 [no](../../../no/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [or](../../../or/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [pa](../../../pa/docs/architecture/QUALITY_GATES.md) · 🇵🇭 [phi](../../../phi/docs/architecture/QUALITY_GATES.md) · 🇵🇱 [pl](../../../pl/docs/architecture/QUALITY_GATES.md) · 🇵🇹 [pt](../../../pt/docs/architecture/QUALITY_GATES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/QUALITY_GATES.md) · 🇷🇴 [ro](../../../ro/docs/architecture/QUALITY_GATES.md) · 🇷🇺 [ru](../../../ru/docs/architecture/QUALITY_GATES.md) · 🇱🇰 [si](../../../si/docs/architecture/QUALITY_GATES.md) · 🇸🇰 [sk](../../../sk/docs/architecture/QUALITY_GATES.md) · 🇸🇮 [sl](../../../sl/docs/architecture/QUALITY_GATES.md) · 🇷🇸 [sr](../../../sr/docs/architecture/QUALITY_GATES.md) · 🇸🇪 [sv](../../../sv/docs/architecture/QUALITY_GATES.md) · 🇰🇪 [sw](../../../sw/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ta](../../../ta/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [te](../../../te/docs/architecture/QUALITY_GATES.md) · 🇹🇭 [th](../../../th/docs/architecture/QUALITY_GATES.md) · 🇹🇷 [tr](../../../tr/docs/architecture/QUALITY_GATES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/QUALITY_GATES.md) · 🇵🇰 [ur](../../../ur/docs/architecture/QUALITY_GATES.md) · 🇺🇿 [uz](../../../uz/docs/architecture/QUALITY_GATES.md) · 🇻🇳 [vi](../../../vi/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [yo](../../../yo/docs/architecture/QUALITY_GATES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/QUALITY_GATES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/QUALITY_GATES.md)

---

Tämä asiakirja on kaikkien OmniRouten CI-laatuporttien ensisijainen viite.
Siinä kuvataan jokainen portti, mitä se validoi, missä CI-työssä se suoritetaan, käyttääkö se
ratchet-vertailutasoa vai hyväksy/hylkää-käytäntöä ja estääkö se koontiversion muodostamisen vai onko se neuvoa-antava.

Lyhyt yhteenveto ja sallittujen kohteiden luettelon käytäntö ovat `AGENTS.md`-tiedoston
"Quality Gates & Ratchets" -osiossa. Saman järjestelmän kriittinen arviointi, kypsyysluokitus ja
työkaluista riippumaton toisintamissuunnitelma ovat
[laatuporttien käsikirjassa](../ops/QUALITY_GATE_PLAYBOOK.md).

---

## Porttien luettelo ja suoritusprofiilit

### Ehdokkaiden hyväksyntä

CI- ja Quality Gates -työnkulut tuottavat kumpikin vakaan tuloksen: `Gate / CI` ja
`Gate / Quality`. Niiden versioitu hyväksyntäkäytäntö määrittää jokaisen edeltävän työn
pakolliseksi tai neuvoa-antavaksi. Soveltuvan pakollisen työn on onnistuttava: puuttuva,
peruutettu, ohitettu, keskeneräinen tai tuntematon tulos ei voi vahvistaa PASS-tulosta. Kelvollinen
vain dokumentaatiota tai vain luetteloa koskeva luokitus voi tehdä koodilinjasta soveltumattoman;
luonnostilassa oleva PR ei ole hyväksytty ehdokas. `hotfix`-tunniste ei poista näyttövaatimusta.

Molemmat työnkulut kattavat PR:t ja pushit main/release-haaroihin, manuaalisen käynnistyksen sekä
merge-group-tapahtumat. Push, dispatch ja merge-group suorittavat täyden valinnan. Forkit
ja yhdistämisryhmät käyttävät ylläpidettyjä suorittimia töissä, jotka muutoin valitsevat itse ylläpidetyt
suorittimet; ylläpidetyn kapasiteetin riittävyys on varmistettava ennen käyttöönottoa.

Jokainen JSON-kuitti yksilöi uloskuitatun SHA:n, työnkulun suorituksen ja yrityksen.
CLI hylkää tilanteen, jossa uloskuittauksen SHA ja tapahtuman SHA eivät täsmää. Työnkulkutestit sitovat käytäntöjäsenyyden
tulostyön `needs`-luetteloon, jotta uusi tai poistettu linja ei voi kadota huomaamatta.
Kuitit kattavat oman työnkulkunsa, eivät julkaisua, käyttöönottoa tai
olemassa olevan neuvoa-antavan skannerin sisäistä toimintaa. Molempien tarkistusnimien aktivoiminen haarasäännöissä on
erillinen hallinnollinen muutos; näiden töiden lisääminen ei itsessään suojaa haaraa.

### Staattisen tarkistuksen luettelo

Versioitu npm-aliasten luettelo ja staattisen tarkistuksen jäsenyydet sijaitsevat tiedostossa
`config/quality/gate-manifest.json`. Suorita `npm run check:gate-manifest` vahvistaaksesi
skriptien nimet ja tarkat komennot suhteessa tiedostoon `package.json`; lisäykset, poistot ja
komentojen muutokset aiheuttavat virheen sekä paikallisessa hookissa että CI:n muutosluokittelutöissä.
Alias ei ole työnkulun työ, matriisi-instanssi tai testitapaus: näitä määriä ei saa
esittää keskenään vaihdettavina.

Käytä komentoa `npm run quality:scan -- --list` tai `npm run quality:scan:fast -- --list`
tarkastellaksesi valittuja aliaksia suorittamatta niitä. Suoritin kutsuu
npm-aloituskohtaa, joten sen suoritusympäristö (mukaan lukien Bun, jos se on määritetty) säilyy.
Manifesti kirjaa näiden profiilien ulkopuoliset aliakset erikseen kutsuttaviksi, ja
ylläpitokomennot ovat kiellettyjä vain luku -tarkistusprofiileissa.

Nämä profiilit kattavat vain staattisen tarkistuksen. Ne eivät sertifioi tuotetestejä,
kattavuutta, paketointia, ulkoisia tarkistuksia tai ehdokkaan täyttä julkaisuhyväksyntää.
Työnkulun hyväksyntä käyttää linkitettyä tiedostoa `config/quality/admission-policy.json` ja
skriptiä `scripts/quality/admission-verdict.mjs`. Release-observer-profiilit pysyvät erillisinä;
tarkasta niiden soveltuvat tarkistukset ja kuitit itsenäisesti. Alla oleva sanallinen
luettelo on viite, ei todiste siitä, että portti todella suoritettiin.

Skriptit sijaitsevat hakemistoissa `scripts/check/` (käytäntöportit) ja `scripts/quality/` (ratchet-moottori).
CI:n totuuden lähde on `.github/workflows/ci.yml`.

### Julkaisu-PR:n nopea polku (`quality.yml`)

`.github/workflows/quality.yml` täydentää CI:tä main/release-PR:issä, suojattujen haarojen
pusheissa, dispatch-käynnistyksissä ja yhdistämisryhmissä. PR:t käyttävät polkusuodatettuja nopeita tarkistuksia. Pysyvästi
käytöstä poistettu päällekkäinen koonti poistettiin; varsinaiset koonti-, paketointi- ja käynnistystarkistukset säilyvät CI:ssä.

| Työ                                              | Laajuus                                                                                                                                                                                                                                      | Estävä                |
| ------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- |
| `Docs Gates (fast-path)`                         | Dokumentaatio-/koodi-PR:t; API-dokumentaation viitteet ja kaikki dokumentaatiot                                                                                                                                                              | Kyllä                 |
| `Fast Quality Gates`                             | Koodi-PR:t; staattiset tarkistukset, tyyppitarkistus, koontinäytön tyyppitarkistus, vaikutuksenalaiset yksikkötestit                                                                                                                         | Kyllä                 |
| `Forgotten sibling tests`                        | Koodi-PR:t; muuttuneet moduulit jäljitetään staattisiin käyttäjiin ja mahdollisiin rinnakkaistesteihin; barrel- ja dynaamisen tuonnin polut raportoidaan neuvoa-antavina diagnostiikkoina yhdessä viitattujen sallittujen poikkeusten kanssa | **Neuvoa-antava**     |
| `Vitest (fast-path)`                             | Koodi-PR:t; nopea vitest-testikokonaisuus                                                                                                                                                                                                    | Kyllä                 |
| `Unit Tests fast-path`                           | Koodi-PR:t; neljään osaan jaettu yksikkötestikokonaisuus                                                                                                                                                                                     | Kyllä                 |
| `No new ESLint warnings`                         | Koodi-PR:t; ohitukset huomioiva lint-suojatarkistus                                                                                                                                                                                          | Kyllä, myös forkeissa |
| `Merge integrity (changelog + generated skills)` | Muut kuin luonnostilassa olevat PR:t; muutoslokin ja generoitujen taitojen synkronointi                                                                                                                                                      | Kyllä, myös forkeissa |

#### Unohtuneiden rinnakkaistestien raportti

`npm run check:forgotten-sibling-tests` käyttää uudelleen testivaikutuskartan taustalla olevaa tuontiresolveria.
Jokaiselle muuttuneelle tuotantomoduulille se raportoi deterministiset
`muuttunut moduuli/symboli -> staattinen käyttäjä -> mahdollinen rinnakkaistesti` -ketjut, kun mahdollinen
testi puuttuu pull requestin diffistä. Markdown-yhteenveto ja JSON-tulos säilytetään
`forgotten-sibling-tests`-työnkulkuartefaktina kalibrointia varten ennen mahdollista estävää käyttöönottoa.

Barrel-uudelleenviennit ja dynaamiset tuonnit ovat vain ratkaisudiagnostiikkaa; ne eivät koskaan luo
estävää havaintoa. Tarkistetut poikkeukset sijaitsevat tiedostossa
`config/quality/forgotten-sibling-allowlist.json`. Jokaisessa merkinnässä on nimettävä kuluttaja ja ehdolla oleva
testi, annettava täsmällinen perustelu ja linkitettävä GitHub-ongelmaan tai vetopyyntöön. Virheelliset merkinnät
hylätään turvallisesti. Poikkeukset eivät voi ohittaa poistettua ehdokastestiä tai diffiä, joka lisää `.skip`- tai `.todo`-määrityksen;
väitteiden heikentäminen ja muu peittäminen kuuluvat edelleen itsenäisesti estävälle
`check:test-masking`-portille.

### Työ: `lint`

Suoritetaan jokaisessa `main`-haaraan kohdistuvassa PR:ssä. Estää yhdistämisen epäonnistuessaan.

| Skripti (`npm run ...`)           | Tarkistaa                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Estävä                                        |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| `check:node-runtime`              | Node.js-versio on tuetulla alueella                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Kyllä                                         |
| `check:cycles`                    | Kehämäiset tuonnit koko `src/`- ja `open-sse/`-hakemistoissa (AST-pohjainen, tsconfigin `paths` ratkaistu). Pelkkä tarkistus on neuvoa-antava ja luettelee kehät. `check:cycles:ratchet` (jonka CI suorittaa) estää, kun määrä ylittää `quality-baseline.json`-tiedoston `metrics.cycles`-enimmäisrajan — tällä hetkellä 14, `direction: down`, joten määrä voi vain pienentyä (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Kyllä (räikkä)                                |
| `check:route-validation:t06`      | Zod-skeemat ovat käytössä kaikilla reiteillä (tason 6 käytäntö)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Kyllä                                         |
| `check:any-budget:t11`            | `@ts-expect-error // any`-määrä ei ylitä budjettia (tason 11 räikkä)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Kyllä                                         |
| `check:provider-consistency`      | Jokaisella tiedoston `providers.ts` palveluntarjoajalla on vastaava merkintä tiedostossa `providerRegistry.ts` (ja päinvastoin sallittujen luettelon rajoissa)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Kyllä                                         |
| `check:model-lifecycle`           | Kolme käsin ylläpidettävää reititystaulukkoa pysyvät yhdenmukaisina versionhallintaan tallennetun elinkaarivedoksen (#11503) kanssa: `FITNESS_TABLE` (`taskFitness.ts`) ei pisteytä yhtäkään käytöstä poistettua tunnistetta, jonka `REGISTRY` voi reitittää; jokainen `BUILT_IN_ALIASES`-kohde sisältyy `REGISTRY`-rekisteriin eikä esiinny käytöstä poistettujen tunnisteiden vedoksessa; jokainen käytöstä poistettu tunniste, joka on yhä `REGISTRY`-rekisterissä, välitetään eteenpäin tai luetellaan kohdassa `allowedRetiredInCatalog`; eikä yksikään `DEFAULT_DEGRADATION_MAP`-lähde tai -kohde esiinny käytöstä poistettuna kyseisessä vedoksessa. Tämä ei todista, että aktiivinen upstream-palvelu tarjoaa mallia tällä hetkellä. Offline — vertaa tiedostoon `config/quality/model-lifecycle.json`, joka päivitetään käsin komennolla `npm run quality:refresh-model-lifecycle` (vaatii verkkoyhteyden; ei ole kytketty CI-järjestelmään). `allowedRetiredInCatalog` on asteittain supistettava lista: lisää merkintä vain, jos sille on seurantatehtävä. | Kyllä                                         |
| `check:fetch-targets`             | Jokainen asiakaspuolen `src/`-hakemistossa oleva `fetch("/api/...")` viittaa todelliseen `route.ts`-tiedostoon                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Kyllä                                         |
| `check:deps`                      | Kaikki repositorion jokaisen `package.json`-tiedoston `npm install` -komennolla asennettavat riippuvuudet sisältyvät tiedostoon `dependency-allowlist.json`; uudet versioon sitomattomat tai kirjoitusvirhetyyppisellä nimikaappauksella lisätyt paketit merkitään                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Kyllä                                         |
| `audit:deps`                      | `npm audit` (juuri + electron) — ei vakavia/kriittisiä varoituksia (osittain päällekkäinen OSV-tarkistuksen `check:vuln-ratchet` kanssa; katso Rationalisointijono)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Kyllä                                         |
| `check:lockfile`                  | `package-lock.json`-tiedoston eheys — HTTPS-rekisteri, eheystiivisteet, ei palvelinkohtaisia ohituksia                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Kyllä                                         |
| `check:licenses`                  | Tuotantoriippuvuuksien SPDX-lisenssien sallittujen luettelo                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Kyllä                                         |
| `check:tracked-artifacts`         | Ei koontiartefakteja / versionhallintaan lisättyjä `node_modules`-symbolisia linkkejä (suoritetaan myös husky pre-commit -koukussa; pre-push on tarkoituksella kevyt — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Kyllä                                         |
| `check:ai-attribution`            | Ei tekoälyn/botin `Co-Authored-By`-lopuketta tai tekoälygeneroinnin alatunnistetta PR-commiteissa, otsikossa tai kuvauksessa — ehdoton sääntö #16 (`quality.yml`-tiedoston nopeiden tarkistusten silmukassa PR→`release/**` — lukee tapahtuman hyötykuorman, ei tee mitään PR:ien ulkopuolella — sekä vain PR:ille suoritettavana vaiheena `ci.yml`-tiedoston lint-tarkistuksessa PR→`main`; myös husky `commit-msg` -koukussa; ihmiset sallitaan kanssakirjoittajina; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `check:vitest-exclusions`         | Jokainen Vitest-poissulku nimeää seurantatehtävän ja esiintyy tiedostossa `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Kyllä                                         |
| `check:file-size`                 | Mikään lähdetiedosto ei ylitä tiedostopäätekohtaista enimmäiskokoa (räikkä: suuret tiedostot jäädytetty `frozen`-luettelossa)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Kyllä                                         |
| `check:error-helper`              | Suorittimien/käsittelijöiden virhevastaukset käyttävät funktioita `buildErrorBody()` / `sanitizeErrorMessage()` (ehdoton sääntö #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Kyllä                                         |
| `check:migration-numbering`       | Migraatioiden SQL-tiedostot on numeroitu peräkkäin ilman aukkoja tai päällekkäisyyksiä                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Kyllä                                         |
| `check:public-creds`              | Ei literaaleja OAuth-`client_id`/`client_secret`-arvoja tai Firebase Web -avaimia `publicCreds.ts`-tiedoston ulkopuolella (ehdoton sääntö #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Kyllä                                         |
| `check:db-rules`                  | Ei raakaa SQL:ää `src/lib/db/`-moduulien ulkopuolella; ei barrel-tuonteja `localDb.ts`-tiedostosta (ehdottomat säännöt #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Kyllä                                         |
| `check:known-symbols`             | Välitystauluihinsa rekisteröidyt palveluntarjoajien suorittimet, reititysstrategiat ja muuntimet vastaavat levyllä olevia tiedostoja — ei irrallisia tai ilmoittamattomia symboleja                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Kyllä                                         |
| `check:route-guard-membership`    | Jokainen aliprosessin käynnistävä reitti on luokiteltu `isLocalOnlyPath()`-funktiolla (ehdottomat säännöt #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Kyllä                                         |
| `check:test-discovery`            | Jokainen repositorion `*.test.ts`- / `*.spec.ts`-tiedosto sisältyy vähintään yhden testiajon keräämiin testeihin (räikkäperiaate: `test-discovery-baseline.json`-tiedoston irrallisten testien lista voi vain lyhentyä)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Kyllä                                         |
| `check:agent-skills-sync`         | Luodut agent-skills-artefaktit vastaavat lähdeluetteloaan (ei poikkeamia)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `check:provider-asset-provenance` | Palveluntarjoajien logoilla/resursseilla on kirjattu alkuperätietue                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `lint:json`                       | JSON-määritystiedostot jäsentyvät ja täyttävät repositorion lint-säännöt                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `typecheck:core`                  | TypeScript-käännös ilman virheitä (vain neuvoa-antavia varoituksia)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Kyllä                                         |
| `typecheck:noimplicit:core`       | Tiukka `noImplicitAny` — tulevaisuuteen suuntautuva; monet aiemmin olemassa olleet kutsukohdat tarvitsevat yhä annotaatioita                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | **Neuvoa-antava** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc`, jonka kohteena on `src/app/(dashboard)/**` (#7033) — `typecheck:core`-tarkistuksen rajattu 27 tiedoston sallittujen luettelo ei sisällä yhtään dashboard-TSX-tiedostoa, eikä `next build` myöskään koskaan tyyppitarkista niitä (`next.config.mjs` määrittää asetuksen `ignoreBuildErrors: true`), joten irrallisiin tunnisteisiin liittyvät regressiot (#6625/#6909) jäivät CI:ltä havaitsematta. Eroja verrataan jäädytettyyn tiedosto- ja TS-koodikohtaiseen lukumäärän perustasoon (`config/quality/dashboard-typecheck-baseline.json`, sama vanhentuneisuuden valvontamalli kuin tarkistuksessa `check:known-symbols`) — vain perustason määrän ylittävät UUDET virheet aiheuttavat portin epäonnistumisen; alenna perustasoa valitsimella `--update`, kun aiemmin olemassa ollut virhe korjataan.                                                                                                                                                                                                                                                        | Kyllä                                         |

### Työ: `quality-gate`

Suoritetaan `test-coverage`-työn jälkeen. Estää yhdistämisen epäonnistuessaan.

| Skripti                      | Tarkistaa                                                                                                                                                                             | Estävä                            |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------- |
| `quality:collect`            | Tuottaa tiedoston `quality-metrics.json` (ESLint-varoitusten määrä, yhdistetystä osaraportista saatu kattavuus)                                                                       | Kyllä (ratchet-vaihetta edeltävä) |
| `quality:ratchet`            | Yksikään tiedoston `quality-baseline.json` mittari ei ole heikentynyt (ESLint-varoitukset ≤ vertailutaso; kattavuus ≥ vertailutaso)                                                   | Kyllä                             |
| `check:duplication`          | Koodin duplikaatio (jscpd@4) ei ylitä tiedostossa `quality-baseline.json` määritettyä vertailutasoa                                                                                   | Kyllä                             |
| `check:complexity`           | Tiedostotason syklomaattinen kompleksisuus ei ylitä ylärajaa (ESLint-ytimen `complexity` + `max-lines-per-function`)                                                                  | Kyllä                             |
| `check:cognitive-complexity` | Kognitiivisen kompleksisuuden ratchet-tarkistus (`eslint-plugin-sonarjs`) — erillinen ESLint-ajo; CI suorittaa molemmat yhdistettynä yhtenä `check:complexity-ratchets`-vaiheena      | Kyllä                             |
| `check:dead-code`            | Käyttämättömien vientien/tiedostojen ratchet-tarkistus (knip) ei heikkene vertailutasoon nähden                                                                                       | Kyllä                             |
| `check:compression-budget`   | Pakkauksen suorituskykytestin budjetti — moottorikohtaiset token-säästöjen vähimmäisrajat eivät saa heikentyä                                                                         | Kyllä                             |
| `check:type-coverage`        | Tyypitetyn osuuden ratchet-tarkistus (`type-coverage`) ei heikkene; korvaa suurelta osin tarkistuksen `typecheck:noimplicit:core`                                                     | Kyllä                             |
| `check:codeql-ratchet`       | Avointen CodeQL-hälytysten määrä ei kasva (lukee komennolla `gh api`; ohitetaan hallitusti ilman tunnistetta) — päivitystiheys ja manuaalinen käynnistys: katso alta ”CodeQL-ratchet” | Kyllä                             |

### Työ: `quality-extended`

Koko työ on neuvoa-antava (`continue-on-error: true`). npm-pohjaiset ratchet-tarkistukset suoritetaan
oikeasti; ulkoiset skannerit asennetaan komennolla `gh release download`, ja ne ohittavat itsensä (exit 0),
jos binääriä ei vieläkään ole saatavilla.

| Skripti                  | Tarkistaa                                                                                                                                                                                                                                                                  | Estävä                                              |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------- |
| `check:circular-deps`    | Ei syklisiä riippuvuuksia (dpdm)                                                                                                                                                                                                                                           | **Neuvoa-antava**                                   |
| `check:bundle-size`      | Paketin koko ei ylitä ylärajaa                                                                                                                                                                                                                                             | **Neuvoa-antava**                                   |
| `check:secrets`          | Salaisuuksien skannaus (gitleaks) — ohitetaan, jos binääri puuttuu                                                                                                                                                                                                         | **Neuvoa-antava**                                   |
| `check:vuln-ratchet`     | Riippuvuuksien haavoittuvuudet (osv-scanner) eivät lisäänny — ohitetaan, jos binääri puuttuu                                                                                                                                                                               | **Neuvoa-antava**                                   |
| `check:workflows`        | Työnkulkujen lint-tarkistus (actionlint + zizmor); puuttuvat tai vialliset skannerit, virheelliset raportit tai puuttuva ratchet-vertailutaso epäonnistuvat tilalla INCOMPLETE. Kelvollisiin löydöksiin sovelletaan valittua tiukkaa, neuvoa-antavaa tai ratchet-käytäntöä | Suoritus vaaditaan; zizmor-ratchet on estävä CI:ssä |
| `check:openapi-breaking` | Julkisen API-sopimuksen (`openapi.yaml`) rikkovat muutokset verrattuna perushaaraan (oasdiff) — tuottaa arvon `openapiBreaking=N`; ohitetaan, jos oasdiff puuttuu tai perusmääritystä ei voida selvittää                                                                   | **Neuvoa-antava**                                   |

### Työ: `docs-sync-strict`

Suoritetaan jokaiselle `main`-haaraan kohdistuvalle PR:lle. Epäonnistuminen estää yhdistämisen.

| Skripti                        | Tarkistaa                                                                                                                                                                                                  | Estävä                    |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- |
| `check:docs-all`               | Metaportti, joka suorittaa alla olevat 6 aliporttia peräkkäin                                                                                                                                              | Kyllä                     |
| ↳ `check:docs-sync`            | CHANGELOGin / OpenAPIn / llm.txt:n versioiden yhdenmukaisuuden                                                                                                                                             | Kyllä                     |
| ↳ `check:docs-counts`          | Tekstissä ilmoitetut lukumäärät (palveluntarjoajien määrä, migraatioiden määrä jne.) ovat todellisten lukumäärien räikkäikkunan sisällä                                                                    | Kyllä                     |
| ↳ `check:env-doc-sync`         | Jokainen `.env.example`-tiedoston ympäristömuuttuja on dokumentoitu dokumentaation taulukossa ja päinvastoin                                                                                               | Kyllä                     |
| ↳ `check:deprecated-versions`  | Dokumentaatiossa ei ole vanhentuneita versiomerkkijonoja                                                                                                                                                   | Kyllä                     |
| ↳ `check:doc-links`            | Dokumentaation sisäiset markdown-linkit viittaavat olemassa oleviin tiedostoihin (`[teksti]`/`(polku)`-muoto)                                                                                              | Kyllä                     |
| ↳ `check:fabricated-docs`      | Dokumentaatiossa mainitut reitit, ympäristömuuttujat, CLI-komennot, hook-nimet ja tiedostopolut ovat olemassa koodikannassa. Kova portti `--strict`-valitsimella; pehmeä epäonnistuminen ilman valitsinta. | Kyllä (`--strict` CI:ssä) |
| `check:cli-i18n`               | CLI-komentomerkkijonot ovat mukana kaikissa i18n-lokaalitiedostoissa                                                                                                                                       | Kyllä                     |
| `check:openapi-coverage`       | OpenAPI-määritys kattaa vähintään räikällä määritetyn vähimmäismäärän todellisista reiteistä                                                                                                               | Kyllä                     |
| `check:openapi-security-tiers` | `openapi.yaml`-tiedoston suojaustasomerkinnät ovat yhdenmukaisia `routeGuard.ts`-tiedoston luokitusten kanssa                                                                                              | **Ohjeellinen**           |
| `check:openapi-routes`         | Jokainen `openapi.yaml`-tiedoston polku viittaa todelliseen `route.ts`-tiedostoon (hallusinaatioiden esto)                                                                                                 | Kyllä                     |
| `check:docs-symbols`           | Jokainen `/api/...`-viittaus tiedostoissa `docs/**/*.md` viittaa todelliseen `route.ts`-tiedostoon (hallusinaatioiden esto)                                                                                | Kyllä                     |
| `i18n translation drift`       | Kääntämättömät avaimet i18n-lokaalitiedostoissa — vain varoitus                                                                                                                                            | **Ohjeellinen**           |

### Työ: `i18n-ui-coverage`

| Skripti                             | Tarkistaa                                                                                                                                                                                                                            | Estävä          |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------- |
| `check-ui-keys-coverage` (sisäinen) | Käyttöliittymän i18n-avainten kattavuus on ≥ 65 %                                                                                                                                                                                    | Kyllä           |
| `check-ui-value-drift` (sisäinen)   | Uudelleen kirjoitettu englanninkielinen **arvo** ei jätä jälkeensä vanhentunutta käännöstä                                                                                                                                           | Kyllä           |
| `check-new-key-coverage` (sisäinen) | **Uusi** englanninkielinen avain on käännetty jokaisessa lokaalissa — `__MISSING__:`-merkintää ei hyväksytä                                                                                                                          | Kyllä           |
| `check-translation-ratio`           | Todellisten käännösten osuus lokaaleittain (englannin kanssa identtiset / paikkamerkinnät / puuttuvat lehdet sallittujen luettelon ulkopuolella) ei saa ylittää arvoa `config/quality/i18n-translation-baseline.json` + liikkumavara | **Ohjeellinen** |

Vaatii asetuksen `fetch-depth: 0` — arvomuutosten portti vertaa `en.json`-tiedostoa yhdistämiskantaan.

#### `check-ui-value-drift` — vanhentuneiden käännösten portti

Havaitsee sen yhden i18n-regression, jota muut portit eivät rakenteellisesti pysty näkemään: englanninkielinen arvo
kirjoitetaan uudelleen, mutta _aiemmasta_ englanninkielisestä tekstistä johdetut käännökset jäävät ennalleen, joten
muunkieliset käyttäjät lukevat edelleen vakuuttavasti muotoiltua mutta nyt virheellistä tekstiä.

Tämä päätyi oikeasti julkaisuun. `oauthModal.googleOAuthWarning` kirjoitettiin uudelleen, kun Antigravity-
kirjautumisavustaja otettiin käyttöön (#5203); **39 lokaalia 43:sta** säilytti tekstin, joka kehotti ylläpitäjiä "kopioimaan
koko URL-osoitteen ja liittämään sen alle" — työnkulku ei voi valmistua kyseisen palveluntarjoajan kanssa. Ongelma
jäi huomaamatta tapaukseen #8463 asti, koska:

- `sync-ui-keys` täydentää vain **puuttuvat** avaimet, ei koskaan **vanhentuneita**;
- `check-ui-keys-coverage` laskee avaimen _olemassaolon_, joten vanhentunut käännös lasketaan katetuksi;
- `check-translation-drift` seuraa dokumentaation `docs/i18n/<locale>/**.md`-peilejä —
  se ei koskaan lue `src/i18n/messages/*.json`-tiedostoja. Estävä työssä `docs-sync-strict` vuoden
  2026-09 uudelleensynkronoinnista alkaen: muokkaa ydindokumenttia → `npm run i18n:run -- --files=<doc>` (osiotasoinen, kevyt).

**Diff-tietoinen, ei perustasoon sidottu.** Se vertaa yhdistämiskannan `en.json`-tiedostoa
työpuuhun. Jos avaimen englanninkielinen arvo on muuttunut ja jossakin kieliversiossa
on edelleen koskematon käännös, käännös on vanhentunut. Tämä tarkoituksella **jäädyttää
aiemmin kertyneen velan** — diff ei voi paljastaa, mistä vanhasta englanninkielisestä
tekstistä pitkään käytössä ollut käännös on peräisin, joten portti arvioi vain nykyisen
muutoksen koskettamia kohtia. Vaihtoehto (avainkohtainen hajautusarvojen perustaso) vaatisi
noin 600 KB:n generoidun tiedoston, joka olisi kolme kertaa suurinta nykyistä perustasoa
suurempi ja muuttuisi jokaisessa i18n-PR:ssä.

Sen vaatimukset voi täyttää kahdella tavalla:

1. päivitä kyseiset käännökset tai
2. aseta niiden arvoksi `__MISSING__:<new english>` — suoritusympäristö näyttää tällöin
   korjatun englanninkielisen tekstin (`src/i18n/request.ts::deepMergeFallback`, #7258),
   ja avain asetetaan käännösjonoon.

Jos merkkijonon **merkitys** muuttui, suosi **avaimen nimeämistä uudelleen**: uusi avain
ei voi periä vanhentunutta käännöstä. Tätä mallia käytettiin muutoksessa #8463.

```bash
npm run i18n:check-value-drift          # tiukka (CI suorittaa tämän)
npm run i18n:check-value-drift:warn     # vain raportointi
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Päättyy tilakoodilla 0 ja tulosteella `SKIP reason=base-unresolved`, kun perusluetteloa
ei voida lukea (matala klooni ilman perusviittausta), kuten `check-openapi-breaking`.

### Työ: `i18n`

Täysi i18n-validointimatriisi (yksi työ kutakin kieliversiota kohden). Koko työ on neuvoa-antava.

| Skripti                         | Validoi                                | Estää yhdistämisen                                        |
| ------------------------------- | -------------------------------------- | --------------------------------------------------------- |
| `validate_translation.py quick` | Käännösten kattavuus kieliversioittain | **Neuvoa-antava** (`continue-on-error: true` koko työlle) |

### Työ: `pr-test-policy`

Suoritetaan vain pull requesteille.

| Skripti                | Validoi                                                                                                                                                    | Estää yhdistämisen |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| `check:pr-test-policy` | PR:t, jotka muuttavat tuotantokoodia hakemistoissa `src/`, `open-sse/`, `electron/` tai `bin/`, sisältävät uusia tai päivitettyjä testejä (kova sääntö #8) | Kyllä              |
| `check:test-masking`   | Muutetut testitiedostot eivät vähennä assert-lauseiden nettomäärää eivätkä lisää `assert.ok(true)`-tautologioita                                           | Kyllä              |
| `check:pr-evidence`    | PR:n kuvaus sisältää viittaukset muutoksen testi-/VPS-näyttöön (automatisoi kovaa sääntöä #18 etsimällä ilmauksia PR:n tekstistä — hauras, katso Backlog)  | Kyllä              |

### Työ: `test-vitest`

Suoritetaan `build`-työn jälkeen. Epäonnistuminen estää yhdistämisen.

| Testikokonaisuus | Validoi                                                                | Estää yhdistämisen                                                                                                                                          |
| ---------------- | ---------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | MCP-palvelin (110 työkalua), autoCombo, välimuisti — vitest-testiajuri | Kyllä                                                                                                                                                       |
| `test:vitest:ui` | Käyttöliittymäkomponenttien testit — vitest-testiajuri                 | **Estää yhdistämisen** — ennestään epäonnistuvat testit on nimenomaisesti suljettu pois tiedostossa `vitest.config.ts`; uudet epäonnistumiset kaatavat työn |

### Öiset työnkulut (ajastettuja, neuvoa-antavia)

Nämä suoritetaan cron-aikataulun mukaisesti (ja `workflow_dispatch`-toiminnolla), ei koskaan
PR:ille. Kaikki ovat neuvoa-antavia.

| Työnkulku              | Validoi                                                                                                                                                                                                     | Estää yhdistämisen |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| `nightly-property`     | fast-check-ominaisuustestit satunnaisella siemenluvulla ja suurella suorituskerralla                                                                                                                        | **Neuvoa-antava**  |
| `nightly-resilience`   | keon kasvun portti, häiriöiden kaaosinjektointi, k6-kuormitus-/pitkäkestoisuustestaus                                                                                                                       | **Neuvoa-antava**  |
| `nightly-llm-security` | promptfoo-injektiosuojaus (estotila) + garak-tarkistukset (ohitetaan ilman palveluntarjoajan salaisuutta)                                                                                                   | **Neuvoa-antava**  |
| `nightly-schemathesis` | OpenAPI-sopimuksen fuzz-testaus (schemathesis) elävää OmniRoute-instanssia vasten käyttäen tiedostoa `docs/openapi.yaml` — tuo esiin spesifikaatiorikkomukset / käsittelemättömät 500-virheet (vaihe 8 B.4) | **Neuvoa-antava**  |
| `nightly-mutation`     | Stryker-mutaatiotestauksen pisteet nopealta yksikkötestikaistalta — selviytyvät mutantit paljastavat heikot assert-lauseet                                                                                  | **Neuvoa-antava**  |
| `nightly-compat`       | Node-moottorin yhteensopivuusmatriisi tuetuilla `engines.node`-alueilla                                                                                                                                     | **Neuvoa-antava**  |

---

## Nopeusvaihe (2026-08-30 → v4.0 LTS): jokaista lähtötasoa väljennettiin 20 %

Omistajan päätös (2026-08-30): v4.0:n modularisointiin asti toimitusnopeus on tärkeämpää
kuin teknisen velan pitäminen ennallaan. Jokaista **numeerista** räikän lähtötasoa väljennettiin 20 %
yhdellä auditoitavalla muutoksella, ja vaihe on määritetty tiedostossa `config/quality/quality-baseline.json`:

```json
"_policy": { "phase": "velocity", "since": "2026-08-30", "until": "4.0.0",
             "relaxPct": 20, "requireTighten": false }
```

| Mikä muuttui                                                                                                                                                                                                                | Missä                                                                                                    |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| `metrics.*.value` — pienempi on parempi -määrät ×1,2, suurempi on parempi -prosentit ÷1,2 (kattavuuden alaraja pidettiin arvossa 60, `eslintErrors` pysyy arvossa 0, `eslintWarnings` 0 → 20 % jäädytetystä ohitusmäärästä) | `quality-baseline.json` (`_relax_velocity_2026_08_30`-huomautus luettelee kaikki ennen → jälkeen -arvot) |
| `count` ×1,2 / `percentage` ×1,2                                                                                                                                                                                            | `complexity-baseline.json`, `duplication-baseline.json`                                                  |
| `cap`, `testCap` sekä jokainen `frozen[*]`- / `testFrozen[*]`-rivikatto ×1,2                                                                                                                                                | `file-size-baseline.json`                                                                                |
| tiedostokohtaiset / TS-koodikohtaiset määrät ×1,2                                                                                                                                                                           | `api-typecheck-baseline.json`, `dashboard-typecheck-baseline.json`, `open-sse-typecheck-baseline.json`   |
| `THRESHOLD` 36 → 30                                                                                                                                                                                                         | `scripts/check/check-openapi-coverage.mjs`                                                               |
| `--require-tighten` muuttuu neuvoa-antavaksi, kun `_policy.requireTighten === false`                                                                                                                                        | `scripts/quality/check-quality-ratchet.mjs`                                                              |
| öinen `bank-ratchet-shrinks` keskeytetään (se kirjaisi mitatun pienenemisen talteen ja poistaisi liikkumavaran)                                                                                                             | `.github/workflows/nightly-release-green.yml`                                                            |

Sallittujen poikkeusten luettelot (`eslint-suppressions.json`, `test-masking-allowlist.json`, `test-discovery-baseline.json`,
…) **eivät** ole budjetteja, eikä niitä muutettu. Hyväksytty/hylätty-käytäntöportit (salaisuudet, SQL-säännöt,
dokumentaation ja ympäristön välinen sopimus, i18n-vastaavuus, yksikkötestit) eivät muutu — epäonnistunut testi on edelleen epäonnistunut testi.

**Työkalut**

- `npm run quality:relax-baselines -- --pct 20 --note velocity_YYYY_MM_DD [--dry-run]` — kertaluonteinen
  väljennys (`scripts/quality/relax-baselines.mjs`); kieltäytyy suorittamasta toimintoa kahdesti samalla
  huomautuksella.
- `npm run quality:headroom [-- --only deadExports,fileSize] [--json out.json --md out.md]` —
  mittaa jokaisen numeerisen portin samalla tavalla kuin CI ja tulostaa jäljellä olevan liikkumavaran porteittain
  (`scripts/quality/baseline-headroom.mjs`). Öinen `baseline-headroom`-työ julkaisee
  taulukon jatkuvasti päivitettävään tehtävään **📈 Lähtötasojen liikkumavara (nopeusvaihe)** ja lisää
  `headroom-alert`-tunnisteen, kun jokin portti on enintään 10 %:n päässä ylärajastaan tai on jo ylittänyt sen. Kyseinen tehtävä
  toimii ennakkovaroituksena: jos budjetti täyttyy muutamassa päivässä, väljennys kuluu
  muutamaan PR:ään eikä koko tiimin käyttöön — tarkista kyseisen portin `_rebaseline_*`-huomautukset.

**Uuden koodin tila (Clean-as-You-Code) — 2026-08-30 alkaen, vain PR-pikapolulla**

`pull_request`-tapahtumissa `quality.yml` välittää `--base-ref <PR:n pohjan SHA>` komennoille `check:file-size`,
`check:complexity-ratchets` ja `check:dead-code`. Tässä tilassa portti vertaa HEAD-versiota
yhdistämiskantaan **rajoittuen PR:n muuttamiin tiedostoihin** (`scripts/check/newCodeMode.mjs`:
yhdistämiskanta materialisoidaan kertakäyttöiseen `git worktree` -työpuuhun, ESLint/knip suoritetaan siinä ja HEAD-versiossa, ja
tiedostokohtaisten määrien erot lasketaan):

- **estävä** — PR lisäsi syklomaattisen tai kognitiivisen kompleksisuuden rikkomuksia tai kuolleita vientejä muuttamiinsa tiedostoihin
  (`complexityNewCode=`, `cognitiveComplexityNewCode=`, `deadExportsNewCode=` lokissa);
- **neuvoa-antava** — globaali kokonaismäärä verrattuna jäädytettyyn lähtötasoon. Peritty poikkeama ei koskaan hylkää
  viatonta PR:ää; poikkeama jäädytetään uudelleen julkaisun täsmäytyksessä, ja liikkumavaraa mittaava työ valvoo sitä.

`workflow_dispatch`-suorituksilla, release-green-tarkistuskierroksella ja öisellä liikkumavaraa mittaavalla työllä ei ole PR-pohjaa,
joten ne käyttävät edelleen absoluuttista (globaalia) vertailua. Kattavuus, duplikaatit ja tyyppikattavuus pysyvät toistaiseksi globaaleina
(niiden työkalut eivät tuota tiedostokohtaista eroa kevyesti) — ne ovat ehdokkaita samaan käsittelyyn.

**Vaiheen päättäminen versiossa v4.0 (LTS = aiempaa tiukempi, ei ”paluu normaaliin”)**

1. Puhtaan `release/v4.0.0`-haaran kärjessä: suorita dokumentointia varten `npm run quality:headroom --json` ja sitten
   `npm run quality:ratchet -- --update`, `check:file-size --update`,
   `check:complexity-ratchets --update`, `check:dead-code --update` sekä kunkin tyyppitarkistusportin
   `--update` — jokainen vertailutaso laskee mitattuun arvoon.
2. Poista `_policy` tiedostosta `quality-baseline.json` (ottaa `--require-tighten`-asetuksen ja öisen
   pankituksen uudelleen käyttöön) ja palauta `THRESHOLD = 36` (tai suurempi) tiedostossa `check-openapi-coverage.mjs`.
3. Tiukenna mitattuja arvoja pidemmälle siellä, missä modularisointi tuotti tulosta: palauta tiedostokoon `cap`-arvoksi 1000
   (tai 800), nosta kattavuuden alarajoja 5:llä ja aseta kuolleiden vientien määräksi 0 modularisoiduissa paketeissa.

## Ratchet-perustaso (`quality-baseline.json`)

Ratchet-moottori (`scripts/quality/check-quality-ratchet.mjs`) lukee tiedoston `quality-baseline.json`
ja vertaa sitä juuri kerättyyn `quality-metrics.json`-tiedostoon. Jos jokin mittari heikkenee
epsilon-arvoaan enemmän, koonti epäonnistuu.

Tällä hetkellä seurattavat mittarit:

| Mittari               | Suunta | Merkitys                               |
| --------------------- | ------ | -------------------------------------- |
| `eslintWarnings`      | `down` | ESLint-varoitusten määrä ei saa kasvaa |
| `coverage.statements` | `up`   | Lausekattavuus ei saa laskea           |
| `coverage.lines`      | `up`   | Rivikattavuus ei saa laskea            |
| `coverage.functions`  | `up`   | Funktiokattavuus ei saa laskea         |
| `coverage.branches`   | `up`   | Haarakattavuus ei saa laskea           |

Päivitä perustaso aidon parannuksen jälkeen seuraavasti:

```bash
npm run quality:ratchet -- --update
git add quality-baseline.json
```

`--update`-valitsin kirjoittaa nykyiset mitatut arvot tiedostoon `quality-baseline.json`.
Commitoi tämä tiedosto yhdessä mittaria parantaneen muutoksen kanssa. PR, joka parantaa
mittaria päivittämättä perustasoa, havaitaan `--require-tighten`-valitsimella (vaihe 6A.5,
toteutus odottaa).

### CodeQL-ratchet: päivitysväli ja manuaalinen käynnistys

`check:codeql-ratchet` lukee **repositoriotilaa, joka päivitetään ajastetusti — ei PR-kohtaisesti.**
`gh api repos/diegosouzapw/OmniRoute/code-scanning/default-setup` ilmoittaa
`state: configured`, `schedule: weekly`: kyseessä on GitHubin oletusasetuksen tarkistus, ei jokaisen
pushin yhteydessä suoritettava analyysi. Tästä seuraa, että kun hälytyksiä KORJAAVA PR on yhdistetty,
ratchet lukee edelleen vanhaa, suurempaa määrää seuraavan ajastetun tarkistuksen suorittamiseen asti —
joten se ilmoittaa regressiosta jokaisessa avoimessa PR:ssä, myös korjaavan PR:n omissa
jatkomuutoksissa, kunnes tarkistus saa tilanteen ajan tasalle.

**Manuaalinen päivitys**: `gh workflow run codeql.yml --ref release/vX.Y.Z` suorittaa
analyysin uudelleen ja julkaisee hälytykset uudelleen muutamassa minuutissa. Lue ensin
`.github/workflows/codeql.yml` — sen otsikko selittää, että se käyttää vain
`workflow_dispatch`-käynnistystä, **koska se on ristiriidassa GitHubin oletusasetuksen kanssa**
(`CodeQL analyses from advanced configurations cannot be processed when the default setup is enabled`).
`push`/`pull_request`/`schedule`-käynnistysten palauttaminen edellyttää ensin **omistajan toimenpidettä**:
Settings → Code security → CodeQL: Default → Advanced. Älä lisää `schedule:`-käynnistystä ilman tätä
vaihtoa — se tuottaa ainoastaan epäonnistuvia suorituksia.

**Tiukenna perustasoa määrän laskettua** — `node scripts/check/check-codeql-ratchet.mjs
--update` kirjoittaa uuden mitatun määrän tiedostoon `quality-baseline.json` →
`metrics.codeqlAlerts.value`, jotta ratchet ei salli huomaamatta regressiota takaisin
vanhaan ylärajaan. Käytännön esimerkki (2026-09-02/03): PR #12502 korjasi 7 todellista hälytystä
(13 → 6 mitattua avointa hälytystä); PR #12530 tiukensi jäädytettyä perustasoa arvosta 11 arvoon 6
vastaamaan mittaustulosta; jäljellä olevat 6 hälytystä hylättiin tämän jälkeen hälytyskohtaisin
perusteluin, jolloin avoimia hälytyksiä jäi 0.

**Hylkäykset ovat operaattorin päätettävissä (ehdoton sääntö #14)** — älä koskaan hylkää
CodeQL-hälytystä kirjaamatta teknistä perustelua hylkäyskommenttiin: `won't fix`, jos kyseessä
on ylemmän tason protokollavaatimus, `used in tests`, jos kyseessä on testifixture, ja
`false positive`, jos kyseessä on puhdistus, jota CodeQL ei pysty havaitsemaan
(ennakkotapaus: `docs/security/ERROR_SANITIZATION.md`).

---

## Testien uudelleenyrityskäytäntö (WS5.4, v3.8.49)

Uudelleenyritykset määritetään suorittajakohtaisesti, eivät koskaan yleisenä käytäntönä — yleinen uudelleenyritys muuttaa todelliset regressiot
näkymättömiksi satunnaisiksi häiriöiksi:

| Suorittaja               | Käytäntö                                                                                                                                                           | Miksi                                                                                                                                             |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| Playwright (e2e)         | `retries: 1` vain CI:ssä sekä `trace: on-first-retry`                                                                                                              | Selaimen/verkon ajoitus on aidosti epädeterministinen; yksi uudelleenyritys ja jäljitys tekevät satunnaisesta häiriöstä diagnosoitavan artefaktin |
| Vitest                   | EI yleistä uudelleenyritystä. Todistetusti epävakaalle testille määritetään eksplisiittinen testikohtainen uudelleenyritys (näkyy diffissä ja tarkastetaan PR:ssä) | Pitää karanteeniluettelon repossa eikä koskaan läpinäkymättömänä                                                                                  |
| node:test (yksikkötesti) | EI uudelleenyrityksiä koskaan                                                                                                                                      | Epävakaa yksikkötesti on testissä oleva virhe — korjaa se, älä vain suorita sitä uudelleen                                                        |

Tavoiteltavat SLO:t, kun epävakaustelemtria on käytössä (WS5.2/5.3): <1 %:n epävakausaste testiä kohden
(”korjaa nyt” -kynnys), ≥95 %:n läpäisyaste putkea kohden. Toimialan viitearvoja —
kalibroi ne uudelleen omien mittaustemme perusteella.

## Julkaisutason räikän poikkeama (WS5.5, v3.8.49)

Kun räikkä (tiedostokoko, monimutkaisuus, eslint-varoitukset) taantuu PUHTAAN julkaisun
kärjessä — eli yhdistämisten YHDISTELMÄ aiheutti taantuman eikä yksikään PR yksinään toista
taantumaa omassa haarassaan — korjaus kuuluu **julkaisuvastaavalle, kerran,
julkaisuhaarassa**: suosi erottamista/refaktorointia; määritä perustaso uudelleen vain dokumentoidun
perustelumerkinnän kanssa. Älä koskaan siirrä yhdistelmäpoikkeamaa osallistujan PR:ään äläkä koskaan
määritä perustasoa uudelleen PR-kohtaisesti (se piilottaa todelliset regressiot). Tee ensin ero:
toista virhe puhdasta kärkeä vasten erillisessä worktree-työpuussa, ennen kuin oletat PR:si aiheuttaneen sen.

## Räikkärajojen pienennysten tallettaminen — alaspäin suuntautuva liike (#8584)

Räikkä on vain puoliksi automaattinen, ja juuri väärältä puolelta. Ylärajan **nostaminen** on
manuaalinen JSON-muokkaus, joka kestää kymmenen sekuntia ja on nopein tapa vapauttaa virhetilassa oleva PR.
Ylärajan **laskeminen** edellyttää, että joku suorittaa komennon `--update` ja commitoi tuloksen — ja ennen kuin
`bank-ratchet-shrinks`-työ otettiin käyttöön, mikään työnkulku ei tehnyt sitä. Mitattu seuraus
(2026-07-25): 18 jäädytettyä tiedostoa oli jo uusien tiedostojen 800 rivin ylärajan tasolla tai sen alapuolella, pahin
132-kertaisesti (`src/shared/validation/schemas.ts`, 19 rivillä 2 523:n yläraja);
monimutkaisuuden yläraja nousi `1794 → 2169` noin 37 perustason uudelleenmääritysmerkinnän aikana ja laski tasan kerran
(−1); ja ”tiukenna komennolla `--update` seuraavalla kierroksella” kirjoitettiin 31 kertaa mutta toteutettiin
kerran. Yläraja, joka säilyy sen oikeuttaneen koodin jälkeen, muuttaa huomaamatta jokaisen valmiin
pilkkomisen kasvunvaraksi sille, joka muokkaa tiedostoa seuraavaksi.

`nightly-release-green.yml` → työ **`bank-ratchet-shrinks`** sulkee tämän silmukan:

|           |                                                                                                              |
| --------- | ------------------------------------------------------------------------------------------------------------ |
| Suoritus  | `schedule` (3×/päivä) + `workflow_dispatch` — tarkoituksella **ei** `push`                                   |
| Mittaus   | korkein `release/vX.Y.Z`, sama ratkaisu- ja injektiosuoja kuin `release-green`                               |
| Kirjoitus | `check:file-size --update` ja `check:complexity-ratchets --update` (molemmat rakenteeltaan vain pienentäviä) |
| Varmistus | `npm run check:ratchet-bank` (`scripts/quality/verify-ratchet-bank.mjs`)                                     |
| Toimitus  | yksi aina ajan tasalla oleva PR julkaisuhaaraa vasten — pakkopäivitetään, ei koskaan roskapostiteta          |

Tallettaminen tehdään erissä eikä jokaisen pushin yhteydessä, koska sille ei ole viivevaatimusta (8 tunnin
kuluessa talletettu pienennys riittää), kun taas yhdistämiskohtainen suoritus rakentaisi PR-haaran toistuvasti
uudelleen yhdistämiskampanjoiden aikana ja maksaisi täydestä ESLint-läpikäynnistä joka kerta. Havaitseminen tapahtuu edelleen
pushin yhteydessä (`release-green`); vain tallettaminen tehdään erissä.

### Turvallisuuden varmistin

Työ kirjoittaa perustasoihin ilman valvontaa, joten `verify-ratchet-bank.mjs` tekee
tästä hyväksyttävää. Se vertaa komennon `--update` jälkeistä puuta `HEAD`:iin ja **keskeyttää työn
ennen minkään commitin luomista** — avaamatta PR:ää — ellei jokainen muutos ole jokin seuraavista:

- numeerisen `frozen`- / `testFrozen`-merkinnän **laskeminen** tai **poistaminen**
- `complexity-baseline.json` → `count` **laskettu**
- `quality-baseline.json` → `metrics.cognitiveComplexity.value` **laskettu**

Kaikki muu epäonnistuu: luvun nostaminen, merkinnän lisääminen, `cap`/`testCap`-arvon muuttaminen tai
`_rebaseline_*`-merkinnän poistaminen/uudelleenkirjoittaminen (nämä merkinnät ovat tarkastusketju sille, miksi kukin
yläraja on olemassa, ja ne tallennetaan samaan `frozen`-objektiin kuin tiedostomerkinnät).
Botti, joka voisi nostaa ylärajaa, olisi ehdottomasti nykytilannetta huonompi. Regressiosuoja:
`tests/unit/verify-ratchet-bank.test.ts`.

Työ ei koskaan pushaa haaraan `release/*` — ihminen yhdistää PR:n, joten virheellinen mittaus
ei voi päätyä mukaan ilman tarkastusta.

## Sallittujen poikkeusten käytäntö

Jokainen tarkistus, joka ei voi epäonnistua ennestään olemassa olevien rikkomusten vuoksi, käyttää jäädytettyä sallittujen poikkeusten luetteloa
(esim. `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`). Käytäntö on:

**Korjaa juurisyy; käytä sallittujen poikkeusten luetteloa vain, kun rikkomus on ollut olemassa jo ennestään eikä sitä voida korjata samassa PR:ssä.**

Kun lisäät merkinnän sallittujen poikkeusten luetteloon:

1. Lisää kommentti, jossa perustelet poikkeuksen.
2. Viittaa seurantatehtävään (esim. `// #3498 — Vaiheen 2 ominaisuus, ei vielä toteutettu`).
3. Poista merkintä samassa PR:ssä, joka korjaa rikkomuksen — vanhentunut merkintä, joka ei enää
   ohita aktiivista rikkomusta, on itsessään virhe (6A.3:n vanhentuneiden sääntöjen valvonta
   hylkää tarkistuksen irrallisen sallittujen poikkeusten merkinnän vuoksi, kun se on toteutettu).

**Älä** lisää sallittujen poikkeusten merkintöjä vain saadaksesi testit läpäistyä nopeammin. Läpäisty tarkistus ja samalla kasvava
sallittujen poikkeusten luettelo luovat väärän käsityksen laadusta.

### Kun tarkistus epäonnistuu PR:ssäsi

1. **Lue tarkistuksen tuloste huolellisesti** — se kertoo täsmälleen, mikä tiedosto tai symboli rikkoi
   sääntöä.
2. **Korjaa rikkomus** — useimmat tarkistukset ovat deterministisiä tiedostojärjestelmän tarkistuksia, jotka läpäistään heti,
   kun koodi on oikein.
3. **Jos rikkomus on ollut olemassa jo ennestään** (eli et aiheuttanut sitä, mutta tarkistus
   kattaa sen nyt): lisää sallittujen poikkeusten merkintä, perustelukommentti ja viittaus seurantatehtävään.
4. **Jos tarkistus on räikkätyyppinen** (kattavuus, ESLint-varoitukset, duplikaatio, kompleksisuus):
   muutoksesi heikensi mittaria. Korjaa taustalla oleva ongelma tai suorita (harvoin)
   `npm run quality:ratchet -- --update`, jos muutos on tarkoituksellinen ja mittarin
   heikkeneminen hyväksyttävää — mutta dokumentoi syy PR:n kuvauksessa.
5. **Neuvoa-antavat tarkistukset** (`continue-on-error: true`) ovat informatiivisia — ne eivät estä
   yhdistämistä, mutta näkyvät CI-yhteenvedossa. Korjaa ne silti.

---

## Uuden tarkistuksen lisääminen

1. Luo `scripts/check/check-<name>.mjs` (tai `.ts`). Käytäntötarkistukset palauttavat lopetuskoodin 0/1.
   Räikkätyyppiset tarkistukset kirjoittavat mittarin tiedostoon `quality-metrics.json` komentosarjan `collect-metrics.mjs` kautta.
2. Lisää `"check:<name>": "node scripts/check/check-<name>.mjs"` tiedostoon `package.json`.
3. Kytke se tiedostossa `.github/workflows/ci.yml` asianmukaiseen työhön
   (käytäntö → `lint` tai `docs-sync-strict`; räikkä → `quality-gate`).
4. Jos sillä on sallittujen poikkeusten luettelo, käytä funktiota `reportStaleEntries()` tiedostosta
   `scripts/check/lib/allowlist.mjs`, jotta vanhentuneet merkinnät havaitaan automaattisesti.
5. Kirjoita hakemistoon `tests/unit/build/` testi, joka kattaa tarkistuksen tunnistuslogiikan.
6. Päivitä tämä asiakirja (lisää rivi asianmukaiseen työtaulukkoon).

---

## Agenttityökalut: LSP osana työnkulkua (valinnainen)

CI-tarkistusten lisäksi OmniRoute sisältää **valinnaisen** `agent-lsp`-rungon
(projektitason `.mcp.json`, vaihe 7, tehtävä 15). Luo `.mcp.json`
ja tuo TypeScript-kielipalvelin ohjelmointiagenttien saataville, jotta ne selvittävät symbolit /
diagnostiikan **ennen** koodin kirjoittamista — se täydentää `typecheck:core`-tarkistusta kääntämällä ennen väitteiden esittämistä
ja vähentää ”keksittyjen symbolien” virheitä niiden alkulähteellä. Sitä ei tarkoituksella
ladata automaattisesti (valitset ja varmennat MCP↔LSP-sillan itse); virheellinen merkintä kirjaa vain
yhteysvirheen lokiin eikä koskaan riko istuntoja.

---

## Rationalisointijono (ROI-katselmointi — vaihe 9, aalto 3)

Tämä luettelo täsmäytettiin `ci.yml`-tiedostoon 2026-06-17 (aiemmasta versiosta puuttuivat
`audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`,
`check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`,
`check:codeql-ratchet`, `check:pr-evidence`). Täsmäytetyn kokonaisuuden ROI-katselmoinnissa
tunnistettiin seuraavat rationalisointiehdokkaat. **Yhdistämiset ovat mekaanisia CI-muutoksia;
käännöt ja poistot ovat operaattorille varattuja käytäntöpäätöksiä.** Mitään alla olevista
ei ole vielä toteutettu.

**Lisäksi yllä dokumentoimatta** (neuvoa-antavia, signaaliltaan heikkoja): `docs-lint`-työ
(markdownlint + Vale, koko työllä `continue-on-error`) ja erilliset tarkistustyönkulut
`semgrep.yml` / `codeql.yml` / `scorecard.yml`. `semgrepFindings: 0` on
`quality-baseline.json`-tiedostossa, mutta sitä ei ole kytketty estävään räikkään `ci.yml`-tiedostossa — mittari
on tällä hetkellä irrallinen.

### Yhdistäminen / päällekkäisyyksien poisto (mekaaninen, pienempi riski)

Jokainen ehdokas validoitiin aktiivista porttitilaa vasten 2026-06-17 (luota, mutta varmista);
useat ”ilmeiset” yhdistämiset osoittautuivat peittävän velkaa, eivätkä ne ole **suoraan**
korvattavissa.

- **`check:docs-sync` suoritetaan kahdesti** — erillisenä `lint`-työssä ja uudelleen `check:docs-all`-tarkistuksen (`docs-sync-strict`) sekä husky-esitoimituskoukun sisällä. ✅ **VALMIS** — erillinen `lint`-kutsu poistettu.
- **CVE-tarkistus** — ❌ **EI suoraan yhdistettävissä.** `audit:deps` epäonnistuu ehdottomasti minkä tahansa vakavan/kriittisen CVE:n kohdalla; `check:vuln-ratchet` (osv) epäonnistuu vain baselineen nähden tapahtuvasta _regressiosta_ (tällä hetkellä 1 MODERATE). Semantiikka on erilainen — `audit:deps`-tarkistuksen poistaminen poistaisi ehdottoman vakavien/kriittisten haavoittuvuuksien portin. Säilytä molemmat.
- **Syklien tunnistus** — ✅ **VALMIS** (#15159 G-01/G-02). Vanha teksti kutsui `check:cycles`-tarkistusta ”vihreäksi, kuratoiduksi” portiksi ja perusteli sen säilyttämistä estävänä, koska `check:circular-deps` (dpdm) raportoi 91 sykliä. Tuo vihreä tulos oli **väärä positiivinen onnistuminen**: `check:cycles` tarkisti 5 alihakemistoa (450 tiedostoa), tunnisti vain staattiset `import|export … from` -rakenteet ja hylkäsi kaikki `@/`- ja `@omniroute/open-sse/`-määritteet, joten se ei voinut havaita dynaamisten tuontien ja aliasten muodostamia syklejä, jotka hallitsivat tietovarastoa. Korjattu: portti käy nyt läpi `src`- ja `open-sse`-hakemistot (5023 tiedostoa), kerää määritteet TypeScriptin AST:stä (joten `import("…")` lasketaan, mutta tyyppisijainnissa olevaa `typeof import("…")` -rakennetta ei) ja selvittää tsconfigin `paths`-määritykset. Se löytää **14** sykliä, ei 0:aa. Koska 14:ää jo olemassa olevaa sykliä ei voida korjata portin PR:ssä, `check:cycles` on nyt **räikkä** (`--ratchet`, yläraja `metrics.cycles.value = 14` tiedostossa `quality-baseline.json`, `direction: down`) — se estää minkä tahansa _regression_, ja määrä voi vain laskea. CI suorittaa komennon `npm run check:cycles:ratchet`. Velan vähentäminen etenee kohteen **A-01** mukana. `check:circular-deps` (dpdm) säilyy neuvoa-antavana laajempana toisena arviona.
- **Monimutkaisuus** — ✅ **VALMIS** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): yksi ESLint-läpikäynti, laskenta ruleId:n mukaan, jotta syklomaattisen monimutkaisuuden ja enimmäisrivimäärän sekä kognitiivisen monimutkaisuuden baselinet pysyvät erillisinä; yksittäiset `check:complexity` / `check:cognitive-complexity` säilyvät paikallista `--update`-käyttöä varten.
- **`/api`-hallusinaationesto** — ✅ **VALMIS** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): yksi `src/app/api`-hakemiston tiedostojärjestelmäinventaario; openapi-routes ja docs-symbols raportoivat edelleen itsenäisesti; yksittäiset tarkistukset säilyvät paikallisia suorituksia varten.
- **`check:node-runtime` suoritetaan 11 työssä** — ⚠️ **pieni ROI.** Jokainen käyttää erillistä suoritusympäristöä ja tarkistus kestää alle sekunnin; kokonaissäästö olisi noin 10 sekuntia, mutta samalla menetettäisiin edullinen työkohtainen suojaus. Ei muutostyön arvoista.
- **`typecheck:noimplicit:core` CI:n lint-tarkistuksessa** — ✅ **poistettu lint-työstä** (oli neuvoa-antava `continue-on-error`); estävä tyyppipinta muodostuu tarkistuksista `typecheck:core` + `check:type-coverage`. Paikallinen komentosarja säilytetty.

### Käännä / päätä (operaattorin käytäntö)

- `check:openapi-security-tiers` (neuvoa-antava) — ❌ **EI voida siirtää suoraan estäväksi.** Se palauttaa arvon 0, mutta varoittaa, että useilta `LOCAL_ONLY_API_PREFIXES`-määrityksen alaisilta `traffic-inspector`-reiteiltä puuttuu `x-loopback-only: true` -annotaatio. Sen pakottaminen edellyttää näiden annotaatioiden lisäämistä ensin `openapi.yaml`-tiedostoon.
- `typecheck:noimplicit:core` (neuvoa-antava) — estävä `check:type-coverage`-räikkä korvaa sen suurelta osin. Muuta räikäksi tai poista redundantti toinen `tsc`-läpikäynti.
- `test:vitest:ui` (nyt **estävä**) — jo olemassa olevat epäonnistumiset on nimenomaisesti rajattu pois `vitest.config.ts`-tiedostossa `// #8618`-seurantakommenteilla; uudet epäonnistumiset kaatavat työn.
- `check:secrets` (gitleaks, estävä räikkä lukittuna kolmeen dokumentoituun väärään positiiviseen) — lisää nämä 3 sallittujen luetteloon nollatason saavuttamiseksi tai alenna tarkistus neuvoa-antavaksi. Päällekkäinen GitHubin sisäänrakennetun salaisuuksien tarkistuksen ja `check:public-creds`-tarkistuksen kanssa.
- `check:pr-evidence` (estävä, hakee PR-kuvauksen proosasta) — suuri väärien positiivisten riski; poistaminen heikentää ehdottoman säännön nro 18 valvontaa, joten tämä on todellinen käytäntöpäätös.
- `semgrep` (neuvoa-antava erillistarkistus) — päällekkäinen CodeQL:n kanssa OWASP-perheiden osalta; kytke sen baseline räikkään tai poista.

---

## Aiheeseen liittyvä dokumentaatio

- Toimitusketju (alkuperä, SBOM, Trivy, Scorecard): [`docs/security/SUPPLY_CHAIN.md`](../security/SUPPLY_CHAIN.md)

#### `check-key-completeness` — avainjoukkojen yhtäläisyyden tarkistus

`scripts/i18n/check-key-completeness.mjs` (`npm run i18n:check-keys`, työ `i18n-ui-coverage`).
Vertaa jokaisen `src/i18n/messages/<locale>.json`-tiedoston lehtiavainten joukkoa `en.json`-tiedostoon ja epäonnistuu,
jos yksikin lehtiavain puuttuu tai on ylimääräinen riippumatta siitä, milloin avain lisättiin. `__MISSING__:`-paikkamerkit
katsotaan olemassa oleviksi (niiden sisältö kuuluu suhdelukutarkistukselle). Tämä täydentää absoluuttisesti
kahta diff-pohjaista/prosenttipohjaista tarkistusta: `check-ui-keys-coverage` vaatii jokaiselle
kielialueelle vähintään 80 %:n kattavuuden (43 puuttuvaa avainta noin 13 000:sta näyttää edelleen lukeman 99,7 %), ja `check-new-key-coverage` arvioi
vain avaimet, jotka PR lisää `en.json`-tiedostoon. Kielialue-erä luodaan sen päivän `en.json`-tiedostosta,
jona sen haara luodaan, ja käännöstyö jatkuu päiviä samalla, kun pohjahaaraan lisätään avaimia; erän PR ei itse lisää
yhtään avainta, joten kumpikaan rinnakkaistarkistus ei reagoinut, kun erä 1 (#13044) yhdistettiin siten, että yhdeksästä
kielialueesta puuttui 43 avainta, ja erästä 2 (#13660) puuttui 10 avainta kahdeksasta kielialueesta (2026-09-15). Korjaa punainen tulos komennolla
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers`; `extra`-lehtiavain
tarkoittaa, että lähteestä on poistettu kyseinen avain — poista se kielialueesta. `--warn` raportoi epäonnistumatta.
`--catalog=cli` suorittaa saman vertailun hakemistolle `bin/cli/locales` (`npm run i18n:check-keys:cli`);
molemmat vaiheet ovat työssä `i18n-ui-coverage`.

#### `check-new-key-coverage` — uusien avainten i18n-tarkistus

Tarkistuksen `check-ui-value-drift` rinnakkaistarkistus. Se havaitsee englanninkielisen arvon, joka on **kirjoitettu uudelleen**
mutta jonka käännöksiä ei ole päivitetty; tämä havaitsee englanninkielisen avaimen, joka on **lisätty**
mutta jota jotkin kielialueet eivät koskaan saaneet.

`check-ui-keys-coverage` ei pysty havaitsemaan tätä tapausta: se vaatii prosentuaalisen vähimmäiskattavuuden kielialuekohtaisesti, ja
yksitoista puuttuvaa avainta noin 13 000 avaimesta jättää kattavuudeksi 99,9 %. Kielikohtainen prosenttiluku ei pysty
ilmaisemaan, että ”tämä ominaisuus julkaistiin kääntämättömänä” — kokonainen ominaisuus voidaan lisätä uuteen kielialueeseen ilman
tekstiä lukeman muuttumatta lainkaan.

Tarkistuksen taustalla oleva häiriö: Orchestration Canvasin vaiheessa 3 sen yksitoista avainta käännettiin
kaikille tuolloin olemassa olleille 42 kielialueelle. Tunteja myöhemmin EU-kielten erä (#13044) kasvatti repositorion
51 kielialueeseen, eivätkä yhdeksän uutta tulokasta (`el`, `et`, `ga`, `hr`, `lt`, `lv`, `mt`, `sl`, `sr`) koskaan
saaneet niitä. `deepMergeFallback` korvaa puuttuvan avaimen englanninkielisellä tekstillä, joten seurauksena oli
kääntämätön eikä tyhjä käyttöliittymä — todellinen ongelma, joka jäi rakenteensa vuoksi huomaamatta.

Rinnakkaistarkistuksensa tavoin tämä on **diff-tietoinen**: se vertaa yhdistämiskannan englanninkielisiä tekstejä työpuuhun,
joten ennestään olemassa olevat puutteet pysyvät jäädytettyinä eikä tarkistuksen käyttöönotto edellyttänyt migraatiota.

**`__MISSING__:<english>`-merkintä ei täytä vaatimusta (2026-09-17 alkaen).** Aiemmin se oli
dokumentoitu lykkäyskeino — suoritusaikainen varajärjestely käyttää oikeaa englanninkielistä tekstiä — kunnes kahdeksan ominaisuus-PR:ää
lisäsi 2026-09-16 yhteensä 61 avainta ja lisäsi merkinnän kaikkiin 65 kielialueeseen kääntämisen sijasta: tämä
tarkistus hyväksyi ne kaikki, mikään ei estänyt PR:iä, ja estävä todellisten käännösten suhdelukutarkistus
epäonnistui sitten julkaisuhaaran kärjessä kaikilla (pt-BR 3,2 % > 2,5 % + 0,5). Merkintä tulkitaan nyt
puuttuvaksi käännökseksi. Korjaa punainen tulos komennolla
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers --batch-size=40`, tai
kaikki kielialueet rinnakkain komennolla `npm run i18n:translate-new-keys` (`scripts/i18n/translate-new-keys.sh`,
toimii irrotetussa tilassa, eikä suostu käynnistymään ilman `OMNIROUTE_TRANSLATION_*`-ympäristömuuttujia). Avain, jonka on pysyttävä
englanninkielisenä (kiinteä tuotteen, moottorin tai lipun nimi), kuuluu tiedostoon `scripts/i18n/untranslatable-keys.json`,
ei koskaan merkinnän taakse. `vi` kieltää merkinnät kokonaan (`tests/unit/i18n-vi-completeness.test.ts`).

#### `check-vitest-exclusions` — sivuun jätettyjen testien tarkistus

Tiedosto `vitest.config.ts`-tiedoston `exclude`-luettelossa on testi, jota ei suoriteta, vaikka se näyttää
kattavuudelta lähdekoodipuuta lukevalle. Kommentin
`// #8618 — pre-existing failure; remove this exclusion when fixed` taakse kertyi 62 tiedostoa. Ongelma #8618 suljettiin
2026-08-11 samalla, kun sen seuraama luettelo kasvoi 45 merkinnästä 62 merkintään ja jokainen uusi merkintä peri kommentin,
joka viittasi suljettuun ongelmaan. Kun luettelo lopulta mitattiin tiedosto kerrallaan (#13204), **51 tiedostoa 62:sta
läpäisi testit nykyistä lähdekoodipuuta vasten ilman lähdekoodimuutoksia**.

Tarkistus vaatii, että jokainen todelliseen tiedostoon viittaava poissulku (a) nimeää seurantaongelman ja
(b) esiintyy tiedostossa `config/quality/vitest-exclusions.json` mitatun tilansa kanssa, jotta uuden poissulun lisääminen on
tarkasteltava diff sille tarkoitetussa tiedostossa eikä vain jälleen yksi rivi 60 merkinnän taulukossa. Tarkistus ei tarkoituksella
suorita poissuljettuja testejä uudelleen — se maksaa noin 10 minuuttia ja kuuluu säännöllisesti suoritettavaan työhön;
luettelo tallentaa, milloin kukin testi mitattiin viimeksi.
