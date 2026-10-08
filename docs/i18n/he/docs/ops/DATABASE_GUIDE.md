# Database Schema & Operations Guide (עברית)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/DATABASE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/DATABASE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/DATABASE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/DATABASE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/DATABASE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/DATABASE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/DATABASE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/DATABASE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/DATABASE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/DATABASE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/DATABASE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/DATABASE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/DATABASE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/DATABASE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/DATABASE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/DATABASE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/DATABASE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/DATABASE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/DATABASE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/DATABASE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/DATABASE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/DATABASE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/DATABASE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/DATABASE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/DATABASE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/DATABASE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/DATABASE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/DATABASE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/DATABASE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/DATABASE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/DATABASE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/DATABASE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/DATABASE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/DATABASE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/DATABASE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/DATABASE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/DATABASE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/DATABASE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/DATABASE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/DATABASE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/DATABASE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/DATABASE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/DATABASE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/DATABASE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/DATABASE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/DATABASE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/DATABASE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/DATABASE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/DATABASE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/DATABASE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/DATABASE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/DATABASE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/DATABASE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/DATABASE_GUIDE.md)

---

> **בקצרה**: OmniRoute משתמש ב-**SQLite עם יומן WAL** כמאגר הראשי שלו, עם הצפנת **AES-256-GCM** במנוחה עבור שדות רגישים. מדריך זה עוסק בסכימה, בהעברות גרסה, בגיבוי/שחזור ובנוהלי תפעול.

**מקורות:**

- `src/lib/db/core.ts` — מופע יחיד + SCHEMA_SQL (‏17 טבלאות בסיס)
- `src/lib/db/migrationRunner.ts` — העברות גרסה ממוספרות
- `src/lib/db/migrations/` — 167 קובצי SQL ממוספרים
- `src/lib/db/encryption.ts` — פונקציות עזר להצפנה
- `src/lib/db/backup.ts` — ייצוא/ייבוא גיבויים
- `src/lib/db/healthCheck.ts` — אבחון תקינות

---

## למה SQLite?

OmniRoute בחר ב-SQLite במקום PostgreSQL/MySQL מכמה סיבות:

| גורם            | SQLite                                | PostgreSQL                             |
| --------------- | ------------------------------------- | -------------------------------------- |
| **פריסה**       | מוטמע — ללא שרת נפרד                  | דורש הגדרת שרת                         |
| **הצפנה**       | בשכבת היישום (AES-256-GCM)            | TDE מובנה                              |
| **ביצועים**     | מהיר יותר לעומסי עבודה קטנים/בינוניים | טוב יותר למספר עצום של כתיבות מקביליות |
| **מקביליות**    | מצב WAL מאפשר קריאות מקביליות         | MVCC מלא                               |
| **גיבוי**       | העתקת קובץ יחיד                       | `pg_dump` או תמונת מצב של מערכת הקבצים |
| **תרחיש שימוש** | התקנה לכל משתמש, מוטמע                | SaaS מרובה דיירים                      |

עבור פריסות של **משתמש יחיד ומופע יחיד** (תרחיש השימוש העיקרי של OmniRoute), SQLite פשוט ומהיר יותר.

### יומן WAL

הקובץ `core.ts` פותח את מסד הנתונים ב-**מצב WAL (רישום מקדים של כתיבות)**:

```ts
// src/lib/db/core.ts
db.pragma("journal_mode = WAL");
db.pragma("busy_timeout = 2000");
db.pragma("synchronous = NORMAL");
db.pragma(`cache_size = -${DEFAULT_DATABASE_SETTINGS.optimization.cacheSize}`);
```

WAL מאפשר **קריאות מקביליות** במהלך כתיבות — דבר חשוב ללוח המחוונים, שמבצע שאילתות בזמן שבקשות נרשמות.

