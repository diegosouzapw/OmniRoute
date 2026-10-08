# Database Schema & Operations Guide (العربية)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/DATABASE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/DATABASE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/DATABASE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/DATABASE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/DATABASE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/DATABASE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/DATABASE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/DATABASE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/DATABASE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/DATABASE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/DATABASE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/DATABASE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/DATABASE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/DATABASE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/DATABASE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/DATABASE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/DATABASE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/DATABASE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/DATABASE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/DATABASE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/DATABASE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/DATABASE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/DATABASE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/DATABASE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/DATABASE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/DATABASE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/DATABASE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/DATABASE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/DATABASE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/DATABASE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/DATABASE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/DATABASE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/DATABASE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/DATABASE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/DATABASE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/DATABASE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/DATABASE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/DATABASE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/DATABASE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/DATABASE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/DATABASE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/DATABASE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/DATABASE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/DATABASE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/DATABASE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/DATABASE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/DATABASE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/DATABASE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/DATABASE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/DATABASE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/DATABASE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/DATABASE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/DATABASE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/DATABASE_GUIDE.md)

---

> **باختصار**: يستخدم OmniRoute قاعدة **SQLite مع تسجيل WAL** كمخزن أساسي، مع تشفير **AES-256-GCM** للحقول الحساسة في أثناء التخزين. يغطي هذا الدليل المخطط، وعمليات الترحيل، والنسخ الاحتياطي/الاسترداد، وأدلة التشغيل.

**المصادر:**

- `src/lib/db/core.ts` — نسخة مفردة + SCHEMA_SQL ‏(17 جدولًا أساسيًا)
- `src/lib/db/migrationRunner.ts` — عمليات ترحيل ذات إصدارات
- `src/lib/db/migrations/` — 167 ملف SQL ذا إصدار
- `src/lib/db/encryption.ts` — دوال مساعدة للتشفير
- `src/lib/db/backup.ts` — تصدير/استيراد النسخ الاحتياطية
- `src/lib/db/healthCheck.ts` — تشخيصات السلامة

---

## لماذا SQLite؟

اختار OmniRoute قاعدة SQLite بدلًا من PostgreSQL/MySQL لعدة أسباب:

| العامل              | SQLite                             | PostgreSQL                            |
| ------------------- | ---------------------------------- | ------------------------------------- |
| **النشر**           | مضمّنة — لا تتطلب خادمًا منفصلًا   | تتطلب إعداد خادم                      |
| **التشفير**         | على مستوى التطبيق (AES-256-GCM)    | تشفير TDE مدمج                        |
| **الأداء**          | أسرع لأحمال العمل الصغيرة/المتوسطة | أفضل لعمليات الكتابة المتزامنة الضخمة |
| **التزامن**         | يسمح وضع WAL بعمليات قراءة متزامنة | دعم MVCC كامل                         |
| **النسخ الاحتياطي** | نسخ ملف واحد                       | `pg_dump` أو لقطة لنظام الملفات       |
| **حالة الاستخدام**  | تثبيت لكل مستخدم، ومضمّنة          | خدمة SaaS متعددة المستأجرين           |

بالنسبة إلى عمليات النشر ذات **المستخدم الواحد والنسخة الواحدة** (حالة الاستخدام الأساسية لـ OmniRoute)، تكون SQLite أبسط وأسرع.

### تسجيل WAL

يفتح `core.ts` قاعدة البيانات باستخدام **وضع WAL (التسجيل المسبق للكتابة)**:

```ts
// src/lib/db/core.ts
db.pragma("journal_mode = WAL");
db.pragma("busy_timeout = 2000");
db.pragma("synchronous = NORMAL");
db.pragma(`cache_size = -${DEFAULT_DATABASE_SETTINGS.optimization.cacheSize}`);
```

يسمح WAL بإجراء **عمليات قراءة متزامنة** في أثناء عمليات الكتابة — وهذا مهم للوحة المعلومات التي تُجري الاستعلامات في أثناء تسجيل الطلبات.

