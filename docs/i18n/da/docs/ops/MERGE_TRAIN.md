# Merge Queue & Manual Merge-Train Runbook (Dansk)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MERGE_TRAIN.md) · 🇪🇹 [am](../../../am/docs/ops/MERGE_TRAIN.md) · 🇸🇦 [ar](../../../ar/docs/ops/MERGE_TRAIN.md) · 🇦🇿 [az](../../../az/docs/ops/MERGE_TRAIN.md) · 🇧🇬 [bg](../../../bg/docs/ops/MERGE_TRAIN.md) · 🇧🇩 [bn](../../../bn/docs/ops/MERGE_TRAIN.md) · 🇧🇦 [bs](../../../bs/docs/ops/MERGE_TRAIN.md) · 🇨🇿 [cs](../../../cs/docs/ops/MERGE_TRAIN.md) · 🇩🇪 [de](../../../de/docs/ops/MERGE_TRAIN.md) · 🇬🇷 [el](../../../el/docs/ops/MERGE_TRAIN.md) · 🇪🇸 [es](../../../es/docs/ops/MERGE_TRAIN.md) · 🇪🇪 [et](../../../et/docs/ops/MERGE_TRAIN.md) · 🇮🇷 [fa](../../../fa/docs/ops/MERGE_TRAIN.md) · 🇫🇮 [fi](../../../fi/docs/ops/MERGE_TRAIN.md) · 🇫🇷 [fr](../../../fr/docs/ops/MERGE_TRAIN.md) · 🇮🇪 [ga](../../../ga/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [gu](../../../gu/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ha](../../../ha/docs/ops/MERGE_TRAIN.md) · 🇮🇱 [he](../../../he/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [hi](../../../hi/docs/ops/MERGE_TRAIN.md) · 🇭🇷 [hr](../../../hr/docs/ops/MERGE_TRAIN.md) · 🇭🇺 [hu](../../../hu/docs/ops/MERGE_TRAIN.md) · 🇦🇲 [hy](../../../hy/docs/ops/MERGE_TRAIN.md) · 🇮🇩 [id](../../../id/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ig](../../../ig/docs/ops/MERGE_TRAIN.md) · 🇮🇹 [it](../../../it/docs/ops/MERGE_TRAIN.md) · 🇯🇵 [ja](../../../ja/docs/ops/MERGE_TRAIN.md) · 🇬🇪 [ka](../../../ka/docs/ops/MERGE_TRAIN.md) · 🇰🇭 [km](../../../km/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [kn](../../../kn/docs/ops/MERGE_TRAIN.md) · 🇰🇷 [ko](../../../ko/docs/ops/MERGE_TRAIN.md) · 🇱🇹 [lt](../../../lt/docs/ops/MERGE_TRAIN.md) · 🇱🇻 [lv](../../../lv/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ml](../../../ml/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [mr](../../../mr/docs/ops/MERGE_TRAIN.md) · 🇲🇾 [ms](../../../ms/docs/ops/MERGE_TRAIN.md) · 🇲🇹 [mt](../../../mt/docs/ops/MERGE_TRAIN.md) · 🇲🇲 [my](../../../my/docs/ops/MERGE_TRAIN.md) · 🇳🇵 [ne](../../../ne/docs/ops/MERGE_TRAIN.md) · 🇳🇱 [nl](../../../nl/docs/ops/MERGE_TRAIN.md) · 🇳🇴 [no](../../../no/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [or](../../../or/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [pa](../../../pa/docs/ops/MERGE_TRAIN.md) · 🇵🇭 [phi](../../../phi/docs/ops/MERGE_TRAIN.md) · 🇵🇱 [pl](../../../pl/docs/ops/MERGE_TRAIN.md) · 🇵🇹 [pt](../../../pt/docs/ops/MERGE_TRAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MERGE_TRAIN.md) · 🇷🇴 [ro](../../../ro/docs/ops/MERGE_TRAIN.md) · 🇷🇺 [ru](../../../ru/docs/ops/MERGE_TRAIN.md) · 🇱🇰 [si](../../../si/docs/ops/MERGE_TRAIN.md) · 🇸🇰 [sk](../../../sk/docs/ops/MERGE_TRAIN.md) · 🇸🇮 [sl](../../../sl/docs/ops/MERGE_TRAIN.md) · 🇷🇸 [sr](../../../sr/docs/ops/MERGE_TRAIN.md) · 🇸🇪 [sv](../../../sv/docs/ops/MERGE_TRAIN.md) · 🇰🇪 [sw](../../../sw/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ta](../../../ta/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [te](../../../te/docs/ops/MERGE_TRAIN.md) · 🇹🇭 [th](../../../th/docs/ops/MERGE_TRAIN.md) · 🇹🇷 [tr](../../../tr/docs/ops/MERGE_TRAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MERGE_TRAIN.md) · 🇵🇰 [ur](../../../ur/docs/ops/MERGE_TRAIN.md) · 🇺🇿 [uz](../../../uz/docs/ops/MERGE_TRAIN.md) · 🇻🇳 [vi](../../../vi/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [yo](../../../yo/docs/ops/MERGE_TRAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MERGE_TRAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MERGE_TRAIN.md)

