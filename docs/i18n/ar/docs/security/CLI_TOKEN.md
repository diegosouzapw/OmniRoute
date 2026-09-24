# CLI Machine-ID Token (العربية)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CLI_TOKEN.md) · 🇪🇹 [am](../../../am/docs/security/CLI_TOKEN.md) · 🇦🇿 [az](../../../az/docs/security/CLI_TOKEN.md) · 🇧🇬 [bg](../../../bg/docs/security/CLI_TOKEN.md) · 🇧🇩 [bn](../../../bn/docs/security/CLI_TOKEN.md) · 🇧🇦 [bs](../../../bs/docs/security/CLI_TOKEN.md) · 🇨🇿 [cs](../../../cs/docs/security/CLI_TOKEN.md) · 🇩🇰 [da](../../../da/docs/security/CLI_TOKEN.md) · 🇩🇪 [de](../../../de/docs/security/CLI_TOKEN.md) · 🇬🇷 [el](../../../el/docs/security/CLI_TOKEN.md) · 🇪🇸 [es](../../../es/docs/security/CLI_TOKEN.md) · 🇪🇪 [et](../../../et/docs/security/CLI_TOKEN.md) · 🇮🇷 [fa](../../../fa/docs/security/CLI_TOKEN.md) · 🇫🇮 [fi](../../../fi/docs/security/CLI_TOKEN.md) · 🇫🇷 [fr](../../../fr/docs/security/CLI_TOKEN.md) · 🇮🇪 [ga](../../../ga/docs/security/CLI_TOKEN.md) · 🇮🇳 [gu](../../../gu/docs/security/CLI_TOKEN.md) · 🇳🇬 [ha](../../../ha/docs/security/CLI_TOKEN.md) · 🇮🇱 [he](../../../he/docs/security/CLI_TOKEN.md) · 🇮🇳 [hi](../../../hi/docs/security/CLI_TOKEN.md) · 🇭🇷 [hr](../../../hr/docs/security/CLI_TOKEN.md) · 🇭🇺 [hu](../../../hu/docs/security/CLI_TOKEN.md) · 🇦🇲 [hy](../../../hy/docs/security/CLI_TOKEN.md) · 🇮🇩 [id](../../../id/docs/security/CLI_TOKEN.md) · 🇳🇬 [ig](../../../ig/docs/security/CLI_TOKEN.md) · 🇮🇹 [it](../../../it/docs/security/CLI_TOKEN.md) · 🇯🇵 [ja](../../../ja/docs/security/CLI_TOKEN.md) · 🇬🇪 [ka](../../../ka/docs/security/CLI_TOKEN.md) · 🇰🇭 [km](../../../km/docs/security/CLI_TOKEN.md) · 🇮🇳 [kn](../../../kn/docs/security/CLI_TOKEN.md) · 🇰🇷 [ko](../../../ko/docs/security/CLI_TOKEN.md) · 🇱🇹 [lt](../../../lt/docs/security/CLI_TOKEN.md) · 🇱🇻 [lv](../../../lv/docs/security/CLI_TOKEN.md) · 🇮🇳 [ml](../../../ml/docs/security/CLI_TOKEN.md) · 🇮🇳 [mr](../../../mr/docs/security/CLI_TOKEN.md) · 🇲🇾 [ms](../../../ms/docs/security/CLI_TOKEN.md) · 🇲🇹 [mt](../../../mt/docs/security/CLI_TOKEN.md) · 🇲🇲 [my](../../../my/docs/security/CLI_TOKEN.md) · 🇳🇵 [ne](../../../ne/docs/security/CLI_TOKEN.md) · 🇳🇱 [nl](../../../nl/docs/security/CLI_TOKEN.md) · 🇳🇴 [no](../../../no/docs/security/CLI_TOKEN.md) · 🇮🇳 [or](../../../or/docs/security/CLI_TOKEN.md) · 🇮🇳 [pa](../../../pa/docs/security/CLI_TOKEN.md) · 🇵🇭 [phi](../../../phi/docs/security/CLI_TOKEN.md) · 🇵🇱 [pl](../../../pl/docs/security/CLI_TOKEN.md) · 🇵🇹 [pt](../../../pt/docs/security/CLI_TOKEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CLI_TOKEN.md) · 🇷🇴 [ro](../../../ro/docs/security/CLI_TOKEN.md) · 🇷🇺 [ru](../../../ru/docs/security/CLI_TOKEN.md) · 🇱🇰 [si](../../../si/docs/security/CLI_TOKEN.md) · 🇸🇰 [sk](../../../sk/docs/security/CLI_TOKEN.md) · 🇸🇮 [sl](../../../sl/docs/security/CLI_TOKEN.md) · 🇷🇸 [sr](../../../sr/docs/security/CLI_TOKEN.md) · 🇸🇪 [sv](../../../sv/docs/security/CLI_TOKEN.md) · 🇰🇪 [sw](../../../sw/docs/security/CLI_TOKEN.md) · 🇮🇳 [ta](../../../ta/docs/security/CLI_TOKEN.md) · 🇮🇳 [te](../../../te/docs/security/CLI_TOKEN.md) · 🇹🇭 [th](../../../th/docs/security/CLI_TOKEN.md) · 🇹🇷 [tr](../../../tr/docs/security/CLI_TOKEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CLI_TOKEN.md) · 🇵🇰 [ur](../../../ur/docs/security/CLI_TOKEN.md) · 🇺🇿 [uz](../../../uz/docs/security/CLI_TOKEN.md) · 🇻🇳 [vi](../../../vi/docs/security/CLI_TOKEN.md) · 🇳🇬 [yo](../../../yo/docs/security/CLI_TOKEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CLI_TOKEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CLI_TOKEN.md)

