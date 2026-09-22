# Kiro Setup Guide (العربية)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/KIRO_SETUP.md) · 🇪🇹 [am](../../../am/docs/guides/KIRO_SETUP.md) · 🇦🇿 [az](../../../az/docs/guides/KIRO_SETUP.md) · 🇧🇬 [bg](../../../bg/docs/guides/KIRO_SETUP.md) · 🇧🇩 [bn](../../../bn/docs/guides/KIRO_SETUP.md) · 🇨🇿 [cs](../../../cs/docs/guides/KIRO_SETUP.md) · 🇩🇰 [da](../../../da/docs/guides/KIRO_SETUP.md) · 🇩🇪 [de](../../../de/docs/guides/KIRO_SETUP.md) · 🇬🇷 [el](../../../el/docs/guides/KIRO_SETUP.md) · 🇪🇸 [es](../../../es/docs/guides/KIRO_SETUP.md) · 🇪🇪 [et](../../../et/docs/guides/KIRO_SETUP.md) · 🇮🇷 [fa](../../../fa/docs/guides/KIRO_SETUP.md) · 🇫🇮 [fi](../../../fi/docs/guides/KIRO_SETUP.md) · 🇫🇷 [fr](../../../fr/docs/guides/KIRO_SETUP.md) · 🇮🇪 [ga](../../../ga/docs/guides/KIRO_SETUP.md) · 🇮🇳 [gu](../../../gu/docs/guides/KIRO_SETUP.md) · 🇳🇬 [ha](../../../ha/docs/guides/KIRO_SETUP.md) · 🇮🇱 [he](../../../he/docs/guides/KIRO_SETUP.md) · 🇮🇳 [hi](../../../hi/docs/guides/KIRO_SETUP.md) · 🇭🇷 [hr](../../../hr/docs/guides/KIRO_SETUP.md) · 🇭🇺 [hu](../../../hu/docs/guides/KIRO_SETUP.md) · 🇦🇲 [hy](../../../hy/docs/guides/KIRO_SETUP.md) · 🇮🇩 [id](../../../id/docs/guides/KIRO_SETUP.md) · 🇳🇬 [ig](../../../ig/docs/guides/KIRO_SETUP.md) · 🇮🇹 [it](../../../it/docs/guides/KIRO_SETUP.md) · 🇯🇵 [ja](../../../ja/docs/guides/KIRO_SETUP.md) · 🇬🇪 [ka](../../../ka/docs/guides/KIRO_SETUP.md) · 🇰🇭 [km](../../../km/docs/guides/KIRO_SETUP.md) · 🇮🇳 [kn](../../../kn/docs/guides/KIRO_SETUP.md) · 🇰🇷 [ko](../../../ko/docs/guides/KIRO_SETUP.md) · 🇱🇹 [lt](../../../lt/docs/guides/KIRO_SETUP.md) · 🇱🇻 [lv](../../../lv/docs/guides/KIRO_SETUP.md) · 🇮🇳 [ml](../../../ml/docs/guides/KIRO_SETUP.md) · 🇮🇳 [mr](../../../mr/docs/guides/KIRO_SETUP.md) · 🇲🇾 [ms](../../../ms/docs/guides/KIRO_SETUP.md) · 🇲🇹 [mt](../../../mt/docs/guides/KIRO_SETUP.md) · 🇲🇲 [my](../../../my/docs/guides/KIRO_SETUP.md) · 🇳🇵 [ne](../../../ne/docs/guides/KIRO_SETUP.md) · 🇳🇱 [nl](../../../nl/docs/guides/KIRO_SETUP.md) · 🇳🇴 [no](../../../no/docs/guides/KIRO_SETUP.md) · 🇮🇳 [or](../../../or/docs/guides/KIRO_SETUP.md) · 🇮🇳 [pa](../../../pa/docs/guides/KIRO_SETUP.md) · 🇵🇭 [phi](../../../phi/docs/guides/KIRO_SETUP.md) · 🇵🇱 [pl](../../../pl/docs/guides/KIRO_SETUP.md) · 🇵🇹 [pt](../../../pt/docs/guides/KIRO_SETUP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/KIRO_SETUP.md) · 🇷🇴 [ro](../../../ro/docs/guides/KIRO_SETUP.md) · 🇷🇺 [ru](../../../ru/docs/guides/KIRO_SETUP.md) · 🇱🇰 [si](../../../si/docs/guides/KIRO_SETUP.md) · 🇸🇰 [sk](../../../sk/docs/guides/KIRO_SETUP.md) · 🇸🇮 [sl](../../../sl/docs/guides/KIRO_SETUP.md) · 🇷🇸 [sr](../../../sr/docs/guides/KIRO_SETUP.md) · 🇸🇪 [sv](../../../sv/docs/guides/KIRO_SETUP.md) · 🇰🇪 [sw](../../../sw/docs/guides/KIRO_SETUP.md) · 🇮🇳 [ta](../../../ta/docs/guides/KIRO_SETUP.md) · 🇮🇳 [te](../../../te/docs/guides/KIRO_SETUP.md) · 🇹🇭 [th](../../../th/docs/guides/KIRO_SETUP.md) · 🇹🇷 [tr](../../../tr/docs/guides/KIRO_SETUP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/KIRO_SETUP.md) · 🇵🇰 [ur](../../../ur/docs/guides/KIRO_SETUP.md) · 🇺🇿 [uz](../../../uz/docs/guides/KIRO_SETUP.md) · 🇻🇳 [vi](../../../vi/docs/guides/KIRO_SETUP.md) · 🇳🇬 [yo](../../../yo/docs/guides/KIRO_SETUP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/KIRO_SETUP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/KIRO_SETUP.md)