גודל המטמון המוגדר כברירת מחדל הוא **65,536 KiB (64 MiB)**. SQLite מפרש ערך שלילי של
`cache_size` כחסם עליון משוער ב-KiB ומקצה דפים לפי דרישה.
האפשרות **הגדרות > מערכת ואחסון > גודל המטמון** מקבלת ערכים שלמים בין **1 ל-
1,000,000 KiB**; שמירת ההגדרה מחילה אותה על החיבור הפעיל למסד הנתונים,
ו-OmniRoute משחזר את הערך השמור בעת ההפעלה.

---

## מיקום מסד הנתונים

קובץ SQLite מאוחסן במיקום הבא:

| מערכת הפעלה | נתיב                                                        |
| ----------- | ----------------------------------------------------------- |
| Linux       | `~/.omniroute/storage.sqlite`                               |
| macOS       | `~/.omniroute/storage.sqlite`                               |
| Windows     | `%USERPROFILE%\.omniroute\storage.sqlite`                   |
| Docker      | `/app/data/storage.sqlite` (ניתן להגדרה באמצעות `DATA_DIR`) |

קבצים נלווים:

- `storage.sqlite-wal` — יומן כתיבה מקדימה
- `storage.sqlite-shm` — קובץ זיכרון משותף
- `call_logs/` — תוצרי נתוני הבקשות (אם האפשרות מופעלת)

**שינוי המיקום:**

```bash
DATA_DIR=/custom/path omniroute
```

---

## ארכיטקטורת מודולי הדומיין

מסד הנתונים של OmniRoute כולל **110 מודולי TypeScript ברמה העליונה** תחת `src/lib/db/`. כל מודול דומיין:

- אחראי על טבלה ייעודית אחת או יותר
- מייצא פונקציות CRUD עם טיפוסים
- לעולם אינו ניגש לטבלאות של מודול אחר
- משתמש ב-`getDbInstance()` מתוך `core.ts` כדי לגשת למסד הנתונים

### 110 מודולי מסד הנתונים ברמה העליונה

ל-OmniRoute יש **110 קובצי TypeScript ברמה העליונה** תחת `src/lib/db/`. להלן מבחר ממודולי הליבה; לרשימה המלאה, עיינו בתוכן הספרייה:

| מודול                   | טבלאות                                                         | אחריות                                                            |
| ----------------------- | -------------------------------------------------------------- | ----------------------------------------------------------------- |
| `providers.ts`          | `provider_connections`                                         | רישום ספקים ואישורים באמצעות OAuth/API key                        |
| `models.ts`             | `key_value` (נתוני מודלים)                                     | הגדרות מודלים, יכולות ותמחור                                      |
| `combos.ts`             | `combos`                                                       | תצורות ניתוב קומבינציות וסדרן                                     |
| `apiKeys.ts`            | `api_keys`                                                     | מחזור החיים של API key, היקפי הרשאה ומעקב אחר מכסות               |
| `settings.ts`           | `key_value`, `api_keys`, `combos`                              | תצורת המערכת ומאגר KV משותף                                       |
| `backup.ts`             | —                                                              | פעולות ייצוא/ייבוא של גיבויים                                     |
| `proxies.ts`            | `proxy_registry`, `proxy_assignments`, `provider_connections`  | תצורות Proxy וכללי ניתוב                                          |
| `prompts.ts`            | `prompt_templates`                                             | תבניות הנחיה לשימוש חוזר וניהול גרסאות                            |
| `webhooks.ts`           | `webhooks`                                                     | מינויים ויומנים של webhook מונחי-אירועים                          |
| `detailedLogs.ts`       | `request_detail_logs`                                          | רישום ביקורת לכל בקשה (אופציונלי, נפח גבוה)                       |
| `domainState.ts`        | `domain_*` (5 טבלאות)                                          | תקציבי דומיין, מפסקי זרם, נעילות, שרשראות חלופה והיסטוריית עלויות |
| `registeredKeys.ts`     | `registered_keys`, `account_key_limits`, `provider_key_limits` | מפתחות API מורשים עבור MCP/A2A                                    |
| `quotaSnapshots.ts`     | `quota_snapshots`                                              | היסטוריית שימוש במכסות                                            |
| `modelComboMappings.ts` | `model_combo_mappings`                                         | מיפוי מודלים לברירות מחדל של קומבינציות                           |
| `cliToolState.ts`       | `cli_tool_state`                                               | מצב מתמשך הייחודי ל-CLI                                           |
| `encryption.ts`         | —                                                              | כלי עזר להצפנת שדות ולפענוחם                                      |
| `readCache.ts`          | —                                                              | מטמון בזיכרון עבור פעולות עתירות קריאה                            |
| `secrets.ts`            | `key_value` (רשומות מוצפנות)                                   | אחסון סודות מוצפן                                                 |
| `stateReset.ts`         | —                                                              | מחיקה/איפוס של מצב מסד הנתונים לצורך בדיקות                       |
| `contextHandoffs.ts`    | `context_handoffs`                                             | הקשר ההפעלה להעברה בין סוכנים                                     |
| `usage*.ts`             | `usage_history`, `call_logs`, `proxy_logs`                     | מעקב אחר שימוש                                                    |
| `compression*.ts`       | `compression_settings`, `compression_combos`                   | תצורת דחיסה                                                       |

