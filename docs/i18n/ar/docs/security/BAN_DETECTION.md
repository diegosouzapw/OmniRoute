# Account-Ban / Banned-Keyword Detection (العربية)

🌐 **Languages:** 🇺🇸 [English](../../../../security/BAN_DETECTION.md) · 🇪🇹 [am](../../../am/docs/security/BAN_DETECTION.md) · 🇦🇿 [az](../../../az/docs/security/BAN_DETECTION.md) · 🇧🇬 [bg](../../../bg/docs/security/BAN_DETECTION.md) · 🇧🇩 [bn](../../../bn/docs/security/BAN_DETECTION.md) · 🇧🇦 [bs](../../../bs/docs/security/BAN_DETECTION.md) · 🇨🇿 [cs](../../../cs/docs/security/BAN_DETECTION.md) · 🇩🇰 [da](../../../da/docs/security/BAN_DETECTION.md) · 🇩🇪 [de](../../../de/docs/security/BAN_DETECTION.md) · 🇬🇷 [el](../../../el/docs/security/BAN_DETECTION.md) · 🇪🇸 [es](../../../es/docs/security/BAN_DETECTION.md) · 🇪🇪 [et](../../../et/docs/security/BAN_DETECTION.md) · 🇮🇷 [fa](../../../fa/docs/security/BAN_DETECTION.md) · 🇫🇮 [fi](../../../fi/docs/security/BAN_DETECTION.md) · 🇫🇷 [fr](../../../fr/docs/security/BAN_DETECTION.md) · 🇮🇪 [ga](../../../ga/docs/security/BAN_DETECTION.md) · 🇮🇳 [gu](../../../gu/docs/security/BAN_DETECTION.md) · 🇳🇬 [ha](../../../ha/docs/security/BAN_DETECTION.md) · 🇮🇱 [he](../../../he/docs/security/BAN_DETECTION.md) · 🇮🇳 [hi](../../../hi/docs/security/BAN_DETECTION.md) · 🇭🇷 [hr](../../../hr/docs/security/BAN_DETECTION.md) · 🇭🇺 [hu](../../../hu/docs/security/BAN_DETECTION.md) · 🇦🇲 [hy](../../../hy/docs/security/BAN_DETECTION.md) · 🇮🇩 [id](../../../id/docs/security/BAN_DETECTION.md) · 🇳🇬 [ig](../../../ig/docs/security/BAN_DETECTION.md) · 🇮🇹 [it](../../../it/docs/security/BAN_DETECTION.md) · 🇯🇵 [ja](../../../ja/docs/security/BAN_DETECTION.md) · 🇬🇪 [ka](../../../ka/docs/security/BAN_DETECTION.md) · 🇰🇭 [km](../../../km/docs/security/BAN_DETECTION.md) · 🇮🇳 [kn](../../../kn/docs/security/BAN_DETECTION.md) · 🇰🇷 [ko](../../../ko/docs/security/BAN_DETECTION.md) · 🇱🇹 [lt](../../../lt/docs/security/BAN_DETECTION.md) · 🇱🇻 [lv](../../../lv/docs/security/BAN_DETECTION.md) · 🇮🇳 [ml](../../../ml/docs/security/BAN_DETECTION.md) · 🇮🇳 [mr](../../../mr/docs/security/BAN_DETECTION.md) · 🇲🇾 [ms](../../../ms/docs/security/BAN_DETECTION.md) · 🇲🇹 [mt](../../../mt/docs/security/BAN_DETECTION.md) · 🇲🇲 [my](../../../my/docs/security/BAN_DETECTION.md) · 🇳🇵 [ne](../../../ne/docs/security/BAN_DETECTION.md) · 🇳🇱 [nl](../../../nl/docs/security/BAN_DETECTION.md) · 🇳🇴 [no](../../../no/docs/security/BAN_DETECTION.md) · 🇮🇳 [or](../../../or/docs/security/BAN_DETECTION.md) · 🇮🇳 [pa](../../../pa/docs/security/BAN_DETECTION.md) · 🇵🇭 [phi](../../../phi/docs/security/BAN_DETECTION.md) · 🇵🇱 [pl](../../../pl/docs/security/BAN_DETECTION.md) · 🇵🇹 [pt](../../../pt/docs/security/BAN_DETECTION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/BAN_DETECTION.md) · 🇷🇴 [ro](../../../ro/docs/security/BAN_DETECTION.md) · 🇷🇺 [ru](../../../ru/docs/security/BAN_DETECTION.md) · 🇱🇰 [si](../../../si/docs/security/BAN_DETECTION.md) · 🇸🇰 [sk](../../../sk/docs/security/BAN_DETECTION.md) · 🇸🇮 [sl](../../../sl/docs/security/BAN_DETECTION.md) · 🇷🇸 [sr](../../../sr/docs/security/BAN_DETECTION.md) · 🇸🇪 [sv](../../../sv/docs/security/BAN_DETECTION.md) · 🇰🇪 [sw](../../../sw/docs/security/BAN_DETECTION.md) · 🇮🇳 [ta](../../../ta/docs/security/BAN_DETECTION.md) · 🇮🇳 [te](../../../te/docs/security/BAN_DETECTION.md) · 🇹🇭 [th](../../../th/docs/security/BAN_DETECTION.md) · 🇹🇷 [tr](../../../tr/docs/security/BAN_DETECTION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/BAN_DETECTION.md) · 🇵🇰 [ur](../../../ur/docs/security/BAN_DETECTION.md) · 🇺🇿 [uz](../../../uz/docs/security/BAN_DETECTION.md) · 🇻🇳 [vi](../../../vi/docs/security/BAN_DETECTION.md) · 🇳🇬 [yo](../../../yo/docs/security/BAN_DETECTION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/BAN_DETECTION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/BAN_DETECTION.md)

