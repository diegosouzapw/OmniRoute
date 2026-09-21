# Database Schema & Operations Guide (ქართული)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/DATABASE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/DATABASE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/DATABASE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/DATABASE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/DATABASE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/DATABASE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/DATABASE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/DATABASE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/DATABASE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/DATABASE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/DATABASE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/DATABASE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/DATABASE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/DATABASE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/DATABASE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/DATABASE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/DATABASE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/DATABASE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/DATABASE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/DATABASE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/DATABASE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/DATABASE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/DATABASE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/DATABASE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/DATABASE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/DATABASE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/DATABASE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/DATABASE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/DATABASE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/DATABASE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/DATABASE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/DATABASE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/DATABASE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/DATABASE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/DATABASE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/DATABASE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/DATABASE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/DATABASE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/DATABASE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/DATABASE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/DATABASE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/DATABASE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/DATABASE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/DATABASE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/DATABASE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/DATABASE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/DATABASE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/DATABASE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/DATABASE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/DATABASE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/DATABASE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/DATABASE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/DATABASE_GUIDE.md)

---

> **მოკლედ**: OmniRoute ძირითად საცავად იყენებს **SQLite-ს WAL ჟურნალირებით**, ხოლო მგრძნობიარე ველების უმოქმედო მდგომარეობაში დაშიფვრისთვის — **AES-256-GCM**-ს. ეს სახელმძღვანელო მოიცავს სქემას, მიგრაციებს, სარეზერვო კოპირებას/აღდგენასა და საოპერაციო ინსტრუქციებს.

**წყაროები:**

- `src/lib/db/core.ts` — singleton + SCHEMA_SQL (17 საბაზისო ცხრილი)
- `src/lib/db/migrationRunner.ts` — ვერსირებული მიგრაციები
- `src/lib/db/migrations/` — 167 ვერსირებული SQL ფაილი
- `src/lib/db/encryption.ts` — დაშიფვრის დამხმარე ფუნქციები
- `src/lib/db/backup.ts` — სარეზერვო ასლის ექსპორტი/იმპორტი
- `src/lib/db/healthCheck.ts` — მდგომარეობის დიაგნოსტიკა

---

## რატომ SQLite?

OmniRoute-მა PostgreSQL/MySQL-ის ნაცვლად SQLite რამდენიმე მიზეზით აირჩია:

| ფაქტორი                   | SQLite                                            | PostgreSQL                                              |
| ------------------------- | ------------------------------------------------- | ------------------------------------------------------- |
| **განთავსება**            | ჩაშენებული — ცალკე სერვერი არ სჭირდება            | მოითხოვს სერვერის გამართვას                             |
| **დაშიფვრა**              | აპლიკაციის დონეზე (AES-256-GCM)                   | ჩაშენებული TDE                                          |
| **წარმადობა**             | უფრო სწრაფია მცირე/საშუალო დატვირთვებისთვის       | უკეთესია უზარმაზარი რაოდენობის პარალელური ჩაწერებისთვის |
| **პარალელურობა**          | WAL რეჟიმი პარალელური წაკითხვის საშუალებას იძლევა | სრული MVCC                                              |
| **სარეზერვო ასლი**        | ერთი ფაილის კოპირება                              | `pg_dump` ან ფაილური სისტემის მომენტალური ასლი          |
| **გამოყენების შემთხვევა** | თითოეული მომხმარებლის ინსტალაცია, ჩაშენებული      | მრავალმომხმარებლიანი SaaS                               |

**ერთმომხმარებლიანი, ერთინსტანციანი** განთავსებისთვის (OmniRoute-ის გამოყენების ძირითადი შემთხვევა) SQLite უფრო მარტივი და სწრაფია.

### WAL ჟურნალირება

`core.ts` მონაცემთა ბაზას **WAL (წინასწარი ჩაწერის ჟურნალის) რეჟიმში** ხსნის:

```ts
// src/lib/db/core.ts
db.pragma("journal_mode = WAL");
db.pragma("busy_timeout = 2000");
db.pragma("synchronous = NORMAL");
db.pragma(`cache_size = -${DEFAULT_DATABASE_SETTINGS.optimization.cacheSize}`);
```

WAL ჩაწერის დროს **პარალელური წაკითხვის** საშუალებას იძლევა — ეს მნიშვნელოვანია მართვის პანელისთვის, რომელიც მოთხოვნების ჩაწერის პარალელურად ასრულებს მოთხოვნებს მონაცემთა ბაზაში.

