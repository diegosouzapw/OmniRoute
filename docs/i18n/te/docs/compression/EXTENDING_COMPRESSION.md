# Extending the Compression Pipeline (తెలుగు)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/EXTENDING_COMPRESSION.md) · 🇪🇹 [am](../../../am/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇦 [ar](../../../ar/docs/compression/EXTENDING_COMPRESSION.md) · 🇦🇿 [az](../../../az/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇬 [bg](../../../bg/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇩 [bn](../../../bn/docs/compression/EXTENDING_COMPRESSION.md) · 🇨🇿 [cs](../../../cs/docs/compression/EXTENDING_COMPRESSION.md) · 🇩🇰 [da](../../../da/docs/compression/EXTENDING_COMPRESSION.md) · 🇩🇪 [de](../../../de/docs/compression/EXTENDING_COMPRESSION.md) · 🇬🇷 [el](../../../el/docs/compression/EXTENDING_COMPRESSION.md) · 🇪🇸 [es](../../../es/docs/compression/EXTENDING_COMPRESSION.md) · 🇪🇪 [et](../../../et/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇷 [fa](../../../fa/docs/compression/EXTENDING_COMPRESSION.md) · 🇫🇮 [fi](../../../fi/docs/compression/EXTENDING_COMPRESSION.md) · 🇫🇷 [fr](../../../fr/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇪 [ga](../../../ga/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [gu](../../../gu/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [ha](../../../ha/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇱 [he](../../../he/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [hi](../../../hi/docs/compression/EXTENDING_COMPRESSION.md) · 🇭🇷 [hr](../../../hr/docs/compression/EXTENDING_COMPRESSION.md) · 🇭🇺 [hu](../../../hu/docs/compression/EXTENDING_COMPRESSION.md) · 🇦🇲 [hy](../../../hy/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇩 [id](../../../id/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [ig](../../../ig/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇹 [it](../../../it/docs/compression/EXTENDING_COMPRESSION.md) · 🇯🇵 [ja](../../../ja/docs/compression/EXTENDING_COMPRESSION.md) · 🇬🇪 [ka](../../../ka/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇭 [km](../../../km/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [kn](../../../kn/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇷 [ko](../../../ko/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇹 [lt](../../../lt/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇻 [lv](../../../lv/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [ml](../../../ml/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [mr](../../../mr/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇾 [ms](../../../ms/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇹 [mt](../../../mt/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇲 [my](../../../my/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇵 [ne](../../../ne/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇱 [nl](../../../nl/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇴 [no](../../../no/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [or](../../../or/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [pa](../../../pa/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇭 [phi](../../../phi/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇱 [pl](../../../pl/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇹 [pt](../../../pt/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇴 [ro](../../../ro/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇺 [ru](../../../ru/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇰 [si](../../../si/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇰 [sk](../../../sk/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇮 [sl](../../../sl/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇸 [sr](../../../sr/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇪 [sv](../../../sv/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇪 [sw](../../../sw/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [ta](../../../ta/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇭 [th](../../../th/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇷 [tr](../../../tr/docs/compression/EXTENDING_COMPRESSION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇰 [ur](../../../ur/docs/compression/EXTENDING_COMPRESSION.md) · 🇺🇿 [uz](../../../uz/docs/compression/EXTENDING_COMPRESSION.md) · 🇻🇳 [vi](../../../vi/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [yo](../../../yo/docs/compression/EXTENDING_COMPRESSION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/EXTENDING_COMPRESSION.md)

---

> **TL;DR**: OmniRoute కంప్రెషన్ ఇంజిన్ **ప్లగ్ చేయదగినది** — మీరు కస్టమ్ ఇంజిన్లను నమోదు చేయవచ్చు, కొత్త భాషల కోసం లాంగ్వేజ్ ప్యాక్లను అందించవచ్చు మరియు స్టాక్డ్ పైప్లైన్లను రూపొందించవచ్చు. ఎలా చేయాలో ఈ గైడ్ చూపిస్తుంది.

**సంబంధిత గైడ్లు:**

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — పూర్తి పైప్లైన్ అవలోకనం
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — ఇంజిన్ రిజిస్ట్రీ మరియు అంతర్నిర్మిత ఇంజిన్లు
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — RTK ఇంజిన్ మరియు కస్టమ్ ఫిల్టర్లు
- [COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md) — రూల్ ప్యాక్ ఫార్మాట్ సూచన

---

## అవలోకనం

కంప్రెషన్ సిస్టమ్లో **3 ఎక్స్టెన్షన్ పాయింట్లు** ఉన్నాయి:

| ఎక్స్టెన్షన్ పాయింట్  | వినియోగ సందర్భం                                                                    | క్లిష్టత       |
| --------------------- | ---------------------------------------------------------------------------------- | -------------- |
| **కస్టమ్ ఇంజిన్**     | పూర్తిగా కొత్త కంప్రెషన్ అల్గారిథమ్ను జోడించడం (ఉదా., డొమైన్-నిర్దిష్ట సంగ్రహకర్త) | అధునాతనం       |
| **లాంగ్వేజ్ ప్యాక్**  | కొత్త సహజ భాషకు మద్దతును జోడించడం (ఉదా., హిందీ, అరబిక్)                            | మధ్యస్థం       |
| **స్టాక్డ్ పైప్లైన్** | ఇప్పటికే ఉన్న ఇంజిన్లను కస్టమ్ క్రమంలో కలపడం                                       | ప్రారంభ స్థాయి |

