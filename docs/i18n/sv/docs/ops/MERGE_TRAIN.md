# Merge Queue & Manual Merge-Train Runbook (Svenska)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MERGE_TRAIN.md) · 🇪🇹 [am](../../../am/docs/ops/MERGE_TRAIN.md) · 🇸🇦 [ar](../../../ar/docs/ops/MERGE_TRAIN.md) · 🇦🇿 [az](../../../az/docs/ops/MERGE_TRAIN.md) · 🇧🇬 [bg](../../../bg/docs/ops/MERGE_TRAIN.md) · 🇧🇩 [bn](../../../bn/docs/ops/MERGE_TRAIN.md) · 🇧🇦 [bs](../../../bs/docs/ops/MERGE_TRAIN.md) · 🇨🇿 [cs](../../../cs/docs/ops/MERGE_TRAIN.md) · 🇩🇰 [da](../../../da/docs/ops/MERGE_TRAIN.md) · 🇩🇪 [de](../../../de/docs/ops/MERGE_TRAIN.md) · 🇬🇷 [el](../../../el/docs/ops/MERGE_TRAIN.md) · 🇪🇸 [es](../../../es/docs/ops/MERGE_TRAIN.md) · 🇪🇪 [et](../../../et/docs/ops/MERGE_TRAIN.md) · 🇮🇷 [fa](../../../fa/docs/ops/MERGE_TRAIN.md) · 🇫🇮 [fi](../../../fi/docs/ops/MERGE_TRAIN.md) · 🇫🇷 [fr](../../../fr/docs/ops/MERGE_TRAIN.md) · 🇮🇪 [ga](../../../ga/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [gu](../../../gu/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ha](../../../ha/docs/ops/MERGE_TRAIN.md) · 🇮🇱 [he](../../../he/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [hi](../../../hi/docs/ops/MERGE_TRAIN.md) · 🇭🇷 [hr](../../../hr/docs/ops/MERGE_TRAIN.md) · 🇭🇺 [hu](../../../hu/docs/ops/MERGE_TRAIN.md) · 🇦🇲 [hy](../../../hy/docs/ops/MERGE_TRAIN.md) · 🇮🇩 [id](../../../id/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ig](../../../ig/docs/ops/MERGE_TRAIN.md) · 🇮🇹 [it](../../../it/docs/ops/MERGE_TRAIN.md) · 🇯🇵 [ja](../../../ja/docs/ops/MERGE_TRAIN.md) · 🇬🇪 [ka](../../../ka/docs/ops/MERGE_TRAIN.md) · 🇰🇭 [km](../../../km/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [kn](../../../kn/docs/ops/MERGE_TRAIN.md) · 🇰🇷 [ko](../../../ko/docs/ops/MERGE_TRAIN.md) · 🇱🇹 [lt](../../../lt/docs/ops/MERGE_TRAIN.md) · 🇱🇻 [lv](../../../lv/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ml](../../../ml/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [mr](../../../mr/docs/ops/MERGE_TRAIN.md) · 🇲🇾 [ms](../../../ms/docs/ops/MERGE_TRAIN.md) · 🇲🇹 [mt](../../../mt/docs/ops/MERGE_TRAIN.md) · 🇲🇲 [my](../../../my/docs/ops/MERGE_TRAIN.md) · 🇳🇵 [ne](../../../ne/docs/ops/MERGE_TRAIN.md) · 🇳🇱 [nl](../../../nl/docs/ops/MERGE_TRAIN.md) · 🇳🇴 [no](../../../no/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [or](../../../or/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [pa](../../../pa/docs/ops/MERGE_TRAIN.md) · 🇵🇭 [phi](../../../phi/docs/ops/MERGE_TRAIN.md) · 🇵🇱 [pl](../../../pl/docs/ops/MERGE_TRAIN.md) · 🇵🇹 [pt](../../../pt/docs/ops/MERGE_TRAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MERGE_TRAIN.md) · 🇷🇴 [ro](../../../ro/docs/ops/MERGE_TRAIN.md) · 🇷🇺 [ru](../../../ru/docs/ops/MERGE_TRAIN.md) · 🇱🇰 [si](../../../si/docs/ops/MERGE_TRAIN.md) · 🇸🇰 [sk](../../../sk/docs/ops/MERGE_TRAIN.md) · 🇸🇮 [sl](../../../sl/docs/ops/MERGE_TRAIN.md) · 🇷🇸 [sr](../../../sr/docs/ops/MERGE_TRAIN.md) · 🇰🇪 [sw](../../../sw/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ta](../../../ta/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [te](../../../te/docs/ops/MERGE_TRAIN.md) · 🇹🇭 [th](../../../th/docs/ops/MERGE_TRAIN.md) · 🇹🇷 [tr](../../../tr/docs/ops/MERGE_TRAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MERGE_TRAIN.md) · 🇵🇰 [ur](../../../ur/docs/ops/MERGE_TRAIN.md) · 🇺🇿 [uz](../../../uz/docs/ops/MERGE_TRAIN.md) · 🇻🇳 [vi](../../../vi/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [yo](../../../yo/docs/ops/MERGE_TRAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MERGE_TRAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MERGE_TRAIN.md)

---

