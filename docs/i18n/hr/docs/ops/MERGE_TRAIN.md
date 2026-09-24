# Merge Queue & Manual Merge-Train Runbook (Hrvatski)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MERGE_TRAIN.md) · 🇪🇹 [am](../../../am/docs/ops/MERGE_TRAIN.md) · 🇸🇦 [ar](../../../ar/docs/ops/MERGE_TRAIN.md) · 🇦🇿 [az](../../../az/docs/ops/MERGE_TRAIN.md) · 🇧🇬 [bg](../../../bg/docs/ops/MERGE_TRAIN.md) · 🇧🇩 [bn](../../../bn/docs/ops/MERGE_TRAIN.md) · 🇧🇦 [bs](../../../bs/docs/ops/MERGE_TRAIN.md) · 🇨🇿 [cs](../../../cs/docs/ops/MERGE_TRAIN.md) · 🇩🇰 [da](../../../da/docs/ops/MERGE_TRAIN.md) · 🇩🇪 [de](../../../de/docs/ops/MERGE_TRAIN.md) · 🇬🇷 [el](../../../el/docs/ops/MERGE_TRAIN.md) · 🇪🇸 [es](../../../es/docs/ops/MERGE_TRAIN.md) · 🇪🇪 [et](../../../et/docs/ops/MERGE_TRAIN.md) · 🇮🇷 [fa](../../../fa/docs/ops/MERGE_TRAIN.md) · 🇫🇮 [fi](../../../fi/docs/ops/MERGE_TRAIN.md) · 🇫🇷 [fr](../../../fr/docs/ops/MERGE_TRAIN.md) · 🇮🇪 [ga](../../../ga/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [gu](../../../gu/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ha](../../../ha/docs/ops/MERGE_TRAIN.md) · 🇮🇱 [he](../../../he/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [hi](../../../hi/docs/ops/MERGE_TRAIN.md) · 🇭🇺 [hu](../../../hu/docs/ops/MERGE_TRAIN.md) · 🇦🇲 [hy](../../../hy/docs/ops/MERGE_TRAIN.md) · 🇮🇩 [id](../../../id/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ig](../../../ig/docs/ops/MERGE_TRAIN.md) · 🇮🇹 [it](../../../it/docs/ops/MERGE_TRAIN.md) · 🇯🇵 [ja](../../../ja/docs/ops/MERGE_TRAIN.md) · 🇬🇪 [ka](../../../ka/docs/ops/MERGE_TRAIN.md) · 🇰🇭 [km](../../../km/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [kn](../../../kn/docs/ops/MERGE_TRAIN.md) · 🇰🇷 [ko](../../../ko/docs/ops/MERGE_TRAIN.md) · 🇱🇹 [lt](../../../lt/docs/ops/MERGE_TRAIN.md) · 🇱🇻 [lv](../../../lv/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ml](../../../ml/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [mr](../../../mr/docs/ops/MERGE_TRAIN.md) · 🇲🇾 [ms](../../../ms/docs/ops/MERGE_TRAIN.md) · 🇲🇹 [mt](../../../mt/docs/ops/MERGE_TRAIN.md) · 🇲🇲 [my](../../../my/docs/ops/MERGE_TRAIN.md) · 🇳🇵 [ne](../../../ne/docs/ops/MERGE_TRAIN.md) · 🇳🇱 [nl](../../../nl/docs/ops/MERGE_TRAIN.md) · 🇳🇴 [no](../../../no/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [or](../../../or/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [pa](../../../pa/docs/ops/MERGE_TRAIN.md) · 🇵🇭 [phi](../../../phi/docs/ops/MERGE_TRAIN.md) · 🇵🇱 [pl](../../../pl/docs/ops/MERGE_TRAIN.md) · 🇵🇹 [pt](../../../pt/docs/ops/MERGE_TRAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MERGE_TRAIN.md) · 🇷🇴 [ro](../../../ro/docs/ops/MERGE_TRAIN.md) · 🇷🇺 [ru](../../../ru/docs/ops/MERGE_TRAIN.md) · 🇱🇰 [si](../../../si/docs/ops/MERGE_TRAIN.md) · 🇸🇰 [sk](../../../sk/docs/ops/MERGE_TRAIN.md) · 🇸🇮 [sl](../../../sl/docs/ops/MERGE_TRAIN.md) · 🇷🇸 [sr](../../../sr/docs/ops/MERGE_TRAIN.md) · 🇸🇪 [sv](../../../sv/docs/ops/MERGE_TRAIN.md) · 🇰🇪 [sw](../../../sw/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ta](../../../ta/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [te](../../../te/docs/ops/MERGE_TRAIN.md) · 🇹🇭 [th](../../../th/docs/ops/MERGE_TRAIN.md) · 🇹🇷 [tr](../../../tr/docs/ops/MERGE_TRAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MERGE_TRAIN.md) · 🇵🇰 [ur](../../../ur/docs/ops/MERGE_TRAIN.md) · 🇺🇿 [uz](../../../uz/docs/ops/MERGE_TRAIN.md) · 🇻🇳 [vi](../../../vi/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [yo](../../../yo/docs/ops/MERGE_TRAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MERGE_TRAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MERGE_TRAIN.md)

---

Od v3.8.49 (WS3.2/WS3.4 plana kvalitete/brzine) zadani put spajanja
pregledanih PR-ova u `release/vX.Y.Z` jest **Mergifyjev red čekanja za spajanje** (`.mergify.yml`);
**ručni vlak spajanja** dokumentiran u nastavku REZERVNA je opcija — upotrebljava se tijekom incidenata,
zamrzavanja izdanja ili ako se Mergifyjev plan otvorenog koda ikada promijeni.

