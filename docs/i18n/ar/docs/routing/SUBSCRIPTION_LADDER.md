# Subscription-first routing (العربية)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/SUBSCRIPTION_LADDER.md) · 🇪🇹 [am](../../../am/docs/routing/SUBSCRIPTION_LADDER.md) · 🇦🇿 [az](../../../az/docs/routing/SUBSCRIPTION_LADDER.md) · 🇧🇬 [bg](../../../bg/docs/routing/SUBSCRIPTION_LADDER.md) · 🇧🇩 [bn](../../../bn/docs/routing/SUBSCRIPTION_LADDER.md) · 🇧🇦 [bs](../../../bs/docs/routing/SUBSCRIPTION_LADDER.md) · 🇨🇿 [cs](../../../cs/docs/routing/SUBSCRIPTION_LADDER.md) · 🇩🇰 [da](../../../da/docs/routing/SUBSCRIPTION_LADDER.md) · 🇩🇪 [de](../../../de/docs/routing/SUBSCRIPTION_LADDER.md) · 🇬🇷 [el](../../../el/docs/routing/SUBSCRIPTION_LADDER.md) · 🇪🇸 [es](../../../es/docs/routing/SUBSCRIPTION_LADDER.md) · 🇪🇪 [et](../../../et/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇷 [fa](../../../fa/docs/routing/SUBSCRIPTION_LADDER.md) · 🇫🇮 [fi](../../../fi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇫🇷 [fr](../../../fr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇪 [ga](../../../ga/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [gu](../../../gu/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇬 [ha](../../../ha/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇱 [he](../../../he/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [hi](../../../hi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇭🇷 [hr](../../../hr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇭🇺 [hu](../../../hu/docs/routing/SUBSCRIPTION_LADDER.md) · 🇦🇲 [hy](../../../hy/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇩 [id](../../../id/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇬 [ig](../../../ig/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇹 [it](../../../it/docs/routing/SUBSCRIPTION_LADDER.md) · 🇯🇵 [ja](../../../ja/docs/routing/SUBSCRIPTION_LADDER.md) · 🇬🇪 [ka](../../../ka/docs/routing/SUBSCRIPTION_LADDER.md) · 🇰🇭 [km](../../../km/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [kn](../../../kn/docs/routing/SUBSCRIPTION_LADDER.md) · 🇰🇷 [ko](../../../ko/docs/routing/SUBSCRIPTION_LADDER.md) · 🇱🇹 [lt](../../../lt/docs/routing/SUBSCRIPTION_LADDER.md) · 🇱🇻 [lv](../../../lv/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [ml](../../../ml/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [mr](../../../mr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇲🇾 [ms](../../../ms/docs/routing/SUBSCRIPTION_LADDER.md) · 🇲🇹 [mt](../../../mt/docs/routing/SUBSCRIPTION_LADDER.md) · 🇲🇲 [my](../../../my/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇵 [ne](../../../ne/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇱 [nl](../../../nl/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇴 [no](../../../no/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [or](../../../or/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [pa](../../../pa/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇭 [phi](../../../phi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇱 [pl](../../../pl/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇹 [pt](../../../pt/docs/routing/SUBSCRIPTION_LADDER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/SUBSCRIPTION_LADDER.md) · 🇷🇴 [ro](../../../ro/docs/routing/SUBSCRIPTION_LADDER.md) · 🇷🇺 [ru](../../../ru/docs/routing/SUBSCRIPTION_LADDER.md) · 🇱🇰 [si](../../../si/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇰 [sk](../../../sk/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇮 [sl](../../../sl/docs/routing/SUBSCRIPTION_LADDER.md) · 🇷🇸 [sr](../../../sr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇪 [sv](../../../sv/docs/routing/SUBSCRIPTION_LADDER.md) · 🇰🇪 [sw](../../../sw/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [ta](../../../ta/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [te](../../../te/docs/routing/SUBSCRIPTION_LADDER.md) · 🇹🇭 [th](../../../th/docs/routing/SUBSCRIPTION_LADDER.md) · 🇹🇷 [tr](../../../tr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇰 [ur](../../../ur/docs/routing/SUBSCRIPTION_LADDER.md) · 🇺🇿 [uz](../../../uz/docs/routing/SUBSCRIPTION_LADDER.md) · 🇻🇳 [vi](../../../vi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇬 [yo](../../../yo/docs/routing/SUBSCRIPTION_LADDER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/SUBSCRIPTION_LADDER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/SUBSCRIPTION_LADDER.md)

