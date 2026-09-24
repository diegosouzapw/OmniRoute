# Database Schema & Operations Guide (Nederlands)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/DATABASE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/DATABASE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/DATABASE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/DATABASE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/DATABASE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/DATABASE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/DATABASE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/DATABASE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/DATABASE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/DATABASE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/DATABASE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/DATABASE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/DATABASE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/DATABASE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/DATABASE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/DATABASE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/DATABASE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/DATABASE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/DATABASE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/DATABASE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/DATABASE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/DATABASE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/DATABASE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/DATABASE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/DATABASE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/DATABASE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/DATABASE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/DATABASE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/DATABASE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/DATABASE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/DATABASE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/DATABASE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/DATABASE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/DATABASE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/DATABASE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/DATABASE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/DATABASE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/DATABASE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/DATABASE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/DATABASE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/DATABASE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/DATABASE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/DATABASE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/DATABASE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/DATABASE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/DATABASE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/DATABASE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/DATABASE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/DATABASE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/DATABASE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/DATABASE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/DATABASE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/DATABASE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/DATABASE_GUIDE.md)

---

> **Kort samengevat**: OmniRoute gebruikt **SQLite met WAL-journaling** als primaire opslag, met **AES-256-GCM**-versleuteling van gevoelige velden wanneer deze zijn opgeslagen. Deze handleiding behandelt het schema, migraties, back-ups/herstel en operationele draaiboeken.

**Bronnen:**

- `src/lib/db/core.ts` — singleton + SCHEMA_SQL (17 basistabellen)
- `src/lib/db/migrationRunner.ts` — geversioneerde migraties
- `src/lib/db/migrations/` — 167 geversioneerde SQL-bestanden
- `src/lib/db/encryption.ts` — hulpfuncties voor versleuteling
- `src/lib/db/backup.ts` — export/import van back-ups
- `src/lib/db/healthCheck.ts` — gezondheidsdiagnostiek

---

## Waarom SQLite?

OmniRoute heeft om verschillende redenen voor SQLite gekozen in plaats van PostgreSQL/MySQL:

| Factor               | SQLite                                      | PostgreSQL                                        |
| -------------------- | ------------------------------------------- | ------------------------------------------------- |
| **Implementatie**    | Ingebed — geen afzonderlijke server nodig   | Vereist serverconfiguratie                        |
| **Versleuteling**    | Applicatielaag (AES-256-GCM)                | Ingebouwde TDE                                    |
| **Prestaties**       | Sneller voor kleine/middelgrote workloads   | Beter voor zeer veel gelijktijdige schrijfacties  |
| **Gelijktijdigheid** | WAL-modus maakt gelijktijdig lezen mogelijk | Volledige MVCC                                    |
| **Back-up**          | Kopie van één bestand                       | `pg_dump` of momentopname van het bestandssysteem |
| **Gebruiksscenario** | Installatie per gebruiker, ingebed          | SaaS met meerdere tenants                         |

Voor implementaties met **één gebruiker en één instantie** (het primaire gebruiksscenario van OmniRoute) is SQLite eenvoudiger en sneller.

### WAL-journaling

`core.ts` opent de database in de **WAL-modus (Write-Ahead Logging)**:

```ts
// src/lib/db/core.ts
db.pragma("journal_mode = WAL");
db.pragma("busy_timeout = 2000");
db.pragma("synchronous = NORMAL");
db.pragma(`cache_size = -${DEFAULT_DATABASE_SETTINGS.optimization.cacheSize}`);
```

WAL maakt **gelijktijdige leesacties** tijdens schrijfacties mogelijk — belangrijk voor het dashboard, dat query's uitvoert terwijl verzoeken worden vastgelegd.

De standaard cachegrootte is **65.536 KiB (64 MiB)**. SQLite interpreteert een negatieve
`cache_size` als een benaderde bovengrens in KiB en wijst pagina's naar behoefte toe.
**Instellingen > Systeem en opslag > Cachegrootte** accepteert gehele waarden van **1 tot
1.000.000 KiB**; wanneer de instelling wordt opgeslagen, wordt deze toegepast op de actieve databaseverbinding
en OmniRoute herstelt de opgeslagen waarde bij het opstarten.

---

## Databaselocatie

