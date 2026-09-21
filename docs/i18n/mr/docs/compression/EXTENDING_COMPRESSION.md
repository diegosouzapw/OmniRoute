# Extending the Compression Pipeline (मराठी)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/EXTENDING_COMPRESSION.md) · 🇪🇹 [am](../../../am/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇦 [ar](../../../ar/docs/compression/EXTENDING_COMPRESSION.md) · 🇦🇿 [az](../../../az/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇬 [bg](../../../bg/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇩 [bn](../../../bn/docs/compression/EXTENDING_COMPRESSION.md) · 🇨🇿 [cs](../../../cs/docs/compression/EXTENDING_COMPRESSION.md) · 🇩🇰 [da](../../../da/docs/compression/EXTENDING_COMPRESSION.md) · 🇩🇪 [de](../../../de/docs/compression/EXTENDING_COMPRESSION.md) · 🇬🇷 [el](../../../el/docs/compression/EXTENDING_COMPRESSION.md) · 🇪🇸 [es](../../../es/docs/compression/EXTENDING_COMPRESSION.md) · 🇪🇪 [et](../../../et/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇷 [fa](../../../fa/docs/compression/EXTENDING_COMPRESSION.md) · 🇫🇮 [fi](../../../fi/docs/compression/EXTENDING_COMPRESSION.md) · 🇫🇷 [fr](../../../fr/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇪 [ga](../../../ga/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [gu](../../../gu/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [ha](../../../ha/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇱 [he](../../../he/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [hi](../../../hi/docs/compression/EXTENDING_COMPRESSION.md) · 🇭🇷 [hr](../../../hr/docs/compression/EXTENDING_COMPRESSION.md) · 🇭🇺 [hu](../../../hu/docs/compression/EXTENDING_COMPRESSION.md) · 🇦🇲 [hy](../../../hy/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇩 [id](../../../id/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [ig](../../../ig/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇹 [it](../../../it/docs/compression/EXTENDING_COMPRESSION.md) · 🇯🇵 [ja](../../../ja/docs/compression/EXTENDING_COMPRESSION.md) · 🇬🇪 [ka](../../../ka/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇭 [km](../../../km/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [kn](../../../kn/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇷 [ko](../../../ko/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇹 [lt](../../../lt/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇻 [lv](../../../lv/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [ml](../../../ml/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇾 [ms](../../../ms/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇹 [mt](../../../mt/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇲 [my](../../../my/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇵 [ne](../../../ne/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇱 [nl](../../../nl/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇴 [no](../../../no/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [or](../../../or/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [pa](../../../pa/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇭 [phi](../../../phi/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇱 [pl](../../../pl/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇹 [pt](../../../pt/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇴 [ro](../../../ro/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇺 [ru](../../../ru/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇰 [si](../../../si/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇰 [sk](../../../sk/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇮 [sl](../../../sl/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇸 [sr](../../../sr/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇪 [sv](../../../sv/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇪 [sw](../../../sw/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [ta](../../../ta/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [te](../../../te/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇭 [th](../../../th/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇷 [tr](../../../tr/docs/compression/EXTENDING_COMPRESSION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇰 [ur](../../../ur/docs/compression/EXTENDING_COMPRESSION.md) · 🇺🇿 [uz](../../../uz/docs/compression/EXTENDING_COMPRESSION.md) · 🇻🇳 [vi](../../../vi/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [yo](../../../yo/docs/compression/EXTENDING_COMPRESSION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/EXTENDING_COMPRESSION.md)

---

> **थोडक्यात**: OmniRoute चे कॉम्प्रेशन इंजिन **प्लग करण्यायोग्य** आहे — तुम्ही सानुकूल इंजिने नोंदवू शकता, नवीन भाषांसाठी भाषा पॅक वितरित करू शकता आणि स्तरित पाइपलाइन एकत्रित करू शकता. हे कसे करायचे ते या मार्गदर्शकामध्ये दाखवले आहे.

**संबंधित मार्गदर्शिका:**

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — संपूर्ण पाइपलाइनचा आढावा
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — इंजिन रजिस्ट्री आणि अंगभूत इंजिने
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — RTK इंजिन आणि सानुकूल फिल्टर्स
- [COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md) — नियम पॅक स्वरूपाचा संदर्भ

---

## आढावा

कॉम्प्रेशन प्रणालीमध्ये **3 विस्तार बिंदू** आहेत:

| विस्तार बिंदू       | उपयोगाचे प्रकरण                                                          | अवघडपणा  |
| ------------------- | ------------------------------------------------------------------------ | -------- |
| **सानुकूल इंजिन**   | पूर्णपणे नवीन कॉम्प्रेशन अल्गोरिदम जोडा (उदा., डोमेन-विशिष्ट सारांशकारक) | प्रगत    |
| **भाषा पॅक**        | नवीन नैसर्गिक भाषेसाठी समर्थन जोडा (उदा., हिंदी, अरबी)                   | मध्यम    |
| **स्तरित पाइपलाइन** | विद्यमान इंजिने सानुकूल क्रमाने एकत्रित करा                              | नवशिक्या |

