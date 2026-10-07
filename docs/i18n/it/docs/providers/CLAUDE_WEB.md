# Providers — Claude Web (Italiano)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CLAUDE_WEB.md) · 🇪🇹 [am](../../../am/docs/providers/CLAUDE_WEB.md) · 🇸🇦 [ar](../../../ar/docs/providers/CLAUDE_WEB.md) · 🇦🇿 [az](../../../az/docs/providers/CLAUDE_WEB.md) · 🇧🇬 [bg](../../../bg/docs/providers/CLAUDE_WEB.md) · 🇧🇩 [bn](../../../bn/docs/providers/CLAUDE_WEB.md) · 🇧🇦 [bs](../../../bs/docs/providers/CLAUDE_WEB.md) · 🇨🇿 [cs](../../../cs/docs/providers/CLAUDE_WEB.md) · 🇩🇰 [da](../../../da/docs/providers/CLAUDE_WEB.md) · 🇩🇪 [de](../../../de/docs/providers/CLAUDE_WEB.md) · 🇬🇷 [el](../../../el/docs/providers/CLAUDE_WEB.md) · 🇪🇸 [es](../../../es/docs/providers/CLAUDE_WEB.md) · 🇪🇪 [et](../../../et/docs/providers/CLAUDE_WEB.md) · 🇮🇷 [fa](../../../fa/docs/providers/CLAUDE_WEB.md) · 🇫🇮 [fi](../../../fi/docs/providers/CLAUDE_WEB.md) · 🇫🇷 [fr](../../../fr/docs/providers/CLAUDE_WEB.md) · 🇮🇪 [ga](../../../ga/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [gu](../../../gu/docs/providers/CLAUDE_WEB.md) · 🇳🇬 [ha](../../../ha/docs/providers/CLAUDE_WEB.md) · 🇮🇱 [he](../../../he/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [hi](../../../hi/docs/providers/CLAUDE_WEB.md) · 🇭🇷 [hr](../../../hr/docs/providers/CLAUDE_WEB.md) · 🇭🇺 [hu](../../../hu/docs/providers/CLAUDE_WEB.md) · 🇦🇲 [hy](../../../hy/docs/providers/CLAUDE_WEB.md) · 🇮🇩 [id](../../../id/docs/providers/CLAUDE_WEB.md) · 🇳🇬 [ig](../../../ig/docs/providers/CLAUDE_WEB.md) · 🇯🇵 [ja](../../../ja/docs/providers/CLAUDE_WEB.md) · 🇬🇪 [ka](../../../ka/docs/providers/CLAUDE_WEB.md) · 🇰🇭 [km](../../../km/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [kn](../../../kn/docs/providers/CLAUDE_WEB.md) · 🇰🇷 [ko](../../../ko/docs/providers/CLAUDE_WEB.md) · 🇱🇹 [lt](../../../lt/docs/providers/CLAUDE_WEB.md) · 🇱🇻 [lv](../../../lv/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [ml](../../../ml/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [mr](../../../mr/docs/providers/CLAUDE_WEB.md) · 🇲🇾 [ms](../../../ms/docs/providers/CLAUDE_WEB.md) · 🇲🇹 [mt](../../../mt/docs/providers/CLAUDE_WEB.md) · 🇲🇲 [my](../../../my/docs/providers/CLAUDE_WEB.md) · 🇳🇵 [ne](../../../ne/docs/providers/CLAUDE_WEB.md) · 🇳🇱 [nl](../../../nl/docs/providers/CLAUDE_WEB.md) · 🇳🇴 [no](../../../no/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [or](../../../or/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [pa](../../../pa/docs/providers/CLAUDE_WEB.md) · 🇵🇭 [phi](../../../phi/docs/providers/CLAUDE_WEB.md) · 🇵🇱 [pl](../../../pl/docs/providers/CLAUDE_WEB.md) · 🇵🇹 [pt](../../../pt/docs/providers/CLAUDE_WEB.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CLAUDE_WEB.md) · 🇷🇴 [ro](../../../ro/docs/providers/CLAUDE_WEB.md) · 🇷🇺 [ru](../../../ru/docs/providers/CLAUDE_WEB.md) · 🇱🇰 [si](../../../si/docs/providers/CLAUDE_WEB.md) · 🇸🇰 [sk](../../../sk/docs/providers/CLAUDE_WEB.md) · 🇸🇮 [sl](../../../sl/docs/providers/CLAUDE_WEB.md) · 🇷🇸 [sr](../../../sr/docs/providers/CLAUDE_WEB.md) · 🇸🇪 [sv](../../../sv/docs/providers/CLAUDE_WEB.md) · 🇰🇪 [sw](../../../sw/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [ta](../../../ta/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [te](../../../te/docs/providers/CLAUDE_WEB.md) · 🇹🇭 [th](../../../th/docs/providers/CLAUDE_WEB.md) · 🇹🇷 [tr](../../../tr/docs/providers/CLAUDE_WEB.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CLAUDE_WEB.md) · 🇵🇰 [ur](../../../ur/docs/providers/CLAUDE_WEB.md) · 🇺🇿 [uz](../../../uz/docs/providers/CLAUDE_WEB.md) · 🇻🇳 [vi](../../../vi/docs/providers/CLAUDE_WEB.md) · 🇳🇬 [yo](../../../yo/docs/providers/CLAUDE_WEB.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CLAUDE_WEB.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CLAUDE_WEB.md)

