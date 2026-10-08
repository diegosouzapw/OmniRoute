# Extending the Compression Pipeline (ខ្មែរ)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/EXTENDING_COMPRESSION.md) · 🇪🇹 [am](../../../am/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇦 [ar](../../../ar/docs/compression/EXTENDING_COMPRESSION.md) · 🇦🇿 [az](../../../az/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇬 [bg](../../../bg/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇩 [bn](../../../bn/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇦 [bs](../../../bs/docs/compression/EXTENDING_COMPRESSION.md) · 🇨🇿 [cs](../../../cs/docs/compression/EXTENDING_COMPRESSION.md) · 🇩🇰 [da](../../../da/docs/compression/EXTENDING_COMPRESSION.md) · 🇩🇪 [de](../../../de/docs/compression/EXTENDING_COMPRESSION.md) · 🇬🇷 [el](../../../el/docs/compression/EXTENDING_COMPRESSION.md) · 🇪🇸 [es](../../../es/docs/compression/EXTENDING_COMPRESSION.md) · 🇪🇪 [et](../../../et/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇷 [fa](../../../fa/docs/compression/EXTENDING_COMPRESSION.md) · 🇫🇮 [fi](../../../fi/docs/compression/EXTENDING_COMPRESSION.md) · 🇫🇷 [fr](../../../fr/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇪 [ga](../../../ga/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [gu](../../../gu/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [ha](../../../ha/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇱 [he](../../../he/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [hi](../../../hi/docs/compression/EXTENDING_COMPRESSION.md) · 🇭🇷 [hr](../../../hr/docs/compression/EXTENDING_COMPRESSION.md) · 🇭🇺 [hu](../../../hu/docs/compression/EXTENDING_COMPRESSION.md) · 🇦🇲 [hy](../../../hy/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇩 [id](../../../id/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [ig](../../../ig/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇹 [it](../../../it/docs/compression/EXTENDING_COMPRESSION.md) · 🇯🇵 [ja](../../../ja/docs/compression/EXTENDING_COMPRESSION.md) · 🇬🇪 [ka](../../../ka/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [kn](../../../kn/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇷 [ko](../../../ko/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇹 [lt](../../../lt/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇻 [lv](../../../lv/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [ml](../../../ml/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [mr](../../../mr/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇾 [ms](../../../ms/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇹 [mt](../../../mt/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇲 [my](../../../my/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇵 [ne](../../../ne/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇱 [nl](../../../nl/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇴 [no](../../../no/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [or](../../../or/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [pa](../../../pa/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇭 [phi](../../../phi/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇱 [pl](../../../pl/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇹 [pt](../../../pt/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇴 [ro](../../../ro/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇺 [ru](../../../ru/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇰 [si](../../../si/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇰 [sk](../../../sk/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇮 [sl](../../../sl/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇸 [sr](../../../sr/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇪 [sv](../../../sv/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇪 [sw](../../../sw/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [ta](../../../ta/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [te](../../../te/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇭 [th](../../../th/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇷 [tr](../../../tr/docs/compression/EXTENDING_COMPRESSION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇰 [ur](../../../ur/docs/compression/EXTENDING_COMPRESSION.md) · 🇺🇿 [uz](../../../uz/docs/compression/EXTENDING_COMPRESSION.md) · 🇻🇳 [vi](../../../vi/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [yo](../../../yo/docs/compression/EXTENDING_COMPRESSION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/EXTENDING_COMPRESSION.md)

---

> **សរុបខ្លី**: ម៉ាស៊ីនបង្ហាប់របស់ OmniRoute គឺ **អាចបន្ថែមផ្នែកបាន** — អ្នកអាចចុះឈ្មោះម៉ាស៊ីនផ្ទាល់ខ្លួន ផ្តល់កញ្ចប់ភាសាសម្រាប់ភាសាថ្មីៗ និងផ្សំបំពង់ដំណើរការជាជង់។ មគ្គុទ្ទេសក៍នេះបង្ហាញពីរបៀបធ្វើ។

**មគ្គុទ្ទេសក៍ពាក់ព័ន្ធ:**

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — ទិដ្ឋភាពទូទៅពេញលេញនៃបំពង់ដំណើរការ
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — បញ្ជីចុះឈ្មោះម៉ាស៊ីន និងម៉ាស៊ីនដែលមានស្រាប់
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — ម៉ាស៊ីន RTK និងតម្រងផ្ទាល់ខ្លួន
- [COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md) — ឯកសារយោងអំពីទម្រង់កញ្ចប់ច្បាប់

---

## ទិដ្ឋភាពទូទៅ

ប្រព័ន្ធបង្ហាប់មាន **ចំណុចពង្រីកចំនួន 3**:

| ចំណុចពង្រីក            | ករណីប្រើប្រាស់                                                          | កម្រិតលំបាក |
| ---------------------- | ----------------------------------------------------------------------- | ----------- |
| **ម៉ាស៊ីនផ្ទាល់ខ្លួន** | បន្ថែមក្បួនដោះស្រាយបង្ហាប់ថ្មីទាំងស្រុង (ឧ. ឧបករណ៍សង្ខេបជាក់លាក់តាមដែន) | កម្រិតខ្ពស់ |
| **កញ្ចប់ភាសា**         | បន្ថែមការគាំទ្រសម្រាប់ភាសាធម្មជាតិថ្មីមួយ (ឧ. ភាសាហិណ្ឌី ភាសាអារ៉ាប់)   | មធ្យម       |
| **បំពង់ដំណើរការជាជង់** | ផ្សំម៉ាស៊ីនដែលមានស្រាប់តាមលំដាប់ផ្ទាល់ខ្លួន                             | ដំបូង       |

