# Database Schema & Operations Guide (አማርኛ)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/DATABASE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/DATABASE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/DATABASE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/DATABASE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/DATABASE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/DATABASE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/DATABASE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/DATABASE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/DATABASE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/DATABASE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/DATABASE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/DATABASE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/DATABASE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/DATABASE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/DATABASE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/DATABASE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/DATABASE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/DATABASE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/DATABASE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/DATABASE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/DATABASE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/DATABASE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/DATABASE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/DATABASE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/DATABASE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/DATABASE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/DATABASE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/DATABASE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/DATABASE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/DATABASE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/DATABASE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/DATABASE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/DATABASE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/DATABASE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/DATABASE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/DATABASE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/DATABASE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/DATABASE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/DATABASE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/DATABASE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/DATABASE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/DATABASE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/DATABASE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/DATABASE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/DATABASE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/DATABASE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/DATABASE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/DATABASE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/DATABASE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/DATABASE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/DATABASE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/DATABASE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/DATABASE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/DATABASE_GUIDE.md)

---

> **TL;DR**: OmniRoute እንደ ዋና ማከማቻው **SQLite ከWAL journaling ጋር** ይጠቀማል፤ ለሚስጥራዊ መስኮች ደግሞ በማከማቻ ላይ **AES-256-GCM** ምስጠራን ይጠቀማል። ይህ መመሪያ schema፣ migrations፣ backup/recovery እና የክወና runbooksን ይሸፍናል።

**ምንጮች፦**

- `src/lib/db/core.ts` — singleton + SCHEMA_SQL (17 መሠረታዊ ሰንጠረዦች)
- `src/lib/db/migrationRunner.ts` — ስሪት ያላቸው migrations
- `src/lib/db/migrations/` — 167 ስሪት ያላቸው SQL ፋይሎች
- `src/lib/db/encryption.ts` — የምስጠራ አጋዥ ተግባራት
- `src/lib/db/backup.ts` — የbackup export/import
- `src/lib/db/healthCheck.ts` — የጤና ምርመራዎች

---

## SQLite ለምን?

OmniRoute በPostgreSQL/MySQL ፈንታ SQLiteን የመረጠው በበርካታ ምክንያቶች ነው፦

| መለኪያ               | SQLite                       | PostgreSQL                         |
| ------------------ | ---------------------------- | ---------------------------------- |
| **ማሰማራት**          | የተካተተ — የተለየ server አያስፈልግም  | የserver ቅንብር ያስፈልገዋል               |
| **ምስጠራ**           | በመተግበሪያ ደረጃ (AES-256-GCM)    | አብሮገነብ TDE                         |
| **አፈጻጸም**          | ለአነስተኛ/መካከለኛ የሥራ ጫናዎች ፈጣን    | ለእጅግ ብዙ በአንድ ጊዜ ለሚከናወኑ ጽሑፎች የተሻለ   |
| **ተመሳሳይ ጊዜ አጠቃቀም** | WAL mode በአንድ ጊዜ ማንበብን ይፈቅዳል | ሙሉ MVCC                            |
| **Backup**         | የአንድ ፋይል ቅጂ                  | `pg_dump` ወይም የfilesystem snapshot |
| **የአጠቃቀም ሁኔታ**     | ለእያንዳንዱ ተጠቃሚ የሚጫን፣ የተካተተ     | ባለብዙ ተከራይ SaaS                     |

ለ**አንድ ተጠቃሚ፣ አንድ instance** deployments (የOmniRoute ዋና የአጠቃቀም ሁኔታ)፣ SQLite ቀላልና ፈጣን ነው።

### WAL Journaling

`core.ts` databaseን በ**WAL (Write-Ahead Logging) mode** ይከፍታል፦

```ts
// src/lib/db/core.ts
db.pragma("journal_mode = WAL");
db.pragma("busy_timeout = 2000");
db.pragma("synchronous = NORMAL");
db.pragma(`cache_size = -${DEFAULT_DATABASE_SETTINGS.optimization.cacheSize}`);
```

WAL በጽሑፍ ሥራዎች ወቅት **በአንድ ጊዜ ማንበብን** ይፈቅዳል — ጥያቄዎች እየተመዘገቡ ሳለ query ለሚያደርገው dashboard ይህ አስፈላጊ ነው።

ነባሪው የcache መጠን **65,536 KiB (64 MiB)** ነው። SQLite አሉታዊ
`cache_size`ን በKiB እንደ ግምታዊ ከፍተኛ ገደብ ይተረጉማል እና ገጾችን እንደ አስፈላጊነቱ ይመድባል።
**Settings > System & Storage > Cache Size** ከ**1 እስከ
1,000,000 KiB** ያሉ ኢንቲጀር እሴቶችን ይቀበላል፤ ቅንብሩን ማስቀመጥ በቀጥታ በሚሠራው database connection ላይ ይተገብረዋል፣
እና OmniRoute ሲጀመር የተቀመጠውን እሴት መልሶ ይጭናል።

---

## የDatabase አካባቢ