---

يفحص OmniRoute استجابات الأخطاء الواردة من موفّري الخدمة بحثًا عن إشارات تدل على أن
**الحساب متوقف نهائيًا** (معلّق / مُعطّل / محظور بسبب مخالفة شروط الخدمة)، وعند
العثور على تطابق، ينقل ذلك الاتصال إلى **حالة `banned` نهائية** كي لا يعود
مُختارًا للطلبات. وهذا ما تضبطه بطاقة إعدادات **الأمان → الكلمات المحظورة**
("كلمات إضافية تؤدي إلى اكتشاف الحظر الدائم للحساب. تنطبق الكلمات المضمّنة دائمًا.").

توثّق هذه الصفحة القائمة المضمّنة، ومسار الاكتشاف، ونطاقه، وكيفية إضافة
كلمات مخصّصة بأمان، وكيفية استعادة اتصال تم وضع علامة عليه. وتُعدّ الحالة
النهائية نفسها جزءًا من نموذج المرونة — راجع
[RESILIENCE_GUIDE](../architecture/RESILIENCE_GUIDE.md) ("الحالات النهائية").

**المصدر المرجعي:** `open-sse/services/accountFallback.ts`
(`ACCOUNT_DEACTIVATED_SIGNALS`، و`getMergedBannedSignals()`، و`isAccountDeactivated()`)،
بالإضافة إلى `open-sse/services/errorClassifier.ts` لفئة التحقق غير النهائية
(`ACCOUNT_VERIFICATION_REQUIRED_SIGNALS` / `isAccountVerificationRequired()`) ولتفرّع
403 الذي يستخدمها.

## الكلمات المفتاحية المضمّنة

تنطبق هذه السلاسل النصية الفرعية السبعة دائمًا (دون حساسية لحالة الأحرف)، بغض النظر عن أي قائمة مخصّصة:

```
account_deactivated
account has been deactivated
account has been disabled
your account has been suspended
this account is deactivated
this service has been disabled in this account for violation    (Antigravity)
this service has been disabled in this account                  (Antigravity)
```

> تتطور هذه القائمة مع تغيير موفّري الخدمة لصياغة رسائل الحظر. والنسخة المرجعية
> هي `ACCOUNT_DEACTIVATED_SIGNALS` في `open-sse/services/accountFallback.ts`؛
> لذا تعامل مع الكتلة أعلاه على أنها لقطة مؤقتة.