Het SQLite-bestand wordt opgeslagen op:

| Besturingssysteem | Pad                                                         |
| ----------------- | ----------------------------------------------------------- |
| Linux             | `~/.omniroute/storage.sqlite`                               |
| macOS             | `~/.omniroute/storage.sqlite`                               |
| Windows           | `%USERPROFILE%\.omniroute\storage.sqlite`                   |
| Docker            | `/app/data/storage.sqlite` (configureerbaar via `DATA_DIR`) |

Bijbehorende bestanden:

- `storage.sqlite-wal` — write-ahead-logboek
- `storage.sqlite-shm` — bestand voor gedeeld geheugen
- `call_logs/` — artefacten van verzoekpayloads (indien ingeschakeld)

**De locatie overschrijven:**

```bash
DATA_DIR=/custom/path omniroute
```

---

## Architectuur van domeinmodules

De database van OmniRoute bevat **110 TypeScript-modules op het hoogste niveau** in `src/lib/db/`. Elke domeinmodule:

- Beheert één of meer specifieke tabellen
- Exporteert getypeerde CRUD-functies
- Benadert nooit de tabellen van een andere module
- Gebruikt `getDbInstance()` uit `core.ts` om toegang te krijgen tot de database

### De 110 DB-modules op het hoogste niveau

OmniRoute heeft **110 TypeScript-bestanden op het hoogste niveau** in `src/lib/db/`. Hieronder staat een selectie van kernmodules; raadpleeg de directorylijst voor de volledige lijst:

| Module                  | Tabellen                                                       | Verantwoordelijkheid                                                              |
| ----------------------- | -------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| `providers.ts`          | `provider_connections`                                         | Registratie en referenties van providers via OAuth/API-sleutels                   |
| `models.ts`             | `key_value` (modelgegevens)                                    | Modeldefinities, mogelijkheden en prijzen                                         |
| `combos.ts`             | `combos`                                                       | Configuraties en volgorde voor combinatieroutering                                |
| `apiKeys.ts`            | `api_keys`                                                     | Levenscyclus van API-sleutels, scopes en quotumregistratie                        |
| `settings.ts`           | `key_value`, `api_keys`, `combos`                              | Systeemconfiguratie en gedeelde KV-opslag                                         |
| `backup.ts`             | —                                                              | Bewerkingen voor het exporteren/importeren van back-ups                           |
| `proxies.ts`            | `proxy_registry`, `proxy_assignments`, `provider_connections`  | Proxyconfiguraties en routeringsregels                                            |
| `prompts.ts`            | `prompt_templates`                                             | Herbruikbare promptsjablonen en versiebeheer                                      |
| `webhooks.ts`           | `webhooks`                                                     | Gebeurtenisgestuurde webhookabonnementen en logboeken                             |
| `detailedLogs.ts`       | `request_detail_logs`                                          | Auditregistratie per aanvraag (optioneel, groot volume)                           |
| `domainState.ts`        | `domain_*` (5 tabellen)                                        | Domeinbudgetten, circuitbreakers, blokkeringen, fallback-ketens en kostenhistorie |
| `registeredKeys.ts`     | `registered_keys`, `account_key_limits`, `provider_key_limits` | API-sleutels op de toelatingslijst voor MCP/A2A                                   |
| `quotaSnapshots.ts`     | `quota_snapshots`                                              | Historisch quotumgebruik                                                          |
| `modelComboMappings.ts` | `model_combo_mappings`                                         | Modellen aan standaardcombinaties koppelen                                        |
| `cliToolState.ts`       | `cli_tool_state`                                               | Persistente CLI-specifieke status                                                 |
| `encryption.ts`         | —                                                              | Hulpfuncties voor het versleutelen/ontsleutelen van velden                        |
| `readCache.ts`          | —                                                              | Cache in het geheugen voor leesintensieve bewerkingen                             |
| `secrets.ts`            | `key_value` (versleutelde vermeldingen)                        | Versleutelde opslag van geheimen                                                  |
| `stateReset.ts`         | —                                                              | Databasestatus wissen/herstellen voor tests                                       |
| `contextHandoffs.ts`    | `context_handoffs`                                             | Sessiecontext voor overdracht tussen agents                                       |
| `usage*.ts`             | `usage_history`, `call_logs`, `proxy_logs`                     | Gebruiksregistratie                                                               |
| `compression*.ts`       | `compression_settings`, `compression_combos`                   | Compressieconfiguratie                                                            |

