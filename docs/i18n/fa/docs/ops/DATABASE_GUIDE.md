# Database Schema & Operations Guide (فارسی)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/DATABASE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/DATABASE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/DATABASE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/DATABASE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/DATABASE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/DATABASE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/DATABASE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/DATABASE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/DATABASE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/DATABASE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/DATABASE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/DATABASE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/DATABASE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/DATABASE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/DATABASE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/DATABASE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/DATABASE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/DATABASE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/DATABASE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/DATABASE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/DATABASE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/DATABASE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/DATABASE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/DATABASE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/DATABASE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/DATABASE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/DATABASE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/DATABASE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/DATABASE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/DATABASE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/DATABASE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/DATABASE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/DATABASE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/DATABASE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/DATABASE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/DATABASE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/DATABASE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/DATABASE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/DATABASE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/DATABASE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/DATABASE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/DATABASE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/DATABASE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/DATABASE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/DATABASE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/DATABASE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/DATABASE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/DATABASE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/DATABASE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/DATABASE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/DATABASE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/DATABASE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/DATABASE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/DATABASE_GUIDE.md)

---

> **خلاصه**: OmniRoute از **SQLite با ژورنالنویسی WAL** بهعنوان مخزن اصلی خود استفاده میکند و برای فیلدهای حساس، رمزنگاری **AES-256-GCM** در حالت سکون را بهکار میگیرد. این راهنما طرحواره، مهاجرتها، پشتیبانگیری/بازیابی و دستورالعملهای عملیاتی را پوشش میدهد.

**منابع:**

- `src/lib/db/core.ts` — singleton + SCHEMA_SQL (۱۷ جدول پایه)
- `src/lib/db/migrationRunner.ts` — مهاجرتهای نسخهبندیشده
- `src/lib/db/migrations/` — ۱۶۷ فایل SQL نسخهبندیشده
- `src/lib/db/encryption.ts` — توابع کمکی رمزنگاری
- `src/lib/db/backup.ts` — برونبری/درونریزی نسخه پشتیبان
- `src/lib/db/healthCheck.ts` — عیبیابی سلامت

---

## چرا SQLite؟

OmniRoute به دلایل مختلفی SQLite را به PostgreSQL/MySQL ترجیح داده است:

| عامل             | SQLite                                | PostgreSQL                           |
| ---------------- | ------------------------------------- | ------------------------------------ |
| **استقرار**      | توکار — بدون نیاز به سرور جداگانه     | نیازمند راهاندازی سرور               |
| **رمزنگاری**     | لایه برنامه (AES-256-GCM)             | TDE داخلی                            |
| **عملکرد**       | سریعتر برای بارهای کاری کوچک/متوسط    | بهتر برای نوشتنهای همزمان بسیار حجیم |
| **همزمانی**      | حالت WAL امکان خواندن همزمان را میدهد | MVCC کامل                            |
| **پشتیبانگیری**  | کپی یک فایل                           | `pg_dump` یا اسنپشات فایلسیستم       |
| **مورد استفاده** | نصب برای هر کاربر، توکار              | SaaS چندمستاجری                      |

برای استقرارهای **تککاربره و تکنمونهای** (مورد استفاده اصلی OmniRoute)، SQLite سادهتر و سریعتر است.

### ژورنالنویسی WAL

`core.ts` پایگاه داده را در **حالت WAL (ثبت پیشاپیش نوشتن)** باز میکند:

```ts
// src/lib/db/core.ts
db.pragma("journal_mode = WAL");
db.pragma("busy_timeout = 2000");
db.pragma("synchronous = NORMAL");
db.pragma(`cache_size = -${DEFAULT_DATABASE_SETTINGS.optimization.cacheSize}`);
```

WAL امکان **خواندن همزمان** حین نوشتن را فراهم میکند — قابلیتی مهم برای داشبورد که همزمان با ثبت درخواستها، کوئری اجرا میکند.

