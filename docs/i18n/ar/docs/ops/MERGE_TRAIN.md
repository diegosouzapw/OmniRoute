# Merge Queue & Manual Merge-Train Runbook (العربية)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MERGE_TRAIN.md) · 🇪🇹 [am](../../../am/docs/ops/MERGE_TRAIN.md) · 🇦🇿 [az](../../../az/docs/ops/MERGE_TRAIN.md) · 🇧🇬 [bg](../../../bg/docs/ops/MERGE_TRAIN.md) · 🇧🇩 [bn](../../../bn/docs/ops/MERGE_TRAIN.md) · 🇧🇦 [bs](../../../bs/docs/ops/MERGE_TRAIN.md) · 🇨🇿 [cs](../../../cs/docs/ops/MERGE_TRAIN.md) · 🇩🇰 [da](../../../da/docs/ops/MERGE_TRAIN.md) · 🇩🇪 [de](../../../de/docs/ops/MERGE_TRAIN.md) · 🇬🇷 [el](../../../el/docs/ops/MERGE_TRAIN.md) · 🇪🇸 [es](../../../es/docs/ops/MERGE_TRAIN.md) · 🇪🇪 [et](../../../et/docs/ops/MERGE_TRAIN.md) · 🇮🇷 [fa](../../../fa/docs/ops/MERGE_TRAIN.md) · 🇫🇮 [fi](../../../fi/docs/ops/MERGE_TRAIN.md) · 🇫🇷 [fr](../../../fr/docs/ops/MERGE_TRAIN.md) · 🇮🇪 [ga](../../../ga/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [gu](../../../gu/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ha](../../../ha/docs/ops/MERGE_TRAIN.md) · 🇮🇱 [he](../../../he/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [hi](../../../hi/docs/ops/MERGE_TRAIN.md) · 🇭🇷 [hr](../../../hr/docs/ops/MERGE_TRAIN.md) · 🇭🇺 [hu](../../../hu/docs/ops/MERGE_TRAIN.md) · 🇦🇲 [hy](../../../hy/docs/ops/MERGE_TRAIN.md) · 🇮🇩 [id](../../../id/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ig](../../../ig/docs/ops/MERGE_TRAIN.md) · 🇮🇹 [it](../../../it/docs/ops/MERGE_TRAIN.md) · 🇯🇵 [ja](../../../ja/docs/ops/MERGE_TRAIN.md) · 🇬🇪 [ka](../../../ka/docs/ops/MERGE_TRAIN.md) · 🇰🇭 [km](../../../km/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [kn](../../../kn/docs/ops/MERGE_TRAIN.md) · 🇰🇷 [ko](../../../ko/docs/ops/MERGE_TRAIN.md) · 🇱🇹 [lt](../../../lt/docs/ops/MERGE_TRAIN.md) · 🇱🇻 [lv](../../../lv/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ml](../../../ml/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [mr](../../../mr/docs/ops/MERGE_TRAIN.md) · 🇲🇾 [ms](../../../ms/docs/ops/MERGE_TRAIN.md) · 🇲🇹 [mt](../../../mt/docs/ops/MERGE_TRAIN.md) · 🇲🇲 [my](../../../my/docs/ops/MERGE_TRAIN.md) · 🇳🇵 [ne](../../../ne/docs/ops/MERGE_TRAIN.md) · 🇳🇱 [nl](../../../nl/docs/ops/MERGE_TRAIN.md) · 🇳🇴 [no](../../../no/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [or](../../../or/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [pa](../../../pa/docs/ops/MERGE_TRAIN.md) · 🇵🇭 [phi](../../../phi/docs/ops/MERGE_TRAIN.md) · 🇵🇱 [pl](../../../pl/docs/ops/MERGE_TRAIN.md) · 🇵🇹 [pt](../../../pt/docs/ops/MERGE_TRAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MERGE_TRAIN.md) · 🇷🇴 [ro](../../../ro/docs/ops/MERGE_TRAIN.md) · 🇷🇺 [ru](../../../ru/docs/ops/MERGE_TRAIN.md) · 🇱🇰 [si](../../../si/docs/ops/MERGE_TRAIN.md) · 🇸🇰 [sk](../../../sk/docs/ops/MERGE_TRAIN.md) · 🇸🇮 [sl](../../../sl/docs/ops/MERGE_TRAIN.md) · 🇷🇸 [sr](../../../sr/docs/ops/MERGE_TRAIN.md) · 🇸🇪 [sv](../../../sv/docs/ops/MERGE_TRAIN.md) · 🇰🇪 [sw](../../../sw/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ta](../../../ta/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [te](../../../te/docs/ops/MERGE_TRAIN.md) · 🇹🇭 [th](../../../th/docs/ops/MERGE_TRAIN.md) · 🇹🇷 [tr](../../../tr/docs/ops/MERGE_TRAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MERGE_TRAIN.md) · 🇵🇰 [ur](../../../ur/docs/ops/MERGE_TRAIN.md) · 🇺🇿 [uz](../../../uz/docs/ops/MERGE_TRAIN.md) · 🇻🇳 [vi](../../../vi/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [yo](../../../yo/docs/ops/MERGE_TRAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MERGE_TRAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MERGE_TRAIN.md)

