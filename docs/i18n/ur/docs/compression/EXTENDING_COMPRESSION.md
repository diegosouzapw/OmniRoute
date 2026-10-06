# Extending the Compression Pipeline (اردو)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/EXTENDING_COMPRESSION.md) · 🇪🇹 [am](../../../am/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇦 [ar](../../../ar/docs/compression/EXTENDING_COMPRESSION.md) · 🇦🇿 [az](../../../az/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇬 [bg](../../../bg/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇩 [bn](../../../bn/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇦 [bs](../../../bs/docs/compression/EXTENDING_COMPRESSION.md) · 🇨🇿 [cs](../../../cs/docs/compression/EXTENDING_COMPRESSION.md) · 🇩🇰 [da](../../../da/docs/compression/EXTENDING_COMPRESSION.md) · 🇩🇪 [de](../../../de/docs/compression/EXTENDING_COMPRESSION.md) · 🇬🇷 [el](../../../el/docs/compression/EXTENDING_COMPRESSION.md) · 🇪🇸 [es](../../../es/docs/compression/EXTENDING_COMPRESSION.md) · 🇪🇪 [et](../../../et/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇷 [fa](../../../fa/docs/compression/EXTENDING_COMPRESSION.md) · 🇫🇮 [fi](../../../fi/docs/compression/EXTENDING_COMPRESSION.md) · 🇫🇷 [fr](../../../fr/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇪 [ga](../../../ga/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [gu](../../../gu/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [ha](../../../ha/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇱 [he](../../../he/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [hi](../../../hi/docs/compression/EXTENDING_COMPRESSION.md) · 🇭🇷 [hr](../../../hr/docs/compression/EXTENDING_COMPRESSION.md) · 🇭🇺 [hu](../../../hu/docs/compression/EXTENDING_COMPRESSION.md) · 🇦🇲 [hy](../../../hy/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇩 [id](../../../id/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [ig](../../../ig/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇹 [it](../../../it/docs/compression/EXTENDING_COMPRESSION.md) · 🇯🇵 [ja](../../../ja/docs/compression/EXTENDING_COMPRESSION.md) · 🇬🇪 [ka](../../../ka/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇭 [km](../../../km/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [kn](../../../kn/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇷 [ko](../../../ko/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇹 [lt](../../../lt/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇻 [lv](../../../lv/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [ml](../../../ml/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [mr](../../../mr/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇾 [ms](../../../ms/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇹 [mt](../../../mt/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇲 [my](../../../my/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇵 [ne](../../../ne/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇱 [nl](../../../nl/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇴 [no](../../../no/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [or](../../../or/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [pa](../../../pa/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇭 [phi](../../../phi/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇱 [pl](../../../pl/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇹 [pt](../../../pt/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇴 [ro](../../../ro/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇺 [ru](../../../ru/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇰 [si](../../../si/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇰 [sk](../../../sk/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇮 [sl](../../../sl/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇸 [sr](../../../sr/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇪 [sv](../../../sv/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇪 [sw](../../../sw/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [ta](../../../ta/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [te](../../../te/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇭 [th](../../../th/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇷 [tr](../../../tr/docs/compression/EXTENDING_COMPRESSION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/EXTENDING_COMPRESSION.md) · 🇺🇿 [uz](../../../uz/docs/compression/EXTENDING_COMPRESSION.md) · 🇻🇳 [vi](../../../vi/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [yo](../../../yo/docs/compression/EXTENDING_COMPRESSION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/EXTENDING_COMPRESSION.md)

---

> **خلاصہ**: OmniRoute کا کمپریشن انجن **قابلِ توسیع** ہے — آپ حسبِ ضرورت انجن رجسٹر کر سکتے ہیں، نئی زبانوں کے لیے لینگویج پیکس فراہم کر سکتے ہیں، اور تہہ دار پائپ لائنز تشکیل دے سکتے ہیں۔ یہ رہنما اس کا طریقہ دکھاتا ہے۔

**متعلقہ رہنما:**

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — مکمل پائپ لائن کا جائزہ
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — انجن رجسٹری اور پہلے سے موجود انجن
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — RTK انجن اور حسبِ ضرورت فلٹرز
- [COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md) — رول پیک فارمیٹ کا حوالہ

---

## جائزہ

کمپریشن سسٹم میں **3 توسیعی مقامات** ہیں:

| توسیعی مقام           | استعمال کی صورت                                                            | دشواری  |
| --------------------- | -------------------------------------------------------------------------- | ------- |
| **حسبِ ضرورت انجن**   | بالکل نیا کمپریشن الگورتھم شامل کریں (مثلاً، ڈومین کے لیے مخصوص خلاصہ ساز) | اعلیٰ   |
| **لینگویج پیک**       | نئی قدرتی زبان کے لیے معاونت شامل کریں (مثلاً، ہندی، عربی)                 | درمیانی |
| **تہہ دار پائپ لائن** | موجودہ انجنوں کو حسبِ ضرورت ترتیب میں یکجا کریں                            | ابتدائی |

