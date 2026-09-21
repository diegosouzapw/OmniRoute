# Database Schema & Operations Guide (ខ្មែរ)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/DATABASE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/DATABASE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/DATABASE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/DATABASE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/DATABASE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/DATABASE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/DATABASE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/DATABASE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/DATABASE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/DATABASE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/DATABASE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/DATABASE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/DATABASE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/DATABASE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/DATABASE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/DATABASE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/DATABASE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/DATABASE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/DATABASE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/DATABASE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/DATABASE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/DATABASE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/DATABASE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/DATABASE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/DATABASE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/DATABASE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/DATABASE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/DATABASE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/DATABASE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/DATABASE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/DATABASE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/DATABASE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/DATABASE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/DATABASE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/DATABASE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/DATABASE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/DATABASE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/DATABASE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/DATABASE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/DATABASE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/DATABASE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/DATABASE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/DATABASE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/DATABASE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/DATABASE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/DATABASE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/DATABASE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/DATABASE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/DATABASE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/DATABASE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/DATABASE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/DATABASE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/DATABASE_GUIDE.md)

---

> **TL;DR**: OmniRoute ប្រើ **SQLite ជាមួយ WAL journaling** ជាឃ្លាំងទិន្នន័យចម្បងរបស់វា ហើយប្រើការអ៊ិនគ្រីប **AES-256-GCM** សម្រាប់ទិន្នន័យសម្ងាត់ដែលរក្សាទុក។ មគ្គុទ្ទេសក៍នេះគ្របដណ្តប់លើ schema, migrations, ការបម្រុងទុក/ការសង្គ្រោះ និងសៀវភៅណែនាំប្រតិបត្តិការ។

**ប្រភព៖**

- `src/lib/db/core.ts` — singleton + SCHEMA_SQL (តារាងមូលដ្ឋានចំនួន 17)
- `src/lib/db/migrationRunner.ts` — migrations ដែលមានលេខកំណែ
- `src/lib/db/migrations/` — ឯកសារ SQL ដែលមានលេខកំណែចំនួន 167
- `src/lib/db/encryption.ts` — ឧបករណ៍ជំនួយសម្រាប់ការអ៊ិនគ្រីប
- `src/lib/db/backup.ts` — ការនាំចេញ/នាំចូលទិន្នន័យបម្រុង
- `src/lib/db/healthCheck.ts` — ការវិនិច្ឆ័យស្ថានភាពប្រព័ន្ធ

---

## ហេតុអ្វីបានជាប្រើ SQLite?

OmniRoute បានជ្រើសរើស SQLite ជំនួសឱ្យ PostgreSQL/MySQL ដោយសារហេតុផលមួយចំនួន៖

| កត្តា                   | SQLite                                               | PostgreSQL                                         |
| ----------------------- | ---------------------------------------------------- | -------------------------------------------------- |
| **ការដាក់ឱ្យដំណើរការ**  | បង្កប់ក្នុងកម្មវិធី — មិនត្រូវការម៉ាស៊ីនមេដាច់ដោយឡែក | តម្រូវឱ្យរៀបចំម៉ាស៊ីនមេ                            |
| **ការអ៊ិនគ្រីប**        | កម្រិតកម្មវិធី (AES-256-GCM)                         | TDE ដែលមានស្រាប់                                   |
| **ដំណើរការ**            | លឿនជាងសម្រាប់បន្ទុកការងារតូច/មធ្យម                   | ប្រសើរជាងសម្រាប់ការសរសេរព្រមគ្នាក្នុងបរិមាណដ៏ច្រើន |
| **ការដំណើរការព្រមគ្នា** | របៀប WAL អនុញ្ញាតឱ្យអានព្រមគ្នា                      | MVCC ពេញលេញ                                        |
| **ការបម្រុងទុក**        | ចម្លងឯកសារតែមួយ                                      | `pg_dump` ឬ snapshot នៃប្រព័ន្ធឯកសារ               |
| **ករណីប្រើប្រាស់**      | ការដំឡើងសម្រាប់អ្នកប្រើម្នាក់ និងបង្កប់ក្នុងកម្មវិធី | SaaS សម្រាប់អ្នកជួលច្រើន                           |

សម្រាប់ការដាក់ឱ្យដំណើរការ **អ្នកប្រើម្នាក់ និង instance តែមួយ** (ករណីប្រើប្រាស់ចម្បងរបស់ OmniRoute) SQLite មានភាពសាមញ្ញ និងលឿនជាង។

### WAL Journaling

`core.ts` បើកមូលដ្ឋានទិន្នន័យដោយប្រើ **របៀប WAL (Write-Ahead Logging)**៖

```ts
// src/lib/db/core.ts
db.pragma("journal_mode = WAL");
db.pragma("busy_timeout = 2000");
db.pragma("synchronous = NORMAL");
db.pragma(`cache_size = -${DEFAULT_DATABASE_SETTINGS.optimization.cacheSize}`);
```

WAL អនុញ្ញាតឱ្យមាន **ការអានព្រមគ្នា** ខណៈពេលកំពុងសរសេរ — វាសំខាន់សម្រាប់ dashboard ដែលធ្វើ query ខណៈពេល request កំពុងត្រូវបានកត់ត្រា។

ទំហំ cache លំនាំដើមគឺ **65,536 KiB (64 MiB)**។ SQLite បកស្រាយតម្លៃអវិជ្ជមាននៃ
`cache_size` ជាដែនកំណត់ខាងលើប្រហាក់ប្រហែលគិតជា KiB ហើយបែងចែក page តាមតម្រូវការ។
**Settings > System & Storage > Cache Size** ទទួលយកតម្លៃចំនួនគត់ចាប់ពី **1 ដល់
1,000,000 KiB**; ការរក្សាទុកការកំណត់នេះនឹងអនុវត្តវាទៅលើការតភ្ជាប់មូលដ្ឋានទិន្នន័យដែលកំពុងដំណើរការ
ហើយ OmniRoute នឹងស្ដារតម្លៃដែលបានរក្សាទុកនៅពេលចាប់ផ្ដើម។

