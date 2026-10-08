# Extending the Compression Pipeline (नेपाली)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/EXTENDING_COMPRESSION.md) · 🇪🇹 [am](../../../am/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇦 [ar](../../../ar/docs/compression/EXTENDING_COMPRESSION.md) · 🇦🇿 [az](../../../az/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇬 [bg](../../../bg/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇩 [bn](../../../bn/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇦 [bs](../../../bs/docs/compression/EXTENDING_COMPRESSION.md) · 🇨🇿 [cs](../../../cs/docs/compression/EXTENDING_COMPRESSION.md) · 🇩🇰 [da](../../../da/docs/compression/EXTENDING_COMPRESSION.md) · 🇩🇪 [de](../../../de/docs/compression/EXTENDING_COMPRESSION.md) · 🇬🇷 [el](../../../el/docs/compression/EXTENDING_COMPRESSION.md) · 🇪🇸 [es](../../../es/docs/compression/EXTENDING_COMPRESSION.md) · 🇪🇪 [et](../../../et/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇷 [fa](../../../fa/docs/compression/EXTENDING_COMPRESSION.md) · 🇫🇮 [fi](../../../fi/docs/compression/EXTENDING_COMPRESSION.md) · 🇫🇷 [fr](../../../fr/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇪 [ga](../../../ga/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [gu](../../../gu/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [ha](../../../ha/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇱 [he](../../../he/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [hi](../../../hi/docs/compression/EXTENDING_COMPRESSION.md) · 🇭🇷 [hr](../../../hr/docs/compression/EXTENDING_COMPRESSION.md) · 🇭🇺 [hu](../../../hu/docs/compression/EXTENDING_COMPRESSION.md) · 🇦🇲 [hy](../../../hy/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇩 [id](../../../id/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [ig](../../../ig/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇹 [it](../../../it/docs/compression/EXTENDING_COMPRESSION.md) · 🇯🇵 [ja](../../../ja/docs/compression/EXTENDING_COMPRESSION.md) · 🇬🇪 [ka](../../../ka/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇭 [km](../../../km/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [kn](../../../kn/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇷 [ko](../../../ko/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇹 [lt](../../../lt/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇻 [lv](../../../lv/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [ml](../../../ml/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [mr](../../../mr/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇾 [ms](../../../ms/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇹 [mt](../../../mt/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇲 [my](../../../my/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇱 [nl](../../../nl/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇴 [no](../../../no/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [or](../../../or/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [pa](../../../pa/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇭 [phi](../../../phi/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇱 [pl](../../../pl/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇹 [pt](../../../pt/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇴 [ro](../../../ro/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇺 [ru](../../../ru/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇰 [si](../../../si/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇰 [sk](../../../sk/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇮 [sl](../../../sl/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇸 [sr](../../../sr/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇪 [sv](../../../sv/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇪 [sw](../../../sw/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [ta](../../../ta/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [te](../../../te/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇭 [th](../../../th/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇷 [tr](../../../tr/docs/compression/EXTENDING_COMPRESSION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇰 [ur](../../../ur/docs/compression/EXTENDING_COMPRESSION.md) · 🇺🇿 [uz](../../../uz/docs/compression/EXTENDING_COMPRESSION.md) · 🇻🇳 [vi](../../../vi/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [yo](../../../yo/docs/compression/EXTENDING_COMPRESSION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/EXTENDING_COMPRESSION.md)

---

> **सारांश**: OmniRoute को कम्प्रेसन इन्जिन **प्लग गर्न मिल्ने** छ — तपाईं आफूअनुकूल इन्जिनहरू दर्ता गर्न, नयाँ भाषाहरूका लागि भाषा प्याकहरू वितरण गर्न, र तहबद्ध पाइपलाइनहरू संयोजन गर्न सक्नुहुन्छ। यस गाइडले त्यसो गर्ने तरिका देखाउँछ।

**सम्बन्धित गाइडहरू:**

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — पूर्ण पाइपलाइनको अवलोकन
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — इन्जिन रजिस्ट्री र अन्तर्निर्मित इन्जिनहरू
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — RTK इन्जिन र आफूअनुकूल फिल्टरहरू
- [COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md) — नियम प्याक ढाँचाको सन्दर्भ

---

## अवलोकन

कम्प्रेसन प्रणालीमा **3 वटा विस्तार बिन्दुहरू** छन्:

| विस्तार बिन्दु       | प्रयोगको अवस्था                                                               | कठिनाइ     |
| -------------------- | ----------------------------------------------------------------------------- | ---------- |
| **आफूअनुकूल इन्जिन** | पूर्ण रूपमा नयाँ कम्प्रेसन एल्गोरिदम थप्ने (जस्तै, डोमेन-विशिष्ट सारांशकर्ता) | उन्नत      |
| **भाषा प्याक**       | नयाँ प्राकृतिक भाषाका लागि समर्थन थप्ने (जस्तै, हिन्दी, अरबी)                 | मध्यम      |
| **तहबद्ध पाइपलाइन**  | विद्यमान इन्जिनहरूलाई आफूअनुकूल क्रममा संयोजन गर्ने                           | प्रारम्भिक |

