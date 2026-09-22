# Providers — Claude Web (العربية)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CLAUDE_WEB.md) · 🇪🇹 [am](../../../am/docs/providers/CLAUDE_WEB.md) · 🇦🇿 [az](../../../az/docs/providers/CLAUDE_WEB.md) · 🇧🇬 [bg](../../../bg/docs/providers/CLAUDE_WEB.md) · 🇧🇩 [bn](../../../bn/docs/providers/CLAUDE_WEB.md) · 🇨🇿 [cs](../../../cs/docs/providers/CLAUDE_WEB.md) · 🇩🇰 [da](../../../da/docs/providers/CLAUDE_WEB.md) · 🇩🇪 [de](../../../de/docs/providers/CLAUDE_WEB.md) · 🇬🇷 [el](../../../el/docs/providers/CLAUDE_WEB.md) · 🇪🇸 [es](../../../es/docs/providers/CLAUDE_WEB.md) · 🇪🇪 [et](../../../et/docs/providers/CLAUDE_WEB.md) · 🇮🇷 [fa](../../../fa/docs/providers/CLAUDE_WEB.md) · 🇫🇮 [fi](../../../fi/docs/providers/CLAUDE_WEB.md) · 🇫🇷 [fr](../../../fr/docs/providers/CLAUDE_WEB.md) · 🇮🇪 [ga](../../../ga/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [gu](../../../gu/docs/providers/CLAUDE_WEB.md) · 🇳🇬 [ha](../../../ha/docs/providers/CLAUDE_WEB.md) · 🇮🇱 [he](../../../he/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [hi](../../../hi/docs/providers/CLAUDE_WEB.md) · 🇭🇷 [hr](../../../hr/docs/providers/CLAUDE_WEB.md) · 🇭🇺 [hu](../../../hu/docs/providers/CLAUDE_WEB.md) · 🇦🇲 [hy](../../../hy/docs/providers/CLAUDE_WEB.md) · 🇮🇩 [id](../../../id/docs/providers/CLAUDE_WEB.md) · 🇳🇬 [ig](../../../ig/docs/providers/CLAUDE_WEB.md) · 🇮🇹 [it](../../../it/docs/providers/CLAUDE_WEB.md) · 🇯🇵 [ja](../../../ja/docs/providers/CLAUDE_WEB.md) · 🇬🇪 [ka](../../../ka/docs/providers/CLAUDE_WEB.md) · 🇰🇭 [km](../../../km/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [kn](../../../kn/docs/providers/CLAUDE_WEB.md) · 🇰🇷 [ko](../../../ko/docs/providers/CLAUDE_WEB.md) · 🇱🇹 [lt](../../../lt/docs/providers/CLAUDE_WEB.md) · 🇱🇻 [lv](../../../lv/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [ml](../../../ml/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [mr](../../../mr/docs/providers/CLAUDE_WEB.md) · 🇲🇾 [ms](../../../ms/docs/providers/CLAUDE_WEB.md) · 🇲🇹 [mt](../../../mt/docs/providers/CLAUDE_WEB.md) · 🇲🇲 [my](../../../my/docs/providers/CLAUDE_WEB.md) · 🇳🇵 [ne](../../../ne/docs/providers/CLAUDE_WEB.md) · 🇳🇱 [nl](../../../nl/docs/providers/CLAUDE_WEB.md) · 🇳🇴 [no](../../../no/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [or](../../../or/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [pa](../../../pa/docs/providers/CLAUDE_WEB.md) · 🇵🇭 [phi](../../../phi/docs/providers/CLAUDE_WEB.md) · 🇵🇱 [pl](../../../pl/docs/providers/CLAUDE_WEB.md) · 🇵🇹 [pt](../../../pt/docs/providers/CLAUDE_WEB.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CLAUDE_WEB.md) · 🇷🇴 [ro](../../../ro/docs/providers/CLAUDE_WEB.md) · 🇷🇺 [ru](../../../ru/docs/providers/CLAUDE_WEB.md) · 🇱🇰 [si](../../../si/docs/providers/CLAUDE_WEB.md) · 🇸🇰 [sk](../../../sk/docs/providers/CLAUDE_WEB.md) · 🇸🇮 [sl](../../../sl/docs/providers/CLAUDE_WEB.md) · 🇷🇸 [sr](../../../sr/docs/providers/CLAUDE_WEB.md) · 🇸🇪 [sv](../../../sv/docs/providers/CLAUDE_WEB.md) · 🇰🇪 [sw](../../../sw/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [ta](../../../ta/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [te](../../../te/docs/providers/CLAUDE_WEB.md) · 🇹🇭 [th](../../../th/docs/providers/CLAUDE_WEB.md) · 🇹🇷 [tr](../../../tr/docs/providers/CLAUDE_WEB.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CLAUDE_WEB.md) · 🇵🇰 [ur](../../../ur/docs/providers/CLAUDE_WEB.md) · 🇺🇿 [uz](../../../uz/docs/providers/CLAUDE_WEB.md) · 🇻🇳 [vi](../../../vi/docs/providers/CLAUDE_WEB.md) · 🇳🇬 [yo](../../../yo/docs/providers/CLAUDE_WEB.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CLAUDE_WEB.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CLAUDE_WEB.md)

