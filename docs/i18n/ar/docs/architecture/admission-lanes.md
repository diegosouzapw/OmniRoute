# Admission lanes (#9654) — two lane systems, what gates each, where each reports (العربية)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/admission-lanes.md) · 🇪🇹 [am](../../../am/docs/architecture/admission-lanes.md) · 🇦🇿 [az](../../../az/docs/architecture/admission-lanes.md) · 🇧🇬 [bg](../../../bg/docs/architecture/admission-lanes.md) · 🇧🇩 [bn](../../../bn/docs/architecture/admission-lanes.md) · 🇧🇦 [bs](../../../bs/docs/architecture/admission-lanes.md) · 🇨🇿 [cs](../../../cs/docs/architecture/admission-lanes.md) · 🇩🇰 [da](../../../da/docs/architecture/admission-lanes.md) · 🇩🇪 [de](../../../de/docs/architecture/admission-lanes.md) · 🇬🇷 [el](../../../el/docs/architecture/admission-lanes.md) · 🇪🇸 [es](../../../es/docs/architecture/admission-lanes.md) · 🇪🇪 [et](../../../et/docs/architecture/admission-lanes.md) · 🇮🇷 [fa](../../../fa/docs/architecture/admission-lanes.md) · 🇫🇮 [fi](../../../fi/docs/architecture/admission-lanes.md) · 🇫🇷 [fr](../../../fr/docs/architecture/admission-lanes.md) · 🇮🇪 [ga](../../../ga/docs/architecture/admission-lanes.md) · 🇮🇳 [gu](../../../gu/docs/architecture/admission-lanes.md) · 🇳🇬 [ha](../../../ha/docs/architecture/admission-lanes.md) · 🇮🇱 [he](../../../he/docs/architecture/admission-lanes.md) · 🇮🇳 [hi](../../../hi/docs/architecture/admission-lanes.md) · 🇭🇷 [hr](../../../hr/docs/architecture/admission-lanes.md) · 🇭🇺 [hu](../../../hu/docs/architecture/admission-lanes.md) · 🇦🇲 [hy](../../../hy/docs/architecture/admission-lanes.md) · 🇮🇩 [id](../../../id/docs/architecture/admission-lanes.md) · 🇳🇬 [ig](../../../ig/docs/architecture/admission-lanes.md) · 🇮🇹 [it](../../../it/docs/architecture/admission-lanes.md) · 🇯🇵 [ja](../../../ja/docs/architecture/admission-lanes.md) · 🇬🇪 [ka](../../../ka/docs/architecture/admission-lanes.md) · 🇰🇭 [km](../../../km/docs/architecture/admission-lanes.md) · 🇮🇳 [kn](../../../kn/docs/architecture/admission-lanes.md) · 🇰🇷 [ko](../../../ko/docs/architecture/admission-lanes.md) · 🇱🇹 [lt](../../../lt/docs/architecture/admission-lanes.md) · 🇱🇻 [lv](../../../lv/docs/architecture/admission-lanes.md) · 🇮🇳 [ml](../../../ml/docs/architecture/admission-lanes.md) · 🇮🇳 [mr](../../../mr/docs/architecture/admission-lanes.md) · 🇲🇾 [ms](../../../ms/docs/architecture/admission-lanes.md) · 🇲🇹 [mt](../../../mt/docs/architecture/admission-lanes.md) · 🇲🇲 [my](../../../my/docs/architecture/admission-lanes.md) · 🇳🇵 [ne](../../../ne/docs/architecture/admission-lanes.md) · 🇳🇱 [nl](../../../nl/docs/architecture/admission-lanes.md) · 🇳🇴 [no](../../../no/docs/architecture/admission-lanes.md) · 🇮🇳 [or](../../../or/docs/architecture/admission-lanes.md) · 🇮🇳 [pa](../../../pa/docs/architecture/admission-lanes.md) · 🇵🇭 [phi](../../../phi/docs/architecture/admission-lanes.md) · 🇵🇱 [pl](../../../pl/docs/architecture/admission-lanes.md) · 🇵🇹 [pt](../../../pt/docs/architecture/admission-lanes.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/admission-lanes.md) · 🇷🇴 [ro](../../../ro/docs/architecture/admission-lanes.md) · 🇷🇺 [ru](../../../ru/docs/architecture/admission-lanes.md) · 🇱🇰 [si](../../../si/docs/architecture/admission-lanes.md) · 🇸🇰 [sk](../../../sk/docs/architecture/admission-lanes.md) · 🇸🇮 [sl](../../../sl/docs/architecture/admission-lanes.md) · 🇷🇸 [sr](../../../sr/docs/architecture/admission-lanes.md) · 🇸🇪 [sv](../../../sv/docs/architecture/admission-lanes.md) · 🇰🇪 [sw](../../../sw/docs/architecture/admission-lanes.md) · 🇮🇳 [ta](../../../ta/docs/architecture/admission-lanes.md) · 🇮🇳 [te](../../../te/docs/architecture/admission-lanes.md) · 🇹🇭 [th](../../../th/docs/architecture/admission-lanes.md) · 🇹🇷 [tr](../../../tr/docs/architecture/admission-lanes.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/admission-lanes.md) · 🇵🇰 [ur](../../../ur/docs/architecture/admission-lanes.md) · 🇺🇿 [uz](../../../uz/docs/architecture/admission-lanes.md) · 🇻🇳 [vi](../../../vi/docs/architecture/admission-lanes.md) · 🇳🇬 [yo](../../../yo/docs/architecture/admission-lanes.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/admission-lanes.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/admission-lanes.md)

