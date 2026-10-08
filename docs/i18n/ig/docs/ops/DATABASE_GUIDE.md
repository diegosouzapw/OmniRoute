# Database Schema & Operations Guide (Igbo)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/DATABASE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/DATABASE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/DATABASE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/DATABASE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/DATABASE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/DATABASE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/DATABASE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/DATABASE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/DATABASE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/DATABASE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/DATABASE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/DATABASE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/DATABASE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/DATABASE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/DATABASE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/DATABASE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/DATABASE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/DATABASE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/DATABASE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/DATABASE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/DATABASE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/DATABASE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/DATABASE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/DATABASE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/DATABASE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/DATABASE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/DATABASE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/DATABASE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/DATABASE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/DATABASE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/DATABASE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/DATABASE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/DATABASE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/DATABASE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/DATABASE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/DATABASE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/DATABASE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/DATABASE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/DATABASE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/DATABASE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/DATABASE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/DATABASE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/DATABASE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/DATABASE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/DATABASE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/DATABASE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/DATABASE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/DATABASE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/DATABASE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/DATABASE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/DATABASE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/DATABASE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/DATABASE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/DATABASE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/DATABASE_GUIDE.md)

---

> **Na nkenke**: OmniRoute na-eji **SQLite nwere ndekọ WAL** dịka ebe nchekwa mbụ ya, tinyere nzuzo **AES-256-GCM** maka data ndị dị mkpa mgbe echekwara ha. Nduzi a na-akọwa schema, migrations, ndabere/mweghachi, na akwụkwọ ntuziaka arụmọrụ.

**Isi mmalite:**

- `src/lib/db/core.ts` — singleton + SCHEMA_SQL (tebụl ntọala 17)
- `src/lib/db/migrationRunner.ts` — migrations nwere ụdị mbipụta
- `src/lib/db/migrations/` — faịlụ SQL 167 nwere ụdị mbipụta
- `src/lib/db/encryption.ts` — ngwa enyemaka nzuzo
- `src/lib/db/backup.ts` — mbupụ/mbubata ndabere
- `src/lib/db/healthCheck.ts` — nyocha ọnọdụ sistemụ

---

## Gịnị mere SQLite?

OmniRoute họọrọ SQLite kama PostgreSQL/MySQL n'ihi ọtụtụ ihe:

| Ihe               | SQLite                                        | PostgreSQL                                |
| ----------------- | --------------------------------------------- | ----------------------------------------- |
| **Mbugharị**      | Etinyere n'ime ya — sava ọzọ adịghị mkpa      | Ọ chọrọ nhazi sava                        |
| **Nzuzo**         | N'ogo ngwa (AES-256-GCM)                      | TDE arụnyere n'ime ya                     |
| **Ọsọ ọrụ**       | Ọsọ karịa maka ibu ọrụ nta/ọkara              | Ka mma maka nnukwu odide na-eme n'otu oge |
| **Ọrụ n'otu oge** | Ọnọdụ WAL na-enye ohere ọgụgụ n'otu oge       | MVCC zuru oke                             |
| **Ndabere**       | Nṅomi otu faịlụ                               | `pg_dump` ma ọ bụ snapshot sistemụ faịlụ  |
| **Ojiji**         | Nrụnye nke onye ọrụ ọ bụla, etinyere n'ime ya | SaaS nwere ọtụtụ ndị ahịa                 |

Maka mbugharị **nke otu onye ọrụ, otu instance** (ojiji bụ isi nke OmniRoute), SQLite dị mfe ma dịkwa ngwa karịa.

### Ndekọ WAL

`core.ts` na-emepe ọdụ data site na **ọnọdụ WAL (Write-Ahead Logging)**:

```ts
// src/lib/db/core.ts
db.pragma("journal_mode = WAL");
db.pragma("busy_timeout = 2000");
db.pragma("synchronous = NORMAL");
db.pragma(`cache_size = -${DEFAULT_DATABASE_SETTINGS.optimization.cacheSize}`);
```

WAL na-enye ohere **ọgụgụ na-eme n'otu oge** mgbe a na-ede ihe — nke a dị mkpa maka dashboard, nke na-eme ajụjụ mgbe a na-edekọ arịrịọ.

