# Delegated Context Editing (Anthropic) (العربية)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/CONTEXT_EDITING.md) · 🇪🇹 [am](../../../am/docs/compression/CONTEXT_EDITING.md) · 🇦🇿 [az](../../../az/docs/compression/CONTEXT_EDITING.md) · 🇧🇬 [bg](../../../bg/docs/compression/CONTEXT_EDITING.md) · 🇧🇩 [bn](../../../bn/docs/compression/CONTEXT_EDITING.md) · 🇨🇿 [cs](../../../cs/docs/compression/CONTEXT_EDITING.md) · 🇩🇰 [da](../../../da/docs/compression/CONTEXT_EDITING.md) · 🇩🇪 [de](../../../de/docs/compression/CONTEXT_EDITING.md) · 🇬🇷 [el](../../../el/docs/compression/CONTEXT_EDITING.md) · 🇪🇸 [es](../../../es/docs/compression/CONTEXT_EDITING.md) · 🇪🇪 [et](../../../et/docs/compression/CONTEXT_EDITING.md) · 🇮🇷 [fa](../../../fa/docs/compression/CONTEXT_EDITING.md) · 🇫🇮 [fi](../../../fi/docs/compression/CONTEXT_EDITING.md) · 🇫🇷 [fr](../../../fr/docs/compression/CONTEXT_EDITING.md) · 🇮🇪 [ga](../../../ga/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [gu](../../../gu/docs/compression/CONTEXT_EDITING.md) · 🇳🇬 [ha](../../../ha/docs/compression/CONTEXT_EDITING.md) · 🇮🇱 [he](../../../he/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [hi](../../../hi/docs/compression/CONTEXT_EDITING.md) · 🇭🇷 [hr](../../../hr/docs/compression/CONTEXT_EDITING.md) · 🇭🇺 [hu](../../../hu/docs/compression/CONTEXT_EDITING.md) · 🇦🇲 [hy](../../../hy/docs/compression/CONTEXT_EDITING.md) · 🇮🇩 [id](../../../id/docs/compression/CONTEXT_EDITING.md) · 🇳🇬 [ig](../../../ig/docs/compression/CONTEXT_EDITING.md) · 🇮🇹 [it](../../../it/docs/compression/CONTEXT_EDITING.md) · 🇯🇵 [ja](../../../ja/docs/compression/CONTEXT_EDITING.md) · 🇬🇪 [ka](../../../ka/docs/compression/CONTEXT_EDITING.md) · 🇰🇭 [km](../../../km/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [kn](../../../kn/docs/compression/CONTEXT_EDITING.md) · 🇰🇷 [ko](../../../ko/docs/compression/CONTEXT_EDITING.md) · 🇱🇹 [lt](../../../lt/docs/compression/CONTEXT_EDITING.md) · 🇱🇻 [lv](../../../lv/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [ml](../../../ml/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [mr](../../../mr/docs/compression/CONTEXT_EDITING.md) · 🇲🇾 [ms](../../../ms/docs/compression/CONTEXT_EDITING.md) · 🇲🇹 [mt](../../../mt/docs/compression/CONTEXT_EDITING.md) · 🇲🇲 [my](../../../my/docs/compression/CONTEXT_EDITING.md) · 🇳🇵 [ne](../../../ne/docs/compression/CONTEXT_EDITING.md) · 🇳🇱 [nl](../../../nl/docs/compression/CONTEXT_EDITING.md) · 🇳🇴 [no](../../../no/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [or](../../../or/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [pa](../../../pa/docs/compression/CONTEXT_EDITING.md) · 🇵🇭 [phi](../../../phi/docs/compression/CONTEXT_EDITING.md) · 🇵🇱 [pl](../../../pl/docs/compression/CONTEXT_EDITING.md) · 🇵🇹 [pt](../../../pt/docs/compression/CONTEXT_EDITING.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/CONTEXT_EDITING.md) · 🇷🇴 [ro](../../../ro/docs/compression/CONTEXT_EDITING.md) · 🇷🇺 [ru](../../../ru/docs/compression/CONTEXT_EDITING.md) · 🇱🇰 [si](../../../si/docs/compression/CONTEXT_EDITING.md) · 🇸🇰 [sk](../../../sk/docs/compression/CONTEXT_EDITING.md) · 🇸🇮 [sl](../../../sl/docs/compression/CONTEXT_EDITING.md) · 🇷🇸 [sr](../../../sr/docs/compression/CONTEXT_EDITING.md) · 🇸🇪 [sv](../../../sv/docs/compression/CONTEXT_EDITING.md) · 🇰🇪 [sw](../../../sw/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [ta](../../../ta/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [te](../../../te/docs/compression/CONTEXT_EDITING.md) · 🇹🇭 [th](../../../th/docs/compression/CONTEXT_EDITING.md) · 🇹🇷 [tr](../../../tr/docs/compression/CONTEXT_EDITING.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/CONTEXT_EDITING.md) · 🇵🇰 [ur](../../../ur/docs/compression/CONTEXT_EDITING.md) · 🇺🇿 [uz](../../../uz/docs/compression/CONTEXT_EDITING.md) · 🇻🇳 [vi](../../../vi/docs/compression/CONTEXT_EDITING.md) · 🇳🇬 [yo](../../../yo/docs/compression/CONTEXT_EDITING.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/CONTEXT_EDITING.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/CONTEXT_EDITING.md)

