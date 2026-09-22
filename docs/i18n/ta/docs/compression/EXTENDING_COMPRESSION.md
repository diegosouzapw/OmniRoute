# Extending the Compression Pipeline (தமிழ்)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/EXTENDING_COMPRESSION.md) · 🇪🇹 [am](../../../am/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇦 [ar](../../../ar/docs/compression/EXTENDING_COMPRESSION.md) · 🇦🇿 [az](../../../az/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇬 [bg](../../../bg/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇩 [bn](../../../bn/docs/compression/EXTENDING_COMPRESSION.md) · 🇨🇿 [cs](../../../cs/docs/compression/EXTENDING_COMPRESSION.md) · 🇩🇰 [da](../../../da/docs/compression/EXTENDING_COMPRESSION.md) · 🇩🇪 [de](../../../de/docs/compression/EXTENDING_COMPRESSION.md) · 🇬🇷 [el](../../../el/docs/compression/EXTENDING_COMPRESSION.md) · 🇪🇸 [es](../../../es/docs/compression/EXTENDING_COMPRESSION.md) · 🇪🇪 [et](../../../et/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇷 [fa](../../../fa/docs/compression/EXTENDING_COMPRESSION.md) · 🇫🇮 [fi](../../../fi/docs/compression/EXTENDING_COMPRESSION.md) · 🇫🇷 [fr](../../../fr/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇪 [ga](../../../ga/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [gu](../../../gu/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [ha](../../../ha/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇱 [he](../../../he/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [hi](../../../hi/docs/compression/EXTENDING_COMPRESSION.md) · 🇭🇷 [hr](../../../hr/docs/compression/EXTENDING_COMPRESSION.md) · 🇭🇺 [hu](../../../hu/docs/compression/EXTENDING_COMPRESSION.md) · 🇦🇲 [hy](../../../hy/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇩 [id](../../../id/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [ig](../../../ig/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇹 [it](../../../it/docs/compression/EXTENDING_COMPRESSION.md) · 🇯🇵 [ja](../../../ja/docs/compression/EXTENDING_COMPRESSION.md) · 🇬🇪 [ka](../../../ka/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇭 [km](../../../km/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [kn](../../../kn/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇷 [ko](../../../ko/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇹 [lt](../../../lt/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇻 [lv](../../../lv/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [ml](../../../ml/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [mr](../../../mr/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇾 [ms](../../../ms/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇹 [mt](../../../mt/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇲 [my](../../../my/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇵 [ne](../../../ne/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇱 [nl](../../../nl/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇴 [no](../../../no/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [or](../../../or/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [pa](../../../pa/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇭 [phi](../../../phi/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇱 [pl](../../../pl/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇹 [pt](../../../pt/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇴 [ro](../../../ro/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇺 [ru](../../../ru/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇰 [si](../../../si/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇰 [sk](../../../sk/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇮 [sl](../../../sl/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇸 [sr](../../../sr/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇪 [sv](../../../sv/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇪 [sw](../../../sw/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [te](../../../te/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇭 [th](../../../th/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇷 [tr](../../../tr/docs/compression/EXTENDING_COMPRESSION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇰 [ur](../../../ur/docs/compression/EXTENDING_COMPRESSION.md) · 🇺🇿 [uz](../../../uz/docs/compression/EXTENDING_COMPRESSION.md) · 🇻🇳 [vi](../../../vi/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [yo](../../../yo/docs/compression/EXTENDING_COMPRESSION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/EXTENDING_COMPRESSION.md)

---

> **சுருக்கமாக**: OmniRoute-இன் சுருக்க இயந்திரம் **செருகக்கூடியது** — நீங்கள் தனிப்பயன் இயந்திரங்களைப் பதிவுசெய்யலாம், புதிய மொழிகளுக்கான மொழித் தொகுப்புகளை வழங்கலாம், மேலும் அடுக்கப்பட்ட செயலாக்கத் தொடர்களை உருவாக்கலாம். அதை எப்படிச் செய்வது என்பதை இந்த வழிகாட்டி காட்டுகிறது.

**தொடர்புடைய வழிகாட்டிகள்:**

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — முழுமையான செயலாக்கத் தொடர் கண்ணோட்டம்
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — இயந்திரப் பதிவகம் மற்றும் உள்ளமைந்த இயந்திரங்கள்
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — RTK இயந்திரம் மற்றும் தனிப்பயன் வடிப்பான்கள்
- [COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md) — விதித் தொகுப்பு வடிவமைப்பிற்கான குறிப்பேடு

---

## கண்ணோட்டம்

சுருக்க அமைப்பில் **3 விரிவாக்கப் புள்ளிகள்** உள்ளன:

| விரிவாக்கப் புள்ளி                | பயன்பாடு                                                                  | கடினத்தன்மை |
| --------------------------------- | ------------------------------------------------------------------------- | ----------- |
| **தனிப்பயன் இயந்திரம்**           | முற்றிலும் புதிய சுருக்க வழிமுறையைச் சேர்த்தல் (எ.கா., துறைசார் சுருக்கி) | மேம்பட்டது  |
| **மொழித் தொகுப்பு**               | ஒரு புதிய இயற்கை மொழிக்கான ஆதரவைச் சேர்த்தல் (எ.கா., இந்தி, அரபு)         | நடுத்தரம்   |
| **அடுக்கப்பட்ட செயலாக்கத் தொடர்** | ஏற்கெனவே உள்ள இயந்திரங்களைத் தனிப்பயன் வரிசையில் ஒருங்கிணைத்தல்           | தொடக்கநிலை  |

