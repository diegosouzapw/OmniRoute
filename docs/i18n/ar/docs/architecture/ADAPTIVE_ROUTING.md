# Adaptive Routing: Routing Events, Quality Feedback & Explainability (العربية)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/ADAPTIVE_ROUTING.md) · 🇪🇹 [am](../../../am/docs/architecture/ADAPTIVE_ROUTING.md) · 🇦🇿 [az](../../../az/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇬 [bg](../../../bg/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇩 [bn](../../../bn/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇦 [bs](../../../bs/docs/architecture/ADAPTIVE_ROUTING.md) · 🇨🇿 [cs](../../../cs/docs/architecture/ADAPTIVE_ROUTING.md) · 🇩🇰 [da](../../../da/docs/architecture/ADAPTIVE_ROUTING.md) · 🇩🇪 [de](../../../de/docs/architecture/ADAPTIVE_ROUTING.md) · 🇬🇷 [el](../../../el/docs/architecture/ADAPTIVE_ROUTING.md) · 🇪🇸 [es](../../../es/docs/architecture/ADAPTIVE_ROUTING.md) · 🇪🇪 [et](../../../et/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇷 [fa](../../../fa/docs/architecture/ADAPTIVE_ROUTING.md) · 🇫🇮 [fi](../../../fi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇫🇷 [fr](../../../fr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇪 [ga](../../../ga/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [gu](../../../gu/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇬 [ha](../../../ha/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇱 [he](../../../he/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [hi](../../../hi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇭🇷 [hr](../../../hr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇭🇺 [hu](../../../hu/docs/architecture/ADAPTIVE_ROUTING.md) · 🇦🇲 [hy](../../../hy/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇩 [id](../../../id/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇬 [ig](../../../ig/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇹 [it](../../../it/docs/architecture/ADAPTIVE_ROUTING.md) · 🇯🇵 [ja](../../../ja/docs/architecture/ADAPTIVE_ROUTING.md) · 🇬🇪 [ka](../../../ka/docs/architecture/ADAPTIVE_ROUTING.md) · 🇰🇭 [km](../../../km/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [kn](../../../kn/docs/architecture/ADAPTIVE_ROUTING.md) · 🇰🇷 [ko](../../../ko/docs/architecture/ADAPTIVE_ROUTING.md) · 🇱🇹 [lt](../../../lt/docs/architecture/ADAPTIVE_ROUTING.md) · 🇱🇻 [lv](../../../lv/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [ml](../../../ml/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [mr](../../../mr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇲🇾 [ms](../../../ms/docs/architecture/ADAPTIVE_ROUTING.md) · 🇲🇹 [mt](../../../mt/docs/architecture/ADAPTIVE_ROUTING.md) · 🇲🇲 [my](../../../my/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇵 [ne](../../../ne/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇱 [nl](../../../nl/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇴 [no](../../../no/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [or](../../../or/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [pa](../../../pa/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇭 [phi](../../../phi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇱 [pl](../../../pl/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇹 [pt](../../../pt/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/ADAPTIVE_ROUTING.md) · 🇷🇴 [ro](../../../ro/docs/architecture/ADAPTIVE_ROUTING.md) · 🇷🇺 [ru](../../../ru/docs/architecture/ADAPTIVE_ROUTING.md) · 🇱🇰 [si](../../../si/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇰 [sk](../../../sk/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇮 [sl](../../../sl/docs/architecture/ADAPTIVE_ROUTING.md) · 🇷🇸 [sr](../../../sr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇪 [sv](../../../sv/docs/architecture/ADAPTIVE_ROUTING.md) · 🇰🇪 [sw](../../../sw/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [ta](../../../ta/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [te](../../../te/docs/architecture/ADAPTIVE_ROUTING.md) · 🇹🇭 [th](../../../th/docs/architecture/ADAPTIVE_ROUTING.md) · 🇹🇷 [tr](../../../tr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇰 [ur](../../../ur/docs/architecture/ADAPTIVE_ROUTING.md) · 🇺🇿 [uz](../../../uz/docs/architecture/ADAPTIVE_ROUTING.md) · 🇻🇳 [vi](../../../vi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇬 [yo](../../../yo/docs/architecture/ADAPTIVE_ROUTING.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/ADAPTIVE_ROUTING.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/ADAPTIVE_ROUTING.md)

