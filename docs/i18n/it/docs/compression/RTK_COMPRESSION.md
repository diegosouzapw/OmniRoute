# RTK Compression (Italiano)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/RTK_COMPRESSION.md) · 🇪🇹 [am](../../../am/docs/compression/RTK_COMPRESSION.md) · 🇸🇦 [ar](../../../ar/docs/compression/RTK_COMPRESSION.md) · 🇦🇿 [az](../../../az/docs/compression/RTK_COMPRESSION.md) · 🇧🇬 [bg](../../../bg/docs/compression/RTK_COMPRESSION.md) · 🇧🇩 [bn](../../../bn/docs/compression/RTK_COMPRESSION.md) · 🇨🇿 [cs](../../../cs/docs/compression/RTK_COMPRESSION.md) · 🇩🇰 [da](../../../da/docs/compression/RTK_COMPRESSION.md) · 🇩🇪 [de](../../../de/docs/compression/RTK_COMPRESSION.md) · 🇬🇷 [el](../../../el/docs/compression/RTK_COMPRESSION.md) · 🇪🇸 [es](../../../es/docs/compression/RTK_COMPRESSION.md) · 🇪🇪 [et](../../../et/docs/compression/RTK_COMPRESSION.md) · 🇮🇷 [fa](../../../fa/docs/compression/RTK_COMPRESSION.md) · 🇫🇮 [fi](../../../fi/docs/compression/RTK_COMPRESSION.md) · 🇫🇷 [fr](../../../fr/docs/compression/RTK_COMPRESSION.md) · 🇮🇪 [ga](../../../ga/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [gu](../../../gu/docs/compression/RTK_COMPRESSION.md) · 🇳🇬 [ha](../../../ha/docs/compression/RTK_COMPRESSION.md) · 🇮🇱 [he](../../../he/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [hi](../../../hi/docs/compression/RTK_COMPRESSION.md) · 🇭🇷 [hr](../../../hr/docs/compression/RTK_COMPRESSION.md) · 🇭🇺 [hu](../../../hu/docs/compression/RTK_COMPRESSION.md) · 🇦🇲 [hy](../../../hy/docs/compression/RTK_COMPRESSION.md) · 🇮🇩 [id](../../../id/docs/compression/RTK_COMPRESSION.md) · 🇳🇬 [ig](../../../ig/docs/compression/RTK_COMPRESSION.md) · 🇯🇵 [ja](../../../ja/docs/compression/RTK_COMPRESSION.md) · 🇬🇪 [ka](../../../ka/docs/compression/RTK_COMPRESSION.md) · 🇰🇭 [km](../../../km/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [kn](../../../kn/docs/compression/RTK_COMPRESSION.md) · 🇰🇷 [ko](../../../ko/docs/compression/RTK_COMPRESSION.md) · 🇱🇹 [lt](../../../lt/docs/compression/RTK_COMPRESSION.md) · 🇱🇻 [lv](../../../lv/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [ml](../../../ml/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [mr](../../../mr/docs/compression/RTK_COMPRESSION.md) · 🇲🇾 [ms](../../../ms/docs/compression/RTK_COMPRESSION.md) · 🇲🇹 [mt](../../../mt/docs/compression/RTK_COMPRESSION.md) · 🇲🇲 [my](../../../my/docs/compression/RTK_COMPRESSION.md) · 🇳🇵 [ne](../../../ne/docs/compression/RTK_COMPRESSION.md) · 🇳🇱 [nl](../../../nl/docs/compression/RTK_COMPRESSION.md) · 🇳🇴 [no](../../../no/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [or](../../../or/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [pa](../../../pa/docs/compression/RTK_COMPRESSION.md) · 🇵🇭 [phi](../../../phi/docs/compression/RTK_COMPRESSION.md) · 🇵🇱 [pl](../../../pl/docs/compression/RTK_COMPRESSION.md) · 🇵🇹 [pt](../../../pt/docs/compression/RTK_COMPRESSION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/RTK_COMPRESSION.md) · 🇷🇴 [ro](../../../ro/docs/compression/RTK_COMPRESSION.md) · 🇷🇺 [ru](../../../ru/docs/compression/RTK_COMPRESSION.md) · 🇱🇰 [si](../../../si/docs/compression/RTK_COMPRESSION.md) · 🇸🇰 [sk](../../../sk/docs/compression/RTK_COMPRESSION.md) · 🇸🇮 [sl](../../../sl/docs/compression/RTK_COMPRESSION.md) · 🇷🇸 [sr](../../../sr/docs/compression/RTK_COMPRESSION.md) · 🇸🇪 [sv](../../../sv/docs/compression/RTK_COMPRESSION.md) · 🇰🇪 [sw](../../../sw/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [ta](../../../ta/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [te](../../../te/docs/compression/RTK_COMPRESSION.md) · 🇹🇭 [th](../../../th/docs/compression/RTK_COMPRESSION.md) · 🇹🇷 [tr](../../../tr/docs/compression/RTK_COMPRESSION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/RTK_COMPRESSION.md) · 🇵🇰 [ur](../../../ur/docs/compression/RTK_COMPRESSION.md) · 🇺🇿 [uz](../../../uz/docs/compression/RTK_COMPRESSION.md) · 🇻🇳 [vi](../../../vi/docs/compression/RTK_COMPRESSION.md) · 🇳🇬 [yo](../../../yo/docs/compression/RTK_COMPRESSION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/RTK_COMPRESSION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/RTK_COMPRESSION.md)

