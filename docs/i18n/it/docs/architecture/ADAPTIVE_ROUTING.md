# Adaptive Routing: Routing Events, Quality Feedback & Explainability (Italiano)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/ADAPTIVE_ROUTING.md) · 🇪🇹 [am](../../../am/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇦 [ar](../../../ar/docs/architecture/ADAPTIVE_ROUTING.md) · 🇦🇿 [az](../../../az/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇬 [bg](../../../bg/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇩 [bn](../../../bn/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇦 [bs](../../../bs/docs/architecture/ADAPTIVE_ROUTING.md) · 🇨🇿 [cs](../../../cs/docs/architecture/ADAPTIVE_ROUTING.md) · 🇩🇰 [da](../../../da/docs/architecture/ADAPTIVE_ROUTING.md) · 🇩🇪 [de](../../../de/docs/architecture/ADAPTIVE_ROUTING.md) · 🇬🇷 [el](../../../el/docs/architecture/ADAPTIVE_ROUTING.md) · 🇪🇸 [es](../../../es/docs/architecture/ADAPTIVE_ROUTING.md) · 🇪🇪 [et](../../../et/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇷 [fa](../../../fa/docs/architecture/ADAPTIVE_ROUTING.md) · 🇫🇮 [fi](../../../fi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇫🇷 [fr](../../../fr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇪 [ga](../../../ga/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [gu](../../../gu/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇬 [ha](../../../ha/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇱 [he](../../../he/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [hi](../../../hi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇭🇷 [hr](../../../hr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇭🇺 [hu](../../../hu/docs/architecture/ADAPTIVE_ROUTING.md) · 🇦🇲 [hy](../../../hy/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇩 [id](../../../id/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇬 [ig](../../../ig/docs/architecture/ADAPTIVE_ROUTING.md) · 🇯🇵 [ja](../../../ja/docs/architecture/ADAPTIVE_ROUTING.md) · 🇬🇪 [ka](../../../ka/docs/architecture/ADAPTIVE_ROUTING.md) · 🇰🇭 [km](../../../km/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [kn](../../../kn/docs/architecture/ADAPTIVE_ROUTING.md) · 🇰🇷 [ko](../../../ko/docs/architecture/ADAPTIVE_ROUTING.md) · 🇱🇹 [lt](../../../lt/docs/architecture/ADAPTIVE_ROUTING.md) · 🇱🇻 [lv](../../../lv/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [ml](../../../ml/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [mr](../../../mr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇲🇾 [ms](../../../ms/docs/architecture/ADAPTIVE_ROUTING.md) · 🇲🇹 [mt](../../../mt/docs/architecture/ADAPTIVE_ROUTING.md) · 🇲🇲 [my](../../../my/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇵 [ne](../../../ne/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇱 [nl](../../../nl/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇴 [no](../../../no/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [or](../../../or/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [pa](../../../pa/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇭 [phi](../../../phi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇱 [pl](../../../pl/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇹 [pt](../../../pt/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/ADAPTIVE_ROUTING.md) · 🇷🇴 [ro](../../../ro/docs/architecture/ADAPTIVE_ROUTING.md) · 🇷🇺 [ru](../../../ru/docs/architecture/ADAPTIVE_ROUTING.md) · 🇱🇰 [si](../../../si/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇰 [sk](../../../sk/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇮 [sl](../../../sl/docs/architecture/ADAPTIVE_ROUTING.md) · 🇷🇸 [sr](../../../sr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇪 [sv](../../../sv/docs/architecture/ADAPTIVE_ROUTING.md) · 🇰🇪 [sw](../../../sw/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [ta](../../../ta/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [te](../../../te/docs/architecture/ADAPTIVE_ROUTING.md) · 🇹🇭 [th](../../../th/docs/architecture/ADAPTIVE_ROUTING.md) · 🇹🇷 [tr](../../../tr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇰 [ur](../../../ur/docs/architecture/ADAPTIVE_ROUTING.md) · 🇺🇿 [uz](../../../uz/docs/architecture/ADAPTIVE_ROUTING.md) · 🇻🇳 [vi](../../../vi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇬 [yo](../../../yo/docs/architecture/ADAPTIVE_ROUTING.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/ADAPTIVE_ROUTING.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/ADAPTIVE_ROUTING.md)

---

