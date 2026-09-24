# Extending the Compression Pipeline (മലയാളം)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/EXTENDING_COMPRESSION.md) · 🇪🇹 [am](../../../am/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇦 [ar](../../../ar/docs/compression/EXTENDING_COMPRESSION.md) · 🇦🇿 [az](../../../az/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇬 [bg](../../../bg/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇩 [bn](../../../bn/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇦 [bs](../../../bs/docs/compression/EXTENDING_COMPRESSION.md) · 🇨🇿 [cs](../../../cs/docs/compression/EXTENDING_COMPRESSION.md) · 🇩🇰 [da](../../../da/docs/compression/EXTENDING_COMPRESSION.md) · 🇩🇪 [de](../../../de/docs/compression/EXTENDING_COMPRESSION.md) · 🇬🇷 [el](../../../el/docs/compression/EXTENDING_COMPRESSION.md) · 🇪🇸 [es](../../../es/docs/compression/EXTENDING_COMPRESSION.md) · 🇪🇪 [et](../../../et/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇷 [fa](../../../fa/docs/compression/EXTENDING_COMPRESSION.md) · 🇫🇮 [fi](../../../fi/docs/compression/EXTENDING_COMPRESSION.md) · 🇫🇷 [fr](../../../fr/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇪 [ga](../../../ga/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [gu](../../../gu/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [ha](../../../ha/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇱 [he](../../../he/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [hi](../../../hi/docs/compression/EXTENDING_COMPRESSION.md) · 🇭🇷 [hr](../../../hr/docs/compression/EXTENDING_COMPRESSION.md) · 🇭🇺 [hu](../../../hu/docs/compression/EXTENDING_COMPRESSION.md) · 🇦🇲 [hy](../../../hy/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇩 [id](../../../id/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [ig](../../../ig/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇹 [it](../../../it/docs/compression/EXTENDING_COMPRESSION.md) · 🇯🇵 [ja](../../../ja/docs/compression/EXTENDING_COMPRESSION.md) · 🇬🇪 [ka](../../../ka/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇭 [km](../../../km/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [kn](../../../kn/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇷 [ko](../../../ko/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇹 [lt](../../../lt/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇻 [lv](../../../lv/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [mr](../../../mr/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇾 [ms](../../../ms/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇹 [mt](../../../mt/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇲 [my](../../../my/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇵 [ne](../../../ne/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇱 [nl](../../../nl/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇴 [no](../../../no/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [or](../../../or/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [pa](../../../pa/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇭 [phi](../../../phi/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇱 [pl](../../../pl/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇹 [pt](../../../pt/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇴 [ro](../../../ro/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇺 [ru](../../../ru/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇰 [si](../../../si/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇰 [sk](../../../sk/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇮 [sl](../../../sl/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇸 [sr](../../../sr/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇪 [sv](../../../sv/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇪 [sw](../../../sw/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [ta](../../../ta/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [te](../../../te/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇭 [th](../../../th/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇷 [tr](../../../tr/docs/compression/EXTENDING_COMPRESSION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇰 [ur](../../../ur/docs/compression/EXTENDING_COMPRESSION.md) · 🇺🇿 [uz](../../../uz/docs/compression/EXTENDING_COMPRESSION.md) · 🇻🇳 [vi](../../../vi/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [yo](../../../yo/docs/compression/EXTENDING_COMPRESSION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/EXTENDING_COMPRESSION.md)

---

> **ചുരുക്കത്തിൽ**: OmniRoute-ന്റെ കംപ്രഷൻ എഞ്ചിൻ **പ്ലഗ്ഗബിൾ** ആണ് — നിങ്ങൾക്ക് ഇഷ്ടാനുസൃത എഞ്ചിനുകൾ രജിസ്റ്റർ ചെയ്യാനും പുതിയ ഭാഷകൾക്കായി ഭാഷാ പാക്കുകൾ വിതരണം ചെയ്യാനും സ്റ്റാക്ക് ചെയ്ത പൈപ്പ്ലൈനുകൾ സംയോജിപ്പിക്കാനും കഴിയും. അത് എങ്ങനെ ചെയ്യാമെന്ന് ഈ ഗൈഡ് കാണിക്കുന്നു.

**ബന്ധപ്പെട്ട ഗൈഡുകൾ:**

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — പൂർണ്ണ പൈപ്പ്ലൈൻ അവലോകനം
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — എഞ്ചിൻ രജിസ്ട്രിയും ബിൽറ്റ്-ഇൻ എഞ്ചിനുകളും
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — RTK എഞ്ചിനും ഇഷ്ടാനുസൃത ഫിൽട്ടറുകളും
- [COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md) — റൂൾ പാക്ക് ഫോർമാറ്റ് റഫറൻസ്

---

## അവലോകനം

കംപ്രഷൻ സിസ്റ്റത്തിന് **3 വിപുലീകരണ പോയിന്റുകൾ** ഉണ്ട്:

| വിപുലീകരണ പോയിന്റ്             | ഉപയോഗ സാഹചര്യം                                                                            | പ്രയാസനില            |
| ------------------------------ | ----------------------------------------------------------------------------------------- | -------------------- |
| **ഇഷ്ടാനുസൃത എഞ്ചിൻ**          | പൂർണ്ണമായും പുതിയൊരു കംപ്രഷൻ അൽഗോരിതം ചേർക്കുക (ഉദാ., ഡൊമെയ്ൻ-നിർദ്ദിഷ്ട സംഗ്രഹ സംവിധാനം) | ഉയർന്നത്             |
| **ഭാഷാ പാക്ക്**                | ഒരു പുതിയ സ്വാഭാവിക ഭാഷയ്ക്കുള്ള പിന്തുണ ചേർക്കുക (ഉദാ., ഹിന്ദി, അറബിക്)                  | ഇടത്തരം              |
| **സ്റ്റാക്ക് ചെയ്ത പൈപ്പ്ലൈൻ** | നിലവിലുള്ള എഞ്ചിനുകളെ ഇഷ്ടാനുസൃത ക്രമത്തിൽ സംയോജിപ്പിക്കുക                                | തുടക്കക്കാർക്കുള്ളത് |

```
┌─────────────────────────────────────────────────────────────┐
│                    കംപ്രഷൻ തന്ത്രം                            │
│                                                              │
│   ഇൻപുട്ട് സന്ദേശങ്ങൾ ──▶ getEffectiveMode() ──▶ മോഡ്         │
│                                              │               │
│                      ┌───────────────────────┼──────────┐    │
│                      │         │         │         │    │    │
│                      ▼         ▼         ▼         ▼    │    │
│                   "rtk"    "lite"   "standard" "stacked"    │
│                      │         │         │         │    │    │
│                      ▼         ▼         ▼         ▼    │    │
│                   RTK       Lite     Caveman   engines[]   │
│                   എഞ്ചിൻ    എഞ്ചിൻ   എഞ്ചിൻ    ശൃംഖലാബദ്ധം │
│                      │         │         │         │    │    │
│                      └─────────┴─────────┴─────────┘    │    │
│                                      │                    │
│                                      ▼                    │
│                             കംപ്രസ് ചെയ്ത ഔട്ട്പുട്ട്        │
└─────────────────────────────────────────────────────────────┘

തന്ത്രം തിരഞ്ഞെടുക്കുന്നത് മോഡ് അടിസ്ഥാനമാക്കിയുള്ളതാണ്: ഓരോ അഭ്യർത്ഥനയും ഒരു മോഡ് തിരഞ്ഞെടുക്കുന്നു
(rtk / lite / standard / aggressive / ultra / stacked / off).
"stacked" മോഡ് മാത്രമാണ് ഒന്നിലധികം എഞ്ചിനുകളെ ക്രമാനുസൃതമായി ശൃംഖലപ്പെടുത്തുന്നത്.
ഡിഫോൾട്ട് ഓട്ടോ-ട്രിഗർ മോഡ് "lite" ആണ് (3-ടയർ മുൻഗണനാ ശൃംഖലയല്ല).
```