اندازه پیشفرض کش **۶۵٬۵۳۶ KiB (۶۴ MiB)** است. SQLite مقدار منفی
`cache_size` را بهعنوان یک حد بالای تقریبی بر حسب KiB تفسیر میکند و صفحهها را در صورت نیاز تخصیص میدهد.
بخش **تنظیمات > سیستم و فضای ذخیرهسازی > اندازه کش** مقادیر صحیح بین **۱ تا
۱٬۰۰۰٬۰۰۰ KiB** را میپذیرد؛ ذخیره تنظیمات، آن را روی اتصال فعال پایگاه داده اعمال میکند
و OmniRoute مقدار ذخیرهشده را هنگام راهاندازی بازیابی میکند.

---

## محل پایگاه داده

فایل SQLite در مسیر زیر ذخیره میشود:

| سیستمعامل | مسیر                                                          |
| --------- | ------------------------------------------------------------- |
| Linux     | `~/.omniroute/storage.sqlite`                                 |
| macOS     | `~/.omniroute/storage.sqlite`                                 |
| Windows   | `%USERPROFILE%\.omniroute\storage.sqlite`                     |
| Docker    | `/app/data/storage.sqlite` (قابل پیکربندی از طریق `DATA_DIR`) |

فایلهای همراه:

- `storage.sqlite-wal` — گزارش ثبت پیشاپیش نوشتن
- `storage.sqlite-shm` — فایل حافظه اشتراکی
- `call_logs/` — مصنوعات محتوای درخواست (در صورت فعال بودن)

**بازنویسی محل ذخیرهسازی:**

```bash
DATA_DIR=/custom/path omniroute
```

---

## معماری ماژولهای دامنه

پایگاه داده OmniRoute دارای **110 ماژول سطحبالای TypeScript** در `src/lib/db/` است. هر ماژول دامنه:

- مالک یک یا چند جدول مشخص است
- توابع CRUD نوعدار را export میکند
- هرگز به جداول ماژولهای دیگر دسترسی ندارد
- برای دسترسی به پایگاه داده از `getDbInstance()` در `core.ts` استفاده میکند

### 110 ماژول سطحبالای پایگاه داده

OmniRoute دارای **110 فایل سطحبالای TypeScript** در `src/lib/db/` است. در ادامه نمونهای از ماژولهای اصلی آمده است؛ برای مشاهده فهرست کامل، به فهرست دایرکتوری مراجعه کنید:

| ماژول                   | جداول                                                          | مسئولیت                                                                    |
| ----------------------- | -------------------------------------------------------------- | -------------------------------------------------------------------------- |
| `providers.ts`          | `provider_connections`                                         | ثبت ارائهدهنده و اطلاعات احراز هویت با کلید OAuth/API                      |
| `models.ts`             | `key_value` (دادههای مدل)                                      | تعاریف مدل، قابلیتها و قیمتگذاری                                           |
| `combos.ts`             | `combos`                                                       | پیکربندیها و ترتیب مسیریابی ترکیبی                                         |
| `apiKeys.ts`            | `api_keys`                                                     | چرخه عمر کلید API، محدودههای دسترسی و رهگیری سهمیه                         |
| `settings.ts`           | `key_value`, `api_keys`, `combos`                              | پیکربندی سیستم و فضای ذخیرهسازی مشترک KV                                   |
| `backup.ts`             | —                                                              | عملیات export/import نسخه پشتیبان                                          |
| `proxies.ts`            | `proxy_registry`, `proxy_assignments`, `provider_connections`  | پیکربندیهای پروکسی و قواعد مسیریابی                                        |
| `prompts.ts`            | `prompt_templates`                                             | قالبهای پرامپت قابل استفاده مجدد و نسخهبندی                                |
| `webhooks.ts`           | `webhooks`                                                     | اشتراکها و گزارشهای webhook رویدادمحور                                     |
| `detailedLogs.ts`       | `request_detail_logs`                                          | ثبت گزارش ممیزی برای هر درخواست (اختیاری، با حجم بالا)                     |
| `domainState.ts`        | `domain_*` (5 جدول)                                            | بودجههای دامنه، قطعکنندههای مدار، قفلها، زنجیرههای جایگزین و تاریخچه هزینه |
| `registeredKeys.ts`     | `registered_keys`, `account_key_limits`, `provider_key_limits` | کلیدهای API مجازشده برای MCP/A2A                                           |
| `quotaSnapshots.ts`     | `quota_snapshots`                                              | سوابق تاریخی مصرف سهمیه                                                    |
| `modelComboMappings.ts` | `model_combo_mappings`                                         | نگاشت مدلها به مقادیر پیشفرض ترکیبی                                        |
| `cliToolState.ts`       | `cli_tool_state`                                               | وضعیت ماندگار مختص CLI                                                     |
| `encryption.ts`         | —                                                              | توابع کمکی برای رمزگذاری/رمزگشایی فیلدها                                   |
| `readCache.ts`          | —                                                              | حافظه نهان درونحافظهای برای عملیات با حجم خواندن بالا                      |
| `secrets.ts`            | `key_value` (ورودیهای رمزگذاریشده)                             | ذخیرهسازی رمزگذاریشده اطلاعات محرمانه                                      |
| `stateReset.ts`         | —                                                              | پاکسازی/بازنشانی وضعیت پایگاه داده برای آزمایش                             |
| `contextHandoffs.ts`    | `context_handoffs`                                             | زمینه نشست برای تحویل به عامل دیگر                                         |
| `usage*.ts`             | `usage_history`, `call_logs`, `proxy_logs`                     | رهگیری میزان استفاده                                                       |
| `compression*.ts`       | `compression_settings`, `compression_combos`                   | پیکربندی فشردهسازی                                                         |