```
┌─────────────────────────────────────────────────────────────┐
│                    យុទ្ធសាស្ត្របង្ហាប់                       │
│                                                              │
│   សារបញ្ចូល ──▶ getEffectiveMode() ──▶ mode                  │
│                                              │               │
│                      ┌───────────────────────┼──────────┐    │
│                      │         │         │         │    │    │
│                      ▼         ▼         ▼         ▼    │    │
│                   "rtk"    "lite"   "standard" "stacked"    │
│                      │         │         │         │    │    │
│                      ▼         ▼         ▼         ▼    │    │
│                   RTK       Lite     Caveman   engines[]   │
│                   ម៉ាស៊ីន    ម៉ាស៊ីន    ម៉ាស៊ីន    ភ្ជាប់បន្តគ្នា │
│                      │         │         │         │    │    │
│                      └─────────┴─────────┴─────────┘    │    │
│                                      │                    │
│                                      ▼                    │
│                             លទ្ធផលដែលបានបង្ហាប់             │
└─────────────────────────────────────────────────────────────┘

កម្មវិធីជ្រើសរើសយុទ្ធសាស្ត្រគឺផ្អែកលើ MODE: សំណើនីមួយៗជ្រើសរើស mode តែមួយ
(rtk / lite / standard / aggressive / ultra / stacked / off)។
មានតែ mode "stacked" ប៉ុណ្ណោះដែលភ្ជាប់ម៉ាស៊ីនច្រើនជាបន្តបន្ទាប់។
mode កេះដោយស្វ័យប្រវត្តិតាមលំនាំដើមគឺ "lite" (មិនមែនជាខ្សែសង្វាក់អាទិភាព 3 កម្រិតទេ)។
```

---

## ការសរសេរម៉ាស៊ីនបង្ហាប់ផ្ទាល់ខ្លួន

អ៊ីនធើហ្វេសរបស់ម៉ាស៊ីន (`open-sse/services/compression/engines/types.ts`) គឺជាកិច្ចសន្យាដែលម៉ាស៊ីននីមួយៗត្រូវតែបំពេញ។ វាមានមេតូតចាំបាច់ចំនួន 5។

### អ៊ីនធើហ្វេស `CompressionEngine`

```ts
interface CompressionEngine {
  id: string; // ID ម៉ាស៊ីនតែមួយគត់
  name: string; // ឈ្មោះសម្រាប់បង្ហាញ
  description: string; // សេចក្ដីពិពណ៌នាខ្លី
  icon: string; // រូបតំណាង (emoji ឬ URL)
  targets: CompressionEngineTarget[]; // ["messages", "tool_results", "code_blocks"]
  stackable: boolean; // អាចប្រើក្នុងបំពង់ដំណើរការជាជង់
  stackPriority: number; // លំដាប់ក្នុងបំពង់ដំណើរការជាជង់ (តម្លៃទាបជាង = ដំណើរការមុន)
  metadata: CompressionEngineMetadata;

  apply(body, options?): CompressionResult;
  compress(body, config?): CompressionResult;
  getConfigSchema(): EngineConfigField[];
  validateConfig(config): EngineValidationResult;
}
```

### ឧទាហរណ៍អប្បបរមា: ម៉ាស៊ីនដកចន្លោះទទេ

ម៉ាស៊ីនដ៏សាមញ្ញបំផុត — ដកចន្លោះទទេដែលលើសចេញពីសារ។

````ts
import type { CompressionEngine } from "omniroute/compression/engines/types";
import { registerCompressionEngine } from "omniroute/compression/engines/registry";

