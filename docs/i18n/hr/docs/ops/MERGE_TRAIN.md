# Merge Queue & Manual Merge-Train Runbook (Hrvatski)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MERGE_TRAIN.md) · 🇪🇹 [am](../../../am/docs/ops/MERGE_TRAIN.md) · 🇸🇦 [ar](../../../ar/docs/ops/MERGE_TRAIN.md) · 🇦🇿 [az](../../../az/docs/ops/MERGE_TRAIN.md) · 🇧🇬 [bg](../../../bg/docs/ops/MERGE_TRAIN.md) · 🇧🇩 [bn](../../../bn/docs/ops/MERGE_TRAIN.md) · 🇧🇦 [bs](../../../bs/docs/ops/MERGE_TRAIN.md) · 🇨🇿 [cs](../../../cs/docs/ops/MERGE_TRAIN.md) · 🇩🇰 [da](../../../da/docs/ops/MERGE_TRAIN.md) · 🇩🇪 [de](../../../de/docs/ops/MERGE_TRAIN.md) · 🇬🇷 [el](../../../el/docs/ops/MERGE_TRAIN.md) · 🇪🇸 [es](../../../es/docs/ops/MERGE_TRAIN.md) · 🇪🇪 [et](../../../et/docs/ops/MERGE_TRAIN.md) · 🇮🇷 [fa](../../../fa/docs/ops/MERGE_TRAIN.md) · 🇫🇮 [fi](../../../fi/docs/ops/MERGE_TRAIN.md) · 🇫🇷 [fr](../../../fr/docs/ops/MERGE_TRAIN.md) · 🇮🇪 [ga](../../../ga/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [gu](../../../gu/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ha](../../../ha/docs/ops/MERGE_TRAIN.md) · 🇮🇱 [he](../../../he/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [hi](../../../hi/docs/ops/MERGE_TRAIN.md) · 🇭🇺 [hu](../../../hu/docs/ops/MERGE_TRAIN.md) · 🇦🇲 [hy](../../../hy/docs/ops/MERGE_TRAIN.md) · 🇮🇩 [id](../../../id/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ig](../../../ig/docs/ops/MERGE_TRAIN.md) · 🇮🇹 [it](../../../it/docs/ops/MERGE_TRAIN.md) · 🇯🇵 [ja](../../../ja/docs/ops/MERGE_TRAIN.md) · 🇬🇪 [ka](../../../ka/docs/ops/MERGE_TRAIN.md) · 🇰🇭 [km](../../../km/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [kn](../../../kn/docs/ops/MERGE_TRAIN.md) · 🇰🇷 [ko](../../../ko/docs/ops/MERGE_TRAIN.md) · 🇱🇹 [lt](../../../lt/docs/ops/MERGE_TRAIN.md) · 🇱🇻 [lv](../../../lv/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ml](../../../ml/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [mr](../../../mr/docs/ops/MERGE_TRAIN.md) · 🇲🇾 [ms](../../../ms/docs/ops/MERGE_TRAIN.md) · 🇲🇹 [mt](../../../mt/docs/ops/MERGE_TRAIN.md) · 🇲🇲 [my](../../../my/docs/ops/MERGE_TRAIN.md) · 🇳🇵 [ne](../../../ne/docs/ops/MERGE_TRAIN.md) · 🇳🇱 [nl](../../../nl/docs/ops/MERGE_TRAIN.md) · 🇳🇴 [no](../../../no/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [or](../../../or/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [pa](../../../pa/docs/ops/MERGE_TRAIN.md) · 🇵🇭 [phi](../../../phi/docs/ops/MERGE_TRAIN.md) · 🇵🇱 [pl](../../../pl/docs/ops/MERGE_TRAIN.md) · 🇵🇹 [pt](../../../pt/docs/ops/MERGE_TRAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MERGE_TRAIN.md) · 🇷🇴 [ro](../../../ro/docs/ops/MERGE_TRAIN.md) · 🇷🇺 [ru](../../../ru/docs/ops/MERGE_TRAIN.md) · 🇱🇰 [si](../../../si/docs/ops/MERGE_TRAIN.md) · 🇸🇰 [sk](../../../sk/docs/ops/MERGE_TRAIN.md) · 🇸🇮 [sl](../../../sl/docs/ops/MERGE_TRAIN.md) · 🇷🇸 [sr](../../../sr/docs/ops/MERGE_TRAIN.md) · 🇸🇪 [sv](../../../sv/docs/ops/MERGE_TRAIN.md) · 🇰🇪 [sw](../../../sw/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ta](../../../ta/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [te](../../../te/docs/ops/MERGE_TRAIN.md) · 🇹🇭 [th](../../../th/docs/ops/MERGE_TRAIN.md) · 🇹🇷 [tr](../../../tr/docs/ops/MERGE_TRAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MERGE_TRAIN.md) · 🇵🇰 [ur](../../../ur/docs/ops/MERGE_TRAIN.md) · 🇺🇿 [uz](../../../uz/docs/ops/MERGE_TRAIN.md) · 🇻🇳 [vi](../../../vi/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [yo](../../../yo/docs/ops/MERGE_TRAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MERGE_TRAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MERGE_TRAIN.md)