---

La compressione RTK è il motore di compressione di OmniRoute sensibile ai comandi per l'output del terminale e degli strumenti. È
progettata per le sessioni degli agenti di programmazione, in cui la maggior parte della crescita del contesto deriva da log dei test, output di compilazione,
rumore dei gestori di pacchetti, trascrizioni della shell, output di Docker, output di git e stack trace.

RTK può essere eseguito direttamente con `defaultMode: "rtk"` oppure come primo passaggio di una pipeline concatenata, in genere:

```txt
rtk -> caveman
```

Quest'ordine comprime prima l'output macchina ridondante, quindi consente a Caveman di condensare il testo rimanente.

Il progetto RTK upstream dichiara un risparmio del `60-90%` sull'output dei comandi. La sessione di esempio nel suo README passa da
`~118,000` token standard a `~23,900` token RTK, con un risparmio del `79.7%` (`~80%`). OmniRoute utilizza
questa media upstream per calcolare il risparmio della concatenazione con la compressione dell'input di Caveman:

```txt
Media RTK:       80% risparmiato
Input Caveman:   46% risparmiato
Concatenati:     1 - (1 - 0.80) * (1 - 0.46) = 89.2% risparmiato
Intervallo:      1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

## Cosa comprime

Il catalogo integrato include attualmente 49 filtri suddivisi nelle seguenti categorie:

| Categoria | Esempi                                                        |
| --------- | ------------------------------------------------------------- |
| `git`     | `git status`, `git branch`, `git diff`, `git log`             |
| `test`    | Vitest, Jest, Pytest, Playwright, test Go, test Cargo         |
| `build`   | TypeScript, ESLint, Biome, Prettier, Vite, Webpack, Turbo, Nx |
| `package` | `npm install`, `npm audit`, `pip`, `uv sync`, Poetry, Bundler |
| `shell`   | `ls`, `find`, `grep`, log generici della shell                |
| `docker`  | `docker ps`, log di Docker                                    |
| `infra`   | Terraform, OpenTofu, `systemctl status`                       |
| `generic` | Output JSON, stack trace, fallback generico per l'output      |

Il rilevatore in `open-sse/services/compression/engines/rtk/commandDetector.ts` classifica l'output
prima della selezione del filtro. I filtri possono anche trovare corrispondenze in base al pattern del comando o a un'espressione regolare sull'output quando una classe
di comandi non è sufficiente.

## Risoluzione dei filtri

RTK carica i filtri nel seguente ordine:

1. Filtri del progetto da `.rtk/filters.toml` e `.rtk/filters.json`, solo se considerati attendibili.
2. Filtri globali da `DATA_DIR/rtk/filters.toml` e `DATA_DIR/rtk/filters.json`.
3. Filtri integrati da `open-sse/services/compression/engines/rtk/filters/`.

All'interno dello stesso ambito, i filtri TOML con schema RTK v1 hanno la precedenza sui filtri JSON di OmniRoute. Le espressioni TOML
`match_command` vengono verificate prima della corrispondenza per tipo di comando, in modo che un filtro importato specifico per un comando
possa sostituire un filtro più generico nello stesso ambito. L'ambito del progetto continua ad avere la precedenza sull'ambito globale,
indipendentemente dal formato del file.

I filtri del progetto sono intenzionalmente soggetti a verifica dell'attendibilità, poiché i filtri basati su espressioni regolari possono modificare il modo in cui l'output degli strumenti viene
mostrato agli agenti. Un file di filtri del progetto viene accettato quando è soddisfatta una delle seguenti condizioni:

- `rtkConfig.trustProjectFilters` è `true`.
- È impostata `OMNIROUTE_RTK_TRUST_PROJECT_FILTERS=1`.
- `.rtk/trust.json` contiene l'hash SHA-256 corrispondente per il file di filtri del progetto.

Esempio di file di attendibilità:

```json
{
  "filtersSha256": "0123456789abcdef...",
  "filtersTomlSha256": "fedcba9876543210..."
}
```

Gli hash sono separati: `filtersSha256` autorizza `.rtk/filters.json`, mentre `filtersTomlSha256`
autorizza `.rtk/filters.toml`. La modifica di uno dei due file invalida solo la relativa voce di attendibilità. I file globali
vengono installati dall'amministratore e utilizzano il comportamento esistente per l'attendibilità dei filtri globali.

I filtri personalizzati possono essere costituiti da un singolo oggetto filtro o da un array di oggetti filtro. I filtri personalizzati non validi vengono
ignorati e segnalati dalla diagnostica di `/api/context/rtk/filters`. I filtri integrati non validi causano invece un errore immediato.

## Compatibilità con lo schema RTK TOML v1

OmniRoute può analizzare, convalidare, testare e installare file di filtri dichiarativi utilizzando lo schema RTK TOML v1.
I campi supportati sono `description`, `match_command`, `strip_ansi`, `filter_stderr`,
`strip_lines_matching`, `keep_lines_matching`, `replace`, `match_output`, `truncate_lines_at`,
`head_lines`, `tail_lines`, `max_lines`, `on_empty` e i test inline `[[tests.<filter>]]`.
I campi sconosciuti, le espressioni regolari non valide o non sicure, le regole di rimozione e mantenimento simultanee, i file di dimensioni superiori a
1 MiB e i riferimenti a filtri sconosciuti vengono rifiutati. Un file i cui test inline non vengono superati può essere
convalidato per l'ispezione, ma non può essere installato o caricato. Gli errori di caricamento dei file personalizzati rimangono
fail-open: il file non valido viene ignorato e i filtri rimanenti continuano a funzionare.

OmniRoute riceve l'output dello strumento dopo che il client lo ha già acquisito, pertanto `filter_stderr = true`
non può modificare l'acquisizione del processo. Il campo viene accettato come no-op e la convalida restituisce un avviso.
Questa funzionalità viene intenzionalmente descritta come **compatibilità con lo schema RTK TOML v1**, non come compatibilità completa
con l'eseguibile RTK, gli hook della shell, le implementazioni dei comandi Rust o la struttura del relativo archivio di attendibilità.

La vista RTK avanzata della dashboard accetta TOML incollato o caricato. La convalida è di sola lettura.
L'installazione scrive atomicamente `DATA_DIR/rtk/filters.toml` con autorizzazioni restrittive e aggiorna
il catalogo dei filtri attivo senza richiedere un riavvio. La sostituzione di un file esistente richiede una conferma esplicita tramite `overwrite`
e crea prima `DATA_DIR/rtk/filters.toml.bak`.

## DSL dei filtri

I filtri utilizzano lo schema JSON descritto in [Formato delle regole di compressione](./COMPRESSION_RULES_FORMAT.md).
Il runtime applica queste fasi nell'ordine seguente:

```txt
stripAnsi -> filterStderr -> replace -> matchOutput -> rimozione/inclusione delle righe
  -> truncateLineAt -> head/tail/maxLines -> onEmpty
