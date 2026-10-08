# Compliance & Audit (اردو)

🌐 **Languages:** 🇺🇸 [English](../../../../security/COMPLIANCE.md) · 🇪🇹 [am](../../../am/docs/security/COMPLIANCE.md) · 🇸🇦 [ar](../../../ar/docs/security/COMPLIANCE.md) · 🇦🇿 [az](../../../az/docs/security/COMPLIANCE.md) · 🇧🇬 [bg](../../../bg/docs/security/COMPLIANCE.md) · 🇧🇩 [bn](../../../bn/docs/security/COMPLIANCE.md) · 🇧🇦 [bs](../../../bs/docs/security/COMPLIANCE.md) · 🇨🇿 [cs](../../../cs/docs/security/COMPLIANCE.md) · 🇩🇰 [da](../../../da/docs/security/COMPLIANCE.md) · 🇩🇪 [de](../../../de/docs/security/COMPLIANCE.md) · 🇬🇷 [el](../../../el/docs/security/COMPLIANCE.md) · 🇪🇸 [es](../../../es/docs/security/COMPLIANCE.md) · 🇪🇪 [et](../../../et/docs/security/COMPLIANCE.md) · 🇮🇷 [fa](../../../fa/docs/security/COMPLIANCE.md) · 🇫🇮 [fi](../../../fi/docs/security/COMPLIANCE.md) · 🇫🇷 [fr](../../../fr/docs/security/COMPLIANCE.md) · 🇮🇪 [ga](../../../ga/docs/security/COMPLIANCE.md) · 🇮🇳 [gu](../../../gu/docs/security/COMPLIANCE.md) · 🇳🇬 [ha](../../../ha/docs/security/COMPLIANCE.md) · 🇮🇱 [he](../../../he/docs/security/COMPLIANCE.md) · 🇮🇳 [hi](../../../hi/docs/security/COMPLIANCE.md) · 🇭🇷 [hr](../../../hr/docs/security/COMPLIANCE.md) · 🇭🇺 [hu](../../../hu/docs/security/COMPLIANCE.md) · 🇦🇲 [hy](../../../hy/docs/security/COMPLIANCE.md) · 🇮🇩 [id](../../../id/docs/security/COMPLIANCE.md) · 🇳🇬 [ig](../../../ig/docs/security/COMPLIANCE.md) · 🇮🇹 [it](../../../it/docs/security/COMPLIANCE.md) · 🇯🇵 [ja](../../../ja/docs/security/COMPLIANCE.md) · 🇬🇪 [ka](../../../ka/docs/security/COMPLIANCE.md) · 🇰🇭 [km](../../../km/docs/security/COMPLIANCE.md) · 🇮🇳 [kn](../../../kn/docs/security/COMPLIANCE.md) · 🇰🇷 [ko](../../../ko/docs/security/COMPLIANCE.md) · 🇱🇹 [lt](../../../lt/docs/security/COMPLIANCE.md) · 🇱🇻 [lv](../../../lv/docs/security/COMPLIANCE.md) · 🇮🇳 [ml](../../../ml/docs/security/COMPLIANCE.md) · 🇮🇳 [mr](../../../mr/docs/security/COMPLIANCE.md) · 🇲🇾 [ms](../../../ms/docs/security/COMPLIANCE.md) · 🇲🇹 [mt](../../../mt/docs/security/COMPLIANCE.md) · 🇲🇲 [my](../../../my/docs/security/COMPLIANCE.md) · 🇳🇵 [ne](../../../ne/docs/security/COMPLIANCE.md) · 🇳🇱 [nl](../../../nl/docs/security/COMPLIANCE.md) · 🇳🇴 [no](../../../no/docs/security/COMPLIANCE.md) · 🇮🇳 [or](../../../or/docs/security/COMPLIANCE.md) · 🇮🇳 [pa](../../../pa/docs/security/COMPLIANCE.md) · 🇵🇭 [phi](../../../phi/docs/security/COMPLIANCE.md) · 🇵🇱 [pl](../../../pl/docs/security/COMPLIANCE.md) · 🇵🇹 [pt](../../../pt/docs/security/COMPLIANCE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/COMPLIANCE.md) · 🇷🇴 [ro](../../../ro/docs/security/COMPLIANCE.md) · 🇷🇺 [ru](../../../ru/docs/security/COMPLIANCE.md) · 🇱🇰 [si](../../../si/docs/security/COMPLIANCE.md) · 🇸🇰 [sk](../../../sk/docs/security/COMPLIANCE.md) · 🇸🇮 [sl](../../../sl/docs/security/COMPLIANCE.md) · 🇷🇸 [sr](../../../sr/docs/security/COMPLIANCE.md) · 🇸🇪 [sv](../../../sv/docs/security/COMPLIANCE.md) · 🇰🇪 [sw](../../../sw/docs/security/COMPLIANCE.md) · 🇮🇳 [ta](../../../ta/docs/security/COMPLIANCE.md) · 🇮🇳 [te](../../../te/docs/security/COMPLIANCE.md) · 🇹🇭 [th](../../../th/docs/security/COMPLIANCE.md) · 🇹🇷 [tr](../../../tr/docs/security/COMPLIANCE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/COMPLIANCE.md) · 🇺🇿 [uz](../../../uz/docs/security/COMPLIANCE.md) · 🇻🇳 [vi](../../../vi/docs/security/COMPLIANCE.md) · 🇳🇬 [yo](../../../yo/docs/security/COMPLIANCE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/COMPLIANCE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/COMPLIANCE.md)