---

يصف هذا المستند الأساس التكيفي للتوجيه القائم على التغذية الراجعة الذي تمت إضافته إلى
OmniRoute. وقد صُمم عمدًا ليكون محدود النطاق: فهو يقدم قناة مكتوبة الأنواع لنتائج
التوجيه، وإشارة جودة آنية تغذي أداة تقييم auto-combo الحالية، ومُصدّرًا اختياريًا
لـ OpenTelemetry، ونقطة نهاية لقابلية التفسير. وهو **لا**
يستبدل مكدس المرونة الحالي (قاطع الدائرة، وفترة تهدئة الاتصال،
وحظر النموذج، ومصفوفة السلامة، والطيار الآلي) — بل يكمّله.

## 1. السياق المعماري

OmniRoute هو مستوى بيانات يحتوي على **مسار ساخن للطلبات** و**مستوى
تحكم/ذكاء**. يجب أن يظل المسار الساخن سريعًا، وفعالًا في استخدام الذاكرة، وغير متزامن، ومرنًا،
وقابلًا للتنبؤ. أما التقييم، واحتساب درجات الجودة، والتجارب، والتحليل التاريخي فتنتمي
إلى مستوى التحكم.

```
وكيل الذكاء الاصطناعي / بيئة التطوير
      │
      ▼
┌─────────────────────┐
│    OmniRoute        │   مستوى البيانات (سريع، متزامن، داخل الذاكرة)
│  التوجيه / تجاوز الفشل │
│  السلامة / ضوابط الحماية │
│  التخزين المؤقت / البث │
└──────────┬──────────┘
           │ RoutingEvent (إطلاق ونسيان، ~0.2µs)
           ▼
┌─────────────────────┐
│  وجهات التغذية الراجعة │   مستوى التحكم (غير متزامن، بأفضل جهد)
│  متعقب الجودة       │
│  مُصدّر OTel        │
│  مخزن التفسير       │
└──────────┬──────────┘
           ▼  درجة الجودة
      أداة تقييم auto-combo
```

### ما كان موجودًا بالفعل (تمت مراجعته، ولم تتم مضاعفته)

| المفهوم                                    | التنفيذ الحالي                                                                                            |
| ------------------------------------------ | --------------------------------------------------------------------------------------------------------- |
| التوافر (هل يمكننا إرسال حركة المرور؟)     | قاطع الدائرة (CLOSED/DEGRADED/OPEN/HALF_OPEN، محفوظ في قاعدة البيانات)، وفترة تهدئة الاتصال، وحظر النموذج |
| الإبلاغ عن السلامة                         | `providerHealthMatrix.ts`، و`providerHealthAutopilot.ts`                                                  |
| حركة المرور الظلية                         | `open-sse/services/combo/shadowRouting.ts`                                                                |
| ضوابط الحماية                              | `src/lib/guardrails/` (خطافات ما قبل/بعد)                                                                 |
| التخزين المؤقت الدقيق                      | `src/lib/semanticCache.ts` (قائم على التوقيع)                                                             |
| أدوات التقييم / التوجيه القائم على التقييم | `src/lib/evals/`، و`open-sse/services/evalRouting.ts`                                                     |
| قابلية تفسير قرارات Combo                  | `open-sse/services/combo/decisionTrace.ts`                                                                |
| أحداث لوحة المعلومات في الوقت الفعلي       | `src/lib/events/eventBus.ts` (قناة إشعارات واجهة المستخدم، وحمولات `unknown`، وسجل من 100 إدخال)          |

