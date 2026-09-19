# Memory System (Italiano)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/MEMORY.md) · 🇪🇹 [am](../../../am/docs/frameworks/MEMORY.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/MEMORY.md) · 🇦🇿 [az](../../../az/docs/frameworks/MEMORY.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/MEMORY.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/MEMORY.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/MEMORY.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/MEMORY.md) · 🇩🇰 [da](../../../da/docs/frameworks/MEMORY.md) · 🇩🇪 [de](../../../de/docs/frameworks/MEMORY.md) · 🇬🇷 [el](../../../el/docs/frameworks/MEMORY.md) · 🇪🇸 [es](../../../es/docs/frameworks/MEMORY.md) · 🇪🇪 [et](../../../et/docs/frameworks/MEMORY.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/MEMORY.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/MEMORY.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/MEMORY.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/MEMORY.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/MEMORY.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/MEMORY.md) · 🇮🇱 [he](../../../he/docs/frameworks/MEMORY.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/MEMORY.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/MEMORY.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/MEMORY.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/MEMORY.md) · 🇮🇩 [id](../../../id/docs/frameworks/MEMORY.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/MEMORY.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/MEMORY.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/MEMORY.md) · 🇰🇭 [km](../../../km/docs/frameworks/MEMORY.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/MEMORY.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/MEMORY.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/MEMORY.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/MEMORY.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/MEMORY.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/MEMORY.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/MEMORY.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/MEMORY.md) · 🇲🇲 [my](../../../my/docs/frameworks/MEMORY.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/MEMORY.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/MEMORY.md) · 🇳🇴 [no](../../../no/docs/frameworks/MEMORY.md) · 🇮🇳 [or](../../../or/docs/frameworks/MEMORY.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/MEMORY.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/MEMORY.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/MEMORY.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/MEMORY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/MEMORY.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/MEMORY.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/MEMORY.md) · 🇱🇰 [si](../../../si/docs/frameworks/MEMORY.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/MEMORY.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/MEMORY.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/MEMORY.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/MEMORY.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/MEMORY.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/MEMORY.md) · 🇮🇳 [te](../../../te/docs/frameworks/MEMORY.md) · 🇹🇭 [th](../../../th/docs/frameworks/MEMORY.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/MEMORY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/MEMORY.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/MEMORY.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/MEMORY.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/MEMORY.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/MEMORY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/MEMORY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/MEMORY.md)

---

> **Fonte autorevole:** `src/lib/memory/` e `src/app/api/memory/`
> **Ultimo aggiornamento:** 2026-06-28 — v3.8.40 (disattivata per impostazione predefinita + aggiornamento della quantizzazione int8)

