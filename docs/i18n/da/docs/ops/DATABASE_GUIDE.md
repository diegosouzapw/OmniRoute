# Database Schema & Operations Guide (Dansk)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/DATABASE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/DATABASE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/DATABASE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/DATABASE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/DATABASE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/DATABASE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/DATABASE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/DATABASE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/DATABASE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/DATABASE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/DATABASE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/DATABASE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/DATABASE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/DATABASE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/DATABASE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/DATABASE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/DATABASE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/DATABASE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/DATABASE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/DATABASE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/DATABASE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/DATABASE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/DATABASE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/DATABASE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/DATABASE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/DATABASE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/DATABASE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/DATABASE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/DATABASE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/DATABASE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/DATABASE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/DATABASE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/DATABASE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/DATABASE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/DATABASE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/DATABASE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/DATABASE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/DATABASE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/DATABASE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/DATABASE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/DATABASE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/DATABASE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/DATABASE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/DATABASE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/DATABASE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/DATABASE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/DATABASE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/DATABASE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/DATABASE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/DATABASE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/DATABASE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/DATABASE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/DATABASE_GUIDE.md)

---

> **Kort fortalt**: OmniRoute bruger **SQLite med WAL-journalføring** som sit primære datalager med **AES-256-GCM**-kryptering af følsomme felter i hvile. Denne vejledning dækker skemaet, migreringer, sikkerhedskopiering/gendannelse og driftsprocedurer.

**Kilder:**

- `src/lib/db/core.ts` — singleton + SCHEMA_SQL (17 basistabeller)
- `src/lib/db/migrationRunner.ts` — versionsstyrede migreringer
- `src/lib/db/migrations/` — 167 versionsstyrede SQL-filer
- `src/lib/db/encryption.ts` — hjælpefunktioner til kryptering
- `src/lib/db/backup.ts` — eksport/import af sikkerhedskopier
- `src/lib/db/healthCheck.ts` — tilstandsdiagnostik

---

## Hvorfor SQLite?

OmniRoute valgte SQLite frem for PostgreSQL/MySQL af flere årsager:

| Faktor                  | SQLite                                            | PostgreSQL                                     |
| ----------------------- | ------------------------------------------------- | ---------------------------------------------- |
| **Udrulning**           | Integreret — ingen separat server                 | Kræver serveropsætning                         |
| **Kryptering**          | Applikationslag (AES-256-GCM)                     | Indbygget TDE                                  |
| **Ydeevne**             | Hurtigere til små/mellemstore arbejdsbelastninger | Bedre til enorme mængder samtidige skrivninger |
| **Samtidighed**         | WAL-tilstand tillader samtidige læsninger         | Fuld MVCC                                      |
| **Sikkerhedskopiering** | Kopiering af én enkelt fil                        | `pg_dump` eller snapshot af filsystemet        |
| **Anvendelse**          | Installation pr. bruger, integreret               | SaaS med flere lejere                          |

Til udrulninger med **én bruger og én instans** (det primære anvendelsesscenarie for OmniRoute) er SQLite enklere og hurtigere.

### WAL-journalføring

`core.ts` åbner databasen i **WAL-tilstand (Write-Ahead Logging)**:

```ts
// src/lib/db/core.ts
db.pragma("journal_mode = WAL");
db.pragma("busy_timeout = 2000");
db.pragma("synchronous = NORMAL");
db.pragma(`cache_size = -${DEFAULT_DATABASE_SETTINGS.optimization.cacheSize}`);
```

WAL tillader **samtidige læsninger** under skrivninger — hvilket er vigtigt for kontrolpanelet, der udfører forespørgsler, mens anmodninger registreres.

Standardstørrelsen for cachen er **65.536 KiB (64 MiB)**. SQLite fortolker en negativ
`cache_size` som en omtrentlig øvre grænse i KiB og allokerer sider efter behov.
**Indstillinger > System og lager > Cachestørrelse** accepterer heltalsværdier fra **1 til
1.000.000 KiB**. Når indstillingen gemmes, anvendes den på den aktive databaseforbindelse,
og OmniRoute gendanner den gemte værdi ved opstart.