---

## ഒരു ഇഷ്ടാനുസൃത കംപ്രഷൻ എഞ്ചിൻ എഴുതൽ

എല്ലാ എഞ്ചിനുകളും പാലിക്കേണ്ട കരാറാണ് എഞ്ചിൻ ഇന്റർഫേസ് (`open-sse/services/compression/engines/types.ts`). ഇതിന് നിർബന്ധമായ 5 രീതികളുണ്ട്.

### `CompressionEngine` ഇന്റർഫേസ്

```ts
interface CompressionEngine {
  id: string; // അതുല്യമായ എഞ്ചിൻ ID
  name: string; // പ്രദർശന നാമം
  description: string; // ഹ്രസ്വ വിവരണം
  icon: string; // ഐക്കൺ (ഇമോജി അല്ലെങ്കിൽ URL)
  targets: CompressionEngineTarget[]; // ["messages", "tool_results", "code_blocks"]
  stackable: boolean; // സ്റ്റാക്ക് ചെയ്ത പൈപ്പ്ലൈനിൽ ഉപയോഗിക്കാനാകുമോ
  stackPriority: number; // സ്റ്റാക്ക് ചെയ്ത പൈപ്പ്ലൈനുകളിലെ ക്രമം (കുറഞ്ഞത് = നേരത്തേ)
  metadata: CompressionEngineMetadata;

  apply(body, options?): CompressionResult;
  compress(body, config?): CompressionResult;
  getConfigSchema(): EngineConfigField[];
  validateConfig(config): EngineValidationResult;
}
```

### ഏറ്റവും ലളിതമായ ഉദാഹരണം: വൈറ്റ്സ്പേസ് എഞ്ചിൻ

സാധ്യമായതിൽ ഏറ്റവും ലളിതമായ എഞ്ചിൻ — സന്ദേശങ്ങളിൽനിന്ന് അധിക വൈറ്റ്സ്പേസ് നീക്കംചെയ്യുക.

````ts
import type { CompressionEngine } from "omniroute/compression/engines/types";
import { registerCompressionEngine } from "omniroute/compression/engines/registry";

