# Release-Green: keeping the queue and release branch green (Suomi)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_GREEN.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_GREEN.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_GREEN.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_GREEN.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_GREEN.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_GREEN.md) · 🇧🇦 [bs](../../../bs/docs/ops/RELEASE_GREEN.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_GREEN.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_GREEN.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_GREEN.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_GREEN.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_GREEN.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_GREEN.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_GREEN.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_GREEN.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_GREEN.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_GREEN.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_GREEN.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_GREEN.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_GREEN.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_GREEN.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_GREEN.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_GREEN.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_GREEN.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_GREEN.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_GREEN.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_GREEN.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_GREEN.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_GREEN.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_GREEN.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_GREEN.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_GREEN.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_GREEN.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_GREEN.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_GREEN.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_GREEN.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_GREEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_GREEN.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_GREEN.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_GREEN.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_GREEN.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_GREEN.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_GREEN.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_GREEN.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_GREEN.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_GREEN.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_GREEN.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_GREEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_GREEN.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_GREEN.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_GREEN.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_GREEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_GREEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_GREEN.md)

---

## Tämän ratkaisema ongelma

**Täysi portti** (`.github/workflows/ci.yml` — yksikkötestien osiot, vitest, ratchet-tarkistukset,
`package-artifact`, SonarQube, E2E) suoritetaan **vain julkaisu-PR:ssä** (PR → `main`). Kohteeseen
`release/**` osoittavat PR:t saavat **nopeat portit** (`quality.yml`: TIA:n vaikutuspiirissä olevat testit + tyyppitarkistus + lint)
ja koodimuutoksille lisäksi **neuvoa-antavan** tuotantokäännöksen. Seurauksena vain julkaisussa ilmeneviä punaisia tiloja voi
kertyä huomaamatta julkaisuhaaraan ja ne voivat **räjähtää esiin noin 40 minuutin kerroksina** julkaisuhetkellä,
yksi kerrallaan.

"release-green-perhe" on olemassa näiden punaisten tilojen **ennakoimiseksi** — täyttä porttia vastaavat
tarkistukset voidaan suorittaa **paikallisesti / julkaisun ulkopuolella** milloin tahansa, jotta julkaisu-PR on
vihreä jo ensimmäisellä CI-ajollaan.

> **Periaate, josta ei tingitä:** mikään tästä ei estä kehittäjän työtä. Emme lisää pakollista
> tarkistusta, jonka epäonnistuminen hylkäisi hänen PR:nsä. **Poikkeama** (ratchet-tarkistukset) on ylläpitäjän uudelleenbaselinoitava julkaisun yhteydessä —
> se ei ole koskaan kehittäjän huolenaihe. Mikään osa ei **sulje** PR:ää (kunnian anastaminen) eikä
> **heikennä** testiä läpipääsyn saavuttamiseksi.

## Perhe (4 osaa) — ja kuinka kukin suoritetaan itsenäisesti

| Osa                                                                        | Mikä se on                                                                      | Milloin suoritetaan                                                                      | Laajuus                        |
| -------------------------------------------------------------------------- | ------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ------------------------------ |
| **`/green-prs`** (ratkaisu A)                                              | Ylläpitäjän pyynnöstä käynnistämä **avoimien PR:ien jonon** tarkistus           | **Itsenäisesti, säännöllisesti** — ja erityisesti **ennen** komentoa `/generate-release` | Koko PR-jono → `release/**`    |
| **`/validate-release-green`** (ratkaisu C — `npm run check:release-green`) | Validointimoottori: toistaa täyden portin haaraa TAI yhdistämisehdokasta vasten | Itsenäisesti milloin tahansa                                                             | Tietty haara tai yhdistämis-PR |
| **`/babysit <PR#>`**                                                       | Ohjaa **yhden** PR:n **reaaliaikaista CI:tä**, kunnes se on vihreä              | Itsenäisesti, PR-kohtaisesti                                                             | Yksi PR                        |
| **`nightly-release-green.yml`** (ratkaisu D)                               | Automaattinen öinen työnkulku; avaa ongelmaraportin HARD-punaisesta tilasta     | Automaattisesti (cron)                                                                   | Aktiivinen julkaisuhaara       |

**Lyhyt vastaus kysymykseen "onko tämä tarkoitettu vain julkaisuihin?":** **ei.** `/green-prs` suunniteltiin
suoritettavaksi **säännöllisesti julkaisujen välillä**. Sen itsenäinen suorittaminen on normaali käyttötapa — julkaisu on vain
hetki, jolloin sen suorittamisesta saadaan eniten hyötyä.

## PR:stä julkaisuun -neuvoa-antava koontiversio

