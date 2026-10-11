# Merge Queue & Manual Merge-Train Runbook (Bosanski)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MERGE_TRAIN.md) · 🇪🇹 [am](../../../am/docs/ops/MERGE_TRAIN.md) · 🇸🇦 [ar](../../../ar/docs/ops/MERGE_TRAIN.md) · 🇦🇿 [az](../../../az/docs/ops/MERGE_TRAIN.md) · 🇧🇬 [bg](../../../bg/docs/ops/MERGE_TRAIN.md) · 🇧🇩 [bn](../../../bn/docs/ops/MERGE_TRAIN.md) · 🇨🇿 [cs](../../../cs/docs/ops/MERGE_TRAIN.md) · 🇩🇰 [da](../../../da/docs/ops/MERGE_TRAIN.md) · 🇩🇪 [de](../../../de/docs/ops/MERGE_TRAIN.md) · 🇬🇷 [el](../../../el/docs/ops/MERGE_TRAIN.md) · 🇪🇸 [es](../../../es/docs/ops/MERGE_TRAIN.md) · 🇪🇪 [et](../../../et/docs/ops/MERGE_TRAIN.md) · 🇮🇷 [fa](../../../fa/docs/ops/MERGE_TRAIN.md) · 🇫🇮 [fi](../../../fi/docs/ops/MERGE_TRAIN.md) · 🇫🇷 [fr](../../../fr/docs/ops/MERGE_TRAIN.md) · 🇮🇪 [ga](../../../ga/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [gu](../../../gu/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ha](../../../ha/docs/ops/MERGE_TRAIN.md) · 🇮🇱 [he](../../../he/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [hi](../../../hi/docs/ops/MERGE_TRAIN.md) · 🇭🇷 [hr](../../../hr/docs/ops/MERGE_TRAIN.md) · 🇭🇺 [hu](../../../hu/docs/ops/MERGE_TRAIN.md) · 🇦🇲 [hy](../../../hy/docs/ops/MERGE_TRAIN.md) · 🇮🇩 [id](../../../id/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ig](../../../ig/docs/ops/MERGE_TRAIN.md) · 🇮🇹 [it](../../../it/docs/ops/MERGE_TRAIN.md) · 🇯🇵 [ja](../../../ja/docs/ops/MERGE_TRAIN.md) · 🇬🇪 [ka](../../../ka/docs/ops/MERGE_TRAIN.md) · 🇰🇭 [km](../../../km/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [kn](../../../kn/docs/ops/MERGE_TRAIN.md) · 🇰🇷 [ko](../../../ko/docs/ops/MERGE_TRAIN.md) · 🇱🇹 [lt](../../../lt/docs/ops/MERGE_TRAIN.md) · 🇱🇻 [lv](../../../lv/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ml](../../../ml/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [mr](../../../mr/docs/ops/MERGE_TRAIN.md) · 🇲🇾 [ms](../../../ms/docs/ops/MERGE_TRAIN.md) · 🇲🇹 [mt](../../../mt/docs/ops/MERGE_TRAIN.md) · 🇲🇲 [my](../../../my/docs/ops/MERGE_TRAIN.md) · 🇳🇵 [ne](../../../ne/docs/ops/MERGE_TRAIN.md) · 🇳🇱 [nl](../../../nl/docs/ops/MERGE_TRAIN.md) · 🇳🇴 [no](../../../no/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [or](../../../or/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [pa](../../../pa/docs/ops/MERGE_TRAIN.md) · 🇵🇭 [phi](../../../phi/docs/ops/MERGE_TRAIN.md) · 🇵🇱 [pl](../../../pl/docs/ops/MERGE_TRAIN.md) · 🇵🇹 [pt](../../../pt/docs/ops/MERGE_TRAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MERGE_TRAIN.md) · 🇷🇴 [ro](../../../ro/docs/ops/MERGE_TRAIN.md) · 🇷🇺 [ru](../../../ru/docs/ops/MERGE_TRAIN.md) · 🇱🇰 [si](../../../si/docs/ops/MERGE_TRAIN.md) · 🇸🇰 [sk](../../../sk/docs/ops/MERGE_TRAIN.md) · 🇸🇮 [sl](../../../sl/docs/ops/MERGE_TRAIN.md) · 🇷🇸 [sr](../../../sr/docs/ops/MERGE_TRAIN.md) · 🇸🇪 [sv](../../../sv/docs/ops/MERGE_TRAIN.md) · 🇰🇪 [sw](../../../sw/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ta](../../../ta/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [te](../../../te/docs/ops/MERGE_TRAIN.md) · 🇹🇭 [th](../../../th/docs/ops/MERGE_TRAIN.md) · 🇹🇷 [tr](../../../tr/docs/ops/MERGE_TRAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MERGE_TRAIN.md) · 🇵🇰 [ur](../../../ur/docs/ops/MERGE_TRAIN.md) · 🇺🇿 [uz](../../../uz/docs/ops/MERGE_TRAIN.md) · 🇻🇳 [vi](../../../vi/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [yo](../../../yo/docs/ops/MERGE_TRAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MERGE_TRAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MERGE_TRAIN.md)

