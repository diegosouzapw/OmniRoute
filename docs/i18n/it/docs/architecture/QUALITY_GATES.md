# Quality Gates Reference (Italiano)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/QUALITY_GATES.md) · 🇪🇹 [am](../../../am/docs/architecture/QUALITY_GATES.md) · 🇸🇦 [ar](../../../ar/docs/architecture/QUALITY_GATES.md) · 🇦🇿 [az](../../../az/docs/architecture/QUALITY_GATES.md) · 🇧🇬 [bg](../../../bg/docs/architecture/QUALITY_GATES.md) · 🇧🇩 [bn](../../../bn/docs/architecture/QUALITY_GATES.md) · 🇧🇦 [bs](../../../bs/docs/architecture/QUALITY_GATES.md) · 🇨🇿 [cs](../../../cs/docs/architecture/QUALITY_GATES.md) · 🇩🇰 [da](../../../da/docs/architecture/QUALITY_GATES.md) · 🇩🇪 [de](../../../de/docs/architecture/QUALITY_GATES.md) · 🇬🇷 [el](../../../el/docs/architecture/QUALITY_GATES.md) · 🇪🇸 [es](../../../es/docs/architecture/QUALITY_GATES.md) · 🇪🇪 [et](../../../et/docs/architecture/QUALITY_GATES.md) · 🇮🇷 [fa](../../../fa/docs/architecture/QUALITY_GATES.md) · 🇫🇮 [fi](../../../fi/docs/architecture/QUALITY_GATES.md) · 🇫🇷 [fr](../../../fr/docs/architecture/QUALITY_GATES.md) · 🇮🇪 [ga](../../../ga/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [gu](../../../gu/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ha](../../../ha/docs/architecture/QUALITY_GATES.md) · 🇮🇱 [he](../../../he/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [hi](../../../hi/docs/architecture/QUALITY_GATES.md) · 🇭🇷 [hr](../../../hr/docs/architecture/QUALITY_GATES.md) · 🇭🇺 [hu](../../../hu/docs/architecture/QUALITY_GATES.md) · 🇦🇲 [hy](../../../hy/docs/architecture/QUALITY_GATES.md) · 🇮🇩 [id](../../../id/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ig](../../../ig/docs/architecture/QUALITY_GATES.md) · 🇯🇵 [ja](../../../ja/docs/architecture/QUALITY_GATES.md) · 🇬🇪 [ka](../../../ka/docs/architecture/QUALITY_GATES.md) · 🇰🇭 [km](../../../km/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [kn](../../../kn/docs/architecture/QUALITY_GATES.md) · 🇰🇷 [ko](../../../ko/docs/architecture/QUALITY_GATES.md) · 🇱🇹 [lt](../../../lt/docs/architecture/QUALITY_GATES.md) · 🇱🇻 [lv](../../../lv/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ml](../../../ml/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [mr](../../../mr/docs/architecture/QUALITY_GATES.md) · 🇲🇾 [ms](../../../ms/docs/architecture/QUALITY_GATES.md) · 🇲🇹 [mt](../../../mt/docs/architecture/QUALITY_GATES.md) · 🇲🇲 [my](../../../my/docs/architecture/QUALITY_GATES.md) · 🇳🇵 [ne](../../../ne/docs/architecture/QUALITY_GATES.md) · 🇳🇱 [nl](../../../nl/docs/architecture/QUALITY_GATES.md) · 🇳🇴 [no](../../../no/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [or](../../../or/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [pa](../../../pa/docs/architecture/QUALITY_GATES.md) · 🇵🇭 [phi](../../../phi/docs/architecture/QUALITY_GATES.md) · 🇵🇱 [pl](../../../pl/docs/architecture/QUALITY_GATES.md) · 🇵🇹 [pt](../../../pt/docs/architecture/QUALITY_GATES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/QUALITY_GATES.md) · 🇷🇴 [ro](../../../ro/docs/architecture/QUALITY_GATES.md) · 🇷🇺 [ru](../../../ru/docs/architecture/QUALITY_GATES.md) · 🇱🇰 [si](../../../si/docs/architecture/QUALITY_GATES.md) · 🇸🇰 [sk](../../../sk/docs/architecture/QUALITY_GATES.md) · 🇸🇮 [sl](../../../sl/docs/architecture/QUALITY_GATES.md) · 🇷🇸 [sr](../../../sr/docs/architecture/QUALITY_GATES.md) · 🇸🇪 [sv](../../../sv/docs/architecture/QUALITY_GATES.md) · 🇰🇪 [sw](../../../sw/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ta](../../../ta/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [te](../../../te/docs/architecture/QUALITY_GATES.md) · 🇹🇭 [th](../../../th/docs/architecture/QUALITY_GATES.md) · 🇹🇷 [tr](../../../tr/docs/architecture/QUALITY_GATES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/QUALITY_GATES.md) · 🇵🇰 [ur](../../../ur/docs/architecture/QUALITY_GATES.md) · 🇺🇿 [uz](../../../uz/docs/architecture/QUALITY_GATES.md) · 🇻🇳 [vi](../../../vi/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [yo](../../../yo/docs/architecture/QUALITY_GATES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/QUALITY_GATES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/QUALITY_GATES.md)

---

Questo documento è il riferimento autorevole per tutti i controlli di qualità CI in OmniRoute.
Descrive ciascun controllo, ciò che convalida, il job CI in cui viene eseguito, se utilizza
una baseline ratchet o una politica superato/non superato e se blocca la build o è solo consultivo.

Per un breve riepilogo e per la politica dell'allowlist, consulta la sezione "Quality Gates & Ratchets"
in `AGENTS.md`. Per la valutazione critica, la classificazione della maturità e il piano di
replicazione indipendente dagli strumenti dello stesso sistema, consulta il
[Manuale operativo dei controlli di qualità](../ops/QUALITY_GATE_PLAYBOOK.md).

---

## Inventario dei controlli (~90 script)

Gli script si trovano in `scripts/check/` (controlli delle policy) e `scripts/quality/` (motore ratchet).
La fonte attendibile per la CI è `.github/workflows/ci.yml`.

### Percorso rapido per le PR di release (`quality.yml`)

`.github/workflows/quality.yml` viene eseguito sulle PR destinate a `release/**`. Mantiene fluido
il lavoro sui branch dei collaboratori tramite controlli rapidi filtrati per percorso, oltre a un
segnale consultivo della build di produzione per le modifiche al codice:

| Job                                              | Ambito                                                                                                                                                                                                                                  | Bloccante                                                                                                          |
| ------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `Build (advisory)`                               | PR di codice non in bozza e branch della coda Mergify; Node 24, `npm-ci-retry`, `check:node-runtime`, `npm run build` con `OMNIROUTE_USE_TURBOPACK=1`; nessun caricamento di artefatti perché nessun job di qualità a valle li utilizza | **Consultivo** (`continue-on-error: true`; rimuovere dopo una settimana di esecuzioni stabili sulle PR di release) |
| `Docs Gates (fast-path)`                         | PR di documentazione/codice; riferimenti alla documentazione API e docs-all                                                                                                                                                             | Sì                                                                                                                 |
| `Fast Quality Gates`                             | PR di codice; controlli statici, controllo dei tipi, controllo dei tipi della dashboard, unit test interessati                                                                                                                          | Sì                                                                                                                 |
| `Forgotten sibling tests`                        | PR di codice; moduli modificati tracciati fino ai consumer statici e ai test fratelli candidati; i percorsi tramite barrel e import dinamici vengono segnalati come diagnostica consultiva, con le eccezioni dell'allowlist indicate    | **Consultivo**                                                                                                     |
| `Vitest (fast-path)`                             | PR di codice; suite rapida di vitest                                                                                                                                                                                                    | Sì                                                                                                                 |
| `Unit Tests fast-path`                           | PR di codice; suite di unit test su 4 shard                                                                                                                                                                                             | Sì                                                                                                                 |
| `No new ESLint warnings`                         | PR di codice; controllo lint consapevole delle soppressioni                                                                                                                                                                             | Sì per la stessa origine, consultivo per i fork                                                                    |
| `Merge integrity (changelog + generated skills)` | PR non in bozza; sincronizzazione del changelog e delle skill generate                                                                                                                                                                  | Sì per la stessa origine, consultivo per i fork                                                                    |