---

> معرّفان جديدان ضمن `auto/*` — وهما `auto/subscription` و`auto/thrifty`. كلاهما اختياريان ويُفعّلان
> عند طلبهما: لا تُوجَّه أي حركة عبرهما ما لم يطلب المستدعي المعرّف بالاسم، ولا يطرأ أي
> تغيير على أي مجموعة أو استراتيجية أو إعداد افتراضي قائم.

## سبب وجود هذا

يجيب OmniRoute بالفعل عن سؤالين متعلقين بالتكلفة، لكن أياً منهما ليس السؤال الذي يطرحه معظم المشغّلين.

| الآلية القائمة                                           | السؤال الذي تجيب عنه                                  |
| -------------------------------------------------------- | ----------------------------------------------------- |
| `hidePaidModels` (`autoCombo/paidModelFilter.ts`)        | "هل هذا النموذج مصنّف على أنه مجاني؟"                 |
| `freeAccessPolicy: "strict"` (`strictZeroCostFilter.ts`) | "هل يمكن لهذا الاتصال أن يفرض عليّ رسوماً في أي وقت؟" |
| `quotaPreflight` (`combo/quotaExhaustionCutoff.ts`)      | "هل اقترب هذا الاتصال من حده الأقصى؟"                 |
| `budgetCap` / `budgetFallback` (`autoCombo/engine.ts`)   | "ضع حداً للإنفاق، ثم انتقل إلى الأرخص"                |

كل آلية تقتصر على المجاني **تفشل بحالة مغلقة** — فمجموعة الخيارات المجانية المستنفدة تصبح مجموعة فارغة، ولا
تؤدي أبداً إلى التصعيد نحو خيار مدفوع — وكل آلية خاصة بالخيارات المدفوعة لا تميّز بين المستويات. ولا يجيب أي منهما عن:

> "استخدم الحصة التي أدفع مقابلها بالفعل. وعندما تنفد، توقّف أو اصعد درجة واحدة في كل مرة
> عبر أرخص الخيارات المدفوعة — وعُد إليها فور إعادة تعيين الحصة."

## الفوترة خاصية للاتصال، وليست خاصية للنموذج

تعتمد `classifyTier()` (`open-sse/services/tierResolver.ts`) على `(provider, model)` وتُرجع
`free | cheap | premium` وفقاً لتسعير الكتالوج. لكن تحديد ما إذا كان الطلب يكلّف أموالاً إضافية
يعتمد على **الاتصال الذي يخدمه**: فقد يكون النموذج نفسه مشمولاً في الخطة عبر اتصال OAuth الخاص بـ Claude Code،
بينما تُحتسب تكلفته لكل رمز عبر اتصال يستخدم مفتاح API.

لا يُعد `provider_connections.auth_type` مؤشراً موثوقاً في أي من الاتجاهين — فهناك اتصالات OAuth
تُحاسب حسب الاستخدام، كما توجد اتصالات بمفتاح API مشمولة في الخطة (إذ إن رمز مقعد Copilot ليس
مفتاح API تُحتسب تكلفته حسب الاستخدام). ولذلك تأتي فئة الفوترة من **كتالوج مُنتقى بعناية**،
`open-sse/config/connectionBillingCatalog.ts`، يُضبط يدوياً وفقاً للشروط المنشورة لكل مزوّد —
وهو النمط نفسه الذي أرسته `FreeModelBudget.hardStopGuaranteed` بالفعل للنماذج المجانية.

```ts
type ConnectionBillingClass = "subscription" | "metered" | "keyless" | "unknown";
type ConnectionOverageBehavior = "hard-stop" | "meters-to-paid" | "unknown";
```

