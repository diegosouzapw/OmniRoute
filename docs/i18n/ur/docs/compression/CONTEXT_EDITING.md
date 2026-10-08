# Delegated Context Editing (Anthropic) (اردو)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/CONTEXT_EDITING.md) · 🇪🇹 [am](../../../am/docs/compression/CONTEXT_EDITING.md) · 🇸🇦 [ar](../../../ar/docs/compression/CONTEXT_EDITING.md) · 🇦🇿 [az](../../../az/docs/compression/CONTEXT_EDITING.md) · 🇧🇬 [bg](../../../bg/docs/compression/CONTEXT_EDITING.md) · 🇧🇩 [bn](../../../bn/docs/compression/CONTEXT_EDITING.md) · 🇧🇦 [bs](../../../bs/docs/compression/CONTEXT_EDITING.md) · 🇨🇿 [cs](../../../cs/docs/compression/CONTEXT_EDITING.md) · 🇩🇰 [da](../../../da/docs/compression/CONTEXT_EDITING.md) · 🇩🇪 [de](../../../de/docs/compression/CONTEXT_EDITING.md) · 🇬🇷 [el](../../../el/docs/compression/CONTEXT_EDITING.md) · 🇪🇸 [es](../../../es/docs/compression/CONTEXT_EDITING.md) · 🇪🇪 [et](../../../et/docs/compression/CONTEXT_EDITING.md) · 🇮🇷 [fa](../../../fa/docs/compression/CONTEXT_EDITING.md) · 🇫🇮 [fi](../../../fi/docs/compression/CONTEXT_EDITING.md) · 🇫🇷 [fr](../../../fr/docs/compression/CONTEXT_EDITING.md) · 🇮🇪 [ga](../../../ga/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [gu](../../../gu/docs/compression/CONTEXT_EDITING.md) · 🇳🇬 [ha](../../../ha/docs/compression/CONTEXT_EDITING.md) · 🇮🇱 [he](../../../he/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [hi](../../../hi/docs/compression/CONTEXT_EDITING.md) · 🇭🇷 [hr](../../../hr/docs/compression/CONTEXT_EDITING.md) · 🇭🇺 [hu](../../../hu/docs/compression/CONTEXT_EDITING.md) · 🇦🇲 [hy](../../../hy/docs/compression/CONTEXT_EDITING.md) · 🇮🇩 [id](../../../id/docs/compression/CONTEXT_EDITING.md) · 🇳🇬 [ig](../../../ig/docs/compression/CONTEXT_EDITING.md) · 🇮🇹 [it](../../../it/docs/compression/CONTEXT_EDITING.md) · 🇯🇵 [ja](../../../ja/docs/compression/CONTEXT_EDITING.md) · 🇬🇪 [ka](../../../ka/docs/compression/CONTEXT_EDITING.md) · 🇰🇭 [km](../../../km/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [kn](../../../kn/docs/compression/CONTEXT_EDITING.md) · 🇰🇷 [ko](../../../ko/docs/compression/CONTEXT_EDITING.md) · 🇱🇹 [lt](../../../lt/docs/compression/CONTEXT_EDITING.md) · 🇱🇻 [lv](../../../lv/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [ml](../../../ml/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [mr](../../../mr/docs/compression/CONTEXT_EDITING.md) · 🇲🇾 [ms](../../../ms/docs/compression/CONTEXT_EDITING.md) · 🇲🇹 [mt](../../../mt/docs/compression/CONTEXT_EDITING.md) · 🇲🇲 [my](../../../my/docs/compression/CONTEXT_EDITING.md) · 🇳🇵 [ne](../../../ne/docs/compression/CONTEXT_EDITING.md) · 🇳🇱 [nl](../../../nl/docs/compression/CONTEXT_EDITING.md) · 🇳🇴 [no](../../../no/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [or](../../../or/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [pa](../../../pa/docs/compression/CONTEXT_EDITING.md) · 🇵🇭 [phi](../../../phi/docs/compression/CONTEXT_EDITING.md) · 🇵🇱 [pl](../../../pl/docs/compression/CONTEXT_EDITING.md) · 🇵🇹 [pt](../../../pt/docs/compression/CONTEXT_EDITING.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/CONTEXT_EDITING.md) · 🇷🇴 [ro](../../../ro/docs/compression/CONTEXT_EDITING.md) · 🇷🇺 [ru](../../../ru/docs/compression/CONTEXT_EDITING.md) · 🇱🇰 [si](../../../si/docs/compression/CONTEXT_EDITING.md) · 🇸🇰 [sk](../../../sk/docs/compression/CONTEXT_EDITING.md) · 🇸🇮 [sl](../../../sl/docs/compression/CONTEXT_EDITING.md) · 🇷🇸 [sr](../../../sr/docs/compression/CONTEXT_EDITING.md) · 🇸🇪 [sv](../../../sv/docs/compression/CONTEXT_EDITING.md) · 🇰🇪 [sw](../../../sw/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [ta](../../../ta/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [te](../../../te/docs/compression/CONTEXT_EDITING.md) · 🇹🇭 [th](../../../th/docs/compression/CONTEXT_EDITING.md) · 🇹🇷 [tr](../../../tr/docs/compression/CONTEXT_EDITING.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/CONTEXT_EDITING.md) · 🇺🇿 [uz](../../../uz/docs/compression/CONTEXT_EDITING.md) · 🇻🇳 [vi](../../../vi/docs/compression/CONTEXT_EDITING.md) · 🇳🇬 [yo](../../../yo/docs/compression/CONTEXT_EDITING.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/CONTEXT_EDITING.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/CONTEXT_EDITING.md)

