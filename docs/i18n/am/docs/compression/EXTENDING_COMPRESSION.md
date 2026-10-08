# Extending the Compression Pipeline (አማርኛ)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/EXTENDING_COMPRESSION.md) · 🇸🇦 [ar](../../../ar/docs/compression/EXTENDING_COMPRESSION.md) · 🇦🇿 [az](../../../az/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇬 [bg](../../../bg/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇩 [bn](../../../bn/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇦 [bs](../../../bs/docs/compression/EXTENDING_COMPRESSION.md) · 🇨🇿 [cs](../../../cs/docs/compression/EXTENDING_COMPRESSION.md) · 🇩🇰 [da](../../../da/docs/compression/EXTENDING_COMPRESSION.md) · 🇩🇪 [de](../../../de/docs/compression/EXTENDING_COMPRESSION.md) · 🇬🇷 [el](../../../el/docs/compression/EXTENDING_COMPRESSION.md) · 🇪🇸 [es](../../../es/docs/compression/EXTENDING_COMPRESSION.md) · 🇪🇪 [et](../../../et/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇷 [fa](../../../fa/docs/compression/EXTENDING_COMPRESSION.md) · 🇫🇮 [fi](../../../fi/docs/compression/EXTENDING_COMPRESSION.md) · 🇫🇷 [fr](../../../fr/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇪 [ga](../../../ga/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [gu](../../../gu/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [ha](../../../ha/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇱 [he](../../../he/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [hi](../../../hi/docs/compression/EXTENDING_COMPRESSION.md) · 🇭🇷 [hr](../../../hr/docs/compression/EXTENDING_COMPRESSION.md) · 🇭🇺 [hu](../../../hu/docs/compression/EXTENDING_COMPRESSION.md) · 🇦🇲 [hy](../../../hy/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇩 [id](../../../id/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [ig](../../../ig/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇹 [it](../../../it/docs/compression/EXTENDING_COMPRESSION.md) · 🇯🇵 [ja](../../../ja/docs/compression/EXTENDING_COMPRESSION.md) · 🇬🇪 [ka](../../../ka/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇭 [km](../../../km/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [kn](../../../kn/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇷 [ko](../../../ko/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇹 [lt](../../../lt/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇻 [lv](../../../lv/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [ml](../../../ml/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [mr](../../../mr/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇾 [ms](../../../ms/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇹 [mt](../../../mt/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇲 [my](../../../my/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇵 [ne](../../../ne/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇱 [nl](../../../nl/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇴 [no](../../../no/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [or](../../../or/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [pa](../../../pa/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇭 [phi](../../../phi/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇱 [pl](../../../pl/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇹 [pt](../../../pt/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇴 [ro](../../../ro/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇺 [ru](../../../ru/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇰 [si](../../../si/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇰 [sk](../../../sk/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇮 [sl](../../../sl/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇸 [sr](../../../sr/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇪 [sv](../../../sv/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇪 [sw](../../../sw/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [ta](../../../ta/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [te](../../../te/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇭 [th](../../../th/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇷 [tr](../../../tr/docs/compression/EXTENDING_COMPRESSION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇰 [ur](../../../ur/docs/compression/EXTENDING_COMPRESSION.md) · 🇺🇿 [uz](../../../uz/docs/compression/EXTENDING_COMPRESSION.md) · 🇻🇳 [vi](../../../vi/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [yo](../../../yo/docs/compression/EXTENDING_COMPRESSION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/EXTENDING_COMPRESSION.md)

---

> **በአጭሩ**: የOmniRoute የማመቅ ሞተር **ሊሰካ የሚችል** ነው — ብጁ ሞተሮችን መመዝገብ፣ ለአዳዲስ ቋንቋዎች የቋንቋ ጥቅሎችን ማቅረብ እና የተደራረቡ የሂደት መስመሮችን ማቀናጀት ይችላሉ። ይህ መመሪያ እንዴት እንደሚደረግ ያሳያል።

**ተዛማጅ መመሪያዎች፦**

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — የሙሉ የሂደት መስመሩ አጠቃላይ እይታ
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — የሞተር መዝገብ እና አብረው የተካተቱ ሞተሮች
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — የRTK ሞተር እና ብጁ ማጣሪያዎች
- [COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md) — የደንብ ጥቅል ቅርጸት ማጣቀሻ

---

## አጠቃላይ እይታ

የማመቅ ስርዓቱ **3 የማስፋፊያ ነጥቦች** አሉት፦

| የማስፋፊያ ነጥብ           | የአጠቃቀም ሁኔታ                                                  | የአስቸጋሪነት ደረጃ |
| -------------------- | ----------------------------------------------------------- | ------------ |
| **ብጁ ሞተር**           | ሙሉ በሙሉ አዲስ የማመቅ አልጎሪዝም ማከል (ለምሳሌ፣ ለተወሰነ ዘርፍ የተዘጋጀ ማጠቃለያ ሰጪ) | ከፍተኛ         |
| **የቋንቋ ጥቅል**         | ለአዲስ የተፈጥሮ ቋንቋ ድጋፍ ማከል (ለምሳሌ፣ ሂንዲ፣ ዓረብኛ)                    | መካከለኛ        |
| **የተደራረበ የሂደት መስመር** | ነባር ሞተሮችን በብጁ ቅደም ተከተል ማቀናጀት                                | ጀማሪ          |

