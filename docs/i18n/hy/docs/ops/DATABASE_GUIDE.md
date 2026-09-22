# Database Schema & Operations Guide (Հայերեն)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/DATABASE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/DATABASE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/DATABASE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/DATABASE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/DATABASE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/DATABASE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/DATABASE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/DATABASE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/DATABASE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/DATABASE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/DATABASE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/DATABASE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/DATABASE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/DATABASE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/DATABASE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/DATABASE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/DATABASE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/DATABASE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/DATABASE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/DATABASE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/DATABASE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/DATABASE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/DATABASE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/DATABASE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/DATABASE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/DATABASE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/DATABASE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/DATABASE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/DATABASE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/DATABASE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/DATABASE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/DATABASE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/DATABASE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/DATABASE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/DATABASE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/DATABASE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/DATABASE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/DATABASE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/DATABASE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/DATABASE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/DATABASE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/DATABASE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/DATABASE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/DATABASE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/DATABASE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/DATABASE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/DATABASE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/DATABASE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/DATABASE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/DATABASE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/DATABASE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/DATABASE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/DATABASE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/DATABASE_GUIDE.md)

---

> **Կարճ ասած**․ OmniRoute-ը որպես հիմնական պահոց օգտագործում է **SQLite՝ WAL մատենավորմամբ**, իսկ զգայուն դաշտերի հանգստի վիճակում կոդավորման համար՝ **AES-256-GCM**։ Այս ուղեցույցն ընդգրկում է սխեման, միգրացիաները, պահուստավորումն ու վերականգնումը և շահագործման ընթացակարգերը։

**Աղբյուրներ․**

- `src/lib/db/core.ts` — եզակի օրինակ + SCHEMA_SQL (17 հիմնական աղյուսակ)
- `src/lib/db/migrationRunner.ts` — տարբերակավորված միգրացիաներ
- `src/lib/db/migrations/` — 167 տարբերակավորված SQL ֆայլ
- `src/lib/db/encryption.ts` — կոդավորման օժանդակ գործառույթներ
- `src/lib/db/backup.ts` — պահուստային պատճենի արտահանում/ներմուծում
- `src/lib/db/healthCheck.ts` — վիճակի ախտորոշում

---

## Ինչո՞ւ SQLite։

OmniRoute-ը մի քանի պատճառով PostgreSQL/MySQL-ի փոխարեն ընտրել է SQLite-ը․

| Գործոն                  | SQLite                                                | PostgreSQL                                                      |
| ----------------------- | ----------------------------------------------------- | --------------------------------------------------------------- |
| **Տեղակայում**          | Ներկառուցված է՝ առանձին սերվեր չի պահանջվում          | Պահանջում է սերվերի կարգավորում                                 |
| **Կոդավորում**          | Հավելվածի մակարդակում (AES-256-GCM)                   | Ներկառուցված TDE                                                |
| **Արտադրողականություն** | Ավելի արագ է փոքր/միջին ծանրաբեռնվածությունների համար | Ավելի հարմար է հսկայական քանակի միաժամանակյա գրանցումների համար |
| **Զուգահեռություն**     | WAL ռեժիմը թույլ է տալիս միաժամանակյա ընթերցումներ    | Ամբողջական MVCC                                                 |
| **Պահուստավորում**      | Մեկ ֆայլի պատճենում                                   | `pg_dump` կամ ֆայլային համակարգի ակնթարթային պատճեն             |
| **Կիրառման դեպք**       | Յուրաքանչյուր օգտատիրոջ համար տեղադրում, ներկառուցված | Բազմավարձակալ SaaS                                              |

**Մեկ օգտատիրոջ, մեկ օրինակի** տեղակայումների դեպքում (OmniRoute-ի հիմնական կիրառման դեպքը) SQLite-ն ավելի պարզ և արագ է։

### WAL մատենավորում

`core.ts`-ը տվյալների բազան բացում է **WAL (նախնական գրանցմամբ մատենավորում) ռեժիմով**․

```ts
// src/lib/db/core.ts
db.pragma("journal_mode = WAL");
db.pragma("busy_timeout = 2000");
db.pragma("synchronous = NORMAL");
db.pragma(`cache_size = -${DEFAULT_DATABASE_SETTINGS.optimization.cacheSize}`);
```

WAL-ը գրանցման ընթացքում թույլ է տալիս **միաժամանակյա ընթերցումներ**, ինչը կարևոր է կառավարման վահանակի համար, որը հարցումներ է կատարում այն ժամանակ, երբ հարցումները գրանցվում են։

