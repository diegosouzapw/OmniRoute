# Merge Queue & Manual Merge-Train Runbook (Eesti)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MERGE_TRAIN.md) · 🇪🇹 [am](../../../am/docs/ops/MERGE_TRAIN.md) · 🇸🇦 [ar](../../../ar/docs/ops/MERGE_TRAIN.md) · 🇦🇿 [az](../../../az/docs/ops/MERGE_TRAIN.md) · 🇧🇬 [bg](../../../bg/docs/ops/MERGE_TRAIN.md) · 🇧🇩 [bn](../../../bn/docs/ops/MERGE_TRAIN.md) · 🇧🇦 [bs](../../../bs/docs/ops/MERGE_TRAIN.md) · 🇨🇿 [cs](../../../cs/docs/ops/MERGE_TRAIN.md) · 🇩🇰 [da](../../../da/docs/ops/MERGE_TRAIN.md) · 🇩🇪 [de](../../../de/docs/ops/MERGE_TRAIN.md) · 🇬🇷 [el](../../../el/docs/ops/MERGE_TRAIN.md) · 🇪🇸 [es](../../../es/docs/ops/MERGE_TRAIN.md) · 🇮🇷 [fa](../../../fa/docs/ops/MERGE_TRAIN.md) · 🇫🇮 [fi](../../../fi/docs/ops/MERGE_TRAIN.md) · 🇫🇷 [fr](../../../fr/docs/ops/MERGE_TRAIN.md) · 🇮🇪 [ga](../../../ga/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [gu](../../../gu/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ha](../../../ha/docs/ops/MERGE_TRAIN.md) · 🇮🇱 [he](../../../he/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [hi](../../../hi/docs/ops/MERGE_TRAIN.md) · 🇭🇷 [hr](../../../hr/docs/ops/MERGE_TRAIN.md) · 🇭🇺 [hu](../../../hu/docs/ops/MERGE_TRAIN.md) · 🇦🇲 [hy](../../../hy/docs/ops/MERGE_TRAIN.md) · 🇮🇩 [id](../../../id/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ig](../../../ig/docs/ops/MERGE_TRAIN.md) · 🇮🇹 [it](../../../it/docs/ops/MERGE_TRAIN.md) · 🇯🇵 [ja](../../../ja/docs/ops/MERGE_TRAIN.md) · 🇬🇪 [ka](../../../ka/docs/ops/MERGE_TRAIN.md) · 🇰🇭 [km](../../../km/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [kn](../../../kn/docs/ops/MERGE_TRAIN.md) · 🇰🇷 [ko](../../../ko/docs/ops/MERGE_TRAIN.md) · 🇱🇹 [lt](../../../lt/docs/ops/MERGE_TRAIN.md) · 🇱🇻 [lv](../../../lv/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ml](../../../ml/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [mr](../../../mr/docs/ops/MERGE_TRAIN.md) · 🇲🇾 [ms](../../../ms/docs/ops/MERGE_TRAIN.md) · 🇲🇹 [mt](../../../mt/docs/ops/MERGE_TRAIN.md) · 🇲🇲 [my](../../../my/docs/ops/MERGE_TRAIN.md) · 🇳🇵 [ne](../../../ne/docs/ops/MERGE_TRAIN.md) · 🇳🇱 [nl](../../../nl/docs/ops/MERGE_TRAIN.md) · 🇳🇴 [no](../../../no/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [or](../../../or/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [pa](../../../pa/docs/ops/MERGE_TRAIN.md) · 🇵🇭 [phi](../../../phi/docs/ops/MERGE_TRAIN.md) · 🇵🇱 [pl](../../../pl/docs/ops/MERGE_TRAIN.md) · 🇵🇹 [pt](../../../pt/docs/ops/MERGE_TRAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MERGE_TRAIN.md) · 🇷🇴 [ro](../../../ro/docs/ops/MERGE_TRAIN.md) · 🇷🇺 [ru](../../../ru/docs/ops/MERGE_TRAIN.md) · 🇱🇰 [si](../../../si/docs/ops/MERGE_TRAIN.md) · 🇸🇰 [sk](../../../sk/docs/ops/MERGE_TRAIN.md) · 🇸🇮 [sl](../../../sl/docs/ops/MERGE_TRAIN.md) · 🇷🇸 [sr](../../../sr/docs/ops/MERGE_TRAIN.md) · 🇸🇪 [sv](../../../sv/docs/ops/MERGE_TRAIN.md) · 🇰🇪 [sw](../../../sw/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ta](../../../ta/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [te](../../../te/docs/ops/MERGE_TRAIN.md) · 🇹🇭 [th](../../../th/docs/ops/MERGE_TRAIN.md) · 🇹🇷 [tr](../../../tr/docs/ops/MERGE_TRAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MERGE_TRAIN.md) · 🇵🇰 [ur](../../../ur/docs/ops/MERGE_TRAIN.md) · 🇺🇿 [uz](../../../uz/docs/ops/MERGE_TRAIN.md) · 🇻🇳 [vi](../../../vi/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [yo](../../../yo/docs/ops/MERGE_TRAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MERGE_TRAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MERGE_TRAIN.md)

