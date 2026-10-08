# Extending the Compression Pipeline (ગુજરાતી)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/EXTENDING_COMPRESSION.md) · 🇪🇹 [am](../../../am/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇦 [ar](../../../ar/docs/compression/EXTENDING_COMPRESSION.md) · 🇦🇿 [az](../../../az/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇬 [bg](../../../bg/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇩 [bn](../../../bn/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇦 [bs](../../../bs/docs/compression/EXTENDING_COMPRESSION.md) · 🇨🇿 [cs](../../../cs/docs/compression/EXTENDING_COMPRESSION.md) · 🇩🇰 [da](../../../da/docs/compression/EXTENDING_COMPRESSION.md) · 🇩🇪 [de](../../../de/docs/compression/EXTENDING_COMPRESSION.md) · 🇬🇷 [el](../../../el/docs/compression/EXTENDING_COMPRESSION.md) · 🇪🇸 [es](../../../es/docs/compression/EXTENDING_COMPRESSION.md) · 🇪🇪 [et](../../../et/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇷 [fa](../../../fa/docs/compression/EXTENDING_COMPRESSION.md) · 🇫🇮 [fi](../../../fi/docs/compression/EXTENDING_COMPRESSION.md) · 🇫🇷 [fr](../../../fr/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇪 [ga](../../../ga/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [ha](../../../ha/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇱 [he](../../../he/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [hi](../../../hi/docs/compression/EXTENDING_COMPRESSION.md) · 🇭🇷 [hr](../../../hr/docs/compression/EXTENDING_COMPRESSION.md) · 🇭🇺 [hu](../../../hu/docs/compression/EXTENDING_COMPRESSION.md) · 🇦🇲 [hy](../../../hy/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇩 [id](../../../id/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [ig](../../../ig/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇹 [it](../../../it/docs/compression/EXTENDING_COMPRESSION.md) · 🇯🇵 [ja](../../../ja/docs/compression/EXTENDING_COMPRESSION.md) · 🇬🇪 [ka](../../../ka/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇭 [km](../../../km/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [kn](../../../kn/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇷 [ko](../../../ko/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇹 [lt](../../../lt/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇻 [lv](../../../lv/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [ml](../../../ml/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [mr](../../../mr/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇾 [ms](../../../ms/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇹 [mt](../../../mt/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇲 [my](../../../my/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇵 [ne](../../../ne/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇱 [nl](../../../nl/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇴 [no](../../../no/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [or](../../../or/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [pa](../../../pa/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇭 [phi](../../../phi/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇱 [pl](../../../pl/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇹 [pt](../../../pt/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇴 [ro](../../../ro/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇺 [ru](../../../ru/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇰 [si](../../../si/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇰 [sk](../../../sk/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇮 [sl](../../../sl/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇸 [sr](../../../sr/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇪 [sv](../../../sv/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇪 [sw](../../../sw/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [ta](../../../ta/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [te](../../../te/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇭 [th](../../../th/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇷 [tr](../../../tr/docs/compression/EXTENDING_COMPRESSION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇰 [ur](../../../ur/docs/compression/EXTENDING_COMPRESSION.md) · 🇺🇿 [uz](../../../uz/docs/compression/EXTENDING_COMPRESSION.md) · 🇻🇳 [vi](../../../vi/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [yo](../../../yo/docs/compression/EXTENDING_COMPRESSION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/EXTENDING_COMPRESSION.md)

---

> **સારાંશ**: OmniRouteનું કમ્પ્રેશન એન્જિન **પ્લગ કરી શકાય તેવું** છે — તમે કસ્ટમ એન્જિન રજિસ્ટર કરી શકો છો, નવી ભાષાઓ માટે લેંગ્વેજ પૅક વિતરિત કરી શકો છો અને સ્ટૅક્ડ પાઇપલાઇન સંયોજિત કરી શકો છો. આ માર્ગદર્શિકા તે કેવી રીતે કરવું તે બતાવે છે.

**સંબંધિત માર્ગદર્શિકાઓ:**

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — સંપૂર્ણ પાઇપલાઇનનું અવલોકન
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — એન્જિન રજિસ્ટ્રી અને બિલ્ટ-ઇન એન્જિન
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — RTK એન્જિન અને કસ્ટમ ફિલ્ટર
- [COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md) — રૂલ પૅક ફોર્મેટ સંદર્ભ

---

## અવલોકન

કમ્પ્રેશન સિસ્ટમમાં **3 એક્સ્ટેન્શન પૉઇન્ટ** છે:

| એક્સ્ટેન્શન પૉઇન્ટ   | ઉપયોગનો કિસ્સો                                                             | મુશ્કેલી  |
| -------------------- | -------------------------------------------------------------------------- | --------- |
| **કસ્ટમ એન્જિન**     | સંપૂર્ણપણે નવું કમ્પ્રેશન અલ્ગોરિધમ ઉમેરો (દા.ત., ડોમેન-વિશિષ્ટ સારાંશકાર) | અદ્યતન    |
| **લેંગ્વેજ પૅક**     | નવી પ્રાકૃતિક ભાષા માટે સપોર્ટ ઉમેરો (દા.ત., હિન્દી, અરબી)                 | મધ્યમ     |
| **સ્ટૅક્ડ પાઇપલાઇન** | હાલનાં એન્જિનને કસ્ટમ ક્રમમાં સંયોજિત કરો                                  | પ્રારંભિક |