Քեշի լռելյայն չափը **65,536 KiB (64 MiB)** է։ SQLite-ը բացասական
`cache_size`-ը մեկնաբանում է որպես KiB-երով արտահայտված մոտավոր վերին սահման և էջերը հատկացնում է ըստ պահանջի։
**Կարգավորումներ > Համակարգ և պահոց > Քեշի չափ** բաժինն ընդունում է **1-ից
1,000,000 KiB** ամբողջ արժեքներ․ կարգավորումը պահպանելիս այն կիրառվում է տվյալների բազայի ակտիվ կապի նկատմամբ,
իսկ գործարկման ժամանակ OmniRoute-ը վերականգնում է պահպանված արժեքը։

---

## Տվյալների բազայի տեղադրությունը

SQLite ֆայլը պահվում է հետևյալ վայրում․

| ՕՀ      | Ուղի                                                             |
| ------- | ---------------------------------------------------------------- |
| Linux   | `~/.omniroute/storage.sqlite`                                    |
| macOS   | `~/.omniroute/storage.sqlite`                                    |
| Windows | `%USERPROFILE%\.omniroute\storage.sqlite`                        |
| Docker  | `/app/data/storage.sqlite` (կարգավորվում է `DATA_DIR`-ի միջոցով) |

Ուղեկցող ֆայլեր․

- `storage.sqlite-wal` — նախնական գրանցման մատյան
- `storage.sqlite-shm` — համօգտագործվող հիշողության ֆայլ
- `call_logs/` — հարցման օգտակար տվյալների արտեֆակտներ (եթե միացված է)

**Տեղադրությունը վերասահմանելու համար․**

```bash
DATA_DIR=/custom/path omniroute
```

---

## Դոմենային մոդուլների ճարտարապետություն

OmniRoute-ի տվյալների բազան `src/lib/db/`-ում ունի **վերին մակարդակի 110 TypeScript մոդուլ**։ Յուրաքանչյուր դոմենային մոդուլ՝

- Տիրապետում է մեկ կամ մի քանի որոշակի աղյուսակների
- Արտահանում է տիպավորված CRUD ֆունկցիաներ
- Երբեք չի աշխատում այլ մոդուլի աղյուսակների հետ
- Տվյալների բազա մուտք գործելու համար օգտագործում է `core.ts`-ի `getDbInstance()` ֆունկցիան

### Տվյալների բազայի վերին մակարդակի 110 մոդուլները

OmniRoute-ը `src/lib/db/`-ում ունի **վերին մակարդակի 110 TypeScript ֆայլ**։ Ստորև ներկայացված է հիմնական մոդուլների ընտրանի․ ամբողջական ցանկը տե՛ս պանակի պարունակության ցուցակում։

| Մոդուլ                  | Աղյուսակներ                                                    | Պատասխանատվություն                                                                         |
| ----------------------- | -------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| `providers.ts`          | `provider_connections`                                         | OAuth/API բանալիով մատակարարների գրանցում և հավատարմագրեր                                  |
| `models.ts`             | `key_value` (մոդելների տվյալներ)                               | Մոդելների սահմանումներ, հնարավորություններ, գնագոյացում                                    |
| `combos.ts`             | `combos`                                                       | Կոմբինացված երթուղավորման կարգավորումներ և հերթականություն                                 |
| `apiKeys.ts`            | `api_keys`                                                     | API բանալիների կենսացիկլ, հասանելիության շրջանակներ, քվոտաների հաշվառում                   |
| `settings.ts`           | `key_value`, `api_keys`, `combos`                              | Համակարգի կազմաձևում և ընդհանուր KV պահոց                                                  |
| `backup.ts`             | —                                                              | Պահուստային պատճենի արտահանման/ներմուծման գործողություններ                                 |
| `proxies.ts`            | `proxy_registry`, `proxy_assignments`, `provider_connections`  | Պրոքսիի կազմաձևեր և երթուղավորման կանոններ                                                 |
| `prompts.ts`            | `prompt_templates`                                             | Վերօգտագործելի հրահանգների ձևանմուշներ, տարբերակների կառավարում                            |
| `webhooks.ts`           | `webhooks`                                                     | Իրադարձություններով գործարկվող webhook բաժանորդագրություններ և մատյաններ                   |
| `detailedLogs.ts`       | `request_detail_logs`                                          | Յուրաքանչյուր հարցման աուդիտային գրանցում (ըստ ցանկության, մեծ ծավալով)                    |
| `domainState.ts`        | `domain_*` (5 աղյուսակ)                                        | Դոմենային բյուջեներ, անջատիչներ, արգելափակումներ, պահուստային շղթաներ, ծախսերի պատմություն |
| `registeredKeys.ts`     | `registered_keys`, `account_key_limits`, `provider_key_limits` | MCP/A2A-ի թույլատրված API բանալիներ                                                        |
| `quotaSnapshots.ts`     | `quota_snapshots`                                              | Քվոտաների օգտագործման պատմական տվյալներ                                                    |
| `modelComboMappings.ts` | `model_combo_mappings`                                         | Մոդելների համապատասխանեցում լռելյայն կոմբինացիաներին                                       |
| `cliToolState.ts`       | `cli_tool_state`                                               | CLI-ին հատուկ մշտական վիճակ                                                                |
| `encryption.ts`         | —                                                              | Դաշտերի գաղտնագրման/վերծանման օժանդակ գործիքներ                                            |
| `readCache.ts`          | —                                                              | Հիշողության մեջ պահվող քեշ՝ ընթերցման ինտենսիվ գործողությունների համար                     |
| `secrets.ts`            | `key_value` (գաղտնագրված գրառումներ)                           | Գաղտնագրված գաղտնիքների պահոց                                                              |
| `stateReset.ts`         | —                                                              | Թեստավորման համար տվյալների բազայի վիճակի մաքրում/վերակայում                               |
| `contextHandoffs.ts`    | `context_handoffs`                                             | Սեսիայի համատեքստ՝ գործակալի փոխանցման համար                                               |
| `usage*.ts`             | `usage_history`, `call_logs`, `proxy_logs`                     | Օգտագործման հաշվառում                                                                      |
| `compression*.ts`       | `compression_settings`, `compression_combos`                   | Սեղմման կազմաձևում                                                                         |