```
┌─────────────────────────────────────────────────────────────┐
│                    کمپریشن حکمتِ عملی                        │
│                                                              │
│   ان پٹ پیغامات ──▶ getEffectiveMode() ──▶ موڈ              │
│                                              │               │
│                      ┌───────────────────────┼──────────┐    │
│                      │         │         │         │    │    │
│                      ▼         ▼         ▼         ▼    │    │
│                   "rtk"    "lite"   "standard" "stacked"    │
│                      │         │         │         │    │    │
│                      ▼         ▼         ▼         ▼    │    │
│                   RTK       Lite     Caveman   engines[]   │
│                   انجن      انجن      انجن      زنجیربند    │
│                      │         │         │         │    │    │
│                      └─────────┴─────────┴─────────┘    │    │
│                                      │                    │
│                                      ▼                    │
│                             کمپریس شدہ آؤٹ پٹ              │
└─────────────────────────────────────────────────────────────┘

حکمتِ عملی کا انتخاب موڈ کی بنیاد پر ہوتا ہے: ہر درخواست ایک موڈ منتخب کرتی ہے
(rtk / lite / standard / aggressive / ultra / stacked / off)۔
صرف "stacked" موڈ متعدد انجنوں کو ترتیب وار زنجیربند کرتا ہے۔
پہلے سے طے شدہ خودکار ٹریگر موڈ "lite" ہے (یہ 3 سطحی ترجیحی زنجیر نہیں ہے)۔
```

---

## حسبِ ضرورت کمپریشن انجن لکھنا

انجن انٹرفیس (`open-sse/services/compression/engines/types.ts`) وہ معاہدہ ہے جسے ہر انجن کو پورا کرنا ضروری ہے۔ اس میں 5 مطلوبہ میتھڈز ہیں۔

### `CompressionEngine` انٹرفیس

```ts
interface CompressionEngine {
  id: string; // منفرد انجن ID
  name: string; // نمایشی نام
  description: string; // مختصر وضاحت
  icon: string; // آئیکن (ایموجی یا URL)
  targets: CompressionEngineTarget[]; // ["messages", "tool_results", "code_blocks"]
  stackable: boolean; // کیا اسے تہہ دار پائپ لائن میں استعمال کیا جا سکتا ہے
  stackPriority: number; // تہہ دار پائپ لائنز میں ترتیب (کم قدر = پہلے)
  metadata: CompressionEngineMetadata;

  apply(body, options?): CompressionResult;
  compress(body, config?): CompressionResult;
  getConfigSchema(): EngineConfigField[];
  validateConfig(config): EngineValidationResult;
}
```

### کم سے کم مثال: وائٹ اسپیس انجن

آسان ترین ممکنہ انجن — پیغامات سے اضافی وائٹ اسپیس ہٹا دیتا ہے۔

````ts
import type { CompressionEngine } from "omniroute/compression/engines/types";
import { registerCompressionEngine } from "omniroute/compression/engines/registry";

function preserveCodeBlocks(text: string): string {
  // کوڈ بلاک کے نشانات کے مطابق تقسیم کریں اور ان کے اندر موجود خالی جگہ برقرار رکھیں
  const parts = text.split(/(```[\s\S]*?```)/);
  return parts
    .map((part) => {
      if (part.startsWith("```")) {
        return part; // کوڈ بلاکس میں تبدیلی نہ کریں
      }
      return part.replace(/\n{3,}/g, "\n\n"); // صرف نثری متن پر لاگو کریں
    })
    .join("");
}

const whitespaceEngine: CompressionEngine = {
  id: "whitespace",
  name: "Whitespace Stripper",
  description: "Removes extra whitespace and blank lines",
  icon: "📝",
  targets: ["messages", "tool_results"],
  stackable: true,
  stackPriority: 100, // caveman/rtk کے بعد چلائیں

  metadata: {
    id: "whitespace",
    name: "Whitespace Stripper",
    description: "Removes extra whitespace and blank lines",
    inputScope: "messages",
    targetLatencyMs: 5,
    supportsPreview: true,
    stable: true,
  },

  apply(body, options) {
    return this.compress(body, options?.config);
  },

  compress(body, config = {}) {
    let originalLength = 0;
    let compressedLength = 0;

    // پیغامات کی صف میں سے گزریں — اسٹرنگ اور ملٹی پارٹ، دونوں قسم کے مواد کو سنبھالیں
    const compressedBody = (body.messages || []).map((msg) => {
      if (typeof msg.content === "string") {
        originalLength += msg.content.length;
        let compressed = msg.content
          .replace(/[ \t]+/g, " ")
          .replace(/\n{3,}/g, "\n\n")
          .replace(/^\s+|\s+$/gm, "");
        compressedLength += compressed.length;
        return { ...msg, content: compressed };
      }
      // ملٹی پارٹ مواد: حصوں میں سے گزریں، صرف متنی حصوں کو کمپریس کریں
      if (Array.isArray(msg.content)) {
        const newParts = msg.content.map((part) => {
          if (part.type === "text" && typeof part.text === "string") {
            originalLength += part.text.length;
            let compressed = part.text
              .replace(/[ \t]+/g, " ")
              .replace(/\n{3,}/g, "\n\n")
              .replace(/^\s+|\s+$/gm, "");
            compressedLength += compressed.length;
            return { ...part, text: compressed };
          }
          return part; // image_url، tool_use وغیرہ کو برقرار رکھیں۔
        });
        return { ...msg, content: newParts };
      }
      return msg;
    });

    return {
      body: { ...body, messages: compressedBody },
      stats: {
        originalTokens: Math.ceil(originalLength / 4),
        compressedTokens: Math.ceil(compressedLength / 4),
        savingsPercent: originalLength > 0 ? 100 * (1 - compressedLength / originalLength) : 0,
        techniques: ["whitespace-collapse"],
        engineId: "whitespace",
      },
    };
  },

  getConfigSchema() {
    return [
      {
        key: "preserveCodeBlocks",
        type: "boolean",
        label: "Preserve code blocks",
        defaultValue: true,
        description: "Don't touch whitespace inside ```code``` blocks",
      },
    ];
  },

  validateConfig(config) {
    if (config.preserveCodeBlocks !== undefined && typeof config.preserveCodeBlocks !== "boolean") {
      return { valid: false, errors: ["preserveCodeBlocks must be a boolean"] };
    }
    return { valid: true, errors: [] };
  },
};