---

## نظرة عامة

تُجري أوامر OmniRoute CLI المصادقة مع واجهة API المحلية للإدارة باستخدام رمز
`HMAC-SHA256(machine-id, salt)` يُرسَل عبر ترويسة الطلب
`x-omniroute-cli-token`.

يسمح هذا للأوامر الفرعية في CLI (`omniroute status` و`omniroute providers` وغيرها)
باستدعاء نقاط نهاية الإدارة دون مطالبة المستخدم بتوفير JWT أو
كلمة مرور عند كل استدعاء.

## آلية العمل

1. تقرأ `getMachineTokenSync()` مُعرّف الجهاز المادي عبر `node-machine-id`
   (وتعود إلى سلسلة فارغة عند الفشل، مما يعطّل مصادقة CLI).
2. تحسب `HMAC-SHA256(machine_id, salt)` وتُرجع ملخص hex كاملًا بطول 64 محرفًا
   — وهو رمز حتمي غير قابل للعكس ومرتبط بهذا الجهاز.
3. يرسل CLI الرمز باسم `x-omniroute-cli-token` فقط عندما تكون
   الوجهة المحددة عنوان URL صريحًا لواجهة الاسترجاع (`localhost` أو `127.0.0.0/8` أو
   IPv6 لواجهة الاسترجاع). تستخدم الطلبات التي تحمل الرمز `redirect: error`، بحيث لا يمكن
   لعملية إعادة توجيه محلية تمريره إلى أصل آخر. تستخدم السياقات البعيدة رموز وصول
   محددة النطاق بدلًا من ذلك. إذا تعذر الاشتقاق، يحذف CLI الترويسة
   ويُبلغ `omniroute doctor` عن الفشل بدلًا من اعتبار رمز فارغ
   صالحًا.
4. يعيد الخادم (`src/server/authz/policies/management.ts`) حساب
   الرمز المتوقع باستخدام قيمة salt نفسها ويقارنه عبر `timingSafeEqual`
   لمنع الاستخراج القائم على التوقيت.

## خصائص الأمان

| الخاصية                              | التفاصيل                                                                                                                                                                                     |
| ------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **واجهة الاسترجاع فقط**              | لا يُقبل إلا عندما تشير علامة محلية النظير الموثوقة لدى الخادم (المشتقة من عنوان نظير TCP الحقيقي) إلى واجهة الاسترجاع. لا يُوثق مطلقًا بترويسة `Host` التي يتحكم بها العميل لتحديد المحلية. |
| **مقارنة بزمن ثابت**                 | تمنع `crypto.timingSafeEqual` هجمات التوقيت.                                                                                                                                                 |
| **غير قابل للعكس**                   | لا يمكن استخدام ناتج HMAC لاستعادة machine-id.                                                                                                                                               |
| **لا تجاوز للحماية من نوع `always`** | تُقيَّم `isAlwaysProtectedPath()` قبل التحقق من رمز CLI. يتطلب كل من `/api/shutdown` و`/api/settings/database` دائمًا JWT.                                                                   |
| **غير قابل للتصدير**                 | لا يُكتب الرمز مطلقًا على القرص ولا يُسجَّل.                                                                                                                                                 |

## قيمة salt الافتراضية (عشوائية لكل تثبيت)