```
┌─────────────────────────────────────────────────────────────┐
│                    የማመቅ ስትራቴጂ                           │
│                                                              │
│   የግቤት መልዕክቶች ──▶ getEffectiveMode() ──▶ mode          │
│                                              │               │
│                      ┌───────────────────────┼──────────┐    │
│                      │         │         │         │    │    │
│                      ▼         ▼         ▼         ▼    │    │
│                   "rtk"    "lite"   "standard" "stacked"    │
│                      │         │         │         │    │    │
│                      ▼         ▼         ▼         ▼    │    │
│                   RTK       Lite     Caveman   engines[]   │
│                   ሞተር      ሞተር      ሞተር      በሰንሰለት   │
│                      │         │         │         │    │    │
│                      └─────────┴─────────┴─────────┘    │    │
│                                      │                    │
│                                      ▼                    │
│                              የታመቀ ውጤት                   │
└─────────────────────────────────────────────────────────────┘

የስትራቴጂው መራጭ በMODE ላይ የተመሰረተ ነው፦ እያንዳንዱ ጥያቄ አንድ mode ይመርጣል
(rtk / lite / standard / aggressive / ultra / stacked / off)።
ብዙ ሞተሮችን በቅደም ተከተል የሚያገናኘው "stacked" mode ብቻ ነው።
ነባሪው በራስ-ሰር የሚጀምር mode "lite" ነው (ባለ3-ደረጃ የቅድሚያ ሰንሰለት አይደለም)።
```

---

## ብጁ የማመቅ ሞተር መጻፍ

የሞተሩ በይነገጽ (`open-sse/services/compression/engines/types.ts`) እያንዳንዱ ሞተር ሊያሟላው የሚገባ ውል ነው። 5 አስፈላጊ ሜቶዶች አሉት።

### የ`CompressionEngine` በይነገጽ

```ts
interface CompressionEngine {
  id: string; // ልዩ የሞተር ID
  name: string; // የማሳያ ስም
  description: string; // አጭር መግለጫ
  icon: string; // አዶ (ኢሞጂ ወይም URL)
  targets: CompressionEngineTarget[]; // ["messages", "tool_results", "code_blocks"]
  stackable: boolean; // በተደራረበ የሂደት መስመር ውስጥ መጠቀም ይቻላል
  stackPriority: number; // በተደራረቡ የሂደት መስመሮች ውስጥ ያለው ቅደም ተከተል (ዝቅተኛ = ቀደም ያለ)
  metadata: CompressionEngineMetadata;

  apply(body, options?): CompressionResult;
  compress(body, config?): CompressionResult;
  getConfigSchema(): EngineConfigField[];
  validateConfig(config): EngineValidationResult;
}
```

### አነስተኛ ምሳሌ፦ የነጭ ቦታ ሞተር

በጣም ቀላሉ ሞተር — ከመልዕክቶች ውስጥ ተጨማሪ ነጭ ቦታን ያስወግዳል።

````ts
import type { CompressionEngine } from "omniroute/compression/engines/types";
import { registerCompressionEngine } from "omniroute/compression/engines/registry";