### Մոդուլների սահմանները

Ճարտարապետական հիմնական կանոն՝ **մոդուլներն ուղղակիորեն հասանելիություն չեն ստանում միմյանց աղյուսակներին**։ Մեկ այլ մոդուլի տվյալների հետ աշխատելու համար ներմուծեք ֆունկցիան այդ մոդուլից։

```ts
// ❌ ՍԽԱԼ․ ուղղակի SQL հարցում մեկ այլ մոդուլից
db.prepare("SELECT * FROM provider_connections").all();

// ✅ ՃԻՇՏ․ օգտագործեք providers մոդուլի ֆունկցիան
import { listProviders } from "@/lib/db/providers";
const providers = await listProviders();
```

Այս կանոնը վերահսկվում է կոդի վերանայման ընթացքում․ ստատիկ ստուգում չկա, սակայն խախտումները նշվում են։

---

## Հիմնական սխեմա (17 աղյուսակ)

`core.ts`-ը սահմանում է `SCHEMA_SQL`-ի 17 հիմնական աղյուսակները։ Դրանք ստեղծվում են `001_initial_schema.sql` միգրացիայի միջոցով և կազմում են հիմնական սխեման։

### Հիմնական աղյուսակներ (ստեղծված սկզբնական միգրացիայի ժամանակ)

| Աղյուսակ                   | Նպատակ                                         | Հիմնական սյունակներ                                                     |
| -------------------------- | ---------------------------------------------- | ----------------------------------------------------------------------- |
| `provider_connections`     | Մատակարարի հավատարմագրեր (գաղտնագրված)         | `id`, `provider`, `auth_type`, `api_key`, `is_active`                   |
| `provider_nodes`           | Մատակարարի հանգույցների երթուղավորման տվյալներ | `id`, `type`, `name`, `base_url`, `created_at`                          |
| `key_value`                | Ընդհանուր KV պահոց                             | `namespace`, `key`, `value`                                             |
| `combos`                   | Երթուղավորման համակցությունների սահմանումներ   | `id`, `name`, `data`, `sort_order`                                      |
| `api_keys`                 | Դարպասի API բանալիներ                          | `id`, `name`, `key`, `machine_id`, `allowed_models`                     |
| `db_meta`                  | Տվյալների բազայի մետատվյալներ                  | `key`, `value`                                                          |
| `usage_history`            | Հարցումների օգտագործման գրառումներ             | `id`, `provider`, `model`, `tokens_input`, `tokens_output`, `timestamp` |
| `call_logs`                | Հարցումների բովանդակություններ և պատասխաններ   | `id`, `timestamp`, `status`, `model`, `provider`, `latency_ms`          |
| `proxy_logs`               | Պրոքսի հարցումների մատյաններ                   | `id`, `timestamp`, `proxy_type`, `status`, `provider`                   |
| `domain_fallback_chains`   | Մոդելից մատակարար անցման շղթաներ               | `model`, `chain`                                                        |
| `domain_budgets`           | Յուրաքանչյուր տիրույթի ծախսային բյուջեներ      | `api_key_id`, `daily_limit_usd`, `warning_threshold`, `reset_interval`  |
| `domain_budget_reset_logs` | Բյուջեի վերակայման պատմություն                 | `id`, `api_key_id`, `reset_interval`, `previous_spend`, `reset_at`      |
| `domain_cost_history`      | Յուրաքանչյուր տիրույթի ծախսերի հետևում         | `id`, `api_key_id`, `cost`, `timestamp`                                 |
| `domain_lockout_state`     | Տիրույթի հաճախականության սահմանափակման վիճակ   | `identifier`, `attempts`, `locked_until`                                |
| `domain_circuit_breakers`  | Յուրաքանչյուր տիրույթի անջատիչի վիճակ          | `name`, `state`, `failure_count`, `last_failure_time`                   |
| `semantic_cache`           | LLM պատասխանների քեշ                           | `id`, `signature`, `model`, `prompt_hash`, `response`                   |
| `quota_snapshots`          | Քվոտայի պատմական ակնթարթային պատկերներ         | `id`, `provider`, `connection_id`, `window_key`, `remaining_percentage` |

