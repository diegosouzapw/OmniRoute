# Quality Gates Reference (Dansk)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/QUALITY_GATES.md) · 🇪🇹 [am](../../../am/docs/architecture/QUALITY_GATES.md) · 🇸🇦 [ar](../../../ar/docs/architecture/QUALITY_GATES.md) · 🇦🇿 [az](../../../az/docs/architecture/QUALITY_GATES.md) · 🇧🇬 [bg](../../../bg/docs/architecture/QUALITY_GATES.md) · 🇧🇩 [bn](../../../bn/docs/architecture/QUALITY_GATES.md) · 🇧🇦 [bs](../../../bs/docs/architecture/QUALITY_GATES.md) · 🇨🇿 [cs](../../../cs/docs/architecture/QUALITY_GATES.md) · 🇩🇪 [de](../../../de/docs/architecture/QUALITY_GATES.md) · 🇬🇷 [el](../../../el/docs/architecture/QUALITY_GATES.md) · 🇪🇸 [es](../../../es/docs/architecture/QUALITY_GATES.md) · 🇪🇪 [et](../../../et/docs/architecture/QUALITY_GATES.md) · 🇮🇷 [fa](../../../fa/docs/architecture/QUALITY_GATES.md) · 🇫🇮 [fi](../../../fi/docs/architecture/QUALITY_GATES.md) · 🇫🇷 [fr](../../../fr/docs/architecture/QUALITY_GATES.md) · 🇮🇪 [ga](../../../ga/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [gu](../../../gu/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ha](../../../ha/docs/architecture/QUALITY_GATES.md) · 🇮🇱 [he](../../../he/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [hi](../../../hi/docs/architecture/QUALITY_GATES.md) · 🇭🇷 [hr](../../../hr/docs/architecture/QUALITY_GATES.md) · 🇭🇺 [hu](../../../hu/docs/architecture/QUALITY_GATES.md) · 🇦🇲 [hy](../../../hy/docs/architecture/QUALITY_GATES.md) · 🇮🇩 [id](../../../id/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ig](../../../ig/docs/architecture/QUALITY_GATES.md) · 🇮🇹 [it](../../../it/docs/architecture/QUALITY_GATES.md) · 🇯🇵 [ja](../../../ja/docs/architecture/QUALITY_GATES.md) · 🇬🇪 [ka](../../../ka/docs/architecture/QUALITY_GATES.md) · 🇰🇭 [km](../../../km/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [kn](../../../kn/docs/architecture/QUALITY_GATES.md) · 🇰🇷 [ko](../../../ko/docs/architecture/QUALITY_GATES.md) · 🇱🇹 [lt](../../../lt/docs/architecture/QUALITY_GATES.md) · 🇱🇻 [lv](../../../lv/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ml](../../../ml/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [mr](../../../mr/docs/architecture/QUALITY_GATES.md) · 🇲🇾 [ms](../../../ms/docs/architecture/QUALITY_GATES.md) · 🇲🇹 [mt](../../../mt/docs/architecture/QUALITY_GATES.md) · 🇲🇲 [my](../../../my/docs/architecture/QUALITY_GATES.md) · 🇳🇵 [ne](../../../ne/docs/architecture/QUALITY_GATES.md) · 🇳🇱 [nl](../../../nl/docs/architecture/QUALITY_GATES.md) · 🇳🇴 [no](../../../no/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [or](../../../or/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [pa](../../../pa/docs/architecture/QUALITY_GATES.md) · 🇵🇭 [phi](../../../phi/docs/architecture/QUALITY_GATES.md) · 🇵🇱 [pl](../../../pl/docs/architecture/QUALITY_GATES.md) · 🇵🇹 [pt](../../../pt/docs/architecture/QUALITY_GATES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/QUALITY_GATES.md) · 🇷🇴 [ro](../../../ro/docs/architecture/QUALITY_GATES.md) · 🇷🇺 [ru](../../../ru/docs/architecture/QUALITY_GATES.md) · 🇱🇰 [si](../../../si/docs/architecture/QUALITY_GATES.md) · 🇸🇰 [sk](../../../sk/docs/architecture/QUALITY_GATES.md) · 🇸🇮 [sl](../../../sl/docs/architecture/QUALITY_GATES.md) · 🇷🇸 [sr](../../../sr/docs/architecture/QUALITY_GATES.md) · 🇸🇪 [sv](../../../sv/docs/architecture/QUALITY_GATES.md) · 🇰🇪 [sw](../../../sw/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ta](../../../ta/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [te](../../../te/docs/architecture/QUALITY_GATES.md) · 🇹🇭 [th](../../../th/docs/architecture/QUALITY_GATES.md) · 🇹🇷 [tr](../../../tr/docs/architecture/QUALITY_GATES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/QUALITY_GATES.md) · 🇵🇰 [ur](../../../ur/docs/architecture/QUALITY_GATES.md) · 🇺🇿 [uz](../../../uz/docs/architecture/QUALITY_GATES.md) · 🇻🇳 [vi](../../../vi/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [yo](../../../yo/docs/architecture/QUALITY_GATES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/QUALITY_GATES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/QUALITY_GATES.md)

---

Dette dokument er den autoritative reference for alle CI-kvalitetskontroller i OmniRoute.
Det beskriver hver kontrol, hvad den validerer, hvilket CI-job den kører i, om den bruger
en ratchet-baseline eller en bestået/ikke bestået-politik, og om den blokerer buildet eller kun er vejledende.

Se afsnittet "Kvalitetskontroller og ratchets"
i `AGENTS.md` for at få en kort oversigt og politikken for tilladelseslisten. Se
[Playbook for kvalitetskontroller](../ops/QUALITY_GATE_PLAYBOOK.md) for den kritiske vurdering, modenhedsklassificering og værktøjsuafhængige
plan til replikering af det samme system.

---

## Gateoversigt (~90 scripts)

Scripts findes under `scripts/check/` (politik-gates) og `scripts/quality/` (ratchet-motor).
Den autoritative CI-kilde er `.github/workflows/ci.yml`.

### Hurtigsti for release-PR'er (`quality.yml`)

`.github/workflows/quality.yml` kører på PR'er, der er målrettet `release/**`. Den holder bidragyderes
branches i bevægelse med stifiltrerede hurtige gates samt ét rådgivende signal fra produktionsbuildet
ved kodeændringer:

| Job                                              | Omfang                                                                                                                                                                                                                      | Blokerende                                                                                      |
| ------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| `Build (advisory)`                               | Ikke-kladde-kode-PR'er og Mergify-købranches; Node 24, `npm-ci-retry`, `check:node-runtime`, `npm run build` med `OMNIROUTE_USE_TURBOPACK=1`; ingen upload af artefakter, fordi intet efterfølgende kvalitetsjob bruger dem | **Rådgivende** (`continue-on-error: true`; fjernes efter én uge med stabile release-PR-kørsler) |
| `Docs Gates (fast-path)`                         | Dokumentations-/kode-PR'er; API-dokumentationsreferencer og docs-all                                                                                                                                                        | Ja                                                                                              |
| `Fast Quality Gates`                             | Kode-PR'er; statiske kontroller, typekontrol, typekontrol af dashboard, berørte enhedstests                                                                                                                                 | Ja                                                                                              |
| `Forgotten sibling tests`                        | Kode-PR'er; ændrede moduler spores til statiske forbrugere og mulige relaterede tests; barrel- og dynamiske importstier rapporteres som rådgivende diagnostik med refererede undtagelser på tilladelseslisten               | **Rådgivende**                                                                                  |
| `Vitest (fast-path)`                             | Kode-PR'er; hurtig Vitest-testsuite                                                                                                                                                                                         | Ja                                                                                              |
| `Unit Tests fast-path`                           | Kode-PR'er; enhedstestsuite med 4 shards                                                                                                                                                                                    | Ja                                                                                              |
| `No new ESLint warnings`                         | Kode-PR'er; suppressionsbevidst lint-beskyttelse                                                                                                                                                                            | Ja for PR'er fra eget repository, rådgivende for forks                                          |
| `Merge integrity (changelog + generated skills)` | Ikke-kladde-PR'er; synkronisering af ændringslog og genererede færdigheder                                                                                                                                                  | Ja for PR'er fra eget repository, rådgivende for forks                                          |

