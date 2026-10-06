# Error Message Sanitization (Italiano)

🌐 **Languages:** 🇺🇸 [English](../../../../security/ERROR_SANITIZATION.md) · 🇪🇹 [am](../../../am/docs/security/ERROR_SANITIZATION.md) · 🇸🇦 [ar](../../../ar/docs/security/ERROR_SANITIZATION.md) · 🇦🇿 [az](../../../az/docs/security/ERROR_SANITIZATION.md) · 🇧🇬 [bg](../../../bg/docs/security/ERROR_SANITIZATION.md) · 🇧🇩 [bn](../../../bn/docs/security/ERROR_SANITIZATION.md) · 🇧🇦 [bs](../../../bs/docs/security/ERROR_SANITIZATION.md) · 🇨🇿 [cs](../../../cs/docs/security/ERROR_SANITIZATION.md) · 🇩🇰 [da](../../../da/docs/security/ERROR_SANITIZATION.md) · 🇩🇪 [de](../../../de/docs/security/ERROR_SANITIZATION.md) · 🇬🇷 [el](../../../el/docs/security/ERROR_SANITIZATION.md) · 🇪🇸 [es](../../../es/docs/security/ERROR_SANITIZATION.md) · 🇪🇪 [et](../../../et/docs/security/ERROR_SANITIZATION.md) · 🇮🇷 [fa](../../../fa/docs/security/ERROR_SANITIZATION.md) · 🇫🇮 [fi](../../../fi/docs/security/ERROR_SANITIZATION.md) · 🇫🇷 [fr](../../../fr/docs/security/ERROR_SANITIZATION.md) · 🇮🇪 [ga](../../../ga/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [gu](../../../gu/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [ha](../../../ha/docs/security/ERROR_SANITIZATION.md) · 🇮🇱 [he](../../../he/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [hi](../../../hi/docs/security/ERROR_SANITIZATION.md) · 🇭🇷 [hr](../../../hr/docs/security/ERROR_SANITIZATION.md) · 🇭🇺 [hu](../../../hu/docs/security/ERROR_SANITIZATION.md) · 🇦🇲 [hy](../../../hy/docs/security/ERROR_SANITIZATION.md) · 🇮🇩 [id](../../../id/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [ig](../../../ig/docs/security/ERROR_SANITIZATION.md) · 🇯🇵 [ja](../../../ja/docs/security/ERROR_SANITIZATION.md) · 🇬🇪 [ka](../../../ka/docs/security/ERROR_SANITIZATION.md) · 🇰🇭 [km](../../../km/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [kn](../../../kn/docs/security/ERROR_SANITIZATION.md) · 🇰🇷 [ko](../../../ko/docs/security/ERROR_SANITIZATION.md) · 🇱🇹 [lt](../../../lt/docs/security/ERROR_SANITIZATION.md) · 🇱🇻 [lv](../../../lv/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [ml](../../../ml/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [mr](../../../mr/docs/security/ERROR_SANITIZATION.md) · 🇲🇾 [ms](../../../ms/docs/security/ERROR_SANITIZATION.md) · 🇲🇹 [mt](../../../mt/docs/security/ERROR_SANITIZATION.md) · 🇲🇲 [my](../../../my/docs/security/ERROR_SANITIZATION.md) · 🇳🇵 [ne](../../../ne/docs/security/ERROR_SANITIZATION.md) · 🇳🇱 [nl](../../../nl/docs/security/ERROR_SANITIZATION.md) · 🇳🇴 [no](../../../no/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [or](../../../or/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [pa](../../../pa/docs/security/ERROR_SANITIZATION.md) · 🇵🇭 [phi](../../../phi/docs/security/ERROR_SANITIZATION.md) · 🇵🇱 [pl](../../../pl/docs/security/ERROR_SANITIZATION.md) · 🇵🇹 [pt](../../../pt/docs/security/ERROR_SANITIZATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/ERROR_SANITIZATION.md) · 🇷🇴 [ro](../../../ro/docs/security/ERROR_SANITIZATION.md) · 🇷🇺 [ru](../../../ru/docs/security/ERROR_SANITIZATION.md) · 🇱🇰 [si](../../../si/docs/security/ERROR_SANITIZATION.md) · 🇸🇰 [sk](../../../sk/docs/security/ERROR_SANITIZATION.md) · 🇸🇮 [sl](../../../sl/docs/security/ERROR_SANITIZATION.md) · 🇷🇸 [sr](../../../sr/docs/security/ERROR_SANITIZATION.md) · 🇸🇪 [sv](../../../sv/docs/security/ERROR_SANITIZATION.md) · 🇰🇪 [sw](../../../sw/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [ta](../../../ta/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [te](../../../te/docs/security/ERROR_SANITIZATION.md) · 🇹🇭 [th](../../../th/docs/security/ERROR_SANITIZATION.md) · 🇹🇷 [tr](../../../tr/docs/security/ERROR_SANITIZATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/ERROR_SANITIZATION.md) · 🇵🇰 [ur](../../../ur/docs/security/ERROR_SANITIZATION.md) · 🇺🇿 [uz](../../../uz/docs/security/ERROR_SANITIZATION.md) · 🇻🇳 [vi](../../../vi/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [yo](../../../yo/docs/security/ERROR_SANITIZATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/ERROR_SANITIZATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/ERROR_SANITIZATION.md)

---

> **Fonte autorevole:** `open-sse/utils/errorSanitization.ts`,
> `open-sse/utils/errorPathRedaction.ts` e i builder pubblici in `open-sse/utils/error.ts`
> **Test:** `tests/unit/error-message-sanitization.test.ts`,
> `tests/unit/error-public-boundaries-hardening.test.ts`
> **Ultimo aggiornamento:** 2026-09-02 — v3.8.51
> **Destinatari:** qualsiasi ingegnere che intervenga sulle risposte di errore (route HTTP, stream SSE, executor, gestori MCP).
> **Stato:** **OBBLIGATORIO** per ogni percorso di codice che restituisce un messaggio di errore a un client.

## Perché esiste

La regola CodeQL `js/stack-trace-exposure` (CWE-209) segnala qualsiasi percorso di codice in cui un messaggio di errore proveniente da un'eccezione di runtime raggiunge una risposta HTTP / SSE senza essere sanitizzato. Le tracce dello stack e i percorsi assoluti dei file nelle risposte di produzione forniscono agli aggressori:

- La struttura interna delle directory (`/srv/app/src/lib/...`) → ricognizione per ulteriori attacchi.
- Le versioni di librerie / framework dedotte dai frame dello stack → selezione mirata degli exploit.
- Valori di runtime sensibili che potrebbero essere interpolati come stringhe negli errori (query DB, valori di configurazione).

L'helper `sanitizeErrorMessage` esportato da `open-sse/utils/error.ts` elimina queste categorie di
divulgazione:

1. Code di frame dello stack JavaScript fisiche, serializzate e inequivocabilmente inline.
2. Percorsi assoluti POSIX, Windows, UNC e del filesystem `file://`, preservando al contempo gli URL HTTPS sicuri
   e le route API contrassegnate esplicitamente.
3. Assegnazioni di credenziali, formati comuni di token dei provider, blocchi PEM di chiavi private e URL di dati
   base64.

Il sanitizzatore limita la lunghezza dell'input e adotta un comportamento restrittivo quando un valore generato rifiuta la coercizione a stringa.
La sanitizzazione ricorsiva del JSON upstream elimina inoltre le chiavi non sicure relative a credenziali/percorsi, gli alias di sessione e
le chiavi di controllo del prototipo prima della serializzazione di una risposta.

## Il pattern obbligatorio

### 1. Creazione di una risposta di errore (route HTTP / API)

Usa `buildErrorBody()` — la sanitizzazione è integrata:

```ts
import { buildErrorBody } from "@omniroute/open-sse/utils/error.ts";

export async function POST(req: Request) {
  try {
    // ... logica del gestore ...
  } catch (err) {
    return new Response(JSON.stringify(buildErrorBody(500, String(err))), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
```

Oppure, per i wrapper di praticità nello stesso modulo:

```ts
import {
  errorResponse, // oggetto Response creato in un solo passaggio
  writeStreamError, // writer SSE
  createErrorResult, // struttura { success: false, status, response, ... }
  unavailableResponse, // aggiunge Retry-After
  providerCircuitOpenResponse,
  modelCooldownResponse,
} from "@omniroute/open-sse/utils/error.ts";
```

Tutti applicano il confine canonico degli errori pubblici. `errorResponse`, `writeStreamError` e
`createErrorResult` passano attraverso `buildErrorBody`; i tre helper specializzati per nuovi tentativi/circuit breaker
proiettano e sanitizzano direttamente il proprio contesto pubblico. **Non è mai necessario chiamare
`sanitizeErrorMessage` manualmente** quando si utilizzano questi helper.

### 2. Envelope di errore personalizzati (rari)

Quando non puoi usare gli helper sopra indicati (ad esempio, perché la struttura della risposta è imposta da un protocollo upstream come Connect-RPC), importa direttamente `sanitizeErrorMessage`:

```ts
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error.ts";

const body = JSON.stringify({
  error: {
    message: sanitizeErrorMessage(rawMessage),
    type: "invalid_request_error",
    code: "",
  },
});
```

Questo è l'unico modo autorizzato per creare un corpo di errore personalizzato. Consulta `open-sse/executors/cursor.ts::buildErrorResponse` per l'implementazione di riferimento.

### 3. Logging e risposte

Le eccezioni interne attendibili possono conservare il messaggio completo e la traccia dello stack, così che gli operatori possano eseguire il debug. I valori
provenienti da provider, validazione, sessioni del browser o confini adiacenti alle credenziali devono essere
sanitizzati prima di entrare nell'output della console, nei metadati di audit o nei log persistenti delle chiamate. Pattern:

```ts
try {
  // ...
} catch (err) {
  log.error({ err }, "handler failed"); // solo eccezione interna attendibile
  return errorResponse(500, getErrorMessage(err)); // sanitizzato — inviato al client
}
```

Per gli errori controllati dal provider, proietta anche il valore registrato nel log:

```ts
log.error({ message: sanitizeErrorMessage(err) || "Provider request failed" });
```

### 4. Pattern vietati

❌ **Non inserire mai** l'output grezzo di un'eccezione nel corpo di una Response:

```ts
// ERRATO: la traccia dello stack e i percorsi dei file raggiungono il client
return new Response(JSON.stringify({ error: { message: err.stack || err.message } }), {
  status: 500,
});
```

❌ **Non implementare mai** autonomamente uno splitter della prima riga:

```ts
// ERRATO: non rimuove i percorsi assoluti e può divergere dall'helper canonico
const safe = String(err).split("\n")[0];
```

❌ **Non sanitizzare mai** solo nella route dimenticando il percorso SSE. Tutto ciò che scrive su uno stream deve passare attraverso `writeStreamError` (o il relativo `buildErrorBody` sottostante).

❌ **Non includere mai** intenzionalmente `process.cwd()`, `__filename`, `__dirname` o percorsi derivati dall'ambiente
nei messaggi di errore. Il sanitizzatore gestisce i percorsi assoluti come misura di difesa in profondità, ma i chiamanti non devono
creare innanzitutto messaggi che rivelino la topologia.

## Copertura nella CI

`tests/unit/error-message-sanitization.test.ts` verifica che:

- Ogni route sotto `/api/model-combo-mappings/*` restituisca body sanitizzati in caso di errori 4xx/5xx.
- `sanitizeErrorMessage` rimuova gli stack trace su più righe.
- `sanitizeErrorMessage` sostituisca i percorsi assoluti POSIX e Windows con `<path>`.
- `sanitizeErrorMessage` gestisca in modo sicuro input costituiti da `null`/`undefined`/istanze di `Error`.
- `buildErrorBody` non esponga mai stack trace nel proprio campo `message`.

Quando si aggiunge una nuova route o un nuovo executor, copiare il modello delle asserzioni da questo file. La soglia di copertura (`npm run test:coverage`) impone ≥60% per istruzioni/righe/funzioni/rami: i percorsi di errore devono essere coperti.

## Controlli correlati

- Gli avvisi CodeQL `js/stack-trace-exposure` in `.github/security` devono sempre essere **corretti** tramite questi helper **oppure** ignorati con un commento che faccia riferimento a questo documento.
- La configurazione di redazione di `pino` (`src/shared/utils/logRedaction.ts`) gestisce separatamente i log strutturati attendibili. Questo documento riguarda i messaggi delle risposte pubbliche e i valori controllati dal provider che attraversano i confini persistenti dei log di chiamata/proxy.
- La denylist degli header upstream (`src/shared/constants/upstreamHeaders.ts`) gestisce la fuoriuscita di informazioni tramite gli header: mantenere entrambi i file allineati quando si aggiunge una nuova problematica di esfiltrazione.

## Trasmissione dei dettagli upstream

`buildErrorBody` accetta un terzo argomento facoltativo `upstreamDetails` (il body grezzo analizzato proveniente dal provider upstream). Quando viene fornito, viene sanitizzato da `sanitizeUpstreamDetails` prima di essere incluso nella risposta come `upstream_details`.

Un quarto argomento facoltativo `classification`
(`{ type?: string; code?: string; reason?: string }`) accetta una classificazione pubblica esplicita.
Ogni campo viene proiettato sul vocabolario limitato degli identificatori pubblici. I valori non sicuri, simili a credenziali, contenenti caratteri di controllo o eccessivamente lunghi vengono sostituiti con il tipo/codice derivato dallo stato; un motivo facoltativo non sicuro viene omesso. Gli identificatori di stato HTTP a tre cifre (da `100` a `599`) rimangono validi per i contratti dei provider che espongono lo stato upstream numerico come codice leggibile dalla macchina. Lo stesso intervallo limitato è accettato nel formato segnaposto dello stato HTTP generato localmente; numeri e nomi arbitrari del provider rimangono esclusi dal vocabolario.

Passare ogni classificazione esplicita in quel quarto argomento. Non sovrascrivere mai
`body.error.code`, `body.error.type` o `body.error.reason` dopo che `buildErrorBody()` ha restituito il risultato;
la modifica successiva alla creazione del body aggira la proiezione pubblica.

Regole di sanitizzazione applicate a `upstreamDetails`:

1. Valori foglia stringa: vengono elaborati tramite `sanitizeErrorMessage` (rimozione di stack e percorsi assoluti).
2. Le chiavi non sicure relative a percorsi, credenziali, alias di sessione e controllo del prototipo vengono rimosse.
3. Limite di profondità: l'annidamento oltre 4 livelli viene sostituito con la stringa `"[truncated]"`.
4. Gli array sono limitati a 32 elementi.

Solo i punti di chiamata che dispongono di un body di errore del provider già analizzato devono passare `upstreamDetails`. Gli errori interni di OmniRoute (errori di parsing SSE, contenuti vuoti, blocchi dei guardrail) non devono includerlo.

NON passare `err.stack`, `err.message` grezzi o qualsiasi stringa proveniente da un'eccezione di runtime a
`upstreamDetails`. Questi valori devono comunque essere elaborati tramite `errorResponse` / `buildErrorBody(code, msg)`
senza un body upstream.

La trasmissione selettiva degli errori 4xx upstream preserva la struttura JSON sicura e la formulazione del provider necessarie per il ripristino automatico del client, ma non è una trasmissione byte per byte: il sanitizzatore ricorsivo viene sempre eseguito prima della serializzazione. I body ciclici, contenenti BigInt o con un `toJSON()` ostile vengono bloccati in sicurezza e non sono idonei alla trasmissione. OCR e moderazione applicano la stessa regola; i body upstream non JSON, vuoti o etichettati in modo errato vengono convertiti nell'envelope di errore JSON canonico di OmniRoute.

## Limitazione nota di CodeQL: i sanitizzatori personalizzati non vengono riconosciuti

La query CodeQL [`js/stack-trace-exposure`](https://codeql.github.com/codeql-query-help/javascript/js-stack-trace-exposure/) utilizza un elenco consentito fisso di pattern di sanitizzazione (ad es. `.split("\n")[0]` inline, `String#replace` con forme specifiche di espressioni regolari, accesso a `.message` su `Error`). **Non** riconosce l'indirezione tramite un helper personalizzato come il nostro `sanitizeErrorMessage()`.

Ciò significa che i call site che applicano in modo dimostrabile la sanitizzazione tramite questo modulo — ad esempio `open-sse/utils/error.ts::errorResponse` e `open-sse/executors/cursor.ts::buildErrorResponse` — potrebbero continuare a generare l'avviso anche se il codice è funzionalmente sicuro. Precedenti archiviazioni: `#224`, `#231` (maggio 2026), entrambe contrassegnate come `false positive` con una giustificazione tecnica.

**Come gestire una nuova occorrenza:**

1. Verificare che il call site instradi effettivamente il messaggio tramite `sanitizeErrorMessage` / `buildErrorBody` / uno dei wrapper documentati sopra (esaminare la catena di chiamate dall'inizio alla fine, senza fidarsi di un commento).
2. Verificare che `tests/unit/error-message-sanitization.test.ts` eserciti il percorso (oppure aggiungere la copertura).
3. Archiviare l'avviso tramite `gh api ... -X PATCH state=dismissed -f 'dismissed_reason=false positive'`, facendo riferimento a questo documento.
4. **Non** tentare di "risolvere" il problema inserendo `.split("\n")[0]` inline ovunque: l'helper è l'unica fonte attendibile; duplicare il pattern indebolisce il sanitizzatore (eliminando l'offuscamento dei percorsi, il limite di lunghezza e la coercizione del tipo) solo per dare l'impressione di soddisfare lo scanner.

L'adozione di funzionalità facoltative come la [configurazione dei sanitizzatori personalizzati `@codeql/javascript-models`](https://codeql.github.com/docs/codeql-language-guides/customizing-library-models-for-javascript/) di CodeQL rappresenta la soluzione a lungo termine; non rientra nell'ambito di questo documento.

## Riferimenti

- [CWE-209: Esposizione di informazioni tramite un messaggio di errore](https://cwe.mitre.org/data/definitions/209.html)
- [CodeQL `js/stack-trace-exposure`](https://codeql.github.com/codeql-query-help/javascript/js-stack-trace-exposure/)
- [OWASP: guida rapida alla gestione degli errori](https://cheatsheetseries.owasp.org/cheatsheets/Error_Handling_Cheat_Sheet.html)
- Commit che centralizza l'helper: `1a39c31f` — _fix(security): maschera le credenziali pubbliche upstream e centralizza la sanitizzazione degli errori_
