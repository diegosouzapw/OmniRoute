# Database Schema & Operations Guide (Italiano)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/DATABASE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/DATABASE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/DATABASE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/DATABASE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/DATABASE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/DATABASE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/DATABASE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/DATABASE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/DATABASE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/DATABASE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/DATABASE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/DATABASE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/DATABASE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/DATABASE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/DATABASE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/DATABASE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/DATABASE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/DATABASE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/DATABASE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/DATABASE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/DATABASE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/DATABASE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/DATABASE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/DATABASE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/DATABASE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/DATABASE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/DATABASE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/DATABASE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/DATABASE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/DATABASE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/DATABASE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/DATABASE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/DATABASE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/DATABASE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/DATABASE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/DATABASE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/DATABASE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/DATABASE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/DATABASE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/DATABASE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/DATABASE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/DATABASE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/DATABASE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/DATABASE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/DATABASE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/DATABASE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/DATABASE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/DATABASE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/DATABASE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/DATABASE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/DATABASE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/DATABASE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/DATABASE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/DATABASE_GUIDE.md)

---

> **In breve**: OmniRoute utilizza **SQLite con journaling WAL** come archivio principale, con crittografia **AES-256-GCM** dei dati inattivi per i campi sensibili. Questa guida illustra lo schema, le migrazioni, il backup/ripristino e le procedure operative.

**Fonti:**

- `src/lib/db/core.ts` — singleton + SCHEMA_SQL (17 tabelle di base)
- `src/lib/db/migrationRunner.ts` — migrazioni con versione
- `src/lib/db/migrations/` — 167 file SQL con versione
- `src/lib/db/encryption.ts` — funzioni di supporto per la crittografia
- `src/lib/db/backup.ts` — esportazione/importazione dei backup
- `src/lib/db/healthCheck.ts` — diagnostica dello stato di integrità

---

## Perché SQLite?

OmniRoute ha scelto SQLite anziché PostgreSQL/MySQL per diversi motivi:

| Fattore           | SQLite                                      | PostgreSQL                              |
| ----------------- | ------------------------------------------- | --------------------------------------- |
| **Distribuzione** | Integrato — nessun server separato          | Richiede la configurazione di un server |
| **Crittografia**  | A livello applicativo (AES-256-GCM)         | TDE integrata                           |
| **Prestazioni**   | Più veloce per carichi piccoli/medi         | Migliore per molte scritture simultanee |
| **Concorrenza**   | La modalità WAL consente letture simultanee | MVCC completo                           |
| **Backup**        | Copia di un singolo file                    | `pg_dump` o snapshot del file system    |
| **Caso d'uso**    | Installazione per utente, integrata         | SaaS multi-tenant                       |

