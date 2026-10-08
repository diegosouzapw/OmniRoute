# Database Schema & Operations Guide (Svenska)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/DATABASE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/DATABASE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/DATABASE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/DATABASE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/DATABASE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/DATABASE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/DATABASE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/DATABASE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/DATABASE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/DATABASE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/DATABASE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/DATABASE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/DATABASE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/DATABASE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/DATABASE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/DATABASE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/DATABASE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/DATABASE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/DATABASE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/DATABASE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/DATABASE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/DATABASE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/DATABASE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/DATABASE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/DATABASE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/DATABASE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/DATABASE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/DATABASE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/DATABASE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/DATABASE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/DATABASE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/DATABASE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/DATABASE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/DATABASE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/DATABASE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/DATABASE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/DATABASE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/DATABASE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/DATABASE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/DATABASE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/DATABASE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/DATABASE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/DATABASE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/DATABASE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/DATABASE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/DATABASE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/DATABASE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/DATABASE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/DATABASE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/DATABASE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/DATABASE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/DATABASE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/DATABASE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/DATABASE_GUIDE.md)

---

> **TL;DR**: OmniRoute använder **SQLite med WAL-journalföring** som sitt primära datalager, med **AES-256-GCM**-kryptering av känsliga fält i vila. Den här guiden beskriver schemat, migreringar, säkerhetskopiering/återställning och operativa körinstruktioner.

**Källor:**

- `src/lib/db/core.ts` — singleton + SCHEMA_SQL (17 bastabeller)
- `src/lib/db/migrationRunner.ts` — versionshanterade migreringar
- `src/lib/db/migrations/` — 167 versionshanterade SQL-filer
- `src/lib/db/encryption.ts` — hjälpfunktioner för kryptering
- `src/lib/db/backup.ts` — export/import av säkerhetskopior
- `src/lib/db/healthCheck.ts` — hälsodiagnostik

---

## Varför SQLite?

OmniRoute valde SQLite framför PostgreSQL/MySQL av flera skäl:

| Faktor                 | SQLite                                         | PostgreSQL                                      |
| ---------------------- | ---------------------------------------------- | ----------------------------------------------- |
| **Driftsättning**      | Inbäddad — ingen separat server                | Kräver serverkonfiguration                      |
| **Kryptering**         | Applikationslager (AES-256-GCM)                | Inbyggd TDE                                     |
| **Prestanda**          | Snabbare för små/medelstora arbetsbelastningar | Bättre för enorma mängder samtidiga skrivningar |
| **Samtidighet**        | WAL-läge tillåter samtidiga läsningar          | Fullständig MVCC                                |
| **Säkerhetskopiering** | Kopiering av en enda fil                       | `pg_dump` eller ögonblicksbild av filsystemet   |
| **Användningsfall**    | Installation per användare, inbäddad           | SaaS med flera klientorganisationer             |

För driftsättningar med **en användare och en instans** (det primära användningsfallet för OmniRoute) är SQLite enklare och snabbare.

### WAL-journalföring

`core.ts` öppnar databasen i **WAL-läge (Write-Ahead Logging)**:

```ts
// src/lib/db/core.ts
db.pragma("journal_mode = WAL");
db.pragma("busy_timeout = 2000");
db.pragma("synchronous = NORMAL");
db.pragma(`cache_size = -${DEFAULT_DATABASE_SETTINGS.optimization.cacheSize}`);
```

WAL möjliggör **samtidiga läsningar** under skrivningar — viktigt för instrumentpanelen, som kör frågor medan förfrågningar registreras.

Standardstorleken för cachen är **65 536 KiB (64 MiB)**. SQLite tolkar ett negativt
`cache_size` som en ungefärlig övre gräns i KiB och allokerar sidor efter behov.
**Inställningar > System och lagring > Cachestorlek** accepterar heltalsvärden från **1 till
1 000 000 KiB**. När inställningen sparas tillämpas den på den aktiva databasanslutningen,
och OmniRoute återställer det sparade värdet vid start.