---

يغطي هذا الدليل إضافة حسابات Kiro (مساعد برمجة بالذكاء الاصطناعي مستضاف على AWS) إلى OmniRoute،
مع التركيز على تشغيل حسابات متعددة في الوقت نفسه دون تعارضات في الجلسات.

---

## الخلفية: لماذا قد تتعارض حسابات Kiro

تستخدم الواجهة الخلفية لـ Kiro تسجيلات عملاء AWS SSO OIDC لتتبع الجلسات النشطة.
القيد الأساسي هو: **يدعم كل تسجيل عميل OIDC جلسة نشطة واحدة فقط
في كل مرة**. عندما يصادق جهاز أو مستخدم ثانٍ باستخدام العميل المسجل نفسه،
تُبطل الواجهة الخلفية رمز التحديث الخاص بالحساب الأول.

هذه هي الآلية نفسها التي تسبب مشكلات عند تشغيل `kiro-cli login` على
جهاز سبق تسجيل الدخول فيه إلى حساب Kiro آخر — إذ يلغي تسجيل الدخول الجديد
رمز الحساب الأول.

---

## كيف يحل OmniRoute هذه المشكلة (v3.8.0+)

بدءًا من v3.8.0، يستدعي OmniRoute الدالة `registerClient()` ‏(AWS SSO OIDC) أثناء كل
عملية استيراد لاتصال Kiro. يمنح هذا كل اتصال في OmniRoute تسجيل عميل OIDC مخصصًا
له. ونظرًا إلى استقلال كل تسجيل عميل، فإن تحديث مصادقة أحد الحسابات أو
إعادة مصادقته لا يؤثر في رمز التحديث لأي حساب آخر.

ينطبق العزل على طرق الاستيراد التي تستخدم رمز التحديث، بينما تتجنب المصادقة بمفتاح API
جلسات تحديث OIDC بالكامل:

| طريقة الاستيراد                                                 | حالة العزل                                                                                               |
| --------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| تدفق رمز الجهاز لـ AWS Builder ID / IDC                         | معزول منذ تقديم تدفق رمز الجهاز                                                                          |
| **استيراد الرمز** (لصق رمز التحديث يدويًا)                      | معزول منذ v3.8.0                                                                                         |
| **تسجيل الدخول الاجتماعي عبر Google / GitHub**                  | معزول منذ v3.8.0                                                                                         |
| **الاستيراد التلقائي** (قاعدة بيانات SQLite الخاصة بـ kiro-cli) | معزول منذ v3.8.0 (كان مسار SQLite معزولًا بالفعل؛ وأصبح خيار الرجوع إلى ذاكرة SSO المؤقتة معزولًا أيضًا) |
| **مفتاح API** (مفتاح CodeWhisperer طويل الأجل)                  | لا توجد جلسة تحديث؛ يُتحقق من المفتاح ويُخزن باعتباره بيانات اعتماد من نوع bearer                        |

---

