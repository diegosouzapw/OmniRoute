# Cursor Provider in Docker Environments (العربية)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CURSOR-DOCKER.md) · 🇪🇹 [am](../../../am/docs/providers/CURSOR-DOCKER.md) · 🇦🇿 [az](../../../az/docs/providers/CURSOR-DOCKER.md) · 🇧🇬 [bg](../../../bg/docs/providers/CURSOR-DOCKER.md) · 🇧🇩 [bn](../../../bn/docs/providers/CURSOR-DOCKER.md) · 🇨🇿 [cs](../../../cs/docs/providers/CURSOR-DOCKER.md) · 🇩🇰 [da](../../../da/docs/providers/CURSOR-DOCKER.md) · 🇩🇪 [de](../../../de/docs/providers/CURSOR-DOCKER.md) · 🇬🇷 [el](../../../el/docs/providers/CURSOR-DOCKER.md) · 🇪🇸 [es](../../../es/docs/providers/CURSOR-DOCKER.md) · 🇪🇪 [et](../../../et/docs/providers/CURSOR-DOCKER.md) · 🇮🇷 [fa](../../../fa/docs/providers/CURSOR-DOCKER.md) · 🇫🇮 [fi](../../../fi/docs/providers/CURSOR-DOCKER.md) · 🇫🇷 [fr](../../../fr/docs/providers/CURSOR-DOCKER.md) · 🇮🇪 [ga](../../../ga/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [gu](../../../gu/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [ha](../../../ha/docs/providers/CURSOR-DOCKER.md) · 🇮🇱 [he](../../../he/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [hi](../../../hi/docs/providers/CURSOR-DOCKER.md) · 🇭🇷 [hr](../../../hr/docs/providers/CURSOR-DOCKER.md) · 🇭🇺 [hu](../../../hu/docs/providers/CURSOR-DOCKER.md) · 🇦🇲 [hy](../../../hy/docs/providers/CURSOR-DOCKER.md) · 🇮🇩 [id](../../../id/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [ig](../../../ig/docs/providers/CURSOR-DOCKER.md) · 🇮🇹 [it](../../../it/docs/providers/CURSOR-DOCKER.md) · 🇯🇵 [ja](../../../ja/docs/providers/CURSOR-DOCKER.md) · 🇬🇪 [ka](../../../ka/docs/providers/CURSOR-DOCKER.md) · 🇰🇭 [km](../../../km/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [kn](../../../kn/docs/providers/CURSOR-DOCKER.md) · 🇰🇷 [ko](../../../ko/docs/providers/CURSOR-DOCKER.md) · 🇱🇹 [lt](../../../lt/docs/providers/CURSOR-DOCKER.md) · 🇱🇻 [lv](../../../lv/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [ml](../../../ml/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [mr](../../../mr/docs/providers/CURSOR-DOCKER.md) · 🇲🇾 [ms](../../../ms/docs/providers/CURSOR-DOCKER.md) · 🇲🇹 [mt](../../../mt/docs/providers/CURSOR-DOCKER.md) · 🇲🇲 [my](../../../my/docs/providers/CURSOR-DOCKER.md) · 🇳🇵 [ne](../../../ne/docs/providers/CURSOR-DOCKER.md) · 🇳🇱 [nl](../../../nl/docs/providers/CURSOR-DOCKER.md) · 🇳🇴 [no](../../../no/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [or](../../../or/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [pa](../../../pa/docs/providers/CURSOR-DOCKER.md) · 🇵🇭 [phi](../../../phi/docs/providers/CURSOR-DOCKER.md) · 🇵🇱 [pl](../../../pl/docs/providers/CURSOR-DOCKER.md) · 🇵🇹 [pt](../../../pt/docs/providers/CURSOR-DOCKER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CURSOR-DOCKER.md) · 🇷🇴 [ro](../../../ro/docs/providers/CURSOR-DOCKER.md) · 🇷🇺 [ru](../../../ru/docs/providers/CURSOR-DOCKER.md) · 🇱🇰 [si](../../../si/docs/providers/CURSOR-DOCKER.md) · 🇸🇰 [sk](../../../sk/docs/providers/CURSOR-DOCKER.md) · 🇸🇮 [sl](../../../sl/docs/providers/CURSOR-DOCKER.md) · 🇷🇸 [sr](../../../sr/docs/providers/CURSOR-DOCKER.md) · 🇸🇪 [sv](../../../sv/docs/providers/CURSOR-DOCKER.md) · 🇰🇪 [sw](../../../sw/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [ta](../../../ta/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [te](../../../te/docs/providers/CURSOR-DOCKER.md) · 🇹🇭 [th](../../../th/docs/providers/CURSOR-DOCKER.md) · 🇹🇷 [tr](../../../tr/docs/providers/CURSOR-DOCKER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CURSOR-DOCKER.md) · 🇵🇰 [ur](../../../ur/docs/providers/CURSOR-DOCKER.md) · 🇺🇿 [uz](../../../uz/docs/providers/CURSOR-DOCKER.md) · 🇻🇳 [vi](../../../vi/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [yo](../../../yo/docs/providers/CURSOR-DOCKER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CURSOR-DOCKER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CURSOR-DOCKER.md)