---

## `claude-web`

يرسل `claude-web` طلبات محادثة بتنسيق OpenAI عبر جلسة متصفح موثَّقة في `claude.ai`.
يقوم المنفّذ بتوحيد ملف تعريف الارتباط المقدَّم، وتحديد مؤسسة موثَّقة واحدة، وإعداد حالة المحادثة، واختيار نقل مباشر أو عبر المتصفح، وترجمة استجابة SSE الواردة ترجمةً صارمة. توجد آلية التنسيق في
`open-sse/executors/claude-web.ts:320`.

> **هل أنت جديد على موفّري ملفات تعريف ارتباط الويب؟**
>
> اقرأ **`docs/getting-started/WEB-COOKIE-GUIDE.md`** للاطلاع على عملية الإعداد العامة، وإرشادات المصادقة، والقيود، واستكشاف الأخطاء وإصلاحها قبل اتباع هذا الدليل الخاص بالموفّر.

### كتالوج النماذج

يعرض سجل الموفّر حاليًا معرّفات النماذج الثابتة السبعة التالية فقط
(`open-sse/config/providers/registry/claude/web/index.ts:11`):

| معرّف النموذج               | اسم العرض                 |
| --------------------------- | ------------------------- |
| `claude-fable-5`            | Claude Fable 5 (الويب)    |
| `claude-opus-4-8`           | Claude Opus 4.8 (الويب)   |
| `claude-sonnet-5`           | Claude Sonnet 5 (الويب)   |
| `claude-haiku-4-5-20251001` | Claude Haiku 4.5 (الويب)  |
| `claude-opus-4-7`           | Claude Opus 4.7 (الويب)   |
| `claude-opus-4-6`           | Claude Opus 4.6 (الويب)   |
| `claude-sonnet-4-6`         | Claude Sonnet 4.6 (الويب) |

لم يُنفَّذ الاكتشاف الديناميكي للنماذج لهذا الموفّر. القائمة أعلاه هي كتالوج وقت التشغيل.

### بيانات الاعتماد وتحديد المؤسسة

قدّم إما ترويسة Cookie الكاملة لـ `claude.ai` أو قيمة جلسة مجردة. تُوحَّد القيم المجردة إلى `sessionKey`؛ وتُحتفظ بملفات تعريف الارتباط الأخرى إذا تم تقديمها. يقبل المنفّذ ملف تعريف الارتباط عبر `cookie` أو `apiKey`،
ويقرأ قيمتي `deviceId` و`orgId` الاختياريتين من بيانات الاتصال
(`open-sse/executors/claude-web.ts:72`).