function preserveCodeBlocks(text: string): string {
  // បំបែកតាមសញ្ញាសម្គាល់ប្លុកកូដ ហើយរក្សាគម្លាតខាងក្នុងប្លុកទាំងនោះ
  const parts = text.split(/(```[\s\S]*?```)/);
  return parts
    .map((part) => {
      if (part.startsWith("```")) {
        return part; // កុំកែប្រែប្លុកកូដ
      }
      return part.replace(/\n{3,}/g, "\n\n"); // អនុវត្តតែលើអត្ថបទធម្មតាប៉ុណ្ណោះ
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
  stackPriority: 100, // ដំណើរការបន្ទាប់ពី caveman/rtk

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

    // ឆ្លងកាត់អារេសារ — ដោះស្រាយទាំងខ្លឹមសារខ្សែអក្សរ និងខ្លឹមសារច្រើនផ្នែក
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
      // ខ្លឹមសារច្រើនផ្នែក៖ ឆ្លងកាត់ផ្នែកនីមួយៗ ហើយបង្ហាប់តែផ្នែកអត្ថបទប៉ុណ្ណោះ
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
          return part; // រក្សាទុក image_url, tool_use ជាដើម។
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

// ចុះឈ្មោះជាសកល
registerCompressionEngine(whitespaceEngine);
````

### កន្លែងដាក់ម៉ាស៊ីនផ្ទាល់ខ្លួន

```
~/.omniroute/compression/engines/my-engine.ts    # កម្រិតអ្នកប្រើប្រាស់
<project>/compression-engines/my-engine.ts        # កម្រិតគម្រោង (ត្រូវបានផ្ទុកនៅពេលចាប់ផ្ដើម)
```

ឬផ្ទុកតាមកម្មវិធីពីកម្មវិធីជំនួយ៖

```ts
// នៅក្នុងកម្មវិធីជំនួយរបស់អ្នក
import {
  registerCompressionEngine,
  unregisterCompressionEngine,
} from "@omniroute/open-sse/services/compression/engines/registry";
import { myEngine } from "./engines/my-engine";

export default definePlugin({
  name: "my-compression-plugin",
  // SDK របស់កម្មវិធីជំនួយផ្ដល់ hook onRequest / onResponse / onError។ ចុះឈ្មោះ
  // ម៉ាស៊ីននៅពេលម៉ូឌុលកម្មវិធីជំនួយត្រូវបានផ្ទុក (ឬនៅ onRequest ដំបូង) ហើយលុបការចុះឈ្មោះវា
  // ពីដំណើរការបិទរបស់អ្នកផ្ទាល់។
  onRequest: async (ctx) => {
    registerCompressionEngine(myEngine);
  },
});

// នៅពេលបិទ៖
// unregisterCompressionEngine("my-engine");
```

### ការសាកល្បងម៉ាស៊ីនរបស់អ្នក

ចុះឈ្មោះម៉ាស៊ីនរបស់អ្នកនៅក្នុងកម្មវិធីជំនួយ ឬអនុគមន៍ចាប់ផ្ដើម។ បន្ទាប់ពីបានចុះឈ្មោះ ម៉ាស៊ីននឹងមាននៅក្នុងកម្មវិធីជ្រើសរើសយុទ្ធសាស្ត្រតាមរយៈ `id` របស់វា។ សាកល្បងការរួមបញ្ចូលដោយផ្សំវានៅក្នុងបំពង់ដំណើរការជង់៖

---

## ការបង្កើតកញ្ចប់ភាសា

ការបង្ហាប់បែប Caveman ប្រើ **កញ្ចប់ច្បាប់ជាក់លាក់តាមភាសា** ដើម្បីដោះស្រាយពាក្យបំពេញ ការប្រើពាក្យបន្ទន់អត្ថន័យ និងលំនាំពាក្យវែងអន្លាយក្នុងភាសាធម្មជាតិនីមួយៗ។ OmniRoute ភ្ជាប់មកជាមួយ **កញ្ចប់ភាសាចំនួន 6**៖ `en`, `es`, `fr`, `de`, `ja`, `pt-BR`។

### រចនាសម្ព័ន្ធកញ្ចប់

កញ្ចប់ភាសាគឺជាថតឯកសារមួយដែលមាន **ឯកសារ JSON** នៅក្រោម `open-sse/services/compression/rules/<language>/`៖

```
open-sse/services/compression/rules/
├── en/
│   ├── filler.json          # ពាក្យគួរសម ការប្រើពាក្យបន្ទន់អត្ថន័យ និងសុជីវធម៌
│   ├── context.json         # ច្បាប់កាត់បន្ថយបរិបទ
│   ├── dedup.json           # ច្បាប់លុបខ្លឹមសារស្ទួន
│   ├── structural.json      # វណ្ណយុត្តិ និងទ្រង់ទ្រាយ
│   └── ultra.json           # ច្បាប់បង្ហាប់ខ្លាំង
├── es/  (រចនាសម្ព័ន្ធដូចគ្នា)
├── fr/  (រចនាសម្ព័ន្ធដូចគ្នា)
├── de/  (រចនាសម្ព័ន្ធដូចគ្នា)
├── ja/  (រចនាសម្ព័ន្ធដូចគ្នា)
└── pt-BR/ (រចនាសម្ព័ន្ធដូចគ្នា)
```

### រចនាសម្ព័ន្ធរបស់ច្បាប់

ច្បាប់នីមួយៗមានទម្រង់ដូចខាងក្រោម (ពី `open-sse/services/compression/ruleLoader.ts`)៖

```ts
interface FileRule {
  name: string; // ឈ្មោះដែលមនុស្សអាចអានបាន (kebab-case)
  pattern: string; // លំនាំ regex របស់ JavaScript
  replacement?: string; // អ្វីដែលត្រូវប្រើជំនួសផ្នែកដែលត្រូវគ្នា
  replacementMap?: Record<string, string>; // ឬផែនទី key→replacement
  flags?: string; // ទង់ regex (ជាទូទៅគឺ "gi")
  context?: "all" | "user" | "system" | "assistant";
  category?: "filler" | "context" | "structural" | "dedup" | "terse" | "ultra";
  minIntensity?: "lite" | "full" | "ultra"; // រំលង ប្រសិនបើកម្រិតខ្លាំងទាបជាងនេះ
  description?: string; // ឯកសារពន្យល់
}
```

### ឧទាហរណ៍៖ ការបន្ថែមច្បាប់ពាក្យបំពេញសម្រាប់ភាសាហិណ្ឌី

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
      "description": "លុបពាក្យផ្តើមប្រកបដោយសុជីវធម៌ដូចជា 'नमस्ते'"
    },
    {
      "name": "filler_actually",
      "pattern": "\\b(?:असल में|वास्तव में|दरअसल)\\b\\s*",
      "replacement": "",
      "context": "all",
      "category": "filler",
      "minIntensity": "lite",
      "description": "លុបពាក្យបំពេញដែលមានន័យថា 'តាមពិត'"
    },
    {
      "name": "verbose_plea",
      "pattern": "\\b(?:कृपया|कृपया आप|अनुरोध है कि आप)\\b\\s*",
      "replacement": "",
      "context": "all",
      "category": "filler",
      "minIntensity": "full",
      "description": "លុបពាក្យដែលមានន័យថា 'សូម' ក្នុងភាសាហិណ្ឌី"
    }
  ]
}
```

### ការផ្ទៀងផ្ទាត់

កញ្ចប់ច្បាប់ត្រូវបានផ្ទៀងផ្ទាត់ជាមួយ `_schema.json` នៅពេលផ្ទុក។ កញ្ចប់ដែលមានរចនាសម្ព័ន្ធមិនត្រឹមត្រូវនឹងមិនអាចផ្ទុកបាន ហើយកំហុសនឹងត្រូវបានកត់ត្រា៖

```
RULE_LOADER: កញ្ចប់ "hi/filler.json" មិនបានឆ្លងកាត់ការផ្ទៀងផ្ទាត់៖
  - rules.0.pattern: regex មិនត្រឹមត្រូវ
  - rules.1.context: ត្រូវតែជាតម្លៃមួយក្នុងចំណោម [all, user, system, assistant]
```

ការផ្ទៀងផ្ទាត់ដំណើរការដោយស្វ័យប្រវត្តិនៅពេលកញ្ចប់ត្រូវបានផ្ទុក (ដោយផ្ទៀងផ្ទាត់ជាមួយ `_schema.json`)។ កញ្ចប់ដែលមិនត្រឹមត្រូវត្រូវបានបដិសេធ ហើយកំហុសខាងលើត្រូវបានកត់ត្រា។ មិនមានស្គ្រីប `npm run` ដាច់ដោយឡែកសម្រាប់ផ្ទៀងផ្ទាត់កញ្ចប់ទេ — ផ្ទុកកញ្ចប់ (ឧ. ចាប់ផ្តើមម៉ាស៊ីនបម្រើ ឬដំណើរការតាមផ្លូវបង្ហាប់) រួចតាមដានកំណត់ហេតុ។

### ការផ្ទុកកញ្ចប់ភាសាផ្ទាល់ខ្លួន

```ts
import { loadRulePack } from "omniroute/compression/ruleLoader";

