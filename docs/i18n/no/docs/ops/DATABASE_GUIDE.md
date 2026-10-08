# Database Schema & Operations Guide (Norsk)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/DATABASE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/DATABASE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/DATABASE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/DATABASE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/DATABASE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/DATABASE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/DATABASE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/DATABASE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/DATABASE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/DATABASE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/DATABASE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/DATABASE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/DATABASE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/DATABASE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/DATABASE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/DATABASE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/DATABASE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/DATABASE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/DATABASE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/DATABASE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/DATABASE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/DATABASE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/DATABASE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/DATABASE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/DATABASE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/DATABASE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/DATABASE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/DATABASE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/DATABASE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/DATABASE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/DATABASE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/DATABASE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/DATABASE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/DATABASE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/DATABASE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/DATABASE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/DATABASE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/DATABASE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/DATABASE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/DATABASE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/DATABASE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/DATABASE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/DATABASE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/DATABASE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/DATABASE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/DATABASE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/DATABASE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/DATABASE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/DATABASE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/DATABASE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/DATABASE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/DATABASE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/DATABASE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/DATABASE_GUIDE.md)

---

> **Kort fortalt**: OmniRoute bruker **SQLite med WAL-journalføring** som sitt primære datalager, med **AES-256-GCM**-kryptering av sensitive felt ved lagring. Denne veiledningen dekker skjemaet, migreringer, sikkerhetskopiering/gjenoppretting og driftsprosedyrer.

**Kilder:**

- `src/lib/db/core.ts` — singleton-instans + SCHEMA_SQL (17 basistabeller)
- `src/lib/db/migrationRunner.ts` — versjonerte migreringer
- `src/lib/db/migrations/` — 167 versjonerte SQL-filer
- `src/lib/db/encryption.ts` — hjelpefunksjoner for kryptering
- `src/lib/db/backup.ts` — eksport/import av sikkerhetskopier
- `src/lib/db/healthCheck.ts` — helsediagnostikk

---

## Hvorfor SQLite?

OmniRoute valgte SQLite fremfor PostgreSQL/MySQL av flere grunner:

| Faktor                  | SQLite                                     | PostgreSQL                                    |
| ----------------------- | ------------------------------------------ | --------------------------------------------- |
| **Distribusjon**        | Innebygd — ingen separat server            | Krever serveroppsett                          |
| **Kryptering**          | Applikasjonslag (AES-256-GCM)              | Innebygd TDE                                  |
| **Ytelse**              | Raskere for små/mellomstore arbeidsmengder | Bedre for svært mange samtidige skrivinger    |
| **Samtidighet**         | WAL-modus tillater samtidige lesinger      | Full MVCC                                     |
| **Sikkerhetskopiering** | Kopiering av én enkelt fil                 | `pg_dump` eller øyeblikksbilde av filsystemet |
| **Bruksområde**         | Installasjon per bruker, innebygd          | SaaS med flere leietakere                     |

For distribusjoner med **én bruker og én instans** (det primære bruksområdet for OmniRoute) er SQLite enklere og raskere.

### WAL-journalføring

`core.ts` åpner databasen i **WAL-modus (Write-Ahead Logging)**:

```ts
// src/lib/db/core.ts
db.pragma("journal_mode = WAL");
db.pragma("busy_timeout = 2000");
db.pragma("synchronous = NORMAL");
db.pragma(`cache_size = -${DEFAULT_DATABASE_SETTINGS.optimization.cacheSize}`);
```

WAL tillater **samtidige lesinger** under skriving — noe som er viktig for kontrollpanelet, som utfører spørringer mens forespørsler registreres.

Standard bufferstørrelse er **65 536 KiB (64 MiB)**. SQLite tolker en negativ
`cache_size` som en omtrentlig øvre grense i KiB og tildeler sider etter behov.
**Innstillinger > System og lagring > Bufferstørrelse** godtar heltallsverdier fra **1 til
1 000 000 KiB**. Når innstillingen lagres, brukes den på den aktive databasetilkoblingen,
og OmniRoute gjenoppretter den lagrede verdien ved oppstart.