إذا كانت `orgId` غير موجودة، يستدعي المنفّذ `GET https://claude.ai/api/organizations` ويستخدم أول
مؤسسة تعيدها جلسة Claude Web الموثَّقة
(`open-sse/executors/claude-web.ts:141`). ويفشل بصورة مغلقة عندما لا تُعاد أي مؤسسة صالحة،
ويبلّغ عن رفض تفويض الجلسة بالحالة 401، ويميّز تحدي Cloudflare عن فشل المصادقة.

### عمليات المحادثة

الكائن الاختياري `claude_web` في المستوى الأعلى صارم. تُرفض الحقول غير المعروفة. تُعرَّف
الحقول المقبولة في `open-sse/executors/claude-web/session.ts:50`:

| الحقل                 | المعنى                                                              |
| --------------------- | ------------------------------------------------------------------- |
| `operation`           | القيمة الافتراضية هي `completion`؛ استخدم `retry` لإعادة محاولة دور |
| `conversation_id`     | UUID صريح لمحادثة موجودة                                            |
| `parent_message_uuid` | UUID صريح لرسالة المساعد الأصل                                      |
| `timezone`            | اسم صالح لمنطقة زمنية وفق IANA                                      |
| `locale`              | إعداد محلي صالح بنيويًا                                             |
| `tool_states`         | مصفوفة اختيارية لحالات أدوات الحساب، بحد أقصى 128 إدخالًا           |

تستخدم الطلبات المُعدَّة واحدة من نقطتي نهاية واردتين
(`open-sse/executors/claude-web.ts:203`):

- يُرسل دور جديد أو دور متابعة إلى
  `POST https://claude.ai/api/organizations/{orgId}/chat_conversations/{conversationId}/completion`.
- تُرسل إعادة المحاولة إلى
  `POST https://claude.ai/api/organizations/{orgId}/chat_conversations/{conversationId}/retry_completion`.

يتضمن الدور الجديد `create_conversation_params`. أما المتابعة المخزنة مؤقتًا أو المرتبطة صراحةً
فتتضمن `parent_message_uuid` وتحذف `create_conversation_params`. تتطلب إعادة المحاولة كلًا من
حالة المحادثة وحالة الرسالة الأصل، ولا ترسل أي مطالبة
(`open-sse/executors/claude-web/session.ts:254`). تفتح المحادثات الجديدة واجهة المستخدم الموثَّقة
عند `/new`؛ بينما تفتح المتابعات المخزنة مؤقتًا أو المرتبطة صراحةً صفحة المحادثة المحددة
(`open-sse/executors/claude-web/session.ts:324`).

حالة المحادثة عبارة عن ذاكرة تخزين مؤقت داخل الذاكرة، مفهرسة وفق نطاق حساب باستخدام SHA-256 والنص
المرجعي الأساسي للمتصل. تنتهي صلاحية الإدخالات بعد 30 دقيقة، ويُحدد الحد الأقصى لذاكرة التخزين المؤقت
بـ 5,000 إدخال
(`open-sse/executors/claude-web/session.ts:12`). لا تُثبَّت الحالة إلا بعد أن يلاحظ محلل التدفق
الصارم `message_stop`؛ وتؤدي إعادة تشغيل العملية إلى التخلص منها. عند عدم العثور على نتيجة في ذاكرة
التخزين المؤقت، يُسلسل الطلب متعدد الرسائل في مطالبة استرداد واحدة بدلًا من إسقاط الرسائل السابقة
بصمت.

يتبع الإعداد المحلي والمنطقة الزمنية ترتيب الأولوية التالي: قيمة `claude_web` في الطلب، ثم قيمة
الاتصال، ثم قيمة وقت التشغيل، ثم `en-US` للإعداد المحلي أو `UTC` للمنطقة الزمنية
(`open-sse/executors/claude-web/session.ts:218`).

### الأدوات وحمولات الطلبات

تحوّل الطلبات المباشرة فقط أدوات وظائف OpenAI الصالحة بنيويًا والمقدَّمة من المتصل. ولا توجد قائمة
أدوات افتراضية ثابتة مُنشأة اصطناعيًا
(`open-sse/executors/claude-web/payload.ts:102`).