---

تفویض شدہ **Context Editing** صرف Claude کے لیے دستیاب context-management فیچر ہے۔ OmniRoute کے مقامی
compression engines (Caveman، RTK، LLMLingua، stacked pipelines) کے برعکس — جو درخواست کے proxy سے باہر
جانے _سے پہلے_ اس کے body کو دوبارہ لکھتے ہیں — Context Editing، **provider** سے کہتا ہے کہ وہ اپنے جاری
context window سے پرانے tool-use / tool-result blocks صاف کرے۔ OmniRoute صرف ایک body
parameter (`context_management.edits[]`) منسلک کرتا ہے؛ اصل صفائی Claude اپنے tokenizer کے مطابق کرتا ہے۔

یہ اپنی نوعیت کے لحاظ سے ایک تفویض شدہ صلاحیت ہے: دوسرے providers اس parameter کو مسترد کر دیتے ہیں، اس لیے OmniRoute
اسے سختی سے Claude اور Claude-Code-compatible relays تک محدود رکھتا ہے۔

مستند ماخذ: `open-sse/config/contextEditing.ts` (strategy ids، body injection، telemetry
extraction)، `open-sse/executors/base.ts` (injection gate + 400-fallback)، اور
`open-sse/services/compression/types.ts` (config shape + default)۔

## `clear_tool_uses` کیا کرتا ہے

OmniRoute باہر بھیجے جانے والے Anthropic Messages body میں ایک واحد edit شامل کرتا ہے:

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

- `type: "clear_tool_uses_20250919"` — تاریخ والا Anthropic strategy id (`CLEAR_TOOL_USES_STRATEGY`)۔
- `trigger.value: 100000` — جب درخواست کے input tokens اس حد سے تجاوز کر جائیں تو Claude پرانے
  tool-use/result جوڑوں کو صاف کرنا شروع کر دیتا ہے (`CONTEXT_EDITING_DEFAULT_TRIGGER_TOKENS`، Anthropic کا default)۔
- `keep.value: 3` — حالیہ ترین N tool-use/result جوڑے بغیر کسی تبدیلی کے برقرار رکھے جاتے ہیں
  (`CONTEXT_EDITING_DEFAULT_KEEP_TOOL_USES`)۔

اس beta کا اعلان `anthropic-beta: context-management-2025-06-27` header کے ذریعے کیا جاتا ہے، جسے
OmniRoute پہلے ہی Claude کی درخواستوں پر بھیجتا ہے۔

Injection کا عمل `applyContextEditingToBody()` انجام دیتا ہے اور یہ **idempotent** ہے: اگر body میں
`clear_tool_uses` edit پہلے سے موجود ہو (کسی سابقہ call کے ذریعے شامل کیا گیا ہو یا client نے فراہم کیا ہو)، تو body
کو جوں کا توں چھوڑ دیا جاتا ہے۔ اگر `clear_thinking_20251015` edit بھی موجود ہو، تو OmniRoute
`clear_thinking` edit کو stable-sort کرکے سب سے آگے لے آتا ہے، کیونکہ Anthropic کا تقاضا ہے کہ `edits[]`
array میں `clear_thinking`، `clear_tool_uses` سے پہلے آئے۔

## ہر combo کے لیے enable toggle

Context Editing بطور default **بند** ہے اور اسے opt-in کے ذریعے فعال کیا جاتا ہے۔ یہ toggle ایک boolean ہے جو
compression config میں شامل ہوتا ہے:

- Setting key: `contextEditing.enabled` (camelCase — `context_editing` / `context-editing` **نہیں**)۔
- Type: `ContextEditingConfig { enabled: boolean }`، مقام
  `open-sse/services/compression/types.ts`۔
