# Delegated Context Editing (Anthropic) (فارسی)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/CONTEXT_EDITING.md) · 🇪🇹 [am](../../../am/docs/compression/CONTEXT_EDITING.md) · 🇸🇦 [ar](../../../ar/docs/compression/CONTEXT_EDITING.md) · 🇦🇿 [az](../../../az/docs/compression/CONTEXT_EDITING.md) · 🇧🇬 [bg](../../../bg/docs/compression/CONTEXT_EDITING.md) · 🇧🇩 [bn](../../../bn/docs/compression/CONTEXT_EDITING.md) · 🇨🇿 [cs](../../../cs/docs/compression/CONTEXT_EDITING.md) · 🇩🇰 [da](../../../da/docs/compression/CONTEXT_EDITING.md) · 🇩🇪 [de](../../../de/docs/compression/CONTEXT_EDITING.md) · 🇬🇷 [el](../../../el/docs/compression/CONTEXT_EDITING.md) · 🇪🇸 [es](../../../es/docs/compression/CONTEXT_EDITING.md) · 🇪🇪 [et](../../../et/docs/compression/CONTEXT_EDITING.md) · 🇫🇮 [fi](../../../fi/docs/compression/CONTEXT_EDITING.md) · 🇫🇷 [fr](../../../fr/docs/compression/CONTEXT_EDITING.md) · 🇮🇪 [ga](../../../ga/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [gu](../../../gu/docs/compression/CONTEXT_EDITING.md) · 🇳🇬 [ha](../../../ha/docs/compression/CONTEXT_EDITING.md) · 🇮🇱 [he](../../../he/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [hi](../../../hi/docs/compression/CONTEXT_EDITING.md) · 🇭🇷 [hr](../../../hr/docs/compression/CONTEXT_EDITING.md) · 🇭🇺 [hu](../../../hu/docs/compression/CONTEXT_EDITING.md) · 🇦🇲 [hy](../../../hy/docs/compression/CONTEXT_EDITING.md) · 🇮🇩 [id](../../../id/docs/compression/CONTEXT_EDITING.md) · 🇳🇬 [ig](../../../ig/docs/compression/CONTEXT_EDITING.md) · 🇮🇹 [it](../../../it/docs/compression/CONTEXT_EDITING.md) · 🇯🇵 [ja](../../../ja/docs/compression/CONTEXT_EDITING.md) · 🇬🇪 [ka](../../../ka/docs/compression/CONTEXT_EDITING.md) · 🇰🇭 [km](../../../km/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [kn](../../../kn/docs/compression/CONTEXT_EDITING.md) · 🇰🇷 [ko](../../../ko/docs/compression/CONTEXT_EDITING.md) · 🇱🇹 [lt](../../../lt/docs/compression/CONTEXT_EDITING.md) · 🇱🇻 [lv](../../../lv/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [ml](../../../ml/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [mr](../../../mr/docs/compression/CONTEXT_EDITING.md) · 🇲🇾 [ms](../../../ms/docs/compression/CONTEXT_EDITING.md) · 🇲🇹 [mt](../../../mt/docs/compression/CONTEXT_EDITING.md) · 🇲🇲 [my](../../../my/docs/compression/CONTEXT_EDITING.md) · 🇳🇵 [ne](../../../ne/docs/compression/CONTEXT_EDITING.md) · 🇳🇱 [nl](../../../nl/docs/compression/CONTEXT_EDITING.md) · 🇳🇴 [no](../../../no/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [or](../../../or/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [pa](../../../pa/docs/compression/CONTEXT_EDITING.md) · 🇵🇭 [phi](../../../phi/docs/compression/CONTEXT_EDITING.md) · 🇵🇱 [pl](../../../pl/docs/compression/CONTEXT_EDITING.md) · 🇵🇹 [pt](../../../pt/docs/compression/CONTEXT_EDITING.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/CONTEXT_EDITING.md) · 🇷🇴 [ro](../../../ro/docs/compression/CONTEXT_EDITING.md) · 🇷🇺 [ru](../../../ru/docs/compression/CONTEXT_EDITING.md) · 🇱🇰 [si](../../../si/docs/compression/CONTEXT_EDITING.md) · 🇸🇰 [sk](../../../sk/docs/compression/CONTEXT_EDITING.md) · 🇸🇮 [sl](../../../sl/docs/compression/CONTEXT_EDITING.md) · 🇷🇸 [sr](../../../sr/docs/compression/CONTEXT_EDITING.md) · 🇸🇪 [sv](../../../sv/docs/compression/CONTEXT_EDITING.md) · 🇰🇪 [sw](../../../sw/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [ta](../../../ta/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [te](../../../te/docs/compression/CONTEXT_EDITING.md) · 🇹🇭 [th](../../../th/docs/compression/CONTEXT_EDITING.md) · 🇹🇷 [tr](../../../tr/docs/compression/CONTEXT_EDITING.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/CONTEXT_EDITING.md) · 🇵🇰 [ur](../../../ur/docs/compression/CONTEXT_EDITING.md) · 🇺🇿 [uz](../../../uz/docs/compression/CONTEXT_EDITING.md) · 🇻🇳 [vi](../../../vi/docs/compression/CONTEXT_EDITING.md) · 🇳🇬 [yo](../../../yo/docs/compression/CONTEXT_EDITING.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/CONTEXT_EDITING.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/CONTEXT_EDITING.md)