طبقة أحداث التوجيه **ليست** إعادة تنفيذ لـ `eventBus`: فهذا الناقل هو
قناة الإشعارات في الوقت الفعلي للوحة المعلومات (أسماء _أحداث_ مكتوبة الأنواع، وحمولات
مبهمة، ومستهلكو واجهة مستخدم). أما `RoutingEvent` فهو بنية _نتيجة_ مكتوبة الأنواع
(زمن الاستجابة/الرموز/التكلفة/النتيجة/سبب الإنهاء)، تستهلكها
وجهات التغذية الراجعة التابعة لمستوى التحكم (متعقب الجودة، ومُصدّر OTel، ومخزن التفسير).

### ما كان مفقودًا (وتمت إضافته هنا)

1. **حدث نتيجة توجيه مكتوب الأنواع + تجريد للوجهة** (`RoutingEvent` /
   `RoutingEventSink`). يقتصر `decisionTrace` على Combo ويعمل داخل الذاكرة فقط؛
   و`comboMetrics` عبارة عن عدادات تراكمية؛ أما `call_logs` فهو تخزين خام غير متزامن.
   ولا يمثل أي منها قناة نتائج مكتوبة الأنواع وقائمة على الوجهات، يمكن لمتعقب جودة أو مُصدّر OTel
   أو أداة تقييم بأسلوب Future-AGI الاشتراك فيها.
2. **إشارة جودة آنية** (EWMA) لجودة المخرجات — كانت أداة التقييم في السابق
   تستخدم فقط ملاءمة المهام الثابتة ومعدلات اجتياز التقييم الاختيارية كمؤشرات بديلة عن «الجودة».
3. **مُصدّر OTel اختياري بلا تبعيات** يستخدم اصطلاحات GenAI الدلالية.
4. **نقطة نهاية لقابلية التفسير** تُرجع قرارات التوجيه الفعلية + حالة الجودة.

## 2. أحداث التوجيه (أساس التغذية الراجعة)

الملفات: `open-sse/services/routing/events.ts`، `.../index.ts`

يحمل `RoutingEvent` بيانات التوجيه الوصفية فقط:

```ts
interface RoutingEvent {
  requestId: string;
  provider: string;
  model: string;
  strategy: string; // "auto" | "priority" | "direct" | ...
  latencyMs: number;
  ttftMs: number | null;
  inputTokens: number | null;
  outputTokens: number | null;
  cost: number | null;
  retries: number;
  fallbackUsed: boolean;
  outcome: RoutingOutcome; // اتحاد مدرج في قائمة السماح
  status: number | null;
  finishReason: string | null;
  connectionId: string | null;
  ts: number;
}
```

يمثّل `RoutingEventSink` سمةً بنمط `Send+Sync` في TypeScript:

```ts
interface RoutingEventSink {
  readonly name: string;
  record(event: RoutingEvent): void; // يجب أن تكون O(1)، دون إدخال/إخراج متزامن
}
```

يستدعي المسار الساخن `emitRoutingEvent(event)` مرة واحدة لكل طلب مكتمل
(استدعاء إكمال البث، ومسار النجاح من دون بث، ومسار فشل الاستجابة 200 المشوّهة
في `handleChatCore`). يكون الإرسال توزيعًا متزامنًا إلى جميع المصارف المسجّلة،
لكن كل مصرف لا يفعل سوى الإضافة إلى طابور أو تحديث الحالة في الذاكرة. **لا
توجد عمليات كتابة متزامنة إلى قاعدة البيانات، ولا إدخال/إخراج شبكي على المسار الساخن.**

المصارف الافتراضية:

- `MemoryRoutingEventStore` — مخزن مؤقت حلقي محدود (500)، يعرض الأحدث أولًا،
  لنقطة نهاية الشرح.