ქეშის ნაგულისხმევი ზომაა **65,536 KiB (64 MiB)**. SQLite უარყოფით
`cache_size`-ს აღიქვამს, როგორც KiB-ში გამოსახულ მიახლოებით ზედა ზღვარს და გვერდებს საჭიროებისამებრ გამოყოფს.
**პარამეტრები > სისტემა და საცავი > ქეშის ზომა** იღებს მთელ რიცხვებს **1-დან
1,000,000 KiB-მდე**; პარამეტრის შენახვა მას მონაცემთა ბაზის აქტიურ კავშირზე
გამოიყენებს, ხოლო OmniRoute გაშვებისას შენახულ მნიშვნელობას აღადგენს.

---

## მონაცემთა ბაზის მდებარეობა

SQLite ფაილი ინახება შემდეგ მისამართზე:

| OS      | გზა                                                                  |
| ------- | -------------------------------------------------------------------- |
| Linux   | `~/.omniroute/storage.sqlite`                                        |
| macOS   | `~/.omniroute/storage.sqlite`                                        |
| Windows | `%USERPROFILE%\.omniroute\storage.sqlite`                            |
| Docker  | `/app/data/storage.sqlite` (`DATA_DIR`-ის მეშვეობით კონფიგურირებადი) |

თანმხლები ფაილები:

- `storage.sqlite-wal` — წინასწარი ჩაწერის ჟურნალი
- `storage.sqlite-shm` — გაზიარებული მეხსიერების ფაილი
- `call_logs/` — მოთხოვნის სასარგებლო დატვირთვის არტეფაქტები (თუ ჩართულია)

**მდებარეობის შეცვლა:**

```bash
DATA_DIR=/custom/path omniroute
```

---

## დომენური მოდულების არქიტექტურა

OmniRoute-ის მონაცემთა ბაზას `src/lib/db/`-ში აქვს **110 უმაღლესი დონის TypeScript მოდული**. თითოეული დომენური მოდული:

- მართავს ერთ ან რამდენიმე კონკრეტულ ცხრილს
- ექსპორტს უკეთებს ტიპიზებულ CRUD ფუნქციებს
- არასოდეს ეხება სხვა მოდულის ცხრილებს
- მონაცემთა ბაზაზე წვდომისთვის იყენებს `core.ts`-ის `getDbInstance()`-ს

### მონაცემთა ბაზის 110 უმაღლესი დონის მოდული

OmniRoute-ს `src/lib/db/`-ში აქვს **110 უმაღლესი დონის TypeScript ფაილი**. ქვემოთ მოცემულია ძირითადი მოდულების ნაწილი; სრული სიისთვის იხილეთ დირექტორიის ჩამონათვალი:

| მოდული                  | ცხრილები                                                       | პასუხისმგებლობა                                                                             |
| ----------------------- | -------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| `providers.ts`          | `provider_connections`                                         | პროვაიდერების რეგისტრაცია და ავტორიზაციის მონაცემები OAuth/API გასაღებით                    |
| `models.ts`             | `key_value` (მოდელის მონაცემები)                               | მოდელების განსაზღვრებები, შესაძლებლობები და ფასები                                          |
| `combos.ts`             | `combos`                                                       | კომბინირებული მარშრუტიზაციის კონფიგურაციები და თანმიმდევრობა                                |
| `apiKeys.ts`            | `api_keys`                                                     | API გასაღებების სასიცოცხლო ციკლი, წვდომის სფეროები და კვოტების აღრიცხვა                     |
| `settings.ts`           | `key_value`, `api_keys`, `combos`                              | სისტემის კონფიგურაცია და საზიარო KV საცავი                                                  |
| `backup.ts`             | —                                                              | სარეზერვო ასლის ექსპორტისა და იმპორტის ოპერაციები                                           |
| `proxies.ts`            | `proxy_registry`, `proxy_assignments`, `provider_connections`  | პროქსის კონფიგურაციები და მარშრუტიზაციის წესები                                             |
| `prompts.ts`            | `prompt_templates`                                             | მრავალჯერადი გამოყენების მოთხოვნის შაბლონები და ვერსიების მართვა                            |
| `webhooks.ts`           | `webhooks`                                                     | მოვლენებზე დაფუძნებული webhook-ის გამოწერები და ჟურნალები                                   |
| `detailedLogs.ts`       | `request_detail_logs`                                          | თითოეული მოთხოვნის აუდიტის ჟურნალირება (არასავალდებულო, დიდი მოცულობა)                      |
| `domainState.ts`        | `domain_*` (5 ცხრილი)                                          | დომენის ბიუჯეტები, წრედის ამომრთველები, ბლოკირებები, სათადარიგო ჯაჭვები და ხარჯების ისტორია |
| `registeredKeys.ts`     | `registered_keys`, `account_key_limits`, `provider_key_limits` | MCP/A2A-სთვის ნებადართული API გასაღებები                                                    |
| `quotaSnapshots.ts`     | `quota_snapshots`                                              | კვოტის გამოყენების ისტორიული მონაცემები                                                     |
| `modelComboMappings.ts` | `model_combo_mappings`                                         | მოდელების ნაგულისხმევ კომბინაციებთან დაკავშირება                                            |
| `cliToolState.ts`       | `cli_tool_state`                                               | CLI-სთვის სპეციფიკური მუდმივი მდგომარეობა                                                   |
| `encryption.ts`         | —                                                              | ველების დაშიფვრისა და გაშიფვრის დამხმარე ფუნქციები                                          |
| `readCache.ts`          | —                                                              | მეხსიერებაში განთავსებული კეში ხშირი წაკითხვის ოპერაციებისთვის                              |
| `secrets.ts`            | `key_value` (დაშიფრული ჩანაწერები)                             | დაშიფრული საიდუმლო მონაცემების საცავი                                                       |
| `stateReset.ts`         | —                                                              | ტესტირებისთვის მონაცემთა ბაზის მდგომარეობის წაშლა/გადატვირთვა                               |
| `contextHandoffs.ts`    | `context_handoffs`                                             | სესიის კონტექსტი აგენტისთვის მართვის გადასაცემად                                            |
| `usage*.ts`             | `usage_history`, `call_logs`, `proxy_logs`                     | გამოყენების აღრიცხვა                                                                        |
| `compression*.ts`       | `compression_settings`, `compression_combos`                   | შეკუმშვის კონფიგურაცია                                                                      |

