# Database Schema & Operations Guide (اردو)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/DATABASE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/DATABASE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/DATABASE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/DATABASE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/DATABASE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/DATABASE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/DATABASE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/DATABASE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/DATABASE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/DATABASE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/DATABASE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/DATABASE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/DATABASE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/DATABASE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/DATABASE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/DATABASE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/DATABASE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/DATABASE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/DATABASE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/DATABASE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/DATABASE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/DATABASE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/DATABASE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/DATABASE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/DATABASE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/DATABASE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/DATABASE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/DATABASE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/DATABASE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/DATABASE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/DATABASE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/DATABASE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/DATABASE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/DATABASE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/DATABASE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/DATABASE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/DATABASE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/DATABASE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/DATABASE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/DATABASE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/DATABASE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/DATABASE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/DATABASE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/DATABASE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/DATABASE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/DATABASE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/DATABASE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/DATABASE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/DATABASE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/DATABASE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/DATABASE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/DATABASE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/DATABASE_GUIDE.md)

---

> **خلاصہ**: OmniRoute اپنے بنیادی اسٹور کے طور پر **WAL جرنلنگ کے ساتھ SQLite** استعمال کرتا ہے، جبکہ حساس فیلڈز کے لیے محفوظ حالت میں **AES-256-GCM** انکرپشن استعمال کی جاتی ہے۔ یہ رہنما اسکیما، مائیگریشنز، بیک اپ/ریکوری، اور آپریشنل رن بکس کا احاطہ کرتا ہے۔

**ماخذ:**

- `src/lib/db/core.ts` — سنگلٹن + SCHEMA_SQL (17 بنیادی ٹیبلز)
- `src/lib/db/migrationRunner.ts` — ورژن شدہ مائیگریشنز
- `src/lib/db/migrations/` — 167 ورژن شدہ SQL فائلیں
- `src/lib/db/encryption.ts` — انکرپشن کے معاون فنکشنز
- `src/lib/db/backup.ts` — بیک اپ ایکسپورٹ/امپورٹ
- `src/lib/db/healthCheck.ts` — صحت کی تشخیص

---

## SQLite کیوں؟

OmniRoute نے کئی وجوہات کی بنا پر PostgreSQL/MySQL کے بجائے SQLite کا انتخاب کیا:

| عنصر         | SQLite                                  | PostgreSQL                         |
| ------------ | --------------------------------------- | ---------------------------------- |
| **تعیناتی**  | ایمبیڈڈ — علیحدہ سرور کی ضرورت نہیں     | سرور سیٹ اپ درکار ہے               |
| **انکرپشن**  | ایپلیکیشن کی سطح پر (AES-256-GCM)       | بلٹ اِن TDE                        |
| **کارکردگی** | چھوٹے/درمیانے ورک لوڈز کے لیے زیادہ تیز | بہت بڑی متوازی تحریروں کے لیے بہتر |
| **ہم زمانی** | WAL موڈ متوازی ریڈز کی اجازت دیتا ہے    | مکمل MVCC                          |
| **بیک اپ**   | ایک فائل کی نقل                         | `pg_dump` یا فائل سسٹم اسنیپ شاٹ   |
| **استعمال**  | فی صارف انسٹالیشن، ایمبیڈڈ              | ملٹی ٹیننٹ SaaS                    |

**ایک صارف، ایک انسٹینس** والی تعیناتیوں کے لیے (جو OmniRoute کا بنیادی استعمال ہے)، SQLite زیادہ سادہ اور تیز ہے۔

### WAL جرنلنگ

`core.ts` ڈیٹابیس کو **WAL (Write-Ahead Logging) موڈ** کے ساتھ کھولتا ہے:

```ts
// src/lib/db/core.ts
db.pragma("journal_mode = WAL");
db.pragma("busy_timeout = 2000");
db.pragma("synchronous = NORMAL");
db.pragma(`cache_size = -${DEFAULT_DATABASE_SETTINGS.optimization.cacheSize}`);
```

WAL تحریر کے دوران **متوازی ریڈز** کی اجازت دیتا ہے — یہ ڈیش بورڈ کے لیے اہم ہے، جو ریکویسٹ ریکارڈ ہوتے وقت کوئریز چلاتا ہے۔

ڈیفالٹ کیش سائز **65,536 KiB (64 MiB)** ہے۔ SQLite منفی
`cache_size` کو KiB میں ایک تخمینی بالائی حد سمجھتا ہے اور ضرورت کے مطابق پیجز مختص کرتا ہے۔
**Settings > System & Storage > Cache Size** میں **1 سے
1,000,000 KiB** تک عددی اقدار قبول کی جاتی ہیں؛ سیٹنگ محفوظ کرنے سے یہ براہِ راست ڈیٹابیس کنکشن پر لاگو ہو جاتی ہے،
اور OmniRoute آغاز کے وقت محفوظ شدہ قدر بحال کر دیتا ہے۔