---

## `claude-web`

`claude-web` invia richieste di chat in formato OpenAI tramite una sessione browser `claude.ai`
autenticata. L'esecutore normalizza il cookie fornito, individua un'organizzazione autenticata,
prepara lo stato della conversazione, seleziona un trasporto diretto o tramite browser e
traduce rigorosamente la risposta SSE upstream. L'orchestrazione si trova in
`open-sse/executors/claude-web.ts:320`.

> **È la prima volta che usi provider basati su cookie Web?**
>
> Leggi **`docs/getting-started/WEB-COOKIE-GUIDE.md`** per la procedura generale di configurazione, le indicazioni sull'autenticazione, le limitazioni e la risoluzione dei problemi prima di seguire questa guida specifica del provider.

### Catalogo dei modelli

Il registro dei provider espone attualmente esattamente questi sette ID di modello statici
(`open-sse/config/providers/registry/claude/web/index.ts:11`):

| ID modello                  | Nome visualizzato       |
| --------------------------- | ----------------------- |
| `claude-fable-5`            | Claude Fable 5 (web)    |
| `claude-opus-4-8`           | Claude Opus 4.8 (web)   |
| `claude-sonnet-5`           | Claude Sonnet 5 (web)   |
| `claude-haiku-4-5-20251001` | Claude Haiku 4.5 (web)  |
| `claude-opus-4-7`           | Claude Opus 4.7 (web)   |
| `claude-opus-4-6`           | Claude Opus 4.6 (web)   |
| `claude-sonnet-4-6`         | Claude Sonnet 4.6 (web) |

L'individuazione dinamica dei modelli non è implementata per questo provider. L'elenco precedente
costituisce il catalogo in fase di esecuzione.

### Credenziali e individuazione dell'organizzazione

Fornisci l'header Cookie completo di `claude.ai` oppure il solo valore della sessione. I valori
singoli vengono normalizzati in `sessionKey`; gli altri cookie vengono mantenuti, se forniti. L'esecutore accetta il
cookie tramite `cookie` o `apiKey` e
legge i valori facoltativi `deviceId` e `orgId` dai dati della connessione
(`open-sse/executors/claude-web.ts:72`).

Se `orgId` è assente, l'esecutore chiama `GET https://claude.ai/api/organizations` e utilizza la prima
organizzazione restituita dalla sessione Claude Web autenticata
(`open-sse/executors/claude-web.ts:141`). L'operazione non riesce se non viene
restituita alcuna organizzazione valida, segnala come 401 un'autorizzazione di sessione rifiutata e distingue una
verifica Cloudflare da un errore di autenticazione.

### Operazioni sulle conversazioni

L'oggetto facoltativo di primo livello `claude_web` è rigoroso. I campi sconosciuti vengono rifiutati. I
campi accettati sono definiti in `open-sse/executors/claude-web/session.ts:50`:

| Campo                 | Significato                                                                     |
| --------------------- | ------------------------------------------------------------------------------- |
| `operation`           | `completion` per impostazione predefinita; usa `retry` per ritentare un turno   |
| `conversation_id`     | UUID esplicito di una conversazione esistente                                   |
| `parent_message_uuid` | UUID esplicito del messaggio assistente principale                              |
| `timezone`            | Nome valido di un fuso orario IANA                                              |
| `locale`              | Impostazione locale strutturalmente valida                                      |
| `tool_states`         | Array facoltativo degli stati degli strumenti dell'account, limitato a 128 voci |

