# Resilience Guide (العربية)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

لدى OmniRoute ثلاث آليات متميزة ولكن مترابطة للمرونة. لكل منها نطاق وغرض مختلفان. أبقِها منفصلة عند تصحيح سلوك التوجيه.

![نموذج المرونة ثلاثي الطبقات](../diagrams/exported/resilience-3layers.svg)

> المصدر: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

## 1. قاطع دائرة المزوّد

**النطاق:** المزوّد بالكامل (مثل `glm` و`openai` و`anthropic`).

**الغرض:** إيقاف إرسال حركة المرور إلى مزوّد يتعرض لإخفاقات متكررة على مستوى المنبع/الخدمة.

**التنفيذ:**

- الفئة الأساسية: `src/shared/utils/circuitBreaker.ts`
- الربط: `src/sse/handlers/chatHelpers.ts`، `src/sse/handlers/chat.ts`
- واجهة API للحالة: `GET /api/monitoring/health`
- واجهة API لإعادة الضبط: `POST /api/resilience/reset`
- الأغلفة: `open-sse/services/accountFallback.ts`
- جدول قاعدة البيانات: `domain_circuit_breakers`

**الحالات:**

- `CLOSED` — يُسمح بحركة المرور العادية
- `DEGRADED` — لا تزال حركة المرور مسموحًا بها، ولكن يجري تتبع الزيادة في إخفاقات المزوّد
- `OPEN` — المزوّد محظور مؤقتًا؛ يتخطاه التوجيه المركّب
- `HALF_OPEN` — انقضت مهلة إعادة الضبط؛ يُسمح بطلب اختباري

**الإعدادات الافتراضية القابلة للتهيئة (`open-sse/config/constants.ts`، والمتاحة في لوحة المعلومات → الإعدادات → المرونة):**

| الفئة     | دخول الحالة المتدهورة عند | الفتح عند  | مهلة إعادة الضبط |
| --------- | ------------------------- | ---------- | ---------------- |
| OAuth     | 5 إخفاقات                 | 8 إخفاقات  | 60s              |
| مفتاح API | 7 إخفاقات                 | 12 إخفاقًا | 30s              |
| محلي      | مشتق                      | إخفاقان    | 15s              |

يتحكم `degradationThreshold` في وقت دخول المزوّد إلى الحالة `DEGRADED`؛ ويتحكم `failureThreshold` في وقت فتح الدائرة وتخطيه. لا تظهر ملفات تعريف المزوّد المحلي في صفحة إعدادات المرونة حتى الآن.

**رموز التفعيل:** حالات مستوى المزوّد فقط `[408, 500, 502, 503, 504]`. لا تُفعّل القاطع لأخطاء مستوى الحساب (معظم أخطاء 401/403/429 — فهي تندرج ضمن فترة التهدئة أو القفل).

**الاسترداد الكسول:** عند انتهاء مدة `OPEN`، تحدّث `getStatus()` و`canExecute()` و`getRetryAfterMs()` الحالة إلى `HALF_OPEN`. لا حاجة إلى مؤقت يعمل في الخلفية.

---

### فترة تهدئة عامة اختيارية للمزوّد (بوابة النافذة)

تحتفظ طبقة رابعة **اختيارية** (`PROVIDER_COOLDOWN_ENABLED`، معطّلة **افتراضيًا**) بذاكرة مشتركة بين الطلبات للمزوّدين المتعثرين في
`open-sse/services/providerCooldownTracker.ts`، ويرجع إليها حل أهداف التوجيه المركّب كي تتوقف الطلبات المركّبة المتتالية عن إعادة تجربة مزوّد أخفق للتو. تراعي إدخالات مستوى المزوّد بوابة النافذة `PROVIDER_PROFILES`:

| ملف التعريف | تُفعّل بعد (`providerFailureThreshold`) | خلال (`providerFailureWindowMs`) | تُهدّأ لمدة (`providerCooldownMs`) |
| ----------- | --------------------------------------: | -------------------------------: | ---------------------------------: |
| OAuth       |                                    `10` |                          `15min` |                             `5min` |
| مفتاح API   |                                    `15` |                          `30min` |                            `10min` |

دون الحد، لا يُعد المزوّد في حالة تهدئة؛ ويؤدي النجاح إلى مسح النافذة. تحتفظ إدخالات مستوى الاتصال (`provider:connectionId`) بدلًا من ذلك بالتراجع الأُسّي `minRetryCooldownMs → maxRetryCooldownMs`. التجاوزات:
`OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`.
اختبار منع الانحدار: `tests/unit/provider-cooldown-window-gate.test.ts`.

## 2. فترة تهدئة الاتصال

**النطاق:** اتصال/حساب/مفتاح واحد لمزوّد الخدمة.

**الغرض:** تجاوز مفتاح واحد معطّل، مع استمرار الاتصالات الأخرى لمزوّد الخدمة نفسه في تقديم الخدمة.

**التنفيذ:**

- وضع علامة غير متاح: `src/sse/services/auth.ts::markAccountUnavailable()`
- الاختيار: `getProviderCredentials*` في الملف نفسه
- حساب فترة التهدئة: `open-sse/services/accountFallback.ts::checkFallbackError()`
- الإعدادات: `src/lib/resilience/settings.ts`

**الحقول لكل اتصال:**

- `rateLimitedUntil` — الطابع الزمني لانتهاء فترة التهدئة
- `testStatus: "unavailable"`
- `lastError`، و`lastErrorType`، و`errorCode`
- `backoffLevel` — عدّاد التراجع الأُسّي

**فترات التهدئة الافتراضية:**

- الأساس لـ OAuth: ‏5 ثوانٍ
- الأساس لمفتاح API: ‏3 ثوانٍ
- الحالة 429 لمفتاح API: تُفضّل قيمة `Retry-After` الواردة من المنبع/ترويسات إعادة الضبط/نص إعادة الضبط القابل للتحليل
- التراجع: `baseCooldownMs * 2 ** failureIndex`

**آلية منع الاندفاع المتزامن:** تمنع حالات الفشل المتزامنة من إطالة فترة التهدئة أكثر من اللازم أو زيادة `backoffLevel` مرتين.

**الحالات النهائية (ليست فترات تهدئة):**

- `banned` — تُعيَّن عند اكتشاف كلمة محظورة/حظر حساب (راجع [BAN_DETECTION](../security/BAN_DETECTION.md))، وكذلك بعد ثلاث حالات رفض متتالية من المنبع لكل طلب (`request_rejected`، مثل خطأ Anthropic OAuth ‏403 "الطلب غير مسموح" — `open-sse/services/requestRejectedStreak.ts`)؛ لا يؤدي الرفض الواحد إلا إلى وضع الاتصال في فترة تهدئة
- `expired` (تنتقل إلى حالة نهائية بعد عدد محدود من المحاولات — `EXPIRED_RETRY_MAX = 3` مع تراجع أُسّي — كي تتمكن أخطاء OAuth العابرة من إصلاح نفسها قبل إلغاء تنشيط الحساب نهائيًا)
- `credits_exhausted`

تستمر هذه الحالات إلى أن تتغير بيانات الاعتماد أو يعيد أحد المشغّلين ضبطها. لا تستبدل الحالات النهائية بحالة تهدئة عابرة.

**الاسترداد الكسول:** عندما يصبح `rateLimitedUntil` في الماضي، يصبح الاتصال مؤهلًا مرة أخرى. وعند الاستخدام الناجح، يمسح `clearAccountError()` جميع حقول الأخطاء.

### حاجز استخدام Claude OAuth: مسار أقل أولوية + إعادة ضبط حد الجلسة

**النطاق:** اتصال واحد لاشتراك Claude ‏(OAuth). تتطلب كلتا الميزتين **تفعيلًا اختياريًا لكل
اتصال** (تعديل الاتصال ← قسم Claude ← ‏`lowPriorityMode` / ‏`autoLimitReset` ضمن
`providerSpecificData`، وكلاهما معطّل افتراضيًا)، وتحاكيان الأمرين `/low-priority` و
`/limit-reset` في Claude Code (عقد الاتصال مأخوذ من Claude Code 2.1.263).

**التنفيذ:**