### Modulegrenzen

Een belangrijke architectuurregel: **modules benaderen elkaars tabellen niet rechtstreeks**. Importeer de functie uit de betreffende module om met de gegevens van een andere module te werken.

```ts
// ❌ FOUT: rechtstreekse SQL-query vanuit een andere module
db.prepare("SELECT * FROM provider_connections").all();

// ✅ GOED: gebruik de functie uit de providers-module
import { listProviders } from "@/lib/db/providers";
const providers = await listProviders();
```

Deze regel wordt afgedwongen via codebeoordelingen — er is geen statische controle, maar overtredingen worden gemarkeerd.

---

## Basisschema (17 tabellen)

`core.ts` definieert de 17 basistabellen in `SCHEMA_SQL`. Deze worden aangemaakt door migratie `001_initial_schema.sql` en vormen het kernschema.

### Kerntabellen (aangemaakt tijdens de initiële migratie)

| Tabel                      | Doel                                    | Belangrijkste kolommen                                                  |
| -------------------------- | --------------------------------------- | ----------------------------------------------------------------------- |
| `provider_connections`     | Providerreferenties (versleuteld)       | `id`, `provider`, `auth_type`, `api_key`, `is_active`                   |
| `provider_nodes`           | Routeringsinformatie voor providernodes | `id`, `type`, `name`, `base_url`, `created_at`                          |
| `key_value`                | Algemene KV-opslag                      | `namespace`, `key`, `value`                                             |
| `combos`                   | Definities van routeringscombinaties    | `id`, `name`, `data`, `sort_order`                                      |
| `api_keys`                 | API-sleutels voor de gateway            | `id`, `name`, `key`, `machine_id`, `allowed_models`                     |
| `db_meta`                  | Databasemetadata                        | `key`, `value`                                                          |
| `usage_history`            | Gebruiksgegevens van aanvragen          | `id`, `provider`, `model`, `tokens_input`, `tokens_output`, `timestamp` |
| `call_logs`                | Aanvraagpayloads en antwoorden          | `id`, `timestamp`, `status`, `model`, `provider`, `latency_ms`          |
| `proxy_logs`               | Logboeken van proxyverzoeken            | `id`, `timestamp`, `proxy_type`, `status`, `provider`                   |
| `domain_fallback_chains`   | Koppelingen van modellen aan providers  | `model`, `chain`                                                        |
| `domain_budgets`           | Uitgavenbudgetten per domein            | `api_key_id`, `daily_limit_usd`, `warning_threshold`, `reset_interval`  |
| `domain_budget_reset_logs` | Geschiedenis van budgetresets           | `id`, `api_key_id`, `reset_interval`, `previous_spend`, `reset_at`      |
| `domain_cost_history`      | Kostenregistratie per domein            | `id`, `api_key_id`, `cost`, `timestamp`                                 |
| `domain_lockout_state`     | Status van domeinspecifieke limieten    | `identifier`, `attempts`, `locked_until`                                |
| `domain_circuit_breakers`  | Circuitbreakerstatus per domein         | `name`, `state`, `failure_count`, `last_failure_time`                   |
| `semantic_cache`           | Cache voor LLM-antwoorden               | `id`, `signature`, `model`, `prompt_hash`, `response`                   |
| `quota_snapshots`          | Historische momentopnamen van quota     | `id`, `provider`, `connection_id`, `window_key`, `remaining_percentage` |

### Aanvullende tabellen (toegevoegd door latere migraties)

Latere migraties voegen onder andere de volgende tabellen toe:

- `cli_tool_state` (migratie 011) — status van het CLI-hulpprogramma
- `mcp_*`-tabellen — audit van MCP-servers
- `a2a_*`-tabellen — A2A-taakstatus
- `usage_*`-tabellen — gebruiksregistratie
- `plugin_*`-tabellen — pluginsysteem
- `skill_executions` — geschiedenis van vaardigheidsuitvoeringen
- `memory_*`-tabellen — geheugensysteem
- `compression_*`-tabellen — compressiesysteem
- `webhook_*`-tabellen — logboek van webhookleveringen
- `acp_*`-tabellen — Agent Client Protocol
- `oneproxy_*`-tabellen — 1proxy-marktplaats
- `proxy_assignments` — koppelingen van proxybereiken
- `detailed_call_artifacts` — metadata van aanroeplogboekartefacten
- `quota_alert_history` — audit van quotawaarschuwingen
- `command_code_auth_sessions` — OAuth-sessies van Command Code