```
┌─────────────────────────────────────────────────────────────┐
│                    कॉम्प्रेशन धोरण                           │
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
│                   इंजिन     इंजिन     इंजिन     साखळीबद्ध   │
│                      │         │         │         │    │    │
│                      └─────────┴─────────┴─────────┘    │    │
│                                      │                    │
│                                      ▼                    │
│                             कॉम्प्रेस केलेले आउटपुट         │
└─────────────────────────────────────────────────────────────┘

धोरण निवडकर्ता MODE-BASED आहे: प्रत्येक विनंती एक मोड निवडते
(rtk / lite / standard / aggressive / ultra / stacked / off).
केवळ "stacked" मोड अनेक इंजिनांना क्रमाने साखळीबद्ध करतो.
डीफॉल्ट स्वयंचलित-ट्रिगर मोड "lite" आहे (3-स्तरीय प्राधान्य साखळी नाही).
```

---

## सानुकूल कॉम्प्रेशन इंजिन लिहिणे

इंजिन इंटरफेस (`open-sse/services/compression/engines/types.ts`) हा प्रत्येक इंजिनने पूर्ण करणे आवश्यक असलेला करार आहे. त्यामध्ये 5 आवश्यक मेथड्स आहेत.

### `CompressionEngine` इंटरफेस

```ts
interface CompressionEngine {
  id: string; // अद्वितीय इंजिन ID
  name: string; // प्रदर्शित नाव
  description: string; // संक्षिप्त वर्णन
  icon: string; // आयकॉन (इमोजी किंवा URL)
  targets: CompressionEngineTarget[]; // ["messages", "tool_results", "code_blocks"]
  stackable: boolean; // स्तरित पाइपलाइनमध्ये वापरता येते का
  stackPriority: number; // स्तरित पाइपलाइनमधील क्रम (कमी = आधी)
  metadata: CompressionEngineMetadata;

  apply(body, options?): CompressionResult;
  compress(body, config?): CompressionResult;
  getConfigSchema(): EngineConfigField[];
  validateConfig(config): EngineValidationResult;
}
```

### किमान उदाहरण: व्हाइटस्पेस इंजिन

सर्वांत सोपे शक्य इंजिन — संदेशांमधील अतिरिक्त व्हाइटस्पेस काढून टाका.

````ts
import type { CompressionEngine } from "omniroute/compression/engines/types";
import { registerCompressionEngine } from "omniroute/compression/engines/registry";

