# 🗜️ Prompt Compression Guide — OmniRoute (Italiano)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_GUIDE.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_GUIDE.md)

---

> Risparmia automaticamente il 15-95% sul contesto idoneo. Per una panoramica rapida, consulta la [sezione Compressione del README](../README.md#%EF%B8%8F-prompt-compression--save-15-95-eligible-tokens-automatically).

## Panoramica

OmniRoute implementa una pipeline modulare di compressione dei prompt che viene eseguita **proattivamente** prima che le richieste raggiungano i provider upstream. Ciò significa che il risparmio di token avviene in modo trasparente, senza richiedere modifiche al flusso di lavoro.

```
Richiesta del client
  → Selettore della strategia di compressione
    → Override della combinazione? → Usa l'impostazione della combinazione
    → Soglia di attivazione automatica? → Usa la modalità automatica
    → Modalità predefinita? → Usa l'impostazione globale
    → Disattivata? → Salta la compressione
  → Modalità di compressione selezionata
    → Disattivata: nessuna compressione
    → Lite: pulizia sicura di spaziatura/formattazione (~15%)
    → Standard: rimozione delle espressioni superflue in stile telegrafico (~30%)
    → Aggressive: invecchiamento della cronologia + riepilogo (~50%)
    → Ultra: potatura euristica + snellimento dei blocchi di codice (~75%)
    → RTK: filtraggio dell'output di terminale/strumenti basato sui comandi (intervallo upstream del 60-90%)
    → Stacked: pipeline ordinata con più motori, generalmente RTK seguito da Caveman (intervallo idoneo del 78-95%)
  → Richiesta compressa → Provider
```

---

## Modalità di compressione

### Off

Non viene applicata alcuna compressione. Tutti i messaggi vengono trasmessi senza modifiche.

### Modalità Lite (risparmio ~15%, latenza <1ms)

La modalità più sicura: nessuna modifica semantica, solo pulizia della formattazione:

| Tecnica                  | Descrizione                                        |
| ------------------------ | -------------------------------------------------- |
| `collapseWhitespace`     | Unisce righe vuote consecutive e spazi finali      |
| `dedupSystemPrompt`      | Rimuove i messaggi di sistema duplicati            |
| `compressToolResults`    | Comprime gli output prolissi di strumenti/funzioni |
| `removeRedundantContent` | Elimina le istruzioni ripetute                     |
| `replaceImageUrls`       | Abbrevia gli URI dei dati immagine in base64       |

**Ideale per:** utilizzo continuo, flussi di lavoro critici per la sicurezza.

### Modalità Standard (risparmio ~30%)

Ispirata a [Caveman](https://github.com/JuliusBrussee/caveman): rimuove le parole superflue e le formulazioni prolisse preservandone il significato:

- Rimuove le parole superflue ("please", "I think", "basically", "actually")
- Condensa le espressioni prolisse ("in order to" → "to", "as a result of" → "because")
- Elimina le formule di cortesia attenuanti ("Would you mind...", "If you could possibly...")
- Oltre 30 regole regex ottimizzate per i prompt di programmazione

**Ideale per:** flussi di lavoro quotidiani di programmazione, team attenti ai costi.

### Modalità Aggressive (risparmio ~50%)

Gestione intelligente della cronologia per sessioni lunghe:

- **Invecchiamento dei messaggi** — i messaggi meno recenti vengono compressi progressivamente
- **Riepilogo dei risultati degli strumenti** — gli output lunghi degli strumenti vengono sostituiti da riepiloghi
- **Protezioni dell'integrità strutturale** — garantiscono che le coppie `tool_use` + `tool_result` rimangano coerenti
- **Consapevolezza della finestra di contesto** — rispetta i limiti di token specifici di ciascun modello

**Ideale per:** sessioni di debug prolungate, codebase di grandi dimensioni.

### Modalità Ultra (risparmio ~75%)

Compressione massima per scenari in cui i token sono critici:

- **Potatura euristica** — rimuove i messaggi al di sotto della soglia di rilevanza
- **Snellimento dei blocchi di codice** — comprime gli esempi di codice ripetitivi
- **Troncamento mediante ricerca binaria** — individua il punto di taglio ottimale per la finestra di contesto
- Include tutte le funzionalità della modalità Aggressive

**Ideale per:** quando si raggiungono ripetutamente i limiti del contesto.

### Modalità RTK (intervallo upstream del 60-90%)

La modalità RTK è ottimizzata per gli output prolissi degli strumenti presenti nelle sessioni degli agenti di programmazione:

- Rileva classi di comandi/output come `git status`, `git diff`, `git log`, strumenti di esecuzione dei test,
  build TypeScript/Vite/Webpack, ESLint/Biome/Prettier, audit/installazioni npm, log Docker, output
  dell'infrastruttura e output generico della shell
- Applica i pacchetti di filtri JSON da `open-sse/services/compression/engines/rtk/filters/`
- Importa i filtri RTK con schema TOML v1 dai file `filters.toml` di progetto o globali, con validazione
  dei test inline e controllo dell'attendibilità per i file di progetto
- Include 49 filtri integrati con esempi inline di verifica
- Rimuove sequenze di controllo ANSI, barre di avanzamento, righe ripetute e rumore non utilizzabile
- Preserva errori, avvisi, file modificati, riepiloghi e la parte finale degli output lunghi
- Supporta filtri di progetto soggetti a controllo dell'attendibilità, filtri globali e il ripristino facoltativo dell'output grezzo con dati sensibili rimossi

**Ideale per:** sessioni di agenti con trascrizioni di shell, build, test, git, grep e output di file.

### Modalità Stacked (intervallo idoneo del 78-95%)

La modalità Stacked esegue più motori di compressione in un ordine deterministico. La pipeline predefinita è:

```txt
RTK -> Caveman
```

Questo ordine rende innanzitutto compatti gli output di terminale/strumenti, quindi applica la condensazione semantica di Caveman
al prompt in linguaggio naturale rimanente. Le pipeline Stacked possono essere configurate globalmente oppure tramite
combinazioni di compressione assegnate alle combinazioni di routing.

**Ideale per:** contesti misti con log di strumenti di grandi dimensioni insieme a istruzioni umane o riepiloghi dell'assistente.

---

## Calcolo dei risparmi upstream

OmniRoute documenta i risparmi derivanti dalla compressione sulla base di due fonti: i benchmark dei progetti upstream e
la composizione dei motori di OmniRoute.

| Fonte   | Valore del README upstream utilizzato qui                                                                                                                       |
| ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Caveman | `~75%` di token di output in meno, `65%` di risparmio medio sull'output nei benchmark, intervallo `22-87%` e strumento di compressione dell'input pari a `~46%` |
| RTK     | Risparmio del `60-90%` sull'output dei comandi; sessione di esempio da `~118,000 -> ~23,900` token, ossia `79.7%` risparmiato (`~80%`)                          |

Per i payload di strumenti/contesto sovrapposti, la combinazione predefinita di OmniRoute applica i motori in sequenza:

```txt
RTK -> Caveman
```

I risparmi combinati sono moltiplicativi, non additivi:

```txt
combined = 1 - (1 - RTK savings) * (1 - Caveman input savings)
average  = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
range    = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

Quel valore `78-95%` si applica quando sia RTK sia Caveman possono ridurre lo stesso payload di input/contesto.
La modalità di output delle risposte di Caveman è separata: quando è abilitata, utilizza i risparmi sull'output propri di Caveman (`65%`
in media, `~75%` come valore principale, intervallo `22-87%`). I risparmi totali sulla fatturazione dipendono dalla combinazione di prompt e output.

### Cosa significa realmente "idoneo"

L'intervallo principale del 15-95% è reale, ma si applica soltanto ai contenuti **ridondanti o prolissi**: righe
di errore ripetute, un log di build che ripete continuamente lo stesso avviso, un output sovradimensionato di `grep`/lettura di file. Ciò
**non** significa che ogni richiesta consenta un tale risparmio.

Verificato empiricamente (`tests/unit/compression/stacked-compression-tool-result-savings.test.ts`): un'esecuzione
`stacked` (RTK + Caveman) su un blocco `tool_result` in formato Anthropic contenente 300 righe di
errore identiche ha prodotto un **risparmio di token del 95.93% / risparmio di caratteri del 96.26%**, pienamente
compreso nell'intervallo pubblicizzato. Tuttavia, la stessa pipeline eseguita sull'output normale e non ridondante di uno strumento (un elenco pulito di corrispondenze di `grep`,
una breve lettura di file, normale testo conversazionale) produce correttamente **risparmi prossimi allo zero**, perché
non vi è nulla di ripetitivo da rimuovere e `validateCompression()` (`validation.ts`) impedisce l'invio di una
riscrittura che eliminerebbe o modificherebbe blocchi di codice, URL, intestazioni, versioni o identificatori di costanti in MAIUSCOLO.

Questo è il comportamento previsto e sicuro, non un bug: una sessione di programmazione che principalmente legge/esegue grep su file puliti
registrerà risparmi totali modesti anche con la compressione completamente abilitata, mentre una sessione che incontra un ciclo
in errore o un linter prolisso registrerà l'intero intervallo del 78-95% su quel traffico. Non utilizzare la bassa percentuale
di risparmio aggregato di una singola sessione come prova che la compressione sia configurata in modo errato: verifica prima se
l'output sottostante dello strumento fosse effettivamente ridondante.

---

## Visualizzazione del risparmio di token

```
Senza compressione: 47K token inviati all'LLM
Con Lite:           40K token inviati          (15% risparmiato — sicura, sempre attiva)
Con Standard:       33K token inviati          (30% risparmiato — regole caveman-speak)
Con Aggressive:     24K token inviati          (50% risparmiato — invecchiamento + riepilogo)
Con Ultra:          12K token inviati          (75% risparmiato — potatura euristica)
Con RTK:            19K-5K token inviati       (60-90% risparmiato sull'output di comandi/strumenti)
Con Stacked:        10K-2.5K token inviati     (intervallo idoneo RTK+Caveman del 78-95%)
```

---

## Configurazione

### Dashboard

Vai a `Dashboard → Context & Cache`:

- **Caveman** — selezione della modalità, pacchetti linguistici, anteprima e impostazioni predefinite globali
- **RTK** — anteprima del filtro dei comandi, impostazioni di sicurezza RTK e catalogo dei filtri
- **Combinazioni di compressione** — pipeline di motori denominate assegnate alle combinazioni di routing
- **Soglia di attivazione automatica** — attiva automaticamente la compressione quando il numero di token supera la soglia

### Override per combinazione

In `Dashboard → Context & Cache → Compression Combos`, assegna una combinazione di compressione a una
combinazione di routing:

```txt
Combinazione: "free-tier-fallback"
  Combinazione di compressione: "coding-agent-stack"
  Pipeline: RTK -> Caveman
  Destinazioni:
    1. if/kimi-k2.7-code
    2. if/qwen3.8-max-preview
```

Ciò consente di utilizzare la compressione in sequenza sui provider gratuiti/di coding, mantenendo al contempo la modalità lite per gli
abbonamenti a pagamento.

Questa assegnazione "Override per combinazione" è un controllo diverso dall'override della **modalità di compressione della
combinazione di routing** (Predefinita/Disattivata/Lite/Standard/Aggressiva/Ultra): tale override non seleziona una pipeline
di combinazione di compressione denominata; imposta semplicemente il campo `compressionMode` consultato da
`resolveCompressionPlan`. Può essere configurato sulla scheda della combinazione (`Dashboard → Combos`) oppure, a partire dalla
#6760, per ogni combinazione di routing nell'elenco "Assign to routing" in
`Dashboard → Context & Cache → Compression Combos`, accanto alla casella di controllo per l'assegnazione della pipeline
documentata sopra. Entrambe le interfacce salvano le modifiche tramite lo stesso endpoint `PUT /api/combos/{id}`.

### Override per richiesta

Invia l'header di richiesta `x-omniroute-compression` per ignorare il piano di compressione per una singola
richiesta. Ha la precedenza massima: prevale sull'override della combinazione di routing, sul profilo attivo,
sull'attivazione automatica e sull'impostazione Predefinita del pannello. I valori sconosciuti vengono ignorati (la richiesta non viene mai rifiutata) e
l'interruttore principale globale continua a controllare tutto: quando la compressione è disattivata globalmente, l'header non può
attivarla. Valori:

| Valore        | Effetto                                                                                                           |
| ------------- | ----------------------------------------------------------------------------------------------------------------- |
| `off`         | Nessuna compressione per questa richiesta.                                                                        |
| `default`     | Il profilo Predefinito derivato dal pannello (ignora il profilo attivo).                                          |
| `engine:<id>` | Un singolo motore, se abilitato, ad esempio `engine:rtk`.                                                         |
| `<combo>`     | Una combinazione denominata, cercata prima per nome (senza distinzione tra maiuscole e minuscole), quindi per ID. |

Il piano applicato viene restituito nell'header di risposta `X-OmniRoute-Compression: <mode>; source=<source>`,
dove `<source>` può essere `request-header`, `routing-override`, `active-profile`,
`auto-trigger`, `default` oppure `off`.

### API

```bash
# Ottieni le impostazioni di compressione
curl http://localhost:20128/api/settings/compression

# Aggiorna le impostazioni di compressione
curl -X PUT http://localhost:20128/api/settings/compression \
  -H "Content-Type: application/json" \
  -d '{"defaultMode":"stacked","autoTriggerMode":"stacked","autoTriggerTokens":32000}'

# Visualizza l'anteprima di un payload RTK/stacked specifico
curl -X POST http://localhost:20128/api/compression/preview \
  -H "Content-Type: application/json" \
  -d '{"mode":"rtk","messages":[{"role":"tool","content":"npm test output here"}]}'

# Elenca i pacchetti di filtri RTK
curl http://localhost:20128/api/context/rtk/filters

# Testa direttamente RTK con metadati del comando facoltativi
curl -X POST http://localhost:20128/api/context/rtk/test \
  -H "Content-Type: application/json" \
  -d '{"command":"npm test","text":"FAIL tests/example.test.ts\nError: boom"}'
```

---

## Cosa viene protetto

Il motore di compressione **preserva sempre:**

- ✅ Blocchi di codice (delimitati e inline)
- ✅ URL e percorsi di file
- ✅ Strutture JSON e dati strutturati
- ✅ Identificatori e token tecnici protetti
- ✅ Espressioni matematiche
- ✅ Definizioni delle chiamate a strumenti/funzioni
- ✅ Prompt di sistema (in modalità lite)

Il recupero dell'output grezzo di RTK oscura le comuni chiavi API, i bearer token, i token Slack, le chiavi di accesso AWS,
le password, i token e i segreti prima che qualsiasi dato venga reso persistente.

---

## Statistiche di compressione

Ogni richiesta compressa include statistiche nei log del server:

```json
{
  "originalTokens": 47200,
  "compressedTokens": 40120,
  "savingsPercent": 15.0,
  "techniquesUsed": ["collapseWhitespace", "dedupSystemPrompt"],
  "mode": "lite",
  "engine": "caveman",
  "compressionComboId": "coding-agent-stack",
  "durationMs": 0.8,
  "rtkRawOutputPointers": []
}
```

---

## Roadmap delle fasi

| Fase    | Modalità                                                                                                                                                               | Stato         |
| ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| Fase 1  | Off, Lite                                                                                                                                                              | ✅ Rilasciata |
| Fase 2  | Standard, Aggressive, Ultra                                                                                                                                            | ✅ Rilasciata |
| Fase 3  | RTK, Stacked, combinazioni di compressione                                                                                                                             | ✅ Rilasciata |
| Fase 4  | Stili di output, Ultra di livello SLM, infrastruttura di valutazione                                                                                                   | ✅ Rilasciata |
| Fase 4C | Budget di contesto adattivo ("manopola") — motore di calcolo + API (`contextBudget` su `PUT /api/settings/compression`) + controlli di modalità/policy nella dashboard | ✅ Rilasciata |

---

## Ringraziamenti

Le regole di compressione della modalità Standard sono ispirate a **[Caveman](https://github.com/JuliusBrussee/caveman)** di **[JuliusBrussee](https://github.com/JuliusBrussee)** (⭐ 51K+) — il progetto virale "perché usare molti token quando pochi token bastano". Caveman dichiara `~75%` di token di output in meno, un risparmio medio dei token di output del `65%` nei benchmark, un intervallo di risparmio dell'output del `22-87%` e uno strumento di compressione dell'input del `~46%`.

La modalità RTK è ispirata a **[RTK - Rust Token Killer](https://github.com/rtk-ai/rtk)** di **[RTK AI](https://github.com/rtk-ai)** — il progetto ad alte prestazioni per la compressione dell'output di comandi destinato al filtraggio dell'output di terminale, build, test, git e strumenti. RTK dichiara risparmi del `60-90%`, con una sessione di esempio nel suo README che mostra un risparmio del `~80%`.

---

## Sistemi di compressione avanzati

Oltre alle 7 modalità standard, OmniRoute include diversi sistemi di compressione
avanzati che operano automaticamente in base al contesto.

### Compressione sensibile alla cache

Alcuni provider (come Anthropic con il caching dei prompt) supportano il **caching dei prompt**,
che consente loro di memorizzare nella cache parti del prompt per ridurre costi e latenza. Quando
il caching è abilitato, una compressione aggressiva può effettivamente **peggiorare** le prestazioni
perché modifica i token memorizzati nella cache, invalidandola.

Il modulo `cachingAware.ts` risolve questo problema **rilevando il contesto di caching** e
**adattando di conseguenza la strategia di compressione**.

#### Come funziona

1. **Rileva il contesto di caching** — Analizza il corpo della richiesta alla ricerca di marcatori `cache_control`
2. **Identifica i provider con caching** — Verifica se il provider di destinazione supporta il caching
3. **Adatta la strategia** — Retrocede `aggressive`/`ultra` a `standard` per i provider con caching
4. **Esclude il prompt di sistema** — I prompt di sistema vengono solitamente memorizzati nella cache, quindi non vengono compressi
5. **Usa trasformazioni deterministiche** — Utilizza solo trasformazioni che producono un output coerente

#### Esempio di codice

```ts
import {
  detectCachingContext,
  getCacheAwareStrategy,
} from "@omniroute/open-sse/services/compression/cachingAware";

const body = {
  model: "anthropic/claude-sonnet-4.5",
  messages: [{ role: "user", content: "Hello" }],
  cache_control: { type: "ephemeral" }, // ← Marcatore della cache
};

const ctx = detectCachingContext(body, { provider: "anthropic" });
// → { hasCacheControl: true, provider: "anthropic", isCachingProvider: true }

const strategy = getCacheAwareStrategy("aggressive", ctx);
// → { strategy: "standard", skipSystemPrompt: true, deterministicOnly: true }
```

#### Quando usarla

La compressione sensibile alla cache è **sempre attiva** — non è necessaria alcuna configurazione. Entra in funzione
solo quando:

- La richiesta contiene marcatori `cache_control`
- Il provider di destinazione supporta il caching dei prompt (Anthropic, OpenAI, ecc.)

### Invecchiamento progressivo

Le conversazioni lunghe accumulano molti turni di messaggi, ma quelli più vecchi diventano meno
rilevanti. Il modulo `progressiveAging.ts` **riduce il livello di dettaglio dei messaggi in base alla distanza in turni**:

- **Turni recenti (0-3)**: Conservati integralmente (dettagli completi)
- **Turni intermedi (4-8)**: Compressione Lite (spaziatura, pulizia della formattazione)
- **Turni vecchi (9+)**: Compressione Caveman (rimozione dei riempitivi, riepilogo)
- **Turni molto vecchi (20+)**: Fortemente riepilogati o eliminati

#### Esempio di codice

```ts
import { applyAging } from "@omniroute/open-sse/services/compression/progressiveAging";

const messages = [
  { role: "system", content: "You are a helpful assistant" },
  { role: "user", content: "What is 2+2?" },
  { role: "assistant", content: "4" },
  // ... altri 50 turni ...
];

const { messages: aged, saved } = applyAging(messages, {
  verbatim: 3, // Primi 3 turni: integrali
  light: 8, // Turni 4-8: compressione lite
  moderate: 20, // Turni 9-20: compressione caveman
  // Turni 21+: riepilogo intensivo
});

// saved = numero di token risparmiati
```

#### Quando usarlo

L'invecchiamento progressivo è **sempre attivo** per le modalità `aggressive` e `ultra`. È
particolarmente efficace per:

- Sessioni di programmazione di lunga durata
- Conversazioni che si estendono su più giorni
- Flussi di lavoro agentici con molte chiamate agli strumenti

### Modalità di output Caveman

Il modulo `outputMode.ts` inserisce **istruzioni nel prompt di sistema** per fare in modo che il
modello produca direttamente un output compresso e conciso (in stile "caveman").

#### Come funziona

Invece di comprimere l'input, questa modalità aggiunge un prompt di sistema come:

> "Rispondi con il minimo numero di parole. Evita i convenevoli. Usa frasi brevi."

È particolarmente efficace per:

- Generazione di codice (output più conciso = meno token)
- Domande e risposte rapide (non servono spiegazioni elaborate)
- Elaborazione in batch (massimizza il throughput)

#### Quando usarla

La modalità di output Caveman è **facoltativa** — impostala tramite la configurazione combinata:

```json
{
  "strategy": "auto",
  "config": {
    "auto": {
      "outputMode": "caveman"
    }
  }
}
```

### Stili di output (catalogo)

La modalità di output Caveman descritta sopra è il **percorso legacy con stile singolo**. La Fase 4 l'ha generalizzata
in un catalogo di stili di output componibili: `OUTPUT_STYLE_CATALOG` in
`open-sse/services/compression/outputStyles/catalog.ts`. Ogni stile è un'istruzione del prompt di sistema
che fa sì che il modello produca direttamente un output meno costoso; gli stili possono essere abilitati
insieme e vengono inseriti nell'ordine del catalogo.

| Stile                                       | `id`          | Cosa fa                                                                                                                                                                                                                                                                 | Lingue delle istruzioni                                                                       |
| ------------------------------------------- | ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| Prosa concisa                               | `terse-prose` | Elimina riempitivi/articoli/espressioni attenuative; mantiene intatta la sostanza tecnica. Stesso testo della modalità di output Caveman legacy (richiamato, non riscritto).                                                                                            | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                                                 |
| Meno codice                                 | `less-code`   | Scala YAGNI: la modifica funzionante più piccola possibile, senza astrazioni non richieste.                                                                                                                                                                             | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                                                 |
| Coda di cavallo (sviluppatore senior pigro) | `ponytail`    | "Il codice migliore è quello mai scritto": riutilizzo > riscrittura, causa principale > sintomo, diff funzionante più breve.                                                                                                                                            | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                                                 |
| Ho l'ADHD (azione prima di tutto)           | `i-have-adhd` | Prima l'azione (comando/percorso/frammento prima della prosa), passaggi numerati e limitati, UN solo passaggio successivo concreto, senza preamboli/ricapitolazioni/formule di chiusura. Adattato da [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) (MIT). | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                                                 |
| CJK conciso (文言)                          | `terse-cjk`   | Stile ultra-conciso in cinese classico.                                                                                                                                                                                                                                 | zh (vincolato alle impostazioni locali: disponibile solo quando la lingua determinata è `zh`) |

Ogni stile offre tre livelli di intensità — `lite`, `full`, `ultra` — e ogni livello
termina con la clausola condivisa sui limiti, che mantiene inalterati blocchi di codice, percorsi dei file, comandi,
stringhe di errore, URL e identificatori.

#### Come funziona l'inserimento

`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) confronta
la selezione con il catalogo (gli id sconosciuti e gli stili non compatibili con le impostazioni locali vengono
ignorati, senza mai generare un errore), concatena le istruzioni selezionate nell'ordine del catalogo,
aggiunge la clausola sui limiti **una sola volta** e antepone il risultato al prompt di sistema
dietro un unico marcatore di idempotenza (`[OmniRoute Output Styles]`) — una nuova applicazione
non produce alcun effetto. Quando è disponibile una traduzione per la lingua rilevata nella richiesta, viene inserita
l'istruzione localizzata al posto di quella inglese.

#### Come abilitare gli stili

Nella dashboard: **Contesto → Impostazioni → Compressione** — una riga per ogni stile, con un
interruttore di attivazione/disattivazione e un selettore del livello. A livello di codice, la configurazione della compressione mantiene
la selezione nel seguente formato:

```json
{
  "outputStyles": [
    { "id": "i-have-adhd", "level": "full" },
    { "id": "less-code", "level": "lite" }
  ]
}
```

Compatibilità con le versioni precedenti: l'impostazione combinata legacy `outputMode: "caveman"` continua a funzionare e viene associata a
`terse-prose`, risultando identica byte per byte al vecchio inserimento in ogni lingua legacy.

Selezione della lingua: con `languageConfig.enabled` attivo, `autoDetect` seleziona la
lingua dell'ultimo messaggio dell'utente (usando lo stesso rilevatore dei motori di input);
la disattivazione di `autoDetect` fissa `defaultLanguage`. Se disattivato → inglese.

La matrice stile × lingua è definita da
`tests/unit/compression/output-styles-i18n-matrix.test.ts`: un nuovo stile non può essere distribuito
senza almeno una traduzione pt-BR (o un'eccezione esplicita tracciata) e uno
stile esistente non può perdere silenziosamente una lingua. Per aggiungere uno stile, consulta
[EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md#adding-an-output-style).

### Compressione dei risultati degli strumenti

Il modulo `toolResultCompressor.ts` fornisce **5 strategie di compressione specializzate**
per i risultati degli strumenti (chiamate di funzione, output degli agenti, risultati di ricerca e così via):

1. **Compressione dei risultati di ricerca** — Rimuove i risultati ridondanti e conserva i primi N
2. **Compressione della lettura dei file** — Tronca i file di grandi dimensioni, preservando intestazioni/importazioni
3. **Compressione dell'esecuzione del codice** — Conserva solo stdout/stderr essenziali
4. **Compressione delle query al database** — Limita le righe e rimuove i metadati prolissi
5. **Compressione delle risposte API** — Elimina i campi null e compatta gli array

#### Quando usarla

La compressione dei risultati degli strumenti è **sempre attiva** quando sono presenti chiamate agli strumenti. Non è
necessaria alcuna configurazione.

### Pipeline concatenata

La modalità concatenata esegue **più motori in sequenza** — solitamente prima RTK
(risparmio del 60-90% sull'output degli strumenti), quindi Caveman (un ulteriore risparmio del 30% sul
testo rimanente). In questo modo si ottiene un **risparmio totale del 78-95%**.

#### Come funziona

```
Input (1000 token)
  → RTK (filtro sensibile ai comandi) → 200 token
    → Caveman (rimozione dei riempitivi) → 140 token
  → Output (140 token, risparmio dell'86%)
```

#### Quando usarla

Usa la modalità concatenata per:

- Flussi di lavoro con uso intensivo di strumenti (programmazione agentica, ricerca)
- Elaborazione in batch sensibile ai costi
- Quando è necessario il massimo risparmio di token

Configura tramite la modalità combinata:

```json
{
  "strategy": "auto",
  "config": {
    "auto": {
      "modePack": "stacked"
    }
  }
}
```

---

## Override della compressione per combinazione

Puoi ignorare la modalità di compressione globale **per ogni combinazione** per ottimizzare il comportamento
in base ai diversi casi d'uso:

```json
{
  "id": "coding-combo",
  "strategy": "priority",
  "config": {
    "auto": {
      "weights": { "taskFit": 0.5 },
      "modePack": "quality-first"
    }
  },
  "compressionOverride": {
    "mode": "aggressive",
    "stackedPipelines": ["rtk", "caveman"],
    "preserveToolDefinitions": true
  }
}
```

Questa funzionalità è utile per:

- **Combinazioni per la programmazione**: usa la modalità `aggressive` per sessioni lunghe
- **Combinazioni per domande e risposte rapide**: usa la modalità `lite` per risposte veloci
- **Combinazioni con uso intensivo di strumenti**: usa la modalità `stacked` per il massimo risparmio
- **Combinazioni per la produzione**: usa la modalità `cache-aware` per i provider che supportano la memorizzazione nella cache

---

## Vedi anche

- [Configurazione dell'ambiente](../reference/ENVIRONMENT.md) — Variabili d'ambiente per la compressione
- [Guida all'architettura](../architecture/ARCHITECTURE.md) — Funzionamento interno della pipeline di compressione
- [Guida utente](../guides/USER_GUIDE.md) — Primi passi con la compressione
- [Compressione RTK](./RTK_COMPRESSION.md) — Filtri RTK, modello di attendibilità, gate di verifica e recupero dell'output non elaborato
- [Motori di compressione](./COMPRESSION_ENGINES.md) — Caveman, RTK, modalità stacked, API, MCP e dashboard
- [Formato delle regole di compressione](./COMPRESSION_RULES_FORMAT.md) — Formato JSON dei pacchetti di regole
- [Pacchetti linguistici di compressione](./COMPRESSION_LANGUAGE_PACKS.md) — Regole Caveman specifiche per lingua
