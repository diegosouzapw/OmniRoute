# Compliance & Audit (فارسی)

🌐 **Languages:** 🇺🇸 [English](../../../../security/COMPLIANCE.md) · 🇪🇹 [am](../../../am/docs/security/COMPLIANCE.md) · 🇸🇦 [ar](../../../ar/docs/security/COMPLIANCE.md) · 🇦🇿 [az](../../../az/docs/security/COMPLIANCE.md) · 🇧🇬 [bg](../../../bg/docs/security/COMPLIANCE.md) · 🇧🇩 [bn](../../../bn/docs/security/COMPLIANCE.md) · 🇧🇦 [bs](../../../bs/docs/security/COMPLIANCE.md) · 🇨🇿 [cs](../../../cs/docs/security/COMPLIANCE.md) · 🇩🇰 [da](../../../da/docs/security/COMPLIANCE.md) · 🇩🇪 [de](../../../de/docs/security/COMPLIANCE.md) · 🇬🇷 [el](../../../el/docs/security/COMPLIANCE.md) · 🇪🇸 [es](../../../es/docs/security/COMPLIANCE.md) · 🇪🇪 [et](../../../et/docs/security/COMPLIANCE.md) · 🇫🇮 [fi](../../../fi/docs/security/COMPLIANCE.md) · 🇫🇷 [fr](../../../fr/docs/security/COMPLIANCE.md) · 🇮🇪 [ga](../../../ga/docs/security/COMPLIANCE.md) · 🇮🇳 [gu](../../../gu/docs/security/COMPLIANCE.md) · 🇳🇬 [ha](../../../ha/docs/security/COMPLIANCE.md) · 🇮🇱 [he](../../../he/docs/security/COMPLIANCE.md) · 🇮🇳 [hi](../../../hi/docs/security/COMPLIANCE.md) · 🇭🇷 [hr](../../../hr/docs/security/COMPLIANCE.md) · 🇭🇺 [hu](../../../hu/docs/security/COMPLIANCE.md) · 🇦🇲 [hy](../../../hy/docs/security/COMPLIANCE.md) · 🇮🇩 [id](../../../id/docs/security/COMPLIANCE.md) · 🇳🇬 [ig](../../../ig/docs/security/COMPLIANCE.md) · 🇮🇹 [it](../../../it/docs/security/COMPLIANCE.md) · 🇯🇵 [ja](../../../ja/docs/security/COMPLIANCE.md) · 🇬🇪 [ka](../../../ka/docs/security/COMPLIANCE.md) · 🇰🇭 [km](../../../km/docs/security/COMPLIANCE.md) · 🇮🇳 [kn](../../../kn/docs/security/COMPLIANCE.md) · 🇰🇷 [ko](../../../ko/docs/security/COMPLIANCE.md) · 🇱🇹 [lt](../../../lt/docs/security/COMPLIANCE.md) · 🇱🇻 [lv](../../../lv/docs/security/COMPLIANCE.md) · 🇮🇳 [ml](../../../ml/docs/security/COMPLIANCE.md) · 🇮🇳 [mr](../../../mr/docs/security/COMPLIANCE.md) · 🇲🇾 [ms](../../../ms/docs/security/COMPLIANCE.md) · 🇲🇹 [mt](../../../mt/docs/security/COMPLIANCE.md) · 🇲🇲 [my](../../../my/docs/security/COMPLIANCE.md) · 🇳🇵 [ne](../../../ne/docs/security/COMPLIANCE.md) · 🇳🇱 [nl](../../../nl/docs/security/COMPLIANCE.md) · 🇳🇴 [no](../../../no/docs/security/COMPLIANCE.md) · 🇮🇳 [or](../../../or/docs/security/COMPLIANCE.md) · 🇮🇳 [pa](../../../pa/docs/security/COMPLIANCE.md) · 🇵🇭 [phi](../../../phi/docs/security/COMPLIANCE.md) · 🇵🇱 [pl](../../../pl/docs/security/COMPLIANCE.md) · 🇵🇹 [pt](../../../pt/docs/security/COMPLIANCE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/COMPLIANCE.md) · 🇷🇴 [ro](../../../ro/docs/security/COMPLIANCE.md) · 🇷🇺 [ru](../../../ru/docs/security/COMPLIANCE.md) · 🇱🇰 [si](../../../si/docs/security/COMPLIANCE.md) · 🇸🇰 [sk](../../../sk/docs/security/COMPLIANCE.md) · 🇸🇮 [sl](../../../sl/docs/security/COMPLIANCE.md) · 🇷🇸 [sr](../../../sr/docs/security/COMPLIANCE.md) · 🇸🇪 [sv](../../../sv/docs/security/COMPLIANCE.md) · 🇰🇪 [sw](../../../sw/docs/security/COMPLIANCE.md) · 🇮🇳 [ta](../../../ta/docs/security/COMPLIANCE.md) · 🇮🇳 [te](../../../te/docs/security/COMPLIANCE.md) · 🇹🇭 [th](../../../th/docs/security/COMPLIANCE.md) · 🇹🇷 [tr](../../../tr/docs/security/COMPLIANCE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/COMPLIANCE.md) · 🇵🇰 [ur](../../../ur/docs/security/COMPLIANCE.md) · 🇺🇿 [uz](../../../uz/docs/security/COMPLIANCE.md) · 🇻🇳 [vi](../../../vi/docs/security/COMPLIANCE.md) · 🇳🇬 [yo](../../../yo/docs/security/COMPLIANCE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/COMPLIANCE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/COMPLIANCE.md)