OmniRoute fornisce una memoria conversazionale persistente associata alla chiave API (e
facoltativamente all'ID di sessione). I ricordi vengono estratti automaticamente dalle risposte dell'LLM
tramite un leggero sistema di corrispondenza basato su espressioni regolari e reinseriti nelle richieste
successive come messaggio di sistema iniziale (o come primo messaggio utente per i provider che
rifiutano il ruolo di sistema).

> **La memoria è DISATTIVATA per impostazione predefinita (v3.8.30+).** `DEFAULT_MEMORY_SETTINGS.enabled`
> ora è `false` (`src/lib/memory/settings.ts`). L'abilitazione della memoria inserisce fino a
> `maxTokens` (~2k) di contesto recuperato in **ogni** richiesta di chat, con conseguenti
> costi — una spesa inaspettata per le nuove installazioni e per i client che gestiscono
> autonomamente il proprio contesto. Attivala esplicitamente in **Impostazioni → Memoria** (la
> scheda `MemorySkillsTab` mostra un avviso relativo al costo in token quando la memoria è abilitata).
> Un client può escludere dalla memoria una singola richiesta tramite l'header di richiesta
> `x-omniroute-no-memory` (`true`/`1`/`yes`) — consulta la tabella degli header di richiesta in
> [API_REFERENCE.md](../reference/API_REFERENCE.md). Una richiesta senza memoria imposta
> `memoryOwnerId = null`, disabilitando **sia** l'inserimento della memoria **sia** quello delle skill
> per tale richiesta (`open-sse/handlers/chatCore/headers.ts::isNoMemoryRequested`).

La memoria è **circoscritta a ciascuna chiave API**, non a ciascun utente: ogni richiesta autenticata
con la stessa chiave API condivide lo stesso pool di memoria, con un'ulteriore
segmentazione facoltativa tramite `sessionId`.

## Architettura

```
Client → /v1/chat/completions (apiKeyInfo risolto a monte)
  → handleChatCore() [open-sse/handlers/chatCore.ts]
    → resolveMemoryOwnerId(apiKeyInfo)        # estrae l'ID
    → getMemorySettings()                     # impostazioni memorizzate nella cache
    → shouldInjectMemory(body, {enabled})     # controllo di accesso
    → retrieveMemories(apiKeyId, config)      # SQL + FTS5 + vettore facoltativo
    → injectMemory(body, memories, provider)  # messaggio di sistema o utente
  → chiamata al provider a monte
  → alla risposta: extractFacts(text, apiKeyId, sessionId)  # non bloccante
    → setImmediate → createMemory(fact) per ogni corrispondenza
                   → embed(content) + upsertVector(id, vec)
```

I punti di chiamata per l'inserimento e l'estrazione sono configurati in
`open-sse/handlers/chatCore.ts` (cerca `retrieveMemories`, `injectMemory`
ed `extractFacts`).

## Architettura del motore (risoluzione a 3 livelli)

Il motore della memoria determina il percorso di recupero in fase di esecuzione in base
all'infrastruttura disponibile e alle impostazioni. Esistono tre livelli, applicati in ordine di priorità:

```
  ┌─────────────────────────────────────────────────────────────┐
  │  LIVELLO 0 — Parole chiave (FTS5)                            │
  │  Disponibilità determinata tramite verifica: FTS5 quando     │
  │  la build di SQLite lo supporta (better-sqlite3 /             │
  │  node:sqlite / bun:sqlite); non disponibile nelle build      │
  │  prive di FTS5 (ad es. sql.js/WASM —                         │
  │  "no such module: fts5"). Utilizzato quando strategy =       │
  │  "exact" o come ripiego; il campo keyword dello stato del    │
  │  motore riflette il risultato della verifica.                │
  └──────────────────────────────────┬──────────────────────────┘
                                     │ strategy = semantic|hybrid?
                                     ▼
  ┌─────────────────────────────────────────────────────────────┐
  │  LIVELLO 1 — Vettore integrato (sqlite-vec)                  │
  │  sqlite-vec v0.1.9 caricato tramite db.loadExtension().      │
  │  KNN a forza bruta su vettori Float32. Attivo quando:        │
  │   • il caricamento di sqlite-vec tramite loadExtension riesce│
  │   • è disponibile una sorgente di embedding (remote |        │
  │     static | transformers) in grado di produrre un           │
  │     Float32Array                                              │
  │   • la tabella vec_memories esiste (creata alla prima        │
  │     esecuzione di ready())                                   │
  └──────────────────────────────────┬──────────────────────────┘
                                     │ qdrant.enabled?
                                     ▼
  ┌─────────────────────────────────────────────────────────────┐
  │  LIVELLO 2 — Qdrant (database vettoriale esterno opzionale)  │
  │  Quando abilitato, sostituisce sqlite-vec per la ricerca     │
  │  semantic/hybrid. Richiede un'istanza Qdrant in esecuzione   │
  │  e host/porta configurati.                                   │
  └─────────────────────────────────────────────────────────────┘
```

La degradazione è automatica e trasparente:

- Se il caricamento di sqlite-vec non riesce, il livello 1 non è disponibile → viene utilizzato il livello 0.
- Se la sorgente di embedding restituisce un errore, il livello 1 utilizza il livello 0 come ripiego.
- Se Qdrant non è operativo, il livello 2 utilizza il livello 1 come ripiego (oppure il livello 0 se anche il livello 1
  non è disponibile).

## Fonti degli embedding

Il livello di embedding (`src/lib/memory/embedding/`) determina quale fonte utilizzare
in base a `MemorySettingsExtended.embeddingSource`:

| Fonte          | Descrizione                                                                                     | Chiave richiesta | Avvio a freddo      |
| -------------- | ----------------------------------------------------------------------------------------------- | ---------------- | ------------------- |
| `remote`       | Utilizza l'API di embedding di un provider configurato (OpenAI, Cohere, ecc.)                   | Sì               | Nessuno             |
| `static`       | Embedding locale tramite tabella di ricerca con `potion-base-8M` (WordPiece + mean pooling)     | No               | ~200ms              |
| `transformers` | Inferenza ONNX locale tramite `@huggingface/transformers` v4, `all-MiniLM-L6-v2`                | No               | ~3s + ~400MB di RAM |
| `auto`         | Risoluzione in fase di esecuzione: remote (se esiste una chiave) → static → transformers → null | Dipende          | Dipende             |

**Ordine di risoluzione per `auto`:**

1. Trova il primo provider in `listEmbeddingProviders()` con `hasKey === true` → `remote`.
2. Se `settings.staticEnabled === true` → `static`.
3. Se `settings.transformersEnabled === true` → `transformers`.
4. Altrimenti → `null` (passa alla ricerca per parole chiave FTS5).

La cache degli embedding (`src/lib/memory/embedding/cache.ts`) utilizza una mappa
LRU in memoria indicizzata da `${source}:${model}:${dim}:${sha256(text)}`, limitata a
`MEMORY_EMBEDDING_CACHE_MAX` voci (valore predefinito: 1000) con un TTL di
`MEMORY_EMBEDDING_CACHE_TTL_MS` (valore predefinito: 5 min). È condivisa tra tutti i chiamanti
per l'intero ciclo di vita del processo.

## RRF ibrido (k=60)

Quando `strategy = "hybrid"` e l'archivio vettoriale è disponibile, il recupero utilizza
Reciprocal Rank Fusion per unire i risultati FTS5 e vettoriali:

```
RRF(d) = Σ  1 / (k + rank_i(d))      dove k = 60 (configurabile tramite MEMORY_RRF_K)
          i
```

In concreto:

1. Esegue la ricerca FTS5 → elenco ordinato `R_fts` (posizione 1..N).
2. Esegue la ricerca vettoriale KNN → elenco ordinato `R_vec` (posizione 1..M).
3. Per ogni `memoryId` univoco:  
   `rrf_score = 1/(60 + fts_rank)` + `1/(60 + vec_rank)` (0 se non è presente nell'elenco).
4. Ordina per `rrf_score` in ordine DESC e applica la scansione del budget di token.

RRF è noto per essere efficace senza richiedere la normalizzazione dei punteggi tra
sistemi di recupero eterogenei. Il valore predefinito `k=60` proviene dall'articolo originale
di Cormack et al. e funziona bene per corpus di piccole dimensioni (<10.000 memorie).

## Backfill (differito + reindicizzazione)

Quando il modello di embedding cambia (rilevato tramite `embedding_signature`), l'archivio
vettoriale viene ricostruito e tutte le memorie esistenti vengono contrassegnate con
`needs_reindex = 1` nella tabella `memories`.

**Backfill differito**: Al recupero successivo, qualsiasi memoria priva di una voce vettoriale
viene convertita in embedding e inserita in `vec_memories` prima dell'esecuzione della ricerca. Questo
ammortizza il costo del backfill sulle richieste reali senza bloccare l'avvio.

**Reindicizzazione esplicita**: La scheda Engine in `/dashboard/memory` fornisce un
pulsante "Reindicizza ora" che chiama `POST /api/memory/reindex`. Il gestore chiama
`runReindexBatch()` da `src/lib/memory/reindex.ts`, che elabora fino a
`limit` voci in sospeso per richiesta. L'avanzamento può essere verificato tramite
`GET /api/memory/engine-status` (`vectorStore.needsReindex`).

La tabella `memory_vec_meta` (migrazione `083_memory_vec.sql`) memorizza:

- `active_dim` — dimensione vettoriale corrente (null = non ancora calibrata).
- `embedding_signature` — `${source}:${model}:${dim}` utilizzata per rilevare le modifiche.
- `last_reset_at` — timestamp dell'ultimo ripristino completo.
- `vec_loaded` — flag 0/1 che indica se sqlite-vec è stato caricato correttamente.

## Estensione delle impostazioni

Nove campi relativi agli embedding e ai vettori sono disponibili in `MemorySettingsExtended` in
`src/shared/schemas/memory.ts` e vengono resi persistenti tramite `src/lib/db/settings.ts`:

| Campo                    | Tipo                                               | Valore predefinito | Descrizione                                                         |
| ------------------------ | -------------------------------------------------- | ------------------ | ------------------------------------------------------------------- |
| `embeddingSource`        | `"remote" \| "static" \| "transformers" \| "auto"` | `"auto"`           | Sorgente di embedding da utilizzare                                 |
| `embeddingProviderModel` | `string \| null`                                   | `null`             | Provider/modello nel formato `provider/model`                       |
| `customBaseUrl`          | `string \| null`                                   | `null`             | URL di base dell'endpoint compatibile con OpenAI riservato a Memory |
| `customModelId`          | `string \| null`                                   | `null`             | ID del modello inviato all'endpoint personalizzato                  |
| `transformersEnabled`    | `boolean`                                          | `false`            | Abilitazione esplicita di Transformers.js (MiniLM, ~400MB)          |
| `staticEnabled`          | `boolean`                                          | `false`            | Abilitazione esplicita del modello locale statico potion-base-8M    |
| `rerankEnabled`          | `boolean`                                          | `false`            | Abilita la fase di riordinamento (aggiunge +200-500ms/richiesta)    |
| `rerankProviderModel`    | `string \| null`                                   | `null`             | Provider/modello di riordinamento nel formato `provider/model`      |
| `vectorStore`            | `"sqlite-vec" \| "qdrant" \| "auto"`               | `"auto"`           | Backend vettoriale da utilizzare                                    |

Questi campi sono esposti tramite `GET /PUT /api/settings/memory` (schema `MemorySettingsExtendedSchema`).

Per la sorgente `remote`, Memory accetta anche le impostazioni facoltative `customBaseUrl` e
`customModelId`. Insieme selezionano un endpoint `/embeddings` compatibile con OpenAI
e un modello senza modificare il registro globale degli embedding. L'endpoint viene
normalizzato prima dell'uso e verificato in base alla politica del provider per gli URL in uscita: è
richiesto HTTP(S), le credenziali incorporate e le stringhe di query vengono rifiutate e gli
indirizzi dei metadati cloud rimangono bloccati. I valori vuoti mantengono il provider selezionato
nel registro. Gli errori restituiti alla dashboard vengono sanificati e le credenziali
dell'endpoint non vengono mai registrate nei log.

> **TODO (D20):** L'ambito `global` (condivisione dei ricordi tra tutte le chiavi API) non è
> implementato in questa versione. Richiede modifiche allo schema e un percorso di recupero
> globale. Da gestire separatamente.

## Livelli di archiviazione

### Primario: SQLite (tabella `memories`)

Creata dalla migrazione `015_create_memories.sql`:

| Colonna                     | Tipo               | Note                                                                               |
| --------------------------- | ------------------ | ---------------------------------------------------------------------------------- |
| `id`                        | `TEXT PRIMARY KEY` | UUID generato tramite `crypto.randomUUID()`                                        |
| `api_key_id`                | `TEXT NOT NULL`    | Chiave API proprietaria                                                            |
| `session_id`                | `TEXT`             | Ambito facoltativo per conversazione                                               |
| `type`                      | `TEXT NOT NULL`    | Uno tra `factual`, `episodic`, `procedural`, `semantic`                            |
| `key`                       | `TEXT`             | Chiave di upsert stabile, ad es. `preference:i_prefer_python`                      |
| `content`                   | `TEXT NOT NULL`    | Il testo effettivo del fatto                                                       |
| `metadata`                  | `TEXT`             | Blob JSON (categoria, extractedAt, sorgente, ...)                                  |
| `created_at` / `updated_at` | `TEXT`             | Stringhe ISO 8601                                                                  |
| `expires_at`                | `TEXT`             | Scadenza facoltativa; `NULL` indica permanente                                     |
| `memory_id`                 | `INTEGER UNIQUE`   | Aggiunto da `023_fix_memory_fts_uuid.sql` per collegare gli UUID ↔ i rowid di FTS5 |

Indici: `api_key_id`, `session_id`, `type`, `expires_at`, oltre all'indice univoco
`memory_id`.

**Semantica di upsert**: `createMemory()` cerca una riga esistente con la stessa
combinazione `(api_key_id, key)` e, se la trova, la aggiorna sul posto (unendo `metadata` tramite
uno spread superficiale). Ciò impedisce che la tabella cresca senza limiti in presenza di
dichiarazioni di preferenza ripetute.

### Ricerca full-text (tabella virtuale `memory_fts`)

`022_add_memory_fts5.sql` crea una tabella virtuale FTS5 su `content` e
`key`. `023_fix_memory_fts_uuid.sql` corregge un bug riscontrato nell'uso reale, per cui la chiave
primaria UUID non poteva essere unita al rowid intero di FTS5: la migrazione aggiunge la
colonna `memory_id`, ricrea la tabella FTS e configura i trigger
(`memory_fts_ai`, `memory_fts_ad`, `memory_fts_au`) che mantengono FTS sincronizzato in caso di
INSERT, DELETE e UPDATE.

Utilizzata da `retrieval.ts` per le strategie `semantic` e `hybrid` (vedere sotto).
Il codice di recupero esegue un controllo con `hasTable("memory_fts")` e ripiega
sull'ordine cronologico se la tabella FTS non è presente o la query FTS genera un errore.

### Facoltativo: Qdrant (archivio vettoriale di livello 2)

`src/lib/memory/qdrant.ts` implementa un'integrazione facoltativa con Qdrant come archivio
vettoriale di livello 2. Il recupero viene indirizzato a Qdrant solo quando il selettore del motore
`memoryVectorStore === "qdrant"`; il valore predefinito `"auto"` (e `"sqlite-vec"`)
**non** seleziona mai Qdrant. L'interruttore nella scheda Engine imposta **sia** `qdrantEnabled` sia
`memoryVectorStore`: l'abilitazione rende Qdrant l'archivio principale, mentre la disabilitazione
ripristina `"auto"` (#5597 — prima di questa correzione, l'abilitazione non aveva effetto perché nulla
scriveva nel selettore del motore). Se Qdrant non è raggiungibile o non restituisce alcun risultato, il recupero
ripiega su sqlite-vec → FTS5.

- `upsertSemanticMemoryPoint()` — incorpora `key + content` con il modello di
  embedding configurato, verifica che la raccolta esista (creando vettori con
  distanza del coseno al primo utilizzo) ed esegue l'upsert di un punto con payload
  `{memoryId, apiKeyId, sessionId, key, content, metadata, createdAtUnix, expiresAtUnix}`.
- `searchSemanticMemory(query, topK, scope)` — incorpora la query, esegue la ricerca
  nella raccolta filtrando per `kind = "omniroute_memory"` e, facoltativamente, per
  `apiKeyId` / `sessionId`. Limita `topK` all'intervallo `[1, 20]`.
- `deleteSemanticMemoryPoint(id)` — elimina un singolo punto. Viene chiamata da
  `deleteMemory()` dopo la rimozione della riga SQLite (D15).
- `cleanupSemanticMemoryPoints({retentionDays})` — elimina in blocco i punti il cui
  `expiresAtUnix` è nel passato o il cui `createdAtUnix` è precedente alla soglia
  di conservazione. Prima li conta, in modo che la dashboard possa mostrare i numeri effettivi.
- `checkQdrantHealth()` — controllo di integrità `GET /readyz` con latenza.

L'interfaccia utente delle impostazioni espone la configurazione di Qdrant, il controllo
di integrità, il test della ricerca semantica e la pulizia nella **scheda Engine** di
`/dashboard/memory`. Le route corrispondenti in `src/app/api/settings/qdrant/` sono
tutte collegate a partire dalla v3.8.6:

| Route                                   | Metodo        | Descrizione                               |
| --------------------------------------- | ------------- | ----------------------------------------- |
| `/api/settings/qdrant`                  | `GET` / `PUT` | Legge / aggiorna le impostazioni Qdrant   |
| `/api/settings/qdrant/health`           | `GET`         | Controllo di operatività + latenza        |
| `/api/settings/qdrant/search`           | `POST`        | Test della ricerca semantica              |
| `/api/settings/qdrant/cleanup`          | `POST`        | Rimuove i punti scaduti / obsoleti        |
| `/api/settings/qdrant/embedding-models` | `GET`         | Elenca i modelli di embedding disponibili |

**Note sul comportamento (cosa aspettarsi):**

- **Selezione del motore** — l'abilitazione di Qdrant nella scheda Engine lo rende
  l'archivio principale (imposta `memoryVectorStore="qdrant"`); la disabilitazione
  ripristina `"auto"` (#5597).
- **Nessun popolamento retroattivo** — solo le memorie create/aggiornate **dopo**
  l'abilitazione di Qdrant vengono scritte al suo interno (doppia scrittura
  fire-and-forget). Le memorie SQLite preesistenti **non** vengono migrate;
  "Reindex Now" ricostruisce solo l'indice sqlite-vec, non Qdrant.
- **La dimensione dei vettori viene rilevata automaticamente** dall'embedding effettivo
  al primo utilizzo: non è presente alcun campo per la dimensione da compilare. La
  modifica del modello di embedding dopo la creazione di una raccolta **non** viene
  gestita automaticamente: la raccolta esistente rimane invariata, le scritture/ricerche
  con dimensioni non corrispondenti non riescono e ricorrono a sqlite-vec. Per cambiare
  modello di embedding, ricrea la raccolta (con un nuovo nome oppure eliminandola in Qdrant).
- **Metrica di distanza** — sempre **Cosine** (impostata direttamente nel codice alla
  creazione della raccolta; non configurabile).
- **Autenticazione** — solo chiave API (inviata come header `api-key`; facoltativa per
  Docker locale senza autenticazione). JWT/RBAC non vengono utilizzati.
- **Campi di configurazione** — l'interfaccia utente espone `host`, `port`, `collection`,
  `embeddingModel`, `apiKey`. `vectorSize` / `hnswEfConstruct` sono disponibili solo
  tramite ambiente/DB e `vectorSize` non viene utilizzato per la creazione della raccolta
  (la dimensione deriva dall'embedding).

### Quantizzazione dei vettori (int8 — facoltativa, entrambi i backend)

Entrambi i backend vettoriali supportano la **quantizzazione int8 facoltativa** per
ridurre l'occupazione in memoria dei vettori archiviati (~4 volte inferiore rispetto
a Float32), al costo di una piccola riduzione del richiamo. Per impostazione predefinita
è **disattivata** su entrambi: i vettori rimangono a precisione piena, a meno che non
venga esplicitamente abilitata.

| Backend    | Impostazione                     | Tipo                           | Predefinito | Punto di lettura                                            |
| ---------- | -------------------------------- | ------------------------------ | ----------- | ----------------------------------------------------------- |
| Qdrant     | `qdrantQuantization` (chiave DB) | `"none" \| "int8" \| "binary"` | `"none"`    | `src/lib/memory/qdrant.ts::normalizeQdrantConfig()`         |
| sqlite-vec | `MEMORY_VEC_QUANTIZATION` (env)  | `"none" \| "int8"`             | `"none"`    | `src/lib/memory/vectorStore.ts::requestedVecQuantization()` |

- **Qdrant** viene configurato per ciascuna istanza tramite la chiave di impostazione
  `qdrantQuantization` (esposta come campo `quantization` in
  `PUT /api/settings/qdrant`). Quando è impostata su `"int8"`,
  `buildQuantizationConfig()` richiede la quantizzazione scalare (`always_ram`,
  quantile `0.99`) e le ricerche abilitano `rescore: true`, in modo che i vettori
  a precisione piena perfezionino l'insieme di candidati int8.
- La quantizzazione di **sqlite-vec** è disponibile **solo tramite ambiente** (non è
  un'impostazione DB): imposta `MEMORY_VEC_QUANTIZATION=int8` per archiviare i vettori
  locali come colonna `int8[dim]` tramite `vec_quantize_int8(?, 'unit')`. La modalità
  scelta viene inclusa in `embedding_signature` (un suffisso `:int8`), pertanto il
  passaggio da una modalità all'altra attiva una reindicizzazione completa della
  tabella `vec_memories`, usando lo stesso percorso di popolamento differito utilizzato
  quando cambia il modello di embedding.

## Tipi di memoria

`MemoryType` (`src/lib/memory/types.ts`):

| Tipo         | Utilizzato per                                                                               |
| ------------ | -------------------------------------------------------------------------------------------- |
| `factual`    | Preferenze, fatti stabili sull'utente, modelli comportamentali                               |
| `episodic`   | Decisioni legate a un momento specifico ("Ho scelto Postgres")                               |
| `procedural` | Memoria di flussi di lavoro / procedure (riservata; attualmente senza estrattore automatico) |
| `semantic`   | Riservata alle voci del vector store                                                         |

La strategia di recupero di `MemoryConfig` è una tra `exact`, `semantic` o `hybrid`,
mentre l'ambito è uno tra `session`, `apiKey` o `global`. L'ambito predefinito di
`getMemorySettings()` è `apiKey`.

## Estrazione dei fatti (`extraction.ts`)

L'estrazione è **basata su espressioni regolari**, non su LLM: viene eseguita nello stesso processo con
`setImmediate()`, quindi non blocca mai il flusso della risposta:

- **Pattern di preferenza** → `MemoryType.FACTUAL`
  (ad es. `Preferisco …`, `Mi piace molto …`, `il mio preferito è …`, `Odio …`)
- **Pattern decisionali** → `MemoryType.EPISODIC`
  (ad es. `Userò …`, `Ho scelto …`, `Ho optato per …`, `Adotterò …`)
- **Pattern comportamentali** → `MemoryType.FACTUAL`
  (ad es. `Di solito …`, `Faccio sempre …`, `Tendo a …`)

Ogni corrispondenza viene sanificata (`trim`, compressione degli spazi vuoti, limite di 500 caratteri),
deduplicata all'interno del batch tramite una chiave stabile `factKey(category, content)` e
archiviata tramite `createMemory()` con i metadati
`{category, extractedAt, source: "llm_response"}`. Il testo di input è limitato a
64 KiB (`MAX_EXTRACTION_TEXT_LENGTH`): quando è più lungo, viene usata la **parte finale** del testo,
in modo che il contenuto più recente dell'assistente venga sempre considerato.

`extractFactsFromText(text)` viene esportata per i test e restituisce i fatti strutturati
senza archiviarli.

## Recupero (`retrieval.ts`)

`retrieveMemories(apiKeyId, config)` è il punto di ingresso principale. La funzione:

1. Normalizza e convalida la configurazione tramite `MemoryConfigSchema`.
2. Restituisce immediatamente `[]` quando `enabled` è false o `maxTokens <= 0`.
3. Limita `maxTokens` all'intervallo `[1, 8000]`.
4. Rileva se esiste la tabella moderna `memories` (in contrapposizione alla tabella legacy `memory`),
   affinché i database meno recenti continuino a funzionare.
5. Costruisce la query di base con una condizione di scadenza
   (`expires_at IS NULL OR datetime(expires_at) > datetime('now')`), un ambito di sessione
   facoltativo e un limite temporale facoltativo basato su `retentionDays`.
6. Si ramifica in base alla strategia:
   - **`exact`** (predefinita): ordinamento cronologico `ORDER BY created_at DESC LIMIT 100`.
   - **`semantic`**: se `config.query` è impostato ed esiste `memory_fts`, esegue la JOIN
     `memory_fts MATCH ?` e ordina per rango FTS; ripiega sull'ordinamento cronologico
     quando FTS restituisce 0 righe.
   - **`hybrid`**: unione dei risultati FTS (con rilevanza maggiore) e dell'insieme
     cronologico, con deduplicazione per id.
7. Calcola un punteggio di rilevanza basato su parole chiave (`getRelevanceScore`) su
   `content`, `key` e sul JSON `metadata` quando viene fornita una query. Le righe con
   punteggio zero vengono escluse.
8. Ordina prima per punteggio decrescente, quindi per `createdAt` decrescente.
9. Scorre l'elenco ordinato e accetta le voci finché il conteggio progressivo di
   `estimateTokens(content)` (≈ `length / 4`) rimane entro il budget. Restituisce sempre
   almeno una voce quando esiste una corrispondenza.

`estimateTokens` viene esportata ed è utilizzata dal recupero, dalla riepilogazione e dallo strumento MCP
`omniroute_memory_search`.

## Iniezione (`injection.ts`)

`injectMemory(request, memories, provider)`:

1. Unisce tutti i contenuti delle memorie in un'unica stringa `Memory context: …`.
2. Seleziona una strategia in base al nome del provider:
   - **Messaggio di sistema** (impostazione predefinita per OpenAI, Anthropic, Gemini, …) — antepone
     un elemento `{role: "system", content: memoryText}` a tutti i messaggi di sistema
     esistenti, in modo che i prompt di sistema dell'utente mantengano la precedenza.
   - **Messaggio utente** (fallback) — per i provider inclusi in
     `PROVIDERS_WITHOUT_SYSTEM_MESSAGE`: `o1`, `o1-mini`, `o1-preview`,
     `glm`, `glmt`, `glm-cn`, `zai`, `qianfan`. Questi rifiutano il ruolo di sistema
     e altrimenti restituirebbero un errore 400 (cfr. issue #1701 per GLM/Zhipu).
3. Registra il conteggio, la strategia e il modello in `memory.injection.injected`.

`providerSupportsSystemMessage(provider)` viene esportata per i chiamanti che devono
prendere autonomamente decisioni di instradamento. Per sicurezza, i provider sconosciuti
hanno come valore predefinito `true` (ruolo di sistema consentito).

## Impostazioni (`settings.ts`)

La configurazione della memoria è **archiviata nella tabella delle impostazioni del DB**, non nelle variabili di ambiente.
`getMemorySettings()` legge da `getSettings()` e memorizza il risultato nella cache
del processo; `invalidateMemorySettingsCache()` viene chiamata dalla route PUT delle impostazioni
dopo le scritture.

### Campi legacy (tutte le versioni)

| Chiave DB             | Tipo    | Valore predefinito                                               | Controllo UI                                                                |
| --------------------- | ------- | ---------------------------------------------------------------- | --------------------------------------------------------------------------- |
| `memoryEnabled`       | boolean | `false` (disattivata per impostazione predefinita dalla v3.8.30) | Attivazione/disattivazione della memoria                                    |
| `memoryMaxTokens`     | integer | `2000` (intervallo `0–16000`)                                    | Budget di token per l'iniezione                                             |
| `memoryRetentionDays` | integer | `30` (intervallo `1–365`)                                        | Finestra di conservazione                                                   |
| `memoryStrategy`      | enum    | `"hybrid"` (uno tra `recent`, `semantic`, `hybrid`)              | Strategia di recupero                                                       |
| `skillsEnabled`       | boolean | `false`                                                          | Attiva/disattiva l'iniezione delle competenze per chiave (vedere SKILLS.md) |

Nota: la strategia UI `"recent"` viene mappata sulla strategia interna di recupero
`"exact"` tramite `toMemoryRetrievalConfig()` (ordine cronologico).

### Nuovi campi (v3.8.6, piano 21 D9)

Vedere anche la sezione "Estensione delle impostazioni" sopra per le descrizioni dei campi.

| Chiave DB                   | Campo API                | Valore predefinito |
| --------------------------- | ------------------------ | ------------------ |
| `memoryEmbeddingSource`     | `embeddingSource`        | `"auto"`           |
| `memoryEmbeddingModel`      | `embeddingProviderModel` | `null`             |
| `memoryTransformersEnabled` | `transformersEnabled`    | `false`            |
| `memoryStaticEnabled`       | `staticEnabled`          | `false`            |
| `memoryRerankEnabled`       | `rerankEnabled`          | `false`            |
| `memoryRerankModel`         | `rerankProviderModel`    | `null`             |
| `memoryVectorStore`         | `vectorStore`            | `"auto"`           |

Le chiavi DB relative a Qdrant (`qdrantEnabled`, `qdrantHost`, `qdrantPort`,
`qdrantApiKey`, `qdrantCollection` con valore predefinito `"omniroute_memory"`,
`qdrantEmbeddingModel` con valore predefinito `"openai/text-embedding-3-small"`) vengono lette da
`normalizeQdrantConfig()` in `qdrant.ts`.

### Variabili di ambiente (v3.8.6)

Sei variabili di ambiente facoltative regolano il comportamento del motore in fase di esecuzione (documentate in `.env.example`):

| Variabile                       | Valore predefinito         | Descrizione                                                                                                                                                                         |
| ------------------------------- | -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `MEMORY_EMBEDDING_CACHE_TTL_MS` | `300000`                   | TTL della cache degli embedding (5 min)                                                                                                                                             |
| `MEMORY_EMBEDDING_CACHE_MAX`    | `1000`                     | Numero massimo di elementi nella cache LRU degli embedding                                                                                                                          |
| `MEMORY_TRANSFORMERS_MODEL`     | `Xenova/all-MiniLM-L6-v2`  | Repository HF per il modello Transformers.js                                                                                                                                        |
| `MEMORY_STATIC_MODEL`           | `minishlab/potion-base-8M` | Repository HF per il modello potion statico                                                                                                                                         |
| `MEMORY_STATIC_CACHE_DIR`       | `<DATA_DIR>/embeddings`    | Posizione in cui archiviare i modelli scaricati                                                                                                                                     |
| `MEMORY_VEC_TOP_K`              | `20`                       | Valore top-K predefinito per la ricerca vettoriale                                                                                                                                  |
| `MEMORY_RRF_K`                  | `60`                       | Costante k RRF per la ricerca ibrida                                                                                                                                                |
| `MEMORY_VEC_QUANTIZATION`       | `none`                     | Impostare su `int8` per archiviare i vettori sqlite-vec locali quantizzati (circa 4 volte più piccoli; funzionalità opt-in). La modifica della modalità forza una reindicizzazione. |

## Riepilogo (`summarization.ts`)

`summarizeMemories(apiKeyId, sessionId?, maxTokens = 4000)` compatta i contenuti
meno recenti quando il totale progressivo dei token nelle memorie di una chiave
supera il budget. Itera le righe in ordine DESC per `created_at`, conserva le
righe che rientrano nel limite e, per le restanti, sostituisce `content`
direttamente con le prime tre frasi dell'originale. `tokensSaved` è la
differenza in `estimateTokens` tra il contenuto precedente e quello nuovo.

Questa routine è **disponibile ma non viene chiamata automaticamente** nella
pipeline di chat attuale: richiamala da un cron, da un'azione amministrativa o
tramite il codice di raccordo di `MemoryConfig.autoSummarize` se hai bisogno di
una compattazione continua. La perdita di dati è irreversibile: il testo
originale viene sovrascritto.

## API REST

Tutti gli endpoint richiedono l'autenticazione di gestione (`requireManagementAuth`).

### Endpoint principali delle memorie (esistenti + aggiornati)

| Metodo   | Percorso             | Descrizione                                                                                                                                                                                       |
| -------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `GET`    | `/api/memory`        | Elenco paginato con filtri: `apiKeyId`, `type`, `sessionId`, `q`, `limit`, `page`, `offset`. La risposta include `stats.total`, `stats.tokensUsed`, `stats.hitRate`, `cacheStats`                 |
| `POST`   | `/api/memory`        | Crea una voce (convalidata tramite Zod: `content`, `key`, `type`, `sessionId`, `apiKeyId`, `metadata`, `expiresAt` opzionali). Chiama `createMemory()`, che esegue un upsert su `(apiKeyId, key)` |
| `GET`    | `/api/memory/[id]`   | Recupera una singola voce tramite UUID                                                                                                                                                            |
| `PUT`    | `/api/memory/[id]`   | Aggiorna i campi della voce (`type`, `key`, `content`, `metadata`). Corpo: `MemoryUpdatePutSchema`. Sincronizza anche il vettore se è disponibile una sorgente di embedding.                      |
| `DELETE` | `/api/memory/[id]`   | Elimina una voce; la elimina anche da `vec_memories` (D15) e, in modalità best effort, da Qdrant. Restituisce 404 se non esiste.                                                                  |
| `GET`    | `/api/memory/health` | Esegue `verifyExtractionPipeline("health-check")`: ciclo completo creazione→elenco→eliminazione. Restituisce `{working, latencyMs, error?}`                                                       |

### Nuovi endpoint del motore delle memorie (piano 21)

| Metodo | Percorso                          | Descrizione                                                                                                                                                                                                                        |
| ------ | --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `POST` | `/api/memory/retrieve-preview`    | Simulazione di `retrieveMemories`: restituisce risultati ordinati con punteggio, livello e token. Corpo: `RetrievePreviewSchema`. NON inserisce né modifica memorie.                                                               |
| `GET`  | `/api/memory/embedding-providers` | Elenca i provider con i modelli di embedding, indicando quali dispongono di una chiave API configurata.                                                                                                                            |
| `GET`  | `/api/memory/engine-status`       | Restituisce lo stato completo del motore: livello delle parole chiave, risoluzione dell'embedding, statistiche dell'archivio vettoriale, integrità di Qdrant e configurazione di reranking. Struttura: `MemoryEngineStatusSchema`. |
| `POST` | `/api/memory/summarize`           | Attiva manualmente la compattazione delle memorie. Corpo: `MemorySummarizeSchema` (`olderThanDays`, `apiKeyId?`, `dryRun`). Restituisce `{candidates, tokensSaved}`.                                                               |
| `POST` | `/api/memory/reindex`             | Attiva la reindicizzazione vettoriale per le memorie con `needs_reindex=1`. Corpo: `MemoryReindexSchema` (`force`). Restituisce `{started, pending}`.                                                                              |

### Endpoint delle impostazioni

| Metodo | Percorso                                | Descrizione                                                                                                          |
| ------ | --------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `GET`  | `/api/settings/memory`                  | Valore corrente normalizzato di `MemorySettingsExtended` (7 nuovi campi + campi legacy)                              |
| `PUT`  | `/api/settings/memory`                  | Aggiorna qualsiasi campo di `MemorySettingsExtendedSchema` (12 campi totali)                                         |
| `GET`  | `/api/settings/qdrant`                  | Impostazioni correnti di Qdrant (`QdrantSettingsSchema`)                                                             |
| `PUT`  | `/api/settings/qdrant`                  | Aggiorna le impostazioni di Qdrant. Corpo: `QdrantSettingsUpdateSchema`. `apiKey` = stringa vuota rimuove la chiave. |
| `GET`  | `/api/settings/qdrant/health`           | Sonda di vitalità sull'istanza Qdrant configurata. Restituisce `QdrantHealthResultSchema`.                           |
| `POST` | `/api/settings/qdrant/search`           | Test di ricerca semantica su Qdrant. Corpo: `QdrantSearchSchema` (`query`, `topK`).                                  |
| `POST` | `/api/settings/qdrant/cleanup`          | Rimuove da Qdrant i punti relativi a memorie scadute / obsolete.                                                     |
| `GET`  | `/api/settings/qdrant/embedding-models` | Elenca i modelli di embedding disponibili per Qdrant.                                                                |

La query di elenco `/api/memory` supporta sia la paginazione basata su `page`
(`parsePaginationParams`) **sia** il valore `offset` non elaborato: quando
`offset` è presente, ha la precedenza e viene calcolato un valore `page`
derivato per la struttura della risposta.

## Strumenti MCP (`open-sse/mcp-server/tools/memoryTools.ts`)

Quando il server MCP è abilitato, vengono registrati tre strumenti di memoria:

- `omniroute_memory_search` — `{apiKeyId, query?, type?, maxTokens?, limit?}`
  → esegue il wrapping di `retrieveMemories()`. A partire dalla v3.8.6 (D16), `strategy` viene letta
  da `getMemorySettings()` anziché essere impostata direttamente su `"exact"`. Se
  viene fornita `query` e `strategy` è `semantic` o `hybrid`, viene utilizzato
  l'archivio vettoriale, se disponibile.
- `omniroute_memory_add` — `{apiKeyId, sessionId?, type, key, content,
metadata?}` → esegue il wrapping di `createMemory()`. Accetta solo i 4 tipi canonici:
  `factual`, `episodic`, `procedural`, `semantic` (D17).
- `omniroute_memory_clear` — `{apiKeyId, type?, olderThan?}` → elenca le voci
  corrispondenti, le filtra facoltativamente in base alla data di creazione antecedente al timestamp indicato, quindi elimina ciascuna voce
  tramite `deleteMemory()` (che rimuove anche i vettori da sqlite-vec + Qdrant).

Consultare [MCP-SERVER.md](./MCP-SERVER.md) per i dettagli sul trasporto e sull'ambito.

## Dashboard (Memory Studio)

`src/app/(dashboard)/dashboard/memory/page.tsx` è ora uno **Studio con 3 schede**:

### Scheda: Memorie

- Scheda concettuale (spiegazione comprimibile "Come funziona").
- Elenco, ricerca e paginazione in tempo reale (debounce di 300 ms).
- Filtro per tipo (`factual` / `episodic` / `procedural` / `semantic` / tutti).
- Finestra modale per aggiungere una memoria (chiave, contenuto, tipo).
- Modifica in linea (pulsante con la matita → `PUT /api/memory/[id]`).
- Eliminazione per riga (con finestra di dialogo di conferma).
- Esportazione JSON della pagina corrente; importazione JSON tramite selettore di file.
- Schede statistiche: `totalEntries`, `tokensUsed`, `hitRate`.
- Pulsante "Compatta le vecchie" → `POST /api/memory/summarize` (la simulazione iniziale mostra
  prima il numero di candidate, quindi richiede conferma).
- Un indicatore di integrità verde/rosso gestito da `GET /api/memory/health`.

### Scheda: Playground

- Campo di query + selettore della strategia (Esatta / Semantica / Ibrida) + budget di token.
- "Simula" → `POST /api/memory/retrieve-preview` — mostra i risultati ordinati con
  `score`, `tier`, `tokens`, `vecScore`, `ftsScore`.
- Pannello di risoluzione che mostra quale origine degli embedding / archivio vettoriale è stato utilizzato e
  se si è verificato un fallback.

### Scheda: Motore

- Pannello di stato del motore (indicatore FTS5 per parole chiave, indicatore degli embedding, indicatore dell'archivio vettoriale,
  indicatore di integrità di Qdrant, indicatore di riordinamento).
- Pulsante "Reindicizza ora" → `POST /api/memory/reindex`.
- Selettore dell'origine degli embedding (automatica / remota / statica / transformers + interruttori).
- Scheda di configurazione di Qdrant (interruttore di abilitazione, host/porta/raccolta/chiave, test della connessione,
  test della ricerca semantica, pulizia).
- Scheda di configurazione del riordinamento (interruttore di abilitazione, selettore provider/modello).

Le impostazioni di memoria e Qdrant sono disponibili anche in
`/dashboard/settings → Memory & Skills` (`MemorySkillsTab.tsx`) per
l'interfaccia delle impostazioni globale/legacy.

## Cache

`src/lib/memory/store.ts` mantiene una cache interna al processo simile a LRU
(`MEMORY_CACHE_TTL = 1 min`, `MEMORY_MAX_CACHE_SIZE = 500`, con rimozione del 20 %
delle voci meno recenti) per le letture `getMemory(id)`, oltre a un livello generico chiave/valore
`memoryCache` (`src/lib/memory/cache.ts`) con i metodi `get`/`set`/`invalidate`
utilizzati dai chiamanti che desiderano una propria cache con ambito specifico (LRU da 1 000 voci,
TTL predefinito di 5 min).

## Privacy e ciclo di vita

- Il proprietario della memoria è l'id della chiave API (`resolveMemoryOwnerId` in
  `chatCore.ts`). Senza un `apiKeyInfo.id` non vengono eseguiti né il recupero,
  né l'inserimento, né l'estrazione.
- Le voci con un valore futuro di `expires_at` vengono escluse dal recupero; le
  voci precedenti a `retentionDays` vengono escluse dalla clausola
  `created_at >= cutoff` in `retrieveMemories`.
- Per l'eliminazione definitiva, usa `DELETE /api/memory/[id]` o `omniroute_memory_clear`.
- L'estrazione è eseguita in modalità fire-and-forget tramite `setImmediate`; gli
  errori vengono registrati sotto `memory.extraction.background.failed` e non
  vengono mai mostrati al chiamante.
- I round trip di verifica (`verifyExtractionPipeline`) eliminano le proprie
  voci di test in un blocco `finally`.

## Vedi anche

- [SKILLS.md](./SKILLS.md) — l'impostazione `skillsEnabled` inserisce le
  definizioni degli strumenti insieme alla memoria.
- [MCP-SERVER.md](./MCP-SERVER.md) — trasporto/ambiti MCP.
- [API_REFERENCE.md](../reference/API_REFERENCE.md) — panoramica più ampia dell'API.
- Moduli sorgente:
  - `src/lib/memory/types.ts`, `schemas.ts`
  - `src/lib/memory/store.ts`, `retrieval.ts`, `injection.ts`, `reindex.ts`
  - `src/lib/memory/extraction.ts`, `summarization.ts`, `verify.ts`
  - `src/lib/memory/settings.ts`, `qdrant.ts`, `cache.ts`
  - `src/lib/memory/vectorStore.ts` — sqlite-vec + RRF ibrido
  - `src/lib/memory/embedding/index.ts` — livello di embedding multi-sorgente
  - `src/lib/memory/embedding/types.ts`, `remote.ts`, `staticPotion.ts`,
    `transformersLocal.ts`, `cache.ts`
  - `src/shared/schemas/memory.ts` — schemi Zod per tutti i body dell'API di memoria
  - `src/shared/schemas/qdrant.ts` — schemi Zod per impostazioni/operazioni Qdrant
  - `src/lib/db/memoryVec.ts` — CRUD per `memory_vec_meta`
  - `src/lib/db/migrations/015_create_memories.sql`,
    `022_add_memory_fts5.sql`, `023_fix_memory_fts_uuid.sql`,
    `083_memory_vec.sql`
  - `src/app/api/memory/route.ts`, `[id]/route.ts`, `health/route.ts`
  - `src/app/api/memory/retrieve-preview/route.ts`
  - `src/app/api/memory/engine-status/route.ts`
  - `src/app/api/memory/embedding-providers/route.ts`
  - `src/app/api/memory/summarize/route.ts`
  - `src/app/api/memory/reindex/route.ts`
  - `src/app/api/settings/memory/route.ts`
  - `src/app/api/settings/qdrant/route.ts` + sotto-route
  - `src/app/(dashboard)/dashboard/memory/` — interfaccia utente di Studio (pagina + componenti +
    schede + hook)
  - `open-sse/handlers/chatCore.ts` (collegamento di inserimento/estrazione)
  - `open-sse/mcp-server/tools/memoryTools.ts`

---

## Scelta di un provider di embedding (v3.8.16+)

Il motore di memoria di OmniRoute supporta **quattro sorgenti di embedding** (`src/lib/memory/embedding/`). Ognuna presenta compromessi diversi in termini di **latenza, costo, qualità del modello e complessità di configurazione**.

### Le sorgenti di embedding

| Provider       | Sorgente                                                         | Latenza                             | Costo               | Qualità                            | Configurazione                                  |
| -------------- | ---------------------------------------------------------------- | ----------------------------------- | ------------------- | ---------------------------------- | ----------------------------------------------- |
| `transformers` | Modello ONNX locale (Xenova/all-MiniLM-L6-v2)                    | ~50-150ms (CPU)                     | Gratuito            | Buona                              | Solo `npm install`                              |
| `static`       | Vettori pre-calcolati (in cache)                                 | <1ms                                | Gratuito            | N/D (dipende dall'hit della cache) | Nessuna                                         |
| `remote`       | API OpenAI / Cohere / Voyage                                     | ~100-300ms                          | $0.02-0.10/1M token | Eccellente                         | Chiave API                                      |
| `auto`         | Seleziona la migliore sorgente disponibile in fase di esecuzione | Come la sorgente selezionata        | Gratuito            | Come la sorgente selezionata       | Nessuna                                         |
| _(cache)_      | Livello LRU in memoria sopra qualsiasi sorgente                  | <1ms (hit), latenza completa (miss) | Gratuito            | Come il livello sottostante        | Sempre attiva (non selezionabile come sorgente) |

### Albero decisionale

```
                  Qual è il contesto di deployment?
                  │
      ┌───────────┼───────────┬──────────────┐
      │           │           │              │
  SVILUPPO/TEST PROD. RIDOTTA PROD. ESTESA  EDGE / OFFLINE
      │           │           │              │
      ▼           ▼           ▼              ▼
  transformers transformers remote (Qdrant) transformers
  (gratis, senza API)        (qualità migliore) (senza internet)
      │           │           │              │
      └────────┬──┴───────────┴──────────────┘
               │
               ▼
            Aggiungi SEMPRE il livello `cache`
            (LruCache racchiude qualsiasi provider)
```

### Configurazione del database e dell'API

Le opzioni di embedding della memoria vengono configurate tramite l'API/interfaccia utente delle Impostazioni, non tramite variabili d'ambiente. Le chiavi pertinenti del database delle impostazioni sotto Impostazioni (`normalizeMemorySettings` in `src/lib/memory/settings.ts`) sono:

- `memoryEmbeddingSource`: `"transformers"` (locale), `"remote"` (basata su API, ad es. OpenAI), `"static"` (archivio esterno) o `"auto"`
- `memoryEmbeddingProviderModel`: identificatore del modello per le sorgenti remote/statiche (ad es. `"text-embedding-3-small"`)
- `memoryTransformersEnabled`: `true` | `false`
- `memoryStaticEnabled`: `true` | `false`
- `memoryVectorStore`: `"sqlite-vec"`, `"qdrant"` o `"auto"`

#### Modello locale (`transformers`)

Utilizza internamente transformers.js per eseguire modelli locali:

```bash
# Variabili d'ambiente lette nel codice (src/lib/memory/embedding/index.ts):
MEMORY_TRANSFORMERS_MODEL=Xenova/all-MiniLM-L6-v2  # Repository del modello HF
MEMORY_STATIC_MODEL=minishlab/potion-base-8M       # Modello potion statico HF
MEMORY_STATIC_CACHE_DIR=<DATA_DIR>/embeddings      # Directory della cache
```

#### Cache LRU degli embedding

La cache è sempre attiva per impostazione predefinita e viene configurata tramite variabili d'ambiente:

```bash
MEMORY_EMBEDDING_CACHE_MAX=1000                    # Numero massimo di elementi nella cache
MEMORY_EMBEDDING_CACHE_TTL_MS=300000               # TTL (5 min)
```

### Dati sulle prestazioni

Benchmark su un tipico server x86 a 4 core (testi di circa 100 token ciascuno):

| Provider             | p50   | p95   | p99   | Costo / 1M di embedding            |
| -------------------- | ----- | ----- | ----- | ---------------------------------- |
| `transformers` (CPU) | 80ms  | 180ms | 350ms | Gratuito                           |
| `remote` (OpenAI)    | 120ms | 220ms | 400ms | ~$0.02 (ada-002) / $0.13 (3-large) |
| `static` (Qdrant)    | 15ms  | 30ms  | 60ms  | Dipende dall'hosting di Qdrant     |
| `cache` (hit)        | <1ms  | <1ms  | 2ms   | Gratuito                           |

---

## Pattern di estrazione dei fatti (v3.8.16+)

Il modulo `extraction.ts` (`src/lib/memory/extraction.ts`) utilizza la **corrispondenza tramite espressioni regolari** per estrarre fatti strutturati dai messaggi delle conversazioni. Comprendere questi pattern aiuta a ottimizzare la qualità dell'estrazione per il proprio caso d'uso.

### Categorie di pattern predefinite

| Categoria           | Pattern di esempio                                               | Dati acquisiti                      |
| ------------------- | ---------------------------------------------------------------- | ----------------------------------- |
| PREFERENCE_PATTERNS | `"Preferisco <X>"`, `"Mi piace <X>"`, `"Odio <X>"`               | Preferenze dell'utente              |
| DECISION_PATTERNS   | `"Userò <X>"`, `"Ho deciso di <X>"`, `"Ho scelto <X>"`           | Decisioni dell'utente (episodiche)  |
| PATTERN_PATTERNS    | `"Di solito <X>"`, `"Faccio sempre <X>"`, `"Non faccio mai <X>"` | Pattern comportamentali persistenti |

### Pattern di esempio (semplificati)

```ts
// Da src/lib/memory/extraction.ts
const PREFERENCE_PATTERNS = [
  /\bI\s+(?:really\s+)?prefer\s+([^.,\n]+)/gi,
  /\bI\s+(?:really\s+)?like\s+([^.,\n]+)/gi,
  /\bI\s+(?:hate|dislike|avoid)\s+([^.,\n]+)/gi,
];
const DECISION_PATTERNS = [
  /\bI'?(?:ll|will)\s+use\s+([^.,\n]+)/gi,
  /\bI\s+(?:have\s+)?decided\s+(?:to\s+)?([^.,\n]+)/gi,
];
const PATTERN_PATTERNS = [/\bI\s+usually\s+([^.,\n]+)/gi, /\bI\s+always\s+([^.,\n]+)/gi];
```

### Cosa viene estratto

Quando un utente dice:

> "Preferisco TypeScript. Userò Postgres per questo progetto. Eseguo sempre il commit prima del push. Python non mi piace."
> L'estrazione produce 4 ricordi:
>
> | Chiave                               | Categoria  | Tipo      | Contenuto                      |
> | ------------------------------------ | ---------- | --------- | ------------------------------ |
> | `preference:typescript`              | preferenza | fattuale  | "TypeScript"                   |
> | `decision:postgres_for_this_project` | decisione  | episodico | "Postgres per questo progetto" |
> | `pattern:commit_before_pushing`      | pattern    | fattuale  | "commit prima del push"        |
> | `preference:python`                  | preferenza | fattuale  | "Python"                       |

### Limiti dell'estrazione

Per evitare un'estrazione incontrollata, si applicano i seguenti limiti:

| Lunghezza minima del contenuto | 3 caratteri |
| Lunghezza massima del contenuto| 500 caratteri |

### Quando disabilitare l'estrazione

L'estrazione viene eseguita automaticamente ogni volta che la memoria è abilitata; non esiste un'opzione separata per la sola estrazione. Per disattivarla, disabilitare completamente la memoria (`enabled: false` tramite `PUT /api/settings/memory`). È opportuno farlo quando:

- Il volume dei messaggi è elevato e il costo dell'estrazione non è trascurabile
- Le conversazioni sono prevalentemente transitorie (chat, debug) e non hanno valore a lungo termine
- Il contesto viene già acquisito tramite plugin personalizzati

---

## Ottimizzazione RRF ibrida (v3.8.16+)

L'algoritmo **Reciprocal Rank Fusion (RRF)** combina i risultati FTS5 (parole chiave) e vettoriali (semantici). Il parametro `k` controlla il peso attribuito ai risultati con una posizione più bassa in classifica.

### La formula

Per ogni ricordo candidato, il punteggio RRF è:

```
RRF(d) = Σ  1 / (k + rank_i(d))
```

Dove:

- `k` è la costante (valore predefinito: 60)
- `rank_i(d)` è la posizione del documento `d` nell'i-esimo sistema di recupero (FTS, vettoriale)
- La somma viene calcolata su tutti i sistemi di recupero

### Come `k` influisce sui risultati

| Valore di `k`            | Effetto                                                                                           | Ideale per                                           |
| ------------------------ | ------------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| `k=0`                    | Fusione pura delle classifiche (senza attenuazione)                                               | Riferimento teorico                                  |
| `k=10-30`                | Attribuisce molto peso ai risultati migliori; quelli in posizioni basse contribuiscono pochissimo | Quando i primi 3 risultati sono solitamente corretti |
| **`k=60`** (predefinito) | Bilanciato: i primi 10 risultati contribuiscono tutti in modo significativo                       | Recupero per uso generico                            |
| `k=100+`                 | Più uniforme: anche i risultati in posizioni basse possono prevalere se compaiono in più sistemi  | Quando il richiamo > precisione è fondamentale       |

### Ottimizzazione pratica di `k`

```bash
# Valore predefinito
MEMORY_RRF_K=60

# Precisione aggressiva (memoria piccola, pochi documenti)
MEMORY_RRF_K=20

# Richiamo massimo (memoria grande, query diversificate)
MEMORY_RRF_K=120
```

**Esempio con `k=20`:**

- Posizione FTS 1 → contributo `1/21 = 0.048`
- Posizione FTS 10 → contributo `1/30 = 0.033`
- Posizione vettoriale 1 → contributo `0.048`
- Massimo combinato: `0.096`

**Esempio con `k=60`:**

- Posizione FTS 1 → contributo `1/61 = 0.016`
- Posizione FTS 10 → contributo `1/70 = 0.014`
- Posizione vettoriale 1 → contributo `0.016`
- Massimo combinato: `0.033`

Con un valore di `k` più elevato, la **differenza relativa** tra il primo e il decimo risultato è minore, pertanto l'algoritmo si basa più sul **consenso tra i sistemi di recupero** che sull'affidabilità della prima posizione.

### Quando modificare `k`

| Sintomo                                              | Tentativo                                                                     |
| ---------------------------------------------------- | ----------------------------------------------------------------------------- |
| Il primo risultato prevale sempre, ma è errato       | **Ridurre** k (ad es., 20): l'affidabilità della prima posizione conta di più |
| La risposta corretta è tra le prime 5 ma non è prima | **Aumentare** k (ad es., 100): un punteggio più uniforme premia il consenso   |
| Il richiamo è elevato ma la precisione è bassa       | **Ridurre** k: rendere più netta la classifica                                |
| Il richiamo è basso (mancano documenti pertinenti)   | **Aumentare** k: offrire una possibilità ai documenti in posizioni inferiori  |

### Ponderazione RRF

La fusione reciproca delle classifiche utilizza pesi uguali per la posizione vettoriale semantica e per la posizione nella ricerca full-text:

```
RRF(d) = 1/(k + rank_vector) + 1/(k + rank_fts)
```

Non esistono variabili d'ambiente per regolare i singoli pesi (`MEMORY_RRF_VECTOR_WEIGHT`/`MEMORY_RRF_FTS_WEIGHT` non esistono).

---

## Strategia di riepilogo (v3.8.16+)

Il modulo `summarization.ts` (`src/lib/memory/summarization.ts`) comprime i ricordi meno recenti per mantenere ridotto l'insieme attivo, preservando al contempo la capacità di recuperarli.

### Quando viene attivato il riepilogo

| Evento di attivazione           | Soglia (predefinita) |
| ------------------------------- | -------------------- |
| Attivazione manuale tramite API | n/d                  |

### Cosa viene riepilogato

Da `summarization.ts` vengono esportati due punti di ingresso:

- **`summarizeMemories(apiKeyId, sessionId?, maxTokens = 4000)`** — condensa i
  ricordi di una sessione in un unico testo riepilogativo limitato da un budget di token.
- **`summarizeMemoriesOlderThan(apiKeyId, days, dryRun)`** — la compattazione basata
  sull'età utilizzata dall'API: seleziona ogni ricordo più vecchio di `days`, crea
  a partire da essi un singolo ricordo riepilogativo condensato e, quando `dryRun` è `false`, elimina
  gli originali. Passa `dryRun: true` per visualizzare in anteprima l'insieme dei candidati e il totale
  dei token senza modificare nulla.

Non viene eseguito alcun raggruppamento per tag/chiave né alcuna valutazione per singolo ricordo tra "essenziale e riepilogabile" —
la selezione si basa esclusivamente sul limite di età e il testo riepilogativo è costituito da una riga condensata,
preceduta dal tipo, per ogni candidato.

### Attivazione del riepilogo

Il riepilogo è **manuale / facoltativo** — l'impostazione `autoSummarize` è `false` per
impostazione predefinita, quindi nulla viene compattato automaticamente. Attivalo tramite l'API:

```bash
curl -X POST http://localhost:20128/api/memory/summarize \
  -H "Authorization: Bearer $OMNIROUTE_KEY"
```

Per mantenerlo disattivato, lascia semplicemente `autoSummarize` sul valore predefinito (`false`).

### Suggerimenti per la qualità del riepilogo

- **Visualizza prima un'anteprima con `dryRun`** — `summarizeMemoriesOlderThan(..., true)` restituisce
  l'elenco dei candidati e il numero totale di token, così puoi verificare cosa verrebbe unito
  prima di eliminare gli originali.
- **Esegui il riepilogo durante le ore di minor traffico** se disponi di un corpus di ricordi di grandi dimensioni — la chiamata all'LLM è la parte più lenta

```bash
# Stile cron: esegui il riepilogo ogni giorno alle 3:00
0 3 * * * curl -X POST http://localhost:20128/api/memory/summarize \
  -H "Authorization: Bearer $OMNIROUTE_KEY"
```

---

## Pattern del provider MemoryBackend

> **Fonte attendibile:** `src/lib/memory/backend.ts`, `src/lib/memory/genericBackend.ts`, `src/lib/memory/manager.ts`
> **Test:** `src/lib/memory/__tests__/generic-backend.test.ts`

Il pattern del provider MemoryBackend introduce un **livello di astrazione collegabile per i backend** sopra il motore di memoria esistente. Invece di essere vincolato a un'unica implementazione di archiviazione, il sistema di memoria ora supporta più backend (SQLite, Obsidian, Notion, backend HTTP personalizzati) con un instradamento primario/di fallback configurabile.

### Architettura

```
┌──────────────────────────────────────────────────────────┐
│                    Route API                              │
│            (src/app/api/memory/route.ts)                  │
└──────────────────────┬───────────────────────────────────┘
                       │
┌──────────────────────▼───────────────────────────────────┐
│                   MemoryManager                           │
│       Orchestratore singleton (manager.ts)                │
│                                                          │
│  Primario ──► Backend A  (ad es. SQLite)                 │
│  Fallback ──► Backend B  (ad es. Obsidian)               │
│              Backend C  (ad es. Notion tramite            │
│                          GenericBackend)                   │
└──────────────────────┬───────────────────────────────────┘
                       │
        ┌──────────────┼──────────────┐
        ▼              ▼              ▼
┌────────────┐ ┌────────────┐ ┌──────────────────┐
│ Backend    │ │ Backend    │ │ Backend          │
│ SQLite     │ │ Obsidian   │ │ GenericMemory    │
│            │ │            │ │ (HTTP)           │
└────────────┘ └────────────┘ └──────────────────┘
```

#### Interfaccia principale (`backend.ts`)

Ogni backend deve implementare l'interfaccia `MemoryBackend`:

```typescript
interface MemoryBackend {
  readonly id: string;
  readonly displayName: string;

  // CRUD
  create(input: CreateMemoryInput): Promise<Memory>;
  get(id: string): Promise<Memory | null>;
  update(id: string, updates: Partial<...>): Promise<boolean>;
  delete(id: string): Promise<boolean>;
  list(filter: MemoryFilter): Promise<{ data: Memory[]; total: number; byType: Record<string, number> }>;

  // Ricerca
  search(config: SearchConfig): Promise<Memory[]>;

  // Stato
  health(): Promise<HealthCheckResult>;

  // Ciclo di vita (facoltativo)
  initialize?(): Promise<void>;
  shutdown?(): Promise<void>;
}
```

#### MemoryManager (`manager.ts`)

Orchestratore singleton che:

- **Registra** i backend tramite `register(backend)` — chiamato all'avvio da `index.ts`
- **Configura** il backend primario e quelli di fallback tramite `configure(primary, fallbacks)`
- **Instrada** le operazioni CRUD e di ricerca verso il backend primario, con una catena di fallback in caso di errore
- **Verifica lo stato** di tutti i backend periodicamente

**Comportamento di fallback:**

| Operazione | Primario                   | Fallback                      |
| ---------- | -------------------------- | ----------------------------- |
| `create`   | ✅ Solo primario           | ❌                            |
| `get`      | ✅ Prova prima il primario | ✅ Fallback se null           |
| `update`   | ✅ Solo primario           | ✅ Sincronizzazione asincrona |
| `delete`   | ✅ Solo primario           | ✅ Sincronizzazione asincrona |
| `list`     | ✅ Solo primario           | ❌                            |
| `search`   | ✅ Prima il primario       | ✅ Fallback in caso di errore |

#### GenericMemoryBackend (`genericBackend.ts`)

Un connettore HTTP generico che adatta qualsiasi API REST a un MemoryBackend. Utile per:

- **Notion** — connessione tramite Notion API
- **Obsidian** — connessione tramite Obsidian Local REST API
- **Backend personalizzati** — qualsiasi servizio che esponga un'API RESTful per la memoria

**Configurazione:**

```typescript
interface GenericBackendConfig {
  baseUrl: string;           // URL di base dell'API backend
  apiKey?: string;           // Token Bearer per l'autenticazione
  headers?: Record<string, string>;  // Header HTTP personalizzati
  timeout?: number;          // Timeout della richiesta (predefinito: 30000ms)
  backendType?: string;      // Per il logging

  // Override degli endpoint (i valori predefiniti seguono le convenzioni REST)
  endpoints?: {
    search?: string;   // predefinito: "/memories/search"
    create?: string;   // predefinito: "/memories"
    list?: string;     // predefinito: "/memories"
    get?: string;      // predefinito: "/memories/{id}"
    update?: string;   // predefinito: "/memories/{id}"
    delete?: string;   // predefinito: "/memories/{id}"
    health?: string;   // predefinito: "/health"
  };

  // Mappature dei nomi dei parametri di query
  queryParams?: {
    query?/apiKeyId?/limit?/offset?/strategy?/maxTokens?/type?/sessionId?/orderBy?/orderDir?/options?
  };

  // Mappature dei nomi dei parametri del percorso
  pathParams?: {
    id?/memoryId?
  };
}
```

I **backend noti** sono preconfigurati in `KNOWN_BACKENDS`:

```typescript
createKnownBackend("obsidian"); // → GenericMemoryBackend indirizzato a localhost:27123
createKnownBackend("notion"); // → GenericMemoryBackend indirizzato ad api.notion.com/v1
```

#### Backend integrati

##### SQLiteBackend (`sqliteBackend.ts`)

Il backend primario predefinito. Incapsula l'archivio di memoria esistente basato su SQLite utilizzando `src/lib/memory/store.ts`. Viene registrato automaticamente all'avvio.

```typescript
import { sqliteBackend } from "./sqliteBackend";
memoryManager.register(sqliteBackend);
```

##### ObsidianBackend (`obsidianBackend.ts`)

Incapsula l'integrazione Obsidian esistente (`src/lib/memory/obsidianBackend.ts`). Si connette a un vault Obsidian tramite l'API REST locale di Obsidian.

### Impostazioni

Le impostazioni dei backend di memoria sono archiviate nella tabella delle impostazioni dell'app e gestite tramite `src/lib/memory/settings.ts`:

| Impostazione               | Chiave env/config        | Valore predefinito | Descrizione                               |
| -------------------------- | ------------------------ | ------------------ | ----------------------------------------- |
| Backend primario           | `memoryPrimaryBackend`   | `"sqlite"`         | ID del backend primario                   |
| Backend di fallback        | `memoryFallbackBackends` | `[]`               | ID ordinati dei backend di fallback       |
| Configurazioni dei backend | `memoryBackendConfigs`   | `{}`               | Override della configurazione per backend |

Le impostazioni vengono normalizzate tramite `normalizeMemorySettings()` e memorizzate nella cache in `getMemorySettings()`.

### Flusso di inizializzazione

```
Avvio dell'app
  → importazioni di index.ts (effetto collaterale): registra SQLiteBackend
  → initMemoryBackends() chiamata dal ciclo di vita dell'app:
      1. Carica le impostazioni (getMemorySettings)
      2. Configura il backend primario e quelli di fallback
      3. Inizializza tutti i backend (controllo dello stato)
      4. Pronto per le richieste
```

### Aggiunta di un nuovo backend

1. **Implementare l'interfaccia `MemoryBackend`** in `src/lib/memory/<name>Backend.ts`
2. **Esportare** da `src/lib/memory/index.ts`
3. **Registrare** con `memoryManager.register(yourBackend)` all'avvio
4. **Configurare** tramite le impostazioni: impostare `memoryPrimaryBackend` sull'ID del proprio backend
5. **Testare** usando `src/lib/memory/__tests__/generic-backend.test.ts` come riferimento

#### Esempio: backend Brain

```typescript
import { createGenericMemoryBackend } from "./genericBackend";

const brainBackend = createGenericMemoryBackend("brain", "BK-Brain", {
  baseUrl: process.env.BRAIN_API_URL || "http://localhost:9099",
  apiKey: process.env.BRAIN_API_KEY,
  endpoints: {
    search: "/api/memory/search",
    create: "/api/memory",
    health: "/api/health",
  },
});

memoryManager.register(brainBackend);
```

### Verifica

#### Test unitari

```bash
npx vitest run src/lib/memory/__tests__/generic-backend.test.ts --reporter=verbose
```

Output previsto: **35 test, tutti superati**, relativi a:

- Costruttore (2)
- Controllo dello stato (4) — esito positivo, errore 500, errore di rete, latenza
- Inizializzazione (2) — esito positivo, errore
- Creazione (2) — endpoint predefinito, endpoint personalizzato
- Recupero (4) — esito positivo, 404 → null, eccezione per errori diversi da 404, parametri del percorso personalizzati
- Aggiornamento (2) — esito positivo, 404 → false
- Eliminazione (2) — esito positivo, 404 → false
- Elenco (2) — parametri di query, nomi dei parametri personalizzati
- Ricerca (3) — parametri di query, endpoint personalizzato, serializzazione delle opzioni
- Header di autenticazione (2) — token Bearer, header personalizzati
- Factory (1)

#### Controllo dei tipi

```bash
npm run typecheck:core
```

Risultato previsto: **0 errori**.
