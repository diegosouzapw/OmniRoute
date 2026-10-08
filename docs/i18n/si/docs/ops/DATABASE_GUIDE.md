# Database Schema & Operations Guide (සිංහල)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/DATABASE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/DATABASE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/DATABASE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/DATABASE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/DATABASE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/DATABASE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/DATABASE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/DATABASE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/DATABASE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/DATABASE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/DATABASE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/DATABASE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/DATABASE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/DATABASE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/DATABASE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/DATABASE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/DATABASE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/DATABASE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/DATABASE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/DATABASE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/DATABASE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/DATABASE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/DATABASE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/DATABASE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/DATABASE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/DATABASE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/DATABASE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/DATABASE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/DATABASE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/DATABASE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/DATABASE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/DATABASE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/DATABASE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/DATABASE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/DATABASE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/DATABASE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/DATABASE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/DATABASE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/DATABASE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/DATABASE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/DATABASE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/DATABASE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/DATABASE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/DATABASE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/DATABASE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/DATABASE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/DATABASE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/DATABASE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/DATABASE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/DATABASE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/DATABASE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/DATABASE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/DATABASE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/DATABASE_GUIDE.md)

---

> **සාරාංශයෙන්**: OmniRoute එහි ප්රධාන දත්ත ගබඩාව ලෙස **WAL ජර්නලකරණය සහිත SQLite** භාවිත කරන අතර, සංවේදී ක්ෂේත්ර සඳහා ගබඩා කර ඇති අවස්ථාවේ **AES-256-GCM** සංකේතනය භාවිත කරයි. මෙම මාර්ගෝපදේශය schema, migrations, backup/recovery සහ මෙහෙයුම් runbooks ආවරණය කරයි.

**මූලාශ්ර:**

- `src/lib/db/core.ts` — singleton + SCHEMA_SQL (මූලික වගු 17ක්)
- `src/lib/db/migrationRunner.ts` — අනුවාදගත migrations
- `src/lib/db/migrations/` — අනුවාදගත SQL ගොනු 167ක්
- `src/lib/db/encryption.ts` — සංකේතන උපකාරක
- `src/lib/db/backup.ts` — backup අපනයනය/ආනයනය
- `src/lib/db/healthCheck.ts` — සෞඛ්ය තත්ත්ව නිර්ණය

---

## SQLite භාවිත කරන්නේ ඇයි?

OmniRoute විසින් PostgreSQL/MySQL වෙනුවට SQLite තෝරාගත්තේ හේතු කිහිපයක් නිසාය:

| සාධකය             | SQLite                                   | PostgreSQL                           |
| ----------------- | ---------------------------------------- | ------------------------------------ |
| **යෙදවීම**        | අන්තර්ගතයි — වෙනම server එකක් අවශ්ය නොවේ | server සැකසීමක් අවශ්ය වේ             |
| **සංකේතනය**       | යෙදුම් මට්ටමේ (AES-256-GCM)              | අන්තර්ගත TDE                         |
| **කාර්යසාධනය**    | කුඩා/මධ්යම වැඩ ප්රමාණ සඳහා වේගවත්ය       | අතිවිශාල සමගාමී ලිවීම් සඳහා වඩා හොඳය |
| **සමගාමීත්වය**    | WAL mode සමගාමී කියවීම් සඳහා ඉඩ දෙයි     | සම්පූර්ණ MVCC                        |
| **Backup**        | තනි-ගොනු පිටපත                           | `pg_dump` හෝ filesystem snapshot     |
| **භාවිත අවස්ථාව** | එක් පරිශීලකයෙකු සඳහා ස්ථාපනය, අන්තර්ගත   | බහු-tenant SaaS                      |

**තනි-පරිශීලක, තනි-instance** යෙදවීම් සඳහා (OmniRoute හි ප්රධාන භාවිත අවස්ථාව), SQLite වඩා සරල සහ වේගවත් වේ.

### WAL ජර්නලකරණය

`core.ts` විසින් database එක **WAL (Write-Ahead Logging) mode** සමඟ විවෘත කරයි:

```ts
// src/lib/db/core.ts
db.pragma("journal_mode = WAL");
db.pragma("busy_timeout = 2000");
db.pragma("synchronous = NORMAL");
db.pragma(`cache_size = -${DEFAULT_DATABASE_SETTINGS.optimization.cacheSize}`);
```

WAL මඟින් ලිවීම් අතරතුර **සමගාමී කියවීම්** සඳහා ඉඩ ලැබේ — requests වාර්තා කෙරෙන අතරතුර queries ක්රියාත්මක කරන dashboard එක සඳහා මෙය වැදගත් වේ.

පෙරනිමි cache ප්රමාණය **65,536 KiB (64 MiB)** වේ. SQLite විසින් ඍණ
`cache_size` අගයක් KiB ඒකකයෙන් දළ උපරිම සීමාවක් ලෙස අර්ථකථනය කර අවශ්යතාව අනුව pages වෙන් කරයි.
**Settings > System & Storage > Cache Size** තුළ **1 සිට
1,000,000 KiB** දක්වා පූර්ණ සංඛ්යා අගයන් පිළිගනී; සැකසුම සුරැකීමෙන් එය සජීවී database connection එකට යෙදෙන අතර,
OmniRoute ආරම්භයේදී සුරැකි අගය ප්රතිසාධනය කරයි.

