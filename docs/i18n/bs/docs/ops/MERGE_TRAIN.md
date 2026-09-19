# MERGE_TRAIN (Bosanski)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MERGE_TRAIN.md) · 🇪🇹 [am](../../../am/docs/ops/MERGE_TRAIN.md) · 🇸🇦 [ar](../../../ar/docs/ops/MERGE_TRAIN.md) · 🇦🇿 [az](../../../az/docs/ops/MERGE_TRAIN.md) · 🇧🇬 [bg](../../../bg/docs/ops/MERGE_TRAIN.md) · 🇧🇩 [bn](../../../bn/docs/ops/MERGE_TRAIN.md) · 🇨🇿 [cs](../../../cs/docs/ops/MERGE_TRAIN.md) · 🇩🇰 [da](../../../da/docs/ops/MERGE_TRAIN.md) · 🇩🇪 [de](../../../de/docs/ops/MERGE_TRAIN.md) · 🇬🇷 [el](../../../el/docs/ops/MERGE_TRAIN.md) · 🇪🇸 [es](../../../es/docs/ops/MERGE_TRAIN.md) · 🇪🇪 [et](../../../et/docs/ops/MERGE_TRAIN.md) · 🇮🇷 [fa](../../../fa/docs/ops/MERGE_TRAIN.md) · 🇫🇮 [fi](../../../fi/docs/ops/MERGE_TRAIN.md) · 🇫🇷 [fr](../../../fr/docs/ops/MERGE_TRAIN.md) · 🇮🇪 [ga](../../../ga/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [gu](../../../gu/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ha](../../../ha/docs/ops/MERGE_TRAIN.md) · 🇮🇱 [he](../../../he/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [hi](../../../hi/docs/ops/MERGE_TRAIN.md) · 🇭🇷 [hr](../../../hr/docs/ops/MERGE_TRAIN.md) · 🇭🇺 [hu](../../../hu/docs/ops/MERGE_TRAIN.md) · 🇦🇲 [hy](../../../hy/docs/ops/MERGE_TRAIN.md) · 🇮🇩 [id](../../../id/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ig](../../../ig/docs/ops/MERGE_TRAIN.md) · 🇮🇹 [it](../../../it/docs/ops/MERGE_TRAIN.md) · 🇯🇵 [ja](../../../ja/docs/ops/MERGE_TRAIN.md) · 🇬🇪 [ka](../../../ka/docs/ops/MERGE_TRAIN.md) · 🇰🇭 [km](../../../km/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [kn](../../../kn/docs/ops/MERGE_TRAIN.md) · 🇰🇷 [ko](../../../ko/docs/ops/MERGE_TRAIN.md) · 🇱🇹 [lt](../../../lt/docs/ops/MERGE_TRAIN.md) · 🇱🇻 [lv](../../../lv/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ml](../../../ml/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [mr](../../../mr/docs/ops/MERGE_TRAIN.md) · 🇲🇾 [ms](../../../ms/docs/ops/MERGE_TRAIN.md) · 🇲🇹 [mt](../../../mt/docs/ops/MERGE_TRAIN.md) · 🇲🇲 [my](../../../my/docs/ops/MERGE_TRAIN.md) · 🇳🇵 [ne](../../../ne/docs/ops/MERGE_TRAIN.md) · 🇳🇱 [nl](../../../nl/docs/ops/MERGE_TRAIN.md) · 🇳🇴 [no](../../../no/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [or](../../../or/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [pa](../../../pa/docs/ops/MERGE_TRAIN.md) · 🇵🇭 [phi](../../../phi/docs/ops/MERGE_TRAIN.md) · 🇵🇱 [pl](../../../pl/docs/ops/MERGE_TRAIN.md) · 🇵🇹 [pt](../../../pt/docs/ops/MERGE_TRAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MERGE_TRAIN.md) · 🇷🇴 [ro](../../../ro/docs/ops/MERGE_TRAIN.md) · 🇷🇺 [ru](../../../ru/docs/ops/MERGE_TRAIN.md) · 🇱🇰 [si](../../../si/docs/ops/MERGE_TRAIN.md) · 🇸🇰 [sk](../../../sk/docs/ops/MERGE_TRAIN.md) · 🇸🇮 [sl](../../../sl/docs/ops/MERGE_TRAIN.md) · 🇷🇸 [sr](../../../sr/docs/ops/MERGE_TRAIN.md) · 🇸🇪 [sv](../../../sv/docs/ops/MERGE_TRAIN.md) · 🇰🇪 [sw](../../../sw/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ta](../../../ta/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [te](../../../te/docs/ops/MERGE_TRAIN.md) · 🇹🇭 [th](../../../th/docs/ops/MERGE_TRAIN.md) · 🇹🇷 [tr](../../../tr/docs/ops/MERGE_TRAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MERGE_TRAIN.md) · 🇵🇰 [ur](../../../ur/docs/ops/MERGE_TRAIN.md) · 🇺🇿 [uz](../../../uz/docs/ops/MERGE_TRAIN.md) · 🇻🇳 [vi](../../../vi/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [yo](../../../yo/docs/ops/MERGE_TRAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MERGE_TRAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MERGE_TRAIN.md)

---

# Priručnik za Merge Queue i ručni Merge-Train

