# Merge Queue & Manual Merge-Train Runbook (العربية)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MERGE_TRAIN.md) · 🇪🇹 [am](../../../am/docs/ops/MERGE_TRAIN.md) · 🇦🇿 [az](../../../az/docs/ops/MERGE_TRAIN.md) · 🇧🇬 [bg](../../../bg/docs/ops/MERGE_TRAIN.md) · 🇧🇩 [bn](../../../bn/docs/ops/MERGE_TRAIN.md) · 🇧🇦 [bs](../../../bs/docs/ops/MERGE_TRAIN.md) · 🇨🇿 [cs](../../../cs/docs/ops/MERGE_TRAIN.md) · 🇩🇰 [da](../../../da/docs/ops/MERGE_TRAIN.md) · 🇩🇪 [de](../../../de/docs/ops/MERGE_TRAIN.md) · 🇬🇷 [el](../../../el/docs/ops/MERGE_TRAIN.md) · 🇪🇸 [es](../../../es/docs/ops/MERGE_TRAIN.md) · 🇪🇪 [et](../../../et/docs/ops/MERGE_TRAIN.md) · 🇮🇷 [fa](../../../fa/docs/ops/MERGE_TRAIN.md) · 🇫🇮 [fi](../../../fi/docs/ops/MERGE_TRAIN.md) · 🇫🇷 [fr](../../../fr/docs/ops/MERGE_TRAIN.md) · 🇮🇪 [ga](../../../ga/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [gu](../../../gu/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ha](../../../ha/docs/ops/MERGE_TRAIN.md) · 🇮🇱 [he](../../../he/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [hi](../../../hi/docs/ops/MERGE_TRAIN.md) · 🇭🇷 [hr](../../../hr/docs/ops/MERGE_TRAIN.md) · 🇭🇺 [hu](../../../hu/docs/ops/MERGE_TRAIN.md) · 🇦🇲 [hy](../../../hy/docs/ops/MERGE_TRAIN.md) · 🇮🇩 [id](../../../id/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ig](../../../ig/docs/ops/MERGE_TRAIN.md) · 🇮🇹 [it](../../../it/docs/ops/MERGE_TRAIN.md) · 🇯🇵 [ja](../../../ja/docs/ops/MERGE_TRAIN.md) · 🇬🇪 [ka](../../../ka/docs/ops/MERGE_TRAIN.md) · 🇰🇭 [km](../../../km/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [kn](../../../kn/docs/ops/MERGE_TRAIN.md) · 🇰🇷 [ko](../../../ko/docs/ops/MERGE_TRAIN.md) · 🇱🇹 [lt](../../../lt/docs/ops/MERGE_TRAIN.md) · 🇱🇻 [lv](../../../lv/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ml](../../../ml/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [mr](../../../mr/docs/ops/MERGE_TRAIN.md) · 🇲🇾 [ms](../../../ms/docs/ops/MERGE_TRAIN.md) · 🇲🇹 [mt](../../../mt/docs/ops/MERGE_TRAIN.md) · 🇲🇲 [my](../../../my/docs/ops/MERGE_TRAIN.md) · 🇳🇵 [ne](../../../ne/docs/ops/MERGE_TRAIN.md) · 🇳🇱 [nl](../../../nl/docs/ops/MERGE_TRAIN.md) · 🇳🇴 [no](../../../no/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [or](../../../or/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [pa](../../../pa/docs/ops/MERGE_TRAIN.md) · 🇵🇭 [phi](../../../phi/docs/ops/MERGE_TRAIN.md) · 🇵🇱 [pl](../../../pl/docs/ops/MERGE_TRAIN.md) · 🇵🇹 [pt](../../../pt/docs/ops/MERGE_TRAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MERGE_TRAIN.md) · 🇷🇴 [ro](../../../ro/docs/ops/MERGE_TRAIN.md) · 🇷🇺 [ru](../../../ru/docs/ops/MERGE_TRAIN.md) · 🇱🇰 [si](../../../si/docs/ops/MERGE_TRAIN.md) · 🇸🇰 [sk](../../../sk/docs/ops/MERGE_TRAIN.md) · 🇸🇮 [sl](../../../sl/docs/ops/MERGE_TRAIN.md) · 🇷🇸 [sr](../../../sr/docs/ops/MERGE_TRAIN.md) · 🇸🇪 [sv](../../../sv/docs/ops/MERGE_TRAIN.md) · 🇰🇪 [sw](../../../sw/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ta](../../../ta/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [te](../../../te/docs/ops/MERGE_TRAIN.md) · 🇹🇭 [th](../../../th/docs/ops/MERGE_TRAIN.md) · 🇹🇷 [tr](../../../tr/docs/ops/MERGE_TRAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MERGE_TRAIN.md) · 🇵🇰 [ur](../../../ur/docs/ops/MERGE_TRAIN.md) · 🇺🇿 [uz](../../../uz/docs/ops/MERGE_TRAIN.md) · 🇻🇳 [vi](../../../vi/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [yo](../../../yo/docs/ops/MERGE_TRAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MERGE_TRAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MERGE_TRAIN.md)