الحجم الافتراضي لذاكرة التخزين المؤقت هو **65,536 KiB (64 MiB)**. تفسّر SQLite قيمة
`cache_size` السالبة بوصفها حدًا أعلى تقريبيًا بوحدة KiB، وتخصص الصفحات عند الطلب.
يقبل إعداد **الإعدادات > النظام والتخزين > حجم ذاكرة التخزين المؤقت** قيمًا صحيحة من **1 إلى
1,000,000 KiB**؛ ويؤدي حفظ الإعداد إلى تطبيقه على اتصال قاعدة البيانات النشط،
كما يستعيد OmniRoute القيمة المحفوظة عند بدء التشغيل.

---

## موقع قاعدة البيانات

يُخزَّن ملف SQLite في:

| نظام التشغيل | المسار                                                   |
| ------------ | -------------------------------------------------------- |
| Linux        | `~/.omniroute/storage.sqlite`                            |
| macOS        | `~/.omniroute/storage.sqlite`                            |
| Windows      | `%USERPROFILE%\.omniroute\storage.sqlite`                |
| Docker       | `/app/data/storage.sqlite` (قابل للتهيئة عبر `DATA_DIR`) |

الملفات المصاحبة:

- `storage.sqlite-wal` — سجل الكتابة المسبقة
- `storage.sqlite-shm` — ملف الذاكرة المشتركة
- `call_logs/` — عناصر حمولات الطلبات (إذا كانت مفعّلة)

**لتجاوز الموقع:**

```bash
DATA_DIR=/custom/path omniroute
```

---

## بنية وحدات النطاق

تحتوي قاعدة بيانات OmniRoute على **110 وحدة TypeScript من المستوى الأعلى** في `src/lib/db/`. كل وحدة نطاق:

- تمتلك جدولًا محددًا واحدًا أو أكثر
- تصدّر دوال CRUD محددة الأنواع
- لا تتعامل مطلقًا مع جداول وحدة أخرى
- تستخدم `getDbInstance()` من `core.ts` للوصول إلى قاعدة البيانات

### وحدات قاعدة البيانات الـ 110 من المستوى الأعلى

يحتوي OmniRoute على **110 ملفات TypeScript من المستوى الأعلى** في `src/lib/db/`. فيما يلي عينة من الوحدات الأساسية؛ راجع قائمة محتويات الدليل للاطلاع على القائمة الكاملة:

| الوحدة                  | الجداول                                                        | المسؤولية                                                               |
| ----------------------- | -------------------------------------------------------------- | ----------------------------------------------------------------------- |
| `providers.ts`          | `provider_connections`                                         | تسجيل موفّري OAuth/API key وبيانات الاعتماد                             |
| `models.ts`             | `key_value` (بيانات النماذج)                                   | تعريفات النماذج وإمكاناتها وتسعيرها                                     |
| `combos.ts`             | `combos`                                                       | إعدادات توجيه التركيبات وترتيبها                                        |
| `apiKeys.ts`            | `api_keys`                                                     | دورة حياة مفاتيح API والنطاقات وتتبع الحصص                              |
| `settings.ts`           | `key_value`, `api_keys`, `combos`                              | إعدادات النظام ومخزن KV المشترك                                         |
| `backup.ts`             | —                                                              | عمليات تصدير النسخ الاحتياطية واستيرادها                                |
| `proxies.ts`            | `proxy_registry`, `proxy_assignments`, `provider_connections`  | إعدادات الوكيل وقواعد التوجيه                                           |
| `prompts.ts`            | `prompt_templates`                                             | قوالب المطالبات القابلة لإعادة الاستخدام وإدارة إصداراتها               |
| `webhooks.ts`           | `webhooks`                                                     | اشتراكات webhook المستندة إلى الأحداث وسجلاتها                          |
| `detailedLogs.ts`       | `request_detail_logs`                                          | تسجيل تدقيق لكل طلب (اختياري، مرتفع الحجم)                              |
| `domainState.ts`        | `domain_*` (5 جداول)                                           | ميزانيات النطاق وقواطع الدائرة وعمليات القفل وسلاسل الرجوع وسجل التكلفة |
| `registeredKeys.ts`     | `registered_keys`, `account_key_limits`, `provider_key_limits` | مفاتيح API المدرجة في القائمة البيضاء لـ MCP/A2A                        |
| `quotaSnapshots.ts`     | `quota_snapshots`                                              | سجل استخدام الحصص                                                       |
| `modelComboMappings.ts` | `model_combo_mappings`                                         | ربط النماذج بالتركيبات الافتراضية                                       |
| `cliToolState.ts`       | `cli_tool_state`                                               | حالة دائمة خاصة بواجهة CLI                                              |
| `encryption.ts`         | —                                                              | أدوات مساعدة لتشفير الحقول وفك تشفيرها                                  |
| `readCache.ts`          | —                                                              | ذاكرة تخزين مؤقت داخل الذاكرة للعمليات كثيفة القراءة                    |
| `secrets.ts`            | `key_value` (إدخالات مشفرة)                                    | تخزين الأسرار المشفرة                                                   |
| `stateReset.ts`         | —                                                              | مسح حالة قاعدة البيانات أو إعادة ضبطها للاختبار                         |
| `contextHandoffs.ts`    | `context_handoffs`                                             | سياق الجلسة لتسليم الوكيل                                               |
| `usage*.ts`             | `usage_history`, `call_logs`, `proxy_logs`                     | تتبع الاستخدام                                                          |
| `compression*.ts`       | `compression_settings`, `compression_combos`                   | إعدادات الضغط                                                           |