---

## ទីតាំងមូលដ្ឋានទិន្នន័យ

ឯកសារ SQLite ត្រូវបានរក្សាទុកនៅ៖

| OS      | ផ្លូវ                                                              |
| ------- | ------------------------------------------------------------------ |
| Linux   | `~/.omniroute/storage.sqlite`                                      |
| macOS   | `~/.omniroute/storage.sqlite`                                      |
| Windows | `%USERPROFILE%\.omniroute\storage.sqlite`                          |
| Docker  | `/app/data/storage.sqlite` (អាចកំណត់រចនាសម្ព័ន្ធតាមរយៈ `DATA_DIR`) |

ឯកសារ និងថតរួម៖

- `storage.sqlite-wal` — write-ahead log
- `storage.sqlite-shm` — ឯកសារ shared memory
- `call_logs/` — ឯកសារទិន្នន័យ request payload (ប្រសិនបើបានបើក)

**ប្ដូរទីតាំង៖**

```bash
DATA_DIR=/custom/path omniroute
```

---

## ស្ថាបត្យកម្មម៉ូឌុលដែន

មូលដ្ឋានទិន្នន័យរបស់ OmniRoute មាន **ម៉ូឌុល TypeScript កម្រិតកំពូលចំនួន 110** នៅក្នុង `src/lib/db/`។ ម៉ូឌុលដែននីមួយៗ៖

- គ្រប់គ្រងតារាងជាក់លាក់មួយ ឬច្រើន
- នាំចេញអនុគមន៍ CRUD ដែលមានប្រភេទច្បាស់លាស់
- មិនដែលប៉ះពាល់តារាងរបស់ម៉ូឌុលផ្សេង
- ប្រើ `getDbInstance()` ពី `core.ts` ដើម្បីចូលប្រើ DB

### ម៉ូឌុល DB កម្រិតកំពូលទាំង 110

OmniRoute មាន **ឯកសារ TypeScript កម្រិតកំពូលចំនួន 110** នៅក្នុង `src/lib/db/`។ ខាងក្រោមនេះជាគំរូមួយចំនួននៃម៉ូឌុលស្នូល។ សូមមើលបញ្ជីថតសម្រាប់បញ្ជីពេញលេញ៖

| ម៉ូឌុល                  | តារាង                                                          | ការទទួលខុសត្រូវ                                                            |
| ----------------------- | -------------------------------------------------------------- | -------------------------------------------------------------------------- |
| `providers.ts`          | `provider_connections`                                         | ការចុះឈ្មោះអ្នកផ្តល់សេវាតាម OAuth/API key និងព័ត៌មានសម្ងាត់                |
| `models.ts`             | `key_value` (ទិន្នន័យម៉ូដែល)                                   | និយមន័យម៉ូដែល សមត្ថភាព និងការកំណត់តម្លៃ                                    |
| `combos.ts`             | `combos`                                                       | ការកំណត់រចនាសម្ព័ន្ធ និងលំដាប់ routing សម្រាប់ combo                       |
| `apiKeys.ts`            | `api_keys`                                                     | វដ្តជីវិត API key, scopes និងការតាមដាន quota                               |
| `settings.ts`           | `key_value`, `api_keys`, `combos`                              | ការកំណត់រចនាសម្ព័ន្ធប្រព័ន្ធ និងកន្លែងផ្ទុក KV រួម                         |
| `backup.ts`             | —                                                              | ប្រតិបត្តិការនាំចេញ/នាំចូលទិន្នន័យបម្រុង                                   |
| `proxies.ts`            | `proxy_registry`, `proxy_assignments`, `provider_connections`  | ការកំណត់រចនាសម្ព័ន្ធ proxy និងច្បាប់ routing                               |
| `prompts.ts`            | `prompt_templates`                                             | គំរូ prompt ដែលអាចប្រើឡើងវិញបាន និងការគ្រប់គ្រងកំណែ                        |
| `webhooks.ts`           | `webhooks`                                                     | ការជាវ webhook ដែលដំណើរការតាមព្រឹត្តិការណ៍ និងកំណត់ហេតុ                    |
| `detailedLogs.ts`       | `request_detail_logs`                                          | ការកត់ត្រាសវនកម្មតាមសំណើនីមួយៗ (ជាជម្រើស និងមានបរិមាណខ្ពស់)                |
| `domainState.ts`        | `domain_*` (5 តារាង)                                           | ថវិកាដែន, circuit breakers, lockouts, fallback chains និងប្រវត្តិថ្លៃចំណាយ |
| `registeredKeys.ts`     | `registered_keys`, `account_key_limits`, `provider_key_limits` | API keys ដែលបានអនុញ្ញាតសម្រាប់ MCP/A2A                                     |
| `quotaSnapshots.ts`     | `quota_snapshots`                                              | ប្រវត្តិនៃការប្រើប្រាស់ quota                                              |
| `modelComboMappings.ts` | `model_combo_mappings`                                         | ផ្គូផ្គងម៉ូដែលទៅនឹង combo លំនាំដើម                                         |
| `cliToolState.ts`       | `cli_tool_state`                                               | ស្ថានភាពអចិន្ត្រៃយ៍ជាក់លាក់សម្រាប់ CLI                                     |
| `encryption.ts`         | —                                                              | អនុគមន៍ជំនួយសម្រាប់អ៊ិនគ្រីប/ឌិគ្រីប fields                                |
| `readCache.ts`          | —                                                              | cache ក្នុងអង្គចងចាំសម្រាប់ប្រតិបត្តិការដែលអានច្រើន                        |
| `secrets.ts`            | `key_value` (ធាតុដែលបានអ៊ិនគ្រីប)                              | កន្លែងផ្ទុកទិន្នន័យសម្ងាត់ដែលបានអ៊ិនគ្រីប                                  |
| `stateReset.ts`         | —                                                              | លុបសម្អាត/កំណត់ស្ថានភាព DB ឡើងវិញសម្រាប់ការធ្វើតេស្ត                       |
| `contextHandoffs.ts`    | `context_handoffs`                                             | បរិបទសម័យសម្រាប់ការផ្ទេរទៅ agent                                           |
| `usage*.ts`             | `usage_history`, `call_logs`, `proxy_logs`                     | ការតាមដានការប្រើប្រាស់                                                     |
| `compression*.ts`       | `compression_settings`, `compression_combos`                   | ការកំណត់រចនាសម្ព័ន្ធ compression                                           |