### مرزهای ماژولها

یک قاعده معماری اصلی: **ماژولها مستقیماً به جداول یکدیگر دسترسی ندارند**. برای کار با دادههای ماژولی دیگر، تابع موردنظر را از همان ماژول import کنید.

```ts
// ❌ نادرست: اجرای مستقیم SQL از ماژولی دیگر
db.prepare("SELECT * FROM provider_connections").all();

// ✅ درست: استفاده از تابع ماژول providers
import { listProviders } from "@/lib/db/providers";
const providers = await listProviders();
```

این قاعده از طریق بازبینی کد اعمال میشود — هیچ بررسی ایستاییای وجود ندارد، اما تخلفها علامتگذاری میشوند.

---

## شِمای پایه (17 جدول)

فایل `core.ts` هفده جدول پایه را در `SCHEMA_SQL` تعریف میکند. این جدولها توسط مهاجرت `001_initial_schema.sql` ایجاد میشوند و شِمای اصلی را تشکیل میدهند.

### جدولهای اصلی (ایجادشده در مهاجرت اولیه)

| جدول                       | کاربرد                                      | ستونهای کلیدی                                                           |
| -------------------------- | ------------------------------------------- | ----------------------------------------------------------------------- |
| `provider_connections`     | اطلاعات احراز هویت ارائهدهنده (رمزگذاریشده) | `id`، `provider`، `auth_type`، `api_key`، `is_active`                   |
| `provider_nodes`           | اطلاعات مسیریابی گره ارائهدهنده             | `id`، `type`، `name`، `base_url`، `created_at`                          |
| `key_value`                | مخزن عمومی کلید-مقدار                       | `namespace`، `key`، `value`                                             |
| `combos`                   | تعاریف ترکیبهای مسیریابی                    | `id`، `name`، `data`، `sort_order`                                      |
| `api_keys`                 | کلیدهای API برای درگاه                      | `id`، `name`، `key`، `machine_id`، `allowed_models`                     |
| `db_meta`                  | فراداده پایگاه داده                         | `key`، `value`                                                          |
| `usage_history`            | سوابق مصرف درخواستها                        | `id`، `provider`، `model`، `tokens_input`، `tokens_output`، `timestamp` |
| `call_logs`                | محتوای درخواستها و پاسخها                   | `id`، `timestamp`، `status`، `model`، `provider`، `latency_ms`          |
| `proxy_logs`               | گزارشهای درخواست پروکسی                     | `id`، `timestamp`، `proxy_type`، `status`، `provider`                   |
| `domain_fallback_chains`   | زنجیرههای مدل به ارائهدهنده                 | `model`، `chain`                                                        |
| `domain_budgets`           | بودجههای هزینه بهازای هر دامنه              | `api_key_id`، `daily_limit_usd`، `warning_threshold`، `reset_interval`  |
| `domain_budget_reset_logs` | تاریخچه بازنشانی بودجه                      | `id`، `api_key_id`، `reset_interval`، `previous_spend`، `reset_at`      |
| `domain_cost_history`      | ردیابی هزینه بهازای هر دامنه                | `id`، `api_key_id`، `cost`، `timestamp`                                 |
| `domain_lockout_state`     | وضعیت محدودیت نرخ دامنه                     | `identifier`، `attempts`، `locked_until`                                |
| `domain_circuit_breakers`  | وضعیت قطعکننده مدار بهازای هر دامنه         | `name`، `state`، `failure_count`، `last_failure_time`                   |
| `semantic_cache`           | حافظه نهان پاسخهای LLM                      | `id`، `signature`، `model`، `prompt_hash`، `response`                   |
| `quota_snapshots`          | تصاویر لحظهای تاریخی سهمیه                  | `id`، `provider`، `connection_id`، `window_key`، `remaining_percentage` |

