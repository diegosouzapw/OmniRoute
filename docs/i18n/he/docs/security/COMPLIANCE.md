# Compliance & Audit (עברית)

🌐 **Languages:** 🇺🇸 [English](../../../../security/COMPLIANCE.md) · 🇪🇹 [am](../../../am/docs/security/COMPLIANCE.md) · 🇸🇦 [ar](../../../ar/docs/security/COMPLIANCE.md) · 🇦🇿 [az](../../../az/docs/security/COMPLIANCE.md) · 🇧🇬 [bg](../../../bg/docs/security/COMPLIANCE.md) · 🇧🇩 [bn](../../../bn/docs/security/COMPLIANCE.md) · 🇧🇦 [bs](../../../bs/docs/security/COMPLIANCE.md) · 🇨🇿 [cs](../../../cs/docs/security/COMPLIANCE.md) · 🇩🇰 [da](../../../da/docs/security/COMPLIANCE.md) · 🇩🇪 [de](../../../de/docs/security/COMPLIANCE.md) · 🇬🇷 [el](../../../el/docs/security/COMPLIANCE.md) · 🇪🇸 [es](../../../es/docs/security/COMPLIANCE.md) · 🇪🇪 [et](../../../et/docs/security/COMPLIANCE.md) · 🇮🇷 [fa](../../../fa/docs/security/COMPLIANCE.md) · 🇫🇮 [fi](../../../fi/docs/security/COMPLIANCE.md) · 🇫🇷 [fr](../../../fr/docs/security/COMPLIANCE.md) · 🇮🇪 [ga](../../../ga/docs/security/COMPLIANCE.md) · 🇮🇳 [gu](../../../gu/docs/security/COMPLIANCE.md) · 🇳🇬 [ha](../../../ha/docs/security/COMPLIANCE.md) · 🇮🇳 [hi](../../../hi/docs/security/COMPLIANCE.md) · 🇭🇷 [hr](../../../hr/docs/security/COMPLIANCE.md) · 🇭🇺 [hu](../../../hu/docs/security/COMPLIANCE.md) · 🇦🇲 [hy](../../../hy/docs/security/COMPLIANCE.md) · 🇮🇩 [id](../../../id/docs/security/COMPLIANCE.md) · 🇳🇬 [ig](../../../ig/docs/security/COMPLIANCE.md) · 🇮🇹 [it](../../../it/docs/security/COMPLIANCE.md) · 🇯🇵 [ja](../../../ja/docs/security/COMPLIANCE.md) · 🇬🇪 [ka](../../../ka/docs/security/COMPLIANCE.md) · 🇰🇭 [km](../../../km/docs/security/COMPLIANCE.md) · 🇮🇳 [kn](../../../kn/docs/security/COMPLIANCE.md) · 🇰🇷 [ko](../../../ko/docs/security/COMPLIANCE.md) · 🇱🇹 [lt](../../../lt/docs/security/COMPLIANCE.md) · 🇱🇻 [lv](../../../lv/docs/security/COMPLIANCE.md) · 🇮🇳 [ml](../../../ml/docs/security/COMPLIANCE.md) · 🇮🇳 [mr](../../../mr/docs/security/COMPLIANCE.md) · 🇲🇾 [ms](../../../ms/docs/security/COMPLIANCE.md) · 🇲🇹 [mt](../../../mt/docs/security/COMPLIANCE.md) · 🇲🇲 [my](../../../my/docs/security/COMPLIANCE.md) · 🇳🇵 [ne](../../../ne/docs/security/COMPLIANCE.md) · 🇳🇱 [nl](../../../nl/docs/security/COMPLIANCE.md) · 🇳🇴 [no](../../../no/docs/security/COMPLIANCE.md) · 🇮🇳 [or](../../../or/docs/security/COMPLIANCE.md) · 🇮🇳 [pa](../../../pa/docs/security/COMPLIANCE.md) · 🇵🇭 [phi](../../../phi/docs/security/COMPLIANCE.md) · 🇵🇱 [pl](../../../pl/docs/security/COMPLIANCE.md) · 🇵🇹 [pt](../../../pt/docs/security/COMPLIANCE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/COMPLIANCE.md) · 🇷🇴 [ro](../../../ro/docs/security/COMPLIANCE.md) · 🇷🇺 [ru](../../../ru/docs/security/COMPLIANCE.md) · 🇱🇰 [si](../../../si/docs/security/COMPLIANCE.md) · 🇸🇰 [sk](../../../sk/docs/security/COMPLIANCE.md) · 🇸🇮 [sl](../../../sl/docs/security/COMPLIANCE.md) · 🇷🇸 [sr](../../../sr/docs/security/COMPLIANCE.md) · 🇸🇪 [sv](../../../sv/docs/security/COMPLIANCE.md) · 🇰🇪 [sw](../../../sw/docs/security/COMPLIANCE.md) · 🇮🇳 [ta](../../../ta/docs/security/COMPLIANCE.md) · 🇮🇳 [te](../../../te/docs/security/COMPLIANCE.md) · 🇹🇭 [th](../../../th/docs/security/COMPLIANCE.md) · 🇹🇷 [tr](../../../tr/docs/security/COMPLIANCE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/COMPLIANCE.md) · 🇵🇰 [ur](../../../ur/docs/security/COMPLIANCE.md) · 🇺🇿 [uz](../../../uz/docs/security/COMPLIANCE.md) · 🇻🇳 [vi](../../../vi/docs/security/COMPLIANCE.md) · 🇳🇬 [yo](../../../yo/docs/security/COMPLIANCE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/COMPLIANCE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/COMPLIANCE.md)