#### Report dei test fratelli dimenticati

`npm run check:forgotten-sibling-tests` riutilizza il resolver degli import alla base della mappa
dell'impatto sui test. Per ogni modulo di produzione modificato, segnala catene deterministiche
`modulo/simbolo modificato -> consumer statico -> test fratello candidato` quando il test candidato
non è presente nel diff della pull request. Il riepilogo Markdown e il risultato JSON vengono
conservati come artefatto del workflow `forgotten-sibling-tests` per la calibrazione prima di
qualsiasi introduzione come controllo bloccante.

Le riesportazioni tramite barrel e gli import dinamici sono solo elementi diagnostici della
risoluzione; non generano mai un risultato bloccante. Le eccezioni revisionate si trovano in
`config/quality/forgotten-sibling-allowlist.json`. Ogni voce deve indicare il consumer e il test
candidato, fornire una motivazione specifica e includere un collegamento a una issue o pull request
GitHub. Le voci non valide causano un errore in modalità fail-closed. Le eccezioni non possono
ignorare un test candidato eliminato o un diff che aggiunge `.skip`/`.todo`; l'indebolimento delle
asserzioni e altre forme di mascheramento restano di competenza del controllo bloccante indipendente
`check:test-masking`.

### Job: `lint`

Viene eseguito su ogni PR verso `main`. In caso di errore, blocca il merge.

