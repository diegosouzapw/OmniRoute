# Merge Queue & Manual Merge-Train Runbook (Bosanski)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MERGE_TRAIN.md) · 🇪🇹 [am](../../../am/docs/ops/MERGE_TRAIN.md) · 🇸🇦 [ar](../../../ar/docs/ops/MERGE_TRAIN.md) · 🇦🇿 [az](../../../az/docs/ops/MERGE_TRAIN.md) · 🇧🇬 [bg](../../../bg/docs/ops/MERGE_TRAIN.md) · 🇧🇩 [bn](../../../bn/docs/ops/MERGE_TRAIN.md) · 🇨🇿 [cs](../../../cs/docs/ops/MERGE_TRAIN.md) · 🇩🇰 [da](../../../da/docs/ops/MERGE_TRAIN.md) · 🇩🇪 [de](../../../de/docs/ops/MERGE_TRAIN.md) · 🇬🇷 [el](../../../el/docs/ops/MERGE_TRAIN.md) · 🇪🇸 [es](../../../es/docs/ops/MERGE_TRAIN.md) · 🇪🇪 [et](../../../et/docs/ops/MERGE_TRAIN.md) · 🇮🇷 [fa](../../../fa/docs/ops/MERGE_TRAIN.md) · 🇫🇮 [fi](../../../fi/docs/ops/MERGE_TRAIN.md) · 🇫🇷 [fr](../../../fr/docs/ops/MERGE_TRAIN.md) · 🇮🇪 [ga](../../../ga/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [gu](../../../gu/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ha](../../../ha/docs/ops/MERGE_TRAIN.md) · 🇮🇱 [he](../../../he/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [hi](../../../hi/docs/ops/MERGE_TRAIN.md) · 🇭🇷 [hr](../../../hr/docs/ops/MERGE_TRAIN.md) · 🇭🇺 [hu](../../../hu/docs/ops/MERGE_TRAIN.md) · 🇦🇲 [hy](../../../hy/docs/ops/MERGE_TRAIN.md) · 🇮🇩 [id](../../../id/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ig](../../../ig/docs/ops/MERGE_TRAIN.md) · 🇮🇹 [it](../../../it/docs/ops/MERGE_TRAIN.md) · 🇯🇵 [ja](../../../ja/docs/ops/MERGE_TRAIN.md) · 🇬🇪 [ka](../../../ka/docs/ops/MERGE_TRAIN.md) · 🇰🇭 [km](../../../km/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [kn](../../../kn/docs/ops/MERGE_TRAIN.md) · 🇰🇷 [ko](../../../ko/docs/ops/MERGE_TRAIN.md) · 🇱🇹 [lt](../../../lt/docs/ops/MERGE_TRAIN.md) · 🇱🇻 [lv](../../../lv/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ml](../../../ml/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [mr](../../../mr/docs/ops/MERGE_TRAIN.md) · 🇲🇾 [ms](../../../ms/docs/ops/MERGE_TRAIN.md) · 🇲🇹 [mt](../../../mt/docs/ops/MERGE_TRAIN.md) · 🇲🇲 [my](../../../my/docs/ops/MERGE_TRAIN.md) · 🇳🇵 [ne](../../../ne/docs/ops/MERGE_TRAIN.md) · 🇳🇱 [nl](../../../nl/docs/ops/MERGE_TRAIN.md) · 🇳🇴 [no](../../../no/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [or](../../../or/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [pa](../../../pa/docs/ops/MERGE_TRAIN.md) · 🇵🇭 [phi](../../../phi/docs/ops/MERGE_TRAIN.md) · 🇵🇱 [pl](../../../pl/docs/ops/MERGE_TRAIN.md) · 🇵🇹 [pt](../../../pt/docs/ops/MERGE_TRAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MERGE_TRAIN.md) · 🇷🇴 [ro](../../../ro/docs/ops/MERGE_TRAIN.md) · 🇷🇺 [ru](../../../ru/docs/ops/MERGE_TRAIN.md) · 🇱🇰 [si](../../../si/docs/ops/MERGE_TRAIN.md) · 🇸🇰 [sk](../../../sk/docs/ops/MERGE_TRAIN.md) · 🇸🇮 [sl](../../../sl/docs/ops/MERGE_TRAIN.md) · 🇷🇸 [sr](../../../sr/docs/ops/MERGE_TRAIN.md) · 🇸🇪 [sv](../../../sv/docs/ops/MERGE_TRAIN.md) · 🇰🇪 [sw](../../../sw/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ta](../../../ta/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [te](../../../te/docs/ops/MERGE_TRAIN.md) · 🇹🇭 [th](../../../th/docs/ops/MERGE_TRAIN.md) · 🇹🇷 [tr](../../../tr/docs/ops/MERGE_TRAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MERGE_TRAIN.md) · 🇵🇰 [ur](../../../ur/docs/ops/MERGE_TRAIN.md) · 🇺🇿 [uz](../../../uz/docs/ops/MERGE_TRAIN.md) · 🇻🇳 [vi](../../../vi/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [yo](../../../yo/docs/ops/MERGE_TRAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MERGE_TRAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MERGE_TRAIN.md)

---

Od v3.8.49 (WS3.2/WS3.4 plana kvaliteta/brzine) zadana putanja spajanja za
pregledane PR-ove u `release/vX.Y.Z` jeste **Mergify red za spajanje** (`.mergify.yml`);
**ručni voz za spajanje** dokumentovan u nastavku predstavlja REZERVNU OPCIJU — koristi se tokom incidenata,
zamrzavanja izdanja ili ako se Mergify Open Source plan ikada promijeni.