---

## Databaseplassering

SQLite-filen lagres på:

| Operativsystem | Bane                                                         |
| -------------- | ------------------------------------------------------------ |
| Linux          | `~/.omniroute/storage.sqlite`                                |
| macOS          | `~/.omniroute/storage.sqlite`                                |
| Windows        | `%USERPROFILE%\.omniroute\storage.sqlite`                    |
| Docker         | `/app/data/storage.sqlite` (kan konfigureres via `DATA_DIR`) |

Tilhørende filer:

- `storage.sqlite-wal` — logg for forhåndsskriving
- `storage.sqlite-shm` — delt minnefil
- `call_logs/` — artefakter for forespørselsnyttelaster (hvis aktivert)

**Overstyr plasseringen:**

```bash
DATA_DIR=/custom/path omniroute
```

---

## Arkitektur for domenemoduler

OmniRoutes database har **110 TypeScript-moduler på toppnivå** i `src/lib/db/`. Hver domenemodul:

- Eier én eller flere bestemte tabeller
- Eksporterer typede CRUD-funksjoner
- Bruker aldri tabellene til en annen modul
- Bruker `getDbInstance()` fra `core.ts` for å få tilgang til databasen

### De 110 databasemodulene på toppnivå

OmniRoute har **110 TypeScript-filer på toppnivå** i `src/lib/db/`. Nedenfor vises et utvalg av kjernemodulene. Se katalogoppføringen for hele listen:

| Modul                   | Tabeller                                                       | Ansvar                                                                         |
| ----------------------- | -------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| `providers.ts`          | `provider_connections`                                         | Registrering og legitimasjon for leverandører via OAuth/API-nøkkel             |
| `models.ts`             | `key_value` (modelldata)                                       | Modelldefinisjoner, funksjonalitet og prising                                  |
| `combos.ts`             | `combos`                                                       | Konfigurasjon og rekkefølge for kombinasjonsruting                             |
| `apiKeys.ts`            | `api_keys`                                                     | Livssyklus for API-nøkler, omfang og kvotesporing                              |
| `settings.ts`           | `key_value`, `api_keys`, `combos`                              | Systemkonfigurasjon og delt nøkkel/verdi-lager                                 |
| `backup.ts`             | —                                                              | Operasjoner for eksport og import av sikkerhetskopier                          |
| `proxies.ts`            | `proxy_registry`, `proxy_assignments`, `provider_connections`  | Proxy-konfigurasjoner og rutingsregler                                         |
| `prompts.ts`            | `prompt_templates`                                             | Gjenbrukbare ledetekstmaler og versjonering                                    |
| `webhooks.ts`           | `webhooks`                                                     | Hendelsesdrevne webhook-abonnementer og logger                                 |
| `detailedLogs.ts`       | `request_detail_logs`                                          | Revisjonslogging per forespørsel (valgfritt, stort volum)                      |
| `domainState.ts`        | `domain_*` (5 tabeller)                                        | Domenebudsjetter, kretsbrytere, sperringer, reservekjeder og kostnadshistorikk |
| `registeredKeys.ts`     | `registered_keys`, `account_key_limits`, `provider_key_limits` | Hvitelistede API-nøkler for MCP/A2A                                            |
| `quotaSnapshots.ts`     | `quota_snapshots`                                              | Historisk kvotebruk                                                            |
| `modelComboMappings.ts` | `model_combo_mappings`                                         | Tilordning av modeller til standardkombinasjoner                               |
| `cliToolState.ts`       | `cli_tool_state`                                               | Vedvarende CLI-spesifikk tilstand                                              |
| `encryption.ts`         | —                                                              | Hjelpefunksjoner for kryptering/dekryptering av felt                           |
| `readCache.ts`          | —                                                              | Hurtigbuffer i minnet for leseintensive operasjoner                            |
| `secrets.ts`            | `key_value` (krypterte oppføringer)                            | Kryptert lagring av hemmeligheter                                              |
| `stateReset.ts`         | —                                                              | Sletting/tilbakestilling av databasetilstand for testing                       |
| `contextHandoffs.ts`    | `context_handoffs`                                             | Øktkontekst for overlevering mellom agenter                                    |
| `usage*.ts`             | `usage_history`, `call_logs`, `proxy_logs`                     | Brukssporing                                                                   |
| `compression*.ts`       | `compression_settings`, `compression_combos`                   | Komprimeringskonfigurasjon                                                     |