---

**ویرایش زمینه** واگذارشده قابلیتی برای مدیریت زمینه است که فقط به Claude اختصاص دارد. برخلاف موتورهای فشردهسازی محلی OmniRoute
‏(Caveman، RTK، LLMLingua و خطلولههای پشتهای) — که بدنه درخواست را _پیش از_ خروج از پراکسی بازنویسی
میکنند — «ویرایش زمینه» از **ارائهدهنده** میخواهد بلوکهای قدیمی مربوط به استفاده از ابزار / نتیجه ابزار را
از پنجره زمینه در حال اجرای خودش پاک کند. OmniRoute فقط یک پارامتر بدنه
(`context_management.edits[]`) اضافه میکند؛ پاکسازی واقعی را Claude بر اساس توکنایزر خودش انجام میدهد.

این قابلیت ذاتاً واگذارشده است: سایر ارائهدهندگان این پارامتر را رد میکنند، بنابراین OmniRoute دامنه آن را
صرفاً به Claude و رلههای سازگار با Claude Code محدود میکند.

منبع حقیقت: `open-sse/config/contextEditing.ts` (شناسههای راهبرد، تزریق در بدنه، استخراج
تلهمتری)، `open-sse/executors/base.ts` (دروازه تزریق + بازگشت جایگزین در خطای 400)، و
`open-sse/services/compression/types.ts` (ساختار پیکربندی + مقدار پیشفرض).

## عملکرد `clear_tool_uses`

OmniRoute یک ویرایش واحد را به بدنه خروجی Anthropic Messages تزریق میکند:

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

- `type: "clear_tool_uses_20250919"` — شناسه تاریخدار راهبرد Anthropic (`CLEAR_TOOL_USES_STRATEGY`).
- `trigger.value: 100000` — هنگامی که تعداد توکنهای ورودی درخواست از این آستانه فراتر رود، Claude پاکسازی
  جفتهای قدیمی استفاده از ابزار/نتیجه را آغاز میکند (`CONTEXT_EDITING_DEFAULT_TRIGGER_TOKENS`، مقدار پیشفرض Anthropic).
- `keep.value: 3` — تعداد N جفت اخیر استفاده از ابزار/نتیجه بدون تغییر نگه داشته میشوند
  (`CONTEXT_EDITING_DEFAULT_KEEP_TOOL_USES`).

نسخه بتا از طریق هدر `anthropic-beta: context-management-2025-06-27` اعلام میشود که
OmniRoute از قبل آن را در درخواستهای Claude ارسال میکند.

تزریق توسط `applyContextEditingToBody()` انجام میشود و **همتوان** است: اگر یک ویرایش `clear_tool_uses`
از قبل در بدنه وجود داشته باشد (توسط فراخوانی قبلی اضافه شده یا از سوی کلاینت ارسال شده باشد)، بدنه
بدون تغییر باقی میماند. اگر یک ویرایش `clear_thinking_20251015` نیز وجود داشته باشد، OmniRoute ویرایش
`clear_thinking` را بهصورت پایدار به ابتدای آرایه مرتب میکند، زیرا Anthropic الزام میکند که `clear_thinking`
در آرایه `edits[]` پیش از `clear_tool_uses` قرار گیرد.

## کلید فعالسازی برای هر ترکیب

«ویرایش زمینه» بهصورت **پیشفرض غیرفعال** است و باید صراحتاً فعال شود. این کلید یک مقدار بولی واحد است که در
پیکربندی فشردهسازی نگهداری میشود:

- کلید تنظیمات: `contextEditing.enabled` (با شیوه camelCase — **نه** `context_editing` / `context-editing`).
- نوع: `ContextEditingConfig { enabled: boolean }` در
  `open-sse/services/compression/types.ts`.
- مقدار پیشفرض: `DEFAULT_CONTEXT_EDITING_CONFIG = { enabled: false }`.
- طرحواره Zod: `contextEditingConfigSchema` در `src/shared/validation/compressionConfigSchemas.ts`.
- ذخیرهسازی: همراه با سایر تنظیمات فشردهسازی ماندگار میشود (نرمالسازیشده در
  `src/lib/db/compression.ts`).

در داشبورد، این کلید در مرکز فشردهسازی
(`src/app/(dashboard)/dashboard/context/combos/CompressionHub.tsx`) قرار دارد و
`{ contextEditing: { enabled: … } }` را از طریق `saveSettings()` بازنویسی میکند. از آنجا که این گزینه
روی شیء تنظیمات فشردهسازی قرار دارد، بهجای آنکه یک بخش کاملاً مستقل باشد، با پروفایل فشردهسازی هر ترکیب
ادغام میشود — پیکربندی فقط پرچم روشن/خاموش را در خود نگه میدارد؛ تمام آستانهها (`trigger`،
`keep`) همان ثابتهایی هستند که در بالا مستند شدهاند.

## اعمال شرط فقط برای Claude

تزریق فقط برای Claude واقعی یا رلههای سازگار با Claude Code انجام میشود. شرط موجود در
`open-sse/executors/base.ts` به این صورت است:

```ts
if (
  (this.provider === "claude" || isClaudeCodeCompatible(this.provider)) &&
  contextEditing?.enabled &&
  !contextEditingDisabled
) {
  applyContextEditingToBody(transformedBody, { enabled: true });
}
```

- `this.provider === "claude"` — کلید واقعی Anthropic یا OAuth.
- `isClaudeCodeCompatible(this.provider)` — رلههایی که شناسهٔ ارائهدهندهٔ آنها با پیشوند
  `anthropic-compatible-cc-` شروع میشود (این رلهها سازگاری با Claude Code را اعلام میکنند، بنابراین
  بیشترین احتمال پذیرش قابلیت بتا را دارند). به `open-sse/services/provider.ts` مراجعه کنید.

مواردی که عمداً **مستثنا شدهاند**:

- `claude-web` — یک رلهٔ مرورگری با ساختار درخواست `create_conversation_params` که هرگز
  `context_management` را دریافت نمیکند.
- رلههای عمومی `anthropic-compatible-*` (بدون پیشوند `-cc-`) — نقاط پایانی شخص ثالث با
  پشتیبانی نامطمئن از قابلیت بتا.

ارائهدهندگان غیر Claude، حتی زمانی که گزینه فعال است، هرگز پارامتر `context_management` را دریافت نمیکنند.

## پوشش بازگشت جایگزین 400 / رله

ممکن است یک رلهٔ سازگار با Claude قابلیت بتا را اعلام کند، اما همچنان پارامتر `context_management` را
با HTTP 400 رد کند. برای کاهش تدریجی قابلیت بهجای ناموفق کردن درخواست، اجراکننده پارامتر را حذف میکند
و همان URL را **یکبار** دیگر امتحان میکند:

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

رفتار:

1. فقط هنگام وقوع `400`، درحالیکه ویرایش زمینه فعال است و بدنه واقعاً شامل
   `context_management` است، اجرا میشود.
2. بدنهٔ پاسخ 400 از طریق `clone()` خوانده میشود تا پاسخ اصلی برای مسیر بدون تطابق
   دستنخورده باقی بماند.
3. متن خطا باید با `/context[_-]management|context editing/i` مطابقت داشته باشد — یک خطای 400 نامرتبط (برای مثال
   `max_tokens must be >= 1`) بازگشت جایگزین را فعال **نمیکند**؛ خطای اصلی منتشر میشود.
4. در صورت تطابق، `contextEditingDisabled = true` را تنظیم میکند (که اگر بعداً برای یک URL تلاش مجدد/جایگزین،
   `transformedBody` جدیدی ساخته شود، از تزریق مجدد جلوگیری میکند)، `context_management` را حذف میکند،
   بدنه را برای Claude / رلههای سازگار با Claude Code دوباره امضا میکند (`signRequestBody`) و همان
   URL را یکبار دیگر امتحان میکند.

