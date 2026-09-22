# Extending the Compression Pipeline (हिन्दी)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/EXTENDING_COMPRESSION.md) · 🇪🇹 [am](../../../am/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇦 [ar](../../../ar/docs/compression/EXTENDING_COMPRESSION.md) · 🇦🇿 [az](../../../az/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇬 [bg](../../../bg/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇩 [bn](../../../bn/docs/compression/EXTENDING_COMPRESSION.md) · 🇨🇿 [cs](../../../cs/docs/compression/EXTENDING_COMPRESSION.md) · 🇩🇰 [da](../../../da/docs/compression/EXTENDING_COMPRESSION.md) · 🇩🇪 [de](../../../de/docs/compression/EXTENDING_COMPRESSION.md) · 🇬🇷 [el](../../../el/docs/compression/EXTENDING_COMPRESSION.md) · 🇪🇸 [es](../../../es/docs/compression/EXTENDING_COMPRESSION.md) · 🇪🇪 [et](../../../et/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇷 [fa](../../../fa/docs/compression/EXTENDING_COMPRESSION.md) · 🇫🇮 [fi](../../../fi/docs/compression/EXTENDING_COMPRESSION.md) · 🇫🇷 [fr](../../../fr/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇪 [ga](../../../ga/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [gu](../../../gu/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [ha](../../../ha/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇱 [he](../../../he/docs/compression/EXTENDING_COMPRESSION.md) · 🇭🇷 [hr](../../../hr/docs/compression/EXTENDING_COMPRESSION.md) · 🇭🇺 [hu](../../../hu/docs/compression/EXTENDING_COMPRESSION.md) · 🇦🇲 [hy](../../../hy/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇩 [id](../../../id/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [ig](../../../ig/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇹 [it](../../../it/docs/compression/EXTENDING_COMPRESSION.md) · 🇯🇵 [ja](../../../ja/docs/compression/EXTENDING_COMPRESSION.md) · 🇬🇪 [ka](../../../ka/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇭 [km](../../../km/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [kn](../../../kn/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇷 [ko](../../../ko/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇹 [lt](../../../lt/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇻 [lv](../../../lv/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [ml](../../../ml/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [mr](../../../mr/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇾 [ms](../../../ms/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇹 [mt](../../../mt/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇲 [my](../../../my/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇵 [ne](../../../ne/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇱 [nl](../../../nl/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇴 [no](../../../no/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [or](../../../or/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [pa](../../../pa/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇭 [phi](../../../phi/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇱 [pl](../../../pl/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇹 [pt](../../../pt/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇴 [ro](../../../ro/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇺 [ru](../../../ru/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇰 [si](../../../si/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇰 [sk](../../../sk/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇮 [sl](../../../sl/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇸 [sr](../../../sr/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇪 [sv](../../../sv/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇪 [sw](../../../sw/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [ta](../../../ta/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [te](../../../te/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇭 [th](../../../th/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇷 [tr](../../../tr/docs/compression/EXTENDING_COMPRESSION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇰 [ur](../../../ur/docs/compression/EXTENDING_COMPRESSION.md) · 🇺🇿 [uz](../../../uz/docs/compression/EXTENDING_COMPRESSION.md) · 🇻🇳 [vi](../../../vi/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [yo](../../../yo/docs/compression/EXTENDING_COMPRESSION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/EXTENDING_COMPRESSION.md)

---

> **संक्षेप में**: OmniRoute का कम्प्रेशन इंजन **प्लग करने योग्य** है — आप कस्टम इंजन पंजीकृत कर सकते हैं, नई भाषाओं के लिए भाषा पैक उपलब्ध करा सकते हैं और स्टैक्ड पाइपलाइन संयोजित कर सकते हैं। यह मार्गदर्शिका बताती है कि ऐसा कैसे करें।

**संबंधित मार्गदर्शिकाएँ:**

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — संपूर्ण पाइपलाइन का अवलोकन
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — इंजन रजिस्ट्री और अंतर्निहित इंजन
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — RTK इंजन और कस्टम फ़िल्टर
- [COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md) — नियम पैक प्रारूप संदर्भ

---

## अवलोकन

कम्प्रेशन सिस्टम में **3 विस्तार बिंदु** हैं:

| विस्तार बिंदु        | उपयोग का मामला                                                          | कठिनाई  |
| -------------------- | ----------------------------------------------------------------------- | ------- |
| **कस्टम इंजन**       | एक बिल्कुल नया कम्प्रेशन एल्गोरिदम जोड़ें (जैसे, डोमेन-विशिष्ट सारांशक) | उन्नत   |
| **भाषा पैक**         | किसी नई प्राकृतिक भाषा के लिए समर्थन जोड़ें (जैसे, हिन्दी, अरबी)        | मध्यम   |
| **स्टैक्ड पाइपलाइन** | मौजूदा इंजनों को कस्टम क्रम में संयोजित करें                            | शुरुआती |