---

> **منبع حقیقت:** `src/lib/compliance/`، `src/app/api/compliance/`
> **آخرین بهروزرسانی:** 2026-06-28 — v3.8.40

OmniRoute اقدامات مدیریتی، رویدادهای احراز هویت، تغییرات چرخه عمر اعتبارنامههای ارائهدهندگان و فراخوانی ابزارهای MCP را در جدولهای ممیزی مبتنی بر SQLite ثبت میکند. این صفحه توضیح میدهد چه مواردی ثبت میشوند، دادهها در کجا نگهداری میشوند، چه مدت حفظ میشوند، کلیدهای API چگونه میتوانند از ثبت شدن انصراف دهند و چگونه میتوان دادهها را پرسوجو کرد.

پیادهسازی در `src/lib/compliance/index.ts` (T-43 — «کنترلهای انطباق») و `src/lib/compliance/providerAudit.ts` قرار دارد. عملیات نوشتن ممیزی هرگز خطا پرتاب نمیکنند: در صورت بروز هرگونه خطا، فراخوانی بدون اطلاع نادیده گرفته میشود تا ثبت ممیزی نتواند جریان اصلی درخواست را مختل کند.

## چه مواردی ثبت میشوند

### رویدادهای ممیزی مدیریتی (`audit_log`)

هر فراخوانی `logAuditEvent({ action, actor, target, details, ... })` یک ردیف ایجاد میکند. رشتههای اقدام از الگوی `domain.verb` (یا `domain.verb.outcome`) پیروی میکنند. انواع اقدام تأییدشده در کد منبع عبارتاند از:

| اقدام                                | منبع                                    |
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

هر ورودی شامل `action`، `actor` (با مقدار پیشفرض `"system"`)، `target`، `details`/`metadata` (JSON)، `ip_address`، `resource_type`، `status`، `request_id` و `timestamp` است. کلیدهای حساس (`apiKey`، `accessToken`، `refreshToken`، `password`، هر چیزی که با `*token`/`*secret`/`*apikey` مطابقت داشته باشد و غیره) پیش از نوشته شدن ردیف، بهصورت بازگشتی با `"[redacted]"` جایگزین میشوند.

### فراخوانی ابزارهای MCP (`mcp_tool_audit`)

هر بار فراخوانی ابزار MCP، از طریق `open-sse/mcp-server/audit.ts` یک ردیف مینویسد. شِما (از `src/lib/db/migrations/002_mcp_a2a_tables.sql`):

| ستون             | توضیحات                                 |
| ---------------- | --------------------------------------- |
| `id`             | افزایش خودکار                           |
| `tool_name`      | شناسه ابزار MCP                         |
| `input_hash`     | sha256 ورودی (هیچ محتوایی ذخیره نمیشود) |
| `output_summary` | خلاصهای کوتاه و کوتاهشده                |
| `duration_ms`    | زمان سپریشده واقعی                      |
| `api_key_id`     | فراخواننده (میتواند تهی باشد)           |
| `success`        | `1` / `0`                               |
| `error_code`     | کد خطای نهایی در صورت شکست              |
| `created_at`     | برچسب زمانی ISO                         |

### گزارشهای درخواست / مصرف

این موارد دادههای تلهمتری عملیاتی هستند (و نه صرفاً ممیزی مدیریتی)، اما از همان خط لوله نگهداری استفاده میکنند:

- `usage_history` — تجمیع مصرف بهازای هر درخواست
- `call_logs` — گزارش کامل بهازای هر درخواست (مشمول سقف تعداد ردیف؛ در ادامه ببینید)
- `proxy_logs` — گزارش ترافیک پروکسی (مشمول سقف تعداد ردیف)
- `request_detail_logs` — گزارش جزئیات درخواست قدیمی (در صورت وجود، همچنان پاکسازی میشود)

## شِمای ذخیرهسازی

جدول `audit_log` در اولین استفاده، بهصورت تنبل توسط `ensureAuditLogSchema()` ایجاد میشود:

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

