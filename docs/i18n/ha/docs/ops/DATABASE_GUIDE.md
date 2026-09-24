# Database Schema & Operations Guide (Hausa)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/DATABASE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/DATABASE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/DATABASE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/DATABASE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/DATABASE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/DATABASE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/DATABASE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/DATABASE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/DATABASE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/DATABASE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/DATABASE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/DATABASE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/DATABASE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/DATABASE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/DATABASE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/DATABASE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/DATABASE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/DATABASE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/DATABASE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/DATABASE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/DATABASE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/DATABASE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/DATABASE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/DATABASE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/DATABASE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/DATABASE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/DATABASE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/DATABASE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/DATABASE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/DATABASE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/DATABASE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/DATABASE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/DATABASE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/DATABASE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/DATABASE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/DATABASE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/DATABASE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/DATABASE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/DATABASE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/DATABASE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/DATABASE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/DATABASE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/DATABASE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/DATABASE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/DATABASE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/DATABASE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/DATABASE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/DATABASE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/DATABASE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/DATABASE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/DATABASE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/DATABASE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/DATABASE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/DATABASE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/DATABASE_GUIDE.md)

---

> **A Taƙaice**: OmniRoute yana amfani da **SQLite tare da rubutun mujallar WAL** a matsayin ma’ajiyar sa ta farko, tare da ɓoyewar **AES-256-GCM** don muhimman filaye yayin da bayanai suke ajiye. Wannan jagorar ta ƙunshi tsarin bayanai, ƙaura, ajiyar wucin-gadi/maido da bayanai, da littattafan gudanarwa.

**Madogara:**

- `src/lib/db/core.ts` — singleton + SCHEMA_SQL (teburori na asali 17)
- `src/lib/db/migrationRunner.ts` — ƙaura masu lambobin siga
- `src/lib/db/migrations/` — fayilolin SQL masu lambobin siga guda 167
- `src/lib/db/encryption.ts` — kayan taimako na ɓoyewa
- `src/lib/db/backup.ts` — fitarwa/shigo da ajiyar wucin-gadi
- `src/lib/db/healthCheck.ts` — binciken lafiyar tsarin

---

## Me Ya Sa Aka Zaɓi SQLite?

OmniRoute ya zaɓi SQLite maimakon PostgreSQL/MySQL saboda dalilai da dama:

| Abu                   | SQLite                                    | PostgreSQL                                            |
| --------------------- | ----------------------------------------- | ----------------------------------------------------- |
| **Turawa**            | A ciki yake — ba ya buƙatar sabar dabam   | Yana buƙatar saita sabar                              |
| **Ɓoyewa**            | A matakin manhaja (AES-256-GCM)           | TDE da aka gina a ciki                                |
| **Aiki**              | Ya fi sauri ga ƙananan/matsakaitan ayyuka | Ya fi dacewa da rubuce-rubuce masu yawa a lokaci guda |
| **Aiki tare**         | Yanayin WAL yana ba da damar karatu tare  | Cikakken MVCC                                         |
| **Ajiyar wucin-gadi** | Kwafin fayil guda ɗaya                    | `pg_dump` ko hoton tsarin fayiloli                    |
| **Yanayin amfani**    | Shigarwa ta kowane mai amfani, a ciki     | SaaS mai masu haya da yawa                            |

Ga turawa na **mai amfani guda, da tsari guda** (babban yanayin amfani da OmniRoute), SQLite ya fi sauƙi kuma ya fi sauri.

### Rubutun Mujallar WAL

`core.ts` yana buɗe ma’ajiyar bayanai da **yanayin WAL (Write-Ahead Logging)**:

```ts
// src/lib/db/core.ts
db.pragma("journal_mode = WAL");
db.pragma("busy_timeout = 2000");
db.pragma("synchronous = NORMAL");
db.pragma(`cache_size = -${DEFAULT_DATABASE_SETTINGS.optimization.cacheSize}`);
```

WAL yana ba da damar **karatu a lokaci guda** yayin rubutu — wannan yana da muhimmanci ga allon kulawa, wanda yake yin tambayoyi yayin da ake yin rajistar buƙatu.

