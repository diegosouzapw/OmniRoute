# Database Schema & Operations Guide (Filipino)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/DATABASE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/DATABASE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/DATABASE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/DATABASE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/DATABASE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/DATABASE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/DATABASE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/DATABASE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/DATABASE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/DATABASE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/DATABASE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/DATABASE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/DATABASE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/DATABASE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/DATABASE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/DATABASE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/DATABASE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/DATABASE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/DATABASE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/DATABASE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/DATABASE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/DATABASE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/DATABASE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/DATABASE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/DATABASE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/DATABASE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/DATABASE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/DATABASE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/DATABASE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/DATABASE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/DATABASE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/DATABASE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/DATABASE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/DATABASE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/DATABASE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/DATABASE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/DATABASE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/DATABASE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/DATABASE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/DATABASE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/DATABASE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/DATABASE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/DATABASE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/DATABASE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/DATABASE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/DATABASE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/DATABASE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/DATABASE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/DATABASE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/DATABASE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/DATABASE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/DATABASE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/DATABASE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/DATABASE_GUIDE.md)

---

> **TL;DR**: Ginagamit ng OmniRoute ang **SQLite na may WAL journaling** bilang pangunahing imbakan nito, na may **AES-256-GCM** encryption at rest para sa mga sensitibong field. Tinatalakay ng gabay na ito ang schema, mga migration, backup/recovery, at mga operational runbook.

**Mga Source:**

- `src/lib/db/core.ts` — singleton + SCHEMA_SQL (17 batayang table)
- `src/lib/db/migrationRunner.ts` — mga migration na may bersyon
- `src/lib/db/migrations/` — 167 SQL file na may bersyon
- `src/lib/db/encryption.ts` — mga helper sa encryption
- `src/lib/db/backup.ts` — pag-export/pag-import ng backup
- `src/lib/db/healthCheck.ts` — mga diagnostic sa kalagayan

---

## Bakit SQLite?

Pinili ng OmniRoute ang SQLite sa halip na PostgreSQL/MySQL dahil sa ilang dahilan:

| Salik           | SQLite                                       | PostgreSQL                                           |
| --------------- | -------------------------------------------- | ---------------------------------------------------- |
| **Deployment**  | Naka-embed — walang hiwalay na server        | Nangangailangan ng pag-set up ng server              |
| **Encryption**  | Application-layer (AES-256-GCM)              | Built-in na TDE                                      |
| **Performance** | Mas mabilis para sa maliit/katamtamang load  | Mas mahusay para sa napakaraming sabayang pagsusulat |
| **Concurrency** | Pinapayagan ng WAL mode ang sabayang pagbasa | Buong MVCC                                           |
| **Backup**      | Pagkopya ng iisang file                      | `pg_dump` o filesystem snapshot                      |
| **Use case**    | Per-user na pag-install, naka-embed          | Multi-tenant na SaaS                                 |

Para sa mga **single-user, single-instance** na deployment (ang pangunahing use case ng OmniRoute), mas simple at mas mabilis ang SQLite.

### WAL Journaling

Binubuksan ng `core.ts` ang database gamit ang **WAL (Write-Ahead Logging) mode**:

```ts
// src/lib/db/core.ts
db.pragma("journal_mode = WAL");
db.pragma("busy_timeout = 2000");
db.pragma("synchronous = NORMAL");
db.pragma(`cache_size = -${DEFAULT_DATABASE_SETTINGS.optimization.cacheSize}`);
```

Pinapayagan ng WAL ang **sabayang pagbasa** habang nagsusulat — mahalaga ito para sa dashboard, na nagsasagawa ng mga query habang itinatala ang mga request.

Ang default na laki ng cache ay **65,536 KiB (64 MiB)**. Binibigyang-kahulugan ng SQLite ang negatibong
`cache_size` bilang tinatayang pinakamataas na limitasyon sa KiB at naglalaan ng mga page kapag kinakailangan.
Tumatanggap ang **Settings > System & Storage > Cache Size** ng mga integer value mula **1 hanggang
1,000,000 KiB**; kapag sine-save ang setting, inilalapat ito sa aktibong koneksyon sa database,
at ibinabalik ng OmniRoute ang naka-save na value sa startup.

---

## Lokasyon ng Database

Nakaimbak ang SQLite file sa:

| OS      | Path                                                                           |
| ------- | ------------------------------------------------------------------------------ |
| Linux   | `~/.omniroute/storage.sqlite`                                                  |
| macOS   | `~/.omniroute/storage.sqlite`                                                  |
| Windows | `%USERPROFILE%\.omniroute\storage.sqlite`                                      |
| Docker  | `/app/data/storage.sqlite` (maaaring i-configure sa pamamagitan ng `DATA_DIR`) |

Mga kasamang file:

- `storage.sqlite-wal` — write-ahead log
- `storage.sqlite-shm` — shared memory file
- `call_logs/` — mga artifact ng request payload (kung naka-enable)

**Palitan ang lokasyon:**

```bash
DATA_DIR=/custom/path omniroute
```

---

## Arkitektura ng Domain Module

Ang database ng OmniRoute ay may **110 top-level na TypeScript module** sa `src/lib/db/`. Ang bawat domain module ay:

- Namamahala sa isa o higit pang partikular na table
- Nag-e-export ng mga typed CRUD function
- Hindi kailanman direktang ginagamit ang mga table ng ibang module
- Gumagamit ng `getDbInstance()` mula sa `core.ts` upang ma-access ang DB

### Ang 110 Top-Level na DB Module

Ang OmniRoute ay may **110 top-level na TypeScript file** sa `src/lib/db/`. Nasa ibaba ang isang halimbawa ng mga pangunahing module; tingnan ang directory listing para sa kumpletong listahan:

| Module                  | Mga Table                                                      | Responsibilidad                                                              |
| ----------------------- | -------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| `providers.ts`          | `provider_connections`                                         | Pagpaparehistro at mga credential ng provider gamit ang OAuth/API key        |
| `models.ts`             | `key_value` (data ng model)                                    | Mga depinisyon, kakayahan, at pagpepresyo ng model                           |
| `combos.ts`             | `combos`                                                       | Mga config at pagkakasunod-sunod ng combo routing                            |
| `apiKeys.ts`            | `api_keys`                                                     | Lifecycle, mga scope, at pagsubaybay sa quota ng API key                     |
| `settings.ts`           | `key_value`, `api_keys`, `combos`                              | Configuration ng system at shared KV store                                   |
| `backup.ts`             | —                                                              | Mga operasyon sa pag-export/pag-import ng backup                             |
| `proxies.ts`            | `proxy_registry`, `proxy_assignments`, `provider_connections`  | Mga config ng proxy at routing rule                                          |
| `prompts.ts`            | `prompt_templates`                                             | Mga reusable na prompt template at versioning                                |
| `webhooks.ts`           | `webhooks`                                                     | Mga event-driven na webhook subscription at log                              |
| `detailedLogs.ts`       | `request_detail_logs`                                          | Audit logging kada request (opsyonal, mataas ang volume)                     |
| `domainState.ts`        | `domain_*` (5 table)                                           | Mga domain budget, circuit breaker, lockout, fallback chain, at cost history |
| `registeredKeys.ts`     | `registered_keys`, `account_key_limits`, `provider_key_limits` | Mga naka-whitelist na API key para sa MCP/A2A                                |
| `quotaSnapshots.ts`     | `quota_snapshots`                                              | Makasaysayang paggamit ng quota                                              |
| `modelComboMappings.ts` | `model_combo_mappings`                                         | Pagmamapa ng mga model sa mga default ng combo                               |
| `cliToolState.ts`       | `cli_tool_state`                                               | Persistent state na partikular sa CLI                                        |
| `encryption.ts`         | —                                                              | Mga helper para sa pag-encrypt/pag-decrypt ng mga field                      |
| `readCache.ts`          | —                                                              | In-memory cache para sa mga operasyong madalas magbasa                       |
| `secrets.ts`            | `key_value` (mga naka-encrypt na entry)                        | Naka-encrypt na imbakan ng secret                                            |
| `stateReset.ts`         | —                                                              | Pagbura/pag-reset ng DB state para sa testing                                |
| `contextHandoffs.ts`    | `context_handoffs`                                             | Session context para sa agent handoff                                        |
| `usage*.ts`             | `usage_history`, `call_logs`, `proxy_logs`                     | Pagsubaybay sa paggamit                                                      |
| `compression*.ts`       | `compression_settings`, `compression_combos`                   | Configuration ng compression                                                 |

### Mga Hangganan ng Module

