# Release-Green: keeping the queue and release branch green (العربية)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_GREEN.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_GREEN.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_GREEN.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_GREEN.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_GREEN.md) · 🇧🇦 [bs](../../../bs/docs/ops/RELEASE_GREEN.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_GREEN.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_GREEN.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_GREEN.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_GREEN.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_GREEN.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_GREEN.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_GREEN.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_GREEN.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_GREEN.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_GREEN.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_GREEN.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_GREEN.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_GREEN.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_GREEN.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_GREEN.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_GREEN.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_GREEN.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_GREEN.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_GREEN.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_GREEN.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_GREEN.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_GREEN.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_GREEN.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_GREEN.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_GREEN.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_GREEN.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_GREEN.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_GREEN.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_GREEN.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_GREEN.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_GREEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_GREEN.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_GREEN.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_GREEN.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_GREEN.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_GREEN.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_GREEN.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_GREEN.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_GREEN.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_GREEN.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_GREEN.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_GREEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_GREEN.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_GREEN.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_GREEN.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_GREEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_GREEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_GREEN.md)

---

## المشكلة التي يحلّها هذا

تعمل **البوابة الكاملة** (`.github/workflows/ci.yml` — تقسيمات اختبارات الوحدة، وvitest، وعمليات ratchets،
و`package-artifact`، وSonarQube، وE2E) **فقط في طلب سحب الإصدار** (PR → `main`). أما طلبات السحب التي تستهدف
`release/**` فتحصل على **البوابات السريعة** (`quality.yml`: الاختبارات المتأثرة وفق TIA + فحص الأنواع + lint)
وتحصل أيضًا، عند وجود تغييرات في الشيفرة، على بناء إنتاجي **استشاري**. والنتيجة: يمكن لحالات الفشل الخاصة بالإصدار
أن تتراكم بصمت على فرع الإصدار ثم **تنفجر على طبقات تستغرق كل منها نحو 40 دقيقة** عند وقت الإصدار،
واحدة تلو الأخرى.

توجد «عائلة release-green» من أجل **استباق** حالات الفشل هذه — أي التحقق من مكافئ البوابة الكاملة
**محليًا / خارج عملية الإصدار**، وفي أي وقت، بحيث يكون طلب سحب الإصدار ناجحًا
من أول تشغيل له على CI.

> **مبدأ غير قابل للتفاوض:** لا شيء من هذا يعيق المساهم. نحن لا نضيف فحصًا مطلوبًا
> يؤدي فشله إلى إفشال طلب السحب الخاص به. أما **الانحراف** (ratchets) فهو مسؤولية المشرف لإعادة ضبط خطه الأساسي عند الإصدار —
> وليس شأنًا يخص المساهم أبدًا. ولا يقوم أي جزء **بإغلاق** طلب سحب (وسرقة الفضل) أو
> **بإضعاف** اختبار كي ينجح.

## العائلة (4 أجزاء) — وكيف يعمل كل جزء بصورة مستقلة

| الجزء                                                                  | ماهيته                                                     | متى يُشغَّل                                                   | النطاق                                   |
| ---------------------------------------------------------------------- | ---------------------------------------------------------- | ------------------------------------------------------------- | ---------------------------------------- |
| **`/green-prs`** (الحل A)                                              | فحص عند الطلب يجريه المشرف **لطابور طلبات السحب المفتوحة** | **بصورة مستقلة ودورية** — وخصوصًا **قبل** `/generate-release` | طابور طلبات السحب بالكامل → `release/**` |
| **`/validate-release-green`** (الحل C — `npm run check:release-green`) | محرك تحقق: يعيد تنفيذ البوابة الكاملة على فرع أو مرشح دمج  | بصورة مستقلة، وفي أي وقت                                      | فرع محدد أو طلب سحب للدمج                |
| **`/babysit <PR#>`**                                                   | يقود **CI المباشر** لطلب سحب **واحد** حتى ينجح             | بصورة مستقلة، لكل طلب سحب                                     | طلب سحب واحد                             |
| **`nightly-release-green.yml`** (الحل D)                               | سير عمل ليلي آلي؛ يفتح مشكلة عند حدوث فشل حرج              | تلقائيًا (cron)                                               | فرع الإصدار النشط                        |

**الإجابة المختصرة عن سؤال «هل هذا مخصص للإصدارات فقط؟»:** **لا.** صُمّم `/green-prs`
ليعمل **دوريًا بين الإصدارات**. تشغيله بصورة مستقلة هو الاستخدام الطبيعي — فالإصدار ليس سوى
اللحظة التي يحقق فيها تشغيله أكبر قيمة.

## بناء استشاري من طلب السحب إلى الإصدار