### Modulgrenser

En grunnleggende arkitekturregel er: **Moduler får ikke direkte tilgang til hverandres tabeller**. For å arbeide med data fra en annen modul må du importere funksjonen fra den aktuelle modulen.

```ts
// ❌ FEIL: direkte SQL fra en annen modul
db.prepare("SELECT * FROM provider_connections").all();

// ✅ RIKTIG: bruk funksjonen fra providers-modulen
import { listProviders } from "@/lib/db/providers";
const providers = await listProviders();
```

Denne regelen håndheves gjennom kodegjennomgang — det finnes ingen statisk kontroll, men brudd blir påpekt.

---

## Grunnskjema (17 tabeller)

`core.ts` definerer de 17 grunntabellene i `SCHEMA_SQL`. Disse opprettes av migreringen `001_initial_schema.sql` og utgjør kjerneskjemaet.

### Kjernetabeller (opprettet i den innledende migreringen)

| Tabell                     | Formål                                        | Nøkkelkolonner                                                          |
| -------------------------- | --------------------------------------------- | ----------------------------------------------------------------------- |
| `provider_connections`     | Leverandørlegitimasjon (kryptert)             | `id`, `provider`, `auth_type`, `api_key`, `is_active`                   |
| `provider_nodes`           | Rutinginformasjon for leverandørnoder         | `id`, `type`, `name`, `base_url`, `created_at`                          |
| `key_value`                | Generelt nøkkel-verdi-lager                   | `namespace`, `key`, `value`                                             |
| `combos`                   | Definisjoner av rutingskombinasjoner          | `id`, `name`, `data`, `sort_order`                                      |
| `api_keys`                 | API-nøkler for gatewayen                      | `id`, `name`, `key`, `machine_id`, `allowed_models`                     |
| `db_meta`                  | Databasemetadata                              | `key`, `value`                                                          |
| `usage_history`            | Oppføringer over forespørselsbruk             | `id`, `provider`, `model`, `tokens_input`, `tokens_output`, `timestamp` |
| `call_logs`                | Forespørselsnyttelaster og svar               | `id`, `timestamp`, `status`, `model`, `provider`, `latency_ms`          |
| `proxy_logs`               | Logger for proxyforespørsler                  | `id`, `timestamp`, `proxy_type`, `status`, `provider`                   |
| `domain_fallback_chains`   | Kjeder fra modell til leverandør              | `model`, `chain`                                                        |
| `domain_budgets`           | Forbruksbudsjetter per domene                 | `api_key_id`, `daily_limit_usd`, `warning_threshold`, `reset_interval`  |
| `domain_budget_reset_logs` | Historikk over tilbakestilling av budsjett    | `id`, `api_key_id`, `reset_interval`, `previous_spend`, `reset_at`      |
| `domain_cost_history`      | Kostnadssporing per domene                    | `id`, `api_key_id`, `cost`, `timestamp`                                 |
| `domain_lockout_state`     | Tilstand for hastighetsbegrensning per domene | `identifier`, `attempts`, `locked_until`                                |
| `domain_circuit_breakers`  | Kretsbrytertilstand per domene                | `name`, `state`, `failure_count`, `last_failure_time`                   |
| `semantic_cache`           | Hurtigbuffer for LLM-svar                     | `id`, `signature`, `model`, `prompt_hash`, `response`                   |
| `quota_snapshots`          | Historiske kvoteøyeblikksbilder               | `id`, `provider`, `connection_id`, `window_key`, `remaining_percentage` |

### Ytterligere tabeller (lagt til av senere migreringer)

Senere migreringer legger til tabeller som:

- `cli_tool_state` (migrering 011) — tilstand for CLI-verktøy
- `mcp_*`-tabeller — revisjon av MCP-server
- `a2a_*`-tabeller — A2A-oppgavetilstand
- `usage_*`-tabeller — brukssporing
- `plugin_*`-tabeller — system for programtillegg
- `skill_executions` — historikk over ferdighetskjøringer
- `memory_*`-tabeller — minnesystem
- `compression_*`-tabeller — komprimeringssystem
- `webhook_*`-tabeller — leveringslogg for webhooks
- `acp_*`-tabeller — Agent Client Protocol
- `oneproxy_*`-tabeller — 1proxy-markedsplass
- `proxy_assignments` — proxytilordninger til virkeområder
- `detailed_call_artifacts` — metadata for kalloggartefakter
- `quota_alert_history` — revisjonshistorikk for kvotevarsler
- `command_code_auth_sessions` — OAuth-økter for Command Code

Den fullstendige listen over rundt 30+ tabeller finnes i `src/lib/db/migrations/`.

---

## Migreringer

OmniRoute bruker **versjonerte, idempotente migreringer** i `src/lib/db/migrations/`. Hver migrering er én SQL-fil med navnet `NNN_description.sql`.

### Navngivning av migreringer

```
001_initial_schema.sql
002_mcp_a2a_tables.sql
003_provider_node_custom_paths.sql
...
021_combo_call_log_targets.sql
```

### Slik kjøres migreringer

Ved oppstart gjør `migrationRunner.ts` følgende:

1. Oppretter tabellen `_omniroute_migrations` hvis den ikke finnes
2. Spør etter migreringer som allerede er utført
3. Utfører eventuelle nye migreringer i riktig rekkefølge, hver i en egen transaksjon
4. Registrerer hver utførte migrering med tidsstempel

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

Migreringer må være **idempotente** — å kjøre dem to ganger skal ikke ha noen ytterligere effekt:

```sql
-- 004_proxy_registry.sql
CREATE TABLE IF NOT EXISTS proxy_registry (
  id TEXT PRIMARY KEY,
  host TEXT NOT NULL,
  port INTEGER NOT NULL,
  ...
);
```

Bruk klausulene `IF NOT EXISTS`, `IF EXISTS` og `OR IGNORE` / `OR REPLACE` liberalt.

### Legge til en ny migrering

1. **Finn neste nummer**: `ls src/lib/db/migrations/ | tail -1`
2. **Opprett filen**: `NNN_my_change.sql`
3. **Bruk trygg DDL**: `CREATE TABLE IF NOT EXISTS`, `ALTER TABLE ... ADD COLUMN`
4. **Etterfyll data forsiktig**: bruk `UPDATE ... WHERE ...` for å håndtere eksisterende rader
5. **Test på en kopi**: kjør aldri utestede migreringer i produksjon

Eksempel:

```sql
-- 022_add_combo_priority.sql
ALTER TABLE combos ADD COLUMN priority INTEGER DEFAULT 100;
UPDATE combos SET priority = 100 WHERE priority IS NULL;
CREATE INDEX IF NOT EXISTS idx_combos_priority ON combos(priority);
```

> **Endringer som ikke er bakoverkompatible** (f.eks. sletting av kolonner), er kompliserte. OmniRoute støtter IKKE nedgradering — når en migrering først er utført, er skjemaendringen permanent. Planlegg deretter.

---

## Kryptering av lagrede data

Sensitive felt (API-nøkler, OAuth-tokener, tilkoblingsstrenger) krypteres ved lagring med **AES-256-GCM**.

### Slik fungerer det

```ts
// src/lib/db/encryption.ts (forenklet)
const key = deriveKeyFromPassphrase(passphrase, salt);
const iv = randomBytes(12);
const cipher = createCipheriv("aes-256-gcm", key, iv);
const encrypted = Buffer.concat([cipher.update(plaintext), cipher.final()]);
const authTag = cipher.getAuthTag();
return { encrypted, iv, authTag };
```

### Hvor det brukes

- `provider_connections.api_key` — kryptert på applikasjonsnivå
- `provider_connections.access_token`, `refresh_token`, `id_token` — kryptert på applikasjonsnivå
- `key_value`-oppføringer med `namespace = "secrets"` — kryptert på applikasjonsnivå
- `proxy_registry.auth` — kryptert på applikasjonsnivå (hvis angitt)

