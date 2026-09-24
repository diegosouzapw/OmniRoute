# Compliance & Audit (العربية)

🌐 **Languages:** 🇺🇸 [English](../../../../security/COMPLIANCE.md) · 🇪🇹 [am](../../../am/docs/security/COMPLIANCE.md) · 🇦🇿 [az](../../../az/docs/security/COMPLIANCE.md) · 🇧🇬 [bg](../../../bg/docs/security/COMPLIANCE.md) · 🇧🇩 [bn](../../../bn/docs/security/COMPLIANCE.md) · 🇧🇦 [bs](../../../bs/docs/security/COMPLIANCE.md) · 🇨🇿 [cs](../../../cs/docs/security/COMPLIANCE.md) · 🇩🇰 [da](../../../da/docs/security/COMPLIANCE.md) · 🇩🇪 [de](../../../de/docs/security/COMPLIANCE.md) · 🇬🇷 [el](../../../el/docs/security/COMPLIANCE.md) · 🇪🇸 [es](../../../es/docs/security/COMPLIANCE.md) · 🇪🇪 [et](../../../et/docs/security/COMPLIANCE.md) · 🇮🇷 [fa](../../../fa/docs/security/COMPLIANCE.md) · 🇫🇮 [fi](../../../fi/docs/security/COMPLIANCE.md) · 🇫🇷 [fr](../../../fr/docs/security/COMPLIANCE.md) · 🇮🇪 [ga](../../../ga/docs/security/COMPLIANCE.md) · 🇮🇳 [gu](../../../gu/docs/security/COMPLIANCE.md) · 🇳🇬 [ha](../../../ha/docs/security/COMPLIANCE.md) · 🇮🇱 [he](../../../he/docs/security/COMPLIANCE.md) · 🇮🇳 [hi](../../../hi/docs/security/COMPLIANCE.md) · 🇭🇷 [hr](../../../hr/docs/security/COMPLIANCE.md) · 🇭🇺 [hu](../../../hu/docs/security/COMPLIANCE.md) · 🇦🇲 [hy](../../../hy/docs/security/COMPLIANCE.md) · 🇮🇩 [id](../../../id/docs/security/COMPLIANCE.md) · 🇳🇬 [ig](../../../ig/docs/security/COMPLIANCE.md) · 🇮🇹 [it](../../../it/docs/security/COMPLIANCE.md) · 🇯🇵 [ja](../../../ja/docs/security/COMPLIANCE.md) · 🇬🇪 [ka](../../../ka/docs/security/COMPLIANCE.md) · 🇰🇭 [km](../../../km/docs/security/COMPLIANCE.md) · 🇮🇳 [kn](../../../kn/docs/security/COMPLIANCE.md) · 🇰🇷 [ko](../../../ko/docs/security/COMPLIANCE.md) · 🇱🇹 [lt](../../../lt/docs/security/COMPLIANCE.md) · 🇱🇻 [lv](../../../lv/docs/security/COMPLIANCE.md) · 🇮🇳 [ml](../../../ml/docs/security/COMPLIANCE.md) · 🇮🇳 [mr](../../../mr/docs/security/COMPLIANCE.md) · 🇲🇾 [ms](../../../ms/docs/security/COMPLIANCE.md) · 🇲🇹 [mt](../../../mt/docs/security/COMPLIANCE.md) · 🇲🇲 [my](../../../my/docs/security/COMPLIANCE.md) · 🇳🇵 [ne](../../../ne/docs/security/COMPLIANCE.md) · 🇳🇱 [nl](../../../nl/docs/security/COMPLIANCE.md) · 🇳🇴 [no](../../../no/docs/security/COMPLIANCE.md) · 🇮🇳 [or](../../../or/docs/security/COMPLIANCE.md) · 🇮🇳 [pa](../../../pa/docs/security/COMPLIANCE.md) · 🇵🇭 [phi](../../../phi/docs/security/COMPLIANCE.md) · 🇵🇱 [pl](../../../pl/docs/security/COMPLIANCE.md) · 🇵🇹 [pt](../../../pt/docs/security/COMPLIANCE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/COMPLIANCE.md) · 🇷🇴 [ro](../../../ro/docs/security/COMPLIANCE.md) · 🇷🇺 [ru](../../../ru/docs/security/COMPLIANCE.md) · 🇱🇰 [si](../../../si/docs/security/COMPLIANCE.md) · 🇸🇰 [sk](../../../sk/docs/security/COMPLIANCE.md) · 🇸🇮 [sl](../../../sl/docs/security/COMPLIANCE.md) · 🇷🇸 [sr](../../../sr/docs/security/COMPLIANCE.md) · 🇸🇪 [sv](../../../sv/docs/security/COMPLIANCE.md) · 🇰🇪 [sw](../../../sw/docs/security/COMPLIANCE.md) · 🇮🇳 [ta](../../../ta/docs/security/COMPLIANCE.md) · 🇮🇳 [te](../../../te/docs/security/COMPLIANCE.md) · 🇹🇭 [th](../../../th/docs/security/COMPLIANCE.md) · 🇹🇷 [tr](../../../tr/docs/security/COMPLIANCE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/COMPLIANCE.md) · 🇵🇰 [ur](../../../ur/docs/security/COMPLIANCE.md) · 🇺🇿 [uz](../../../uz/docs/security/COMPLIANCE.md) · 🇻🇳 [vi](../../../vi/docs/security/COMPLIANCE.md) · 🇳🇬 [yo](../../../yo/docs/security/COMPLIANCE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/COMPLIANCE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/COMPLIANCE.md)