```
┌─────────────────────────────────────────────────────────────┐
│                    કમ્પ્રેશન વ્યૂહરચના                        │
│                                                              │
│   ઇનપુટ સંદેશાઓ ──▶ getEffectiveMode() ──▶ મોડ              │
│                                              │               │
│                      ┌───────────────────────┼──────────┐    │
│                      │         │         │         │    │    │
│                      ▼         ▼         ▼         ▼    │    │
│                   "rtk"    "lite"   "standard" "stacked"    │
│                      │         │         │         │    │    │
│                      ▼         ▼         ▼         ▼    │    │
│                   RTK       Lite     Caveman   engines[]   │
│                   એન્જિન    એન્જિન   એન્જિન    શ્રેણીબદ્ધ   │
│                      │         │         │         │    │    │
│                      └─────────┴─────────┴─────────┘    │    │
│                                      │                    │
│                                      ▼                    │
│                             કમ્પ્રેસ કરેલું આઉટપુટ          │
└─────────────────────────────────────────────────────────────┘

વ્યૂહરચના પસંદગીકાર MODE-આધારિત છે: દરેક વિનંતી એક મોડ પસંદ કરે છે
(rtk / lite / standard / aggressive / ultra / stacked / off).
માત્ર "stacked" મોડ બહુવિધ એન્જિનને ક્રમમાં શ્રેણીબદ્ધ કરે છે.
ડિફૉલ્ટ ઑટો-ટ્રિગર મોડ "lite" છે (3-સ્તરીય પ્રાથમિકતા શ્રેણી નહીં).
```

---

## કસ્ટમ કમ્પ્રેશન એન્જિન લખવું

એન્જિન ઇન્ટરફેસ (`open-sse/services/compression/engines/types.ts`) એ કરાર છે જે દરેક એન્જિને પૂર્ણ કરવો આવશ્યક છે. તેમાં 5 આવશ્યક મેથડ છે.

### `CompressionEngine` ઇન્ટરફેસ

```ts
interface CompressionEngine {
  id: string; // અનન્ય એન્જિન ID
  name: string; // પ્રદર્શિત નામ
  description: string; // ટૂંકું વર્ણન
  icon: string; // આઇકન (ઇમોજી અથવા URL)
  targets: CompressionEngineTarget[]; // ["messages", "tool_results", "code_blocks"]
  stackable: boolean; // સ્ટૅક્ડ પાઇપલાઇનમાં ઉપયોગ કરી શકાય છે કે નહીં
  stackPriority: number; // સ્ટૅક્ડ પાઇપલાઇનમાં ક્રમ (ઓછું = વહેલું)
  metadata: CompressionEngineMetadata;

  apply(body, options?): CompressionResult;
  compress(body, config?): CompressionResult;
  getConfigSchema(): EngineConfigField[];
  validateConfig(config): EngineValidationResult;
}
```

### ન્યૂનતમ ઉદાહરણ: Whitespace એન્જિન

શક્ય તેટલું સરળ એન્જિન — સંદેશાઓમાંથી વધારાની ખાલી જગ્યા દૂર કરે છે.

````ts
import type { CompressionEngine } from "omniroute/compression/engines/types";
import { registerCompressionEngine } from "omniroute/compression/engines/registry";

