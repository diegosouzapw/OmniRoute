# CLAUDE.md (العربية)

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇦🇿 [az](../az/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇮🇩 [in](../in/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md) · 🇨🇳 [zh-CN](../zh-CN/CLAUDE.md)

---

هذا الملف يوفر إرشادات لـ Claude Code (claude.ai/code) عند العمل مع الكود في هذا المستودع.

## البداية السريعة

```bash
npm install                    # تثبيت التبعيات (توليد .env تلقائيًا من .env.example)
npm run dev                    # خادم التطوير على http://localhost:20128
npm run build                  # بناء الإنتاج (Next.js 16 مستقل)
npm run lint                   # ESLint (0 أخطاء متوقعة؛ التحذيرات موجودة مسبقًا)
npm run typecheck:core         # فحص TypeScript (يجب أن يكون نظيفًا)
npm run typecheck:noimplicit:core  # فحص صارم (لا أي ضمني)
npm run test:coverage          # اختبارات الوحدة + بوابة التغطية (75/75/75/70 — العبارات/الأسطر/الدوال/الفروع)
npm run check                  # lint + اختبار مجتمعة
npm run check:cycles           # اكتشاف الاعتماديات الدائرية
```

### تشغيل الاختبارات

```bash
# ملف اختبار فردي (جهاز اختبار Node.js الأصلي — معظم الاختبارات)
node --import tsx/esm --test tests/unit/your-file.test.ts

# Vitest (خادم MCP، autoCombo، ذاكرة التخزين المؤقت)
npm run test:vitest

# جميع المجموعات
npm run test:all
```

للحصول على مصفوفة الاختبار الكاملة، راجع `CONTRIBUTING.md` → "تشغيل الاختبارات". للحصول على بنية عميقة، راجع `AGENTS.md`.

---

## نظرة عامة على المشروع

**OmniRoute** — وكيل/موجه AI موحد. نقطة نهاية واحدة، أكثر من 160 مزود LLM، تراجع تلقائي.

| الطبقة         | الموقع                  | الغرض                                                            |
| -------------- | ----------------------- | ---------------------------------------------------------------- |
| مسارات API     | `src/app/api/v1/`       | موجه تطبيق Next.js — نقاط الدخول                                 |
| المعالجات      | `open-sse/handlers/`    | معالجة الطلبات (الدردشة، التضمينات، إلخ)                         |
| المنفذون       | `open-sse/executors/`   | إرسال HTTP محدد لمزود الخدمة                                     |
| المترجمون      | `open-sse/translator/`  | تحويل التنسيق (OpenAI↔Claude↔Gemini)                             |
| المحول         | `open-sse/transformer/` | واجهات برمجة التطبيقات للردود ↔ إكمالات الدردشة                  |
| الخدمات        | `open-sse/services/`    | توجيه مجموعة، حدود المعدل، التخزين المؤقت، إلخ                   |
| قاعدة البيانات | `src/lib/db/`           | وحدات مجال SQLite (أكثر من 45 ملف، 55 ترحيل)                     |
| المجال/السياسة | `src/domain/`           | محرك السياسة، قواعد التكلفة، منطق التراجع                        |
| خادم MCP       | `open-sse/mcp-server/`  | 37 أداة (30 قاعدة + 3 ذاكرة + 4 مهارات)، 3 وسائل نقل، ~13 نطاقات |
| خادم A2A       | `src/lib/a2a/`          | بروتوكول وكيل JSON-RPC 2.0                                       |
| المهارات       | `src/lib/skills/`       | إطار عمل مهارات قابل للتوسيع                                     |
| الذاكرة        | `src/lib/memory/`       | ذاكرة محادثة دائمة                                               |

Monorepo: `src/` (تطبيق Next.js 16)، `open-sse/` (مساحة عمل محرك البث)، `electron/` (تطبيق سطح المكتب)، `tests/`، `bin/` (نقطة دخول CLI).

---

## خط أنابيب الطلب

```
العميل → /v1/chat/completions (مسار Next.js)
  → CORS → تحقق Zod → مصادقة؟ → فحص السياسة → حماية حقن المطالبات
  → handleChatCore() [open-sse/handlers/chatCore.ts]
    → تحقق من التخزين المؤقت → حد معدل الطلبات → توجيه مجموعة؟
      → resolveComboTargets() → handleSingleModel() لكل هدف
    → translateRequest() → getExecutor() → executor.execute()
      → fetch() upstream → إعادة المحاولة مع التراجع
    → ترجمة الاستجابة → تدفق SSE أو JSON
    → إذا كانت واجهة برمجة التطبيقات Responses: responsesTransformer.ts TransformStream
```

تتبع مسارات واجهة برمجة التطبيقات نمطًا متسقًا: `Route → CORS preflight → Zod body validation → مصادقة اختيارية (extractApiKey/isValidApiKey) → تنفيذ سياسة مفتاح واجهة برمجة التطبيقات → تفويض المعالج (open-sse)`. لا توجد وسائط عالمية لـ Next.js — الاعتراض خاص بالمسار.

**توجيه المجموعة** (`open-sse/services/combo.ts`): 14 استراتيجية (الأولوية، الوزن، ملء أولاً، التناوب، P2C، عشوائي، الأقل استخدامًا، الأمثل من حيث التكلفة، الواعي بإعادة التعيين، عشوائي صارم، تلقائي، lkgp، الأمثل من حيث السياق، نقل السياق). كل هدف يستدعي `handleSingleModel()` الذي يلف `handleChatCore()` مع معالجة الأخطاء الخاصة بكل هدف وفحوصات قاطع الدائرة. راجع `docs/routing/AUTO-COMBO.md` لتسجيل 9 عوامل Auto-Combo و `docs/architecture/RESILIENCE_GUIDE.md` للطبقات الثلاث من المرونة.

---

## حالة وقت التشغيل للمرونة

يمتلك OmniRoute ثلاث آليات فشل مؤقتة مرتبطة ولكن متميزة. حافظ على نطاقها منفصلًا عند تصحيح سلوك التوجيه. راجع
[مخطط المرونة ذو 3 طبقات](./docs/diagrams/exported/resilience-3layers.svg)
(المصدر: [docs/diagrams/resilience-3layers.mmd](./docs/diagrams/resilience-3layers.mmd))
لخريطة سريعة.

### قاطع دائرة المزود

**النطاق**: المزود بالكامل، مثل `glm`، `openai`، `anthropic`.

**الغرض**: إيقاف إرسال الحركة إلى مزود يفشل بشكل متكرر على مستوى الخدمة/التيار، حتى لا يؤدي مزود غير صحي إلى إبطاء كل طلب.

**التنفيذ**:

- الفئة الأساسية: `src/shared/utils/circuitBreaker.ts`
- توصيل بوابة الدردشة/التنفيذ: `src/sse/handlers/chatHelpers.ts`، `src/sse/handlers/chat.ts`
- واجهة برمجة التطبيقات لحالة وقت التشغيل: `src/app/api/monitoring/health/route.ts`
- الأغطية المشتركة: `open-sse/services/accountFallback.ts`
- جدول الحالة المستمرة: `domain_circuit_breakers`

**الحالات**:

- `CLOSED`: يُسمح بحركة المرور العادية.
- `OPEN`: تم حظر المزود مؤقتًا؛ يحصل المتصلون على استجابة قاطع دائرة المزود مفتوح
  أو يتخطى توجيه المجموعة إلى هدف آخر.
- `HALF_OPEN`: انتهت مهلة إعادة التعيين؛ يسمح بطلب اختبار. النجاح يغلق
  القاطع، والفشل يفتحه مرة أخرى.

**الإعدادات الافتراضية** (`open-sse/config/constants.ts`):

- مزودو OAuth: العتبة `3`، مهلة إعادة التعيين `60s`.
- مزودو مفتاح واجهة برمجة التطبيقات: العتبة `5`، مهلة إعادة التعيين `30s`.
- المزودون المحليون: العتبة `2`، مهلة إعادة التعيين `15s`.

يجب أن تؤدي حالات الفشل على مستوى المزود فقط إلى تفعيل قاطع المزود:

```ts
(408, 500, 502, 503, 504);
```

لا تقم بتفعيل قاطع المزود بالكامل لأخطاء الحساب/المفتاح/النموذج العادية مثل معظم
حالات `401`، `403`، أو `429`. عادةً ما تنتمي تلك إلى فترة تبريد الاتصال أو قفل النموذج. يجب أن يكون مزود مفتاح واجهة برمجة التطبيقات العام `403` قابلاً للاسترداد ما لم يتم تصنيفه كخطأ نهائي للمزود/الحساب.

يستخدم القاطع استردادًا كسولًا، وليس مؤقتًا في الخلفية. عندما تنتهي حالة `OPEN`، فإن عمليات القراءة مثل `getStatus()`, `canExecute()`, و `getRetryAfterMs()` تقوم بتحديث الحالة إلى `HALF_OPEN`، بحيث لا تستمر لوحات المعلومات وبناة مرشحي المجموعة في استبعاد مزود منتهي الصلاحية إلى الأبد.

### فترة تبريد الاتصال

**النطاق**: اتصال/حساب/مفتاح مزود واحد.

**الغرض**: تخطي مؤقت لمفتاح/حساب سيئ واحد مع السماح للاتصالات الأخرى لنفس المزود بالاستمرار في تقديم الطلبات.

**التنفيذ**:

- مسار الكتابة/التحديث: `src/sse/services/auth.ts::markAccountUnavailable()`
- اختيار/تصفية الحساب: `src/sse/services/auth.ts::getProviderCredentials...`
- حساب فترة التبريد: `open-sse/services/accountFallback.ts::checkFallbackError()`
- الإعدادات: `src/lib/resilience/settings.ts`

الحقول المهمة على اتصالات المزود:

```ts
rateLimitedUntil;
testStatus: "unavailable";
lastError;
lastErrorType;
errorCode;
backoffLevel;
```

أثناء اختيار الحساب، يتم تخطي الاتصال بينما:

```ts
new Date(rateLimitedUntil).getTime() > Date.now();
```

فترات التبريد أيضًا كسولة: عندما تكون `rateLimitedUntil` في الماضي، يصبح الاتصال مؤهلاً مرة أخرى. عند الاستخدام الناجح، تقوم `clearAccountError()` بمسح `testStatus`،
`rateLimitedUntil`، حقول الأخطاء، و `backoffLevel`.

سلوك فترة تبريد الاتصال الافتراضي:

- فترة تبريد أساسية لمزود OAuth: `5s`.
- فترة تبريد أساسية لمزود مفتاح واجهة برمجة التطبيقات: `3s`.
- يجب أن يفضل مفتاح واجهة برمجة التطبيقات `429` تلميحات إعادة المحاولة من المصدر (`Retry-After`، رؤوس إعادة التعيين، أو نص إعادة التعيين القابل للتحليل) عند توفرها.
- تستخدم الفشل القابلة للاسترداد المتكررة التراجع الأسي:

```ts
baseCooldownMs * 2 ** failureIndex;
```

تحمي حراسة مكافحة قطيع الرعد من الفشل المتزامن على نفس الاتصال من تمديد فترة التبريد بشكل متكرر أو زيادة `backoffLevel` مرتين.

الحالات النهائية ليست فترات تبريد. `banned`، `expired`، و `credits_exhausted` مصممة للبقاء غير متاحة حتى تتغير بيانات الاعتماد/الإعدادات أو يقوم مشغل بإعادة تعيينها. لا تقم بكتابة الحالات النهائية فوق حالة فترة التبريد العابرة.

### قفل النموذج

**النطاق**: المزود + الاتصال + النموذج.

**الغرض**: تجنب تعطيل اتصال كامل عندما يكون نموذج واحد فقط غير متاح أو محدود الحصة لذلك الاتصال.

أمثلة:

- مزودو الحصة لكل نموذج الذين يعيدون `429`.
- مزودون محليون يعيدون `404` لنموذج مفقود واحد.
- فشل إذن وضع/نموذج محدد للمزود مثل أوضاع Grok المختارة.

يعيش قفل النموذج في `open-sse/services/accountFallback.ts` ويسمح لنفس الاتصال بالاستمرار في تقديم نماذج أخرى.

### إرشادات التصحيح

- إذا تم تخطي جميع المفاتيح لمزود، تحقق من حالة قاطع المزود وحالة `rateLimitedUntil`/`testStatus` لكل اتصال.
- إذا بدا أن مزودًا ما مستبعدًا بشكل دائم بعد نافذة إعادة التعيين، تحقق مما إذا كان الكود يقرأ `state` الخام بدلاً من استخدام `getStatus()`/`canExecute()`.
- إذا فشل مفتاح مزود واحد ولكن يجب أن تعمل المفاتيح الأخرى، يفضل استخدام فترة تبريد الاتصال على قاطع المزود.
- إذا فشل نموذج واحد فقط، يفضل استخدام قفل النموذج على فترة تبريد الاتصال.
- إذا كان يجب أن يتعافى حالة ما ذاتيًا، يجب أن تحتوي على طابع زمني مستقبلي/مهلة إعادة تعيين ومسار قراءة يقوم بتحديث الحالة المنتهية. تتطلب الحالات الدائمة تغييرات يدوية في بيانات الاعتماد أو التكوين.

## الاتفاقيات الرئيسية

### نمط الكود

- **مسافتان**، فاصلات منقوطة، علامات اقتباس مزدوجة، عرض 100 حرف، فاصلات متأخرة ES5 (تطبق بواسطة lint-staged عبر Prettier)
- **الاستيرادات**: خارجي → داخلي (`@/`, `@omniroute/open-sse`) → نسبي
- **التسمية**: الملفات=camelCase/kebab، المكونات=PascalCase، الثوابت=UPPER_SNAKE
- **ESLint**: `no-eval`، `no-implied-eval`، `no-new-func` = خطأ في كل مكان؛ `no-explicit-any` = تحذير في `open-sse/` و `tests/`
- **TypeScript**: `strict: false`، الهدف ES2022، الوحدة esnext، دقة التجميع. يفضل الأنواع الصريحة.

### قاعدة البيانات

- **دائمًا** مرر عبر وحدات المجال في `src/lib/db/` — **لا** تكتب SQL خام في المسارات أو المعالجات
- **لا** تضف منطقًا إلى `src/lib/localDb.ts` (طبقة إعادة تصدير فقط)
- **لا** تستورد من `localDb.ts` بشكل مجمع — استورد وحدات `db/` المحددة بدلاً من ذلك
- مثيل قاعدة البيانات المفردة: `getDbInstance()` من `src/lib/db/core.ts` (تدوين WAL)
- الترحيلات: `src/lib/db/migrations/` — ملفات SQL ذات إصدار، متكررة، تعمل في معاملات

### معالجة الأخطاء

- try/catch مع أنواع أخطاء محددة، سجل باستخدام سياق pino
- لا تبتلع الأخطاء في تدفقات SSE — استخدم إشارات الإنهاء للتنظيف
- أعد القيم الصحيحة لرموز الحالة HTTP (4xx/5xx)

### الأمان

- **لا** تستخدم `eval()`، `new Function()`، أو eval الضمني
- تحقق من جميع المدخلات باستخدام مخططات Zod
- قم بتشفير بيانات الاعتماد عند الراحة (AES-256-GCM)
- قائمة حظر رأس المصدر: `src/shared/constants/upstreamHeaders.ts` — حافظ على التنظيف، ومخططات Zod، واختبارات الوحدة متوافقة عند التحرير
- **بيانات الاعتماد العامة للمصدر** (Gemini/Antigravity/Windsurf-style OAuth client_id/secret + مفاتيح Firebase Web المستخرجة من CLIs العامة): **يجب** تضمينها عبر `resolvePublicCred()` من `open-sse/utils/publicCreds.ts` — **لا** كأدلة نصية. انظر `docs/security/PUBLIC_CREDS.md` للنمط الإلزامي.
- **استجابات الأخطاء** (HTTP / SSE / المعالج / MCP): **يجب** توجيهها عبر `buildErrorBody()` أو `sanitizeErrorMessage()` من `open-sse/utils/error.ts` — **لا** تضع `err.stack` أو `err.message` الخام في جسم الاستجابة. انظر `docs/security/ERROR_SANITIZATION.md`.
- **أوامر الصدفة المبنية من المتغيرات**: عند استدعاء `exec()`/`spawn()` مع نص يحتاج إلى قيم وقت التشغيل، مررها عبر خيار `env` (تُهرب تلقائيًا) — **لا** تدمج مسارات غير موثوقة/خارجية في جسم النص. المرجع: `src/mitm/cert/install.ts::updateNssDatabases`.
- **المكتبات الآمنة بشكل افتراضي** ([tldrsec/awesome-secure-defaults](https://github.com/tldrsec/awesome-secure-defaults)): يفضل Helmet.js، DOMPurify، ssrf-req-filter، safe-regex، Google Tink على التنفيذات المخصصة كلما تم إضافة أسطح حساسة جديدة للأمان.

---

## سيناريوهات التعديل الشائعة

### إضافة مزود جديد

1. سجل في `src/shared/constants/providers.ts` (تم التحقق منه بواسطة Zod عند التحميل)
2. أضف معالج في `open-sse/executors/` إذا كانت هناك حاجة إلى منطق مخصص (قم بتمديد `BaseExecutor`)
3. أضف مترجمًا في `open-sse/translator/` إذا كان بتنسيق غير OpenAI
4. أضف تكوين OAuth في `src/lib/oauth/constants/oauth.ts` إذا كان يعتمد على OAuth — إذا كان CLI المصدر يرسل client_id/secret عام، قم بتضمينه عبر `resolvePublicCred()` (انظر `docs/security/PUBLIC_CREDS.md`)، **لا** كأدلة نصية
5. سجل النماذج في `open-sse/config/providerRegistry.ts`
6. اكتب اختبارات في `tests/unit/` (تضمن تأكيد شكل publicCreds إذا أضفت افتراضيًا جديدًا مضمنًا)

### إضافة مسار API جديد

1. أنشئ دليلًا تحت `src/app/api/v1/your-route/`
2. أنشئ `route.ts` مع معالجات `GET`/`POST`
3. اتبع النمط: CORS → تحقق من صحة جسم Zod → مصادقة اختيارية → تفويض المعالج
4. يذهب المعالج في `open-sse/handlers/` (استورد من هناك، وليس داخل السطر)
5. تستخدم استجابات الأخطاء `buildErrorBody()` / `errorResponse()` من `open-sse/utils/error.ts` (تم تنظيفها تلقائيًا — لا تضع `err.stack` أو `err.message` الخام في الجسم). انظر `docs/security/ERROR_SANITIZATION.md`.
6. أضف اختبارات — بما في ذلك على الأقل تأكيد واحد بأن استجابات الأخطاء لا تسرب تتبع المكدس (`!body.error.message.includes("at /")`)

### إضافة وحدة DB جديدة

1. أنشئ `src/lib/db/yourModule.ts` — استورد `getDbInstance` من `./core.ts`
2. صدر وظائف CRUD لجدول (جداول) المجال الخاص بك
3. أضف ترحيلًا في `src/lib/db/migrations/` إذا كانت هناك حاجة إلى جداول جديدة
4. أعد تصدير من `src/lib/localDb.ts` (أضف إلى قائمة إعادة التصدير فقط)
5. اكتب اختبارات

### إضافة أداة MCP جديدة

1. أضف تعريف الأداة في `open-sse/mcp-server/tools/` مع مخطط إدخال Zod + معالج غير متزامن
2. سجل في مجموعة الأدوات (موصول بواسطة `createMcpServer()`)
3. عيّن إلى النطاق (النطاقات) المناسبة
4. اكتب اختبارات (تسجيل استدعاء الأداة في جدول `mcp_audit`)

### إضافة مهارة A2A جديدة

1. أنشئ مهارة في `src/lib/a2a/skills/` (يوجد 5 بالفعل: التوجيه الذكي، إدارة الحصص، اكتشاف المزود، تحليل التكلفة، تقرير الصحة)
2. تتلقى المهارة سياق المهمة (الرسائل، البيانات الوصفية) → تعيد نتيجة منظمة
3. سجل في `A2A_SKILL_HANDLERS` في `src/lib/a2a/taskExecution.ts`
4. اعرض في `src/app/.well-known/agent.json/route.ts` (بطاقة الوكيل)
5. اكتب اختبارات في `tests/unit/`
6. وثق في جدول المهارات في `docs/frameworks/A2A-SERVER.md`

### إضافة وكيل سحابي جديد

1. أنشئ فئة وكيل في `src/lib/cloudAgent/agents/` تمتد من `CloudAgentBase` (يوجد 3 بالفعل: codex-cloud، devin، jules)
2. نفذ `createTask`، `getStatus`، `approvePlan`، `sendMessage`، `listSources`
3. سجل في `src/lib/cloudAgent/registry.ts`
4. أضف معالجة OAuth/بيانات الاعتماد إذا لزم الأمر (`src/lib/oauth/providers/`)
5. اختبارات + وثق في `docs/frameworks/CLOUD_AGENT.md`

### إضافة حواجز جديدة / تقييم / مهارة / حدث Webhook

- الحواجز: `src/lib/guardrails/` → الوثائق: `docs/security/GUARDRAILS.md`
- مجموعة التقييم: `src/lib/evals/` → الوثائق: `docs/frameworks/EVALS.md`
- المهارة (الصندوق الرمل): `src/lib/skills/` → الوثائق: `docs/frameworks/SKILLS.md`
- حدث Webhook: `src/lib/webhookDispatcher.ts` → الوثائق: `docs/frameworks/WEBHOOKS.md`

## وثائق المرجع

لأي تغيير غير تافه، اقرأ الغوص العميق المطابق أولاً:

| المجال                                    | الوثيقة                                                           |
| ----------------------------------------- | ----------------------------------------------------------------- |
| تنقل المستودع                             | `docs/architecture/REPOSITORY_MAP.md`                             |
| الهندسة                                   | `docs/architecture/ARCHITECTURE.md`                               |
| مرجع الهندسة                              | `docs/architecture/CODEBASE_DOCUMENTATION.md`                     |
| Auto-Combo (تقييم 9 عوامل، 14 استراتيجية) | `docs/routing/AUTO-COMBO.md`                                      |
| المرونة (3 آليات)                         | `docs/architecture/RESILIENCE_GUIDE.md`                           |
| إعادة تشغيل التفكير                       | `docs/routing/REASONING_REPLAY.md`                                |
| إطار المهارات                             | `docs/frameworks/SKILLS.md`                                       |
| نظام الذاكرة (FTS5 + Qdrant)              | `docs/frameworks/MEMORY.md`                                       |
| وكلاء السحابة                             | `docs/frameworks/CLOUD_AGENT.md`                                  |
| حواجز الأمان (PII / حقن / رؤية)           | `docs/security/GUARDRAILS.md`                                     |
| بيانات اعتماد عامة (Gemini/إلخ.)          | `docs/security/PUBLIC_CREDS.md`                                   |
| تطهير رسائل الخطأ                         | `docs/security/ERROR_SANITIZATION.md`                             |
| التقييمات                                 | `docs/frameworks/EVALS.md`                                        |
| الامتثال / التدقيق                        | `docs/security/COMPLIANCE.md`                                     |
| Webhooks                                  | `docs/frameworks/WEBHOOKS.md`                                     |
| خط أنابيب التفويض                         | `docs/architecture/AUTHZ_GUIDE.md`                                |
| التخفي (TLS / بصمة)                       | `docs/security/STEALTH_GUIDE.md`                                  |
| بروتوكولات الوكلاء (A2A / ACP / سحابة)    | `docs/frameworks/AGENT_PROTOCOLS_GUIDE.md`                        |
| خادم MCP                                  | `docs/frameworks/MCP-SERVER.md`                                   |
| خادم A2A                                  | `docs/frameworks/A2A-SERVER.md`                                   |
| مرجع API + OpenAPI                        | `docs/reference/API_REFERENCE.md` + `docs/reference/openapi.yaml` |
| كتالوج المزودين (تم إنشاؤه تلقائيًا)      | `docs/reference/PROVIDER_REFERENCE.md`                            |
| تدفق الإصدار                              | `docs/ops/RELEASE_CHECKLIST.md`                                   |

## الاختبار

| ما                      | الأمر                                                                 |
| ----------------------- | --------------------------------------------------------------------- |
| اختبارات الوحدة         | `npm run test:unit`                                                   |
| ملف واحد                | `node --import tsx/esm --test tests/unit/file.test.ts`                |
| Vitest (MCP, autoCombo) | `npm run test:vitest`                                                 |
| E2E (Playwright)        | `npm run test:e2e`                                                    |
| بروتوكول E2E (MCP+A2A)  | `npm run test:protocols:e2e`                                          |
| النظام البيئي           | `npm run test:ecosystem`                                              |
| بوابة التغطية           | `npm run test:coverage` (75/75/75/70 — العبارات/الأسطر/الدوال/الفروع) |
| تقرير التغطية           | `npm run coverage:report`                                             |

**قاعدة PR**: إذا قمت بتغيير كود الإنتاج في `src/`، `open-sse/`، `electron/`، أو `bin/`، يجب عليك تضمين أو تحديث الاختبارات في نفس PR.

**تفضيل طبقة الاختبار**: الوحدة أولاً → التكامل (حالة متعددة الوحدات أو قاعدة البيانات) → e2e (واجهة المستخدم/سير العمل فقط). قم بتشفير إعادة إنتاج الأخطاء كاختبارات آلية قبل أو بالتزامن مع الإصلاح.

**سياسة تغطية Copilot**: عندما يغير PR كود الإنتاج وتكون التغطية أقل من 75% (العبارات/الأسطر/الدوال) أو 70% (الفروع)، لا تقم بالإبلاغ فقط — أضف أو قم بتحديث الاختبارات، أعد تشغيل بوابة التغطية، ثم اطلب التأكيد. قم بتضمين الأوامر التي تم تشغيلها، وملفات الاختبار التي تم تغييرها، ونتيجة التغطية النهائية في تقرير PR.

---

## سير عمل Git

```bash
# لا تقم بالالتزام مباشرة إلى main
git checkout -b feat/your-feature
git commit -m "feat: وصف التغيير الخاص بك"
git push -u origin feat/your-feature
```

**بادئات الفروع**: `feat/`، `fix/`، `refactor/`، `docs/`، `test/`، `chore/`

**تنسيق الالتزام** (Commits التقليدية): `feat(db): إضافة قاطع الدائرة` — النطاقات: `db`، `sse`، `oauth`، `dashboard`، `api`، `cli`، `docker`، `ci`، `mcp`، `a2a`، `memory`، `skills`

**خطافات Husky**:

- **pre-commit**: lint-staged + `check-docs-sync` + `check:any-budget:t11`
- **pre-push**: `npm run test:unit`

---

## البيئة

- **وقت التشغيل**: Node.js ≥20.20.2 <21 || ≥22.22.2 <23 || ≥24 <25، وحدات ES
- **TypeScript**: 5.9+، الهدف ES2022، الوحدة esnext، دقة المجمع
- **أسماء المسارات**: `@/*` → `src/`، `@omniroute/open-sse` → `open-sse/`، `@omniroute/open-sse/*` → `open-sse/*`
- **المنفذ الافتراضي**: 20128 (API + لوحة التحكم على نفس المنفذ)
- **دليل البيانات**: متغير البيئة `DATA_DIR`، الافتراضي هو `~/.omniroute/`
- **المتغيرات البيئية الرئيسية**: `PORT`، `JWT_SECRET`، `API_KEY_SECRET`، `INITIAL_PASSWORD`، `REQUIRE_API_KEY`، `APP_LOG_LEVEL`
- الإعداد: `cp .env.example .env` ثم توليد `JWT_SECRET` (`openssl rand -base64 48`) و `API_KEY_SECRET` (`openssl rand -hex 32`)

---

## القواعد الصارمة

1. لا تقم بالالتزام بالأسرار أو بيانات الاعتماد
2. لا تضف منطقًا إلى `localDb.ts`
3. لا تستخدم `eval()` / `new Function()` / eval الضمني
4. لا تقم بالالتزام مباشرة إلى `main`
5. لا تكتب SQL الخام في المسارات — استخدم وحدات `src/lib/db/`
6. لا تبتلع الأخطاء بصمت في تدفقات SSE
7. تحقق دائمًا من المدخلات باستخدام مخططات Zod
8. قم دائمًا بتضمين الاختبارات عند تغيير كود الإنتاج
9. يجب أن تبقى التغطية ≥75% (العبارات، الأسطر، الدوال) / ≥70% (الفروع). القياس الحالي: ~82%.
10. لا تتجاوز خطافات Husky (`--no-verify`، `--no-gpg-sign`) بدون موافقة مشغل صريحة.
11. لا تقم بتضمين `client_id/secret` العامة من OAuth أو مفاتيح Firebase Web كقيم نصية — دائمًا استخدم `resolvePublicCred()` (`open-sse/utils/publicCreds.ts`). انظر `docs/security/PUBLIC_CREDS.md`.
12. لا تقم بإرجاع `err.stack` / `err.message` الخام في HTTP / SSE / استجابات المنفذ — دائمًا قم بتوجيهها عبر `buildErrorBody()` أو `sanitizeErrorMessage()` (`open-sse/utils/error.ts`). انظر `docs/security/ERROR_SANITIZATION.md`.
13. لا تقم بإدراج مسارات خارجية أو قيم وقت التشغيل في سكربتات الشل المرسلة إلى `exec()`/`spawn()` — مرر عبر خيار `env` بدلاً من ذلك. المرجع: `src/mitm/cert/install.ts::updateNssDatabases`.
14. لا تتجاهل تنبيه CodeQL / Secret-Scanning بدون (أ) التحقق أولاً من وثائق النمط أعلاه لمعرفة ما إذا كان المساعد ينطبق، و (ب) تسجيل التبرير الفني في تعليق الإلغاء. سابقة: `js/stack-trace-exposure` التي تم رفعها على مواقع الاتصال التي تمر بالفعل عبر `sanitizeErrorMessage()` هي قيود معروفة لـ CodeQL (المعقمات المخصصة غير معترف بها) — تجاهل كـ `false positive` مع الإشارة إلى `docs/security/ERROR_SANITIZATION.md`.
15. لا تعرض المسارات التي تولد عمليات فرعية (`/api/mcp/`، `/api/cli-tools/runtime/`) بدون تصنيف `isLocalOnlyPath()` في `src/server/authz/routeGuard.ts`. يتم تنفيذ التحقق من الحلقة بشكل غير مشروط قبل أي تحقق من المصادقة — لا يمكن أن يؤدي تسرب JWT عبر النفق إلى تشغيل العملية. انظر `docs/security/ROUTE_GUARD_TIERS.md`.
16. لا تقم بتضمين ملحقات `Co-Authored-By` في رسائل الالتزام. يجب أن تظهر الالتزامات فقط تحت هوية مالك المستودع في Git (`diegosouzapw`). سطر `Co-Authored-By: Claude …` يتسبب في نسب الالتزامات إلى حساب `claude` في Anthropic، مما يخفي المؤلف الحقيقي في تاريخ PR.