function preserveCodeBlocks(text: string): string {
  // കോഡ് ബ്ലോക്ക് മാർക്കറുകൾ ഉപയോഗിച്ച് വിഭജിക്കുകയും അവയ്ക്കുള്ളിലെ വൈറ്റ്സ്പേസ് അതേപടി നിലനിർത്തുകയും ചെയ്യുക
  const parts = text.split(/(```[\s\S]*?```)/);
  return parts
    .map((part) => {
      if (part.startsWith("```")) {
        return part; // കോഡ് ബ്ലോക്കുകളിൽ മാറ്റം വരുത്തരുത്
      }
      return part.replace(/\n{3,}/g, "\n\n"); // ഗദ്യത്തിന് മാത്രം പ്രയോഗിക്കുക
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
  stackPriority: 100, // caveman/rtk-ന് ശേഷം പ്രവർത്തിപ്പിക്കുക

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

    // സന്ദേശ അറേയിലൂടെ സഞ്ചരിക്കുക — സ്ട്രിങ്, മൾട്ടിപാർട്ട് ഉള്ളടക്കങ്ങൾ രണ്ടും കൈകാര്യം ചെയ്യുക
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
      // മൾട്ടിപാർട്ട് ഉള്ളടക്കം: ഭാഗങ്ങളിലൂടെ സഞ്ചരിച്ച് ടെക്സ്റ്റ് ഭാഗങ്ങൾ മാത്രം കംപ്രസ് ചെയ്യുക
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
          return part; // image_url, tool_use മുതലായവ അതേപടി നിലനിർത്തുക.
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

// ആഗോളമായി രജിസ്റ്റർ ചെയ്യുക
registerCompressionEngine(whitespaceEngine);
````

### ഇഷ്ടാനുസൃത എഞ്ചിനുകൾ എവിടെ സ്ഥാപിക്കണം

```
~/.omniroute/compression/engines/my-engine.ts    # ഉപയോക്തൃ തലം
<project>/compression-engines/my-engine.ts        # പ്രോജക്റ്റ് തലം (ആരംഭിക്കുമ്പോൾ ലോഡ് ചെയ്യപ്പെടുന്നു)
```

അല്ലെങ്കിൽ ഒരു പ്ലഗിനിൽ നിന്ന് പ്രോഗ്രാമാറ്റിക്കായി ലോഡ് ചെയ്യുക:

```ts
// നിങ്ങളുടെ പ്ലഗിനിൽ
import {
  registerCompressionEngine,
  unregisterCompressionEngine,
} from "@omniroute/open-sse/services/compression/engines/registry";
import { myEngine } from "./engines/my-engine";

export default definePlugin({
  name: "my-compression-plugin",
  // പ്ലഗിൻ SDK, onRequest / onResponse / onError ഹുക്കുകൾ ലഭ്യമാക്കുന്നു. പ്ലഗിൻ
  // മൊഡ്യൂൾ ലോഡ് ചെയ്യുമ്പോൾ (അല്ലെങ്കിൽ ആദ്യത്തെ onRequest-ൽ) എഞ്ചിൻ രജിസ്റ്റർ ചെയ്യുക;
  // നിങ്ങളുടെ സ്വന്തം ടീർഡൗൺ പാതയിൽ നിന്ന് അതിന്റെ രജിസ്ട്രേഷൻ നീക്കം ചെയ്യുക.
  onRequest: async (ctx) => {
    registerCompressionEngine(myEngine);
  },
});

// ടീർഡൗൺ ചെയ്യുമ്പോൾ:
// unregisterCompressionEngine("my-engine");
```

### നിങ്ങളുടെ എഞ്ചിൻ പരിശോധിക്കൽ

നിങ്ങളുടെ എഞ്ചിൻ ഒരു പ്ലഗിനിലോ സ്റ്റാർട്ടപ്പ് ഫങ്ഷനിലോ രജിസ്റ്റർ ചെയ്യുക. രജിസ്റ്റർ ചെയ്തുകഴിഞ്ഞാൽ, എഞ്ചിൻ അതിന്റെ `id` വഴി സ്ട്രാറ്റജി സെലക്ടറിൽ ലഭ്യമാകും. ഒരു സ്റ്റാക്ക്ഡ് പൈപ്പ്ലൈനിൽ അത് സംയോജിപ്പിച്ചുകൊണ്ട് ഇന്റഗ്രേഷൻ പരിശോധിക്കുക:

---

## ഭാഷാ പാക്കുകൾ സൃഷ്ടിക്കൽ

ഓരോ സ്വാഭാവിക ഭാഷയിലെയും അനാവശ്യ പദങ്ങൾ, സന്ദേഹപ്രകടനങ്ങൾ, ദീർഘമായ പ്രയോഗരീതികൾ എന്നിവ കൈകാര്യം ചെയ്യാൻ Caveman-ശൈലിയിലുള്ള കംപ്രഷൻ **ഭാഷാ-നിർദ്ദിഷ്ട റൂൾ പാക്കുകൾ** ഉപയോഗിക്കുന്നു. OmniRoute-ൽ **6 ഭാഷാ പാക്കുകൾ** ഉൾപ്പെടുത്തിയിട്ടുണ്ട്: `en`, `es`, `fr`, `de`, `ja`, `pt-BR`.

### പാക്കിന്റെ ഘടന

ഒരു ഭാഷാ പാക്ക് എന്നത് `open-sse/services/compression/rules/<language>/` എന്നതിനുകീഴിലുള്ള **JSON ഫയലുകളുടെ** ഒരു ഡയറക്ടറിയാണ്:

```
open-sse/services/compression/rules/
├── en/
│   ├── filler.json          # അഭിവാദ്യങ്ങൾ, സന്ദേഹപ്രകടനങ്ങൾ, വിനയപ്രയോഗങ്ങൾ
│   ├── context.json         # സന്ദർഭം ചുരുക്കുന്നതിനുള്ള നിയമങ്ങൾ
│   ├── dedup.json           # ആവർത്തനം നീക്കംചെയ്യുന്നതിനുള്ള നിയമങ്ങൾ
│   ├── structural.json      # വിരാമചിഹ്നങ്ങൾ, ഫോർമാറ്റിംഗ്
│   └── ultra.json           # അതിതീവ്ര കംപ്രഷൻ നിയമങ്ങൾ
├── es/  (അതേ ഘടന)
├── fr/  (അതേ ഘടന)
├── de/  (അതേ ഘടന)
├── ja/  (അതേ ഘടന)
└── pt-BR/ (അതേ ഘടന)
```

### നിയമത്തിന്റെ ഘടന

ഓരോ നിയമത്തിനും ഈ രൂപമാണുള്ളത് (`open-sse/services/compression/ruleLoader.ts`-ൽ നിന്ന്):

```ts
interface FileRule {
  name: string; // മനുഷ്യർക്ക് വായിക്കാവുന്ന പേര് (kebab-case)
  pattern: string; // JavaScript regex പാറ്റേൺ
  replacement?: string; // പൊരുത്തപ്പെടുന്ന ഭാഗത്തെ മാറ്റിസ്ഥാപിക്കേണ്ടത്
  replacementMap?: Record<string, string>; // അല്ലെങ്കിൽ ഒരു key→replacement മാപ്പ്
  flags?: string; // Regex ഫ്ലാഗുകൾ (സാധാരണയായി "gi")
  context?: "all" | "user" | "system" | "assistant";
  category?: "filler" | "context" | "structural" | "dedup" | "terse" | "ultra";
  minIntensity?: "lite" | "full" | "ultra"; // ഇതിൽ താഴെയുള്ള തീവ്രതയിൽ ഒഴിവാക്കുക
  description?: string; // ഡോക്യുമെന്റേഷൻ
}
```

### ഉദാഹരണം: ഹിന്ദി Filler നിയമങ്ങൾ ചേർക്കൽ

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
      "description": "'नमस्ते' പോലുള്ള വിനയപൂർവമായ തുടക്കങ്ങൾ നീക്കംചെയ്യുക"
    },
    {
      "name": "filler_actually",
      "pattern": "\\b(?:असल में|वास्तव में|दरअसल)\\b\\s*",
      "replacement": "",
      "context": "all",
      "category": "filler",
      "minIntensity": "lite",
      "description": "'actually' പോലുള്ള അനാവശ്യ പദങ്ങൾ നീക്കംചെയ്യുക"
    },
    {
      "name": "verbose_plea",
      "pattern": "\\b(?:कृपया|कृपया आप|अनुरोध है कि आप)\\b\\s*",
      "replacement": "",
      "context": "all",
      "category": "filler",
      "minIntensity": "full",
      "description": "ഹിന്ദിയിലെ 'please' നീക്കംചെയ്യുക"
    }
  ]
}
```

### സാധൂകരണം

റൂൾ പാക്കുകൾ ലോഡ് ചെയ്യുമ്പോൾ `_schema.json`-നെ അടിസ്ഥാനമാക്കി അവ സാധൂകരിക്കപ്പെടുന്നു. തെറ്റായ ഘടനയുള്ള ഒരു പാക്ക് ലോഡ് ചെയ്യുന്നതിൽ പരാജയപ്പെടുകയും ഒരു പിശക് ലോഗ് ചെയ്യുകയും ചെയ്യും:

```
RULE_LOADER: "hi/filler.json" പാക്കിന്റെ സാധൂകരണം പരാജയപ്പെട്ടു:
  - rules.0.pattern: അസാധുവായ regex
  - rules.1.context: [all, user, system, assistant] എന്നതിൽ ഒന്നായിരിക്കണം
```

ഒരു പാക്ക് ലോഡ് ചെയ്യുമ്പോൾ (`_schema.json`-നെ അടിസ്ഥാനമാക്കി) സാധൂകരണം സ്വയമേവ നടക്കുന്നു; ഒരു
അസാധുവായ പാക്ക് നിരസിക്കപ്പെടുകയും മുകളിലുള്ള പിശക് ലോഗ് ചെയ്യപ്പെടുകയും ചെയ്യും. പാക്ക് സാധൂകരണത്തിനായി
പ്രത്യേക `npm run` സ്ക്രിപ്റ്റ് ഇല്ല — പാക്ക് ലോഡ് ചെയ്യുക (ഉദാ. സെർവർ ആരംഭിക്കുകയോ
കംപ്രഷൻ പാത പ്രവർത്തിപ്പിക്കുകയോ ചെയ്യുക), തുടർന്ന് ലോഗുകൾ നിരീക്ഷിക്കുക.

### ഒരു ഇഷ്ടാനുസൃത ഭാഷാ പാക്ക് ലോഡ് ചെയ്യൽ

```ts
import { loadRulePack } from "omniroute/compression/ruleLoader";