function preserveCodeBlocks(text: string): string {
  // કોડ બ્લૉક માર્કર્સ દ્વારા વિભાજિત કરો અને તેમની અંદરની whitespace જાળવો
  const parts = text.split(/(```[\s\S]*?```)/);
  return parts
    .map((part) => {
      if (part.startsWith("```")) {
        return part; // કોડ બ્લૉક્સમાં ફેરફાર કરશો નહીં
      }
      return part.replace(/\n{3,}/g, "\n\n"); // ફક્ત ગદ્ય પર લાગુ કરો
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
  stackPriority: 100, // caveman/rtk પછી ચલાવો

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

    // સંદેશા ઍરેમાંથી પસાર થાઓ — સ્ટ્રિંગ અને મલ્ટિપાર્ટ કન્ટેન્ટ બંને સંભાળો
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
      // મલ્ટિપાર્ટ કન્ટેન્ટ: ભાગોમાંથી પસાર થાઓ, ફક્ત ટેક્સ્ટ ભાગોને સંકુચિત કરો
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
          return part; // image_url, tool_use વગેરે જાળવો
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

// વૈશ્વિક રીતે નોંધણી કરો
registerCompressionEngine(whitespaceEngine);
````

### કસ્ટમ એન્જિનો ક્યાં મૂકવા

```
~/.omniroute/compression/engines/my-engine.ts    # વપરાશકર્તા સ્તર
<project>/compression-engines/my-engine.ts        # પ્રોજેક્ટ સ્તર (સ્ટાર્ટઅપ વખતે લોડ થાય છે)
```

અથવા પ્લગઇનમાંથી પ્રોગ્રામેટિક રીતે લોડ કરો:

```ts
// તમારા પ્લગઇનમાં
import {
  registerCompressionEngine,
  unregisterCompressionEngine,
} from "@omniroute/open-sse/services/compression/engines/registry";
import { myEngine } from "./engines/my-engine";

export default definePlugin({
  name: "my-compression-plugin",
  // પ્લગઇન SDK onRequest / onResponse / onError હુક્સ ઉપલબ્ધ કરાવે છે. જ્યારે
  // પ્લગઇન મોડ્યુલ લોડ થાય ત્યારે (અથવા પ્રથમ onRequest પર) એન્જિન નોંધણી કરો; તમારી પોતાની
  // teardown પ્રક્રિયામાંથી તેની નોંધણી રદ કરો.
  onRequest: async (ctx) => {
    registerCompressionEngine(myEngine);
  },
});

// teardown વખતે:
// unregisterCompressionEngine("my-engine");
```

### તમારા એન્જિનનું પરીક્ષણ

તમારા એન્જિનને પ્લગઇન અથવા સ્ટાર્ટઅપ ફંક્શનમાં નોંધણી કરો. નોંધણી થયા પછી, એન્જિન તેના `id` દ્વારા
સ્ટ્રેટેજી સિલેક્ટરમાં ઉપલબ્ધ થશે. તેને સ્ટૅક્ડ પાઇપલાઇનમાં સંયોજિત કરીને ઇન્ટિગ્રેશનનું પરીક્ષણ કરો:

---

## ભાષા પૅક્સ બનાવવા

Caveman-શૈલીનું કમ્પ્રેશન દરેક પ્રાકૃતિક ભાષામાં ફિલર્સ, હેજિંગ અને શબ્દાળુ પેટર્ન્સને સંભાળવા માટે **ભાષા-વિશિષ્ટ નિયમ પૅક્સ**નો ઉપયોગ કરે છે. OmniRoute સાથે **6 ભાષા પૅક્સ** આવે છે: `en`, `es`, `fr`, `de`, `ja`, `pt-BR`.

### પૅકનું માળખું

ભાષા પૅક એ `open-sse/services/compression/rules/<language>/` હેઠળની **JSON ફાઇલો**ની ડિરેક્ટરી છે:

```
open-sse/services/compression/rules/
├── en/
│   ├── filler.json          # શુભેચ્છાત્મક શબ્દપ્રયોગો, હેજિંગ, વિનમ્રતા
│   ├── context.json         # સંદર્ભ ઘટાડવાના નિયમો
│   ├── dedup.json           # ડુપ્લિકેશન દૂર કરવાના નિયમો
│   ├── structural.json      # વિરામચિહ્નો, ફોર્મેટિંગ
│   └── ultra.json           # આક્રમક કમ્પ્રેશન નિયમો
├── es/  (સમાન માળખું)
├── fr/  (સમાન માળખું)
├── de/  (સમાન માળખું)
├── ja/  (સમાન માળખું)
└── pt-BR/ (સમાન માળખું)
```

### નિયમની રચના

દરેક નિયમનું સ્વરૂપ આ પ્રકારનું હોય છે (`open-sse/services/compression/ruleLoader.ts`માંથી):

```ts
interface FileRule {
  name: string; // માનવ દ્વારા વાંચી શકાય તેવું નામ (kebab-case)
  pattern: string; // JavaScript regex પેટર્ન
  replacement?: string; // મેળ ખાતા ભાગને શેનાથી બદલવો
  replacementMap?: Record<string, string>; // અથવા key→replacement નકશો
  flags?: string; // Regex ફ્લૅગ્સ (સામાન્ય રીતે "gi")
  context?: "all" | "user" | "system" | "assistant";
  category?: "filler" | "context" | "structural" | "dedup" | "terse" | "ultra";
  minIntensity?: "lite" | "full" | "ultra"; // આ તીવ્રતા કરતાં નીચે હોય તો છોડો
  description?: string; // દસ્તાવેજીકરણ
}
```

### ઉદાહરણ: હિન્દી ફિલર નિયમો ઉમેરવા

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
      "description": "'नमस्ते' જેવા વિનમ્ર પ્રારંભિક શબ્દો દૂર કરો"
    },
    {
      "name": "filler_actually",
      "pattern": "\\b(?:असल में|वास्तव में|दरअसल)\\b\\s*",
      "replacement": "",
      "context": "all",
      "category": "filler",
      "minIntensity": "lite",
      "description": "'actually' જેવા ફિલર્સ દૂર કરો"
    },
    {
      "name": "verbose_plea",
      "pattern": "\\b(?:कृपया|कृपया आप|अनुरोध है कि आप)\\b\\s*",
      "replacement": "",
      "context": "all",
      "category": "filler",
      "minIntensity": "full",
      "description": "હિન્દીમાં 'please' દૂર કરો"
    }
  ]
}
```

### માન્યતા ચકાસણી

લોડ કરતી વખતે નિયમ પૅક્સની `_schema.json` સામે માન્યતા ચકાસવામાં આવે છે. ખોટા માળખાવાળો પૅક લોડ થવામાં નિષ્ફળ જશે અને ભૂલ લૉગ કરશે:

```
RULE_LOADER: પૅક "hi/filler.json"ની માન્યતા ચકાસણી નિષ્ફળ ગઈ:
  - rules.0.pattern: અમાન્ય regex
  - rules.1.context: [all, user, system, assistant]માંથી એક હોવું આવશ્યક છે
```

જ્યારે પૅક લોડ થાય છે ત્યારે (`_schema.json` સામે) માન્યતા ચકાસણી આપમેળે ચાલે છે; અમાન્ય
પૅક નકારવામાં આવે છે અને ઉપરની ભૂલ લૉગ થાય છે. પૅકની માન્યતા ચકાસણી માટે કોઈ અલગ
`npm run` સ્ક્રિપ્ટ નથી — પૅક લોડ કરો (દા.ત. સર્વર શરૂ કરો અથવા
કમ્પ્રેશન પાથ ચલાવો) અને લૉગ્સ જુઓ.

### કસ્ટમ ભાષા પૅક લોડ કરવું

```ts
import { loadRulePack } from "omniroute/compression/ruleLoader";