await loadRulePack("./my-custom-rules/hi/filler.json");
```

ឬដាក់វានៅទីតាំងដែលប្រព័ន្ធស្គាល់៖

```
~/.omniroute/compression/rules/hi/filler.json  # កម្រិតអ្នកប្រើ
<project>/.compression/rules/hi/filler.json   # កម្រិតគម្រោង
```

### ការអនុវត្តល្អបំផុតសម្រាប់កញ្ចប់ភាសា

1. **ចាប់ផ្តើមជាមួយ `filler`** — ទាំងនេះជាច្បាប់ដែលមានឥទ្ធិពលខ្ពស់បំផុត
2. **ប្រើ `minIntensity`** ដើម្បីគ្រប់គ្រងច្បាប់ដែលមានលក្ខណៈខ្លាំង — វាជួយការពារការបង្ហាប់ហួសកម្រិត
3. **រួមបញ្ចូលករណីសាកល្បង** — បន្ថែមអារេ `tests[]` ក្នុង JSON ដើម្បីផ្ទៀងផ្ទាត់ឥរិយាបថ
4. **លំដាប់មានសារៈសំខាន់** — ច្បាប់នៅមុនត្រូវបានអនុវត្តមុន ដូច្នេះត្រូវដាក់ច្បាប់ដែលមានឥទ្ធិពលខ្ពស់នៅមុន
5. **ប្រុងប្រយ័ត្នជាមួយ `replacement`** — ជាធម្មតា ខ្សែអក្សរទទេគឺត្រឹមត្រូវ ហើយមិនត្រូវបញ្ចូលខ្លឹមសារថ្មីឡើយ

### យុទ្ធសាស្ត្របកប្រែ

នៅពេលធ្វើមូលដ្ឋានីយកម្មកញ្ចប់ច្បាប់ទៅជាភាសាថ្មី៖

1. **បកប្រែឈ្មោះច្បាប់** — ឈ្មោះទាំងនេះបង្ហាញក្នុងលទ្ធផលបំបាត់កំហុស
2. **កែសម្រួលលំនាំ regex** — ការបកប្រែដោយផ្ទាល់ជាញឹកញាប់មិនដំណើរការទេ (ព្រំដែនពាក្យខុសគ្នា)
3. **សាកល្បងជាមួយការសន្ទនាពិតប្រាកដ** — កញ្ចប់គួរតែមានសុវត្ថិភាពនៅពេលប្រើជាមួយទិន្នន័យបញ្ចូលជាក់ស្តែង
4. **ឱ្យស្របតាមទំនៀមទម្លាប់វប្បធម៌** — ឧទាហរណ៍ កញ្ចប់ភាសាជប៉ុនមានពាក្យបំពេញបែបកិត្តិយសច្រើនជាងភាសាអង់គ្លេស

---

## បំពង់ដំណើរការតម្រៀបជាស្រទាប់

**បំពង់ដំណើរការតម្រៀបជាស្រទាប់** ដំណើរការម៉ាស៊ីនជាច្រើនតាមលំដាប់ ដោយលទ្ធផលរបស់ម៉ាស៊ីននីមួយៗត្រូវបានបញ្ជូនជាទិន្នន័យបញ្ចូលទៅឱ្យម៉ាស៊ីនបន្ទាប់។ នេះជារបៀបដែល `mode: stacked` ដំណើរការនៅខាងក្នុង។

### របៀបដែលការតម្រៀបជាស្រទាប់ដំណើរការ

```
ទិន្នន័យបញ្ចូល (10,000 tokens)
        │
        ▼
   ┌──────────┐
   │  ម៉ាស៊ីន  │  អាទិភាព 10
   │  A       │  ──▶ លទ្ធផល: 6,000 tokens (-40%)
   └────┬─────┘
        ▼
   ┌──────────┐
   │  ម៉ាស៊ីន  │  អាទិភាព 50
   │  B       │  ──▶ លទ្ធផល: 2,400 tokens (-60%)
   └────┬─────┘
        ▼
   ┌──────────┐
   │  ម៉ាស៊ីន  │  អាទិភាព 100
   │  C       │  ──▶ លទ្ធផល: 1,200 tokens (-80%)
   └────┬─────┘
        │
        ▼