---

Od v3.8.49 (WS3.2/WS3.4 plana kvaliteta/brzine), zadani put spajanja
pregledanih PR-ova u `release/vX.Y.Z` jeste **Mergify red za spajanje** (`.mergify.yml`);
**ručni voz za spajanje** dokumentovan u nastavku predstavlja REZERVNU OPCIJU — koristi se tokom incidenata,
zamrzavanja izdanja ili ako se Mergify Open Source plan ikada promijeni.

## Zadana putanja: Mergify red čekanja

1. PR je pregledan/odobren kroz kampanje i odobren putem vlasnikove ⭐ kontrolne tačke prije spajanja
   (izvještaj + odluka za svaku stavku — pogledajte `/merge-prs`, korak 0.75).
2. Vlasnik (ili sesija koja postupa prema vlasnikovoj odluci) dodjeljuje oznaku **`queue`**.
   Oznaka JESTE odobrenje za spajanje; Mergify ga samo izvršava.
3. Mergify provjerava PR-ove u redu čekanja **serijski** (jedan po jedan) prema brzim kontrolnim tačkama
   i spaja ih (squash). Grupiranje + automatska bisekcija dio su Mergify pretplatničkog paketa
   ("Cannot use Merge Queue batch" na besplatnom planu, #7220), pa `.mergify.yml` ne postavlja
   `batch_size`; grupiranje ostaje zadatak ručnog merge-traina opisanog u nastavku. PR čije
   provjere i dalje čekaju nakon `checks_timeout` (240 min = 2× izmjereni p95 za
   `quality.yml`) uklanja se iz reda čekanja umjesto da blokira red.
4. Nakon spajanja, kontinuirani workflow za provjeru izdanja validira novi vrh nakon pushanja
   i otvara problem za utvrđivanje odgovornosti ako je kombinacija izazvala regresiju (nikada ne vrši automatski revert).

Zaštitna pravila (odražavaju stroga pravila #21/#22 iz `CLAUDE.md`):

- **Aktivno zamrzavanje izdanja** → NEMOJTE označavati PR-ove koji ciljaju zamrznutu granu; prvo ih preusmjerite na
  aktivnu granu `release/vX+1`.
- **PR druge sesije koji je u toku** → nikada ga nemojte označavati; samo vlasnička sesija stavlja
  vlastiti rad u red čekanja.
- Izmjene koje se odnose samo na testove i PR-ovi s oznakom `hotfix` već pokreću skraćeni CI (pogledajte
  `RELEASE_CHECKLIST.md` → Hotfix Fast-Lane); uslovi reda čekanja prihvataju bilo koji
  skup provjera koji je stvarno pokrenut (`#check-failure=0` + `#check-pending=0`).

## Rezervna opcija: ručni voz za spajanje

Koristi se kada red nije dostupan. Time se formalizuje praksa kojom su tokom ciklusa v3.8.47
u jednom danu obrađena 33 PR-a:

1. **Sastavite grupu** (~10–30 pregledanih i odobrenih PR-ova). Provjerite kolizije `linked:`
   (isti `tap.testFiles`, isti dijelovi CHANGELOG-a) i njih obrađujte redom.
2. **Provjerite JEDNOM**: u izolovanom worktreeju izvedenom iz vrha grane izdanja lokalno spojite sve
   vrhove grupe, a zatim pokrenite paket testova ekvivalentan izdanju
   (`npm run check:release-green`, dodajte `--with-build` prije izdanja).
   `scripts/release/merge-train.sh <base> <PR#>…` automatizuje korake 1–2 (PR-ovi s konfliktima
   se izbacuju, a voz nastavlja). Potpuni način rada pokreće `npm run test:unit` — izvršavač
   podešen za računar (`--test-concurrency=20`), **a ne** dvije uzastopne CI particije
   s po 4 jezgre, zbog kojih je dominantna faza koristila oko 25% računara sa 16 jezgri (ispravljeno
   2026-07-18). `--fast` (pražnjenje velikih vozova unutar dana, odobrio vlasnik 2026-07-18)
   zadržava svaku statičku kontrolu + vitest, ali pokreće samo node:test datoteke koje su promijenili
   ukrcani PR-ovi; POTPUNI paket ipak se mora pokrenuti najmanje jednom dnevno na
   akumuliranom vrhu (jedan voz bez `--fast`).
3. **Zeleno** → spojite PR-ove redom (ponovo provjeravajući `state,headRefOid` prije svakog —
   PR čiji se vrh promijenio vraća se na pregled). Dokažite da je neto razlika svakog spajanja
   vlastita izmjena tog PR-a (bez automatskog razrješavanja poništavanjem: pregledajte `git diff --stat`
   radi brisanja izvan opsega).
4. **Crveno** → podijelite grupu napola (provjerite svaku polovinu) umjesto ponovne provjere
   jednog po jednog PR-a; vratite problematični PR u red za pregled zajedno s dokazima.
5. **Nikada nemojte**: spajati u zamrznutu granu tokom zamrzavanja; koristiti `git stash` bilo gdje;
   naslijepo ponovo pokretati CI nadajući se da će crveni status nestati (pravilo: crveni status je informacija).

## Nivoi (zašto je red siguran samo s brzim kontrolama)

- **Po PR-u** (brze kontrole iz quality.yml): testovi na koje utiče TIA + potpuni jedinični testovi u 4 particije +
  vitest + skup lint provjera + provjera tipova + integritet dokumentacije/CHANGELOG-a.
- **Po grupi/vrhu** (kontinuirana provjera zelenog statusa izdanja): STROGE kontrole `--quick` pri svakom slanju na
  granu izdanja; potpune provjere `--with-build --full-ci` 3× dnevno.
- **Po izdanju** (ci.yml na PR-u izdanja): potpuna matrica uključujući E2E ×9,
  artefakt paketa + osnovna provjera pokretanja iz tarballa, pokrivenost/pragovi.

Ništa se ne provjerava manje nego ranije — zahtjevne provjere samo se pokreću po grupi/vrhu
umjesto po PR-u, čime se uklanjaju O(N) uzastopni ciklusi.

## Preduslovi za `merge-train.sh` nakon svježeg checkouta

Skripta pokreće **predprovjeru** koja se odmah prekida pri grešci na korijenskom checkoutu (prije bilo kakvog rada
s worktreejem), tako da se neispravna instalacija nikada ne može prikazati kao neuspješan voz:

1. `npm ci`, zatim pokrenite `bun` postinstall koji npm blokira:
   `(cd node_modules/bun && node install.js)` — u suprotnom `check:provider-consistency`
   i `check:known-symbols` (oba koriste `bun scripts/…`) ne uspijevaju i na vozu I na osnovi,
   bez reda koji opisuje prekršaj.
2. Ne smije postojati zalutali `node_modules/node_modules` (duplirano stablo zavisnosti; React se učitava dvaput,
   a UI vitest paketi odmah ne uspijevaju).
3. `node_modules/.bin/tsc` mora biti prisutan i izvršan (nedostaje u djelimičnoj instalaciji).

Voz pokreće blokirajući `npm run check:cycles:ratchet`; samostalni `npm run check:cycles`
je informativan (ispisuje SCC-ove i završava s kodom različitim od nule čak i na zdravoj osnovi).