---

عندما يعمل OmniRoute داخل Docker، تفشل آليات **الاستيراد من Cursor IDE** القديمة /
`cursor-agent` لأن الحاوية لا تستطيع الوصول إلى تثبيت Cursor على المضيف. استخدم بدلًا منها **تسجيل الدخول باستخدام Cursor** (‏PKCE للتحكم العميق).

## لماذا يفشل استيراد IDE / CLI في Docker

1. **عزل نظام الملفات** — يبحث الاستيراد التلقائي عن مسارات Linux مثل
   `~/.config/Cursor/User/globalStorage/state.vscdb` _داخل_ الحاوية.
   في Docker Desktop لنظام macOS، لا تُركَّب قاعدة بيانات IDE الخاصة بالمضيف افتراضيًا،
   كما أن نظام تشغيل الحاوية هو Linux حتى عندما يكون المضيف Darwin.
2. **عدم وجود الملف الثنائي `cursor-agent`** — لا تتضمن صور OmniRoute الرسمية
   `cursor-agent`. كانت «النماذج المتاحة» تشغّل سابقًا
   `cursor-agent --list-models` عبر الصدفة، ثم تعود إلى كتالوج ثابت عند الفشل.
3. **ملف ثنائي غير صحيح** — **لا** تربط ملف `cursor-agent` الخاص بـ macOS داخل حاوية
   Linux. فلن يكون قابلًا للتنفيذ.

## الموصى به: تسجيل الدخول باستخدام Cursor

1. افتح **لوحة المعلومات → المزوّدون → Cursor**.
2. اختر علامة تبويب **تسجيل الدخول باستخدام Cursor**.
3. انقر على **تسجيل الدخول باستخدام Cursor** — يفتح OmniRoute الرابط
   `https://cursor.com/loginDeepControl?…` في متصفح **المضيف**.
4. وافق على تسجيل الدخول في المتصفح، ثم عُد إلى لوحة المعلومات. يستعلم OmniRoute
   دوريًا من `api2.cursor.sh/auth/poll` حتى تصل الرموز المميّزة.
5. يخزّن OmniRoute رمزي **الوصول + التحديث** ويحدّثهما عبر
   `https://api2.cursor.sh/auth/exchange_user_api_key`.

لا يتطلب هذا المسار وجود Cursor IDE أو `cursor-agent` داخل الحاوية.

## اكتشاف النماذج

عند وجود اتصال مسجّل الدخول، تفضّل ميزة **النماذج المتاحة / المزامنة التلقائية** كتالوج
HTTP ‏`AiService/AvailableModels` الخاص بـ Cursor باستخدام رمز Bearer للاتصال.
إذا فشل ذلك، يظل OmniRoute يحاول استخدام `cursor-agent` على المضيف (عند وجوده)، ثم
البذرة الثابتة للسجل.

يعرض OmniRoute دائمًا **`auto`** في الكتالوج (بالاسم المعروض “تلقائي”)، بالإضافة إلى
أوضاع التوجيه بأسلوب OpenCodex: ‏**`auto-cost`** و**`auto-balance`** و
**`auto-intelligence`**. عبر الاتصال، تُربط هذه الأوضاع بنموذج Cursor المسمّى `default`
(مع `optimization` ضمن ModelParameter للمتغيرات الثلاثة). يُفضّل استخدام
`cu/auto` عند نفاد حصة استخدام النماذج المميّزة — إذ غالبًا ما تظل هناك ميزانية للوضع التلقائي.

### الكتالوج المباشر حصري عند مزامنته

بعد نجاح مزامنة نماذج Cursor ‏(`cursor-agent --list-models` ← الكتالوج المتزامن
المحفوظ، أو جلب `AvailableModels` المصادق عليه باستخدام Bearer أعلاه)، تعرض
**لوحة المعلومات** و**`/v1/models`** و**اختبار الكل** ما يلي:

1. النماذج التي أعادتها المزامنة المباشرة
2. معرّفات الموجّه التلقائي المُضافة: `auto` و`auto-cost` و`auto-balance` و`auto-intelligence`
3. نماذج المشغّل **المخصّصة** (المستوردة / اليدوية) — لا تُزال أبدًا بالمزامنة

لا يُستخدم السجل الثابت الكبير ضمن
`open-sse/config/providers/registry/cursor/` إلا **كخيار احتياطي دون اتصال**. عندما
تكون المزامنة فارغة (أو يفشل الاكتشاف)، تعود القائمة إلى ذلك السجل.