### Լրացուցիչ աղյուսակներ (ավելացված հետագա միգրացիաների միջոցով)

Հետագա միգրացիաներն ավելացնում են այնպիսի աղյուսակներ, ինչպիսիք են՝

- `cli_tool_state` (միգրացիա 011) — CLI գործիքի վիճակ
- `mcp_*` աղյուսակներ — MCP սերվերի աուդիտ
- `a2a_*` աղյուսակներ — A2A առաջադրանքի վիճակ
- `usage_*` աղյուսակներ — օգտագործման հետևում
- `plugin_*` աղյուսակներ — փլագինների համակարգ
- `skill_executions` — հմտությունների կատարման պատմություն
- `memory_*` աղյուսակներ — հիշողության համակարգ
- `compression_*` աղյուսակներ — սեղմման համակարգ
- `webhook_*` աղյուսակներ — webhook առաքման մատյան
- `acp_*` աղյուսակներ — Agent Client Protocol
- `oneproxy_*` աղյուսակներ — 1proxy շուկա
- `proxy_assignments` — պրոքսիի տիրույթի կապակցումներ
- `detailed_call_artifacts` — կանչերի մատյանի արտեֆակտների մետատվյալներ
- `quota_alert_history` — քվոտայի ծանուցումների աուդիտ
- `command_code_auth_sessions` — Command Code OAuth աշխատաշրջաններ

Մոտ 30-ից ավելի աղյուսակների ամբողջական ցանկը գտնվում է `src/lib/db/migrations/`-ում։

---

## Միգրացիաներ

OmniRoute-ն օգտագործում է **տարբերակավորված, իդեմպոտենտ միգրացիաներ** `src/lib/db/migrations/`-ում։ Յուրաքանչյուր միգրացիա մեկ SQL ֆայլ է՝ `NNN_description.sql` անվանմամբ։

### Միգրացիաների անվանումներ

```
001_initial_schema.sql
002_mcp_a2a_tables.sql
003_provider_node_custom_paths.sql
...
021_combo_call_log_targets.sql
```

### Ինչպես են գործարկվում միգրացիաները

Գործարկման սկզբում `migrationRunner.ts`-ը՝

1. Ստեղծում է `_omniroute_migrations` աղյուսակը, եթե այն գոյություն չունի
2. Հարցում է կատարում՝ արդեն կիրառված միգրացիաները ստանալու համար
3. Հերթականությամբ կիրառում է բոլոր նոր միգրացիաները՝ յուրաքանչյուրն առանձին տրանզակցիայում
4. Գրանցում է յուրաքանչյուր կիրառված միգրացիան՝ ժամանակային դրոշմանիշով