---

> **مصدر الحقيقة:** `src/lib/compliance/`، `src/app/api/compliance/`
> **آخر تحديث:** 2026-06-28 — v3.8.40

يسجّل OmniRoute الإجراءات الإدارية وأحداث المصادقة وتغييرات دورة حياة بيانات اعتماد المزوّد واستدعاءات أدوات MCP في جداول تدقيق مدعومة بقاعدة بيانات SQLite. توضّح هذه الصفحة ما يتم تسجيله، ومكان تخزينه، ومدة الاحتفاظ به، وكيف يمكن لمفاتيح API إلغاء الاشتراك، وكيفية الاستعلام عن البيانات.

يوجد التنفيذ في `src/lib/compliance/index.ts` ‏(T-43 — «عناصر التحكم في الامتثال») و`src/lib/compliance/providerAudit.ts`. لا تطرح عمليات كتابة التدقيق أي استثناءات مطلقًا: عند حدوث أي فشل، يتم تجاهل الاستدعاء بصمت حتى لا يؤدي تسجيل التدقيق إلى تعطيل مسار الطلب الرئيسي.

## ما يتم تسجيله

### أحداث التدقيق الإدارية (`audit_log`)

ينتج كل استدعاء لـ`logAuditEvent({ action, actor, target, details, ... })` صفًا واحدًا. تتبع سلاسل الإجراءات نمط `domain.verb` (أو `domain.verb.outcome`). تشمل أنواع الإجراءات المؤكدة في شجرة المصدر ما يلي:

| الإجراء                              | المصدر                                  |
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

يلتقط كل إدخال `action` و`actor` (القيمة الافتراضية هي `"system"`) و`target` و`details`/`metadata` ‏(JSON) و`ip_address` و`resource_type` و`status` و`request_id` و`timestamp`. تُحجب المفاتيح الحساسة (`apiKey` و`accessToken` و`refreshToken` و`password` وأي مفتاح يطابق `*token`/`*secret`/`*apikey` وما إلى ذلك) بشكل تكراري وتُستبدل بـ`"[redacted]"` قبل كتابة الصف.

### استدعاءات أدوات MCP ‏(`mcp_tool_audit`)

يكتب كل استدعاء لأداة MCP صفًا من خلال `open-sse/mcp-server/audit.ts`. المخطط (من `src/lib/db/migrations/002_mcp_a2a_tables.sql`):

| العمود           | ملاحظات                                    |
| ---------------- | ------------------------------------------ |
| `id`             | زيادة تلقائية                              |
| `tool_name`      | معرّف أداة MCP                             |
| `input_hash`     | تجزئة sha256 للمدخلات (لا تُخزَّن الحمولة) |
| `output_summary` | ملخص قصير ومقتطع                           |
| `duration_ms`    | الزمن المنقضي                              |
| `api_key_id`     | المستدعي (يمكن أن تكون قيمته خالية)        |
| `success`        | `1` / `0`                                  |
| `error_code`     | رمز الخطأ النهائي عند الفشل                |
| `created_at`     | طابع زمني بتنسيق ISO                       |

### سجلات الطلبات / الاستخدام

تمثل هذه السجلات قياسات تشغيلية (وليست تدقيقًا إداريًا بالمعنى الدقيق)، لكنها تشترك في مسار الاحتفاظ نفسه:

- `usage_history` — تجميع الاستخدام لكل طلب
- `call_logs` — سجل كامل لكل طلب (يخضع لحد أقصى لعدد الصفوف، انظر أدناه)
- `proxy_logs` — سجل حركة مرور الوكيل (يخضع لحد أقصى لعدد الصفوف)
- `request_detail_logs` — سجل قديم لتفاصيل الطلبات (يظل خاضعًا للتنقية إذا كان موجودًا)

## مخطط التخزين

يُنشأ `audit_log` بشكل مؤجل بواسطة `ensureAuditLogSchema()` عند أول استخدام:

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