### حدود الوحدات

قاعدة معمارية أساسية: **لا تصل الوحدات مباشرةً إلى جداول بعضها بعضًا**. للتعامل مع بيانات وحدة أخرى، استورد الدالة من تلك الوحدة.

```ts
// ❌ خطأ: استعلام SQL مباشر من وحدة أخرى
db.prepare("SELECT * FROM provider_connections").all();

// ✅ صحيح: استخدم دالة وحدة الموفّرين
import { listProviders } from "@/lib/db/providers";
const providers = await listProviders();
```

تُفرض هذه القاعدة من خلال مراجعة الشيفرة — لا يوجد فحص ثابت، لكن تُعلَّم المخالفات.

---

## المخطط الأساسي (17 جدولًا)

يعرّف `core.ts` الجداول الأساسية السبعة عشر في `SCHEMA_SQL`. تُنشأ هذه الجداول بواسطة الترحيل `001_initial_schema.sql` وتشكّل المخطط الأساسي.

### الجداول الأساسية (المنشأة في الترحيل الأولي)

| الجدول                     | الغرض                              | الأعمدة الرئيسية                                                        |
| -------------------------- | ---------------------------------- | ----------------------------------------------------------------------- |
| `provider_connections`     | بيانات اعتماد المزوّد (مشفّرة)     | `id`, `provider`, `auth_type`, `api_key`, `is_active`                   |
| `provider_nodes`           | معلومات توجيه عقدة المزوّد         | `id`, `type`, `name`, `base_url`, `created_at`                          |
| `key_value`                | مخزن عام لأزواج المفتاح والقيمة    | `namespace`, `key`, `value`                                             |
| `combos`                   | تعريفات مجموعات التوجيه            | `id`, `name`, `data`, `sort_order`                                      |
| `api_keys`                 | مفاتيح API للبوابة                 | `id`, `name`, `key`, `machine_id`, `allowed_models`                     |
| `db_meta`                  | بيانات تعريف قاعدة البيانات        | `key`, `value`                                                          |
| `usage_history`            | سجلات استخدام الطلبات              | `id`, `provider`, `model`, `tokens_input`, `tokens_output`, `timestamp` |
| `call_logs`                | حمولات الطلبات والاستجابات         | `id`, `timestamp`, `status`, `model`, `provider`, `latency_ms`          |
| `proxy_logs`               | سجلات طلبات الوكيل                 | `id`, `timestamp`, `proxy_type`, `status`, `provider`                   |
| `domain_fallback_chains`   | سلاسل ربط النماذج بالمزوّدين       | `model`, `chain`                                                        |
| `domain_budgets`           | ميزانيات الإنفاق لكل نطاق          | `api_key_id`, `daily_limit_usd`, `warning_threshold`, `reset_interval`  |
| `domain_budget_reset_logs` | سجل إعادة تعيين الميزانيات         | `id`, `api_key_id`, `reset_interval`, `previous_spend`, `reset_at`      |
| `domain_cost_history`      | تتبّع التكلفة لكل نطاق             | `id`, `api_key_id`, `cost`, `timestamp`                                 |
| `domain_lockout_state`     | حالة تحديد المعدّل للنطاق          | `identifier`, `attempts`, `locked_until`                                |
| `domain_circuit_breakers`  | حالة قاطع الدائرة لكل نطاق         | `name`, `state`, `failure_count`, `last_failure_time`                   |
| `semantic_cache`           | ذاكرة التخزين المؤقت لاستجابات LLM | `id`, `signature`, `model`, `prompt_hash`, `response`                   |
| `quota_snapshots`          | لقطات سجلية للحصص                  | `id`, `provider`, `connection_id`, `window_key`, `remaining_percentage` |

