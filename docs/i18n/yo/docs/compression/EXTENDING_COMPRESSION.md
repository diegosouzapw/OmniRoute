# Extending the Compression Pipeline (Yorùbá)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/EXTENDING_COMPRESSION.md) · 🇪🇹 [am](../../../am/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇦 [ar](../../../ar/docs/compression/EXTENDING_COMPRESSION.md) · 🇦🇿 [az](../../../az/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇬 [bg](../../../bg/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇩 [bn](../../../bn/docs/compression/EXTENDING_COMPRESSION.md) · 🇨🇿 [cs](../../../cs/docs/compression/EXTENDING_COMPRESSION.md) · 🇩🇰 [da](../../../da/docs/compression/EXTENDING_COMPRESSION.md) · 🇩🇪 [de](../../../de/docs/compression/EXTENDING_COMPRESSION.md) · 🇬🇷 [el](../../../el/docs/compression/EXTENDING_COMPRESSION.md) · 🇪🇸 [es](../../../es/docs/compression/EXTENDING_COMPRESSION.md) · 🇪🇪 [et](../../../et/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇷 [fa](../../../fa/docs/compression/EXTENDING_COMPRESSION.md) · 🇫🇮 [fi](../../../fi/docs/compression/EXTENDING_COMPRESSION.md) · 🇫🇷 [fr](../../../fr/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇪 [ga](../../../ga/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [gu](../../../gu/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [ha](../../../ha/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇱 [he](../../../he/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [hi](../../../hi/docs/compression/EXTENDING_COMPRESSION.md) · 🇭🇷 [hr](../../../hr/docs/compression/EXTENDING_COMPRESSION.md) · 🇭🇺 [hu](../../../hu/docs/compression/EXTENDING_COMPRESSION.md) · 🇦🇲 [hy](../../../hy/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇩 [id](../../../id/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [ig](../../../ig/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇹 [it](../../../it/docs/compression/EXTENDING_COMPRESSION.md) · 🇯🇵 [ja](../../../ja/docs/compression/EXTENDING_COMPRESSION.md) · 🇬🇪 [ka](../../../ka/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇭 [km](../../../km/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [kn](../../../kn/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇷 [ko](../../../ko/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇹 [lt](../../../lt/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇻 [lv](../../../lv/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [ml](../../../ml/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [mr](../../../mr/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇾 [ms](../../../ms/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇹 [mt](../../../mt/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇲 [my](../../../my/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇵 [ne](../../../ne/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇱 [nl](../../../nl/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇴 [no](../../../no/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [or](../../../or/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [pa](../../../pa/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇭 [phi](../../../phi/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇱 [pl](../../../pl/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇹 [pt](../../../pt/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇴 [ro](../../../ro/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇺 [ru](../../../ru/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇰 [si](../../../si/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇰 [sk](../../../sk/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇮 [sl](../../../sl/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇸 [sr](../../../sr/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇪 [sv](../../../sv/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇪 [sw](../../../sw/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [ta](../../../ta/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [te](../../../te/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇭 [th](../../../th/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇷 [tr](../../../tr/docs/compression/EXTENDING_COMPRESSION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇰 [ur](../../../ur/docs/compression/EXTENDING_COMPRESSION.md) · 🇺🇿 [uz](../../../uz/docs/compression/EXTENDING_COMPRESSION.md) · 🇻🇳 [vi](../../../vi/docs/compression/EXTENDING_COMPRESSION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/EXTENDING_COMPRESSION.md)

---

> **Ní ṣókí**: Ẹ̀rọ ìfúnpọ̀ OmniRoute jẹ́ **èyí tí a lè fi àfikún sí** — o lè forúkọsílẹ̀ àwọn ẹ̀rọ àkànṣe, pèsè àwọn àkójọpọ̀ èdè fún àwọn èdè tuntun, kí o sì ṣàkójọpọ̀ àwọn ìlànà iṣẹ́ alápele. Ìtọ́sọ́nà yìí ṣàlàyé bí a ṣe ń ṣe é.

**Àwọn ìtọ́sọ́nà tó jọmọ́:**

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — Àkíyèsí kíkún nípa gbogbo ìlànà iṣẹ́
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — Ìforúkọsílẹ̀ ẹ̀rọ àti àwọn ẹ̀rọ tí a ti kọ sínú rẹ̀
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — Ẹ̀rọ RTK àti àwọn àlẹ̀mọ́ àkànṣe
- [COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md) — Ìtọ́kasí sí ìṣètò àkójọpọ̀ òfin

---

## Àkíyèsí Gbogbogbò

Ètò ìfúnpọ̀ náà ní **àwọn ibi ìmúgbòòrò 3**:

| Ibi ìmúgbòòrò         | Ìlò                                                                                   | Ìpele ìṣòro |
| --------------------- | ------------------------------------------------------------------------------------- | ----------- |
| **Ẹ̀rọ àkànṣe**        | Ṣàfikún algoridimu ìfúnpọ̀ tuntun pátápátá (fún àpẹẹrẹ, afiniṣókí tó dá lórí ẹ̀ka pàtó) | Gíga        |
| **Àkójọpọ̀ èdè**       | Ṣàfikún àtìlẹ́yìn fún èdè àdánidá tuntun (fún àpẹẹrẹ, Hindi, Arabic)                   | Àárín       |
| **Ìlànà iṣẹ́ alápele** | Ṣàkójọpọ̀ àwọn ẹ̀rọ tó wà tẹ́lẹ̀ ní ìtòlẹ́sẹẹsẹ àkànṣe                                     | Ìbẹ̀rẹ̀       |

