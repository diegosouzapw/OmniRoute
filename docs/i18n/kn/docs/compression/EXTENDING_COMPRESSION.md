# Extending the Compression Pipeline (ಕನ್ನಡ)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/EXTENDING_COMPRESSION.md) · 🇪🇹 [am](../../../am/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇦 [ar](../../../ar/docs/compression/EXTENDING_COMPRESSION.md) · 🇦🇿 [az](../../../az/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇬 [bg](../../../bg/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇩 [bn](../../../bn/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇦 [bs](../../../bs/docs/compression/EXTENDING_COMPRESSION.md) · 🇨🇿 [cs](../../../cs/docs/compression/EXTENDING_COMPRESSION.md) · 🇩🇰 [da](../../../da/docs/compression/EXTENDING_COMPRESSION.md) · 🇩🇪 [de](../../../de/docs/compression/EXTENDING_COMPRESSION.md) · 🇬🇷 [el](../../../el/docs/compression/EXTENDING_COMPRESSION.md) · 🇪🇸 [es](../../../es/docs/compression/EXTENDING_COMPRESSION.md) · 🇪🇪 [et](../../../et/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇷 [fa](../../../fa/docs/compression/EXTENDING_COMPRESSION.md) · 🇫🇮 [fi](../../../fi/docs/compression/EXTENDING_COMPRESSION.md) · 🇫🇷 [fr](../../../fr/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇪 [ga](../../../ga/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [gu](../../../gu/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [ha](../../../ha/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇱 [he](../../../he/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [hi](../../../hi/docs/compression/EXTENDING_COMPRESSION.md) · 🇭🇷 [hr](../../../hr/docs/compression/EXTENDING_COMPRESSION.md) · 🇭🇺 [hu](../../../hu/docs/compression/EXTENDING_COMPRESSION.md) · 🇦🇲 [hy](../../../hy/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇩 [id](../../../id/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [ig](../../../ig/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇹 [it](../../../it/docs/compression/EXTENDING_COMPRESSION.md) · 🇯🇵 [ja](../../../ja/docs/compression/EXTENDING_COMPRESSION.md) · 🇬🇪 [ka](../../../ka/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇭 [km](../../../km/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇷 [ko](../../../ko/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇹 [lt](../../../lt/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇻 [lv](../../../lv/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [ml](../../../ml/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [mr](../../../mr/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇾 [ms](../../../ms/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇹 [mt](../../../mt/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇲 [my](../../../my/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇵 [ne](../../../ne/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇱 [nl](../../../nl/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇴 [no](../../../no/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [or](../../../or/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [pa](../../../pa/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇭 [phi](../../../phi/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇱 [pl](../../../pl/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇹 [pt](../../../pt/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇴 [ro](../../../ro/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇺 [ru](../../../ru/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇰 [si](../../../si/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇰 [sk](../../../sk/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇮 [sl](../../../sl/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇸 [sr](../../../sr/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇪 [sv](../../../sv/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇪 [sw](../../../sw/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [ta](../../../ta/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [te](../../../te/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇭 [th](../../../th/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇷 [tr](../../../tr/docs/compression/EXTENDING_COMPRESSION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇰 [ur](../../../ur/docs/compression/EXTENDING_COMPRESSION.md) · 🇺🇿 [uz](../../../uz/docs/compression/EXTENDING_COMPRESSION.md) · 🇻🇳 [vi](../../../vi/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [yo](../../../yo/docs/compression/EXTENDING_COMPRESSION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/EXTENDING_COMPRESSION.md)

---

> **ಸಂಕ್ಷಿಪ್ತವಾಗಿ**: OmniRoute ನ ಕಂಪ್ರೆಷನ್ ಎಂಜಿನ್ **ಪ್ಲಗ್ ಮಾಡಬಹುದಾದದ್ದು** — ನೀವು ಕಸ್ಟಮ್ ಎಂಜಿನ್ಗಳನ್ನು ನೋಂದಾಯಿಸಬಹುದು, ಹೊಸ ಭಾಷೆಗಳಿಗಾಗಿ ಭಾಷಾ ಪ್ಯಾಕ್ಗಳನ್ನು ವಿತರಿಸಬಹುದು ಮತ್ತು ಸ್ಟ್ಯಾಕ್ ಮಾಡಿದ ಪೈಪ್ಲೈನ್ಗಳನ್ನು ಸಂಯೋಜಿಸಬಹುದು. ಅದನ್ನು ಹೇಗೆ ಮಾಡುವುದು ಎಂಬುದನ್ನು ಈ ಮಾರ್ಗದರ್ಶಿ ತೋರಿಸುತ್ತದೆ.

**ಸಂಬಂಧಿತ ಮಾರ್ಗದರ್ಶಿಗಳು:**

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — ಸಂಪೂರ್ಣ ಪೈಪ್ಲೈನ್ ಅವಲೋಕನ
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — ಎಂಜಿನ್ ರಿಜಿಸ್ಟ್ರಿ ಮತ್ತು ಅಂತರ್ನಿರ್ಮಿತ ಎಂಜಿನ್ಗಳು
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — RTK ಎಂಜಿನ್ ಮತ್ತು ಕಸ್ಟಮ್ ಫಿಲ್ಟರ್ಗಳು
- [COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md) — ನಿಯಮ ಪ್ಯಾಕ್ ಸ್ವರೂಪದ ಉಲ್ಲೇಖ

---

## ಅವಲೋಕನ

ಕಂಪ್ರೆಷನ್ ವ್ಯವಸ್ಥೆಯು **3 ವಿಸ್ತರಣಾ ಬಿಂದುಗಳನ್ನು** ಹೊಂದಿದೆ:

| ವಿಸ್ತರಣಾ ಬಿಂದು              | ಬಳಕೆಯ ಸಂದರ್ಭ                                                             | ಕಠಿಣತೆ |
| --------------------------- | ------------------------------------------------------------------------ | ------ |
| **ಕಸ್ಟಮ್ ಎಂಜಿನ್**           | ಹೊಚ್ಚಹೊಸ ಕಂಪ್ರೆಷನ್ ಅಲ್ಗಾರಿದಮ್ ಸೇರಿಸಿ (ಉದಾ., ಡೊಮೇನ್-ನಿರ್ದಿಷ್ಟ ಸಾರಾಂಶಕಾರಕ) | ಉನ್ನತ  |
| **ಭಾಷಾ ಪ್ಯಾಕ್**             | ಹೊಸ ಸಹಜ ಭಾಷೆಗೆ ಬೆಂಬಲ ಸೇರಿಸಿ (ಉದಾ., ಹಿಂದಿ, ಅರೇಬಿಕ್)                       | ಮಧ್ಯಮ  |
| **ಸ್ಟ್ಯಾಕ್ ಮಾಡಿದ ಪೈಪ್ಲೈನ್** | ಅಸ್ತಿತ್ವದಲ್ಲಿರುವ ಎಂಜಿನ್ಗಳನ್ನು ಕಸ್ಟಮ್ ಕ್ರಮದಲ್ಲಿ ಸಂಯೋಜಿಸಿ                  | ಆರಂಭಿಕ |

```
┌─────────────────────────────────────────────────────────────┐
│                    ಕಂಪ್ರೆಷನ್ ಕಾರ್ಯತಂತ್ರ                       │
│                                                              │
│   ಇನ್ಪುಟ್ ಸಂದೇಶಗಳು ──▶ getEffectiveMode() ──▶ ಮೋಡ್          │
│                                              │               │
│                      ┌───────────────────────┼──────────┐    │
│                      │         │         │         │    │    │
│                      ▼         ▼         ▼         ▼    │    │
│                   "rtk"    "lite"   "standard" "stacked"    │
│                      │         │         │         │    │    │
│                      ▼         ▼         ▼         ▼    │    │
│                   RTK       Lite     Caveman   engines[]   │
│                   ಎಂಜಿನ್    ಎಂಜಿನ್   ಎಂಜಿನ್    ಸರಪಳಿಯಾಗಿ   │
│                                                ಜೋಡಿಸಲಾಗಿದೆ  │
│                      │         │         │         │    │    │
│                      └─────────┴─────────┴─────────┘    │    │
│                                      │                    │
│                                      ▼                    │
│                             ಕಂಪ್ರೆಸ್ ಮಾಡಿದ ಔಟ್ಪುಟ್          │
└─────────────────────────────────────────────────────────────┘

ಕಾರ್ಯತಂತ್ರ ಆಯ್ಕೆಗಾರವು ಮೋಡ್-ಆಧಾರಿತವಾಗಿದೆ: ಪ್ರತಿ ವಿನಂತಿಯು ಒಂದು ಮೋಡ್ ಅನ್ನು ಆಯ್ಕೆಮಾಡುತ್ತದೆ
(rtk / lite / standard / aggressive / ultra / stacked / off).
"stacked" ಮೋಡ್ ಮಾತ್ರ ಅನೇಕ ಎಂಜಿನ್ಗಳನ್ನು ಅನುಕ್ರಮವಾಗಿ ಸರಪಳಿಯಾಗಿಸುತ್ತದೆ.
ಡೀಫಾಲ್ಟ್ ಸ್ವಯಂ-ಪ್ರಚೋದಕ ಮೋಡ್ "lite" ಆಗಿದೆ (3-ಹಂತದ ಆದ್ಯತಾ ಸರಪಳಿಯಲ್ಲ).
```