---

## ڈیٹابیس کا مقام

SQLite فائل یہاں محفوظ ہوتی ہے:

| OS      | راستہ                                                        |
| ------- | ------------------------------------------------------------ |
| Linux   | `~/.omniroute/storage.sqlite`                                |
| macOS   | `~/.omniroute/storage.sqlite`                                |
| Windows | `%USERPROFILE%\.omniroute\storage.sqlite`                    |
| Docker  | `/app/data/storage.sqlite` (`DATA_DIR` کے ذریعے قابلِ ترتیب) |

ساتھی فائلیں:

- `storage.sqlite-wal` — رائٹ اَہیڈ لاگ
- `storage.sqlite-shm` — مشترکہ میموری فائل
- `call_logs/` — ریکویسٹ پے لوڈ کے اجزا (اگر فعال ہوں)

**مقام تبدیل کریں:**

```bash
DATA_DIR=/custom/path omniroute
```

---

## ڈومین ماڈیول آرکیٹیکچر

OmniRoute کے ڈیٹابیس میں `src/lib/db/` کے اندر **110 اعلیٰ سطحی TypeScript ماڈیولز** ہیں۔ ہر ڈومین ماڈیول:

- ایک یا زیادہ مخصوص ٹیبلز کا مالک ہوتا ہے
- ٹائپ شدہ CRUD فنکشنز ایکسپورٹ کرتا ہے
- کبھی کسی دوسرے ماڈیول کے ٹیبلز کو استعمال نہیں کرتا
- DB تک رسائی کے لیے `core.ts` سے `getDbInstance()` استعمال کرتا ہے

### 110 اعلیٰ سطحی DB ماڈیولز

OmniRoute میں `src/lib/db/` کے اندر **110 اعلیٰ سطحی TypeScript فائلیں** ہیں۔ ذیل میں بنیادی ماڈیولز کا ایک نمونہ دیا گیا ہے؛ مکمل فہرست کے لیے ڈائریکٹری کی فہرست دیکھیں:

| ماڈیول                  | ٹیبلز                                                          | ذمہ داری                                                       |
| ----------------------- | -------------------------------------------------------------- | -------------------------------------------------------------- |
| `providers.ts`          | `provider_connections`                                         | OAuth/API کلید فراہم کنندہ کی رجسٹریشن اور اسناد               |
| `models.ts`             | `key_value` (ماڈل ڈیٹا)                                        | ماڈل کی تعریفیں، صلاحیتیں، قیمت بندی                           |
| `combos.ts`             | `combos`                                                       | کومبو روٹنگ کنفیگریشنز اور ترتیب                               |
| `apiKeys.ts`            | `api_keys`                                                     | API کلید کا لائف سائیکل، اسکوپس، کوٹا کی نگرانی                |
| `settings.ts`           | `key_value`, `api_keys`, `combos`                              | سسٹم کنفیگریشن اور مشترکہ KV اسٹور                             |
| `backup.ts`             | —                                                              | بیک اپ ایکسپورٹ/امپورٹ آپریشنز                                 |
| `proxies.ts`            | `proxy_registry`, `proxy_assignments`, `provider_connections`  | پراکسی کنفیگریشنز اور روٹنگ کے اصول                            |
| `prompts.ts`            | `prompt_templates`                                             | دوبارہ قابلِ استعمال پرامپٹ ٹیمپلیٹس، ورژننگ                   |
| `webhooks.ts`           | `webhooks`                                                     | ایونٹ سے چلنے والی webhook سبسکرپشنز اور لاگز                  |
| `detailedLogs.ts`       | `request_detail_logs`                                          | فی درخواست آڈٹ لاگنگ (اختیاری، زیادہ حجم)                      |
| `domainState.ts`        | `domain_*` (5 ٹیبلز)                                           | ڈومین بجٹس، سرکٹ بریکرز، لاک آؤٹس، فال بیک چینز، لاگت کی تاریخ |
| `registeredKeys.ts`     | `registered_keys`, `account_key_limits`, `provider_key_limits` | MCP/A2A کے لیے اجازت یافتہ API کلیدیں                          |
| `quotaSnapshots.ts`     | `quota_snapshots`                                              | کوٹا کے استعمال کی تاریخی معلومات                              |
| `modelComboMappings.ts` | `model_combo_mappings`                                         | ماڈلز کو ڈیفالٹ کومبوز سے میپ کرنا                             |
| `cliToolState.ts`       | `cli_tool_state`                                               | CLI کے لیے مخصوص مستقل حالت                                    |
| `encryption.ts`         | —                                                              | فیلڈز کو انکرپٹ/ڈکرپٹ کرنے کے لیے مددگار فنکشنز                |
| `readCache.ts`          | —                                                              | زیادہ ریڈ آپریشنز کے لیے اِن میموری کیش                        |
| `secrets.ts`            | `key_value` (انکرپٹ شدہ اندراجات)                              | انکرپٹ شدہ رازوں کا ذخیرہ                                      |
| `stateReset.ts`         | —                                                              | ٹیسٹنگ کے لیے DB اسٹیٹ کو صاف/ری سیٹ کرنا                      |
| `contextHandoffs.ts`    | `context_handoffs`                                             | ایجنٹ ہینڈ آف کے لیے سیشن کا سیاق و سباق                       |
| `usage*.ts`             | `usage_history`, `call_logs`, `proxy_logs`                     | استعمال کی نگرانی                                              |
| `compression*.ts`       | `compression_settings`, `compression_combos`                   | کمپریشن کنفیگریشن                                              |

