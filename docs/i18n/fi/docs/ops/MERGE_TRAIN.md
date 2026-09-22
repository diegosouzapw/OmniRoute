# Merge Queue & Manual Merge-Train Runbook (Suomi)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MERGE_TRAIN.md) · 🇪🇹 [am](../../../am/docs/ops/MERGE_TRAIN.md) · 🇸🇦 [ar](../../../ar/docs/ops/MERGE_TRAIN.md) · 🇦🇿 [az](../../../az/docs/ops/MERGE_TRAIN.md) · 🇧🇬 [bg](../../../bg/docs/ops/MERGE_TRAIN.md) · 🇧🇩 [bn](../../../bn/docs/ops/MERGE_TRAIN.md) · 🇨🇿 [cs](../../../cs/docs/ops/MERGE_TRAIN.md) · 🇩🇰 [da](../../../da/docs/ops/MERGE_TRAIN.md) · 🇩🇪 [de](../../../de/docs/ops/MERGE_TRAIN.md) · 🇬🇷 [el](../../../el/docs/ops/MERGE_TRAIN.md) · 🇪🇸 [es](../../../es/docs/ops/MERGE_TRAIN.md) · 🇪🇪 [et](../../../et/docs/ops/MERGE_TRAIN.md) · 🇮🇷 [fa](../../../fa/docs/ops/MERGE_TRAIN.md) · 🇫🇷 [fr](../../../fr/docs/ops/MERGE_TRAIN.md) · 🇮🇪 [ga](../../../ga/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [gu](../../../gu/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ha](../../../ha/docs/ops/MERGE_TRAIN.md) · 🇮🇱 [he](../../../he/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [hi](../../../hi/docs/ops/MERGE_TRAIN.md) · 🇭🇷 [hr](../../../hr/docs/ops/MERGE_TRAIN.md) · 🇭🇺 [hu](../../../hu/docs/ops/MERGE_TRAIN.md) · 🇦🇲 [hy](../../../hy/docs/ops/MERGE_TRAIN.md) · 🇮🇩 [id](../../../id/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ig](../../../ig/docs/ops/MERGE_TRAIN.md) · 🇮🇹 [it](../../../it/docs/ops/MERGE_TRAIN.md) · 🇯🇵 [ja](../../../ja/docs/ops/MERGE_TRAIN.md) · 🇬🇪 [ka](../../../ka/docs/ops/MERGE_TRAIN.md) · 🇰🇭 [km](../../../km/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [kn](../../../kn/docs/ops/MERGE_TRAIN.md) · 🇰🇷 [ko](../../../ko/docs/ops/MERGE_TRAIN.md) · 🇱🇹 [lt](../../../lt/docs/ops/MERGE_TRAIN.md) · 🇱🇻 [lv](../../../lv/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ml](../../../ml/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [mr](../../../mr/docs/ops/MERGE_TRAIN.md) · 🇲🇾 [ms](../../../ms/docs/ops/MERGE_TRAIN.md) · 🇲🇹 [mt](../../../mt/docs/ops/MERGE_TRAIN.md) · 🇲🇲 [my](../../../my/docs/ops/MERGE_TRAIN.md) · 🇳🇵 [ne](../../../ne/docs/ops/MERGE_TRAIN.md) · 🇳🇱 [nl](../../../nl/docs/ops/MERGE_TRAIN.md) · 🇳🇴 [no](../../../no/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [or](../../../or/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [pa](../../../pa/docs/ops/MERGE_TRAIN.md) · 🇵🇭 [phi](../../../phi/docs/ops/MERGE_TRAIN.md) · 🇵🇱 [pl](../../../pl/docs/ops/MERGE_TRAIN.md) · 🇵🇹 [pt](../../../pt/docs/ops/MERGE_TRAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MERGE_TRAIN.md) · 🇷🇴 [ro](../../../ro/docs/ops/MERGE_TRAIN.md) · 🇷🇺 [ru](../../../ru/docs/ops/MERGE_TRAIN.md) · 🇱🇰 [si](../../../si/docs/ops/MERGE_TRAIN.md) · 🇸🇰 [sk](../../../sk/docs/ops/MERGE_TRAIN.md) · 🇸🇮 [sl](../../../sl/docs/ops/MERGE_TRAIN.md) · 🇷🇸 [sr](../../../sr/docs/ops/MERGE_TRAIN.md) · 🇸🇪 [sv](../../../sv/docs/ops/MERGE_TRAIN.md) · 🇰🇪 [sw](../../../sw/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ta](../../../ta/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [te](../../../te/docs/ops/MERGE_TRAIN.md) · 🇹🇭 [th](../../../th/docs/ops/MERGE_TRAIN.md) · 🇹🇷 [tr](../../../tr/docs/ops/MERGE_TRAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MERGE_TRAIN.md) · 🇵🇰 [ur](../../../ur/docs/ops/MERGE_TRAIN.md) · 🇺🇿 [uz](../../../uz/docs/ops/MERGE_TRAIN.md) · 🇻🇳 [vi](../../../vi/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [yo](../../../yo/docs/ops/MERGE_TRAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MERGE_TRAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MERGE_TRAIN.md)

