# 🗜️ Prompt Compression Guide — OmniRoute (Italiano)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_GUIDE.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_GUIDE.md)

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

Naviga su `Dashboard → Context & Cache`:

- **Caveman** — selezione della modalità, pacchetti lingua, anteprima e impostazioni predefinite globali
- **RTK** — anteprima del filtro comandi, impostazioni di sicurezza RTK e catalogo filtri
- **Compression Combos** — pipeline di motori nominate assegnate a combo di routing
- **Auto-Trigger Threshold** — attiva automaticamente la compressione quando il conteggio dei token supera la soglia

### Sovrascrittura per Combo

In `Dashboard → Context & Cache → Compression Combos`, assegna una combo di compressione a una combo di routing:

```txt
Combo: "free-tier-fallback"
  Compression Combo: "coding-agent-stack"
  Pipeline: RTK -> Caveman
  Targets:
    1. if/kimi-k2.7-code
    2. if/qwen3.8-max-preview
```

Questo ti permette di usare la compressione a stack su provider gratuiti/di codifica mantenendo la modalità lite sulle sottoscrizioni a pagamento.

Questo assegnamento di "Sovrascrittura per Combo" è un controllo diverso dalla sovrascrittura della **modalità di compressione della combo di routing** (Default/Off/Lite/Standard/Aggressive/Ultra) — tale sovrascrittura non seleziona una pipeline di combo di compressione nominata; imposta semplicemente il campo `compressionMode` consultato da `resolveCompressionPlan`. Può essere impostato sia sulla scheda combo (`Dashboard → Combos`) sia, dal #6760, per combo di routing nell'elenco "Assegna al routing" su `Dashboard → Context & Cache → Compression Combos`, proprio accanto alla casella di controllo di assegnazione della pipeline documentata sopra. Entrambe le interfacce persistono tramite lo stesso endpoint `PUT /api/combos/{id}`.

### Sovrascrittura per richiesta

Invia l'header di richiesta `x-omniroute-compression` per sovrascrivere il piano di compressione per una singola richiesta. Ha la precedenza più alta — supera la sovrascrittura della combo di routing, il profilo attivo, l'attivazione automatica e il Default del pannello. I valori sconosciuti vengono ignorati (la richiesta non viene mai rifiutata) e l'interruttore master globale controlla ancora tutto: quando la compressione è disattivata globalmente, l'header non può attivarla. Valori:

| Valore        | Effetto                                                                                                            |
| ------------- | ------------------------------------------------------------------------------------------------------------------ |
| `off`         | Nessuna compressione per questa richiesta.                                                                         |
| `default`     | Il profilo Default derivato dal pannello (ignora il profilo attivo). I motori lossy rimangono disattivati.         |
| `safe`        | Uguale all'omissione dell'header: solo deduplicazione e ripiegamento degli spazi bianri.                           |
| `allow-lossy` | Mantiene il piano operatore di questa richiesta, inclusi riepiloghi, filtri di rilevanza e riscritture di stile.   |
| `engine:<id>` | Un singolo motore quando abilitato, ad esempio `engine:rtk`. Questa è l'attivazione per richiesta per quel motore. |
| `<combo>`     | Una combo nominata, abbinata prima per nome (case-insensitive), poi per ID.                                        |

Senza `allow-lossy`, `engine:<id>` o una combo nominata, i motori lossy non vengono applicati. La richiesta ottiene comunque la deduplicazione della sessione e il ripiegamento degli spazi bianchi quando la compressione è attiva.

Il piano applicato viene restituito nell'header di risposta `X-OmniRoute-Compression: <mode>; source=<source>`, dove `<source>` è uno tra `request-header`, `routing-override`, `active-profile`, `auto-trigger`, `default` o `off`.

### API

