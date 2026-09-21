# Compression Engines (Italiano)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_ENGINES.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_ENGINES.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_ENGINES.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_ENGINES.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_ENGINES.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_ENGINES.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_ENGINES.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_ENGINES.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_ENGINES.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_ENGINES.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_ENGINES.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_ENGINES.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_ENGINES.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_ENGINES.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_ENGINES.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_ENGINES.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_ENGINES.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_ENGINES.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_ENGINES.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_ENGINES.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_ENGINES.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_ENGINES.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_ENGINES.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_ENGINES.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_ENGINES.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_ENGINES.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_ENGINES.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_ENGINES.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_ENGINES.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_ENGINES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_ENGINES.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_ENGINES.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_ENGINES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_ENGINES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_ENGINES.md)

---

La compressione di OmniRoute è basata sui contratti dei motori. Una modalità può eseguire direttamente un motore
(`caveman` o `rtk`) oppure una pipeline impilata deterministica che esegue più motori in sequenza.

## Modalità

| Modalità     | Percorso del motore                             | Input previsto                                        |
| ------------ | ----------------------------------------------- | ----------------------------------------------------- |
| `off`        | nessuno                                         | Conservazione esatta del prompt                       |
| `lite`       | Helper lite di Caveman                          | Pulizia sempre attiva a basso rischio                 |
| `standard`   | Caveman                                         | Condensazione dei prompt in linguaggio naturale       |
| `aggressive` | Caveman + riepilogatori di cronologia/strumenti | Lunghe sessioni di chat                               |
| `ultra`      | Caveman + helper di potatura                    | Recupero dal limite di contesto                       |
| `rtk`        | RTK                                             | Output di terminale, shell, build, test e git         |
| `omniglyph`  | OmniGlyph                                       | Contesto come immagine sul canale nativo del provider |
| `stacked`    | Pipeline, predefinita `rtk -> caveman`          | Log misti di strumenti e prosa, massimo risparmio     |

### Profili di compressione OmniGlyph

Il motore `omniglyph` (pacchetto `omniglyph`, 1.4.0+) accetta un profilo semantico denominato, impostato
globalmente tramite `omniglyph.profile` nelle impostazioni di compressione oppure per ogni passaggio tramite la
configurazione del passaggio della pipeline impilata:

| Profilo       | Confine                                                                                                                                              |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `aggressive`  | Predefinito. La policy misurata dalle ricevute pubblicate — converte in immagini il sistema, la documentazione degli strumenti e la cronologia densa |
| `balanced`    | Mantiene nativo lo stato attivo, protegge gli ultimi 8 turni e comprime la cronologia chiusa meno recente                                            |
| `coding-safe` | Mantiene nativi autorità, schemi degli strumenti e output attivo degli strumenti e protegge gli ultimi 12 turni                                      |
| `passthrough` | Instrada senza trasformare; il motore viene ignorato                                                                                                 |

Il profilo è un **limite massimo, non minimo**: `mergeCompressionProfileOptions` nel pacchetto
impedisce a un override del chiamante di riaprire un canale con perdita chiuso dal profilo, quindi un
`preserveSystemPrompt: false` per un singolo passaggio non può riattivare la compressione del sistema con `coding-safe`.

Misurato su questa codebase: `coding-safe` e `balanced` aumentano `minCompressChars` al suo
valore massimo e mantengono nativi il sistema, gli schemi degli strumenti e i risultati degli strumenti, quindi una sessione che non ha
ancora accumulato cronologia si arresta a `below_min_chars` e il motore non trasforma nulla. Ecco
perché il valore predefinito è `aggressive` anziché il profilo più sicuro.

Il pacchetto determina autonomamente l'ambito del modello e il profilo dalla propria configurazione dell'ambiente.
OmniRoute non delega mai la decisione: l'adapter fissa il gate del modello all'ambito più
restrittivo del pacchetto, quindi le impostazioni dell'ambiente host possono solo restringere l'elenco degli elementi consentiti, senza mai
ampliarlo oltre le ricevute misurate da OmniRoute.

## Registro degli engine

Il registro si trova in `open-sse/services/compression/engines/registry.ts`. Gli engine espongono un
contratto condiviso:

- `id`: ID stabile dell'engine, ad esempio `caveman` o `rtk`
- `apply(text, config)`: percorso di esecuzione legacy utilizzato dalle pipeline impilate
- `compress(input, config)`: percorso di esecuzione principale che restituisce testo + statistiche
- `getConfigSchema()`: restituisce la struttura simile a JSON Schema della configurazione valida
- `validateConfig(config)`: restituisce `{ valid, errors[] }`

La registrazione utilizza `registerCompressionEngine(engine)` (oppure `registerEngine` per i casi avanzati),
che chiama `assertValidEngine()` e `validateConfig(defaultConfig)` prima di accettare l'engine.
Utilizzare `unregisterCompressionEngine(id)` per rimuovere un engine durante l'esecuzione.

`strategySelector.ts` registra gli engine integrati prima dell'esecuzione della compressione. Ciò consente all'anteprima,
alla compressione in fase di esecuzione, alla modalità impilata, ai test e agli engine futuri di utilizzare lo stesso percorso di esecuzione.

### Compressione delle descrizioni MCP (correlata)

Un registro separato comprime i metadati delle descrizioni degli strumenti MCP a livello di registro — vedere
`open-sse/mcp-server/descriptionCompressor.ts` e [MCP-SERVER.md](../frameworks/MCP-SERVER.md). Riutilizza
le regole Caveman, ma opera sui metadati degli strumenti, non sui payload delle richieste.

### Engine integrati aggiuntivi

Oltre a Caveman, RTK e LLMLingua-2, il registro include diversi engine specializzati lossless /
strutturali (utilizzati dalle pipeline impilate, dal playground e dai test):

| Engine        | ID              | Funzionamento                                                                                                                                                                                                                              |
| ------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| CCR           | `ccr`           | Content-Compress-Retrieve (H4): sostituisce grandi blocchi di testo contigui con riferimenti indirizzati per contenuto, in modo che i blocchi ripetuti/di grandi dimensioni vengano inviati una sola volta e successivamente referenziati. |
| headroom      | `headroom`      | SmartCrusher (H3 + N5): compattazione tabellare lossless dei payload costituiti da array JSON omogenei in una forma colonnare `[N rows]`.                                                                                                  |
| ionizer       | `ionizer`       | Campionamento delle righe iniziali/centrali/finali per blocchi omogenei molto grandi, con memorizzazione della parte centrale omessa come riferimento CCR indirizzato per contenuto.                                                       |
| session-dedup | `session-dedup` | Deduplicazione tra turni indirizzata per contenuto (ispirata a TokenMizer): omette il testo già visto nei turni precedenti della stessa sessione.                                                                                          |

**Istruzione del protocollo di recupero CCR (#8033):** la prima volta che CCR sostituisce ≥1 blocco in una
richiesta, l'engine antepone un singolo messaggio `system` idempotente (che inizia con la
sentinella `[CCR protocol]`) per spiegare al chiamante il contratto tra marcatore e strumento: cosa significa un
marcatore `[CCR retrieve hash=<24hex> chars=N]`, che l'hash deve essere copiato testualmente
(tutti i 24 caratteri esadecimali — gli hash copiati in modo errato sono la probabile causa degli errori
"block not found") e che un marcatore `[dedup:ref sha=...]` significa "cerca nella cronologia", non "chiama lo
strumento". La nota viene inserita **solo quando gli `tools[]` dichiarati dal chiamante dimostrano che può
effettivamente raggiungere `omniroute_ccr_retrieve`** (`callerSupportsCcrRetrieve()` in
`open-sse/services/compression/engines/ccr/protocolInstruction.ts`) — un semplice
chiamante compatibile con OpenAI privo di tale strumento non riceve mai l'istruzione di chiamare qualcosa
che non può raggiungere. L'idempotenza viene garantita esaminando la cronologia dei messaggi alla ricerca della sentinella
prima dell'inserimento, così le richieste multi-turno (che riproducono i messaggi precedenti) non accumulano la
nota a ogni turno.

## Caveman

La modalità Caveman si concentra sulla condensazione semantica del testo normale:

- preserva blocchi di codice, URL, JSON, percorsi e dati strutturati
- rimuove riempitivi, formulazioni dubitative, contesto ripetuto e connettivi prolissi
- supporta pacchetti di regole specifici per lingua in `open-sse/services/compression/rules/`
- rimane disponibile tramite le modalità legacy `standard`, `aggressive` e `ultra`

La relativa sezione della dashboard è `Dashboard -> Context & Cache -> Caveman`.

Il progetto upstream Caveman dichiara una riduzione di circa il `~75%` dei token di output e un risparmio medio
sull'output del `65%` nei benchmark, con un intervallo del `22-87%`, oltre a uno strumento di compressione
dell'input del `~46%`. OmniRoute utilizza il dato di Caveman relativo all'input quando documenta i risparmi
combinati su prompt e contesto; la modalità di output di Caveman rimane una funzionalità separata relativa
al comportamento delle risposte.

## RTK

La modalità RTK si concentra sull'output di comandi e strumenti:

- rileva classi di output quali `git status`, `git branch`, `git diff`, Vitest/Jest/Pytest,
  test Cargo/Go, build TypeScript/Vite/Webpack, ESLint, audit/installazioni npm, log Docker,
  `find`/`grep` della shell, stack trace e log generici
- applica 49 filtri JSON da `open-sse/services/compression/engines/rtk/filters/`
- supporta la pipeline dichiarativa in stile RTK: rimozione ANSI, sostituzione, short-circuit
  in caso di corrispondenza dell'output, rimozione/mantenimento delle righe, troncamento per riga,
  troncamento di testa/coda/numero massimo di righe e fallback in caso di output vuoto
- supporta filtri di progetto subordinati all'attendibilità in `.rtk/filters.json` e filtri globali in
  `DATA_DIR/rtk/filters.json`
- rimuove sequenze ANSI, rumore di avanzamento, righe ripetute e testo standard non utile
- preserva errori su cui è possibile intervenire, avvisi, riepiloghi, file modificati e contesto finale
- può facoltativamente conservare l'output grezzo oscurato per il ripristino/debug tramite route di gestione
  autenticate

La relativa sezione della dashboard è `Dashboard -> Context & Cache -> RTK`.

I dettagli operativi relativi a filtri personalizzati, attendibilità, verifica e recupero dell'output grezzo sono disponibili in
[`RTK_COMPRESSION.md`](./RTK_COMPRESSION.md).

Il progetto upstream RTK dichiara un risparmio del `60-90%` per la compressione dell'output dei comandi. L'esempio
nel suo README mostra una sessione Claude Code di 30 minuti che passa da `~118,000` token a `~23,900`, con un
risparmio del `79.7%`.

## LLMLingua-2 (Potatura semantica)

La modalità LLMLingua-2 esegue la **potatura semantica dei token** sul testo utilizzando un piccolo classificatore
di token ONNX, integrando i motori Caveman e RTK basati su regole:

- comprime il testo solo nei messaggi non di sistema; i blocchi di codice delimitati e gli altri costrutti
  preservati non vengono mai modificati
- esegue il backend `@atjsh/llmlingua-2` (ONNX tramite `@huggingface/transformers`) in un
  thread worker, affinché l'inferenza del modello non blocchi mai l'event loop della richiesta
- è **combinabile** (`stackPriority` 35): in una pipeline combinata viene eseguito dopo i
  motori strutturali (CCR, session-dedup, headroom, Caveman), ma prima di `ultra`, poiché
  la potatura semantica è più efficace su testo già compresso strutturalmente, ad esempio
  `rtk -> caveman -> llmlingua`
- **in caso di qualsiasi errore continua senza interrompersi** (dipendenze facoltative mancanti, avvio del worker, caricamento del modello, inferenza
  o timeout) → il testo originale viene restituito invariato, senza mai generare un errore

Posizione del motore: `open-sse/services/compression/engines/llmlingua/`. La relativa sezione della dashboard
è `Dashboard -> Context & Cache -> LLMLingua`.

### Modelli