---

> **مستند ماخذ:** `src/lib/compliance/`، `src/app/api/compliance/`
> **آخری تازہ کاری:** 2026-06-28 — v3.8.40

OmniRoute انتظامی کارروائیوں، توثیقی واقعات، فراہم کنندہ کی اسناد کے دورِ حیات میں تبدیلیوں، اور MCP ٹول کی طلبیوں کو SQLite سے تقویت یافتہ آڈٹ ٹیبلز میں ریکارڈ کرتا ہے۔ یہ صفحہ وضاحت کرتا ہے کہ کیا لاگ کیا جاتا ہے، یہ کہاں محفوظ ہوتا ہے، کتنی مدت تک برقرار رکھا جاتا ہے، API کلیدیں اس سے کیسے خارج ہو سکتی ہیں، اور ڈیٹا کو کیسے استفسار کیا جا سکتا ہے۔

اس کا نفاذ `src/lib/compliance/index.ts` (T-43 — "تعمیل کے کنٹرولز") اور `src/lib/compliance/providerAudit.ts` میں موجود ہے۔ آڈٹ رائٹس کبھی استثنا نہیں پھینکتیں: کسی بھی ناکامی کی صورت میں کال کو خاموشی سے نظر انداز کر دیا جاتا ہے تاکہ آڈٹ لاگنگ مرکزی درخواست کے بہاؤ میں خلل نہ ڈال سکے۔

## کیا لاگ کیا جاتا ہے

### انتظامی آڈٹ واقعات (`audit_log`)

`logAuditEvent({ action, actor, target, details, ... })` کی ہر کال ایک قطار بناتی ہے۔ کارروائی کی اسٹرنگز `domain.verb` (یا `domain.verb.outcome`) پیٹرن کی پیروی کرتی ہیں۔ سورس ٹری میں تصدیق شدہ کارروائی کی اقسام میں درج ذیل شامل ہیں:

| کارروائی                             | ماخذ                                    |
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

ہر اندراج `action`، `actor` (جس کی ڈیفالٹ قدر `"system"` ہے)، `target`، `details`/`metadata` (JSON)، `ip_address`، `resource_type`، `status`، `request_id`، اور `timestamp` محفوظ کرتا ہے۔ حساس کلیدوں (`apiKey`، `accessToken`، `refreshToken`، `password`، `*token`/`*secret`/`*apikey` سے مطابقت رکھنے والی ہر چیز، وغیرہ) کو قطار لکھے جانے سے پہلے تکراری طور پر `"[redacted]"` سے تبدیل کر دیا جاتا ہے۔

### MCP ٹول کالز (`mcp_tool_audit`)

ہر MCP ٹول کی طلبی `open-sse/mcp-server/audit.ts` کے ذریعے ایک قطار لکھتی ہے۔ اسکیما (`src/lib/db/migrations/002_mcp_a2a_tables.sql` سے):