// عالمی سطح پر رجسٹر کریں
registerCompressionEngine(whitespaceEngine);
````

### حسبِ ضرورت انجن کہاں رکھیں

```
~/.omniroute/compression/engines/my-engine.ts    # صارف کی سطح پر
<project>/compression-engines/my-engine.ts        # پروجیکٹ کی سطح پر (آغاز کے وقت لوڈ ہوتا ہے)
```

یا کسی پلگ اِن سے پروگرام کے ذریعے لوڈ کریں:

```ts
// اپنے پلگ اِن میں
import {
  registerCompressionEngine,
  unregisterCompressionEngine,
} from "@omniroute/open-sse/services/compression/engines/registry";
import { myEngine } from "./engines/my-engine";

export default definePlugin({
  name: "my-compression-plugin",
  // پلگ اِن SDK، onRequest / onResponse / onError ہُکس فراہم کرتا ہے۔ پلگ اِن
  // ماڈیول لوڈ ہونے پر (یا پہلے onRequest پر) انجن رجسٹر کریں؛ اسے اپنے
  // ٹیئر ڈاؤن کے راستے سے اَن رجسٹر کریں۔
  onRequest: async (ctx) => {
    registerCompressionEngine(myEngine);
  },
});

// ٹیئر ڈاؤن کے وقت:
// unregisterCompressionEngine("my-engine");
```

### اپنے انجن کی جانچ

اپنے انجن کو کسی پلگ اِن یا اسٹارٹ اپ فنکشن میں رجسٹر کریں۔ رجسٹر ہونے کے بعد، انجن اپنے `id` کے ذریعے
حکمتِ عملی کے سلیکٹر میں دستیاب ہوگا۔ اسے اسٹیک شدہ پائپ لائن میں شامل کرکے انضمام کی جانچ کریں:

---

## لینگویج پیکس بنانا

Caveman طرز کی کمپریشن ہر قدرتی زبان میں اضافی الفاظ، محتاط اندازِ بیان، اور غیر ضروری طور پر طویل انداز کو سنبھالنے کے لیے **زبان کے لحاظ سے مخصوص رول پیکس** استعمال کرتی ہے۔ OmniRoute کے ساتھ **6 لینگویج پیکس** شامل ہیں: `en`، `es`، `fr`، `de`، `ja`، `pt-BR`۔

### پیک کی ساخت

لینگویج پیک، `open-sse/services/compression/rules/<language>/` کے تحت **JSON فائلوں** کی ایک ڈائریکٹری ہوتا ہے:

```
open-sse/services/compression/rules/
├── en/
│   ├── filler.json          # رسمی کلمات، محتاط اندازِ بیان، شائستگی
│   ├── context.json         # سیاق کم کرنے والے قواعد
│   ├── dedup.json           # نقل ختم کرنے کے قواعد
│   ├── structural.json      # رموزِ اوقاف، فارمیٹنگ
│   └── ultra.json           # جارحانہ کمپریشن کے قواعد
├── es/  (وہی ساخت)
├── fr/  (وہی ساخت)
├── de/  (وہی ساخت)
├── ja/  (وہی ساخت)
└── pt-BR/ (وہی ساخت)
```

### قاعدے کی ساخت

ہر قاعدے کی یہ شکل ہوتی ہے (`open-sse/services/compression/ruleLoader.ts` سے):

```ts
interface FileRule {
  name: string; // انسان کے لیے قابلِ فہم نام (kebab-case)
  pattern: string; // JavaScript ریگولر ایکسپریشن پیٹرن
  replacement?: string; // میچ کو کس چیز سے تبدیل کرنا ہے
  replacementMap?: Record<string, string>; // یا کلید→متبادل میپ
  flags?: string; // ریگولر ایکسپریشن فلیگز (عموماً "gi")
  context?: "all" | "user" | "system" | "assistant";
  category?: "filler" | "context" | "structural" | "dedup" | "terse" | "ultra";
  minIntensity?: "lite" | "full" | "ultra"; // اس شدت سے کم پر چھوڑ دیں
  description?: string; // دستاویزات
}
```

### مثال: ہندی کے اضافی الفاظ کے قواعد شامل کرنا

