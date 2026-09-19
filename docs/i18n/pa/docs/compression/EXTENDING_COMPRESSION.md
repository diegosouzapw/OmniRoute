# Extending the Compression Pipeline (ਪੰਜਾਬੀ)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/EXTENDING_COMPRESSION.md) · 🇪🇹 [am](../../../am/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇦 [ar](../../../ar/docs/compression/EXTENDING_COMPRESSION.md) · 🇦🇿 [az](../../../az/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇬 [bg](../../../bg/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇩 [bn](../../../bn/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇦 [bs](../../../bs/docs/compression/EXTENDING_COMPRESSION.md) · 🇨🇿 [cs](../../../cs/docs/compression/EXTENDING_COMPRESSION.md) · 🇩🇰 [da](../../../da/docs/compression/EXTENDING_COMPRESSION.md) · 🇩🇪 [de](../../../de/docs/compression/EXTENDING_COMPRESSION.md) · 🇬🇷 [el](../../../el/docs/compression/EXTENDING_COMPRESSION.md) · 🇪🇸 [es](../../../es/docs/compression/EXTENDING_COMPRESSION.md) · 🇪🇪 [et](../../../et/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇷 [fa](../../../fa/docs/compression/EXTENDING_COMPRESSION.md) · 🇫🇮 [fi](../../../fi/docs/compression/EXTENDING_COMPRESSION.md) · 🇫🇷 [fr](../../../fr/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇪 [ga](../../../ga/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [gu](../../../gu/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [ha](../../../ha/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇱 [he](../../../he/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [hi](../../../hi/docs/compression/EXTENDING_COMPRESSION.md) · 🇭🇷 [hr](../../../hr/docs/compression/EXTENDING_COMPRESSION.md) · 🇭🇺 [hu](../../../hu/docs/compression/EXTENDING_COMPRESSION.md) · 🇦🇲 [hy](../../../hy/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇩 [id](../../../id/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [ig](../../../ig/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇹 [it](../../../it/docs/compression/EXTENDING_COMPRESSION.md) · 🇯🇵 [ja](../../../ja/docs/compression/EXTENDING_COMPRESSION.md) · 🇬🇪 [ka](../../../ka/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇭 [km](../../../km/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [kn](../../../kn/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇷 [ko](../../../ko/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇹 [lt](../../../lt/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇻 [lv](../../../lv/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [ml](../../../ml/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [mr](../../../mr/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇾 [ms](../../../ms/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇹 [mt](../../../mt/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇲 [my](../../../my/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇵 [ne](../../../ne/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇱 [nl](../../../nl/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇴 [no](../../../no/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [or](../../../or/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇭 [phi](../../../phi/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇱 [pl](../../../pl/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇹 [pt](../../../pt/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇴 [ro](../../../ro/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇺 [ru](../../../ru/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇰 [si](../../../si/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇰 [sk](../../../sk/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇮 [sl](../../../sl/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇸 [sr](../../../sr/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇪 [sv](../../../sv/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇪 [sw](../../../sw/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [ta](../../../ta/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [te](../../../te/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇭 [th](../../../th/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇷 [tr](../../../tr/docs/compression/EXTENDING_COMPRESSION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇰 [ur](../../../ur/docs/compression/EXTENDING_COMPRESSION.md) · 🇺🇿 [uz](../../../uz/docs/compression/EXTENDING_COMPRESSION.md) · 🇻🇳 [vi](../../../vi/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [yo](../../../yo/docs/compression/EXTENDING_COMPRESSION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/EXTENDING_COMPRESSION.md)

---

> **ਸੰਖੇਪ**: OmniRoute ਦਾ ਕੰਪ੍ਰੈਸ਼ਨ ਇੰਜਣ **ਪਲੱਗ ਕਰਨ ਯੋਗ** ਹੈ — ਤੁਸੀਂ ਕਸਟਮ ਇੰਜਣ ਰਜਿਸਟਰ ਕਰ ਸਕਦੇ ਹੋ, ਨਵੀਆਂ ਭਾਸ਼ਾਵਾਂ ਲਈ ਭਾਸ਼ਾ ਪੈਕ ਜਾਰੀ ਕਰ ਸਕਦੇ ਹੋ ਅਤੇ ਸਟੈਕਡ ਪਾਈਪਲਾਈਨਾਂ ਨੂੰ ਸੰਯੋਜਿਤ ਕਰ ਸਕਦੇ ਹੋ। ਇਹ ਗਾਈਡ ਦਿਖਾਉਂਦੀ ਹੈ ਕਿ ਇਹ ਕਿਵੇਂ ਕਰਨਾ ਹੈ।

**ਸੰਬੰਧਿਤ ਗਾਈਡਾਂ:**

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — ਪੂਰੀ ਪਾਈਪਲਾਈਨ ਦੀ ਸੰਖੇਪ ਜਾਣਕਾਰੀ
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — ਇੰਜਣ ਰਜਿਸਟਰੀ ਅਤੇ ਬਿਲਟ-ਇਨ ਇੰਜਣ
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — RTK ਇੰਜਣ ਅਤੇ ਕਸਟਮ ਫਿਲਟਰ
- [COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md) — ਨਿਯਮ ਪੈਕ ਫਾਰਮੈਟ ਦਾ ਹਵਾਲਾ

---

## ਸੰਖੇਪ ਜਾਣਕਾਰੀ

ਕੰਪ੍ਰੈਸ਼ਨ ਸਿਸਟਮ ਵਿੱਚ **3 ਵਿਸਤਾਰ ਬਿੰਦੂ** ਹਨ:

| ਵਿਸਤਾਰ ਬਿੰਦੂ       | ਵਰਤੋਂ ਦਾ ਮਾਮਲਾ                                                         | ਮੁਸ਼ਕਲ   |
| ------------------ | ---------------------------------------------------------------------- | -------- |
| **ਕਸਟਮ ਇੰਜਣ**      | ਬਿਲਕੁਲ ਨਵਾਂ ਕੰਪ੍ਰੈਸ਼ਨ ਐਲਗੋਰਿਦਮ ਸ਼ਾਮਲ ਕਰੋ (ਜਿਵੇਂ, ਡੋਮੇਨ-ਵਿਸ਼ੇਸ਼ ਸਾਰਕਾਰ) | ਉੱਨਤ     |
| **ਭਾਸ਼ਾ ਪੈਕ**      | ਇੱਕ ਨਵੀਂ ਕੁਦਰਤੀ ਭਾਸ਼ਾ ਲਈ ਸਮਰਥਨ ਸ਼ਾਮਲ ਕਰੋ (ਜਿਵੇਂ, ਹਿੰਦੀ, ਅਰਬੀ)          | ਦਰਮਿਆਨਾ  |
| **ਸਟੈਕਡ ਪਾਈਪਲਾਈਨ** | ਮੌਜੂਦਾ ਇੰਜਣਾਂ ਨੂੰ ਕਸਟਮ ਕ੍ਰਮ ਵਿੱਚ ਸੰਯੋਜਿਤ ਕਰੋ                           | ਸ਼ੁਰੂਆਤੀ |

```
┌─────────────────────────────────────────────────────────────┐
│                    ਕੰਪ੍ਰੈਸ਼ਨ ਰਣਨੀਤੀ                          │
│                                                              │
│   ਇਨਪੁੱਟ ਸੁਨੇਹੇ ──▶ getEffectiveMode() ──▶ ਮੋਡ              │
│                                              │               │
│                      ┌───────────────────────┼──────────┐    │
│                      │         │         │         │    │    │
│                      ▼         ▼         ▼         ▼    │    │
│                   "rtk"    "lite"   "standard" "stacked"    │
│                      │         │         │         │    │    │
│                      ▼         ▼         ▼         ▼    │    │
│                   RTK       Lite     Caveman   engines[]   │
│                   ਇੰਜਣ     ਇੰਜਣ     ਇੰਜਣ     ਲੜੀਬੱਧ      │
│                      │         │         │         │    │    │
│                      └─────────┴─────────┴─────────┘    │    │
│                                      │                    │
│                                      ▼                    │
│                             ਕੰਪ੍ਰੈੱਸ ਕੀਤਾ ਆਉਟਪੁੱਟ           │
└─────────────────────────────────────────────────────────────┘

ਰਣਨੀਤੀ ਚੋਣਕਾਰ MODE-ਆਧਾਰਿਤ ਹੈ: ਹਰ ਬੇਨਤੀ ਇੱਕ ਮੋਡ ਚੁਣਦੀ ਹੈ
(rtk / lite / standard / aggressive / ultra / stacked / off)।
ਸਿਰਫ਼ "stacked" ਮੋਡ ਹੀ ਕਈ ਇੰਜਣਾਂ ਨੂੰ ਕ੍ਰਮਵਾਰ ਲੜੀਬੱਧ ਕਰਦਾ ਹੈ।
ਡਿਫਾਲਟ ਸਵੈ-ਟਰਿੱਗਰ ਮੋਡ "lite" ਹੈ (3-ਪੱਧਰੀ ਤਰਜੀਹੀ ਲੜੀ ਨਹੀਂ)।
```

---

## ਕਸਟਮ ਕੰਪ੍ਰੈਸ਼ਨ ਇੰਜਣ ਲਿਖਣਾ

