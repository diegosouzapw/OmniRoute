# Extending the Compression Pipeline (සිංහල)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/EXTENDING_COMPRESSION.md) · 🇪🇹 [am](../../../am/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇦 [ar](../../../ar/docs/compression/EXTENDING_COMPRESSION.md) · 🇦🇿 [az](../../../az/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇬 [bg](../../../bg/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇩 [bn](../../../bn/docs/compression/EXTENDING_COMPRESSION.md) · 🇨🇿 [cs](../../../cs/docs/compression/EXTENDING_COMPRESSION.md) · 🇩🇰 [da](../../../da/docs/compression/EXTENDING_COMPRESSION.md) · 🇩🇪 [de](../../../de/docs/compression/EXTENDING_COMPRESSION.md) · 🇬🇷 [el](../../../el/docs/compression/EXTENDING_COMPRESSION.md) · 🇪🇸 [es](../../../es/docs/compression/EXTENDING_COMPRESSION.md) · 🇪🇪 [et](../../../et/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇷 [fa](../../../fa/docs/compression/EXTENDING_COMPRESSION.md) · 🇫🇮 [fi](../../../fi/docs/compression/EXTENDING_COMPRESSION.md) · 🇫🇷 [fr](../../../fr/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇪 [ga](../../../ga/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [gu](../../../gu/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [ha](../../../ha/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇱 [he](../../../he/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [hi](../../../hi/docs/compression/EXTENDING_COMPRESSION.md) · 🇭🇷 [hr](../../../hr/docs/compression/EXTENDING_COMPRESSION.md) · 🇭🇺 [hu](../../../hu/docs/compression/EXTENDING_COMPRESSION.md) · 🇦🇲 [hy](../../../hy/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇩 [id](../../../id/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [ig](../../../ig/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇹 [it](../../../it/docs/compression/EXTENDING_COMPRESSION.md) · 🇯🇵 [ja](../../../ja/docs/compression/EXTENDING_COMPRESSION.md) · 🇬🇪 [ka](../../../ka/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇭 [km](../../../km/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [kn](../../../kn/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇷 [ko](../../../ko/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇹 [lt](../../../lt/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇻 [lv](../../../lv/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [ml](../../../ml/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [mr](../../../mr/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇾 [ms](../../../ms/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇹 [mt](../../../mt/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇲 [my](../../../my/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇵 [ne](../../../ne/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇱 [nl](../../../nl/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇴 [no](../../../no/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [or](../../../or/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [pa](../../../pa/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇭 [phi](../../../phi/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇱 [pl](../../../pl/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇹 [pt](../../../pt/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇴 [ro](../../../ro/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇺 [ru](../../../ru/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇰 [sk](../../../sk/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇮 [sl](../../../sl/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇸 [sr](../../../sr/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇪 [sv](../../../sv/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇪 [sw](../../../sw/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [ta](../../../ta/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [te](../../../te/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇭 [th](../../../th/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇷 [tr](../../../tr/docs/compression/EXTENDING_COMPRESSION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇰 [ur](../../../ur/docs/compression/EXTENDING_COMPRESSION.md) · 🇺🇿 [uz](../../../uz/docs/compression/EXTENDING_COMPRESSION.md) · 🇻🇳 [vi](../../../vi/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [yo](../../../yo/docs/compression/EXTENDING_COMPRESSION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/EXTENDING_COMPRESSION.md)

---

> **සාරාංශය**: OmniRoute හි සම්පීඩන එන්ජිම **ප්ලග් කළ හැකි** එකකි — ඔබට අභිරුචි එන්ජින් ලියාපදිංචි කිරීමට, නව භාෂා සඳහා භාෂා පැකේජ නිකුත් කිරීමට සහ ස්ථරගත නළ මාර්ග සංයෝජනය කිරීමට හැකිය. මෙම මාර්ගෝපදේශය එය කරන ආකාරය පෙන්වයි.

**අදාළ මාර්ගෝපදේශ:**

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — සම්පූර්ණ නළ මාර්ග දළ විශ්ලේෂණය
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — එන්ජින් ලේඛනය සහ ඇතුළත් කළ එන්ජින්
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — RTK එන්ජිම සහ අභිරුචි පෙරහන්
- [COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md) — රීති පැකේජ ආකෘති යොමුව

---

## දළ විශ්ලේෂණය

සම්පීඩන පද්ධතියේ **විස්තාරණ ලක්ෂ්ය 3ක්** ඇත:

| විස්තාරණ ලක්ෂ්යය     | භාවිත අවස්ථාව                                                                      | දුෂ්කරතාව |
| -------------------- | ---------------------------------------------------------------------------------- | --------- |
| **අභිරුචි එන්ජිම**   | සම්පූර්ණයෙන්ම නව සම්පීඩන ඇල්ගොරිතමයක් එක් කිරීම (උදා., ක්ෂේත්ර-විශේෂිත සාරාංශකයක්) | උසස්      |
| **භාෂා පැකේජය**      | නව ස්වාභාවික භාෂාවක් සඳහා සහාය එක් කිරීම (උදා., හින්දි, අරාබි)                     | මධ්යම     |
| **ස්ථරගත නළ මාර්ගය** | පවතින එන්ජින් අභිරුචි අනුපිළිවෙළකට සංයෝජනය කිරීම                                   | ආරම්භක    |