---

## Databasens plats

SQLite-filen lagras på:

| OS      | Sökväg                                                       |
| ------- | ------------------------------------------------------------ |
| Linux   | `~/.omniroute/storage.sqlite`                                |
| macOS   | `~/.omniroute/storage.sqlite`                                |
| Windows | `%USERPROFILE%\.omniroute\storage.sqlite`                    |
| Docker  | `/app/data/storage.sqlite` (kan konfigureras via `DATA_DIR`) |

Tillhörande filer:

- `storage.sqlite-wal` — write-ahead-logg
- `storage.sqlite-shm` — fil för delat minne
- `call_logs/` — artefakter för förfrågningars nyttolaster (om aktiverat)

**Åsidosätt platsen:**

```bash
DATA_DIR=/custom/path omniroute
```

---

## Domänmodularkitektur

OmniRoutes databas har **110 TypeScript-moduler på toppnivå** i `src/lib/db/`. Varje domänmodul:

- Ansvarar för en eller flera specifika tabeller
- Exporterar typade CRUD-funktioner
- Ändrar aldrig tabeller som tillhör en annan modul
- Använder `getDbInstance()` från `core.ts` för att komma åt databasen

### De 110 databasmodulerna på toppnivå

OmniRoute har **110 TypeScript-filer på toppnivå** i `src/lib/db/`. Nedan visas ett urval av centrala moduler; se kataloglistningen för den fullständiga listan:

| Modul                   | Tabeller                                                       | Ansvarsområde                                                                   |
| ----------------------- | -------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| `providers.ts`          | `provider_connections`                                         | Registrering och autentiseringsuppgifter för leverantörer via OAuth/API-nycklar |
| `models.ts`             | `key_value` (modelldata)                                       | Modelldefinitioner, funktioner, prissättning                                    |
| `combos.ts`             | `combos`                                                       | Konfiguration och ordning för kombinationsroutning                              |
| `apiKeys.ts`            | `api_keys`                                                     | API-nycklars livscykel, behörighetsområden och kvotspårning                     |
| `settings.ts`           | `key_value`, `api_keys`, `combos`                              | Systemkonfiguration och delat KV-lager                                          |
| `backup.ts`             | —                                                              | Åtgärder för export/import av säkerhetskopior                                   |
| `proxies.ts`            | `proxy_registry`, `proxy_assignments`, `provider_connections`  | Proxykonfigurationer och routningsregler                                        |
| `prompts.ts`            | `prompt_templates`                                             | Återanvändbara promptmallar och versionshantering                               |
| `webhooks.ts`           | `webhooks`                                                     | Händelsedrivna webhookprenumerationer och loggar                                |
| `detailedLogs.ts`       | `request_detail_logs`                                          | Granskningsloggning per begäran (valfritt, stor volym)                          |
| `domainState.ts`        | `domain_*` (5 tabeller)                                        | Domänbudgetar, kretsbrytare, låsningar, reservkedjor och kostnadshistorik       |
| `registeredKeys.ts`     | `registered_keys`, `account_key_limits`, `provider_key_limits` | Vitlistade API-nycklar för MCP/A2A                                              |
| `quotaSnapshots.ts`     | `quota_snapshots`                                              | Historisk kvotanvändning                                                        |
| `modelComboMappings.ts` | `model_combo_mappings`                                         | Kopplar modeller till standardkombinationer                                     |
| `cliToolState.ts`       | `cli_tool_state`                                               | Beständigt tillstånd specifikt för CLI                                          |
| `encryption.ts`         | —                                                              | Hjälpfunktioner för kryptering/dekryptering av fält                             |
| `readCache.ts`          | —                                                              | Minnesbaserad cache för läsintensiva åtgärder                                   |
| `secrets.ts`            | `key_value` (krypterade poster)                                | Krypterad lagring av hemligheter                                                |
| `stateReset.ts`         | —                                                              | Rensning/återställning av databastillstånd för testning                         |
| `contextHandoffs.ts`    | `context_handoffs`                                             | Sessionskontext för agentöverlämning                                            |
| `usage*.ts`             | `usage_history`, `call_logs`, `proxy_logs`                     | Användningsspårning                                                             |
| `compression*.ts`       | `compression_settings`, `compression_combos`                   | Komprimeringskonfiguration                                                      |

