# Quality Gates Reference (Nederlands)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/QUALITY_GATES.md) · 🇪🇹 [am](../../../am/docs/architecture/QUALITY_GATES.md) · 🇸🇦 [ar](../../../ar/docs/architecture/QUALITY_GATES.md) · 🇦🇿 [az](../../../az/docs/architecture/QUALITY_GATES.md) · 🇧🇬 [bg](../../../bg/docs/architecture/QUALITY_GATES.md) · 🇧🇩 [bn](../../../bn/docs/architecture/QUALITY_GATES.md) · 🇧🇦 [bs](../../../bs/docs/architecture/QUALITY_GATES.md) · 🇨🇿 [cs](../../../cs/docs/architecture/QUALITY_GATES.md) · 🇩🇰 [da](../../../da/docs/architecture/QUALITY_GATES.md) · 🇩🇪 [de](../../../de/docs/architecture/QUALITY_GATES.md) · 🇬🇷 [el](../../../el/docs/architecture/QUALITY_GATES.md) · 🇪🇸 [es](../../../es/docs/architecture/QUALITY_GATES.md) · 🇪🇪 [et](../../../et/docs/architecture/QUALITY_GATES.md) · 🇮🇷 [fa](../../../fa/docs/architecture/QUALITY_GATES.md) · 🇫🇮 [fi](../../../fi/docs/architecture/QUALITY_GATES.md) · 🇫🇷 [fr](../../../fr/docs/architecture/QUALITY_GATES.md) · 🇮🇪 [ga](../../../ga/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [gu](../../../gu/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ha](../../../ha/docs/architecture/QUALITY_GATES.md) · 🇮🇱 [he](../../../he/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [hi](../../../hi/docs/architecture/QUALITY_GATES.md) · 🇭🇷 [hr](../../../hr/docs/architecture/QUALITY_GATES.md) · 🇭🇺 [hu](../../../hu/docs/architecture/QUALITY_GATES.md) · 🇦🇲 [hy](../../../hy/docs/architecture/QUALITY_GATES.md) · 🇮🇩 [id](../../../id/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ig](../../../ig/docs/architecture/QUALITY_GATES.md) · 🇮🇹 [it](../../../it/docs/architecture/QUALITY_GATES.md) · 🇯🇵 [ja](../../../ja/docs/architecture/QUALITY_GATES.md) · 🇬🇪 [ka](../../../ka/docs/architecture/QUALITY_GATES.md) · 🇰🇭 [km](../../../km/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [kn](../../../kn/docs/architecture/QUALITY_GATES.md) · 🇰🇷 [ko](../../../ko/docs/architecture/QUALITY_GATES.md) · 🇱🇹 [lt](../../../lt/docs/architecture/QUALITY_GATES.md) · 🇱🇻 [lv](../../../lv/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ml](../../../ml/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [mr](../../../mr/docs/architecture/QUALITY_GATES.md) · 🇲🇾 [ms](../../../ms/docs/architecture/QUALITY_GATES.md) · 🇲🇹 [mt](../../../mt/docs/architecture/QUALITY_GATES.md) · 🇲🇲 [my](../../../my/docs/architecture/QUALITY_GATES.md) · 🇳🇵 [ne](../../../ne/docs/architecture/QUALITY_GATES.md) · 🇳🇴 [no](../../../no/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [or](../../../or/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [pa](../../../pa/docs/architecture/QUALITY_GATES.md) · 🇵🇭 [phi](../../../phi/docs/architecture/QUALITY_GATES.md) · 🇵🇱 [pl](../../../pl/docs/architecture/QUALITY_GATES.md) · 🇵🇹 [pt](../../../pt/docs/architecture/QUALITY_GATES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/QUALITY_GATES.md) · 🇷🇴 [ro](../../../ro/docs/architecture/QUALITY_GATES.md) · 🇷🇺 [ru](../../../ru/docs/architecture/QUALITY_GATES.md) · 🇱🇰 [si](../../../si/docs/architecture/QUALITY_GATES.md) · 🇸🇰 [sk](../../../sk/docs/architecture/QUALITY_GATES.md) · 🇸🇮 [sl](../../../sl/docs/architecture/QUALITY_GATES.md) · 🇷🇸 [sr](../../../sr/docs/architecture/QUALITY_GATES.md) · 🇸🇪 [sv](../../../sv/docs/architecture/QUALITY_GATES.md) · 🇰🇪 [sw](../../../sw/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ta](../../../ta/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [te](../../../te/docs/architecture/QUALITY_GATES.md) · 🇹🇭 [th](../../../th/docs/architecture/QUALITY_GATES.md) · 🇹🇷 [tr](../../../tr/docs/architecture/QUALITY_GATES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/QUALITY_GATES.md) · 🇵🇰 [ur](../../../ur/docs/architecture/QUALITY_GATES.md) · 🇺🇿 [uz](../../../uz/docs/architecture/QUALITY_GATES.md) · 🇻🇳 [vi](../../../vi/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [yo](../../../yo/docs/architecture/QUALITY_GATES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/QUALITY_GATES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/QUALITY_GATES.md)

---

Dit document is de gezaghebbende referentie voor alle CI-kwaliteitspoorten in OmniRoute.
Het beschrijft elke poort, wat deze valideert, in welke CI-job deze wordt uitgevoerd, of deze
een ratchet-basislijn of een slaag/zak-beleid gebruikt en of deze de build blokkeert of adviserend is.

Zie voor een korte samenvatting en het beleid voor de allowlist de sectie "Quality Gates & Ratchets"
in `AGENTS.md`. Zie voor de kritische beoordeling, volwassenheidsclassificatie en toolagnostische
replicatieplanning van hetzelfde systeem het
[Quality Gate Playbook](../ops/QUALITY_GATE_PLAYBOOK.md).

---

## Gate-inventaris (~90 scripts)

Scripts staan onder `scripts/check/` (beleidspoorten) en `scripts/quality/` (ratchet-engine).
De bron van waarheid voor CI is `.github/workflows/ci.yml`.

### Snel pad voor release-PR's (`quality.yml`)

`.github/workflows/quality.yml` wordt uitgevoerd voor PR's die zijn gericht op `release/**`. Hiermee kunnen bijdragersbranches blijven doorstromen via snelle, op paden gefilterde poorten, plus één adviserend productiebuildsignaal voor codewijzigingen:

| Job                                              | Bereik                                                                                                                                                                                                                                   | Blokkerend                                                                                   |
| ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `Build (advisory)`                               | Niet-conceptcode-PR's en Mergify-wachtrijbranches; Node 24, `npm-ci-retry`, `check:node-runtime`, `npm run build` met `OMNIROUTE_USE_TURBOPACK=1`; geen artifactupload omdat geen downstream-kwaliteitsjob dit gebruikt                  | **Adviserend** (`continue-on-error: true`; verwijderen na één week stabiele release-PR-runs) |
| `Docs Gates (fast-path)`                         | Documentatie-/code-PR's; API-documentatiereferenties en docs-all                                                                                                                                                                         | Ja                                                                                           |
| `Fast Quality Gates`                             | Code-PR's; statische controles, typecontrole, typecontrole van het dashboard, betrokken unittests                                                                                                                                        | Ja                                                                                           |
| `Forgotten sibling tests`                        | Code-PR's; gewijzigde modules herleid tot statische consumers en kandidaat-siblingtests; barrel- en dynamische-importpaden worden gerapporteerd als adviserende diagnostiek, met uitzonderingen uit de allowlist waarnaar wordt verwezen | **Adviserend**                                                                               |
| `Vitest (fast-path)`                             | Code-PR's; snelle Vitest-suite                                                                                                                                                                                                           | Ja                                                                                           |
| `Unit Tests fast-path`                           | Code-PR's; unitsuite met 4 shards                                                                                                                                                                                                        | Ja                                                                                           |
| `No new ESLint warnings`                         | Code-PR's; suppressiebewaking voor lintwaarschuwingen                                                                                                                                                                                    | Ja voor eigen oorsprong, adviserend voor forks                                               |
| `Merge integrity (changelog + generated skills)` | Niet-concept-PR's; synchronisatie van changelog en gegenereerde skills                                                                                                                                                                   | Ja voor eigen oorsprong, adviserend voor forks                                               |