### جدولهای اضافی (افزودهشده توسط مهاجرتهای بعدی)

مهاجرتهای بعدی جدولهایی از این قبیل را اضافه میکنند:

- `cli_tool_state` (مهاجرت 011) — وضعیت ابزار CLI
- جدولهای `mcp_*` — ممیزی سرور MCP
- جدولهای `a2a_*` — وضعیت وظایف A2A
- جدولهای `usage_*` — ردیابی مصرف
- جدولهای `plugin_*` — سامانه افزونه
- `skill_executions` — تاریخچه اجرای مهارتها
- جدولهای `memory_*` — سامانه حافظه
- جدولهای `compression_*` — سامانه فشردهسازی
- جدولهای `webhook_*` — گزارش تحویل webhook
- جدولهای `acp_*` — پروتکل کلاینت عامل
- جدولهای `oneproxy_*` — بازار 1proxy
- `proxy_assignments` — اتصالهای محدوده پروکسی
- `detailed_call_artifacts` — فراداده مصنوعات گزارش فراخوانی
- `quota_alert_history` — ممیزی هشدار سهمیه
- `command_code_auth_sessions` — نشستهای OAuth مربوط به Command Code

فهرست کامل بیش از 30 جدول در `src/lib/db/migrations/` قرار دارد.

---

## مهاجرتها

OmniRoute از **مهاجرتهای نسخهبندیشده و همتوان** در `src/lib/db/migrations/` استفاده میکند. هر مهاجرت یک فایل SQL واحد با نام `NNN_description.sql` است.

### نامگذاری مهاجرتها

```
001_initial_schema.sql
002_mcp_a2a_tables.sql
003_provider_node_custom_paths.sql
...
021_combo_call_log_targets.sql
```

### نحوه اجرای مهاجرتها

هنگام راهاندازی، `migrationRunner.ts`:

1. در صورت عدم وجود، جدول `_omniroute_migrations` را ایجاد میکند
2. مهاجرتهایی را که قبلاً اعمال شدهاند، واکشی میکند
3. مهاجرتهای جدید را بهترتیب و هرکدام را در یک تراکنش اعمال میکند
4. هر مهاجرت اعمالشده را همراه با برچسب زمانی ثبت میکند