```

Campi importanti:

| Campo                        | Scopo                                                                               |
| ---------------------------- | ----------------------------------------------------------------------------------- |
| `rules.stripAnsi`            | Rimuove le sequenze di colore/controllo del terminale prima del confronto           |
| `rules.filterStderr`         | Normalizza i prefissi stderr comuni prima del confronto/filtro                      |
| `rules.replace`              | Applica sostituzioni regex ordinate                                                 |
| `rules.matchOutput`          | Restituisce un riepilogo compatto quando l'output corrisponde a una condizione nota |
| `rules.matchOutput[].unless` | Ignora la scorciatoia quando è presente un pattern di errore/fallimento             |
| `rules.dropPatterns`         | Rimuove le righe superflue                                                          |
| `rules.includePatterns`      | Privilegia le righe su cui è possibile intervenire                                  |
| `rules.collapsePatterns`     | Raggruppa le righe corrispondenti ripetute                                          |
| `rules.deduplicate`          | Attivazione facoltativa per filtro: raggruppa le righe duplicate consecutive        |
| `rules.truncateLineAt`       | Troncamento per riga compatibile con Unicode                                        |
| `rules.onEmpty`              | Messaggio di riserva se tutte le righe vengono escluse                              |
| `tests[]`                    | Esempi inline utilizzati dal controllo di verifica                                  |

I filtri integrati devono includere esempi inline in `tests[]`. Anche i filtri personalizzati dovrebbero
includerli, soprattutto quando vengono condivisi tra progetti.

## Deduplicazione delle righe (due livelli)

RTK comprime le righe duplicate a due livelli indipendenti:

1. **`deduplicate` per filtro (facoltativo, valore predefinito `false`).** Un filtro può impostare `rules.deduplicate: true`
   per comprimere le righe duplicate consecutive _all'interno dell'output corrispondente a quel filtro_, prima del troncamento.
   Questa operazione viene eseguita in `lineFilter.ts`. Per i filtri legacy, viene abilitata automaticamente quando il filtro definisce
   `collapsePatterns`. Schema: `deduplicate: z.boolean().default(false)` in
   `open-sse/services/compression/engines/rtk/filterSchema.ts`.
2. **`deduplicateThreshold` a livello di motore (valore predefinito `3`).** Dopo l'esecuzione di tutti i filtri, il motore comprime
   qualsiasi sequenza di `>= deduplicateThreshold` righe consecutive identiche nell'intero risultato
   (`deduplicateRepeatedLines`, applicato in `engines/rtk/index.ts`). Durante la normalizzazione, il valore viene limitato all'intervallo 2–100.

Il passaggio per filtro viene eseguito per primo (all'interno del filtro), mentre quello a livello di motore viene eseguito per ultimo (sull'output
combinato), pertanto i due si combinano senza doppi conteggi.

## Raggruppamento delle righe (`enableGrouping`)

Quando `rtkConfig.enableGrouping` è impostato su `true` (valore predefinito `false`), RTK esegue un ulteriore passaggio `groupSimilarLines`
sul risultato successivo alla deduplicazione, che comprime sequenze di righe consecutive _quasi equivalenti_ (non identiche byte per byte).
`rtkConfig.groupingThreshold` (valore predefinito `3`) rappresenta la lunghezza minima della sequenza che attiva
il raggruppamento. È la controparte strutturale di `deduplicateThreshold`: la deduplicazione gestisce le ripetizioni esatte,
mentre il raggruppamento gestisce «la stessa struttura con piccole differenze». Entrambi i flag fanno parte del JSON `rtkConfig`
salvato nella tabella `key_value` (vedere la sezione Configurazione sopra), pertanto l'impostazione persiste dopo i riavvii.

## Rimozione dei commenti dal codice (`stripCodeComments` / `preserveDocstrings`)

Quando `rtkConfig.applyToCodeBlocks` è abilitato, RTK può anche rimuovere i commenti dai blocchi di codice delimitati:

- `stripCodeComments` (valore predefinito `false`) — facoltativo. Quando è impostato su `true`, RTK rimuove i commenti dai blocchi delimitati
  JavaScript e TypeScript. Storicamente il flag veniva letto ma mai applicato, quindi il valore predefinito rimane
  «mantieni» per evitare una modifica invisibile in produzione.
- `preserveDocstrings` (valore predefinito `true`) — durante la rimozione dei commenti, i commenti di blocco JSDoc/`/** … */` vengono
  mantenuti (contengono documentazione API che vale più dei byte che occupano). Impostarlo su `false` per rimuovere
  anche questi commenti.

La rimozione dei commenti è implementata in `open-sse/services/compression/engines/rtk/codeStripper.ts`. Utilizza
il **parser TypeScript** (non un'espressione regolare), in modo che le stringhe e i valori letterali template e regex non vengano mai scambiati
per commenti; inoltre, interrompe completamente l'operazione quando rileva JSX (così i commenti nei contenitori di espressioni JSX non vengono
mai danneggiati). Attualmente, la rimozione dei commenti si applica **solo a JavaScript e TypeScript** — gli altri
linguaggi nell'insieme `CodeLanguage` dello stripper (Python, Rust, Go, Ruby, Java) prevedono la compressione delle righe vuote e
degli spazi bianchi, ma non la rimozione dei commenti. L'esecuzione sul blocco ripulito viene contrassegnata con `rtk:code-strip` in
`rulesApplied`.

> **Nota — GCF / la codifica tabulare è un motore separato.** RTK **non** contiene il codificatore JSON
> tabulare/colonnare «GCF» (Graph Compact Format). Tale codificatore — che ha sostituito un precedente codificatore
> `omni-tabular` — si trova nel motore **headroom**
> (`open-sse/services/compression/engines/headroom/`, con il codec incorporato in
> `headroom/gcf/`). Non è correlato alla pipeline di filtri RTK documentata qui.

## Configurazione

Le impostazioni globali sono disponibili tramite `/api/settings/compression`. Le impostazioni specifiche di RTK sono disponibili anche tramite `/api/context/rtk/config`.

```json
{
  "defaultMode": "stacked",
  "autoTriggerMode": "stacked",
  "autoTriggerTokens": 32000,
  "stackedPipeline": [
    { "engine": "rtk", "intensity": "standard" },
    { "engine": "caveman", "intensity": "full" }
  ],
  "rtkConfig": {
    "enabled": true,
    "intensity": "standard",
    "applyToToolResults": true,
    "applyToCodeBlocks": false,
    "applyToAssistantMessages": false,
    "enabledFilters": [],
    "disabledFilters": [],
    "maxLinesPerResult": 120,
    "maxCharsPerResult": 12000,
    "deduplicateThreshold": 3,
    "customFiltersEnabled": true,
    "trustProjectFilters": false,
    "rawOutputRetention": "never",
    "rawOutputMaxBytes": 1048576,
    "enableGrouping": false,
    "groupingThreshold": 3,
    "stripCodeComments": false,
    "preserveDocstrings": true
  }
}
```

`enabledFilters` e `disabledFilters` utilizzano gli ID dei filtri, ad esempio `test-vitest` o `git-diff`.

La struttura completa di `rtkConfig` è definita da `RtkConfig` / `DEFAULT_RTK_CONFIG` in `open-sse/services/compression/types.ts`. L'intero oggetto viene salvato come un singolo valore JSON nella tabella SQLite `key_value` con `namespace = "compression"`, `key = "rtkConfig"` (`src/lib/db/compression.ts`) e normalizzato in fase di lettura da `normalizeRtkConfig`. Pertanto, ogni campo riportato di seguito — inclusi `enableGrouping`, `groupingThreshold`, `stripCodeComments` e `preserveDocstrings` — viene gestito dallo stesso archivio e persiste dopo un riavvio.

| Chiave                 | Valore predefinito | Scopo                                                                                           |
| ---------------------- | ------------------ | ----------------------------------------------------------------------------------------------- |
| `deduplicateThreshold` | `3`                | A livello di motore: numero minimo di righe consecutive identiche da comprimere (2–100)         |
| `enableGrouping`       | `false`            | Facoltativo: comprime sequenze di righe consecutive quasi equivalenti                           |
| `groupingThreshold`    | `3`                | Numero minimo di righe consecutive simili che attiva il raggruppamento                          |
| `stripCodeComments`    | `false`            | Facoltativo: rimuove i commenti dai blocchi di codice delimitati (richiede `applyToCodeBlocks`) |
| `preserveDocstrings`   | `true`             | Durante la rimozione dei commenti, conserva i blocchi JSDoc/`/** … */`                          |

## API

| Route                              | Metodo | Scopo                                                              |
| ---------------------------------- | ------ | ------------------------------------------------------------------ |
| `/api/context/rtk/config`          | GET    | Legge la configurazione RTK                                        |
| `/api/context/rtk/config`          | PUT    | Aggiorna la configurazione RTK                                     |
| `/api/context/rtk/filters`         | GET    | Elenca il catalogo dei filtri e la diagnostica di caricamento      |
| `/api/context/rtk/import`          | POST   | Convalida o installa file conformi allo schema TOML RTK v1         |
| `/api/context/rtk/test`            | POST   | Mostra un'anteprima della compressione RTK per un payload testuale |
| `/api/context/rtk/raw-output/[id]` | GET    | Legge l'output grezzo oscurato conservato                          |
| `/api/compression/preview`         | POST   | Mostra un'anteprima di qualsiasi modalità di compressione          |

Payload di test RTK:

```json
{
  "command": "npm test",
  "text": "FAIL tests/example.test.ts\nAssertionError: expected true\nTest Files 1 failed",
  "config": {
    "intensity": "standard"
  }
}
```

Payload per l'anteprima della compressione:

```json
{
  "mode": "stacked",
  "messages": [
    {
      "role": "tool",
      "content": "FAIL tests/example.test.ts\nAssertionError: expected true\nTest Files 1 failed"
    }
  ],
  "config": {
    "rtkConfig": {
      "rawOutputRetention": "failures"
    }
  }
}
```

Le route di gestione richiedono l'autenticazione di gestione della dashboard o la policy della chiave API corrispondente.

Payload di convalida TOML RTK:

```json
{
  "action": "validate",
  "content": "schema_version = 1\n\n[filters.my-tool]\nmatch_command = \"^my-tool\\\\b\"\nmax_lines = 20\n"
}
```

Utilizzare `"action": "install"` per installare globalmente il file convalidato. Aggiungere `"overwrite": true` solo dopo aver esaminato e confermato la sostituzione di un file globale esistente.

## Recupero dell'output grezzo

RTK normalmente restituisce solo testo compresso. Per il debug, `rawOutputRetention` può conservare
l'output grezzo oscurato:

| Valore     | Comportamento                                                    |
| ---------- | ---------------------------------------------------------------- |
| `never`    | Non conserva l'output grezzo                                     |
| `failures` | Conserva solo l'output relativo a probabili errori               |
| `always`   | Conserva ogni output grezzo compresso da RTK, dopo l'oscuramento |

I file conservati vengono scritti in:

```txt
DATA_DIR/rtk/raw-output/
```

I segreti vengono oscurati prima della persistenza, inclusi i comuni bearer token, chiavi API, token Slack,
chiavi di accesso AWS e valori in stile assegnazione `token=...`, `secret=...`, `password=...`. Le analisi
memorizzano solo l'ID del puntatore, la dimensione e i metadati dell'hash.

## Gate di verifica

Il gate di verifica mirato esegue i test integrati dei filtri inline senza invocare comandi esterni tramite shell:

```bash
node --import tsx/esm --test tests/unit/compression/rtk-verify.test.ts
```

Il gate RTK più ampio è:

```bash
node --import tsx/esm --test \
  tests/unit/compression/rtk-*.test.ts \
  tests/unit/compression/pipeline-integration.test.ts \
  tests/unit/compression/context-compression-api.test.ts