Nha cache ndabara bụ **65,536 KiB (64 MiB)**. SQLite na-ewere
`cache_size` na-adịghị mma dịka oke elu a tụlere na KiB ma na-ekenye peeji dịka mkpa si dị.
**Settings > System & Storage > Cache Size** na-anabata ọnụọgụ integer sitere na **1 ruo
1,000,000 KiB**; ichekwa ntọala ahụ na-etinye ya ozugbo na njikọ ọdụ data dị ndụ,
OmniRoute na-eweghachikwa uru echekwara mgbe ọ na-amalite.

---

## Ebe Ọdụ Data Dị

A na-echekwa faịlụ SQLite na:

| OS      | Ụzọ                                                                 |
| ------- | ------------------------------------------------------------------- |
| Linux   | `~/.omniroute/storage.sqlite`                                       |
| macOS   | `~/.omniroute/storage.sqlite`                                       |
| Windows | `%USERPROFILE%\.omniroute\storage.sqlite`                           |
| Docker  | `/app/data/storage.sqlite` (enwere ike ịhazi ya site na `DATA_DIR`) |

Faịlụ ndị na-eso ya:

- `storage.sqlite-wal` — ndekọ write-ahead
- `storage.sqlite-shm` — faịlụ ebe nchekwa a na-ekekọrịta
- `call_logs/` — ihe ndị metụtara payload arịrịọ (ọ bụrụ na agbanyere ya)

**Gbanwee ebe ahụ:**

```bash
DATA_DIR=/custom/path omniroute
```

---

## Nhazi Modul Domen

Ebe nchekwa data OmniRoute nwere **modul TypeScript 110 dị n'ọkwa kachasị elu** n'ime `src/lib/db/`. Modul domen ọ bụla:

- Na-ahụ maka otu tebụl ma ọ bụ karịa akọwapụtara nke ọma
- Na-ebupụ ọrụ CRUD nwere ụdị
- Anaghị emetụ tebụl modul ọzọ aka
- Na-eji `getDbInstance()` sitere na `core.ts` iji nweta DB

### Modul DB 110 Dị n'Ọkwa Kachasị Elu

OmniRoute nwere **faịlụ TypeScript 110 dị n'ọkwa kachasị elu** n'ime `src/lib/db/`. N'okpuru bụ ụfọdụ modul ndị bụ isi; lee ndepụta ndekọ ahụ maka ndepụta zuru ezu:

| Modul                   | Tebụl                                                          | Ọrụ                                                                      |
| ----------------------- | -------------------------------------------------------------- | ------------------------------------------------------------------------ |
| `providers.ts`          | `provider_connections`                                         | Ndebanye onye na-eweta OAuth/API key na nzere                            |
| `models.ts`             | `key_value` (data model)                                       | Nkọwa model, ikike, na ọnụahịa                                           |
| `combos.ts`             | `combos`                                                       | Nhazi na usoro nhazi ụzọ combo                                           |
| `apiKeys.ts`            | `api_keys`                                                     | Usoro ndụ API key, oke ikike, na nsuso oke ojiji                         |
| `settings.ts`           | `key_value`, `api_keys`, `combos`                              | Nhazi sistemụ na ebe nchekwa KV a na-ekekọrịta                           |
| `backup.ts`             | —                                                              | Ọrụ mbupụ/mbubata ndabere                                                |
| `proxies.ts`            | `proxy_registry`, `proxy_assignments`, `provider_connections`  | Nhazi proxy na iwu nhazi ụzọ                                             |
| `prompts.ts`            | `prompt_templates`                                             | Template prompt ndị enwere ike iji ọzọ na njikwa ụdị                     |
| `webhooks.ts`           | `webhooks`                                                     | Ndenye aha webhook ndị ihe omume na-akpalite na ndekọ ha                 |
| `detailedLogs.ts`       | `request_detail_logs`                                          | Ndekọ nyocha maka arịrịọ ọ bụla (nhọrọ, nnukwu olu)                      |
| `domainState.ts`        | `domain_*` (tebụl 5)                                           | Mmefu domen, circuit breakers, mkpọchi, agbụ fallback, na akụkọ ọnụ ahịa |
| `registeredKeys.ts`     | `registered_keys`, `account_key_limits`, `provider_key_limits` | API key enyere ikike maka MCP/A2A                                        |
| `quotaSnapshots.ts`     | `quota_snapshots`                                              | Ojiji oke e dekọrọ n'akụkọ ihe mere eme                                  |
| `modelComboMappings.ts` | `model_combo_mappings`                                         | Jikọta model na ndabara combo                                            |
| `cliToolState.ts`       | `cli_tool_state`                                               | Ọnọdụ na-adịgide adịgide akọwapụtara maka CLI                            |
| `encryption.ts`         | —                                                              | Ngwa enyemaka maka izo na ikpughe mpaghara                               |
| `readCache.ts`          | —                                                              | Cache dị na ebe nchekwa maka ọrụ ndị na-agụ data nke ukwuu               |
| `secrets.ts`            | `key_value` (ndekọ ezoro ezo)                                  | Nchekwa ihe nzuzo ezoro ezo                                              |
| `stateReset.ts`         | —                                                              | Hichapụ/weghachite ọnọdụ DB maka nnwale                                  |
| `contextHandoffs.ts`    | `context_handoffs`                                             | Ọnọdụ session maka inyefe ọrụ agent                                      |
| `usage*.ts`             | `usage_history`, `call_logs`, `proxy_logs`                     | Nsuso ojiji                                                              |
| `compression*.ts`       | `compression_settings`, `compression_combos`                   | Nhazi compression                                                        |