await loadRulePack("./my-custom-rules/hi/filler.json");
```

അല്ലെങ്കിൽ അംഗീകൃത ലൊക്കേഷനിൽ സ്ഥാപിക്കുക:

```
~/.omniroute/compression/rules/hi/filler.json  # ഉപയോക്തൃ-തലം
<project>/.compression/rules/hi/filler.json   # പ്രോജക്റ്റ്-തലം
```

### ഭാഷാ പാക്കുകൾക്കായുള്ള മികച്ച രീതികൾ

1. **`filler` ഉപയോഗിച്ച് ആരംഭിക്കുക** — ഇവയാണ് ഏറ്റവും കൂടുതൽ പ്രഭാവം ചെലുത്തുന്ന നിയമങ്ങൾ
2. **അതിതീവ്ര നിയമങ്ങളെ നിയന്ത്രിക്കാൻ `minIntensity` ഉപയോഗിക്കുക** — അമിതമായ കംപ്രഷനിൽ നിന്ന് ഇത് സംരക്ഷിക്കുന്നു
3. **ടെസ്റ്റ് കേസുകൾ ഉൾപ്പെടുത്തുക** — പ്രവർത്തനം പരിശോധിക്കാൻ JSON-ൽ `tests[]` അറേ ചേർക്കുക
4. **ക്രമം പ്രധാനമാണ്** — മുമ്പുള്ള നിയമങ്ങൾ ആദ്യം പ്രയോഗിക്കപ്പെടുന്നു; കൂടുതൽ പ്രഭാവമുള്ള നിയമങ്ങൾ ആദ്യം സ്ഥാപിക്കുക
5. **`replacement` സൂക്ഷിച്ച് ഉപയോഗിക്കുക** — ശൂന്യമായ സ്ട്രിങ്ങാണ് സാധാരണയായി ശരിയായത്; പുതിയ ഉള്ളടക്കം ഒരിക്കലും ചേർക്കരുത്

### വിവർത്തന തന്ത്രം

റൂൾ പാക്കുകൾ ഒരു പുതിയ ഭാഷയ്ക്കായി പ്രാദേശികവൽക്കരിക്കുമ്പോൾ:

1. **നിയമങ്ങളുടെ പേരുകൾ വിവർത്തനം ചെയ്യുക** — അവ ഡീബഗ് ഔട്ട്പുട്ടിൽ പ്രത്യക്ഷപ്പെടും
2. **regex പാറ്റേണുകൾ അനുയോജ്യമാക്കുക** — നേരിട്ടുള്ള വിവർത്തനം പലപ്പോഴും പരാജയപ്പെടും (പദങ്ങളുടെ അതിരുകൾ വ്യത്യാസപ്പെടുന്നു)
3. **യഥാർത്ഥ സംഭാഷണങ്ങൾ ഉപയോഗിച്ച് പരിശോധിക്കുക** — യഥാർത്ഥ ഇൻപുട്ടിൽ പാക്ക് സുരക്ഷിതമായിരിക്കണം
4. **സാംസ്കാരിക രീതികളുമായി പൊരുത്തപ്പെടുത്തുക** — ഉദാഹരണത്തിന്, ജാപ്പനീസ് പാക്കുകളിൽ ഇംഗ്ലീഷിലേതിനേക്കാൾ കൂടുതൽ ആദരസൂചകമായ അനാവശ്യ പദങ്ങളുണ്ട്

---

## സ്റ്റാക്ക് ചെയ്ത പൈപ്പ്ലൈനുകൾ

ഒരു **സ്റ്റാക്ക് ചെയ്ത പൈപ്പ്ലൈൻ** ഒന്നിലധികം എഞ്ചിനുകളെ ക്രമമായി പ്രവർത്തിപ്പിക്കുന്നു; ഓരോ എഞ്ചിന്റെയും ഔട്ട്പുട്ട് അടുത്ത എഞ്ചിനുള്ള ഇൻപുട്ടായി നൽകപ്പെടുന്നു. `mode: stacked` ആന്തരികമായി പ്രവർത്തിക്കുന്നത് ഇങ്ങനെയാണ്.

### സ്റ്റാക്കിംഗ് എങ്ങനെ പ്രവർത്തിക്കുന്നു

```
ഇൻപുട്ട് (10,000 ടോക്കണുകൾ)
        │
        ▼
   ┌──────────┐
   │  എഞ്ചിൻ  │  മുൻഗണന 10
   │  A       │  ──▶ ഔട്ട്പുട്ട്: 6,000 ടോക്കണുകൾ (-40%)
   └────┬─────┘
        ▼
   ┌──────────┐
   │  എഞ്ചിൻ  │  മുൻഗണന 50
   │  B       │  ──▶ ഔട്ട്പുട്ട്: 2,400 ടോക്കണുകൾ (-60%)
   └────┬─────┘
        ▼
   ┌──────────┐
   │  എഞ്ചിൻ  │  മുൻഗണന 100
   │  C       │  ──▶ ഔട്ട്പുട്ട്: 1,200 ടോക്കണുകൾ (-80%)
   └────┬─────┘
        │
        ▼