ਇੰਜਣ ਇੰਟਰਫੇਸ (`open-sse/services/compression/engines/types.ts`) ਉਹ ਸਮਝੌਤਾ ਹੈ ਜਿਸਦੀ ਪਾਲਣਾ ਹਰ ਇੰਜਣ ਨੂੰ ਕਰਨੀ ਲਾਜ਼ਮੀ ਹੈ। ਇਸ ਵਿੱਚ 5 ਲੋੜੀਂਦੀਆਂ ਮੈਥਡਾਂ ਹਨ।

### `CompressionEngine` ਇੰਟਰਫੇਸ

```ts
interface CompressionEngine {
  id: string; // ਵਿਲੱਖਣ ਇੰਜਣ ID
  name: string; // ਪ੍ਰਦਰਸ਼ਿਤ ਨਾਮ
  description: string; // ਸੰਖੇਪ ਵੇਰਵਾ
  icon: string; // ਆਈਕਨ (ਇਮੋਜੀ ਜਾਂ URL)
  targets: CompressionEngineTarget[]; // ["messages", "tool_results", "code_blocks"]
  stackable: boolean; // ਕੀ ਸਟੈਕਡ ਪਾਈਪਲਾਈਨ ਵਿੱਚ ਵਰਤਿਆ ਜਾ ਸਕਦਾ ਹੈ
  stackPriority: number; // ਸਟੈਕਡ ਪਾਈਪਲਾਈਨਾਂ ਵਿੱਚ ਕ੍ਰਮ (ਘੱਟ = ਪਹਿਲਾਂ)
  metadata: CompressionEngineMetadata;

  apply(body, options?): CompressionResult;
  compress(body, config?): CompressionResult;
  getConfigSchema(): EngineConfigField[];
  validateConfig(config): EngineValidationResult;
}
```

### ਨਿਊਨਤਮ ਉਦਾਹਰਨ: ਵ੍ਹਾਈਟਸਪੇਸ ਇੰਜਣ

ਸਭ ਤੋਂ ਸਰਲ ਸੰਭਵ ਇੰਜਣ — ਸੁਨੇਹਿਆਂ ਵਿੱਚੋਂ ਵਾਧੂ ਵ੍ਹਾਈਟਸਪੇਸ ਹਟਾਓ।

````ts
import type { CompressionEngine } from "omniroute/compression/engines/types";
import { registerCompressionEngine } from "omniroute/compression/engines/registry";

function preserveCodeBlocks(text: string): string {
  // ਕੋਡ ਬਲਾਕ ਮਾਰਕਰਾਂ ਦੇ ਆਧਾਰ 'ਤੇ ਵੰਡੋ ਅਤੇ ਉਨ੍ਹਾਂ ਦੇ ਅੰਦਰਲੀ ਖਾਲੀ ਥਾਂ ਨੂੰ ਬਰਕਰਾਰ ਰੱਖੋ
  const parts = text.split(/(```[\s\S]*?```)/);
  return parts
    .map((part) => {
      if (part.startsWith("```")) {
        return part; // ਕੋਡ ਬਲਾਕਾਂ ਨੂੰ ਨਾ ਬਦਲੋ
      }
      return part.replace(/\n{3,}/g, "\n\n"); // ਸਿਰਫ਼ ਗੱਦ 'ਤੇ ਲਾਗੂ ਕਰੋ
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
  stackPriority: 100, // caveman/rtk ਤੋਂ ਬਾਅਦ ਚਲਾਓ

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

    // ਸੁਨੇਹਾ ਐਰੇ ਵਿੱਚੋਂ ਲੰਘੋ — ਸਟ੍ਰਿੰਗ ਅਤੇ multipart ਦੋਵੇਂ ਸਮੱਗਰੀ ਨੂੰ ਸੰਭਾਲੋ
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
      // Multipart ਸਮੱਗਰੀ: ਭਾਗਾਂ ਵਿੱਚੋਂ ਲੰਘੋ, ਸਿਰਫ਼ ਟੈਕਸਟ ਭਾਗਾਂ ਨੂੰ ਸੰਕੁਚਿਤ ਕਰੋ
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
          return part; // image_url, tool_use ਆਦਿ ਨੂੰ ਬਰਕਰਾਰ ਰੱਖੋ
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

// ਗਲੋਬਲ ਤੌਰ 'ਤੇ ਰਜਿਸਟਰ ਕਰੋ
registerCompressionEngine(whitespaceEngine);
````

### ਕਸਟਮ ਇੰਜਣ ਕਿੱਥੇ ਰੱਖਣੇ ਹਨ

```
~/.omniroute/compression/engines/my-engine.ts    # ਵਰਤੋਂਕਾਰ ਪੱਧਰ
<project>/compression-engines/my-engine.ts        # ਪ੍ਰੋਜੈਕਟ ਪੱਧਰ (ਸ਼ੁਰੂਆਤ ਵੇਲੇ ਲੋਡ ਕੀਤਾ ਜਾਂਦਾ ਹੈ)
```

ਜਾਂ ਕਿਸੇ ਪਲੱਗਇਨ ਤੋਂ ਪ੍ਰੋਗਰਾਮੈਟਿਕ ਢੰਗ ਨਾਲ ਲੋਡ ਕਰੋ:

```ts
// ਆਪਣੇ ਪਲੱਗਇਨ ਵਿੱਚ
import {
  registerCompressionEngine,
  unregisterCompressionEngine,
} from "@omniroute/open-sse/services/compression/engines/registry";
import { myEngine } from "./engines/my-engine";

export default definePlugin({
  name: "my-compression-plugin",
  // ਪਲੱਗਇਨ SDK onRequest / onResponse / onError ਹੁੱਕ ਉਪਲਬਧ ਕਰਾਉਂਦਾ ਹੈ। ਇੰਜਣ ਨੂੰ
  // ਪਲੱਗਇਨ ਮੋਡੀਊਲ ਲੋਡ ਹੋਣ ਵੇਲੇ (ਜਾਂ ਪਹਿਲੀ onRequest ਉੱਤੇ) ਰਜਿਸਟਰ ਕਰੋ; ਇਸਨੂੰ ਆਪਣੇ
  // teardown ਪਾਥ ਤੋਂ ਅਨਰਜਿਸਟਰ ਕਰੋ।
  onRequest: async (ctx) => {
    registerCompressionEngine(myEngine);
  },
});

// teardown ਵੇਲੇ:
// unregisterCompressionEngine("my-engine");
```

### ਆਪਣੇ ਇੰਜਣ ਦੀ ਜਾਂਚ ਕਰਨਾ

ਆਪਣੇ ਇੰਜਣ ਨੂੰ ਕਿਸੇ ਪਲੱਗਇਨ ਜਾਂ ਸਟਾਰਟਅੱਪ ਫੰਕਸ਼ਨ ਵਿੱਚ ਰਜਿਸਟਰ ਕਰੋ। ਰਜਿਸਟਰ ਹੋਣ ਤੋਂ ਬਾਅਦ, ਇੰਜਣ ਆਪਣੇ `id` ਰਾਹੀਂ ਰਣਨੀਤੀ ਚੋਣਕਾਰ ਵਿੱਚ ਉਪਲਬਧ ਹੋਵੇਗਾ। ਇਸਨੂੰ ਸਟੈਕ ਕੀਤੀ ਪਾਈਪਲਾਈਨ ਵਿੱਚ ਜੋੜ ਕੇ ਏਕੀਕਰਨ ਦੀ ਜਾਂਚ ਕਰੋ:

---

## ਭਾਸ਼ਾ ਪੈਕ ਬਣਾਉਣਾ

Caveman-ਸ਼ੈਲੀ ਕੰਪਰੈਸ਼ਨ ਹਰੇਕ ਕੁਦਰਤੀ ਭਾਸ਼ਾ ਵਿੱਚ ਫ਼ਾਲਤੂ ਸ਼ਬਦਾਂ, ਹਿਚਕਚਾਹਟ ਅਤੇ ਲੰਮੇ-ਚੌੜੇ ਪੈਟਰਨਾਂ ਨੂੰ ਸੰਭਾਲਣ ਲਈ **ਭਾਸ਼ਾ-ਵਿਸ਼ੇਸ਼ ਨਿਯਮ ਪੈਕਾਂ** ਦੀ ਵਰਤੋਂ ਕਰਦਾ ਹੈ। OmniRoute ਨਾਲ **6 ਭਾਸ਼ਾ ਪੈਕ** ਮਿਲਦੇ ਹਨ: `en`, `es`, `fr`, `de`, `ja`, `pt-BR`।

### ਪੈਕ ਦੀ ਬਣਤਰ

ਇੱਕ ਭਾਸ਼ਾ ਪੈਕ `open-sse/services/compression/rules/<language>/` ਦੇ ਅਧੀਨ **JSON ਫ਼ਾਈਲਾਂ** ਦੀ ਇੱਕ ਡਾਇਰੈਕਟਰੀ ਹੁੰਦੀ ਹੈ:

```
open-sse/services/compression/rules/
├── en/
│   ├── filler.json          # ਰਸਮੀ ਗੱਲਾਂ, ਹਿਚਕਚਾਹਟ, ਨਿਮਰਤਾ
│   ├── context.json         # ਸੰਦਰਭ ਘਟਾਉਣ ਵਾਲੇ ਨਿਯਮ
│   ├── dedup.json           # ਦੁਹਰਾਵਟ ਹਟਾਉਣ ਦੇ ਨਿਯਮ
│   ├── structural.json      # ਵਿਸ਼ਰਾਮ-ਚਿੰਨ੍ਹ, ਫਾਰਮੈਟਿੰਗ
│   └── ultra.json           # ਹਮਲਾਵਰ ਕੰਪਰੈਸ਼ਨ ਨਿਯਮ
├── es/  (ਉਹੀ ਬਣਤਰ)
├── fr/  (ਉਹੀ ਬਣਤਰ)
├── de/  (ਉਹੀ ਬਣਤਰ)
├── ja/  (ਉਹੀ ਬਣਤਰ)
└── pt-BR/ (ਉਹੀ ਬਣਤਰ)
```

### ਨਿਯਮ ਦੀ ਬਣਤਰ

ਹਰੇਕ ਨਿਯਮ ਦਾ ਇਹ ਰੂਪ ਹੁੰਦਾ ਹੈ (`open-sse/services/compression/ruleLoader.ts` ਤੋਂ):

```ts
interface FileRule {
  name: string; // ਮਨੁੱਖਾਂ ਲਈ ਪੜ੍ਹਨਯੋਗ ਨਾਮ (kebab-case)
  pattern: string; // JavaScript regex ਪੈਟਰਨ
  replacement?: string; // ਮਿਲੇ ਹੋਏ ਪੈਟਰਨ ਨੂੰ ਕਿਸ ਨਾਲ ਬਦਲਣਾ ਹੈ
  replacementMap?: Record<string, string>; // ਜਾਂ key→replacement ਮੈਪ
  flags?: string; // Regex ਫਲੈਗ (ਆਮ ਤੌਰ 'ਤੇ "gi")
  context?: "all" | "user" | "system" | "assistant";
  category?: "filler" | "context" | "structural" | "dedup" | "terse" | "ultra";
  minIntensity?: "lite" | "full" | "ultra"; // ਇਸ ਤੀਬਰਤਾ ਤੋਂ ਹੇਠਾਂ ਛੱਡ ਦਿਓ
  description?: string; // ਦਸਤਾਵੇਜ਼ੀਕਰਨ
}
```

### ਉਦਾਹਰਨ: ਹਿੰਦੀ ਲਈ ਫ਼ਾਲਤੂ ਸ਼ਬਦਾਂ ਦੇ ਨਿਯਮ ਸ਼ਾਮਲ ਕਰਨਾ

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
      "description": "'नमस्ते' ਵਰਗੇ ਨਿਮਰ ਸ਼ੁਰੂਆਤੀ ਸ਼ਬਦ ਹਟਾਓ"
    },
    {
      "name": "filler_actually",
      "pattern": "\\b(?:असल में|वास्तव में|दरअसल)\\b\\s*",
      "replacement": "",
      "context": "all",
      "category": "filler",
      "minIntensity": "lite",
      "description": "'actually' ਵਰਗੇ ਫ਼ਾਲਤੂ ਸ਼ਬਦ ਹਟਾਓ"
    },
    {
      "name": "verbose_plea",
      "pattern": "\\b(?:कृपया|कृपया आप|अनुरोध है कि आप)\\b\\s*",
      "replacement": "",
      "context": "all",
      "category": "filler",
      "minIntensity": "full",
      "description": "ਹਿੰਦੀ ਵਿੱਚੋਂ 'please' ਹਟਾਓ"
    }
  ]
}
```

### ਪ੍ਰਮਾਣਿਕਤਾ ਜਾਂਚ

ਲੋਡ ਕਰਨ ਵੇਲੇ ਨਿਯਮ ਪੈਕਾਂ ਦੀ `_schema.json` ਦੇ ਮੁਕਾਬਲੇ ਪ੍ਰਮਾਣਿਕਤਾ ਜਾਂਚ ਕੀਤੀ ਜਾਂਦੀ ਹੈ। ਗਲਤ ਬਣਤਰ ਵਾਲਾ ਪੈਕ ਲੋਡ ਨਹੀਂ ਹੋਵੇਗਾ ਅਤੇ ਇੱਕ ਗਲਤੀ ਲੌਗ ਕਰੇਗਾ:

```
RULE_LOADER: ਪੈਕ "hi/filler.json" ਪ੍ਰਮਾਣਿਕਤਾ ਜਾਂਚ ਵਿੱਚ ਅਸਫਲ ਰਿਹਾ:
  - rules.0.pattern: ਅਵੈਧ regex
  - rules.1.context: [all, user, system, assistant] ਵਿੱਚੋਂ ਇੱਕ ਹੋਣਾ ਲਾਜ਼ਮੀ ਹੈ