يتضمن `quality.yml` الآن `Build (advisory)` لطلبات سحب الشيفرة غير المسودة وفروع قائمة انتظار Mergify.
وهو يحاكي وصفة بناء الإنتاج من `ci.yml`: ‏Node 24، و`npm-ci-retry`،
و`check:node-runtime`، و`npm run build` مع `OMNIROUTE_USE_TURBOPACK=1`. وهو لا يرفع
عن قصد ناتج بناء، لأنه لا توجد مهمة جودة لاحقة تستهلكه في سير العمل هذا.
أزل `continue-on-error` بعد أسبوع واحد من التشغيلات المستقرة لطلبات سحب الإصدار، بحيث تصبح الإشارة
بوابة مانعة من طلب السحب إلى الإصدار.

## الحل C — `npm run check:release-green` (المحرك)

يعيد إنتاج تحقق مكافئ للإصدار على شجرة العمل الحالية ويصنّف كل حالة حمراء:

- **HARD** (فحص الأنواع، وأخطاء lint، واختبارات الوحدة، وvitest، وdb-rules، وpublic-creds،
  و`package-artifact` الاختياري) ← **عيب حقيقي**؛ `exit 1`. يُصلح على الفرع المصدر (TDD، القاعدة #18).
- **DRIFT** (**تحذيرات** eslint، والتعقيد المعرفي، وحجم الملف) ← انحراف في الحدود المتصاعدة تراكم خلال
  الدورة، وهو **ليس خطأ المساهم**؛ لا يُفعل سوى الإبلاغ عنه، وتتم **إعادة تعيين خطه الأساسي بواسطة المشرف عند
  الإصدار**. لا يغيّر DRIFT رمز الخروج **أبدًا** — ولذلك لا يمنع أي شخص أبدًا.

```bash
npm run check:release-green                 # الفرع الحالي (شجرة العمل)
node scripts/quality/validate-release-green.mjs --json   # مخرجات منظّمة
node scripts/quality/validate-release-green.mjs --quick  # يتخطى اختبارات الوحدة وvitest (الانحراف وفحص الأنواع وlint فقط)
node scripts/quality/validate-release-green.mjs --with-build  # يتضمن package-artifact (بطيء)
```

يُشخّص و**يُبلغ** فقط (من دون إصلاح تلقائي). توجد عملية تنسيق الإصلاح حتى الوصول إلى الحالة الخضراء في
`/green-prs` و`/review-prs`.

## الحل A — `/green-prs` (فحص قائمة الانتظار)

الإجراء (ملخص — راجع مهارة `green-prs` للاطلاع على التفاصيل):

1. **احصر** قائمة انتظار طلبات السحب المفتوحة مقابل فرع الإصدار النشط.
2. **افرز** كل طلب سحب (صالح / يستحق الرفض / يحتاج إلى المؤلف) — يُجرى **الإبلاغ عن الحالات المستحقة للرفض أو التي تحتاج إلى المؤلف، ولا تُغلق**
   (المؤلف هو من يقرر).
3. لكل طلب سحب صالح، ضمن **شجرة عمل معزولة** (القاعدة #19)، حدّث طلب السحب إلى أحدث نقطة في فرع الإصدار وشغّل
   `npm run check:release-green`:
   - **HARD** ← أصلحه **على فرع المساهم** عبر التأليف المشترك (يحافظ على حالة المؤلف "Merged")،
     ثم أعد التشغيل حتى تُزال جميع حالات HARD.
   - **DRIFT** ← اتركه؛ ستتم إعادة تعيين خطه الأساسي عند الإصدار.
4. **أبلغ** باستخدام جدول طلب السحب × (الحكم، حالات HARD الحمراء، هل أُصلحت؟، DRIFT، هل أصبح الإصدار أخضر الآن؟).

يمكنه **تجهيز** قائمة الانتظار من دون دمج؛ ولا يدمج إلا عند طلب ذلك صراحةً — ولا يغلق طلب سحب مطلقًا.

## الوتيرة الموصى بها

- شغّل **`/green-prs` دوريًا** (أسبوعيًا مثلًا)، و**دائمًا قبل
  `/generate-release`**.
- أبقِ **`nightly-release-green.yml`** (الحل D) كإشارة مستمرة: عندما يفتح
  مشكلة حمراء من فئة HARD، فقد حان وقت إجراء فحص.
- استخدم **`/validate-release-green`** عند الحاجة لفحص فرع أو مرشح دمج محدد.
- استخدم **`/babysit <PR#>`** عندما يحتاج طلب سحب محدد إلى المتابعة حتى يصبح أخضر في CI الفعلي.

## العلاقة بالإصدار

- يستدعي `/generate-release` التحقق في **المرحلة 0 (الفحص المسبق)**: يعيد تعيين الخط الأساسي لـ DRIFT ويصلح
  HARD قبل فتح طلب سحب الإصدار.
- يستخدم `/review-prs` بوابة release-green عند خطوة قرار الدمج (الحالة الخضراء قبل الدمج).

الهدف من جميع الأجزاء واحد: **طلب سحب إصدار أخضر من أول تشغيل لـ CI**، بدلًا من التعامل
مع الحالات الحمراء في طبقات مدة كل منها 40 دقيقة يوم الإصدار.