### ليست حظرًا: مطالبات التحقق التي يمكن للمشغّل التعامل معها

كانت العبارة `verify your account to continue` **مدرجة سابقًا** في القائمة أعلاه. لكنها ليست
إشارة حظر، وأصبحت الآن ضمن `ACCOUNT_VERIFICATION_REQUIRED_SIGNALS`، التي تصنّفها على أنها
`PROJECT_ROUTE_ERROR` قابلة للاسترداد بدلًا من إنهاء الاتصال نهائيًا.

تعيدها Google Cloud Code / Antigravity بصيغة `403 VALIDATION_REQUIRED`. وهي
**مؤقتة وتظهر على حسابات سليمة ذات حصص كاملة** — وفق قياسات على نشر فعلي
(2026-09-25، `proxy_logs`): أعاد اتصال واحد عبر Antigravity عدد 33 من أخطاء 403 هذه
خلال 10 دقائق وظل `active`، بينما حُظر نهائيًا اتصال مماثل يحتفظ بنسبة 100 % من
حصته في جميع النوافذ الـ17 بسبب ظهور **واحد فقط** منها. وكان الاختلاف الوحيد
هو المحاولة التي صادف أن تمت خدمتها.

هذا التمييز مهم لأن التطابق النهائي يكون `permanent: true` (فترة تهدئة لمدة عام،
ولا يسترد الاتصال عافيته تلقائيًا أبدًا)، في حين يمكن للمشغّل معالجة مطالبة التحقق عبر المتصفح.
كما أن إبقاء العبارة في قائمة الحظر جعل فرع الخطأ 403 القابل للاسترداد الخاص بـ cloud-code في
`classifyProviderError` غير قابل للوصول لهذه الصياغة، لأن `accountDeactivated`
يُقيَّم أولًا — ولذلك لم يكن من الممكن مطلقًا تشغيل استرداد مسار المشروع المضاف لـ Gemini Code Assist في
[#868](https://github.com/diegosouzapw/OmniRoute/pull/868) و
[#6452](https://github.com/diegosouzapw/OmniRoute/pull/6452).

جداول الإشارات الثلاثة المتجاورة و**المنفصلة** التالية ليست جزءًا من اكتشاف الكلمات المفتاحية للحظر:

- `CREDITS_EXHAUSTED_SIGNALS` — نفاد الرصيد/الحصة (`insufficient_quota`،
  `credit_balance_too_low`، `payment required`، …) ← حالة نهائية `credits_exhausted`.
- `OAUTH_INVALID_TOKEN_SIGNALS` — **غير نهائية**؛ يمكن الاسترداد من خلال تحديث الرمز المميز.
- `ACCOUNT_VERIFICATION_REQUIRED_SIGNALS` — **غير نهائية**؛ يجب على المشغّل
  إعادة التحقق من الحساب لدى الجهة الموفّرة. توجد في `open-sse/services/errorClassifier.ts`
  (بينما توجد القائمتان الأخريان في `accountFallback.ts`). راجع القسم أعلاه.

ملاحظة: تتولى آلية تحديد المعدّل / فترة تهدئة الاتصال معالجة العبارات المؤقتة الشائعة مثل
**`rate limit`** / `429`، وهي **ليست** إشارات حظر.

## تدفق الاكتشاف

```
استجابة خطأ من الجهة المزوّدة
  ← تحويل النص الأساسي إلى سلسلة نصية ثم إلى أحرف صغيرة
  ← isAccountDeactivated(body): getMergedBannedSignals().some(sig => body.includes(sig))   [مطابقة سلسلة فرعية]
  ← هل يوجد تطابق؟
      ← connection testStatus = "banned"      (دائم — فترة تهدئة لمدة سنة، ولا يُستعاد تلقائيًا مطلقًا)
      ← إذا كان الإعداد `autoDisableBannedAccounts` مفعّلًا وكان `autoDisableBannedScope`
        يشمل هذا الاتصال (`all`، أو `subscription` لاتصالات OAuth/ملفات تعريف الارتباط/الجلسات)
        ← تُضبط أيضًا isActive = false. تظل مفاتيح API مسبقة الدفع نشطة عندما يكون النطاق
        `subscription`.
      ← يُتخطى الاتصال أثناء اختيار الحساب (حالات QUOTA_BLOCKING المجمّعة)
```

- المطابقة هي بحث **غير حساس لحالة الأحرف عن سلسلة فرعية** في **النص الأساسي**
  للاستجابة (`isAccountDeactivated`، و`accountFallback.ts`).
- يحدث الانتقال النهائي الدائم إلى `banned` عند وجود إشارة حظر في النص الأساسي عند **أي
  حالة HTTP** (عبر `markAccountUnavailable` ← `checkFallbackError`). أما تسمية
  **`deactivated`** الأضيق نطاقًا (`isActive=false` عندما لا يحتوي الاتصال على
  مفاتيح API احتياطية)، فتُكتب بواسطة مسار `chatCore.ts` المضمّن عند **HTTP 401 / 403**
  (مصنّفة عبر `classifyProviderError` ← `ACCOUNT_DEACTIVATED`). لاحظ أن مسار
  `markAccountUnavailable()` يكتب حالة نهائية _مختلفة_ —
  **`expired`** — لإشارة `ACCOUNT_DEACTIVATED` نفسها (عبر
  `resolveTerminalConnectionStatus`)، ولذلك قد يظهر الحظر نفسه إما على هيئة
  `deactivated` أو `expired` بحسب المسار الذي عالج الاستجابة. (ينص تعليق
  الشيفرة الأقدم على "عندما يحتوي النص الأساسي لاستجابة 401 على هذه السلاسل" — وهذا
  يقلّل من نطاق السلوك الحالي.)
- يُستبعد اتصال `banned` من الاختيار في كل موضع تُرشَّح فيه الحالات النهائية
  (`isTerminalConnectionStatus`، وحالات `QUOTA_BLOCKING_CONNECTION_STATUSES` المجمّعة).

## النطاق — موفّرو الخدمة الذين يتم فحصهم

**جميع موفّري الخدمة.** يعمل الفحص ضمن مسار معالجة الأخطاء العام الذي تمر عبره
كل طلبات المنبع الفاشلة — وهو **غير** مقيّد بأدوات جمع بيانات
OAuth/الاشتراكات. وتكون الحالة النهائية الناتجة خاصة بكل **اتصال**،
وليس بكل موفّر خدمة.

مع ذلك، فإن _السلاسل النصية_ المضمّنة موجّهة نحو موفّري الاشتراكات/OAuth
المعرّضين فعليًا لخطر الحظر (ChatGPT Web Codex وClaude Web وCodex وMuse Spark
وAntigravity). لن يشغّل موفّر يعتمد على مفتاح API أداة الكشف إلا إذا احتوى
نص الخطأ حرفيًا على إحدى السلاسل الفرعية.

يتحكم `autoDisableBannedScope` (`all` | `subscription`، والقيمة الافتراضية `all`)
فيما إذا كانت المطابقة ستعيّن أيضًا `isActive=false`. وتعني `subscription`
المقاعد ذات نمط تسجيل الدخول (الاشتراكات المدفوعة والحسابات المجانية، بما في
ذلك جلسات ملفات تعريف الارتباط على الويب). ولا يزال النظام يسجّل
`testStatus=banned` لمفاتيح API مسبقة الدفع، لكنه يُبقيها ضمن مجموعة التوجيه.
أما التصميم الدائم فهو تجاوز خاص بكل موفّر خدمة وكل حساب؛ والتعداد العام هو
التطبيق الأولي.

## كلمات الحظر المخصصة

أضف الكلمات المفتاحية أو أزلها من **الأمان ← كلمات الحظر** (تُحفَظ كإعداد
`customBannedSignals` عام عبر `PATCH /api/settings`). وتُضاف هذه الكلمات
**إلى** القائمة المضمّنة — ولا تستبدلها أبدًا — ويُعاد تحميلها فور الحفظ
(وكذلك عند بدء التشغيل) عبر `setCustomBannedSignals()`. يقتصر طول كل كلمة
مفتاحية على 200 حرف؛ ولا يوجد حد لطول المصفوفة.

**⚠ خطر النتائج الإيجابية الخاطئة — اختر عبارات محددة.** يعتمد الكشف على مطابقة
سلسلة فرعية أولية في نص الاستجابة بالكامل، وتكون المطابقة **دائمة** (فترة تهدئة
مدتها سنة واحدة، واسترداد يدوي). وقد تتسبب كلمة مفتاحية عامة في حظر اتصال سليم
تمامًا:

- **سيئ:** `quota` و`limit` و`error` و`denied` — تظهر في كثير من الأخطاء المؤقتة.
- **جيد:** جمل الحظر الكاملة، مثل `your account has been suspended for`
  و`account permanently banned` و`violation of our terms`.

اختر أطول عبارة واضحة لا لبس فيها يعيدها موفّر الخدمة عند حدوث حظر فعلي. وعند
الشك، راقب أولًا `lastError` الخاص بالاتصال، ثم أضف الصياغة الدقيقة.

## استرداد اتصال تم وضع علامة عليه

الحالات النهائية `banned` / `deactivated` **لا تسترد عافيتها تلقائيًا أبدًا**
(إذ تُستبعد من دورة الاسترداد الاستباقي — ولا تسترد تلقائيًا سوى فترات التهدئة
`unavailable`). يجب على المشغّل مسحها صراحةً:

1. **أعِد اختبار الاتصال** — إجراء **الاختبار** في لوحة المعلومات
   (`POST /api/providers/{id}/test`)؛ إذ يعيد الفحص الناجح `testStatus` إلى
   `active` ويمسح حقول الأخطاء.
2. **أعِد المصادقة / عدّل بيانات الاعتماد** — بالنسبة إلى موفّري OAuth، أعِد
   تشغيل تدفق تسجيل الدخول / التحديث؛ وتعيّن مسارات إنشاء/استيراد موفّر الخدمة
   `isActive = true`.
3. **أعِد تمكين الاتصال** — إذا عيّن التعطيل التلقائي `isActive = false`
   (للنطاق `all`، أو `subscription` لاتصال OAuth/ملفات تعريف الارتباط/الجلسة)،
   فأعِد تشغيله بعد إصلاح الحساب.

لا يوجد زر منفصل «لمسح علامة الحظر» — يتم الاسترداد بإعادة الاختبار أو إعادة
المصادقة أو إعادة التمكين، بما يتوافق مع قاعدة الحالة النهائية العامة في
[RESILIENCE_GUIDE](../architecture/RESILIENCE_GUIDE.md).

## عزل الفحص (اختبار جميع النماذج)

إن **الفشل الناشئ عن فحص** (عمليات إرسال اختبار جميع النماذج / فحص السلامة
المنفّذة داخل `runAsProbe`) لا يزيل اتصالًا من المجموعة أبدًا (#9817): بل
**يُسجَّل لأغراض الرؤية** (`last_error` و`last_error_type` و`error_code`
و`last_error_at`)، لكنه يتخطى **كل** تغيير في حالة التوجيه — فترات التهدئة،
والحالات النهائية (`banned` / `deactivated` / `credits_exhausted`)، وعمليات
الحظر لكل نموذج، وقاطع دائرة موفّر الخدمة، وذاكرة الحصة المؤقتة ذات الخمس دقائق،
وتحديث رمز OAuth، والتعطيل التلقائي. لا يؤدي إلى التعطيل سوى فشل يحدث في مسار
طلب حقيقي. والخطأ المسجّل هو ما يجعل الحساب الموضوع عليه علامة ظاهرًا في لوحة
المعلومات بينما يواصل خدمة حركة البيانات.

نقطة القرار الوحيدة هي `shouldIsolateProbeFailures()`
(`src/shared/utils/probeOrigin.ts`)، وتستشيرها **كل** المواضع التي يمكن أن
تغيّر حالة التوجيه نتيجة فشل ناشئ عن فحص:

- `markAccountUnavailable` (`auth.ts`) — التسجيل فقط (النص الأولي في
  `lastError`، و`lastErrorType`، و`errorCode`، و`lastErrorAt`؛ ومن دون
  `backoffLevel` **عمدًا**، لأنه سيؤدي إلى تشغيل التناقص التلقائي وقت الاختيار
  ومحو السجل)
- `maybeAutoDisableBannedAccount` — لا تعطيل تلقائي
- `chatCore` — ‏FORBIDDEN وACCOUNT_DEACTIVATED وQUOTA_EXHAUSTED (التسجيل فقط،
  من دون الحالة النهائية `credits_exhausted`)، وGEO_BLOCKED (لا استبعاد لمدة
  24 ساعة)، وMODEL_NOT_FOUND (لا `lockModel`)، والتحويل عند فشل تدوير حساب
  codex بسبب 429 (لا `markCodexScopeRateLimited`، ولا حفظ
  `rate_limited_until`، ولا مسح ارتباط الجلسة)، و`persistCodexQuotaState`
  (لا كتابة لحالة الحصة ولا إبطال لذاكرة التخزين المؤقت)، و`recordKeyHealthStatus`
  (لا تغيير في مدوّر سلامة المفاتيح)
- تحديث OAuth — سواء التحديث الاستباقي في قاعدة المنفّذ
  (`base.ts` و`execute()`، من دون استهلاك تدوير رمز التحديث) أو مسار 401/403
  التفاعلي في `chatCore` (لا تعطيل بحالة `expired`)
- `chat.ts` — لا يحدث أي تدهور لقاطع دائرة موفّر الخدمة أو لذاكرة الحصة المؤقتة
  ذات الخمس دقائق (`markAccountExhaustedFrom429`)

الخطأ المسجّل هو ما يجعل الحساب الموضوع عليه علامة ظاهرًا في لوحة المعلومات
بينما يواصل خدمة حركة البيانات. ملاحظة: يخزّن سجل الفحص نص الخطأ **الأولي**
(غير المقتطع)، بخلاف اقتطاع `slice(0,100)` في المسار الحقيقي.

يمكن للمشغّلين الذين يستخدمون اختبار الجميع كأداة صيانة استعادة السلوك السابق
(يُحتسب الفحص كتوليد حقيقي) عبر أي مما يلي:

- الإعداد `probeCanDisable` (`POST /api/settings` مع
  `{"probeCanDisable": true}`، أو تعديل مباشر في قاعدة بيانات `key_value`)، أو
- علامة الميزة **`PROBE_CAN_DISABLE=true`** (تجاوز عبر البيئة أو قاعدة البيانات؛
  وتكون لها الأولوية على الإعداد).

آلية الأمان عند الفشل: إذا أدى البحث عن العلامة أو الإعدادات إلى طرح خطأ، يظل
العزل مفعّلًا.

## ملفات المصدر

| المجال                                      | الملف                                                                                                         |
| ------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| جداول الإشارات + المطابقة                   | `open-sse/services/accountFallback.ts`                                                                        |
| الإنهاء / الاستمرارية                       | `src/sse/services/auth.ts` (`markAccountUnavailable`, `resolveTerminalConnectionStatus`, `clearAccountError`) |
| نطاق التعطيل التلقائي                       | `src/shared/utils/autoDisableBanned.ts`, `src/sse/services/autoDisableBannedAccount.ts`                       |
| التصنيف المضمّن                             | `open-sse/handlers/chatCore.ts`, `open-sse/services/errorClassifier.ts`                                       |
| استثناء استعادة الحالة النهائية             | `src/lib/quota/connectionRecovery.ts`                                                                         |
| تحميل الكلمات المفتاحية المخصصة وقت التشغيل | `src/lib/config/runtimeSettings.ts` (`setCustomBannedSignals`)                                                |
| واجهة مستخدم الإعدادات                      | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`                                           |