---

## ಕಸ್ಟಮ್ ಕಂಪ್ರೆಷನ್ ಎಂಜಿನ್ ಬರೆಯುವುದು

ಎಂಜಿನ್ ಇಂಟರ್ಫೇಸ್ (`open-sse/services/compression/engines/types.ts`) ಪ್ರತಿಯೊಂದು ಎಂಜಿನ್ ಪೂರೈಸಬೇಕಾದ ಒಪ್ಪಂದವಾಗಿದೆ. ಇದು 5 ಅಗತ್ಯ ವಿಧಾನಗಳನ್ನು ಹೊಂದಿದೆ.

### `CompressionEngine` ಇಂಟರ್ಫೇಸ್

```ts
interface CompressionEngine {
  id: string; // ಅನನ್ಯ ಎಂಜಿನ್ ID
  name: string; // ಪ್ರದರ್ಶನ ಹೆಸರು
  description: string; // ಸಂಕ್ಷಿಪ್ತ ವಿವರಣೆ
  icon: string; // ಐಕಾನ್ (ಎಮೋಜಿ ಅಥವಾ URL)
  targets: CompressionEngineTarget[]; // ["messages", "tool_results", "code_blocks"]
  stackable: boolean; // ಸ್ಟ್ಯಾಕ್ ಮಾಡಿದ ಪೈಪ್ಲೈನ್ನಲ್ಲಿ ಬಳಸಬಹುದೇ
  stackPriority: number; // ಸ್ಟ್ಯಾಕ್ ಮಾಡಿದ ಪೈಪ್ಲೈನ್ಗಳಲ್ಲಿನ ಕ್ರಮ (ಕಡಿಮೆ = ಮೊದಲು)
  metadata: CompressionEngineMetadata;

  apply(body, options?): CompressionResult;
  compress(body, config?): CompressionResult;
  getConfigSchema(): EngineConfigField[];
  validateConfig(config): EngineValidationResult;
}
```

### ಕನಿಷ್ಠ ಉದಾಹರಣೆ: ವೈಟ್ಸ್ಪೇಸ್ ಎಂಜಿನ್

ಸಾಧ್ಯವಿರುವ ಅತ್ಯಂತ ಸರಳ ಎಂಜಿನ್ — ಸಂದೇಶಗಳಿಂದ ಹೆಚ್ಚುವರಿ ವೈಟ್ಸ್ಪೇಸ್ ಅನ್ನು ತೆಗೆದುಹಾಕುತ್ತದೆ.

````ts
import type { CompressionEngine } from "omniroute/compression/engines/types";
import { registerCompressionEngine } from "omniroute/compression/engines/registry";

function preserveCodeBlocks(text: string): string {
  // ಕೋಡ್ ಬ್ಲಾಕ್ ಗುರುತುಗಳ ಮೂಲಕ ವಿಭಜಿಸಿ ಮತ್ತು ಅವುಗಳೊಳಗಿನ ವೈಟ್ಸ್ಪೇಸ್ ಅನ್ನು ಉಳಿಸಿ
  const parts = text.split(/(```[\s\S]*?```)/);
  return parts
    .map((part) => {
      if (part.startsWith("```")) {
        return part; // ಕೋಡ್ ಬ್ಲಾಕ್ಗಳನ್ನು ಮಾರ್ಪಡಿಸಬೇಡಿ
      }
      return part.replace(/\n{3,}/g, "\n\n"); // ಗದ್ಯಕ್ಕೆ ಮಾತ್ರ ಅನ್ವಯಿಸಿ
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
  stackPriority: 100, // caveman/rtk ನಂತರ ರನ್ ಮಾಡಿ

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

    // ಸಂದೇಶ ಅರೇ ಮೂಲಕ ಸಂಚರಿಸಿ — ಸ್ಟ್ರಿಂಗ್ ಮತ್ತು ಮಲ್ಟಿಪಾರ್ಟ್ ವಿಷಯಗಳೆರಡನ್ನೂ ನಿರ್ವಹಿಸಿ
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
      // ಮಲ್ಟಿಪಾರ್ಟ್ ವಿಷಯ: ಭಾಗಗಳ ಮೂಲಕ ಸಂಚರಿಸಿ, ಪಠ್ಯ ಭಾಗಗಳನ್ನು ಮಾತ್ರ ಸಂಕುಚಿಸಿ
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
          return part; // image_url, tool_use ಮುಂತಾದವುಗಳನ್ನು ಉಳಿಸಿ.
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

// ಜಾಗತಿಕವಾಗಿ ನೋಂದಾಯಿಸಿ
registerCompressionEngine(whitespaceEngine);
````

### ಕಸ್ಟಮ್ ಎಂಜಿನ್ಗಳನ್ನು ಎಲ್ಲಿ ಇರಿಸಬೇಕು

```
~/.omniroute/compression/engines/my-engine.ts    # ಬಳಕೆದಾರ-ಮಟ್ಟ
<project>/compression-engines/my-engine.ts        # ಪ್ರಾಜೆಕ್ಟ್-ಮಟ್ಟ (ಪ್ರಾರಂಭದ ವೇಳೆ ಲೋಡ್ ಆಗುತ್ತದೆ)
```

ಅಥವಾ ಪ್ಲಗಿನ್ನಿಂದ ಪ್ರೋಗ್ರಾಮ್ಯಾಟಿಕ್ ಆಗಿ ಲೋಡ್ ಮಾಡಿ:

```ts
// ನಿಮ್ಮ ಪ್ಲಗಿನ್ನಲ್ಲಿ
import {
  registerCompressionEngine,
  unregisterCompressionEngine,
} from "@omniroute/open-sse/services/compression/engines/registry";
import { myEngine } from "./engines/my-engine";

export default definePlugin({
  name: "my-compression-plugin",
  // ಪ್ಲಗಿನ್ SDK onRequest / onResponse / onError ಹುಕ್ಗಳನ್ನು ಬಹಿರಂಗಪಡಿಸುತ್ತದೆ. ಪ್ಲಗಿನ್
  // ಮಾಡ್ಯೂಲ್ ಲೋಡ್ ಆದಾಗ (ಅಥವಾ ಮೊದಲ onRequest ವೇಳೆ) ಎಂಜಿನ್ ಅನ್ನು ನೋಂದಾಯಿಸಿ; ನಿಮ್ಮದೇ
  // ಟಿಯರ್ಡೌನ್ ಪಥದಿಂದ ಅದರ ನೋಂದಣಿಯನ್ನು ರದ್ದುಗೊಳಿಸಿ.
  onRequest: async (ctx) => {
    registerCompressionEngine(myEngine);
  },
});

// ಟಿಯರ್ಡೌನ್ ವೇಳೆ:
// unregisterCompressionEngine("my-engine");
```

### ನಿಮ್ಮ ಎಂಜಿನ್ ಅನ್ನು ಪರೀಕ್ಷಿಸುವುದು

ನಿಮ್ಮ ಎಂಜಿನ್ ಅನ್ನು ಪ್ಲಗಿನ್ ಅಥವಾ ಸ್ಟಾರ್ಟ್ಅಪ್ ಫಂಕ್ಷನ್ನಲ್ಲಿ ನೋಂದಾಯಿಸಿ. ನೋಂದಾಯಿಸಿದ ನಂತರ, ಎಂಜಿನ್ ಅದರ `id` ಮೂಲಕ ತಂತ್ರ ಆಯ್ಕೆಗಾರದಲ್ಲಿ ಲಭ್ಯವಿರುತ್ತದೆ.
ಅದನ್ನು ಸ್ಟ್ಯಾಕ್ ಮಾಡಿದ ಪೈಪ್ಲೈನ್ನಲ್ಲಿ ಸಂಯೋಜಿಸುವ ಮೂಲಕ ಏಕೀಕರಣವನ್ನು ಪರೀಕ್ಷಿಸಿ:

---

## ಭಾಷಾ ಪ್ಯಾಕ್ಗಳನ್ನು ರಚಿಸುವುದು

ಕೇವ್ಮ್ಯಾನ್-ಶೈಲಿಯ ಸಂಕೋಚನವು ಪ್ರತಿ ಸಹಜ ಭಾಷೆಯಲ್ಲಿರುವ ಅನಗತ್ಯ ಪದಗಳು, ಸಂದಿಗ್ಧ ಅಭಿವ್ಯಕ್ತಿಗಳು ಮತ್ತು ವಿಸ್ತೃತ ಮಾದರಿಗಳನ್ನು ನಿರ್ವಹಿಸಲು **ಭಾಷೆ-ನಿರ್ದಿಷ್ಟ ನಿಯಮ ಪ್ಯಾಕ್ಗಳನ್ನು** ಬಳಸುತ್ತದೆ. OmniRoute ಜೊತೆಗೆ **6 ಭಾಷಾ ಪ್ಯಾಕ್ಗಳು** ಲಭ್ಯವಿವೆ: `en`, `es`, `fr`, `de`, `ja`, `pt-BR`.

### ಪ್ಯಾಕ್ ರಚನೆ

ಭಾಷಾ ಪ್ಯಾಕ್ ಎಂದರೆ `open-sse/services/compression/rules/<language>/` ಅಡಿಯಲ್ಲಿರುವ **JSON ಫೈಲ್ಗಳ** ಡೈರೆಕ್ಟರಿ:

```
open-sse/services/compression/rules/
├── en/
│   ├── filler.json          # ಕುಶಲೋಪರಿಗಳು, ಸಂದಿಗ್ಧ ಅಭಿವ್ಯಕ್ತಿಗಳು, ವಿನಯ
│   ├── context.json         # ಸಂದರ್ಭವನ್ನು ಕಡಿಮೆ ಮಾಡುವ ನಿಯಮಗಳು
│   ├── dedup.json           # ನಕಲು ತೆಗೆದುಹಾಕುವ ನಿಯಮಗಳು
│   ├── structural.json      # ವಿರಾಮಚಿಹ್ನೆಗಳು, ಸ್ವರೂಪಣೆ
│   └── ultra.json           # ತೀವ್ರ ಸಂಕೋಚನ ನಿಯಮಗಳು
├── es/  (ಅದೇ ರಚನೆ)
├── fr/  (ಅದೇ ರಚನೆ)
├── de/  (ಅದೇ ರಚನೆ)
├── ja/  (ಅದೇ ರಚನೆ)
└── pt-BR/ (ಅದೇ ರಚನೆ)
```

### ನಿಯಮದ ರಚನೆ

ಪ್ರತಿಯೊಂದು ನಿಯಮವು ಈ ರಚನೆಯನ್ನು ಹೊಂದಿರುತ್ತದೆ (`open-sse/services/compression/ruleLoader.ts` ನಿಂದ):

```ts
interface FileRule {
  name: string; // ಮನುಷ್ಯರು ಓದಬಹುದಾದ ಹೆಸರು (kebab-case)
  pattern: string; // JavaScript regex ಮಾದರಿ
  replacement?: string; // ಹೊಂದಾಣಿಕೆಯನ್ನು ಯಾವುದರಿಂದ ಬದಲಾಯಿಸಬೇಕು
  replacementMap?: Record<string, string>; // ಅಥವಾ ಕೀ→ಬದಲಿ ಮ್ಯಾಪ್
  flags?: string; // Regex ಫ್ಲ್ಯಾಗ್ಗಳು (ಸಾಮಾನ್ಯವಾಗಿ "gi")
  context?: "all" | "user" | "system" | "assistant";
  category?: "filler" | "context" | "structural" | "dedup" | "terse" | "ultra";
  minIntensity?: "lite" | "full" | "ultra"; // ಈ ತೀವ್ರತೆಗಿಂತ ಕಡಿಮೆಯಿದ್ದರೆ ಬಿಟ್ಟುಬಿಡಿ
  description?: string; // ದಸ್ತಾವೇಜೀಕರಣ
}
```

### ಉದಾಹರಣೆ: ಹಿಂದಿ ಅನಗತ್ಯ ಪದಗಳ ನಿಯಮಗಳನ್ನು ಸೇರಿಸುವುದು

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
      "description": "'नमस्ते' ನಂತಹ ವಿನಯಪೂರ್ವಕ ಆರಂಭಿಕ ಪದಗಳನ್ನು ತೆಗೆದುಹಾಕಿ"
    },
    {
      "name": "filler_actually",
      "pattern": "\\b(?:असल में|वास्तव में|दरअसल)\\b\\s*",
      "replacement": "",
      "context": "all",
      "category": "filler",
      "minIntensity": "lite",
      "description": "'actually' ರೀತಿಯ ಅನಗತ್ಯ ಪದಗಳನ್ನು ತೆಗೆದುಹಾಕಿ"
    },
    {
      "name": "verbose_plea",
      "pattern": "\\b(?:कृपया|कृपया आप|अनुरोध है कि आप)\\b\\s*",
      "replacement": "",
      "context": "all",
      "category": "filler",
      "minIntensity": "full",
      "description": "ಹಿಂದಿಯಲ್ಲಿನ 'please' ಅನ್ನು ತೆಗೆದುಹಾಕಿ"
    }
  ]
}
```

### ಮೌಲ್ಯಮಾಪನ

ಲೋಡ್ ಮಾಡುವಾಗ ನಿಯಮ ಪ್ಯಾಕ್ಗಳನ್ನು `_schema.json` ಆಧರಿಸಿ ಮೌಲ್ಯಮಾಪನ ಮಾಡಲಾಗುತ್ತದೆ. ತಪ್ಪಾದ ರಚನೆಯನ್ನು ಹೊಂದಿರುವ ಪ್ಯಾಕ್ ಲೋಡ್ ಆಗುವುದಿಲ್ಲ ಮತ್ತು ದೋಷವನ್ನು ಲಾಗ್ ಮಾಡುತ್ತದೆ:

```
RULE_LOADER: ಪ್ಯಾಕ್ "hi/filler.json" ಮೌಲ್ಯಮಾಪನದಲ್ಲಿ ವಿಫಲವಾಗಿದೆ:
  - rules.0.pattern: ಅಮಾನ್ಯ regex
  - rules.1.context: [all, user, system, assistant] ಇವುಗಳಲ್ಲಿ ಒಂದಾಗಿರಬೇಕು