عندما لا تكون `OMNIROUTE_CLI_SALT` مضبوطة، تكون قيمة salt سلسلة hex عشوائية بطول 64 محرفًا
تُنشأ مرة واحدة وتُحفظ في `<DATA_DIR>/cli-token-salt.json` (بالوضع `0600`) —
وليست القيمة الحرفية `omniroute-cli-auth-v1` المضمّنة في المستودع. تقرأ كل من `getActiveSalt()` في
`src/lib/machineToken.ts` ونسختها المطابقة في `bin/cli/utils/cliToken.mjs`
الملف نفسه، بحيث يتوافق الخادم وكل استدعاء لـ CLI في هذا التثبيت على
القيمة نفسها؛ ولا تُستخدم القيمة الحرفية المضمّنة في المستودع إلا كحل أخير عندما لا يمكن
بعدُ إنشاء قيمة salt محفوظة أو مأخوذة من البيئة (مثلًا في تثبيت جديد يقتصر على CLI
قبل تشغيل الخادم لأول مرة). يعالج هذا نقطة ضعف القيمة الحرفية الثابتة
الافتراضية القديمة: يكون `/etc/machine-id` عادةً قابلًا للقراءة من جميع المستخدمين، ولذلك كان بإمكان
أي مستخدم محلي اشتقاق الرمز نفسه لكل تثبيت لم يضبط
`OMNIROUTE_CLI_SALT`.

## تدوير الملح

عيّن `OMNIROUTE_CLI_SALT` لتدوير الرمز المشتق دون تغييرات في الشيفرة — فهو
يحظى دائمًا بالأولوية على الملح المحفوظ لكل تثبيت. بعد التدوير، ستستخدم جميع عمليات CLI
على هذا الجهاز الرمز الجديد تلقائيًا. يكون ذلك مفيدًا بعد تسرّب قائمة
العمليات الذي ربما كشف القيمة المشتقة السابقة.

```bash
# تدوير دائم (أضِفه إلى ملف تعريف الصدفة)
export OMNIROUTE_CLI_SALT="my-secret-salt-2026"

# تحقّق من استخدام الرمز الجديد
omniroute status
```

## التنسيق القديم (SHA-256، ‏32 محرفًا) — لا يزال مقبولًا

قبل تنسيق HMAC أعلاه، كانت CLI تشتق رمزها على النحو التالي:
`SHA-256(machineId + salt).hex[0..32]` (بادئة من 32 محرفًا) في
`bin/cli/utils/cliToken.mjs` (`getLegacyCliTokenSync` في `src/lib/machineToken.ts`).

للتوافق مع الإصدارات السابقة، يقبل الخادم **كلا** التنسيقين: ينشئ المتحقق
`expectedTokens = [getMachineTokenSync(), getLegacyCliTokenSync()]` ويقارن
الترويسة الواردة بكل منهما باستخدام `timingSafeEqual`
(`src/server/authz/policies/management.ts` و`src/lib/middleware/cliTokenAuth.ts`).
لذلك يكون الرمز صالحًا إذا طابق **إما** مُلخّص HMAC المكوّن من 64 محرفًا أو بادئة
SHA-256 القديمة المكوّنة من 32 محرفًا.

**إلغاء الاشتراك:** عيّن `OMNIROUTE_DISABLE_CLI_TOKEN=true` (في البيئة أو `.env`) لتعطيل آلية رمز CLI
بالكامل؛ وعندئذٍ يتطلب كل وصول مفتاح API صريحًا. يُنصح بذلك على المضيفات متعددة المستخدمين،
لأن `machine-id` يُحدَّد لكل جهاز (وليس لكل مستخدم)، وقد يتمكن مستخدم آخر
على المضيف نفسه من حساب الرمز ذاته.

## الملفات

| الملف                                     | الغرض                                 |
| ----------------------------------------- | ------------------------------------- |
| `src/lib/machineToken.ts`                 | اشتقاق الرمز (`getMachineTokenSync`)  |
| `bin/cli/utils/cliToken.mjs`              | نسخة CLI المطابقة للاشتقاق نفسه       |
| `<DATA_DIR>/cli-token-salt.json`          | الملح العشوائي المحفوظ لكل تثبيت      |
| `src/server/authz/headers.ts`             | الثابت `CLI_TOKEN_HEADER`             |
| `src/server/authz/policies/management.ts` | التحقق من جانب الخادم                 |
| `src/server/authz/routeGuard.ts`          | فحص مضيف الاسترجاع (`isLoopbackHost`) |

## انظر أيضًا

- `docs/security/ROUTE_GUARD_TIERS.md` — مستويات حماية المسارات
- `docs/architecture/AUTHZ_GUIDE.md` — مسار التفويض الكامل