Claude واقعی قابلیت بتا را در `ANTHROPIC_BETA_BASE` حمل میکند و وارد این مسیر بازگشت جایگزین نمیشود.

## تلهمتری `applied_edits`

پس از دریافت پاسخ Claude، OmniRoute میزان زمینهای را که ارائهدهنده واقعاً پاک کرده است ثبت میکند. این داده
**جریانی نیست** — بهصورت بهترینتلاش از بدنهٔ پاسخ غیرجریانی استخراج میشود و هرگز
بر پاسخ تأثیر نمیگذارد (خطاهای تلهمتری نادیده گرفته میشوند).

- استخراج: `extractContextEditingTelemetry(responseBody)` در `open-sse/config/contextEditing.ts`.
  این تابع `applied_edits` را با رویکردی دفاعی نسبت به ساختار پاسخ، در سه محل بررسی میکند:
  - `context_management.applied_edits`
  - `usage.context_management.applied_edits`
  - `usage.applied_edits`
- فیلدهای خواندهشده از هر ورودی ویرایش: `cleared_input_tokens` و `cleared_tool_uses`
  (با قالب snake_case بومی Anthropic)، همراه با جایگزینهای camelCase یعنی `clearedInputTokens` / `clearedToolUses`.
- اگر هیچ آرایهٔ `applied_edits` یافت نشود یا عملاً چیزی پاک نشده باشد، `null` برمیگرداند.

ساختار رسید برابر است با `ContextEditingTelemetry { editCount, clearedInputTokens, clearedToolUses }`.
ثبت در `open-sse/handlers/chatCore.ts` انجام میشود (محدود به `provider === "claude"`) و از
`recordContextEditingTelemetry()` (`src/lib/db/compressionAnalytics.ts`) استفاده میکند که یک ردیف تحلیل فشردهسازی
با برچسبهای زیر مینویسد:

- `mode: "context-editing"`
- `engine: "context-editing"`
- `tokens_saved` / `original_tokens` = تعداد توکنهای ورودی پاکشده
- `request_id` با پسوند `::context-editing`

بنابراین پاکسازی واگذارشده، در کنار موتورهای محلی و تحت برچسب موتور
`context-editing` در تحلیلهای فشردهسازی نمایش داده میشود و از صرفهجوییهای RTK/Caveman/LLMLingua قابل تشخیص است.

## ارتباط با موتورهای فشردهسازی محلی

| جنبه              | موتورهای محلی (Caveman / RTK / LLMLingua / stacked) | ویرایش واگذارشدهٔ زمینه                                    |
| ----------------- | --------------------------------------------------- | ---------------------------------------------------------- |
| محل اجرا          | در OmniRoute، پیش از خروج درخواست از پروکسی         | در ارائهدهنده (Claude)، سمت سرور                           |
| آنچه ویرایش میکند | متن پرامپت / زمینه / نتیجهٔ ابزار                   | بلوکهای قدیمی استفاده از ابزار / نتیجهٔ ابزار              |
| دامنهٔ ارائهدهنده | همهٔ ارائهدهندگان                                   | فقط `claude` + `anthropic-compatible-cc-*`                 |
| کلید فعالسازی     | تنظیمات حالت فشردهسازی                              | `contextEditing.enabled`                                   |
| حالت خرابی        | ادامه در صورت خطا (متن اصلی)                        | بازگشت جایگزین در خطای 400: حذف پارامتر و یک بار تلاش مجدد |
| تلهمتری صرفهجویی  | `engine: <engine id>`                               | `engine: "context-editing"`                                |

این دو مکمل یکدیگرند: موتورهای محلی بایتهایی را که OmniRoute ارسال میکند فشرده میکنند؛ ویرایش زمینه به
Claude اجازه میدهد زمینهٔ در حال اجرا را در طول نوبتها هرس کند. هر دو را میتوان همزمان فعال کرد.

## همچنین ببینید

- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — رجیستری موتورها و موتورهای فشردهسازی
  محلی
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — فشردهسازی خروجی فرمان/ابزار
- [../frameworks/MCP-SERVER.md](../frameworks/MCP-SERVER.md) — فشردهسازی توضیحات MCP و
  کاهش تعداد ابزارها
- منبع: `open-sse/config/contextEditing.ts`، `open-sse/executors/base.ts`،
  `open-sse/services/compression/types.ts`، `src/lib/db/compressionAnalytics.ts`