### ព្រំដែនម៉ូឌុល

ច្បាប់ស្នូលនៃស្ថាបត្យកម្មគឺ៖ **ម៉ូឌុលមិនចូលប្រើតារាងរបស់គ្នាទៅវិញទៅមកដោយផ្ទាល់ទេ**។ ដើម្បីធ្វើការជាមួយទិន្នន័យរបស់ម៉ូឌុលផ្សេង សូម import អនុគមន៍ពីម៉ូឌុលនោះ។

```ts
// ❌ ខុស៖ SQL ដោយផ្ទាល់ពីម៉ូឌុលផ្សេង
db.prepare("SELECT * FROM provider_connections").all();

// ✅ ត្រឹមត្រូវ៖ ប្រើអនុគមន៍ពីម៉ូឌុល providers
import { listProviders } from "@/lib/db/providers";
const providers = await listProviders();
```

ច្បាប់នេះត្រូវបានអនុវត្តតាមរយៈការត្រួតពិនិត្យកូដ — មិនមានការត្រួតពិនិត្យឋិតិវន្តទេ ប៉ុន្តែការបំពាននឹងត្រូវបានសម្គាល់។

---

## គ្រោងទិន្នន័យមូលដ្ឋាន (17 តារាង)

`core.ts` កំណត់តារាងមូលដ្ឋានចំនួន 17 នៅក្នុង `SCHEMA_SQL`។ តារាងទាំងនេះត្រូវបានបង្កើតដោយការធ្វើ migration `001_initial_schema.sql` និងបង្កើតបានជាគ្រោងទិន្នន័យស្នូល។

### តារាងស្នូល (បង្កើតក្នុង migration ដំបូង)

| តារាង                      | គោលបំណង                                        | ជួរឈរគន្លឹះ                                                             |
| -------------------------- | ---------------------------------------------- | ----------------------------------------------------------------------- |
| `provider_connections`     | ព័ត៌មានសម្ងាត់របស់អ្នកផ្តល់សេវា (បានអ៊ិនគ្រីប) | `id`, `provider`, `auth_type`, `api_key`, `is_active`                   |
| `provider_nodes`           | ព័ត៌មានកំណត់ផ្លូវថ្នាំងអ្នកផ្តល់សេវា           | `id`, `type`, `name`, `base_url`, `created_at`                          |
| `key_value`                | ឃ្លាំងផ្ទុក KV ទូទៅ                            | `namespace`, `key`, `value`                                             |
| `combos`                   | និយមន័យបន្សំកំណត់ផ្លូវ                         | `id`, `name`, `data`, `sort_order`                                      |
| `api_keys`                 | សោ API សម្រាប់ gateway                         | `id`, `name`, `key`, `machine_id`, `allowed_models`                     |
| `db_meta`                  | ទិន្នន័យមេតារបស់មូលដ្ឋានទិន្នន័យ               | `key`, `value`                                                          |
| `usage_history`            | កំណត់ត្រាការប្រើប្រាស់សំណើ                     | `id`, `provider`, `model`, `tokens_input`, `tokens_output`, `timestamp` |
| `call_logs`                | Payload និងការឆ្លើយតបរបស់សំណើ                  | `id`, `timestamp`, `status`, `model`, `provider`, `latency_ms`          |
| `proxy_logs`               | កំណត់ហេតុសំណើ proxy                            | `id`, `timestamp`, `proxy_type`, `status`, `provider`                   |
| `domain_fallback_chains`   | ខ្សែសង្វាក់ពីម៉ូដែលទៅអ្នកផ្តល់សេវា             | `model`, `chain`                                                        |
| `domain_budgets`           | ថវិកាចំណាយសម្រាប់ domain នីមួយៗ                | `api_key_id`, `daily_limit_usd`, `warning_threshold`, `reset_interval`  |
| `domain_budget_reset_logs` | ប្រវត្តិកំណត់ថវិកាឡើងវិញ                       | `id`, `api_key_id`, `reset_interval`, `previous_spend`, `reset_at`      |
| `domain_cost_history`      | ការតាមដានចំណាយសម្រាប់ domain នីមួយៗ            | `id`, `api_key_id`, `cost`, `timestamp`                                 |
| `domain_lockout_state`     | ស្ថានភាពកម្រិតអត្រារបស់ domain                 | `identifier`, `attempts`, `locked_until`                                |
| `domain_circuit_breakers`  | ស្ថានភាព circuit breaker ក្នុងមួយ domain       | `name`, `state`, `failure_count`, `last_failure_time`                   |
| `semantic_cache`           | ឃ្លាំងសម្ងាត់ការឆ្លើយតបរបស់ LLM                | `id`, `signature`, `model`, `prompt_hash`, `response`                   |
| `quota_snapshots`          | រូបថតកូតាប្រវត្តិសាស្ត្រ                       | `id`, `provider`, `connection_id`, `window_key`, `remaining_percentage` |