```ts
// src/lib/db/migrationRunner.ts (نسخه سادهشده)
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

### همتوانی

مهاجرتها باید **همتوان** باشند — اجرای دوباره آنها نباید هیچ تغییری ایجاد کند:

```sql
-- 004_proxy_registry.sql
CREATE TABLE IF NOT EXISTS proxy_registry (
  id TEXT PRIMARY KEY,
  host TEXT NOT NULL,
  port INTEGER NOT NULL,
  ...
);
```

از عبارتهای `IF NOT EXISTS`، `IF EXISTS` و `OR IGNORE` / `OR REPLACE` بهطور گسترده استفاده کنید.

### افزودن یک مهاجرت جدید

1. **شماره بعدی را شناسایی کنید**: `ls src/lib/db/migrations/ | tail -1`
2. **فایل را ایجاد کنید**: `NNN_my_change.sql`
3. **از DDL ایمن استفاده کنید**: `CREATE TABLE IF NOT EXISTS`، `ALTER TABLE ... ADD COLUMN`
4. **دادهها را با دقت تکمیل کنید**: برای مدیریت ردیفهای موجود از `UPDATE ... WHERE ...` استفاده کنید
5. **روی یک کپی آزمایش کنید**: هرگز مهاجرتهای آزمایشنشده را در محیط عملیاتی اجرا نکنید

مثال:

```sql
-- 022_add_combo_priority.sql
ALTER TABLE combos ADD COLUMN priority INTEGER DEFAULT 100;
UPDATE combos SET priority = 100 WHERE priority IS NULL;
CREATE INDEX IF NOT EXISTS idx_combos_priority ON combos(priority);
```

> **تغییرات ناسازگار با نسخههای قبلی** (برای مثال، حذف ستونها) پیچیده هستند. OmniRoute از بازگشت به نسخه قبلی پشتیبانی نمیکند — پس از اعمال یک مهاجرت، تغییر شِما دائمی است. متناسب با این موضوع برنامهریزی کنید.

---

## رمزنگاری دادههای ذخیرهشده

فیلدهای حساس (کلیدهای API، توکنهای OAuth و رشتههای اتصال) در حالت ذخیرهشده با استفاده از **AES-256-GCM** رمزنگاری میشوند.

### نحوه کارکرد

```ts
// src/lib/db/encryption.ts (نسخه سادهشده)
const key = deriveKeyFromPassphrase(passphrase, salt);
const iv = randomBytes(12);
const cipher = createCipheriv("aes-256-gcm", key, iv);
const encrypted = Buffer.concat([cipher.update(plaintext), cipher.final()]);
const authTag = cipher.getAuthTag();
return { encrypted, iv, authTag };
```

### محلهای استفاده

- `provider_connections.api_key` — رمزنگاریشده در سطح برنامه
- `provider_connections.access_token`، `refresh_token`، `id_token` — رمزنگاریشده در سطح برنامه
- ورودیهای `key_value` با `namespace = "secrets"` — رمزنگاریشده در سطح برنامه
- `proxy_registry.auth` — رمزنگاریشده در سطح برنامه (در صورت وجود)

### کلید رمزنگاری

کلید رمزنگاری از یک **عبارت عبور** (تنظیمشده از طریق متغیر محیطی `STORAGE_ENCRYPTION_KEY`) و یک **salt** (ذخیرهشده در پایگاه داده) مشتق میشود. برای رمزگشایی دادهها، هر دو مورد ضروری هستند.

```bash
# یک عبارت عبور امن ایجاد کنید
openssl rand -hex 32

# آن را در .env تنظیم کنید
STORAGE_ENCRYPTION_KEY=<کلید-شما>
```

> **بسیار مهم**: از دست دادن کلید رمزنگاری بهمعنای از دست دادن دسترسی به تمام دادههای رمزنگاریشده است. **از کلید، جدا از پایگاه داده نسخه پشتیبان تهیه کنید**.

### مواردی که رمزنگاری نمیشوند

به دلایل عملکردی، موارد زیر بهصورت متن ساده ذخیره میشوند:

- نامهای نمایشی ارائهدهندگان
- تعاریف مدلها (از قبل عمومی هستند)
- قواعد مسیریابی
- سوابق استفاده (بدون اطلاعات هویتی شخصی)

---

## ملاحظات رمزنگاری (v3.8.16+)

OmniRoute برای مدیریت شفاف دو طرح رمزنگاری از **`migrateLegacyEncryptedString()`** استفاده میکند:

- **قدیمی** (پیش از v3.5.0): «رمزنگاری» مبتنی بر XOR (رمزنگاری واقعی نیست)
- **فعلی**: AES-256-GCM با IV و برچسب احراز اصالت مناسب

تابع کمکی مهاجرت، قالب قدیمی را تشخیص میدهد و هنگام اولین خواندن، دادهها را با طرح جدید دوباره رمزنگاری میکند. این یعنی میتوانید یک پایگاه داده قدیمی را بدون از دست دادن اطلاعات احراز هویت ارتقا دهید.

---

## کش خواندن

برای دادههایی که مرتباً خوانده میشوند (مدلها، ارائهدهندگان و تنظیمات)، `readCache.ts` یک **کش درونحافظهای** فراهم میکند:

```ts
// هنگام راهاندازی کش میشود و با نوشتن نامعتبر میشود
const providers = await getCachedProviders(); // سریع، درونحافظهای
const fresh = await listProviders(); // کند، با دسترسی به پایگاه داده
```

| موجودیت کششده          | کلید کش        | TTL           |
| ---------------------- | -------------- | ------------- |
| `models`               | `models:v1`    | تا زمان نوشتن |
| `provider_connections` | `providers:v1` | تا زمان نوشتن |
| `settings`             | `settings:v1`  | تا زمان نوشتن |
| `combos`               | `combos:v1`    | تا زمان نوشتن |

با هر بار نوشتن در جدول مربوطه، کش نامعتبر میشود.

---

## پشتیبانگیری و بازیابی

### پشتیبانگیری دستی

```bash
# برای ایجاد یک نسخه پشتیبان محلی از CLI استفاده کنید
omniroute backup create --name pre-migration

