# Management Authentication (العربية)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/MANAGEMENT-AUTH.md) · 🇪🇹 [am](../../../am/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇿 [az](../../../az/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇬 [bg](../../../bg/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇩 [bn](../../../bn/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇦 [bs](../../../bs/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇿 [cs](../../../cs/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇰 [da](../../../da/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇪 [de](../../../de/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇷 [el](../../../el/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇸 [es](../../../es/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇪 [et](../../../et/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇷 [fa](../../../fa/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇮 [fi](../../../fi/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇷 [fr](../../../fr/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇪 [ga](../../../ga/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [gu](../../../gu/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ha](../../../ha/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇱 [he](../../../he/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [hi](../../../hi/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇷 [hr](../../../hr/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇺 [hu](../../../hu/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇲 [hy](../../../hy/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇩 [id](../../../id/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ig](../../../ig/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇹 [it](../../../it/docs/guides/MANAGEMENT-AUTH.md) · 🇯🇵 [ja](../../../ja/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇪 [ka](../../../ka/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇭 [km](../../../km/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [kn](../../../kn/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇷 [ko](../../../ko/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇹 [lt](../../../lt/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇻 [lv](../../../lv/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ml](../../../ml/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [mr](../../../mr/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇾 [ms](../../../ms/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇹 [mt](../../../mt/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇲 [my](../../../my/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇵 [ne](../../../ne/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇱 [nl](../../../nl/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇴 [no](../../../no/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [or](../../../or/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [pa](../../../pa/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇭 [phi](../../../phi/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇱 [pl](../../../pl/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇹 [pt](../../../pt/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇴 [ro](../../../ro/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇺 [ru](../../../ru/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇰 [si](../../../si/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇰 [sk](../../../sk/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇮 [sl](../../../sl/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇸 [sr](../../../sr/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇪 [sv](../../../sv/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇪 [sw](../../../sw/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ta](../../../ta/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [te](../../../te/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇭 [th](../../../th/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇷 [tr](../../../tr/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇰 [ur](../../../ur/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇿 [uz](../../../uz/docs/guides/MANAGEMENT-AUTH.md) · 🇻🇳 [vi](../../../vi/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [yo](../../../yo/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/MANAGEMENT-AUTH.md)

---

لدى OmniRoute **أربع فئات من بيانات الاعتماد** التي يمكنها تخويل الوصول إلى مسارات الإدارة.
وهي غير قابلة للتبادل. مفاتيح واجهة API للاستدلال (`sk-…`) **لا** تدير
الخادم ما لم تُمنح صراحةً نطاق `manage` أو `admin`.

التنفيذ المرجعي: `src/lib/api/requireManagementAuth.ts`.

| بيانات الاعتماد             | الصيغة المعتادة                    | مكان الإنشاء                                             | الاستخدام المقصود                    | صلاحية الإدارة                                                                            |
| --------------------------- | ---------------------------------- | -------------------------------------------------------- | ------------------------------------ | ----------------------------------------------------------------------------------------- |
| جلسة JWT للوحة المعلومات    | ملف تعريف ارتباط `auth_token`      | تسجيل الدخول إلى لوحة المعلومات                          | واجهة مستخدم المتصفح                 | إدارة كاملة عبر لوحة المعلومات، مع الخضوع لقواعد CSRF، والمحلية، والمسارات المحمية دائمًا |
| رمز معرّف الجهاز لواجهة CLI | داخلي / محلي                       | التهيئة الأولية لواجهة CLI (`omniroute` على الجهاز نفسه) | واجهة CLI المحلية                    | الإدارة المحلية فقط                                                                       |
| رمز وصول محدد النطاق        | `oma_live_…`                       | **الإعدادات ← رموز الوصول** أو `omniroute connect`       | واجهة CLI البعيدة وواجهة API للإدارة | يجب أن يستوفي نطاق `read` أو `write` أو `admin` المطلوب للمسار                            |
| مفتاح واجهة API للاستدلال   | `sk-…` (وبادئات مفاتيح API الأخرى) | **مدير API / مفاتيح API**                                | الاستدلال عبر `/v1/*`                | **لا شيء** ما لم تتضمن بيانات المفتاح الوصفية `manage` أو `admin`                         |