#### Rapport over vergeten siblingtests

`npm run check:forgotten-sibling-tests` hergebruikt de importresolver achter de test-impactmap.
Voor elke gewijzigde productiemodule rapporteert het deterministische ketens van
`gewijzigde module/symbool -> statische consumer -> kandidaat-siblingtest` wanneer de kandidaattest
ontbreekt in de diff van de pull request. De Markdown-samenvatting en het JSON-resultaat worden
bewaard als het workflowartifact `forgotten-sibling-tests` voor kalibratie vóór een eventuele blokkerende uitrol.

Barrel-re-exports en dynamische imports dienen alleen als resolutiediagnostiek; ze leiden nooit tot een
blokkerende bevinding. Beoordeelde uitzonderingen staan in
`config/quality/forgotten-sibling-allowlist.json`. Elke vermelding moet de consumer en kandidaattest
benoemen, een specifieke onderbouwing geven en naar een GitHub-issue of pull request linken. Ongeldige vermeldingen leiden
standaard tot een fout. Uitzonderingen kunnen een verwijderde kandidaattest of een diff die `.skip`/`.todo`
toevoegt niet onderdrukken; verzwakking van assertions en andere vormen van maskering blijven onder de verantwoordelijkheid van de onafhankelijk blokkerende
`check:test-masking`-poort.

### Job: `lint`

Wordt uitgevoerd bij elke PR naar `main`. Blokkeert samenvoegen bij fouten.