Isang pangunahing tuntunin sa arkitektura: **hindi direktang ina-access ng mga module ang mga table ng isa't isa**. Upang magamit ang data ng ibang module, i-import ang function mula sa module na iyon.

```ts
// ❌ MALI: direktang SQL mula sa ibang module
db.prepare("SELECT * FROM provider_connections").all();

// ✅ TAMA: gamitin ang function ng providers module
import { listProviders } from "@/lib/db/providers";
const providers = await listProviders();
```

Ipinapatupad ang tuntuning ito sa pamamagitan ng code review — walang static check, ngunit minamarkahan ang mga paglabag.

---

## Batayang Schema (17 talahanayan)

Tinutukoy ng `core.ts` ang 17 batayang talahanayan sa `SCHEMA_SQL`. Ginagawa ang mga ito ng migration na `001_initial_schema.sql` at bumubuo sa pangunahing schema.

### Mga Pangunahing Talahanayan (ginawa sa paunang migration)

| Talahanayan                | Layunin                                   | Mga pangunahing column                                                  |
| -------------------------- | ----------------------------------------- | ----------------------------------------------------------------------- |
| `provider_connections`     | Mga kredensyal ng provider (naka-encrypt) | `id`, `provider`, `auth_type`, `api_key`, `is_active`                   |
| `provider_nodes`           | Impormasyon sa pagruruta ng provider node | `id`, `type`, `name`, `base_url`, `created_at`                          |
| `key_value`                | Pangkalahatang KV store                   | `namespace`, `key`, `value`                                             |
| `combos`                   | Mga depinisyon ng routing combo           | `id`, `name`, `data`, `sort_order`                                      |
| `api_keys`                 | Mga API key para sa gateway               | `id`, `name`, `key`, `machine_id`, `allowed_models`                     |
| `db_meta`                  | Metadata ng database                      | `key`, `value`                                                          |
| `usage_history`            | Mga talaan ng paggamit ng request         | `id`, `provider`, `model`, `tokens_input`, `tokens_output`, `timestamp` |
| `call_logs`                | Mga payload at tugon ng request           | `id`, `timestamp`, `status`, `model`, `provider`, `latency_ms`          |
| `proxy_logs`               | Mga log ng proxy request                  | `id`, `timestamp`, `proxy_type`, `status`, `provider`                   |
| `domain_fallback_chains`   | Mga chain ng modelo patungo sa provider   | `model`, `chain`                                                        |
| `domain_budgets`           | Mga badyet sa paggastos kada domain       | `api_key_id`, `daily_limit_usd`, `warning_threshold`, `reset_interval`  |
| `domain_budget_reset_logs` | Kasaysayan ng pag-reset ng badyet         | `id`, `api_key_id`, `reset_interval`, `previous_spend`, `reset_at`      |
| `domain_cost_history`      | Pagsubaybay sa gastos kada domain         | `id`, `api_key_id`, `cost`, `timestamp`                                 |
| `domain_lockout_state`     | Kalagayan ng rate limit ng domain         | `identifier`, `attempts`, `locked_until`                                |
| `domain_circuit_breakers`  | Kalagayan ng circuit breaker kada domain  | `name`, `state`, `failure_count`, `last_failure_time`                   |
| `semantic_cache`           | Cache ng tugon ng LLM                     | `id`, `signature`, `model`, `prompt_hash`, `response`                   |
| `quota_snapshots`          | Mga makasaysayang snapshot ng quota       | `id`, `provider`, `connection_id`, `window_key`, `remaining_percentage` |

### Mga Karagdagang Talahanayan (idinagdag ng mga sumunod na migration)

Nagdaragdag ang mga sumunod na migration ng mga talahanayang gaya ng:

- `cli_tool_state` (migration 011) — kalagayan ng CLI tool
- Mga talahanayang `mcp_*` — pag-audit ng MCP server
- Mga talahanayang `a2a_*` — kalagayan ng A2A task
- Mga talahanayang `usage_*` — pagsubaybay sa paggamit
- Mga talahanayang `plugin_*` — sistema ng plugin
- `skill_executions` — kasaysayan ng pagpapatupad ng skill
- Mga talahanayang `memory_*` — sistema ng memory
- Mga talahanayang `compression_*` — sistema ng compression
- Mga talahanayang `webhook_*` — log ng paghahatid ng webhook
- Mga talahanayang `acp_*` — Agent Client Protocol
- Mga talahanayang `oneproxy_*` — marketplace ng 1proxy
- `proxy_assignments` — mga binding ng saklaw ng proxy
- `detailed_call_artifacts` — metadata ng mga artifact ng call log
- `quota_alert_history` — pag-audit ng alerto sa quota
- `command_code_auth_sessions` — mga OAuth session ng Command Code