بيانات اعتماد `oma_` هي بيانات اعتماد للإدارة/واجهة CLI. وهي **ليست** مفاتيح واجهة API للاستدلال.

إذا كانت مصادقة تسجيل الدخول/مفتاح API معطلة للخادم، فقد تقبل بعض مسارات الإدارة
طلبات غير مصادق عليها. ولا تزال المسارات المحلية فقط والمسارات المحمية دائمًا تطبق
قواعدها الخاصة. لذلك، لا يكون تقديم إحدى بيانات الاعتماد هذه إلزاميًا في جميع الحالات،
كما أن امتلاك إحداها لا يكون كافيًا في جميع الحالات دون النطاق المطلوب ومحلية المسار.

ذو صلة: [الوضع البعيد](./REMOTE-MODE.md) (كيفية إصدار `oma_live_…` لواجهة CLI بعيدة).

---

## مصفوفات النطاقات

مفردات النطاقات هاتان **مختلفتان**. لا تخلط بينهما.

### نطاقات رمز الوصول (`oma_live_…`)

| النطاق  | العمليات المعتادة                                                                              |
| ------- | ---------------------------------------------------------------------------------------------- |
| `read`  | طلبات GET للقوائم/الحالة التي يُسمح للرمز برؤيتها                                              |
| `write` | عمليات التعديل (إنشاء/تحديث/حذف) التي تقل عن مستوى المسؤول                                     |
| `admin` | واجهة CLI بعيدة كاملة / رمز اتصال (تكون التهيئة الأولية بكلمة المرور على هذا النطاق افتراضيًا) |

لا يمكن لرمز ذي نطاق `read` استدعاء مسار `write`. صيغة الرسالة أثناء التشغيل:
`Access token scope '<have>' is insufficient; '<need>' required.`

### نطاقات إدارة مفاتيح API

| النطاق   | المعنى                                                                                        |
| -------- | --------------------------------------------------------------------------------------------- |
| (لا شيء) | الاستدلال فقط. تُرجع مسارات الإدارة الحالة 403.                                               |
| `manage` | واجهة API للإدارة (بوابة التحقق نفسها التي يستخدمها فرع مفتاح API في `requireManagementAuth`) |
| `admin`  | يستوفي أيضًا `hasManageScope` (ويُعامل على أنه قادر على الإدارة)                              |

فعّل `manage` للمفتاح في واجهة مفاتيح API / مدير API. لا تُعد استخدام مفتاح
عميل محادثة للأتمتة ما لم تكن قد منحته ذلك النطاق عمدًا.

---

## كيفية الإنشاء والإلغاء

### جلسة JWT للوحة المعلومات

1. افتح `/login`، وسجّل الدخول باستخدام كلمة مرور الإدارة (`INITIAL_PASSWORD` عند التشغيل الأول).
2. ملف تعريف الارتباط `auth_token` من نوع HttpOnly. تستخدمه لوحة معلومات المتصفح تلقائيًا.
3. سجّل الخروج عبر `/api/auth/logout`. لا يوجد سر طويل الأجل لنسخه.

### رمز معرّف الجهاز لواجهة CLI

1. شغّل `omniroute` على **المضيف نفسه** الذي يعمل عليه الخادم (عنوان الاسترجاع المحلي).
2. تُجري واجهة CLI التهيئة الأولية لرمز معرّف الجهاز ضمن `~/.omniroute/` (chmod 600).
3. **لا** يعمل هذا من جهاز آخر. استخدم رمز وصول لواجهة CLI البعيدة.

### رمز وصول محدد النطاق (`oma_live_…`)

1. لوحة المعلومات: **الإعدادات ← رموز الوصول** ← إنشاء (الاسم + النطاق). **يُعرض السر مرة واحدة.**
2. أو عبر واجهة CLI: `omniroute connect <host>` (كلمة المرور ← الرمز). راجع [الوضع البعيد](./REMOTE-MODE.md).
3. الترويسة: `Authorization: Bearer oma_live_…`
4. ألغِه من صفحة رموز الوصول نفسها (أو احذف سياق واجهة CLI).
5. لا يخزن الخادم سوى قيمة تجزئة. تعامل مع النص الصريح كما تتعامل مع كلمة المرور.