### Modulgränser

En central arkitekturregel är: **moduler kommer inte åt varandras tabeller direkt**. För att arbeta med data från en annan modul ska funktionen från den modulen importeras.

```ts
// ❌ FEL: direkt SQL från en annan modul
db.prepare("SELECT * FROM provider_connections").all();

// ✅ RÄTT: använd funktionen från providers-modulen
import { listProviders } from "@/lib/db/providers";
const providers = await listProviders();
```

Den här regeln upprätthålls genom kodgranskning — det finns ingen statisk kontroll, men överträdelser flaggas.

---

## Basschema (17 tabeller)

`core.ts` definierar de 17 bastabellerna i `SCHEMA_SQL`. Dessa skapas av migreringen `001_initial_schema.sql` och utgör kärnschemat.

### Kärntabeller (skapade i den inledande migreringen)

| Tabell                     | Syfte                                   | Nyckelkolumner                                                          |
| -------------------------- | --------------------------------------- | ----------------------------------------------------------------------- |
| `provider_connections`     | Leverantörsuppgifter (krypterade)       | `id`, `provider`, `auth_type`, `api_key`, `is_active`                   |
| `provider_nodes`           | Routningsinformation för leverantörsnod | `id`, `type`, `name`, `base_url`, `created_at`                          |
| `key_value`                | Allmänt nyckel-värde-lager              | `namespace`, `key`, `value`                                             |
| `combos`                   | Definitioner av routningskombinationer  | `id`, `name`, `data`, `sort_order`                                      |
| `api_keys`                 | API-nycklar för gatewayen               | `id`, `name`, `key`, `machine_id`, `allowed_models`                     |
| `db_meta`                  | Databasmetadata                         | `key`, `value`                                                          |
| `usage_history`            | Poster över användning per begäran      | `id`, `provider`, `model`, `tokens_input`, `tokens_output`, `timestamp` |
| `call_logs`                | Begärans nyttolaster och svar           | `id`, `timestamp`, `status`, `model`, `provider`, `latency_ms`          |
| `proxy_logs`               | Loggar över proxybegäranden             | `id`, `timestamp`, `proxy_type`, `status`, `provider`                   |
| `domain_fallback_chains`   | Kedjor från modell till leverantör      | `model`, `chain`                                                        |
| `domain_budgets`           | Utgiftsbudgetar per domän               | `api_key_id`, `daily_limit_usd`, `warning_threshold`, `reset_interval`  |
| `domain_budget_reset_logs` | Historik över budgetåterställningar     | `id`, `api_key_id`, `reset_interval`, `previous_spend`, `reset_at`      |
| `domain_cost_history`      | Kostnadsspårning per domän              | `id`, `api_key_id`, `cost`, `timestamp`                                 |
| `domain_lockout_state`     | Domänens tillstånd för frekvensgränser  | `identifier`, `attempts`, `locked_until`                                |
| `domain_circuit_breakers`  | Kretsbrytartillstånd per domän          | `name`, `state`, `failure_count`, `last_failure_time`                   |
| `semantic_cache`           | Cache för LLM-svar                      | `id`, `signature`, `model`, `prompt_hash`, `response`                   |
| `quota_snapshots`          | Historiska ögonblicksbilder av kvoter   | `id`, `provider`, `connection_id`, `window_key`, `remaining_percentage` |

### Ytterligare tabeller (tillagda av senare migreringar)

Efterföljande migreringar lägger till tabeller som:

- `cli_tool_state` (migrering 011) — CLI-verktygets tillstånd
- `mcp_*`-tabeller — granskning av MCP-servrar
- `a2a_*`-tabeller — tillstånd för A2A-uppgifter
- `usage_*`-tabeller — användningsspårning
- `plugin_*`-tabeller — insticksmodulsystem
- `skill_executions` — historik över färdighetskörningar
- `memory_*`-tabeller — minnessystem
- `compression_*`-tabeller — komprimeringssystem
- `webhook_*`-tabeller — logg över webhook-leveranser
- `acp_*`-tabeller — Agent Client Protocol
- `oneproxy_*`-tabeller — 1proxy-marknadsplats
- `proxy_assignments` — bindningar för proxyomfattning
- `detailed_call_artifacts` — metadata för artefakter i anropsloggar
- `quota_alert_history` — granskning av kvotvarningar
- `command_code_auth_sessions` — OAuth-sessioner för Command Code

Den fullständiga listan med cirka 30+ tabeller finns i `src/lib/db/migrations/`.

---

## Migreringar

OmniRoute använder **versionshanterade, idempotenta migreringar** i `src/lib/db/migrations/`. Varje migrering är en enskild SQL-fil med namnet `NNN_description.sql`.

### Namngivning av migreringar

```
001_initial_schema.sql
002_mcp_a2a_tables.sql
003_provider_node_custom_paths.sql
...
021_combo_call_log_targets.sql
```

### Så körs migreringar

Vid uppstart gör `migrationRunner.ts` följande:

1. Skapar tabellen `_omniroute_migrations` om den inte finns
2. Hämtar redan tillämpade migreringar
3. Tillämpar eventuella nya migreringar i ordning, var och en i en transaktion
4. Registrerar varje tillämpad migrering med en tidsstämpel

```ts
// src/lib/db/migrationRunner.ts (förenklad)
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

Migreringar måste vara **idempotenta** — att köra dem två gånger ska inte ha någon effekt:

```sql
-- 004_proxy_registry.sql
CREATE TABLE IF NOT EXISTS proxy_registry (
  id TEXT PRIMARY KEY,
  host TEXT NOT NULL,
  port INTEGER NOT NULL,
  ...
);
```

Använd satserna `IF NOT EXISTS`, `IF EXISTS` och `OR IGNORE` / `OR REPLACE` frikostigt.

### Lägga till en ny migrering

1. **Identifiera nästa nummer**: `ls src/lib/db/migrations/ | tail -1`
2. **Skapa filen**: `NNN_my_change.sql`
3. **Använd säker DDL**: `CREATE TABLE IF NOT EXISTS`, `ALTER TABLE ... ADD COLUMN`
4. **Fyll i befintliga data varsamt**: använd `UPDATE ... WHERE ...` för att hantera befintliga rader
5. **Testa på en kopia**: kör aldrig otestade migreringar i produktion

Exempel:

```sql
-- 022_add_combo_priority.sql
ALTER TABLE combos ADD COLUMN priority INTEGER DEFAULT 100;
UPDATE combos SET priority = 100 WHERE priority IS NULL;
CREATE INDEX IF NOT EXISTS idx_combos_priority ON combos(priority);
```

> **Bakåtinkompatibla ändringar** (t.ex. att ta bort kolumner) är komplicerade. OmniRoute stöder INTE nedgradering — när en migrering väl har tillämpats är schemaändringen permanent. Planera därefter.

---

## Kryptering av lagrade data

Känsliga fält (API-nycklar, OAuth-token och anslutningssträngar) krypteras vid lagring med **AES-256-GCM**.

### Så fungerar det

```ts
// src/lib/db/encryption.ts (förenklad)
const key = deriveKeyFromPassphrase(passphrase, salt);
const iv = randomBytes(12);
const cipher = createCipheriv("aes-256-gcm", key, iv);
const encrypted = Buffer.concat([cipher.update(plaintext), cipher.final()]);
const authTag = cipher.getAuthTag();
return { encrypted, iv, authTag };
```

### Var det används

- `provider_connections.api_key` — krypteras på applikationsnivå
- `provider_connections.access_token`, `refresh_token`, `id_token` — krypteras på applikationsnivå
- `key_value`-poster med `namespace = "secrets"` — krypteras på applikationsnivå
- `proxy_registry.auth` — krypteras på applikationsnivå (om det finns)

### Krypteringsnyckel

Krypteringsnyckeln härleds från en **lösenfras** (anges via miljövariabeln `STORAGE_ENCRYPTION_KEY`) och ett **salt** (lagras i databasen). Båda krävs för att dekryptera data.

```bash
# Generera en säker lösenfras
openssl rand -hex 32