يمكن مع ذلك **طلب** المعرّفات ذات لواحق مستوى الجهد (مثل `claude-4.6-sonnet-high`)
في وقت التشغيل: تزيل `resolveRequestedModel` اللاحقة وتحولها إلى
`ModelParameter` يُرسل عبر الاتصال. تُخفي القائمة الحصرية عمدًا تلك المتغيرات الثابتة
من «اختبار الكل» كي تتطابق عمليات الفحص مع ما يعيده Cursor فعليًا باعتباره متاحًا.

### الأدوات المساعدة

- `providerUsesExclusiveSyncedListing("cursor"|"cu")` —
  `src/lib/providers/modelListingCapability.ts`
- `mergeProviderModelListing` — دمج لوحة المعلومات
- `ensureCursorAutoCatalogEntry` — إضافة auto* عند الاكتشاف + الإدراج
- `shouldSuppressStaticModelForExclusiveListing` — حلقة العناصر الثابتة في `/v1/models`

## حدود المزوّد (الحصة)

يستخدم قسم **الاستخدام → حدود المزوّد** الخاص بـ Cursor واجهات Bearer API على
`api2.cursor.sh` ‏(`GetCurrentPeriodUsage` ← ملخص الاستخدام ← auth/usage) بعد PKCE
أو استيراد الرمز المميّز. يظل مسار لوحة المعلومات القديم المعتمد على ملفات تعريف
الارتباط/`cursor.com` خيارًا احتياطيًا أخيرًا للجلسات الأقدم المستوردة من IDE.

تتضمن النوافذ عادةً **الإجمالي** و**Auto + Composer** و**API**. إذا بدت الحدود فارغة،
فأعِد تنفيذ **تسجيل الدخول باستخدام Cursor** أو أعِد استيراد الرموز المميّزة (لم يعد
استيراد IDE وحده مطلوبًا).

## الاستجابات الفارغة / نفاد الاستخدام

عندما يقبل Cursor عملية Run لكنه لا يعيد نصًا من المساعد (وهو أمر شائع عند نفاد
حصة الاستخدام المميّزة)، يعرض OmniRoute خطأ **429** قابلًا لاتخاذ إجراء بشأنه
(مع مؤشرات الحصة) أو خطأ **502** مع إرشادات — وليس مجرد العبارة «أعاد المزوّد
محتوى فارغًا». تُصنّف إخفاقات البث مثل `not_found: AI Model Not Found` (عند نفاد
نافذة الاستخدام) على أنها **تجاوز حد معدل Cursor / تجاوز الاستخدام**، وتحتفظ بهذه
الرسالة عبر مسار SSE (لا تستبدل آلية الحماية المشتركة من البث الفارغ خطأً سبق إصداره).
تحقق من «حدود المزوّد»، أو جرّب النموذج **`auto`**، أو ارفع حدود خطة Cursor.

## إصدار العميل (دون واجهة رسومية)

في حال عدم وجود تثبيت محلي لـ `cursor-agent`، يحدّد OmniRoute قيمة
`x-cursor-client-version` عبر متغير البيئة `CURSOR_AGENT_CLI_VERSION`، ثم عبر نسخة
مخزنة مؤقتًا على القرص من استخلاص برنامج تثبيت Cursor النصي، ثم عبر معرّف بناء مثبّت.
يمكنك تجاوز ذلك باستخدام `CURSOR_AGENT_CLI_VERSION` عند الحاجة.

## الخيار الاحتياطي: استيراد الرمز المميّز يدويًا

إذا تعذر عليك إكمال تسجيل الدخول عبر المتصفح:

1. استخرج الرموز المميّزة من `state.vscdb` على المضيف:

   ```bash
   sqlite3 "$HOME/Library/Application Support/Cursor/User/globalStorage/state.vscdb" \
     "SELECT key, value FROM ItemTable WHERE key IN ('cursorAuth/accessToken','cursorAuth/refreshToken','storage.serviceMachineId');"
   ```

2. افتح **استيراد رمز مميّز** في نافذة مصادقة Cursor.
3. الصق **رمز الوصول**، و**رمز التحديث** عند توفره (وهو مطلوب
   للتحديث التلقائي). معرّف الجهاز اختياري.

تظل عمليات الاستيراد التي تتضمن رمز الوصول فقط صالحة، لكنها ستنتهي دون رمز تحديث —
أعِد الاستيراد عندما تعرض الدردشة أخطاء مصادقة.

## ذو صلة

- إرشادات Zed لـ Docker: [`docs/providers/ZED-DOCKER.md`](./ZED-DOCKER.md)
- مرجع تسجيل دخول Cursor في OpenCodex (خارجي):
  https://github.com/lidge-jun/opencodex/blob/main/src/oauth/cursor.ts