የSQLite ፋይሉ የሚቀመጠው በ፦

| OS      | ዱካ                                                 |
| ------- | -------------------------------------------------- |
| Linux   | `~/.omniroute/storage.sqlite`                      |
| macOS   | `~/.omniroute/storage.sqlite`                      |
| Windows | `%USERPROFILE%\.omniroute\storage.sqlite`          |
| Docker  | `/app/data/storage.sqlite` (በ`DATA_DIR` ሊዋቀር ይችላል) |

ተጓዳኝ ፋይሎች፦

- `storage.sqlite-wal` — write-ahead log
- `storage.sqlite-shm` — የጋራ memory ፋይል
- `call_logs/` — የጥያቄ payload artifacts (ከነቃ)

**አካባቢውን መቀየር፦**

```bash
DATA_DIR=/custom/path omniroute
```

---

## የጎራ ሞጁል አርክቴክቸር

የOmniRoute የውሂብ ጎታ በ`src/lib/db/` ውስጥ **110 ከፍተኛ-ደረጃ TypeScript ሞጁሎች** አሉት። እያንዳንዱ የጎራ ሞጁል፦

- አንድ ወይም ከዚያ በላይ የተወሰኑ ሰንጠረዦችን ይቆጣጠራል
- ዓይነት-የተወሰነላቸው CRUD ተግባራትን ወደ ውጭ ይልካል
- የሌላ ሞጁል ሰንጠረዦችን ፈጽሞ አይነካም
- DBን ለመድረስ ከ`core.ts` የሚገኘውን `getDbInstance()` ይጠቀማል

### 110ዎቹ ከፍተኛ-ደረጃ DB ሞጁሎች

OmniRoute በ`src/lib/db/` ውስጥ **110 ከፍተኛ-ደረጃ TypeScript ፋይሎች** አሉት። ከዚህ በታች የዋና ሞጁሎች ናሙና ቀርቧል፤ ሙሉውን ዝርዝር ለማየት የማውጫውን ዝርዝር ይመልከቱ፦

| ሞጁል                     | ሰንጠረዦች                                                         | ኃላፊነት                                                  |
| ----------------------- | -------------------------------------------------------------- | ------------------------------------------------------ |
| `providers.ts`          | `provider_connections`                                         | የOAuth/API ቁልፍ አቅራቢ ምዝገባ እና የማረጋገጫ መረጃ                 |
| `models.ts`             | `key_value` (የሞዴል ውሂብ)                                         | የሞዴል ትርጓሜዎች፣ ችሎታዎች እና ዋጋ አወጣጥ                          |
| `combos.ts`             | `combos`                                                       | የጥምር ማዘዋወሪያ ውቅሮች እና ቅደም ተከተል                           |
| `apiKeys.ts`            | `api_keys`                                                     | የAPI ቁልፍ የሕይወት ዑደት፣ ወሰኖች እና የኮታ ክትትል                   |
| `settings.ts`           | `key_value`, `api_keys`, `combos`                              | የስርዓት ውቅር እና የጋራ KV ማከማቻ                               |
| `backup.ts`             | —                                                              | የምትኬ ወደ ውጭ መላክ/ከውጭ ማስገባት ክወናዎች                         |
| `proxies.ts`            | `proxy_registry`, `proxy_assignments`, `provider_connections`  | የፕሮክሲ ውቅሮች እና የማዘዋወሪያ ደንቦች                             |
| `prompts.ts`            | `prompt_templates`                                             | እንደገና ጥቅም ላይ የሚውሉ የጥያቄ አብነቶች እና ስሪት አስተዳደር             |
| `webhooks.ts`           | `webhooks`                                                     | በክስተት የሚነሱ የwebhook ምዝገባዎች እና ምዝግቦች                    |
| `detailedLogs.ts`       | `request_detail_logs`                                          | ለእያንዳንዱ ጥያቄ የኦዲት ምዝገባ (አማራጭ፣ ከፍተኛ መጠን ያለው)             |
| `domainState.ts`        | `domain_*` (5 ሰንጠረዦች)                                          | የጎራ በጀቶች፣ የወረዳ መቋረጫዎች፣ መቆለፊያዎች፣ ተተኪ ሰንሰለቶች እና የወጪ ታሪክ  |
| `registeredKeys.ts`     | `registered_keys`, `account_key_limits`, `provider_key_limits` | ለMCP/A2A በተፈቀደ ዝርዝር ውስጥ የገቡ API ቁልፎች                   |
| `quotaSnapshots.ts`     | `quota_snapshots`                                              | ታሪካዊ የኮታ አጠቃቀም                                         |
| `modelComboMappings.ts` | `model_combo_mappings`                                         | ሞዴሎችን ከነባሪ ጥምሮች ጋር ማዛመድ                                |
| `cliToolState.ts`       | `cli_tool_state`                                               | ለCLI የተወሰነ ዘላቂ ሁኔታ                                     |
| `encryption.ts`         | —                                                              | መስኮችን ለማመስጠር/ምስጠራቸውን ለመፍታት የሚረዱ መሳሪያዎች                 |
| `readCache.ts`          | —                                                              | ብዙ የንባብ ክወናዎች ባሏቸው ሂደቶች የሚያገለግል በማህደረ ትውስታ ውስጥ ያለ መሸጎጫ |
| `secrets.ts`            | `key_value` (የተመሰጠሩ ግቤቶች)                                      | የተመሰጠረ ሚስጥራዊ መረጃ ማከማቻ                                  |
| `stateReset.ts`         | —                                                              | ለሙከራ የDB ሁኔታን ማጽዳት/ዳግም ማስጀመር                           |
| `contextHandoffs.ts`    | `context_handoffs`                                             | ለወኪል ርክክብ የክፍለ ጊዜ አውድ                                  |
| `usage*.ts`             | `usage_history`, `call_logs`, `proxy_logs`                     | የአጠቃቀም ክትትል                                            |
| `compression*.ts`       | `compression_settings`, `compression_combos`                   | የመጭመቂያ ውቅር                                             |

