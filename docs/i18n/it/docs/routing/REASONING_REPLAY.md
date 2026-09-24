# Reasoning Replay Cache (Italiano)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/REASONING_REPLAY.md) · 🇪🇹 [am](../../../am/docs/routing/REASONING_REPLAY.md) · 🇸🇦 [ar](../../../ar/docs/routing/REASONING_REPLAY.md) · 🇦🇿 [az](../../../az/docs/routing/REASONING_REPLAY.md) · 🇧🇬 [bg](../../../bg/docs/routing/REASONING_REPLAY.md) · 🇧🇩 [bn](../../../bn/docs/routing/REASONING_REPLAY.md) · 🇧🇦 [bs](../../../bs/docs/routing/REASONING_REPLAY.md) · 🇨🇿 [cs](../../../cs/docs/routing/REASONING_REPLAY.md) · 🇩🇰 [da](../../../da/docs/routing/REASONING_REPLAY.md) · 🇩🇪 [de](../../../de/docs/routing/REASONING_REPLAY.md) · 🇬🇷 [el](../../../el/docs/routing/REASONING_REPLAY.md) · 🇪🇸 [es](../../../es/docs/routing/REASONING_REPLAY.md) · 🇪🇪 [et](../../../et/docs/routing/REASONING_REPLAY.md) · 🇮🇷 [fa](../../../fa/docs/routing/REASONING_REPLAY.md) · 🇫🇮 [fi](../../../fi/docs/routing/REASONING_REPLAY.md) · 🇫🇷 [fr](../../../fr/docs/routing/REASONING_REPLAY.md) · 🇮🇪 [ga](../../../ga/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [gu](../../../gu/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ha](../../../ha/docs/routing/REASONING_REPLAY.md) · 🇮🇱 [he](../../../he/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [hi](../../../hi/docs/routing/REASONING_REPLAY.md) · 🇭🇷 [hr](../../../hr/docs/routing/REASONING_REPLAY.md) · 🇭🇺 [hu](../../../hu/docs/routing/REASONING_REPLAY.md) · 🇦🇲 [hy](../../../hy/docs/routing/REASONING_REPLAY.md) · 🇮🇩 [id](../../../id/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ig](../../../ig/docs/routing/REASONING_REPLAY.md) · 🇯🇵 [ja](../../../ja/docs/routing/REASONING_REPLAY.md) · 🇬🇪 [ka](../../../ka/docs/routing/REASONING_REPLAY.md) · 🇰🇭 [km](../../../km/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [kn](../../../kn/docs/routing/REASONING_REPLAY.md) · 🇰🇷 [ko](../../../ko/docs/routing/REASONING_REPLAY.md) · 🇱🇹 [lt](../../../lt/docs/routing/REASONING_REPLAY.md) · 🇱🇻 [lv](../../../lv/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ml](../../../ml/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [mr](../../../mr/docs/routing/REASONING_REPLAY.md) · 🇲🇾 [ms](../../../ms/docs/routing/REASONING_REPLAY.md) · 🇲🇹 [mt](../../../mt/docs/routing/REASONING_REPLAY.md) · 🇲🇲 [my](../../../my/docs/routing/REASONING_REPLAY.md) · 🇳🇵 [ne](../../../ne/docs/routing/REASONING_REPLAY.md) · 🇳🇱 [nl](../../../nl/docs/routing/REASONING_REPLAY.md) · 🇳🇴 [no](../../../no/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [or](../../../or/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [pa](../../../pa/docs/routing/REASONING_REPLAY.md) · 🇵🇭 [phi](../../../phi/docs/routing/REASONING_REPLAY.md) · 🇵🇱 [pl](../../../pl/docs/routing/REASONING_REPLAY.md) · 🇵🇹 [pt](../../../pt/docs/routing/REASONING_REPLAY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/REASONING_REPLAY.md) · 🇷🇴 [ro](../../../ro/docs/routing/REASONING_REPLAY.md) · 🇷🇺 [ru](../../../ru/docs/routing/REASONING_REPLAY.md) · 🇱🇰 [si](../../../si/docs/routing/REASONING_REPLAY.md) · 🇸🇰 [sk](../../../sk/docs/routing/REASONING_REPLAY.md) · 🇸🇮 [sl](../../../sl/docs/routing/REASONING_REPLAY.md) · 🇷🇸 [sr](../../../sr/docs/routing/REASONING_REPLAY.md) · 🇸🇪 [sv](../../../sv/docs/routing/REASONING_REPLAY.md) · 🇰🇪 [sw](../../../sw/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ta](../../../ta/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [te](../../../te/docs/routing/REASONING_REPLAY.md) · 🇹🇭 [th](../../../th/docs/routing/REASONING_REPLAY.md) · 🇹🇷 [tr](../../../tr/docs/routing/REASONING_REPLAY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/REASONING_REPLAY.md) · 🇵🇰 [ur](../../../ur/docs/routing/REASONING_REPLAY.md) · 🇺🇿 [uz](../../../uz/docs/routing/REASONING_REPLAY.md) · 🇻🇳 [vi](../../../vi/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [yo](../../../yo/docs/routing/REASONING_REPLAY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/REASONING_REPLAY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/REASONING_REPLAY.md)