### الجداول الإضافية (المضافة بواسطة عمليات ترحيل لاحقة)

تضيف عمليات الترحيل اللاحقة جداول مثل:

- `cli_tool_state` (الترحيل 011) — حالة أداة CLI
- جداول `mcp_*` — تدقيق خادم MCP
- جداول `a2a_*` — حالة مهمة A2A
- جداول `usage_*` — تتبّع الاستخدام
- جداول `plugin_*` — نظام المكوّنات الإضافية
- `skill_executions` — سجل تنفيذ المهارات
- جداول `memory_*` — نظام الذاكرة
- جداول `compression_*` — نظام الضغط
- جداول `webhook_*` — سجل تسليم خطافات الويب
- جداول `acp_*` — بروتوكول عميل الوكيل
- جداول `oneproxy_*` — سوق 1proxy
- `proxy_assignments` — ارتباطات نطاق الوكيل
- `detailed_call_artifacts` — بيانات تعريف عناصر سجل الاستدعاءات
- `quota_alert_history` — تدقيق تنبيهات الحصص
- `command_code_auth_sessions` — جلسات OAuth الخاصة بـ Command Code

توجد القائمة الكاملة التي تضم أكثر من 30 جدولًا تقريبًا في `src/lib/db/migrations/`.

---

## عمليات الترحيل

يستخدم OmniRoute **عمليات ترحيل ذات إصدارات محددة وقابلة للتكرار بأمان** في `src/lib/db/migrations/`. كل عملية ترحيل عبارة عن ملف SQL واحد باسم `NNN_description.sql`.

### تسمية عمليات الترحيل

```
001_initial_schema.sql
002_mcp_a2a_tables.sql
003_provider_node_custom_paths.sql
...
021_combo_call_log_targets.sql
```

### كيفية تشغيل عمليات الترحيل

عند بدء التشغيل، ينفّذ `migrationRunner.ts` ما يلي:

1. ينشئ جدول `_omniroute_migrations` إذا لم يكن موجودًا
2. يستعلم عن عمليات الترحيل التي طُبّقت بالفعل
3. يطبّق أي عمليات ترحيل جديدة بالترتيب، كل منها ضمن معاملة
4. يسجّل كل عملية ترحيل مطبّقة مع الطابع الزمني