### Oke Modul

Otu iwu nhazi bụ isi: **modul anaghị enweta tebụl ibe ha ozugbo**. Iji rụọ ọrụ na data modul ọzọ, bubata ọrụ ahụ site na modul ahụ.

```ts
// ❌ EZIGHỊ EZI: SQL kpọmkwem sitere na modul ọzọ
db.prepare("SELECT * FROM provider_connections").all();

// ✅ ZIRI EZI: jiri ọrụ modul providers
import { listProviders } from "@/lib/db/providers";
const providers = await listProviders();
```

A na-amanye iwu a site na nyocha koodu — enweghị nyocha static, mana a na-akọ mmebi iwu.

---

## Skima Ndabere (tebụl 17)

`core.ts` na-akọwa tebụl ndabere 17 dị na `SCHEMA_SQL`. Mbugharị `001_initial_schema.sql` na-emepụta ha, ha na-abụkwa skima bụ isi.

### Tebụl Ndị Bụ Isi (emepụtara na mbugharị mbụ)

| Tebụl                      | Ebumnuche                                 | Kọlụm ndị dị mkpa                                                       |
| -------------------------- | ----------------------------------------- | ----------------------------------------------------------------------- |
| `provider_connections`     | Nzere njirimara ndị na-eweta (ezoro ezo)  | `id`, `provider`, `auth_type`, `api_key`, `is_active`                   |
| `provider_nodes`           | Ozi ntụgharị ọnụ ndị na-eweta             | `id`, `type`, `name`, `base_url`, `created_at`                          |
| `key_value`                | Ebe nchekwa KV izugbe                     | `namespace`, `key`, `value`                                             |
| `combos`                   | Nkọwa ngwakọta ntụgharị                   | `id`, `name`, `data`, `sort_order`                                      |
| `api_keys`                 | Igodo API maka ọnụ ụzọ                    | `id`, `name`, `key`, `machine_id`, `allowed_models`                     |
| `db_meta`                  | Metadata nke nchekwa data                 | `key`, `value`                                                          |
| `usage_history`            | Ndekọ ojiji arịrịọ                        | `id`, `provider`, `model`, `tokens_input`, `tokens_output`, `timestamp` |
| `call_logs`                | Payload arịrịọ na nzaghachi               | `id`, `timestamp`, `status`, `model`, `provider`, `latency_ms`          |
| `proxy_logs`               | Ndekọ arịrịọ proxy                        | `id`, `timestamp`, `proxy_type`, `status`, `provider`                   |
| `domain_fallback_chains`   | Agbụ njikọ ụdịdị-na-onye-na-eweta         | `model`, `chain`                                                        |
| `domain_budgets`           | Mmefu ego maka ngalaba ọ bụla             | `api_key_id`, `daily_limit_usd`, `warning_threshold`, `reset_interval`  |
| `domain_budget_reset_logs` | Akụkọ nrụgharị mmefu ego                  | `id`, `api_key_id`, `reset_interval`, `previous_spend`, `reset_at`      |
| `domain_cost_history`      | Nsochi ọnụ ahịa maka ngalaba ọ bụla       | `id`, `api_key_id`, `cost`, `timestamp`                                 |
| `domain_lockout_state`     | Ọnọdụ oke-ọnụọgụ arịrịọ nke ngalaba       | `identifier`, `attempts`, `locked_until`                                |
| `domain_circuit_breakers`  | Ọnọdụ circuit breaker maka ngalaba ọ bụla | `name`, `state`, `failure_count`, `last_failure_time`                   |
| `semantic_cache`           | Cache nzaghachi LLM                       | `id`, `signature`, `model`, `prompt_hash`, `response`                   |
| `quota_snapshots`          | Snapshot oke eji eme ihe n’oge gara aga   | `id`, `provider`, `connection_id`, `window_key`, `remaining_percentage` |