Le richieste preparate utilizzano uno dei due endpoint upstream
(`open-sse/executors/claude-web.ts:203`):

- Un turno nuovo o successivo invia una richiesta a
  `POST https://claude.ai/api/organizations/{orgId}/chat_conversations/{conversationId}/completion`.
- Un nuovo tentativo invia una richiesta a
  `POST https://claude.ai/api/organizations/{orgId}/chat_conversations/{conversationId}/retry_completion`.

Un nuovo turno include `create_conversation_params`. Un turno successivo memorizzato nella cache o collegato esplicitamente
include `parent_message_uuid` e omette `create_conversation_params`. Un nuovo tentativo richiede sia
lo stato della conversazione sia quello del messaggio principale e non invia alcun prompt
(`open-sse/executors/claude-web/session.ts:254`). Le nuove conversazioni aprono l'interfaccia utente autenticata
in `/new`; i turni successivi memorizzati nella cache o collegati esplicitamente aprono la pagina esatta della conversazione
(`open-sse/executors/claude-web/session.ts:324`).

Lo stato della conversazione è una cache in memoria indicizzata in base a un ambito account SHA-256 e alla trascrizione
canonica del chiamante. Le voci scadono dopo 30 minuti e la cache è limitata a 5.000 voci
(`open-sse/executors/claude-web/session.ts:12`). Lo stato viene salvato solo dopo che il parser
rigoroso del flusso osserva `message_stop`; i riavvii del processo lo eliminano. In caso di cache miss, una
richiesta con più messaggi viene serializzata in un unico prompt di ripristino, anziché eliminare silenziosamente
i messaggi precedenti.

Le impostazioni locali e il fuso orario utilizzano questo ordine di precedenza: valore `claude_web` della richiesta, valore della connessione,
valore di runtime, quindi `en-US` per le impostazioni locali o `UTC` per il fuso orario
(`open-sse/executors/claude-web/session.ts:218`).

### Strumenti e payload delle richieste

Le richieste dirette trasformano solo gli strumenti funzione OpenAI strutturalmente validi forniti dal
chiamante. Non viene generato alcun elenco statico predefinito di strumenti
(`open-sse/executors/claude-web/payload.ts:102`).

Le richieste tramite browser acquisiscono invece la richiesta dell'interfaccia utente autenticata e ne mantengono gli strumenti dell'account,
gli stati degli strumenti e gli stili personalizzati. I campi preparati relativi a conversazione, modello, ragionamento, prompt e
UUID dei messaggi continuano ad avere la precedenza sulla richiesta acquisita
(`open-sse/executors/claude-web/browserTransport.ts:175`). I modelli del browser sono circoscritti da un
hash di account, organizzazione, cookie, impostazioni locali e fuso orario e scadono dopo 30 minuti
(`open-sse/executors/claude-web/browserTransport.ts:11`,
`open-sse/executors/claude-web/browserTransport.ts:158`). Quando una richiesta diretta non contiene strumenti del chiamante,
può riutilizzare quel modello circoscritto; gli strumenti espliciti del chiamante hanno la precedenza
(`open-sse/executors/claude-web/browserTransport.ts:214`).

### Selezione del trasporto

Il percorso predefinito è `sendClaudeWebDirect()`, che chiama `tlsFetchClaude()` con il profilo
Chrome 146 configurato e il cookie fornito (`open-sse/services/claudeTlsClient.ts:23`). Non
avvia un solver né genera un cookie sostitutivo.

Imposta `WEB_COOKIE_USE_BROWSER` su `1`, `true` oppure `on` per rendere l'adattatore browser con ambito account il trasporto principale. Imposta `OMNIROUTE_BROWSER_POOL` su uno degli stessi valori per consentire, in presenza di una challenge Cloudflare 403 riconosciuta, il fallback dal trasporto diretto all'adattatore browser (`open-sse/executors/claude-web.ts:195`). Gli altri errori HTTP non attivano tale fallback.

L'adattatore browser mantiene i cookie all'interno dello stesso contesto Playwright nel pool, utilizza la chiave hash con ambito descritta sopra e invia il completamento da tale contesto (`open-sse/executors/claude-web/browserTransport.ts:444`). Non esporta mai nel client TLS diretto un cookie ottenuto dal browser. I tentativi tramite browser richiedono un template UI non scaduto associato allo stesso contesto Playwright effettivo (`open-sse/executors/claude-web/browserTransport.ts:467`). Le letture delle risposte del browser vengono eseguite in modo incrementale nella pagina autenticata, rispettano l'annullamento della richiesta e annullano il corpo upstream non appena supera 16 MiB (`open-sse/executors/claude-web/browserTransport.ts:259`).

