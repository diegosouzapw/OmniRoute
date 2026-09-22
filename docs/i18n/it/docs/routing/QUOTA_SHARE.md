# Quota Sharing Engine (Italiano)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/QUOTA_SHARE.md) · 🇪🇹 [am](../../../am/docs/routing/QUOTA_SHARE.md) · 🇸🇦 [ar](../../../ar/docs/routing/QUOTA_SHARE.md) · 🇦🇿 [az](../../../az/docs/routing/QUOTA_SHARE.md) · 🇧🇬 [bg](../../../bg/docs/routing/QUOTA_SHARE.md) · 🇧🇩 [bn](../../../bn/docs/routing/QUOTA_SHARE.md) · 🇧🇦 [bs](../../../bs/docs/routing/QUOTA_SHARE.md) · 🇨🇿 [cs](../../../cs/docs/routing/QUOTA_SHARE.md) · 🇩🇰 [da](../../../da/docs/routing/QUOTA_SHARE.md) · 🇩🇪 [de](../../../de/docs/routing/QUOTA_SHARE.md) · 🇬🇷 [el](../../../el/docs/routing/QUOTA_SHARE.md) · 🇪🇸 [es](../../../es/docs/routing/QUOTA_SHARE.md) · 🇪🇪 [et](../../../et/docs/routing/QUOTA_SHARE.md) · 🇮🇷 [fa](../../../fa/docs/routing/QUOTA_SHARE.md) · 🇫🇮 [fi](../../../fi/docs/routing/QUOTA_SHARE.md) · 🇫🇷 [fr](../../../fr/docs/routing/QUOTA_SHARE.md) · 🇮🇪 [ga](../../../ga/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [gu](../../../gu/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [ha](../../../ha/docs/routing/QUOTA_SHARE.md) · 🇮🇱 [he](../../../he/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [hi](../../../hi/docs/routing/QUOTA_SHARE.md) · 🇭🇷 [hr](../../../hr/docs/routing/QUOTA_SHARE.md) · 🇭🇺 [hu](../../../hu/docs/routing/QUOTA_SHARE.md) · 🇦🇲 [hy](../../../hy/docs/routing/QUOTA_SHARE.md) · 🇮🇩 [id](../../../id/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [ig](../../../ig/docs/routing/QUOTA_SHARE.md) · 🇯🇵 [ja](../../../ja/docs/routing/QUOTA_SHARE.md) · 🇬🇪 [ka](../../../ka/docs/routing/QUOTA_SHARE.md) · 🇰🇭 [km](../../../km/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [kn](../../../kn/docs/routing/QUOTA_SHARE.md) · 🇰🇷 [ko](../../../ko/docs/routing/QUOTA_SHARE.md) · 🇱🇹 [lt](../../../lt/docs/routing/QUOTA_SHARE.md) · 🇱🇻 [lv](../../../lv/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [ml](../../../ml/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [mr](../../../mr/docs/routing/QUOTA_SHARE.md) · 🇲🇾 [ms](../../../ms/docs/routing/QUOTA_SHARE.md) · 🇲🇹 [mt](../../../mt/docs/routing/QUOTA_SHARE.md) · 🇲🇲 [my](../../../my/docs/routing/QUOTA_SHARE.md) · 🇳🇵 [ne](../../../ne/docs/routing/QUOTA_SHARE.md) · 🇳🇱 [nl](../../../nl/docs/routing/QUOTA_SHARE.md) · 🇳🇴 [no](../../../no/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [or](../../../or/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [pa](../../../pa/docs/routing/QUOTA_SHARE.md) · 🇵🇭 [phi](../../../phi/docs/routing/QUOTA_SHARE.md) · 🇵🇱 [pl](../../../pl/docs/routing/QUOTA_SHARE.md) · 🇵🇹 [pt](../../../pt/docs/routing/QUOTA_SHARE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/QUOTA_SHARE.md) · 🇷🇴 [ro](../../../ro/docs/routing/QUOTA_SHARE.md) · 🇷🇺 [ru](../../../ru/docs/routing/QUOTA_SHARE.md) · 🇱🇰 [si](../../../si/docs/routing/QUOTA_SHARE.md) · 🇸🇰 [sk](../../../sk/docs/routing/QUOTA_SHARE.md) · 🇸🇮 [sl](../../../sl/docs/routing/QUOTA_SHARE.md) · 🇷🇸 [sr](../../../sr/docs/routing/QUOTA_SHARE.md) · 🇸🇪 [sv](../../../sv/docs/routing/QUOTA_SHARE.md) · 🇰🇪 [sw](../../../sw/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [ta](../../../ta/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [te](../../../te/docs/routing/QUOTA_SHARE.md) · 🇹🇭 [th](../../../th/docs/routing/QUOTA_SHARE.md) · 🇹🇷 [tr](../../../tr/docs/routing/QUOTA_SHARE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/QUOTA_SHARE.md) · 🇵🇰 [ur](../../../ur/docs/routing/QUOTA_SHARE.md) · 🇺🇿 [uz](../../../uz/docs/routing/QUOTA_SHARE.md) · 🇻🇳 [vi](../../../vi/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [yo](../../../yo/docs/routing/QUOTA_SHARE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/QUOTA_SHARE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/QUOTA_SHARE.md)