Tsohon girman cache shi ne **65,536 KiB (64 MiB)**. SQLite yana fassara ƙimar
`cache_size` mara kyau a matsayin kimanin iyakar sama a KiB, sannan yana ware shafuka gwargwadon buƙata.
**Saituna > Tsari da Ma’ajiya > Girman Cache** yana karɓar cikakkun lambobi daga **1 zuwa
1,000,000 KiB**; adana saitin yana aiwatar da shi ga haɗin ma’ajiyar bayanai mai aiki,
kuma OmniRoute yana dawo da ƙimar da aka adana yayin farawa.

---

## Wurin Ma’ajiyar Bayanai

Ana adana fayil ɗin SQLite a:

| OS      | Hanya                                                        |
| ------- | ------------------------------------------------------------ |
| Linux   | `~/.omniroute/storage.sqlite`                                |
| macOS   | `~/.omniroute/storage.sqlite`                                |
| Windows | `%USERPROFILE%\.omniroute\storage.sqlite`                    |
| Docker  | `/app/data/storage.sqlite` (ana iya saita shi ta `DATA_DIR`) |

Fayilolin da ke tare da shi:

- `storage.sqlite-wal` — kundin rubutu na gaba
- `storage.sqlite-shm` — fayil ɗin ƙwaƙwalwar da aka raba
- `call_logs/` — kayan bayanan buƙata (idan an kunna)

**Sauya wurin:**

```bash
DATA_DIR=/custom/path omniroute
```

---

## Tsarin Gine-ginen Module na Domain

Rumbun bayanan OmniRoute yana da **module na TypeScript guda 110 na babban mataki** a cikin `src/lib/db/`. Kowane module na domain:

- Yana kula da takamaiman table guda ɗaya ko fiye
- Yana fitar da typed CRUD functions
- Ba ya taɓa tables na wani module
- Yana amfani da `getDbInstance()` daga `core.ts` don samun damar shiga DB

### Modules na DB Guda 110 na Babban Mataki

OmniRoute yana da **fayilolin TypeScript guda 110 na babban mataki** a cikin `src/lib/db/`. A ƙasa akwai wasu daga cikin muhimman modules; duba jerin directory don cikakken jeri:

| Module                  | Tables                                                         | Alhaki                                                                    |
| ----------------------- | -------------------------------------------------------------- | ------------------------------------------------------------------------- |
| `providers.ts`          | `provider_connections`                                         | Rijistar provider ta OAuth/API key da bayanan shaidar shiga               |
| `models.ts`             | `key_value` (bayanan model)                                    | Ma'anar models, ƙwarewa, da farashi                                       |
| `combos.ts`             | `combos`                                                       | Saitunan routing na combo da jerewa                                       |
| `apiKeys.ts`            | `api_keys`                                                     | Tsarin rayuwar API key, scopes, da bin diddigin quota                     |
| `settings.ts`           | `key_value`, `api_keys`, `combos`                              | Saitin tsarin da ma'ajiyar KV ta gama-gari                                |
| `backup.ts`             | —                                                              | Ayyukan fitarwa/shigarwa na backup                                        |
| `proxies.ts`            | `proxy_registry`, `proxy_assignments`, `provider_connections`  | Saitunan proxy da ƙa'idojin routing                                       |
| `prompts.ts`            | `prompt_templates`                                             | Templates na prompt masu sake amfani da versioning                        |
| `webhooks.ts`           | `webhooks`                                                     | Biyan kuɗin webhook bisa events da logs                                   |
| `detailedLogs.ts`       | `request_detail_logs`                                          | Audit logging na kowace request (na zaɓi, mai yawa)                       |
| `domainState.ts`        | `domain_*` (tables 5)                                          | Kasafin domain, circuit breakers, lockouts, fallback chains, tarihin kuɗi |
| `registeredKeys.ts`     | `registered_keys`, `account_key_limits`, `provider_key_limits` | API keys da aka amince da su don MCP/A2A                                  |
| `quotaSnapshots.ts`     | `quota_snapshots`                                              | Tarihin amfani da quota                                                   |
| `modelComboMappings.ts` | `model_combo_mappings`                                         | Haɗa models da tsoffin combos                                             |
| `cliToolState.ts`       | `cli_tool_state`                                               | Persistent state na musamman ga CLI                                       |
| `encryption.ts`         | —                                                              | Helpers don ɓoye da buɗe fields                                           |
| `readCache.ts`          | —                                                              | Cache na cikin memory don ayyukan karantawa masu yawa                     |
| `secrets.ts`            | `key_value` (encrypted entries)                                | Ma'ajiyar secrets da aka ɓoye                                             |
| `stateReset.ts`         | —                                                              | Goge/sake saita state na DB don gwaji                                     |
| `contextHandoffs.ts`    | `context_handoffs`                                             | Context na session don miƙa aiki tsakanin agents                          |
| `usage*.ts`             | `usage_history`, `call_logs`, `proxy_logs`                     | Bin diddigin amfani                                                       |
| `compression*.ts`       | `compression_settings`, `compression_combos`                   | Saitin compression                                                        |

