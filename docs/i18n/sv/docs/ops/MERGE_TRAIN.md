# Merge Queue & Manual Merge-Train Runbook (Svenska)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MERGE_TRAIN.md) · 🇪🇹 [am](../../../am/docs/ops/MERGE_TRAIN.md) · 🇸🇦 [ar](../../../ar/docs/ops/MERGE_TRAIN.md) · 🇦🇿 [az](../../../az/docs/ops/MERGE_TRAIN.md) · 🇧🇬 [bg](../../../bg/docs/ops/MERGE_TRAIN.md) · 🇧🇩 [bn](../../../bn/docs/ops/MERGE_TRAIN.md) · 🇧🇦 [bs](../../../bs/docs/ops/MERGE_TRAIN.md) · 🇨🇿 [cs](../../../cs/docs/ops/MERGE_TRAIN.md) · 🇩🇰 [da](../../../da/docs/ops/MERGE_TRAIN.md) · 🇩🇪 [de](../../../de/docs/ops/MERGE_TRAIN.md) · 🇬🇷 [el](../../../el/docs/ops/MERGE_TRAIN.md) · 🇪🇸 [es](../../../es/docs/ops/MERGE_TRAIN.md) · 🇪🇪 [et](../../../et/docs/ops/MERGE_TRAIN.md) · 🇮🇷 [fa](../../../fa/docs/ops/MERGE_TRAIN.md) · 🇫🇮 [fi](../../../fi/docs/ops/MERGE_TRAIN.md) · 🇫🇷 [fr](../../../fr/docs/ops/MERGE_TRAIN.md) · 🇮🇪 [ga](../../../ga/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [gu](../../../gu/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ha](../../../ha/docs/ops/MERGE_TRAIN.md) · 🇮🇱 [he](../../../he/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [hi](../../../hi/docs/ops/MERGE_TRAIN.md) · 🇭🇷 [hr](../../../hr/docs/ops/MERGE_TRAIN.md) · 🇭🇺 [hu](../../../hu/docs/ops/MERGE_TRAIN.md) · 🇦🇲 [hy](../../../hy/docs/ops/MERGE_TRAIN.md) · 🇮🇩 [id](../../../id/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ig](../../../ig/docs/ops/MERGE_TRAIN.md) · 🇮🇹 [it](../../../it/docs/ops/MERGE_TRAIN.md) · 🇯🇵 [ja](../../../ja/docs/ops/MERGE_TRAIN.md) · 🇬🇪 [ka](../../../ka/docs/ops/MERGE_TRAIN.md) · 🇰🇭 [km](../../../km/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [kn](../../../kn/docs/ops/MERGE_TRAIN.md) · 🇰🇷 [ko](../../../ko/docs/ops/MERGE_TRAIN.md) · 🇱🇹 [lt](../../../lt/docs/ops/MERGE_TRAIN.md) · 🇱🇻 [lv](../../../lv/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ml](../../../ml/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [mr](../../../mr/docs/ops/MERGE_TRAIN.md) · 🇲🇾 [ms](../../../ms/docs/ops/MERGE_TRAIN.md) · 🇲🇹 [mt](../../../mt/docs/ops/MERGE_TRAIN.md) · 🇲🇲 [my](../../../my/docs/ops/MERGE_TRAIN.md) · 🇳🇵 [ne](../../../ne/docs/ops/MERGE_TRAIN.md) · 🇳🇱 [nl](../../../nl/docs/ops/MERGE_TRAIN.md) · 🇳🇴 [no](../../../no/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [or](../../../or/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [pa](../../../pa/docs/ops/MERGE_TRAIN.md) · 🇵🇭 [phi](../../../phi/docs/ops/MERGE_TRAIN.md) · 🇵🇱 [pl](../../../pl/docs/ops/MERGE_TRAIN.md) · 🇵🇹 [pt](../../../pt/docs/ops/MERGE_TRAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MERGE_TRAIN.md) · 🇷🇴 [ro](../../../ro/docs/ops/MERGE_TRAIN.md) · 🇷🇺 [ru](../../../ru/docs/ops/MERGE_TRAIN.md) · 🇱🇰 [si](../../../si/docs/ops/MERGE_TRAIN.md) · 🇸🇰 [sk](../../../sk/docs/ops/MERGE_TRAIN.md) · 🇸🇮 [sl](../../../sl/docs/ops/MERGE_TRAIN.md) · 🇷🇸 [sr](../../../sr/docs/ops/MERGE_TRAIN.md) · 🇰🇪 [sw](../../../sw/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ta](../../../ta/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [te](../../../te/docs/ops/MERGE_TRAIN.md) · 🇹🇭 [th](../../../th/docs/ops/MERGE_TRAIN.md) · 🇹🇷 [tr](../../../tr/docs/ops/MERGE_TRAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MERGE_TRAIN.md) · 🇵🇰 [ur](../../../ur/docs/ops/MERGE_TRAIN.md) · 🇺🇿 [uz](../../../uz/docs/ops/MERGE_TRAIN.md) · 🇻🇳 [vi](../../../vi/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [yo](../../../yo/docs/ops/MERGE_TRAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MERGE_TRAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MERGE_TRAIN.md)

