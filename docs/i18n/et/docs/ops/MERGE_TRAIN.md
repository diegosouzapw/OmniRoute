# Merge Queue & Manual Merge-Train Runbook (Eesti)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MERGE_TRAIN.md) · 🇪🇹 [am](../../../am/docs/ops/MERGE_TRAIN.md) · 🇸🇦 [ar](../../../ar/docs/ops/MERGE_TRAIN.md) · 🇦🇿 [az](../../../az/docs/ops/MERGE_TRAIN.md) · 🇧🇬 [bg](../../../bg/docs/ops/MERGE_TRAIN.md) · 🇧🇩 [bn](../../../bn/docs/ops/MERGE_TRAIN.md) · 🇧🇦 [bs](../../../bs/docs/ops/MERGE_TRAIN.md) · 🇨🇿 [cs](../../../cs/docs/ops/MERGE_TRAIN.md) · 🇩🇰 [da](../../../da/docs/ops/MERGE_TRAIN.md) · 🇩🇪 [de](../../../de/docs/ops/MERGE_TRAIN.md) · 🇬🇷 [el](../../../el/docs/ops/MERGE_TRAIN.md) · 🇪🇸 [es](../../../es/docs/ops/MERGE_TRAIN.md) · 🇮🇷 [fa](../../../fa/docs/ops/MERGE_TRAIN.md) · 🇫🇮 [fi](../../../fi/docs/ops/MERGE_TRAIN.md) · 🇫🇷 [fr](../../../fr/docs/ops/MERGE_TRAIN.md) · 🇮🇪 [ga](../../../ga/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [gu](../../../gu/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ha](../../../ha/docs/ops/MERGE_TRAIN.md) · 🇮🇱 [he](../../../he/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [hi](../../../hi/docs/ops/MERGE_TRAIN.md) · 🇭🇷 [hr](../../../hr/docs/ops/MERGE_TRAIN.md) · 🇭🇺 [hu](../../../hu/docs/ops/MERGE_TRAIN.md) · 🇦🇲 [hy](../../../hy/docs/ops/MERGE_TRAIN.md) · 🇮🇩 [id](../../../id/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ig](../../../ig/docs/ops/MERGE_TRAIN.md) · 🇮🇹 [it](../../../it/docs/ops/MERGE_TRAIN.md) · 🇯🇵 [ja](../../../ja/docs/ops/MERGE_TRAIN.md) · 🇬🇪 [ka](../../../ka/docs/ops/MERGE_TRAIN.md) · 🇰🇭 [km](../../../km/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [kn](../../../kn/docs/ops/MERGE_TRAIN.md) · 🇰🇷 [ko](../../../ko/docs/ops/MERGE_TRAIN.md) · 🇱🇹 [lt](../../../lt/docs/ops/MERGE_TRAIN.md) · 🇱🇻 [lv](../../../lv/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ml](../../../ml/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [mr](../../../mr/docs/ops/MERGE_TRAIN.md) · 🇲🇾 [ms](../../../ms/docs/ops/MERGE_TRAIN.md) · 🇲🇹 [mt](../../../mt/docs/ops/MERGE_TRAIN.md) · 🇲🇲 [my](../../../my/docs/ops/MERGE_TRAIN.md) · 🇳🇵 [ne](../../../ne/docs/ops/MERGE_TRAIN.md) · 🇳🇱 [nl](../../../nl/docs/ops/MERGE_TRAIN.md) · 🇳🇴 [no](../../../no/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [or](../../../or/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [pa](../../../pa/docs/ops/MERGE_TRAIN.md) · 🇵🇭 [phi](../../../phi/docs/ops/MERGE_TRAIN.md) · 🇵🇱 [pl](../../../pl/docs/ops/MERGE_TRAIN.md) · 🇵🇹 [pt](../../../pt/docs/ops/MERGE_TRAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MERGE_TRAIN.md) · 🇷🇴 [ro](../../../ro/docs/ops/MERGE_TRAIN.md) · 🇷🇺 [ru](../../../ru/docs/ops/MERGE_TRAIN.md) · 🇱🇰 [si](../../../si/docs/ops/MERGE_TRAIN.md) · 🇸🇰 [sk](../../../sk/docs/ops/MERGE_TRAIN.md) · 🇸🇮 [sl](../../../sl/docs/ops/MERGE_TRAIN.md) · 🇷🇸 [sr](../../../sr/docs/ops/MERGE_TRAIN.md) · 🇸🇪 [sv](../../../sv/docs/ops/MERGE_TRAIN.md) · 🇰🇪 [sw](../../../sw/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ta](../../../ta/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [te](../../../te/docs/ops/MERGE_TRAIN.md) · 🇹🇭 [th](../../../th/docs/ops/MERGE_TRAIN.md) · 🇹🇷 [tr](../../../tr/docs/ops/MERGE_TRAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MERGE_TRAIN.md) · 🇵🇰 [ur](../../../ur/docs/ops/MERGE_TRAIN.md) · 🇺🇿 [uz](../../../uz/docs/ops/MERGE_TRAIN.md) · 🇻🇳 [vi](../../../vi/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [yo](../../../yo/docs/ops/MERGE_TRAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MERGE_TRAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MERGE_TRAIN.md)

---

Alates versioonist v3.8.49 (kvaliteedi/kiiruse plaani WS3.2/WS3.4) on üle vaadatud
PR-ide harusse `release/vX.Y.Z` liitmise vaikimisi tee **Mergify liitmisjärjekord** (`.mergify.yml`);
allpool dokumenteeritud **käsitsi liitmisrong** on VARUVARIANT — seda kasutatakse intsidentide,
väljalaske külmutamise ajal või juhul, kui Mergify avatud lähtekoodiga pakett peaks kunagi muutuma.

