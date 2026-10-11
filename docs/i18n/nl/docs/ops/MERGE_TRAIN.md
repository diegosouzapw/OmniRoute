# Merge Queue & Manual Merge-Train Runbook (Nederlands)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MERGE_TRAIN.md) · 🇪🇹 [am](../../../am/docs/ops/MERGE_TRAIN.md) · 🇸🇦 [ar](../../../ar/docs/ops/MERGE_TRAIN.md) · 🇦🇿 [az](../../../az/docs/ops/MERGE_TRAIN.md) · 🇧🇬 [bg](../../../bg/docs/ops/MERGE_TRAIN.md) · 🇧🇩 [bn](../../../bn/docs/ops/MERGE_TRAIN.md) · 🇧🇦 [bs](../../../bs/docs/ops/MERGE_TRAIN.md) · 🇨🇿 [cs](../../../cs/docs/ops/MERGE_TRAIN.md) · 🇩🇰 [da](../../../da/docs/ops/MERGE_TRAIN.md) · 🇩🇪 [de](../../../de/docs/ops/MERGE_TRAIN.md) · 🇬🇷 [el](../../../el/docs/ops/MERGE_TRAIN.md) · 🇪🇸 [es](../../../es/docs/ops/MERGE_TRAIN.md) · 🇪🇪 [et](../../../et/docs/ops/MERGE_TRAIN.md) · 🇮🇷 [fa](../../../fa/docs/ops/MERGE_TRAIN.md) · 🇫🇮 [fi](../../../fi/docs/ops/MERGE_TRAIN.md) · 🇫🇷 [fr](../../../fr/docs/ops/MERGE_TRAIN.md) · 🇮🇪 [ga](../../../ga/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [gu](../../../gu/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ha](../../../ha/docs/ops/MERGE_TRAIN.md) · 🇮🇱 [he](../../../he/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [hi](../../../hi/docs/ops/MERGE_TRAIN.md) · 🇭🇷 [hr](../../../hr/docs/ops/MERGE_TRAIN.md) · 🇭🇺 [hu](../../../hu/docs/ops/MERGE_TRAIN.md) · 🇦🇲 [hy](../../../hy/docs/ops/MERGE_TRAIN.md) · 🇮🇩 [id](../../../id/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ig](../../../ig/docs/ops/MERGE_TRAIN.md) · 🇮🇹 [it](../../../it/docs/ops/MERGE_TRAIN.md) · 🇯🇵 [ja](../../../ja/docs/ops/MERGE_TRAIN.md) · 🇬🇪 [ka](../../../ka/docs/ops/MERGE_TRAIN.md) · 🇰🇭 [km](../../../km/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [kn](../../../kn/docs/ops/MERGE_TRAIN.md) · 🇰🇷 [ko](../../../ko/docs/ops/MERGE_TRAIN.md) · 🇱🇹 [lt](../../../lt/docs/ops/MERGE_TRAIN.md) · 🇱🇻 [lv](../../../lv/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ml](../../../ml/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [mr](../../../mr/docs/ops/MERGE_TRAIN.md) · 🇲🇾 [ms](../../../ms/docs/ops/MERGE_TRAIN.md) · 🇲🇹 [mt](../../../mt/docs/ops/MERGE_TRAIN.md) · 🇲🇲 [my](../../../my/docs/ops/MERGE_TRAIN.md) · 🇳🇵 [ne](../../../ne/docs/ops/MERGE_TRAIN.md) · 🇳🇴 [no](../../../no/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [or](../../../or/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [pa](../../../pa/docs/ops/MERGE_TRAIN.md) · 🇵🇭 [phi](../../../phi/docs/ops/MERGE_TRAIN.md) · 🇵🇱 [pl](../../../pl/docs/ops/MERGE_TRAIN.md) · 🇵🇹 [pt](../../../pt/docs/ops/MERGE_TRAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MERGE_TRAIN.md) · 🇷🇴 [ro](../../../ro/docs/ops/MERGE_TRAIN.md) · 🇷🇺 [ru](../../../ru/docs/ops/MERGE_TRAIN.md) · 🇱🇰 [si](../../../si/docs/ops/MERGE_TRAIN.md) · 🇸🇰 [sk](../../../sk/docs/ops/MERGE_TRAIN.md) · 🇸🇮 [sl](../../../sl/docs/ops/MERGE_TRAIN.md) · 🇷🇸 [sr](../../../sr/docs/ops/MERGE_TRAIN.md) · 🇸🇪 [sv](../../../sv/docs/ops/MERGE_TRAIN.md) · 🇰🇪 [sw](../../../sw/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ta](../../../ta/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [te](../../../te/docs/ops/MERGE_TRAIN.md) · 🇹🇭 [th](../../../th/docs/ops/MERGE_TRAIN.md) · 🇹🇷 [tr](../../../tr/docs/ops/MERGE_TRAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MERGE_TRAIN.md) · 🇵🇰 [ur](../../../ur/docs/ops/MERGE_TRAIN.md) · 🇺🇿 [uz](../../../uz/docs/ops/MERGE_TRAIN.md) · 🇻🇳 [vi](../../../vi/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [yo](../../../yo/docs/ops/MERGE_TRAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MERGE_TRAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MERGE_TRAIN.md)