---

يُعد **تحرير السياق** المفوَّض ميزةً لإدارة السياق خاصةً بـ Claude فقط. وعلى عكس محركات الضغط المحلية في OmniRoute
‏(Caveman وRTK وLLMLingua وخطوط المعالجة المتراكبة) — التي تعيد كتابة نص الطلب
_قبل_ مغادرته الوكيل — يطلب تحرير السياق من **المزوّد** إزالة كتل استخدام الأدوات / نتائج الأدوات القديمة
من نافذة السياق الجارية لديه. لا يفعل OmniRoute سوى إرفاق معلمة في النص
(`context_management.edits[]`)؛ بينما ينفّذ Claude عملية الإزالة الفعلية وفقًا لمجزّئ الرموز الخاص به.

هذه إمكانية مفوَّضة بطبيعتها: إذ يرفض المزوّدون الآخرون هذه المعلمة، لذلك يقصرها OmniRoute
بشكل صارم على Claude والمرحّلات المتوافقة مع Claude Code.

المصدر المرجعي: `open-sse/config/contextEditing.ts` (معرّفات الاستراتيجيات، وإدراج النص، واستخراج بيانات
القياس عن بُعد)، و`open-sse/executors/base.ts` (بوابة الإدراج + الإجراء الاحتياطي عند الخطأ 400)، و
`open-sse/services/compression/types.ts` (بنية الإعدادات + القيمة الافتراضية).

## ما الذي يفعله `clear_tool_uses`

يدرِج OmniRoute تعديلاً واحدًا في نص Anthropic Messages الصادر:

```json
{
  "context_management": {
    "edits": [
      {
        "type": "clear_tool_uses_20250919",
        "trigger": { "type": "input_tokens", "value": 100000 },
        "keep": { "type": "tool_uses", "value": 3 }
      }
    ]
  }
}
```

- `type: "clear_tool_uses_20250919"` — معرّف استراتيجية Anthropic المؤرَّخ (`CLEAR_TOOL_USES_STRATEGY`).
- `trigger.value: 100000` — بمجرد تجاوز رموز إدخال الطلب لهذه العتبة، يبدأ Claude
  بإزالة أزواج استخدام الأدوات/نتائجها القديمة (`CONTEXT_EDITING_DEFAULT_TRIGGER_TOKENS`، القيمة الافتراضية لدى Anthropic).
- `keep.value: 3` — يُحتفظ بأحدث N أزواج من استخدام الأدوات/نتائجها دون تعديل
  (`CONTEXT_EDITING_DEFAULT_KEEP_TOOL_USES`).

يُعلن عن الإصدار التجريبي عبر الترويسة `anthropic-beta: context-management-2025-06-27`، التي
يرسلها OmniRoute بالفعل مع طلبات Claude.

تُنفَّذ عملية الإدراج بواسطة `applyContextEditingToBody()`، وهي **متكررة آمنة**: إذا كان تعديل `clear_tool_uses`
موجودًا بالفعل في النص (أضافه استدعاء سابق أو قدّمه العميل)، فيُترك النص
كما هو. وإذا كان تعديل `clear_thinking_20251015` موجودًا أيضًا، فإن OmniRoute يرتّب تعديل
`clear_thinking` ترتيبًا مستقرًا في المقدمة، لأن Anthropic تشترط أن يسبق `clear_thinking`
‏`clear_tool_uses` في مصفوفة `edits[]`.

## مفتاح التفعيل لكل تركيبة

يكون تحرير السياق **معطّلًا افتراضيًا** ويتطلب تفعيلًا صريحًا. المفتاح عبارة عن قيمة منطقية واحدة مضمنة في
إعدادات الضغط:

- مفتاح الإعداد: `contextEditing.enabled` (بصيغة camelCase — **وليس** `context_editing` / `context-editing`).
- النوع: `ContextEditingConfig { enabled: boolean }` في
  `open-sse/services/compression/types.ts`.
- القيمة الافتراضية: `DEFAULT_CONTEXT_EDITING_CONFIG = { enabled: false }`.
- مخطط Zod: ‏`contextEditingConfigSchema` في `src/shared/validation/compressionConfigSchemas.ts`.
- التخزين: يُحفَظ مع بقية إعدادات الضغط (بعد التطبيع في
  `src/lib/db/compression.ts`).

في لوحة المعلومات، يوجد المفتاح في مركز الضغط
(`src/app/(dashboard)/dashboard/context/combos/CompressionHub.tsx`) ويكتب
`{ contextEditing: { enabled: … } }` مجددًا عبر `saveSettings()`. ونظرًا إلى أنه يُنقل ضمن
كائن إعدادات الضغط، فإنه يتكامل مع ملف تعريف الضغط الخاص بكل تركيبة بدلًا من أن يكون
واجهة مستقلة تمامًا — إذ لا تحمل الإعدادات سوى علامة التشغيل/الإيقاف؛ أما جميع العتبات (`trigger`،
`keep`) فهي الثوابت الموثّقة أعلاه.

## التقييد على Claude فقط

لا يحدث الحقن إلا مع Claude الحقيقي أو المرحّلات المتوافقة مع Claude Code. شرط التقييد في
`open-sse/executors/base.ts` هو:

```ts
if (
  (this.provider === "claude" || isClaudeCodeCompatible(this.provider)) &&
  contextEditing?.enabled &&
  !contextEditingDisabled
) {
  applyContextEditingToBody(transformedBody, { enabled: true });
}
```

- `this.provider === "claude"` — مفتاح Anthropic حقيقي أو OAuth.
- `isClaudeCodeCompatible(this.provider)` — المرحّلات التي يبدأ معرّف المزوّد الخاص بها بالبادئة
  `anthropic-compatible-cc-` (فهي تعلن توافقها مع Claude Code، ولذلك تُعدّ المرحّلات
  الأرجح قبولًا للإصدار التجريبي). راجع `open-sse/services/provider.ts`.

المستبعَد عمدًا:

- `claude-web` — مرحّل عبر المتصفح يستخدم بنية طلب `create_conversation_params` ولا يرى
  `context_management` مطلقًا.
- مرحّلات `anthropic-compatible-*` العامة (من دون البادئة `-cc-`) — نقاط نهاية تابعة لجهات خارجية
  ذات دعم غير مؤكّد للإصدار التجريبي.

لا تتلقى المزوّدات غير التابعة لـ Claude المعلَمة `context_management` مطلقًا، حتى عندما يكون المفتاح مفعّلًا.

## التراجع عند 400 / تغطية المرحّلات

قد يعلن مرحّل متوافق مع Claude دعمه للإصدار التجريبي، لكنه يرفض مع ذلك المعلَمة `context_management`
باستجابة HTTP 400. وللتدهور بسلاسة بدلًا من إفشال الطلب، يزيل المنفّذ
المعلَمة ويعيد محاولة عنوان URL نفسه **مرة واحدة**:

```ts
if (
  response.status === HTTP_STATUS.BAD_REQUEST &&
  contextEditing?.enabled &&
  !contextEditingDisabled &&
  transformedBody?.context_management !== undefined
) {
  const errText = await response
    .clone()
    .text()
    .catch(() => "");
  if (/context[_-]management|context editing/i.test(errText)) {
    contextEditingDisabled = true;
    delete transformedBody.context_management;
    let retryBody = JSON.stringify(transformedBody);
    if (isClaudeCodeCompatible(this.provider) || this.provider === "claude") {
      retryBody = await signRequestBody(retryBody);
    }
    response = await fetch(url, { ...fetchOptions, body: retryBody });
  }
}
```

السلوك:

1. لا يُفعّل إلا عند استجابة `400` بينما يكون تحرير السياق مفعّلًا ويحمل جسم الطلب فعليًا
   `context_management`.
2. يُقرأ جسم استجابة 400 عبر `clone()` حتى تظل الاستجابة الأصلية سليمة للمسار غير المطابق.
3. يجب أن يطابق نص الخطأ `/context[_-]management|context editing/i` — أما استجابة 400 غير ذات صلة (مثل
   `max_tokens must be >= 1`) فلا **تُفعّل** التراجع؛ بل ينتشر الخطأ الأصلي.
