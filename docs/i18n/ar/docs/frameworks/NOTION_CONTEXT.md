# Notion Context Source (العربية)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/NOTION_CONTEXT.md) · 🇪🇹 [am](../../../am/docs/frameworks/NOTION_CONTEXT.md) · 🇦🇿 [az](../../../az/docs/frameworks/NOTION_CONTEXT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/NOTION_CONTEXT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/NOTION_CONTEXT.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/NOTION_CONTEXT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/NOTION_CONTEXT.md) · 🇩🇰 [da](../../../da/docs/frameworks/NOTION_CONTEXT.md) · 🇩🇪 [de](../../../de/docs/frameworks/NOTION_CONTEXT.md) · 🇬🇷 [el](../../../el/docs/frameworks/NOTION_CONTEXT.md) · 🇪🇸 [es](../../../es/docs/frameworks/NOTION_CONTEXT.md) · 🇪🇪 [et](../../../et/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/NOTION_CONTEXT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/NOTION_CONTEXT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇱 [he](../../../he/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/NOTION_CONTEXT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/NOTION_CONTEXT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/NOTION_CONTEXT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇩 [id](../../../id/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇹 [it](../../../it/docs/frameworks/NOTION_CONTEXT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/NOTION_CONTEXT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/NOTION_CONTEXT.md) · 🇰🇭 [km](../../../km/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/NOTION_CONTEXT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/NOTION_CONTEXT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/NOTION_CONTEXT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/NOTION_CONTEXT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/NOTION_CONTEXT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/NOTION_CONTEXT.md) · 🇲🇲 [my](../../../my/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇴 [no](../../../no/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [or](../../../or/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/NOTION_CONTEXT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/NOTION_CONTEXT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/NOTION_CONTEXT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/NOTION_CONTEXT.md) · 🇱🇰 [si](../../../si/docs/frameworks/NOTION_CONTEXT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/NOTION_CONTEXT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/NOTION_CONTEXT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/NOTION_CONTEXT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/NOTION_CONTEXT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [te](../../../te/docs/frameworks/NOTION_CONTEXT.md) · 🇹🇭 [th](../../../th/docs/frameworks/NOTION_CONTEXT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/NOTION_CONTEXT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/NOTION_CONTEXT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/NOTION_CONTEXT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/NOTION_CONTEXT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/NOTION_CONTEXT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/NOTION_CONTEXT.md)

---

> **مصدر الحقيقة:** `src/lib/notion/api.ts` (عميل REST)، و`src/lib/db/notion.ts`
> (حفظ الرمز المميز)، و`open-sse/mcp-server/tools/notionTools.ts` (6 أدوات MCP)،
> و`src/app/api/settings/notion/route.ts` (واجهة API للإعدادات). يوجد تسجيل الأدوات
> وربط النطاقات في `open-sse/mcp-server/server.ts`.

## ما هو

يمكن لـ OmniRoute الاتصال بمساحة عمل **Notion** بوصفها **مصدر سياق** — أي قاعدة معرفة
للقراءة والكتابة تصل إليها الوكلاء عبر خادم MCP المضمّن. بمجرد تكوين رمز مميز لتكامل
Notion، تتيح أدوات MCP لنموذج LLM البحث في الصفحات وقواعد البيانات، وقراءة محتوى
الصفحات وأشجار الكتل، والاستعلام من قواعد البيانات باستخدام عوامل التصفية والترتيب،
وإلحاق كتل جديدة — وكل ذلك عبر OmniRoute (مع إعادة المحاولة، والمهلة الزمنية، وتصنيف
الأخطاء)، بحيث لا يتعامل النموذج مطلقًا مع واجهة API الخاصة بـ Notion مباشرةً.

التكامل عبارة عن غلاف بسيط ومحصّن حول واجهة Notion REST API الرسمية
(`https://api.notion.com/v1`، و`Notion-Version: 2026-03-11`). يضيف العميل
(`src/lib/notion/api.ts`) ما يلي:

- **إعادة المحاولة مع تراجع أُسّي** (حتى 3 محاولات) للاستجابات `429` و`5xx`.
- **مهلة طلب مدتها 55 ثانية** عبر `AbortController`.
- **تصنيف الأخطاء بأنواع محددة** — `NotionAuthError` ‏(401/403)،
  و`NotionNotFoundError` ‏(404)، و`NotionRateLimitError` ‏(429، ويراعي تلميحات
  `retry after`)، و`NotionValidationError` ‏(400/409)، و`NotionServerError` ‏(5xx)،
  و`NotionTimeoutError`.
- **تنقية الرسائل** بإزالة الأجزاء الشبيهة بتتبعات المكدس قبل عرضها.

## الإعداد

لا يوجد **متغير بيئة** للرمز المميز الخاص بـ Notion — بل يُخزَّن في جدول SQLite
المسمى `key_value` (مساحة الاسم `notion`، والمفتاح `integration_token`) عبر
`src/lib/db/notion.ts`. قم بتكوينه من علامة التبويب **مصادر السياق** في لوحة معلومات
نقطة النهاية (`NotionSourceCard` المجاور لـ `ObsidianSourceCard`)، أو عبر واجهة
REST API للإعدادات.

> [!NOTE]
> الرمز المميز هو **رمز مميز لتكامل داخلي في Notion**. أنشئ تكاملًا على
> <https://www.notion.com/my-integrations>، ثم شارك الصفحات/قواعد البيانات التي تريد
> أن يصل إليها OmniRoute مع ذلك التكامل (يعتمد نموذج أذونات Notion على المشاركة،
> وليس على مساحة العمل بأكملها).

### التكوين عبر REST

```bash
# حفظ الرمز المميز للتكامل والتحقق منه (يتحقق POST عبر إجراء بحث تجريبي)
curl -X POST http://localhost:20128/api/settings/notion \
  -H "Content-Type: application/json" \
  -d '{"token":"ntn_xxx"}'

# التحقق من حالة الاتصال
curl http://localhost:20128/api/settings/notion

# قطع الاتصال (يمسح الرمز المميز المخزّن)
curl -X DELETE http://localhost:20128/api/settings/notion
```

تتطلب الطرق الثلاث جميعها مصادقة لوحة المعلومات (`isAuthenticated`). عند استخدام
`POST`، يحفظ OmniRoute الرمز المميز ويُجري فورًا بحثًا تجريبيًا بنتيجة واحدة؛ وإذا
أعاد Notion كائن خطأ، يُمسح الرمز المميز وتفشل المكالمة بالحالة `400`.

## أدوات MCP ‏(6)

مُعرَّفة في `open-sse/mcp-server/tools/notionTools.ts`. يجري الحصول على الرمز المميز
وقت الاستدعاء عبر `getNotionToken()`؛ وإذا لم يكن أي رمز مكوّنًا، تُطلق الأداة الخطأ
`"لم يتم تكوين رمز مميز لتكامل Notion. قم بتعيينه في الإعدادات > مصادر السياق."`

| الأداة                       | النطاق         | الوصف                                                                                                   |
| ---------------------------- | -------------- | ------------------------------------------------------------------------------------------------------- |
| `notion_search`              | `read:notion`  | البحث في الصفحات وقواعد البيانات عبر استعلام نصي (يعيد العناوين والمعرّفات وعناوين URL). مرقّم الصفحات. |
| `notion_get_page`            | `read:notion`  | الحصول على محتوى صفحة وبياناتها الوصفية باستخدام معرّفها.                                               |
| `notion_list_block_children` | `read:notion`  | سرد جميع الكتل الفرعية لكتلة أو صفحة (شجرة الكتل). مرقّم الصفحات.                                       |
| `notion_query_database`      | `read:notion`  | الاستعلام من قاعدة بيانات باستخدام `filter` و`sorts` اختياريين (بتنسيق Notion API). مرقّم الصفحات.      |
| `notion_get_database`        | `read:notion`  | الحصول على مخطط قاعدة بيانات وبياناتها الوصفية باستخدام المعرّف.                                        |
| `notion_append_blocks`       | `write:notion` | إلحاق كتل فرعية بكتلة أو صفحة موجودة (بحد أقصى 100 كتلة لكل طلب).                                       |