```
┌─────────────────────────────────────────────────────────────┐
│                    कम्प्रेसन रणनीति                          │
│                                                              │
│   इनपुट सन्देशहरू ──▶ getEffectiveMode() ──▶ मोड            │
│                                              │               │
│                      ┌───────────────────────┼──────────┐    │
│                      │         │         │         │    │    │
│                      ▼         ▼         ▼         ▼    │    │
│                   "rtk"    "lite"   "standard" "stacked"    │
│                      │         │         │         │    │    │
│                      ▼         ▼         ▼         ▼    │    │
│                   RTK       Lite     Caveman   engines[]   │
│                   इन्जिन    इन्जिन   इन्जिन    शृङ्खलाबद्ध │
│                      │         │         │         │    │    │
│                      └─────────┴─────────┴─────────┘    │    │
│                                      │                    │
│                                      ▼                    │
│                             कम्प्रेस गरिएको आउटपुट         │
└─────────────────────────────────────────────────────────────┘

रणनीति चयनकर्ता मोडमा आधारित छ: प्रत्येक अनुरोधले एउटा मात्र मोड चयन गर्छ
(rtk / lite / standard / aggressive / ultra / stacked / off)।
"stacked" मोडले मात्र धेरै इन्जिनहरूलाई क्रमिक रूपमा शृङ्खलाबद्ध गर्छ।
पूर्वनिर्धारित स्वतः-ट्रिगर मोड "lite" हो (3-तहको प्राथमिकता शृङ्खला होइन)।
```

---

## आफूअनुकूल कम्प्रेसन इन्जिन लेख्ने

इन्जिन इन्टरफेस (`open-sse/services/compression/engines/types.ts`) प्रत्येक इन्जिनले पूरा गर्नुपर्ने सम्झौता हो। यसमा 5 वटा आवश्यक विधिहरू छन्।

### `CompressionEngine` इन्टरफेस

```ts
interface CompressionEngine {
  id: string; // अद्वितीय इन्जिन ID
  name: string; // प्रदर्शन नाम
  description: string; // छोटो विवरण
  icon: string; // आइकन (इमोजी वा URL)
  targets: CompressionEngineTarget[]; // ["messages", "tool_results", "code_blocks"]
  stackable: boolean; // तहबद्ध पाइपलाइनमा प्रयोग गर्न सकिन्छ कि सकिँदैन
  stackPriority: number; // तहबद्ध पाइपलाइनहरूको क्रम (कम = पहिले)
  metadata: CompressionEngineMetadata;

  apply(body, options?): CompressionResult;
  compress(body, config?): CompressionResult;
  getConfigSchema(): EngineConfigField[];
  validateConfig(config): EngineValidationResult;
}
```

### न्यूनतम उदाहरण: ह्वाइटस्पेस इन्जिन

सम्भव भएसम्मको सबैभन्दा सरल इन्जिन — सन्देशहरूबाट अतिरिक्त ह्वाइटस्पेस हटाउने।

````ts
import type { CompressionEngine } from "omniroute/compression/engines/types";
import { registerCompressionEngine } from "omniroute/compression/engines/registry";