### مفتاح API بنطاق إدارة

1. لوحة المعلومات: **مدير API / مفاتيح API** ← أنشئ مفتاحًا أو عدّله ← فعّل `manage` (أو `admin`).
2. الترويسة: `Authorization: Bearer sk-…` (البادئة الفعلية للمفتاح).
3. ألغِ المفتاح أو أزل منه `manage` في الواجهة نفسها.
4. لتحقيق أقل قدر من الصلاحيات للأتمتة التي لا تستخدم واجهة CLI: يُفضّل استخدام رمز وصول بنطاق `read` للمهام التي تقتصر على GET؛ ولا تستخدم `manage` على مفتاح API إلا عندما يتعين على المستدعي أيضًا التواصل مع `/v1` والإدارة.

---

## تنسيق الترويسة

```http
Authorization: Bearer oma_live_<secret>
Authorization: Bearer sk-<secret>
Cookie: auth_token=<dashboard-jwt>
```

لا تضع بيانات اعتماد الإدارة في مسار عنوان URL أو سلسلة الاستعلام. تتم مصادقة
الإدارة عبر الترويسة/ملف تعريف الارتباط فقط.

---

## أمثلة جاهزة للنسخ واللصق

للقراءة فقط (عرض المزوّدين). استخدم رمز وصول بنطاق `read`:

```bash
curl -sS "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<read-token>"
```

للتعديل (إنشاء اتصال بمزوّد). استخدم رمز وصول بنطاق `write`/`admin` أو مفتاح API
بنطاق `manage`:

```bash
curl -sS -X POST "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<write-or-admin-token>" \
  -H "Content-Type: application/json" \
  -d '{"provider":"openai","apiKey":"<upstream-key>"}'
```

للاستدلال (وليس للإدارة). استخدم مفتاح API عاديًا، ولا يلزم نطاق `manage`:

```bash
curl -sS "$OMNIROUTE_URL/v1/models" \
  -H "Authorization: Bearer sk-<inference-key>"
```

---

## أخطاء وقت التشغيل الحالية (لا تعرض الأسرار)

| الحالة                                      | رمز الحالة المعتاد | الرسالة (بعد تنقيحها)                                                |
| ------------------------------------------- | ------------------ | -------------------------------------------------------------------- |
| لا توجد بيانات اعتماد                       | 401                | `Authentication required`                                            |
| رمز `oma_live_…` غير صالح/منتهي الصلاحية    | 401                | `Invalid or expired access token`                                    |
| مفتاح API صالح من دون نطاق `manage`/`admin` | 403                | `API key lacks 'manage' scope. Enable it in the API Keys dashboard.` |
| مفتاح API عادي غير صالح على مسار إداري      | 403                | `Invalid management token`                                           |
| نطاق رمز الوصول أدنى من المطلوب             | 403                | `Access token scope '<have>' is insufficient; '<need>' required.`    |

تعني الرسالة "Invalid management token" أن رمز الحامل **لم** يُقبل باعتباره
بيانات اعتماد إدارية. وهي **لا** تحدد لك نوع الرمز الذي ينبغي إصداره. استخدم الجدول أعلاه:
تحتاج مفاتيح الاستدلال إلى نطاق `manage`؛ وتحتاج واجهة CLI البعيدة إلى `oma_live_…`؛
وتستخدم لوحة المعلومات ملف تعريف ارتباط الجلسة.

---

## خيار الصلاحيات الدنيا الموصى به

| الجهة المستدعية                           | ما يجب استخدامه                                      |
| ----------------------------------------- | ---------------------------------------------------- |
| المتصفح                                   | جلسة لوحة المعلومات                                  |
| واجهة CLI على مضيف الخادم                 | رمز الجهاز                                           |
| واجهة CLI على حاسوب محمول يتصل بخادم بعيد | `oma_live_…` من `omniroute connect`                  |
| CI / البرامج النصية (للإدارة فقط)         | `oma_live_…` بأصغر نطاق يفي بالغرض                   |
| CI يجب أن يستدعي كلاً من `/v1` و`/api`    | مفتاح API بنطاق `manage` **أو** بيانات اعتماد منفصلة |