ایندکسها روی `timestamp`، `action`، `actor`، `resource_type`،
`status` و `request_id` ایجاد میشوند. ستونهای مفقود در پایگاههای داده قدیمی، در صورت نیاز از طریق
`ALTER TABLE` اضافه میشوند.

## نگهداری و پاکسازی

دو بازه نگهداری مجزا رعایت میشوند:

| متغیر محیطی                 | پیشفرض   | اعمالشده بر                                                       |
| --------------------------- | -------- | ----------------------------------------------------------------- |
| `APP_LOG_RETENTION_DAYS`    | `7`      | `audit_log`، `mcp_tool_audit`                                     |
| `CALL_LOG_RETENTION_DAYS`   | `7`      | `usage_history`، `call_logs`، `proxy_logs`، `request_detail_logs` |
| `CALL_LOGS_TABLE_MAX_ROWS`  | `100000` | کاهش تعداد ردیفها تا سقف تعیینشده برای `call_logs`                |
| `PROXY_LOGS_TABLE_MAX_ROWS` | `100000` | کاهش تعداد ردیفها تا سقف تعیینشده برای `proxy_logs`               |

تابع `cleanupExpiredLogs()` فرایند نگهداری را اجرا میکند. این تابع هنگام راهاندازی سرور
از `src/instrumentation-node.ts` فراخوانی میشود. هر اجرا یک رویداد ممیزی
`compliance.cleanup` را همراه با تعداد حذفهای هر جدول ثبت میکند. کاهش حجم گزارشهای پراکسی/فراخوانی
بهصورت دستهای (`BATCH_SIZE = 5000`) انجام میشود تا از قفلهای طولانیمدت نوشتن جلوگیری شود.

پاکسازی دستی تاریخچه درخواستها از فرایند نگهداری جدا است. صفحه گزارشهای درخواست
مسیر `POST /api/settings/purge-request-history` را فراخوانی میکند که `call_logs`،
جدول قدیمی `request_detail_logs` و مصنوعات محلی درخواست در مسیر
`${DATA_DIR}/call_logs/` را حذف میکند.

مقادیر پیشفرض در `src/lib/logEnv.ts` تعریف شدهاند
(`DEFAULT_APP_LOG_RETENTION_DAYS = 7`، `DEFAULT_CALL_LOG_RETENTION_DAYS = 7`).

## انصراف `noLog` (بهازای هر کلید API)

کلیدهای API را میتوان بهگونهای علامتگذاری کرد که ترافیک فراخوانی پاییندستی آنها ثبت نشود. این
پرچم در جدول `api_keys` قرار دارد (`no_log INTEGER DEFAULT 0`) و برای جستوجوهای مسیر پرتکرار
در یک مجموعه درونحافظهای نیز بازتاب داده میشود.

```bash
# ایجاد یک کلید بدون ثبت گزارش (نیازمند احراز هویت مدیریتی)
curl -X POST http://localhost:20128/api/keys \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{"name": "Privacy key", "noLog": true}'
```

توابع کمکی (`src/lib/compliance/index.ts`):

- `setNoLog(apiKeyId, true|false)` — ورودی درونحافظهای را فعال یا غیرفعال میکند
- `isNoLog(apiKeyId)` — در مسیر درخواست بررسی میشود؛ در صورت نیاز، از خواندن
  `api_keys.no_log` با حافظه نهان ۳۰ ثانیهای استفاده میکند
- `NO_LOG_API_KEY_IDS` (متغیر محیطی، جداشده با ویرگول) — هنگام راهاندازی از پیش در مجموعه درونحافظهای
  بارگذاری میشود؛ زمانی مفید است که نتوانید ستون را مستقیماً تغییر دهید

رویدادهای ممیزی مدیریتی (ورود، تغییرات ارائهدهنده، فراخوانی ابزارهای MCP و غیره)
تحت تأثیر `noLog` قرار **نمیگیرند** — تنها ثبت ترافیک هر درخواست غیرفعال
میشود.

## REST API

| نقطه پایانی                 | متد   | توضیحات                                          | احراز هویت |
| --------------------------- | ----- | ------------------------------------------------ | ---------- |
| `/api/compliance/audit-log` | `GET` | ورودیهای صفحهبندیشده ممیزی مدیر همراه با فیلترها | management |
| `/api/mcp/audit`            | `GET` | ورودیهای صفحهبندیشده ممیزی ابزار MCP             | (open-sse) |
| `/api/mcp/audit/stats`      | `GET` | آمار تجمیعشده ممیزی MCP                          | (open-sse) |

در حال حاضر هیچ نقطه پایانی برای خروجی CSV ارائه نمیشود — دادهها را از داشبورد صادر کنید یا
پایگاه داده SQLite را مستقیماً پرسوجو کنید.

### پرسوجوی `/api/compliance/audit-log`

