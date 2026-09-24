# Merge Queue & Manual Merge-Train Runbook (Norsk)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MERGE_TRAIN.md) · 🇪🇹 [am](../../../am/docs/ops/MERGE_TRAIN.md) · 🇸🇦 [ar](../../../ar/docs/ops/MERGE_TRAIN.md) · 🇦🇿 [az](../../../az/docs/ops/MERGE_TRAIN.md) · 🇧🇬 [bg](../../../bg/docs/ops/MERGE_TRAIN.md) · 🇧🇩 [bn](../../../bn/docs/ops/MERGE_TRAIN.md) · 🇧🇦 [bs](../../../bs/docs/ops/MERGE_TRAIN.md) · 🇨🇿 [cs](../../../cs/docs/ops/MERGE_TRAIN.md) · 🇩🇰 [da](../../../da/docs/ops/MERGE_TRAIN.md) · 🇩🇪 [de](../../../de/docs/ops/MERGE_TRAIN.md) · 🇬🇷 [el](../../../el/docs/ops/MERGE_TRAIN.md) · 🇪🇸 [es](../../../es/docs/ops/MERGE_TRAIN.md) · 🇪🇪 [et](../../../et/docs/ops/MERGE_TRAIN.md) · 🇮🇷 [fa](../../../fa/docs/ops/MERGE_TRAIN.md) · 🇫🇮 [fi](../../../fi/docs/ops/MERGE_TRAIN.md) · 🇫🇷 [fr](../../../fr/docs/ops/MERGE_TRAIN.md) · 🇮🇪 [ga](../../../ga/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [gu](../../../gu/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ha](../../../ha/docs/ops/MERGE_TRAIN.md) · 🇮🇱 [he](../../../he/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [hi](../../../hi/docs/ops/MERGE_TRAIN.md) · 🇭🇷 [hr](../../../hr/docs/ops/MERGE_TRAIN.md) · 🇭🇺 [hu](../../../hu/docs/ops/MERGE_TRAIN.md) · 🇦🇲 [hy](../../../hy/docs/ops/MERGE_TRAIN.md) · 🇮🇩 [id](../../../id/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ig](../../../ig/docs/ops/MERGE_TRAIN.md) · 🇮🇹 [it](../../../it/docs/ops/MERGE_TRAIN.md) · 🇯🇵 [ja](../../../ja/docs/ops/MERGE_TRAIN.md) · 🇬🇪 [ka](../../../ka/docs/ops/MERGE_TRAIN.md) · 🇰🇭 [km](../../../km/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [kn](../../../kn/docs/ops/MERGE_TRAIN.md) · 🇰🇷 [ko](../../../ko/docs/ops/MERGE_TRAIN.md) · 🇱🇹 [lt](../../../lt/docs/ops/MERGE_TRAIN.md) · 🇱🇻 [lv](../../../lv/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ml](../../../ml/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [mr](../../../mr/docs/ops/MERGE_TRAIN.md) · 🇲🇾 [ms](../../../ms/docs/ops/MERGE_TRAIN.md) · 🇲🇹 [mt](../../../mt/docs/ops/MERGE_TRAIN.md) · 🇲🇲 [my](../../../my/docs/ops/MERGE_TRAIN.md) · 🇳🇵 [ne](../../../ne/docs/ops/MERGE_TRAIN.md) · 🇳🇱 [nl](../../../nl/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [or](../../../or/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [pa](../../../pa/docs/ops/MERGE_TRAIN.md) · 🇵🇭 [phi](../../../phi/docs/ops/MERGE_TRAIN.md) · 🇵🇱 [pl](../../../pl/docs/ops/MERGE_TRAIN.md) · 🇵🇹 [pt](../../../pt/docs/ops/MERGE_TRAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MERGE_TRAIN.md) · 🇷🇴 [ro](../../../ro/docs/ops/MERGE_TRAIN.md) · 🇷🇺 [ru](../../../ru/docs/ops/MERGE_TRAIN.md) · 🇱🇰 [si](../../../si/docs/ops/MERGE_TRAIN.md) · 🇸🇰 [sk](../../../sk/docs/ops/MERGE_TRAIN.md) · 🇸🇮 [sl](../../../sl/docs/ops/MERGE_TRAIN.md) · 🇷🇸 [sr](../../../sr/docs/ops/MERGE_TRAIN.md) · 🇸🇪 [sv](../../../sv/docs/ops/MERGE_TRAIN.md) · 🇰🇪 [sw](../../../sw/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ta](../../../ta/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [te](../../../te/docs/ops/MERGE_TRAIN.md) · 🇹🇭 [th](../../../th/docs/ops/MERGE_TRAIN.md) · 🇹🇷 [tr](../../../tr/docs/ops/MERGE_TRAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MERGE_TRAIN.md) · 🇵🇰 [ur](../../../ur/docs/ops/MERGE_TRAIN.md) · 🇺🇿 [uz](../../../uz/docs/ops/MERGE_TRAIN.md) · 🇻🇳 [vi](../../../vi/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [yo](../../../yo/docs/ops/MERGE_TRAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MERGE_TRAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MERGE_TRAIN.md)

---

