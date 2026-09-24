# OmniRoute MCP Server Documentation (العربية)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/MCP-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/MCP-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/MCP-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/MCP-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/MCP-SERVER.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/MCP-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/MCP-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/MCP-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/MCP-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/MCP-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/MCP-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/MCP-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/MCP-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/MCP-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/MCP-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/MCP-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/MCP-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/MCP-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/MCP-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/MCP-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/MCP-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/MCP-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/MCP-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/MCP-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/MCP-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/MCP-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/MCP-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/MCP-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/MCP-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/MCP-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/MCP-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/MCP-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/MCP-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/MCP-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/MCP-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/MCP-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/MCP-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/MCP-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/MCP-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/MCP-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/MCP-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/MCP-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/MCP-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/MCP-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/MCP-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/MCP-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/MCP-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/MCP-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/MCP-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/MCP-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/MCP-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/MCP-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/MCP-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/MCP-SERVER.md)

---

> خادم Model Context Protocol يضم 110 أدوات تغطي عمليات التوجيه، وذاكرة التخزين المؤقت، والضغط، والذاكرة، والمهارات، والوكيل، والمجموعة، وRadar، ومصادر السياق.
>
> مصدر الحقيقة: يحسب `open-sse/mcp-server/server.ts` **110 أدوات فريدة** باستخدام `countUniqueMcpTools()`: عددها 45 تعريفًا أساسيًا (بما في ذلك أدوات دورة حياة CCR الست، وثلاثية agent-skills، و`omniroute_radar_catalog`، و`omniroute_x_search`)، بالإضافة إلى الذاكرة (3)، والمهارات (4)، ومهارات GitHub ‏(3)، والمجموعة (6)، والتلعيب (8)، والإضافات (8)، وNotion ‏(6)، وObsidian ‏(22)، والمحتوى المحلي (3)، وأداتَي ضغط متاحتين فقط في RTK.

## التثبيت

يأتي OmniRoute MCP مدمجًا. شغّله باستخدام:

```bash
omniroute --mcp
```

أو عبر ناقل open-sse:

```bash
# ناقل HTTP قابل للبث (المنفذ 20130)
omniroute --dev  # يبدأ MCP تلقائيًا على نقطة النهاية /mcp
```

تكون نواقل HTTP ‏(`sse` / `streamable-http`، التي يقدمها خادم لوحة المعلومات داخل العملية نفسها)
معطّلة افتراضيًا، وكان تبديل حالتها سابقًا ممكنًا فقط من صفحة `/dashboard/mcp`. اعتبارًا من v3.8.51،
توفر واجهة CLI الإمكانات نفسها:

```bash
omniroute mcp status                                  # حالة التمكين/الاتصال، والناقل، وعدد الأدوات
omniroute mcp enable [--transport stdio|sse|streamable-http]
omniroute mcp disable
omniroute mcp restart                                 # يعيد تعيين جلسات sse/streamable-http النشطة
```

يرسل `mcp enable`/`mcp disable` طلب PATCH إلى إعداد `mcpEnabled` نفسه (وإلى `mcpTransport` اختياريًا)
الذي تبدّل لوحة المعلومات حالته عبر `/api/settings`. يستدعي `mcp restart` المسار `POST /api/mcp/restart`:
فهو ينهي جلسات `sse`/`streamable-http` النشطة كي يُعاد تهيئة الطلب التالي بصورة سليمة، ويُرجع
`409` إذا كان MCP معطّلًا، و`501` لناقل `stdio` (إذ تدير عملاء stdio عملياتها الفرعية بنفسها —
ولا يوجد معرّف داخل العملية لإعادة تشغيله).

## النواقل

يوفر خادم MCP ثلاثة نواقل، تدعمها جميعًا آلية الإنشاء `createMcpServer()` نفسها:

| الناقل            | الموقع                                      | حالات الاستخدام                                               |
| :---------------- | :------------------------------------------ | :------------------------------------------------------------ |
| `stdio`           | `open-sse/mcp-server/server.ts`             | عمليات التكامل مع بيئات IDE ‏(Claude Desktop وCursor وغيرهما) |
| `sse`             | `POST/GET /api/mcp/sse` عبر `httpTransport` | عملاء المتصفح/الوكلاء الذين يحتاجون إلى تدفق أحداث            |
| `streamable-http` | `POST/GET/DELETE /api/mcp/stream`           | عملاء HTTP متعددو الجلسات (ترويسة `mcp-session-id`)           |

يُحدَّد ناقل HTTP النشط (`sse` أو `streamable-http`) بواسطة إعداد `mcpTransport`. ويؤدي التبديل بين النواقل إلى إغلاق الجلسات الموجودة على الناقل الآخر.

### الوصول عن بُعد (تجاوز بنطاق manage)

يقع `/api/mcp/*` ضمن مستوى LOCAL_ONLY ‏(`src/server/authz/routeGuard.ts`) — وافتراضيًا، لا يمكن الوصول إليه إلا من مضيفي الاسترجاع المحلي (`localhost` و`127.0.0.1` و`::1`). منذ v3.8.2، يمكن للعملاء من خارج الاسترجاع المحلي الاتصال إذا قدّموا `Authorization: Bearer <api-key>` وكان المفتاح يحمل نطاق `manage`. وهذه هي الطريقة الوحيدة للوصول إلى خادم MCP البعيد عبر نفق أو وكيل عكسي أو اسم مضيف عام.

```bash
# لمنح نطاق manage: افتح صفحة مفاتيح API في لوحة المعلومات وفعّل
# "الوصول الإداري" للمفتاح، أو أرسل POST يتضمن scopes:["manage"] عند الإنشاء.

# ثم اتصل من عميل MCP بعيد:
curl -i \
  -H "Host: your-public-host.example" \
  -H "Authorization: Bearer sk-…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-03-26","capabilities":{},"clientInfo":{"name":"my-client","version":"0"}}}' \
  https://your-public-host.example/api/mcp/stream
```

يُرجع المفتاح الذي لا يحمل نطاق manage (أو الطلب الذي لا يتضمن Bearer) الخطأ `403 LOCAL_ONLY`. أما البادئة الشقيقة `/api/cli-tools/runtime/*`، فلا يمكن تجاوز قيودها عمدًا — راجع [مستويات حارس المسارات — استثناء نطاق manage](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out).

## إعداد بيئة التطوير المتكاملة