- آلة الحالات + تصنيف الاستجابة: `open-sse/services/claudeLowPriority.ts`
- عميل حالة/مطالبة إعادة الضبط: `open-sse/services/claudeLimitReset.ts`
- خطّاف المنفّذ (حقن الترويسة + إعادة المحاولة بالحساب نفسه): `open-sse/executors/base.ts::execute()`
- حفظ التفعيل الاختياري: `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**المُشغِّل:** حاجز الاستخدام لمدة 5 ساعات — استجابة `429` تحمل ترويساتها
`anthropic-ratelimit-unified-status: rejected`، وعندما يكون الحساب مؤهلًا،
`anthropic-ratelimit-unified-slow-offer: treatment`. لا يُرسل شيء قبل أول استجابة 429
لهذا الحاجز؛ أما استجابة 429 اندفاعية من دون ترويسات موحّدة، فتمر عبر مسار التهدئة المعتاد.

**المسار الأقل أولوية** (`lowPriorityMode`):

- عند استجابة 429 الخاصة بالحاجز، يقبل المنفّذ العرض ويعيد المحاولة فورًا باستخدام الحساب
  **نفسه** مع `anthropic-usage-limit: slow`؛ ويظل المسار نشطًا حتى موعد
  `anthropic-ratelimit-unified-reset` المُعلَن (+60 ثانية كهامش سماح)، وتحمل كل الطلبات
  ضمن تلك النافذة هذه الترويسة. لا تصل استجابة 429 التي تم اعتراضها إلى `handleChatCore`،
  ولذلك لا يُوضع الاتصال في فترة تهدئة ولا يجري التبديل عنه.
- ترويسة `anthropic-ratelimit-unified-slow-status` في الاستجابات اللاحقة: تُبقي القيمتان
  `active` / `not_needed` المسار قائمًا؛ أما `slot_busy` ‏(429) أو `529` فتنتظر المدة المحددة
  في `anthropic-ratelimit-unified-slow-retry-after` من الخادم (الافتراضي 20 ثانية، مع حصر
  بين 5 و600 ثانية، وتذبذب ±30%) ثم تعيد المحاولة، ضمن حد
  `anthropic-ratelimit-unified-slow-max-wait` (الافتراضي 20 دقيقة، مع حصر بين دقيقة واحدة
  و6 ساعات) — وبعد تجاوزه ينتهي المسار، وتمنع فترة توقف مدتها 10 دقائق إعادة القبول. كما
  تُحَد مدة الانتظار بما تبقى من مهلة بدء المنبع الخاصة بالطلب
  (`resolveFetchStartTimeout`، ومدتها الافتراضية 10 دقائق) مطروحًا منها هامش 5 ثوانٍ: فمن
  دون هذا الحد، ستتجاوز مدة الانتظار القصوى الافتراضية البالغة 20 دقيقة عمر الطلب، وسيُلغى
  السكون في منتصف الانتظار، ما يؤدي إلى ظهور `TimeoutError` بدلًا من النهاية السلسة
  `max_wait` + فترة التوقف.
- تنهي الحالات `weekly_limit` / `budget_exhausted` / `off` / `ineligible`، أو بدء نافذة
  5 ساعات جديدة، أو `ineligible` + ‏`anthropic-ratelimit-unified-overage-in-use: true`
  (ما ينهيها بوصفها `extra_usage` مع أي حالة، لأن الاستخدام الإضافي المدفوع يغطي الحاجز
  الآن) المسار؛ ثم تمر الاستجابة إلى مسار التهدئة المعتاد. تُحفَظ حالة `budget_exhausted`
  حتى موعد إعادة ضبط الميزانية المُعلَن (≤ 8 أيام).
- يعمل فحص الحاجز بعد عمليات إعادة المحاولة داخل المحاولة نفسها التي ينفذها المنفّذ استجابةً
  لأخطاء 400 (تحرير السياق، وضبط حدود التفكير/الجهد، والتعلّم التلقائي للمعاملات)، ولذلك
  تظل استجابة 429 الخاصة بالحاجز، التي لا تظهر إلا في إحدى عمليات إعادة المحاولة تلك،
  معترضة بدلًا من وصولها إلى مسار التهدئة.
- تُحفَظ الحالة في الذاكرة لكل اتصال (تؤدي إعادة التشغيل إلى استجابة 429 إضافية واحدة
  للحاجز من أجل إعادة القبول).

**إعادة ضبط حد الجلسة** (`autoLimitReset`، تُجرَّب قبل المسار عند تفعيل كليهما):

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` ← كتلة `juniper_tide`؛
  وعندما تكون `arm: "reset"` و`available: true`،
  يُرسل `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits` مع
  `{ "program": "juniper_tide" }` (معرّف UUID للمؤسسة من
  `providerSpecificData.organizationUUID`، مع استخدام قيمة التهيئة الأولية كخيار احتياطي).
- تؤدي `result: reset|not_limited` إلى إعادة محاولة الطلب بالسرعة الكاملة (من دون ترويسة
  الإبطاء). تحفظ `already_used` / `not_offered` قيمة `next_available_at` مؤقتًا (الافتراضي
  أسبوع واحد)؛ ويؤدي أي فشل إلى تراجع لمدة 15 دقيقة. تتاح إعادة الضبط مرة واحدة أسبوعيًا،
  وتظل محسوبة ضمن الحد الأسبوعي.

اختبارات منع التراجع: `tests/unit/claude-low-priority-mode.test.ts`،
`tests/unit/claude-limit-reset.test.ts`، `tests/unit/claude-low-priority-executor.test.ts`.

### ثبات الجلسة (#7274)

**النطاق:** جلسة عميل واحدة (ترويسة `X-Session-Id` / ‏`x-codex-session-id` / ‏`x-omniroute-session`) مثبّتة على اتصال واحد، لدى **أي** مزوّد خدمة.

**الغرض:** إبقاء وكيل متعدد الجولات (Claude Code، وaider، والوكلاء المخصصين) على الحساب نفسه عبر الطلبات، مما يقلل فقدان السياق الناتج عن الانتقال بين الحسابات وتكرار أخطاء 429 عند البدء البارد لدى موفري الخدمة الذين يحتفظون بحالة جلسة خاصة بكل حساب.

**التنفيذ:**

- تحديد TTL: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- تحديد/إنشاء التثبيت: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- استخراج الترويسة (عام، لأي موفر): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- جدول التثبيت الدائم: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- الإعداد: `sessionAffinityTtlMs` (مدة TTL عامة بالمللي ثانية، والقيمة `0` تعطلها) — `src/lib/db/settings.ts`. أُعيدت تسميته من الإعداد الخاص بـ Codex فقط، وهو `codexSessionAffinityTtlMs`، بواسطة عملية الترحيل `124_generic_session_affinity_ttl.sql`، التي تنقل أي قيمة TTL سبق تكوينها لـ Codex لتصبح القيمة الافتراضية الجديدة.

قبل #7274، كانت `resolveSessionAffinityTtlMs()` تُرجع `0` مباشرة لكل موفر باستثناء `codex`، ولذلك لم يكن لإعداد TTL (ولا لترويسات الجلسة) أي تأثير في أي موضع آخر، رغم أن آلية التثبيت واستخراج الترويسات كانا بالفعل غير مرتبطين بموفر بعينه. أزال الإصلاح ذلك الإرجاع المبكر؛ وأصبحت قيمة TTL تُطبَّق الآن بصورة موحدة على كل موفر بمجرد ضبطها عالميًا على قيمة أكبر من `0`.

لا تُمرَّر ترويسات تقارب الجلسة الثلاث إلى المنبع مطلقًا — إذ تنشئ المنفِّذات ترويسات المنبع الخاصة بها من الصفر بدلًا من تمرير ترويسات العميل، ولذلك تظل هذه مجرد معرّف ارتباط داخلي.

### عقود إيجار حصرية لاتصالات الجلسات المُدارة

**النطاق:** يمتلك عميل/جلسة HTTP مُدارة نشطة واحدة اتصال OmniRoute مؤهلًا واحدًا.

**الغرض:** توفير ملكية حصرية ودائمة للاتصال للعملاء الذين يحتاجون إلى حاجز توجيه صارم
عبر الطلبات. يختلف هذا عن تقارب الجلسة، الذي يُعد تفضيلًا مرنًا للاستمرارية:
إذ يحتفظ عقد الإيجار الحصري بحالة دورة الحياة في SQLite، ويفرض تفرد المالك النشط
والاتصال النشط على المستوى العام، ويرفض الجيل القديم قبل الإرسال إلى موفر الخدمة.

تُفعَّل الميزة اختياريًا لكل مفتاح API. يجب أن يمتلك المفتاح المُدار نطاق `lease:exclusive`
وقائمة `allowedConnections` صريحة وغير فارغة. يمكن لأي عميل HTTP استخدام نقطة نهاية دورة الحياة؛ ولا
يلزم اسم عميل أو وكيل مستخدم أو موفر أو طريقة OAuth أو نموذج. يمتلك عقد الإيجار اتصالًا،
وليس نموذجًا، ولذلك فإن تغيير النموذج يُبقي الارتباط قائمًا ما دام الاتصال مؤهلًا
وفق الشروط المعتادة. تظل قواعد النموذج والحصة والصحة وفترة التهدئة وقائمة السماح المعتادة هي المرجع الحاكم، وقد
تنقل الجيل نفسه إلى اتصال مؤهل آخر متاح.