function preserveCodeBlocks(text: string): string {
  // በኮድ ብሎክ ምልክቶች ይከፋፍሉ እና በውስጣቸው ያለውን ክፍተት ይጠብቁ
  const parts = text.split(/(```[\s\S]*?```)/);
  return parts
    .map((part) => {
      if (part.startsWith("```")) {
        return part; // የኮድ ብሎኮችን አያሻሽሉ
      }
      return part.replace(/\n{3,}/g, "\n\n"); // በጽሑፍ ላይ ብቻ ይተግብሩ
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
  stackPriority: 100, // ከcaveman/rtk በኋላ ያሂዱ

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

    // የመልዕክቶችን ድርድር ያቋርጡ — ሕብረቁምፊ እና ባለብዙ ክፍል ይዘትን ይያዙ
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
      // ባለብዙ ክፍል ይዘት፦ ክፍሎቹን ያቋርጡ፣ የጽሑፍ ክፍሎችን ብቻ ይጨምቁ
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
          return part; // image_url፣ tool_use፣ ወዘተ ይጠብቁ።
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

// በዓለም አቀፍ ደረጃ ይመዝገቡ
registerCompressionEngine(whitespaceEngine);
````

### ብጁ ሞተሮችን የሚያስቀምጡበት ቦታ

```
~/.omniroute/compression/engines/my-engine.ts    # የተጠቃሚ ደረጃ
<project>/compression-engines/my-engine.ts        # የፕሮጀክት ደረጃ (ሲጀመር የሚጫን)
```

ወይም ከፕለጊን በፕሮግራም ይጫኑ፦

```ts
// በፕለጊንዎ ውስጥ
import {
  registerCompressionEngine,
  unregisterCompressionEngine,
} from "@omniroute/open-sse/services/compression/engines/registry";
import { myEngine } from "./engines/my-engine";

export default definePlugin({
  name: "my-compression-plugin",
  // የፕለጊኑ SDK የonRequest / onResponse / onError ማያያዣዎችን ያቀርባል።
  // የፕለጊኑ ሞጁል ሲጫን (ወይም በመጀመሪያው onRequest) ሞተሩን ይመዝግቡ፤
  // ከራስዎ የማፍረሻ መንገድ ደግሞ ምዝገባውን ይሰርዙ።
  onRequest: async (ctx) => {
    registerCompressionEngine(myEngine);
  },
});

// በማፍረስ ጊዜ፦
// unregisterCompressionEngine("my-engine");
```

### ሞተርዎን መፈተሽ

ሞተርዎን በፕለጊን ወይም በማስጀመሪያ ፋንክሽን ውስጥ ይመዝግቡ። አንዴ ከተመዘገበ፣ ሞተሩ በ`id` አማካኝነት በስትራቴጂ መምረጫው ውስጥ ይገኛል። በተደራራቢ የማስኬጃ መስመር ውስጥ በማቀናበር ውህደቱን ይፈትሹ፦

---

## የቋንቋ ጥቅሎችን መፍጠር

የCaveman ቅጥ መጭመቅ በእያንዳንዱ ተፈጥሯዊ ቋንቋ ውስጥ ሙሌት ቃላትን፣ አሻሚ አገላለጾችን እና ረዥም የአጻጻፍ ንድፎችን ለመቆጣጠር **ለቋንቋው የተወሰኑ የደንብ ጥቅሎችን** ይጠቀማል። OmniRoute ከ**6 የቋንቋ ጥቅሎች** ጋር ይቀርባል፦ `en`፣ `es`፣ `fr`፣ `de`፣ `ja`፣ `pt-BR`።

### የጥቅል መዋቅር

የቋንቋ ጥቅል በ`open-sse/services/compression/rules/<language>/` ስር ያሉ **JSON ፋይሎች** ማውጫ ነው፦

```
open-sse/services/compression/rules/
├── en/
│   ├── filler.json          # ሰላምታዎች፣ አሻሚ አገላለጾች፣ ጨዋነት
│   ├── context.json         # ዐውድን የሚቀንሱ ደንቦች
│   ├── dedup.json           # ብዜትን የማስወገድ ደንቦች
│   ├── structural.json      # ሥርዓተ ነጥብ፣ ቅርጸት
│   └── ultra.json           # ኃይለኛ የመጭመቅ ደንቦች
├── es/  (ተመሳሳይ መዋቅር)
├── fr/  (ተመሳሳይ መዋቅር)
├── de/  (ተመሳሳይ መዋቅር)
├── ja/  (ተመሳሳይ መዋቅር)
└── pt-BR/ (ተመሳሳይ መዋቅር)
```

### የደንብ አወቃቀር

እያንዳንዱ ደንብ ይህን ቅርጽ አለው (ከ`open-sse/services/compression/ruleLoader.ts`)፦

```ts
interface FileRule {
  name: string; // ለሰው የሚነበብ ስም (kebab-case)
  pattern: string; // JavaScript regex ንድፍ
  replacement?: string; // ተዛማጁ የሚተካበት ይዘት
  replacementMap?: Record<string, string>; // ወይም የቁልፍ→ምትክ ካርታ
  flags?: string; // Regex ሰንደቆች (በተለምዶ "gi")
  context?: "all" | "user" | "system" | "assistant";
  category?: "filler" | "context" | "structural" | "dedup" | "terse" | "ultra";
  minIntensity?: "lite" | "full" | "ultra"; // ከዚህ የጥንካሬ ደረጃ በታች ከሆነ ዝለል
  description?: string; // ሰነድ
}
```

### ምሳሌ፦ የሂንዲ ሙሌት ደንቦችን መጨመር

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
      "description": "እንደ 'नमस्ते' ያሉ የጨዋነት መክፈቻዎችን አስወግድ"
    },
    {
      "name": "filler_actually",
      "pattern": "\\b(?:असल में|वास्तव में|दरअसल)\\b\\s*",
      "replacement": "",
      "context": "all",
      "category": "filler",
      "minIntensity": "lite",
      "description": "የ'actually' ሙሌት ቃላትን አስወግድ"
    },
    {
      "name": "verbose_plea",
      "pattern": "\\b(?:कृपया|कृपया आप|अनुरोध है कि आप)\\b\\s*",
      "replacement": "",
      "context": "all",
      "category": "filler",
      "minIntensity": "full",
      "description": "በሂንዲ ውስጥ 'please'ን አስወግድ"
    }
  ]
}
```

### ማረጋገጫ

የደንብ ጥቅሎች በሚጫኑበት ጊዜ ከ`_schema.json` ጋር ይረጋገጣሉ። የተሳሳተ መዋቅር ያለው ጥቅል መጫን ይሳነዋል እና ስህተት ይመዘገባል፦

```
RULE_LOADER: የ"hi/filler.json" ጥቅል ማረጋገጫው አልተሳካም፦
  - rules.0.pattern: ልክ ያልሆነ regex
  - rules.1.context: ከ[all, user, system, assistant] አንዱ መሆን አለበት
```

ማረጋገጫው ጥቅል ሲጫን (ከ`_schema.json` ጋር) በራስ-ሰር ይከናወናል፤
ልክ ያልሆነ ጥቅል ውድቅ ይደረጋል እና ከላይ ያለው ስህተት ይመዘገባል። ለጥቅል
ማረጋገጫ የተለየ `npm run` ስክሪፕት የለም—ጥቅሉን ይጫኑ (ለምሳሌ፣ ሰርቨሩን ያስጀምሩ ወይም
የመጭመቂያ መንገዱን ያስኬዱ) እና መዝገቦቹን ይከታተሉ።

### ብጁ የቋንቋ ጥቅል መጫን

```ts
import { loadRulePack } from "omniroute/compression/ruleLoader";