അന്തിമ ഔട്ട്പുട്ട് (1,200 ടോക്കണുകൾ, സംയോജിതമായി ~88% ലാഭം)
```

`mode: "stacked"` തിരഞ്ഞെടുക്കുമ്പോൾ, `pipeline` അറേയിൽ വ്യക്തമാക്കിയിരിക്കുന്ന ക്രമത്തിൽ എഞ്ചിനുകൾ ഒന്നിനു പിന്നാലെ ഒന്നായി പ്രവർത്തിക്കുന്നു.
N-ാമത്തെ എഞ്ചിന്റെ ഔട്ട്പുട്ട് N+1-ാമത്തെ എഞ്ചിന്റെ ഇൻപുട്ടായി മാറുന്നു.

### കംപ്രഷൻ മോഡുകൾ

കോൺഫിഗറേഷൻ, ഓട്ടോ-ട്രിഗർ പരിധികൾ, കോംബോ ഓവർറൈഡുകൾ എന്നിവയെ അടിസ്ഥാനമാക്കി OmniRoute **ഓരോ അഭ്യർത്ഥനയ്ക്കും ഒരു മോഡ്** തിരഞ്ഞെടുക്കുന്നു.
ലഭ്യമായ മോഡുകൾ `open-sse/services/compression/types.ts`-ൽ (`CompressionMode` ടൈപ്പ്) നിർവചിച്ചിരിക്കുന്നു:

| മോഡ്         | എഞ്ചിനുകൾ            | ഉപയോഗ സാഹചര്യം                                                                                                                                                                                                                         |
| ------------ | -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `off`        | ഒന്നുമില്ല           | എല്ലാ കംപ്രഷനും പ്രവർത്തനരഹിതമാക്കുക                                                                                                                                                                                                   |
| `rtk`        | RTK മാത്രം           | കമാൻഡ് ഔട്ട്പുട്ട് കൂടുതലുള്ള സെഷനുകൾ (80%+ ലാഭം)                                                                                                                                                                                      |
| `lite`       | Lite മാത്രം          | യാഥാസ്ഥിതിക കംപ്രഷൻ (വേഗതയേറിയത്, സുരക്ഷിതം)                                                                                                                                                                                           |
| `standard`   | Caveman              | ഭാഷാ പാക്കുകളോടുകൂടിയ ഗദ്യ കംപ്രഷൻ                                                                                                                                                                                                     |
| `aggressive` | Caveman + Aggressive | തീവ്രമായ ഗദ്യ കംപ്രഷൻ + തീവ്രമായ അന്തിമ പാസ്                                                                                                                                                                                           |
| `ultra`      | Ultra                | പരമാവധി കംപ്രഷൻ (നഷ്ടസാധ്യതയുള്ളത്, അവസാന ആശ്രയം). `ultra.modelPath` സജ്ജീകരിച്ചിരിക്കുമ്പോൾ, ഐച്ഛികമായി **LLMLingua-2** SLM എഞ്ചിനിലൂടെ റൂട്ട് ചെയ്യപ്പെടുന്നു (മോഡൽ ലഭ്യമല്ലെങ്കിൽ നിയമാധിഷ്ഠിത പാതയിലേക്ക് ഫെയിൽ-ഓപ്പൺ ചെയ്യുന്നു). |
| `stacked`    | ഇഷ്ടാനുസൃത പൈപ്പ്ലൈൻ | എഞ്ചിനുകൾ ഏത് ക്രമത്തിലും സംയോജിപ്പിക്കുക (താഴെ കാണുക)                                                                                                                                                                                 |

> മുകളിലുള്ള മോഡ് എഞ്ചിനുകൾക്ക് പുറമേ, രജിസ്ട്രിയിൽ സ്റ്റാക്ക് ചെയ്യാവുന്ന പ്രത്യേക എഞ്ചിനുകളും ഉൾപ്പെടുത്തിയിട്ടുണ്ട് —
> **CCR**, **headroom**, **ionizer**, **session-dedup** — ഇവയെക്കുറിച്ച്
> [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md#additional-built-in-engines)-ൽ രേഖപ്പെടുത്തിയിരിക്കുന്നു.

മോഡ് തിരഞ്ഞെടുക്കുന്നത് `open-sse/services/compression/strategySelector.ts`-ലെ `getEffectiveMode()` ആണ് നിർണ്ണയിക്കുന്നത്:

1. കംപ്രഷൻ പ്രവർത്തനരഹിതമാണെങ്കിൽ: `"off"`
2. ഒരു കോംബോ ഓവർറൈഡ് നിലവിലുണ്ടെങ്കിൽ: ആ ഓവർറൈഡ് ഉപയോഗിക്കുക
3. ഓട്ടോ-ട്രിഗർ പരിധി കവിഞ്ഞാൽ: `autoTriggerMode` ഉപയോഗിക്കുക (ഡിഫോൾട്ട്: `"lite"`)
4. അല്ലാത്തപക്ഷം: `defaultMode` ഉപയോഗിക്കുക

### ഡിഫോൾട്ട് സ്റ്റാക്ക് ചെയ്ത പൈപ്പ്ലൈൻ

`mode: "stacked"` വ്യക്തമായി കോൺഫിഗർ ചെയ്തിരിക്കുമ്പോൾ, ഡിഫോൾട്ട് പൈപ്പ്ലൈൻ ഇനിപ്പറയുന്നവ സംയോജിപ്പിക്കുന്നു:

1. **RTK** — കമാൻഡ് ഔട്ട്പുട്ടിലെ അനാവശ്യ ഭാഗങ്ങൾ നീക്കം ചെയ്യുന്നു (ടെർമിനൽ ഔട്ട്പുട്ടിൽ ~80% ലാഭം)
2. **Caveman** — അനാവശ്യ പദങ്ങൾ നീക്കം ചെയ്ത് ഗദ്യം സംക്ഷിപ്തമാക്കുന്നു (ശേഷിക്കുന്ന ടെക്സ്റ്റിൽ ~46%)
3. **Lite** — അന്തിമ വൈറ്റ്സ്പേസ് + ഡീഡ്യൂപ്ലിക്കേഷൻ പാസ്

ഈ സംയോജനം ടൂളുകൾ കൂടുതലായി ഉപയോഗിക്കുന്ന സെഷനുകളിൽ **78-95% ലാഭം** കൈവരിക്കുന്നു.

### സ്റ്റാക്ക് ചെയ്ത പൈപ്പ്ലൈനുകൾ കോൺഫിഗർ ചെയ്യൽ

കോംബോ കോൺഫിഗിൽ:

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

നിങ്ങൾക്ക് എഞ്ചിനുകൾ ഒഴിവാക്കാനോ, ഇഷ്ടാനുസൃത എഞ്ചിനുകൾ ചേർക്കാനോ, അവയുടെ ക്രമം മാറ്റാനോ കഴിയും.

### സ്റ്റേറ്റ് കൈമാറ്റം

എഞ്ചിനുകൾക്ക് അഭ്യർത്ഥനാ കോൺടെക്സ്റ്റിലെ (`options`-ലുള്ള) മെറ്റാഡാറ്റ വായിക്കാനാകും:

```ts
compress(body, config) {
  // മുമ്പത്തെ എഞ്ചിനുകളിൽ നിന്നുള്ള മെറ്റാഡാറ്റ വായിക്കുക
  const original = options?.compressionComboId;  // "my-coding-combo"
  // ...
}
```

മെറ്റാഡാറ്റ **വായിക്കാൻ മാത്രം കഴിയുന്നതാണ്** — എഞ്ചിനുകൾക്ക് അഭ്യർത്ഥനാ കോൺടെക്സ്റ്റിൽ മാറ്റം വരുത്താനാകില്ല; സ്വന്തം ബോഡി ഔട്ട്പുട്ടിൽ മാത്രമേ മാറ്റം വരുത്താനാകൂ.

### നിർവ്വഹണ ക്രമത്തിലെ ശ്രദ്ധിക്കേണ്ട കാര്യങ്ങൾ

| എഞ്ചിൻ ക്രമം                          | ഫലം                                                                                                                      |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| RTK → Caveman → Lite                  | **ശുപാർശ ചെയ്യുന്നത്** (ആദ്യം അനാവശ്യ ഭാഗങ്ങൾ, തുടർന്ന് ഭാഷാപരമായ ഭാഗങ്ങൾ, ഒടുവിൽ വൈറ്റ്സ്പേസ് എന്നിവ നീക്കം ചെയ്യുന്നു) |
| Lite → RTK → Caveman                  | മോശം — Lite അസംസ്കൃത ഔട്ട്പുട്ടിൽനിന്ന് വൈറ്റ്സ്പേസ് നീക്കം ചെയ്യുന്നതിനാൽ RTK പാറ്റേൺ മാച്ചിംഗ് പരാജയപ്പെടുന്നു         |
| Caveman → RTK                         | മോശം — RTK-യ്ക്ക് തിരിച്ചറിയാനാകാത്ത വിധത്തിൽ Caveman ടെക്സ്റ്റ് മാറ്റിയെഴുതിയേക്കാം                                     |
| ആദ്യം `tool_results` ഉള്ള ഏത് ക്രമവും | മെച്ചം — ടൂൾ ഔട്ട്പുട്ടിലാണ് ഏറ്റവും കൂടുതൽ അനാവശ്യ ഉള്ളടക്കമുള്ളത്                                                      |

### സ്റ്റാക്കിംഗ് ഉപയോഗിക്കരുതാത്ത സാഹചര്യങ്ങൾ

സ്റ്റാക്കിംഗ് എല്ലായ്പ്പോഴും മികച്ചതാകണമെന്നില്ല:

- **ലളിതമായ സന്ദേശങ്ങൾ** (ടൂൾ ഔട്ട്പുട്ട് ഇല്ലാത്തവ) — Caveman അല്ലെങ്കിൽ Lite മാത്രം മതിയാകും
- **ചെലവിനോട് സംവേദനക്ഷമമായ സാഹചര്യങ്ങൾ** — ഓരോ എഞ്ചിനും ~5-50ms ലേറ്റൻസി കൂട്ടിച്ചേർക്കുന്നു
- **നിർദ്ദിഷ്ട ടൂളുകൾ** — ഷെൽ ഔട്ട്പുട്ടിന് സാധാരണയായി RTK മാത്രം മതിയാകും

### ഒരു ഇഷ്ടാനുസൃത പൈപ്പ്ലൈൻ നിർമ്മിക്കൽ

നാമകരണം ചെയ്ത പൈപ്പ്ലൈൻ രജിസ്ട്രി ഇല്ല. സ്റ്റാക്ക് ചെയ്ത പൈപ്പ്ലൈൻ എന്നത് `applyStackedCompression()`-ലേക്ക് കൈമാറുന്ന **സ്റ്റെപ്പുകളുടെ ഇൻലൈൻ അറേ** മാത്രമാണ് (`@omniroute/open-sse/services/compression/strategySelector`-ൽ നിന്ന് എക്സ്പോർട്ട് ചെയ്തത്):

```ts
import { applyStackedCompression } from "@omniroute/open-sse/services/compression/strategySelector";