ترتيب الحل (`autoCombo/connectionBilling.ts`): القيمة الاصطناعية الحارسة لعدم وجود مصادقة ←
`keyless`؛ ثم إدخال في الكتالوج يطابق المزوّد **و** `authType`؛ ثم إدخال على مستوى المزوّد؛
وإلا تكون النتيجة `unknown`. **غير المُدرج في الكتالوج ليس مجانياً** — إذ تُعامل `unknown` على أنها `metered`
في كل موضع، بحيث يبدأ أي مزوّد يُضاف غداً خارج درجة الاشتراك، ولا يُدرج فيها إلا
عمداً.

## نموذج الدرجات

خمس درجات مرتبة بحسب التصعيد. ولا تختلف في السعر فقط — بل لكل منها إشارة **خاصة بها**
تدل على الاستنفاد، ولهذا لا يقتصر الأمر على مجرد فرز.

| #   | الدرجة         | العضوية                                                            | تُعد مستنفدة عندما                    |
| --- | -------------- | ------------------------------------------------------------------ | ------------------------------------- |
| 0   | `subscription` | قيمة `billing: "subscription"` مُنتقاة في الكتالوج                 | تكون نافذة الحصة عند حد القطع أو دونه |
| 1   | `keyless`      | مسار عدم المصادقة الاصطناعي                                        | فترة تهدئة الاتصال / قاطع الدارة      |
| 2   | `free`         | اتصال تُحاسب تكلفته حسب الاستخدام، و`classifyTier() === "free"`    | يُستنفد الحد المجاني                  |
| 3   | `cheap`        | اتصال تُحاسب تكلفته حسب الاستخدام، و`classifyTier() === "cheap"`   | تُستهلك ميزانية الدرجة                |
| 4   | `premium`      | اتصال تُحاسب تكلفته حسب الاستخدام، و`classifyTier() === "premium"` | تُستهلك ميزانية الدرجة                |

تُستنفد الدرجات 0-2 بناءً على **الحصة**، وهي قابلة للرصد ويجري تتبعها بالفعل. أما الدرجتان 3-4 فلا تملكان
حصة — إذ يواصل الاتصال المدفوع تقديم الخدمة بلا نهاية — ولذلك فإن إشارة الاستنفاد المنطقية الوحيدة لهما هي
**ميزانية** لكل درجة. ومن دونها، لا يوجد مُشغّل لعبارة "صعّد عند استنفاد الدرجة الرخيصة".

## `auto/subscription` — الإخفاق بحالة مغلقة

المجموعة = الدرجة 0 فقط، ومحصورة في الاتصالات التي تكون فيها الزيادة على الحصة موثقة بوصفها `hard-stop`، وقد تم التحقق مباشرةً من أن لكل منها هامشًا متبقيًا في الحصة. يُستبعد كل ما هو ملتبس: موفّر غير منسّق، أو قراءة حصة يتعذر التحقق منها، أو قراءة قديمة، أو زيادة تُحتسب كاستخدام مدفوع.

المجموعة الفارغة هي النتيجة **المقصودة**، وليست عيبًا — فمسار المجموعة الفارغة الموجود لدى المستدعي يحولها إلى خطأ واضح بدلًا من الرجوع الاحتياطي الصامت القابل للفوترة. وهذا هو الوعد الكامل لهذا المعرّف.

لا يتأهل `keyless` **عن قصد**: فهذا التجميع يعني «الخطة التي أدفع مقابلها»، ولذلك لا تنتمي إليه واجهة خلفية لا تتطلب مصادقة. استخدم `auto/thrifty` (أو `auto/best-free`) لهذا الغرض.

### أمان الاتصال

لا يرتبط المرشح دائمًا باتصال واحد — إذ يحمل المرشح المنطقي قائمة سماح `allowedConnectionIds`، ويُختار الحساب المستخدم فعليًا لاحقًا، وقت الإرسال، بواسطة `open-sse/services/combo/autoStrategy.ts`. لذلك يتحقق كلا التجميعين من **كل اتصال على حدة** ويعيدان كتابة `allowedConnectionIds` بحيث تقتصر تمامًا على المجموعة الفرعية المتبقية — وليس القائمة الأصلية الكاملة مطلقًا، ولا عضوًا واحدًا مختارًا عشوائيًا. ولأن `autoStrategy.ts` يفرض هذه المصفوفة بالفعل بوصفها قائمة سماح صارمة، فإن إعادة كتابتها هنا تجعل مجموعتي «ما تم التحقق منه» و«ما يُستخدم فعليًا» متطابقتين بحكم التصميم. وهذا هو الثابت نفسه، والاستدلال نفسه، كما في
[STRICT_ZERO_COST](./STRICT_ZERO_COST.md).