أما طلبات المتصفح فتلتقط طلب واجهة المستخدم الموثَّقة وتحتفظ بأدوات الحساب وحالات الأدوات
والأنماط المخصّصة. وتظل حقول المحادثة والنموذج والاستدلال والمطالبة ومعرّفات UUID للرسائل المُعدَّة
تتجاوز الطلب الملتقط
(`open-sse/executors/claude-web/browserTransport.ts:175`). تُحدَّد نطاقات قوالب المتصفح بواسطة
تجزئة للحساب والمؤسسة وملف تعريف الارتباط والإعداد المحلي والمنطقة الزمنية، وتنتهي صلاحيتها بعد 30 دقيقة
(`open-sse/executors/claude-web/browserTransport.ts:11`,
`open-sse/executors/claude-web/browserTransport.ts:158`). عندما لا يحتوي طلب مباشر على أدوات مقدَّمة
من المتصل، يمكنه إعادة استخدام ذلك القالب المحدد النطاق؛ وتحظى أدوات المتصل الصريحة بالأولوية
(`open-sse/executors/claude-web/browserTransport.ts:214`).

### اختيار وسيلة النقل

المسار الافتراضي هو `sendClaudeWebDirect()`، الذي يستدعي `tlsFetchClaude()` باستخدام ملف تعريف
Chrome 146 المُهيأ وملف تعريف الارتباط المقدَّم (`open-sse/services/claudeTlsClient.ts:23`). ولا
يشغّل محلّل تحديات أو ينشئ ملف تعريف ارتباط بديلًا.

اضبط `WEB_COOKIE_USE_BROWSER` على `1` أو `true` أو `on` لجعل محوّل المتصفح ذي النطاق المحدد بالحساب وسيلة النقل الأساسية. اضبط `OMNIROUTE_BROWSER_POOL` على إحدى القيم نفسها للسماح، عند التعرّف على تحدّي Cloudflare 403، بالتراجع من النقل المباشر إلى محوّل المتصفح (`open-sse/executors/claude-web.ts:195`). لا تؤدي إخفاقات HTTP الأخرى إلى تشغيل هذا التراجع.

يحتفظ محوّل المتصفح بملفات تعريف الارتباط داخل سياق Playwright المجمّع نفسه، ويستخدم المفتاح المجزّأ محدد النطاق الموضح أعلاه، ويرسل الإكمال من ذلك السياق (`open-sse/executors/claude-web/browserTransport.ts:444`). وهو لا يصدّر مطلقًا ملف تعريف ارتباط حُلّت مشكلته في المتصفح إلى عميل TLS المباشر. تتطلب إعادة المحاولة عبر المتصفح قالب واجهة مستخدم غير منتهي الصلاحية ومرتبطًا بسياق Playwright الفعلي نفسه (`open-sse/executors/claude-web/browserTransport.ts:467`). تُنفَّذ قراءات استجابة المتصفح تدريجيًا في الصفحة المصادَق عليها، وتحترم إلغاء الطلب، وتلغي النص الأساسي الوارد بمجرد أن يتجاوز 16 MiB (`open-sse/executors/claude-web/browserTransport.ts:259`).

يعيد المنفّذ إسقاط تدقيق منقّحًا إلى مسجّل الطلبات المشترك: تُستبعد معرّفات UUID الخاصة بالمؤسسة والمحادثة والرسالة، ونص المطالبة، وتعريفات الأدوات، وملفات تعريف الارتباط، ومعرّفات الأجهزة (`open-sse/executors/claude-web.ts:237`،
`open-sse/executors/claude-web.ts:252`). كما تعيد استثناءات النقل خطأ اتصال عامًا بدلًا من الرسالة التي طُرحت.

### سلوك SSE

