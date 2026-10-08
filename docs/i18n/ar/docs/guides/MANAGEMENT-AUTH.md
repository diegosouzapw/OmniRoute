# Management Authentication (العربية)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/MANAGEMENT-AUTH.md) · 🇪🇹 [am](../../../am/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇿 [az](../../../az/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇬 [bg](../../../bg/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇩 [bn](../../../bn/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇦 [bs](../../../bs/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇿 [cs](../../../cs/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇰 [da](../../../da/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇪 [de](../../../de/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇷 [el](../../../el/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇸 [es](../../../es/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇪 [et](../../../et/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇷 [fa](../../../fa/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇮 [fi](../../../fi/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇷 [fr](../../../fr/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇪 [ga](../../../ga/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [gu](../../../gu/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ha](../../../ha/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇱 [he](../../../he/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [hi](../../../hi/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇷 [hr](../../../hr/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇺 [hu](../../../hu/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇲 [hy](../../../hy/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇩 [id](../../../id/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ig](../../../ig/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇹 [it](../../../it/docs/guides/MANAGEMENT-AUTH.md) · 🇯🇵 [ja](../../../ja/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇪 [ka](../../../ka/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇭 [km](../../../km/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [kn](../../../kn/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇷 [ko](../../../ko/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇹 [lt](../../../lt/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇻 [lv](../../../lv/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ml](../../../ml/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [mr](../../../mr/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇾 [ms](../../../ms/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇹 [mt](../../../mt/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇲 [my](../../../my/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇵 [ne](../../../ne/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇱 [nl](../../../nl/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇴 [no](../../../no/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [or](../../../or/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [pa](../../../pa/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇭 [phi](../../../phi/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇱 [pl](../../../pl/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇹 [pt](../../../pt/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇴 [ro](../../../ro/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇺 [ru](../../../ru/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇰 [si](../../../si/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇰 [sk](../../../sk/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇮 [sl](../../../sl/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇸 [sr](../../../sr/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇪 [sv](../../../sv/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇪 [sw](../../../sw/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ta](../../../ta/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [te](../../../te/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇭 [th](../../../th/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇷 [tr](../../../tr/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇰 [ur](../../../ur/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇿 [uz](../../../uz/docs/guides/MANAGEMENT-AUTH.md) · 🇻🇳 [vi](../../../vi/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [yo](../../../yo/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/MANAGEMENT-AUTH.md)

---

لدى OmniRoute **أربع عائلات من بيانات الاعتماد** يمكنها التصريح بالوصول إلى مسارات الإدارة.
وهي غير قابلة للاستخدام بالتبادل. مفاتيح واجهة API للاستدلال (`sk-…`) **لا** تدير
الخادم ما لم تُمنح صراحةً نطاق `manage` أو `admin`.

التنفيذ المرجعي: `src/lib/api/requireManagementAuth.ts`.

| بيانات الاعتماد          | الشكل المعتاد                      | مكان الإنشاء                                         | الاستخدام المقصود           | إمكانية الإدارة                                                                        |
| ------------------------ | ---------------------------------- | ---------------------------------------------------- | --------------------------- | -------------------------------------------------------------------------------------- |
| جلسة JWT للوحة المعلومات | ملف تعريف الارتباط `auth_token`    | تسجيل الدخول إلى لوحة المعلومات                      | واجهة المتصفح               | إدارة كاملة عبر لوحة المعلومات، مع مراعاة قواعد CSRF والمحلية والمسارات المحمية دائمًا |
| رمز معرّف الجهاز لـ CLI  | داخلي / محلي                       | التهيئة الأولية لـ CLI (`omniroute` على الجهاز نفسه) | CLI محلي                    | الإدارة المحلية فقط                                                                    |
| رمز وصول محدد النطاق     | `oma_live_…`                       | **الإعدادات ← رموز الوصول** أو `omniroute connect`   | CLI بعيد وواجهة API للإدارة | يجب أن يستوفي نطاق `read` أو `write` أو `admin` المطلوب للمسار                         |
| مفتاح API للاستدلال      | `sk-…` (وبادئات مفاتيح API الأخرى) | **مدير API / مفاتيح API**                            | الاستدلال عبر `/v1/*`       | **لا شيء** ما لم تتضمن البيانات الوصفية للمفتاح `manage` أو `admin`                    |

بيانات اعتماد `oma_` هي بيانات اعتماد للإدارة/CLI. وهي **ليست** مفاتيح API للاستدلال.

