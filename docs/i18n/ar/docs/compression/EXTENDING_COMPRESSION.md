# Extending the Compression Pipeline (العربية)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/EXTENDING_COMPRESSION.md) · 🇪🇹 [am](../../../am/docs/compression/EXTENDING_COMPRESSION.md) · 🇦🇿 [az](../../../az/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇬 [bg](../../../bg/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇩 [bn](../../../bn/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇦 [bs](../../../bs/docs/compression/EXTENDING_COMPRESSION.md) · 🇨🇿 [cs](../../../cs/docs/compression/EXTENDING_COMPRESSION.md) · 🇩🇰 [da](../../../da/docs/compression/EXTENDING_COMPRESSION.md) · 🇩🇪 [de](../../../de/docs/compression/EXTENDING_COMPRESSION.md) · 🇬🇷 [el](../../../el/docs/compression/EXTENDING_COMPRESSION.md) · 🇪🇸 [es](../../../es/docs/compression/EXTENDING_COMPRESSION.md) · 🇪🇪 [et](../../../et/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇷 [fa](../../../fa/docs/compression/EXTENDING_COMPRESSION.md) · 🇫🇮 [fi](../../../fi/docs/compression/EXTENDING_COMPRESSION.md) · 🇫🇷 [fr](../../../fr/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇪 [ga](../../../ga/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [gu](../../../gu/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [ha](../../../ha/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇱 [he](../../../he/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [hi](../../../hi/docs/compression/EXTENDING_COMPRESSION.md) · 🇭🇷 [hr](../../../hr/docs/compression/EXTENDING_COMPRESSION.md) · 🇭🇺 [hu](../../../hu/docs/compression/EXTENDING_COMPRESSION.md) · 🇦🇲 [hy](../../../hy/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇩 [id](../../../id/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [ig](../../../ig/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇹 [it](../../../it/docs/compression/EXTENDING_COMPRESSION.md) · 🇯🇵 [ja](../../../ja/docs/compression/EXTENDING_COMPRESSION.md) · 🇬🇪 [ka](../../../ka/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇭 [km](../../../km/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [kn](../../../kn/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇷 [ko](../../../ko/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇹 [lt](../../../lt/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇻 [lv](../../../lv/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [ml](../../../ml/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [mr](../../../mr/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇾 [ms](../../../ms/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇹 [mt](../../../mt/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇲 [my](../../../my/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇵 [ne](../../../ne/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇱 [nl](../../../nl/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇴 [no](../../../no/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [or](../../../or/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [pa](../../../pa/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇭 [phi](../../../phi/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇱 [pl](../../../pl/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇹 [pt](../../../pt/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇴 [ro](../../../ro/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇺 [ru](../../../ru/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇰 [si](../../../si/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇰 [sk](../../../sk/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇮 [sl](../../../sl/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇸 [sr](../../../sr/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇪 [sv](../../../sv/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇪 [sw](../../../sw/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [ta](../../../ta/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [te](../../../te/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇭 [th](../../../th/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇷 [tr](../../../tr/docs/compression/EXTENDING_COMPRESSION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇰 [ur](../../../ur/docs/compression/EXTENDING_COMPRESSION.md) · 🇺🇿 [uz](../../../uz/docs/compression/EXTENDING_COMPRESSION.md) · 🇻🇳 [vi](../../../vi/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [yo](../../../yo/docs/compression/EXTENDING_COMPRESSION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/EXTENDING_COMPRESSION.md)

---

> **الخلاصة**: محرّك الضغط في OmniRoute **قابل للتوسعة** — يمكنك تسجيل محرّكات مخصّصة، وتوفير حزم لغات للغات جديدة، وتكوين مسارات معالجة متراصة. يوضّح هذا الدليل كيفية القيام بذلك.

**أدلة ذات صلة:**

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — نظرة عامة كاملة على مسار المعالجة
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — سجلّ المحرّكات والمحرّكات المضمّنة
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — محرّك RTK والمرشّحات المخصّصة
- [COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md) — مرجع تنسيق حزم القواعد

---

## نظرة عامة

يحتوي نظام الضغط على **3 نقاط توسعة**:

| نقطة التوسعة          | حالة الاستخدام                                                         | مستوى الصعوبة |
| --------------------- | ---------------------------------------------------------------------- | ------------- |
| **محرّك مخصّص**       | إضافة خوارزمية ضغط جديدة بالكامل (مثل أداة تلخيص متخصصة في نطاق معيّن) | متقدم         |
| **حزمة لغة**          | إضافة دعم للغة طبيعية جديدة (مثل الهندية أو العربية)                   | متوسط         |
| **مسار معالجة متراص** | تكوين محرّكات موجودة بترتيب مخصّص                                      | مبتدئ         |

```
┌─────────────────────────────────────────────────────────────┐
│                    استراتيجية الضغط                          │
│                                                              │
│   رسائل الإدخال ──▶ getEffectiveMode() ──▶ الوضع            │
│                                              │               │
│                      ┌───────────────────────┼──────────┐    │
│                      │         │         │         │    │    │
│                      ▼         ▼         ▼         ▼    │    │
│                   "rtk"    "lite"   "standard" "stacked"    │
│                      │         │         │         │    │    │
│                      ▼         ▼         ▼         ▼    │    │
│                   محرّك     محرّك     محرّك     engines[]   │
│                   RTK       Lite      Caveman   متسلسلة     │
│                      │         │         │         │    │    │
│                      └─────────┴─────────┴─────────┘    │    │
│                                      │                    │
│                                      ▼                    │
│                              المخرجات المضغوطة             │
└─────────────────────────────────────────────────────────────┘

يعتمد محدّد الاستراتيجية على الوضع: يحدّد كل طلب وضعًا واحدًا
(rtk / lite / standard / aggressive / ultra / stacked / off).
الوضع "stacked" وحده يربط عدة محرّكات بالتسلسل.
وضع التشغيل التلقائي الافتراضي هو "lite" (وليس سلسلة أولوية من 3 مستويات).
```

---

## كتابة محرّك ضغط مخصّص

واجهة المحرّك (`open-sse/services/compression/engines/types.ts`) هي العقد الذي يجب على كل محرّك استيفاؤه. وتتضمن 5 أساليب مطلوبة.

### واجهة `CompressionEngine`

```ts
interface CompressionEngine {
  id: string; // معرّف فريد للمحرّك
  name: string; // اسم العرض
  description: string; // وصف موجز
  icon: string; // أيقونة (رمز تعبيري أو عنوان URL)
  targets: CompressionEngineTarget[]; // ["messages", "tool_results", "code_blocks"]
  stackable: boolean; // ما إذا كان يمكن استخدامه في مسار معالجة متراص
  stackPriority: number; // الترتيب في مسارات المعالجة المتراصة (القيمة الأقل = أبكر)
  metadata: CompressionEngineMetadata;

  apply(body, options?): CompressionResult;
  compress(body, config?): CompressionResult;
  getConfigSchema(): EngineConfigField[];
  validateConfig(config): EngineValidationResult;
}
```

### مثال بسيط: محرّك المسافات البيضاء

أبسط محرّك ممكن — يزيل المسافات البيضاء الزائدة من الرسائل.

````ts
import type { CompressionEngine } from "omniroute/compression/engines/types";
import { registerCompressionEngine } from "omniroute/compression/engines/registry";