---

> **מקור האמת:** `src/lib/compliance/`, `src/app/api/compliance/`
> **עודכן לאחרונה:** 2026-06-28 — v3.8.40

OmniRoute מתעד פעולות ניהוליות, אירועי אימות, שינויים במחזור החיים של פרטי גישה לספקים והפעלות של כלי MCP בטבלאות ביקורת מבוססות SQLite. דף זה מפרט מה נרשם, היכן הנתונים נשמרים, למשך כמה זמן הם נשמרים, כיצד מפתחות API יכולים לבטל את הרישום וכיצד לבצע שאילתות על הנתונים.

המימוש נמצא ב-`src/lib/compliance/index.ts`‏ (T-43 — "בקרות תאימות") וב-`src/lib/compliance/providerAudit.ts`. כתיבות ביקורת לעולם אינן זורקות חריגה: בכל כשל, הקריאה נבלעת בשקט כדי שרישום הביקורת לא יוכל לשבש את זרימת הבקשה הראשית.

## מה נרשם

### אירועי ביקורת ניהוליים (`audit_log`)

כל קריאה אל `logAuditEvent({ action, actor, target, details, ... })` יוצרת שורה אחת. מחרוזות פעולה פועלות לפי התבנית `domain.verb` (או `domain.verb.outcome`). סוגי הפעולות שאושרו בקוד כוללים:

| פעולה                                | מקור                                    |
| ------------------------------------ | --------------------------------------- |
| `auth.login.success`                 | `src/app/api/auth/login/route.ts`       |
| `auth.login.failed`                  | `src/app/api/auth/login/route.ts`       |
| `auth.login.locked`                  | `src/app/api/auth/login/route.ts`       |
| `auth.login.error`                   | `src/app/api/auth/login/route.ts`       |
| `auth.login.misconfigured`           | `src/app/api/auth/login/route.ts`       |
| `auth.login.setup_required`          | `src/app/api/auth/login/route.ts`       |
| `auth.logout.success`                | `src/app/api/auth/logout/route.ts`      |
| `provider.credentials.created`       | `src/app/api/providers/route.ts`        |
| `provider.credentials.updated`       | `src/app/api/providers/[id]/route.ts`   |
| `provider.credentials.revoked`       | `src/app/api/providers/[id]/route.ts`   |
| `provider.credentials.batch_revoked` | `src/app/api/providers/route.ts`        |
| `sync.token.created`                 | `src/app/api/sync/tokens/route.ts`      |
| `sync.token.revoked`                 | `src/app/api/sync/tokens/[id]/route.ts` |
| `compliance.cleanup`                 | `src/lib/compliance/index.ts`           |

