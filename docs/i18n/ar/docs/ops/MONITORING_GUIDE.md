# Monitoring & Observability Guide (العربية)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MONITORING_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/MONITORING_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/MONITORING_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/MONITORING_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/MONITORING_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/MONITORING_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/MONITORING_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/MONITORING_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/MONITORING_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/MONITORING_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/MONITORING_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/MONITORING_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/MONITORING_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/MONITORING_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/MONITORING_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/MONITORING_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/MONITORING_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/MONITORING_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/MONITORING_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/MONITORING_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/MONITORING_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/MONITORING_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/MONITORING_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/MONITORING_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/MONITORING_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/MONITORING_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/MONITORING_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/MONITORING_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/MONITORING_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/MONITORING_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/MONITORING_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/MONITORING_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/MONITORING_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/MONITORING_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/MONITORING_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/MONITORING_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/MONITORING_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MONITORING_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/MONITORING_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/MONITORING_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/MONITORING_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/MONITORING_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/MONITORING_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/MONITORING_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/MONITORING_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/MONITORING_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/MONITORING_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/MONITORING_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MONITORING_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/MONITORING_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/MONITORING_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/MONITORING_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MONITORING_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MONITORING_GUIDE.md)

---

> **باختصار**: يأتي OmniRoute مزودًا بمراقبة مدمجة للصحة، وقيادة تلقائية لموفّري الخدمة، وتتبع للحصص، وخطافات لقابلية الرصد. يغطي هذا الدليل لوحة المعلومات والتنبيهات واستكشاف الأخطاء وإصلاحها.

**المصادر:**

- `src/lib/monitoring/observability.ts` — لقطة قابلية الرصد
- `src/lib/monitoring/comboHealthAutopilot.ts` — القيادة التلقائية لصحة التركيبات
- `src/lib/monitoring/providerHealthAutopilot.ts` — القيادة التلقائية لموفّر الخدمة
- `src/lib/monitoring/providerHealthMatrix.ts` — مصفوفة صحة موفّري الخدمة
- `src/lib/localHealthCheck.ts` — فحص الصحة المحلي
- `src/lib/tokenHealthCheck.ts` — صحة تحديث الرمز المميز
- `src/lib/proxyHealth.ts` — ذاكرة التخزين المؤقت لصحة الوكيل (موضحة في PROXY_GUIDE.md)

---

## نظرة عامة

يحتوي OmniRoute على **3 طبقات للمراقبة**:

```
┌──────────────────────────────────────────────────────────────┐
│  الطبقة 1: صحة النظام (على مستوى الخادم)                     │
│  ├─ localHealthCheck.ts — قاعدة البيانات، المنافذ، التبعيات الأصلية │
│  ├─ db/healthCheck.ts — التكامل، المفاتيح الخارجية، العناصر المعزولة │
│  └─ لوحة المعلومات: /dashboard/health                       │
├──────────────────────────────────────────────────────────────┤
│  الطبقة 2: صحة موفّر الخدمة (المرونة لكل موفّر)              │
│  ├─ providerHealthAutopilot.ts — قاطع الدائرة، فترات التهدئة │
│  ├─ providerHealthMatrix.ts — درجات الصحة حسب الموفّر/النموذج │
│  └─ لوحة المعلومات: /dashboard/providers                    │
├──────────────────────────────────────────────────────────────┤
│  الطبقة 3: قابلية الرصد المباشر (لقطات وقت التشغيل)          │
│  ├─ observability.ts — قواطع الدائرة، الجلسات، الحصة         │
│  ├─ tokenHealthCheck.ts — صحة تحديث رمز OAuth المميز         │
│  └─ أدوات MCP: omniroute_get_health، omniroute_get_session_snapshot │
└──────────────────────────────────────────────────────────────┘
```

---

## صفحات لوحة المعلومات

### `/dashboard/health` (صحة النظام)

تعرض لوحة معلومات الصحة ذات المستوى الأعلى ما يلي:

| القسم               | ما يعرضه                                          |
| ------------------- | ------------------------------------------------- |
| **حالة الخادم**     | مدة التشغيل، الإصدار، المنفذ، الاتصالات النشطة    |
| **قاعدة البيانات**  | الاتصال، التكامل، حجم WAL، عمليات الترحيل الأخيرة |
| **ملخص الموفّرين**  | العدد النشط، العدد السليم، عدد القواطع المفتوحة   |
| **مراقبو الحصص**    | الجلسات النشطة، التنبيهات، الحصص المستنفدة        |
| **الأخطاء الأخيرة** | آخر 10 أخطاء مع تتبعات المكدس                     |
| **استخدام الموارد** | الذاكرة، وحدة المعالجة المركزية، مؤشر ضغط الكومة  |

### `/dashboard/providers` (صحة موفّر الخدمة)

لوحة معلومات لكل موفّر خدمة:

| العمود    | الوصف                                          |
| --------- | ---------------------------------------------- |
| الموفّر   | معرّف الموفّر + اسم العرض                      |
| الصحة     | حالة خضراء/صفراء/حمراء                         |
| الدائرة   | حالة مفتوحة/مغلقة/نصف مفتوحة                   |
| الاتصالات | عدد الاتصالات، آخر تحديث                       |
| النماذج   | النماذج المتاحة، الصحة لكل نموذج               |
| التكلفة   | تكلفة اليوم، اتجاه 7 أيام                      |
| الأخطاء   | عدد أخطاء آخر 24 ساعة، فئة الخطأ الأكثر شيوعًا |

انقر فوق موفّر خدمة للاطلاع على:

- الطلبات الأخيرة مع تفصيل زمن الاستجابة
- درجات الصحة لكل اتصال
- عمليات القفل لكل نموذج
- توصيات القيادة التلقائية

### `/dashboard/quota` (تتبع الحصص)

لكل مفتاح API:

- الاستخدام الحالي مقابل الحد (شريط تقدم)
- اتجاه الحصة (مخطط لمدة 30 يومًا)
- وقت إعادة التعيين التالي
- سجل التنبيهات

### `/dashboard/combos` (صحة التركيبات)

لكل تركيبة:

- الاستراتيجية + الأهداف
- الصحة لكل هدف
- أحداث الرجوع الاحتياطي الأخيرة
- معدل النجاح (24 ساعة، 7 أيام، 30 يومًا)

---

## واجهة API للتحقق من الصحة

يوفّر OmniRoute **واجهتين** HTTP للتحقق من الصحة. ولا يمكن استخدامهما بالتبادل مع أنظمة التنسيق.

| المسار                       | الغرض                                                                                  | التكلفة                                           | الاستخدام                                                                     |
| ---------------------------- | -------------------------------------------------------------------------------------- | ------------------------------------------------- | ----------------------------------------------------------------------------- |
| `GET /healthz`               | التحقق من حيوية/جاهزية دورة الحياة (`ok` / `starting` / `stopping`)                    | ضئيلة (علامة المرحلة فقط)                         | **الجاهزية** في Kubernetes؛ و**الحيوية** المرنة إذا كان لا بد من استخدام HTTP |
| `GET /api/monitoring/health` | ملخص متعمق للنظام + المزوّدين (قاعدة البيانات، الذاكرة الديناميكية، أعداد الكتالوج، …) | مرتفعة (عمل متزامن على قاعدة البيانات / المراقبة) | لوحات المعلومات، وفحوصات blackbox المتعمقة، وفحص الصحة المدمج في Docker       |

> **ملاحظة:** تتوفر مصفوفات صحة المزوّدين، ومشكلات التشغيل التلقائي، ومراقبات الحصص، وصحة الرموز المميزة، وتفاصيل زمن الاستجابة التي تتجاوز `/api/monitoring/health` عبر **أداة MCP** المسماة `observability_snapshot` أو صفحات **لوحة المعلومات** — ولا توجد مسارات REST مخصصة لها.

يعمل كلا المسارين على **حلقة أحداث Node نفسها** المستخدمة لمعالجة الطلبات. يمكن لمسار كثيف الاستخدام لوحدة المعالجة المركزية (مثل معالجة كتالوج كبير عبر `GET /v1/models`، أو ضغط السياق الطويل / عدّ الرموز المميزة) أن يؤخر **جميع** معالجات HTTP، بما فيها `/healthz`. انشغال حلقة الأحداث ≠ توقف العملية. يُفضّل إصلاح سبب الاستهلاك؛ إذ إن ضبط الفحوصات لا يؤدي إلا إلى تقليل حالات الإنهاء الخاطئة.