### גבולות בין מודולים

כלל ארכיטקטוני מרכזי: **מודולים אינם ניגשים ישירות לטבלאות של מודולים אחרים**. כדי לעבוד עם נתונים של מודול אחר, יש לייבא את הפונקציה מאותו מודול.

```ts
// ❌ שגוי: SQL ישיר ממודול אחר
db.prepare("SELECT * FROM provider_connections").all();

// ✅ נכון: שימוש בפונקציה של מודול הספקים
import { listProviders } from "@/lib/db/providers";
const providers = await listProviders();
```

כלל זה נאכף במסגרת סקירת קוד — אין בדיקה סטטית, אך הפרות מסומנות.

---

## סכמת בסיס (17 טבלאות)

`core.ts` מגדיר את 17 טבלאות הבסיס ב-`SCHEMA_SQL`. הן נוצרות על ידי המיגרציה `001_initial_schema.sql` ומהוות את סכמת הליבה.

### טבלאות ליבה (נוצרות במיגרציה הראשונית)

| טבלה                       | מטרה                          | עמודות מפתח                                                             |
| -------------------------- | ----------------------------- | ----------------------------------------------------------------------- |
| `provider_connections`     | פרטי גישה לספק (מוצפנים)      | `id`, `provider`, `auth_type`, `api_key`, `is_active`                   |
| `provider_nodes`           | מידע ניתוב לצומתי ספק         | `id`, `type`, `name`, `base_url`, `created_at`                          |
| `key_value`                | מאגר KV כללי                  | `namespace`, `key`, `value`                                             |
| `combos`                   | הגדרות שילובי ניתוב           | `id`, `name`, `data`, `sort_order`                                      |
| `api_keys`                 | מפתחות API עבור השער          | `id`, `name`, `key`, `machine_id`, `allowed_models`                     |
| `db_meta`                  | מטא-נתונים של מסד הנתונים     | `key`, `value`                                                          |
| `usage_history`            | רשומות שימוש בבקשות           | `id`, `provider`, `model`, `tokens_input`, `tokens_output`, `timestamp` |
| `call_logs`                | מטעני בקשות ותגובות           | `id`, `timestamp`, `status`, `model`, `provider`, `latency_ms`          |
| `proxy_logs`               | יומני בקשות Proxy             | `id`, `timestamp`, `proxy_type`, `status`, `provider`                   |
| `domain_fallback_chains`   | שרשראות ממודל לספק            | `model`, `chain`                                                        |
| `domain_budgets`           | תקציבי הוצאה לכל דומיין       | `api_key_id`, `daily_limit_usd`, `warning_threshold`, `reset_interval`  |
| `domain_budget_reset_logs` | היסטוריית איפוסי תקציב        | `id`, `api_key_id`, `reset_interval`, `previous_spend`, `reset_at`      |
| `domain_cost_history`      | מעקב עלויות לכל דומיין        | `id`, `api_key_id`, `cost`, `timestamp`                                 |
| `domain_lockout_state`     | מצב הגבלת קצב לדומיין         | `identifier`, `attempts`, `locked_until`                                |
| `domain_circuit_breakers`  | מצב מפסק זרם לכל דומיין       | `name`, `state`, `failure_count`, `last_failure_time`                   |
| `semantic_cache`           | מטמון תגובות LLM              | `id`, `signature`, `model`, `prompt_hash`, `response`                   |
| `quota_snapshots`          | צילומי מצב היסטוריים של מכסות | `id`, `provider`, `connection_id`, `window_key`, `remaining_percentage` |