Od verzije v3.8.49 (WS3.2/WS3.4 plana kvalitete/brzine) zadani put spajanja za pregledane PR-ove u `release/vX.Y.Z` je Mergify red za spajanje (`.mergify.yml`); ručni merge-train dokumentiran u nastavku je REZERVNA OPCIJA — koristi se tijekom incidenata, zamrzavanja izdanja (release freezes) ili ako se Mergify Open Source plan ikada promijeni.

## Zadani put: Mergify red

1. PR je pregledan/označen zelenim od strane kampanja i odobren od strane vlasnikovog pre-merge ⭐ vrata (izvještaj + odluka po stavci — pogledajte `/merge-prs` korak 0.75).
2. Vlasnik (ili sesija koja djeluje prema odluci vlasnika) primjenjuje oznaku **`queue`**. Oznaka JE odobrenje za spajanje; Mergify ga samo izvršava.
3. Mergify grupira do 10 PR-ova u redu, validira grupu prema brzim vratima (fast-gates) i spaja (squash). Crvena grupa se automatski bisekcionira — problematični PR se izolira u ~log2(N) revalidacija i uklanja iz reda; ostali nastavljaju.
4. Nakon spajanja, kontinuirani release-green tijek rada validira novi vrh (tip) pri push-u i otvara problem atribucije ako je kombinacija nazadovala (nikada ne radi auto-revert).

Zaštitne mjere (zrcali `CLAUDE.md` stroga pravila #21/#22):

- **Otvoreno zamrzavanje izdanja (Release freeze)** → NEMOJTE označavati PR-ove koji ciljaju zamrznutu granu; prvo preusmjerite na aktivnu `release/vX+1`.
- **PR druge sesije koji je u tijeku** → nikada ga nemojte označavati; samo sesija vlasnika stavlja svoj rad u red.
- **Diff-ovi koji sadrže samo testove i PR-ovi s oznakom `hotfix`** već pokreću smanjeni CI (pogledajte `RELEASE_CHECKLIST.md` → Hotfix Fast-Lane); uvjeti reda prihvaćaju bilo koji skup provjera koji je zapravo pokrenut (`#check-failure=0` + `#check-pending=0`).

## Rezervna opcija: ručni merge-train

Koristi se kada red nije dostupan. Ovo kodificira praksu koja je ispraznila 33 PR-a u jednom danu tijekom ciklusa v3.8.47:

1. **Sastavite grupu** (~10–30 pregledanih+odobrenih PR-ova). Provjerite `linked:` kolizije (iste `tap.testFiles`, isti CHANGELOG dijelovi) i serijalizirajte ih.
2. **Validirajte JEDNOM**: u izoliranom radnom stablu (worktree) izvan vrha izdanja, spojite sve glave grupe lokalno, zatim pokrenite paket ekvivalentan izdanju (`npm run check:release-green`, dodajte `--with-build` prije izdanja). `scripts/release/merge-train.sh <base> <PR#>…` automatizira korake 1–2 (konfliktni PR-ovi se izbacuju, vlak nastavlja). Puni način rada pokreće `npm run test:unit` — pokretač prilagođen stroju (`--test-concurrency=20`), a ne dva sekvencijalna 4-jezgrena CI sharda, što je pokretalo dominantnu fazu na ~25% 16-jezgrenog stroja (popravljeno 18.07.2026.). `--fast` (pražnjenje mega-vlaka unutar dana, odobreno od strane vlasnika 18.07.2026.) zadržava svaka statička vrata + vitest, ali pokreće samo `node:test` datoteke koje su promijenili ukrcani PR-ovi; PUNI paket se i dalje mora pokrenuti barem jednom dnevno na akumuliranom vrhu (jedan vlak bez `--fast`).
3. **Zeleno** → spojite PR-ove u nizu (ponovno provjeravajući `state,headRefOid` prije svakog — PR čija se glava pomaknula ponovno ulazi u pregled). Dokažite da je neto diff svakog spajanja vlastita promjena PR-a (nema auto-resolve vraćanja: revidirajte `git diff --stat` za brisanja izvan opsega).
4. **Crveno** → bisekcionirajte grupu na polovice (validirajte svaku polovicu) umjesto ponovne validacije jedan po jedan; vratite problematični PR natrag u red za pregled s dokazima.
5. **Nikada**: spajajte tijekom zamrzavanja u zamrznutu granu; `git stash` bilo gdje; masovno ponovno pokretanje CI-a u nadi da će crveno nestati (pravilo: crveno je informacija).

## Slojevitost (zašto je red siguran samo s brzim vratima)

- **Po PR-u** (`quality.yml` brza vrata): TIA-pogođeni testovi + puni unit 4-shard + vitest + lint paket + typecheck + integritet dokumenata/changelog-a.
- **Po grupi/vrhu** (kontinuirani release-green): `--quick` TVRDA vrata pri svakom push-u na granu izdanja; puni `--with-build --full-ci` prolazi 3×/dnevno.
- **Po izdanju** (`ci.yml` na PR-u izdanja): potpuna matrica uklj. E2E ×9, package-artifact + tarball boot-smoke, pokrivenost/ratchets.

Ništa se ne validira manje nego prije — teška površina se samo pokreće po grupi/vrhu umjesto po PR-u, što uklanja O(N) povratnih putovanja.