### ماڈیول کی حدود

ایک بنیادی آرکیٹیکچرل اصول: **ماڈیولز ایک دوسرے کے ٹیبلز تک براہِ راست رسائی حاصل نہیں کرتے**۔ کسی دوسرے ماڈیول کے ڈیٹا کے ساتھ کام کرنے کے لیے، اسی ماڈیول سے فنکشن امپورٹ کریں۔

```ts
// ❌ غلط: دوسرے ماڈیول سے براہِ راست SQL
db.prepare("SELECT * FROM provider_connections").all();

// ✅ درست: providers ماڈیول کا فنکشن استعمال کریں
import { listProviders } from "@/lib/db/providers";
const providers = await listProviders();
```

اس اصول کا نفاذ کوڈ ریویو کے ذریعے کیا جاتا ہے — کوئی جامد جانچ موجود نہیں، لیکن خلاف ورزیوں کی نشاندہی کی جاتی ہے۔

---

## بنیادی اسکیما (17 ٹیبلز)

`core.ts`، `SCHEMA_SQL` میں 17 بنیادی ٹیبلز کی وضاحت کرتا ہے۔ یہ migration `001_initial_schema.sql` کے ذریعے بنائے جاتے ہیں اور بنیادی اسکیما تشکیل دیتے ہیں۔

### بنیادی ٹیبلز (ابتدائی migration میں بنائے گئے)

| ٹیبل                       | مقصد                                   | کلیدی کالمز                                                             |
| -------------------------- | -------------------------------------- | ----------------------------------------------------------------------- |
| `provider_connections`     | فراہم کنندہ کی اسناد (مرموز شدہ)       | `id`, `provider`, `auth_type`, `api_key`, `is_active`                   |
| `provider_nodes`           | فراہم کنندہ کے نوڈ کی روٹنگ کی معلومات | `id`, `type`, `name`, `base_url`, `created_at`                          |
| `key_value`                | عمومی KV اسٹور                         | `namespace`, `key`, `value`                                             |
| `combos`                   | روٹنگ کومبو کی تعریفات                 | `id`, `name`, `data`, `sort_order`                                      |
| `api_keys`                 | گیٹ وے کے لیے API کلیدیں               | `id`, `name`, `key`, `machine_id`, `allowed_models`                     |
| `db_meta`                  | ڈیٹابیس میٹا ڈیٹا                      | `key`, `value`                                                          |
| `usage_history`            | درخواست کے استعمال کے ریکارڈز          | `id`, `provider`, `model`, `tokens_input`, `tokens_output`, `timestamp` |
| `call_logs`                | درخواست کے پے لوڈز اور جوابات          | `id`, `timestamp`, `status`, `model`, `provider`, `latency_ms`          |
| `proxy_logs`               | پراکسی درخواست کے لاگز                 | `id`, `timestamp`, `proxy_type`, `status`, `provider`                   |
| `domain_fallback_chains`   | ماڈل سے فراہم کنندہ تک کی زنجیریں      | `model`, `chain`                                                        |
| `domain_budgets`           | ہر ڈومین کے اخراجات کے بجٹس            | `api_key_id`, `daily_limit_usd`, `warning_threshold`, `reset_interval`  |
| `domain_budget_reset_logs` | بجٹ ری سیٹ کی تاریخ                    | `id`, `api_key_id`, `reset_interval`, `previous_spend`, `reset_at`      |
| `domain_cost_history`      | ہر ڈومین کی لاگت کی ٹریکنگ             | `id`, `api_key_id`, `cost`, `timestamp`                                 |
| `domain_lockout_state`     | ڈومین کی شرح کی حد کی حالت             | `identifier`, `attempts`, `locked_until`                                |
| `domain_circuit_breakers`  | ہر ڈومین کے لیے سرکٹ بریکر کی حالت     | `name`, `state`, `failure_count`, `last_failure_time`                   |
| `semantic_cache`           | LLM جوابات کا کیش                      | `id`, `signature`, `model`, `prompt_hash`, `response`                   |
| `quota_snapshots`          | کوٹے کے تاریخی اسنیپ شاٹس              | `id`, `provider`, `connection_id`, `window_key`, `remaining_percentage` |