- مستهلك `QualityTracker` — يحدّث تقدير الجودة وفق EWMA.
- `OtlpHttpsEventSink` — اختياري، ولا يُفعّل إلا عند تعيين
  `OMNIROUTE_OTEL_ENDPOINT` (أو `OTEL_EXPORTER_OTLP_ENDPOINT`).

### الحمل الإضافي المقاس (مقارنة صادقة)

تشغيل `npm run bench:routing-events` على محطة العمل هذه (100k تكرار؛ قِيست
العمليات التي تقل عن µs بوصفها قيمة إجمالية بوحدة µs/op لأن النسب المئوية لكل
عملية أدنى من دقة مؤقّت `performance.now()`):

| السيناريو                                | µs/op  | ops/s  |
| ---------------------------------------- | ------ | ------ |
| خط الأساس (التسجيل فقط)                  | ~0.045 | ~22 M  |
| خط الأساس + RoutingEvent (مصرفان)        | ~0.168 | ~5.9 M |
| خط الأساس + حدث + إضافة OTel إلى الطابور | ~0.163 | ~6.1 M |
| متزامن (8 دفعات متداخلة)                 | ~0.18  | —      |

يبلغ فرق إرسال الحدث مقارنةً بتسجيل خط الأساس نحو ~0.12 µs/request؛ ولا يفعل
مصرف OTel سوى الإضافة إلى الطابور (دفع إلى مخزن مؤقت بزمن O(1))، من دون إضافة
أي حمل قابل للقياس. هذه الأرقام خاصة بالجهاز ونسبية — وليست ضمانًا لأداء
بيئة الإنتاج. كان الرقم "~0.2 µs" في v1 تقديرًا إجماليًا؛ تفصل هذه المنهجية
خط أساس التسجيل عن تكلفة إرسال الحدث.

## 3. إشارة الجودة (حالة المزوّد المدفوعة بالتغذية الراجعة)

الملفات: `open-sse/services/routing/quality.ts`

يفصل v2 الجودة **التشغيلية** عن الجودة **الدلالية**:

- **التشغيلية** — مشتقة من المسار الساخن للتوجيه (أخطاء HTTP من فئتي 4xx/5xx،
  وفشل الاتصال، واستجابات 429، والاستجابات المشوّهة، وانقطاعات البث،
  و`finish_reason=length`، وحالات النجاح ذات المخرجات الصفرية، وEWMA لزمن
  الاستجابة/TTFT). لا تُعامل الاستجابة 200 على أنها جودة دلالية.
- **الدلالية** — القيمة الفعلية للمخرجات المُنشأة. لا ينتجها **إلا** مقيّم عبر
  `setSemanticQuality()`. وتبقى `null` إلى أن يوفّرها أحد المقيّمين، ولا تتسرّب
  مطلقًا إلى النتيجة التشغيلية.

الحالة لكل زوج (مزوّد، نموذج) (EWMA + عدّادات محدودة):

- `successEwma` — متوسط EWMA (α=0.2) لنجاح النتيجة.
- `latencyEwma` / `ttftEwma` — متوسط EWMA لزمن الاستجابة (α=0.1).
- `samples`، و`anomalies`، و`rateLimited`، و`semantic`، و`semanticConfidence`.
- `recencyMs` — مدى حداثة آخر رصد للنموذج.

### الوعي بالثقة / عدد العينات

`confidence = clamp01(samples / 50)`، وتُمزج النتيجة المُعادة إلى المسجّل باتجاه
نقطة المنتصف المحايدة:

```
score = 0.5 + confidence * (operational - 0.5)
```

النتائج المترتبة (والمتحقق منها بالاختبارات):

- يحصل المزوّد البارد (0 عينة) على نتيجة **0.5** — فلا يُعاقب بصورة غير عادلة،
  لكنه لا يستطيع التفوق على مزوّد لديه آلاف المشاهدات الموثوقة.
- يُسحب المزوّد الذي حقق 7 نجاحات محظوظة باتجاه 0.5 (ولا يتفوق أبدًا بسبب
  التهيئة المتفائلة).