تتم إدارة دورة الحياة عبر `POST /api/v1/session-leases` باستخدام إجراءات JSON التالية: `acquire` و`renew` و`release`.
تُرسل طلبات الاستدلال المُدارة القيمة المبهمة `X-OmniRoute-Lease-Owner` والقيمة المطابقة تمامًا
`X-OmniRoute-Lease-Generation`. يبدأ المالك بـ `vlo_` متبوعًا بـ 43 محرفًا من base64url؛ ولا
تُخزَّن سوى قيمة تجزئة SHA-256 الخاصة به. يربط كل حاجز إرسال نهائي أيضًا معرّف مفتاح API المصادَق عليه
ومعرّف الاتصال النشط. تُزال ترويسات التحكم بعقد الإيجار من السجلات ولقطات الطلبات المحفوظة
وترويسات منفِّذات المنبع.

إذا كان التوجيه المعتاد يحتوي على مرشحين مُدارين مؤهلين، لكن كل مرشح متاح مشغول بعقد إيجار
نشط أجنبي، فإن OmniRoute يُرجع HTTP `429`، والرمز `lease-capacity-unavailable`، وحالة
انتظار للسعة، وقيمة `Retry-After` محدودة مشتقة من أقرب وقت انتهاء ذي صلة.
أما عدم وجود أهلية وفق التوجيه المعتاد فلا يُعد تنازعًا على عقد إيجار، ويحتفظ بدلالات أخطاء التوجيه الحالية.

تظل الآليات ذات الصلة منفصلة:

- إشغال جلسات OAuth هو توزيع مرن محلي للعملية لحسابات OAuth.
- تمنح إشارات الحساب تصاريح تزامن الطلبات وتنتهي عند اكتمال الطلب.
- عقود الإيجار الحصرية للجلسات المُدارة هي ملكية دائمة لدورة الحياة مع حاجز للجيل.

---

## 3. حظر النموذج

**النطاق:** ثلاثية المزوّد + الاتصال + النموذج.

**نطاق المفتاح حسب الحالة:** تحدد الحالة التي تفشل المفتاح الذي يُكتب إليه الحظر
(`resolveLockoutScope()` في `open-sse/services/accountFallback/exactModelLock.ts`):

- `429` / `403` / `402` — إشارة حصة أو استحقاق — تحظر **عائلة الحصة**:
  بالنسبة إلى codex، نطاق `codex` / `spark` بأكمله (كل نموذج `gpt-5*` ضمن
  الاتصال)، وبالنسبة إلى المزوّدين الآخرين `getQuotaScopedModelForProvider()`.
- تحظر `404` النموذج المجرد (`getModelLockKey()` يضيّق نطاق `not_found`).
- أي حالة أخرى — أعطال النقل/الخادم `5xx` وحالة `502` التي تنشئها OmniRoute
  بنفسها من التحقق من الجودة — تحظر فقط ثلاثية
  المزوّد/الاتصال/النموذج **المحددة بدقة**. لا يُعد التدفق السيئ في نموذج واحد
  دليلًا على حصة الحساب؛ فقبل هذه القاعدة، كانت استجابة فارغة واحدة من
  `codex/gpt-5.6-luna` تزيل كل نموذج `gpt-5*` ضمن ذلك الاتصال من التوجيه لمدة
  2–30 دقيقة (مع تصعيد المدة)، بينما تظل حصته دون تغيير.
- يتقدم دائمًا خيار `scope` الصريح الذي يمرره المستدعي (تمرر Antigravity القيمة `"exact"`).

**الغرض:** تجنب تعطيل اتصال كامل عندما لا يتوفر سوى نموذج واحد أو عندما يكون مقيّدًا بالحصة.

**أمثلة:**

- مزوّدو الحصص لكل نموذج الذين يعيدون 429
- المزوّدون المحليون الذين يعيدون 404 لنموذج واحد مفقود
- إخفاقات أذونات الوضع/النموذج الخاصة بالمزوّد (مثل أوضاع Grok)

**التنفيذ:** `open-sse/services/accountFallback.ts` — `lockModel()`، و`clearModelLock()`، و`getAllModelLockouts()`.

### لوحة معلومات فترات تهدئة النماذج (v3.8.0)