De volledige lijst met circa 30+ tabellen staat in `src/lib/db/migrations/`.

---

## Migraties

OmniRoute gebruikt **geversioneerde, idempotente migraties** in `src/lib/db/migrations/`. Elke migratie is één SQL-bestand met de naam `NNN_description.sql`.

### Naamgeving van migraties

```
001_initial_schema.sql
002_mcp_a2a_tables.sql
003_provider_node_custom_paths.sql
...
021_combo_call_log_targets.sql
```

### Hoe migraties worden uitgevoerd

Bij het opstarten voert `migrationRunner.ts` het volgende uit:

1. Maakt de tabel `_omniroute_migrations` aan als deze niet bestaat
2. Vraagt reeds toegepaste migraties op
3. Past eventuele nieuwe migraties op volgorde toe, elk in een transactie
4. Registreert elke toegepaste migratie met een tijdstempel

```ts
// src/lib/db/migrationRunner.ts (vereenvoudigd)
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

### Idempotentie

Migraties moeten **idempotent** zijn — als ze twee keer worden uitgevoerd, mag de tweede uitvoering niets doen:

```sql
-- 004_proxy_registry.sql
CREATE TABLE IF NOT EXISTS proxy_registry (
  id TEXT PRIMARY KEY,
  host TEXT NOT NULL,
  port INTEGER NOT NULL,
  ...
);
```

Gebruik royaal clausules zoals `IF NOT EXISTS`, `IF EXISTS` en `OR IGNORE` / `OR REPLACE`.

### Een nieuwe migratie toevoegen

1. **Bepaal het volgende nummer**: `ls src/lib/db/migrations/ | tail -1`
2. **Maak het bestand aan**: `NNN_my_change.sql`
3. **Gebruik veilige DDL**: `CREATE TABLE IF NOT EXISTS`, `ALTER TABLE ... ADD COLUMN`
4. **Vul gegevens zorgvuldig aan**: gebruik `UPDATE ... WHERE ...` om bestaande rijen correct te verwerken
5. **Test op een kopie**: voer nooit ongeteste migraties uit in productie

Voorbeeld:

```sql
-- 022_add_combo_priority.sql
ALTER TABLE combos ADD COLUMN priority INTEGER DEFAULT 100;
UPDATE combos SET priority = 100 WHERE priority IS NULL;
CREATE INDEX IF NOT EXISTS idx_combos_priority ON combos(priority);
```

> **Niet-achterwaarts-compatibele wijzigingen** (bijvoorbeeld het verwijderen van kolommen) zijn lastig. OmniRoute ondersteunt GEEN downgrade — zodra een migratie is toegepast, is de schemawijziging permanent. Houd hier rekening mee bij het plannen.

---

## Versleuteling van opgeslagen gegevens

Gevoelige velden (API-sleutels, OAuth-tokens, verbindingsreeksen) worden bij opslag versleuteld met **AES-256-GCM**.

### Hoe het werkt

```ts
// src/lib/db/encryption.ts (vereenvoudigd)
const key = deriveKeyFromPassphrase(passphrase, salt);
const iv = randomBytes(12);
const cipher = createCipheriv("aes-256-gcm", key, iv);
const encrypted = Buffer.concat([cipher.update(plaintext), cipher.final()]);
const authTag = cipher.getAuthTag();
return { encrypted, iv, authTag };
```

### Waar het wordt gebruikt

- `provider_connections.api_key` — versleuteld op applicatieniveau
- `provider_connections.access_token`, `refresh_token`, `id_token` — versleuteld op applicatieniveau
- `key_value`-items met `namespace = "secrets"` — versleuteld op applicatieniveau
- `proxy_registry.auth` — versleuteld op applicatieniveau (indien aanwezig)

### Versleutelingssleutel

De versleutelingssleutel wordt afgeleid van een **wachtwoordzin** (ingesteld via de omgevingsvariabele `STORAGE_ENCRYPTION_KEY`) en een **salt** (opgeslagen in de database). Beide zijn vereist om gegevens te ontsleutelen.

```bash
# Genereer een veilige wachtwoordzin
openssl rand -hex 32