- يتقارب المزوّد الذي لديه 50+ عينة نحو نتيجته التشغيلية الحقيقية.
- يحدث التدهور والتعافي تدريجيًا (EWMA)، ولا يؤدي فشل معزول واحد إلى تدمير
  مزوّد سليم.

يعرض `ProviderQuality` القيم `{ operational, semantic, confidence, samples, anomalies,
rateLimited, successEwma, latencyEwmaMs, ttftEwmaMs, recencyMs }`.

يغذّي ذلك مسجّل auto-combo بوصفه عامل التسجيل `quality`:

- `ScoringFactors.quality` / `ScoringWeights.quality` في
  `open-sse/services/autoCombo/scoring.ts`.
- `DEFAULT_WEIGHTS`: تتغير قيمة `health` من 0.1905 إلى 0.1605، وتكون قيمة
  `quality` هي 0.03. يظل المجموع 1.0.
- يملأ `buildAutoCandidates` قيمة `candidate.quality` من المتعقّب؛ ويستخدم
  المرشحون الذين لا تتوفر عنهم بيانات القيمة المحايدة **0.5** افتراضيًا
  (لا يُعزَّز المرشح البارد ولا يُعاقب).

الحلقة المغلقة:

```
RoutingEvent → QualityTracker → getQualityScore → عامل جودة auto-combo
      ↑                                                    │
      └────── نتيجة الطلب (handleChatCore) ←───────────────┘
```

### الاستبعاد الصارم مقابل العقوبة المرنة

إشارة الجودة ليست سوى **تفضيل تكيفي مرن**. يظل الاستبعاد الصارم ضمن مكدس
المرونة الحالي: قاطع الدائرة بحالة OPEN، واستنفاد الحصة، وفشل المصادقة، وحظر
النموذج — ولا تتأثر أي من هذه الحالات بنتيجة الجودة. يُخفض تفضيل المزوّد الذي
تنخفض نتيجة جودته مؤقتًا، لكنه لا يُعطّل كليًا أبدًا.

## 3b. التوقيت القياسي للتدفق (TTFT / ITL)

الملفات: `open-sse/utils/streamTiming.ts`

تُعد `createStreamTiming()` نقطة الربط الوحيدة لأدوات القياس في مسار التدفق،
وهي موصولة بـ `createSSEStream` ‏(`open-sse/utils/stream.ts`):

- `markByte()` — استلام أول كتلة بيانات من المصدر.
- `markForward()` — تمرير أول كتلة بيانات إلى العميل (تُستخدم لحساب TTFT).
- `markInterrupted()` — انتهاء مهلة التدفق أو إلغاؤه أو حدوث خطأ قبل اكتماله بشكل سليم.
- `ttft()` = زمن استجابة أول كتلة SSE مُمرَّرة. **هذا ليس TTFT على مستوى الرموز** —
  فقد تحمل كتلة SSE واحدة صفرًا أو رمزًا واحدًا أو عدة رموز. وهذا موثّق بدقة.
- `avgItlMs()` = متوسط الفاصل الزمني بين كتل البيانات (مؤشر تقريبي لزمن انتقال الكتل بالنسبة إلى ITL).

تتدفق قيم TTFT/ITL وحالة الانقطاع إلى `RoutingEvent` ‏(`ttftMs`، و`itlMs`) ويتم
تصديرها بوصفها سمات نطاق GenAI/OmniRoute بواسطة وجهة OTel.

## 4. قابلية الرصد باستخدام OpenTelemetry / GenAI

الملفات: `open-sse/services/routing/otel.ts`

- مُصدِّر OTLP/HTTP JSON بلا تبعيات (يستخدم `fetch` العام، من دون
  حزمة SDK ‏`@opentelemetry/*`).