---

منذ v3.8.49 (‏WS3.2/WS3.4 من خطة الجودة/السرعة)، أصبح مسار الدمج الافتراضي لطلبات السحب
التي تمت مراجعتها إلى `release/vX.Y.Z` هو **طابور الدمج في Mergify** (`.mergify.yml`)؛
أما **قطار الدمج اليدوي** الموثّق أدناه فهو المسار الاحتياطي — ويُستخدم أثناء الحوادث،
أو تجميد الإصدارات، أو إذا تغيّرت خطة Mergify مفتوحة المصدر يومًا ما.

## المسار الافتراضي: طابور Mergify

1. تُراجع الحملات طلب السحب وتجعله أخضر، وتتم الموافقة عليه عبر بوابة ⭐ الخاصة بالمالك
   قبل الدمج (التقرير + القرار لكل عنصر — راجع الخطوة 0.75 في `/merge-prs`).
2. يطبّق المالك (أو الجلسة التي تنفّذ قرار المالك) التصنيف **`queue`**.
   هذا التصنيف هو موافقة الدمج؛ ولا يفعل Mergify سوى تنفيذها.
3. يجمع Mergify ما يصل إلى 10 طلبات سحب في الطابور ضمن دفعة واحدة، ويتحقق من الدفعة مقابل البوابات السريعة،
   ثم يدمجها (بالسحق). وتُقسَّم الدفعة الحمراء **تلقائيًا إلى نصفين** — إذ يُعزل طلب السحب
   المتسبب بالمشكلة خلال نحو log2(N) من عمليات إعادة التحقق، ويُزال من الطابور؛ بينما تتابع البقية.
4. بعد الدمج، يتحقق سير عمل خُضرة الإصدار المستمر من الطرف الجديد عند الدفع،
   ويفتح مشكلة لإسناد السبب إذا تسبب هذا المزيج في تراجع (من دون تراجع تلقائي مطلقًا).

