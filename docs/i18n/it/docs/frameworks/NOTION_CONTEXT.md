# Notion Context Source (Italiano)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/NOTION_CONTEXT.md) · 🇪🇹 [am](../../../am/docs/frameworks/NOTION_CONTEXT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/NOTION_CONTEXT.md) · 🇦🇿 [az](../../../az/docs/frameworks/NOTION_CONTEXT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/NOTION_CONTEXT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/NOTION_CONTEXT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/NOTION_CONTEXT.md) · 🇩🇰 [da](../../../da/docs/frameworks/NOTION_CONTEXT.md) · 🇩🇪 [de](../../../de/docs/frameworks/NOTION_CONTEXT.md) · 🇬🇷 [el](../../../el/docs/frameworks/NOTION_CONTEXT.md) · 🇪🇸 [es](../../../es/docs/frameworks/NOTION_CONTEXT.md) · 🇪🇪 [et](../../../et/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/NOTION_CONTEXT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/NOTION_CONTEXT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇱 [he](../../../he/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/NOTION_CONTEXT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/NOTION_CONTEXT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/NOTION_CONTEXT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇩 [id](../../../id/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/NOTION_CONTEXT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/NOTION_CONTEXT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/NOTION_CONTEXT.md) · 🇰🇭 [km](../../../km/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/NOTION_CONTEXT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/NOTION_CONTEXT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/NOTION_CONTEXT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/NOTION_CONTEXT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/NOTION_CONTEXT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/NOTION_CONTEXT.md) · 🇲🇲 [my](../../../my/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇴 [no](../../../no/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [or](../../../or/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/NOTION_CONTEXT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/NOTION_CONTEXT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/NOTION_CONTEXT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/NOTION_CONTEXT.md) · 🇱🇰 [si](../../../si/docs/frameworks/NOTION_CONTEXT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/NOTION_CONTEXT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/NOTION_CONTEXT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/NOTION_CONTEXT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/NOTION_CONTEXT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [te](../../../te/docs/frameworks/NOTION_CONTEXT.md) · 🇹🇭 [th](../../../th/docs/frameworks/NOTION_CONTEXT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/NOTION_CONTEXT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/NOTION_CONTEXT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/NOTION_CONTEXT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/NOTION_CONTEXT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/NOTION_CONTEXT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/NOTION_CONTEXT.md)

---

> **Fonte autorevole:** `src/lib/notion/api.ts` (client REST), `src/lib/db/notion.ts`
> (persistenza del token), `open-sse/mcp-server/tools/notionTools.ts` (6 strumenti MCP),
> `src/app/api/settings/notion/route.ts` (API delle impostazioni). La registrazione degli strumenti e la
> configurazione degli scope si trovano in `open-sse/mcp-server/server.ts`.

## Che cos'è

OmniRoute può connettersi a uno spazio di lavoro **Notion** come **fonte di contesto** — una base
di conoscenza in lettura/scrittura a cui gli agenti accedono tramite il server MCP integrato. Una volta
configurato un token di integrazione Notion, gli strumenti MCP consentono a un LLM di cercare pagine e database,
leggere il contenuto delle pagine e gli alberi dei blocchi, interrogare i database con filtri/ordinamenti e aggiungere nuovi
blocchi — il tutto tramite il proxy di OmniRoute (con nuovi tentativi, timeout e classificazione degli errori),
così il modello non accede mai direttamente all'API di Notion.

L'integrazione è un wrapper minimale e robusto dell'API REST ufficiale di Notion
(`https://api.notion.com/v1`, `Notion-Version: 2026-03-11`). Il client
(`src/lib/notion/api.ts`) aggiunge:

- **Nuovi tentativi con backoff esponenziale** (fino a 3 tentativi) per `429` e `5xx`.
- **Timeout della richiesta di 55 secondi** tramite `AbortController`.
- **Classificazione tipizzata degli errori** — `NotionAuthError` (401/403),
  `NotionNotFoundError` (404), `NotionRateLimitError` (429, rispetta le indicazioni
  `retry after`), `NotionValidationError` (400/409), `NotionServerError` (5xx),
  `NotionTimeoutError`.
- **Sanificazione dei messaggi** che rimuove frammenti simili a stack trace prima di mostrarli.

## Configurazione

Non esiste **alcuna variabile d'ambiente** per il token Notion: viene archiviato nella
tabella SQLite `key_value` (namespace `notion`, chiave `integration_token`) tramite
`src/lib/db/notion.ts`. Configuralo dalla scheda **Fonti di contesto** della dashboard
dell'Endpoint (`NotionSourceCard`, allo stesso livello di `ObsidianSourceCard`), oppure tramite l'API REST delle impostazioni.