await loadRulePack("./my-custom-rules/hi/filler.json");
```

ወይም ዕውቅና ባለው ቦታ ያስቀምጡት፦

```
~/.omniroute/compression/rules/hi/filler.json  # የተጠቃሚ ደረጃ
<project>/.compression/rules/hi/filler.json   # የፕሮጀክት ደረጃ
```

### ለቋንቋ ጥቅሎች ምርጥ ልምዶች

1. **በ`filler` ይጀምሩ**—እነዚህ ከፍተኛው ተፅዕኖ ያላቸው ደንቦች ናቸው
2. **ኃይለኛ ደንቦችን ለመገደብ `minIntensity`ን ይጠቀሙ**—ከመጠን በላይ መጭመቅን ይከላከላል
3. **የሙከራ ኬዞችን ያካትቱ**—ባህሪውን ለማረጋገጥ በJSON ውስጥ `tests[]` ድርድር ይጨምሩ
4. **ቅደም ተከተል አስፈላጊ ነው**—ቀደም ያሉ ደንቦች መጀመሪያ ይተገበራሉ፤ ከፍተኛ ተፅዕኖ ያላቸውን ደንቦች መጀመሪያ ያስቀምጡ
5. **`replacement`ን በጥንቃቄ ይጠቀሙ**—ባዶ ሕብረቁምፊ በአብዛኛው ትክክለኛ ነው፤ በፍጹም አዲስ ይዘት አያስገቡ

### የትርጉም ስትራቴጂ

የደንብ ጥቅሎችን ለአዲስ ቋንቋ ሲያካባቢያዊ ያደርጉ፦

1. **የደንብ ስሞቹን ይተርጉሙ**—በdebug ውጤት ውስጥ ይታያሉ
2. **የregex ንድፎቹን ያስማሙ**—ቀጥተኛ ትርጉም ብዙ ጊዜ አይሰራም (የቃላት ወሰኖች ይለያያሉ)
3. **በእውነተኛ ውይይቶች ይፈትኑ**—ጥቅሉ በተጨባጭ ግብዓት ላይ ደህንነቱ የተጠበቀ መሆን አለበት
4. **ከባህላዊ ልማዶች ጋር ያዛምዱ**—ለምሳሌ፣ የጃፓንኛ ጥቅሎች ከእንግሊዝኛ የበለጠ የክብር መግለጫ ሙሌቶች አሏቸው

---

## የተደራረቡ ፓይፕላይኖች

**የተደራረበ ፓይፕላይን** በርካታ ኤንጂኖችን በቅደም ተከተል ያስኬዳል፤ የእያንዳንዱ ኤንጂን ውጤትም ለቀጣዩ ግብዓት ይሆናል። `mode: stacked` በውስጣዊ አሠራሩ የሚሰራው በዚህ መንገድ ነው።

### መደራረብ እንዴት እንደሚሰራ

```
ግብዓት (10,000 ቶከኖች)
        │
        ▼
   ┌──────────┐
   │  ኤንጂን   │  ቅድሚያ 10
   │  A       │  ──▶ ውጤት: 6,000 ቶከኖች (-40%)
   └────┬─────┘
        ▼
   ┌──────────┐
   │  ኤንጂን   │  ቅድሚያ 50
   │  B       │  ──▶ ውጤት: 2,400 ቶከኖች (-60%)
   └────┬─────┘
        ▼
   ┌──────────┐
   │  ኤንጂን   │  ቅድሚያ 100
   │  C       │  ──▶ ውጤት: 1,200 ቶከኖች (-80%)
   └────┬─────┘
        │
        ▼