---

## Database පිහිටීම

SQLite ගොනුව මෙහි ගබඩා කර ඇත:

| OS      | Path                                                        |
| ------- | ----------------------------------------------------------- |
| Linux   | `~/.omniroute/storage.sqlite`                               |
| macOS   | `~/.omniroute/storage.sqlite`                               |
| Windows | `%USERPROFILE%\.omniroute\storage.sqlite`                   |
| Docker  | `/app/data/storage.sqlite` (`DATA_DIR` හරහා වින්යාස කළ හැක) |

අනුබද්ධ ගොනු:

- `storage.sqlite-wal` — write-ahead log
- `storage.sqlite-shm` — shared memory ගොනුව
- `call_logs/` — request payload කලාකෘති (සක්රීය කර ඇත්නම්)

**පිහිටීම අභිබවා සකසන්න:**

```bash
DATA_DIR=/custom/path omniroute
```

---

## වසම් මොඩියුල ගෘහනිර්මාණය

OmniRoute හි දත්ත සමුදාය තුළ `src/lib/db/` හි **ඉහළ මට්ටමේ TypeScript මොඩියුල 110ක්** ඇත. සෑම වසම් මොඩියුලයක්ම:

- නිශ්චිත වගු එකක් හෝ කිහිපයක් හිමිකර ගනී
- ටයිප් කළ CRUD ශ්රිත නිර්යාත කරයි
- වෙනත් මොඩියුලයක වගු කිසිවිටෙක ස්පර්ශ නොකරයි
- DB වෙත ප්රවේශ වීමට `core.ts` වෙතින් `getDbInstance()` භාවිත කරයි

### ඉහළ මට්ටමේ DB මොඩියුල 110

OmniRoute සතුව `src/lib/db/` හි **ඉහළ මට්ටමේ TypeScript ගොනු 110ක්** ඇත. පහත දැක්වෙන්නේ ප්රධාන මොඩියුලවලින් නියැදියකි; සම්පූර්ණ ලැයිස්තුව සඳහා ඩිරෙක්ටරි ලැයිස්තුව බලන්න:

| මොඩියුලය                | වගු                                                            | වගකීම                                                                   |
| ----------------------- | -------------------------------------------------------------- | ----------------------------------------------------------------------- |
| `providers.ts`          | `provider_connections`                                         | OAuth/API යතුරු සැපයුම්කරු ලියාපදිංචිය සහ අක්තපත්ර                      |
| `models.ts`             | `key_value` (මොඩල් දත්ත)                                       | මොඩල් නිර්වචන, හැකියාවන්, මිලකරණය                                       |
| `combos.ts`             | `combos`                                                       | සංයෝජන රවුටින් වින්යාස සහ අනුපිළිවෙළ                                    |
| `apiKeys.ts`            | `api_keys`                                                     | API යතුරු ජීවන චක්රය, විෂය පථ, කෝටා ලුහුබැඳීම                           |
| `settings.ts`           | `key_value`, `api_keys`, `combos`                              | පද්ධති වින්යාසය සහ හවුල් KV ගබඩාව                                       |
| `backup.ts`             | —                                                              | උපස්ථ නිර්යාත/ආයාත මෙහෙයුම්                                             |
| `proxies.ts`            | `proxy_registry`, `proxy_assignments`, `provider_connections`  | ප්රොක්සි වින්යාස සහ රවුටින් නීති                                        |
| `prompts.ts`            | `prompt_templates`                                             | නැවත භාවිත කළ හැකි ප්රොම්ප්ට් සැකිලි සහ අනුවාදකරණය                      |
| `webhooks.ts`           | `webhooks`                                                     | සිදුවීම්-ධාවිත webhook දායකත්ව සහ ලොග්                                  |
| `detailedLogs.ts`       | `request_detail_logs`                                          | එක් එක් ඉල්ලීම සඳහා විගණන ලොග්කරණය (විකල්ප, ඉහළ පරිමාවක් සහිත)          |
| `domainState.ts`        | `domain_*` (වගු 5ක්)                                           | වසම් අයවැය, පරිපථ බිඳුම්කාරක, අගුලු දැමීම්, විකල්ප දාම, පිරිවැය ඉතිහාසය |
| `registeredKeys.ts`     | `registered_keys`, `account_key_limits`, `provider_key_limits` | MCP/A2A සඳහා සුදු ලැයිස්තුගත API යතුරු                                  |
| `quotaSnapshots.ts`     | `quota_snapshots`                                              | ඓතිහාසික කෝටා භාවිතය                                                    |
| `modelComboMappings.ts` | `model_combo_mappings`                                         | මොඩල් පෙරනිමි සංයෝජනවලට සිතියම්ගත කිරීම                                 |
| `cliToolState.ts`       | `cli_tool_state`                                               | CLI-විශේෂිත ස්ථිර තත්ත්වය                                               |
| `encryption.ts`         | —                                                              | ක්ෂේත්ර සංකේතනය/විකේතනය සඳහා උපකාරක                                     |
| `readCache.ts`          | —                                                              | කියවීම්-බහුල මෙහෙයුම් සඳහා මතකය-තුළ හැඹිලිය                             |
| `secrets.ts`            | `key_value` (සංකේතනය කළ ඇතුළත් කිරීම්)                         | සංකේතනය කළ රහස් ගබඩාව                                                   |
| `stateReset.ts`         | —                                                              | පරීක්ෂා කිරීම සඳහා DB තත්ත්වය මකා දැමීම/යළි සැකසීම                      |
| `contextHandoffs.ts`    | `context_handoffs`                                             | නියෝජිත භාරදීම සඳහා සැසි සන්දර්භය                                       |
| `usage*.ts`             | `usage_history`, `call_logs`, `proxy_logs`                     | භාවිත ලුහුබැඳීම                                                         |
| `compression*.ts`       | `compression_settings`, `compression_combos`                   | සම්පීඩන වින්යාසය                                                        |