---

Siden v3.8.49 (WS3.2/WS3.4 i kvalitets-/hastighedsplanen) er standardflettevejen for
gennemgåede PR'er til `release/vX.Y.Z` **Mergify-flettekøen** (`.mergify.yml`);
det **manuelle flettetog**, der er dokumenteret nedenfor, er RESERVELØSNINGEN — den bruges under hændelser,
release-frysninger, eller hvis Mergifys Open Source-plan nogensinde ændres.

## Standardforløb: Mergify-køen

1. PR'en gennemgås/godkendes af kampagnerne og godkendes via ejerens ⭐-kontrol før fletning
   (rapporten + beslutningen for hvert element — se `/merge-prs` trin 0.75).
2. Ejeren (eller sessionen, der handler på ejerens beslutning) tilføjer etiketten **`queue`**.
   Etiketten ER godkendelsen til fletning; Mergify udfører den blot.
3. Mergify validerer PR'er i køen **sekventielt** (én ad gangen) mod de hurtige kontroller
   og fletter dem (squash). Batchkørsel + automatisk bisektion kræver et betalt Mergify-niveau
   ("Cannot use Merge Queue batch" på gratisabonnementet, #7220), så `.mergify.yml` angiver
   ingen `batch_size`; batchkørsel håndteres fortsat af det manuelle fletningstog nedenfor. En PR,
   hvis kontroller stadig afventer efter `checks_timeout` (240 min. = 2× den målte p95 for
   `quality.yml`), fjernes fra køen i stedet for at blokere den.
4. Efter fletning validerer den kontinuerlige release-green-arbejdsgang den nye spids ved push
   og opretter en sag med angivelse af årsagen, hvis kombinationen er gået tilbage (automatisk
   tilbagerulning udføres aldrig).

Sikkerhedsforanstaltninger (afspejler de hårde regler #21/#22 i `CLAUDE.md`):

- **Releasefrysning aktiv** → tilføj IKKE etiketter til PR'er, der er målrettet den frosne gren;
  omdiriger dem først til den aktive `release/vX+1`.
- **En anden sessions igangværende PR** → tilføj aldrig en etiket til den; kun den ejende
  session sætter sit eget arbejde i kø.
- Ændringer, der kun omfatter tests, og PR'er med etiketten `hotfix` kører allerede reduceret CI
  (se `RELEASE_CHECKLIST.md` → Hotfix-hurtigsporet); købetingelserne accepterer det sæt
  kontroller, der faktisk blev kørt (`#check-failure=0` + `#check-pending=0`).

## Reserveløsning: det manuelle flettetog

Bruges, når køen ikke er tilgængelig. Dette formaliserer den praksis, der behandlede 33 PR'er på
én dag under v3.8.47-cyklussen:

1. **Sammensæt batchen** (~10–30 gennemgåede og godkendte PR'er). Kontrollér `linked:`-kollisioner
   (samme `tap.testFiles`, samme CHANGELOG-afsnit), og behandl disse sekventielt.
2. **Validér ÉN GANG**: I et isoleret worktree baseret på release-spidsen flettes alle batchens
   heads lokalt, hvorefter den release-ækvivalente suite køres
   (`npm run check:release-green`; tilføj `--with-build` før en release).
   `scripts/release/merge-train.sh <base> <PR#>…` automatiserer trin 1–2 (konfliktramte
   PR'er skubbes ud, og toget fortsætter). Fuld tilstand kører `npm run test:unit` — den
   maskinoptimerede kørsel (`--test-concurrency=20`), **ikke** de to sekventielle CI-shards
   med 4 kerner, som fik den dominerende fase til kun at udnytte ~25 % af en maskine med 16 kerner (rettet
   2026-07-18). `--fast` (tømning af meget store tog inden for samme dag, ejergodkendt 2026-07-18)
   beholder alle statiske kontroller + vitest, men kører kun de node:test-filer, som er ændret af de
   medtagne PR'er; den FULDE suite skal stadig køres mindst én gang om dagen på den
   akkumulerede spids (ét tog uden `--fast`).
3. **Grøn** → flet PR'erne i rækkefølge (med ny kontrol af `state,headRefOid` før hver —
   en PR, hvis head er flyttet, sendes tilbage til gennemgang). Bevis, at nettoændringen fra hver fletning er
   PR'ens egen ændring (ingen automatiske konfliktløsninger, der tilbagefører ændringer: gennemgå `git diff --stat` for
   sletninger uden for omfanget).
4. **Rød** → halver batchen (validér hver halvdel) i stedet for at genvalidere
   én ad gangen; send den fejlende PR tilbage til gennemgangskøen sammen med dokumentationen.
5. **Aldrig**: flet til den frosne gren under en frysning; brug `git stash` nogen steder;
   genkør hele CI i håb om, at en rød status forsvinder (regel: en rød status er information).

## Niveauinddeling (derfor er køen sikker med kun hurtige kontroller)

- **Pr. PR** (hurtige kontroller i quality.yml): TIA-påvirkede tests + komplette enhedstests med 4 shards +
  vitest + lint-samlingen + typecheck + integritetskontrol af dokumentation/ændringslog.
- **Pr. batch/spids** (kontinuerlig release-green): `--quick`-kontroller, der SKAL bestås ved hvert push til
  release-grenen; fulde `--with-build --full-ci`-gennemløb 3×/dag.
- **Pr. release** (ci.yml på release-PR'en): den komplette matrix inkl. E2E ×9,
  pakkeartefakt + boot-smoke-test af tarball, dækning/skærpede tærskler.

Intet valideres mindre end før — den tunge overflade køres blot pr. batch/spids
i stedet for pr. PR, hvilket fjerner O(N)-rundturene.

## Forudsætninger for `merge-train.sh` ved en frisk checkout

Scriptet kører et **preflight** med hurtig afbrydelse på rod-checkouten (før noget worktree-arbejde),
så en defekt installation aldrig kan fremstå som et rødt tog:

1. `npm ci`, og kør derefter den `bun`-postinstallering, som npm blokerer:
   `(cd node_modules/bun && node install.js)` — ellers fejler `check:provider-consistency`
   og `check:known-symbols` (begge `bun scripts/…`) på både toget OG basen uden
   nogen overtrædelseslinje.
2. Ingen uvedkommende `node_modules/node_modules` (et dubleret afhængighedstræ; React indlæses to gange,
   og UI-vitest-suiter fejler øjeblikkeligt).
3. `node_modules/.bin/tsc` skal være til stede og kunne køres (en delvis installation mangler den).

Toget kører den blokerende `npm run check:cycles:ratchet`; en ren `npm run check:cycles`
er vejledende (den oplister SCC'erne og afslutter med en kode forskellig fra nul, selv på en sund base).