### የሞጁል ወሰኖች

አንድ ዋና የአርክቴክቸር ደንብ፦ **ሞጁሎች የእርስ በርሳቸውን ሰንጠረዦች በቀጥታ አይደርሱም**። ከሌላ ሞጁል ውሂብ ጋር ለመስራት፣ ተግባሩን ከዚያ ሞጁል ያስመጡ።

```ts
// ❌ ስህተት፦ ከሌላ ሞጁል ቀጥተኛ SQL
db.prepare("SELECT * FROM provider_connections").all();

// ✅ ትክክል፦ የproviders ሞጁሉን ተግባር ይጠቀሙ
import { listProviders } from "@/lib/db/providers";
const providers = await listProviders();
```

ይህ ደንብ በኮድ ግምገማ ይተገበራል — የማይለዋወጥ ራስ-ሰር ማረጋገጫ የለም፣ ነገር ግን ጥሰቶች ምልክት ይደረግባቸዋል።

---

## መሠረታዊ ስኪማ (17 ሰንጠረዦች)

`core.ts` በ`SCHEMA_SQL` ውስጥ ያሉትን 17 መሠረታዊ ሰንጠረዦች ይገልጻል። እነዚህ በ`001_initial_schema.sql` ማይግሬሽን የሚፈጠሩ ሲሆን ዋናውን ስኪማ ይመሠርታሉ።

### ዋና ሰንጠረዦች (በመጀመሪያው ማይግሬሽን የተፈጠሩ)

| ሰንጠረዥ                      | ዓላማ                        | ቁልፍ ዓምዶች                                                                |
| -------------------------- | -------------------------- | ----------------------------------------------------------------------- |
| `provider_connections`     | የአቅራቢ ማረጋገጫ መረጃዎች (የተመሰጠሩ) | `id`, `provider`, `auth_type`, `api_key`, `is_active`                   |
| `provider_nodes`           | የአቅራቢ ኖድ ማስተላለፊያ መረጃ       | `id`, `type`, `name`, `base_url`, `created_at`                          |
| `key_value`                | አጠቃላይ የKV ማከማቻ             | `namespace`, `key`, `value`                                             |
| `combos`                   | የማስተላለፊያ ጥምረት ትርጓሜዎች       | `id`, `name`, `data`, `sort_order`                                      |
| `api_keys`                 | ለጌትዌዩ የሚያገለግሉ API ቁልፎች     | `id`, `name`, `key`, `machine_id`, `allowed_models`                     |
| `db_meta`                  | የውሂብ ጎታ ሜታዳታ               | `key`, `value`                                                          |
| `usage_history`            | የጥያቄ አጠቃቀም መዝገቦች           | `id`, `provider`, `model`, `tokens_input`, `tokens_output`, `timestamp` |
| `call_logs`                | የጥያቄ ይዘቶች እና ምላሾች          | `id`, `timestamp`, `status`, `model`, `provider`, `latency_ms`          |
| `proxy_logs`               | የፕሮክሲ ጥያቄ ምዝግቦች            | `id`, `timestamp`, `proxy_type`, `status`, `provider`                   |
| `domain_fallback_chains`   | ከሞዴል ወደ አቅራቢ የሚወስዱ ሰንሰለቶች  | `model`, `chain`                                                        |
| `domain_budgets`           | ለእያንዳንዱ ጎራ የወጪ በጀቶች        | `api_key_id`, `daily_limit_usd`, `warning_threshold`, `reset_interval`  |
| `domain_budget_reset_logs` | የበጀት ዳግም ማስጀመር ታሪክ         | `id`, `api_key_id`, `reset_interval`, `previous_spend`, `reset_at`      |
| `domain_cost_history`      | የእያንዳንዱ ጎራ ወጪ ክትትል         | `id`, `api_key_id`, `cost`, `timestamp`                                 |
| `domain_lockout_state`     | የጎራ ፍጥነት ገደብ ሁኔታ           | `identifier`, `attempts`, `locked_until`                                |
| `domain_circuit_breakers`  | የእያንዳንዱ ጎራ ሰርኪት መቆራረጫ ሁኔታ  | `name`, `state`, `failure_count`, `last_failure_time`                   |
| `semantic_cache`           | የLLM ምላሽ መሸጎጫ              | `id`, `signature`, `model`, `prompt_hash`, `response`                   |
| `quota_snapshots`          | ታሪካዊ የኮታ ቅጽበተ-ምስሎች         | `id`, `provider`, `connection_id`, `window_key`, `remaining_percentage` |

