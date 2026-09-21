# Release-Green: keeping the queue and release branch green (Eesti)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_GREEN.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_GREEN.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_GREEN.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_GREEN.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_GREEN.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_GREEN.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_GREEN.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_GREEN.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_GREEN.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_GREEN.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_GREEN.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_GREEN.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_GREEN.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_GREEN.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_GREEN.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_GREEN.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_GREEN.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_GREEN.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_GREEN.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_GREEN.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_GREEN.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_GREEN.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_GREEN.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_GREEN.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_GREEN.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_GREEN.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_GREEN.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_GREEN.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_GREEN.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_GREEN.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_GREEN.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_GREEN.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_GREEN.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_GREEN.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_GREEN.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_GREEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_GREEN.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_GREEN.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_GREEN.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_GREEN.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_GREEN.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_GREEN.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_GREEN.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_GREEN.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_GREEN.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_GREEN.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_GREEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_GREEN.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_GREEN.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_GREEN.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_GREEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_GREEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_GREEN.md)

---

## Probleem, mille see lahendab

**Täielik kontrollvärav** (`.github/workflows/ci.yml` — ühiktestide jaotised, vitest, ratchet’id,
`package-artifact`, SonarQube, E2E) käivitub **ainult väljalaske PR-il** (PR → `main`). PR-id, mille sihtharu on
`release/**`, läbivad **kiirkontrollid** (`quality.yml`: TIA mõjutatud testid + tüübikontroll + lint)
ning koodimuudatuste korral **soovitusliku** tootmisjärgu koostamise. Tagajärg: ainult väljalaskel ilmnevad vead võivad
väljalaskeharus märkamatult kuhjuda ja **väljalaske ajal ükshaaval ~40-minutiliste kihtidena plahvatada**.

„Release-green family” on loodud nende vigade **ennetamiseks** — täieliku kontrollväravaga samaväärne valideerimine
**lokaalselt / väljaspool väljalaset** ja igal ajal, et väljalaske PR oleks juba
esimesel CI-käivitusel roheline.

> **Mittekaubeldav põhimõte:** miski sellest ei blokeeri panustajat. Me ei lisa kohustuslikku
> kontrolli, mille ebaõnnestumine nurjaks tema PR-i. **Nihe** (ratchet’id) on hooldaja jaoks, et määrata väljalaskel uus lähtetase —
> see pole kunagi panustaja mure. Ükski osa ei **sulge** PR-i (panuse omastamine) ega
> **nõrgenda** testi läbimise nimel.

## Perekond (4 osa) — ja kuidas iga osa töötab iseseisvalt

| Osa                                                                        | Mis see on                                                                               | Millal käivitada                                                             | Ulatus                               |
| -------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ------------------------------------ |
| **`/green-prs`** (lahendus A)                                              | Hooldaja nõudmisel käivitatav **avatud PR-ide järjekorra** kontroll                      | **Iseseisvalt ja perioodiliselt** — eriti **enne** käsku `/generate-release` | Kogu PR-ide järjekord → `release/**` |
| **`/validate-release-green`** (lahendus C — `npm run check:release-green`) | Valideerimismootor: kordab täielikku kontrollväravat haru VÕI ühendamiskandidaadi suhtes | Iseseisvalt, igal ajal                                                       | Konkreetne haru või ühendamis-PR     |
| **`/babysit <PR#>`**                                                       | Viib **ühe** PR-i **reaalajas CI** rohelisse olekusse                                    | Iseseisvalt, iga PR-i kohta                                                  | Üks PR                               |
| **`nightly-release-green.yml`** (lahendus D)                               | Automaatne igaöine töövoog; avab TÕSISE vea korral probleemi                             | Automaatselt (cron)                                                          | Aktiivne väljalaskeharu              |

**Lühivastus küsimusele „kas see on ainult väljalasete jaoks?”:** **ei.** `/green-prs` on loodud
käivitamiseks **perioodiliselt, väljalasete vahel**. Iseseisev käivitamine on tavapärane kasutusviis — väljalase on lihtsalt
hetk, mil selle käivitamine annab kõige rohkem väärtust.

## PR-ist väljalaskeni nõuandev koostamine