```json
{
  "language": "hi",
  "category": "filler",
  "rules": [
    {
      "name": "polite_opener",
      "pattern": "\\b(?:नमस्ते|नमस्कार|आदरणीय)\\b[,!\\s]*",
      "replacement": "",
      "context": "all",
      "category": "filler",
      "minIntensity": "lite",
      "description": "Strip polite openers like 'नमस्ते'"
    },
    {
      "name": "filler_actually",
      "pattern": "\\b(?:असल में|वास्तव में|दरअसल)\\b\\s*",
      "replacement": "",
      "context": "all",
      "category": "filler",
      "minIntensity": "lite",
      "description": "Strip 'actually' fillers"
    },
    {
      "name": "verbose_plea",
      "pattern": "\\b(?:कृपया|कृपया आप|अनुरोध है कि आप)\\b\\s*",
      "replacement": "",
      "context": "all",
      "category": "filler",
      "minIntensity": "full",
      "description": "Strip 'please' in Hindi"
    }
  ]
}
```

### توثیق

رول پیکس کو لوڈ ہوتے وقت `_schema.json` کے مطابق توثیق کیا جاتا ہے۔ غلط ساخت والا پیک لوڈ نہیں ہوگا اور ایک خرابی لاگ کرے گا:

```
RULE_LOADER: پیک "hi/filler.json" کی توثیق ناکام ہوگئی:
  - rules.0.pattern: غلط ریگولر ایکسپریشن
  - rules.1.context: [all, user, system, assistant] میں سے ایک ہونا ضروری ہے
```

جب کوئی پیک لوڈ ہوتا ہے تو توثیق خودکار طور پر (`_schema.json` کے مطابق) چلتی ہے؛ ایک
غلط پیک مسترد کر دیا جاتا ہے اور مذکورہ بالا خرابی لاگ کی جاتی ہے۔ پیک کی توثیق کے لیے کوئی علیحدہ
`npm run` اسکرپٹ موجود نہیں ہے — پیک لوڈ کریں (مثلاً سرور شروع کریں یا
کمپریشن پاتھ چلائیں) اور لاگز دیکھیں۔

### حسبِ ضرورت لینگویج پیک لوڈ کرنا

```ts
import { loadRulePack } from "omniroute/compression/ruleLoader";

await loadRulePack("./my-custom-rules/hi/filler.json");
```

یا اسے کسی تسلیم شدہ مقام پر رکھیں:

```
~/.omniroute/compression/rules/hi/filler.json  # صارف کی سطح
<project>/.compression/rules/hi/filler.json   # پروجیکٹ کی سطح
```

### لینگویج پیکس کے لیے بہترین طریقۂ کار

1. **`filler` سے آغاز کریں** — یہ سب سے زیادہ اثر رکھنے والے قواعد ہیں
2. **جارحانہ قواعد کو محدود کرنے کے لیے `minIntensity` استعمال کریں** — یہ ضرورت سے زیادہ کمپریشن سے بچاتا ہے
3. **ٹیسٹ کیسز شامل کریں** — رویے کی تصدیق کے لیے JSON میں `tests[]` ایرے شامل کریں
4. **ترتیب اہم ہے** — پہلے آنے والے قواعد پہلے لاگو ہوتے ہیں؛ زیادہ اثر رکھنے والے قواعد پہلے رکھیں
5. **`replacement` کے معاملے میں محتاط رہیں** — عموماً خالی اسٹرنگ درست ہوتی ہے؛ کبھی نیا مواد شامل نہ کریں

### ترجمے کی حکمتِ عملی

رول پیکس کو کسی نئی زبان کے لیے مقامی بناتے وقت:

1. **قواعد کے ناموں کا ترجمہ کریں** — یہ ڈیبگ آؤٹ پٹ میں ظاہر ہوتے ہیں
2. **ریگولر ایکسپریشن پیٹرنز کو موافق بنائیں** — براہِ راست ترجمہ اکثر ناکام ہوتا ہے (الفاظ کی حدود مختلف ہوتی ہیں)
3. **حقیقی گفتگو کے ساتھ ٹیسٹ کریں** — پیک کو اصل ان پٹ پر محفوظ ہونا چاہیے
4. **ثقافتی روایات سے مطابقت رکھیں** — مثلاً جاپانی پیکس میں انگریزی کی نسبت زیادہ تعظیمی اضافی الفاظ ہوتے ہیں

---

## اسٹیک شدہ پائپ لائنز

ایک **اسٹیک شدہ پائپ لائن** متعدد انجنوں کو ترتیب وار چلاتی ہے، جہاں ہر انجن کا آؤٹ پٹ اگلے انجن کو فراہم کیا جاتا ہے۔ اندرونی طور پر `mode: stacked` اسی طرح کام کرتا ہے۔

### اسٹیکنگ کیسے کام کرتی ہے

```
ان پٹ (10,000 ٹوکنز)
        │
        ▼
   ┌──────────┐
   │  انجن    │  ترجیح 10
   │  A       │  ──▶ آؤٹ پٹ: 6,000 ٹوکنز (-40%)
   └────┬─────┘
        ▼
   ┌──────────┐
   │  انجن    │  ترجیح 50
   │  B       │  ──▶ آؤٹ پٹ: 2,400 ٹوکنز (-60%)
   └────┬─────┘
        ▼
   ┌──────────┐
   │  انجن    │  ترجیح 100
   │  C       │  ──▶ آؤٹ پٹ: 1,200 ٹوکنز (-80%)
   └────┬─────┘
        │
        ▼
حتمی آؤٹ پٹ (1,200 ٹوکنز، مجموعی طور پر ~88% بچت)
```