```
┌─────────────────────────────────────────────────────────────┐
│                    සම්පීඩන උපායමාර්ගය                       │
│                                                              │
│   ආදාන පණිවිඩ ──▶ getEffectiveMode() ──▶ ප්රකාරය           │
│                                              │               │
│                      ┌───────────────────────┼──────────┐    │
│                      │         │         │         │    │    │
│                      ▼         ▼         ▼         ▼    │    │
│                   "rtk"    "lite"   "standard" "stacked"    │
│                      │         │         │         │    │    │
│                      ▼         ▼         ▼         ▼    │    │
│                   RTK       Lite     Caveman   engines[]   │
│                   එන්ජිම    එන්ජිම    එන්ජිම    දාමගත      │
│                      │         │         │         │    │    │
│                      └─────────┴─────────┴─────────┘    │    │
│                                      │                    │
│                                      ▼                    │
│                             සම්පීඩිත ප්රතිදානය             │
└─────────────────────────────────────────────────────────────┘

උපායමාර්ග තේරීම්කාරකය ප්රකාරය මත පදනම් වේ: සෑම ඉල්ලීමක්ම එක් ප්රකාරයක් තෝරයි
(rtk / lite / standard / aggressive / ultra / stacked / off).
එන්ජින් කිහිපයක් අනුක්රමිකව දාමගත කරන්නේ "stacked" ප්රකාරය පමණි.
පෙරනිමි ස්වයංක්රීය-ක්රියාත්මක ප්රකාරය "lite" වේ (ස්ථර 3ක ප්රමුඛතා දාමයක් නොවේ).
```

---

## අභිරුචි සම්පීඩන එන්ජිමක් ලිවීම

එන්ජින් අතුරුමුහුණත (`open-sse/services/compression/engines/types.ts`) යනු සෑම එන්ජිමක්ම සපුරාලිය යුතු ගිවිසුමයි. එයට අනිවාර්ය ක්රම 5ක් ඇත.

### `CompressionEngine` අතුරුමුහුණත

```ts
interface CompressionEngine {
  id: string; // අනන්ය එන්ජින් ID
  name: string; // දර්ශන නාමය
  description: string; // කෙටි විස්තරය
  icon: string; // නිරූපකය (emoji හෝ URL)
  targets: CompressionEngineTarget[]; // ["messages", "tool_results", "code_blocks"]
  stackable: boolean; // ස්ථරගත නළ මාර්ගයක භාවිත කළ හැකිද
  stackPriority: number; // ස්ථරගත නළ මාර්ගවල අනුපිළිවෙළ (අඩු = කලින්)
  metadata: CompressionEngineMetadata;

  apply(body, options?): CompressionResult;
  compress(body, config?): CompressionResult;
  getConfigSchema(): EngineConfigField[];
  validateConfig(config): EngineValidationResult;
}
```

### අවම උදාහරණය: හිස් ඉඩ එන්ජිම

හැකි සරලම එන්ජිම — පණිවිඩවලින් අමතර හිස් ඉඩ ඉවත් කිරීම.

````ts
import type { CompressionEngine } from "omniroute/compression/engines/types";
import { registerCompressionEngine } from "omniroute/compression/engines/registry";

function preserveCodeBlocks(text: string): string {
  // කේත කුට්ටි සලකුණු අනුව බෙදා, ඒවා තුළ ඇති හිස් ඉඩ එලෙසම සුරකින්න
  const parts = text.split(/(```[\s\S]*?```)/);
  return parts
    .map((part) => {
      if (part.startsWith("```")) {
        return part; // කේත කුට්ටි වෙනස් නොකරන්න
      }
      return part.replace(/\n{3,}/g, "\n\n"); // ගද්යයට පමණක් යොදන්න
    })
    .join("");
}

const whitespaceEngine: CompressionEngine = {
  id: "whitespace",
  name: "හිස් ඉඩ ඉවත් කරන්නා",
  description: "අමතර හිස් ඉඩ සහ හිස් පේළි ඉවත් කරයි",
  icon: "📝",
  targets: ["messages", "tool_results"],
  stackable: true,
  stackPriority: 100, // caveman/rtk ට පසුව ධාවනය කරන්න

  metadata: {
    id: "whitespace",
    name: "හිස් ඉඩ ඉවත් කරන්නා",
    description: "අමතර හිස් ඉඩ සහ හිස් පේළි ඉවත් කරයි",
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

    // පණිවිඩ අරාව හරහා ගමන් කරන්න — තන්තු සහ බහුකොටස් අන්තර්ගත යන දෙකම හසුරුවන්න
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
      // බහුකොටස් අන්තර්ගතය: කොටස් හරහා ගමන් කර, පෙළ කොටස් පමණක් සම්පීඩනය කරන්න
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
          return part; // image_url, tool_use ආදිය සුරකින්න.
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
        label: "කේත කුට්ටි සුරකින්න",
        defaultValue: true,
        description: "```code``` කුට්ටි තුළ ඇති හිස් ඉඩ වෙනස් නොකරන්න",
      },
    ];
  },

  validateConfig(config) {
    if (config.preserveCodeBlocks !== undefined && typeof config.preserveCodeBlocks !== "boolean") {
      return {
        valid: false,
        errors: ["preserveCodeBlocks බූලියානු අගයක් විය යුතුය"],
      };
    }
    return { valid: true, errors: [] };
  },
};

// ගෝලීයව ලියාපදිංචි කරන්න
registerCompressionEngine(whitespaceEngine);
````

### අභිරුචි එන්ජින් තැබිය යුතු ස්ථානය

```
~/.omniroute/compression/engines/my-engine.ts    # පරිශීලක මට්ටමේ
<project>/compression-engines/my-engine.ts        # ව්යාපෘති මට්ටමේ (ආරම්භයේදී පූරණය වේ)
```

නැතහොත් ප්ලගිනයකින් ක්රමලේඛනමය ලෙස පූරණය කරන්න:

```ts
// ඔබේ ප්ලගිනය තුළ
import {
  registerCompressionEngine,
  unregisterCompressionEngine,
} from "@omniroute/open-sse/services/compression/engines/registry";
import { myEngine } from "./engines/my-engine";

export default definePlugin({
  name: "my-compression-plugin",
  // ප්ලගින SDK එක onRequest / onResponse / onError හුක් නිරාවරණය කරයි. ප්ලගින
  // මොඩියුලය පූරණය වන විට (හෝ පළමු onRequest හිදී) එන්ජිම ලියාපදිංචි කරන්න; ඔබේම
  // ඉවත් කිරීමේ මාර්ගයෙන් එය ලියාපදිංචියෙන් ඉවත් කරන්න.
  onRequest: async (ctx) => {
    registerCompressionEngine(myEngine);
  },
});

// ඉවත් කිරීමේදී:
// unregisterCompressionEngine("my-engine");
```

### ඔබේ එන්ජිම පරීක්ෂා කිරීම

ඔබේ එන්ජිම ප්ලගිනයක හෝ ආරම්භක ශ්රිතයක ලියාපදිංචි කරන්න. ලියාපදිංචි කළ පසු, එන්ජිම එහි `id` හරහා උපායමාර්ග තේරීම්කාරකය තුළ ලබාගත හැකි වනු ඇත. එය ස්තරගත නල මාර්ගයක සංයුක්ත කිරීමෙන් අනුකලනය පරීක්ෂා කරන්න:

---

## භාෂා පැකේජ නිර්මාණය කිරීම

Caveman-ශෛලියේ සම්පීඩනය එක් එක් ස්වාභාවික භාෂාවේ පිරවුම් වචන, අවිනිශ්චිත ප්රකාශන සහ අනවශ්ය ලෙස දීර්ඝ රටා හැසිරවීමට **භාෂාවට විශේෂිත රීති පැකේජ** භාවිත කරයි. OmniRoute සමඟ **භාෂා පැකේජ 6ක්** සැපයේ: `en`, `es`, `fr`, `de`, `ja`, `pt-BR`.

### පැකේජ ව්යුහය

භාෂා පැකේජයක් යනු `open-sse/services/compression/rules/<language>/` යටතේ ඇති **JSON ගොනු** නාමාවලියකි:

```
open-sse/services/compression/rules/
├── en/
│   ├── filler.json          # සුහද වාක්ය ඛණ්ඩ, අවිනිශ්චිත ප්රකාශන, ආචාරශීලී බව
│   ├── context.json         # සන්දර්භය අඩු කිරීමේ රීති
│   ├── dedup.json           # අනුපිටපත් ඉවත් කිරීමේ රීති
│   ├── structural.json      # විරාම ලකුණු, හැඩතල ගැන්වීම
│   └── ultra.json           # ආක්රමණශීලී සම්පීඩන රීති
├── es/  (එකම ව්යුහය)
├── fr/  (එකම ව්යුහය)
├── de/  (එකම ව්යුහය)
├── ja/  (එකම ව්යුහය)
└── pt-BR/ (එකම ව්යුහය)
```

### රීතියක ව්යුහය

සෑම රීතියකටම මෙම ආකෘතිය ඇත (`open-sse/services/compression/ruleLoader.ts` වෙතින්):

```ts
interface FileRule {
  name: string; // මිනිසුන්ට කියවිය හැකි නම (kebab-case)
  pattern: string; // JavaScript නිත්ය ප්රකාශන රටාව
  replacement?: string; // ගැළපීම ප්රතිස්ථාපනය කළ යුතු දේ
  replacementMap?: Record<string, string>; // නැතහොත් යතුර→ප්රතිස්ථාපනය සිතියමක්
  flags?: string; // නිත්ය ප්රකාශන සලකුණු (සාමාන්යයෙන් "gi")
  context?: "all" | "user" | "system" | "assistant";
  category?: "filler" | "context" | "structural" | "dedup" | "terse" | "ultra";
  minIntensity?: "lite" | "full" | "ultra"; // මෙම තීව්රතාවට වඩා අඩු නම් මඟ හරින්න
  description?: string; // ලේඛනගත කිරීම
}
```

### උදාහරණය: හින්දි පිරවුම් රීති එක් කිරීම

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

### වලංගුකරණය

පූරණය කරන විට රීති පැකේජ `_schema.json` අනුව වලංගු කෙරේ. වැරදි ව්යුහයක් සහිත පැකේජයක් පූරණය වීමට අසමත් වන අතර දෝෂයක් ලොග් කරයි:

```
RULE_LOADER: pack "hi/filler.json" failed validation:
  - rules.0.pattern: Invalid regex
  - rules.1.context: must be one of [all, user, system, assistant]
```

පැකේජයක් පූරණය කරන විට (`_schema.json` අනුව) වලංගුකරණය ස්වයංක්රීයව ක්රියාත්මක වේ; වලංගු නොවන පැකේජයක් ප්රතික්ෂේප කර ඉහත දෝෂය ලොග් කෙරේ. පැකේජ වලංගුකරණය සඳහා වෙනම `npm run` ස්ක්රිප්ට් එකක් නොමැත — පැකේජය පූරණය කර (උදා. සේවාදායකය ආරම්භ කිරීමෙන් හෝ සම්පීඩන මාර්ගය ක්රියාත්මක කිරීමෙන්) ලොග් නිරීක්ෂණය කරන්න.

### අභිරුචි භාෂා පැකේජයක් පූරණය කිරීම

