# 🌐 OmniRoute Proxy Guide (العربية)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/PROXY_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/PROXY_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/PROXY_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/PROXY_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/PROXY_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/PROXY_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/PROXY_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/PROXY_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/PROXY_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/PROXY_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/PROXY_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/PROXY_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/PROXY_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/PROXY_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/PROXY_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/PROXY_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/PROXY_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/PROXY_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/PROXY_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/PROXY_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/PROXY_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/PROXY_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/PROXY_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/PROXY_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/PROXY_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/PROXY_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/PROXY_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/PROXY_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/PROXY_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/PROXY_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/PROXY_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/PROXY_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/PROXY_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/PROXY_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/PROXY_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/PROXY_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/PROXY_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/PROXY_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/PROXY_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/PROXY_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/PROXY_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/PROXY_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/PROXY_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/PROXY_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/PROXY_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/PROXY_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/PROXY_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/PROXY_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/PROXY_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/PROXY_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/PROXY_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/PROXY_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/PROXY_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/PROXY_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/PROXY_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/PROXY_GUIDE.md)

---

> **تجاوز الحظر الجغرافي، واحمِ هويتك، ووجّه حركة مرور الذكاء الاصطناعي عبر أي وكيل — من دون أي تعقيد في الإعداد.**

يتضمن OmniRoute نظامًا متكامل الميزات لإدارة الوكلاء، يتيح لك توجيه حركة المرور إلى مزوّدي الذكاء الاصطناعي في المنبع عبر وكلاء HTTP أو HTTPS أو SOCKS5. سواء كنت في منطقة محظورة، أو تحتاج إلى تدوير عناوين IP، أو ترغب في إخفاء البصمة — يغطي هذا الدليل كل ما تحتاج إليه.

---

## جدول المحتويات