```ts
// src/lib/db/migrationRunner.ts (مبسّط)
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

### قابلية التكرار الآمن

يجب أن تكون عمليات الترحيل **قابلة للتكرار بأمان** — أي إن تشغيلها مرتين يجب ألا يُحدث أي تأثير إضافي:

```sql
-- 004_proxy_registry.sql
CREATE TABLE IF NOT EXISTS proxy_registry (
  id TEXT PRIMARY KEY,
  host TEXT NOT NULL,
  port INTEGER NOT NULL,
  ...
);
```

استخدم عبارات `IF NOT EXISTS` و`IF EXISTS` و`OR IGNORE` / `OR REPLACE` بحرية.

### إضافة عملية ترحيل جديدة

1. **حدّد الرقم التالي**: `ls src/lib/db/migrations/ | tail -1`
2. **أنشئ الملف**: `NNN_my_change.sql`
3. **استخدم DDL آمنًا**: `CREATE TABLE IF NOT EXISTS`، و`ALTER TABLE ... ADD COLUMN`
4. **املأ البيانات السابقة بعناية**: استخدم `UPDATE ... WHERE ...` للتعامل مع الصفوف الموجودة
5. **اختبر على نسخة**: لا تشغّل أبدًا عمليات ترحيل غير مختبرة على بيئة الإنتاج

مثال:

```sql
-- 022_add_combo_priority.sql
ALTER TABLE combos ADD COLUMN priority INTEGER DEFAULT 100;
UPDATE combos SET priority = 100 WHERE priority IS NULL;
CREATE INDEX IF NOT EXISTS idx_combos_priority ON combos(priority);
```

> **التغييرات غير المتوافقة مع الإصدارات السابقة** (مثل حذف الأعمدة) معقدة. لا يدعم OmniRoute الرجوع إلى إصدار أقدم — فبمجرد تطبيق عملية ترحيل، يصبح تغيير المخطط دائمًا. خطّط وفقًا لذلك.

---

## التشفير في حالة السكون

تُشفّر الحقول الحساسة (مفاتيح API، ورموز OAuth، وسلاسل الاتصال) في حالة السكون باستخدام **AES-256-GCM**.

### كيفية عمله

```ts
// src/lib/db/encryption.ts (مبسّط)
const key = deriveKeyFromPassphrase(passphrase, salt);
const iv = randomBytes(12);
const cipher = createCipheriv("aes-256-gcm", key, iv);
const encrypted = Buffer.concat([cipher.update(plaintext), cipher.final()]);
const authTag = cipher.getAuthTag();
return { encrypted, iv, authTag };
```

### مواضع استخدامه

- `provider_connections.api_key` — مشفّر على مستوى التطبيق
- `provider_connections.access_token`، و`refresh_token`، و`id_token` — مشفّرة على مستوى التطبيق
- إدخالات `key_value` التي تحتوي على `namespace = "secrets"` — مشفّرة على مستوى التطبيق
- `proxy_registry.auth` — مشفّر على مستوى التطبيق (إن وُجد)

### مفتاح التشفير

يُشتق مفتاح التشفير من **عبارة مرور** (تُعيّن عبر متغير البيئة `STORAGE_ENCRYPTION_KEY`) و**قيمة salt** (تُخزّن في قاعدة البيانات). كلاهما مطلوب لفك تشفير البيانات.

```bash
# أنشئ عبارة مرور آمنة
openssl rand -hex 32

# عيّنها في .env
STORAGE_ENCRYPTION_KEY=<your-key>
```

> **مهم للغاية**: فقدان مفتاح التشفير يعني فقدان إمكانية الوصول إلى جميع البيانات المشفّرة. **احتفظ بنسخة احتياطية من المفتاح بشكل منفصل عن قاعدة البيانات**.

### البيانات غير المشفّرة

لأسباب تتعلق بالأداء، تُخزّن البيانات التالية بنص صريح:

- أسماء العرض الخاصة بمزوّدي الخدمة
- تعريفات النماذج (متاحة للعامة بالفعل)
- قواعد التوجيه
- سجلات الاستخدام (لا تحتوي على معلومات تعريف شخصية)

---

## محاذير التشفير (v3.8.16+)

يستخدم OmniRoute الدالة **`migrateLegacyEncryptedString()`** للتعامل بشفافية مع نظامي تشفير:

- **القديم** (قبل v3.5.0): «تشفير» قائم على XOR (ليس تشفيرًا حقيقيًا)
- **الحالي**: AES-256-GCM مع IV مناسب ووسم مصادقة

تكتشف أداة الترحيل المساعدة التنسيق القديم وتعيد تشفيره باستخدام النظام الجديد عند القراءة الأولى. وهذا يعني أنه يمكنك ترقية قاعدة بيانات قديمة دون فقدان بيانات الاعتماد.

---

## ذاكرة التخزين المؤقت للقراءة

بالنسبة إلى البيانات التي تُقرأ بشكل متكرر (النماذج، والموفّرون، والإعدادات)، يوفّر `readCache.ts` **ذاكرة تخزين مؤقت داخل الذاكرة**:

```ts
// تُخزَّن مؤقتًا عند بدء التشغيل، وتُبطَل عند الكتابة
const providers = await getCachedProviders(); // سريع، داخل الذاكرة
const fresh = await listProviders(); // بطيء، يصل إلى قاعدة البيانات
```

| الكيان المخزَّن مؤقتًا | مفتاح ذاكرة التخزين المؤقت | TTL            |
| ---------------------- | -------------------------- | -------------- |
| `models`               | `models:v1`                | حتى حدوث كتابة |
| `provider_connections` | `providers:v1`             | حتى حدوث كتابة |
| `settings`             | `settings:v1`              | حتى حدوث كتابة |
| `combos`               | `combos:v1`                | حتى حدوث كتابة |

تُبطَل ذاكرة التخزين المؤقت عند كل عملية كتابة إلى الجدول المقابل.

---

## النسخ الاحتياطي والاسترداد

### النسخ الاحتياطي اليدوي

```bash
# استخدم CLI لإنشاء نسخة احتياطية محلية
omniroute backup create --name pre-migration