function preserveCodeBlocks(text: string): string {
  // कोड ब्लॉक चिन्हांनुसार विभाजित करा आणि त्यांमधील मोकळी जागा जतन करा
  const parts = text.split(/(```[\s\S]*?```)/);
  return parts
    .map((part) => {
      if (part.startsWith("```")) {
        return part; // कोड ब्लॉक्समध्ये बदल करू नका
      }
      return part.replace(/\n{3,}/g, "\n\n"); // केवळ गद्यासाठी लागू करा
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
  stackPriority: 100, // caveman/rtk नंतर चालवा

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

    // संदेश अॅरेमधून जा — स्ट्रिंग आणि मल्टिपार्ट अशा दोन्ही प्रकारची सामग्री हाताळा
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
      // मल्टिपार्ट सामग्री: भागांमधून जा, केवळ मजकूर भाग संकुचित करा
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
          return part; // image_url, tool_use इत्यादी जतन करा.
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

// जागतिक स्तरावर नोंदणी करा
registerCompressionEngine(whitespaceEngine);
````

### सानुकूल इंजिने कुठे ठेवावीत

```
~/.omniroute/compression/engines/my-engine.ts    # वापरकर्ता-स्तर
<project>/compression-engines/my-engine.ts        # प्रकल्प-स्तर (प्रारंभाच्या वेळी लोड केले जाते)
```

किंवा प्लगइनमधून प्रोग्रामद्वारे लोड करा:

```ts
// तुमच्या प्लगइनमध्ये
import {
  registerCompressionEngine,
  unregisterCompressionEngine,
} from "@omniroute/open-sse/services/compression/engines/registry";
import { myEngine } from "./engines/my-engine";

export default definePlugin({
  name: "my-compression-plugin",
  // प्लगइन SDK, onRequest / onResponse / onError हुक्स उपलब्ध करून देते. प्लगइन
  // मॉड्यूल लोड झाल्यावर (किंवा पहिल्या onRequest वेळी) इंजिनची नोंदणी करा; तुमच्या
  // स्वतःच्या टिअरडाउन मार्गामधून त्याची नोंदणी रद्द करा.
  onRequest: async (ctx) => {
    registerCompressionEngine(myEngine);
  },
});

// टिअरडाउनच्या वेळी:
// unregisterCompressionEngine("my-engine");
```

### तुमच्या इंजिनची चाचणी करणे

तुमच्या इंजिनची नोंदणी प्लगइनमध्ये किंवा स्टार्टअप फंक्शनमध्ये करा. नोंदणी झाल्यानंतर, इंजिन त्याच्या `id` द्वारे
धोरण निवडकर्त्यामध्ये उपलब्ध होईल. स्टॅक केलेल्या पाइपलाइनमध्ये ते समाविष्ट करून एकत्रीकरणाची चाचणी करा:

---

## भाषा पॅक तयार करणे

Caveman-शैलीतील संक्षेपण प्रत्येक नैसर्गिक भाषेतील निरर्थक भर घालणारे शब्द, संदिग्धता दर्शवणारे शब्दप्रयोग आणि अनावश्यक विस्तृत नमुने हाताळण्यासाठी **भाषा-विशिष्ट नियम पॅक** वापरते. OmniRoute सोबत **6 भाषा पॅक** दिले जातात: `en`, `es`, `fr`, `de`, `ja`, `pt-BR`.

### पॅकची रचना

भाषा पॅक म्हणजे `open-sse/services/compression/rules/<language>/` अंतर्गत असलेली **JSON फाइल्सची** निर्देशिका:

```
open-sse/services/compression/rules/
├── en/
│   ├── filler.json          # अभिवादन, संदिग्धता दर्शवणारे शब्दप्रयोग, नम्रता
│   ├── context.json         # संदर्भ कमी करणारे नियम
│   ├── dedup.json           # पुनरावृत्ती काढण्याचे नियम
│   ├── structural.json      # विरामचिन्हे, स्वरूपन
│   └── ultra.json           # आक्रमक संक्षेपणाचे नियम
├── es/  (समान रचना)
├── fr/  (समान रचना)
├── de/  (समान रचना)
├── ja/  (समान रचना)
└── pt-BR/ (समान रचना)
```

### नियमाची संरचना

प्रत्येक नियमाची रचना अशी असते (`open-sse/services/compression/ruleLoader.ts` मधून):

```ts
interface FileRule {
  name: string; // मानवाला वाचता येईल असे नाव (kebab-case)
  pattern: string; // JavaScript regex नमुना
  replacement?: string; // जुळलेल्या मजकुराऐवजी काय वापरायचे
  replacementMap?: Record<string, string>; // किंवा key→replacement नकाशा
  flags?: string; // Regex फ्लॅग्स (सामान्यतः "gi")
  context?: "all" | "user" | "system" | "assistant";
  category?: "filler" | "context" | "structural" | "dedup" | "terse" | "ultra";
  minIntensity?: "lite" | "full" | "ultra"; // या तीव्रतेपेक्षा कमी असल्यास वगळा
  description?: string; // दस्तऐवजीकरण
}
```

### उदाहरण: हिंदीसाठी Filler नियम जोडणे

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
      "description": "'नमस्ते' सारखे नम्र सुरुवातीचे शब्द काढा"
    },
    {
      "name": "filler_actually",
      "pattern": "\\b(?:असल में|वास्तव में|दरअसल)\\b\\s*",
      "replacement": "",
      "context": "all",
      "category": "filler",
      "minIntensity": "lite",
      "description": "'actually' सारखे भर घालणारे शब्द काढा"
    },
    {
      "name": "verbose_plea",
      "pattern": "\\b(?:कृपया|कृपया आप|अनुरोध है कि आप)\\b\\s*",
      "replacement": "",
      "context": "all",
      "category": "filler",
      "minIntensity": "full",
      "description": "हिंदीतील 'please' काढा"
    }
  ]
}
```

### प्रमाणीकरण

नियम पॅक लोड करताना त्यांचे `_schema.json` विरुद्ध प्रमाणीकरण केले जाते. चुकीची रचना असलेला पॅक लोड होणार नाही आणि त्रुटी लॉग केली जाईल:

```
RULE_LOADER: पॅक "hi/filler.json" चे प्रमाणीकरण अयशस्वी झाले:
  - rules.0.pattern: अवैध regex
  - rules.1.context: [all, user, system, assistant] यांपैकी एक असणे आवश्यक आहे
```

पॅक लोड केला जातो तेव्हा (`_schema.json` विरुद्ध) प्रमाणीकरण आपोआप चालते; अवैध पॅक नाकारला जातो आणि वरील त्रुटी लॉग केली जाते. पॅक प्रमाणीकरणासाठी स्वतंत्र `npm run` स्क्रिप्ट नाही — पॅक लोड करा (उदा. सर्व्हर सुरू करा किंवा संक्षेपण मार्ग वापरा) आणि लॉग तपासा.

### सानुकूल भाषा पॅक लोड करणे

```ts
import { loadRulePack } from "omniroute/compression/ruleLoader";

