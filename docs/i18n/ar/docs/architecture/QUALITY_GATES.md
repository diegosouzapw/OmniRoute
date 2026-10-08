# Quality Gates Reference (العربية)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/QUALITY_GATES.md) · 🇪🇹 [am](../../../am/docs/architecture/QUALITY_GATES.md) · 🇦🇿 [az](../../../az/docs/architecture/QUALITY_GATES.md) · 🇧🇬 [bg](../../../bg/docs/architecture/QUALITY_GATES.md) · 🇧🇩 [bn](../../../bn/docs/architecture/QUALITY_GATES.md) · 🇧🇦 [bs](../../../bs/docs/architecture/QUALITY_GATES.md) · 🇨🇿 [cs](../../../cs/docs/architecture/QUALITY_GATES.md) · 🇩🇰 [da](../../../da/docs/architecture/QUALITY_GATES.md) · 🇩🇪 [de](../../../de/docs/architecture/QUALITY_GATES.md) · 🇬🇷 [el](../../../el/docs/architecture/QUALITY_GATES.md) · 🇪🇸 [es](../../../es/docs/architecture/QUALITY_GATES.md) · 🇪🇪 [et](../../../et/docs/architecture/QUALITY_GATES.md) · 🇮🇷 [fa](../../../fa/docs/architecture/QUALITY_GATES.md) · 🇫🇮 [fi](../../../fi/docs/architecture/QUALITY_GATES.md) · 🇫🇷 [fr](../../../fr/docs/architecture/QUALITY_GATES.md) · 🇮🇪 [ga](../../../ga/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [gu](../../../gu/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ha](../../../ha/docs/architecture/QUALITY_GATES.md) · 🇮🇱 [he](../../../he/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [hi](../../../hi/docs/architecture/QUALITY_GATES.md) · 🇭🇷 [hr](../../../hr/docs/architecture/QUALITY_GATES.md) · 🇭🇺 [hu](../../../hu/docs/architecture/QUALITY_GATES.md) · 🇦🇲 [hy](../../../hy/docs/architecture/QUALITY_GATES.md) · 🇮🇩 [id](../../../id/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ig](../../../ig/docs/architecture/QUALITY_GATES.md) · 🇮🇹 [it](../../../it/docs/architecture/QUALITY_GATES.md) · 🇯🇵 [ja](../../../ja/docs/architecture/QUALITY_GATES.md) · 🇬🇪 [ka](../../../ka/docs/architecture/QUALITY_GATES.md) · 🇰🇭 [km](../../../km/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [kn](../../../kn/docs/architecture/QUALITY_GATES.md) · 🇰🇷 [ko](../../../ko/docs/architecture/QUALITY_GATES.md) · 🇱🇹 [lt](../../../lt/docs/architecture/QUALITY_GATES.md) · 🇱🇻 [lv](../../../lv/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ml](../../../ml/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [mr](../../../mr/docs/architecture/QUALITY_GATES.md) · 🇲🇾 [ms](../../../ms/docs/architecture/QUALITY_GATES.md) · 🇲🇹 [mt](../../../mt/docs/architecture/QUALITY_GATES.md) · 🇲🇲 [my](../../../my/docs/architecture/QUALITY_GATES.md) · 🇳🇵 [ne](../../../ne/docs/architecture/QUALITY_GATES.md) · 🇳🇱 [nl](../../../nl/docs/architecture/QUALITY_GATES.md) · 🇳🇴 [no](../../../no/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [or](../../../or/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [pa](../../../pa/docs/architecture/QUALITY_GATES.md) · 🇵🇭 [phi](../../../phi/docs/architecture/QUALITY_GATES.md) · 🇵🇱 [pl](../../../pl/docs/architecture/QUALITY_GATES.md) · 🇵🇹 [pt](../../../pt/docs/architecture/QUALITY_GATES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/QUALITY_GATES.md) · 🇷🇴 [ro](../../../ro/docs/architecture/QUALITY_GATES.md) · 🇷🇺 [ru](../../../ru/docs/architecture/QUALITY_GATES.md) · 🇱🇰 [si](../../../si/docs/architecture/QUALITY_GATES.md) · 🇸🇰 [sk](../../../sk/docs/architecture/QUALITY_GATES.md) · 🇸🇮 [sl](../../../sl/docs/architecture/QUALITY_GATES.md) · 🇷🇸 [sr](../../../sr/docs/architecture/QUALITY_GATES.md) · 🇸🇪 [sv](../../../sv/docs/architecture/QUALITY_GATES.md) · 🇰🇪 [sw](../../../sw/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ta](../../../ta/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [te](../../../te/docs/architecture/QUALITY_GATES.md) · 🇹🇭 [th](../../../th/docs/architecture/QUALITY_GATES.md) · 🇹🇷 [tr](../../../tr/docs/architecture/QUALITY_GATES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/QUALITY_GATES.md) · 🇵🇰 [ur](../../../ur/docs/architecture/QUALITY_GATES.md) · 🇺🇿 [uz](../../../uz/docs/architecture/QUALITY_GATES.md) · 🇻🇳 [vi](../../../vi/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [yo](../../../yo/docs/architecture/QUALITY_GATES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/QUALITY_GATES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/QUALITY_GATES.md)

---

هذا المستند هو المرجع المعتمد لجميع بوابات جودة CI في OmniRoute.
وهو يصف كل بوابة، وما تتحقق منه، ومهمة CI التي تعمل ضمنها، وما إذا كانت تستخدم
خط أساس تصاعديًا أم سياسة نجاح/فشل، وما إذا كانت تحظر عملية البناء أم أنها استشارية.

للاطلاع على ملخص موجز وسياسة قائمة السماح، راجع قسم "بوابات الجودة والخطوط الأساسية التصاعدية"
في `AGENTS.md`. وللاطلاع على التقييم النقدي، وتصنيف النضج، وخطة النسخ المحايدة للأدوات
للنظام نفسه، راجع
[دليل بوابات الجودة](../ops/QUALITY_GATE_PLAYBOOK.md).

---

## مخزون البوابات وملفات تعريف التنفيذ

### قبول المرشحين

يُصدر كل من سيري عمل CI وبوابات الجودة حكمًا مستقرًا: `Gate / CI` و
`Gate / Quality`. وتسرد سياسة القبول ذات الإصدارات الخاصة بهما كل مهمة مصدرية
على أنها مطلوبة أو استشارية. يجب أن تنجح أي مهمة مطلوبة منطبقة: فالنتائج
المفقودة أو الملغاة أو المتخطاة أو المعلقة أو غير المعروفة لا يمكنها إثبات PASS. ويمكن
لتصنيف صالح خاص بالوثائق فقط أو بالكتالوج فقط أن يجعل مسارًا برمجيًا غير منطبق؛
ولا يُعد طلب السحب في وضع المسودة مرشحًا مقبولًا. كما أن تسمية `hotfix` لا تُعفي من تقديم الأدلة.

يغطي كلا سيري العمل طلبات السحب وعمليات الدفع إلى فروع main/release، والتشغيل اليدوي،
وأحداث مجموعات الدمج. وتُشغّل عمليات الدفع والتشغيل اليدوي ومجموعات الدمج التحديد الكامل. تستخدم
التفرعات ومجموعات الدمج مشغّلات مستضافة للمهام التي تختار مشغّلات ذاتية الاستضافة في الحالات الأخرى؛
ويجب التحقق من توفر سعة استضافة كافية قبل الطرح.

يحدد كل إيصال JSON قيمة SHA التي تم سحبها، وتشغيل سير العمل، والمحاولة.
ترفض CLI عدم تطابق SHA بين النسخة المسحوبة والحدث. تربط اختبارات سير العمل عضوية السياسة
بقائمة `needs` الخاصة بمهمة الحكم، بحيث لا يمكن لمسار جديد أو مُزال أن يختفي بصمت.
تغطي الإيصالات سير العمل الخاص بها، وليس النشر أو التوزيع أو التفاصيل الداخلية
لأداة فحص استشارية موجودة. ويُعد تفعيل اسمي الفحص كليهما في قواعد الفروع
تغييرًا إداريًا منفصلًا؛ فإضافة هذه المهام لا تحمي فرعًا بحد ذاتها.

### مخزون الفحص الساكن

يوجد مخزون الأسماء المستعارة لـ npm ذو الإصدارات وعضوية الفحص الساكن في
`config/quality/gate-manifest.json`. شغّل `npm run check:gate-manifest` للتحقق
من أسماء البرامج النصية والأوامر الدقيقة بمقارنتها مع `package.json`؛ تؤدي الإضافات وعمليات الإزالة
وانحراف الأوامر إلى فشل كل من الخطاف المحلي ومهام تصنيف التغييرات في CI.
الاسم المستعار ليس مهمة سير عمل أو مثيل مصفوفة أو حالة اختبار: يجب
عدم عرض هذه الأعداد على أنها قابلة للتبادل.

استخدم `npm run quality:scan -- --list` أو `npm run quality:scan:fast -- --list`
لفحص الأسماء المستعارة المحددة دون تنفيذها. يستدعي المشغّل نقطة دخول
npm، ولذلك تُحفظ بيئة تشغيلها (بما في ذلك Bun حيث يكون مهيأ).
يسجل البيان الأسماء المستعارة الواقعة خارج ملفات التعريف هذه على أنها تُستدعى بشكل منفصل، كما
تُحظر أوامر الصيانة في ملفات تعريف الفحص للقراءة فقط.