```bash
# Ottieni le impostazioni di compressione
curl http://localhost:20128/api/settings/compression

# Aggiorna le impostazioni di compressione
curl -X PUT http://localhost:20128/api/settings/compression \
  -H "Content-Type: application/json" \
  -d '{"defaultMode":"stacked","autoTriggerMode":"stacked","autoTriggerTokens":32000}'

# Anteprima di un payload RTK/stacked specifico
curl -X POST http://localhost:20128/api/compression/preview \
  -H "Content-Type: application/json" \
  -d '{"mode":"rtk","messages":[{"role":"tool","content":"npm test output here"}]}'

# Elenca i pacchetti di filtri RTK
curl http://localhost:20128/api/context/rtk/filters

# Testa RTK direttamente con metadati di comando opzionali
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

## Tabella di marcia delle fasi

| Fase    | Modalità                                                                                                                                                        | Stato         |
| ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| Fase 1  | Off, Lite                                                                                                                                                       | ✅ Rilasciato |
| Fase 2  | Standard, Aggressive, Ultra                                                                                                                                     | ✅ Rilasciato |
| Fase 3  | RTK, Stacked, Compression Combos                                                                                                                                | ✅ Rilasciato |
| Fase 4  | Stili di Output, SLM-tier Ultra, harness di valutazione                                                                                                         | ✅ Rilasciato |
| Fase 4C | Budget di contesto adattivo ("dial") — motore di calcolo + API (`contextBudget` su `PUT /api/settings/compression`) + controlli modalità/policy della dashboard | ✅ Rilasciato |

---

## Ringraziamenti

Le regole di compressione della modalità Standard sono ispirate a **[Caveman](https://github.com/JuliusBrussee/caveman)** di **[JuliusBrussee](https://github.com/JuliusBrussee)** (⭐ 51K+) — il progetto virale "perché usare molti token quando pochi token bastano". Caveman dichiara `~75%` di token di output in meno, un risparmio medio dei token di output del `65%` nei benchmark, un intervallo di risparmio dell'output del `22-87%` e uno strumento di compressione dell'input del `~46%`.

La modalità RTK è ispirata a **[RTK - Rust Token Killer](https://github.com/rtk-ai/rtk)** di **[RTK AI](https://github.com/rtk-ai)** — il progetto ad alte prestazioni per la compressione dell'output di comandi destinato al filtraggio dell'output di terminale, build, test, git e strumenti. RTK dichiara risparmi del `60-90%`, con una sessione di esempio nel suo README che mostra un risparmio del `~80%`.

---

## Sistemi di compressione avanzati

Oltre alle 7 modalità standard, OmniRoute include diversi sistemi di compressione avanzati che funzionano automaticamente in base al contesto.

### Compressione Cache-Aware

Alcuni provider (come Anthropic con la cache dei prompt) supportano la **cache dei prompt**, che consente loro di memorizzare nella cache parti del prompt per ridurre costi e latenza. Quando la cache è abilitata, una compressione aggressiva può effettivamente **danneggiare** le prestazioni perché modifica i token memorizzati nella cache, invalidando la cache.

Il modulo `cachingAware.ts` risolve questo problema **rilevando il contesto di caching** e **regolando la strategia di compressione** di conseguenza.

#### Come funziona

1. **Rileva il contesto di caching** — Scansiona il corpo della richiesta per i marcatori `cache_control`
2. **Identifica i provider di caching** — Controlla se il provider di destinazione supporta il caching
3. **Regola la strategia** — Declassa `aggressive`/`ultra` a `standard` per i provider di caching
4. **Salta il prompt di sistema** — I prompt di sistema sono solitamente memorizzati nella cache, quindi non comprimerli
5. **Usa trasformazioni deterministiche** — Usa solo trasformazioni che producono output coerente

#### Esempio di codice

```ts
import {
  detectCachingContext,
  getCacheAwareStrategy,
} from "@omniroute/open-sse/services/compression/cachingAware";

const body = {
  model: "anthropic/claude-sonnet-4.5",
  messages: [{ role: "user", content: "Hello" }],
  cache_control: { type: "ephemeral" }, // ← Marcatore cache
};

const ctx = detectCachingContext(body, { provider: "anthropic" });
// → { hasCacheControl: true, provider: "anthropic", isCachingProvider: true }