---

> **Fonte autorevole:** `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`
> **Ultimo aggiornamento:** 2026-06-28 — v3.8.40

OmniRoute acquisisce il `reasoning_content` dell'assistente prodotto dai modelli in modalità di ragionamento e lo riproduce in modo trasparente nelle richieste multi-turno quando il provider upstream lo richiede. Ciò elimina gli errori HTTP 400 generati dai provider più rigidi quando nella cronologia della conversazione del client manca il ragionamento del turno precedente.

## Perché esiste

Diversi provider in modalità di ragionamento rifiutano un turno successivo a meno che **il messaggio precedente dell'assistente non includa il `reasoning_content` originale**. L'upstream restituisce un errore 400 con messaggi come:

```
Parametro errato: in modalità di ragionamento, il reasoning_content deve essere restituito all'API.
```

Tuttavia, i client più comuni (Cursor, Cline, Roo Code, OpenAI SDK) rimuovono il `reasoning_content` dalla cronologia che riproducono. OmniRoute lo ripristina da una cache lato server, in modo che la richiesta visualizzata dall'upstream sia coerente. L'issue #1628 ha introdotto la persistenza ibrida in memoria/SQLite affinché la cache sopravviva ai riavvii del processo.

## Architettura

```
Turno N (l'assistente genera):
  → la risposta contiene reasoning_content + tool_calls
  → se requiresReasoningReplay(provider, model): cacheReasoningFromAssistantMessage()
      scrive (memoria + DB), con chiave basata su ogni tool_call.id
  → inoltra la risposta al client (che può conservare o meno il ragionamento)

Turno N+1 (il client invia un messaggio successivo):
  → il traduttore rileva: requiresReasoningReplay(provider, model) === true
  → per ogni messaggio dell'assistente con tool_calls e senza reasoning_content:
      lookupReasoning(toolCalls[0].id) → memoria → DB
      risultato trovato  → msg.reasoning_content = cached; recordReplay()
      nessun risultato → msg.reasoning_content = "" (fallback legacy per le versioni precedenti di DeepSeek)
  → il servizio upstream vede una cronologia coerente → nessun errore 400
```

L'acquisizione avviene in `open-sse/handlers/chatCore.ts` (in due punti, presso le due chiamate a `cacheReasoningFromAssistantMessage`). La riproduzione avviene in `open-sse/translator/index.ts` dopo la coercizione dello schema ma prima dell'invio.