تُنشأ الفهارس على `timestamp` و`action` و`actor` و`resource_type`
و`status` و`request_id`. وتُضاف الأعمدة المفقودة في قواعد البيانات القديمة عبر
`ALTER TABLE` عند الحاجة.

## الاحتفاظ والتنظيف

تُراعى نافذتان منفصلتان للاحتفاظ:

| متغير البيئة                | القيمة الافتراضية | ينطبق على                                                         |
| --------------------------- | ----------------- | ----------------------------------------------------------------- |
| `APP_LOG_RETENTION_DAYS`    | `7`               | `audit_log`، `mcp_tool_audit`                                     |
| `CALL_LOG_RETENTION_DAYS`   | `7`               | `usage_history`، `call_logs`، `proxy_logs`، `request_detail_logs` |
| `CALL_LOGS_TABLE_MAX_ROWS`  | `100000`          | تقليص `call_logs` وفق الحد الأقصى للصفوف                          |
| `PROXY_LOGS_TABLE_MAX_ROWS` | `100000`          | تقليص `proxy_logs` وفق الحد الأقصى للصفوف                         |

تُشغّل `cleanupExpiredLogs()` عملية الاحتفاظ. ويجري استدعاؤها عند بدء تشغيل الخادم
من `src/instrumentation-node.ts`. ويسجّل كل تشغيل حدث تدقيق
`compliance.cleanup` يتضمن أعداد العناصر المحذوفة لكل جدول. يُنفّذ تقليص سجلات الوكيل/الاستدعاءات
على دفعات (`BATCH_SIZE = 5000`) لتجنب أقفال الكتابة طويلة الأمد.

يكون التنظيف اليدوي لسجل الطلبات منفصلًا عن عملية الاحتفاظ. تستدعي صفحة سجلات الطلبات
`POST /api/settings/purge-request-history`، الذي يحذف `call_logs`
و`request_detail_logs` القديم، وآثار الطلبات المحلية الموجودة ضمن
`${DATA_DIR}/call_logs/`.

تُعرّف القيم الافتراضية في `src/lib/logEnv.ts`
(`DEFAULT_APP_LOG_RETENTION_DAYS = 7`، و`DEFAULT_CALL_LOG_RETENTION_DAYS = 7`).

## إلغاء الاشتراك عبر `noLog` (لكل مفتاح API)

يمكن تمييز مفاتيح API بحيث لا تُسجّل حركة استدعاءاتها اللاحقة. توجد
العلامة في جدول `api_keys` (`no_log INTEGER DEFAULT 0`)، وتُنسخ أيضًا
إلى مجموعة في الذاكرة لإجراء عمليات البحث في المسار السريع.

```bash
# إنشاء مفتاح لا يسجّل البيانات (مصادقة الإدارة مطلوبة)
curl -X POST http://localhost:20128/api/keys \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{"name": "Privacy key", "noLog": true}'
```

الدوال المساعدة (`src/lib/compliance/index.ts`):

- `setNoLog(apiKeyId, true|false)` — تبديل الإدخال الموجود في الذاكرة
- `isNoLog(apiKeyId)` — يُتحقق منها في مسار الطلب؛ وتعود إلى قراءة مخزنة مؤقتًا لمدة 30 ثانية
  من `api_keys.no_log`
- `NO_LOG_API_KEY_IDS` (متغير بيئة، مفصول بفواصل) — يُحمّل مسبقًا إلى المجموعة الموجودة في الذاكرة
  عند بدء التشغيل؛ وهو مفيد عندما يتعذر تبديل العمود مباشرةً

لا تتأثر أحداث التدقيق الإدارية (تسجيل الدخول، وتغييرات موفر الخدمة، واستدعاءات أدوات MCP، وما إلى ذلك)
بـ `noLog` — إذ يقتصر إلغاء الاشتراك على تسجيل حركة المرور لكل طلب.

## واجهة REST API

| نقطة النهاية                | الطريقة | الوصف                                       | المصادقة   |
| --------------------------- | ------- | ------------------------------------------- | ---------- |
| `/api/compliance/audit-log` | `GET`   | إدخالات تدقيق إدارية مُرقّمة مع عوامل تصفية | management |
| `/api/mcp/audit`            | `GET`   | إدخالات تدقيق أدوات MCP مُرقّمة             | (open-sse) |
| `/api/mcp/audit/stats`      | `GET`   | إحصاءات تدقيق MCP مُجمّعة                   | (open-sse) |

لا تتوفر حاليًا نقطة نهاية لتصدير CSV — يمكنك التصدير من لوحة المعلومات أو الاستعلام
عن قاعدة بيانات SQLite مباشرةً.

### الاستعلام عن `/api/compliance/audit-log`

