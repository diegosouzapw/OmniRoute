# Quality Gates Reference (Italiano)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/QUALITY_GATES.md) · 🇪🇹 [am](../../../am/docs/architecture/QUALITY_GATES.md) · 🇸🇦 [ar](../../../ar/docs/architecture/QUALITY_GATES.md) · 🇦🇿 [az](../../../az/docs/architecture/QUALITY_GATES.md) · 🇧🇬 [bg](../../../bg/docs/architecture/QUALITY_GATES.md) · 🇧🇩 [bn](../../../bn/docs/architecture/QUALITY_GATES.md) · 🇨🇿 [cs](../../../cs/docs/architecture/QUALITY_GATES.md) · 🇩🇰 [da](../../../da/docs/architecture/QUALITY_GATES.md) · 🇩🇪 [de](../../../de/docs/architecture/QUALITY_GATES.md) · 🇬🇷 [el](../../../el/docs/architecture/QUALITY_GATES.md) · 🇪🇸 [es](../../../es/docs/architecture/QUALITY_GATES.md) · 🇪🇪 [et](../../../et/docs/architecture/QUALITY_GATES.md) · 🇮🇷 [fa](../../../fa/docs/architecture/QUALITY_GATES.md) · 🇫🇮 [fi](../../../fi/docs/architecture/QUALITY_GATES.md) · 🇫🇷 [fr](../../../fr/docs/architecture/QUALITY_GATES.md) · 🇮🇪 [ga](../../../ga/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [gu](../../../gu/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ha](../../../ha/docs/architecture/QUALITY_GATES.md) · 🇮🇱 [he](../../../he/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [hi](../../../hi/docs/architecture/QUALITY_GATES.md) · 🇭🇷 [hr](../../../hr/docs/architecture/QUALITY_GATES.md) · 🇭🇺 [hu](../../../hu/docs/architecture/QUALITY_GATES.md) · 🇦🇲 [hy](../../../hy/docs/architecture/QUALITY_GATES.md) · 🇮🇩 [id](../../../id/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ig](../../../ig/docs/architecture/QUALITY_GATES.md) · 🇯🇵 [ja](../../../ja/docs/architecture/QUALITY_GATES.md) · 🇬🇪 [ka](../../../ka/docs/architecture/QUALITY_GATES.md) · 🇰🇭 [km](../../../km/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [kn](../../../kn/docs/architecture/QUALITY_GATES.md) · 🇰🇷 [ko](../../../ko/docs/architecture/QUALITY_GATES.md) · 🇱🇹 [lt](../../../lt/docs/architecture/QUALITY_GATES.md) · 🇱🇻 [lv](../../../lv/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ml](../../../ml/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [mr](../../../mr/docs/architecture/QUALITY_GATES.md) · 🇲🇾 [ms](../../../ms/docs/architecture/QUALITY_GATES.md) · 🇲🇹 [mt](../../../mt/docs/architecture/QUALITY_GATES.md) · 🇲🇲 [my](../../../my/docs/architecture/QUALITY_GATES.md) · 🇳🇵 [ne](../../../ne/docs/architecture/QUALITY_GATES.md) · 🇳🇱 [nl](../../../nl/docs/architecture/QUALITY_GATES.md) · 🇳🇴 [no](../../../no/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [or](../../../or/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [pa](../../../pa/docs/architecture/QUALITY_GATES.md) · 🇵🇭 [phi](../../../phi/docs/architecture/QUALITY_GATES.md) · 🇵🇱 [pl](../../../pl/docs/architecture/QUALITY_GATES.md) · 🇵🇹 [pt](../../../pt/docs/architecture/QUALITY_GATES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/QUALITY_GATES.md) · 🇷🇴 [ro](../../../ro/docs/architecture/QUALITY_GATES.md) · 🇷🇺 [ru](../../../ru/docs/architecture/QUALITY_GATES.md) · 🇱🇰 [si](../../../si/docs/architecture/QUALITY_GATES.md) · 🇸🇰 [sk](../../../sk/docs/architecture/QUALITY_GATES.md) · 🇸🇮 [sl](../../../sl/docs/architecture/QUALITY_GATES.md) · 🇷🇸 [sr](../../../sr/docs/architecture/QUALITY_GATES.md) · 🇸🇪 [sv](../../../sv/docs/architecture/QUALITY_GATES.md) · 🇰🇪 [sw](../../../sw/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ta](../../../ta/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [te](../../../te/docs/architecture/QUALITY_GATES.md) · 🇹🇭 [th](../../../th/docs/architecture/QUALITY_GATES.md) · 🇹🇷 [tr](../../../tr/docs/architecture/QUALITY_GATES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/QUALITY_GATES.md) · 🇵🇰 [ur](../../../ur/docs/architecture/QUALITY_GATES.md) · 🇺🇿 [uz](../../../uz/docs/architecture/QUALITY_GATES.md) · 🇻🇳 [vi](../../../vi/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [yo](../../../yo/docs/architecture/QUALITY_GATES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/QUALITY_GATES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/QUALITY_GATES.md)

---

Questo documento è il riferimento autorevole per tutti i gate di qualità CI in OmniRoute.
Descrive ciascun gate, ciò che convalida, il job CI in cui viene eseguito, se utilizza
una baseline ratchet o una policy superato/non superato e se blocca la build o è consultivo.

Per un breve riepilogo e per la policy dell'allowlist, vedere la sezione "Quality Gates & Ratchets"
in `AGENTS.md`. Per la valutazione critica, la classificazione della maturità e il piano di
replicazione indipendente dagli strumenti dello stesso sistema, vedere il
[Manuale dei gate di qualità](../ops/QUALITY_GATE_PLAYBOOK.md).

---

## Inventario dei gate (~90 script)

Gli script si trovano in `scripts/check/` (gate delle policy) e `scripts/quality/` (motore ratchet).
La fonte autorevole per la CI è `.github/workflows/ci.yml`.

### Percorso rapido per le PR di release (`quality.yml`)

`.github/workflows/quality.yml` viene eseguito sulle PR destinate a `release/**`. Consente ai branch
dei collaboratori di avanzare grazie a gate rapidi filtrati per percorso, oltre a un segnale consultivo
della build di produzione per le modifiche al codice:

| Job                                              | Ambito                                                                                                                                                                                                                                     | Bloccante                                                                                                          |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------ |
| `Build (advisory)`                               | PR di codice non in bozza e branch della coda Mergify; Node 24, `npm-ci-retry`, `check:node-runtime`, `npm run build` con `OMNIROUTE_USE_TURBOPACK=1`; nessun caricamento degli artefatti perché nessun job di qualità a valle li utilizza | **Consultivo** (`continue-on-error: true`; rimuovere dopo una settimana di esecuzioni stabili sulle PR di release) |
| `Docs Gates (fast-path)`                         | PR relative a documentazione/codice; riferimenti alla documentazione API e docs-all                                                                                                                                                        | Sì                                                                                                                 |
| `Fast Quality Gates`                             | PR di codice; controlli statici, controllo dei tipi, controllo dei tipi della dashboard, test unitari interessati                                                                                                                          | Sì                                                                                                                 |
| `Forgotten sibling tests`                        | PR di codice; moduli modificati tracciati fino ai consumatori statici e ai test fratelli candidati; i percorsi tramite barrel e import dinamici sono segnalati come diagnostica consultiva, con le relative eccezioni nella allowlist      | **Consultivo**                                                                                                     |
| `Vitest (fast-path)`                             | PR di codice; suite Vitest rapida                                                                                                                                                                                                          | Sì                                                                                                                 |
| `Unit Tests fast-path`                           | PR di codice; suite di test unitari suddivisa in 4 shard                                                                                                                                                                                   | Sì                                                                                                                 |
| `No new ESLint warnings`                         | PR di codice; protezione lint che tiene conto delle soppressioni                                                                                                                                                                           | Sì per le PR dalla stessa origine, consultivo per i fork                                                           |
| `Merge integrity (changelog + generated skills)` | PR non in bozza; sincronizzazione del changelog e delle skill generate                                                                                                                                                                     | Sì per le PR dalla stessa origine, consultivo per i fork                                                           |