await loadRulePack("./my-custom-rules/hi/filler.json");
```

અથવા તેને માન્ય સ્થાનમાં મૂકો:

```
~/.omniroute/compression/rules/hi/filler.json  # વપરાશકર્તા-સ્તર
<project>/.compression/rules/hi/filler.json   # પ્રોજેક્ટ-સ્તર
```

### ભાષા પૅક્સ માટેની શ્રેષ્ઠ પદ્ધતિઓ

1. **`filler`થી શરૂઆત કરો** — આ સૌથી વધુ અસરકારક નિયમો છે
2. **આક્રમક નિયમોને નિયંત્રિત કરવા `minIntensity`નો ઉપયોગ કરો** — આ અતિશય કમ્પ્રેશન સામે રક્ષણ આપે છે
3. **પરીક્ષણ કેસો સામેલ કરો** — વર્તણૂક ચકાસવા માટે JSONમાં `tests[]` ઍરે ઉમેરો
4. **ક્રમ મહત્ત્વનો છે** — પહેલાંના નિયમો પહેલાં લાગુ થાય છે; વધુ અસરકારક નિયમો પહેલાં મૂકો
5. **`replacement`નો ઉપયોગ સાવધાનીપૂર્વક કરો** — સામાન્ય રીતે ખાલી સ્ટ્રિંગ યોગ્ય છે; ક્યારેય નવી સામગ્રી ઉમેરશો નહીં

### અનુવાદ વ્યૂહરચના

નિયમ પૅક્સને નવી ભાષા માટે સ્થાનિકીકૃત કરતી વખતે:

1. **નિયમોનાં નામ અનુવાદિત કરો** — તે ડિબગ આઉટપુટમાં દેખાય છે
2. **regex પેટર્ન્સને અનુકૂલિત કરો** — સીધો અનુવાદ ઘણી વખત નિષ્ફળ જાય છે (શબ્દોની સીમાઓ અલગ હોય છે)
3. **વાસ્તવિક વાર્તાલાપ સામે પરીક્ષણ કરો** — પૅક વાસ્તવિક ઇનપુટ પર સુરક્ષિત હોવો જોઈએ
4. **સાંસ્કૃતિક પરંપરાઓ સાથે મેળ બેસાડો** — ઉદાહરણ તરીકે, જાપાનીઝ પૅક્સમાં અંગ્રેજીની સરખામણીમાં વધુ માનવાચક ફિલર્સ હોય છે

---

## સ્ટૅક્ડ પાઇપલાઇન્સ

**સ્ટૅક્ડ પાઇપલાઇન** અનેક એન્જિનોને ક્રમશઃ ચલાવે છે, જેમાં દરેક એન્જિનનું આઉટપુટ આગલા એન્જિનને ઇનપુટ તરીકે આપવામાં આવે છે. `mode: stacked` આંતરિક રીતે આ જ રીતે કાર્ય કરે છે.

### સ્ટૅકિંગ કેવી રીતે કાર્ય કરે છે

```
ઇનપુટ (10,000 ટોકન્સ)
        │
        ▼
   ┌──────────┐
   │  એન્જિન  │  પ્રાથમિકતા 10
   │  A       │  ──▶ આઉટપુટ: 6,000 ટોકન્સ (-40%)
   └────┬─────┘
        ▼
   ┌──────────┐
   │  એન્જિન  │  પ્રાથમિકતા 50
   │  B       │  ──▶ આઉટપુટ: 2,400 ટોકન્સ (-60%)
   └────┬─────┘
        ▼
   ┌──────────┐
   │  એન્જિન  │  પ્રાથમિકતા 100
   │  C       │  ──▶ આઉટપુટ: 1,200 ટોકન્સ (-80%)
   └────┬─────┘
        │
        ▼