---

Sedan v3.8.49 (WS3.2/WS3.4 i kvalitets-/hastighetsplanen) är standardsökvägen för att
sammanfoga granskade PR:er till `release/vX.Y.Z` **Mergifys sammanfogningskö** (`.mergify.yml`);
det **manuella sammanfogningståget** som dokumenteras nedan är RESERVLÖSNINGEN — det används vid incidenter,
releasefrysningar eller om Mergifys Open Source-plan någon gång ändras.

## Standardsökväg: Mergify-kön

1. PR:en granskas/grönmarkeras av kampanjerna och godkänns av ägarens ⭐-kontroll före sammanslagning
   (rapporten + beslutet per objekt – se `/merge-prs` steg 0.75).
2. Ägaren (eller sessionen som agerar utifrån ägarens beslut) lägger till etiketten **`queue`**.
   Etiketten ÄR godkännandet för sammanslagning; Mergify verkställer det bara.
3. Mergify validerar köade PR:er **sekventiellt** (en i taget) mot snabbkontrollerna
   och sammanfogar dem (squash). Buntning + automatisk bisektion kräver en betald Mergify-nivå
   ("Cannot use Merge Queue batch" i gratisplanen, #7220), så `.mergify.yml` anger ingen
   `batch_size`; buntning hanteras i stället av det manuella sammanslagningståget nedan. En PR vars
   kontroller fortfarande väntar efter `checks_timeout` (240 min = 2× uppmätt p95 för
   `quality.yml`) tas bort ur kön i stället för att blockera den.
4. Efter sammanslagningen validerar det kontinuerliga arbetsflödet för grön release den nya spetsen vid push
   och öppnar ett attribueringsärende om kombinationen har försämrats (återställ aldrig automatiskt).

Skyddsräcken (motsvarar de hårda reglerna #21/#22 i `CLAUDE.md`):

- **Releasefrysning pågår** → märk INTE PR:er som är riktade mot den frysta grenen; ändra först mål
  till den aktiva `release/vX+1`.
- **En annan sessions pågående PR** → märk den aldrig; endast den ägande sessionen köar
  sitt eget arbete.
- Diffar som endast innehåller tester och PR:er med etiketten `hotfix` kör redan reducerad CI (se
  `RELEASE_CHECKLIST.md` → Hotfix Fast-Lane); kövillkoren accepterar den uppsättning
  kontroller som faktiskt kördes (`#check-failure=0` + `#check-pending=0`).

## Reservlösning: det manuella sammanfogningståget

Används när kön inte är tillgänglig. Detta formaliserar den metod som tömde 33 PR:er på
en dag under v3.8.47-cykeln:

1. **Sätt samman gruppen** (cirka 10–30 granskade och godkända PR:er). Kontrollera `linked:`-kollisioner
   (samma `tap.testFiles`, samma CHANGELOG-avsnitt) och serialisera dessa.
2. **Validera EN GÅNG**: sammanfoga alla huvuden i gruppen lokalt i ett isolerat arbetsträd
   från releasespetsen och kör sedan den releaseekvivalenta sviten
   (`npm run check:release-green`, lägg till `--with-build` före en release).
   `scripts/release/merge-train.sh <base> <PR#>…` automatiserar steg 1–2 (PR:er med konflikter
   avlägsnas och tåget fortsätter). Fullständigt läge kör `npm run test:unit` — den
   maskinjusterade köraren (`--test-concurrency=20`), **inte** de två sekventiella CI-delarna
   med 4 kärnor, vilka körde den dominerande fasen med cirka 25 % av en maskin med 16 kärnor (åtgärdat
   2026-07-18). `--fast` (tömning av megatåg inom samma dag, ägargodkänd 2026-07-18)
   behåller varje statisk kontroll + vitest men kör endast de node:test-filer som ändrats av de
   ombordtagna PR:erna; den FULLSTÄNDIGA sviten måste fortfarande köras minst en gång per dag på den
   ackumulerade spetsen (ett tåg utan `--fast`).
3. **Grönt** → sammanfoga PR:erna i ordningsföljd (kontrollera `state,headRefOid` igen före varje —
   en PR vars huvud har flyttats går tillbaka till granskning). Bevisa att nettodiffen för varje sammanfogning är
   PR:ens egen ändring (inga återställningar genom automatisk konfliktlösning: granska `git diff --stat` efter
   raderingar utanför omfånget).
4. **Rött** → bisektera gruppen i halvor (validera varje halva) i stället för att omvalidera
   en och en; skicka tillbaka den felande PR:en till granskningskön tillsammans med bevisen.
5. **Aldrig**: sammanfoga till den frysta grenen under en frysning; använd `git stash` någonstans;
   kör om all CI i hopp om att rött försvinner (regel: rött är information).

## Nivåindelning (varför kön är säker med enbart snabbkontroller)

- **Per PR** (snabbkontroller i quality.yml): TIA-påverkade tester + fullständig enhetstestning med 4 delar +
  vitest + lintpaket + typkontroll + integritetskontroll av dokumentation/ändringslogg.
- **Per grupp/spets** (kontinuerlig release-green): HÅRDA `--quick`-kontroller vid varje push till
  releasegrenen; fullständiga `--with-build --full-ci`-genomgångar 3×/dag.
- **Per release** (ci.yml på release-PR:en): den fullständiga matrisen inkl. E2E ×9,
  paketartefakt + starttest av tarball, täckning/spärrar.

Inget valideras mindre än tidigare — den tunga ytan körs bara per grupp/spets
i stället för per PR, vilket är det som eliminerar O(N)-rundorna.

## Förutsättningar för `merge-train.sh` vid en ny utcheckning

Skriptet kör en **förkontroll** med omedelbart avbrott vid fel på rotutcheckningen (före allt arbete
med arbetsträd), så att en trasig installation aldrig kan ge sken av att vara ett rött tåg:

1. `npm ci`, kör sedan den `bun`-efterinstallation som npm blockerar:
   `(cd node_modules/bun && node install.js)` — annars misslyckas `check:provider-consistency`
   och `check:known-symbols` (båda `bun scripts/…`) på tåget OCH basen utan
   någon överträdelsesrad.
2. Ingen främmande `node_modules/node_modules` (ett duplicerat beroendeträd; React laddas två gånger
   och UI-vitest-sviter misslyckas omedelbart).
3. `node_modules/.bin/tsc` finns och är körbar (en ofullständig installation saknar den).

Tåget kör den blockerande `npm run check:cycles:ratchet`; enbart `npm run check:cycles`
är rådgivande (det listar SCC:erna och avslutas med en kod skild från noll även på en felfri bas).