#### Report sui test fratelli dimenticati

`npm run check:forgotten-sibling-tests` riutilizza il resolver degli import alla base della mappa
dell'impatto sui test. Per ogni modulo di produzione modificato, segnala catene deterministiche
`modulo/simbolo modificato -> consumatore statico -> test fratello candidato` quando il test
candidato è assente dal diff della pull request. Il riepilogo Markdown e il risultato JSON vengono
conservati come artefatto del workflow `forgotten-sibling-tests` per la calibrazione prima di
qualsiasi introduzione come controllo bloccante.

Le riesportazioni tramite barrel e gli import dinamici sono esclusivamente diagnostiche di
risoluzione; non generano mai un rilievo bloccante. Le eccezioni approvate si trovano in
`config/quality/forgotten-sibling-allowlist.json`. Ogni voce deve indicare il consumatore e il test
candidato, fornire una motivazione specifica e includere il link a una issue o pull request di GitHub.
Le voci non valide causano il fallimento del controllo. Le eccezioni non possono ignorare un test
candidato eliminato o un diff che aggiunge `.skip`/`.todo`; l'indebolimento delle asserzioni e altre
forme di mascheramento restano di competenza del gate `check:test-masking`, che è bloccante in modo
indipendente.

### Job: `lint`

Viene eseguito su ogni PR destinata a `main`. In caso di errore, blocca il merge.