واجهة المستخدم: الإعدادات ← فترات تهدئة النماذج (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

تسرد حالات الحظر النشطة مع: المزوّد، والاتصال، والنموذج، والسبب، وexpiresAt. يمكن للمشغّلين إعادة تمكين نموذج يدويًا من البطاقة.

**واجهة REST API:**

- `GET /api/resilience/model-cooldowns` — تسرد حالات الحظر النشطة
- `DELETE /api/resilience/model-cooldowns` — إعادة تمكين يدوية. النص: `{provider, connection, model}`. المصادقة: الإدارة.

### واجهة إعدادات الحظر + الاسترداد بالتناقص عند النجاح (v3.8.23)

انتقل حظر النموذج من سلوك مشفّر بشكل ثابت ودائم التشغيل إلى ميزة قابلة
للتهيئة بالكامل وتتطلب التفعيل، مع بطاقة إعدادات خاصة بها ومسار استرداد ذاتي الإصلاح.

**بطاقة الإعدادات:** الإعدادات ← حظر النموذج
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`).
وهي **مختلفة** عن `ModelCooldownsCard` المخصصة للقراءة فقط أعلاه (والتي لا تفعل سوى
_سرد_ حالات الحظر النشطة) — إذ تقوم البطاقة الجديدة _بتهيئة المعلمات_. توجد القيم الافتراضية
في `DEFAULT_MODEL_LOCKOUT_SETTINGS`
(`src/lib/resilience/modelLockoutSettings.ts`):

| الإعداد                 | القيمة الافتراضية                | المعنى                                                     |
| ----------------------- | -------------------------------- | ---------------------------------------------------------- |
| `enabled`               | `false`                          | مفتاح التبديل الرئيسي — حظر النموذج **متوقف افتراضيًا**.   |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | حالات المصدر الأعلى التي تُحتسب كإخفاق على نطاق النموذج.   |
| `baseCooldownMs`        | `120_000` (120 ث)                | مدة الحظر الأولية للإخفاق الأول.                           |
| `maxCooldownMs`         | `1_800_000` (30 دقيقة)           | الحد الأقصى لفترة التهدئة بعد تصعيدها.                     |
| `maxBackoffSteps`       | `10`                             | الحد الأقصى لخطوات تصعيد التراجع الأُسّي.                  |
| `useExponentialBackoff` | `true`                           | ما إذا كانت الإخفاقات المتكررة تصعّد فترة التهدئة أُسّيًا. |

تستمر الإعدادات عبر مخزن الإعدادات المعتاد ويُتحقق من صحتها عبر مخطط إعدادات
المرونة؛ وتقيّد البطاقة `baseCooldownMs`/`maxCooldownMs`
(بحيث `maxCooldownMs ≥ baseCooldownMs`) و`maxBackoffSteps`.

**الاسترداد بالتناقص عند النجاح:** لا يعتمد الاسترداد **فقط** على انتهاء المؤقت. تؤدي
الاستجابة السليمة إلى خفض عدد إخفاقات النموذج تدريجيًا، بحيث يتوقف النموذج الذي تعافى
في منتصف النافذة عن التصعيد (ويُرفع حظره) قبل انتهاء مؤقته. عند نجاح هدف
مركّب، تستدعي `open-sse/services/combo.ts` الدالة `decayModelFailureCount()`
(`open-sse/services/accountFallback.ts`)، التي **تنصّف** قيمة
`failureCount` المخزنة (`Math.floor(failureCount / 2)`)؛ وعندما تصل إلى `0` يُحذف
إدخال الحظر بالكامل. وتزيد الدالة المقابلة `recordModelLockoutFailure()`
العدد (وتصعّد فترة التهدئة) عند حدوث إخفاقات ضمن
نافذة التصعيد. يأتي هذا التناقص عند النجاح بالإضافة إلى انتهاء المؤقت العادي —
ويمكن لأي من المسارين إعادة تمكين النموذج.

**الحالة:** تُحتفظ بحالات الحظر **في الذاكرة** (كائنات `Map` خاصة بكل عملية من
`ModelLockoutEntry` ومفاتيحها بالصيغة `provider:connectionId:model`، وأقفال النطاق الدقيق بالصيغة
`provider:connectionId:exact:model`)، ولا تُحفظ في
قاعدة البيانات — وتُفقد عند إعادة التشغيل. أما _الإعدادات_ فتُحفظ؛ في حين أن
_حالة_ الحظر النشطة مؤقتة.

---

## 4. التحكم في التزامن ضمن مشاركة الحصة (v3.8.36)

غالبًا ما تقبل حسابات الاشتراك (GLM وMiniMax وغيرها) نحو 1–3 طلبات متزامنة فقط؛ ويؤدي تجاوز ذلك إلى أخطاء 429 وفترات تهدئة. وتشتد هذه المشكلة مع تركيبات **مشاركة الحصة** (`qtSd/…`)، حيث تشترك عدة مفاتيح API في حساب واحد لدى المزوّد الخارجي. تمنع ثلاث طبقات إغراق الحساب المشترك بالطلبات.

### الحد الأقصى للتزامن لكل اتصال (`max_concurrent`)

يمكن لكل اتصال بمزوّد تحديد سقف `max_concurrent`
(`provider_connections.max_concurrent`، ويُضبط في نافذة الاتصال / API / DB).
اتركه فارغًا لعدم فرض حد. هذا هو الإعداد الوحيد الذي يتحكم في طبقة التسلسل أدناه — اضبطه وفق التزامن الفعلي للحساب (مثلًا GLM نحو 1، وMiniMax نحو 2).

### تسلسل طلبات مشاركة الحصة

عندما يستهدف توجيه مشاركة الحصة اتصالًا يحدد قيمة موجبة لـ
`max_concurrent`، تُسلسَل الطلبات المتزامنة المرسلة إلى ذلك **الحساب** عبر إشارة تزامن خاصة بكل اتصال (المفتاح `qsconn:<connectionId>`): تنتظر الطلبات الزائدة **في قائمة الانتظار** بدلًا من إغراق الحساب. وتعتمد الآلية نهج **السماح عند الفشل** — إذ تتابع قائمة الانتظار المشبعة أو المنتهية مهلتها التنفيذ دون خانة بدلًا من رفض طلب قابل للتوجيه. يمكنك تبديلها من **الإعدادات ← المرونة ← التزامن لكل اتصال في مشاركة الحصة**
(`resilienceSettings.quotaShareConcurrencyLimit.enabled`، مفعّل افتراضيًا).
في غياب حد `max_concurrent`، يظل السلوك دون تغيير.

> إن بوابة توجيه مشاركة الحصة (`selectQuotaShareTarget`، ‏DRR + P2C) نفسها
> تعتمد نهج السماح عند الفشل، ولا تفعل سوى _خفض أولوية_ اتصال بلغ حده الأقصى — ومع
> مجموعة تتضمن اتصالًا واحدًا، لا يمكنها فرض حد صارم، لذا فإن إشارة التزامن هذه هي التي
> تحتوي تدفق الطلبات فعليًا.

### إعادة المحاولة مع مراعاة فترة تهدئة التركيبة

بالنسبة إلى كل استراتيجية تركيبة (عند تمكينها)، فإن الطلب الذي كان سيؤدي بشكل حتمي إلى خطأ 429 بسبب فترة تهدئة انتقالية قصيرة ينتظر انتهاءها ثم يُعاد توجيهه بدلًا من
إرجاع الخطأ 429 — ويغطي ذلك نوافذ TPM/RPM لفئة Gemini (قيمة retry-after تبلغ نحو 60 ثانية)
في التركيبات متعددة النماذج، مثل بلوغ كلا الهدفين في تركيبة من نموذجين حد المعدل الخاص بكل نموذج.
تخضع العملية لحدود `comboCooldownWait` (`enabled` و`maxWaitMs` و`maxAttempts`
و`budgetMs`) في **الإعدادات ← المرونة**. ولا تنتظر مطلقًا عند `quota_exhausted`
(مقفل حتى منتصف الليل) أو لأسباب المصادقة/عدم العثور.

---

## 5. التحكم في قبول طابور الطلبات (v3.8.49 · المشكلة #6593)

**النطاق**: طابور تحديد المعدّل المحلي لكل مزوّد+اتصال (`open-sse/services/rateLimitManager.ts`،
والمدعوم بواسطة Bottleneck)، وهو طبقة واحدة أسفل الآليات الثلاث المذكورة أعلاه.

**يحدّد `maxWaitMs` مدة الانتظار في الطابور؛ ويحدّد `executionMaxWaitMs` مدة التنفيذ.**
الاثنان منفصلان عمدًا، ولا يؤثر أيّ منهما في الآخر.

يمثّل `resilienceSettings.requestQueue.maxWaitMs` **ميزانية انتظار الطابور**: فهو
يشمل انتظار خانة متاحة لدى المزوّد، ثم البقاء في حالة QUEUED، ويُلغى مؤقّته
بمجرد مغادرة المهمة حالة QUEUED وبدء تنفيذها
(`rateLimitManager.ts`، ‏`wrappedFn`). الطلب الذي يتجاوز هذه المدة لا يصل مطلقًا
إلى الخدمة الأولية. القيمة الافتراضية هي 30000ms، وتوفّرها
`DEFAULT_REQUEST_QUEUE_MAX_WAIT_MS`
في `src/lib/resilience/settings.ts`، كما يثبّتها الاختبار
`tests/unit/ratelimit-admission-control-6593.test.ts`، ولذلك فإن تغييرها يؤدي
إلى فشل ذلك الاختبار بدلًا من أن تصبح هذه الفقرة قديمة دون تنبيه.

أما `resilienceSettings.requestQueue.executionMaxWaitMs` فهي القيمة التي
يتلقّاها Bottleneck بوصفها `expiration` للمهمة، ولا يبدأ مؤقّتها إلا بعد
الإرسال. وهي آلية احتياطية للمنفّذات التي لا تملك مهلة انتهاء خاصة بها عند
التعامل مع الخدمة الأولية، وتُرفع إلى مهلة بدء الجلب الخاصة بالمنفّذ عندما
تكون الأخيرة أطول، بحيث لا تقطع استجابة سليمة قيد التنفيذ. القيمة الافتراضية
هي 600000ms (10 دقائق).

كان تمرير ميزانية الطابور إلى `expiration` هو ما يتسبّب سابقًا في إنهاء
البوابات غير التزايدية أثناء التنفيذ — إذ تعمل بصورة مشروعة لدقائق قبل وصول
أول وحدات البايت — ولهذا يظهر انتهاء الصلاحية بالصيغة `code:
"RATE_LIMIT_EXECUTION_TIMEOUT"` ‏(HTTP 504)، بينما تحمل ميزانية الطابور رمز
انتهاء مهلة الطابور. يمكن تجاوز أيٍّ منهما عبر `RATE_LIMIT_MAX_WAIT_MS` /
`RATE_LIMIT_EXECUTION_MAX_WAIT_MS` (متغيّرات البيئة)، أو من لوحة التحكم
(**الإعدادات ← المرونة**). تُقيّد القيمتان ضمن النطاق 1ms–24h عند تسويتهما.

**الأسبقية لكليهما:** لا يوفّر متغيّر البيئة سوى القيمة _الافتراضية_. تتغلّب
عليه أي قيمة محفوظة في `resilienceSettings.requestQueue` (عبر لوحة التحكم /
تصحيح API، ومخزّنة في `key_value`)، وتتغلّب عليها بدورها قيمة
`rateLimitOverrides.maxWaitMs` / `.executionMaxWaitMs` الخاصة بالاتصال.
لذلك، فإن ضبط متغيّر البيئة في نشر يحتوي مسبقًا على قيمة محفوظة لا يغيّر
شيئًا — امسح الإعداد المحفوظ أو حدّثه بدلًا من ذلك.

تُقيَّد مدة البقاء في الطابور بواسطة `maxWaitMs`؛ بينما يحدّد
`maxQueueDepth` أدناه عدد المستدعين الذين يمكن وضعهم في الطابور في الوقت نفسه.

**`maxQueueDepth` — حدّ قبول اختياري (جديد).** يحدّد `resilienceSettings.requestQueue.maxQueueDepth`
عدد الطلبات التي يمكن أن تبقى في الطابور (دون إرسالها بعد) لمزوّد+اتصال واحد
في الوقت نفسه. عندما يحتوي الطابور بالفعل على `maxQueueDepth` من الطلبات،
يُرفض الطلب الجديد سريعًا بخطأ ذي نوع محدّد
`code: "RATE_LIMIT_QUEUE_FULL"` **قبل** أن يصل مطلقًا إلى `limiter.schedule()`
— وبذلك يكون الرفض منخفض التكلفة ويحدث قبل أي عمل لاحق لضغط الموجّه / الترجمة
لذلك الطلب. القيمة الافتراضية `0` = معطّل، مما يحافظ على سلوك الطابور الحالي
غير المحدود؛ والنطاق المقيّد هو 0–100000. يمكن التجاوز عبر
`RATE_LIMIT_MAX_QUEUE_DEPTH` (متغيّر البيئة)، أو
`resilienceSettings.requestQueue.maxQueueDepth` (تصحيح لوحة التحكم/API).

فحص القبول نفسه هو دالة خالصة
(`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`)، ولذلك
يمكن اختباره على مستوى الوحدة دون محدّد Bottleneck حقيقي.

> اقترح RFC الذي فتح المشكلة #6593 أيضًا علامة `bypassCompressionOnRateLimit`.
> يمثّل مسار `open-sse/services/compression/` في هذا المستودع ضغط
> الموجّه/السياق في طلب LLM الصادر (`chatCore.ts`،
> حول كتلة `resolveCompressionSettings`/`selectCompressionStrategy`)،
> وليس ضغط استجابة HTTP لنصوص 429 المنشأة — ولا يوجد مسار برمجي مطابق لعلامة
> تجاوز حرفية. كما أن خطوة ضغط الموجّه هذه تعمل حاليًا _قبل_ `withRateLimit()`
> في مسار معالجة الطلب، ولذلك فإن إعادة الترتيب لتجاوزها عند رفض امتلاء الطابور
> تمثّل تغييرًا منفصلًا وأكبر من نطاق هذه المشكلة؛ وقد تقرّر عمدًا **عدم**
> تنفيذها هنا، وتُركت كمتابعة لاحقة إذا كان مكسب توفير موارد CPU يستحق مخاطر
> إعادة الترتيب.

---

## 6. آلية مراقبة إنتاجية التدفق البطيء (#9709)

تكتشف آلية الحماية الاختيارية `resilienceSettings.streamRecovery.throughputWatchdog`
أي مصدر علوي يواصل إرسال المقاطع، لكنه ينتج مخرجات للمساعد بمعدل أدنى من
معدل المخرجات المفيدة المُهيأ. وهي منفصلة عمدًا عن مهلة الخمول:
فإشارات النبض والبيانات الوصفية لا تعيد ضبط أي من المؤقتين ولا تُحتسب كتقدم. كما أنها
منفصلة عن الموعد النهائي الصارم للمحاولة (#9153)، الذي يظل حدًا أقصى مطلقًا
للأمان بغض النظر عن جودة المخرجات.

تتطلب آلية المراقبة فترة إحماء تتبعها نافذة متحركة مكتملة قبل أن
تتمكن من الإلغاء. وهي تحسب فروق النص من أحداث مخرجات Chat Completions وResponses API
(بوصفها تقديرًا بديلًا متحفظًا لعدد بايتات UTF-8)، وتتجاهل الأحداث الفارغة والأحداث التي
تتضمن الاستخدام فقط، وتعلّق التقييم أثناء معالجة أحداث استدعاء الأدوات أو الاستدلال. وهي معطلة
افتراضيًا ويمكن تمكينها باستخدام `STREAM_THROUGHPUT_WATCHDOG_ENABLED=true`؛ وتخضع
النافذة وفترة الإحماء والحد الأدنى للمعدل والحد الأدنى للمخرجات القابلة للقياس لحدود
طبقة تسوية إعدادات المرونة العادية.

عند تمكينها، لا يُطبّق إلغاء آلية المراقبة إلا على محاولة المصدر العلوي النشطة. وقبل
إرسال أي بايتات مرئية للعميل، قد يعيد مسار الاسترداد المبكر الحالي للحساب نفسه
فتح المحاولة. وبعد الالتزام، لا يُعاد تشغيل التدفق عشوائيًا مطلقًا؛ ولا يستطيع وصل لاحقة
إلا عقد الاستمرار الآمن الحالي في منتصف التدفق. ويظل الإنهاء
وحيد التنفيذ، لذلك لا تتكرر محاسبة الاستخدام ولا تحرير الإشارة.

---

## 7. إعادة صياغة حالة المصدر العلوي (أخطاء الحصة ذات الحالة المضللة)

**النطاق:** بوابة علوية واحدة تُبلغ عن نفاد مؤقت للحصة باستخدام حالة HTTP خاطئة.

**الغرض:** تصحيح حالة مضللة قبل التصنيف، بحيث يرى المستهلكون اللاحقون (محرك الرجوع الاحتياطي، وتجميع الدمج، والاستجابة الموجّهة إلى العميل) الطبيعة الحقيقية القابلة لإعادة المحاولة للفشل.

تشير بعض البوابات إلى نفاد مؤقت للحصة باستخدام حالة HTTP
غير قابلة لإعادة المحاولة. يعيد `agentrouter.org` الحالة `403` (وأحيانًا `400`) مع نص صيني
(`用户额度不足` / `额度不足`) بدلًا من الحالة القياسية `429`. تتعامل عملاء مثل Claude
Code مع `403` باعتبارها حالة دائمة وتُلغي الجلسة، ومن دون التصحيح
سيصنّفها محرك الرجوع الاحتياطي على أنها `AUTH_ERROR` بدلًا من حدث
متعلق بالحصة.

**التنفيذ:**

- السجل + المطابق: `open-sse/config/upstreamStatusRestatement.ts` — قائمة
  قواعد لكل مزود (`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`)، تُطابق عبر `applyStatusRestatement()`.
- موضع الاستدعاء: كتلة `providerFailure:` في `open-sse/handlers/chatCore.ts`
  (بالقرب من السطر 3654)، مباشرة بعد أن تحلل `parseUpstreamError()` استجابة علوية
  ذات حالة HTTP تشير إلى خطأ (`!providerResponse.ok`)، وقبل تشغيل أي
  تصنيف، بحيث يرى كل مستهلك لاحق الحالة
  المصححة. أما الأخطاء المضمّنة داخل تدفق SSE ذي الحالة `200` فتتبع مسارًا منفصلًا
  ولاحقًا لتحليل التدفق، وهي **غير** مشمولة بهذه النقطة حاليًا — وهذا
  قيد معروف، لكنه غير مطلوب بعد لحالة agentrouter المضللة (التي
  تظهر كحالة HTTP تشير إلى خطأ).
- أهلية إعادة المحاولة: الحالة `429` موجودة في `RETRY_AFTER_ELIGIBLE_STATUSES`
  (`open-sse/services/combo/unavailableRetryGate.ts`)، ولذلك يحمل الخطأ
  المُعادَت صياغة حالته نافذة حقيقية لإعادة المحاولة بدلًا من الظهور كحالة `403` منتهية.
- إن قيمة `defaultRetryAfterMs` الاصطناعية البالغة `60s` (`upstreamStatusRestatement.ts`)
  ليست سوى ما تخبر به الاستجابة المُعادَت صياغة حالتها **العميل**؛ وليست بحد ذاتها
  مدة التهدئة/الحظر الداخلية للاتصال — إذ تحكم ذلك
  بصورة منفصلة الآلية التي تتعامل فعليًا مع الخطأ المُعادَت صياغة حالته
  (التراجع التصاعدي لتهدئة الاتصال، §2، بقيمة أساسية `3s` لمزودي
  مفاتيح API؛ أو حظر النموذج، §3، لمزودي الحصة لكل نموذج مثل
  agentrouter). وقد يصبح الموجّه مؤهلًا لإعادة المحاولة داخليًا قبل
  نافذة 60s التي يعلنها للعميل — وهذا هامش احتياطي مقصود،
  وليس خطأ.

لا تُعاد صياغة الأخطاء الدائمة (خطأ agentrouter‏ `无权访问模型` — لا صلاحية للوصول إلى هذا النموذج)
أبدًا: إذ تلغي `excludeMarkers` القاعدة حتى عند تطابق `textMarkers`،
وبذلك يحتفظ الخطأ بحالته الأصلية ولا يستمر أي شيء في إعادة محاولته إلى الأبد. ويجري
الرجوع إلى قاعدة تصنيف المزود المطابقة
(`agentrouter-model-access-denied` في `open-sse/config/providerErrorRules.ts`:
`reason: "auth_error"`، و`scope: "model"`، ومدة تهدئة أساسية معلنة تبلغ `6h`)
بواسطة `checkFallbackError` (`open-sse/services/accountFallback.ts`)
_قبل_ الإرجاع المبكر العام `FORBIDDEN` لفئة apikey، ويخضع ذلك إلى
`honorsRuleLockScope(provider)` (#10334 — وهي حصرية حاليًا لـ agentrouter عبر
قائمة السماح `HONORS_RULE_LOCK_SCOPE_PROVIDERS` في
`providerErrorRules.ts`). وتتدفق مدة التهدئة المعلنة للقاعدة والبالغة 6h على شكل
`fallbackResult.baseCooldownMs`، لكنها تظل تغذي مسار حظر الحصة لكل نموذج
الموجود مسبقًا (`lockModelIfPerModelQuota()` /
`recordModelLockoutFailure()`، الذي لم يتغير بفعل #10334 باستثناء مصدر
مدة التهدئة): إذ تُخفض إلى الحد الأقصى الذي يحدده المشغّل في `mlSettings.maxCooldownMs`
(الافتراضي `1_800_000ms` / 30min)، مثل كل حالات حظر النماذج الأخرى، ويظل
_سبب الحظر المحفوظ_ بالقيمة الثابتة الموجودة مسبقًا `"forbidden"`،
وليس `"auth_error"` الخاصة بالقاعدة — إذ لا يُحترم من البداية إلى النهاية سوى مدة التهدئة،
لا سلسلة السبب. ويظل الاتصال نفسه نشطًا؛ ولا تتأثر
النماذج الشقيقة على الاتصال نفسه.

تصل أخطاء الحصة المُعاد تحديد حالتها (`额度不足`) إلى قاعدة موفّر في بيئة الإنتاج
(`agentrouter-user-quota-exhausted`: ‏`reason: "quota_exhausted"`، ‏`scope:
"connection"`، من دون فترة تهدئة مُعلنة خاصة بها — لذا يُطبَّق الإعداد الافتراضي
للتراجع التدريجي الموسَّع في طبقة الاستمرارية). منذ #10334، تُستهلك `scope` في
`ProviderErrorRuleMatch` من البداية إلى النهاية، ولكن **فقط** للموفّرين الموجودين في
قائمة السماح `HONORS_RULE_LOCK_SCOPE_PROVIDERS` (`providerErrorRules.ts` —
حاليًا `"agentrouter"` فقط، ومقيَّد عبر `honorsRuleLockScope()`). بالنسبة إلى كل
موفّر آخر، تظل `scope` معلوماتية، تمامًا كما كانت قبل #10334.
تُظهر `checkFallbackError` نطاق القاعدة المطابِقة بوصفه
`fallbackResult.ruleScope`؛ أما `isAgentrouterConnectionQuotaScope()`
(`src/sse/services/auth.ts`) فهو حارس التحقق المشترك الذي يؤكد أن
`ruleScope` آمن بالفعل لاعتماده كإشارة ذاتية الاسترداد على مستوى الاتصال
(`scope` بقيمة `"connection"`، وسبب `quota_exhausted`، وليست `permanent`
أبدًا، وليست `creditsExhausted` أبدًا — كوسيلة حماية من قاعدة مستقبلية قد تقرن
`scope` بقيمة `"connection"` مع حالة حساب دائمة). يستدعيه مستهلكان:

- **الاستمرارية** (`markAccountUnavailable()`، ‏`src/sse/services/auth.ts`):
  بدلًا من الانتقال إلى فرع الحظر **لكل نموذج** الخاص بموفّر التمرير المباشر
  (لدى agentrouter القيمة `passthroughModels: true`، ولذلك تُرجع
  `hasPerModelQuota()` القيمة `true`)، فإنه يطبّق **فترة تهدئة مؤقتة للاتصال** —
  `testStatus: "unavailable"` + ‏`rateLimitedUntil`، وليس حالة نهائية أبدًا
  (`credits_exhausted`/`banned`/`expired`) — بحيث يستعيد الاتصال عمله ذاتيًا
  بمجرد انقضاء فترة التهدئة، بدلًا من الحاجة إلى إعادة ضبط بيانات الاعتماد يدويًا.
  يُتخطى ذلك للاتصالات التي لديها `disableCooling: true` ‏(#2997): وينتقل خيار
  إلغاء الاشتراك هذا بدلًا من ذلك إلى حظر كل نموذج (وهي مفاضلة موثّقة —
  راجع تعليق الشيفرة أعلى الفرع).
- **توجيه المجموعة ضمن الطلب نفسه** (`applyComboTargetExhaustion()`،
  ‏`open-sse/services/combo/targetExhaustion.ts`): يستخدم الحارس نفسه لوضع
  الاتصال في مجموعة `exhaustedConnections` داخل الذاكرة، بالمفتاح
  `${provider}:${connectionId}`. لا يؤدي هذا إلا إلى تخطي هدف متبقٍّ **ضمن
  الطلب نفسه** إذا كان ذلك الهدف _نفسه يحمل بالفعل `connectionId` المطابق
  تمامًا_ داخل كائن الهدف الخاص به (`getExhaustedTargetSkipReason()`،
  ‏`open-sse/services/combo/comboPredicates.ts`، ‏`if (provider &&
connectionId)` قبل البحث في `exhaustedConnections`) — أما مجموعة قائمة
  نماذج عادية، حيث لا تحمل الأهداف الشقيقة أي `connectionId` مثبت خاص بها
  ولا يُحل أحدها إلا لكل عملية إرسال من ترويسة الاستجابة
  `X-OmniRoute-Selected-Connection-Id`، فلن تحقق مطابقة المفتاح هذه أبدًا. في
  تلك الحالة الشائعة، لا تأتي الحماية الفعلية من إعادة استخدام مرحلة متبقية
  للحساب الذي استُنفدت حصته للتو من هذه المجموعة `Set` — بل من طبقة
  الاستمرارية المذكورة أعلاه (أصبحت قيمة `rateLimitedUntil` للاتصال الآن في
  المستقبل)، إلى جانب منع الحارس نفسه إضافة الموفّر إلى
  `transientRateLimitedProviders` بسبب الفشل (راجع "التصميم ذو المرحلتين"
  وتعليق الشيفرة على فرع `isAgentrouterConnectionQuotaScope` في
  `targetExhaustion.ts`): مع ترك تلك المجموعة `Set` بلا تعليم، لا يحدث السماح
  الإجباري عبر `allowRateLimitedConnection` في `combo.ts`
  (`open-sse/services/combo.ts:1005-1013`، ‏`:2734-2738`) للمراحل المتبقية
  الخاصة بالموفّر، ولذلك يُحترم مرشح `rateLimitedUntil` الخاص باختيار بيانات
  الاعتماد (`src/sse/services/auth.ts:1238`) على نحو طبيعي، فتختار المرحلة
  المتبقية اتصال agentrouter مختلفًا لا يزال مؤهلًا، أو تفشل لعدم توفر بيانات
  اعتماد — ولا تفرض عودتها إلى الاتصال الذي وضعه هذا الفرع للتو في فترة تهدئة.

### التصميم ذو المرحلتين: إعادة تحديد الحالة، ثم التصنيف

إن إعادة تحديد الحالة (`upstreamStatusRestatement.ts`) وقواعد تصنيف الموفّرين
(`open-sse/config/providerErrorRules.ts`،
`providerRuleRegistry`) سجلان منفصلان، يستخدم كلاهما معرّف الموفّر والعلامات
النصية كمفاتيح، لكنهما يعملان في موضعين مختلفين ويخدمان غرضين مختلفين:
تعيد إعادة تحديد الحالة كتابة حالة HTTP مبكرًا في `chatCore.ts`؛ بينما تختار
قواعد التصنيف `reason` الاحتياطي و`scope` القفل
(`model` / `provider` / `connection`) داخل `checkFallbackError()`
(`open-sse/services/accountFallback.ts`).

لا ترى قواعد التصنيف **النص** الكامل للخطأ (وهو مطلوب لمطابقة علامات النص
الأساسي مثل `额度不足`) إلا للموفّرين المدرجين في قائمة السماح
`FULL_TEXT_RULE_PROVIDERS` داخل `providerErrorRules.ts` — وحاليًا لا تضم إلا
`"agentrouter"`. بالنسبة إلى كل موفّر آخر في **الكتالوج المضمّن**، تمرر
`checkFallbackError` إلى `getProviderErrorRuleMatch` الخطأ المنظَّم فقط
(`{code, type}`)، وهو كافٍ للقواعد المستندة إلى الترويسة/الحالة/الرمز، لكنه
لا يستطيع رؤية علامات نص الاستجابة. ينفذ المساعد `resolveRuleMatchBody()`
هذا الاختيار: نص الخطأ الكامل للموفّرين المدرجين في قائمة السماح، والخطأ
المنظَّم لغيرهم. إن إضافة موفّر **مضمّن** إلى `FULL_TEXT_RULE_PROVIDERS` هي
اشتراك صريح خاص بكل موفّر — وهي موجودة كي يظل المسار الافتراضي لكل موفّر غير
موجود في القائمة دون أي تغيير، بايتًا مقابل بايت.

إن `scope` الخاصة بقاعدة ما (`model` / `provider` / `connection`) هي اشتراك
منفصل عن `FULL_TEXT_RULE_PROVIDERS`: لا تُظهرها `checkFallbackError` إلا بوصفها
`fallbackResult.ruleScope`، ولا يعتمدها المستهلكون اللاحقون بوصفها أي شيء
يتجاوز تسمية معلوماتية إلا للموفّرين الموجودين في قائمة السماح
`HONORS_RULE_LOCK_SCOPE_PROVIDERS` داخل الملف نفسه (`gated via
honorsRuleLockScope()` — وحاليًا `"agentrouter"` فقط). راجع "أخطاء الحصة
المُعاد تحديد حالتها" أعلاه لمعرفة ما تفعله فعليًا مطابقة
`scope: "connection"` بعد إدراج موفّر في قائمة السماح تلك.

**#11104 — القواعد التي يعلنها المشغّل تتجاوز قائمتي السماح كلتيهما.** يمكن للمشغّل
إعلان قاعدة خاصة بكل مزوّد في وقت التشغيل عبر `settings.providerErrorRules`
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`)
من دون تعديل هذا الملف. إن تقييد قاعدة المشغّل خلف
`FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` — وهما قائمتا سماح
تهدفان إلى حماية السلوك **الافتراضي** لقواعد الكتالوج المضمّنة — سيجعل
آلية الإعدادات عديمة التأثير لكل مزوّد باستثناء المزوّدين المدرجين هناك بالفعل،
لأن إعلان القاعدة يُعدّ بحد ذاته اشتراكًا صريحًا من المشغّل.
يتحقق كل من `resolveRuleMatchBody()` و`honorsRuleLockScope()` أولًا من
`hasOperatorRuleForProvider()`: يحصل المزوّد الذي لديه قاعدة مشغّل على
نص الخطأ الخام، ويُحترم `scope` المعلن له، بغض النظر عمّا إذا كان
مدرجًا أيضًا في أي من قائمتي السماح.