### Krypteringsnøkkel

Krypteringsnøkkelen utledes fra en **passfrase** (angitt via miljøvariabelen `STORAGE_ENCRYPTION_KEY`) og et **salt** (lagret i databasen). Begge kreves for å dekryptere data.

```bash
# Generer en sikker passfrase
openssl rand -hex 32

# Angi i .env
STORAGE_ENCRYPTION_KEY=<your-key>
```

> **Kritisk**: Hvis krypteringsnøkkelen går tapt, mister du tilgangen til alle krypterte data. **Sikkerhetskopier nøkkelen separat fra databasen**.

### Dette krypteres IKKE

Av ytelseshensyn lagres følgende i klartekst:

- Visningsnavn for leverandører
- Modelldefinisjoner (allerede offentlige)
- Rutingsregler
- Bruksoppføringer (ingen PII)

---

## Forbehold ved kryptering (v3.8.16+)

OmniRoute bruker **`migrateLegacyEncryptedString()`** for å håndtere to krypteringsmetoder sømløst:

- **Eldre** (før v3.5.0): XOR-basert «kryptering» (ikke ekte kryptografi)
- **Gjeldende**: AES-256-GCM med korrekt IV og autentiseringstagg

Migreringshjelperen oppdager det eldre formatet og krypterer på nytt med den nye metoden ved første lesing. Dette betyr at du kan oppgradere en gammel database uten å miste påloggingsopplysninger.

---

## Lesebuffer

For data som leses ofte (modeller, leverandører, innstillinger), tilbyr `readCache.ts` en **buffer i minnet**:

```ts
// Bufres ved oppstart, ugyldiggjøres ved skriving
const providers = await getCachedProviders(); // Raskt, i minnet
const fresh = await listProviders(); // Tregt, leser fra databasen
```

| Bufret entitet         | Buffernøkkel   | TTL               |
| ---------------------- | -------------- | ----------------- |
| `models`               | `models:v1`    | Frem til skriving |
| `provider_connections` | `providers:v1` | Frem til skriving |
| `settings`             | `settings:v1`  | Frem til skriving |
| `combos`               | `combos:v1`    | Frem til skriving |

Bufferen ugyldiggjøres ved hver skriving til den tilsvarende tabellen.

---

## Sikkerhetskopiering og gjenoppretting

### Manuell sikkerhetskopiering

```bash
# Bruk CLI-verktøyet til å opprette en lokal sikkerhetskopi
omniroute backup create --name pre-migration

# Eller via API-et
curl -X PUT http://localhost:20128/api/db-backups \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

Sikkerhetskopifilen inneholder:

- Alle databasetabeller (serialisert til JSON)
- Artefakter fra kallloggen (base64-kodet, valgfritt)
- Innstillinger + hemmeligheter (kryptert)
- Programtilleggskonfigurasjon

### Gjenoppretting

```bash
# Via CLI
omniroute restore pre-migration

# Via API-et
curl -X POST http://localhost:20128/api/db-backups/restore \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

> **Advarsel**: Gjenoppretting overskriver hele databasen. Stopp alle klienter først.

### Automatiserte sikkerhetskopier

```bash
# Aktiver automatiske daglige sikkerhetskopier via CLI-verktøyet
omniroute backup auto enable --cron "0 2 * * *" --retention 7
```

Tidsplanen kjøres på serversiden av en bakgrunnsjobb som kjører hvert 30. sekund
(standard) og evaluerer cron-uttrykket mot serverens lokale tid.

| Variabel                                    | Standardverdi | Beskrivelse                                                                                                             |
| ------------------------------------------- | ------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_BACKUP_SCHEDULE_JOB_INTERVAL_MS` | `30000`       | Intervall i ms (min. `5000`). Må være kortere enn 60 s for å treffe det samsvarende cron-minuttet på en pålitelig måte. |

### Aktiv SQLite-sikkerhetskopiering

For sikkerhetskopiering uten nedetid av en database som er i bruk:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".backup /backups/omniroute-hot.db"
```