### តារាងបន្ថែម (បានបន្ថែមដោយ migration ក្រោយៗ)

migration បន្តបន្ទាប់បន្ថែមតារាងដូចជា៖

- `cli_tool_state` (migration 011) — ស្ថានភាពឧបករណ៍ CLI
- តារាង `mcp_*` — សវនកម្មម៉ាស៊ីនបម្រើ MCP
- តារាង `a2a_*` — ស្ថានភាពភារកិច្ច A2A
- តារាង `usage_*` — ការតាមដានការប្រើប្រាស់
- តារាង `plugin_*` — ប្រព័ន្ធ plugin
- `skill_executions` — ប្រវត្តិការប្រតិបត្តិជំនាញ
- តារាង `memory_*` — ប្រព័ន្ធអង្គចងចាំ
- តារាង `compression_*` — ប្រព័ន្ធបង្ហាប់
- តារាង `webhook_*` — កំណត់ហេតុការបញ្ជូន webhook
- តារាង `acp_*` — ពិធីការ Agent Client Protocol
- តារាង `oneproxy_*` — ទីផ្សារ 1proxy
- `proxy_assignments` — ការចងភ្ជាប់វិសាលភាព proxy
- `detailed_call_artifacts` — ទិន្នន័យមេតារបស់វត្ថុបន្ថែមកំណត់ហេតុការហៅ
- `quota_alert_history` — សវនកម្មការជូនដំណឹងអំពីកូតា
- `command_code_auth_sessions` — សម័យ OAuth របស់ Command Code

បញ្ជីពេញលេញនៃតារាងប្រហែល 30+ មាននៅក្នុង `src/lib/db/migrations/`។

---

## ការផ្លាស់ប្ដូរគ្រោងការណ៍

OmniRoute ប្រើប្រាស់ **ការផ្លាស់ប្ដូរគ្រោងការណ៍ដែលមានកំណែ និងអាចដំណើរការឡើងវិញដោយមិនបង្កផលប៉ះពាល់បន្ថែម** នៅក្នុង `src/lib/db/migrations/`។ ការផ្លាស់ប្ដូរគ្រោងការណ៍នីមួយៗគឺជាឯកសារ SQL តែមួយដែលមានឈ្មោះ `NNN_description.sql`។

### ការដាក់ឈ្មោះការផ្លាស់ប្ដូរគ្រោងការណ៍

```
001_initial_schema.sql
002_mcp_a2a_tables.sql
003_provider_node_custom_paths.sql
...
021_combo_call_log_targets.sql
```

### របៀបដំណើរការការផ្លាស់ប្ដូរគ្រោងការណ៍

នៅពេលចាប់ផ្ដើម `migrationRunner.ts` នឹង៖

1. បង្កើតតារាង `_omniroute_migrations` ប្រសិនបើវាមិនទាន់មាន
2. សួររកការផ្លាស់ប្ដូរគ្រោងការណ៍ដែលបានអនុវត្តរួចហើយ
3. អនុវត្តការផ្លាស់ប្ដូរគ្រោងការណ៍ថ្មីទាំងអស់តាមលំដាប់ ដោយការផ្លាស់ប្ដូរនីមួយៗស្ថិតក្នុងប្រតិបត្តិការមួយ
4. កត់ត្រាការផ្លាស់ប្ដូរគ្រោងការណ៍នីមួយៗដែលបានអនុវត្ត ព្រមជាមួយត្រាពេលវេលា

