# Merge Queue & Manual Merge-Train Runbook (Dansk)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MERGE_TRAIN.md) · 🇪🇹 [am](../../../am/docs/ops/MERGE_TRAIN.md) · 🇸🇦 [ar](../../../ar/docs/ops/MERGE_TRAIN.md) · 🇦🇿 [az](../../../az/docs/ops/MERGE_TRAIN.md) · 🇧🇬 [bg](../../../bg/docs/ops/MERGE_TRAIN.md) · 🇧🇩 [bn](../../../bn/docs/ops/MERGE_TRAIN.md) · 🇧🇦 [bs](../../../bs/docs/ops/MERGE_TRAIN.md) · 🇨🇿 [cs](../../../cs/docs/ops/MERGE_TRAIN.md) · 🇩🇪 [de](../../../de/docs/ops/MERGE_TRAIN.md) · 🇬🇷 [el](../../../el/docs/ops/MERGE_TRAIN.md) · 🇪🇸 [es](../../../es/docs/ops/MERGE_TRAIN.md) · 🇪🇪 [et](../../../et/docs/ops/MERGE_TRAIN.md) · 🇮🇷 [fa](../../../fa/docs/ops/MERGE_TRAIN.md) · 🇫🇮 [fi](../../../fi/docs/ops/MERGE_TRAIN.md) · 🇫🇷 [fr](../../../fr/docs/ops/MERGE_TRAIN.md) · 🇮🇪 [ga](../../../ga/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [gu](../../../gu/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ha](../../../ha/docs/ops/MERGE_TRAIN.md) · 🇮🇱 [he](../../../he/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [hi](../../../hi/docs/ops/MERGE_TRAIN.md) · 🇭🇷 [hr](../../../hr/docs/ops/MERGE_TRAIN.md) · 🇭🇺 [hu](../../../hu/docs/ops/MERGE_TRAIN.md) · 🇦🇲 [hy](../../../hy/docs/ops/MERGE_TRAIN.md) · 🇮🇩 [id](../../../id/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ig](../../../ig/docs/ops/MERGE_TRAIN.md) · 🇮🇹 [it](../../../it/docs/ops/MERGE_TRAIN.md) · 🇯🇵 [ja](../../../ja/docs/ops/MERGE_TRAIN.md) · 🇬🇪 [ka](../../../ka/docs/ops/MERGE_TRAIN.md) · 🇰🇭 [km](../../../km/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [kn](../../../kn/docs/ops/MERGE_TRAIN.md) · 🇰🇷 [ko](../../../ko/docs/ops/MERGE_TRAIN.md) · 🇱🇹 [lt](../../../lt/docs/ops/MERGE_TRAIN.md) · 🇱🇻 [lv](../../../lv/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ml](../../../ml/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [mr](../../../mr/docs/ops/MERGE_TRAIN.md) · 🇲🇾 [ms](../../../ms/docs/ops/MERGE_TRAIN.md) · 🇲🇹 [mt](../../../mt/docs/ops/MERGE_TRAIN.md) · 🇲🇲 [my](../../../my/docs/ops/MERGE_TRAIN.md) · 🇳🇵 [ne](../../../ne/docs/ops/MERGE_TRAIN.md) · 🇳🇱 [nl](../../../nl/docs/ops/MERGE_TRAIN.md) · 🇳🇴 [no](../../../no/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [or](../../../or/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [pa](../../../pa/docs/ops/MERGE_TRAIN.md) · 🇵🇭 [phi](../../../phi/docs/ops/MERGE_TRAIN.md) · 🇵🇱 [pl](../../../pl/docs/ops/MERGE_TRAIN.md) · 🇵🇹 [pt](../../../pt/docs/ops/MERGE_TRAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MERGE_TRAIN.md) · 🇷🇴 [ro](../../../ro/docs/ops/MERGE_TRAIN.md) · 🇷🇺 [ru](../../../ru/docs/ops/MERGE_TRAIN.md) · 🇱🇰 [si](../../../si/docs/ops/MERGE_TRAIN.md) · 🇸🇰 [sk](../../../sk/docs/ops/MERGE_TRAIN.md) · 🇸🇮 [sl](../../../sl/docs/ops/MERGE_TRAIN.md) · 🇷🇸 [sr](../../../sr/docs/ops/MERGE_TRAIN.md) · 🇸🇪 [sv](../../../sv/docs/ops/MERGE_TRAIN.md) · 🇰🇪 [sw](../../../sw/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ta](../../../ta/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [te](../../../te/docs/ops/MERGE_TRAIN.md) · 🇹🇭 [th](../../../th/docs/ops/MERGE_TRAIN.md) · 🇹🇷 [tr](../../../tr/docs/ops/MERGE_TRAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MERGE_TRAIN.md) · 🇵🇰 [ur](../../../ur/docs/ops/MERGE_TRAIN.md) · 🇺🇿 [uz](../../../uz/docs/ops/MERGE_TRAIN.md) · 🇻🇳 [vi](../../../vi/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [yo](../../../yo/docs/ops/MERGE_TRAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MERGE_TRAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MERGE_TRAIN.md)

---