await loadRulePack("./my-custom-rules/hi/filler.json");
```

किंवा तो ओळखल्या जाणाऱ्या स्थानावर ठेवा:

```
~/.omniroute/compression/rules/hi/filler.json  # वापरकर्ता-स्तर
<project>/.compression/rules/hi/filler.json   # प्रकल्प-स्तर
```

### भाषा पॅकसाठी सर्वोत्तम पद्धती

1. **`filler` पासून सुरुवात करा** — या नियमांचा सर्वाधिक प्रभाव असतो
2. **आक्रमक नियम नियंत्रित करण्यासाठी `minIntensity` वापरा** — यामुळे अतिसंक्षेपणापासून संरक्षण होते
3. **चाचणी प्रकरणे समाविष्ट करा** — वर्तनाची पडताळणी करण्यासाठी JSON मध्ये `tests[]` अॅरे जोडा
4. **क्रम महत्त्वाचा आहे** — आधीचे नियम प्रथम लागू होतात; सर्वाधिक प्रभावी नियम सुरुवातीला ठेवा
5. **`replacement` वापरताना सावध राहा** — रिक्त स्ट्रिंग सहसा योग्य असते; कधीही नवीन मजकूर समाविष्ट करू नका

### भाषांतर धोरण

नियम पॅकचे नवीन भाषेसाठी स्थानिकीकरण करताना:

1. **नियमांची नावे भाषांतरित करा** — ती डीबग आउटपुटमध्ये दिसतात
2. **Regex नमुने अनुकूलित करा** — थेट भाषांतर अनेकदा अयशस्वी होते (शब्दांच्या सीमा वेगळ्या असतात)
3. **वास्तविक संभाषणांवर चाचणी करा** — प्रत्यक्ष इनपुटवर पॅक सुरक्षित असला पाहिजे
4. **सांस्कृतिक संकेतांशी जुळवा** — उदाहरणार्थ, जपानी पॅकमध्ये इंग्रजीपेक्षा आदरार्थी भर घालणारे शब्द अधिक असतात

---

## स्टॅक केलेल्या पाइपलाइन्स

**स्टॅक केलेली पाइपलाइन** अनेक इंजिने क्रमाने चालवते, ज्यात प्रत्येक इंजिनचे आउटपुट पुढील इंजिनला इनपुट म्हणून दिले जाते. `mode: stacked` अंतर्गत अशा प्रकारे कार्य करते.

### स्टॅकिंग कसे कार्य करते

```
इनपुट (10,000 टोकन्स)
        │
        ▼
   ┌──────────┐
   │  इंजिन   │  प्राधान्य 10
   │  A       │  ──▶ आउटपुट: 6,000 टोकन्स (-40%)
   └────┬─────┘
        ▼
   ┌──────────┐
   │  इंजिन   │  प्राधान्य 50
   │  B       │  ──▶ आउटपुट: 2,400 टोकन्स (-60%)
   └────┬─────┘
        ▼
   ┌──────────┐
   │  इंजिन   │  प्राधान्य 100
   │  C       │  ──▶ आउटपुट: 1,200 टोकन्स (-80%)
   └────┬─────┘
        │
        ▼