### මොඩියුල සීමා

ප්රධාන ගෘහනිර්මාණ රීතියක් වන්නේ: **මොඩියුල එකිනෙකාගේ වගුවලට සෘජුව ප්රවේශ නොවීමයි**. වෙනත් මොඩියුලයක දත්ත සමඟ වැඩ කිරීමට, එම මොඩියුලයෙන් අදාළ ශ්රිතය ආයාත කරන්න.

```ts
// ❌ වැරදියි: වෙනත් මොඩියුලයකින් සෘජු SQL
db.prepare("SELECT * FROM provider_connections").all();

// ✅ නිවැරදියි: providers මොඩියුලයේ ශ්රිතය භාවිත කරන්න
import { listProviders } from "@/lib/db/providers";
const providers = await listProviders();
```

මෙම රීතිය කේත සමාලෝචනය මඟින් බලාත්මක කෙරේ — ස්ථිතික පරීක්ෂාවක් නොමැති නමුත්, උල්ලංඝන සලකුණු කෙරේ.

---

## මූලික ස්කීමාව (වගු 17ක්)

`core.ts` තුළ `SCHEMA_SQL` හි මූලික වගු 17 අර්ථ දක්වා ඇත. මේවා `001_initial_schema.sql` සංක්රමණය මඟින් නිර්මාණය කෙරෙන අතර මූලික ස්කීමාව සාදයි.

### මූලික වගු (ආරම්භක සංක්රමණයේදී නිර්මාණය කරන ලද)

| වගුව                       | අරමුණ                                    | ප්රධාන තීරු                                                             |
| -------------------------- | ---------------------------------------- | ----------------------------------------------------------------------- |
| `provider_connections`     | සපයන්නාගේ අක්තපත්ර (සංකේතනය කළ)          | `id`, `provider`, `auth_type`, `api_key`, `is_active`                   |
| `provider_nodes`           | සපයන්නාගේ නෝඩ් මාර්ගගත කිරීමේ තොරතුරු    | `id`, `type`, `name`, `base_url`, `created_at`                          |
| `key_value`                | පොදු KV ගබඩාව                            | `namespace`, `key`, `value`                                             |
| `combos`                   | මාර්ගගත කිරීමේ සංයෝජන අර්ථ දැක්වීම්      | `id`, `name`, `data`, `sort_order`                                      |
| `api_keys`                 | ද්වාරය සඳහා API යතුරු                    | `id`, `name`, `key`, `machine_id`, `allowed_models`                     |
| `db_meta`                  | දත්ත සමුදා පාරදත්ත                       | `key`, `value`                                                          |
| `usage_history`            | ඉල්ලීම් භාවිත වාර්තා                     | `id`, `provider`, `model`, `tokens_input`, `tokens_output`, `timestamp` |
| `call_logs`                | ඉල්ලීම් දත්තභාර සහ ප්රතිචාර              | `id`, `timestamp`, `status`, `model`, `provider`, `latency_ms`          |
| `proxy_logs`               | ප්රොක්සි ඉල්ලීම් ලොග්                    | `id`, `timestamp`, `proxy_type`, `status`, `provider`                   |
| `domain_fallback_chains`   | මාදිලියෙන් සපයන්නාට යොමු වන දාම          | `model`, `chain`                                                        |
| `domain_budgets`           | එක් එක් වසම සඳහා වියදම් අයවැය            | `api_key_id`, `daily_limit_usd`, `warning_threshold`, `reset_interval`  |
| `domain_budget_reset_logs` | අයවැය යළි සැකසීමේ ඉතිහාසය                | `id`, `api_key_id`, `reset_interval`, `previous_spend`, `reset_at`      |
| `domain_cost_history`      | එක් එක් වසම සඳහා පිරිවැය නිරීක්ෂණය       | `id`, `api_key_id`, `cost`, `timestamp`                                 |
| `domain_lockout_state`     | වසමේ අනුපාත-සීමා තත්ත්වය                 | `identifier`, `attempts`, `locked_until`                                |
| `domain_circuit_breakers`  | එක් එක් වසම සඳහා පරිපථ බිඳුම්කරු තත්ත්වය | `name`, `state`, `failure_count`, `last_failure_time`                   |
| `semantic_cache`           | LLM ප්රතිචාර හැඹිලිය                     | `id`, `signature`, `model`, `prompt_hash`, `response`                   |
| `quota_snapshots`          | ඓතිහාසික කෝටා ඡායාරූප                    | `id`, `provider`, `connection_id`, `window_key`, `remaining_percentage` |

