# Router Backends & Embedded Services — architecture contract (ADR) (العربية)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/ROUTER_BACKENDS.md) · 🇪🇹 [am](../../../am/docs/architecture/ROUTER_BACKENDS.md) · 🇦🇿 [az](../../../az/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇬 [bg](../../../bg/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇩 [bn](../../../bn/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇦 [bs](../../../bs/docs/architecture/ROUTER_BACKENDS.md) · 🇨🇿 [cs](../../../cs/docs/architecture/ROUTER_BACKENDS.md) · 🇩🇰 [da](../../../da/docs/architecture/ROUTER_BACKENDS.md) · 🇩🇪 [de](../../../de/docs/architecture/ROUTER_BACKENDS.md) · 🇬🇷 [el](../../../el/docs/architecture/ROUTER_BACKENDS.md) · 🇪🇸 [es](../../../es/docs/architecture/ROUTER_BACKENDS.md) · 🇪🇪 [et](../../../et/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇷 [fa](../../../fa/docs/architecture/ROUTER_BACKENDS.md) · 🇫🇮 [fi](../../../fi/docs/architecture/ROUTER_BACKENDS.md) · 🇫🇷 [fr](../../../fr/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇪 [ga](../../../ga/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [gu](../../../gu/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [ha](../../../ha/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇱 [he](../../../he/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [hi](../../../hi/docs/architecture/ROUTER_BACKENDS.md) · 🇭🇷 [hr](../../../hr/docs/architecture/ROUTER_BACKENDS.md) · 🇭🇺 [hu](../../../hu/docs/architecture/ROUTER_BACKENDS.md) · 🇦🇲 [hy](../../../hy/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇩 [id](../../../id/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [ig](../../../ig/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇹 [it](../../../it/docs/architecture/ROUTER_BACKENDS.md) · 🇯🇵 [ja](../../../ja/docs/architecture/ROUTER_BACKENDS.md) · 🇬🇪 [ka](../../../ka/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇭 [km](../../../km/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [kn](../../../kn/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇷 [ko](../../../ko/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇹 [lt](../../../lt/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇻 [lv](../../../lv/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [ml](../../../ml/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [mr](../../../mr/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇾 [ms](../../../ms/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇹 [mt](../../../mt/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇲 [my](../../../my/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇵 [ne](../../../ne/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇱 [nl](../../../nl/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇴 [no](../../../no/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [or](../../../or/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [pa](../../../pa/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇭 [phi](../../../phi/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇱 [pl](../../../pl/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇹 [pt](../../../pt/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇴 [ro](../../../ro/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇺 [ru](../../../ru/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇰 [si](../../../si/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇰 [sk](../../../sk/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇮 [sl](../../../sl/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇸 [sr](../../../sr/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇪 [sv](../../../sv/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇪 [sw](../../../sw/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [ta](../../../ta/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [te](../../../te/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇭 [th](../../../th/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇷 [tr](../../../tr/docs/architecture/ROUTER_BACKENDS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇰 [ur](../../../ur/docs/architecture/ROUTER_BACKENDS.md) · 🇺🇿 [uz](../../../uz/docs/architecture/ROUTER_BACKENDS.md) · 🇻🇳 [vi](../../../vi/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [yo](../../../yo/docs/architecture/ROUTER_BACKENDS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/ROUTER_BACKENDS.md)

---