Ang buong listahan ng humigit-kumulang 30+ talahanayan ay nasa `src/lib/db/migrations/`.

---

## Mga Migrasyon

Gumagamit ang OmniRoute ng **mga migrasyong may bersyon at idempotent** sa `src/lib/db/migrations/`. Ang bawat migrasyon ay isang SQL file na pinangalanang `NNN_description.sql`.

### Pagpapangalan sa Migrasyon

```
001_initial_schema.sql
002_mcp_a2a_tables.sql
003_provider_node_custom_paths.sql
...
021_combo_call_log_targets.sql
```

### Paano Pinapatakbo ang Mga Migrasyon

Sa pagsisimula, ang `migrationRunner.ts` ay:

1. Gumagawa ng `_omniroute_migrations` table kung hindi pa ito umiiral
2. Nagsusuri kung aling mga migrasyon ang nailapat na
3. Inilalapat ang anumang bagong migrasyon ayon sa pagkakasunod-sunod, bawat isa sa loob ng isang transaksyon
4. Itinatala ang bawat inilapat na migrasyon kasama ang timestamp

```ts
// src/lib/db/migrationRunner.ts (pinasimple)
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

### Idempotency

Dapat ay **idempotent** ang mga migrasyon — ang pagpapatakbo sa mga ito nang dalawang beses ay hindi dapat magkaroon ng anumang epekto:

```sql
-- 004_proxy_registry.sql
CREATE TABLE IF NOT EXISTS proxy_registry (
  id TEXT PRIMARY KEY,
  host TEXT NOT NULL,
  port INTEGER NOT NULL,
  ...
);
```

Malayang gumamit ng mga clause na `IF NOT EXISTS`, `IF EXISTS`, at `OR IGNORE` / `OR REPLACE`.

### Pagdaragdag ng Bagong Migrasyon

1. **Tukuyin ang susunod na numero**: `ls src/lib/db/migrations/ | tail -1`
2. **Gawin ang file**: `NNN_my_change.sql`
3. **Gumamit ng ligtas na DDL**: `CREATE TABLE IF NOT EXISTS`, `ALTER TABLE ... ADD COLUMN`
4. **Maingat na mag-backfill ng data**: gamitin ang `UPDATE ... WHERE ...` upang mapangasiwaan ang mga umiiral na row
5. **Subukan sa isang kopya**: huwag kailanman magpatakbo ng mga hindi pa nasusubukang migrasyon sa production

Halimbawa:

```sql
-- 022_add_combo_priority.sql
ALTER TABLE combos ADD COLUMN priority INTEGER DEFAULT 100;
UPDATE combos SET priority = 100 WHERE priority IS NULL;
CREATE INDEX IF NOT EXISTS idx_combos_priority ON combos(priority);
```

> **Mahirap pangasiwaan ang mga pagbabagong hindi backward-compatible** (hal., pag-aalis ng mga column). HINDI sinusuportahan ng OmniRoute ang downgrade — kapag nailapat na ang isang migrasyon, permanente na ang pagbabago sa schema. Magplano nang naaayon.

---

## Encryption ng Nakaimbak na Data

Ang mga sensitibong field (mga API key, OAuth token, at connection string) ay ine-encrypt habang nakaimbak gamit ang **AES-256-GCM**.

### Paano Ito Gumagana

```ts
// src/lib/db/encryption.ts (pinasimple)
const key = deriveKeyFromPassphrase(passphrase, salt);
const iv = randomBytes(12);
const cipher = createCipheriv("aes-256-gcm", key, iv);
const encrypted = Buffer.concat([cipher.update(plaintext), cipher.final()]);
const authTag = cipher.getAuthTag();
return { encrypted, iv, authTag };
```

### Saan Ito Ginagamit

- `provider_connections.api_key` — ine-encrypt sa antas ng application
- `provider_connections.access_token`, `refresh_token`, `id_token` — ine-encrypt sa antas ng application
- Mga entry ng `key_value` na may `namespace = "secrets"` — ine-encrypt sa antas ng application
- `proxy_registry.auth` — ine-encrypt sa antas ng application (kung mayroon)

### Encryption Key

Ang encryption key ay kinukuha mula sa isang **passphrase** (itinakda sa pamamagitan ng `STORAGE_ENCRYPTION_KEY` env var) at isang **salt** (nakaimbak sa DB). Kinakailangan ang dalawang ito upang ma-decrypt ang data.

```bash
# Bumuo ng ligtas na passphrase
openssl rand -hex 32