---

> **Riferimento del documento**: `docs/routing/QUOTA_SHARE.md`
> Parte del Gruppo B (piani 16 + 22).

---

## Panoramica

Il motore di condivisione delle quote distribuisce equamente la quota temporale di un provider (ad es. finestra di 5 ore di Codex, 1500 richieste/ora di Kimi) tra più chiavi API che condividono la stessa connessione.

**Problema risolto:** OmniRoute inoltra tramite proxy molte chiavi API verso lo stesso account del provider upstream. Senza una logica di condivisione, un picco di richieste dalla chiave A può esaurire la quota oraria del provider, lasciando le chiavi B e C bloccate fino al ripristino della finestra.
Il motore evita questa situazione:

1. Monitorando il consumo progressivo di ciascuna chiave per ogni dimensione (%, richieste, token, $).
2. Applicando un algoritmo di ripartizione equa e work-conserving: una chiave può prendere in prestito dalle quote inutilizzate finché il pool globale non è saturo.
3. Applicando il risultato nel percorso critico (`chatCore.ts`) prima che la richiesta raggiunga l'esecutore upstream.

---

## Algoritmo: ripartizione equa work-conserving

Implementato in `src/lib/quota/fairShare.ts`.

### Modalità

| Condizione                                 | Modalità     | Comportamento                                                                      |
| ------------------------------------------ | ------------ | ---------------------------------------------------------------------------------- |
| `globalUsedPercent < saturationThreshold`  | **Generosa** | La chiave può prendere in prestito fino al limite globale meno il totale consumato |
| `globalUsedPercent >= saturationThreshold` | **Rigida**   | Applica rigorosamente la quota equa individuale                                    |