የመጨረሻ ውጤት (1,200 ቶከኖች፣ በድምሩ ~88% ቁጠባ)
```

`mode: "stacked"` ሲመረጥ፣ ኤንጂኖቹ በ`pipeline` ድርድር ውስጥ በተገለጸው ቅደም ተከተል አንድ በአንድ ይፈጸማሉ።
የኤንጂን N ውጤት የኤንጂን N+1 ግብዓት ይሆናል።

### የመጭመቂያ ሁነታዎች

OmniRoute በውቅር፣ ራስ-ሰር ማስጀመሪያ ገደቦች እና የጥምር ለውጦች መሠረት **ለእያንዳንዱ ጥያቄ አንድ ሁነታ** ይመርጣል።
የሚገኙት ሁነታዎች በ`open-sse/services/compression/types.ts` (`CompressionMode` ዓይነት) ውስጥ ተገልጸዋል፦

| ሁነታ          | ኤንጂኖች                | የአጠቃቀም ሁኔታ                                                                                                                                               |
| ------------ | -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `off`        | ምንም                  | ሁሉንም መጭመቅ ያሰናክሉ                                                                                                                                          |
| `rtk`        | RTK ብቻ               | የትዕዛዝ ውጤት የበዛባቸው ክፍለ ጊዜዎች (80%+ ቁጠባ)                                                                                                                     |
| `lite`       | Lite ብቻ              | ጥንቃቄ የተሞላበት መጭመቅ (ፈጣን፣ አስተማማኝ)                                                                                                                           |
| `standard`   | Caveman              | ከቋንቋ ጥቅሎች ጋር የጽሑፍ መጭመቅ                                                                                                                                   |
| `aggressive` | Caveman + Aggressive | ከፍተኛ የጽሑፍ መጭመቅ + ከፍተኛ የመጨረሻ ዙር                                                                                                                           |
| `ultra`      | Ultra                | ከፍተኛው መጭመቅ (መረጃ ሊያጠፋ የሚችል፣ እንደ የመጨረሻ አማራጭ)። `ultra.modelPath` ሲዋቀር፣ እንደ አማራጭ በ**LLMLingua-2** SLM ኤንጂን በኩል ይመራል (ሞዴሉ ከሌለ ወደ በደንብ-ላይ-የተመሠረተው መንገድ ይመለሳል)። |
| `stacked`    | ብጁ ፓይፕላይን            | ኤንጂኖችን በማንኛውም ቅደም ተከተል ያቀናብሩ (ከታች ይመልከቱ)                                                                                                                 |

> ከላይ ከተጠቀሱት የሁነታ ኤንጂኖች በተጨማሪ፣ መዝገቡ ሊደራረቡ የሚችሉ ልዩ ኤንጂኖችንም ያካትታል —
> **CCR**፣ **headroom**፣ **ionizer** እና **session-dedup** — እነዚህም በ
> [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md#additional-built-in-engines) ውስጥ ተመዝግበዋል።

የሁነታ ምርጫ የሚወሰነው በ`open-sse/services/compression/strategySelector.ts` ውስጥ ባለው `getEffectiveMode()` ነው፦

1. መጭመቅ ከተሰናከለ፦ `"off"`
2. የጥምር ለውጥ ካለ፦ ለውጡን ይጠቀሙ
3. የራስ-ሰር ማስጀመሪያ ገደብ ከታለፈ፦ `autoTriggerMode`ን ይጠቀሙ (ነባሪ፦ `"lite"`)
4. ካልሆነ፦ `defaultMode`ን ይጠቀሙ

### ነባሪው የተደራረበ ፓይፕላይን

`mode: "stacked"` በግልጽ ሲዋቀር፣ ነባሪው ፓይፕላይን የሚከተሉትን ያቀናብራል፦

1. **RTK** — የትዕዛዝ ውጤት ጫጫታን ያስወግዳል (በተርሚናል ውጤት ላይ ~80% ቁጠባ)
2. **Caveman** — አላስፈላጊ ቃላትን ያስወግዳል፣ ጽሑፉን አጭር ያደርጋል (ከቀረው ጽሑፍ ~46%)
3. **Lite** — የመጨረሻ ነጭ ቦታ + ድግግሞሽ ማስወገጃ ዙር

ይህ ጥምረት ብዙ መሣሪያዎች በሚጠቀሙ ክፍለ ጊዜዎች ላይ **78-95% ቁጠባ** ያስገኛል።

### የተደራረቡ ፓይፕላይኖችን ማዋቀር

በጥምር ውቅር ውስጥ፦

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

ኤንጂኖችን መተው፣ ብጁ ኤንጂኖችን ማከል ወይም ቅደም ተከተላቸውን መለወጥ ይችላሉ።

### ሁኔታን ማስተላለፍ

ኤንጂኖች ከጥያቄው አውድ (በ`options` ውስጥ) ሜታዳታን ማንበብ ይችላሉ፦

```ts
compress(body, config) {
  // ከቀደሙት ኤንጂኖች ሜታዳታን ያንብቡ
  const original = options?.compressionComboId;  // "my-coding-combo"
  // ...
}
```

ሜታዳታው **ለንባብ ብቻ** ነው — ኤንጂኖች የጥያቄውን አውድ መቀየር አይችሉም፤ የራሳቸውን የይዘት ውጤት ብቻ መቀየር ይችላሉ።

### የአፈጻጸም ቅደም ተከተል ላይ ሊያጋጥሙ የሚችሉ ችግሮች

| የኤንጂን ቅደም ተከተል                            | ውጤት                                                                 |
| ----------------------------------------- | ------------------------------------------------------------------- |
| RTK → Caveman → Lite                      | **የሚመከር** (በመጀመሪያ ጫጫታን፣ ቀጥሎ ቋንቋን፣ ከዚያም ነጭ ቦታን ያስወግዳል)               |
| Lite → RTK → Caveman                      | መጥፎ — Lite ከጥሬ ውጤት ነጭ ቦታን ስለሚያስወግድ የRTK የስርዓተ-ጥለት ማዛመድ እንዳይሰራ ያደርጋል |
| Caveman → RTK                             | መጥፎ — Caveman ጽሑፉን RTK ሊያውቀው በማይችልበት መንገድ እንደገና ሊጽፈው ይችላል           |
| `tool_results` በመጀመሪያ ያለበት ማንኛውም ቅደም ተከተል | የተሻለ — የመሣሪያ ውጤት ከሁሉም የበለጠ ጫጫታ ያለው ይዘት ነው                           |

### መቼ መደራረብ እንደሌለበት

መደራረብ ሁልጊዜ የተሻለ አይደለም፦

- **ቀላል መልዕክቶች** (የመሣሪያ ውጤት የሌላቸው) — Caveman ወይም Lite ብቻ በቂ ነው
- **ወጪን የሚያስቀድሙ** — እያንዳንዱ ኤንጂን ~5-50ms መዘግየት ይጨምራል
- **የተወሰኑ መሣሪያዎች** — ለሼል ውጤት ብዙውን ጊዜ RTK ብቻ በቂ ነው

### ብጁ ፓይፕላይን መገንባት

የተሰየመ የpipeline መዝገብ የለም። stacked pipeline ማለት ለ`applyStackedCompression()` (ከ`@omniroute/open-sse/services/compression/strategySelector` የሚላክ) የሚተላለፍ **inline የደረጃዎች array** ብቻ ነው፦

```ts
import { applyStackedCompression } from "@omniroute/open-sse/services/compression/strategySelector";