```ts
// src/lib/db/migrationRunner.ts (បានសម្រួល)
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

### លក្ខណៈអាចដំណើរការឡើងវិញដោយមិនបង្កផលប៉ះពាល់បន្ថែម

ការផ្លាស់ប្ដូរគ្រោងការណ៍ត្រូវតែ **អាចដំណើរការឡើងវិញដោយមិនបង្កផលប៉ះពាល់បន្ថែម** — ការដំណើរការវាពីរដងមិនគួរធ្វើឱ្យមានការផ្លាស់ប្ដូរណាមួយទេ៖

```sql
-- 004_proxy_registry.sql
CREATE TABLE IF NOT EXISTS proxy_registry (
  id TEXT PRIMARY KEY,
  host TEXT NOT NULL,
  port INTEGER NOT NULL,
  ...
);
```

ប្រើឃ្លា `IF NOT EXISTS`, `IF EXISTS` និង `OR IGNORE` / `OR REPLACE` ឱ្យបានទូលំទូលាយ។

### ការបន្ថែមការផ្លាស់ប្ដូរគ្រោងការណ៍ថ្មី

1. **កំណត់លេខបន្ទាប់**៖ `ls src/lib/db/migrations/ | tail -1`
2. **បង្កើតឯកសារ**៖ `NNN_my_change.sql`
3. **ប្រើ DDL ដែលមានសុវត្ថិភាព**៖ `CREATE TABLE IF NOT EXISTS`, `ALTER TABLE ... ADD COLUMN`
4. **បំពេញទិន្នន័យចាស់ដោយប្រុងប្រយ័ត្ន**៖ ប្រើ `UPDATE ... WHERE ...` ដើម្បីដោះស្រាយជួរដេកដែលមានស្រាប់
5. **សាកល្បងលើច្បាប់ចម្លង**៖ កុំដំណើរការការផ្លាស់ប្ដូរគ្រោងការណ៍ដែលមិនទាន់បានសាកល្បងលើប្រព័ន្ធផលិតកម្ម

ឧទាហរណ៍៖

```sql
-- 022_add_combo_priority.sql
ALTER TABLE combos ADD COLUMN priority INTEGER DEFAULT 100;
UPDATE combos SET priority = 100 WHERE priority IS NULL;
CREATE INDEX IF NOT EXISTS idx_combos_priority ON combos(priority);
```

> **ការផ្លាស់ប្ដូរដែលមិនឆបគ្នាជាមួយកំណែចាស់** (ឧ. ការលុបជួរឈរ) មានភាពស្មុគស្មាញ។ OmniRoute មិនគាំទ្រការបន្ទាបកំណែទេ — នៅពេលការផ្លាស់ប្ដូរគ្រោងការណ៍ត្រូវបានអនុវត្ត ការផ្លាស់ប្ដូរគ្រោងការណ៍មូលដ្ឋានទិន្នន័យនោះគឺអចិន្ត្រៃយ៍។ សូមរៀបចំផែនការឱ្យបានសមស្រប។

---

## ការអ៊ិនគ្រីបទិន្នន័យដែលបានរក្សាទុក

វាលទិន្នន័យរសើប (API keys, OAuth tokens, connection strings) ត្រូវបានអ៊ិនគ្រីបនៅពេលរក្សាទុកដោយប្រើ **AES-256-GCM**។

### របៀបដែលវាដំណើរការ

```ts
// src/lib/db/encryption.ts (បានសម្រួល)
const key = deriveKeyFromPassphrase(passphrase, salt);
const iv = randomBytes(12);
const cipher = createCipheriv("aes-256-gcm", key, iv);
const encrypted = Buffer.concat([cipher.update(plaintext), cipher.final()]);
const authTag = cipher.getAuthTag();
return { encrypted, iv, authTag };
```

### ទីកន្លែងដែលវាត្រូវបានប្រើ

- `provider_connections.api_key` — ត្រូវបានអ៊ិនគ្រីបនៅកម្រិតកម្មវិធី
- `provider_connections.access_token`, `refresh_token`, `id_token` — ត្រូវបានអ៊ិនគ្រីបនៅកម្រិតកម្មវិធី
- ធាតុ `key_value` ដែលមាន `namespace = "secrets"` — ត្រូវបានអ៊ិនគ្រីបនៅកម្រិតកម្មវិធី
- `proxy_registry.auth` — ត្រូវបានអ៊ិនគ្រីបនៅកម្រិតកម្មវិធី (ប្រសិនបើមាន)

### សោអ៊ិនគ្រីប

សោអ៊ិនគ្រីបត្រូវបានបង្កើតចេញពី **ឃ្លាសម្ងាត់** (កំណត់តាមរយៈអថេរបរិស្ថាន `STORAGE_ENCRYPTION_KEY`) និង **salt** (រក្សាទុកក្នុង DB)។ ទាំងពីរត្រូវបានទាមទារដើម្បីឌិគ្រីបទិន្នន័យ។

```bash
# បង្កើតឃ្លាសម្ងាត់ដែលមានសុវត្ថិភាព
openssl rand -hex 32

# កំណត់ក្នុង .env
STORAGE_ENCRYPTION_KEY=<your-key>
```

> **សំខាន់បំផុត**៖ ការបាត់បង់សោអ៊ិនគ្រីបមានន័យថា បាត់បង់សិទ្ធិចូលប្រើទិន្នន័យដែលបានអ៊ិនគ្រីបទាំងអស់។ **បម្រុងទុកសោដោយឡែកពីមូលដ្ឋានទិន្នន័យ**។

### អ្វីដែលមិនត្រូវបានអ៊ិនគ្រីប

ដោយសារហេតុផលផ្នែកប្រសិទ្ធភាព ទិន្នន័យខាងក្រោមត្រូវបានរក្សាទុកជាអត្ថបទធម្មតា៖

- ឈ្មោះបង្ហាញរបស់អ្នកផ្ដល់សេវា
- និយមន័យម៉ូដែល (ដែលមានជាសាធារណៈរួចហើយ)
- ច្បាប់កំណត់ផ្លូវ
- កំណត់ត្រាការប្រើប្រាស់ (គ្មាន PII)

---

## ចំណុចគួរប្រុងប្រយ័ត្នអំពីការអ៊ិនគ្រីប (v3.8.16+)

OmniRoute ប្រើ **`migrateLegacyEncryptedString()`** ដើម្បីគ្រប់គ្រងវិធីសាស្ត្រអ៊ិនគ្រីបពីរយ៉ាងដោយស្វ័យប្រវត្តិ៖

- **ចាស់** (មុន v3.5.0)៖ «ការអ៊ិនគ្រីប» ផ្អែកលើ XOR (មិនមែនជាការអ៊ិនគ្រីបពិតប្រាកដទេ)
- **បច្ចុប្បន្ន**៖ AES-256-GCM ដែលមាន IV និងស្លាកផ្ទៀងផ្ទាត់ត្រឹមត្រូវ

មុខងារជំនួយសម្រាប់ការផ្ទេរទិន្នន័យនេះរកឃើញទម្រង់ចាស់ ហើយអ៊ិនគ្រីបឡើងវិញដោយប្រើវិធីសាស្ត្រថ្មីនៅពេលអានជាលើកដំបូង។ នេះមានន័យថា អ្នកអាចធ្វើបច្ចុប្បន្នភាពមូលដ្ឋានទិន្នន័យចាស់ដោយមិនបាត់បង់ព័ត៌មានសម្ងាត់។

---

## ឃ្លាំងសម្ងាត់សម្រាប់ការអាន

សម្រាប់ទិន្នន័យដែលត្រូវបានអានញឹកញាប់ (ម៉ូដែល ក្រុមហ៊ុនផ្តល់សេវា និងការកំណត់) `readCache.ts` ផ្តល់ **ឃ្លាំងសម្ងាត់ក្នុងអង្គចងចាំ**៖

```ts
// រក្សាទុកក្នុងឃ្លាំងសម្ងាត់នៅពេលចាប់ផ្តើម ហើយធ្វើឱ្យអសុពលភាពនៅពេលសរសេរ
const providers = await getCachedProviders(); // លឿន ស្ថិតក្នុងអង្គចងចាំ
const fresh = await listProviders(); // យឺត ចូលប្រើ DB
```

| អង្គភាពដែលបានរក្សាទុកក្នុងឃ្លាំងសម្ងាត់ | សោឃ្លាំងសម្ងាត់ | TTL                |
| --------------------------------------- | --------------- | ------------------ |
| `models`                                | `models:v1`     | រហូតដល់មានការសរសេរ |
| `provider_connections`                  | `providers:v1`  | រហូតដល់មានការសរសេរ |
| `settings`                              | `settings:v1`   | រហូតដល់មានការសរសេរ |
| `combos`                                | `combos:v1`     | រហូតដល់មានការសរសេរ |

ឃ្លាំងសម្ងាត់ត្រូវបានធ្វើឱ្យអសុពលភាពរាល់ពេលមានការសរសេរទៅកាន់តារាងដែលត្រូវគ្នា។

---

## ការបម្រុងទុក និងការស្ដារឡើងវិញ

### ការបម្រុងទុកដោយដៃ

```bash
# ប្រើ CLI ដើម្បីបង្កើតឯកសារបម្រុងទុកក្នុងម៉ាស៊ីន
omniroute backup create --name pre-migration