```
┌─────────────────────────────────────────────────────────────┐
│                    சுருக்க உத்தி                              │
│                                                              │
│   உள்ளீட்டுச் செய்திகள் ──▶ getEffectiveMode() ──▶ பயன்முறை  │
│                                              │               │
│                      ┌───────────────────────┼──────────┐    │
│                      │         │         │         │    │    │
│                      ▼         ▼         ▼         ▼    │    │
│                   "rtk"    "lite"   "standard" "stacked"    │
│                      │         │         │         │    │    │
│                      ▼         ▼         ▼         ▼    │    │
│                   RTK       Lite     Caveman   engines[]   │
│                   இயந்திரம் இயந்திரம் இயந்திரம் தொடரிணைப்பு │
│                      │         │         │         │    │    │
│                      └─────────┴─────────┴─────────┘    │    │
│                                      │                    │
│                                      ▼                    │
│                              சுருக்கப்பட்ட வெளியீடு          │
└─────────────────────────────────────────────────────────────┘

உத்தித் தேர்வி MODE-அடிப்படையிலானது: ஒவ்வொரு கோரிக்கையும் ஒரே ஒரு பயன்முறையைத்
தேர்ந்தெடுக்கிறது (rtk / lite / standard / aggressive / ultra / stacked / off).
"stacked" பயன்முறை மட்டுமே பல இயந்திரங்களை வரிசையாகத் தொடரிணைக்கிறது.
இயல்புநிலை தானியங்கித் தூண்டல் பயன்முறை "lite" ஆகும் (3-அடுக்கு முன்னுரிமைத் தொடர் அல்ல).
```

---

## தனிப்பயன் சுருக்க இயந்திரத்தை எழுதுதல்

இயந்திர இடைமுகம் (`open-sse/services/compression/engines/types.ts`) என்பது ஒவ்வொரு இயந்திரமும் பூர்த்திசெய்ய வேண்டிய ஒப்பந்தமாகும். இதில் கட்டாயமான 5 முறைகள் உள்ளன.

### `CompressionEngine` இடைமுகம்

```ts
interface CompressionEngine {
  id: string; // தனித்துவமான இயந்திர ID
  name: string; // காட்சிப் பெயர்
  description: string; // குறுகிய விளக்கம்
  icon: string; // சின்னம் (emoji அல்லது URL)
  targets: CompressionEngineTarget[]; // ["messages", "tool_results", "code_blocks"]
  stackable: boolean; // அடுக்கப்பட்ட செயலாக்கத் தொடரில் பயன்படுத்த முடியுமா
  stackPriority: number; // அடுக்கப்பட்ட செயலாக்கத் தொடர்களிலுள்ள வரிசை (குறைவானது = முந்தையது)
  metadata: CompressionEngineMetadata;

  apply(body, options?): CompressionResult;
  compress(body, config?): CompressionResult;
  getConfigSchema(): EngineConfigField[];
  validateConfig(config): EngineValidationResult;
}
```

### குறைந்தபட்ச எடுத்துக்காட்டு: இடைவெளி இயந்திரம்

சாத்தியமானவற்றிலேயே மிகவும் எளிய இயந்திரம் — செய்திகளிலிருந்து கூடுதல் இடைவெளிகளை அகற்றுகிறது.

````ts
import type { CompressionEngine } from "omniroute/compression/engines/types";
import { registerCompressionEngine } from "omniroute/compression/engines/registry";

function preserveCodeBlocks(text: string): string {
  // குறியீட்டுத் தொகுதி குறிப்பான்களின்படி பிரித்து, அவற்றினுள் உள்ள இடைவெளியைப் பாதுகாக்கவும்
  const parts = text.split(/(```[\s\S]*?```)/);
  return parts
    .map((part) => {
      if (part.startsWith("```")) {
        return part; // குறியீட்டுத் தொகுதிகளை மாற்ற வேண்டாம்
      }
      return part.replace(/\n{3,}/g, "\n\n"); // உரைநடைக்கு மட்டும் பயன்படுத்தவும்
    })
    .join("");
}

const whitespaceEngine: CompressionEngine = {
  id: "whitespace",
  name: "இடைவெளி நீக்கி",
  description: "கூடுதல் இடைவெளிகளையும் வெற்று வரிகளையும் நீக்குகிறது",
  icon: "📝",
  targets: ["messages", "tool_results"],
  stackable: true,
  stackPriority: 100, // caveman/rtk-க்குப் பிறகு இயக்கவும்

  metadata: {
    id: "whitespace",
    name: "இடைவெளி நீக்கி",
    description: "கூடுதல் இடைவெளிகளையும் வெற்று வரிகளையும் நீக்குகிறது",
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

    // செய்தி அணிவரிசையைக் கடந்து செல்லவும் — சரம் மற்றும் பல்பகுதி உள்ளடக்கம் இரண்டையும் கையாளவும்
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
      // பல்பகுதி உள்ளடக்கம்: பகுதிகளைக் கடந்து சென்று, உரைப் பகுதிகளை மட்டும் சுருக்கவும்
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
          return part; // image_url, tool_use போன்றவற்றைப் பாதுகாக்கவும்.
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
        label: "குறியீட்டுத் தொகுதிகளைப் பாதுகாக்கவும்",
        defaultValue: true,
        description: "```code``` தொகுதிகளுக்குள் உள்ள இடைவெளிகளை மாற்ற வேண்டாம்",
      },
    ];
  },

  validateConfig(config) {
    if (config.preserveCodeBlocks !== undefined && typeof config.preserveCodeBlocks !== "boolean") {
      return {
        valid: false,
        errors: ["preserveCodeBlocks ஒரு boolean ஆக இருக்க வேண்டும்"],
      };
    }
    return { valid: true, errors: [] };
  },
};

// உலகளவில் பதிவுசெய்யவும்
registerCompressionEngine(whitespaceEngine);
````

### தனிப்பயன் இயந்திரங்களை எங்கு வைப்பது

```
~/.omniroute/compression/engines/my-engine.ts    # பயனர் நிலை
<project>/compression-engines/my-engine.ts        # திட்ட நிலை (தொடக்கத்தில் ஏற்றப்படும்)
```

அல்லது ஒரு செருகுநிரலிலிருந்து நிரல்முறையில் ஏற்றவும்:

```ts
// உங்கள் செருகுநிரலில்
import {
  registerCompressionEngine,
  unregisterCompressionEngine,
} from "@omniroute/open-sse/services/compression/engines/registry";
import { myEngine } from "./engines/my-engine";

export default definePlugin({
  name: "my-compression-plugin",
  // செருகுநிரல் SDK, onRequest / onResponse / onError கொக்கிகளை வழங்குகிறது. செருகுநிரல்
  // தொகுதி ஏற்றப்படும்போது (அல்லது முதல் onRequest-இல்) இயந்திரத்தைப் பதிவுசெய்யவும்; உங்கள் சொந்த
  // அகற்றல் பாதையிலிருந்து அதன் பதிவை நீக்கவும்.
  onRequest: async (ctx) => {
    registerCompressionEngine(myEngine);
  },
});

// அகற்றும்போது:
// unregisterCompressionEngine("my-engine");
```

### உங்கள் இயந்திரத்தைச் சோதித்தல்

உங்கள் இயந்திரத்தை ஒரு செருகுநிரல் அல்லது தொடக்கச் செயல்பாட்டில் பதிவுசெய்யவும். பதிவுசெய்யப்பட்டதும், அதன் `id` மூலம் உத்தித் தேர்வியில் இயந்திரம் கிடைக்கும். அடுக்கப்பட்ட குழாய்த்தொடரில் அதை இணைத்து ஒருங்கிணைப்பைச் சோதிக்கவும்:

---

## மொழிப் பொதிகளை உருவாக்குதல்

Caveman-பாணி சுருக்கம், ஒவ்வொரு இயற்கை மொழியிலும் உள்ள இடைநிரப்பு சொற்கள், தயக்கமான சொற்றொடர்கள் மற்றும் தேவையற்ற நீளமான வடிவங்களைக் கையாள **மொழி-சார்ந்த விதிப் பொதிகளைப்** பயன்படுத்துகிறது. OmniRoute உடன் **6 மொழிப் பொதிகள்** வழங்கப்படுகின்றன: `en`, `es`, `fr`, `de`, `ja`, `pt-BR`.

### பொதியின் கட்டமைப்பு

மொழிப் பொதி என்பது `open-sse/services/compression/rules/<language>/` என்பதன் கீழ் உள்ள **JSON கோப்புகளின்** ஒரு கோப்பகமாகும்:

```
open-sse/services/compression/rules/
├── en/
│   ├── filler.json          # மரியாதைச் சொற்கள், தயக்கமான சொற்றொடர்கள், பணிவுச் சொற்கள்
│   ├── context.json         # சூழலைக் குறைக்கும் விதிகள்
│   ├── dedup.json           # நகல் நீக்க விதிகள்
│   ├── structural.json      # நிறுத்தற்குறிகள், வடிவமைப்பு
│   └── ultra.json           # தீவிரமான சுருக்க விதிகள்
├── es/  (அதே கட்டமைப்பு)
├── fr/  (அதே கட்டமைப்பு)
├── de/  (அதே கட்டமைப்பு)
├── ja/  (அதே கட்டமைப்பு)
└── pt-BR/ (அதே கட்டமைப்பு)
```

### விதியின் அமைப்பு

ஒவ்வொரு விதியும் பின்வரும் வடிவத்தைக் கொண்டுள்ளது (`open-sse/services/compression/ruleLoader.ts` இலிருந்து):

```ts
interface FileRule {
  name: string; // மனிதர்கள் வாசிக்கக்கூடிய பெயர் (kebab-case)
  pattern: string; // JavaScript regex வடிவம்
  replacement?: string; // பொருத்தத்தை எதனால் மாற்ற வேண்டும்
  replacementMap?: Record<string, string>; // அல்லது ஒரு விசை→மாற்றீடு வரைபடம்
  flags?: string; // Regex கொடிகள் (பொதுவாக "gi")
  context?: "all" | "user" | "system" | "assistant";
  category?: "filler" | "context" | "structural" | "dedup" | "terse" | "ultra";
  minIntensity?: "lite" | "full" | "ultra"; // இந்தத் தீவிரத்திற்குக் கீழே இருந்தால் தவிர்க்கவும்
  description?: string; // ஆவணப்படுத்தல்
}
```

### எடுத்துக்காட்டு: இந்தி இடைநிரப்பு விதிகளைச் சேர்த்தல்

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
      "description": "'नमस्ते' போன்ற பணிவான தொடக்கச் சொற்களை அகற்றவும்"
    },
    {
      "name": "filler_actually",
      "pattern": "\\b(?:असल में|वास्तव में|दरअसल)\\b\\s*",
      "replacement": "",
      "context": "all",
      "category": "filler",
      "minIntensity": "lite",
      "description": "'actually' போன்ற இடைநிரப்பு சொற்களை அகற்றவும்"
    },
    {
      "name": "verbose_plea",
      "pattern": "\\b(?:कृपया|कृपया आप|अनुरोध है कि आप)\\b\\s*",
      "replacement": "",
      "context": "all",
      "category": "filler",
      "minIntensity": "full",
      "description": "இந்தியில் உள்ள 'please' என்பதை அகற்றவும்"
    }
  ]
}
```

### சரிபார்ப்பு

விதிப் பொதிகள் ஏற்றப்படும்போது `_schema.json`-க்கு எதிராகச் சரிபார்க்கப்படுகின்றன. தவறான கட்டமைப்பைக் கொண்ட பொதி ஏற்றப்படாமல், ஒரு பிழை பதிவு செய்யப்படும்:

```
RULE_LOADER: "hi/filler.json" பொதி சரிபார்ப்பில் தோல்வியடைந்தது:
  - rules.0.pattern: செல்லுபடியாகாத regex
  - rules.1.context: [all, user, system, assistant] ஆகியவற்றில் ஒன்றாக இருக்க வேண்டும்
```

ஒரு பொதி ஏற்றப்படும்போது (`_schema.json`-க்கு எதிராக) சரிபார்ப்பு தானாகவே இயங்கும்; செல்லுபடியாகாத
பொதி நிராகரிக்கப்பட்டு, மேலே உள்ள பிழை பதிவு செய்யப்படும். பொதியைச் சரிபார்ப்பதற்குத் தனியான
`npm run` ஸ்கிரிப்ட் எதுவும் இல்லை — பொதியை ஏற்றி (எ.கா., சேவையகத்தைத் தொடங்குதல் அல்லது
சுருக்கப் பாதையைச் செயல்படுத்துதல்) பதிவுகளைக் கவனிக்கவும்.

### தனிப்பயன் மொழிப் பொதியை ஏற்றுதல்

```ts
import { loadRulePack } from "omniroute/compression/ruleLoader";