```

ಪ್ಯಾಕ್ ಲೋಡ್ ಆದಾಗ (`_schema.json` ಆಧರಿಸಿ) ಮೌಲ್ಯಮಾಪನವು ಸ್ವಯಂಚಾಲಿತವಾಗಿ ನಡೆಯುತ್ತದೆ; ಅಮಾನ್ಯ ಪ್ಯಾಕ್ ಅನ್ನು ತಿರಸ್ಕರಿಸಲಾಗುತ್ತದೆ ಮತ್ತು ಮೇಲಿನ ದೋಷವನ್ನು ಲಾಗ್ ಮಾಡಲಾಗುತ್ತದೆ. ಪ್ಯಾಕ್ ಮೌಲ್ಯಮಾಪನಕ್ಕಾಗಿ ಪ್ರತ್ಯೇಕ `npm run` ಸ್ಕ್ರಿಪ್ಟ್ ಇಲ್ಲ — ಪ್ಯಾಕ್ ಅನ್ನು ಲೋಡ್ ಮಾಡಿ (ಉದಾಹರಣೆಗೆ, ಸರ್ವರ್ ಪ್ರಾರಂಭಿಸಿ ಅಥವಾ ಸಂಕೋಚನ ಮಾರ್ಗವನ್ನು ಕಾರ್ಯಗತಗೊಳಿಸಿ) ಮತ್ತು ಲಾಗ್ಗಳನ್ನು ಗಮನಿಸಿ.

### ಕಸ್ಟಮ್ ಭಾಷಾ ಪ್ಯಾಕ್ ಅನ್ನು ಲೋಡ್ ಮಾಡುವುದು

```ts
import { loadRulePack } from "omniroute/compression/ruleLoader";