4. عند وجود تطابق، يضبط `contextEditingDisabled = true` (ما يمنع إعادة الحقن إذا أُنشئ لاحقًا
   `transformedBody` جديد لإعادة المحاولة أو لعنوان URL احتياطي)، ويحذف `context_management`،
   ثم يعيد توقيع الجسم لمرحّلات Claude / المرحّلات المتوافقة مع Claude Code (`signRequestBody`)، ويعيد محاولة
   عنوان URL نفسه مرة واحدة.

يحمل Claude الحقيقي الإصدار التجريبي في `ANTHROPIC_BETA_BASE` ولا يدخل مسار التراجع هذا.

## بيانات القياس عن بُعد لـ `applied_edits`

بعد استجابة Claude، يسجّل OmniRoute مقدار السياق الذي مسحه المزوّد فعليًا. هذه البيانات
**لا تُبث** — بل تُستخرج من جسم الاستجابة غير المتدفقة وفق مبدأ بذل أفضل جهد، ولا
تؤثر أبدًا في الاستجابة (يتم تجاهل إخفاقات القياس عن بُعد).

- الاستخراج: `extractContextEditingTelemetry(responseBody)` في `open-sse/config/contextEditing.ts`.
  وهو يبحث عن `applied_edits` في ثلاثة مواضع (تحوّطًا لاختلاف بنية الاستجابة):
  - `context_management.applied_edits`
  - `usage.context_management.applied_edits`
  - `usage.applied_edits`
- حقول كل تعديل التي تُقرأ من كل إدخال: `cleared_input_tokens` و`cleared_tool_uses`
  (بصيغة snake_case الأصلية لدى Anthropic)، مع استخدام `clearedInputTokens` / `clearedToolUses` بصيغة camelCase كخيارات احتياطية.
- يعيد `null` عند عدم العثور على مصفوفة `applied_edits` أو عند عدم مسح أي شيء فعليًا.

بنية الإيصال هي `ContextEditingTelemetry { editCount, clearedInputTokens, clearedToolUses }`.
يحدث التسجيل في `open-sse/handlers/chatCore.ts` (مقيّدًا بشرط `provider === "claude"`) عبر
`recordContextEditingTelemetry()` (`src/lib/db/compressionAnalytics.ts`)، الذي يكتب صفًا لتحليلات الضغط موسومًا بما يلي:

- `mode: "context-editing"`
- `engine: "context-editing"`
- `tokens_saved` / `original_tokens` = عدد رموز الإدخال التي تم مسحها
- `request_id` ملحوقًا بـ `::context-editing`

وبذلك يظهر المسح المفوّض في تحليلات الضغط إلى جانب المحركات المحلية، تحت تسمية المحرك
`context-editing`، ويمكن تمييزه عن الوفورات الناتجة عن RTK/Caveman/LLMLingua.

## العلاقة بمحركات الضغط المحلية

| الجانب         | المحركات المحلية (Caveman / RTK / LLMLingua / المكدّسة) | تحرير السياق المفوّض                                              |
| -------------- | ------------------------------------------------------- | ----------------------------------------------------------------- |
| مكان التشغيل   | داخل OmniRoute، قبل أن يغادر الطلب الوكيل               | لدى المزوّد (Claude)، على جانب الخادم                             |
| ما يتم تعديله  | نص المطالبة / السياق / نتيجة الأداة                     | كتل استخدام الأدوات / نتائج الأدوات القديمة                       |
| نطاق المزوّد   | جميع المزوّدين                                          | `claude` + `anthropic-compatible-cc-*` فقط                        |
| مفتاح التفعيل  | إعدادات وضع الضغط                                       | `contextEditing.enabled`                                          |
| وضع الفشل      | الاستمرار عند الفشل (النص الأصلي)                       | إجراء احتياطي عند 400: إزالة المعامل، ثم إعادة المحاولة مرة واحدة |
| قياسات التوفير | `engine: <engine id>`                                   | `engine: "context-editing"`                                       |

النهجان متكاملان: تضغط المحركات المحلية وحدات البايت التي يرسلها OmniRoute؛ بينما يتيح تحرير السياق
لـ Claude تقليص السياق الجاري عبر الأدوار. ويمكن تفعيلهما معًا.

## انظر أيضًا

- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — سجل المحركات ومحركات الضغط
  المحلية
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — ضغط مخرجات الأوامر/الأدوات
- [../frameworks/MCP-SERVER.md](../frameworks/MCP-SERVER.md) — ضغط أوصاف MCP وتقليل
  عدد الأدوات
- المصدر: `open-sse/config/contextEditing.ts`، `open-sse/executors/base.ts`،
  `open-sse/services/compression/types.ts`، `src/lib/db/compressionAnalytics.ts`