```
┌─────────────────────────────────────────────────────────────┐
│                    కంప్రెషన్ వ్యూహం                          │
│                                                              │
│   ఇన్పుట్ సందేశాలు ──▶ getEffectiveMode() ──▶ మోడ్         │
│                                              │               │
│                      ┌───────────────────────┼──────────┐    │
│                      │         │         │         │    │    │
│                      ▼         ▼         ▼         ▼    │    │
│                   "rtk"    "lite"   "standard" "stacked"    │
│                      │         │         │         │    │    │
│                      ▼         ▼         ▼         ▼    │    │
│                   RTK       Lite     Caveman   engines[]   │
│                   ఇంజిన్    ఇంజిన్   ఇంజిన్    చైన్ చేయబడినవి │
│                      │         │         │         │    │    │
│                      └─────────┴─────────┴─────────┘    │    │
│                                      │                    │
│                                      ▼                    │
│                             కంప్రెస్ చేసిన అవుట్పుట్       │
└─────────────────────────────────────────────────────────────┘

వ్యూహ ఎంపిక మోడ్-ఆధారితమైనది: ప్రతి అభ్యర్థన ఒక మోడ్ను ఎంచుకుంటుంది
(rtk / lite / standard / aggressive / ultra / stacked / off).
"stacked" మోడ్ మాత్రమే బహుళ ఇంజిన్లను వరుసగా చైన్ చేస్తుంది.
డిఫాల్ట్ ఆటో-ట్రిగ్గర్ మోడ్ "lite" (3-స్థాయిల ప్రాధాన్యత చైన్ కాదు).
```

---

## కస్టమ్ కంప్రెషన్ ఇంజిన్ను రాయడం

ఇంజిన్ ఇంటర్ఫేస్ (`open-sse/services/compression/engines/types.ts`) అనేది ప్రతి ఇంజిన్ తప్పనిసరిగా పాటించాల్సిన ఒప్పందం. ఇందులో 5 తప్పనిసరి మెథడ్లు ఉన్నాయి.

### `CompressionEngine` ఇంటర్ఫేస్

```ts
interface CompressionEngine {
  id: string; // ప్రత్యేక ఇంజిన్ ID
  name: string; // ప్రదర్శన పేరు
  description: string; // సంక్షిప్త వివరణ
  icon: string; // ఐకాన్ (ఎమోజీ లేదా URL)
  targets: CompressionEngineTarget[]; // ["messages", "tool_results", "code_blocks"]
  stackable: boolean; // స్టాక్డ్ పైప్లైన్లో ఉపయోగించవచ్చా
  stackPriority: number; // స్టాక్డ్ పైప్లైన్లలో క్రమం (తక్కువ = ముందుగా)
  metadata: CompressionEngineMetadata;

  apply(body, options?): CompressionResult;
  compress(body, config?): CompressionResult;
  getConfigSchema(): EngineConfigField[];
  validateConfig(config): EngineValidationResult;
}
```

### కనిష్ఠ ఉదాహరణ: వైట్స్పేస్ ఇంజిన్

సాధ్యమైనంత సరళమైన ఇంజిన్ — సందేశాల నుండి అదనపు వైట్స్పేస్ను తొలగిస్తుంది.

````ts
import type { CompressionEngine } from "omniroute/compression/engines/types";
import { registerCompressionEngine } from "omniroute/compression/engines/registry";