### მოდულების საზღვრები

არქიტექტურის ძირითადი წესი: **მოდულები ერთმანეთის ცხრილებს პირდაპირ არ წვდებიან**. სხვა მოდულის მონაცემებთან სამუშაოდ, ფუნქცია შესაბამისი მოდულიდან შემოიტანეთ.

```ts
// ❌ არასწორია: პირდაპირი SQL სხვა მოდულიდან
db.prepare("SELECT * FROM provider_connections").all();

// ✅ სწორია: გამოიყენეთ providers მოდულის ფუნქცია
import { listProviders } from "@/lib/db/providers";
const providers = await listProviders();
```

ამ წესის დაცვა მოწმდება კოდის მიმოხილვისას — სტატიკური შემოწმება არ არსებობს, თუმცა დარღვევები აღინიშნება.

---

## საბაზისო სქემა (17 ცხრილი)

`core.ts` განსაზღვრავს 17 საბაზისო ცხრილს `SCHEMA_SQL`-ში. ისინი იქმნება `001_initial_schema.sql` მიგრაციის მეშვეობით და შეადგენს ძირითად სქემას.

### ძირითადი ცხრილები (იქმნება საწყისი მიგრაციის დროს)

| ცხრილი                     | დანიშნულება                                         | ძირითადი სვეტები                                                        |
| -------------------------- | --------------------------------------------------- | ----------------------------------------------------------------------- |
| `provider_connections`     | პროვაიდერის ავტორიზაციის მონაცემები (დაშიფრული)     | `id`, `provider`, `auth_type`, `api_key`, `is_active`                   |
| `provider_nodes`           | პროვაიდერის კვანძების მარშრუტიზაციის ინფორმაცია     | `id`, `type`, `name`, `base_url`, `created_at`                          |
| `key_value`                | ზოგადი KV საცავი                                    | `namespace`, `key`, `value`                                             |
| `combos`                   | მარშრუტიზაციის კომბინაციების განსაზღვრებები         | `id`, `name`, `data`, `sort_order`                                      |
| `api_keys`                 | API გასაღებები კარიბჭისთვის                         | `id`, `name`, `key`, `machine_id`, `allowed_models`                     |
| `db_meta`                  | მონაცემთა ბაზის მეტამონაცემები                      | `key`, `value`                                                          |
| `usage_history`            | მოთხოვნების გამოყენების ჩანაწერები                  | `id`, `provider`, `model`, `tokens_input`, `tokens_output`, `timestamp` |
| `call_logs`                | მოთხოვნის მონაცემები და პასუხები                    | `id`, `timestamp`, `status`, `model`, `provider`, `latency_ms`          |
| `proxy_logs`               | პროქსი-მოთხოვნების ჟურნალები                        | `id`, `timestamp`, `proxy_type`, `status`, `provider`                   |
| `domain_fallback_chains`   | მოდელიდან პროვაიდერამდე ჯაჭვები                     | `model`, `chain`                                                        |
| `domain_budgets`           | ხარჯვის ბიუჯეტები თითოეული დომენისთვის              | `api_key_id`, `daily_limit_usd`, `warning_threshold`, `reset_interval`  |
| `domain_budget_reset_logs` | ბიუჯეტის განულების ისტორია                          | `id`, `api_key_id`, `reset_interval`, `previous_spend`, `reset_at`      |
| `domain_cost_history`      | ხარჯების აღრიცხვა თითოეული დომენისთვის              | `id`, `api_key_id`, `cost`, `timestamp`                                 |
| `domain_lockout_state`     | დომენის სიხშირის შეზღუდვის მდგომარეობა              | `identifier`, `attempts`, `locked_until`                                |
| `domain_circuit_breakers`  | წრედის გამთიშველის მდგომარეობა თითოეული დომენისთვის | `name`, `state`, `failure_count`, `last_failure_time`                   |
| `semantic_cache`           | LLM პასუხების კეში                                  | `id`, `signature`, `model`, `prompt_hash`, `response`                   |
| `quota_snapshots`          | კვოტის ისტორიული სნეპშოტები                         | `id`, `provider`, `connection_id`, `window_key`, `remaining_percentage` |