```
┌─────────────────────────────────────────────────────────────┐
│                     Ìlànà Ìfúnpọ̀                           │
│                                                             │
│ Àwọn ìfiránṣẹ́ àbáwọlé ─▶ getEffectiveMode() ─▶ mode       │
│                                              │              │
│                      ┌───────────────────────┼──────────┐    │
│                      │         │         │         │    │    │
│                      ▼         ▼         ▼         ▼    │    │
│                   "rtk"    "lite"   "standard" "stacked"    │
│                      │         │         │         │    │    │
│                      ▼         ▼         ▼         ▼    │    │
│                   RTK       Lite     Caveman   engines[]   │
│                   ẹ̀rọ      ẹ̀rọ      ẹ̀rọ      tí a so    │
│                                                pọ̀         │
│                      │         │         │         │    │    │
│                      └─────────┴─────────┴─────────┘    │    │
│                                      │                    │
│                                      ▼                    │
│                              Àbájáde tí a fún pọ̀          │
└─────────────────────────────────────────────────────────────┘

Olùyan ìlànà náà DÁ LÓRÍ MODE: ìbéèrè kọ̀ọ̀kan ń yan mode KAN
(rtk / lite / standard / aggressive / ultra / stacked / off).
Mode "stacked" nìkan ló ń so ọ̀pọ̀ ẹ̀rọ pọ̀ ní ọ̀kọ̀ọ̀kan.
Mode ìmúṣiṣẹ́ aládàáṣe àìyípadà ni "lite" (kì í ṣe ẹ̀wọ̀n ààyò onípele 3).
```

---

## Kíkọ Ẹ̀rọ Ìfúnpọ̀ Àkànṣe

Ìfẹnukò ẹ̀rọ náà (`open-sse/services/compression/engines/types.ts`) ni àdéhùn tí gbogbo ẹ̀rọ gbọ́dọ̀ tẹ̀lé. Ó ní àwọn method 5 tí a nílò.

### Ìfẹnukò `CompressionEngine`

```ts
interface CompressionEngine {
  id: string; // ID ẹ̀rọ aláìlẹ́gbẹ́
  name: string; // Orúkọ àfihàn
  description: string; // Àpèjúwe ṣókí
  icon: string; // Àmì àwòrán (emoji tàbí URL)
  targets: CompressionEngineTarget[]; // ["messages", "tool_results", "code_blocks"]
  stackable: boolean; // Ṣé a lè lò ó nínú ìlànà iṣẹ́ alápele?
  stackPriority: number; // Ìtòlẹ́sẹẹsẹ nínú àwọn ìlànà iṣẹ́ alápele (kékeré = ṣáájú)
  metadata: CompressionEngineMetadata;

  apply(body, options?): CompressionResult;
  compress(body, config?): CompressionResult;
  getConfigSchema(): EngineConfigField[];
  validateConfig(config): EngineValidationResult;
}
```

### Àpẹẹrẹ Kékeré Jùlọ: Ẹ̀rọ Whitespace

Ẹ̀rọ tó rọrùn jù lọ — yọ àwọn àlàfo àfikún kúrò nínú àwọn ìfiránṣẹ́.

````ts
import type { CompressionEngine } from "omniroute/compression/engines/types";
import { registerCompressionEngine } from "omniroute/compression/engines/registry";