### فحص خفيف لأنظمة التنسيق

```bash
GET /healthz
# أو HEAD /healthz
```

- **200** + النص `ok` عندما تكون مرحلة دورة حياة الخادم جاهزة
- **503** + `starting` / `stopping` أثناء بدء التشغيل أو إيقافه
- التنفيذ: `src/app/healthz/route.ts` (من دون فحص اتصال بقاعدة البيانات)

### صحة النظام (فحص متعمق)

```bash
GET /api/monitoring/health
```

الاستجابة:

```json
{
  "status": "healthy",
  "version": "3.8.16",
  "uptime": 123456,
  "checks": {
    "database": { "status": "pass", "latency_ms": 2 },
    "writeable": { "status": "pass" },
    "integrity": { "status": "pass", "result": "ok" },
    "foreign_keys": { "status": "pass", "violations": 0 },
    "heap_pressure": { "status": "pass", "usage_mb": 142, "threshold_mb": 512 },
    "active_sessions": 12,
    "providers": {
      "total": 7,
      "healthy": 6,
      "degraded": 1,
      "down": 0
    }
  }
}
```

#### `credentialHealth`: ذاكرة الفحص المؤقتة مقابل `test_status` في SQLite

تمثل `credentialHealth` ضمن `GET /api/monitoring/health` **مقياس ذاكرة الفحص المؤقتة
داخل الذاكرة**، وليست نسخة حية من `provider_connections.test_status`. بعد #12532، لا
يقرأ مسار الطلب سوى `getCachedCredentialHealthSummary()`؛ وتُحدّث فحوصات الخلفية
ذاكرة التخزين المؤقت خارج حلقة الأحداث.

| الطبقة                    | الموقع                                                                | ما تعنيه                                                                                                                                                                                                                                  |
| ------------------------- | --------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| مقياس ذاكرة الفحص المؤقتة | `credentialHealth.total` / `healthy` / `failed` / `unknown` / `stale` | أحدث نتائج فحص صحة بيانات الاعتماد التي ما زالت محفوظة في ذاكرة العملية. تكون قيمة `source` دائمًا `probe-cache`.                                                                                                                         |
| تفاصيل الاتصال الفاشل     | `credentialHealth.failedConnections`                                  | تظهر **فقط عندما تكون `failed > 0`**. قائمة محدودة من صفوف ذاكرة التخزين المؤقت ذات `status=error` (`connectionId`، و`status`، و`lastError` / `lastErrorType` المنقّحتين). تُعيّن `failedOmitted` عندما تكون القائمة قد بلغت حدها الأقصى. |
| الحالة الثابتة في SQLite  | `credentialHealth.staleDbNonOkCount`                                  | عدد صفوف الاتصالات **النشطة** (`is_active=1`) التي تكون قيمة `test_status` المحفوظة لها حالة معروفة غير سليمة (`error`، أو `expired`، أو `credits_exhausted`، أو `banned`، أو `deactivated`، أو `unavailable`).                           |

قد تختلف الطبقتان عن قصد:

- المقياس `failed=0` بينما `staleDbNonOkCount>0` — لا تزال SQLite تحتوي على
  قيمة `test_status` ثابتة (مثل `expired` أو `credits_exhausted`) لا تحتسبها
  أحدث لقطة من ذاكرة الفحص المؤقتة على أنها `status=error`.
- المقياس `failed>0` بينما تبدو SQLite سليمة — فشل فحص حديث وهو
  مخزّن مؤقتًا؛ ولم يُحدَّث صف قاعدة البيانات، أو جرى مسحه لاحقًا.

لا تُنشئ تنبيهًا استنادًا إلى `provider_connections.test_status` وحدها عند جمع البيانات من
نقطة النهاية هذه. استخدم `failed` + `failedConnections` لأعطال الفحص الحية، واستخدم
`staleDbNonOkCount` عندما تحتاج إلى عدد الحالات الثابتة المحفوظة.

### توصيات فحوصات Kubernetes

OmniRoute هو **عملية Node واحدة** (حلقة أحداث واحدة). يستهدف `HEALTHCHECK` القياسي في Docker المسار الخفيف `/healthz`. ويُعد `/api/monitoring/health` **ثقيلاً جدًا** بالنسبة إلى فواصل فحص الحيوية في kubelet.