כל רשומה כוללת את `action`,‏ `actor` (ערך ברירת המחדל הוא `"system"`),‏ `target`,‏ `details`/`metadata`‏ (JSON),‏ `ip_address`,‏ `resource_type`,‏ `status`,‏ `request_id` ו-`timestamp`. מפתחות רגישים (`apiKey`,‏ `accessToken`,‏ `refreshToken`,‏ `password`, כל מפתח התואם ל-`*token`/`*secret`/`*apikey` וכדומה) מצונזרים באופן רקורסיבי ל-`"[redacted]"` לפני כתיבת השורה.

### קריאות לכלי MCP (`mcp_tool_audit`)

כל הפעלה של כלי MCP כותבת שורה באמצעות `open-sse/mcp-server/audit.ts`. הסכמה (מתוך `src/lib/db/migrations/002_mcp_a2a_tables.sql`):

| עמודה            | הערות                                 |
| ---------------- | ------------------------------------- |
| `id`             | מספור אוטומטי עולה                    |
| `tool_name`      | מזהה כלי MCP                          |
| `input_hash`     | sha256 של הקלט (המטען עצמו אינו נשמר) |
| `output_summary` | תקציר קצר וחתוך                       |
| `duration_ms`    | זמן בפועל                             |
| `api_key_id`     | הגורם הקורא (יכול להיות null)         |
| `success`        | `1` / `0`                             |
| `error_code`     | קוד השגיאה הסופית במקרה של כשל        |
| `created_at`     | חותמת זמן בפורמט ISO                  |

### יומני בקשות / שימוש

אלו נתוני טלמטריה תפעוליים (ולא ביקורת ניהולית במובן המחמיר), אך הם משתמשים באותו צינור שמירת נתונים:

- `usage_history` — סיכום שימוש לכל בקשה
- `call_logs` — יומן מלא לכל בקשה (כפוף למגבלת שורות, ראו להלן)
- `proxy_logs` — יומן תעבורת proxy (כפוף למגבלת שורות)
- `request_detail_logs` — יומן מפורט מדור קודם של בקשות (עדיין נמחק במסגרת הניקוי, אם הוא קיים)

## סכמת אחסון

`audit_log` נוצרת באופן עצל על ידי `ensureAuditLogSchema()` בעת השימוש הראשון:

```sql
CREATE TABLE IF NOT EXISTS audit_log (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  timestamp     TEXT NOT NULL DEFAULT (datetime('now')),
  action        TEXT NOT NULL,
  actor         TEXT NOT NULL DEFAULT 'system',
  target        TEXT,
  details       TEXT,
  ip_address    TEXT,
  resource_type TEXT,
  status        TEXT,
  request_id    TEXT,
  metadata      TEXT
);
```

אינדקסים נוצרים עבור `timestamp`,‏ `action`,‏ `actor`,‏ `resource_type`,
`status` ו-`request_id`. עמודות חסרות במסדי נתונים ישנים מתווספות לפי הצורך באמצעות
`ALTER TABLE`.

## שמירה וניקוי

נשמרים שני חלונות שמירה נפרדים:

| משתנה סביבה                 | ברירת מחדל | חל על                                                             |
| --------------------------- | ---------- | ----------------------------------------------------------------- |
| `APP_LOG_RETENTION_DAYS`    | `7`        | `audit_log`, `mcp_tool_audit`                                     |
| `CALL_LOG_RETENTION_DAYS`   | `7`        | `usage_history`, `call_logs`, `proxy_logs`, `request_detail_logs` |
| `CALL_LOGS_TABLE_MAX_ROWS`  | `100000`   | צמצום לפי מגבלת שורות עבור `call_logs`                            |
| `PROXY_LOGS_TABLE_MAX_ROWS` | `100000`   | צמצום לפי מגבלת שורות עבור `proxy_logs`                           |