# أو عبر API
curl -X PUT http://localhost:20128/api/db-backups \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

يتضمن ملف النسخة الاحتياطية ما يلي:

- جميع جداول قاعدة البيانات (مُسلسلة إلى JSON)
- عناصر سجل الاستدعاءات (مُرمَّزة باستخدام base64، اختيارية)
- الإعدادات + الأسرار (مشفّرة)
- إعدادات المكوّنات الإضافية

### الاستعادة

```bash
# عبر CLI
omniroute restore pre-migration

# عبر API
curl -X POST http://localhost:20128/api/db-backups/restore \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

> **تحذير**: تؤدي الاستعادة إلى استبدال قاعدة البيانات بالكامل. أوقف جميع العملاء أولًا.

### النسخ الاحتياطية التلقائية

```bash
# فعّل النسخ الاحتياطية اليومية التلقائية عبر CLI
omniroute backup auto enable --cron "0 2 * * *" --retention 7
```

يُنفَّذ الجدول الزمني من جانب الخادم بواسطة مهمة تعمل في الخلفية كل 30 ثانية
(افتراضيًا) وتقيّم تعبير cron وفقًا للتوقيت المحلي للخادم.

| المتغير                                     | القيمة الافتراضية | الوصف                                                                                                                        |
| ------------------------------------------- | ----------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_BACKUP_SCHEDULE_JOB_INTERVAL_MS` | `30000`           | الفاصل الزمني للتكرار بالمللي ثانية (الحد الأدنى `5000`). يجب أن يكون أقصر من 60 ثانية لضمان الوقوع ضمن دقيقة cron المطابقة. |

### النسخ الاحتياطي الفوري لـ SQLite