> [!NOTE]
> Il token è un **token di integrazione interna di Notion**. Crea un'integrazione su
> <https://www.notion.com/my-integrations>, quindi condividi con tale integrazione le pagine/i database a cui vuoi che
> OmniRoute acceda (il modello di autorizzazione di Notion si basa sulla condivisione,
> non sull'intero spazio di lavoro).

### Configurazione tramite REST

```bash
# Salva e convalida il token di integrazione (POST esegue la convalida effettuando una ricerca di prova)
curl -X POST http://localhost:20128/api/settings/notion \
  -H "Content-Type: application/json" \
  -d '{"token":"ntn_xxx"}'

# Verifica lo stato della connessione
curl http://localhost:20128/api/settings/notion

# Disconnetti (elimina il token archiviato)
curl -X DELETE http://localhost:20128/api/settings/notion
```

Tutti e tre i metodi richiedono l'autenticazione alla dashboard (`isAuthenticated`). Con `POST`,
OmniRoute salva il token ed esegue immediatamente una ricerca di prova con 1 risultato; se Notion
restituisce un oggetto di errore, il token viene eliminato e la chiamata non riesce con `400`.

## Strumenti MCP (6)

Definiti in `open-sse/mcp-server/tools/notionTools.ts`. Il token viene recuperato al momento della
chiamata tramite `getNotionToken()`; se non ne è configurato alcuno, lo strumento genera
`"Il token di integrazione Notion non è configurato. Impostalo in Impostazioni > Fonti di contesto."`

| Strumento                    | Scope          | Descrizione                                                                                      |
| ---------------------------- | -------------- | ------------------------------------------------------------------------------------------------ |
| `notion_search`              | `read:notion`  | Cerca pagine e database tramite una query testuale (restituisce titoli, ID e URL). Impaginato.   |
| `notion_get_page`            | `read:notion`  | Recupera il contenuto e i metadati di una pagina tramite il relativo ID.                         |
| `notion_list_block_children` | `read:notion`  | Elenca tutti i blocchi figli di un blocco o di una pagina (l'albero dei blocchi). Impaginato.    |
| `notion_query_database`      | `read:notion`  | Interroga un database con `filter` + `sorts` facoltativi (formato API Notion). Impaginato.       |
| `notion_get_database`        | `read:notion`  | Recupera lo schema/i metadati di un database tramite ID.                                         |
| `notion_append_blocks`       | `write:notion` | Aggiunge blocchi figli a un blocco o a una pagina esistente (massimo 100 blocchi per richiesta). |

### Parametri di input

- `notion_search` — `query` (1–500 caratteri), `pageSize` (1–100, valore predefinito 20),
  `startCursor` (facoltativo).
- `notion_get_page` — `pageId` (valore esadecimale di 32 caratteri o UUID).
- `notion_list_block_children` — `blockId`, `pageSize` (1–100, valore predefinito 50),
  `startCursor` (facoltativo).
- `notion_query_database` — `databaseId`, `filter` (facoltativo, formato dei filtri Notion),
  `sorts` (array facoltativo), `pageSize` (1–100, valore predefinito 50), `startCursor` (facoltativo).
- `notion_get_database` — `databaseId`.
- `notion_append_blocks` — `blockId`, `children` (array di oggetti blocco),
  `after` (posizione facoltativa).

### Scope

Gli strumenti di lettura richiedono `read:notion`, mentre lo strumento di scrittura richiede `write:notion`.
Gli scope vengono applicati da `withScopeEnforcement()` in
`open-sse/mcp-server/server.ts` solo quando `OMNIROUTE_MCP_ENFORCE_SCOPES=true`; gli
scope consentiti al chiamante provengono da `OMNIROUTE_MCP_SCOPES` (separati da virgole) o dal
contesto degli scope della chiave API autenticata. Consulta [MCP-SERVER.md](./MCP-SERVER.md) per il
modello completo degli scope.

## Endpoint

| Metodo   | Percorso               | Scopo                                        |
| -------- | ---------------------- | -------------------------------------------- |
| `GET`    | `/api/settings/notion` | Restituisce `{ connected, hasToken }`.       |
| `POST`   | `/api/settings/notion` | Salva e convalida il token di integrazione.  |
| `DELETE` | `/api/settings/notion` | Disconnette (cancella il token memorizzato). |

> Queste sono route delle impostazioni della dashboard. **Non esiste alcun endpoint proxy
> Notion pubblico `/v1`**: Notion è accessibile esclusivamente tramite gli strumenti MCP sopra indicati.

## Casi d'uso

- **Risposte basate sulla conoscenza** — consente a un agente di usare `notion_search` nell'area di lavoro e
  `notion_get_page` sul risultato principale prima di rispondere, affinché le risposte citino documenti interni reali.
- **Flussi di lavoro basati su database** — usa `notion_query_database` su un database di attività/CRM con
  filtri e ordinamenti, quindi riepiloga o assegna priorità alle righe.
- **Scrittura / registrazione** — usa `notion_append_blocks` per aggiungere note di riunione, riepiloghi
  delle esecuzioni o output dell'agente a una pagina esistente (solo aggiunta, senza modifiche distruttive).
- **Esplorazione della struttura** — usa `notion_list_block_children` per esplorare l'albero dei blocchi di una pagina
  oppure `notion_get_database` per individuare lo schema delle proprietà di un database prima di interrogarlo.

## Risorse correlate

- [Server MCP](./MCP-SERVER.md) — trasporti, applicazione degli ambiti e inventario completo degli strumenti.
- [Sorgente di contesto Obsidian](./OBSIDIAN_CONTEXT.md) — l'altra sorgente di contesto integrata.
- [Sistema di memoria](./MEMORY.md) — memoria conversazionale persistente (livello di contesto
  complementare, inserito automaticamente anziché recuperato tramite strumenti).