Sedan v3.8.49 (WS3.2/WS3.4 i kvalitets-/hastighetsplanen) är standardsökvägen för att slå samman
granskade PR:er till `release/vX.Y.Z` **Mergifys sammanslagningskö** (`.mergify.yml`);
det **manuella sammanslagningståget** som dokumenteras nedan är RESERVLÖSNINGEN — det används vid incidenter,
releasefrysningar eller om Mergifys Open Source-plan någon gång ändras.

## Standardsökväg: Mergify-kön

1. PR:en granskas/får grönt ljus av kampanjerna och godkänns av ägarens ⭐-kontroll före sammanslagning
   (rapporten + beslut per objekt — se `/merge-prs` steg 0.75).
2. Ägaren (eller sessionen som agerar utifrån ägarens beslut) lägger till etiketten **`queue`**.
   Etiketten ÄR godkännandet för sammanslagning; Mergify verkställer det bara.
3. Mergify grupperar upp till 10 köade PR:er, validerar gruppen mot snabbkontrollerna
   och slår samman (squash). En röd grupp **delas automatiskt på mitten** — den felande PR:en
   isoleras efter cirka log2(N) omvalideringar och tas bort ur kön; resten fortsätter.
4. Efter sammanslagningen validerar det kontinuerliga release-green-arbetsflödet den nya spetsen vid push
   och öppnar ett ärende för spårbarhet om kombinationen orsakade en regression (aldrig automatisk återställning).

Skyddsräcken (speglar de hårda reglerna #21/#22 i `CLAUDE.md`):

- **Releasefrysning aktiv** → märk INTE PR:er som riktar sig mot den frysta grenen; rikta först om dem till
  den aktiva `release/vX+1`.
- **En annan sessions pågående PR** → märk den aldrig; endast den ägande sessionen köar
  sitt eget arbete.
- Diffar med enbart tester och PR:er märkta `hotfix` kör redan reducerad CI (se
  `RELEASE_CHECKLIST.md` → Hotfix Fast-Lane); kövillkoren accepterar den uppsättning
  kontroller som faktiskt kördes (`#check-failure=0` + `#check-pending=0`).

## Reservlösning: det manuella sammanslagningståget

Används när kön inte är tillgänglig. Detta formaliserar metoden som hanterade 33 PR:er på
en dag under v3.8.47-cykeln:

1. **Sätt samman gruppen** (~10–30 granskade och godkända PR:er). Kontrollera `linked:`-kollisioner
   (samma `tap.testFiles`, samma CHANGELOG-stycken) och serialisera dessa.
2. **Validera EN GÅNG**: i ett isolerat worktree från releasespetsen slår du samman alla gruppens
   huvuden lokalt och kör sedan den releaseekvivalenta sviten
   (`npm run check:release-green`, lägg till `--with-build` före en release).
   `scripts/release/merge-train.sh <base> <PR#>…` automatiserar steg 1–2 (PR:er med
   konflikter kastas av, tåget fortsätter). Fullständigt läge kör `npm run test:unit` — den
   maskinoptimerade köraren (`--test-concurrency=20`), **inte** de två sekventiella CI-delarna
   med 4 kärnor, vilka gjorde att den dominerande fasen använde ~25 % av en 16-kärnig maskin (åtgärdat
   2026-07-18). `--fast` (mega-tågtömningar inom samma dag, godkänt av ägaren 2026-07-18)
   behåller varje statisk kontroll + vitest men kör endast de node:test-filer som ändrats av de
   medtagna PR:erna; den FULLSTÄNDIGA sviten måste fortfarande köras minst en gång per dag på den
   ackumulerade spetsen (ett tåg utan `--fast`).
3. **Grönt** → slå samman PR:erna i följd (kontrollera `state,headRefOid` igen före varje —
   en PR vars huvud har flyttats återgår till granskning). Bevisa att nettodiffen för varje sammanslagning är
   PR:ens egen ändring (inga automatiska återställningar vid konfliktlösning: granska `git diff --stat` efter
   borttagningar utanför omfattningen).
4. **Rött** → dela gruppen i halvor (validera varje halva) i stället för att validera om
   en och en; skicka tillbaka den felande PR:en till granskningskön tillsammans med underlaget.
5. **Aldrig**: slå samman till den frysta grenen under en frysning; använda `git stash` någonstans;
   köra om hela CI i hopp om att ett rött resultat försvinner (regel: ett rött resultat är information).

## Nivåindelning (varför kön är säker med endast snabbkontroller)

- **Per PR** (snabbkontroller i quality.yml): TIA-påverkade tester + fullständig enhetstestning i 4 delar +
  vitest + lint-samling + typkontroll + integritetskontroll av dokumentation/ändringslogg.
- **Per grupp/spets** (kontinuerlig release-green): `--quick` HÅRDA kontroller vid varje push till
  releasegrenen; fullständiga `--with-build --full-ci`-körningar 3×/dag.
- **Per release** (ci.yml för release-PR:en): hela matrisen inkl. E2E ×9,
  paketartefakt + grundläggande starttest från tarball, täckning/spärrhakar.

Inget valideras mindre än tidigare — den tunga ytan körs bara per grupp/spets
i stället för per PR, vilket är det som tar bort O(N)-rundturerna.