- تتبع النطاقات اصطلاحات GenAI الدلالية (`gen_ai.provider.name`،
  و`gen_ai.request.model`، و`gen_ai.usage.input_tokens/output_tokens`،
  و`gen_ai.completion.finish_reason`، و`gen_ai.system`) بالإضافة إلى سمات توجيه
  OmniRoute (النتيجة، والحالة، وttft، وإعادات المحاولة، والانتقال الاحتياطي).
- لا تفعل `record()` سوى إضافة العناصر إلى مخزن مؤقت محدود السعة (O(1))؛ ويقوم مؤقّت
  في الخلفية بالإرسال عبر `POST {endpoint}/v1/traces` بشكل غير متزامن. عند الحمل الزائد،
  تُحذف أقدم الأحداث (العداد `dropped`) — ولا يُفرض ضغط رجعي مطلقًا على مستوى
  البيانات.
- **معطّل ما لم تتم تهيئته.** يجب تعيين `OMNIROUTE_OTEL_ENDPOINT` (أو
  `OTEL_EXPORTER_OTLP_ENDPOINT`)؛ وإلا فلن تُسجَّل الوجهة ولن يُشغَّل أي
  كود OTel.

## 5. قابلية التفسير

- يعيد `GET /v1/explain/routing` أحداث `RoutingEvent` الأخيرة (القرارات الفعلية،
  الأحدث أولًا) ولقطة الجودة لكل مزوّد/نموذج.
- تعكس المصادقة آلية `/v1/combos` (مفتاح API بنمط Bearer أو جلسة لوحة المعلومات؛
  ويُسمح بالوصول المجهول في عمليات النشر المحلية أحادية المستخدم عند
  `REQUIRE_API_KEY=false`).
- تظل عمليات التتبع لكل استدعاء على مستوى المجموعة متاحة عبر
  `decisionTrace.ts` الحالي (الترويسة `X-OmniRoute-Combo-Trace`).
- السلامة: لا تحمل الأحداث سوى بيانات التوجيه الوصفية، ولا تحمل مطلقًا المطالبات
  أو أجسام الطلبات أو بيانات الاعتماد.

## 6. تكامل مستوى التقييم (الاستعداد لـ Future AGI)

يتعامل OmniRoute مع Future AGI (أو أي مُقيِّم) بوصفه **واجهة خلفية محتملة
للذكاء/التقييم، وليس تبعية**. نقاط الربط هي:

- يمكن لـ `RoutingEventSink` إعادة توجيه الأحداث إلى مُقيِّم بشكل غير متزامن.
- يوفّر `MemoryRoutingEventStore` مع لقطة الجودة للمُقيِّم تدفق القرارات الخام.
- يمكن لـ `Evaluator` مستقبلي (حتمي، أو حَكَم محلي، أو HTTP، أو WASM) استهلاك
  الأحداث/عمليات التتبع وإرجاع `QualityScore` يغذي مسار
  `getQualityScore`/عامل الجودة نفسه.
- يعيد التوجيه الحالي المعتمد على التقييم (`open-sse/services/evalRouting.ts`)
  ترتيب أهداف المجموعة بالفعل وفق معدلات نجاح `eval_runs` عند تمكينه.

لا تُنفَّذ أي عمليات تقييم بشكل متزامن في مسار الطلب، وتعمل البوابة بالكامل
في غياب المُقيِّم.

## 7. المراجعة المعمارية النهائية

1. **ما الذي يظل في المسار الساخن المتزامن؟** التوجيه/احتساب الدرجات، وعمليات
   التحقق المسبق للحواجز الوقائية، والبحث في ذاكرة التخزين المؤقت، وعملية توزيع
   واحدة عبر `emitRoutingEvent` (نحو 0.12 ميكروثانية فوق زمن احتساب الدرجات
   الأساسي) إلى الوجهات الموجودة في الذاكرة.