`quality.yml` sisältää nyt `Build (advisory)` -vaiheen ei-luonnostilassa oleville koodi-PR:ille ja Mergifyn jonossa oleville haaroille.
Se vastaa `ci.yml`-tiedoston tuotantokoontireseptiä: Node 24, `npm-ci-retry`,
`check:node-runtime` ja `npm run build` asetuksella `OMNIROUTE_USE_TURBOPACK=1`. Se ei tarkoituksella
lataa koontiartefaktia, koska mikään tämän työnkulun myöhempi laatutyö ei käytä sellaista.
Poista `continue-on-error` viikon vakaiden julkaisu-PR-ajojen jälkeen, jotta signaalista tulee
estävä PR:stä julkaisuun -portti.

## Ratkaisu C — `npm run check:release-green` (moottori)

Toistaa julkaisua vastaavan validoinnin nykyiselle työpuulle ja luokittelee jokaisen punaisen tuloksen:

- **HARD** (tyyppitarkistus, lint-virheet, yksikkötestit, vitest, db-rules, public-creds, valinnainen
  `package-artifact`) → **todellinen virhe**; `exit 1`. Korjataan lähdehaarassa (TDD, sääntö #18).
- **DRIFT** (eslint-**varoitukset**, kognitiivinen kompleksisuus, tiedostokoko) → syklin aikana kertynyt
  raja-arvojen siirtymä, **ei osallistujan syytä**; siitä vain raportoidaan, ja **ylläpitäjä määrittää
  lähtötason uudelleen julkaisun yhteydessä**. DRIFT **ei koskaan** muuta poistumiskoodia — joten se ei koskaan estä ketään.

```bash
npm run check:release-green                 # nykyinen haara (työpuu)
node scripts/quality/validate-release-green.mjs --json   # rakenteinen tuloste
node scripts/quality/validate-release-green.mjs --quick  # ohittaa yksikkötestit ja vitestin (vain siirtymä, tyyppitarkistus ja lint)
node scripts/quality/validate-release-green.mjs --with-build  # sisältää package-artifact-vaiheen (hidas)
```

Vain diagnosoi ja **raportoi** (ei automaattisia korjauksia). Vihreäksi korjaamisen orkestrointi sijaitsee
komennoissa `/green-prs` ja `/review-prs`.

## Ratkaisu A — `/green-prs` (jonon tarkistus)

Menettely (yhteenveto — katso lisätiedot `green-prs`-taidosta):

1. **Kartoita** aktiiviseen julkaisuhaaraan kohdistuvien avoimien PR:ien jono.
2. **Luokittele** jokainen PR (toteuttamiskelpoinen / hylkäyksen arvoinen / vaatii tekijän toimia) — hylkäyksen arvoiset ja
   tekijän toimia vaativat **raportoidaan, ei suljeta** (tekijä päättää).
3. Tuo jokainen toteuttamiskelpoinen PR **eristetyssä työpuussa** (sääntö #19) julkaisuhaaran kärkeen ja suorita
   `npm run check:release-green`:
   - **HARD** → korjaa **osallistujan haarassa** yhteistekijyyttä käyttäen (säilyttää tekijän Merged-tilan),
     suorita uudelleen, kunnes kaikki HARD-tulokset on poistettu.
   - **DRIFT** → jätä ennalleen; lähtötaso määritetään uudelleen julkaisun yhteydessä.
4. **Raportoi** taulukko PR × (päätös, HARD-tulokset, korjattu?, DRIFT, release-green nyt?).

Voi **valmistella** jonon yhdistämättä mitään; yhdistää vain nimenomaisesta pyynnöstä — eikä koskaan sulje PR:ää.

## Suositeltu suoritusrytmi

- Suorita **`/green-prs` säännöllisesti** (esim. viikoittain) ja **aina ennen
  `/generate-release`-komentoa**.
- Säilytä **`nightly-release-green.yml`** (ratkaisu D) jatkuvana signaalina: kun se avaa
  HARD-virheestä ongelman, on aika tarkistaa jono.
- Käytä **`/validate-release-green`-komentoa** tarvittaessa haaran tai tietyn yhdistämisehdokkaan tarkistamiseen.
- Käytä **`/babysit <PR#>`-komentoa**, kun tietty PR täytyy saattaa vihreäksi reaaliaikaisessa CI:ssä.

## Suhde julkaisuun

- `/generate-release` kutsuu validointia **vaiheessa 0 (ennakkotarkistus)**: se määrittää DRIFT-lähtötason uudelleen ja korjaa
  HARD-virheet ennen julkaisu-PR:n avaamista.
- `/review-prs` käyttää release-green-porttia yhdistämispäätöksen yhteydessä (vihreä ennen yhdistämistä).

Kaikkien osien tavoite on sama: **vihreä julkaisu-PR ensimmäisellä CI-ajolla** sen sijaan, että
julkaisupäivänä edettäisiin 40 minuutin kerroksissa punaisesta tuloksesta toiseen.