> **الحالة:** مقبول · **السياق:** [#5670](https://github.com/diegosouzapw/OmniRoute/issues/5670)،
> [#5603](https://github.com/diegosouzapw/OmniRoute/issues/5603) · **العقد:** `domain/routing/routerBackends.ts`
> (سجلّ ذو أنواع محددة — سيصل الكود مع [#5868](https://github.com/diegosouzapw/OmniRoute/pull/5868))

يثبّت سجل قرار البنية (ADR) هذا كيفية ارتباط المحركات `ts` (الأصلي) و`bifrost` و`cliproxy` و`9router` والمحركات المتوافقة مع VibeProxy بعضها ببعض، كي يتوقف المساهمون عن الخلط بين مفهومين مختلفين معماريًا. كما يوثّق السجل ذا الأنواع المحددة، الذي قدّمه العمل على سجل واجهات التوجيه الخلفية، بوصفه المصدر الوحيد للحقيقة لهذا النموذج.

## الفرق الجوهري — محوران متعامدان

يُوصَف دور المحرك من خلال **محورين مستقلين**، جرى ترميزهما معًا في `RouterBackendDefinition` الخاص بالسجل:

1. **دورة الحياة** (`RouterBackendLifecycle`) — _كيفية تشغيل المحرك_:
   - `in-process` — يعمل داخل عملية Node الخاصة بـ OmniRoute (مسار معالجة TS الأصلي).
   - `supervised` — عملية فرعية محلية يثبّتها OmniRoute ويشغّلها ويوقفها ويتحقق من سلامتها عبر `ServiceSupervisor`، ثم يستهلكها كاتصال بموفّر.
   - `external` — نقطة نهاية HTTP يرسل OmniRoute الطلبات إليها، لكنه **لا** يديرها (تُضبط عبر عنوان URL أساسي في متغير بيئة).
   - `disabled` — مسجّل، لكن لا يمكن اختياره.
2. **محور الاختيار** (واجهة توجيه الترحيل الخلفية) — _ما إذا كانت طبقة الترحيل ترسل الطلبات إليه_:
   `RelayRoutingBackend = "ts" | "bifrost" | "auto"` في
   `src/app/api/v1/relay/chat/completions/routingBackend.ts`.

الخطأ الذي يجب تجنبه: التعامل مع «الخدمة المضمّنة» و«واجهة التوجيه الخلفية» باعتبارهما قائمة واحدة. فهما ليسا كذلك. المحرك ذو دورة الحياة `supervised` ‏(9router/cliproxy) هو **اتصال بموفّر يستهلكه مسار المعالجة الأصلي**، وليس واجهة خلفية بديلة لإرسال طلبات الترحيل. أما `bifrost` فهو العكس — واجهة خلفية لإرسال طلبات الترحيل كانت (تاريخيًا) من النوع `external` فقط.

## السجل — المصدر الوحيد للحقيقة

يُصرّح عقد `domain/routing/routerBackends.ts` (سيصل الكود مع [#5868](https://github.com/diegosouzapw/OmniRoute/pull/5868)) بكل محرك مرة واحدة، مع دورة حياته وإمكاناته وهوية خدمته ومنفذه الافتراضي وإعدادات التحقق من السلامة ودعم القياس عن بُعد. يبحث المستهلكون عن المحركات عبر `getRouterBackend(id)` و`listRouterBackends()` و`listRouterBackendsByCapability(cap)` بدلًا من إضافة معالجة خاصة لكل عملية جانبية.

| الواجهة الخلفية | دورة الحياة  | الخدمة (المحور A) | واجهة الترحيل الخلفية (المحور B) | التحقق من السلامة | المنفذ الافتراضي |
| --------------- | ------------ | ----------------- | -------------------------------- | ----------------- | ---------------- |
| `ts`            | `in-process` | —                 | `ts` (أصلي)                      | —                 | —                |
| `bifrost`       | `external`¹  | —¹                | `bifrost` / `auto`               | `/health`         | —                |
| `cliproxy`      | `supervised` | `cliproxy`        | — (موفّر)                        | `/v1/models`      | 8317             |
| `9router`       | `supervised` | `9router`         | — (موفّر)                        | `/api/health`     | 20130            |
| `vibeproxy`     | `external`   | —                 | — (مهايئ موفّر)                  | `/v1/models`      | —                |

¹ تجري متابعة ترقية Bifrost إلى خدمة مضمّنة من النوع `supervised` (قابلة للتثبيت والتشغيل من `/api/services/bifrost/`) في [#5817](https://github.com/diegosouzapw/OmniRoute/pull/5817)؛ وحتى دمجه، يظل Bifrost من النوع `external` فقط (ولا يمكن الوصول إليه إلا عبر `BIFROST_BASE_URL`).

تتيح `capabilities` (`chat` و`responses` و`streaming` و`tools` و`vision` و`oauth-backed` و`dashboard-embed` و`model-sync` و`native-hot-path`) للجهات المستدعية التصفية استنادًا إلى ما يستطيع المحرك فعله فعليًا، بدلًا من الترميز الثابت لفروع خاصة بكل معرّف.

## المحور A — الخدمات المضمّنة (جانب العمليات الخاضعة للإشراف)

- **سجل العمليات الخاضعة للإشراف:** `src/lib/services/bootstrap.ts` ‏`SERVICES[]`
  (حاليًا: `9router`، و`cliproxy`).
- **المالك المسؤول عن دورة الحياة:** `src/lib/services/ServiceSupervisor.ts` — تنشئ `start()`
  العملية الفرعية، ولا تتابع إلا بعد نجاح `waitForHealthy()`، وتلتقط stdout/stderr في مخزن مؤقت حلقي؛
  وترسل `stop()` الإشارة SIGTERM ثم SIGKILL؛ وتُسلسل جميع العمليات تحت قفل.
- **اتحاد الحالات** (`src/lib/services/types.ts`):
  ‏`not_installed | stopped | starting | running | stopping | error`، بالإضافة إلى
  ‏`HealthState = healthy | unhealthy | unknown` المتعامدة معها.
- **لماذا عملية منفصلة (وليس SDK داخل العملية)؟** عزل العمليات هو ما يجعل
  التثبيت/التشغيل/الإيقاف/التحقق من الصحة/السجلات قابلة للتحكم بشكل مستقل لكل عملية جانبية، ويسمح
  بتطبيق حارس الإنشاء عبر loopback. تُعد نمذجة موائم داخل العملية عملًا مستقبليًا —
  وعلامة الإمكانية `native-hot-path` هي الموضع الذي سيُعبَّر فيه عن ذلك.

### عقد مسارات دورة الحياة (`/api/services/<tool>/…`)

رموز الحالة **خاصة بالحالة/الفعل/المسار حسب التصميم** — هذا هو العقد، وليس
عدم اتساق:

| الاستدعاء                    | الشرط                                  | الحالة                               |
| ---------------------------- | -------------------------------------- | ------------------------------------ |
| `POST .../start`             | الخدمة في حالة `not_installed`         | **409** (شرط مسبق)                   |
| `POST .../stop`              | متوقفة بالفعل                          | **200** (لا إجراء متكرر)             |
| `GET .../status`             | سليم                                   | **200** (`live ?? row ?? "unknown"`) |
| `POST .../start`             | فشل إنشاء العملية                      | **503** (مؤقت)                       |
| `GET .../status`, `.../stop` | خطأ غير ملتقط                          | **500**                              |
| `GET /api/services/<x>/logs` | الأداة `<x>` غير معروفة                | **404** `Service '<x>' not found`    |
| `GET .../status?reveal=key`  | غياب `X-Reveal-Confirm: yes`           | **403** (خاص بـ9router فقط)          |
| **أي** `/api/services/*`     | المستدعي ليس من loopback/شبكة LAN خاصة | **403 LOCAL_ONLY**                   |

تُنسَّق جميع أجسام الأخطاء بواسطة `createErrorResponse()` بالشكل التالي →
`{ error: { message, type }, requestId }`، حيث تُشتق قيمة `type` من رمز الحالة
(`500→server_error`، و`404→not_found`، و`409→conflict`، وإلا `invalid_request`)، وهي
المميّز القابل للمعالجة آليًا. تُنقَّح الرسائل مسبقًا
(`sanitizeErrorMessage()`، القاعدة الصارمة رقم 12).

**حارس loopback** هو المصدر الأكثر شيوعًا لرمز `403`: يقع `/api/services/` ضمن
`LOCAL_ONLY_API_PREFIXES` (`src/server/authz/routeGuard.ts`)، وترفض
`src/server/authz/policies/management.ts` أي مستدعٍ ليس من loopback أو شبكة LAN خاصة
**قبل المصادقة**، لأن هذه المسارات تنشئ عمليات فرعية (القاعدتان الصارمتان 15
و17). الوصول إليها عبر نفق عام يُرجع `403` حسب التصميم.

## المحور B — الواجهة الخلفية لتوجيه الترحيل (جانب الإرسال)

مسار وكيل الترحيل `/api/v1/relay/chat/completions` وحده هو الذي يحدد واجهة خلفية
للإرسال؛ أما الواجهة الرئيسية `/api/v1/chat/completions` فلا تستشير
`routingBackend.ts` مطلقًا.

- **التحديد** (`resolveRelayRoutingBackend`): مفتاح تبديل عام واحد عبر متغيرات البيئة —
  ‏`OMNIROUTE_RELAY_BACKEND` / `RELAY_ROUTING_BACKEND` ∈ {`ts`, `bifrost`, `auto`}.
  إذا لم يُعيَّن، تكون القيمة `auto` عندما يكون Bifrost مهيأً ومفعّلًا، وإلا فتكون `ts`.
- **السلوك:**
  - ‏`bifrost` (إجباري): يؤدي فشل Bifrost إلى خطأ `502` حاسم، من دون رجوع احتياطي.
  - ‏`auto`: يجرّب Bifrost، وعند الفشل/فترة التهدئة ينتقل بصمت إلى التنفيذ الأصلي.
  - ‏`ts` / بعد الرجوع الاحتياطي: مسار المترجم/المنفّذ الأصلي `open-sse`.
- **فترة التهدئة:** فترة تهدئة للفشل لكل `baseUrl` في `bifrostCooldown.ts`.

التحديد اليوم **إما شامل بالكامل أو غير مطبق على مستوى الترحيل** — لا يوجد تبديل للمحرك
لكل موفّر أو لكل طلب في `release/v3.8.43`. تجري إضافة بوابة لكل طلب
من خلال عمل بيان العملية الجانبية
([#5869](https://github.com/diegosouzapw/OmniRoute/pull/5869) البيان +
[#5870](https://github.com/diegosouzapw/OmniRoute/pull/5870) ‏`shouldTryBifrostForRequest`)،
ما يتيح لـ`auto` توجيه الموفّرين المؤهلين وفق البيان فقط عبر Bifrost.

## تكامل لوحة المعلومات

تستعلم لوحة معلومات الخدمات دوريًا من `GET /api/services/<tool>/status` كل 5 ثوانٍ عبر
`src/app/(dashboard)/dashboard/providers/services/hooks/useServiceStatus.ts`،
وتُرجع `{ tool, state, pid, port, health, installedVersion, latestVersion,
updateAvailable, autoStart, … }`. لا يوجد موفّر مشترك لسياق التوفّر —
إذ يستدعي كل مكوّن الخطاف لكل أداة. عند `!res.ok`، يعرض الخطاف حاليًا
`HTTP <status>` فقط؛ ويُعد ربط الحقل `error.type` بتفسير مفهوم للمستخدم
تحسينًا مخططًا لتجربة المستخدم، وليس تغييرًا في العقد.

## النتائج

- تُسجَّل المحركات الجديدة مرة واحدة في `ROUTER_BACKENDS`؛ وتحصل عليها الجهات المستهلكة عبر استعلامات
  الإمكانات من دون فروع جديدة خاصة بكل معرّف.
- تُحدَّد إجابة السؤال «هل هذه خدمة أم واجهة خلفية للتوجيه؟» بواسطة الحقل `lifecycle`، وليس
  بحسب القائمة التي يظهر فيها المعرّف عرضًا.
- يعتمد الإشراف على Bifrost ‏(#5817) وترحيل المسار الحرج الأصلي (#5670) على هذا
  العقد المشترك بدلًا من إضافة معالجة خاصة لكل عملية جانبية.