---

منذ الإصدار v3.8.49 (‏WS3.2/WS3.4 من خطة الجودة/السرعة)، أصبح مسار الدمج الافتراضي لطلبات السحب
التي تمت مراجعتها إلى `release/vX.Y.Z` هو **طابور الدمج في Mergify** (`.mergify.yml`)؛
أما **قطار الدمج اليدوي** الموثّق أدناه فهو المسار الاحتياطي — ويُستخدم أثناء الحوادث،
أو تجميد الإصدارات، أو إذا تغيّرت خطة Mergify Open Source يومًا ما.

## المسار الافتراضي: قائمة انتظار Mergify

1. تُراجَع طلبات السحب وتُمنح الضوء الأخضر بواسطة الحملات، ويوافق عليها حاجز ⭐
   ما قبل الدمج الخاص بالمالك (التقرير + القرار لكل عنصر — راجع الخطوة 0.75 في `/merge-prs`).
2. يطبّق المالك (أو الجلسة التي تنفّذ قرار المالك) التصنيف **`queue`**.
   التصنيف هو موافقة الدمج؛ ولا يقوم Mergify إلا بتنفيذها.
3. يتحقق Mergify من طلبات السحب المدرجة في قائمة الانتظار **تسلسليًا** (واحدًا في كل مرة) وفقًا للبوابات السريعة
   ثم يدمجها (squash). تتطلب المعالجة على دفعات + التقسيم الثنائي التلقائي فئة Mergify مدفوعة
   ("Cannot use Merge Queue batch" في الخطة المجانية، #7220)، لذلك لا يحدّد `.mergify.yml`
   أي `batch_size`؛ وتظل المعالجة على دفعات مهمة قطار الدمج اليدوي أدناه. ويُزال من قائمة الانتظار أي طلب سحب
   تظل فحوصاته معلّقة بعد `checks_timeout` (240 دقيقة = ضعفا قيمة p95 المقاسة
   لـ `quality.yml`) بدلًا من تعطيل قائمة الانتظار.
4. بعد الدمج، يتحقق سير عمل الاستمرارية الخضراء للإصدار من الطرف الجديد عند الدفع
   ويفتح مشكلة لإسناد السبب إذا أدى الجمع إلى تراجع (ولا يجري تراجعًا تلقائيًا مطلقًا).

ضوابط الحماية (تعكس القاعدتين الصارمتين #21/#22 في `CLAUDE.md`):

- **تجميد الإصدار سارٍ** ← لا تطبّق تصنيفات على طلبات السحب التي تستهدف الفرع المجمّد؛ أعد استهدافها إلى
  `release/vX+1` النشط أولًا.
- **طلب سحب قيد التنفيذ تابع لجلسة أخرى** ← لا تطبّق عليه أي تصنيف مطلقًا؛ فالجلسة المالكة وحدها تدرج
  عملها في قائمة الانتظار.
- الفروقات التي تقتصر على الاختبارات وطلبات السحب المصنّفة بـ `hotfix` تشغّل بالفعل مجموعة مخفّضة من فحوصات CI (راجع
  `RELEASE_CHECKLIST.md` ← المسار السريع للإصلاح العاجل)؛ وتقبل شروط قائمة الانتظار أي
  مجموعة فحوصات جرى تشغيلها فعليًا (`#check-failure=0` + `#check-pending=0`).

## المسار الاحتياطي: قطار الدمج اليدوي

يُستخدم عندما لا يكون الطابور متاحًا. وهو يقنّن الممارسة التي أنهت 33 طلب سحب خلال
يوم واحد في دورة v3.8.47:

1. **جهّز الدفعة** (نحو 10–30 طلب سحب تمت مراجعتها والموافقة عليها). تحقق من تعارضات `linked:`
   (ملفات `tap.testFiles` نفسها، أو مقاطع CHANGELOG نفسها) ونفّذ المتعارض منها بالتتابع.
2. **تحقق مرة واحدة**: في شجرة عمل معزولة من طرف فرع الإصدار، ادمج جميع
   رؤوس الدفعة محليًا، ثم شغّل حزمة الاختبارات المكافئة للإصدار
   (`npm run check:release-green`، وأضف `--with-build` قبل الإصدار).
   يؤتمت `scripts/release/merge-train.sh <base> <PR#>…` الخطوتين 1–2 (تُستبعد
   طلبات السحب المتعارضة ويواصل القطار). يشغّل الوضع الكامل `npm run test:unit` — أي مُشغّل
   الاختبارات المضبوط وفق الجهاز (`--test-concurrency=20`)، **وليس** جزأي CI المتتابعين
   ذوي 4 أنوية، اللذين جعلا المرحلة المهيمنة تستخدم نحو 25% من جهاز ذي 16 نواة (تم الإصلاح
   في 2026-07-18). يحافظ `--fast` (لتفريغ قطارات الدمج الضخمة خلال اليوم، بموافقة المالك في 2026-07-18)
   على كل بوابة ثابتة + vitest، لكنه يشغّل فقط ملفات node:test التي غيّرتها
   طلبات السحب المنضمّة إلى القطار؛ ومع ذلك، يجب تشغيل الحزمة الكاملة مرة واحدة على الأقل يوميًا على
   الطرف المتراكم (قطار واحد من دون `--fast`).
3. **نجاح التحقق** ← ادمج طلبات السحب بالتتابع (مع إعادة التحقق من `state,headRefOid` قبل كل طلب —
   ويعود أي طلب سحب تغيّر رأسه إلى المراجعة). أثبت أن صافي فرق كل عملية دمج هو
   التغيير الخاص بطلب السحب نفسه (لا توجد عمليات تراجع ناتجة من الحل التلقائي: راجع `git diff --stat` بحثًا عن
   عمليات حذف خارج النطاق).
4. **فشل التحقق** ← قسّم الدفعة إلى نصفين (وتحقق من كل نصف) بدلًا من إعادة التحقق
   من كل طلب على حدة؛ وأعد طلب السحب المتسبب إلى طابور المراجعة مع الأدلة.
5. **ممنوع منعًا باتًا**: الدمج في الفرع المجمّد أثناء فترة التجميد؛ استخدام `git stash` في أي مكان؛
   إعادة تشغيل CI بالكامل أملًا في اختفاء الفشل (القاعدة: الفشل معلومة).

## مستويات التحقق (سبب أمان الطابور باستخدام بوابات التحقق السريعة فقط)

- **لكل طلب سحب** (بوابات التحقق السريعة في quality.yml): الاختبارات المتأثرة وفق TIA + اختبارات الوحدة الكاملة الموزعة على 4 أجزاء +
  vitest + مجموعة lint + فحص الأنواع + سلامة الوثائق/سجل التغييرات.
- **لكل دفعة/طرف** (التحقق المستمر من سلامة الإصدار): بوابات `--quick` الإلزامية عند كل دفع إلى
  فرع الإصدار؛ وعمليات مسح كاملة باستخدام `--with-build --full-ci` ثلاث مرات يوميًا.
- **لكل إصدار** (ci.yml في طلب سحب الإصدار): المصفوفة الكاملة، بما فيها E2E ×9،
  وpackage-artifact + اختبار تشغيل أولي لحزمة tarball، والتغطية/الحدود المتزايدة.

لا يجري التحقق من أي شيء بدرجة أقل من السابق — وإنما يُشغَّل النطاق الثقيل لكل دفعة/طرف
بدلًا من كل طلب سحب، وهذا ما يزيل جولات O(N).

## المتطلبات الأساسية لعملية سحب جديدة لتشغيل `merge-train.sh`

ينفّذ البرنامج النصي **فحصًا تمهيديًا** سريع الفشل على عملية السحب الجذرية (قبل أي عمل
على شجرة العمل)، كي لا يبدو التثبيت المعطّل أبدًا كما لو كان قطارًا فاشلًا:

1. شغّل `npm ci`، ثم شغّل إجراء postinstall الخاص بـ `bun` الذي يحظره npm:
   `(cd node_modules/bun && node install.js)` — وإلا فسيفشل `check:provider-consistency`
   و`check:known-symbols` (وكلاهما يستخدم `bun scripts/…`) في القطار وفي الأساس
   من دون سطر يوضّح المخالفة.
2. يجب ألا يوجد `node_modules/node_modules` زائد (شجرة تبعيات مكررة؛ يُحمَّل React مرتين
   وتفشل حزم اختبارات واجهة المستخدم في vitest فورًا).
3. يجب أن يكون `node_modules/.bin/tsc` موجودًا وقابلًا للتنفيذ (فهو غير موجود في التثبيت الجزئي).

يشغّل القطار الأمر الإلزامي `npm run check:cycles:ratchet`؛ أما `npm run check:cycles`
بمفرده فهو استشاري (يسرد مكوّنات SCC ويخرج برمز غير صفري حتى مع أساس سليم).