### Iyakokin Module

Wata muhimmiyar ƙa'idar gine-gine ita ce: **modules ba sa shiga tables na juna kai tsaye**. Don aiki da bayanan wani module, import function ɗin daga wannan module.

```ts
// ❌ BA DAI-DAI BA: SQL kai tsaye daga wani module
db.prepare("SELECT * FROM provider_connections").all();

// ✅ DAI-DAI NE: yi amfani da function na providers module
import { listProviders } from "@/lib/db/providers";
const providers = await listProviders();
```

Ana tabbatar da bin wannan ƙa'ida ta hanyar bitar code — babu static check, amma ana nuna duk wani karya ta.

---

## Tsarin Asali (teburori 17)

`core.ts` yana ayyana teburorin asali guda 17 a cikin `SCHEMA_SQL`. Migration `001_initial_schema.sql` ne ke ƙirƙirar su, kuma su ne ginshiƙin schema.

### Muhimman Teburori (waɗanda aka ƙirƙira a migration na farko)

| Tebur                      | Manufa                                           | Muhimman ginshiƙai                                                      |
| -------------------------- | ------------------------------------------------ | ----------------------------------------------------------------------- |
| `provider_connections`     | Bayanan shaidar masu samarwa (rufaffu)           | `id`, `provider`, `auth_type`, `api_key`, `is_active`                   |
| `provider_nodes`           | Bayanan tura zirga-zirga na node ɗin mai samarwa | `id`, `type`, `name`, `base_url`, `created_at`                          |
| `key_value`                | Ma'ajiyar KV ta gama-gari                        | `namespace`, `key`, `value`                                             |
| `combos`                   | Ma'anoni na haɗin hanyoyin turawa                | `id`, `name`, `data`, `sort_order`                                      |
| `api_keys`                 | Maɓallan API na gateway                          | `id`, `name`, `key`, `machine_id`, `allowed_models`                     |
| `db_meta`                  | Metadata na ma'ajiyar bayanai                    | `key`, `value`                                                          |
| `usage_history`            | Bayanan tarihin amfani da buƙatu                 | `id`, `provider`, `model`, `tokens_input`, `tokens_output`, `timestamp` |
| `call_logs`                | Abubuwan buƙatu da martani                       | `id`, `timestamp`, `status`, `model`, `provider`, `latency_ms`          |
| `proxy_logs`               | Rajistan buƙatun proxy                           | `id`, `timestamp`, `proxy_type`, `status`, `provider`                   |
| `domain_fallback_chains`   | Jerin hanyoyin model-zuwa-mai-samarwa            | `model`, `chain`                                                        |
| `domain_budgets`           | Kasafin kashe kuɗi na kowane domain              | `api_key_id`, `daily_limit_usd`, `warning_threshold`, `reset_interval`  |
| `domain_budget_reset_logs` | Tarihin sake saita kasafin kuɗi                  | `id`, `api_key_id`, `reset_interval`, `previous_spend`, `reset_at`      |
| `domain_cost_history`      | Bibiyar kuɗin kowane domain                      | `id`, `api_key_id`, `cost`, `timestamp`                                 |
| `domain_lockout_state`     | Halin iyakance ƙimar domain                      | `identifier`, `attempts`, `locked_until`                                |
| `domain_circuit_breakers`  | Halin circuit breaker na kowane domain           | `name`, `state`, `failure_count`, `last_failure_time`                   |
| `semantic_cache`           | Cache na martanin LLM                            | `id`, `signature`, `model`, `prompt_hash`, `response`                   |
| `quota_snapshots`          | Tarihin hotunan rabon amfani                     | `id`, `provider`, `connection_id`, `window_key`, `remaining_percentage` |