### اضافی ٹیبلز (بعد کی migrations کے ذریعے شامل کیے گئے)

بعد کی migrations درج ذیل جیسے ٹیبلز شامل کرتی ہیں:

- `cli_tool_state` (migration 011) — CLI ٹول کی حالت
- `mcp_*` ٹیبلز — MCP سرور آڈٹ
- `a2a_*` ٹیبلز — A2A ٹاسک کی حالت
- `usage_*` ٹیبلز — استعمال کی ٹریکنگ
- `plugin_*` ٹیبلز — پلگ اِن سسٹم
- `skill_executions` — اسکل پر عمل درآمد کی تاریخ
- `memory_*` ٹیبلز — میموری سسٹم
- `compression_*` ٹیبلز — کمپریشن سسٹم
- `webhook_*` ٹیبلز — ویب ہک کی ترسیل کا لاگ
- `acp_*` ٹیبلز — ایجنٹ کلائنٹ پروٹوکول
- `oneproxy_*` ٹیبلز — 1proxy مارکیٹ پلیس
- `proxy_assignments` — پراکسی اسکوپ بائنڈنگز
- `detailed_call_artifacts` — کال لاگ آرٹی فیکٹس کا میٹا ڈیٹا
- `quota_alert_history` — کوٹا الرٹ آڈٹ
- `command_code_auth_sessions` — Command Code OAuth سیشنز

تقریباً 30 سے زائد ٹیبلز کی مکمل فہرست `src/lib/db/migrations/` میں موجود ہے۔

---

## مائیگریشنز

OmniRoute، `src/lib/db/migrations/` میں **ورژن شدہ، آئیڈیمپوٹنٹ مائیگریشنز** استعمال کرتا ہے۔ ہر مائیگریشن ایک واحد SQL فائل ہوتی ہے جس کا نام `NNN_description.sql` ہوتا ہے۔

### مائیگریشن کے نام رکھنے کا طریقہ

```
001_initial_schema.sql
002_mcp_a2a_tables.sql
003_provider_node_custom_paths.sql
...
021_combo_call_log_targets.sql
```

### مائیگریشنز کیسے چلتی ہیں

آغاز کے وقت، `migrationRunner.ts`:

1. اگر `_omniroute_migrations` ٹیبل موجود نہ ہو تو اسے بناتا ہے
2. پہلے سے لاگو شدہ مائیگریشنز کے لیے استفسار کرتا ہے
3. تمام نئی مائیگریشنز کو ترتیب سے لاگو کرتا ہے، ہر ایک کو ایک ٹرانزیکشن میں
4. ہر لاگو شدہ مائیگریشن کو ٹائم اسٹیمپ کے ساتھ ریکارڈ کرتا ہے

