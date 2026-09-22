# Release-Green: keeping the queue and release branch green (Nederlands)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_GREEN.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_GREEN.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_GREEN.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_GREEN.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_GREEN.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_GREEN.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_GREEN.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_GREEN.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_GREEN.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_GREEN.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_GREEN.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_GREEN.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_GREEN.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_GREEN.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_GREEN.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_GREEN.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_GREEN.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_GREEN.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_GREEN.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_GREEN.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_GREEN.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_GREEN.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_GREEN.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_GREEN.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_GREEN.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_GREEN.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_GREEN.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_GREEN.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_GREEN.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_GREEN.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_GREEN.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_GREEN.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_GREEN.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_GREEN.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_GREEN.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_GREEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_GREEN.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_GREEN.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_GREEN.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_GREEN.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_GREEN.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_GREEN.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_GREEN.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_GREEN.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_GREEN.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_GREEN.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_GREEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_GREEN.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_GREEN.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_GREEN.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_GREEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_GREEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_GREEN.md)

---

## Het probleem dat dit oplost

De **volledige gate** (`.github/workflows/ci.yml` — unit-shards, vitest, ratchets,
`package-artifact`, SonarQube, E2E) wordt **alleen uitgevoerd op de release-PR** (PR → `main`). PR's die op
`release/**` zijn gericht, krijgen de **fast-gates** (`quality.yml`: door TIA beïnvloede tests + typecheck + lint)
en, bij codewijzigingen, een **adviserende** productiebuild. Gevolg: rode resultaten die alleen bij een release optreden, kunnen zich
ongemerkt blijven opstapelen op de release-branch en bij de release **in lagen van ~40 min ontploffen**,
één voor één.

De "release-green-familie" bestaat om op die rode resultaten **vooruit te lopen** — het equivalent van de volledige
gate **lokaal / buiten een release om** op elk gewenst moment valideren, zodat de release-PR al
groen is bij de eerste CI-run.

> **Niet-onderhandelbaar principe:** niets hiervan blokkeert de bijdrager. We voegen geen vereiste
> check toe waardoor diens PR faalt. De **drift** (ratchets) is bedoeld voor de maintainer om bij de release opnieuw te baselinen —
> nooit een zorg voor de bijdrager. Geen enkel onderdeel **sluit** een PR (creditdiefstal) of
> **verzwakt** een test om deze te laten slagen.

## De familie (4 onderdelen) — en hoe elk onderdeel onafhankelijk wordt uitgevoerd

| Onderdeel                                                                   | Wat het is                                                                          | Wanneer uitvoeren                                                         | Reikwijdte                            |
| --------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- | ------------------------------------------------------------------------- | ------------------------------------- |
| **`/green-prs`** (Oplossing A)                                              | Scan op aanvraag door de maintainer van de **wachtrij met openstaande PR's**        | **Onafhankelijk, periodiek** — en vooral **vóór** een `/generate-release` | Volledige PR-wachtrij → `release/**`  |
| **`/validate-release-green`** (Oplossing C — `npm run check:release-green`) | Validatie-engine: reproduceert de volledige gate voor een branch OF merge-kandidaat | Onafhankelijk, op elk moment                                              | Een specifieke branch of een merge-PR |
| **`/babysit <PR#>`**                                                        | Stuurt de **live CI** van **één** PR aan totdat deze groen is                       | Onafhankelijk, per PR                                                     | Eén PR                                |
| **`nightly-release-green.yml`** (Oplossing D)                               | Geautomatiseerde nachtelijke workflow; opent een issue bij een HARD rood resultaat  | Automatisch (cron)                                                        | De actieve release-branch             |

**Kort antwoord op "is dit alleen voor releases?":** **nee.** `/green-prs` is ontworpen om
**periodiek, tussen releases door** te worden uitgevoerd. Onafhankelijke uitvoering is de normale werkwijze — een release is slechts
het moment waarop uitvoering ervan de meeste waarde oplevert.

## Adviserende build van PR naar release