```

Esegui il gate di compressione completo prima del rilascio:

```bash
node --import tsx/esm --test \
  tests/unit/compression/*.test.ts \
  tests/golden-set/*.test.ts \
  tests/integration/compression-pipeline.test.ts \
  tests/unit/api/compression/compression-api.test.ts
```

## Estensione di RTK

1. Aggiungi o aggiorna un file JSON di filtro.
2. Includi almeno un esempio `tests[]` che dimostri il comportamento importante.
3. Aggiungi una fixture in `tests/unit/compression/fixtures/rtk/` per le nuove famiglie di comandi.
4. Aggiungi la copertura del rilevamento dei comandi quando introduci una nuova classe di output.
5. Esegui i gate di verifica e RTK completo.
6. Se il filtro è locale al progetto, esegui il commit di `.rtk/filters.json` e aggiorna `.rtk/trust.json` solo dopo la revisione.

---

## Livelli di intensità (v3.8.16+)

RTK supporta **3 livelli di intensità** che bilanciano **aggressività della compressione** e **sicurezza**. Il livello viene impostato tramite `config.intensity` nella configurazione del motore.

### I 3 livelli

| Livello              | Soglia di troncamento | Risparmio di token | Rischio     | Ideale per                            |
| -------------------- | --------------------- | ------------------ | ----------- | ------------------------------------- |
| `minimal`            | 24 righe per sezione  | ~20-40%            | Molto basso | Produzione con contesto critico       |
| `standard` (default) | 24 righe per sezione  | ~50-70%            | Basso       | Sessioni quotidiane di programmazione |
| `aggressive`         | 16 righe per sezione  | ~70-90%            | Medio       | Sessioni lunghe, massimo risparmio    |

### Dove avviene il troncamento

La soglia di troncamento influisce su `lineFilter.ts`:

```ts
// Da open-sse/services/compression/engines/rtk/index.ts:329-330
config.intensity === "aggressive" ? 16 : 24,
config.intensity === "aggressive" ? 16 : 24,
```

Vengono conservate sia la **parte iniziale** sia la **parte finale** di ogni sezione; il contenuto intermedio viene eliminato quando si attiva il troncamento.

### Cosa viene conservato e cosa viene tagliato

| Contenuto                           | minimal       | standard      | aggressive    |
| ----------------------------------- | ------------- | ------------- | ------------- |
| Errori / tracce dello stack         | ✅ conservati | ✅ conservati | ✅ conservati |
| Test non superati                   | ✅ conservati | ✅ conservati | ✅ conservati |
| Errori di build                     | ✅ conservati | ✅ conservati | ✅ conservati |
| Test superati (output dettagliato)  | ✅ conservati | 🟡 compressi  | 🟡 compressi  |
| Output di routine (log informativi) | 🟡 compresso  | 🟡 compresso  | ❌ eliminato  |
| Barre di avanzamento                | 🟡 compresse  | ❌ eliminate  | ❌ eliminate  |
| Banner / grafica ASCII              | 🟡 compressi  | ❌ eliminati  | ❌ eliminati  |

### Scelta dell'intensità corretta

```
                  Perdere il contesto sarebbe catastrofico?
                  │
      ┌───────────┼───────────┐
      │           │           │
     SÌ          NO         NON SO
      │           │           │
      ▼           │           │
   minimal        │           │
      │           │           │
      │           ▼           ▼
      │      Quanto è critico  Prova prima `standard`
      │      il throughput?    (funziona nell'80%
      │           │            dei casi)
      │      ┌────┴────┐
      │      │         │
      │    BASSO      ALTO
      │      │         │
      │      ▼         ▼
      │   standard   aggressive
      │      │         │
      └──────┴─────────┘
```

### Configurazione dell'intensità

**Per combo** (nella configurazione della combo):

```json
{
  "combo": "my-coding-combo",
  "routing": {/* ... */},
  "compression": {
    "engine": "rtk",
    "intensity": "aggressive"
  }
}
```

**A livello di codice**:

`rtkEngine` (`@omniroute/open-sse/services/compression/engines/rtk`) è un
`CompressionEngine` e non dispone del metodo `updateConfig`. Aggiorna la configurazione di un motore
tramite l'helper del registro:

```ts
import { updateEngineConfig } from "@omniroute/open-sse/services/compression/engines/registry";