```ts
// src/lib/db/migrationRunner.ts (آسان کردہ)
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

### آئیڈیمپوٹینسی

مائیگریشنز کا **آئیڈیمپوٹنٹ** ہونا ضروری ہے — انہیں دو مرتبہ چلانے سے کوئی اضافی عمل نہیں ہونا چاہیے:

```sql
-- 004_proxy_registry.sql
CREATE TABLE IF NOT EXISTS proxy_registry (
  id TEXT PRIMARY KEY,
  host TEXT NOT NULL,
  port INTEGER NOT NULL,
  ...
);
```

`IF NOT EXISTS`، `IF EXISTS`، اور `OR IGNORE` / `OR REPLACE` کلازز کا فراخ دلی سے استعمال کریں۔

### نئی مائیگریشن شامل کرنا

1. **اگلا نمبر شناخت کریں**: `ls src/lib/db/migrations/ | tail -1`
2. **فائل بنائیں**: `NNN_my_change.sql`
3. **محفوظ DDL استعمال کریں**: `CREATE TABLE IF NOT EXISTS`، `ALTER TABLE ... ADD COLUMN`
4. **ڈیٹا احتیاط سے بیک فل کریں**: موجودہ قطاروں کو سنبھالنے کے لیے `UPDATE ... WHERE ...` استعمال کریں
5. **ایک نقل پر ٹیسٹ کریں**: غیر آزمودہ مائیگریشنز کو کبھی پروڈکشن پر نہ چلائیں

مثال:

```sql
-- 022_add_combo_priority.sql
ALTER TABLE combos ADD COLUMN priority INTEGER DEFAULT 100;
UPDATE combos SET priority = 100 WHERE priority IS NULL;
CREATE INDEX IF NOT EXISTS idx_combos_priority ON combos(priority);
```

> **بیک ورڈز سے غیر مطابقت رکھنے والی تبدیلیاں** (مثلاً کالم حذف کرنا) پیچیدہ ہوتی ہیں۔ OmniRoute ڈاؤن گریڈ کی معاونت نہیں کرتا — ایک مرتبہ مائیگریشن لاگو ہو جائے تو اسکیما کی تبدیلی مستقل ہوتی ہے۔ اسی کے مطابق منصوبہ بندی کریں۔

---

## محفوظ شدہ ڈیٹا کی خفیہ کاری

حساس فیلڈز (API کیز، OAuth ٹوکنز، کنکشن اسٹرنگز) کو **AES-256-GCM** کے ذریعے محفوظ حالت میں خفیہ کیا جاتا ہے۔

### یہ کیسے کام کرتا ہے

```ts
// src/lib/db/encryption.ts (آسان کردہ)
const key = deriveKeyFromPassphrase(passphrase, salt);
const iv = randomBytes(12);
const cipher = createCipheriv("aes-256-gcm", key, iv);
const encrypted = Buffer.concat([cipher.update(plaintext), cipher.final()]);
const authTag = cipher.getAuthTag();
return { encrypted, iv, authTag };
```

### یہ کہاں استعمال ہوتا ہے

- `provider_connections.api_key` — ایپلیکیشن کی سطح پر خفیہ کردہ
- `provider_connections.access_token`، `refresh_token`، `id_token` — ایپلیکیشن کی سطح پر خفیہ کردہ
- `namespace = "secrets"` والی `key_value` انٹریز — ایپلیکیشن کی سطح پر خفیہ کردہ
- `proxy_registry.auth` — ایپلیکیشن کی سطح پر خفیہ کردہ (اگر موجود ہو)

### خفیہ کاری کی کلید

خفیہ کاری کی کلید ایک **پاس فریز** (`STORAGE_ENCRYPTION_KEY` env var کے ذریعے سیٹ کردہ) اور ایک **سالٹ** (DB میں محفوظ) سے اخذ کی جاتی ہے۔ ڈیٹا کو غیر خفیہ کرنے کے لیے دونوں درکار ہیں۔

```bash
# ایک محفوظ پاس فریز بنائیں
openssl rand -hex 32

# .env میں سیٹ کریں
STORAGE_ENCRYPTION_KEY=<your-key>
```

> **انتہائی اہم**: خفیہ کاری کی کلید کھو دینے کا مطلب تمام خفیہ کردہ ڈیٹا تک رسائی کھو دینا ہے۔ **کلید کا بیک اپ ڈیٹابیس سے الگ رکھیں**۔

### کیا خفیہ نہیں کیا جاتا

کارکردگی کی وجوہات کی بنا پر، درج ذیل کو سادہ متن میں محفوظ کیا جاتا ہے:

- پرووائیڈر کے ڈسپلے نام
- ماڈل کی تعریفیں (پہلے ہی عوامی ہیں)
- راؤٹنگ کے قواعد
- استعمال کے ریکارڈز (کوئی PII نہیں)

---

## انکرپشن سے متعلق احتیاطیں (v3.8.16+)

OmniRoute دو انکرپشن اسکیموں کو شفاف طریقے سے سنبھالنے کے لیے **`migrateLegacyEncryptedString()`** استعمال کرتا ہے:

- **Legacy** (v3.5.0 سے پہلے): XOR پر مبنی "انکرپشن" (حقیقی کرپٹوگرافی نہیں)
- **موجودہ**: مناسب IV اور auth tag کے ساتھ AES-256-GCM

مائیگریشن ہیلپر Legacy فارمیٹ کا پتہ لگاتا ہے اور پہلی بار پڑھنے پر نئے طریقے سے دوبارہ انکرپٹ کرتا ہے۔ اس کا مطلب ہے کہ آپ اسناد ضائع کیے بغیر پرانے ڈیٹابیس کو اپ گریڈ کر سکتے ہیں۔

---

## ریڈ کیش

کثرت سے پڑھے جانے والے ڈیٹا (ماڈلز، پرووائیڈرز، سیٹنگز) کے لیے، `readCache.ts` ایک **اِن میموری کیش** فراہم کرتا ہے:

```ts
// اسٹارٹ اپ پر کیش کیا جاتا ہے، لکھنے پر غیر مؤثر کر دیا جاتا ہے
const providers = await getCachedProviders(); // تیز، اِن میموری
const fresh = await listProviders(); // سست، DB تک رسائی کرتا ہے
```

| کیش شدہ اکائی          | کیش کلید       | TTL      |
| ---------------------- | -------------- | -------- |
| `models`               | `models:v1`    | لکھنے تک |
| `provider_connections` | `providers:v1` | لکھنے تک |
| `settings`             | `settings:v1`  | لکھنے تک |
| `combos`               | `combos:v1`    | لکھنے تک |

متعلقہ ٹیبل میں ہر بار لکھنے پر کیش غیر مؤثر کر دیا جاتا ہے۔

---

## بیک اپ اور بحالی

### دستی بیک اپ

```bash
# مقامی بیک اپ بنانے کے لیے CLI استعمال کریں
omniroute backup create --name pre-migration