### අතිරේක වගු (පසුකාලීන සංක්රමණ මඟින් එක් කරන ලද)

පසුකාලීන සංක්රමණ මඟින් පහත ආකාරයේ වගු එක් කරයි:

- `cli_tool_state` (සංක්රමණය 011) — CLI මෙවලම් තත්ත්වය
- `mcp_*` වගු — MCP සේවාදායක විගණනය
- `a2a_*` වගු — A2A කාර්ය තත්ත්වය
- `usage_*` වගු — භාවිත නිරීක්ෂණය
- `plugin_*` වගු — ප්ලගිනය පද්ධතිය
- `skill_executions` — කුසලතා ක්රියාත්මක කිරීමේ ඉතිහාසය
- `memory_*` වගු — මතක පද්ධතිය
- `compression_*` වගු — සම්පීඩන පද්ධතිය
- `webhook_*` වගු — webhook බෙදාහැරීමේ ලොගය
- `acp_*` වගු — නියෝජිත සේවාලාභී ප්රොටෝකෝලය
- `oneproxy_*` වගු — 1proxy වෙළඳපොළ
- `proxy_assignments` — ප්රොක්සි විෂයපථ බැඳීම්
- `detailed_call_artifacts` — ඇමතුම් ලොග් කලාකෘති පාරදත්ත
- `quota_alert_history` — කෝටා ඇඟවීම් විගණනය
- `command_code_auth_sessions` — Command Code OAuth සැසි

වගු ~30+ක සම්පූර්ණ ලැයිස්තුව `src/lib/db/migrations/` තුළ ඇත.

---

## සංක්රමණ

OmniRoute විසින් `src/lib/db/migrations/` තුළ **අනුවාදගත, idempotent සංක්රමණ** භාවිත කරයි. සෑම සංක්රමණයක්ම `NNN_description.sql` ලෙස නම් කළ තනි SQL ගොනුවකි.

### සංක්රමණ නම් කිරීම

```
001_initial_schema.sql
002_mcp_a2a_tables.sql
003_provider_node_custom_paths.sql
...
021_combo_call_log_targets.sql
```

### සංක්රමණ ක්රියාත්මක වන ආකාරය

ආරම්භයේදී, `migrationRunner.ts`:

1. `_omniroute_migrations` වගුව නොපවතී නම් එය නිර්මාණය කරයි
2. දැනටමත් යොදා ඇති සංක්රමණ විමසයි
3. නව සංක්රමණ අනුපිළිවෙළින් යොදයි, සෑම එකක්ම transaction එකක් තුළ ක්රියාත්මක කරයි
4. යොදා ඇති සෑම සංක්රමණයක්ම timestamp එකක් සමඟ සටහන් කරයි