Il modello predefinito è **TinyBERT** (`atjsh/llmlingua-2-js-tinybert-meetingbank`, ~57 MB,
veloce). Un modello **BERT-base** con maggiore accuratezza (`Arcoldd/llmlingua4j-bert-base-onnx`,
~710 MB) è disponibile tramite il campo `model` della configurazione del motore. `@huggingface/transformers`
scarica in modo differito il modello selezionato dall'HuggingFace Hub in
`${DATA_DIR}/models/llmlingua` alla prima chiamata (`modelStore.ts`); un override di configurazione `modelPath`
lo indirizza invece a una copia locale (per installazioni offline / isolate dalla rete).

### Dipendenze facoltative e installazione su richiesta

Lo stack di peer runtime potabile di LLMLingua è **facoltativo**. Due pacchetti sono dichiarati come
`optionalDependencies` in `package.json` e mantenuti **esterni** dalla build di produzione
(`scripts/build/prepublish.ts` non li include nel bundle):

| Pacchetto            | Versione (fissata) | Note                                                |
| -------------------- | ------------------ | --------------------------------------------------- |
| `@atjsh/llmlingua-2` | `2.0.5`            | Pacchetto di ingresso; dichiara gli altri come peer |
| `js-tiktoken`        | `^1.0.20`          | Tokenizer                                           |

`@huggingface/transformers` è fissato alla versione `^4.2.0` (condiviso con il percorso degli embedding locali e
incluso anche nel bundle standalone); `@atjsh/llmlingua-2@2.0.5` lo dichiara come peer con
`"^3.5.2 || ^4.0.0"`, quindi sono supportate sia la versione 3 sia la versione 4 di Transformers.js. Dalla versione 2.0.4,
`@atjsh/llmlingua-2` non richiede più `@tensorflow/tfjs`, eliminando dallo stack SLM il componente singolo
più ingombrante (TensorFlow.js). Solo i due pacchetti sopra indicati sono peer SLM rimovibili.
Un normale `npm install` (sviluppo) installa automaticamente lo stack facoltativo, a meno che le dipendenze
facoltative non vengano omesse.

**Perché su richiesta:** il pacchetto pubblicato su npm, il bundle standalone e l'immagine Docker
vengono distribuiti **senza** queste dipendenze per rimanere compatti. Quando sono assenti, il controllo
delle dipendenze del worker (una verifica di risoluzione di `@atjsh/llmlingua-2` in `worker.ts`) non riesce e il motore
**continua silenziosamente senza interrompersi**: la selezione di LLMLingua non produce alcun effetto (il testo viene restituito invariato, senza
registrare errori). Per attivarlo in un ambiente alleggerito, installare lo stack facoltativo:

```bash
# fissa le versioni dichiarate in optionalDependencies di package.json
npm install @atjsh/llmlingua-2@2.0.5 js-tiktoken
```

La rimozione di `@tensorflow/tfjs` (2.0.4+) elimina il componente precedentemente dominante da circa 800 MB:
l'ingombro rimanente è costituito dai runtime transformers.js + onnxruntime-node, oltre al modello TinyBERT
(~57 MB) scaricato al primo utilizzo (non tramite npm).

Per ambiente:

- **Dev / `npm install`** — installato automaticamente, a meno che non sia stata passata l'opzione `--omit=optional`
  (o `--no-optional`). Non è necessaria alcuna azione.
- **npm globale (`npm i -g omniroute`) / standalone** — eseguire il comando di installazione riportato sopra all'interno
  della directory del pacchetto installato oppure reinstallare senza omettere le dipendenze opzionali.
- **Docker** — aggiungere il comando di installazione in un livello di un'immagine derivata; l'immagine pubblicata
  è volutamente minimale.
- **VPS (PM2)** — installare nel `node_modules` dell'app, quindi riavviare il processo affinché
  il worker verifichi nuovamente il gate.