تتعامل `createClaudeWebResponse()` مع التأطير باستخدام LF أو CRLF وحقول `data:` متعددة الأسطر. وهي تربط فروق النص بـ `content`، وفروق التفكير بـ `reasoning_content`، وأحداث البيانات الوصفية المعروفة بامتداد الاستجابة `claude_web`. يُسقَط كل حدث بيانات وصفية من خلال قائمة السماح الخاصة بحقول ذلك الحدث (`open-sse/executors/claude-web/stream.ts:37`). كما تُعاد البيانات الوصفية للمحادثة والرسالة الأصلية ورسالة المساعد والعملية في ترويسات `X-OmniRoute-Claude-Web-*` (`open-sse/executors/claude-web/stream.ts:364`).

يفشل المحلّل بشكل مغلق عند وجود JSON مشوّه، أو أحداث `error` واردة، أو أنواع أحداث غير معروفة، أو ترتيب غير صالح، أو عدم تطابق كتل المحتوى، أو الوصول إلى EOF قبل `message_stop`. يُصدر الخرج المتدفق مقطع إنهاء واحدًا ووسم `[DONE]` واحدًا؛ ويستخدم الخرج المخزّن مؤقتًا المحلّل نفسه. يتعامل المحلّل مع `message_stop` باعتباره حدثًا نهائيًا فورًا، ويلغي البيانات الواردة اللاحقة، وينشر إلغاء المصب إلى قارئ المنبع (`open-sse/executors/claude-web/stream.ts:461`،
`open-sse/executors/claude-web/stream.ts:563`). يُحد أقصى لحجم أسطر SSE غير المنتهية والأحداث المتراكمة بمقدار 1 MiB (`open-sse/executors/claude-web/stream.ts:17`،
`open-sse/executors/claude-web/stream.ts:62`).

### الملفات

| الملف                                                    | الغرض                             |
| -------------------------------------------------------- | --------------------------------- |
| `open-sse/config/providers/registry/claude/web/index.ts` | سجل نماذج المزوّد الثابت          |
| `open-sse/executors/claude-web.ts`                       | تنسيق المنفّذ                     |
| `open-sse/executors/claude-web/payload.ts`               | تحويل الحمولة والأدوات            |
| `open-sse/executors/claude-web/session.ts`               | حالة الدور وذاكرة النص المؤقتة    |
| `open-sse/executors/claude-web/transport.ts`             | محوّل النقل المباشر               |
| `open-sse/executors/claude-web/browserTransport.ts`      | محوّل المتصفح محدد النطاق بالحساب |
| `open-sse/executors/claude-web/stream.ts`                | ترجمة SSE الصارمة                 |
| `open-sse/services/claudeTlsClient.ts`                   | نقل TLS الأصلي                    |
| `open-sse/services/browserPool.ts`                       | سياقات Playwright المجمّعة        |

### الاختبار

شغّل حزمة Claude Web الحتمية من دون بيانات اعتماد حقيقية:

```powershell
node --import tsx/esm --test tests/unit/claude-web-auto-refresh.test.ts tests/unit/claude-web-browser-transport.test.ts tests/unit/claude-web-executor-split.test.ts tests/unit/claude-web-live-alignment.test.ts tests/unit/claude-web-payload-runtime.test.ts tests/unit/claude-web-session.test.ts tests/unit/claude-web-sonnet5-registry-6209.test.ts tests/unit/claude-web-stream.test.ts tests/unit/claude-web-transport.test.ts tests/unit/claude-web.test.ts tests/unit/issue-6662-repro.test.ts
```

يتم تخطي الحالات المعتمدة على Playwright في `tests/unit/claude-web-auto-refresh.test.ts` صراحةً. لا يحدد هذا المستودع حاليًا نصًا برمجيًا لاختبار Claude Web مباشر يستخدم بيانات اعتماد، ولذلك لا تُعد تلك الحالات المتخطاة دليلًا على صحة التشغيل.

### الإعداد

1. شغّل OmniRoute باستخدام `npm run dev` أو باستخدام تثبيت مبني.
2. افتح لوحة المعلومات ← المزوّدون ← إضافة مزوّد.
3. حدّد فئة Web Cookie ثم Claude Web.
4. الصق ترويسة Cookie الكاملة المنسوخة من طلب `claude.ai` مصادَق عليه.