I turni semplici dell'assistente (senza chiamate agli strumenti) utilizzano chiavi diverse: `buildAssistantMessageCacheKey()` calcola un digest dell'ambito della sessione insieme alla trascrizione normalizzata in formato OpenAI fino a quel turno, perché DeepSeek richiede il ragionamento di _ogni_ turno precedente quando è presente `tools`. Per le destinazioni dell'API Responses (ad esempio `opencode-go/deepseek-v4-flash`, instradato a `/responses`), il corpo inviato al servizio upstream contiene `input`, non `messages`; pertanto `translateRequest()` (`open-sse/translator/index.ts`) comunica tramite un'opzione di callback la trascrizione pivot di cui ha calcolato il digest, e i punti di acquisizione calcolano il digest della stessa trascrizione. Il passaggio di riproduzione di Responses viene eseguito sul pivot OpenAI per ogni formato sorgente, quindi vengono riprodotti anche i client Anthropic Messages (Claude → OpenAI → Responses).

## Archiviazione — Memoria ibrida + SQLite

Il percorso critico utilizza una `Map` in memoria (LRU in base alla creazione), supportata da una tabella SQLite per il ripristino dopo un arresto anomalo e la visibilità nella dashboard.

| Livello | Implementazione                                | Scopo                                                  |
| ------- | ---------------------------------------------- | ------------------------------------------------------ |
| Memoria | `Map` in `open-sse/services/reasoningCache.ts` | Ricerche rapide, elimina gli elementi più vecchi a 200 |
| DB      | Tabella `reasoning_cache` (`src/lib/db/`)      | Persiste tra i riavvii e alimenta le statistiche       |

Le scritture vengono effettuate su entrambi i livelli. Le letture consultano prima la memoria e, in caso di esito negativo, ricorrono al DB (gli elementi trovati nel DB vengono reinseriti in memoria). Gli errori del DB non sono bloccanti: la cache in memoria continua a gestire il percorso critico.

**Valori predefiniti:**

- TTL: `2h` (`TTL_MS = 2 * 60 * 60 * 1000`)
- Numero massimo di elementi in memoria: `200` (`MAX_MEMORY_ENTRIES`)
- Eliminazione: prima il `createdAt` meno recente

## Schema del database

Migrazione: `src/lib/db/migrations/033_create_reasoning_cache.sql`

```sql
CREATE TABLE IF NOT EXISTS reasoning_cache (
  tool_call_id   TEXT PRIMARY KEY,
  provider       TEXT NOT NULL,
  model          TEXT NOT NULL,
  reasoning      TEXT NOT NULL,
  char_count     INTEGER NOT NULL DEFAULT 0,
  created_at     TEXT NOT NULL DEFAULT (datetime('now')),
  expires_at     INTEGER NOT NULL
);
```

Indici: `expires_at`, `provider`, `model`, `created_at`. `expires_at` viene memorizzato come secondi dall'epoca Unix; il livello SELECT normalizza i valori di testo legacy tramite `EXPIRES_AT_EPOCH_SQL`.

## Rilevamento di provider / modello

Il replay è abilitato quando `requiresReasoningReplay(provider, model)` restituisce `true`. La funzione verifica due elenchi in `open-sse/services/reasoningCache.ts`.

**ID dei provider (corrispondenza esatta, senza distinzione tra maiuscole e minuscole):**

- `deepseek`
- `opencode-go`
- `siliconflow`
- `nebius`
- `deepinfra`
- `sambanova`
- `fireworks`
- `together`
- `kimi-coding`
- `kimi-coding-apikey`
- `xiaomi-mimo`

**Pattern regex dei modelli (senza distinzione tra maiuscole e minuscole):**

- `/deepseek-r1/i`
- `/deepseek-reasoner/i`
- `/deepseek-chat/i`
- `/deepseek[-/]?v4[-.]flash/i` e `/deepseek[-/]?v4[-.]pro/i` (V4 Flash / Pro, suffisso `-free` opzionale)
- `/(deepseek|zen\/deepseek)-v4/i`
- `/kimi[-/]k\d/i`
- `/qwq/i`
- `/qwen.*think/i`
- `/glm.*think/i`
- `/^mimo[-.]?v\d/i`

Per aggiungere un nuovo provider/modello con requisiti rigorosi, è necessario inserirlo in uno di questi elenchi e scrivere uno unit test che verifichi l'inserimento del replay. La descrizione della PR deve citare l'esatta stringa 400 upstream che ha motivato la modifica.

