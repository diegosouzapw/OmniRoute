# Compression Engines (العربية)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_ENGINES.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_ENGINES.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇦 [bs](../../../bs/docs/compression/COMPRESSION_ENGINES.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_ENGINES.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_ENGINES.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_ENGINES.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_ENGINES.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_ENGINES.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_ENGINES.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_ENGINES.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_ENGINES.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_ENGINES.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_ENGINES.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_ENGINES.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_ENGINES.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_ENGINES.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_ENGINES.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_ENGINES.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_ENGINES.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_ENGINES.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_ENGINES.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_ENGINES.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_ENGINES.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_ENGINES.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_ENGINES.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_ENGINES.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_ENGINES.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_ENGINES.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_ENGINES.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_ENGINES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_ENGINES.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_ENGINES.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_ENGINES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_ENGINES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_ENGINES.md)

---

يعتمد ضغط OmniRoute على عقود المحركات. يمكن للوضع تشغيل محرك واحد مباشرةً
(`caveman` أو `rtk`) أو مسار معالجة تراكبي حتمي ينفّذ عدة محركات بالترتيب.

## الأوضاع

| الوضع        | مسار المحرك                                                                                      | الإدخال المقصود                                   |
| ------------ | ------------------------------------------------------------------------------------------------ | ------------------------------------------------- |
| `off`        | لا شيء                                                                                           | الحفاظ الدقيق على المطالبة                        |
| `lite`       | مساعدات Caveman الخفيفة                                                                          | تنقية منخفضة المخاطر تعمل دائمًا                  |
| `standard`   | Caveman                                                                                          | تكثيف مطالبات اللغة الطبيعية                      |
| `aggressive` | Caveman + ملخصات السجل/الأدوات                                                                   | جلسات المحادثة الطويلة                            |
| `ultra`      | Caveman + مساعدات التقليم                                                                        | التعافي من بلوغ حد السياق                         |
| `rtk`        | RTK                                                                                              | مخرجات الطرفية، والصدفة، والبناء، والاختبار، وgit |
| `omniglyph`  | OmniGlyph                                                                                        | السياق كصورة عبر واجهة المزوّد الأصلية            |
| `stacked`    | خط معالجة. الإعداد الافتراضي للطلب هو `session-dedup -> lite`. أما `rtk -> caveman` فهو اختياري. | سجلات أدوات ونصوص مختلطة، بأقصى توفير             |

### ملفات تعريف ضغط OmniGlyph

يقبل محرك `omniglyph` (الحزمة `omniglyph`، بالإصدار 1.4.0+) ملف تعريف دلاليًا مسمّى، يُضبط
عموميًا عبر `omniglyph.profile` في إعدادات الضغط، أو لكل خطوة عبر إعدادات خطوة
خط المعالجة المتراكم:

| ملف التعريف   | الحد                                                                                                    |
| ------------- | ------------------------------------------------------------------------------------------------------- |
| `aggressive`  | الافتراضي. السياسة التي قاستها الإيصالات المنشورة — يحوّل النظام، ووثائق الأدوات، والسجل الكثيف إلى صور |
| `balanced`    | يُبقي الحالة النشطة أصلية، ويحمي آخر 8 أدوار، ويختزل السجل المغلق الأقدم                                |
| `coding-safe` | يُبقي الصلاحيات، ومخططات الأدوات، ومخرجات الأدوات النشطة أصلية، ويحمي آخر 12 دورًا                      |
| `passthrough` | يمرّر دون تحويل؛ ويُتخطى المحرك                                                                         |

ملف التعريف هو **حد أقصى، وليس حدًا أدنى**: ترفض `mergeCompressionProfileOptions` في الحزمة
السماح لتجاوز من المستدعي بإعادة فتح مسار فقدي أغلقه ملف التعريف، ولذلك لا يمكن لإعداد
`preserveSystemPrompt: false` لكل خطوة إعادة تمكين ضغط النظام ضمن `coding-safe`.

وفقًا للقياسات على قاعدة الشيفرة هذه: يرفع `coding-safe` و`balanced` قيمة `minCompressChars` إلى
حدها الأقصى، ويُبقيان النظام، ومخططات الأدوات، ونتائج الأدوات أصلية، ولذلك فإن الجلسة التي لم
يتراكم فيها سجل بعد تتوقف عند `below_min_chars` ولا يحوّل المحرك أي شيء. لهذا السبب يكون
الإعداد الافتراضي هو `aggressive` بدلًا من ملف التعريف الأكثر أمانًا.