**فجوة معروفة — لا تتم استشارة `providerRuleRegistry` مطلقًا لحالة HTTP 400.**
يصنّف فرع `BAD_REQUEST` في `checkFallbackError` الحالة 400 بالكامل
من خلال مصفوفات الأنماط الخاصة به (`MODEL_ACCESS_DENIED_PATTERNS`،
و`CONTEXT_OVERFLOW_PATTERNS`، وغيرها في `accountFallback.ts`) ويُرجع النتيجة قبل
الوصول إلى فرع `configuredRule`/`getProviderErrorRuleMatch` الموجود أعلاه.
قاعدة كتالوج مضمّنة (أو قاعدة مشغّل) تحتوي على `status: 400` تكون
صالحة نحويًا، لكنها لن تُفعّل أبدًا. لا تستهدف أي قاعدة حالية الحالة 400 اليوم،
ولذلك لا يتأثر أي شيء في بيئة الإنتاج — لكن أي قاعدة مستقبلية للحالة 400 تتطلب
تعديل هذا الفرع أولًا، وهو تغيير أكبر من مجرد إضافة قاعدة (إذ يعيد
تصنيف الحالة 400 لكل مزوّد يعتمد بالفعل على سلوك مصفوفات الأنماط)،
وهو خارج نطاق إضافة قاعدة لمزوّد واحد.