Questo documento descrive la base del routing adattivo guidato dal feedback aggiunta a
OmniRoute. È volutamente minimale: introduce un canale tipizzato per gli esiti del routing,
un segnale di qualità online che alimenta lo scorer auto-combo esistente, un exporter
OpenTelemetry opzionale e un endpoint di spiegabilità. **Non** sostituisce lo stack di
resilienza esistente (circuit breaker, cooldown della connessione, lockout del modello,
matrice di integrità, autopilot), ma lo integra.

## 1. Contesto architetturale

OmniRoute è un data plane con un **percorso critico delle richieste** e un **piano di
controllo/intelligence**. Il percorso critico deve rimanere veloce, efficiente nell'uso
della memoria, asincrono, resiliente e prevedibile. Valutazione, assegnazione dei punteggi
di qualità, esperimenti e analisi storica appartengono al piano di controllo.

```
Agente AI / IDE
      │
      ▼
┌─────────────────────┐
│    OmniRoute        │   data plane (veloce, sincrono, in memoria)
│  routing / failover │
│  integrità / vincoli│
│  cache / streaming  │
└──────────┬──────────┘
           │ RoutingEvent (fire-and-forget, ~0.2µs)
           ▼
┌─────────────────────┐
│  Sink di feedback   │   piano di controllo (asincrono, best-effort)
│  tracker qualità    │
│  exporter OTel      │
│  archivio spiegaz.  │
└──────────┬──────────┘
           ▼  punteggio di qualità
      scorer auto-combo
```

### Ciò che era già presente (verificato, non duplicato)

| Concetto                                       | Implementazione esistente                                                                                            |
| ---------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| Disponibilità (possiamo inviare traffico?)     | Circuit breaker (CLOSED/DEGRADED/OPEN/HALF_OPEN, persistito nel DB), cooldown della connessione, lockout del modello |
| Report sull'integrità                          | `providerHealthMatrix.ts`, `providerHealthAutopilot.ts`                                                              |
| Traffico shadow                                | `open-sse/services/combo/shadowRouting.ts`                                                                           |
| Vincoli di sicurezza                           | `src/lib/guardrails/` (hook pre/post)                                                                                |
| Cache esatta                                   | `src/lib/semanticCache.ts` (basata sulla firma)                                                                      |
| Valutatori / routing guidato dalle valutazioni | `src/lib/evals/`, `open-sse/services/evalRouting.ts`                                                                 |
| Spiegabilità delle decisioni combo             | `open-sse/services/combo/decisionTrace.ts`                                                                           |
| Eventi in tempo reale della dashboard          | `src/lib/events/eventBus.ts` (canale di notifica UI, payload `unknown`, cronologia di 100 elementi)                  |

Il livello degli eventi di routing **non** è una reimplementazione di `eventBus`: quel bus
è il canale di notifica in tempo reale della dashboard (nomi degli _eventi_ tipizzati,
payload opachi, consumer UI). `RoutingEvent` è una struttura tipizzata di _esito_
(latenza/token/costo/esito/motivo di completamento), utilizzata dai sink di feedback
del piano di controllo (tracker della qualità, exporter OTel, archivio delle spiegazioni).

### Ciò che mancava (aggiunto qui)

1. Un'**astrazione tipizzata per eventi di esito del routing + sink** (`RoutingEvent` /
   `RoutingEventSink`). `decisionTrace` è limitato alle combo e solo in memoria;
   `comboMetrics` contiene contatori cumulativi; `call_logs` è persistenza asincrona
   grezza. Nessuno di questi costituisce un canale degli esiti tipizzato e basato su
   sink al quale possano iscriversi un tracker della qualità, un exporter OTel o un
   valutatore in stile Future-AGI.
2. Un **segnale di qualità online** (EWMA) per la qualità dell'output: in precedenza,
   lo scorer approssimava la "qualità" solo tramite l'idoneità statica all'attività e
   i tassi di superamento delle valutazioni con attivazione esplicita.
3. Un **exporter OTel opzionale e privo di dipendenze** che utilizza le convenzioni
   semantiche GenAI.
4. Un **endpoint di spiegabilità** che restituisce le decisioni di routing reali e lo
   stato della qualità.

## 2. Eventi di routing (base del feedback)

File: `open-sse/services/routing/events.ts`, `.../index.ts`

Un `RoutingEvent` contiene solo metadati di routing:

```ts
interface RoutingEvent {
  requestId: string;
  provider: string;
  model: string;
  strategy: string; // "auto" | "priority" | "direct" | ...
  latencyMs: number;
  ttftMs: number | null;
  inputTokens: number | null;
  outputTokens: number | null;
  cost: number | null;
  retries: number;
  fallbackUsed: boolean;
  outcome: RoutingOutcome; // unione con valori consentiti
  status: number | null;
  finishReason: string | null;
  connectionId: string | null;
  ts: number;
}
```

`RoutingEventSink` è un trait in stile `Send+Sync` in TypeScript:

```ts
interface RoutingEventSink {
  readonly name: string;
  record(event: RoutingEvent): void; // deve essere O(1), nessun I/O sincrono
}
```

L'hot path chiama `emitRoutingEvent(event)` una volta per ogni richiesta completata
(il callback di completamento dello streaming, il percorso di successo non in streaming e il
percorso di errore per risposte 200 malformate in `handleChatCore`). La distribuzione avviene tramite fan-out sincrono
verso i sink registrati, ma ogni sink si limita ad accodare o aggiornare lo stato in memoria. **Nessuna
scrittura sincrona sul database, nessun I/O di rete nell'hot path.**

Sink predefiniti:

- `MemoryRoutingEventStore` — ring buffer limitato (500), dal più recente al meno recente, per
  l'endpoint di spiegazione.
- Consumer `QualityTracker` — aggiorna la stima EWMA della qualità.
- `OtlpHttpsEventSink` — facoltativo, abilitato solo quando è impostato `OMNIROUTE_OTEL_ENDPOINT`
  (o `OTEL_EXPORTER_OTLP_ENDPOINT`).

### Overhead misurato (confronto realistico)

`npm run bench:routing-events` su questa workstation (100.000 iterazioni; le operazioni inferiori al µs
sono misurate come valore aggregato in µs/op perché i percentili per operazione sono inferiori
alla risoluzione del timer `performance.now()`):

| Scenario                             | µs/op  | ops/s  |
| ------------------------------------ | ------ | ------ |
| baseline (solo scoring)              | ~0.045 | ~22 M  |
| baseline + RoutingEvent (2 sink)     | ~0.168 | ~5.9 M |
| baseline + evento + accodamento OTel | ~0.163 | ~6.1 M |
| concorrente (8 burst interlacciati)  | ~0.18  | —      |

La differenza dovuta alla distribuzione degli eventi rispetto allo scoring di riferimento è di ~0,12 µs/richiesta; il sink OTel
si limita ad accodare (inserimento nel buffer O(1)), senza aggiungere nulla di misurabile. Questi numeri sono
specifici della macchina e relativi: non costituiscono una garanzia per l'ambiente di produzione. Il valore "~0,2 µs"
della v1 era una stima aggregata; questa metodologia separa lo scoring di riferimento
dal costo di distribuzione degli eventi.

## 3. Segnale di qualità (stato del provider basato sul feedback)

File: `open-sse/services/routing/quality.ts`

La v2 separa la qualità **operativa** da quella **semantica**:

- **Operativa** — derivata dall'hot path di routing (HTTP 4xx/5xx, errori di
  connessione, risposte 429, risposte malformate, interruzioni dello stream, `finish_reason=length`,
  successi con output vuoto, EWMA di latenza/TTFT). Una risposta 200 NON è considerata un'indicazione di qualità
  semantica.
- **Semantica** — il valore effettivo dell'output generato. Viene prodotta ESCLUSIVAMENTE da
  un valutatore tramite `setSemanticQuality()`. Rimane `null` finché un valutatore non la fornisce e
  non confluisce mai nel punteggio operativo.

Stato per ciascuna coppia (provider, modello) (EWMA + contatori limitati):

- `successEwma` — EWMA (α=0,2) dell'esito positivo.
- `latencyEwma` / `ttftEwma` — EWMA della latenza (α=0,1).
- `samples`, `anomalies`, `rateLimited`, `semantic`, `semanticConfidence`.
- `recencyMs` — quanto recentemente è stato osservato il modello per l'ultima volta.

### Consapevolezza del livello di confidenza e del numero di campioni

`confidence = clamp01(samples / 50)` e il punteggio restituito allo scorer viene
interpolato verso il valore medio neutro:

```
score = 0.5 + confidence * (operational - 0.5)
```

