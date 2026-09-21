# Extending the Compression Pipeline (فارسی)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/EXTENDING_COMPRESSION.md) · 🇪🇹 [am](../../../am/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇦 [ar](../../../ar/docs/compression/EXTENDING_COMPRESSION.md) · 🇦🇿 [az](../../../az/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇬 [bg](../../../bg/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇩 [bn](../../../bn/docs/compression/EXTENDING_COMPRESSION.md) · 🇨🇿 [cs](../../../cs/docs/compression/EXTENDING_COMPRESSION.md) · 🇩🇰 [da](../../../da/docs/compression/EXTENDING_COMPRESSION.md) · 🇩🇪 [de](../../../de/docs/compression/EXTENDING_COMPRESSION.md) · 🇬🇷 [el](../../../el/docs/compression/EXTENDING_COMPRESSION.md) · 🇪🇸 [es](../../../es/docs/compression/EXTENDING_COMPRESSION.md) · 🇪🇪 [et](../../../et/docs/compression/EXTENDING_COMPRESSION.md) · 🇫🇮 [fi](../../../fi/docs/compression/EXTENDING_COMPRESSION.md) · 🇫🇷 [fr](../../../fr/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇪 [ga](../../../ga/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [gu](../../../gu/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [ha](../../../ha/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇱 [he](../../../he/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [hi](../../../hi/docs/compression/EXTENDING_COMPRESSION.md) · 🇭🇷 [hr](../../../hr/docs/compression/EXTENDING_COMPRESSION.md) · 🇭🇺 [hu](../../../hu/docs/compression/EXTENDING_COMPRESSION.md) · 🇦🇲 [hy](../../../hy/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇩 [id](../../../id/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [ig](../../../ig/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇹 [it](../../../it/docs/compression/EXTENDING_COMPRESSION.md) · 🇯🇵 [ja](../../../ja/docs/compression/EXTENDING_COMPRESSION.md) · 🇬🇪 [ka](../../../ka/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇭 [km](../../../km/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [kn](../../../kn/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇷 [ko](../../../ko/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇹 [lt](../../../lt/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇻 [lv](../../../lv/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [ml](../../../ml/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [mr](../../../mr/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇾 [ms](../../../ms/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇹 [mt](../../../mt/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇲 [my](../../../my/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇵 [ne](../../../ne/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇱 [nl](../../../nl/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇴 [no](../../../no/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [or](../../../or/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [pa](../../../pa/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇭 [phi](../../../phi/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇱 [pl](../../../pl/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇹 [pt](../../../pt/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇴 [ro](../../../ro/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇺 [ru](../../../ru/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇰 [si](../../../si/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇰 [sk](../../../sk/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇮 [sl](../../../sl/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇸 [sr](../../../sr/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇪 [sv](../../../sv/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇪 [sw](../../../sw/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [ta](../../../ta/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [te](../../../te/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇭 [th](../../../th/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇷 [tr](../../../tr/docs/compression/EXTENDING_COMPRESSION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇰 [ur](../../../ur/docs/compression/EXTENDING_COMPRESSION.md) · 🇺🇿 [uz](../../../uz/docs/compression/EXTENDING_COMPRESSION.md) · 🇻🇳 [vi](../../../vi/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [yo](../../../yo/docs/compression/EXTENDING_COMPRESSION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/EXTENDING_COMPRESSION.md)

---

> **خلاصه**: موتور فشردهسازی OmniRoute **قابلافزونه** است — میتوانید موتورهای سفارشی را ثبت کنید، بستههای زبانی برای زبانهای جدید ارائه دهید و پایپلاینهای پشتهای را ترکیب کنید. این راهنما چگونگی انجام این کار را نشان میدهد.

**راهنماهای مرتبط:**

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — نمای کلی پایپلاین کامل
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — رجیستری موتور و موتورهای داخلی
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — موتور RTK و فیلترهای سفارشی
- [COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md) — مرجع قالب بستهٔ قوانین

---

## نمای کلی

سیستم فشردهسازی دارای **۳ نقطهٔ توسعه** است:

| نقطهٔ توسعه         | مورد استفاده                                                                 | دشواری  |
| ------------------- | ---------------------------------------------------------------------------- | ------- |
| **موتور سفارشی**    | افزودن یک الگوریتم فشردهسازی کاملاً جدید (برای مثال، خلاصهساز مختص یک دامنه) | پیشرفته |
| **بستهٔ زبانی**     | افزودن پشتیبانی از یک زبان طبیعی جدید (برای مثال، هندی یا عربی)              | متوسط   |
| **پایپلاین پشتهای** | ترکیب موتورهای موجود با ترتیبی سفارشی                                        | مبتدی   |

```
┌─────────────────────────────────────────────────────────────┐
│                    راهبرد فشردهسازی                         │
│                                                              │
│   پیامهای ورودی ──▶ getEffectiveMode() ──▶ حالت            │
│                                              │               │
│                      ┌───────────────────────┼──────────┐    │
│                      │         │         │         │    │    │
│                      ▼         ▼         ▼         ▼    │    │
│                   "rtk"    "lite"   "standard" "stacked"    │
│                      │         │         │         │    │    │
│                      ▼         ▼         ▼         ▼    │    │
│                   RTK       Lite     Caveman   engines[]   │
│                   موتور     موتور    موتور     زنجیرهای   │
│                      │         │         │         │    │    │
│                      └─────────┴─────────┴─────────┘    │    │
│                                      │                    │
│                                      ▼                    │
│                             خروجی فشردهشده                │
└─────────────────────────────────────────────────────────────┘

انتخابگر راهبرد مبتنی بر حالت است: هر درخواست یک حالت را انتخاب میکند
(rtk / lite / standard / aggressive / ultra / stacked / off).
فقط حالت "stacked" چندین موتور را بهصورت متوالی زنجیره میکند.
حالت پیشفرض فعالسازی خودکار "lite" است (نه یک زنجیرهٔ اولویت سهسطحی).
```

---

## نوشتن یک موتور فشردهسازی سفارشی

رابط موتور (`open-sse/services/compression/engines/types.ts`) قراردادی است که هر موتور باید آن را برآورده کند. این رابط ۵ متد الزامی دارد.

### رابط `CompressionEngine`

```ts
interface CompressionEngine {
  id: string; // شناسهٔ یکتای موتور
  name: string; // نام نمایشی
  description: string; // توضیح کوتاه
  icon: string; // آیکون (ایموجی یا URL)
  targets: CompressionEngineTarget[]; // ["messages", "tool_results", "code_blocks"]
  stackable: boolean; // آیا میتواند در یک پایپلاین پشتهای استفاده شود
  stackPriority: number; // ترتیب در پایپلاینهای پشتهای (کمتر = زودتر)
  metadata: CompressionEngineMetadata;

  apply(body, options?): CompressionResult;
  compress(body, config?): CompressionResult;
  getConfigSchema(): EngineConfigField[];
  validateConfig(config): EngineValidationResult;
}
```

### مثال حداقلی: موتور فاصلههای سفید

سادهترین موتور ممکن — حذف فاصلههای سفید اضافی از پیامها.

````ts
import type { CompressionEngine } from "omniroute/compression/engines/types";
import { registerCompressionEngine } from "omniroute/compression/engines/registry";