---

Versiosta v3.8.49 lähtien (laatu-/nopeussuunnitelman WS3.2/WS3.4) arvioitujen PR:ien oletusyhdistämispolku haaraan
`release/vX.Y.Z` on **Mergifyn yhdistämisjono** (`.mergify.yml`);
alla dokumentoitu **manuaalinen yhdistämisjuna** on VARAJÄRJESTELY — sitä käytetään häiriötilanteissa,
julkaisujäädytysten aikana tai jos Mergifyn Open Source -sopimus joskus muuttuu.

## Oletuspolku: Mergify-jono

1. Kampanjat ovat arvioineet PR:n ja antaneet sille vihreän tuloksen, ja omistajan yhdistämistä edeltävä ⭐
   portti on hyväksynyt sen (raportti + kohdekohtainen päätös — katso `/merge-prs`-prosessin vaihe 0.75).
2. Omistaja (tai omistajan päätöksen perusteella toimiva istunto) lisää **`queue`**-tunnisteen.
   Tunniste ON yhdistämishyväksyntä; Mergify vain toteuttaa sen.
3. Mergify kokoaa enintään 10 jonossa olevaa PR:ää eräksi, validoi erän nopeita portteja vasten
   ja yhdistää sen (squash). Punainen erä **puolitetaan automaattisesti** — ongelmallinen PR
   eristetään noin log2(N) uudelleenvalidoinnilla ja poistetaan jonosta; muut jatkavat.
4. Yhdistämisen jälkeen jatkuva release-green-työnkulku validoi uuden kärjen push-tapahtuman yhteydessä
   ja avaa kohdistustiketin, jos yhdistelmä aiheutti regression (ei koskaan automaattista palautusta).

