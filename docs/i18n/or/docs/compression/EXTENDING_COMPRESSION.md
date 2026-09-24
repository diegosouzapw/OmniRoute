# Extending the Compression Pipeline (ଓଡ଼ିଆ)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/EXTENDING_COMPRESSION.md) · 🇪🇹 [am](../../../am/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇦 [ar](../../../ar/docs/compression/EXTENDING_COMPRESSION.md) · 🇦🇿 [az](../../../az/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇬 [bg](../../../bg/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇩 [bn](../../../bn/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇦 [bs](../../../bs/docs/compression/EXTENDING_COMPRESSION.md) · 🇨🇿 [cs](../../../cs/docs/compression/EXTENDING_COMPRESSION.md) · 🇩🇰 [da](../../../da/docs/compression/EXTENDING_COMPRESSION.md) · 🇩🇪 [de](../../../de/docs/compression/EXTENDING_COMPRESSION.md) · 🇬🇷 [el](../../../el/docs/compression/EXTENDING_COMPRESSION.md) · 🇪🇸 [es](../../../es/docs/compression/EXTENDING_COMPRESSION.md) · 🇪🇪 [et](../../../et/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇷 [fa](../../../fa/docs/compression/EXTENDING_COMPRESSION.md) · 🇫🇮 [fi](../../../fi/docs/compression/EXTENDING_COMPRESSION.md) · 🇫🇷 [fr](../../../fr/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇪 [ga](../../../ga/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [gu](../../../gu/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [ha](../../../ha/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇱 [he](../../../he/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [hi](../../../hi/docs/compression/EXTENDING_COMPRESSION.md) · 🇭🇷 [hr](../../../hr/docs/compression/EXTENDING_COMPRESSION.md) · 🇭🇺 [hu](../../../hu/docs/compression/EXTENDING_COMPRESSION.md) · 🇦🇲 [hy](../../../hy/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇩 [id](../../../id/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [ig](../../../ig/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇹 [it](../../../it/docs/compression/EXTENDING_COMPRESSION.md) · 🇯🇵 [ja](../../../ja/docs/compression/EXTENDING_COMPRESSION.md) · 🇬🇪 [ka](../../../ka/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇭 [km](../../../km/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [kn](../../../kn/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇷 [ko](../../../ko/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇹 [lt](../../../lt/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇻 [lv](../../../lv/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [ml](../../../ml/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [mr](../../../mr/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇾 [ms](../../../ms/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇹 [mt](../../../mt/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇲 [my](../../../my/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇵 [ne](../../../ne/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇱 [nl](../../../nl/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇴 [no](../../../no/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [pa](../../../pa/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇭 [phi](../../../phi/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇱 [pl](../../../pl/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇹 [pt](../../../pt/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇴 [ro](../../../ro/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇺 [ru](../../../ru/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇰 [si](../../../si/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇰 [sk](../../../sk/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇮 [sl](../../../sl/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇸 [sr](../../../sr/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇪 [sv](../../../sv/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇪 [sw](../../../sw/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [ta](../../../ta/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [te](../../../te/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇭 [th](../../../th/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇷 [tr](../../../tr/docs/compression/EXTENDING_COMPRESSION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇰 [ur](../../../ur/docs/compression/EXTENDING_COMPRESSION.md) · 🇺🇿 [uz](../../../uz/docs/compression/EXTENDING_COMPRESSION.md) · 🇻🇳 [vi](../../../vi/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [yo](../../../yo/docs/compression/EXTENDING_COMPRESSION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/EXTENDING_COMPRESSION.md)

---

> **TL;DR**: OmniRouteର କମ୍ପ୍ରେସନ୍ ଇଞ୍ଜିନ୍ **ପ୍ଲଗ୍ଯୋଗ୍ୟ** — ଆପଣ କଷ୍ଟମ୍ ଇଞ୍ଜିନ୍ ପଞ୍ଜୀକୃତ କରିପାରିବେ, ନୂତନ ଭାଷା ପାଇଁ ଭାଷା ପ୍ୟାକ୍ ପ୍ରଦାନ କରିପାରିବେ ଏବଂ ଷ୍ଟାକ୍ଡ୍ ପାଇପ୍ଲାଇନ୍ ସଂଯୋଜନ କରିପାରିବେ। ଏହି ଗାଇଡ୍ରେ ଏହା କିପରି କରିବେ ତାହା ଦର୍ଶାଯାଇଛି।

**ସମ୍ବନ୍ଧିତ ଗାଇଡ୍ଗୁଡ଼ିକ:**

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — ସମ୍ପୂର୍ଣ୍ଣ ପାଇପ୍ଲାଇନ୍ର ସାରାଂଶ
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — ଇଞ୍ଜିନ୍ ରେଜିଷ୍ଟ୍ରି ଏବଂ ବିଲ୍ଟ-ଇନ୍ ଇଞ୍ଜିନ୍ଗୁଡ଼ିକ
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — RTK ଇଞ୍ଜିନ୍ ଏବଂ କଷ୍ଟମ୍ ଫିଲ୍ଟର୍ଗୁଡ଼ିକ
- [COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md) — ନିୟମ ପ୍ୟାକ୍ ଫର୍ମାଟ୍ ସନ୍ଦର୍ଭ

---

## ସାରାଂଶ

କମ୍ପ୍ରେସନ୍ ସିଷ୍ଟମ୍ରେ **3ଟି ଏକ୍ସଟେନ୍ସନ୍ ପଏଣ୍ଟ** ରହିଛି:

| ଏକ୍ସଟେନ୍ସନ୍ ପଏଣ୍ଟ       | ବ୍ୟବହାର କ୍ଷେତ୍ର                                                                       | କଠିନତା     |
| ----------------------- | ------------------------------------------------------------------------------------- | ---------- |
| **କଷ୍ଟମ୍ ଇଞ୍ଜିନ୍**      | ଏକ ସମ୍ପୂର୍ଣ୍ଣ ନୂତନ କମ୍ପ୍ରେସନ୍ ଆଲଗୋରିଦମ୍ ଯୋଡ଼ନ୍ତୁ (ଯଥା, ଡୋମେନ୍-ନିର୍ଦ୍ଦିଷ୍ଟ ସାରାଂଶକାରୀ) | ଉନ୍ନତ      |
| **ଭାଷା ପ୍ୟାକ୍**         | ଏକ ନୂତନ ପ୍ରାକୃତିକ ଭାଷା ପାଇଁ ସମର୍ଥନ ଯୋଡ଼ନ୍ତୁ (ଯଥା, ହିନ୍ଦୀ, ଆରବୀ)                       | ମଧ୍ୟମ      |
| **ଷ୍ଟାକ୍ଡ୍ ପାଇପ୍ଲାଇନ୍** | ବର୍ତ୍ତମାନର ଇଞ୍ଜିନ୍ଗୁଡ଼ିକୁ ଏକ କଷ୍ଟମ୍ କ୍ରମରେ ସଂଯୋଜନ କରନ୍ତୁ                              | ପ୍ରାରମ୍ଭିକ |

```
┌─────────────────────────────────────────────────────────────┐
│                    କମ୍ପ୍ରେସନ୍ କୌଶଳ                         │
│                                                              │
│   ଇନ୍ପୁଟ୍ ବାର୍ତ୍ତା ──▶ getEffectiveMode() ──▶ ମୋଡ୍         │
│                                              │               │
│                      ┌───────────────────────┼──────────┐    │
│                      │         │         │         │    │    │
│                      ▼         ▼         ▼         ▼    │    │
│                   "rtk"    "lite"   "standard" "stacked"    │
│                      │         │         │         │    │    │
│                      ▼         ▼         ▼         ▼    │    │
│                   RTK       Lite     Caveman   engines[]   │
│                   ଇଞ୍ଜିନ୍    ଇଞ୍ଜିନ୍   ଇଞ୍ଜିନ୍    ଶୃଙ୍ଖଳିତ     │
│                      │         │         │         │    │    │
│                      └─────────┴─────────┴─────────┘    │    │
│                                      │                    │
│                                      ▼                    │
│                             ସଂକୁଚିତ ଆଉଟ୍ପୁଟ୍              │
└─────────────────────────────────────────────────────────────┘

କୌଶଳ ଚୟନକାରୀଟି MODE-BASED: ପ୍ରତ୍ୟେକ ଅନୁରୋଧ ଗୋଟିଏ ମୋଡ୍ ଚୟନ କରେ
(rtk / lite / standard / aggressive / ultra / stacked / off)।
କେବଳ "stacked" ମୋଡ୍ ଏକାଧିକ ଇଞ୍ଜିନ୍କୁ କ୍ରମାନୁସାରେ ଶୃଙ୍ଖଳିତ କରେ।
ଡିଫଲ୍ଟ ଅଟୋ-ଟ୍ରିଗର୍ ମୋଡ୍ ହେଉଛି "lite" (ଏହା 3-ସ୍ତରୀୟ ପ୍ରାଥମିକତା ଶୃଙ୍ଖଳ ନୁହେଁ)।
```