## `auto/thrifty` — التصعيد درجة واحدة في كل مرة

المجموعة = جميع الدرجات، مرتبة حسب فهرس الدرجة، مع حجب المرشحين الذين استنفدوا حصصهم. ويظل محرك `auto` يجري التقييم **داخل** المجموعة المتبقية: يحدد السلم الدرجات التي تدخل في المنافسة، ويحدد التقييم المرشح الفائز داخلها. يظل الترتيب ثابتًا داخل الدرجة، ولذلك لا تعيد هذه الطبقة ترتيب التصنيف الخاص بأداة التقييم مطلقًا.

هذه طبقة ترتيب + حجب، **وليست** آلية إرسال جديدة: فحلقة المحاولات الاستباقية في `combo.ts` تمر بالفعل على الأهداف بالترتيب وتنتقل إلى التالي عند الفشل، ولذلك فإن استنفادًا وقت التشغيل لم يكتشفه الفحص المسبق يظل يؤدي إلى التصعيد إلى الدرجة التالية ضمن الطلب نفسه.

بينما يُخفق `auto/subscription` بحالة مغلقة، يُخفق `auto/thrifty` بحالة **مفتوحة**: إذ تظل محاولة الاتصال المشمول في الخطة أولًا حتى في غياب قراءة قابلة للاستخدام للحصة. ولا تترتب أي تكلفة على تجربته، وإذا اتضح أنه مستنفد فسينتقل المسار الاحتياطي إلى الدرجة التالية على أي حال — في حين أن رفض تجربته سيرسل الطلب إلى درجة مدفوعة بسبب غياب بيانات القياس، وهي بالضبط النتيجة التي وُجد هذا التجميع لتجنبها.

## العودة إلى الخطة بعد إعادة الضبط

يجب أن تنتهي صلاحية ثلاثة أشياء مستقلة قبل أن يعود التوجيه إلى الدرجة 0. إصلاح واحد منها فقط يترك السلم عالقًا عند الدرجات المدفوعة لوقت طويل بعد إعادة تعبئة الخطة.

1. **ذاكرة التخزين المؤقت لحالة الحصة** — يخزّن `freeAccessQuota.ts` مؤقتًا لكل `(provider, connection)` بمدة صلاحية قدرها 180s. الإدخال المخزّن مؤقتًا الذي تجاوزت قيمة `resetAt` الخاصة به وقتها بالفعل يصف نافذة لم تعد موجودة، ولذلك يُعامل الآن على أنه قديم **بغض النظر عن عمره** ويفرض إجراء تحديث. من دون ذلك، تظل الخطة التي أُعيدت تعبئتها عند منتصف الليل تظهر على أنها مستنفدة إلى أن تنقضي مدة الصلاحية مصادفةً.
2. **حالة السلم نفسه** — لا توجد أي حالة، وهذا مقصود في التصميم. يُعاد حساب أهلية الدرجات من حالة الحصة المباشرة عند كل بناء للمجموعة؛ ولا يوجد سجل دائم من قبيل «حاليًا على الدرجة 3» يمكن أن يتجاوز عمر إعادة الضبط ويُعطل التوجيه.
3. **فترة تهدئة الاتصال** — تؤدي استجابة 429 الناتجة عن الاستنفاد إلى تعيين `rateLimitedUntil` وفقًا للتراجع الأُسّي، والذي قد يتجاوز وقت إعادة الضبط الحقيقي لاتصال الخطة. تعمل `clampCooldownToReset()` ‏(`subscriptionLadder.ts`) على تقليص فترة التهدئة إلى لحظة إعادة الضبط الخاصة بالجهة الأصلية، ولا يمكنها إطالة الفترة مطلقًا. **هذه الدالة منفذة ومختبرة، لكنها لم تُربط بعد**: تُبطَل ذاكرة التخزين المؤقت للحصة في `src/sse/services/auth.ts` _قبل_ كتابة أي فترة تهدئة، ولذلك يجب التقاط `resetAt` في موضع أسبق داخل تلك الدالة — وهو تغيير في المسار الحرج للمرونة التشغيلية يستحق طلب دمج مستقلًا ومراجعًا. وحتى ذلك الحين، تنتظر إعادة الدخول انتهاء فترة تهدئة الاتصال (التي تفضّل بالفعل تلميحات `Retry-After` الواردة من الجهة الأصلية عندما يرسلها الموفّر).