### დამატებითი ცხრილები (დამატებულია შემდგომი მიგრაციებით)

შემდგომი მიგრაციები ამატებს ისეთ ცხრილებს, როგორიცაა:

- `cli_tool_state` (მიგრაცია 011) — CLI ხელსაწყოს მდგომარეობა
- `mcp_*` ცხრილები — MCP სერვერის აუდიტი
- `a2a_*` ცხრილები — A2A დავალებების მდგომარეობა
- `usage_*` ცხრილები — გამოყენების აღრიცხვა
- `plugin_*` ცხრილები — პლაგინების სისტემა
- `skill_executions` — უნარების შესრულების ისტორია
- `memory_*` ცხრილები — მეხსიერების სისტემა
- `compression_*` ცხრილები — შეკუმშვის სისტემა
- `webhook_*` ცხრილები — ვებჰუკების მიწოდების ჟურნალი
- `acp_*` ცხრილები — აგენტის კლიენტის პროტოკოლი
- `oneproxy_*` ცხრილები — 1proxy მარკეტპლეისი
- `proxy_assignments` — პროქსის მოქმედების არეალის მიბმები
- `detailed_call_artifacts` — გამოძახებების ჟურნალის არტეფაქტების მეტამონაცემები
- `quota_alert_history` — კვოტის გაფრთხილებების აუდიტი
- `command_code_auth_sessions` — Command Code OAuth სესიები

~30-ზე მეტი ცხრილის სრული სია მოცემულია `src/lib/db/migrations/`-ში.

---

## მიგრაციები

OmniRoute იყენებს **ვერსირებულ, იდემპოტენტურ მიგრაციებს** `src/lib/db/migrations/`-ში. თითოეული მიგრაცია არის ერთი SQL ფაილი, სახელწოდებით `NNN_description.sql`.

### მიგრაციების დასახელება

```
001_initial_schema.sql
002_mcp_a2a_tables.sql
003_provider_node_custom_paths.sql
...
021_combo_call_log_targets.sql
```

### როგორ სრულდება მიგრაციები

გაშვებისას `migrationRunner.ts`:

1. ქმნის `_omniroute_migrations` ცხრილს, თუ ის არ არსებობს
2. ითხოვს უკვე გამოყენებული მიგრაციების სიას
3. ყველა ახალ მიგრაციას თანმიმდევრობით იყენებს, თითოეულს ცალკე ტრანზაქციაში
4. თითოეულ გამოყენებულ მიგრაციას დროის ნიშნულთან ერთად აღრიცხავს