# یا API کے ذریعے
curl -X PUT http://localhost:20128/api/db-backups \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

بیک اپ فائل میں یہ شامل ہوتا ہے:

- تمام DB ٹیبلز (JSON میں سیریلائز کیے گئے)
- کال لاگ آرٹیفیکٹس (base64-encoded، اختیاری)
- سیٹنگز + راز (انکرپٹ شدہ)
- پلگ اِن کنفیگریشن

### بحالی

```bash
# CLI کے ذریعے
omniroute restore pre-migration

# API کے ذریعے
curl -X POST http://localhost:20128/api/db-backups/restore \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

> **انتباہ**: بحالی پورے DB کو اوور رائٹ کر دیتی ہے۔ پہلے تمام کلائنٹس کو روکیں۔

### خودکار بیک اپس

```bash
# CLI کے ذریعے خودکار یومیہ بیک اپس فعال کریں
omniroute backup auto enable --cron "0 2 * * *" --retention 7
```

شیڈول سرور کی جانب سے ایک بیک گراؤنڈ جاب کے ذریعے چلایا جاتا ہے جو ہر 30 سیکنڈ
(ڈیفالٹ) بعد فعال ہوتی ہے اور مقامی سرور وقت کے مطابق cron ایکسپریشن کا جائزہ لیتی ہے۔

| متغیر                                       | ڈیفالٹ  | وضاحت                                                                                                                          |
| ------------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `OMNIROUTE_BACKUP_SCHEDULE_JOB_INTERVAL_MS` | `30000` | ملی سیکنڈز میں ٹِک وقفہ (کم از کم `5000`)۔ مماثل cron منٹ کے اندر قابلِ اعتماد طور پر آنے کے لیے 60 سیکنڈ سے کم ہونا ضروری ہے۔ |

### SQLite ہاٹ بیک اپ

چلتے ہوئے DB کا زیرو ڈاؤن ٹائم بیک اپ بنانے کے لیے:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".backup /backups/omniroute-hot.db"
```

یہ SQLite کا آن لائن بیک اپ API استعمال کرتا ہے — OmniRoute کے چلتے ہوئے اسے چلانا محفوظ ہے۔

---

## کارکردگی کی ٹیوننگ

### WAL موڈ

WAL بطور ڈیفالٹ فعال ہے۔ زیادہ تحریری بوجھ والے کاموں کے لیے، درج ذیل پر غور کریں:

```sql
PRAGMA wal_autocheckpoint = 1000;  -- ہر 1000 صفحات کے بعد چیک پوائنٹ
PRAGMA journal_size_limit = 67108864;  -- WAL کی حد 64MB
```

### انڈیکسز

کارکردگی کے لیے اہم انڈیکسز (مائیگریشنز کے ذریعے خودکار طور پر بنائے جاتے ہیں):

- `idx_models_provider` — فراہم کنندہ کے لحاظ سے ماڈل کی تلاش
- `idx_combo_targets_combo_id` — کومبو ہدف کی توسیع
- `idx_usage_history_api_key_timestamp` — استعمال کے تجزیات
- `idx_quota_snapshots_api_key_window` — کوٹے کی ٹریکنگ
- `idx_call_logs_timestamp` — کال لاگ کی کوئریز

نیا انڈیکس شامل کرنے کے لیے، ایک مائیگریشن بنائیں:

```sql
-- 023_add_my_index.sql
CREATE INDEX IF NOT EXISTS idx_my_table_my_column ON my_table(my_column);
```

### میموری-میپڈ I/O