### منع التذبذب

لا يُعاد قبول درجة أُعيد ضبطها للتو إلا عندما تتجاوز `reentryMinRemainingPercent` (القيمة الافتراضية 5)، بينما لا يحتاج الاتصال المستخدم بالفعل إلا إلى البقاء فوق `exitCutoffPercent` (القيمة الافتراضية 2، بما يطابق `quotaPreflight.defaultThresholdPercent`). والفجوة بينهما هي نطاق التباطؤ — فمن دونها، يتذبذب اتصال يحوم عند حد القطع بين الدرجات في الطلبات المتتالية.

## التهيئة

للضبط فقط. لا توجد عمدًا علامة `enabled`: إذ إن مفتاح تبديل قادرًا على تعطيل هذه الخيارات
سيجعل `auto/subscription` يواصل بهدوء تقديم المجموعة الكاملة — بما فيها النماذج المدفوعة — تحت
اسم يَعِد بعكس ذلك.

```jsonc
{
  "subscriptionLadder": {
    "exitCutoffPercent": 2,
    "reentryMinRemainingPercent": 5,
    "rungBudgetUsd": { "cheap": 5.0, "premium": 0 }, // تؤدي القيمة 0 إلى تعطيل إحدى الدرجات تمامًا
  },
}
```

يبقى التقييد بالميزانية غير فعّال إلى أن يتم توصيل محلّل للإنفاق: عند عدم توفر بيانات محاسبية، تُرتَّب
الدرجة المدفوعة، لكن لا يجري تقييدها مطلقًا. اعتبارًا من v3.8.51، يقبل المخطط الإعداد `rungBudgetUsd`
لكن لا يتم فرضه بعد — لذا تعامل معه على أنه تهيئة محجوزة، وليس حدًا نشطًا للإنفاق. يعمل ترتيب الدرجات، والاستنفاد المستند إلى الحصة، وإعادة الدخول بعد إعادة التعيين
جميعها من دونه.

## التركيب

`subscription` و`thrifty` هما قيمتان من `AutoTier`، لذا يمكن تركيبهما مع كل فئة:
`auto/coding:thrifty` و`auto/reasoning:subscription`، وهكذا. ويُعلَن عن المعرّفين المباشرين
(`auto/subscription` و`auto/thrifty`) في `/v1/models` ولوحة المعلومات.

لا ينتمي أيٌّ من المعرّفين إلى الفئة المدفوعة، لذا تُرجع `isPaidTierAutoId()` القيمة `false` لكليهما،
ويظل `auto/subscription` ظاهرًا عند تفعيل `hidePaidModels`.

## مواضع الشيفرة

| الجانب                                            | الملف                                               |
| ------------------------------------------------- | --------------------------------------------------- |
| حقائق الفوترة المنسّقة                            | `open-sse/config/connectionBillingCatalog.ts`       |
| المصنِّف                                          | `open-sse/services/autoCombo/connectionBilling.ts`  |
| الدرجات، وكلا التجميعين، وإعادة الدخول            | `open-sse/services/autoCombo/subscriptionLadder.ts` |
| التوصيل بمجموعة المرشحين                          | `open-sse/services/autoCombo/virtualFactory.ts`     |
| تقادم ذاكرة التخزين المؤقت المراعي لإعادة التعيين | `open-sse/services/autoCombo/freeAccessQuota.ts`    |
| واجهة الفئات                                      | `open-sse/services/autoCombo/suffixComposition.ts`  |
| المعرّفات المُعلَن عنها                           | `open-sse/services/autoCombo/builtinCatalog.ts`     |
| الاختبارات                                        | `tests/unit/autoCombo/subscription-ladder.test.ts`  |