const result = applyStackedCompression(body, [
  { engine: "rtk", intensity: "aggressive" },
  { engine: "caveman", intensity: "full" },
]);
```

നിങ്ങൾ ഒരു പൈപ്പ്ലൈൻ കൈമാറാത്തപ്പോൾ, അത് ഡിഫോൾട്ടായി `rtk(standard) → caveman(full)` ഉപയോഗിക്കുന്നു.

കോൺഫിഗിൽ നിന്ന് ഇത് നിയന്ത്രിക്കാൻ, `mode: "stacked"` സജ്ജമാക്കി സ്റ്റെപ്പ് അറേ `stackedPipeline`-ന് കീഴിൽ നൽകുക (`config.stackedPipeline`-ൽ നിന്ന് വായിക്കുന്നു):

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

## അപ്സ്ട്രീം സമന്വയ നയം

OmniRoute-ന്റെ കംപ്രഷൻ എഞ്ചിനുകൾ README-യിൽ നിരവധി അപ്സ്ട്രീം പ്രോജക്റ്റുകൾക്ക് അംഗീകാരം നൽകുന്നു
("RTK, Caveman, LLMLingua-2, Troglodita എന്നിവയിൽ നിന്ന് പ്രചോദനം ഉൾക്കൊണ്ടത്"). സംഭാവകരുടെ ഒരു സാധാരണ
ചോദ്യം ഇതാണ്: **അപ്സ്ട്രീം RTK ഒരു പുതിയ ടൂൾ ഫിൽട്ടർ ചേർക്കുമ്പോഴോ Caveman ഒരു റൂൾ
പാക്ക് ചേർക്കുമ്പോഴോ, അത് OmniRoute-ലേക്ക് എങ്ങനെ എത്തുന്നു?** ഈ വിഭാഗമാണ് അതിനുള്ള ആധികാരിക ഉത്തരം.

### വെൻഡർ ചെയ്ത പകർപ്പുകളും സ്വതന്ത്ര നിർവഹണങ്ങളും

| എഞ്ചിൻ                       | അപ്സ്ട്രീമുമായുള്ള ബന്ധം                                                                                                                                              | സ്ഥാനം                                                              |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| **RTK**                      | **സ്വതന്ത്ര പുനർനിർവഹണം** (പ്രചോദനം ഉൾക്കൊണ്ടത്, പകർപ്പല്ല)                                                                                                           | `open-sse/services/compression/engines/rtk/`                        |
| **Caveman**                  | **സ്വതന്ത്ര പുനർനിർവഹണം** (പ്രചോദനം ഉൾക്കൊണ്ടത്)                                                                                                                      | `open-sse/services/compression/engines/cavemanAdapter.ts`           |
| **Headroom**                 | മിക്കവാറും ആന്തരികം; `gcf/` കോഡെക് മാത്രമാണ് `gcf-typescript`-ൽ നിന്ന് **യഥാർത്ഥത്തിൽ വെൻഡർ ചെയ്തിരിക്കുന്നത്** (MIT, SPDX-അടയാളപ്പെടുത്തിയത്, ജനറിക് പ്രൊഫൈൽ മാത്രം) | `open-sse/services/compression/engines/headroom/gcf/`               |
| **LLMLingua-2 / Troglodita** | പ്രചോദനം ഉൾക്കൊണ്ടത് (`llmlingua` + `session-dedup` എഞ്ചിനുകളെ നയിക്കുന്നു)                                                                                           | `open-sse/services/compression/engines/llmlingua/`, `session-dedup` |

പ്രധാന കാര്യം: **RTK, Caveman എന്നിവ _ആശയങ്ങളുടെ_ (ഫിൽട്ടർ നിയമങ്ങൾ, റൂൾ പാക്കുകൾ)
ക്ലീൻ-റൂം TypeScript നിർവഹണങ്ങളാണ്; വെൻഡർ ചെയ്ത സോഴ്സ് ട്രീകളല്ല.** `git pull`
ചെയ്യാൻ അപ്സ്ട്രീം പകർപ്പൊന്നുമില്ല — അതുകൊണ്ടുതന്നെയാണ് README-യിൽ
"bundled" എന്നതിനുപകരം "inspired by" എന്ന് പറയുന്നത്.

### അപ്സ്ട്രീം മെച്ചപ്പെടുത്തലുകൾ എങ്ങനെ ലയിപ്പിക്കുന്നു

രൂപകൽപ്പനപ്രകാരം **ഓട്ടോമേറ്റഡ് അപ്സ്ട്രീം-റിലീസ് ട്രാക്കിങ്ങോ `compression-sync`
ലേബലോ ഇല്ല**. എഞ്ചിനുകൾ പുനർനിർവഹണങ്ങളായതിനാൽ, അപ്സ്ട്രീം RTK
ഫിൽട്ടറോ Caveman റൂൾ പാക്കോ കോഡായി ലയിപ്പിക്കാറില്ല; പകരം അത് **OmniRoute-ന്റെ സ്വന്തം
ഫോർമാറ്റിലുള്ള ഒരു പുതിയ റൂൾ/ഫിൽട്ടറായി പുനരാവിഷ്കരിക്കുന്നു** ([COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md)
കാണുക), തുടർന്ന് ഒരു സാധാരണ PR വഴി ആവശ്യാനുസരണം ഉൾപ്പെടുത്തുന്നു.
മുകളിലുള്ള എക്സ്റ്റൻഷൻ പോയിന്റുകളാണ് (കസ്റ്റം എഞ്ചിൻ, ലാംഗ്വേജ് പാക്ക്, RTK ഫിൽട്ടർ)
അത്തരം സംഭാവനകൾ നൽകുന്നതിനുള്ള അംഗീകൃത മാർഗം.

ഈ പ്രവാഹത്തിന്റെ സമീപകാല ഉദാഹരണങ്ങൾ:

- Gradle, `dotnet` ബിൽഡ് ഔട്ട്പുട്ടിനായുള്ള RTK ഫിൽട്ടറുകൾ (v3.8.42)
- kubectl / docker-build / composer / gh എന്നിവയ്ക്കുള്ള RTK ഫിൽട്ടറുകൾ (#2824)
- Caveman ഇന്തോനേഷ്യൻ ലാംഗ്വേജ് പാക്ക് (#3975), കൂടാതെ ജർമ്മൻ / ഫ്രഞ്ച് / ജാപ്പനീസ് / ചൈനീസ് പാക്കുകൾ

### Headroom (ഇൻപുട്ട്-കംപ്രഷൻ പ്രോക്സി)

Headroom **പൂർണ്ണമായും ആന്തരികമാണ്** — പിൻ ചെയ്ത, വെൻഡർ ചെയ്ത `gcf` കോഡെക് സ്നാപ്പ്ഷോട്ടിനൊപ്പം
OmniRoute-ന്റെ സ്വന്തം `smartcrusher` / `toon` / `tabular` ലെയറുകളും ഉൾപ്പെടുന്നു. വെൻഡർ ചെയ്ത
പകർപ്പിനപ്പുറം ട്രാക്ക് ചെയ്യാൻ സജീവമായ അപ്സ്ട്രീം ഒന്നുമില്ല; കോഡെക് മാറുമ്പോൾ `gcf`-ലേക്കുള്ള
അപ്ഡേറ്റുകൾ മാനുവലായി പുതുക്കുകയും കംപ്രഷൻ ബജറ്റ് ഗേറ്റിനെതിരെ
(`check:compression-budget`) വീണ്ടും സാധൂകരിക്കുകയും ചെയ്യുന്നു.

### അപ്സ്ട്രീമിൽ നിന്ന് പ്രചോദനം ഉൾക്കൊണ്ട ഒരു മെച്ചപ്പെടുത്തൽ നിർദേശിക്കൽ

1. **വെൻഡർ ചെയ്യരുത്** — അപ്സ്ട്രീം റൂൾ/ഫിൽട്ടർ OmniRoute-ന്റെ ഫോർമാറ്റിൽ പുനരാവിഷ്കരിക്കുക.
2. ചുവടെയുള്ള പൊരുത്തപ്പെടുന്ന എക്സ്റ്റൻഷൻ പോയിന്റ് വഴി അത് ചേർക്കുക (ലാംഗ്വേജ് പാക്ക്, RTK ഫിൽട്ടർ, അല്ലെങ്കിൽ
   കസ്റ്റം എഞ്ചിൻ).
3. ലൈസൻസ് ഉൾക്കൊള്ളുന്ന സോഴ്സ് പകർത്തുന്നതിനുപകരം, PR വിവരണത്തിൽ അപ്സ്ട്രീം പ്രോജക്റ്റിനെ പരാമർശിക്കുക (അംഗീകാരം).
4. ടെസ്റ്റുകൾ ഉൾപ്പെടുത്തുകയും `check:compression-budget` ഗേറ്റ് തുടർന്നും വിജയിക്കുന്നുവെന്ന് സ്ഥിരീകരിക്കുകയും ചെയ്യുക.

---

## ഒരു ഔട്ട്പുട്ട് ശൈലി ചേർക്കൽ

ഔട്ട്പുട്ട് ശൈലികൾ ([ഗൈഡിലെ കാറ്റലോഗ് പട്ടിക](./COMPRESSION_GUIDE.md#output-styles-catalog) കാണുക)
ഇൻപുട്ട് എഞ്ചിനുകളുടെ പ്രതികരണ-വശത്തുള്ള പ്രതിരൂപമാണ്: നിങ്ങൾ അയയ്ക്കുന്നത് കംപ്രസ് ചെയ്യുന്നതിനുപകരം,
കുറഞ്ഞ ചെലവിലുള്ള ഔട്ട്പുട്ട് സൃഷ്ടിക്കാൻ അവ മോഡലിന് നിർദ്ദേശം നൽകുന്നു. രജിസ്ട്രി
`open-sse/services/compression/outputStyles/catalog.ts`-ലെ `OUTPUT_STYLE_CATALOG` ആണ്, കൂടാതെ
**ഒരു കാറ്റലോഗ് എൻട്രിയാണ് മുഴുവൻ ഫീച്ചറും**: ഇൻജക്ടർ, ഡാഷ്ബോർഡ് ക്രമീകരണ പാനൽ,
പെർസിസ്റ്റൻസ്, ടെലിമെട്രി എന്നിവയെല്ലാം കാറ്റലോഗിനെ എന്യുമറേറ്റ് ചെയ്യുന്നു — അപ്ഡേറ്റ് ചെയ്യേണ്ട മറ്റൊരു പട്ടികയില്ല.

1. **`OUTPUT_STYLE_CATALOG`-ലേക്ക് ഒരു എൻട്രി ചേർക്കുക**, അതിൽ `id`, `label`, `description`, കൂടാതെ
   ഇംഗ്ലീഷിലുള്ള മൂന്ന് `levels` (`lite`, `full`, `ultra`) ഉണ്ടായിരിക്കണം. കോഡ്, പാതകൾ, കമാൻഡുകൾ,
   പിശകുകൾ, URL-കൾ എന്നിവ മാറ്റമില്ലാതെ നിലനിർത്താൻ ഓരോ ലെവലും `${SHARED_BOUNDARIES}`-ൽ അവസാനിക്കണം.
   നിർദ്ദേശ ടെക്സ്റ്റ് ഓരോ `(id, level, language)`-നും **സ്ഥിരവും നിർണ്ണായകവുമായിരിക്കണം** —
   `${SHARED_BOUNDARIES}` മാത്രമാണ് അനുവദനീയമായ ഇന്റർപൊളേഷൻ.
2. **അത് വിവർത്തനം ചെയ്യുക.** `i18n`-ന് കീഴിൽ കുറഞ്ഞത് ഒരു `pt-BR` ബ്ലോക്കെെങ്കിലും ഉൾപ്പെടുത്തുക; `ponytail`,
   `i-have-adhd` (en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi) എന്നിവയാണ് റഫറൻസ് ഘടന. മനഃപൂർവം
   ഒറ്റ ഭാഷ മാത്രമുള്ള ഒരു ശൈലി പകരം `locale` സജ്ജീകരിക്കുന്നു (`terse-cjk` → `zh` പോലെ), തുടർന്ന്
   ആ ലോക്കേലിൽ മാത്രമേ അത് ലഭ്യമാക്കൂ.
3. **മാട്രിക്സ് ഗാർഡ് അപ്ഡേറ്റ് ചെയ്യുക** — ശൈലിയുടെ ഭാഷകൾ
   `tests/unit/compression/output-styles-i18n-matrix.test.ts`-ലെ `BASELINE_LANGUAGES`-ലേക്ക് ചേർക്കുക.
   വ്യക്തമായ ഒരു ട്രാക്കിംഗ് ഇഷ്യൂ സഹിതമുള്ള `KNOWN_ENGLISH_ONLY` എൻട്രി ഇല്ലെങ്കിൽ, ആവശ്യമായ വിവർത്തനങ്ങളില്ലാത്ത
   ഏതൊരു പുതിയ non-locale-gated ശൈലിയെയും ഗേറ്റ് പരാജയപ്പെടുത്തും.
4. **ഓരോ ശൈലിക്കുമായി ഒരു ടെസ്റ്റ് ചേർക്കുക**, ഇത്
   `tests/unit/compression/i-have-adhd-catalog.test.ts` മാതൃകയാക്കിയിരിക്കണം: കാറ്റലോഗ് ഘടന, ഓരോ ലെവലിലെയും
   ബൗണ്ടറീസ് ക്ലോസ്, കൂടാതെ ഓരോ വിവർത്തനവും ഇംഗ്ലീഷ് പകർത്തിയതല്ലെന്നും അതത് ഭാഷയിൽ തന്നെയാണ് എഴുതിയിരിക്കുന്നതെന്നും
   ഉറപ്പാക്കുന്ന ഒരു ആങ്കർ.
5. **കടപ്പാട്**: ശൈലി ഒരു അപ്സ്ട്രീം പ്രോജക്റ്റിൽ നിന്ന് അനുരൂപപ്പെടുത്തിയതാണെങ്കിൽ, എൻട്രിയിലെ ഒരു
   സോഴ്സ് കമന്റിൽ അതിന് കടപ്പാട് നൽകുക (ഉദാ. `i-have-adhd` → ayghri/i-have-adhd, MIT) — മുകളിലെ
   "Proposing an upstream-inspired improvement" എന്നതിനുള്ള അതേ നിയമം ബാധകമാണ്.

UI, സ്കീമ അല്ലെങ്കിൽ ടെലിമെട്രി മാറ്റങ്ങളൊന്നും ആവശ്യമില്ല — ആ ഉപരിതലങ്ങൾ കാറ്റലോഗിൽ നിന്നാണ് റെൻഡർ ചെയ്യുന്നത്.

---

## മികച്ച രീതികൾ

### എഞ്ചിൻ വികസനം

1. **എപ്പോഴും `validateConfig` നടപ്പിലാക്കുക** — വാലിഡേഷൻ ഇല്ലാത്ത എഞ്ചിനുകൾ നിശ്ശബ്ദമായ പരാജയങ്ങൾക്ക് കാരണമാകുന്നു
2. **യാഥാർഥ്യബോധമുള്ള `targetLatencyMs` സജ്ജീകരിക്കുക** — എഞ്ചിനുകൾ തിരഞ്ഞെടുക്കാൻ സ്ട്രാറ്റജി സെലക്ടർ ഇത് ഉപയോഗിക്കുന്നു
3. **ഡാഷ്ബോർഡിനായി `getConfigSchema` ഉപയോഗിക്കുക** — ഉപയോക്താക്കളിൽ നിന്ന് കോൺഫിഗ് ഒരിക്കലും മറയ്ക്കരുത്
4. **നിങ്ങളുടെ എഞ്ചിൻ പ്യൂർ ആണെങ്കിൽ `stackable: true` പിന്തുണയ്ക്കുക** — സൈഡ് ഇഫക്റ്റുകളുള്ള എഞ്ചിനുകൾ സ്റ്റാക്ക് ചെയ്യരുത്
5. **ഇൻലൈൻ ടെസ്റ്റുകൾ എഴുതുക** — എഞ്ചിനുകൾ <1s-ൽ പരിശോധിക്കാൻ കഴിയണം

### ലാംഗ്വേജ് പാക്ക് വികസനം

1. **`lite` തീവ്രതയിൽ ആരംഭിക്കുക** — ഏറ്റവും കുറഞ്ഞ ക്രമീകരണത്തിൽ നിങ്ങളുടെ നിയമങ്ങൾ സുരക്ഷിതമായിരിക്കണം
2. **നിയമങ്ങളുടെ പരിധി നിർണ്ണയിക്കാൻ `context` ഉപയോഗിക്കുക** — `user`-ന് മാത്രമുള്ള നിയമങ്ങൾ അബദ്ധത്തിൽ സിസ്റ്റം പ്രോംപ്റ്റുകളെ ബാധിക്കില്ല
3. **JSON കീകൾ ക്യാപ്ചർ ചെയ്യുന്നത് ഒഴിവാക്കുക** — `\\bword\\b`-ന് JSON-നുള്ളിൽ പൊരുത്തപ്പെടാനും ഘടനാബദ്ധമായ ഡാറ്റ തകർക്കാനും കഴിയും
4. **എഡ്ജ് കേസുകൾ ഉപയോഗിച്ച് പരിശോധിക്കുക** — ശൂന്യമായ ഇൻപുട്ട്, unicode, RTL ടെക്സ്റ്റ്, ഇമോജികൾ
5. **നിലവിലുള്ള പാക്കുകൾ ടെംപ്ലേറ്റുകളായി ഉപയോഗിക്കുക** — `en/filler.json` ആണ് ഏറ്റവും കൂടുതൽ വികസിപ്പിച്ച ഉദാഹരണം

### പൈപ്പ്ലൈൻ രൂപകൽപ്പന

1. **ഒപ്റ്റിമൈസ് ചെയ്യുന്നതിന് മുമ്പ് പ്രൊഫൈൽ ചെയ്യുക** — ആദ്യം `compression_stats` ഉപയോഗിച്ച് അളക്കുക
2. **വീണ്ടും നടപ്പിലാക്കുന്നതിനേക്കാൾ കോംപോസിഷന് മുൻഗണന നൽകുക** — പുതിയൊരു എഞ്ചിൻ എഴുതുന്നതിന് മുമ്പ് Caveman നിയമങ്ങൾ വിപുലീകരിക്കുക
3. **ക്രമത്തിന്റെ യുക്തി രേഖപ്പെടുത്തുക** — എഞ്ചിൻ B-യ്ക്ക് മുമ്പ് എഞ്ചിൻ A വരുന്നത് എന്തുകൊണ്ടെന്ന് കമന്റിൽ വിശദീകരിക്കുക
4. **മൂന്ന് തീവ്രതാ ലെവലുകളിലും പരിശോധിക്കുക** — `lite` വേഗമേറിയതെങ്കിലും വിവരനഷ്ടമുണ്ടാക്കാം, `ultra` മന്ദഗതിയിലുള്ളതെങ്കിലും കൃത്യമാണ്

---

## റഫറൻസ്: ബിൽറ്റ്-ഇൻ എഞ്ചിനുകൾ

| എഞ്ചിൻ ID            | സ്റ്റാക്ക് ചെയ്യാവുന്നത് | ഡിഫോൾട്ട് stackPriority | ലക്ഷ്യങ്ങൾ                              |
| -------------------- | ------------------------ | ----------------------- | --------------------------------------- |
| `lite`               | അതെ                      | 5                       | സന്ദേശങ്ങൾ, ടൂൾ ഫലങ്ങൾ                  |
| `rtk`                | അതെ                      | 10                      | ടൂൾ ഫലങ്ങൾ                              |
| `standard` (caveman) | അതെ                      | 20                      | സന്ദേശങ്ങൾ, ടൂൾ ഫലങ്ങൾ, കോഡ് ബ്ലോക്കുകൾ |
| `aggressive`         | അതെ                      | 30                      | സന്ദേശങ്ങൾ                              |
| `ultra`              | അതെ                      | 40                      | സന്ദേശങ്ങൾ, കോഡ് ബ്ലോക്കുകൾ             |

### ഇതും കാണുക

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — പൈപ്പ്ലൈൻ അവലോകനം
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — എഞ്ചിൻ രജിസ്ട്രി റഫറൻസ്
- [COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md) — റൂൾ ഫോർമാറ്റ് സ്പെസിഫിക്കേഷൻ
- [COMPRESSION_LANGUAGE_PACKS.md](./COMPRESSION_LANGUAGE_PACKS.md) — ലാംഗ്വേജ് പാക്ക് വിശദാംശങ്ങൾ
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — RTK എഞ്ചിനും കസ്റ്റം ഫിൽട്ടറുകളും
- ഉറവിടം: `open-sse/services/compression/` (117 ഫയലുകൾ, ~250KB)