| کالم             | نوٹس                                     |
| ---------------- | ---------------------------------------- |
| `id`             | خودکار اضافہ                             |
| `tool_name`      | MCP ٹول کا شناخت کنندہ                   |
| `input_hash`     | ان پٹ کا sha256 (پے لوڈ محفوظ نہیں ہوتا) |
| `output_summary` | مختصر، تراشی ہوئی تلخیص                  |
| `duration_ms`    | حقیقی گزرا ہوا وقت                       |
| `api_key_id`     | کال کرنے والا (کالعدم ہو سکتا ہے)        |
| `success`        | `1` / `0`                                |
| `error_code`     | ناکامی کی صورت میں آخری خرابی کا کوڈ     |
| `created_at`     | ISO ٹائم اسٹیمپ                          |

### درخواست / استعمال کے لاگز

یہ عملی ٹیلی میٹری ہیں (سختی سے انتظامی آڈٹ نہیں)، لیکن برقرار رکھنے کے اسی پائپ لائن کو استعمال کرتے ہیں:

- `usage_history` — فی درخواست استعمال کا مجموعی خلاصہ
- `call_logs` — مکمل فی درخواست لاگ (قطاروں کی حد کے تابع، ذیل میں دیکھیے)
- `proxy_logs` — پراکسی ٹریفک لاگ (قطاروں کی حد کے تابع)
- `request_detail_logs` — سابقہ تفصیلی درخواست لاگ (اگر موجود ہو تو اب بھی حذف کیا جاتا ہے)

## اسٹوریج اسکیما

پہلے استعمال پر `audit_log` کو `ensureAuditLogSchema()` کے ذریعے ضرورت کے مطابق بنایا جاتا ہے:

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

`timestamp`، `action`، `actor`، `resource_type`، `status`، اور `request_id` پر انڈیکس بنائے جاتے ہیں۔ پرانے DBs میں موجود نہ ہونے والے کالم ضرورت پڑنے پر `ALTER TABLE` کے ذریعے شامل کیے جاتے ہیں۔

## برقرار رکھنا اور صفائی

برقرار رکھنے کی دو الگ مدتوں کا لحاظ رکھا جاتا ہے:

| ماحول کا متغیر              | طے شدہ قدر | اطلاق                                                             |
| --------------------------- | ---------- | ----------------------------------------------------------------- |
| `APP_LOG_RETENTION_DAYS`    | `7`        | `audit_log`، `mcp_tool_audit`                                     |
| `CALL_LOG_RETENTION_DAYS`   | `7`        | `usage_history`، `call_logs`، `proxy_logs`، `request_detail_logs` |
| `CALL_LOGS_TABLE_MAX_ROWS`  | `100000`   | `call_logs` کے لیے قطاروں کی زیادہ سے زیادہ حد                    |
| `PROXY_LOGS_TABLE_MAX_ROWS` | `100000`   | `proxy_logs` کے لیے قطاروں کی زیادہ سے زیادہ حد                   |

`cleanupExpiredLogs()` برقرار رکھنے کا عمل چلاتا ہے۔ اسے سرور شروع ہونے پر `src/instrumentation-node.ts` سے طلب کیا جاتا ہے۔ ہر عمل، ہر ٹیبل سے حذف شدہ ریکارڈز کی تعداد کے ساتھ ایک `compliance.cleanup` آڈٹ ایونٹ لاگ کرتا ہے۔ طویل رائٹ لاکس سے بچنے کے لیے پراکسی/کال لاگز کی تراش خراش بیچز میں کی جاتی ہے (`BATCH_SIZE = 5000`)۔

درخواستوں کی تاریخ کی دستی صفائی برقرار رکھنے کے عمل سے الگ ہے۔ Request Logs صفحہ `POST /api/settings/purge-request-history` کو کال کرتا ہے، جو `call_logs`، پرانے `request_detail_logs`، اور `${DATA_DIR}/call_logs/` کے تحت مقامی درخواست آرٹیفیکٹس کو حذف کرتا ہے۔

طے شدہ اقدار `src/lib/logEnv.ts` میں متعین ہیں (`DEFAULT_APP_LOG_RETENTION_DAYS = 7`، `DEFAULT_CALL_LOG_RETENTION_DAYS = 7`)۔