| الفحص             | الهدف الموصى به                                                                                       | ملاحظات                                                                                                                                                                                                                                                                                                                                          |
| ----------------- | ----------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **بدء التشغيل**   | طلب HTTP من نوع `GET /healthz` مع قيمة `failureThreshold` طويلة (أو `startPeriod` كبيرة)              | قد يستغرق بدء التشغيل البارد + ترحيل SQLite أكثر من بضع ثوانٍ                                                                                                                                                                                                                                                                                    |
| **الجاهزية**      | طلب HTTP من نوع `GET /healthz`                                                                        | حالات دورة الحياة `ok` / `starting` / `stopping` ‏(200 مقابل 503). يظل الفحص متذبذبًا إذا كانت الحلقة محجوبة بسبب وحدة المعالجة المركزية. **الحصول على 200 بعد عدة ثوانٍ لا يعني أن الخدمة سليمة** (#10303) — بل يعني أن حلقة الأحداث كانت محرومة من وقت التنفيذ قبل تشغيل المعالج ذي الـ3 بايتات                                                |
| **الحيوية**       | طلب HTTP من نوع `GET /livez`، **أو TCP** على منفذ الخدمة الرئيسي (`PORT`، والقيمة الافتراضية `20128`) | المسار `/livez` يفحص فقط ما إذا كانت العملية قيد التشغيل (ويُرجع دائمًا 200 إذا عمل المعالج). لكنه يشارك حلقة الأحداث أيضًا — الانشغال ≠ التوقف، ولا يكتشف حرمان حلقة الأحداث (#10303) بصورة أفضل من TCP. فضّل **TCP** إذا انتهت مهلة فحوص HTTP تحت حمل الكتالوج/الضغط؛ وفي كلتا الحالتين، **لا** تُنهِ الـpod بسبب توقفات قصيرة في حلقة الأحداث |
| **الفحص المتعمق** | `GET /api/monitoring/health` من أداة فحص خارجية                                                       | غير مخصص لـ`livenessProbe` الخاص بـkubelet أو لـ`readinessProbe` ذي الفواصل الزمنية القصيرة                                                                                                                                                                                                                                                      |

مثال على البنية (اضبط الحدود وفقًا لحمل بدء التشغيل البارد والضغط لديك):

```yaml
ports:
  - name: http
    containerPort: 20128
startupProbe:
  httpGet:
    path: /healthz
    port: http
  failureThreshold: 30
  periodSeconds: 5
readinessProbe:
  httpGet:
    path: /healthz
    port: http
  periodSeconds: 5
  timeoutSeconds: 2
  failureThreshold: 6
livenessProbe:
  httpGet:
    path: /livez
    port: http
  periodSeconds: 10
  timeoutSeconds: 3
  failureThreshold: 6
  # عند توقف حلقة الأحداث، قد تنتهي مهلة HTTP /livez أيضًا. ويُعد TCP
  # البديل الأكثر تحفظًا:
  # tcpSocket:
  #   port: http
```

**لا** توجّه فحص **الحيوية** الخاص بـkubelet إلى `/api/monitoring/health`. ينفّذ هذا المسار عملًا فعليًا على قاعدة البيانات/المراقبة، وسيعطي نتائج إيجابية زائفة تحت الحمل.

ذات صلة: [#10052](https://github.com/diegosouzapw/OmniRoute/issues/10052) (الفحوص عندما تكون حلقة الأحداث مشغولة)، [#9685](https://github.com/diegosouzapw/OmniRoute/issues/9685) / [#10055](https://github.com/diegosouzapw/OmniRoute/pull/10055) (استحواذ تسعير الكتالوج على الموارد)، [#10117](https://github.com/diegosouzapw/OmniRoute/issues/10117) (استحواذ عدّ رموز الضغط على الموارد).

### عمل اختياري في مسار الطلب (الذاكرة، والمهارات، وتحديث الرمز المميز)

تشارك عملية استخراج الذاكرة وحقن المهارات وتحديث رمز OAuth المميز **حلقة أحداث Node الرئيسية** مع `/healthz`. وهي ميزات يمكن تبديلها من لوحة المعلومات (`memoryEnabled` و`skillsEnabled`)، وليست مجموعة عمّال. راجع [البيئة — تكلفة الذاكرة والمهارات وتحديث الرمز المميز على حلقة الأحداث](../reference/ENVIRONMENT.md#event-loop-cost-of-memory-skills-and-token-refresh-10349).

### صحة موفّر الخدمة

> **لا توجد نقطة نهاية REST.** تتوفر بيانات صحة موفّر الخدمة عبر أداة MCP المسماة `observability_snapshot` أو صفحة لوحة المعلومات `/dashboard/providers`.

### تفاصيل موفّر الخدمة

> **لا توجد نقطة نهاية REST.** تتوفر تفاصيل كل موفّر خدمة عبر صفحة لوحة المعلومات `/dashboard/providers`.

---

## الطيار الآلي لصحة المزوّد

الوحدة `providerHealthAutopilot.ts` هي **نظام ذاتي الإصلاح** يقوم بما يلي:

1. يكتشف مشكلات المزوّد (فتح قاطع الدائرة، وفترات التهدئة، وحالات الحظر، وتحذيرات الحصة)
2. يُنشئ **إجراءات موصى بها** لحلها
3. ينفّذ اختياريًا الإجراءات منخفضة المخاطر **تلقائيًا**

### أنواع المشكلات المكتشفة

| نوع المشكلة                  | الخطورة | مثال على الحالة                    |
| ---------------------------- | ------- | ---------------------------------- |
| `provider_circuit_open`      | حرجة    | فتح قاطع الدائرة بعد 5 حالات فشل   |
| `provider_circuit_half_open` | تحذير   | الدائرة تختبر التعافي              |
| `connection_cooldown`        | تحذير   | الاتصال في فترة تهدئة بعد 429      |
| `stale_connection_error`     | تحذير   | فشل آخر تحديث منذ أكثر من 30 دقيقة |
| `terminal_connection_error`  | حرجة    | إلغاء OAuth أو عدم صلاحية المفتاح  |
| `inactive_connection`        | معلومات | الاتصال معطّل في الإعدادات         |
| `model_lockout`              | تحذير   | نموذج محدد قيد العزل               |
| `quota_monitor_warning`      | تحذير   | استهلاك الحصة بنسبة 80% أو أكثر    |

### أنواع الإجراءات المُنشأة

| الإجراء                        | المخاطر | الوصف                                 |
| ------------------------------ | ------- | ------------------------------------- |
| `clear_provider_breaker`       | متوسطة  | إعادة ضبط قاطع الدائرة إلى حالة مغلقة |
| `clear_connection_cooldown`    | منخفضة  | إزالة فترة التهدئة من اتصال           |
| `clear_stale_connection_error` | منخفضة  | مسح علامة الخطأ القديم                |
| `clear_model_lockout`          | منخفضة  | إعادة تمكين نموذج معزول               |
| `reactivate_connection`        | متوسطة  | إعادة تمكين اتصال أُلغي تنشيطه        |
| `deactivate_connection`        | مرتفعة  | تعطيل اتصال يسبب مشكلات               |

### واجهة API

> **لا توجد نقطة نهاية REST.** تتوفر مشكلات الطيار الآلي عبر أداة MCP المسماة `observability_snapshot` أو لوحة المعلومات. يعمل الطيار الآلي داخليًا؛ ويُضبط سلوكه عبر قاعدة بيانات الإعدادات (الحقل `autopilotMode` لكل اتصال)، وليس عبر متغيرات البيئة — لا يُرجع الأمر `grep -rn` أي نتائج لمتغير بيئة خاص بوضع الطيار الآلي.

### وضع الطيار الآلي

يعمل الطيار الآلي في **الوضع اليدوي** افتراضيًا — فهو يكتشف المشكلات ويُنشئ الإجراءات الموصى بها، لكنه لا يطبقها تلقائيًا. يمكن تطبيق الإجراءات عبر لوحة المعلومات.

---

## الطيار الآلي لصحة المجموعات

يمثل `comboHealthAutopilot.ts` النظير **الخاص بالمجموعات** للطيار الآلي الخاص بالمزوّد. ويقوم بما يلي:

- يكتشف المجموعات غير السليمة
- يوصي بإعادة ترتيب الأهداف
- يقترح تعطيل الأهداف المعطّلة
- يزيل الأهداف غير الفعالة تلقائيًا بعد N من حالات الفشل

### أمثلة على مشكلات المجموعات

```
المجموعة "always-on" (استراتيجية الأولوية)
├─ الهدف 1: openai/gpt-5 (سليم)
├─ الهدف 2: anthropic/claude-opus-4-6 (⚠️ النموذج محظور حتى 14:00)
└─ الهدف 3: kiro/claude-sonnet-4-5 (سليم)

الإجراء الموصى به: إعادة الترتيب — نقل kiro فوق anthropic حتى انتهاء الحظر
```

---

## مراقبات الحصة

يعرض `observability.ts` **مراقبات الحصة لكل جلسة** لمزوّدي الاشتراكات (Claude Code وCodex وGitHub Copilot):

```ts
interface QuotaMonitorSnapshot {
  sessionId: string;
  provider: string;
  accountId: string;
  status: "starting" | "idle" | "healthy" | "warning" | "exhausted" | "error";
  lastQuotaPercent: number | null; // 0-100
  lastQuotaUsed: number | null;
  lastQuotaTotal: number | null;
  lastResetAt: string | null;
  nextPollAt: string | null;
  totalPolls: number;
  totalAlerts: number;
  consecutiveFailures: number;
}
```

### معاني الحالات

| الحالة      | متى                          | إجراء واجهة المستخدم                    |
| ----------- | ---------------------------- | --------------------------------------- |
| `starting`  | الاستطلاع الأولي قيد التنفيذ | مؤشر تحميل                              |
| `idle`      | لا يوجد نشاط حديث            | الإخفاء من لوحة المعلومات               |
| `healthy`   | المتبقي من الحصة > 50%       | نقطة خضراء                              |
| `warning`   | المتبقي من الحصة < 50%       | تنبيه أصفر                              |
| `exhausted` | الحصة = 0%                   | كتلة حمراء، والتوجيه إلى المزوّد التالي |
| `error`     | فشل الاستطلاع                | نقطة حمراء، وإعادة المحاولة قريبًا      |

### واجهة API

> **لا توجد نقطة نهاية REST.** تتوفر بيانات مراقبة الحصة عبر أداة MCP المسماة `observability_snapshot` أو لوحة المعلومات.

---

## لقطة قابلية الرصد

تُرجع أداة MCP المسماة `observability_snapshot` **لقطة كاملة للنظام** لوكلاء الذكاء الاصطناعي:

```json
{
  "circuitBreakers": [
    {
      "name": "openai",
      "state": "closed",
      "failureCount": 0,
      "lastFailureTime": null,
      "retryAfterMs": null
    }
  ],
  "sessions": [
    {
      "sessionId": "sess-123",
      "createdAt": 1234567890,
      "lastActive": 1234567999,
      "requestCount": 42,
      "connectionId": "conn-456",
      "ageMs": 109
    }
  ],
  "quotaMonitors": {/* انظر أعلاه */},
  "uptime": 12345,
  "version": "3.8.16"
}
```

يستخدم الوكلاء هذه البيانات لاتخاذ **قرارات التوجيه** — على سبيل المثال، «إذا كانت دائرة openai مفتوحة، فوجّه الطلب إلى anthropic أولًا».

---

## فحص سلامة الرمز المميز

تحتاج موفّرات OAuth ‏(Claude Code وGitHub Copilot وCursor) إلى **تحديث دوري للرمز المميز**. يُشغّل `src/lib/tokenHealthCheck.ts` مجدوِلًا في الخلفية:

- **دورة الفحص**: كل 60 ثانية (الفحص في `TICK_MS = 60 * 1000` في `src/lib/tokenHealthCheck.ts:30`)
- **الفاصل الزمني لفحص السلامة لكل اتصال**: 60 دقيقة افتراضيًا (`DEFAULT_HEALTH_CHECK_INTERVAL_MIN = 60`)؛ ويمكن ضبطه عبر قاعدة بيانات الإعدادات
- **التحديث الاستباقي عند 401**: يعالجه المعترض الخاص بكل اتصال

### حالة سلامة الرمز المميز

```ts
interface TokenHealth {
  connectionId: string;
  provider: string;
  status: "valid" | "expiring_soon" | "expired" | "refresh_failed";
  expiresAt: string;
  lastRefresh: string;
  nextRefresh: string;
  consecutiveFailures: number;
}
```

### التهيئة

تتم معالجة تهيئة فحص سلامة الرمز المميز داخليًا بواسطة `tokenHealthCheck.ts`.

### سلامة الرمز المميز

> **لا توجد نقطة نهاية REST.** تتوفر بيانات سلامة الرمز المميز عبر لوحة المعلومات أو أداة MCP المسماة `observability_snapshot`.

---

## التنبيهات

### القنوات المضمنة

يدعم OmniRoute **3 قنوات للتنبيهات**:

| القناة              | الإعداد      | حالة الاستخدام            |
| ------------------- | ------------ | ------------------------- |
| شريط لوحة المعلومات | مفعّل دائمًا | الإشعارات داخل التطبيق    |
| Webhook             | تهيئة URL    | Slack وDiscord وPagerDuty |
| السجل               | افتراضي      | لتجميع السجلات خارجيًا    |

### تهيئة Webhook

> **ملاحظة:** تتم معالجة تهيئة تنبيهات Webhook عبر صفحة الإعدادات في لوحة المعلومات. راجع واجهة مستخدم الإعدادات للاطلاع على URL الخاص بـ Webhook وتصفية الأحداث وتخصيص الحمولة.

### أنواع التنبيهات

| التنبيه                      | متى                                                     | مستوى الخطورة الافتراضي |
| ---------------------------- | ------------------------------------------------------- | ----------------------- |
| `provider_circuit_open`      | عند فتح الدائرة                                         | حرج                     |
| `provider_circuit_half_open` | عند اختبار استعادة الدائرة                              | معلوماتي                |
| `quota_warning`              | عندما تبلغ الحصة 80% أو أكثر                            | تحذير                   |
| `quota_exhausted`            | عندما تبلغ الحصة 100%                                   | حرج                     |
| `token_refresh_failed`       | بعد 3 حالات فشل متتالية أو أكثر في التحديث              | تحذير                   |
| `token_expired`              | عند تجاوز الرمز المميز لتاريخ انتهاء صلاحيته            | حرج                     |
| `combo_target_unhealthy`     | عندما يكون هدف المجموعة في فترة تهدئة لمدة ساعة أو أكثر | تحذير                   |
| `db_integrity_warning`       | عندما تكون انتهاكات FK أكبر من 0                        | تحذير                   |
| `heap_pressure`              | عندما يتجاوز استخدام الكومة 80% من الحد                 | تحذير                   |

---

## مقاييس الأداء

### المقاييس المتتبعة

| المقياس                 | النوع       | المصدر                          |
| ----------------------- | ----------- | ------------------------------- |
| `request_count`         | عدّاد       | `services/usage.ts`             |
| `request_latency_ms`    | مدرج تكراري | `services/usage.ts`             |
| `tokens_consumed`       | عدّاد       | `services/usage.ts`             |
| `cost_usd`              | عدّاد       | `services/usage.ts`             |
| `provider_errors`       | عدّاد       | `services/errorClassifier.ts`   |
| `circuit_state_changes` | عدّاد       | `services/resilience.ts`        |
| `cache_hits`            | عدّاد       | `services/signatureCache.ts`    |
| `compression_savings`   | مدرج تكراري | `services/compression/stats.ts` |
| `quota_used`            | مقياس       | `services/quotaMonitor.ts`      |
| `memory_used_mb`        | مقياس       | `observability.ts`              |

### النسب المئوية لزمن الاستجابة (p50/p95/p99)

> **لا توجد نقطة نهاية REST.** تتوفر بيانات النسب المئوية لزمن الاستجابة عبر صفحة لوحة المعلومات `/dashboard/health`. ومن المخطط دعم التصدير إلى Prometheus/OpenTelemetry في v3.9.

### التصدير إلى Prometheus / OpenTelemetry (المرحلة 2)

من المخطط في v3.9: تصدير أصلي إلى Prometheus وOpenTelemetry وDatadog.

في الوقت الحالي، اجلب البيانات من `/api/monitoring/health` باستخدام أي نظام مراقبة قائم على HTTP (مثل Prometheus blackbox exporter أو فحص HTTP في Datadog، إلخ).

---

## وصفات التنبيه

### Slack

> **ملاحظة:** تُضبط تنبيهات Webhook من خلال صفحة الإعدادات في لوحة المعلومات — لا توجد متغيرات بيئة مخصصة لـ Webhook (يُرجع `grep -rn` صفر نتائج). راجع واجهة مستخدم الإعدادات لضبط عنوان URL الخاص بـ Webhook وتصفية الأحداث وتخصيص الحمولة.

### Discord

> تستخدم تنبيهات Webhook مسار واجهة مستخدم الإعدادات نفسه المستخدم مع Slack. يقبل Discord بنية حمولة JSON نفسها.

### PagerDuty

> تستخدم تنبيهات Webhook مسار واجهة مستخدم الإعدادات نفسه. تُضبط مفاتيح التوجيه الخاصة بـ PagerDuty Events API v2 في واجهة مستخدم الإعدادات.

### Webhook مخصص (JSON)

> ستعمل أي نقطة نهاية HTTP تقبل طلبات POST ذات جسم JSON. اضبط عنوان URL في واجهة مستخدم الإعدادات.

---

## إعداد لوحة المعلومات

### تخصيص لوحة معلومات الصحة

أنشئ الملف `~/.omniroute/dashboard.json`:

```json
{
  "health": {
    "sections": ["server_status", "database", "providers", "quota_monitors", "recent_errors"],
    "refresh_interval_ms": 5000
  }
}
```

### تثبيت موفّر في الأعلى

```json
{
  "health": {
    "pinned_providers": ["openai", "anthropic"]
  }
}
```

---

## استكشاف الأخطاء وإصلاحها

### "يشير الموفّر إلى أنه سليم، لكن الطلبات تفشل"

1. تحقق من **مشكلات الطيار الآلي** — ربما تم حظر أحد النماذج
2. راجع **الأخطاء الأخيرة** لمعرفة فئة الخطأ المحددة
3. جرّب **اختبار الاتصال** في بطاقة الموفّر
4. تحقق مما إذا كان الموفّر **خاضعًا لتحديد المعدل من المنبع** (غير مرئي محليًا)

### "تشير الحصة إلى أنها سليمة، لكنني أرى أخطاء 429"

- يعني 429 أن الموفّر يشير إلى أنك استنفدت حصتك
- قد يكون تتبع الحصة في OmniRoute **قديمًا** — الحقيقة المعتمدة لدى الموفّر في المنبع
- تُحدّث بيانات الحصة تلقائيًا عبر مراقب الحصة الداخلي

### "تفشل المجموعة، لكن جميع الأهداف تبدو سليمة"

- تحقق من لوحة معلومات **صحة المجموعة** بحثًا عن مشكلات في ترتيب الأهداف
- راجع **أحداث الرجوع الاحتياطي** — ربما تستنفد المجموعة خياراتها بسرعة كبيرة
- تحقق من أن **الاستراتيجية** تطابق حالة استخدامك (الأولوية مقابل التناوب مقابل التلقائي)

### "يفشل فحص صحة قاعدة البيانات"

- شغّل `sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"`
- إذا كانت النتيجة "ok" — فهذا إنذار كاذب، إذ إن فحص الصحة صارم أكثر من اللازم
- إذا كانت النتيجة أي شيء آخر — **أوقف OmniRoute** واتبع [دليل التعافي من الكوارث](./DATABASE_GUIDE.md#disaster-recovery)

### "ضغط كومة الذاكرة حرج"

```bash
# تحقق من الكومة الحالية
node -e "console.log(process.memoryUsage())"

# شغّل جمع البيانات المهملة يدويًا (إذا كان --expose-gc مفعّلًا)
node --expose-gc -e "global.gc(); console.log(process.memoryUsage())"

# قلّل الطلبات المتزامنة (اضبطها عبر صفحة الإعدادات في لوحة المعلومات، وليس عبر متغير بيئة)
# لا يوجد متغير بيئة باسم `MAX_CONCURRENT_REQUESTS` — اضبطه في الإعدادات ← التزامن.
```

---

## انظر أيضًا

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — تتبّع الاستخدام والتكلفة
- [DATABASE_GUIDE.md](./DATABASE_GUIDE.md) — مخطط قاعدة البيانات وحالتها
- [PROXY_GUIDE.md](./PROXY_GUIDE.md) — حالة الوكيل (ذاكرة تخزين مؤقت منفصلة)
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — معمارية النظام
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — تفاصيل قاطع الدائرة
- المصدر: `src/lib/monitoring/` (4 ملفات، 2121 سطرًا برمجيًا)