| Script (`npm run ...`)            | Verifica                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Bloccante                                  |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------ |
| `check:node-runtime`              | La versione di Node.js rientra nell'intervallo supportato                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Sì                                         |
| `check:cycles`                    | Importazioni circolari — tutti i moduli in `src/` + `open-sse/`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Sì                                         |
| `check:route-validation:t06`      | Presenza degli schemi Zod su tutte le route (criterio di livello 6)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Sì                                         |
| `check:any-budget:t11`            | Il numero di `@ts-expect-error // any` non supera il limite consentito (controllo di livello 11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Sì                                         |
| `check:provider-consistency`      | Ogni provider in `providers.ts` ha una voce corrispondente in `providerRegistry.ts` (e viceversa, nei limiti dell'allowlist)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Sì                                         |
| `check:model-lifecycle`           | Le tre tabelle di routing gestite manualmente rimangono coerenti con lo snapshot del ciclo di vita incluso nel repository (#11503): `FITNESS_TABLE` (`taskFitness.ts`) non assegna un punteggio ad alcun id ritirato che `REGISTRY` possa instradare; ogni destinazione di `BUILT_IN_ALIASES` è presente in `REGISTRY` e assente dallo snapshot degli id ritirati; ogni id ritirato ancora presente in `REGISTRY` viene inoltrato o elencato in `allowedRetiredInCatalog`; e nessuna origine o destinazione di `DEFAULT_DEGRADATION_MAP` risulta ritirata in tale snapshot. Ciò non dimostra che un modello sia attualmente servito da un upstream attivo. Offline — esegue il confronto con `config/quality/model-lifecycle.json`, aggiornato manualmente con `npm run quality:refresh-model-lifecycle` (rete; non integrato nella CI). `allowedRetiredInCatalog` è un meccanismo di riduzione progressiva: aggiungere una voce solo in presenza di un issue di tracciamento. | Sì                                         |
| `check:fetch-targets`             | Ogni `fetch("/api/...")` in `src/` lato client viene risolto in un file `route.ts` reale                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Sì                                         |
| `check:deps`                      | Tutte le dipendenze installabili con `npm install` in ogni `package.json` del repository sono presenti in `dependency-allowlist.json`; i nuovi pacchetti senza versione bloccata o soggetti a slopsquatting vengono segnalati                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Sì                                         |
| `audit:deps`                      | `npm audit` (root + electron) — nessun avviso di gravità alta/critica (si sovrappone a `check:vuln-ratchet` di osv; vedere il backlog di razionalizzazione)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Sì                                         |
| `check:lockfile`                  | Integrità di `package-lock.json` — registry https, hash di integrità, nessun override dell'host                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Sì                                         |
| `check:licenses`                  | Elenco consentito di licenze SPDX per le dipendenze di produzione                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Sì                                         |
| `check:tracked-artifacts`         | Nessun artefatto di build / collegamento simbolico `node_modules` sottoposto a commit (viene eseguito anche nel pre-commit di husky; il pre-push è intenzionalmente leggero — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Sì                                         |
| `check:vitest-exclusions`         | Ogni esclusione di Vitest indica un issue di tracciamento ed è presente in `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Sì                                         |
| `check:file-size`                 | Nessun file sorgente supera il limite previsto per la relativa estensione (ratchet: file di grandi dimensioni bloccati nell'elenco `frozen`)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Sì                                         |
| `check:error-helper`              | Le risposte di errore negli executor/handler utilizzano `buildErrorBody()` / `sanitizeErrorMessage()` (Regola rigida n. 12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Sì                                         |
| `check:migration-numbering`       | I file SQL di migrazione sono numerati in sequenza, senza numeri mancanti o duplicati                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Sì                                         |
| `check:public-creds`              | Nessun valore letterale OAuth `client_id`/`client_secret` o chiave Web Firebase al di fuori di `publicCreds.ts` (Regola rigida n. 11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Sì                                         |
| `check:db-rules`                  | Nessun SQL grezzo al di fuori dei moduli `src/lib/db/`; nessuna importazione aggregata da `localDb.ts` (Regole rigide n. 2/n. 5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Sì                                         |
| `check:known-symbols`             | Gli esecutori dei provider, le strategie di instradamento e i traduttori registrati nelle rispettive tabelle di dispatch corrispondono ai file presenti su disco: nessun simbolo orfano o non dichiarato                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Sì                                         |
| `check:route-guard-membership`    | Ogni route che genera un processo figlio è classificata da `isLocalOnlyPath()` (Regole rigide n. 15/n. 17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Sì                                         |
| `check:test-discovery`            | Ogni file `*.test.ts` / `*.spec.ts` nel repository viene rilevato da almeno un test runner (meccanismo a cricchetto: l'elenco degli orfani in `test-discovery-baseline.json` può solo ridursi)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Sì                                         |
| `check:agent-skills-sync`         | Gli artefatti agent-skills generati corrispondono al relativo catalogo sorgente (nessuna divergenza)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `check:provider-asset-provenance` | I loghi/gli asset dei provider dispongono di una voce di provenienza registrata                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `lint:json`                       | I file di configurazione JSON vengono analizzati correttamente e soddisfano le regole di linting del repository                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `typecheck:core`                  | Compilazione TypeScript senza errori (solo avvisi consultivi)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Sì                                         |
| `typecheck:noimplicit:core`       | `noImplicitAny` rigoroso — orientato al futuro; molti punti di chiamata preesistenti richiedono ancora annotazioni                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | **Consultivo** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` limitato a `src/app/(dashboard)/**` (#7033) — l'elenco di inclusione selezionato di 27 file di `typecheck:core` non include alcun TSX della dashboard e nemmeno `next build` ne esegue mai il controllo dei tipi (`next.config.mjs` imposta `ignoreBuildErrors: true`), pertanto le regressioni relative a identificatori orfani in tale area (#6625/#6909) erano invisibili alla CI. Confronta con una baseline immutabile del conteggio per file/per codice TS (`config/quality/dashboard-typecheck-baseline.json`, con lo stesso modello di applicazione per elementi obsoleti di `check:known-symbols`) — solo i NUOVI errori oltre il conteggio registrato nella baseline fanno fallire il controllo; abbassare progressivamente la baseline con `--update` quando viene corretto un errore preesistente.                                                                                                                                                           | Sì                                         |

### Processo: `quality-gate`

Viene eseguito dopo `test-coverage`. In caso di errore, blocca il merge.

| Script                       | Verifica                                                                                                                                                                                                     | Bloccante                |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------ |
| `quality:collect`            | Genera `quality-metrics.json` (numero di avvisi ESLint, copertura dal report combinato degli shard)                                                                                                          | Sì (a monte del ratchet) |
| `quality:ratchet`            | Ogni metrica in `quality-baseline.json` non è peggiorata (avvisi ESLint ≤ baseline; copertura ≥ baseline)                                                                                                    | Sì                       |
| `check:duplication`          | La duplicazione del codice (jscpd@4) non supera la baseline in `quality-baseline.json`                                                                                                                       | Sì                       |
| `check:complexity`           | La complessità ciclomatica a livello di file non supera il limite (`complexity` di ESLint core + `max-lines-per-function`)                                                                                   | Sì                       |
| `check:cognitive-complexity` | Ratchet della complessità cognitiva (`eslint-plugin-sonarjs`) — passaggio ESLint separato; la CI esegue entrambi, combinati nell'unico passaggio `check:complexity-ratchets`                                 | Sì                       |
| `check:dead-code`            | Il ratchet di esportazioni/file inutilizzati (knip) non peggiora rispetto alla baseline                                                                                                                      | Sì                       |
| `check:compression-budget`   | Budget del benchmark di compressione — le soglie minime di risparmio dei token per motore non devono peggiorare                                                                                              | Sì                       |
| `check:type-coverage`        | Il ratchet della percentuale di codice tipizzato (`type-coverage`) non peggiora; sostituisce in gran parte `typecheck:noimplicit:core`                                                                       | Sì                       |
| `check:codeql-ratchet`       | Il numero di avvisi CodeQL aperti non peggiora (lettura tramite `gh api`; omissione controllata senza token) — per la frequenza di aggiornamento e l'attivazione manuale, vedere "Ratchet CodeQL" di seguito | Sì                       |

### Processo: `quality-extended`

L'intero job è consultivo (`continue-on-error: true`). I controlli progressivi basati su npm vengono eseguiti
effettivamente; gli scanner esterni vengono installati tramite `gh release download` e si ignorano autonomamente (exit 0)
quando un binario risulta ancora assente.

| Script                   | Verifica                                                                                                                                                                                                                | Bloccante      |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `check:circular-deps`    | Assenza di dipendenze circolari (dpdm)                                                                                                                                                                                  | **Consultivo** |
| `check:bundle-size`      | La dimensione del bundle non supera il limite                                                                                                                                                                           | **Consultivo** |
| `check:secrets`          | Scansione dei segreti (gitleaks) — viene ignorata se il binario è assente                                                                                                                                               | **Consultivo** |
| `check:vuln-ratchet`     | Le vulnerabilità delle dipendenze (osv-scanner) non aumentano — viene ignorato se il binario è assente                                                                                                                  | **Consultivo** |
| `check:workflows`        | Lint dei workflow (actionlint + zizmor) — viene ignorato se i binari sono assenti                                                                                                                                       | **Consultivo** |
| `check:openapi-breaking` | Modifiche incompatibili al contratto dell'API pubblica (`openapi.yaml`) rispetto al branch di base (oasdiff) — emette `openapiBreaking=N`; viene ignorato se oasdiff è assente o la specifica di base non è risolvibile | **Consultivo** |

### Job: `docs-sync-strict`

Viene eseguito per ogni PR verso `main`. Blocca il merge in caso di errore.

| Script                         | Verifica                                                                                                                                                                                                        | Bloccante                        |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- |
| `check:docs-all`               | Meta-gate che esegue in sequenza i 6 sotto-gate riportati di seguito                                                                                                                                            | Sì                               |
| ↳ `check:docs-sync`            | Coerenza delle versioni tra CHANGELOG / OpenAPI / llm.txt                                                                                                                                                       | Sì                               |
| ↳ `check:docs-counts`          | I conteggi nel testo (numero di provider, numero di migrazioni e così via) rientrano nella finestra progressiva dei conteggi reali                                                                              | Sì                               |
| ↳ `check:env-doc-sync`         | Ogni variabile d'ambiente in `.env.example` è documentata in una tabella della documentazione e viceversa                                                                                                       | Sì                               |
| ↳ `check:deprecated-versions`  | Nessuna stringa di versione deprecata nella documentazione                                                                                                                                                      | Sì                               |
| ↳ `check:doc-links`            | I link Markdown interni nella documentazione si risolvono in file reali (forma `[testo]`/`(percorso)`)                                                                                                          | Sì                               |
| ↳ `check:fabricated-docs`      | Le route, le variabili d'ambiente, i comandi CLI, i nomi degli hook e i percorsi di file citati nella documentazione esistono nel codebase. Gate rigido tramite `--strict`; errore non bloccante senza il flag. | Sì (tramite `--strict` nella CI) |
| `check:cli-i18n`               | Le stringhe dei comandi CLI sono presenti in tutti i file delle locale i18n                                                                                                                                     | Sì                               |
| `check:openapi-coverage`       | La specifica OpenAPI copre almeno una soglia minima progressiva delle route reali                                                                                                                               | Sì                               |
| `check:openapi-security-tiers` | Le annotazioni dei livelli di sicurezza in `openapi.yaml` sono coerenti con le classificazioni di `routeGuard.ts`                                                                                               | **Consultivo**                   |
| `check:openapi-routes`         | Ogni percorso in `openapi.yaml` si risolve in un `route.ts` reale (anti-allucinazione)                                                                                                                          | Sì                               |
| `check:docs-symbols`           | Ogni riferimento `/api/...` in `docs/**/*.md` si risolve in un `route.ts` reale (anti-allucinazione)                                                                                                            | Sì                               |
| `i18n translation drift`       | Chiavi non tradotte nei file delle locale i18n — solo avviso                                                                                                                                                    | **Consultivo**                   |

### Job: `i18n-ui-coverage`

| Script                            | Verifica                                                                                                                                                                                                                              | Bloccante      |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `check-ui-keys-coverage` (inline) | La copertura delle chiavi i18n dell'interfaccia utente è ≥ 65%                                                                                                                                                                        | Sì             |
| `check-ui-value-drift` (inline)   | La riscrittura di un **valore** inglese non lascia traduzioni obsolete                                                                                                                                                                | Sì             |
| `check-new-key-coverage` (inline) | Una **nuova** chiave inglese è tradotta in ogni impostazione locale — un marcatore `__MISSING__:` viene rifiutato                                                                                                                     | Sì             |
| `check-translation-ratio`         | Il rapporto di traduzioni reali per impostazione locale (valori identici all'inglese / segnaposto / elementi mancanti al di fuori dell'elenco consentito) non deve superare `config/quality/i18n-translation-baseline.json` + margine | **Consultivo** |

Richiede `fetch-depth: 0` — il controllo della divergenza dei valori confronta `en.json` con la base di merge.

#### `check-ui-value-drift` — controllo delle traduzioni obsolete

Rileva l'unica regressione i18n che gli altri controlli, per loro struttura, non possono individuare: un valore inglese
viene riscritto e le traduzioni derivate dall'inglese _precedente_ rimangono invariate, perciò
gli utenti non anglofoni continuano a leggere un testo formulato con sicurezza ma ormai errato.

È successo davvero in produzione. `oauthModal.googleOAuthWarning` è stato riscritto quando è stato introdotto
l'helper di accesso Antigravity (#5203); **39 delle 43 impostazioni locali** hanno mantenuto il testo che indicava agli operatori di «copiare
l'URL completo e incollarlo qui sotto» — un flusso che non può essere completato per quel provider. Il problema è
passato inosservato fino alla #8463 perché:

- `sync-ui-keys` aggiunge solo le chiavi **assenti**, mai quelle **obsolete**;
- `check-ui-keys-coverage` conta la _presenza_ delle chiavi, quindi una traduzione obsoleta viene considerata coperta;
- `check-translation-drift` tiene traccia delle copie della documentazione in `docs/i18n/<locale>/**.md` —
  non legge mai `src/i18n/messages/*.json`. Bloccante nel job `docs-sync-strict` dalla
  risincronizzazione 2026-09: modifica un documento principale → `npm run i18n:run -- --files=<doc>` (a livello di sezione, poco costoso).

**Basato sulle differenze, non su una baseline.** Confronta `en.json` nella base di merge con l'albero di lavoro;
per ogni chiave il cui valore inglese è cambiato, qualsiasi impostazione locale che mantenga ancora una
traduzione non modificata è obsoleta. Ciò **congela intenzionalmente il debito preesistente** — una differenza
non può rivelare da quale vecchio testo inglese derivi una traduzione esistente da tempo, quindi il controllo valuta
solo ciò che viene modificato dalla modifica corrente. L'alternativa (una baseline di hash per chiave) richiederebbe
un file generato di circa 600 KB, tre volte più grande della maggiore baseline esistente, con variazioni a ogni PR i18n.

Esistono due modi per soddisfare il controllo:

1. aggiornare le traduzioni interessate, oppure
2. impostarle su `__MISSING__:<new english>` — il runtime fornisce quindi l'inglese corretto
   (`src/i18n/request.ts::deepMergeFallback`, #7258) e la chiave viene accodata per la traduzione.

Se il **significato** della stringa è cambiato, è preferibile **rinominare la chiave**: una nuova chiave non può ereditare
una traduzione obsoleta. Questo è il modello utilizzato dalla #8463.

```bash
npm run i18n:check-value-drift          # modalità rigorosa (quella eseguita dalla CI)
npm run i18n:check-value-drift:warn     # solo segnalazione
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Termina con codice 0 e `SKIP reason=base-unresolved` quando il catalogo di base non può essere letto (clone
superficiale senza il riferimento di base), analogamente a `check-openapi-breaking`.

### Job: `i18n`

Matrice completa di convalida i18n (un job per impostazione locale). L'intero job è consultivo.

| Script                          | Verifica                                             | Bloccante                                                  |
| ------------------------------- | ---------------------------------------------------- | ---------------------------------------------------------- |
| `validate_translation.py quick` | Completezza della traduzione per impostazione locale | **Consultivo** (`continue-on-error: true` sull'intero job) |

### Job: `pr-test-policy`

Viene eseguito solo sulle pull request.

| Script                 | Verifica                                                                                                                                                                          | Bloccante |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| `check:pr-test-policy` | Le PR che modificano il codice di produzione in `src/`, `open-sse/`, `electron/` o `bin/` devono includere o aggiornare i test (Regola vincolante n. 8)                           | Sì        |
| `check:test-masking`   | I file di test modificati non riducono il numero netto di asserzioni né aggiungono tautologie `assert.ok(true)`                                                                   | Sì        |
| `check:pr-evidence`    | Il corpo della PR cita prove di test/VPS per la modifica (automatizza la Regola vincolante n. 18 cercando corrispondenze nel testo della PR — fragile, vedere Attività arretrate) | Sì        |

### Job: `test-vitest`

Viene eseguito dopo `build`. In caso di errore, blocca il merge.

| Suite            | Valida                                                       | Bloccante                                                                                                                      |
| ---------------- | ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------ |
| `test:vitest`    | Server MCP (110 strumenti), autoCombo, cache — runner vitest | Sì                                                                                                                             |
| `test:vitest:ui` | Test dei componenti UI — runner vitest                       | **Bloccante** — gli errori preesistenti sono esplicitamente esclusi in `vitest.config.ts`; i nuovi errori fanno fallire il job |

### Workflow notturni (pianificati, consultivi)

Vengono eseguiti secondo una pianificazione cron (e tramite `workflow_dispatch`), mai sulle PR. Sono tutti consultivi.

| Workflow               | Valida                                                                                                                                                                               | Bloccante      |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------- |
| `nightly-property`     | Test basati sulle proprietà con fast-check, un seed casuale e un numero elevato di esecuzioni                                                                                        | **Consultivo** |
| `nightly-resilience`   | Controllo della crescita dell'heap, iniezione di guasti caotici, test di carico/soak con k6                                                                                          | **Consultivo** |
| `nightly-llm-security` | Protezione dalle injection con promptfoo (modalità di blocco) + probe garak (ignorati senza un secret del provider)                                                                  | **Consultivo** |
| `nightly-schemathesis` | Fuzzing del contratto OpenAPI (schemathesis) su un'istanza OmniRoute attiva usando `docs/openapi.yaml` — evidenzia violazioni delle specifiche / errori 500 non gestiti (Fase 8 B.4) | **Consultivo** |
| `nightly-mutation`     | Punteggio dei test di mutazione Stryker sul percorso rapido dei test unitari — i mutanti sopravvissuti evidenziano assert deboli                                                     | **Consultivo** |
| `nightly-compat`       | Matrice di compatibilità del motore Node per gli intervalli `engines.node` supportati                                                                                                | **Consultivo** |

---

## Fase di velocità (2026-08-30 → v4.0 LTS): ogni baseline è stata allentata del 20%

Decisione del responsabile (2026-08-30): fino alla modularizzazione della v4.0, la velocità di rilascio conta più
del contenimento del debito. Ogni baseline **numerica** del ratchet è stata allentata del 20% in un unico
passaggio verificabile e la fase è dichiarata in `config/quality/quality-baseline.json`:

```json
"_policy": { "phase": "velocity", "since": "2026-08-30", "until": "4.0.0",
             "relaxPct": 20, "requireTighten": false }
```

| Cosa è cambiato                                                                                                                                                                                                                                                    | Dove                                                                                                      |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------- |
| `metrics.*.value` — conteggi in cui un valore inferiore è migliore ×1.2, percentuali in cui un valore superiore è migliore ÷1.2 (soglia minima di copertura mantenuta a 60, `eslintErrors` resta 0, `eslintWarnings` 0 → 20% del numero di soppressioni congelato) | `quality-baseline.json` (la nota `_relax_velocity_2026_08_30` elenca ogni valore precedente → successivo) |
| `count` ×1.2 / `percentage` ×1.2                                                                                                                                                                                                                                   | `complexity-baseline.json`, `duplication-baseline.json`                                                   |
| `cap`, `testCap`, limite di righe di ogni `frozen[*]` / `testFrozen[*]` ×1.2                                                                                                                                                                                       | `file-size-baseline.json`                                                                                 |
| conteggi per file / per codice TS ×1.2                                                                                                                                                                                                                             | `api-typecheck-baseline.json`, `dashboard-typecheck-baseline.json`, `open-sse-typecheck-baseline.json`    |
| `THRESHOLD` 36 → 30                                                                                                                                                                                                                                                | `scripts/check/check-openapi-coverage.mjs`                                                                |
| `--require-tighten` diventa consultivo quando `_policy.requireTighten === false`                                                                                                                                                                                   | `scripts/quality/check-quality-ratchet.mjs`                                                               |
| il processo notturno `bank-ratchet-shrinks` viene sospeso (registrerebbe la riduzione misurata e annullerebbe il margine disponibile)                                                                                                                              | `.github/workflows/nightly-release-green.yml`                                                             |

Le allowlist (`eslint-suppressions.json`, `test-masking-allowlist.json`, `test-discovery-baseline.json`,
…) **non** sono budget e non sono state modificate. I gate delle policy superato/non superato (segreti, regole SQL,
contratto docs/env, parità i18n, unit test) rimangono invariati: un test rosso resta un test rosso.

**Strumenti**

- `npm run quality:relax-baselines -- --pct 20 --note velocity_YYYY_MM_DD [--dry-run]` — l'allentamento
  una tantum (`scripts/quality/relax-baselines.mjs`); rifiuta di essere eseguito due volte con la
  stessa nota.
- `npm run quality:headroom [-- --only deadExports,fileSize] [--json out.json --md out.md]` —
  misura ogni gate numerico nello stesso modo della CI e mostra il margine rimanente per ciascun gate
  (`scripts/quality/baseline-headroom.mjs`). Il job notturno `baseline-headroom` pubblica la
  tabella nell'issue attiva **📈 Margine delle baseline (fase di velocità)** e aggiunge l'etichetta
  `headroom-alert` quando un gate si trova entro il 10% dal proprio limite o lo ha già superato. Tale issue
  funge da preallarme: un budget che si esaurisce in pochi giorni indica che l'allentamento viene consumato da
  poche PR, non dall'intero team — controllare le note `_rebaseline_*` del gate interessato.

**Modalità nuovo codice (Clean-as-You-Code) — dal 2026-08-30, solo percorso rapido delle PR**

Negli eventi `pull_request`, `quality.yml` passa `--base-ref <PR base SHA>` a `check:file-size`,
`check:complexity-ratchets` e `check:dead-code`. In questa modalità, il gate confronta HEAD con la
merge-base **limitatamente ai file modificati dalla PR** (`scripts/check/newCodeMode.mjs`: la
merge-base viene materializzata in un `git worktree` temporaneo, ESLint/knip vengono eseguiti lì e su HEAD, quindi
vengono calcolate le differenze dei conteggi per file):

- **bloccante** — la PR ha aggiunto violazioni di complessità ciclomatica/cognitiva o export inutilizzati nei file che ha modificato
  (`complexityNewCode=`, `cognitiveComplexityNewCode=`, `deadExportsNewCode=` nel log);
- **consultivo** — il totale globale rispetto alla baseline congelata. La deriva ereditata non rende mai rossa una
  PR non responsabile; la deriva viene nuovamente congelata durante la riconciliazione della release e monitorata dal job relativo al margine.

Le esecuzioni `workflow_dispatch`, la verifica release-green e il job notturno relativo al margine non dispongono di una base PR
e mantengono il confronto assoluto (globale). Copertura, duplicazione e copertura dei tipi rimangono globali
per ora (i relativi strumenti non producono una differenza per file in modo economico) — sono candidati allo stesso trattamento.

**Chiusura della fase con la v4.0 (LTS = più restrittiva di prima, non un semplice "ritorno alla normalità")**

1. Sulla punta pulita di `release/v4.0.0`: eseguire `npm run quality:headroom --json` per registrare i valori, quindi
   `npm run quality:ratchet -- --update`, `check:file-size --update`,
   `check:complexity-ratchets --update`, `check:dead-code --update` e
   `--update` per ogni gate di typecheck: ogni baseline scende al valore misurato.
2. Eliminare `_policy` da `quality-baseline.json` (riattiva `--require-tighten` e
   l'accantonamento notturno), ripristinare `THRESHOLD = 36` (o un valore superiore) in `check-openapi-coverage.mjs`.
3. Rendere i limiti più restrittivi rispetto ai valori misurati nei punti in cui la modularizzazione ha dato risultati: riportare il `cap` della dimensione dei file a 1000
   (o 800), aumentare di 5 le soglie minime di copertura, impostare a 0 gli export inutilizzati per i pacchetti modularizzati.

## Baseline ratchet (`quality-baseline.json`)

Il motore ratchet (`scripts/quality/check-quality-ratchet.mjs`) legge `quality-baseline.json`
e lo confronta con il file `quality-metrics.json` appena generato. Qualsiasi metrica che regredisca
oltre il proprio epsilon causa il fallimento della build.

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

Il flag `--update` scrive i valori attualmente misurati in `quality-baseline.json`.
Esegui il commit di questo file insieme alla modifica che ha migliorato la metrica. Una PR che migliora una
metrica senza aggiornare la baseline verrà rilevata da `--require-tighten` (Fase 6A.5,
implementazione in sospeso).

### Ratchet CodeQL: frequenza di aggiornamento e attivazione manuale

`check:codeql-ratchet` legge **lo stato del repository, aggiornato in base a una pianificazione, non per ogni PR.**
`gh api repos/diegosouzapw/OmniRoute/code-scanning/default-setup` restituisce
`state: configured`, `schedule: weekly`: si tratta della scansione con configurazione predefinita di GitHub, non di un'analisi
a ogni push. Conseguenza: dopo il merge di una PR che CORREGGE gli avvisi, il ratchet continua a leggere
il conteggio precedente, più elevato, fino all'esecuzione della successiva scansione pianificata; pertanto segnala una regressione
su ogni PR aperta, inclusi i follow-up della stessa PR correttiva, finché la scansione non si aggiorna.

**Aggiornamento manuale**: `gh workflow run codeql.yml --ref release/vX.Y.Z` esegue nuovamente
l'analisi e ripubblica gli avvisi entro pochi minuti. Leggi prima `.github/workflows/codeql.yml`:
la sua intestazione spiega che è limitato a `workflow_dispatch` **perché è in conflitto con
la "configurazione predefinita" di GitHub** (`CodeQL analyses from advanced configurations cannot be
processed when the default setup is enabled`). Il ripristino dei trigger `push`/`pull_request`/
`schedule` richiede prima un'**azione del proprietario**: Settings → Code security →
CodeQL: Default → Advanced. Non aggiungere un trigger `schedule:` senza aver effettuato tale passaggio:
produrrebbe soltanto esecuzioni non riuscite.

**Restringi la baseline dopo la diminuzione del conteggio**: `node scripts/check/check-codeql-ratchet.mjs
--update` scrive il nuovo conteggio misurato in `quality-baseline.json` →
`metrics.codeqlAlerts.value`, in modo che il ratchet non consenta silenziosamente una regressione fino
al vecchio limite massimo. Esempio concreto (2026-09-02/03): la PR #12502 ha corretto 7 avvisi reali
(da 13 a 6 aperti misurati); la PR #12530 ha ristretto la baseline congelata da 11 a 6 affinché corrispondesse;
i 6 rimanenti sono stati quindi ignorati, ciascuno con la relativa giustificazione, portando a 0 gli avvisi aperti.

**La decisione di ignorare gli avvisi spetta all'operatore (Regola inderogabile #14)**: non ignorare mai un avviso CodeQL
senza registrare la giustificazione tecnica nel commento di archiviazione: `won't fix` per
un requisito di un protocollo upstream, `used in tests` per una fixture di test, `false positive`
per un meccanismo di sanitizzazione che CodeQL non è in grado di rilevare (precedente: `docs/security/ERROR_SANITIZATION.md`).

---

## Policy di ripetizione dei test (WS5.4, v3.8.49)

La ripetizione è definita per singolo runner, mai come regola globale indiscriminata: una ripetizione indiscriminata trasforma le regressioni reali
in flake invisibili:

| Runner           | Policy                                                                                                                                                         | Motivo                                                                                                                                                      |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Playwright (e2e) | `retries: 1` solo in CI, con `trace: on-first-retry`                                                                                                           | Le tempistiche del browser e della rete sono realmente non deterministiche; una ripetizione con una traccia trasforma un flake in un artefatto analizzabile |
| Vitest           | NESSUNA ripetizione globale. Un test di comprovata instabilità riceve una ripetizione esplicita per test (visibile nel diff e sottoposta a revisione nella PR) | Mantiene l'elenco di quarantena nel repository, mai opaco                                                                                                   |
| node:test (unit) | NESSUNA ripetizione, mai                                                                                                                                       | Un test unitario instabile è un bug nel test: va corretto, non eseguito di nuovo                                                                            |

SLO obiettivo una volta disponibile la telemetria sui flake (WS5.2/5.3): tasso di flake <1% per test
(soglia "correggere subito"), tasso di superamento ≥95% per pipeline. Valori di riferimento del settore:
ricalibrare in base alle nostre misurazioni.

## Deriva dei ratchet a livello di release (WS5.5, v3.8.49)

Quando un ratchet (dimensione dei file, complessità, avvisi eslint) regredisce sulla punta PURA della release,
ossia è la COMBINAZIONE dei merge ad averlo fatto regredire e nessuna singola PR riproduce la
regressione sul proprio branch, la correzione spetta al **responsabile della release, una sola volta, sul
branch di release**: preferire l'estrazione/refactoring; ridefinire la baseline solo con la voce di
giustificazione documentata. Non scaricare mai la deriva combinata sulla PR di un contributore e non
ridefinire mai la baseline per singola PR (ciò nasconde le regressioni reali). Prima distinguere i casi:
riprodurre l'errore rispetto alla punta pura in un worktree di verifica prima di presumere che sia stato
causato dalla propria PR.

## Registrare le riduzioni dei ratchet — la direzione discendente (#8584)

Il ratchet è automatico solo a metà, e nella metà sbagliata. **Aumentare** un limite è una
modifica manuale al JSON che richiede dieci secondi ed è il modo più rapido per sbloccare una PR non riuscita.
**Ridurne** uno richiede che qualcuno esegua `--update` e ne esegua il commit; e finché
non è stato introdotto il job `bank-ratchet-shrinks`, nessun workflow lo eseguiva. La conseguenza misurata
(2026-07-25): 18 file congelati già pari o inferiori al limite di 800 righe per i nuovi file, con il caso peggiore
a 132× (`src/shared/validation/schemas.ts`, 19 righe con un limite di 2.523); il
limite massimo di complessità è passato da `1794 → 2169` nel corso di ~37 note di ridefinizione della baseline, con una sola
riduzione (−1); e "restringere tramite `--update` nel prossimo ciclo" è stato scritto 31 volte e rispettato
una sola volta. Un limite che sopravvive al codice che lo aveva giustificato trasforma silenziosamente
ogni decomposizione completata in un margine di crescita per chiunque modifichi successivamente il file.

`nightly-release-green.yml` → il job **`bank-ratchet-shrinks`** chiude questo ciclo:

|             |                                                                                                                       |
| ----------- | --------------------------------------------------------------------------------------------------------------------- |
| Esecuzione  | `schedule` (3×/giorno) + `workflow_dispatch` — deliberatamente **non** `push`                                         |
| Misurazione | il `release/vX.Y.Z` più alto, con la stessa risoluzione e la stessa protezione dall'iniezione di `release-green`      |
| Scrittura   | `check:file-size --update` e `check:complexity-ratchets --update` (entrambi esclusivamente riduttivi per costruzione) |
| Verifica    | `npm run check:ratchet-bank` (`scripts/quality/verify-ratchet-bank.mjs`)                                              |
| Consegna    | un'unica PR sempre aggiornata verso il branch di release, aggiornata forzatamente e senza mai generare spam           |

La registrazione viene eseguita in batch anziché a ogni push perché non ha requisiti di latenza (una riduzione
registrata entro 8 ore è accettabile), mentre un'esecuzione per ogni merge ricostruirebbe ripetutamente il branch della PR
durante le campagne di merge e comporterebbe ogni volta il costo di una scansione ESLint completa. Il rilevamento resta
attivo al push (`release-green`); solo la registrazione avviene in batch.

### Il verificatore di sicurezza

Il job scrive sulle baseline senza supervisione, quindi `verify-ratchet-bank.mjs` è ciò che rende
accettabile questa operazione. Confronta tramite diff l'albero successivo a `--update` con `HEAD` e **interrompe il job
prima che esista qualsiasi commit**, senza aprire alcuna PR, a meno che ogni modifica non sia una delle seguenti:

- una voce numerica `frozen` / `testFrozen` **ridotta** o **rimossa**
- `complexity-baseline.json` → `count` **ridotto**
- `quality-baseline.json` → `metrics.cognitiveComplexity.value` **ridotto**

Qualsiasi altra modifica causa un errore: aumentare un numero, aggiungere una voce, modificare `cap`/`testCap` oppure
eliminare/riscrivere una nota `_rebaseline_*` (queste note costituiscono la traccia di audit del motivo per cui ogni
limite esiste e sono archiviate nello stesso oggetto `frozen` delle voci dei file).
Un bot in grado di aumentare un limite sarebbe nettamente peggiore dello status quo. Protezione dalle
regressioni: `tests/unit/verify-ratchet-bank.test.ts`.

Il job non esegue mai il push verso `release/*`: una persona esegue il merge della PR, quindi una misurazione errata
non può essere integrata senza revisione.

## Policy delle allowlist

Ogni gate che non può fallire a causa di violazioni preesistenti utilizza un'allowlist bloccata
(ad es., `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`). La policy è:

**Correggi la causa principale; usa l'allowlist solo quando la violazione è preesistente e
non può essere corretta nella stessa PR.**

Quando aggiungi una voce a un'allowlist:

1. Includi un commento con la motivazione.
2. Fai riferimento all'issue di tracciamento (ad es., `// #3498 — Funzionalità della Fase 2, non ancora implementata`).
3. Rimuovi la voce nella stessa PR che corregge la violazione: una voce obsoleta che non
   sopprime più una violazione attiva costituisce essa stessa un difetto (il controllo delle
   regole obsolete 6A.3 farà fallire il gate in presenza di una voce orfana nell'allowlist,
   una volta implementato).

**Non** aggiungere voci all'allowlist per far passare i test più velocemente. Un gate verde con
un'allowlist in continua crescita dà un falso senso di qualità.

### Quando un gate fallisce sulla tua PR

1. **Leggi attentamente l'output del gate**: indica esattamente quale file o simbolo ha violato
   la regola.
2. **Correggi la violazione**: la maggior parte dei gate consiste in controlli deterministici del filesystem che passano non appena
   il codice è corretto.
3. **Se la violazione è preesistente** (ovvero non l'hai introdotta tu, ma ora il gate
   la rileva): aggiungi una voce all'allowlist con un commento che ne spieghi la motivazione e un'issue di tracciamento.
4. **Se il gate è un ratchet** (copertura, avvisi ESLint, duplicazione, complessità):
   la tua modifica ha peggiorato la metrica. Correggi il problema sottostante oppure, in casi rari, esegui
   `npm run quality:ratchet -- --update` se la modifica è intenzionale e il peggioramento
   della metrica è accettabile, ma documentane il motivo nella descrizione della PR.
5. **I gate consultivi** (`continue-on-error: true`) sono informativi: non bloccano
   il merge, ma compaiono nel riepilogo della CI. Correggili comunque.

---

## Aggiunta di un nuovo gate

1. Crea `scripts/check/check-<name>.mjs` (o `.ts`). I gate di policy terminano con codice 0/1.
   I gate di tipo ratchet emettono una metrica in `quality-metrics.json` tramite `collect-metrics.mjs`.
2. Aggiungi `"check:<name>": "node scripts/check/check-<name>.mjs"` a `package.json`.
3. Collegalo in `.github/workflows/ci.yml` sotto il job appropriato
   (policy → `lint` o `docs-sync-strict`; ratchet → `quality-gate`).
4. Se dispone di un'allowlist, applica `reportStaleEntries()` da
   `scripts/check/lib/allowlist.mjs` affinché le voci obsolete vengano rilevate automaticamente.
5. Scrivi un test in `tests/unit/build/` che copra la logica di rilevamento del gate.
6. Aggiorna questo documento (aggiungi una riga alla tabella del job pertinente).

---

## Strumenti per agenti: LSP-in-the-loop (facoltativo)

Oltre ai gate della CI, OmniRoute include uno scaffold `agent-lsp` **facoltativo**
(un `.mcp.json` a livello di progetto, Fase 7 Task 15). Crea `.mcp.json`
per esporre un server del linguaggio TypeScript agli agenti di programmazione, in modo che risolvano simboli /
diagnostica **prima** di scrivere codice: un complemento a `typecheck:core` basato sulla compilazione preventiva,
che elimina alla fonte gli errori di "simboli inventati". Intenzionalmente non viene
caricato automaticamente (sei tu a scegliere e verificare il bridge MCP↔LSP); una voce non valida registra soltanto un
errore di connessione e non interrompe mai le sessioni.

---

## Backlog di razionalizzazione (revisione ROI — Fase 9 Onda 3)

Questo inventario è stato riconciliato con `ci.yml` il 2026-06-17 (la versione precedente ometteva
`audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`,
`check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`,
`check:codeql-ratchet`, `check:pr-evidence`). Una revisione del ROI dell'insieme riconciliato
ha individuato i seguenti candidati alla razionalizzazione. **Le unificazioni sono modifiche
meccaniche alla CI; le promozioni/rimozioni sono decisioni di policy riservate all'operatore.**
Nulla di quanto segue è stato ancora applicato.

**Inoltre non documentati sopra** (consultivi, segnale debole): il job `docs-lint`
(markdownlint + Vale, intero job con `continue-on-error`) e i workflow autonomi degli scanner
`semgrep.yml` / `codeql.yml` / `scorecard.yml`. `semgrepFindings: 0` è presente in
`quality-baseline.json`, ma non è collegato a un meccanismo di ratchet bloccante in `ci.yml` — la metrica è
attualmente orfana.

### Unificazione / deduplicazione (meccanica, rischio inferiore)

Ogni candidato è stato convalidato rispetto allo stato effettivo dei gate il 2026-06-17 (fidarsi, ma verificare);
diverse unificazioni "ovvie" si sono rivelate nascondere debito e **non** sono sostituzioni dirette sicure.

- **`check:docs-sync` viene eseguito due volte** — autonomamente nel job `lint` e di nuovo all'interno di `check:docs-all` (`docs-sync-strict`) e dell'hook pre-commit di husky. ✅ **FATTO** — rimossa l'esecuzione autonoma in `lint`.
- **Scansione CVE** — ❌ **NON è un'unificazione pulita.** `audit:deps` genera un errore bloccante per qualsiasi CVE alta/critica; `check:vuln-ratchet` (osv) fallisce solo in caso di _regressione_ rispetto alla baseline (attualmente 1 MODERATE). Semantiche differenti — la rimozione di `audit:deps` eliminerebbe il gate assoluto per le vulnerabilità alte/critiche. Mantenerli entrambi.
- **Rilevamento dei cicli** — ❌ **NON è un'unificazione pulita.** `check:circular-deps` (dpdm) segnala **91 cicli** (motivo per cui è consultivo); non può essere promosso a bloccante senza prima risolverli e ha un ambito più ampio rispetto al `check:cycles`, selettivo e senza errori. Mantenere `check:cycles` bloccante; la risoluzione dei 91 cicli dpdm costituisce un backlog separato.
- **Complessità** — ✅ **FATTO** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): un'unica scansione ESLint, con conteggi per ruleId affinché le baseline ciclomatica+max-lines e cognitiva rimangano indipendenti; i singoli `check:complexity` / `check:cognitive-complexity` restano disponibili per l'esecuzione locale con `--update`.
- **Anti-allucinazione per `/api`** — ✅ **FATTO** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): un unico inventario FS di `src/app/api`; openapi-routes + docs-symbols continuano a produrre report indipendenti; i controlli individuali restano disponibili per le esecuzioni locali.
- **`check:node-runtime` viene eseguito in 11 job** — ⚠️ **ROI basso.** Ciascuno usa un runner separato e il controllo richiede <1s; risparmio totale di ~10s, a fronte della perdita di una protezione economica per ogni job. Non vale la complessità della modifica.
- **`typecheck:noimplicit:core` nel lint della CI** — ✅ **rimosso dal job lint** (era consultivo con `continue-on-error`); la superficie dei tipi bloccante è `typecheck:core` + `check:type-coverage`. Script locale mantenuto.

### Promozione / decisione (policy dell'operatore)

- `check:openapi-security-tiers` (consultivo) — ❌ **NON può essere promosso direttamente.** Termina con codice 0, ma avverte che diverse route di `traffic-inspector` incluse in `LOCAL_ONLY_API_PREFIXES` non dispongono dell'annotazione `x-loopback-only: true`. Per renderlo obbligatorio è necessario aggiungere prima tali annotazioni a `openapi.yaml`.
- `typecheck:noimplicit:core` (consultivo) — in gran parte ricompreso nel ratchet bloccante `check:type-coverage`. Convertirlo in un ratchet oppure rimuovere il secondo passaggio `tsc` ridondante.
- `test:vitest:ui` (ora **bloccante**) — gli errori preesistenti sono esplicitamente esclusi in `vitest.config.ts` tramite commenti di tracciamento `// #8618`; i nuovi errori causano il fallimento del job.
- `check:secrets` (gitleaks, ratchet bloccante fissato a 3 falsi positivi documentati) — aggiungere i 3 elementi all'allowlist per arrivare a 0, oppure declassarlo a consultivo. Si sovrappone alla scansione nativa dei segreti di GitHub + `check:public-creds`.
- `check:pr-evidence` (bloccante, esegue grep sul testo del corpo della PR) — alto rischio di falsi positivi; rimuoverlo indebolirebbe l'applicazione della Hard Rule #18, quindi si tratta di una vera decisione di policy.
- `semgrep` (autonomo e consultivo) — si sovrappone a CodeQL per le famiglie OWASP; collegare la sua baseline a un ratchet oppure rimuoverlo.

---

## Documentazione correlata

- Supply chain (provenienza, SBOM, Trivy, Scorecard): [`docs/security/SUPPLY_CHAIN.md`](../security/SUPPLY_CHAIN.md)

#### `check-key-completeness` — gate di parità degli insiemi di chiavi

`scripts/i18n/check-key-completeness.mjs` (`npm run i18n:check-keys`, job `i18n-ui-coverage`).
Confronta l'insieme delle chiavi foglia di ogni `src/i18n/messages/<locale>.json` con `en.json` e genera un errore
in presenza di qualsiasi chiave foglia mancante o aggiuntiva, indipendentemente da quando sia stata aggiunta. I segnaposto `__MISSING__:`
contano come presenti (il loro contenuto è di competenza del gate del rapporto). È il complemento assoluto
dei due gate basati sulle differenze/percentuali: `check-ui-keys-coverage` impone una soglia minima dell'80 % per
locale (43 chiavi mancanti su ~13.000 risultano comunque pari al 99,7 %) e `check-new-key-coverage` valuta
solo le chiavi aggiunte da una PR a `en.json`. Un batch di locale viene generato a partire dal `en.json` del giorno
in cui viene creato il relativo branch e viene tradotto per giorni, mentre il branch di base continua ad aggiungere chiavi; la PR del batch non aggiunge
alcuna chiave, quindi entrambi i gate correlati sono rimasti silenti quando il batch 1 (#13044) è stato integrato con 43 chiavi mancanti in nove
locale e il batch 2 (#13660) con 10 chiavi mancanti in otto (2026-09-15). Per correggere un errore, usare
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers`; una chiave foglia `extra`
indica che la sorgente l'ha rimossa: eliminarla dal locale. `--warn` segnala senza generare errori.
`--catalog=cli` esegue lo stesso confronto su `bin/cli/locales` (`npm run i18n:check-keys:cli`);
entrambi i passaggi si trovano nel job `i18n-ui-coverage`.

#### `check-new-key-coverage` — gate i18n per le nuove chiavi

Gate correlato a `check-ui-value-drift`. Quest'ultimo rileva un valore inglese che è stato **riscritto**
mentre le sue traduzioni sono rimaste invariate; questo rileva una chiave inglese che è stata **aggiunta**
ma che non è mai stata inserita in alcuni locale.

`check-ui-keys-coverage` non può rilevare questa categoria: impone una soglia percentuale minima per locale e
undici chiavi mancanti su ~13.000 lasciano la copertura al 99,9%. Una percentuale per lingua non può
esprimere il concetto «questa funzionalità è stata distribuita senza traduzione»: un'intera funzionalità può essere introdotta in un nuovo locale senza alcun
testo e senza mai modificare il valore numerico.

L'incidente che codifica: la fase 3 di Orchestration Canvas ha tradotto le sue undici chiavi nei
42 locale esistenti all'epoca. Qualche ora dopo, il batch delle lingue UE (#13044) ha portato il repository
a 51 locale e i nove nuovi arrivati (`el`, `et`, `ga`, `hr`, `lt`, `lv`, `mt`, `sl`, `sr`) non le hanno mai
ricevute. `deepMergeFallback` sostituisce una chiave mancante con l'inglese, quindi la modalità di errore era
un'interfaccia utente non tradotta anziché vuota: un problema reale e, per costruzione, silenzioso.

Come il gate correlato, è **consapevole delle differenze**, poiché confronta l'inglese al merge base con l'albero
di lavoro; pertanto, le lacune preesistenti rimangono congelate e non è stata necessaria alcuna migrazione per attivare il gate.

**Un marcatore `__MISSING__:<english>` non lo soddisfa (dal 2026-09-17).** In precedenza era il
metodo di rinvio documentato — a runtime viene utilizzato come fallback l'inglese corretto — finché otto PR di funzionalità del
2026-09-16 hanno aggiunto 61 chiavi e inserito il marcatore in tutti i 65 locale anziché tradurre: questo
gate le ha accettate tutte, nulla ha bloccato le PR e il gate bloccante del rapporto di traduzioni effettive
ha quindi generato un errore sulla punta del branch di rilascio per tutti (pt-BR 3,2 % > 2,5 % + 0,5). Un marcatore viene ora considerato
una traduzione assente. Per correggere un errore, usare
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers --batch-size=40`, oppure
tutti i locale in parallelo con `npm run i18n:translate-new-keys` (`scripts/i18n/translate-new-keys.sh`,
sicuro in modalità detached, si rifiuta di avviarsi senza le variabili di ambiente `OMNIROUTE_TRANSLATION_*`). Una chiave che deve rimanere
in inglese (il nome fisso di un prodotto/motore/flag) deve essere inserita in `scripts/i18n/untranslatable-keys.json`,
mai dietro un marcatore. `vi` vieta completamente i marcatori (`tests/unit/i18n-vi-completeness.test.ts`).

#### `check-vitest-exclusions` — gate dei test sospesi

Un file nell'elenco `exclude` di `vitest.config.ts` è un test che non viene eseguito e, per chi
legge l'albero, appare come copertura. Sessantadue file si sono accumulati dietro il commento
`// #8618 — errore preesistente; rimuovere questa esclusione quando viene risolto`. L'issue #8618 è stata chiusa il
2026-08-11, mentre l'elenco che tracciava è cresciuto da 45 a 62 voci, ognuna delle quali ereditava un commento
che rimandava a un'issue chiusa. Quando l'elenco è stato infine misurato file per file (#13204), **51 dei 62
test venivano superati sull'albero corrente senza alcuna modifica al codice sorgente**.

Il gate richiede che ogni esclusione che corrisponde a un file reale (a) indichi un'issue di tracciamento e
(b) compaia in `config/quality/vitest-exclusions.json` con il relativo stato misurato, in modo che aggiungerne una produca una
differenza verificabile in un file dedicato, anziché un'altra riga in un array di 60 voci. Deliberatamente,
non riesegue i test esclusi: ciò richiede ~10 minuti ed è compito di un job periodico; l'inventario registra
quando ciascuno di essi è stato misurato l'ultima volta.