---

## Databaseplacering

SQLite-filen gemmes på:

| Operativsystem | Sti                                                          |
| -------------- | ------------------------------------------------------------ |
| Linux          | `~/.omniroute/storage.sqlite`                                |
| macOS          | `~/.omniroute/storage.sqlite`                                |
| Windows        | `%USERPROFILE%\.omniroute\storage.sqlite`                    |
| Docker         | `/app/data/storage.sqlite` (kan konfigureres via `DATA_DIR`) |

Tilhørende filer:

- `storage.sqlite-wal` — write-ahead-log
- `storage.sqlite-shm` — delt hukommelsesfil
- `call_logs/` — artefakter for anmodningsdata (hvis aktiveret)

**Tilsidesæt placeringen:**

```bash
DATA_DIR=/custom/path omniroute
```

---

## Domænemodularkitektur

OmniRoutes database har **110 TypeScript-moduler på topniveau** i `src/lib/db/`. Hvert domænemodul:

- Ejer en eller flere specifikke tabeller
- Eksporterer typede CRUD-funktioner
- Tilgår aldrig et andet moduls tabeller
- Bruger `getDbInstance()` fra `core.ts` til at tilgå databasen

### De 110 databasemoduler på topniveau

OmniRoute har **110 TypeScript-filer på topniveau** i `src/lib/db/`. Nedenfor ses et udvalg af kernemodulerne; se mappeoversigten for den komplette liste:

| Modul                   | Tabeller                                                       | Ansvar                                                                      |
| ----------------------- | -------------------------------------------------------------- | --------------------------------------------------------------------------- |
| `providers.ts`          | `provider_connections`                                         | Registrering af udbydere og legitimationsoplysninger via OAuth/API-nøgle    |
| `models.ts`             | `key_value` (modeldata)                                        | Modeldefinitioner, funktioner og priser                                     |
| `combos.ts`             | `combos`                                                       | Konfiguration og rækkefølge for combo-routing                               |
| `apiKeys.ts`            | `api_keys`                                                     | API-nøglers livscyklus, scopes og kvotesporing                              |
| `settings.ts`           | `key_value`, `api_keys`, `combos`                              | Systemkonfiguration og delt KV-lager                                        |
| `backup.ts`             | —                                                              | Eksport- og importhandlinger for sikkerhedskopier                           |
| `proxies.ts`            | `proxy_registry`, `proxy_assignments`, `provider_connections`  | Proxykonfigurationer og routingregler                                       |
| `prompts.ts`            | `prompt_templates`                                             | Genanvendelige promptskabeloner og versionering                             |
| `webhooks.ts`           | `webhooks`                                                     | Hændelsesdrevne webhookabonnementer og logfiler                             |
| `detailedLogs.ts`       | `request_detail_logs`                                          | Revisionslogning pr. anmodning (valgfrit, stor datamængde)                  |
| `domainState.ts`        | `domain_*` (5 tabeller)                                        | Domænebudgetter, circuit breakers, spærringer, fallback-kæder, prishistorik |
| `registeredKeys.ts`     | `registered_keys`, `account_key_limits`, `provider_key_limits` | Godkendte API-nøgler til MCP/A2A                                            |
| `quotaSnapshots.ts`     | `quota_snapshots`                                              | Historisk kvoteforbrug                                                      |
| `modelComboMappings.ts` | `model_combo_mappings`                                         | Knyt modeller til standard-combos                                           |
| `cliToolState.ts`       | `cli_tool_state`                                               | Vedvarende CLI-specifik tilstand                                            |
| `encryption.ts`         | —                                                              | Hjælpefunktioner til kryptering/dekryptering af felter                      |
| `readCache.ts`          | —                                                              | Cache i hukommelsen til læseintensive handlinger                            |
| `secrets.ts`            | `key_value` (krypterede poster)                                | Krypteret lagring af hemmeligheder                                          |
| `stateReset.ts`         | —                                                              | Ryd/nulstil databasetilstanden til test                                     |
| `contextHandoffs.ts`    | `context_handoffs`                                             | Sessionskontekst til overdragelse mellem agenter                            |
| `usage*.ts`             | `usage_history`, `call_logs`, `proxy_logs`                     | Forbrugssporing                                                             |
| `compression*.ts`       | `compression_settings`, `compression_combos`                   | Komprimeringskonfiguration                                                  |