---

## ଏକ କଷ୍ଟମ୍ କମ୍ପ୍ରେସନ୍ ଇଞ୍ଜିନ୍ ଲେଖିବା

ଇଞ୍ଜିନ୍ ଇଣ୍ଟରଫେସ୍ (`open-sse/services/compression/engines/types.ts`) ହେଉଛି ସେହି ଚୁକ୍ତି ଯାହା ପ୍ରତ୍ୟେକ ଇଞ୍ଜିନ୍କୁ ପୂରଣ କରିବା ଆବଶ୍ୟକ। ଏଥିରେ 5ଟି ଆବଶ୍ୟକୀୟ ମେଥଡ୍ ରହିଛି।

### `CompressionEngine` ଇଣ୍ଟରଫେସ୍

```ts
interface CompressionEngine {
  id: string; // ଅନନ୍ୟ ଇଞ୍ଜିନ୍ ID
  name: string; // ପ୍ରଦର୍ଶନ ନାମ
  description: string; // ସଂକ୍ଷିପ୍ତ ବର୍ଣ୍ଣନା
  icon: string; // ଆଇକନ୍ (ଇମୋଜି କିମ୍ବା URL)
  targets: CompressionEngineTarget[]; // ["messages", "tool_results", "code_blocks"]
  stackable: boolean; // ଏକ ଷ୍ଟାକ୍ଡ୍ ପାଇପ୍ଲାଇନ୍ରେ ବ୍ୟବହାର କରାଯାଇପାରିବ କି
  stackPriority: number; // ଷ୍ଟାକ୍ଡ୍ ପାଇପ୍ଲାଇନ୍ଗୁଡ଼ିକରେ କ୍ରମ (କମ୍ = ଆଗରୁ)
  metadata: CompressionEngineMetadata;

  apply(body, options?): CompressionResult;
  compress(body, config?): CompressionResult;
  getConfigSchema(): EngineConfigField[];
  validateConfig(config): EngineValidationResult;
}
```

### ସର୍ବନିମ୍ନ ଉଦାହରଣ: ହ୍ୱାଇଟ୍ସ୍ପେସ୍ ଇଞ୍ଜିନ୍

ସମ୍ଭବତଃ ସବୁଠାରୁ ସରଳ ଇଞ୍ଜିନ୍ — ବାର୍ତ୍ତାଗୁଡ଼ିକରୁ ଅତିରିକ୍ତ ହ୍ୱାଇଟ୍ସ୍ପେସ୍ ହଟାନ୍ତୁ।

````ts
import type { CompressionEngine } from "omniroute/compression/engines/types";
import { registerCompressionEngine } from "omniroute/compression/engines/registry";