function preserveCodeBlocks(text: string): string {
  // Pín nípasẹ̀ àwọn àmì ìdènà kóòdù, kí o sì pa àyè funfun inú wọn mọ́
  const parts = text.split(/(```[\s\S]*?```)/);
  return parts
    .map((part) => {
      if (part.startsWith("```")) {
        return part; // Má ṣe ṣàtúnṣe àwọn ìdènà kóòdù
      }
      return part.replace(/\n{3,}/g, "\n\n"); // Lò ó fún ọ̀rọ̀ àlàyé nìkan
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
  stackPriority: 100, // Ṣe é LẸ́YÌN caveman/rtk

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

    // Rìn káàkiri àkójọpọ̀ ìfiránṣẹ́ — bójú tó àkóónú ọ̀rọ̀ àti ti ọ̀pọ̀ apá
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
      // Àkóónú ọ̀pọ̀ apá: rìn káàkiri àwọn apá, kí o sì fún àwọn apá ọ̀rọ̀ nìkan pọ̀
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
          return part; // pa image_url, tool_use, àti bẹ́ẹ̀ bẹ́ẹ̀ lọ mọ́.
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

// Forúkọsílẹ̀ káàkiri
registerCompressionEngine(whitespaceEngine);
````

### Ibi Tí A Ó Fi Àwọn Ẹ̀rọ Àdáni Sílẹ̀

```
~/.omniroute/compression/engines/my-engine.ts    # Ti ìpele olùlò
<project>/compression-engines/my-engine.ts        # Ti ìpele iṣẹ́-àkànṣe (a ó gbé e sókè nígbà ìbẹ̀rẹ̀)
```

Tàbí, gbé e sókè nípasẹ̀ ìṣètò láti inú plugin kan:

```ts
// Nínú plugin rẹ
import {
  registerCompressionEngine,
  unregisterCompressionEngine,
} from "@omniroute/open-sse/services/compression/engines/registry";
import { myEngine } from "./engines/my-engine";

export default definePlugin({
  name: "my-compression-plugin",
  // SDK plugin náà ń pèsè àwọn hook onRequest / onResponse / onError. Forúkọ ẹ̀rọ náà sílẹ̀
  // nígbà tí module plugin bá gbé sókè (tàbí ní onRequest àkọ́kọ́); yọ ọ́ kúrò nínú ìforúkọsílẹ̀
  // láti ipa-ọ̀nà teardown tìrẹ.
  onRequest: async (ctx) => {
    registerCompressionEngine(myEngine);
  },
});

// Nígbà teardown:
// unregisterCompressionEngine("my-engine");
```

### Dídán Ẹ̀rọ Rẹ Wò

Forúkọ ẹ̀rọ rẹ sílẹ̀ nínú plugin kan tàbí iṣẹ́ ìbẹ̀rẹ̀ kan. Lẹ́yìn tí a bá forúkọ rẹ̀ sílẹ̀, ẹ̀rọ náà yóò wà
nínú olùyan ọgbọ́n nípasẹ̀ `id` rẹ̀. Dán ìsopọ̀ rẹ̀ wò nípa ṣíṣàkójọpọ̀ rẹ̀ sínú pipeline onípele:

---

## Ṣíṣẹ̀dá Àwọn Àkójọpọ̀ Èdè

Ìpọ́pọ̀ ara Caveman ń lo **àwọn àkójọpọ̀ òfin tó jẹ́ ti èdè kọ̀ọ̀kan** láti bójú tó àwọn ọ̀rọ̀ àfikún, ọ̀rọ̀ àìdánilójú, àti àwọn àpẹẹrẹ ọ̀rọ̀ gígùn nínú èdè àdánidá kọ̀ọ̀kan. OmniRoute wá pẹ̀lú **àwọn àkójọpọ̀ èdè 6**: `en`, `es`, `fr`, `de`, `ja`, `pt-BR`.

### Ìgbékalẹ̀ Àkójọpọ̀

Àkójọpọ̀ èdè jẹ́ àkójọpọ̀ fáìlì **JSON** kan lábẹ́ `open-sse/services/compression/rules/<language>/`:

```
open-sse/services/compression/rules/
├── en/
│   ├── filler.json          # Ìkíni, ọ̀rọ̀ àìdánilójú, ìwà ọmọlúwàbí
│   ├── context.json         # Àwọn òfin tó ń dín ọ̀rọ̀ àyíká kù
│   ├── dedup.json           # Àwọn òfin yíyọ àtúnṣe kúrò
│   ├── structural.json      # Àmì ìkọ̀wé, ìṣètò
│   └── ultra.json           # Àwọn òfin ìpọ́pọ̀ tó lágbára
├── es/  (ìgbékalẹ̀ kan náà)
├── fr/  (ìgbékalẹ̀ kan náà)
├── de/  (ìgbékalẹ̀ kan náà)
├── ja/  (ìgbékalẹ̀ kan náà)
└── pt-BR/ (ìgbékalẹ̀ kan náà)
```

### Àkópọ̀ Òfin

Òfin kọ̀ọ̀kan ní ìrísí yìí (láti `open-sse/services/compression/ruleLoader.ts`):

```ts
interface FileRule {
  name: string; // Orúkọ tí ènìyàn lè kà (kebab-case)
  pattern: string; // Àpẹẹrẹ regex JavaScript
  replacement?: string; // Ohun tí a ó fi rọ́pò ohun tó bá mu
  replacementMap?: Record<string, string>; // TÀBÍ àwòrán atọ́ka bọ́tìnì→àrọ́pò
  flags?: string; // Àwọn àmì regex ("gi" ní ọ̀pọ̀ ìgbà)
  context?: "all" | "user" | "system" | "assistant";
  category?: "filler" | "context" | "structural" | "dedup" | "terse" | "ultra";
  minIntensity?: "lite" | "full" | "ultra"; // Foju ré e ní ìwọ̀n agbára tó bá kéré sí èyí
  description?: string; // Ìwé àkọsílẹ̀
}
```

### Àpẹẹrẹ: Ṣíṣe Àfikún Àwọn Òfin Ọ̀rọ̀ Àfikún Hindi

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

### Ìfàṣẹsí

A máa ń ṣàyẹ̀wò àwọn àkójọpọ̀ òfin pẹ̀lú `_schema.json` nígbà tí a bá ń kó wọn wọlé. Àkójọpọ̀ tí ìgbékalẹ̀ rẹ̀ kò tọ́ kò ní ṣeé kó wọlé, yóò sì ṣàkọsílẹ̀ àṣìṣe kan:

```
RULE_LOADER: ìfàṣẹsí àkójọpọ̀ "hi/filler.json" kùnà:
  - rules.0.pattern: Regex kò tọ́
  - rules.1.context: ó gbọ́dọ̀ jẹ́ ọ̀kan lára [all, user, system, assistant]
```

Ìfàṣẹsí máa ń ṣiṣẹ́ fúnra rẹ̀ nígbà tí a bá kó àkójọpọ̀ kan wọlé (ní ìfiwéra pẹ̀lú `_schema.json`); a ó kọ
àkójọpọ̀ tí kò tọ́ sílẹ̀, a ó sì ṣàkọsílẹ̀ àṣìṣe tó wà lókè. Kò sí script
`npm run` ọ̀tọ̀ fún ìfàṣẹsí àkójọpọ̀ — kó àkójọpọ̀ náà wọlé (fún àpẹẹrẹ, bẹ̀rẹ̀ server náà tàbí
ṣiṣẹ́ nípasẹ̀ ipa-ọ̀nà ìpọ́pọ̀) kí o sì ṣọ́ àwọn àkọsílẹ̀.

### Kíkọ Àkójọpọ̀ Èdè Àdáni Wọlé

```ts
import { loadRulePack } from "omniroute/compression/ruleLoader";

await loadRulePack("./my-custom-rules/hi/filler.json");
```

Tàbí fi sí ibi tí a mọ̀:

```
~/.omniroute/compression/rules/hi/filler.json  # Ti ipele aṣàmúlò
<project>/.compression/rules/hi/filler.json   # Ti ipele iṣẹ́-àkànṣe
```

### Àwọn Ìlànà Tó Dára Jù fún Àwọn Àkójọpọ̀ Èdè

1. **Bẹ̀rẹ̀ pẹ̀lú `filler`** — àwọn wọ̀nyí ni àwọn òfin tó ní ipa jù
2. **Lo `minIntensity`** láti ṣàkóso àwọn òfin tó lágbára — èyí ń dáàbò bo lódì sí ìpọ́pọ̀ àpọ̀jù
3. **Fi àwọn ọ̀ràn àdánwò kún un** — ṣàfikún àtòjọ `tests[]` sínú JSON láti ṣàyẹ̀wò ìhùwàsí
4. **Ètò ṣe pàtàkì** — àwọn òfin tó ṣáájú ni a kọ́kọ́ lò; fi àwọn òfin tó ní ipa jù síwájú
5. **Ṣọ́ra pẹ̀lú `replacement`** — okun òfo sábà máa ń tọ́; má ṣe fi àkóónú tuntun kún un láé

### Ìlànà Ìtumọ̀

Nígbà tí o bá ń mú àwọn àkójọpọ̀ òfin bá èdè tuntun mu:

1. **Túmọ̀ àwọn orúkọ òfin** — wọ́n máa ń hàn nínú àbájáde àtúnṣe-àṣìṣe
2. **Mú àwọn àpẹẹrẹ regex bá èdè náà mu** — ìtumọ̀ tààrà sábà máa ń kùnà (àwọn ààlà ọ̀rọ̀ yàtọ̀)
3. **Dán an wò pẹ̀lú àwọn ìjíròrò gidi** — àkójọpọ̀ náà gbọ́dọ̀ jẹ́ àìléwu lórí ìwọlé gidi
4. **Bá àwọn àṣà ìbílẹ̀ mu** — fún àpẹẹrẹ, àwọn àkójọpọ̀ Japanese ní ọ̀rọ̀ àfikún ọ̀wọ̀ púpọ̀ ju English lọ

---

## Àwọn Pípéláìnì Tí A Tò Lé Ara Wọn

**Pípéláìnì tí a tò lé ara wọn** ń ṣiṣẹ́ àwọn ẹ̀rọ púpọ̀ ní tẹ̀léńtẹ̀lé, níbi tí àbájáde ẹ̀rọ kọ̀ọ̀kan ti ń di àbáwọlé fún èyí tí ó tẹ̀lé e. Báyìí ni `mode: stacked` ṣe ń ṣiṣẹ́ ní inú.

### Bí Títò Lé Ara Wọn Ṣe Ń Ṣiṣẹ́

```
Àbáwọlé (10,000 tokens)
        │
        ▼
   ┌──────────┐
   │  Ẹ̀rọ    │  ààyò 10
   │  A       │  ──▶ àbájáde: 6,000 tokens (-40%)
   └────┬─────┘
        ▼
   ┌──────────┐
   │  Ẹ̀rọ    │  ààyò 50
   │  B       │  ──▶ àbájáde: 2,400 tokens (-60%)
   └────┬─────┘
        ▼
   ┌──────────┐
   │  Ẹ̀rọ    │  ààyò 100
   │  C       │  ──▶ àbájáde: 1,200 tokens (-80%)
   └────┬─────┘
        │
        ▼
Àbájáde ìkẹyìn (1,200 tokens, ~88% àpapọ̀ ìfipamọ́)
```

Nígbà tí a bá yan `mode: "stacked"`, àwọn ẹ̀rọ yóò ṣiṣẹ́ ní tẹ̀léńtẹ̀lé gẹ́gẹ́ bí ìtòlẹ́sẹẹsẹ tí a sọ pàtó nínú àkójọ `pipeline`.
Àbájáde ẹ̀rọ N yóò di àbáwọlé ẹ̀rọ N+1.

### Àwọn Ìpo Ìfúnpọ̀

OmniRoute ń yan **ÌPO KAN fún ìbéèrè kọ̀ọ̀kan** ní ìbámu pẹ̀lú àtúnṣe, àwọn ààlà ìmúṣiṣẹ́ aládàáṣe, àti àwọn ìkọlélórí combo.
Àwọn ìpo tó wà ni a ṣàlàyé nínú `open-sse/services/compression/types.ts` (irú `CompressionMode`):

| Ìpo          | Àwọn ẹ̀rọ             | Ibi ìlò                                                                                                                                                                                                                                        |
| ------------ | -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `off`        | Kò sí                | Pa gbogbo ìfúnpọ̀                                                                                                                                                                                                                               |
| `rtk`        | RTK nìkan            | Àwọn sáà tí àbájáde àṣẹ pọ̀ nínú wọn (ìfipamọ́ 80%+)                                                                                                                                                                                             |
| `lite`       | Lite nìkan           | Ìfúnpọ̀ oníṣọ́ra (yára, láìléwu)                                                                                                                                                                                                                 |
| `standard`   | Caveman              | Ìfúnpọ̀ àkọsílẹ̀ pẹ̀lú àwọn àkójọpọ̀ èdè                                                                                                                                                                                                           |
| `aggressive` | Caveman + Aggressive | Ìfúnpọ̀ àkọsílẹ̀ líle + ìgbésẹ̀ ìkẹyìn líle                                                                                                                                                                                                       |
| `ultra`      | Ultra                | Ìfúnpọ̀ tó pọ̀ jù lọ (tí ó lè pàdánù díẹ̀ nínú àkóónú, fún ìgbà tí kò sí ọ̀nà mìíràn). A lè darí rẹ̀ gba inú ẹ̀rọ SLM **LLMLingua-2** nígbà tí a bá ṣètò `ultra.modelPath` (yóò padà sí ọ̀nà tó dá lórí òfin láìdá iṣẹ́ dúró nígbà tí model kò bá sí). |
| `stacked`    | Pípéláìnì àdáni      | Ṣàkópọ̀ àwọn ẹ̀rọ ní èyíkéyìí ìtòlẹ́sẹẹsẹ (wo ìsàlẹ̀)                                                                                                                                                                                              |

> Yàtọ̀ sí àwọn ẹ̀rọ ìpo tó wà lókè, registry náà tún ní àwọn ẹ̀rọ àkànṣe tí a lè tò lé ara wọn —
> **CCR**, **headroom**, **ionizer**, àti **session-dedup** — tí a ṣàkọsílẹ̀ wọn nínú
> [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md#additional-built-in-engines).

`getEffectiveMode()` nínú `open-sse/services/compression/strategySelector.ts` ló ń pinnu yíyan ìpo:

1. Tí a bá pa ìfúnpọ̀: `"off"`
2. Tí ìkọlélórí combo bá wà: lo ìkọlélórí náà
3. Tí a bá kọjá ààlà ìmúṣiṣẹ́ aládàáṣe: lo `autoTriggerMode` (àìyípadà: `"lite"`)
4. Bí bẹ́ẹ̀ kọ́: lo `defaultMode`

### Pípéláìnì Àìyípadà Tí A Tò Lé Ara Wọn

Nígbà tí a bá ṣètò `mode: "stacked"` ní tààrà, pípéláìnì àìyípadà yóò ṣàkópọ̀:

1. **RTK** — yọ ariwo àbájáde àṣẹ kúrò (~80% ìfipamọ́ lórí àbájáde terminal)
2. **Caveman** — yọ àwọn ọ̀rọ̀ àfikún kúrò, kí àkọsílẹ̀ ṣókí (~46% lórí ọ̀rọ̀ tó kù)
3. **Lite** — ìgbésẹ̀ ìkẹyìn fún àyè òfìfo + yíyọ àtúnwá kúrò

Àkópọ̀ yìí ń mú **ìfipamọ́ 78-95%** wá nínú àwọn sáà tí lílo irinṣẹ́ pọ̀.

### Ṣíṣètò Àwọn Pípéláìnì Tí A Tò Lé Ara Wọn

Nínú àtúnṣe combo:

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

O lè yọ àwọn ẹ̀rọ kan sílẹ̀, fi àwọn ti àdáni kún un, tàbí tún ìtòlẹ́sẹẹsẹ wọn ṣe.

### Fífi State Ránṣẹ́

Àwọn ẹ̀rọ lè ka metadata láti inú context ìbéèrè (nínú `options`):

```ts
compress(body, config) {
  // Ka metadata láti ọ̀dọ̀ àwọn ẹ̀rọ tó ṣáájú
  const original = options?.compressionComboId;  // "my-coding-combo"
  // ...
}
```

metadata náà jẹ́ **fún kíkà nìkan** — àwọn ẹ̀rọ kò lè yí context ìbéèrè padà; àbájáde body tiwọn nìkan ni wọ́n lè yí padà.

### Àwọn Ohun Tó Yẹ Kí A Ṣọ́ra Fún Nínú Ìtòlẹ́sẹẹsẹ Ìṣiṣẹ́

| Ìtòlẹ́sẹẹsẹ ẹ̀rọ                                       | Ipa                                                                                          |
| ---------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| RTK → Caveman → Lite                                 | **A dábàá rẹ̀** (ó kọ́kọ́ yọ ariwo, lẹ́yìn náà èdè, àti ní ìkẹyìn àyè òfìfo)                     |
| Lite → RTK → Caveman                                 | Kò dára — Lite ń yọ àyè òfìfo kúrò nínú àbájáde àṣẹ̀sẹ̀, èyí sì ń mú kí ìbámu pattern RTK kùnà |
| Caveman → RTK                                        | Kò dára — Caveman lè tún ọ̀rọ̀ kọ ní àwọn ọ̀nà tí RTK kò mọ̀                                     |
| Èyíkéyìí ìtòlẹ́sẹẹsẹ tí `tool_results` bá wà ní ìbẹ̀rẹ̀ | Ó dára sí i — àbájáde irinṣẹ́ ni àkóónú tó ní ariwo jù lọ                                     |

### Ìgbà Tí KÒ YẸ Kí A Tò Wọ́n Lé Ara Wọn

Títò wọ́n lé ara wọn kì í dára jù ní gbogbo ìgbà:

- **Àwọn ìfiránṣẹ́ rírọrùn** (kò sí àbájáde irinṣẹ́) — Caveman kan ṣoṣo tàbí Lite ti tó
- **Tí iye owó bá ṣe pàtàkì** — ẹ̀rọ kọ̀ọ̀kan ń fi ìdádúró ~5-50ms kún un
- **Àwọn irinṣẹ́ pàtó** — RTK nìkan sábà máa ń tó fún àbájáde shell

### Ṣíṣe Pípéláìnì Àdáni Kan

Kò sí àkọsílẹ̀ pipeline olórúkọ. Pipeline tí a tò léra jẹ́ **àkójọ àwọn ìgbésẹ̀ inú-láìnì**
tí a fi ránṣẹ́ sí `applyStackedCompression()` (tí a ṣe àgbéjáde rẹ̀ láti
`@omniroute/open-sse/services/compression/strategySelector`):

```ts
import { applyStackedCompression } from "@omniroute/open-sse/services/compression/strategySelector";

const result = applyStackedCompression(body, [
  { engine: "rtk", intensity: "aggressive" },
  { engine: "caveman", intensity: "full" },
]);
```

Nígbà tí o kò bá pèsè pipeline kan, yóò lo `rtk(standard) → caveman(full)` gẹ́gẹ́ bí àiyipada.

Láti darí rẹ̀ láti inú ìṣètò, ṣètò `mode: "stacked"` kí o sì pèsè àkójọ àwọn ìgbésẹ̀ náà lábẹ́
`stackedPipeline` (tí a kà láti inú `config.stackedPipeline`):

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

## Ìlànà Ìṣiṣẹ́pọ̀ Pẹ̀lú Upstream

Àwọn ẹ̀rọ ìfúnpọ̀ OmniRoute fi ọlá fún ọ̀pọ̀lọpọ̀ iṣẹ́ upstream nínú README
("inspired by RTK, Caveman, LLMLingua-2, Troglodita"). Ìbéèrè tí àwọn olùdásí
máa ń béèrè ni: **nígbà tí upstream RTK bá ṣàfikún àsẹ irinṣẹ́ tuntun tàbí tí Caveman bá ṣàfikún
àkójọpọ̀ òfin kan, báwo ni ìyẹn ṣe dé inú OmniRoute?** Abala yìí ni ìdáhùn aláṣẹ.

### Àwọn ẹ̀dà tí a fi sínú iṣẹ́ náà àti àwọn ìmúṣẹ olómìnira

| Ẹ̀rọ                          | Ìbáṣepọ̀ pẹ̀lú upstream                                                                                                                                                  | Ibi tí ó wà                                                         |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| **RTK**                      | **Àtúnmúṣẹ olómìnira** (a gba ìmísí láti ọ̀dọ̀ rẹ̀, kì í ṣe ẹ̀dà)                                                                                                          | `open-sse/services/compression/engines/rtk/`                        |
| **Caveman**                  | **Àtúnmúṣẹ olómìnira** (a gba ìmísí láti ọ̀dọ̀ rẹ̀)                                                                                                                       | `open-sse/services/compression/engines/cavemanAdapter.ts`           |
| **Headroom**                 | Ó fẹ́rẹ̀ẹ́ jẹ́ ti inú iṣẹ́ náà pátápátá; codec `gcf/` nìkan ni a **fi sínú iṣẹ́ náà ní tòótọ́** láti `gcf-typescript` (MIT, tí a sàmì sí pẹ̀lú SPDX, prófáìlì gbogbogbò nìkan) | `open-sse/services/compression/engines/headroom/gcf/`               |
| **LLMLingua-2 / Troglodita** | A gba ìmísí láti ọ̀dọ̀ wọn (wọ́n ń darí àwọn ẹ̀rọ `llmlingua` + `session-dedup`)                                                                                           | `open-sse/services/compression/engines/llmlingua/`, `session-dedup` |

Kókó pàtàkì: **RTK àti Caveman jẹ́ àwọn ìmúṣẹ TypeScript tí a kọ láti ìbẹ̀rẹ̀ láìlo kóòdù wọn,
tí ó dá lórí àwọn _èrò_ wọn (àwọn òfin àsẹ, àkójọpọ̀ òfin), kì í ṣe àwọn ìtòlẹ́sẹẹsẹ orísun tí a fi sínú iṣẹ́ náà.** Kò sí
ẹ̀dà upstream kankan láti ṣe `git pull` láti inú rẹ̀ — ìdí nìyẹn gan-an tí README fi sọ pé
"inspired by" dípò "bundled".

### Bí a ṣe ń ṣàmúpọ̀ àwọn ìmúdára upstream

**Kò sí ìtọ́pasẹ̀ ìtújáde upstream aládàáṣiṣẹ́, bẹ́ẹ̀ ni kò sí ààmì `compression-sync`
kankan** — èyí jẹ́ àfipamọ́ ìlànà. Nítorí pé àwọn ẹ̀rọ náà jẹ́ àtúnmúṣẹ, àsẹ RTK
tàbí àkójọpọ̀ òfin Caveman láti upstream kì í ṣe àkópọ̀ bí kóòdù; dípò bẹ́ẹ̀, a máa **tún un
ṣàlàyé gẹ́gẹ́ bí òfin/àsẹ tuntun nínú fọ́ọ̀mù OmniRoute fúnra rẹ̀** (wo
[COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md)), ó sì máa ń wọlé lẹ́ẹ̀kọ̀ọ̀kan nípasẹ̀
PR àrà ọ̀tọ̀. Àwọn ibi ìmúgbòòrò tó wà lókè (ẹ̀rọ àkànṣe, àkójọpọ̀ èdè, àsẹ RTK)
ni ọ̀nà tí a fọwọ́ sí láti fi ọ̀kan kún un.

Àwọn àpẹẹrẹ àìpẹ́ ti ìṣàn iṣẹ́ yìí gan-an:

- Àwọn àsẹ RTK fún àbájáde ìkọ́lé Gradle àti `dotnet` (v3.8.42)
- Àwọn àsẹ RTK fún kubectl / docker-build / composer / gh (#2824)
- Àkójọpọ̀ èdè Indonesian fún Caveman (#3975), pẹ̀lú àwọn àkójọpọ̀ German / French / Japanese / Chinese

### Headroom (aṣojú ìfúnpọ̀ ìwọlé)

Headroom jẹ́ **ti inú iṣẹ́ náà pátápátá** — àwòrán codec `gcf` tí a ti fi sínú iṣẹ́ náà tí a sì dì mọ́ ẹ̀yà kan, pẹ̀lú
àwọn ipele `smartcrusher` / `toon` / `tabular` ti OmniRoute fúnra rẹ̀. Kò sí
upstream alààyè láti tọ́pa yàtọ̀ sí ẹ̀dà tí a fi sínú iṣẹ́ náà; a máa ń ṣe ìmúdójúìwọ̀n `gcf`
pẹ̀lú ọwọ́ nígbà tí codec bá yí padà, a sì tún máa ń fìdí rẹ̀ múlẹ̀ nípasẹ̀ ẹnu-ọ̀nà ààlà ìfúnpọ̀
(`check:compression-budget`).

### Ṣíṣe àbá ìmúdára tí upstream fún ní ìmísí

1. **Má ṣe fi orísun náà sínú iṣẹ́** — tún òfin/àsẹ upstream náà ṣàlàyé nínú fọ́ọ̀mù OmniRoute.
2. Fi í kún un nípasẹ̀ ibi ìmúgbòòrò tó bá a mu nísàlẹ̀ (àkójọpọ̀ èdè, àsẹ RTK, tàbí
   ẹ̀rọ àkànṣe).
3. Tọ́ka sí iṣẹ́ upstream náà nínú àpèjúwe PR (fífúnni ní ẹ̀tọ́), kì í ṣe nípa
   ṣíṣe àdàkọ orísun rẹ̀ tí ó ní ìwé-àṣẹ.
4. Fi àwọn ìdánwò kún un, kí o sì fìdí rẹ̀ múlẹ̀ pé ẹnu-ọ̀nà `check:compression-budget` ṣì ń kọjá.

---

## Fífi Àṣà Ìjáde Kún Un

Àwọn àṣà ìjáde (wo [tábìlì àkójọ inú ìtọ́sọ́nà](./COMPRESSION_GUIDE.md#output-styles-catalog))
jẹ́ ohun tó bá àwọn ẹ̀rọ ìwọlé mu ní ẹ̀gbẹ́ ìdáhùn: dípò kí wọ́n fún ohun tí o
ránṣẹ́ pọ̀, wọ́n ń kọ́ àwòṣe náà láti ṣe ìjáde tí kò ná púpọ̀. Ìforúkọsílẹ̀ náà ni
`OUTPUT_STYLE_CATALOG` nínú `open-sse/services/compression/outputStyles/catalog.ts`, àti
**àkọsílẹ̀ àkójọ kan ṣoṣo ni gbogbo ẹ̀yà náà**: olùfisí, pánẹ́ẹ̀lì ètò dasibodu,
ìtọ́jú ìpamọ́ àti tẹlifíṣọ̀n gbogbo wọn ń ka àkójọ náà — kò sí àtòjọ mìíràn láti ṣe ìmúdójúìwọ̀n.

1. **Fi àkọsílẹ̀ kan kún `OUTPUT_STYLE_CATALOG`** pẹ̀lú `id`, `label`, `description` àti
   àwọn `levels` Gẹ̀ẹ́sì mẹ́ta (`lite`, `full`, `ultra`). Gbogbo ìpele gbọ́dọ̀ parí pẹ̀lú
   `${SHARED_BOUNDARIES}` kí kóòdù, àwọn ọ̀nà fáìlì, àwọn àṣẹ, àwọn àṣìṣe àti àwọn URL lè dúró gẹ́gẹ́ bí wọ́n ṣe wà.
   Ọ̀rọ̀ ìtọ́ni náà gbọ́dọ̀ jẹ́ **aláìyípadà tí ó sì ń fúnni ní àbájáde kan náà nígbà gbogbo** fún
   `(id, level, language)` — `${SHARED_BOUNDARIES}` nìkan ni ìfisí iye tí a fàyè gbà.
2. **Túmọ̀ ọ́.** Fi ó kéré tán búlọ́ọ̀kù `pt-BR` kan sí abẹ́ `i18n`; `ponytail` àti
   `i-have-adhd` (en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi) ni àpẹrẹ ìrísí ìtọ́kasí. Àṣà tí a mọ̀ọ́mọ̀ ṣe fún
   èdè kan ṣoṣo máa ń ṣètò `locale` dípò bẹ́ẹ̀ (bí `terse-cjk` → `zh`) a ó sì
   pèsè rẹ̀ lábẹ́ èdè agbègbè yẹn nìkan.
3. **Ṣe ìmúdójúìwọ̀n olùṣọ́ mátríìkì náà** — fi àwọn èdè àṣà náà kún `BASELINE_LANGUAGES` nínú
   `tests/unit/compression/output-styles-i18n-matrix.test.ts`. Ìdènà náà yóò kọ gbogbo àṣà tuntun
   tí `locale` kò fi ààlà sí tí kò bá ní àwọn ìtumọ̀ tí a nílò, àyàfi tí ó bá ní
   àkọsílẹ̀ `KNOWN_ENGLISH_ONLY` tí ó ṣe kedere pẹ̀lú ìṣòro ìtọ́pasẹ̀ kan.
4. **Ṣàfikún ìdánwò kan fún àṣà kọ̀ọ̀kan** tí a ṣe àwòkọ́ṣe rẹ̀ láti
   `tests/unit/compression/i-have-adhd-catalog.test.ts`: ìrísí àkójọ, gbólóhùn
   ààlà fún ìpele kọ̀ọ̀kan, àti àmì ìjẹ́rìí tó fi dájú pé a kọ ìtumọ̀ kọ̀ọ̀kan ní
   èdè tirẹ̀ dípò dídà Gẹ̀ẹ́sì kọ.
5. **Ìfúnni ní ọlá**: tí a bá mú àṣà náà bá láti inú iṣẹ́ àkọ́kọ́ kan, fún un ní ọlá nínú
   àlàyé orísun lórí àkọsílẹ̀ náà (fún àpẹẹrẹ, `i-have-adhd` → ayghri/i-have-adhd, MIT) — òfin
   kan náà pẹ̀lú "Ṣíṣe àbá ìlọsíwájú tí iṣẹ́ àkọ́kọ́ míì fún ní ìmísí" lókè.

Kò sí ìyípadà UI, schema tàbí tẹlifíṣọ̀n tí a nílò — àwọn abala wọ̀nyẹn ń ṣàfihàn láti inú àkójọ náà.

---

## Àwọn Ìṣe Tó Dára Jù

### Ìdàgbàsókè Ẹ̀rọ

1. **Máa ṣe àgbékalẹ̀ `validateConfig` ní gbogbo ìgbà** — àwọn ẹ̀rọ tí kò ní ìfọwọ́sí máa ń fa ìkùnà láìsí ìkìlọ̀
2. **Ṣètò `targetLatencyMs` tó bá òtítọ́ mu** — olùyan ọgbọ́n-àmúlò ń lò ó láti yan àwọn ẹ̀rọ
3. **Lo `getConfigSchema` fún dasibodu** — má ṣe fi àtúnṣe pamọ́ fún àwọn aṣàmúlò láé
4. **Ṣe àtìlẹ́yìn fún `stackable: true` tí ẹ̀rọ rẹ bá jẹ́ mímọ́** — àwọn ẹ̀rọ tó ní àbájáde ẹ̀gbẹ́ kò yẹ kí a tò pa pọ̀
5. **Kọ àwọn ìdánwò sínú kóòdù** — ó yẹ kí a lè ṣàyẹ̀wò àwọn ẹ̀rọ láàárín <1s

### Ìdàgbàsókè Àkójọpọ̀ Èdè

1. **Bẹ̀rẹ̀ pẹ̀lú agbára `lite`** — àwọn òfin rẹ gbọ́dọ̀ jẹ́ àìléwu ní ètò tó kéré jù
2. **Lo `context` láti fi ààlà sí àwọn òfin** — àwọn òfin `user` nìkan kò lè ní ipa lórí àwọn àṣẹ ìṣàmúlò láìròtẹ́lẹ̀
3. **Yẹra fún yíyan àwọn kọ́kọ́rọ́ JSON** — `\\bword\\b` lè bá ohun inú JSON mu, tó sì lè ba dátà oníṣètò jẹ́
4. **Dán an wò pẹ̀lú àwọn ipò ààlà** — ìwọlé òfìfo, unicode, ọ̀rọ̀ RTL, àwọn emoji
5. **Lo àwọn àkójọpọ̀ tó wà gẹ́gẹ́ bí àwòṣe** — `en/filler.json` ni àpẹẹrẹ tí a ti ṣe àgbékalẹ̀ rẹ̀ jù lọ

### Àpẹrẹ Ọ̀nà Ṣíṣe

1. **Ṣàyẹ̀wò ìṣiṣẹ́ kí o tó mú un sunwọ̀n sí i** — kọ́kọ́ wọ̀n pẹ̀lú `compression_stats`
2. **Yan àkópọ̀ dípò àtúnṣe láti ìbẹ̀rẹ̀** — fa àwọn òfin Caveman gùn kí o tó kọ ẹ̀rọ tuntun
3. **Ṣàkọsílẹ̀ ìdí fún bí a ṣe tò wọ́n** — ṣàlàyé nínú àlàyé ìdí tí ẹ̀rọ A fi ṣáájú ẹ̀rọ B
4. **Dán an wò ní gbogbo ìpele agbára mẹ́ta** — `lite` yára ṣùgbọ́n ó lè pàdánù dátà, `ultra` lọ́ra ṣùgbọ́n ó péye

---

## Ìtọ́kasí: Àwọn Ẹ̀rọ Tí A Fi Sínú Rẹ̀

| ID Ẹ̀rọ               | Ṣe Àkójọpọ̀ | stackPriority Àìyípadà | Àwọn Àfojúsùn                       |
| -------------------- | ---------- | ---------------------- | ----------------------------------- |
| `lite`               | Bẹ́ẹ̀ni      | 5                      | messages, tool_results              |
| `rtk`                | Bẹ́ẹ̀ni      | 10                     | tool_results                        |
| `standard` (caveman) | Bẹ́ẹ̀ni      | 20                     | messages, tool_results, code_blocks |
| `aggressive`         | Bẹ́ẹ̀ni      | 30                     | messages                            |
| `ultra`              | Bẹ́ẹ̀ni      | 40                     | messages, code_blocks               |

### Tún Wo

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — Àkópọ̀ ìwòye pipeline
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — Ìtọ́kasí àkọsílẹ̀ àwọn ẹ̀rọ
- [COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md) — Àlàyé pàtó nípa ìgbékalẹ̀ òfin
- [COMPRESSION_LANGUAGE_PACKS.md](./COMPRESSION_LANGUAGE_PACKS.md) — Àwọn àlàyé nípa àkójọpọ̀ èdè
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — Ẹ̀rọ RTK àti àwọn àsẹ àkànṣe
- Orísun: `open-sse/services/compression/` (fáìlì 117, ~250KB)