```ts
// src/lib/db/migrationRunner.ts (සරල කළ)
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

සංක්රමණ **idempotent** විය යුතුය — ඒවා දෙවරක් ක්රියාත්මක කිරීමෙන් කිසිදු වෙනසක් සිදු නොවිය යුතුය:

```sql
-- 004_proxy_registry.sql
CREATE TABLE IF NOT EXISTS proxy_registry (
  id TEXT PRIMARY KEY,
  host TEXT NOT NULL,
  port INTEGER NOT NULL,
  ...
);
```

`IF NOT EXISTS`, `IF EXISTS`, සහ `OR IGNORE` / `OR REPLACE` වගන්ති අවශ්ය තරම් භාවිත කරන්න.

### නව සංක්රමණයක් එක් කිරීම

1. **ඊළඟ අංකය හඳුනා ගන්න**: `ls src/lib/db/migrations/ | tail -1`
2. **ගොනුව සාදන්න**: `NNN_my_change.sql`
3. **ආරක්ෂිත DDL භාවිත කරන්න**: `CREATE TABLE IF NOT EXISTS`, `ALTER TABLE ... ADD COLUMN`
4. **දත්ත ප්රවේශමෙන් backfill කරන්න**: පවතින පේළි හැසිරවීමට `UPDATE ... WHERE ...` භාවිත කරන්න
5. **පිටපතක් මත පරීක්ෂා කරන්න**: පරීක්ෂා නොකළ සංක්රමණ කිසිවිටෙක production පරිසරයේ ක්රියාත්මක නොකරන්න

උදාහරණය:

```sql
-- 022_add_combo_priority.sql
ALTER TABLE combos ADD COLUMN priority INTEGER DEFAULT 100;
UPDATE combos SET priority = 100 WHERE priority IS NULL;
CREATE INDEX IF NOT EXISTS idx_combos_priority ON combos(priority);
```

> **පසුගාමී අනුකූලතාව නොමැති වෙනස්කම්** (උදා., තීරු ඉවත් කිරීම) සංකීර්ණ වේ. OmniRoute downgrade සඳහා සහාය නොදක්වයි — සංක්රමණයක් යෙදූ පසු, schema වෙනස ස්ථිර වේ. ඒ අනුව සැලසුම් කරන්න.

---

## ගබඩා කර ඇති දත්ත සංකේතනය

සංවේදී ක්ෂේත්ර (API යතුරු, OAuth tokens, connection strings) ගබඩා කර ඇති විට **AES-256-GCM** භාවිතයෙන් සංකේතනය කෙරේ.

### එය ක්රියා කරන ආකාරය

```ts
// src/lib/db/encryption.ts (සරල කළ)
const key = deriveKeyFromPassphrase(passphrase, salt);
const iv = randomBytes(12);
const cipher = createCipheriv("aes-256-gcm", key, iv);
const encrypted = Buffer.concat([cipher.update(plaintext), cipher.final()]);
const authTag = cipher.getAuthTag();
return { encrypted, iv, authTag };
```

### එය භාවිත වන ස්ථාන

- `provider_connections.api_key` — යෙදුම් මට්ටමේදී සංකේතනය කෙරේ
- `provider_connections.access_token`, `refresh_token`, `id_token` — යෙදුම් මට්ටමේදී සංකේතනය කෙරේ
- `namespace = "secrets"` සහිත `key_value` ඇතුළත් කිරීම් — යෙදුම් මට්ටමේදී සංකේතනය කෙරේ
- `proxy_registry.auth` — පවතී නම් යෙදුම් මට්ටමේදී සංකේතනය කෙරේ

### සංකේතන යතුර

සංකේතන යතුර **passphrase** එකකින් (`STORAGE_ENCRYPTION_KEY` env var හරහා සකසන) සහ **salt** එකකින් (DB තුළ ගබඩා කරන) ව්යුත්පන්න කෙරේ. දත්ත විකේතනය කිරීමට දෙකම අවශ්ය වේ.

```bash
# ආරක්ෂිත passphrase එකක් ජනනය කරන්න
openssl rand -hex 32

# .env තුළ සකසන්න
STORAGE_ENCRYPTION_KEY=<your-key>
```

> **අතිශයින් වැදගත්**: සංකේතන යතුර නැතිවීමෙන් සියලුම සංකේතනය කළ දත්ත වෙත ඇති ප්රවේශය අහිමි වේ. **යතුර database එකෙන් වෙන්ව backup කරන්න**.

### සංකේතනය නොකරන දෑ

කාර්ය සාධන හේතු මත, පහත දෑ plaintext ලෙස ගබඩා කෙරේ:

- Provider දර්ශන නාම
- Model අර්ථ දැක්වීම් (දැනටමත් පොදුය)
- Routing නීති
- භාවිත වාර්තා (PII නොමැත)

---

## සංකේතන සීමාවන් (v3.8.16+)

OmniRoute සංකේතන ක්රම දෙකක් විනිවිදභාවයෙන් හැසිරවීමට **`migrateLegacyEncryptedString()`** භාවිත කරයි:

- **පැරණි** (v3.5.0ට පෙර): XOR-පාදක “සංකේතනය” (සැබෑ ගුප්තකේතනයක් නොවේ)
- **වත්මන්**: නිසි IV සහ සත්යාපන ටැගයක් සහිත AES-256-GCM

සංක්රමණ සහායකය පැරණි ආකෘතිය හඳුනාගෙන, පළමු වර කියවීමේදී නව ක්රමය භාවිතයෙන් නැවත සංකේතනය කරයි. මෙයින් ඔබට අක්තපත්ර අහිමි නොකර පැරණි දත්ත සමුදායක් උත්ශ්රේණිගත කළ හැක.

---

## කියවීම් හැඹිලිය

නිතර කියවන දත්ත (ආකෘති, සැපයුම්කරුවන්, සැකසුම්) සඳහා, `readCache.ts` **මතකය තුළ ඇති හැඹිලියක්** සපයයි:

```ts
// ආරම්භයේදී හැඹිලිගත කර, ලිවීමේදී අවලංගු කරයි
const providers = await getCachedProviders(); // වේගවත්, මතකය තුළ
const fresh = await listProviders(); // මන්දගාමී, DB වෙත ප්රවේශ වේ
```

| හැඹිලිගත අස්තිත්වය     | හැඹිලි යතුර    | TTL                  |
| ---------------------- | -------------- | -------------------- |
| `models`               | `models:v1`    | ලිවීමක් සිදු වන තුරු |
| `provider_connections` | `providers:v1` | ලිවීමක් සිදු වන තුරු |
| `settings`             | `settings:v1`  | ලිවීමක් සිදු වන තුරු |
| `combos`               | `combos:v1`    | ලිවීමක් සිදු වන තුරු |

අදාළ වගුවට සිදු කරන සෑම ලිවීමකදීම හැඹිලිය අවලංගු වේ.

---

## උපස්ථ කිරීම සහ ප්රතිසාධනය

### අතින් උපස්ථ කිරීම

```bash
# දේශීය උපස්ථයක් සෑදීමට CLI භාවිත කරන්න
omniroute backup create --name pre-migration