await loadRulePack("./my-custom-rules/hi/filler.json");
```

அல்லது அங்கீகரிக்கப்பட்ட இடத்தில் வைக்கவும்:

```
~/.omniroute/compression/rules/hi/filler.json  # பயனர்-நிலை
<project>/.compression/rules/hi/filler.json   # திட்ட-நிலை
```

### மொழிப் பொதிகளுக்கான சிறந்த நடைமுறைகள்

1. **`filler` உடன் தொடங்கவும்** — இவையே அதிக தாக்கத்தை ஏற்படுத்தும் விதிகள்
2. **தீவிரமான விதிகளைக் கட்டுப்படுத்த `minIntensity`-ஐப் பயன்படுத்தவும்** — இது அளவுக்கு அதிகமான சுருக்கத்திலிருந்து பாதுகாக்கிறது
3. **சோதனை நிகழ்வுகளைச் சேர்க்கவும்** — நடத்தையைச் சரிபார்க்க JSON-இல் `tests[]` வரிசையைச் சேர்க்கவும்
4. **வரிசை முக்கியமானது** — முந்தைய விதிகள் முதலில் பயன்படுத்தப்படும்; அதிக தாக்கமுள்ள விதிகளை முதலில் வைக்கவும்
5. **`replacement`-ஐ கவனமாகப் பயன்படுத்தவும்** — பொதுவாக வெற்று சரமே சரியானது; புதிய உள்ளடக்கத்தை ஒருபோதும் அறிமுகப்படுத்த வேண்டாம்

### மொழிபெயர்ப்பு உத்தி

விதிப் பொதிகளை ஒரு புதிய மொழிக்கு உள்ளூர்மயமாக்கும்போது:

1. **விதிகளின் பெயர்களை மொழிபெயர்க்கவும்** — அவை பிழைத்திருத்த வெளியீட்டில் தோன்றும்
2. **regex வடிவங்களைத் தகவமைக்கவும்** — நேரடி மொழிபெயர்ப்பு பெரும்பாலும் தோல்வியடையும் (சொல் எல்லைகள் வேறுபடும்)
3. **உண்மையான உரையாடல்களைக் கொண்டு சோதிக்கவும்** — உண்மையான உள்ளீட்டில் பொதி பாதுகாப்பாக இருக்க வேண்டும்
4. **பண்பாட்டு மரபுகளுடன் பொருத்தவும்** — உதாரணமாக, ஆங்கிலத்தைவிட ஜப்பானியப் பொதிகளில் அதிக மரியாதை சார்ந்த இடைநிரப்பு சொற்கள் உள்ளன

---

## அடுக்கப்பட்ட பைப்லைன்கள்

ஒரு **அடுக்கப்பட்ட பைப்லைன்** பல என்ஜின்களை வரிசையாக இயக்குகிறது; ஒவ்வொரு என்ஜினின் வெளியீடும் அடுத்த என்ஜினுக்கு உள்ளீடாக வழங்கப்படுகிறது. `mode: stacked` உள்முறையில் இப்படித்தான் செயல்படுகிறது.

### அடுக்குதல் எவ்வாறு செயல்படுகிறது

```
உள்ளீடு (10,000 டோக்கன்கள்)
        │
        ▼
   ┌──────────┐
   │  என்ஜின் │  முன்னுரிமை 10
   │  A       │  ──▶ வெளியீடு: 6,000 டோக்கன்கள் (-40%)
   └────┬─────┘
        ▼
   ┌──────────┐
   │  என்ஜின் │  முன்னுரிமை 50
   │  B       │  ──▶ வெளியீடு: 2,400 டோக்கன்கள் (-60%)
   └────┬─────┘
        ▼
   ┌──────────┐
   │  என்ஜின் │  முன்னுரிமை 100
   │  C       │  ──▶ வெளியீடு: 1,200 டோக்கன்கள் (-80%)
   └────┬─────┘
        │
        ▼