| Script (`npm run ...`)            | Verifica                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Bloccante                                  |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| `check:node-runtime`              | La versione di Node.js rientra nell'intervallo supportato                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Sì                                         |
| `check:cycles`                    | Importazioni circolari — tutti i moduli in `src/` + `open-sse/`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Sì                                         |
| `check:route-validation:t06`      | Presenza di schemi Zod su tutte le route (policy Tier 6)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Sì                                         |
| `check:any-budget:t11`            | Il numero di `@ts-expect-error // any` non supera il limite (catraca Tier 11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Sì                                         |
| `check:provider-consistency`      | Ogni provider in `providers.ts` ha una voce corrispondente in `providerRegistry.ts` (e viceversa, entro i limiti dell'allowlist)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Sì                                         |
| `check:model-lifecycle`           | Le tre tabelle di routing gestite manualmente rimangono coerenti con lo snapshot del ciclo di vita archiviato nel repository (#11503): `FITNESS_TABLE` (`taskFitness.ts`) non assegna un punteggio ad alcun id ritirato che `REGISTRY` possa instradare; ogni destinazione di `BUILT_IN_ALIASES` è presente in `REGISTRY` e assente dallo snapshot degli id ritirati; ogni id ritirato ancora presente in `REGISTRY` viene inoltrato o elencato in `allowedRetiredInCatalog`; inoltre, nessuna origine o destinazione di `DEFAULT_DEGRADATION_MAP` risulta ritirata in tale snapshot. Ciò non dimostra che un modello sia attualmente fornito da un upstream attivo. Offline — esegue il confronto con `config/quality/model-lifecycle.json`, aggiornato manualmente tramite `npm run quality:refresh-model-lifecycle` (richiede la rete; non integrato nella CI). `allowedRetiredInCatalog` è un meccanismo progressivo di riduzione: aggiungere una voce solo in presenza di un issue di tracciamento. | Sì                                         |
| `check:fetch-targets`             | Ogni `fetch("/api/...")` nel codice lato client in `src/` viene risolto in un file `route.ts` reale                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Sì                                         |
| `check:deps`                      | Tutte le dipendenze installabili tramite `npm install` in ogni `package.json` del repository sono presenti in `dependency-allowlist.json`; i nuovi pacchetti non vincolati a una versione o soggetti a slopsquatting vengono segnalati                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Sì                                         |
| `audit:deps`                      | `npm audit` (root + electron) — nessun avviso di gravità alta/critica (si sovrappone al controllo OSV `check:vuln-ratchet`; vedere il backlog di razionalizzazione)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Sì                                         |
| `check:lockfile`                  | Integrità di `package-lock.json` — registry HTTPS, hash di integrità, nessun override dell'host                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Sì                                         |
| `check:licenses`                  | Allowlist di licenze SPDX per le dipendenze di produzione                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Sì                                         |
| `check:tracked-artifacts`         | Nessun artefatto di build / collegamento simbolico `node_modules` sottoposto a commit (eseguito anche nell'hook husky pre-commit; il pre-push è intenzionalmente leggero — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Sì                                         |
| `check:ai-attribution`            | Nessun trailer `Co-Authored-By` di IA/bot né piè di pagina relativo alla generazione tramite IA nei commit, nel titolo o nel corpo delle PR — Regola rigida #16 (nel ciclo fast-gates di `quality.yml` per PR→`release/**` — legge il payload dell'evento, non esegue alcuna operazione al di fuori delle PR — e in un passaggio esclusivo per le PR nel lint di `ci.yml` per PR→`main`; anche nell'hook husky `commit-msg`; coautori umani consentiti; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `check:vitest-exclusions`         | Ogni esclusione Vitest indica una issue di tracciamento ed è presente in `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Sì                                         |
| `check:file-size`                 | Nessun file sorgente supera il limite previsto per la relativa estensione (ratchet: file di grandi dimensioni bloccati nell'elenco `frozen`)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Sì                                         |
| `check:error-helper`              | Le risposte di errore negli executor/handler utilizzano `buildErrorBody()` / `sanitizeErrorMessage()` (Regola rigida #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Sì                                         |
| `check:migration-numbering`       | I file SQL di migrazione sono numerati in sequenza, senza interruzioni né duplicati                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Sì                                         |
| `check:public-creds`              | Nessun valore letterale OAuth `client_id`/`client_secret` o chiave Web Firebase al di fuori di `publicCreds.ts` (Regola rigida n. 11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Sì                                         |
| `check:db-rules`                  | Nessun SQL non elaborato al di fuori dei moduli `src/lib/db/`; nessuna importazione barrel da `localDb.ts` (Regole rigide n. 2/n. 5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Sì                                         |
| `check:known-symbols`             | Gli esecutori dei provider, le strategie di routing e i traduttori registrati nelle rispettive tabelle di dispatch corrispondono ai file su disco, senza simboli orfani o non dichiarati                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Sì                                         |
| `check:route-guard-membership`    | Ogni route che genera un processo figlio è classificata da `isLocalOnlyPath()` (Regole rigide n. 15/n. 17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Sì                                         |
| `check:test-discovery`            | Ogni file `*.test.ts` / `*.spec.ts` nel repository viene rilevato da almeno un test runner (meccanismo a cricchetto: l'elenco degli orfani in `test-discovery-baseline.json` può solo ridursi)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Sì                                         |
| `check:agent-skills-sync`         | Gli artefatti agent-skills generati corrispondono al relativo catalogo sorgente (nessuna divergenza)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `check:provider-asset-provenance` | I loghi/gli asset dei provider dispongono di una voce di provenienza registrata                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `lint:json`                       | I file di configurazione JSON vengono analizzati correttamente e rispettano le regole di lint del repository                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `typecheck:core`                  | Compilazione TypeScript senza errori (solo avvisi consultivi)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Sì                                         |
| `typecheck:noimplicit:core`       | `noImplicitAny` rigoroso — orientato al futuro; molti call site preesistenti richiedono ancora annotazioni                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | **Consultivo** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` limitato a `src/app/(dashboard)/**` (#7033) — l'allowlist selezionata di 27 file di `typecheck:core` non include alcun TSX della dashboard e nemmeno `next build` ne esegue mai il controllo dei tipi (`next.config.mjs` imposta `ignoreBuildErrors: true`), pertanto le regressioni relative a identificatori orfani in tale area (#6625/#6909) non erano rilevabili dalla CI. Confronta i risultati con una baseline bloccata del conteggio per file/per codice TS (`config/quality/dashboard-typecheck-baseline.json`, secondo lo stesso schema di rilevamento dell'obsolescenza di `check:known-symbols`) — solo i NUOVI errori oltre il conteggio registrato nella baseline causano il fallimento del controllo; ridurre progressivamente la baseline con `--update` quando viene corretto un errore preesistente.                                                                                                                                                                            | Sì                                         |

### Job: `quality-gate`

Viene eseguito dopo `test-coverage`. In caso di errore, blocca il merge.

| Script                       | Verifica                                                                                                                                                                                       | Bloccante                |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| `quality:collect`            | Genera `quality-metrics.json` (numero di avvisi ESLint, copertura dal report unificato degli shard)                                                                                            | Sì (a monte del ratchet) |
| `quality:ratchet`            | Ogni metrica in `quality-baseline.json` non è peggiorata (avvisi ESLint ≤ baseline; copertura ≥ baseline)                                                                                      | Sì                       |
| `check:duplication`          | La duplicazione del codice (jscpd@4) non supera la baseline in `quality-baseline.json`                                                                                                         | Sì                       |
| `check:complexity`           | La complessità ciclomatica a livello di file non supera il limite (regole ESLint di base `complexity` + `max-lines-per-function`)                                                              | Sì                       |
| `check:cognitive-complexity` | Ratchet della complessità cognitiva (`eslint-plugin-sonarjs`) — passaggio ESLint separato; la CI esegue entrambi unificandoli nel singolo passaggio `check:complexity-ratchets`                | Sì                       |
| `check:dead-code`            | Il ratchet di esportazioni/file inutilizzati (knip) non peggiora rispetto alla baseline                                                                                                        | Sì                       |
| `check:compression-budget`   | Budget del benchmark di compressione — le soglie minime di risparmio dei token per motore non devono peggiorare                                                                                | Sì                       |
| `check:type-coverage`        | Il ratchet della percentuale tipizzata (`type-coverage`) non peggiora; sostituisce in gran parte `typecheck:noimplicit:core`                                                                   | Sì                       |
| `check:codeql-ratchet`       | Il numero di avvisi CodeQL aperti non peggiora (lettura tramite `gh api`; omissione controllata senza token) — frequenza di aggiornamento e attivazione manuale: vedere "Ratchet CodeQL" sotto | Sì                       |

### Job: `quality-extended`

L'intero job è consultivo (`continue-on-error: true`). I ratchet basati su npm vengono
eseguiti effettivamente; gli scanner esterni vengono installati tramite `gh release download` e si omettono automaticamente (exit 0)
quando un binario è ancora assente.

| Script                   | Verifica                                                                                                                                                                                                              | Bloccante      |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `check:circular-deps`    | Nessuna dipendenza circolare (dpdm)                                                                                                                                                                                   | **Consultivo** |
| `check:bundle-size`      | La dimensione del bundle non supera il limite                                                                                                                                                                         | **Consultivo** |
| `check:secrets`          | Scansione dei segreti (gitleaks) — viene omessa se il binario è assente                                                                                                                                               | **Consultivo** |
| `check:vuln-ratchet`     | Le vulnerabilità delle dipendenze (osv-scanner) non peggiorano — viene omesso se il binario è assente                                                                                                                 | **Consultivo** |
| `check:workflows`        | Lint dei workflow (actionlint + zizmor) — viene omesso se i binari sono assenti                                                                                                                                       | **Consultivo** |
| `check:openapi-breaking` | Modifiche incompatibili al contratto dell'API pubblica (`openapi.yaml`) rispetto al branch di base (oasdiff) — genera `openapiBreaking=N`; viene omesso se oasdiff è assente o la specifica di base non è risolvibile | **Consultivo** |

### Job: `docs-sync-strict`

Viene eseguito su ogni PR verso `main`. In caso di errore, blocca il merge.

| Script                         | Verifica                                                                                                                                                                                                    | Bloccante                        |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- |
| `check:docs-all`               | Meta-gate che esegue in sequenza i 6 sotto-gate riportati di seguito                                                                                                                                        | Sì                               |
| ↳ `check:docs-sync`            | Coerenza delle versioni tra CHANGELOG / OpenAPI / llm.txt                                                                                                                                                   | Sì                               |
| ↳ `check:docs-counts`          | I conteggi nel testo (numero di provider, numero di migrazioni, ecc.) rientrano nella finestra di ratchet dei conteggi reali                                                                                | Sì                               |
| ↳ `check:env-doc-sync`         | Ogni variabile d'ambiente in `.env.example` è documentata in una tabella della documentazione e viceversa                                                                                                   | Sì                               |
| ↳ `check:deprecated-versions`  | Nessuna stringa di versione deprecata nella documentazione                                                                                                                                                  | Sì                               |
| ↳ `check:doc-links`            | I link markdown interni nella documentazione puntano a file reali (formato `[text]`/`(path)`)                                                                                                               | Sì                               |
| ↳ `check:fabricated-docs`      | Le route, le variabili d'ambiente, i comandi CLI, i nomi degli hook e i percorsi file citati nella documentazione esistono nella codebase. Gate rigido tramite `--strict`; errore non bloccante senza flag. | Sì (tramite `--strict` nella CI) |
| `check:cli-i18n`               | Le stringhe dei comandi CLI sono presenti in tutti i file delle lingue i18n                                                                                                                                 | Sì                               |
| `check:openapi-coverage`       | La specifica OpenAPI copre almeno una soglia minima, soggetta a ratchet, delle route reali                                                                                                                  | Sì                               |
| `check:openapi-security-tiers` | Le annotazioni dei livelli di sicurezza in `openapi.yaml` sono coerenti con le classificazioni di `routeGuard.ts`                                                                                           | **Consultivo**                   |
| `check:openapi-routes`         | Ogni percorso in `openapi.yaml` corrisponde a un `route.ts` reale (anti-allucinazione)                                                                                                                      | Sì                               |
| `check:docs-symbols`           | Ogni riferimento `/api/...` in `docs/**/*.md` corrisponde a un `route.ts` reale (anti-allucinazione)                                                                                                        | Sì                               |
| `i18n translation drift`       | Chiavi non tradotte nei file delle lingue i18n — solo avviso                                                                                                                                                | **Consultivo**                   |

### Job: `i18n-ui-coverage`

| Script                            | Verifica                                                                                                                                                                                                  | Bloccante      |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `check-ui-keys-coverage` (inline) | La copertura delle chiavi i18n dell'interfaccia utente è ≥ 65%                                                                                                                                            | Sì             |
| `check-ui-value-drift` (inline)   | La riscrittura di un **valore** inglese non lascia traduzioni obsolete                                                                                                                                    | Sì             |
| `check-new-key-coverage` (inline) | Una **nuova** chiave inglese è tradotta in ogni lingua — un marcatore `__MISSING__:` viene rifiutato                                                                                                      | Sì             |
| `check-translation-ratio`         | Il rapporto di traduzioni reali per lingua (elementi identici all'inglese / segnaposto / mancanti non inclusi nell'allowlist) non deve superare `config/quality/i18n-translation-baseline.json` + margine | **Consultivo** |

Richiede `fetch-depth: 0` — il gate value-drift confronta `en.json` con la base del merge.

#### `check-ui-value-drift` — gate per le traduzioni obsolete

Rileva l'unica regressione i18n che gli altri gate non sono strutturalmente in grado di individuare: un valore inglese
viene riscritto e le traduzioni derivate dall'inglese _precedente_ rimangono invariate, quindi
gli utenti non anglofoni continuano a leggere testi formulati con sicurezza, ma ormai errati.

Questo problema è stato effettivamente rilasciato. `oauthModal.googleOAuthWarning` è stato riscritto quando è stato introdotto
l'helper di accesso Antigravity (#5203); **39 lingue su 43** hanno mantenuto un testo che indicava agli operatori di "copiare
l'URL completo e incollarlo qui sotto" — un flusso che non può essere completato per quel provider. Il problema è
passato inosservato fino alla #8463 perché:

- `sync-ui-keys` inserisce solo le chiavi **assenti**, mai quelle **obsolete**;
- `check-ui-keys-coverage` conta la _presenza_ delle chiavi, quindi una traduzione obsoleta risulta coperta;
- `check-translation-drift` monitora le copie della documentazione in `docs/i18n/<locale>/**.md` —
  non legge mai `src/i18n/messages/*.json`. Bloccante nel job `docs-sync-strict` dalla
  risincronizzazione 2026-09: modifica un documento principale → `npm run i18n:run -- --files=<doc>` (a livello di sezione, economico).

**Basato sulle differenze, non su una baseline.** Confronta `en.json` alla base di merge con
l'albero di lavoro; per ogni chiave il cui valore inglese è cambiato, qualsiasi locale che
contenga ancora una traduzione non modificata è obsoleto. Questo deliberatamente **congela il debito preesistente**:
una differenza non può rivelare da quale vecchio testo inglese derivi una traduzione presente da tempo,
quindi il controllo valuta soltanto ciò che viene toccato dalla modifica corrente. L'alternativa
(una baseline di hash per chiave) richiederebbe un file generato di circa 600 KB, 3 volte più grande
della maggiore baseline esistente, che cambierebbe a ogni PR di internazionalizzazione.

Esistono due modi per soddisfare il controllo:

1. aggiornare le traduzioni interessate, oppure
2. impostarle su `__MISSING__:<nuovo testo inglese>` — a quel punto il runtime restituisce il testo
   inglese corretto (`src/i18n/request.ts::deepMergeFallback`, #7258) e la chiave viene accodata per la traduzione.

Se è cambiato il **significato** della stringa, è preferibile **rinominare la chiave**: una nuova chiave
non può ereditare una traduzione obsoleta. È il modello utilizzato dalla #8463.

```bash
npm run i18n:check-value-drift          # rigoroso (quello eseguito dalla CI)
npm run i18n:check-value-drift:warn     # genera solo un rapporto
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Termina con codice 0 e `SKIP reason=base-unresolved` quando il catalogo di base non può essere letto
(clone shallow senza il riferimento di base), analogamente a `check-openapi-breaking`.

### Job: `i18n`

Matrice completa di convalida i18n (un job per locale). L'intero job è consultivo.

| Script                          | Convalida                               | Bloccante                                                  |
| ------------------------------- | --------------------------------------- | ---------------------------------------------------------- |
| `validate_translation.py quick` | Completezza delle traduzioni per locale | **Consultivo** (`continue-on-error: true` sull'intero job) |

### Job: `pr-test-policy`

Viene eseguito soltanto sulle pull request.

| Script                 | Convalida                                                                                                                                                | Bloccante |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| `check:pr-test-policy` | Le PR che modificano il codice di produzione in `src/`, `open-sse/`, `electron/` o `bin/` devono includere o aggiornare i test (Regola rigida #8)        | Sì        |
| `check:test-masking`   | I file di test modificati non riducono il numero netto di asserzioni né aggiungono tautologie `assert.ok(true)`                                          | Sì        |
| `check:pr-evidence`    | Il corpo della PR cita prove di test/VPS relative alla modifica (automatizza la Regola rigida #18 cercando nel testo della PR — fragile, vedere Backlog) | Sì        |

### Job: `test-vitest`

Viene eseguito dopo `build`. In caso di errore blocca il merge.

| Suite            | Convalida                                                    | Bloccante                                                                                                                      |
| ---------------- | ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------ |
| `test:vitest`    | Server MCP (110 strumenti), autoCombo, cache — runner vitest | Sì                                                                                                                             |
| `test:vitest:ui` | Test dei componenti dell'interfaccia — runner vitest         | **Bloccante** — gli errori preesistenti sono esplicitamente esclusi in `vitest.config.ts`; i nuovi errori fanno fallire il job |

### Workflow notturni (pianificati, consultivi)

Vengono eseguiti secondo una pianificazione cron (e tramite `workflow_dispatch`), mai sulle PR. Sono tutti consultivi.

| Workflow               | Convalida                                                                                                                                                                           | Bloccante      |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `nightly-property`     | Test basati sulle proprietà con fast-check, con un seed casuale e un numero elevato di esecuzioni                                                                                   | **Consultivo** |
| `nightly-resilience`   | Controllo della crescita dell'heap, iniezione caotica di guasti, test di carico/soak con k6                                                                                         | **Consultivo** |
| `nightly-llm-security` | Protezione dalle injection con promptfoo (modalità di blocco) + sonde garak (ignorate in assenza del segreto di un provider)                                                        | **Consultivo** |
| `nightly-schemathesis` | Fuzzing del contratto OpenAPI (schemathesis) su un'istanza OmniRoute attiva usando `docs/openapi.yaml` — evidenzia violazioni della specifica / errori 500 non gestiti (Fase 8 B.4) | **Consultivo** |
| `nightly-mutation`     | Punteggio dei mutation test di Stryker sul percorso rapido dei test unitari — i mutanti sopravvissuti evidenziano asserzioni deboli                                                 | **Consultivo** |
| `nightly-compat`       | Matrice di compatibilità del motore Node per gli intervalli `engines.node` supportati                                                                                               | **Consultivo** |

---

## Fase di velocità (2026-08-30 → v4.0 LTS): ogni baseline allentata del 20%

Decisione del responsabile (2026-08-30): fino alla modularizzazione della v4.0, la velocità di
rilascio conta più del contenimento del debito. Ogni baseline **numerica** del ratchet è stata
allentata del 20% in un unico passaggio verificabile e la fase è dichiarata in
`config/quality/quality-baseline.json`:

```json
"_policy": { "phase": "velocity", "since": "2026-08-30", "until": "4.0.0",
             "relaxPct": 20, "requireTighten": false }
```

| Cosa è cambiato                                                                                                                                                                                                                                                         | Dove                                                                                                   |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `metrics.*.value` — conteggi in cui un valore più basso è migliore ×1.2, percentuali in cui un valore più alto è migliore ÷1.2 (soglia minima di copertura mantenuta a 60, `eslintErrors` resta 0, `eslintWarnings` 0 → 20% del conteggio congelato delle soppressioni) | `quality-baseline.json` (la nota `_relax_velocity_2026_08_30` elenca ogni valore prima → dopo)         |
| `count` ×1.2 / `percentage` ×1.2                                                                                                                                                                                                                                        | `complexity-baseline.json`, `duplication-baseline.json`                                                |
| `cap`, `testCap`, ogni limite di righe `frozen[*]` / `testFrozen[*]` ×1.2                                                                                                                                                                                               | `file-size-baseline.json`                                                                              |
| conteggi per file / per codice TS ×1.2                                                                                                                                                                                                                                  | `api-typecheck-baseline.json`, `dashboard-typecheck-baseline.json`, `open-sse-typecheck-baseline.json` |
| `THRESHOLD` 36 → 30                                                                                                                                                                                                                                                     | `scripts/check/check-openapi-coverage.mjs`                                                             |
| `--require-tighten` diventa consultivo quando `_policy.requireTighten === false`                                                                                                                                                                                        | `scripts/quality/check-quality-ratchet.mjs`                                                            |
| il job notturno `bank-ratchet-shrinks` viene sospeso (registrerebbe la riduzione misurata annullando il margine)                                                                                                                                                        | `.github/workflows/nightly-release-green.yml`                                                          |

Le allowlist (`eslint-suppressions.json`, `test-masking-allowlist.json`, `test-discovery-baseline.json`,
…) **non** sono budget e non sono state modificate. I gate delle policy di superamento/fallimento
(segreti, regole SQL, contratto documentazione/ambiente, parità i18n, test unitari) restano
invariati: un test fallito resta un test fallito.

**Strumenti**

- `npm run quality:relax-baselines -- --pct 20 --note velocity_YYYY_MM_DD [--dry-run]` — l'allentamento
  una tantum (`scripts/quality/relax-baselines.mjs`); rifiuta di essere eseguito due volte con la
  stessa nota.
- `npm run quality:headroom [-- --only deadExports,fileSize] [--json out.json --md out.md]` —
  misura ogni gate numerico nello stesso modo della CI e mostra il margine rimanente per ciascun
  gate (`scripts/quality/baseline-headroom.mjs`). Il job notturno `baseline-headroom` pubblica la
  tabella nell'issue attiva **📈 Margine delle baseline (fase di velocità)** e aggiunge
  l'etichetta `headroom-alert` quando un gate si trova entro il 10% dal proprio limite o lo ha
  già superato. Quell'issue è il sistema di allerta preventiva: un budget che si esaurisce in
  pochi giorni indica che l'allentamento viene consumato da poche PR, non dall'intero team —
  consultare le note `_rebaseline_*` del gate interessato.

**Modalità nuovo codice (Clean-as-You-Code) — dal 2026-08-30, solo percorso rapido delle PR**

Negli eventi `pull_request`, `quality.yml` passa `--base-ref <PR base SHA>` a `check:file-size`,
`check:complexity-ratchets` e `check:dead-code`. In questa modalità, il gate confronta HEAD con
la merge base **limitatamente ai file modificati dalla PR** (`scripts/check/newCodeMode.mjs`: la
merge base viene materializzata in un `git worktree` temporaneo, ESLint/knip vengono eseguiti lì
e su HEAD, quindi i conteggi per file vengono confrontati):

- **bloccante** — la PR ha aggiunto violazioni di complessità ciclomatica/cognitiva o export
  inutilizzati nei file che ha modificato (`complexityNewCode=`, `cognitiveComplexityNewCode=`,
  `deadExportsNewCode=` nel log);
- **consultivo** — il totale globale rispetto alla baseline congelata. Il drift ereditato non
  fa mai fallire una PR non responsabile; il drift viene ricongelato durante la riconciliazione
  della release e monitorato dal job del margine.

Le esecuzioni `workflow_dispatch`, il controllo completo release-green e il job notturno del
margine non hanno una base PR e mantengono il confronto assoluto (globale). Copertura,
duplicazione e copertura dei tipi restano per ora globali (i relativi strumenti non producono
economicamente un diff per file) — sono candidati allo stesso trattamento.

**Chiusura della fase alla v4.0 (LTS = più restrittiva di prima, non "ritorno alla normalità")**

1. Sulla punta pura di `release/v4.0.0`: eseguire `npm run quality:headroom --json` per registrare i dati, quindi
   `npm run quality:ratchet -- --update`, `check:file-size --update`,
   `check:complexity-ratchets --update`, `check:dead-code --update` e
   `--update` per ogni gate di type checking: ogni baseline scende al valore misurato.
2. Eliminare `_policy` da `quality-baseline.json` (riattiva `--require-tighten` e
   l'accantonamento notturno), ripristinare `THRESHOLD = 36` (o un valore superiore) in
   `check-openapi-coverage.mjs`.
3. Irrigidire oltre i valori misurati laddove la modularizzazione ha dato risultati: riportare
   il `cap` per le dimensioni dei file a 1000 (o 800), aumentare di 5 le soglie minime di
   copertura, impostare a 0 le esportazioni inutilizzate per i pacchetti modularizzati.

## Baseline del ratchet (`quality-baseline.json`)

Il motore del ratchet (`scripts/quality/check-quality-ratchet.mjs`) legge `quality-baseline.json`
e lo confronta con il file `quality-metrics.json` appena generato. Qualsiasi metrica che regredisca
oltre il relativo epsilon causa il fallimento della build.

Metriche attualmente monitorate:

| Metrica               | Direzione | Significato                                      |
| --------------------- | --------- | ------------------------------------------------ |
| `eslintWarnings`      | `down`    | Il numero di avvisi ESLint non deve aumentare    |
| `coverage.statements` | `up`      | La copertura delle istruzioni non deve diminuire |
| `coverage.lines`      | `up`      | La copertura delle righe non deve diminuire      |
| `coverage.functions`  | `up`      | La copertura delle funzioni non deve diminuire   |
| `coverage.branches`   | `up`      | La copertura dei rami non deve diminuire         |

Per aggiornare la baseline dopo un miglioramento effettivo:

```bash
npm run quality:ratchet -- --update
git add quality-baseline.json
```

Il flag `--update` scrive i valori misurati correnti in `quality-baseline.json`.
Eseguire il commit di questo file insieme alla modifica che ha migliorato la metrica. Una PR che migliora una
metrica senza aggiornare la baseline verrà rilevata da `--require-tighten` (Fase 6A.5,
implementazione in sospeso).

### Ratchet CodeQL: frequenza di aggiornamento e attivazione manuale

`check:codeql-ratchet` legge **lo stato del repository, aggiornato secondo una pianificazione — non per ogni PR.**
`gh api repos/diegosouzapw/OmniRoute/code-scanning/default-setup` restituisce
`state: configured`, `schedule: weekly`: si tratta della scansione con configurazione predefinita di GitHub, non di un'analisi
a ogni push. Conseguenza: dopo il merge di una PR che CORREGGE degli avvisi, il ratchet continua a leggere
il precedente conteggio più elevato finché non viene eseguita la successiva scansione pianificata — pertanto segnala una regressione
su ogni PR aperta, incluse le PR successive a quella correttiva, finché la scansione non si aggiorna.

**Aggiornamento manuale**: `gh workflow run codeql.yml --ref release/vX.Y.Z` esegue nuovamente
l'analisi e ripubblica gli avvisi entro pochi minuti. Leggere prima `.github/workflows/codeql.yml`
— la sua intestazione spiega che è riservato a `workflow_dispatch` **perché è in conflitto con
la "configurazione predefinita" di GitHub** (`CodeQL analyses from advanced configurations cannot be
processed when the default setup is enabled`). Il ripristino dei trigger `push`/`pull_request`/
`schedule` richiede prima un'**azione del proprietario**: Settings → Code security →
CodeQL: Default → Advanced. Non aggiungere un trigger `schedule:` senza aver effettuato tale passaggio — produrrebbe
soltanto esecuzioni non riuscite.

**Restringere la baseline dopo la diminuzione del conteggio** — `node scripts/check/check-codeql-ratchet.mjs
--update` scrive il nuovo conteggio misurato in `quality-baseline.json` →
`metrics.codeqlAlerts.value`, in modo che il ratchet non consenta silenziosamente una regressione fino
al precedente limite massimo. Esempio pratico (2026-09-02/03): la PR #12502 ha corretto 7 avvisi reali
(da 13 a 6 aperti misurati); la PR #12530 ha ristretto la baseline bloccata da 11 a 6 per allinearla; i
6 rimanenti sono stati quindi ignorati, indicando una giustificazione per ciascun avviso, fino ad arrivare a 0 aperti.

**Le esclusioni sono una decisione dell'operatore (Regola rigida #14)** — non ignorare mai un avviso CodeQL
senza registrare la giustificazione tecnica nel commento di esclusione: `won't fix` per
un requisito di un protocollo upstream, `used in tests` per una fixture di test, `false positive`
per un meccanismo di sanitizzazione che CodeQL non è in grado di rilevare (precedente: `docs/security/ERROR_SANITIZATION.md`).

---

## Criteri per i tentativi dei test (WS5.4, v3.8.49)

I tentativi vengono gestiti per singolo runner, mai in modo globale: applicare indiscriminatamente nuovi tentativi trasforma le regressioni reali
in flake invisibili:

| Runner           | Criterio                                                                                                                                           | Motivo                                                                                                                                             |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| Playwright (e2e) | `retries: 1` solo nella CI, con `trace: on-first-retry`                                                                                            | Le tempistiche di browser/rete sono realmente non deterministiche; un tentativo con una traccia trasforma un flake in un artefatto diagnosticabile |
| Vitest           | NESSUN tentativo globale. Un test notoriamente instabile riceve un tentativo esplicito per il singolo test (visibile nel diff, esaminato nella PR) | Mantiene l'elenco di quarantena nel repository, senza mai renderlo opaco                                                                           |
| node:test (unit) | NESSUN tentativo, mai                                                                                                                              | Un test unitario instabile è un bug nel test: correggilo, non limitarti a rieseguirlo                                                              |

SLO target una volta disponibile la telemetria dei flake (WS5.2/5.3): tasso di flake <1% per test
(soglia "correggere subito"), tasso di successo ≥95% per pipeline. Valori di riferimento del settore:
ricalibrare in base alle nostre misurazioni.

## Deriva dei ratchet a livello di release (WS5.5, v3.8.49)

Quando un ratchet (dimensione dei file, complessità, avvisi eslint) regredisce sul tip PURO della release,
ovvero è la COMBINAZIONE dei merge ad aver causato la regressione e nessuna singola PR la riproduce
sul proprio branch, la correzione spetta al **responsabile della release, una sola volta, sul
branch di release**: preferire l'estrazione/refactoring; ridefinire la baseline solo con la voce di
giustificazione documentata. Non scaricare mai su una PR di un collaboratore la deriva dovuta alla combinazione e non
ridefinire mai la baseline per singola PR (ciò nasconde regressioni reali). Prima, distingui i casi: riproduci
l'errore sul tip puro in un worktree di verifica prima di presumere che sia stato causato dalla tua PR.

## Registrazione delle riduzioni dei ratchet: la direzione discendente (#8584)

Il ratchet è automatico solo a metà, ed è la metà sbagliata. **Alzare** un limite è una
modifica manuale al JSON che richiede dieci secondi ed è il modo più rapido per sbloccare una PR in errore.
**Abbassarne** uno richiede che qualcuno esegua `--update` ed effettui il commit del risultato; prima
dell'introduzione del job `bank-ratchet-shrinks`, nessun workflow lo eseguiva. La conseguenza misurata
(2026-07-25): 18 file congelati già pari o inferiori al limite di 800 righe per i nuovi file, con il caso peggiore
a 132× (`src/shared/validation/schemas.ts`, 19 righe con un limite di 2.523); il
limite massimo di complessità è passato da `1794 → 2169` in circa 37 note di ridefinizione della baseline, con una sola
riduzione (−1); inoltre, "restringere tramite `--update` nel prossimo ciclo" è stato scritto 31 volte e rispettato
una sola volta. Un limite che sopravvive al codice che lo aveva giustificato trasforma silenziosamente ogni decomposizione
completata in un margine di crescita per chi modificherà il file successivamente.

`nightly-release-green.yml` → il job **`bank-ratchet-shrinks`** chiude questo ciclo:

|               |                                                                                                                         |
| ------------- | ----------------------------------------------------------------------------------------------------------------------- |
| Esecuzione    | `schedule` (3×/giorno) + `workflow_dispatch` — deliberatamente **non** `push`                                           |
| Misurazione   | il `release/vX.Y.Z` più alto, con la stessa risoluzione e protezione dall'iniezione di `release-green`                  |
| Scrittura     | `check:file-size --update` e `check:complexity-ratchets --update` (entrambi esclusivamente riduttivi per progettazione) |
| Verifica      | `npm run check:ratchet-bank` (`scripts/quality/verify-ratchet-bank.mjs`)                                                |
| Distribuzione | un'unica PR sempre aggiornata verso il branch di release: aggiornata forzatamente, senza mai generare spam              |

La registrazione viene eseguita in batch anziché a ogni push perché non ha requisiti di latenza (una riduzione
registrata entro 8 ore è accettabile), mentre un'esecuzione a ogni merge ricostruirebbe ripetutamente il branch della PR
durante le campagne di merge e comporterebbe ogni volta il costo di una scansione ESLint completa. Il rilevamento rimane sul
push (`release-green`); solo la registrazione viene eseguita in batch.

### Il verificatore di sicurezza

Il job scrive nelle baseline senza supervisione, quindi è `verify-ratchet-bank.mjs` a rendere
accettabile questa operazione. Confronta tramite diff l'albero successivo a `--update` con `HEAD` e **interrompe il job
prima che esista qualsiasi commit**, senza aprire alcuna PR, a meno che ogni modifica non sia una delle seguenti:

- una voce numerica `frozen` / `testFrozen` **ridotta** o **rimossa**
- `complexity-baseline.json` → `count` **ridotto**
- `quality-baseline.json` → `metrics.cognitiveComplexity.value` **ridotto**

Qualsiasi altra modifica causa un errore: aumentare un numero, aggiungere una voce, modificare `cap`/`testCap` oppure
eliminare/riscrivere una nota `_rebaseline_*` (queste note costituiscono la traccia di audit del motivo per cui esiste ciascun
limite e sono archiviate nello stesso oggetto `frozen` delle voci dei file).
Un bot in grado di aumentare un limite sarebbe nettamente peggiore dello stato attuale. Protezione dalle
regressioni: `tests/unit/verify-ratchet-bank.test.ts`.

Il job non esegue mai il push verso `release/*`: una persona effettua il merge della PR, quindi una misurazione errata
non può essere integrata senza revisione.

## Criterio della allowlist

Ogni gate che non può fallire a causa di violazioni preesistenti utilizza una allowlist immutabile
(ad es., `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`). Il criterio è:

**Correggere la causa principale; utilizzare la allowlist solo quando la violazione è preesistente e
non può essere corretta nella stessa PR.**

Quando si aggiunge una voce a una allowlist:

1. Includere un commento con la giustificazione.
2. Fare riferimento all'issue di tracciamento (ad es., `// #3498 — Funzionalità della Fase 2, non ancora implementata`).
3. Rimuovere la voce nella stessa PR che corregge la violazione: una voce obsoleta che non
   sopprime più una violazione attiva costituisce essa stessa un difetto (il controllo delle
   applicazioni obsolete 6A.3 farà fallire il gate per una voce orfana nella allowlist una volta implementato).

**Non** aggiungere voci alla allowlist per far superare i test più rapidamente. Un gate superato con una
allowlist in crescita crea un falso senso di qualità.

### Quando un gate fallisce nella propria PR

1. **Leggere attentamente l'output del gate**: indica esattamente quale file o simbolo ha violato
   la regola.
2. **Correggere la violazione**: la maggior parte dei gate consiste in controlli deterministici del filesystem che vengono superati non appena
   il codice è corretto.
3. **Se la violazione è preesistente** (ovvero non è stata introdotta dalla propria modifica, ma ora il gate
   la rileva): aggiungere una voce alla allowlist con un commento di giustificazione e un'issue di tracciamento.
4. **Se il gate è un ratchet** (copertura, avvisi ESLint, duplicazione, complessità):
   la modifica ha peggiorato la metrica. Correggere il problema sottostante oppure, in rari casi, eseguire
   `npm run quality:ratchet -- --update` se la modifica è intenzionale e il peggioramento
   della metrica è accettabile; documentarne tuttavia il motivo nella descrizione della PR.
5. **I gate consultivi** (`continue-on-error: true`) sono informativi: non bloccano
   il merge, ma compaiono nel riepilogo della CI. Correggerli comunque.

---

## Aggiunta di un nuovo gate

1. Creare `scripts/check/check-<name>.mjs` (oppure `.ts`). I gate dei criteri terminano con 0/1.
   I gate di tipo ratchet emettono una metrica in `quality-metrics.json` tramite `collect-metrics.mjs`.
2. Aggiungere `"check:<name>": "node scripts/check/check-<name>.mjs"` a `package.json`.
3. Integrarlo in `.github/workflows/ci.yml` nel job appropriato
   (criteri → `lint` o `docs-sync-strict`; ratchet → `quality-gate`).
4. Se dispone di una allowlist, applicare `reportStaleEntries()` da
   `scripts/check/lib/allowlist.mjs` affinché le voci obsolete vengano rilevate automaticamente.
5. Scrivere un test in `tests/unit/build/` che copra la logica di rilevamento del gate.
6. Aggiornare questo documento (aggiungere una riga alla tabella del job pertinente).

---

## Strumenti per gli agenti: LSP-in-the-loop (facoltativo)

Oltre ai gate della CI, OmniRoute include uno scaffold `agent-lsp` **facoltativo**
(un `.mcp.json` a livello di progetto, Fase 7 Attività 15). Creare `.mcp.json`
per esporre un server del linguaggio TypeScript agli agenti di programmazione, affinché risolvano simboli /
diagnostica **prima** di scrivere codice: un complemento a `typecheck:core` basato sulla compilazione prima delle asserzioni,
che elimina alla fonte gli errori relativi a "simboli inventati". Intenzionalmente
non viene caricato automaticamente (occorre scegliere e verificare il bridge MCP↔LSP); una voce non valida registra soltanto un
errore di connessione e non interrompe mai le sessioni.

---

## Backlog di razionalizzazione (revisione ROI — Fase 9 Onda 3)

Questo inventario è stato riconciliato con `ci.yml` il 2026-06-17 (la versione precedente ometteva
`audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`,
`check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`,
`check:codeql-ratchet`, `check:pr-evidence`). Una revisione del ROI dell'insieme riconciliato
ha identificato i seguenti candidati alla razionalizzazione. **Gli accorpamenti sono modifiche
meccaniche alla CI; le attivazioni/disattivazioni e le rimozioni sono decisioni di policy riservate
all'operatore.** Nulla di quanto segue è stato ancora applicato.

**Non documentati anche sopra** (consultivi, segnale debole): il job `docs-lint`
(markdownlint + Vale, intero job con `continue-on-error`) e i workflow autonomi degli scanner
`semgrep.yml` / `codeql.yml` / `scorecard.yml`. `semgrepFindings: 0` è presente in
`quality-baseline.json`, ma non è collegato a un ratchet bloccante in `ci.yml`: la metrica è
attualmente orfana.

### Accorpamento / deduplicazione (meccanici, rischio inferiore)

Ogni candidato è stato convalidato rispetto allo stato effettivo dei gate il 2026-06-17 (fidarsi,
ma verificare); diversi accorpamenti "ovvi" si sono rivelati celare debito e **non** sono
sostituzioni dirette senza rischi.

- **`check:docs-sync` viene eseguito due volte** — autonomamente nel job `lint` e nuovamente all'interno di `check:docs-all` (`docs-sync-strict`) e dell'hook pre-commit di husky. ✅ **FATTO** — rimossa l'esecuzione autonoma da `lint`.
- **Scansione delle CVE** — ❌ **NON è un accorpamento diretto senza rischi.** `audit:deps` genera un errore bloccante per qualsiasi CVE di gravità alta/critica; `check:vuln-ratchet` (osv) fallisce soltanto in caso di _regressione_ rispetto alla baseline (attualmente 1 MODERATE). Semantiche diverse: rimuovere `audit:deps` eliminerebbe il gate assoluto per le vulnerabilità di gravità alta/critica. Mantenerli entrambi.
- **Rilevamento dei cicli** — ❌ **NON è un accorpamento diretto senza rischi.** `check:circular-deps` (dpdm) segnala **91 cicli** (per questo è consultivo); non può essere promosso a bloccante senza prima risolverli e ha un ambito più ampio rispetto a `check:cycles`, che è verde e mirato. Mantenere `check:cycles` come bloccante; la risoluzione dei 91 cicli dpdm costituisce un backlog separato.
- **Complessità** — ✅ **FATTO** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): un'unica scansione ESLint, con conteggi per ruleId, in modo che le baseline di complessità ciclomatica+numero massimo di righe e di complessità cognitiva rimangano indipendenti; i singoli `check:complexity` / `check:cognitive-complexity` restano disponibili per l'uso locale con `--update`.
- **Anti-allucinazione di `/api`** — ✅ **FATTO** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): un unico inventario del filesystem di `src/app/api`; openapi-routes + docs-symbols continuano a generare report indipendenti; i singoli controlli restano disponibili per le esecuzioni locali.
- **`check:node-runtime` viene eseguito in 11 job** — ⚠️ **ROI basso.** Ciascuno usa un runner separato e il controllo richiede <1s; risparmio totale di ~10s, a fronte della perdita di una protezione economica per ciascun job. Non vale la complessità della modifica.
- **`typecheck:noimplicit:core` nel lint della CI** — ✅ **rimosso dal job lint** (era consultivo con `continue-on-error`); la superficie dei tipi bloccante è `typecheck:core` + `check:type-coverage`. Script locale mantenuto.

### Attivare/disattivare / decidere (policy dell'operatore)

- `check:openapi-security-tiers` (consultivo) — ❌ **NON può essere reso bloccante senza interventi preliminari.** Termina con codice 0, ma avverte che diverse route di `traffic-inspector` sotto `LOCAL_ONLY_API_PREFIXES` non includono l'annotazione `x-loopback-only: true`. Per renderlo bloccante è necessario aggiungere prima tali annotazioni a `openapi.yaml`.
- `typecheck:noimplicit:core` (consultivo) — ampiamente sostituito dal ratchet bloccante `check:type-coverage`. Convertirlo in un ratchet oppure rimuovere il secondo passaggio `tsc` ridondante.
- `test:vitest:ui` (ora **bloccante**) — gli errori preesistenti sono esplicitamente esclusi in `vitest.config.ts` con commenti di tracciamento `// #8618`; i nuovi errori fanno fallire il job.
- `check:secrets` (gitleaks, ratchet bloccante congelato su 3 falsi positivi documentati) — aggiungere i 3 elementi all'allowlist per raggiungere 0, oppure declassarlo a consultivo. Si sovrappone alla scansione nativa dei segreti di GitHub + `check:public-creds`.
- `check:pr-evidence` (bloccante, esegue grep sul testo del corpo della PR) — alto rischio di falsi positivi; la rimozione indebolirebbe l'applicazione della Regola Rigida n. 18, quindi si tratta di un'autentica decisione di policy.
- `semgrep` (workflow autonomo consultivo) — si sovrappone a CodeQL per le categorie OWASP; collegare la sua baseline a un ratchet oppure rimuoverlo.

---

## Documentazione correlata

- Catena di fornitura (provenienza, SBOM, Trivy, Scorecard): [`docs/security/SUPPLY_CHAIN.md`](../security/SUPPLY_CHAIN.md)

#### `check-key-completeness` — gate di parità dell'insieme di chiavi

`scripts/i18n/check-key-completeness.mjs` (`npm run i18n:check-keys`, job `i18n-ui-coverage`).
Confronta l'insieme delle chiavi foglia di ogni `src/i18n/messages/<locale>.json` con `en.json` e non
riesce in presenza di qualsiasi chiave foglia mancante o aggiuntiva, indipendentemente da quando
la chiave sia stata aggiunta. I segnaposto `__MISSING__:` vengono considerati presenti (il loro
contenuto è di competenza del gate del rapporto). È il complemento assoluto dei due gate basati
su diff/percentuale: `check-ui-keys-coverage` impone una soglia minima dell'80% per ogni lingua
(43 chiavi mancanti su circa 13.000 risultano comunque pari al 99,7%) e `check-new-key-coverage`
valuta soltanto le chiavi aggiunte da una PR a `en.json`. Un batch di lingue viene generato
dall'`en.json` del giorno in cui viene creato il relativo branch e continua a tradurre per giorni,
mentre la base continua ad aggiungere chiavi; la PR del batch non aggiunge essa stessa alcuna
chiave, quindi entrambi i gate correlati sono rimasti silenziosi quando il batch 1 (#13044) è
stato integrato con 43 chiavi mancanti in nove lingue e il batch 2 (#13660) con 10 chiavi mancanti
in otto lingue (2026-09-15). Per correggere un errore, usare
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers`; una chiave foglia
`extra` indica che è stata rimossa dalla sorgente: eliminarla dalla lingua. `--warn` segnala il
problema senza causare un errore. `--catalog=cli` esegue lo stesso confronto su `bin/cli/locales`
(`npm run i18n:check-keys:cli`); entrambi i passaggi si trovano nel job `i18n-ui-coverage`.

#### `check-new-key-coverage` — gate i18n per le nuove chiavi

Correlato a `check-ui-value-drift`. Quest'ultimo rileva un valore inglese che è stato
**riscritto** senza aggiornare le relative traduzioni; questo rileva una chiave inglese che è
stata **aggiunta** senza essere inclusa in alcune lingue.

`check-ui-keys-coverage` non può rilevare questa categoria: impone una soglia percentuale minima
per ogni lingua e undici chiavi mancanti su circa 13.000 lasciano la copertura al 99,9%. Una
percentuale per lingua non può esprimere il concetto «questa funzionalità è stata distribuita
senza traduzione»: un'intera funzionalità può essere introdotta in una nuova lingua senza alcun
testo e senza modificare il valore numerico.

L'incidente che codifica: la fase 3 di Orchestration Canvas ha tradotto le sue undici chiavi nelle
42 lingue esistenti in quel momento. Ore dopo, il batch delle lingue UE (#13044) ha portato il
repository a 51 lingue e le nove nuove arrivate (`el`, `et`, `ga`, `hr`, `lt`, `lv`, `mt`, `sl`,
`sr`) non le hanno mai ricevute. `deepMergeFallback` sostituisce una chiave assente con l'inglese,
quindi la modalità di errore consisteva in un'interfaccia non tradotta anziché vuota: un problema
reale e, per sua natura, silenzioso.

Come il gate correlato, è **consapevole del diff**: confronta l'inglese nella base di merge con
l'albero di lavoro, quindi le lacune preesistenti restano immutate e non è stata necessaria alcuna
migrazione per attivare il gate.

**Un marcatore `__MISSING__:<english>` non lo soddisfa (dal 2026-09-17).** In precedenza era il
rinvio documentato — a runtime viene usato come fallback l'inglese corretto — finché otto PR di
funzionalità, in data 2026-09-16, hanno aggiunto 61 chiavi e inserito il marcatore in tutte le 65
lingue anziché tradurle: questo gate le ha accettate tutte, nulla ha bloccato le PR e il gate
bloccante del rapporto di traduzioni reali ha quindi generato un errore sulla punta del branch di
rilascio per tutti (pt-BR 3,2% > 2,5% + 0,5). Un marcatore viene ora valutato come una traduzione
assente. Per correggere un errore, usare
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers --batch-size=40`, oppure
elaborare tutte le lingue in parallelo con `npm run i18n:translate-new-keys`
(`scripts/i18n/translate-new-keys.sh`, sicuro in modalità detached, rifiuta di avviarsi senza le
variabili di ambiente `OMNIROUTE_TRANSLATION_*`). Una chiave che deve rimanere in inglese (il nome
fisso di un prodotto, motore o flag) va inserita in `scripts/i18n/untranslatable-keys.json`, mai
dietro un marcatore. `vi` vieta del tutto i marcatori
(`tests/unit/i18n-vi-completeness.test.ts`).

#### `check-vitest-exclusions` — gate per i test sospesi

Un file presente nell'elenco `exclude` di `vitest.config.ts` è un test che non viene eseguito e,
per chi esamina l'albero, sembra contribuire alla copertura. Sessantadue file si sono accumulati
dietro il commento `// #8618 — pre-existing failure; remove this exclusion when fixed`. L'issue
#8618 è stata chiusa il 2026-08-11, mentre l'elenco monitorato è cresciuto da 45 a 62 voci,
ciascuna delle quali ereditava un commento che rimandava a un'issue chiusa. Quando infine l'elenco
è stato misurato file per file (#13204), **51 dei 62 test sono passati sull'albero corrente senza
alcuna modifica al codice sorgente**.

Il gate richiede che ogni esclusione corrispondente a un file reale (a) indichi un'issue di
monitoraggio e (b) compaia in `config/quality/vitest-exclusions.json` con il relativo stato
misurato, affinché l'aggiunta sia un diff esaminabile in un file dedicato anziché un'ulteriore
riga in un array di 60 voci. Intenzionalmente, non riesegue i test esclusi: ciò richiede circa
10 minuti ed è compito di un job periodico; l'inventario registra la data dell'ultima misurazione
di ciascun test.
