# Public Credentials Handling (العربية)

🌐 **Languages:** 🇺🇸 [English](../../../../security/PUBLIC_CREDS.md) · 🇪🇹 [am](../../../am/docs/security/PUBLIC_CREDS.md) · 🇦🇿 [az](../../../az/docs/security/PUBLIC_CREDS.md) · 🇧🇬 [bg](../../../bg/docs/security/PUBLIC_CREDS.md) · 🇧🇩 [bn](../../../bn/docs/security/PUBLIC_CREDS.md) · 🇧🇦 [bs](../../../bs/docs/security/PUBLIC_CREDS.md) · 🇨🇿 [cs](../../../cs/docs/security/PUBLIC_CREDS.md) · 🇩🇰 [da](../../../da/docs/security/PUBLIC_CREDS.md) · 🇩🇪 [de](../../../de/docs/security/PUBLIC_CREDS.md) · 🇬🇷 [el](../../../el/docs/security/PUBLIC_CREDS.md) · 🇪🇸 [es](../../../es/docs/security/PUBLIC_CREDS.md) · 🇪🇪 [et](../../../et/docs/security/PUBLIC_CREDS.md) · 🇮🇷 [fa](../../../fa/docs/security/PUBLIC_CREDS.md) · 🇫🇮 [fi](../../../fi/docs/security/PUBLIC_CREDS.md) · 🇫🇷 [fr](../../../fr/docs/security/PUBLIC_CREDS.md) · 🇮🇪 [ga](../../../ga/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [gu](../../../gu/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [ha](../../../ha/docs/security/PUBLIC_CREDS.md) · 🇮🇱 [he](../../../he/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [hi](../../../hi/docs/security/PUBLIC_CREDS.md) · 🇭🇷 [hr](../../../hr/docs/security/PUBLIC_CREDS.md) · 🇭🇺 [hu](../../../hu/docs/security/PUBLIC_CREDS.md) · 🇦🇲 [hy](../../../hy/docs/security/PUBLIC_CREDS.md) · 🇮🇩 [id](../../../id/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [ig](../../../ig/docs/security/PUBLIC_CREDS.md) · 🇮🇹 [it](../../../it/docs/security/PUBLIC_CREDS.md) · 🇯🇵 [ja](../../../ja/docs/security/PUBLIC_CREDS.md) · 🇬🇪 [ka](../../../ka/docs/security/PUBLIC_CREDS.md) · 🇰🇭 [km](../../../km/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [kn](../../../kn/docs/security/PUBLIC_CREDS.md) · 🇰🇷 [ko](../../../ko/docs/security/PUBLIC_CREDS.md) · 🇱🇹 [lt](../../../lt/docs/security/PUBLIC_CREDS.md) · 🇱🇻 [lv](../../../lv/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [ml](../../../ml/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [mr](../../../mr/docs/security/PUBLIC_CREDS.md) · 🇲🇾 [ms](../../../ms/docs/security/PUBLIC_CREDS.md) · 🇲🇹 [mt](../../../mt/docs/security/PUBLIC_CREDS.md) · 🇲🇲 [my](../../../my/docs/security/PUBLIC_CREDS.md) · 🇳🇵 [ne](../../../ne/docs/security/PUBLIC_CREDS.md) · 🇳🇱 [nl](../../../nl/docs/security/PUBLIC_CREDS.md) · 🇳🇴 [no](../../../no/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [or](../../../or/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [pa](../../../pa/docs/security/PUBLIC_CREDS.md) · 🇵🇭 [phi](../../../phi/docs/security/PUBLIC_CREDS.md) · 🇵🇱 [pl](../../../pl/docs/security/PUBLIC_CREDS.md) · 🇵🇹 [pt](../../../pt/docs/security/PUBLIC_CREDS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/PUBLIC_CREDS.md) · 🇷🇴 [ro](../../../ro/docs/security/PUBLIC_CREDS.md) · 🇷🇺 [ru](../../../ru/docs/security/PUBLIC_CREDS.md) · 🇱🇰 [si](../../../si/docs/security/PUBLIC_CREDS.md) · 🇸🇰 [sk](../../../sk/docs/security/PUBLIC_CREDS.md) · 🇸🇮 [sl](../../../sl/docs/security/PUBLIC_CREDS.md) · 🇷🇸 [sr](../../../sr/docs/security/PUBLIC_CREDS.md) · 🇸🇪 [sv](../../../sv/docs/security/PUBLIC_CREDS.md) · 🇰🇪 [sw](../../../sw/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [ta](../../../ta/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [te](../../../te/docs/security/PUBLIC_CREDS.md) · 🇹🇭 [th](../../../th/docs/security/PUBLIC_CREDS.md) · 🇹🇷 [tr](../../../tr/docs/security/PUBLIC_CREDS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/PUBLIC_CREDS.md) · 🇵🇰 [ur](../../../ur/docs/security/PUBLIC_CREDS.md) · 🇺🇿 [uz](../../../uz/docs/security/PUBLIC_CREDS.md) · 🇻🇳 [vi](../../../vi/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [yo](../../../yo/docs/security/PUBLIC_CREDS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/PUBLIC_CREDS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/PUBLIC_CREDS.md)

---

> **مصدر الحقيقة:** `open-sse/utils/publicCreds.ts`
> **الاختبارات:** `tests/unit/publicCreds.test.ts`
> **آخر تحديث:** 2026-08-07 — v3.8.50
> **الجمهور المستهدف:** المهندسون الذين يدمجون موفّرين يضمّنون قيم OAuth العامة من نوع client_id / client_secret / Firebase Web API keys في واجهات CLI العامة الخاصة بهم.
> **الحالة:** **إلزامي** لجميع الشيفرات الجديدة التي تضمّن معرّفات من المصدر الخارجي.

## سبب وجود هذا الحل

- [OAuth 2.0 للتطبيقات الأصلية (PKCE)](https://developers.google.com/identity/protocols/oauth2/native-app) — قيم OAuth من نوع client_id / client_secret للتطبيقات المثبّتة عامة؛ ويوفّر PKCE الحماية الفعلية.
- [مفاتيح Firebase API](https://firebase.google.com/docs/projects/api-keys) — معرّفات عملاء الويب عامة بحكم التصميم.

يجب على OmniRoute تضمين هذه القيم لكي يحصل المستخدمون الذين لا يضبطون `.env` على تدفّق OAuth يعمل مباشرةً دون إعداد إضافي. ومن دون قيمة احتياطية مضمّنة، يتوقف موفّرا Gemini / Antigravity عن العمل لأي مستخدم يتبع مسار «الاستنساخ والتشغيل فحسب».

لكن القيم الحرفية مثل `AIzaSy…` و`GOCSPX-…` و`…apps.googleusercontent.com` تلتقطها أدوات **GitHub Secret Scanning** و**Semgrep** وغيرها من أدوات الفحص المعتمدة على الأنماط. ونتيجةً لذلك، يتحول كل إصدار إلى سيل مزعج من النتائج الإيجابية الكاذبة، وتمنع حماية الدفع التزامات مشروعة، ويتوقف المشغّلون عن الوثوق بخلاصة التنبيهات.

يحل المساعد `open-sse/utils/publicCreds.ts` كلا القيدين في الوقت نفسه:

- يضمّن المعرّف العام باعتباره **تسلسل بايتات مقنّعًا باستخدام XOR** (من دون نمط يمكن للماسح اكتشافه في المصدر).
- يفك ترميزه في وقت التشغيل عبر `decodePublicCred` / `resolvePublicCred`.
- يكتشف القيم الخام التي تتبع بالفعل بادئات معروفة (`AIza` و`GOCSPX-` و`<digits>-<32hex>.apps.googleusercontent.com` و`Iv1.<hex>`) ويمرّرها دون تغيير، بحيث تظل القيم الخام الموجودة لدى المستخدمين في ملفات `.env` الحالية تعمل **من دون أي ترحيل**.

هذا **تمويه وليس تشفيرًا.** يمكن لأي شخص يقرأ المصدر استعادة القيمة — وهذا مقبول لأن القيمة عامة بحكم التصميم. الهدف الوحيد هو تجنب التطابق مع التعبيرات النمطية للماسحات.

## النمط الإلزامي

### 1. إضافة بيانات اعتماد عامة جديدة

عندما تحتاج إلى تضمين قيمة جديدة يوفّرها مصدر خارجي وتكون:

- آتية من CLI عام / تطبيق سطح مكتب / حزمة متصفح، **و**
- موثّقة من الموفّر الخارجي (أو يتعامل معها) باعتبارها معرّف عميل عامًا، **و**
- ستلتقطها أداة فحص أنماط لولا ذلك (`AIza…` و`GOCSPX-…` و`<digits>-…apps.googleusercontent.com` وما إلى ذلك)،

…فاتبع قائمة التحقق هذه:

1. أنشئ تسلسل البايتات المقنّع:

   ```bash
   node --import tsx/esm -e \
     'import("./open-sse/utils/publicCreds.ts").then(m =>
        console.log(JSON.stringify(Array.from(
          Buffer.from(m.encodePublicCred("THE_PUBLIC_VALUE"), "base64")
        ))))'
   ```

2. أضف إدخالًا جديدًا إلى `EMBEDDED_DEFAULTS` في `open-sse/utils/publicCreds.ts` باسم مفتاح **محايد** (`<provider>_id` أو `<provider>_alt` أو `<provider>_fb` وما إلى ذلك). **لا** تستخدم أسماء مثل `client_secret` أو `api_key` في المساعد — فهذه الكلمات تشغّل قواعد الأسرار العامة في Semgrep.

3. أضف `keyof typeof EMBEDDED_DEFAULTS` إلى اتحاد الأنواع العام (يُستدل عليه تلقائيًا).

4. في شيفرة المستهلك، استبدل القيمة الحرفية المضمّنة بما يلي:

   ```ts
   // تجاوز واحد عبر متغير بيئة
   clientSecret: resolvePublicCred("provider_alt", "PROVIDER_OAUTH_CLIENT_SECRET"),

   // عدة أسماء بديلة لمتغيرات البيئة (تفوز أول قيمة غير فارغة)
   clientId: resolvePublicCredMulti("provider_id", [
     "PROVIDER_CLI_OAUTH_CLIENT_ID",
     "PROVIDER_OAUTH_CLIENT_ID",
   ]),

   // من دون تجاوز عبر متغير بيئة (استخدم دائمًا القيمة الافتراضية المضمّنة)
   firebaseApiKey: resolvePublicCred("provider_fb"),
   ```

5. أزل القيمة الحرفية من `.env.example` (واستبدلها بتوثيق مكوّن من تعليقات فقط يوجّه القراء إلى هنا):

   ```dotenv
   # ── الموفّر (Google / Firebase / إلخ) ──
   # بيانات اعتماد OAuth العامة مضمّنة في الشيفرة عبر
   # open-sse/utils/publicCreds.ts. اضبط هذه المتغيرات فقط لاستخدام بياناتك الخاصة.
   # PROVIDER_OAUTH_CLIENT_ID=
   # PROVIDER_OAUTH_CLIENT_SECRET=
   ```

6. حدّث `tests/unit/publicCreds.test.ts` لإضافة تأكيد على بنية المفتاح الجديد (تحقق من التنسيق، لا من القيمة الحرفية — راجع الاختبارات الحالية لمعرفة النمط).

7. **لا تضف أبدًا** قيمًا حرفية من نوع `AIza…` / `GOCSPX-…` / `…apps.googleusercontent.com` إلى ملفات الاختبار. استخدم ثوابت `FAKE_*` المبنية من أجزاء `.join("")` (راجع الاختبارات الحالية).

### 2. المستهلكون

- **اقرأ من `resolvePublicCred()` / `resolvePublicCredMulti()` فقط** — لا تستدعِ `decodePublicCredBytes()` مباشرةً خارج المساعد مطلقًا.
- المساعد خفيف عمدًا (عملية XOR خطية على البايتات) وآمن للاستدعاء عند تحميل الوحدة؛ وتُحسب القيم الافتراضية مرة واحدة.
- يتقدم تجاوز متغير البيئة دائمًا. إذا ضبط مستخدم `PROVIDER_OAUTH_CLIENT_SECRET=GOCSPX-myown`، فسيمرّر المساعد تلك القيمة الخام دون تغيير.

### 3. الأنماط المحظورة

❌ **لا** تنفّذ مطلقًا أيًا مما يلي في شيفرة الإنتاج (`src/` أو `open-sse/` أو `electron/` أو `bin/`):

```ts
// سيئ: تؤدي القيمة الحرفية إلى تشغيل Secret Scanning وSemgrep
clientSecret: process.env.PROVIDER_OAUTH_CLIENT_SECRET || "GOCSPX-realvalue",

// سيئ: ترميز القيمة الحرفية باستخدام base64 — لا يزال GitHub يكتشفها منذ Feb/2025
clientSecret: process.env.PROVIDER_OAUTH_CLIENT_SECRET ||
  Buffer.from("R09DU1BYLXJlYWx2YWx1ZQ==", "base64").toString(),

// سيئ: تسلسل النصوص الذي يعيد تجميع النمط في وقت التشغيل
clientSecret: "GO" + "CS" + "PX-" + "realvalue",

// سيئ: ترميز hex/ROT13 — تمويه مختلف، مع خطر الاكتشاف نفسه
clientSecret: hexDecode("474f4353..."),
```

ستؤدي كل هذه الأساليب في النهاية إلى تشغيل أداة فحص. استخدم `resolvePublicCred()`.

❌ **لا تضف أبدًا** بيانات اعتماد حرفية إلى `.env.example`. يمكن للمستخدمين الذين يحتاجون إلى قيم حقيقية من المصدر الخارجي استخراجها بأنفسهم من CLI العام، أو استخدام تسجيل OAuth الخاص بهم.

❌ **لا تتجاهل أبدًا** تنبيهًا جديدًا من أداة فحص الأسرار قبل التحقق أولًا مما إذا كان يجب نقل بيانات الاعتماد إلى هذا المساعد.

## عناصر التحكم ذات الصلة

- يسرد `RAW_VALUE_PATTERN` في `publicCreds.ts` البادئات التي تؤدي إلى التمرير المباشر (للتوافق مع الإصدارات السابقة). لا توسّعه إلا لتنسيقات بيانات الاعتماد العامة الموثّقة، وليس للأسرار الاحتكارية مطلقًا.
- يوجد `.env.example` ضمن البرنامج النصي `check-env-doc-sync` في CI — عند إزالة متغير من هنا، تأكد من مطابقة الوثائق.
- يجب أن تظل مجموعتا الاختبارات `npm run test:vitest` و`node --import tsx/esm --test tests/unit/publicCreds.test.ts` ناجحتين.

## متى يجب عدم استخدام هذه الدالة المساعدة

هذه الدالة المساعدة مخصصة **فقط** لبيانات الاعتماد التي تكون:

1. موزعة علنًا بواسطة المزوّد الأصلي (ملف CLI ثنائي، حزمة متصفح، وثائق رسمية).
2. موثّقة أو يُفهم ضمنيًا وبوضوح أنها غير سرية (محمية بواسطة PKCE، أو مفتاح Firebase Web، أو ما شابه).

في جميع الحالات الأخرى — الرموز المميزة التي يصدرها المشغّل، والأسرار الخاصة بكل مستأجر، وclient_secret الخاص بتطبيق OAuth الذي تملكه، ومفاتيح التشفير، وأسرار JWT، وكلمات مرور قواعد البيانات — استخدم **متغيرات البيئة فقط** (`process.env.FOO`، مع استخدام `||` كقيمة احتياطية فارغة / خطأ صريح). مكان هذه البيانات هو `.env` و[مخزن بيانات الاعتماد المشفّر](./COMPLIANCE.md)، وليس الشيفرة المصدرية.

## المراجع

- [Google: OAuth 2.0 للتطبيقات الأصلية](https://developers.google.com/identity/protocols/oauth2/native-app)
- [Firebase: مفاتيح API لتعريف العميل](https://firebase.google.com/docs/projects/api-keys)
- [الأسرار التي يدعمها GitHub Secret Scanning](https://docs.github.com/en/code-security/secret-scanning/introduction/supported-secret-scanning-patterns)
- [GitHub: اكتشاف ترميز base64 للرموز المميزة (فبراير 2025)](https://github.blog/changelog/2025-02-14-secret-scanning-detects-base64-encoded-github-tokens/)
- الالتزام الذي قدّم هذه الدالة المساعدة: `1a39c31f` — _fix(security): إخفاء بيانات الاعتماد العامة من المزوّد الأصلي + توحيد تنقية الأخطاء_