function preserveCodeBlocks(text: string): string {
  // कोड ब्लक मार्करहरूका आधारमा विभाजन गर्नुहोस् र तिनभित्रको ह्वाइटस्पेस जोगाउनुहोस्
  const parts = text.split(/(```[\s\S]*?```)/);
  return parts
    .map((part) => {
      if (part.startsWith("```")) {
        return part; // कोड ब्लकहरू परिमार्जन नगर्नुहोस्
      }
      return part.replace(/\n{3,}/g, "\n\n"); // गद्यमा मात्र लागू गर्नुहोस्
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
  stackPriority: 100, // caveman/rtk पछि चलाउनुहोस्

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

    // सन्देश एरेमा भ्रमण गर्नुहोस् — स्ट्रिङ र मल्टिपार्ट सामग्री दुवै व्यवस्थापन गर्नुहोस्
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
      // मल्टिपार्ट सामग्री: भागहरूमा भ्रमण गर्नुहोस्, टेक्स्ट भागहरू मात्र कम्प्रेस गर्नुहोस्
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
          return part; // image_url, tool_use आदि जोगाउनुहोस्।
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

// विश्वव्यापी रूपमा दर्ता गर्नुहोस्
registerCompressionEngine(whitespaceEngine);
````

### अनुकूलित इन्जिनहरू कहाँ राख्ने

```
~/.omniroute/compression/engines/my-engine.ts    # प्रयोगकर्ता-स्तर
<project>/compression-engines/my-engine.ts        # परियोजना-स्तर (स्टार्टअपमा लोड हुन्छ)
```

वा प्लगइनबाट प्रोग्रामेटिक रूपमा लोड गर्नुहोस्:

```ts
// तपाईंको प्लगइनमा
import {
  registerCompressionEngine,
  unregisterCompressionEngine,
} from "@omniroute/open-sse/services/compression/engines/registry";
import { myEngine } from "./engines/my-engine";

export default definePlugin({
  name: "my-compression-plugin",
  // प्लगइन SDK ले onRequest / onResponse / onError हुकहरू उपलब्ध गराउँछ। प्लगइन
  // मोड्युल लोड हुँदा (वा पहिलो onRequest मा) इन्जिन दर्ता गर्नुहोस्; यसलाई आफ्नो
  // टियरडाउन पथबाट दर्ता रद्द गर्नुहोस्।
  onRequest: async (ctx) => {
    registerCompressionEngine(myEngine);
  },
});

// टियरडाउन हुँदा:
// unregisterCompressionEngine("my-engine");
```

### तपाईंको इन्जिन परीक्षण गर्ने

आफ्नो इन्जिनलाई प्लगइन वा स्टार्टअप प्रकार्यमा दर्ता गर्नुहोस्। दर्ता भएपछि, इन्जिन यसको `id` मार्फत रणनीति चयनकर्तामा उपलब्ध हुनेछ। यसलाई स्ट्याक गरिएको पाइपलाइनमा संयोजन गरेर एकीकरण परीक्षण गर्नुहोस्:

---

## भाषा प्याकहरू सिर्जना गर्ने

Caveman-शैलीको सङ्कुचनले प्रत्येक प्राकृतिक भाषाका पूरक शब्दहरू, अनिश्चित अभिव्यक्तिहरू र अनावश्यक रूपमा लामा ढाँचाहरू सम्हाल्न **भाषा-विशिष्ट नियम प्याकहरू** प्रयोग गर्छ। OmniRoute सँग **6 वटा भाषा प्याकहरू** उपलब्ध छन्: `en`, `es`, `fr`, `de`, `ja`, `pt-BR`।

### प्याकको संरचना

भाषा प्याक भनेको `open-sse/services/compression/rules/<language>/` अन्तर्गत रहेका **JSON फाइलहरू**को डाइरेक्टरी हो:

```
open-sse/services/compression/rules/
├── en/
│   ├── filler.json          # शिष्टाचारका अभिव्यक्ति, अनिश्चित अभिव्यक्ति, विनम्रता
│   ├── context.json         # सन्दर्भ घटाउने नियमहरू
│   ├── dedup.json           # दोहोरोपन हटाउने नियमहरू
│   ├── structural.json      # विराम चिह्न, ढाँचा
│   └── ultra.json           # आक्रामक सङ्कुचनका नियमहरू
├── es/  (उही संरचना)
├── fr/  (उही संरचना)
├── de/  (उही संरचना)
├── ja/  (उही संरचना)
└── pt-BR/ (उही संरचना)
```

### नियमको संरचना

प्रत्येक नियमको स्वरूप यस्तो हुन्छ (`open-sse/services/compression/ruleLoader.ts` बाट):

```ts
interface FileRule {
  name: string; // मानिसले पढ्न मिल्ने नाम (kebab-case)
  pattern: string; // JavaScript regex ढाँचा
  replacement?: string; // मिलेको अंशलाई केसँग प्रतिस्थापन गर्ने
  replacementMap?: Record<string, string>; // वा key→replacement नक्सा
  flags?: string; // Regex फ्ल्यागहरू (सामान्यतया "gi")
  context?: "all" | "user" | "system" | "assistant";
  category?: "filler" | "context" | "structural" | "dedup" | "terse" | "ultra";
  minIntensity?: "lite" | "full" | "ultra"; // यो तीव्रताभन्दा कम भए छोड्ने
  description?: string; // दस्तावेजीकरण
}
```

### उदाहरण: हिन्दी पूरक शब्दका नियमहरू थप्ने

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

### प्रमाणीकरण

लोड गर्दा नियम प्याकहरूलाई `_schema.json` विरुद्ध प्रमाणित गरिन्छ। गलत संरचना भएको प्याक लोड हुन असफल हुन्छ र त्रुटि लग गर्छ:

```
RULE_LOADER: प्याक "hi/filler.json" प्रमाणीकरणमा असफल भयो:
  - rules.0.pattern: अमान्य regex
  - rules.1.context: [all, user, system, assistant] मध्ये एउटा हुनुपर्छ
```

प्याक लोड हुँदा (`_schema.json` विरुद्ध) प्रमाणीकरण स्वचालित रूपमा चल्छ; अमान्य
प्याक अस्वीकार गरिन्छ र माथिको त्रुटि लग गरिन्छ। प्याक प्रमाणीकरणका लागि छुट्टै
`npm run` स्क्रिप्ट छैन — प्याक लोड गर्नुहोस् (जस्तै, सर्भर सुरु गर्नुहोस् वा
सङ्कुचन मार्ग चलाउनुहोस्) र लगहरू हेर्नुहोस्।

### आफूअनुकूल भाषा प्याक लोड गर्ने

```ts
import { loadRulePack } from "omniroute/compression/ruleLoader";

await loadRulePack("./my-custom-rules/hi/filler.json");
```

वा मान्यता प्राप्त स्थानमा राख्नुहोस्:

```
~/.omniroute/compression/rules/hi/filler.json  # प्रयोगकर्ता-स्तर
<project>/.compression/rules/hi/filler.json   # परियोजना-स्तर
```

### भाषा प्याकहरूका उत्कृष्ट अभ्यासहरू

1. **`filler` बाट सुरु गर्नुहोस्** — यी सबैभन्दा बढी प्रभाव पार्ने नियमहरू हुन्
2. **आक्रामक नियमहरू सीमित गर्न `minIntensity` प्रयोग गर्नुहोस्** — यसले अत्यधिक सङ्कुचनबाट जोगाउँछ
3. **परीक्षण केसहरू समावेश गर्नुहोस्** — व्यवहार प्रमाणित गर्न JSON मा `tests[]` एरे थप्नुहोस्
4. **क्रम महत्त्वपूर्ण हुन्छ** — अघिल्ला नियमहरू पहिले लागू हुन्छन्; बढी प्रभाव पार्ने नियमहरू पहिले राख्नुहोस्
5. **`replacement` प्रयोग गर्दा सावधानी अपनाउनुहोस्** — प्रायः खाली स्ट्रिङ नै सही हुन्छ; कहिल्यै नयाँ सामग्री नथप्नुहोस्

### अनुवाद रणनीति

नियम प्याकहरूलाई नयाँ भाषाका लागि स्थानीयकरण गर्दा:

1. **नियमका नामहरू अनुवाद गर्नुहोस्** — ती डिबग आउटपुटमा देखिन्छन्
2. **regex ढाँचाहरू अनुकूलित गर्नुहोस्** — प्रत्यक्ष अनुवाद प्रायः असफल हुन्छ (शब्द सीमाहरू फरक हुन्छन्)
3. **वास्तविक संवादहरूमा परीक्षण गर्नुहोस्** — प्याक वास्तविक इनपुटमा सुरक्षित हुनुपर्छ
4. **सांस्कृतिक प्रचलनहरूअनुसार मिलाउनुहोस्** — उदाहरणका लागि, जापानी प्याकहरूमा अङ्ग्रेजीभन्दा बढी आदरसूचक पूरक अभिव्यक्तिहरू हुन्छन्

---

## स्ट्याक गरिएका पाइपलाइनहरू

एउटा **स्ट्याक गरिएको पाइपलाइन** ले धेरै इन्जिनहरूलाई क्रमिक रूपमा चलाउँछ, जहाँ प्रत्येक इन्जिनको आउटपुट अर्को इन्जिनको इनपुट बन्छ। आन्तरिक रूपमा `mode: stacked` यसरी नै काम गर्छ।

### स्ट्याकिङले कसरी काम गर्छ

```
इनपुट (10,000 टोकन)
        │
        ▼
   ┌──────────┐
   │  इन्जिन  │  प्राथमिकता 10
   │  A       │  ──▶ आउटपुट: 6,000 टोकन (-40%)
   └────┬─────┘
        ▼
   ┌──────────┐
   │  इन्जिन  │  प्राथमिकता 50
   │  B       │  ──▶ आउटपुट: 2,400 टोकन (-60%)
   └────┬─────┘
        ▼
   ┌──────────┐
   │  इन्जिन  │  प्राथमिकता 100
   │  C       │  ──▶ आउटपुट: 1,200 टोकन (-80%)
   └────┬─────┘
        │
        ▼
अन्तिम आउटपुट (1,200 टोकन, संयुक्त रूपमा ~88% बचत)
```

`mode: "stacked"` चयन गर्दा, इन्जिनहरू `pipeline` एरेमा निर्दिष्ट गरिएको क्रममा पालैपालो कार्यान्वयन हुन्छन्।
इन्जिन N को आउटपुट इन्जिन N+1 को इनपुट बन्छ।

### सङ्कुचन मोडहरू

OmniRoute ले कन्फिगरेसन, स्वतः-ट्रिगर थ्रेसहोल्डहरू, र कम्बो ओभरराइडहरूका आधारमा **प्रत्येक अनुरोधका लागि एउटा मोड** चयन गर्छ।
उपलब्ध मोडहरू `open-sse/services/compression/types.ts` मा परिभाषित छन् (`CompressionMode` प्रकार):

| मोड          | इन्जिनहरू            | प्रयोगको अवस्था                                                                                                                                                                                   |
| ------------ | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `off`        | कुनै पनि होइन        | सबै सङ्कुचन असक्षम पार्नुहोस्                                                                                                                                                                     |
| `rtk`        | RTK मात्र            | कमान्ड आउटपुट धेरै भएका सत्रहरू (80%+ बचत)                                                                                                                                                        |
| `lite`       | Lite मात्र           | सावधानीपूर्ण सङ्कुचन (छिटो, सुरक्षित)                                                                                                                                                             |
| `standard`   | Caveman              | भाषा प्याकसहितको गद्य सङ्कुचन                                                                                                                                                                     |
| `aggressive` | Caveman + Aggressive | आक्रामक गद्य + आक्रामक अन्तिम पास                                                                                                                                                                 |
| `ultra`      | Ultra                | अधिकतम सङ्कुचन (हानियुक्त, अन्तिम उपाय)। `ultra.modelPath` सेट गरिएको बेला वैकल्पिक रूपमा **LLMLingua-2** SLM इन्जिनमार्फत रुट गरिन्छ (मोडेल उपलब्ध नभएमा नियम-आधारित पथमा खुला रूपमा फेल हुन्छ)। |
| `stacked`    | अनुकूलन पाइपलाइन     | इन्जिनहरूलाई कुनै पनि क्रममा संयोजन गर्नुहोस् (तल हेर्नुहोस्)                                                                                                                                     |

> माथिका मोड इन्जिनहरूबाहेक, रजिस्ट्रीमा विशेषीकृत स्ट्याक गर्न मिल्ने इन्जिनहरू पनि समावेश छन् —
> **CCR**, **headroom**, **ionizer**, र **session-dedup** — जसको दस्तावेजीकरण
> [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md#additional-built-in-engines) मा गरिएको छ।

मोड चयन `open-sse/services/compression/strategySelector.ts` मा रहेको `getEffectiveMode()` द्वारा निर्धारण गरिन्छ:

1. सङ्कुचन असक्षम छ भने: `"off"`
2. कम्बो ओभरराइड छ भने: ओभरराइड प्रयोग गर्नुहोस्
3. स्वतः-ट्रिगर थ्रेसहोल्ड नाघेमा: `autoTriggerMode` प्रयोग गर्नुहोस् (पूर्वनिर्धारित: `"lite"`)
4. अन्यथा: `defaultMode` प्रयोग गर्नुहोस्

### पूर्वनिर्धारित स्ट्याक गरिएको पाइपलाइन

`mode: "stacked"` स्पष्ट रूपमा कन्फिगर गरिएको बेला, पूर्वनिर्धारित पाइपलाइनले निम्नलाई संयोजन गर्छ:

1. **RTK** — कमान्ड आउटपुटको अनावश्यक सामग्री हटाउँछ (टर्मिनल आउटपुटमा ~80% बचत)
2. **Caveman** — अनावश्यक पूरक शब्दहरू हटाउँछ, गद्यलाई संक्षिप्त बनाउँछ (बाँकी पाठमा ~46%)
3. **Lite** — अन्तिम ह्वाइटस्पेस + डिडुप पास

यस संयोजनले टुल-प्रधान सत्रहरूमा **78-95% बचत** हासिल गर्छ।

### स्ट्याक गरिएका पाइपलाइनहरू कन्फिगर गर्ने

कम्बो कन्फिगमा:

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

तपाईं इन्जिनहरू हटाउन, अनुकूलन इन्जिनहरू थप्न, वा तिनको क्रम परिवर्तन गर्न सक्नुहुन्छ।

### स्टेट पासिङ

इन्जिनहरूले अनुरोध कन्टेक्स्ट (`options` मा) बाट मेटाडेटा पढ्न सक्छन्:

```ts
compress(body, config) {
  // अघिल्ला इन्जिनहरूबाट मेटाडेटा पढ्नुहोस्
  const original = options?.compressionComboId;  // "my-coding-combo"
  // ...
}
```

मेटाडेटा **पढ्न-मात्र मिल्ने** हुन्छ — इन्जिनहरूले अनुरोध कन्टेक्स्ट परिवर्तन गर्न सक्दैनन्, केवल आफ्नै बडी आउटपुट परिवर्तन गर्न सक्छन्।

### कार्यान्वयन क्रमका ध्यान दिनुपर्ने कुराहरू

| इन्जिन क्रम                              | प्रभाव                                                                                        |
| ---------------------------------------- | --------------------------------------------------------------------------------------------- |
| RTK → Caveman → Lite                     | **सिफारिस गरिएको** (पहिले अनावश्यक सामग्री, त्यसपछि भाषा, र अन्त्यमा ह्वाइटस्पेस हटाउँछ)      |
| Lite → RTK → Caveman                     | खराब — Lite ले कच्चा आउटपुटबाट ह्वाइटस्पेस हटाउँछ, जसले गर्दा RTK प्याटर्न म्याचिङ असफल हुन्छ |
| Caveman → RTK                            | खराब — Caveman ले पाठलाई RTK ले नचिन्ने तरिकाले पुनर्लेखन गर्न सक्छ                           |
| सुरुमा `tool_results` भएको कुनै पनि क्रम | राम्रो — टुल आउटपुटमा सबैभन्दा बढी अनावश्यक सामग्री हुन्छ                                     |

### कहिले स्ट्याक नगर्ने

स्ट्याकिङ सधैँ राम्रो हुँदैन:

- **साधारण सन्देशहरू** (टुल आउटपुट नभएका) — एउटा Caveman वा Lite पर्याप्त हुन्छ
- **लागत-संवेदनशील अवस्था** — प्रत्येक इन्जिनले ~5-50ms विलम्ब थप्छ
- **विशिष्ट टुलहरू** — शेल आउटपुटका लागि RTK मात्र प्रायः पर्याप्त हुन्छ

### अनुकूलन पाइपलाइन निर्माण गर्ने

नाम दिइएको pipeline registry छैन। Stacked pipeline भनेको `applyStackedCompression()` मा पठाइने **steps को inline array** मात्र हो (`@omniroute/open-sse/services/compression/strategySelector` बाट export गरिएको):

```ts
import { applyStackedCompression } from "@omniroute/open-sse/services/compression/strategySelector";

const result = applyStackedCompression(body, [
  { engine: "rtk", intensity: "aggressive" },
  { engine: "caveman", intensity: "full" },
]);
```

तपाईंले pipeline नपठाउँदा, यो पूर्वनिर्धारित रूपमा `rtk(standard) → caveman(full)` हुन्छ।

यसलाई config बाट सञ्चालन गर्न, `mode: "stacked"` सेट गर्नुहोस् र step array लाई `stackedPipeline` अन्तर्गत उपलब्ध गराउनुहोस् (`config.stackedPipeline` बाट पढिन्छ):

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

## अपस्ट्रिम समक्रमण नीति

OmniRoute का कम्प्रेसन इन्जिनहरूले README मा धेरै अपस्ट्रिम परियोजनाहरूलाई श्रेय दिन्छन्
("RTK, Caveman, LLMLingua-2, Troglodita बाट प्रेरित")। योगदानकर्ताहरूको एउटा सामान्य
प्रश्न हो: **अपस्ट्रिम RTK ले नयाँ उपकरण फिल्टर थप्दा वा Caveman ले नियम
प्याक थप्दा, त्यो OmniRoute सम्म कसरी आइपुग्छ?** यो खण्ड नै आधिकारिक उत्तर हो।

### भेन्डर गरिएका प्रतिलिपिहरू बनाम स्वतन्त्र कार्यान्वयनहरू

| इन्जिन                       | अपस्ट्रिमसँगको सम्बन्ध                                                                                                              | स्थान                                                               |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| **RTK**                      | **स्वतन्त्र पुनःकार्यान्वयन** (यसबाट प्रेरित, प्रतिलिपि होइन)                                                                       | `open-sse/services/compression/engines/rtk/`                        |
| **Caveman**                  | **स्वतन्त्र पुनःकार्यान्वयन** (यसबाट प्रेरित)                                                                                       | `open-sse/services/compression/engines/cavemanAdapter.ts`           |
| **Headroom**                 | अधिकांशतः आन्तरिक; केवल `gcf/` कोडेक `gcf-typescript` बाट **वास्तवमै भेन्डर गरिएको** हो (MIT, SPDX-चिह्नित, जेनेरिक प्रोफाइल मात्र) | `open-sse/services/compression/engines/headroom/gcf/`               |
| **LLMLingua-2 / Troglodita** | यसबाट प्रेरित (`llmlingua` + `session-dedup` इन्जिनहरू सञ्चालन गर्छन्)                                                              | `open-sse/services/compression/engines/llmlingua/`, `session-dedup` |

मुख्य कुरा: **RTK र Caveman _अवधारणाहरू_ (फिल्टर नियमहरू, नियम प्याकहरू) का
क्लिन-रुम TypeScript कार्यान्वयन हुन्, भेन्डर गरिएका स्रोत ट्रीहरू होइनन्।** `git pull`
गर्न मिल्ने कुनै अपस्ट्रिम प्रतिलिपि छैन — यही कारणले README मा
"bundled" को सट्टा "inspired by" भनिएको हो।

### अपस्ट्रिम सुधारहरू कसरी मर्ज गरिन्छन्

डिजाइनअनुसार, **कुनै स्वचालित अपस्ट्रिम-रिलिज ट्र्याकिङ र कुनै `compression-sync`
लेबल छैन**। इन्जिनहरू पुनःकार्यान्वयन भएकाले, कुनै अपस्ट्रिम RTK
फिल्टर वा Caveman नियम प्याक कोडका रूपमा मर्ज गरिँदैन; त्यसलाई **OmniRoute कै
ढाँचामा नयाँ नियम/फिल्टरका रूपमा पुनःअभिव्यक्त गरिन्छ** (
[COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md) हेर्नुहोस्) र सामान्य
PR मार्फत आवश्यकताअनुसार समावेश गरिन्छ। माथिका विस्तार बिन्दुहरू (अनुकूलन इन्जिन, भाषा प्याक, RTK फिल्टर)
यस्तो योगदान गर्ने स्वीकृत माध्यम हुन्।

यही प्रक्रियाका हालैका उदाहरणहरू:

- Gradle र `dotnet` बिल्ड आउटपुटका लागि RTK फिल्टरहरू (v3.8.42)
- kubectl / docker-build / composer / gh का लागि RTK फिल्टरहरू (#2824)
- Caveman इन्डोनेसियाली भाषा प्याक (#3975), साथै जर्मन / फ्रान्सेली / जापानी / चिनियाँ प्याकहरू

### Headroom (इनपुट-कम्प्रेसन प्रोक्सी)

Headroom **पूर्ण रूपमा आन्तरिक** हो — पिन गरिएको भेन्डर `gcf` कोडेक स्न्यापसट र
OmniRoute का आफ्नै `smartcrusher` / `toon` / `tabular` तहहरू। भेन्डर गरिएको
प्रतिलिपिबाहेक ट्र्याक गर्नुपर्ने कुनै सक्रिय अपस्ट्रिम छैन; कोडेक परिवर्तन हुँदा
`gcf` का अद्यावधिकहरू म्यानुअल रूपमा रिफ्रेस गरिन्छन् र कम्प्रेसन बजेट
गेट (`check:compression-budget`) विरुद्ध पुनःप्रमाणित गरिन्छन्।

### अपस्ट्रिमबाट प्रेरित सुधार प्रस्ताव गर्ने तरिका

1. **भेन्डर नगर्नुहोस्** — अपस्ट्रिम नियम/फिल्टरलाई OmniRoute को ढाँचामा पुनःअभिव्यक्त गर्नुहोस्।
2. यसलाई तलको मिल्दो विस्तार बिन्दुमार्फत थप्नुहोस् (भाषा प्याक, RTK फिल्टर, वा
   अनुकूलन इन्जिन)।
3. PR विवरणमा अपस्ट्रिम परियोजनाको सन्दर्भ दिनुहोस् (श्रेयका लागि), त्यसको
   इजाजतपत्रयुक्त स्रोत प्रतिलिपि गरेर होइन।
4. परीक्षणहरू समावेश गर्नुहोस् र `check:compression-budget` गेट अझै पनि पास हुने पुष्टि गर्नुहोस्।

---

## आउटपुट शैली थप्ने

आउटपुट शैलीहरू (हेर्नुहोस् [गाइडको क्याटलग तालिका](./COMPRESSION_GUIDE.md#output-styles-catalog))
इनपुट इन्जिनहरूको प्रतिक्रिया-पक्षीय समकक्ष हुन्: तपाईंले पठाउने सामग्रीलाई सङ्कुचित गर्नुको
सट्टा, तिनले मोडेललाई कम खर्चिलो आउटपुट उत्पादन गर्न निर्देशन दिन्छन्। रजिस्ट्री
`open-sse/services/compression/outputStyles/catalog.ts` मा रहेको `OUTPUT_STYLE_CATALOG` हो, र
**एउटा क्याटलग प्रविष्टि नै सम्पूर्ण सुविधा हो**: इन्जेक्टर, ड्यासबोर्ड सेटिङ प्यानल,
पर्सिस्टेन्स र टेलिमेट्री सबैले क्याटलगलाई सूचीबद्ध गर्छन् — अद्यावधिक गर्नुपर्ने अर्को कुनै सूची छैन।

1. **`OUTPUT_STYLE_CATALOG` मा एउटा प्रविष्टि थप्नुहोस्** जसमा `id`, `label`, `description` र
   तीनवटा अङ्ग्रेजी `levels` (`lite`, `full`, `ultra`) हुन्। प्रत्येक स्तर
   `${SHARED_BOUNDARIES}` मा अन्त्य हुनुपर्छ ताकि कोड, पाथ, कमान्ड, त्रुटि र URL हरू जस्ताको तस्तै रहून्।
   निर्देशन पाठ प्रत्येक `(id, level, language)` का लागि **स्थिर र निर्धारणीय** हुनुपर्छ
   — `${SHARED_BOUNDARIES}` मात्र अनुमति दिइएको इन्टरपोलेसन हो।
2. **यसलाई अनुवाद गर्नुहोस्।** `i18n` अन्तर्गत कम्तीमा एउटा `pt-BR` ब्लक समावेश गर्नुहोस्; `ponytail` र
   `i-have-adhd` (en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi) सन्दर्भ संरचना हुन्। जानाजान
   एउटै भाषाको शैलीले यसको सट्टा `locale` सेट गर्छ (`terse-cjk` → `zh` जस्तै) र त्यसपछि
   उक्त लोकेलअन्तर्गत मात्र उपलब्ध गराइन्छ।
3. **म्याट्रिक्स गार्ड अद्यावधिक गर्नुहोस्** — शैलीका भाषाहरूलाई
   `tests/unit/compression/output-styles-i18n-matrix.test.ts` को `BASELINE_LANGUAGES` मा थप्नुहोस्। आवश्यक
   अनुवादहरू नभएको कुनै पनि नयाँ गैर-लोकेल-गेटेड शैलीसँग ट्र्याकिङ इस्युसहित स्पष्ट
   `KNOWN_ENGLISH_ONLY` प्रविष्टि नभएसम्म गेट असफल हुन्छ।
4. **प्रत्येक शैलीका लागि परीक्षण थप्नुहोस्**, जसको नमुना
   `tests/unit/compression/i-have-adhd-catalog.test.ts` हो: क्याटलग संरचना, प्रत्येक स्तरका लागि सीमासम्बन्धी
   क्लज, र प्रत्येक अनुवाद प्रतिलिपि गरिएको अङ्ग्रेजी नभई आफ्नै भाषामा लेखिएको छ भनी पुष्टि गर्ने एङ्कर।
5. **श्रेय**: यदि शैलीलाई कुनै अपस्ट्रिम परियोजनाबाट अनुकूलित गरिएको हो भने, प्रविष्टिमाथिको
   स्रोत टिप्पणीमा त्यसलाई श्रेय दिनुहोस् (जस्तै `i-have-adhd` → ayghri/i-have-adhd, MIT) — माथिको
   "अपस्ट्रिमबाट प्रेरित सुधार प्रस्ताव गर्ने" खण्डकै नियम लागू हुन्छ।

कुनै UI, स्किमा वा टेलिमेट्री परिवर्तन आवश्यक छैन — ती सतहहरू क्याटलगबाट रेन्डर हुन्छन्।

---

## उत्कृष्ट अभ्यासहरू

### इन्जिन विकास

1. **सधैँ `validateConfig` कार्यान्वयन गर्नुहोस्** — प्रमाणीकरण नभएका इन्जिनहरूले मौन विफलता निम्त्याउँछन्
2. **यथार्थपरक `targetLatencyMs` सेट गर्नुहोस्** — रणनीति चयनकर्ताले इन्जिनहरू छनोट गर्न यसको प्रयोग गर्छ
3. **ड्यासबोर्डका लागि `getConfigSchema` प्रयोग गर्नुहोस्** — प्रयोगकर्ताबाट कन्फिग कहिल्यै नलुकाउनुहोस्
4. **तपाईंको इन्जिन शुद्ध भएमा `stackable: true` समर्थन गर्नुहोस्** — साइड इफेक्ट भएका इन्जिनहरू स्ट्याक हुनु हुँदैन
5. **इनलाइन परीक्षणहरू लेख्नुहोस्** — इन्जिनहरू <1s मा प्रमाणीकरण गर्न सकिने हुनुपर्छ

### भाषा प्याक विकास

1. **`lite` तीव्रताबाट सुरु गर्नुहोस्** — तपाईंका नियमहरू सबैभन्दा न्यून सेटिङमा सुरक्षित हुनुपर्छ
2. **नियमहरूको दायरा निर्धारण गर्न `context` प्रयोग गर्नुहोस्** — `user` मात्र लागू हुने नियमहरूले संयोगवश सिस्टम प्रम्प्टहरूलाई असर गर्न सक्दैनन्
3. **JSON कुञ्जीहरू क्याप्चर नगर्नुहोस्** — `\\bword\\b` ले JSON भित्र मिलान गरेर संरचित डेटा बिगार्न सक्छ
4. **सीमान्त अवस्थाहरूसँग परीक्षण गर्नुहोस्** — खाली इनपुट, युनिकोड, RTL पाठ, इमोजीहरू
5. **अवस्थित प्याकहरूलाई टेम्प्लेटका रूपमा प्रयोग गर्नुहोस्** — `en/filler.json` सबैभन्दा विकसित उदाहरण हो

### पाइपलाइन डिजाइन

1. **अनुकूलन गर्नुअघि प्रोफाइल गर्नुहोस्** — पहिले `compression_stats` प्रयोग गरेर मापन गर्नुहोस्
2. **पुनःकार्यान्वयनभन्दा संयोजनलाई प्राथमिकता दिनुहोस्** — नयाँ इन्जिन लेख्नुअघि Caveman नियमहरू विस्तार गर्नुहोस्
3. **क्रमको औचित्य दस्तावेजीकरण गर्नुहोस्** — इन्जिन A किन इन्जिन B भन्दा अगाडि छ भनेर टिप्पणी गर्नुहोस्
4. **तीनवटै तीव्रता स्तरमा परीक्षण गर्नुहोस्** — `lite` छिटो तर हानिकारक छ, `ultra` ढिलो तर सटीक छ

---

## सन्दर्भ: अन्तर्निर्मित इन्जिनहरू

| इन्जिन ID            | स्ट्याकयोग्य | पूर्वनिर्धारित stackPriority | लक्ष्यहरू                            |
| -------------------- | ------------ | ---------------------------- | ------------------------------------ |
| `lite`               | हो           | 5                            | सन्देशहरू, tool_results              |
| `rtk`                | हो           | 10                           | tool_results                         |
| `standard` (caveman) | हो           | 20                           | सन्देशहरू, tool_results, code_blocks |
| `aggressive`         | हो           | 30                           | सन्देशहरू                            |
| `ultra`              | हो           | 40                           | सन्देशहरू, code_blocks               |

### यो पनि हेर्नुहोस्

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — पाइपलाइनको सिंहावलोकन
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — इन्जिन रजिस्ट्री सन्दर्भ
- [COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md) — नियम ढाँचा विनिर्देश
- [COMPRESSION_LANGUAGE_PACKS.md](./COMPRESSION_LANGUAGE_PACKS.md) — भाषा प्याकका विवरणहरू
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — RTK इन्जिन र अनुकूल फिल्टरहरू
- स्रोत: `open-sse/services/compression/` (117 फाइलहरू, ~250KB)