بہت بڑے ڈیٹابیسز (>10GB) کے لیے، SQLite pragma کے ذریعے میموری میپنگ کو ایڈجسٹ کیا جا سکتا ہے:

```sql
-- SQLite pragma کے ذریعے سیٹ کریں (core.ts یا رن ٹائم میں ایڈجسٹ کریں)
PRAGMA mmap_size = 268435456;  -- 256MB
```

### کمپیکشن

طویل عرصے تک چلنے والی OmniRoute انسٹینسز کے لیے کبھی کبھار `VACUUM` مفید ہوتا ہے:

```bash
sqlite3 ~/.omniroute/storage.sqlite "VACUUM;"
```

کم ٹریفک والے اوقات میں اسے ماہانہ چلائیں۔ (WAL موڈ اس کی ضرورت کم کرتا ہے، لیکن اسے مکمل طور پر ختم نہیں کرتا۔)

---

## صحت کی جانچ

`src/lib/db/healthCheck.ts` **ڈیٹابیس کی سطح پر صحت کی تشخیص** فراہم کرتا ہے:

دونوں verbs کے لیے توثیق درکار ہے (بصورت دیگر `401`)۔ `GET` صرف تشخیص کرتا ہے؛ `POST` یہی جانچ `autoRepair` فعال کر کے چلاتا ہے۔

```bash
GET  /api/db/health   # تشخیص
POST /api/db/health   # تشخیص + مرمت
```

رسپانس `runDbHealthCheck()` کے ذریعے تیار کردہ `DbHealthCheckResult` ہے
(`src/lib/db/healthCheck.ts`):

```json
{
  "isHealthy": false,
  "issues": [
    {
      "type": "broken_reference",
      "table": "domain_budgets",
      "description": "ڈومین بجٹس نے ایسی API کیز کا حوالہ دیا جو اب موجود نہیں ہیں۔",
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

| فیلڈ              | مطلب                                                                                                                                                    |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `isHealthy`       | جب `issues` خالی ہو تو `true` ہوتا ہے۔ `driver` کبھی اس پر اثر انداز نہیں ہوتا۔                                                                         |
| `issues[].type`   | `integrity_check_failed`، `broken_reference`، `stale_snapshot`، `invalid_state` میں سے ایک۔                                                             |
| `repairedCount`   | اس رن کے دوران مرمت کی گئی قطاریں؛ جب `autoRepair` false ہو تو ہمیشہ `0`۔                                                                               |
| `backupCreated`   | آیا مرمت سے پہلے بیک اپ لیا گیا تھا۔                                                                                                                    |
| `checkedAt`       | رن اور اس کے ذریعے لکھی جانے والی کسی بھی مرمتی یادداشت کے لیے مشترکہ ISO ٹائم اسٹیمپ۔                                                                  |
| `driver.name`     | جانچے گئے ڈیٹابیس کو سروس فراہم کرنے والا SQLite ڈرائیور۔                                                                                               |
| `driver.degraded` | جب تحریریں ڈیٹابیس فائل کے ذریعے پائیدار طور پر محفوظ نہ ہوں تو `true` — `sql.js` WASM فال بیک (مکمل فائل کی پائیدار ذخیرہ کاری) یا اِن میموری ڈیٹابیس۔ |

یہی پے لوڈ `omniroute_db_health_check` MCP ٹول کے ذریعے بھی واپس کیا جاتا ہے۔

خرابی کا پتہ لگانے کے لیے `PRAGMA integrity_check` چلائیں:

```bash
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"
# اسے یہ پرنٹ کرنا چاہیے: ok
```

اگر یہ `ok` کے علاوہ کچھ بھی واپس کرے تو **فوری طور پر ڈیٹابیس کا استعمال روک دیں** اور بیک اپ سے بحال کریں۔

---

## ڈیزاسٹر ریکوری

### منظرنامہ 1: WAL فائل ضائع ہو گئی

`-wal` فائل موجود نہیں، لیکن `-shm` اور مرکزی DB محفوظ ہیں:

```bash
# اگلی بار کھولنے پر خودکار طور پر بحال ہو جاتا ہے
omniroute
```

اگر SQLite خودکار طور پر بحال نہ کر سکے:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".recover" > recovered.sql
sqlite3 recovered.db < recovered.sql
mv recovered.db ~/.omniroute/storage.sqlite
```

### منظرنامہ 2: مرکزی DB فائل خراب ہو گئی

بیک اپ سے بحال کریں:

```bash
omniroute sync pull --merge   # یا: omniroute backup restore <backup-id>
```

### منظرنامہ 3: انکرپشن کلید ضائع ہو گئی