```

ਪੈਕ ਲੋਡ ਹੋਣ ਵੇਲੇ (`_schema.json` ਦੇ ਮੁਕਾਬਲੇ) ਪ੍ਰਮਾਣਿਕਤਾ ਜਾਂਚ ਆਪਣੇ ਆਪ ਚੱਲਦੀ ਹੈ; ਇੱਕ
ਅਵੈਧ ਪੈਕ ਰੱਦ ਕਰ ਦਿੱਤਾ ਜਾਂਦਾ ਹੈ ਅਤੇ ਉਪਰੋਕਤ ਗਲਤੀ ਲੌਗ ਕੀਤੀ ਜਾਂਦੀ ਹੈ। ਪੈਕ ਦੀ ਪ੍ਰਮਾਣਿਕਤਾ ਜਾਂਚ ਲਈ ਕੋਈ ਵੱਖਰੀ
`npm run` ਸਕ੍ਰਿਪਟ ਨਹੀਂ ਹੈ — ਪੈਕ ਲੋਡ ਕਰੋ (ਉਦਾਹਰਨ ਲਈ, ਸਰਵਰ ਚਾਲੂ ਕਰੋ ਜਾਂ
ਕੰਪਰੈਸ਼ਨ ਪਾਥ ਚਲਾਓ) ਅਤੇ ਲੌਗਾਂ 'ਤੇ ਨਜ਼ਰ ਰੱਖੋ।

### ਕਸਟਮ ਭਾਸ਼ਾ ਪੈਕ ਲੋਡ ਕਰਨਾ

```ts
import { loadRulePack } from "omniroute/compression/ruleLoader";