لإنشاء نسخة احتياطية من قاعدة بيانات قيد التشغيل دون توقف:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".backup /backups/omniroute-hot.db"
```

يستخدم هذا واجهة API للنسخ الاحتياطي عبر الإنترنت في SQLite — ويمكن تشغيله بأمان أثناء تشغيل OmniRoute.

---

## ضبط الأداء

### وضع WAL

يكون WAL مفعّلًا افتراضيًا. بالنسبة إلى أعباء العمل كثيفة الكتابة، ضع في اعتبارك ما يلي:

```sql
PRAGMA wal_autocheckpoint = 1000;  -- إنشاء نقطة تحقق كل 1000 صفحة
PRAGMA journal_size_limit = 67108864;  -- حد أقصى لـ WAL يبلغ 64MB
```

### الفهارس

الفهارس الرئيسية لتحسين الأداء (تُنشأ تلقائيًا بواسطة عمليات الترحيل):

- `idx_models_provider` — البحث عن النماذج حسب المزوّد
- `idx_combo_targets_combo_id` — توسيع أهداف المجموعة
- `idx_usage_history_api_key_timestamp` — تحليلات الاستخدام
- `idx_quota_snapshots_api_key_window` — تتبّع الحصص
- `idx_call_logs_timestamp` — استعلامات سجل الاستدعاءات

لإضافة فهرس جديد، أنشئ عملية ترحيل:

```sql
-- 023_add_my_index.sql
CREATE INDEX IF NOT EXISTS idx_my_table_my_column ON my_table(my_column);
```

### الإدخال/الإخراج المعيّن في الذاكرة

بالنسبة إلى قواعد البيانات الكبيرة جدًا (>10GB)، يمكن ضبط تعيين الذاكرة عبر توجيه SQLite:

```sql
-- الضبط عبر توجيه SQLite (عدّله في core.ts أو أثناء التشغيل)
PRAGMA mmap_size = 268435456;  -- 256MB
```

### الضغط

تستفيد مثيلات OmniRoute التي تعمل لفترات طويلة من تنفيذ `VACUUM` من حين لآخر:

```bash
sqlite3 ~/.omniroute/storage.sqlite "VACUUM;"
```

شغّله شهريًا خلال فترات انخفاض حركة المرور. (يقلّل وضع WAL الحاجة إلى ذلك، لكنه لا يلغيها.)

---

## فحص السلامة

يوفّر `src/lib/db/healthCheck.ts` **تشخيصات السلامة على مستوى قاعدة البيانات**:

يتطلب كلا الفعلين المصادقة (`401` بخلاف ذلك). يقوم `GET` بالتشخيص فقط؛ بينما يشغّل `POST`
الفحص نفسه مع تفعيل `autoRepair`.

```bash
GET  /api/db/health   # تشخيص
POST /api/db/health   # تشخيص + إصلاح
```

تكون الاستجابة هي `DbHealthCheckResult` التي تنتجها `runDbHealthCheck()`
(`src/lib/db/healthCheck.ts`):

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

| الحقل             | المعنى                                                                                                                                                                                            |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `isHealthy`       | تكون القيمة `true` عندما تكون `issues` فارغة. ولا تؤثر `driver` فيها أبدًا.                                                                                                                       |
| `issues[].type`   | إحدى القيم `integrity_check_failed` أو `broken_reference` أو `stale_snapshot` أو `invalid_state`.                                                                                                 |
| `repairedCount`   | عدد الصفوف التي أُصلحت خلال هذا التشغيل؛ وتكون دائمًا `0` عندما تكون `autoRepair` بالقيمة `false`.                                                                                                |
| `backupCreated`   | ما إذا أُنشئت نسخة احتياطية قبل الإصلاح.                                                                                                                                                          |
| `checkedAt`       | طابع زمني بتنسيق ISO مشترك بين التشغيل وأي ملاحظة إصلاح يكتبها.                                                                                                                                   |
| `driver.name`     | برنامج تشغيل SQLite الذي يخدم قاعدة البيانات المفحوصة.                                                                                                                                            |
| `driver.degraded` | تكون القيمة `true` عندما لا تكون عمليات الكتابة مدعومة بشكل دائم بواسطة ملف قاعدة البيانات — أي عند استخدام بديل WASM المتمثل في `sql.js` (استمرارية الملف بالكامل) أو قاعدة بيانات داخل الذاكرة. |

تعيد أداة MCP المسماة `omniroute_db_health_check` الحمولة نفسها.

شغّل `PRAGMA integrity_check` لاكتشاف التلف:

```bash
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"
# ينبغي أن يطبع: ok
```

إذا أعاد أي شيء بخلاف `ok`، **فتوقّف عن استخدام قاعدة البيانات فورًا** واستعدها من نسخة احتياطية.

---

## التعافي من الكوارث

### السيناريو 1: فقدان ملف WAL

ملف `-wal` مفقود، لكن ملف `-shm` وقاعدة البيانات الرئيسية سليمان:

```bash
# يتم الاسترداد تلقائيًا عند الفتح التالي
omniroute
```

إذا تعذّر على SQLite إجراء الاسترداد تلقائيًا:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".recover" > recovered.sql
sqlite3 recovered.db < recovered.sql
mv recovered.db ~/.omniroute/storage.sqlite
```

### السيناريو 2: تلف ملف قاعدة البيانات الرئيسية

استعده من نسخة احتياطية:

```bash
omniroute sync pull --merge   # أو: omniroute backup restore <backup-id>
```

### السيناريو 3: فقدان مفتاح التشفير