`cleanupExpiredLogs()` מפעילה את תהליך השמירה. היא נקראת בעת הפעלת השרת
מתוך `src/instrumentation-node.ts`. כל הרצה מתעדת אירוע ביקורת
`compliance.cleanup` עם מספר המחיקות לכל טבלה. צמצום יומני הפרוקסי/קריאות
מתבצע באצוות (`BATCH_SIZE = 5000`) כדי להימנע מנעילות כתיבה ממושכות.

ניקוי ידני של היסטוריית הבקשות נפרד מתהליך השמירה. הדף Request Logs
קורא ל-`POST /api/settings/purge-request-history`, שמוחק את `call_logs`,
את `request_detail_logs` הישן, ופריטי בקשות מקומיים תחת
`${DATA_DIR}/call_logs/`.

ערכי ברירת המחדל מוגדרים ב-`src/lib/logEnv.ts`
(`DEFAULT_APP_LOG_RETENTION_DAYS = 7`, `DEFAULT_CALL_LOG_RETENTION_DAYS = 7`).

## ביטול רישום באמצעות `noLog` (לכל מפתח API)

ניתן לסמן מפתחות API כך שתעבורת הקריאות שלהם במורד הזרם לא תירשם. הדגל
נשמר בטבלה `api_keys` (`no_log INTEGER DEFAULT 0`) ומשוקף
לקבוצה בזיכרון לצורך חיפושים בנתיב החם.

```bash
# יצירת מפתח ללא רישום (נדרש אימות ניהולי)
curl -X POST http://localhost:20128/api/keys \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{"name": "מפתח פרטיות", "noLog": true}'
```

פונקציות עזר (`src/lib/compliance/index.ts`):

- `setNoLog(apiKeyId, true|false)` — הפעלה או השבתה של הרשומה בזיכרון
- `isNoLog(apiKeyId)` — נבדקת בנתיב הבקשה; אם אין התאמה, מתבצעת קריאה
  שנשמרת במטמון למשך 30 שניות מ-`api_keys.no_log`
- `NO_LOG_API_KEY_IDS` (משתנה סביבה, מופרד בפסיקים) — נטען מראש לקבוצה שבזיכרון
  בעת האתחול; שימושי כאשר לא ניתן לשנות את העמודה ישירות

אירועי ביקורת מנהליים (כניסה למערכת, שינויים בספקים, קריאות לכלי MCP וכדומה)
**אינם** מושפעים מ-`noLog` — רק רישום התעבורה של כל בקשה בנפרד
מושבת.

## API מסוג REST

| נקודת קצה                   | שיטה  | תיאור                                          | אימות      |
| --------------------------- | ----- | ---------------------------------------------- | ---------- |
| `/api/compliance/audit-log` | `GET` | רשומות ביקורת ניהול מחולקות לעמודים, עם מסננים | management |
| `/api/mcp/audit`            | `GET` | רשומות ביקורת של כלי MCP, מחולקות לעמודים      | (open-sse) |
| `/api/mcp/audit/stats`      | `GET` | נתונים סטטיסטיים מצטברים של ביקורת MCP         | (open-sse) |

נכון להיום לא מסופקת נקודת קצה לייצוא CSV — יש לייצא מלוח הבקרה או לבצע שאילתה
ישירות מול מסד הנתונים SQLite.

### ביצוע שאילתות מול `/api/compliance/audit-log`

פרמטרי השאילתה הנתמכים (כולם אופציונליים, וכולם משתמשים בהתאמת `LIKE %value%`
עבור מסנני טקסט):

- `action`, `actor`, `target`, `resourceType` (או `resource_type`),
  `status`, `requestId` (או `request_id`)
- `from` / `since`, `to` / `until` — חותמות זמן בפורמט ISO
- `limit` (ברירת מחדל `50`, מינימום `1`, מקסימום `500`)
- `offset` (ברירת מחדל `0`, מקסימום `10_000`)

התשובה היא מערך JSON. מטא-נתונים של החלוקה לעמודים מוחזרים בכותרות:
`x-total-count`, `x-page-limit`, `x-page-offset`.