## Vaikimisi tee: Mergify järjekord

1. Kampaaniad on PR-i üle vaadanud / roheliseks tunnistanud ning omanik on selle liitmiseelse ⭐
   kontrollvärava kaudu heaks kiitnud (aruanne + iga üksuse otsus — vt `/merge-prs` samm 0.75).
2. Omanik (või omaniku otsuse alusel tegutsev seanss) lisab sildi **`queue`**.
   Silt ON liitmise heakskiit; Mergify üksnes teostab selle.
3. Mergify rühmitab kuni 10 järjekorras olevat PR-i, valideerib rühma kiirkontrollide suhtes
   ja liidab (squash). Punane rühm **poolitatakse automaatselt** — probleemi põhjustav PR
   eraldatakse ligikaudu log2(N) kordusvalideerimisega ja eemaldatakse järjekorrast; ülejäänud jätkavad.
4. Pärast liitmist valideerib pidev väljalaske rohelisuse töövoog push'i järel uue tipu
   ja avab regressiooni tekitanud kombinatsiooni korral omistamisprobleemi (automaatset tagasivõtmist ei tehta kunagi).

Kaitsepiirded (vastavad faili `CLAUDE.md` rangetele reeglitele nr 21/22):

- **Väljalaske külmutamine on aktiivne** → ÄRGE lisage silti külmutatud harule suunatud PR-idele;
  suunake need esmalt ümber aktiivsesse harusse `release/vX+1`.
- **Teise seansi töös olev PR** → ärge kunagi lisage sellele silti; ainult omanikseanss paneb
  oma töö järjekorda.
- Ainult teste sisaldavad diff'id ja sildiga `hotfix` PR-id läbivad juba vähendatud CI (vt
  `RELEASE_CHECKLIST.md` → kiirparanduste kiirrada); järjekorra tingimused aktsepteerivad tegelikult
  käitatud kontrollide komplekti (`#check-failure=0` + `#check-pending=0`).

## Varuvariant: käsitsi liitmisrong

Kasutatakse siis, kui järjekord pole saadaval. See formaliseerib tava, millega tühjendati v3.8.47
tsükli jooksul ühe päevaga 33 PR-i:

1. **Koostage rühm** (~10–30 üle vaadatud ja heaks kiidetud PR-i). Kontrollige `linked:` kokkupõrkeid
   (sama `tap.testFiles`, samad CHANGELOG-i jaotised) ja töödelge need järjestikku.
2. **Valideerige ÜKS KORD**: liitke väljalaske tipust loodud isoleeritud worktree's kõik rühma
   harutipud lokaalselt ning käivitage seejärel väljalaskega samaväärne komplekt
   (`npm run check:release-green`, lisage enne väljalaset `--with-build`).
   `scripts/release/merge-train.sh <base> <PR#>…` automatiseerib sammud 1–2 (konfliktidega
   PR-id eemaldatakse, rong jätkab). Täisrežiim käivitab `npm run test:unit` — masinale
   häälestatud käitaja (`--test-concurrency=20`), **mitte** kaks järjestikust 4-tuumalist CI
   fragmenti, mille tõttu kasutas domineeriv etapp 16-tuumalisest masinast ainult ~25% (parandatud
   2026-07-18). `--fast` (päevasisesed megatrongi tühjendamised, omaniku heaks kiidetud 2026-07-18)
   säilitab kõik staatilised kontrollväravad + vitest'i, kuid käitab ainult pardale võetud PR-ide
   muudetud node:test-faile; TÄIELIK komplekt tuleb kogunenud tipul siiski käitada vähemalt kord
   päevas (üks rong ilma suvandita `--fast`).
3. **Roheline** → liitke PR-id järjest (kontrollides enne igaüht uuesti `state,headRefOid` —
   muutunud harutipuga PR läheb uuesti ülevaatusjärjekorda). Tõendage, et iga liitmise netodiff
   sisaldab ainult vastava PR-i enda muudatust (automaatse konfliktide lahendamise põhjustatud
   tagasivõtmisi ei tohi olla: kontrollige käsuga `git diff --stat`, ega pole ulatusest välja jäävaid
   kustutusi).
4. **Punane** → poolitage rühm (valideerige kumbki pool), selle asemel et valideerida PR-e
   ükshaaval uuesti; saatke probleemi põhjustav PR koos tõenditega tagasi ülevaatusjärjekorda.
5. **Mitte kunagi**: ärge liitke külmutamise ajal külmutatud harusse; ärge kasutage kusagil
   käsku `git stash`; ärge taaskäivitage kogu CI-d lootuses, et punane tulemus kaob
   (reegel: punane tulemus on teave).

## Tasemed (miks järjekord on turvaline üksnes kiirkontrollidega)

- **PR-i kohta** (quality.yml kiirkontrollid): TIA mõjutatud testid + täielik 4-fragmendiline
  üksustestimine + vitest + lintimise komplekt + tüübikontroll + dokumentatsiooni/muudatuste logi terviklus.
- **Rühma/tipu kohta** (pidev väljalaske rohelisus): `--quick` RANGED kontrollväravad igal push'il
  väljalaskeharusse; täielikud `--with-build --full-ci` läbimised 3× päevas.
- **Väljalaske kohta** (ci.yml väljalaske-PR-is): täielik maatriks, sh E2E ×9,
  paketi artefakt + tarball'i käivitamise suitsutest, katvus/lävendid.

Midagi ei valideerita varasemast vähem — mahukas testipind käivitatakse lihtsalt rühma/tipu,
mitte iga PR-i kohta, ning just see eemaldab O(N) edasi-tagasi tsüklid.