await loadRulePack("./my-custom-rules/hi/filler.json");
```

ಅಥವಾ ಗುರುತಿಸಲಾದ ಸ್ಥಳದಲ್ಲಿ ಇರಿಸಿ:

```
~/.omniroute/compression/rules/hi/filler.json  # ಬಳಕೆದಾರ-ಮಟ್ಟ
<project>/.compression/rules/hi/filler.json   # ಪ್ರಾಜೆಕ್ಟ್-ಮಟ್ಟ
```

### ಭಾಷಾ ಪ್ಯಾಕ್ಗಳ ಅತ್ಯುತ್ತಮ ಅಭ್ಯಾಸಗಳು

1. **`filler` ನಿಂದ ಪ್ರಾರಂಭಿಸಿ** — ಇವು ಅತ್ಯಧಿಕ ಪರಿಣಾಮ ಬೀರುವ ನಿಯಮಗಳು
2. **ತೀವ್ರ ನಿಯಮಗಳನ್ನು ನಿಯಂತ್ರಿಸಲು `minIntensity` ಬಳಸಿ** — ಇದು ಅತಿಯಾದ ಸಂಕೋಚನದಿಂದ ರಕ್ಷಿಸುತ್ತದೆ
3. **ಪರೀಕ್ಷಾ ಪ್ರಕರಣಗಳನ್ನು ಸೇರಿಸಿ** — ನಡವಳಿಕೆಯನ್ನು ಪರಿಶೀಲಿಸಲು JSON ನಲ್ಲಿ `tests[]` ಅರೆ ಸೇರಿಸಿ
4. **ಕ್ರಮ ಮುಖ್ಯವಾಗಿದೆ** — ಹಿಂದಿನ ನಿಯಮಗಳು ಮೊದಲು ಅನ್ವಯಿಸುತ್ತವೆ; ಹೆಚ್ಚು ಪರಿಣಾಮ ಬೀರುವ ನಿಯಮಗಳನ್ನು ಮೊದಲು ಇರಿಸಿ
5. **`replacement` ಅನ್ನು ಎಚ್ಚರಿಕೆಯಿಂದ ಬಳಸಿ** — ಖಾಲಿ ಸ್ಟ್ರಿಂಗ್ ಸಾಮಾನ್ಯವಾಗಿ ಸರಿಯಾಗಿರುತ್ತದೆ; ಹೊಸ ವಿಷಯವನ್ನು ಎಂದಿಗೂ ಸೇರಿಸಬೇಡಿ

### ಅನುವಾದ ಕಾರ್ಯತಂತ್ರ

ನಿಯಮ ಪ್ಯಾಕ್ಗಳನ್ನು ಹೊಸ ಭಾಷೆಗೆ ಸ್ಥಳೀಕರಿಸುವಾಗ:

1. **ನಿಯಮಗಳ ಹೆಸರುಗಳನ್ನು ಅನುವಾದಿಸಿ** — ಅವು ಡೀಬಗ್ ಔಟ್ಪುಟ್ನಲ್ಲಿ ಕಾಣಿಸಿಕೊಳ್ಳುತ್ತವೆ
2. **regex ಮಾದರಿಗಳನ್ನು ಹೊಂದಿಸಿ** — ನೇರ ಅನುವಾದವು ಸಾಮಾನ್ಯವಾಗಿ ವಿಫಲವಾಗುತ್ತದೆ (ಪದಗಳ ಗಡಿಗಳು ಭಿನ್ನವಾಗಿರುತ್ತವೆ)
3. **ನೈಜ ಸಂಭಾಷಣೆಗಳೊಂದಿಗೆ ಪರೀಕ್ಷಿಸಿ** — ಪ್ಯಾಕ್ ನಿಜವಾದ ಇನ್ಪುಟ್ನಲ್ಲಿ ಸುರಕ್ಷಿತವಾಗಿರಬೇಕು
4. **ಸಾಂಸ್ಕೃತಿಕ ಸಂಪ್ರದಾಯಗಳಿಗೆ ಹೊಂದಿಸಿ** — ಉದಾಹರಣೆಗೆ, ಜಪಾನೀಸ್ ಪ್ಯಾಕ್ಗಳಲ್ಲಿ ಇಂಗ್ಲಿಷ್ಗಿಂತ ಹೆಚ್ಚು ಗೌರವಸೂಚಕ ಅನಗತ್ಯ ಪದಗಳಿರುತ್ತವೆ

---

## ಸ್ಟ್ಯಾಕ್ ಮಾಡಿದ ಪೈಪ್ಲೈನ್ಗಳು

**ಸ್ಟ್ಯಾಕ್ ಮಾಡಿದ ಪೈಪ್ಲೈನ್** ಅನೇಕ ಎಂಜಿನ್ಗಳನ್ನು ಅನುಕ್ರಮವಾಗಿ ಚಲಾಯಿಸುತ್ತದೆ, ಪ್ರತಿಯೊಂದು ಎಂಜಿನ್ನ ಔಟ್ಪುಟ್ ಮುಂದಿನ ಎಂಜಿನ್ಗೆ ಇನ್ಪುಟ್ ಆಗುತ್ತದೆ. ಆಂತರಿಕವಾಗಿ `mode: stacked` ಕಾರ್ಯನಿರ್ವಹಿಸುವ ವಿಧಾನ ಇದೇ.

### ಸ್ಟ್ಯಾಕಿಂಗ್ ಹೇಗೆ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತದೆ

```
ಇನ್ಪುಟ್ (10,000 ಟೋಕನ್ಗಳು)
        │
        ▼
   ┌──────────┐
   │  ಎಂಜಿನ್  │  ಆದ್ಯತೆ 10
   │  A       │  ──▶ ಔಟ್ಪುಟ್: 6,000 ಟೋಕನ್ಗಳು (-40%)
   └────┬─────┘
        ▼
   ┌──────────┐
   │  ಎಂಜಿನ್  │  ಆದ್ಯತೆ 50
   │  B       │  ──▶ ಔಟ್ಪುಟ್: 2,400 ಟೋಕನ್ಗಳು (-60%)
   └────┬─────┘
        ▼
   ┌──────────┐
   │  ಎಂಜಿನ್  │  ಆದ್ಯತೆ 100
   │  C       │  ──▶ ಔಟ್ಪುಟ್: 1,200 ಟೋಕನ್ಗಳು (-80%)
   └────┬─────┘
        │
        ▼