# یا از طریق API
curl -X PUT http://localhost:20128/api/db-backups \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

فایل پشتیبان شامل موارد زیر است:

- همه جداول پایگاه داده (سریالسازیشده به JSON)
- آرتیفکتهای گزارش تماس (با کدگذاری base64، اختیاری)
- تنظیمات + اطلاعات محرمانه (رمزنگاریشده)
- پیکربندی افزونه

### بازیابی

```bash
# از طریق CLI
omniroute restore pre-migration

# از طریق API
curl -X POST http://localhost:20128/api/db-backups/restore \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

> **هشدار**: بازیابی، کل پایگاه داده را بازنویسی میکند. ابتدا همه کلاینتها را متوقف کنید.

### پشتیبانگیری خودکار

```bash
# پشتیبانگیری خودکار روزانه را از طریق CLI فعال کنید
omniroute backup auto enable --cron "0 2 * * *" --retention 7
```

زمانبندی در سمت سرور توسط یک کار پسزمینه اجرا میشود که هر ۳۰ ثانیه
(بهصورت پیشفرض) فعال شده و عبارت cron را بر اساس زمان محلی سرور ارزیابی میکند.

| متغیر                                       | پیشفرض  | توضیحات                                                                                                                     |
| ------------------------------------------- | ------- | --------------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_BACKUP_SCHEDULE_JOB_INTERVAL_MS` | `30000` | فاصله زمانی اجرا بر حسب میلیثانیه (حداقل `5000`). برای قرار گرفتن مطمئن در دقیقه منطبق cron، باید کوتاهتر از ۶۰ ثانیه باشد. |

### پشتیبانگیری داغ SQLite