```
┌─────────────────────────────────────────────────────────────┐
│                    कम्प्रेशन रणनीति                          │
│                                                              │
│   इनपुट संदेश ──▶ getEffectiveMode() ──▶ मोड                │
│                                              │               │
│                      ┌───────────────────────┼──────────┐    │
│                      │         │         │         │    │    │
│                      ▼         ▼         ▼         ▼    │    │
│                   "rtk"    "lite"   "standard" "stacked"    │
│                      │         │         │         │    │    │
│                      ▼         ▼         ▼         ▼    │    │
│                   RTK       Lite     Caveman   engines[]   │
│                   इंजन      इंजन      इंजन      श्रृंखलाबद्ध │
│                      │         │         │         │    │    │
│                      └─────────┴─────────┴─────────┘    │    │
│                                      │                    │
│                                      ▼                    │
│                             कम्प्रेस किया गया आउटपुट       │
└─────────────────────────────────────────────────────────────┘

रणनीति चयनकर्ता मोड-आधारित है: प्रत्येक अनुरोध एक मोड चुनता है
(rtk / lite / standard / aggressive / ultra / stacked / off)।
केवल "stacked" मोड कई इंजनों को क्रमिक रूप से श्रृंखलाबद्ध करता है।
डिफ़ॉल्ट स्वतः-ट्रिगर मोड "lite" है (3-स्तरीय प्राथमिकता श्रृंखला नहीं)।
```

---

## कस्टम कम्प्रेशन इंजन लिखना

इंजन इंटरफ़ेस (`open-sse/services/compression/engines/types.ts`) वह अनुबंध है जिसे प्रत्येक इंजन को पूरा करना आवश्यक है। इसमें 5 आवश्यक मेथड हैं।

### `CompressionEngine` इंटरफ़ेस

```ts
interface CompressionEngine {
  id: string; // अद्वितीय इंजन ID
  name: string; // प्रदर्शन नाम
  description: string; // संक्षिप्त विवरण
  icon: string; // आइकन (इमोजी या URL)
  targets: CompressionEngineTarget[]; // ["messages", "tool_results", "code_blocks"]
  stackable: boolean; // क्या इसे स्टैक्ड पाइपलाइन में उपयोग किया जा सकता है
  stackPriority: number; // स्टैक्ड पाइपलाइनों में क्रम (कम = पहले)
  metadata: CompressionEngineMetadata;

  apply(body, options?): CompressionResult;
  compress(body, config?): CompressionResult;
  getConfigSchema(): EngineConfigField[];
  validateConfig(config): EngineValidationResult;
}
```

### न्यूनतम उदाहरण: व्हाइटस्पेस इंजन

सबसे सरल संभव इंजन — संदेशों से अतिरिक्त व्हाइटस्पेस हटाता है।

````ts
import type { CompressionEngine } from "omniroute/compression/engines/types";
import { registerCompressionEngine } from "omniroute/compression/engines/registry";