### Tebụl Ndị Ọzọ (ndị mbugharị mechara tinye)

Mbugharị ndị sochirinụ na-agbakwunye tebụl dịka:

- `cli_tool_state` (mbugharị 011) — ọnọdụ ngwa CLI
- Tebụl `mcp_*` — nyocha sava MCP
- Tebụl `a2a_*` — ọnọdụ ọrụ A2A
- Tebụl `usage_*` — nsochi ojiji
- Tebụl `plugin_*` — sistemụ plugin
- `skill_executions` — akụkọ mmezu nka
- Tebụl `memory_*` — sistemụ ebe nchekwa
- Tebụl `compression_*` — sistemụ mkpakọ
- Tebụl `webhook_*` — ndekọ nnyefe webhook
- Tebụl `acp_*` — Agent Client Protocol
- Tebụl `oneproxy_*` — ebe ahịa 1proxy
- `proxy_assignments` — njikọ oke proxy
- `detailed_call_artifacts` — metadata nke artifact ndekọ oku
- `quota_alert_history` — nyocha ọkwa oke eji eme ihe
- `command_code_auth_sessions` — nnọkọ OAuth nke Command Code

Ndepụta zuru ezu nke tebụl ihe dịka 30+ dị na `src/lib/db/migrations/`.

---

## Mbugharị

OmniRoute na-eji **mbugharị nwere ụdị mbipụta, nke na-arụ otu ihe n’agbanyeghị ugboro ole a gbara ya** n’ime `src/lib/db/migrations/`. Mbugharị ọ bụla bụ otu faịlụ SQL aha ya bụ `NNN_description.sql`.

### Ịkpọ Mbugharị Aha

```
001_initial_schema.sql
002_mcp_a2a_tables.sql
003_provider_node_custom_paths.sql
...
021_combo_call_log_targets.sql
```

### Otu Mbugharị Si Arụ Ọrụ

Mgbe mmalite, `migrationRunner.ts` na-eme ihe ndị a:

1. Mepụta tebụl `_omniroute_migrations` ma ọ bụrụ na ọ dịghị
2. Jụọ maka mbugharị ndị etinyelarị n’ọrụ
3. Tinye mbugharị ọhụrụ ọ bụla n’usoro, nke ọ bụla n’ime azụmahịa
4. Dekọọ mbugharị ọ bụla etinyere n’ọrụ tinyere akara oge