جب `mode: "stacked"` منتخب کیا جاتا ہے، تو انجن `pipeline` ارے میں دی گئی ترتیب کے مطابق یکے بعد دیگرے چلتے ہیں۔
انجن N کا آؤٹ پٹ انجن N+1 کا ان پٹ بن جاتا ہے۔

### کمپریشن موڈز

OmniRoute کنفیگریشن، خودکار ٹرگر کی حدوں، اور کومبو اوور رائیڈز کی بنیاد پر **ہر درخواست کے لیے ایک موڈ** منتخب کرتا ہے۔
دستیاب موڈز کی تعریف `open-sse/services/compression/types.ts` میں کی گئی ہے (ٹائپ `CompressionMode`):

| موڈ          | انجنز                | استعمال کی صورت                                                                                                                                                                                                                                           |
| ------------ | -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `off`        | کوئی نہیں            | تمام کمپریشن غیر فعال کریں                                                                                                                                                                                                                                |
| `rtk`        | صرف RTK              | کمانڈ آؤٹ پٹ کی کثرت والے سیشنز (80%+ بچت)                                                                                                                                                                                                                |
| `lite`       | صرف Lite             | محتاط کمپریشن (تیز، محفوظ)                                                                                                                                                                                                                                |
| `standard`   | Caveman              | لینگویج پیکس کے ساتھ نثری کمپریشن                                                                                                                                                                                                                         |
| `aggressive` | Caveman + Aggressive | جارحانہ نثری کمپریشن + جارحانہ حتمی پاس                                                                                                                                                                                                                   |
| `ultra`      | Ultra                | زیادہ سے زیادہ کمپریشن (معلومات کے ضیاع کے ساتھ، آخری چارہ)۔ جب `ultra.modelPath` سیٹ ہو تو اسے اختیاری طور پر **LLMLingua-2** SLM انجن کے ذریعے روٹ کیا جاتا ہے (ماڈل دستیاب نہ ہونے پر قواعد پر مبنی راستے کو استعمال کرتے ہوئے کارروائی جاری رہتی ہے)۔ |
| `stacked`    | حسب ضرورت پائپ لائن  | انجنوں کو کسی بھی ترتیب میں یکجا کریں (نیچے دیکھیں)                                                                                                                                                                                                       |