## Zadana putanja: Mergify red

1. Kampanje su pregledale/odobrile PR i on je odobren putem vlasnikove ⭐
   provjere prije spajanja (izvještaj + odluka za svaku stavku — pogledajte `/merge-prs`, korak 0.75).
2. Vlasnik (ili sesija koja postupa prema vlasnikovoj odluci) primjenjuje oznaku **`queue`**.
   Oznaka JESTE odobrenje za spajanje; Mergify ga samo izvršava.
3. Mergify grupiše do 10 PR-ova na čekanju, provjerava grupu pomoću brzih provjera
   i spaja ih (squash). Neuspješna grupa se **automatski dijeli napola** — problematični PR
   izoluje se za približno log2(N) ponovnih provjera i uklanja iz reda; ostali nastavljaju.
4. Nakon spajanja, kontinuirani tok rada za provjeru ispravnosti izdanja provjerava novi vrh nakon slanja
   i otvara problem za atribuciju ako je kombinacija dovela do regresije (nikada se ne vraća automatski).

Zaštitna pravila (odražavaju stroga pravila #21/#22 iz `CLAUDE.md`):

- **Otvoreno zamrzavanje izdanja** → NEMOJTE označavati PR-ove usmjerene na zamrznutu granu; prvo ih preusmjerite na
  aktivnu `release/vX+1`.
- **PR druge sesije koji je u toku** → nikada ga nemojte označavati; samo vlasnička sesija stavlja
  vlastiti rad u red.
- Izmjene koje se odnose samo na testove i PR-ovi s oznakom `hotfix` već pokreću smanjeni CI (pogledajte
  `RELEASE_CHECKLIST.md` → Ubrzani postupak za hitne ispravke); uslovi reda prihvataju bilo koji
  skup provjera koji je zaista pokrenut (`#check-failure=0` + `#check-pending=0`).

## Rezervna opcija: ručni voz za spajanje

Koristi se kada red nije dostupan. Ovim se formalizuje praksa kojom su obrađena 33 PR-a u
jednom danu tokom ciklusa v3.8.47:

1. **Sastavite grupu** (~10–30 pregledanih+odobrenih PR-ova). Provjerite kolizije `linked:`
   (isti `tap.testFiles`, isti dijelovi CHANGELOG-a) i obradite ih redom.
2. **Provjerite JEDNOM**: u izolovanom worktreeu na vrhu grane izdanja lokalno spojite sve
   vrhove grupe, a zatim pokrenite paket ekvivalentan izdanju
   (`npm run check:release-green`, dodajte `--with-build` prije izdanja).
   `scripts/release/merge-train.sh <base> <PR#>…` automatizuje korake 1–2 (PR-ovi u sukobu
   se izbacuju, voz nastavlja). Puni način rada pokreće `npm run test:unit` — izvršivač
   podešen za računar (`--test-concurrency=20`), **a ne** dva uzastopna CI segmenta
   s 4 jezgre, zbog kojih je dominantna faza koristila ~25% računara sa 16 jezgri (ispravljeno
   2026-07-18). `--fast` (pražnjenje velikog voza unutar dana, odobrio vlasnik 2026-07-18)
   zadržava svaku statičku provjeru + vitest, ali pokreće samo node:test datoteke koje su promijenili
   ukrcani PR-ovi; PUNI paket i dalje se mora pokrenuti najmanje jednom dnevno nad
   akumuliranim vrhom (jedan voz bez `--fast`).
3. **Uspješno** → spojite PR-ove redom (ponovno provjeravajući `state,headRefOid` prije svakog —
   PR čiji je vrh promijenjen vraća se na pregled). Dokažite da je neto razlika svakog spajanja
   vlastita izmjena tog PR-a (bez automatskog razrješavanja vraćanjem izmjena: pregledajte `git diff --stat` radi
   brisanja izvan opsega).
4. **Neuspješno** → podijelite grupu na polovine (provjerite svaku polovinu) umjesto ponovne provjere
   jednog po jednog; vratite problematični PR u red za pregled zajedno s dokazima.
5. **Nikada**: ne spajajte u zamrznutu granu tokom zamrzavanja; ne koristite `git stash` nigdje;
   ne pokrećite CI naslijepo ponovo nadajući se da će neuspjeh nestati (pravilo: neuspjeh je informacija).

## Nivoi (zašto je red siguran samo s brzim provjerama)

- **Po PR-u** (brze provjere iz quality.yml): testovi na koje utiče TIA + puni jedinični testovi u 4 segmenta +
  vitest + skup lint provjera + provjera tipova + integritet dokumentacije/dnevnika izmjena.
- **Po grupi/vrhu** (kontinuirana provjera ispravnosti izdanja): STROGE provjere `--quick` pri svakom slanju na
  granu izdanja; puna skeniranja `--with-build --full-ci` 3× dnevno.
- **Po izdanju** (ci.yml na PR-u izdanja): potpuna matrica, uključujući E2E ×9,
  artefakt paketa + osnovnu provjeru pokretanja tarballa, pokrivenost/pragove.

Ništa se ne provjerava manje nego ranije — zahtjevne provjere samo se pokreću po grupi/vrhu
umjesto po PR-u, čime se uklanjaju O(N) povratni ciklusi.