### Ƙarin Teburori (waɗanda migrations na baya suka ƙara)

Migrations na gaba suna ƙara teburori kamar haka:

- `cli_tool_state` (migration 011) — halin kayan aikin CLI
- Teburorin `mcp_*` — binciken uwar-garken MCP
- Teburorin `a2a_*` — halin aikin A2A
- Teburorin `usage_*` — bibiyar amfani
- Teburorin `plugin_*` — tsarin plugin
- `skill_executions` — tarihin aiwatar da ƙwarewa
- Teburorin `memory_*` — tsarin ƙwaƙwalwa
- Teburorin `compression_*` — tsarin matsawa
- Teburorin `webhook_*` — rajistan isar da webhook
- Teburorin `acp_*` — Agent Client Protocol
- Teburorin `oneproxy_*` — kasuwar 1proxy
- `proxy_assignments` — haɗa iyakar proxy
- `detailed_call_artifacts` — metadata na kayan rajistan kira
- `quota_alert_history` — binciken faɗakarwar rabon amfani
- `command_code_auth_sessions` — zaman OAuth na Command Code

Cikakken jerin teburori ~30+ yana cikin `src/lib/db/migrations/`.

---

## Ƙaurace-ƙaurace

OmniRoute yana amfani da **ƙaurace-ƙaurace masu sigogi kuma masu maimaita aiki ba tare da illa ba** a cikin `src/lib/db/migrations/`. Kowace ƙaura fayil ɗin SQL guda ɗaya ce mai suna `NNN_description.sql`.

### Sanya Sunan Ƙaura

```
001_initial_schema.sql
002_mcp_a2a_tables.sql
003_provider_node_custom_paths.sql
...
021_combo_call_log_targets.sql
```

### Yadda Ake Gudanar da Ƙaurace-ƙaurace

A lokacin farawa, `migrationRunner.ts`:

1. Yana ƙirƙirar teburin `_omniroute_migrations` idan babu shi
2. Yana bincika ƙaurace-ƙauracen da aka riga aka aiwatar
3. Yana aiwatar da duk sabbin ƙaurace-ƙaurace bisa tsari, kowannensu a cikin transaction
4. Yana rubuta kowace ƙaura da aka aiwatar tare da timestamp