```ts
// src/lib/db/migrationRunner.ts (պարզեցված)
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

### Իդեմպոտենտություն

Միգրացիաները պետք է լինեն **իդեմպոտենտ**՝ դրանց կրկնակի գործարկումը չպետք է որևէ գործողություն կատարի․

```sql
-- 004_proxy_registry.sql
CREATE TABLE IF NOT EXISTS proxy_registry (
  id TEXT PRIMARY KEY,
  host TEXT NOT NULL,
  port INTEGER NOT NULL,
  ...
);
```

Առատորեն օգտագործեք `IF NOT EXISTS`, `IF EXISTS` և `OR IGNORE` / `OR REPLACE` դրույթները։

### Նոր միգրացիայի ավելացում

1. **Որոշեք հաջորդ համարը**․ `ls src/lib/db/migrations/ | tail -1`
2. **Ստեղծեք ֆայլը**․ `NNN_my_change.sql`
3. **Օգտագործեք անվտանգ DDL**․ `CREATE TABLE IF NOT EXISTS`, `ALTER TABLE ... ADD COLUMN`
4. **Զգուշորեն լրացրեք առկա տվյալները**․ օգտագործեք `UPDATE ... WHERE ...`՝ առկա տողերը մշակելու համար
5. **Փորձարկեք պատճենի վրա**․ երբեք մի գործարկեք չփորձարկված միգրացիաներ արտադրական միջավայրում

Օրինակ՝

```sql
-- 022_add_combo_priority.sql
ALTER TABLE combos ADD COLUMN priority INTEGER DEFAULT 100;
UPDATE combos SET priority = 100 WHERE priority IS NULL;
CREATE INDEX IF NOT EXISTS idx_combos_priority ON combos(priority);
```

> **Հետադարձ անհամատեղելի փոփոխությունները** (օրինակ՝ սյունակների հեռացումը) բարդ են։ OmniRoute-ը ՉԻ աջակցում տարբերակի իջեցմանը․ միգրացիան կիրառելուց հետո սխեմայի փոփոխությունը մշտական է։ Պլանավորեք համապատասխանաբար։

---

## Պահպանված տվյալների կոդավորում

Զգայուն դաշտերը (API բանալիներ, OAuth տոկեններ, կապի տողեր) պահպանման ժամանակ կոդավորվում են **AES-256-GCM**-ի միջոցով։

### Ինչպես է այն աշխատում

```ts
// src/lib/db/encryption.ts (պարզեցված)
const key = deriveKeyFromPassphrase(passphrase, salt);
const iv = randomBytes(12);
const cipher = createCipheriv("aes-256-gcm", key, iv);
const encrypted = Buffer.concat([cipher.update(plaintext), cipher.final()]);
const authTag = cipher.getAuthTag();
return { encrypted, iv, authTag };
```

### Որտեղ է այն օգտագործվում

- `provider_connections.api_key` — կոդավորվում է հավելվածի մակարդակում
- `provider_connections.access_token`, `refresh_token`, `id_token` — կոդավորվում են հավելվածի մակարդակում
- `key_value` գրառումները, որոնցում `namespace = "secrets"` — կոդավորվում են հավելվածի մակարդակում
- `proxy_registry.auth` — կոդավորվում է հավելվածի մակարդակում (եթե առկա է)

### Կոդավորման բանալի

Կոդավորման բանալին ստացվում է **գաղտնաբառային արտահայտությունից** (սահմանվում է `STORAGE_ENCRYPTION_KEY` միջավայրի փոփոխականի միջոցով) և **աղից** (պահվում է ՏԲ-ում)։ Տվյալների վերծանման համար երկուսն էլ անհրաժեշտ են։

```bash
# Ստեղծել անվտանգ գաղտնաբառային արտահայտություն
openssl rand -hex 32

# Սահմանել .env-ում
STORAGE_ENCRYPTION_KEY=<your-key>
```

> **Խիստ կարևոր է**․ կոդավորման բանալին կորցնելը նշանակում է կորցնել բոլոր կոդավորված տվյալների հասանելիությունը։ **Բանալու պահուստային պատճենը պահեք տվյալների բազայից առանձին**։

### Ինչը ՉԻ կոդավորվում

Արդյունավետության նկատառումներով հետևյալ տվյալները պահվում են բաց տեքստով․

- Մատակարարների ցուցադրվող անունները
- Մոդելների սահմանումները (արդեն հանրային են)
- Երթուղավորման կանոնները
- Օգտագործման գրառումները (PII չեն պարունակում)

---

## Գաղտնագրման կարևոր նկատառումներ (v3.8.16+)

OmniRoute-ը կիրառում է **`migrateLegacyEncryptedString()`**՝ գաղտնագրման երկու սխեմաներն աննկատ կերպով մշակելու համար․

- **Հին** (մինչև v3.5.0)․ XOR-ի վրա հիմնված «գաղտնագրում» (իրական գաղտնագրում չէ)
- **Ընթացիկ**․ AES-256-GCM՝ պատշաճ IV-ով և իսկորոշման պիտակով

Միգրացիայի օժանդակ գործառույթը հայտնաբերում է հին ձևաչափը և առաջին ընթերցման ժամանակ վերագաղտնագրում է այն նոր սխեմայով։ Սա նշանակում է, որ կարող եք թարմացնել հին տվյալների բազան՝ առանց մուտքային տվյալները կորցնելու։

---

## Ընթերցման քեշ

Հաճախ ընթերցվող տվյալների համար (մոդելներ, մատակարարներ, կարգավորումներ) `readCache.ts`-ը տրամադրում է **հիշողության մեջ պահվող քեշ**․

```ts
// Քեշավորվում է մեկնարկի ժամանակ, անվավեր է դառնում գրանցման ժամանակ
const providers = await getCachedProviders(); // Արագ է, հիշողության մեջ
const fresh = await listProviders(); // Դանդաղ է, հարցում է կատարում DB-ին
```

| Քեշավորված էություն    | Քեշի բանալի    | TTL             |
| ---------------------- | -------------- | --------------- |
| `models`               | `models:v1`    | Մինչև գրանցումը |
| `provider_connections` | `providers:v1` | Մինչև գրանցումը |
| `settings`             | `settings:v1`  | Մինչև գրանցումը |
| `combos`               | `combos:v1`    | Մինչև գրանցումը |

Քեշն անվավեր է դառնում համապատասխան աղյուսակում յուրաքանչյուր գրանցումից հետո։

---

## Պահուստավորում և վերականգնում

### Ձեռքով պահուստավորում

```bash
# Տեղային պահուստային պատճեն ստեղծելու համար օգտագործեք CLI-ն
omniroute backup create --name pre-migration

