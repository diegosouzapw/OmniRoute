# Merge Queue & Manual Merge-Train Runbook (Nederlands)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MERGE_TRAIN.md) · 🇪🇹 [am](../../../am/docs/ops/MERGE_TRAIN.md) · 🇸🇦 [ar](../../../ar/docs/ops/MERGE_TRAIN.md) · 🇦🇿 [az](../../../az/docs/ops/MERGE_TRAIN.md) · 🇧🇬 [bg](../../../bg/docs/ops/MERGE_TRAIN.md) · 🇧🇩 [bn](../../../bn/docs/ops/MERGE_TRAIN.md) · 🇧🇦 [bs](../../../bs/docs/ops/MERGE_TRAIN.md) · 🇨🇿 [cs](../../../cs/docs/ops/MERGE_TRAIN.md) · 🇩🇰 [da](../../../da/docs/ops/MERGE_TRAIN.md) · 🇩🇪 [de](../../../de/docs/ops/MERGE_TRAIN.md) · 🇬🇷 [el](../../../el/docs/ops/MERGE_TRAIN.md) · 🇪🇸 [es](../../../es/docs/ops/MERGE_TRAIN.md) · 🇪🇪 [et](../../../et/docs/ops/MERGE_TRAIN.md) · 🇮🇷 [fa](../../../fa/docs/ops/MERGE_TRAIN.md) · 🇫🇮 [fi](../../../fi/docs/ops/MERGE_TRAIN.md) · 🇫🇷 [fr](../../../fr/docs/ops/MERGE_TRAIN.md) · 🇮🇪 [ga](../../../ga/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [gu](../../../gu/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ha](../../../ha/docs/ops/MERGE_TRAIN.md) · 🇮🇱 [he](../../../he/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [hi](../../../hi/docs/ops/MERGE_TRAIN.md) · 🇭🇷 [hr](../../../hr/docs/ops/MERGE_TRAIN.md) · 🇭🇺 [hu](../../../hu/docs/ops/MERGE_TRAIN.md) · 🇦🇲 [hy](../../../hy/docs/ops/MERGE_TRAIN.md) · 🇮🇩 [id](../../../id/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ig](../../../ig/docs/ops/MERGE_TRAIN.md) · 🇮🇹 [it](../../../it/docs/ops/MERGE_TRAIN.md) · 🇯🇵 [ja](../../../ja/docs/ops/MERGE_TRAIN.md) · 🇬🇪 [ka](../../../ka/docs/ops/MERGE_TRAIN.md) · 🇰🇭 [km](../../../km/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [kn](../../../kn/docs/ops/MERGE_TRAIN.md) · 🇰🇷 [ko](../../../ko/docs/ops/MERGE_TRAIN.md) · 🇱🇹 [lt](../../../lt/docs/ops/MERGE_TRAIN.md) · 🇱🇻 [lv](../../../lv/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ml](../../../ml/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [mr](../../../mr/docs/ops/MERGE_TRAIN.md) · 🇲🇾 [ms](../../../ms/docs/ops/MERGE_TRAIN.md) · 🇲🇹 [mt](../../../mt/docs/ops/MERGE_TRAIN.md) · 🇲🇲 [my](../../../my/docs/ops/MERGE_TRAIN.md) · 🇳🇵 [ne](../../../ne/docs/ops/MERGE_TRAIN.md) · 🇳🇴 [no](../../../no/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [or](../../../or/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [pa](../../../pa/docs/ops/MERGE_TRAIN.md) · 🇵🇭 [phi](../../../phi/docs/ops/MERGE_TRAIN.md) · 🇵🇱 [pl](../../../pl/docs/ops/MERGE_TRAIN.md) · 🇵🇹 [pt](../../../pt/docs/ops/MERGE_TRAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MERGE_TRAIN.md) · 🇷🇴 [ro](../../../ro/docs/ops/MERGE_TRAIN.md) · 🇷🇺 [ru](../../../ru/docs/ops/MERGE_TRAIN.md) · 🇱🇰 [si](../../../si/docs/ops/MERGE_TRAIN.md) · 🇸🇰 [sk](../../../sk/docs/ops/MERGE_TRAIN.md) · 🇸🇮 [sl](../../../sl/docs/ops/MERGE_TRAIN.md) · 🇷🇸 [sr](../../../sr/docs/ops/MERGE_TRAIN.md) · 🇸🇪 [sv](../../../sv/docs/ops/MERGE_TRAIN.md) · 🇰🇪 [sw](../../../sw/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ta](../../../ta/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [te](../../../te/docs/ops/MERGE_TRAIN.md) · 🇹🇭 [th](../../../th/docs/ops/MERGE_TRAIN.md) · 🇹🇷 [tr](../../../tr/docs/ops/MERGE_TRAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MERGE_TRAIN.md) · 🇵🇰 [ur](../../../ur/docs/ops/MERGE_TRAIN.md) · 🇺🇿 [uz](../../../uz/docs/ops/MERGE_TRAIN.md) · 🇻🇳 [vi](../../../vi/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [yo](../../../yo/docs/ops/MERGE_TRAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MERGE_TRAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MERGE_TRAIN.md)

---

Sinds v3.8.49 (WS3.2/WS3.4 van het kwaliteits-/snelheidsplan) is het standaardpad voor het
mergen van beoordeelde PR's naar `release/vX.Y.Z` de **Mergify-mergewachtrij** (`.mergify.yml`);
de hieronder gedocumenteerde **handmatige merge-train** is het TERUGVALMECHANISME — te gebruiken tijdens incidenten,
release-freezes of als het Open Source-abonnement van Mergify ooit verandert.