```ts
// src/lib/db/migrationRunner.ts (nke e mere ka ọ dị mfe)
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

### Ịrụ Otu Ihe N’agbanyeghị Ugboro Ole A Gbara Ya

Mbugharị ga-abụrịrị **nke na-arụ otu ihe n’agbanyeghị ugboro ole a gbara ya** — ịgba ha ugboro abụọ ekwesịghị ime mgbanwe ọ bụla:

```sql
-- 004_proxy_registry.sql
CREATE TABLE IF NOT EXISTS proxy_registry (
  id TEXT PRIMARY KEY,
  host TEXT NOT NULL,
  port INTEGER NOT NULL,
  ...
);
```

Jiri nkebiokwu `IF NOT EXISTS`, `IF EXISTS`, na `OR IGNORE` / `OR REPLACE` ọtụtụ mgbe.

### Ịgbakwunye Mbugharị Ọhụrụ

1. **Chọpụta nọmba na-esote**: `ls src/lib/db/migrations/ | tail -1`
2. **Mepụta faịlụ ahụ**: `NNN_my_change.sql`
3. **Jiri DDL dị nchebe**: `CREATE TABLE IF NOT EXISTS`, `ALTER TABLE ... ADD COLUMN`
4. **Jiri nlezianya mejupụta data ndị gara aga**: jiri `UPDATE ... WHERE ...` jikwaa ahịrị ndị dịbu adị
5. **Nwalee ya na oyiri**: anaghị agba mbugharị a na-anwalebeghị na gburugburu mmepụta

Ọmụmaatụ:

```sql
-- 022_add_combo_priority.sql
ALTER TABLE combos ADD COLUMN priority INTEGER DEFAULT 100;
UPDATE combos SET priority = 100 WHERE priority IS NULL;
CREATE INDEX IF NOT EXISTS idx_combos_priority ON combos(priority);
```

> **Mgbanwe ndị na-adabaghị n’azụ** (dịka ọmụmaatụ, ihichapụ kọlụm) siri ike. OmniRoute anaghị akwado ịlaghachi n’ụdị ochie — ozugbo etinyere mbugharị n’ọrụ, mgbanwe schema ahụ na-adịgide adịgide. Mee atụmatụ kwekọrọ na nke a.

---

## Izobe Ozi Mgbe Echekwara Ya

A na-ezobe mpaghara nwere ozi nzuzo (igodo API, token OAuth, eriri njikọ) mgbe echekwara ha site na iji **AES-256-GCM**.

### Otu O Si Arụ Ọrụ

```ts
// src/lib/db/encryption.ts (nke e mere ka ọ dị mfe)
const key = deriveKeyFromPassphrase(passphrase, salt);
const iv = randomBytes(12);
const cipher = createCipheriv("aes-256-gcm", key, iv);
const encrypted = Buffer.concat([cipher.update(plaintext), cipher.final()]);
const authTag = cipher.getAuthTag();
return { encrypted, iv, authTag };
```

### Ebe A Na-eji Ya

- `provider_connections.api_key` — ezobere ya n’ogo ngwa
- `provider_connections.access_token`, `refresh_token`, `id_token` — ezobere ha n’ogo ngwa
- Ndenye `key_value` nwere `namespace = "secrets"` — ezobere ha n’ogo ngwa
- `proxy_registry.auth` — ezobere ya n’ogo ngwa (ma ọ bụrụ na ọ dị)

### Igodo Nzobe Ozi

A na-emepụta igodo nzobe ozi site na **passphrase** (nke edobere site na env var `STORAGE_ENCRYPTION_KEY`) na **salt** (nke echekwara na DB). Ha abụọ dị mkpa iji kpughee data ahụ.

```bash
# Mepụta passphrase siri ike
openssl rand -hex 32

# Tọọ ya na .env
STORAGE_ENCRYPTION_KEY=<your-key>
```

> **Ihe dị oke mkpa**: Itufu igodo nzobe ozi pụtara na ị gaghịzi enweta data niile ezobere. **Chekwaa oyiri igodo ahụ iche na nchekwa data**.

### Ihe Ndị A Na-adịghị Ezobe

Maka ịrụ ọrụ ngwa ngwa, a na-echekwa ihe ndị a dị ka ederede nkịtị:

- Aha ngosi ndị na-eweta ọrụ
- Nkọwa model (ha adịlarị n’ihu ọha)
- Iwu nhazi ụzọ
- Ndekọ ojiji (enweghị PII)

---

## Ihe Ị Kwesịrị Ịma Banyere Izo Ozi (v3.8.16+)

OmniRoute na-eji **`migrateLegacyEncryptedString()`** ejikwa usoro izo ozi abụọ n'ụzọ na-enweghị onye ọrụ ịhụ mgbanwe:

- **Nke ochie** (tupu v3.5.0): “izo ozi” dabere na XOR (ọ bụghị ezigbo kriptografi)
- **Nke ugbu a**: AES-256-GCM nwere IV kwesịrị ekwesị na mkpado nkwado izi ezi

Ngwa enyemaka mbugharị ahụ na-achọpụta usoro ochie ahụ ma jiri usoro ọhụrụ zochie data ahụ ọzọ mgbe mbụ a gụrụ ya. Nke a pụtara na ị nwere ike imelite ọdụ data ochie n’efughị ozi nzere.

---

## Ebe Nchekwa Ọgụgụ

Maka data a na-agụ ugboro ugboro (ụdị, ndị na-eweta ọrụ, ntọala), `readCache.ts` na-enye **ebe nchekwa dị n'ime memori**:

```ts
// A na-echekwa ya mgbe usoro malitere, a na-akagbu ya mgbe e dere ihe
const providers = await getCachedProviders(); // Ọsọ, dị n'ime memori
const fresh = await listProviders(); // Nwayọ, na-agakwuru DB
```

| Ihe e debere na cache  | Igodo cache    | TTL                 |
| ---------------------- | -------------- | ------------------- |
| `models`               | `models:v1`    | Ruo mgbe e dere ihe |
| `provider_connections` | `providers:v1` | Ruo mgbe e dere ihe |
| `settings`             | `settings:v1`  | Ruo mgbe e dere ihe |
| `combos`               | `combos:v1`    | Ruo mgbe e dere ihe |

A na-akagbu cache mgbe ọ bụla e dere ihe na tebụl kwekọrọ na ya.

---

## Ndabere na Mweghachi

### Iji Aka Mepụta Ndabere

```bash
# Jiri CLI mepụta ndabere mpaghara
omniroute backup create --name pre-migration