Valore predefinito: `saturationThreshold = 0.5` (variabile d'ambiente `QUOTA_SATURATION_THRESHOLD`).

### Decisione per dimensione

Per ogni dimensione attiva nel pool, il motore calcola:

```
fairShareAllowed = poolLimit × (allocationWeight / 100)
consumed        = valore progressivo corrente per questa chiave (da QuotaStore.peek)
remaining       = fairShareAllowed - consumed
```

Quindi:

- **`policy = hard`**: se `consumed > fairShareAllowed` e la modalità è rigida → **blocca**.
- **`policy = soft`**: se `consumed > fairShareAllowed` e la modalità è rigida → **penalizza** (riduce la priorità nella combinazione; non applica mai un blocco rigido).
- **`policy = burst`**: consente la richiesta finché è disponibile capacità globale, indipendentemente dalla quota equa.

### Limite assoluto

`capValue` + `capUnit` in un'allocazione costituisce un limite massimo rigido, indipendente dalla modalità o dalla policy. Qualsiasi dimensione per cui `consumed >= capValue` **blocca** sempre la richiesta.

### Controllo multidimensionale

Una richiesta viene bloccata se **una qualsiasi** dimensione del pool la bloccherebbe. Le dimensioni sono indipendenti: l'esaurimento della dimensione 5h% non influisce sulla dimensione weekly%.

### Prestito

In modalità generosa, una chiave la cui allocazione è sottoutilizzata può utilizzare l'eccedenza delle quote non allocate di altre chiavi. La formula è:

```
maxAllowed = globalLimit - consumedByOtherKeys
```

dove `consumedByOtherKeys = consumedTotal - consumedByThisKey`. Il limite massimo globale (il `limit` del pool per quella dimensione) rappresenta sempre il tetto massimo rigido.

---

## Contatore a finestra scorrevole

Implementato in `src/lib/quota/sqliteQuotaStore.ts` e `redisQuotaStore.ts`.

Due bucket per `(apiKeyId, dimensionKey)`:

- `curr`: bucket corrente (`floor(nowMs / windowMs)`)
- `prev`: bucket precedente (`curr - 1`)

Valore progressivo effettivo:

```
effectiveBucketIndex = floor(nowMs / windowMs)
bucketStartMs        = effectiveBucketIndex × windowMs
elapsed              = nowMs - bucketStartMs
weight               = 1 - elapsed / windowMs

effective = prev × weight + curr
```

**Precisione**: accuratezza di circa il 99%. L'errore è al massimo pari all'1% della dimensione della finestra in corrispondenza del limite tra i bucket (intrinseco all'approssimazione a 2 bucket).

### Concorrenza

Driver SQLite: un mutex in memoria per ogni chiave `(apiKeyId | dimensionKey)` evita la race condition di lettura-modifica-scrittura. Il modello rispecchia il meccanismo anti-thundering-herd di `src/sse/services/auth.ts`.

Driver Redis: script Lua EVAL per l'incremento atomico, eseguito come singolo comando Redis.

---

## Driver

### SQLite (predefinito, nessuna installazione)

- Tabella: `quota_consumption` (vedere le migrazioni `073_quota_pools.sql` / `074_quota_consumption.sql`).
- Ideale per i deployment a istanza singola.
- Tutta la persistenza avviene nel DB SQLite esistente di OmniRoute (`DATA_DIR/storage.sqlite`).

### Redis (facoltativo, multi-istanza)

- Richiede il pacchetto npm `ioredis`.
- I contatori sono archiviati in Redis; i metadati (pool/allocazioni) rimangono in SQLite.
- Ideale per i deployment con più repliche in cui i contatori devono essere condivisi.

### Passaggio da un driver all'altro

Tramite l'interfaccia delle impostazioni (`/dashboard/settings` → Archivio quote) o tramite variabili d'ambiente:

```bash
QUOTA_STORE_DRIVER=redis
QUOTA_STORE_REDIS_URL=redis://localhost:6379
```

L'impostazione del DB ha la precedenza sulle variabili d'ambiente. Se `driver=redis` ma l'URL è assente o
`ioredis` non è installato, la factory utilizza SQLite come soluzione di ripiego e registra un avviso.

Ordine di selezione del driver:

1. Impostazione DB `quotaStore.driver`
2. Variabile d'ambiente `QUOTA_STORE_DRIVER`
3. Predefinito: `sqlite`

---

## Dimensioni multiple

Un pool può avere più dimensioni. Ogni dimensione è indipendente:

```ts
QuotaDimension {
  unit: "percent" | "requests" | "tokens" | "usd",
  window: "5h" | "hourly" | "daily" | "weekly" | "monthly",
  limit: number,  // limite massimo globale del pool per questa dimensione
}
```

**Esempio: piano Codex** (5h% + settimanale%):

```json
[
  { "unit": "percent", "window": "5h", "limit": 100 },
  { "unit": "percent", "window": "weekly", "limit": 100 }
]
```

Una richiesta deve soddisfare tutte le dimensioni per essere consentita.

---

## Risolutore dei piani

Implementato in `src/lib/quota/planResolver.ts`.

Precedenza (dalla più alta alla più bassa):

1. **Override manuale nel DB** — tabella `provider_plans`, per `connectionId`.
2. **Catalogo noto** — `src/lib/quota/planRegistry.ts` (solo dati).
3. **Piano vuoto** — nessuna dimensione, è richiesta la configurazione manuale.

### Catalogo noto

| Provider              | Dimensioni                                                        |
| --------------------- | ----------------------------------------------------------------- |
| `codex`               | `percent/5h/100`, `percent/weekly/100`                            |
| `glm`                 | `tokens/5h` (limit=0, sconosciuto), `tokens/weekly`               |
| `minimax`             | `tokens/5h`, `tokens/weekly`                                      |
| `bailian`             | `percent/5h/100`, `percent/weekly/100`, `percent/monthly/100`     |
| `kimi`                | `requests/hourly/1500`                                            |
| `alibaba`             | `requests/monthly/90000`                                          |
| `openai`, `anthropic` | Nessun valore predefinito — è richiesta la configurazione manuale |

---

## Integrazione nella pipeline

### Hook PRE (`open-sse/handlers/chatCore.ts`)

Viene eseguito prima dell'esecutore upstream, dopo i controlli di autenticazione e delle policy:

```
resolveComboTargets / handleSingleModel
  → enforceQuotaShare(apiKeyId, connectionId, provider, estimatedCost)
      → getQuotaStore().peek() per dimensione
      → fairShare.decideFairShare()
      → se bloccata → restituisce 429 (buildErrorBody, regola rigida n. 12)
      → se consentita + deprioritizzata → imposta quotaSoftPenalty=true sul candidato
  → executor.execute()
```

**Fail-open**: se `enforceQuotaShare` genera un'eccezione, la richiesta viene consentita
con un log `pino.warn`. Ciò impedisce che un bug del motore delle quote blocchi tutto
il traffico.

### Hook POST (registrazione del consumo)

Dopo una risposta riuscita:

```
l'esecutore restituisce un esito positivo
  → spendRecorder.recordConsumption(apiKeyId, connectionId, provider, actualCost)
      → getQuotaStore().consume() per dimensione
      → fail-open: gli errori vengono registrati come pino.warn e non vengono mai propagati al client
```

**Nota sulla deriva**: se `consume` non riesce dopo la risposta, il contatore mobile sottostima il consumo.
Il segnale di saturazione del provider (ad es. `anthropic-ratelimit-unified-5h-utilization`)
corregge la stima globale alla richiesta successiva.

### Penalità soft della combinazione (`open-sse/services/combo.ts`)

Quando `decision.deprioritize === true`:

```ts
if (candidate.quotaSoftPenalty) {
  score *= QUOTA_SOFT_DEPRIORITIZE_FACTOR; // valore predefinito: 0,7
}
```

La penalità viene applicata dopo tutti gli altri fattori di punteggio. Riduce la probabilità
che la combinazione automatica selezioni una chiave satura, senza bloccarla in modo rigido.

---

## Panoramica dell'interfaccia utente

### `/dashboard/costs/quota-share` — Pagina principale dei pool

Componenti (tutti in `src/app/(dashboard)/dashboard/costs/quota-share/`):

| Componente             | Scopo                                                                        |
| ---------------------- | ---------------------------------------------------------------------------- |
| `QuotaConceptCard`     | Scheda introduttiva che spiega la condivisione delle quote ai nuovi utenti   |
| `CreatePoolModal`      | Crea un nuovo pool di quote (connessione + nome + allocazioni iniziali)      |
| `PoolCard`             | Riepilogo per pool: nome, connessione, numero di allocazioni                 |
| `DimensionBar`         | Barra impilata per dimensione: quota di ogni chiave + utilizzo globale       |
| `AllocationTable`      | Tabella con consumo, quota equa, deficit/surplus e indicatore di prestito    |
| `BurnRateChart`        | Grafico a linee del tasso di consumo EMA (Recharts lazy tramite `dynamic()`) |
| `EditAllocationsModal` | Modifica pesi, limiti e criteri delle allocazioni per un pool                |

Gli hook della pagina:

- `usePools` — recupera `GET /api/quota/pools` ogni 30 s.
- `usePoolUsage` — recupera `GET /api/quota/pools/[id]/usage` su richiesta.
- `useLocalStoragePoolMigration` — viene eseguito una volta al montaggio per migrare i dati LS legacy.

### `/dashboard/costs/quota-share/plans` — Configurazione del piano del provider

- `ProviderPlanConfigClient.tsx`: menu a discesa per selezionare un provider, visualizzare il
  piano risolto (automaticamente dal catalogo o tramite override manuale) e modificare le dimensioni.
- Le modifiche vengono scritte in `PUT /api/quota/plans/[connectionId]`.
- L'eliminazione ripristina il piano del catalogo o un piano vuoto.

---

## Variabili d'ambiente

| Variabile                          | Valore predefinito | Descrizione                                                        |
| ---------------------------------- | ------------------ | ------------------------------------------------------------------ |
| `QUOTA_STORE_DRIVER`               | `sqlite`           | Driver da utilizzare: `sqlite` o `redis`                           |
| `QUOTA_STORE_REDIS_URL`            | _(vuoto)_          | URL Redis, ad es. `redis://localhost:6379`                         |
| `QUOTA_SATURATION_THRESHOLD`       | `0.5`              | 0..1; `>= threshold` attiva la modalità rigorosa                   |
| `QUOTA_SOFT_DEPRIORITIZE_FACTOR`   | `0.7`              | 0..1; moltiplicatore per il punteggio combinato della policy soft  |
| `QUOTA_CONSUMPTION_RETENTION_DAYS` | `14`               | Giorni prima che il GC rimuova i vecchi bucket `quota_consumption` |

Le impostazioni del DB (`quotaStore.*`) hanno la precedenza sulle variabili d'ambiente.

---

## Risoluzione dei problemi

### Redis è configurato ma non si connette

Verificare che `ioredis` sia installato (`npm ls ioredis`) e che `QUOTA_STORE_REDIS_URL`
sia raggiungibile. In caso di errore di connessione, la factory esegue il fallback a SQLite (registrato
con livello `warn`).

### `peek` restituisce dati obsoleti / comportamento fail-open

Se `peek` genera un'eccezione, `enforceQuotaShare` tratta il risultato come "consenti" (fail-open).
Controllare nei log di `pino` le voci `quota:enforce` e `quota:factory` per identificare
la causa principale.

### Deriva del contatore dei consumi

Se l'utilizzo effettivo del provider differisce dai contatori, è previsto: la
finestra scorrevole a 2 bucket presenta un errore di circa l'1% ai limiti della finestra e `consume` viene
eseguito in modalità fire-and-forget dopo la risposta. Il segnale di saturazione (`saturationSignals.ts`)
legge l'utilizzo reale del provider con un TTL di 30 s e regola `globalUsedPercent`
di conseguenza.

### Il pool mostra "nessun dato" per il tasso di consumo

`computeBurnRate` richiede almeno 2 campioni storici. I nuovi pool senza precedenti
chiamate a `consume` mostreranno `tokensPerSecond: 0` e `timeToExhaustionMs: null`.

---

## Migrazione da localStorage

Al primo caricamento di `/dashboard/costs/quota-share`, l'hook `useLocalStoragePoolMigration`
verifica che:

1. `localStorage.getItem("omniroute:quota-share:pools")` non sia vuoto.
2. `GET /api/quota/pools` restituisca `[]` (il DB è vuoto).

Se entrambe le condizioni sono vere, invia in batch ogni pool legacy a `POST /api/quota/pools`,
quindi rimuove la chiave da localStorage. La migrazione è idempotente: la condizione 2 impedisce
che venga eseguita nuovamente.

---

## Classificazione della strategia interna

`quota-share` è una strategia di instradamento **solo interna** (`INTERNAL_ROUTING_STRATEGY_VALUES` in
`src/shared/constants/routingStrategies.ts`). Viene utilizzata esclusivamente dalle combo di pool
`qtSd/` generate dal sistema ed è deliberatamente esclusa da `ROUTING_STRATEGY_VALUES`, in modo che
non appaia mai come opzione selezionabile dall'utente nell'interfaccia utente o nell'API.

---

## Copertura dei test

Il motore quota-share include due livelli di copertura automatizzata:

| Suite                   | Comando                                                                | Cosa copre                                                                                                                                                                                                                                              |
| :---------------------- | :--------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Unitari (29 test)       | `node --import tsx/esm --test tests/unit/quota-share-strategy.test.ts` | Scheduler DRR, controllo della saturazione, limiti di concorrenza, calcoli fairShare, accodamento del backlog                                                                                                                                           |
| Matrice di integrazione | `npm run test:combo:matrix`                                            | Decisione di instradamento end-to-end attraverso la pipeline combo reale; equità DRR + riduzione della priorità in caso di saturazione tramite punti di integrazione live (`registerQuotaFetcher`, `setLKGP`, `__setHeadroomSaturationFetcherForTests`) |

La matrice di integrazione viene eseguita nella CI insieme a tutte le 19 strategie pubbliche. La suite
di test unitari può essere eseguita autonomamente.

---

## Riepilogo dello schema del DB

Tre tabelle aggiunte dalle migrazioni `078`, `079` e `085`:

- `quota_pools` + `quota_allocations` — definizioni dei pool e allocazioni per singola chiave.
- `quota_consumption` — contatori mobili a 2 bucket per `(apiKeyId, dimensionKey)`.
- `provider_plans` — override manuali dei piani dei provider (dimensioni JSON per connectionId).

Tutte le tabelle sono state aggiunte tramite migrazioni idempotenti `CREATE TABLE IF NOT EXISTS`.