Dette bruker SQLite sitt API for sikkerhetskopiering på nett — trygt å kjøre mens OmniRoute kjører.

---

## Ytelsesjustering

### WAL-modus

WAL er aktivert som standard. For arbeidsbelastninger med mange skriveoperasjoner bør du vurdere:

```sql
PRAGMA wal_autocheckpoint = 1000;  -- Kontrollpunkt hver 1000. side
PRAGMA journal_size_limit = 67108864;  -- WAL-grense på 64 MB
```

### Indekser

Viktige indekser for ytelse (opprettes automatisk av migreringer):

- `idx_models_provider` — modelloppslag etter leverandør
- `idx_combo_targets_combo_id` — utvidelse av kombinasjonsmål
- `idx_usage_history_api_key_timestamp` — bruksanalyse
- `idx_quota_snapshots_api_key_window` — kvotesporing
- `idx_call_logs_timestamp` — spørringer mot anropslogger

For å legge til en ny indeks oppretter du en migrering:

```sql
-- 023_add_my_index.sql
CREATE INDEX IF NOT EXISTS idx_my_table_my_column ON my_table(my_column);
```

### Minnetilordnet I/O

For svært store databaser (>10 GB) kan minnetilordning justeres via et SQLite-pragma:

```sql
-- Angi via SQLite-pragma (juster i core.ts eller ved kjøring)
PRAGMA mmap_size = 268435456;  -- 256 MB
```

### Komprimering

OmniRoute-forekomster som kjører over lang tid, har nytte av en `VACUUM` av og til:

```bash
sqlite3 ~/.omniroute/storage.sqlite "VACUUM;"
```

Kjør månedlig i perioder med lav trafikk. (WAL-modus reduserer behovet, men fjerner det ikke.)

---

## Tilstandskontroll

`src/lib/db/healthCheck.ts` tilbyr **tilstandsdiagnostikk på databasenivå**:

Begge verbene krever autentisering (`401` ellers). `GET` utfører bare diagnostikk; `POST` kjører den
samme kontrollen med `autoRepair` aktivert.

```bash
GET  /api/db/health   # utfør diagnostikk
POST /api/db/health   # utfør diagnostikk + reparasjon
```

Responsen er `DbHealthCheckResult` som produseres av `runDbHealthCheck()`
(`src/lib/db/healthCheck.ts`):

```json
{
  "isHealthy": false,
  "issues": [
    {
      "type": "broken_reference",
      "table": "domain_budgets",
      "description": "Domenebudsjetter refererte til API-nøkler som ikke lenger finnes.",
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

| Felt              | Betydning                                                                                                                                                        |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `isHealthy`       | `true` når `issues` er tom. `driver` påvirker aldri denne verdien.                                                                                               |
| `issues[].type`   | Én av `integrity_check_failed`, `broken_reference`, `stale_snapshot`, `invalid_state`.                                                                           |
| `repairedCount`   | Rader som ble reparert under denne kjøringen; alltid `0` når `autoRepair` er false.                                                                              |
| `backupCreated`   | Om det ble tatt en sikkerhetskopi før reparasjonen.                                                                                                              |
| `checkedAt`       | ISO-tidsstempel som deles av kjøringen og eventuelle reparasjonsmerknader den skriver.                                                                           |
| `driver.name`     | SQLite-driveren som betjener databasen som kontrolleres.                                                                                                         |
| `driver.degraded` | `true` når skriveoperasjoner ikke sikkerhetskopieres varig av databasefilen — `sql.js`-WASM-reserveløsningen (lagring av hele filen) eller en database i minnet. |

Den samme nyttelasten returneres av MCP-verktøyet `omniroute_db_health_check`.

Kjør `PRAGMA integrity_check` for å oppdage korrupsjon:

```bash
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"
# Skal skrive ut: ok
```

Hvis den returnerer noe annet enn `ok`, må du **umiddelbart slutte å bruke databasen** og gjenopprette fra en sikkerhetskopi.

---

## Katastrofegjenoppretting

### Scenario 1: WAL-filen er tapt

`-wal`-filen mangler, men `-shm` og hoveddatabasen er intakte:

```bash
# Gjenopprettes automatisk ved neste åpning
omniroute
```

Hvis SQLite ikke kan gjenopprette automatisk:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".recover" > recovered.sql
sqlite3 recovered.db < recovered.sql
mv recovered.db ~/.omniroute/storage.sqlite
```