Siden v3.8.49 (WS3.2/WS3.4 i kvalitets-/hastighedsplanen) er standardfletningsvejen for
gennemgåede PR'er ind i `release/vX.Y.Z` **Mergify-fletningskøen** (`.mergify.yml`);
det **manuelle merge train**, der er dokumenteret nedenfor, er RESERVELØSNINGEN — brugt under hændelser,
release freezes, eller hvis Mergify Open Source-abonnementet nogensinde ændres.

## Standardvej: Mergify-køen

1. PR'en gennemgås/grønmarkeres af kampagnerne og godkendes af ejerens pre-merge-⭐-
   gate (rapporten + beslutning pr. element — se `/merge-prs` trin 0.75).
2. Ejeren (eller sessionen, der handler på baggrund af ejerens beslutning) tilføjer
   labelen **`queue`**. Labelen ER fletningsgodkendelsen; Mergify udfører den blot.
3. Mergify samler op til 10 PR'er i kø i et batch, validerer batchet mod fast-gates
   og fletter (squash). Et rødt batch **bisekteres automatisk** — den fejlende PR
   isoleres med ~log2(N) genvalideringer og fjernes fra køen; resten fortsætter.
4. Efter fletningen validerer det kontinuerlige release-green-workflow den nye spids ved push
   og opretter en attribution issue, hvis kombinationen medførte en regression (aldrig automatisk tilbagerulning).

Sikkerhedsregler (afspejler `CLAUDE.md` Hard Rules #21/#22):

- **Release freeze aktiv** → tilføj IKKE labels til PR'er, der er målrettet den frosne branch; skift først mål til
  den aktive `release/vX+1`.
- **En anden sessions igangværende PR** → tilføj aldrig en label til den; kun den ejende session sætter
  sit eget arbejde i kø.
- Diffs, der kun omfatter tests, og PR'er med labelen `hotfix` kører allerede reduceret CI (se
  `RELEASE_CHECKLIST.md` → Hotfix Fast-Lane); købetingelserne accepterer det
  checksæt, der faktisk blev kørt (`#check-failure=0` + `#check-pending=0`).

## Reserveløsning: det manuelle merge train

Bruges, når køen ikke er tilgængelig. Dette formaliserer den praksis, der behandlede 33 PR'er på
én dag under v3.8.47-cyklussen:

1. **Sammensæt batchet** (~10–30 gennemgåede og godkendte PR'er). Kontrollér for `linked:`-kollisioner
   (samme `tap.testFiles`, samme CHANGELOG-hunks), og behandl dem sekventielt.
2. **Validér ÉN GANG**: I et isoleret worktree baseret på release-spidsen flettes alle batch-
   heads lokalt, hvorefter den release-ækvivalente suite køres
   (`npm run check:release-green`; tilføj `--with-build` før en release).
   `scripts/release/merge-train.sh <base> <PR#>…` automatiserer trin 1–2 (PR'er med konflikter
   afvises, og toget fortsætter). Fuld tilstand kører `npm run test:unit` — den
   maskinoptimerede runner (`--test-concurrency=20`), **ikke** de to sekventielle CI-shards med 4 kerner,
   som fik den dominerende fase til at bruge ~25 % af en maskine med 16 kerner (rettet
   2026-07-18). `--fast` (tømning af meget store merge trains i løbet af dagen, ejergodkendt 2026-07-18)
   beholder alle statiske gates + vitest, men kører kun de node:test-filer, som er ændret af de
   medtagne PR'er; den FULDE suite skal stadig køres mindst én gang om dagen på den
   akkumulerede spids (ét tog uden `--fast`).
3. **Grøn** → flet PR'erne i rækkefølge (med genkontrol af `state,headRefOid` før hver enkelt —
   en PR, hvis head er flyttet, sendes tilbage til gennemgang). Bevis, at nettodiffen for hver fletning er
   PR'ens egen ændring (ingen tilbagerulninger via automatisk konfliktløsning: gennemgå `git diff --stat` for
   sletninger uden for omfanget).
4. **Rød** → bisektér batchet i halvdele (validér hver halvdel) i stedet for at genvalidere
   én ad gangen; send den fejlende PR tilbage til gennemgangskøen med dokumentationen.
5. **Aldrig**: flet ind i den frosne branch under en freeze; brug `git stash` nogen steder;
   genkør CI ukritisk i håb om, at en rød status forsvinder (regel: en rød status er information).

## Niveauinddeling (hvorfor køen er sikker med kun fast-gates)

- **Pr. PR** (quality.yml fast-gates): TIA-påvirkede tests + fulde unit-tests med 4 shards +
  vitest + lint-pakken + typecheck + integritet af dokumentation/changelog.
- **Pr. batch/spids** (kontinuerlig release-green): `--quick` HARD gates ved hvert push til
  release-branchen; fulde `--with-build --full-ci`-gennemløb 3×/dag.
- **Pr. release** (ci.yml på release-PR'en): den komplette matrix inkl. E2E ×9,
  package-artifact + tarball boot-smoke, coverage/ratchets.

Intet valideres mindre end før — den tunge del kører blot pr. batch/spids
i stedet for pr. PR, hvilket er det, der fjerner O(N)-rundturene.