### إضافة بوابة جديدة تعرض حالة الحصة بصورة غير صحيحة

1. سجّل مصفوفة قواعد واحدة في `statusRestatementRegistry`
   (`open-sse/config/upstreamStatusRestatement.ts`). اجعل `textMarkers`
   خاصة بالمزوّد؛ ولا تُعد استخدام عبارات إنجليزية عامة تتعارض مع
   `CREDITS_EXHAUSTED_SIGNALS` (`open-sse/services/accountFallback.ts`).
2. يمكنك اختياريًا تسجيل قواعد التصنيف في
   `open-sse/config/providerErrorRules.ts` (`providerRuleRegistry`) لاختيار
   نطاق القفل المناسب (`connection` للحصة التي تشمل الحساب بأكمله، و`model`
   للأخطاء الخاصة بكل نموذج). لا تدخل هذه الخطوة حيز التنفيذ في بيئة الإنتاج
   إلا للمزوّدين الذين تحتاج قواعدهم إلى نص الخطأ الكامل (علامات المتن): أضف
   معرّف المزوّد إلى `FULL_TEXT_RULE_PROVIDERS` في الملف نفسه — وإلا فإن
   `checkFallbackError` لن يمرر إلى القاعدة سوى الخطأ المنظّم
   `{code, type}`، ولن تطابق قاعدة تعتمد على نص المتن حركة البيانات الفعلية
   أبدًا. لا تحتاج القواعد التي تطابق بالاعتماد على `status`/`headers` فقط
   (مثل قواعد Opencode أو Minimax) إلى هذا الاشتراك. وبشكل منفصل، إذا أعلنت
   القاعدة `scope: "connection"` وكان المقصود فترة تهدئة فعلية تشمل الاتصال
   بأكمله مع تخطي التركيبة ضمن الطلب نفسه (وليس مجرد تسمية معلوماتية)، فأضف
   معرّف المزوّد إلى `HONORS_RULE_LOCK_SCOPE_PROVIDERS` في الملف نفسه — فهذا
   هو ما يتحكم في استهلاك النطاق بأسلوب `isAgentrouterConnectionQuotaScope()`
   داخل `markAccountUnavailable()` (`src/sse/services/auth.ts`) و
   `applyComboTargetExhaustion()`
   (`open-sse/services/combo/targetExhaustion.ts`)؛ ومن دونه، يستمر تمرير
   `scope` عبر `fallbackResult.ruleScope`، لكن لا يتصرف أي جزء بناءً عليه.