تحدّد الحزمة نطاق نموذجها وملف تعريفها من إعدادات بيئتها الخاصة. لا يفوّض OmniRoute هذا
القرار مطلقًا: يثبّت المهايئ بوابة النموذج على النطاق الأكثر تقييدًا في الحزمة، ولذلك لا يمكن
لإعدادات بيئة المضيف سوى تضييق قائمة السماح، ولا يمكنها توسيعها إلى ما بعد إيصالات OmniRoute
المقاسة.

## سجل المحركات

يوجد السجل في `open-sse/services/compression/engines/registry.ts`. تعرض المحركات عقدًا مشتركًا:

- `id`: معرّف ثابت للمحرك مثل `caveman` أو `rtk`
- `apply(text, config)`: مسار التنفيذ القديم الذي تستخدمه خطوط الأنابيب المكدّسة
- `compress(input, config)`: مسار التنفيذ الأساسي الذي يُرجع النص + الإحصاءات
- `getConfigSchema()`: يُرجع البنية الشبيهة بـ JSON Schema للإعدادات الصالحة
- `validateConfig(config)`: يُرجع `{ valid, errors[] }`

يستخدم التسجيل `registerCompressionEngine(engine)` (أو `registerEngine` للحالات المتقدمة)،
الذي يستدعي `assertValidEngine()` و`validateConfig(defaultConfig)` قبل القبول.
استخدم `unregisterCompressionEngine(id)` لإزالة محرك في وقت التشغيل.

يسجّل `strategySelector.ts` المحركات المضمّنة قبل تشغيل الضغط. يتيح ذلك للمعاينة،
والضغط في وقت التشغيل، والوضع المكدّس، والاختبارات، والمحركات المستقبلية استخدام مسار التنفيذ نفسه.

### ضغط أوصاف MCP (ذو صلة)

يضغط سجل منفصل بيانات التعريف الخاصة بأوصاف أدوات MCP على مستوى السجل — راجع
`open-sse/mcp-server/descriptionCompressor.ts` و[MCP-SERVER.md](../frameworks/MCP-SERVER.md). وهو يعيد استخدام
قواعد Caveman، لكنه يعمل على بيانات تعريف الأدوات، وليس على حمولات الطلبات.

### محركات مضمّنة إضافية

إلى جانب Caveman وRTK وLLMLingua-2، يتضمن السجل عدة محركات متخصصة عديمة الفقدان /
بنيوية (تستخدمها خطوط الأنابيب المكدّسة، وبيئة التجربة، والاختبارات):

| المحرك        | المعرّف         | وظيفته                                                                                                                                                                  |
| ------------- | --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CCR           | `ccr`           | الضغط-الاسترجاع المعتمد على المحتوى (H4): يستبدل كتل النص الكبيرة المتجاورة بمراجع معنونة بالمحتوى، بحيث تُرسل الكتل المتكررة/الكبيرة مرة واحدة ثم يُشار إليها بعد ذلك. |
| headroom      | `headroom`      | SmartCrusher (H3 + N5): ضغط جدولي ذكي عديم الفقدان لحمولات مصفوفات JSON المتجانسة إلى صيغة عمودية `[N rows]`.                                                           |
| ionizer       | `ionizer`       | أخذ عينات من صفوف البداية/الوسط/النهاية للكتل المتجانسة الكبيرة جدًا، مع تخزين الجزء الأوسط المحذوف كمرجع CCR معنون بالمحتوى.                                           |
| session-dedup | `session-dedup` | إزالة التكرار عبر الأدوار بالعنونة وفق المحتوى (مستوحاة من TokenMizer): تحذف النص الذي سبق ظهوره في أدوار سابقة من الجلسة نفسها.                                        |