# Կամ API-ի միջոցով
curl -X PUT http://localhost:20128/api/db-backups \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

Պահուստային ֆայլը ներառում է․

- DB-ի բոլոր աղյուսակները (սերիականացված JSON-ի)
- Կանչերի մատյանի արտեֆակտները (base64-ով կոդավորված, ընտրովի)
- Կարգավորումներ + գաղտնի տվյալներ (գաղտնագրված)
- Փլագինների կազմաձևում

### Վերականգնում

```bash
# CLI-ի միջոցով
omniroute restore pre-migration

# API-ի միջոցով
curl -X POST http://localhost:20128/api/db-backups/restore \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

> **Զգուշացում**․ Վերականգնումը վերագրում է ամբողջ DB-ն։ Նախ դադարեցրեք բոլոր սպասառուները։

### Ավտոմատացված պահուստավորումներ

```bash
# CLI-ի միջոցով միացրեք ամենօրյա ավտոմատացված պահուստավորումները
omniroute backup auto enable --cron "0 2 * * *" --retention 7
```

Ժամանակացույցը սերվերի կողմում կատարվում է ֆոնային առաջադրանքով, որն աշխատում է յուրաքանչյուր 30 վայրկյանը մեկ
(լռելյայն) և cron արտահայտությունը գնահատում է սերվերի տեղական ժամանակի նկատմամբ։

| Փոփոխական                                   | Լռելյայն | Նկարագրություն                                                                                                                  |
| ------------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_BACKUP_SCHEDULE_JOB_INTERVAL_MS` | `30000`  | Քայլի միջակայքը՝ մվ-ով (նվազագույնը՝ `5000`)։ Պետք է 60 վ-ից կարճ լինի՝ համապատասխան cron րոպեի մեջ հուսալիորեն ընկնելու համար։ |

### SQLite-ի թեժ պահուստավորում

Գործող DB-ն առանց աշխատանքի ընդհատման պահուստավորելու համար․

```bash
sqlite3 ~/.omniroute/storage.sqlite ".backup /backups/omniroute-hot.db"
```

Սա օգտագործում է SQLite-ի առցանց պահուստավորման API-ն. անվտանգ է գործարկել OmniRoute-ի աշխատանքի ընթացքում։

---

## Արտադրողականության կարգավորում

### WAL ռեժիմ

WAL-ը լռելյայն միացված է։ Մեծաքանակ գրանցումներով ծանրաբեռնվածությունների դեպքում դիտարկեք հետևյալը՝

```sql
PRAGMA wal_autocheckpoint = 1000;  -- Վերահսկիչ կետ՝ յուրաքանչյուր 1000 էջից հետո
PRAGMA journal_size_limit = 67108864;  -- WAL-ի 64MB սահմանաչափ
```

### Ինդեքսներ

Արտադրողականության համար կարևոր ինդեքսներ (միգրացիաների միջոցով ստեղծվում են ինքնաշխատ կերպով)՝

- `idx_models_provider` — մոդելների որոնում ըստ մատակարարի
- `idx_combo_targets_combo_id` — կոմբո թիրախների ընդլայնում
- `idx_usage_history_api_key_timestamp` — օգտագործման վերլուծություն
- `idx_quota_snapshots_api_key_window` — քվոտաների հետևում
- `idx_call_logs_timestamp` — կանչերի մատյանի հարցումներ

Նոր ինդեքս ավելացնելու համար ստեղծեք միգրացիա՝