- **Next standalone non elaborato (`npm run build` → `.build/next/standalone/server.js`)** — il
  trace standalone non include NÉ il worker NÉ le dipendenze opzionali, pertanto il motore
  esegue silenziosamente il fail-open. `scripts/build/colocate-standalone.mjs` riapplica entrambi (worker esbuild +
  chiusura delle dipendenze opzionali nell'albero standalone); viene eseguito automaticamente tramite l'hook npm
  `postbuild` dopo ogni build. Idempotente e con fallimento non bloccante quando le dipendenze sono assenti.

**Verificare che sia attivo:** con LLMLingua selezionato, il testo reale viene effettivamente ridotto (il motore
smette di eseguire il fail-open) e la prima richiesta attiva il download del modello in
`${DATA_DIR}/models/llmlingua`. Il gate verifica intenzionalmente solo `@atjsh/llmlingua-2` —
gli altri peer sono esclusivamente ESM e `require.resolve` genera un'eccezione su di essi anche quando sono presenti — quindi
il worker continua a eseguire il fail-open se un qualsiasi peer risulta effettivamente mancante al momento di `import()`.

## Pipeline impilate

La modalità impilata esegue i passaggi della pipeline in ordine. L'impostazione predefinita è:

```txt
rtk -> caveman
```

Usala per le sessioni con agenti di programmazione in cui un prompt combina l'output dei comandi con prosa umana o dell'assistente. RTK riduce prima i log prolissi degli strumenti, quindi Caveman comprime il linguaggio naturale rimanente.

I passaggi della pipeline vengono configurati tramite `stackedPipeline` nelle impostazioni di compressione o mediante combinazioni di compressione.

Quando entrambi i motori riducono lo stesso payload idoneo, i risparmi si combinano:

```txt
combined = 1 - (1 - risparmio RTK) * (1 - risparmio sull'input di Caveman)
media    = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
intervallo = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

## Filtro dell'albero di accessibilità MCP

Il filtro intelligente dell'albero di accessibilità MCP è un livello di compressione successivo all'esecuzione che opera sui **risultati degli strumenti** MCP, non sui prompt o sul contesto. È destinato ai payload prolissi degli alberi di accessibilità e delle istantanee del browser restituiti da strumenti come Playwright, computer-use e i server MCP per l'automazione del browser.

### Funzionamento

1. **Rimozione del rumore** — rimuove le voci generiche/di testo vuote (`- generic:`, `- text: ""`)
2. **Compressione degli elementi adiacenti** — quando ≥ `collapseThreshold` (valore predefinito: 30) righe consecutive sono ripetizioni strutturali, le comprime nelle prime `collapseKeepHead` (valore predefinito: 10) righe + un riepilogo del conteggio + le ultime `collapseKeepTail` (valore predefinito: 5) righe
3. **Conservazione dei riferimenti** — gli ancoraggi `[ref=eXX]` richiesti da Playwright/computer-use non vengono mai modificati
4. **Troncamento forzato** — se il testo dopo la compressione supera ancora `maxTextChars` (valore predefinito: 50.000), viene troncato aggiungendo un suggerimento di navigazione, in modo che l'agente possa continuare a operare

### Posizione del motore

```txt
open-sse/services/compression/engines/mcpAccessibility/
  index.ts            ← punto di ingresso di smartFilterText()
  collapseRepeated.ts ← algoritmo di compressione degli elementi adiacenti
  constants.ts        ← DEFAULT_MCP_ACCESSIBILITY_CONFIG
```

### Configurazione

Controllata da `compression.mcpAccessibility` nelle impostazioni globali (migrazione 056). Configurazione predefinita:

```json
{
  "enabled": true,
  "maxTextChars": 50000,
  "collapseThreshold": 30,
  "collapseKeepHead": 10,
  "collapseKeepTail": 5,
  "minLengthToProcess": 2000
}
```

Il filtro viene applicato solo ai payload dei risultati degli strumenti il cui `type` è `"text"` e la cui lunghezza supera `minLengthToProcess`. Non influisce sulla compressione dei prompt o sui payload delle richieste.

### Risparmio previsto

60–80% sui risultati degli strumenti per le istantanee del browser, a seconda della complessità della pagina. L'algoritmo di compressione ha complessità O(n) rispetto al numero di righe e aggiunge una latenza trascurabile.

### Confronto tra questo filtro e i motori di compressione precedenti

| Aspetto                  | Caveman / RTK / Stacked                     | Filtro di accessibilità MCP            |
| ------------------------ | ------------------------------------------- | -------------------------------------- |
| Destinazione             | Prompt / contesto delle richieste           | Risultati degli strumenti MCP          |
| Attivazione              | Impostazione della modalità di compressione | `compression.mcpAccessibility.enabled` |
| Ambito                   | Tutti i messaggi SSE                        | Solo risultati degli strumenti         |
| Ancoraggi di riferimento | N/D                                         | Conservati incondizionatamente         |

---

## Combinazioni di compressione

Le combinazioni di compressione sono profili di compressione denominati che possono essere assegnati alle combinazioni di routing:

- `compression_combos`: archivia modalità, pipeline, configurazione RTK, configurazione della lingua e indicatore predefinito
- `compression_combo_assignments`: associa una combinazione di compressione a una combinazione di routing
- l'integrazione in fase di esecuzione risolve una combinazione di compressione assegnata prima delle sostituzioni generiche delle combinazioni
- i dati analitici includono `compression_combo_id` ed `engine`

Sezione della dashboard: `Dashboard -> Context & Cache -> Compression Combos`.

## Superficie API

| Route                                  | Scopo                                                                               |
| -------------------------------------- | ----------------------------------------------------------------------------------- |
| `/api/settings/compression`            | Impostazioni globali di compressione (include la configurazione `mcpAccessibility`) |
| `/api/compression/preview`             | Anteprima di qualsiasi modalità di compressione                                     |
| `/api/compression/language-packs`      | Elenca i pacchetti linguistici Caveman disponibili                                  |
| `/api/context/caveman/config`          | Alias delle impostazioni Caveman                                                    |
| `/api/context/rtk/config`              | Valori predefiniti e impostazioni RTK                                               |
| `/api/context/rtk/filters`             | Catalogo dei filtri RTK                                                             |
| `/api/context/rtk/test`                | Endpoint di anteprima/test RTK                                                      |
| `/api/context/rtk/raw-output/[id]`     | Recupero autenticato dell'output grezzo con dati sensibili rimossi                  |
| `/api/context/combos`                  | CRUD delle combinazioni di compressione                                             |
| `/api/context/combos/[id]/assignments` | CRUD delle assegnazioni alle combinazioni di routing                                |
| `/api/context/analytics`               | Alias dei dati analitici sulla compressione                                         |

Le route di gestione richiedono l'autenticazione di gestione o verifiche dei criteri relativi alla chiave API.

## Strumenti MCP

La compressione espone cinque strumenti MCP:

| Strumento                           | Ambito              | Scopo                                           |
| ----------------------------------- | ------------------- | ----------------------------------------------- |
| `omniroute_compression_status`      | `read:compression`  | Impostazioni, dati analitici, statistiche cache |
| `omniroute_compression_configure`   | `write:compression` | Aggiorna le impostazioni globali                |
| `omniroute_set_compression_engine`  | `write:compression` | Imposta modalità e pipeline facoltativa         |
| `omniroute_list_compression_combos` | `read:compression`  | Elenca le combinazioni di compressione          |
| `omniroute_compression_combo_stats` | `read:compression`  | Legge i dati analitici di combinazioni/motori   |

## Ambito ed esclusioni

**Gli embedding non vengono mai compressi.** `open-sse/handlers/embeddings.ts` non richiama mai alcun
motore di compressione: i corpi di richiesta/risposta vengono passati direttamente all'esecutore senza modifiche.
Attualmente ciò è garantito a livello strutturale (gli embedding e i completamenti chat sono gestiti da handler distinti), non da un
controllo in fase di esecuzione, ma significa che il problema della distorsione vettoriale descritto in #8034 non presenta alcuna superficie di esposizione
nel percorso degli embedding.

**Filtro di esclusione per modello/endpoint (#8034).** Per i completamenti chat, un operatore può specificare
gli ID dei modelli o le destinazioni `provider/model` che non devono mai essere compressi: una misura di protezione utile nel caso in cui
la compressione venga in futuro integrata più vicino a un percorso adiacente agli embedding e, in generale, utile
per qualsiasi modello in cui sia importante preservare il prompt esattamente byte per byte (valutazioni deterministiche, prefissi
sensibili alla cache, ecc.).

- Campo delle impostazioni: `exclusions?: string[]` nella configurazione globale della compressione
  (`GET`/`PUT /api/settings/compression`), reso persistente tramite lo spazio dei nomi di compressione `key_value`
  esistente (`src/lib/db/compression.ts`), senza una nuova tabella.
- Scheda della dashboard: **Dashboard → Compression → Exclusions**
  (`/dashboard/compression/exclusions`).
- Sintassi dei pattern: `*` è l'unico carattere jolly. Ogni altro metacarattere regex in un pattern viene
  sottoposto a escape prima della corrispondenza, quindi `gpt-5.6` corrisponde solo alla stringa letterale, mai a `gpt-5x6`
  (sicuro rispetto a ReDoS, limitato, senza quantificatori annidati). I pattern vengono confrontati senza distinzione tra maiuscole e minuscole
  sia con il solo ID del modello sia con il valore composito `provider/model`: `gpt-5-6`, `openai/gpt-5-6`
  e `openai/*` sono tutti validi, mentre `*` da solo esclude ogni modello.
- Corrispondenza: `isCompressionExcluded()` / `normalizeCompressionExclusions()` in
  `open-sse/services/compression/exclusions.ts`. `chatCore.ts` verifica la destinazione esclusa
  subito dopo aver risolto le impostazioni di compressione, **prima dell'esecuzione di qualsiasi motore**, e tratta una corrispondenza
  esattamente come se la compressione fosse disabilitata globalmente: il corpo della richiesta è dimostrabilmente
  identico byte per byte. Il salto viene registrato tramite `writeCompressionSkip(..., "excluded")` per
  renderlo visibile nei dati analitici.
- Valore predefinito (elenco vuoto/assente): comportamento identico a quello precedente a #8034, senza alcuna esclusione.

## Limitazioni note

- **LLMLingua-2 (SLM) richiede dipendenze opzionali collocate.** Il worker viene eseguito in una
  build di produzione solo quando `@atjsh/llmlingua-2` e le dipendenze peer sono collocate in
  `dist/node_modules` (vedere `scripts/build/colocateOptionals.mjs`, #4286). In loro assenza,
  il motore continua senza generare errori (restituendo il testo originale). La risoluzione
  del worker non dipende più da `import.meta.url` (che non funziona nel bundle autonomo), ma
  si basa sulla cwd di runtime / `argv[1]`.
- **I pacchetti linguistici Caveman `de` / `fr` / `ja` sono parziali.** Includono regole
  `context` + `filler` + `structural`, ma non i pacchetti `dedup` / `ultra`; di conseguenza,
  per queste lingue l'intensità `ultra` non è più forte di `full` (utilizzano esclusivamente
  le proprie regole: non viene applicato alcun fallback implicito alle regole inglesi
  `dedup`/`ultra`, che altererebbero il testo in lingua straniera). `en` / `es` / `id` /
  `pt-BR` sono completi. Sono benvenuti contributi di `dedup.json` + `ultra.json` per i
  pacchetti parziali.
- **La telemetria in stack elenca solo i motori che hanno eseguito la compressione.** Un
  passaggio della pipeline in stack il cui motore è stato eseguito ma ha prodotto un
  risparmio dello 0 % restituisce `stats:null` e pertanto non compare in `engineBreakdown`,
  risultando indistinguibile da un passaggio ignorato. Distinguere tra "eseguito, 0 %" e
  "ignorato" richiederebbe una modifica al modello di analisi dettagliata ed è stato
  rimandato.

## Validazione

I controlli mirati per quest'area sono:

```bash
node --import tsx/esm --test tests/unit/compression/rtk-*.test.ts tests/unit/compression/pipeline-integration.test.ts tests/unit/compression/context-compression-api.test.ts
node --import tsx/esm --test tests/unit/compression/*.test.ts tests/golden-set/*.test.ts tests/integration/compression-pipeline.test.ts tests/unit/api/compression/compression-api.test.ts
node --import tsx/esm --test tests/unit/compression/mcpAccessibility*.test.ts
npm run typecheck:core
```