**لا يمكن الاسترداد** دون المفتاح. ستكون الحقول المشفرة غير قابلة للقراءة. أعد إضافة جميع المزوّدين يدويًا باستخدام بيانات اعتماد جديدة.

> **إجراء وقائي**: احتفظ دائمًا بنسخة احتياطية منفصلة من مفتاح التشفير، ويُفضّل أن تكون في مدير كلمات مرور أو KMS.

### السيناريو 4: امتلاء القرص

سيُرجع SQLite أخطاء `SQLITE_FULL`. حرّر بعض مساحة القرص، ثم نفّذ:

```bash
# إنشاء نقطة تحقق لـ WAL لتحرير مساحة
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA wal_checkpoint(TRUNCATE);"
```

---

## العمليات الشائعة

### فحص جدول

```bash
sqlite3 ~/.omniroute/storage.sqlite "SELECT * FROM api_keys LIMIT 5;"
```

### حساب عدد الصفوف في جميع الجداول

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';
EOF
```

### إعادة تعيين جميع البيانات (مسحها)

```bash
# أوقف OmniRoute أولًا
omniroute stop

# احذف ملف قاعدة البيانات
rm ~/.omniroute/storage.sqlite*

# أعد التشغيل (ستُعاد إنشاء قاعدة بيانات فارغة)
omniroute
```

لإجراء إعادة تعيين **انتقائية** (الاحتفاظ بالمزوّدين ومسح بيانات الاستخدام):

```bash
DELETE FROM usage_history WHERE timestamp < datetime('now', '-30 day');
DELETE FROM call_logs WHERE timestamp < datetime('now', '-30 day');
DELETE FROM proxy_logs WHERE timestamp < datetime('now', '-30 day');
```

### تصدير جدول واحد

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
.mode csv
.output api_keys.csv
SELECT * FROM api_keys;
EOF
```

---

## استكشاف الأخطاء وإصلاحها

### "قاعدة البيانات مقفلة"

هناك عملية أخرى تحتفظ بقفل كتابة. يمكنك:

- الانتظار حتى تنتهي العملية الأخرى (تحقق باستخدام `lsof | grep storage.sqlite`)
- إنهاء العملية الأخرى
- إعادة تشغيل OmniRoute إذا استمرت المشكلة

### "فشل قيد المفتاح الخارجي"

تنتهك إحدى وحدات النطاق التكامل المرجعي. تحقق من:

- الصفوف اليتيمة في الجداول التابعة
- عمليات الحذف المتتالية التي لم تنتشر
- عملية ترحيل حديثة غيّرت مفتاحًا خارجيًا

شغّل `PRAGMA foreign_key_check;` للعثور على الانتهاكات.

### "نفاد الذاكرة"

تتجاوز عمليات الإدخال/الإخراج المعينة إلى الذاكرة في SQLite حد نظام التشغيل. قلّلها باستخدام تعليمة pragma في SQLite:

```sql
PRAGMA mmap_size = 134217728;  -- ‏128MB بدلًا من 256MB
```

أو عطّلها:

```sql
PRAGMA mmap_size = 0;
```

### "فشل الترحيل في منتصف العملية"

نُفّذ الترحيل ضمن معاملة، لذا يُفترض أن يكون قد تم التراجع عنه. إذا لم يحدث ذلك:

1. **أوقف OmniRoute** (لمنع المزيد من المحاولات)
2. **تحقق من حالة قاعدة البيانات** باستخدام `sqlite3`
3. **أصلح يدويًا** الترحيل الجزئي
4. **أعد تشغيل** OmniRoute (ستُعاد محاولة الترحيل)

لمنع حدوث ذلك، اختبر عمليات الترحيل دائمًا على نسخة أولًا.

---

## انظر أيضًا

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — جداول الاستخدام
- [MONITORING_GUIDE.md](./MONITORING_GUIDE.md) — مراقبة السلامة
- [RELEASE_CHECKLIST.md](./RELEASE_CHECKLIST.md) — مسار الإصدار
- المصدر: `src/lib/db/` (أكثر من 80 ملفًا، ونحو 25 ألف سطر برمجي)