ಅಂತಿಮ ಔಟ್ಪುಟ್ (1,200 ಟೋಕನ್ಗಳು, ಒಟ್ಟಾರೆಯಾಗಿ ~88% ಉಳಿತಾಯ)
```

`mode: "stacked"` ಆಯ್ಕೆಮಾಡಿದಾಗ, `pipeline` ಅರೇಯಲ್ಲಿ ನಿರ್ದಿಷ್ಟಪಡಿಸಿದ ಕ್ರಮದಲ್ಲಿ ಎಂಜಿನ್ಗಳು ಅನುಕ್ರಮವಾಗಿ ಕಾರ್ಯಗತಗೊಳ್ಳುತ್ತವೆ.
ಎಂಜಿನ್ N ನ ಔಟ್ಪುಟ್ ಎಂಜಿನ್ N+1 ರ ಇನ್ಪುಟ್ ಆಗುತ್ತದೆ.

### ಸಂಕೋಚನ ಮೋಡ್ಗಳು

ಕಾನ್ಫಿಗರೇಶನ್, ಸ್ವಯಂ-ಪ್ರಚೋದನೆ ಮಿತಿಗಳು ಮತ್ತು ಕಾಂಬೊ ಓವರ್ರೈಡ್ಗಳ ಆಧಾರದ ಮೇಲೆ OmniRoute ಪ್ರತಿ ವಿನಂತಿಗೆ **ಒಂದು ಮೋಡ್ ಅನ್ನು** ಆಯ್ಕೆಮಾಡುತ್ತದೆ.
ಲಭ್ಯವಿರುವ ಮೋಡ್ಗಳನ್ನು `open-sse/services/compression/types.ts` ನಲ್ಲಿ (`CompressionMode` ಪ್ರಕಾರ) ವ್ಯಾಖ್ಯಾನಿಸಲಾಗಿದೆ:

| ಮೋಡ್         | ಎಂಜಿನ್ಗಳು            | ಬಳಕೆಯ ಸಂದರ್ಭ                                                                                                                                                                                               |
| ------------ | -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `off`        | ಯಾವುದೂ ಇಲ್ಲ          | ಎಲ್ಲಾ ಸಂಕೋಚನವನ್ನು ನಿಷ್ಕ್ರಿಯಗೊಳಿಸಿ                                                                                                                                                                          |
| `rtk`        | RTK ಮಾತ್ರ            | ಕಮಾಂಡ್-ಔಟ್ಪುಟ್ ಹೆಚ್ಚಿರುವ ಸೆಷನ್ಗಳು (80%+ ಉಳಿತಾಯ)                                                                                                                                                            |
| `lite`       | Lite ಮಾತ್ರ           | ಸಂಪ್ರದಾಯಬದ್ಧ ಸಂಕೋಚನ (ವೇಗವಾದ, ಸುರಕ್ಷಿತ)                                                                                                                                                                     |
| `standard`   | Caveman              | ಭಾಷಾ ಪ್ಯಾಕ್ಗಳೊಂದಿಗೆ ಗದ್ಯ ಸಂಕೋಚನ                                                                                                                                                                            |
| `aggressive` | Caveman + Aggressive | ಆಕ್ರಮಣಕಾರಿ ಗದ್ಯ + ಆಕ್ರಮಣಕಾರಿ ಅಂತಿಮ ಪಾಸ್                                                                                                                                                                    |
| `ultra`      | Ultra                | ಗರಿಷ್ಠ ಸಂಕೋಚನ (ನಷ್ಟಕಾರಿ, ಕೊನೆಯ ಆಯ್ಕೆ). `ultra.modelPath` ಹೊಂದಿಸಿದಾಗ ಐಚ್ಛಿಕವಾಗಿ **LLMLingua-2** SLM ಎಂಜಿನ್ ಮೂಲಕ ರೂಟ್ ಮಾಡಲಾಗುತ್ತದೆ (ಮಾದರಿ ಲಭ್ಯವಿಲ್ಲದಿದ್ದಾಗ ನಿಯಮ-ಆಧಾರಿತ ಮಾರ್ಗಕ್ಕೆ ಮುಕ್ತವಾಗಿ ವಿಫಲಗೊಳ್ಳುತ್ತದೆ). |
| `stacked`    | ಕಸ್ಟಮ್ ಪೈಪ್ಲೈನ್      | ಎಂಜಿನ್ಗಳನ್ನು ಯಾವುದೇ ಕ್ರಮದಲ್ಲಿ ಸಂಯೋಜಿಸಿ (ಕೆಳಗೆ ನೋಡಿ)                                                                                                                                                        |

> ಮೇಲಿನ ಮೋಡ್ ಎಂಜಿನ್ಗಳ ಹೊರತಾಗಿ, ರಿಜಿಸ್ಟ್ರಿಯು ವಿಶೇಷೀಕೃತ ಸ್ಟ್ಯಾಕ್ ಮಾಡಬಹುದಾದ ಎಂಜಿನ್ಗಳನ್ನೂ ಒದಗಿಸುತ್ತದೆ —
> **CCR**, **headroom**, **ionizer**, ಮತ್ತು **session-dedup** — ಇವುಗಳನ್ನು
> [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md#additional-built-in-engines) ನಲ್ಲಿ ದಾಖಲಿಸಲಾಗಿದೆ.

ಮೋಡ್ ಆಯ್ಕೆಯನ್ನು `open-sse/services/compression/strategySelector.ts` ನಲ್ಲಿರುವ `getEffectiveMode()` ನಿರ್ಧರಿಸುತ್ತದೆ:

1. ಸಂಕೋಚನವನ್ನು ನಿಷ್ಕ್ರಿಯಗೊಳಿಸಿದ್ದರೆ: `"off"`
2. ಕಾಂಬೊ ಓವರ್ರೈಡ್ ಇದ್ದರೆ: ಓವರ್ರೈಡ್ ಬಳಸಿ
3. ಸ್ವಯಂ-ಪ್ರಚೋದನೆ ಮಿತಿಯನ್ನು ಮೀರಿದ್ದರೆ: `autoTriggerMode` ಬಳಸಿ (ಡೀಫಾಲ್ಟ್: `"lite"`)
4. ಇಲ್ಲದಿದ್ದರೆ: `defaultMode` ಬಳಸಿ

### ಡೀಫಾಲ್ಟ್ ಸ್ಟ್ಯಾಕ್ ಮಾಡಿದ ಪೈಪ್ಲೈನ್

`mode: "stacked"` ಅನ್ನು ಸ್ಪಷ್ಟವಾಗಿ ಕಾನ್ಫಿಗರ್ ಮಾಡಿದಾಗ, ಡೀಫಾಲ್ಟ್ ಪೈಪ್ಲೈನ್ ಇವುಗಳನ್ನು ಸಂಯೋಜಿಸುತ್ತದೆ:

1. **RTK** — ಕಮಾಂಡ್ ಔಟ್ಪುಟ್ನ ಅನಗತ್ಯ ಮಾಹಿತಿಯನ್ನು ತೆಗೆದುಹಾಕುತ್ತದೆ (ಟರ್ಮಿನಲ್ ಔಟ್ಪುಟ್ನಲ್ಲಿ ~80% ಉಳಿತಾಯ)
2. **Caveman** — ಅನಗತ್ಯ ಪದಗಳನ್ನು ತೆಗೆದುಹಾಕಿ, ಗದ್ಯವನ್ನು ಸಂಕ್ಷಿಪ್ತಗೊಳಿಸುತ್ತದೆ (ಉಳಿದ ಪಠ್ಯದಲ್ಲಿ ~46%)
3. **Lite** — ಅಂತಿಮ ವೈಟ್ಸ್ಪೇಸ್ + ನಕಲು ನಿವಾರಣೆಯ ಪಾಸ್

ಈ ಸಂಯೋಜನೆಯು ಟೂಲ್ಗಳನ್ನು ಹೆಚ್ಚಾಗಿ ಬಳಸುವ ಸೆಷನ್ಗಳಲ್ಲಿ **78-95% ಉಳಿತಾಯ** ಸಾಧಿಸುತ್ತದೆ.

### ಸ್ಟ್ಯಾಕ್ ಮಾಡಿದ ಪೈಪ್ಲೈನ್ಗಳನ್ನು ಕಾನ್ಫಿಗರ್ ಮಾಡುವುದು

ಕಾಂಬೊ ಕಾನ್ಫಿಗ್ನಲ್ಲಿ:

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

ನೀವು ಎಂಜಿನ್ಗಳನ್ನು ಬಿಟ್ಟುಬಿಡಬಹುದು, ಕಸ್ಟಮ್ ಎಂಜಿನ್ಗಳನ್ನು ಸೇರಿಸಬಹುದು ಅಥವಾ ಅವುಗಳ ಕ್ರಮವನ್ನು ಬದಲಾಯಿಸಬಹುದು.

### ಸ್ಥಿತಿ ರವಾನೆ

ಎಂಜಿನ್ಗಳು ವಿನಂತಿಯ ಸಂದರ್ಭದಿಂದ (`options` ನಲ್ಲಿ) ಮೆಟಾಡೇಟಾವನ್ನು ಓದಬಹುದು:

```ts
compress(body, config) {
  // ಹಿಂದಿನ ಎಂಜಿನ್ಗಳಿಂದ ಮೆಟಾಡೇಟಾವನ್ನು ಓದಿ
  const original = options?.compressionComboId;  // "my-coding-combo"
  // ...
}
```

ಮೆಟಾಡೇಟಾವು **ಓದಲು ಮಾತ್ರ** ಲಭ್ಯವಿದೆ — ಎಂಜಿನ್ಗಳು ವಿನಂತಿಯ ಸಂದರ್ಭವನ್ನು ಮಾರ್ಪಡಿಸಲು ಸಾಧ್ಯವಿಲ್ಲ, ತಮ್ಮ ಸ್ವಂತ ಬಾಡಿ ಔಟ್ಪುಟ್ ಅನ್ನು ಮಾತ್ರ ಮಾರ್ಪಡಿಸಬಹುದು.

### ಕಾರ್ಯಗತಗೊಳಿಸುವ ಕ್ರಮದ ಎಚ್ಚರಿಕೆಗಳು

| ಎಂಜಿನ್ ಕ್ರಮ                           | ಪರಿಣಾಮ                                                                                                       |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| RTK → Caveman → Lite                  | **ಶಿಫಾರಸು ಮಾಡಲಾಗಿದೆ** (ಮೊದಲು ಅನಗತ್ಯ ಮಾಹಿತಿಯನ್ನು, ನಂತರ ಭಾಷೆಯನ್ನು, ಕೊನೆಯಲ್ಲಿ ವೈಟ್ಸ್ಪೇಸ್ ಅನ್ನು ತೆಗೆದುಹಾಕುತ್ತದೆ) |
| Lite → RTK → Caveman                  | ಕೆಟ್ಟದು — Lite ಕಚ್ಚಾ ಔಟ್ಪುಟ್ನಿಂದ ವೈಟ್ಸ್ಪೇಸ್ ತೆಗೆದುಹಾಕುವುದರಿಂದ RTK ಪ್ಯಾಟರ್ನ್ ಹೊಂದಾಣಿಕೆ ವಿಫಲಗೊಳ್ಳುತ್ತದೆ        |
| Caveman → RTK                         | ಕೆಟ್ಟದು — RTK ಗುರುತಿಸಲಾಗದ ರೀತಿಯಲ್ಲಿ Caveman ಪಠ್ಯವನ್ನು ಮರುಬರೆಯಬಹುದು                                           |
| ಮೊದಲು `tool_results` ಇರುವ ಯಾವುದೇ ಕ್ರಮ | ಉತ್ತಮ — ಟೂಲ್ ಔಟ್ಪುಟ್ನಲ್ಲಿ ಅನಗತ್ಯ ವಿಷಯ ಅತ್ಯಧಿಕವಾಗಿರುತ್ತದೆ                                                     |

### ಯಾವಾಗ ಸ್ಟ್ಯಾಕ್ ಮಾಡಬಾರದು

ಸ್ಟ್ಯಾಕಿಂಗ್ ಯಾವಾಗಲೂ ಉತ್ತಮವಾಗಿರುವುದಿಲ್ಲ:

- **ಸರಳ ಸಂದೇಶಗಳು** (ಟೂಲ್ ಔಟ್ಪುಟ್ ಇಲ್ಲ) — ಒಂದೇ Caveman ಅಥವಾ Lite ಸಾಕು
- **ವೆಚ್ಚ-ಸೂಕ್ಷ್ಮ ಸಂದರ್ಭಗಳು** — ಪ್ರತಿ ಎಂಜಿನ್ ~5-50ms ವಿಳಂಬವನ್ನು ಸೇರಿಸುತ್ತದೆ
- **ನಿರ್ದಿಷ್ಟ ಟೂಲ್ಗಳು** — ಶೆಲ್ ಔಟ್ಪುಟ್ಗೆ RTK ಮಾತ್ರ ಸಾಮಾನ್ಯವಾಗಿ ಸಾಕಾಗುತ್ತದೆ

### ಕಸ್ಟಮ್ ಪೈಪ್ಲೈನ್ ನಿರ್ಮಿಸುವುದು

ಹೆಸರಿಸಲಾದ pipeline registry ಇಲ್ಲ. stacked pipeline ಎಂದರೆ `applyStackedCompression()` ಗೆ ರವಾನಿಸಲಾದ **ಹಂತಗಳ inline array** ಮಾತ್ರ (`@omniroute/open-sse/services/compression/strategySelector` ನಿಂದ export ಮಾಡಲಾಗಿದೆ):

```ts
import { applyStackedCompression } from "@omniroute/open-sse/services/compression/strategySelector";