---

Od v3.8.49 (WS3.2/WS3.4 plana kvalitete/brzine) zadani put spajanja
pregledanih PR-ova u `release/vX.Y.Z` jest **Mergifyjev red za spajanje** (`.mergify.yml`);
**ručni vlak za spajanje** dokumentiran u nastavku REZERVNA je opcija — koristi se tijekom incidenata,
zamrzavanja izdanja ili ako se Mergifyjev plan Open Source ikada promijeni.

## Zadani put: Mergifyjev red čekanja

1. Kampanje pregledavaju PR i daju mu zeleno svjetlo, a vlasnik ga odobrava putem svojeg ⭐
   kontrolnog koraka prije spajanja (izvješće + odluka za svaku stavku — pogledajte `/merge-prs`, korak 0.75).
2. Vlasnik (ili sesija koja postupa prema vlasnikovoj odluci) dodjeljuje oznaku **`queue`**.
   Ta oznaka JEST odobrenje za spajanje; Mergify ga samo izvršava.
3. Mergify provjerava PR-ove u redu čekanja **serijski** (jedan po jedan) prema brzim
   kontrolama i spaja ih (squash). Grupiranje + automatska bisekcija dio su Mergifyjeve
   plaćene razine ("Cannot use Merge Queue batch" u besplatnom planu, #7220), stoga
   `.mergify.yml` ne postavlja `batch_size`; grupiranje ostaje zadatak ručnog niza spajanja
   opisanog u nastavku. PR čije su provjere i dalje na čekanju nakon `checks_timeout`
   (240 min = 2× izmjereni p95 za `quality.yml`) uklanja se iz reda umjesto da blokira red.
4. Nakon spajanja, kontinuirani tijek rada za provjeru ispravnosti izdanja provjerava novi
   vrh grane pri pushu i otvara problem za utvrđivanje odgovornosti ako je kombinacija
   uzrokovala regresiju (bez automatskog vraćanja promjena).

Zaštitna pravila (odražavaju stroga pravila #21/#22 iz `CLAUDE.md`):

- **Aktivno zamrzavanje izdanja** → NEMOJTE označavati PR-ove usmjerene na zamrznutu
  granu; prvo ih preusmjerite na aktivnu granu `release/vX+1`.
- **PR druge sesije koji je u tijeku** → nikada ga nemojte označiti; samo vlasnička
  sesija stavlja vlastiti rad u red čekanja.
- Razlike koje sadrže samo testove i PR-ovi s oznakom `hotfix` već pokreću smanjeni skup
  CI provjera (pogledajte `RELEASE_CHECKLIST.md` → Hotfix Fast-Lane); uvjeti reda čekanja
  prihvaćaju onaj skup provjera koji je stvarno pokrenut (`#check-failure=0` +
  `#check-pending=0`).

## Rezervna opcija: ručni vlak za spajanje

Koristi se kada red nije dostupan. Time se formalizira praksa kojom su tijekom ciklusa v3.8.47
u jednom danu obrađena 33 PR-a:

1. **Sastavite grupu** (~10–30 pregledanih i odobrenih PR-ova). Provjerite kolizije `linked:`
   (isti `tap.testFiles`, isti dijelovi CHANGELOG-a) i obradite ih slijedno.
2. **Provjerite JEDNOM**: u izoliranom radnom stablu temeljenom na vrhu grane izdanja lokalno
   spojite sve vrhove grupe, a zatim pokrenite skup provjera ekvivalentan izdanju
   (`npm run check:release-green`; prije izdanja dodajte `--with-build`).
   `scripts/release/merge-train.sh <base> <PR#>…` automatizira korake 1–2 (PR-ovi u sukobu
   izbacuju se, a vlak nastavlja). Puni način rada pokreće `npm run test:unit` — izvršavač
   prilagođen računalu (`--test-concurrency=20`), **a ne** dvije uzastopne CI particije s
   4 jezgre, zbog kojih je dominantna faza koristila samo ~25 % računala sa 16 jezgri
   (ispravljeno 2026-07-18). `--fast` (obrada velikih vlakova tijekom dana, uz odobrenje
   vlasnika 2026-07-18) zadržava svaku statičku kontrolu + vitest, ali pokreće samo
   node:test datoteke koje su promijenili ukrcani PR-ovi; PUNI skup provjera i dalje se
   mora pokrenuti barem jednom dnevno na akumuliranom vrhu (jedan vlak bez `--fast`).
3. **Prolaz** → spojite PR-ove redom (ponovno provjeravajući `state,headRefOid` prije svakog —
   PR čiji se vrh promijenio ponovno ulazi u pregled). Dokažite da je neto razlika svakog
   spajanja isključivo vlastita promjena tog PR-a (bez automatskog razrješavanja vraćanjem:
   provjerite `git diff --stat` radi brisanja izvan opsega).
4. **Pad** → podijelite grupu napola (provjerite svaku polovicu) umjesto ponovne provjere
   jednog po jednog PR-a; vratite problematični PR u red za pregled zajedno s dokazima.
5. **Nikad**: ne spajajte u zamrznutu granu tijekom zamrzavanja; ne koristite `git stash`
   nigdje; ne pokrećite CI iznova naslijepo u nadi da će pad nestati (pravilo: pad je informacija).

## Razine (zašto je red siguran samo s brzim kontrolama)

- **Po PR-u** (brze kontrole iz quality.yml): testovi na koje utječe TIA + puni jedinični
  testovi u 4 particije + vitest + skup lint provjera + provjera tipova + provjera
  cjelovitosti dokumentacije/CHANGELOG-a.
- **Po grupi/vrhu** (kontinuirana provjera ispravnosti izdanja): STROGE kontrole `--quick`
  pri svakom slanju na granu izdanja; puna izvođenja `--with-build --full-ci` 3× dnevno.
- **Po izdanju** (ci.yml na PR-u izdanja): potpuna matrica, uključujući E2E ×9,
  artefakt paketa + osnovnu provjeru pokretanja tarballa, pokrivenost/pragove.

Ništa se ne provjerava manje nego prije — zahtjevne provjere samo se pokreću po grupi/vrhu
umjesto po PR-u, čime se uklanjaju O(N) povratni ciklusi.

## Preduvjeti svježe radne kopije za `merge-train.sh`

Skripta na korijenskoj radnoj kopiji pokreće **predprovjeru** koja se prekida pri prvom
neuspjehu (prije bilo kakvog rada u radnom stablu), tako da se neispravna instalacija nikad
ne može prikazati kao neuspješan vlak:

1. Pokrenite `npm ci`, a zatim `bun` postinstall koji npm blokira:
   `(cd node_modules/bun && node install.js)` — u suprotnom `check:provider-consistency`
   i `check:known-symbols` (oba koriste `bun scripts/…`) padaju i na vlaku I na osnovi,
   bez retka koji navodi kršenje.
2. Ne smije postojati zalutali `node_modules/node_modules` (duplicirano stablo ovisnosti;
   React se učitava dvaput, a UI vitest skupovi odmah padaju).
3. `node_modules/.bin/tsc` mora postojati i biti izvršiv (u djelomičnoj instalaciji nedostaje).

Vlak pokreće blokirajući `npm run check:cycles:ratchet`; samostalni `npm run check:cycles`
savjetodavan je (ispisuje SCC-ove i završava s kodom različitim od nule čak i na ispravnoj osnovi).