برای پشتیبانگیری بدون قطعی از یک پایگاه داده فعال:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".backup /backups/omniroute-hot.db"
```

این دستور از API پشتیبانگیری آنلاین SQLite استفاده میکند — اجرای آن هنگام فعال بودن OmniRoute ایمن است.

---

## تنظیم عملکرد

### حالت WAL

حالت WAL بهطور پیشفرض فعال است. برای بارهای کاری با نوشتن زیاد، موارد زیر را در نظر بگیرید:

```sql
PRAGMA wal_autocheckpoint = 1000;  -- ایجاد نقطهٔ بررسی در هر 1000 صفحه
PRAGMA journal_size_limit = 67108864;  -- سقف 64MB برای WAL
```

### ایندکسها

ایندکسهای کلیدی برای عملکرد بهتر (بهطور خودکار توسط مهاجرتها ایجاد میشوند):

- `idx_models_provider` — جستوجوی مدلها بر اساس ارائهدهنده
- `idx_combo_targets_combo_id` — گسترش مقصدهای ترکیبی
- `idx_usage_history_api_key_timestamp` — تحلیل میزان استفاده
- `idx_quota_snapshots_api_key_window` — ردیابی سهمیه
- `idx_call_logs_timestamp` — کوئریهای گزارش فراخوانی

برای افزودن یک ایندکس جدید، یک مهاجرت ایجاد کنید:

```sql
-- 023_add_my_index.sql
CREATE INDEX IF NOT EXISTS idx_my_table_my_column ON my_table(my_column);
```

### ورودی/خروجی نگاشتشده در حافظه

برای پایگاههای داده بسیار بزرگ (>10GB)، میتوان نگاشت حافظه را از طریق pragma در SQLite تنظیم کرد:

```sql
-- تنظیم از طریق pragma در SQLite (در core.ts یا زمان اجرا تغییر دهید)
PRAGMA mmap_size = 268435456;  -- 256MB
```

### فشردهسازی

نمونههای OmniRoute که برای مدت طولانی اجرا میشوند، از اجرای گاهبهگاه `VACUUM` سود میبرند:

```bash
sqlite3 ~/.omniroute/storage.sqlite "VACUUM;"
```

این دستور را ماهانه و در بازههای کمترافیک اجرا کنید. (حالت WAL نیاز به آن را کاهش میدهد، اما از بین نمیبرد.)

---

## بررسی سلامت

`src/lib/db/healthCheck.ts` **تشخیصهای سلامت در سطح پایگاه داده** را ارائه میکند:

هر دو فعل به احراز هویت نیاز دارند (در غیر این صورت `401`). `GET` فقط عیبیابی میکند؛ `POST` همان
بررسی را با فعال بودن `autoRepair` اجرا میکند.

```bash
GET  /api/db/health   # عیبیابی
POST /api/db/health   # عیبیابی + تعمیر
```

پاسخ، همان `DbHealthCheckResult` تولیدشده توسط `runDbHealthCheck()` است
(`src/lib/db/healthCheck.ts`):

```json
{
  "isHealthy": false,
  "issues": [
    {
      "type": "broken_reference",
      "table": "domain_budgets",
      "description": "بودجههای دامنه به کلیدهای APIای ارجاع دادهاند که دیگر وجود ندارند.",
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

| فیلد              | معنا                                                                                                                                                                             |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `isHealthy`       | هنگامی `true` است که `issues` خالی باشد. `driver` هرگز بر آن تأثیر نمیگذارد.                                                                                                     |
| `issues[].type`   | یکی از مقادیر `integrity_check_failed`، `broken_reference`، `stale_snapshot` یا `invalid_state` است.                                                                             |
| `repairedCount`   | تعداد ردیفهای تعمیرشده در این اجرا؛ هنگامی که `autoRepair` برابر با false باشد، همیشه `0` است.                                                                                   |
| `backupCreated`   | مشخص میکند آیا پیش از تعمیر، نسخهٔ پشتیبان تهیه شده است یا خیر.                                                                                                                  |
| `checkedAt`       | برچسب زمانی ISO که میان اجرا و هر یادداشت تعمیری که نوشته میشود مشترک است.                                                                                                       |
| `driver.name`     | درایور SQLite که پایگاه داده بررسیشده را ارائه میکند.                                                                                                                            |
| `driver.degraded` | هنگامی `true` است که نوشتنها بهصورت ماندگار توسط فایل پایگاه داده پشتیبانی نشوند — یعنی در حالت جایگزین WASM مبتنی بر `sql.js` (ماندگاری کل فایل) یا یک پایگاه داده درونحافظهای. |

همین محتوای پاسخ توسط ابزار MCP با نام `omniroute_db_health_check` نیز بازگردانده میشود.

برای شناسایی خرابی، `PRAGMA integrity_check` را اجرا کنید:

```bash
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"
# باید چاپ شود: ok
```

اگر مقداری غیر از `ok` برگرداند، **استفاده از پایگاه داده را فوراً متوقف کنید** و آن را از نسخهٔ پشتیبان بازیابی کنید.

---

## بازیابی پس از فاجعه

### سناریوی 1: فایل WAL از دست رفته است

فایل `-wal` وجود ندارد، اما فایل `-shm` و پایگاه داده اصلی سالم هستند:

```bash
# هنگام باز کردن بعدی بهطور خودکار بازیابی میشود
omniroute
```

اگر SQLite نتواند بهطور خودکار بازیابی کند:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".recover" > recovered.sql
sqlite3 recovered.db < recovered.sql
mv recovered.db ~/.omniroute/storage.sqlite
```

### سناریوی 2: فایل اصلی پایگاه داده خراب شده است

از نسخه پشتیبان بازیابی کنید:

```bash
omniroute sync pull --merge   # یا: omniroute backup restore <backup-id>
```

### سناریوی 3: کلید رمزنگاری از دست رفته است

بدون کلید، **هیچ امکانی برای بازیابی وجود ندارد**. فیلدهای رمزنگاریشده قابل خواندن نیستند. همه ارائهدهندگان را با اطلاعات احراز هویت جدید بهصورت دستی دوباره اضافه کنید.

> **راهکار کاهش ریسک**: همیشه از کلید رمزنگاری بهصورت جداگانه نسخه پشتیبان تهیه کنید؛ ترجیحاً در یک مدیر گذرواژه یا KMS.

### سناریوی 4: دیسک پر است

SQLite خطاهای `SQLITE_FULL` را برمیگرداند. فضای دیسک را آزاد کنید، سپس:

```bash
# برای آزاد کردن فضا، از WAL نقطهبازرسی بگیرید
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA wal_checkpoint(TRUNCATE);"
```

---

## عملیات رایج

### بررسی یک جدول

```bash
sqlite3 ~/.omniroute/storage.sqlite "SELECT * FROM api_keys LIMIT 5;"
```

### شمارش ردیفهای همه جدولها

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';
EOF
```

### بازنشانی (پاکسازی) همه دادهها

```bash
# ابتدا OmniRoute را متوقف کنید
omniroute stop

# فایل پایگاه داده را حذف کنید
rm ~/.omniroute/storage.sqlite*

# راهاندازی مجدد کنید (یک پایگاه داده خالی دوباره ایجاد میشود)
omniroute
```

برای بازنشانی **انتخابی** (حفظ ارائهدهندگان و پاکسازی دادههای مصرف):

```bash
DELETE FROM usage_history WHERE timestamp < datetime('now', '-30 day');
DELETE FROM call_logs WHERE timestamp < datetime('now', '-30 day');
DELETE FROM proxy_logs WHERE timestamp < datetime('now', '-30 day');
```

### خروجی گرفتن از یک جدول

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
.mode csv
.output api_keys.csv
SELECT * FROM api_keys;
EOF
```

---

## عیبیابی

### «پایگاه داده قفل است»

فرایند دیگری قفل نوشتن را در اختیار دارد. یکی از کارهای زیر را انجام دهید:

- منتظر بمانید تا فرایند دیگر تمام شود (`lsof | grep storage.sqlite` را بررسی کنید)
- فرایند دیگر را خاتمه دهید
- اگر مشکل ادامه داشت، OmniRoute را مجدداً راهاندازی کنید

### «محدودیت کلید خارجی نقض شد»

یک ماژول دامنه، یکپارچگی ارجاعی را نقض میکند. موارد زیر را بررسی کنید:

- ردیفهای یتیم در جدولهای وابسته
- حذفهای آبشاری که منتشر نشدهاند
- مهاجرت اخیری که یک کلید خارجی را تغییر داده است

برای یافتن موارد نقض، `PRAGMA foreign_key_check;` را اجرا کنید.

### «حافظه کافی نیست»

ورودی/خروجی نگاشتشده به حافظه SQLite از محدودیت سیستمعامل فراتر رفته است. با استفاده از pragma در SQLite آن را کاهش دهید:

```sql
PRAGMA mmap_size = 134217728;  -- 128MB بهجای 256MB
```

یا آن را غیرفعال کنید:

```sql
PRAGMA mmap_size = 0;
```

### «مهاجرت در میانه فرایند شکست خورد»

مهاجرت درون یک تراکنش اجرا شده است، بنابراین باید بازگردانی شده باشد. اگر چنین نشده است:

1. **OmniRoute را متوقف کنید** (برای جلوگیری از تلاشهای بیشتر)
2. **وضعیت پایگاه داده را** با `sqlite3` **بررسی کنید**
3. مهاجرت ناقص را **بهصورت دستی اصلاح کنید**
4. OmniRoute را **دوباره اجرا کنید** (مهاجرت مجدداً امتحان خواهد شد)

برای جلوگیری از این مشکل، همیشه ابتدا مهاجرتها را روی یک کپی آزمایش کنید.

---

## همچنین ببینید

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — جدولهای مصرف
- [MONITORING_GUIDE.md](./MONITORING_GUIDE.md) — پایش سلامت
- [RELEASE_CHECKLIST.md](./RELEASE_CHECKLIST.md) — فرایند انتشار
- منبع: `src/lib/db/` (بیش از 80 فایل، حدود 25K خط کد)