# Stel deze in .env in
STORAGE_ENCRYPTION_KEY=<your-key>
```

> **Kritiek**: Als de versleutelingssleutel verloren gaat, gaat ook de toegang tot alle versleutelde gegevens verloren. **Maak een back-up van de sleutel, afzonderlijk van de database**.

### Wat NIET wordt versleuteld

Om prestatieredenen worden de volgende gegevens als platte tekst opgeslagen:

- Weergavenamen van providers
- Modeldefinities (reeds openbaar)
- Routeringsregels
- Gebruiksregistraties (geen persoonsgegevens)

---

## Aandachtspunten voor versleuteling (v3.8.16+)

OmniRoute gebruikt **`migrateLegacyEncryptedString()`** om twee versleutelingsmethoden transparant af te handelen:

- **Verouderd** (vóór v3.5.0): op XOR gebaseerde 'versleuteling' (geen echte cryptografie)
- **Huidig**: AES-256-GCM met een correcte IV en authenticatietag

De migratiehelper detecteert het verouderde formaat en versleutelt het bij de eerste uitlezing opnieuw met de nieuwe methode. Dit betekent dat u een oude database kunt upgraden zonder inloggegevens te verliezen.

---

## Uitleescache

Voor gegevens die vaak worden uitgelezen (modellen, providers, instellingen) biedt `readCache.ts` een **cache in het geheugen**:

```ts
// Bij het opstarten in de cache geplaatst, ongeldig gemaakt bij schrijven
const providers = await getCachedProviders(); // Snel, in het geheugen
const fresh = await listProviders(); // Traag, leest uit de database
```

| Entiteit in de cache   | Cachesleutel   | TTL                              |
| ---------------------- | -------------- | -------------------------------- |
| `models`               | `models:v1`    | Tot de volgende schrijfbewerking |
| `provider_connections` | `providers:v1` | Tot de volgende schrijfbewerking |
| `settings`             | `settings:v1`  | Tot de volgende schrijfbewerking |
| `combos`               | `combos:v1`    | Tot de volgende schrijfbewerking |

De cache wordt ongeldig gemaakt bij elke schrijfbewerking naar de bijbehorende tabel.

---

## Back-up en herstel

### Handmatige back-up

```bash
# Gebruik de CLI om een lokale back-up te maken
omniroute backup create --name pre-migration

# Of via de API
curl -X PUT http://localhost:20128/api/db-backups \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

Het back-upbestand bevat:

- Alle databasetabellen (geserialiseerd naar JSON)
- Artefacten van oproeplogboeken (base64-gecodeerd, optioneel)
- Instellingen en geheimen (versleuteld)
- Pluginconfiguratie

### Herstellen

```bash
# Via de CLI
omniroute restore pre-migration

# Via de API
curl -X POST http://localhost:20128/api/db-backups/restore \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

> **Waarschuwing**: Herstellen overschrijft de volledige database. Stop eerst alle clients.

### Geautomatiseerde back-ups

```bash
# Schakel geautomatiseerde dagelijkse back-ups in via de CLI
omniroute backup auto enable --cron "0 2 * * *" --retention 7
```

De planning wordt aan de serverzijde uitgevoerd door een achtergrondtaak die elke 30 seconden
(standaard) wordt geactiveerd en de cron-expressie vergelijkt met de lokale servertijd.

| Variabele                                   | Standaard | Beschrijving                                                                                                                      |
| ------------------------------------------- | --------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_BACKUP_SCHEDULE_JOB_INTERVAL_MS` | `30000`   | Activeringsinterval in ms (min. `5000`). Moet korter zijn dan 60 s om betrouwbaar binnen de overeenkomende cron-minuut te vallen. |

### SQLite-hotback-up