updateEngineConfig("rtk", { intensity: "aggressive" });
```

### Verifica dell'effetto

Usa il **gate di verifica** (vedi sotto) per confermare che il filtro sia sicuro con l'intensità scelta:

```ts
import { runRtkFilterTests } from "omniroute/compression/engines/rtk/verify";

const result = runRtkFilterTests({ intensity: "aggressive" });
if (!result.passed) {
  console.error("I filtri non sono stati superati con intensità aggressive");
}
```

---

## Sviluppo di filtri personalizzati (v3.8.16+)

La directory `engines/rtk/filters/` contiene **oltre 49 file JSON di filtri integrati**. Puoi aggiungere i tuoi filtri per comprimere l'output di strumenti personalizzati non coperti dalle impostazioni predefinite.

### Schema del filtro (Zod)

```ts
{
  "id": "string",                      // Obbligatorio. Identificatore del filtro (kebab-case, ad es. "python-traceback")
  "label": "string",                   // Obbligatorio. Nome del filtro leggibile
  "description": "string",             // Facoltativo (valore predefinito: ""). Breve descrizione della funzione del filtro
  "category": "git|test|build|shell|docker|package|infra|cloud|generic",
  "priority": number,                  // Facoltativo (0-100, valore predefinito: 50). Ordine di esecuzione (più alto = prima)
  "match": {
    "commands": ["string"],            // Nomi dei comandi da confrontare (ad es. "python", "pytest")
    "patterns": ["string"],            // Espressioni regolari da confrontare con l'output
    "outputTypes": ["string"]          // Classi di output rilevate (ad es. "test-failure")
  },
  "rules": {
    "stripAnsi": boolean,              // Facoltativo (valore predefinito: false). Rimuove i codici colore ANSI
    "replace": [                       // Regole di ricerca e sostituzione (valore predefinito: [])
      { "pattern": "regex", "replacement": "..." }
    ],
    "matchOutput": [                   // Interrompe anticipatamente in caso di corrispondenza del pattern (valore predefinito: [])
      {
        "pattern": "regex",
        "message": "short summary",
        "unless": "regex"              // Ignora se questo pattern corrisponde
      }
    ],
    "includePatterns": ["string"],     // Righe da conservare (pattern regex, valore predefinito: [])
    "dropPatterns": ["string"],        // Righe da eliminare (pattern regex, valore predefinito: [])
    "collapsePatterns": ["string"],    // Righe da ridurre a una singola occorrenza (valore predefinito: [])
    "deduplicate": boolean,            // Facoltativo (valore predefinito: false). Rimuove le righe duplicate
    "truncateLineAt": number,          // Facoltativo (valore predefinito: 0). Tronca le righe al numero massimo di caratteri
    "maxLines": number,                // Facoltativo (valore predefinito: 0). Limite massimo assoluto del numero totale di righe
    "headLines": number,               // Facoltativo (valore predefinito: 20). Conserva le prime N righe dell'output corrispondente
    "tailLines": number,               // Facoltativo (valore predefinito: 20). Conserva le ultime N righe dell'output corrispondente
    "onEmpty": "string",               // Facoltativo (valore predefinito: ""). Messaggio di riserva se tutte le righe vengono filtrate
    "filterStderr": boolean            // Facoltativo (valore predefinito: false). Filtra anche l'output stderr
  },
  "preserve": {
    "errorPatterns": ["string"],       // Pattern che devono essere sempre conservati (valore predefinito: [])
    "summaryPatterns": ["string"]      // Pattern per la riga di riepilogo finale (valore predefinito: [])
  },
  "tests": [                           // Test incorporati per la verifica (valore predefinito: [])
    {
      "name": "string",               // Obbligatorio. Nome del test
      "input": "sample output",        // Obbligatorio. Testo di input di esempio
      "expected": "expected output",   // Obbligatorio. Output compresso previsto
      "command": "optional command"    // Facoltativo. Contesto del comando
    }
  ]
}
```

### Esempio: filtro dei traceback Python

```json
{
  "id": "python-traceback",
  "label": "Python Traceback Filter",
  "description": "Compresses Python tracebacks to essential file/line locations and error type",
  "category": "test",
  "priority": 60,
  "match": {
    "commands": ["python", "python3", "pytest", "uv", "poetry"],
    "patterns": ["Traceback \\(most recent call last\\)", "Error", "Exception"],
    "outputTypes": ["error-traceback"]
  },
  "rules": {
    "stripAnsi": true,
    "includePatterns": [
      "Traceback \\(most recent call last\\)",
      "^\\s*File \".+\", line \\d+",
      "^\\s*[A-Z][a-zA-Z]+Error:",
      "^\\s*[A-Z][a-zA-Z]+Exception"
    ],
    "dropPatterns": ["site-packages/", "^\\s+[a-z_]+\\([^)]*\\)$"],
    "headLines": 5,
    "tailLines": 3,
    "maxLines": 25,
    "filterStderr": true
  },
  "preserve": {
    "errorPatterns": ["Error:", "Exception:", "Traceback"],
    "summaryPatterns": ["^[A-Z][a-zA-Z]+(?:Error|Exception):"]
  },
  "tests": [
    {
      "name": "preserves-error-type-and-location",
      "input": "Traceback (most recent call last):\n  File \"app.py\", line 42, in main\n    do_thing()\n  File \"lib/utils.py\", line 17, in helper\n    return 1 / 0\nZeroDivisionError: division by zero",
      "expected": "Traceback (most recent call last):\n  File \"app.py\", line 42, in main\n  File \"lib/utils.py\", line 17, in helper\nZeroDivisionError: division by zero",
      "command": "python app.py"
    }
  ]
}
```

### Caricamento dei filtri personalizzati

Inserisci il file in un percorso riconosciuto:

```
~/.omniroute/rtk/filters/my-filter.json     # Livello utente
<project>/.rtk/filters/my-filter.json      # Livello di progetto
```

I filtri vengono caricati automaticamente all'avvio tramite `loadRtkFilters()` in `open-sse/services/compression/engines/rtk/filterLoader.ts`. Il caricatore individua i filtri nelle seguenti posizioni:

- Catalogo integrato: `open-sse/services/compression/engines/rtk/filters/`
- Directory dell'utente: `~/.omniroute/rtk/filters/`
- Directory del progetto: `<project>/.rtk/filters/`

Per caricare i filtri a livello di codice:

```ts
import { loadRtkFilters } from "@omniroute/open-sse/services/compression/engines/rtk/filterLoader";