L'esecutore restituisce al logger condiviso delle richieste una proiezione di audit con i dati sensibili rimossi: UUID dell'organizzazione, della conversazione e dei messaggi, testo del prompt, definizioni degli strumenti, cookie e identificatori del dispositivo sono esclusi (`open-sse/executors/claude-web.ts:237`,
`open-sse/executors/claude-web.ts:252`). Anche le eccezioni del trasporto restituiscono un errore di connessione generico anziché il messaggio generato dall'eccezione.

### Comportamento SSE

`createClaudeWebResponse()` gestisce il framing LF o CRLF e i campi `data:` su più righe. Associa i delta di testo a `content`, i delta di ragionamento a `reasoning_content` e gli eventi di metadati noti all'estensione della risposta `claude_web`. Ogni evento di metadati viene proiettato tramite il proprio elenco di campi consentiti (`open-sse/executors/claude-web/stream.ts:37`). I metadati relativi a conversazione, messaggio padre, messaggio dell'assistente e operazione vengono inoltre restituiti nelle intestazioni `X-OmniRoute-Claude-Web-*` (`open-sse/executors/claude-web/stream.ts:364`).

Il parser si arresta in modo sicuro in caso di JSON non valido, eventi upstream `error`, tipi di evento sconosciuti, ordinamento non valido, mancata corrispondenza dei blocchi di contenuto o EOF prima di `message_stop`. L'output in streaming emette un solo chunk di completamento e un solo `[DONE]`; l'output con buffering utilizza lo stesso parser. Il parser considera immediatamente `message_stop` come terminale, annulla i dati upstream successivi e propaga l'annullamento downstream al lettore upstream (`open-sse/executors/claude-web/stream.ts:461`,
`open-sse/executors/claude-web/stream.ts:563`). Le righe SSE non terminate e gli eventi accumulati sono limitati a 1 MiB (`open-sse/executors/claude-web/stream.ts:17`,
`open-sse/executors/claude-web/stream.ts:62`).

### File

| File                                                     | Scopo                                      |
| -------------------------------------------------------- | ------------------------------------------ |
| `open-sse/config/providers/registry/claude/web/index.ts` | Registro statico dei modelli del provider  |
| `open-sse/executors/claude-web.ts`                       | Orchestrazione dell'esecutore              |
| `open-sse/executors/claude-web/payload.ts`               | Trasformazione di payload e strumenti      |
| `open-sse/executors/claude-web/session.ts`               | Stato del turno e cache della trascrizione |
| `open-sse/executors/claude-web/transport.ts`             | Adattatore del trasporto diretto           |
| `open-sse/executors/claude-web/browserTransport.ts`      | Adattatore browser con ambito account      |
| `open-sse/executors/claude-web/stream.ts`                | Traduzione SSE rigorosa                    |
| `open-sse/services/claudeTlsClient.ts`                   | Trasporto TLS nativo                       |
| `open-sse/services/browserPool.ts`                       | Contesti Playwright nel pool               |

### Test

Esegui la suite deterministica Claude Web senza credenziali reali:

```powershell
node --import tsx/esm --test tests/unit/claude-web-auto-refresh.test.ts tests/unit/claude-web-browser-transport.test.ts tests/unit/claude-web-executor-split.test.ts tests/unit/claude-web-live-alignment.test.ts tests/unit/claude-web-payload-runtime.test.ts tests/unit/claude-web-session.test.ts tests/unit/claude-web-sonnet5-registry-6209.test.ts tests/unit/claude-web-stream.test.ts tests/unit/claude-web-transport.test.ts tests/unit/claude-web.test.ts tests/unit/issue-6662-repro.test.ts
```

I casi dipendenti da Playwright in `tests/unit/claude-web-auto-refresh.test.ts` vengono esplicitamente ignorati. Questo repository attualmente non definisce uno script di test live di Claude Web con credenziali, pertanto tali casi ignorati non costituiscono una prova del comportamento in fase di esecuzione.

### Configurazione

1. Avvia OmniRoute con `npm run dev` oppure da un'installazione compilata.
2. Apri Dashboard → Provider → Aggiungi provider.
3. Seleziona la categoria Web Cookie e Claude Web.
4. Incolla l'intera intestazione Cookie copiata da una richiesta autenticata a `claude.ai`.
