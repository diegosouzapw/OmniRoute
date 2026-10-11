# Merge Queue & Manual Merge-Train Runbook (Norsk)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MERGE_TRAIN.md) · 🇪🇹 [am](../../../am/docs/ops/MERGE_TRAIN.md) · 🇸🇦 [ar](../../../ar/docs/ops/MERGE_TRAIN.md) · 🇦🇿 [az](../../../az/docs/ops/MERGE_TRAIN.md) · 🇧🇬 [bg](../../../bg/docs/ops/MERGE_TRAIN.md) · 🇧🇩 [bn](../../../bn/docs/ops/MERGE_TRAIN.md) · 🇧🇦 [bs](../../../bs/docs/ops/MERGE_TRAIN.md) · 🇨🇿 [cs](../../../cs/docs/ops/MERGE_TRAIN.md) · 🇩🇰 [da](../../../da/docs/ops/MERGE_TRAIN.md) · 🇩🇪 [de](../../../de/docs/ops/MERGE_TRAIN.md) · 🇬🇷 [el](../../../el/docs/ops/MERGE_TRAIN.md) · 🇪🇸 [es](../../../es/docs/ops/MERGE_TRAIN.md) · 🇪🇪 [et](../../../et/docs/ops/MERGE_TRAIN.md) · 🇮🇷 [fa](../../../fa/docs/ops/MERGE_TRAIN.md) · 🇫🇮 [fi](../../../fi/docs/ops/MERGE_TRAIN.md) · 🇫🇷 [fr](../../../fr/docs/ops/MERGE_TRAIN.md) · 🇮🇪 [ga](../../../ga/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [gu](../../../gu/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ha](../../../ha/docs/ops/MERGE_TRAIN.md) · 🇮🇱 [he](../../../he/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [hi](../../../hi/docs/ops/MERGE_TRAIN.md) · 🇭🇷 [hr](../../../hr/docs/ops/MERGE_TRAIN.md) · 🇭🇺 [hu](../../../hu/docs/ops/MERGE_TRAIN.md) · 🇦🇲 [hy](../../../hy/docs/ops/MERGE_TRAIN.md) · 🇮🇩 [id](../../../id/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ig](../../../ig/docs/ops/MERGE_TRAIN.md) · 🇮🇹 [it](../../../it/docs/ops/MERGE_TRAIN.md) · 🇯🇵 [ja](../../../ja/docs/ops/MERGE_TRAIN.md) · 🇬🇪 [ka](../../../ka/docs/ops/MERGE_TRAIN.md) · 🇰🇭 [km](../../../km/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [kn](../../../kn/docs/ops/MERGE_TRAIN.md) · 🇰🇷 [ko](../../../ko/docs/ops/MERGE_TRAIN.md) · 🇱🇹 [lt](../../../lt/docs/ops/MERGE_TRAIN.md) · 🇱🇻 [lv](../../../lv/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ml](../../../ml/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [mr](../../../mr/docs/ops/MERGE_TRAIN.md) · 🇲🇾 [ms](../../../ms/docs/ops/MERGE_TRAIN.md) · 🇲🇹 [mt](../../../mt/docs/ops/MERGE_TRAIN.md) · 🇲🇲 [my](../../../my/docs/ops/MERGE_TRAIN.md) · 🇳🇵 [ne](../../../ne/docs/ops/MERGE_TRAIN.md) · 🇳🇱 [nl](../../../nl/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [or](../../../or/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [pa](../../../pa/docs/ops/MERGE_TRAIN.md) · 🇵🇭 [phi](../../../phi/docs/ops/MERGE_TRAIN.md) · 🇵🇱 [pl](../../../pl/docs/ops/MERGE_TRAIN.md) · 🇵🇹 [pt](../../../pt/docs/ops/MERGE_TRAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MERGE_TRAIN.md) · 🇷🇴 [ro](../../../ro/docs/ops/MERGE_TRAIN.md) · 🇷🇺 [ru](../../../ru/docs/ops/MERGE_TRAIN.md) · 🇱🇰 [si](../../../si/docs/ops/MERGE_TRAIN.md) · 🇸🇰 [sk](../../../sk/docs/ops/MERGE_TRAIN.md) · 🇸🇮 [sl](../../../sl/docs/ops/MERGE_TRAIN.md) · 🇷🇸 [sr](../../../sr/docs/ops/MERGE_TRAIN.md) · 🇸🇪 [sv](../../../sv/docs/ops/MERGE_TRAIN.md) · 🇰🇪 [sw](../../../sw/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ta](../../../ta/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [te](../../../te/docs/ops/MERGE_TRAIN.md) · 🇹🇭 [th](../../../th/docs/ops/MERGE_TRAIN.md) · 🇹🇷 [tr](../../../tr/docs/ops/MERGE_TRAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MERGE_TRAIN.md) · 🇵🇰 [ur](../../../ur/docs/ops/MERGE_TRAIN.md) · 🇺🇿 [uz](../../../uz/docs/ops/MERGE_TRAIN.md) · 🇻🇳 [vi](../../../vi/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [yo](../../../yo/docs/ops/MERGE_TRAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MERGE_TRAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MERGE_TRAIN.md)