---

Alates versioonist v3.8.49 (kvaliteedi-/kiirusplaani WS3.2/WS3.4) on üle vaadatud PR-ide harusse `release/vX.Y.Z` liitmise vaikimisi tee **Mergify liitmisjärjekord** (`.mergify.yml`);
allpool dokumenteeritud **käsitsi hallatav liitmisrong** on VARULAHENDUS — seda kasutatakse intsidentide ja väljalaske külmutamise ajal või juhul, kui Mergify avatud lähtekoodiga projektide pakett peaks kunagi muutuma.

## Vaiketee: Mergify järjekord

1. PR vaadatakse kampaaniate käigus üle / märgitakse roheliseks ning kinnitatakse omaniku liitmiseelse ⭐
   kontrollvärava kaudu (aruanne + iga üksuse otsus — vt `/merge-prs` samm 0.75).
2. Omanik (või omaniku otsuse alusel tegutsev seanss) lisab sildi **`queue`**.
   Silt ON liitmiskinnitus; Mergify üksnes teostab selle.
3. Mergify valideerib järjekorras olevad PR-id **järjestikku** (ükshaaval) kiirkontrollide
   suhtes ja liidab need (squash). Pakettidena töötlemine + automaatne poolitamine kuulub
   Mergify tasulisse paketti („Cannot use Merge Queue batch“ tasuta paketis, #7220),
   mistõttu `.mergify.yml` ei määra väärtust `batch_size`; pakettidena töötlemine jääb
   allpool kirjeldatud käsitsi hallatava liitmisrongi ülesandeks. PR eemaldatakse järjekorrast,
   kui selle kontrollid on pärast `checks_timeout` väärtuse täitumist endiselt ootel
   (240 min = `quality.yml` mõõdetud p95 kahekordne väärtus), selle asemel et järjekord
   seisma panna.
4. Pärast liitmist valideerib pidev väljalaske rohelisuse töövoog saatmisel uue tipu
   ja avab kombinatsiooni regressiooni korral omistamisprobleemi (automaatset tagasivõtmist
   ei tehta kunagi).

Kaitsepiirded (vastavad faili `CLAUDE.md` rangetele reeglitele #21/#22):

- **Väljalaske külmutamine on aktiivne** → ÄRGE lisage silte PR-idele, mille sihiks on
  külmutatud haru; suunake need esmalt ümber aktiivsele harule `release/vX+1`.
- **Teise seansi töös olev PR** → ärge kunagi lisage sellele silti; ainult omanikseanss
  lisab oma töö järjekorda.
- Ainult teste sisaldavad muudatused ja sildiga `hotfix` PR-id kasutavad juba vähendatud
  CI-d (vt `RELEASE_CHECKLIST.md` → kiirparanduste kiirrada); järjekorra tingimused
  aktsepteerivad tegelikult käivitatud kontrollikomplekti (`#check-failure=0` +
  `#check-pending=0`).

## Varulahendus: käsitsi hallatav liitmisrong

Kasutatakse siis, kui järjekord pole saadaval. See vormistab praktika, millega tühjendati v3.8.47
tsükli ajal ühe päevaga 33 PR-i:

1. **Koosta rühm** (~10–30 üle vaadatud ja heaks kiidetud PR-i). Kontrolli `linked:` kokkupõrkeid
   (samad `tap.testFiles`, samad CHANGELOG-i lõigud) ja töötle need järjestikku.
2. **Valideeri ÜKS KORD**: loo väljalaskeharu tipust eraldatud worktree, liida kõik rühma
   harutipud lokaalselt ning seejärel käivita väljalaskega samaväärne testikogum
   (`npm run check:release-green`; enne väljalaset lisa `--with-build`).
   `scripts/release/merge-train.sh <base> <PR#>…` automatiseerib sammud 1–2 (konfliktsed
   PR-id heidetakse välja ja rong jätkab). Täisrežiim käivitab `npm run test:unit` — masinale
   häälestatud käitaja (`--test-concurrency=20`), **mitte** kaks järjestikust 4-tuumalist CI
   killustikku, mille tõttu kasutas domineeriv etapp 16-tuumalisest masinast ainult ~25% (parandatud
   2026-07-18). `--fast` (päevasiseste hiigelrongide tühjendamiseks, omaniku heaks kiidetud 2026-07-18)
   säilitab kõik staatilised kontrollväravad + vitest, kuid käivitab ainult pardale võetud PR-ide
   muudetud node:test failid; TÄIS testikogum tuleb kuhjunud tipu peal siiski vähemalt kord päevas
   käivitada (üks rong ilma liputa `--fast`).
3. **Roheline** → liida PR-id järjestikku (kontrollides enne igaüht uuesti väärtusi `state,headRefOid` —
   PR, mille harutipp on liikunud, läheb uuesti ülevaatusele). Tõesta, et iga liitmise netomuutus on
   PR-i enda muudatus (automaatse lahendamisega tagasipööramisi ei tehta: kontrolli käsuga `git diff --stat`
   ulatusest väljapoole jäävaid kustutamisi).
4. **Punane** → poolita rühm (valideeri kumbki pool), selle asemel et iga PR-i ükshaaval uuesti valideerida;
   vii probleemi põhjustav PR koos tõenditega tagasi ülevaatusjärjekorda.
5. **Ära kunagi**: liida külmutamise ajal külmutatud harusse; kasuta kus tahes käsku `git stash`;
   käivita CI-d pimesi uuesti lootuses, et punane tulemus kaob (reegel: punane tulemus on informatsioon).

## Tasemed (miks järjekord on turvaline ainult kiirete kontrollväravatega)

- **PR-i kohta** (quality.yml kiired kontrollväravad): TIA mõjutatud testid + täielik 4 killustikuga ühiktestimine +
  vitest + lintimise kogum + tüübikontroll + dokumentatsiooni/CHANGELOG-i terviklus.
- **Rühma/tipu kohta** (pidev väljalaske rohelisus): `--quick` RANGED kontrollväravad iga push'i korral
  väljalaskeharusse; täielikud `--with-build --full-ci` läbimised 3× päevas.
- **Väljalaske kohta** (ci.yml väljalaske-PR-is): täielik maatriks, sh E2E ×9,
  paketiartefakt + tarball'i käivitumise kiirtest, katvus/piirajad.

Midagi ei valideerita varasemast vähem — mahukas osa käivitatakse lihtsalt rühma/tipu,
mitte iga PR-i kohta, mis kõrvaldab O(N) edasi-tagasi tsüklid.

## `merge-train.sh` eeldused värske checkout'i korral

Skript käivitab juur-checkout'is kiirelt katkestava **eelkontrolli** (enne mis tahes worktree
toiminguid), et katkine paigaldus ei saaks kunagi näida punase rongina:

1. Käivita `npm ci`, seejärel `bun`-i postinstall, mille npm blokeerib:
   `(cd node_modules/bun && node install.js)` — vastasel juhul ebaõnnestuvad `check:provider-consistency`
   ja `check:known-symbols` (mõlemad `bun scripts/…`) nii rongil KUI ka baasil ilma
   rikkumise reata.
2. Ei tohi olla kõrvalist kataloogi `node_modules/node_modules` (duplikaatne sõltuvuspuu; React laaditakse kaks korda
   ja kasutajaliidese vitest-testikogumid ebaõnnestuvad kohe).
3. `node_modules/.bin/tsc` peab olemas olema ja olema käivitatav (osalisest paigaldusest see puudub).

Rong käivitab blokeeriva käsu `npm run check:cycles:ratchet`; paljas `npm run check:cycles`
on informatiivne (see loetleb SCC-d ja lõpetab nullist erineva väljumiskoodiga isegi terve baasi korral).