// Opzioni: customFiltersEnabled (carica i filtri utente/progetto, attivo per impostazione predefinita),
// trustProjectFilters, refresh.
const filters = loadRtkFilters({ customFiltersEnabled: true });
```

### Convalida

I filtri vengono convalidati rispetto allo schema Zod durante il caricamento. Un filtro con una struttura non valida non verrà caricato e verrà registrato un errore:

```
RTK_FILTER_LOADER: convalida del filtro "my-filter" non riuscita:
  - rules.replace.0.pattern: Espressione regolare non valida
  - match.commands: non deve essere vuoto
```

Per convalidare tutti i filtri installati, chiama `runRtkFilterTests()`, esportata da `open-sse/services/compression/engines/rtk/verify.ts`.

### Procedure consigliate

1. **Includi sempre `tests[]`** — dimostrano che il filtro funziona e prevengono regressioni
2. **Usa `matchOutput` per le interruzioni anticipate** — se una singola riga è sufficiente a descrivere la situazione, sostituisci l'intero blocco
3. **Preferisci `keep` a `strip`** — le regole esplicite "mantieni sempre" sono più sicure di quelle "rimuovi sempre"
4. **Esegui i test a tutti e 3 i livelli di intensità** — `minimal` non dovrebbe produrre alcun effetto, mentre `aggressive` dovrebbe comunque preservare gli errori
5. **Usa il campo `unless`** — proteggi le interruzioni anticipate con la condizione "non attivare se è presente X"

---

## Recupero dell'output grezzo e gate di verifica

Quando RTK comprime l'output in modo aggressivo, puoi **recuperare il testo originale** per il debug, l'audit o la riesecuzione.

### Come funziona il recupero dell'output grezzo

```
Output originale (10K token)
        │
        ▼