### טבלאות נוספות (נוספו על ידי מיגרציות מאוחרות יותר)

מיגרציות עוקבות מוסיפות טבלאות כגון:

- `cli_tool_state` (מיגרציה 011) — מצב כלי CLI
- טבלאות `mcp_*` — ביקורת שרת MCP
- טבלאות `a2a_*` — מצב משימות A2A
- טבלאות `usage_*` — מעקב שימוש
- טבלאות `plugin_*` — מערכת תוספים
- `skill_executions` — היסטוריית ביצוע מיומנויות
- טבלאות `memory_*` — מערכת זיכרון
- טבלאות `compression_*` — מערכת דחיסה
- טבלאות `webhook_*` — יומן מסירת webhook
- טבלאות `acp_*` — פרוטוקול לקוח סוכן
- טבלאות `oneproxy_*` — זירת המסחר של 1proxy
- `proxy_assignments` — קישורי תחום Proxy
- `detailed_call_artifacts` — מטא-נתונים של ארטיפקטים ביומן שיחות
- `quota_alert_history` — ביקורת התראות מכסה
- `command_code_auth_sessions` — הפעלות OAuth של Command Code

הרשימה המלאה של כ-30+ טבלאות נמצאת ב-`src/lib/db/migrations/`.

---

## מיגרציות

OmniRoute משתמשת ב**מיגרציות בעלות גרסאות ואידמפוטנטיות** תחת `src/lib/db/migrations/`. כל מיגרציה היא קובץ SQL יחיד בשם `NNN_description.sql`.

### מתן שמות למיגרציות

```
001_initial_schema.sql
002_mcp_a2a_tables.sql
003_provider_node_custom_paths.sql
...
021_combo_call_log_targets.sql
```

### אופן הרצת המיגרציות

בעת ההפעלה, `migrationRunner.ts`:

1. יוצר את הטבלה `_omniroute_migrations` אם אינה קיימת
2. מבצע שאילתה לקבלת המיגרציות שכבר הוחלו
3. מחיל לפי הסדר את כל המיגרציות החדשות, כל אחת בתוך טרנזקציה
4. מתעד כל מיגרציה שהוחלה, בצירוף חותמת זמן