## ملاحظة ترحيل للاتصالات المنشأة قبل v3.8.0

لا تحتوي الاتصالات المستوردة قبل v3.8.0 على تسجيل عميل OIDC مخصص
مخزن في `providerSpecificData`. تستمر هذه الاتصالات في العمل، لكنها تستخدم
نقطة نهاية تحديث المصادقة الاجتماعية المشتركة، ما يعني أن اتصالين من هذا النوع قد يظلان قادرين على إبطال
أحدهما الآخر.

**للحصول على العزل:** احذف الاتصال القديم من **لوحة المعلومات → المزوّدون** ثم
أعد استيراده باستخدام أي من تدفقات الاستيراد المدعومة. ستحصل جميع الاتصالات المنشأة حديثًا
على تسجيل عميل خاص بها تلقائيًا.

---

## إضافة حسابي Kiro جنبًا إلى جنب

### المتطلبات الأساسية

- OmniRoute v3.8.0 أو إصدار أحدث.
- حساب Kiro صالح (بريد إلكتروني + كلمة مرور، أو تسجيل الدخول عبر Google أو GitHub).
- حساب Kiro ثانٍ اختياريًا.

### الخطوة 1: استيراد الحساب الأول

1. افتح **لوحة المعلومات → المزوّدون → إضافة مزوّد → Kiro**.
2. اختر أحد الخيارات التالية:
   - **استيراد الرمز** — الصق رمز تحديث يبدأ بـ `aorAAAAAG`.
   - **مفتاح API** — الصق مفتاح Kiro / CodeWhisperer API طويل الأجل.
   - **تسجيل الدخول عبر Google / GitHub** — أكمل تدفق OAuth في المتصفح.
   - **الاستيراد التلقائي** — انقر على الزر؛ يقرأ OmniRoute بيانات الاعتماد من
     قاعدة بيانات kiro-cli المحلية أو `~/.aws/sso/cache`.
3. يُحفظ الاتصال. تسجّل التدفقات التي تستخدم رمز التحديث عميل OIDC مخصصًا
   تلقائيًا. أما التدفقات التي تستخدم مفتاح API فتتحقق من المفتاح عبر AWS ولا تخزن رمز تحديث.

### الخطوة 2: استيراد الحساب الثاني

كرر الخطوة 1 للحساب الثاني. ونظرًا إلى أن كل عملية استيراد تنشئ تسجيل عميل OIDC
منفصلًا، يكون الاتصالان معزولين بالكامل.

### الخطوة 3: التحقق من أن كلا الاتصالين نشط

1. **لوحة المعلومات → المزوّدون** — يجب أن يعرض كلا اتصالي Kiro الحالة **نشط**.
2. **لوحة المعلومات → الصحة** — يجب أن يجتاز كلا الاتصالين فحص سلامة الرمز الخاص بهما.

### الخطوة 4: استخدام مجموعة للتوجيه بين الحسابات

أنشئ مجموعة يكون كلا الاتصالين وجهتين فيها، لموازنة الحمل بينهما أو الانتقال إلى أحدهما عند تعذر الآخر:

```
kiro/kiro-dev → kiro/kiro-pro
```

راجع [FEATURES.md](./FEATURES.md) ووثائق التوجيه لمعرفة كيفية إعداد المجموعات.

---

## مستخدمو المؤسسات / IDC

بالنسبة إلى حسابات AWS IAM Identity Center (IDC)، استخدم مسار **AWS Builder ID / رمز جهاز IDC**
من **لوحة التحكم → المزوّدون → Kiro → رمز الجهاز**. لطالما كان مسار رمز الجهاز
معزولًا بالكامل. لا حاجة إلى إعادة الاستيراد لهذه الاتصالات.

يمكن لمستخدمي المؤسسات الذين يعملون في منطقة AWS غير افتراضية تحديد المنطقة عند
الاستيراد عبر واجهة برمجة تطبيقات استيراد الرمز:

```bash
curl -X POST http://localhost:20128/api/oauth/kiro/import \
  -H "Content-Type: application/json" \
  -d '{"refreshToken": "aorAAAAAG...", "region": "eu-west-1"}'
```

تكون القيمة الافتراضية للحقل `region` هي `us-east-1` عند حذفه.

---

## مسار استيراد مفتاح API