> مذکورہ بالا موڈ انجنوں کے علاوہ، رجسٹری میں مخصوص اسٹیک کیے جانے کے قابل انجن بھی شامل ہیں —
> **CCR**، **headroom**، **ionizer**، اور **session-dedup** — جن کی دستاویزات
> [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md#additional-built-in-engines) میں موجود ہیں۔

موڈ کے انتخاب کا تعین `open-sse/services/compression/strategySelector.ts` میں موجود `getEffectiveMode()` کے ذریعے کیا جاتا ہے:

1. اگر کمپریشن غیر فعال ہے: `"off"`
2. اگر کوئی کومبو اوور رائیڈ موجود ہے: اوور رائیڈ استعمال کریں
3. اگر خودکار ٹرگر کی حد پار ہو جائے: `autoTriggerMode` استعمال کریں (ڈیفالٹ: `"lite"`)
4. بصورت دیگر: `defaultMode` استعمال کریں

### ڈیفالٹ اسٹیک شدہ پائپ لائن

جب `mode: "stacked"` کو واضح طور پر کنفیگر کیا جاتا ہے، تو ڈیفالٹ پائپ لائن یہ اجزا یکجا کرتی ہے:

1. **RTK** — کمانڈ آؤٹ پٹ کا غیر ضروری شور ہٹاتا ہے (ٹرمینل آؤٹ پٹ پر ~80% بچت)
2. **Caveman** — اضافی الفاظ ہٹاتا اور نثر کو مختصر بناتا ہے (باقی متن پر ~46%)
3. **Lite** — خالی جگہوں کی حتمی صفائی + تکرار ختم کرنے کا پاس

یہ امتزاج ٹولز کی کثرت والے سیشنز میں **78-95% بچت** حاصل کرتا ہے۔

### اسٹیک شدہ پائپ لائنز کی کنفیگریشن

کومبو کنفیگ میں:

```json
{
  "compression": {
    "mode": "stacked",
    "pipeline": [
      { "engine": "rtk", "config": { "intensity": "aggressive" } },
      { "engine": "caveman", "config": { "intensity": "full" } },
      { "engine": "lite", "config": {} }
    ]
  }
}
```

آپ انجنوں کو چھوڑ سکتے ہیں، حسب ضرورت انجن شامل کر سکتے ہیں، یا ان کی ترتیب بدل سکتے ہیں۔

### اسٹیٹ کی منتقلی

انجن درخواست کے سیاق سے میٹا ڈیٹا پڑھ سکتے ہیں (`options` میں):

```ts
compress(body, config) {
  // پچھلے انجنوں سے میٹا ڈیٹا پڑھیں
  const original = options?.compressionComboId;  // "my-coding-combo"
  // ...
}
```

میٹا ڈیٹا **صرف پڑھنے کے لیے** ہے — انجن درخواست کے سیاق میں تبدیلی نہیں کر سکتے، صرف اپنے باڈی آؤٹ پٹ میں تبدیلی کر سکتے ہیں۔

### عمل درآمد کی ترتیب سے متعلق باریکیاں

| انجن کی ترتیب                                | اثر                                                                                            |
| -------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| RTK → Caveman → Lite                         | **تجویز کردہ** (پہلے شور، پھر زبان، اور آخر میں خالی جگہیں ہٹاتا ہے)                           |
| Lite → RTK → Caveman                         | ناموزوں — Lite خام آؤٹ پٹ سے خالی جگہیں ہٹا دیتا ہے، جس سے RTK کی پیٹرن میچنگ ناکام ہو جاتی ہے |
| Caveman → RTK                                | ناموزوں — Caveman متن کو ایسے انداز میں دوبارہ لکھ سکتا ہے جسے RTK پہچان نہیں پاتا             |
| کوئی بھی ترتیب جس میں پہلے `tool_results` ہو | بہتر — ٹول آؤٹ پٹ میں سب سے زیادہ شور ہوتا ہے                                                  |

### کب اسٹیک نہ کریں

اسٹیکنگ ہمیشہ بہتر نہیں ہوتی:

- **سادہ پیغامات** (کوئی ٹول آؤٹ پٹ نہیں) — صرف Caveman یا Lite کافی ہے
- **لاگت کے حوالے سے حساس صورتیں** — ہر انجن ~5-50ms تاخیر کا اضافہ کرتا ہے
- **مخصوص ٹولز** — شیل آؤٹ پٹ کے لیے عموماً صرف RTK کافی ہوتا ہے

### حسب ضرورت پائپ لائن بنانا

کوئی named-pipeline registry موجود نہیں ہے۔ stacked pipeline محض مراحل کی ایک **inline array** ہے جسے `applyStackedCompression()` کو پاس کیا جاتا ہے (جو `@omniroute/open-sse/services/compression/strategySelector` سے export ہوتا ہے):

```ts
import { applyStackedCompression } from "@omniroute/open-sse/services/compression/strategySelector";

const result = applyStackedCompression(body, [
  { engine: "rtk", intensity: "aggressive" },
  { engine: "caveman", intensity: "full" },
]);
```

جب آپ کوئی pipeline پاس نہیں کرتے، تو یہ بطورِ ڈیفالٹ `rtk(standard) → caveman(full)` استعمال کرتا ہے۔

اسے config سے چلانے کے لیے، `mode: "stacked"` سیٹ کریں اور مراحل کی array کو `stackedPipeline` کے تحت فراہم کریں (`config.stackedPipeline` سے پڑھی جاتی ہے):

```json
{
  "compression": {
    "mode": "stacked",
    "stackedPipeline": [
      { "engine": "rtk", "intensity": "aggressive" },
      { "engine": "caveman", "intensity": "full" }
    ]
  }
}
```

---

## اپ اسٹریم ہم وقت سازی کی پالیسی

OmniRoute کے کمپریشن انجن README میں متعدد اپ اسٹریم پروجیکٹس کو کریڈٹ دیتے ہیں
("RTK، Caveman، LLMLingua-2، Troglodita سے متاثر")۔ معاونین کا ایک عام
سوال یہ ہے: **جب اپ اسٹریم RTK کوئی نیا ٹول فلٹر شامل کرتا ہے یا Caveman کوئی نیا رول
پیک شامل کرتا ہے، تو وہ OmniRoute تک کیسے پہنچتا ہے؟** یہ سیکشن اس کا حتمی جواب ہے۔

### وینڈر شدہ نقول بمقابلہ آزاد نفاذ

| انجن                         | اپ اسٹریم کے ساتھ تعلق                                                                                                              | مقام                                                                |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| **RTK**                      | **آزاد ازسرِنو نفاذ** (متاثر، نقل نہیں)                                                                                             | `open-sse/services/compression/engines/rtk/`                        |
| **Caveman**                  | **آزاد ازسرِنو نفاذ** (متاثر)                                                                                                       | `open-sse/services/compression/engines/cavemanAdapter.ts`           |
| **Headroom**                 | زیادہ تر داخلی؛ صرف `gcf/` codec کو `gcf-typescript` سے **حقیقی طور پر وینڈر** کیا گیا ہے (MIT، SPDX سے نشان زد، صرف عمومی پروفائل) | `open-sse/services/compression/engines/headroom/gcf/`               |
| **LLMLingua-2 / Troglodita** | متاثر (یہ `llmlingua` + `session-dedup` انجنوں کو چلاتے ہیں)                                                                        | `open-sse/services/compression/engines/llmlingua/`, `session-dedup` |

اہم نکتہ: **RTK اور Caveman، _تصورات_ (فلٹر قواعد، رول پیکس) کے کلین روم TypeScript نفاذ ہیں،
وینڈر شدہ سورس ٹریز نہیں۔** یہاں اپ اسٹریم کی کوئی نقل موجود نہیں جس سے `git pull` کیا جا سکے
— بالکل اسی لیے README میں "bundled" کے بجائے "inspired by" لکھا ہے۔

### اپ اسٹریم بہتریاں کیسے ضم کی جاتی ہیں

ڈیزائن کے تحت **نہ کوئی خودکار اپ اسٹریم ریلیز ٹریکنگ ہے اور نہ کوئی `compression-sync`
لیبل**۔ چونکہ یہ انجن ازسرِنو نفاذ ہیں، اس لیے اپ اسٹریم RTK
فلٹر یا Caveman رول پیک کو بطور کوڈ ضم نہیں کیا جاتا؛ بلکہ اسے **OmniRoute کے اپنے فارمیٹ میں ایک نئے
قاعدے/فلٹر کی صورت میں دوبارہ ظاہر کیا جاتا ہے** (دیکھیے
[COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md)) اور ایک عام PR کے ذریعے
حسبِ ضرورت شامل کیا جاتا ہے۔ اوپر دیے گئے توسیعی مقامات (کسٹم انجن، لینگویج پیک، RTK فلٹر)
کسی شراکت کو شامل کرنے کا منظور شدہ طریقہ ہیں۔

اسی عمل کی حالیہ مثالیں:

- Gradle اور `dotnet` بلڈ آؤٹ پٹ کے لیے RTK فلٹرز (v3.8.42)
- kubectl / docker-build / composer / gh کے لیے RTK فلٹرز (#2824)
- Caveman کا انڈونیشیائی لینگویج پیک (#3975)، نیز جرمن / فرانسیسی / جاپانی / چینی پیکس

### Headroom (ان پٹ کمپریشن پراکسی)

Headroom **مکمل طور پر داخلی** ہے — ایک پن شدہ، وینڈر شدہ `gcf` codec اسنیپ شاٹ، نیز
OmniRoute کی اپنی `smartcrusher` / `toon` / `tabular` تہیں۔ وینڈر شدہ نقل کے علاوہ
ٹریک کرنے کے لیے کوئی فعال اپ اسٹریم موجود نہیں؛ `gcf` کی اپ ڈیٹس کو
codec تبدیل ہونے پر دستی طور پر ریفریش کیا جاتا ہے اور کمپریشن بجٹ
گیٹ (`check:compression-budget`) کے مقابل دوبارہ توثیق کی جاتی ہے۔

### اپ اسٹریم سے متاثرہ بہتری تجویز کرنا

1. **وینڈر نہ کریں** — اپ اسٹریم قاعدے/فلٹر کو OmniRoute کے فارمیٹ میں دوبارہ ظاہر کریں۔
2. اسے ذیل میں موجود مماثل توسیعی مقام (لینگویج پیک، RTK فلٹر، یا
   کسٹم انجن) کے ذریعے شامل کریں۔
3. PR کی تفصیل میں اپ اسٹریم پروجیکٹ کا حوالہ دیں (انتساب)، اس کا
   لائسنس رکھنے والا سورس نقل نہ کریں۔
4. ٹیسٹس شامل کریں اور تصدیق کریں کہ `check:compression-budget` گیٹ اب بھی پاس ہوتا ہے۔

---

## آؤٹ پٹ اسٹائل شامل کرنا

آؤٹ پٹ اسٹائلز (دیکھیے [گائیڈ کی کیٹلاگ جدول](./COMPRESSION_GUIDE.md#output-styles-catalog))
اِن پٹ انجنز کے رسپانس سائیڈ ہم منصب ہیں: آپ کی بھیجی ہوئی چیز کو کمپریس کرنے کے بجائے، یہ ماڈل کو کم لاگت والا آؤٹ پٹ تیار کرنے کی ہدایت دیتے ہیں۔ رجسٹری
`open-sse/services/compression/outputStyles/catalog.ts` میں `OUTPUT_STYLE_CATALOG` ہے، اور
**کیٹلاگ کی ایک انٹری ہی مکمل فیچر ہے**: انجیکٹر، ڈیش بورڈ سیٹنگز پینل،
پرسسٹنس اور ٹیلی میٹری سبھی کیٹلاگ کو شمار کرتے ہیں — اپ ڈیٹ کرنے کے لیے کوئی دوسری فہرست نہیں ہے۔

1. **`OUTPUT_STYLE_CATALOG` میں ایک انٹری شامل کریں** جس میں `id`، `label`، `description` اور
   تین انگریزی `levels` (`lite`، `full`، `ultra`) ہوں۔ ہر لیول کا اختتام
   `${SHARED_BOUNDARIES}` پر ہونا چاہیے تاکہ کوڈ، پاتھز، کمانڈز، ایررز اور URLs بعینہٖ برقرار رہیں۔
   ہدایت کا متن ہر `(id, level, language)` کے لیے **جامد اور متعین** ہونا چاہیے —
   صرف `${SHARED_BOUNDARIES}` کی انٹرپولیشن کی اجازت ہے۔
2. **اس کا ترجمہ کریں۔** `i18n` کے تحت کم از کم ایک `pt-BR` بلاک فراہم کریں؛ `ponytail` اور
   `i-have-adhd` (en، pt-BR، es، de، fr، it، ru، zh، ja، id، vi) حوالہ جاتی ساخت ہیں۔ دانستہ طور پر
   صرف ایک زبان والا اسٹائل اس کے بجائے `locale` متعین کرتا ہے (جیسے `terse-cjk` → `zh`) اور پھر
   صرف اسی لوکیل کے تحت پیش کیا جاتا ہے۔
3. **میٹرکس گارڈ اپ ڈیٹ کریں** — اسٹائل کی زبانیں
   `tests/unit/compression/output-styles-i18n-matrix.test.ts` میں `BASELINE_LANGUAGES` میں شامل کریں۔
   مطلوبہ تراجم کے بغیر کوئی بھی نیا، غیر locale-gated اسٹائل اس گیٹ پر ناکام ہو جاتا ہے، الا یہ کہ اس کے ساتھ
   ٹریکنگ ایشو والی واضح `KNOWN_ENGLISH_ONLY` انٹری موجود ہو۔
4. **ہر اسٹائل کے لیے ایک ٹیسٹ شامل کریں** جو
   `tests/unit/compression/i-have-adhd-catalog.test.ts` کے مطابق ہو: کیٹلاگ کی ساخت، ہر لیول کے لیے
   باؤنڈریز کلاز، اور ایک اینکر جو یہ یقینی بنائے کہ ہر ترجمہ نقل شدہ انگریزی کے بجائے اپنی زبان میں لکھا گیا ہے۔
5. **انتساب**: اگر اسٹائل کو کسی اپ اسٹریم پروجیکٹ سے اخذ کیا گیا ہے تو انٹری پر سورس کمنٹ میں
   اسے کریڈٹ دیں (مثلاً `i-have-adhd` → ayghri/i-have-adhd، MIT) — وہی اصول جو اوپر
   "اپ اسٹریم سے متاثرہ بہتری تجویز کرنا" کے لیے ہے۔

کسی UI، اسکیما یا ٹیلی میٹری تبدیلی کی ضرورت نہیں — یہ سطحیں کیٹلاگ سے رینڈر ہوتی ہیں۔

---

## بہترین طریقۂ کار

### انجن ڈیولپمنٹ

1. **ہمیشہ `validateConfig` نافذ کریں** — توثیق کے بغیر انجن خاموش ناکامیوں کا سبب بنتے ہیں
2. **حقیقت پسندانہ `targetLatencyMs` مقرر کریں** — اسٹریٹیجی سلیکٹر اسے انجن منتخب کرنے کے لیے استعمال کرتا ہے
3. **ڈیش بورڈ کے لیے `getConfigSchema` استعمال کریں** — کنفیگ کو کبھی صارفین سے نہ چھپائیں
4. **اگر آپ کا انجن خالص ہے تو `stackable: true` کی معاونت کریں** — ضمنی اثرات والے انجنز کو اسٹیک نہیں ہونا چاہیے
5. **اِن لائن ٹیسٹس لکھیں** — انجنز کی توثیق <1s میں ممکن ہونی چاہیے

### لینگویج پیک ڈیولپمنٹ

1. **`lite` شدت سے آغاز کریں** — آپ کے قواعد کم ترین سیٹنگ پر محفوظ ہونے چاہییں
2. **قواعد کا دائرۂ کار متعین کرنے کے لیے `context` استعمال کریں** — صرف `user` کے قواعد حادثاتی طور پر سسٹم پرامپٹس کو متاثر نہیں کر سکتے
3. **JSON keys کو کیپچر کرنے سے گریز کریں** — `\\bword\\b` JSON کے اندر میچ ہو سکتا ہے، جس سے اسٹرکچرڈ ڈیٹا خراب ہو سکتا ہے
4. **ایج کیسز کے ساتھ ٹیسٹ کریں** — خالی اِن پٹ، unicode، RTL متن، emojis
5. **موجودہ پیکس کو ٹیمپلیٹس کے طور پر استعمال کریں** — `en/filler.json` سب سے زیادہ ترقی یافتہ مثال ہے

### پائپ لائن ڈیزائن

1. **آپٹمائز کرنے سے پہلے پروفائل کریں** — پہلے `compression_stats` کے ذریعے پیمائش کریں
2. **دوبارہ نفاذ کے بجائے کمپوزیشن کو ترجیح دیں** — نیا انجن لکھنے سے پہلے Caveman کے قواعد کو وسعت دیں
3. **ترتیب کی منطق دستاویزی بنائیں** — کمنٹ میں وضاحت کریں کہ انجن A، انجن B سے پہلے کیوں ہے
4. **شدت کی تینوں سطحوں پر ٹیسٹ کریں** — `lite` تیز مگر نقصاندہ ہے، `ultra` سست مگر درست ہے

---

## حوالہ: بلٹ اِن انجنز

| انجن ID              | اسٹیک کے قابل | ڈیفالٹ stackPriority | اہداف                            |
| -------------------- | ------------- | -------------------- | -------------------------------- |
| `lite`               | ہاں           | 5                    | پیغامات، ٹول کے نتائج            |
| `rtk`                | ہاں           | 10                   | ٹول کے نتائج                     |
| `standard` (caveman) | ہاں           | 20                   | پیغامات، ٹول کے نتائج، کوڈ بلاکس |
| `aggressive`         | ہاں           | 30                   | پیغامات                          |
| `ultra`              | ہاں           | 40                   | پیغامات، کوڈ بلاکس               |

### مزید دیکھیں

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — پائپ لائن کا جائزہ
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — انجن رجسٹری کا حوالہ
- [COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md) — قواعد کے فارمیٹ کی وضاحت
- [COMPRESSION_LANGUAGE_PACKS.md](./COMPRESSION_LANGUAGE_PACKS.md) — لینگویج پیک کی تفصیلات
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — RTK انجن اور حسبِ ضرورت فلٹرز
- ماخذ: `open-sse/services/compression/` (117 فائلیں، ~250KB)