### Modulgrænser

En central arkitekturregel er: **Moduler tilgår ikke hinandens tabeller direkte**. For at arbejde med data fra et andet modul skal funktionen importeres fra det pågældende modul.

```ts
// ❌ FORKERT: direkte SQL fra et andet modul
db.prepare("SELECT * FROM provider_connections").all();

// ✅ RIGTIGT: brug funktionen fra providers-modulet
import { listProviders } from "@/lib/db/providers";
const providers = await listProviders();
```

Denne regel håndhæves gennem kodegennemgang — der er ingen statisk kontrol, men overtrædelser markeres.

---

## Basisskema (17 tabeller)

`core.ts` definerer de 17 basistabeller i `SCHEMA_SQL`. Disse oprettes af migreringen `001_initial_schema.sql` og udgør kerneskemaet.

### Kernetabeller (oprettet i den indledende migrering)

| Tabel                      | Formål                                        | Nøglekolonner                                                           |
| -------------------------- | --------------------------------------------- | ----------------------------------------------------------------------- |
| `provider_connections`     | Udbyderlegitimationsoplysninger (krypterede)  | `id`, `provider`, `auth_type`, `api_key`, `is_active`                   |
| `provider_nodes`           | Oplysninger om routing af udbydernoder        | `id`, `type`, `name`, `base_url`, `created_at`                          |
| `key_value`                | Generelt KV-lager                             | `namespace`, `key`, `value`                                             |
| `combos`                   | Definitioner af routingkombinationer          | `id`, `name`, `data`, `sort_order`                                      |
| `api_keys`                 | API-nøgler til gatewayen                      | `id`, `name`, `key`, `machine_id`, `allowed_models`                     |
| `db_meta`                  | Databasemetadata                              | `key`, `value`                                                          |
| `usage_history`            | Registreringer af anmodningsforbrug           | `id`, `provider`, `model`, `tokens_input`, `tokens_output`, `timestamp` |
| `call_logs`                | Anmodningsdata og svar                        | `id`, `timestamp`, `status`, `model`, `provider`, `latency_ms`          |
| `proxy_logs`               | Logfiler for proxyanmodninger                 | `id`, `timestamp`, `proxy_type`, `status`, `provider`                   |
| `domain_fallback_chains`   | Model-til-udbyder-kæder                       | `model`, `chain`                                                        |
| `domain_budgets`           | Forbrugsbudgetter pr. domæne                  | `api_key_id`, `daily_limit_usd`, `warning_threshold`, `reset_interval`  |
| `domain_budget_reset_logs` | Historik over budgetnulstillinger             | `id`, `api_key_id`, `reset_interval`, `previous_spend`, `reset_at`      |
| `domain_cost_history`      | Omkostningssporing pr. domæne                 | `id`, `api_key_id`, `cost`, `timestamp`                                 |
| `domain_lockout_state`     | Tilstand for hastighedsbegrænsning pr. domæne | `identifier`, `attempts`, `locked_until`                                |
| `domain_circuit_breakers`  | Circuit breaker-tilstand pr. domæne           | `name`, `state`, `failure_count`, `last_failure_time`                   |
| `semantic_cache`           | Cache til LLM-svar                            | `id`, `signature`, `model`, `prompt_hash`, `response`                   |
| `quota_snapshots`          | Historiske kvoteøjebliksbilleder              | `id`, `provider`, `connection_id`, `window_key`, `remaining_percentage` |

### Yderligere tabeller (tilføjet af senere migreringer)

Efterfølgende migreringer tilføjer tabeller såsom:

- `cli_tool_state` (migrering 011) — tilstand for CLI-værktøj
- `mcp_*`-tabeller — revision af MCP-server
- `a2a_*`-tabeller — A2A-opgavetilstand
- `usage_*`-tabeller — forbrugssporing
- `plugin_*`-tabeller — pluginsystem
- `skill_executions` — historik over færdighedskørsler
- `memory_*`-tabeller — hukommelsessystem
- `compression_*`-tabeller — komprimeringssystem
- `webhook_*`-tabeller — log over webhook-leveringer
- `acp_*`-tabeller — Agent Client Protocol
- `oneproxy_*`-tabeller — 1proxy-markedsplads
- `proxy_assignments` — bindinger af proxyomfang
- `detailed_call_artifacts` — metadata for kaldslogartefakter
- `quota_alert_history` — revision af kvoteadvarsler
- `command_code_auth_sessions` — Command Code OAuth-sessioner

Den fulde liste med ca. 30+ tabeller findes i `src/lib/db/migrations/`.

---

## Migreringer

OmniRoute bruger **versionerede, idempotente migreringer** i `src/lib/db/migrations/`. Hver migrering er en enkelt SQL-fil med navnet `NNN_description.sql`.

### Navngivning af migreringer

```
001_initial_schema.sql
002_mcp_a2a_tables.sql
003_provider_node_custom_paths.sql
...
021_combo_call_log_targets.sql
```

### Sådan køres migreringer

Ved opstart gør `migrationRunner.ts` følgende:

1. Opretter tabellen `_omniroute_migrations`, hvis den ikke findes
2. Forespørger efter allerede anvendte migreringer
3. Anvender alle nye migreringer i rækkefølge, hver i en transaktion
4. Registrerer hver anvendt migrering med et tidsstempel

```ts
// src/lib/db/migrationRunner.ts (forenklet)
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

### Idempotens

Migreringer skal være **idempotente** — det bør ikke have nogen effekt at køre dem to gange:

```sql
-- 004_proxy_registry.sql
CREATE TABLE IF NOT EXISTS proxy_registry (
  id TEXT PRIMARY KEY,
  host TEXT NOT NULL,
  port INTEGER NOT NULL,
  ...
);
```

Brug klausulerne `IF NOT EXISTS`, `IF EXISTS` og `OR IGNORE` / `OR REPLACE` i vid udstrækning.

### Tilføjelse af en ny migrering

1. **Find det næste nummer**: `ls src/lib/db/migrations/ | tail -1`
2. **Opret filen**: `NNN_my_change.sql`
3. **Brug sikker DDL**: `CREATE TABLE IF NOT EXISTS`, `ALTER TABLE ... ADD COLUMN`
4. **Efterudfyld data omhyggeligt**: Brug `UPDATE ... WHERE ...` til at håndtere eksisterende rækker
5. **Test på en kopi**: Kør aldrig utestede migreringer i produktion

Eksempel:

```sql
-- 022_add_combo_priority.sql
ALTER TABLE combos ADD COLUMN priority INTEGER DEFAULT 100;
UPDATE combos SET priority = 100 WHERE priority IS NULL;
CREATE INDEX IF NOT EXISTS idx_combos_priority ON combos(priority);
```

> **Bagudinkompatible ændringer** (f.eks. fjernelse af kolonner) er vanskelige. OmniRoute understøtter IKKE nedgradering — når en migrering først er anvendt, er skemaændringen permanent. Planlæg derefter.

---

## Kryptering af lagrede data

Følsomme felter (API-nøgler, OAuth-tokens og forbindelsesstrenge) krypteres ved lagring med **AES-256-GCM**.

### Sådan fungerer det

```ts
// src/lib/db/encryption.ts (forenklet)
const key = deriveKeyFromPassphrase(passphrase, salt);
const iv = randomBytes(12);
const cipher = createCipheriv("aes-256-gcm", key, iv);
const encrypted = Buffer.concat([cipher.update(plaintext), cipher.final()]);
const authTag = cipher.getAuthTag();
return { encrypted, iv, authTag };
```

### Hvor det bruges

- `provider_connections.api_key` — krypteret på applikationsniveau
- `provider_connections.access_token`, `refresh_token`, `id_token` — krypteret på applikationsniveau
- `key_value`-poster med `namespace = "secrets"` — krypteret på applikationsniveau
- `proxy_registry.auth` — krypteret på applikationsniveau (hvis til stede)

### Krypteringsnøgle

Krypteringsnøglen afledes af en **adgangssætning** (angivet via miljøvariablen `STORAGE_ENCRYPTION_KEY`) og et **salt** (gemt i databasen). Begge er nødvendige for at dekryptere data.

```bash
# Generér en sikker adgangssætning
openssl rand -hex 32

