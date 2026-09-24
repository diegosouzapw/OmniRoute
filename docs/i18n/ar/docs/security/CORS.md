# CORS Configuration & Security (العربية)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CORS.md) · 🇪🇹 [am](../../../am/docs/security/CORS.md) · 🇦🇿 [az](../../../az/docs/security/CORS.md) · 🇧🇬 [bg](../../../bg/docs/security/CORS.md) · 🇧🇩 [bn](../../../bn/docs/security/CORS.md) · 🇧🇦 [bs](../../../bs/docs/security/CORS.md) · 🇨🇿 [cs](../../../cs/docs/security/CORS.md) · 🇩🇰 [da](../../../da/docs/security/CORS.md) · 🇩🇪 [de](../../../de/docs/security/CORS.md) · 🇬🇷 [el](../../../el/docs/security/CORS.md) · 🇪🇸 [es](../../../es/docs/security/CORS.md) · 🇪🇪 [et](../../../et/docs/security/CORS.md) · 🇮🇷 [fa](../../../fa/docs/security/CORS.md) · 🇫🇮 [fi](../../../fi/docs/security/CORS.md) · 🇫🇷 [fr](../../../fr/docs/security/CORS.md) · 🇮🇪 [ga](../../../ga/docs/security/CORS.md) · 🇮🇳 [gu](../../../gu/docs/security/CORS.md) · 🇳🇬 [ha](../../../ha/docs/security/CORS.md) · 🇮🇱 [he](../../../he/docs/security/CORS.md) · 🇮🇳 [hi](../../../hi/docs/security/CORS.md) · 🇭🇷 [hr](../../../hr/docs/security/CORS.md) · 🇭🇺 [hu](../../../hu/docs/security/CORS.md) · 🇦🇲 [hy](../../../hy/docs/security/CORS.md) · 🇮🇩 [id](../../../id/docs/security/CORS.md) · 🇳🇬 [ig](../../../ig/docs/security/CORS.md) · 🇮🇹 [it](../../../it/docs/security/CORS.md) · 🇯🇵 [ja](../../../ja/docs/security/CORS.md) · 🇬🇪 [ka](../../../ka/docs/security/CORS.md) · 🇰🇭 [km](../../../km/docs/security/CORS.md) · 🇮🇳 [kn](../../../kn/docs/security/CORS.md) · 🇰🇷 [ko](../../../ko/docs/security/CORS.md) · 🇱🇹 [lt](../../../lt/docs/security/CORS.md) · 🇱🇻 [lv](../../../lv/docs/security/CORS.md) · 🇮🇳 [ml](../../../ml/docs/security/CORS.md) · 🇮🇳 [mr](../../../mr/docs/security/CORS.md) · 🇲🇾 [ms](../../../ms/docs/security/CORS.md) · 🇲🇹 [mt](../../../mt/docs/security/CORS.md) · 🇲🇲 [my](../../../my/docs/security/CORS.md) · 🇳🇵 [ne](../../../ne/docs/security/CORS.md) · 🇳🇱 [nl](../../../nl/docs/security/CORS.md) · 🇳🇴 [no](../../../no/docs/security/CORS.md) · 🇮🇳 [or](../../../or/docs/security/CORS.md) · 🇮🇳 [pa](../../../pa/docs/security/CORS.md) · 🇵🇭 [phi](../../../phi/docs/security/CORS.md) · 🇵🇱 [pl](../../../pl/docs/security/CORS.md) · 🇵🇹 [pt](../../../pt/docs/security/CORS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CORS.md) · 🇷🇴 [ro](../../../ro/docs/security/CORS.md) · 🇷🇺 [ru](../../../ru/docs/security/CORS.md) · 🇱🇰 [si](../../../si/docs/security/CORS.md) · 🇸🇰 [sk](../../../sk/docs/security/CORS.md) · 🇸🇮 [sl](../../../sl/docs/security/CORS.md) · 🇷🇸 [sr](../../../sr/docs/security/CORS.md) · 🇸🇪 [sv](../../../sv/docs/security/CORS.md) · 🇰🇪 [sw](../../../sw/docs/security/CORS.md) · 🇮🇳 [ta](../../../ta/docs/security/CORS.md) · 🇮🇳 [te](../../../te/docs/security/CORS.md) · 🇹🇭 [th](../../../th/docs/security/CORS.md) · 🇹🇷 [tr](../../../tr/docs/security/CORS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CORS.md) · 🇵🇰 [ur](../../../ur/docs/security/CORS.md) · 🇺🇿 [uz](../../../uz/docs/security/CORS.md) · 🇻🇳 [vi](../../../vi/docs/security/CORS.md) · 🇳🇬 [yo](../../../yo/docs/security/CORS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CORS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CORS.md)