`quality.yml` sisaldab nüüd mittedraft-olekus koodi-PR-ide ja Mergify järjekorraharude jaoks sammu `Build (advisory)`.
See järgib faili `ci.yml` tootmiskoostamise retsepti: Node 24, `npm-ci-retry`,
`check:node-runtime` ja `npm run build` koos muutujaga `OMNIROUTE_USE_TURBOPACK=1`. Koosteartefakti
tahtlikult üles ei laadita, sest ükski selle töövoo järgnev kvaliteeditöö seda ei kasuta.
Eemaldage `continue-on-error` pärast üht nädalat stabiilseid väljalaske-PR-ide käitusi, et signaalist saaks
blokeeriv PR-ist väljalaskeni kontrollvärav.

## Lahendus C — `npm run check:release-green` (mootor)

Taastekitab väljalaskega samaväärse valideerimise praeguse tööpuu suhtes ja liigitab iga ebaõnnestumise:

- **HARD** (tüübikontroll, lintimisvead, ühiktestid, vitest, db-rules, public-creds, valikuline
  `package-artifact`) → **tegelik viga**; `exit 1`. Parandatakse lähteharus (TDD, reegel #18).
- **DRIFT** (eslint-i **hoiatused**, kognitiivne keerukus, faili suurus) → tsükli jooksul kuhjunud lävendinihe,
  **mitte panustaja süü**; sellest ainult teatatakse ja **hooldaja määrab väljalaskel
  uue lähtetaseme**. DRIFT **ei muuda kunagi** väljumiskoodi — seega ei blokeeri see kunagi kedagi.

```bash
npm run check:release-green                 # praegune haru (tööpuu)
node scripts/quality/validate-release-green.mjs --json   # struktureeritud väljund
node scripts/quality/validate-release-green.mjs --quick  # jätab ühiktestid ja vitest-i vahele (ainult lävendinihe+tüübikontroll+lintimine)
node scripts/quality/validate-release-green.mjs --with-build  # hõlmab package-artifact-i (aeglane)
```

Ainult diagnoosib ja **raporteerib** (automaatparandusi ei tehta). Roheliseks parandamise orkestreerimine asub
käskudes `/green-prs` ja `/review-prs`.

## Lahendus A — `/green-prs` (järjekorra skannimine)

Protseduur (kokkuvõte — üksikasju vaadake `green-prs` oskusest):

1. Koostage aktiivse väljalaskeharu suhtes avatud PR-ide järjekorra **ülevaade**.
2. **Triaažige** iga PR (sobiv / tagasilükkamist vääriv / vajab autorit) — tagasilükkamist väärivatest ja autorit vajavatest
   PR-idest **teatatakse, neid ei suleta** (otsustab autor).
3. Iga sobiva PR-i puhul viige PR **isoleeritud tööpuus** (reegel #19) väljalaskeharu tipuga vastavusse ja käivitage
   `npm run check:release-green`:
   - **HARD** → parandage **panustaja harus** kaasautorluse kaudu (säilitab autori oleku „Merged”),
     seejärel käivitage uuesti, kuni kõik HARD-id on kõrvaldatud.
   - **DRIFT** → jätke see alles; väljalaskel määratakse uus lähtetase.
4. **Esitage** tabel PR × (otsus, HARD-i ebaõnnestumised, parandatud?, DRIFT, kas nüüd väljalaskeks roheline?).

Saab järjekorda **ette valmistada** ilma mestimata; mestib ainult selgesõnalise taotluse korral — ega sulge kunagi PR-i.

## Soovitatav sagedus

- Käivitage **`/green-prs` regulaarselt** (nt kord nädalas) ja **alati enne
  `/generate-release` käivitamist**.
- Hoidke **`nightly-release-green.yml`** (lahendus D) pideva signaalina: kui see avab
  HARD-i ebaõnnestumise probleemi, on aeg skannimiseks.
- Kasutage käsku **`/validate-release-green`** vajaduspõhiselt haru või konkreetse mestimiskandidaadi kontrollimiseks.
- Kasutage käsku **`/babysit <PR#>`**, kui konkreetne PR tuleb aktiivses CI-s roheliseks saada.

## Seos väljalaskega

- `/generate-release` kutsub valideerimise välja **0. etapis (eelkontroll)**: määrab DRIFT-ile uue lähtetaseme ja parandab
  HARD-i ebaõnnestumised enne väljalaske-PR-i avamist.
- `/review-prs` kasutab mestimisotsuse etapis väljalaske rohelisuse kontrollväravat (roheline enne mestimist).

Kõigi osade eesmärk on sama: **roheline väljalaske-PR juba esimesel CI-käivitusel**, selle asemel et
väljalaskepäeval 40-minutiliste kihtide kaupa ebaõnnestumisi läbi töötada.
