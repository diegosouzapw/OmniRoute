# Merge Queue & Manual Merge-Train Runbook (Suomi)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MERGE_TRAIN.md) · 🇪🇹 [am](../../../am/docs/ops/MERGE_TRAIN.md) · 🇸🇦 [ar](../../../ar/docs/ops/MERGE_TRAIN.md) · 🇦🇿 [az](../../../az/docs/ops/MERGE_TRAIN.md) · 🇧🇬 [bg](../../../bg/docs/ops/MERGE_TRAIN.md) · 🇧🇩 [bn](../../../bn/docs/ops/MERGE_TRAIN.md) · 🇧🇦 [bs](../../../bs/docs/ops/MERGE_TRAIN.md) · 🇨🇿 [cs](../../../cs/docs/ops/MERGE_TRAIN.md) · 🇩🇰 [da](../../../da/docs/ops/MERGE_TRAIN.md) · 🇩🇪 [de](../../../de/docs/ops/MERGE_TRAIN.md) · 🇬🇷 [el](../../../el/docs/ops/MERGE_TRAIN.md) · 🇪🇸 [es](../../../es/docs/ops/MERGE_TRAIN.md) · 🇪🇪 [et](../../../et/docs/ops/MERGE_TRAIN.md) · 🇮🇷 [fa](../../../fa/docs/ops/MERGE_TRAIN.md) · 🇫🇷 [fr](../../../fr/docs/ops/MERGE_TRAIN.md) · 🇮🇪 [ga](../../../ga/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [gu](../../../gu/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ha](../../../ha/docs/ops/MERGE_TRAIN.md) · 🇮🇱 [he](../../../he/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [hi](../../../hi/docs/ops/MERGE_TRAIN.md) · 🇭🇷 [hr](../../../hr/docs/ops/MERGE_TRAIN.md) · 🇭🇺 [hu](../../../hu/docs/ops/MERGE_TRAIN.md) · 🇦🇲 [hy](../../../hy/docs/ops/MERGE_TRAIN.md) · 🇮🇩 [id](../../../id/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ig](../../../ig/docs/ops/MERGE_TRAIN.md) · 🇮🇹 [it](../../../it/docs/ops/MERGE_TRAIN.md) · 🇯🇵 [ja](../../../ja/docs/ops/MERGE_TRAIN.md) · 🇬🇪 [ka](../../../ka/docs/ops/MERGE_TRAIN.md) · 🇰🇭 [km](../../../km/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [kn](../../../kn/docs/ops/MERGE_TRAIN.md) · 🇰🇷 [ko](../../../ko/docs/ops/MERGE_TRAIN.md) · 🇱🇹 [lt](../../../lt/docs/ops/MERGE_TRAIN.md) · 🇱🇻 [lv](../../../lv/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ml](../../../ml/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [mr](../../../mr/docs/ops/MERGE_TRAIN.md) · 🇲🇾 [ms](../../../ms/docs/ops/MERGE_TRAIN.md) · 🇲🇹 [mt](../../../mt/docs/ops/MERGE_TRAIN.md) · 🇲🇲 [my](../../../my/docs/ops/MERGE_TRAIN.md) · 🇳🇵 [ne](../../../ne/docs/ops/MERGE_TRAIN.md) · 🇳🇱 [nl](../../../nl/docs/ops/MERGE_TRAIN.md) · 🇳🇴 [no](../../../no/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [or](../../../or/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [pa](../../../pa/docs/ops/MERGE_TRAIN.md) · 🇵🇭 [phi](../../../phi/docs/ops/MERGE_TRAIN.md) · 🇵🇱 [pl](../../../pl/docs/ops/MERGE_TRAIN.md) · 🇵🇹 [pt](../../../pt/docs/ops/MERGE_TRAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MERGE_TRAIN.md) · 🇷🇴 [ro](../../../ro/docs/ops/MERGE_TRAIN.md) · 🇷🇺 [ru](../../../ru/docs/ops/MERGE_TRAIN.md) · 🇱🇰 [si](../../../si/docs/ops/MERGE_TRAIN.md) · 🇸🇰 [sk](../../../sk/docs/ops/MERGE_TRAIN.md) · 🇸🇮 [sl](../../../sl/docs/ops/MERGE_TRAIN.md) · 🇷🇸 [sr](../../../sr/docs/ops/MERGE_TRAIN.md) · 🇸🇪 [sv](../../../sv/docs/ops/MERGE_TRAIN.md) · 🇰🇪 [sw](../../../sw/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ta](../../../ta/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [te](../../../te/docs/ops/MERGE_TRAIN.md) · 🇹🇭 [th](../../../th/docs/ops/MERGE_TRAIN.md) · 🇹🇷 [tr](../../../tr/docs/ops/MERGE_TRAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MERGE_TRAIN.md) · 🇵🇰 [ur](../../../ur/docs/ops/MERGE_TRAIN.md) · 🇺🇿 [uz](../../../uz/docs/ops/MERGE_TRAIN.md) · 🇻🇳 [vi](../../../vi/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [yo](../../../yo/docs/ops/MERGE_TRAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MERGE_TRAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MERGE_TRAIN.md)