## `noLog` آپٹ آؤٹ (فی API کلید)

API کلیدوں کو اس طرح فلیگ کیا جا سکتا ہے کہ ان کی ڈاؤن اسٹریم کال ٹریفک لاگ نہ ہو۔ یہ فلیگ `api_keys` ٹیبل (`no_log INTEGER DEFAULT 0`) میں موجود ہوتا ہے اور فوری راستے پر تلاش کے لیے ایک اِن-میموری سیٹ میں بھی نقل کیا جاتا ہے۔

```bash
# لاگ نہ کرنے والی کلید بنائیں (انتظامی تصدیق درکار ہے)
curl -X POST http://localhost:20128/api/keys \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{"name": "Privacy key", "noLog": true}'
```

معاون فنکشنز (`src/lib/compliance/index.ts`):

- `setNoLog(apiKeyId, true|false)` — اِن-میموری اندراج کو فعال یا غیر فعال کرتا ہے
- `isNoLog(apiKeyId)` — درخواست کے راستے پر جانچا جاتا ہے؛ بصورت دیگر `api_keys.no_log` سے 30 سیکنڈ کے لیے کیش شدہ ریڈ استعمال کرتا ہے
- `NO_LOG_API_KEY_IDS` (ماحولیاتی متغیر، کاما سے علیحدہ) — بوٹ کے وقت اِن-میموری سیٹ میں پہلے سے لوڈ کیا جاتا ہے؛ اس وقت مفید جب آپ کالم کو براہِ راست تبدیل نہ کر سکیں

انتظامی آڈٹ ایونٹس (لاگ اِن، فراہم کنندہ کی تبدیلیاں، MCP ٹول کالز، وغیرہ) `noLog` سے **متاثر نہیں** ہوتے — صرف فی درخواست ٹریفک لاگنگ سے آپٹ آؤٹ کیا جاتا ہے۔

## REST API

| اینڈ پوائنٹ                 | طریقہ | تفصیل                                     | توثیق      |
| --------------------------- | ----- | ----------------------------------------- | ---------- |
| `/api/compliance/audit-log` | `GET` | فلٹرز کے ساتھ صفحہ وار ایڈمن آڈٹ اندراجات | management |
| `/api/mcp/audit`            | `GET` | صفحہ وار MCP ٹول آڈٹ اندراجات             | (open-sse) |
| `/api/mcp/audit/stats`      | `GET` | مجموعی MCP آڈٹ اعداد و شمار               | (open-sse) |

فی الحال کوئی CSV ایکسپورٹ اینڈ پوائنٹ فراہم نہیں کیا گیا — ڈیش بورڈ سے ایکسپورٹ کریں یا
SQLite ڈیٹابیس سے براہِ راست استفسار کریں۔

### `/api/compliance/audit-log` سے استفسار کرنا

معاونت یافتہ کوئری پیرامیٹرز (سب اختیاری ہیں، اور متنی فلٹرز کے لیے سب
`LIKE %value%` مماثلت استعمال کرتے ہیں):

- `action`، `actor`، `target`، `resourceType` (یا `resource_type`)،
  `status`، `requestId` (یا `request_id`)
- `from` / `since`، `to` / `until` — ISO ٹائم اسٹیمپس
- `limit` (ڈیفالٹ `50`، کم از کم `1`، زیادہ سے زیادہ `500`)
- `offset` (ڈیفالٹ `0`، زیادہ سے زیادہ `10_000`)

جواب ایک JSON ارے ہوتا ہے۔ صفحہ بندی کا میٹا ڈیٹا ہیڈرز میں واپس کیا جاتا ہے:
`x-total-count`، `x-page-limit`، `x-page-offset`۔

```bash
curl "http://localhost:20128/api/compliance/audit-log?action=provider.credentials&from=2026-05-01" \
  -H "Cookie: auth_token=..."
```

## ڈیش بورڈ

ڈیش بورڈ آڈٹ ڈیٹا **`/dashboard/audit`**
(`src/app/(dashboard)/dashboard/audit/page.tsx`) پر فراہم کرتا ہے۔ اس صفحے میں دو ٹیب ہیں:

- **تعمیل** (`ComplianceTab.tsx`) — `/api/compliance/audit-log` سے ایڈمن آڈٹ واقعات۔
  ایونٹ کی قسم، شدت (معلوماتی / انتباہی / سنگین، جو action + status سے اخذ ہوتی ہے)،
  اور تاریخ کی حد کے لحاظ سے فلٹر کرتا ہے۔ شدت کا تعین کلائنٹ سائیڈ پر
  action/status اسٹرنگز سے کیا جاتا ہے۔
- **MCP** (`McpAuditTab.tsx`) — `/api/mcp/audit` سے MCP ٹول آڈٹ، جس میں
  ٹول کے نام اور کامیابی/ناکامی کے لحاظ سے فلٹرز موجود ہیں۔

دونوں ٹیب بالترتیب `50` (تعمیل) اور `25` (MCP) کے صفحہ سائز کے ساتھ صفحہ بندی کرتے ہیں۔

## فراہم کنندہ کی اسناد کے معاون فنکشنز

`src/lib/compliance/providerAudit.ts` ایسے ساخت سازی کے معاون فنکشنز فراہم کرتا ہے جنہیں
فراہم کنندہ کے انتظامی روٹس اسناد سے متعلق واقعات جاری کرتے وقت استعمال کرتے ہیں:

- `summarizeProviderConnectionForAudit(connection)` — کنکشن اسنیپ شاٹ کو
  `details` میں لکھے جانے سے پہلے `apiKey`، `accessToken`، `refreshToken`،
  `idToken`، اور `providerSpecificData.consoleApiKey` کو حذف کرتا ہے۔
- `getProviderAuditTarget(connection)` — `target` فیلڈ کے لیے ایک مستقل
  `"<provider>:<name|id>"` اسٹرنگ تشکیل دیتا ہے۔
- `extractProviderWarnings(...payloads)` — فراہم کنندہ کے جوابات میں
  پالیسی/حفاظتی انتباہات (`[sanitizer]`، `prompt injection detected`،
  `content has been filtered`، `safety filter`، `policy violation`) تلاش کرتا ہے اور
  زیادہ سے زیادہ 5 نتائج نمایاں کرتا ہے، جن میں سے ہر ایک کو 400 حروف تک محدود کیا جاتا ہے۔

## بہترین طریقۂ کار

- PII (قانونی، طبی وغیرہ) سنبھالنے والی API کلیدوں پر `noLog: true` کا نشان لگائیں۔
- اپنی برقرار رکھنے کی پالیسی کے مطابق `APP_LOG_RETENTION_DAYS` /
  `CALL_LOG_RETENTION_DAYS` کو ترتیب دیں۔ 7 دن کی ڈیفالٹ مدت محتاط رکھی گئی ہے۔
- اپنے تعمیلی پروگرام کی مطلوبہ مدت کے مطابق آڈٹ ٹیبل کو پلیٹ فارم سے باہر
  (`sqlite3 dump`) ایکسپورٹ کریں — کوئی پہلے سے موجود آرکائیونگ سہولت دستیاب نہیں ہے۔
- بروٹ فورس کی نشاندہی کے لیے `auth.login.failed` اور `auth.login.locked`
  کی تعداد پر نظر رکھیں۔
- نئے ایڈمن اینڈ پوائنٹس شامل کرتے وقت، ایک مستقل `domain.verb.outcome` ایکشن اسٹرنگ
  کے ساتھ `logAuditEvent({ ... })` کو کال کریں اور درخواست کا سیاق
  `getAuditRequestContext(request)` کے ذریعے پاس کریں، تاکہ IP اور `requestId`
  خودکار طور پر محفوظ ہو جائیں۔

## مزید دیکھیں

- [`docs/security/GUARDRAILS.md`](./GUARDRAILS.md) — PII ماسکنگ، پرامپٹ انجیکشن
- [`docs/frameworks/MCP-SERVER.md`](../frameworks/MCP-SERVER.md) — MCP ٹول کیٹلاگ اور اسکوپس
- [`docs/reference/ENVIRONMENT.md`](../reference/ENVIRONMENT.md) — ماحول کے متغیرات کا مکمل حوالہ
- ماخذ: `src/lib/compliance/`, `src/app/api/compliance/`,
  `src/app/api/mcp/audit/`, `src/lib/logEnv.ts`