# Angiv den i .env
STORAGE_ENCRYPTION_KEY=<din-nøgle>
```

> **Kritisk**: Hvis krypteringsnøglen mistes, mister du adgangen til alle krypterede data. **Sikkerhedskopiér nøglen separat fra databasen**.

### Hvad der IKKE krypteres

Af hensyn til ydeevnen gemmes følgende i klartekst:

- Udbyderes visningsnavne
- Modeldefinitioner (allerede offentlige)
- Routingregler
- Brugsregistreringer (ingen personhenførbare oplysninger)

---

## Forbehold ved kryptering (v3.8.16+)

OmniRoute bruger **`migrateLegacyEncryptedString()`** til transparent at håndtere to krypteringsmetoder:

- **Ældre** (før v3.5.0): XOR-baseret "kryptering" (ikke rigtig kryptografi)
- **Nuværende**: AES-256-GCM med korrekt IV og autentificeringstag

Migreringshjælperen registrerer det ældre format og genkrypterer med den nye metode ved første læsning. Det betyder, at du kan opgradere en gammel database uden at miste legitimationsoplysninger.

---

## Læsecache

For data, der læses ofte (modeller, udbydere, indstillinger), tilbyder `readCache.ts` en **cache i hukommelsen**:

```ts
// Cachelagres ved opstart og ugyldiggøres ved skrivning
const providers = await getCachedProviders(); // Hurtig, i hukommelsen
const fresh = await listProviders(); // Langsom, tilgår databasen
```

| Cachelagret entitet    | Cachenøgle     | TTL              |
| ---------------------- | -------------- | ---------------- |
| `models`               | `models:v1`    | Indtil skrivning |
| `provider_connections` | `providers:v1` | Indtil skrivning |
| `settings`             | `settings:v1`  | Indtil skrivning |
| `combos`               | `combos:v1`    | Indtil skrivning |

Cachen ugyldiggøres ved hver skrivning til den tilsvarende tabel.

---

## Sikkerhedskopiering og gendannelse

### Manuel sikkerhedskopiering

```bash
# Brug CLI'en til at oprette en lokal sikkerhedskopi
omniroute backup create --name pre-migration

# Eller via API'et
curl -X PUT http://localhost:20128/api/db-backups \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

Sikkerhedskopifilen indeholder:

- Alle databasetabeller (serialiseret til JSON)
- Kaldslogartefakter (base64-kodet, valgfrit)
- Indstillinger + hemmeligheder (krypteret)
- Plugin-konfiguration

### Gendannelse

```bash
# Via CLI
omniroute restore pre-migration

# Via API
curl -X POST http://localhost:20128/api/db-backups/restore \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

> **Advarsel**: Gendannelse overskriver hele databasen. Stop først alle klienter.

### Automatiske sikkerhedskopier

```bash
# Aktivér automatiske daglige sikkerhedskopier via CLI'en
omniroute backup auto enable --cron "0 2 * * *" --retention 7
```

Tidsplanen udføres på serversiden af et baggrundsjob, der kører hvert 30. sekund
(standard) og evaluerer cron-udtrykket i forhold til serverens lokale tid.

| Variabel                                    | Standard | Beskrivelse                                                                                                                  |
| ------------------------------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_BACKUP_SCHEDULE_JOB_INTERVAL_MS` | `30000`  | Kørselsinterval i ms (min. `5000`). Skal være kortere end 60 s for pålideligt at ramme det matchende minut i cron-udtrykket. |

### Aktiv SQLite-sikkerhedskopiering