અંતિમ આઉટપુટ (1,200 ટોકન્સ, સંયુક્ત રીતે ~88% બચત)
```

જ્યારે `mode: "stacked"` પસંદ કરવામાં આવે છે, ત્યારે એન્જિનો `pipeline` ઍરેમાં નિર્દિષ્ટ કરેલા ક્રમમાં એક પછી એક કાર્ય કરે છે.
એન્જિન Nનું આઉટપુટ એન્જિન N+1નું ઇનપુટ બને છે.

### કમ્પ્રેશન મોડ્સ

OmniRoute કૉન્ફિગરેશન, ઑટો-ટ્રિગર થ્રેશોલ્ડ્સ અને કોમ્બો ઓવરરાઇડ્સના આધારે **દરેક વિનંતી માટે એક મોડ** પસંદ કરે છે.
ઉપલબ્ધ મોડ્સ `open-sse/services/compression/types.ts` (`CompressionMode` પ્રકાર)માં વ્યાખ્યાયિત છે:

| મોડ          | એન્જિનો              | ઉપયોગનો કિસ્સો                                                                                                                                                                                                             |
| ------------ | -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `off`        | કોઈ નહીં             | તમામ કમ્પ્રેશન અક્ષમ કરો                                                                                                                                                                                                   |
| `rtk`        | ફક્ત RTK             | કમાન્ડ-આઉટપુટનું પ્રમાણ વધુ હોય તેવા સેશન્સ (80%+ બચત)                                                                                                                                                                     |
| `lite`       | ફક્ત Lite            | સાવચેત કમ્પ્રેશન (ઝડપી, સુરક્ષિત)                                                                                                                                                                                          |
| `standard`   | Caveman              | લેંગ્વેજ પૅક્સ સાથે ગદ્યનું કમ્પ્રેશન                                                                                                                                                                                      |
| `aggressive` | Caveman + Aggressive | આક્રમક ગદ્ય કમ્પ્રેશન + આક્રમક અંતિમ પાસ                                                                                                                                                                                   |
| `ultra`      | Ultra                | મહત્તમ કમ્પ્રેશન (લોસી, અંતિમ ઉપાય). જ્યારે `ultra.modelPath` સેટ કરેલું હોય ત્યારે તેને વૈકલ્પિક રીતે **LLMLingua-2** SLM એન્જિન મારફતે રૂટ કરવામાં આવે છે (મોડલ અનુપલબ્ધ હોય ત્યારે નિયમ-આધારિત પાથ પર ફેઇલ-ઓપન થાય છે). |
| `stacked`    | કસ્ટમ પાઇપલાઇન       | એન્જિનોને કોઈપણ ક્રમમાં સંયોજિત કરો (નીચે જુઓ)                                                                                                                                                                             |

> ઉપરના મોડ એન્જિનો ઉપરાંત, રજિસ્ટ્રી વિશિષ્ટ સ્ટૅક કરી શકાય તેવા એન્જિનો પણ પ્રદાન કરે છે —
> **CCR**, **headroom**, **ionizer**, અને **session-dedup** — જેનું દસ્તાવેજીકરણ
> [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md#additional-built-in-engines)માં કરેલું છે.

મોડની પસંદગી `open-sse/services/compression/strategySelector.ts`માંના `getEffectiveMode()` દ્વારા નિર્ધારિત થાય છે:

1. જો કમ્પ્રેશન અક્ષમ હોય: `"off"`
2. જો કોમ્બો ઓવરરાઇડ અસ્તિત્વમાં હોય: ઓવરરાઇડનો ઉપયોગ કરો
3. જો ઑટો-ટ્રિગર થ્રેશોલ્ડ વટાવી દેવાય: `autoTriggerMode`નો ઉપયોગ કરો (ડિફૉલ્ટ: `"lite"`)
4. અન્યથા: `defaultMode`નો ઉપયોગ કરો

### ડિફૉલ્ટ સ્ટૅક્ડ પાઇપલાઇન

જ્યારે `mode: "stacked"` સ્પષ્ટ રીતે કૉન્ફિગર કરેલું હોય, ત્યારે ડિફૉલ્ટ પાઇપલાઇન આને સંયોજિત કરે છે:

1. **RTK** — કમાન્ડ આઉટપુટમાંથી બિનજરૂરી સામગ્રી દૂર કરે છે (ટર્મિનલ આઉટપુટ પર ~80% બચત)
2. **Caveman** — બિનજરૂરી શબ્દો દૂર કરે છે અને ગદ્યને સંક્ષિપ્ત બનાવે છે (બાકીના ટેક્સ્ટ પર ~46%)
3. **Lite** — અંતિમ વ્હાઇટસ્પેસ + ડિડુપ પાસ

આ સંયોજન ટૂલ્સનું પ્રમાણ વધુ હોય તેવા સેશન્સ પર **78-95% બચત** પ્રાપ્ત કરે છે.

### સ્ટૅક્ડ પાઇપલાઇન્સ કૉન્ફિગર કરવી

કોમ્બો કૉન્ફિગમાં:

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

તમે એન્જિનોને છોડી શકો છો, કસ્ટમ એન્જિનો ઉમેરી શકો છો અથવા તેમનો ક્રમ બદલી શકો છો.

### સ્ટેટ પાસિંગ

એન્જિનો વિનંતીના સંદર્ભમાંથી (`options`માં) મેટાડેટા વાંચી શકે છે:

```ts
compress(body, config) {
  // અગાઉના એન્જિનોમાંથી મેટાડેટા વાંચો
  const original = options?.compressionComboId;  // "my-coding-combo"
  // ...
}
```

મેટાડેટા **ફક્ત વાંચી શકાય તેવું** છે — એન્જિનો વિનંતીના સંદર્ભમાં ફેરફાર કરી શકતા નથી, ફક્ત પોતાના બૉડી આઉટપુટમાં ફેરફાર કરી શકે છે.

### એક્ઝિક્યુશન ક્રમની મુશ્કેલીઓ

| એન્જિનનો ક્રમ                            | અસર                                                                                          |
| ---------------------------------------- | -------------------------------------------------------------------------------------------- |
| RTK → Caveman → Lite                     | **ભલામણ કરેલ** (પહેલાં બિનજરૂરી સામગ્રી, પછી ભાષા અને ત્યારબાદ વ્હાઇટસ્પેસ દૂર કરે છે)       |
| Lite → RTK → Caveman                     | ખરાબ — Lite કાચા આઉટપુટમાંથી વ્હાઇટસ્પેસ દૂર કરે છે, જેથી RTKનું પેટર્ન મેચિંગ નિષ્ફળ જાય છે |
| Caveman → RTK                            | ખરાબ — Caveman ટેક્સ્ટને એવી રીતે ફરીથી લખી શકે છે કે RTK તેને ઓળખી ન શકે                    |
| `tool_results`ને પહેલાં રાખતો કોઈપણ ક્રમ | વધુ સારો — ટૂલ આઉટપુટમાં સૌથી વધુ બિનજરૂરી સામગ્રી હોય છે                                    |

### ક્યારે સ્ટૅક ન કરવું

સ્ટૅકિંગ હંમેશાં વધુ સારું હોતું નથી:

- **સરળ સંદેશાઓ** (કોઈ ટૂલ આઉટપુટ નહીં) — ફક્ત Caveman અથવા Lite પૂરતું છે
- **ખર્ચ પ્રત્યે સંવેદનશીલ** — દરેક એન્જિન ~5-50ms વિલંબ ઉમેરે છે
- **વિશિષ્ટ ટૂલ્સ** — શેલ આઉટપુટ માટે સામાન્ય રીતે ફક્ત RTK પૂરતું છે

### કસ્ટમ પાઇપલાઇન બનાવવી

કોઈ named-pipeline registry નથી. stacked pipeline એ માત્ર `applyStackedCompression()` ને પાઠવવામાં આવતું **steps નું inline array** છે (`@omniroute/open-sse/services/compression/strategySelector` માંથી export થયેલું):

```ts
import { applyStackedCompression } from "@omniroute/open-sse/services/compression/strategySelector";