### ተጨማሪ ሰንጠረዦች (በኋለኞቹ ማይግሬሽኖች የታከሉ)

ቀጣይ ማይግሬሽኖች እንደሚከተሉት ያሉ ሰንጠረዦችን ይጨምራሉ፦

- `cli_tool_state` (ማይግሬሽን 011) — የCLI መሣሪያ ሁኔታ
- `mcp_*` ሰንጠረዦች — የMCP አገልጋይ ኦዲት
- `a2a_*` ሰንጠረዦች — የA2A ተግባር ሁኔታ
- `usage_*` ሰንጠረዦች — የአጠቃቀም ክትትል
- `plugin_*` ሰንጠረዦች — የፕለጊን ሥርዓት
- `skill_executions` — የክህሎት አፈጻጸም ታሪክ
- `memory_*` ሰንጠረዦች — የማህደረ ትውስታ ሥርዓት
- `compression_*` ሰንጠረዦች — የማመቅ ሥርዓት
- `webhook_*` ሰንጠረዦች — የwebhook ማድረሻ ምዝግብ
- `acp_*` ሰንጠረዦች — የወኪል ደንበኛ ፕሮቶኮል
- `oneproxy_*` ሰንጠረዦች — የ1proxy የገበያ ቦታ
- `proxy_assignments` — የፕሮክሲ ወሰን ትስስሮች
- `detailed_call_artifacts` — የጥሪ ምዝግብ አርቲፋክቶች ሜታዳታ
- `quota_alert_history` — የኮታ ማንቂያ ኦዲት
- `command_code_auth_sessions` — የCommand Code OAuth ክፍለ-ጊዜዎች

የ~30+ ሰንጠረዦች ሙሉ ዝርዝር በ`src/lib/db/migrations/` ውስጥ ይገኛል።

---

## ማይግሬሽኖች

OmniRoute በ`src/lib/db/migrations/` ውስጥ **የስሪት ቁጥር ያላቸው፣ ዳግም ቢሄዱም ተመሳሳይ ውጤት የሚሰጡ ማይግሬሽኖችን** ይጠቀማል። እያንዳንዱ ማይግሬሽን `NNN_description.sql` ተብሎ የተሰየመ አንድ SQL ፋይል ነው።

### የማይግሬሽን አሰያየም

```
001_initial_schema.sql
002_mcp_a2a_tables.sql
003_provider_node_custom_paths.sql
...
021_combo_call_log_targets.sql
```

### ማይግሬሽኖች እንዴት እንደሚሄዱ

ሲጀመር `migrationRunner.ts`፦

1. ካልነበረ የ`_omniroute_migrations` ሰንጠረዥን ይፈጥራል
2. ከዚህ ቀደም የተተገበሩ ማይግሬሽኖችን ይጠይቃል
3. ማናቸውንም አዲስ ማይግሬሽኖች በቅደም ተከተል፣ እያንዳንዳቸውን በአንድ transaction ውስጥ ይተገብራል
4. እያንዳንዱን የተተገበረ ማይግሬሽን ከtimestamp ጋር ይመዘግባል