Compressione RTK (con rawOutput.enabled=true)
        │
        ├─▶ Output compresso (2K token)  ──▶ all'LLM
        │
        └─▶ Output originale (10K token) ──▶ archiviato nel DB
                                                  (collegato tramite request_id)
```

### Abilitazione dell'archiviazione dell'output grezzo

**Per richiesta** (nella configurazione combinata):

```json
{
  "compression": {
    "engine": "rtk",
    "intensity": "aggressive",
    "rawOutput": {
      "enabled": true,
      "maxBytes": 1048576 // limite di 1 MB
    }
  }
}
```

**Impostazione predefinita**: `rawOutput.enabled: false` (riduce lo spazio di archiviazione).

### Costo di archiviazione

| Per richiesta             | Limite di 1 MB  | Limite di 10 MB  |
| ------------------------- | --------------- | ---------------- |
| Output compresso medio    | ~5KB            | ~5KB             |
| Output grezzo archiviato  | ~50-500KB       | ~500KB-5MB       |
| Con 1000 richieste/giorno | 50-500MB/giorno | 500MB-5GB/giorno |

> **Raccomandazione**: abilita l'output grezzo solo per **sessioni di debug** o **audit a campione**, non in modo permanente.

### Recupero dell'originale

```ts
import { readRtkRawOutput } from "omniroute/compression/engines/rtk/rawOutput";