```ts
// src/lib/db/migrationRunner.ts (an sauƙaƙa)
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

### Maimaita Aiki Ba Tare da Illa Ba

Dole ne ƙaurace-ƙaurace su kasance **masu maimaita aiki ba tare da illa ba** — gudanar da su sau biyu bai kamata ya haifar da wani aiki ba:

```sql
-- 004_proxy_registry.sql
CREATE TABLE IF NOT EXISTS proxy_registry (
  id TEXT PRIMARY KEY,
  host TEXT NOT NULL,
  port INTEGER NOT NULL,
  ...
);
```

Yi amfani da sassan `IF NOT EXISTS`, `IF EXISTS`, da `OR IGNORE` / `OR REPLACE` sosai.

### Ƙara Sabuwar Ƙaura

1. **Gano lamba ta gaba**: `ls src/lib/db/migrations/ | tail -1`
2. **Ƙirƙiri fayil ɗin**: `NNN_my_change.sql`
3. **Yi amfani da DDL mai aminci**: `CREATE TABLE IF NOT EXISTS`, `ALTER TABLE ... ADD COLUMN`
4. **Cika tsofaffin bayanai a hankali**: yi amfani da `UPDATE ... WHERE ...` don sarrafa layukan da suke akwai
5. **Gwada a kan kwafi**: kada a taɓa gudanar da ƙaurace-ƙauracen da ba a gwada ba a production

Misali:

```sql
-- 022_add_combo_priority.sql
ALTER TABLE combos ADD COLUMN priority INTEGER DEFAULT 100;
UPDATE combos SET priority = 100 WHERE priority IS NULL;
CREATE INDEX IF NOT EXISTS idx_combos_priority ON combos(priority);
```

> **Canje-canjen da ba su dace da sigogin baya ba** (misali, goge columns) suna da sarƙaƙiya. OmniRoute BA YA goyon bayan downgrade — da zarar an aiwatar da ƙaura, canjin schema ɗin zai zama na dindindin. Yi shiri bisa haka.

---

## Ɓoyayyen Bayani Yayin Adanawa

Ana ɓoye muhimman fields (API keys, OAuth tokens, connection strings) yayin adanawa ta amfani da **AES-256-GCM**.

### Yadda Yake Aiki

```ts
// src/lib/db/encryption.ts (an sauƙaƙa)
const key = deriveKeyFromPassphrase(passphrase, salt);
const iv = randomBytes(12);
const cipher = createCipheriv("aes-256-gcm", key, iv);
const encrypted = Buffer.concat([cipher.update(plaintext), cipher.final()]);
const authTag = cipher.getAuthTag();
return { encrypted, iv, authTag };
```

### Inda Ake Amfani da Shi

- `provider_connections.api_key` — ana ɓoye shi a matakin manhaja
- `provider_connections.access_token`, `refresh_token`, `id_token` — ana ɓoye su a matakin manhaja
- Bayanai na `key_value` masu `namespace = "secrets"` — ana ɓoye su a matakin manhaja
- `proxy_registry.auth` — ana ɓoye shi a matakin manhaja (idan yana nan)

### Maɓallin Ɓoye Bayani

Ana samar da maɓallin ɓoye bayanin daga **passphrase** (wanda ake saita ta env var ɗin `STORAGE_ENCRYPTION_KEY`) da kuma **salt** (wanda ake adanawa a cikin DB). Ana buƙatar dukansu biyu don warware ɓoyayyun bayanai.

```bash
# Samar da passphrase mai aminci
openssl rand -hex 32

# Saita a cikin .env
STORAGE_ENCRYPTION_KEY=<your-key>
```

> **Muhimmi ƙwarai**: Rasa maɓallin ɓoye bayanai yana nufin rasa damar shiga dukkan bayanan da aka ɓoye. **Yi ajiyar maɓallin dabam da database**.

### Abubuwan da BA A Ɓoye Ba

Saboda dalilan ingantaccen aiki, ana adana abubuwa masu zuwa a matsayin plaintext:

- Sunayen nuni na providers
- Ma’anonin models (sun riga sun zama na jama’a)
- Ka’idojin routing
- Bayanan amfani (babu PII)

---

## Muhimman Bayanan Ɓoye Bayanai (v3.8.16+)

OmniRoute yana amfani da **`migrateLegacyEncryptedString()`** don sarrafa tsare-tsaren ɓoye bayanai guda biyu ba tare da mai amfani ya lura ba:

- **Na tsohon tsari** (kafin v3.5.0): "ɓoye bayanai" mai amfani da XOR (ba ainihin tsarin tsaro na cryptography ba)
- **Na yanzu**: AES-256-GCM tare da ingantaccen IV da alamar tabbatarwa

Mataimakin ƙaura yana gano tsarin tsohon tsari sannan ya sake ɓoye bayanan da sabon tsari a karantawa ta farko. Wannan yana nufin za ka iya ɗaukaka tsohon rumbun bayanai ba tare da rasa bayanan shaidarka ba.

---

## Ma'ajiyar Karantawa

Don bayanan da ake yawan karantawa (samfura, masu samarwa, saituna), `readCache.ts` yana samar da **ma'ajiyar cikin ƙwaƙwalwa**:

```ts
// Ana adanawa a ma'ajiya lokacin farawa, kuma ana soke ta lokacin rubutawa
const providers = await getCachedProviders(); // Mai sauri, yana cikin ƙwaƙwalwa
const fresh = await listProviders(); // Mai jinkiri, yana tuntuɓar DB
```

| Abin da aka adana      | Maɓallin ma'ajiya | TTL                  |
| ---------------------- | ----------------- | -------------------- |
| `models`               | `models:v1`       | Har sai an yi rubutu |
| `provider_connections` | `providers:v1`    | Har sai an yi rubutu |
| `settings`             | `settings:v1`     | Har sai an yi rubutu |
| `combos`               | `combos:v1`       | Har sai an yi rubutu |

Ana soke ma'ajiyar a duk lokacin da aka yi rubutu zuwa jadawalin da ya dace da ita.

---

## Ajiyar Kwafi da Farfaɗowa

### Ajiyar Kwafi da Hannu

```bash
# Yi amfani da CLI don ƙirƙirar ajiyar kwafi ta gida
omniroute backup create --name pre-migration