- Default: `DEFAULT_CONTEXT_EDITING_CONFIG = { enabled: false }`۔
- Zod schema: `src/shared/validation/compressionConfigSchemas.ts` میں `contextEditingConfigSchema`۔
- Storage: باقی compression settings کے ساتھ برقرار رکھی جاتی ہے (جسے
  `src/lib/db/compression.ts` میں normalize کیا جاتا ہے)۔

dashboard میں یہ toggle compression hub
(`src/app/(dashboard)/dashboard/context/combos/CompressionHub.tsx`) میں موجود ہے اور `saveSettings()` کے ذریعے
`{ contextEditing: { enabled: … } }` واپس لکھتا ہے۔ چونکہ یہ compression-settings object کا حصہ ہے،
اس لیے یہ مکمل طور پر آزاد سطح ہونے کے بجائے ہر combo کے compression profile کے ساتھ کام کرتا ہے — config میں
صرف on/off flag ہوتا ہے؛ تمام thresholds (`trigger`،
`keep`) اوپر درج constants ہی ہیں۔

## صرف Claude کے لیے گیٹنگ

انجیکشن صرف حقیقی Claude یا Claude-Code سے مطابقت رکھنے والے ریلے کے لیے ہوتا ہے۔  
`open-sse/executors/base.ts` میں گیٹ یہ ہے:

```ts
if (
  (this.provider === "claude" || isClaudeCodeCompatible(this.provider)) &&
  contextEditing?.enabled &&
  !contextEditingDisabled
) {
  applyContextEditingToBody(transformedBody, { enabled: true });
}
```

- `this.provider === "claude"` — حقیقی Anthropic کلید/OAuth۔
- `isClaudeCodeCompatible(this.provider)` — ایسے ریلے جن کی provider id، `anthropic-compatible-cc-` سابقے سے شروع ہوتی ہے (وہ Claude Code مطابقت کی تشہیر کرتے ہیں، اس لیے یہی وہ ریلے ہیں جن کے beta کو قبول کرنے کا سب سے زیادہ امکان ہے)۔ `open-sse/services/provider.ts` دیکھیں۔

جان بوجھ کر **خارج کیے گئے**:

- `claude-web` — ایک براؤزر ریلے جس کی درخواست کی ساخت `create_conversation_params` ہے اور جو کبھی `context_management` نہیں دیکھتا۔
- عمومی `anthropic-compatible-*` ریلے (`-cc-` سابقے کے بغیر) — غیر یقینی beta سپورٹ رکھنے والے فریق ثالث کے endpoints۔

ٹوگل آن ہونے کے باوجود غیر Claude providers کو کبھی `context_management` پیرامیٹر موصول نہیں ہوتا۔

## 400-fallback / ریلے کوریج

ایک Claude سے مطابقت رکھنے والا ریلے beta کی تشہیر کر سکتا ہے، لیکن پھر بھی `context_management` پیرامیٹر کو HTTP 400 کے ساتھ مسترد کر سکتا ہے۔ درخواست کو ناکام کرنے کے بجائے موزوں انداز میں تنزلی کے لیے، executor پیرامیٹر ہٹا کر اسی URL کو **ایک بار** دوبارہ آزماتا ہے:

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

طرزِ عمل:

1. یہ صرف `400` پر فعال ہوتا ہے، جب context editing فعال ہو اور body میں واقعی `context_management` موجود ہو۔
2. 400 body کو `clone()` کے ذریعے پڑھا جاتا ہے تاکہ مماثلت نہ ہونے کی صورت میں اصل response برقرار رہے۔
3. خرابی کے متن کا `/context[_-]management|context editing/i` سے مماثل ہونا ضروری ہے — کوئی غیر متعلقہ 400 (مثلاً `max_tokens must be >= 1`) fallback کو فعال **نہیں** کرتا؛ اصل خرابی آگے منتقل ہو جاتی ہے۔
4. مماثلت ہونے پر یہ `contextEditingDisabled = true` مقرر کرتا ہے (جس سے، اگر کسی retry/fallback URL کے لیے بعد میں نیا `transformedBody` بنایا جائے، تو دوبارہ انجیکشن رک جاتا ہے)، `context_management` حذف کرتا ہے، Claude / Claude-Code سے مطابقت رکھنے والے ریلے کے لیے body کو دوبارہ sign کرتا ہے (`signRequestBody`)، اور اسی URL کو ایک بار دوبارہ آزماتا ہے۔

حقیقی Claude، beta کو `ANTHROPIC_BETA_BASE` میں رکھتا ہے اور اس fallback راستے سے نہیں گزرتا۔