---

يتحكم OmniRoute في **أصول المتصفح** التي يمكنها قراءة الاستجابات عبر الأصول
من خلال قائمة سماح مركزية واحدة. يعتمد النموذج مبدأ **الرفض افتراضيًا**:
لا يُسمح بأي أصل حتى تضيفه صراحةً. توثّق هذه الصفحة كيفية مطابقة قائمة السماح،
وما الذي يكشفه `CORS_ALLOW_ALL=true` فعليًا (والأهم، ما الذي **لا** يكشفه)،
وكيفية إعداد بيئتي التطوير والإنتاج بأمان، وتحذير وقت التشغيل الذي تعرضه
لوحة المعلومات عند تفعيل حرف بدل.

**مصدر الحقيقة:** `src/server/cors/origins.ts` (`resolveAllowedOrigin`,
`applyCorsHeaders`, `getCorsStatus`). تُطبَّق قائمة السماح مرة واحدة في
البرمجية الوسيطة (`src/server/authz/pipeline.ts`) — ولا تضبط معالجات المسارات
الفردية `Access-Control-Allow-Origin` بنفسها.

## كيفية مطابقة الأصل

تحسب البرمجية الوسيطة لكل طلب قيمة `Access-Control-Allow-Origin`
بهذا الترتيب:

1. **`CORS_ALLOW_ALL=true`** (أو الإعداد القديم `CORS_ORIGIN=*`) ← تعيد إرسال
   قيمة `Origin` الخاصة بالمتصل (أو `*` في حال عدم وجود ترويسة `Origin`)، مع
   `Vary: Origin` لضمان صحة عمل ذاكرات التخزين المؤقت. كما تضيف نقطة التحكم
   نفسها `applyCorsHeaders()` القيمة `Vary: Accept-Encoding` إلى كل استجابة
   2xx ذات محتوى ضمن واجهات `/v1*`/`/v1beta*` التي تستخدم المصادقة بالرمز
   (`relaxForTokenAuth`، ‏RFC 9110 §12.5.5، المشكلة #6737)، حتى تتمكن ذاكرات
   التخزين المؤقت اللاحقة/المشتركة من التمييز بصورة صحيحة بين النسخ المضغوطة
   وغير المضغوطة.
2. بخلاف ذلك، تُطبَّع قيمة `Origin` في الطلب (تُحوَّل إلى أحرف صغيرة وتُزال
   الشرطة المائلة الختامية) ثم تُطابق مع **قائمة السماح المدمجة**:
   - متغير البيئة **`CORS_ALLOWED_ORIGINS`** — قائمة مفصولة بفواصل، و
   - إعداد وقت التشغيل **`corsOrigins`** (لوحة المعلومات ← الأمان ← _أصول CORS
     المسموح بها_)، الذي يُحقن عبر `setRuntimeAllowedOrigins()` من
     `src/lib/config/runtimeSettings.ts`.
3. عدم وجود تطابق ← **لا تُرسل ترويسة `Access-Control-Allow-Origin`**. يحظر
   المتصفح قراءة المحتوى عبر الأصول. وهذا هو سلوك الرفض الافتراضي المقصود.

| متغير البيئة           | المعنى                                                                              |
| ---------------------- | ----------------------------------------------------------------------------------- |
| `CORS_ALLOWED_ORIGINS` | قائمة CSV بالأصول الدقيقة المسموح بها (موصى به).                                    |
| `CORS_ALLOW_ALL`       | `true`/`1` ← إعادة إرسال أي أصل (حرف بدل). للتطوير فقط.                             |
| `CORS_ORIGIN`          | إعداد قديم. تتصرف `*` مثل `CORS_ALLOW_ALL`؛ وتُضاف القيمة المفردة إلى قائمة السماح. |

## نموذج التهديد — ما الذي يكشفه `CORS_ALLOW_ALL=true` فعليًا

يستحق تحذير OWASP العام ("CORS بحرف بدل = يمكن لأي موقع استدعاء واجهة API
الخاصة بك") أن يؤخذ بجدية، لكن نطاق تعرض OmniRoute **أضيق من الحالة العامة**،
وذلك بسبب حقيقة تنفيذية محددة:

> **لا تُرسل الدالة المركزية `applyCorsHeaders()` مطلقًا
> `Access-Control-Allow-Credentials`.** لن يسمح المتصفح بإتاحة استجابة عبر
> الأصول _مرفقة ببيانات اعتماد_ (تتضمن ملف تعريف ارتباط) ما لم يرسل الخادم
> `Access-Control-Allow-Credentials: true`. ولا يفعل مسار CORS المشترك في
> OmniRoute ذلك مطلقًا.

ما يعنيه ذلك لكل واجهة، حتى مع `CORS_ALLOW_ALL=true`:

| الواجهة                               | آلية المصادقة               | تأثير CORS بحرف بدل                                                                                                                                                                                                            |
| ------------------------------------- | --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| لوحة المعلومات / MANAGEMENT `/api/*`  | جلسة ملف تعريف ارتباط       | يُعاد إرسال الأصل، ولكن **من دون `Allow-Credentials`** يقوم المتصفح **بحظر** القراءة المرفقة ببيانات اعتماد. **لا يستطيع** موقع ضار من أصل آخر قراءة استجابات لوحة المعلومات المصادق عليها، ولا يُكشف ملف تعريف ارتباط الجلسة. |
| واجهة العميل `/v1/*`، `/v1beta/*`     | ترويسة Bearer / `x-api-key` | متساهلة أصلًا **بحكم التصميم** (`relaxForTokenAuth`): لا تُرفق المتصفحات `Authorization`/`x-api-key` تلقائيًا، ولذلك لا تستطيع صفحة المهاجم تقديم مفتاحك. لا يوسّع `CORS_ALLOW_ALL` هذا النطاق.                                |
| القراءة العامة فقط (`/api/health`، …) | لا توجد                     | غير حساسة؛ استخدام حرف البدل غير ضار.                                                                                                                                                                                          |

لذلك يقتصر التعرض **المتبقي** الناتج عن `CORS_ALLOW_ALL=true` على: (أ)
عمليات **قراءة** عبر الأصول من دون بيانات اعتماد لبيانات غير مصادق عليها
أصلًا، و(ب) السماح **للطلب التمهيدي** الخاص بـ CORS بالمرور على مسارات
الإدارة — التي تظل تتطلب مصادقة لا تستطيع صفحة من أصل آخر توفيرها. ولا يشكّل
ذلك وسيلة لاختطاف الجلسة أو سرقة بيانات الاعتماد ضمن مسار CORS المشترك.

### استثناء حقيقي واحد — `/api/v1/agents/`

تضبط مسارات Cloud-Agent
(`/api/v1/agents/{health,credentials,tasks,tasks/[id]}`) ترويسات CORS
**الخاصة بها**
(`src/lib/cloudAgent/api.ts`، `getCloudAgentCorsHeaders`) كما أنها **ترسل**
`Access-Control-Allow-Origin: <origin>|*` إلى جانب
`Access-Control-Allow-Credentials: true`. وهذه هي الواجهة الوحيدة التي
يتزامن فيها تكرار الأصل مع بيانات الاعتماد، وهي **مستقلة عن
`CORS_ALLOW_ALL`**. تخضع هذه المسارات لمصادقة الإدارة
(`requireManagementAuth`)؛ وينبغي للمشغّلين الذين يتيحون لوحة المعلومات خارج
المضيف إدراك أن هذا هو الموضع الوحيد الذي تسمح فيه ترويسات الاستجابة بقراءة
عبر الأصول مرفقة ببيانات اعتماد. ويُتابَع تقييدها بقائمة سماح صريحة بصورة
منفصلة عن إرشادات CORS هذه.

## قائمة التحقق للإنتاج

- **لا تضبط `CORS_ALLOW_ALL=true` مطلقًا في بيئة الإنتاج.** اتركه دون تعيين.
- عيّن قائمة مصادر **صريحة** — إما عبر متغير البيئة أو حقل علامة تبويب الأمان:

  ```bash
  CORS_ALLOWED_ORIGINS="https://app.example.com, https://admin.example.com"
  ```

- إذا كان OmniRoute يعمل خلف وكيل عكسي / نفق (nginx أو Caddy أو Cloudflare
  Tunnel أو Tailscale)، فإن CORS **ليس** وسيلة التحكم الوحيدة لديك — إذ تظل آلية
  حماية مسارات loopback تحمي المسارات القادرة على تشغيل العمليات (راجع
  [ROUTE_GUARD_TIERS](./ROUTE_GUARD_TIERS.md)). لا تزوّر
  `X-Forwarded-For: 127.0.0.1` من أجل «إصلاح» خطأ 403؛ لأن ذلك يعيد فتح فئة ثغرات RCE التي
  تغلقها آلية حماية المسارات.
- تحقّق من حالة وقت التشغيل: تعرض لوحة المعلومات **شريط تحذير كهرمانيًا دائمًا**
  ضمن لوحة المعلومات → الأمان → مخزون التخويل كلما كان
  `CORS_ALLOW_ALL=true` مفعّلًا، وتُرجع `/api/settings/authz-inventory`
  غلافًا من نوع `cors: { allowAll, allowedOrigins }` يمكن لأدوات المراقبة الاستقصاء عنه.

## تسهيل التطوير — السماح بمصادر محلية محددة

نادرًا ما تحتاج إلى حرف البدل حتى في بيئة التطوير. اسمح فقط بخوادم التطوير التي تستخدمها:

```bash
# خادما تطوير Vite (5173) وNext.js (3000) اللذان يستدعيان نسخة OmniRoute محلية
CORS_ALLOWED_ORIGINS="http://localhost:5173, http://localhost:3000"
```

تُطابق المصادر دون مراعاة حالة الأحرف مع تجاهل الشرطة المائلة الختامية، لذا يُعد
`http://localhost:3000` و`http://localhost:3000/` متكافئين. يمكن تعيين قائمة CSV
نفسها في وقت التشغيل ضمن **لوحة المعلومات → الأمان → مصادر CORS المسموح بها** دون
إعادة التشغيل.

## مفاتيح API مقابل جلسات ملفات تعريف الارتباط

- **Bearer / `x-api-key` (واجهة الاستدلال `/v1/*`):** لا تُرفق المتصفحات
  هذه القيم تلقائيًا مطلقًا. لا يُعد CORS حاجزًا ذا معنى هنا — فمفتاح API هو
  الحاجز — ولهذا تكون هذه الواجهة متساهلة عمدًا حتى يتمكن عملاء المتصفح وElectron
  من قراءة الاستجابات التي يحق لهم الوصول إليها بالفعل.
- **جلسة ملف تعريف الارتباط (لوحة المعلومات):** محمية بالإعداد الافتراضي المغلق عند الفشل **وكذلك**
  بغياب `Access-Control-Allow-Credentials` عن المسار المشترك. أبقِ
  مصادر الإدارة/لوحة المعلومات خارج أي إعداد متساهل؛ إذ يجب أن تظل مغلقة تمامًا عند
  الفشل.

## مثال: وكيل عكسي أمام OmniRoute

يفرض OmniRoute نفسه سياسة CORS، لذلك ينبغي للوكيل عمومًا **ألا** يضيف ترويسات
`Access-Control-*` أو يعيد كتابتها (فالترويسات المزدوجة تعطل المتصفحات). أنهِ TLS
وأعِد التوجيه — ودع OmniRoute يستجيب لطلب التحقق المسبق:

```nginx
# nginx — إعادة التوجيه إلى OmniRoute؛ لا تحقن Access-Control-* هنا
location / {
    proxy_pass http://127.0.0.1:20128;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-Proto $scheme;
    # لا تضبط X-Forwarded-For على 127.0.0.1 — فهذا يعطل آلية حماية مسارات loopback.
}
```

عيّن مصادر المتصفح المسموح بها في OmniRoute (`CORS_ALLOWED_ORIGINS` أو علامة تبويب
الأمان)، وليس في الوكيل.

## ملفات المصدر

| الجانب                                         | الملف                                                                |
| ---------------------------------------------- | -------------------------------------------------------------------- |
| تحديد قائمة السماح + `getCorsStatus()`         | `src/server/cors/origins.ts`                                         |
| تطبيق البرمجيات الوسيطة (مصدر الحقيقة الوحيد)  | `src/server/authz/pipeline.ts`                                       |
| الإعدادات → حقن المصادر في وقت التشغيل         | `src/lib/config/runtimeSettings.ts`                                  |
| حالة وقت التشغيل للوحة المعلومات               | `src/app/api/settings/authz-inventory/route.ts`                      |
| شريط التحذير في لوحة المعلومات                 | `src/app/(dashboard)/dashboard/settings/components/AuthzSection.tsx` |
| حقل مصادر CORS المسموح بها                     | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`  |
| CORS الخاص بكل مسار في Cloud-Agent (الاستثناء) | `src/lib/cloudAgent/api.ts`                                          |

## انظر أيضًا

- [مستويات حراسة المسارات](./ROUTE_GUARD_TIERS.md) — فرض استخدام واجهة الاسترجاع للمسارات
  القادرة على إنشاء العمليات (إجراء تحكم منفصل ومتكامل).
- [دليل التخويل](../architecture/AUTHZ_GUIDE.md) — مسار المصادقة الكامل.