const raw = readRtkRawOutput(pointerId); // pointerId dalle statistiche di compressione
if (raw) {
  console.log("Original output:", raw);
}
```

Il `pointerId` viene restituito in `CompressionStats.rtkRawOutputPointers[]` dopo la compressione.
Consulta `open-sse/services/compression/engines/rtk/rawOutput.ts:102` per la firma della funzione.

### Il gate di verifica

La **verifica dei filtri RTK** (`open-sse/services/compression/engines/rtk/verify.ts`) convalida tutti i filtri rispetto ai relativi `tests[]` e garantisce che il comportamento sia corretto per tutti e 3 i livelli di intensità.

**Chiama `runRtkFilterTests()`** per eseguire la verifica:

```ts
import { runRtkFilterTests } from "open-sse/services/compression/engines/rtk/verify";

const result = runRtkFilterTests();
console.log(`Passed: ${result.outcomes.filter((o) => o.passed).length}`);
console.log(`Failed: ${result.outcomes.filter((o) => !o.passed).length}`);
if (!result.passed) {
  console.error("Filters failed verification");
  result.outcomes
    .filter((o) => !o.passed)
    .forEach((o) => {
      console.error(
        `  - ${o.filterId} / ${o.testName}: expected "${o.expected}", got "${o.actual}"`
      );
    });
}
```

**Elementi convalidati**:

1. Ogni filtro viene caricato e supera la convalida dello schema
2. Ogni voce di `tests[]` produce l'output previsto
3. L'intensità `minimal` non esegue alcuna operazione (preserva l'originale e applica solo i filtri strutturali)
4. L'intensità `aggressive` preserva gli errori, i test non riusciti e le tracce dello stack
5. L'output compresso non è mai più grande dell'input originale

- Origine: `open-sse/services/compression/engines/rtk/` (63 file, ~70KB)

- **Prima di integrare una modifica a un filtro** — assicurati sempre che i test vengano superati
- **Dopo aver aggiornato il motore RTK** — lo schema potrebbe essere cambiato
- **Periodicamente durante il monitoraggio** — protegge dalla divergenza delle fixture di test
- **Quando aggiungi una nuova famiglia di strumenti/comandi** — dimostra che il nuovo filtro funziona

---

## Vedi anche

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — Panoramica completa della pipeline di compressione
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — Registro dei motori e motori integrati
- [EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md) — Motori personalizzati, pacchetti linguistici, pipeline sovrapposte
- Codice sorgente: `open-sse/services/compression/engines/rtk/` (63 file, ~70 KB)