# Ma ọ bụ site na API
curl -X PUT http://localhost:20128/api/db-backups \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

Faịlụ ndabere ahụ gụnyere:

- Tebụl DB niile (a haziri ha ka ha bụrụ JSON)
- Ihe ndekọ oku (e tinyere koodu base64, ma ọ bụrụ na achọrọ)
- Ntọala + ihe nzuzo (e zoro ezo)
- Nhazi plugin

### Mweghachi

```bash
# Site na CLI
omniroute restore pre-migration

# Site na API
curl -X POST http://localhost:20128/api/db-backups/restore \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

> **Ịdọ aka ná ntị**: Mweghachi na-edegharị DB niile. Buru ụzọ kwụsị ndị ahịa niile.

### Ndabere Akpaaka

```bash
# Jiri CLI mee ka ndabere kwa ụbọchị na-arụ ọrụ na-akpaghị aka
omniroute backup auto enable --cron "0 2 * * *" --retention 7
```

Ọrụ ndabere na sava na-eme nhazi oge a; ọrụ ahụ na-arụ ọrụ kwa sekọnd 30
(nke ndabara) ma na-enyocha okwu cron ahụ megide oge mpaghara sava.

| Mgbanwe                                     | Nke ndabara | Nkọwa                                                                                                                               |
| ------------------------------------------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_BACKUP_SCHEDULE_JOB_INTERVAL_MS` | `30000`     | Etiti oge ọrụ na ms (opekata mpe `5000`). Ọ ga-adị mkpụmkpụ karịa 60 s iji daba n’ime nkeji cron kwekọrọ n’ụzọ a pụrụ ịtụkwasị obi. |

### Ndabere SQLite Mgbe Ọ Na-arụ Ọrụ