## Zadani put: Mergifyjev red čekanja

1. PR je pregledan/prošao je provjere kampanja i odobren je vlasnikovom ⭐ kontrolom
   prije spajanja (izvješće + odluka za svaku stavku — pogledajte Korak 0.75 u `/merge-prs`).
2. Vlasnik (ili sesija koja postupa prema vlasnikovoj odluci) dodjeljuje oznaku **`queue`**.
   Oznaka JEST odobrenje za spajanje; Mergify ga samo izvršava.
3. Mergify grupira do 10 PR-ova u redu čekanja, provjerava skupinu pomoću brzih kontrola
   i spaja ih (squash). Neuspješna skupina **automatski se prepolovljuje** — problematični PR
   izolira se kroz približno log2(N) ponovnih provjera i uklanja iz reda čekanja; ostali nastavljaju.
4. Nakon spajanja kontinuirani tijek rada za provjeru ispravnosti izdanja provjerava novi vrh pri pushu
   i otvara problem s atribucijom ako je kombinacija prouzročila regresiju (nikada ne izvodi automatski revert).

Zaštitne mjere (odražavaju Stroga pravila #21/#22 iz `CLAUDE.md`):

- **Otvoreno je zamrzavanje izdanja** → NEMOJTE označavati PR-ove koji ciljaju zamrznutu granu; najprije ih preusmjerite na
  aktivni `release/vX+1`.
- **PR druge sesije koji je u tijeku** → nikada ga nemojte označavati; samo vlasnička sesija stavlja
  vlastiti rad u red čekanja.
- Razlike koje mijenjaju samo testove i PR-ovi s oznakom `hotfix` već pokreću smanjeni skup CI provjera (pogledajte
  `RELEASE_CHECKLIST.md` → Ubrzani put za hitne popravke); uvjeti reda čekanja prihvaćaju bilo koji
  skup provjera koji je stvarno pokrenut (`#check-failure=0` + `#check-pending=0`).

## Rezervna opcija: ručni vlak spajanja

Upotrebljava se kada red čekanja nije dostupan. Time se formalizira praksa kojom su tijekom
ciklusa v3.8.47 obrađena 33 PR-a u jednom danu:

1. **Sastavite skupinu** (približno 10–30 pregledanih i odobrenih PR-ova). Provjerite kolizije `linked:`
   (iste `tap.testFiles`, isti dijelovi CHANGELOG-a) i takve PR-ove obradite slijedno.
2. **Provjerite JEDNOM**: u izoliranom worktreeju temeljenom na vrhu grane izdanja lokalno spojite sve
   vrhove skupine, a zatim pokrenite skup testova jednak onome za izdanje
   (`npm run check:release-green`; prije izdanja dodajte `--with-build`).
   `scripts/release/merge-train.sh <base> <PR#>…` automatizira korake 1–2 (PR-ovi u sukobu
   izbacuju se, a vlak nastavlja). Puni način rada pokreće `npm run test:unit` — izvršivač
   prilagođen stroju (`--test-concurrency=20`), a **ne** dvije uzastopne CI particije s 4 jezgre,
   zbog kojih je dominantna faza koristila približno 25 % stroja sa 16 jezgri (ispravljeno
   2026-07-18). `--fast` (pražnjenje velikih vlakova unutar dana, uz odobrenje vlasnika 2026-07-18)
   zadržava svaku statičku kontrolu + vitest, ali pokreće samo node:test datoteke koje su promijenili
   ukrcani PR-ovi; PUNI skup i dalje se mora pokrenuti barem jednom dnevno na
   akumuliranom vrhu (jedan vlak bez `--fast`).
3. **Uspjeh** → spojite PR-ove redom (prije svakog ponovno provjerite `state,headRefOid` —
   PR čiji se vrh promijenio vraća se u red čekanja za pregled). Dokažite da je neto razlika svakog spajanja
   isključivo vlastita promjena tog PR-a (bez reverta nastalih automatskim razrješavanjem: pregledajte `git diff --stat`
   radi brisanja izvan opsega).
4. **Neuspjeh** → prepolovite skupinu (provjerite svaku polovicu) umjesto ponovne provjere
   jednog po jednog PR-a; vratite problematični PR u red čekanja za pregled zajedno s dokazima.
5. **Nikada nemojte**: spajati u zamrznutu granu tijekom zamrzavanja; upotrebljavati `git stash` igdje;
   naslijepo ponovno pokretati CI u nadi da će neuspjeh nestati (pravilo: neuspjeh je informacija).

## Razine (zašto je red čekanja siguran samo s brzim kontrolama)

- **Po PR-u** (brze kontrole iz quality.yml): testovi obuhvaćeni TIA-om + puni jedinični testovi u 4 particije +
  vitest + skup provjera lintera + provjera tipova + provjera integriteta dokumentacije/CHANGELOG-a.
- **Po skupini/vrhu** (kontinuirana provjera ispravnosti izdanja): OBVEZNE kontrole `--quick` pri svakom pushu u
  granu izdanja; puni prolazi `--with-build --full-ci` 3× dnevno.
- **Po izdanju** (ci.yml na PR-u izdanja): potpuna matrica, uključujući E2E ×9,
  artefakt paketa + osnovni test pokretanja iz tarballa, pokrivenost/pragove.

Ništa se ne provjerava manje nego prije — zahtjevne provjere samo se pokreću po skupini/vrhu
umjesto po PR-u, čime se uklanjaju O(N) povratni ciklusi.