---

Sinds v3.8.49 (WS3.2/WS3.4 van het kwaliteits-/snelheidsplan) is het standaard mergepad voor
beoordeelde PR's naar `release/vX.Y.Z` de **Mergify-mergewachtrij** (`.mergify.yml`);
de hieronder gedocumenteerde **handmatige merge-train** is de TERUGVALOPTIE — gebruikt tijdens incidenten,
release-freezes of als het Mergify Open Source-abonnement ooit verandert.

## Standaardpad: de Mergify-wachtrij

1. De PR wordt beoordeeld/goedgekeurd door de campagnes en goedgekeurd via de pre-merge-⭐
   poort van de eigenaar (het rapport + de beslissing per item — zie `/merge-prs` Stap 0.75).
2. De eigenaar (of de sessie die handelt op basis van de beslissing van de eigenaar) past het
   **`queue`**-label toe. Het label IS de goedkeuring voor het samenvoegen; Mergify voert deze alleen uit.
3. Mergify valideert PR's in de wachtrij **serieel** (één tegelijk) aan de hand van de snelle controles
   en voegt ze samen (squash). Batching + automatische bisectie is onderdeel van een betaalde Mergify-laag
   ("Cannot use Merge Queue batch" bij het gratis abonnement, #7220), dus stelt `.mergify.yml` geen
   `batch_size` in; batching blijft de taak van de onderstaande handmatige merge train. Een PR waarvan
   de controles na `checks_timeout` (240 min = 2× de gemeten p95 van
   `quality.yml`) nog steeds in behandeling zijn, wordt uit de wachtrij verwijderd in plaats van deze te blokkeren.
4. Na het samenvoegen valideert de continue release-green-workflow de nieuwe tip bij een push
   en opent deze een attributie-issue als de combinatie een regressie heeft veroorzaakt (nooit automatisch terugdraaien).

Beveiligingsmaatregelen (conform de harde regels #21/#22 van `CLAUDE.md`):

- **Release freeze actief** → label PR's die op de bevroren branch zijn gericht NIET; richt ze eerst opnieuw op
  de actieve `release/vX+1`.
- **Lopende PR van een andere sessie** → label deze nooit; alleen de sessie die eigenaar is, zet
  het eigen werk in de wachtrij.
- Diffs met alleen tests en PR's met het label `hotfix` voeren al gereduceerde CI uit (zie
  `RELEASE_CHECKLIST.md` → Hotfix Fast-Lane); de wachtrijvoorwaarden accepteren elke
  daadwerkelijk uitgevoerde set controles (`#check-failure=0` + `#check-pending=0`).

## Terugvaloptie: de handmatige merge-train

Wordt gebruikt wanneer de wachtrij niet beschikbaar is. Dit formaliseert de werkwijze waarmee tijdens
de v3.8.47-cyclus in één dag 33 PR's zijn weggewerkt:

1. **Stel de batch samen** (~10–30 beoordeelde+goedgekeurde PR's). Controleer op `linked:`-conflicten
   (dezelfde `tap.testFiles`, dezelfde CHANGELOG-secties) en verwerk die na elkaar.
2. **Valideer EENMAAL**: merge in een geïsoleerde worktree vanaf de release-tip alle batch-heads
   lokaal en voer vervolgens de release-equivalente suite uit
   (`npm run check:release-green`; voeg vóór een release `--with-build` toe).
   `scripts/release/merge-train.sh <base> <PR#>…` automatiseert stappen 1–2 (conflicterende
   PR's worden verwijderd, de trein gaat verder). De volledige modus voert `npm run test:unit` uit — de
   op de machine afgestemde runner (`--test-concurrency=20`), **niet** de twee sequentiële CI-shards met 4 cores,
   die de dominante fase op ~25% van een machine met 16 cores lieten draaien (opgelost op
   2026-07-18). `--fast` (mega-trains binnen één dag wegwerken, goedgekeurd door de eigenaar op 2026-07-18)
   behoudt elke statische controle + vitest, maar voert alleen de node:test-bestanden uit die zijn gewijzigd door de
   ingestapte PR's; de VOLLEDIGE suite moet nog steeds minstens eenmaal per dag op de
   opgebouwde tip worden uitgevoerd (één trein zonder `--fast`).
3. **Groen** → merge de PR's op volgorde (controleer vóór elke merge opnieuw `state,headRefOid` —
   een PR waarvan de head is gewijzigd, gaat opnieuw de beoordeling in). Bewijs dat de netto diff van elke merge de
   eigen wijziging van de PR is (geen automatisch opgeloste terugdraaiingen: controleer `git diff --stat` op
   verwijderingen buiten het bereik).
4. **Rood** → bisecteer de batch in helften (valideer elke helft) in plaats van PR's
   één voor één opnieuw te valideren; plaats de veroorzakende PR met het bewijs terug in de beoordelingswachtrij.
5. **Nooit**: tijdens een freeze naar de bevroren branch mergen; ergens `git stash` gebruiken;
   CI klakkeloos opnieuw uitvoeren in de hoop dat rood verdwijnt (regel: rood is informatie).

## Niveaus (waarom de wachtrij veilig is met alleen snelle controles)

- **Per PR** (snelle controles van quality.yml): door TIA beïnvloede tests + volledige unit-suite met 4 shards +
  vitest + lint-verzameling + typecheck + integriteitscontrole voor documentatie/changelog.
- **Per batch/tip** (continue release-green): HARDE `--quick`-controles bij elke push naar
  de releasebranch; volledige `--with-build --full-ci`-controles 3×/dag.
- **Per release** (ci.yml op de release-PR): de volledige matrix incl. E2E ×9,
  package-artifact + opstartrooktest voor tarball, coverage/ratchets.

Niets wordt minder gevalideerd dan voorheen — het zware testoppervlak wordt alleen per batch/tip uitgevoerd
in plaats van per PR, wat de O(N)-rondgangen elimineert.

## Vereisten voor een nieuwe checkout voor `merge-train.sh`

Het script voert een onmiddellijk afbrekende **preflight** uit op de root-checkout (vóór enig werk
in een worktree), zodat een defecte installatie zich nooit als een rode trein kan voordoen:

1. `npm ci`, voer daarna de `bun`-postinstall uit die npm blokkeert:
   `(cd node_modules/bun && node install.js)` — anders mislukken `check:provider-consistency`
   en `check:known-symbols` (beide `bun scripts/…`) op de trein EN de basis zonder
   overtredingsregel.
2. Geen verdwaalde `node_modules/node_modules` (een dubbele dependencystructuur; React wordt tweemaal geladen
   en UI-vitest-suites mislukken onmiddellijk).
3. `node_modules/.bin/tsc` aanwezig en uitvoerbaar (bij een gedeeltelijke installatie ontbreekt dit).

De trein voert het blokkerende `npm run check:cycles:ratchet` uit; alleen `npm run check:cycles`
is adviserend (het vermeldt de SCC's en eindigt met een niet-nulstatus, zelfs op een gezonde basis).