```sql
-- 023_add_my_index.sql
CREATE INDEX IF NOT EXISTS idx_my_table_my_column ON my_table(my_column);
```

### Հիշողության արտապատկերմամբ I/O

Շատ մեծ տվյալների բազաների (>10GB) դեպքում հիշողության արտապատկերումը կարելի է կարգավորել SQLite pragma-ի միջոցով՝

```sql
-- Սահմանել SQLite pragma-ի միջոցով (կարգավորել core.ts-ում կամ կատարման միջավայրում)
PRAGMA mmap_size = 268435456;  -- 256MB
```

### Սեղմում

Երկարատև աշխատող OmniRoute նմուշներն օգտվում են պարբերաբար կատարվող `VACUUM`-ից՝

```bash
sqlite3 ~/.omniroute/storage.sqlite "VACUUM;"
```

Գործարկեք ամիսը մեկ անգամ՝ ցածր ծանրաբեռնվածության ժամանակահատվածներում։ (WAL ռեժիմը նվազեցնում է դրա անհրաժեշտությունը, բայց ամբողջությամբ չի վերացնում։)

---

## Աշխատունակության ստուգում

`src/lib/db/healthCheck.ts`-ը տրամադրում է **ՏԲ մակարդակի աշխատունակության ախտորոշում**՝

Երկու HTTP բայերն էլ պահանջում են նույնականացում (հակառակ դեպքում՝ `401`)։ `GET`-ը միայն ախտորոշում է, իսկ `POST`-ը կատարում է նույն ստուգումը՝ միացված `autoRepair`-ով։

```bash
GET  /api/db/health   # ախտորոշել
POST /api/db/health   # ախտորոշել + վերականգնել
```

Պատասխանը `runDbHealthCheck()`-ի ստեղծած `DbHealthCheckResult`-ն է
(`src/lib/db/healthCheck.ts`)՝

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

| Դաշտ              | Նշանակություն                                                                                                                                                                                      |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `isHealthy`       | `true`, երբ `issues`-ը դատարկ է։ `driver`-ը երբեք չի ազդում դրա վրա։                                                                                                                               |
| `issues[].type`   | `integrity_check_failed`, `broken_reference`, `stale_snapshot`, `invalid_state` արժեքներից մեկը։                                                                                                   |
| `repairedCount`   | Այս գործարկման ընթացքում վերականգնված տողերի քանակը․ միշտ `0` է, երբ `autoRepair`-ը false է։                                                                                                       |
| `backupCreated`   | Արդյոք վերականգնումից առաջ պահուստային պատճեն է ստեղծվել։                                                                                                                                          |
| `checkedAt`       | ISO ժամանակային դրոշմ, որը ընդհանուր է գործարկման և դրա գրանցած ցանկացած վերականգնման նշման համար։                                                                                                 |
| `driver.name`     | Ստուգվող տվյալների բազան սպասարկող SQLite դրայվերը։                                                                                                                                                |
| `driver.degraded` | `true`, երբ գրանցումները տվյալների բազայի ֆայլով հուսալիորեն չեն պահպանվում՝ `sql.js` WASM պահուստային տարբերակի (ամբողջական ֆայլի պահպանում) կամ հիշողության մեջ գտնվող տվյալների բազայի դեպքում։ |

Նույն օգտակար բեռը վերադարձվում է `omniroute_db_health_check` MCP գործիքի կողմից։

Վնասվածությունը հայտնաբերելու համար գործարկեք `PRAGMA integrity_check`՝

```bash
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"
# Պետք է արտածի՝ ok
```

Եթե այն վերադարձնում է `ok`-ից տարբերվող որևէ արդյունք, **անմիջապես դադարեցրեք տվյալների բազայի օգտագործումը** և վերականգնեք այն պահուստային պատճենից։

---

## Աղետից հետո վերականգնում

### Սցենար 1. WAL ֆայլը կորել է

`-wal` ֆայլը բացակայում է, սակայն `-shm`-ը և հիմնական տվյալների բազան անվնաս են.

```bash
# Ավտոմատ վերականգնվում է հաջորդ բացման ժամանակ
omniroute
```

Եթե SQLite-ը չի կարող ավտոմատ վերականգնել.

```bash
sqlite3 ~/.omniroute/storage.sqlite ".recover" > recovered.sql
sqlite3 recovered.db < recovered.sql
mv recovered.db ~/.omniroute/storage.sqlite
```

### Սցենար 2. Հիմնական տվյալների բազայի ֆայլը վնասված է

Վերականգնեք պահուստային պատճենից.

```bash
omniroute sync pull --merge   # կամ՝ omniroute backup restore <backup-id>
```

### Սցենար 3. Գաղտնագրման բանալին կորել է