Per le distribuzioni **a singolo utente e a singola istanza** (il caso d'uso principale di OmniRoute), SQLite è più semplice e veloce.

### Journaling WAL

`core.ts` apre il database in **modalità WAL (Write-Ahead Logging)**:

```ts
// src/lib/db/core.ts
db.pragma("journal_mode = WAL");
db.pragma("busy_timeout = 2000");
db.pragma("synchronous = NORMAL");
db.pragma(`cache_size = -${DEFAULT_DATABASE_SETTINGS.optimization.cacheSize}`);
```

WAL consente **letture simultanee** durante le scritture, aspetto importante per la dashboard, che esegue query mentre vengono registrate le richieste.

La dimensione predefinita della cache è **65.536 KiB (64 MiB)**. SQLite interpreta un valore negativo di
`cache_size` come limite massimo approssimativo in KiB e alloca le pagine su richiesta.
**Impostazioni > Sistema e archiviazione > Dimensione cache** accetta valori interi da **1 a
1.000.000 KiB**; il salvataggio dell'impostazione la applica alla connessione attiva del database
e OmniRoute ripristina il valore memorizzato all'avvio.

---

## Posizione del database

Il file SQLite viene archiviato in:

| Sistema operativo | Percorso                                                      |
| ----------------- | ------------------------------------------------------------- |
| Linux             | `~/.omniroute/storage.sqlite`                                 |
| macOS             | `~/.omniroute/storage.sqlite`                                 |
| Windows           | `%USERPROFILE%\.omniroute\storage.sqlite`                     |
| Docker            | `/app/data/storage.sqlite` (configurabile tramite `DATA_DIR`) |

File associati:

- `storage.sqlite-wal` — log write-ahead
- `storage.sqlite-shm` — file di memoria condivisa
- `call_logs/` — artefatti dei payload delle richieste (se abilitati)

**Per sostituire la posizione predefinita:**

```bash
DATA_DIR=/custom/path omniroute
```

---

## Architettura dei moduli di dominio

Il database di OmniRoute contiene **110 moduli TypeScript di primo livello** in `src/lib/db/`. Ogni modulo di dominio:

- Gestisce una o più tabelle specifiche
- Esporta funzioni CRUD tipizzate
- Non accede mai alle tabelle di un altro modulo
- Utilizza `getDbInstance()` da `core.ts` per accedere al database

### I 110 moduli DB di primo livello

OmniRoute contiene **110 file TypeScript di primo livello** in `src/lib/db/`. Di seguito è riportato un campione dei moduli principali; consulta l'elenco della directory per la lista completa:

| Modulo                  | Tabelle                                                        | Responsabilità                                                                         |
| ----------------------- | -------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| `providers.ts`          | `provider_connections`                                         | Registrazione e credenziali OAuth/chiave API dei provider                              |
| `models.ts`             | `key_value` (dati dei modelli)                                 | Definizioni, funzionalità e prezzi dei modelli                                         |
| `combos.ts`             | `combos`                                                       | Configurazioni di routing e ordinamento delle combinazioni                             |
| `apiKeys.ts`            | `api_keys`                                                     | Ciclo di vita delle chiavi API, ambiti e monitoraggio delle quote                      |
| `settings.ts`           | `key_value`, `api_keys`, `combos`                              | Configurazione di sistema e archivio KV condiviso                                      |
| `backup.ts`             | —                                                              | Operazioni di esportazione/importazione dei backup                                     |
| `proxies.ts`            | `proxy_registry`, `proxy_assignments`, `provider_connections`  | Configurazioni dei proxy e regole di routing                                           |
| `prompts.ts`            | `prompt_templates`                                             | Modelli di prompt riutilizzabili e relativo versionamento                              |
| `webhooks.ts`           | `webhooks`                                                     | Sottoscrizioni webhook basate su eventi e relativi log                                 |
| `detailedLogs.ts`       | `request_detail_logs`                                          | Registrazione di audit per richiesta (facoltativa, volume elevato)                     |
| `domainState.ts`        | `domain_*` (5 tabelle)                                         | Budget di dominio, circuit breaker, blocchi, catene di fallback e cronologia dei costi |
| `registeredKeys.ts`     | `registered_keys`, `account_key_limits`, `provider_key_limits` | Chiavi API autorizzate per MCP/A2A                                                     |
| `quotaSnapshots.ts`     | `quota_snapshots`                                              | Utilizzo storico delle quote                                                           |
| `modelComboMappings.ts` | `model_combo_mappings`                                         | Associazione dei modelli alle combinazioni predefinite                                 |
| `cliToolState.ts`       | `cli_tool_state`                                               | Stato persistente specifico della CLI                                                  |
| `encryption.ts`         | —                                                              | Funzioni di supporto per cifrare/decifrare i campi                                     |
| `readCache.ts`          | —                                                              | Cache in memoria per operazioni con molte letture                                      |
| `secrets.ts`            | `key_value` (voci cifrate)                                     | Archiviazione cifrata dei segreti                                                      |
| `stateReset.ts`         | —                                                              | Cancellazione/reimpostazione dello stato del database per i test                       |
| `contextHandoffs.ts`    | `context_handoffs`                                             | Contesto della sessione per il passaggio tra agenti                                    |
| `usage*.ts`             | `usage_history`, `call_logs`, `proxy_logs`                     | Monitoraggio dell'utilizzo                                                             |
| `compression*.ts`       | `compression_settings`, `compression_combos`                   | Configurazione della compressione                                                      |

### Confini dei moduli

Una regola architetturale fondamentale: **i moduli non accedono direttamente alle tabelle degli altri moduli**. Per lavorare con i dati di un altro modulo, importa la funzione da quel modulo.

```ts
// ❌ ERRATO: SQL diretto dalla tabella di un altro modulo
db.prepare("SELECT * FROM provider_connections").all();

// ✅ CORRETTO: usa la funzione del modulo providers
import { listProviders } from "@/lib/db/providers";
const providers = await listProviders();
```

Questa regola viene applicata durante la revisione del codice: non esiste un controllo statico, ma le violazioni vengono segnalate.

---

## Schema di base (17 tabelle)

`core.ts` definisce le 17 tabelle di base in `SCHEMA_SQL`. Queste vengono create dalla migrazione `001_initial_schema.sql` e costituiscono lo schema principale.

### Tabelle principali (create nella migrazione iniziale)

| Tabella                    | Scopo                                     | Colonne chiave                                                          |
| -------------------------- | ----------------------------------------- | ----------------------------------------------------------------------- |
| `provider_connections`     | Credenziali del provider (crittografate)  | `id`, `provider`, `auth_type`, `api_key`, `is_active`                   |
| `provider_nodes`           | Informazioni di routing dei nodi provider | `id`, `type`, `name`, `base_url`, `created_at`                          |
| `key_value`                | Archivio KV generico                      | `namespace`, `key`, `value`                                             |
| `combos`                   | Definizioni delle combinazioni di routing | `id`, `name`, `data`, `sort_order`                                      |
| `api_keys`                 | Chiavi API per il gateway                 | `id`, `name`, `key`, `machine_id`, `allowed_models`                     |
| `db_meta`                  | Metadati del database                     | `key`, `value`                                                          |
| `usage_history`            | Record di utilizzo delle richieste        | `id`, `provider`, `model`, `tokens_input`, `tokens_output`, `timestamp` |
| `call_logs`                | Payload e risposte delle richieste        | `id`, `timestamp`, `status`, `model`, `provider`, `latency_ms`          |
| `proxy_logs`               | Log delle richieste proxy                 | `id`, `timestamp`, `proxy_type`, `status`, `provider`                   |
| `domain_fallback_chains`   | Catene modello-provider                   | `model`, `chain`                                                        |
| `domain_budgets`           | Budget di spesa per dominio               | `api_key_id`, `daily_limit_usd`, `warning_threshold`, `reset_interval`  |
| `domain_budget_reset_logs` | Cronologia dei reimpostamenti del budget  | `id`, `api_key_id`, `reset_interval`, `previous_spend`, `reset_at`      |
| `domain_cost_history`      | Monitoraggio dei costi per dominio        | `id`, `api_key_id`, `cost`, `timestamp`                                 |
| `domain_lockout_state`     | Stato del limite di frequenza del dominio | `identifier`, `attempts`, `locked_until`                                |
| `domain_circuit_breakers`  | Stato del circuit breaker per dominio     | `name`, `state`, `failure_count`, `last_failure_time`                   |
| `semantic_cache`           | Cache delle risposte LLM                  | `id`, `signature`, `model`, `prompt_hash`, `response`                   |
| `quota_snapshots`          | Snapshot storici delle quote              | `id`, `provider`, `connection_id`, `window_key`, `remaining_percentage` |

### Tabelle aggiuntive (aggiunte da migrazioni successive)

Le migrazioni successive aggiungono tabelle quali:

- `cli_tool_state` (migrazione 011) — stato dello strumento CLI
- Tabelle `mcp_*` — audit del server MCP
- Tabelle `a2a_*` — stato delle attività A2A
- Tabelle `usage_*` — monitoraggio dell'utilizzo
- Tabelle `plugin_*` — sistema di plugin
- `skill_executions` — cronologia delle esecuzioni delle skill
- Tabelle `memory_*` — sistema di memoria
- Tabelle `compression_*` — sistema di compressione
- Tabelle `webhook_*` — log di consegna dei webhook
- Tabelle `acp_*` — Agent Client Protocol
- Tabelle `oneproxy_*` — marketplace 1proxy
- `proxy_assignments` — associazioni degli ambiti proxy
- `detailed_call_artifacts` — metadati degli artefatti dei log delle chiamate
- `quota_alert_history` — audit degli avvisi sulle quote
- `command_code_auth_sessions` — sessioni OAuth di Command Code

L'elenco completo di oltre 30 tabelle si trova in `src/lib/db/migrations/`.

---

## Migrazioni

OmniRoute utilizza **migrazioni versionate e idempotenti** in `src/lib/db/migrations/`. Ogni migrazione è costituita da un singolo file SQL denominato `NNN_description.sql`.

### Denominazione delle migrazioni

```
001_initial_schema.sql
002_mcp_a2a_tables.sql
003_provider_node_custom_paths.sql
...
021_combo_call_log_targets.sql
```

### Come vengono eseguite le migrazioni

All'avvio, `migrationRunner.ts`:

1. Crea la tabella `_omniroute_migrations` se non esiste
2. Verifica quali migrazioni sono già state applicate
3. Applica in ordine tutte le nuove migrazioni, ciascuna all'interno di una transazione
4. Registra ogni migrazione applicata con un timestamp

```ts
// src/lib/db/migrationRunner.ts (semplificato)
export async function runMigrations(db: SqliteDatabase, migrationsDir: string) {
  const applied = getAppliedMigrations(db);
  const available = readMigrationFiles(migrationsDir);

  for (const migration of available) {
    if (applied.includes(migration.id)) continue;
    db.transaction(() => {
      db.exec(migration.sql);
      recordAppliedMigration(db, migration.id);
    })();
  }
}
```

### Idempotenza

Le migrazioni devono essere **idempotenti**: eseguirle due volte non deve produrre alcun effetto:

```sql
-- 004_proxy_registry.sql
CREATE TABLE IF NOT EXISTS proxy_registry (
  id TEXT PRIMARY KEY,
  host TEXT NOT NULL,
  port INTEGER NOT NULL,
  ...
);
```

Utilizza liberamente le clausole `IF NOT EXISTS`, `IF EXISTS` e `OR IGNORE` / `OR REPLACE`.

### Aggiunta di una nuova migrazione

1. **Identifica il numero successivo**: `ls src/lib/db/migrations/ | tail -1`
2. **Crea il file**: `NNN_my_change.sql`
3. **Utilizza DDL sicuro**: `CREATE TABLE IF NOT EXISTS`, `ALTER TABLE ... ADD COLUMN`
4. **Esegui con attenzione il backfill dei dati**: utilizza `UPDATE ... WHERE ...` per gestire le righe esistenti
5. **Esegui i test su una copia**: non eseguire mai migrazioni non testate in produzione

Esempio:

```sql
-- 022_add_combo_priority.sql
ALTER TABLE combos ADD COLUMN priority INTEGER DEFAULT 100;
UPDATE combos SET priority = 100 WHERE priority IS NULL;
CREATE INDEX IF NOT EXISTS idx_combos_priority ON combos(priority);
```

> Le **modifiche incompatibili con le versioni precedenti** (ad esempio, l'eliminazione di colonne) sono complesse. OmniRoute NON supporta il downgrade: una volta applicata una migrazione, la modifica dello schema è permanente. Pianifica di conseguenza.

---

## Crittografia dei dati inattivi

I campi sensibili (chiavi API, token OAuth, stringhe di connessione) vengono crittografati quando sono inattivi utilizzando **AES-256-GCM**.

### Come funziona

```ts
// src/lib/db/encryption.ts (semplificato)
const key = deriveKeyFromPassphrase(passphrase, salt);
const iv = randomBytes(12);
const cipher = createCipheriv("aes-256-gcm", key, iv);
const encrypted = Buffer.concat([cipher.update(plaintext), cipher.final()]);
const authTag = cipher.getAuthTag();
return { encrypted, iv, authTag };
```

### Dove viene utilizzata

- `provider_connections.api_key` — crittografato a livello applicativo
- `provider_connections.access_token`, `refresh_token`, `id_token` — crittografati a livello applicativo
- Voci `key_value` con `namespace = "secrets"` — crittografate a livello applicativo
- `proxy_registry.auth` — crittografato a livello applicativo (se presente)

### Chiave di crittografia

La chiave di crittografia deriva da una **passphrase** (impostata tramite la variabile di ambiente `STORAGE_ENCRYPTION_KEY`) e da un **salt** (memorizzato nel DB). Entrambi sono necessari per decrittografare i dati.

```bash
# Genera una passphrase sicura
openssl rand -hex 32

# Imposta in .env
STORAGE_ENCRYPTION_KEY=<your-key>
```

> **Importante**: la perdita della chiave di crittografia comporta la perdita dell'accesso a tutti i dati crittografati. **Esegui il backup della chiave separatamente dal database**.

### Dati NON crittografati

Per motivi di prestazioni, i seguenti dati vengono memorizzati in testo non crittografato:

- Nomi visualizzati dei provider
- Definizioni dei modelli (già pubbliche)
- Regole di instradamento
- Registri di utilizzo (nessun dato personale identificabile)

---

## Considerazioni sulla crittografia (v3.8.16+)

OmniRoute utilizza **`migrateLegacyEncryptedString()`** per gestire in modo trasparente due schemi di crittografia:

- **Legacy** (precedente alla v3.5.0): "crittografia" basata su XOR (non è vera crittografia)
- **Attuale**: AES-256-GCM con IV e tag di autenticazione appropriati

L'helper di migrazione rileva il formato legacy e, alla prima lettura, esegue nuovamente la crittografia con il nuovo schema. Ciò significa che è possibile aggiornare un database precedente senza perdere le credenziali.

---

## Cache di lettura

Per i dati letti frequentemente (modelli, provider, impostazioni), `readCache.ts` fornisce una **cache in memoria**:

```ts
// Memorizzato nella cache all'avvio, invalidato in fase di scrittura
const providers = await getCachedProviders(); // Veloce, in memoria
const fresh = await listProviders(); // Lento, accede al DB
```

| Entità memorizzata nella cache | Chiave della cache | TTL                 |
| ------------------------------ | ------------------ | ------------------- |
| `models`                       | `models:v1`        | Fino alla scrittura |
| `provider_connections`         | `providers:v1`     | Fino alla scrittura |
| `settings`                     | `settings:v1`      | Fino alla scrittura |
| `combos`                       | `combos:v1`        | Fino alla scrittura |

La cache viene invalidata a ogni scrittura nella tabella corrispondente.

---

## Backup e ripristino

### Backup manuale

```bash
# Utilizza la CLI per creare un backup locale
omniroute backup create --name pre-migration

# Oppure tramite l'API
curl -X PUT http://localhost:20128/api/db-backups \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

Il file di backup include:

- Tutte le tabelle del DB (serializzate in JSON)
- Artefatti del registro delle chiamate (codificati in base64, facoltativi)
- Impostazioni e segreti (crittografati)
- Configurazione dei plugin

### Ripristino

```bash
# Tramite la CLI
omniroute restore pre-migration

# Tramite l'API
curl -X POST http://localhost:20128/api/db-backups/restore \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

> **Avviso**: il ripristino sovrascrive l'intero DB. Arrestare prima tutti i client.

### Backup automatici

```bash
# Abilita i backup giornalieri automatici tramite la CLI
omniroute backup auto enable --cron "0 2 * * *" --retention 7
```

La pianificazione viene eseguita lato server da un processo in background che si attiva ogni 30 secondi
(valore predefinito) e valuta l'espressione cron rispetto all'ora locale del server.

| Variabile                                   | Valore predefinito | Descrizione                                                                                                                                                     |
| ------------------------------------------- | ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_BACKUP_SCHEDULE_JOB_INTERVAL_MS` | `30000`            | Intervallo di attivazione in ms (minimo `5000`). Deve essere inferiore a 60 s per rientrare in modo affidabile nel minuto corrispondente dell'espressione cron. |

### Backup a caldo di SQLite

Per eseguire il backup senza tempi di inattività di un DB attivo:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".backup /backups/omniroute-hot.db"
```

Questo comando utilizza l'API di backup online di SQLite ed è sicuro eseguirlo mentre OmniRoute è in funzione.

---

## Ottimizzazione delle prestazioni

### Modalità WAL

WAL è abilitata per impostazione predefinita. Per carichi di lavoro con molte scritture, prendere in considerazione:

```sql
PRAGMA wal_autocheckpoint = 1000;  -- Checkpoint ogni 1000 pagine
PRAGMA journal_size_limit = 67108864;  -- Limite WAL di 64 MB
```

### Indici

Indici principali per le prestazioni (creati automaticamente dalle migrazioni):

- `idx_models_provider` — ricerca dei modelli per provider
- `idx_combo_targets_combo_id` — espansione delle destinazioni delle combinazioni
- `idx_usage_history_api_key_timestamp` — analisi dell'utilizzo
- `idx_quota_snapshots_api_key_window` — monitoraggio delle quote
- `idx_call_logs_timestamp` — query sui registri delle chiamate

Per aggiungere un nuovo indice, creare una migrazione:

```sql
-- 023_add_my_index.sql
CREATE INDEX IF NOT EXISTS idx_my_table_my_column ON my_table(my_column);
```

### I/O con mapping della memoria

Per database molto grandi (>10 GB), il mapping della memoria può essere regolato tramite un pragma SQLite:

```sql
-- Impostare tramite un pragma SQLite (modificare in core.ts o in fase di esecuzione)
PRAGMA mmap_size = 268435456;  -- 256 MB
```

### Compattazione

Le istanze OmniRoute in esecuzione per lunghi periodi traggono vantaggio dall'esecuzione occasionale di `VACUUM`:

```bash
sqlite3 ~/.omniroute/storage.sqlite "VACUUM;"
```

Eseguirlo mensilmente durante le finestre con poco traffico. (La modalità WAL ne riduce la necessità, ma non la elimina.)

---

## Controllo dello stato

`src/lib/db/healthCheck.ts` fornisce **diagnostica dello stato a livello di DB**:

Entrambi i verbi richiedono l'autenticazione (`401` in caso contrario). `GET` esegue solo la diagnosi; `POST` esegue lo
stesso controllo con `autoRepair` abilitato.

```bash
GET  /api/db/health   # esegue la diagnosi
POST /api/db/health   # esegue la diagnosi e la riparazione
```

La risposta è il `DbHealthCheckResult` prodotto da `runDbHealthCheck()`
(`src/lib/db/healthCheck.ts`):

```json
{
  "isHealthy": false,
  "issues": [
    {
      "type": "broken_reference",
      "table": "domain_budgets",
      "description": "I budget dei domini facevano riferimento a chiavi API che non esistono più.",
      "count": 2
    }
  ],
  "repairedCount": 0,
  "backupCreated": false,
  "autoRepair": false,
  "checkedAt": "2026-08-18T09:00:00.000Z",
  "driver": { "name": "better-sqlite3", "degraded": false }
}
```

| Campo             | Significato                                                                                                                                                            |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `isHealthy`       | `true` quando `issues` è vuoto. `driver` non influisce mai su questo valore.                                                                                           |
| `issues[].type`   | Uno tra `integrity_check_failed`, `broken_reference`, `stale_snapshot`, `invalid_state`.                                                                               |
| `repairedCount`   | Righe riparate durante questa esecuzione; sempre `0` quando `autoRepair` è false.                                                                                      |
| `backupCreated`   | Indica se è stato creato un backup prima della riparazione.                                                                                                            |
| `checkedAt`       | Timestamp ISO condiviso dall'esecuzione e da qualsiasi nota di riparazione scritta.                                                                                    |
| `driver.name`     | Driver SQLite che gestisce il database controllato.                                                                                                                    |
| `driver.degraded` | `true` quando le scritture non sono salvate in modo durevole nel file del database: il fallback WASM `sql.js` (persistenza dell'intero file) o un database in memoria. |

Lo stesso payload viene restituito dallo strumento MCP `omniroute_db_health_check`.

Eseguire `PRAGMA integrity_check` per rilevare eventuali danneggiamenti:

```bash
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"
# Dovrebbe stampare: ok
```

Se restituisce un valore diverso da `ok`, **interrompere immediatamente l'utilizzo del database** e ripristinarlo dal backup.

---

## Ripristino di emergenza

### Scenario 1: file WAL perso

Il file `-wal` è mancante, ma `-shm` e il database principale sono intatti:

```bash
# Viene ripristinato automaticamente alla successiva apertura
omniroute
```

Se SQLite non riesce a eseguire il ripristino automatico:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".recover" > recovered.sql
sqlite3 recovered.db < recovered.sql
mv recovered.db ~/.omniroute/storage.sqlite
```

### Scenario 2: file del database principale danneggiato

Ripristinare dal backup:

```bash
omniroute sync pull --merge   # oppure: omniroute backup restore <backup-id>
```

### Scenario 3: chiave di crittografia persa

**Non è possibile alcun ripristino** senza la chiave. I campi crittografati sono illeggibili. Aggiungere nuovamente tutti i provider manualmente con nuove credenziali.

> **Mitigazione**: eseguire sempre separatamente il backup della chiave di crittografia, preferibilmente in un gestore di password o in un KMS.

### Scenario 4: disco pieno

SQLite restituirà errori `SQLITE_FULL`. Liberare spazio su disco, quindi eseguire:

```bash
# Esegue il checkpoint del WAL per liberare spazio
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA wal_checkpoint(TRUNCATE);"
```

---

## Operazioni comuni

### Ispezionare una tabella

```bash
sqlite3 ~/.omniroute/storage.sqlite "SELECT * FROM api_keys LIMIT 5;"
```

### Contare le righe in tutte le tabelle

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';
EOF
```

### Reimpostare (cancellare) tutti i dati

```bash
# Arrestare prima OmniRoute
omniroute stop

# Eliminare il file del database
rm ~/.omniroute/storage.sqlite*

# Riavviare (verrà ricreato un database vuoto)
omniroute
```

Per una reimpostazione **selettiva** (mantenere i provider, cancellare i dati di utilizzo):

```bash
DELETE FROM usage_history WHERE timestamp < datetime('now', '-30 day');
DELETE FROM call_logs WHERE timestamp < datetime('now', '-30 day');
DELETE FROM proxy_logs WHERE timestamp < datetime('now', '-30 day');
```

### Esportare una singola tabella

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
.mode csv
.output api_keys.csv
SELECT * FROM api_keys;
EOF
```

---

## Risoluzione dei problemi

### "Il database è bloccato"

Un altro processo mantiene un blocco di scrittura. È possibile:

- Attendere il completamento dell'altro processo (verificare con `lsof | grep storage.sqlite`)
- Terminare l'altro processo
- Se il problema persiste, riavviare OmniRoute

### "Vincolo di chiave esterna non soddisfatto"

Un modulo di dominio sta violando l'integrità referenziale. Verificare:

- Righe orfane nelle tabelle dipendenti
- Eliminazioni a cascata che non sono state propagate
- Una migrazione recente che ha modificato una chiave esterna

Eseguire `PRAGMA foreign_key_check;` per individuare le violazioni.

### "Memoria insufficiente"

L'I/O con mapping in memoria di SQLite sta superando il limite del sistema operativo. Ridurlo tramite un pragma di SQLite:

```sql
PRAGMA mmap_size = 134217728;  -- 128MB invece di 256MB
```

Oppure disabilitarlo:

```sql
PRAGMA mmap_size = 0;
```

### "Migrazione non riuscita durante l'esecuzione"

La migrazione è stata eseguita in una transazione, quindi dovrebbe essere stato effettuato il rollback. In caso contrario:

1. **Arrestare OmniRoute** (per impedire ulteriori tentativi)
2. **Verificare lo stato del database** con `sqlite3`
3. **Correggere manualmente** la migrazione parziale
4. **Eseguire nuovamente** OmniRoute (la migrazione verrà ritentata)

Per evitare questo problema, testare sempre prima le migrazioni su una copia.

---

## Vedere anche

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — tabelle di utilizzo
- [MONITORING_GUIDE.md](./MONITORING_GUIDE.md) — monitoraggio dello stato
- [RELEASE_CHECKLIST.md](./RELEASE_CHECKLIST.md) — flusso di rilascio
- Codice sorgente: `src/lib/db/` (oltre 80 file, circa 25.000 righe di codice)