const result = applyStackedCompression(body, [
  { engine: "rtk", intensity: "aggressive" },
  { engine: "caveman", intensity: "full" },
]);
```

pipeline ካላስተላለፉ፣ በነባሪ `rtk(standard) → caveman(full)` ይጠቀማል።

ከውቅር ለመቆጣጠር፣ `mode: "stacked"` ያዘጋጁ እና የደረጃዎቹን array በ`stackedPipeline` ስር ያቅርቡ (ከ`config.stackedPipeline` ይነበባል)፦

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

## የዋና ምንጭ ማመሳሰል ፖሊሲ

የOmniRoute ማመቂያ ሞተሮች README ውስጥ ለበርካታ የዋና ምንጭ ፕሮጀክቶች
ዕውቅና ይሰጣሉ
("በRTK፣ Caveman፣ LLMLingua-2፣ Troglodita የተነሳሳ")። አበርካቾች በተደጋጋሚ
የሚጠይቁት ጥያቄ፦ **ዋናው RTK አዲስ የመሣሪያ ማጣሪያ ሲጨምር ወይም Caveman የደንብ
ጥቅል ሲጨምር፣ ያ ወደ OmniRoute እንዴት ይደርሳል?** ይህ ክፍል በጉዳዩ ላይ ሥልጣን ያለው መልስ ነው።

### በፕሮጀክቱ ውስጥ የተካተቱ ቅጂዎች ከገለልተኛ ትግበራዎች ጋር ሲነጻጸሩ

| ሞተር                          | ከዋናው ምንጭ ጋር ያለው ግንኙነት                                                                                        | አካባቢ                                                                |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------- |
| **RTK**                      | **ገለልተኛ ዳግም ትግበራ** (በእሱ የተነሳሳ እንጂ ቅጂ አይደለም)                                                                  | `open-sse/services/compression/engines/rtk/`                        |
| **Caveman**                  | **ገለልተኛ ዳግም ትግበራ** (በእሱ የተነሳሳ)                                                                               | `open-sse/services/compression/engines/cavemanAdapter.ts`           |
| **Headroom**                 | በአብዛኛው ውስጣዊ ነው፤ ከ`gcf-typescript` **በእውነት የተካተተው** የ`gcf/` ኮዴክ ብቻ ነው (MIT፣ SPDX ምልክት የተደረገበት፣ አጠቃላይ መገለጫ ብቻ) | `open-sse/services/compression/engines/headroom/gcf/`               |
| **LLMLingua-2 / Troglodita** | በእነሱ የተነሳሳ (የ`llmlingua` + `session-dedup` ሞተሮችን ያንቀሳቅሳሉ)                                                    | `open-sse/services/compression/engines/llmlingua/`, `session-dedup` |

ዋናው ነጥብ፦ **RTK እና Caveman የ_ሐሳቦቹ\_ (የማጣሪያ ደንቦች፣ የደንብ ጥቅሎች)
ከባዶ የተገነቡ TypeScript ትግበራዎች ናቸው እንጂ በፕሮጀክቱ ውስጥ የተካተቱ የምንጭ ዛፎች አይደሉም።** `git pull` ማድረግ
የሚቻልበት የዋና ምንጭ ቅጂ የለም — README "bundled" ከማለት ይልቅ
"inspired by" የሚለውም በትክክል ለዚህ ነው።

### የዋና ምንጭ ማሻሻያዎች እንዴት እንደሚዋሃዱ

**ራስ-ሰር የዋና ምንጭ ልቀት ክትትል እና `compression-sync`
መለያ የለም** — ይህም ሆን ተብሎ ነው። ሞተሮቹ ዳግም ትግበራዎች ስለሆኑ፣ የዋናው RTK
ማጣሪያ ወይም የCaveman ደንብ ጥቅል እንደ ኮድ አይዋሃድም፤ ይልቁንም **በOmniRoute የራሱ ቅርጸት እንደ አዲስ
ደንብ/ማጣሪያ ዳግም ይገለጻል** ([COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md)ን ይመልከቱ) እና
በመደበኛ PR በየአጋጣሚው ይገባል። ከላይ ያሉት የማስፋፊያ ነጥቦች (ብጁ ሞተር፣ የቋንቋ ጥቅል፣ RTK ማጣሪያ)
አንድን ለማበርከት የተፈቀደው መንገድ ናቸው።

ይህንን ፍሰት በትክክል የሚያሳዩ የቅርብ ጊዜ ምሳሌዎች፦

- ለGradle እና `dotnet` የግንባታ ውፅዓት RTK ማጣሪያዎች (v3.8.42)
- ለkubectl / docker-build / composer / gh RTK ማጣሪያዎች (#2824)
- የCaveman የኢንዶኔዥያ ቋንቋ ጥቅል (#3975)፣ እንዲሁም የጀርመንኛ / ፈረንሳይኛ / ጃፓንኛ / ቻይንኛ ጥቅሎች

### Headroom (የግቤት ማመቂያ ፕሮክሲ)

Headroom **ሙሉ በሙሉ ውስጣዊ ነው** — በአንድ ስሪት ላይ የተቆለፈ የ`gcf` ኮዴክ ቅጽበተ-ቅጂ እና
የOmniRoute የራሱ `smartcrusher` / `toon` / `tabular` ንብርብሮች። ከተካተተው ቅጂ ባሻገር
ለመከታተል የቀጥታ ዋና ምንጭ የለም፤ ኮዴኩ ሲቀየር የ`gcf` ዝማኔዎች በእጅ ይታደሳሉ
እና ከማመቂያ በጀት መግቢያ (`check:compression-budget`) ጋር እንደገና ይረጋገጣሉ።

### በዋና ምንጭ የተነሳሳ ማሻሻያ ማቅረብ

1. **በፕሮጀክቱ ውስጥ ቅጂውን አታካትቱ** — የዋናውን ምንጭ ደንብ/ማጣሪያ በOmniRoute ቅርጸት ዳግም ይግለጹ።
2. ከታች ባለው ተዛማጅ የማስፋፊያ ነጥብ (የቋንቋ ጥቅል፣ RTK ማጣሪያ ወይም
   ብጁ ሞተር) በኩል ያክሉት።
3. ፈቃድ የያዘውን ምንጭ ከመቅዳት ይልቅ በPR መግለጫው ውስጥ የዋናውን ምንጭ ፕሮጀክት ይጥቀሱ (ዕውቅና)።
4. ሙከራዎችን ያካትቱ እና የ`check:compression-budget` መግቢያ አሁንም እንደሚያልፍ ያረጋግጡ።

---

## የውጤት ቅጥ ማከል

የውጤት ቅጦች (የ[መመሪያውን የካታሎግ ሰንጠረዥ](./COMPRESSION_GUIDE.md#output-styles-catalog) ይመልከቱ)
የግብዓት ሞተሮች በምላሽ በኩል ያላቸው አቻ ናቸው፦ እርስዎ የሚልኩትን ከመጭመቅ ይልቅ፣ ሞዴሉ ወጪው ዝቅተኛ የሆነ ውጤት እንዲያመነጭ ያዝዛሉ። መዝገቡ
`OUTPUT_STYLE_CATALOG` ሲሆን በ`open-sse/services/compression/outputStyles/catalog.ts` ውስጥ ይገኛል፣ እና
**አንድ የካታሎግ ግቤት ሙሉውን ባህሪ ይወክላል**፦ አስገቢው፣ የዳሽቦርድ ቅንብሮች ፓነሉ፣
ዘላቂ ማከማቻው እና ቴሌሜትሪው ሁሉም ካታሎጉን ይዘረዝራሉ — ማዘመን የሚያስፈልገው ሌላ ዝርዝር የለም።

1. **ወደ `OUTPUT_STYLE_CATALOG` አንድ ግቤት ያክሉ**፤ `id`፣ `label`፣ `description` እና
   ሦስቱን የእንግሊዝኛ `levels` (`lite`፣ `full`፣ `ultra`) ያካትቱ። ኮድ፣ ዱካዎች፣ ትዕዛዞች፣ ስህተቶች እና URLs ሳይቀየሩ እንዲቆዩ እያንዳንዱ ደረጃ በ
   `${SHARED_BOUNDARIES}` መጨረስ አለበት።
   የመመሪያው ጽሑፍ ለእያንዳንዱ
   `(id, level, language)` **ቋሚ እና የማይለዋወጥ** መሆን አለበት — የሚፈቀደው ብቸኛ ማስገባት `${SHARED_BOUNDARIES}` ነው።
2. **ይተርጉሙት።** ቢያንስ በ`i18n` ስር የ`pt-BR` ብሎክ ያቅርቡ፤ `ponytail` እና
   `i-have-adhd` (en፣ pt-BR፣ es፣ de፣ fr፣ it፣ ru፣ zh፣ ja፣ id፣ vi) የማጣቀሻ ቅርጽ ናቸው። ሆን ብሎ ለአንድ ቋንቋ ብቻ የተዘጋጀ ቅጥ በምትኩ `locale` ያቀናብራል (እንደ `terse-cjk` → `zh`)፣ ከዚያም በዚያ አካባቢያዊ ቋንቋ ስር ብቻ ይቀርባል።
3. **የማትሪክስ ጥበቃውን ያዘምኑ** — የቅጡን ቋንቋዎች በ
   `tests/unit/compression/output-styles-i18n-matrix.test.ts` ውስጥ ወዳለው `BASELINE_LANGUAGES` ያክሉ። ግልጽ የሆነ፣ የመከታተያ ጉዳይ ያለው
   `KNOWN_ENGLISH_ONLY` ግቤት ካልያዘ፣ መግቢያ በአካባቢያዊ ቋንቋ ያልተገደበ እና አስፈላጊዎቹ ትርጉሞች የሌሉት ማንኛውም አዲስ ቅጥ ጌቱን እንዳያልፍ ያደርጋል።
4. **ለእያንዳንዱ ቅጥ ሙከራ ያክሉ**፤
   `tests/unit/compression/i-have-adhd-catalog.test.ts`ን እንደ አብነት ይጠቀሙ፦ የካታሎግ ቅርጽ፣ በእያንዳንዱ ደረጃ የድንበር አንቀጽ፣ እና እያንዳንዱ ትርጉም ከእንግሊዝኛ ከመቅዳት ይልቅ በራሱ ቋንቋ መጻፉን የሚያረጋግጥ መልህቅ።
5. **ምንጭ መጥቀስ**፦ ቅጡ ከሌላ የላይኛው ፕሮጀክት የተወሰደ ከሆነ፣ በግቤቱ ላይ ባለ የምንጭ አስተያየት ውስጥ እውቅና ይስጡ (ለምሳሌ፦ `i-have-adhd` → ayghri/i-have-adhd, MIT) — ከላይ ካለው "Proposing an upstream-inspired improvement" ጋር ተመሳሳይ ደንብ ነው።

ምንም የUI፣ የስኪማ ወይም የቴሌሜትሪ ለውጥ አያስፈልግም — እነዚያ ገጽታዎች ከካታሎጉ ይቀርባሉ።

---

## ምርጥ ልምዶች

### የሞተር ልማት

1. **ሁልጊዜ `validateConfig`ን ይተግብሩ** — ማረጋገጫ የሌላቸው ሞተሮች በዝምታ ውድቀቶችን ያስከትላሉ
2. **ተጨባጭ `targetLatencyMs` ያዘጋጁ** — ሞተሮችን ለመምረጥ በስትራቴጂ መራጩ ይጠቀምበታል
3. **ለዳሽቦርዱ `getConfigSchema`ን ይጠቀሙ** — ውቅረትን ከተጠቃሚዎች ፈጽሞ አይደብቁ
4. **ሞተርዎ ንጹሕ ከሆነ `stackable: true`ን ይደግፉ** — የጎንዮሽ ተጽዕኖ ያላቸው ሞተሮች መደራረብ የለባቸውም
5. **የመስመር ውስጥ ሙከራዎችን ይጻፉ** — ሞተሮች በ<1s ውስጥ ሊረጋገጡ ይገባል

### የቋንቋ ጥቅል ልማት

1. **በ`lite` የጥንካሬ ደረጃ ይጀምሩ** — ደንቦችዎ በዝቅተኛው ቅንብር ደህንነታቸው የተጠበቀ መሆን አለባቸው
2. **ደንቦችን ለመወሰን `context`ን ይጠቀሙ** — `user` ብቻ የሆኑ ደንቦች በድንገት የስርዓት መመሪያዎችን ሊነኩ አይችሉም
3. **የJSON ቁልፎችን ከመያዝ ይቆጠቡ** — `\\bword\\b` በJSON ውስጥ ሊዛመድ እና የተዋቀረ ውሂብን ሊያበላሽ ይችላል
4. **በጠርዝ ሁኔታዎች ይሞክሩ** — ባዶ ግብዓት፣ unicode፣ RTL ጽሑፍ፣ ኢሞጂዎች
5. **ነባር ጥቅሎችን እንደ አብነት ይጠቀሙ** — `en/filler.json` እጅግ የበለጸገው ምሳሌ ነው

### የፓይፕላይን ንድፍ

1. **ከማመቻቸትዎ በፊት መገለጫ ያዘጋጁ** — መጀመሪያ በ`compression_stats` ይለኩ
2. **ዳግም ከመተግበር ይልቅ ማቀናበርን ይምረጡ** — አዲስ ሞተር ከመጻፍዎ በፊት የCaveman ደንቦችን ያስፋፉ
3. **የቅደም ተከተሉን ምክንያት ይመዝግቡ** — ሞተር A ከሞተር B በፊት ለምን እንደሚመጣ አስተያየት ይጻፉ
4. **በሦስቱም የጥንካሬ ደረጃዎች ይሞክሩ** — `lite` ፈጣን ነው ግን መረጃ ሊያጣ ይችላል፣ `ultra` ዘገምተኛ ነው ግን ትክክለኛ ነው

---

## ማጣቀሻ፦ አብሮገነብ ሞተሮች

| የሞተር ID              | ተደራራቢ | ነባሪ stackPriority | ዒላማዎች                        |
| -------------------- | ----- | ----------------- | ---------------------------- |
| `lite`               | አዎ    | 5                 | መልዕክቶች፣ የመሣሪያ ውጤቶች           |
| `rtk`                | አዎ    | 10                | የመሣሪያ ውጤቶች                   |
| `standard` (caveman) | አዎ    | 20                | መልዕክቶች፣ የመሣሪያ ውጤቶች፣ የኮድ ብሎኮች |
| `aggressive`         | አዎ    | 30                | መልዕክቶች                       |
| `ultra`              | አዎ    | 40                | መልዕክቶች፣ የኮድ ብሎኮች             |

### በተጨማሪ ይመልከቱ

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — የሂደት መስመሩ አጠቃላይ እይታ
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — የሞተር መዝገብ ማጣቀሻ
- [COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md) — የደንብ ቅርጸት ዝርዝር መግለጫ
- [COMPRESSION_LANGUAGE_PACKS.md](./COMPRESSION_LANGUAGE_PACKS.md) — የቋንቋ ጥቅል ዝርዝሮች
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — RTK ሞተር እና ብጁ ማጣሪያዎች
- ምንጭ፦ `open-sse/services/compression/` (117 ፋይሎች፣ ~250KB)