- [لماذا تستخدم الوكلاء؟](#why-use-proxies)
- [نظرة عامة على البنية](#architecture-overview)
- [نظام الوكلاء ذي المستويات الأربعة](#4-level-proxy-system)
- [سجل الوكلاء (CRUD)](#proxy-registry-crud)
- [سوق 1proxy المجاني](#1proxy-free-proxy-marketplace)
- [تدوير الوكلاء](#proxy-rotation)
- [مكافحة الاكتشاف والتخفي](#anti-detection--stealth)
- [أوضاع وكيل المنبع](#upstream-proxy-modes)
- [واجهة لوحة المعلومات](#dashboard-ui)
- [مرجع API](#api-reference)
- [متغيرات البيئة](#environment-variables)
- [استكشاف الأخطاء وإصلاحها](#troubleshooting)

---

## لماذا تستخدم الوكلاء؟

يفرض العديد من مزوّدي الذكاء الاصطناعي قيودًا على الوصول حسب المنطقة الجغرافية. ويواجه المطورون في **روسيا والصين وإيران وكوبا وتركيا** وغيرها من البلدان أخطاءً مثل:

```
unsupported_country_region_territory
```

حتى خارج المناطق المحظورة، تكون الوكلاء مفيدة في الحالات التالية:

| حالة الاستخدام           | الوصف                                                            |
| ------------------------ | ---------------------------------------------------------------- |
| **تجاوز الحظر الجغرافي** | الوصول إلى OpenAI وAnthropic وCodex وCopilot من البلدان المحظورة |
| **تدوير عناوين IP**      | توزيع الطلبات عبر عدة عناوين IP لتجنب تحديد المعدل               |
| **الخصوصية**             | إخفاء عنوان IP الحقيقي عن مزوّدي المنبع                          |
| **الامتثال**             | توجيه حركة المرور عبر نطاقات قضائية محددة                        |
| **الاختبار**             | محاكاة الطلبات من مناطق مختلفة                                   |

---

## نظرة عامة على البنية

```
┌───────────────────────────────────────────────────────────────┐
│                       خادم OmniRoute                          │
│                                                               │
│  ┌─────────────┐    ┌──────────────┐    ┌──────────────────┐  │
│  │ سجل         │    │ موزّع        │    │ Fetch (undici)   │  │
│  │ الوكلاء     │───▶│ الوكلاء      │───▶│                  │  │
│  │ (SQLite)    │    │ (مخزّن مؤقتًا)│    │                  │  │
│  └─────────────┘    └──────────────┘    └────────┬─────────┘  │
│         ▲                                        │            │
│         │                                        ▼            │
│  ┌──────┴──────┐                        ┌──────────────────┐  │
│  │ مزامنة      │                        │ API لمزوّد       │  │
│  │ 1proxy      │                        │ المنبع            │  │
│  │ (مجمع مجاني)│                        │                  │  │
│  └─────────────┘                        └──────────────────┘  │
└───────────────────────────────────────────────────────────────┘
```

### المكوّنات الرئيسية

| المكوّن                 | الملف                                        | الدور                                                    |
| ----------------------- | -------------------------------------------- | -------------------------------------------------------- |
| **سجل الوكلاء**         | `src/lib/db/proxies.ts`                      | عمليات CRUD لإدخالات الوكلاء وتعيينات النطاق             |
| **موزّع الوكلاء**       | `open-sse/utils/proxyDispatcher.ts`          | ينشئ موزّعات `undici` ProxyAgent/SOCKS مع التخزين المؤقت |
| **الجلب عبر الوكيل**    | `open-sse/utils/proxyFetch.ts`               | يغلّف `fetch()` بحقن موزّع الوكيل                        |
| **مسار الإعدادات**      | `src/app/api/settings/proxy/route.ts`        | API قديم لإعداد الوكيل (GET/PUT/DELETE)                  |
| **مسار الإدارة**        | `src/app/api/v1/management/proxies/route.ts` | API لعمليات CRUD في السجل (GET/POST/PATCH/DELETE)        |
| **قاعدة بيانات 1proxy** | `src/lib/db/oneproxy.ts`                     | التخزين الدائم لسوق الوكلاء المجاني                      |

---

## نظام الوكيل رباعي المستويات

يدعم OmniRoute إعداد الوكيل على **أربعة نطاقات مستقلة**، ويتم تحديدها وفق ترتيب الأولوية:

```
ترتيب تحديد الأولوية (من الأعلى → إلى الأدنى):

  1. 🔵 وكيل الحساب/الاتصال  →  لكل مفتاح API / اتصال OAuth
  2. 🟡 وكيل المزوّد          →  لكل مزوّد (مثلًا، كل حركة مرور OpenAI)
  3. 🟠 وكيل المجموعة         →  لكل إعداد مجموعة/توجيه
  4. 🟢 الوكيل العام          →  كل حركة المرور، جميع المزوّدين
```

### كيفية تحديد الوكيل

عندما يرسل OmniRoute طلبًا إلى مزوّد خارجي، فإنه يستدعي `resolveProxyForConnectionFromRegistry()`، التي تتحقق من كل مستوى بالترتيب:

1. **مستوى الحساب** — هل يوجد وكيل مُعيّن لمعرّف الاتصال المحدد هذا؟
2. **مستوى المزوّد** — هل يوجد وكيل مُعيّن لهذا المزوّد (مثلًا، `openai`)؟
3. **المستوى العام** — هل تم إعداد وكيل عام؟
4. **بلا وكيل** — اتصال مباشر بالمزوّد.

يتم اعتماد أول تطابق. يعني ذلك أنه يمكنك تعيين وكيل عام بوصفه خيارًا احتياطيًا، مع تجاوزه لمزوّدين أو اتصالات محددة.

### ما الذي يمر عبر الوكيل

| نوع حركة المرور  | يمر عبر الوكيل؟ | ملاحظات                                          |
| ---------------- | --------------- | ------------------------------------------------ |
| إكمالات المحادثة | ✅              | جميع طلبات `/v1/chat/completions`                |
| التضمينات        | ✅              | `/v1/embeddings`                                 |
| توليد الصور      | ✅              | `/v1/images/generations`                         |
| الصوت (TTS/STT)  | ✅              | `/v1/audio/*`                                    |
| تبادل رمز OAuth  | ✅              | يحل الخطأ `unsupported_country_region_territory` |
| اختبارات الاتصال | ✅              | يستخدم زر "اختبار الاتصال" الوكيل                |
| تحديث الرمز      | ✅              | تجديد OAuth في الخلفية                           |
| مزامنة النماذج   | ✅              | سرد النماذج واكتشافها                            |

---

## سجل الوكلاء (CRUD)

سجل الوكلاء هو جدول SQLite باسم (`proxy_registry`) يخزّن جميع وكلائك. يحتوي كل وكيل على:

| الحقل      | النوع   | الوصف                                     |
| ---------- | ------- | ----------------------------------------- |
| `id`       | UUID    | معرّف فريد                                |
| `name`     | String  | تسمية سهلة القراءة                        |
| `type`     | String  | البروتوكول: `http`، `https`، `socks5`     |
| `host`     | String  | اسم مضيف الوكيل أو عنوان IP               |
| `port`     | Integer | رقم المنفذ                                |
| `username` | String  | اسم مستخدم المصادقة (مشفّر أثناء التخزين) |
| `password` | String  | كلمة مرور المصادقة (مشفّرة أثناء التخزين) |
| `region`   | String  | تسمية المنطقة الجغرافية                   |
| `notes`    | String  | ملاحظات بنص حر                            |
| `status`   | String  | `active` أو `inactive`                    |
| `source`   | String  | `manual` أو `oneproxy`                    |

### إنشاء وكيل

**عبر لوحة التحكم:**

1. انتقل إلى **الإعدادات → الوكيل**
2. انقر على **إضافة وكيل**
3. أدخل النوع والمضيف والمنفذ وبيانات اعتماد المصادقة الاختيارية
4. احفظ

**عبر API:**

```bash
curl -X POST http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{
    "name": "US Proxy",
    "type": "http",
    "host": "proxy.example.com",
    "port": 8080,
    "username": "user",
    "password": "pass",
    "region": "US"
  }'
```

### تحديث وكيل

```bash
curl -X PATCH http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{
    "id": "proxy-uuid-here",
    "host": "new-proxy.example.com",
    "port": 9090
  }'
```

> **ملاحظة:** يتم الاحتفاظ ببيانات الاعتماد ما لم ترسل بدائل غير فارغة صراحةً. سيؤدي إرسال سلاسل فارغة لـ `username`/`password` إلى الاحتفاظ بالقيم المخزنة.

### حذف وكيل

```bash
# يفشل إذا كان الوكيل مُعيّنًا لأي نطاق
curl -X DELETE "http://localhost:20128/api/v1/management/proxies?id=proxy-uuid"

# الحذف الإجباري (يزيل التعيينات أيضًا)
curl -X DELETE "http://localhost:20128/api/v1/management/proxies?id=proxy-uuid&force=1"
```

### سرد الوكلاء

```bash
curl "http://localhost:20128/api/v1/management/proxies?limit=50&offset=0"
```

### تعيين الوكلاء للنطاقات

```bash
# التعيين للنطاق العام
curl -X PUT http://localhost:20128/api/settings/proxy \
  -H "Content-Type: application/json" \
  -d '{"level": "global", "proxy": {"type":"http","host":"proxy.example.com","port":8080}}'

# التعيين لمزوّد محدد
curl -X PUT http://localhost:20128/api/settings/proxy \
  -H "Content-Type: application/json" \
  -d '{"level": "provider", "id": "openai", "proxy": {"type":"socks5","host":"socks.example.com","port":1080}}'

# التعيين لاتصال/مفتاح محدد
curl -X PUT http://localhost:20128/api/settings/proxy \
  -H "Content-Type: application/json" \
  -d '{"level": "key", "id": "connection-uuid", "proxy": {"type":"http","host":"key-proxy.com","port":3128}}'
```

### تحديد الوكيل الفعّال

تحقق من الوكيل الذي سيُستخدم لاتصال معيّن:

```bash
curl "http://localhost:20128/api/settings/proxy?resolve=connection-uuid"
```

يعيد الوكيل المحدد مع مستواه (`account` أو `provider` أو `global`) ومصدره.

### التعيين الجماعي

عيّن وكيلًا واحدًا لعدة مزوّدين أو اتصالات دفعة واحدة:

```bash
curl -X POST http://localhost:20128/api/v1/management/proxies/bulk-assign \
  -H "Content-Type: application/json" \
  -d '{
    "scope": "provider",
    "scopeIds": ["openai", "anthropic", "codex"],
    "proxyId": "proxy-uuid"
  }'
```

### الاستيراد/التصدير

تُضمّن الوكلاء في نظام **النسخ الاحتياطي/الاستعادة**. عند تصدير إعداد OmniRoute الخاص بك:

1. انتقل إلى **لوحة التحكم → الإعدادات → النسخ الاحتياطي**
2. انقر على **تصدير** — يتم تضمين سجل الوكلاء والتعيينات
3. للاستعادة، انقر على **استيراد** وحمّل ملف النسخة الاحتياطية

يدعم سجل الوكلاء أيضًا **الإدراج أو التحديث حسب المضيف+المنفذ** — إذا استوردت وكيلًا موجودًا بالفعل (المضيف والمنفذ نفسيهما)، فسيتم تحديثه بدلًا من إنشاء نسخة مكررة.

### ترحيل الإصدارات القديمة

إذا أعددت الوكلاء في إصدار أقدم (قبل السجل)، فإن OmniRoute يرحّلهم تلقائيًا:

```
مخزن key_value القديم → proxy_registry + proxy_assignments
```

يحدث هذا مرة واحدة عند أول تشغيل بعد الترقية. استخدم `migrateLegacyProxyConfigToRegistry({ force: true })` لإعادة تشغيل عملية الترحيل.

---

## سوق 1proxy للوكلاء المجانيين

> 🆕 **بمساهمة من [@oyi77](https://github.com/oyi77)** — طلب السحب [#1847](https://github.com/diegosouzapw/OmniRoute/pull/1847) (المشكلة [#1788](https://github.com/diegosouzapw/OmniRoute/issues/1788))

يتكامل OmniRoute مع منصة مجتمع **[1proxy](https://1proxy-api.aitradepulse.com)** لتوفير الوصول إلى **مئات الوكلاء المجانيين الذين جرى التحقق منهم** من جميع أنحاء العالم. وهذا مثالي للمستخدمين الذين لا يملكون بنية تحتية خاصة بهم للوكلاء.

### آلية العمل

```
┌─────────────┐    مزامنة     ┌─────────────────┐    تدوير      ┌──────────┐
│ واجهة 1proxy│ ────────────▶ │  proxy_registry  │ ────────────▶ │  واجهة   │
│  (خارجية)   │ حتى 500 وكيل  │  source=oneproxy │ حسب الجودة   │ المزوّد   │
└─────────────┘               └─────────────────┘               └──────────┘
```

1. **المزامنة** — يجلب OmniRoute الوكلاء الذين جرى التحقق منهم من واجهة 1proxy البرمجية
2. **التخزين** — تُحفظ الوكلاء في جدول `proxy_registry` نفسه مع `source = 'oneproxy'`
3. **التصفية** — تصفية حسب البروتوكول والبلد ودرجة الجودة
4. **التدوير** — اختيار أفضل وكيل باستخدام استراتيجيات الجودة أو الاختيار العشوائي أو التسلسل
5. **التخفيض التلقائي** — تُخفَّض درجة جودة الوكلاء التي تفشل؛ وإذا انخفضت عن الحد الأدنى ← تُعلَّم بأنها غير نشطة

### مزامنة الوكلاء

**عبر لوحة التحكم:**

1. انتقل إلى علامة التبويب **الإعدادات ← 1proxy**
2. انقر على **"المزامنة الآن"**
3. اعرض الإحصاءات: إجمالي الوكلاء، وعدد الوكلاء النشطين، ومتوسط الجودة، والتوزيع حسب البلد

**عبر واجهة API:**

```bash
# تشغيل المزامنة
curl -X POST http://localhost:20128/api/settings/oneproxy \
  -H "Content-Type: application/json" \
  -d '{}'

# الاستجابة:
# { "success": true, "added": 127, "updated": 45, "failed": 2, "total": 172 }
```

### تصفية الوكلاء

```bash
# التصفية حسب البروتوكول
curl "http://localhost:20128/api/settings/oneproxy?protocol=socks5"

# التصفية حسب البلد
curl "http://localhost:20128/api/settings/oneproxy?countryCode=US"

# التصفية حسب الحد الأدنى لدرجة الجودة
curl "http://localhost:20128/api/settings/oneproxy?minQuality=80"

# دمج عوامل التصفية
curl "http://localhost:20128/api/settings/oneproxy?protocol=http&countryCode=DE&minQuality=70"
```

### درجات جودة الوكلاء

يأتي كل وكيل من 1proxy مع بيانات وصفية:

| الحقل           | الوصف                                            |
| --------------- | ------------------------------------------------ |
| `qualityScore`  | تقييم من 0 إلى 100 ناتج عن تحقق 1proxy           |
| `latencyMs`     | زمن انتقال الشبكة المقاس                         |
| `anonymity`     | `transparent` أو `anonymous` أو `elite`          |
| `googleAccess`  | ما إذا كان بإمكان الوكيل الوصول إلى خدمات Google |
| `countryCode`   | رمز البلد المكوّن من حرفين وفق معيار ISO         |
| `lastValidated` | الطابع الزمني لآخر عملية تحقق                    |

تُعدَّل درجات الجودة ديناميكيًا:

- **الطلبات الفاشلة** تقلل الدرجة بمقدار 10 نقاط
- **انخفاض الدرجة إلى ≤10** ← يُعلَّم الوكيل بأنه `inactive`
- تُستبعد الوكلاء غير النشطة من التدوير

### استراتيجيات التدوير

```bash
# التدوير حسب الجودة (أفضل وكيل أولًا) — الإعداد الافتراضي
curl -X POST http://localhost:20128/api/settings/oneproxy/rotate \
  -H "Content-Type: application/json" \
  -d '{"strategy": "quality"}'

# التدوير العشوائي
curl -X POST http://localhost:20128/api/settings/oneproxy/rotate \
  -d '{"strategy": "random"}'

# التدوير التسلسلي (الأقل تحققًا منه مؤخرًا أولًا)
curl -X POST http://localhost:20128/api/settings/oneproxy/rotate \
  -d '{"strategy": "sequential"}'
```

### قاطع الدائرة

تتضمن مزامنة 1proxy قاطع دائرة مدمجًا:

- بعد **5 حالات فشل متتالية في المزامنة**، تُحظر محاولات المزامنة اللاحقة
- أعِد ضبطه باستخدام: `resetOneproxyCircuitBreaker()` أو أعد تشغيل الخادم
- تتوفر حالة المزامنة عبر `GET /api/settings/oneproxy?action=status`

### مسح وكلاء 1proxy

```bash
# حذف وكيل واحد من 1proxy
curl -X DELETE "http://localhost:20128/api/settings/oneproxy?id=proxy-uuid"

# مسح جميع وكلاء 1proxy (لا تتأثر الوكلاء اليدوية)
curl -X DELETE "http://localhost:20128/api/settings/oneproxy?clearAll=1"
```

---

## مكافحة الاكتشاف والتخفي

لا يكتفي OmniRoute بتوجيه حركة المرور عبر وكيل فحسب — بل يجعل حركة المرور تبدو شرعية:

### انتحال بصمة TLS

يستخدم `wreq-js` لإنشاء بصمات TLS شبيهة ببصمات المتصفحات، متجاوزًا أنظمة اكتشاف الروبوتات التي ترصد مصافحات TLS غير الصادرة عن المتصفحات.

### مطابقة بصمة CLI

يعيد **مفتاح تبديل بصمة CLI** (`الإعدادات → الأمان`) ترتيب ترويسات HTTP وحقول جسم JSON لمطابقة التوقيع الدقيق لملفات CLI الثنائية الأصلية (Claude Code وCodex وغيرها). تعمل هذه الميزة **بالإضافة إلى** الوكيل:

```
عنوان IP الخاص بك (محظور) → عنوان IP للوكيل (الولايات المتحدة) → واجهة API لمزوّد الخدمة
                              + انتحال TLS
                              + بصمة CLI
```

تحصل على كلٍّ من **إخفاء عنوان IP** و**أصالة الطلب** في الوقت نفسه.

### الحفاظ على عنوان IP للوكيل

تُظهر الشارات المرمّزة بالألوان في لوحة المعلومات مستوى الوكيل النشط:

| الشارة | المستوى | المعنى                                      |
| ------ | ------- | ------------------------------------------- |
| 🟢     | عام     | تمر جميع حركة المرور عبر هذا الوكيل         |
| 🟡     | المزوّد | تمر حركة مرور هذا المزوّد فقط عبر الوكيل    |
| 🔵     | الاتصال | يستخدم هذا المفتاح/الحساب المحدد هذا الوكيل |

تعرض الشارة أيضًا عنوان IP الفعلي للوكيل بغرض التحقق.

---

## أوضاع الوكيل الصاعد

بالنسبة إلى المزوّدين الذين يستخدمون نمط CLIProxyAPI، يدعم OmniRoute ثلاثة أوضاع للوكيل الصاعد:

| الوضع         | الوصف                                                       |
| ------------- | ----------------------------------------------------------- |
| `native`      | يتولى OmniRoute توجيه الوكيل مباشرةً (الافتراضي)            |
| `cliproxyapi` | يفوّض المهمة إلى مثيل CLIProxyAPI خارجي                     |
| `fallback`    | يجرّب الوضع الأصلي أولًا، ثم يلجأ إلى CLIProxyAPI احتياطيًا |

يمكن تهيئته لكل مزوّد:

```bash
curl -X PUT "http://localhost:20128/api/upstream-proxy/openai" \
  -H "Content-Type: application/json" \
  -d '{"mode": "native", "enabled": true}'
```

---

## واجهة مستخدم لوحة المعلومات

### الإعدادات → علامة تبويب الوكيل

- تهيئة **الوكيل العام** (يُضبط مرة واحدة لجميع حركة المرور)
- تجاوزات الوكيل **لكل مزوّد**
- تعيينات الوكيل **لكل اتصال**
- **اختبار الاتصال** عبر الوكيل المُهيأ
- **شارات مرمّزة بالألوان** تعرض مستوى الوكيل النشط

### الإعدادات → علامة تبويب 1proxy

- زر **المزامنة الآن** لجلب الوكلاء المجانيين
- **بطاقات الإحصاءات**: الإجمالي، النشط، متوسط الجودة، آخر مزامنة
- **عوامل التصفية**: البروتوكول، رمز البلد، الحد الأدنى للجودة
- **جدول الوكلاء** متضمنًا المضيف والبروتوكول والبلد ودرجة الجودة وزمن الاستجابة ومستوى إخفاء الهوية وإمكانية الوصول إلى Google
- لوحة **حالة المزامنة** مع تتبع النجاح/الفشل وعدد مرات الفشل المتتالية
- **مسح الكل** لإزالة جميع إدخالات 1proxy

---

## مرجع API

### API إعدادات الوكيل

| الطريقة  | نقطة النهاية                                   | الوصف                         |
| -------- | ---------------------------------------------- | ----------------------------- |
| `GET`    | `/api/settings/proxy`                          | الحصول على تهيئة الوكيل كاملة |
| `GET`    | `/api/settings/proxy?level=global`             | الحصول على الوكيل العام       |
| `GET`    | `/api/settings/proxy?level=provider&id=openai` | الحصول على وكيل المزوّد       |
| `GET`    | `/api/settings/proxy?resolve=connectionId`     | تحديد الوكيل الفعلي           |
| `PUT`    | `/api/settings/proxy`                          | تحديث تهيئة الوكيل            |
| `DELETE` | `/api/settings/proxy?level=provider&id=openai` | إزالة الوكيل عند مستوى معين   |

### API سجل الوكلاء

| الطريقة  | نقطة النهاية                                      | الوصف                       |
| -------- | ------------------------------------------------- | --------------------------- |
| `GET`    | `/api/v1/management/proxies`                      | عرض جميع الوكلاء            |
| `GET`    | `/api/v1/management/proxies?id=uuid`              | الحصول على وكيل حسب المعرّف |
| `GET`    | `/api/v1/management/proxies?id=uuid&where_used=1` | الحصول على تعيينات الوكيل   |
| `POST`   | `/api/v1/management/proxies`                      | إنشاء وكيل                  |
| `PATCH`  | `/api/v1/management/proxies`                      | تحديث وكيل                  |
| `DELETE` | `/api/v1/management/proxies?id=uuid`              | حذف وكيل                    |
| `DELETE` | `/api/v1/management/proxies?id=uuid&force=1`      | فرض الحذف                   |
| `POST`   | `/api/v1/management/proxies/bulk-assign`          | تعيين جماعي                 |
| `GET`    | `/api/v1/management/proxies/assignments`          | عرض التعيينات               |
| `GET`    | `/api/v1/management/proxies/health`               | إحصاءات صحة الوكلاء         |

### API الأنفاق

لإتاحة مثيل OmniRoute الخاص بك عبر الإنترنت العام (Cloudflare/ngrok/Tailscale) بدلًا من توجيه حركة المرور الصادرة عبر وكيل، راجع [TUNNELS_GUIDE.md](./TUNNELS_GUIDE.md). توجد واجهة REST API الخاصة بالأنفاق ضمن `/api/tunnels/{cloudflared,ngrok,tailscale}/*`، وهي مستقلة عن سلسلة الوكلاء الصادرة الموثقة أعلاه.

### API 1proxy

| الطريقة  | نقطة النهاية                           | الوصف                                |
| -------- | -------------------------------------- | ------------------------------------ |
| `GET`    | `/api/settings/oneproxy`               | عرض وكلاء 1proxy                     |
| `GET`    | `/api/settings/oneproxy?action=stats`  | الحصول على الإحصاءات + حالة المزامنة |
| `GET`    | `/api/settings/oneproxy?action=status` | الحصول على حالة المزامنة فقط         |
| `POST`   | `/api/settings/oneproxy`               | تشغيل المزامنة                       |
| `POST`   | `/api/settings/oneproxy/rotate`        | التبديل إلى الوكيل التالي            |
| `DELETE` | `/api/settings/oneproxy?id=uuid`       | حذف وكيل واحد                        |
| `DELETE` | `/api/settings/oneproxy?clearAll=1`    | مسح الكل                             |

### API الوكيل الصاعد

| الطريقة  | نقطة النهاية                      | الوصف                          |
| -------- | --------------------------------- | ------------------------------ |
| `GET`    | `/api/upstream-proxy/:providerId` | الحصول على تهيئة الوكيل الصاعد |
| `PUT`    | `/api/upstream-proxy/:providerId` | تعيين وضع الوكيل الصاعد        |
| `DELETE` | `/api/upstream-proxy/:providerId` | إزالة تهيئة الوكيل الصاعد      |

---

## متغيرات البيئة

| المتغير               | القيمة الافتراضية | الوصف                                                              |
| --------------------- | ----------------- | ------------------------------------------------------------------ |
| `ENABLE_SOCKS5_PROXY` | `true`            | تمكين دعم وكيل SOCKS5 (القيمة الافتراضية `true` في `.env.example`) |

---

## استكشاف الأخطاء وإصلاحها

### "وكيل SOCKS5 معطّل"

عيّن `ENABLE_SOCKS5_PROXY=true` في ملف `.env` ثم أعد التشغيل.

### أخطاء "socket hang up" عبر الوكيل

هذا أمر طبيعي مع الوكلاء الرخيصين الذين يقطعون الاتصالات الخاملة. يتعامل OmniRoute بالفعل مع ذلك من خلال:

- تعطيل إبقاء الاتصال نشطًا لاتصالات الوكيل (`keepAliveTimeout: 1`)
- تعطيل المعالجة المتسلسلة (`pipelining: 0`)
- تخزين المرسِلات مؤقتًا لتجنب تكرار عمليات المصافحة

إذا استمرت المشكلة، فجرّب وكيلاً مختلفًا أو استخدم ميزة التناوب في 1proxy.

### ظهور "unsupported_country_region_territory" أثناء OAuth

تأكد من إعداد الوكيل **قبل** بدء تدفق OAuth. يوجّه OmniRoute عملية تبادل رمز OAuth عبر الوكيل المُعدّ. عيّن أولاً وكيلاً عامًا أو على مستوى المزوّد، ثم اتصل.

### عدم استخدام الوكيل

تحقق من ترتيب الحل:

1. تحقّق باستخدام `GET /api/settings/proxy?resolve=your-connection-id`
2. تحقق مما إذا كانت قيمة `status` للوكيل هي `active` (وليست `inactive`)
3. تأكد من أن نطاق تعيين الوكيل يطابق اتصالك

### فشل مزامنة 1proxy

تحقق من حالة المزامنة:

```bash
curl "http://localhost:20128/api/settings/oneproxy?action=status"
```

إذا كانت `consecutiveFailures >= 5`، فهذا يعني أن قاطع الدائرة قد فُعّل. أعد تشغيل الخادم لإعادة الضبط، أو انتظر إعادة الضبط اليدوية.

---

## مخطط قاعدة البيانات

### جدول `proxy_registry`

```sql
CREATE TABLE proxy_registry (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'http',
  host TEXT NOT NULL,
  port INTEGER NOT NULL,
  username TEXT DEFAULT '',
  password TEXT DEFAULT '',
  region TEXT,
  notes TEXT,
  status TEXT DEFAULT 'active',
  source TEXT NOT NULL DEFAULT 'manual',    -- 'manual' أو 'oneproxy'
  quality_score INTEGER,                     -- 0-100 (لـ1proxy فقط)
  latency_ms INTEGER,                        -- بالمللي ثانية (لـ1proxy فقط)
  anonymity TEXT,                            -- شفاف/مجهول/نخبوي
  google_access INTEGER DEFAULT 0,           -- هل يمكنه الوصول إلى Google؟ (1proxy)
  last_validated TEXT,                       -- طابع زمني بتنسيق ISO (لـ1proxy)
  country_code TEXT,                         -- رمز ISO مكوّن من حرفين (لـ1proxy)
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
```

### جدول `proxy_assignments`

```sql
CREATE TABLE proxy_assignments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  proxy_id TEXT NOT NULL REFERENCES proxy_registry(id),
  scope TEXT NOT NULL,        -- 'global' أو 'provider' أو 'account' أو 'combo'
  scope_id TEXT,              -- معرّف المزوّد، أو معرّف الاتصال، أو معرّف المجموعة
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  UNIQUE(scope, scope_id)
);
```

---

## التحقق من سلامة الوكيل (v3.8.16+)

تكتشف آلية **الفشل السريع للوكيل** في OmniRoute ‏(`src/lib/proxyHealth.ts`) الوكلاء المتوقفين خلال أقل من ثانيتين عبر فحص سريع لاتصال TCP، ثم **تخزّن النتيجة مؤقتًا** لتجنب الحمل الإضافي لكل طلب.

### آلية العمل

```
الطلب ──▶ ProxyHealthCache.get(url)
             │
             ├─ نتيجة موجودة وحديثة في الذاكرة المؤقتة؟  ──▶ إعادة الحالة المخزّنة مؤقتًا
             │
             └─ النتيجة غير موجودة / قديمة؟  ──▶ اتصال TCP بـ host:port
                                          (المهلة: FAST_FAIL_TIMEOUT_MS)
                                          ──▶ التخزين مؤقتًا لمدة HEALTH_CACHE_TTL_MS
                                          ──▶ إعادة النتيجة
```

من دون ذلك، سيؤدي الوكيل المتوقف إلى حظر كل طلب طوال مدة `PROXY_TIMEOUT_MS` كاملة (الافتراضية 30 ثانية) قبل أن يفشل.

### متغيرات البيئة القابلة للضبط

| المتغير                      | القيمة الافتراضية | الغرض                                 |
| ---------------------------- | ----------------- | ------------------------------------- |
| `PROXY_FAST_FAIL_TIMEOUT_MS` | `2000`            | مهلة اتصال TCP لكل فحص سلامة          |
| `PROXY_HEALTH_CACHE_TTL_MS`  | `30000`           | مدة التخزين المؤقت لنتيجة فحص السلامة |

**القيم الموصى بها:**

| السيناريو                 | مهلة الفشل السريع | مدة صلاحية التخزين المؤقت | المبرر                                                        |
| ------------------------- | ----------------- | ------------------------- | ------------------------------------------------------------- |
| بوابة API عالية الإنتاجية | 1500ms            | 60000ms                   | فشل سريع صارم وتخزين مؤقت أطول لتقليل عمليات الفحص            |
| عُقد موزعة جغرافيًا       | 3000ms            | 15000ms                   | تحتاج الشبكات الأبطأ إلى وقت أطول؛ وتخزين أقصر للتبديل السريع |
| التطوير / الاختبار        | 1000ms            | 10000ms                   | تكرار سريع عند العمل على الوكلاء المحليين                     |
| التخفي / مكافحة الاكتشاف  | 2500ms            | 45000ms                   | تجنب الفحص السريع المتكرر الذي قد يؤدي إلى تفعيل حدود المعدل  |

### فحص سلامة الوكيل

```ts
import { getAllProxyHealthStatuses, invalidateProxyHealth } from "omniroute/proxyHealth";

const statuses = getAllProxyHealthStatuses();
for (const s of statuses) {
  console.log(`${s.proxyUrl} → healthy=${s.healthy}, stale=${s.stale}`);
}

// فرض إعادة فحص وكيل محدد
invalidateProxyHealth("http://user:pass@203.0.113.7:8080");
```

تكون قيمة العلامة `stale` هي `true` عندما يتجاوز إدخال الذاكرة المؤقتة مدة `HEALTH_CACHE_TTL_MS`، وعندها سيؤدي الطلب التالي إلى تشغيل فحص جديد.

### القيم الافتراضية لكل نوع وكيل

يستخدم فحص السلامة قيمًا افتراضية مناسبة بناءً على مخطط URL:

| المخطط                     | المنفذ الافتراضي |
| -------------------------- | ---------------- |
| `http://`                  | 8080             |
| `https://`                 | 443              |
| `socks5://` / `socks5h://` | 1080             |

تكون للمنافذ المخصصة في عنوان URL ‏(`http://host:9999`) الأولوية دائمًا على القيمة الافتراضية للمخطط.

---

## تحليلات الوكيل وقابلية المراقبة

يتتبّع OmniRoute الاستخدام لكل وكيل لمساعدة المشغّلين على تشخيص أنماط التوجيه، والارتفاعات المفاجئة في زمن الاستجابة، والإخفاقات المتكررة.

### ما الذي يتم تتبّعه

يسجّل OmniRoute لكل طلب يمر عبر وكيل مُهيّأ ما يلي:

| المقياس      | الوصف                                               |
| ------------ | --------------------------------------------------- |
| `proxy_url`  | عنوان URL الكامل للوكيل (مع إخفاء بيانات المصادقة)  |
| `provider`   | معرّف المزوّد الرئيسي (openai وanthropic وغيرهما)   |
| `latency_ms` | إجمالي زمن الذهاب والإياب، بما في ذلك مصافحة الوكيل |
| `connect_ms` | زمن اتصال TCP فقط                                   |
| `status`     | رمز حالة HTTP الوارد من المزوّد الرئيسي             |
| `error`      | فئة الخطأ في حال فشل الطلب                          |
| `timestamp`  | توقيت UTC بتنسيق ISO 8601                           |

### الوصول إلى البيانات

```bash
# أحداث الوكيل الأخيرة
curl -H "Authorization: Bearer $OMNIROUTE_KEY" \
  "http://localhost:20128/api/usage/proxy-logs?limit=100"
```

نقطة النهاية الفعلية هي `/api/usage/proxy-logs` (راجع `src/app/api/usage/proxy-logs/route.ts`). تدعم نقطة النهاية هذه ما يلي:

- `GET /api/usage/proxy-logs` — استرداد سجلات الوكيل
- `DELETE /api/usage/proxy-logs` — مسح جميع سجلات الوكيل

يمكن الاستعلام مباشرةً عن الإحصاءات المجمّعة من جدول `proxy_logs` عبر SQL عند الحاجة. وقد توفّر واجهة لوحة المعلومات عروضًا مجمّعة.

### الأنماط الشائعة

**اكتشاف وكيل متذبذب** (يتناوب بين النجاح والفشل):

```sql
SELECT proxy_url,
       COUNT(*) AS total,
       SUM(CASE WHEN status >= 500 THEN 1 ELSE 0 END) AS errors,
       ROUND(100.0 * SUM(CASE WHEN status >= 500 THEN 1 ELSE 0 END) / COUNT(*), 1) AS error_pct
FROM proxy_logs
WHERE timestamp > datetime('now', '-1 hour')
GROUP BY proxy_url
HAVING error_pct > 5
ORDER BY error_pct DESC;
```

**العثور على الوكلاء البطيئين** (زمن الاستجابة عند المئين 95 أكبر من ثانيتين):

```sql
WITH ranked AS (
  SELECT proxy_url, latency_ms,
         PERCENT_RANK() OVER (PARTITION BY proxy_url ORDER BY latency_ms) AS pct
  FROM proxy_logs
  WHERE timestamp > datetime('now', '-24 hour')
)
SELECT proxy_url, latency_ms
FROM ranked
WHERE pct >= 0.95
ORDER BY latency_ms DESC;
```

---

## شجرة قرار استراتيجية التناوب

عند تعيين عدة وكلاء لنطاق واحد، يستخدم OmniRoute **استراتيجية تناوب** لاختيار الوكيل الذي سيُستخدم لكل طلب. تُهيّأ الاستراتيجية على مستوى النطاق (عام، أو لكل مزوّد، أو لكل حساب، أو لكل تركيبة).

### الاستراتيجيات المتاحة

| الاستراتيجية           | متى تُستخدم                              | المفاضلة                                                  |
| ---------------------- | ---------------------------------------- | --------------------------------------------------------- |
| `quality` (الافتراضية) | بيئات الإنتاج ذات الوكلاء متفاوتي الجودة | تفضّل الوكلاء ذوي التقييم المرتفع؛ وقد تحرم الأقل تقييمًا |
| `random`               | توزيع الحمل، والخصوصية                   | توزيع متساوٍ؛ يتجاهل مؤشرات الجودة                        |
| `sequential`           | تصحيح الأخطاء، والاختبارات الحتمية       | يتنقّل بين الوكلاء بالترتيب؛ ويسهل فهم سلوكه              |

### شجرة القرار

```
                    هل لديك درجات جودة لوكلائك؟
                    │
        ┌───────────┴───────────┐
        │                       │
       نعم                     لا
        │                       │
   هل جميع الوكلاء             │
   متساوون تقريبًا              │
   في الجودة؟                   │
        │                       │
   ┌────┴────┐                  │
   │         │                  │
  نعم       لا               استخدم
   │         │              `random`
   │         │              (يتيح التوزيع
   │         │              المتساوي بناء
   │         │              بيانات الجودة
   │         │              بمرور الوقت)
   │         │
   │    استخدم `quality`
   │    (الأفضل للجودة
   │    المتفاوتة)
   │
استخدم `random`
(وزّع الحمل
بالتساوي)
```

## الاستبعاد التلقائي للأعطال في وكلائك

تقوم مجموعة سوق 1proxy بالفعل بخفض أولوية الوكلاء المتعطلين تلقائيًا من تلقاء نفسها (راجع
[درجات جودة الوكيل](#proxy-quality-scores)). أما بالنسبة إلى الوكلاء الذين أضفتهم **أنت** إلى السجل، فيوفر مجدول فحوصات السلامة في الخلفية
(`src/lib/proxyHealth/scheduler.ts`) السلوك نفسه المتمثل في «استبعاد عضو متعطل من
السلسلة تلقائيًا»، من دون حذف أي شيء:

```bash
# .env — عطّل الوكيل مؤقتًا بعد 3 عمليات فحص فاشلة متتالية، وأعد تمكينه
# تلقائيًا بمجرد أن يبدأ في الاستجابة لعمليات الفحص مرة أخرى.
PROXY_AUTO_DISABLE=true
PROXY_AUTO_REMOVE_AFTER=3
```

كيفية عمل ذلك ضمن سلسلة متعددة الوكلاء:

1. يفحص المجدول كل وكيل مسجل كل `PROXY_HEALTH_INTERVAL_MS`
   (القيمة الافتراضية 10 دقائق؛ والحد الأدنى دقيقة واحدة).
2. بعد `PROXY_AUTO_REMOVE_AFTER` من حالات الفشل **القاطعة** المتتالية (فشل اتصال
   فعلي — لا تُحتسب المهلة المنتهية أو استجابة 5xx الصادرة من هدف الفحص نفسه، راجع
   [التحقق من سلامة الوكيل](#proxy-health-checking-v3816))، تُضبط قيمة `status`
   الخاصة بالوكيل على `dead`.
3. تُعد `dead` إحدى الحالات التي يستبعدها مرشح الحالات النشطة المستخدم في
   تحديد المجموعة/التدوير، ولذلك يتوقف تدوير النطاق (التناوب الدوري / العشوائي / الثابت /
   زمن الاستجابة — راجع [شجرة قرارات استراتيجية التدوير](#rotation-strategy-decision-tree))
   فورًا عن إسناد ذلك الوكيل إلى الطلبات الجديدة. لا يتأثر أي وكيل آخر في
   المجموعة، ولا تعود المجموعة بأكملها ضمنيًا إلى اتصال مباشر —
   راجع آلية الإغلاق عند الفشل في [نظام الوكيل رباعي المستويات](#4-level-proxy-system).
4. يواصل المجدول فحص الوكلاء ذوي الحالة `dead` وفق الفاصل الزمني نفسه. ويؤدي
   الفحص الناجح التالي إلى إعادة `status` إلى `active`، فيعود الوكيل إلى التدوير —
   من دون الحاجة إلى إعادة إضافته يدويًا.

هذه الميزة **اختيارية وغير مدمرة** عن قصد: افتراضيًا، لا يفعل المجدول سوى
عدّ حالات الفشل وتسجيلها (راجع السياسة C في `decision.ts`)، ولا يحذف
`PROXY_AUTO_DISABLE` أي صف مطلقًا — فهذه مهمة العلامة المنفصلة والأكثر صرامة
`PROXY_AUTO_REMOVE`. إذا ضُبط كلاهما على `true`، تكون الأولوية لـ `PROXY_AUTO_REMOVE`
(إذ لا فائدة من تعطيل وكيل مؤقتًا قبل حذفه مباشرةً). راجع مرجع
[إعدادات البيئة](../reference/ENVIRONMENT.md) للاطلاع على القائمة الكاملة
للمتغيرات.

---

> 📖 **وثائق ذات صلة:**
>
> - [دليل المستخدم](../guides/USER_GUIDE.md) — الإعداد والتهيئة العامة
> - [مرجع API](../reference/API_REFERENCE.md) — وثائق API الكاملة
> - [إعدادات البيئة](../reference/ENVIRONMENT.md) — جميع متغيرات البيئة