# ឬតាមរយៈ API
curl -X PUT http://localhost:20128/api/db-backups \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

ឯកសារបម្រុងទុករួមមាន៖

- តារាង DB ទាំងអស់ (បានបម្លែងជាស៊េរីទៅជា JSON)
- ទិន្នន័យពាក់ព័ន្ធនឹងកំណត់ហេតុការហៅ (បានអ៊ិនកូដជា base64 និងជាជម្រើស)
- ការកំណត់ + ព័ត៌មានសម្ងាត់ (បានអ៊ិនគ្រីប)
- ការកំណត់រចនាសម្ព័ន្ធកម្មវិធីជំនួយ

### ការស្ដារឡើងវិញ

```bash
# តាមរយៈ CLI
omniroute restore pre-migration

# តាមរយៈ API
curl -X POST http://localhost:20128/api/db-backups/restore \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

> **ការព្រមាន**៖ ការស្ដារឡើងវិញនឹងសរសេរជាន់លើ DB ទាំងមូល។ សូមបញ្ឈប់កម្មវិធីភ្ញៀវទាំងអស់ជាមុនសិន។

### ការបម្រុងទុកដោយស្វ័យប្រវត្តិ

```bash
# បើកការបម្រុងទុកប្រចាំថ្ងៃដោយស្វ័យប្រវត្តិតាមរយៈ CLI
omniroute backup auto enable --cron "0 2 * * *" --retention 7
```

កាលវិភាគត្រូវបានប្រតិបត្តិនៅផ្នែកម៉ាស៊ីនមេដោយកិច្ចការផ្ទៃខាងក្រោយដែលដំណើរការរៀងរាល់ 30 វិនាទី
(លំនាំដើម) ហើយវាយតម្លៃកន្សោម cron ដោយផ្អែកលើម៉ោងមូលដ្ឋានរបស់ម៉ាស៊ីនមេ។

| អថេរ                                        | លំនាំដើម | សេចក្ដីពិពណ៌នា                                                                                                      |
| ------------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_BACKUP_SCHEDULE_JOB_INTERVAL_MS` | `30000`  | ចន្លោះពេលដំណើរការគិតជា ms (អប្បបរមា `5000`)។ ត្រូវតែខ្លីជាង 60 s ដើម្បីធានាថាដំណើរការនៅក្នុងនាទី cron ដែលត្រូវគ្នា។ |

### ការបម្រុងទុក SQLite ខណៈកំពុងដំណើរការ

សម្រាប់ការបម្រុងទុក DB ដែលកំពុងដំណើរការដោយមិនមានពេលផ្អាកសេវា៖

```bash
sqlite3 ~/.omniroute/storage.sqlite ".backup /backups/omniroute-hot.db"
```

វិធីនេះប្រើ API បម្រុងទុកអនឡាញរបស់ SQLite — មានសុវត្ថិភាពក្នុងការដំណើរការខណៈពេល OmniRoute កំពុងដំណើរការ។

---

## ការកែសម្រួលប្រសិទ្ធភាព

### របៀប WAL

WAL ត្រូវបានបើកតាមលំនាំដើម។ សម្រាប់បន្ទុកការងារដែលមានការសរសេរច្រើន សូមពិចារណា៖

```sql
PRAGMA wal_autocheckpoint = 1000;  -- បង្កើត checkpoint រៀងរាល់ 1000 ទំព័រ
PRAGMA journal_size_limit = 67108864;  -- កំណត់ទំហំ WAL អតិបរមា 64MB
```

### លិបិក្រម

លិបិក្រមសំខាន់ៗសម្រាប់ប្រសិទ្ធភាព (បង្កើតដោយស្វ័យប្រវត្តិតាមរយៈ migrations)៖

- `idx_models_provider` — ស្វែងរកម៉ូដែលតាម provider
- `idx_combo_targets_combo_id` — ពង្រីក combo target
- `idx_usage_history_api_key_timestamp` — វិភាគការប្រើប្រាស់
- `idx_quota_snapshots_api_key_window` — តាមដានកូតា
- `idx_call_logs_timestamp` — សំណួររកកំណត់ហេតុការហៅ

ដើម្បីបន្ថែមលិបិក្រមថ្មី សូមបង្កើត migration៖

```sql
-- 023_add_my_index.sql
CREATE INDEX IF NOT EXISTS idx_my_table_my_column ON my_table(my_column);
```

### I/O ដែលផ្គូផ្គងនឹងអង្គចងចាំ