இறுதி வெளியீடு (1,200 டோக்கன்கள், மொத்தமாக ~88% சேமிப்பு)
```

`mode: "stacked"` தேர்ந்தெடுக்கப்படும்போது, `pipeline` அணிவரிசையில் குறிப்பிடப்பட்டுள்ள வரிசையில் என்ஜின்கள் தொடர்ச்சியாகச் செயல்படுத்தப்படும்.
என்ஜின் N-இன் வெளியீடு, என்ஜின் N+1-இன் உள்ளீடாக மாறும்.

### சுருக்க முறைகள்

அமைவுகள், தானியங்கித் தூண்டல் வரம்புகள் மற்றும் காம்போ மேலெழுதல்கள் ஆகியவற்றின் அடிப்படையில் OmniRoute ஒவ்வொரு கோரிக்கைக்கும் **ஒரே ஒரு முறையை** தேர்ந்தெடுக்கிறது.
கிடைக்கக்கூடிய முறைகள் `open-sse/services/compression/types.ts`-இல் (`CompressionMode` வகை) வரையறுக்கப்பட்டுள்ளன:

| முறை         | என்ஜின்கள்           | பயன்பாடு                                                                                                                                                                                                                                |
| ------------ | -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `off`        | எதுவுமில்லை          | அனைத்து சுருக்கத்தையும் முடக்கு                                                                                                                                                                                                         |
| `rtk`        | RTK மட்டும்          | கட்டளை வெளியீடு அதிகமுள்ள அமர்வுகள் (80%+ சேமிப்பு)                                                                                                                                                                                     |
| `lite`       | Lite மட்டும்         | மிதமான சுருக்கம் (வேகமானது, பாதுகாப்பானது)                                                                                                                                                                                              |
| `standard`   | Caveman              | மொழித் தொகுப்புகளுடன் உரைநடை சுருக்கம்                                                                                                                                                                                                  |
| `aggressive` | Caveman + Aggressive | தீவிரமான உரைநடை சுருக்கம் + தீவிரமான இறுதிச் சுற்று                                                                                                                                                                                     |
| `ultra`      | Ultra                | அதிகபட்ச சுருக்கம் (இழப்புடையது, கடைசி முயற்சி). `ultra.modelPath` அமைக்கப்பட்டிருக்கும்போது விருப்பத்தேர்வாக **LLMLingua-2** SLM என்ஜின் வழியாக அனுப்பப்படும் (மாடல் கிடைக்காதபோது விதி அடிப்படையிலான பாதைக்குத் தோல்வியின்றி மாறும்). |
| `stacked`    | தனிப்பயன் பைப்லைன்   | என்ஜின்களை எந்த வரிசையிலும் ஒருங்கிணைக்கவும் (கீழே காண்க)                                                                                                                                                                               |

> மேலே உள்ள முறை என்ஜின்களைத் தவிர, பதிவகம் சிறப்பு அடுக்கக்கூடிய என்ஜின்களையும் வழங்குகிறது —
> **CCR**, **headroom**, **ionizer**, மற்றும் **session-dedup** — இவை
> [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md#additional-built-in-engines)-இல் ஆவணப்படுத்தப்பட்டுள்ளன.

முறைத் தேர்வு `open-sse/services/compression/strategySelector.ts`-இல் உள்ள `getEffectiveMode()` மூலம் தீர்மானிக்கப்படுகிறது:

1. சுருக்கம் முடக்கப்பட்டிருந்தால்: `"off"`
2. காம்போ மேலெழுதல் இருந்தால்: அந்த மேலெழுதலைப் பயன்படுத்தவும்
3. தானியங்கித் தூண்டல் வரம்பு மீறப்பட்டால்: `autoTriggerMode`-ஐப் பயன்படுத்தவும் (இயல்புநிலை: `"lite"`)
4. இல்லையெனில்: `defaultMode`-ஐப் பயன்படுத்தவும்

### இயல்புநிலை அடுக்கப்பட்ட பைப்லைன்

`mode: "stacked"` வெளிப்படையாக அமைக்கப்பட்டிருக்கும்போது, இயல்புநிலை பைப்லைன் பின்வருவனவற்றை ஒருங்கிணைக்கிறது:

1. **RTK** — கட்டளை வெளியீட்டு இரைச்சலை அகற்றும் (டெர்மினல் வெளியீட்டில் ~80% சேமிப்பு)
2. **Caveman** — நிரப்பு வார்த்தைகளை அகற்றி, உரைநடையைச் சுருக்கமாக்கும் (மீதமுள்ள உரையில் ~46%)
3. **Lite** — இறுதி வெற்றிடச் சீரமைப்பு + நகல் நீக்கச் சுற்று

இந்த ஒருங்கிணைப்பு கருவிகள் அதிகம் பயன்படுத்தப்படும் அமர்வுகளில் **78-95% சேமிப்பை** அடைகிறது.

### அடுக்கப்பட்ட பைப்லைன்களை அமைத்தல்

காம்போ அமைவில்:

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

நீங்கள் என்ஜின்களைத் தவிர்க்கலாம், தனிப்பயன் என்ஜின்களைச் சேர்க்கலாம் அல்லது அவற்றின் வரிசையை மாற்றலாம்.

### நிலை கடத்தல்

என்ஜின்கள் கோரிக்கை சூழலிலுள்ள (`options`-இல்) மெட்டாடேட்டாவைப் படிக்கலாம்:

```ts
compress(body, config) {
  // முந்தைய என்ஜின்களிலிருந்து மெட்டாடேட்டாவைப் படிக்கவும்
  const original = options?.compressionComboId;  // "my-coding-combo"
  // ...
}
```

மெட்டாடேட்டா **படிக்க மட்டுமே இயலும்** — என்ஜின்கள் கோரிக்கை சூழலை மாற்ற முடியாது; அவற்றின் சொந்த body வெளியீட்டை மட்டுமே மாற்ற முடியும்.

### செயல்படுத்தும் வரிசையில் கவனிக்க வேண்டியவை

| என்ஜின் வரிசை                              | விளைவு                                                                                                               |
| ------------------------------------------ | -------------------------------------------------------------------------------------------------------------------- |
| RTK → Caveman → Lite                       | **பரிந்துரைக்கப்படுகிறது** (முதலில் இரைச்சல், பின்னர் மொழிசார் கூறுகள், இறுதியாக வெற்றிடங்கள் ஆகியவற்றை அகற்றுகிறது) |
| Lite → RTK → Caveman                       | மோசமானது — Lite மூல வெளியீட்டிலிருந்து வெற்றிடங்களை அகற்றுவதால், RTK வடிவப் பொருத்தம் தோல்வியடையும்                  |
| Caveman → RTK                              | மோசமானது — RTK அடையாளம் காணாத வகையில் Caveman உரையை மீண்டும் எழுதக்கூடும்                                            |
| முதலில் `tool_results` உள்ள எந்த வரிசையும் | சிறந்தது — கருவி வெளியீடுதான் அதிக இரைச்சலுள்ள உள்ளடக்கம்                                                            |

### எப்போது அடுக்கக் கூடாது

அடுக்குதல் எப்போதும் சிறந்ததல்ல:

- **எளிய செய்திகள்** (கருவி வெளியீடு இல்லாதவை) — Caveman அல்லது Lite மட்டும் போதுமானது
- **செலவில் கவனம் தேவைப்படும் சூழல்கள்** — ஒவ்வொரு என்ஜினும் ~5-50ms தாமதத்தைச் சேர்க்கிறது
- **குறிப்பிட்ட கருவிகள்** — ஷெல் வெளியீட்டிற்கு RTK மட்டும் பொதுவாகப் போதுமானது

### தனிப்பயன் பைப்லைனை உருவாக்குதல்

பெயரிடப்பட்ட pipeline registry எதுவும் இல்லை. stacked pipeline என்பது `applyStackedCompression()`-க்கு அனுப்பப்படும் **படிநிலைகளின் inline array** மட்டுமே (`@omniroute/open-sse/services/compression/strategySelector`-இலிருந்து export செய்யப்பட்டது):

```ts
import { applyStackedCompression } from "@omniroute/open-sse/services/compression/strategySelector";