const strategy = getCacheAwareStrategy("aggressive", ctx);
// → { strategy: "standard", skipSystemPrompt: true, deterministicOnly: true }
```

#### Quando usarlo

La compressione cache-aware è **sempre attiva** — non è necessaria alcuna configurazione. Si attiva solo quando:

- La richiesta ha marcatori `cache_control`
- Il provider di destinazione supporta la cache dei prompt (Anthropic, OpenAI, ecc.)

### Invecchiamento Progressivo

Le conversazioni lunghe accumulano molti turni di messaggi, ma i turni più vecchi diventano meno rilevanti. Il modulo `progressiveAging.ts` **degrada i messaggi in base alla distanza del turno**:

- **Turni recenti (0-3)**: Mantenuti verbatim (dettaglio completo)
- **Turni medi (4-8)**: Compressione leggera (spazi bianchi, pulizia della formattazione)
- **Turni vecchi (9+)**: Compressione "uomo delle caverne" (rimozione di riempitivi, riassunto)
- **Turni molto vecchi (20+)**: Pesantemente riassunti o eliminati

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
  verbatim: 3, // Primi 3 turni: verbatim
  light: 8, // Turni 4-8: compressione leggera
  moderate: 20, // Turni 9-20: compressione "uomo delle caverne"
  // Turni 21+: riassunto pesante
});

// saved = numero di token salvati
```

#### Quando usarlo

L'invecchiamento progressivo è **sempre attivo** per le modalità `aggressive` e `ultra`. È particolarmente efficace per:

- Sessioni di codifica di lunga durata
- Conversazioni di più giorni
- Flussi di lavoro agentici con molte chiamate a strumenti

### Modalità di Output "Uomo delle Caverne"

Il modulo `outputMode.ts` inietta **istruzioni nel prompt di sistema** per far sì che il modello stesso produca un output compresso e conciso (uno stile "uomo delle caverne").

#### Come funziona

Invece di comprimere l'input, questa modalità aggiunge un prompt di sistema come:

> "Rispondi con parole minime. Salta le formalità. Usa frasi brevi."

Questo funziona particolarmente bene per:

- Generazione di codice (output più conciso = meno token)
- Domande e risposte rapide (non c'è bisogno di spiegazioni elaborate)
- Elaborazione batch (massimizzare la produttività)

#### Quando usarlo

La modalità di output "uomo delle caverne" è **opt-in** — impostala tramite la configurazione combinata:

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

### Stili di Output (catalogo)

La modalità di output "uomo delle caverne" sopra è il **percorso legacy a stile singolo**. La Fase 4 l'ha generalizzata in un catalogo di stili di output componibili: `OUTPUT_STYLE_CATALOG` in `open-sse/services/compression/outputStyles/catalog.ts`. Ogni stile è un'istruzione del prompt di sistema che fa sì che il modello stesso produca un output più economico; gli stili possono essere abilitati insieme e vengono iniettati nell'ordine del catalogo.

| Stile                       | `id`          | Cosa fa                                                                                                                                                                                                                                            | Lingue di istruzione                                            |
| :-------------------------- | :------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------- |
| Prosa concisa               | `terse-prose` | Elimina riempitivi/articoli/esitazioni; mantiene la sostanza tecnica esatta. Stesso testo della modalità di output legacy caveman (riferita, non ridigitata).                                                                                      | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                   |
| Meno codice                 | `less-code`   | Scala YAGNI: il più piccolo cambiamento funzionante, nessuna astrazione non richiesta.                                                                                                                                                             | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                   |
| Ponytail (senior dev pigro) | `ponytail`    | "Il codice migliore è il codice mai scritto": riuso > riscrittura, causa radice > sintomo, diff funzionante più breve.                                                                                                                             | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                   |
| Ho l'ADHD (azione-prima)    | `i-have-adhd` | Azione prima (comando/percorso/snippet prima della prosa), passaggi numerati e delimitati, UN passo successivo concreto, nessun preambolo/ricapitolazione/chiusura. Adattato da [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) (MIT). | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                   |
| CJK conciso (文言)          | `terse-cjk`   | Stile ultra-conciso del cinese classico.                                                                                                                                                                                                           | zh (locale-gated: offerto solo quando la lingua risolta è `zh`) |

Ogni stile offre tre livelli di intensità — `lite`, `full`, `ultra` — e ogni livello
termina con la clausola di limiti condivisi, che mantiene blocchi di codice, percorsi di file, comandi,
stringhe di errore, URL e identificatori verbatim.

#### Come funziona l'iniezione

`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) risolve
la selezione rispetto al catalogo (ID sconosciuti e stili non corrispondenti alla locale vengono
eliminati, mai un errore), concatena le istruzioni selezionate in ordine di catalogo,
aggiunge la clausola di limiti **una volta**, e precarica il risultato nel prompt di sistema
dietro un singolo marcatore di idempotenza (`[OmniRoute Output Styles]`) — riapplicare
è un'operazione nulla. Quando la lingua della richiesta rilevata ha una traduzione, l'istruzione
localizzata viene iniettata invece dell'inglese.

#### Come abilitare

Nella dashboard: **Contesto → Impostazioni → Compressione** — una riga per stile con un
interruttore on/off e un selettore di livello. A livello programmatico, la configurazione di compressione
persiste la selezione come:

```json
{
  "outputStyles": [
    { "id": "i-have-adhd", "level": "full" },
    { "id": "less-code", "level": "lite" }
  ]
}
```

Compatibilità con le versioni precedenti: l'impostazione combinata legacy `outputMode: "caveman"` funziona ancora e si mappa a
`terse-prose`, identica in byte alla vecchia iniezione in ogni lingua legacy.

Selezione della lingua: con `languageConfig.enabled` attivo, `autoDetect` sceglie la
lingua dell'ultimo messaggio utente (stesso rilevatore dei motori di input);
disattivando `autoDetect` si fissa `defaultLanguage`. Off → Inglese.

La matrice stile × lingua è fissata da
`tests/unit/compression/output-styles-i18n-matrix.test.ts`: un nuovo stile non può essere rilasciato
senza almeno una traduzione in pt-BR (o un'eccezione esplicita tracciata), e un
stile esistente non può perdere silenziosamente una locale. Per aggiungere uno stile, vedere
[EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md#adding-an-output-style).

### Compressione dei risultati degli strumenti

Il modulo `toolResultCompressor.ts` fornisce **5 strategie di compressione specializzate**
per i risultati degli strumenti (chiamate di funzione, output dell'agente, risultati di ricerca, ecc.):

1. **Compressione dei risultati di ricerca** — Rimuove i risultati ridondanti, mantiene i primi N
2. **Compressione della lettura di file** — Tronca file di grandi dimensioni, preserva intestazioni/importazioni
3. **Compressione dell'esecuzione di codice** — Mantiene solo stdout/stderr essenziali
4. **Compressione delle query di database** — Limita le righe, rimuove i metadati verbosi
5. **Compressione delle risposte API** — Rimuove i campi nulli, condensa gli array

#### Quando usare

La compressione dei risultati degli strumenti è **sempre attiva** quando sono presenti chiamate di strumenti. Nessuna
configurazione necessaria.

### Pipeline a stack

La modalità a stack esegue **più motori in sequenza** — di solito RTK prima
(60-90% di risparmio sull'output degli strumenti), poi Caveman (30% di risparmio aggiuntivo sul
testo rimanente). Ciò consente di ottenere un **risparmio totale del 78-95%**.

#### Come funziona

```
Input (1000 token)
  → RTK (filtro consapevole dei comandi) → 200 token
    → Caveman (rimozione dei riempitivi) → 140 token
  → Output (140 token, 86% di risparmio)
```

#### Quando usare

Utilizzare la modalità a stack per:

- Flussi di lavoro intensivi con strumenti (codifica agentica, ricerca)
- Elaborazione batch sensibile ai costi
- Quando è necessario il massimo risparmio di token

Configurare tramite combinazione:

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