تغطي ملفات التعريف هذه الفحص الساكن فقط. وهي لا تعتمد اختبارات المنتج
أو التغطية أو التحزيم أو الفحوص الخارجية أو القبول الكامل للمرشح للإصدار.
يستخدم قبول سير العمل الملف المرتبط `config/quality/admission-policy.json` و
`scripts/quality/admission-verdict.mjs`. وتظل ملفات تعريف مراقب الإصدار منفصلة؛
افحص فحوصها المنطبقة وإيصالاتها بشكل مستقل. المخزون
النثري أدناه مرجع، وليس دليلًا على أن بوابة ما قد شُغّلت بالفعل.

توجد البرامج النصية ضمن `scripts/check/` (بوابات السياسة) و`scripts/quality/` (محرك التصعيد).
مصدر الحقيقة الخاص بـ CI هو `.github/workflows/ci.yml`.

### المسار السريع لطلبات سحب الإصدار (`quality.yml`)

يُكمل `.github/workflows/quality.yml` ‏CI في طلبات السحب الخاصة بـ main/release، وعمليات الدفع
إلى الفروع المحمية، والتشغيل اليدوي، ومجموعات الدمج. تستخدم طلبات السحب فحوصًا سريعة مرشحة حسب المسار. وقد أزيل
بناء النسخة المكرر والمعطل بشكل دائم؛ بينما تظل فحوص البناء/التحزيم/الإقلاع الفعلية في CI.

| المهمة                                           | النطاق                                                                                                                                                                                                          | الحظر                    |
| ------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| `Docs Gates (fast-path)`                         | طلبات سحب الوثائق/الشيفرة؛ مراجع وثائق API وdocs-all                                                                                                                                                            | نعم                      |
| `Fast Quality Gates`                             | طلبات سحب الشيفرة؛ الفحوص الساكنة، وفحص الأنواع، وفحص أنواع لوحة المعلومات، واختبارات الوحدات المتأثرة                                                                                                          | نعم                      |
| `Forgotten sibling tests`                        | طلبات سحب الشيفرة؛ تتبّع الوحدات المعدّلة إلى المستهلكين الساكنين واختبارات الوحدات الشقيقة المرشحة؛ تُبلّغ مسارات barrel والاستيراد الديناميكي بوصفها تشخيصات استشارية، مع استثناءات قائمة السماح المشار إليها | **استشاري**              |
| `Vitest (fast-path)`                             | طلبات سحب الشيفرة؛ حزمة vitest السريعة                                                                                                                                                                          | نعم                      |
| `Unit Tests fast-path`                           | طلبات سحب الشيفرة؛ حزمة اختبارات وحدات موزعة على 4 أجزاء                                                                                                                                                        | نعم                      |
| `No new ESLint warnings`                         | طلبات سحب الشيفرة؛ حارس lint مدرك لعمليات الكبت                                                                                                                                                                 | نعم، بما في ذلك التفرعات |
| `Merge integrity (changelog + generated skills)` | طلبات السحب غير المسودة؛ مزامنة سجل التغييرات والمهارات المُنشأة                                                                                                                                                | نعم، بما في ذلك التفرعات |

#### تقرير اختبارات الوحدات الشقيقة المنسية

يعيد `npm run check:forgotten-sibling-tests` استخدام محلّل الاستيراد الذي تستند إليه خريطة تأثير الاختبارات.
وبالنسبة إلى كل وحدة إنتاج معدّلة، فإنه يبلّغ عن سلاسل حتمية من نوع
`changed module/symbol -> static consumer -> candidate sibling test` عندما يكون الاختبار المرشح
غائبًا عن فرق طلب السحب. ويُحتفظ بملخص Markdown ونتيجة JSON بوصفهما
عنصر سير العمل `forgotten-sibling-tests` لأغراض المعايرة قبل أي طرح حاجب.

إعادات التصدير المجمّعة والاستيرادات الديناميكية هي تشخيصات لحلّ الوحدات فقط؛ ولا تُنشئ مطلقًا
نتيجةً مانعة. توجد الاستثناءات المُراجَعة في
`config/quality/forgotten-sibling-allowlist.json`. يجب أن يحدّد كل إدخال المستهلك والاختبار المرشّح،
وأن يقدّم مبررًا محددًا، وأن يتضمن رابطًا لمشكلة أو طلب سحب على GitHub. تؤدي الإدخالات غير الصحيحة
إلى الرفض افتراضيًا. لا يمكن للاستثناءات تجاوز اختبار مرشّح محذوف أو فرق يضيف `.skip`/`.todo`؛
ويظل إضعاف التأكيدات وغيره من أساليب الإخفاء خاضعًا لبوابة
`check:test-masking` المانعة بشكل مستقل.

### المهمة: `lint`

تُشغَّل عند كل طلب سحب إلى `main`. تمنع الدمج عند الفشل.