### معلمات الإدخال

- `notion_search` — ‏`query` (من 1 إلى 500 حرف)، و`pageSize` (من 1 إلى 100،
  والقيمة الافتراضية 20)، و`startCursor` (اختياري).
- `notion_get_page` — ‏`pageId` (قيمة سداسية عشرية من 32 حرفًا أو UUID).
- `notion_list_block_children` — ‏`blockId`، و`pageSize` (من 1 إلى 100،
  والقيمة الافتراضية 50)، و`startCursor` (اختياري).
- `notion_query_database` — ‏`databaseId`، و`filter` (اختياري، بتنسيق مرشّح Notion)،
  و`sorts` (مصفوفة اختيارية)، و`pageSize` (من 1 إلى 100، والقيمة الافتراضية 50)،
  و`startCursor` (اختياري).
- `notion_get_database` — ‏`databaseId`.
- `notion_append_blocks` — ‏`blockId`، و`children` (مصفوفة من كائنات الكتل)،
  و`after` (موضع اختياري).

### النطاقات

تتطلب أدوات القراءة النطاق `read:notion`، بينما تتطلب أداة الكتابة النطاق
`write:notion`. تُفرض النطاقات بواسطة `withScopeEnforcement()` في
`open-sse/mcp-server/server.ts` فقط عندما تكون `OMNIROUTE_MCP_ENFORCE_SCOPES=true`؛
وتأتي النطاقات المسموح بها للمتصل من `OMNIROUTE_MCP_SCOPES` (مفصولة بفواصل) أو من
سياق نطاق مفتاح API المُصادَق عليه. راجع [MCP-SERVER.md](./MCP-SERVER.md) للاطلاع
على نموذج النطاق الكامل.

## نقاط النهاية

| الطريقة  | المسار                 | الغرض                                 |
| -------- | ---------------------- | ------------------------------------- |
| `GET`    | `/api/settings/notion` | إرجاع `{ connected, hasToken }`.      |
| `POST`   | `/api/settings/notion` | حفظ رمز تكامل Notion والتحقق من صحته. |
| `DELETE` | `/api/settings/notion` | قطع الاتصال (مسح الرمز المخزّن).      |

> هذه هي مسارات إعدادات لوحة المعلومات. لا توجد **نقطة نهاية وكيلة عامة لـ Notion ضمن `/v1`
> ** — يتم الوصول إلى Notion حصريًا من خلال أدوات MCP المذكورة أعلاه.

## حالات الاستخدام

- **إجابات مستندة إلى المعرفة** — اسمح للوكيل باستخدام `notion_search` للبحث في مساحة العمل ثم
  `notion_get_page` لجلب أفضل نتيجة قبل الإجابة، بحيث تستشهد الردود بوثائق داخلية فعلية.
- **سير عمل مدعوم بقاعدة بيانات** — استخدم `notion_query_database` للاستعلام عن قاعدة بيانات للمهام/إدارة علاقات العملاء باستخدام
  عوامل التصفية + الفرز، ثم لخّص الصفوف أو صنّفها حسب الأولوية.
- **إعادة الكتابة / التسجيل** — استخدم `notion_append_blocks` لإلحاق ملاحظات الاجتماعات أو ملخصات
  التشغيل أو مخرجات الوكيل بصفحة موجودة (الإلحاق فقط؛ دون تعديلات مدمرة).
- **استكشاف البنية** — استخدم `notion_list_block_children` للتنقل في شجرة كتل الصفحة،
  أو `notion_get_database` لاكتشاف مخطط خصائص قاعدة البيانات قبل الاستعلام عنها.

## ذو صلة

- [خادم MCP](./MCP-SERVER.md) — وسائل النقل، وفرض النطاق، والقائمة الكاملة للأدوات.
- [مصدر سياق Obsidian](./OBSIDIAN_CONTEXT.md) — مصدر السياق المضمّن الآخر.
- [نظام الذاكرة](./MEMORY.md) — ذاكرة محادثة دائمة (طبقة سياق تكميلية
  تُحقن تلقائيًا بدلًا من جلبها بواسطة الأدوات).