## Standaardpad: de Mergify-wachtrij

1. De PR is beoordeeld/op groen gezet door de campagnes en goedgekeurd via de pre-merge-⭐-poort
   van de eigenaar (het rapport + de beslissing per item — zie `/merge-prs` stap 0.75).
2. De eigenaar (of de sessie die handelt op basis van de beslissing van de eigenaar) past het label **`queue`**
   toe. Het label IS de mergegoedkeuring; Mergify voert deze alleen uit.
3. Mergify bundelt maximaal 10 PR's in de wachtrij, valideert de batch aan de hand van de fast-gates
   en merget deze (squash). Een rode batch wordt **automatisch gebisect** — de problematische PR
   wordt in ~log2(N) hervalidaties geïsoleerd en uit de wachtrij verwijderd; de rest gaat door.
4. Na het mergen valideert de continue release-green-workflow de nieuwe tip bij een push
   en opent deze een attributie-issue als de combinatie een regressie veroorzaakte (nooit automatisch reverten).

Beveiligingsregels (conform `CLAUDE.md` Harde regels #21/#22):

- **Release-freeze actief** → label GEEN PR's die op de bevroren branch zijn gericht; richt ze eerst opnieuw op
  de actieve `release/vX+1`.
- **Lopende PR van een andere sessie** → label deze nooit; alleen de eigenaarssessie plaatst
  zijn eigen werk in de wachtrij.
- Diffs met alleen tests en PR's met het label `hotfix` draaien al beperkte CI (zie
  `RELEASE_CHECKLIST.md` → Hotfix Fast-Lane); de wachtrijvoorwaarden accepteren elke
  daadwerkelijk uitgevoerde set checks (`#check-failure=0` + `#check-pending=0`).

## Terugvalmechanisme: de handmatige merge-train

Te gebruiken wanneer de wachtrij niet beschikbaar is. Dit formaliseert de werkwijze waarmee tijdens
de v3.8.47-cyclus in één dag 33 PR's zijn weggewerkt:

1. **Stel de batch samen** (~10–30 beoordeelde+goedgekeurde PR's). Controleer op `linked:`-conflicten
   (dezelfde `tap.testFiles`, dezelfde CHANGELOG-secties) en verwerk die achtereenvolgens.
2. **Valideer EENMALIG**: merge in een geïsoleerde worktree vanaf de release-tip alle batch-heads
   lokaal en voer vervolgens de met de release overeenkomende suite uit
   (`npm run check:release-green`; voeg vóór een release `--with-build` toe).
   `scripts/release/merge-train.sh <base> <PR#>…` automatiseert stappen 1–2 (conflicterende
   PR's worden uitgestoten, de train gaat door). De volledige modus voert `npm run test:unit` uit — de
   op de machine afgestemde runner (`--test-concurrency=20`), **niet** de twee opeenvolgende CI-shards
   met 4 cores, waardoor de dominante fase op ~25% van een machine met 16 cores draaide (opgelost op
   2026-07-18). `--fast` (voor het binnen één dag wegwerken van mega-trains, goedgekeurd door de eigenaar op 2026-07-18)
   behoudt elke statische poort + vitest, maar voert alleen de node:test-bestanden uit die zijn gewijzigd door de
   opgenomen PR's; de VOLLEDIGE suite moet nog steeds minstens eenmaal per dag op de
   geaccumuleerde tip worden uitgevoerd (één train zonder `--fast`).
3. **Groen** → merge de PR's achtereenvolgens (waarbij vóór elke PR `state,headRefOid` opnieuw wordt gecontroleerd —
   een PR waarvan de head is gewijzigd, gaat terug naar de reviewwachtrij). Bewijs dat de netto-diff van elke merge
   uitsluitend de eigen wijziging van de PR bevat (geen door automatisch oplossen veroorzaakte reverts: controleer `git diff --stat` op
   verwijderingen buiten de scope).
4. **Rood** → bisect de batch in helften (valideer elke helft) in plaats van elke PR
   afzonderlijk opnieuw te valideren; plaats de problematische PR met het bewijsmateriaal terug in de reviewwachtrij.
5. **Nooit**: tijdens een freeze naar de bevroren branch mergen; waar dan ook `git stash` gebruiken;
   CI klakkeloos opnieuw uitvoeren in de hoop dat rood verdwijnt (regel: rood is informatie).

## Niveaus (waarom de wachtrij veilig is met alleen fast-gates)

- **Per PR** (quality.yml fast-gates): door TIA beïnvloede tests + volledige unit-suite met 4 shards +
  vitest + lint-verzameling + typecheck + integriteitscontrole van documentatie/changelog.
- **Per batch/tip** (continue release-green): `--quick` HARDE poorten bij elke push naar
  de releasebranch; volledige `--with-build --full-ci`-rondes 3×/dag.
- **Per release** (ci.yml op de release-PR): de volledige matrix incl. E2E ×9,
  package-artifact + tarball boot-smoke, coverage/ratchets.

Niets wordt minder gevalideerd dan voorheen — het zware testoppervlak wordt alleen per batch/tip uitgevoerd
in plaats van per PR, waardoor de O(N)-heen-en-weerrondes verdwijnen.