const result = applyStackedCompression(body, [
  { engine: "rtk", intensity: "aggressive" },
  { engine: "caveman", intensity: "full" },
]);
```

જ્યારે તમે pipeline પાઠવતા નથી, ત્યારે તે મૂળભૂત રીતે `rtk(standard) → caveman(full)` નો ઉપયોગ કરે છે.

તેને config દ્વારા નિયંત્રિત કરવા માટે, `mode: "stacked"` સેટ કરો અને `stackedPipeline` હેઠળ step array આપો (`config.stackedPipeline` માંથી વાંચવામાં આવે છે):

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

## અપસ્ટ્રીમ સિંક નીતિ

OmniRouteના કમ્પ્રેશન એન્જિનો READMEમાં અનેક અપસ્ટ્રીમ પ્રોજેક્ટ્સને શ્રેય આપે છે
("RTK, Caveman, LLMLingua-2, Trogloditaથી પ્રેરિત"). યોગદાનકર્તાઓનો એક સામાન્ય
પ્રશ્ન છે: **જ્યારે અપસ્ટ્રીમ RTK નવું ટૂલ ફિલ્ટર ઉમેરે અથવા Caveman નવું નિયમ
પૅક ઉમેરે, ત્યારે તે OmniRoute સુધી કેવી રીતે પહોંચે છે?** આ વિભાગ તેનો અધિકૃત જવાબ છે.

### વેન્ડર કરેલી નકલો વિરુદ્ધ સ્વતંત્ર અમલીકરણો

| એન્જિન                       | અપસ્ટ્રીમ સાથેનો સંબંધ                                                                                                             | સ્થાન                                                               |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| **RTK**                      | **સ્વતંત્ર પુનઃઅમલીકરણ** (પ્રેરિત, નકલ નહીં)                                                                                       | `open-sse/services/compression/engines/rtk/`                        |
| **Caveman**                  | **સ્વતંત્ર પુનઃઅમલીકરણ** (પ્રેરિત)                                                                                                 | `open-sse/services/compression/engines/cavemanAdapter.ts`           |
| **Headroom**                 | મોટાભાગે આંતરિક; માત્ર `gcf/` કોડેક જ `gcf-typescript`માંથી **ખરેખર વેન્ડર કરેલું** છે (MIT, SPDX-ચિહ્નિત, માત્ર generic પ્રોફાઇલ) | `open-sse/services/compression/engines/headroom/gcf/`               |
| **LLMLingua-2 / Troglodita** | પ્રેરિત (`llmlingua` + `session-dedup` એન્જિનોને આધાર આપે છે)                                                                      | `open-sse/services/compression/engines/llmlingua/`, `session-dedup` |

મુખ્ય મુદ્દો: **RTK અને Caveman એ _વિચારો_ (ફિલ્ટર નિયમો, નિયમ પૅક્સ)નાં ક્લીન-રૂમ TypeScript અમલીકરણો છે,
વેન્ડર કરેલા સોર્સ ટ્રી નથી.** `git pull` કરવા માટે કોઈ
અપસ્ટ્રીમ નકલ નથી — અને આ જ કારણ છે કે READMEમાં
"bundled"ને બદલે "inspired by" લખેલું છે.

### અપસ્ટ્રીમ સુધારાઓ કેવી રીતે મર્જ કરવામાં આવે છે

હેતુપૂર્વક **કોઈ સ્વચાલિત અપસ્ટ્રીમ-રિલીઝ ટ્રેકિંગ નથી અને કોઈ `compression-sync`
લેબલ પણ નથી**. એન્જિનો પુનઃઅમલીકરણો હોવાથી, અપસ્ટ્રીમ RTK
ફિલ્ટર અથવા Caveman નિયમ પૅકને કોડ તરીકે મર્જ કરવામાં આવતું નથી; તેને **OmniRouteના પોતાના
ફોર્મેટમાં નવા નિયમ/ફિલ્ટર તરીકે ફરીથી વ્યક્ત કરવામાં આવે છે** (જુઓ
[COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md)) અને સામાન્ય PR મારફતે
જરૂરિયાત મુજબ ઉમેરવામાં આવે છે. ઉપરના એક્સ્ટેન્શન પોઇન્ટ્સ (કસ્ટમ એન્જિન, ભાષા પૅક, RTK ફિલ્ટર)
તેમાં યોગદાન આપવાની મંજૂર રીત છે.

આ જ પ્રવાહનાં તાજેતરનાં ઉદાહરણો:

- Gradle અને `dotnet` બિલ્ડ આઉટપુટ માટે RTK ફિલ્ટર્સ (v3.8.42)
- kubectl / docker-build / composer / gh માટે RTK ફિલ્ટર્સ (#2824)
- Caveman Indonesian ભાષા પૅક (#3975), ઉપરાંત German / French / Japanese / Chinese પૅક્સ

### Headroom (ઇનપુટ-કમ્પ્રેશન પ્રોક્સી)

Headroom **સંપૂર્ણપણે આંતરિક** છે — પિન કરેલો, વેન્ડર કરેલો `gcf` કોડેક સ્નૅપશૉટ તેમજ
OmniRouteના પોતાના `smartcrusher` / `toon` / `tabular` સ્તરો. વેન્ડર કરેલી નકલ સિવાય
ટ્રેક કરવા માટે કોઈ સક્રિય અપસ્ટ્રીમ નથી; કોડેક બદલાય ત્યારે `gcf`નાં અપડેટ્સ
મેન્યુઅલી રિફ્રેશ કરવામાં આવે છે અને કમ્પ્રેશન બજેટ
ગેટ (`check:compression-budget`) સામે ફરીથી માન્ય કરવામાં આવે છે.

### અપસ્ટ્રીમથી પ્રેરિત સુધારો પ્રસ્તાવિત કરવો

1. **વેન્ડર કરશો નહીં** — અપસ્ટ્રીમ નિયમ/ફિલ્ટરને OmniRouteના ફોર્મેટમાં ફરીથી વ્યક્ત કરો.
2. તેને નીચેના મેળ ખાતા એક્સ્ટેન્શન પોઇન્ટ દ્વારા ઉમેરો (ભાષા પૅક, RTK ફિલ્ટર અથવા
   કસ્ટમ એન્જિન).
3. PRના વર્ણનમાં અપસ્ટ્રીમ પ્રોજેક્ટનો સંદર્ભ આપો (શ્રેય માટે), તેના
   લાઇસન્સ ધરાવતા સોર્સની નકલ કરીને નહીં.
4. પરીક્ષણો સામેલ કરો અને ખાતરી કરો કે `check:compression-budget` ગેટ હજુ પણ પાસ થાય છે.

---

## આઉટપુટ શૈલી ઉમેરવી

આઉટપુટ શૈલીઓ (જુઓ [માર્ગદર્શિકાનું કેટલોગ કોષ્ટક](./COMPRESSION_GUIDE.md#output-styles-catalog))
ઇનપુટ એન્જિનોની પ્રતિસાદ-બાજુની સમકક્ષ છે: તમે જે મોકલો છો તેને સંકુચિત કરવાને બદલે,
તે મોડેલને ઓછા ખર્ચાળ આઉટપુટ ઉત્પન્ન કરવાની સૂચના આપે છે. રજિસ્ટ્રી
`open-sse/services/compression/outputStyles/catalog.ts` માં `OUTPUT_STYLE_CATALOG` છે, અને
**એક કેટલોગ એન્ટ્રી જ સમગ્ર સુવિધા છે**: ઇન્જેક્ટર, ડૅશબોર્ડ સેટિંગ્સ પેનલ,
પર્સિસ્ટન્સ અને ટેલિમેટ્રી બધાં કેટલોગનું જ ગણન કરે છે — અપડેટ કરવા માટે બીજી કોઈ સૂચિ નથી.

1. **`OUTPUT_STYLE_CATALOG` માં એક એન્ટ્રી ઉમેરો**, જેમાં `id`, `label`, `description` અને
   ત્રણ અંગ્રેજી `levels` (`lite`, `full`, `ultra`) હોય. દરેક લેવલના અંતે
   `${SHARED_BOUNDARIES}` હોવું આવશ્યક છે, જેથી કોડ, પાથ, કમાન્ડ, ભૂલો અને URLs શબ્દશઃ જળવાઈ રહે.
   સૂચનાનો ટેક્સ્ટ દરેક `(id, level, language)` માટે **સ્થિર અને નિર્ધારિત** હોવો આવશ્યક છે —
   `${SHARED_BOUNDARIES}` જ એકમાત્ર માન્ય ઇન્ટરપોલેશન છે.
2. **તેનો અનુવાદ કરો.** `i18n` હેઠળ ઓછામાં ઓછો એક `pt-BR` બ્લૉક મોકલો; `ponytail` અને
   `i-have-adhd` (en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi) સંદર્ભ માળખાં છે. ઇરાદાપૂર્વક
   એક જ ભાષાવાળી શૈલી તેના બદલે `locale` સેટ કરે છે (જેમ કે `terse-cjk` → `zh`) અને પછી
   તે માત્ર તે લોકેલ હેઠળ જ ઉપલબ્ધ કરાવવામાં આવે છે.
3. **મેટ્રિક્સ ગાર્ડ અપડેટ કરો** — શૈલીની ભાષાઓને
   `tests/unit/compression/output-styles-i18n-matrix.test.ts` માં `BASELINE_LANGUAGES` ખાતે ઉમેરો.
   આવશ્યક અનુવાદો વિનાની કોઈપણ નવી, locale દ્વારા મર્યાદિત ન હોય તેવી શૈલી માટે ગેટ નિષ્ફળ થાય છે,
   સિવાય કે તેમાં ટ્રૅકિંગ ઇશ્યૂ સાથે સ્પષ્ટ `KNOWN_ENGLISH_ONLY` એન્ટ્રી હોય.
4. **દરેક શૈલી માટે એક ટેસ્ટ ઉમેરો**, જેનું મોડેલ
   `tests/unit/compression/i-have-adhd-catalog.test.ts` પર આધારિત હોય: કેટલોગનું માળખું, દરેક
   લેવલ માટે બાઉન્ડરીઝ કલોઝ અને દરેક અનુવાદ નકલ કરેલા અંગ્રેજીને બદલે તેની પોતાની ભાષામાં
   લખાયેલો છે એવું સુનિશ્ચિત કરતું એન્કર.
5. **શ્રેય**: જો શૈલીને કોઈ અપસ્ટ્રીમ પ્રોજેક્ટ પરથી અનુકૂલિત કરવામાં આવી હોય, તો એન્ટ્રી પરના
   સોર્સ કમેન્ટમાં તેને શ્રેય આપો (દા.ત. `i-have-adhd` → ayghri/i-have-adhd, MIT) — ઉપરના
   "Proposing an upstream-inspired improvement" જેવો જ નિયમ લાગુ પડે છે.

કોઈ UI, સ્કીમા અથવા ટેલિમેટ્રી ફેરફાર જરૂરી નથી — આ સપાટીઓ કેટલોગમાંથી રેન્ડર થાય છે.

---

## શ્રેષ્ઠ પ્રથાઓ

### એન્જિન ડેવલપમેન્ટ

1. **હંમેશાં `validateConfig` અમલમાં મૂકો** — વૅલિડેશન વિનાનાં એન્જિનો મૌન નિષ્ફળતાઓ સર્જે છે
2. **વાસ્તવિક `targetLatencyMs` સેટ કરો** — એન્જિનો પસંદ કરવા માટે સ્ટ્રેટેજી સિલેક્ટર તેનો ઉપયોગ કરે છે
3. **ડૅશબોર્ડ માટે `getConfigSchema` નો ઉપયોગ કરો** — વપરાશકર્તાઓથી કન્ફિગ ક્યારેય છુપાવશો નહીં
4. **જો તમારું એન્જિન શુદ્ધ હોય તો `stackable: true` ને સપોર્ટ કરો** — સાઇડ ઇફેક્ટ ધરાવતા એન્જિનો સ્ટૅક ન થવા જોઈએ
5. **ઇનલાઇન ટેસ્ટ લખો** — એન્જિનો <1s માં ચકાસી શકાય તેવા હોવા જોઈએ

### લેંગ્વેજ પૅક ડેવલપમેન્ટ

1. **`lite` ઇન્ટેન્સિટીથી શરૂઆત કરો** — તમારી રૂલ્સ સૌથી નીચા સેટિંગ પર સુરક્ષિત હોવી જોઈએ
2. **રૂલ્સનો વ્યાપ નિર્ધારિત કરવા `context` નો ઉપયોગ કરો** — માત્ર `user` માટેની રૂલ્સ આકસ્મિક રીતે સિસ્ટમ પ્રોમ્પ્ટ્સને અસર કરી શકતી નથી
3. **JSON કીઝ કૅપ્ચર કરવાનું ટાળો** — `\\bword\\b` JSON ની અંદર મૅચ થઈ શકે છે, જેનાથી સ્ટ્રક્ચર્ડ ડેટા તૂટી શકે છે
4. **એજ કેસ સાથે ટેસ્ટ કરો** — ખાલી ઇનપુટ, યુનિકોડ, RTL ટેક્સ્ટ, ઇમોજીસ
5. **હાલના પૅક્સનો ટેમ્પ્લેટ તરીકે ઉપયોગ કરો** — `en/filler.json` સૌથી વધુ વિકસિત ઉદાહરણ છે

### પાઇપલાઇન ડિઝાઇન

1. **ઑપ્ટિમાઇઝ કરતાં પહેલાં પ્રોફાઇલ કરો** — પહેલાં `compression_stats` વડે માપો
2. **ફરીથી અમલમાં મૂકવા કરતાં કમ્પોઝિશનને પ્રાધાન્ય આપો** — નવું એન્જિન લખતાં પહેલાં Caveman રૂલ્સને વિસ્તારો
3. **ક્રમનું તર્ક દસ્તાવેજીકૃત કરો** — એન્જિન A ને એન્જિન B પહેલાં શા માટે રાખ્યું છે તે કમેન્ટમાં લખો
4. **ઇન્ટેન્સિટીના તમામ 3 લેવલ પર ટેસ્ટ કરો** — `lite` ઝડપી છે પરંતુ નુકસાનકારક છે, `ultra` ધીમું પરંતુ ચોક્કસ છે

---

## સંદર્ભ: બિલ્ટ-ઇન એન્જિનો

| એન્જિન ID            | સ્ટૅક કરી શકાય તેવું | ડિફૉલ્ટ stackPriority | લક્ષ્યો                           |
| -------------------- | -------------------- | --------------------- | --------------------------------- |
| `lite`               | હા                   | 5                     | સંદેશાઓ, ટૂલ પરિણામો              |
| `rtk`                | હા                   | 10                    | ટૂલ પરિણામો                       |
| `standard` (caveman) | હા                   | 20                    | સંદેશાઓ, ટૂલ પરિણામો, કોડ બ્લૉક્સ |
| `aggressive`         | હા                   | 30                    | સંદેશાઓ                           |
| `ultra`              | હા                   | 40                    | સંદેશાઓ, કોડ બ્લૉક્સ              |

### આ પણ જુઓ

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — પાઇપલાઇનનું વિહંગાવલોકન
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — એન્જિન રજિસ્ટ્રી સંદર્ભ
- [COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md) — નિયમ ફોર્મેટ સ્પેસિફિકેશન
- [COMPRESSION_LANGUAGE_PACKS.md](./COMPRESSION_LANGUAGE_PACKS.md) — લેંગ્વેજ પૅકની વિગતો
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — RTK એન્જિન અને કસ્ટમ ફિલ્ટર્સ
- સ્રોત: `open-sse/services/compression/` (117 ફાઇલો, ~250KB)