លទ្ធផលចុងក្រោយ (1,200 tokens, សន្សំបានសរុប ~88%)
```

នៅពេលជ្រើសរើស `mode: "stacked"` ម៉ាស៊ីននានានឹងដំណើរការតាមលំដាប់ដែលបានបញ្ជាក់ក្នុងអារេ `pipeline`។
លទ្ធផលរបស់ម៉ាស៊ីន N ក្លាយជាទិន្នន័យបញ្ចូលរបស់ម៉ាស៊ីន N+1។

### របៀបបង្ហាប់

OmniRoute ជ្រើសរើស **របៀបតែមួយក្នុងសំណើនីមួយៗ** ដោយផ្អែកលើការកំណត់រចនាសម្ព័ន្ធ កម្រិតកំណត់កេះដោយស្វ័យប្រវត្តិ និងការកំណត់ជំនួសរបស់បន្សំ។
របៀបដែលអាចប្រើបានត្រូវបានកំណត់នៅក្នុង `open-sse/services/compression/types.ts` (ប្រភេទ `CompressionMode`)៖

| របៀប         | ម៉ាស៊ីន                  | ករណីប្រើប្រាស់                                                                                                                                                                                  |
| ------------ | ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `off`        | គ្មាន                    | បិទការបង្ហាប់ទាំងអស់                                                                                                                                                                            |
| `rtk`        | តែ RTK                   | សម័យការងារដែលមានលទ្ធផលពាក្យបញ្ជាច្រើន (សន្សំបាន 80%+)                                                                                                                                           |
| `lite`       | តែ Lite                  | ការបង្ហាប់បែបប្រុងប្រយ័ត្ន (លឿន មានសុវត្ថិភាព)                                                                                                                                                  |
| `standard`   | Caveman                  | ការបង្ហាប់អត្ថបទរៀបរាប់ដោយប្រើកញ្ចប់ភាសា                                                                                                                                                        |
| `aggressive` | Caveman + Aggressive     | អត្ថបទរៀបរាប់បែបខ្លាំងក្លា + ដំណាក់កាលបង្ហាប់ចុងក្រោយបែបខ្លាំងក្លា                                                                                                                              |
| `ultra`      | Ultra                    | ការបង្ហាប់អតិបរមា (បាត់បង់ទិន្នន័យ និងប្រើជាជម្រើសចុងក្រោយ)។ អាចបញ្ជូនតាមម៉ាស៊ីន SLM **LLMLingua-2** នៅពេលកំណត់ `ultra.modelPath` (បន្តដំណើរការតាមផ្លូវផ្អែកលើច្បាប់ នៅពេលម៉ូដែលមិនអាចប្រើបាន)។ |
| `stacked`    | បំពង់ដំណើរការផ្ទាល់ខ្លួន | ផ្គុំម៉ាស៊ីនតាមលំដាប់ណាមួយ (សូមមើលខាងក្រោម)                                                                                                                                                     |

> ក្រៅពីម៉ាស៊ីនតាមរបៀបខាងលើ បញ្ជីចុះឈ្មោះក៏ផ្តល់នូវម៉ាស៊ីនឯកទេសដែលអាចតម្រៀបជាស្រទាប់បានផងដែរ —
> **CCR**, **headroom**, **ionizer** និង **session-dedup** — ដែលមានឯកសារពន្យល់នៅក្នុង
> [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md#additional-built-in-engines)។

ការជ្រើសរើសរបៀបត្រូវបានកំណត់ដោយ `getEffectiveMode()` នៅក្នុង `open-sse/services/compression/strategySelector.ts`៖

1. ប្រសិនបើការបង្ហាប់ត្រូវបានបិទ៖ `"off"`
2. ប្រសិនបើមានការកំណត់ជំនួសរបស់បន្សំ៖ ប្រើការកំណត់ជំនួសនោះ
3. ប្រសិនបើលើសកម្រិតកំណត់កេះដោយស្វ័យប្រវត្តិ៖ ប្រើ `autoTriggerMode` (លំនាំដើម៖ `"lite"`)
4. បើមិនដូច្នោះទេ៖ ប្រើ `defaultMode`

### បំពង់ដំណើរការតម្រៀបជាស្រទាប់លំនាំដើម

នៅពេលកំណត់ `mode: "stacked"` ដោយជាក់លាក់ បំពង់ដំណើរការលំនាំដើមនឹងផ្គុំ៖

1. **RTK** — លុបភាពរំខានចេញពីលទ្ធផលពាក្យបញ្ជា (សន្សំបាន ~80% លើលទ្ធផល terminal)
2. **Caveman** — លុបពាក្យអត់ប្រយោជន៍ និងធ្វើឱ្យអត្ថបទរៀបរាប់កាន់តែខ្លីខ្លឹម (~46% លើអត្ថបទដែលនៅសល់)
3. **Lite** — ដំណាក់កាលចុងក្រោយសម្រាប់ដកដកឃ្លា និងលុបមាតិកាស្ទួន

ការផ្គុំនេះសម្រេចបាននូវ **ការសន្សំ 78-95%** លើសម័យការងារដែលប្រើឧបករណ៍ច្រើន។

### ការកំណត់រចនាសម្ព័ន្ធបំពង់ដំណើរការតម្រៀបជាស្រទាប់

នៅក្នុងការកំណត់រចនាសម្ព័ន្ធបន្សំ៖

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

អ្នកអាចរំលងម៉ាស៊ីន បន្ថែមម៉ាស៊ីនផ្ទាល់ខ្លួន ឬរៀបលំដាប់ពួកវាឡើងវិញ។

### ការបញ្ជូនស្ថានភាព

ម៉ាស៊ីនអាចអានទិន្នន័យមេតាពីបរិបទនៃសំណើ (នៅក្នុង `options`)៖

```ts
compress(body, config) {
  // អានទិន្នន័យមេតាពីម៉ាស៊ីនមុនៗ
  const original = options?.compressionComboId;  // "my-coding-combo"
  // ...
}
```

ទិន្នន័យមេតាគឺ **បានតែអានប៉ុណ្ណោះ** — ម៉ាស៊ីនមិនអាចកែប្រែបរិបទនៃសំណើបានទេ ដោយអាចកែប្រែបានតែលទ្ធផល body របស់ខ្លួនប៉ុណ្ណោះ។

### ចំណុចដែលត្រូវប្រយ័ត្នអំពីលំដាប់ប្រតិបត្តិការ

| លំដាប់ម៉ាស៊ីន                           | ផលប៉ះពាល់                                                                      |
| --------------------------------------- | ------------------------------------------------------------------------------ |
| RTK → Caveman → Lite                    | **បានណែនាំ** (លុបភាពរំខានជាមុន បន្ទាប់មកដំណើរការភាសា ហើយចុងក្រោយដកដកឃ្លា)      |
| Lite → RTK → Caveman                    | មិនល្អ — Lite ដកដកឃ្លាចេញពីលទ្ធផលដើម ដែលធ្វើឱ្យការផ្គូផ្គងលំនាំរបស់ RTK បរាជ័យ |
| Caveman → RTK                           | មិនល្អ — Caveman អាចសរសេរអត្ថបទឡើងវិញតាមរបៀបដែល RTK មិនស្គាល់                  |
| លំដាប់ណាមួយដែលដាក់ `tool_results` មុនគេ | ប្រសើរជាង — លទ្ធផលឧបករណ៍គឺជាមាតិកាដែលមានភាពរំខានបំផុត                          |

### ពេលដែលមិនគួរតម្រៀបជាស្រទាប់

ការតម្រៀបជាស្រទាប់មិនមែនតែងតែប្រសើរជាងនោះទេ៖

- **សារសាមញ្ញ** (គ្មានលទ្ធផលឧបករណ៍) — ប្រើ Caveman ឬ Lite តែមួយគឺគ្រប់គ្រាន់
- **ផ្តោតលើការសន្សំចំណាយ** — ម៉ាស៊ីននីមួយៗបន្ថែមភាពយឺតយ៉ាវ ~5-50ms
- **ឧបករណ៍ជាក់លាក់** — ជាទូទៅ RTK តែមួយគឺគ្រប់គ្រាន់សម្រាប់លទ្ធផល shell

### ការបង្កើតបំពង់ដំណើរការផ្ទាល់ខ្លួន

មិនមានបញ្ជីចុះឈ្មោះ pipeline ដែលមានឈ្មោះទេ។ stacked pipeline គ្រាន់តែជា **អារេ inline
នៃជំហាន** ដែលត្រូវបានបញ្ជូនទៅ `applyStackedCompression()` (នាំចេញពី
`@omniroute/open-sse/services/compression/strategySelector`)៖

```ts
import { applyStackedCompression } from "@omniroute/open-sse/services/compression/strategySelector";