```ts
// src/lib/db/migrationRunner.ts (גרסה מפושטת)
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

### אידמפוטנטיות

מיגרציות חייבות להיות **אידמפוטנטיות** — להרצתן פעמיים לא אמורה להיות כל השפעה נוספת:

```sql
-- 004_proxy_registry.sql
CREATE TABLE IF NOT EXISTS proxy_registry (
  id TEXT PRIMARY KEY,
  host TEXT NOT NULL,
  port INTEGER NOT NULL,
  ...
);
```

השתמשו בנדיבות בפסוקיות `IF NOT EXISTS`,‏ `IF EXISTS` ו-`OR IGNORE` / `OR REPLACE`.

### הוספת מיגרציה חדשה

1. **זהו את המספר הבא**: `ls src/lib/db/migrations/ | tail -1`
2. **צרו את הקובץ**: `NNN_my_change.sql`
3. **השתמשו ב-DDL בטוח**: `CREATE TABLE IF NOT EXISTS`,‏ `ALTER TABLE ... ADD COLUMN`
4. **השלימו נתונים קיימים בזהירות**: השתמשו ב-`UPDATE ... WHERE ...` כדי לטפל בשורות קיימות
5. **בדקו על עותק**: לעולם אל תריצו בסביבת הייצור מיגרציות שלא נבדקו

דוגמה:

```sql
-- 022_add_combo_priority.sql
ALTER TABLE combos ADD COLUMN priority INTEGER DEFAULT 100;
UPDATE combos SET priority = 100 WHERE priority IS NULL;
CREATE INDEX IF NOT EXISTS idx_combos_priority ON combos(priority);
```

> **שינויים שאינם תואמים לאחור** (למשל, הסרת עמודות) הם מורכבים. OmniRoute אינה תומכת בשנמוך — לאחר החלת מיגרציה, השינוי בסכמה הוא קבוע. תכננו בהתאם.

---

## הצפנה במנוחה

שדות רגישים (מפתחות API, אסימוני OAuth ומחרוזות חיבור) מוצפנים במנוחה באמצעות **AES-256-GCM**.

### כיצד זה עובד

```ts
// src/lib/db/encryption.ts (גרסה מפושטת)
const key = deriveKeyFromPassphrase(passphrase, salt);
const iv = randomBytes(12);
const cipher = createCipheriv("aes-256-gcm", key, iv);
const encrypted = Buffer.concat([cipher.update(plaintext), cipher.final()]);
const authTag = cipher.getAuthTag();
return { encrypted, iv, authTag };
```

### היכן נעשה בכך שימוש

- `provider_connections.api_key` — מוצפן ברמת היישום
- `provider_connections.access_token`,‏ `refresh_token`,‏ `id_token` — מוצפנים ברמת היישום
- רשומות `key_value` עם `namespace = "secrets"` — מוצפנות ברמת היישום
- `proxy_registry.auth` — מוצפן ברמת היישום (אם קיים)

### מפתח ההצפנה

מפתח ההצפנה נגזר מ**משפט סיסמה** (שמוגדר באמצעות משתנה הסביבה `STORAGE_ENCRYPTION_KEY`) ומ**מלח** (שמאוחסן במסד הנתונים). שניהם נדרשים כדי לפענח את הנתונים.

```bash
# יצירת משפט סיסמה מאובטח
openssl rand -hex 32

# הגדרה בקובץ .env
STORAGE_ENCRYPTION_KEY=<your-key>
```

> **קריטי**: אובדן מפתח ההצפנה משמעו אובדן הגישה לכל הנתונים המוצפנים. **גבו את המפתח בנפרד ממסד הנתונים**.

### מה אינו מוצפן

משיקולי ביצועים, הפריטים הבאים מאוחסנים כטקסט גלוי:

- שמות התצוגה של הספקים
- הגדרות מודלים (כבר פומביות)
- כללי ניתוב
- רשומות שימוש (ללא מידע אישי מזהה)

---

## הסתייגויות בנוגע להצפנה (v3.8.16+)

OmniRoute משתמש ב-**`migrateLegacyEncryptedString()`** כדי לטפל בשקיפות בשתי שיטות הצפנה:

- **ישנה** (לפני v3.5.0): "הצפנה" מבוססת XOR (לא הצפנה אמיתית)
- **נוכחית**: AES-256-GCM עם IV ותג אימות תקינים

כלי העזר להעברה מזהה את התבנית הישנה ומצפין אותה מחדש באמצעות השיטה החדשה בקריאה הראשונה. משמעות הדבר היא שניתן לשדרג מסד נתונים ישן מבלי לאבד פרטי גישה.

---

## מטמון קריאה

עבור נתונים שנקראים לעיתים קרובות (מודלים, ספקים, הגדרות), `readCache.ts` מספק **מטמון בזיכרון**:

```ts
// נשמר במטמון בעת ההפעלה, מבוטל בעת כתיבה
const providers = await getCachedProviders(); // מהיר, בזיכרון
const fresh = await listProviders(); // איטי, ניגש למסד הנתונים
```

| ישות במטמון            | מפתח מטמון     | TTL       |
| ---------------------- | -------------- | --------- |
| `models`               | `models:v1`    | עד לכתיבה |
| `provider_connections` | `providers:v1` | עד לכתיבה |
| `settings`             | `settings:v1`  | עד לכתיבה |
| `combos`               | `combos:v1`    | עד לכתיבה |

המטמון מבוטל בכל כתיבה לטבלה המתאימה.

---

## גיבוי ושחזור

### גיבוי ידני

```bash
# השתמשו ב-CLI כדי ליצור גיבוי מקומי
omniroute backup create --name pre-migration