ضوابط الحماية (تعكس القاعدتين الصارمتين #21/#22 في `CLAUDE.md`):

- **تجميد الإصدار سارٍ** → لا تضع تصنيفات على طلبات السحب التي تستهدف الفرع المجمّد؛ أعد استهدافها إلى
  `release/vX+1` النشط أولًا.
- **طلب سحب جارٍ تابع لجلسة أخرى** → لا تضع عليه تصنيفًا مطلقًا؛ وحدها الجلسة المالكة تضع عملها
  في الطابور.
- الفروقات الخاصة بالاختبارات فقط وطلبات السحب ذات التصنيف `hotfix` تشغّل بالفعل مجموعة CI مخفّضة (راجع
  `RELEASE_CHECKLIST.md` ← المسار السريع للإصلاح العاجل)؛ وتقبل شروط الطابور أي
  مجموعة فحوصات شُغّلت فعليًا (`#check-failure=0` + `#check-pending=0`).

## المسار الاحتياطي: قطار الدمج اليدوي

يُستخدم عندما لا يكون الطابور متاحًا. وهذا يقنّن الممارسة التي فرّغت 33 طلب سحب خلال
يوم واحد أثناء دورة v3.8.47:

1. **جهّز الدفعة** (نحو 10–30 طلب سحب تمت مراجعتها والموافقة عليها). تحقّق من تعارضات `linked:`
   (نفس `tap.testFiles` أو نفس مقاطع CHANGELOG)، ونفّذ المتعارض منها بالتتابع.
2. **تحقّق مرة واحدة**: في شجرة عمل معزولة مشتقة من طرف الإصدار، ادمج جميع
   رؤوس الدفعة محليًا، ثم شغّل مجموعة الاختبارات المكافئة للإصدار
   (`npm run check:release-green`، وأضف `--with-build` قبل إصدار).
   يؤتمت `scripts/release/merge-train.sh <base> <PR#>…` الخطوتين 1–2 (تُستبعد
   طلبات السحب المتعارضة ويواصل القطار). يشغّل الوضع الكامل `npm run test:unit` — أي المشغّل
   المضبوط للجهاز (`--test-concurrency=20`)، **وليس** جزأي CI المتتابعين ذوي 4 أنوية،
   اللذين جعلا المرحلة المهيمنة تستخدم نحو 25% فقط من جهاز ذي 16 نواة (تم الإصلاح في
   2026-07-18). يحافظ `--fast` (لتفريغ قطار ضخم خلال اليوم، بموافقة المالك في 2026-07-18)
   على كل بوابة ثابتة + vitest، لكنه يشغّل فقط ملفات node:test التي غيّرتها
   طلبات السحب المنضمّة؛ ومع ذلك يجب تشغيل المجموعة الكاملة مرة واحدة على الأقل يوميًا على
   الطرف المتراكم (قطار واحد من دون `--fast`).
3. **أخضر** → ادمج طلبات السحب بالتتابع (مع إعادة التحقق من `state,headRefOid` قبل كل واحد —
   وأي طلب سحب تغيّر رأسه يعود إلى طابور المراجعة). أثبت أن صافي فرق كل عملية دمج هو
   التغيير الخاص بطلب السحب نفسه (لا عمليات تراجع ناتجة عن الحل التلقائي: راجع `git diff --stat` بحثًا عن
   عمليات حذف خارج النطاق).
4. **أحمر** → قسّم الدفعة إلى نصفين (وتحقق من كل نصف) بدلًا من إعادة التحقق
   واحدًا تلو الآخر؛ وأعد طلب السحب المتسبب بالمشكلة إلى طابور المراجعة مع الأدلة.
5. **ممنوع دائمًا**: الدمج أثناء التجميد إلى الفرع المجمّد؛ أو استخدام `git stash` في أي مكان؛
   أو إعادة تشغيل CI بالكامل على أمل أن تختفي الحالة الحمراء (القاعدة: الحالة الحمراء معلومة مفيدة).

## المستويات (سبب أمان الطابور مع البوابات السريعة فقط)

- **لكل طلب سحب** (البوابات السريعة في quality.yml): الاختبارات المتأثرة وفق TIA + اختبارات الوحدة الكاملة على 4 أجزاء +
  vitest + مجموعة lint + التحقق من الأنواع + سلامة التوثيق/سجل التغييرات.
- **لكل دفعة/طرف** (خُضرة الإصدار المستمر): بوابات `--quick` الصارمة عند كل دفع إلى
  فرع الإصدار؛ وعمليات مسح كاملة باستخدام `--with-build --full-ci` ثلاث مرات يوميًا.
- **لكل إصدار** (‏ci.yml في طلب سحب الإصدار): المصفوفة الكاملة، بما فيها E2E ×9،
  وأثر الحزمة + اختبار تمهيدي لإقلاع tarball، والتغطية/آليات الرفع التدريجي.

لا يخضع أي شيء لتحقق أقل مما كان عليه سابقًا — وإنما يُشغَّل السطح الثقيل لكل دفعة/طرف
بدلًا من تشغيله لكل طلب سحب، وهذا ما يزيل جولات O(N).