function preserveCodeBlocks(text: string): string {
  // କୋଡ୍ ବ୍ଲକ୍ ମାର୍କର୍ ଅନୁଯାୟୀ ବିଭକ୍ତ କରନ୍ତୁ ଏବଂ ସେଗୁଡ଼ିକ ଭିତରେ ଥିବା ହ୍ୱାଇଟ୍ସ୍ପେସ୍କୁ ସଂରକ୍ଷିତ ରଖନ୍ତୁ
  const parts = text.split(/(```[\s\S]*?```)/);
  return parts
    .map((part) => {
      if (part.startsWith("```")) {
        return part; // କୋଡ୍ ବ୍ଲକ୍ଗୁଡ଼ିକୁ ପରିବର୍ତ୍ତନ କରନ୍ତୁ ନାହିଁ
      }
      return part.replace(/\n{3,}/g, "\n\n"); // କେବଳ ଗଦ୍ୟରେ ପ୍ରୟୋଗ କରନ୍ତୁ
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
  stackPriority: 100, // caveman/rtk ପରେ ଚଲାନ୍ତୁ

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

    // ମେସେଜ୍ ଆରେକୁ ଟ୍ରାଭର୍ସ କରନ୍ତୁ — ଉଭୟ ଷ୍ଟ୍ରିଙ୍ଗ୍ ଏବଂ ମଲ୍ଟିପାର୍ଟ ବିଷୟବସ୍ତୁକୁ ପରିଚାଳନା କରନ୍ତୁ
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
      // ମଲ୍ଟିପାର୍ଟ ବିଷୟବସ୍ତୁ: ଅଂଶଗୁଡ଼ିକୁ ଟ୍ରାଭର୍ସ କରନ୍ତୁ, କେବଳ ଟେକ୍ସଟ୍ ଅଂଶଗୁଡ଼ିକୁ କମ୍ପ୍ରେସ୍ କରନ୍ତୁ
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
          return part; // image_url, tool_use ଇତ୍ୟାଦିକୁ ସଂରକ୍ଷିତ ରଖନ୍ତୁ।
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

// ସାର୍ବଜନୀନ ଭାବେ ପଞ୍ଜୀକରଣ କରନ୍ତୁ
registerCompressionEngine(whitespaceEngine);
````

### କଷ୍ଟମ୍ ଇଞ୍ଜିନ୍ଗୁଡ଼ିକୁ କେଉଁଠାରେ ରଖିବେ

```
~/.omniroute/compression/engines/my-engine.ts    # ବ୍ୟବହାରକାରୀ-ସ୍ତରୀୟ
<project>/compression-engines/my-engine.ts        # ପ୍ରକଳ୍ପ-ସ୍ତରୀୟ (ଷ୍ଟାର୍ଟଅପ୍ ସମୟରେ ଲୋଡ୍ ହୁଏ)
```

କିମ୍ବା ଏକ ପ୍ଲଗଇନ୍ରୁ ପ୍ରୋଗ୍ରାମାଟିକ୍ ଭାବେ ଲୋଡ୍ କରନ୍ତୁ:

```ts
// ଆପଣଙ୍କ ପ୍ଲଗଇନ୍ରେ
import {
  registerCompressionEngine,
  unregisterCompressionEngine,
} from "@omniroute/open-sse/services/compression/engines/registry";
import { myEngine } from "./engines/my-engine";

export default definePlugin({
  name: "my-compression-plugin",
  // ପ୍ଲଗଇନ୍ SDK, onRequest / onResponse / onError ହୁକ୍ଗୁଡ଼ିକୁ ଉପଲବ୍ଧ କରାଏ। ପ୍ଲଗଇନ୍
  // ମଡ୍ୟୁଲ୍ ଲୋଡ୍ ହେବାବେଳେ (କିମ୍ବା ପ୍ରଥମ onRequest ସମୟରେ) ଇଞ୍ଜିନ୍କୁ ପଞ୍ଜୀକରଣ କରନ୍ତୁ; ଏହାକୁ
  // ଆପଣଙ୍କ ନିଜ ଟିଅର୍ଡାଉନ୍ ପଥରୁ ପଞ୍ଜୀକରଣମୁକ୍ତ କରନ୍ତୁ।
  onRequest: async (ctx) => {
    registerCompressionEngine(myEngine);
  },
});

// ଟିଅର୍ଡାଉନ୍ ସମୟରେ:
// unregisterCompressionEngine("my-engine");
```

### ଆପଣଙ୍କ ଇଞ୍ଜିନ୍କୁ ପରୀକ୍ଷା କରିବା

ଆପଣଙ୍କ ଇଞ୍ଜିନ୍କୁ ଏକ ପ୍ଲଗଇନ୍ କିମ୍ବା ଷ୍ଟାର୍ଟଅପ୍ ଫଙ୍କସନ୍ରେ ପଞ୍ଜୀକରଣ କରନ୍ତୁ। ଥରେ ପଞ୍ଜୀକୃତ ହେବା ପରେ, ଇଞ୍ଜିନ୍ଟି ଏହାର `id` ମାଧ୍ୟମରେ ଷ୍ଟ୍ରାଟେଜି ଚୟନକାରୀରେ ଉପଲବ୍ଧ ହେବ। ଏହାକୁ ଏକ ଷ୍ଟାକ୍ଡ ପାଇପଲାଇନ୍ରେ ସଂଯୋଜନ କରି ଇଣ୍ଟିଗ୍ରେସନ୍ ପରୀକ୍ଷା କରନ୍ତୁ:

---

## ଭାଷା ପ୍ୟାକ୍ ସୃଷ୍ଟି କରିବା

Caveman-ଶୈଳୀ କମ୍ପ୍ରେସନ୍ ପ୍ରତ୍ୟେକ ପ୍ରାକୃତିକ ଭାଷାରେ ଫିଲର୍, ଦ୍ୱିଧାସୂଚକ ଅଭିବ୍ୟକ୍ତି ଏବଂ ଅତ୍ୟଧିକ ଶବ୍ଦବହୁଳ ପ୍ୟାଟର୍ନଗୁଡ଼ିକୁ ପରିଚାଳନା କରିବା ପାଇଁ **ଭାଷା-ନିର୍ଦ୍ଦିଷ୍ଟ ନିୟମ ପ୍ୟାକ୍** ବ୍ୟବହାର କରେ। OmniRoute ସହିତ **6ଟି ଭାଷା ପ୍ୟାକ୍** ଆସେ: `en`, `es`, `fr`, `de`, `ja`, `pt-BR`।

### ପ୍ୟାକ୍ ଗଠନ

ଏକ ଭାଷା ପ୍ୟାକ୍ ହେଉଛି `open-sse/services/compression/rules/<language>/` ଅଧୀନରେ ଥିବା **JSON ଫାଇଲ୍ଗୁଡ଼ିକର** ଏକ ଡିରେକ୍ଟୋରୀ:

```
open-sse/services/compression/rules/
├── en/
│   ├── filler.json          # ଶିଷ୍ଟାଚାରମୂଳକ ଅଭିବ୍ୟକ୍ତି, ଦ୍ୱିଧାସୂଚକ ଭାଷା, ଭଦ୍ରତା
│   ├── context.json         # ପ୍ରସଙ୍ଗ ହ୍ରାସକାରୀ ନିୟମ
│   ├── dedup.json           # ନକଲ ଅପସାରଣ ନିୟମ
│   ├── structural.json      # ବିରାମଚିହ୍ନ, ଫର୍ମାଟିଂ
│   └── ultra.json           # ଆକ୍ରମଣାତ୍ମକ କମ୍ପ୍ରେସନ୍ ନିୟମ
├── es/  (ସମାନ ଗଠନ)
├── fr/  (ସମାନ ଗଠନ)
├── de/  (ସମାନ ଗଠନ)
├── ja/  (ସମାନ ଗଠନ)
└── pt-BR/ (ସମାନ ଗଠନ)
```

### ନିୟମର ଗଠନ

ପ୍ରତ୍ୟେକ ନିୟମର ଆକୃତି ଏପରି (`open-sse/services/compression/ruleLoader.ts`ରୁ):

```ts
interface FileRule {
  name: string; // ମନୁଷ୍ୟଙ୍କ ପାଇଁ ପଠନଯୋଗ୍ୟ ନାମ (kebab-case)
  pattern: string; // JavaScript regex ପ୍ୟାଟର୍ନ
  replacement?: string; // ମେଳ ହୋଇଥିବା ଅଂଶକୁ ଯାହାଦ୍ୱାରା ବଦଳାଯିବ
  replacementMap?: Record<string, string>; // କିମ୍ବା ଏକ କୀ→ପ୍ରତିସ୍ଥାପନ ମ୍ୟାପ୍
  flags?: string; // Regex ଫ୍ଲାଗ୍ଗୁଡ଼ିକ (ସାଧାରଣତଃ "gi")
  context?: "all" | "user" | "system" | "assistant";
  category?: "filler" | "context" | "structural" | "dedup" | "terse" | "ultra";
  minIntensity?: "lite" | "full" | "ultra"; // ଏହି ତୀବ୍ରତାଠାରୁ କମ୍ ହେଲେ ଛାଡ଼ିଦିଅନ୍ତୁ
  description?: string; // ଡକ୍ୟୁମେଣ୍ଟେସନ୍
}
```

### ଉଦାହରଣ: ହିନ୍ଦୀ ଫିଲର୍ ନିୟମ ଯୋଡ଼ିବା

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

### ବୈଧତା ଯାଞ୍ଚ

ଲୋଡ୍ ସମୟରେ ନିୟମ ପ୍ୟାକ୍ଗୁଡ଼ିକୁ `_schema.json` ବିପକ୍ଷରେ ବୈଧତା ଯାଞ୍ଚ କରାଯାଏ। ଭୁଲ୍ ଗଠନ ଥିବା ପ୍ୟାକ୍ ଲୋଡ୍ ହେବାରେ ବିଫଳ ହେବ ଏବଂ ଏକ ତ୍ରୁଟି ଲଗ୍ କରିବ:

```
RULE_LOADER: pack "hi/filler.json" failed validation:
  - rules.0.pattern: Invalid regex
  - rules.1.context: must be one of [all, user, system, assistant]
```

କୌଣସି ପ୍ୟାକ୍ ଲୋଡ୍ ହେବା ସମୟରେ (`_schema.json` ବିପକ୍ଷରେ) ବୈଧତା ଯାଞ୍ଚ ସ୍ୱୟଂଚାଳିତ ଭାବେ ଚାଲେ; ଏକ
ଅବୈଧ ପ୍ୟାକ୍ ପ୍ରତ୍ୟାଖ୍ୟାନ ହୁଏ ଏବଂ ଉପରୋକ୍ତ ତ୍ରୁଟିଟି ଲଗ୍ କରାଯାଏ। ପ୍ୟାକ୍ ବୈଧତା ଯାଞ୍ଚ ପାଇଁ କୌଣସି ପୃଥକ
`npm run` ସ୍କ୍ରିପ୍ଟ ନାହିଁ — ପ୍ୟାକ୍ଟିକୁ ଲୋଡ୍ କରନ୍ତୁ (ଉଦାହରଣ ସ୍ୱରୂପ, ସର୍ଭର୍ ଆରମ୍ଭ କରନ୍ତୁ କିମ୍ବା
କମ୍ପ୍ରେସନ୍ ପଥକୁ ବ୍ୟବହାର କରନ୍ତୁ) ଏବଂ ଲଗ୍ଗୁଡ଼ିକ ଉପରେ ନଜର ରଖନ୍ତୁ।

### ଏକ କଷ୍ଟମ୍ ଭାଷା ପ୍ୟାକ୍ ଲୋଡ୍ କରିବା

```ts
import { loadRulePack } from "omniroute/compression/ruleLoader";

await loadRulePack("./my-custom-rules/hi/filler.json");
```

କିମ୍ବା ଏକ ସ୍ୱୀକୃତ ସ୍ଥାନରେ ରଖନ୍ତୁ:

```
~/.omniroute/compression/rules/hi/filler.json  # ବ୍ୟବହାରକାରୀ-ସ୍ତରୀୟ
<project>/.compression/rules/hi/filler.json   # ପ୍ରକଳ୍ପ-ସ୍ତରୀୟ
```

### ଭାଷା ପ୍ୟାକ୍ ପାଇଁ ସର୍ବୋତ୍ତମ ଅଭ୍ୟାସ

1. **`filler`ରୁ ଆରମ୍ଭ କରନ୍ତୁ** — ଏଗୁଡ଼ିକ ସର୍ବାଧିକ ପ୍ରଭାବଶାଳୀ ନିୟମ
2. **ଆକ୍ରମଣାତ୍ମକ ନିୟମଗୁଡ଼ିକୁ ନିୟନ୍ତ୍ରଣ କରିବା ପାଇଁ `minIntensity` ବ୍ୟବହାର କରନ୍ତୁ** — ଏହା ଅତ୍ୟଧିକ କମ୍ପ୍ରେସନ୍ରୁ ସୁରକ୍ଷା ଦିଏ
3. **ପରୀକ୍ଷଣ କେସ୍ ଅନ୍ତର୍ଭୁକ୍ତ କରନ୍ତୁ** — ଆଚରଣ ଯାଞ୍ଚ କରିବା ପାଇଁ JSONରେ `tests[]` ଆରେ ଯୋଡ଼ନ୍ତୁ
4. **କ୍ରମ ଗୁରୁତ୍ୱପୂର୍ଣ୍ଣ** — ପୂର୍ବରୁ ଥିବା ନିୟମଗୁଡ଼ିକ ପ୍ରଥମେ ପ୍ରୟୋଗ ହୁଏ; ଅଧିକ ପ୍ରଭାବଶାଳୀ ନିୟମଗୁଡ଼ିକୁ ପ୍ରଥମେ ରଖନ୍ତୁ
5. **`replacement` ବ୍ୟବହାରରେ ସତର୍କ ରୁହନ୍ତୁ** — ଖାଲି ଷ୍ଟ୍ରିଙ୍ଗ୍ ସାଧାରଣତଃ ଠିକ୍; କେବେବି ନୂଆ ବିଷୟବସ୍ତୁ ପ୍ରବେଶ କରାନ୍ତୁ ନାହିଁ

### ଅନୁବାଦ କୌଶଳ

ନିୟମ ପ୍ୟାକ୍ଗୁଡ଼ିକୁ ଏକ ନୂଆ ଭାଷା ପାଇଁ ସ୍ଥାନୀୟକରଣ କରିବା ସମୟରେ:

1. **ନିୟମର ନାମଗୁଡ଼ିକୁ ଅନୁବାଦ କରନ୍ତୁ** — ସେଗୁଡ଼ିକ ଡିବଗ୍ ଆଉଟପୁଟ୍ରେ ଦେଖାଯାଏ
2. **regex ପ୍ୟାଟର୍ନଗୁଡ଼ିକୁ ଅନୁକୂଳିତ କରନ୍ତୁ** — ପ୍ରତ୍ୟକ୍ଷ ଅନୁବାଦ ପ୍ରାୟତଃ ବିଫଳ ହୁଏ (ଶବ୍ଦ ସୀମା ଭିନ୍ନ ହୋଇଥାଏ)
3. **ବାସ୍ତବ ବାର୍ତ୍ତାଳାପ ବିପକ୍ଷରେ ପରୀକ୍ଷା କରନ୍ତୁ** — ପ୍ରକୃତ ଇନପୁଟ୍ରେ ପ୍ୟାକ୍ଟି ସୁରକ୍ଷିତ ହେବା ଉଚିତ
4. **ସାଂସ୍କୃତିକ ପରମ୍ପରା ସହିତ ମେଳ କରନ୍ତୁ** — ଉଦାହରଣ ସ୍ୱରୂପ, ଜାପାନୀ ପ୍ୟାକ୍ଗୁଡ଼ିକରେ ଇଂରାଜୀ ତୁଳନାରେ ଅଧିକ ସମ୍ମାନସୂଚକ ଫିଲର୍ ଥାଏ

---

## ଷ୍ଟାକ୍ଡ୍ ପାଇପ୍ଲାଇନ୍ଗୁଡ଼ିକ

ଏକ **ଷ୍ଟାକ୍ଡ୍ ପାଇପ୍ଲାଇନ୍** ଏକାଧିକ ଇଞ୍ଜିନ୍କୁ କ୍ରମାନ୍ୱୟରେ ଚଲାଏ, ଯେଉଁଠାରେ ପ୍ରତ୍ୟେକ ଇଞ୍ଜିନ୍ର ଆଉଟ୍ପୁଟ୍ ପରବର୍ତ୍ତୀ ଇଞ୍ଜିନ୍କୁ ଦିଆଯାଏ। ଆଭ୍ୟନ୍ତରୀଣ ଭାବେ `mode: stacked` ଏହିପରି କାର୍ଯ୍ୟ କରେ।

### ଷ୍ଟାକିଂ କିପରି କାର୍ଯ୍ୟ କରେ

```
ଇନ୍ପୁଟ୍ (10,000 ଟୋକନ୍)
        │
        ▼
   ┌──────────┐
   │  ଇଞ୍ଜିନ୍  │  ପ୍ରାଥମିକତା 10
   │  A       │  ──▶ ଆଉଟ୍ପୁଟ୍: 6,000 ଟୋକନ୍ (-40%)
   └────┬─────┘
        ▼
   ┌──────────┐
   │  ଇଞ୍ଜିନ୍  │  ପ୍ରାଥମିକତା 50
   │  B       │  ──▶ ଆଉଟ୍ପୁଟ୍: 2,400 ଟୋକନ୍ (-60%)
   └────┬─────┘
        ▼
   ┌──────────┐
   │  ଇଞ୍ଜିନ୍  │  ପ୍ରାଥମିକତା 100
   │  C       │  ──▶ ଆଉଟ୍ପୁଟ୍: 1,200 ଟୋକନ୍ (-80%)
   └────┬─────┘
        │
        ▼
ଅନ୍ତିମ ଆଉଟ୍ପୁଟ୍ (1,200 ଟୋକନ୍, ମିଳିତ ଭାବେ ~88% ସଞ୍ଚୟ)
```

`mode: "stacked"` ଚୟନ କରାଗଲେ, ଇଞ୍ଜିନ୍ଗୁଡ଼ିକ `pipeline` ଆରେରେ ନିର୍ଦ୍ଦିଷ୍ଟ କ୍ରମ ଅନୁସାରେ କ୍ରମାନ୍ୱୟରେ ନିଷ୍ପାଦିତ ହୁଅନ୍ତି।
ଇଞ୍ଜିନ୍ N-ର ଆଉଟ୍ପୁଟ୍ ଇଞ୍ଜିନ୍ N+1-ର ଇନ୍ପୁଟ୍ ହୁଏ।

### କମ୍ପ୍ରେସନ୍ ମୋଡ୍ଗୁଡ଼ିକ

କନ୍ଫିଗରେସନ୍, ସ୍ୱୟଂଚାଳିତ-ଟ୍ରିଗର୍ ଥ୍ରେସହୋଲ୍ଡ ଏବଂ କମ୍ବୋ ଓଭର୍ରାଇଡ୍ ଆଧାରରେ OmniRoute **ପ୍ରତ୍ୟେକ ଅନୁରୋଧ ପାଇଁ ଗୋଟିଏ ମୋଡ୍** ଚୟନ କରେ।
ଉପଲବ୍ଧ ମୋଡ୍ଗୁଡ଼ିକ `open-sse/services/compression/types.ts` (`CompressionMode` ଟାଇପ୍)ରେ ପରିଭାଷିତ ହୋଇଛି:

| ମୋଡ୍         | ଇଞ୍ଜିନ୍ଗୁଡ଼ିକ        | ବ୍ୟବହାର ପରିସ୍ଥିତି                                                                                                                                                                               |
| ------------ | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `off`        | କୌଣସିଟି ନୁହେଁ        | ସମସ୍ତ କମ୍ପ୍ରେସନ୍ ଅକ୍ଷମ କରନ୍ତୁ                                                                                                                                                                   |
| `rtk`        | କେବଳ RTK             | କମାଣ୍ଡ ଆଉଟ୍ପୁଟ୍-ପ୍ରଧାନ ସେସନ୍ଗୁଡ଼ିକ (80%+ ସଞ୍ଚୟ)                                                                                                                                                 |
| `lite`       | କେବଳ Lite            | ରକ୍ଷଣଶୀଳ କମ୍ପ୍ରେସନ୍ (ଦ୍ରୁତ, ସୁରକ୍ଷିତ)                                                                                                                                                           |
| `standard`   | Caveman              | ଭାଷା ପ୍ୟାକ୍ଗୁଡ଼ିକ ସହିତ ଗଦ୍ୟ କମ୍ପ୍ରେସନ୍                                                                                                                                                          |
| `aggressive` | Caveman + Aggressive | ଆକ୍ରମଣାତ୍ମକ ଗଦ୍ୟ + ଆକ୍ରମଣାତ୍ମକ ଅନ୍ତିମ ପାସ୍                                                                                                                                                      |
| `ultra`      | Ultra                | ସର୍ବାଧିକ କମ୍ପ୍ରେସନ୍ (କ୍ଷୟଯୁକ୍ତ, ଶେଷ ଉପାୟ)। `ultra.modelPath` ସେଟ୍ ହୋଇଥିଲେ ବୈକଳ୍ପିକ ଭାବେ **LLMLingua-2** SLM ଇଞ୍ଜିନ୍ ମାଧ୍ୟମରେ ରାଉଟ୍ କରାଯାଏ (ମଡେଲ୍ ଅନୁପଲବ୍ଧ ଥିଲେ ନିୟମ-ଆଧାରିତ ପଥରେ ଫେଲ୍-ଓପନ୍ ହୁଏ)। |
| `stacked`    | କଷ୍ଟମ୍ ପାଇପ୍ଲାଇନ୍    | ଯେକୌଣସି କ୍ରମରେ ଇଞ୍ଜିନ୍ଗୁଡ଼ିକୁ ସଂଯୋଜନ କରନ୍ତୁ (ନିମ୍ନରେ ଦେଖନ୍ତୁ)                                                                                                                                   |

> ଉପରୋକ୍ତ ମୋଡ୍ ଇଞ୍ଜିନ୍ଗୁଡ଼ିକ ବ୍ୟତୀତ, ରେଜିଷ୍ଟ୍ରିରେ ବିଶେଷୀକୃତ ଷ୍ଟାକ୍ କରାଯାଇପାରୁଥିବା ଇଞ୍ଜିନ୍ଗୁଡ଼ିକ ମଧ୍ୟ ଅନ୍ତର୍ଭୁକ୍ତ —
> **CCR**, **headroom**, **ionizer**, ଏବଂ **session-dedup** — ଯାହା
> [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md#additional-built-in-engines)ରେ ଡକ୍ୟୁମେଣ୍ଟ କରାଯାଇଛି।

ମୋଡ୍ ଚୟନ `open-sse/services/compression/strategySelector.ts`ର `getEffectiveMode()` ଦ୍ୱାରା ନିର୍ଦ୍ଧାରିତ ହୁଏ:

1. କମ୍ପ୍ରେସନ୍ ଅକ୍ଷମ ଥିଲେ: `"off"`
2. କୌଣସି କମ୍ବୋ ଓଭର୍ରାଇଡ୍ ଥିଲେ: ଓଭର୍ରାଇଡ୍ଟି ବ୍ୟବହାର କରନ୍ତୁ
3. ସ୍ୱୟଂଚାଳିତ-ଟ୍ରିଗର୍ ଥ୍ରେସହୋଲ୍ଡ ଅତିକ୍ରମ ହେଲେ: `autoTriggerMode` ବ୍ୟବହାର କରନ୍ତୁ (ଡିଫଲ୍ଟ: `"lite"`)
4. ଅନ୍ୟଥା: `defaultMode` ବ୍ୟବହାର କରନ୍ତୁ

### ଡିଫଲ୍ଟ ଷ୍ଟାକ୍ଡ୍ ପାଇପ୍ଲାଇନ୍

`mode: "stacked"` ସ୍ପଷ୍ଟ ଭାବେ କନ୍ଫିଗର୍ କରାଗଲେ, ଡିଫଲ୍ଟ ପାଇପ୍ଲାଇନ୍ ନିମ୍ନଲିଖିତଗୁଡ଼ିକୁ ସଂଯୋଜନ କରେ:

1. **RTK** — କମାଣ୍ଡ ଆଉଟ୍ପୁଟ୍ର ଅନାବଶ୍ୟକ ତଥ୍ୟ ହଟାଏ (ଟର୍ମିନାଲ୍ ଆଉଟ୍ପୁଟ୍ରେ ~80% ସଞ୍ଚୟ)
2. **Caveman** — ଅନାବଶ୍ୟକ ଶବ୍ଦ ହଟାଏ, ଗଦ୍ୟକୁ ସଂକ୍ଷିପ୍ତ କରେ (ଅବଶିଷ୍ଟ ପାଠ୍ୟରେ ~46%)
3. **Lite** — ଅନ୍ତିମ ହ୍ୱାଇଟ୍ସ୍ପେସ୍ + ଡିଡୁପ୍ ପାସ୍

ଏହି ସଂଯୋଜନ ଟୁଲ୍-ପ୍ରଧାନ ସେସନ୍ଗୁଡ଼ିକରେ **78-95% ସଞ୍ଚୟ** ହାସଲ କରେ।

### ଷ୍ଟାକ୍ଡ୍ ପାଇପ୍ଲାଇନ୍ଗୁଡ଼ିକୁ କନ୍ଫିଗର୍ କରିବା

କମ୍ବୋ କନ୍ଫିଗ୍ରେ:

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

ଆପଣ ଇଞ୍ଜିନ୍ଗୁଡ଼ିକୁ ବାଦ୍ ଦେଇପାରିବେ, କଷ୍ଟମ୍ ଇଞ୍ଜିନ୍ ଯୋଡ଼ିପାରିବେ କିମ୍ବା ସେଗୁଡ଼ିକର କ୍ରମ ପରିବର୍ତ୍ତନ କରିପାରିବେ।

### ଷ୍ଟେଟ୍ ପାସିଂ

ଇଞ୍ଜିନ୍ଗୁଡ଼ିକ ଅନୁରୋଧ କଣ୍ଟେକ୍ସ୍ଟରୁ (`options`ରେ) ମେଟାଡାଟା ପଢ଼ିପାରିବେ:

```ts
compress(body, config) {
  // ପୂର୍ବବର୍ତ୍ତୀ ଇଞ୍ଜିନ୍ଗୁଡ଼ିକରୁ ମେଟାଡାଟା ପଢ଼ନ୍ତୁ
  const original = options?.compressionComboId;  // "my-coding-combo"
  // ...
}
```

ମେଟାଡାଟାଟି **କେବଳ ପଠନଯୋଗ୍ୟ** — ଇଞ୍ଜିନ୍ଗୁଡ଼ିକ ଅନୁରୋଧ କଣ୍ଟେକ୍ସ୍ଟକୁ ପରିବର୍ତ୍ତନ କରିପାରିବେ ନାହିଁ, କେବଳ ସେମାନଙ୍କ ନିଜସ୍ୱ ବଡି ଆଉଟ୍ପୁଟ୍କୁ ପରିବର୍ତ୍ତନ କରିପାରିବେ।

### ନିଷ୍ପାଦନ କ୍ରମର ସୂକ୍ଷ୍ମ ସମସ୍ୟାଗୁଡ଼ିକ

| ଇଞ୍ଜିନ୍ କ୍ରମ                            | ପ୍ରଭାବ                                                                                       |
| --------------------------------------- | -------------------------------------------------------------------------------------------- |
| RTK → Caveman → Lite                    | **ସୁପାରିସକୃତ** (ପ୍ରଥମେ ଅନାବଶ୍ୟକ ତଥ୍ୟ, ତା’ପରେ ଭାଷା, ଏବଂ ଶେଷରେ ହ୍ୱାଇଟ୍ସ୍ପେସ୍ ହଟାଏ)             |
| Lite → RTK → Caveman                    | ଖରାପ — Lite କଞ୍ଚା ଆଉଟ୍ପୁଟ୍ରୁ ହ୍ୱାଇଟ୍ସ୍ପେସ୍ ହଟାଇଦିଏ, ଯାହାଦ୍ୱାରା RTK ପ୍ୟାଟର୍ନ ମ୍ୟାଚିଂ ବିଫଳ ହୁଏ |
| Caveman → RTK                           | ଖରାପ — Caveman ପାଠ୍ୟକୁ ଏପରି ଭାବେ ପୁନର୍ଲିଖନ କରିପାରେ ଯାହାକୁ RTK ଚିହ୍ନିପାରେ ନାହିଁ               |
| ପ୍ରଥମେ `tool_results` ଥିବା ଯେକୌଣସି କ୍ରମ | ଉନ୍ନତ — ଟୁଲ୍ ଆଉଟ୍ପୁଟ୍ରେ ସର୍ବାଧିକ ଅନାବଶ୍ୟକ ବିଷୟବସ୍ତୁ ଥାଏ                                      |

### କେତେବେଳେ ଷ୍ଟାକ୍ କରିବେ ନାହିଁ

ଷ୍ଟାକିଂ ସବୁବେଳେ ଉନ୍ନତ ନୁହେଁ:

- **ସରଳ ସନ୍ଦେଶଗୁଡ଼ିକ** (କୌଣସି ଟୁଲ୍ ଆଉଟ୍ପୁଟ୍ ନାହିଁ) — କେବଳ Caveman କିମ୍ବା Lite ଯଥେଷ୍ଟ
- **ଖର୍ଚ୍ଚ-ସମ୍ବେଦନଶୀଳ** — ପ୍ରତ୍ୟେକ ଇଞ୍ଜିନ୍ ~5-50ms ବିଳମ୍ବ ଯୋଡ଼େ
- **ନିର୍ଦ୍ଦିଷ୍ଟ ଟୁଲ୍ଗୁଡ଼ିକ** — ଶେଲ୍ ଆଉଟ୍ପୁଟ୍ ପାଇଁ ସାଧାରଣତଃ କେବଳ RTK ଯଥେଷ୍ଟ

### ଏକ କଷ୍ଟମ୍ ପାଇପ୍ଲାଇନ୍ ନିର୍ମାଣ କରିବା

କୌଣସି ନାମିତ-ପାଇପଲାଇନ୍ ରେଜିଷ୍ଟ୍ରି ନାହିଁ। ଏକ ଷ୍ଟାକ୍ଡ ପାଇପଲାଇନ୍ ହେଉଛି କେବଳ `applyStackedCompression()`କୁ ପାସ୍ କରାଯାଇଥିବା **ପଦକ୍ଷେପଗୁଡ଼ିକର ଏକ ଇନ୍ଲାଇନ୍ ଆରେ** (`@omniroute/open-sse/services/compression/strategySelector`ରୁ ଏକ୍ସପୋର୍ଟ କରାଯାଇଛି):

```ts
import { applyStackedCompression } from "@omniroute/open-sse/services/compression/strategySelector";

const result = applyStackedCompression(body, [
  { engine: "rtk", intensity: "aggressive" },
  { engine: "caveman", intensity: "full" },
]);
```

ଆପଣ ଏକ ପାଇପଲାଇନ୍ ପାସ୍ ନ କଲେ, ଏହା ଡିଫଲ୍ଟ ଭାବରେ `rtk(standard) → caveman(full)` ବ୍ୟବହାର କରେ।

ଏହାକୁ କନ୍ଫିଗ୍ରୁ ଚାଳନା କରିବା ପାଇଁ, `mode: "stacked"` ସେଟ୍ କରନ୍ତୁ ଏବଂ `stackedPipeline` ଅଧୀନରେ ପଦକ୍ଷେପ ଆରେ ପ୍ରଦାନ କରନ୍ତୁ (`config.stackedPipeline`ରୁ ପଢ଼ାଯାଏ):

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

## ଅପ୍ଷ୍ଟ୍ରିମ୍ ସିଙ୍କ୍ ନୀତି

OmniRouteର କମ୍ପ୍ରେସନ୍ ଇଞ୍ଜିନ୍ଗୁଡ଼ିକ READMEରେ ଅନେକ ଅପ୍ଷ୍ଟ୍ରିମ୍ ପ୍ରୋଜେକ୍ଟକୁ ଶ୍ରେୟ ଦେଇଛନ୍ତି
("RTK, Caveman, LLMLingua-2, Troglodita ଦ୍ୱାରା ଅନୁପ୍ରାଣିତ")। ଅବଦାନକାରୀମାନଙ୍କର ଏକ ସାଧାରଣ
ପ୍ରଶ୍ନ ହେଉଛି: **ଯେତେବେଳେ ଅପ୍ଷ୍ଟ୍ରିମ୍ RTK ଏକ ନୂଆ ଟୁଲ୍ ଫିଲ୍ଟର୍ ଯୋଡ଼େ କିମ୍ବା Caveman ଏକ ରୁଲ୍
ପ୍ୟାକ୍ ଯୋଡ଼େ, ତାହା OmniRouteରେ କିପରି ପହଞ୍ଚେ?** ଏହି ବିଭାଗଟି ଏହାର ପ୍ରାମାଣିକ ଉତ୍ତର।

### ଭେଣ୍ଡର୍ଡ କପି ବନାମ ସ୍ୱାଧୀନ କାର୍ଯ୍ୟାନ୍ୱୟନ

| ଇଞ୍ଜିନ୍                      | ଅପ୍ଷ୍ଟ୍ରିମ୍ ସହିତ ସମ୍ପର୍କ                                                                                                             | ଅବସ୍ଥାନ                                                             |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------- |
| **RTK**                      | **ସ୍ୱାଧୀନ ପୁନଃକାର୍ଯ୍ୟାନ୍ୱୟନ** (ଅନୁପ୍ରାଣିତ, କପି ନୁହେଁ)                                                                                | `open-sse/services/compression/engines/rtk/`                        |
| **Caveman**                  | **ସ୍ୱାଧୀନ ପୁନଃକାର୍ଯ୍ୟାନ୍ୱୟନ** (ଅନୁପ୍ରାଣିତ)                                                                                           | `open-sse/services/compression/engines/cavemanAdapter.ts`           |
| **Headroom**                 | ମୁଖ୍ୟତଃ ଆଭ୍ୟନ୍ତରୀଣ; କେବଳ `gcf/` କୋଡେକ୍ଟି `gcf-typescript`ରୁ **ପ୍ରକୃତରେ ଭେଣ୍ଡର୍ଡ** ହୋଇଛି (MIT, SPDX-ଚିହ୍ନିତ, କେବଳ ଜେନେରିକ୍ ପ୍ରୋଫାଇଲ୍) | `open-sse/services/compression/engines/headroom/gcf/`               |
| **LLMLingua-2 / Troglodita** | ଅନୁପ୍ରାଣିତ (`llmlingua` + `session-dedup` ଇଞ୍ଜିନ୍ଗୁଡ଼ିକୁ ପରିଚାଳିତ କରେ)                                                               | `open-sse/services/compression/engines/llmlingua/`, `session-dedup` |

ମୁଖ୍ୟ ବିଷୟ: **RTK ଏବଂ Caveman ହେଉଛି _ଧାରଣାଗୁଡ଼ିକର_ (ଫିଲ୍ଟର୍ ନିୟମ, ରୁଲ୍ ପ୍ୟାକ୍)
କ୍ଲିନ୍-ରୁମ୍ TypeScript କାର୍ଯ୍ୟାନ୍ୱୟନ, ଭେଣ୍ଡର୍ଡ ସୋର୍ସ ଟ୍ରି ନୁହେଁ।** `git pull` କରିବା ପାଇଁ
କୌଣସି ଅପ୍ଷ୍ଟ୍ରିମ୍ କପି ନାହିଁ — ଠିକ୍ ଏହି କାରଣରୁ READMEରେ "bundled" ପରିବର୍ତ୍ତେ
"inspired by" ଲେଖାଯାଇଛି।

### ଅପ୍ଷ୍ଟ୍ରିମ୍ ଉନ୍ନତିଗୁଡ଼ିକ କିପରି ମର୍ଜ୍ କରାଯାଏ

ଡିଜାଇନ୍ ଅନୁସାରେ, **କୌଣସି ସ୍ୱୟଂଚାଳିତ ଅପ୍ଷ୍ଟ୍ରିମ୍-ରିଲିଜ୍ ଟ୍ରାକିଂ ଏବଂ କୌଣସି `compression-sync`
ଲେବଲ୍ ନାହିଁ**। ଯେହେତୁ ଇଞ୍ଜିନ୍ଗୁଡ଼ିକ ପୁନଃକାର୍ଯ୍ୟାନ୍ୱୟନ, ତେଣୁ ଏକ ଅପ୍ଷ୍ଟ୍ରିମ୍ RTK
ଫିଲ୍ଟର୍ କିମ୍ବା Caveman ରୁଲ୍ ପ୍ୟାକ୍କୁ କୋଡ୍ ଭାବେ ମର୍ଜ୍ କରାଯାଏ ନାହିଁ; ଏହାକୁ **OmniRouteର ନିଜସ୍ୱ
ଫର୍ମାଟ୍ରେ ଏକ ନୂଆ ନିୟମ/ଫିଲ୍ଟର୍ ଭାବେ ପୁନଃପ୍ରକାଶ କରାଯାଏ** (
[COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md) ଦେଖନ୍ତୁ) ଏବଂ ଏକ ସାଧାରଣ PR ମାଧ୍ୟମରେ
ଆବଶ୍ୟକତା ଅନୁଯାୟୀ ଯୋଡ଼ାଯାଏ। ଉପରୋକ୍ତ ଏକ୍ସଟେନ୍ସନ୍ ପଏଣ୍ଟଗୁଡ଼ିକ (କଷ୍ଟମ୍ ଇଞ୍ଜିନ୍, ଭାଷା ପ୍ୟାକ୍, RTK ଫିଲ୍ଟର୍)
ଏପରି ଅବଦାନ ପାଇଁ ଅନୁମୋଦିତ ଉପାୟ।

ଠିକ୍ ଏହି ପ୍ରବାହର ସାମ୍ପ୍ରତିକ ଉଦାହରଣ:

- Gradle ଏବଂ `dotnet` ବିଲ୍ଡ ଆଉଟ୍ପୁଟ୍ ପାଇଁ RTK ଫିଲ୍ଟର୍ଗୁଡ଼ିକ (v3.8.42)
- kubectl / docker-build / composer / gh ପାଇଁ RTK ଫିଲ୍ଟର୍ଗୁଡ଼ିକ (#2824)
- Caveman ଇଣ୍ଡୋନେସୀୟ ଭାଷା ପ୍ୟାକ୍ (#3975), ଏବଂ ଜର୍ମାନ୍ / ଫରାସୀ / ଜାପାନୀ / ଚୀନୀ ପ୍ୟାକ୍ଗୁଡ଼ିକ

### Headroom (ଇନ୍ପୁଟ୍-କମ୍ପ୍ରେସନ୍ ପ୍ରକ୍ସି)

Headroom **ସମ୍ପୂର୍ଣ୍ଣ ଭାବେ ଆଭ୍ୟନ୍ତରୀଣ** — ଏକ ପିନ୍ କରାଯାଇଥିବା ଭେଣ୍ଡର୍ଡ `gcf` କୋଡେକ୍ ସ୍ନାପ୍ଶଟ୍ ସହିତ
OmniRouteର ନିଜସ୍ୱ `smartcrusher` / `toon` / `tabular` ସ୍ତରଗୁଡ଼ିକ। ଭେଣ୍ଡର୍ଡ କପି ବ୍ୟତୀତ ଟ୍ରାକ୍ କରିବାକୁ କୌଣସି ସକ୍ରିୟ
ଅପ୍ଷ୍ଟ୍ରିମ୍ ନାହିଁ; କୋଡେକ୍ ପରିବର୍ତ୍ତନ ହେଲେ `gcf`ର ଅପଡେଟ୍ଗୁଡ଼ିକୁ
ମାନୁଆଲ୍ ଭାବେ ରିଫ୍ରେଶ୍ କରାଯାଏ ଏବଂ କମ୍ପ୍ରେସନ୍ ବଜେଟ୍
ଗେଟ୍ (`check:compression-budget`) ବିପକ୍ଷରେ ପୁନଃଯାଞ୍ଚ କରାଯାଏ।

### ଏକ ଅପ୍ଷ୍ଟ୍ରିମ୍-ଅନୁପ୍ରାଣିତ ଉନ୍ନତି ପ୍ରସ୍ତାବ କରିବା

1. **ଭେଣ୍ଡର୍ କରନ୍ତୁ ନାହିଁ** — ଅପ୍ଷ୍ଟ୍ରିମ୍ ନିୟମ/ଫିଲ୍ଟର୍କୁ OmniRouteର ଫର୍ମାଟ୍ରେ ପୁନଃପ୍ରକାଶ କରନ୍ତୁ।
2. ନିମ୍ନରେ ଥିବା ସମ୍ବନ୍ଧିତ ଏକ୍ସଟେନ୍ସନ୍ ପଏଣ୍ଟ (ଭାଷା ପ୍ୟାକ୍, RTK ଫିଲ୍ଟର୍, କିମ୍ବା
   କଷ୍ଟମ୍ ଇଞ୍ଜିନ୍) ମାଧ୍ୟମରେ ଏହାକୁ ଯୋଡ଼ନ୍ତୁ।
3. PR ବର୍ଣ୍ଣନାରେ ଅପ୍ଷ୍ଟ୍ରିମ୍ ପ୍ରୋଜେକ୍ଟକୁ ଉଲ୍ଲେଖ କରନ୍ତୁ (ଶ୍ରେୟ ପାଇଁ), ଏହାର
   ଲାଇସେନ୍ସ-ସଂଲଗ୍ନ ସୋର୍ସକୁ କପି କରି ନୁହେଁ।
4. ପରୀକ୍ଷଣଗୁଡ଼ିକ ସାମିଲ କରନ୍ତୁ ଏବଂ `check:compression-budget` ଗେଟ୍ ଏବେ ମଧ୍ୟ ପାସ୍ ହେଉଛି ବୋଲି ନିଶ୍ଚିତ କରନ୍ତୁ।

---

## ଏକ ଆଉଟପୁଟ୍ ଶୈଳୀ ଯୋଡ଼ିବା

ଆଉଟପୁଟ୍ ଶୈଳୀଗୁଡ଼ିକ (ଦେଖନ୍ତୁ [ଗାଇଡ୍ର କ୍ୟାଟାଲଗ୍ ଟେବୁଲ୍](./COMPRESSION_GUIDE.md#output-styles-catalog))
ଇନପୁଟ୍ ଇଞ୍ଜିନ୍ଗୁଡ଼ିକର ପ୍ରତିକ୍ରିୟା-ପକ୍ଷୀୟ ସମକକ୍ଷ: ଆପଣ ଯାହା ପଠାନ୍ତି ତାହାକୁ ସଂକୋଚନ କରିବା ପରିବର୍ତ୍ତେ, ସେଗୁଡ଼ିକ ମଡେଲ୍କୁ କମ୍ ଖର୍ଚ୍ଚରେ ଆଉଟପୁଟ୍ ଉତ୍ପାଦନ କରିବାକୁ ନିର୍ଦ୍ଦେଶ ଦିଅନ୍ତି। ରେଜିଷ୍ଟ୍ରିଟି
`open-sse/services/compression/outputStyles/catalog.ts` ମଧ୍ୟରେ `OUTPUT_STYLE_CATALOG`, ଏବଂ
**ଗୋଟିଏ କ୍ୟାଟାଲଗ୍ ଏଣ୍ଟ୍ରି ହିଁ ସମ୍ପୂର୍ଣ୍ଣ ବୈଶିଷ୍ଟ୍ୟ**: ଇଞ୍ଜେକ୍ଟର୍, ଡ୍ୟାସବୋର୍ଡ ସେଟିଂସ୍ ପ୍ୟାନେଲ୍,
ସ୍ଥାୟୀ ସଂରକ୍ଷଣ ଏବଂ ଟେଲିମେଟ୍ରି—ସମସ୍ତେ କ୍ୟାଟାଲଗ୍କୁ ପରିଗଣନା କରନ୍ତି—ଅପଡେଟ୍ କରିବା ପାଇଁ ଅନ୍ୟ କୌଣସି ତାଲିକା ନାହିଁ।

1. **`OUTPUT_STYLE_CATALOG`ରେ ଗୋଟିଏ ଏଣ୍ଟ୍ରି ଯୋଡ଼ନ୍ତୁ**, ଯେଉଁଥିରେ `id`, `label`, `description` ଏବଂ
   ତିନୋଟି ଇଂରାଜୀ `levels` (`lite`, `full`, `ultra`) ରହିବ। ପ୍ରତ୍ୟେକ ସ୍ତର
   `${SHARED_BOUNDARIES}`ରେ ଶେଷ ହେବା ଆବଶ୍ୟକ, ଯାହାଦ୍ୱାରା କୋଡ୍, ପଥ, କମାଣ୍ଡ, ତ୍ରୁଟି ଏବଂ URLଗୁଡ଼ିକ ଅବିକଳ ରହିବ।
   `(id, level, language)` ପ୍ରତି ନିର୍ଦ୍ଦେଶ ପାଠ୍ୟ **ସ୍ଥିର ଏବଂ ନିର୍ଦ୍ଧାରଣବାଦୀ** ହେବା ଆବଶ୍ୟକ—
   କେବଳ `${SHARED_BOUNDARIES}` ଇଣ୍ଟରପୋଲେସନ୍ ଅନୁମୋଦିତ।
2. **ଏହାକୁ ଅନୁବାଦ କରନ୍ତୁ।** `i18n` ଅଧୀନରେ ଅତି କମରେ ଏକ `pt-BR` ବ୍ଲକ୍ ପ୍ରଦାନ କରନ୍ତୁ; `ponytail` ଏବଂ
   `i-have-adhd` (en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi) ହେଉଛି ସନ୍ଦର୍ଭ ଗଠନ। ଉଦ୍ଦେଶ୍ୟମୂଳକ ଭାବେ
   ଏକକ-ଭାଷା ଶୈଳୀ ଏହା ପରିବର୍ତ୍ତେ `locale` ସେଟ୍ କରେ (`terse-cjk` → `zh` ପରି) ଏବଂ ତାହାପରେ
   କେବଳ ସେହି ଲୋକେଲ୍ରେ ପ୍ରଦାନ କରାଯାଏ।
3. **ମ୍ୟାଟ୍ରିକ୍ସ ଗାର୍ଡ ଅପଡେଟ୍ କରନ୍ତୁ**—`tests/unit/compression/output-styles-i18n-matrix.test.ts`ରେ
   ଥିବା `BASELINE_LANGUAGES`ରେ ଶୈଳୀର ଭାଷାଗୁଡ଼ିକ ଯୋଡ଼ନ୍ତୁ। ଆବଶ୍ୟକୀୟ ଅନୁବାଦ ନଥିବା ଯେକୌଣସି ନୂଆ
   ଅଣ-ଲୋକେଲ୍-ଗେଟେଡ୍ ଶୈଳୀ ପାଇଁ ଗେଟ୍ ବିଫଳ ହୁଏ, ଯଦି ତାହା ସହିତ ଏକ ଟ୍ରାକିଂ ଇସ୍ୟୁ ଥିବା
   ସ୍ପଷ୍ଟ `KNOWN_ENGLISH_ONLY` ଏଣ୍ଟ୍ରି ନଥାଏ।
4. **ପ୍ରତି-ଶୈଳୀ ପରୀକ୍ଷା ଯୋଡ଼ନ୍ତୁ**, ଯାହା
   `tests/unit/compression/i-have-adhd-catalog.test.ts` ଅନୁସାରେ ନିର୍ମିତ: କ୍ୟାଟାଲଗ୍ ଗଠନ, ପ୍ରତି ସ୍ତର ପାଇଁ
   ସୀମା ଧାରା, ଏବଂ ପ୍ରତ୍ୟେକ ଅନୁବାଦ କପି କରାଯାଇଥିବା ଇଂରାଜୀ ପରିବର୍ତ୍ତେ ନିଜ ଭାଷାରେ ଲେଖାଯାଇଛି
   ବୋଲି ନିଶ୍ଚିତ କରୁଥିବା ଏକ ଆଙ୍କର୍।
5. **ଶ୍ରେୟ ପ୍ରଦାନ**: ଯଦି ଶୈଳୀଟି କୌଣସି ଅପ୍ଷ୍ଟ୍ରିମ୍ ପ୍ରକଳ୍ପରୁ ଅନୁକୂଳିତ, ତେବେ ଏଣ୍ଟ୍ରିରେ ଥିବା
   ଏକ ସୋର୍ସ କମେଣ୍ଟ୍ରେ ଏହାକୁ ଶ୍ରେୟ ଦିଅନ୍ତୁ (ଉଦାହରଣ: `i-have-adhd` → ayghri/i-have-adhd, MIT)—ଉପରେ ଥିବା
   "ଅପ୍ଷ୍ଟ୍ରିମ୍-ପ୍ରେରିତ ଉନ୍ନତି ପ୍ରସ୍ତାବ କରିବା" ନିୟମ ସହ ସମାନ।

କୌଣସି UI, ସ୍କିମା କିମ୍ବା ଟେଲିମେଟ୍ରି ପରିବର୍ତ୍ତନ ଆବଶ୍ୟକ ନୁହେଁ—ସେହି ପୃଷ୍ଠଗୁଡ଼ିକ କ୍ୟାଟାଲଗ୍ରୁ ରେଣ୍ଡର୍ ହୁଅନ୍ତି।

---

## ସର୍ବୋତ୍ତମ ପ୍ରଚଳନ

### ଇଞ୍ଜିନ୍ ବିକାଶ

1. **ସର୍ବଦା `validateConfig` କାର୍ଯ୍ୟକାରୀ କରନ୍ତୁ**—ବୈଧତା ଯାଞ୍ଚ ବିହୀନ ଇଞ୍ଜିନ୍ଗୁଡ଼ିକ ନିରବ ବିଫଳତା ସୃଷ୍ଟି କରନ୍ତି
2. **ବାସ୍ତବସମ୍ମତ `targetLatencyMs` ସେଟ୍ କରନ୍ତୁ**—ଇଞ୍ଜିନ୍ ବାଛିବା ପାଇଁ କୌଶଳ ଚୟନକାରୀ ଏହାକୁ ବ୍ୟବହାର କରେ
3. **ଡ୍ୟାସବୋର୍ଡ ପାଇଁ `getConfigSchema` ବ୍ୟବହାର କରନ୍ତୁ**—ବ୍ୟବହାରକାରୀଙ୍କଠାରୁ କେବେ ମଧ୍ୟ ବିନ୍ୟାସ ଲୁଚାନ୍ତୁ ନାହିଁ
4. **ଆପଣଙ୍କ ଇଞ୍ଜିନ୍ ଶୁଦ୍ଧ ହେଲେ `stackable: true` ସମର୍ଥନ କରନ୍ତୁ**—ପାର୍ଶ୍ୱ ପ୍ରଭାବ ଥିବା ଇଞ୍ଜିନ୍ଗୁଡ଼ିକୁ ଷ୍ଟାକ୍ କରାଯିବା ଉଚିତ୍ ନୁହେଁ
5. **ଇନ୍ଲାଇନ୍ ପରୀକ୍ଷା ଲେଖନ୍ତୁ**—ଇଞ୍ଜିନ୍ଗୁଡ଼ିକ <1s ମଧ୍ୟରେ ଯାଞ୍ଚଯୋଗ୍ୟ ହେବା ଉଚିତ୍

### ଭାଷା ପ୍ୟାକ୍ ବିକାଶ

1. **`lite` ତୀବ୍ରତାରୁ ଆରମ୍ଭ କରନ୍ତୁ**—ଆପଣଙ୍କ ନିୟମଗୁଡ଼ିକ ସର୍ବନିମ୍ନ ସେଟିଂରେ ସୁରକ୍ଷିତ ହେବା ଉଚିତ୍
2. **ନିୟମଗୁଡ଼ିକର ପରିସର ନିର୍ଦ୍ଧାରଣ ପାଇଁ `context` ବ୍ୟବହାର କରନ୍ତୁ**—କେବଳ `user` ନିୟମଗୁଡ଼ିକ ଭୁଲବଶତଃ ସିଷ୍ଟମ୍ ପ୍ରମ୍ପ୍ଟ୍ଗୁଡ଼ିକୁ ପ୍ରଭାବିତ କରିପାରିବ ନାହିଁ
3. **JSON କିଗୁଡ଼ିକୁ ଧରିବାରୁ ବଞ୍ଚନ୍ତୁ**—`\\bword\\b` JSON ଭିତରେ ମେଳ ଖାଇ ସଂରଚିତ ତଥ୍ୟକୁ ଭାଙ୍ଗିପାରେ
4. **ପ୍ରାନ୍ତୀୟ କ୍ଷେତ୍ରଗୁଡ଼ିକ ସହ ପରୀକ୍ଷା କରନ୍ତୁ**—ଖାଲି ଇନପୁଟ୍, unicode, RTL ପାଠ୍ୟ, ଇମୋଜି
5. **ବିଦ୍ୟମାନ ପ୍ୟାକ୍ଗୁଡ଼ିକୁ ଟେମ୍ପଲେଟ୍ ଭାବେ ବ୍ୟବହାର କରନ୍ତୁ**—`en/filler.json` ହେଉଛି ସବୁଠାରୁ ଅଧିକ ବିକଶିତ ଉଦାହରଣ

### ପାଇପ୍ଲାଇନ୍ ଡିଜାଇନ୍

1. **ଅପ୍ଟିମାଇଜ୍ କରିବା ପୂର୍ବରୁ ପ୍ରୋଫାଇଲ୍ କରନ୍ତୁ**—ପ୍ରଥମେ `compression_stats` ସହିତ ମାପନ୍ତୁ
2. **ପୁନଃକାର୍ଯ୍ୟକାରୀକରଣ ଅପେକ୍ଷା ସଂଯୋଜନକୁ ପ୍ରାଧାନ୍ୟ ଦିଅନ୍ତୁ**—ନୂଆ ଇଞ୍ଜିନ୍ ଲେଖିବା ପୂର୍ବରୁ Caveman ନିୟମଗୁଡ଼ିକୁ ବିସ୍ତାର କରନ୍ତୁ
3. **କ୍ରମର ଯୁକ୍ତି ଡକ୍ୟୁମେଣ୍ଟ କରନ୍ତୁ**—ଇଞ୍ଜିନ୍ A କାହିଁକି ଇଞ୍ଜିନ୍ B ପୂର୍ବରୁ ଅଛି, ତାହା କମେଣ୍ଟ୍ରେ ଲେଖନ୍ତୁ
4. **ସମସ୍ତ 3ଟି ତୀବ୍ରତା ସ୍ତରରେ ପରୀକ୍ଷା କରନ୍ତୁ**—`lite` ଦ୍ରୁତ କିନ୍ତୁ କ୍ଷୟଶୀଳ, `ultra` ଧୀର କିନ୍ତୁ ସଠିକ୍

---

## ସନ୍ଦର୍ଭ: ବିଲ୍ଟ-ଇନ୍ ଇଞ୍ଜିନ୍ଗୁଡ଼ିକ

| ଇଞ୍ଜିନ୍ ID           | ଷ୍ଟାକ୍ଯୋଗ୍ୟ | ଡିଫଲ୍ଟ stackPriority | ଲକ୍ଷ୍ୟଗୁଡ଼ିକ                                       |
| -------------------- | ----------- | -------------------- | -------------------------------------------------- |
| `lite`               | ହଁ          | 5                    | ବାର୍ତ୍ତାଗୁଡ଼ିକ, ଟୁଲ୍ ଫଳାଫଳଗୁଡ଼ିକ                   |
| `rtk`                | ହଁ          | 10                   | ଟୁଲ୍ ଫଳାଫଳଗୁଡ଼ିକ                                   |
| `standard` (caveman) | ହଁ          | 20                   | ବାର୍ତ୍ତାଗୁଡ଼ିକ, ଟୁଲ୍ ଫଳାଫଳଗୁଡ଼ିକ, କୋଡ୍ ବ୍ଲକ୍ଗୁଡ଼ିକ |
| `aggressive`         | ହଁ          | 30                   | ବାର୍ତ୍ତାଗୁଡ଼ିକ                                     |
| `ultra`              | ହଁ          | 40                   | ବାର୍ତ୍ତାଗୁଡ଼ିକ, କୋଡ୍ ବ୍ଲକ୍ଗୁଡ଼ିକ                   |

### ଆହୁରି ଦେଖନ୍ତୁ

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — ପାଇପ୍ଲାଇନ୍ର ସାରାଂଶ
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — ଇଞ୍ଜିନ୍ ରେଜିଷ୍ଟ୍ରି ସନ୍ଦର୍ଭ
- [COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md) — ନିୟମ ଫର୍ମାଟ୍ର ବିବରଣୀ
- [COMPRESSION_LANGUAGE_PACKS.md](./COMPRESSION_LANGUAGE_PACKS.md) — ଭାଷା ପ୍ୟାକ୍ର ବିବରଣୀ
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — RTK ଇଞ୍ଜିନ୍ ଏବଂ କଷ୍ଟମ୍ ଫିଲ୍ଟର୍ଗୁଡ଼ିକ
- ଉତ୍ସ: `open-sse/services/compression/` (117ଟି ଫାଇଲ୍, ~250KB)