کلید کے بغیر **بحالی ممکن نہیں ہے**۔ انکرپٹ شدہ فیلڈز ناقابلِ مطالعہ ہیں۔ تمام پرووائیڈرز کو نئی اسناد کے ساتھ دستی طور پر دوبارہ شامل کریں۔

> **تدارک**: انکرپشن کلید کا بیک اپ ہمیشہ الگ رکھیں، ترجیحاً کسی پاس ورڈ مینیجر یا KMS میں۔

### منظرنامہ 4: ڈسک بھر گئی

SQLite، `SQLITE_FULL` خرابیاں لوٹائے گا۔ ڈسک کی جگہ خالی کریں، پھر:

```bash
# جگہ خالی کرنے کے لیے WAL کو چیک پوائنٹ کریں
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA wal_checkpoint(TRUNCATE);"
```

---

## عام کارروائیاں

### ٹیبل کا معائنہ کریں

```bash
sqlite3 ~/.omniroute/storage.sqlite "SELECT * FROM api_keys LIMIT 5;"
```

### تمام ٹیبلز میں قطاریں شمار کریں

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';
EOF
```

### تمام ڈیٹا ری سیٹ (صاف) کریں

```bash
# پہلے OmniRoute کو روکیں
omniroute stop

# DB فائل حذف کریں
rm ~/.omniroute/storage.sqlite*

# دوبارہ شروع کریں (خالی DB دوبارہ تخلیق ہو جائے گا)
omniroute
```

**منتخب** ری سیٹ کے لیے (پرووائیڈرز برقرار رکھیں، استعمال کا ڈیٹا صاف کریں):

```bash
DELETE FROM usage_history WHERE timestamp < datetime('now', '-30 day');
DELETE FROM call_logs WHERE timestamp < datetime('now', '-30 day');
DELETE FROM proxy_logs WHERE timestamp < datetime('now', '-30 day');
```

### ایک ٹیبل ایکسپورٹ کریں

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
.mode csv
.output api_keys.csv
SELECT * FROM api_keys;
EOF
```

---

## خرابیوں کا ازالہ

### "ڈیٹابیس مقفل ہے"

کوئی دوسرا پراسیس رائٹ لاک برقرار رکھے ہوئے ہے۔ درج ذیل میں سے کوئی ایک طریقہ اختیار کریں:

- دوسرے پراسیس کے مکمل ہونے کا انتظار کریں (`lsof | grep storage.sqlite` سے جانچیں)
- دوسرے پراسیس کو ختم کریں
- اگر مسئلہ برقرار رہے تو OmniRoute کو دوبارہ شروع کریں

### "فارِن کلید کی پابندی ناکام ہو گئی"

کوئی ڈومین ماڈیول حوالہ جاتی سالمیت کی خلاف ورزی کر رہا ہے۔ درج ذیل کی جانچ کریں:

- منحصر ٹیبلز میں یتیم قطاریں
- سلسلہ وار حذف جو آگے منتقل نہیں ہوئے
- حالیہ مائیگریشن جس نے فارِن کلید تبدیل کی ہو

خلاف ورزیاں تلاش کرنے کے لیے `PRAGMA foreign_key_check;` چلائیں۔

### "میموری ختم ہو گئی"

SQLite کا میموری میپڈ I/O، OS کی حد سے تجاوز کر رہا ہے۔ SQLite pragma کے ذریعے اسے کم کریں:

```sql
PRAGMA mmap_size = 134217728;  -- 256MB کی بجائے 128MB
```

یا غیر فعال کریں:

```sql
PRAGMA mmap_size = 0;
```

### "مائیگریشن درمیان میں ناکام ہو گئی"

مائیگریشن ایک ٹرانزیکشن میں چلی تھی، اس لیے اسے رول بیک ہو جانا چاہیے تھا۔ اگر ایسا نہ ہوا ہو:

1. **OmniRoute کو روکیں** (مزید کوششوں کو روکنے کے لیے)
2. `sqlite3` کے ذریعے **DB کی حالت جانچیں**
3. جزوی مائیگریشن کو **دستی طور پر درست کریں**
4. OmniRoute کو **دوبارہ چلائیں** (مائیگریشن کی دوبارہ کوشش کی جائے گی)

اس سے بچنے کے لیے، مائیگریشنز کو ہمیشہ پہلے کسی نقل پر آزمائیں۔

---

## مزید دیکھیں

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — استعمال کے ٹیبلز
- [MONITORING_GUIDE.md](./MONITORING_GUIDE.md) — صحت کی نگرانی
- [RELEASE_CHECKLIST.md](./RELEASE_CHECKLIST.md) — ریلیز کا بہاؤ
- ماخذ: `src/lib/db/` (80+ فائلیں، ~25K LOC)