پارامترهای پرسوجوی پشتیبانیشده (همگی اختیاری هستند و تمام فیلترهای متنی از
تطبیق `LIKE %value%` استفاده میکنند):

- `action`، `actor`، `target`، `resourceType` (یا `resource_type`)،
  `status`، `requestId` (یا `request_id`)
- `from` / `since`، `to` / `until` — برچسبهای زمانی ISO
- `limit` (پیشفرض `50`، حداقل `1`، حداکثر `500`)
- `offset` (پیشفرض `0`، حداکثر `10_000`)

پاسخ یک آرایه JSON است. فراداده صفحهبندی در هدرها بازگردانده میشود:
`x-total-count`، `x-page-limit`، `x-page-offset`.

```bash
curl "http://localhost:20128/api/compliance/audit-log?action=provider.credentials&from=2026-05-01" \
  -H "Cookie: auth_token=..."
```

## داشبورد

داشبورد، دادههای ممیزی را در **`/dashboard/audit`**
(`src/app/(dashboard)/dashboard/audit/page.tsx`) ارائه میکند. این صفحه دو زبانه دارد:

- **انطباق** (`ComplianceTab.tsx`) — رویدادهای ممیزی مدیر از
  `/api/compliance/audit-log`. امکان فیلتر بر اساس نوع رویداد، شدت (اطلاعاتی / هشدار
  / بحرانی، استخراجشده از action + status) و بازه زمانی وجود دارد. شدت بر اساس
  رشتههای action/status در سمت کلاینت محاسبه میشود.
- **MCP** (`McpAuditTab.tsx`) — ممیزی ابزار MCP از `/api/mcp/audit`، همراه با
  فیلترهای نام ابزار و موفقیت/شکست.

هر دو زبانه از صفحهبندی با اندازه صفحه `50` (انطباق) و `25` (MCP) استفاده میکنند.

## توابع کمکی اعتبارنامه ارائهدهنده

`src/lib/compliance/providerAudit.ts` توابع کمکی شکلدهی داده را فراهم میکند که مسیرهای
مدیریت ارائهدهنده هنگام انتشار رویدادهای اعتبارنامه از آنها استفاده میکنند:

- `summarizeProviderConnectionForAudit(connection)` — پیش از نوشتهشدن اسنپشات اتصال
  در `details`، مقادیر `apiKey`، `accessToken`، `refreshToken`، `idToken` و
  `providerSpecificData.consoleApiKey` را حذف میکند.
- `getProviderAuditTarget(connection)` — یک رشته پایدار
  `"<provider>:<name|id>"` را برای فیلد `target` میسازد.
- `extractProviderWarnings(...payloads)` — پاسخهای ارائهدهنده را برای یافتن
  هشدارهای خطمشی/ایمنی (`[sanitizer]`، `prompt injection detected`،
  `content has been filtered`، `safety filter`، `policy violation`) اسکن میکند و
  حداکثر 5 مورد را نمایش میدهد که هرکدام به 400 نویسه محدود شدهاند.

## بهترین شیوهها

- کلیدهای API که دادههای PII (حقوقی، پزشکی و غیره) را مدیریت میکنند با `noLog: true` علامتگذاری کنید.
- `APP_LOG_RETENTION_DAYS` / `CALL_LOG_RETENTION_DAYS` را متناسب با خطمشی
  نگهداری داده خود تنظیم کنید. مقادیر پیشفرض 7روزه محافظهکارانه هستند.
- جدول ممیزی را با تناوب موردنیاز برنامه انطباق خود به خارج از پلتفرم صادر کنید
  (`sqlite3 dump`) — هیچ قابلیت داخلی برای بایگانی وجود ندارد.
- تعداد `auth.login.failed` و `auth.login.locked` را برای شناسایی حملات
  جستوجوی فراگیر گذرواژه پیگیری کنید.
- هنگام افزودن نقاط پایانی جدید مدیر، `logAuditEvent({ ... })` را با یک رشته action
  پایدار بهشکل `domain.verb.outcome` فراخوانی کنید و زمینه درخواست را از طریق
  `getAuditRequestContext(request)` ارسال کنید تا IP و `requestId` بهطور
  خودکار ثبت شوند.

## همچنین ببینید

- [`docs/security/GUARDRAILS.md`](./GUARDRAILS.md) — پوشاندن اطلاعات شناسایی شخصی (PII)، تزریق پرامپت
- [`docs/frameworks/MCP-SERVER.md`](../frameworks/MCP-SERVER.md) — فهرست ابزارهای MCP و دامنهها
- [`docs/reference/ENVIRONMENT.md`](../reference/ENVIRONMENT.md) — مرجع کامل متغیرهای محیطی
- منبع: `src/lib/compliance/`، `src/app/api/compliance/`،
  `src/app/api/mcp/audit/`، `src/lib/logEnv.ts`