function preserveCodeBlocks(text: string): string {
  // التقسيم حسب علامات كتل التعليمات البرمجية مع الحفاظ على المسافات البيضاء داخلها
  const parts = text.split(/(```[\s\S]*?```)/);
  return parts
    .map((part) => {
      if (part.startsWith("```")) {
        return part; // لا تعدّل كتل التعليمات البرمجية
      }
      return part.replace(/\n{3,}/g, "\n\n"); // طبّق هذا على النص النثري فقط
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
  stackPriority: 100, // التشغيل بعد caveman/rtk

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

    // اجتز مصفوفة الرسائل — وتعامل مع كلٍ من المحتوى النصي والمحتوى متعدد الأجزاء
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
      // المحتوى متعدد الأجزاء: اجتز الأجزاء واضغط الأجزاء النصية فقط
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
          return part; // احتفظ بـ image_url وtool_use وما إلى ذلك.
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

// التسجيل عموميًا
registerCompressionEngine(whitespaceEngine);
````

### مكان وضع المحركات المخصصة

```
~/.omniroute/compression/engines/my-engine.ts    # على مستوى المستخدم
<project>/compression-engines/my-engine.ts        # على مستوى المشروع (يُحمّل عند بدء التشغيل)
```

أو حمّلها برمجيًا من إضافة:

```ts
// في إضافتك
import {
  registerCompressionEngine,
  unregisterCompressionEngine,
} from "@omniroute/open-sse/services/compression/engines/registry";
import { myEngine } from "./engines/my-engine";

export default definePlugin({
  name: "my-compression-plugin",
  // توفّر حزمة SDK الخاصة بالإضافة خطافات onRequest / onResponse / onError. سجّل
  // المحرك عند تحميل وحدة الإضافة (أو عند أول onRequest)؛ وألغِ تسجيله
  // من مسار التفكيك الخاص بك.
  onRequest: async (ctx) => {
    registerCompressionEngine(myEngine);
  },
});

// عند التفكيك:
// unregisterCompressionEngine("my-engine");
```

### اختبار محركك

سجّل محركك في إضافة أو دالة بدء تشغيل. بمجرد تسجيله، سيكون المحرك متاحًا
في محدد الاستراتيجية عبر `id` الخاص به. اختبر التكامل من خلال دمجه في مسار معالجة مكدّس:

---

## إنشاء حزم اللغات

يستخدم الضغط بأسلوب Caveman **حزم قواعد خاصة بكل لغة** للتعامل مع الكلمات الحشوية، والتعبيرات المتحفظة، والأنماط المطولة في كل لغة طبيعية. يأتي OmniRoute مزودًا بـ **6 حزم لغات**: `en`، و`es`، و`fr`، و`de`، و`ja`، و`pt-BR`.

### بنية الحزمة

حزمة اللغة هي دليل يحتوي على **ملفات JSON** ضمن `open-sse/services/compression/rules/<language>/`:

```
open-sse/services/compression/rules/
├── en/
│   ├── filler.json          # المجاملات، والتعبيرات المتحفظة، والعبارات المهذبة
│   ├── context.json         # قواعد تقليل السياق
│   ├── dedup.json           # قواعد إزالة التكرار
│   ├── structural.json      # علامات الترقيم والتنسيق
│   └── ultra.json           # قواعد الضغط المكثف
├── es/  (البنية نفسها)
├── fr/  (البنية نفسها)
├── de/  (البنية نفسها)
├── ja/  (البنية نفسها)
└── pt-BR/ (البنية نفسها)
```

### بنية القاعدة

تكون لكل قاعدة البنية التالية (من `open-sse/services/compression/ruleLoader.ts`):

```ts
interface FileRule {
  name: string; // اسم مقروء للبشر (بصيغة kebab-case)
  pattern: string; // نمط تعبير نمطي في JavaScript
  replacement?: string; // النص الذي سيحل محل المطابقة
  replacementMap?: Record<string, string>; // أو خريطة مفتاح→استبدال
  flags?: string; // أعلام التعبير النمطي ("gi" عادةً)
  context?: "all" | "user" | "system" | "assistant";
  category?: "filler" | "context" | "structural" | "dedup" | "terse" | "ultra";
  minIntensity?: "lite" | "full" | "ultra"; // التجاوز إذا كانت الشدة أدنى من هذه
  description?: string; // التوثيق
}
```

### مثال: إضافة قواعد الكلمات الحشوية للغة الهندية

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

### التحقق من الصحة

يجري التحقق من صحة حزم القواعد مقابل `_schema.json` عند تحميلها. سيفشل تحميل أي حزمة ذات بنية غير صحيحة، وسيُسجَّل خطأ:

```
RULE_LOADER: فشل التحقق من صحة الحزمة "hi/filler.json":
  - rules.0.pattern: تعبير نمطي غير صالح
  - rules.1.context: يجب أن يكون واحدًا من [all, user, system, assistant]
```

يُجرى التحقق من الصحة تلقائيًا عند تحميل حزمة (مقابل `_schema.json`)؛ وتُرفض الحزمة
غير الصالحة، ويُسجَّل الخطأ الموضح أعلاه. لا يوجد نص برمجي منفصل عبر
`npm run` للتحقق من صحة الحزم — حمّل الحزمة (على سبيل المثال، شغّل الخادم أو
نفّذ مسار الضغط) وراقب السجلات.

### تحميل حزمة لغة مخصصة

```ts
import { loadRulePack } from "omniroute/compression/ruleLoader";

await loadRulePack("./my-custom-rules/hi/filler.json");
```

أو ضعها في موقع معروف:

```
~/.omniroute/compression/rules/hi/filler.json  # على مستوى المستخدم
<project>/.compression/rules/hi/filler.json   # على مستوى المشروع
```

### أفضل الممارسات لحزم اللغات

1. **ابدأ بـ `filler`** — فهذه القواعد هي الأعلى تأثيرًا
2. **استخدم `minIntensity`** للتحكم في تطبيق القواعد المكثفة — فهذا يحمي من الضغط المفرط
3. **ضمّن حالات اختبار** — أضف مصفوفة `tests[]` إلى JSON للتحقق من السلوك
4. **الترتيب مهم** — تُطبّق القواعد الأسبق أولًا؛ لذا ضع القواعد الأعلى تأثيرًا في البداية
5. **كن متحفظًا مع `replacement`** — تكون السلسلة الفارغة صحيحة عادةً؛ ولا تُدخل محتوى جديدًا مطلقًا

### استراتيجية الترجمة

عند توطين حزم القواعد للغة جديدة:

1. **ترجم أسماء القواعد** — فهي تظهر في مخرجات تصحيح الأخطاء
2. **كيّف أنماط التعبيرات النمطية** — فالترجمة المباشرة غالبًا ما تفشل (إذ تختلف حدود الكلمات)
3. **اختبر باستخدام محادثات حقيقية** — يجب أن تكون الحزمة آمنة عند استخدامها مع مدخلات فعلية
4. **راعِ الأعراف الثقافية** — تحتوي الحزم اليابانية، على سبيل المثال، على عبارات تشريفية حشوية أكثر من الإنجليزية

---

## خطوط الأنابيب المكدّسة

يشغّل **خط الأنابيب المكدّس** عدة محركات بالتتابع، بحيث تُغذّي مخرجات كل محرك المحرك التالي. هكذا يعمل `mode: stacked` داخليًا.

### كيفية عمل التكديس

```
المدخلات (10,000 رمز)
        │
        ▼
   ┌──────────┐
   │  المحرك  │  الأولوية 10
   │  A       │  ──▶ المخرجات: 6,000 رمز (-40%)
   └────┬─────┘
        ▼
   ┌──────────┐
   │  المحرك  │  الأولوية 50
   │  B       │  ──▶ المخرجات: 2,400 رمز (-60%)
   └────┬─────┘
        ▼
   ┌──────────┐
   │  المحرك  │  الأولوية 100
   │  C       │  ──▶ المخرجات: 1,200 رمز (-80%)
   └────┬─────┘
        │
        ▼
المخرجات النهائية (1,200 رمز، توفير إجمالي ~88%)
```

عند تحديد `mode: "stacked"`، تُنفّذ المحركات بالتتابع وفق الترتيب المحدد في مصفوفة `pipeline`.
تصبح مخرجات المحرك N مدخلات للمحرك N+1.

### أوضاع الضغط

يحدد OmniRoute **وضعًا واحدًا لكل طلب** استنادًا إلى الإعدادات، وحدود التشغيل التلقائي، وتجاوزات التركيبات.
تُعرّف الأوضاع المتاحة في `open-sse/services/compression/types.ts` (النوع `CompressionMode`):

| الوضع        | المحركات             | حالة الاستخدام                                                                                                                                                                                            |
| ------------ | -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `off`        | لا شيء               | تعطيل جميع عمليات الضغط                                                                                                                                                                                   |
| `rtk`        | RTK فقط              | الجلسات كثيفة مخرجات الأوامر (توفير بنسبة 80%+)                                                                                                                                                           |
| `lite`       | Lite فقط             | ضغط محافظ (سريع وآمن)                                                                                                                                                                                     |
| `standard`   | Caveman              | ضغط النصوص النثرية باستخدام حزم اللغات                                                                                                                                                                    |
| `aggressive` | Caveman + Aggressive | ضغط مكثف للنصوص النثرية + تمريرة نهائية مكثفة                                                                                                                                                             |
| `ultra`      | Ultra                | أقصى ضغط (مع فقدان للبيانات، وملاذ أخير). يمكن توجيهه اختياريًا عبر محرك SLM المسمى **LLMLingua-2** عند تعيين `ultra.modelPath` (ويعود بأمان إلى المسار القائم على القواعد عندما لا يكون النموذج متاحًا). |
| `stacked`    | خط أنابيب مخصص       | تركيب المحركات بأي ترتيب (انظر أدناه)                                                                                                                                                                     |

> بالإضافة إلى محركات الأوضاع المذكورة أعلاه، يتضمن السجل أيضًا محركات متخصصة قابلة للتكديس —
> **CCR**، و**headroom**، و**ionizer**، و**session-dedup** — وهي موثقة في
> [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md#additional-built-in-engines).

يُحدَّد اختيار الوضع بواسطة `getEffectiveMode()` في `open-sse/services/compression/strategySelector.ts`:

1. إذا كان الضغط معطلًا: `"off"`
2. إذا وُجد تجاوز للتركيبة: استخدم التجاوز
3. إذا تم تجاوز حد التشغيل التلقائي: استخدم `autoTriggerMode` (الافتراضي: `"lite"`)
4. خلاف ذلك: استخدم `defaultMode`

### خط الأنابيب المكدّس الافتراضي

عند إعداد `mode: "stacked"` صراحةً، يركّب خط الأنابيب الافتراضي ما يلي:

1. **RTK** — إزالة الضوضاء من مخرجات الأوامر (توفير ~80% في مخرجات الطرفية)
2. **Caveman** — إزالة الحشو وجعل النص النثري أكثر إيجازًا (~46% من النص المتبقي)
3. **Lite** — تمريرة نهائية لإزالة المسافات البيضاء والتكرار

يحقق هذا التركيب **توفيرًا بنسبة 78-95%** في الجلسات كثيفة استخدام الأدوات.

### إعداد خطوط الأنابيب المكدّسة

في إعداد التركيبة:

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

يمكنك حذف محركات، أو إضافة محركات مخصصة، أو إعادة ترتيبها.

### تمرير الحالة

يمكن للمحركات قراءة البيانات الوصفية من سياق الطلب (في `options`):

```ts
compress(body, config) {
  // قراءة البيانات الوصفية من المحركات السابقة
  const original = options?.compressionComboId;  // "my-coding-combo"
  // ...
}
```

البيانات الوصفية **للقراءة فقط** — لا يمكن للمحركات تعديل سياق الطلب، بل يمكنها تعديل مخرجات المتن الخاصة بها فقط.

### محاذير ترتيب التنفيذ

| ترتيب المحركات                 | التأثير                                                                                    |
| ------------------------------ | ------------------------------------------------------------------------------------------ |
| RTK → Caveman → Lite           | **موصى به** (يزيل الضوضاء أولًا، ثم يعالج اللغة، ثم المسافات البيضاء)                      |
| Lite → RTK → Caveman           | سيئ — يزيل Lite المسافات البيضاء من المخرجات الخام، مما يؤدي إلى فشل مطابقة الأنماط في RTK |
| Caveman → RTK                  | سيئ — قد يعيد Caveman صياغة النص بطرق لا يتعرف عليها RTK                                   |
| أي ترتيب يبدأ بـ`tool_results` | أفضل — مخرجات الأدوات هي المحتوى الأكثر ضوضاءً                                             |

### متى يجب عدم استخدام التكديس

التكديس ليس دائمًا أفضل:

- **الرسائل البسيطة** (دون مخرجات أدوات) — يكفي استخدام Caveman أو Lite بمفرده
- **الحساسية للتكلفة** — يضيف كل محرك زمن استجابة يتراوح بين ~5-50ms
- **أدوات محددة** — عادةً ما يكون RTK وحده كافيًا لمخرجات shell

### إنشاء خط أنابيب مخصص

لا يوجد سجل لخطوط الأنابيب المُسمّاة. خط الأنابيب المتراكم هو مجرد **مصفوفة مضمنة
من الخطوات** تُمرَّر إلى `applyStackedCompression()` (المُصدَّرة من
`@omniroute/open-sse/services/compression/strategySelector`):

```ts
import { applyStackedCompression } from "@omniroute/open-sse/services/compression/strategySelector";

const result = applyStackedCompression(body, [
  { engine: "rtk", intensity: "aggressive" },
  { engine: "caveman", intensity: "full" },
]);
```

عندما لا تمرّر خط أنابيب، تكون القيمة الافتراضية هي `rtk(standard) → caveman(full)`.

للتحكم فيه من خلال الإعدادات، عيّن `mode: "stacked"` وقدّم مصفوفة الخطوات ضمن
`stackedPipeline` (تُقرأ من `config.stackedPipeline`):

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

## سياسة المزامنة مع المشاريع الأصلية

تنسب محركات الضغط في OmniRoute الفضل إلى عدة مشاريع أصلية في ملف README
("مستوحى من RTK وCaveman وLLMLingua-2 وTroglodita"). ومن الأسئلة الشائعة لدى المساهمين:
**عندما يضيف RTK مرشح أداة جديدًا أو تضيف Caveman حزمة قواعد، كيف يصل ذلك
إلى OmniRoute؟** يقدم هذا القسم الإجابة المرجعية المعتمدة.

### النُسخ المضمّنة مقابل التطبيقات المستقلة

| المحرك                       | العلاقة بالمشروع الأصلي                                                                                                                | الموقع                                                              |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| **RTK**                      | **إعادة تطبيق مستقلة** (مستوحاة منه وليست نسخة)                                                                                        | `open-sse/services/compression/engines/rtk/`                        |
| **Caveman**                  | **إعادة تطبيق مستقلة** (مستوحاة منه)                                                                                                   | `open-sse/services/compression/engines/cavemanAdapter.ts`           |
| **Headroom**                 | داخلي في معظمه؛ وحده برنامج الترميز `gcf/` **مضمّن فعليًا** من `gcf-typescript` (بترخيص MIT، وموسوم وفق SPDX، ولملف التعريف العام فقط) | `open-sse/services/compression/engines/headroom/gcf/`               |
| **LLMLingua-2 / Troglodita** | مستوحاة منهما (وهما أساس محركَي `llmlingua` و`session-dedup`)                                                                          | `open-sse/services/compression/engines/llmlingua/`، `session-dedup` |

النقطة الأساسية: **RTK وCaveman هما تطبيقا TypeScript مطوّران بأسلوب الغرفة النظيفة
للأفكار (قواعد الترشيح وحزم القواعد)، وليسا شجرتَي مصدر مضمّنتين.** لا توجد
نسخة من المشروع الأصلي يمكن تنفيذ `git pull` منها — وهذا تحديدًا سبب استخدام README
لعبارة "مستوحى من" بدلًا من "مضمّن".

### كيفية دمج التحسينات الواردة من المشاريع الأصلية

**لا توجد آلية آلية لتتبع إصدارات المشاريع الأصلية، ولا توجد تسمية `compression-sync`
— وذلك عن قصد.** نظرًا إلى أن المحركات عبارة عن عمليات إعادة تطبيق، فلا يُدمج مرشح RTK
أو حزمة قواعد Caveman من المشروع الأصلي على هيئة كود؛ بل **يُعاد التعبير عنه كقاعدة أو
مرشح جديد بتنسيق OmniRoute الخاص** (راجع
[COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md))، ويُضاف عند الحاجة عبر
طلب سحب عادي. نقاط التوسعة أعلاه (محرك مخصص، أو حزمة لغة، أو مرشح RTK)
هي الطريقة المعتمدة للمساهمة بأحدها.

أمثلة حديثة على هذا المسار تحديدًا:

- مرشحات RTK لمخرجات بناء Gradle و`dotnet` (v3.8.42)
- مرشحات RTK لـ kubectl / docker-build / composer / gh (#2824)
- حزمة اللغة الإندونيسية لـ Caveman (#3975)، بالإضافة إلى حزم الألمانية / الفرنسية / اليابانية / الصينية

### Headroom (وكيل ضغط الإدخال)

Headroom **داخلي بالكامل** — وهو لقطة مثبتة ومضمّنة من برنامج الترميز `gcf`، بالإضافة إلى
طبقات `smartcrusher` / `toon` / `tabular` الخاصة بـ OmniRoute. لا يوجد مشروع أصلي
نشط لتتبعه بخلاف النسخة المضمّنة؛ وتُحدّث نسخة `gcf` يدويًا عند تغيير برنامج الترميز،
ثم يُعاد التحقق منها مقابل بوابة ميزانية الضغط
(`check:compression-budget`).

### اقتراح تحسين مستوحى من مشروع أصلي

1. **لا تضمّن المصدر** — أعد التعبير عن القاعدة أو المرشح من المشروع الأصلي بتنسيق OmniRoute.
2. أضفه عبر نقطة التوسعة المطابقة أدناه (حزمة لغة، أو مرشح RTK، أو
   محرك مخصص).
3. أشِر إلى المشروع الأصلي في وصف طلب السحب (نسبًا للفضل)، بدلًا من
   نسخ مصدره الخاضع للترخيص.
4. أضف اختبارات وتأكد من استمرار اجتياز بوابة `check:compression-budget`.

---

## إضافة نمط إخراج

أنماط الإخراج (راجع [جدول الكتالوج في الدليل](./COMPRESSION_GUIDE.md#output-styles-catalog))
هي النظير في جانب الاستجابة لمحركات الإدخال: فبدلاً من ضغط ما
ترسله، توجّه النموذج لإنتاج مخرجات أقل تكلفة. السجل هو
`OUTPUT_STYLE_CATALOG` في `open-sse/services/compression/outputStyles/catalog.ts`، ويمثّل
**إدخال واحد في الكتالوج الميزة بأكملها**: إذ يقوم كل من المُحقِن، ولوحة إعدادات لوحة المعلومات،
والاستمرارية والقياس عن بُعد بتعداد الكتالوج — ولا توجد أي قائمة أخرى لتحديثها.

1. **أضف إدخالاً واحداً إلى `OUTPUT_STYLE_CATALOG`** يتضمن `id` و`label` و`description`
   و`levels` الإنجليزية الثلاثة (`lite` و`full` و`ultra`). يجب أن ينتهي كل مستوى بـ
   `${SHARED_BOUNDARIES}` لكي تبقى الشيفرة والمسارات والأوامر والأخطاء وعناوين URL كما هي حرفياً.
   يجب أن يكون نص التعليمات **ثابتاً وحتمياً** لكل
   `(id, level, language)` — والاستيفاء الوحيد المسموح به هو `${SHARED_BOUNDARIES}`.
2. **ترجمه.** وفّر كتلة `pt-BR` على الأقل ضمن `i18n`؛ ويُعدّ `ponytail` و
   `i-have-adhd` (en، pt-BR، es، de، fr، it، ru، zh، ja، id، vi) الشكل المرجعي. أما النمط أحادي اللغة عمداً
   فيضبط `locale` بدلاً من ذلك (مثل `terse-cjk` → `zh`)، وعندها لا يُعرض
   إلا ضمن تلك اللغة المحلية.
3. **حدّث حارس المصفوفة** — أضف لغات النمط إلى `BASELINE_LANGUAGES` في
   `tests/unit/compression/output-styles-i18n-matrix.test.ts`. تُفشل البوابة أي نمط جديد
   غير مقيّد بلغة محلية ولا يتضمن الترجمات المطلوبة، ما لم يحمل إدخالاً صريحاً في
   `KNOWN_ENGLISH_ONLY` يتضمن مشكلة تتبّع.
4. **أضف اختباراً خاصاً بكل نمط** على غرار
   `tests/unit/compression/i-have-adhd-catalog.test.ts`: بنية الكتالوج، وعبارة
   الحدود لكل مستوى، ونقطة تحقق تؤكد أن كل ترجمة مكتوبة بلغتها الخاصة
   بدلاً من أن تكون نسخة من الإنجليزية.
5. **الإسناد**: إذا كان النمط مقتبساً من مشروع أصلي، فانسب الفضل إليه في
   تعليق مصدر على الإدخال (مثلاً `i-have-adhd` → ayghri/i-have-adhd، MIT) — وهي
   القاعدة نفسها الواردة في «اقتراح تحسين مستوحى من مشروع أصلي» أعلاه.

لا يلزم إجراء أي تغيير على واجهة المستخدم أو المخطط أو القياس عن بُعد — فهذه الواجهات تُعرض انطلاقاً من الكتالوج.

---

## أفضل الممارسات

### تطوير المحركات

1. **نفّذ `validateConfig` دائماً** — تتسبب المحركات التي لا تتضمن تحققاً في إخفاقات صامتة
2. **اضبط `targetLatencyMs` على قيمة واقعية** — يستخدمه محدد الاستراتيجية لاختيار المحركات
3. **استخدم `getConfigSchema` للوحة المعلومات** — لا تُخفِ الإعدادات عن المستخدمين مطلقاً
4. **ادعم `stackable: true` إذا كان محركك نقياً** — يجب ألا تتراكم المحركات ذات الآثار الجانبية
5. **اكتب اختبارات مضمّنة** — ينبغي أن تكون المحركات قابلة للتحقق خلال أقل من ثانية واحدة

### تطوير حزم اللغات

1. **ابدأ بالشدة `lite`** — يجب أن تكون قواعدك آمنة عند أدنى إعداد
2. **استخدم `context` لتحديد نطاق القواعد** — لا يمكن للقواعد الخاصة بـ `user` فقط أن تؤثر عرضاً في مطالبات النظام
3. **تجنب التقاط مفاتيح JSON** — يمكن لـ `\\bword\\b` المطابقة داخل JSON، مما يفسد البيانات المهيكلة
4. **اختبر باستخدام الحالات الحدّية** — إدخال فارغ، وunicode، ونص RTL، ورموز تعبيرية
5. **استخدم الحزم الموجودة كقوالب** — يُعدّ `en/filler.json` المثال الأكثر تطوراً

### تصميم خط الأنابيب

1. **حلّل الأداء قبل التحسين** — ابدأ بالقياس باستخدام `compression_stats`
2. **فضّل التركيب على إعادة التنفيذ** — وسّع قواعد Caveman قبل كتابة محرك جديد
3. **وثّق مبررات الترتيب** — علّق موضحاً سبب وضع المحرك A قبل المحرك B
4. **اختبر عند مستويات الشدة الثلاثة كلها** — `lite` سريع لكنه فاقد للدقة، و`ultra` بطيء لكنه دقيق

---

## مرجع: المحركات المدمجة

| معرّف المحرك         | قابل للتكديس | أولوية التكديس الافتراضية | الأهداف                            |
| -------------------- | ------------ | ------------------------- | ---------------------------------- |
| `lite`               | نعم          | 5                         | الرسائل، نتائج الأدوات             |
| `rtk`                | نعم          | 10                        | نتائج الأدوات                      |
| `standard` (caveman) | نعم          | 20                        | الرسائل، نتائج الأدوات، كتل الشفرة |
| `aggressive`         | نعم          | 30                        | الرسائل                            |
| `ultra`              | نعم          | 40                        | الرسائل، كتل الشفرة                |

### انظر أيضًا

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — نظرة عامة على مسار المعالجة
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — مرجع سجل المحركات
- [COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md) — مواصفات تنسيق القواعد
- [COMPRESSION_LANGUAGE_PACKS.md](./COMPRESSION_LANGUAGE_PACKS.md) — تفاصيل حزم اللغات
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — محرك RTK والمرشحات المخصصة
- المصدر: `open-sse/services/compression/` (117 ملفًا، ~250KB)