Siden v3.8.49 (WS3.2/WS3.4 i kvalitets-/hastighetsplanen) er standardbanen for fletting av
gjennomgåtte PR-er inn i `release/vX.Y.Z` **Mergify-flettekøen** (`.mergify.yml`);
det **manuelle flettetoget** som er dokumentert nedenfor, er RESERVELØSNINGEN — brukt under hendelser,
utgivelsesfrys eller hvis Mergifys Open Source-plan noen gang endres.

## Standardbane: Mergify-køen

1. PR-en gjennomgås/får grønt lys av kampanjene og godkjennes gjennom eierens ⭐-port
   før fletting (rapporten + avgjørelse per element — se `/merge-prs` trinn 0.75).
2. Eieren (eller økten som handler på grunnlag av eierens avgjørelse) legger til **`queue`**-
   etiketten. Etiketten ER flettegodkjenningen; Mergify utfører den bare.
3. Mergify grupperer opptil 10 PR-er i kø, validerer gruppen mot hurtigportene
   og fletter dem inn (squash). En rød gruppe **halveres automatisk** — den problematiske PR-en
   isoleres etter ~log2(N) revalideringer og fjernes fra køen; resten fortsetter.
4. Etter fletting validerer den kontinuerlige release-green-arbeidsflyten den nye spissen ved push
   og oppretter en attribusjonssak hvis kombinasjonen førte til en regresjon (aldri automatisk tilbakestilling).

Sikkerhetsmekanismer (gjenspeiler `CLAUDE.md`’s absolutte regler nr. 21/22):

- **Utgivelsesfrys aktiv** → IKKE merk PR-er som er rettet mot den fryste grenen; endre først målet til
  den aktive `release/vX+1`.
- **En annen økts pågående PR** → merk den aldri; bare eierøkten setter sitt eget arbeid
  i kø.
- Differ som bare inneholder tester, og PR-er med `hotfix`-etiketten kjører allerede redusert CI (se
  `RELEASE_CHECKLIST.md` → Hotfix Fast-Lane); købetingelsene godtar sjekksettet som
  faktisk ble kjørt (`#check-failure=0` + `#check-pending=0`).

## Reserveløsning: det manuelle flettetoget

Brukes når køen er utilgjengelig. Dette formaliserer praksisen som behandlet 33 PR-er på
én dag under v3.8.47-syklusen:

1. **Sett sammen gruppen** (~10–30 gjennomgåtte+godkjente PR-er). Se etter `linked:`-kollisjoner
   (samme `tap.testFiles`, samme CHANGELOG-bolker) og kjør disse sekvensielt.
2. **Valider ÉN GANG**: I et isolert worktree basert på utgivelsesspissen flettes alle gruppens
   head-er lokalt, og kjør deretter testpakken tilsvarende en utgivelse
   (`npm run check:release-green`, legg til `--with-build` før en utgivelse).
   `scripts/release/merge-train.sh <base> <PR#>…` automatiserer trinn 1–2 (PR-er med
   konflikter støtes ut, toget fortsetter). Full modus kjører `npm run test:unit` — den
   maskintilpassede kjøreren (`--test-concurrency=20`), **ikke** de to sekvensielle CI-delene
   med 4 kjerner, som kjørte den dominerende fasen på ~25 % av en maskin med 16 kjerner (rettet
   2026-07-18). `--fast` (tømming av svært store tog i løpet av dagen, eiergodkjent 2026-07-18)
   beholder alle statiske porter + vitest, men kjører bare node:test-filene som er endret av
   PR-ene om bord; HELE testpakken må fortsatt kjøres minst én gang per dag på den
   akkumulerte spissen (ett tog uten `--fast`).
3. **Grønt** → flett PR-ene i rekkefølge (kontroller `state,headRefOid` på nytt før hver —
   en PR der head har flyttet seg, går tilbake til gjennomgang). Bevis at nettdiffen fra hver fletting er
   PR-ens egen endring (ingen automatiske tilbakestillinger ved konfliktløsning: kontroller `git diff --stat` for
   slettinger utenfor omfanget).
4. **Rødt** → halver gruppen (valider hver halvdel) i stedet for å revalidere
   én etter én; send den problematiske PR-en tilbake til gjennomgangskøen med dokumentasjonen.
5. **Aldri**: flett inn i den fryste grenen under en utgivelsesfrys; bruk `git stash` noe sted;
   kjør hele CI på nytt i håp om at en rød status forsvinner (regel: rødt er informasjon).

## Nivåinndeling (hvorfor køen er trygg med bare hurtigporter)

- **Per PR** (quality.yml-hurtigporter): TIA-berørte tester + full enhetstest med 4 deler +
  vitest + lint-samling + typecheck + integritetskontroll av dokumentasjon/endringslogg.
- **Per gruppe/spiss** (kontinuerlig release-green): `--quick`-HARD-porter ved hver push til
  utgivelsesgrenen; fullstendige `--with-build --full-ci`-gjennomkjøringer 3×/dag.
- **Per utgivelse** (ci.yml på utgivelses-PR-en): den komplette matrisen inkl. E2E ×9,
  pakkeartefakt + oppstarts-røyktest av tarball, coverage/ratchets.

Ingenting valideres mindre enn før — den tunge testflaten kjøres bare per gruppe/spiss
i stedet for per PR, og det er dette som fjerner O(N)-rundturene.