```ts
// src/lib/db/migrationRunner.ts (გამარტივებული)
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

### იდემპოტენტურობა

მიგრაციები უნდა იყოს **იდემპოტენტური** — მათი მეორედ გაშვება არაფერს უნდა ცვლიდეს:

```sql
-- 004_proxy_registry.sql
CREATE TABLE IF NOT EXISTS proxy_registry (
  id TEXT PRIMARY KEY,
  host TEXT NOT NULL,
  port INTEGER NOT NULL,
  ...
);
```

ფართოდ გამოიყენეთ `IF NOT EXISTS`, `IF EXISTS` და `OR IGNORE` / `OR REPLACE` კონსტრუქციები.

### ახალი მიგრაციის დამატება

1. **განსაზღვრეთ შემდეგი ნომერი**: `ls src/lib/db/migrations/ | tail -1`
2. **შექმენით ფაილი**: `NNN_my_change.sql`
3. **გამოიყენეთ უსაფრთხო DDL**: `CREATE TABLE IF NOT EXISTS`, `ALTER TABLE ... ADD COLUMN`
4. **არსებული მონაცემები ფრთხილად შეავსეთ**: არსებული სტრიქონების დასამუშავებლად გამოიყენეთ `UPDATE ... WHERE ...`
5. **გამოსცადეთ ასლზე**: არასოდეს გაუშვათ გამოუცდელი მიგრაციები საწარმოო გარემოში

მაგალითი:

```sql
-- 022_add_combo_priority.sql
ALTER TABLE combos ADD COLUMN priority INTEGER DEFAULT 100;
UPDATE combos SET priority = 100 WHERE priority IS NULL;
CREATE INDEX IF NOT EXISTS idx_combos_priority ON combos(priority);
```

> **უკუთავსებადობის დამრღვევი ცვლილებები** (მაგ., სვეტების წაშლა) რთულია. OmniRoute-ს ვერსიის დაქვეითების მხარდაჭერა არ აქვს — მიგრაციის გამოყენების შემდეგ სქემის ცვლილება მუდმივია. შესაბამისად დაგეგმეთ.

---

## შენახული მონაცემების დაშიფვრა

სენსიტიური ველები (API გასაღებები, OAuth ტოკენები, კავშირის სტრიქონები) შენახვისას დაშიფრულია **AES-256-GCM**-ის გამოყენებით.

### როგორ მუშაობს

```ts
// src/lib/db/encryption.ts (გამარტივებული)
const key = deriveKeyFromPassphrase(passphrase, salt);
const iv = randomBytes(12);
const cipher = createCipheriv("aes-256-gcm", key, iv);
const encrypted = Buffer.concat([cipher.update(plaintext), cipher.final()]);
const authTag = cipher.getAuthTag();
return { encrypted, iv, authTag };
```

### სად გამოიყენება

- `provider_connections.api_key` — დაშიფრულია აპლიკაციის დონეზე
- `provider_connections.access_token`, `refresh_token`, `id_token` — დაშიფრულია აპლიკაციის დონეზე
- `key_value` ჩანაწერები, სადაც `namespace = "secrets"` — დაშიფრულია აპლიკაციის დონეზე
- `proxy_registry.auth` — დაშიფრულია აპლიკაციის დონეზე (თუ არსებობს)

### დაშიფვრის გასაღები

დაშიფვრის გასაღები მიიღება **საიდუმლო ფრაზიდან** (დაყენებულია `STORAGE_ENCRYPTION_KEY` გარემოს ცვლადის მეშვეობით) და **salt**-იდან (ინახება მონაცემთა ბაზაში). მონაცემების გაშიფვრისთვის ორივე აუცილებელია.

```bash
# უსაფრთხო საიდუმლო ფრაზის გენერირება
openssl rand -hex 32

# დაყენება .env-ში
STORAGE_ENCRYPTION_KEY=<your-key>
```

> **კრიტიკულად მნიშვნელოვანია**: დაშიფვრის გასაღების დაკარგვა ნიშნავს ყველა დაშიფრულ მონაცემზე წვდომის დაკარგვას. **გასაღების სარეზერვო ასლი მონაცემთა ბაზისგან განცალკევებით შეინახეთ**.

### რა არ არის დაშიფრული

წარმადობის გამო შემდეგი მონაცემები ღია ტექსტის სახით ინახება:

- პროვაიდერების საჩვენებელი სახელები
- მოდელების განსაზღვრებები (ისედაც საჯაროა)
- მარშრუტიზაციის წესები
- გამოყენების ჩანაწერები (არ შეიცავს PII-ს)

---

## დაშიფვრის თავისებურებები (v3.8.16+)

OmniRoute ორი დაშიფვრის სქემის გამჭვირვალედ დასამუშავებლად იყენებს **`migrateLegacyEncryptedString()`**-ს:

- **მემკვიდრეობითი** (v3.5.0-მდე): XOR-ზე დაფუძნებული „დაშიფვრა“ (არ წარმოადგენს ნამდვილ კრიპტოგრაფიას)
- **მიმდინარე**: AES-256-GCM სათანადო IV-ითა და ავთენტიფიკაციის ტეგით

მიგრაციის დამხმარე ფუნქცია ამოიცნობს მემკვიდრეობით ფორმატს და პირველი წაკითხვისას მონაცემებს ახალი სქემით თავიდან შიფრავს. ეს ნიშნავს, რომ შეგიძლიათ ძველი მონაცემთა ბაზა ავტორიზაციის მონაცემების დაკარგვის გარეშე განაახლოთ.

---

## წაკითხვის კეში

ხშირად წაკითხვადი მონაცემებისთვის (მოდელები, პროვაიდერები, პარამეტრები) `readCache.ts` უზრუნველყოფს **მეხსიერებაში განთავსებულ კეშს**:

```ts
// კეშირდება გაშვებისას, უქმდება ჩაწერისას
const providers = await getCachedProviders(); // სწრაფი, მეხსიერებაში
const fresh = await listProviders(); // ნელი, მიმართავს DB-ს
```

| კეშირებული სუბიექტი    | კეშის გასაღები | TTL       |
| ---------------------- | -------------- | --------- |
| `models`               | `models:v1`    | ჩაწერამდე |
| `provider_connections` | `providers:v1` | ჩაწერამდე |
| `settings`             | `settings:v1`  | ჩაწერამდე |
| `combos`               | `combos:v1`    | ჩაწერამდე |

კეში უქმდება შესაბამის ცხრილში ყოველი ჩაწერისას.

---

## სარეზერვო ასლის შექმნა და აღდგენა

### სარეზერვო ასლის ხელით შექმნა

```bash
# ლოკალური სარეზერვო ასლის შესაქმნელად გამოიყენეთ CLI
omniroute backup create --name pre-migration