# නැතහොත් API හරහා
curl -X PUT http://localhost:20128/api/db-backups \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

උපස්ථ ගොනුවේ පහත දෑ ඇතුළත් වේ:

- සියලුම DB වගු (JSON ලෙස අනුක්රමිකකරණය කර ඇත)
- ඇමතුම් ලොග් කෞතුක වස්තු (base64-කේතනය කළ, විකල්ප)
- සැකසුම් + රහස් (සංකේතනය කළ)
- ප්ලගිනයේ වින්යාසය

### ප්රතිසාධනය

```bash
# CLI හරහා
omniroute restore pre-migration

# API හරහා
curl -X POST http://localhost:20128/api/db-backups/restore \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

> **අවවාදයයි**: ප්රතිසාධනය කිරීම සම්පූර්ණ DB එකම උඩින් ලියයි. පළමුව සියලු සේවාලාභීන් නවත්වන්න.

### ස්වයංක්රීය උපස්ථ

```bash
# CLI හරහා ස්වයංක්රීය දෛනික උපස්ථ සබල කරන්න
omniroute backup auto enable --cron "0 2 * * *" --retention 7
```

කාලසටහන, සෑම තත්පර 30කට වරක් (පෙරනිමියෙන්) ක්රියාත්මක වන පසුබිම් කාර්යයක් මඟින් සේවාදායක පාර්ශ්වයේ ක්රියාත්මක කරනු ලබන අතර, එය දේශීය සේවාදායක වේලාවට සාපේක්ෂව cron ප්රකාශනය ඇගයීමට ලක් කරයි.

| විචල්යය                                     | පෙරනිමිය | විස්තරය                                                                                                                         |
| ------------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_BACKUP_SCHEDULE_JOB_INTERVAL_MS` | `30000`  | ms වලින් ටික් කාලාන්තරය (අවම `5000`). ගැළපෙන cron මිනිත්තුව තුළ විශ්වාසදායකව ක්රියාත්මක වීමට මෙය තත්පර 60කට වඩා කෙටි විය යුතුය. |

### SQLite සජීවී උපස්ථය