## API REST

La cache espone due endpoint in `src/app/api/cache/reasoning/route.ts`. Entrambi richiedono l'autenticazione di gestione (`isAuthenticated` da `@/shared/utils/apiAuth`).

| Metodo | Endpoint                                                  | Descrizione                                                   |
| ------ | --------------------------------------------------------- | ------------------------------------------------------------- |
| GET    | `/api/cache/reasoning`                                    | Statistiche + voci paginate                                   |
| GET    | `/api/cache/reasoning?provider=deepseek&model=...&limit=` | Elenco filtrato (`limit` limitato all'intervallo `[1, 200]`)  |
| DELETE | `/api/cache/reasoning`                                    | Cancella tutto (memoria + DB) e azzera i conteggi di hit/miss |
| DELETE | `/api/cache/reasoning?provider=deepseek`                  | Cancella solo le voci relative a un provider                  |
| DELETE | `/api/cache/reasoning?toolCallId=call_abc`                | Elimina una singola voce                                      |

**Struttura della risposta GET:**

```json
{
  "stats": {
    "memoryEntries": 12,
    "dbEntries": 47,
    "totalEntries": 47,
    "totalChars": 138291,
    "hits": 84,
    "misses": 6,
    "replays": 81,
    "replayRate": "90.0%",
    "byProvider": { "deepseek": { "entries": 32, "chars": 98412 } },
    "byModel": { "deepseek-reasoner": { "entries": 32, "chars": 98412 } },
    "oldestEntry": "2026-05-13T10:00:00.000Z",
    "newestEntry": "2026-05-13T11:42:11.000Z"
  },
  "entries": [
    {
      "toolCallId": "call_abc",
      "provider": "deepseek",
      "model": "deepseek-reasoner",
      "reasoning": "...",
      "charCount": 3128,
      "createdAt": "...",
      "expiresAt": "..."
    }
  ]
}
```

## Note operative

- **Pulizia:** `cleanupReasoningCache()` elimina le voci scadute dalla memoria ed esegue `DELETE FROM reasoning_cache WHERE expires_at <= unixepoch('now')`. I worker per il controllo dello stato eseguono periodicamente questa operazione.
- **Ripristino dopo un arresto anomalo:** dopo un riavvio, la memoria è vuota, ma il DB conserva ancora le voci non scadute. La prima ricerca per un determinato `tool_call_id` produce un hit del DB; le ricerche successive producono hit della memoria.
- **Nessun reasoning, nessuna cache:** `cacheReasoningFromAssistantMessage` restituisce `0` quando il messaggio dell'assistente non contiene un campo `reasoning_content` / `reasoning`, pertanto le risposte senza ragionamento non comportano alcun costo.
- **Anche la scrittura è sottoposta a controllo:** entrambi i punti di chiamata in `chatCore.ts` (non-streaming e streaming) chiamano `cacheReasoningFromAssistantMessage()` solo quando `requiresReasoningReplay(provider, model)` è `true`, ossia lo stesso predicato verificato in lettura. Le installazioni che non utilizzano mai un provider con replay non sostengono più il costo della scrittura, dell'aggiornamento dell'indice e del blocco try/catch per ogni risposta contenente reasoning.
- **Provider non rigorosi:** quando `requiresReasoningReplay` è `false` e il formato di destinazione è OpenAI, il traduttore **rimuove** qualsiasi campo `reasoning_content` dai messaggi in uscita: OpenAI Chat Completions non lo accetta.

## Vedi anche

- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — circuit breaker, periodi di attesa, blocchi dei modelli
- [TROUBLESHOOTING.md](../guides/TROUBLESHOOTING.md) — diagnosi degli errori 400 dai servizi upstream
- Codice sorgente: `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`, `open-sse/translator/index.ts`
- Migrazione: `src/lib/db/migrations/033_create_reasoning_cache.sql`
- Route API: `src/app/api/cache/reasoning/route.ts`
- Issue originale: #1628