# ან API-ის მეშვეობით
curl -X PUT http://localhost:20128/api/db-backups \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

სარეზერვო ასლის ფაილი მოიცავს:

- DB-ის ყველა ცხრილს (JSON-ად სერიალიზებულს)
- გამოძახებების ჟურნალის არტეფაქტებს (base64-ით კოდირებულს, არასავალდებულო)
- პარამეტრებსა და საიდუმლო მონაცემებს (დაშიფრულს)
- პლაგინების კონფიგურაციას

### აღდგენა

```bash
# CLI-ის მეშვეობით
omniroute restore pre-migration

# API-ის მეშვეობით
curl -X POST http://localhost:20128/api/db-backups/restore \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

> **გაფრთხილება**: აღდგენა მთლიან DB-ს გადააწერს. ჯერ ყველა კლიენტი გააჩერეთ.

### ავტომატური სარეზერვო ასლები

```bash
# CLI-ის მეშვეობით ყოველდღიური ავტომატური სარეზერვო ასლების შექმნის ჩართვა
omniroute backup auto enable --cron "0 2 * * *" --retention 7
```

განრიგი სერვერის მხარეს სრულდება ფონური დავალების მიერ, რომელიც ყოველ 30 წამში
(ნაგულისხმევად) აქტიურდება და cron-გამოსახულებას სერვერის ლოკალურ დროს ადარებს.

| ცვლადი                                      | ნაგულისხმევი | აღწერა                                                                                                           |
| ------------------------------------------- | ------------ | ---------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_BACKUP_SCHEDULE_JOB_INTERVAL_MS` | `30000`      | აქტივაციის ინტერვალი მწმ-ში (მინ. `5000`). შესაბამის cron-წუთში საიმედოდ მოსახვედრად 60 წმ-ზე ნაკლები უნდა იყოს. |

### SQLite-ის ცხელი სარეზერვო ასლი