function preserveCodeBlocks(text: string): string {
  // కోడ్ బ్లాక్ మార్కర్ల ఆధారంగా విభజించి, వాటి లోపల ఉన్న ఖాళీలను యథాతథంగా ఉంచండి
  const parts = text.split(/(```[\s\S]*?```)/);
  return parts
    .map((part) => {
      if (part.startsWith("```")) {
        return part; // కోడ్ బ్లాక్లను మార్చవద్దు
      }
      return part.replace(/\n{3,}/g, "\n\n"); // గద్యానికి మాత్రమే వర్తింపజేయండి
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
  stackPriority: 100, // caveman/rtk తర్వాత అమలు చేయండి

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

    // సందేశాల అర్రేలో ప్రయాణించండి — స్ట్రింగ్ మరియు మల్టీపార్ట్ కంటెంట్ రెండింటినీ నిర్వహించండి
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
      // మల్టీపార్ట్ కంటెంట్: భాగాలలో ప్రయాణించి, టెక్స్ట్ భాగాలను మాత్రమే కుదించండి
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
          return part; // image_url, tool_use మొదలైనవాటిని యథాతథంగా ఉంచండి.
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

// ప్రపంచవ్యాప్తంగా నమోదు చేయండి
registerCompressionEngine(whitespaceEngine);
````

### అనుకూల ఇంజిన్లను ఎక్కడ ఉంచాలి

```
~/.omniroute/compression/engines/my-engine.ts    # వినియోగదారు-స్థాయి
<project>/compression-engines/my-engine.ts        # ప్రాజెక్ట్-స్థాయి (ప్రారంభ సమయంలో లోడ్ చేయబడుతుంది)
```

లేదా ప్లగిన్ నుండి ప్రోగ్రామాటిక్గా లోడ్ చేయండి:

```ts
// మీ ప్లగిన్లో
import {
  registerCompressionEngine,
  unregisterCompressionEngine,
} from "@omniroute/open-sse/services/compression/engines/registry";
import { myEngine } from "./engines/my-engine";

export default definePlugin({
  name: "my-compression-plugin",
  // ప్లగిన్ SDK, onRequest / onResponse / onError హుక్లను అందిస్తుంది. ప్లగిన్
  // మాడ్యూల్ లోడ్ అయినప్పుడు (లేదా మొదటి onRequest సమయంలో) ఇంజిన్ను నమోదు చేయండి; మీ స్వంత
  // టియర్డౌన్ మార్గం నుండి దాని నమోదును తీసివేయండి.
  onRequest: async (ctx) => {
    registerCompressionEngine(myEngine);
  },
});

// టియర్డౌన్ సమయంలో:
// unregisterCompressionEngine("my-engine");
```

### మీ ఇంజిన్ను పరీక్షించడం

మీ ఇంజిన్ను ఒక ప్లగిన్ లేదా స్టార్టప్ ఫంక్షన్లో నమోదు చేయండి. నమోదు చేసిన తర్వాత, ఇంజిన్ దాని `id` ద్వారా వ్యూహ ఎంపిక సాధనంలో అందుబాటులో ఉంటుంది. స్టాక్ చేసిన పైప్లైన్లో దాన్ని కలపడం ద్వారా ఇంటిగ్రేషన్ను పరీక్షించండి:

---

## భాషా ప్యాక్లను సృష్టించడం

కేవ్మ్యాన్-శైలి కంప్రెషన్, ప్రతి సహజ భాషలోని పూరక పదాలు, సందిగ్ధతను సూచించే పదబంధాలు, మరియు అనవసరంగా సుదీర్ఘమైన నమూనాలను నిర్వహించడానికి **భాష-నిర్దిష్ట నియమ ప్యాక్లను** ఉపయోగిస్తుంది. OmniRouteలో **6 భాషా ప్యాక్లు** అందుబాటులో ఉన్నాయి: `en`, `es`, `fr`, `de`, `ja`, `pt-BR`.

### ప్యాక్ నిర్మాణం

భాషా ప్యాక్ అనేది `open-sse/services/compression/rules/<language>/` కింద ఉండే **JSON ఫైళ్ల** డైరెక్టరీ:

```
open-sse/services/compression/rules/
├── en/
│   ├── filler.json          # మర్యాదపూర్వక పదాలు, సందిగ్ధత, వినయం
│   ├── context.json         # సందర్భాన్ని తగ్గించే నియమాలు
│   ├── dedup.json           # నకలు తొలగింపు నియమాలు
│   ├── structural.json      # విరామచిహ్నాలు, ఫార్మాటింగ్
│   └── ultra.json           # దూకుడైన కంప్రెషన్ నియమాలు
├── es/  (అదే నిర్మాణం)
├── fr/  (అదే నిర్మాణం)
├── de/  (అదే నిర్మాణం)
├── ja/  (అదే నిర్మాణం)
└── pt-BR/ (అదే నిర్మాణం)
```

### నియమం యొక్క నిర్మాణం

ప్రతి నియమం ఈ ఆకృతిని కలిగి ఉంటుంది (`open-sse/services/compression/ruleLoader.ts` నుండి):

```ts
interface FileRule {
  name: string; // మానవులు చదవగల పేరు (kebab-case)
  pattern: string; // JavaScript రెగ్యులర్ ఎక్స్ప్రెషన్ నమూనా
  replacement?: string; // సరిపోలిన భాగాన్ని దేనితో భర్తీ చేయాలి
  replacementMap?: Record<string, string>; // లేదా key→replacement మ్యాప్
  flags?: string; // రెగ్యులర్ ఎక్స్ప్రెషన్ ఫ్లాగ్లు (సాధారణంగా "gi")
  context?: "all" | "user" | "system" | "assistant";
  category?: "filler" | "context" | "structural" | "dedup" | "terse" | "ultra";
  minIntensity?: "lite" | "full" | "ultra"; // ఈ తీవ్రత కంటే తక్కువగా ఉంటే దాటవేయండి
  description?: string; // డాక్యుమెంటేషన్
}
```

### ఉదాహరణ: హిందీ పూరక నియమాలను జోడించడం

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

### ధృవీకరణ

నియమ ప్యాక్లు లోడ్ అయ్యేటప్పుడు `_schema.json`కు వ్యతిరేకంగా ధృవీకరించబడతాయి. తప్పు నిర్మాణం ఉన్న ప్యాక్ లోడ్ కావడంలో విఫలమై, ఒక లోపాన్ని లాగ్ చేస్తుంది:

```
RULE_LOADER: pack "hi/filler.json" failed validation:
  - rules.0.pattern: Invalid regex
  - rules.1.context: must be one of [all, user, system, assistant]
```

ప్యాక్ లోడ్ అయినప్పుడు (`_schema.json`కు వ్యతిరేకంగా) ధృవీకరణ స్వయంచాలకంగా అమలవుతుంది; చెల్లని
ప్యాక్ తిరస్కరించబడుతుంది మరియు పైన ఉన్న లోపం లాగ్ చేయబడుతుంది. ప్యాక్ ధృవీకరణ కోసం ప్రత్యేక
`npm run` స్క్రిప్ట్ లేదు — ప్యాక్ను లోడ్ చేసి (ఉదా. సర్వర్ను ప్రారంభించడం లేదా
కంప్రెషన్ మార్గాన్ని అమలు చేయడం ద్వారా) లాగ్లను గమనించండి.

### అనుకూల భాషా ప్యాక్ను లోడ్ చేయడం

```ts
import { loadRulePack } from "omniroute/compression/ruleLoader";

await loadRulePack("./my-custom-rules/hi/filler.json");
```

లేదా గుర్తించబడిన స్థానంలో ఉంచండి:

```
~/.omniroute/compression/rules/hi/filler.json  # వినియోగదారు స్థాయి
<project>/.compression/rules/hi/filler.json   # ప్రాజెక్ట్ స్థాయి
```

### భాషా ప్యాక్లకు ఉత్తమ పద్ధతులు

1. **`filler`తో ప్రారంభించండి** — ఇవి అత్యధిక ప్రభావాన్ని చూపే నియమాలు
2. **దూకుడైన నియమాలను నియంత్రించడానికి `minIntensity`ని ఉపయోగించండి** — ఇది అతిగా కంప్రెస్ చేయకుండా రక్షిస్తుంది
3. **పరీక్ష సందర్భాలను చేర్చండి** — ప్రవర్తనను ధృవీకరించడానికి JSONలో `tests[]` శ్రేణిని జోడించండి
4. **క్రమం ముఖ్యం** — ముందున్న నియమాలు మొదట వర్తిస్తాయి; అధిక ప్రభావం చూపే నియమాలను ముందుగా ఉంచండి
5. **`replacement` విషయంలో జాగ్రత్తగా ఉండండి** — సాధారణంగా ఖాళీ స్ట్రింగ్ సరైనది; కొత్త కంటెంట్ను ఎన్నడూ ప్రవేశపెట్టవద్దు

### అనువాద వ్యూహం

నియమ ప్యాక్లను కొత్త భాషకు స్థానికీకరించేటప్పుడు:

1. **నియమాల పేర్లను అనువదించండి** — అవి డీబగ్ అవుట్పుట్లో కనిపిస్తాయి
2. **రెగ్యులర్ ఎక్స్ప్రెషన్ నమూనాలను అనుకూలీకరించండి** — నేరుగా అనువదించడం తరచుగా విఫలమవుతుంది (పద సరిహద్దులు భిన్నంగా ఉంటాయి)
3. **వాస్తవ సంభాషణలపై పరీక్షించండి** — నిజమైన ఇన్పుట్పై ప్యాక్ సురక్షితంగా ఉండాలి
4. **సాంస్కృతిక సంప్రదాయాలకు సరిపోల్చండి** — ఉదాహరణకు, జపనీస్ ప్యాక్లలో ఇంగ్లీష్ కంటే ఎక్కువ గౌరవసూచక పూరక పదాలు ఉంటాయి

---

## స్టాక్డ్ పైప్లైన్లు

ఒక **స్టాక్డ్ పైప్లైన్** అనేక ఇంజిన్లను వరుసగా అమలు చేస్తుంది, ప్రతి ఇంజిన్ అవుట్పుట్ తదుపరి ఇంజిన్కు ఇన్పుట్గా అందుతుంది. అంతర్గతంగా `mode: stacked` ఈ విధంగానే పనిచేస్తుంది.

### స్టాకింగ్ ఎలా పనిచేస్తుంది

```
ఇన్పుట్ (10,000 టోకెన్లు)
        │
        ▼
   ┌──────────┐
   │  ఇంజిన్  │  ప్రాధాన్యత 10
   │  A       │  ──▶ అవుట్పుట్: 6,000 టోకెన్లు (-40%)
   └────┬─────┘
        ▼
   ┌──────────┐
   │  ఇంజిన్  │  ప్రాధాన్యత 50
   │  B       │  ──▶ అవుట్పుట్: 2,400 టోకెన్లు (-60%)
   └────┬─────┘
        ▼
   ┌──────────┐
   │  ఇంజిన్  │  ప్రాధాన్యత 100
   │  C       │  ──▶ అవుట్పుట్: 1,200 టోకెన్లు (-80%)
   └────┬─────┘
        │
        ▼
తుది అవుట్పుట్ (1,200 టోకెన్లు, కలిపి ~88% ఆదా)
```

`mode: "stacked"` ఎంచుకున్నప్పుడు, `pipeline` శ్రేణిలో పేర్కొన్న క్రమంలో ఇంజిన్లు వరుసగా అమలవుతాయి.
ఇంజిన్ N అవుట్పుట్ ఇంజిన్ N+1కు ఇన్పుట్గా మారుతుంది.

### కంప్రెషన్ మోడ్లు

కాన్ఫిగరేషన్, ఆటో-ట్రిగ్గర్ థ్రెషోల్డ్లు మరియు కాంబో ఓవర్రైడ్ల ఆధారంగా OmniRoute **ప్రతి అభ్యర్థనకు ఒకే మోడ్ను** ఎంచుకుంటుంది.
అందుబాటులో ఉన్న మోడ్లు `open-sse/services/compression/types.ts`లో నిర్వచించబడ్డాయి (`CompressionMode` రకం):

| మోడ్         | ఇంజిన్లు             | వినియోగ సందర్భం                                                                                                                                                                                                                     |
| ------------ | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `off`        | ఏదీ లేదు             | మొత్తం కంప్రెషన్ను నిలిపివేయండి                                                                                                                                                                                                     |
| `rtk`        | RTK మాత్రమే          | కమాండ్ అవుట్పుట్ అధికంగా ఉండే సెషన్లు (80%+ ఆదా)                                                                                                                                                                                    |
| `lite`       | Lite మాత్రమే         | పరిమిత కంప్రెషన్ (వేగవంతమైనది, సురక్షితమైనది)                                                                                                                                                                                       |
| `standard`   | Caveman              | భాషా ప్యాక్లతో గద్య కంప్రెషన్                                                                                                                                                                                                       |
| `aggressive` | Caveman + Aggressive | దూకుడైన గద్య కంప్రెషన్ + దూకుడైన తుది పాస్                                                                                                                                                                                          |
| `ultra`      | Ultra                | గరిష్ఠ కంప్రెషన్ (నష్టపూరితమైనది, చివరి ప్రత్యామ్నాయం). `ultra.modelPath` సెట్ చేసినప్పుడు, ఐచ్ఛికంగా **LLMLingua-2** SLM ఇంజిన్ ద్వారా రూట్ చేయబడుతుంది (మోడల్ అందుబాటులో లేనప్పుడు నియమ-ఆధారిత మార్గానికి ఫెయిల్-ఓపెన్ అవుతుంది). |
| `stacked`    | అనుకూల పైప్లైన్      | ఇంజిన్లను ఏ క్రమంలోనైనా సమ్మిళితం చేయండి (క్రింద చూడండి)                                                                                                                                                                            |

> పైన పేర్కొన్న మోడ్ ఇంజిన్లకు అదనంగా, రిజిస్ట్రీ ప్రత్యేకమైన స్టాక్ చేయదగిన ఇంజిన్లను కూడా అందిస్తుంది —
> **CCR**, **headroom**, **ionizer**, మరియు **session-dedup** — ఇవి
> [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md#additional-built-in-engines)లో డాక్యుమెంట్ చేయబడ్డాయి.

మోడ్ ఎంపిక `open-sse/services/compression/strategySelector.ts`లోని `getEffectiveMode()` ద్వారా నిర్ణయించబడుతుంది:

1. కంప్రెషన్ నిలిపివేయబడితే: `"off"`
2. కాంబో ఓవర్రైడ్ ఉంటే: ఆ ఓవర్రైడ్ను ఉపయోగించండి
3. ఆటో-ట్రిగ్గర్ థ్రెషోల్డ్ దాటితే: `autoTriggerMode`ను ఉపయోగించండి (డిఫాల్ట్: `"lite"`)
4. లేకపోతే: `defaultMode`ను ఉపయోగించండి

### డిఫాల్ట్ స్టాక్డ్ పైప్లైన్

`mode: "stacked"`ను స్పష్టంగా కాన్ఫిగర్ చేసినప్పుడు, డిఫాల్ట్ పైప్లైన్ వీటిని సమ్మిళితం చేస్తుంది:

1. **RTK** — కమాండ్ అవుట్పుట్లోని అనవసర సమాచారాన్ని తొలగిస్తుంది (టెర్మినల్ అవుట్పుట్పై ~80% ఆదా)
2. **Caveman** — పూరక పదాలను తొలగించి, గద్యాన్ని సంక్షిప్తం చేస్తుంది (మిగిలిన టెక్స్ట్పై ~46%)
3. **Lite** — తుది వైట్స్పేస్ + డీడూప్ పాస్

ఈ సమ్మేళనం టూల్స్ అధికంగా ఉపయోగించే సెషన్లపై **78-95% ఆదా** సాధిస్తుంది.

### స్టాక్డ్ పైప్లైన్లను కాన్ఫిగర్ చేయడం

కాంబో కాన్ఫిగ్లో:

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

మీరు ఇంజిన్లను వదిలివేయవచ్చు, అనుకూలమైన వాటిని జోడించవచ్చు లేదా వాటి క్రమాన్ని మార్చవచ్చు.

### స్థితిని బదిలీ చేయడం

ఇంజిన్లు అభ్యర్థన సందర్భం (`options`లో) నుండి మెటాడేటాను చదవగలవు:

```ts
compress(body, config) {
  // మునుపటి ఇంజిన్ల నుండి మెటాడేటాను చదవండి
  const original = options?.compressionComboId;  // "my-coding-combo"
  // ...
}
```

మెటాడేటా **రీడ్-ఓన్లీ** — ఇంజిన్లు అభ్యర్థన సందర్భాన్ని మార్చలేవు, వాటి స్వంత బాడీ అవుట్పుట్ను మాత్రమే మార్చగలవు.

### అమలు క్రమంలోని చిక్కులు

| ఇంజిన్ క్రమం                           | ప్రభావం                                                                                                 |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| RTK → Caveman → Lite                   | **సిఫార్సు చేయబడింది** (మొదట అనవసర సమాచారాన్ని, తర్వాత భాషను, చివరగా వైట్స్పేస్ను తొలగిస్తుంది)         |
| Lite → RTK → Caveman                   | సరికాదు — Lite ముడి అవుట్పుట్ నుండి వైట్స్పేస్ను తొలగిస్తుంది, దీనివల్ల RTK నమూనా సరిపోలిక విఫలమవుతుంది |
| Caveman → RTK                          | సరికాదు — RTK గుర్తించలేని విధంగా Caveman టెక్స్ట్ను తిరిగి రాయవచ్చు                                    |
| ముందుగా `tool_results` ఉండే ఏ క్రమమైనా | మెరుగైనది — టూల్ అవుట్పుట్లో అత్యధిక అనవసర కంటెంట్ ఉంటుంది                                              |

### ఎప్పుడు స్టాక్ చేయకూడదు

స్టాకింగ్ ఎల్లప్పుడూ మెరుగైనది కాదు:

- **సరళమైన సందేశాలు** (టూల్ అవుట్పుట్ లేనివి) — ఒక్క Caveman లేదా Lite సరిపోతుంది
- **ఖర్చుపై శ్రద్ధ ఉన్నప్పుడు** — ప్రతి ఇంజిన్ ~5-50ms లేటెన్సీని జోడిస్తుంది
- **నిర్దిష్ట టూల్స్** — షెల్ అవుట్పుట్కు సాధారణంగా RTK ఒక్కటే సరిపోతుంది

### అనుకూల పైప్లైన్ను రూపొందించడం

పేరుతో కూడిన pipeline registry ఏదీ లేదు. stacked pipeline అనేది `applyStackedCompression()`కు పంపబడే **steps యొక్క inline array** మాత్రమే (`@omniroute/open-sse/services/compression/strategySelector` నుండి export చేయబడింది):

```ts
import { applyStackedCompression } from "@omniroute/open-sse/services/compression/strategySelector";

const result = applyStackedCompression(body, [
  { engine: "rtk", intensity: "aggressive" },
  { engine: "caveman", intensity: "full" },
]);
```

మీరు pipelineను పంపనప్పుడు, అది డిఫాల్ట్గా `rtk(standard) → caveman(full)`ను ఉపయోగిస్తుంది.

దీన్ని config నుండి నియంత్రించడానికి, `mode: "stacked"`ను సెట్ చేసి, step arrayను `stackedPipeline` కింద అందించండి (`config.stackedPipeline` నుండి చదవబడుతుంది):

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

## అప్స్ట్రీమ్ సమకాలీకరణ విధానం

OmniRoute యొక్క కంప్రెషన్ ఇంజిన్లు READMEలో అనేక అప్స్ట్రీమ్ ప్రాజెక్ట్లకు క్రెడిట్ ఇస్తాయి
("RTK, Caveman, LLMLingua-2, Troglodita నుండి ప్రేరణ పొందినవి"). కంట్రిబ్యూటర్లు సాధారణంగా
అడిగే ప్రశ్న: **అప్స్ట్రీమ్ RTK కొత్త టూల్ ఫిల్టర్ను లేదా Caveman కొత్త రూల్
ప్యాక్ను జోడించినప్పుడు, అది OmniRouteకు ఎలా చేరుతుంది?** ఈ విభాగమే అధికారిక సమాధానం.

### వెండర్ చేసిన కాపీలు vs. స్వతంత్ర అమలులు

| ఇంజిన్                       | అప్స్ట్రీమ్తో సంబంధం                                                                                                                                   | స్థానం                                                              |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------- |
| **RTK**                      | **స్వతంత్ర పునఃఅమలు** (ప్రేరణ పొందింది, కాపీ కాదు)                                                                                                     | `open-sse/services/compression/engines/rtk/`                        |
| **Caveman**                  | **స్వతంత్ర పునఃఅమలు** (ప్రేరణ పొందింది)                                                                                                                | `open-sse/services/compression/engines/cavemanAdapter.ts`           |
| **Headroom**                 | ప్రధానంగా అంతర్గతమైనది; `gcf/` కోడెక్ మాత్రమే `gcf-typescript` నుండి **నిజంగా వెండర్ చేయబడింది** (MIT, SPDX-మార్క్ చేయబడింది, సాధారణ ప్రొఫైల్ మాత్రమే) | `open-sse/services/compression/engines/headroom/gcf/`               |
| **LLMLingua-2 / Troglodita** | ప్రేరణ పొందినవి (`llmlingua` + `session-dedup` ఇంజిన్లను నడిపిస్తాయి)                                                                                  | `open-sse/services/compression/engines/llmlingua/`, `session-dedup` |

ముఖ్యాంశం: **RTK మరియు Caveman అనేవి _ఆలోచనల_ (ఫిల్టర్ నియమాలు, రూల్ ప్యాక్లు)
క్లీన్-రూమ్ TypeScript అమలులు, వెండర్ చేసిన సోర్స్ ట్రీలు కావు.** `git pull`
చేయడానికి అప్స్ట్రీమ్ కాపీ ఏదీ లేదు — అందుకే READMEలో "bundled" అని కాకుండా
"inspired by" అని పేర్కొనబడింది.

### అప్స్ట్రీమ్ మెరుగుదలలు ఎలా విలీనం చేయబడతాయి

ఉద్దేశపూర్వకంగానే **స్వయంచాలక అప్స్ట్రీమ్-రిలీజ్ ట్రాకింగ్ లేదు మరియు
`compression-sync` లేబుల్ లేదు**. ఇంజిన్లు పునఃఅమలులు కాబట్టి, అప్స్ట్రీమ్ RTK
ఫిల్టర్ లేదా Caveman రూల్ ప్యాక్ కోడ్గా విలీనం చేయబడదు; అది **OmniRoute యొక్క
సొంత ఫార్మాట్లో కొత్త రూల్/ఫిల్టర్గా తిరిగి వ్యక్తీకరించబడుతుంది** (చూడండి
[COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md)) మరియు సాధారణ PR ద్వారా
అవసరానుసారంగా చేరుతుంది. పైన పేర్కొన్న ఎక్స్టెన్షన్ పాయింట్లు (కస్టమ్ ఇంజిన్, లాంగ్వేజ్ ప్యాక్, RTK ఫిల్టర్)
వాటిలో ఒకదాన్ని అందించడానికి ఆమోదించబడిన మార్గాలు.

సరిగ్గా ఈ ప్రక్రియకు ఇటీవలి ఉదాహరణలు:

- Gradle & `dotnet` బిల్డ్ అవుట్పుట్ కోసం RTK ఫిల్టర్లు (v3.8.42)
- kubectl / docker-build / composer / gh కోసం RTK ఫిల్టర్లు (#2824)
- Caveman ఇండోనేషియన్ లాంగ్వేజ్ ప్యాక్ (#3975), అలాగే జర్మన్ / ఫ్రెంచ్ / జపనీస్ / చైనీస్ ప్యాక్లు

### Headroom (ఇన్పుట్-కంప్రెషన్ ప్రాక్సీ)

Headroom **పూర్తిగా అంతర్గతమైనది** — పిన్ చేసిన, వెండర్ చేయబడిన `gcf` కోడెక్ స్నాప్షాట్తో పాటు
OmniRoute యొక్క సొంత `smartcrusher` / `toon` / `tabular` లేయర్లు. వెండర్ చేసిన కాపీకి మించి
ట్రాక్ చేయాల్సిన లైవ్ అప్స్ట్రీమ్ ఏదీ లేదు; కోడెక్ మారినప్పుడు `gcf` అప్డేట్లు
మాన్యువల్గా రిఫ్రెష్ చేయబడి, కంప్రెషన్ బడ్జెట్ గేట్
(`check:compression-budget`)కు అనుగుణంగా తిరిగి ధృవీకరించబడతాయి.

### అప్స్ట్రీమ్-ప్రేరిత మెరుగుదలను ప్రతిపాదించడం

1. **వెండర్ చేయవద్దు** — అప్స్ట్రీమ్ రూల్/ఫిల్టర్ను OmniRoute ఫార్మాట్లో తిరిగి వ్యక్తీకరించండి.
2. దిగువనున్న సరిపోలే ఎక్స్టెన్షన్ పాయింట్ ద్వారా దాన్ని జోడించండి (లాంగ్వేజ్ ప్యాక్, RTK ఫిల్టర్, లేదా
   కస్టమ్ ఇంజిన్).
3. లైసెన్స్ను కలిగిన దాని సోర్స్ను కాపీ చేయకుండా, PR వివరణలో అప్స్ట్రీమ్ ప్రాజెక్ట్ను
   సూచించండి (అట్రిబ్యూషన్).
4. టెస్ట్లను చేర్చి, `check:compression-budget` గేట్ ఇప్పటికీ పాస్ అవుతుందని నిర్ధారించండి.

---

## అవుట్పుట్ శైలిని జోడించడం

అవుట్పుట్ శైలులు ([గైడ్లోని కేటలాగ్ పట్టికను](./COMPRESSION_GUIDE.md#output-styles-catalog) చూడండి)
ఇన్పుట్ ఇంజిన్లకు ప్రతిస్పందన-వైపు సమానమైనవి: మీరు పంపే దానిని కుదించడానికి బదులుగా,
తక్కువ ఖర్చుతో కూడిన అవుట్పుట్ను ఉత్పత్తి చేయమని అవి మోడల్కు సూచిస్తాయి. రిజిస్ట్రీ
`open-sse/services/compression/outputStyles/catalog.ts`లోని `OUTPUT_STYLE_CATALOG`, మరియు
**ఒక కేటలాగ్ ఎంట్రీయే మొత్తం ఫీచర్**: ఇంజెక్టర్, డాష్బోర్డ్ సెట్టింగ్ల ప్యానెల్,
పర్సిస్టెన్స్ మరియు టెలిమెట్రీ అన్నీ కేటలాగ్ను ఎన్యూమరేట్ చేస్తాయి — అప్డేట్ చేయాల్సిన మరో జాబితా లేదు.

1. **`OUTPUT_STYLE_CATALOG`కు ఒక ఎంట్రీని జోడించండి**, అందులో `id`, `label`, `description` మరియు
   మూడు ఆంగ్ల `levels` (`lite`, `full`, `ultra`) ఉండాలి. కోడ్, పాత్లు, కమాండ్లు, ఎర్రర్లు మరియు URLలు యథాతథంగా ఉండేలా
   ప్రతి స్థాయి `${SHARED_BOUNDARIES}`తో ముగియాలి.
   ప్రతి `(id, level, language)`కు సూచన టెక్స్ట్ తప్పనిసరిగా **స్థిరంగా మరియు నిర్ధారితంగా** ఉండాలి —
   అనుమతించబడిన ఏకైక ఇంటర్పోలేషన్ `${SHARED_BOUNDARIES}`.
2. **దాన్ని అనువదించండి.** `i18n` కింద కనీసం ఒక `pt-BR` బ్లాక్ను అందించండి; `ponytail` మరియు
   `i-have-adhd` (en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi) సూచన ఆకృతులు. ఉద్దేశపూర్వకంగా
   ఒకే-భాషకు చెందిన శైలి, బదులుగా `locale`ను సెట్ చేస్తుంది (`terse-cjk` → `zh` మాదిరిగా), ఆపై
   ఆ లోకేల్లో మాత్రమే అందించబడుతుంది.
3. **మ్యాట్రిక్స్ గార్డ్ను అప్డేట్ చేయండి** — శైలి భాషలను
   `tests/unit/compression/output-styles-i18n-matrix.test.ts`లోని `BASELINE_LANGUAGES`కు జోడించండి. స్పష్టమైన
   ట్రాకింగ్ ఇష్యూతో కూడిన `KNOWN_ENGLISH_ONLY` ఎంట్రీ లేకపోతే, అవసరమైన అనువాదాలు లేని ఏ కొత్త
   non-locale-gated శైలినైనా గేట్ విఫలం చేస్తుంది.
4. **ప్రతి శైలికి ఒక పరీక్షను జోడించండి**, దీనికి
   `tests/unit/compression/i-have-adhd-catalog.test.ts`ను నమూనాగా తీసుకోండి: కేటలాగ్ ఆకృతి, ప్రతి స్థాయికి
   బౌండరీల క్లాజ్, మరియు ప్రతి అనువాదం కాపీ చేసిన ఆంగ్లంలో కాకుండా దాని స్వంత భాషలోనే వ్రాయబడిందని నిర్ధారించే యాంకర్.
5. **ఆపాదింపు**: శైలి ఏదైనా అప్స్ట్రీమ్ ప్రాజెక్ట్ నుండి స్వీకరించబడితే, ఎంట్రీలోని
   సోర్స్ కామెంట్లో దానికి క్రెడిట్ ఇవ్వండి (ఉదా. `i-have-adhd` → ayghri/i-have-adhd, MIT) — పైన ఉన్న
   "అప్స్ట్రీమ్-ప్రేరిత మెరుగుదలను ప్రతిపాదించడం"కు వర్తించే నియమమే ఇక్కడ కూడా వర్తిస్తుంది.

UI, స్కీమా లేదా టెలిమెట్రీ మార్పు అవసరం లేదు — ఆ ఉపరితలాలు కేటలాగ్ నుండి రెండర్ అవుతాయి.

---

## ఉత్తమ పద్ధతులు

### ఇంజిన్ అభివృద్ధి

1. **ఎల్లప్పుడూ `validateConfig`ను అమలు చేయండి** — ధ్రువీకరణ లేని ఇంజిన్లు నిశ్శబ్ద వైఫల్యాలకు కారణమవుతాయి
2. **వాస్తవికమైన `targetLatencyMs`ను సెట్ చేయండి** — ఇంజిన్లను ఎంచుకోవడానికి వ్యూహ ఎంపికకర్త దీన్ని ఉపయోగిస్తుంది
3. **డాష్బోర్డ్ కోసం `getConfigSchema`ను ఉపయోగించండి** — వినియోగదారుల నుండి కాన్ఫిగరేషన్ను ఎప్పుడూ దాచవద్దు
4. **మీ ఇంజిన్ ప్యూర్గా ఉంటే `stackable: true`కు మద్దతు ఇవ్వండి** — సైడ్ ఎఫెక్ట్లు ఉన్న ఇంజిన్లను స్టాక్ చేయకూడదు
5. **ఇన్లైన్ పరీక్షలు వ్రాయండి** — ఇంజిన్లను <1sలో ధ్రువీకరించగలగాలి

### భాషా ప్యాక్ అభివృద్ధి

1. **`lite` తీవ్రతతో ప్రారంభించండి** — అత్యల్ప సెట్టింగ్ వద్ద మీ నియమాలు సురక్షితంగా ఉండాలి
2. **నియమాల పరిధిని పరిమితం చేయడానికి `context`ను ఉపయోగించండి** — `user`కు మాత్రమే వర్తించే నియమాలు అనుకోకుండా సిస్టమ్ ప్రాంప్ట్లను ప్రభావితం చేయలేవు
3. **JSON కీలను క్యాప్చర్ చేయడం నివారించండి** — `\\bword\\b` JSON లోపల సరిపోలవచ్చు, దాంతో నిర్మిత డేటా దెబ్బతింటుంది
4. **ఎడ్జ్ కేసులతో పరీక్షించండి** — ఖాళీ ఇన్పుట్, యూనికోడ్, RTL టెక్స్ట్, ఎమోజీలు
5. **ఇప్పటికే ఉన్న ప్యాక్లను టెంప్లేట్లుగా ఉపయోగించండి** — `en/filler.json` అత్యంత అభివృద్ధి చెందిన ఉదాహరణ

### పైప్లైన్ రూపకల్పన

1. **ఆప్టిమైజ్ చేయడానికి ముందు ప్రొఫైల్ చేయండి** — ముందుగా `compression_stats`తో కొలవండి
2. **మళ్లీ అమలు చేయడం కంటే కంపోజిషన్కు ప్రాధాన్యం ఇవ్వండి** — కొత్త ఇంజిన్ను వ్రాయడానికి ముందు Caveman నియమాలను విస్తరించండి
3. **క్రమానికి గల కారణాన్ని డాక్యుమెంట్ చేయండి** — ఇంజిన్ Aను ఇంజిన్ Bకు ముందు ఎందుకు ఉంచారో కామెంట్ చేయండి
4. **మూడు తీవ్రత స్థాయిలన్నింటిలో పరీక్షించండి** — `lite` వేగవంతమైనది కానీ నష్టపూరితమైనది, `ultra` నెమ్మదైనది కానీ ఖచ్చితమైనది

---

## సూచన: అంతర్నిర్మిత ఇంజిన్లు

| ఇంజిన్ ID            | స్టాక్ చేయదగినది | డిఫాల్ట్ stackPriority | లక్ష్యాలు                             |
| -------------------- | ---------------- | ---------------------- | ------------------------------------- |
| `lite`               | అవును            | 5                      | సందేశాలు, టూల్ ఫలితాలు                |
| `rtk`                | అవును            | 10                     | టూల్ ఫలితాలు                          |
| `standard` (caveman) | అవును            | 20                     | సందేశాలు, టూల్ ఫలితాలు, కోడ్ బ్లాక్లు |
| `aggressive`         | అవును            | 30                     | సందేశాలు                              |
| `ultra`              | అవును            | 40                     | సందేశాలు, కోడ్ బ్లాక్లు               |

### ఇవి కూడా చూడండి

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — పైప్లైన్ అవలోకనం
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — ఇంజిన్ రిజిస్ట్రీ సూచన
- [COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md) — నియమాల ఫార్మాట్ నిర్దేశం
- [COMPRESSION_LANGUAGE_PACKS.md](./COMPRESSION_LANGUAGE_PACKS.md) — భాషా ప్యాక్ వివరాలు
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — RTK ఇంజిన్ మరియు అనుకూల ఫిల్టర్లు
- మూలం: `open-sse/services/compression/` (117 ఫైళ్లు, ~250KB)