សម្រាប់មូលដ្ឋានទិន្នន័យដែលមានទំហំធំខ្លាំង (>10GB) ការផ្គូផ្គងអង្គចងចាំអាចកែសម្រួលបានតាមរយៈ SQLite pragma៖

```sql
-- កំណត់តាមរយៈ SQLite pragma (កែសម្រួលក្នុង core.ts ឬ runtime)
PRAGMA mmap_size = 268435456;  -- 256MB
```

### ការបង្រួម

OmniRoute instances ដែលដំណើរការរយៈពេលយូរ ទទួលបានអត្ថប្រយោជន៍ពីការដំណើរការ `VACUUM` ម្តងម្កាល៖

```bash
sqlite3 ~/.omniroute/storage.sqlite "VACUUM;"
```

ដំណើរការប្រចាំខែក្នុងអំឡុងពេលដែលមានចរាចរណ៍ទាប។ (របៀប WAL កាត់បន្ថយតម្រូវការ ប៉ុន្តែមិនលុបបំបាត់វាទាំងស្រុងទេ។)

---

## ការពិនិត្យស្ថានភាព

`src/lib/db/healthCheck.ts` ផ្តល់នូវ **ការវិនិច្ឆ័យស្ថានភាពកម្រិត DB**៖

កិរិយាសព្ទទាំងពីរទាមទារការផ្ទៀងផ្ទាត់អត្តសញ្ញាណ (បើមិនដូច្នេះទេ នឹងទទួលបាន `401`)។ `GET` ធ្វើរោគវិនិច្ឆ័យតែប៉ុណ្ណោះ ចំណែកឯ `POST` ដំណើរការការពិនិត្យដូចគ្នាដោយបើក `autoRepair`។

```bash
GET  /api/db/health   # ធ្វើរោគវិនិច្ឆ័យ
POST /api/db/health   # ធ្វើរោគវិនិច្ឆ័យ + ជួសជុល
```

ការឆ្លើយតបគឺជា `DbHealthCheckResult` ដែលបង្កើតដោយ `runDbHealthCheck()`
(`src/lib/db/healthCheck.ts`)៖

```json
{
  "isHealthy": false,
  "issues": [
    {
      "type": "broken_reference",
      "table": "domain_budgets",
      "description": "Domain budgets referenced API keys that no longer exist.",
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

| វាល               | អត្ថន័យ                                                                                                                                                                    |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `isHealthy`       | មានតម្លៃ `true` នៅពេល `issues` ទទេ។ `driver` មិនដែលប៉ះពាល់ដល់វាទេ។                                                                                                         |
| `issues[].type`   | មួយក្នុងចំណោម `integrity_check_failed`, `broken_reference`, `stale_snapshot`, `invalid_state`។                                                                             |
| `repairedCount`   | ចំនួនជួរដេកដែលបានជួសជុលក្នុងការដំណើរការនេះ; តែងតែជា `0` នៅពេល `autoRepair` មានតម្លៃ false។                                                                                 |
| `backupCreated`   | ថាតើបានបង្កើតការបម្រុងទុកមុនពេលជួសជុលឬអត់។                                                                                                                                 |
| `checkedAt`       | ត្រាពេលវេលា ISO ដែលប្រើរួមគ្នាដោយការដំណើរការ និងកំណត់ចំណាំការជួសជុលណាមួយដែលវាសរសេរ។                                                                                        |
| `driver.name`     | SQLite driver ដែលបម្រើមូលដ្ឋានទិន្នន័យដែលបានពិនិត្យ។                                                                                                                       |
| `driver.degraded` | មានតម្លៃ `true` នៅពេលការសរសេរមិនត្រូវបានរក្សាទុកយ៉ាងរឹងមាំដោយឯកសារមូលដ្ឋានទិន្នន័យ — ជម្រើសបម្រុង `sql.js` WASM (ការរក្សាទុកឯកសារទាំងមូល) ឬមូលដ្ឋានទិន្នន័យក្នុងអង្គចងចាំ។ |

ទិន្នន័យដូចគ្នានេះក៏ត្រូវបានត្រឡប់ដោយឧបករណ៍ MCP `omniroute_db_health_check` ផងដែរ។

ដំណើរការ `PRAGMA integrity_check` ដើម្បីរកឃើញការខូចខាត៖

```bash
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"
# គួរតែបង្ហាញ៖ ok
```

ប្រសិនបើវាត្រឡប់អ្វីផ្សេងក្រៅពី `ok` សូម **បញ្ឈប់ការប្រើមូលដ្ឋានទិន្នន័យភ្លាមៗ** ហើយស្ដារឡើងវិញពីការបម្រុងទុក។

---

## ការស្ដារឡើងវិញក្រោយគ្រោះមហន្តរាយ

### សេណារីយ៉ូទី 1៖ បាត់បង់ឯកសារ WAL

ឯកសារ `-wal` បានបាត់ ប៉ុន្តែ `-shm` និង DB ចម្បងនៅដដែល៖

```bash
# ស្ដារឡើងវិញដោយស្វ័យប្រវត្តិនៅពេលបើកលើកក្រោយ
omniroute
```

ប្រសិនបើ SQLite មិនអាចស្ដារឡើងវិញដោយស្វ័យប្រវត្តិបាន៖

```bash
sqlite3 ~/.omniroute/storage.sqlite ".recover" > recovered.sql
sqlite3 recovered.db < recovered.sql
mv recovered.db ~/.omniroute/storage.sqlite
```

### សេណារីយ៉ូទី 2៖ ឯកសារ DB ចម្បងខូច

ស្ដារពីការបម្រុងទុក៖

```bash
omniroute sync pull --merge   # ឬ៖ omniroute backup restore <backup-id>
```

### សេណារីយ៉ូទី 3៖ បាត់បង់សោអ៊ិនគ្រីប

**មិនអាចស្ដារឡើងវិញបានទេ** ប្រសិនបើគ្មានសោ។ វាលដែលបានអ៊ិនគ្រីបមិនអាចអានបានទេ។ បន្ថែមអ្នកផ្ដល់សេវាទាំងអស់ឡើងវិញដោយដៃ ដោយប្រើព័ត៌មានសម្ងាត់ថ្មី។

> **ការកាត់បន្ថយហានិភ័យ**៖ ត្រូវបម្រុងទុកសោអ៊ិនគ្រីបដោយឡែកជានិច្ច។ ល្អបំផុតគឺរក្សាទុកនៅក្នុងកម្មវិធីគ្រប់គ្រងពាក្យសម្ងាត់ ឬ KMS។

### សេណារីយ៉ូទី 4៖ ថាសពេញ

SQLite នឹងត្រឡប់កំហុស `SQLITE_FULL`។ រំដោះទំហំថាស បន្ទាប់មក៖

```bash
# ធ្វើ checkpoint លើ WAL ដើម្បីរំដោះទំហំ
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA wal_checkpoint(TRUNCATE);"
```

---

## ប្រតិបត្តិការទូទៅ

### ពិនិត្យតារាងមួយ

```bash
sqlite3 ~/.omniroute/storage.sqlite "SELECT * FROM api_keys LIMIT 5;"
```

### រាប់ចំនួនជួរដេកក្នុងតារាងទាំងអស់

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';
EOF
```