# Itakda sa .env
STORAGE_ENCRYPTION_KEY=<your-key>
```

> **Kritikal**: Kapag nawala ang encryption key, mawawala rin ang access sa lahat ng naka-encrypt na data. **I-back up ang key nang hiwalay sa database**.

### Ano ang HINDI Naka-encrypt

Para sa performance, ang mga sumusunod ay iniimbak bilang plaintext:

- Mga display name ng provider
- Mga depinisyon ng model (pampubliko na)
- Mga routing rule
- Mga tala ng paggamit (walang PII)

---

## Mga Paalala sa Encryption (v3.8.16+)

Ginagamit ng OmniRoute ang **`migrateLegacyEncryptedString()`** upang malinaw na pangasiwaan ang dalawang encryption scheme:

- **Legacy** (bago ang v3.5.0): "encryption" na nakabatay sa XOR (hindi tunay na cryptography)
- **Kasalukuyan**: AES-256-GCM na may wastong IV at authentication tag

Tinutukoy ng migration helper ang legacy na format at muli itong ine-encrypt gamit ang bagong scheme sa unang pagbasa. Nangangahulugan itong maaari kang mag-upgrade ng lumang database nang hindi nawawala ang mga kredensyal.

---

## Cache sa Pagbasa

Para sa data na madalas basahin (mga model, provider, at setting), nagbibigay ang `readCache.ts` ng **in-memory cache**:

```ts
// Naka-cache sa pagsisimula, pinapawalang-bisa kapag nagsusulat
const providers = await getCachedProviders(); // Mabilis, nasa memory
const fresh = await listProviders(); // Mabagal, kumokonekta sa DB
```

| Naka-cache na entity   | Cache key      | TTL                  |
| ---------------------- | -------------- | -------------------- |
| `models`               | `models:v1`    | Hanggang sa pagsulat |
| `provider_connections` | `providers:v1` | Hanggang sa pagsulat |
| `settings`             | `settings:v1`  | Hanggang sa pagsulat |
| `combos`               | `combos:v1`    | Hanggang sa pagsulat |

Pinapawalang-bisa ang cache sa bawat pagsulat sa kaukulang table.

---

## Pag-backup at Pag-recover

### Manu-manong Backup

```bash
# Gamitin ang CLI upang gumawa ng lokal na backup
omniroute backup create --name pre-migration

# O sa pamamagitan ng API
curl -X PUT http://localhost:20128/api/db-backups \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

Kabilang sa backup file ang:

- Lahat ng DB table (na-serialize sa JSON)
- Mga artifact ng call log (naka-base64 encode, opsyonal)
- Mga setting + lihim (naka-encrypt)
- Configuration ng plugin

### Pag-restore

```bash
# Sa pamamagitan ng CLI
omniroute restore pre-migration

# Sa pamamagitan ng API
curl -X POST http://localhost:20128/api/db-backups/restore \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

> **Babala**: Io-overwrite ng pag-restore ang buong DB. Ihinto muna ang lahat ng client.

### Mga Awtomatikong Backup

```bash
# Paganahin ang mga awtomatikong pang-araw-araw na backup sa pamamagitan ng CLI
omniroute backup auto enable --cron "0 2 * * *" --retention 7
```

Isinasagawa ang iskedyul sa panig ng server ng isang background job na tumatakbo kada 30 segundo
(default) at sinusuri ang cron expression batay sa lokal na oras ng server.

| Variable                                    | Default | Paglalarawan                                                                                                                 |
| ------------------------------------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_BACKUP_SCHEDULE_JOB_INTERVAL_MS` | `30000` | Interval ng pagtakbo sa ms (min `5000`). Dapat mas maikli sa 60 s upang mapagkakatiwalaang tumapat sa katugmang cron minute. |

### Hot Backup ng SQLite