const result = applyStackedCompression(body, [
  { engine: "rtk", intensity: "aggressive" },
  { engine: "caveman", intensity: "full" },
]);
```

នៅពេលអ្នកមិនបញ្ជូន pipeline វានឹងប្រើតម្លៃលំនាំដើម `rtk(standard) → caveman(full)`។

ដើម្បីកំណត់វាពី config សូមកំណត់ `mode: "stacked"` ហើយផ្តល់អារេនៃជំហាននៅក្រោម
`stackedPipeline` (អានពី `config.stackedPipeline`)៖

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

## គោលការណ៍ធ្វើសមកាលកម្មជាមួយ Upstream

ម៉ាស៊ីនបង្ហាប់របស់ OmniRoute ផ្តល់កិត្តិយសដល់គម្រោង upstream មួយចំនួននៅក្នុង README
("inspired by RTK, Caveman, LLMLingua-2, Troglodita")។ សំណួរដែលអ្នករួមចំណែកតែងតែសួរគឺ៖ **នៅពេល upstream RTK បន្ថែមតម្រងឧបករណ៍ថ្មី ឬ Caveman បន្ថែម
កញ្ចប់ច្បាប់ តើការផ្លាស់ប្តូរនោះមកដល់ OmniRoute ដោយរបៀបណា?** ផ្នែកនេះគឺជាចម្លើយផ្លូវការដែលត្រូវយកជាគោល។

### ច្បាប់ចម្លងដែលភ្ជាប់មកជាមួយ ធៀបនឹងការអនុវត្តឯករាជ្យ

| ម៉ាស៊ីន                      | ទំនាក់ទំនងជាមួយ upstream                                                                                                                                       | ទីតាំង                                                              |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| **RTK**                      | **ការអនុវត្តឡើងវិញដោយឯករាជ្យ** (ទទួលបានការបំផុសគំនិត មិនមែនជាច្បាប់ចម្លងទេ)                                                                                    | `open-sse/services/compression/engines/rtk/`                        |
| **Caveman**                  | **ការអនុវត្តឡើងវិញដោយឯករាជ្យ** (ទទួលបានការបំផុសគំនិត)                                                                                                          | `open-sse/services/compression/engines/cavemanAdapter.ts`           |
| **Headroom**                 | ភាគច្រើនជាផ្នែកខាងក្នុង; មានតែ codec `gcf/` ប៉ុណ្ណោះដែលត្រូវបាន **ភ្ជាប់មកជាមួយពិតប្រាកដ** ពី `gcf-typescript` (MIT, មានសម្គាល់ SPDX, សម្រាប់តែប្រូហ្វាល់ទូទៅ) | `open-sse/services/compression/engines/headroom/gcf/`               |
| **LLMLingua-2 / Troglodita** | ទទួលបានការបំផុសគំនិត (ជាមូលដ្ឋានសម្រាប់ម៉ាស៊ីន `llmlingua` + `session-dedup`)                                                                                  | `open-sse/services/compression/engines/llmlingua/`, `session-dedup` |

ចំណុចសំខាន់៖ **RTK និង Caveman គឺជាការអនុវត្ត TypeScript ដោយឯករាជ្យតាមបែប clean-room ដោយយក
_គំនិត_ (ច្បាប់តម្រង កញ្ចប់ច្បាប់) មកអនុវត្ត មិនមែនជាមែកធាងកូដប្រភពដែលភ្ជាប់មកជាមួយទេ។** មិនមាន
ច្បាប់ចម្លងពី upstream សម្រាប់ធ្វើ `git pull` ទេ — នេះហើយជាមូលហេតុដែល README ប្រើពាក្យ
"inspired by" ជំនួសឱ្យ "bundled"។

### របៀបបញ្ចូលការកែលម្អពី upstream

ដោយចេតនា **មិនមានការតាមដានការចេញផ្សាយរបស់ upstream ដោយស្វ័យប្រវត្តិ និងមិនមានស្លាក `compression-sync`
ទេ**។ ដោយសារម៉ាស៊ីនទាំងនេះជាការអនុវត្តឡើងវិញ តម្រងរបស់ upstream RTK
ឬកញ្ចប់ច្បាប់របស់ Caveman មិនត្រូវបានបញ្ចូលជាកូដដោយផ្ទាល់ទេ; វាត្រូវបាន **បង្ហាញឡើងវិញជាច្បាប់/
តម្រងថ្មីក្នុងទម្រង់ផ្ទាល់ខ្លួនរបស់ OmniRoute** (សូមមើល
[COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md)) ហើយត្រូវបានបញ្ចូលតាមករណីតាមរយៈ
PR ធម្មតា។ ចំណុចពង្រីកខាងលើ (ម៉ាស៊ីនផ្ទាល់ខ្លួន កញ្ចប់ភាសា តម្រង RTK)
គឺជាវិធីដែលបានអនុម័តសម្រាប់រួមចំណែក។

ឧទាហរណ៍ថ្មីៗនៃលំហូរនេះ៖

- តម្រង RTK សម្រាប់លទ្ធផល build របស់ Gradle និង `dotnet` (v3.8.42)
- តម្រង RTK សម្រាប់ kubectl / docker-build / composer / gh (#2824)
- កញ្ចប់ភាសាឥណ្ឌូណេស៊ីរបស់ Caveman (#3975) ព្រមទាំងកញ្ចប់ភាសាអាល្លឺម៉ង់ / បារាំង / ជប៉ុន / ចិន

### Headroom (ប្រូកស៊ីបង្ហាប់ទិន្នន័យបញ្ចូល)

Headroom គឺជា **ផ្នែកខាងក្នុងទាំងស្រុង** — ជា snapshot របស់ codec `gcf` ដែលបានកំណត់ជាក់លាក់ និងភ្ជាប់មកជាមួយ រួមទាំង
ស្រទាប់ `smartcrusher` / `toon` / `tabular` ផ្ទាល់ខ្លួនរបស់ OmniRoute។ មិនមាន
upstream សកម្មដែលត្រូវតាមដានក្រៅពីច្បាប់ចម្លងដែលភ្ជាប់មកជាមួយទេ; ការអាប់ដេតទៅ `gcf` ត្រូវបានធ្វើឡើងវិញ
ដោយដៃនៅពេល codec ផ្លាស់ប្តូរ ហើយត្រូវបានផ្ទៀងផ្ទាត់ឡើងវិញជាមួយច្រកត្រួតពិនិត្យកម្រិតថវិកាបង្ហាប់
(`check:compression-budget`)។

### ការស្នើកែលម្អដែលទទួលបានការបំផុសគំនិតពី upstream

1. **កុំភ្ជាប់ច្បាប់ចម្លងមកជាមួយ** — បង្ហាញច្បាប់/តម្រងពី upstream ឡើងវិញក្នុងទម្រង់របស់ OmniRoute។
2. បន្ថែមវាតាមរយៈចំណុចពង្រីកដែលត្រូវគ្នាខាងក្រោម (កញ្ចប់ភាសា តម្រង RTK ឬ
   ម៉ាស៊ីនផ្ទាល់ខ្លួន)។
3. យោងគម្រោង upstream នៅក្នុងសេចក្តីពិពណ៌នា PR (ការផ្តល់កិត្តិយស) មិនមែនដោយ
   ចម្លងកូដប្រភពដែលមានអាជ្ញាបណ្ណរបស់វាទេ។
4. បញ្ចូលការធ្វើតេស្ត និងបញ្ជាក់ថាច្រកត្រួតពិនិត្យ `check:compression-budget` នៅតែឆ្លងកាត់។

---

## ការបន្ថែមរចនាប័ទ្មលទ្ធផល

រចនាប័ទ្មលទ្ធផល (សូមមើល [តារាងកាតាឡុកក្នុងមគ្គុទ្ទេសក៍](./COMPRESSION_GUIDE.md#output-styles-catalog))
គឺជាសមភាគីនៅផ្នែកចម្លើយរបស់ម៉ាស៊ីនបញ្ចូល៖ ជំនួសឱ្យការបង្ហាប់អ្វីដែលអ្នក
ផ្ញើ ពួកវាណែនាំម៉ូដែលឱ្យបង្កើតលទ្ធផលដែលចំណាយតិចជាង។ បញ្ជីចុះឈ្មោះគឺ
`OUTPUT_STYLE_CATALOG` នៅក្នុង `open-sse/services/compression/outputStyles/catalog.ts` ហើយ
**ធាតុមួយក្នុងកាតាឡុកគឺជាមុខងារទាំងមូល**៖ ឧបករណ៍បញ្ចូល បន្ទះការកំណត់ផ្ទាំងគ្រប់គ្រង
ការរក្សាទុក និងទូរមាត្រវិទ្យា សុទ្ធតែរាយធាតុពីកាតាឡុក — មិនមានបញ្ជីផ្សេងទៀតដែលត្រូវធ្វើបច្ចុប្បន្នភាពទេ។

1. **បន្ថែមធាតុមួយទៅ `OUTPUT_STYLE_CATALOG`** ដោយមាន `id`, `label`, `description` និង
   `levels` ជាភាសាអង់គ្លេសទាំងបី (`lite`, `full`, `ultra`)។ កម្រិតនីមួយៗត្រូវតែបញ្ចប់ដោយ
   `${SHARED_BOUNDARIES}` ដើម្បីឱ្យកូដ ផ្លូវ ពាក្យបញ្ជា កំហុស និង URL ត្រូវបានរក្សាទុកដដែល។
   អត្ថបទណែនាំត្រូវតែមានលក្ខណៈ **ថេរ និងអាចកំណត់ឡើងវិញបាន** សម្រាប់
   `(id, level, language)` — `${SHARED_BOUNDARIES}` គឺជាការបញ្ចូលតម្លៃតែមួយគត់ដែលត្រូវបានអនុញ្ញាត។
2. **បកប្រែវា។** ត្រូវផ្ដល់យ៉ាងហោចណាស់ប្លុក `pt-BR` នៅក្រោម `i18n`; `ponytail` និង
   `i-have-adhd` (en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi) គឺជាគំរូយោងសម្រាប់រចនាសម្ព័ន្ធ។ រចនាប័ទ្មដែលកំណត់ឱ្យប្រើភាសាតែមួយដោយចេតនា ត្រូវកំណត់ `locale` ជំនួសវិញ (ដូចជា `terse-cjk` → `zh`) ហើយបន្ទាប់មក
   វានឹងត្រូវបានផ្ដល់ជូនតែនៅក្រោមមូលដ្ឋានភាសានោះប៉ុណ្ណោះ។
3. **ធ្វើបច្ចុប្បន្នភាពឧបករណ៍ការពារម៉ាទ្រីស** — បន្ថែមភាសារបស់រចនាប័ទ្មទៅ `BASELINE_LANGUAGES` ក្នុង
   `tests/unit/compression/output-styles-i18n-matrix.test.ts`។ ច្រកត្រួតពិនិត្យនឹងបរាជ័យចំពោះរចនាប័ទ្មថ្មីណាមួយដែលមិនបានកម្រិតដោយមូលដ្ឋានភាសា និងគ្មាន
   ការបកប្រែដែលត្រូវការ លុះត្រាតែវាមានធាតុ `KNOWN_ENGLISH_ONLY` ជាក់លាក់មួយជាមួយបញ្ហាសម្រាប់តាមដាន។
4. **បន្ថែមតេស្តសម្រាប់រចនាប័ទ្មនីមួយៗ** ដោយយកគំរូតាម
   `tests/unit/compression/i-have-adhd-catalog.test.ts`៖ រចនាសម្ព័ន្ធកាតាឡុក ឃ្លាកំណត់ព្រំដែន
   សម្រាប់កម្រិតនីមួយៗ និងសេចក្ដីអះអាងយោងមួយដែលផ្ទៀងផ្ទាត់ថាការបកប្រែនីមួយៗត្រូវបានសរសេរជាភាសាផ្ទាល់របស់វា
   ជាជាងចម្លងពីភាសាអង់គ្លេស។
5. **ការផ្ដល់កិត្តិយស**៖ ប្រសិនបើរចនាប័ទ្មនេះត្រូវបានកែសម្រួលពីគម្រោងខាងលើ ត្រូវផ្ដល់កិត្តិយសនៅក្នុង
   មតិយោបល់ប្រភពលើធាតុនោះ (ឧ. `i-have-adhd` → ayghri/i-have-adhd, MIT) — អនុវត្តតាម
   ច្បាប់ដូចគ្នានឹង "ការស្នើឱ្យមានការកែលម្អដែលបានបំផុសគំនិតពីគម្រោងខាងលើ" ខាងលើ។

មិនចាំបាច់មានការផ្លាស់ប្ដូរ UI, schema ឬទូរមាត្រវិទ្យាទេ — ផ្ទៃទាំងនោះបង្ហាញពីកាតាឡុកដោយផ្ទាល់។

---

## ការអនុវត្តល្អបំផុត

### ការអភិវឌ្ឍម៉ាស៊ីន

1. **ត្រូវអនុវត្ត `validateConfig` ជានិច្ច** — ម៉ាស៊ីនដែលគ្មានការផ្ទៀងផ្ទាត់បង្កឱ្យមានការបរាជ័យដោយស្ងៀមស្ងាត់
2. **កំណត់ `targetLatencyMs` ឱ្យសមហេតុផល** — ឧបករណ៍ជ្រើសរើសយុទ្ធសាស្ត្រប្រើវាដើម្បីជ្រើសរើសម៉ាស៊ីន
3. **ប្រើ `getConfigSchema` សម្រាប់ផ្ទាំងគ្រប់គ្រង** — កុំលាក់ការកំណត់រចនាសម្ព័ន្ធពីអ្នកប្រើប្រាស់
4. **គាំទ្រ `stackable: true` ប្រសិនបើម៉ាស៊ីនរបស់អ្នកគ្មានផលរំខាន** — ម៉ាស៊ីនដែលមានផលរំខានមិនគួរដាក់ជាជង់ទេ
5. **សរសេរតេស្តក្នុងបន្ទាត់** — ម៉ាស៊ីនគួរតែអាចផ្ទៀងផ្ទាត់បានក្នុងរយៈពេល <1s

### ការអភិវឌ្ឍកញ្ចប់ភាសា

1. **ចាប់ផ្ដើមជាមួយកម្រិត `lite`** — ច្បាប់របស់អ្នកគួរតែមានសុវត្ថិភាពនៅការកំណត់ទាបបំផុត
2. **ប្រើ `context` ដើម្បីកំណត់វិសាលភាពច្បាប់** — ច្បាប់សម្រាប់តែ `user` មិនអាចប៉ះពាល់ដល់ប្រអប់បញ្ចូលរបស់ប្រព័ន្ធដោយចៃដន្យទេ
3. **ជៀសវាងការចាប់យក JSON keys** — `\\bword\\b` អាចផ្គូផ្គងនៅខាងក្នុង JSON ដែលធ្វើឱ្យទិន្នន័យមានរចនាសម្ព័ន្ធខូច
4. **សាកល្បងជាមួយករណីគែម** — ការបញ្ចូលទទេ យូនីកូដ អត្ថបទ RTL និងអេម៉ូជី
5. **ប្រើកញ្ចប់ដែលមានស្រាប់ជាគំរូ** — `en/filler.json` គឺជាឧទាហរណ៍ដែលត្រូវបានអភិវឌ្ឍពេញលេញបំផុត

### ការរចនាបំពង់ដំណើរការ

1. **ធ្វើការវាស់ស្ទង់មុនពេលបង្កើនប្រសិទ្ធភាព** — វាស់វែងជាមួយ `compression_stats` ជាមុនសិន
2. **ផ្ដល់អាទិភាពដល់ការផ្សំ ជាជាងការអនុវត្តឡើងវិញ** — ពង្រីកច្បាប់ Caveman មុនពេលសរសេរម៉ាស៊ីនថ្មី
3. **ចងក្រងឯកសារអំពីហេតុផលនៃលំដាប់** — បញ្ចេញមតិយោបល់ពន្យល់ថាហេតុអ្វីបានជាម៉ាស៊ីន A នៅមុនម៉ាស៊ីន B
4. **សាកល្បងនៅកម្រិតអាំងតង់ស៊ីតេទាំង 3** — `lite` លឿន ប៉ុន្តែបាត់បង់ព័ត៌មាន ខណៈ `ultra` យឺត ប៉ុន្តែមានភាពជាក់លាក់ខ្ពស់

---

## ឯកសារយោង៖ ម៉ាស៊ីនដែលមានស្រាប់

| ID ម៉ាស៊ីន           | អាចដាក់ជាជង់បាន | stackPriority លំនាំដើម | គោលដៅ                       |
| -------------------- | --------------- | ---------------------- | --------------------------- |
| `lite`               | បាទ/ចាស         | 5                      | សារ, លទ្ធផលឧបករណ៍           |
| `rtk`                | បាទ/ចាស         | 10                     | លទ្ធផលឧបករណ៍                |
| `standard` (caveman) | បាទ/ចាស         | 20                     | សារ, លទ្ធផលឧបករណ៍, ប្លុកកូដ |
| `aggressive`         | បាទ/ចាស         | 30                     | សារ                         |
| `ultra`              | បាទ/ចាស         | 40                     | សារ, ប្លុកកូដ               |

### សូមមើលផងដែរ

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — ទិដ្ឋភាពទូទៅនៃ Pipeline
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — ឯកសារយោងនៃបញ្ជីឈ្មោះម៉ាស៊ីន
- [COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md) — លក្ខណៈបច្ចេកទេសនៃទម្រង់ច្បាប់
- [COMPRESSION_LANGUAGE_PACKS.md](./COMPRESSION_LANGUAGE_PACKS.md) — ព័ត៌មានលម្អិតអំពីកញ្ចប់ភាសា
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — ម៉ាស៊ីន RTK និងតម្រងផ្ទាល់ខ្លួន
- ប្រភព៖ `open-sse/services/compression/` (117 ឯកសារ, ~250KB)