await loadRulePack("./my-custom-rules/hi/filler.json");
```

ਜਾਂ ਇਸਨੂੰ ਕਿਸੇ ਮਾਨਤਾ-ਪ੍ਰਾਪਤ ਸਥਾਨ ਵਿੱਚ ਰੱਖੋ:

```
~/.omniroute/compression/rules/hi/filler.json  # ਵਰਤੋਂਕਾਰ-ਪੱਧਰ
<project>/.compression/rules/hi/filler.json   # ਪ੍ਰੋਜੈਕਟ-ਪੱਧਰ
```

### ਭਾਸ਼ਾ ਪੈਕਾਂ ਲਈ ਸਰਵੋਤਮ ਅਭਿਆਸ

1. **`filler` ਨਾਲ ਸ਼ੁਰੂ ਕਰੋ** — ਇਨ੍ਹਾਂ ਨਿਯਮਾਂ ਦਾ ਪ੍ਰਭਾਵ ਸਭ ਤੋਂ ਵੱਧ ਹੁੰਦਾ ਹੈ
2. **ਹਮਲਾਵਰ ਨਿਯਮਾਂ ਨੂੰ ਨਿਯੰਤਰਿਤ ਕਰਨ ਲਈ `minIntensity` ਵਰਤੋ** — ਇਹ ਲੋੜ ਤੋਂ ਵੱਧ ਕੰਪਰੈਸ਼ਨ ਤੋਂ ਬਚਾਉਂਦਾ ਹੈ
3. **ਟੈਸਟ ਕੇਸ ਸ਼ਾਮਲ ਕਰੋ** — ਵਿਹਾਰ ਦੀ ਪੁਸ਼ਟੀ ਕਰਨ ਲਈ JSON ਵਿੱਚ `tests[]` ਐਰੇ ਸ਼ਾਮਲ ਕਰੋ
4. **ਕ੍ਰਮ ਮਹੱਤਵਪੂਰਨ ਹੈ** — ਪਹਿਲੇ ਨਿਯਮ ਪਹਿਲਾਂ ਲਾਗੂ ਹੁੰਦੇ ਹਨ; ਵੱਧ ਪ੍ਰਭਾਵ ਵਾਲੇ ਨਿਯਮ ਪਹਿਲਾਂ ਰੱਖੋ
5. **`replacement` ਦੀ ਵਰਤੋਂ ਸੰਭਲ ਕੇ ਕਰੋ** — ਆਮ ਤੌਰ 'ਤੇ ਖਾਲੀ ਸਟ੍ਰਿੰਗ ਸਹੀ ਹੁੰਦੀ ਹੈ; ਕਦੇ ਵੀ ਨਵੀਂ ਸਮੱਗਰੀ ਸ਼ਾਮਲ ਨਾ ਕਰੋ

### ਅਨੁਵਾਦ ਰਣਨੀਤੀ

ਨਿਯਮ ਪੈਕਾਂ ਨੂੰ ਕਿਸੇ ਨਵੀਂ ਭਾਸ਼ਾ ਲਈ ਸਥਾਨਕ ਬਣਾਉਂਦੇ ਸਮੇਂ:

1. **ਨਿਯਮਾਂ ਦੇ ਨਾਮਾਂ ਦਾ ਅਨੁਵਾਦ ਕਰੋ** — ਉਹ ਡੀਬੱਗ ਆਉਟਪੁੱਟ ਵਿੱਚ ਦਿਖਾਈ ਦਿੰਦੇ ਹਨ
2. **regex ਪੈਟਰਨਾਂ ਨੂੰ ਅਨੁਕੂਲ ਬਣਾਓ** — ਸਿੱਧਾ ਅਨੁਵਾਦ ਅਕਸਰ ਅਸਫਲ ਹੁੰਦਾ ਹੈ (ਸ਼ਬਦਾਂ ਦੀਆਂ ਹੱਦਾਂ ਵੱਖਰੀਆਂ ਹੁੰਦੀਆਂ ਹਨ)
3. **ਅਸਲ ਗੱਲਬਾਤਾਂ ਨਾਲ ਟੈਸਟ ਕਰੋ** — ਪੈਕ ਅਸਲ ਇਨਪੁੱਟ ਉੱਤੇ ਸੁਰੱਖਿਅਤ ਹੋਣਾ ਚਾਹੀਦਾ ਹੈ
4. **ਸੱਭਿਆਚਾਰਕ ਰਿਵਾਜਾਂ ਨਾਲ ਮੇਲ ਕਰੋ** — ਉਦਾਹਰਨ ਲਈ, ਜਾਪਾਨੀ ਪੈਕਾਂ ਵਿੱਚ ਅੰਗਰੇਜ਼ੀ ਨਾਲੋਂ ਵੱਧ ਆਦਰ-ਸੂਚਕ ਫ਼ਾਲਤੂ ਸ਼ਬਦ ਹੁੰਦੇ ਹਨ

---

## ਸਟੈਕਡ ਪਾਈਪਲਾਈਨਾਂ

ਇੱਕ **ਸਟੈਕਡ ਪਾਈਪਲਾਈਨ** ਕਈ ਇੰਜਣਾਂ ਨੂੰ ਕ੍ਰਮਵਾਰ ਚਲਾਉਂਦੀ ਹੈ, ਜਿਸ ਵਿੱਚ ਹਰ ਇੰਜਣ ਦਾ ਆਉਟਪੁੱਟ ਅਗਲੇ ਇੰਜਣ ਨੂੰ ਦਿੱਤਾ ਜਾਂਦਾ ਹੈ। ਅੰਦਰੂਨੀ ਤੌਰ 'ਤੇ `mode: stacked` ਇਸੇ ਤਰ੍ਹਾਂ ਕੰਮ ਕਰਦਾ ਹੈ।

### ਸਟੈਕਿੰਗ ਕਿਵੇਂ ਕੰਮ ਕਰਦੀ ਹੈ

```
ਇਨਪੁੱਟ (10,000 ਟੋਕਨ)
        │
        ▼
   ┌──────────┐
   │  ਇੰਜਣ   │  ਤਰਜੀਹ 10
   │  A       │  ──▶ ਆਉਟਪੁੱਟ: 6,000 ਟੋਕਨ (-40%)
   └────┬─────┘
        ▼
   ┌──────────┐
   │  ਇੰਜਣ   │  ਤਰਜੀਹ 50
   │  B       │  ──▶ ਆਉਟਪੁੱਟ: 2,400 ਟੋਕਨ (-60%)
   └────┬─────┘
        ▼
   ┌──────────┐
   │  ਇੰਜਣ   │  ਤਰਜੀਹ 100
   │  C       │  ──▶ ਆਉਟਪੁੱਟ: 1,200 ਟੋਕਨ (-80%)
   └────┬─────┘
        │
        ▼