Conseguenze (verificate dai test):

- Un provider privo di dati (0 campioni) ottiene un punteggio di **0,5**: non viene penalizzato ingiustamente, ma
  non può prevalere su un provider con migliaia di osservazioni solide.
- Un provider con 7 successi fortuiti viene riportato verso 0,5 (non prevale mai grazie
  a un'inizializzazione ottimistica).
- Un provider con almeno 50 campioni converge al proprio punteggio operativo reale.
- Il degrado e il recupero sono graduali (EWMA) e un singolo errore isolato non
  compromette un provider affidabile.

`ProviderQuality` espone `{ operational, semantic, confidence, samples, anomalies,
rateLimited, successEwma, latencyEwmaMs, ttftEwmaMs, recencyMs }`.

Questo alimenta lo scorer auto-combo come fattore di scoring `quality`:

- `ScoringFactors.quality` / `ScoringWeights.quality` in
  `open-sse/services/autoCombo/scoring.ts`.
- `DEFAULT_WEIGHTS`: `health` 0,1905 → 0,1605, `quality` 0,03. La somma rimane 1,0.
- `buildAutoCandidates` valorizza `candidate.quality` tramite il tracker; per i candidati
  senza dati viene usato il valore neutro predefinito **0,5** (un candidato privo di dati non viene né favorito né
  penalizzato).

Il ciclo chiuso:

```
RoutingEvent → QualityTracker → getQualityScore → fattore di qualità auto-combo
      ↑                                                    │
      └────── esito della richiesta (handleChatCore) ←─────┘
```

### Esclusione rigida rispetto a penalità graduale

Il segnale di qualità rappresenta esclusivamente una **preferenza adattiva graduale**. L'esclusione rigida rimane
affidata allo stack di resilienza esistente: circuit breaker OPEN, quota esaurita,
errore di autenticazione, blocco del modello; nessuna di queste condizioni è influenzata dal punteggio di qualità.
Un provider il cui punteggio di qualità diminuisce temporaneamente riceve una priorità inferiore, ma non viene mai
disabilitato completamente.

## 3b. Temporizzazione canonica dello stream (TTFT / ITL)

File: `open-sse/utils/streamTiming.ts`

`createStreamTiming()` è l'unico punto di strumentazione per il percorso di streaming,
integrato in `createSSEStream` (`open-sse/utils/stream.ts`):

- `markByte()` — primo chunk upstream ricevuto.
- `markForward()` — primo chunk inoltrato al client (utilizzato per il TTFT).
- `markInterrupted()` — timeout/interruzione/errore dello stream prima di una conclusione corretta.
- `ttft()` = latenza del primo chunk SSE inoltrato. **Questo NON è il TTFT a livello di token** —
  un singolo chunk SSE può contenere zero, uno o più token. Documentato con precisione.
- `avgItlMs()` = intervallo medio tra i chunk (un'approssimazione della latenza ITL).

TTFT/ITL/stato di interruzione confluiscono nel `RoutingEvent` (`ttftMs`, `itlMs`) e vengono
esportati come attributi degli span GenAI/OmniRoute dal sink OTel.

## 4. Osservabilità OpenTelemetry / GenAI

File: `open-sse/services/routing/otel.ts`

- Esportatore OTLP/HTTP JSON senza dipendenze (utilizza `fetch` globale, senza
  SDK `@opentelemetry/*`).
- Gli span seguono le convenzioni semantiche GenAI (`gen_ai.provider.name`,
  `gen_ai.request.model`, `gen_ai.usage.input_tokens/output_tokens`,
  `gen_ai.completion.finish_reason`, `gen_ai.system`) insieme agli attributi di routing
  OmniRoute (risultato, stato, ttft, tentativi, fallback).
- `record()` accoda soltanto gli elementi in un buffer limitato (O(1)); un timer in background
  effettua il flush in modo asincrono tramite `POST {endpoint}/v1/traces`. In caso di sovraccarico, gli
  eventi meno recenti vengono eliminati (contatore `dropped`), senza mai applicare backpressure al data
  plane.
- **Disabilitato se non configurato.** È necessario impostare `OMNIROUTE_OTEL_ENDPOINT` (oppure
  `OTEL_EXPORTER_OTLP_ENDPOINT`); in caso contrario, il sink non viene
  registrato e non viene eseguito alcun codice OTel.

## 5. Spiegabilità

- `GET /v1/explain/routing` restituisce i `RoutingEvent` recenti (le decisioni
  effettive, dalla più recente) e l'istantanea della qualità per provider/modello.
- L'autenticazione replica quella di `/v1/combos` (chiave API Bearer o sessione della dashboard; accesso anonimo nelle
  installazioni locali a utente singolo con `REQUIRE_API_KEY=false`).
- Le tracce a livello di combo per ogni invocazione rimangono disponibili tramite il file
  `decisionTrace.ts` esistente (header `X-OmniRoute-Combo-Trace`).
- Sicurezza: gli eventi contengono soltanto metadati di routing, mai prompt/corpi/credenziali.

## 6. Integrazione del piano di valutazione (predisposizione per Future AGI)

OmniRoute considera Future AGI (o qualsiasi altro valutatore) come un **potenziale
backend di intelligence/valutazione, non come una dipendenza**. I punti di integrazione:

- Un `RoutingEventSink` può inoltrare gli eventi a un valutatore in modo asincrono.
- `MemoryRoutingEventStore` e l'istantanea della qualità forniscono a un valutatore il flusso
  grezzo delle decisioni.
- Un futuro `Evaluator` (deterministico, giudice locale, HTTP, WASM) potrebbe elaborare
  eventi/tracce e restituire un `QualityScore` da immettere nello stesso percorso
  `getQualityScore`/fattore di qualità.
- Il routing esistente basato sulle valutazioni (`open-sse/services/evalRouting.ts`) già
  riordina le destinazioni delle combo in base ai tassi di superamento di `eval_runs`, quando abilitato.

Nessuna valutazione viene eseguita in modo sincrono nel percorso della richiesta e il gateway funziona
completamente anche in assenza del valutatore.

## 7. Revisione architetturale finale

1. **Cosa rimane nel percorso critico sincrono?** Routing/assegnazione dei punteggi, controlli preliminari dei
   guardrail, ricerca nella cache e un fan-out `emitRoutingEvent` (~0,12 µs rispetto
   all'assegnazione dei punteggi di base) verso i sink in memoria.
2. **Cosa è stato spostato all'elaborazione asincrona?** Esportazione OTel (timer + fetch),
   persistenza di `call_logs`/utilizzo, scritture nella cache semantica; la qualità è gestita in memoria
   e in O(1) (nessuna operazione asincrona necessaria).
3. **Come diventa feedback il risultato di un routing?** `handleChatCore` emette un
   `RoutingEvent` → `QualityTracker` aggiorna lo stato EWMA → `getQualityScore`
   alimenta il fattore `quality` della combo automatica.
4. **In che modo la qualità influenza il routing futuro?** Un punteggio di qualità basso riduce
   il punteggio ponderato di quel provider/modello in `scoreAutoTargets`, quindi ai
   modelli degradati viene gradualmente assegnata una priorità inferiore, che viene ripristinata man mano che il loro EWMA migliora.
5. **Come può Future AGI integrarsi senza diventare una dipendenza?** Tramite
   l'interfaccia `RoutingEventSink` / un futuro adattatore `Evaluator`, senza alcuna
   dipendenza hardcoded.
6. **Cosa succede quando il valutatore non è disponibile?** Il routing non subisce conseguenze;
   la qualità assume il valore neutro predefinito (1.0) per i modelli privi di segnali osservati.
7. **Cosa succede quando la telemetria non è disponibile?** Il sink OTel semplicemente non viene
   registrato; il resto del livello di routing continua a funzionare senza modifiche.
8. **Cosa succede in caso di sovraccarico?** Il buffer OTel elimina gli eventi meno recenti; il tracker della qualità
   e il ring buffer sono limitati per costruzione; non viene applicata alcuna backpressure.
9. **Come viene ripristinato lo stato del provider dopo un degrado?** L'EWMA riconverge man mano che
   si accumulano i successi; il warmup mantiene neutrali i modelli senza dati; il circuit breaker
   esegue il ripristino in modo indipendente tramite sonde HALF_OPEN.
10. **Quali funzionalità proposte NON sono state implementate intenzionalmente e perché?**
    - Traffico shadow / esperimenti — già implementati
      (`combo/shadowRouting.ts`); non sono stati ricostruiti.
    - Guardrail — già implementati (`src/lib/guardrails/`); non sono stati duplicati.
    - Cache semantica — già implementata (`src/lib/semanticCache.ts`); non è stata
      duplicata.
    - Una piattaforma completa per la gestione degli esperimenti, strumenti per dataset, una piattaforma di ottimizzazione
      dei prompt, un database vettoriale o un'infrastruttura OTel esterna obbligatoria — non rientrano
      nell'ambito di un data plane snello.
    - Una struct Rust `RoutingEvent` — il data plane è in TypeScript; il tipo TS
      è l'equivalente adattato.

## 8. Riferimento per la configurazione

| Variabile                     | Valore predefinito | Effetto                                                                                   |
| ----------------------------- | ------------------ | ----------------------------------------------------------------------------------------- |
| `OMNIROUTE_OTEL_ENDPOINT`     | non impostato      | Se impostata, abilita l'esportatore di tracce OTLP/HTTP (ad es. `http://collector:4318`). |
| `OTEL_EXPORTER_OTLP_ENDPOINT` | non impostato      | Alias di ripiego per l'endpoint OTLP.                                                     |
| `OTEL_SERVICE_NAME`           | `omniroute`        | Attributo della risorsa `service.name`.                                                   |

## 9. Test

- `tests/unit/routing-events.test.ts` — normalizzazione degli eventi, classificazione
  dello stato, buffer circolare limitato, fan-out e isolamento dei sink.
- `tests/unit/routing-quality.test.ts` — riscaldamento EWMA, recupero da errori/successi,
  penalità per anomalie, gestione transitoria degli errori 429, snapshot, reimpostazione.
- `tests/unit/routing-scoring-quality.test.ts` — integrità dei pesi, valore predefinito
  neutro, classificazione in base al fattore di qualità.
- `tests/unit/routing-otel.test.ts` — controllo dell'abilitazione, payload dello span GenAI, flush
  asincrono, eliminazione in caso di sovraccarico.
- `tests/unit/routing-events-concurrency.test.ts` — migliaia di eventi, limitazione del buffer
  circolare, isolamento dei sink che generano eccezioni, burst asincroni intercalati,
  reimpostazione durante gli inserimenti.
- `tests/unit/routing-adaptive-e2e.test.ts` — ciclo end-to-end deterministico tramite
  lo scorer reale `scoreAutoTargets`: integro → degrado → recupero → anomalia temporanea, oltre a
  scenari di avvio a freddo e di provider fortunato con avvio a freddo.
- `tests/unit/stream-timing.test.ts` — TTFT (primo chunk inoltrato), ITL,
  primo byte rispetto al primo inoltro, interruzione, gestione sicura di chunk non validi/vuoti.

## 10. Stato dei problemi preesistenti (Fase 18)

| Problema                                                  | Stato                    | Note                                                                                                                                                                                                                                                                                   |
| --------------------------------------------------------- | ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Mancata corrispondenza dell'esportazione `omniglyph`      | **RISOLTO (ambientale)** | `node_modules` non era sincronizzato con `package-lock.json` (versione installata 1.3.1 rispetto alla versione bloccata 1.4.0). L'esecuzione di `npm install omniglyph@1.4.0` ha ripristinato la versione bloccata; gli errori di tipo sono scesi a 0. Manifesti invariati.            |
| Test obsoleti di `getKnownContextOverflow`                | **NOTO — non risolto**   | `combo-context-overflow-compression-probe.test.ts` importa una funzione che non esiste più in `open-sse/services/combo.ts` (solo i commenti vi fanno riferimento). La correzione richiede la reimplementazione o la riscrittura di tali test — modifiche architetturali non correlate. |
| Isolamento DB di `combo-runtime-unit-concurrency.test.ts` | **NOTO — non risolto**   | L'asserzione di isolamento SQLite dell'infrastruttura di test non riesce quando viene eseguita direttamente; non riesce in modo identico sul branch di base.                                                                                                                           |
| Divergenza i18n di `llm.txt`                              | **NOTO — non risolto**   | I file `docs/i18n/*/llm.txt` differiscono da quello radice; problema preesistente che blocca il controllo pre-commit di sincronizzazione della documentazione.                                                                                                                         |

I problemi ambientali e quelli del codice vengono mantenuti distinti; nessun errore non correlato viene nascosto
dietro filtri di test modificati.