| البرنامج النصي (`npm run ...`)    | ما يتحقق منه                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | مانع                                   |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------- |
| `check:node-runtime`              | أن يكون إصدار Node.js ضمن النطاق المدعوم                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | نعم                                    |
| `check:cycles`                    | الاستيرادات الدائرية عبر كامل `src/` و`open-sse/` (استنادًا إلى AST، مع حلّ `paths` الخاصة بـ tsconfig). الوضع المجرّد = إرشادي، ويسرد الدورات. يحظر `check:cycles:ratchet` (الذي تشغّله CI) عندما يتجاوز العدد الحد الأقصى `metrics.cycles` في `quality-baseline.json` — وهو حاليًا 14، مع `direction: down`، لذا لا يمكنه إلا الانخفاض (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                        | نعم (آلية تصعيدية)                     |
| `check:route-validation:t06`      | وجود مخططات Zod في جميع المسارات (سياسة المستوى 6)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | نعم                                    |
| `check:any-budget:t11`            | ألّا يتجاوز عدد `@ts-expect-error // any` الميزانية المحددة (آلية المستوى 11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | نعم                                    |
| `check:provider-consistency`      | لكل موفّر في `providers.ts` إدخال مطابق في `providerRegistry.ts` (والعكس صحيح، ضمن قائمة السماح)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | نعم                                    |
| `check:model-lifecycle`           | تظل جداول التوجيه الثلاثة التي تتم صيانتها يدويًا متسقة مع لقطة دورة الحياة المُضمّنة في المستودع (#11503): لا يمنح `FITNESS_TABLE` (`taskFitness.ts`) أي معرّف متقاعد يمكن لـ `REGISTRY` توجيهه؛ وكل هدف في `BUILT_IN_ALIASES` موجود في `REGISTRY` وغير موجود في لقطة المعرّفات المتقاعدة؛ وكل معرّف متقاعد لا يزال موجودًا في `REGISTRY` تتم إعادة توجيهه أو إدراجه في `allowedRetiredInCatalog`؛ ولا يظهر أي مصدر أو هدف من `DEFAULT_DEGRADATION_MAP` كمتقاعد في تلك اللقطة. لا يثبت هذا أن النموذج تتم خدمته حاليًا بواسطة مزوّد فعّال. يعمل دون اتصال — إذ يقارن مع `config/quality/model-lifecycle.json`، الذي يُحدَّث يدويًا باستخدام `npm run quality:refresh-model-lifecycle` (يتطلب الشبكة؛ غير مدمج في CI). يُعد `allowedRetiredInCatalog` آلية تصعيدية لخفض العدد: لا تُضف إدخالًا إلا مع مشكلة تتبّع. | نعم                                    |
| `check:fetch-targets`             | كل استدعاء `fetch("/api/...")` في `src/` من جهة العميل يُحلّ إلى ملف `route.ts` فعلي                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | نعم                                    |
| `check:deps`                      | جميع التبعيات القابلة للتثبيت عبر `npm install` في كل ملف `package.json` ضمن المستودع موجودة في `dependency-allowlist.json`؛ ويتم الإبلاغ عن الحزم الجديدة غير المثبّتة بإصدار محدد أو التي تنتحل أسماء حزم أخرى                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | نعم                                    |
| `audit:deps`                      | تشغيل `npm audit` (الجذر + Electron) — لا توجد تحذيرات عالية/حرجة (يتداخل مع `check:vuln-ratchet` الخاص بـ OSV؛ راجع قائمة الأعمال المتراكمة للترشيد)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | نعم                                    |
| `check:lockfile`                  | سلامة `package-lock.json` — سجل HTTPS، وبصمات سلامة، ومن دون تجاوزات للمضيف                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | نعم                                    |
| `check:licenses`                  | قائمة السماح لتراخيص SPDX لتبعيات الإنتاج                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | نعم                                    |
| `check:tracked-artifacts`         | عدم وجود نواتج بناء / روابط رمزية ملتزم بها إلى `node_modules` (يُشغَّل أيضًا ضمن husky قبل الالتزام؛ أما ما قبل الدفع فخفيف عمدًا — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | نعم                                    |
| `check:ai-attribution`            | عدم وجود تذييل `Co-Authored-By` للذكاء الاصطناعي/الروبوتات أو تذييل يفيد بالتوليد بواسطة الذكاء الاصطناعي في التزامات طلب السحب أو عنوانه أو نصه — القاعدة الصارمة #16 (ضمن حلقة البوابات السريعة في `quality.yml` لطلبات السحب إلى `release/**` — يقرأ حمولة الحدث ولا ينفّذ شيئًا خارج طلبات السحب — وكذلك خطوة خاصة بطلبات السحب في فحص التنسيق بملف `ci.yml` لطلبات السحب إلى `main`؛ وأيضًا خطاف `commit-msg` في husky؛ يُسمح بالمؤلفين المشاركين من البشر؛ #14436)                                                                                                                                                                                                                                                                                                                                           |
| `check:vitest-exclusions`         | كل استثناء في Vitest يذكر مشكلة تتبّع ويظهر في `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | نعم                                    |
| `check:file-size`                 | لا يتجاوز أي ملف مصدر الحد الأقصى المحدد لكل امتداد (آلية تصعيد تدريجية: الملفات الكبيرة المجمّدة في قائمة `frozen`)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | نعم                                    |
| `check:error-helper`              | تستخدم استجابات الأخطاء في المنفّذات/المعالِجات `buildErrorBody()` / `sanitizeErrorMessage()` (القاعدة الصارمة #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | نعم                                    |
| `check:migration-numbering`       | ملفات SQL الخاصة بالترحيل مرقّمة تسلسليًا، من دون فجوات أو تكرارات                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | نعم                                    |
| `check:public-creds`              | لا توجد قيم OAuth حرفية لـ `client_id`/`client_secret` أو مفاتيح Firebase Web خارج `publicCreds.ts` (القاعدة الصارمة رقم 11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | نعم                                    |
| `check:db-rules`                  | لا توجد تعليمات SQL خام خارج وحدات `src/lib/db/`؛ ولا توجد عمليات استيراد تجميعي من `localDb.ts` (القاعدتان الصارمتان رقم 2 ورقم 5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | نعم                                    |
| `check:known-symbols`             | تتطابق منفّذات المزوّد واستراتيجيات التوجيه والمترجمات المسجّلة في جداول التوزيع الخاصة بها مع الملفات الموجودة على القرص — من دون رموز يتيمة أو غير مصرّح بها                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | نعم                                    |
| `check:route-guard-membership`    | يُصنَّف كل مسار ينشئ عملية فرعية بواسطة `isLocalOnlyPath()` (القاعدتان الصارمتان رقم 15 ورقم 17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | نعم                                    |
| `check:test-discovery`            | يلتقط مشغّل اختبار واحد على الأقل كل ملف `*.test.ts` / `*.spec.ts` في المستودع (آلية تصاعدية: لا يمكن لقائمة الملفات اليتيمة في `test-discovery-baseline.json` إلا أن تتقلّص)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | نعم                                    |
| `check:agent-skills-sync`         | تطابق عناصر agent-skills المُنشأة كتالوج المصدر الخاص بها (من دون انحراف)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `check:provider-asset-provenance` | تحمل شعارات/أصول المزوّد إدخالًا مسجلًا لمصدرها                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `lint:json`                       | يجري تحليل ملفات إعداد JSON وتستوفي قواعد التدقيق الخاصة بالمستودع                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `typecheck:core`                  | تجميع TypeScript من دون أخطاء (تحذيرات إرشادية فقط)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | نعم                                    |
| `typecheck:noimplicit:core`       | ‏`noImplicitAny` صارم — استشرافي؛ لا تزال العديد من مواضع الاستدعاء الموجودة مسبقًا بحاجة إلى تعليقات توضيحية للأنواع                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | **إرشادي** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | تشغيل `tsc` بنطاق يقتصر على `src/app/(dashboard)/**` ‏(#7033) — لا تتضمن قائمة السماح المنسّقة المكوّنة من 27 ملفًا والخاصة بـ `typecheck:core` أي ملف TSX للوحة المعلومات، كما أن `next build` لا يتحقق من أنواعها أيضًا (يضبط `next.config.mjs` الخيار `ignoreBuildErrors: true`)، ولذلك لم تكن تراجعات المعرّفات المعزولة هناك (#6625/#6909) مرئية لنظام CI. تُجرى المقارنة مع خط أساس مجمّد لأعداد الأخطاء لكل ملف ولكل رمز TS (`config/quality/dashboard-typecheck-baseline.json`، باتباع نمط فرض اكتشاف التقادم نفسه المستخدم في `check:known-symbols`) — لا تؤدي إلى فشل البوابة إلا الأخطاء الجديدة التي تتجاوز العدد المسجّل في خط الأساس؛ خفّض خط الأساس تدريجيًا باستخدام `--update` عند إصلاح خطأ موجود مسبقًا.                                                                                        | نعم                                    |

### المهمة: `quality-gate`

تعمل بعد `test-coverage`. تمنع الدمج عند الفشل.

| البرنامج النصي               | ما يتحقق منه                                                                                                                                                       | مانع للدمج              |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------- |
| `quality:collect`            | يُصدر `quality-metrics.json` (عدد تحذيرات ESLint، والتغطية من تقرير الأجزاء المدمج)                                                                                | نعم (يسبق آلية التصعيد) |
| `quality:ratchet`            | عدم تراجع أي مقياس في `quality-baseline.json` (تحذيرات ESLint ≤ خط الأساس؛ التغطية ≥ خط الأساس)                                                                    | نعم                     |
| `check:duplication`          | عدم تجاوز تكرار الشيفرة (jscpd@4) لخط الأساس في `quality-baseline.json`                                                                                            | نعم                     |
| `check:complexity`           | عدم تجاوز التعقيد الدوري على مستوى الملف للحد الأقصى (قاعدتا ESLint الأساسيتان `complexity` و`max-lines-per-function`)                                             | نعم                     |
| `check:cognitive-complexity` | آلية تصعيد التعقيد المعرفي (`eslint-plugin-sonarjs`) — تمريرة ESLint منفصلة؛ يشغّل CI كلتيهما مدمجتين كخطوة `check:complexity-ratchets` واحدة                      | نعم                     |
| `check:dead-code`            | عدم تراجع آلية تصعيد التصديرات / الملفات غير المستخدمة (knip) مقارنةً بخط الأساس                                                                                   | نعم                     |
| `check:compression-budget`   | ميزانية معيار ضغط الأداء — يجب ألا تتراجع الحدود الدنيا لتوفير الرموز لكل محرك                                                                                     | نعم                     |
| `check:type-coverage`        | عدم تراجع آلية تصعيد نسبة الأنواع المحددة (`type-coverage`)؛ وهي تغطي إلى حد كبير `typecheck:noimplicit:core`                                                      | نعم                     |
| `check:codeql-ratchet`       | عدم تراجع عدد تنبيهات CodeQL المفتوحة (تُقرأ عبر `gh api`؛ تخطٍّ سلس عند عدم وجود رمز مميز) — لمعرفة وتيرة التحديث والتشغيل اليدوي: راجع "آلية تصعيد CodeQL" أدناه | نعم                     |

### المهمة: `quality-extended`

المهمة بأكملها استشارية (`continue-on-error: true`). تعمل آليات التصعيد المستندة إلى npm
فعليًا؛ أما أدوات الفحص الخارجية فتُثبَّت عبر `gh release download` وتتخطى نفسها (رمز الخروج 0)
عندما تظل الأداة التنفيذية غير موجودة.

| البرنامج النصي           | ما يتحقق منه                                                                                                                                                                                                             | مانع للدمج                                         |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------- |
| `check:circular-deps`    | عدم وجود تبعيات دائرية (dpdm)                                                                                                                                                                                            | **استشاري**                                        |
| `check:bundle-size`      | عدم تجاوز حجم الحزمة للحد الأقصى                                                                                                                                                                                         | **استشاري**                                        |
| `check:secrets`          | فحص الأسرار (gitleaks) — يتم التخطي إذا كانت الأداة التنفيذية غير موجودة                                                                                                                                                 | **استشاري**                                        |
| `check:vuln-ratchet`     | عدم تراجع ثغرات التبعيات (osv-scanner) — يتم التخطي إذا كانت الأداة التنفيذية غير موجودة                                                                                                                                 | **استشاري**                                        |
| `check:workflows`        | تدقيق سير العمل (actionlint + zizmor)؛ يؤدي غياب أدوات الفحص أو تعطلها، أو التقارير غير الصالحة، أو غياب خط أساس آلية التصعيد إلى الفشل بالحالة INCOMPLETE. تتبع النتائج الصالحة سياسة الصرامة/الاستشارة/التصعيد المحددة | التنفيذ مطلوب؛ آلية تصعيد zizmor مانعة للدمج في CI |
| `check:openapi-breaking` | التغييرات الكاسرة لعقد واجهة API العامة (`openapi.yaml`) مقارنةً بالفرع الأساسي (oasdiff) — يُصدر `openapiBreaking=N`؛ ويتم التخطي إذا كان oasdiff غائبًا أو تعذّر تحليل المواصفات الأساسية                              | **استشاري**                                        |

### المهمة: `docs-sync-strict`

تعمل مع كل طلب سحب إلى `main`. وتمنع الدمج عند الفشل.

| السكربت                        | ما الذي يتحقق منه                                                                                                                                                             | حاجب                       |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- |
| `check:docs-all`               | بوابة تجميعية تشغّل البوابات الفرعية الست أدناه بالتتابع                                                                                                                      | نعم                        |
| ↳ `check:docs-sync`            | اتساق الإصدارات بين CHANGELOG وOpenAPI وllm.txt                                                                                                                               | نعم                        |
| ↳ `check:docs-counts`          | الأعداد المذكورة في النصوص (عدد المزوّدين، وعدد عمليات الترحيل، وما إلى ذلك) تقع ضمن نافذة التصعيد التدريجي للأعداد الفعلية                                                   | نعم                        |
| ↳ `check:env-doc-sync`         | كل متغير بيئة في `.env.example` موثّق في جدول ضمن الوثائق، والعكس صحيح                                                                                                        | نعم                        |
| ↳ `check:deprecated-versions`  | عدم وجود سلاسل إصدارات مهملة في الوثائق                                                                                                                                       | نعم                        |
| ↳ `check:doc-links`            | روابط markdown الداخلية في الوثائق تحيل إلى ملفات موجودة فعلًا (بصيغة `[text]`/`(path)`)                                                                                      | نعم                        |
| ↳ `check:fabricated-docs`      | المسارات، ومتغيرات البيئة، وأوامر CLI، وأسماء الخطافات، ومسارات الملفات المذكورة في الوثائق موجودة في قاعدة الشفرة. بوابة صارمة عبر `--strict`؛ وفشل غير حاجب دون هذا الخيار. | نعم (عبر `--strict` في CI) |
| `check:cli-i18n`               | سلاسل أوامر CLI موجودة في جميع ملفات اللغات في i18n                                                                                                                           | نعم                        |
| `check:openapi-coverage`       | تغطي مواصفات OpenAPI حدًا أدنى متزايدًا تدريجيًا من المسارات الفعلية                                                                                                          | نعم                        |
| `check:openapi-security-tiers` | تعليقات مستويات الأمان في `openapi.yaml` متسقة مع التصنيفات في `routeGuard.ts`                                                                                                | **استشاري**                |
| `check:openapi-routes`         | كل مسار في `openapi.yaml` يحيل إلى ملف `route.ts` موجود فعلًا (لمنع الهلوسة)                                                                                                  | نعم                        |
| `check:docs-symbols`           | كل مرجع إلى `/api/...` في `docs/**/*.md` يحيل إلى ملف `route.ts` موجود فعلًا (لمنع الهلوسة)                                                                                   | نعم                        |
| `i18n translation drift`       | المفاتيح غير المترجمة في ملفات لغات i18n — تحذير فقط                                                                                                                          | **استشاري**                |

### المهمة: `i18n-ui-coverage`

| السكربت                          | ما الذي يتحقق منه                                                                                                                                                                                         | حاجب        |
| -------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `check-ui-keys-coverage` (مضمّن) | تغطية مفاتيح i18n لواجهة المستخدم تبلغ ≥ 65%                                                                                                                                                              | نعم         |
| `check-ui-value-drift` (مضمّن)   | إعادة صياغة **قيمة** إنجليزية لا تترك وراءها ترجمة قديمة                                                                                                                                                  | نعم         |
| `check-new-key-coverage` (مضمّن) | كل مفتاح إنجليزي **جديد** مترجم في كل لغة — تُرفض علامة `__MISSING__:`                                                                                                                                    | نعم         |
| `check-translation-ratio`        | يجب ألا تتجاوز نسبة الترجمات الفعلية لكل لغة (القيم المطابقة للإنجليزية / العناصر النائبة / العناصر الناقصة خارج قائمة السماح) القيمة المحددة في `config/quality/i18n-translation-baseline.json` + الهامش | **استشاري** |

تحتاج إلى `fetch-depth: 0` — إذ تقارن بوابة انحراف القيم ملف `en.json` مع قاعدة الدمج.

#### `check-ui-value-drift` — بوابة الترجمات القديمة

ترصد حالة التراجع الوحيدة في i18n التي لا تستطيع البوابات الأخرى اكتشافها بنيويًا: إعادة صياغة قيمة إنجليزية
مع بقاء الترجمات المشتقة من النص الإنجليزي _السابق_، ما يجعل
المستخدمين غير الناطقين بالإنجليزية يستمرون في قراءة نص يبدو موثوقًا لكنه أصبح خاطئًا.

وقد حدث هذا فعليًا في إصدار منشور. أُعيدت صياغة `oauthModal.googleOAuthWarning` عند إضافة مساعد تسجيل الدخول
Antigravity (#5203)؛ وأبقت **39 من أصل 43 لغة** على نص يطلب من المشغّلين «نسخ عنوان URL
بالكامل ولصقه أدناه» — وهي آلية لا يمكن إكمالها لهذا المزوّد. ولم
يُلاحظ ذلك حتى #8463 للأسباب التالية:

- لا يملأ `sync-ui-keys` إلا المفاتيح **الغائبة**، ولا يحدّث المفاتيح **القديمة** مطلقًا؛
- يحتسب `check-ui-keys-coverage` _وجود_ المفتاح، لذا تُحسب الترجمة القديمة على أنها مغطاة؛
- يتتبع `check-translation-drift` نسخ الوثائق المتطابقة في `docs/i18n/<locale>/**.md` —
  ولا يقرأ `src/i18n/messages/*.json` أبدًا. وهو حاجب في المهمة `docs-sync-strict` منذ
  إعادة المزامنة في 2026-09: عند تعديل وثيقة أساسية → `npm run i18n:run -- --files=<doc>` (على مستوى القسم، وقليل التكلفة).

**مدرك للاختلافات، وغير مستند إلى خط أساس.** يقارن `en.json` عند قاعدة الدمج
بشجرة العمل؛ ولكل مفتاح تغيّرت قيمته الإنجليزية، تُعد أي لغة ما تزال تحتفظ
بترجمة لم تُمس قديمة. يؤدي ذلك عمدًا إلى **تجميد الدَّين الموجود مسبقًا** — إذ لا يمكن
للاختلاف أن يكشف النص الإنجليزي القديم الذي جاءت منه ترجمة قديمة، لذا لا تفحص البوابة
إلا ما يمسّه التغيير الحالي. أما البديل (خط أساس لتجزئة كل مفتاح) فسيتطلب
ملفًا مولّدًا بحجم ~600 KB، أي 3× حجم أكبر خط أساس موجود، وسيتغير مع كل طلب سحب خاص بالتدويل.

هناك طريقتان لاجتياز الفحص:

1. تحديث الترجمات المتأثرة، أو
2. تعيينها إلى `__MISSING__:<new english>` — وعندها يقدّم وقت التشغيل النص الإنجليزي المصحح
   (`src/i18n/request.ts::deepMergeFallback`، #7258) ويُدرج المفتاح في طابور الترجمة.

إذا تغيّر **معنى** السلسلة، فمن الأفضل **إعادة تسمية المفتاح**: لا يمكن لمفتاح جديد أن يرث
ترجمة قديمة. وهذا هو النمط الذي استخدمه #8463.

```bash
npm run i18n:check-value-drift          # صارم (ما يشغّله CI)
npm run i18n:check-value-drift:warn     # إعداد تقرير فقط
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

يخرج بالرمز 0 مع `SKIP reason=base-unresolved` عندما تتعذر قراءة الكتالوج الأساسي (نسخة
سطحية من المستودع دون مرجع الأساس)، بما يماثل `check-openapi-breaking`.

### المهمة: `i18n`

مصفوفة التحقق الكاملة من التدويل (مهمة واحدة لكل لغة). المهمة بأكملها استشارية.

| البرنامج النصي                  | ما يتحقق منه           | الحظر                                                  |
| ------------------------------- | ---------------------- | ------------------------------------------------------ |
| `validate_translation.py quick` | اكتمال الترجمة لكل لغة | **استشاري** (`continue-on-error: true` للمهمة بأكملها) |

### المهمة: `pr-test-policy`

تعمل على طلبات السحب فقط.

| البرنامج النصي         | ما يتحقق منه                                                                                                                                    | الحظر |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| `check:pr-test-policy` | يجب أن تتضمن طلبات السحب التي تغيّر شيفرة الإنتاج في `src/` أو `open-sse/` أو `electron/` أو `bin/` اختبارات أو أن تحدّثها (القاعدة الصارمة #8) | نعم   |
| `check:test-masking`   | لا تقلل ملفات الاختبار المتغيرة العدد الصافي للتأكيدات ولا تضيف تحصيلات حاصلة من نوع `assert.ok(true)`                                          | نعم   |
| `check:pr-evidence`    | يشير نص طلب السحب إلى أدلة الاختبار/VPS الخاصة بالتغيير (يؤتمت القاعدة الصارمة #18 عبر البحث في نص طلب السحب — هش، راجع قائمة الأعمال المؤجلة)  | نعم   |

### المهمة: `test-vitest`

تعمل بعد `build`. تمنع الدمج عند الفشل.

| الحزمة           | ما تتحقق منه                                                           | الحظر                                                                                                                 |
| ---------------- | ---------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | خادم MCP ‏(110 أداة)، وautoCombo، وذاكرة التخزين المؤقت — مشغّل vitest | نعم                                                                                                                   |
| `test:vitest:ui` | اختبارات مكوّنات واجهة المستخدم — مشغّل vitest                         | **حاظر** — تُستبعد حالات الفشل الموجودة مسبقًا صراحةً في `vitest.config.ts`؛ وتؤدي حالات الفشل الجديدة إلى فشل المهمة |

### تدفقات العمل الليلية (مجدولة، استشارية)

تعمل هذه وفق جدول cron (وكذلك عبر `workflow_dispatch`)، ولا تعمل أبدًا على طلبات السحب. وجميعها استشارية.

| تدفق العمل             | ما يتحقق منه                                                                                                                                                    | الحظر       |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `nightly-property`     | اختبارات الخصائص باستخدام fast-check مع بذرة عشوائية + عدد تشغيلات مرتفع                                                                                        | **استشاري** |
| `nightly-resilience`   | بوابة نمو الكومة، وحقن أعطال الفوضى، واختبارات الحمل/الاستمرارية باستخدام k6                                                                                    | **استشاري** |
| `nightly-llm-security` | حاجز حقن promptfoo (وضع الحظر) + فحوصات garak (تُتخطى دون سر لمزوّد الخدمة)                                                                                     | **استشاري** |
| `nightly-schemathesis` | اختبار عشوائي لعقد OpenAPI ‏(schemathesis) مقابل OmniRoute مباشر باستخدام `docs/openapi.yaml` — يكشف مخالفات المواصفات / أخطاء 500 غير المعالجة (المرحلة 8 B.4) | **استشاري** |
| `nightly-mutation`     | درجة اختبار الطفرات باستخدام Stryker عبر مسار الوحدات السريع — تكشف الطفرات الناجية التأكيدات الضعيفة                                                           | **استشاري** |
| `nightly-compat`       | مصفوفة توافق محرك Node عبر نطاقات `engines.node` المدعومة                                                                                                       | **استشاري** |

---

## مرحلة السرعة (2026-08-30 → v4.0 LTS): تخفيف كل خط أساس بنسبة 20%

قرار المالك (2026-08-30): حتى اكتمال التقسيم إلى وحدات في v4.0، تُعد سرعة الإصدار أهم
من الحفاظ على حد الدين التقني. جرى تخفيف كل خط أساس **رقمي** للعتبات التصاعدية بنسبة 20% في عملية
واحدة قابلة للتدقيق، وتم الإعلان عن المرحلة في `config/quality/quality-baseline.json`:

```json
"_policy": { "phase": "velocity", "since": "2026-08-30", "until": "4.0.0",
             "relaxPct": 20, "requireTighten": false }
```

| ما الذي تغير                                                                                                                                                                                                                                           | أين                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| `metrics.*.value` — الأعداد التي يكون الأقل فيها أفضل ×1.2، والنسب المئوية التي يكون الأعلى فيها أفضل ÷1.2 (تم الإبقاء على الحد الأدنى للتغطية عند 60، ويظل `eslintErrors` عند 0، ويتغير `eslintWarnings` من 0 إلى 20% من عدد عمليات التعطيل المجمّدة) | `quality-baseline.json` (تسرد ملاحظة `_relax_velocity_2026_08_30` كل قيمة قبل → بعد)                   |
| `count` ×1.2 / `percentage` ×1.2                                                                                                                                                                                                                       | `complexity-baseline.json`, `duplication-baseline.json`                                                |
| `cap` و`testCap` وحدّ الأسطر لكل عنصر في `frozen[*]` / `testFrozen[*]` ×1.2                                                                                                                                                                            | `file-size-baseline.json`                                                                              |
| الأعداد لكل ملف / لكل شيفرة TS ×1.2                                                                                                                                                                                                                    | `api-typecheck-baseline.json`, `dashboard-typecheck-baseline.json`, `open-sse-typecheck-baseline.json` |
| `THRESHOLD` من 36 → 30                                                                                                                                                                                                                                 | `scripts/check/check-openapi-coverage.mjs`                                                             |
| يصبح `--require-tighten` إرشاديًا عندما تكون `_policy.requireTighten === false`                                                                                                                                                                        | `scripts/quality/check-quality-ratchet.mjs`                                                            |
| إيقاف `bank-ratchet-shrinks` الليلي مؤقتًا (إذ كان سيسجل الانخفاض المقاس ويلغي الهامش المتاح)                                                                                                                                                          | `.github/workflows/nightly-release-green.yml`                                                          |

قوائم السماح (`eslint-suppressions.json` و`test-masking-allowlist.json` و`test-discovery-baseline.json`
وغيرها) ليست **ميزانيات** ولم تُعدّل. لم تتغير بوابات سياسة النجاح/الفشل (الأسرار، وقواعد SQL،
وعقد التوثيق/البيئة، وتكافؤ i18n، واختبارات الوحدات) — فالاختبار الفاشل يظل اختبارًا فاشلًا.

**الأدوات**

- `npm run quality:relax-baselines -- --pct 20 --note velocity_YYYY_MM_DD [--dry-run]` — عملية
  التخفيف أحادية التنفيذ (`scripts/quality/relax-baselines.mjs`)؛ وترفض التشغيل مرتين باستخدام
  الملاحظة نفسها.
- `npm run quality:headroom [-- --only deadExports,fileSize] [--json out.json --md out.md]` —
  يقيس كل بوابة رقمية بالطريقة نفسها التي يستخدمها CI ويطبع الهامش المتبقي لكل بوابة
  (`scripts/quality/baseline-headroom.mjs`). تنشر مهمة `baseline-headroom` الليلية
  الجدول في المشكلة المستمرة **📈 هامش خطوط الأساس (مرحلة السرعة)**، وتضيف التصنيف
  `headroom-alert` عندما تكون أي بوابة ضمن 10% من حدها الأقصى أو قد تجاوزته بالفعل. تمثل تلك المشكلة
  إنذارًا مبكرًا: فإذا امتلأت ميزانية خلال أيام، فهذا يعني أن التخفيف تستهلكه
  بضعة طلبات دمج، لا الفريق بأكمله — راجع ملاحظات `_rebaseline_*` الخاصة بالبوابة المخالفة.

**وضع الشيفرة الجديدة (Clean-as-You-Code) — منذ 2026-08-30، للمسار السريع لطلبات الدمج فقط**

في أحداث `pull_request`، يمرر `quality.yml` الخيار `--base-ref <PR base SHA>` إلى `check:file-size`
و`check:complexity-ratchets` و`check:dead-code`. في هذا الوضع، تقارن البوابة HEAD مع
قاعدة الدمج **مع الاقتصار على الملفات التي عدّلها طلب الدمج** (`scripts/check/newCodeMode.mjs`: يجري
تجسيد قاعدة الدمج في `git worktree` مؤقت، ويُشغّل ESLint/knip هناك وعلى HEAD، ثم تُحسب
فروق الأعداد لكل ملف):

- **مانع** — أضاف طلب الدمج مخالفات للتعقيد الدوري/الإدراكي أو صادرات غير مستخدمة في الملفات التي غيّرها
  (`complexityNewCode=` و`cognitiveComplexityNewCode=` و`deadExportsNewCode=` في السجل)؛
- **إرشادي** — الإجمالي العام مقارنةً بخط الأساس المجمّد. لا يؤدي الانحراف الموروث أبدًا إلى إفشال
  طلب دمج بريء؛ ويُعاد تجميد الانحراف أثناء تسوية الإصدار، بينما تراقبه مهمة الهامش.

لا تحتوي عمليات تشغيل `workflow_dispatch`، ولا فحص release-green، ولا مهمة الهامش الليلية على أساس
لطلب دمج، ولذلك تستمر في استخدام المقارنة المطلقة (العامة). تظل تغطية الاختبارات والتكرار وتغطية الأنواع
عامة في الوقت الحالي (فأدواتها لا تنتج فرقًا لكل ملف بتكلفة منخفضة) — وهي مرشحة للمعالجة نفسها.

**إغلاق المرحلة عند v4.0 (تعني LTS قيودًا أشد من السابق، لا «العودة إلى الوضع الطبيعي»)

1. على أحدث نسخة خالصة من `release/v4.0.0`: شغّل `npm run quality:headroom --json` للتوثيق، ثم
   `npm run quality:ratchet -- --update`، و`check:file-size --update`،
   و`check:complexity-ratchets --update`، و`check:dead-code --update`، و`--update` لكل بوابة من بوابات التحقق من الأنواع — بحيث ينخفض كل خط أساس إلى القيمة المقاسة.
2. احذف `_policy` من `quality-baseline.json` (لإعادة تفعيل `--require-tighten` والادخار
   الليلي)، وأعِد `THRESHOLD = 36` (أو قيمة أعلى) في `check-openapi-coverage.mjs`.
3. شدّد الحدود إلى ما هو أبعد من القيم المقاسة حيث أثمرت عملية التقسيم إلى وحدات: أعِد `cap` لحجم الملفات إلى 1000
   (أو 800)، وارفع الحدود الدنيا للتغطية بمقدار 5، واضبط عدد التصديرات غير المستخدمة على 0 للحزم التي جرى تقسيمها إلى وحدات.

## خط الأساس لآلية Ratchet ‏(`quality-baseline.json`)

يقرأ محرك ratchet ‏(`scripts/quality/check-quality-ratchet.mjs`) الملف `quality-baseline.json`
ويقارنه بالملف `quality-metrics.json` الذي جُمعت بياناته حديثًا. يؤدي أي مقياس يتراجع
بما يتجاوز قيمة epsilon الخاصة به إلى فشل عملية البناء.

المقاييس المتتبعة حاليًا:

| المقياس               | الاتجاه | المعنى                           |
| --------------------- | ------- | -------------------------------- |
| `eslintWarnings`      | `down`  | يجب ألا يزداد عدد تحذيرات ESLint |
| `coverage.statements` | `up`    | يجب ألا تنخفض تغطية العبارات     |
| `coverage.lines`      | `up`    | يجب ألا تنخفض تغطية الأسطر       |
| `coverage.functions`  | `up`    | يجب ألا تنخفض تغطية الدوال       |
| `coverage.branches`   | `up`    | يجب ألا تنخفض تغطية الفروع       |

لتحديث خط الأساس بعد حدوث تحسين فعلي:

```bash
npm run quality:ratchet -- --update
git add quality-baseline.json
```

تكتب العلامة `--update` القيم المقاسة حاليًا في `quality-baseline.json`.
ثبّت هذا الملف مع التغيير الذي حسّن المقياس. سيكتشف الخيار `--require-tighten` أي طلب PR
يحسّن مقياسًا من دون تحديث خط الأساس (المرحلة 6A.5،
قيد التنفيذ).

### آلية ratchet الخاصة بـ CodeQL: وتيرة التحديث والتشغيل اليدوي

يقرأ `check:codeql-ratchet` **حالة المستودع، التي تُحدَّث وفق جدول زمني — وليس لكل PR.**
يعرض `gh api repos/diegosouzapw/OmniRoute/code-scanning/default-setup`
القيمتين `state: configured` و`schedule: weekly`: أي فحص الإعداد الافتراضي في GitHub، وليس تحليلًا
يُجرى مع كل عملية دفع. والنتيجة: بعد دمج طلب PR يعمل على إصلاح التنبيهات، تستمر آلية ratchet في قراءة
العدد القديم الأعلى حتى تشغيل الفحص المجدول التالي — ولذلك تُبلغ عن تراجع
في كل طلب PR مفتوح، بما في ذلك المتابعات الخاصة بطلب PR الذي نفّذ الإصلاح، إلى أن يلحق الفحص بالتغييرات.

**التحديث اليدوي**: يعيد `gh workflow run codeql.yml --ref release/vX.Y.Z` تشغيل
التحليل وينشر التنبيهات مجددًا خلال دقائق. اقرأ `.github/workflows/codeql.yml`
أولًا — إذ يوضح ترويسته أنه مخصص لـ `workflow_dispatch` فقط **لأنه يتعارض مع
"الإعداد الافتراضي" في GitHub** (`CodeQL analyses from advanced configurations cannot be
processed when the default setup is enabled`). تتطلب استعادة مشغلات `push`/`pull_request`/
`schedule` **إجراءً من المالك أولًا**: Settings → Code security →
CodeQL: Default → Advanced. لا تضف مشغل `schedule:` من دون إجراء ذلك التبديل — فلن
ينتج عنه سوى عمليات تشغيل فاشلة.

**شدّد خط الأساس بعد انخفاض العدد** — يكتب `node scripts/check/check-codeql-ratchet.mjs
--update` العدد الجديد المقاس في `quality-baseline.json` →
`metrics.codeqlAlerts.value`، كي لا تسمح آلية ratchet ضمنيًا بحدوث تراجع يعيد العدد
إلى الحد الأقصى القديم. مثال عملي (2026-09-02/03): أصلح طلب PR رقم #12502 سبعة تنبيهات حقيقية
(من 13 إلى 6 تنبيهات مفتوحة مقاسة)؛ وشدّد طلب PR رقم #12530 خط الأساس المجمّد من 11 إلى 6 ليتطابق معه؛ ثم
رُفضت التنبيهات الستة المتبقية مع تقديم مبرر لكل تنبيه، حتى وصل عدد التنبيهات المفتوحة إلى 0.

**قرارات الرفض من اختصاص المشغّل (القاعدة الصارمة رقم #14)** — لا ترفض أبدًا تنبيه CodeQL
من دون تسجيل المبرر التقني في تعليق الرفض: `won't fix` لمتطلب يخص بروتوكولًا تابعًا لجهة خارجية،
و`used in tests` لوحدة اختبار ثابتة، و`false positive`
لأداة تنقية لا يستطيع CodeQL اكتشافها (السابقة: `docs/security/ERROR_SANITIZATION.md`).

---

## سياسة إعادة محاولة الاختبارات (WS5.4، v3.8.49)

تُطبَّق إعادة المحاولة لكل مشغّل على حدة، وليست سياسة عامة شاملة أبدًا — إذ إن إعادة المحاولة الشاملة تحوّل حالات التراجع الحقيقية
إلى اختبارات متذبذبة غير مرئية:

| المشغّل          | السياسة                                                                                                                | السبب                                                                                                            |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Playwright (e2e) | `retries: 1` في CI فقط، مع `trace: on-first-retry`                                                                     | توقيت المتصفح/الشبكة غير حتمي بطبيعته؛ وإعادة محاولة واحدة مع تتبّع تحوّل الاختبار المتذبذب إلى أثر قابل للتشخيص |
| Vitest           | لا توجد إعادة محاولة عامة. يحصل الاختبار المثبت تذبذبه على إعادة محاولة صريحة لكل اختبار (تظهر في الفرق وتُراجع في PR) | يُبقي قائمة العزل في المستودع، ولا يجعلها مبهمة أبدًا                                                            |
| node:test (unit) | لا إعادة محاولة، إطلاقًا                                                                                               | الاختبار الوحدوي المتذبذب هو خطأ في الاختبار — أصلحه، ولا تعِد تشغيله على أمل نتيجة مختلفة                       |

مستهدفات SLO بعد توافر قياس تذبذب الاختبارات (WS5.2/5.3): معدل تذبذب <1% لكل اختبار
(عتبة "الإصلاح الآن")، ومعدل نجاح ≥95% لكل مسار. هذه قيم مرجعية متداولة في المجال —
تُعاد معايرتها استنادًا إلى قياساتنا الخاصة.

## انحراف سقوف الضبط على مستوى الإصدار (WS5.5، v3.8.49)

عندما يتراجع أحد سقوف الضبط (حجم الملف، أو التعقيد، أو تحذيرات eslint) عند الطرف الخالص لفرع الإصدار
— أي إن **اجتماع** عمليات الدمج هو الذي سبّب التراجع، ولا يعيد أي PR منفرد إنتاج
التراجع على فرعه الخاص — فإن مسؤولية الإصلاح تقع على **قائد الإصدار، مرة واحدة، على
فرع الإصدار**: يُفضَّل الاستخراج/إعادة الهيكلة؛ ولا تُعَد معايرة خط الأساس إلا مع إدخال
التبرير الموثّق. لا تُحمِّل انحرافًا ناتجًا عن اجتماع التغييرات على PR لأحد المساهمين، ولا
تعِد معايرة خط الأساس لكل PR (فهذا يخفي حالات التراجع الحقيقية). ميّز السبب أولًا: أعِد إنتاج
حالة الفشل عند الطرف الخالص داخل شجرة عمل استقصائية قبل افتراض أن PR الخاص بك سبّبها.

## حفظ انخفاضات سقوف الضبط — الاتجاه التنازلي (#8584)

سقف الضبط مؤتمت إلى النصف فقط، وهو النصف الخطأ. **رفع** الحد الأقصى هو
تعديل يدوي على JSON يستغرق عشر ثوانٍ، وهو أسرع طريقة لإلغاء حظر PR فاشل.
أما **خفضه** فيتطلب من شخص تشغيل `--update` وإيداع النتيجة — وحتى
إطلاق مهمة `bank-ratchet-shrinks`، لم يكن هناك أي سير عمل يشغّلها. النتيجة المقاسة
(2026-07-25): يوجد 18 ملفًا مجمدًا بالفعل عند الحد الأقصى البالغ 800 سطر للملفات الجديدة أو دونه، وأسوأها
عند 132× (`src/shared/validation/schemas.ts`، إذ يحتوي 19 سطرًا مع حد أقصى قدره 2,523)؛ كما ارتفع
سقف التعقيد من `1794 → 2169` عبر نحو 37 ملاحظة لإعادة معايرة خط الأساس، مع انخفاض واحد بالضبط
(−1)؛ وكُتبت عبارة "التشديد عبر `--update` في الدورة التالية" 31 مرة ولم تُنفّذ إلا
مرة واحدة. الحد الأقصى الذي يبقى بعد زوال الشيفرة التي استوجبته يحوّل بصمت كل عملية
تفكيك مكتملة إلى سماح بالنمو لمن يعدّل الملف بعد ذلك.

`nightly-release-green.yml` → المهمة **`bank-ratchet-shrinks`** تغلق هذه الحلقة:

|           |                                                                                                           |
| --------- | --------------------------------------------------------------------------------------------------------- |
| تعمل عند  | `schedule` (3 مرات/يوم) + `workflow_dispatch` — وعمداً **ليس** عند `push`                                 |
| تقيس      | أعلى `release/vX.Y.Z`، مع آلية الحل نفسها + حاجز الحقن نفسه كما في `release-green`                        |
| تكتب      | `check:file-size --update` و`check:complexity-ratchets --update` (كلاهما لا يسمح إلا بالخفض بحكم التصميم) |
| تتحقق عبر | `npm run check:ratchet-bank` (`scripts/quality/verify-ratchet-bank.mjs`)                                  |
| تسلّم     | PR واحدًا محدّثًا دائمًا مقابل فرع الإصدار — يُحدَّث قسرًا، ولا يرسل طلبات مزعجة متعددة                   |

يُنفَّذ حفظ الانخفاضات على دفعات بدلًا من تنفيذه عند كل عملية دفع، لأنه لا يتطلب زمن استجابة منخفضًا (يكفي
حفظ الانخفاض خلال 8 ساعات)، بينما سيؤدي التشغيل عند كل دمج إلى إعادة بناء فرع PR مرارًا
أثناء حملات الدمج، مع تحمّل تكلفة فحص ESLint كامل في كل مرة. يظل الكشف عند
الدفع (`release-green`)؛ أما الحفظ وحده فيُنفَّذ على دفعات.

### أداة التحقق من السلامة

تكتب المهمة إلى خطوط الأساس دون إشراف، ولذلك فإن `verify-ratchet-bank.mjs` هو ما يجعل
ذلك مقبولًا. تقارن الأداة شجرة ما بعد `--update` مع `HEAD`، ثم **تُجهض المهمة
قبل وجود أي عملية إيداع** — من دون فتح أي PR — ما لم يكن كل تغيير واحدًا مما يلي:

- إدخال رقمي في `frozen` / `testFrozen` تم **خفضه** أو **إزالته**
- `complexity-baseline.json` → تم **خفض** `count`
- `quality-baseline.json` → تم **خفض** `metrics.cognitiveComplexity.value`

يفشل أي شيء آخر: رفع رقم، أو إضافة إدخال، أو تغيير `cap`/`testCap`، أو
حذف/إعادة كتابة ملاحظة `_rebaseline_*` (هذه الملاحظات هي سجل التدقيق الذي يوضح سبب وجود كل
سقف، وهي مخزنة داخل كائن `frozen` نفسه مع إدخالات الملفات).
أي روبوت يمكنه رفع حد أقصى سيكون أسوأ قطعًا من الوضع الراهن. حاجز التراجع:
`tests/unit/verify-ratchet-bank.test.ts`.

لا تدفع المهمة أبدًا إلى `release/*` — بل يدمج إنسان PR، بحيث لا يمكن
لقياس سيئ أن يصل دون مراجعة.

## سياسة قائمة السماح

تستخدم كل بوابة لا يمكن أن تفشل بسبب انتهاكات موجودة مسبقًا قائمة سماح مجمّدة
(مثل `KNOWN_STALE_DOC_REFS` و`KNOWN_MISSING` و`KNOWN_RAW_SQL`). والسياسة هي:

**أصلح السبب الجذري؛ ولا تستخدم قائمة السماح إلا عندما يكون الانتهاك موجودًا مسبقًا
ولا يمكن إصلاحه ضمن طلب السحب نفسه.**

عند إضافة إدخال إلى قائمة سماح:

1. أضف تعليقًا يوضّح المبرر.
2. أشر إلى مشكلة التتبع (مثل `// #3498 — ميزة المرحلة الثانية، لم تُنفّذ بعد`).
3. أزل الإدخال ضمن طلب السحب نفسه الذي يُصلح الانتهاك — فالإدخال المتقادم الذي لم يعد
   يمنع الإبلاغ عن انتهاك نشط يُعدّ عيبًا بحد ذاته (سيؤدي فرض التحقق من الإدخالات المتقادمة في 6A.3
   إلى إفشال البوابة عند وجود إدخال يتيم في قائمة السماح بمجرد تنفيذه).

**لا** تضف إدخالات إلى قائمة السماح لتسريع اجتياز الاختبارات. فالبوابة الناجحة مع قائمة سماح
متنامية تمنح إحساسًا زائفًا بالجودة.

### عندما تفشل بوابة في طلب السحب الخاص بك

1. **اقرأ مخرجات البوابة بعناية** — فهي تخبرك بدقة بالملف أو الرمز الذي خالف
   القاعدة.
2. **أصلح الانتهاك** — معظم البوابات عبارة عن عمليات تحقق حتمية من نظام الملفات تنجح بمجرد
   تصحيح الشيفرة.
3. **إذا كان الانتهاك موجودًا مسبقًا** (أي إنك لم تُدخله، لكن البوابة أصبحت
   تغطيه الآن): أضف إدخالًا إلى قائمة السماح مع تعليق يوضّح المبرر وإشارة إلى مشكلة تتبع.
4. **إذا كانت البوابة تصاعدية** (التغطية، وتحذيرات ESLint، والتكرار، والتعقيد):
   فقد جعل تغييرك المقياس أسوأ. أصلح المشكلة الأساسية، أو شغّل في حالات نادرة
   `npm run quality:ratchet -- --update` إذا كان التغيير مقصودًا وكان تراجع
   المقياس مقبولًا — لكن وثّق السبب في وصف طلب السحب.
5. **البوابات الاستشارية** (`continue-on-error: true`) إعلامية — فهي لا تمنع
   الدمج، لكنها تظهر في ملخص CI. أصلحها رغم ذلك.

---

## إضافة بوابة جديدة

1. أنشئ `scripts/check/check-<name>.mjs` (أو `.ts`). تُنهي بوابات السياسة التنفيذ بالرمز 0/1.
   وتصدر البوابات التصاعدية مقياسًا إلى `quality-metrics.json` عبر `collect-metrics.mjs`.
2. أضف `"check:<name>": "node scripts/check/check-<name>.mjs"` إلى `package.json`.
3. اربطها في `.github/workflows/ci.yml` ضمن المهمة المناسبة
   (السياسة ← `lint` أو `docs-sync-strict`؛ التصاعدية ← `quality-gate`).
4. إذا كانت لها قائمة سماح، فطبّق `reportStaleEntries()` من
   `scripts/check/lib/allowlist.mjs` لكي تُكتشف الإدخالات المتقادمة تلقائيًا.
5. اكتب اختبارًا في `tests/unit/build/` يغطي منطق الكشف الخاص بالبوابة.
6. حدّث هذا المستند (أضف صفًا إلى جدول المهمة ذات الصلة).

---

## أدوات الوكلاء: دمج LSP في الحلقة (اختياري)

إلى جانب بوابات CI، يوفّر OmniRoute هيكل `agent-lsp` **اختياريًا**
(ملف `.mcp.json` على مستوى المشروع، المهمة 15 من المرحلة 7). أنشئ `.mcp.json`
لإتاحة خادم لغة TypeScript لوكلاء البرمجة، حتى يتمكنوا من تحليل الرموز /
والتشخيصات **قبل** كتابة الشيفرة — وهو رفيق لـ`typecheck:core` يعمل وفق مبدأ الترجمة قبل الادعاء،
ويحدّ من أخطاء «الرموز المختلقة» من مصدرها. وهو لا يُحمّل تلقائيًا عن قصد
(إذ تختار جسر MCP↔LSP وتتحقق منه بنفسك)؛ ولا يؤدي الإدخال المعطّل إلا إلى تسجيل
خطأ اتصال، ولا يتسبب أبدًا في تعطيل الجلسات.

---

## قائمة أعمال الترشيد المتراكمة (مراجعة العائد على الاستثمار — المرحلة 9، الموجة 3)

تمت مطابقة هذا الحصر مع `ci.yml` في 2026-06-17 (أغفل الإصدار السابق
`audit:deps` و`check:tracked-artifacts` و`check:lockfile` و`check:licenses`
و`check:dead-code` و`check:cognitive-complexity` و`check:type-coverage`
و`check:codeql-ratchet` و`check:pr-evidence`). حدّدت مراجعة العائد على الاستثمار للمجموعة التي تمت مطابقتها
مرشحي الترشيد الآتين. **عمليات الدمج هي تغييرات آلية في CI؛ أما تغييرات الحالة/عمليات الحذف فهي قرارات سياسات متروكة للمشغّل.** لم يُطبّق أي مما يرد أدناه
حتى الآن.

**ومن الأمور غير الموثقة أعلاه أيضًا** (استشارية، منخفضة الدلالة): مهمة `docs-lint`
(markdownlint + Vale، مع تعيين `continue-on-error` للمهمة بأكملها) ومسارات عمل الفحص المستقلة
`semgrep.yml` / `codeql.yml` / `scorecard.yml`. القيمة `semgrepFindings: 0` موجودة في
`quality-baseline.json` لكنها غير موصولة بآلية سقاطة مانعة في `ci.yml` — وهذا المقياس
يتيم حاليًا.

### الدمج / إزالة التكرار (آلي، أقل مخاطرة)

تم التحقق من كل مرشح مقابل الحالة الفعلية للبوابات في 2026-06-17 (الثقة مع التحقق)؛
وتبيّن أن عدة عمليات دمج «بديهية» تخفي ديونًا، ولذلك فهي **ليست** بدائل مباشرة سليمة.

- **يُشغَّل `check:docs-sync` مرتين** — بصورة مستقلة في مهمة `lint`، ومرة أخرى داخل `check:docs-all` (`docs-sync-strict`) وفي خطاف husky السابق للالتزام. ✅ **تم** — أزيل الاستدعاء المستقل من `lint`.
- **فحص CVE** — ❌ **ليس دمجًا سليمًا مباشرًا.** يفشل `audit:deps` فشلًا قاطعًا عند وجود أي ثغرة CVE عالية/حرجة؛ بينما لا يفشل `check:vuln-ratchet` (osv) إلا عند حدوث _تراجع_ مقارنة بخط الأساس (حاليًا 1 MODERATE). الدلالات مختلفة — سيؤدي حذف `audit:deps` إلى فقدان البوابة المطلقة للثغرات العالية/الحرجة. أبقِ كليهما.
- **اكتشاف الدورات** — ✅ **تم** (#15159 G-01/G-02). وصف النص القديم هنا `check:cycles` بأنه البوابة «الخضراء والمنتقاة» وبرّر إبقاءها مانعة لأن `check:circular-deps` (dpdm) أبلغ عن 91 دورة. كان ذلك اللون الأخضر **نجاحًا زائفًا**: كان `check:cycles` يفحص 5 أدلة فرعية (450 ملفًا)، ولا يطابق سوى `import|export … from` الساكنة، ويتجاهل كل محددات `@/` و`@omniroute/open-sse/`، ولذلك لم يكن يستطيع رؤية دورات الاستيراد الديناميكي + الأسماء المستعارة التي كانت سائدة في المستودع. تم الإصلاح: تجتاز البوابة الآن `src` + `open-sse` (5023 ملفًا)، وتجمع المحددات من TypeScript AST (وبالتالي يُحتسب `import("…")`، بينما لا يُحتسب `typeof import("…")` في موضع النوع)، وتحل `paths` في tsconfig. وهي تعثر على **14** دورة، لا 0. ولأن إصلاح 14 دورة موجودة مسبقًا غير ممكن في طلب سحب خاص بالبوابة، أصبح `check:cycles` الآن **سقاطة** (`--ratchet`، بسقف `metrics.cycles.value = 14` في `quality-baseline.json`، و`direction: down`) — فهي تمنع أي _تراجع_، ولا يمكن للعدد إلا أن ينخفض. يشغّل CI الأمر `npm run check:cycles:ratchet`. تتم معالجة الخفض التدريجي ضمن **A-01**. يبقى `check:circular-deps` (dpdm) استشاريًا بوصفه رأيًا ثانيًا أوسع نطاقًا.
- **التعقيد** — ✅ **تم** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): اجتياز واحد بواسطة ESLint، مع العد حسب ruleId بحيث تظل خطوط الأساس للتعقيد الدوري+الحد الأقصى للأسطر وللتعقيد المعرفي مستقلة؛ ويظل كل من `check:complexity` / `check:cognitive-complexity` متاحًا للاستخدام المحلي مع `--update`.
- **مكافحة الهلوسة في `/api`** — ✅ **تم** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): حصر واحد لنظام الملفات في `src/app/api`، مع استمرار openapi-routes + docs-symbols في إعداد تقارير مستقلة؛ وتظل الفحوص الفردية متاحة للتشغيل المحلي.
- **يُشغَّل `check:node-runtime` في 11 مهمة** — ⚠️ **عائد منخفض على الاستثمار.** تستخدم كل مهمة مشغّلًا منفصلًا، ويستغرق الفحص أقل من ثانية واحدة؛ الوفر الإجمالي نحو 10 ثوانٍ، مقابل فقدان إجراء حماية زهيد لكل مهمة. لا يستحق عناء التغيير.
- **`typecheck:noimplicit:core` ضمن lint في CI** — ✅ **أزيل من مهمة lint** (كان استشاريًا مع `continue-on-error`)؛ سطح الأنواع المانع هو `typecheck:core` + `check:type-coverage`. تم الاحتفاظ بالبرنامج النصي المحلي.

### تغيير الحالة / اتخاذ القرار (سياسة المشغّل)

- `check:openapi-security-tiers` (استشاري) — ❌ **لا يمكن تحويله إلى مانع بصورة سليمة مباشرةً.** ينتهي بالرمز 0، لكنه يحذر من أن عدة مسارات `traffic-inspector` ضمن `LOCAL_ONLY_API_PREFIXES` تفتقر إلى التعليق التوضيحي `x-loopback-only: true`. يتطلب فرضه إضافة تلك التعليقات التوضيحية إلى `openapi.yaml` أولًا.
- `typecheck:noimplicit:core` (استشاري) — تغطيه إلى حد كبير سقاطة `check:type-coverage` المانعة. حوّله إلى سقاطة أو احذف مرور `tsc` الثاني المتكرر.
- `test:vitest:ui` (أصبح الآن **مانعًا**) — حالات الفشل الموجودة مسبقًا مستثناة صراحةً في `vitest.config.ts` مع تعليقات التتبع `// #8618`؛ وتؤدي حالات الفشل الجديدة إلى فشل المهمة.
- `check:secrets` (gitleaks، سقاطة مانعة مجمّدة عند 3 نتائج إيجابية زائفة موثقة) — أضف الحالات الثلاث إلى قائمة السماح للوصول إلى 0، أو اخفضه إلى استشاري. يتداخل مع فحص الأسرار الأصلي في GitHub ومع `check:public-creds`.
- `check:pr-evidence` (مانع، يبحث في نثر متن طلب السحب باستخدام grep) — ينطوي على خطر مرتفع للنتائج الإيجابية الزائفة؛ وسيؤدي حذفه إلى إضعاف فرض القاعدة الصارمة رقم 18، لذا فهذا قرار سياسات حقيقي.
- `semgrep` (مستقل واستشاري) — يتداخل مع CodeQL بالنسبة إلى عائلات OWASP؛ صِل خط أساسه بسقاطة أو احذفه.

---

## الوثائق ذات الصلة

- سلسلة التوريد (المصدر، SBOM، Trivy، Scorecard): [`docs/security/SUPPLY_CHAIN.md`](../security/SUPPLY_CHAIN.md)

#### `check-key-completeness` — بوابة تكافؤ مجموعات المفاتيح

`scripts/i18n/check-key-completeness.mjs` (`npm run i18n:check-keys`، المهمة `i18n-ui-coverage`).
تقارن مجموعة المفاتيح الطرفية لكل ملف `src/i18n/messages/<locale>.json` مع `en.json` وتُفشل
التحقق عند وجود أي مفتاح طرفي مفقود أو زائد، بصرف النظر عن وقت إضافة المفتاح. تُعد العناصر النائبة
`__MISSING__:` موجودة (أما محتواها فهو من اختصاص بوابة النسبة). وهي المكمّل المطلق
للبوابتين القائمتين على الفروقات/النسب المئوية: تفرض `check-ui-keys-coverage` حدًا أدنى قدره 80 % لكل
لغة محلية (حتى مع غياب 43 مفتاحًا من أصل ~13,000 تظل القراءة 99.7 %)، بينما تحكم `check-new-key-coverage`
فقط على المفاتيح التي يضيفها طلب سحب إلى `en.json`. تُنشأ دفعة لغة محلية من نسخة `en.json` المتاحة يوم
إنشاء فرعها، وتستمر الترجمة أيامًا بينما تواصل القاعدة إضافة المفاتيح؛ ولا يضيف طلب سحب الدفعة
أي مفتاح بنفسه، لذلك ظلت البوابتان الشقيقتان صامتتين عندما دُمجت الدفعة 1 (#13044) وهي تفتقر إلى 43 مفتاحًا في تسع
لغات محلية، والدفعة 2 (#13660) وهي تفتقر إلى 10 مفاتيح في ثمانٍ منها (2026-09-15). أصلح الفشل باستخدام
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers`؛ ويعني وجود مفتاح طرفي `extra`
أن المصدر قد حذفه — فاحذفه من اللغة المحلية. يُبلغ `--warn` دون التسبب في الفشل.
يشغّل `--catalog=cli` المقارنة نفسها على `bin/cli/locales` (`npm run i18n:check-keys:cli`)؛
وتوجد كلتا الخطوتين في المهمة `i18n-ui-coverage`.

#### `check-new-key-coverage` — بوابة تدويل المفاتيح الجديدة

بوابة شقيقة لـ `check-ui-value-drift`. تلتقط الأخيرة قيمة إنجليزية **أُعيدت صياغتها**
بينما تُركت ترجماتها دون تحديث؛ أما هذه فتلتقط مفتاحًا إنجليزيًا **أُضيف**
بينما لم تتلقّه بعض اللغات المحلية قط.

لا تستطيع `check-ui-keys-coverage` رؤية هذه الفئة: فهي تفرض حدًا أدنى لنسبة التغطية لكل لغة محلية،
وغياب أحد عشر مفتاحًا من أصل ~13,000 يترك التغطية عند 99.9%. لا يمكن لنسبة مئوية لكل لغة
التعبير عن أن «هذه الميزة أُصدرت دون ترجمة» — إذ يمكن أن تصل ميزة كاملة إلى لغة محلية جديدة دون أي
نص، من دون أن يتغير الرقم مطلقًا.

الحادثة التي تجسّدها: ترجمت المرحلة 3 من لوحة التنسيق مفاتيحها الأحد عشر عبر
اللغات المحلية الـ42 الموجودة آنذاك. وبعد ساعات، رفعت دفعة لغات الاتحاد الأوروبي (#13044) عدد اللغات المحلية في المستودع
إلى 51، ولم تتلقَّ اللغات التسع الجديدة (`el`، `et`، `ga`، `hr`، `lt`، `lv`، `mt`، `sl`، `sr`)
هذه المفاتيح مطلقًا. يستبدل `deepMergeFallback` المفتاح الغائب بالنص الإنجليزي، لذلك تمثل نمط
الفشل في واجهة مستخدم غير مترجمة بدلًا من واجهة مستخدم فارغة — وهو فشل حقيقي وصامت بحكم التصميم.

وكما هو الحال مع البوابة الشقيقة، فهي **مدركة للفروقات**، إذ تقارن الإنجليزية عند قاعدة الدمج مع شجرة
العمل، ولذلك تظل الفجوات الموجودة مسبقًا مجمّدة ولم تحتج البوابة إلى أي ترحيل لتفعيلها.

**لا تفي العلامة `__MISSING__:<english>` بالمتطلب (منذ 2026-09-17).** كانت سابقًا وسيلة التأجيل
الموثقة — إذ يعود وقت التشغيل إلى نص إنجليزي صحيح — إلى أن أضافت ثمانية طلبات سحب للميزات في
2026-09-16 عدد 61 مفتاحًا ووضعت العلامة في جميع اللغات المحلية الـ65 بدلًا من ترجمتها: قبلت
هذه البوابة كل واحد منها، ولم يمنع شيء طلبات السحب، ثم فشلت بوابة نسبة الترجمة الحقيقية الإلزامية
عند طرف الإصدار لدى الجميع (pt-BR 3.2 % > 2.5 % + 0.5). تُعامل العلامة الآن
كترجمة غائبة. أصلح الفشل باستخدام
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers --batch-size=40`، أو
نفّذ ذلك لجميع اللغات المحلية بالتوازي باستخدام `npm run i18n:translate-new-keys` (`scripts/i18n/translate-new-keys.sh`،
آمن في الوضع المنفصل، ويرفض البدء دون متغيرات البيئة `OMNIROUTE_TRANSLATION_*`). يجب وضع المفتاح الذي يلزم أن يبقى
بالإنجليزية (اسم منتج/محرك/علامة مثبّت) في `scripts/i18n/untranslatable-keys.json`،
وليس خلف علامة أبدًا. تحظر `vi` العلامات منعًا باتًا (`tests/unit/i18n-vi-completeness.test.ts`).

#### `check-vitest-exclusions` — بوابة الاختبارات المركونة

الملف الموجود في قائمة `exclude` ضمن `vitest.config.ts` هو اختبار لا يعمل، ومع ذلك يبدو
كتغطية لمن يقرأ الشجرة. تراكم اثنان وستون ملفًا خلف التعليق
`// #8618 — pre-existing failure; remove this exclusion when fixed`. أُغلقت المشكلة #8618 في
2026-08-11 بينما نمت القائمة التي كانت تتعقبها من 45 إدخالًا إلى 62، وكان كل إدخال جديد يرث تعليقًا
يشير إلى مشكلة منتهية. وعندما قِيست القائمة أخيرًا ملفًا تلو الآخر (#13204)، **نجح 51 من أصل 62
مقابل الشجرة الحالية دون أي تغيير في المصدر**.

تتطلب البوابة من كل استثناء يُحل إلى ملف حقيقي أن (أ) يذكر مشكلة تتبع، وأن
(ب) يظهر في `config/quality/vitest-exclusions.json` مع حالته المقاسة، بحيث تصبح إضافة أي استثناء
فرقًا قابلًا للمراجعة في ملف مخصص بدلًا من مجرد سطر آخر في مصفوفة تضم 60 إدخالًا. وهي تتعمد
عدم إعادة تشغيل الاختبارات المستثناة — إذ يستغرق ذلك ~10 دقائق وينتمي إلى مهمة دورية؛ ويسجل
المخزون وقت آخر قياس لكل منها.