Para sa backup ng aktibong DB nang walang downtime:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".backup /backups/omniroute-hot.db"
```

Ginagamit nito ang online backup API ng SQLite — ligtas itong patakbuhin habang tumatakbo ang OmniRoute.

---

## Pag-tune ng Performance

### WAL Mode

Naka-enable ang WAL bilang default. Para sa mga workload na maraming pagsusulat, isaalang-alang ang:

```sql
PRAGMA wal_autocheckpoint = 1000;  -- Mag-checkpoint bawat 1000 page
PRAGMA journal_size_limit = 67108864;  -- 64MB na limitasyon ng WAL
```

### Mga Index

Mahahalagang index para sa performance (awtomatikong ginagawa ng mga migration):

- `idx_models_provider` — paghahanap ng modelo ayon sa provider
- `idx_combo_targets_combo_id` — pagpapalawak ng combo target
- `idx_usage_history_api_key_timestamp` — analytics ng paggamit
- `idx_quota_snapshots_api_key_window` — pagsubaybay sa quota
- `idx_call_logs_timestamp` — mga query sa call log

Para magdagdag ng bagong index, gumawa ng migration:

```sql
-- 023_add_my_index.sql
CREATE INDEX IF NOT EXISTS idx_my_table_my_column ON my_table(my_column);
```

### Memory-Mapped I/O

Para sa napakalalaking database (>10GB), maaaring isaayos ang memory mapping sa pamamagitan ng SQLite pragma:

```sql
-- Itakda sa pamamagitan ng SQLite pragma (isaayos sa core.ts o runtime)
PRAGMA mmap_size = 268435456;  -- 256MB
```

### Compaction

Nakikinabang ang matagal nang tumatakbong mga instance ng OmniRoute sa paminsan-minsang `VACUUM`:

```bash
sqlite3 ~/.omniroute/storage.sqlite "VACUUM;"
```

Patakbuhin buwan-buwan sa mga panahong mababa ang traffic. (Binabawasan ng WAL mode ang pangangailangan, ngunit hindi nito ganap na inaalis iyon.)

---

## Pagsusuri sa Kalusugan

Nagbibigay ang `src/lib/db/healthCheck.ts` ng **mga diagnostic sa kalusugan sa antas ng DB**:

Nangangailangan ng authentication ang parehong verb (`401` kung wala). Diagnosis lamang ang ginagawa ng `GET`; pinapatakbo ng `POST` ang
parehong pagsusuri nang naka-enable ang `autoRepair`.

```bash
GET  /api/db/health   # mag-diagnose
POST /api/db/health   # mag-diagnose + magkumpuni
```

Ang response ay ang `DbHealthCheckResult` na ginawa ng `runDbHealthCheck()`
(`src/lib/db/healthCheck.ts`):

```json
{
  "isHealthy": false,
  "issues": [
    {
      "type": "broken_reference",
      "table": "domain_budgets",
      "description": "Tumukoy ang mga badyet ng domain sa mga API key na hindi na umiiral.",
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

| Field             | Kahulugan                                                                                                                                                          |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `isHealthy`       | `true` kapag walang laman ang `issues`. Hindi ito kailanman naiimpluwensiyahan ng `driver`.                                                                        |
| `issues[].type`   | Isa sa `integrity_check_failed`, `broken_reference`, `stale_snapshot`, `invalid_state`.                                                                            |
| `repairedCount`   | Mga row na kinumpuni sa pagpapatakbong ito; palaging `0` kapag false ang `autoRepair`.                                                                             |
| `backupCreated`   | Kung gumawa ng backup bago magkumpuni.                                                                                                                             |
| `checkedAt`       | ISO timestamp na magkaparehong ginagamit ng pagpapatakbo at ng anumang repair note na isinusulat nito.                                                             |
| `driver.name`     | SQLite driver na nagsisilbi sa sinuring database.                                                                                                                  |
| `driver.degraded` | `true` kapag ang mga pagsusulat ay walang durable na suporta ng database file — ang `sql.js` WASM fallback (whole-file persistence) o isang in-memory na database. |

Ang parehong payload ay ibinabalik ng `omniroute_db_health_check` MCP tool.

Patakbuhin ang `PRAGMA integrity_check` upang matukoy ang corruption:

```bash
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"
# Dapat i-print: ok
```

Kung magbalik ito ng anuman maliban sa `ok`, **itigil kaagad ang paggamit sa database** at mag-restore mula sa backup.

---

## Pagbawi mula sa Sakuna

### Sitwasyon 1: Nawala ang WAL File

Nawawala ang `-wal` file ngunit buo pa ang `-shm` at pangunahing DB:

```bash
# Awtomatikong babawi sa susunod na pagbukas
omniroute
```

Kung hindi awtomatikong makabawi ang SQLite:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".recover" > recovered.sql
sqlite3 recovered.db < recovered.sql
mv recovered.db ~/.omniroute/storage.sqlite
```

### Sitwasyon 2: Nasira ang Pangunahing DB File

I-restore mula sa backup:

```bash
omniroute sync pull --merge   # o: omniroute backup restore <backup-id>
```

### Sitwasyon 3: Nawala ang Encryption Key

**Walang posibleng paraan ng pagbawi** kung wala ang key. Hindi mababasa ang mga naka-encrypt na field. Muling idagdag nang manu-mano ang lahat ng provider gamit ang mga bagong credential.

> **Pag-iwas**: Palaging i-back up nang hiwalay ang encryption key, mas mainam kung sa isang password manager o KMS.

### Sitwasyon 4: Puno ang Disk

Magbabalik ang SQLite ng mga error na `SQLITE_FULL`. Magbakante ng espasyo sa disk, pagkatapos ay:

```bash
# I-checkpoint ang WAL upang magbakante ng espasyo
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA wal_checkpoint(TRUNCATE);"
```

---

## Mga Karaniwang Operasyon

### Suriin ang Isang Table

```bash
sqlite3 ~/.omniroute/storage.sqlite "SELECT * FROM api_keys LIMIT 5;"
```

### Bilangin ang mga Row sa Lahat ng Table

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';
EOF
```

### I-reset (Burahin) ang Lahat ng Data

```bash
# Ihinto muna ang OmniRoute
omniroute stop

# Burahin ang DB file
rm ~/.omniroute/storage.sqlite*

# I-restart (muling gagawa ng walang-lamang DB)
omniroute
```

Para sa **piling** pag-reset (panatilihin ang mga provider, burahin ang usage):

```bash
DELETE FROM usage_history WHERE timestamp < datetime('now', '-30 day');
DELETE FROM call_logs WHERE timestamp < datetime('now', '-30 day');
DELETE FROM proxy_logs WHERE timestamp < datetime('now', '-30 day');
```

### I-export ang Isang Table

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
.mode csv
.output api_keys.csv
SELECT * FROM api_keys;
EOF
```

---

## Pag-troubleshoot

### "Naka-lock ang database"

May ibang process na may hawak ng write lock. Gawin ang alinman sa mga sumusunod:

- Hintaying matapos ang ibang process (suriin ang `lsof | grep storage.sqlite`)
- Patayin ang ibang process
- Kung nagpapatuloy ang problema, i-restart ang OmniRoute

### "Nabigo ang foreign key constraint"

May domain module na lumalabag sa referential integrity. Suriin ang:

- Mga orphaned row sa mga dependent table
- Mga cascading delete na hindi naipasa
- Kamakailang migration na nagbago ng foreign key

Patakbuhin ang `PRAGMA foreign_key_check;` upang mahanap ang mga paglabag.

### "Ubos na ang memory"

Lumalagpas sa limitasyon ng OS ang memory-mapped I/O ng SQLite. Bawasan ito sa pamamagitan ng SQLite pragma:

```sql
PRAGMA mmap_size = 134217728;  -- 128MB sa halip na 256MB
```

O i-disable ito:

```sql
PRAGMA mmap_size = 0;
```

### "Nabigo ang migration sa kalagitnaan"

Tumakbo ang migration sa loob ng isang transaction, kaya dapat ay nag-roll back ito. Kung hindi:

1. **Ihinto ang OmniRoute** (pigilan ang mga susunod pang pagtatangka)
2. **Suriin ang kalagayan ng DB** gamit ang `sqlite3`
3. **Manu-manong ayusin** ang bahagyang nakumpletong migration
4. **Muling patakbuhin** ang OmniRoute (muling susubukan ang migration)

Upang maiwasan ito, palaging subukan muna ang mga migration sa isang kopya.

---

## Tingnan Din

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — mga usage table
- [MONITORING_GUIDE.md](./MONITORING_GUIDE.md) — pagsubaybay sa kalagayan
- [RELEASE_CHECKLIST.md](./RELEASE_CHECKLIST.md) — daloy ng release
- Source: `src/lib/db/` (80+ file, ~25K LOC)