აქტიური DB-ის შეფერხების გარეშე სარეზერვო ასლის შესაქმნელად:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".backup /backups/omniroute-hot.db"
```

ეს იყენებს SQLite-ის ონლაინ სარეზერვო ასლის API-ს — მისი გაშვება უსაფრთხოა OmniRoute-ის მუშაობის დროსაც.

---

## წარმადობის ოპტიმიზაცია

### WAL რეჟიმი

WAL ნაგულისხმევად ჩართულია. ჩაწერის მაღალი დატვირთვის მქონე გარემოებისთვის გაითვალისწინეთ:

```sql
PRAGMA wal_autocheckpoint = 1000;  -- საკონტროლო წერტილი ყოველ 1000 გვერდზე
PRAGMA journal_size_limit = 67108864;  -- WAL-ის 64MB-იანი ზღვარი
```

### ინდექსები

წარმადობისთვის მნიშვნელოვანი ინდექსები (ავტომატურად იქმნება მიგრაციების მიერ):

- `idx_models_provider` — მოდელების ძიება პროვაიდერის მიხედვით
- `idx_combo_targets_combo_id` — კომბინირებული სამიზნეების გაფართოება
- `idx_usage_history_api_key_timestamp` — გამოყენების ანალიტიკა
- `idx_quota_snapshots_api_key_window` — კვოტების თვალყურის დევნება
- `idx_call_logs_timestamp` — გამოძახებების ჟურნალის მოთხოვნები

ახალი ინდექსის დასამატებლად შექმენით მიგრაცია:

```sql
-- 023_add_my_index.sql
CREATE INDEX IF NOT EXISTS idx_my_table_my_column ON my_table(my_column);
```

### მეხსიერებაში ასახული I/O

ძალიან დიდი მონაცემთა ბაზებისთვის (>10GB) მეხსიერებაში ასახვის პარამეტრის შეცვლა შესაძლებელია SQLite pragma-ს საშუალებით:

```sql
-- დააყენეთ SQLite pragma-ს საშუალებით (შეცვალეთ core.ts-ში ან შესრულების გარემოში)
PRAGMA mmap_size = 268435456;  -- 256MB
```

### კომპაქტიზაცია

ხანგრძლივად გაშვებული OmniRoute-ის ეგზემპლარებისთვის სასარგებლოა პერიოდულად `VACUUM`-ის შესრულება:

```bash
sqlite3 ~/.omniroute/storage.sqlite "VACUUM;"
```

გაუშვით ყოველთვიურად, დაბალი ტრაფიკის პერიოდებში. (WAL რეჟიმი ამცირებს ამის საჭიროებას, თუმცა სრულად არ გამორიცხავს.)

---

## მდგომარეობის შემოწმება

`src/lib/db/healthCheck.ts` უზრუნველყოფს **მონაცემთა ბაზის დონის მდგომარეობის დიაგნოსტიკას**:

ორივე HTTP მეთოდი ავთენტიფიკაციას მოითხოვს (წინააღმდეგ შემთხვევაში — `401`). `GET` მხოლოდ დიაგნოსტიკას ასრულებს; `POST` კი იმავე შემოწმებას გაშვებული `autoRepair`-ით ასრულებს.

```bash
GET  /api/db/health   # დიაგნოსტიკა
POST /api/db/health   # დიაგნოსტიკა + შეკეთება
```

პასუხი არის `runDbHealthCheck()`-ის მიერ შექმნილი `DbHealthCheckResult`
(`src/lib/db/healthCheck.ts`):

```json
{
  "isHealthy": false,
  "issues": [
    {
      "type": "broken_reference",
      "table": "domain_budgets",
      "description": "დომენის ბიუჯეტები მიუთითებდა API გასაღებებზე, რომლებიც აღარ არსებობს.",
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

| ველი              | მნიშვნელობა                                                                                                                                                                                     |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `isHealthy`       | არის `true`, როდესაც `issues` ცარიელია. `driver` მასზე არასოდეს მოქმედებს.                                                                                                                      |
| `issues[].type`   | ერთ-ერთი შემდეგთაგანი: `integrity_check_failed`, `broken_reference`, `stale_snapshot`, `invalid_state`.                                                                                         |
| `repairedCount`   | ამ გაშვებისას შეკეთებული მწკრივები; ყოველთვის `0`-ია, როდესაც `autoRepair` არის false.                                                                                                          |
| `backupCreated`   | შეიქმნა თუ არა სარეზერვო ასლი შეკეთებამდე.                                                                                                                                                      |
| `checkedAt`       | ISO დროის ნიშნული, რომელიც საერთოა გაშვებისთვის და მის მიერ ჩაწერილი ნებისმიერი შეკეთების შენიშვნისთვის.                                                                                        |
| `driver.name`     | SQLite დრაივერი, რომელიც შემოწმებულ მონაცემთა ბაზას ემსახურება.                                                                                                                                 |
| `driver.degraded` | არის `true`, როდესაც ჩაწერები მონაცემთა ბაზის ფაილში საიმედოდ არ ინახება — `sql.js` WASM სარეზერვო ვარიანტის (მთლიანი ფაილის შენახვა) ან მეხსიერებაში განთავსებული მონაცემთა ბაზის შემთხვევაში. |

იმავე მონაცემებს აბრუნებს `omniroute_db_health_check` MCP ინსტრუმენტიც.

დაზიანების აღმოსაჩენად გაუშვით `PRAGMA integrity_check`:

```bash
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"
# უნდა გამოიტანოს: ok
```

თუ ის `ok`-ის გარდა სხვა რამეს აბრუნებს, **დაუყოვნებლივ შეწყვიტეთ მონაცემთა ბაზის გამოყენება** და აღადგინეთ ის სარეზერვო ასლიდან.

---

## ავარიული აღდგენა

### სცენარი 1: WAL ფაილი დაკარგულია

`-wal` ფაილი დაკარგულია, თუმცა `-shm` და ძირითადი მონაცემთა ბაზა ხელუხლებელია:

```bash
# ავტომატურად აღდგება შემდეგი გახსნისას
omniroute
```

თუ SQLite ავტომატურად ვერ აღდგება:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".recover" > recovered.sql
sqlite3 recovered.db < recovered.sql
mv recovered.db ~/.omniroute/storage.sqlite
```

### სცენარი 2: მონაცემთა ბაზის ძირითადი ფაილი დაზიანებულია

აღადგინეთ სარეზერვო ასლიდან:

```bash
omniroute sync pull --merge   # ან: omniroute backup restore <backup-id>
```

### სცენარი 3: დაშიფვრის გასაღები დაკარგულია

გასაღების გარეშე **აღდგენა შეუძლებელია**. დაშიფრული ველები წაუკითხავია. ხელით ხელახლა დაამატეთ ყველა პროვაიდერი ახალი ავტორიზაციის მონაცემებით.

> **რისკის შემცირება**: დაშიფვრის გასაღების სარეზერვო ასლი ყოველთვის ცალკე შეინახეთ, სასურველია პაროლების მმართველში ან KMS-ში.

### სცენარი 4: დისკი სავსეა

SQLite დააბრუნებს `SQLITE_FULL` შეცდომებს. გაათავისუფლეთ ადგილი დისკზე, შემდეგ კი გაუშვით:

```bash
# სივრცის გასათავისუფლებლად შექმენით WAL-ის საკონტროლო წერტილი
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA wal_checkpoint(TRUNCATE);"
```

---

## გავრცელებული ოპერაციები

### ცხრილის დათვალიერება

```bash
sqlite3 ~/.omniroute/storage.sqlite "SELECT * FROM api_keys LIMIT 5;"
```

### ყველა ცხრილში სტრიქონების დათვლა

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';
EOF
```

### ყველა მონაცემის ჩამოყრა (წაშლა)

```bash
# ჯერ გააჩერეთ OmniRoute
omniroute stop

# წაშალეთ მონაცემთა ბაზის ფაილი
rm ~/.omniroute/storage.sqlite*

# ხელახლა გაუშვით (ცარიელ მონაცემთა ბაზას თავიდან შექმნის)
omniroute
```

**შერჩევითი** ჩამოყრისთვის (პროვაიდერების შენარჩუნება, გამოყენების მონაცემების წაშლა):

```bash
DELETE FROM usage_history WHERE timestamp < datetime('now', '-30 day');
DELETE FROM call_logs WHERE timestamp < datetime('now', '-30 day');
DELETE FROM proxy_logs WHERE timestamp < datetime('now', '-30 day');
```

### ერთი ცხრილის ექსპორტი

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
.mode csv
.output api_keys.csv
SELECT * FROM api_keys;
EOF
```

---

## პრობლემების აღმოფხვრა

### „მონაცემთა ბაზა დაბლოკილია“

სხვა პროცესს ჩაწერის ბლოკირება უჭირავს. შეგიძლიათ:

- დაელოდოთ სხვა პროცესის დასრულებას (შეამოწმეთ `lsof | grep storage.sqlite`)
- დაასრულოთ სხვა პროცესი
- თუ პრობლემა არ აღმოიფხვრა, ხელახლა გაუშვათ OmniRoute

### „გარე გასაღების შეზღუდვა დაირღვა“

დომენის მოდული რეფერენციულ მთლიანობას არღვევს. შეამოწმეთ:

- დამოკიდებულ ცხრილებში უპატრონო სტრიქონები
- კასკადური წაშლები, რომლებიც არ გავრცელდა
- ბოლო მიგრაცია, რომელმაც გარე გასაღები შეცვალა

დარღვევების საპოვნელად გაუშვით `PRAGMA foreign_key_check;`.

### „მეხსიერება არასაკმარისია“

SQLite-ის მეხსიერებაში ასახული შეყვანა/გამოტანა ოპერაციული სისტემის ლიმიტს აჭარბებს. შეამცირეთ SQLite pragma-ის მეშვეობით:

```sql
PRAGMA mmap_size = 134217728;  -- 256MB-ის ნაცვლად 128MB
```

ან გამორთეთ:

```sql
PRAGMA mmap_size = 0;
```

### „მიგრაცია შუა პროცესში ჩავარდა“

მიგრაცია ტრანზაქციაში შესრულდა, ამიტომ ცვლილებები უკან უნდა დაბრუნებულიყო. თუ ასე არ მოხდა:

1. **გააჩერეთ OmniRoute** (შემდგომი მცდელობების თავიდან ასაცილებლად)
2. **შეამოწმეთ მონაცემთა ბაზის მდგომარეობა** `sqlite3`-ის მეშვეობით
3. **ხელით გამოასწორეთ** ნაწილობრივ შესრულებული მიგრაცია
4. **ხელახლა გაუშვით** OmniRoute (მიგრაციის შესრულება ხელახლა სცდება)

ამის თავიდან ასაცილებლად, მიგრაციები ყოველთვის ჯერ ასლზე გამოცადეთ.

---

## აგრეთვე იხილეთ

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — გამოყენების ცხრილები
- [MONITORING_GUIDE.md](./MONITORING_GUIDE.md) — მდგომარეობის მონიტორინგი
- [RELEASE_CHECKLIST.md](./RELEASE_CHECKLIST.md) — გამოშვების პროცესი
- წყარო: `src/lib/db/` (80+-ზე მეტი ფაილი, კოდის დაახლოებით 25K სტრიქონი)