# או דרך ה-API
curl -X PUT http://localhost:20128/api/db-backups \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

קובץ הגיבוי כולל:

- את כל טבלאות מסד הנתונים (שעברו סריאליזציה ל-JSON)
- ארטיפקטים של יומן שיחות (מקודדים ב-base64, אופציונלי)
- הגדרות + סודות (מוצפנים)
- תצורת תוספים

### שחזור

```bash
# דרך ה-CLI
omniroute restore pre-migration

# דרך ה-API
curl -X POST http://localhost:20128/api/db-backups/restore \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

> **אזהרה**: השחזור מחליף את מסד הנתונים כולו. עצרו תחילה את כל הלקוחות.

### גיבויים אוטומטיים

```bash
# הפעילו גיבויים יומיים אוטומטיים דרך ה-CLI
omniroute backup auto enable --cron "0 2 * * *" --retention 7
```

התזמון מבוצע בצד השרת באמצעות משימת רקע שפועלת כל 30 שניות
(כברירת מחדל) ומעריכה את ביטוי ה-cron לפי הזמן המקומי של השרת.

| משתנה                                       | ברירת מחדל | תיאור                                                                                                                   |
| ------------------------------------------- | ---------- | ----------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_BACKUP_SCHEDULE_JOB_INTERVAL_MS` | `30000`    | מרווח הפעימות באלפיות השנייה (מינימום `5000`). עליו להיות קצר מ-60 שניות כדי לפעול באופן מהימן במהלך דקת ה-cron התואמת. |

### גיבוי חם של SQLite