3. أضف اختبارات وحدة تحاكي `tests/unit/upstream-status-restatement.test.ts`
   و`tests/unit/agentrouter-error-rules.test.ts` (بما في ذلك ضوابط
   not-permanent / not-creditsExhausted، وإذا كان المزوّد يحتاج إلى قائمة
   السماح — فأضف اختبارًا يؤكد أن `resolveRuleMatchBody()` يعيد النص
   الكامل لذلك المزوّد وحده).

لا حاجة إلى أي تغييرات في `chatCore.ts` أو `classifyError` أو combo.

#### قفل مصنّف حسب منفذ الخروج (#10880)

تُعامل المزوّدات الموجودة في `EGRESS_BUCKETED_LOCK_PROVIDERS` (عائلة opencode)
على أنها مزوّدات منبع مصنّفة حسب عنوان IP (فالطبقة المجانية من opencode مصنّفة
حسب عنوان IP، لا حسب الحساب — راجع #9611): تؤدي الحالة 429 المصنّفة على أنها
`quota_exhausted` **أو** `rate_limit_exceeded` إلى فرض فترة تهدئة على كل اتصال
من عائلة قائمة السماح يطابق آخر عنوان IP معروف لخروجه عنوانَ IP الخاص بالاتصال
الذي فشل، قبل أن يتمكن التدوير من تجربتها
— وبذلك يتم تجنب N-1 من استدعاءات المنبع المضمونة الفشل (بالنمط نفسه كما في
#10460/#10525). أُدرج `rate_limit_exceeded` عمدًا: ففي مسار
`markAccountUnavailable` لا تتطابق القواعد الخاصة بـ opencode مطلقًا
(لا يتم تمرير أي ترويسات/متن إلى `checkFallbackError`، كما أن opencode غير موجود
في `FULL_TEXT_RULE_PROVIDERS`)، ولذلك تُصنّف الحالة 429 التي يتضمن متنها نص
حصة الاشتراك ("monthly usage limit reached") على أنها `quota_exhausted` بواسطة
المسار الاحتياطي لنص الحصة (`buildSubscriptionQuotaFallback`،
`accountFallback.ts`؛ فترة تهدئة مدتها ساعة واحدة) قبل الوصول أصلًا إلى قاعدة
`status_429` — بينما تُصنّف الحالة 429 الخالية من نص الحصة (تقييد معدل عادي)
عبر قاعدة `status_429` على أنها `rate_limit_exceeded`، وتظل تفرض فترة تهدئة
على عائلة عنوان IP. وبالنسبة إلى مزوّد مدرج في قائمة السماح، فإن تقييد المعدل
المصنّف حسب عنوان IP يُعد الإشارة نفسها التي تشير إلى حصة مستنفدة. القيود الصريحة:

- **أفضل جهد ممكن**: يحلّ القفل آخر `egress_ip` معروف للاتصال
  من `proxy_logs` (ضمن نافذة 24h، بشكل متزامن، ومن دون ذاكرة مؤقتة). عند برودة الذاكرة المؤقتة (لم
  يُفحَص عنوان IP للخروج من قبل) أو عدم وجود صف → يظل الاتصال المتعثر خاضعًا
  لفترة التهدئة بواسطة الفرع (ويُسجَّل كما هو الحال اليوم)، لكن لا يُقفل أي اتصال شقيق.
- **ليس نهائيًا مطلقًا**: فترة التهدئة هي نافذة حصة متجددة
  (`testStatus: "unavailable"`)، ولا تُشتق حالة دائمة مطلقًا من إشارة
  على مستوى IP. تتجاوز اتصالات `disableCooling` الفرع بالكامل.
- **تتغير دقة القفل لعائلة القائمة المسموح بها**: هذا تغيير في النطاق،
  وليس مجرد تحسين للاتصالات الشقيقة. يُعد opencode موفّر `passthroughModels`،
  ولذلك، قبل هذا الفرع، كان الخطأ 429 ينتج قفلًا لكل MODEL على حدة؛ أما الآن
  فينتج فترة تهدئة للاتصال — بما في ذلك للمشغّل الذي يشغّل اتصالًا واحدًا
  من دون أي اتصال شقيق إطلاقًا. وهذه هي الدقة التي يعلن جدول قواعد opencode
  بالفعل أنها الصحيحة (`scope: "connection"`،
  `providerErrorRules.ts`)، لكنها لم تُحترم حتى الآن لأن opencode غير موجود في
  `HONORS_RULE_LOCK_SCOPE_PROVIDERS`. يكتب الفرع فترة تهدئة الاتصال
  المتعثر + `backoffLevel` بنفسه، محاكيًا فرع agentrouter ذي النطاق
  المحدد بالاتصال، ثم يعود — فلا يجري الوصول مطلقًا إلى الحظر لكل نموذج ولا
  إلى المسار العام أدناه.
- **يشمل Combo**: مثل فرع agentrouter، يتجاهل النطاق عمدًا
  تخفيض `persistUnavailableState`/`isCombo` الذي يطبقه مستدعٍ من نوع combo
  على الخطأ 429. إن القفل لكل نموذج ليس شكلًا أضعف من هذا النطاق، بل هو
  الوحدة الخاطئة: فهو لا يقول شيئًا عن عنوان IP المستنفد، ولذلك سيستمر تدوير
  combo في استهلاك استدعاء واحد مضمون الفشل لكل اتصال شقيق.
- **سلامة الاتصالات الشقيقة**: لا يُستبدل مطلقًا اتصال شقيق نهائي الحالة بالفعل (محظور/مستنفد الرصيد)
  أو خاضع بالفعل لفترة تهدئة أطول.
- **قائمة سماح حصرية**: إن توسيع `EGRESS_BUCKETED_LOCK_PROVIDERS` هو
  قرار صريح من المالك؛ ولا توجد توصيلات عامة (النمط #10334/#10419). يربط
  استعلام الاتصالات الشقيقة قائمة السماح نفسها بدلًا من تكرارها كسلسلة SQL
  حرفية، بحيث يظل توسيعها تغييرًا من سطر واحد.
- **تدوير عنوان IP للخروج، في كلا الاتجاهين**: نافذة البحث (24h) أوسع بكثير
  من مدة صلاحية ذاكرة عنوان IP للخروج المؤقتة (5 min)، لذا فإن «آخر عنوان IP معروف» هو سجل تاريخي،
  وليس الحالة الحالية. إذا جرى تدوير وكيل اتصال ضمن النافذة، فقد
  **يفوّت** القفل عنوان IP مشتركًا بالفعل (يكون عنوان IP المسجل هو العنوان الجديد
  غير المستنفد) — وبالمثل قد **يضع اتصالًا شقيقًا في فترة تهدئة رغم أنه جرى
  تدويره بعيدًا منذ ذلك الحين** عن عنوان IP المستنفد. تكلّف الحالة الثانية ذلك الاتصال الشقيق نافذة
  تهدئة واحدة؛ وتُقبل الحالتان باعتبارهما قيودًا قائمة على أفضل جهد ممكن لعملية بحث
  معتمدة على السجل التاريخي.
- **التكلفة**: عمليتا مسح محدودتان لـ `proxy_logs` (مفلترتان زمنيًا عبر
  `idx_pl_timestamp`)، وفقط بمعدل حدوث الخطأ 429. لا يوجد فهرس جديد (الترحيل 134
  YAGNI). جرى القياس على نسخة من قاعدة بيانات بحركة مرور حقيقية وبحجم متوسط؛ ويحتفظ
  مثيل عالي الإنتاجية بعدد أكبر نسبيًا من الصفوف ضمن النافذة نفسها.

---

## ميزات المرونة الأخرى

- **19 استراتيجية توجيه** (الأولوية، الموزون، التناوب الدوري، ترحيل السياق، الملء أولًا، p2c، العشوائي، الأقل استخدامًا، المحسّن للتكلفة، المراعي لإعادة التعيين، نافذة إعادة التعيين، السعة المتاحة، العشوائي الصارم، التلقائي، lkgp، المحسّن للسياق، المحسّن للتخزين المؤقت، الدمج، خط الأنابيب) — راجع [AUTO-COMBO.md](../routing/AUTO-COMBO.md).
- **التوجيه المراعي لإعادة التعيين** (v3.8.0) — يعطي الأولوية للاتصالات وفقًا لوقت إعادة تعيين الحصة.
- **خفض مستوى وضع الخلفية** — يُخفض استخدام Responses API مع `background: true` إلى الوضع المتزامن مع إصدار تحذير.
- **الاكتشاف الديناميكي لحدود الأدوات** — يتراجع عن استخدام المزوّدين عند بلوغ حدود عدد الأدوات.
- **الرجوع الاحتياطي في حالات الطوارئ** — يتحكم فيه `OMNIROUTE_EMERGENCY_FALLBACK`؛ ويمكن للمشغّلين تجاوزه من صفحة علامات الميزات من دون إعادة تشغيل.

---

## تصحيح الأخطاء

- تُرجع إجابات التوليفة الموزونة `503 all_targets_cooling_down` (مع تعيين `Retry-After`، واحتواء `diagnostics.excluded` على كل هدف مع `model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable`) ← تم إعداد المجمّع وتوصيله، لكن كل هدف مستبعد بسبب مؤقّت مرونة؛ ويسرد التحذير `[COMBO] Weighted selection: every target excluded before dispatch — …` الأسباب والثواني المتبقية. أمّا ظهور `404 no_executable_targets` من التوليفة نفسها، فيعني عدم وجود أي مؤقّت مرونة متدخّل (لا يوجد شيء لتشغيله، أو فشلت جميع الحسابات في اختبار التوفّر). هذه الآلية مضمّنة في `open-sse/services/combo/pinRecovery.ts` استنادًا إلى الاستبعادات المجمّعة في `targetResolution.ts`.
- تم تخطّي جميع مفاتيح أحد المزوّدين ← تحقّق من حالة قاطع الدائرة ومن `rateLimitedUntil`/`testStatus` لكل اتصال.
- استبعاد المزوّد بصورة دائمة بعد نافذة إعادة التعيين ← تقرأ الشيفرة قيمة `state` الخام بدلًا من `getStatus()`/`canExecute()`.
- فشل مفتاح واحد مع ضرورة استمرار عمل المفاتيح الأخرى ← فضّل فترة تهدئة الاتصال على قاطع الدائرة.
- فشل نموذج واحد فقط ← فضّل حظر النموذج على فترة تهدئة الاتصال.
- يُفترض أن تتعافى الحالة ذاتيًا لكنها لا تفعل ← تحقّق من وجود طابع زمني مستقبلي ومن مسار قراءة يحدّث الحالة المنتهية الصلاحية. تتطلّب الحالات الدائمة تغييرات يدوية.

---

## بصمات TLS والتخفي

يُوثّق التخفي الخاص بكل مزوّد (JA3/JA4، وCCH، والتعمية) بشكل منفصل — راجع `docs/security/STEALTH_GUIDE.md` (في git؛ غير مُضمّن في `/docs`).

---

## اختبار المرونة (المرحلة 8 · الكتلة C)

إضافةً إلى اختبارات الوحدات لمنطق المرونة، تختبر ثلاثة اختبارات بيئة التشغيل تحت
ظروف ضغط/فشل حقيقية (كلها اختبارات تكاملية/ليلية — ولا يحجب أيٌّ منها طلبات PR):

| الاختبار                   | ما الذي يختبره                                                                                                                                                                      | التشغيل                                 |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- |
| الفوضى                     | تضخ عقدة وهمية في المنبع زمن انتقال/إعادة تعيين/انتهاء مهلة/503 حقيقية؛ وتتحقق من أن قاطع الدائرة يُفتح/يتعافى وأن `checkFallbackError` يصنّف 503 كحالة رجوع احتياطي قابلة للتعافي. | `RUN_CHAOS_INT=1 npm run test:chaos`    |
| نمو الكومة                 | نحو 500 تدفق لكل `createSSEStream` ضمن `--expose-gc`؛ يفشل الاختبار إذا نمت الكومة متجاوزةً الحد الأقصى (آلية الحماية من OOM رقم #3069).                                            | `npm run test:heap`                     |
| اختبار التحمّل باستخدام k6 | حمل مستمر على `/api/monitoring/health`؛ مع عتبات لقيمة p95/الأخطاء.                                                                                                                 | `k6 run tests/load/k6-soak.js` (ليليًا) |

تدير هذه الاختبارات `.github/workflows/nightly-resilience.yml` (جدولة cron + تشغيل يدوي). في
`test:integration` الافتراضي، يتخطى اختبارا الفوضى والكومة نفسيهما تلقائيًا (من دون `RUN_CHAOS_INT`/`--expose-gc`).

---

## انظر أيضًا

- [دليل البنية](./ARCHITECTURE.md) — بنية النظام ومكوّناته الداخلية
- [دليل المستخدم](../guides/USER_GUIDE.md) — المزوّدون، والتركيبات، وتكامل واجهة سطر الأوامر
- [محرّك التركيب التلقائي](../routing/AUTO-COMBO.md) — التقييم المستند إلى 16 عاملًا، وحزم الأوضاع