إذا كانت مصادقة تسجيل الدخول/مفتاح API معطلة للخادم، فقد تقبل بعض مسارات الإدارة
طلبات غير مصادق عليها. وتظل المسارات المحلية فقط والمسارات المحمية دائمًا خاضعة
لقواعدها الخاصة. لذلك، لا يُعد تقديم إحدى بيانات الاعتماد هذه إلزاميًا في جميع
الحالات، كما أن امتلاك إحداها لا يكفي دائمًا دون النطاق المطلوب ومحلية المسار.

راجع أيضًا: [الوضع البعيد](./REMOTE-MODE.md) (كيفية إصدار `oma_live_…` لـ CLI بعيد).

---

## مصفوفات النطاقات

تستخدم نطاقات إدارة مفاتيح API ونطاقات رموز الوصول مجموعتين مختلفتين من المصطلحات.
أما نطاقات أدوات MCP فهي مجموعة مصطلحات ثالثة، ويُتحقق منها باستخدام `scopeMatches` بدلًا من
أي من الدالتين الواردتين في الجدولين أدناه. للمقارنة جنبًا إلى جنب:
[مساحات أسماء النطاقات الثلاث](../frameworks/MCP-SERVER.md#three-scope-namespaces).

### نطاقات رموز الوصول (`oma_live_…`)

| النطاق  | العمليات المعتادة                                                         |
| ------- | ------------------------------------------------------------------------- |
| `read`  | طلبات GET للقوائم/الحالة التي يُسمح للرمز برؤيتها                         |
| `write` | عمليات التعديل (إنشاء/تحديث/حذف) دون مستوى المسؤول                        |
| `admin` | رمز كامل لـ CLI البعيد / الاتصال (تستخدم تهيئة كلمة المرور هذا افتراضيًا) |

لا يمكن لرمز ذي نطاق `read` استدعاء مسار `write`. صيغة الرسالة أثناء التشغيل:
`نطاق رمز الوصول '<have>' غير كافٍ؛ النطاق '<need>' مطلوب.`

### نطاقات إدارة مفاتيح API

| النطاق   | المعنى                                                                                  |
| -------- | --------------------------------------------------------------------------------------- |
| (لا شيء) | للاستدلال فقط. تُرجع مسارات الإدارة 403.                                                |
| `manage` | واجهة API للإدارة (بوابة التحقق نفسها الخاصة بفرع مفتاح API في `requireManagementAuth`) |
| `admin`  | يستوفي أيضًا `hasManageScope` (ويُعامل على أنه قادر على الإدارة)                        |

فعّل `manage` للمفتاح في واجهة مفاتيح API / مدير API. لا تُعد استخدام مفتاح
عميل محادثة للأتمتة ما لم تكن قد منحته هذا النطاق عمدًا.

---

## كيفية الإنشاء والإلغاء

### جلسة JWT للوحة المعلومات

1. افتح `/login`، وسجّل الدخول باستخدام كلمة مرور الإدارة (`INITIAL_PASSWORD` عند التشغيل الأول).
2. ملف تعريف الارتباط `auth_token` هو HttpOnly. تستخدمه لوحة المعلومات في المتصفح تلقائيًا.
3. سجّل الخروج عبر `/api/auth/logout`. لا يوجد سر طويل الأجل لنسخه.

### رمز machine-id لواجهة CLI

1. شغّل `omniroute` على **المضيف نفسه** الذي يعمل عليه الخادم (loopback).
2. تُنشئ واجهة CLI رمز machine-id ضمن `~/.omniroute/` (chmod 600).
3. لا يعمل هذا من جهاز آخر. استخدم Access Token لواجهة CLI البعيدة.

### Access Token محدد النطاق (`oma_live_…`)

1. لوحة المعلومات: **Settings → Access Tokens** ← أنشئ رمزًا (الاسم + النطاق). **يُعرض السر مرة واحدة فقط.**
2. أو عبر CLI: `omniroute connect <host>` (كلمة المرور ← الرمز). راجع [الوضع البعيد](./REMOTE-MODE.md).
3. الترويسة: `Authorization: Bearer oma_live_…`
4. ألغِه من صفحة Access Tokens نفسها (أو احذف سياق CLI).
5. لا يخزّن الخادم سوى قيمة تجزئة. تعامل مع النص الصريح كما تتعامل مع كلمة مرور.

### مفتاح API بنطاق manage

1. لوحة المعلومات: **API Manager / API Keys** ← أنشئ مفتاحًا أو عدّله ← فعّل `manage` (أو `admin`).
2. الترويسة: `Authorization: Bearer sk-…` (البادئة الفعلية للمفتاح).
3. ألغِ المفتاح أو أزل منه `manage` في واجهة المستخدم نفسها.
4. لأقل قدر من الصلاحيات لعمليات الأتمتة التي لا تستخدم CLI: يُفضّل استخدام Access Token بنطاق `read` للمهام التي تستخدم GET فقط؛ ولا تستخدم `manage` في مفتاح API إلا عندما يحتاج المستدعي أيضًا إلى التعامل مع `/v1` والإدارة.

---

## تنسيق الترويسة

```http
Authorization: Bearer oma_live_<secret>
Authorization: Bearer sk-<secret>
Cookie: auth_token=<dashboard-jwt>
```

لا تضع بيانات اعتماد الإدارة في مسار URL أو سلسلة الاستعلام. تكون مصادقة
الإدارة عبر الترويسة/ملف تعريف الارتباط فقط.

---

## أمثلة جاهزة للنسخ واللصق

للقراءة فقط (سرد المزوّدين). استخدم Access Token بنطاق `read`:

```bash
curl -sS "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<read-token>"
```

للتعديل (إنشاء اتصال بمزوّد). استخدم Access Token بنطاق `write`/`admin` أو
مفتاح API بنطاق manage:

```bash
curl -sS -X POST "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<write-or-admin-token>" \
  -H "Content-Type: application/json" \
  -d '{"provider":"openai","apiKey":"<upstream-key>"}'
```

للاستدلال (وليس للإدارة). مفتاح API عادي، ولا يتطلب `manage`:

```bash
curl -sS "$OMNIROUTE_URL/v1/models" \
  -H "Authorization: Bearer sk-<inference-key>"
```

---

## أخطاء وقت التشغيل الحالية (لا تعرض الأسرار)

| الحالة                                 | الحالة المعتادة | الرسالة (بعد تنقيحها)                                                |
| -------------------------------------- | --------------- | -------------------------------------------------------------------- |
| لا توجد بيانات اعتماد                  | 401             | `Authentication required`                                            |
| `oma_live_…` غير صالح/منتهي الصلاحية   | 401             | `Invalid or expired access token`                                    |
| مفتاح API صالح من دون `manage`/`admin` | 403             | `API key lacks 'manage' scope. Enable it in the API Keys dashboard.` |
| مفتاح API عادي غير صالح على مسار إدارة | 403             | `Invalid management token`                                           |
| نطاق Access Token أدنى من المطلوب      | 403             | `Access token scope '<have>' is insufficient; '<need>' required.`    |

تعني `"Invalid management token"` أن رمز bearer **لم** يُقبل بوصفه أحد بيانات
اعتماد الإدارة. ولا تخبرك هذه الرسالة بالفئة التي ينبغي إصدارها. استخدم الجدول أعلاه:
تحتاج مفاتيح الاستدلال إلى نطاق `manage`؛ وتحتاج واجهة CLI البعيدة إلى `oma_live_…`؛ أما لوحة المعلومات
فتستخدم ملف تعريف ارتباط الجلسة.

---

## الخيار الموصى به وفق مبدأ الحد الأدنى من الصلاحيات

| الجهة المستدعية                                          | الاستخدام                                              |
| -------------------------------------------------------- | ------------------------------------------------------ |
| المتصفح                                                  | جلسة لوحة التحكم                                       |
| واجهة سطر الأوامر على مضيف الخادم                        | رمز الجهاز                                             |
| واجهة سطر الأوامر على حاسوب محمول يتصل بخادم بعيد        | `oma_live_…` من `omniroute connect`                    |
| التكامل المستمر / البرامج النصية (للإدارة فقط)           | `oma_live_…` بأضيق نطاق صلاحيات يفي بالغرض             |
| التكامل المستمر الذي يجب أن يستدعي كلاً من `/v1` و`/api` | مفتاح API بصلاحية `manage` **أو** بيانات اعتماد منفصلة |