**تعليمة بروتوكول الاسترجاع لـ CCR (#8033):** في المرة الأولى التي يستبدل فيها CCR كتلة واحدة أو أكثر في
طلب، يضيف المحرك في البداية رسالة `system` واحدة متكررة التنفيذ بأمان (تبدأ بالعلامة الحارسة
`[CCR protocol]`) لتعليم المستدعي عقد العلامة ← الأداة: ما تعنيه علامة
`[CCR retrieve hash=<24hex> chars=N]`، وأنه يجب نسخ التجزئة حرفيًا
(جميع المحارف السداسية العشرية الـ24 — ويُرجّح أن تكون التجزئات المنسوخة بشكل خاطئ سبب حالات
"تعذّر العثور على الكتلة")، وأن علامة `[dedup:ref sha=...]` تعني "ارجع إلى السجل"، وليس "استدعِ
الأداة". لا تُحقن الملاحظة **إلا عندما تثبت `tools[]` المُعلن عنها من المستدعي أنه يستطيع
فعليًا الوصول إلى `omniroute_ccr_retrieve`** (`callerSupportsCcrRetrieve()` في
`open-sse/services/compression/engines/ccr/protocolInstruction.ts`) — أما المستدعي العادي
المتوافق مع OpenAI الذي لا يملك تلك الأداة، فلا يتلقى أبدًا تعليمة لاستدعاء شيء لا يمكنه
الوصول إليه. ويُفرض تكرار التنفيذ الآمن عبر فحص سجل الرسائل بحثًا عن العلامة الحارسة
قبل الحقن، وبذلك لا تكدّس الطلبات متعددة الأدوار (التي تعيد تشغيل الرسائل السابقة)
الملاحظة مرةً لكل دور.

## Caveman

يركّز وضع Caveman على التكثيف الدلالي للنثر العادي:

- يحافظ على كتل الشيفرة وعناوين URL وJSON والمسارات والبيانات المنظّمة
- يزيل الحشو والتحفّظ والسياق المتكرر والعبارات الرابطة المطوّلة
- يدعم حزم قواعد الملفات المدركة للغة في `open-sse/services/compression/rules/`
- يظل متاحًا من خلال الأوضاع القديمة `standard` و`aggressive` و`ultra`

مسار الوصول في لوحة التحكم هو `Dashboard -> Context & Cache -> Caveman`.

تفيد تقارير Caveman الأصلية بانخفاض رموز الإخراج بنسبة `~75%`، ومتوسط توفير في الإخراج بنسبة `65%` في الاختبارات المعيارية
ضمن نطاق `22-87%`، وبأداة لضغط الإدخال بنسبة `~46%`. تستخدم OmniRoute الرقم الخاص بجانب الإدخال في Caveman
عند توثيق وفورات المطالبات/السياق المكدّسة؛ ويظل وضع إخراج Caveman ميزة منفصلة
لسلوك الاستجابة.

## RTK

يركّز وضع RTK على مخرجات الأوامر والأدوات:

- يكتشف فئات المخرجات مثل `git status` و`git branch` و`git diff` وVitest/Jest/Pytest،
  واختبارات Cargo/Go، وعمليات بناء TypeScript/Vite/Webpack، وESLint، وعمليات تدقيق/تثبيت npm، وسجلات Docker،
  وأوامر الصدفة `find`/`grep`، وتتبعات المكدس، والسجلات العامة
- يطبّق 49 عامل تصفية JSON من `open-sse/services/compression/engines/rtk/filters/`
- يدعم خط المعالجة التصريحي بأسلوب RTK: إزالة ANSI، والاستبدال، والاختصار المبكر عند مطابقة المخرجات،
  وإزالة/الاحتفاظ بالأسطر، والاقتطاع لكل سطر، واقتطاع البداية/النهاية/الحد الأقصى للأسطر، والرجوع الاحتياطي عند الفراغ
- يدعم عوامل تصفية المشروع المقيّدة بالثقة في `.rtk/filters.json` وعوامل التصفية العامة في
  `DATA_DIR/rtk/filters.json`
- يزيل تسلسلات ANSI وضوضاء التقدم والأسطر المتكررة والنصوص النمطية غير المفيدة
- يحافظ على الإخفاقات القابلة للمعالجة والتحذيرات والملخصات والملفات المتغيرة وسياق النهاية
- يمكنه اختياريًا الاحتفاظ بالمخرجات الخام المنقّحة للاسترداد/التصحيح عبر مسارات إدارة
  موثّقة

مسار الوصول في لوحة التحكم هو `Dashboard -> Context & Cache -> RTK`.

توجد التفاصيل التشغيلية لعوامل التصفية المخصصة والثقة والتحقق واسترداد المخرجات الخام في
[`RTK_COMPRESSION.md`](./RTK_COMPRESSION.md).

تفيد تقارير RTK الأصلية بتوفير `60-90%` عند ضغط مخرجات الأوامر. ويوضح مثال README الخاص به
انخفاض جلسة Claude Code مدتها 30 دقيقة من `~118,000` رمز إلى `~23,900`، أي توفير بنسبة `79.7%`.

## LLMLingua-2 (التقليم الدلالي)

ينفّذ وضع LLMLingua-2 **تقليمًا دلاليًا للرموز** على النثر باستخدام مصنّف رموز ONNX
صغير، مكمّلًا محركي Caveman وRTK القائمين على القواعد:

- يضغط النثر في الرسائل غير التابعة للنظام فقط؛ ولا يغيّر مطلقًا كتل الشيفرة المسيّجة والبُنى الأخرى
  المحفوظة
- يشغّل الواجهة الخلفية `@atjsh/llmlingua-2` ‏(ONNX عبر `@huggingface/transformers`) في
  خيط عامل، بحيث لا يحظر استدلال النموذج مطلقًا حلقة أحداث الطلب
- **قابل للتكديس** (`stackPriority` 35): يعمل في خط معالجة مكدّس بعد
  المحركات البنيوية (CCR وsession-dedup وheadroom وCaveman)، ولكن قبل `ultra`، لأن
  التقليم الدلالي يكون أكثر فاعلية على النص المضغوط بنيويًا مسبقًا — مثل
  `rtk -> caveman -> llmlingua`
- **يتجاوز أي خطأ بأمان** (فقدان التبعيات الاختيارية، أو إنشاء العامل، أو تحميل النموذج، أو الاستدلال،
  أو انتهاء المهلة) ← يُعاد النص الأصلي دون تغيير، وليس خطأً مطلقًا

موقع المحرك: `open-sse/services/compression/engines/llmlingua/`. ومسار الوصول في لوحة التحكم
هو `Dashboard -> Context & Cache -> LLMLingua`.

### النماذج

النموذج الافتراضي هو **TinyBERT** ‏(`atjsh/llmlingua-2-js-tinybert-meetingbank`، بحجم ~57 MB،
وسريع). يتوفر نموذج **BERT-base** أعلى دقة (`Arcoldd/llmlingua4j-bert-base-onnx`،
بحجم ~710 MB) عبر حقل `model` في إعدادات المحرك. تنزّل `@huggingface/transformers`
النموذج المحدد عند الحاجة من HuggingFace Hub إلى
`${DATA_DIR}/models/llmlingua` عند أول استدعاء (`modelStore.ts`)؛ ويمكن بدلًا من ذلك استخدام تجاوز الإعداد
`modelPath` لتوجيهه إلى نسخة محلية (لعمليات التثبيت غير المتصلة / المعزولة شبكيًا).

### التبعيات الاختيارية والتثبيت عند الطلب

تُعد حزمة تبعيات النظير لبيئة تشغيل LLMLingua القابلة للاستبعاد **اختيارية**. تُعلَن حزمتان بوصفهما
`optionalDependencies` في `package.json` وتُتركان **خارجيتين** في بناء الإنتاج
(`scripts/build/prepublish.ts` لا يضمّنهما في الحزمة):

| الحزمة               | الإصدار (المثبّت) | ملاحظات                                       |
| -------------------- | ----------------- | --------------------------------------------- |
| `@atjsh/llmlingua-2` | `2.0.5`           | حزمة الإدخال؛ تعلن الحزم الأخرى كتبعيات نظيرة |
| `js-tiktoken`        | `^1.0.20`         | مُجزّئ الرموز                                 |

ثُبّت `@huggingface/transformers` عند `^4.2.0` (وهو مشترك مع مسار التضمينات المحلي
ويُضمَّن تتبعه أيضًا في الحزمة المستقلة)؛ ويعتمد `@atjsh/llmlingua-2@2.0.5` عليه كتابع نظير بالإصدار
`"^3.5.2 || ^4.0.0"`، ولذلك يُدعَم كل من Transformers.js v3 وv4. منذ الإصدار 2.0.4،
لم يعد `@atjsh/llmlingua-2` يتطلب `@tensorflow/tfjs`، ما أزال أكبر مكوّن منفرد
(TensorFlow.js) من حزمة SLM. الحزمتان المذكورتان أعلاه فقط هما تبعيتا SLM النظيرتان
القابلتان للاستبعاد. يؤدي تنفيذ `npm install` قياسي (للتطوير) إلى تثبيت الحزمة الاختيارية تلقائيًا ما لم تُحذف
التبعيات الاختيارية.

**سبب التثبيت عند الطلب:** تُشحن الحزمة المنشورة على npm والحزمة المستقلة وصورة Docker
**من دون** هذه التبعيات للحفاظ على صغر الحجم. عند غيابها، يفشل حاجز تبعيات العامل
(اختبار استبانة `@atjsh/llmlingua-2` في `worker.ts`)، و**يتجاوز المحرك الفشل بصمت** — فيصبح تحديد LLMLingua عملية بلا تأثير (يُعاد النص دون تغيير، ولا
يُسجّل أي خطأ). لتفعيله في بيئة جرى استبعاد التبعيات منها، ثبّت الحزمة الاختيارية:

```bash
# ثبّت الإصدارات المعلنة في package.json optionalDependencies
npm install @atjsh/llmlingua-2@2.0.5 js-tiktoken
```

تؤدي إزالة `@tensorflow/tfjs` ‏(2.0.4+) إلى التخلص من المكوّن الذي كان مهيمنًا سابقًا بحجم ~800 MB
— وتقتصر المساحة المتبقية على بيئات تشغيل transformers.js وonnxruntime-node،
بالإضافة إلى نموذج TinyBERT ‏(~57 MB) الذي يُنزَّل عند أول استخدام (وليس عبر npm).

لكل بيئة:

- **التطوير / `npm install`** — تُثبَّت تلقائيًا ما لم تمرّر `--omit=optional`
  (أو `--no-optional`). لا يلزم اتخاذ أي إجراء.
- **npm العام (`npm i -g omniroute`) / التثبيت المستقل** — شغّل أمر التثبيت أعلاه داخل
  دليل الحزمة المثبّتة، أو أعد التثبيت دون استبعاد التبعيات الاختيارية.
- **Docker** — أضف أمر التثبيت في طبقة صورة مشتقة؛ فالصورة المنشورة
  تأتي مصغّرة حسب التصميم.
- **VPS ‏(PM2)** — ثبّت داخل `node_modules` الخاص بالتطبيق، ثم أعد تشغيل العملية لكي
  يعيد العامل فحص البوابة.
- **نسخة Next المستقلة الخام (`npm run build` → `.build/next/standalone/server.js`)** — لا يتضمن
  تتبّع النسخة المستقلة العامل ولا التبعيات الاختيارية، لذلك يتجاوز المحرك القيود بصمت
  عند الفشل. يعيد `scripts/build/colocate-standalone.mjs` تطبيق كليهما (بناء العامل عبر esbuild +
  وإغلاق التبعيات الاختيارية داخل شجرة النسخة المستقلة)؛ ويعمل تلقائيًا عبر خطاف npm
  المسمى `postbuild` بعد كل عملية بناء. قابل لإعادة التشغيل دون آثار جانبية، ويتعامل بمرونة مع الفشل عند غياب التبعيات.

**تحقّق من أنه نشط:** عند تحديد LLMLingua، يتقلّص النص النثري الفعلي بالفعل (إذ يتوقف المحرك
عن تجاوز القيود عند الفشل)، ويؤدي الطلب الأول إلى تنزيل النموذج داخل
`${DATA_DIR}/models/llmlingua`. تتعمّد البوابة فحص `@atjsh/llmlingua-2` فقط —
فالحزم النظيرة الأخرى مخصّصة لـ ESM فقط، ويطرح `require.resolve` خطأً عند فحصها حتى عندما تكون موجودة — لذلك
يظل العامل متجاوزًا للقيود عند الفشل إذا كانت أي حزمة نظيرة مفقودة بالفعل وقت تنفيذ `import()`.

## خطوط الأنابيب المكدّسة

يشغّل الوضع المكدّس خطوات خط الأنابيب بالترتيب. الترتيب الافتراضي هو:

```txt
rtk -> caveman
```

استخدم هذا لجلسات وكلاء البرمجة التي تجمع فيها المطالبة بين مخرجات الأوامر والنص النثري البشري أو الصادر عن المساعد. يقلّل RTK أولًا من سجلات الأدوات المليئة بالضوضاء، ثم يضغط Caveman ما تبقّى من اللغة الطبيعية.

تُضبط خطوات خط الأنابيب باستخدام `stackedPipeline` في إعدادات الضغط أو من خلال توليفات الضغط.

عندما يقلّل كلا المحرّكين الحمولة المؤهلة نفسها، تتراكم الوفورات:

```txt
combined = 1 - (1 - RTK savings) * (1 - Caveman input savings)
average  = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
range    = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

## مرشح شجرة إمكانية الوصول في MCP

مرشح شجرة إمكانية الوصول الذكي في MCP هو طبقة ضغط لاحقة للتنفيذ تعمل على **نتائج الأدوات** في MCP، وليس على المطالبات أو السياق. ويستهدف حمولات شجرة إمكانية الوصول ولقطات المتصفح المطوّلة التي تُرجعها أدوات مثل Playwright وcomputer-use وخوادم MCP لأتمتة المتصفح.

### ما الذي يفعله

1. **إزالة الضوضاء** — يزيل إدخالات العناصر العامة/النصية الفارغة (`- generic:` و`- text: ""`)
2. **طيّ العناصر المتجاورة** — عند وجود ≥ `collapseThreshold` (القيمة الافتراضية 30) سطرًا متتاليًا من التكرارات البنيوية، يطويها إلى أول `collapseKeepHead` (القيمة الافتراضية 10) أسطر + ملخص للعدد + آخر `collapseKeepTail` (القيمة الافتراضية 5) أسطر
3. **الحفاظ على المراجع** — لا يتم أبدًا المساس بمرتكزات `[ref=eXX]` المطلوبة بواسطة Playwright وcomputer-use
4. **الاقتطاع الصارم** — إذا ظل النص بعد الطيّ يتجاوز `maxTextChars` (القيمة الافتراضية 50,000)، يُقتطع مع تلميح للتنقل كي يتمكن الوكيل من متابعة العمل

### موقع المحرّك

```txt
open-sse/services/compression/engines/mcpAccessibility/
  index.ts            ← smartFilterText() entry point
  collapseRepeated.ts ← sibling-collapse algorithm
  constants.ts        ← DEFAULT_MCP_ACCESSIBILITY_CONFIG
```

### الإعداد

تتحكم `compression.mcpAccessibility` في الإعدادات العامة (الترحيل 056). الإعداد الافتراضي:

```json
{
  "enabled": true,
  "maxTextChars": 50000,
  "collapseThreshold": 30,
  "collapseKeepHead": 10,
  "collapseKeepTail": 5,
  "minLengthToProcess": 2000
}
```

لا يُطبّق المرشح إلا على حمولات نتائج الأدوات التي تكون قيمة `type` فيها هي `"text"` ويتجاوز طولها `minLengthToProcess`. ولا يؤثر في ضغط المطالبات أو حمولات الطلبات.

### الوفورات المتوقعة

60–80% في نتائج أدوات لقطات المتصفح، اعتمادًا على تعقيد الصفحة. تعمل خوارزمية الطيّ بتعقيد O(n) بالنسبة إلى عدد الأسطر، ولا تضيف سوى زمن انتقال ضئيل.

### مقارنة هذا المرشح بمحرّكات الضغط أعلاه

| الجانب          | Caveman / RTK / المكدّس  | مرشح إمكانية الوصول في MCP             |
| --------------- | ------------------------ | -------------------------------------- |
| الهدف           | مطالبات الطلبات / السياق | نتائج أدوات MCP                        |
| المشغّل         | إعداد وضع الضغط          | `compression.mcpAccessibility.enabled` |
| النطاق          | جميع رسائل SSE           | نتائج الأدوات فقط                      |
| مرتكزات المراجع | لا ينطبق                 | يُحافظ عليها دون قيد أو شرط            |

---

## تركيبات الضغط

تركيبات الضغط هي ملفات تعريف ضغط مُسمّاة يمكن إسنادها إلى تركيبات التوجيه:

- `compression_combos`: يخزّن الوضع وخط الأنابيب وإعدادات RTK وإعدادات اللغة وعلامة الإعداد الافتراضي
- `compression_combo_assignments`: يربط تركيبة ضغط بتركيبة توجيه
- يحلّ التكامل في وقت التشغيل تركيبة الضغط المُسنَدة قبل عمليات التجاوز العامة للتركيبات
- تتضمن التحليلات `compression_combo_id` و`engine`

موضعها في لوحة المعلومات: `Dashboard -> Context & Cache -> Compression Combos`.

## واجهة API

| المسار                                 | الغرض                                                   |
| -------------------------------------- | ------------------------------------------------------- |
| `/api/settings/compression`            | إعدادات الضغط العامة (تتضمن إعدادات `mcpAccessibility`) |
| `/api/compression/preview`             | معاينة أي وضع ضغط                                       |
| `/api/compression/language-packs`      | سرد حزم لغات Caveman المتاحة                            |
| `/api/context/caveman/config`          | اسم مستعار لإعدادات Caveman                             |
| `/api/context/rtk/config`              | إعدادات RTK الافتراضية وإعداداته                        |
| `/api/context/rtk/filters`             | فهرس مرشحات RTK                                         |
| `/api/context/rtk/test`                | نقطة نهاية معاينة/اختبار RTK                            |
| `/api/context/rtk/raw-output/[id]`     | استعادة المخرجات الأولية المنقّحة مع المصادقة           |
| `/api/context/combos`                  | عمليات CRUD لتركيبات الضغط                              |
| `/api/context/combos/[id]/assignments` | عمليات CRUD لإسناد تركيبات التوجيه                      |
| `/api/context/analytics`               | اسم مستعار لتحليلات الضغط                               |

تتطلب مسارات الإدارة مصادقة إدارية أو عمليات تحقق من سياسة مفتاح API.

## أدوات MCP

يوفّر الضغط خمس أدوات MCP:

| الأداة                              | النطاق              | الغرض                                              |
| ----------------------------------- | ------------------- | -------------------------------------------------- |
| `omniroute_compression_status`      | `read:compression`  | الإعدادات والتحليلات وإحصاءات ذاكرة التخزين المؤقت |
| `omniroute_compression_configure`   | `write:compression` | تحديث الإعدادات العامة                             |
| `omniroute_set_compression_engine`  | `write:compression` | تعيين الوضع وخط الأنابيب الاختياري                 |
| `omniroute_list_compression_combos` | `read:compression`  | سرد تركيبات الضغط                                  |
| `omniroute_compression_combo_stats` | `read:compression`  | قراءة تحليلات التركيبات/المحرّكات                  |

## النطاق والاستثناءات

**لا يتم ضغط التضمينات مطلقًا.** لا يستدعي `open-sse/handlers/embeddings.ts` أي
محرّك ضغط — تمر أجسام الطلبات/الاستجابات مباشرةً إلى المنفّذ دون تعديل.
هذا الأمر هيكلي حاليًا (معالجات التضمينات وإكمالات المحادثة منفصلة)، وليس
تحققًا في وقت التشغيل، لكنه يعني أن المخاوف المتعلقة بتشويه المتجهات في #8034 ليس لها أي سطح تعرّض
في مسار التضمينات.

**مرشح الاستثناء لكل نموذج/نقطة نهاية (#8034).** بالنسبة إلى إكمالات المحادثة، يمكن للمشغّل تحديد
معرّفات النماذج / أهداف `provider/model` التي يجب عدم ضغطها مطلقًا — وهو إجراء وقائي مفيد إذا
جرى لاحقًا توصيل الضغط بالقرب من مسار مجاور للتضمينات، ومفيد عمومًا
لأي نموذج تكون فيه المطالبة المتطابقة بايتًا ببايت مهمة (التقييمات الحتمية، والبادئات الحساسة
لذاكرة التخزين المؤقت، وما إلى ذلك).

- حقل الإعدادات: `exclusions?: string[]` في إعدادات الضغط العامة
  (`GET`/`PUT /api/settings/compression`)، ويُحفَظ عبر نطاق الضغط الحالي `key_value`
  (`src/lib/db/compression.ts`) — من دون جدول جديد.
- تبويب لوحة المعلومات: **Dashboard → Compression → Exclusions**
  (`/dashboard/compression/exclusions`).
- صيغة الأنماط: `*` هي حرف البدل الوحيد. يُهرَّب كل حرف وصفي آخر للتعبيرات النمطية في النمط
  قبل المطابقة، ولذلك يطابق `gpt-5.6` السلسلة الحرفية فقط، ولا يطابق أبدًا `gpt-5x6`
  (آمن من ReDoS، ومحدود، ومن دون محددات كمية متداخلة). تُطابَق الأنماط دون حساسية لحالة الأحرف
  مقابل كل من معرّف النموذج المجرّد والتركيب `provider/model` — تعمل جميع الأنماط `gpt-5-6` و`openai/gpt-5-6`
  و`openai/*`، كما أن `*` وحدها تستثني كل نموذج.
- المطابقة: `isCompressionExcluded()` / `normalizeCompressionExclusions()` في
  `open-sse/services/compression/exclusions.ts`. يتحقق `chatCore.ts` من الهدف المستثنى
  مباشرةً بعد تحديد إعدادات الضغط، **قبل تشغيل أي محرّك**، ويتعامل مع التطابق
  تمامًا كما لو كان الضغط معطّلًا على مستوى النظام — إذ يظل جسم الطلب مطابقًا
  على نحو قابل للإثبات بايتًا ببايت. يُسجَّل التخطي عبر `writeCompressionSkip(..., "excluded")` لإظهاره
  في التحليلات.
- الإعداد الافتراضي (قائمة فارغة/غائبة): مطابق للسلوك السابق لـ#8034 — لا يُستثنى أي شيء.

## القيود المعروفة

- **يتطلب LLMLingua-2 (SLM) تبعيات اختيارية موضوعة في الموقع نفسه.** لا يعمل العامل في
  إصدار إنتاجي إلا عندما تكون `@atjsh/llmlingua-2` + تبعيات الأقران موضوعة معًا في
  `dist/node_modules` (راجع `scripts/build/colocateOptionals.mjs`، #4286). ومن دونها
  يفشل المحرك بوضعٍ مفتوح (ويُرجع النص الأصلي). لم يعد حلّ مسار العامل يعتمد على
  `import.meta.url` (إذ يتعطل في الحزمة المستقلة) — بل يرتكز على دليل العمل الحالي وقت التشغيل
  / `argv[1]`.
- **حزم لغات Caveman‏ `de` / `fr` / `ja` جزئية.** فهي تتضمن قواعد `context` +
  `filler` + `structural` ولكن من دون حزم `dedup` / `ultra`، لذا فإن شدة `ultra` ليست
  أقوى من `full` لهذه اللغات (فهي تستخدم قواعدها الخاصة فقط — ولا يوجد رجوع
  ضمني إلى قواعد `dedup`/`ultra` الإنجليزية، إذ سيؤدي ذلك إلى تشويه النص الأجنبي).
  أما `en` / `es` / `id` / `pt-BR` فهي مكتملة. نرحب بالمساهمات التي تضيف `dedup.json` + `ultra.json`
  للحزم الجزئية.
- **لا يسرد القياس عن بُعد المتراكم إلا المحركات التي أجرت ضغطًا.** تُرجع خطوة في خط أنابيب متراكم
  شُغّل محركها لكنه حقق توفيرًا بنسبة 0 % القيمة `stats:null`، ولذلك لا تظهر في
  `engineBreakdown` — ولا يمكن تمييزها عن خطوة جرى تخطيها. وسيتطلب التمييز
  بين «تم التشغيل، 0 %» و«تم التخطي» تغييرًا في نموذج التقسيم، ولذلك أُجّل.

## التحقق

بوابات التحقق المركّزة لهذا المجال هي:

```bash
node --import tsx/esm --test tests/unit/compression/rtk-*.test.ts tests/unit/compression/pipeline-integration.test.ts tests/unit/compression/context-compression-api.test.ts
node --import tsx/esm --test tests/unit/compression/*.test.ts tests/golden-set/*.test.ts tests/integration/compression-pipeline.test.ts tests/unit/api/compression/compression-api.test.ts
node --import tsx/esm --test tests/unit/compression/mcpAccessibility*.test.ts
npm run typecheck:core
```