const result = applyStackedCompression(body, [
  { engine: "rtk", intensity: "aggressive" },
  { engine: "caveman", intensity: "full" },
]);
```

ನೀವು pipeline ಅನ್ನು ರವಾನಿಸದಿದ್ದಾಗ, ಅದು ಪೂರ್ವನಿಯೋಜಿತವಾಗಿ `rtk(standard) → caveman(full)` ಅನ್ನು ಬಳಸುತ್ತದೆ.

ಇದನ್ನು config ನಿಂದ ನಿಯಂತ್ರಿಸಲು, `mode: "stacked"` ಅನ್ನು ಹೊಂದಿಸಿ ಮತ್ತು ಹಂತಗಳ array ಅನ್ನು `stackedPipeline` ಅಡಿಯಲ್ಲಿ ಒದಗಿಸಿ (`config.stackedPipeline` ನಿಂದ ಓದಲಾಗುತ್ತದೆ):

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

## ಅಪ್ಸ್ಟ್ರೀಮ್ ಸಿಂಕ್ ನೀತಿ

OmniRouteನ ಕಂಪ್ರೆಷನ್ ಎಂಜಿನ್ಗಳು READMEಯಲ್ಲಿ ಹಲವಾರು ಅಪ್ಸ್ಟ್ರೀಮ್ ಪ್ರಾಜೆಕ್ಟ್ಗಳಿಗೆ ಮನ್ನಣೆ ನೀಡುತ್ತವೆ
("RTK, Caveman, LLMLingua-2, Trogloditaಗಳಿಂದ ಪ್ರೇರಿತ"). ಕೊಡುಗೆದಾರರು ಸಾಮಾನ್ಯವಾಗಿ
ಕೇಳುವ ಪ್ರಶ್ನೆಯೆಂದರೆ: **ಅಪ್ಸ್ಟ್ರೀಮ್ RTK ಹೊಸ ಟೂಲ್ ಫಿಲ್ಟರ್ ಸೇರಿಸಿದಾಗ ಅಥವಾ Caveman ಹೊಸ ರೂಲ್
ಪ್ಯಾಕ್ ಸೇರಿಸಿದಾಗ, ಅದು OmniRouteಗೆ ಹೇಗೆ ತಲುಪುತ್ತದೆ?** ಈ ವಿಭಾಗವೇ ಅಧಿಕೃತ ಉತ್ತರವಾಗಿದೆ.

### ವೆಂಡರ್ ಮಾಡಿದ ಪ್ರತಿಗಳು ಮತ್ತು ಸ್ವತಂತ್ರ ಅನುಷ್ಠಾನಗಳು

| ಎಂಜಿನ್                       | ಅಪ್ಸ್ಟ್ರೀಮ್ನೊಂದಿಗಿನ ಸಂಬಂಧ                                                                                                            | ಸ್ಥಳ                                                                |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------- |
| **RTK**                      | **ಸ್ವತಂತ್ರ ಮರುಅನುಷ್ಠಾನ** (ಪ್ರೇರಿತವಾದದ್ದು, ಪ್ರತಿಯಲ್ಲ)                                                                                 | `open-sse/services/compression/engines/rtk/`                        |
| **Caveman**                  | **ಸ್ವತಂತ್ರ ಮರುಅನುಷ್ಠಾನ** (ಪ್ರೇರಿತವಾದದ್ದು)                                                                                            | `open-sse/services/compression/engines/cavemanAdapter.ts`           |
| **Headroom**                 | ಬಹುತೇಕ ಆಂತರಿಕ; `gcf/` ಕೋಡೆಕ್ ಮಾತ್ರ `gcf-typescript`ನಿಂದ **ನೈಜವಾಗಿ ವೆಂಡರ್ ಮಾಡಲಾಗಿದೆ** (MIT, SPDX-ಗುರುತಿಸಲಾದ, ಜೆನೆರಿಕ್ ಪ್ರೊಫೈಲ್ ಮಾತ್ರ) | `open-sse/services/compression/engines/headroom/gcf/`               |
| **LLMLingua-2 / Troglodita** | ಪ್ರೇರಿತವಾದದ್ದು (`llmlingua` + `session-dedup` ಎಂಜಿನ್ಗಳನ್ನು ಚಾಲಿತಗೊಳಿಸುತ್ತದೆ)                                                         | `open-sse/services/compression/engines/llmlingua/`, `session-dedup` |

ಮುಖ್ಯ ಅಂಶ: **RTK ಮತ್ತು Caveman _ಪರಿಕಲ್ಪನೆಗಳ_ (ಫಿಲ್ಟರ್ ನಿಯಮಗಳು, ರೂಲ್ ಪ್ಯಾಕ್ಗಳು)
ಕ್ಲೀನ್-ರೂಮ್ TypeScript ಅನುಷ್ಠಾನಗಳಾಗಿವೆ; ವೆಂಡರ್ ಮಾಡಿದ ಸೋರ್ಸ್ ಟ್ರೀಗಳಲ್ಲ.** `git pull`
ಮಾಡಲು ಯಾವುದೇ ಅಪ್ಸ್ಟ್ರೀಮ್ ಪ್ರತಿ ಇಲ್ಲ — ಇದೇ ಕಾರಣದಿಂದ READMEಯಲ್ಲಿ "bundled" ಎನ್ನುವ ಬದಲು
"inspired by" ಎಂದು ಹೇಳಲಾಗಿದೆ.

### ಅಪ್ಸ್ಟ್ರೀಮ್ ಸುಧಾರಣೆಗಳನ್ನು ಹೇಗೆ ವಿಲೀನಗೊಳಿಸಲಾಗುತ್ತದೆ

ವಿನ್ಯಾಸದ ಪ್ರಕಾರವೇ, **ಯಾವುದೇ ಸ್ವಯಂಚಾಲಿತ ಅಪ್ಸ್ಟ್ರೀಮ್-ರಿಲೀಸ್ ಟ್ರ್ಯಾಕಿಂಗ್ ಇಲ್ಲ ಮತ್ತು
ಯಾವುದೇ `compression-sync` ಲೇಬಲ್ ಇಲ್ಲ**. ಎಂಜಿನ್ಗಳು ಮರುಅನುಷ್ಠಾನಗಳಾಗಿರುವುದರಿಂದ, ಅಪ್ಸ್ಟ್ರೀಮ್
RTK ಫಿಲ್ಟರ್ ಅಥವಾ Caveman ರೂಲ್ ಪ್ಯಾಕ್ ಅನ್ನು ಕೋಡ್ ಆಗಿ ವಿಲೀನಗೊಳಿಸಲಾಗುವುದಿಲ್ಲ; ಬದಲಾಗಿ ಅದನ್ನು
**OmniRouteನ ಸ್ವಂತ ಸ್ವರೂಪದಲ್ಲಿ ಹೊಸ ನಿಯಮ/ಫಿಲ್ಟರ್ ಆಗಿ ಮರು-ವ್ಯಕ್ತಪಡಿಸಲಾಗುತ್ತದೆ** (ನೋಡಿ
[COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md)) ಮತ್ತು ಸಾಮಾನ್ಯ PR ಮೂಲಕ
ಅವಶ್ಯಕತೆಗೆ ಅನುಗುಣವಾಗಿ ಸೇರಿಸಲಾಗುತ್ತದೆ. ಮೇಲಿನ ವಿಸ್ತರಣಾ ಬಿಂದುಗಳು (ಕಸ್ಟಮ್ ಎಂಜಿನ್, ಭಾಷಾ ಪ್ಯಾಕ್,
RTK ಫಿಲ್ಟರ್) ಇಂತಹ ಕೊಡುಗೆಗಳನ್ನು ನೀಡಲು ಅನುಮೋದಿತ ಮಾರ್ಗಗಳಾಗಿವೆ.

ನಿಖರವಾಗಿ ಇದೇ ಪ್ರಕ್ರಿಯೆಯ ಇತ್ತೀಚಿನ ಉದಾಹರಣೆಗಳು:

- Gradle ಮತ್ತು `dotnet` ಬಿಲ್ಡ್ ಔಟ್ಪುಟ್ಗಾಗಿ RTK ಫಿಲ್ಟರ್ಗಳು (v3.8.42)
- kubectl / docker-build / composer / ghಗಾಗಿ RTK ಫಿಲ್ಟರ್ಗಳು (#2824)
- Caveman ಇಂಡೋನೇಷ್ಯನ್ ಭಾಷಾ ಪ್ಯಾಕ್ (#3975), ಜೊತೆಗೆ ಜರ್ಮನ್ / ಫ್ರೆಂಚ್ / ಜಪಾನೀಸ್ / ಚೈನೀಸ್ ಪ್ಯಾಕ್ಗಳು

### Headroom (ಇನ್ಪುಟ್-ಕಂಪ್ರೆಷನ್ ಪ್ರಾಕ್ಸಿ)

Headroom **ಸಂಪೂರ್ಣವಾಗಿ ಆಂತರಿಕವಾಗಿದೆ** — ಪಿನ್ ಮಾಡಲಾದ, ವೆಂಡರ್ ಮಾಡಿದ `gcf` ಕೋಡೆಕ್ ಸ್ನ್ಯಾಪ್ಶಾಟ್
ಮತ್ತು OmniRouteನ ಸ್ವಂತ `smartcrusher` / `toon` / `tabular` ಲೇಯರ್ಗಳು. ವೆಂಡರ್ ಮಾಡಿದ
ಪ್ರತಿಯನ್ನು ಹೊರತುಪಡಿಸಿ ಟ್ರ್ಯಾಕ್ ಮಾಡಲು ಯಾವುದೇ ಸಕ್ರಿಯ ಅಪ್ಸ್ಟ್ರೀಮ್ ಇಲ್ಲ; ಕೋಡೆಕ್ ಬದಲಾದಾಗ
`gcf`ಗೆ ಸಂಬಂಧಿಸಿದ ಅಪ್ಡೇಟ್ಗಳನ್ನು ಕೈಯಾರೆ ರಿಫ್ರೆಶ್ ಮಾಡಲಾಗುತ್ತದೆ ಮತ್ತು ಕಂಪ್ರೆಷನ್ ಬಜೆಟ್
ಗೇಟ್ (`check:compression-budget`) ವಿರುದ್ಧ ಮರು-ಮಾನ್ಯೀಕರಿಸಲಾಗುತ್ತದೆ.

### ಅಪ್ಸ್ಟ್ರೀಮ್-ಪ್ರೇರಿತ ಸುಧಾರಣೆಯನ್ನು ಪ್ರಸ್ತಾಪಿಸುವುದು

1. **ವೆಂಡರ್ ಮಾಡಬೇಡಿ** — ಅಪ್ಸ್ಟ್ರೀಮ್ ನಿಯಮ/ಫಿಲ್ಟರ್ ಅನ್ನು OmniRouteನ ಸ್ವರೂಪದಲ್ಲಿ ಮರು-ವ್ಯಕ್ತಪಡಿಸಿ.
2. ಕೆಳಗಿನ ಹೊಂದಾಣಿಕೆಯ ವಿಸ್ತರಣಾ ಬಿಂದುವಿನ ಮೂಲಕ ಅದನ್ನು ಸೇರಿಸಿ (ಭಾಷಾ ಪ್ಯಾಕ್, RTK ಫಿಲ್ಟರ್, ಅಥವಾ
   ಕಸ್ಟಮ್ ಎಂಜಿನ್).
3. PR ವಿವರಣೆಯಲ್ಲಿ ಅಪ್ಸ್ಟ್ರೀಮ್ ಪ್ರಾಜೆಕ್ಟ್ ಅನ್ನು ಉಲ್ಲೇಖಿಸಿ (ಮನ್ನಣೆಗಾಗಿ), ಅದರ
   ಲೈಸೆನ್ಸ್ ಹೊಂದಿರುವ ಸೋರ್ಸ್ ಅನ್ನು ನಕಲಿಸಬೇಡಿ.
4. ಪರೀಕ್ಷೆಗಳನ್ನು ಸೇರಿಸಿ ಮತ್ತು `check:compression-budget` ಗೇಟ್ ಇನ್ನೂ ಪಾಸ್ ಆಗುವುದನ್ನು ಖಚಿತಪಡಿಸಿ.

---

## ಔಟ್ಪುಟ್ ಶೈಲಿಯನ್ನು ಸೇರಿಸುವುದು

ಔಟ್ಪುಟ್ ಶೈಲಿಗಳು ([ಮಾರ್ಗದರ್ಶಿಯ ಕ್ಯಾಟಲಾಗ್ ಕೋಷ್ಟಕ](./COMPRESSION_GUIDE.md#output-styles-catalog) ನೋಡಿ)
ಇನ್ಪುಟ್ ಎಂಜಿನ್ಗಳಿಗೆ ಪ್ರತಿಕ್ರಿಯೆಯ ಭಾಗದ ಸಮಾನರೂಪವಾಗಿವೆ: ನೀವು ಕಳುಹಿಸುವುದನ್ನು ಸಂಕುಚಿಸುವ ಬದಲು,
ಕಡಿಮೆ ವೆಚ್ಚದ ಔಟ್ಪುಟ್ ಉತ್ಪಾದಿಸಲು ಅವು ಮಾಡೆಲ್ಗೆ ಸೂಚಿಸುತ್ತವೆ. ರಿಜಿಸ್ಟ್ರಿಯು
`open-sse/services/compression/outputStyles/catalog.ts` ನಲ್ಲಿರುವ `OUTPUT_STYLE_CATALOG` ಆಗಿದೆ, ಮತ್ತು
**ಒಂದು ಕ್ಯಾಟಲಾಗ್ ನಮೂದೆಯೇ ಸಂಪೂರ್ಣ ವೈಶಿಷ್ಟ್ಯವಾಗಿದೆ**: ಇಂಜೆಕ್ಟರ್, ಡ್ಯಾಶ್ಬೋರ್ಡ್ ಸೆಟ್ಟಿಂಗ್ಗಳ ಫಲಕ,
ಸ್ಥಿರ ಸಂಗ್ರಹಣೆ ಮತ್ತು ಟೆಲಿಮೆಟ್ರಿ ಎಲ್ಲವೂ ಕ್ಯಾಟಲಾಗ್ ಅನ್ನು ಎಣಿಸುತ್ತವೆ — ನವೀಕರಿಸಲು ಬೇರೆ ಯಾವುದೇ ಪಟ್ಟಿ ಇಲ್ಲ.

1. **`id`, `label`, `description` ಮತ್ತು ಮೂರು ಇಂಗ್ಲಿಷ್ `levels` (`lite`, `full`, `ultra`) ಜೊತೆಗೆ `OUTPUT_STYLE_CATALOG` ಗೆ ಒಂದು ನಮೂದನ್ನು ಸೇರಿಸಿ.** ಕೋಡ್, ಪಥಗಳು, ಕಮಾಂಡ್ಗಳು, ದೋಷಗಳು ಮತ್ತು URL-ಗಳು ಯಥಾವತ್ತಾಗಿ ಉಳಿಯುವಂತೆ ಪ್ರತಿ ಹಂತವೂ
   `${SHARED_BOUNDARIES}` ನೊಂದಿಗೆ ಕೊನೆಗೊಳ್ಳಬೇಕು.
   ಸೂಚನೆಯ ಪಠ್ಯವು ಪ್ರತಿ `(id, level, language)` ಗೆ **ಸ್ಥಿರ ಮತ್ತು ನಿರ್ಣಾಯಕ**ವಾಗಿರಬೇಕು — `${SHARED_BOUNDARIES}` ಮಾತ್ರ ಅನುಮತಿಸಲಾದ ಇಂಟರ್ಪೋಲೇಷನ್ ಆಗಿದೆ.
2. **ಅದನ್ನು ಅನುವಾದಿಸಿ.** `i18n` ಅಡಿಯಲ್ಲಿ ಕನಿಷ್ಠ ಒಂದು `pt-BR` ಬ್ಲಾಕ್ ಅನ್ನು ಒದಗಿಸಿ; `ponytail` ಮತ್ತು
   `i-have-adhd` (en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi) ಉಲ್ಲೇಖ ಮಾದರಿಗಳಾಗಿವೆ. ಉದ್ದೇಶಪೂರ್ವಕವಾಗಿ
   ಒಂದೇ ಭಾಷೆಯ ಶೈಲಿಯು ಅದರ ಬದಲು `locale` ಅನ್ನು ಹೊಂದಿಸುತ್ತದೆ (`terse-cjk` → `zh` ನಂತೆ), ನಂತರ ಅದನ್ನು
   ಆ ಲೊಕೇಲ್ನಲ್ಲಿ ಮಾತ್ರ ನೀಡಲಾಗುತ್ತದೆ.
3. **ಮ್ಯಾಟ್ರಿಕ್ಸ್ ಗಾರ್ಡ್ ಅನ್ನು ನವೀಕರಿಸಿ** — `tests/unit/compression/output-styles-i18n-matrix.test.ts` ನಲ್ಲಿರುವ
   `BASELINE_LANGUAGES` ಗೆ ಶೈಲಿಯ ಭಾಷೆಗಳನ್ನು ಸೇರಿಸಿ. ಸ್ಪಷ್ಟವಾದ
   ಟ್ರ್ಯಾಕಿಂಗ್ ಸಮಸ್ಯೆಯೊಂದಿಗಿನ `KNOWN_ENGLISH_ONLY` ನಮೂದನ್ನು ಹೊಂದಿರದ ಹೊರತು, ಅಗತ್ಯ ಅನುವಾದಗಳಿಲ್ಲದ ಯಾವುದೇ ಹೊಸ
   ಲೊಕೇಲ್-ಗೇಟ್ ಮಾಡದ ಶೈಲಿಗೆ ಗೇಟ್ ವಿಫಲವಾಗುತ್ತದೆ.
4. **ಪ್ರತಿ ಶೈಲಿಗೆ ಪರೀಕ್ಷೆಯನ್ನು ಸೇರಿಸಿ**, ಇದಕ್ಕೆ
   `tests/unit/compression/i-have-adhd-catalog.test.ts` ಅನ್ನು ಮಾದರಿಯಾಗಿ ಬಳಸಿ: ಕ್ಯಾಟಲಾಗ್ ರಚನೆ, ಪ್ರತಿ ಹಂತದ
   ಬೌಂಡರೀಸ್ ಷರತ್ತು ಮತ್ತು ಪ್ರತಿಯೊಂದು ಅನುವಾದವು ಇಂಗ್ಲಿಷ್ನಿಂದ ನಕಲಿಸಲ್ಪಟ್ಟಿಲ್ಲದೆ ತನ್ನದೇ ಭಾಷೆಯಲ್ಲಿ ಬರೆಯಲ್ಪಟ್ಟಿದೆ ಎಂದು ದೃಢೀಕರಿಸುವ ಆಂಕರ್.
5. **ಮೂಲಸ್ವೀಕೃತಿ**: ಶೈಲಿಯನ್ನು ಅಪ್ಸ್ಟ್ರೀಮ್ ಪ್ರಾಜೆಕ್ಟ್ನಿಂದ ಅಳವಡಿಸಿಕೊಂಡಿದ್ದರೆ, ನಮೂದಿನಲ್ಲಿರುವ
   ಮೂಲ ಕಾಮೆಂಟ್ನಲ್ಲಿ ಅದಕ್ಕೆ ಮನ್ನಣೆ ನೀಡಿ (ಉದಾ. `i-have-adhd` → ayghri/i-have-adhd, MIT) — ಮೇಲಿನ
   "ಅಪ್ಸ್ಟ್ರೀಮ್-ಪ್ರೇರಿತ ಸುಧಾರಣೆಯನ್ನು ಪ್ರಸ್ತಾಪಿಸುವುದು" ಎಂಬುದಕ್ಕೆ ಅನ್ವಯಿಸುವ ಅದೇ ನಿಯಮ.

ಯಾವುದೇ UI, ಸ್ಕೀಮಾ ಅಥವಾ ಟೆಲಿಮೆಟ್ರಿ ಬದಲಾವಣೆ ಅಗತ್ಯವಿಲ್ಲ — ಆ ಮೇಲ್ಮೈಗಳು ಕ್ಯಾಟಲಾಗ್ನಿಂದ ರೆಂಡರ್ ಆಗುತ್ತವೆ.

---

## ಉತ್ತಮ ಅಭ್ಯಾಸಗಳು

### ಎಂಜಿನ್ ಅಭಿವೃದ್ಧಿ

1. **ಯಾವಾಗಲೂ `validateConfig` ಅನ್ನು ಅನುಷ್ಠಾನಗೊಳಿಸಿ** — ಮೌಲ್ಯೀಕರಣವಿಲ್ಲದ ಎಂಜಿನ್ಗಳು ಗಮನಕ್ಕೆ ಬಾರದ ವೈಫಲ್ಯಗಳನ್ನು ಉಂಟುಮಾಡುತ್ತವೆ
2. **ವಾಸ್ತವಿಕ `targetLatencyMs` ಅನ್ನು ಹೊಂದಿಸಿ** — ಎಂಜಿನ್ಗಳನ್ನು ಆಯ್ಕೆಮಾಡಲು ತಂತ್ರದ ಆಯ್ಕೆಗಾರ ಇದನ್ನು ಬಳಸುತ್ತಾನೆ
3. **ಡ್ಯಾಶ್ಬೋರ್ಡ್ಗಾಗಿ `getConfigSchema` ಬಳಸಿ** — ಬಳಕೆದಾರರಿಂದ ಕಾನ್ಫಿಗ್ ಅನ್ನು ಎಂದಿಗೂ ಮರೆಮಾಡಬೇಡಿ
4. **ನಿಮ್ಮ ಎಂಜಿನ್ ಶುದ್ಧವಾಗಿದ್ದರೆ `stackable: true` ಅನ್ನು ಬೆಂಬಲಿಸಿ** — ಅಡ್ಡ ಪರಿಣಾಮಗಳನ್ನು ಹೊಂದಿರುವ ಎಂಜಿನ್ಗಳನ್ನು ಸ್ಟ್ಯಾಕ್ ಮಾಡಬಾರದು
5. **ಇನ್ಲೈನ್ ಪರೀಕ್ಷೆಗಳನ್ನು ಬರೆಯಿರಿ** — ಎಂಜಿನ್ಗಳನ್ನು <1s ಅವಧಿಯಲ್ಲಿ ಪರಿಶೀಲಿಸಲು ಸಾಧ್ಯವಾಗಬೇಕು

### ಭಾಷಾ ಪ್ಯಾಕ್ ಅಭಿವೃದ್ಧಿ

1. **`lite` ತೀವ್ರತೆಯಿಂದ ಪ್ರಾರಂಭಿಸಿ** — ನಿಮ್ಮ ನಿಯಮಗಳು ಅತ್ಯಂತ ಕಡಿಮೆ ಸೆಟ್ಟಿಂಗ್ನಲ್ಲಿಯೂ ಸುರಕ್ಷಿತವಾಗಿರಬೇಕು
2. **ನಿಯಮಗಳ ವ್ಯಾಪ್ತಿಯನ್ನು ನಿರ್ಧರಿಸಲು `context` ಬಳಸಿ** — `user` ಗೆ ಮಾತ್ರ ಅನ್ವಯಿಸುವ ನಿಯಮಗಳು ಆಕಸ್ಮಿಕವಾಗಿ ಸಿಸ್ಟಮ್ ಪ್ರಾಂಪ್ಟ್ಗಳ ಮೇಲೆ ಪರಿಣಾಮ ಬೀರಲು ಸಾಧ್ಯವಿಲ್ಲ
3. **JSON ಕೀಗಳನ್ನು ಕ್ಯಾಪ್ಚರ್ ಮಾಡುವುದನ್ನು ತಪ್ಪಿಸಿ** — `\\bword\\b` JSON ಒಳಗೆ ಹೊಂದಾಣಿಕೆಯಾಗಬಹುದು ಮತ್ತು ರಚನಾತ್ಮಕ ಡೇಟಾವನ್ನು ಹಾಳುಮಾಡಬಹುದು
4. **ಅಂಚಿನ ಸಂದರ್ಭಗಳೊಂದಿಗೆ ಪರೀಕ್ಷಿಸಿ** — ಖಾಲಿ ಇನ್ಪುಟ್, ಯುನಿಕೋಡ್, RTL ಪಠ್ಯ, ಇಮೋಜಿಗಳು
5. **ಅಸ್ತಿತ್ವದಲ್ಲಿರುವ ಪ್ಯಾಕ್ಗಳನ್ನು ಟೆಂಪ್ಲೇಟ್ಗಳಾಗಿ ಬಳಸಿ** — `en/filler.json` ಅತ್ಯಂತ ಅಭಿವೃದ್ಧಿಗೊಂಡ ಉದಾಹರಣೆಯಾಗಿದೆ

### ಪೈಪ್ಲೈನ್ ವಿನ್ಯಾಸ

1. **ಆಪ್ಟಿಮೈಸ್ ಮಾಡುವ ಮೊದಲು ಪ್ರೊಫೈಲ್ ಮಾಡಿ** — ಮೊದಲು `compression_stats` ಬಳಸಿ ಅಳೆಯಿರಿ
2. **ಮರುಅನುಷ್ಠಾನಕ್ಕಿಂತ ಸಂಯೋಜನೆಗೆ ಆದ್ಯತೆ ನೀಡಿ** — ಹೊಸ ಎಂಜಿನ್ ಬರೆಯುವ ಮೊದಲು Caveman ನಿಯಮಗಳನ್ನು ವಿಸ್ತರಿಸಿ
3. **ಕ್ರಮದ ತಾರ್ಕಿಕತೆಯನ್ನು ದಾಖಲಿಸಿ** — ಎಂಜಿನ್ A ಅನ್ನು ಎಂಜಿನ್ B ಗಿಂತ ಮೊದಲು ಏಕೆ ಇರಿಸಲಾಗಿದೆ ಎಂಬುದನ್ನು ಕಾಮೆಂಟ್ ಮಾಡಿ
4. **ಎಲ್ಲಾ 3 ತೀವ್ರತಾ ಹಂತಗಳಲ್ಲಿ ಪರೀಕ್ಷಿಸಿ** — `lite` ವೇಗವಾಗಿದೆ ಆದರೆ ನಷ್ಟಕರವಾಗಿದೆ, `ultra` ನಿಧಾನವಾಗಿದೆ ಆದರೆ ನಿಖರವಾಗಿದೆ

---

## ಉಲ್ಲೇಖ: ಅಂತರ್ನಿರ್ಮಿತ ಎಂಜಿನ್ಗಳು

| ಎಂಜಿನ್ ID            | ಸ್ಟ್ಯಾಕ್ ಮಾಡಬಹುದೇ | ಡೀಫಾಲ್ಟ್ stackPriority | ಗುರಿಗಳು                             |
| -------------------- | ----------------- | ---------------------- | ----------------------------------- |
| `lite`               | ಹೌದು              | 5                      | ಸಂದೇಶಗಳು, tool_results              |
| `rtk`                | ಹೌದು              | 10                     | tool_results                        |
| `standard` (caveman) | ಹೌದು              | 20                     | ಸಂದೇಶಗಳು, tool_results, code_blocks |
| `aggressive`         | ಹೌದು              | 30                     | ಸಂದೇಶಗಳು                            |
| `ultra`              | ಹೌದು              | 40                     | ಸಂದೇಶಗಳು, code_blocks               |

### ಇದನ್ನೂ ನೋಡಿ

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — ಪೈಪ್ಲೈನ್ ಅವಲೋಕನ
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — ಎಂಜಿನ್ ರಿಜಿಸ್ಟ್ರಿ ಉಲ್ಲೇಖ
- [COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md) — ನಿಯಮ ಸ್ವರೂಪದ ನಿರ್ದಿಷ್ಟತೆ
- [COMPRESSION_LANGUAGE_PACKS.md](./COMPRESSION_LANGUAGE_PACKS.md) — ಭಾಷಾ ಪ್ಯಾಕ್ ವಿವರಗಳು
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — RTK ಎಂಜಿನ್ ಮತ್ತು ಕಸ್ಟಮ್ ಫಿಲ್ಟರ್ಗಳು
- ಮೂಲ: `open-sse/services/compression/` (117 ಫೈಲ್ಗಳು, ~250KB)