2. **ما الذي نُقل إلى المعالجة غير المتزامنة؟** تصدير OTel (مؤقّت + fetch)،
   وحفظ `call_logs`/الاستخدام، وعمليات كتابة ذاكرة التخزين الدلالية؛ أما الجودة
   فتوجد في الذاكرة وتعمل بزمن O(1) (ولا تحتاج إلى معالجة غير متزامنة).
3. **كيف تتحول نتيجة توجيه إلى تغذية راجعة؟** يُصدر `handleChatCore` حدث
   `RoutingEvent` ← يحدّث `QualityTracker` حالة EWMA ← تغذي `getQualityScore`
   عامل `quality` للمجموعة التلقائية.
4. **كيف تؤثر الجودة في عمليات التوجيه المستقبلية؟** تقلل درجة الجودة المنخفضة
   الدرجة الموزونة لذلك المزوّد/النموذج في `scoreAutoTargets`، بحيث تقل أولوية
   النماذج المتدهورة تدريجيًا وتتعافى مع تحسّن EWMA الخاص بها.
5. **كيف يمكن دمج Future AGI دون أن يصبح تبعية؟** عبر واجهة
   `RoutingEventSink` / محوّل `Evaluator` مستقبلي — من دون تبعية مضمنة مباشرة.
6. **ماذا يحدث عندما لا يتوفر المُقيِّم؟** لا يتأثر التوجيه؛ وتعود الجودة إلى
   القيمة المحايدة (1.0) للنماذج التي لا تتوفر لها إشارة مرصودة.
7. **ماذا يحدث عندما لا يتوفر القياس عن بُعد؟** ببساطة لا تُسجَّل وجهة OTel؛
   وتعمل بقية طبقة التوجيه دون تغيير.
8. **ماذا يحدث عند الحمل الزائد؟** يحذف مخزن OTel المؤقت أقدم الأحداث؛ وتكون
   الجودة والمخزن الحلقي محدودي السعة بحكم التصميم؛ ولا يحدث أي ضغط رجعي.
9. **كيف تتعافى حالة المزوّد بعد التدهور؟** يعاود EWMA التقارب مع تراكم حالات
   النجاح؛ وتُبقي مرحلة الإحماء النماذج الباردة في حالة محايدة؛ كما يتعافى
   قاطع الدائرة بشكل مستقل عبر مجسّات HALF_OPEN.
10. **ما الميزات المقترحة التي لم تُنفَّذ عمدًا، ولماذا؟**
    - حركة الظل / التجارب — مُنفَّذة بالفعل
      (`combo/shadowRouting.ts`)؛ ولم يُعَد بناؤها.
    - الحواجز الوقائية — مُنفَّذة بالفعل (`src/lib/guardrails/`)؛ ولم تُكرَّر.
    - ذاكرة التخزين الدلالية — مُنفَّذة بالفعل (`src/lib/semanticCache.ts`)؛ ولم
      تُكرَّر.
    - منصة متكاملة لإدارة التجارب، أو أدوات مجموعات البيانات، أو منصة لتحسين
      المطالبات، أو قاعدة بيانات متجهية، أو بنية OTel خارجية إلزامية — تقع خارج
      نطاق مستوى بيانات رشيق.
    - بنية `RoutingEvent` بلغة Rust — مستوى البيانات مكتوب بلغة TypeScript؛
      ونوع TS هو المكافئ المكيّف.

## 8. مرجع الإعدادات

| المتغير                       | القيمة الافتراضية | التأثير                                                                   |
| ----------------------------- | ----------------- | ------------------------------------------------------------------------- |
| `OMNIROUTE_OTEL_ENDPOINT`     | غير معيّن         | عند تعيينه، يفعّل مُصدِّر تتبعات OTLP/HTTP (مثل `http://collector:4318`). |
| `OTEL_EXPORTER_OTLP_ENDPOINT` | غير معيّن         | اسم بديل احتياطي لنقطة نهاية OTLP.                                        |
| `OTEL_SERVICE_NAME`           | `omniroute`       | سمة المورد `service.name`.                                                |