مصادقة مفتاح API مخصّصة لبيانات اعتماد Kiro / AWS CodeWhisperer من نوع bearer طويلة الأجل. وهي
لا تستخدم تحديث OAuth، لذا تتجنب إبطال جلسة OIDC المشتركة.

### لوحة التحكم

1. افتح **لوحة التحكم -> المزوّدون -> Kiro**.
2. اختر **مفتاح API**.
3. الصق مفتاح API ومنطقة AWS الاختيارية (`us-east-1` افتراضيًا).
4. يتحقق OmniRoute من المفتاح ويحفظ الاتصال.

### واجهة API

```bash
curl -X POST http://localhost:20128/api/oauth/kiro/api-key \
  -H "Content-Type: application/json" \
  -d '{"apiKey": "kiro_or_codewhisperer_key", "region": "us-east-1"}'
```

### العقد الداخلي

يتحقق مسار API من المفتاح باستدعاء `KiroService.validateApiKey()`، الذي
يستخدم `ListAvailableProfiles` مع نقطة نهاية CodeWhisperer/Amazon Q المطابقة
للمنطقة ويستخرج `profileArn`.

يستخدم الاتصال المحفوظ ما يلي:

```json
{
  "authType": "apikey",
  "providerSpecificData": {
    "authMethod": "api_key",
    "region": "us-east-1",
    "profileArn": "arn:aws:codewhisperer:..."
  }
}
```

في وقت التشغيل، ترسل `KiroExecutor.buildHeaders()` المفتاح بصيغة
`Authorization: Bearer <key>` وتضيف `tokentype: API_KEY`. تستخدم استدعاءات الحصة/الملف الشخصي
العلامة نفسها لكي تتعامل AWS مع بيانات اعتماد bearer باعتبارها مفتاح API طويل الأجل بدلًا من
رمز وصول OIDC أو رمز وصول اجتماعي.

---

## انتهاء صلاحية عميل OIDC

تنتهي صلاحية عملاء AWS SSO OIDC العموميين عادةً بعد 90 يومًا
(`clientSecretExpiresAt`). يخزّن OmniRoute هذا الطابع الزمني في `providerSpecificData`
لأغراض قابلية المراقبة. إذا توقف تحديث أحد الاتصالات بعد نحو 90 يومًا، فأعد استيراد
الاتصال للحصول على تسجيل جديد لعميل OIDC. ويجري تتبع إعادة التسجيل التلقائي عند
انتهاء الصلاحية كتحسين مستقبلي.

لا تخضع اتصالات مفتاح API لانتهاء صلاحية عميل OIDC لأنها لا تُحدّث
عبر AWS SSO OIDC.

---

## استكشاف الأخطاء وإصلاحها

### يستمر تسجيل خروج الحساب الثاني

- تحقّق من كلا الاتصالين في **لوحة التحكم → المزوّدون** وتأكد من أن كلًا منهما يعرض قيمة غير فارغة
  لـ `clientId` في JSON الخام الخاص به (يمكن رؤيتها عبر أيقونة المعلومات). إذا كان `clientId` مفقودًا
  من أيّ من الاتصالين، فقد تم استيراده قبل v3.8.0 — أعد استيراده.

### يفشل الاستيراد مع ظهور "فشل التحقق من صحة الرمز"

- تأكد من أن رمز التحديث يبدأ بـ `aorAAAAAG`.
- تأكد من أن OmniRoute يمكنه الوصول إلى `https://oidc.us-east-1.amazonaws.com` (أو المنطقة
  التي تم تكوينها). إذا كنت تعمل خلف وكيل مؤسسي، فعيّن وكيلًا على مستوى المزوّد في
  **لوحة التحكم → الإعدادات → الوكلاء**.

### يفشل استيراد مفتاح API

- تأكد من أن المفتاح هو مفتاح API لـ Kiro / CodeWhisperer، وليس رمز تحديث.
- تأكد من أن منطقة AWS تطابق المفتاح/الحساب. المنطقة الافتراضية هي `us-east-1`.
- يجب أن يكون المفتاح قادرًا على استدعاء `ListAvailableProfiles`؛ وإلا فلن يتمكن OmniRoute من
  استخراج `profileArn` المطلوب.

للمشكلات الأخرى، راجع الملف الرئيسي [TROUBLESHOOTING.md](./TROUBLESHOOTING.md).