לגיבוי ללא זמן השבתה של מסד נתונים פעיל:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".backup /backups/omniroute-hot.db"
```

פעולה זו משתמשת ב-API הגיבוי המקוון של SQLite — ניתן להפעילה בבטחה בזמן ש-OmniRoute פועל.

---

## כוונון ביצועים

### מצב WAL

WAL מופעל כברירת מחדל. עבור עומסי עבודה עם כתיבות רבות, מומלץ לשקול:

```sql
PRAGMA wal_autocheckpoint = 1000;  -- נקודת ביקורת בכל 1000 עמודים
PRAGMA journal_size_limit = 67108864;  -- מגבלת WAL של 64MB
```

### אינדקסים

אינדקסים מרכזיים לביצועים (נוצרים אוטומטית באמצעות מיגרציות):

- `idx_models_provider` — חיפוש מודלים לפי ספק
- `idx_combo_targets_combo_id` — הרחבת יעדי קומבו
- `idx_usage_history_api_key_timestamp` — ניתוח נתוני שימוש
- `idx_quota_snapshots_api_key_window` — מעקב אחר מכסות
- `idx_call_logs_timestamp` — שאילתות ביומן קריאות

כדי להוסיף אינדקס חדש, צרו מיגרציה:

```sql
-- 023_add_my_index.sql
CREATE INDEX IF NOT EXISTS idx_my_table_my_column ON my_table(my_column);
```

### קלט/פלט ממופה זיכרון

עבור מסדי נתונים גדולים מאוד (>10GB), ניתן להתאים את מיפוי הזיכרון באמצעות pragma של SQLite:

```sql
-- הגדרה באמצעות pragma של SQLite (יש להתאים ב-core.ts או בזמן ריצה)
PRAGMA mmap_size = 268435456;  -- 256MB
```

### דחיסה

מופעי OmniRoute שפועלים לאורך זמן מפיקים תועלת מהרצה מזדמנת של `VACUUM`:

```bash
sqlite3 ~/.omniroute/storage.sqlite "VACUUM;"
```

הריצו פעם בחודש בחלונות זמן שבהם התעבורה נמוכה. (מצב WAL מפחית את הצורך, אך אינו מבטל אותו.)

---

## בדיקת תקינות

`src/lib/db/healthCheck.ts` מספק **אבחון תקינות ברמת מסד הנתונים**:

שני הפעלים דורשים אימות (`401` אחרת). `GET` מבצע אבחון בלבד; `POST` מריץ את
אותה בדיקה כאשר `autoRepair` מופעל.

```bash
GET  /api/db/health   # אבחון
POST /api/db/health   # אבחון + תיקון
```

התגובה היא `DbHealthCheckResult` שמופקת על ידי `runDbHealthCheck()`
(`src/lib/db/healthCheck.ts`):

```json
{
  "isHealthy": false,
  "issues": [
    {
      "type": "broken_reference",
      "table": "domain_budgets",
      "description": "תקציבי דומיינים הפנו למפתחות API שכבר אינם קיימים.",
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

| שדה               | משמעות                                                                                                                                      |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `isHealthy`       | ערכו `true` כאשר `issues` ריק. `driver` לעולם אינו משפיע עליו.                                                                              |
| `issues[].type`   | אחד מבין `integrity_check_failed`, `broken_reference`, `stale_snapshot`, `invalid_state`.                                                   |
| `repairedCount`   | מספר השורות שתוקנו במהלך הרצה זו; תמיד `0` כאשר `autoRepair` הוא false.                                                                     |
| `backupCreated`   | האם נוצר גיבוי לפני התיקון.                                                                                                                 |
| `checkedAt`       | חותמת זמן בתקן ISO המשותפת להרצה ולכל הערת תיקון שהיא כותבת.                                                                                |
| `driver.name`     | מנהל ההתקן של SQLite שמשרת את מסד הנתונים שנבדק.                                                                                            |
| `driver.degraded` | ערכו `true` כאשר הכתיבות אינן מגובות באופן עמיד בקובץ מסד הנתונים — חלופת ה-WASM מסוג `sql.js` (שמירה של הקובץ כולו) או מסד נתונים בזיכרון. |

אותו מטען מוחזר על ידי כלי ה-MCP‏ `omniroute_db_health_check`.

הריצו `PRAGMA integrity_check` כדי לזהות השחתה:

```bash
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"
# אמור להדפיס: ok
```

אם מוחזר ערך כלשהו שאינו `ok`, **הפסיקו מיד להשתמש במסד הנתונים** ושחזרו מגיבוי.

---

## התאוששות מאסון

### תרחיש 1: קובץ WAL אבד

הקובץ `-wal` חסר, אך `-shm` ומסד הנתונים הראשי נותרו תקינים:

```bash
# מתאושש אוטומטית בפתיחה הבאה
omniroute
```

אם SQLite אינו מצליח לבצע התאוששות אוטומטית:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".recover" > recovered.sql
sqlite3 recovered.db < recovered.sql
mv recovered.db ~/.omniroute/storage.sqlite
```

### תרחיש 2: קובץ מסד הנתונים הראשי נפגם

שחזרו מגיבוי:

```bash
omniroute sync pull --merge   # או: omniroute backup restore <backup-id>
```

### תרחיש 3: מפתח ההצפנה אבד

**לא ניתן לבצע שחזור** ללא המפתח. השדות המוצפנים אינם ניתנים לקריאה. הוסיפו מחדש את כל הספקים באופן ידני באמצעות פרטי גישה חדשים.

> **צמצום סיכונים**: גבו תמיד את מפתח ההצפנה בנפרד, רצוי במנהל סיסמאות או ב-KMS.

### תרחיש 4: הדיסק מלא

SQLite יחזיר שגיאות `SQLITE_FULL`. פנו שטח בדיסק ולאחר מכן הריצו:

```bash
# בצעו checkpoint ל-WAL כדי לפנות שטח
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA wal_checkpoint(TRUNCATE);"
```

---

## פעולות נפוצות

### בדיקת טבלה

```bash
sqlite3 ~/.omniroute/storage.sqlite "SELECT * FROM api_keys LIMIT 5;"
```

### ספירת שורות בכל הטבלאות

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';
EOF
```

### איפוס (מחיקה) של כל הנתונים

```bash
# עצרו תחילה את OmniRoute
omniroute stop

# מחקו את קובץ מסד הנתונים
rm ~/.omniroute/storage.sqlite*

# הפעילו מחדש (ייווצר מחדש מסד נתונים ריק)
omniroute
```

לאיפוס **סלקטיבי** (שמירת הספקים ומחיקת נתוני השימוש):

```bash
DELETE FROM usage_history WHERE timestamp < datetime('now', '-30 day');
DELETE FROM call_logs WHERE timestamp < datetime('now', '-30 day');
DELETE FROM proxy_logs WHERE timestamp < datetime('now', '-30 day');
```

### ייצוא טבלה בודדת

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
.mode csv
.output api_keys.csv
SELECT * FROM api_keys;
EOF
```

---

## פתרון בעיות

### "מסד הנתונים נעול"

תהליך אחר מחזיק נעילת כתיבה. ניתן:

- להמתין לסיום התהליך האחר (בדקו באמצעות `lsof | grep storage.sqlite`)
- לסיים את התהליך האחר
- אם הבעיה נמשכת, להפעיל מחדש את OmniRoute

### "אילוץ מפתח זר נכשל"

מודול דומיין מפר את שלמות ההפניות. בדקו:

- שורות יתומות בטבלאות תלויות
- מחיקות מדורגות שלא התפשטו
- מיגרציה שבוצעה לאחרונה ושינתה מפתח זר

הריצו `PRAGMA foreign_key_check;` כדי לאתר הפרות.

### "אין מספיק זיכרון"

קלט/פלט ממופה-זיכרון של SQLite חורג ממגבלת מערכת ההפעלה. הקטינו אותו באמצעות pragma של SQLite:

```sql
PRAGMA mmap_size = 134217728;  -- 128MB במקום 256MB
```

לחלופין, השביתו אותו:

```sql
PRAGMA mmap_size = 0;
```

### "המיגרציה נכשלה באמצע"

המיגרציה רצה בתוך טרנזקציה, ולכן השינויים אמורים היו להתבטל. אם לא:

1. **עצרו את OmniRoute** (כדי למנוע ניסיונות נוספים)
2. **בדקו את מצב מסד הנתונים** באמצעות `sqlite3`
3. **תקנו ידנית** את המיגרציה החלקית
4. **הפעילו מחדש** את OmniRoute (המיגרציה תתבצע שוב)

כדי למנוע זאת, בדקו תמיד מיגרציות על עותק תחילה.

---

## ראו גם

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — טבלאות שימוש
- [MONITORING_GUIDE.md](./MONITORING_GUIDE.md) — ניטור תקינות
- [RELEASE_CHECKLIST.md](./RELEASE_CHECKLIST.md) — תהליך שחרור
- מקור: `src/lib/db/` (יותר מ-80 קבצים, כ-25K שורות קוד)