const result = applyStackedCompression(body, [
  { engine: "rtk", intensity: "aggressive" },
  { engine: "caveman", intensity: "full" },
]);
```

நீங்கள் pipeline ஒன்றை வழங்காதபோது, இயல்புநிலையாக `rtk(standard) → caveman(full)` பயன்படுத்தப்படும்.

config மூலம் இதை இயக்க, `mode: "stacked"` என அமைத்து, படிநிலை array-ஐ `stackedPipeline`-இன் கீழ் வழங்கவும் (`config.stackedPipeline`-இலிருந்து வாசிக்கப்படும்):

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

## அப்ஸ்ட்ரீம் ஒத்திசைவுக் கொள்கை

OmniRoute-இன் சுருக்க இயந்திரங்கள் README-இல் பல அப்ஸ்ட்ரீம் திட்டங்களுக்கு அங்கீகாரம் வழங்குகின்றன
("RTK, Caveman, LLMLingua-2, Troglodita ஆகியவற்றால் ஈர்க்கப்பட்டது"). பங்களிப்பாளர்கள் பொதுவாகக்
கேட்கும் கேள்வி: **அப்ஸ்ட்ரீம் RTK ஒரு புதிய கருவி வடிகட்டியைச் சேர்க்கும்போது அல்லது Caveman ஒரு விதித்
தொகுப்பைச் சேர்க்கும்போது, அது OmniRoute-ஐ எவ்வாறு வந்தடைகிறது?** இந்தப் பிரிவே இதற்கான அதிகாரப்பூர்வமான பதில்.

### உள்ளடக்கப்பட்ட நகல்கள் மற்றும் சுயாதீனச் செயலாக்கங்கள்

| இயந்திரம்                    | அப்ஸ்ட்ரீமுடனான உறவு                                                                                                                                                | இருப்பிடம்                                                          |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| **RTK**                      | **சுயாதீன மறுசெயலாக்கம்** (இதனால் ஈர்க்கப்பட்டது, நகல் அல்ல)                                                                                                        | `open-sse/services/compression/engines/rtk/`                        |
| **Caveman**                  | **சுயாதீன மறுசெயலாக்கம்** (இதனால் ஈர்க்கப்பட்டது)                                                                                                                   | `open-sse/services/compression/engines/cavemanAdapter.ts`           |
| **Headroom**                 | பெரும்பாலும் அகச் செயலாக்கம்; `gcf/` கோடெக் மட்டுமே `gcf-typescript`-இலிருந்து **உண்மையாக உள்ளடக்கப்பட்டது** (MIT, SPDX குறியிடப்பட்டது, பொதுவான சுயவிவரம் மட்டும்) | `open-sse/services/compression/engines/headroom/gcf/`               |
| **LLMLingua-2 / Troglodita** | இவற்றால் ஈர்க்கப்பட்டது (`llmlingua` + `session-dedup` இயந்திரங்களை இயக்குகின்றன)                                                                                   | `open-sse/services/compression/engines/llmlingua/`, `session-dedup` |

முக்கியக் கருத்து: **RTK மற்றும் Caveman ஆகியவை _கருத்துகளின்_ (வடிகட்டி விதிகள், விதித் தொகுப்புகள்)
க்ளீன்-ரூம் TypeScript செயலாக்கங்களே தவிர, உள்ளடக்கப்பட்ட மூலக் குறியீட்டு மரங்கள் அல்ல.** `git pull`
செய்வதற்கு எந்த அப்ஸ்ட்ரீம் நகலும் இல்லை — இதனால்தான் README-இல் "bundled" என்பதற்குப் பதிலாக
"inspired by" என்று குறிப்பிடப்பட்டுள்ளது.

### அப்ஸ்ட்ரீம் மேம்பாடுகள் எவ்வாறு ஒன்றிணைக்கப்படுகின்றன

வடிவமைப்பின்படியே, **தானியங்கு அப்ஸ்ட்ரீம் வெளியீட்டுக் கண்காணிப்பும் `compression-sync`
லேபிளும் இல்லை**. இயந்திரங்கள் மறுசெயலாக்கங்கள் என்பதால், அப்ஸ்ட்ரீம் RTK வடிகட்டி அல்லது Caveman
விதித் தொகுப்பு குறியீடாக ஒன்றிணைக்கப்படுவதில்லை; மாறாக, அது **OmniRoute-இன் சொந்த வடிவத்தில் ஒரு புதிய
விதியாக/வடிகட்டியாக மறுவெளிப்படுத்தப்படுகிறது** (
[COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md)-ஐப் பார்க்கவும்) மற்றும்
வழக்கமான PR வழியாகத் தேவைக்கேற்ப சேர்க்கப்படுகிறது. மேலே உள்ள விரிவாக்கப் புள்ளிகளே (தனிப்பயன் இயந்திரம், மொழித் தொகுப்பு, RTK வடிகட்டி)
ஒன்றைப் பங்களிப்பதற்கான அங்கீகரிக்கப்பட்ட வழிகள்.

இந்தச் செயல்முறையைத் துல்லியமாகப் பின்பற்றிய சமீபத்திய எடுத்துக்காட்டுகள்:

- Gradle மற்றும் `dotnet` உருவாக்க வெளியீட்டிற்கான RTK வடிகட்டிகள் (v3.8.42)
- kubectl / docker-build / composer / gh-க்கான RTK வடிகட்டிகள் (#2824)
- Caveman இந்தோனேசிய மொழித் தொகுப்பு (#3975), மேலும் ஜெர்மன் / பிரெஞ்சு / ஜப்பானிய / சீனத் தொகுப்புகள்

### Headroom (உள்ளீட்டுச் சுருக்கப் பதிலி)

Headroom **முழுமையாக அகச் செயலாக்கப்பட்டது** — நிலையான பதிப்பாக உள்ளடக்கப்பட்ட `gcf` கோடெக் நிலைப்பதிவுடன்,
OmniRoute-இன் சொந்த `smartcrusher` / `toon` / `tabular` அடுக்குகள். உள்ளடக்கப்பட்ட நகலைத் தவிர,
கண்காணிக்க வேண்டிய செயலில் உள்ள அப்ஸ்ட்ரீம் எதுவும் இல்லை; கோடெக் மாறும்போது `gcf` புதுப்பிப்புகள்
கைமுறையாகப் புதுப்பிக்கப்பட்டு, சுருக்க வரவுசெலவுக் கட்டுப்பாட்டிற்கு (`check:compression-budget`) எதிராக
மீண்டும் சரிபார்க்கப்படுகின்றன.

### அப்ஸ்ட்ரீமால் ஈர்க்கப்பட்ட மேம்பாட்டை முன்மொழிதல்

1. **உள்ளடக்க வேண்டாம்** — அப்ஸ்ட்ரீம் விதி/வடிகட்டியை OmniRoute-இன் வடிவத்தில் மறுவெளிப்படுத்தவும்.
2. கீழே உள்ள பொருத்தமான விரிவாக்கப் புள்ளி வழியாக அதைச் சேர்க்கவும் (மொழித் தொகுப்பு, RTK வடிகட்டி அல்லது
   தனிப்பயன் இயந்திரம்).
3. உரிமம் கொண்ட அதன் மூலக் குறியீட்டை நகலெடுப்பதற்குப் பதிலாக, PR விளக்கத்தில் அப்ஸ்ட்ரீம் திட்டத்தைக் குறிப்பிடவும் (அங்கீகாரம்).
4. சோதனைகளைச் சேர்த்து, `check:compression-budget` கட்டுப்பாடு இன்னும் வெற்றிபெறுவதை உறுதிப்படுத்தவும்.

---

## வெளியீட்டு பாணியைச் சேர்த்தல்

வெளியீட்டு பாணிகள் ([வழிகாட்டியின் பட்டியல் அட்டவணையைப்](./COMPRESSION_GUIDE.md#output-styles-catalog) பார்க்கவும்)
உள்ளீட்டு என்ஜின்களின் பதில்-பக்க இணையாகும்: நீங்கள் அனுப்புவதைச் சுருக்குவதற்குப் பதிலாக,
குறைந்த செலவிலான வெளியீட்டை உருவாக்குமாறு அவை மாதிரிக்கு அறிவுறுத்துகின்றன. பதிவகம்
`open-sse/services/compression/outputStyles/catalog.ts`-இல் உள்ள `OUTPUT_STYLE_CATALOG` ஆகும், மேலும்
**ஒரு பட்டியல் உள்ளீடே முழு அம்சமாகும்**: உட்செலுத்தி, டாஷ்போர்டு அமைப்புகள் பலகம்,
நிலைத்த சேமிப்பு மற்றும் தொலைஅளவியல் அனைத்தும் இந்தப் பட்டியலைக் கணக்கிடுகின்றன — புதுப்பிக்க வேறு பட்டியல் எதுவும் இல்லை.

1. **`OUTPUT_STYLE_CATALOG`-இல் ஒரு உள்ளீட்டைச் சேர்க்கவும்**, அதில் `id`, `label`, `description` மற்றும்
   மூன்று ஆங்கில `levels` (`lite`, `full`, `ultra`) இருக்க வேண்டும். குறியீடு, பாதைகள், கட்டளைகள், பிழைகள் மற்றும் URL-கள் மாற்றமின்றி இருக்க,
   ஒவ்வொரு நிலையும் `${SHARED_BOUNDARIES}` என்பதுடன் முடிவடைய வேண்டும்.
   `(id, level, language)` ஒவ்வொன்றுக்கும் அறிவுறுத்தல் உரை **நிலையானதாகவும் நிர்ணயிக்கப்பட்டதாகவும்** இருக்க வேண்டும் —
   `${SHARED_BOUNDARIES}` மட்டுமே அனுமதிக்கப்பட்ட இடைச்செருகல்.
2. **அதை மொழிபெயர்க்கவும்.** `i18n`-இன் கீழ் குறைந்தபட்சம் ஒரு `pt-BR` தொகுதியையாவது வழங்கவும்; `ponytail` மற்றும்
   `i-have-adhd` (en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi) ஆகியவை குறிப்பு வடிவமாகும். வேண்டுமென்றே
   ஒற்றை மொழிக்கான பாணி, அதற்குப் பதிலாக `locale`-ஐ அமைக்கும் (`terse-cjk` → `zh` போல); பின்னர்
   அது அந்த மொழியமைவின் கீழ் மட்டுமே வழங்கப்படும்.
3. **அணி காவலைப் புதுப்பிக்கவும்** — `tests/unit/compression/output-styles-i18n-matrix.test.ts`-இல் உள்ள
   `BASELINE_LANGUAGES`-க்கு பாணியின் மொழிகளைச் சேர்க்கவும். கண்காணிப்புச் சிக்கலுடன் கூடிய வெளிப்படையான
   `KNOWN_ENGLISH_ONLY` உள்ளீடு இல்லாவிட்டால், தேவையான மொழிபெயர்ப்புகள் இல்லாத எந்தப் புதிய
   மொழியமைவு-கட்டுப்பாடற்ற பாணியையும் இந்த நுழைவாயில் நிராகரிக்கும்.
4. **ஒவ்வொரு பாணிக்கும் ஒரு சோதனையைச் சேர்க்கவும்**; இதற்கு
   `tests/unit/compression/i-have-adhd-catalog.test.ts`-ஐ முன்மாதிரியாகப் பயன்படுத்தவும்: பட்டியல் வடிவம், ஒவ்வொரு நிலைக்குமான
   எல்லைகள் பிரிவு, மேலும் ஒவ்வொரு மொழிபெயர்ப்பும் ஆங்கிலத்திலிருந்து நகலெடுக்கப்படாமல் அதற்குரிய மொழியிலேயே எழுதப்பட்டுள்ளது என்பதை உறுதிப்படுத்தும்
   ஒரு அடிப்படைச் சரிபார்ப்பு.
5. **மூலக்குறிப்பு**: பாணி ஒரு மேல்நிலைத் திட்டத்திலிருந்து தழுவப்பட்டிருந்தால், உள்ளீட்டின் மூலக் கருத்துரையில்
   அதற்கு உரிய அங்கீகாரத்தை வழங்கவும் (எ.கா. `i-have-adhd` → ayghri/i-have-adhd, MIT) — மேலே உள்ள
   "மேல்நிலையால் தூண்டப்பட்ட மேம்பாட்டை முன்மொழிதல்" என்பதற்கான அதே விதி பொருந்தும்.

UI, திட்டவடிவம் அல்லது தொலைஅளவியலில் எந்த மாற்றமும் தேவையில்லை — அந்தப் பரப்புகள் பட்டியலிலிருந்தே காட்சியமைக்கப்படுகின்றன.

---

## சிறந்த நடைமுறைகள்

### என்ஜின் உருவாக்கம்

1. **எப்போதும் `validateConfig`-ஐச் செயல்படுத்தவும்** — சரிபார்ப்பு இல்லாத என்ஜின்கள் அமைதியான தோல்விகளை ஏற்படுத்துகின்றன
2. **நடைமுறைக்கு ஏற்ற `targetLatencyMs`-ஐ அமைக்கவும்** — என்ஜின்களைத் தேர்ந்தெடுக்க உத்தித் தேர்வி இதைப் பயன்படுத்துகிறது
3. **டாஷ்போர்டுக்கு `getConfigSchema`-ஐப் பயன்படுத்தவும்** — பயனர்களிடமிருந்து உள்ளமைவை ஒருபோதும் மறைக்க வேண்டாம்
4. **உங்கள் என்ஜின் தூய்மையானதாக இருந்தால் `stackable: true`-ஐ ஆதரிக்கவும்** — பக்க விளைவுகளைக் கொண்ட என்ஜின்கள் அடுக்கப்படக் கூடாது
5. **உள்ளமைந்த சோதனைகளை எழுதவும்** — என்ஜின்களை <1s நேரத்தில் சரிபார்க்கக்கூடியதாக இருக்க வேண்டும்

### மொழித் தொகுப்பு உருவாக்கம்

1. **`lite` தீவிரத்துடன் தொடங்கவும்** — உங்கள் விதிகள் மிகக் குறைந்த அமைப்பிலும் பாதுகாப்பானவையாக இருக்க வேண்டும்
2. **விதிகளின் வரம்பை நிர்ணயிக்க `context`-ஐப் பயன்படுத்தவும்** — `user`-க்கு மட்டும் உரிய விதிகள் தவறுதலாகக் கணினி தூண்டுதல்களைப் பாதிக்க முடியாது
3. **JSON விசைகளைப் பிடிப்பதைத் தவிர்க்கவும்** — `\\bword\\b` என்பது JSON-க்குள் பொருந்தி, கட்டமைக்கப்பட்ட தரவைச் சிதைக்கக்கூடும்
4. **விளிம்பு நிலைகளுடன் சோதிக்கவும்** — காலியான உள்ளீடு, unicode, RTL உரை, emojis
5. **ஏற்கனவே உள்ள தொகுப்புகளை வார்ப்புருக்களாகப் பயன்படுத்தவும்** — `en/filler.json` மிகவும் மேம்படுத்தப்பட்ட எடுத்துக்காட்டாகும்

### செயலாக்கத் தொடர் வடிவமைப்பு

1. **மேம்படுத்துவதற்கு முன் செயல்திறனை அளவிடவும்** — முதலில் `compression_stats` மூலம் அளவிடவும்
2. **மறுசெயலாக்கத்தைவிடக் கலவையமைப்பை விரும்பவும்** — புதிய என்ஜினை எழுதுவதற்கு முன் Caveman விதிகளை விரிவாக்கவும்
3. **வரிசைக்கான காரணத்தை ஆவணப்படுத்தவும்** — என்ஜின் A ஏன் என்ஜின் B-க்கு முன் வருகிறது என்பதைக் கருத்துரையாக எழுதவும்
4. **அனைத்து 3 தீவிர நிலைகளிலும் சோதிக்கவும்** — `lite` வேகமானது ஆனால் இழப்புடையது, `ultra` மெதுவானது ஆனால் துல்லியமானது

---

## குறிப்பு: உள்ளமைந்த எஞ்சின்கள்

| எஞ்சின் ID           | அடுக்கக்கூடியது | இயல்புநிலை stackPriority | இலக்குகள்                           |
| -------------------- | --------------- | ------------------------ | ----------------------------------- |
| `lite`               | ஆம்             | 5                        | messages, tool_results              |
| `rtk`                | ஆம்             | 10                       | tool_results                        |
| `standard` (caveman) | ஆம்             | 20                       | messages, tool_results, code_blocks |
| `aggressive`         | ஆம்             | 30                       | messages                            |
| `ultra`              | ஆம்             | 40                       | messages, code_blocks               |

### மேலும் காண்க

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — பைப்லைன் மேலோட்டம்
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — எஞ்சின் பதிவகக் குறிப்பு
- [COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md) — விதி வடிவமைப்பு விவரக்குறிப்பு
- [COMPRESSION_LANGUAGE_PACKS.md](./COMPRESSION_LANGUAGE_PACKS.md) — மொழித் தொகுப்பு விவரங்கள்
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — RTK எஞ்சின் மற்றும் தனிப்பயன் வடிப்பான்கள்
- மூலம்: `open-sse/services/compression/` (117 கோப்புகள், ~250KB)