# Ange i .env
STORAGE_ENCRYPTION_KEY=<din-nyckel>
```

> **Kritiskt**: Om krypteringsnyckeln går förlorad förlorar du åtkomsten till alla krypterade data. **Säkerhetskopiera nyckeln separat från databasen**.

### Det här krypteras INTE

Av prestandaskäl lagras följande i klartext:

- Leverantörernas visningsnamn
- Modelldefinitioner (redan offentliga)
- Routningsregler
- Användningsposter (inga personuppgifter)

---

## Förbehåll för kryptering (v3.8.16+)

OmniRoute använder **`migrateLegacyEncryptedString()`** för att hantera två krypteringsmetoder transparent:

- **Äldre** (före v3.5.0): XOR-baserad ”kryptering” (inte riktig kryptografi)
- **Nuvarande**: AES-256-GCM med korrekt IV och autentiseringstagg

Migreringshjälparen identifierar det äldre formatet och krypterar om det med den nya metoden vid den första läsningen. Det innebär att du kan uppgradera en gammal databas utan att förlora autentiseringsuppgifter.

---

## Läscache

För data som läses ofta (modeller, leverantörer, inställningar) tillhandahåller `readCache.ts` en **minnesbaserad cache**:

```ts
// Cachad vid start, ogiltigförklaras vid skrivning
const providers = await getCachedProviders(); // Snabb, minnesbaserad
const fresh = await listProviders(); // Långsam, läser från databasen
```

| Cachad entitet         | Cachenyckel    | TTL                  |
| ---------------------- | -------------- | -------------------- |
| `models`               | `models:v1`    | Till nästa skrivning |
| `provider_connections` | `providers:v1` | Till nästa skrivning |
| `settings`             | `settings:v1`  | Till nästa skrivning |
| `combos`               | `combos:v1`    | Till nästa skrivning |

Cachen ogiltigförklaras vid varje skrivning till motsvarande tabell.

---

## Säkerhetskopiering och återställning

### Manuell säkerhetskopiering

```bash
# Använd CLI:t för att skapa en lokal säkerhetskopia
omniroute backup create --name pre-migration

# Eller via API:t
curl -X PUT http://localhost:20128/api/db-backups \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

Säkerhetskopian innehåller:

- Alla databastabeller (serialiserade till JSON)
- Artefakter från anropsloggen (base64-kodade, valfritt)
- Inställningar + hemligheter (krypterade)
- Plugin-konfiguration

### Återställning

```bash
# Via CLI:t
omniroute restore pre-migration

# Via API:t
curl -X POST http://localhost:20128/api/db-backups/restore \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

> **Varning**: En återställning skriver över hela databasen. Stoppa först alla klienter.

### Automatiska säkerhetskopieringar

```bash
# Aktivera automatiska dagliga säkerhetskopieringar via CLI:t
omniroute backup auto enable --cron "0 2 * * *" --retention 7
```

Schemat körs på serversidan av ett bakgrundsjobb som aktiveras var 30:e sekund
(standard) och utvärderar cron-uttrycket mot serverns lokala tid.

| Variabel                                    | Standardvärde | Beskrivning                                                                                                                  |
| ------------------------------------------- | ------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_BACKUP_SCHEDULE_JOB_INTERVAL_MS` | `30000`       | Aktiveringsintervall i ms (minst `5000`). Måste vara kortare än 60 s för att tillförlitligt hamna inom matchande cron-minut. |

### Aktiv SQLite-säkerhetskopiering