```bash
curl "http://localhost:20128/api/compliance/audit-log?action=provider.credentials&from=2026-05-01" \
  -H "Cookie: auth_token=..."
```

## לוח הבקרה

לוח הבקרה מציג את נתוני הביקורת ב-**`/dashboard/audit`**
(`src/app/(dashboard)/dashboard/audit/page.tsx`). הדף כולל שתי לשוניות:

- **תאימות** (`ComplianceTab.tsx`) — אירועי ביקורת ניהול מתוך
  `/api/compliance/audit-log`. ניתן לסנן לפי סוג אירוע, רמת חומרה (מידע / אזהרה
  / קריטי, הנגזרת מהפעולה ומהסטטוס) וטווח תאריכים. רמת החומרה
  מחושבת בצד הלקוח מתוך מחרוזות הפעולה והסטטוס.
- **MCP** (`McpAuditTab.tsx`) — ביקורת כלי MCP מתוך `/api/mcp/audit`, עם
  מסננים לפי שם הכלי והצלחה/כישלון.

שתי הלשוניות מחלקות את התוצאות לעמודים בגודל `50` (תאימות) ו-`25` (MCP).

## פונקציות עזר לפרטי גישה של ספקים

`src/lib/compliance/providerAudit.ts` מספק פונקציות עזר לעיצוב הנתונים, המשמשות
את נתיבי ניהול הספקים כאשר הם פולטים אירועים הקשורים לפרטי גישה:

- `summarizeProviderConnectionForAudit(connection)` — מסירה את `apiKey`,
  `accessToken`, `refreshToken`, `idToken` ואת
  `providerSpecificData.consoleApiKey` לפני שתמונת המצב של החיבור
  נכתבת אל `details`.
- `getProviderAuditTarget(connection)` — מרכיבה מחרוזת יציבה
  `"<provider>:<name|id>"` עבור השדה `target`.
- `extractProviderWarnings(...payloads)` — סורקת תגובות מספקים לאיתור
  אזהרות מדיניות/בטיחות (`[sanitizer]`, `prompt injection detected`,
  `content has been filtered`, `safety filter`, `policy violation`) ומציגה
  עד 5 התאמות, כאשר כל אחת מקוצרת ל-400 תווים.

## שיטות עבודה מומלצות

- סמנו מפתחות API המטפלים במידע המאפשר זיהוי אישי (משפטי, רפואי וכדומה) באמצעות `noLog: true`.
- התאימו את `APP_LOG_RETENTION_DAYS` / `CALL_LOG_RETENTION_DAYS` למדיניות
  השמירה שלכם. ברירות המחדל של 7 ימים הן שמרניות.
- ייצאו את טבלת הביקורת אל מחוץ לפלטפורמה (`sqlite3 dump`) בתדירות
  הנדרשת על ידי תוכנית התאימות שלכם — לא קיים מנגנון מובנה לארכוב.
- עקבו אחר מספר אירועי `auth.login.failed` ו-`auth.login.locked` כדי לזהות
  ניסיונות כוח גס.
- בעת הוספת נקודות קצה ניהוליות חדשות, קראו ל-`logAuditEvent({ ... })` עם מחרוזת
  פעולה יציבה בתבנית `domain.verb.outcome`, והעבירו את הקשר הבקשה באמצעות
  `getAuditRequestContext(request)` כדי שכתובת ה-IP וה-`requestId` ייקלטו
  אוטומטית.

## ראו גם

- [`docs/security/GUARDRAILS.md`](./GUARDRAILS.md) — מיסוך מידע אישי מזהה (PII), הזרקת הנחיות
- [`docs/frameworks/MCP-SERVER.md`](../frameworks/MCP-SERVER.md) — קטלוג כלי MCP והיקפי הרשאות
- [`docs/reference/ENVIRONMENT.md`](../reference/ENVIRONMENT.md) — רשימה מלאה של משתני סביבה
- קוד מקור: `src/lib/compliance/`, `src/app/api/compliance/`,
  `src/app/api/mcp/audit/`, `src/lib/logEnv.ts`
