# AgentRouter Setup Guide (العربية)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/AGENTROUTER.md) · 🇪🇹 [am](../../../am/docs/providers/AGENTROUTER.md) · 🇦🇿 [az](../../../az/docs/providers/AGENTROUTER.md) · 🇧🇬 [bg](../../../bg/docs/providers/AGENTROUTER.md) · 🇧🇩 [bn](../../../bn/docs/providers/AGENTROUTER.md) · 🇨🇿 [cs](../../../cs/docs/providers/AGENTROUTER.md) · 🇩🇰 [da](../../../da/docs/providers/AGENTROUTER.md) · 🇩🇪 [de](../../../de/docs/providers/AGENTROUTER.md) · 🇬🇷 [el](../../../el/docs/providers/AGENTROUTER.md) · 🇪🇸 [es](../../../es/docs/providers/AGENTROUTER.md) · 🇪🇪 [et](../../../et/docs/providers/AGENTROUTER.md) · 🇮🇷 [fa](../../../fa/docs/providers/AGENTROUTER.md) · 🇫🇮 [fi](../../../fi/docs/providers/AGENTROUTER.md) · 🇫🇷 [fr](../../../fr/docs/providers/AGENTROUTER.md) · 🇮🇪 [ga](../../../ga/docs/providers/AGENTROUTER.md) · 🇮🇳 [gu](../../../gu/docs/providers/AGENTROUTER.md) · 🇳🇬 [ha](../../../ha/docs/providers/AGENTROUTER.md) · 🇮🇱 [he](../../../he/docs/providers/AGENTROUTER.md) · 🇮🇳 [hi](../../../hi/docs/providers/AGENTROUTER.md) · 🇭🇷 [hr](../../../hr/docs/providers/AGENTROUTER.md) · 🇭🇺 [hu](../../../hu/docs/providers/AGENTROUTER.md) · 🇦🇲 [hy](../../../hy/docs/providers/AGENTROUTER.md) · 🇮🇩 [id](../../../id/docs/providers/AGENTROUTER.md) · 🇳🇬 [ig](../../../ig/docs/providers/AGENTROUTER.md) · 🇮🇹 [it](../../../it/docs/providers/AGENTROUTER.md) · 🇯🇵 [ja](../../../ja/docs/providers/AGENTROUTER.md) · 🇬🇪 [ka](../../../ka/docs/providers/AGENTROUTER.md) · 🇰🇭 [km](../../../km/docs/providers/AGENTROUTER.md) · 🇮🇳 [kn](../../../kn/docs/providers/AGENTROUTER.md) · 🇰🇷 [ko](../../../ko/docs/providers/AGENTROUTER.md) · 🇱🇹 [lt](../../../lt/docs/providers/AGENTROUTER.md) · 🇱🇻 [lv](../../../lv/docs/providers/AGENTROUTER.md) · 🇮🇳 [ml](../../../ml/docs/providers/AGENTROUTER.md) · 🇮🇳 [mr](../../../mr/docs/providers/AGENTROUTER.md) · 🇲🇾 [ms](../../../ms/docs/providers/AGENTROUTER.md) · 🇲🇹 [mt](../../../mt/docs/providers/AGENTROUTER.md) · 🇲🇲 [my](../../../my/docs/providers/AGENTROUTER.md) · 🇳🇵 [ne](../../../ne/docs/providers/AGENTROUTER.md) · 🇳🇱 [nl](../../../nl/docs/providers/AGENTROUTER.md) · 🇳🇴 [no](../../../no/docs/providers/AGENTROUTER.md) · 🇮🇳 [or](../../../or/docs/providers/AGENTROUTER.md) · 🇮🇳 [pa](../../../pa/docs/providers/AGENTROUTER.md) · 🇵🇭 [phi](../../../phi/docs/providers/AGENTROUTER.md) · 🇵🇱 [pl](../../../pl/docs/providers/AGENTROUTER.md) · 🇵🇹 [pt](../../../pt/docs/providers/AGENTROUTER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/AGENTROUTER.md) · 🇷🇴 [ro](../../../ro/docs/providers/AGENTROUTER.md) · 🇷🇺 [ru](../../../ru/docs/providers/AGENTROUTER.md) · 🇱🇰 [si](../../../si/docs/providers/AGENTROUTER.md) · 🇸🇰 [sk](../../../sk/docs/providers/AGENTROUTER.md) · 🇸🇮 [sl](../../../sl/docs/providers/AGENTROUTER.md) · 🇷🇸 [sr](../../../sr/docs/providers/AGENTROUTER.md) · 🇸🇪 [sv](../../../sv/docs/providers/AGENTROUTER.md) · 🇰🇪 [sw](../../../sw/docs/providers/AGENTROUTER.md) · 🇮🇳 [ta](../../../ta/docs/providers/AGENTROUTER.md) · 🇮🇳 [te](../../../te/docs/providers/AGENTROUTER.md) · 🇹🇭 [th](../../../th/docs/providers/AGENTROUTER.md) · 🇹🇷 [tr](../../../tr/docs/providers/AGENTROUTER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/AGENTROUTER.md) · 🇵🇰 [ur](../../../ur/docs/providers/AGENTROUTER.md) · 🇺🇿 [uz](../../../uz/docs/providers/AGENTROUTER.md) · 🇻🇳 [vi](../../../vi/docs/providers/AGENTROUTER.md) · 🇳🇬 [yo](../../../yo/docs/providers/AGENTROUTER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/AGENTROUTER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/AGENTROUTER.md)