Suojakaiteet (vastaavat tiedoston `CLAUDE.md` tiukkoja sääntöjä #21/#22):

- **Julkaisujäädytys on käynnissä** → ÄLÄ lisää tunnisteita jäädytettyyn haaraan kohdistuviin PR:iin; kohdista ne
  ensin uudelleen aktiiviseen `release/vX+1`-haaraan.
- **Toisen istunnon käsittelyssä oleva PR** → älä koskaan lisää siihen tunnistetta; vain omistava istunto lisää
  oman työnsä jonoon.
- Vain testejä sisältävät muutokset ja `hotfix`-tunnisteella merkityt PR:t suorittavat jo supistetun CI:n (katso
  `RELEASE_CHECKLIST.md` → Hotfix Fast-Lane); jonon ehdot hyväksyvät sen tarkistusjoukon, joka
  tosiasiassa suoritettiin (`#check-failure=0` + `#check-pending=0`).

## Varajärjestely: manuaalinen yhdistämisjuna

Käytetään, kun jono ei ole saatavilla. Tämä määrittelee käytännön, jolla v3.8.47-jakson aikana
käsiteltiin 33 PR:ää yhdessä päivässä:

1. **Kokoa erä** (noin 10–30 arvioitua ja hyväksyttyä PR:ää). Tarkista `linked:`-törmäykset
   (samat `tap.testFiles`-arvot, samat CHANGELOG-osiot) ja käsittele ne peräkkäin.
2. **Validoi KERRAN**: yhdistä erän kaikki kärjet paikallisesti erillisessä, julkaisuhaaran kärjestä
   luodussa worktreessä ja suorita sitten julkaisua vastaava testikokonaisuus
   (`npm run check:release-green`, lisää `--with-build` ennen julkaisua).
   `scripts/release/merge-train.sh <base> <PR#>…` automatisoi vaiheet 1–2 (ristiriitaiset
   PR:t poistetaan, juna jatkaa). Täysi tila suorittaa komennon `npm run test:unit` — palvelimelle
   optimoidulla suorittimella (`--test-concurrency=20`), **ei** kahdella peräkkäisellä 4 ytimen CI-
   osuudella, joiden vuoksi hallitseva vaihe käytti vain noin 25 % 16 ytimen palvelimesta (korjattu
   2026-07-18). `--fast` (saman päivän suurten junien tyhjennykset, omistajan hyväksymä 2026-07-18)
   säilyttää kaikki staattiset portit + vitestin, mutta suorittaa vain junaan otettujen PR:ien
   muuttamat node:test-tiedostot; TÄYSI testikokonaisuus on silti suoritettava vähintään kerran
   päivässä kertyneelle kärjelle (yksi juna ilman `--fast`-valitsinta).
3. **Vihreä** → yhdistä PR:t järjestyksessä (tarkista `state,headRefOid` uudelleen ennen jokaista —
   PR, jonka kärki on muuttunut, palaa arviointiin). Todista, että kunkin yhdistämisen nettomuutos
   vastaa PR:n omaa muutosta (ei automaattisen ratkaisun aiheuttamia palautuksia: tarkista
   `git diff --stat` soveltamisalan ulkopuolisten poistojen varalta).
4. **Punainen** → puolita erä (validoi kumpikin puolikas) sen sijaan, että validoisit PR:t
   uudelleen yksitellen; palauta ongelmallinen PR todisteineen arviointijonoon.
5. **Älä koskaan**: yhdistä jäädytyksen aikana jäädytettyyn haaraan; käytä `git stash`-komentoa missään;
   käynnistä CI:tä summittaisesti uudelleen siinä toivossa, että punainen tulos katoaa (sääntö: punainen tulos on tietoa).

## Tasot (miksi jono on turvallinen pelkillä nopeilla porteilla)

- **PR-kohtaisesti** (quality.yml-nopeat portit): TIA:n vaikutuspiirissä olevat testit + täydet yksikkötestit 4 osassa +
  vitest + lint-kokonaisuus + tyyppitarkistus + dokumentaation/muutoslokin eheys.
- **Erä-/kärkikohtaisesti** (jatkuva release-green): `--quick`-tilan PAKOLLISET portit jokaisella push-tapahtumalla
  julkaisuhaaraan; täydet `--with-build --full-ci`-läpikäynnit 3× päivässä.
- **Julkaisukohtaisesti** (ci.yml julkaisu-PR:ssä): täydellinen matriisi, mukaan lukien E2E ×9,
  pakettiartefakti + tarball-käynnistyksen savutesti sekä kattavuus/ratchet-tarkistukset.

Mitään ei validoida aiempaa vähemmän — raskas kokonaisuus vain suoritetaan erä-/kärkikohtaisesti
PR-kohtaisen suorittamisen sijaan, mikä poistaa O(N)-edestakaiset kierrokset.