---

Versiosta v3.8.49 lähtien (laatu-/nopeussuunnitelman WS3.2/WS3.4) katselmoitujen PR:ien oletusyhdistämispolku haaraan `release/vX.Y.Z` on **Mergifyn yhdistämisjono** (`.mergify.yml`);
alla kuvattu **manuaalinen yhdistämisjuna** on VARAJÄRJESTELY — sitä käytetään häiriötilanteissa,
julkaisujäädytysten aikana tai jos Mergifyn Open Source -paketti joskus muuttuu.

## Oletuspolku: Mergify-jono

1. Kampanjat tarkastavat PR:n ja varmistavat sen vihreän tilan, minkä jälkeen omistajan yhdistämistä edeltävä ⭐
   portti hyväksyy sen (raportti + kohdekohtainen päätös — katso `/merge-prs`, vaihe 0.75).
2. Omistaja (tai omistajan päätöksen perusteella toimiva istunto) lisää **`queue`**-tunnisteen.
   Tunniste ON yhdistämishyväksyntä; Mergify vain toteuttaa sen.
3. Mergify validoi jonossa olevat PR:t **sarjallisesti** (yhden kerrallaan) nopeita portteja
   vasten ja yhdistää ne (squash). Eräkäsittely ja automaattinen puolitus edellyttävät maksullista
   Mergify-tasoa ("Cannot use Merge Queue batch" ilmaisversiossa, #7220), joten `.mergify.yml`
   ei määritä `batch_size`-asetusta; eräkäsittely jää alla olevan manuaalisen yhdistämisjunan
   tehtäväksi. PR poistetaan jonosta sen sijaan, että se pysäyttäisi jonon, jos sen tarkistukset
   ovat yhä kesken `checks_timeout`-ajan jälkeen (240 min = 2× tiedoston `quality.yml`
   mitattu p95).
4. Yhdistämisen jälkeen jatkuva julkaisun vihreän tilan työnkulku validoi uuden kärjen pushin
   yhteydessä ja avaa attribuutiongelman, jos yhdistelmä aiheutti regression (ei koskaan
   automaattista palautusta).

Suojakaiteet (vastaavat tiedoston `CLAUDE.md` ehdottomia sääntöjä #21/#22):

- **Julkaisujäädytys on voimassa** → ÄLÄ lisää tunnisteita jäädytettyyn haaraan kohdistuviin
  PR:iin; kohdista ne ensin uudelleen aktiiviseen `release/vX+1`-haaraan.
- **Toisen istunnon käsittelyssä oleva PR** → älä koskaan lisää siihen tunnistetta; vain
  omistava istunto asettaa oman työnsä jonoon.
- Vain testejä sisältävät muutokset ja `hotfix`-tunnisteella merkityt PR:t suorittavat jo
  supistetun CI:n (katso `RELEASE_CHECKLIST.md` → Hotfix Fast-Lane); jonon ehdot hyväksyvät
  minkä tahansa tosiasiassa suoritetun tarkistusjoukon (`#check-failure=0` +
  `#check-pending=0`).

## Varajärjestely: manuaalinen yhdistämisjuna

Käytetään, kun jono ei ole käytettävissä. Tämä vakiinnuttaa käytännön, jolla käsiteltiin 33 PR:ää
yhdessä päivässä v3.8.47-jakson aikana:

1. **Kokoa erä** (noin 10–30 katselmoitua ja hyväksyttyä PR:ää). Tarkista `linked:`-ristiriidat
   (samat `tap.testFiles`-tiedostot, samat CHANGELOG-osiot) ja käsittele ne peräkkäin.
2. **Validoi KERRAN**: yhdistä eristettyyn, julkaisuhaaran kärjestä luotuun worktreehen kaikki erän
   kärkiversiot paikallisesti ja suorita sitten julkaisua vastaava testikokonaisuus
   (`npm run check:release-green`; lisää `--with-build` ennen julkaisua).
   `scripts/release/merge-train.sh <base> <PR#>…` automatisoi vaiheet 1–2 (ristiriitaiset
   PR:t poistetaan ja juna jatkaa). Täysi tila suorittaa komennon `npm run test:unit` — palvelimelle
   viritetyn suorittimen (`--test-concurrency=20`), **ei** kahta peräkkäistä 4 ytimen CI-osuutta,
   joiden vuoksi hallitseva vaihe käytti vain noin 25 % 16 ytimen palvelimesta (korjattu
   2026-07-18). `--fast` (päivänsisäiset suurten junien purut, omistajan hyväksymä 2026-07-18)
   säilyttää kaikki staattiset tarkistusportit + vitestin mutta suorittaa vain junaan otettujen
   PR:ien muuttamat node:test-tiedostot; TÄYSI testikokonaisuus on silti suoritettava vähintään
   kerran päivässä kertyneelle kärjelle (yksi juna ilman `--fast`-valitsinta).
3. **Vihreä** → yhdistä PR:t järjestyksessä (tarkista `state,headRefOid` uudelleen ennen jokaista —
   PR, jonka kärki on siirtynyt, palaa katselmointiin). Osoita, että kunkin yhdistämisen nettomuutos on
   PR:n oma muutos (ei automaattisen ristiriidanratkaisun aiheuttamia palautuksia: tarkasta
   `git diff --stat` laajuuden ulkopuolisten poistojen varalta).
4. **Punainen** → puolita erä (validoi kumpikin puolikas) sen sijaan, että validoisit PR:t
   yksitellen uudelleen; palauta ongelmallinen PR todisteineen katselmointijonoon.
5. **Älä koskaan**: yhdistä jäädytyksen aikana jäädytettyyn haaraan; käytä `git stash`-komentoa missään;
   suorita CI:tä summittaisesti uudelleen siinä toivossa, että punainen katoaa (sääntö: punainen on tietoa).

## Tasot (miksi jono on turvallinen pelkillä nopeilla tarkistusporteilla)

- **PR-kohtaisesti** (quality.yml:n nopeat tarkistusportit): TIA:n vaikutuspiiriin kuuluvat testit + täydet
  yksikkötestit 4 osassa + vitest + lint-kokonaisuus + tyyppitarkistus + dokumentaation/CHANGELOGin eheys.
- **Erä-/kärkikohtaisesti** (jatkuva julkaisun vihreys): `--quick`-tilan PAKOLLISET tarkistusportit jokaisella pushilla
  julkaisuhaaraan; täydet `--with-build --full-ci`-ajot 3× päivässä.
- **Julkaisukohtaisesti** (ci.yml julkaisu-PR:ssä): täydellinen matriisi, mukaan lukien E2E ×9,
  pakettiartefakti + tarballin käynnistyksen savutesti, kattavuus/rajoittimet.

Mitään ei validoida aiempaa vähemmän — raskas kokonaisuus vain suoritetaan erä-/kärkikohtaisesti
PR-kohtaisen suorittamisen sijaan, mikä poistaa O(N)-edestakaiskierrokset.

## `merge-train.sh`-komentosarjan puhtaan checkoutin edellytykset

Komentosarja suorittaa juuricheckoutissa nopeasti keskeytyvän **ennakkotarkistuksen** (ennen mitään worktree-
toimintoja), jotta rikkinäinen asennus ei koskaan voi näyttäytyä punaisena junana:

1. Suorita `npm ci` ja sitten `bun`-jälkiasennus, jonka npm estää:
   `(cd node_modules/bun && node install.js)` — muuten `check:provider-consistency`
   ja `check:known-symbols` (molemmat `bun scripts/…`) epäonnistuvat SEKÄ junassa ETTÄ pohjassa
   ilman rikkomusriviä.
2. Ylimääräistä `node_modules/node_modules`-hakemistoa ei saa olla (päällekkäinen riippuvuuspuu; React latautuu
   kahdesti ja käyttöliittymän vitest-testikokonaisuudet epäonnistuvat välittömästi).
3. Tiedoston `node_modules/.bin/tsc` on oltava olemassa ja suoritettavissa (osittaisesta asennuksesta se puuttuu).

Juna suorittaa estävän komennon `npm run check:cycles:ratchet`; pelkkä `npm run check:cycles`
on neuvoa-antava (se luettelee SCC:t ja päättyy ei-nollakoodilla myös terveen pohjan tapauksessa).