---

[AgentRouter](https://agentrouter.org) هو وسيط متوافق مع Anthropic يعيد بيع Claude ونماذج أخرى، وغالبًا بأسعار أقل من Anthropic API المباشر. وقد صُمم ليكون بديلًا مباشرًا لقيمة `ANTHROPIC_BASE_URL` في عميل Claude Code الرسمي، ولذلك فهو لا يقبل إلا حركة المرور التي تطابق البصمة الشبكية لـ Claude Code (مثل User-Agent محدد، وعلامات `anthropic-beta`، وترويسات Stainless SDK، وما إلى ذلك).

## البدء السريع — استخدم موفّر `agentrouter` الأصلي (موصى به)

بالنسبة إلى معظم المستخدمين، **لا يلزم أي إعداد خاص**. يأتي OmniRoute مزودًا بموفّر `agentrouter` مدمج يتضمن البصمة الشبكية الكاملة لـ Claude Code مسبقًا (راجع `open-sse/config/providerRegistry.ts` ← `agentrouter`). لاستخدامه:

1. افتح **لوحة التحكم ← الموفّرون ← إضافة موفّر**.
2. اختر **AgentRouter** من القائمة.
3. الصق مفتاح API الخاص بك الذي يبدأ بـ `sk-...` ثم احفظ.

هذا كل شيء — لا حاجة إلى متغيرات بيئة أو نوع موفّر مخصص. تشمل النماذج المدمجة `claude-opus-4-6` و`claude-haiku-4-5-20251001` و`glm-5.1` و`deepseek-v3.2`.

يغطي باقي هذا الدليل **المسار المتقدم**: استخدام نوع الموفّر `anthropic-compatible-cc-*`. استخدمه عندما تحتاج إلى مزيد من التحكم في البصمة الشبكية — على سبيل المثال، عند الاتصال بوسطاء آخرين على غرار AgentRouter لم تتم إضافتهم بعد إلى سجل الموفّرين الأصلي، أو عند تجاوز عنوان URL الأساسي أو مسار المحادثة أو مجموعة الترويسات.

---

## متقدم: الاتصال عبر نوع الموفّر المتوافق مع Claude Code

يدعم OmniRoute أيضًا AgentRouter (والوسطاء المشابهين) من خلال نوع الموفّر **المتوافق مع Claude Code** (`anthropic-compatible-cc-*`)، الذي يتواصل باستخدام Anthropic Messages API مع البصمة الشبكية الصحيحة. لن يعمل موفّر `openai-compatible-chat` عام يشير إلى `https://agentrouter.org` — إذ يرفض WAF في الجهة المصدر الطلبات التي لا تبدو صادرة من Claude Code.

---

## المتطلبات الأساسية

- حساب AgentRouter ومفتاح API. يحصل المسجلون الجدد على أرصدة مجانية عبر رابط الإحالة في ملف [README](../README.md) الخاص بالمشروع.
- تشغيل OmniRoute مع تمكين علامة الميزة `ENABLE_CC_COMPATIBLE_PROVIDER` (انظر أدناه).

## 1. تمكين نوع الموفّر المتوافق مع CC

نوع الموفّر المتوافق مع Claude Code محمي بعلامة ميزة لأنه يرسل حركة مرور تحاكي عميل Claude Code الرسمي بدرجة كبيرة. مكّنه عن طريق تعيين متغير بيئة قبل تشغيل OmniRoute:

```bash
ENABLE_CC_COMPATIBLE_PROVIDER=true
```

مثال باستخدام Docker:

```bash
docker run -d --name omniroute \
  --restart unless-stopped \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  -e ENABLE_CC_COMPATIBLE_PROVIDER=true \
  diegosouzapw/omniroute:latest
```

بعد إعادة التشغيل، تعرض لوحة التحكم خيار **إضافة موفّر متوافق مع Claude Code** إلى جانب مسارات الموفّرين الحالية المتوافقة مع OpenAI والمتوافقة مع Anthropic.

## 2. إنشاء الموفّر في لوحة التحكم

1. افتح **لوحة التحكم ← الموفّرون ← إضافة موفّر**.
2. اختر **إضافة موفّر متوافق مع Claude Code** (لا يظهر إلا عند تعيين العلامة أعلاه).
3. املأ الحقول:

| الحقل             | القيمة                                                      |
| ----------------- | ----------------------------------------------------------- |
| الاسم             | `AgentRouter` (أو أي تسمية)                                 |
| البادئة           | `agentrouter` (اسم مستعار سهل يظهر في السجلات ولوحة التحكم) |
| عنوان URL الأساسي | `https://agentrouter.org`                                   |
| مسار المحادثة     | `/v1/messages?beta=true` (الافتراضي — اتركه كما هو)         |

> لا يزال معرّف النموذج الأساسي يستخدم معرّف عقدة الموفّر الكامل
> (`anthropic-compatible-cc-{uuid}/{model}`). أما **البادئة** فهي مجرد اسم مستعار
> للعرض، ويجري حله بواسطة `src/lib/usage/callLogs.ts` لإظهار مخرجات سجلات أوضح.

4. (اختياري) الصق مفتاح API الخاص بك في حقل **التحقق** وانقر على **فحص** لتأكيد الاتصال قبل الحفظ.
5. انقر على **إضافة**.

بعد إنشائه، افتح الموفّر وأضف **اتصالًا** باستخدام مفتاح AgentRouter API الخاص بك (`sk-...`). يجب أن تتحول قيمة `test_status` الخاصة بالاتصال إلى `active`.

## 3. استخدمه من خلال مجموعة أو مباشرةً

أشِر إلى النموذج باستخدام بادئة موفّر الخدمة بوصفها مساحة الاسم:

```bash
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "agentrouter/claude-opus-4-6",
    "messages": [{"role": "user", "content": "hello"}],
    "max_tokens": 100
  }'
```

يعمل أيضًا معرّف النموذج القياسي `anthropic-compatible-cc-{uuid}/claude-opus-4-6`
وهو المعرّف الذي يظهر في قاعدة البيانات وإعدادات المجموعة.

أو أضِفه إلى مجموعة للتوجيه، والرجوع الاحتياطي، وإدارة الحصص مثل أي موفّر خدمة
آخر.

---

## تفاصيل صورة الطلب السلكية

كمرجع، يرسل جسر cc-compatible ما يلي مع كل طلب إلى المنبع
(راجع `open-sse/services/claudeCodeCompatible.ts`):

| الترويسة                                    | القيمة                                                                                         |
| ------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| `Authorization`                             | `Bearer <api-key>`                                                                             |
| `User-Agent`                                | `claude-cli/2.1.258 (external, sdk-cli)`                                                       |
| `anthropic-version`                         | `2023-06-01`                                                                                   |
| `anthropic-beta`                            | `claude-code-20250219,interleaved-thinking-2025-05-14,effort-2025-11-24`                       |
| مفتاح تبديل redact-thinking لكل اتصال       | يضيف `redact-thinking-2026-02-12` إلى خدمات المنبع التي تتطلب تحديدًا تدفقات تفكير منقّحة      |
| مفتاح تبديل التفكير الملخّص لكل اتصال       | يضيف `display: "summarized"` إلى طلبات التفكير المتوافقة مع CC التي لم تعيّن وضع عرض بالفعل    |
| `anthropic-dangerous-direct-browser-access` | `true`                                                                                         |
| `x-app`                                     | `cli`                                                                                          |
| `X-Stainless-*`                             | ترويسات متنوعة من Stainless SDK (اللغة، وإصدار الحزمة، ونظام التشغيل، والمعمارية، وما إلى ذلك) |

هذا ما يسمح للطلبات باجتياز WAF / القائمة البيضاء للعملاء لدى المنبع.

---

## استكشاف الأخطاء وإصلاحها

**`{"error":{"message":"unauthorized client detected, ..."}}`** — لم يتطابق طلبك
مع صورة الطلب السلكية لـ Claude Code. يحدث هذا عندما يُضبط موفّر الخدمة
على `openai-compatible-chat` بدلًا من `anthropic-compatible-cc`، أو عندما لا تكون
العلامة `ENABLE_CC_COMPATIBLE_PROVIDER=true` قد ضُبطت عند بدء التشغيل.

**`{"error":{"message":"无效的令牌","type":"new_api_error"}}` (HTTP 401)** —
«رمز غير صالح». صورة الطلب السلكية صحيحة، لكن مفتاح API مرفوض. أنشئ
مفتاحًا جديدًا في لوحة معلومات AgentRouter وحدّث الاتصال.

**`{"error":{"code":"content-blocked","type":"agent_router_api_error"}}`
(HTTP 400)** — رفض خطاف الإشراف في AgentRouter محتوى الطلب، أو أن
خطة المفتاح لا تسمح بالنموذج المطلوب. جرّب مطالبة أو نموذجًا مختلفًا؛
وتواصل مع دعم AgentRouter إذا كان يتم حظر مطالبة سليمة باستمرار.

**`[400]: content-blocked` على نماذج محددة فقط** — لا تسمح معظم خطط AgentRouter
إلا بمجموعة فرعية من النماذج (مثل `claude-opus-4-6`). تُرجع معرّفات النماذج الأخرى
`unauthorized_client_error` رغم أن المفتاح صالح. تحقّق من النماذج التي
تغطيها خطتك في لوحة معلومات AgentRouter.

**`Invalid JSON response from provider (reset after Ns)` من سجلات omniroute** —
أعاد المنبع نصًا ليس بتنسيق JSON (عادةً صفحة خطأ HTML من WAF).
يعني هذا عادةً أن الطلب لم يصل مطلقًا إلى الواجهة الخلفية لـ AgentRouter — تحقّق مجددًا من أن
معرّف موفّر الخدمة يبدأ بـ `anthropic-compatible-cc-` (لاحظ الشرطة اللاحقة —
راجع `CLAUDE_CODE_COMPATIBLE_PREFIX` في `open-sse/services/claudeCodeCompatible.ts`)
وأن علامة الميزة مفعّلة.

**`unauthorized client detected` / صفحة خطأ HTML رغم وجود موفّر AgentRouter
بالفعل** — من المرجح أن لديك **أكثر من** موفّر AgentRouter
وأن طلبك يصل إلى الموفّر الخطأ. إذا كان قد أُنشئ موفّر متبقٍ يدويًا من نوع
`anthropic-compatible-*` (غير `cc`) أو `openai-compatible-chat-*`
باستخدام البادئة `agentrouter`، فقد يستحوذ على معرّفات النماذج `agentrouter/<model>`
(وقد تشير إليه المجموعات بواسطة معرّف العقدة)، ولذلك تُوجَّه الحركة إلى ذلك الموفّر —
الذي يرسل User-Agent عامًا فيُرفض — بدلًا من موفّر
`agentrouter` المضمّن الذي يأتي أصلًا مع صورة الطلب السلكية الصحيحة. تحقّق من الوجهة التي
يُحل إليها النموذج فعليًا في سجلات omniroute (تُظهر علامة `ROUTING`
`agentrouter/<model> → <providerId>/<model>`)، وإذا لم يكن `<providerId>` هو
`agentrouter`، فوحّد الإعداد على الموفّر الأصلي: وجّه المجموعات إلى
`agentrouter/<model>` (providerId ‏`agentrouter`) واحذف موفّري
التوافق المكررين. لا يحتاج الموفّر الأصلي إلى أي إعداد لصورة الطلب السلكية ولا إلى
`customUserAgent`.

---

## انظر أيضًا

- [`docs/providers/CLAUDE_WEB.md`](./CLAUDE_WEB.md) — ملاحظات تكامل موفّر Claude Web
- [`docs/reference/FREE_TIERS.md`](../reference/FREE_TIERS.md) — دليل الموفّرين ذوي الخطط
  المجانية
- [`open-sse/services/claudeCodeCompatible.ts`](../../open-sse/services/claudeCodeCompatible.ts)
  — تنفيذ الصور عبر البروتوكول