Առանց բանալու **վերականգնումն անհնար է**։ Գաղտնագրված դաշտերն ընթեռնելի չեն։ Կրկին ձեռքով ավելացրեք բոլոր մատակարարներին՝ նոր հավատարմագրերով։

> **Կանխարգելում**. միշտ առանձին պահուստավորեք գաղտնագրման բանալին, ցանկալի է՝ գաղտնաբառերի կառավարչում կամ KMS-ում։

### Սցենար 4. Սկավառակը լիքն է

SQLite-ը կվերադարձնի `SQLITE_FULL` սխալներ։ Ազատեք սկավառակի տարածքը, ապա գործարկեք.

```bash
# Կատարել WAL-ի ստուգակետի ֆիքսում՝ տարածք ազատելու համար
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA wal_checkpoint(TRUNCATE);"
```

---

## Տարածված գործողություններ

### Աղյուսակի դիտարկում

```bash
sqlite3 ~/.omniroute/storage.sqlite "SELECT * FROM api_keys LIMIT 5;"
```

### Բոլոր աղյուսակների տողերի քանակի հաշվարկ

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';
EOF
```

### Բոլոր տվյալների զրոյացում (ջնջում)

```bash
# Նախ կանգնեցնել OmniRoute-ը
omniroute stop

# Ջնջել տվյալների բազայի ֆայլը
rm ~/.omniroute/storage.sqlite*

# Վերագործարկել (կստեղծվի նոր դատարկ տվյալների բազա)
omniroute
```

**Ընտրովի** զրոյացման համար (պահպանել մատակարարներին, ջնջել օգտագործման տվյալները).

```bash
DELETE FROM usage_history WHERE timestamp < datetime('now', '-30 day');
DELETE FROM call_logs WHERE timestamp < datetime('now', '-30 day');
DELETE FROM proxy_logs WHERE timestamp < datetime('now', '-30 day');
```

### Մեկ աղյուսակի արտահանում

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
.mode csv
.output api_keys.csv
SELECT * FROM api_keys;
EOF
```

---

## Խնդիրների լուծում

### «Տվյալների բազան կողպված է»

Մեկ այլ գործընթաց պահում է գրառման կողպումը։ Կարող եք.

- Սպասել, մինչև մյուս գործընթացն ավարտվի (ստուգեք `lsof | grep storage.sqlite`)
- Դադարեցնել մյուս գործընթացը
- Եթե խնդիրը պահպանվում է, վերագործարկել OmniRoute-ը

### «Արտաքին բանալու սահմանափակումը խախտվել է»

Դոմենի մոդուլը խախտում է հղումային ամբողջականությունը։ Ստուգեք.

- Կախյալ աղյուսակներում առկա որբացած տողերը
- Շղթայական ջնջումները, որոնք չեն տարածվել
- Վերջին միգրացիան, որը փոխել է արտաքին բանալին

Խախտումները գտնելու համար գործարկեք `PRAGMA foreign_key_check;`։

### «Հիշողությունը սպառվել է»

SQLite-ի՝ հիշողության մեջ արտապատկերված մուտք/ելքը գերազանցում է օպերացիոն համակարգի սահմանաչափը։ Նվազեցրեք այն SQLite-ի pragma-ի միջոցով.

```sql
PRAGMA mmap_size = 134217728;  -- 256MB-ի փոխարեն՝ 128MB
```

Կամ անջատեք.

```sql
PRAGMA mmap_size = 0;
```

### «Միգրացիան ընդհատվել է ընթացքի կեսին»

Միգրացիան կատարվել է տրանզակցիայի ներսում, ուստի այն պետք է հետ շրջված լիներ։ Եթե դա տեղի չի ունեցել.

1. **Կանգնեցրեք OmniRoute-ը** (կանխեք հետագա փորձերը)
2. **Ստուգեք տվյալների բազայի վիճակը** `sqlite3`-ի միջոցով
3. **Ձեռքով շտկեք** մասնակի միգրացիան
4. **Կրկին գործարկեք** OmniRoute-ը (միգրացիան նորից կփորձարկվի)

Սա կանխելու համար միշտ նախ փորձարկեք միգրացիաները պատճենի վրա։

---

## Տես նաև

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — օգտագործման աղյուսակներ
- [MONITORING_GUIDE.md](./MONITORING_GUIDE.md) — վիճակի մշտադիտարկում
- [RELEASE_CHECKLIST.md](./RELEASE_CHECKLIST.md) — թողարկման ընթացակարգ
- Սկզբնաղբյուր՝ `src/lib/db/` (80+ ֆայլ, ~25K տող կոդ)