```ts
import { loadRulePack } from "omniroute/compression/ruleLoader";

await loadRulePack("./my-custom-rules/hi/filler.json");
```

නැතහොත් හඳුනාගත් ස්ථානයක තබන්න:

```
~/.omniroute/compression/rules/hi/filler.json  # පරිශීලක මට්ටම
<project>/.compression/rules/hi/filler.json   # ව්යාපෘති මට්ටම
```

### භාෂා පැකේජ සඳහා හොඳම භාවිතයන්

1. **`filler` සමඟ ආරම්භ කරන්න** — ඉහළම බලපෑමක් ඇති රීති මේවාය
2. **ආක්රමණශීලී රීති පාලනය කිරීමට `minIntensity` භාවිත කරන්න** — මෙය අධික සම්පීඩනයෙන් ආරක්ෂා කරයි
3. **පරීක්ෂණ අවස්ථා ඇතුළත් කරන්න** — හැසිරීම තහවුරු කිරීමට JSON තුළ `tests[]` අරාවක් එක් කරන්න
4. **අනුපිළිවෙළ වැදගත් වේ** — පෙර ඇති රීති පළමුව යෙදේ; ඉහළ බලපෑමක් ඇති රීති පළමුව තබන්න
5. **`replacement` භාවිතයේදී ප්රවේශම් වන්න** — සාමාන්යයෙන් හිස් තන්තුව නිවැරදිය; කිසිවිටෙක නව අන්තර්ගතයක් හඳුන්වා නොදෙන්න

### පරිවර්තන උපායමාර්ගය

රීති පැකේජ නව භාෂාවකට දේශීයකරණය කරන විට:

1. **රීති නාම පරිවර්තනය කරන්න** — ඒවා නිදොස්කරණ ප්රතිදානයේ දිස් වේ
2. **නිත්ය ප්රකාශන රටා අනුවර්තනය කරන්න** — සෘජු පරිවර්තනය බොහෝ විට අසාර්ථක වේ (වචන සීමා වෙනස් වේ)
3. **සැබෑ සංවාද සමඟ පරීක්ෂා කරන්න** — පැකේජය සැබෑ ආදානය මත ආරක්ෂිත විය යුතුය
4. **සංස්කෘතික සම්මුතීන්ට ගළපන්න** — උදාහරණයක් ලෙස, ජපන් පැකේජවල ඉංග්රීසි භාෂාවට වඩා ගෞරවාර්ථ පිරවුම් ප්රකාශන වැඩියෙන් ඇත

---

## අට්ටිගත නළ මාර්ග

**අට්ටිගත නළ මාර්ගයක්** එන්ජින් කිහිපයක් අනුක්රමිකව ධාවනය කරයි, එක් එක් එන්ජිමේ ප්රතිදානය ඊළඟ එන්ජිමට ආදානය ලෙස ලබා දෙයි. `mode: stacked` අභ්යන්තරව ක්රියා කරන්නේ මෙලෙසයි.

### අට්ටිගත කිරීම ක්රියා කරන ආකාරය

```
ආදානය (ටෝකන 10,000)
        │
        ▼
   ┌──────────┐
   │ එන්ජිම   │  ප්රමුඛතාව 10
   │  A       │  ──▶ ප්රතිදානය: ටෝකන 6,000 (-40%)
   └────┬─────┘
        ▼
   ┌──────────┐
   │ එන්ජිම   │  ප්රමුඛතාව 50
   │  B       │  ──▶ ප්රතිදානය: ටෝකන 2,400 (-60%)
   └────┬─────┘
        ▼
   ┌──────────┐
   │ එන්ජිම   │  ප්රමුඛතාව 100
   │  C       │  ──▶ ප්රතිදානය: ටෝකන 1,200 (-80%)
   └────┬─────┘
        │
        ▼
අවසාන ප්රතිදානය (ටෝකන 1,200, ඒකාබද්ධව ~88% ඉතිරියක්)
```

`mode: "stacked"` තෝරා ඇති විට, එන්ජින් `pipeline` අරාවෙහි දක්වා ඇති අනුපිළිවෙළට අනුක්රමිකව ක්රියාත්මක වේ.
N එන්ජිමේ ප්රතිදානය N+1 එන්ජිමේ ආදානය බවට පත්වේ.

### සම්පීඩන ප්රකාර

වින්යාසය, ස්වයංක්රීය-ප්රේරක සීමාවන් සහ සංයෝජන අභිබවා යෑම් මත පදනම්ව OmniRoute විසින් **එක් ඉල්ලීමකට එක් ප්රකාරයක්** තෝරනු ලැබේ.
පවතින ප්රකාර `open-sse/services/compression/types.ts` හි අර්ථ දක්වා ඇත (`CompressionMode` වර්ගය):

| ප්රකාරය      | එන්ජින්              | භාවිත අවස්ථාව                                                                                                                                                                                                |
| ------------ | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `off`        | කිසිවක් නැත          | සියලු සම්පීඩන අක්රිය කරන්න                                                                                                                                                                                   |
| `rtk`        | RTK පමණි             | විධාන-ප්රතිදාන බහුල සැසි (80%+ ඉතිරියක්)                                                                                                                                                                     |
| `lite`       | Lite පමණි            | සංරක්ෂණාත්මක සම්පීඩනය (වේගවත්, ආරක්ෂිත)                                                                                                                                                                      |
| `standard`   | Caveman              | භාෂා ඇසුරුම් සහිත ගද්ය සම්පීඩනය                                                                                                                                                                              |
| `aggressive` | Caveman + Aggressive | ආක්රමණශීලී ගද්ය සම්පීඩනය + ආක්රමණශීලී අවසාන වාරය                                                                                                                                                             |
| `ultra`      | Ultra                | උපරිම සම්පීඩනය (තොරතුරු අහිමි විය හැකි, අවසාන විකල්පය). `ultra.modelPath` සකසා ඇති විට විකල්පයක් ලෙස **LLMLingua-2** SLM එන්ජිම හරහා යොමු කෙරේ (ආකෘතිය නොමැති විට රීති-පාදක මාර්ගයට බාධාවකින් තොරව මාරු වේ). |
| `stacked`    | අභිරුචි නළ මාර්ගය    | එන්ජින් ඕනෑම අනුපිළිවෙළකට සංයුක්ත කරන්න (පහත බලන්න)                                                                                                                                                          |