#### Rapport om glemte relaterede tests

`npm run check:forgotten-sibling-tests` genbruger import-resolveren bag kortet over testpåvirkning.
For hvert ændret produktionsmodul rapporterer den deterministiske
`ændret modul/symbol -> statisk forbruger -> mulig relateret test`-kæder, når den mulige
test ikke findes i pull request-diffen. Markdown-oversigten og JSON-resultatet bevares som
workflow-artefaktet `forgotten-sibling-tests` til kalibrering før en eventuel blokerende udrulning.

Barrel-re-exports og dynamiske imports er kun løsningsdiagnostik; de skaber aldrig et
blokerende resultat. Gennemgåede undtagelser findes i
`config/quality/forgotten-sibling-allowlist.json`. Hver post skal angive forbrugeren og den mulige
test, give en specifik begrundelse og linke til en GitHub-issue eller pull request. Fejlformaterede poster
medfører altid fejl. Undtagelser kan ikke undertrykke en slettet mulig test eller en diff, der tilføjer `.skip`/`.todo`;
svækkelse af assertions og anden maskering håndteres fortsat af den uafhængigt blokerende
`check:test-masking`-gate.

### Job: `lint`

Kører på hver PR til `main`. Blokerer fletning ved fejl.

| Script (`npm run ...`)            | Validerer                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Blokerende                                 |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| `check:node-runtime`              | Node.js-versionen ligger inden for det understøttede interval                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Ja                                         |
| `check:cycles`                    | Cirkulære imports — alle moduler i `src/` + `open-sse/`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Ja                                         |
| `check:route-validation:t06`      | Zod-skemaer findes på alle routes (Tier 6-politik)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Ja                                         |
| `check:any-budget:t11`            | Antallet af `@ts-expect-error // any` overstiger ikke budgettet (Tier 11-catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Ja                                         |
| `check:provider-consistency`      | Hver provider i `providers.ts` har en tilsvarende post i `providerRegistry.ts` (og omvendt, inden for tilladelseslisten)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Ja                                         |
| `check:model-lifecycle`           | De tre manuelt vedligeholdte routingtabeller forbliver konsistente med det indcheckede livscyklusøjebliksbillede (#11503): `FITNESS_TABLE` (`taskFitness.ts`) scorer ikke noget udfaset id, som `REGISTRY` kan route; hvert mål for `BUILT_IN_ALIASES` findes i `REGISTRY` og er fraværende i øjebliksbilledet over udfasede id'er; hvert udfaset id, der stadig findes i `REGISTRY`, videresendes eller er angivet i `allowedRetiredInCatalog`; og ingen kilde eller destination i `DEFAULT_DEGRADATION_MAP` fremgår som udfaset i dette øjebliksbillede. Dette beviser ikke, at en model aktuelt leveres af en aktiv upstream-tjeneste. Offline — sammenligner med `config/quality/model-lifecycle.json`, som opdateres manuelt med `npm run quality:refresh-model-lifecycle` (netværk; ikke integreret i CI). `allowedRetiredInCatalog` er en gradvist reduceret skralde: Tilføj kun en post sammen med en sporings-issue. | Ja                                         |
| `check:fetch-targets`             | Hvert `fetch("/api/...")` i `src/` på klientsiden peger på en faktisk `route.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Ja                                         |
| `check:deps`                      | Alle afhængigheder, der kan installeres med `npm install`, på tværs af alle `package.json`-filer i repositoriet findes i `dependency-allowlist.json`; nye ikke-fastlåste pakker eller pakker med navne, der minder om eksisterende pakker, markeres                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Ja                                         |
| `audit:deps`                      | `npm audit` (rod + Electron) — ingen sikkerhedsmeddelelser med høj/kritisk alvorlighed (overlapper OSV `check:vuln-ratchet`; se rationaliseringsbackloggen)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Ja                                         |
| `check:lockfile`                  | Integriteten af `package-lock.json` — HTTPS-register, integritetshashes, ingen værtstilsidesættelser                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Ja                                         |
| `check:licenses`                  | SPDX-licensliste over tilladte licenser for produktionsafhængigheder                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Ja                                         |
| `check:tracked-artifacts`         | Ingen build-artefakter / committede `node_modules`-symlinks (kører også i husky pre-commit; pre-push er med vilje let — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Ja                                         |
| `check:ai-attribution`            | Ingen AI-/bot-`Co-Authored-By`-trailer eller AI-genereret sidefod i PR-commits, titel eller brødtekst — fast regel #16 (i `quality.yml`-løkken med hurtige kontroller for PR→`release/**` — læser event-payloaden, foretager sig intet uden for PR'er — og et trin kun for PR'er i `ci.yml`-lint for PR→`main`; også husky-`commit-msg`-hooken; menneskelige medforfattere er tilladt; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `check:vitest-exclusions`         | Hver Vitest-undtagelse angiver et sporingsissue og findes i `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Ja                                         |
| `check:file-size`                 | Ingen kildefil overskrider grænsen for den pågældende filendelse (skraldeprincip: fastlåste store filer på `frozen`-listen)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Ja                                         |
| `check:error-helper`              | Fejlsvar i executors/handlers bruger `buildErrorBody()` / `sanitizeErrorMessage()` (fast regel #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Ja                                         |
| `check:migration-numbering`       | Migrations-SQL-filer er nummereret fortløbende uden huller eller dubletter                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Ja                                         |
| `check:public-creds`              | Ingen bogstavelige OAuth-`client_id`/`client_secret`-værdier eller Firebase Web-nøgler uden for `publicCreds.ts` (ufravigelig regel #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Ja                                         |
| `check:db-rules`                  | Ingen rå SQL uden for modulerne i `src/lib/db/`; ingen barrel-importer fra `localDb.ts` (ufravigelige regler #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Ja                                         |
| `check:known-symbols`             | Provider-eksekveringsfunktioner, routingstrategier og oversættere, der er registreret i deres dispatch-tabeller, matcher filerne på disken — ingen forældreløse eller ikke-deklarerede symboler                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Ja                                         |
| `check:route-guard-membership`    | Alle routes, der starter en underproces, er klassificeret af `isLocalOnlyPath()` (ufravigelige regler #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Ja                                         |
| `check:test-discovery`            | Alle `*.test.ts`- / `*.spec.ts`-filer i repoet indsamles af mindst én testkørsel (skraldehjulsmekanisme: listen over forældreløse filer i `test-discovery-baseline.json` kan kun blive kortere)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Ja                                         |
| `check:agent-skills-sync`         | Genererede agent-skills-artefakter matcher deres kildekatalog (ingen afvigelser)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `check:provider-asset-provenance` | Udbyderlogoer/-aktiver har en registreret herkomstpost                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `lint:json`                       | JSON-konfigurationsfiler kan parses og overholder repoets lint-regler                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `typecheck:core`                  | TypeScript-kompilering uden fejl (kun vejledende advarsler)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Ja                                         |
| `typecheck:noimplicit:core`       | Streng `noImplicitAny` — fremadrettet; mange eksisterende kaldesteder mangler stadig annoteringer                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | **Vejledende** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` afgrænset til `src/app/(dashboard)/**` (#7033) — `typecheck:core`s kuraterede tilladelsesliste med 27 filer omfatter ingen dashboard-TSX-filer, og `next build` typekontrollerer dem heller aldrig (`next.config.mjs` angiver `ignoreBuildErrors: true`), så regressioner med forældreløse identifikatorer dér (#6625/#6909) var usynlige for CI. Forskelle sammenlignes med en fastfrosset baseline for antal pr. fil og pr. TS-kode (`config/quality/dashboard-typecheck-baseline.json`, samme mønster for håndhævelse af forældede poster som `check:known-symbols`) — kun NYE fejl ud over baseline-antallet får kontrollen til at fejle; sænk gradvist baseline med `--update`, når en eksisterende fejl rettes.                                                                                                                                                                                                   | Ja                                         |

### Job: `quality-gate`

Kører efter `test-coverage`. Blokerer fletning ved fejl.

| Script                       | Validerer                                                                                                                                                                       | Blokerende       |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| `quality:collect`            | Genererer `quality-metrics.json` (antal ESLint-advarsler, dækning fra den sammenflettede shard-rapport)                                                                         | Ja (før ratchet) |
| `quality:ratchet`            | Ingen metrik i `quality-baseline.json` er blevet forringet (ESLint-advarsler ≤ baseline; dækning ≥ baseline)                                                                    | Ja               |
| `check:duplication`          | Kodeduplikering (jscpd@4) overstiger ikke baseline i `quality-baseline.json`                                                                                                    | Ja               |
| `check:complexity`           | Cyklomatisk kompleksitet på filniveau overstiger ikke grænsen (ESLint-kernefunktionerne `complexity` + `max-lines-per-function`)                                                | Ja               |
| `check:cognitive-complexity` | Ratchet for kognitiv kompleksitet (`eslint-plugin-sonarjs`) — separat ESLint-kørsel; CI kører begge sammenlagt som det enkelte trin `check:complexity-ratchets`                 | Ja               |
| `check:dead-code`            | Ratchet for ubrugte eksporter/filer (knip) forringes ikke i forhold til baseline                                                                                                | Ja               |
| `check:compression-budget`   | Budget for komprimeringsbenchmark — minimumsgrænserne for tokenbesparelser pr. motor må ikke forringes                                                                          | Ja               |
| `check:type-coverage`        | Ratchet for procentdelen med typer (`type-coverage`) forringes ikke; erstatter i vid udstrækning `typecheck:noimplicit:core`                                                    | Ja               |
| `check:codeql-ratchet`       | Antallet af åbne CodeQL-advarsler forringes ikke (læses via `gh api`; springes elegant over uden token) — opdateringsfrekvens og manuel udløsning: se "CodeQL-ratchet" nedenfor | Ja               |

### Job: `quality-extended`

Hele jobbet er vejledende (`continue-on-error: true`). De npm-baserede ratchets køres
reelt; de eksterne scannere installeres via `gh release download` og springer selv over (exit 0),
når en binær fil stadig mangler.

| Script                   | Validerer                                                                                                                                                                                                                  | Blokerende     |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `check:circular-deps`    | Ingen cirkulære afhængigheder (dpdm)                                                                                                                                                                                       | **Vejledende** |
| `check:bundle-size`      | Bundtstørrelsen overstiger ikke grænsen                                                                                                                                                                                    | **Vejledende** |
| `check:secrets`          | Scanning efter hemmeligheder (gitleaks) — springes over, hvis den binære fil mangler                                                                                                                                       | **Vejledende** |
| `check:vuln-ratchet`     | Sårbarheder i afhængigheder (osv-scanner) forringes ikke — springes over, hvis den binære fil mangler                                                                                                                      | **Vejledende** |
| `check:workflows`        | Linting af workflows (actionlint + zizmor) — springes over, hvis de binære filer mangler                                                                                                                                   | **Vejledende** |
| `check:openapi-breaking` | Inkompatible ændringer i den offentlige API-kontrakt (`openapi.yaml`) i forhold til basisgrenen (oasdiff) — genererer `openapiBreaking=N`; springes over, hvis oasdiff mangler, eller basisspecifikationen ikke kan findes | **Vejledende** |

### Job: `docs-sync-strict`

Kører ved hver PR til `main`. Blokerer sammenfletning ved fejl.

| Script                         | Validerer                                                                                                                                                | Blokerende               |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| `check:docs-all`               | Meta-gate, der kører de 6 underliggende gates nedenfor sekventielt                                                                                       | Ja                       |
| ↳ `check:docs-sync`            | Versionskonsistens mellem CHANGELOG / OpenAPI / llm.txt                                                                                                  | Ja                       |
| ↳ `check:docs-counts`          | Tal i brødteksten (antal udbydere, antal migreringer osv.) ligger inden for ratchet-vinduet for de faktiske tal                                          | Ja                       |
| ↳ `check:env-doc-sync`         | Hver miljøvariabel i `.env.example` er dokumenteret i en dokumentationstabel og omvendt                                                                  | Ja                       |
| ↳ `check:deprecated-versions`  | Ingen udfasede versionsstrenge i dokumentationen                                                                                                         | Ja                       |
| ↳ `check:doc-links`            | Interne markdown-links i dokumentationen peger på eksisterende filer (`[tekst]`/`(sti)`-format)                                                          | Ja                       |
| ↳ `check:fabricated-docs`      | Ruter, miljøvariabler, CLI-kommandoer, hook-navne og filstier nævnt i dokumentationen findes i kodebasen. Hård gate via `--strict`; soft-fail uden flag. | Ja (via `--strict` i CI) |
| `check:cli-i18n`               | CLI-kommandostrenge findes i alle i18n-lokalitetsfiler                                                                                                   | Ja                       |
| `check:openapi-coverage`       | OpenAPI-specifikationen dækker mindst en ratchet-baseret minimumsgrænse af de faktiske ruter                                                             | Ja                       |
| `check:openapi-security-tiers` | Sikkerhedsniveauannoteringer i `openapi.yaml` stemmer overens med klassifikationerne i `routeGuard.ts`                                                   | **Vejledende**           |
| `check:openapi-routes`         | Hver sti i `openapi.yaml` kan knyttes til en eksisterende `route.ts` (anti-hallucination)                                                                | Ja                       |
| `check:docs-symbols`           | Hver `/api/...`-reference i `docs/**/*.md` kan knyttes til en eksisterende `route.ts` (anti-hallucination)                                               | Ja                       |
| `i18n translation drift`       | Ikke-oversatte nøgler i i18n-lokalitetsfiler — kun advarsel                                                                                              | **Vejledende**           |

### Job: `i18n-ui-coverage`

| Script                            | Validerer                                                                                                                                                                                                             | Blokerende     |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `check-ui-keys-coverage` (inline) | Dækningen af UI-i18n-nøgler er ≥ 65 %                                                                                                                                                                                 | Ja             |
| `check-ui-value-drift` (inline)   | En omskrevet engelsk **værdi** efterlader ingen forældet oversættelse                                                                                                                                                 | Ja             |
| `check-new-key-coverage` (inline) | En **ny** engelsk nøgle er oversat i hver lokalitet — en `__MISSING__:`-markør afvises                                                                                                                                | Ja             |
| `check-translation-ratio`         | Andelen af reelle oversættelser pr. lokalitet (blade uden for tilladelseslisten, som er identiske med engelsk, pladsholdere eller mangler) må ikke overstige `config/quality/i18n-translation-baseline.json` + margen | **Vejledende** |

Kræver `fetch-depth: 0` — value-drift-gaten sammenligner `en.json` med flettegrundlaget.

#### `check-ui-value-drift` — gate for forældede oversættelser

Opfanger den ene i18n-regression, som de andre gates strukturelt ikke kan se: En engelsk værdi
omskrives, mens oversættelserne baseret på den _tidligere_ engelske tekst bliver stående, så
ikke-engelske brugere fortsat læser en overbevisende formuleret, men nu forkert tekst.

Dette blev faktisk udgivet. `oauthModal.googleOAuthWarning` blev omskrevet, da Antigravity-
loginhjælperen blev tilføjet (#5203); **39 af 43 lokaliteter** beholdt tekst, der bad operatører om at "kopiere
hele URL'en og indsætte den nedenfor" — et flow, der ikke kan gennemføres for denne udbyder. Det
blev ikke opdaget før #8463, fordi:

- `sync-ui-keys` udfylder kun nøgler, der **mangler**, aldrig nøgler, der er **forældede**;
- `check-ui-keys-coverage` tæller nøglers _tilstedeværelse_, så en forældet oversættelse regnes som dækket;
- `check-translation-drift` sporer dokumentationsspejlingerne i `docs/i18n/<locale>/**.md` —
  den læser aldrig `src/i18n/messages/*.json`. Blokerende i jobbet `docs-sync-strict` siden
  2026-09-gensynkroniseringen: Rediger et kernedokument → `npm run i18n:run -- --files=<doc>` (på sektionsniveau, billigt).

**Diff-bevidst, ikke understøttet af en baseline.** Den sammenligner `en.json` ved merge-basen med
arbejdstræet. For hver nøgle, hvis engelske værdi er ændret, er enhver lokalitet, der stadig
indeholder en uberørt oversættelse, forældet. Dette **fastfryser bevidst eksisterende gæld** — en diff
kan ikke afsløre, hvilken gammel engelsk tekst en eksisterende oversættelse stammer fra, så kontrollen bedømmer
kun det, som den aktuelle ændring berører. Alternativet (en hash-baseline pr. nøgle) ville kræve
en genereret fil på ~600 KB, 3× større end den største eksisterende baseline, med ændringer ved hver i18n-PR.

Det kan opfyldes på to måder:

1. opdater de berørte oversættelser, eller
2. sæt dem til `__MISSING__:<ny engelsk tekst>` — under kørsel vises derefter den rettede engelske tekst
   (`src/i18n/request.ts::deepMergeFallback`, #7258), og nøglen sættes i kø til oversættelse.

Hvis strengens **betydning** er ændret, bør du foretrække at **omdøbe nøglen**: En ny nøgle kan ikke arve
en forældet oversættelse. Det er det mønster, som #8463 brugte.

```bash
npm run i18n:check-value-drift          # streng (det, som CI kører)
npm run i18n:check-value-drift:warn     # kun rapportering
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Afsluttes med 0 og `SKIP reason=base-unresolved`, når basiskataloget ikke kan læses (overfladisk
klon uden basereferencen), ligesom `check-openapi-breaking`.

### Job: `i18n`

Komplet matrix til i18n-validering (ét job pr. lokalitet). Hele jobbet er vejledende.

| Script                          | Validerer                                   | Blokerende                                                 |
| ------------------------------- | ------------------------------------------- | ---------------------------------------------------------- |
| `validate_translation.py quick` | Oversættelsens fuldstændighed pr. lokalitet | **Vejledende** (`continue-on-error: true` for hele jobbet) |

### Job: `pr-test-policy`

Kører kun på pull requests.

| Script                 | Validerer                                                                                                                                          | Blokerende |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| `check:pr-test-policy` | PR'er, der ændrer produktionskode i `src/`, `open-sse/`, `electron/` eller `bin/`, skal inkludere eller opdatere tests (hård regel #8)             | Ja         |
| `check:test-masking`   | Ændrede testfiler reducerer ikke nettoantallet af assertions og tilføjer ikke `assert.ok(true)`-tautologier                                        | Ja         |
| `check:pr-evidence`    | PR-brødteksten henviser til test-/VPS-dokumentation for ændringen (automatiserer hård regel #18 ved at søge i PR-teksten — skrøbeligt, se Backlog) | Ja         |

### Job: `test-vitest`

Kører efter `build`. Blokerer fletning ved fejl.

| Suite            | Validerer                                                    | Blokerende                                                                                                          |
| ---------------- | ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | MCP-server (110 værktøjer), autoCombo, cache — vitest-runner | Ja                                                                                                                  |
| `test:vitest:ui` | UI-komponenttests — vitest-runner                            | **Blokerende** — eksisterende fejl er udtrykkeligt udelukket i `vitest.config.ts`; nye fejl får jobbet til at fejle |

### Natlige workflows (planlagte, vejledende)

Disse kører efter en cron-tidsplan (og `workflow_dispatch`), aldrig på PR'er. De er alle vejledende.

| Workflow               | Validerer                                                                                                                                                               | Blokerende     |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `nightly-property`     | fast-check-egenskabstests med en tilfældig seedværdi + et højt antal kørsler                                                                                            | **Vejledende** |
| `nightly-resilience`   | kontrol af heap-vækst, chaos-fejlinjektion, k6-belastnings-/udholdenhedstest                                                                                            | **Vejledende** |
| `nightly-llm-security` | promptfoo-injektionsværn (blokeringstilstand) + garak-prober (springes over uden en udbyderhemmelighed)                                                                 | **Vejledende** |
| `nightly-schemathesis` | OpenAPI-kontraktfuzzing (schemathesis) mod en aktiv OmniRoute ved hjælp af `docs/openapi.yaml` — afdækker specifikationsovertrædelser/uhåndterede 500-fejl (fase 8 B.4) | **Vejledende** |
| `nightly-mutation`     | Stryker-mutationstestscore for det hurtige unit-testspor — overlevende mutanter afdækker svage assertions                                                               | **Vejledende** |
| `nightly-compat`       | kompatibilitetsmatrix for Node-motoren på tværs af de understøttede `engines.node`-intervaller                                                                          | **Vejledende** |

---

## Hastighedsfase (2026-08-30 → v4.0 LTS): alle referencegrænser lempet med 20 %

Beslutning fra ejeren (2026-08-30): Indtil modulariseringen i v4.0 betyder leveringshastighed mere
end at holde den tekniske gæld i skak. Alle **numeriske** ratchet-referencegrænser blev lempet med 20 % i én
reviderbar arbejdsgang, og fasen er angivet i `config/quality/quality-baseline.json`:

```json
"_policy": { "phase": "velocity", "since": "2026-08-30", "until": "4.0.0",
             "relaxPct": 20, "requireTighten": false }
```

| Hvad blev ændret                                                                                                                                                                                                                   | Hvor                                                                                                   |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `metrics.*.value` — antal, hvor lavere er bedre, ×1,2; procentdele, hvor højere er bedre, ÷1,2 (dækningsgrænsen på 60 blev bevaret, `eslintErrors` forbliver 0, `eslintWarnings` 0 → 20 % af det fastfrosne antal undertrykkelser) | `quality-baseline.json` (`_relax_velocity_2026_08_30`-noten angiver alle før → efter-værdier)          |
| `count` ×1,2 / `percentage` ×1,2                                                                                                                                                                                                   | `complexity-baseline.json`, `duplication-baseline.json`                                                |
| `cap`, `testCap`, alle linjegrænser i `frozen[*]` / `testFrozen[*]` ×1,2                                                                                                                                                           | `file-size-baseline.json`                                                                              |
| antal pr. fil / pr. TS-kode ×1,2                                                                                                                                                                                                   | `api-typecheck-baseline.json`, `dashboard-typecheck-baseline.json`, `open-sse-typecheck-baseline.json` |
| `THRESHOLD` 36 → 30                                                                                                                                                                                                                | `scripts/check/check-openapi-coverage.mjs`                                                             |
| `--require-tighten` bliver vejledende, mens `_policy.requireTighten === false`                                                                                                                                                     | `scripts/quality/check-quality-ratchet.mjs`                                                            |
| den natlige `bank-ratchet-shrinks` sættes på pause (den ville registrere den målte reduktion og fjerne råderummet igen)                                                                                                            | `.github/workflows/nightly-release-green.yml`                                                          |

Tilladelseslister (`eslint-suppressions.json`, `test-masking-allowlist.json`, `test-discovery-baseline.json`,
…) er **ikke** budgetter og blev ikke ændret. Politikporte for bestået/fejlet (hemmeligheder, SQL-regler,
docs/env-kontrakt, i18n-paritet og enhedstest) er uændrede — en rød test er stadig en rød test.

**Værktøjer**

- `npm run quality:relax-baselines -- --pct 20 --note velocity_YYYY_MM_DD [--dry-run]` — den
  enkeltstående lempelse (`scripts/quality/relax-baselines.mjs`); nægter at køre to gange med den
  samme note.
- `npm run quality:headroom [-- --only deadExports,fileSize] [--json out.json --md out.md]` —
  måler alle numeriske porte på samme måde som CI og viser det resterende råderum pr. port
  (`scripts/quality/baseline-headroom.mjs`). Det natlige `baseline-headroom`-job sender
  tabellen til den løbende sag **📈 Referencegrænsernes råderum (hastighedsfase)** og tilføjer
  mærkatet `headroom-alert`, når en port er inden for 10 % af sin grænse eller allerede har overskredet den. Denne sag
  fungerer som tidlig advarsel: Et budget, der opbruges på få dage, betyder, at lempelsen forbruges af
  nogle få PR'er og ikke af hele teamet — se den relevante ports `_rebaseline_*`-noter.

**Tilstand for ny kode (Clean-as-You-Code) — siden 2026-08-30, kun hurtig sti for PR'er**

Ved `pull_request`-hændelser sender `quality.yml` `--base-ref <PR base SHA>` til `check:file-size`,
`check:complexity-ratchets` og `check:dead-code`. I denne tilstand sammenligner porten HEAD med
merge-basen **begrænset til de filer, som PR'en ændrede** (`scripts/check/newCodeMode.mjs`:
merge-basen materialiseres i et midlertidigt `git worktree`, ESLint/knip køres dér og på HEAD, og
antallene pr. fil sammenlignes):

- **blokerende** — PR'en tilføjede cyklomatiske/kognitive overtrædelser eller døde eksporter i filer, den ændrede
  (`complexityNewCode=`, `cognitiveComplexityNewCode=`, `deadExportsNewCode=` i loggen);
- **vejledende** — den globale total sammenlignet med den fastfrosne referencegrænse. Nedarvet afvigelse får aldrig
  en uskyldig PR til at fejle; afvigelsen fastfryses igen ved release-afstemningen og overvåges af råderumsjobbet.

`workflow_dispatch`-kørsler, release-green-gennemgangen og det natlige råderumsjob har ingen PR-base
og beholder den absolutte (globale) sammenligning. Dækning, duplikering og typedækning forbliver globale
indtil videre (deres værktøjer kan ikke billigt generere en diff pr. fil) — de er kandidater til samme behandling.

**Afslutning af fasen ved v4.0 (LTS = strammere end før, ikke "tilbage til normalen")**

1. På den rene spids af `release/v4.0.0`: Kør `npm run quality:headroom --json` til dokumentation, derefter
   `npm run quality:ratchet -- --update`, `check:file-size --update`,
   `check:complexity-ratchets --update`, `check:dead-code --update` og hver typecheck-gates
   `--update` — alle baselines sænkes til den målte værdi.
2. Slet `_policy` fra `quality-baseline.json` (genaktiverer `--require-tighten` og den natlige
   opsparing), og gendan `THRESHOLD = 36` (eller højere) i `check-openapi-coverage.mjs`.
3. Stram kravene ud over det målte, hvor modulariseringen gav gevinst: Sæt filstørrelsens `cap` tilbage til 1000
   (eller 800), hæv dækningsminimummerne med 5, og sæt døde eksporter til 0 for de modulariserede pakker.

## Ratchet-baseline (`quality-baseline.json`)

Ratchet-motoren (`scripts/quality/check-quality-ratchet.mjs`) læser `quality-baseline.json`
og sammenligner den med den nyligt indsamlede `quality-metrics.json`. Enhver metrik, der forværres
ud over dens epsilon, får buildet til at fejle.

Aktuelt sporede metrikker:

| Metrik                | Retning | Betydning                                  |
| --------------------- | ------- | ------------------------------------------ |
| `eslintWarnings`      | `down`  | Antallet af ESLint-advarsler må ikke stige |
| `coverage.statements` | `up`    | Statement-dækningen må ikke falde          |
| `coverage.lines`      | `up`    | Linjedækningen må ikke falde               |
| `coverage.functions`  | `up`    | Funktionsdækningen må ikke falde           |
| `coverage.branches`   | `up`    | Forgreningsdækningen må ikke falde         |

Sådan opdateres baselinen efter en reel forbedring:

```bash
npm run quality:ratchet -- --update
git add quality-baseline.json
```

Flaget `--update` skriver de aktuelt målte værdier til `quality-baseline.json`.
Commit denne fil sammen med den ændring, der forbedrede metrikken. En PR, der forbedrer en
metrik uden at opdatere baselinen, vil blive fanget af `--require-tighten` (fase 6A.5,
afventer implementering).

### CodeQL-ratchet: opdateringsfrekvens og manuel udløsning

`check:codeql-ratchet` læser **repositoryets tilstand, som opdateres efter en tidsplan — ikke for hver PR.**
`gh api repos/diegosouzapw/OmniRoute/code-scanning/default-setup` rapporterer
`state: configured`, `schedule: weekly`: GitHubs scanning med standardopsætning, ikke en analyse
for hvert push. Konsekvens: Når en PR, der RETTER alarmer, er blevet merget, fortsætter ratcheten med at læse
det gamle, højere antal, indtil den næste planlagte scanning køres — derfor rapporterer den en regression
på hver åben PR, inklusive opfølgninger til den rettende PR, indtil scanningen er ajour.

**Manuel opdatering**: `gh workflow run codeql.yml --ref release/vX.Y.Z` kører
analysen igen og genudgiver alarmer inden for få minutter. Læs `.github/workflows/codeql.yml`
først — dens header forklarer, at den kun bruger `workflow_dispatch`, **fordi den er i konflikt med
GitHubs "default setup"** (`CodeQL analyses from advanced configurations cannot be
processed when the default setup is enabled`). Gendannelse af `push`/`pull_request`/
`schedule`-udløsere kræver først en **handling fra ejeren**: Settings → Code security →
CodeQL: Default → Advanced. Tilføj ikke en `schedule:`-udløser uden denne ændring — den
vil kun medføre fejlslagne kørsler.

**Stram baselinen, når antallet falder** — `node scripts/check/check-codeql-ratchet.mjs
--update` skriver det nye målte antal til `quality-baseline.json` →
`metrics.codeqlAlerts.value`, så ratcheten ikke stiltiende tillader en regression tilbage
til det gamle loft. Gennemarbejdet eksempel (2026-09-02/03): PR #12502 rettede 7 reelle alarmer
(13 → 6 målte åbne); PR #12530 strammede den fastlåste baseline fra 11 → 6, så den stemte overens; de
resterende 6 blev derefter afvist med en begrundelse for hver alarm, indtil der var 0 åbne.

**Afvisninger er operatørens beslutning (hård regel #14)** — afvis aldrig en CodeQL-alarm
uden at registrere den tekniske begrundelse i afvisningskommentaren: `won't fix` for
et krav fra en upstream-protokol, `used in tests` for en test-fixture, `false positive`
for en sanitizer, som CodeQL ikke kan se (præcedens: `docs/security/ERROR_SANITIZATION.md`).

---

## Politik for genkørsel af tests (WS5.4, v3.8.49)

Genkørsel konfigureres pr. runner, aldrig som en global standard — en generel genkørsel forvandler reelle regressioner
til usynlige sporadiske fejl:

| Runner           | Politik                                                                                                                          | Hvorfor                                                                                                                                      |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| Playwright (e2e) | `retries: 1` kun i CI, med `trace: on-first-retry`                                                                               | Browser-/netværkstiming er reelt ikke-deterministisk; én genkørsel med en trace forvandler en sporadisk fejl til en diagnosticerbar artefakt |
| Vitest           | INGEN global genkørsel. En dokumenteret ustabil test får en eksplicit genkørsel pr. test (synlig i diffen og gennemgået i PR'en) | Holder karantænelisten i repoet, aldrig uigennemsigtig                                                                                       |
| node:test (unit) | INGEN genkørsel, nogensinde                                                                                                      | En ustabil enhedstest er en fejl i testen — ret den, kør den ikke bare igen                                                                  |

Målsatte SLO'er, når telemetri for sporadiske fejl er på plads (WS5.2/5.3): <1 % frekvens af sporadiske fejl pr. test
(tærskel for "ret nu"), ≥95 % beståelsesprocent pr. pipeline. Branchens referenceværdier —
genkalibrer ud fra vores egne målinger.

## Afvigelse i ratchet på release-niveau (WS5.5, v3.8.49)

Når en ratchet (filstørrelse, kompleksitet, eslint-advarsler) regresserer på det RENE release-
tip — dvs. at KOMBINATIONEN af merges forårsagede regressionen, og ingen enkelt PR kan reproducere
regressionen på sin egen branch — tilhører rettelsen **release-ansvarlige, én gang, på
release-branchen**: Foretræk udtrækning/refaktorering; nulstil kun baseline med den dokumenterede
begrundelse. Skub aldrig en kombinationsafvigelse over på en bidragyders PR, og nulstil aldrig
baseline pr. PR (det skjuler reelle regressioner). Skeln først: Reproducer den røde status
mod det rene tip i et probe-worktree, før du antager, at din PR forårsagede den.

## Lagring af ratchet-reduktioner — den nedadgående retning (#8584)

Ratchet-mekanismen er kun halvt automatisk, og det er den forkerte halvdel. At **hæve** en grænse er en
manuel JSON-redigering, der tager ti sekunder og er den hurtigste måde at frigøre en rød PR på.
At **sænke** en grænse kræver, at nogen kører `--update` og committer resultatet — og indtil
jobbet `bank-ratchet-shrinks` blev tilføjet, var der intet workflow, der gjorde det. Den målte konsekvens
(2026-07-25): 18 fastlåste filer var allerede på eller under grænsen på 800 linjer for nye filer, den værste
på 132× (`src/shared/validation/schemas.ts`, 19 linjer med en grænse på 2.523); kompleksitetsloftet steg
`1794 → 2169` på tværs af ~37 noter om nulstilling af baseline med præcis én
reduktion (−1); og "stram via `--update` i næste cyklus" blev skrevet 31 gange og efterlevet
én gang. En grænse, der overlever den kode, som gav anledning til den, forvandler lydløst enhver fuldført
opdeling til en vækstmargen for den næste, der redigerer filen.

`nightly-release-green.yml` → jobbet **`bank-ratchet-shrinks`** lukker den løkke:

|             |                                                                                                                  |
| ----------- | ---------------------------------------------------------------------------------------------------------------- |
| Kører ved   | `schedule` (3×/dag) + `workflow_dispatch` — bevidst **ikke** `push`                                              |
| Måler       | den højeste `release/vX.Y.Z`, samme opløsning + injektionsværn som `release-green`                               |
| Skriver     | `check:file-size --update` og `check:complexity-ratchets --update` (begge kan konstruktionsmæssigt kun reducere) |
| Verificerer | `npm run check:ratchet-bank` (`scripts/quality/verify-ratchet-bank.mjs`)                                         |
| Leverer     | én altid opdateret PR mod release-branchen — tvangsopdateret, aldrig spammet                                     |

Lagringen foretages i batches frem for ved hvert push, fordi den ikke har noget krav til latenstid (en reduktion,
der lagres inden for 8 timer, er fint), mens en kørsel pr. merge gentagne gange ville genopbygge PR-branchen
under merge-kampagner og betale prisen for en fuld ESLint-gennemgang hver gang. Registrering sker fortsat ved
push (`release-green`); kun lagringen udføres i batches.

### Sikkerhedsverifikatoren

Jobbet skriver til baselines uden opsyn, så `verify-ratchet-bank.mjs` er det, der gør
det acceptabelt. Det sammenligner træet efter `--update` med `HEAD` og **afbryder jobbet,
før der findes et commit** — uden at åbne en PR — medmindre hver ændring er én af følgende:

- en numerisk `frozen`- / `testFrozen`-post, der er **sænket** eller **fjernet**
- `complexity-baseline.json` → `count` **sænket**
- `quality-baseline.json` → `metrics.cognitiveComplexity.value` **sænket**

Alt andet fejler: at hæve et tal, tilføje en post, ændre `cap`/`testCap` eller
slette/omskrive en `_rebaseline_*`-note (disse noter udgør revisionssporet for, hvorfor hvert
loft findes, og gemmes i det samme `frozen`-objekt som filposterne).
En bot, der kunne hæve en grænse, ville være markant værre end status quo. Værn mod regression:
`tests/unit/verify-ratchet-bank.test.ts`.

Jobbet pusher aldrig til `release/*` — et menneske merger PR'en, så en forkert måling
ikke kan lande uden gennemgang.

## Politik for tilladelseslister

Hver gate, der ikke kan fejle på allerede eksisterende overtrædelser, bruger en fastfrosset tilladelsesliste
(f.eks. `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`). Politikken er:

**Ret den grundlæggende årsag; brug kun tilladelseslisten, når overtrædelsen allerede eksisterer og
ikke kan rettes i samme PR.**

Når du føjer en post til en tilladelsesliste:

1. Medtag en kommentar med begrundelsen.
2. Henvis til den issue, der bruges til sporing (f.eks. `// #3498 — Fase 2-funktion, endnu ikke implementeret`).
3. Fjern posten i den samme PR, der retter overtrædelsen — en forældet post, som ikke længere
   undertrykker en aktiv overtrædelse, er i sig selv en fejl (6A.3-kontrollen for forældet håndhævelse vil,
   når den er implementeret, få gaten til at fejle på en forældreløs post i tilladelseslisten).

Tilføj **ikke** poster på tilladelseslisten for at få tests til at bestå hurtigere. En grøn gate med en voksende
tilladelsesliste giver en falsk følelse af kvalitet.

### Når en gate fejler på din PR

1. **Læs outputtet fra gaten omhyggeligt** — det fortæller dig præcis, hvilken fil eller hvilket symbol der overtrådte
   reglen.
2. **Ret overtrædelsen** — de fleste gates er deterministiske filsystemkontroller, der består, så snart
   koden er korrekt.
3. **Hvis overtrædelsen allerede eksisterer** (dvs. du introducerede den ikke, men gaten
   dækker den nu): Tilføj en post på tilladelseslisten med en begrundende kommentar og en issue til sporing.
4. **Hvis gaten er en skraldemekanisme** (dækning, ESLint-advarsler, duplikering, kompleksitet):
   Din ændring har forværret målingen. Ret det underliggende problem, eller kør (i sjældne tilfælde)
   `npm run quality:ratchet -- --update`, hvis ændringen er tilsigtet, og forringelsen af målingen
   er acceptabel — men dokumentér hvorfor i PR-beskrivelsen.
5. **Rådgivende gates** (`continue-on-error: true`) er informative — de blokerer ikke
   sammenfletning, men vises i CI-oversigten. Ret dem alligevel.

---

## Tilføjelse af en ny gate

1. Opret `scripts/check/check-<name>.mjs` (eller `.ts`). Politik-gates afsluttes med 0/1.
   Gates af skraldemekanismetypen skriver en måling til `quality-metrics.json` via `collect-metrics.mjs`.
2. Føj `"check:<name>": "node scripts/check/check-<name>.mjs"` til `package.json`.
3. Integrér den i `.github/workflows/ci.yml` under det relevante job
   (politik → `lint` eller `docs-sync-strict`; skraldemekanisme → `quality-gate`).
4. Hvis den har en tilladelsesliste, skal du anvende `reportStaleEntries()` fra
   `scripts/check/lib/allowlist.mjs`, så forældede poster registreres automatisk.
5. Skriv en test i `tests/unit/build/`, der dækker gatens detektionslogik.
6. Opdater dette dokument (tilføj en række i den relevante jobtabel).

---

## Agentværktøjer: LSP-in-the-loop (tilvalg)

Ud over CI-gatene leveres OmniRoute med et **valgfrit** `agent-lsp`-grundskelet
(en `.mcp.json` på projektniveau, Fase 7 Opgave 15). Opret `.mcp.json`
for at gøre en TypeScript-sprogserver tilgængelig for kodeagenter, så de kan finde symboler /
diagnostik **før** de skriver kode — et kompilér-før-påstand-supplement til
`typecheck:core`, der stopper fejl med "opfundne symboler" ved kilden. Det indlæses med vilje
ikke automatisk (du vælger og verificerer MCP↔LSP-broen); en defekt post logger kun en
forbindelsesfejl og afbryder aldrig sessioner.

---

## Rationaliserings-backlog (ROI-gennemgang — Fase 9 Bølge 3)

Denne oversigt blev afstemt mod `ci.yml` den 2026-06-17 (den tidligere version udelod
`audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`,
`check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`,
`check:codeql-ratchet`, `check:pr-evidence`). En ROI-gennemgang af det afstemte sæt
identificerede følgende kandidater til rationalisering. **Sammenlægningerne er mekaniske
CI-ændringer; ændringerne/fjernelserne er politiske beslutninger, som er forbeholdt operatøren.** Intet nedenfor
er anvendt endnu.

**Også udokumenteret ovenfor** (vejledende, lavt signal): jobbet `docs-lint`
(markdownlint + Vale, hele jobbet med `continue-on-error`) og de separate scanner-workflows
`semgrep.yml` / `codeql.yml` / `scorecard.yml`. `semgrepFindings: 0` findes i
`quality-baseline.json`, men er ikke koblet til en blokerende skralde i `ci.yml` — metrikken er
i øjeblikket forældreløs.

### Sammenlægning / deduplikering (mekanisk, lavere risiko)

Hver kandidat blev valideret mod den aktuelle gate-tilstand den 2026-06-17 (stol på, men verificér);
flere "åbenlyse" sammenlægninger viste sig at skjule gæld og er **ikke** direkte anvendelige erstatninger.

- **`check:docs-sync` køres to gange** — separat i jobbet `lint` og igen i `check:docs-all` (`docs-sync-strict`) samt i husky pre-commit-hooken. ✅ **FÆRDIG** — separat `lint`-kørsel fjernet.
- **CVE-scanning** — ❌ **IKKE en ukompliceret sammenlægning.** `audit:deps` fejler hårdt ved enhver CVE med høj/kritisk alvorlighed; `check:vuln-ratchet` (osv) fejler kun ved en _regression_ i forhold til baseline (i øjeblikket 1 MODERATE). Forskellig semantik — fjernelse af `audit:deps` ville fjerne den absolutte gate for høj/kritisk alvorlighed. Behold begge.
- **Cyklusregistrering** — ❌ **IKKE en ukompliceret sammenlægning.** `check:circular-deps` (dpdm) rapporterer **91 cyklusser** (det er derfor, den er vejledende); den kan ikke gøres blokerende uden først at løse dem, og den har et bredere omfang end den grønne, kuraterede `check:cycles`. Behold `check:cycles` som blokerende; løsning af de 91 dpdm-cyklusser er sin egen backlog.
- **Kompleksitet** — ✅ **FÆRDIG** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): én ESLint-gennemgang, optællinger efter ruleId, så baselines for cyklomatisk kompleksitet+maksimalt antal linjer og kognitiv kompleksitet forbliver uafhængige; individuelle `check:complexity` / `check:cognitive-complexity` bibeholdes til lokal `--update`.
- **`/api`-antihallucination** — ✅ **FÆRDIG** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): én FS-oversigt over `src/app/api`; openapi-routes + docs-symbols rapporterer stadig uafhængigt; individuelle tjek bibeholdes til lokale kørsler.
- **`check:node-runtime` køres i 11 jobs** — ⚠️ **lav ROI.** Hvert job bruger en separat runner, og tjekket tager <1s; samlet besparelse ~10s mod tabet af en billig beskyttelse pr. job. Ikke besværet værd.
- **`typecheck:noimplicit:core` i CI-lint** — ✅ **fjernet fra lint-jobbet** (var vejledende med `continue-on-error`); den blokerende typeoverflade er `typecheck:core` + `check:type-coverage`. Det lokale script er bibeholdt.

### Skift / beslut (operatørpolitik)

- `check:openapi-security-tiers` (vejledende) — ❌ **KAN IKKE ukompliceret gøres blokerende.** Den afslutter med 0, men advarer om, at flere `traffic-inspector`-ruter under `LOCAL_ONLY_API_PREFIXES` mangler annoteringen `x-loopback-only: true`. Håndhævelse kræver, at disse annoteringer først føjes til `openapi.yaml`.
- `typecheck:noimplicit:core` (vejledende) — er i vid udstrækning overflødiggjort af den blokerende `check:type-coverage`-skralde. Gør den til en skralde, eller fjern den redundante anden `tsc`-gennemgang.
- `test:vitest:ui` (nu **blokerende**) — allerede eksisterende fejl er eksplicit udelukket i `vitest.config.ts` med `// #8618`-sporingskommentarer; nye fejl får jobbet til at fejle.
- `check:secrets` (gitleaks, blokerende skralde fastfrosset ved 3 dokumenterede falske positiver) — føj de 3 til tilladelseslisten for at nå 0, eller nedgradér til vejledende. Overlapper GitHubs indbyggede hemmelighedsscanning + `check:public-creds`.
- `check:pr-evidence` (blokerende, søger i PR-brødtekstens prosa med grep) — høj risiko for falske positiver; hvis den fjernes, svækkes håndhævelsen af Hård regel #18, så dette er en reel politisk beslutning.
- `semgrep` (separat vejledende workflow) — overlapper CodeQL for OWASP-familierne; kobl dens baseline til en skralde, eller fjern den.

---

## Relateret dokumentation

- Forsyningskæde (proveniens, SBOM, Trivy, Scorecard): [`docs/security/SUPPLY_CHAIN.md`](../security/SUPPLY_CHAIN.md)

#### `check-key-completeness` — kontrol af nøglesætparitet

`scripts/i18n/check-key-completeness.mjs` (`npm run i18n:check-keys`, job `i18n-ui-coverage`).
Sammenligner sættet af bladnøgler i hver `src/i18n/messages/<locale>.json` med `en.json` og fejler
ved enhver manglende eller ekstra bladnøgle, uanset hvornår nøglen blev tilføjet. `__MISSING__:`
-pladsholdere tæller som tilstedeværende (deres indhold håndteres af forholdstalskontrollen). Den er
det absolutte supplement til de to diff-baserede/procentbaserede kontroller: `check-ui-keys-coverage`
håndhæver en minimumsgrænse på 80 % pr. landestandard (43 manglende nøgler ud af ~13.000 vises stadig
som 99,7 %), og `check-new-key-coverage` vurderer kun de nøgler, som en PR føjer til `en.json`. Et
sprogparti genereres ud fra den `en.json`, der findes den dag, hvor dets gren oprettes, og oversættes
over flere dage, mens basisgrenen fortsat får tilføjet nøgler; parti-PR'en tilføjer ikke selv nogen
nøgler, så begge søsterkontroller forblev tavse, da parti 1 (#13044) blev flettet med 43 manglende
nøgler i ni landestandarder og parti 2 (#13660) med 10 manglende nøgler i otte (2026-09-15). Ret en
fejl med `node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers`; en `extra`
-bladnøgle betyder, at kilden har fjernet den — slet den fra landestandarden. `--warn` rapporterer
uden at fejle. `--catalog=cli` kører den samme sammenligning over `bin/cli/locales`
(`npm run i18n:check-keys:cli`); begge trin findes i jobbet `i18n-ui-coverage`.

#### `check-new-key-coverage` — i18n-kontrol for nye nøgler

Søsterkontrol til `check-ui-value-drift`. Sidstnævnte opdager en engelsk værdi, der er blevet
**omskrevet**, mens dens oversættelser ikke er blevet opdateret; denne opdager en engelsk nøgle,
der er blevet **tilføjet**, uden at nogle landestandarder har modtaget den.

`check-ui-keys-coverage` kan ikke opdage denne klasse: den håndhæver en procentvis minimumsgrænse
pr. landestandard, og elleve manglende nøgler ud af ~13.000 giver stadig en dækning på 99,9 %. En
procentdel pr. sprog kan ikke udtrykke "denne funktion blev udgivet uoversat" — en hel funktion kan
blive tilføjet i en ny landestandard uden nogen tekst og uden nogensinde at ændre tallet.

Hændelsen, den repræsenterer: Fase 3 af Orchestration Canvas fik sine elleve nøgler oversat på tværs
af de 42 landestandarder, der fandtes på det tidspunkt. Få timer senere øgede EU-sprogpartiet
(#13044) antallet af landestandarder i repositoriet til 51, og de ni nytilkomne (`el`, `et`, `ga`,
`hr`, `lt`, `lv`, `mt`, `sl`, `sr`) modtog dem aldrig. `deepMergeFallback` erstatter en manglende
nøgle med engelsk, så fejltilstanden var en uoversat brugergrænseflade frem for en tom
brugergrænseflade — reel og pr. konstruktion tavs.

Ligesom sin søsterkontrol er den **diff-bevidst** og sammenligner engelsk ved flettebasen med
arbejdstræet, så allerede eksisterende mangler forbliver fastlåste, og kontrollen krævede ingen
migrering for at blive aktiveret.

**En `__MISSING__:<english>`-markør opfylder ikke kontrollen (siden 2026-09-17).** Den plejede at
være den dokumenterede udsættelse — ved kørsel faldes der tilbage til korrekt engelsk — indtil otte
funktions-PR'er den 2026-09-16 tilføjede 61 nøgler og indsatte markøren i alle 65 landestandarder i
stedet for at oversætte: Denne kontrol accepterede dem alle, intet blokerede PR'erne, og den
blokerende kontrol af forholdet mellem reelle oversættelser fejlede derefter på release-spidsen for
alle (pt-BR 3,2 % > 2,5 % + 0,5). En markør vurderes nu som en manglende oversættelse. Ret en fejl
med `node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers --batch-size=40`,
eller alle landestandarder parallelt med `npm run i18n:translate-new-keys`
(`scripts/i18n/translate-new-keys.sh`, sikker ved frakobling, nægter at starte uden
`OMNIROUTE_TRANSLATION_*`-miljøvariablerne). En nøgle, der skal forblive på engelsk (et fastlåst
produkt-/motor-/flag-navn), hører hjemme i `scripts/i18n/untranslatable-keys.json`, aldrig bag en
markør. `vi` forbyder markører fuldstændigt (`tests/unit/i18n-vi-completeness.test.ts`).

#### `check-vitest-exclusions` — kontrol af parkerede tests

En fil på `exclude`-listen i `vitest.config.ts` er en test, der ikke køres, og den ligner dækning
for enhver, der læser træet. Toogtres filer hobede sig op bag kommentaren
`// #8618 — pre-existing failure; remove this exclusion when fixed`. Sag #8618 blev lukket den
2026-08-11, mens listen, som den fulgte, voksede fra 45 poster til 62, og hver ny post arvede en
kommentar, der pegede på en lukket sag. Da listen endelig blev målt fil for fil (#13204),
**bestod 51 af de 62 mod det aktuelle træ uden nogen kildekodeændring**.

Kontrollen kræver, at hver ekskludering, der svarer til en virkelig fil, (a) angiver en
sporingssag og (b) findes i `config/quality/vitest-exclusions.json` med sin målte status, så
tilføjelsen af en ekskludering bliver en diff, der kan gennemgås i en dedikeret fil, frem for
endnu en linje i et array med 60 poster. Den genkører bevidst ikke de ekskluderede tests — det
tager ~10 minutter og hører hjemme i et periodisk job; fortegnelsen registrerer, hvornår hver
enkelt senest blev målt.