Sådan sikkerhedskopieres en aktiv database uden nedetid:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".backup /backups/omniroute-hot.db"
```

Dette bruger SQLite's API til online-sikkerhedskopiering — det er sikkert at køre, mens OmniRoute kører.

---

## Ydeevneoptimering

### WAL-tilstand

WAL er aktiveret som standard. Ved arbejdsbelastninger med mange skrivninger bør du overveje:

```sql
PRAGMA wal_autocheckpoint = 1000;  -- Kontrolpunkt for hver 1000 sider
PRAGMA journal_size_limit = 67108864;  -- WAL-grænse på 64 MB
```

### Indekser

Vigtige indekser for ydeevnen (oprettes automatisk af migreringer):

- `idx_models_provider` — modelopslag efter udbyder
- `idx_combo_targets_combo_id` — udvidelse af kombinationsmål
- `idx_usage_history_api_key_timestamp` — brugsanalyse
- `idx_quota_snapshots_api_key_window` — kvotesporing
- `idx_call_logs_timestamp` — forespørgsler i kaldlogfiler

Opret en migrering for at tilføje et nyt indeks:

```sql
-- 023_add_my_index.sql
CREATE INDEX IF NOT EXISTS idx_my_table_my_column ON my_table(my_column);
```

### Hukommelseskortlagt I/O

For meget store databaser (>10 GB) kan hukommelseskortlægningen justeres via et SQLite-pragma:

```sql
-- Indstil via SQLite-pragma (juster i core.ts eller under kørsel)
PRAGMA mmap_size = 268435456;  -- 256 MB
```

### Komprimering

OmniRoute-instanser, der kører i længere tid, har gavn af lejlighedsvis `VACUUM`:

```bash
sqlite3 ~/.omniroute/storage.sqlite "VACUUM;"
```

Kør månedligt i perioder med lav trafik. (WAL-tilstand reducerer behovet, men eliminerer det ikke.)

---

## Sundhedskontrol

`src/lib/db/healthCheck.ts` leverer **sundhedsdiagnostik på databaseniveau**:

Begge verber kræver godkendelse (ellers `401`). `GET` foretager kun diagnosticering; `POST` kører den
samme kontrol med `autoRepair` aktiveret.

```bash
GET  /api/db/health   # diagnosticer
POST /api/db/health   # diagnosticer + reparer
```

Svaret er det `DbHealthCheckResult`, som produceres af `runDbHealthCheck()`
(`src/lib/db/healthCheck.ts`):

```json
{
  "isHealthy": false,
  "issues": [
    {
      "type": "broken_reference",
      "table": "domain_budgets",
      "description": "Domænebudgetter refererede til API-nøgler, som ikke længere findes.",
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

| Felt              | Betydning                                                                                                                                            |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `isHealthy`       | `true`, når `issues` er tom. `driver` påvirker den aldrig.                                                                                           |
| `issues[].type`   | En af `integrity_check_failed`, `broken_reference`, `stale_snapshot`, `invalid_state`.                                                               |
| `repairedCount`   | Rækker repareret under denne kørsel; altid `0`, når `autoRepair` er false.                                                                           |
| `backupCreated`   | Om der blev oprettet en sikkerhedskopi før reparationen.                                                                                             |
| `checkedAt`       | ISO-tidsstempel, der deles af kørslen og eventuelle reparationsnoter, som den skriver.                                                               |
| `driver.name`     | SQLite-driveren, der betjener den kontrollerede database.                                                                                            |
| `driver.degraded` | `true`, når skrivninger ikke gemmes varigt i databasefilen — `sql.js` WASM-reserveløsningen (lagring af hele filen) eller en database i hukommelsen. |

Den samme nyttelast returneres af MCP-værktøjet `omniroute_db_health_check`.

Kør `PRAGMA integrity_check` for at registrere beskadigelse:

```bash
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"
# Bør udskrive: ok
```

Hvis den returnerer andet end `ok`, skal du **øjeblikkeligt stoppe med at bruge databasen** og gendanne den fra en sikkerhedskopi.

---

## Katastrofegendannelse

### Scenarie 1: WAL-fil mistet

Filen `-wal` mangler, men `-shm` og hoveddatabasen er intakte:

```bash
# Gendannes automatisk ved næste åbning
omniroute
```

Hvis SQLite ikke kan gendanne automatisk:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".recover" > recovered.sql
sqlite3 recovered.db < recovered.sql
mv recovered.db ~/.omniroute/storage.sqlite
```

### Scenarie 2: Hoveddatabasefil beskadiget

Gendan fra en sikkerhedskopi:

```bash
omniroute sync pull --merge   # eller: omniroute backup restore <backup-id>
```

### Scenarie 3: Krypteringsnøgle mistet

**Gendannelse er ikke mulig** uden nøglen. De krypterede felter kan ikke læses. Tilføj alle udbydere manuelt igen med nye legitimationsoplysninger.

> **Afhjælpning**: Sikkerhedskopiér altid krypteringsnøglen separat, helst i en adgangskodeadministrator eller KMS.

### Scenarie 4: Disken er fuld

SQLite returnerer `SQLITE_FULL`-fejl. Frigør diskplads, og kør derefter:

```bash
# Opret et WAL-kontrolpunkt for at frigøre plads
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA wal_checkpoint(TRUNCATE);"
```

---

## Almindelige handlinger

### Undersøg en tabel

```bash
sqlite3 ~/.omniroute/storage.sqlite "SELECT * FROM api_keys LIMIT 5;"
```

### Tæl rækker i alle tabeller

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';
EOF
```

### Nulstil (slet) alle data

```bash
# Stop OmniRoute først
omniroute stop

# Slet databasefilen
rm ~/.omniroute/storage.sqlite*

# Genstart (opretter en ny, tom database)
omniroute
```

For en **selektiv** nulstilling (behold udbydere, slet brugsdata):

```bash
DELETE FROM usage_history WHERE timestamp < datetime('now', '-30 day');
DELETE FROM call_logs WHERE timestamp < datetime('now', '-30 day');
DELETE FROM proxy_logs WHERE timestamp < datetime('now', '-30 day');
```

### Eksportér en enkelt tabel

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
.mode csv
.output api_keys.csv
SELECT * FROM api_keys;
EOF
```

---

## Fejlfinding

### "Databasen er låst"

En anden proces holder en skrivelås. Du kan enten:

- Vente på, at den anden proces bliver færdig (kontrollér `lsof | grep storage.sqlite`)
- Afslutte den anden proces
- Genstarte OmniRoute, hvis problemet fortsætter

### "Begrænsning for fremmednøgle mislykkedes"

Et domænemodul overtræder den referentielle integritet. Kontrollér:

- Forældreløse rækker i afhængige tabeller
- Kaskadesletninger, som ikke blev videreført
- En nylig migrering, der ændrede en fremmednøgle

Kør `PRAGMA foreign_key_check;` for at finde overtrædelser.

### "Ikke nok hukommelse"

SQLite's hukommelseskortlagte I/O overskrider operativsystemets grænse. Reducer det via et SQLite-pragma:

```sql
PRAGMA mmap_size = 134217728;  -- 128 MB i stedet for 256 MB
```

Eller deaktiver det:

```sql
PRAGMA mmap_size = 0;
```

### "Migreringen mislykkedes undervejs"

Migreringen blev kørt i en transaktion, så den burde være blevet rullet tilbage. Hvis ikke:

1. **Stop OmniRoute** (forhindr yderligere forsøg)
2. **Kontrollér databasens tilstand** med `sqlite3`
3. **Ret den delvise migrering manuelt**
4. **Kør OmniRoute igen** (migreringen forsøges igen)

For at undgå dette skal migreringer altid testes på en kopi først.

---

## Se også

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — brugstabeller
- [MONITORING_GUIDE.md](./MONITORING_GUIDE.md) — tilstandsovervågning
- [RELEASE_CHECKLIST.md](./RELEASE_CHECKLIST.md) — udgivelsesforløb
- Kilde: `src/lib/db/` (80+ filer, ~25.000 kodelinjer)