### កំណត់ឡើងវិញ (លុបសម្អាត) ទិន្នន័យទាំងអស់

```bash
# បញ្ឈប់ OmniRoute ជាមុនសិន
omniroute stop

# លុបឯកសារ DB
rm ~/.omniroute/storage.sqlite*

# ចាប់ផ្ដើមឡើងវិញ (នឹងបង្កើត DB ទទេឡើងវិញ)
omniroute
```

សម្រាប់ការកំណត់ឡើងវិញដោយ **ជ្រើសរើស** (រក្សាអ្នកផ្ដល់សេវា និងលុបទិន្នន័យប្រើប្រាស់)៖

```bash
DELETE FROM usage_history WHERE timestamp < datetime('now', '-30 day');
DELETE FROM call_logs WHERE timestamp < datetime('now', '-30 day');
DELETE FROM proxy_logs WHERE timestamp < datetime('now', '-30 day');
```

### នាំចេញតារាងតែមួយ

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
.mode csv
.output api_keys.csv
SELECT * FROM api_keys;
EOF
```

---

## ការដោះស្រាយបញ្ហា

### "មូលដ្ឋានទិន្នន័យត្រូវបានចាក់សោ"

ដំណើរការមួយផ្សេងទៀតកំពុងកាន់ការចាក់សោសម្រាប់ការសរសេរ។ អ្នកអាច៖

- រង់ចាំឱ្យដំណើរការផ្សេងទៀតបញ្ចប់ (ពិនិត្យដោយ `lsof | grep storage.sqlite`)
- បញ្ចប់ដំណើរការផ្សេងទៀតដោយបង្ខំ
- ប្រសិនបើបញ្ហានៅតែបន្ត ចាប់ផ្ដើម OmniRoute ឡើងវិញ

### "ការកំណត់កំហិតសោបរទេសបានបរាជ័យ"

ម៉ូឌុលដូមែនមួយកំពុងបំពានលើសុចរិតភាពយោង។ ពិនិត្យមើល៖

- ជួរដេកកំព្រានៅក្នុងតារាងដែលពឹងផ្អែក
- ការលុបបន្តគ្នាដែលមិនបានផ្សព្វផ្សាយបន្ត
- ការធ្វើ migration ថ្មីៗដែលបានផ្លាស់ប្ដូរសោបរទេស

ដំណើរការ `PRAGMA foreign_key_check;` ដើម្បីស្វែងរកការបំពាន។

### "អស់អង្គចងចាំ"

I/O ដែលផ្គូផ្គងនឹងអង្គចងចាំរបស់ SQLite កំពុងលើសដែនកំណត់របស់ OS។ កាត់បន្ថយតាមរយៈ pragma របស់ SQLite៖

```sql
PRAGMA mmap_size = 134217728;  -- 128MB ជំនួសឱ្យ 256MB
```

ឬបិទវា៖

```sql
PRAGMA mmap_size = 0;
```

### "Migration បានបរាជ័យពាក់កណ្ដាលដំណើរការ"

Migration បានដំណើរការនៅក្នុង transaction ដូច្នេះវាគួរតែត្រូវបាន rollback។ ប្រសិនបើមិនដូច្នោះទេ៖

1. **បញ្ឈប់ OmniRoute** (ដើម្បីការពារការព្យាយាមបន្ថែមទៀត)
2. **ពិនិត្យស្ថានភាព DB** ដោយប្រើ `sqlite3`
3. **កែតម្រូវដោយដៃ** នូវ migration ដែលបានអនុវត្តមិនពេញលេញ
4. **ដំណើរការ OmniRoute ឡើងវិញ** (migration នឹងត្រូវបានព្យាយាមម្ដងទៀត)

ដើម្បីបង្ការបញ្ហានេះ ត្រូវសាកល្បង migration លើច្បាប់ចម្លងជាមុនជានិច្ច។

---

## សូមមើលផងដែរ

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — តារាងការប្រើប្រាស់
- [MONITORING_GUIDE.md](./MONITORING_GUIDE.md) — ការត្រួតពិនិត្យស្ថានភាពប្រព័ន្ធ
- [RELEASE_CHECKLIST.md](./RELEASE_CHECKLIST.md) — លំហូរនៃការចេញផ្សាយ
- ប្រភព៖ `src/lib/db/` (80+ ឯកសារ, ~25K បន្ទាត់កូដ)