# Ko ta API
curl -X PUT http://localhost:20128/api/db-backups \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

Fayil ɗin ajiyar kwafin ya ƙunshi:

- Duk jadawalan DB (an mayar da su zuwa JSON)
- Abubuwan tarihin kira (an yi musu base64 encoding, na zaɓi)
- Saituna + sirrika (a ɓoye)
- Tsarin plugin

### Maidowa

```bash
# Ta CLI
omniroute restore pre-migration

# Ta API
curl -X POST http://localhost:20128/api/db-backups/restore \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

> **Gargaɗi**: Maidowa yana maye gurbin DB gaba ɗaya. Da farko, dakatar da duk abokan hulɗa.

### Ajiyar Kwafi ta Atomatik

```bash
# Kunna ajiyar kwafi ta atomatik ta kowace rana ta CLI
omniroute backup auto enable --cron "0 2 * * *" --retention 7
```

Ana aiwatar da jadawalin a ɓangaren uwar garken ta hanyar aikin bayan-fage wanda ke aiki kowane sakan 30
(na asali) kuma yana tantance furucin cron bisa lokacin gida na uwar garken.

| Canji                                       | Na asali | Bayani                                                                                                              |
| ------------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_BACKUP_SCHEDULE_JOB_INTERVAL_MS` | `30000`  | Tazarar aiki a ms (mafi ƙaranci `5000`). Dole ne ya kasance ƙasa da sakan 60 don dacewa da mintin cron abin dogaro. |

### Ajiyar Kwafin SQLite Kai Tsaye