## `applied_edits` ٹیلی میٹری

Claude response کے بعد، OmniRoute ریکارڈ کرتا ہے کہ provider نے حقیقتاً کتنا context صاف کیا۔ یہ **stream نہیں کیا جاتا** — اسے non-streaming response body سے best-effort بنیاد پر نکالا جاتا ہے، اور یہ کبھی response کو متاثر نہیں کرتا (ٹیلی میٹری کی ناکامیاں نظرانداز کر دی جاتی ہیں)۔

- اخذ کرنا: `open-sse/config/contextEditing.ts` میں `extractContextEditingTelemetry(responseBody)`۔ یہ response کی ساخت کے حوالے سے دفاعی انداز اپناتے ہوئے تین مقامات پر `applied_edits` کو تلاش کرتا ہے:
  - `context_management.applied_edits`
  - `usage.context_management.applied_edits`
  - `usage.applied_edits`
- ہر اندراج سے پڑھے جانے والے فی-edit فیلڈز: `cleared_input_tokens` اور `cleared_tool_uses` (snake_case، Anthropic-native)، جبکہ `clearedInputTokens` / `clearedToolUses` camelCase fallbacks ہیں۔
- جب کوئی `applied_edits` array نہ ملے یا حقیقتاً کچھ بھی صاف نہ کیا گیا ہو تو `null` لوٹاتا ہے۔

رسید کی ساخت `ContextEditingTelemetry { editCount, clearedInputTokens, clearedToolUses }` ہے۔ ریکارڈنگ `open-sse/handlers/chatCore.ts` میں (`provider === "claude"` تک محدود) `recordContextEditingTelemetry()` (`src/lib/db/compressionAnalytics.ts`) کے ذریعے ہوتی ہے، جو ان ٹیگز کے ساتھ compression analytics کی ایک row لکھتا ہے:

- `mode: "context-editing"`
- `engine: "context-editing"`
- `tokens_saved` / `original_tokens` = صاف کیے گئے input-token کی تعداد
- `request_id` کے آخر میں `::context-editing`

اس طرح تفویض کردہ clearing، مقامی engines کے ساتھ compression analytics میں `context-editing` engine label کے تحت ظاہر ہوتی ہے، اور اسے RTK/Caveman/LLMLingua کی savings سے الگ شناخت کیا جا سکتا ہے۔

## مقامی کمپریشن انجنز کے ساتھ تعلق

| پہلو                     | مقامی انجنز (Caveman / RTK / LLMLingua / stacked) | تفویض شدہ Context Editing                              |
| ------------------------ | ------------------------------------------------- | ------------------------------------------------------ |
| کہاں چلتا ہے             | OmniRoute میں، درخواست کے پراکسی سے نکلنے سے پہلے | فراہم کنندہ (Claude) میں، سرور کی جانب                 |
| کیا ترمیم کرتا ہے        | پرامپٹ / سیاق و سباق / ٹول کے نتیجے کا متن        | پرانے ٹول کے استعمال / ٹول کے نتیجے کے بلاکس           |
| فراہم کنندہ کا دائرۂ کار | تمام فراہم کنندگان                                | صرف `claude` + `anthropic-compatible-cc-*`             |
| ٹوگل                     | کمپریشن موڈ کی ترتیبات                            | `contextEditing.enabled`                               |
| ناکامی کی صورت           | کھلی ناکامی (اصل متن)                             | 400 فال بیک: پیرامیٹر ہٹائیں، ایک بار دوبارہ کوشش کریں |
| بچت کی ٹیلی میٹری        | `engine: <engine id>`                             | `engine: "context-editing"`                            |

دونوں ایک دوسرے کی تکمیل کرتے ہیں: مقامی انجنز ان بائٹس کو کمپریس کرتے ہیں جو OmniRoute بھیجتا ہے؛ Context Editing
Claude کو متعدد باریوں کے دوران جاری سیاق و سباق کی کانٹ چھانٹ کرنے دیتا ہے۔ دونوں کو ایک ساتھ فعال کیا جا سکتا ہے۔

## مزید دیکھیں

- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — انجن رجسٹری اور مقامی کمپریشن
  انجنز
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — کمانڈ/ٹول آؤٹ پٹ کمپریشن
- [../frameworks/MCP-SERVER.md](../frameworks/MCP-SERVER.md) — MCP کی تفصیل کا کمپریشن اور
  ٹول کارڈینیلٹی میں کمی
- ماخذ: `open-sse/config/contextEditing.ts`, `open-sse/executors/base.ts`,
  `open-sse/services/compression/types.ts`, `src/lib/db/compressionAnalytics.ts`