function preserveCodeBlocks(text: string): string {
  // कोड ब्लॉक मार्करों के आधार पर विभाजित करें और उनके अंदर के व्हाइटस्पेस को सुरक्षित रखें
  const parts = text.split(/(```[\s\S]*?```)/);
  return parts
    .map((part) => {
      if (part.startsWith("```")) {
        return part; // कोड ब्लॉक में बदलाव न करें
      }
      return part.replace(/\n{3,}/g, "\n\n"); // केवल गद्य पर लागू करें
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
  stackPriority: 100, // caveman/rtk के बाद चलाएँ

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

    // संदेश ऐरे को ट्रैवर्स करें — स्ट्रिंग और मल्टीपार्ट, दोनों प्रकार की सामग्री को संभालें
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
      // मल्टीपार्ट सामग्री: भागों को ट्रैवर्स करें, केवल टेक्स्ट भागों को कंप्रेस करें
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
          return part; // image_url, tool_use आदि को सुरक्षित रखें
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

// वैश्विक रूप से पंजीकृत करें
registerCompressionEngine(whitespaceEngine);
````

### कस्टम इंजन कहाँ रखें

```
~/.omniroute/compression/engines/my-engine.ts    # उपयोगकर्ता-स्तरीय
<project>/compression-engines/my-engine.ts        # प्रोजेक्ट-स्तरीय (स्टार्टअप पर लोड किया जाता है)
```

या किसी प्लगइन से प्रोग्रामेटिक रूप से लोड करें:

```ts
// आपके प्लगइन में
import {
  registerCompressionEngine,
  unregisterCompressionEngine,
} from "@omniroute/open-sse/services/compression/engines/registry";
import { myEngine } from "./engines/my-engine";

export default definePlugin({
  name: "my-compression-plugin",
  // प्लगइन SDK onRequest / onResponse / onError हुक उपलब्ध कराता है। इंजन को
  // प्लगइन मॉड्यूल लोड होने पर (या पहले onRequest पर) पंजीकृत करें; इसे अपने
  // स्वयं के टियरडाउन पथ से अपंजीकृत करें।
  onRequest: async (ctx) => {
    registerCompressionEngine(myEngine);
  },
});

// टियरडाउन पर:
// unregisterCompressionEngine("my-engine");
```

### अपने इंजन का परीक्षण करना

अपने इंजन को किसी प्लगइन या स्टार्टअप फ़ंक्शन में पंजीकृत करें। पंजीकृत होने के बाद, इंजन अपने `id` के माध्यम से
रणनीति चयनकर्ता में उपलब्ध होगा। इसे स्टैक्ड पाइपलाइन में संयोजित करके एकीकरण का परीक्षण करें:

---

## भाषा पैक बनाना

Caveman-शैली संपीड़न प्रत्येक प्राकृतिक भाषा में भराव शब्दों, हिचकिचाहट वाले वाक्यांशों और अनावश्यक रूप से लंबे पैटर्न को संभालने के लिए **भाषा-विशिष्ट नियम पैक** का उपयोग करता है। OmniRoute में **6 भाषा पैक** शामिल हैं: `en`, `es`, `fr`, `de`, `ja`, `pt-BR`।

### पैक संरचना

भाषा पैक, `open-sse/services/compression/rules/<language>/` के अंतर्गत **JSON फ़ाइलों** की एक डायरेक्टरी है:

```
open-sse/services/compression/rules/
├── en/
│   ├── filler.json          # अभिवादन, हिचकिचाहट वाले वाक्यांश, विनम्रता
│   ├── context.json         # संदर्भ कम करने वाले नियम
│   ├── dedup.json           # डुप्लिकेशन हटाने के नियम
│   ├── structural.json      # विराम-चिह्न, फ़ॉर्मेटिंग
│   └── ultra.json           # आक्रामक संपीड़न नियम
├── es/  (समान संरचना)
├── fr/  (समान संरचना)
├── de/  (समान संरचना)
├── ja/  (समान संरचना)
└── pt-BR/ (समान संरचना)
```

### नियम की संरचना

प्रत्येक नियम का स्वरूप यह होता है (`open-sse/services/compression/ruleLoader.ts` से):

```ts
interface FileRule {
  name: string; // मानव-पठनीय नाम (kebab-case)
  pattern: string; // JavaScript रेगेक्स पैटर्न
  replacement?: string; // मिलान को जिससे बदलना है
  replacementMap?: Record<string, string>; // या कुंजी→प्रतिस्थापन मैप
  flags?: string; // रेगेक्स फ़्लैग (आमतौर पर "gi")
  context?: "all" | "user" | "system" | "assistant";
  category?: "filler" | "context" | "structural" | "dedup" | "terse" | "ultra";
  minIntensity?: "lite" | "full" | "ultra"; // इस तीव्रता से नीचे छोड़ दें
  description?: string; // दस्तावेज़ीकरण
}
```

### उदाहरण: हिन्दी के भराव नियम जोड़ना

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

### सत्यापन

लोड किए जाने पर नियम पैकों को `_schema.json` के विरुद्ध सत्यापित किया जाता है। गलत संरचना वाला पैक लोड होने में विफल रहेगा और एक त्रुटि लॉग करेगा:

```
RULE_LOADER: pack "hi/filler.json" failed validation:
  - rules.0.pattern: Invalid regex
  - rules.1.context: must be one of [all, user, system, assistant]
```

जब कोई पैक लोड किया जाता है, तब सत्यापन (`_schema.json` के विरुद्ध) अपने आप चलता है; किसी
अमान्य पैक को अस्वीकार कर दिया जाता है और ऊपर दी गई त्रुटि लॉग की जाती है। पैक सत्यापन के लिए कोई अलग
`npm run` स्क्रिप्ट नहीं है — पैक लोड करें (उदाहरण के लिए, सर्वर शुरू करें या
संपीड़न पथ चलाएँ) और लॉग देखें।

### कस्टम भाषा पैक लोड करना

```ts
import { loadRulePack } from "omniroute/compression/ruleLoader";

await loadRulePack("./my-custom-rules/hi/filler.json");
```

या इसे किसी मान्यता प्राप्त स्थान पर रखें:

```
~/.omniroute/compression/rules/hi/filler.json  # उपयोगकर्ता-स्तर
<project>/.compression/rules/hi/filler.json   # प्रोजेक्ट-स्तर
```

### भाषा पैकों के लिए सर्वोत्तम अभ्यास

1. **`filler` से शुरुआत करें** — ये सबसे अधिक प्रभाव डालने वाले नियम हैं
2. **आक्रामक नियमों को नियंत्रित करने के लिए `minIntensity` का उपयोग करें** — यह अत्यधिक संपीड़न से बचाता है
3. **परीक्षण मामले शामिल करें** — व्यवहार सत्यापित करने के लिए JSON में `tests[]` ऐरे जोड़ें
4. **क्रम महत्वपूर्ण है** — पहले के नियम पहले लागू होते हैं; अधिक प्रभाव वाले नियम पहले रखें
5. **`replacement` का उपयोग सावधानी से करें** — सामान्यतः खाली स्ट्रिंग सही होती है; कभी भी नई सामग्री न जोड़ें

### अनुवाद रणनीति

नियम पैकों को किसी नई भाषा के लिए स्थानीयकृत करते समय:

1. **नियमों के नामों का अनुवाद करें** — वे डीबग आउटपुट में दिखाई देते हैं
2. **रेगेक्स पैटर्न को अनुकूलित करें** — सीधा अनुवाद अक्सर विफल होता है (शब्द सीमाएँ अलग होती हैं)
3. **वास्तविक वार्तालापों पर परीक्षण करें** — पैक वास्तविक इनपुट पर सुरक्षित होना चाहिए
4. **सांस्कृतिक परंपराओं से मेल बैठाएँ** — उदाहरण के लिए, जापानी पैकों में अंग्रेज़ी की तुलना में अधिक आदरसूचक भराव वाक्यांश होते हैं

---

## स्टैक्ड पाइपलाइन

एक **स्टैक्ड पाइपलाइन** कई इंजनों को क्रमिक रूप से चलाती है, जिसमें प्रत्येक इंजन का आउटपुट अगले इंजन का इनपुट बनता है। आंतरिक रूप से `mode: stacked` इसी तरह काम करता है।

### स्टैकिंग कैसे काम करती है

```
इनपुट (10,000 टोकन)
        │
        ▼
   ┌──────────┐
   │  इंजन    │  प्राथमिकता 10
   │  A       │  ──▶ आउटपुट: 6,000 टोकन (-40%)
   └────┬─────┘
        ▼
   ┌──────────┐
   │  इंजन    │  प्राथमिकता 50
   │  B       │  ──▶ आउटपुट: 2,400 टोकन (-60%)
   └────┬─────┘
        ▼
   ┌──────────┐
   │  इंजन    │  प्राथमिकता 100
   │  C       │  ──▶ आउटपुट: 1,200 टोकन (-80%)
   └────┬─────┘
        │
        ▼
अंतिम आउटपुट (1,200 टोकन, कुल मिलाकर ~88% बचत)
```

जब `mode: "stacked"` चुना जाता है, तो इंजन `pipeline` ऐरे में निर्दिष्ट क्रम के अनुसार एक-के-बाद-एक निष्पादित होते हैं।
इंजन N का आउटपुट इंजन N+1 का इनपुट बन जाता है।

### संपीड़न मोड

OmniRoute कॉन्फ़िगरेशन, स्वतः-ट्रिगर थ्रेशोल्ड और कॉम्बो ओवरराइड के आधार पर **प्रत्येक अनुरोध के लिए एक मोड** चुनता है।
उपलब्ध मोड `open-sse/services/compression/types.ts` में परिभाषित हैं (`CompressionMode` प्रकार):

| मोड          | इंजन                 | उपयोग का मामला                                                                                                                                                                                |
| ------------ | -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `off`        | कोई नहीं             | सभी संपीड़न अक्षम करें                                                                                                                                                                        |
| `rtk`        | केवल RTK             | कमांड-आउटपुट प्रधान सत्र (80%+ बचत)                                                                                                                                                           |
| `lite`       | केवल Lite            | रूढ़िवादी संपीड़न (तेज़, सुरक्षित)                                                                                                                                                            |
| `standard`   | Caveman              | भाषा पैक के साथ गद्य संपीड़न                                                                                                                                                                  |
| `aggressive` | Caveman + Aggressive | आक्रामक गद्य संपीड़न + आक्रामक अंतिम पास                                                                                                                                                      |
| `ultra`      | Ultra                | अधिकतम संपीड़न (हानिपूर्ण, अंतिम उपाय)। `ultra.modelPath` सेट होने पर वैकल्पिक रूप से **LLMLingua-2** SLM इंजन से रूट किया जाता है (मॉडल अनुपलब्ध होने पर नियम-आधारित पथ पर फेल-ओपन होता है)। |
| `stacked`    | कस्टम पाइपलाइन       | इंजनों को किसी भी क्रम में संयोजित करें (नीचे देखें)                                                                                                                                          |

> ऊपर दिए गए मोड इंजनों के अतिरिक्त, रजिस्ट्री में विशेष स्टैक किए जा सकने वाले इंजन भी शामिल हैं —
> **CCR**, **headroom**, **ionizer**, और **session-dedup** — जिनका दस्तावेज़ीकरण
> [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md#additional-built-in-engines) में किया गया है।

मोड चयन `open-sse/services/compression/strategySelector.ts` में `getEffectiveMode()` द्वारा निर्धारित किया जाता है:

1. यदि संपीड़न अक्षम है: `"off"`
2. यदि कोई कॉम्बो ओवरराइड मौजूद है: ओवरराइड का उपयोग करें
3. यदि स्वतः-ट्रिगर थ्रेशोल्ड पार हो गया है: `autoTriggerMode` का उपयोग करें (डिफ़ॉल्ट: `"lite"`)
4. अन्यथा: `defaultMode` का उपयोग करें

### डिफ़ॉल्ट स्टैक्ड पाइपलाइन

जब `mode: "stacked"` स्पष्ट रूप से कॉन्फ़िगर किया जाता है, तो डिफ़ॉल्ट पाइपलाइन निम्नलिखित को संयोजित करती है:

1. **RTK** — कमांड आउटपुट का शोर हटाएँ (टर्मिनल आउटपुट पर ~80% बचत)
2. **Caveman** — अनावश्यक शब्द हटाएँ, गद्य को संक्षिप्त करें (शेष टेक्स्ट पर ~46%)
3. **Lite** — अंतिम व्हाइटस्पेस + डीडुप्लिकेशन पास

यह संयोजन टूल-प्रधान सत्रों में **78-95% बचत** प्राप्त करता है।

### स्टैक्ड पाइपलाइन कॉन्फ़िगर करना

कॉम्बो कॉन्फ़िगरेशन में:

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

आप इंजनों को हटा सकते हैं, कस्टम इंजन जोड़ सकते हैं या उनका क्रम बदल सकते हैं।

### स्थिति पास करना

इंजन अनुरोध संदर्भ (`options` में) से मेटाडेटा पढ़ सकते हैं:

```ts
compress(body, config) {
  // पिछले इंजनों से मेटाडेटा पढ़ें
  const original = options?.compressionComboId;  // "my-coding-combo"
  // ...
}
```

मेटाडेटा **केवल पढ़ने योग्य** होता है — इंजन अनुरोध संदर्भ को परिवर्तित नहीं कर सकते, केवल अपने बॉडी आउटपुट को परिवर्तित कर सकते हैं।

### निष्पादन क्रम की पेचीदगियाँ

| इंजन क्रम                            | प्रभाव                                                                                      |
| ------------------------------------ | ------------------------------------------------------------------------------------------- |
| RTK → Caveman → Lite                 | **अनुशंसित** (पहले शोर हटाता है, फिर भाषा को संक्षिप्त करता है, फिर व्हाइटस्पेस हटाता है)   |
| Lite → RTK → Caveman                 | खराब — Lite कच्चे आउटपुट से व्हाइटस्पेस हटा देता है, जिससे RTK पैटर्न मिलान विफल हो जाता है |
| Caveman → RTK                        | खराब — Caveman टेक्स्ट को इस तरह दोबारा लिख सकता है कि RTK उसे पहचान न पाए                  |
| किसी भी क्रम में पहले `tool_results` | बेहतर — टूल आउटपुट सबसे अधिक शोरयुक्त सामग्री है                                            |

### कब स्टैक नहीं करना चाहिए

स्टैकिंग हमेशा बेहतर नहीं होती:

- **सरल संदेश** (कोई टूल आउटपुट नहीं) — केवल Caveman या Lite पर्याप्त है
- **लागत-संवेदनशील** — प्रत्येक इंजन ~5-50ms विलंबता जोड़ता है
- **विशिष्ट टूल** — शेल आउटपुट के लिए आम तौर पर केवल RTK पर्याप्त होता है

### कस्टम पाइपलाइन बनाना

कोई named-pipeline registry नहीं है। stacked pipeline केवल **steps की एक inline array**
है, जिसे `applyStackedCompression()` में पास किया जाता है (`@omniroute/open-sse/services/compression/strategySelector`
से export किया गया है):

```ts
import { applyStackedCompression } from "@omniroute/open-sse/services/compression/strategySelector";

const result = applyStackedCompression(body, [
  { engine: "rtk", intensity: "aggressive" },
  { engine: "caveman", intensity: "full" },
]);
```

जब आप कोई pipeline पास नहीं करते हैं, तो यह डिफ़ॉल्ट रूप से `rtk(standard) → caveman(full)` होता है।

इसे config से संचालित करने के लिए, `mode: "stacked"` सेट करें और step array को
`stackedPipeline` के अंतर्गत दें (`config.stackedPipeline` से पढ़ा जाता है):

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

## अपस्ट्रीम सिंक नीति

OmniRoute के compression engines README में कई अपस्ट्रीम प्रोजेक्ट्स को श्रेय देते हैं
("RTK, Caveman, LLMLingua-2, Troglodita से प्रेरित")। योगदानकर्ताओं का एक सामान्य
प्रश्न है: **जब अपस्ट्रीम RTK कोई नया टूल फ़िल्टर जोड़ता है या Caveman कोई नियम
पैक जोड़ता है, तो वह OmniRoute तक कैसे पहुँचता है?** यह अनुभाग इसका आधिकारिक उत्तर है।

### वेंडर की गई प्रतियाँ बनाम स्वतंत्र कार्यान्वयन

| इंजन                         | अपस्ट्रीम से संबंध                                                                                                                    | स्थान                                                               |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| **RTK**                      | **स्वतंत्र पुनःकार्यान्वयन** (इससे प्रेरित, इसकी प्रति नहीं)                                                                          | `open-sse/services/compression/engines/rtk/`                        |
| **Caveman**                  | **स्वतंत्र पुनःकार्यान्वयन** (इससे प्रेरित)                                                                                           | `open-sse/services/compression/engines/cavemanAdapter.ts`           |
| **Headroom**                 | अधिकांशतः आंतरिक; केवल `gcf/` codec ही वास्तव में `gcf-typescript` से **वेंडर किया गया** है (MIT, SPDX-चिह्नित, केवल generic profile) | `open-sse/services/compression/engines/headroom/gcf/`               |
| **LLMLingua-2 / Troglodita** | इनसे प्रेरित (`llmlingua` + `session-dedup` engines को संचालित करते हैं)                                                              | `open-sse/services/compression/engines/llmlingua/`, `session-dedup` |

मुख्य बात: **RTK और Caveman _विचारों_ (फ़िल्टर नियम, नियम पैक) के clean-room
TypeScript कार्यान्वयन हैं, वेंडर किए गए source trees नहीं।** ऐसा कोई
अपस्ट्रीम प्रतिरूप नहीं है जिससे `git pull` किया जा सके — और ठीक इसी कारण README में
"bundled" के बजाय "inspired by" लिखा है।

### अपस्ट्रीम सुधारों को कैसे मर्ज किया जाता है

डिज़ाइन के अनुसार, **कोई स्वचालित अपस्ट्रीम-रिलीज़ ट्रैकिंग और कोई `compression-sync`
लेबल नहीं है**। चूँकि engines पुनःकार्यान्वयन हैं, इसलिए किसी अपस्ट्रीम RTK
फ़िल्टर या Caveman नियम पैक को कोड के रूप में मर्ज नहीं किया जाता; उसे **OmniRoute के
अपने प्रारूप में एक नए नियम/फ़िल्टर के रूप में पुनः व्यक्त किया जाता है** (देखें
[COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md)) और एक सामान्य PR के
माध्यम से आवश्यकतानुसार शामिल किया जाता है। ऊपर दिए गए extension points (custom engine,
language pack, RTK filter) इनमें से किसी का योगदान करने के स्वीकृत तरीके हैं।

ठीक इसी प्रक्रिया के हाल के उदाहरण:

- Gradle और `dotnet` build output के लिए RTK फ़िल्टर (v3.8.42)
- kubectl / docker-build / composer / gh के लिए RTK फ़िल्टर (#2824)
- Caveman Indonesian language pack (#3975), साथ ही German / French / Japanese / Chinese packs

### Headroom (input-compression proxy)

Headroom **पूरी तरह आंतरिक** है — एक pinned vendored `gcf` codec snapshot के साथ
OmniRoute की अपनी `smartcrusher` / `toon` / `tabular` layers। वेंडर की गई प्रति से
परे ट्रैक करने के लिए कोई सक्रिय अपस्ट्रीम नहीं है; codec बदलने पर `gcf` के अपडेट
मैन्युअल रूप से रीफ़्रेश किए जाते हैं और compression budget gate
(`check:compression-budget`) के विरुद्ध फिर से सत्यापित किए जाते हैं।

### अपस्ट्रीम-प्रेरित सुधार का प्रस्ताव देना

1. **वेंडर न करें** — अपस्ट्रीम नियम/फ़िल्टर को OmniRoute के प्रारूप में पुनः व्यक्त करें।
2. इसे नीचे दिए गए उपयुक्त extension point (language pack, RTK filter, या
   custom engine) के माध्यम से जोड़ें।
3. PR विवरण में अपस्ट्रीम प्रोजेक्ट का संदर्भ दें (श्रेय के लिए), उसके
   license-bearing source की प्रतिलिपि बनाकर नहीं।
4. परीक्षण शामिल करें और पुष्टि करें कि `check:compression-budget` gate अब भी पास होता है।

---

## आउटपुट शैली जोड़ना

आउटपुट शैलियाँ ([गाइड की कैटलॉग तालिका](./COMPRESSION_GUIDE.md#output-styles-catalog) देखें)
इनपुट इंजनों का प्रतिक्रिया-पक्षीय समकक्ष हैं: आप जो भेजते हैं उसे संपीड़ित करने के बजाय,
वे मॉडल को कम खर्चीला आउटपुट उत्पन्न करने का निर्देश देती हैं। रजिस्ट्री
`open-sse/services/compression/outputStyles/catalog.ts` में `OUTPUT_STYLE_CATALOG` है, और
**एक कैटलॉग प्रविष्टि ही पूरी सुविधा है**: इंजेक्टर, डैशबोर्ड सेटिंग्स पैनल,
स्थायित्व और टेलीमेट्री—सभी कैटलॉग की प्रविष्टियों को सूचीबद्ध करते हैं—अपडेट करने के लिए कोई अन्य सूची नहीं है।

1. **`OUTPUT_STYLE_CATALOG` में एक प्रविष्टि जोड़ें** जिसमें `id`, `label`, `description` और
   तीन अंग्रेज़ी `levels` (`lite`, `full`, `ultra`) हों। प्रत्येक स्तर के अंत में
   `${SHARED_BOUNDARIES}` होना चाहिए, ताकि कोड, पाथ, कमांड, त्रुटियाँ और URLs हूबहू बने रहें।
   निर्देश का टेक्स्ट प्रत्येक `(id, level, language)` के लिए **स्थिर और निर्धारक** होना चाहिए—
   केवल `${SHARED_BOUNDARIES}` इंटरपोलेशन की अनुमति है।
2. **इसका अनुवाद करें।** `i18n` के अंतर्गत कम-से-कम एक `pt-BR` ब्लॉक प्रदान करें; `ponytail` और
   `i-have-adhd` (en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi) संदर्भ संरचना हैं। जानबूझकर
   केवल एक भाषा वाली शैली इसके बजाय `locale` सेट करती है (जैसे `terse-cjk` → `zh`) और फिर
   केवल उसी लोकेल में उपलब्ध कराई जाती है।
3. **मैट्रिक्स गार्ड अपडेट करें**—शैली की भाषाओं को
   `tests/unit/compression/output-styles-i18n-matrix.test.ts` में `BASELINE_LANGUAGES` में जोड़ें।
   यह गेट आवश्यक अनुवादों के बिना किसी भी नई, गैर-लोकेल-गेटेड शैली को विफल कर देता है, जब तक कि उसके साथ
   ट्रैकिंग इश्यू वाली स्पष्ट `KNOWN_ENGLISH_ONLY` प्रविष्टि न हो।
4. **प्रति-शैली टेस्ट जोड़ें**, जिसका मॉडल
   `tests/unit/compression/i-have-adhd-catalog.test.ts` पर आधारित हो: कैटलॉग संरचना, प्रत्येक स्तर के लिए
   सीमाओं का क्लॉज़, और यह सत्यापित करने वाला एक एंकर कि प्रत्येक अनुवाद कॉपी की गई अंग्रेज़ी के बजाय
   अपनी भाषा में लिखा गया है।
5. **श्रेय**: यदि शैली किसी अपस्ट्रीम प्रोजेक्ट से अनुकूलित की गई है, तो प्रविष्टि पर स्रोत टिप्पणी में
   उसे श्रेय दें (जैसे `i-have-adhd` → ayghri/i-have-adhd, MIT)—वही नियम जो ऊपर
   "अपस्ट्रीम-प्रेरित सुधार प्रस्तावित करना" के लिए है।

किसी UI, स्कीमा या टेलीमेट्री परिवर्तन की आवश्यकता नहीं है—ये सतहें कैटलॉग से रेंडर होती हैं।

---

## सर्वोत्तम अभ्यास

### इंजन विकास

1. **हमेशा `validateConfig` लागू करें**—सत्यापन के बिना इंजन मूक विफलताएँ पैदा करते हैं
2. **यथार्थवादी `targetLatencyMs` सेट करें**—इंजन चुनने के लिए रणनीति चयनकर्ता इसका उपयोग करता है
3. **डैशबोर्ड के लिए `getConfigSchema` का उपयोग करें**—कॉन्फ़िगरेशन को उपयोगकर्ताओं से कभी न छिपाएँ
4. **यदि आपका इंजन शुद्ध है, तो `stackable: true` का समर्थन करें**—दुष्प्रभाव वाले इंजनों को स्टैक नहीं होना चाहिए
5. **इनलाइन टेस्ट लिखें**—इंजनों को <1s में सत्यापित किया जा सकना चाहिए

### भाषा पैक विकास

1. **`lite` तीव्रता से शुरू करें**—आपके नियम न्यूनतम सेटिंग पर सुरक्षित होने चाहिए
2. **नियमों का दायरा तय करने के लिए `context` का उपयोग करें**—केवल `user` वाले नियम अनजाने में सिस्टम प्रॉम्प्ट को प्रभावित नहीं कर सकते
3. **JSON कुंजियों को कैप्चर करने से बचें**—`\\bword\\b` JSON के भीतर मेल खा सकता है, जिससे संरचित डेटा टूट सकता है
4. **विशेष स्थितियों के साथ टेस्ट करें**—खाली इनपुट, unicode, RTL टेक्स्ट, emojis
5. **मौजूदा पैक्स को टेम्पलेट के रूप में उपयोग करें**—`en/filler.json` सबसे अधिक विकसित उदाहरण है

### पाइपलाइन डिज़ाइन

1. **अनुकूलन से पहले प्रोफ़ाइल करें**—पहले `compression_stats` से मापें
2. **पुनः कार्यान्वयन के बजाय संयोजन को प्राथमिकता दें**—नया इंजन लिखने से पहले Caveman नियमों का विस्तार करें
3. **क्रम का औचित्य दस्तावेज़ित करें**—टिप्पणी में बताएँ कि इंजन A, इंजन B से पहले क्यों है
4. **सभी 3 तीव्रता स्तरों पर टेस्ट करें**—`lite` तेज़ लेकिन हानिपूर्ण है, `ultra` धीमा लेकिन सटीक है

---

## संदर्भ: अंतर्निहित इंजन

| इंजन ID              | स्टैक करने योग्य | डिफ़ॉल्ट stackPriority | लक्ष्य                       |
| -------------------- | ---------------- | ---------------------- | ---------------------------- |
| `lite`               | हाँ              | 5                      | संदेश, टूल परिणाम            |
| `rtk`                | हाँ              | 10                     | टूल परिणाम                   |
| `standard` (caveman) | हाँ              | 20                     | संदेश, टूल परिणाम, कोड ब्लॉक |
| `aggressive`         | हाँ              | 30                     | संदेश                        |
| `ultra`              | हाँ              | 40                     | संदेश, कोड ब्लॉक             |

### यह भी देखें

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — पाइपलाइन का अवलोकन
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — इंजन रजिस्ट्री संदर्भ
- [COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md) — नियम प्रारूप विनिर्देश
- [COMPRESSION_LANGUAGE_PACKS.md](./COMPRESSION_LANGUAGE_PACKS.md) — भाषा पैक का विवरण
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — RTK इंजन और कस्टम फ़िल्टर
- स्रोत: `open-sse/services/compression/` (117 फ़ाइलें, ~250KB)