| Script (`npm run ...`)            | Valideert                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Blokkerend                                 |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| `check:node-runtime`              | De Node.js-versie valt binnen het ondersteunde bereik                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Ja                                         |
| `check:cycles`                    | Circulaire imports — alle modules in `src/` + `open-sse/`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Ja                                         |
| `check:route-validation:t06`      | Zod-schema's aanwezig op alle routes (Tier 6-beleid)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Ja                                         |
| `check:any-budget:t11`            | Het aantal `@ts-expect-error // any` overschrijdt het budget niet (Tier 11-catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Ja                                         |
| `check:provider-consistency`      | Elke provider in `providers.ts` heeft een overeenkomende vermelding in `providerRegistry.ts` (en omgekeerd, binnen de allowlist)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Ja                                         |
| `check:model-lifecycle`           | De drie handmatig onderhouden routeringstabellen blijven consistent met de ingecheckte levenscyclus-snapshot (#11503): `FITNESS_TABLE` (`taskFitness.ts`) kent geen score toe aan een uitgefaseerde id die door `REGISTRY` kan worden gerouteerd; elk doel van `BUILT_IN_ALIASES` is aanwezig in `REGISTRY` en afwezig in de snapshot met uitgefaseerde id's; elke uitgefaseerde id die nog in `REGISTRY` staat, wordt doorgestuurd of vermeld in `allowedRetiredInCatalog`; en geen enkele bron of bestemming van `DEFAULT_DEGRADATION_MAP` wordt in die snapshot als uitgefaseerd aangemerkt. Dit bewijst niet dat een model momenteel door een actieve upstream wordt aangeboden. Offline — vergelijkt met `config/quality/model-lifecycle.json`, handmatig bijgewerkt met `npm run quality:refresh-model-lifecycle` (netwerk; niet geïntegreerd in CI). `allowedRetiredInCatalog` is een afbouwratel: voeg alleen een vermelding toe met een tracking-issue. | Ja                                         |
| `check:fetch-targets`             | Elke `fetch("/api/...")` in de client-side `src/` verwijst naar een echte `route.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Ja                                         |
| `check:deps`                      | Alle via `npm install` installeerbare afhankelijkheden in elke `package.json` in de repo staan in `dependency-allowlist.json`; nieuwe niet-vastgezette of via slopsquatting verkregen pakketten worden gemarkeerd                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Ja                                         |
| `audit:deps`                      | `npm audit` (root + electron) — geen waarschuwingen met hoge/kritieke ernst (overlapt met OSV `check:vuln-ratchet`; zie Rationalisatiebacklog)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Ja                                         |
| `check:lockfile`                  | Integriteit van `package-lock.json` — HTTPS-register, integriteitshashes, geen hostoverschrijvingen                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Ja                                         |
| `check:licenses`                  | SPDX-licentietoelatingslijst voor productieafhankelijkheden                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Ja                                         |
| `check:tracked-artifacts`         | Geen buildartefacten / vastgelegde `node_modules`-symbolische koppelingen (wordt ook uitgevoerd in de Husky-pre-commit; pre-push is bewust licht gehouden — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Ja                                         |
| `check:vitest-exclusions`         | Elke Vitest-uitsluiting vermeldt een trackingissue en staat in `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Ja                                         |
| `check:file-size`                 | Geen bronbestand overschrijdt de limiet per extensie (ratchet: grote bevroren bestanden in de lijst `frozen`)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Ja                                         |
| `check:error-helper`              | Foutresponsen in executors/handlers gebruiken `buildErrorBody()` / `sanitizeErrorMessage()` (harde regel #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Ja                                         |
| `check:migration-numbering`       | Migratie-SQL-bestanden zijn opeenvolgend genummerd, zonder hiaten of duplicaten                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Ja                                         |
| `check:public-creds`              | Geen letterlijke OAuth-`client_id`/`client_secret` of Firebase Web-sleutels buiten `publicCreds.ts` (harde regel #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Ja                                         |
| `check:db-rules`                  | Geen onbewerkte SQL buiten modules in `src/lib/db/`; geen barrel-imports vanuit `localDb.ts` (harde regels #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Ja                                         |
| `check:known-symbols`             | Provider-executors, routeringsstrategieën en translators die in hun dispatch-tabellen zijn geregistreerd, komen overeen met de bestanden op schijf — geen verweesde of niet-gedeclareerde symbolen                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Ja                                         |
| `check:route-guard-membership`    | Elke route die een childproces start, is geclassificeerd door `isLocalOnlyPath()` (harde regels #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Ja                                         |
| `check:test-discovery`            | Elk `*.test.ts`- / `*.spec.ts`-bestand in de repo wordt door ten minste één testrunner verzameld (ratchet: de lijst met verweesde bestanden in `test-discovery-baseline.json` kan alleen kleiner worden)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Ja                                         |
| `check:agent-skills-sync`         | Gegenereerde agent-skills-artefacten komen overeen met hun broncatalogus (geen afwijkingen)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `check:provider-asset-provenance` | Voor providerlogo's/-assets is een herkomstvermelding vastgelegd                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `lint:json`                       | JSON-configuratiebestanden kunnen worden geparseerd en voldoen aan de lintregels van de repo                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `typecheck:core`                  | TypeScript-compilatie zonder fouten (alleen adviserende waarschuwingen)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Ja                                         |
| `typecheck:noimplicit:core`       | Strikte `noImplicitAny` — toekomstgericht; veel bestaande aanroeplocaties moeten nog van annotaties worden voorzien                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | **Adviserend** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` beperkt tot `src/app/(dashboard)/**` (#7033) — de samengestelde toelatingslijst van 27 bestanden van `typecheck:core` bevat geen dashboard-TSX, en `next build` voert er evenmin typecontrole op uit (`next.config.mjs` stelt `ignoreBuildErrors: true` in), waardoor regressies met verweesde identifiers daar (#6625/#6909) onzichtbaar waren voor CI. Vergelijkt met een bevroren baseline voor het aantal fouten per bestand/per TS-code (`config/quality/dashboard-typecheck-baseline.json`, hetzelfde patroon voor afdwinging van verouderde gegevens als `check:known-symbols`) — alleen NIEUWE fouten boven op het aantal in de baseline doen de controle mislukken; verlaag de baseline stapsgewijs met `--update` wanneer een bestaande fout is opgelost.                                                                                                                                                                                        | Ja                                         |

### Taak: `quality-gate`

Wordt uitgevoerd na `test-coverage`. Blokkeert samenvoegen bij een fout.

| Script                       | Valideert                                                                                                                                                                                                                | Blokkerend                      |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------- |
| `quality:collect`            | Genereert `quality-metrics.json` (aantal ESLint-waarschuwingen, dekking uit het samengevoegde shardrapport)                                                                                                              | Ja (voorafgaand aan de ratchet) |
| `quality:ratchet`            | Geen enkele metriek in `quality-baseline.json` is verslechterd (ESLint-waarschuwingen ≤ baseline; dekking ≥ baseline)                                                                                                    | Ja                              |
| `check:duplication`          | Codeduplicatie (jscpd@4) overschrijdt de baseline in `quality-baseline.json` niet                                                                                                                                        | Ja                              |
| `check:complexity`           | Cyclomatische complexiteit op bestandsniveau overschrijdt de limiet niet (kernregels `complexity` + `max-lines-per-function` van ESLint)                                                                                 | Ja                              |
| `check:cognitive-complexity` | Ratchet voor cognitieve complexiteit (`eslint-plugin-sonarjs`) — afzonderlijke ESLint-doorgang; CI voert beide samengevoegd uit als de ene stap `check:complexity-ratchets`                                              | Ja                              |
| `check:dead-code`            | De ratchet voor ongebruikte exports/bestanden (knip) verslechtert niet ten opzichte van de baseline                                                                                                                      | Ja                              |
| `check:compression-budget`   | Budget voor compressiebenchmarks — de minimale tokenbesparingen per engine mogen niet verslechteren                                                                                                                      | Ja                              |
| `check:type-coverage`        | De ratchet voor het percentage getypeerde code (`type-coverage`) verslechtert niet; omvat grotendeels `typecheck:noimplicit:core`                                                                                        | Ja                              |
| `check:codeql-ratchet`       | Het aantal openstaande CodeQL-waarschuwingen verslechtert niet (uitgelezen via `gh api`; wordt probleemloos overgeslagen zonder token) — vernieuwingsfrequentie en handmatige activering: zie "CodeQL-ratchet" hieronder | Ja                              |

### Taak: `quality-extended`

De volledige job is adviserend (`continue-on-error: true`). De op npm gebaseerde ratchets worden
daadwerkelijk uitgevoerd; de externe scanners worden geïnstalleerd via `gh release download` en slaan zichzelf over (exit 0)
wanneer een binair bestand nog steeds ontbreekt.

| Script                   | Valideert                                                                                                                                                                                                                                      | Blokkerend     |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `check:circular-deps`    | Geen circulaire afhankelijkheden (dpdm)                                                                                                                                                                                                        | **Adviserend** |
| `check:bundle-size`      | Bundelgrootte overschrijdt de limiet niet                                                                                                                                                                                                      | **Adviserend** |
| `check:secrets`          | Scannen op geheimen (gitleaks) — wordt overgeslagen als het binaire bestand ontbreekt                                                                                                                                                          | **Adviserend** |
| `check:vuln-ratchet`     | Kwetsbaarheden in afhankelijkheden (osv-scanner) nemen niet toe — wordt overgeslagen als het binaire bestand ontbreekt                                                                                                                         | **Adviserend** |
| `check:workflows`        | Workflow-linting (actionlint + zizmor) — wordt overgeslagen als binaire bestanden ontbreken                                                                                                                                                    | **Adviserend** |
| `check:openapi-breaking` | Incompatibele wijzigingen in het openbare API-contract (`openapi.yaml`) ten opzichte van de basisbranch (oasdiff) — produceert `openapiBreaking=N`; wordt overgeslagen als oasdiff ontbreekt of de basisspecificatie niet kan worden opgehaald | **Adviserend** |

### Job: `docs-sync-strict`

Wordt uitgevoerd bij elke PR naar `main`. Blokkeert samenvoegen bij een fout.

| Script                         | Valideert                                                                                                                                                                                  | Blokkerend                |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------- |
| `check:docs-all`               | Metagate die de 6 onderstaande subgates achtereenvolgens uitvoert                                                                                                                          | Ja                        |
| ↳ `check:docs-sync`            | Versieconsistentie van CHANGELOG / OpenAPI / llm.txt                                                                                                                                       | Ja                        |
| ↳ `check:docs-counts`          | Aantallen in lopende tekst (aantal providers, aantal migraties enz.) vallen binnen het ratchetvenster van de werkelijke aantallen                                                          | Ja                        |
| ↳ `check:env-doc-sync`         | Elke omgevingsvariabele in `.env.example` is gedocumenteerd in een documentatietabel en omgekeerd                                                                                          | Ja                        |
| ↳ `check:deprecated-versions`  | Geen verouderde versiestrings in de documentatie                                                                                                                                           | Ja                        |
| ↳ `check:doc-links`            | Interne markdownlinks in de documentatie verwijzen naar bestaande bestanden (vorm `[text]`/`(path)`)                                                                                       | Ja                        |
| ↳ `check:fabricated-docs`      | Routes, omgevingsvariabelen, CLI-opdrachten, hooknamen en bestandspaden die in de documentatie worden genoemd, bestaan in de codebase. Harde gate via `--strict`; zachte fout zonder vlag. | Ja (via `--strict` in CI) |
| `check:cli-i18n`               | CLI-opdrachtstrings zijn aanwezig in alle i18n-localebestanden                                                                                                                             | Ja                        |
| `check:openapi-coverage`       | OpenAPI-specificatie dekt ten minste een via ratcheting vastgelegde ondergrens van de werkelijke routes                                                                                    | Ja                        |
| `check:openapi-security-tiers` | Beveiligingsniveau-annotaties in `openapi.yaml` komen overeen met de classificaties in `routeGuard.ts`                                                                                     | **Adviserend**            |
| `check:openapi-routes`         | Elk pad in `openapi.yaml` verwijst naar een bestaand `route.ts`-bestand (anti-hallucinatie)                                                                                                | Ja                        |
| `check:docs-symbols`           | Elke `/api/...`-verwijzing in `docs/**/*.md` verwijst naar een bestaand `route.ts`-bestand (anti-hallucinatie)                                                                             | Ja                        |
| `i18n translation drift`       | Onvertaalde sleutels in i18n-localebestanden — alleen waarschuwen                                                                                                                          | **Adviserend**            |

### Job: `i18n-ui-coverage`

| Script                            | Valideert                                                                                                                                                                                                          | Blokkerend     |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------- |
| `check-ui-keys-coverage` (inline) | Dekking van UI-i18n-sleutels is ≥ 65%                                                                                                                                                                              | Ja             |
| `check-ui-value-drift` (inline)   | Een herschreven Engelse **waarde** laat geen verouderde vertaling achter                                                                                                                                           | Ja             |
| `check-new-key-coverage` (inline) | Een **nieuwe** Engelse sleutel is in elke locale vertaald — een `__MISSING__:`-markering wordt afgewezen                                                                                                           | Ja             |
| `check-translation-ratio`         | Verhouding echte vertalingen per locale (identiek aan Engels / tijdelijke aanduiding / ontbrekende items buiten de toelatingslijst) mag `config/quality/i18n-translation-baseline.json` + marge niet overschrijden | **Adviserend** |

Vereist `fetch-depth: 0` — de waardeafwijkingscontrole vergelijkt `en.json` met de samenvoegbasis.

#### `check-ui-value-drift` — controle op verouderde vertalingen

Detecteert de ene i18n-regressie die de andere controles structureel niet kunnen zien: een Engelse waarde
wordt herschreven en de vertalingen die van de _vorige_ Engelse tekst zijn afgeleid, blijven staan, waardoor
niet-Engelstalige gebruikers stellige, maar inmiddels onjuiste tekst blijven lezen.

Dit is daadwerkelijk in productie terechtgekomen. `oauthModal.googleOAuthWarning` werd herschreven toen de Antigravity-
inloghelper werd geïntroduceerd (#5203); **39 van de 43 locales** behielden tekst waarin operators werd verteld om "de
volledige URL te kopiëren en hieronder te plakken" — een procedure die voor die provider niet kan worden voltooid. Dit bleef
onopgemerkt tot #8463, omdat:

- `sync-ui-keys` alleen sleutels aanvult die **afwezig** zijn, nooit sleutels die **verouderd** zijn;
- `check-ui-keys-coverage` de _aanwezigheid_ van sleutels telt, waardoor een verouderde vertaling als gedekt geldt;
- `check-translation-drift` de documentatiespiegels in `docs/i18n/<locale>/**.md` bijhoudt —
  deze leest nooit `src/i18n/messages/*.json`. Blokkerend in job `docs-sync-strict` sinds de
  hersynchronisatie van 2026-09: bewerk een kerndocument → `npm run i18n:run -- --files=<doc>` (op sectieniveau, goedkoop).

**Diff-bewust, niet gebaseerd op een baseline.** De controle vergelijkt `en.json` op de samenvoegbasis met de
werkboom; voor elke sleutel waarvan de Engelse waarde is gewijzigd, is elke locale die nog een
onaangeroerde vertaling bevat verouderd. Dit **bevriest bewust reeds bestaande achterstand** — uit een diff
kan niet worden afgeleid van welke oude Engelse tekst een reeds lang bestaande vertaling afkomstig is, dus beoordeelt
de controle alleen wat door de huidige wijziging wordt geraakt. Het alternatief (een hash-baseline per sleutel) zou
een gegenereerd bestand van circa 600 KB vereisen, 3× zo groot als de grootste bestaande baseline, met wijzigingen bij elke i18n-PR.

Er zijn twee manieren om aan de controle te voldoen:

1. werk de betreffende vertalingen bij, of
2. stel ze in op `__MISSING__:<new english>` — de runtime levert dan de gecorrigeerde Engelse tekst
   (`src/i18n/request.ts::deepMergeFallback`, #7258) en de sleutel wordt in de vertaalwachtrij geplaatst.

Als de **betekenis** van de tekenreeks is gewijzigd, geef dan de voorkeur aan **het hernoemen van de sleutel**: een nieuwe sleutel kan geen
verouderde vertaling overnemen. Dat is het patroon dat in #8463 is gebruikt.

```bash
npm run i18n:check-value-drift          # strikt (wat CI uitvoert)
npm run i18n:check-value-drift:warn     # alleen rapporteren
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Stopt met code 0 en `SKIP reason=base-unresolved` wanneer de basiscatalogus niet kan worden gelezen (ondiepe
kloon zonder de basisreferentie), overeenkomstig `check-openapi-breaking`.

### Job: `i18n`

Volledige i18n-validatiematrix (één job per locale). De volledige job is adviserend.

| Script                          | Valideert                             | Blokkerend                                                       |
| ------------------------------- | ------------------------------------- | ---------------------------------------------------------------- |
| `validate_translation.py quick` | Volledigheid van vertaling per locale | **Adviserend** (`continue-on-error: true` voor de volledige job) |

### Job: `pr-test-policy`

Wordt alleen uitgevoerd voor pull requests.

| Script                 | Valideert                                                                                                                                          | Blokkerend |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| `check:pr-test-policy` | PR's die productiecode in `src/`, `open-sse/`, `electron/` of `bin/` wijzigen, moeten tests bevatten of bijwerken (Harde regel #8)                 | Ja         |
| `check:test-masking`   | Gewijzigde testbestanden verlagen het nettoaantal assertions niet en voegen geen `assert.ok(true)`-tautologieën toe                                | Ja         |
| `check:pr-evidence`    | De PR-beschrijving vermeldt test-/VPS-bewijs voor de wijziging (mechaniseert Harde regel #18 door PR-proza te doorzoeken — kwetsbaar, zie Backlog) | Ja         |

### Job: `test-vitest`

Wordt uitgevoerd na `build`. Blokkeert samenvoegen bij een fout.

| Suite            | Valideert                                                | Blokkerend                                                                                                                       |
| ---------------- | -------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | MCP-server (110 tools), autoCombo, cache — vitest-runner | Ja                                                                                                                               |
| `test:vitest:ui` | UI-componenttests — vitest-runner                        | **Blokkerend** — reeds bestaande fouten worden expliciet uitgesloten in `vitest.config.ts`; nieuwe fouten laten de job mislukken |

### Nachtelijke workflows (gepland, adviserend)

Deze worden uitgevoerd volgens een cron-schema (en via `workflow_dispatch`), nooit bij PR's. Ze zijn allemaal adviserend.

| Workflow               | Valideert                                                                                                                                                                        | Blokkerend     |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `nightly-property`     | fast-check-propertytests met een willekeurige seed en een hoog aantal uitvoeringen                                                                                               | **Adviserend** |
| `nightly-resilience`   | heapgroeidrempel, chaotische foutinjectie, k6-belasting-/duurtest                                                                                                                | **Adviserend** |
| `nightly-llm-security` | promptfoo-injectiebeveiliging (blokkeermodus) + garak-probes (overgeslagen zonder providersecret)                                                                                | **Adviserend** |
| `nightly-schemathesis` | OpenAPI-contractfuzzing (schemathesis) tegen een live OmniRoute met `docs/openapi.yaml` — brengt specificatieschendingen/niet-afgehandelde 500-fouten aan het licht (Fase 8 B.4) | **Adviserend** |
| `nightly-mutation`     | Stryker-mutantentestenscore voor de snelle unit-lane — overlevende mutanten brengen zwakke assertions aan het licht                                                              | **Adviserend** |
| `nightly-compat`       | compatibiliteitsmatrix voor de Node-engine voor alle ondersteunde `engines.node`-bereiken                                                                                        | **Adviserend** |

---

## Velocity-fase (2026-08-30 → v4.0 LTS): elke baseline met 20% versoepeld

Besluit van de eigenaar (2026-08-30): tot de modularisering van v4.0 is de snelheid van opleveren belangrijker
dan het bewaken van de technische schuld. Elke **numerieke** ratchet-baseline is in één
controleerbare stap met 20% versoepeld en de fase is vastgelegd in `config/quality/quality-baseline.json`:

```json
"_policy": { "phase": "velocity", "since": "2026-08-30", "until": "4.0.0",
             "relaxPct": 20, "requireTighten": false }
```

| Wat is gewijzigd                                                                                                                                                                                                                             | Waar                                                                                                   |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `metrics.*.value` — aantallen waarbij lager beter is ×1.2, percentages waarbij hoger beter is ÷1.2 (de dekkingsondergrens van 60 blijft behouden, `eslintErrors` blijft 0, `eslintWarnings` 0 → 20% van het bevroren aantal onderdrukkingen) | `quality-baseline.json` (de notitie `_relax_velocity_2026_08_30` vermeldt elke waarde vóór → na)       |
| `count` ×1.2 / `percentage` ×1.2                                                                                                                                                                                                             | `complexity-baseline.json`, `duplication-baseline.json`                                                |
| `cap`, `testCap`, elke regellimiet van `frozen[*]` / `testFrozen[*]` ×1.2                                                                                                                                                                    | `file-size-baseline.json`                                                                              |
| aantallen per bestand / per TS-code ×1.2                                                                                                                                                                                                     | `api-typecheck-baseline.json`, `dashboard-typecheck-baseline.json`, `open-sse-typecheck-baseline.json` |
| `THRESHOLD` 36 → 30                                                                                                                                                                                                                          | `scripts/check/check-openapi-coverage.mjs`                                                             |
| `--require-tighten` wordt adviserend zolang `_policy.requireTighten === false`                                                                                                                                                               | `scripts/quality/check-quality-ratchet.mjs`                                                            |
| nachtelijke `bank-ratchet-shrinks` wordt gepauzeerd (de gemeten verkleining zou worden vastgelegd en de speelruimte ongedaan maken)                                                                                                          | `.github/workflows/nightly-release-green.yml`                                                          |

Toelatingslijsten (`eslint-suppressions.json`, `test-masking-allowlist.json`, `test-discovery-baseline.json`,
…) zijn **geen** budgetten en zijn niet aangepast. Beleidscontroles met slagen/mislukken als uitkomst (geheimen, SQL-regels,
docs/env-contract, i18n-pariteit, unit-tests) blijven ongewijzigd — een rode test blijft een rode test.

**Tooling**

- `npm run quality:relax-baselines -- --pct 20 --note velocity_YYYY_MM_DD [--dry-run]` — de
  eenmalige versoepeling (`scripts/quality/relax-baselines.mjs`); weigert tweemaal met dezelfde
  notitie te worden uitgevoerd.
- `npm run quality:headroom [-- --only deadExports,fileSize] [--json out.json --md out.md]` —
  meet elke numerieke controle zoals CI dat doet en toont de resterende speelruimte per controle
  (`scripts/quality/baseline-headroom.mjs`). De nachtelijke `baseline-headroom`-taak plaatst de
  tabel in het doorlopende issue **📈 Baseline-speelruimte (velocity-fase)** en voegt het label
  `headroom-alert` toe wanneer een controle binnen 10% van zijn limiet zit of deze al heeft overschreden. Dat issue
  is de vroegtijdige waarschuwing: een budget dat binnen enkele dagen volloopt, betekent dat de versoepeling door
  enkele PR's wordt verbruikt en niet door het hele team — bekijk de `_rebaseline_*`-notities van de betreffende controle.

**Modus voor nieuwe code (Clean-as-You-Code) — sinds 2026-08-30, alleen het snelle pad voor PR's**

Bij `pull_request`-gebeurtenissen geeft `quality.yml` `--base-ref <PR base SHA>` door aan `check:file-size`,
`check:complexity-ratchets` en `check:dead-code`. In die modus vergelijkt de controle HEAD met de
merge-base, **beperkt tot de bestanden die door de PR zijn gewijzigd** (`scripts/check/newCodeMode.mjs`: de
merge-base wordt beschikbaar gemaakt in een tijdelijke `git worktree`, ESLint/knip worden daar en op HEAD uitgevoerd, en de
aantallen per bestand worden vergeleken):

- **blokkerend** — de PR heeft cyclomatische/cognitieve overtredingen of dode exports toegevoegd in gewijzigde bestanden
  (`complexityNewCode=`, `cognitiveComplexityNewCode=`, `deadExportsNewCode=` in het logboek);
- **adviserend** — het globale totaal ten opzichte van de bevroren baseline. Overgeërfde afwijkingen maken een
  onschuldige PR nooit rood; de afwijking wordt tijdens de release-afstemming opnieuw bevroren en door de headroom-taak bewaakt.

`workflow_dispatch`-uitvoeringen, de release-green-controle en de nachtelijke headroom-taak hebben geen PR-basis
en blijven de absolute (globale) vergelijking gebruiken. Coverage, duplicatie en type-coverage blijven
voorlopig globaal (hun tools kunnen niet efficiënt een diff per bestand produceren) — kandidaten voor dezelfde behandeling.

**De fase afsluiten bij v4.0 (LTS = strenger dan voorheen, niet "terug naar normaal")**

1. Op de ongewijzigde tip van `release/v4.0.0`: voer ter vastlegging `npm run quality:headroom --json` uit en vervolgens
   `npm run quality:ratchet -- --update`, `check:file-size --update`,
   `check:complexity-ratchets --update`, `check:dead-code --update` en
   `--update` voor elke typecheck-gate — elke baseline wordt verlaagd tot de gemeten waarde.
2. Verwijder `_policy` uit `quality-baseline.json` (hiermee worden `--require-tighten` en het nachtelijk
   opsparen opnieuw geactiveerd) en herstel `THRESHOLD = 36` (of hoger) in `check-openapi-coverage.mjs`.
3. Verscherp tot voorbij de gemeten waarden waar de modularisering resultaat heeft opgeleverd: zet de `cap` voor bestandsgrootte terug op 1000
   (of 800), verhoog de minimale dekkingspercentages met 5 en stel dode exports voor de gemodulariseerde pakketten in op 0.

## Ratchet-basislijn (`quality-baseline.json`)

De ratchet-engine (`scripts/quality/check-quality-ratchet.mjs`) leest `quality-baseline.json`
en vergelijkt dit bestand met de zojuist verzamelde `quality-metrics.json`. Elke metriek die
meer dan de toegestane epsilon achteruitgaat, laat de build mislukken.

Momenteel bijgehouden metrieken:

| Metriek               | Richting | Betekenis                                          |
| --------------------- | -------- | -------------------------------------------------- |
| `eslintWarnings`      | `down`   | Het aantal ESLint-waarschuwingen mag niet toenemen |
| `coverage.statements` | `up`     | De statementdekking mag niet afnemen               |
| `coverage.lines`      | `up`     | De regeldekking mag niet afnemen                   |
| `coverage.functions`  | `up`     | De functiedekking mag niet afnemen                 |
| `coverage.branches`   | `up`     | De vertakkingsdekking mag niet afnemen             |

Om de basislijn bij te werken na een daadwerkelijke verbetering:

```bash
npm run quality:ratchet -- --update
git add quality-baseline.json
```

De vlag `--update` schrijft de huidige gemeten waarden naar `quality-baseline.json`.
Commit dit bestand samen met de wijziging die de metriek heeft verbeterd. Een PR die een
metriek verbetert zonder de basislijn bij te werken, wordt onderschept door `--require-tighten` (Fase 6A.5,
implementatie in behandeling).

### CodeQL-ratchet: vernieuwingsfrequentie en handmatige trigger

`check:codeql-ratchet` leest **de status van de repository, die volgens een schema wordt vernieuwd — niet per PR.**
`gh api repos/diegosouzapw/OmniRoute/code-scanning/default-setup` rapporteert
`state: configured`, `schedule: weekly`: de standaardconfiguratiescan van GitHub, niet een
analyse per push. Gevolg: nadat een PR die waarschuwingen OPLOST is gemerged, blijft de ratchet
het oude, hogere aantal lezen totdat de volgende geplande scan wordt uitgevoerd — waardoor deze
bij elke open PR een regressie rapporteert, inclusief bij vervolg-PR's van de reparerende PR zelf,
totdat de scan is bijgewerkt.

**Handmatig vernieuwen**: `gh workflow run codeql.yml --ref release/vX.Y.Z` voert de
analyse opnieuw uit en publiceert de waarschuwingen binnen enkele minuten opnieuw. Lees eerst
`.github/workflows/codeql.yml` — de header legt uit dat deze uitsluitend via `workflow_dispatch`
wordt uitgevoerd **omdat dit conflicteert met de "default setup" van GitHub** (`CodeQL analyses from advanced configurations cannot be
processed when the default setup is enabled`). Voor het herstellen van `push`/`pull_request`/
`schedule`-triggers is **eerst een actie van een eigenaar vereist**: Settings → Code security →
CodeQL: Default → Advanced. Voeg geen `schedule:`-trigger toe zonder die omschakeling — dit
levert alleen mislukte uitvoeringen op.

**Verscherp de basislijn nadat het aantal is afgenomen** — `node scripts/check/check-codeql-ratchet.mjs
--update` schrijft het nieuwe gemeten aantal naar `quality-baseline.json` →
`metrics.codeqlAlerts.value`, zodat de ratchet niet stilzwijgend een regressie tot aan
de oude bovengrens toestaat. Uitgewerkt voorbeeld (2026-09-02/03): PR #12502 verhielp 7 echte waarschuwingen
(13 → 6 gemeten openstaand); PR #12530 verscherpte de vastgelegde basislijn van 11 → 6 zodat deze overeenkwam;
de resterende 6 werden vervolgens, met een rechtvaardiging per waarschuwing, verworpen tot er 0 openstonden.

**Verwerpingen zijn de beslissing van de operator (Harde regel #14)** — verwerp nooit een CodeQL-waarschuwing
zonder de technische rechtvaardiging vast te leggen in de verwerpingsopmerking: `won't fix` voor
een vereiste van een upstream-protocol, `used in tests` voor een testfixture, `false positive`
voor een sanitizer die CodeQL niet kan waarnemen (precedent: `docs/security/ERROR_SANITIZATION.md`).

---

## Beleid voor het opnieuw uitvoeren van tests (WS5.4, v3.8.49)

Opnieuw uitvoeren wordt per runner ingesteld, nooit als algemene regel — een algemene retry verandert echte regressies
in onzichtbare flakes:

| Runner           | Beleid                                                                                                                          | Waarom                                                                                                                                      |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| Playwright (e2e) | `retries: 1` alleen in CI, met `trace: on-first-retry`                                                                          | Browser-/netwerktiming is daadwerkelijk niet-deterministisch; één retry met een trace verandert een flake in een diagnosticeerbaar artefact |
| Vitest           | GEEN globale retry. Een aantoonbaar flaky test krijgt een expliciete retry per test (zichtbaar in de diff, beoordeeld in de PR) | Houdt de quarantainelijst in de repo, nooit ondoorzichtig                                                                                   |
| node:test (unit) | NOOIT een retry                                                                                                                 | Een flaky unittest is een bug in de test — los deze op, voer hem niet simpelweg opnieuw uit                                                 |

Beoogde SLO's zodra flaketelemetrie beschikbaar is (WS5.2/5.3): <1% flakepercentage per test
(drempel voor "nu oplossen"), ≥95% slagingspercentage per pipeline. Referentiewaarden uit de sector —
opnieuw kalibreren aan de hand van onze eigen metingen.

## Verloop van releasebrede ratchets (WS5.5, v3.8.49)

Wanneer een ratchet (bestandsgrootte, complexiteit, eslint-waarschuwingen) achteruitgaat op de ZUIVERE
release-tip — d.w.z. dat de COMBINATIE van merges de regressie heeft veroorzaakt en geen enkele PR de
regressie afzonderlijk op zijn eigen branch reproduceert — is de oplossing **eenmalig de verantwoordelijkheid van de release captain, op de
release-branch**: geef de voorkeur aan extractie/refactoring; stel de baseline alleen opnieuw vast met de gedocumenteerde
motivering. Schuif gecombineerd verloop nooit af op de PR van een bijdrager en stel de baseline nooit
per PR opnieuw vast (dat verbergt echte regressies). Maak eerst onderscheid: reproduceer de
rode status op de zuivere tip in een probe-worktree voordat je aanneemt dat jouw PR deze heeft veroorzaakt.

## Verkleiningen van ratchets vastleggen — de neerwaartse richting (#8584)

De ratchet is maar half geautomatiseerd, en dan nog de verkeerde helft. Een limiet **verhogen** is een
handmatige JSON-bewerking die tien seconden duurt en de snelste manier is om een rode PR te deblokkeren.
Een limiet **verlagen** vereist dat iemand `--update` uitvoert en het resultaat commit — en totdat
de job `bank-ratchet-shrinks` werd toegevoegd, voerde geen enkele workflow dit uit. Het gemeten gevolg
(2026-07-25): 18 bevroren bestanden zaten al op of onder de limiet van 800 regels voor nieuwe bestanden, met als ergste
132× (`src/shared/validation/schemas.ts`, 19 regels met een limiet van 2.523); het
complexiteitsplafond liep op van `1794 → 2169` verspreid over ~37 opmerkingen over het opnieuw vaststellen van de baseline, met precies één
daling (−1); en "volgende cyclus aanscherpen via `--update`" werd 31 keer geschreven en één keer
nageleefd. Een limiet die langer blijft bestaan dan de code waaraan die te danken is, verandert elke voltooide
opsplitsing stilzwijgend in extra groeiruimte voor degene die het bestand vervolgens bewerkt.

`nightly-release-green.yml` → job **`bank-ratchet-shrinks`** sluit die lus:

|                      |                                                                                                                      |
| -------------------- | -------------------------------------------------------------------------------------------------------------------- |
| Wordt uitgevoerd bij | `schedule` (3×/dag) + `workflow_dispatch` — bewust **niet** bij `push`                                               |
| Meet                 | de hoogste `release/vX.Y.Z`, met dezelfde resolutie + injectiebeveiliging als `release-green`                        |
| Schrijft             | `check:file-size --update` en `check:complexity-ratchets --update` (beide zijn door hun opzet uitsluitend verlagend) |
| Verifieert           | `npm run check:ratchet-bank` (`scripts/quality/verify-ratchet-bank.mjs`)                                             |
| Levert               | één altijd actuele PR voor de release-branch — geforceerd bijgewerkt, nooit gespamd                                  |

Vastlegging gebeurt gebundeld in plaats van per push, omdat er geen latentievereiste is (een verkleining die
binnen 8 uur wordt vastgelegd is prima), terwijl een uitvoering per merge tijdens mergecampagnes de PR-branch
herhaaldelijk opnieuw zou bouwen en telkens de kosten van een volledige ESLint-doorloop met zich mee zou brengen. Detectie blijft plaatsvinden bij
push (`release-green`); alleen het vastleggen gebeurt gebundeld.

### De veiligheidsverificatie

De job schrijft zonder toezicht naar de baselines, dus `verify-ratchet-bank.mjs` maakt
dat aanvaardbaar. Het vergelijkt de tree na `--update` met `HEAD` en **breekt de job af
voordat er een commit bestaat** — zonder een PR te openen — tenzij elke wijziging een van de volgende is:

- een numerieke `frozen`- of `testFrozen`-vermelding die is **verlaagd** of **verwijderd**
- `complexity-baseline.json` → `count` **verlaagd**
- `quality-baseline.json` → `metrics.cognitiveComplexity.value` **verlaagd**

Al het andere mislukt: een getal verhogen, een vermelding toevoegen, `cap`/`testCap` wijzigen of
een `_rebaseline_*`-opmerking verwijderen/herschrijven (die opmerkingen vormen het auditspoor voor waarom elk
plafond bestaat en worden opgeslagen in hetzelfde `frozen`-object als de bestandsvermeldingen).
Een bot die een limiet zou kunnen verhogen, zou strikt slechter zijn dan de status quo. Regressiebeveiliging:
`tests/unit/verify-ratchet-bank.test.ts`.

De job pusht nooit naar `release/*` — een mens merget de PR, zodat een onjuiste meting
niet zonder beoordeling kan worden opgenomen.

## Allowlistbeleid

Elke gate die niet mag falen op reeds bestaande overtredingen, gebruikt een bevroren allowlist
(bijv. `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`). Het beleid is:

**Los de hoofdoorzaak op; gebruik de allowlist alleen wanneer de overtreding reeds bestond en
niet in dezelfde PR kan worden opgelost.**

Bij het toevoegen van een item aan een allowlist:

1. Voeg een commentaarregel toe met de rechtvaardiging.
2. Verwijs naar het tracking-issue (bijv. `// #3498 — Fase 2-functionaliteit, nog niet geïmplementeerd`).
3. Verwijder het item in dezelfde PR die de overtreding oplost — een verouderd item dat niet langer
   een actieve overtreding onderdrukt, is zelf een defect (6A.3-controle op verouderde handhaving zal,
   zodra deze is geïmplementeerd, de gate laten falen bij een verweesd allowlist-item).

Voeg **geen** allowlist-items toe om tests sneller te laten slagen. Een groene gate met een groeiende
allowlist geeft een vals gevoel van kwaliteit.

### Wanneer een gate faalt voor je PR

1. **Lees de uitvoer van de gate zorgvuldig** — daarin staat precies welk bestand of symbool
   de regel heeft overtreden.
2. **Los de overtreding op** — de meeste gates zijn deterministische bestandssysteemcontroles die slagen zodra
   de code correct is.
3. **Als de overtreding reeds bestond** (d.w.z. jij hebt deze niet geïntroduceerd, maar de gate
   dekt deze nu wel): voeg een allowlist-item toe met een rechtvaardigingscommentaar en een tracking-issue.
4. **Als de gate een ratchet is** (dekking, ESLint-waarschuwingen, duplicatie, complexiteit):
   je wijziging heeft de metriek verslechterd. Los het onderliggende probleem op of voer (zelden)
   `npm run quality:ratchet -- --update` uit als de wijziging opzettelijk is en de
   verslechtering van de metriek aanvaardbaar is — maar leg in de PR-beschrijving uit waarom.
5. **Adviserende gates** (`continue-on-error: true`) zijn informatief — ze blokkeren
   het samenvoegen niet, maar verschijnen wel in het CI-overzicht. Los ze desondanks op.

---

## Een nieuwe gate toevoegen

1. Maak `scripts/check/check-<name>.mjs` (of `.ts`) aan. Beleids-gates eindigen met exitcode 0/1.
   Gates in ratchet-stijl schrijven via `collect-metrics.mjs` een metriek naar `quality-metrics.json`.
2. Voeg `"check:<name>": "node scripts/check/check-<name>.mjs"` toe aan `package.json`.
3. Neem deze op in `.github/workflows/ci.yml` onder de juiste job
   (beleid → `lint` of `docs-sync-strict`; ratchet → `quality-gate`).
4. Als de gate een allowlist heeft, pas dan `reportStaleEntries()` uit
   `scripts/check/lib/allowlist.mjs` toe, zodat verouderde items automatisch worden gedetecteerd.
5. Schrijf een test in `tests/unit/build/` die de detectielogica van de gate afdekt.
6. Werk dit document bij (voeg een rij toe aan de relevante jobtabel).

---

## Agenttooling: LSP-in-the-loop (opt-in)

Naast de CI-gates levert OmniRoute een **optioneel** `agent-lsp`-geraamte
(een `.mcp.json` op projectniveau, Fase 7 Taak 15). Maak `.mcp.json` aan
om een TypeScript-taalserver beschikbaar te stellen aan programmeeragents, zodat zij symbolen /
diagnostiek oplossen **voordat** ze code schrijven — een compile-before-claim-aanvulling op
`typecheck:core` die fouten door 'verzonnen symbolen' bij de bron vermindert. Deze wordt bewust
niet automatisch geladen (je kiest en verifieert zelf de MCP↔LSP-bridge); een defect item registreert alleen een
verbindingsfout en onderbreekt nooit sessies.

---

## Rationalisatiebacklog (ROI-beoordeling — Fase 9 Golf 3)

Deze inventaris is op 2026-06-17 afgestemd op `ci.yml` (in de vorige versie ontbraken
`audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`,
`check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`,
`check:codeql-ratchet`, `check:pr-evidence`). Een ROI-beoordeling van de afgestemde set
bracht de volgende kandidaten voor rationalisatie aan het licht. **De samenvoegingen zijn mechanische CI-
wijzigingen; de omzettingen/verwijderingen zijn beleidsbeslissingen die aan de operator zijn voorbehouden.** Niets hieronder
is al toegepast.

**Hierboven ook niet gedocumenteerd** (adviserend, zwak signaal): de `docs-lint`-job
(markdownlint + Vale, de volledige job met `continue-on-error`) en de zelfstandige scannerworkflows
`semgrep.yml` / `codeql.yml` / `scorecard.yml`. `semgrepFindings: 0` staat in
`quality-baseline.json`, maar is niet gekoppeld aan een blokkerende ratchet in `ci.yml` — de metriek is
momenteel verweesd.

### Samenvoegen / dedupliceren (mechanisch, lager risico)

Elke kandidaat is op 2026-06-17 gevalideerd tegen de actuele status van de gates (vertrouw, maar verifieer);
verschillende „voor de hand liggende” samenvoegingen bleken verborgen technische schuld te bevatten en zijn **geen** directe vervangingen.

- **`check:docs-sync` wordt tweemaal uitgevoerd** — zelfstandig in de `lint`-job en opnieuw binnen `check:docs-all` (`docs-sync-strict`) en de husky-pre-commithook. ✅ **VOLTOOID** — zelfstandige aanroep in `lint` verwijderd.
- **CVE-scanning** — ❌ **GEEN zuivere samenvoeging.** `audit:deps` faalt hard bij elke CVE met hoge/kritieke ernst; `check:vuln-ratchet` (osv) faalt alleen bij een _regressie_ ten opzichte van de baseline (momenteel 1 MODERATE). Verschillende semantiek — door `audit:deps` te verwijderen zou de absolute gate voor hoge/kritieke ernst verloren gaan. Behoud beide.
- **Cyclusdetectie** — ❌ **GEEN zuivere samenvoeging.** `check:circular-deps` (dpdm) rapporteert **91 cycli** (daarom is deze adviserend); deze kan niet blokkerend worden gemaakt zonder ze eerst op te lossen en heeft een breder bereik dan de groene, zorgvuldig samengestelde `check:cycles`. Behoud `check:cycles` als blokkerend; het oplossen van de 91 dpdm-cycli vormt een afzonderlijke backlog.
- **Complexiteit** — ✅ **VOLTOOID** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): één ESLint-scan, telt per ruleId zodat de baselines voor cyclomatische complexiteit + maximaal aantal regels en cognitieve complexiteit onafhankelijk blijven; afzonderlijke `check:complexity` / `check:cognitive-complexity` blijven behouden voor lokale `--update`.
- **`/api`-antihallucinatie** — ✅ **VOLTOOID** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): één bestandssysteeminventarisatie van `src/app/api`; openapi-routes + docs-symbols blijven onafhankelijk rapporteren; afzonderlijke controles blijven behouden voor lokale uitvoeringen.
- **`check:node-runtime` wordt in 11 jobs uitgevoerd** — ⚠️ **lage ROI.** Elke job gebruikt een afzonderlijke runner en de controle duurt <1 s; totale besparing ~10 s, tegenover het verlies van een goedkope beveiliging per job. De verstoring niet waard.
- **`typecheck:noimplicit:core` bij CI-linting** — ✅ **verwijderd uit de lint-job** (was adviserend met `continue-on-error`); het blokkerende type-oppervlak bestaat uit `typecheck:core` + `check:type-coverage`. Lokaal script behouden.

### Omzetten / beslissen (operatorbeleid)

- `check:openapi-security-tiers` (adviserend) — ❌ **NIET zonder meer om te zetten.** Deze eindigt met 0, maar waarschuwt dat meerdere `traffic-inspector`-routes onder `LOCAL_ONLY_API_PREFIXES` de annotatie `x-loopback-only: true` missen. Handhaving vereist dat die annotaties eerst aan `openapi.yaml` worden toegevoegd.
- `typecheck:noimplicit:core` (adviserend) — grotendeels afgedekt door de blokkerende `check:type-coverage`-ratchet. Zet deze om naar een ratchet of verwijder de redundante tweede `tsc`-doorgang.
- `test:vitest:ui` (nu **blokkerend**) — reeds bestaande fouten zijn expliciet uitgesloten in `vitest.config.ts` met `// #8618`-trackingopmerkingen; nieuwe fouten laten de job mislukken.
- `check:secrets` (gitleaks, blokkerende ratchet bevroren op 3 gedocumenteerde fout-positieven) — voeg de 3 toe aan de allowlist om 0 te bereiken, of degradeer deze naar adviserend. Overlapt met de ingebouwde secret-scanning van GitHub + `check:public-creds`.
- `check:pr-evidence` (blokkerend, doorzoekt de prozatekst van PR-beschrijvingen) — hoog risico op fout-positieven; verwijdering verzwakt de handhaving van Hard Rule #18, dus dit is een echte beleidsbeslissing.
- `semgrep` (zelfstandig, adviserend) — overlapt met CodeQL voor de OWASP-categorieën; koppel de baseline aan een ratchet of verwijder deze.

---

## Gerelateerde documentatie

- Softwaretoeleveringsketen (herkomst, SBOM, Trivy, Scorecard): [`docs/security/SUPPLY_CHAIN.md`](../security/SUPPLY_CHAIN.md)

#### `check-key-completeness` — poort voor pariteit van sleutelsets

`scripts/i18n/check-key-completeness.mjs` (`npm run i18n:check-keys`, job `i18n-ui-coverage`).
Vergelijkt de verzameling bladsleutels van elk `src/i18n/messages/<locale>.json` met `en.json` en faalt
bij elk ontbrekend of extra blad, ongeacht wanneer de sleutel is toegevoegd. Tijdelijke aanduidingen
met `__MISSING__:` tellen als aanwezig (hun inhoud valt onder de verhoudingspoort). Dit is de absolute
aanvulling op de twee op verschillen/percentages gebaseerde poorten: `check-ui-keys-coverage` handhaaft
een ondergrens van 80 % per locale (43 ontbrekende sleutels op ~13.000 wordt nog steeds als 99,7 % weergegeven)
en `check-new-key-coverage` beoordeelt alleen de sleutels die een PR aan `en.json` toevoegt. Een locale-batch
wordt gegenereerd op basis van de `en.json` van de dag waarop de branch wordt afgesplitst en wordt dagenlang
vertaald terwijl de basis nieuwe sleutels blijft toevoegen; de batch-PR voegt zelf geen sleutel toe, waardoor
beide verwante controles stil bleven toen batch 1 (#13044) werd samengevoegd met 43 ontbrekende sleutels in
negen locales en batch 2 (#13660) met 10 ontbrekende sleutels in acht locales (2026-09-15). Los een rode status
op met `node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers`; een `extra` blad
betekent dat de bron het heeft verwijderd — verwijder het uit de locale. `--warn` rapporteert zonder te falen.
`--catalog=cli` voert dezelfde vergelijking uit voor `bin/cli/locales` (`npm run i18n:check-keys:cli`);
beide stappen bevinden zich in job `i18n-ui-coverage`.

#### `check-new-key-coverage` — i18n-poort voor nieuwe sleutels

Verwante controle van `check-ui-value-drift`. Die detecteert een Engelse waarde die is **herschreven**
terwijl de vertalingen niet zijn bijgewerkt; deze detecteert een Engelse sleutel die is **toegevoegd**
terwijl sommige locales deze nooit hebben ontvangen.

`check-ui-keys-coverage` kan deze categorie niet detecteren: deze controle handhaaft een procentuele
ondergrens per locale, en elf ontbrekende sleutels op ~13.000 laten de dekking op 99,9% staan. Een percentage
per taal kan niet uitdrukken: "deze functionaliteit is onvertaald uitgebracht" — volledige functionaliteit
kan zonder enige tekst in een nieuwe locale terechtkomen zonder dat het getal ooit verandert.

Het incident dat hierin is vastgelegd: fase 3 van het Orchestration Canvas vertaalde de elf bijbehorende
sleutels voor de 42 locales die destijds bestonden. Enkele uren later bracht de EU-talenbatch (#13044) de
repository op 51 locales, en de negen nieuwkomers (`el`, `et`, `ga`, `hr`, `lt`, `lv`, `mt`, `sl`, `sr`)
hebben ze nooit ontvangen. `deepMergeFallback` vervangt een ontbrekende sleutel door Engels, waardoor de
fout zich uitte als een onvertaalde gebruikersinterface in plaats van een lege gebruikersinterface — een
reëel probleem dat door de opzet onopgemerkt bleef.

Net als de verwante controle is deze **verschilbewust**: Engels op de merge-base wordt vergeleken met de
werkboom, zodat bestaande hiaten bevroren blijven en er geen migratie nodig was om de poort in te schakelen.

**Een aanduiding `__MISSING__:<english>` voldoet niet (sinds 2026-09-17).** Dit was voorheen het
gedocumenteerde uitstelmechanisme — tijdens runtime wordt teruggevallen op correct Engels — totdat acht
feature-PR's op 2026-09-16 61 sleutels toevoegden en de aanduiding in alle 65 locales plaatsten in plaats
van ze te vertalen: deze poort accepteerde ze allemaal, niets blokkeerde de PR's en de blokkerende
verhoudingspoort voor echte vertalingen faalde vervolgens voor iedereen op de releasetip (pt-BR 3,2 % >
2,5 % + 0,5). Een aanduiding wordt nu als ontbrekende vertaling beoordeeld. Los een rode status op met
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers --batch-size=40`, of verwerk
alle locales parallel met `npm run i18n:translate-new-keys` (`scripts/i18n/translate-new-keys.sh`,
veilig bij loskoppeling, weigert te starten zonder de `OMNIROUTE_TRANSLATION_*`-omgevingsvariabelen). Een
sleutel die Engels moet blijven (een vastgelegde product-, engine- of vlagnaam) hoort thuis in
`scripts/i18n/untranslatable-keys.json`, nooit achter een aanduiding. `vi` verbiedt aanduidingen volledig
(`tests/unit/i18n-vi-completeness.test.ts`).

#### `check-vitest-exclusions` — poort voor geparkeerde tests

Een bestand in de `exclude`-lijst van `vitest.config.ts` is een test die niet wordt uitgevoerd, maar voor
iemand die de boom bekijkt lijkt het wel dekking te bieden. Tweeënzestig bestanden stapelden zich op achter
de opmerking `// #8618 — pre-existing failure; remove this exclusion when fixed`. Issue #8618 werd op
2026-08-11 gesloten, terwijl de bijbehorende lijst van 45 naar 62 vermeldingen groeide en elke nieuwe
vermelding een opmerking overnam die naar een afgehandeld issue verwees. Toen de lijst uiteindelijk bestand
voor bestand werd gemeten (#13204), **slaagden 51 van de 62 tegen de huidige boom zonder enige bronwijziging**.

De poort vereist dat elke uitsluiting die naar een echt bestand verwijst (a) een tracking-issue noemt en
(b) in `config/quality/vitest-exclusions.json` voorkomt met de gemeten status, zodat het toevoegen ervan een
beoordeelbaar verschil in een afzonderlijk bestand oplevert in plaats van nog een regel in een array met 60
vermeldingen. De uitgesloten tests worden bewust niet opnieuw uitgevoerd — dat kost ~10 minuten en hoort
thuis in een periodieke job; de inventaris legt vast wanneer elke test voor het laatst is gemeten.