ਅੰਤਿਮ ਆਉਟਪੁੱਟ (1,200 ਟੋਕਨ, ਸੰਯੁਕਤ ਤੌਰ 'ਤੇ ~88% ਬਚਤ)
```

ਜਦੋਂ `mode: "stacked"` ਚੁਣਿਆ ਜਾਂਦਾ ਹੈ, ਤਾਂ ਇੰਜਣ `pipeline` ਐਰੇ ਵਿੱਚ ਦਿੱਤੇ ਕ੍ਰਮ ਅਨੁਸਾਰ ਲੜੀਵਾਰ ਚੱਲਦੇ ਹਨ।
ਇੰਜਣ N ਦਾ ਆਉਟਪੁੱਟ ਇੰਜਣ N+1 ਦਾ ਇਨਪੁੱਟ ਬਣ ਜਾਂਦਾ ਹੈ।

### ਕੰਪ੍ਰੈਸ਼ਨ ਮੋਡ

OmniRoute ਸੰਰਚਨਾ, ਆਟੋ-ਟ੍ਰਿਗਰ ਥ੍ਰੈਸ਼ਹੋਲਡਾਂ ਅਤੇ ਕੌਂਬੋ ਓਵਰਰਾਈਡਾਂ ਦੇ ਆਧਾਰ 'ਤੇ **ਹਰੇਕ ਬੇਨਤੀ ਲਈ ਇੱਕ ਮੋਡ** ਚੁਣਦਾ ਹੈ।
ਉਪਲਬਧ ਮੋਡ `open-sse/services/compression/types.ts` (`CompressionMode` ਕਿਸਮ) ਵਿੱਚ ਪਰਿਭਾਸ਼ਿਤ ਹਨ:

| ਮੋਡ          | ਇੰਜਣ                 | ਵਰਤੋਂ ਦਾ ਮਾਮਲਾ                                                                                                                                                                                                    |
| ------------ | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `off`        | ਕੋਈ ਨਹੀਂ             | ਸਾਰਾ ਕੰਪ੍ਰੈਸ਼ਨ ਅਯੋਗ ਕਰੋ                                                                                                                                                                                           |
| `rtk`        | ਸਿਰਫ਼ RTK            | ਕਮਾਂਡ ਆਉਟਪੁੱਟ-ਭਾਰੀ ਸੈਸ਼ਨ (80%+ ਬਚਤ)                                                                                                                                                                               |
| `lite`       | ਸਿਰਫ਼ Lite           | ਸਾਵਧਾਨ ਕੰਪ੍ਰੈਸ਼ਨ (ਤੇਜ਼, ਸੁਰੱਖਿਅਤ)                                                                                                                                                                                 |
| `standard`   | Caveman              | ਭਾਸ਼ਾ ਪੈਕਾਂ ਨਾਲ ਗੱਦ ਕੰਪ੍ਰੈਸ਼ਨ                                                                                                                                                                                     |
| `aggressive` | Caveman + Aggressive | ਹਮਲਾਵਰ ਗੱਦ + ਹਮਲਾਵਰ ਅੰਤਿਮ ਪਾਸ                                                                                                                                                                                     |
| `ultra`      | Ultra                | ਵੱਧ ਤੋਂ ਵੱਧ ਕੰਪ੍ਰੈਸ਼ਨ (ਹਾਨੀਕਾਰਕ, ਆਖਰੀ ਉਪਾਅ)। ਜਦੋਂ `ultra.modelPath` ਸੈੱਟ ਹੋਵੇ ਤਾਂ ਵਿਕਲਪਿਕ ਤੌਰ 'ਤੇ **LLMLingua-2** SLM ਇੰਜਣ ਰਾਹੀਂ ਰੂਟ ਕੀਤਾ ਜਾਂਦਾ ਹੈ (ਮਾਡਲ ਉਪਲਬਧ ਨਾ ਹੋਣ 'ਤੇ ਨਿਯਮ-ਆਧਾਰਿਤ ਮਾਰਗ 'ਤੇ ਫੇਲ-ਓਪਨ ਹੁੰਦਾ ਹੈ)। |
| `stacked`    | ਕਸਟਮ ਪਾਈਪਲਾਈਨ        | ਇੰਜਣਾਂ ਨੂੰ ਕਿਸੇ ਵੀ ਕ੍ਰਮ ਵਿੱਚ ਜੋੜੋ (ਹੇਠਾਂ ਦੇਖੋ)                                                                                                                                                                    |

> ਉਪਰੋਕਤ ਮੋਡ ਇੰਜਣਾਂ ਤੋਂ ਇਲਾਵਾ, ਰਜਿਸਟਰੀ ਵਿੱਚ ਵਿਸ਼ੇਸ਼ ਸਟੈਕਯੋਗ ਇੰਜਣ ਵੀ ਸ਼ਾਮਲ ਹਨ —
> **CCR**, **headroom**, **ionizer**, ਅਤੇ **session-dedup** — ਜਿਨ੍ਹਾਂ ਦਾ ਦਸਤਾਵੇਜ਼ੀਕਰਨ
> [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md#additional-built-in-engines) ਵਿੱਚ ਕੀਤਾ ਗਿਆ ਹੈ।

ਮੋਡ ਦੀ ਚੋਣ `open-sse/services/compression/strategySelector.ts` ਵਿੱਚ `getEffectiveMode()` ਦੁਆਰਾ ਨਿਰਧਾਰਤ ਕੀਤੀ ਜਾਂਦੀ ਹੈ:

1. ਜੇ ਕੰਪ੍ਰੈਸ਼ਨ ਅਯੋਗ ਹੈ: `"off"`
2. ਜੇ ਕੌਂਬੋ ਓਵਰਰਾਈਡ ਮੌਜੂਦ ਹੈ: ਓਵਰਰਾਈਡ ਵਰਤੋ
3. ਜੇ ਆਟੋ-ਟ੍ਰਿਗਰ ਥ੍ਰੈਸ਼ਹੋਲਡ ਪਾਰ ਹੋ ਗਿਆ ਹੈ: `autoTriggerMode` ਵਰਤੋ (ਡਿਫੌਲਟ: `"lite"`)
4. ਨਹੀਂ ਤਾਂ: `defaultMode` ਵਰਤੋ

### ਡਿਫੌਲਟ ਸਟੈਕਡ ਪਾਈਪਲਾਈਨ

ਜਦੋਂ `mode: "stacked"` ਨੂੰ ਸਪਸ਼ਟ ਤੌਰ 'ਤੇ ਸੰਰਚਿਤ ਕੀਤਾ ਜਾਂਦਾ ਹੈ, ਤਾਂ ਡਿਫੌਲਟ ਪਾਈਪਲਾਈਨ ਇਹਨਾਂ ਨੂੰ ਜੋੜਦੀ ਹੈ:

1. **RTK** — ਕਮਾਂਡ ਆਉਟਪੁੱਟ ਦਾ ਬੇਲੋੜਾ ਸ਼ੋਰ ਹਟਾਉਂਦਾ ਹੈ (ਟਰਮੀਨਲ ਆਉਟਪੁੱਟ 'ਤੇ ~80% ਬਚਤ)
2. **Caveman** — ਬੇਲੋੜੇ ਸ਼ਬਦ ਹਟਾਉਂਦਾ ਹੈ ਅਤੇ ਗੱਦ ਨੂੰ ਸੰਖੇਪ ਬਣਾਉਂਦਾ ਹੈ (ਬਚੇ ਹੋਏ ਟੈਕਸਟ 'ਤੇ ~46%)
3. **Lite** — ਅੰਤਿਮ ਖਾਲੀ ਥਾਂ + ਡੀਡੁਪ ਪਾਸ

ਇਹ ਸੰਯੋਜਨ ਟੂਲ-ਭਾਰੀ ਸੈਸ਼ਨਾਂ 'ਤੇ **78-95% ਬਚਤ** ਪ੍ਰਾਪਤ ਕਰਦਾ ਹੈ।

### ਸਟੈਕਡ ਪਾਈਪਲਾਈਨਾਂ ਦੀ ਸੰਰਚਨਾ

ਕੌਂਬੋ ਸੰਰਚਨਾ ਵਿੱਚ:

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

ਤੁਸੀਂ ਇੰਜਣਾਂ ਨੂੰ ਛੱਡ ਸਕਦੇ ਹੋ, ਕਸਟਮ ਇੰਜਣ ਜੋੜ ਸਕਦੇ ਹੋ ਜਾਂ ਉਨ੍ਹਾਂ ਦਾ ਕ੍ਰਮ ਬਦਲ ਸਕਦੇ ਹੋ।

### ਸਟੇਟ ਪਾਸ ਕਰਨਾ

ਇੰਜਣ ਬੇਨਤੀ ਸੰਦਰਭ (`options` ਵਿੱਚ) ਤੋਂ ਮੈਟਾਡੇਟਾ ਪੜ੍ਹ ਸਕਦੇ ਹਨ:

```ts
compress(body, config) {
  // ਪਿਛਲੇ ਇੰਜਣਾਂ ਤੋਂ ਮੈਟਾਡੇਟਾ ਪੜ੍ਹੋ
  const original = options?.compressionComboId;  // "my-coding-combo"
  // ...
}
```

ਮੈਟਾਡੇਟਾ **ਸਿਰਫ਼-ਪੜ੍ਹਨਯੋਗ** ਹੈ — ਇੰਜਣ ਬੇਨਤੀ ਸੰਦਰਭ ਨੂੰ ਬਦਲ ਨਹੀਂ ਸਕਦੇ, ਸਿਰਫ਼ ਆਪਣੇ ਬੌਡੀ ਆਉਟਪੁੱਟ ਨੂੰ ਬਦਲ ਸਕਦੇ ਹਨ।

### ਐਗਜ਼ੀਕਿਊਸ਼ਨ ਕ੍ਰਮ ਦੀਆਂ ਪੇਚੀਦਗੀਆਂ

| ਇੰਜਣ ਕ੍ਰਮ                               | ਪ੍ਰਭਾਵ                                                                                           |
| --------------------------------------- | ------------------------------------------------------------------------------------------------ |
| RTK → Caveman → Lite                    | **ਸਿਫ਼ਾਰਸ਼ੀ** (ਪਹਿਲਾਂ ਸ਼ੋਰ, ਫਿਰ ਭਾਸ਼ਾਈ ਬੇਲੋੜਾਪਣ ਅਤੇ ਅੰਤ ਵਿੱਚ ਖਾਲੀ ਥਾਂ ਹਟਾਉਂਦਾ ਹੈ)                |
| Lite → RTK → Caveman                    | ਮਾੜਾ — Lite ਕੱਚੇ ਆਉਟਪੁੱਟ ਵਿੱਚੋਂ ਖਾਲੀ ਥਾਂ ਹਟਾ ਦਿੰਦਾ ਹੈ, ਜਿਸ ਨਾਲ RTK ਪੈਟਰਨ ਮੈਚਿੰਗ ਅਸਫਲ ਹੋ ਜਾਂਦੀ ਹੈ |
| Caveman → RTK                           | ਮਾੜਾ — Caveman ਟੈਕਸਟ ਨੂੰ ਅਜਿਹੇ ਢੰਗਾਂ ਨਾਲ ਮੁੜ ਲਿਖ ਸਕਦਾ ਹੈ ਜਿਨ੍ਹਾਂ ਨੂੰ RTK ਨਹੀਂ ਪਛਾਣਦਾ             |
| ਕਿਸੇ ਵੀ ਕ੍ਰਮ ਵਿੱਚ ਪਹਿਲਾਂ `tool_results` | ਬਿਹਤਰ — ਟੂਲ ਆਉਟਪੁੱਟ ਸਭ ਤੋਂ ਵੱਧ ਸ਼ੋਰ ਵਾਲੀ ਸਮੱਗਰੀ ਹੈ                                               |

### ਕਦੋਂ ਸਟੈਕ ਨਾ ਕਰਨਾ ਹੈ

ਸਟੈਕਿੰਗ ਹਮੇਸ਼ਾ ਬਿਹਤਰ ਨਹੀਂ ਹੁੰਦੀ:

- **ਸਧਾਰਨ ਸੁਨੇਹੇ** (ਕੋਈ ਟੂਲ ਆਉਟਪੁੱਟ ਨਹੀਂ) — ਸਿਰਫ਼ Caveman ਜਾਂ Lite ਕਾਫ਼ੀ ਹੈ
- **ਲਾਗਤ-ਸੰਵੇਦਨਸ਼ੀਲ** — ਹਰੇਕ ਇੰਜਣ ~5-50ms ਲੇਟੈਂਸੀ ਜੋੜਦਾ ਹੈ
- **ਖਾਸ ਟੂਲ** — ਸ਼ੈੱਲ ਆਉਟਪੁੱਟ ਲਈ ਆਮ ਤੌਰ 'ਤੇ ਸਿਰਫ਼ RTK ਹੀ ਕਾਫ਼ੀ ਹੁੰਦਾ ਹੈ

### ਇੱਕ ਕਸਟਮ ਪਾਈਪਲਾਈਨ ਬਣਾਉਣਾ

ਕੋਈ named-pipeline registry ਨਹੀਂ ਹੈ। ਇੱਕ stacked pipeline ਸਿਰਫ਼ **steps ਦੀ inline array**
ਹੈ, ਜੋ `applyStackedCompression()` ਨੂੰ ਪਾਸ ਕੀਤੀ ਜਾਂਦੀ ਹੈ (`@omniroute/open-sse/services/compression/strategySelector`
ਤੋਂ export ਕੀਤੀ ਗਈ):

```ts
import { applyStackedCompression } from "@omniroute/open-sse/services/compression/strategySelector";

const result = applyStackedCompression(body, [
  { engine: "rtk", intensity: "aggressive" },
  { engine: "caveman", intensity: "full" },
]);
```

ਜਦੋਂ ਤੁਸੀਂ pipeline ਪਾਸ ਨਹੀਂ ਕਰਦੇ, ਤਾਂ ਇਹ ਮੂਲ ਰੂਪ ਵਿੱਚ `rtk(standard) → caveman(full)` ਵਰਤਦੀ ਹੈ।

ਇਸਨੂੰ config ਰਾਹੀਂ ਚਲਾਉਣ ਲਈ, `mode: "stacked"` ਸੈੱਟ ਕਰੋ ਅਤੇ steps ਦੀ array
`stackedPipeline` ਦੇ ਅਧੀਨ ਦਿਓ (`config.stackedPipeline` ਤੋਂ ਪੜ੍ਹੀ ਜਾਂਦੀ ਹੈ):

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

## ਅੱਪਸਟ੍ਰੀਮ ਸਿੰਕ ਨੀਤੀ

OmniRoute ਦੇ ਕੰਪ੍ਰੈਸ਼ਨ ਇੰਜਣ README ਵਿੱਚ ਕਈ ਅੱਪਸਟ੍ਰੀਮ ਪ੍ਰੋਜੈਕਟਾਂ ਨੂੰ ਸ਼੍ਰੇਯ ਦਿੰਦੇ ਹਨ
("RTK, Caveman, LLMLingua-2, Troglodita ਤੋਂ ਪ੍ਰੇਰਿਤ")। ਯੋਗਦਾਨਕਾਰਾਂ ਦਾ ਇੱਕ ਆਮ
ਸਵਾਲ ਹੈ: **ਜਦੋਂ ਅੱਪਸਟ੍ਰੀਮ RTK ਕੋਈ ਨਵਾਂ ਟੂਲ ਫਿਲਟਰ ਜੋੜਦਾ ਹੈ ਜਾਂ Caveman ਕੋਈ ਰੂਲ
ਪੈਕ ਜੋੜਦਾ ਹੈ, ਤਾਂ ਉਹ OmniRoute ਤੱਕ ਕਿਵੇਂ ਪਹੁੰਚਦਾ ਹੈ?** ਇਹ ਭਾਗ ਇਸ ਦਾ ਅਧਿਕਾਰਤ ਜਵਾਬ ਹੈ।

### ਵੈਂਡਰ ਕੀਤੀਆਂ ਕਾਪੀਆਂ ਬਨਾਮ ਸੁਤੰਤਰ ਇੰਪਲੀਮੈਂਟੇਸ਼ਨਾਂ

| ਇੰਜਣ                         | ਅੱਪਸਟ੍ਰੀਮ ਨਾਲ ਸੰਬੰਧ                                                                                                                    | ਟਿਕਾਣਾ                                                              |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| **RTK**                      | **ਸੁਤੰਤਰ ਮੁੜ-ਇੰਪਲੀਮੈਂਟੇਸ਼ਨ** (ਤੋਂ ਪ੍ਰੇਰਿਤ, ਕਾਪੀ ਨਹੀਂ)                                                                                  | `open-sse/services/compression/engines/rtk/`                        |
| **Caveman**                  | **ਸੁਤੰਤਰ ਮੁੜ-ਇੰਪਲੀਮੈਂਟੇਸ਼ਨ** (ਤੋਂ ਪ੍ਰੇਰਿਤ)                                                                                             | `open-sse/services/compression/engines/cavemanAdapter.ts`           |
| **Headroom**                 | ਜ਼ਿਆਦਾਤਰ ਅੰਦਰੂਨੀ; ਸਿਰਫ਼ `gcf/` ਕੋਡੈਕ ਹੀ `gcf-typescript` ਤੋਂ **ਅਸਲ ਵਿੱਚ ਵੈਂਡਰ ਕੀਤਾ ਹੋਇਆ** ਹੈ (MIT, SPDX-ਚਿੰਨ੍ਹਿਤ, ਕੇਵਲ ਜਨਰਿਕ ਪ੍ਰੋਫਾਈਲ) | `open-sse/services/compression/engines/headroom/gcf/`               |
| **LLMLingua-2 / Troglodita** | ਤੋਂ ਪ੍ਰੇਰਿਤ (`llmlingua` + `session-dedup` ਇੰਜਣਾਂ ਨੂੰ ਚਲਾਉਂਦੇ ਹਨ)                                                                      | `open-sse/services/compression/engines/llmlingua/`, `session-dedup` |

ਮੁੱਖ ਨੁਕਤਾ: **RTK ਅਤੇ Caveman, _ਵਿਚਾਰਾਂ_ (ਫਿਲਟਰ ਨਿਯਮਾਂ, ਰੂਲ ਪੈਕਾਂ) ਦੀਆਂ ਕਲੀਨ-ਰੂਮ TypeScript ਇੰਪਲੀਮੈਂਟੇਸ਼ਨਾਂ ਹਨ, ਵੈਂਡਰ ਕੀਤੇ ਸਰੋਤ ਟ੍ਰੀ ਨਹੀਂ।** ਇੱਥੇ
`git pull` ਕਰਨ ਲਈ ਕੋਈ ਅੱਪਸਟ੍ਰੀਮ ਕਾਪੀ ਨਹੀਂ ਹੈ — ਅਤੇ ਇਸੇ ਕਾਰਨ README ਵਿੱਚ
"ਬੰਡਲ ਕੀਤੇ" ਦੀ ਬਜਾਏ "ਤੋਂ ਪ੍ਰੇਰਿਤ" ਲਿਖਿਆ ਹੈ।

### ਅੱਪਸਟ੍ਰੀਮ ਸੁਧਾਰਾਂ ਨੂੰ ਕਿਵੇਂ ਮਰਜ ਕੀਤਾ ਜਾਂਦਾ ਹੈ

ਡਿਜ਼ਾਇਨ ਅਨੁਸਾਰ, **ਕੋਈ ਸਵੈਚਾਲਿਤ ਅੱਪਸਟ੍ਰੀਮ-ਰਿਲੀਜ਼ ਟ੍ਰੈਕਿੰਗ ਅਤੇ ਕੋਈ `compression-sync`
ਲੇਬਲ ਨਹੀਂ ਹੈ**। ਕਿਉਂਕਿ ਇੰਜਣ ਮੁੜ-ਇੰਪਲੀਮੈਂਟੇਸ਼ਨਾਂ ਹਨ, ਕਿਸੇ ਅੱਪਸਟ੍ਰੀਮ RTK
ਫਿਲਟਰ ਜਾਂ Caveman ਰੂਲ ਪੈਕ ਨੂੰ ਕੋਡ ਵਜੋਂ ਮਰਜ ਨਹੀਂ ਕੀਤਾ ਜਾਂਦਾ; ਇਸ ਨੂੰ **OmniRoute ਦੇ ਆਪਣੇ
ਫਾਰਮੈਟ ਵਿੱਚ ਇੱਕ ਨਵੇਂ ਨਿਯਮ/ਫਿਲਟਰ ਵਜੋਂ ਮੁੜ ਪ੍ਰਗਟ ਕੀਤਾ ਜਾਂਦਾ ਹੈ** (ਵੇਖੋ
[COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md)) ਅਤੇ ਇੱਕ ਆਮ PR ਰਾਹੀਂ
ਲੋੜ ਅਨੁਸਾਰ ਸ਼ਾਮਲ ਕੀਤਾ ਜਾਂਦਾ ਹੈ। ਉੱਪਰ ਦਿੱਤੇ ਐਕਸਟੈਂਸ਼ਨ ਪੁਆਇੰਟ (ਕਸਟਮ ਇੰਜਣ, ਭਾਸ਼ਾ ਪੈਕ, RTK ਫਿਲਟਰ)
ਅਜਿਹਾ ਯੋਗਦਾਨ ਦੇਣ ਦੇ ਮਨਜ਼ੂਰਸ਼ੁਦਾ ਤਰੀਕੇ ਹਨ।

ਇਸੇ ਪ੍ਰਵਾਹ ਦੀਆਂ ਹਾਲੀਆ ਉਦਾਹਰਨਾਂ:

- Gradle ਅਤੇ `dotnet` ਬਿਲਡ ਆਉਟਪੁੱਟ ਲਈ RTK ਫਿਲਟਰ (v3.8.42)
- kubectl / docker-build / composer / gh ਲਈ RTK ਫਿਲਟਰ (#2824)
- Caveman ਇੰਡੋਨੇਸ਼ੀਆਈ ਭਾਸ਼ਾ ਪੈਕ (#3975), ਨਾਲ ਹੀ ਜਰਮਨ / ਫਰਾਂਸੀਸੀ / ਜਪਾਨੀ / ਚੀਨੀ ਪੈਕ

### Headroom (ਇਨਪੁੱਟ-ਕੰਪ੍ਰੈਸ਼ਨ ਪ੍ਰੌਕਸੀ)

Headroom **ਪੂਰੀ ਤਰ੍ਹਾਂ ਅੰਦਰੂਨੀ** ਹੈ — ਇੱਕ ਪਿੰਨ ਕੀਤਾ ਵੈਂਡਰ `gcf` ਕੋਡੈਕ ਸਨੈਪਸ਼ਾਟ ਅਤੇ
OmniRoute ਦੀਆਂ ਆਪਣੀਆਂ `smartcrusher` / `toon` / `tabular` ਪਰਤਾਂ। ਵੈਂਡਰ ਕੀਤੀ ਕਾਪੀ ਤੋਂ ਇਲਾਵਾ
ਟ੍ਰੈਕ ਕਰਨ ਲਈ ਕੋਈ ਸਰਗਰਮ ਅੱਪਸਟ੍ਰੀਮ ਨਹੀਂ ਹੈ; ਕੋਡੈਕ ਬਦਲਣ 'ਤੇ `gcf` ਦੇ ਅੱਪਡੇਟ
ਹੱਥੀਂ ਰਿਫ੍ਰੈਸ਼ ਕੀਤੇ ਜਾਂਦੇ ਹਨ ਅਤੇ ਕੰਪ੍ਰੈਸ਼ਨ ਬਜਟ ਗੇਟ
(`check:compression-budget`) ਦੇ ਵਿਰੁੱਧ ਮੁੜ ਪ੍ਰਮਾਣਿਤ ਕੀਤੇ ਜਾਂਦੇ ਹਨ।

### ਅੱਪਸਟ੍ਰੀਮ ਤੋਂ ਪ੍ਰੇਰਿਤ ਸੁਧਾਰ ਦਾ ਪ੍ਰਸਤਾਵ ਦੇਣਾ

1. **ਵੈਂਡਰ ਨਾ ਕਰੋ** — ਅੱਪਸਟ੍ਰੀਮ ਨਿਯਮ/ਫਿਲਟਰ ਨੂੰ OmniRoute ਦੇ ਫਾਰਮੈਟ ਵਿੱਚ ਮੁੜ ਪ੍ਰਗਟ ਕਰੋ।
2. ਇਸ ਨੂੰ ਹੇਠਾਂ ਦਿੱਤੇ ਮੇਲ ਖਾਂਦੇ ਐਕਸਟੈਂਸ਼ਨ ਪੁਆਇੰਟ (ਭਾਸ਼ਾ ਪੈਕ, RTK ਫਿਲਟਰ, ਜਾਂ
   ਕਸਟਮ ਇੰਜਣ) ਰਾਹੀਂ ਜੋੜੋ।
3. PR ਦੇ ਵੇਰਵੇ ਵਿੱਚ ਅੱਪਸਟ੍ਰੀਮ ਪ੍ਰੋਜੈਕਟ ਦਾ ਹਵਾਲਾ ਦਿਓ (ਸ਼੍ਰੇਯ ਲਈ), ਇਸ ਦੇ
   ਲਾਇਸੈਂਸ-ਧਾਰੀ ਸਰੋਤ ਨੂੰ ਕਾਪੀ ਨਾ ਕਰੋ।
4. ਟੈਸਟ ਸ਼ਾਮਲ ਕਰੋ ਅਤੇ ਪੁਸ਼ਟੀ ਕਰੋ ਕਿ `check:compression-budget` ਗੇਟ ਅਜੇ ਵੀ ਪਾਸ ਹੁੰਦਾ ਹੈ।

---

## ਆਉਟਪੁੱਟ ਸਟਾਈਲ ਸ਼ਾਮਲ ਕਰਨਾ

ਆਉਟਪੁੱਟ ਸਟਾਈਲਾਂ (ਵੇਖੋ [ਗਾਈਡ ਦੀ ਕੈਟਾਲਾਗ ਸਾਰਣੀ](./COMPRESSION_GUIDE.md#output-styles-catalog))
ਇਨਪੁੱਟ ਇੰਜਣਾਂ ਦੇ ਜਵਾਬ-ਪੱਖੀ ਸਮਕੱਖ ਹਨ: ਤੁਹਾਡੇ ਵੱਲੋਂ ਭੇਜੀ ਸਮੱਗਰੀ ਨੂੰ ਸੰਕੁਚਿਤ ਕਰਨ ਦੀ ਬਜਾਏ,
ਇਹ ਮਾਡਲ ਨੂੰ ਘੱਟ ਲਾਗਤ ਵਾਲਾ ਆਉਟਪੁੱਟ ਤਿਆਰ ਕਰਨ ਦਾ ਨਿਰਦੇਸ਼ ਦਿੰਦੀਆਂ ਹਨ। ਰਜਿਸਟਰੀ
`open-sse/services/compression/outputStyles/catalog.ts` ਵਿੱਚ `OUTPUT_STYLE_CATALOG` ਹੈ, ਅਤੇ
**ਇੱਕ ਕੈਟਾਲਾਗ ਐਂਟਰੀ ਹੀ ਪੂਰੀ ਵਿਸ਼ੇਸ਼ਤਾ ਹੈ**: ਇੰਜੈਕਟਰ, ਡੈਸ਼ਬੋਰਡ ਸੈਟਿੰਗਾਂ ਪੈਨਲ,
ਸਥਿਰ ਸਟੋਰੇਜ ਅਤੇ ਟੈਲੀਮੀਟਰੀ ਸਾਰੇ ਕੈਟਾਲਾਗ ਨੂੰ ਹੀ ਗਿਣਦੇ ਹਨ — ਅੱਪਡੇਟ ਕਰਨ ਲਈ ਕੋਈ ਹੋਰ ਸੂਚੀ ਨਹੀਂ ਹੈ।

1. **`OUTPUT_STYLE_CATALOG` ਵਿੱਚ ਇੱਕ ਐਂਟਰੀ ਸ਼ਾਮਲ ਕਰੋ**, ਜਿਸ ਵਿੱਚ `id`, `label`, `description` ਅਤੇ
   ਤਿੰਨ ਅੰਗਰੇਜ਼ੀ `levels` (`lite`, `full`, `ultra`) ਹੋਣ। ਹਰ ਪੱਧਰ ਦਾ ਅੰਤ
   `${SHARED_BOUNDARIES}` ਨਾਲ ਹੋਣਾ ਲਾਜ਼ਮੀ ਹੈ ਤਾਂ ਜੋ ਕੋਡ, ਪਾਥ, ਕਮਾਂਡਾਂ, ਗਲਤੀਆਂ ਅਤੇ URLs ਜਿਉਂ ਦੇ ਤਿਉਂ ਰਹਿਣ।
   ਨਿਰਦੇਸ਼ ਦਾ ਟੈਕਸਟ ਹਰ `(id, level, language)` ਲਈ **ਸਥਿਰ ਅਤੇ ਨਿਰਧਾਰਿਤ** ਹੋਣਾ ਲਾਜ਼ਮੀ ਹੈ —
   ਕੇਵਲ `${SHARED_BOUNDARIES}` ਇੰਟਰਪੋਲੇਸ਼ਨ ਦੀ ਇਜਾਜ਼ਤ ਹੈ।
2. **ਇਸਦਾ ਅਨੁਵਾਦ ਕਰੋ।** `i18n` ਹੇਠ ਘੱਟੋ-ਘੱਟ ਇੱਕ `pt-BR` ਬਲਾਕ ਦਿਓ; `ponytail` ਅਤੇ
   `i-have-adhd` (en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi) ਸੰਦਰਭ ਢਾਂਚਾ ਹਨ। ਜਾਣਬੁੱਝ ਕੇ
   ਸਿਰਫ਼ ਇੱਕ ਭਾਸ਼ਾ ਵਾਲੀ ਸਟਾਈਲ ਇਸ ਦੀ ਬਜਾਏ `locale` ਸੈੱਟ ਕਰਦੀ ਹੈ (ਜਿਵੇਂ `terse-cjk` → `zh`) ਅਤੇ ਫਿਰ
   ਕੇਵਲ ਉਸੇ ਲੋਕੇਲ ਹੇਠ ਪੇਸ਼ ਕੀਤੀ ਜਾਂਦੀ ਹੈ।
3. **ਮੈਟ੍ਰਿਕਸ ਗਾਰਡ ਅੱਪਡੇਟ ਕਰੋ** — ਸਟਾਈਲ ਦੀਆਂ ਭਾਸ਼ਾਵਾਂ ਨੂੰ
   `tests/unit/compression/output-styles-i18n-matrix.test.ts` ਵਿੱਚ `BASELINE_LANGUAGES` ਵਿੱਚ ਸ਼ਾਮਲ ਕਰੋ। ਇਹ ਗੇਟ ਲੋੜੀਂਦੇ
   ਅਨੁਵਾਦਾਂ ਤੋਂ ਬਿਨਾਂ ਕਿਸੇ ਵੀ ਨਵੀਂ, ਗੈਰ-locale-gated ਸਟਾਈਲ ਨੂੰ ਅਸਫਲ ਕਰ ਦਿੰਦਾ ਹੈ, ਜਦੋਂ ਤੱਕ ਇਸ ਵਿੱਚ
   ਟ੍ਰੈਕਿੰਗ ਇਸ਼ੂ ਸਮੇਤ ਇੱਕ ਸਪਸ਼ਟ `KNOWN_ENGLISH_ONLY` ਐਂਟਰੀ ਨਾ ਹੋਵੇ।
4. **ਹਰ ਸਟਾਈਲ ਲਈ ਇੱਕ ਟੈਸਟ ਸ਼ਾਮਲ ਕਰੋ**, ਜੋ
   `tests/unit/compression/i-have-adhd-catalog.test.ts` ਦੇ ਨਮੂਨੇ 'ਤੇ ਆਧਾਰਿਤ ਹੋਵੇ: ਕੈਟਾਲਾਗ ਢਾਂਚਾ, ਹਰ ਪੱਧਰ ਲਈ
   ਸੀਮਾਵਾਂ ਵਾਲੀ ਧਾਰਾ, ਅਤੇ ਇੱਕ ਐਂਕਰ ਜੋ ਪੁਸ਼ਟੀ ਕਰੇ ਕਿ ਹਰ ਅਨੁਵਾਦ ਨਕਲ ਕੀਤੀ ਅੰਗਰੇਜ਼ੀ ਦੀ ਬਜਾਏ
   ਉਸਦੀ ਆਪਣੀ ਭਾਸ਼ਾ ਵਿੱਚ ਲਿਖਿਆ ਗਿਆ ਹੈ।
5. **ਸਰੋਤ-ਸਵੀਕ੍ਰਿਤੀ**: ਜੇ ਸਟਾਈਲ ਕਿਸੇ ਅੱਪਸਟ੍ਰੀਮ ਪ੍ਰੋਜੈਕਟ ਤੋਂ ਅਨੁਕੂਲਿਤ ਕੀਤੀ ਗਈ ਹੈ, ਤਾਂ ਐਂਟਰੀ ਉੱਤੇ ਇੱਕ
   ਸਰੋਤ ਟਿੱਪਣੀ ਵਿੱਚ ਉਸਨੂੰ ਸਿਹਰਾ ਦਿਓ (ਉਦਾਹਰਨ ਲਈ `i-have-adhd` → ayghri/i-have-adhd, MIT) — ਇਹ ਉਹੀ
   ਨਿਯਮ ਹੈ ਜੋ ਉੱਪਰ "ਅੱਪਸਟ੍ਰੀਮ-ਪ੍ਰੇਰਿਤ ਸੁਧਾਰ ਪ੍ਰਸਤਾਵਿਤ ਕਰਨਾ" ਲਈ ਹੈ।

ਕਿਸੇ UI, ਸਕੀਮਾ ਜਾਂ ਟੈਲੀਮੀਟਰੀ ਤਬਦੀਲੀ ਦੀ ਲੋੜ ਨਹੀਂ ਹੈ — ਇਹ ਸਤਹਾਂ ਕੈਟਾਲਾਗ ਤੋਂ ਰੈਂਡਰ ਹੁੰਦੀਆਂ ਹਨ।

---

## ਸਰਵੋਤਮ ਅਭਿਆਸ

### ਇੰਜਣ ਵਿਕਾਸ

1. **ਹਮੇਸ਼ਾ `validateConfig` ਲਾਗੂ ਕਰੋ** — ਪ੍ਰਮਾਣਿਕਤਾ ਤੋਂ ਬਿਨਾਂ ਇੰਜਣ ਚੁੱਪਚਾਪ ਅਸਫਲ ਹੋ ਜਾਂਦੇ ਹਨ
2. **ਵਾਸਤਵਿਕ `targetLatencyMs` ਸੈੱਟ ਕਰੋ** — ਰਣਨੀਤੀ ਚੋਣਕਾਰ ਇਸਦੀ ਵਰਤੋਂ ਇੰਜਣ ਚੁਣਨ ਲਈ ਕਰਦਾ ਹੈ
3. **ਡੈਸ਼ਬੋਰਡ ਲਈ `getConfigSchema` ਵਰਤੋ** — ਵਰਤੋਂਕਾਰਾਂ ਤੋਂ ਕਦੇ ਵੀ ਸੰਰਚਨਾ ਨਾ ਲੁਕਾਓ
4. **ਜੇ ਤੁਹਾਡਾ ਇੰਜਣ ਸ਼ੁੱਧ ਹੈ ਤਾਂ `stackable: true` ਦਾ ਸਮਰਥਨ ਕਰੋ** — ਸਾਈਡ ਇਫੈਕਟ ਵਾਲੇ ਇੰਜਣਾਂ ਨੂੰ ਸਟੈਕ ਨਹੀਂ ਹੋਣਾ ਚਾਹੀਦਾ
5. **ਇਨਲਾਈਨ ਟੈਸਟ ਲਿਖੋ** — ਇੰਜਣਾਂ ਨੂੰ <1s ਵਿੱਚ ਪ੍ਰਮਾਣਿਤ ਕੀਤਾ ਜਾ ਸਕਣਾ ਚਾਹੀਦਾ ਹੈ

### ਭਾਸ਼ਾ ਪੈਕ ਵਿਕਾਸ

1. **`lite` ਤੀਬਰਤਾ ਨਾਲ ਸ਼ੁਰੂ ਕਰੋ** — ਤੁਹਾਡੇ ਨਿਯਮ ਸਭ ਤੋਂ ਘੱਟ ਸੈਟਿੰਗ ਉੱਤੇ ਸੁਰੱਖਿਅਤ ਹੋਣੇ ਚਾਹੀਦੇ ਹਨ
2. **ਨਿਯਮਾਂ ਦਾ ਦਾਇਰਾ ਨਿਰਧਾਰਤ ਕਰਨ ਲਈ `context` ਵਰਤੋ** — ਸਿਰਫ਼ `user` ਵਾਲੇ ਨਿਯਮ ਅਣਜਾਣੇ ਵਿੱਚ ਸਿਸਟਮ ਪ੍ਰੌਂਪਟਾਂ ਨੂੰ ਪ੍ਰਭਾਵਿਤ ਨਹੀਂ ਕਰ ਸਕਦੇ
3. **JSON ਕੁੰਜੀਆਂ ਕੈਪਚਰ ਕਰਨ ਤੋਂ ਬਚੋ** — `\\bword\\b` JSON ਦੇ ਅੰਦਰ ਮੇਲ ਖਾ ਸਕਦਾ ਹੈ, ਜਿਸ ਨਾਲ ਸੰਰਚਿਤ ਡਾਟਾ ਖਰਾਬ ਹੋ ਸਕਦਾ ਹੈ
4. **ਕਿਨਾਰੀ ਮਾਮਲਿਆਂ ਨਾਲ ਟੈਸਟ ਕਰੋ** — ਖਾਲੀ ਇਨਪੁੱਟ, ਯੂਨੀਕੋਡ, RTL ਟੈਕਸਟ, ਇਮੋਜੀ
5. **ਮੌਜੂਦਾ ਪੈਕਾਂ ਨੂੰ ਟੈਂਪਲੇਟ ਵਜੋਂ ਵਰਤੋ** — `en/filler.json` ਸਭ ਤੋਂ ਵੱਧ ਵਿਕਸਿਤ ਉਦਾਹਰਨ ਹੈ

### ਪਾਈਪਲਾਈਨ ਡਿਜ਼ਾਈਨ

1. **ਅਨੁਕੂਲਨ ਤੋਂ ਪਹਿਲਾਂ ਪ੍ਰੋਫ਼ਾਈਲ ਕਰੋ** — ਪਹਿਲਾਂ `compression_stats` ਨਾਲ ਮਾਪੋ
2. **ਮੁੜ-ਲਾਗੂਕਰਨ ਦੀ ਬਜਾਏ ਸੰਯੋਜਨ ਨੂੰ ਤਰਜੀਹ ਦਿਓ** — ਨਵਾਂ ਇੰਜਣ ਲਿਖਣ ਤੋਂ ਪਹਿਲਾਂ Caveman ਨਿਯਮਾਂ ਨੂੰ ਵਿਸਤਾਰ ਦਿਓ
3. **ਕ੍ਰਮ ਦੇ ਤਰਕ ਦਾ ਦਸਤਾਵੇਜ਼ੀਕਰਨ ਕਰੋ** — ਟਿੱਪਣੀ ਵਿੱਚ ਦੱਸੋ ਕਿ ਇੰਜਣ A ਇੰਜਣ B ਤੋਂ ਪਹਿਲਾਂ ਕਿਉਂ ਹੈ
4. **ਸਾਰੇ 3 ਤੀਬਰਤਾ ਪੱਧਰਾਂ ਉੱਤੇ ਟੈਸਟ ਕਰੋ** — `lite` ਤੇਜ਼ ਪਰ ਘਾਟੇਦਾਰ ਹੈ, `ultra` ਹੌਲਾ ਪਰ ਸਟੀਕ ਹੈ

---

## ਹਵਾਲਾ: ਅੰਦਰੂਨੀ ਇੰਜਣ

| ਇੰਜਣ ID              | ਸਟੈਕ ਕਰਨ ਯੋਗ | ਡਿਫਾਲਟ stackPriority | ਟਾਰਗੇਟ                      |
| -------------------- | ------------ | -------------------- | --------------------------- |
| `lite`               | ਹਾਂ          | 5                    | ਸੁਨੇਹੇ, ਟੂਲ ਨਤੀਜੇ           |
| `rtk`                | ਹਾਂ          | 10                   | ਟੂਲ ਨਤੀਜੇ                   |
| `standard` (caveman) | ਹਾਂ          | 20                   | ਸੁਨੇਹੇ, ਟੂਲ ਨਤੀਜੇ, ਕੋਡ ਬਲਾਕ |
| `aggressive`         | ਹਾਂ          | 30                   | ਸੁਨੇਹੇ                      |
| `ultra`              | ਹਾਂ          | 40                   | ਸੁਨੇਹੇ, ਕੋਡ ਬਲਾਕ            |

### ਇਹ ਵੀ ਵੇਖੋ

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — ਪਾਈਪਲਾਈਨ ਦੀ ਸੰਖੇਪ ਜਾਣਕਾਰੀ
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — ਇੰਜਣ ਰਜਿਸਟਰੀ ਹਵਾਲਾ
- [COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md) — ਨਿਯਮ ਫਾਰਮੈਟ ਵਿਸ਼ੇਸ਼ਤਾ
- [COMPRESSION_LANGUAGE_PACKS.md](./COMPRESSION_LANGUAGE_PACKS.md) — ਭਾਸ਼ਾ ਪੈਕ ਦੇ ਵੇਰਵੇ
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — RTK ਇੰਜਣ ਅਤੇ ਕਸਟਮ ਫਿਲਟਰ
- ਸਰੋਤ: `open-sse/services/compression/` (117 ਫ਼ਾਈਲਾਂ, ~250KB)