Don yin ajiyar kwafin DB mai aiki ba tare da dakatar da sabis ba:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".backup /backups/omniroute-hot.db"
```

Wannan yana amfani da API na ajiyar kwafi ta kan layi na SQLite — babu matsala a gudanar da shi yayin da OmniRoute ke aiki.

---

## Daidaita Aiki

### Yanayin WAL

Ana kunna WAL ta tsohuwa. Don ayyukan da ke yawan rubutu, yi la’akari da:

```sql
PRAGMA wal_autocheckpoint = 1000;  -- Yi checkpoint bayan kowane shafi 1000
PRAGMA journal_size_limit = 67108864;  -- Iyakar WAL ta 64MB
```

### Fihirisa

Muhimman fihirisa don ingantaccen aiki (migrations ne ke ƙirƙirar su ta atomatik):

- `idx_models_provider` — nemo samfura bisa provider
- `idx_combo_targets_combo_id` — faɗaɗa combo target
- `idx_usage_history_api_key_timestamp` — nazarin amfani
- `idx_quota_snapshots_api_key_window` — bin diddigin quota
- `idx_call_logs_timestamp` — tambayoyin rajistar kira

Don ƙara sabon fihirisa, ƙirƙiri migration:

```sql
-- 023_add_my_index.sql
CREATE INDEX IF NOT EXISTS idx_my_table_my_column ON my_table(my_column);
```

### I/O Mai Amfani da Taswirar Ƙwaƙwalwa

Ga manyan ma’ajiyar bayanai sosai (>10GB), ana iya daidaita memory mapping ta hanyar SQLite pragma:

```sql
-- Saita ta SQLite pragma (daidaita a core.ts ko runtime)
PRAGMA mmap_size = 268435456;  -- 256MB
```

### Matsewa

OmniRoute instances da ke aiki na dogon lokaci suna amfana daga gudanar da `VACUUM` lokaci-lokaci:

```bash
sqlite3 ~/.omniroute/storage.sqlite "VACUUM;"
```

Gudanar da shi kowane wata a lokutan ƙarancin zirga-zirga. (Yanayin WAL yana rage buƙatar hakan, amma ba ya kawar da ita gaba ɗaya.)

---

## Duba Lafiya

`src/lib/db/healthCheck.ts` yana samar da **binciken lafiyar DB**:

Dukkan verbs ɗin suna buƙatar authentication (`401` idan babu). `GET` yana yin bincike kawai; `POST` yana gudanar da
binciken iri ɗaya tare da kunna `autoRepair`.

```bash
GET  /api/db/health   # yi bincike
POST /api/db/health   # yi bincike + gyara
```

Amsar ita ce `DbHealthCheckResult` da `runDbHealthCheck()` ya samar
(`src/lib/db/healthCheck.ts`):

```json
{
  "isHealthy": false,
  "issues": [
    {
      "type": "broken_reference",
      "table": "domain_budgets",
      "description": "Kasafin domain sun yi nuni ga API keys waɗanda babu su kuma.",
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

| Fili              | Ma’ana                                                                                                                                                                              |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `isHealthy`       | `true` ne idan `issues` babu komai a ciki. `driver` ba ya taɓa yin tasiri a kansa.                                                                                                  |
| `issues[].type`   | Ɗaya daga cikin `integrity_check_failed`, `broken_reference`, `stale_snapshot`, `invalid_state`.                                                                                    |
| `repairedCount`   | Layukan da aka gyara yayin wannan gudanarwar; koyaushe `0` ne idan `autoRepair` false ne.                                                                                           |
| `backupCreated`   | Ko an ɗauki backup kafin gyarawa.                                                                                                                                                   |
| `checkedAt`       | ISO timestamp da gudanarwar da duk wani bayanin gyara da ta rubuta suke amfani da shi tare.                                                                                         |
| `driver.name`     | SQLite driver da ke hidimar ma’ajiyar bayanan da aka bincika.                                                                                                                       |
| `driver.degraded` | `true` ne idan rubuce-rubuce ba su da tabbataccen kariya daga fayil ɗin ma’ajiyar bayanai — `sql.js` WASM fallback (adana gabaɗayan fayil) ko ma’ajiyar bayanai ta cikin ƙwaƙwalwa. |

Kayan aikin MCP na `omniroute_db_health_check` ma yana dawo da wannan payload ɗin.

Gudanar da `PRAGMA integrity_check` don gano lalacewa:

```bash
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"
# Ya kamata ya buga: ok
```

Idan ya dawo da wani abu ban da `ok`, **dakatar da amfani da ma’ajiyar bayanan nan take** sannan a dawo da ita daga backup.

---

## Farfaɗowa Daga Bala'i

### Yanayi na 1: An Rasa Fayil ɗin WAL

Fayil ɗin `-wal` ya ɓace amma `-shm` da babban DB suna nan yadda suke:

```bash
# Zai farfaɗo ta atomatik a buɗewa ta gaba
omniroute
```

Idan SQLite ba zai iya farfaɗowa ta atomatik ba:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".recover" > recovered.sql
sqlite3 recovered.db < recovered.sql
mv recovered.db ~/.omniroute/storage.sqlite
```

### Yanayi na 2: Babban Fayil ɗin DB Ya Lalace

Mayar daga madadin ajiya:

```bash
omniroute sync pull --merge   # ko: omniroute backup restore <backup-id>
```

### Yanayi na 3: An Rasa Maɓallin Rufaffen Bayani

**Ba za a iya farfaɗowa ba** ba tare da maɓallin ba. Ba za a iya karanta filayen da aka rufaffen bayanansu ba. Sake ƙara duk masu samarwa da hannu tare da sabbin bayanan tabbatarwa.

> **Rage Haɗari**: Koyaushe yi wa maɓallin rufaffen bayanai madadin ajiya daban, zai fi kyau a cikin manajan kalmomin sirri ko KMS.

### Yanayi na 4: Faifai Ya Cika

SQLite zai dawo da kurakuran `SQLITE_FULL`. Samar da sarari a faifai, sannan:

```bash
# Yi checkpoint na WAL don samar da sarari
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA wal_checkpoint(TRUNCATE);"
```

---

## Ayyukan da Aka Saba Yi

### Duba Tebur

```bash
sqlite3 ~/.omniroute/storage.sqlite "SELECT * FROM api_keys LIMIT 5;"
```

### Ƙirga Layuka a Duk Teburori

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';
EOF
```

### Sake Saiti (Goge) Duk Bayanai

```bash
# Da farko dakatar da OmniRoute
omniroute stop

# Goge fayil ɗin DB
rm ~/.omniroute/storage.sqlite*

# Sake farawa (zai sake ƙirƙirar DB mara komai)
omniroute
```

Don sake saiti na **zaɓi** (a bar masu samarwa, a goge bayanan amfani):

```bash
DELETE FROM usage_history WHERE timestamp < datetime('now', '-30 day');
DELETE FROM call_logs WHERE timestamp < datetime('now', '-30 day');
DELETE FROM proxy_logs WHERE timestamp < datetime('now', '-30 day');
```

### Fitar da Tebur Guda

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
.mode csv
.output api_keys.csv
SELECT * FROM api_keys;
EOF
```

---

## Warware Matsaloli

### "An kulle rumbun bayanai"

Wani tsari yana riƙe da makullin rubutu. Yi ɗaya daga cikin waɗannan:

- Jira ɗayan tsarin ya gama (duba `lsof | grep storage.sqlite`)
- Kashe ɗayan tsarin
- Idan matsalar ta ci gaba, sake kunna OmniRoute

### "Ƙa'idar maɓallin waje ta gaza"

Wani tsarin yanki yana karya daidaiton alaƙa. Duba:

- Layuka marasa alaƙa a cikin teburori masu dogaro
- Gogewar cascading da ba ta yaɗu ba
- Ƙaura ta kwanan nan da ta canza maɓallin waje

Gudanar da `PRAGMA foreign_key_check;` don gano keta ƙa'idodi.

### "Ƙwaƙwalwa ta ƙare"

I/O na SQLite da aka danganta da ƙwaƙwalwa yana wuce iyakar OS. Rage shi ta amfani da pragma na SQLite:

```sql
PRAGMA mmap_size = 134217728;  -- 128MB maimakon 256MB
```

Ko a kashe shi:

```sql
PRAGMA mmap_size = 0;
```

### "Ƙaura ta gaza a tsakiyar aiki"

An gudanar da ƙaurar a cikin transaction, don haka ya kamata a ce an mayar da ita baya. Idan ba haka ba:

1. **Dakatar da OmniRoute** (don hana ƙarin yunƙuri)
2. **Duba yanayin DB** ta amfani da `sqlite3`
3. **Gyara da hannu** ɓangaren ƙaurar da aka yi
4. **Sake gudanar da** OmniRoute (za a sake gwada ƙaurar)

Don hana wannan, koyaushe fara gwada ƙaura a kan kwafi.

---

## Duba Kuma

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — teburorin amfani
- [MONITORING_GUIDE.md](./MONITORING_GUIDE.md) — sa ido kan lafiyar tsarin
- [RELEASE_CHECKLIST.md](./RELEASE_CHECKLIST.md) — tsarin fitarwa
- Tushe: `src/lib/db/` (fayiloli 80+, ~25K LOC)