`quality.yml` bevat nu `Build (advisory)` voor niet-concept-code-PR's en Mergify-wachtrijbranches.
Deze weerspiegelt het productie-buildrecept uit `ci.yml`: Node 24, `npm-ci-retry`,
`check:node-runtime` en `npm run build` met `OMNIROUTE_USE_TURBOPACK=1`. Er wordt bewust
geen buildartefact geüpload, omdat geen enkele downstream-kwaliteitstaak in deze workflow er een gebruikt.
Verwijder `continue-on-error` na één week met stabiele runs van release-PR's, zodat het signaal een
blokkerende gate van PR naar release wordt.

## Oplossing C — `npm run check:release-green` (de engine)

Reproduceert release-equivalente validatie voor de huidige working tree en classificeert elke rode status:

- **HARD** (typecheck, lintfouten, unit, vitest, db-rules, public-creds, optioneel
  `package-artifact`) → **echt defect**; `exit 1`. Opgelost op de bronbranch (TDD, regel #18).
- **DRIFT** (eslint-**waarschuwingen**, cognitive-complexity, file-size) → ratchetdrift die zich tijdens
  de cyclus heeft opgehoopt, **niet de schuld van de bijdrager**; deze wordt alleen gerapporteerd en
  **door de maintainer bij de release opnieuw van een baseline voorzien**. Drift verandert **nooit**
  de exitcode — en blokkeert dus nooit iemand.

```bash
npm run check:release-green                 # huidige branch (working tree)
node scripts/quality/validate-release-green.mjs --json   # gestructureerde uitvoer
node scripts/quality/validate-release-green.mjs --quick  # slaat unit+vitest over (alleen drift+typecheck+lint)
node scripts/quality/validate-release-green.mjs --with-build  # bevat package-artifact (traag)
```

Stelt alleen diagnoses en **rapporteert** deze (geen automatische fixes). De orkestratie om alles groen te maken bevindt zich in
`/green-prs` en `/review-prs`.

## Oplossing A — `/green-prs` (de wachtrijscan)

Procedure (samenvatting — zie de `green-prs`-skill voor details):

1. **Inventariseer** de wachtrij met openstaande PR's voor de actieve releasebranch.
2. **Beoordeel** elke PR (haalbaar / afwijzenswaardig / actie van auteur nodig) — afwijzenswaardige PR's en PR's waarvoor actie van de auteur nodig is, worden
   **gerapporteerd, niet gesloten** (de auteur beslist).
3. Breng elke haalbare PR in een **geïsoleerde worktree** (regel #19) naar de tip van de releasebranch en voer
   `npm run check:release-green` uit:
   - **HARD** → los dit **op de branch van de bijdrager** op via co-auteurschap (behoudt de status 'Merged' van de auteur);
     voer de controle opnieuw uit totdat alle HARD-statussen zijn opgelost.
   - **DRIFT** → laat deze staan; bij de release wordt hiervoor een nieuwe baseline ingesteld.
4. **Rapporteer** een tabel met PR × (oordeel, rode HARD-statussen, opgelost?, DRIFT, nu release-green?).

Kan de wachtrij **voorbereiden** zonder samen te voegen; voegt alleen samen wanneer dit expliciet wordt gevraagd — en sluit nooit een PR.

## Aanbevolen frequentie

- Voer **`/green-prs` periodiek** uit (bijvoorbeeld wekelijks) en **altijd vóór een
  `/generate-release`**.
- Behoud **`nightly-release-green.yml`** (oplossing D) als continu signaal: wanneer deze een issue voor een
  rode HARD-status opent, is het tijd voor een scan.
- Gebruik **`/validate-release-green`** ad hoc om een branch of een specifieke mergekandidaat te controleren.
- Gebruik **`/babysit <PR#>`** wanneer een specifieke PR op live-CI naar groen moet worden begeleid.

## Relatie tot de release

- `/generate-release` roept validatie aan in **fase 0 (preflight)**: stelt een nieuwe baseline in voor DRIFT en verhelpt
  HARD voordat de release-PR wordt geopend.
- `/review-prs` gebruikt de release-green-gate bij de beslissing om samen te voegen (groen vóór samenvoegen).

Het doel van alle onderdelen is hetzelfde: **een groene release-PR bij de eerste CI-run**, in plaats van op de releasedag
in lagen van 40 minuten van de ene rode status naar de andere te gaan.