ක්රියාත්මක DB එකක් සේවා අක්රියතාවකින් තොරව උපස්ථ කිරීමට:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".backup /backups/omniroute-hot.db"
```

මෙය SQLite හි මාර්ගගත උපස්ථ API භාවිත කරයි — OmniRoute ක්රියාත්මක වන අතරතුර ධාවනය කිරීම ආරක්ෂිතය.

---

## කාර්යසාධන සුසර කිරීම

### WAL ප්රකාරය

WAL පෙරනිමියෙන් සක්රීය කර ඇත. ලිවීම් බහුල කාර්යභාර සඳහා, පහත දෑ සලකා බලන්න:

```sql
PRAGMA wal_autocheckpoint = 1000;  -- සෑම පිටු 1000කටම පරීක්ෂණ ලක්ෂ්යයක් සාදන්න
PRAGMA journal_size_limit = 67108864;  -- 64MB WAL සීමාව
```

### දර්ශක

කාර්යසාධනය සඳහා ප්රධාන දර්ශක (සංක්රමණ මඟින් ස්වයංක්රීයව සාදනු ලැබේ):

- `idx_models_provider` — සපයන්නා අනුව ආකෘති සෙවීම්
- `idx_combo_targets_combo_id` — සංයෝජන ඉලක්ක විස්තාරණය
- `idx_usage_history_api_key_timestamp` — භාවිත විශ්ලේෂණ
- `idx_quota_snapshots_api_key_window` — කෝටා ලුහුබැඳීම
- `idx_call_logs_timestamp` — ඇමතුම් ලොග් විමසුම්

නව දර්ශකයක් එක් කිරීමට, සංක්රමණයක් සාදන්න:

```sql
-- 023_add_my_index.sql
CREATE INDEX IF NOT EXISTS idx_my_table_my_column ON my_table(my_column);
```

### මතකයට සිතියම්ගත කළ I/O

ඉතා විශාල දත්ත සමුදා (>10GB) සඳහා, SQLite pragma හරහා මතක සිතියම්ගත කිරීම සකස් කළ හැක:

```sql
-- SQLite pragma හරහා සකසන්න (core.ts හෝ ධාවන කාලය තුළ සකස් කරන්න)
PRAGMA mmap_size = 268435456;  -- 256MB
```

### සම්පීඩනය

දිගු කාලයක් ක්රියාත්මක වන OmniRoute අවස්ථා සඳහා වරින් වර `VACUUM` ධාවනය කිරීම ප්රයෝජනවත් වේ:

```bash
sqlite3 ~/.omniroute/storage.sqlite "VACUUM;"
```

අඩු තදබදයක් ඇති කාල පරාසවලදී මාසිකව ධාවනය කරන්න. (WAL ප්රකාරය අවශ්යතාව අඩු කළද, එය සම්පූර්ණයෙන් ඉවත් නොකරයි.)

---

## සෞඛ්ය පරීක්ෂාව

`src/lib/db/healthCheck.ts` මඟින් **දත්ත සමුදා මට්ටමේ සෞඛ්ය නිර්ණය** සපයයි:

ක්රියාපද දෙකටම සත්යාපනය අවශ්ය වේ (එසේ නොමැති නම් `401`). `GET` නිර්ණය පමණක් සිදු කරයි; `POST` මඟින්
`autoRepair` සක්රීය කර එම පරීක්ෂාවම ධාවනය කරයි.

```bash
GET  /api/db/health   # නිර්ණය කරන්න
POST /api/db/health   # නිර්ණය කරන්න + අලුත්වැඩියා කරන්න
```

ප්රතිචාරය යනු `runDbHealthCheck()` මඟින් නිපදවන `DbHealthCheckResult` වේ
(`src/lib/db/healthCheck.ts`):

```json
{
  "isHealthy": false,
  "issues": [
    {
      "type": "broken_reference",
      "table": "domain_budgets",
      "description": "වසම් අයවැය විසින් තවදුරටත් නොපවතින API යතුරු යොමු කර ඇත.",
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

| ක්ෂේත්රය          | අර්ථය                                                                                                                                            |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `isHealthy`       | `issues` හිස් වූ විට `true` වේ. `driver` කිසි විටෙකත් එයට බලපාන්නේ නැත.                                                                          |
| `issues[].type`   | `integrity_check_failed`, `broken_reference`, `stale_snapshot`, `invalid_state` යන අගයන්ගෙන් එකකි.                                               |
| `repairedCount`   | මෙම ධාවනය අතරතුර අලුත්වැඩියා කළ පේළි; `autoRepair` false වන විට සැමවිටම `0` වේ.                                                                  |
| `backupCreated`   | අලුත්වැඩියා කිරීමට පෙර උපස්ථයක් ගත්තේද යන්න.                                                                                                     |
| `checkedAt`       | ධාවනය සහ එය ලියන ඕනෑම අලුත්වැඩියා සටහනක් යන දෙකම විසින් බෙදාගන්නා ISO කාල මුද්රාව.                                                               |
| `driver.name`     | පරීක්ෂා කළ දත්ත සමුදායට සේවය සපයන SQLite ධාවකය.                                                                                                  |
| `driver.degraded` | ලිවීම් දත්ත සමුදා ගොනුවෙන් ස්ථිරව සුරක්ෂිත නොවන විට `true` වේ — `sql.js` WASM විකල්පය (සම්පූර්ණ-ගොනු ස්ථායිතාව) හෝ මතකය තුළ පවතින දත්ත සමුදායක්. |

එම දත්ත සමූහයම `omniroute_db_health_check` MCP මෙවලම මඟින් ආපසු ලබා දෙයි.

දූෂණය හඳුනා ගැනීමට `PRAGMA integrity_check` ධාවනය කරන්න:

```bash
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"
# මෙය මුද්රණය විය යුතුය: ok
```

එය `ok` හැර වෙනත් යමක් ආපසු ලබා දෙන්නේ නම්, **වහාම දත්ත සමුදාය භාවිත කිරීම නවතා** උපස්ථයකින් ප්රතිසාධනය කරන්න.

---

## ආපදා ප්රතිසාධනය

### අවස්ථාව 1: WAL ගොනුව නැති වීම

`-wal` ගොනුව නොමැති නමුත් `-shm` සහ ප්රධාන DB එක නොවෙනස්ව පවතී:

```bash
# ඊළඟ වර විවෘත කිරීමේදී ස්වයංක්රීයව ප්රතිසාධනය වේ
omniroute
```

SQLite හට ස්වයංක්රීයව ප්රතිසාධනය කළ නොහැකි නම්:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".recover" > recovered.sql
sqlite3 recovered.db < recovered.sql
mv recovered.db ~/.omniroute/storage.sqlite
```

### අවස්ථාව 2: ප්රධාන DB ගොනුව දූෂිත වීම

උපස්ථ පිටපතකින් ප්රතිසාධනය කරන්න:

```bash
omniroute sync pull --merge   # හෝ: omniroute backup restore <backup-id>
```

### අවස්ථාව 3: සංකේතන යතුර නැති වීම

යතුර නොමැතිව **ප්රතිසාධනය කළ නොහැක**. සංකේතනය කළ ක්ෂේත්ර කියවිය නොහැක. නව අක්තපත්ර සමඟ සියලු සැපයුම්කරුවන් නැවත අතින් එක් කරන්න.

> **අවදානම අවම කිරීම**: සෑම විටම සංකේතන යතුර වෙනම උපස්ථ කරන්න. එය මුරපද කළමනාකරුවක හෝ KMS එකක තැබීම වඩාත් සුදුසුය.

### අවස්ථාව 4: තැටිය පිරී තිබීම

SQLite විසින් `SQLITE_FULL` දෝෂ ලබා දෙනු ඇත. තැටි ඉඩ නිදහස් කර, පසුව:

```bash
# ඉඩ නිදහස් කිරීමට WAL පිරික්සුම් ලක්ෂ්යයක් සාදන්න
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA wal_checkpoint(TRUNCATE);"
```

---

## පොදු මෙහෙයුම්

### වගුවක් පරීක්ෂා කිරීම

```bash
sqlite3 ~/.omniroute/storage.sqlite "SELECT * FROM api_keys LIMIT 5;"
```

### සියලු වගුවල පේළි ගණන ගණනය කිරීම

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';
EOF
```

### සියලු දත්ත යළි සැකසීම (මකා දැමීම)

```bash
# පළමුව OmniRoute නවත්වන්න
omniroute stop

# DB ගොනුව මකන්න
rm ~/.omniroute/storage.sqlite*

# නැවත ආරම්භ කරන්න (හිස් DB එකක් නැවත සාදනු ඇත)
omniroute
```

**තෝරාගත්** යළි සැකසීමක් සඳහා (සැපයුම්කරුවන් තබාගෙන, භාවිත දත්ත මකා දැමීමට):

```bash
DELETE FROM usage_history WHERE timestamp < datetime('now', '-30 day');
DELETE FROM call_logs WHERE timestamp < datetime('now', '-30 day');
DELETE FROM proxy_logs WHERE timestamp < datetime('now', '-30 day');
```

### තනි වගුවක් නිර්යාත කිරීම

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
.mode csv
.output api_keys.csv
SELECT * FROM api_keys;
EOF
```

---

## දෝෂ නිරාකරණය

### "දත්ත සමුදාය අගුළු දමා ඇත"

වෙනත් ක්රියාවලියක් ලිවීමේ අගුලක් රඳවාගෙන සිටී. පහත විකල්පවලින් එකක් භාවිත කරන්න:

- අනෙක් ක්රියාවලිය අවසන් වන තෙක් රැඳී සිටින්න (`lsof | grep storage.sqlite` පරීක්ෂා කරන්න)
- අනෙක් ක්රියාවලිය බලහත්කාරයෙන් අවසන් කරන්න
- ගැටලුව දිගටම පවතී නම්, OmniRoute නැවත ආරම්භ කරන්න

### "විදේශීය යතුරු සීමාව අසාර්ථක විය"

වසම් මොඩියුලයක් යොමු අඛණ්ඩතාව උල්ලංඝනය කරයි. පහත දෑ පරීක්ෂා කරන්න:

- පරායත්ත වගුවල මව් පේළියක් නොමැති පේළි
- ප්රචාරණය නොවූ අනුක්රමික මකා දැමීම්
- විදේශීය යතුරක් වෙනස් කළ මෑතකාලීන සංක්රමණයක්

උල්ලංඝනයන් සොයා ගැනීමට `PRAGMA foreign_key_check;` ධාවනය කරන්න.

### "මතකය ප්රමාණවත් නොවේ"

SQLite හි මතකයට සිතියම්ගත කළ I/O මෙහෙයුම් පද්ධතියේ සීමාව ඉක්මවා යයි. SQLite pragma එක හරහා එය අඩු කරන්න:

```sql
PRAGMA mmap_size = 134217728;  -- 256MB වෙනුවට 128MB
```

නැතහොත් අක්රීය කරන්න:

```sql
PRAGMA mmap_size = 0;
```

### "සංක්රමණය අතරමඟ අසාර්ථක විය"

සංක්රමණය ගනුදෙනුවක් තුළ ධාවනය වූ බැවින්, එය ආපසු පෙරළී තිබිය යුතුය. එසේ නොමැති නම්:

1. **OmniRoute නවත්වන්න** (තවදුරටත් උත්සාහ කිරීම වැළැක්වීමට)
2. `sqlite3` සමඟ **DB තත්ත්වය පරීක්ෂා කරන්න**
3. අර්ධ වශයෙන් සිදු වූ සංක්රමණය **අතින් නිවැරදි කරන්න**
4. OmniRoute **නැවත ධාවනය කරන්න** (සංක්රමණය නැවත උත්සාහ කරනු ඇත)

මෙය වළක්වා ගැනීමට, සෑම විටම පළමුව පිටපතක් මත සංක්රමණ පරීක්ෂා කරන්න.

---

## වැඩිදුර බලන්න

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — භාවිත වගු
- [MONITORING_GUIDE.md](./MONITORING_GUIDE.md) — සෞඛ්ය අධීක්ෂණය
- [RELEASE_CHECKLIST.md](./RELEASE_CHECKLIST.md) — නිකුතු ප්රවාහය
- මූලාශ්රය: `src/lib/db/` (ගොනු 80+, කේත පේළි ~25K)