Voor een back-up zonder downtime van een actieve database:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".backup /backups/omniroute-hot.db"
```

Dit gebruikt de online back-up-API van SQLite — veilig om uit te voeren terwijl OmniRoute actief is.

---

## Prestatieoptimalisatie

### WAL-modus

WAL is standaard ingeschakeld. Overweeg voor workloads met veel schrijfbewerkingen:

```sql
PRAGMA wal_autocheckpoint = 1000;  -- Checkpoint elke 1000 pagina's
PRAGMA journal_size_limit = 67108864;  -- WAL-limiet van 64 MB
```

### Indexen

Belangrijke indexen voor de prestaties (automatisch aangemaakt door migraties):

- `idx_models_provider` — modellen opzoeken op provider
- `idx_combo_targets_combo_id` — combo-doelen uitvouwen
- `idx_usage_history_api_key_timestamp` — gebruiksanalyses
- `idx_quota_snapshots_api_key_window` — quotumbewaking
- `idx_call_logs_timestamp` — query's op aanroeplogboeken

Maak een migratie om een nieuwe index toe te voegen:

```sql
-- 023_add_my_index.sql
CREATE INDEX IF NOT EXISTS idx_my_table_my_column ON my_table(my_column);
```

### Geheugentoewijzing voor I/O

Voor zeer grote databases (>10 GB) kan geheugentoewijzing worden aangepast via een SQLite-pragma:

```sql
-- Instellen via SQLite-pragma (aanpassen in core.ts of tijdens runtime)
PRAGMA mmap_size = 268435456;  -- 256 MB
```

### Compactie

Langdurig actieve OmniRoute-instanties hebben baat bij het af en toe uitvoeren van `VACUUM`:

```bash
sqlite3 ~/.omniroute/storage.sqlite "VACUUM;"
```

Voer dit maandelijks uit tijdens perioden met weinig verkeer. (De WAL-modus vermindert de noodzaak, maar neemt deze niet volledig weg.)

---

## Statuscontrole

`src/lib/db/healthCheck.ts` biedt **statusdiagnostiek op databaseniveau**:

Beide werkwoorden vereisen authenticatie (anders `401`). `GET` voert alleen diagnostiek uit; `POST` voert
dezelfde controle uit met `autoRepair` ingeschakeld.

```bash
GET  /api/db/health   # diagnose uitvoeren
POST /api/db/health   # diagnose uitvoeren + herstellen
```

Het antwoord is het door `runDbHealthCheck()` geproduceerde `DbHealthCheckResult`
(`src/lib/db/healthCheck.ts`):

```json
{
  "isHealthy": false,
  "issues": [
    {
      "type": "broken_reference",
      "table": "domain_budgets",
      "description": "Domeinbudgetten verwezen naar API-sleutels die niet meer bestaan.",
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

| Veld              | Betekenis                                                                                                                                                                                         |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `isHealthy`       | `true` wanneer `issues` leeg is. `driver` heeft hier nooit invloed op.                                                                                                                            |
| `issues[].type`   | Een van `integrity_check_failed`, `broken_reference`, `stale_snapshot`, `invalid_state`.                                                                                                          |
| `repairedCount`   | Rijen die tijdens deze uitvoering zijn hersteld; altijd `0` wanneer `autoRepair` false is.                                                                                                        |
| `backupCreated`   | Of er vóór het herstel een back-up is gemaakt.                                                                                                                                                    |
| `checkedAt`       | ISO-tijdstempel die wordt gedeeld door de uitvoering en elke herstelnotitie die daarbij wordt geschreven.                                                                                         |
| `driver.name`     | SQLite-stuurprogramma dat de gecontroleerde database bedient.                                                                                                                                     |
| `driver.degraded` | `true` wanneer schrijfbewerkingen niet duurzaam door het databasebestand worden ondersteund — de `sql.js` WASM-fallback (persistentie van het volledige bestand) of een database in het geheugen. |

Dezelfde payload wordt geretourneerd door de MCP-tool `omniroute_db_health_check`.

Voer `PRAGMA integrity_check` uit om beschadiging te detecteren:

```bash
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"
# Moet afdrukken: ok
```

Als dit iets anders dan `ok` retourneert, **stop dan onmiddellijk met het gebruik van de database** en herstel deze vanuit een back-up.

---

## Herstel na calamiteiten

### Scenario 1: WAL-bestand verloren

Het `-wal`-bestand ontbreekt, maar `-shm` en de hoofddatabase zijn intact:

```bash
# Wordt automatisch hersteld wanneer de database opnieuw wordt geopend
omniroute
```

Als SQLite niet automatisch kan herstellen:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".recover" > recovered.sql
sqlite3 recovered.db < recovered.sql
mv recovered.db ~/.omniroute/storage.sqlite
```

### Scenario 2: Hoofddatabasebestand beschadigd

Herstel vanuit een back-up:

```bash
omniroute sync pull --merge   # of: omniroute backup restore <backup-id>
```

### Scenario 3: Encryptiesleutel verloren

**Herstel is niet mogelijk** zonder de sleutel. De versleutelde velden zijn onleesbaar. Voeg alle providers handmatig opnieuw toe met nieuwe aanmeldgegevens.

> **Maatregel**: Maak altijd afzonderlijk een back-up van de encryptiesleutel, bij voorkeur in een wachtwoordmanager of KMS.

### Scenario 4: Schijf vol

SQLite retourneert `SQLITE_FULL`-fouten. Maak schijfruimte vrij en voer daarna het volgende uit:

```bash
# Maak een WAL-checkpoint om ruimte vrij te maken
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA wal_checkpoint(TRUNCATE);"
```

---

## Veelvoorkomende bewerkingen

### Een tabel inspecteren

```bash
sqlite3 ~/.omniroute/storage.sqlite "SELECT * FROM api_keys LIMIT 5;"
```

### Rijen in alle tabellen tellen

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';
EOF
```

### Alle gegevens opnieuw instellen (wissen)

```bash
# Stop OmniRoute eerst
omniroute stop

# Verwijder het databasebestand
rm ~/.omniroute/storage.sqlite*

# Start opnieuw (hierdoor wordt een lege database aangemaakt)
omniroute
```

Voor een **selectieve** reset (providers behouden, gebruiksgegevens wissen):

```bash
DELETE FROM usage_history WHERE timestamp < datetime('now', '-30 day');
DELETE FROM call_logs WHERE timestamp < datetime('now', '-30 day');
DELETE FROM proxy_logs WHERE timestamp < datetime('now', '-30 day');
```

### Eén tabel exporteren

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
.mode csv
.output api_keys.csv
SELECT * FROM api_keys;
EOF
```

---

## Probleemoplossing

### "Database is vergrendeld"

Een ander proces houdt een schrijfvergrendeling vast. U kunt:

- Wachten tot het andere proces klaar is (controleer met `lsof | grep storage.sqlite`)
- Het andere proces beëindigen
- OmniRoute opnieuw starten als het probleem aanhoudt

### "Beperking voor externe sleutel mislukt"

Een domeinmodule schendt de referentiële integriteit. Controleer op:

- Verweesde rijen in afhankelijke tabellen
- Trapsgewijze verwijderingen die niet zijn doorgevoerd
- Een recente migratie waarbij een externe sleutel is gewijzigd

Voer `PRAGMA foreign_key_check;` uit om schendingen te vinden.

### "Onvoldoende geheugen"

De geheugen-toegewezen I/O van SQLite overschrijdt de limiet van het besturingssysteem. Verlaag deze via een SQLite-pragma:

```sql
PRAGMA mmap_size = 134217728;  -- 128MB in plaats van 256MB
```

Of schakel deze uit:

```sql
PRAGMA mmap_size = 0;
```

### "Migratie halverwege mislukt"

De migratie is in een transactie uitgevoerd en zou dus moeten zijn teruggedraaid. Als dat niet is gebeurd:

1. **Stop OmniRoute** (voorkom verdere pogingen)
2. **Controleer de databasestatus** met `sqlite3`
3. **Herstel handmatig** de gedeeltelijke migratie
4. **Start OmniRoute opnieuw** (de migratie wordt opnieuw geprobeerd)

Test migraties altijd eerst op een kopie om dit te voorkomen.

---

## Zie ook

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — gebruikstabellen
- [MONITORING_GUIDE.md](./MONITORING_GUIDE.md) — statusbewaking
- [RELEASE_CHECKLIST.md](./RELEASE_CHECKLIST.md) — releaseproces
- Bron: `src/lib/db/` (meer dan 80 bestanden, circa 25K regels code)