## 9. الاختبارات

- `tests/unit/routing-events.test.ts` — تطبيع الأحداث، وتصنيف
  الحالة، والمخزن المؤقت الحلقي محدود الحجم، والتوزيع المتشعب على الوجهات + العزل.
- `tests/unit/routing-quality.test.ts` — إحماء EWMA، والتعافي من الفشل/النجاح،
  وعقوبات الحالات الشاذة، ومعالجة 429 بوصفها حالة عابرة، واللقطة، وإعادة الضبط.
- `tests/unit/routing-scoring-quality.test.ts` — سلامة الأوزان، والقيمة الافتراضية
  المحايدة، وترتيب معامل الجودة.
- `tests/unit/routing-otel.test.ts` — بوابة التفعيل، وحمولة نطاق GenAI، والتفريغ
  غير المتزامن، والإسقاط عند الحمل الزائد.
- `tests/unit/routing-events-concurrency.test.ts` — آلاف الأحداث، ومحدودية
  المخزن المؤقت الحلقي، وعزل الوجهات التي تطرح أخطاء، والدفعات غير المتزامنة المتداخلة،
  وإعادة الضبط في أثناء عمليات الإدراج.
- `tests/unit/routing-adaptive-e2e.test.ts` — حلقة حتمية متكاملة من البداية إلى النهاية عبر
  مُسجّل النقاط الفعلي `scoreAutoTargets`: سليم ← تدهور ← تعافٍ ← عارض مؤقت، بالإضافة إلى
  سيناريوهات البدء البارد ومزوّد البدء البارد المحظوظ.
- `tests/unit/stream-timing.test.ts` — TTFT (أول جزء مُمرَّر)، وITL،
  والبايت الأول مقابل التمرير الأول، والانقطاع، وأمان الأجزاء المشوّهة/الفارغة.

## 10. حالة المشكلات الموجودة مسبقًا (المرحلة 18)

| المشكلة                                                        | الحالة                | الملاحظات                                                                                                                                                                                                                                 |
| -------------------------------------------------------------- | --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| عدم تطابق تصدير `omniglyph`                                    | **أُصلحت (بيئية)**    | لم يكن `node_modules` متزامنًا مع `package-lock.json` (الإصدار المثبّت 1.3.1 مقابل الإصدار المقفل 1.4.0). أدّى تشغيل `npm install omniglyph@1.4.0` إلى استعادة الإصدار المقفل؛ وانخفضت أخطاء الأنواع إلى 0. بقيت ملفات التعريف دون تغيير. |
| اختبارات `getKnownContextOverflow` القديمة                     | **معروفة — لم تُصلح** | يستورد `combo-context-overflow-compression-probe.test.ts` دالة لم تعد موجودة في `open-sse/services/combo.ts` (تشير إليها التعليقات فقط). يتطلب الإصلاح إعادة تنفيذ تلك الاختبارات أو إعادة كتابتها — وهو تغيير معماري غير ذي صلة.         |
| عزل قاعدة البيانات في `combo-runtime-unit-concurrency.test.ts` | **معروفة — لم تُصلح** | يفشل تأكيد عزل SQLite في بيئة الاختبار عند تشغيله مباشرةً؛ ويفشل بالطريقة نفسها في الفرع الأساسي.                                                                                                                                         |
| انحراف `llm.txt` في i18n                                       | **معروفة — لم تُصلح** | تختلف ملفات `docs/i18n/*/llm.txt` عن الملف الجذري؛ وهي مشكلة موجودة مسبقًا تمنع بوابة المزامنة المسبقة للالتزام الخاصة بالوثائق.                                                                                                          |

يُحافَظ على التمييز بين مشكلات البيئة ومشكلات الشيفرة؛ ولا تُخفى أي إخفاقات غير ذات صلة
خلف مرشحات اختبار معدّلة.