Maka ime ndabere DB na-arụ ọrụ n’akwụsịghị ọrụ ya:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".backup /backups/omniroute-hot.db"
```

Nke a na-eji API ndabere SQLite nke ịntanetị — ọ dị nchebe ịrụ ya mgbe OmniRoute na-arụ ọrụ.

---

## Ndozi Arụmọrụ

### Ọnọdụ WAL

A na-agbanye WAL na ndabara. Maka ibu ọrụ nwere ọtụtụ ndebanye, tụlee:

```sql
PRAGMA wal_autocheckpoint = 1000;  -- Mee checkpoint kwa ibe 1000
PRAGMA journal_size_limit = 67108864;  -- Oke WAL nke 64MB
```

### Indeks

Indeks ndị dị mkpa maka arụmọrụ (migrations na-emepụta ha na-akpaghị aka):

- `idx_models_provider` — ọchụchọ model site na provider
- `idx_combo_targets_combo_id` — mgbasawanye combo target
- `idx_usage_history_api_key_timestamp` — nyocha ojiji
- `idx_quota_snapshots_api_key_window` — nlekota quota
- `idx_call_logs_timestamp` — ajụjụ ndekọ oku

Iji tinye indeks ọhụrụ, mepụta migration:

```sql
-- 023_add_my_index.sql
CREATE INDEX IF NOT EXISTS idx_my_table_my_column ON my_table(my_column);
```

### I/O E Jiri Maapụ Ebe Nchekwa

Maka database ndị buru nnọọ ibu (>10GB), enwere ike ịhazi memory mapping site na SQLite pragma:

```sql
-- Tọọ site na SQLite pragma (gbanwee na core.ts ma ọ bụ runtime)
PRAGMA mmap_size = 268435456;  -- 256MB
```

### Mkpakọ

Instance OmniRoute ndị na-arụ ọrụ ogologo oge na-erite uru site n’iji `VACUUM` mgbe ụfọdụ:

```bash
sqlite3 ~/.omniroute/storage.sqlite "VACUUM;"
```

Na-agba ya otu ugboro n’ọnwa n’oge okporo ụzọ dị ala. (Ọnọdụ WAL na-ebelata mkpa ya, mana ọ naghị ewepụ ya kpamkpam.)

---

## Nnyocha Ahụike

`src/lib/db/healthCheck.ts` na-enye **nyocha nsogbu ahụike n’ogo DB**:

Verb abụọ ahụ chọrọ authentication (`401` ma ọ bụghị ya). `GET` na-enyocha naanị; `POST` na-eme otu
nnyocha ahụ ebe agbanyere `autoRepair`.

```bash
GET  /api/db/health   # nyochaa nsogbu
POST /api/db/health   # nyochaa nsogbu + rụzie
```

Nzaghachi ahụ bụ `DbHealthCheckResult` nke `runDbHealthCheck()` mepụtara
(`src/lib/db/healthCheck.ts`):

```json
{
  "isHealthy": false,
  "issues": [
    {
      "type": "broken_reference",
      "table": "domain_budgets",
      "description": "Mmefu ego domain rụtụrụ aka na API key ndị na-adịkwaghị.",
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

| Field             | Ihe ọ pụtara                                                                                                                                               |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `isHealthy`       | Ọ bụ `true` mgbe `issues` tọgbọ chakoo. `driver` anaghị emetụta ya ma ọlị.                                                                                 |
| `issues[].type`   | Otu n’ime `integrity_check_failed`, `broken_reference`, `stale_snapshot`, `invalid_state`.                                                                 |
| `repairedCount`   | Ahịrị ndị e rụziri n’oge run a; ọ na-abụ `0` mgbe `autoRepair` bụ false.                                                                                   |
| `backupCreated`   | Ma e mere backup tupu nrụzi.                                                                                                                               |
| `checkedAt`       | Timestamp ISO nke run ahụ na repair note ọ bụla o dere jikọrọ ọnụ.                                                                                         |
| `driver.name`     | Driver SQLite na-enye database a nyochara ọrụ.                                                                                                             |
| `driver.degraded` | Ọ bụ `true` mgbe database file anaghị akwado ndebanye n’ụzọ na-adịgide adịgide — fallback WASM `sql.js` (nchekwa faịlụ dum) ma ọ bụ database dị na memory. |

Ngwaọrụ MCP `omniroute_db_health_check` na-eweghachikwa otu payload ahụ.

Gbaa `PRAGMA integrity_check` iji chọpụta mmebi:

```bash
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"
# O kwesịrị ibipụta: ok
```

Ọ bụrụ na ọ weghachite ihe ọ bụla na-abụghị `ok`, **kwụsị iji database ahụ ozugbo** ma weghachite ya site na backup.

---

## Mweghachi Mgbe Ọdachi Mere

### Ọnọdụ 1: Faịlụ WAL Furu Efu

Faịlụ `-wal` adịghị, mana `-shm` na DB bụ isi ka dị mma:

```bash
# Ọ ga-eweghachi onwe ya ozugbo e meghere ya ọzọ
omniroute
```

Ọ bụrụ na SQLite enweghị ike iweghachi onwe ya na-akpaghị aka:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".recover" > recovered.sql
sqlite3 recovered.db < recovered.sql
mv recovered.db ~/.omniroute/storage.sqlite
```

### Ọnọdụ 2: Faịlụ DB Bụ Isi Mebiri Emebi

Weghachite ya site na ndabere:

```bash
omniroute sync pull --merge   # ma ọ bụ: omniroute backup restore <backup-id>
```

### Ọnọdụ 3: Igodo Nzuzo Furu Efu

**Enweghị ụzọ mgbake ọ bụla** ma ọ bụrụ na igodo ahụ adịghị. Enweghị ike ịgụ mpaghara ndị ezoro ezo. Jiri aka tinye ndị na-eweta ọrụ niile ọzọ site na iji ozi nzere ọhụrụ.

> **Mbelata ihe ize ndụ**: Na-edobe ndabere igodo nzuzo ahụ iche mgbe niile, ọ kacha mma n'ime njikwa okwuntughe ma ọ bụ KMS.

### Ọnọdụ 4: Diski Jupụtara

SQLite ga-eweghachi njehie `SQLITE_FULL`. Hapụ ohere na diski, wee mee:

```bash
# Mee checkpoint WAL iji hapụ ohere
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA wal_checkpoint(TRUNCATE);"
```

---

## Ọrụ Ndị A Na-Ejikarị Eme Ihe

### Nyochaa Tebụl

```bash
sqlite3 ~/.omniroute/storage.sqlite "SELECT * FROM api_keys LIMIT 5;"
```

### Gụọ Ahịrị Ndị Dị na Tebụl Niile

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';
EOF
```

### Tọgharịa (Hichapụ) Data Niile

```bash
# Buru ụzọ kwụsị OmniRoute
omniroute stop

# Hichapụ faịlụ DB
rm ~/.omniroute/storage.sqlite*

# Malitegharịa (ọ ga-emepụta DB efu ọzọ)
omniroute
```

Maka nrụgharị **ahọpụtara** (dowe ndị na-eweta ọrụ, hichapụ ojiji):

```bash
DELETE FROM usage_history WHERE timestamp < datetime('now', '-30 day');
DELETE FROM call_logs WHERE timestamp < datetime('now', '-30 day');
DELETE FROM proxy_logs WHERE timestamp < datetime('now', '-30 day');
```

### Bupụ Otu Tebụl

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
.mode csv
.output api_keys.csv
SELECT * FROM api_keys;
EOF
```

---

## Nchọpụta na Ndozi Nsogbu

### "Akpọchiela nchekwa data"

Usoro ọzọ jidere mkpọchi ide ihe. Mee otu n'ime ndị a:

- Chere ka usoro nke ọzọ rụchaa (lelee `lsof | grep storage.sqlite`)
- Kwụsị usoro nke ọzọ
- Ọ bụrụ na ọ na-adịgide, malitegharịa OmniRoute

### "Mmachi igodo mba ọzọ dara"

Modul ngalaba na-emebi iguzosi ike n'ezi ihe nke njikọ. Lelee:

- Ahịrị ndị na-enweghị njikọ n'ime tebụl ndị dabere na ha
- Nhichapụ na-agbaso ibe ha nke na-agbasaghị
- Mbugharị e mere n'oge na-adịbeghị anya nke gbanwere igodo mba ọzọ

Mee `PRAGMA foreign_key_check;` iji chọta mmebi ndị ahụ.

### "Nchekwa ebe nchekwa agwụla"

I/O SQLite e kenyere na ebe nchekwa agafela oke OS. Belata ya site na pragma SQLite:

```sql
PRAGMA mmap_size = 134217728;  -- 128MB kama 256MB
```

Ma ọ bụ gbanyụọ ya:

```sql
PRAGMA mmap_size = 0;
```

### "Mbugharị dara mgbe ọ ruru ọkara"

Mbugharị ahụ gara n'ime azụmahịa, ya mere o kwesịrị ịlaghachi n'ọnọdụ mbụ. Ọ bụrụ na ọ laghachighị:

1. **Kwụsị OmniRoute** (gbochie mbọ ndị ọzọ)
2. **Lelee ọnọdụ DB** site na iji `sqlite3`
3. **Jiri aka dozie** mbugharị ahụ na-ezughị ezu
4. **Malitegharịa** OmniRoute (a ga-anwa mbugharị ahụ ọzọ)

Iji gbochie nke a, buru ụzọ nwalee mbugharị mgbe niile na otu oyiri.

---

## Hụkwa

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — tebụl ojiji
- [MONITORING_GUIDE.md](./MONITORING_GUIDE.md) — nlekota ọnọdụ ọrụ
- [RELEASE_CHECKLIST.md](./RELEASE_CHECKLIST.md) — usoro mwepụta
- Ebe mmalite: `src/lib/db/` (faịlụ 80+, ihe dịka ahịrị koodu 25K)