---

Siden v3.8.49 (WS3.2/WS3.4 i kvalitets-/hastighetsplanen) er standardbanen for
sammenslåing av gjennomgåtte PR-er til `release/vX.Y.Z` **Mergify-køen for sammenslåing** (`.mergify.yml`);
det **manuelle sammenslåingstoget** som er dokumentert nedenfor, er RESERVELØSNINGEN — brukt ved hendelser,
utgivelsesfrys eller dersom Mergifys Open Source-abonnement noen gang endres.

## Standardflyt: Mergify-køen

1. PR-en gjennomgås/godkjennes av kampanjene og godkjennes av eierens ⭐-port før sammenslåing
   (rapporten + avgjørelsen per element — se `/merge-prs` trinn 0.75).
2. Eieren (eller økten som handler på grunnlag av eierens avgjørelse) bruker etiketten **`queue`**.
   Etiketten ER godkjenningen for sammenslåing; Mergify utfører den bare.
3. Mergify validerer PR-er i køen **sekvensielt** (én om gangen) mot hurtigkontrollene
   og slår dem sammen (squash). Batching + automatisk biseksjon krever et betalt Mergify-nivå
   ("Cannot use Merge Queue batch" med gratisabonnementet, #7220), så `.mergify.yml` angir ingen
   `batch_size`; batching er fortsatt oppgaven til det manuelle sammenslåingstoget nedenfor. En PR
   der kontrollene fortsatt venter etter `checks_timeout` (240 min = 2× målt p95 for
   `quality.yml`), tas ut av køen i stedet for å blokkere den.
4. Etter sammenslåing validerer den kontinuerlige arbeidsflyten for utgivelsesgodkjenning den nye
   spissen ved push og oppretter en attribusjonssak hvis kombinasjonen har regrediert (aldri
   automatisk tilbakestilling).

Sikkerhetsmekanismer (gjenspeiler de ufravikelige reglene #21/#22 i `CLAUDE.md`):

- **Aktiv utgivelsesfrys** → IKKE merk PR-er som retter seg mot den fryste grenen; endre først
  mål til den aktive `release/vX+1`.
- **En annen økts pågående PR** → merk den aldri; bare eierøkten setter sitt eget arbeid i kø.
- Differanser som bare gjelder tester, og PR-er merket med `hotfix`, kjører allerede redusert CI
  (se `RELEASE_CHECKLIST.md` → hurtigløp for hurtigrettinger); købetingelsene godtar det
  kontrollsettet som faktisk ble kjørt (`#check-failure=0` + `#check-pending=0`).

## Reserveløsning: det manuelle sammenslåingstoget

Brukes når køen er utilgjengelig. Dette formaliserer praksisen som behandlet 33 PR-er på
én dag under v3.8.47-syklusen:

1. **Sett sammen gruppen** (~10–30 gjennomgåtte og godkjente PR-er). Se etter `linked:`-kollisjoner
   (samme `tap.testFiles`, samme CHANGELOG-seksjoner), og behandle disse sekvensielt.
2. **Valider ÉN GANG**: I et isolert worktree basert på utgivelsesspissen slår du sammen alle
   gruppegrenene lokalt og kjører deretter den utgivelsesekvivalente pakken
   (`npm run check:release-green`; legg til `--with-build` før en utgivelse).
   `scripts/release/merge-train.sh <base> <PR#>…` automatiserer trinn 1–2 (PR-er med
   konflikter kobles fra, og toget fortsetter). Full modus kjører `npm run test:unit` — den
   maskintilpassede kjøringen (`--test-concurrency=20`), **ikke** de to sekvensielle CI-delene
   med 4 kjerner, som kjørte den dominerende fasen på ~25 % av en maskin med 16 kjerner (rettet
   2026-07-18). `--fast` (tømming av svært store tog i løpet av dagen, godkjent av eieren 2026-07-18)
   beholder alle statiske porter + vitest, men kjører bare node:test-filene som er endret av
   PR-ene om bord; HELE pakken må fortsatt kjøres minst én gang per dag på den
   akkumulerte spissen (ett tog uten `--fast`).
3. **Grønt** → slå sammen PR-ene i rekkefølge (kontroller `state,headRefOid` på nytt før hver —
   en PR hvis head har flyttet seg, må gjennomgås på nytt). Bevis at nettodiffen for hver sammenslåing er
   PR-ens egen endring (ingen automatisk konfliktløsing som tilbakefører endringer: kontroller `git diff --stat` for
   slettinger utenfor omfanget).
4. **Rødt** → halver gruppen (valider hver halvdel) i stedet for å revalidere
   én og én; send den problematiske PR-en tilbake til gjennomgangskøen sammen med dokumentasjonen.
5. **Aldri**: slå sammen til den fryste grenen under en utgivelsesfrys; bruk `git stash` noe sted;
   kjør all CI på nytt i håp om at rødt forsvinner (regel: rødt er informasjon).

## Nivåinndeling (hvorfor køen er trygg med bare hurtigporter)

- **Per PR** (hurtigporter i quality.yml): TIA-berørte tester + alle enhetstester i 4 deler +
  vitest + lint-pakke + typecheck + integritetskontroll av dokumentasjon/endringslogg.
- **Per gruppe/spiss** (kontinuerlig grønn utgivelse): HARDE `--quick`-porter ved hver push til
  utgivelsesgrenen; fullstendige `--with-build --full-ci`-gjennomkjøringer 3×/dag.
- **Per utgivelse** (ci.yml på utgivelses-PR-en): hele matrisen, inkl. E2E ×9,
  pakkeartifakt + oppstarts-røyktest av tarball, dekning/terskler.

Ingenting valideres mindre enn før — den tunge overflaten kjøres bare per gruppe/spiss
i stedet for per PR, og det er dette som fjerner O(N) tur-retur-kjøringene.

## Forutsetninger for `merge-train.sh` ved en ny utsjekking

Skriptet kjører en **forhåndskontroll** med umiddelbar avbrytelse på rotutsjekkingen (før noe arbeid
i worktree), slik at en ødelagt installasjon aldri kan fremstå som et rødt tog:

1. `npm ci`, og kjør deretter `bun`-etterinstallasjonen som npm blokkerer:
   `(cd node_modules/bun && node install.js)` — ellers feiler `check:provider-consistency`
   og `check:known-symbols` (begge `bun scripts/…`) både på toget OG på basen uten
   noen linje som angir et regelbrudd.
2. Ingen uvedkommende `node_modules/node_modules` (et duplisert avhengighetstre; React lastes to ganger,
   og UI-vitest-pakkene feiler umiddelbart).
3. `node_modules/.bin/tsc` må finnes og være kjørbar (en ufullstendig installasjon mangler den).

Toget kjører den blokkerende `npm run check:cycles:ratchet`; vanlig `npm run check:cycles`
er kun veiledende (den viser SCC-ene og avsluttes med en annen status enn null, selv på en frisk base).