---

لدى OmniRoute نظامان **اثنان** للمسارات محليان داخل العملية، ولكل منهما نطاق مختلف. وهما
متكاملان؛ وينبغي للمشغّلين معرفة أيّهما ينظرون إليه.

## 1. القبول على مستوى البايت للعملية بأكملها (`chatBodyAdmission.ts`)

- **النطاق:** مسار نص الطلب المخزّن مؤقتًا/الذاكرة الديناميكية لطلبات `POST /v1/chat/completions`،
  و`/v1/messages`، و`/v1/responses`، والمسارات الأخرى المشابهة للدردشة. يحمي
  من تضخيم استخدام الذاكرة الديناميكية الناتج عن نصوص طلبات وكلاء البرمجة الكبيرة (#4380).
- **متحكّم عام واحد لكل العملية، وليس مسارات منفصلة لكل مفتاح (#10110).** تُقبل كل جلسة
  مرتبطة بمفتاح API (مُجزّأ) أو جلسة `anonymous` ضمن **الميزانية** المشتركة نفسها —
  ولا يُستخدم معرّف الجلسة المُجزّأ إلا كمفتاح لجدولة عادلة (توزيع دوري
  بين المنتظرين)، ولا يُستخدم مطلقًا لتقسيم السعة. وصفت نسخة سابقة من هذا
  المستند مسارات منفصلة لكل مفتاح بسعات مستقلة؛ وقد أُزيل ذلك النموذج
  في #10110 لأنه كان يسمح لبيانات الاعتماد الوهمية غير الموثّقة بمضاعفة
  الحد على مستوى العملية بأكملها.
- **البوابة (#503-fanout): ميزانية إدخال بالبايت مشتقة تلقائيًا، وليست عددًا ثابتًا
  من الطلبات.** كان الحد القديم لعدد الطلبات `CHAT_MAX_HEAVY_IN_FLIGHT` (القيمة الافتراضية `1`
  قبل هذا الإصلاح) يخفض تفرّع وكلاء البرمجة (عدة وكلاء فرعيين/واجهات CLI،
  مع نصوص طلبات تتجاوز عادةً 256 KB) إلى تزامن فعلي يبلغ نحو 1، ما كان يؤدي إلى
  إرجاع 503 في ظل حمل طبيعي تمامًا. ولم يعد هذا الحد مُلزمًا إلا عندما يضبطه المشغّل صراحةً
  عبر `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT`. وعند تركه دون ضبط، يُتحكم في القبول بدلًا من ذلك
  بواسطة `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — وهي ميزانية مشتقة تلقائيًا من
  الحد الفعلي لذاكرة العملية (`src/shared/middleware/admissionBudget.ts`):
  25% من الحد الأكثر تقييدًا بين حد ذاكرة V8 وأي حد خاص بـ cgroup/الحاوية،
  مقسومًا على معامل تضخيم مؤقت قدره 8x، ومقيّدًا بين 8 MiB و
  2 GiB. تستخدم التجاوزات الصريحة القيود نفسها. وبذلك تتكيّف الميزانية تلقائيًا من
  حاوية بسعة 512 MB إلى حاسوب مكتبي بسعة 32 GB دون أي ضبط لمتغيرات البيئة. يفشل فورًا أي نص طلب
  لا يمكن احتواؤه ضمن الميزانية الفعلية مع `413 body_exceeds_budget`؛
  ولا تدخل قائمة انتظار العدالة المحدودة إلا حالات التنافس بين نصوص الطلبات التي يمكن خدمتها
  كلٌّ على حدة. ويعمل متتبّع مباشر لضغط الموارد متعدد الإشارات (نسبة ذاكرة V8 الديناميكية،
  وcgroup، وPSI، وأحداث OOM — `open-sse/utils/resourcePressurePolicy.ts`) على تقصير
  مدة الانتظار المحدودة تحت ضغط `high`، وإسقاط الطلبات فورًا مع
  `503 resource_pressure` تحت ضغط `critical`، قبل إدخال أي بايتات أصلًا.
  تُقرأ PSI من `memory.pressure` الخاصة بـ cgroup لهذه الوحدة عند وجودها
  (`open-sse/utils/resourcePressureSampler.ts`)؛ أما `/proc/pressure/memory` فهي
  على مستوى المضيف بالكامل، ولا تُستخدم إلا كخيار احتياطي على الأجهزة الفعلية / cgroup v1، بحيث لا
  يمكن لمضيف يستخدم التبديل أن يتسبب في إرجاع 503 من حاوية خاملة.
- **الضبط:**
  - `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — تجاوز لميزانية البايت المشتقة تلقائيًا
  - `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` — حد قديم لعدد الطلبات، لا يُفعّل إلا صراحةً
  - `OMNIROUTE_CHAT_ADMISSION_QUEUE_MS` — مدة الانتظار في قائمة الانتظار قبل إرجاع 503 (القيمة الافتراضية 2000)
  - `OMNIROUTE_CHAT_ADMISSION_MAX_QUEUED_BYTES` — صمام للذاكرة الديناميكية خاص بالبايتات الموضوعة في قائمة الانتظار (القيمة الافتراضية 4 MB)
  - `OMNIROUTE_CHAT_VIRTUAL_TTL_MS` / `OMNIROUTE_CHAT_VIRTUAL_MAX_SESSIONS` — مهملان
    ولا ينفّذان أي إجراء منذ #10110 (مقبولان للتوافق مع الإعدادات، لكن يتم تجاهلهما)
- **التقارير:** `GET /api/monitoring/health` → `chatAdmission` (#11244) — بما في ذلك
  إضافات #503-fanout: `inflightBytes`، و`maxInflightBytes`، و`budgetSource`
  (`v8_heap` | `cgroup` | `override`)، و`pressureSeverity`، و`countCapEnabled`
  (تكون false في النشر الافتراضي — ما يؤكد أن ميزانية البايت، لا حد العدد القديم،
  هي القيد الفعلي).

## 2. المسارات الافتراضية التكيفية وقت التشغيل (`open-sse/services/admission`)

- **النطاق:** قبول مفاتيح المستأجرين لتوجيه المزوّد — تكلفة قائمة الانتظار، وتكييف
  الحدود بالاستناد إلى زمن الاستجابة، ووضع الطلبات في قوائم انتظار المسارات، ومقاييس المسارات.
- **البوابة:** **اشتراك اختياري.** تكون معطّلة ما لم تكن `OMNIROUTE_CHAT_VIRTUAL_LANES=true`. من دون ذلك،
  تُبقي وحدة التحكم التكيفية سلوك قائمة الانتظار المشتركة (لا يتحقق المعيار 1 من #9654 إلا
  بعد تمكين أحد المشغّلين للمسارات).
- **الضبط:** `OMNIROUTE_CHAT_VIRTUAL_LANES` + الإعدادات التكيفية (`maxQueueCount`,
  `maxQueueCost`, `defaultMaxWaitMs`، …).
- **التقارير:** `GET /api/monitoring/health` → `adaptiveAdmission` → `laneCount`,
  `laneQueuedCount`, `laneQueuedCost`, `laneTenants` (معرّفات مسارات مبهمة، وليست المفاتيح
  الأولية مطلقًا)، و`virtualLanes` — العلامة المرجعية التي تشير إلى أن «المسارات مفعّلة» في اللقطة.

## 3. مجسّات التوزيع المتشعّب — القبول لكل هدف في combo/fusion (#9654 الموجة 2)

يوزّع combo (الأولوية / التناوب الدوري) وfusion الطلب على N من أهداف النماذج ضمن طلب
أصل واحد. منذ #9654 الموجة 2، **يخضع كل هدف توزيع متشعّب للبوابة قبل التوجيه** بواسطة
مجسّ لكل هدف (`PerTargetAdmissionHook`، المُنشأ بواسطة `createPerTargetAdmissionHook`)
مقابل مسار مستأجر الطلب **الأصل**.

- **النطاق:** كل هدف توزيع متشعّب يجري توجيهه بواسطة combo وfusion ومحرّك الفوضى.
  لا يتأثر النظام 1 (على مستوى البايتات) — فهو لا يفحص أهداف التوزيع المتشعّب مطلقًا.
- **البوابة:** **اشتراك اختياري مع النظام 2.** لا تنفّذ أي إجراء عندما لا تكون
  `OMNIROUTE_CHAT_VIRTUAL_LANES` معيّنة — إذ يحتفظ الطلب الأصل بالفعل بعقد إيجار قائمة
  الانتظار المشتركة في ذلك الوضع، ولذلك سيؤدي الفحص إلى العدّ المزدوج ورفض أهداف combo.
- **الدلالات:**
  - **غير حاجب تمامًا — تخطَّ ولا تضع في قائمة الانتظار مطلقًا.** `maxWaitMs 0`: يؤدي امتلاء
    أحد المسارات إلى تخطي الهدف، لتتولى بدلًا منه آلية الرجوع الاحتياطي في combo (أو لوحة
    الناجين في fusion). وهذا مقصود: فهدف التوزيع المتشعّب هو عمل زائد، ووضعه في قائمة الانتظار
    يراكم حملًا إضافيًا على مسارات الازدحام نفسها التي وُجدت المسارات لمنعه. ولذلك ينطبق
    `defaultMaxWaitMs` على **الطلب الأصل فقط**؛ ولا تنتظر مجسّات التوزيع المتشعّب مطلقًا،
    ولا يوجد عمدًا **أي خيار ضبط** لجعلها تنتظر (يُظهر سجل المشكلة أن خيارات الانتظار أدت
    إلى فئة أخطاء 502/504 واسعة النطاق التي يمنعها #9654 — ولا ينبغي إعادة النظر في ذلك
    إلا إذا أبلغ أحد المشغّلين بأن تخطي أهداف التوزيع المتشعّب يضر بجودة الاستجابة).
  - **التحرير عند القبول.** يحرّر المجس المقبول عقد إيجاره فورًا: فهو بوابة سعة، وليس
    حجزًا مستمرًا. يغطي عقد إيجار الطلب الأصل عملية التوزيع المتشعّب؛ وسيؤدي الاحتفاظ بـ N
    من العقود الإضافية إلى تضخيم التكلفة النشطة المشتركة ورفض مستأجرين آخرين. هذا جهد
    بأفضل قدر ممكن، وليس حجزًا: يمكن أن يمتلئ المسار مجددًا بين الفحص والتوجيه، ولذلك قد
    تسمح البوابة، في ظل التنافس الشديد، بالدخول إلى مسار يصبح ممتلئًا مرة أخرى بحلول
    وقت توجيه الهدف.
  - **التسعير من جسم التوزيع المتشعّب الفعلي.** يقدّر المجس التكلفة من جسم الهدف
    الفعلي — بما في ذلك فئة الطلب المشتقة من علامة `stream` الخاصة به، تمامًا مثل مسار
    الطلب الأصل — ولذلك تُسعَّر عناصر لوحة fusion (`stream: false`) وفق فئة عدم البث
    التي ستشغلها فعليًا، وتُسعَّر أهداف الأولوية/التناوب الدوري وفق ما طلبه المستخدم.
- **التقارير:** يؤدي تخطي مجس بعد الهدف الأول إلى زيادة `fallbackCount` الخاص بكل طلب
  في combo (بما يعكس دلالات الرجوع الاحتياطي الحالية؛ ويظهر في سجلات combo)؛ ويعيد fusion
  الحالة 503 عندما يجري تخطي كل عناصر اللوحة. لا يوجد **عداد تجميعي** (مثل
  `virtualFanoutSkipped`) في اللقطة حاليًا — وإذا أبلغ أحد المشغّلين بأنه لا يستطيع معرفة
  عدد مرات تخطي بوابة المسار لأهداف التوزيع المتشعّب، فسيكون ذلك دافعًا لإضافة عداد مماثل.

## أيّها يظهر في لوحة المعلومات

- `adaptiveAdmission.laneCount` / `laneTenants` → **المسارات الافتراضية التكيفية** (النظام 2).
- `adaptiveAdmission.virtualLanes === true` → تكون مجسّات التفرّع في القسم 3
  نشطة أيضًا. إذا كانت `virtualLanes` مفقودة من الحمولة أو كانت قيمتها `false`، فهذا يعني أن
  `OMNIROUTE_CHAT_VIRTUAL_LANES` غير معيّن — وتظل المسارات على مستوى البايتات (النظام 1)
  نشطة، لكن لا يسري أي شيء ضمن `adaptiveAdmission` (ولا أي تقييد للتفرّع)
  إلى أن يتم تمكينه.

## سبب وجود النظامين

تحدّ المسارات على مستوى البايتات من مسار التحليل/الضغط كثيف استهلاك الذاكرة؛ بينما تحدّ المسارات التكيفية
من تكلفة التوجيه لكل مستأجر. يفرض النظام 1 معيار #9654 الأول ("لا تتسبب دفعة جلسة واحدة في حصول
جلسة أخرى على 503") دون شروط، ويفرضه النظام 2 بمجرد تمكين الاشتراك الاختياري.

## 4. طلب `/v1/responses` طويل ضمن عملية واحدة (هامش سليم)

أضاف [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437)
الدالة `tryAcquireHealthyHeadroom` للسماح بطلب ثانٍ ثقيل بنيويًا
عندما تكون الكومة دون `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`. يستخدم مسار BYTE
الذي تستخدمه `admitChatRequest` (الأجسام ≥ `OMNIROUTE_CHAT_LARGE_BODY_BYTES`،
والقيمة الافتراضية 256 KiB، بما في ذلك `POST /v1/responses`) **هامش التجاوز نفسه**.

هذه هي الوصفة المدعومة ضمن **عملية واحدة** لأكثر من طلبين طويلين متزامنين من نوع
SSE إلى `/v1/responses`: ارفع الحدّ الأساسي + هامش السعة السليمة فقط بالقدر الذي تسمح به الكومة
وميزانية البايتات قيد التنفيذ على مستوى العملية (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`
/ #10110). إن وجود عشرات من عملاء SSE طويلي الاتصال (40–50) هو مسألة تتعلق بميزانية
الذاكرة، وليس حدًا ثابتًا في المنتج مقداره «2 كحد أقصى». ومع ذلك، تظل الكومة الواقعة تحت الضغط
ترفض الأحمال باستخدام `503` قابل لإعادة المحاولة، حتى لا تعود المشكلة #7849.

لـ **مضاعفة الكومات**، شغّل N من `DATA_DIR` المستقلة (#11024). لا تستخدم أبدًا
`replicas > 1` مع ملف SQLite واحد (#10350). هذا القسم لا يعيد فتح
وصفة التوسّع الأفقي باستخدام DATA_DIR.