```ts
// src/lib/db/migrationRunner.ts (ቀለል ያለ)
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

### ዳግም ሲሄዱ ተመሳሳይ ውጤት መስጠት

ማይግሬሽኖች **ዳግም ቢሄዱም ተመሳሳይ ውጤት የሚሰጡ** መሆን አለባቸው — ሁለት ጊዜ ማስኬድ ምንም ተግባር ሊፈጽም አይገባም፦

```sql
-- 004_proxy_registry.sql
CREATE TABLE IF NOT EXISTS proxy_registry (
  id TEXT PRIMARY KEY,
  host TEXT NOT NULL,
  port INTEGER NOT NULL,
  ...
);
```

የ`IF NOT EXISTS`፣ `IF EXISTS` እና `OR IGNORE` / `OR REPLACE` clausesን በስፋት ይጠቀሙ።

### አዲስ ማይግሬሽን ማከል

1. **ቀጣዩን ቁጥር ይለዩ**፦ `ls src/lib/db/migrations/ | tail -1`
2. **ፋይሉን ይፍጠሩ**፦ `NNN_my_change.sql`
3. **ደህንነቱ የተጠበቀ DDL ይጠቀሙ**፦ `CREATE TABLE IF NOT EXISTS`፣ `ALTER TABLE ... ADD COLUMN`
4. **ውሂብን በጥንቃቄ ወደ ኋላ ይሙሉ**፦ ነባር rowsን ለማስተናገድ `UPDATE ... WHERE ...` ይጠቀሙ
5. **በቅጂ ላይ ይፈትሹ**፦ ያልተፈተሹ ማይግሬሽኖችን በproduction ላይ ፈጽሞ አያስኪዱ

ምሳሌ፦

```sql
-- 022_add_combo_priority.sql
ALTER TABLE combos ADD COLUMN priority INTEGER DEFAULT 100;
UPDATE combos SET priority = 100 WHERE priority IS NULL;
CREATE INDEX IF NOT EXISTS idx_combos_priority ON combos(priority);
```

> **ከቀድሞ ስሪቶች ጋር የማይጣጣሙ ለውጦች** (ለምሳሌ፣ columnsን ማስወገድ) አስቸጋሪ ናቸው። OmniRoute downgradeን አይደግፍም — አንዴ ማይግሬሽን ከተተገበረ በኋላ የschemaው ለውጥ ቋሚ ነው። በዚህ መሠረት ያቅዱ።

---

## በማከማቻ ውስጥ ምስጠራ

ሚስጥራዊ fields (API keys፣ OAuth tokens፣ connection strings) **AES-256-GCM**ን በመጠቀም በማከማቻ ውስጥ ይመሰጠራሉ።

### እንዴት እንደሚሠራ

```ts
// src/lib/db/encryption.ts (ቀለል ያለ)
const key = deriveKeyFromPassphrase(passphrase, salt);
const iv = randomBytes(12);
const cipher = createCipheriv("aes-256-gcm", key, iv);
const encrypted = Buffer.concat([cipher.update(plaintext), cipher.final()]);
const authTag = cipher.getAuthTag();
return { encrypted, iv, authTag };
```

### የት እንደሚጠቀም

- `provider_connections.api_key` — በapplication ደረጃ የተመሰጠረ
- `provider_connections.access_token`, `refresh_token`, `id_token` — በapplication ደረጃ የተመሰጠሩ
- `namespace = "secrets"` ያላቸው `key_value` entries — በapplication ደረጃ የተመሰጠሩ
- `proxy_registry.auth` — ካለ በapplication ደረጃ የተመሰጠረ

### የምስጠራ ቁልፍ

የምስጠራ ቁልፉ ከ**passphrase** (በ`STORAGE_ENCRYPTION_KEY` env var በኩል ከሚዘጋጅ) እና ከ**salt** (በDB ውስጥ ከሚከማች) ይመነጫል። ውሂብን ለመፍታት ሁለቱም ያስፈልጋሉ።

```bash
# ደህንነቱ የተጠበቀ passphrase ይፍጠሩ
openssl rand -hex 32

# በ.env ውስጥ ያዘጋጁ
STORAGE_ENCRYPTION_KEY=<your-key>
```

> **ወሳኝ**፦ የምስጠራ ቁልፉን ማጣት ሁሉንም የተመሰጠረ ውሂብ የመድረስ ችሎታን ማጣት ማለት ነው። **ቁልፉን ከdatabaseው ተለይቶ ምትኬ ይያዙ**።

### የማይመሰጠሩ ነገሮች

ለአፈጻጸም ሲባል፣ የሚከተሉት በplaintext ይከማቻሉ፦

- የProvider ማሳያ ስሞች
- የModel ትርጓሜዎች (ከወዲሁ ይፋዊ ናቸው)
- የRouting ደንቦች
- የUsage መዝገቦች (PII የለም)

---

## የምስጠራ ጥንቃቄዎች (v3.8.16+)

OmniRoute ሁለት የምስጠራ ዘዴዎችን በግልጽነት ለማስተናገድ **`migrateLegacyEncryptedString()`**ን ይጠቀማል፦

- **የቀድሞ** (ከ-v3.5.0 በፊት)፦ በXOR ላይ የተመሠረተ "ምስጠራ" (እውነተኛ ክሪፕቶግራፊ አይደለም)
- **የአሁኑ**፦ AES-256-GCM ከትክክለኛ IV እና የማረጋገጫ መለያ ጋር

የፍልሰት አጋዡ የቀድሞውን ቅርጸት በመለየት በመጀመሪያው ንባብ በአዲሱ ዘዴ እንደገና ያመሰጥረዋል። ይህም ማረጋገጫ መረጃዎችን ሳያጡ የቆየ የውሂብ ጎታን ማሻሻል እንዲችሉ ያደርጋል።

---

## የንባብ መሸጎጫ

በተደጋጋሚ ለሚነበብ ውሂብ (ሞዴሎች፣ አቅራቢዎች፣ ቅንብሮች)፣ `readCache.ts` **በማህደረ ትውስታ ውስጥ የሚገኝ መሸጎጫ** ያቀርባል፦

```ts
// ሲጀመር ይሸጎጣል፣ ሲጻፍ ዋጋ አልባ ይሆናል
const providers = await getCachedProviders(); // ፈጣን፣ በማህደረ ትውስታ ውስጥ
const fresh = await listProviders(); // ዘገምተኛ፣ DBን ይደርሳል
```

| የተሸጎጠ አካል              | የመሸጎጫ ቁልፍ      | TTL        |
| ---------------------- | -------------- | ---------- |
| `models`               | `models:v1`    | እስከሚጻፍ ድረስ |
| `provider_connections` | `providers:v1` | እስከሚጻፍ ድረስ |
| `settings`             | `settings:v1`  | እስከሚጻፍ ድረስ |
| `combos`               | `combos:v1`    | እስከሚጻፍ ድረስ |

በተዛማጁ ሰንጠረዥ ላይ በሚደረግ እያንዳንዱ ጽሑፍ መሸጎጫው ዋጋ አልባ ይደረጋል።

---

## ምትኬ እና መልሶ ማግኘት

### በእጅ የሚደረግ ምትኬ

```bash
# አካባቢያዊ ምትኬ ለመፍጠር CLIን ይጠቀሙ
omniroute backup create --name pre-migration