معاملات الاستعلام المدعومة (كلها اختيارية، وتستخدم جميع عوامل تصفية النصوص مطابقة
`LIKE %value%`):

- `action`، `actor`، `target`، `resourceType` (أو `resource_type`)،
  `status`، `requestId` (أو `request_id`)
- `from` / `since`، `to` / `until` — طوابع زمنية بتنسيق ISO
- `limit` (القيمة الافتراضية `50`، الحد الأدنى `1`، الحد الأقصى `500`)
- `offset` (القيمة الافتراضية `0`، الحد الأقصى `10_000`)

الاستجابة عبارة عن مصفوفة JSON. تُعاد بيانات ترقيم الصفحات الوصفية في الترويسات:
`x-total-count`، `x-page-limit`، `x-page-offset`.

```bash
curl "http://localhost:20128/api/compliance/audit-log?action=provider.credentials&from=2026-05-01" \
  -H "Cookie: auth_token=..."
```

## لوحة المعلومات

تعرض لوحة المعلومات بيانات التدقيق في **`/dashboard/audit`**
(`src/app/(dashboard)/dashboard/audit/page.tsx`). تحتوي الصفحة على علامتي تبويب:

- **الامتثال** (`ComplianceTab.tsx`) — أحداث تدقيق الإدارة من
  `/api/compliance/audit-log`. يمكن التصفية حسب نوع الحدث ومستوى الخطورة (معلومات /
  تحذير / حرج، مشتق من الإجراء + الحالة) والنطاق الزمني. يُحسب مستوى الخطورة
  من جانب العميل استنادًا إلى سلاسل الإجراء/الحالة.
- **MCP** (`McpAuditTab.tsx`) — تدقيق أدوات MCP من `/api/mcp/audit`، مع
  عوامل تصفية حسب اسم الأداة والنجاح/الفشل.

تستخدم علامتا التبويب ترقيم الصفحات بحجم `50` (الامتثال) و`25` (MCP) لكل صفحة.

## دوال بيانات اعتماد المزوّد المساعدة

يوفّر `src/lib/compliance/providerAudit.ts` دوال مساعدة لتشكيل البيانات تستخدمها
مسارات إدارة المزوّدين عند إصدار أحداث بيانات الاعتماد:

- `summarizeProviderConnectionForAudit(connection)` — يزيل `apiKey`،
  و`accessToken`، و`refreshToken`، و`idToken`،
  و`providerSpecificData.consoleApiKey` قبل كتابة لقطة الاتصال في
  `details`.
- `getProviderAuditTarget(connection)` — ينشئ سلسلة ثابتة
  `"<provider>:<name|id>"` للحقل `target`.
- `extractProviderWarnings(...payloads)` — يفحص استجابات المزوّد بحثًا عن
  تحذيرات السياسة/السلامة (`[sanitizer]`، و`prompt injection detected`،
  و`content has been filtered`، و`safety filter`، و`policy violation`) ويُظهر
  ما يصل إلى 5 نتائج، مع اقتطاع كل منها إلى 400 محرف.

## أفضل الممارسات

- ميّز مفاتيح API التي تتعامل مع معلومات التعريف الشخصية (قانونية، طبية، إلخ) باستخدام `noLog: true`.
- اضبط `APP_LOG_RETENTION_DAYS` / `CALL_LOG_RETENTION_DAYS` بما يتوافق مع
  سياسة الاحتفاظ لديك. القيم الافتراضية البالغة 7 أيام متحفظة.
- صدّر جدول التدقيق إلى خارج المنصة (`sqlite3 dump`) وفق الوتيرة التي
  يتطلبها برنامج الامتثال لديك — لا توجد أرشفة مضمّنة.
- تتبّع أعداد `auth.login.failed` و`auth.login.locked` لاكتشاف هجمات
  القوة الغاشمة.
- عند إضافة نقاط نهاية إدارية جديدة، استدعِ `logAuditEvent({ ... })` باستخدام سلسلة إجراء ثابتة
  بنمط `domain.verb.outcome`، ومرّر سياق الطلب عبر
  `getAuditRequestContext(request)` بحيث يتم التقاط عنوان IP و`requestId`
  تلقائيًا.

## انظر أيضًا

- [`docs/security/GUARDRAILS.md`](./GUARDRAILS.md) — إخفاء معلومات التعريف الشخصية، وحقن المطالبات
- [`docs/frameworks/MCP-SERVER.md`](../frameworks/MCP-SERVER.md) — دليل أدوات MCP ونطاقاتها
- [`docs/reference/ENVIRONMENT.md`](../reference/ENVIRONMENT.md) — مرجع كامل لمتغيرات البيئة
- المصدر: `src/lib/compliance/`، `src/app/api/compliance/`،
  `src/app/api/mcp/audit/`، `src/lib/logEnv.ts`