För säkerhetskopiering av en aktiv databas utan driftstopp:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".backup /backups/omniroute-hot.db"
```

Detta använder SQLite:s API för säkerhetskopiering online – säkert att köra medan OmniRoute är igång.

---

## Prestandajustering

### WAL-läge

WAL är aktiverat som standard. För arbetslaster med många skrivningar kan du överväga:

```sql
PRAGMA wal_autocheckpoint = 1000;  -- Kontrollpunkt var 1000:e sida
PRAGMA journal_size_limit = 67108864;  -- WAL-gräns på 64 MB
```

### Index

Viktiga index för prestanda (skapas automatiskt av migreringar):

- `idx_models_provider` — modellsökningar efter leverantör
- `idx_combo_targets_combo_id` — expansion av kombinationsmål
- `idx_usage_history_api_key_timestamp` — användningsanalys
- `idx_quota_snapshots_api_key_window` — kvotspårning
- `idx_call_logs_timestamp` — frågor mot anropsloggen

Skapa en migrering för att lägga till ett nytt index:

```sql
-- 023_add_my_index.sql
CREATE INDEX IF NOT EXISTS idx_my_table_my_column ON my_table(my_column);
```

### Minnesmappad I/O

För mycket stora databaser (>10 GB) kan minnesmappningen justeras via ett SQLite-pragma:

```sql
-- Ange via SQLite-pragma (justera i core.ts eller vid körning)
PRAGMA mmap_size = 268435456;  -- 256 MB
```

### Komprimering

OmniRoute-instanser som körs under lång tid har nytta av att `VACUUM` körs ibland:

```bash
sqlite3 ~/.omniroute/storage.sqlite "VACUUM;"
```

Kör detta varje månad under perioder med låg trafik. (WAL-läget minskar behovet, men eliminerar det inte.)

---

## Hälsokontroll

`src/lib/db/healthCheck.ts` tillhandahåller **hälsodiagnostik på databasnivå**:

Båda metoderna kräver autentisering (`401` annars). `GET` utför endast diagnostik; `POST` kör samma kontroll med `autoRepair` aktiverat.

```bash
GET  /api/db/health   # diagnostisera
POST /api/db/health   # diagnostisera + reparera
```

Svaret är det `DbHealthCheckResult` som genereras av `runDbHealthCheck()`
(`src/lib/db/healthCheck.ts`):

```json
{
  "isHealthy": false,
  "issues": [
    {
      "type": "broken_reference",
      "table": "domain_budgets",
      "description": "Domänbudgetar refererade till API-nycklar som inte längre finns.",
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

| Fält              | Betydelse                                                                                                                                                       |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `isHealthy`       | `true` när `issues` är tom. `driver` påverkar aldrig värdet.                                                                                                    |
| `issues[].type`   | Ett av `integrity_check_failed`, `broken_reference`, `stale_snapshot`, `invalid_state`.                                                                         |
| `repairedCount`   | Rader som reparerades under denna körning; alltid `0` när `autoRepair` är false.                                                                                |
| `backupCreated`   | Anger om en säkerhetskopia skapades före reparationen.                                                                                                          |
| `checkedAt`       | ISO-tidsstämpel som delas av körningen och eventuell reparationsanteckning som skrivs.                                                                          |
| `driver.name`     | SQLite-drivrutinen som hanterar den kontrollerade databasen.                                                                                                    |
| `driver.degraded` | `true` när skrivningar inte lagras beständigt i databasfilen — WASM-reservlösningen `sql.js` (beständig lagring av hela filen) eller en databas i arbetsminnet. |

Samma nyttolast returneras av MCP-verktyget `omniroute_db_health_check`.

Kör `PRAGMA integrity_check` för att upptäcka skador:

```bash
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"
# Bör skriva ut: ok
```

Om något annat än `ok` returneras ska du **omedelbart sluta använda databasen** och återställa från en säkerhetskopia.

---

## Katastrofåterställning

### Scenario 1: WAL-filen har gått förlorad

Filen `-wal` saknas, men `-shm` och huvuddatabasen är intakta:

```bash
# Återställs automatiskt nästa gång programmet öppnas
omniroute
```

Om SQLite inte kan återställa automatiskt:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".recover" > recovered.sql
sqlite3 recovered.db < recovered.sql
mv recovered.db ~/.omniroute/storage.sqlite
```

### Scenario 2: Huvuddatabasfilen är skadad

Återställ från en säkerhetskopia:

```bash
omniroute sync pull --merge   # eller: omniroute backup restore <backup-id>
```

### Scenario 3: Krypteringsnyckeln har gått förlorad

**Ingen återställning är möjlig** utan nyckeln. De krypterade fälten är oläsbara. Lägg till alla leverantörer manuellt igen med nya autentiseringsuppgifter.

> **Riskreducering**: Säkerhetskopiera alltid krypteringsnyckeln separat, helst i en lösenordshanterare eller KMS.

### Scenario 4: Disken är full

SQLite returnerar `SQLITE_FULL`-fel. Frigör diskutrymme och kör sedan:

```bash
# Skapa en kontrollpunkt för WAL för att frigöra utrymme
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA wal_checkpoint(TRUNCATE);"
```

---

## Vanliga åtgärder

### Inspektera en tabell

```bash
sqlite3 ~/.omniroute/storage.sqlite "SELECT * FROM api_keys LIMIT 5;"
```

### Räkna rader i alla tabeller

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';
EOF
```

### Återställ (radera) alla data

```bash
# Stoppa OmniRoute först
omniroute stop

# Ta bort databasfilen
rm ~/.omniroute/storage.sqlite*

# Starta om (en tom databas skapas på nytt)
omniroute
```

För en **selektiv** återställning (behåll leverantörer, radera användningsdata):

```bash
DELETE FROM usage_history WHERE timestamp < datetime('now', '-30 day');
DELETE FROM call_logs WHERE timestamp < datetime('now', '-30 day');
DELETE FROM proxy_logs WHERE timestamp < datetime('now', '-30 day');
```

### Exportera en enskild tabell

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
.mode csv
.output api_keys.csv
SELECT * FROM api_keys;
EOF
```

---

## Felsökning

### "Databasen är låst"

En annan process håller ett skrivlås. Gör något av följande:

- Vänta tills den andra processen är klar (kontrollera med `lsof | grep storage.sqlite`)
- Avsluta den andra processen
- Starta om OmniRoute om problemet kvarstår

### "Begränsning för främmande nyckel misslyckades"

En domänmodul bryter mot referensintegriteten. Kontrollera:

- Föräldralösa rader i beroende tabeller
- Kaskaderande borttagningar som inte har spridits
- En nyligen genomförd migrering som ändrade en främmande nyckel

Kör `PRAGMA foreign_key_check;` för att hitta överträdelser.

### "Slut på minne"

SQLite:s minnesmappade I/O överskrider operativsystemets gräns. Minska värdet via ett SQLite-pragma:

```sql
PRAGMA mmap_size = 134217728;  -- 128 MB i stället för 256 MB
```

Eller inaktivera det:

```sql
PRAGMA mmap_size = 0;
```

### "Migreringen misslyckades halvvägs"

Migreringen kördes i en transaktion och bör därför ha återställts. Om inte:

1. **Stoppa OmniRoute** (förhindra ytterligare försök)
2. **Kontrollera databasens tillstånd** med `sqlite3`
3. **Korrigera manuellt** den ofullständiga migreringen
4. **Kör OmniRoute igen** (migreringen försöks på nytt)

För att förhindra detta bör du alltid testa migreringar på en kopia först.

---

## Se även

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — användningstabeller
- [MONITORING_GUIDE.md](./MONITORING_GUIDE.md) — hälsoövervakning
- [RELEASE_CHECKLIST.md](./RELEASE_CHECKLIST.md) — utgivningsflöde
- Källa: `src/lib/db/` (över 80 filer, cirka 25 000 kodrader)