# ወይም በAPI በኩል
curl -X PUT http://localhost:20128/api/db-backups \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

የምትኬ ፋይሉ የሚከተሉትን ያካትታል፦

- ሁሉንም የDB ሰንጠረዦች (ወደ JSON የተከታተሉ)
- የጥሪ ምዝግብ ቅርሶች (በbase64 የተመሰጠሩ፣ አማራጭ)
- ቅንብሮች + ሚስጥሮች (የተመሰጠሩ)
- የተሰኪ ውቅር

### መልሶ ማግኘት

```bash
# በCLI በኩል
omniroute restore pre-migration

# በAPI በኩል
curl -X POST http://localhost:20128/api/db-backups/restore \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

> **ማስጠንቀቂያ**፦ መልሶ ማግኘት መላውን DB ይተካል። በመጀመሪያ ሁሉንም ደንበኞች ያቁሙ።

### ራስ-ሰር ምትኬዎች

```bash
# በCLI በኩል ራስ-ሰር ዕለታዊ ምትኬዎችን ያንቁ
omniroute backup auto enable --cron "0 2 * * *" --retention 7
```

መርሐግብሩ በየ30 ሰከንዱ በሚሠራ የበስተጀርባ ሥራ
(ነባሪ) በአገልጋዩ በኩል ይከናወናል፣ እንዲሁም የcron አገላለጹን ከአካባቢያዊ የአገልጋይ ሰዓት አንጻር ይገመግማል።

| ተለዋዋጭ                                       | ነባሪ     | መግለጫ                                                                                     |
| ------------------------------------------- | ------- | ---------------------------------------------------------------------------------------- |
| `OMNIROUTE_BACKUP_SCHEDULE_JOB_INTERVAL_MS` | `30000` | የምልክት ክፍተት በms (ዝቅተኛው `5000`)። በተዛማጁ የcron ደቂቃ ውስጥ በአስተማማኝ ሁኔታ ለመግባት ከ60 s ያነሰ መሆን አለበት። |

### SQLite ትኩስ ምትኬ

የቀጥታ DBን ያለ የአገልግሎት መቋረጥ ለመጠባበቅ፦

```bash
sqlite3 ~/.omniroute/storage.sqlite ".backup /backups/omniroute-hot.db"
```

ይህ የSQLiteን የመስመር ላይ ምትኬ API ይጠቀማል — OmniRoute እየሠራ ሳለ ማስኬዱ ደህንነቱ የተጠበቀ ነው።

---

## የአፈጻጸም ማስተካከያ

### WAL ሁነታ

WAL በነባሪነት ነቅቷል። ብዙ የጽሑፍ ሥራዎች ላሏቸው ጭነቶች፣ የሚከተለውን ያስቡበት፦

```sql
PRAGMA wal_autocheckpoint = 1000;  -- በየ1000 ገጾች Checkpoint ያድርጉ
PRAGMA journal_size_limit = 67108864;  -- 64MB የWAL ገደብ
```

### ማውጫዎች

ለአፈጻጸም ቁልፍ የሆኑ ማውጫዎች (በማይግሬሽኖች በራስ-ሰር የሚፈጠሩ)፦

- `idx_models_provider` — በአቅራቢ የሞዴል ፍለጋዎች
- `idx_combo_targets_combo_id` — የኮምቦ ዒላማ ማስፋፊያ
- `idx_usage_history_api_key_timestamp` — የአጠቃቀም ትንታኔ
- `idx_quota_snapshots_api_key_window` — የኮታ ክትትል
- `idx_call_logs_timestamp` — የጥሪ ምዝግብ መጠይቆች

አዲስ ማውጫ ለመጨመር፣ ማይግሬሽን ይፍጠሩ፦

```sql
-- 023_add_my_index.sql
CREATE INDEX IF NOT EXISTS idx_my_table_my_column ON my_table(my_column);
```

### በማህደረ ትውስታ የተሰናሰለ I/O

በጣም ትልቅ ለሆኑ የውሂብ ጎታዎች (>10GB)፣ የማህደረ ትውስታ ስነዳውን በSQLite pragma በኩል ማስተካከል ይቻላል፦

```sql
-- በSQLite pragma በኩል ያዘጋጁ (በcore.ts ወይም በruntime ውስጥ ያስተካክሉ)
PRAGMA mmap_size = 268435456;  -- 256MB
```

### ማጠቃለያ

ለረጅም ጊዜ የሚሰሩ የOmniRoute ኢንስታንሶች አልፎ አልፎ `VACUUM` በማድረግ ይጠቀማሉ፦

```bash
sqlite3 ~/.omniroute/storage.sqlite "VACUUM;"
```

ትራፊክ ዝቅተኛ በሆነባቸው ጊዜያት በየወሩ ያስኪዱት። (WAL ሁነታ ፍላጎቱን ይቀንሳል፣ ነገር ግን ሙሉ በሙሉ አያስወግደውም።)

---

## የጤና ምርመራ

`src/lib/db/healthCheck.ts` **በDB ደረጃ የጤና ምርመራዎችን** ያቀርባል፦

ሁለቱም ግሶች ማረጋገጫ ይፈልጋሉ (ካልሆነ `401`)። `GET` ምርመራ ብቻ ያደርጋል፤ `POST` ደግሞ
`autoRepair` ነቅቶ ተመሳሳዩን ምርመራ ያስኬዳል።

```bash
GET  /api/db/health   # ምርመራ
POST /api/db/health   # ምርመራ + ጥገና
```

ምላሹ በ`runDbHealthCheck()` የሚፈጠረው `DbHealthCheckResult` ነው
(`src/lib/db/healthCheck.ts`)፦

```json
{
  "isHealthy": false,
  "issues": [
    {
      "type": "broken_reference",
      "table": "domain_budgets",
      "description": "የጎራ በጀቶች ከአሁን በኋላ የሌሉ API ቁልፎችን ዋቢ አድርገዋል።",
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

| መስክ               | ትርጉም                                                                                                                 |
| ----------------- | -------------------------------------------------------------------------------------------------------------------- |
| `isHealthy`       | `issues` ባዶ ሲሆን `true` ነው። `driver` በምንም ጊዜ ተጽዕኖ አያሳድርበትም።                                                           |
| `issues[].type`   | ከ`integrity_check_failed`፣ `broken_reference`፣ `stale_snapshot`፣ `invalid_state` አንዱ።                                |
| `repairedCount`   | በዚህ ማስኬጃ ወቅት የተጠገኑ ረድፎች፤ `autoRepair` false ሲሆን ሁልጊዜ `0` ነው።                                                         |
| `backupCreated`   | ከጥገናው በፊት ምትኬ ተወስዶ እንደሆነ።                                                                                            |
| `checkedAt`       | ማስኬጃው እና የሚጽፈው ማንኛውም የጥገና ማስታወሻ የሚጋሩት ISO የጊዜ ማኅተም።                                                                  |
| `driver.name`     | የተመረመረውን የውሂብ ጎታ የሚያገለግለው SQLite driver።                                                                             |
| `driver.degraded` | ጽሑፎች በውሂብ ጎታው ፋይል በዘላቂነት የማይደገፉ ሲሆን `true` ነው — የ`sql.js` WASM አማራጭ (የሙሉ ፋይል ቋሚ ማከማቻ) ወይም በማህደረ ትውስታ ውስጥ ያለ የውሂብ ጎታ። |

ተመሳሳዩ ይዘት በ`omniroute_db_health_check` MCP መሣሪያም ይመለሳል።

ብልሽትን ለመለየት `PRAGMA integrity_check`ን ያስኪዱ፦

```bash
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"
# ይህን ማተም አለበት፦ ok
```

ከ`ok` ውጭ ማንኛውንም ነገር ከመለሰ፣ **የውሂብ ጎታውን መጠቀም ወዲያውኑ ያቁሙ** እና ከምትኬ ይመልሱት።

---

## ከአደጋ መልሶ ማግኘት

### ሁኔታ 1፦ የWAL ፋይል ጠፍቷል

የ`-wal` ፋይሉ ጠፍቷል፣ ነገር ግን `-shm` እና ዋናው DB ሳይበላሹ አሉ፦

```bash
# በሚቀጥለው ጊዜ ሲከፈት በራስ-ሰር መልሶ ያገኛል
omniroute
```

SQLite በራስ-ሰር መልሶ ማግኘት ካልቻለ፦

```bash
sqlite3 ~/.omniroute/storage.sqlite ".recover" > recovered.sql
sqlite3 recovered.db < recovered.sql
mv recovered.db ~/.omniroute/storage.sqlite
```

### ሁኔታ 2፦ ዋናው የDB ፋይል ተበላሽቷል

ከመጠባበቂያ ቅጂ ወደነበረበት ይመልሱ፦

```bash
omniroute sync pull --merge   # ወይም፦ omniroute backup restore <backup-id>
```

### ሁኔታ 3፦ የምስጠራ ቁልፍ ጠፍቷል

ያለ ቁልፉ **መልሶ ማግኘት አይቻልም**። የተመሰጠሩት መስኮች ሊነበቡ አይችሉም። ሁሉንም አቅራቢዎች በአዲስ ማረጋገጫዎች በእጅ እንደገና ያክሉ።

> **መከላከያ**፦ ሁልጊዜ የምስጠራ ቁልፉን ለብቻው መጠባበቂያ ቅጂ ያስቀምጡ፤ በተሻለ ሁኔታ በየይለፍ ቃል አስተዳዳሪ ወይም KMS ውስጥ።

### ሁኔታ 4፦ ዲስኩ ሞልቷል

SQLite የ`SQLITE_FULL` ስህተቶችን ይመልሳል። የዲስክ ቦታ ነፃ ያድርጉ፣ ከዚያ፦

```bash
# ቦታ ነፃ ለማድረግ WALን የማረጋገጫ ነጥብ ያከናውኑ
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA wal_checkpoint(TRUNCATE);"
```

---

## የተለመዱ ክዋኔዎች

### ሰንጠረዥን መመርመር

```bash
sqlite3 ~/.omniroute/storage.sqlite "SELECT * FROM api_keys LIMIT 5;"
```

### በሁሉም ሰንጠረዦች ውስጥ ያሉ ረድፎችን መቁጠር

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';
EOF
```

### ሁሉንም ውሂብ ዳግም ማስጀመር (ማጥፋት)

```bash
# መጀመሪያ OmniRouteን ያቁሙ
omniroute stop

# የDB ፋይሉን ይሰርዙ
rm ~/.omniroute/storage.sqlite*

# እንደገና ያስጀምሩ (ባዶ DB እንደገና ይፈጥራል)
omniroute
```

ለ**ተመራጭ** ዳግም ማስጀመር (አቅራቢዎችን አቆይቶ የአጠቃቀም ውሂብን ለማጥፋት)፦

```bash
DELETE FROM usage_history WHERE timestamp < datetime('now', '-30 day');
DELETE FROM call_logs WHERE timestamp < datetime('now', '-30 day');
DELETE FROM proxy_logs WHERE timestamp < datetime('now', '-30 day');
```

### አንድ ሰንጠረዥ ወደ ውጭ መላክ

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
.mode csv
.output api_keys.csv
SELECT * FROM api_keys;
EOF
```

---

## ችግር ፍቺ

### "የውሂብ ጎታው ተቆልፏል"

ሌላ ሂደት የመጻፍ መቆለፊያ ይዟል። ከሚከተሉት አንዱን ያድርጉ፦

- ሌላው ሂደት እስኪጠናቀቅ ይጠብቁ (`lsof | grep storage.sqlite`ን ይፈትሹ)
- ሌላውን ሂደት ያቋርጡ
- ችግሩ ከቀጠለ OmniRouteን እንደገና ያስጀምሩ

### "የውጭ ቁልፍ ገደብ አልተሳካም"

አንድ የጎራ ሞጁል የማጣቀሻ ታማኝነትን እየጣሰ ነው። የሚከተሉትን ይፈትሹ፦

- በጥገኛ ሰንጠረዦች ውስጥ ያሉ ወላጅ-አልባ ረድፎች
- ያልተሰራጩ ተከታታይ ስረዛዎች
- የውጭ ቁልፍን የቀየረ የቅርብ ጊዜ ፍልሰት

ጥሰቶችን ለማግኘት `PRAGMA foreign_key_check;`ን ያስኪዱ።

### "የማህደረ ትውስታ እጥረት"

የSQLite በማህደረ ትውስታ ላይ የተመሠረተ I/O የOS ገደቡን እያለፈ ነው። በSQLite pragma በኩል ይቀንሱት፦

```sql
PRAGMA mmap_size = 134217728;  -- ከ256MB ይልቅ 128MB
```

ወይም ያሰናክሉት፦

```sql
PRAGMA mmap_size = 0;
```

### "ፍልሰቱ በመካከል አልተሳካም"

ፍልሰቱ በግብይት ውስጥ የተከናወነ ስለሆነ ወደ ነበረበት መመለስ ነበረበት። ካልተመለሰ፦

1. **OmniRouteን ያቁሙ** (ተጨማሪ ሙከራዎችን ለመከላከል)
2. **የDBውን ሁኔታ ይፈትሹ** `sqlite3`ን በመጠቀም
3. **በእጅ ያስተካክሉ** ከፊል ፍልሰቱን
4. **እንደገና ያስኪዱ** OmniRouteን (ፍልሰቱ እንደገና ይሞከራል)

ይህን ለመከላከል ሁልጊዜ ፍልሰቶችን መጀመሪያ በቅጂ ላይ ይፈትሹ።

---

## በተጨማሪ ይመልከቱ

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — የአጠቃቀም ሰንጠረዦች
- [MONITORING_GUIDE.md](./MONITORING_GUIDE.md) — የጤንነት ክትትል
- [RELEASE_CHECKLIST.md](./RELEASE_CHECKLIST.md) — የልቀት ፍሰት
- ምንጭ፦ `src/lib/db/` (80+ ፋይሎች፣ ~25K LOC)