> ඉහත ප්රකාර එන්ජින්වලට අමතරව, රෙජිස්ට්රිය සමඟ විශේෂිත අට්ටිගත කළ හැකි එන්ජින් ද සපයයි —
> **CCR**, **headroom**, **ionizer**, සහ **session-dedup** — ඒවා
> [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md#additional-built-in-engines) හි ලේඛනගත කර ඇත.

ප්රකාර තේරීම `open-sse/services/compression/strategySelector.ts` හි `getEffectiveMode()` මඟින් තීරණය කෙරේ:

1. සම්පීඩනය අක්රිය නම්: `"off"`
2. සංයෝජන අභිබවා යෑමක් තිබේ නම්: එම අභිබවා යෑම භාවිත කරන්න
3. ස්වයංක්රීය-ප්රේරක සීමාව ඉක්මවා ඇත්නම්: `autoTriggerMode` භාවිත කරන්න (පෙරනිමිය: `"lite"`)
4. එසේ නොමැති නම්: `defaultMode` භාවිත කරන්න

### පෙරනිමි අට්ටිගත නළ මාර්ගය

`mode: "stacked"` පැහැදිලිව වින්යාස කර ඇති විට, පෙරනිමි නළ මාර්ගය පහත ඒවා සංයුක්ත කරයි:

1. **RTK** — විධාන ප්රතිදානයේ අනවශ්ය දත්ත ඉවත් කරයි (ටර්මිනල් ප්රතිදානයේ ~80% ඉතිරියක්)
2. **Caveman** — පිරවුම් පද ඉවත් කර, ගද්යය සංක්ෂිප්ත කරයි (ඉතිරි පෙළෙහි ~46%)
3. **Lite** — අවසාන හිස් අවකාශ + අනුපිටපත් ඉවත් කිරීමේ වාරය

මෙම සංයුතිය මෙවලම්-බහුල සැසිවලදී **78-95% ඉතිරියක්** ලබා දෙයි.

### අට්ටිගත නළ මාර්ග වින්යාස කිරීම

සංයෝජන වින්යාසය තුළ:

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

ඔබට එන්ජින් අත්හැරීමට, අභිරුචි එන්ජින් එක් කිරීමට, හෝ ඒවා නැවත අනුපිළිවෙළගත කිරීමට හැකිය.

### තත්ත්වය සම්ප්රේෂණය කිරීම

එන්ජින්වලට ඉල්ලීම් සන්දර්භයෙන් (`options` තුළ) පාරදත්ත කියවිය හැකිය:

```ts
compress(body, config) {
  // පෙර එන්ජින්වලින් පාරදත්ත කියවන්න
  const original = options?.compressionComboId;  // "my-coding-combo"
  // ...
}
```

පාරදත්ත **කියවීමට පමණි** — එන්ජින්වලට ඉල්ලීම් සන්දර්භය වෙනස් කළ නොහැකි අතර, වෙනස් කළ හැක්කේ තමන්ගේම ප්රතිදාන අන්තර්ගතය පමණි.

### ක්රියාත්මක කිරීමේ අනුපිළිවෙළේ සැඟවුණු ගැටලු

| එන්ජින් අනුපිළිවෙළ                         | බලපෑම                                                                              |
| ------------------------------------------ | ---------------------------------------------------------------------------------- |
| RTK → Caveman → Lite                       | **නිර්දේශිතයි** (පළමුව අනවශ්ය දත්ත, පසුව භාෂාව, අවසානයේ හිස් අවකාශ ඉවත් කරයි)      |
| Lite → RTK → Caveman                       | නරකයි — Lite අමු ප්රතිදානයෙන් හිස් අවකාශ ඉවත් කරන බැවින් RTK රටා ගැළපීම අසාර්ථක වේ |
| Caveman → RTK                              | නරකයි — RTK හඳුනා නොගන්නා ආකාරවලින් Caveman පෙළ නැවත ලිවිය හැකිය                   |
| `tool_results` පළමුව ඇති ඕනෑම අනුපිළිවෙළක් | වඩා හොඳයි — මෙවලම් ප්රතිදානය වඩාත්ම අනවශ්ය දත්ත සහිත අන්තර්ගතයයි                   |

### අට්ටිගත නොකළ යුතු අවස්ථා

අට්ටිගත කිරීම සැමවිටම වඩා හොඳ නොවේ:

- **සරල පණිවිඩ** (මෙවලම් ප්රතිදානයක් නැත) — Caveman හෝ Lite එකක් පමණක් ප්රමාණවත්ය
- **පිරිවැය-සංවේදී අවස්ථා** — සෑම එන්ජිමක්ම ~5-50ms ප්රමාදයක් එක් කරයි
- **නිශ්චිත මෙවලම්** — shell ප්රතිදානය සඳහා RTK පමණක් සාමාන්යයෙන් ප්රමාණවත්ය

### අභිරුචි නළ මාර්ගයක් ගොඩනැගීම

නාමිත pipeline registry එකක් නොමැත. stacked pipeline එකක් යනු `applyStackedCompression()` වෙත යවන **පියවරවල inline array එකක්** පමණි (`@omniroute/open-sse/services/compression/strategySelector` වෙතින් export කර ඇත):

```ts
import { applyStackedCompression } from "@omniroute/open-sse/services/compression/strategySelector";

const result = applyStackedCompression(body, [
  { engine: "rtk", intensity: "aggressive" },
  { engine: "caveman", intensity: "full" },
]);
```

ඔබ pipeline එකක් ලබා නොදෙන විට, එය පෙරනිමියෙන් `rtk(standard) → caveman(full)` භාවිත කරයි.

එය config එකෙන් ධාවනය කිරීමට, `mode: "stacked"` සකසා, පියවර array එක `stackedPipeline` යටතේ ලබා දෙන්න (`config.stackedPipeline` වෙතින් කියවනු ලැබේ):

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

## Upstream සමමුහුර්තකරණ ප්රතිපත්තිය

OmniRoute හි සම්පීඩන එන්ජින් README තුළ upstream ව්යාපෘති කිහිපයකට ගෞරවය පිරිනමයි
("RTK, Caveman, LLMLingua-2, Troglodita වෙතින් ආභාසය ලැබූ"). දායකයන් නිතර අසන
ප්රශ්නයක් වන්නේ: **upstream RTK නව මෙවලම් පෙරහනක් එක් කළ විට හෝ Caveman නව රීති
ඇසුරුමක් එක් කළ විට, එය OmniRoute වෙත ළඟා වන්නේ කෙසේද?** මෙම කොටස ඒ සඳහා වන නිල පිළිතුරයි.

### ඇතුළත් කළ පිටපත් එදිරිව ස්වාධීන ක්රියාත්මක කිරීම්

| එන්ජිම                       | upstream සමඟ සම්බන්ධතාවය                                                                                                                        | පිහිටීම                                                             |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| **RTK**                      | **ස්වාධීන නැවත ක්රියාත්මක කිරීමකි** (ආභාසය ලැබූවක් මිස පිටපතක් නොවේ)                                                                            | `open-sse/services/compression/engines/rtk/`                        |
| **Caveman**                  | **ස්වාධීන නැවත ක්රියාත්මක කිරීමකි** (ආභාසය ලැබූ)                                                                                                | `open-sse/services/compression/engines/cavemanAdapter.ts`           |
| **Headroom**                 | බොහෝ දුරට අභ්යන්තරය; `gcf/` කෝඩෙක් එක පමණක් `gcf-typescript` වෙතින් **සැබෑ ලෙස ඇතුළත් කළ** එකකි (MIT, SPDX-සලකුණු කළ, සාමාන්ය පැතිකඩ සඳහා පමණි) | `open-sse/services/compression/engines/headroom/gcf/`               |
| **LLMLingua-2 / Troglodita** | ආභාසය ලැබූ (`llmlingua` + `session-dedup` එන්ජින් මෙහෙයවයි)                                                                                     | `open-sse/services/compression/engines/llmlingua/`, `session-dedup` |

ප්රධාන කරුණ: **RTK සහ Caveman යනු _අදහස්_ (පෙරහන් රීති, රීති ඇසුරුම්) හි
පිරිසිදු පරිසරයක නිර්මාණය කළ TypeScript ක්රියාත්මක කිරීම් මිස ඇතුළත් කළ මූලාශ්ර ගස් නොවේ.** `git pull`
කිරීම සඳහා upstream පිටපතක් නොමැත — README හි "bundled" වෙනුවට
"inspired by" යැයි සඳහන් වන්නේ හරියටම ඒ නිසාය.

### upstream වැඩිදියුණු කිරීම් ඒකාබද්ධ කරන ආකාරය

සැලසුම් කළ පරිදිම **ස්වයංක්රීය upstream නිකුතු ලුහුබැඳීමක් සහ `compression-sync`
ලේබලයක් නොමැත**. එන්ජින් නැවත ක්රියාත්මක කිරීම් වන බැවින්, upstream RTK
පෙරහනක් හෝ Caveman රීති ඇසුරුමක් කේතයක් ලෙස ඒකාබද්ධ නොකෙරේ; ඒ වෙනුවට එය **OmniRoute හිම ආකෘතියෙන් නව
රීතියක්/පෙරහනක් ලෙස නැවත ප්රකාශ කෙරේ** (
[COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md) බලන්න) සහ සාමාන්ය PR එකක් හරහා
අවශ්යතාව අනුව ඇතුළත් කෙරේ. ඉහත විස්තාරණ ස්ථාන (අභිරුචි එන්ජිම, භාෂා ඇසුරුම, RTK පෙරහන)
එවැනි දායකත්වයක් ලබාදීමට අනුමත ක්රම වේ.

මෙම ප්රවාහයේ මෑත උදාහරණ:

- Gradle සහ `dotnet` ගොඩනැගීම් ප්රතිදානය සඳහා RTK පෙරහන් (v3.8.42)
- kubectl / docker-build / composer / gh සඳහා RTK පෙරහන් (#2824)
- Caveman ඉන්දුනීසියානු භාෂා ඇසුරුම (#3975), ඊට අමතරව ජර්මානු / ප්රංශ / ජපන් / චීන ඇසුරුම්

### Headroom (ආදාන-සම්පීඩන ප්රොක්සිය)

Headroom **සම්පූර්ණයෙන්ම අභ්යන්තරය** — නියමිත අනුවාදයකට ස්ථාවර කළ, ඇතුළත් කළ `gcf` කෝඩෙක් ස්නැප්ෂොට් එකක් සහ
OmniRoute හිම `smartcrusher` / `toon` / `tabular` ස්තර. ඇතුළත් කළ පිටපතෙන් ඔබ්බට ලුහුබැඳීමට
සජීවී upstream එකක් නොමැත; කෝඩෙක් එක වෙනස් වන විට `gcf` යාවත්කාලීන කිරීම්
අතින් නැවුම් කර සම්පීඩන අයවැය දොරටුවට (`check:compression-budget`) එරෙහිව නැවත වලංගු කෙරේ.

### upstream වෙතින් ආභාසය ලැබූ වැඩිදියුණු කිරීමක් යෝජනා කිරීම

1. **ඇතුළත් පිටපතක් නොකරන්න** — upstream රීතිය/පෙරහන OmniRoute හි ආකෘතියෙන් නැවත ප්රකාශ කරන්න.
2. පහත ගැළපෙන විස්තාරණ ස්ථානය හරහා එය එක් කරන්න (භාෂා ඇසුරුම, RTK පෙරහන, හෝ
   අභිරුචි එන්ජිම).
3. බලපත්රය සහිත එහි මූලාශ්රය පිටපත් කිරීම වෙනුවට, PR විස්තරය තුළ upstream ව්යාපෘතිය සඳහන් කරන්න (ගෞරව දැක්වීම සඳහා).
4. පරීක්ෂණ ඇතුළත් කර `check:compression-budget` දොරටුව තවමත් සමත් වන බව තහවුරු කරන්න.

---

## ප්රතිදාන ශෛලියක් එක් කිරීම

ප්රතිදාන ශෛලීන් ([මාර්ගෝපදේශයේ නාමාවලි වගුව](./COMPRESSION_GUIDE.md#output-styles-catalog) බලන්න)
යනු ආදාන එන්ජින්වල ප්රතිචාර-පාර්ශ්ව ප්රතිරූපයයි: ඔබ යවන දේ සම්පීඩනය කිරීම වෙනුවට, වඩා අඩු වියදම් සහිත ප්රතිදානයක් නිපදවන ලෙස ඒවා ආකෘතියට උපදෙස් දෙයි. රෙජිස්ට්රිය
`open-sse/services/compression/outputStyles/catalog.ts` හි ඇති
`OUTPUT_STYLE_CATALOG` වන අතර, **එක් නාමාවලි ඇතුළත් කිරීමක්ම සම්පූර්ණ විශේෂාංගය වේ**: ඉන්ජෙක්ටරය, උපකරණ පුවරුවේ සැකසුම් පැනලය,
ස්ථායී ගබඩාකරණය සහ දුරමිතිය යන සියල්ලම නාමාවලිය පරිශීලනය කරයි — යාවත්කාලීන කිරීමට වෙනත් ලැයිස්තුවක් නොමැත.

1. `id`, `label`, `description` සහ ඉංග්රීසි `levels` තුන (`lite`, `full`, `ultra`) සමඟ **`OUTPUT_STYLE_CATALOG` වෙත එක් ඇතුළත් කිරීමක් එක් කරන්න**. කේතය, මාර්ග, විධාන, දෝෂ සහ URL වෙනස් නොවී තබා ගැනීමට සෑම මට්ටමක්ම
   `${SHARED_BOUNDARIES}` සමඟ අවසන් විය යුතුය.
   `(id, level, language)` එකකට අදාළ උපදෙස් පෙළ **ස්ථිතික සහ නිර්ණායක** විය යුතුය — අවසර ඇති එකම අන්තර්නිවේෂණය `${SHARED_BOUNDARIES}` වේ.
2. **එය පරිවර්තනය කරන්න.** `i18n` යටතේ අවම වශයෙන් `pt-BR` බ්ලොක් එකක්වත් ලබා දෙන්න; `ponytail` සහ
   `i-have-adhd` (en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi) යනු යොමු ආකෘතියයි. හිතාමතාම එක් භාෂාවකට පමණක් සීමා කළ ශෛලියක් ඒ වෙනුවට `locale` සකසයි (`terse-cjk` → `zh` මෙන්), එවිට එය පිරිනමනු ලබන්නේ එම පෙදෙසි සැකසුම යටතේ පමණි.
3. **න්යාස ආරක්ෂකය යාවත්කාලීන කරන්න** — ශෛලියට අදාළ භාෂා
   `tests/unit/compression/output-styles-i18n-matrix.test.ts` හි `BASELINE_LANGUAGES` වෙත එක් කරන්න. නිරීක්ෂණ ගැටලුවක් සමඟ පැහැදිලි `KNOWN_ENGLISH_ONLY` ඇතුළත් කිරීමක් නොමැති නම්, අවශ්ය පරිවර්තන රහිත ඕනෑම නව, පෙදෙසි-සීමා නොකළ ශෛලියක් හේතුවෙන් ද්වාර පරීක්ෂාව අසමත් වේ.
4. `tests/unit/compression/i-have-adhd-catalog.test.ts` ආදර්ශයට ගත් **ශෛලියකට වෙන්වූ පරීක්ෂණයක් එක් කරන්න**: නාමාවලි හැඩය, එක් එක් මට්ටම සඳහා සීමා වගන්තිය, සහ සෑම පරිවර්තනයක්ම ඉංග්රීසි පිටපත් කිරීම වෙනුවට එහිම භාෂාවෙන් ලියා ඇති බව තහවුරු කරන නැංගුරම් ප්රකාශයක්.
5. **ආරෝපණය**: ශෛලිය ඉහළ මූලාශ්ර ව්යාපෘතියකින් අනුවර්තනය කර ඇත්නම්, ඇතුළත් කිරීමේ මූලාශ්ර අදහස් දැක්වීමකින් එයට ගෞරවය ලබා දෙන්න (උදා. `i-have-adhd` → ayghri/i-have-adhd, MIT) — ඉහත "ඉහළ මූලාශ්රයකින් ආභාසය ලැබූ වැඩිදියුණු කිරීමක් යෝජනා කිරීම" සඳහාද අදාළ වන්නේ මෙම රීතියමයි.

UI, යෝජනා ක්රමය හෝ දුරමිතික වෙනසක් අවශ්ය නොවේ — එම අතුරුමුහුණත් නාමාවලියෙන් විදැහුම්කරණය වේ.

---

## හොඳම භාවිතයන්

### එන්ජින් සංවර්ධනය

1. **සැමවිටම `validateConfig` ක්රියාත්මක කරන්න** — වලංගුකරණය නොමැති එන්ජින් නිහඬ අසමත්වීම් ඇති කරයි
2. **යථාර්ථවාදී `targetLatencyMs` සකසන්න** — එන්ජින් තේරීමට උපායමාර්ග තේරීම්කරු මෙය භාවිත කරයි
3. **උපකරණ පුවරුව සඳහා `getConfigSchema` භාවිත කරන්න** — කිසිවිටෙකත් පරිශීලකයන්ගෙන් වින්යාසය සඟවන්න එපා
4. **ඔබේ එන්ජිම පිරිසිදු නම් `stackable: true` සඳහා සහාය දක්වන්න** — අතුරු ප්රතිඵල ඇති එන්ජින් එක මත එක ගොඩගැසිය නොයුතුය
5. **පේළිගත පරීක්ෂණ ලියන්න** — එන්ජින් තත්පර 1කට අඩු කාලයකදී සත්යාපනය කළ හැකි විය යුතුය

### භාෂා පැකේජ සංවර්ධනය

1. **`lite` තීව්රතාවයෙන් ආරම්භ කරන්න** — ඔබේ රීති අවම සැකසුමේදී ආරක්ෂිත විය යුතුය
2. **රීතිවල විෂය පථය සීමා කිරීමට `context` භාවිත කරන්න** — `user` සඳහා පමණක් වන රීතිවලට අහම්බෙන් පද්ධති ප්රේරකවලට බලපෑම් කළ නොහැක
3. **JSON යතුරු ග්රහණය කිරීමෙන් වළකින්න** — `\\bword\\b` හට JSON තුළ ගැළපී ව්යුහගත දත්ත බිඳ දැමිය හැක
4. **ආන්තික අවස්ථා සමඟ පරීක්ෂා කරන්න** — හිස් ආදානය, unicode, RTL පෙළ, emojis
5. **පවතින පැකේජ සැකිලි ලෙස භාවිත කරන්න** — `en/filler.json` යනු වඩාත්ම දියුණු උදාහරණයයි

### නළමාර්ග සැලසුම

1. **ප්රශස්තකරණයට පෙර පැතිකඩගත කරන්න** — පළමුව `compression_stats` මඟින් මනින්න
2. **නැවත ක්රියාත්මක කිරීමට වඩා සංයෝජනයට ප්රමුඛත්වය දෙන්න** — නව එන්ජිමක් ලිවීමට පෙර Caveman රීති දිගු කරන්න
3. **අනුපිළිවෙළේ තාර්කික පදනම ලේඛනගත කරන්න** — එන්ජින් B ට පෙර එන්ජින් A යෙදෙන්නේ මන්දැයි අදහස් දැක්වීමකින් සඳහන් කරන්න
4. **තීව්රතා මට්ටම් 3ම යටතේ පරීක්ෂා කරන්න** — `lite` වේගවත් නමුත් දත්ත අහිමි විය හැක, `ultra` මන්දගාමී නමුත් නිරවද්ය වේ

---

## යොමුව: අන්තර්ගත එන්ජින්

| එන්ජින් ID           | ස්ථරගත කළ හැකිද | පෙරනිමි stackPriority | ඉලක්ක                             |
| -------------------- | --------------- | --------------------- | --------------------------------- |
| `lite`               | ඔව්             | 5                     | පණිවිඩ, මෙවලම් ප්රතිඵල            |
| `rtk`                | ඔව්             | 10                    | මෙවලම් ප්රතිඵල                    |
| `standard` (caveman) | ඔව්             | 20                    | පණිවිඩ, මෙවලම් ප්රතිඵල, කේත කොටස් |
| `aggressive`         | ඔව්             | 30                    | පණිවිඩ                            |
| `ultra`              | ඔව්             | 40                    | පණිවිඩ, කේත කොටස්                 |

### මෙයද බලන්න

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — නලමාර්ගය පිළිබඳ දළ විශ්ලේෂණය
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — එන්ජින් ලේඛනාගාර යොමුව
- [COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md) — රීති ආකෘති පිරිවිතර
- [COMPRESSION_LANGUAGE_PACKS.md](./COMPRESSION_LANGUAGE_PACKS.md) — භාෂා ඇසුරුම් විස්තර
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — RTK එන්ජිම සහ අභිරුචි පෙරහන්
- මූලාශ්රය: `open-sse/services/compression/` (ගොනු 117ක්, ~250KB)