function preserveCodeBlocks(text: string): string {
  // بر اساس نشانگرهای بلوک کد تقسیم کن و فاصلههای سفید داخل آنها را حفظ کن
  const parts = text.split(/(```[\s\S]*?```)/);
  return parts
    .map((part) => {
      if (part.startsWith("```")) {
        return part; // بلوکهای کد را تغییر نده
      }
      return part.replace(/\n{3,}/g, "\n\n"); // فقط روی متن معمولی اعمال کن
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
  stackPriority: 100, // بعد از caveman/rtk اجرا شود

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

    // پیمایش آرایهٔ پیامها — مدیریت محتوای رشتهای و چندبخشی
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
      // محتوای چندبخشی: بخشها را پیمایش کن و فقط بخشهای متنی را فشرده کن
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
          return part; // image_url، tool_use و موارد مشابه را حفظ کن
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

// ثبت بهصورت سراسری
registerCompressionEngine(whitespaceEngine);
````

### محل قرار دادن موتورهای سفارشی

```
~/.omniroute/compression/engines/my-engine.ts    # سطح کاربر
<project>/compression-engines/my-engine.ts        # سطح پروژه (هنگام راهاندازی بارگذاری میشود)
```

یا آن را بهصورت برنامهنویسیشده از یک افزونه بارگذاری کنید:

```ts
// در افزونهٔ شما
import {
  registerCompressionEngine,
  unregisterCompressionEngine,
} from "@omniroute/open-sse/services/compression/engines/registry";
import { myEngine } from "./engines/my-engine";

export default definePlugin({
  name: "my-compression-plugin",
  // SDK افزونه هوکهای onRequest / onResponse / onError را ارائه میکند. موتور را
  // هنگام بارگذاری ماژول افزونه (یا در نخستین onRequest) ثبت کنید؛ سپس آن را
  // از مسیر پاکسازی خودتان لغو ثبت کنید.
  onRequest: async (ctx) => {
    registerCompressionEngine(myEngine);
  },
});

// هنگام پاکسازی:
// unregisterCompressionEngine("my-engine");
```

### آزمایش موتور شما

موتور خود را در یک افزونه یا تابع راهاندازی ثبت کنید. پس از ثبت، موتور از طریق `id` خود
در انتخابگر راهبرد در دسترس خواهد بود. یکپارچهسازی را با ترکیب آن در یک خط لولهٔ پشتهای آزمایش کنید:

---

## ایجاد بستههای زبانی

فشردهسازی به سبک Caveman از **بستههای قواعد مختص هر زبان** برای مدیریت کلمات پُرکننده، عبارات محتاطانه و الگوهای پُرگویی در هر زبان طبیعی استفاده میکند. OmniRoute همراه با **6 بستهٔ زبانی** عرضه میشود: `en`، `es`، `fr`، `de`، `ja`، `pt-BR`.

### ساختار بسته

بستهٔ زبانی، دایرکتوریای از **فایلهای JSON** در مسیر `open-sse/services/compression/rules/<language>/` است:

```
open-sse/services/compression/rules/
├── en/
│   ├── filler.json          # تعارفات، عبارات محتاطانه، ادب
│   ├── context.json         # قواعد کاهشدهندهٔ زمینه
│   ├── dedup.json           # قواعد حذف موارد تکراری
│   ├── structural.json      # نشانهگذاری، قالببندی
│   └── ultra.json           # قواعد فشردهسازی تهاجمی
├── es/  (ساختار یکسان)
├── fr/  (ساختار یکسان)
├── de/  (ساختار یکسان)
├── ja/  (ساختار یکسان)
└── pt-BR/ (ساختار یکسان)
```

### ساختار هر قاعده

هر قاعده دارای ساختار زیر است (از `open-sse/services/compression/ruleLoader.ts`):

```ts
interface FileRule {
  name: string; // نام خوانا برای انسان (kebab-case)
  pattern: string; // الگوی عبارت منظم JavaScript
  replacement?: string; // مقداری که تطبیق با آن جایگزین میشود
  replacementMap?: Record<string, string>; // یا نگاشت کلید→جایگزین
  flags?: string; // پرچمهای عبارت منظم (معمولاً "gi")
  context?: "all" | "user" | "system" | "assistant";
  category?: "filler" | "context" | "structural" | "dedup" | "terse" | "ultra";
  minIntensity?: "lite" | "full" | "ultra"; // در شدتهای پایینتر از این مقدار نادیده گرفته شود
  description?: string; // مستندات
}
```

### مثال: افزودن قواعد پُرکنندهٔ زبان هندی

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

### اعتبارسنجی

بستههای قواعد هنگام بارگذاری در برابر `_schema.json` اعتبارسنجی میشوند. بستهای با ساختار نادرست بارگذاری نخواهد شد و خطایی ثبت میکند:

```
RULE_LOADER: اعتبارسنجی بستهٔ "hi/filler.json" ناموفق بود:
  - rules.0.pattern: عبارت منظم نامعتبر است
  - rules.1.context: باید یکی از مقادیر [all, user, system, assistant] باشد
```

اعتبارسنجی هنگام بارگذاری بسته (در برابر `_schema.json`) بهطور خودکار اجرا میشود؛ بستهٔ
نامعتبر رد میشود و خطای بالا ثبت خواهد شد. هیچ اسکریپت جداگانهای با دستور
`npm run` برای اعتبارسنجی بسته وجود ندارد — بسته را بارگذاری کنید (برای مثال، سرور را راهاندازی
کنید یا مسیر فشردهسازی را اجرا کنید) و گزارشها را زیر نظر بگیرید.

### بارگذاری یک بستهٔ زبانی سفارشی

```ts
import { loadRulePack } from "omniroute/compression/ruleLoader";

await loadRulePack("./my-custom-rules/hi/filler.json");
```

یا آن را در یکی از مکانهای شناختهشده قرار دهید:

```
~/.omniroute/compression/rules/hi/filler.json  # سطح کاربر
<project>/.compression/rules/hi/filler.json   # سطح پروژه
```

### بهترین شیوهها برای بستههای زبانی

1. **با `filler` شروع کنید** — این قواعد بیشترین تأثیر را دارند
2. **برای محدودکردن قواعد تهاجمی از `minIntensity` استفاده کنید** — این کار از فشردهسازی بیشازحد جلوگیری میکند
3. **موارد آزمایشی را اضافه کنید** — برای بررسی رفتار، آرایهٔ `tests[]` را به JSON اضافه کنید
4. **ترتیب اهمیت دارد** — قواعد قبلی زودتر اعمال میشوند؛ قواعد با تأثیر بالا را در ابتدا قرار دهید
5. **در استفاده از `replacement` محافظهکار باشید** — معمولاً رشتهٔ خالی انتخاب درستی است؛ هرگز محتوای جدیدی وارد نکنید

### راهبرد ترجمه

هنگام بومیسازی بستههای قواعد برای یک زبان جدید:

1. **نام قواعد را ترجمه کنید** — این نامها در خروجی اشکالزدایی نمایش داده میشوند
2. **الگوهای عبارت منظم را سازگار کنید** — ترجمهٔ مستقیم اغلب کار نمیکند (مرز کلمات متفاوت است)
3. **با مکالمات واقعی آزمایش کنید** — بسته باید برای ورودی واقعی ایمن باشد
4. **با عرفهای فرهنگی هماهنگ شوید** — برای مثال، بستههای ژاپنی نسبت به انگلیسی عبارات احترامآمیز پُرکنندهٔ بیشتری دارند

---

## پایپلاینهای پشتهای

یک **پایپلاین پشتهای** چندین موتور را بهصورت متوالی اجرا میکند؛ خروجی هر موتور بهعنوان ورودی به موتور بعدی داده میشود. `mode: stacked` در داخل سیستم به این شکل کار میکند.

### نحوهٔ کار پشتهسازی

```
ورودی (10,000 توکن)
        │
        ▼
   ┌──────────┐
   │   موتور  │  اولویت 10
   │  A       │  ──▶ خروجی: 6,000 توکن (-40%)
   └────┬─────┘
        ▼
   ┌──────────┐
   │   موتور  │  اولویت 50
   │  B       │  ──▶ خروجی: 2,400 توکن (-60%)
   └────┬─────┘
        ▼
   ┌──────────┐
   │   موتور  │  اولویت 100
   │  C       │  ──▶ خروجی: 1,200 توکن (-80%)
   └────┬─────┘
        │
        ▼
خروجی نهایی (1,200 توکن، مجموعاً ~88% صرفهجویی)
```

وقتی `mode: "stacked"` انتخاب شود، موتورها بهترتیب مشخصشده در آرایهٔ `pipeline` و بهصورت متوالی اجرا میشوند.
خروجی موتور N به ورودی موتور N+1 تبدیل میشود.

### حالتهای فشردهسازی

OmniRoute بر اساس پیکربندی، آستانههای فعالسازی خودکار و بازنویسیهای combo، برای هر درخواست **یک حالت** را انتخاب میکند.
حالتهای موجود در `open-sse/services/compression/types.ts` (نوع `CompressionMode`) تعریف شدهاند:

| حالت         | موتورها              | مورد استفاده                                                                                                                                                                                                         |
| ------------ | -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `off`        | هیچکدام              | غیرفعالکردن تمام فشردهسازیها                                                                                                                                                                                         |
| `rtk`        | فقط RTK              | نشستهایی با حجم زیاد خروجی فرمان (بیش از 80% صرفهجویی)                                                                                                                                                               |
| `lite`       | فقط Lite             | فشردهسازی محافظهکارانه (سریع و ایمن)                                                                                                                                                                                 |
| `standard`   | Caveman              | فشردهسازی نثر با بستههای زبانی                                                                                                                                                                                       |
| `aggressive` | Caveman + Aggressive | نثر تهاجمی + گذر نهایی تهاجمی                                                                                                                                                                                        |
| `ultra`      | Ultra                | حداکثر فشردهسازی (همراه با اتلاف، آخرین راهحل). در صورت تنظیم `ultra.modelPath`، میتوان آن را از طریق موتور SLM **LLMLingua-2** هدایت کرد (اگر مدل در دسترس نباشد، بدون ایجاد خطا به مسیر مبتنی بر قواعد بازمیگردد). |
| `stacked`    | پایپلاین سفارشی      | ترکیب موتورها با هر ترتیبی (پایین را ببینید)                                                                                                                                                                         |

> افزون بر موتورهای حالت بالا، رجیستری موتورهای تخصصی و قابلپشتهسازی دیگری نیز ارائه میکند —
> **CCR**، **headroom**، **ionizer** و **session-dedup** — که در
> [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md#additional-built-in-engines) مستند شدهاند.

انتخاب حالت توسط `getEffectiveMode()` در `open-sse/services/compression/strategySelector.ts` تعیین میشود:

1. اگر فشردهسازی غیرفعال باشد: `"off"`
2. اگر یک بازنویسی combo وجود داشته باشد: از آن بازنویسی استفاده میشود
3. اگر از آستانهٔ فعالسازی خودکار عبور شود: از `autoTriggerMode` استفاده میشود (پیشفرض: `"lite"`)
4. در غیر این صورت: از `defaultMode` استفاده میشود

### پایپلاین پشتهای پیشفرض

وقتی `mode: "stacked"` بهصراحت پیکربندی شده باشد، پایپلاین پیشفرض موارد زیر را ترکیب میکند:

1. **RTK** — حذف نویز خروجی فرمان (~80% صرفهجویی در خروجی ترمینال)
2. **Caveman** — حذف عبارتهای زائد و موجزکردن نثر (~46% در متن باقیمانده)
3. **Lite** — گذر نهایی برای فاصلههای سفید + حذف موارد تکراری

این ترکیب در نشستهایی که استفادهٔ زیادی از ابزار دارند، **78-95% صرفهجویی** ایجاد میکند.

### پیکربندی پایپلاینهای پشتهای

در پیکربندی combo:

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

میتوانید موتورها را حذف کنید، موتورهای سفارشی اضافه کنید یا ترتیب آنها را تغییر دهید.

### انتقال وضعیت

موتورها میتوانند فراداده را از زمینهٔ درخواست (در `options`) بخوانند:

```ts
compress(body, config) {
  // خواندن فراداده از موتورهای قبلی
  const original = options?.compressionComboId;  // "my-coding-combo"
  // ...
}
```

فراداده **فقطخواندنی** است — موتورها نمیتوانند زمینهٔ درخواست را تغییر دهند و فقط قادر به تغییر خروجی body خود هستند.

### نکات ظریف ترتیب اجرا

| ترتیب موتورها                          | اثر                                                                                      |
| -------------------------------------- | ---------------------------------------------------------------------------------------- |
| RTK → Caveman → Lite                   | **توصیهشده** (ابتدا نویز، سپس بخشهای زبانی و در پایان فاصلههای سفید حذف میشوند)          |
| Lite → RTK → Caveman                   | نامناسب — Lite فاصلههای سفید را از خروجی خام حذف میکند و باعث شکست تطبیق الگوی RTK میشود |
| Caveman → RTK                          | نامناسب — Caveman ممکن است متن را به شکلی بازنویسی کند که RTK آن را تشخیص ندهد           |
| هر ترتیبی که ابتدا `tool_results` باشد | بهتر — خروجی ابزار پرنویزترین محتوا است                                                  |

### چه زمانی نباید از پشتهسازی استفاده کرد

پشتهسازی همیشه بهتر نیست:

- **پیامهای ساده** (بدون خروجی ابزار) — یک Caveman یا Lite بهتنهایی کافی است
- **حساسیت به هزینه** — هر موتور حدود ~5-50ms تأخیر اضافه میکند
- **ابزارهای خاص** — برای خروجی shell معمولاً RTK بهتنهایی کافی است

### ساخت یک پایپلاین سفارشی

هیچ رجیستریای برای پایپلاینهای نامگذاریشده وجود ندارد. یک پایپلاین پشتهای صرفاً یک **آرایهٔ درونخطی
از مراحل** است که به `applyStackedCompression()` ارسال میشود (که از
`@omniroute/open-sse/services/compression/strategySelector` صادر شده است):

```ts
import { applyStackedCompression } from "@omniroute/open-sse/services/compression/strategySelector";

const result = applyStackedCompression(body, [
  { engine: "rtk", intensity: "aggressive" },
  { engine: "caveman", intensity: "full" },
]);
```

اگر پایپلاینی ارسال نکنید، بهطور پیشفرض از `rtk(standard) → caveman(full)` استفاده میشود.

برای کنترل آن از طریق پیکربندی، `mode: "stacked"` را تنظیم کنید و آرایهٔ مراحل را در
`stackedPipeline` قرار دهید (از `config.stackedPipeline` خوانده میشود):

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

## سیاست همگامسازی با بالادست

موتورهای فشردهسازی OmniRoute در README از چندین پروژهٔ بالادست نام بردهاند
("با الهام از RTK، Caveman، LLMLingua-2 و Troglodita"). یکی از پرسشهای رایج مشارکتکنندگان
این است: **وقتی RTK بالادست یک فیلتر ابزار جدید اضافه میکند یا Caveman یک بستهٔ
قواعد جدید میافزاید، این تغییر چگونه به OmniRoute میرسد؟** این بخش پاسخ رسمی و مرجع است.

### نسخههای وندورشده در برابر پیادهسازیهای مستقل

| موتور                        | رابطه با بالادست                                                                                                                 | محل                                                                 |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| **RTK**                      | **بازپیادهسازی مستقل** (الهامگرفته، نه کپی)                                                                                      | `open-sse/services/compression/engines/rtk/`                        |
| **Caveman**                  | **بازپیادهسازی مستقل** (الهامگرفته)                                                                                              | `open-sse/services/compression/engines/cavemanAdapter.ts`           |
| **Headroom**                 | عمدتاً داخلی؛ فقط کُدک `gcf/` بهطور **واقعی وندور شده است** و از `gcf-typescript` میآید (MIT، دارای نشان SPDX، فقط نمایهٔ عمومی) | `open-sse/services/compression/engines/headroom/gcf/`               |
| **LLMLingua-2 / Troglodita** | الهامگرفته (محرک موتورهای `llmlingua` + `session-dedup`)                                                                         | `open-sse/services/compression/engines/llmlingua/`, `session-dedup` |

نکتهٔ کلیدی: **RTK و Caveman پیادهسازیهای TypeScript اتاقپاک از
_ایدهها_ (قواعد فیلتر، بستههای قواعد) هستند، نه درختهای کد منبع وندورشده.** هیچ
کپی بالادستی وجود ندارد که بتوان از آن `git pull` کرد — و دقیقاً به همین دلیل README بهجای
"باندلشده" میگوید "الهامگرفته از".

### بهبودهای بالادست چگونه ادغام میشوند

بهطور طراحیشده، **هیچ ردیابی خودکاری برای انتشارهای بالادست و هیچ برچسب
`compression-sync`ای وجود ندارد**. از آنجا که موتورها بازپیادهسازی شدهاند، یک فیلتر
RTK بالادست یا بستهٔ قواعد Caveman بهصورت کد ادغام نمیشود؛ بلکه **بهعنوان یک
قاعده/فیلتر جدید در قالب اختصاصی OmniRoute بازبیان میشود** (نگاه کنید به
[COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md)) و بهصورت موردی از طریق
یک PR عادی وارد میشود. نقاط توسعهٔ بالا (موتور سفارشی، بستهٔ زبان، فیلتر RTK)
روشهای رسمی برای مشارکت در این زمینه هستند.

نمونههای اخیر از همین فرایند:

- فیلترهای RTK برای خروجی ساخت Gradle و `dotnet` (v3.8.42)
- فیلترهای RTK برای kubectl / docker-build / composer / gh (#2824)
- بستهٔ زبان اندونزیایی Caveman (#3975)، بهعلاوهٔ بستههای آلمانی / فرانسوی / ژاپنی / چینی

### Headroom (پراکسی فشردهسازی ورودی)

Headroom **کاملاً داخلی** است — یک اسنپشات وندورشده و پینشده از کُدک `gcf`، بههمراه
لایههای اختصاصی `smartcrusher` / `toon` / `tabular` متعلق به OmniRoute. فراتر از
نسخهٔ وندورشده، هیچ بالادست فعالی برای ردیابی وجود ندارد؛ بهروزرسانیهای `gcf`
هنگام تغییر کُدک بهصورت دستی تازهسازی میشوند و دوباره در برابر دروازهٔ بودجهٔ فشردهسازی
(`check:compression-budget`) اعتبارسنجی میشوند.

### پیشنهاد یک بهبود الهامگرفته از بالادست

1. **وندور نکنید** — قاعده/فیلتر بالادست را در قالب OmniRoute بازبیان کنید.
2. آن را از طریق نقطهٔ توسعهٔ منطبق در زیر اضافه کنید (بستهٔ زبان، فیلتر RTK یا
   موتور سفارشی).
3. در توضیحات PR به پروژهٔ بالادست ارجاع دهید (انتساب)، نه با
   کپیکردن کد منبع دارای مجوز آن.
4. تستها را اضافه کنید و تأیید کنید که دروازهٔ `check:compression-budget` همچنان با موفقیت رد میشود.

---

## افزودن یک سبک خروجی

سبکهای خروجی (جدول فهرست راهنما را در [اینجا](./COMPRESSION_GUIDE.md#output-styles-catalog) ببینید)
همتای سمت پاسخِ موتورهای ورودی هستند: بهجای فشردهسازی آنچه ارسال میکنید،
به مدل دستور میدهند خروجی کمهزینهتری تولید کند. رجیستری
`OUTPUT_STYLE_CATALOG` در `open-sse/services/compression/outputStyles/catalog.ts` قرار دارد و
**یک ورودی فهرست، کل قابلیت را تشکیل میدهد**: تزریقکننده، پنل تنظیمات داشبورد،
ماندگاری و تلهمتری، همگی فهرست را پیمایش میکنند — فهرست دیگری برای بهروزرسانی وجود ندارد.

1. **یک ورودی با `id`،‏ `label`،‏ `description` و سه `levels` انگلیسی
   (`lite`،‏ `full`،‏ `ultra`) به `OUTPUT_STYLE_CATALOG` اضافه کنید.** هر سطح باید با
   `${SHARED_BOUNDARIES}` پایان یابد تا کد، مسیرها، فرمانها، خطاها و URLها عیناً حفظ شوند.
   متن دستورالعمل باید برای هر `(id, level, language)` **ایستا و قطعی** باشد —
   `${SHARED_BOUNDARIES}` تنها درونیابی مجاز است.
2. **آن را ترجمه کنید.** دستکم یک بلوک `pt-BR` زیر `i18n` ارائه دهید؛ `ponytail` و
   `i-have-adhd` (en، pt-BR، es، de، fr، it، ru، zh، ja، id، vi) الگوی مرجع هستند. سبکی که عمداً
   تکزبانه است، بهجای آن `locale` را تنظیم میکند (مانند `terse-cjk` → `zh`) و سپس
   فقط در همان منطقه زبانی ارائه میشود.
3. **محافظ ماتریس را بهروزرسانی کنید** — زبانهای سبک را به `BASELINE_LANGUAGES` در
   `tests/unit/compression/output-styles-i18n-matrix.test.ts` اضافه کنید. این گیت، هر سبک جدیدی را
   که به منطقه زبانی محدود نشده و ترجمههای لازم را ندارد، رد میکند؛ مگر اینکه دارای یک
   ورودی صریح `KNOWN_ENGLISH_ONLY` همراه با یک مسئله پیگیری باشد.
4. **برای هر سبک یک آزمون اضافه کنید** که از
   `tests/unit/compression/i-have-adhd-catalog.test.ts` الگوبرداری شده باشد: ساختار فهرست، بند
   مرزبندی برای هر سطح و یک لنگر که تأیید کند هر ترجمه به زبان خودش نوشته شده
   و از متن انگلیسی کپی نشده است.
5. **انتساب**: اگر سبک از یک پروژه بالادستی اقتباس شده است، در یک توضیح منبع روی
   ورودی به آن اعتبار دهید (برای مثال `i-have-adhd` → ayghri/i-have-adhd، MIT) — همان
   قاعده بخش «پیشنهاد یک بهبود الهامگرفته از بالادست» در بالا اعمال میشود.

هیچ تغییری در رابط کاربری، شِما یا تلهمتری لازم نیست — این بخشها از روی فهرست رندر میشوند.

---

## بهترین شیوهها

### توسعه موتور

1. **همیشه `validateConfig` را پیادهسازی کنید** — موتورهای فاقد اعتبارسنجی باعث شکستهای خاموش میشوند
2. **برای `targetLatencyMs` مقدار واقعبینانه تعیین کنید** — انتخابگر راهبرد از آن برای انتخاب موتورها استفاده میکند
3. **برای داشبورد از `getConfigSchema` استفاده کنید** — هرگز پیکربندی را از کاربران پنهان نکنید
4. **اگر موتور شما خالص است، از `stackable: true` پشتیبانی کنید** — موتورهای دارای اثر جانبی نباید روی هم چیده شوند
5. **آزمونهای درونخطی بنویسید** — موتورهای باید در کمتر از ۱ ثانیه قابل راستیآزمایی باشند

### توسعه بسته زبان

1. **با شدت `lite` شروع کنید** — قواعد شما باید در پایینترین تنظیم ایمن باشند
2. **برای محدود کردن دامنه قواعد از `context` استفاده کنید** — قواعد مختص `user` نمیتوانند بهطور تصادفی اعلانهای سیستمی را تحت تأثیر قرار دهند
3. **از تطبیق دادن کلیدهای JSON خودداری کنید** — `\\bword\\b` میتواند داخل JSON تطبیق پیدا کند و دادههای ساختیافته را مختل کند
4. **با حالتهای مرزی آزمایش کنید** — ورودی خالی، یونیکد، متن راستبهچپ، ایموجیها
5. **از بستههای موجود بهعنوان الگو استفاده کنید** — `en/filler.json` توسعهیافتهترین نمونه است

### طراحی خط لوله

1. **پیش از بهینهسازی پروفایلگیری کنید** — ابتدا با `compression_stats` اندازهگیری کنید
2. **ترکیب را به پیادهسازی مجدد ترجیح دهید** — پیش از نوشتن یک موتور جدید، قواعد Caveman را گسترش دهید
3. **منطق ترتیب را مستند کنید** — توضیح دهید چرا موتور A پیش از موتور B قرار دارد
4. **در هر ۳ سطح شدت آزمایش کنید** — `lite` سریع اما همراه با اتلاف است؛ `ultra` کند اما دقیق است

---

## مرجع: موتورهای داخلی

| شناسه موتور          | قابلانباشت | stackPriority پیشفرض | اهداف                           |
| -------------------- | ---------- | -------------------- | ------------------------------- |
| `lite`               | بله        | 5                    | پیامها، نتایج ابزار             |
| `rtk`                | بله        | 10                   | نتایج ابزار                     |
| `standard` (caveman) | بله        | 20                   | پیامها، نتایج ابزار، بلوکهای کد |
| `aggressive`         | بله        | 30                   | پیامها                          |
| `ultra`              | بله        | 40                   | پیامها، بلوکهای کد              |

### همچنین ببینید

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — نمای کلی خط لوله
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — مرجع رجیستری موتور
- [COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md) — مشخصات قالب قوانین
- [COMPRESSION_LANGUAGE_PACKS.md](./COMPRESSION_LANGUAGE_PACKS.md) — جزئیات بستههای زبانی
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — موتور RTK و فیلترهای سفارشی
- منبع: `open-sse/services/compression/` (117 فایل، حدود 250KB)