अंतिम आउटपुट (1,200 टोकन्स, एकत्रितपणे ~88% बचत)
```

`mode: "stacked"` निवडल्यावर, `pipeline` अॅरेमध्ये नमूद केलेल्या क्रमाने इंजिने अनुक्रमे कार्यान्वित होतात.
इंजिन N चे आउटपुट इंजिन N+1 चे इनपुट बनते.

### कॉम्प्रेशन मोड्स

OmniRoute कॉन्फिगरेशन, स्वयंचलित-ट्रिगर थ्रेशोल्ड्स आणि कॉम्बो ओव्हरराइड्सच्या आधारे **प्रत्येक विनंतीसाठी एकच मोड** निवडते.
उपलब्ध मोड्स `open-sse/services/compression/types.ts` मध्ये (`CompressionMode` प्रकार) परिभाषित केले आहेत:

| मोड          | इंजिने               | वापराचे प्रकरण                                                                                                                                                                                    |
| ------------ | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `off`        | कोणतेही नाही         | सर्व कॉम्प्रेशन अक्षम करा                                                                                                                                                                         |
| `rtk`        | केवळ RTK             | कमांड आउटपुटचे प्रमाण अधिक असलेली सत्रे (80%+ बचत)                                                                                                                                                |
| `lite`       | केवळ Lite            | सावध कॉम्प्रेशन (जलद, सुरक्षित)                                                                                                                                                                   |
| `standard`   | Caveman              | भाषा पॅक्ससह गद्याचे कॉम्प्रेशन                                                                                                                                                                   |
| `aggressive` | Caveman + Aggressive | आक्रमक गद्य कॉम्प्रेशन + आक्रमक अंतिम पास                                                                                                                                                         |
| `ultra`      | Ultra                | कमाल कॉम्प्रेशन (हानिकारक, अंतिम पर्याय). `ultra.modelPath` सेट केलेले असताना पर्यायाने **LLMLingua-2** SLM इंजिनद्वारे रूट केले जाते (मॉडेल अनुपलब्ध असल्यास नियम-आधारित मार्गावर फेल-ओपन होते). |
| `stacked`    | सानुकूल पाइपलाइन     | कोणत्याही क्रमाने इंजिने एकत्र वापरा (खाली पाहा)                                                                                                                                                  |

> वरील मोड इंजिनांव्यतिरिक्त, रजिस्ट्रीमध्ये विशेषीकृत स्टॅक करण्यायोग्य इंजिनेही समाविष्ट आहेत —
> **CCR**, **headroom**, **ionizer**, आणि **session-dedup** — ज्यांचे दस्तऐवजीकरण
> [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md#additional-built-in-engines) मध्ये केले आहे.

मोडची निवड `open-sse/services/compression/strategySelector.ts` मधील `getEffectiveMode()` द्वारे निर्धारित केली जाते:

1. कॉम्प्रेशन अक्षम असल्यास: `"off"`
2. कॉम्बो ओव्हरराइड अस्तित्वात असल्यास: ओव्हरराइड वापरा
3. स्वयंचलित-ट्रिगर थ्रेशोल्ड ओलांडल्यास: `autoTriggerMode` वापरा (डीफॉल्ट: `"lite"`)
4. अन्यथा: `defaultMode` वापरा

### डीफॉल्ट स्टॅक केलेली पाइपलाइन

`mode: "stacked"` स्पष्टपणे कॉन्फिगर केलेले असताना, डीफॉल्ट पाइपलाइन खालील घटक एकत्र करते:

1. **RTK** — कमांड आउटपुटमधील अनावश्यक मजकूर काढून टाका (टर्मिनल आउटपुटवर ~80% बचत)
2. **Caveman** — अनावश्यक शब्द काढून गद्य संक्षिप्त करा (उर्वरित मजकुरावर ~46%)
3. **Lite** — शेवटी रिक्त जागा सुधारणे + डुप्लिकेट काढण्याचा पास

हे संयोजन टूल्सचा मोठ्या प्रमाणावर वापर असलेल्या सत्रांमध्ये **78-95% बचत** साध्य करते.

### स्टॅक केलेल्या पाइपलाइन्स कॉन्फिगर करणे

कॉम्बो कॉन्फिगमध्ये:

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

तुम्ही इंजिने वगळू शकता, सानुकूल इंजिने जोडू शकता किंवा त्यांचा क्रम बदलू शकता.

### स्थिती हस्तांतरण

इंजिने विनंती संदर्भातील (`options` मधील) मेटाडेटा वाचू शकतात:

```ts
compress(body, config) {
  // मागील इंजिनांमधील मेटाडेटा वाचा
  const original = options?.compressionComboId;  // "my-coding-combo"
  // ...
}
```

मेटाडेटा **केवळ-वाचनीय** आहे — इंजिने विनंती संदर्भात बदल करू शकत नाहीत; ती केवळ स्वतःच्या बॉडी आउटपुटमध्ये बदल करू शकतात.

### कार्यान्वयन क्रमातील संभाव्य अडचणी

| इंजिन क्रम                                    | परिणाम                                                                                         |
| --------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| RTK → Caveman → Lite                          | **शिफारस केलेला** (प्रथम अनावश्यक मजकूर, नंतर भाषेतील अतिरिक्त भाग आणि शेवटी रिक्त जागा काढतो) |
| Lite → RTK → Caveman                          | अयोग्य — Lite कच्च्या आउटपुटमधील रिक्त जागा काढते, ज्यामुळे RTK चे पॅटर्न मॅचिंग अयशस्वी होते  |
| Caveman → RTK                                 | अयोग्य — Caveman मजकूर अशा प्रकारे पुन्हा लिहू शकते की RTK तो ओळखू शकणार नाही                  |
| सुरुवातीला `tool_results` असलेला कोणताही क्रम | अधिक चांगला — टूल आउटपुट हा सर्वाधिक अनावश्यक मजकूर असलेला आशय असतो                            |

### स्टॅकिंग कधी करू नये

स्टॅकिंग नेहमीच अधिक चांगले असेल असे नाही:

- **साधे संदेश** (टूल आउटपुट नसलेले) — केवळ Caveman किंवा Lite पुरेसे आहे
- **खर्च-संवेदनशील वापर** — प्रत्येक इंजिनमुळे ~5-50ms विलंब वाढतो
- **विशिष्ट टूल्स** — शेल आउटपुटसाठी सामान्यतः केवळ RTK पुरेसे असते

### सानुकूल पाइपलाइन तयार करणे

नामांकित-पाइपलाइन रजिस्ट्री उपलब्ध नाही. स्टॅक केलेली पाइपलाइन म्हणजे `applyStackedCompression()` ला पास केलेली फक्त एक **स्टेप्सची इनलाइन अॅरे** आहे (`@omniroute/open-sse/services/compression/strategySelector` मधून एक्सपोर्ट केलेली):

```ts
import { applyStackedCompression } from "@omniroute/open-sse/services/compression/strategySelector";