راجع [إعداد عميل MCP](../guides/SETUP_GUIDE.md#mcp-client-configuration) لإعداد Claude Desktop وCursor وCline وعملاء MCP المتوافقين.

---

## الأدوات الأساسية (14) — المرحلة 1

| الأداة                          | النطاقات              | الوصف                                                                                                                                 |
| :------------------------------ | :-------------------- | :------------------------------------------------------------------------------------------------------------------------------------ |
| `omniroute_get_health`          | `read:health`         | مدة التشغيل والذاكرة وقواطع الدوائر وحدود المعدل وإحصاءات ذاكرة التخزين المؤقت                                                        |
| `omniroute_list_combos`         | `read:combos`         | جميع التركيبات المُعدّة مع الاستراتيجيات (مقاييس اختيارية)                                                                            |
| `omniroute_get_combo_metrics`   | `read:combos`         | مقاييس الأداء لتركيبة محددة                                                                                                           |
| `omniroute_switch_combo`        | `write:combos`        | تفعيل تركيبة أو إلغاء تفعيلها                                                                                                         |
| `omniroute_create_combo`        | `write:combos`        | إنشاء تركيبة مُتحقق من صحتها عبر واجهة API الحالية للتركيبات                                                                          |
| `omniroute_check_quota`         | `read:quota`          | الحصة المستخدمة/الإجمالية، والنسبة المتبقية، ووقت إعادة التعيين، وحالة الرمز المميز                                                   |
| `omniroute_route_request`       | `execute:completions` | إرسال طلب إكمال محادثة عبر توجيه OmniRoute                                                                                            |
| `omniroute_cost_report`         | `read:usage`          | تقرير التكلفة حسب الفترة (الجلسة/اليوم/الأسبوع/الشهر)                                                                                 |
| `omniroute_list_models_catalog` | `read:models`         | كتالوج النماذج الكامل، بما في ذلك الإمكانات والحالة والأسعار                                                                          |
| `omniroute_radar_catalog`       | `read:radar`          | كتالوج Radar محلي موقّع؛ مع عوامل تصفية اختيارية حسب المزوّد/العائلة                                                                  |
| `omniroute_tool_search`         | `read:tools`          | اكتشاف الأدوات من كتالوج MCP المسجّل                                                                                                  |
| `omniroute_web_search`          | `execute:search`      | البحث في الويب عبر مزوّدي البحث المُعدّين. لا يشمل X/Twitter.                                                                         |
| `omniroute_x_search`            | `execute:search`      | البحث في X عبر xAI/SuperGrok، أو اختيار `xquik-search` للحصول على نتائج واجهة Xquik API. يتطلب بيانات اعتماد للواجهة الخلفية المحددة. |
| `omniroute_web_fetch`           | `execute:search`      | جلب محتوى الويب عبر مزوّدي الجلب المُعدّين                                                                                            |

## الأدوات المتقدمة (11) — المرحلة 2

| الأداة                             | النطاقات                             | الوصف                                                                                                 |
| :--------------------------------- | :----------------------------------- | :---------------------------------------------------------------------------------------------------- |
| `omniroute_simulate_route`         | `read:health`, `read:combos`         | محاكاة تجريبية للتوجيه باستخدام شجرة احتياطية                                                         |
| `omniroute_set_budget_guard`       | `write:budget`                       | ميزانية للجلسة مع إجراء خفض الجودة أو الحظر أو التنبيه                                                |
| `omniroute_set_routing_strategy`   | `write:combos`                       | تحديث استراتيجية المجموعة في وقت التشغيل (أولوية/موزونة/تلقائية/إلخ.)                                 |
| `omniroute_set_resilience_profile` | `write:resilience`                   | تطبيق إعداد مسبق للمرونة: `aggressive` / `balanced` / `conservative`                                  |
| `omniroute_test_combo`             | `execute:completions`, `read:combos` | اختبار مباشر لكل مزوّد في مجموعة باستخدام استدعاء فعلي للخدمة الخارجية                                |
| `omniroute_get_provider_metrics`   | `read:health`                        | مقاييس لكل مزوّد، تشمل زمن الاستجابة p50/p95/p99 وحالة قاطع الدائرة                                   |
| `omniroute_best_combo_for_task`    | `read:combos`, `read:health`         | التوصية بمجموعة حسب نوع المهمة مع قيود الميزانية وزمن الاستجابة                                       |
| `omniroute_explain_route`          | `read:health`, `read:usage`          | شرح سبب توجيه طلب إلى مزوّد معين (عوامل التقييم + البدائل الاحتياطية)                                 |
| `omniroute_get_session_snapshot`   | `read:usage`                         | لقطة كاملة للجلسة: التكلفة، والرموز، وأبرز النماذج/المزوّدين، والأخطاء، وحارس الميزانية               |
| `omniroute_db_health_check`        | `read:health`, `write:resilience`    | تشخيص انحراف قاعدة البيانات (وإصلاحه تلقائيًا اختياريًا)، مثل مراجع المجموعات المعطّلة/الصفوف اليتيمة |
| `omniroute_sync_pricing`           | `pricing:write`                      | مزامنة بيانات التسعير من مصادر خارجية (LiteLLM)؛ يدعم `dryRun`                                        |

## أدوات التخزين المؤقت (2)

| الأداة                  | النطاقات      | الوصف                                                                       |
| :---------------------- | :------------ | :-------------------------------------------------------------------------- |
| `omniroute_cache_stats` | `read:cache`  | إحصاءات ذاكرة التخزين الدلالية، وذاكرة تخزين المطالبات، ومنع تكرار العمليات |
| `omniroute_cache_flush` | `write:cache` | مسح ذاكرة التخزين المؤقت بالكامل أو حسب التوقيع/النموذج                     |

## أدوات الضغط (13)

| الأداة                              | النطاقات            | الوصف                                                                                                                            |
| :---------------------------------- | :------------------ | :------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_compression_status`      | `read:compression`  | إعدادات الضغط، وملخص التحليلات، وإحصاءات تراعي ذاكرة التخزين المؤقت (تتضمن بيانات `analytics.mcpDescriptionCompression` الوصفية) |
| `omniroute_compression_configure`   | `write:compression` | تهيئة وضع الضغط، والحد، والنسبة المستهدفة، والحفاظ على مطالبة النظام، ومفتاح تبديل ضغط وصف MCP                                   |
| `omniroute_set_compression_engine`  | `write:compression` | اختيار المحرك النشط (off/caveman/rtk/stacked) ومستوى كثافة Caveman/RTK                                                           |
| `omniroute_list_compression_combos` | `read:compression`  | سرد مجموعات الضغط المسماة ومسارات محركاتها                                                                                       |
| `omniroute_compression_combo_stats` | `read:compression`  | تحليلات مجمّعة حسب مجموعة الضغط والمحرك                                                                                          |
| `omniroute_ccr_store`               | `write:compression` | تخزين محتوى معزول حسب المستدعي في مخزن CCR محدود داخل الذاكرة، وإرجاع علامة بالإضافة إلى مرجع `ccr://`                           |
| `omniroute_ccr_retrieve`            | `read:compression`  | استرداد محتوى CCR بالكامل أو باستخدام أوضاع البداية، والنهاية، والأسطر، والبحث grep، والإحصاءات                                  |
| `omniroute_ccr_inspect`             | `read:compression`  | فحص بيانات CCR الوصفية المملوكة للمستدعي دون إرجاع المحتوى                                                                       |
| `omniroute_ccr_list`                | `read:compression`  | سرد البيانات الوصفية المرقّمة على صفحات لكتل CCR المملوكة للمستدعي                                                               |
| `omniroute_ccr_delete`              | `write:compression` | حذف كتلة CCR مملوكة للمستدعي                                                                                                     |
| `omniroute_ccr_stats`               | `read:compression`  | الإبلاغ عن استخدام الذاكرة ضمن نطاق المستدعي، وعدادات دورة الحياة، وحدود المخزن                                                  |
| `omniroute_rtk_discover`            | `read:compression`  | اكتشاف الضوضاء المتكررة في عينات مخرجات RTK المضمّنة اختياريًا                                                                   |
| `omniroute_rtk_learn`               | `read:compression`  | إنشاء مسودة مرشح RTK قابلة للمراجعة من العينات المضمّنة اختياريًا                                                                |

توجد إدخالات CCR في الذاكرة فقط وتختفي عند إعادة التشغيل. يقتصر حجم كل كتلة على 2 MiB، وكل
هوية رئيسية على 16 MiB، والمخزن العام على 64 MiB. مدة البقاء الافتراضية للإدخالات هي 24 ساعة (بحد أقصى
سبعة أيام). يقتصر الاسترداد الكامل عبر MCP على 256 KiB؛ وتظل الكتل الأكبر متاحة عبر
أوضاع النطاق والبحث grep. تُعزل عمليات التخزين، والاسترداد، والسرد، والفحص، والحذف، والإحصاءات حسب
الهوية الرئيسية لمفتاح API المصادق عليه. تحتوي سجلات التدقيق على قيم التجزئة وبيانات الحجم الوصفية، ولا تحتوي على المحتوى مطلقًا.

يُبلغ `omniroute_compression_status` عن ضغط أوصاف MCP بشكل منفصل ضمن
`analytics.mcpDescriptionCompression`. تمثل هذه القيم تقديرات لحجم البيانات الوصفية لأوصاف MCP القابلة للسرد
(`tools` و`prompts` و`resources` و`resourceTemplates`)؛ وهي ليست إيصالات استخدام من مزوّد الخدمة،
وتُميّز بالقيمة `source: "mcp_metadata_estimate"`.

### مرشّح شجرة إمكانية الوصول في MCP (v3.8.0)

بمعزل عن أدوات الضغط المذكورة أعلاه، يتضمن OmniRoute مرشّحًا يعمل بعد التنفيذ
لضغط **نتائج الأدوات** الخاصة بأدوات المتصفح/إمكانية الوصول في MCP قبل إعادتها إلى
الوكيل. هذا المرشّح ليس أداة بحد ذاته — بل يعمل بشفافية على أي نتيجة أداة تحتوي على
نص مطوّل لشجرة إمكانية الوصول أو لقطة المتصفح (≥2000 حرف).

السلوكيات الرئيسية:

- يطوي ≥30 سطرًا متتاليًا ومكررًا من العناصر الشقيقة في ملخص يضم البداية + النهاية
- يحافظ على نقاط الارتساء `[ref=eXX]` المطلوبة بواسطة Playwright/استخدام الحاسوب
- يقتطع النصوص كبيرة الحجم بشكل صارم (>50,000 حرف) مع تلميح للتنقل
- التوفير المتوقع: **60–80%** في حمولات لقطات المتصفح

الإعداد: `compression.mcpAccessibility` في الإعدادات العامة (الترحيل 056).
التنفيذ: `open-sse/services/compression/engines/mcpAccessibility/`.
الوثائق الكاملة: [محركات الضغط — مرشّح شجرة إمكانية الوصول في MCP](../compression/COMPRESSION_ENGINES.md#mcp-accessibility-tree-filter).

راجع [محركات الضغط](../compression/COMPRESSION_ENGINES.md) و[ضغط RTK](../compression/RTK_COMPRESSION.md) للاطلاع على
نموذج الضغط في وقت التشغيل الذي تستند إليه هذه الأدوات.

## أدوات 1Proxy (3)

| الأداة                      | النطاقات       | الوصف                                                                                    |
| :-------------------------- | :------------- | :--------------------------------------------------------------------------------------- |
| `omniroute_oneproxy_fetch`  | `read:proxies` | جلب وكلاء مجانيين من سوق 1proxy (مرشحات البروتوكول/البلد/الجودة/الحد)                    |
| `omniroute_oneproxy_rotate` | `read:proxies` | الحصول على الوكيل المتاح التالي وفقًا للاستراتيجية (`random` / `quality` / `sequential`) |
| `omniroute_oneproxy_stats`  | `read:proxies` | إحصاءات المجموعة وحالة المزامنة والتوزيع حسب البروتوكول والبلد                           |

## أدوات الذاكرة (3)

مُعرَّفة في `open-sse/mcp-server/tools/memoryTools.ts`. تُفرض المصادقة/النطاق من خلال مسار نطاق MCP القياسي.

| الأداة                    | النطاقات       | الوصف                                                                                     |
| :------------------------ | :------------- | :---------------------------------------------------------------------------------------- |
| `omniroute_memory_search` | `read:memory`  | البحث في الذكريات حسب الاستعلام / النوع / مفتاح API مع فرض ميزانية الرموز                 |
| `omniroute_memory_add`    | `write:memory` | إضافة إدخال ذاكرة جديد (`factual` / `episodic` / `procedural` / `semantic`)               |
| `omniroute_memory_clear`  | `write:memory` | مسح الذكريات الخاصة بمفتاح API، مع إمكانية التصفية حسب النوع أو الطابع الزمني `olderThan` |

## أدوات المهارات (4)

مُعرَّفة في `open-sse/mcp-server/tools/skillTools.ts`. ومدعومة بواسطة `src/lib/skills/registry` + `src/lib/skills/executor`.

| الأداة                        | النطاقات         | الوصف                                                                          |
| :---------------------------- | :--------------- | :----------------------------------------------------------------------------- |
| `omniroute_skills_list`       | `read:skills`    | سرد المهارات المسجّلة مع تصفية اختيارية حسب مفتاح API أو الاسم أو حالة التفعيل |
| `omniroute_skills_enable`     | `write:skills`   | تفعيل مهارة محددة أو تعطيلها حسب المعرّف                                       |
| `omniroute_skills_execute`    | `execute:skills` | تنفيذ مهارة باستخدام المدخلات المقدمة وإرجاع سجل التنفيذ                       |
| `omniroute_skills_executions` | `read:skills`    | سرد سجل عمليات تنفيذ المهارات الأخيرة                                          |

## مصدر سياق Notion (6)

مُعرَّف في `open-sse/mcp-server/tools/notionTools.ts`. يُخزَّن الرمز المميز في جدول `key_value` عبر `src/lib/db/notion.ts`. يوجد عميل REST في `src/lib/notion/api.ts`. وتوجد واجهة API للإعدادات في `src/app/api/settings/notion/route.ts`. وتوجد واجهة لوحة المعلومات في `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx`.

قم بتهيئة رمز تكامل Notion المميز من علامة تبويب **مصادر السياق** في لوحة معلومات نقطة النهاية، أو عبر واجهة REST API:

```bash
# تعيين الرمز المميز
curl -X POST http://localhost:20128/api/settings/notion \
  -H "Content-Type: application/json" \
  -d '{"token": "ntn_..."}'

# التحقق من الحالة
curl http://localhost:20128/api/settings/notion

# قطع الاتصال
curl -X DELETE http://localhost:20128/api/settings/notion
```

| الأداة                       | النطاقات       | الوصف                                                                 |
| :--------------------------- | :------------- | :-------------------------------------------------------------------- |
| `notion_search`              | `read:notion`  | البحث النصي الكامل عبر جميع الصفحات وقواعد البيانات                   |
| `notion_get_page`            | `read:notion`  | الحصول على صفحة حسب المعرّف مع خصائصها                                |
| `notion_list_block_children` | `read:notion`  | سرد الكتل الفرعية لصفحة أو كتلة                                       |
| `notion_query_database`      | `read:notion`  | الاستعلام عن قاعدة بيانات باستخدام المرشحات والترتيبات وتقسيم الصفحات |
| `notion_get_database`        | `read:notion`  | الحصول على مخطط قاعدة البيانات حسب المعرّف                            |
| `notion_append_blocks`       | `write:notion` | إلحاق كتل فرعية بكتلة أصلية (بحد أقصى 100 لكل طلب)                    |

## أدوات كتالوج مهارات الوكلاء (3)

مُعرَّفة في `open-sse/mcp-server/tools/agentSkillTools.ts`. ومدعومة بواسطة `src/lib/agentSkills/catalog`. تتيح هذه الأدوات لعملاء MCP والوكلاء الخارجيين الوصول إلى كتالوج توثيق مهارات الوكلاء الذي يضم 45 إدخالًا. النطاق: `read:catalog`.

| الأداة                            | النطاقات       | الوصف                                                                                                                                                                     |
| :-------------------------------- | :------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `omniroute_agent_skills_list`     | `read:catalog` | تسرد جميع مهارات الوكلاء البالغ عددها 45 مع مرشحات اختيارية لـ `category` ‏(api\|cli) و`area`؛ وتُرجع البيانات الوصفية + التغطية                                          |
| `omniroute_agent_skills_get`      | `read:catalog` | تجلب البيانات الوصفية الكاملة + محتوى SKILL.md لمهارة واحدة باستخدام `id` القياسي                                                                                         |
| `omniroute_agent_skills_coverage` | `read:catalog` | إحصاءات التغطية: عدد مهارات API البالغ عددها 23، ومهارات CLI البالغ عددها 21، ومهارة الإعداد الواحدة التي لديها ملفات SKILL.md في نظام الملفات مقارنةً بإجماليات الكتالوج |

راجع [AGENT-SKILLS.md](./AGENT-SKILLS.md) للاطلاع على الكتالوج الكامل وكيفية استخدام الوكلاء الخارجيين له.

## أطر العمل ذات الصلة (v3.8.0)

إن مخزون أدوات MCP أعلاه (110 أدوات فريدة، محسوبة بواسطة `countUniqueMcpTools()`) مخصّص عمدًا
لعمليات التوجيه/التخزين المؤقت/الضغط/الذاكرة/المهارات/الوكيل/مصدر السياق في وقت التشغيل. يُشحن إطارا عمل
متجاوران إلى جانب خادم MCP في v3.8.0، وقد جرى توثيقهما بصورة منفصلة:

### الوكلاء السحابيون

الوكلاء السحابيون هم وكلاء برمجة بالذكاء الاصطناعي يعملون خارج العملية (codex-cloud، cursor-cloud، devin، jules)، وقد دُمجوا في
OmniRoute من خلال نموذج الاتصال نفسه المستخدم لموفري LLM. ويُتاحون عبر
واجهة REST خاصة بهم (`/api/v1/agents/*`)، وهم **ليسوا** جزءًا من كتالوج أدوات MCP
— ولا يستهلك استدعاء وكيل سحابي نطاق MCP.

- التنفيذ: `src/lib/cloudAgent/` ‏(`registry.ts`، `agents/codex.ts`، `agents/cursor.ts`، `agents/devin.ts`، `agents/jules.ts`).
- دورة الحياة: `createTask`، `getStatus`، `approvePlan`، `sendMessage`، `listSources`.
- التوثيق: [docs/frameworks/CLOUD_AGENT.md](./CLOUD_AGENT.md).

### حواجز الحماية

حواجز الحماية هي مرشحات تسبق التنفيذ أو تليه (vision-bridge، pii-masker، prompt-injection)
وتُطبَّق داخل مسار المحادثة. تعمل هذه المرشحات قبل الوصول إلى طبقة أداة/مسار MCP
وتُصدر انتهاكات منظَّمة إلى مسار التدقيق؛ ولا يجري استدعاؤها كأدوات MCP.

- التنفيذ: `src/lib/guardrails/`.
- التوثيق: [docs/security/GUARDRAILS.md](../security/GUARDRAILS.md).

عند تصحيح أخطاء استدعاء MCP يبدو محظورًا، تحقّق من كلٍ من سجل تدقيق MCP
(إدخالات `scope_denied:*`) ومسار تدقيق حواجز الحماية — فقد يُرفض الطلب بواسطة
حاجز حماية **قبل** أن يصل أصلًا إلى طبقة فرض نطاق MCP.

---

## نقاط نهاية REST API

| نقطة النهاية           | الطريقة               | الوصف                                                                                                | المصادقة             |
| :--------------------- | :-------------------- | :--------------------------------------------------------------------------------------------------- | :------------------- |
| `/api/mcp/status`      | `GET`                 | حالة الخادم: نبضات البقاء، وحالة نقل HTTP، وملخص نشاط التدقيق                                        | الإدارة (جلسة/مسؤول) |
| `/api/mcp/tools`       | `GET`                 | كتالوج الأدوات (الاسم، والوصف، والنطاقات، والمرحلة، ونقاط النهاية المصدرية)                          | الإدارة              |
| `/api/mcp/sse`         | `GET` / `POST`        | نقطة نهاية نقل SSE (مقيّدة بواسطة `mcpEnabled` + ‏`mcpTransport === "sse"`)                          | مفتاح API + النطاقات |
| `/api/mcp/stream`      | `POST`/`GET`/`DELETE` | نقل HTTP قابل للتدفق (يستخدم ترويسة `mcp-session-id`؛ وينهي `DELETE` الجلسة)                         | مفتاح API + النطاقات |
| `/api/mcp/audit`       | `GET`                 | إدخالات سجل التدقيق من `mcp_tool_audit` (المرشحات: `limit`، `offset`، `tool`، `success`، `apiKeyId`) | الإدارة              |
| `/api/mcp/audit/stats` | `GET`                 | إحصاءات تدقيق مجمّعة (`totalCalls`، `successRate`، `avgDurationMs`، أكثر الأدوات استخدامًا)          | الإدارة              |

ملفات المصدر: `src/app/api/mcp/{status,tools,sse,stream,audit,audit/stats}/route.ts`.

يُحظر كلٌ من نقلي SSE وHTTP القابل للتدفق حتى يجري تمكين خادم MCP في الإعدادات (`mcpEnabled`) وتحديد `mcpTransport` المناسب. وإذا تم إعداد وسيلة النقل الخاطئة، يُرجع المسار HTTP 400 مع تلميح لتبديل الإعدادات.

---

## المصادقة والنطاقات

تقرأ استدعاءات أدوات MCP سلاسل النطاقات من المستدعي. يُعد هذا التحقق واحدًا من ثلاثة
فضاءات أسماء مستقلة. لا يعني الاجتياز لدى أحد المدققات الاجتياز لدى المدققات الأخرى.
القواعد موضحة في [فضاءات أسماء النطاقات الثلاثة](#three-scope-namespaces).
وفهرس الأدوات موضح في [نطاقات أدوات MCP](#mcp-tool-scopes).

### فضاءات أسماء النطاقات الثلاثة

يُعد `manage` في مفتاح API، و`read:compression` في أداة MCP، و`read` في
رمز وصول `oma_live_…` ثلاثة تفويضات مختلفة. يحصل المستدعون الذين يرسلون رمز وصول
بنطاق `read` إلى مسار إدارة يُجري تعديلات على HTTP 403:
`Access token scope 'read' is insufficient; 'write' required.`
تُحدَّد هذه الرتبة بواسطة `scopeSatisfies`. ولا ترجع هذه الدالة إلى جدول MCP، كما أن
مُطابق MCP لا يرجع إليها.

| فضاء الأسماء              | بيانات الاعتماد                                               | المدقق                         | ما يسمح به الاجتياز                              |
| :------------------------ | :------------------------------------------------------------ | :----------------------------- | :----------------------------------------------- |
| إدارة مفتاح API           | `api_keys.scopes`                                             | `hasManageScope`               | واجهة REST للإدارة الخاصة بمفتاح Bearer هذا      |
| نطاقات مفتاح API الإضافية | المصفوفة نفسها، سلسلة واحدة مطابقة تمامًا                     | الدالة المساعدة المذكورة أدناه | تلك الإمكانية وحدها                              |
| نطاقات أدوات MCP          | المصفوفة نفسها، وإلا MCP `_meta`، وإلا `OMNIROUTE_MCP_SCOPES` | `scopeMatches`                 | تلك الأداة، بعد تشغيل الإنفاذ                    |
| رمز الوصول                | `oma_live_…`                                                  | `scopeSatisfies`               | مسار الإدارة الذي يتطلب أسلوبه ومساره تلك الرتبة |

تتناول صفحة
[مصادقة الإدارة](../guides/MANAGEMENT-AUTH.md) كيفية إصدار كل نوع من بيانات الاعتماد.

#### نطاقات مفتاح API

تُستخدم مصفوفة `api_keys.scopes` واحدة لمهمتين. وتستخدم كل مهمة دوال مختلفة.

**واجهة REST للإدارة.** النطاقان `manage` و`admin` عضوان في
`MANAGEMENT_API_KEY_SCOPES` (`src/shared/constants/managementScopes.ts`).
تُستخدم `hasManageScope` لتخويل مسارات الإدارة لهذا المفتاح. ويتيح `admin`
إمكانات الإدارة على تلك المسارات. ولا تشير كلمة `admin` هنا إلى رتبة
رمز الوصول، كما أنها لا تتوسع لتشمل نطاقات أدوات MCP.

**السلاسل الإضافية.** يخضع كل نطاق منها لاختبار عضوية يتطلب مطابقة تامة، ويظل كل منها
خارج `MANAGEMENT_API_KEY_SCOPES`.

| النطاق                         | ما يسمح به الاجتياز                                                                                                                                                 |
| :----------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `mcp:connect`                  | استثناء LOCAL_ONLY للمسار `/api/mcp/` من خارج عنوان الاسترجاع المحلي فقط (`hasMcpConnectOrManageScope`). ويجتاز هذا الاستثناء أيضًا مفتاح يحمل `manage` أو `admin`. |
| `self:usage`                   | `GET /api/v1/me/status` لهذا المفتاح (`src/app/api/v1/me/status/route.ts`). يضيف `POST /api/keys` هذا النطاق عند الإنشاء (`normalizeSelfServiceScopesForCreate`).   |
| `self:account-quota`           | حصص الحساب لدى المزوّد الأصلي ضمن حمولة الحالة (`src/lib/usage/apiKeySelfService.ts`). ويظل مسار الحالة يتطلب `self:usage`.                                         |
| `policy:bypass-provider-quota` | تتخطى استدعاءات الاستدلال الخاصة بهذا المفتاح سياسة حصة المزوّد (`hasProviderQuotaBypassScope` في `src/sse/handlers/chat.ts`).                                      |

#### المطابقة

الفهرس هو الجدول الموجود ضمن [نطاقات أدوات MCP](#mcp-tool-scopes). لا تتعامل مع
`MCP_SCOPE_LIST` في `src/shared/constants/mcpScopes.ts` على أنه ذلك الفهرس:
فهو المجموعة الفرعية الأصلية ذات الأنواع المحددة. وتُعلن الأدوات اللاحقة نطاقات إضافية بجانبه
(`read:notion` و`read:skills` و`read:local-corpus` وبقية النطاقات في الجدول).

تسمح `evaluateToolScopes` في `open-sse/mcp-server/scopeEnforcement.ts` بإجراء استدعاء
عندما يطابق كل نطاق مطلوب نطاقًا ممنوحًا:

- يطابق `*` كل نطاق مطلوب.
- يطابق النطاق الممنوح الذي ينتهي بـ`*` نطاقًا مطلوبًا يبدأ
  بالبادئة التي تسبق النجمة. يطابق `read:*` النطاق `read:compression`.
- لا يطابق أي نطاق ممنوح آخر سوى السلسلة المطلوبة المطابقة له تمامًا.

يفشل المفتاح الذي نطاقاته `["manage"]` في `scopeMatches` للنطاق `read:compression`.
ويفشل الاستدعاء نفسه مع `admin` و`mcp:connect` و`read` و`write` عندما تكون هذه
هي السلاسل الوحيدة الممنوحة. ولا يوجد تسلسل هرمي بين نطاقات أدوات MCP
باستثناء حرف البدل `*` اللاحق.

يكون الإنفاذ متوقفًا ما لم تكن `OMNIROUTE_MCP_ENFORCE_SCOPES=true` (القيمة الافتراضية
`false`). وأثناء توقفه، تسمح `evaluateToolScopes` بالاستدعاء وتتخطى
الفهرس. وعند تشغيله، يستخدم HTTP قيمة `api_keys.scopes` لمفتاح Bearer بوصفها
`authInfo` (راجع [ربط نطاق HTTP بكل مفتاح](#per-key-http-scope-binding-7895)).
وعندما لا يمكن العثور على نطاقات للمفتاح، تنتقل مجموعة النطاقات الممنوحة إلى MCP `_meta`، ثم
`OMNIROUTE_MCP_SCOPES`.

#### نطاقات رموز الوصول

تحمل رموز `oma_live_…` (`src/lib/accessTokens/scopes.ts`) النطاق `read` أو `write`
أو `admin`. وتتعامل `scopeSatisfies` معها كرتب: يغطي `admin` النطاقين `write` و`read`،
ويغطي `write` النطاق `read`. ولا تغطي النطاقات غير المعروفة أي شيء.

تقارن `evaluateAccessTokenAuth` (`src/server/authz/accessTokenAuth.ts`) تلك
الرتبة مع `inferRequiredScope` (`src/server/authz/accessScopes.ts`):

- تتطلب `GET` و`HEAD` و`OPTIONS` النطاق `read`.
- تتطلب كل الأساليب الأخرى النطاق `write`.
- تتطلب المسارات في `ADMIN_SCOPE_PREFIXES` النطاق `admin` لكل الأساليب. والمسار `/api/mcp`
  مدرج في تلك القائمة، ولذلك لا يزال رمز وصول بنطاق `write` غير قادر على استدعاء واجهة MCP عبر HTTP.
- تتطلب المسارات في `ADMIN_MUTATION_PREFIXES` النطاق `admin` فقط عند إجراء تعديلات.

`PATCH /api/keys/{id}` هي عملية تعديل وليست ضمن قوائم المسؤول تلك، لذا تتلقى
رموز الوصول ذات النطاق `read` الاستجابة 403:
`Access token scope 'read' is insufficient; 'write' required.`
يستوفي رمز وصول بنطاق `write` أو `admin` متطلبات ذلك المسار. أما JWT الخاص بلوحة المعلومات، ورمز machine-id الخاص بأداة CLI عبر loopback، ومفتاح API ذي النطاق `manage` أو `admin`، فتسلك فروعًا أخرى ولا تخضع للتضييق وفق هذه الرتبة.

رمز الوصول الذي يجتاز `scopeSatisfies` لـ `/api/mcp` يكون قد اجتاز بوابة الإدارة فقط. ولا تزال استدعاءات الأدوات تُشغّل `scopeMatches` لمطابقة نطاقات مفتاح API. ولا تُعد رتبة رمز الوصول مُدخلًا لـ `scopeMatches`.

### نطاقات أدوات MCP

يتم فرض النطاقات مركزيًا في `open-sse/mcp-server/scopeEnforcement.ts`.
تتطلب كل أداة نطاقات محددة:

| النطاق                | الأدوات                                                                                                                                                                      |
| :-------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `read:health`         | `get_health`, `get_provider_metrics`, `simulate_route`, `explain_route`, `best_combo_for_task`, `db_health_check`                                                            |
| `read:combos`         | `list_combos`, `get_combo_metrics`, `simulate_route`, `best_combo_for_task`, `test_combo`                                                                                    |
| `write:combos`        | `switch_combo`, `set_routing_strategy`                                                                                                                                       |
| `read:quota`          | `check_quota`                                                                                                                                                                |
| `read:usage`          | `cost_report`, `get_session_snapshot`, `explain_route`                                                                                                                       |
| `read:models`         | `list_models_catalog`                                                                                                                                                        |
| `execute:completions` | `route_request`, `test_combo`                                                                                                                                                |
| `execute:search`      | `web_search`, `x_search`, `web_fetch`                                                                                                                                        |
| `write:budget`        | `set_budget_guard`                                                                                                                                                           |
| `write:resilience`    | `set_resilience_profile`, `db_health_check`                                                                                                                                  |
| `pricing:write`       | `sync_pricing`                                                                                                                                                               |
| `read:cache`          | `cache_stats`                                                                                                                                                                |
| `write:cache`         | `cache_flush`                                                                                                                                                                |
| `read:compression`    | `compression_status`, `list_compression_combos`, `compression_combo_stats`                                                                                                   |
| `write:compression`   | `compression_configure`, `set_compression_engine`                                                                                                                            |
| `read:proxies`        | `oneproxy_fetch`, `oneproxy_rotate`, `oneproxy_stats`                                                                                                                        |
| `read:notion`         | `notion_search`, `notion_get_page`, `notion_list_block_children`, `notion_query_database`, `notion_get_database`                                                             |
| `write:notion`        | `notion_append_blocks`                                                                                                                                                       |
| `read:memory`         | `memory_search`                                                                                                                                                              |
| `write:memory`        | `memory_add`, `memory_clear`                                                                                                                                                 |
| `read:skills`         | `skills_list`, `skills_executions`                                                                                                                                           |
| `write:skills`        | `skills_enable`                                                                                                                                                              |
| `execute:skills`      | `skills_execute`                                                                                                                                                             |
| `read:catalog`        | `agent_skills_list`, `agent_skills_get`, `agent_skills_coverage`                                                                                                             |
| `read:tools`          | `omniroute_tool_search`                                                                                                                                                      |
| `read:radar`          | `omniroute_radar_catalog`                                                                                                                                                    |
| `read:gamification`   | `gamification_profile`, `gamification_rank`, `gamification_leaderboard`, `gamification_badges`, `gamification_servers`, `gamification_anomalies`                             |
| `write:gamification`  | `gamification_invite`، `gamification_transfer`                                                                                                                               |
| `read:plugins`        | `plugin_list`، `plugin_executions`                                                                                                                                           |
| `write:plugins`       | `plugin_scan`، `plugin_install`، `plugin_uninstall`، `plugin_activate`، `plugin_deactivate`، `plugin_configure`                                                              |
| `read:obsidian`       | 13 أداة قراءة — `obsidian_list_vault`، `obsidian_read_note`، `obsidian_search_simple`، `obsidian_search_structured`، `obsidian_get_periodic_note`، `obsidian_sync_status`، … |
| `write:obsidian`      | 9 أدوات كتابة — `obsidian_write_note`، `obsidian_append_note`، `obsidian_patch_note`، `obsidian_move_note`، `obsidian_delete_note`، `obsidian_sync_trigger`، …               |
| `read:local-corpus`   | `local_corpus_search`، `local_corpus_read`، `local_corpus_status`                                                                                                            |

نطاقات أحرف البدل مدعومة: يمنح `read:*` جميع نطاقات القراءة، ويمنح `*` وصولًا كاملًا.

### `mcp:connect` — صلاحية محدودة للمسار (#7895)

يتطلب الوصول إلى نقل HTTP/SSE الخاص بـ MCP ‏(`/api/mcp/*`) من عنوان غير محلي
استثناء LOCAL_ONLY للمسار `/api/mcp/` (راجع `docs/security/ROUTE_GUARD_TIERS.md`). تاريخيًا،
كان هذا الاستثناء لا يقبل إلا مفتاح API بنطاق `manage`/`admin` كامل — وهو أوسع مما يلزم
لجهة اتصال لا تحتاج إلا إلى التواصل مع MCP. يصدّر `src/shared/constants/managementScopes.ts` الآن
`MCP_CONNECT_SCOPE = "mcp:connect"`: نطاقًا إضافيًا محدودًا (وفق السابقة نفسها المتمثلة في
`SELF_USAGE_SCOPE`) لا يمنح إلا صلاحية تجاوز `/api/mcp/` في
`src/server/authz/policies/management.ts` — ولا يمنح أي وصول آخر إلى مسارات الإدارة،
وقد أُبقي عمدًا خارج `MANAGEMENT_API_KEY_SCOPES`. يظل المفتاح الذي يحمل `manage`/`admin`
يجتاز الاستثناء دون تغيير؛ أما `mcp:connect` فهو بديل أقل امتيازًا للجهات البعيدة
التي تتعامل مع MCP فقط، ويُتحقق منه عبر `hasMcpConnectOrManageScope()`.

### ربط نطاق HTTP بكل مفتاح (#7895)

عبر HTTP/SSE، يحلّ `open-sse/mcp-server/httpTransport.ts` الآن نطاقات
`api_keys.scopes` الفعلية للمتصل عبر `resolveMcpCallerAuthInfo()` ‏(`open-sse/mcp-server/httpAuthContext.ts`)
ويمررها إلى `transport.handleRequest(req, { authInfo })` في حزمة SDK الخاصة بـ MCP، بحيث
تعكس `extra.authInfo.scopes` التي تصل إلى كل استدعاء أداة نطاقات مفتاح Bearer نفسه.
كانت `resolveCallerScopeContext()` في `scopeEnforcement.ts` تعطي الأولوية بالفعل لـ `authInfo` على
`_meta` وعلى القيمة الاحتياطية من متغير البيئة `OMNIROUTE_MCP_SCOPES` — وهذا التغيير لا يفعل سوى تعبئة
ذلك المصدر الأول ذي الأولوية القصوى، والذي لم يكن يتلقى بيانات سابقًا عبر HTTP. عندما لا يمكن التوصل
إلى أي مفتاح API (لعدم وجود ترويسة أو لكون المفتاح غير صالح)، تبقى `authInfo` بقيمة `undefined`
ويتابع الحل عبر سلسلة `meta`/متغير البيئة الحالية دون تغيير. لا يغيّر هذا الإعداد الافتراضي
لـ `OMNIROUTE_MCP_ENFORCE_SCOPES` — فلا يزال يلزم تمكين الإنفاذ صراحةً؛ ولا يفعل هذا التغيير سوى
إعطاء مسار كل مفتاح الأولوية بمجرد تمكينه. لا يتضمن stdio هوية خاصة بكل متصل (راجع
`mcpCallerIdentity.ts`) ولا يتأثر — إذ يظل معتمدًا على سلسلة القيم الاحتياطية `_meta`/متغير البيئة.

---

## متغيرات البيئة

| المتغير                                 | القيمة الافتراضية                         | الغرض                                                                                                          |
| :-------------------------------------- | :---------------------------------------- | :------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_BASE_URL`                    | `http://localhost:20128`                  | عنوان URL الأساسي الذي يستخدمه خادم MCP عند استدعاء واجهات API الداخلية لـ OmniRoute                           |
| `OMNIROUTE_API_KEY`                     | (فارغ)                                    | مفتاح API يُمرَّر بصيغة `Authorization: Bearer` إلى استدعاءات API الداخلية                                     |
| `OMNIROUTE_MCP_ENFORCE_SCOPES`          | `false` (لا يؤدي إلى تفعيله سوى `"true"`) | عند التفعيل، يؤدي غياب النطاقات إلى رفض استدعاءات الأدوات وتسجيل `scope_denied:<reason>` في سجل التدقيق        |
| `OMNIROUTE_MCP_SCOPES`                  | (فارغ)                                    | قائمة نطاقات مسموح بها مفصولة بفواصل وتُعد «متاحة» افتراضيًا (تُستخدم عندما لا يوفّر المستدعي نطاقاته الخاصة)  |
| `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS`   | (غير معيّن = مفعّل)                       | عند ضبطه على `0/false/off/no`، يعطّل ضغط أوصاف MCP وقت التسجيل                                                 |
| `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION` | (غير معيّن = مفعّل)                       | اسم بديل للمفتاح نفسه المذكور أعلاه                                                                            |
| `OMNIROUTE_MCP_FETCH_TIMEOUT_MS`        | `10000`                                   | المهلة الزمنية قبل الإلغاء لعمليات القراءة الإدارية الداخلية (الصحة، والمرونة، والتركيبات، والحصة، والاستخدام) |
| `OMNIROUTE_MCP_UPSTREAM_TIMEOUT_MS`     | `60000`                                   | المهلة الزمنية قبل الإلغاء للخطوات التي تنتظر موفّرًا (`route_request`، و`web_search`، و`web_fetch`)           |
| `MCP_TOOL_DENY`                         | (غير معيّن = بلا تصفية)                   | أسماء الأدوات المفصولة بفواصل والمطلوب إسقاطها من `tools/list` (تقليل عدد الأدوات — انظر أدناه)                |
| `MCP_TOOL_ALLOW`                        | (غير معيّن = بلا تصفية)                   | أسماء الأدوات المفصولة بفواصل والمطلوب الاحتفاظ بها حصريًا (وضع قائمة السماح — انظر أدناه)                     |
| `DATA_DIR`                              | `~/.omniroute`                            | يُكتب ملف نبض الحياة في `${DATA_DIR}/runtime/mcp-heartbeat.json`                                               |

---

## ضغط الأوصاف

يمكن لسجلات أدوات MCP والمطالبات والموارد ضغط الأوصاف وقت التسجيل/العرض لتقليل حجم بيانات التعريف المعروضة للعملاء (وبالتالي تكلفة سياق المطالبة). يوجد التنفيذ في `open-sse/mcp-server/descriptionCompressor.ts`، وهو موصول بخادم MCP عبر `compressMcpRegistryMetadata` داخل `createMcpServer()`.

- يُطبَّق الضغط على نص الوصف باستخدام مجموعة قواعد Caveman (`getRulesForContext("all", "full")`) مع استخراج الكتل المحفوظة (مقاطع التعليمات البرمجية، والكتل المسيّجة، وما إلى ذلك) بحيث لا يتغير المحتوى البنيوي.
- يمكن تبديله لكل عملية نشر عبر القيمة `compression.mcpDescriptionCompressionEnabled` في جدول إعدادات `key_value` (الافتراضي: مفعّل) — ويظهر في واجهة المستخدم باسم **التحليلات → ضغط أوصاف MCP**.
- يمكن تبديله على مستوى العملية بالكامل عبر `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS=false` أو `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION=false`.
- تُعرض الإحصاءات الآنية عبر `omniroute_compression_status` ضمن `analytics.mcpDescriptionCompression`، وتُوسم بـ `source: "mcp_metadata_estimate"` لتمييزها عن إيصالات الاستخدام الفعلية للموفّرين.

---

## تقليل عدد الأدوات (F4.3)

يقلّص ضغط الأوصاف البيانات الوصفية لكل أداة؛ أما **تقليل عدد الأدوات** فيذهب خطوة أبعد عبر تقليل _عدد_ الأدوات المُعلَن عنها أصلًا. يؤدي الإعلان عن عدد أقل من الأدوات في بيان `tools/list` إلى خفض تكلفة الرموز لكل طلب التي يتحملها نموذج العميل مقابل فهرس الأدوات (ضغط «الطبقة 5»). التنفيذ عبارة عن عامل تصفية صرف وعديم الحالة في `open-sse/mcp-server/toolCardinality.ts` ‏(`reduceToolManifest`)، وهو مدمج في حلقة التسجيل داخل `createMcpServer()` ‏(`open-sse/mcp-server/server.ts`).

**ميزة اختيارية، ومعطّلة افتراضيًا.** لا يعمل عامل التصفية إلا عند تعيين واحد على الأقل من متغيري البيئة؛ وعند عدم تعيين أي منهما، يُعلَن عن جميع الأدوات البالغ عددها 110 دون تغيير.

| المتغير          | الوضع                                                                                       |
| :--------------- | :------------------------------------------------------------------------------------------ |
| `MCP_TOOL_DENY`  | قائمة حظر — أسماء أدوات مفصولة بفواصل تُحذف دائمًا من `tools/list`                          |
| `MCP_TOOL_ALLOW` | قائمة سماح — أسماء أدوات مفصولة بفواصل؛ لا يبقى سوى هذه الأدوات، وتُحذف جميع الأدوات الأخرى |

تأخذ `deny` الأولوية على `allow`. تكون الأسماء مفصولة بفواصل، وتُزال المسافات البيضاء المحيطة بها، وتُتجاهل الإدخالات الفارغة. أمثلة:

```bash
# حذف أداتين من الفهرس
MCP_TOOL_DENY="omniroute_get_health,omniroute_list_combos" omniroute --mcp

# الإعلان عن أدوات التوجيه والحصص فقط (وضع قائمة السماح)
MCP_TOOL_ALLOW="omniroute_route_request,omniroute_check_quota" omniroute --mcp
```

**كيفية إزالة الأدوات المُرشَّحة:** ينجح التسجيل دائمًا؛ ثم تُستدعى `.disable()` على معالج MCP SDK للأداة التي يرفضها ملف التعريف، ولذلك لا تظهر مطلقًا في `tools/list` مع بقاء التوصيلات سليمة (تمكين/تعطيل منظّم، دون إعادة تسجيل). محلل ملف التعريف هو `readMcpToolProfileFromEnv(process.env)`، ويُرجع `null` (بلا تصفية) عندما يكون كلا المتغيرين فارغًا.

يدعم أيضًا الشكل الأكثر ثراءً `ToolProfile` الذي تستند إليه `reduceToolManifest` التصفية بتقاطع النطاقات (`allowScopes`، مع مطابقة أحرف البدل من نمط `read:*`) وحدًا أقصى حتميًا `maxTools`، لكن هذين الخيارين يحتاجان إلى البيان الكامل وقت التسجيل، وهما **غير** متاحين حاليًا عبر متغيرات البيئة (هناك متابعة مسجّلة لإضافة نقطة ربط على مستوى `tools/list`). تتوفر `estimateManifestTokens()` لمقارنة تكلفة رموز البيان قبل التقليل وبعده.

---

## نبض تشغيل وقت التنفيذ

يحفظ نقل stdio حالة النشاط في `${DATA_DIR}/runtime/mcp-heartbeat.json` كل 5 ثوانٍ. تقرأ لوحة المعلومات (`/api/mcp/status`) هذا الملف إلى جانب حالة نشاط PID لاستنتاج قيمة `online`. أما عمليات نقل HTTP فتُبلغ عن الحالة من `getMcpHttpStatus()` داخل العملية بدلًا من ذلك (دون كتابة ملف).

تحتوي لقطة نبض التشغيل على:

```json
{
  "pid": 12345,
  "startedAt": "2026-05-13T12:34:56.000Z",
  "lastHeartbeatAt": "2026-05-13T12:35:01.000Z",
  "version": "1.8.1",
  "transport": "stdio",
  "scopesEnforced": false,
  "allowedScopes": [],
  "toolCount": 110
}
```

---

## تسجيل التدقيق

تُسجَّل كل عملية استدعاء لأداة في جدول SQLite ‏`mcp_tool_audit` بواسطة `open-sse/mcp-server/audit.ts`:

- اسم الأداة، والوسائط (مجزّأة/مقتطعة وفقًا لقيمة `auditLevel` الخاصة بكل أداة)، والنتيجة
- المدة بالمللي ثانية، وعلامة النجاح/الفشل، ورسالة الخطأ (عند انطباق ذلك)
- تجزئة مفتاح API، والطابع الزمني
- تُسجَّل حالات رفض النطاق بصيغة `scope_denied:<reason>` مع قائمة النطاقات المفقودة

استخدم لوحة المعلومات أو نقطتي نهاية REST ‏`/api/mcp/audit` و`/api/mcp/audit/stats` لفحص الاستدعاءات الحديثة.

---

## الملفات

| الملف                                                                    | الغرض                                                                  |
| :----------------------------------------------------------------------- | :--------------------------------------------------------------------- |
| `open-sse/mcp-server/server.ts`                                          | مصنع خادم MCP، ونقطة دخول stdio، وتسجيلات الأدوات محددة النطاق         |
| `open-sse/mcp-server/httpTransport.ts`                                   | نقل SSE + Streamable HTTP (إدارة الجلسات)                              |
| `open-sse/mcp-server/scopeEnforcement.ts`                                | تقييم نطاق الأدوات وتحديد هوية المستدعي                                |
| `open-sse/mcp-server/audit.ts`                                           | تسجيل تدقيق استدعاءات الأدوات (`mcp_tool_audit`)                       |
| `open-sse/mcp-server/runtimeHeartbeat.ts`                                | كاتب نبضات stdio (`mcp-heartbeat.json`)                                |
| `open-sse/mcp-server/descriptionCompressor.ts`                           | ضغط الأوصاف لسجلات الأدوات / المطالبات / الموارد                       |
| `open-sse/mcp-server/schemas/tools.ts`                                   | مخططات Zod + سجل الأدوات (`MCP_TOOLS`، 45 إدخالًا)                     |
| `open-sse/mcp-server/tools/advancedTools.ts`                             | معالجات أدوات المرحلة 2 + ذاكرة التخزين المؤقت + 1proxy                |
| `open-sse/mcp-server/tools/compressionTools.ts`                          | معالجات أدوات الضغط                                                    |
| `open-sse/mcp-server/tools/memoryTools.ts`                               | تعريفات أدوات الذاكرة (3 أدوات)                                        |
| `open-sse/mcp-server/tools/skillTools.ts`                                | تعريفات أدوات المهارات (4 أدوات)                                       |
| `open-sse/mcp-server/tools/notionTools.ts`                               | تعريفات أدوات مصدر سياق Notion (6 أدوات)                               |
| `open-sse/mcp-server/tools/gamificationTools.ts`                         | تعريفات أدوات التلعيب (8 أدوات)                                        |
| `open-sse/mcp-server/tools/pluginTools.ts`                               | أدوات تسجيل المكونات الإضافية وإدارتها (8 أدوات)                       |
| `src/app/api/mcp/status/route.ts`                                        | نقطة نهاية `/api/mcp/status`                                           |
| `src/app/api/mcp/tools/route.ts`                                         | نقطة نهاية `/api/mcp/tools`                                            |
| `src/app/api/mcp/sse/route.ts`                                           | مسار نقل SSE ‏`/api/mcp/sse`                                           |
| `src/app/api/mcp/stream/route.ts`                                        | مسار نقل Streamable HTTP ‏`/api/mcp/stream`                            |
| `src/app/api/mcp/audit/route.ts`                                         | استعلام سجل التدقيق `/api/mcp/audit`                                   |
| `src/app/api/mcp/audit/stats/route.ts`                                   | مقاييس التدقيق المجمعة `/api/mcp/audit/stats`                          |
| `src/lib/notion/api.ts`                                                  | عميل Notion REST API (إعادة المحاولة، والمهلة الزمنية، وتصنيف الأخطاء) |
| `src/lib/db/notion.ts`                                                   | استمرارية رمز Notion المميز (جدول `key_value`)                         |
| `src/app/api/settings/notion/route.ts`                                   | واجهة API لإعدادات Notion ‏(GET/POST/DELETE)                           |
| `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx` | واجهة مستخدم لإدارة رمز Notion المميز                                  |
| `tests/unit/notion-api.test.ts`                                          | اختبارات عميل Notion API ‏(7)                                          |
| `tests/unit/notion-tools.test.ts`                                        | اختبارات فرض نطاق أدوات Notion ‏(10)                                   |
| `tests/unit/db/notion.test.mjs`                                          | اختبارات وحدة قاعدة بيانات Notion ‏(3)                                 |