### Scenario 2: Hoveddatabasefilen er skadet

Gjenopprett fra sikkerhetskopi:

```bash
omniroute sync pull --merge   # eller: omniroute backup restore <backup-id>
```

### Scenario 3: Krypteringsnøkkelen er tapt

**Ingen gjenoppretting er mulig** uten nøkkelen. De krypterte feltene er uleselige. Legg til alle leverandørene manuelt på nytt med ny påloggingsinformasjon.

> **Risikoreduserende tiltak**: Sikkerhetskopier alltid krypteringsnøkkelen separat, helst i en passordbehandler eller KMS.

### Scenario 4: Disken er full

SQLite returnerer `SQLITE_FULL`-feil. Frigjør diskplass, og kjør deretter:

```bash
# Opprett et kontrollpunkt for WAL for å frigjøre plass
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA wal_checkpoint(TRUNCATE);"
```

---

## Vanlige operasjoner

### Inspiser en tabell

```bash
sqlite3 ~/.omniroute/storage.sqlite "SELECT * FROM api_keys LIMIT 5;"
```

### Tell rader i alle tabeller

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';
EOF
```

### Tilbakestill (slett) alle data

```bash
# Stopp OmniRoute først
omniroute stop

# Slett databasefilen
rm ~/.omniroute/storage.sqlite*

# Start på nytt (oppretter en tom database på nytt)
omniroute
```

For en **selektiv** tilbakestilling (behold leverandører, slett bruksdata):

```bash
DELETE FROM usage_history WHERE timestamp < datetime('now', '-30 day');
DELETE FROM call_logs WHERE timestamp < datetime('now', '-30 day');
DELETE FROM proxy_logs WHERE timestamp < datetime('now', '-30 day');
```

### Eksporter én tabell

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
.mode csv
.output api_keys.csv
SELECT * FROM api_keys;
EOF
```

---

## Feilsøking

### "Databasen er låst"

En annen prosess holder en skrivelås. Du kan enten:

- Vente til den andre prosessen er ferdig (sjekk `lsof | grep storage.sqlite`)
- Avslutte den andre prosessen
- Starte OmniRoute på nytt hvis problemet vedvarer

### "Fremmednøkkelbegrensning mislyktes"

En domenemodul bryter referanseintegriteten. Sjekk:

- Foreldreløse rader i avhengige tabeller
- Kaskadeslettinger som ikke ble videreført
- Nylig migrering som endret en fremmednøkkel

Kjør `PRAGMA foreign_key_check;` for å finne brudd.

### "Ikke nok minne"

SQLites minnetilordnede I/O overskrider operativsystemets grense. Reduser den via et SQLite-pragma:

```sql
PRAGMA mmap_size = 134217728;  -- 128 MB i stedet for 256 MB
```

Eller deaktiver den:

```sql
PRAGMA mmap_size = 0;
```

### "Migreringen mislyktes underveis"

Migreringen kjørte i en transaksjon, så den skal ha blitt rullet tilbake. Hvis ikke:

1. **Stopp OmniRoute** (forhindre flere forsøk)
2. **Kontroller databasens tilstand** med `sqlite3`
3. **Rett opp den delvise migreringen manuelt**
4. **Kjør OmniRoute på nytt** (migreringen forsøkes på nytt)

For å forhindre dette bør du alltid teste migreringer på en kopi først.

---

## Se også

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — brukstabeller
- [MONITORING_GUIDE.md](./MONITORING_GUIDE.md) — tilstandsovervåking
- [RELEASE_CHECKLIST.md](./RELEASE_CHECKLIST.md) — utgivelsesflyt
- Kilde: `src/lib/db/` (80+ filer, ~25K kodelinjer)