const result = applyStackedCompression(body, [
  { engine: "rtk", intensity: "aggressive" },
  { engine: "caveman", intensity: "full" },
]);
```

तुम्ही पाइपलाइन पास केली नाही, तर ती डीफॉल्टनुसार `rtk(standard) → caveman(full)` असते.

कॉन्फिगमधून ती चालवण्यासाठी, `mode: "stacked"` सेट करा आणि `stackedPipeline` अंतर्गत स्टेप अॅरे द्या (`config.stackedPipeline` मधून वाचली जाते):

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

## अपस्ट्रीम सिंक धोरण

OmniRoute ची कॉम्प्रेशन इंजिने README मध्ये अनेक अपस्ट्रीम प्रकल्पांना श्रेय देतात
("RTK, Caveman, LLMLingua-2, Troglodita कडून प्रेरित"). योगदानकर्त्यांचा एक सामान्य
प्रश्न असा असतो: **अपस्ट्रीम RTK ने नवीन टूल फिल्टर जोडल्यास किंवा Caveman ने नवीन नियम
पॅक जोडल्यास, तो OmniRoute पर्यंत कसा पोहोचतो?** हा विभाग याचे अधिकृत उत्तर आहे.

### व्हेंडर केलेल्या प्रती विरुद्ध स्वतंत्र अंमलबजावण्या

| इंजिन                        | अपस्ट्रीमशी संबंध                                                                                                                   | स्थान                                                               |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| **RTK**                      | **स्वतंत्र पुनर्अंमलबजावणी** (प्रेरित, प्रत नाही)                                                                                   | `open-sse/services/compression/engines/rtk/`                        |
| **Caveman**                  | **स्वतंत्र पुनर्अंमलबजावणी** (प्रेरित)                                                                                              | `open-sse/services/compression/engines/cavemanAdapter.ts`           |
| **Headroom**                 | बहुतांश अंतर्गत; केवळ `gcf/` कोडेक `gcf-typescript` मधून **खरोखर व्हेंडर केलेला** आहे (MIT, SPDX-चिन्हांकित, केवळ सामान्य प्रोफाइल) | `open-sse/services/compression/engines/headroom/gcf/`               |
| **LLMLingua-2 / Troglodita** | प्रेरित (`llmlingua` + `session-dedup` इंजिनांना चालना देतात)                                                                       | `open-sse/services/compression/engines/llmlingua/`, `session-dedup` |

महत्त्वाचा मुद्दा: **RTK आणि Caveman या _कल्पनांच्या_ (फिल्टर नियम, नियम पॅक)
क्लीन-रूम TypeScript अंमलबजावण्या आहेत, व्हेंडर केलेली स्रोत-वृक्ष नाहीत.** `git pull`
करण्यासाठी कोणतीही अपस्ट्रीम प्रत नाही — म्हणूनच README मध्ये "bundled" ऐवजी
"inspired by" असे म्हटले आहे.

### अपस्ट्रीम सुधारणा कशा विलीन केल्या जातात

जाणीवपूर्वक, **स्वयंचलित अपस्ट्रीम-रिलीज ट्रॅकिंग नाही आणि `compression-sync`
लेबलही नाही**. इंजिने पुनर्अंमलबजावण्या असल्यामुळे, एखादा अपस्ट्रीम RTK
फिल्टर किंवा Caveman नियम पॅक कोड म्हणून विलीन केला जात नाही; तो **OmniRoute च्या
स्वतःच्या स्वरूपात नवीन नियम/फिल्टर म्हणून पुन्हा व्यक्त केला जातो** (पहा
[COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md)) आणि सामान्य PR द्वारे
प्रासंगिकपणे समाविष्ट केला जातो. वरील विस्तार-बिंदू (सानुकूल इंजिन, भाषा पॅक, RTK फिल्टर)
हे योगदान देण्याचे मान्यताप्राप्त मार्ग आहेत.

याच प्रक्रियेची अलीकडील उदाहरणे:

- Gradle आणि `dotnet` बिल्ड आउटपुटसाठी RTK फिल्टर (v3.8.42)
- kubectl / docker-build / composer / gh साठी RTK फिल्टर (#2824)
- Caveman इंडोनेशियन भाषा पॅक (#3975), तसेच जर्मन / फ्रेंच / जपानी / चिनी पॅक

### Headroom (इनपुट-कॉम्प्रेशन प्रॉक्सी)

Headroom **पूर्णपणे अंतर्गत** आहे — पिन केलेला, व्हेंडर केलेला `gcf` कोडेक स्नॅपशॉट
आणि OmniRoute चे स्वतःचे `smartcrusher` / `toon` / `tabular` स्तर. व्हेंडर केलेल्या
प्रतीपलीकडे ट्रॅक करण्यासाठी कोणतेही सक्रिय अपस्ट्रीम नाही; कोडेक बदलल्यावर `gcf` ची अद्यतने
स्वहस्ते रिफ्रेश केली जातात आणि कॉम्प्रेशन बजेट गेट (`check:compression-budget`) विरुद्ध
पुन्हा प्रमाणित केली जातात.

### अपस्ट्रीम-प्रेरित सुधारणा सुचवणे

1. **व्हेंडर करू नका** — अपस्ट्रीम नियम/फिल्टर OmniRoute च्या स्वरूपात पुन्हा व्यक्त करा.
2. खालीलपैकी जुळणाऱ्या विस्तार-बिंदूद्वारे ते जोडा (भाषा पॅक, RTK फिल्टर किंवा
   सानुकूल इंजिन).
3. PR वर्णनात अपस्ट्रीम प्रकल्पाचा संदर्भ द्या (श्रेयासाठी), त्याचा परवाना असलेला
   स्रोत कॉपी करू नका.
4. चाचण्या समाविष्ट करा आणि `check:compression-budget` गेट अजूनही उत्तीर्ण होत असल्याची खात्री करा.

---

## आउटपुट शैली जोडणे

आउटपुट शैली (पहा [मार्गदर्शिकेतील कॅटलॉग तक्ता](./COMPRESSION_GUIDE.md#output-styles-catalog))
या इनपुट इंजिनांच्या प्रतिसाद-पक्षीय समकक्ष आहेत: तुम्ही जे पाठवता ते संकुचित करण्याऐवजी,
त्या मॉडेलला कमी खर्चिक आउटपुट तयार करण्याची सूचना देतात. रजिस्ट्री
`open-sse/services/compression/outputStyles/catalog.ts` मधील `OUTPUT_STYLE_CATALOG` आहे आणि
**एक कॅटलॉग नोंद म्हणजे संपूर्ण वैशिष्ट्य**: इंजेक्टर, डॅशबोर्ड सेटिंग्ज पॅनेल,
पर्सिस्टन्स आणि टेलिमेट्री हे सर्व कॅटलॉगमधील नोंदींची गणना करतात — अद्ययावत करण्यासाठी इतर कोणतीही यादी नाही.

1. **`OUTPUT_STYLE_CATALOG` मध्ये एक नोंद जोडा**, ज्यात `id`, `label`, `description` आणि
   तीन इंग्रजी `levels` (`lite`, `full`, `ultra`) असतील. प्रत्येक स्तराचा शेवट
   `${SHARED_BOUNDARIES}` ने झाला पाहिजे, जेणेकरून कोड, पाथ, कमांड, त्रुटी आणि URLs जसेच्या तसे राहतील.
   सूचना मजकूर प्रत्येक `(id, level, language)` साठी **स्थिर आणि निर्धारक** असला पाहिजे —
   केवळ `${SHARED_BOUNDARIES}` इंटरपोलेशनला परवानगी आहे.
2. **त्याचे भाषांतर करा.** `i18n` अंतर्गत किमान एक `pt-BR` ब्लॉक द्या; `ponytail` आणि
   `i-have-adhd` (en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi) हे संदर्भासाठीचे स्वरूप आहे. जाणीवपूर्वक
   एकाच भाषेची शैली त्याऐवजी `locale` सेट करते (`terse-cjk` → `zh` प्रमाणे) आणि त्यानंतर ती
   केवळ त्या locale अंतर्गत उपलब्ध केली जाते.
3. **मॅट्रिक्स गार्ड अद्ययावत करा** — शैलीच्या भाषा
   `tests/unit/compression/output-styles-i18n-matrix.test.ts` मधील `BASELINE_LANGUAGES` मध्ये जोडा. आवश्यक
   भाषांतरे नसलेली कोणतीही नवीन, locale द्वारे मर्यादित नसलेली शैली, ट्रॅकिंग इश्यूसह स्पष्ट
   `KNOWN_ENGLISH_ONLY` नोंद असल्याशिवाय, या गेटमुळे अयशस्वी ठरते.
4. **प्रत्येक शैलीसाठी स्वतंत्र चाचणी जोडा**, जी
   `tests/unit/compression/i-have-adhd-catalog.test.ts` वर आधारित असेल: कॅटलॉगचे स्वरूप, प्रत्येक
   स्तरासाठी boundaries क्लॉज आणि प्रत्येक भाषांतर कॉपी केलेल्या इंग्रजीऐवजी त्याच्याच
   भाषेत लिहिलेले आहे हे निश्चित करणारा अँकर.
5. **श्रेय**: शैली एखाद्या अपस्ट्रीम प्रकल्पावरून रूपांतरित केली असल्यास, नोंदीवरील
   स्रोत कॉमेंटमध्ये त्याला श्रेय द्या (उदा. `i-have-adhd` → ayghri/i-have-adhd, MIT) — वरील
   "अपस्ट्रीम-प्रेरित सुधारणा प्रस्तावित करणे" यासाठीही हाच नियम लागू होतो.

UI, स्कीमा किंवा टेलिमेट्रीमध्ये बदल करण्याची आवश्यकता नाही — हे पृष्ठभाग कॅटलॉगमधून रेंडर होतात.

---

## सर्वोत्तम पद्धती

### इंजिन विकास

1. **नेहमी `validateConfig` इम्प्लिमेंट करा** — व्हॅलिडेशन नसलेली इंजिने कोणतीही सूचना न देता अयशस्वी होतात
2. **वास्तववादी `targetLatencyMs` सेट करा** — इंजिने निवडण्यासाठी स्ट्रॅटेजी सिलेक्टर याचा वापर करतो
3. **डॅशबोर्डसाठी `getConfigSchema` वापरा** — वापरकर्त्यांपासून कॉन्फिग कधीही लपवू नका
4. **तुमचे इंजिन शुद्ध असल्यास `stackable: true` ला समर्थन द्या** — साइड इफेक्ट्स असलेली इंजिने स्टॅक करू नयेत
5. **इनलाइन चाचण्या लिहा** — इंजिने <1s मध्ये पडताळता आली पाहिजेत

### भाषा पॅक विकास

1. **`lite` तीव्रतेपासून सुरुवात करा** — तुमचे नियम सर्वांत कमी सेटिंगवर सुरक्षित असले पाहिजेत
2. **नियमांची व्याप्ती ठरवण्यासाठी `context` वापरा** — केवळ `user` साठीचे नियम चुकून सिस्टम प्रॉम्प्टवर परिणाम करू शकत नाहीत
3. **JSON की कॅप्चर करणे टाळा** — `\\bword\\b` JSON च्या आत जुळू शकते, ज्यामुळे संरचित डेटा बिघडतो
4. **एज केसेससह चाचणी करा** — रिक्त इनपुट, unicode, RTL मजकूर, इमोजी
5. **विद्यमान पॅक्स टेम्पलेट म्हणून वापरा** — `en/filler.json` हे सर्वाधिक विकसित उदाहरण आहे

### पाइपलाइन डिझाइन

1. **ऑप्टिमाइझ करण्यापूर्वी प्रोफाइल करा** — प्रथम `compression_stats` वापरून मोजमाप करा
2. **पुनर्अंमलबजावणीऐवजी कंपोझिशनला प्राधान्य द्या** — नवीन इंजिन लिहिण्यापूर्वी Caveman नियम विस्तारित करा
3. **क्रमामागील तर्काचे दस्तऐवजीकरण करा** — इंजिन A हे इंजिन B च्या आधी का आहे ते कॉमेंटमध्ये लिहा
4. **सर्व 3 तीव्रता स्तरांवर चाचणी करा** — `lite` वेगवान पण लॉसी आहे, `ultra` धीमे पण अचूक आहे

---

## संदर्भ: अंगभूत इंजिने

| इंजिन ID             | स्टॅक करण्यायोग्य | डीफॉल्ट stackPriority | लक्ष्ये                          |
| -------------------- | ----------------- | --------------------- | -------------------------------- |
| `lite`               | होय               | 5                     | संदेश, tool_results              |
| `rtk`                | होय               | 10                    | tool_results                     |
| `standard` (caveman) | होय               | 20                    | संदेश, tool_results, code_blocks |
| `aggressive`         | होय               | 30                    | संदेश                            |
| `ultra`              | होय               | 40                    | संदेश, code_blocks               |

### हे देखील पहा

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — पाइपलाइनचा आढावा
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — इंजिन रजिस्ट्री संदर्भ
- [COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md) — नियमांच्या स्वरूपाचे तपशील
- [COMPRESSION_LANGUAGE_PACKS.md](./COMPRESSION_LANGUAGE_PACKS.md) — भाषा पॅकचे तपशील
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — RTK इंजिन आणि सानुकूल फिल्टर्स
- स्रोत: `open-sse/services/compression/` (117 फाइल्स, ~250KB)
