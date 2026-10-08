# Extending the Compression Pipeline (বাংলা)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/EXTENDING_COMPRESSION.md) · 🇪🇹 [am](../../../am/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇦 [ar](../../../ar/docs/compression/EXTENDING_COMPRESSION.md) · 🇦🇿 [az](../../../az/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇬 [bg](../../../bg/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇦 [bs](../../../bs/docs/compression/EXTENDING_COMPRESSION.md) · 🇨🇿 [cs](../../../cs/docs/compression/EXTENDING_COMPRESSION.md) · 🇩🇰 [da](../../../da/docs/compression/EXTENDING_COMPRESSION.md) · 🇩🇪 [de](../../../de/docs/compression/EXTENDING_COMPRESSION.md) · 🇬🇷 [el](../../../el/docs/compression/EXTENDING_COMPRESSION.md) · 🇪🇸 [es](../../../es/docs/compression/EXTENDING_COMPRESSION.md) · 🇪🇪 [et](../../../et/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇷 [fa](../../../fa/docs/compression/EXTENDING_COMPRESSION.md) · 🇫🇮 [fi](../../../fi/docs/compression/EXTENDING_COMPRESSION.md) · 🇫🇷 [fr](../../../fr/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇪 [ga](../../../ga/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [gu](../../../gu/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [ha](../../../ha/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇱 [he](../../../he/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [hi](../../../hi/docs/compression/EXTENDING_COMPRESSION.md) · 🇭🇷 [hr](../../../hr/docs/compression/EXTENDING_COMPRESSION.md) · 🇭🇺 [hu](../../../hu/docs/compression/EXTENDING_COMPRESSION.md) · 🇦🇲 [hy](../../../hy/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇩 [id](../../../id/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [ig](../../../ig/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇹 [it](../../../it/docs/compression/EXTENDING_COMPRESSION.md) · 🇯🇵 [ja](../../../ja/docs/compression/EXTENDING_COMPRESSION.md) · 🇬🇪 [ka](../../../ka/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇭 [km](../../../km/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [kn](../../../kn/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇷 [ko](../../../ko/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇹 [lt](../../../lt/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇻 [lv](../../../lv/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [ml](../../../ml/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [mr](../../../mr/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇾 [ms](../../../ms/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇹 [mt](../../../mt/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇲 [my](../../../my/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇵 [ne](../../../ne/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇱 [nl](../../../nl/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇴 [no](../../../no/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [or](../../../or/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [pa](../../../pa/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇭 [phi](../../../phi/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇱 [pl](../../../pl/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇹 [pt](../../../pt/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇴 [ro](../../../ro/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇺 [ru](../../../ru/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇰 [si](../../../si/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇰 [sk](../../../sk/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇮 [sl](../../../sl/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇸 [sr](../../../sr/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇪 [sv](../../../sv/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇪 [sw](../../../sw/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [ta](../../../ta/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [te](../../../te/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇭 [th](../../../th/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇷 [tr](../../../tr/docs/compression/EXTENDING_COMPRESSION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇰 [ur](../../../ur/docs/compression/EXTENDING_COMPRESSION.md) · 🇺🇿 [uz](../../../uz/docs/compression/EXTENDING_COMPRESSION.md) · 🇻🇳 [vi](../../../vi/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [yo](../../../yo/docs/compression/EXTENDING_COMPRESSION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/EXTENDING_COMPRESSION.md)

---

> **সংক্ষেপে**: OmniRoute-এর কম্প্রেশন ইঞ্জিনটি **প্লাগযোগ্য** — আপনি কাস্টম ইঞ্জিন নিবন্ধন করতে, নতুন ভাষার জন্য ল্যাঙ্গুয়েজ প্যাক সরবরাহ করতে এবং স্তরবিন্যস্ত পাইপলাইন তৈরি করতে পারেন। এই নির্দেশিকায় তা কীভাবে করতে হয় দেখানো হয়েছে।

**সম্পর্কিত নির্দেশিকা:**

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — সম্পূর্ণ পাইপলাইনের সারসংক্ষেপ
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — ইঞ্জিন রেজিস্ট্রি এবং বিল্ট-ইন ইঞ্জিনসমূহ
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — RTK ইঞ্জিন এবং কাস্টম ফিল্টারসমূহ
- [COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md) — রুল প্যাক ফরম্যাটের রেফারেন্স

---

## সারসংক্ষেপ

কম্প্রেশন সিস্টেমটিতে **৩টি এক্সটেনশন পয়েন্ট** রয়েছে:

| এক্সটেনশন পয়েন্ট         | ব্যবহারের ক্ষেত্র                                                                       | জটিলতা   |
| ------------------------- | --------------------------------------------------------------------------------------- | -------- |
| **কাস্টম ইঞ্জিন**         | সম্পূর্ণ নতুন একটি কম্প্রেশন অ্যালগরিদম যোগ করা (যেমন, ডোমেইন-নির্দিষ্ট সারসংক্ষেপকারী) | উন্নত    |
| **ল্যাঙ্গুয়েজ প্যাক**    | নতুন কোনো প্রাকৃতিক ভাষার জন্য সমর্থন যোগ করা (যেমন, হিন্দি, আরবি)                      | মাঝারি   |
| **স্তরবিন্যস্ত পাইপলাইন** | বিদ্যমান ইঞ্জিনগুলোকে কাস্টম ক্রমে সমন্বয় করা                                          | প্রাথমিক |

```
┌─────────────────────────────────────────────────────────────┐
│                    কম্প্রেশন কৌশল                            │
│                                                              │
│   ইনপুট বার্তা ──▶ getEffectiveMode() ──▶ মোড               │
│                                              │               │
│                      ┌───────────────────────┼──────────┐    │
│                      │         │         │         │    │    │
│                      ▼         ▼         ▼         ▼    │    │
│                   "rtk"    "lite"   "standard" "stacked"    │
│                      │         │         │         │    │    │
│                      ▼         ▼         ▼         ▼    │    │
│                   RTK       Lite     Caveman   engines[]   │
│                   ইঞ্জিন    ইঞ্জিন    ইঞ্জিন    শৃঙ্খলিত    │
│                      │         │         │         │    │    │
│                      └─────────┴─────────┴─────────┘    │    │
│                                      │                    │
│                                      ▼                    │
│                             সংকুচিত আউটপুট                 │
└─────────────────────────────────────────────────────────────┘

কৌশল নির্বাচকটি মোড-ভিত্তিক: প্রতিটি অনুরোধ একটি মোড নির্বাচন করে
(rtk / lite / standard / aggressive / ultra / stacked / off)।
শুধু "stacked" মোড একাধিক ইঞ্জিনকে ক্রমানুসারে শৃঙ্খলিত করে।
ডিফল্ট স্বয়ংক্রিয়-ট্রিগার মোড হলো "lite" (৩-স্তরের অগ্রাধিকার শৃঙ্খল নয়)।
```

---

## একটি কাস্টম কম্প্রেশন ইঞ্জিন লেখা

ইঞ্জিন ইন্টারফেসটি (`open-sse/services/compression/engines/types.ts`) হলো সেই চুক্তি যা প্রতিটি ইঞ্জিনকে অবশ্যই পূরণ করতে হবে। এতে ৫টি আবশ্যিক মেথড রয়েছে।

### `CompressionEngine` ইন্টারফেস

```ts
interface CompressionEngine {
  id: string; // অনন্য ইঞ্জিন ID
  name: string; // প্রদর্শনের নাম
  description: string; // সংক্ষিপ্ত বিবরণ
  icon: string; // আইকন (ইমোজি বা URL)
  targets: CompressionEngineTarget[]; // ["messages", "tool_results", "code_blocks"]
  stackable: boolean; // স্তরবিন্যস্ত পাইপলাইনে ব্যবহার করা যাবে কি না
  stackPriority: number; // স্তরবিন্যস্ত পাইপলাইনে ক্রম (কম = আগে)
  metadata: CompressionEngineMetadata;

  apply(body, options?): CompressionResult;
  compress(body, config?): CompressionResult;
  getConfigSchema(): EngineConfigField[];
  validateConfig(config): EngineValidationResult;
}
```

### ন্যূনতম উদাহরণ: হোয়াইটস্পেস ইঞ্জিন

সবচেয়ে সহজ সম্ভাব্য ইঞ্জিন — বার্তাগুলো থেকে অতিরিক্ত হোয়াইটস্পেস সরিয়ে দেয়।

````ts
import type { CompressionEngine } from "omniroute/compression/engines/types";
import { registerCompressionEngine } from "omniroute/compression/engines/registry";

function preserveCodeBlocks(text: string): string {
  // কোড ব্লক মার্কার অনুযায়ী ভাগ করুন এবং সেগুলোর ভেতরের হোয়াইটস্পেস সংরক্ষণ করুন
  const parts = text.split(/(```[\s\S]*?```)/);
  return parts
    .map((part) => {
      if (part.startsWith("```")) {
        return part; // কোড ব্লক পরিবর্তন করবেন না
      }
      return part.replace(/\n{3,}/g, "\n\n"); // শুধু গদ্য অংশে প্রয়োগ করুন
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
  stackPriority: 100, // caveman/rtk-এর পরে চালান

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

    // মেসেজ অ্যারে পরিভ্রমণ করুন — স্ট্রিং এবং মাল্টিপার্ট কনটেন্ট উভয়ই পরিচালনা করুন
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
      // মাল্টিপার্ট কনটেন্ট: অংশগুলো পরিভ্রমণ করুন, শুধু টেক্সট অংশগুলো কমপ্রেস করুন
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
          return part; // image_url, tool_use ইত্যাদি সংরক্ষণ করুন।
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

// বিশ্বব্যাপী নিবন্ধন করুন
registerCompressionEngine(whitespaceEngine);
````

### কাস্টম ইঞ্জিন কোথায় রাখবেন

```
~/.omniroute/compression/engines/my-engine.ts    # ব্যবহারকারী-স্তরের
<project>/compression-engines/my-engine.ts        # প্রকল্প-স্তরের (স্টার্টআপের সময় লোড করা হয়)
```

অথবা কোনো প্লাগইন থেকে প্রোগ্রাম্যাটিকভাবে লোড করুন:

```ts
// আপনার প্লাগইনে
import {
  registerCompressionEngine,
  unregisterCompressionEngine,
} from "@omniroute/open-sse/services/compression/engines/registry";
import { myEngine } from "./engines/my-engine";

export default definePlugin({
  name: "my-compression-plugin",
  // প্লাগইন SDK onRequest / onResponse / onError হুক প্রকাশ করে। প্লাগইন
  // মডিউল লোড হওয়ার সময় (অথবা প্রথম onRequest-এ) ইঞ্জিন নিবন্ধন করুন; আপনার
  // নিজস্ব টিয়ারডাউন পাথ থেকে এটি অনিবন্ধিত করুন।
  onRequest: async (ctx) => {
    registerCompressionEngine(myEngine);
  },
});

// টিয়ারডাউনের সময়:
// unregisterCompressionEngine("my-engine");
```

### আপনার ইঞ্জিন পরীক্ষা করা

কোনো প্লাগইন বা স্টার্টআপ ফাংশনে আপনার ইঞ্জিন নিবন্ধন করুন। নিবন্ধিত হয়ে গেলে, ইঞ্জিনটি তার `id`-এর মাধ্যমে স্ট্র্যাটেজি সিলেক্টরে উপলভ্য হবে। একটি স্ট্যাকড পাইপলাইনে এটিকে কম্পোজ করে ইন্টিগ্রেশন পরীক্ষা করুন:

---

## ভাষা প্যাক তৈরি করা

Caveman-ধাঁচের কম্প্রেশন প্রতিটি স্বাভাবিক ভাষার ফিলার, দ্বিধাসূচক অভিব্যক্তি এবং অতিরিক্ত শব্দবহুল প্যাটার্ন পরিচালনা করতে **ভাষা-নির্দিষ্ট রুল প্যাক** ব্যবহার করে। OmniRoute-এর সঙ্গে **6টি ভাষা প্যাক** অন্তর্ভুক্ত থাকে: `en`, `es`, `fr`, `de`, `ja`, `pt-BR`।

### প্যাকের কাঠামো

একটি ভাষা প্যাক হলো `open-sse/services/compression/rules/<language>/`-এর অধীনে থাকা **JSON ফাইলগুলোর** একটি ডিরেক্টরি:

```
open-sse/services/compression/rules/
├── en/
│   ├── filler.json          # সৌজন্যমূলক অভিব্যক্তি, দ্বিধাসূচক ভাষা, ভদ্রতা
│   ├── context.json         # প্রসঙ্গ হ্রাসকারী নিয়ম
│   ├── dedup.json           # ডিডুপ্লিকেশন নিয়ম
│   ├── structural.json      # যতিচিহ্ন, ফরম্যাটিং
│   └── ultra.json           # আক্রমণাত্মক কম্প্রেশন নিয়ম
├── es/  (একই কাঠামো)
├── fr/  (একই কাঠামো)
├── de/  (একই কাঠামো)
├── ja/  (একই কাঠামো)
└── pt-BR/ (একই কাঠামো)
```

### নিয়মের গঠন

প্রতিটি নিয়মের গঠন এমন (`open-sse/services/compression/ruleLoader.ts` থেকে):

```ts
interface FileRule {
  name: string; // মানুষের পাঠযোগ্য নাম (kebab-case)
  pattern: string; // JavaScript regex প্যাটার্ন
  replacement?: string; // মিলে যাওয়া অংশটি যা দিয়ে প্রতিস্থাপন করা হবে
  replacementMap?: Record<string, string>; // অথবা একটি key→replacement ম্যাপ
  flags?: string; // Regex ফ্ল্যাগ (সাধারণত "gi")
  context?: "all" | "user" | "system" | "assistant";
  category?: "filler" | "context" | "structural" | "dedup" | "terse" | "ultra";
  minIntensity?: "lite" | "full" | "ultra"; // এই তীব্রতার নিচে হলে এড়িয়ে যান
  description?: string; // ডকুমেন্টেশন
}
```

### উদাহরণ: হিন্দি ফিলার নিয়ম যোগ করা

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

### যাচাইকরণ

লোডের সময় রুল প্যাকগুলো `_schema.json` অনুযায়ী যাচাই করা হয়। ত্রুটিপূর্ণ কাঠামোর কোনো প্যাক লোড হতে ব্যর্থ হবে এবং একটি ত্রুটি লগ করবে:

```
RULE_LOADER: pack "hi/filler.json" failed validation:
  - rules.0.pattern: Invalid regex
  - rules.1.context: must be one of [all, user, system, assistant]
```

কোনো প্যাক লোড করা হলে (`_schema.json` অনুযায়ী) যাচাইকরণ স্বয়ংক্রিয়ভাবে চলে; একটি
অবৈধ প্যাক প্রত্যাখ্যান করা হয় এবং ওপরের ত্রুটিটি লগ করা হয়। প্যাক যাচাইয়ের জন্য আলাদা কোনো
`npm run` স্ক্রিপ্ট নেই — প্যাকটি লোড করুন (যেমন সার্ভার চালু করুন অথবা
কম্প্রেশন পাথটি ব্যবহার করুন) এবং লগগুলো পর্যবেক্ষণ করুন।

### একটি কাস্টম ভাষা প্যাক লোড করা

```ts
import { loadRulePack } from "omniroute/compression/ruleLoader";

await loadRulePack("./my-custom-rules/hi/filler.json");
```

অথবা কোনো স্বীকৃত লোকেশনে রাখুন:

```
~/.omniroute/compression/rules/hi/filler.json  # ব্যবহারকারী-স্তরের
<project>/.compression/rules/hi/filler.json   # প্রজেক্ট-স্তরের
```

### ভাষা প্যাকের সর্বোত্তম অনুশীলন

1. **`filler` দিয়ে শুরু করুন** — এগুলো সবচেয়ে বেশি প্রভাব ফেলা নিয়ম
2. **আক্রমণাত্মক নিয়ম সীমাবদ্ধ করতে `minIntensity` ব্যবহার করুন** — এটি অতিরিক্ত কম্প্রেশন থেকে সুরক্ষা দেয়
3. **টেস্ট কেস অন্তর্ভুক্ত করুন** — আচরণ যাচাই করতে JSON-এ `tests[]` অ্যারে যোগ করুন
4. **ক্রম গুরুত্বপূর্ণ** — আগের নিয়মগুলো প্রথমে প্রয়োগ হয়; বেশি প্রভাব ফেলা নিয়মগুলো প্রথমে রাখুন
5. **`replacement` ব্যবহারে সংযত থাকুন** — সাধারণত খালি স্ট্রিংই সঠিক; কখনো নতুন কনটেন্ট যোগ করবেন না

### অনুবাদ কৌশল

রুল প্যাকগুলোকে একটি নতুন ভাষার জন্য স্থানীয়করণ করার সময়:

1. **নিয়মের নামগুলো অনুবাদ করুন** — এগুলো ডিবাগ আউটপুটে প্রদর্শিত হয়
2. **regex প্যাটার্নগুলো মানিয়ে নিন** — সরাসরি অনুবাদ প্রায়ই কাজ করে না (শব্দের সীমানা ভিন্ন হয়)
3. **বাস্তব কথোপকথনের ওপর পরীক্ষা করুন** — প্রকৃত ইনপুটে প্যাকটির ব্যবহার নিরাপদ হওয়া উচিত
4. **সাংস্কৃতিক রীতির সঙ্গে সামঞ্জস্য রাখুন** — উদাহরণস্বরূপ, ইংরেজির তুলনায় জাপানি প্যাকে বেশি সম্মানসূচক ফিলার থাকে

---

## স্ট্যাকড পাইপলাইন

একটি **স্ট্যাকড পাইপলাইন** একাধিক ইঞ্জিনকে ধারাবাহিকভাবে চালায়, যেখানে প্রতিটি ইঞ্জিনের আউটপুট পরবর্তী ইঞ্জিনের ইনপুট হিসেবে ব্যবহৃত হয়। অভ্যন্তরীণভাবে `mode: stacked` এভাবেই কাজ করে।

### স্ট্যাকিং যেভাবে কাজ করে

```
ইনপুট (10,000 টোকেন)
        │
        ▼
   ┌──────────┐
   │  ইঞ্জিন  │  অগ্রাধিকার 10
   │  A       │  ──▶ আউটপুট: 6,000 টোকেন (-40%)
   └────┬─────┘
        ▼
   ┌──────────┐
   │  ইঞ্জিন  │  অগ্রাধিকার 50
   │  B       │  ──▶ আউটপুট: 2,400 টোকেন (-60%)
   └────┬─────┘
        ▼
   ┌──────────┐
   │  ইঞ্জিন  │  অগ্রাধিকার 100
   │  C       │  ──▶ আউটপুট: 1,200 টোকেন (-80%)
   └────┬─────┘
        │
        ▼
চূড়ান্ত আউটপুট (1,200 টোকেন, সম্মিলিতভাবে ~88% সাশ্রয়)
```

`mode: "stacked"` নির্বাচন করা হলে, `pipeline` অ্যারেতে নির্দিষ্ট ক্রমে ইঞ্জিনগুলো ধারাবাহিকভাবে নির্বাহ হয়।
ইঞ্জিন N-এর আউটপুট ইঞ্জিন N+1-এর ইনপুটে পরিণত হয়।

### কম্প্রেশন মোড

কনফিগারেশন, স্বয়ংক্রিয়-ট্রিগার থ্রেশহোল্ড এবং কম্বো ওভাররাইডের ভিত্তিতে OmniRoute **প্রতিটি অনুরোধের জন্য একটি মোড** নির্বাচন করে।
উপলভ্য মোডগুলো `open-sse/services/compression/types.ts`-এ (টাইপ `CompressionMode`) সংজ্ঞায়িত:

| মোড          | ইঞ্জিনসমূহ           | ব্যবহারের ক্ষেত্র                                                                                                                                                                                 |
| ------------ | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `off`        | কোনোটি নয়           | সব কম্প্রেশন নিষ্ক্রিয় করে                                                                                                                                                                       |
| `rtk`        | শুধু RTK             | কমান্ড-আউটপুট-নির্ভর সেশন (80%+ সাশ্রয়)                                                                                                                                                          |
| `lite`       | শুধু Lite            | সংযত কম্প্রেশন (দ্রুত, নিরাপদ)                                                                                                                                                                    |
| `standard`   | Caveman              | ভাষা প্যাকসহ গদ্য কম্প্রেশন                                                                                                                                                                       |
| `aggressive` | Caveman + Aggressive | আক্রমণাত্মক গদ্য কম্প্রেশন + আক্রমণাত্মক চূড়ান্ত পাস                                                                                                                                             |
| `ultra`      | Ultra                | সর্বোচ্চ কম্প্রেশন (ক্ষতিসাধনকারী, শেষ অবলম্বন)। `ultra.modelPath` সেট করা থাকলে ঐচ্ছিকভাবে **LLMLingua-2** SLM ইঞ্জিনের মাধ্যমে রাউট করা হয় (মডেলটি অনুপলভ্য হলে নিয়মভিত্তিক পথে ফল-ওপেন করে)। |
| `stacked`    | কাস্টম পাইপলাইন      | যেকোনো ক্রমে ইঞ্জিনগুলো সমন্বয় করে (নিচে দেখুন)                                                                                                                                                  |

> উপরের মোড ইঞ্জিনগুলোর পাশাপাশি, রেজিস্ট্রিতে বিশেষায়িত স্ট্যাকযোগ্য ইঞ্জিনও অন্তর্ভুক্ত রয়েছে —
> **CCR**, **headroom**, **ionizer**, এবং **session-dedup** — যেগুলো
> [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md#additional-built-in-engines)-এ নথিভুক্ত।

মোড নির্বাচন `open-sse/services/compression/strategySelector.ts`-এর `getEffectiveMode()` দ্বারা নির্ধারিত হয়:

1. কম্প্রেশন নিষ্ক্রিয় থাকলে: `"off"`
2. কোনো কম্বো ওভাররাইড থাকলে: ওভাররাইডটি ব্যবহার করুন
3. স্বয়ংক্রিয়-ট্রিগার থ্রেশহোল্ড অতিক্রম করলে: `autoTriggerMode` ব্যবহার করুন (ডিফল্ট: `"lite"`)
4. অন্যথায়: `defaultMode` ব্যবহার করুন

### ডিফল্ট স্ট্যাকড পাইপলাইন

`mode: "stacked"` স্পষ্টভাবে কনফিগার করা হলে, ডিফল্ট পাইপলাইন এগুলোকে সমন্বয় করে:

1. **RTK** — কমান্ড আউটপুটের অপ্রয়োজনীয় অংশ বাদ দেয় (টার্মিনাল আউটপুটে ~80% সাশ্রয়)
2. **Caveman** — অপ্রয়োজনীয় শব্দ বাদ দেয়, গদ্যকে সংক্ষিপ্ত করে (অবশিষ্ট টেক্সটে ~46%)
3. **Lite** — চূড়ান্ত হোয়াইটস্পেস + ডিডুপ পাস

এই সমন্বয় টুল-নির্ভর সেশনে **78-95% সাশ্রয়** অর্জন করে।

### স্ট্যাকড পাইপলাইন কনফিগার করা

কম্বো কনফিগে:

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

আপনি ইঞ্জিন বাদ দিতে, কাস্টম ইঞ্জিন যোগ করতে অথবা সেগুলোর ক্রম পরিবর্তন করতে পারেন।

### স্টেট পাসিং

ইঞ্জিনগুলো অনুরোধের কনটেক্সট (`options`-এ) থেকে মেটাডেটা পড়তে পারে:

```ts
compress(body, config) {
  // পূর্ববর্তী ইঞ্জিনগুলো থেকে মেটাডেটা পড়ুন
  const original = options?.compressionComboId;  // "my-coding-combo"
  // ...
}
```

মেটাডেটা **শুধু-পঠনযোগ্য** — ইঞ্জিনগুলো অনুরোধের কনটেক্সট পরিবর্তন করতে পারে না, কেবল তাদের নিজস্ব বডি আউটপুট পরিবর্তন করতে পারে।

### নির্বাহের ক্রমসংক্রান্ত সতর্কতা

| ইঞ্জিনের ক্রম                                | প্রভাব                                                                                        |
| -------------------------------------------- | --------------------------------------------------------------------------------------------- |
| RTK → Caveman → Lite                         | **প্রস্তাবিত** (প্রথমে অপ্রয়োজনীয় অংশ, এরপর ভাষা, তারপর হোয়াইটস্পেস বাদ দেয়)              |
| Lite → RTK → Caveman                         | খারাপ — Lite কাঁচা আউটপুট থেকে হোয়াইটস্পেস বাদ দেয়, ফলে RTK-এর প্যাটার্ন ম্যাচিং ব্যর্থ হয় |
| Caveman → RTK                                | খারাপ — Caveman এমনভাবে টেক্সট পুনর্লিখতে পারে যা RTK শনাক্ত করতে পারে না                     |
| শুরুতে `tool_results` রয়েছে এমন যেকোনো ক্রম | আরও ভালো — টুল আউটপুটেই সবচেয়ে বেশি অপ্রয়োজনীয় কনটেন্ট থাকে                                |

### কখন স্ট্যাক করবেন না

স্ট্যাকিং সব সময় ভালো নয়:

- **সরল বার্তা** (কোনো টুল আউটপুট নেই) — শুধু Caveman বা Lite-ই যথেষ্ট
- **খরচ-সংবেদনশীল ক্ষেত্রে** — প্রতিটি ইঞ্জিন ~5-50ms ল্যাটেন্সি যোগ করে
- **নির্দিষ্ট টুলের ক্ষেত্রে** — শেল আউটপুটের জন্য সাধারণত শুধু RTK-ই যথেষ্ট

### একটি কাস্টম পাইপলাইন তৈরি করা

কোনো named-pipeline registry নেই। একটি stacked pipeline হলো কেবল `applyStackedCompression()`-এ পাঠানো **ধাপগুলোর একটি inline array** (`@omniroute/open-sse/services/compression/strategySelector` থেকে export করা):

```ts
import { applyStackedCompression } from "@omniroute/open-sse/services/compression/strategySelector";

const result = applyStackedCompression(body, [
  { engine: "rtk", intensity: "aggressive" },
  { engine: "caveman", intensity: "full" },
]);
```

আপনি কোনো pipeline না দিলে, এটি ডিফল্ট হিসেবে `rtk(standard) → caveman(full)` ব্যবহার করে।

config থেকে এটি নিয়ন্ত্রণ করতে, `mode: "stacked"` সেট করুন এবং `stackedPipeline`-এর অধীনে ধাপগুলোর array দিন (`config.stackedPipeline` থেকে পড়া হয়):

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

## আপস্ট্রিম সিঙ্ক নীতি

OmniRoute-এর কম্প্রেশন ইঞ্জিনগুলো README-তে একাধিক আপস্ট্রিম প্রকল্পকে কৃতিত্ব দেয়
("RTK, Caveman, LLMLingua-2, Troglodita দ্বারা অনুপ্রাণিত")। অবদানকারীদের একটি সাধারণ
প্রশ্ন হলো: **আপস্ট্রিম RTK যখন নতুন কোনো টুল ফিল্টার যোগ করে বা Caveman কোনো রুল
প্যাক যোগ করে, তখন সেটি কীভাবে OmniRoute-এ পৌঁছায়?** এই বিভাগটিই এর প্রামাণ্য উত্তর।

### ভেন্ডর করা কপি বনাম স্বতন্ত্র বাস্তবায়ন

| ইঞ্জিন                       | আপস্ট্রিমের সঙ্গে সম্পর্ক                                                                                                             | অবস্থান                                                             |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| **RTK**                      | **স্বতন্ত্র পুনর্বাস্তবায়ন** (অনুপ্রাণিত, কপি নয়)                                                                                   | `open-sse/services/compression/engines/rtk/`                        |
| **Caveman**                  | **স্বতন্ত্র পুনর্বাস্তবায়ন** (অনুপ্রাণিত)                                                                                            | `open-sse/services/compression/engines/cavemanAdapter.ts`           |
| **Headroom**                 | অধিকাংশই অভ্যন্তরীণ; কেবল `gcf/` কোডেকটি `gcf-typescript` থেকে **প্রকৃত অর্থে ভেন্ডর করা** (MIT, SPDX-চিহ্নিত, শুধু জেনেরিক প্রোফাইল) | `open-sse/services/compression/engines/headroom/gcf/`               |
| **LLMLingua-2 / Troglodita** | অনুপ্রাণিত (`llmlingua` + `session-dedup` ইঞ্জিনগুলোকে চালিত করে)                                                                     | `open-sse/services/compression/engines/llmlingua/`, `session-dedup` |

মূল বিষয়: **RTK এবং Caveman হলো _ধারণাগুলোর_ (ফিল্টার রুল, রুল প্যাক)
ক্লিন-রুম TypeScript বাস্তবায়ন, ভেন্ডর করা সোর্স ট্রি নয়।** `git pull` করার মতো
কোনো আপস্ট্রিম কপি নেই—আর ঠিক এ কারণেই README-তে "bundled"-এর পরিবর্তে
"inspired by" বলা হয়েছে।

### আপস্ট্রিম উন্নতিগুলো যেভাবে মার্জ করা হয়

নকশাগতভাবেই **কোনো স্বয়ংক্রিয় আপস্ট্রিম-রিলিজ ট্র্যাকিং এবং কোনো `compression-sync`
লেবেল নেই**। যেহেতু ইঞ্জিনগুলো পুনর্বাস্তবায়ন, তাই আপস্ট্রিম RTK ফিল্টার বা Caveman
রুল প্যাক কোড হিসেবে মার্জ করা হয় না; বরং সেটিকে **OmniRoute-এর নিজস্ব ফরম্যাটে নতুন
রুল/ফিল্টার হিসেবে পুনঃপ্রকাশ করা হয়** (দেখুন
[COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md)) এবং একটি স্বাভাবিক PR-এর
মাধ্যমে প্রয়োজনমাফিক যুক্ত করা হয়। উপরের এক্সটেনশন পয়েন্টগুলো (কাস্টম ইঞ্জিন, ভাষা প্যাক, RTK ফিল্টার)
এ ধরনের অবদান রাখার অনুমোদিত উপায়।

ঠিক এই প্রবাহের সাম্প্রতিক উদাহরণ:

- Gradle ও `dotnet` বিল্ড আউটপুটের জন্য RTK ফিল্টার (v3.8.42)
- kubectl / docker-build / composer / gh-এর জন্য RTK ফিল্টার (#2824)
- Caveman ইন্দোনেশীয় ভাষা প্যাক (#3975), পাশাপাশি জার্মান / ফরাসি / জাপানি / চীনা প্যাক

### Headroom (ইনপুট-কম্প্রেশন প্রক্সি)

Headroom **সম্পূর্ণভাবে অভ্যন্তরীণ**—একটি পিন করা, ভেন্ডর করা `gcf` কোডেক স্ন্যাপশটের
সঙ্গে OmniRoute-এর নিজস্ব `smartcrusher` / `toon` / `tabular` স্তর। ভেন্ডর করা কপিটির
বাইরে ট্র্যাক করার মতো কোনো সক্রিয় আপস্ট্রিম নেই; কোডেক পরিবর্তিত হলে `gcf`-এর আপডেট
ম্যানুয়ালি রিফ্রেশ করা হয় এবং কম্প্রেশন বাজেট গেটের (`check:compression-budget`)
বিপরীতে পুনরায় যাচাই করা হয়।

### আপস্ট্রিম-অনুপ্রাণিত উন্নতির প্রস্তাব দেওয়া

1. **ভেন্ডর করবেন না**—আপস্ট্রিম রুল/ফিল্টারটিকে OmniRoute-এর ফরম্যাটে পুনঃপ্রকাশ করুন।
2. নিচের উপযুক্ত এক্সটেনশন পয়েন্টের মাধ্যমে এটি যোগ করুন (ভাষা প্যাক, RTK ফিল্টার, অথবা
   কাস্টম ইঞ্জিন)।
3. PR-এর বিবরণে আপস্ট্রিম প্রকল্পটির উল্লেখ করুন (কৃতিত্ব হিসেবে), লাইসেন্স-সংবলিত
   সোর্স কপি করে নয়।
4. টেস্ট অন্তর্ভুক্ত করুন এবং নিশ্চিত করুন যে `check:compression-budget` গেটটি এখনও পাস করে।

---

## একটি আউটপুট স্টাইল যোগ করা

আউটপুট স্টাইলগুলো (দেখুন [গাইডের ক্যাটালগ টেবিল](./COMPRESSION_GUIDE.md#output-styles-catalog))
ইনপুট ইঞ্জিনগুলোর প্রতিক্রিয়া-পক্ষীয় সমতুল্য: আপনি যা পাঠান তা সংকুচিত করার পরিবর্তে,
এগুলো মডেলকে কম ব্যয়বহুল আউটপুট তৈরি করতে নির্দেশ দেয়। রেজিস্ট্রিটি হলো
`open-sse/services/compression/outputStyles/catalog.ts`-এর `OUTPUT_STYLE_CATALOG`, এবং
**একটি ক্যাটালগ এন্ট্রিই সম্পূর্ণ ফিচার**: ইনজেক্টর, ড্যাশবোর্ড সেটিংস প্যানেল,
পারসিস্টেন্স এবং টেলিমেট্রি—সবই ক্যাটালগটি অনুসরণ করে; হালনাগাদ করার মতো অন্য কোনো তালিকা নেই।

1. **`OUTPUT_STYLE_CATALOG`-এ একটি এন্ট্রি যোগ করুন**, যেখানে থাকবে `id`, `label`, `description` এবং
   তিনটি ইংরেজি `levels` (`lite`, `full`, `ultra`)। প্রতিটি লেভেল অবশ্যই
   `${SHARED_BOUNDARIES}` দিয়ে শেষ হতে হবে, যাতে কোড, পাথ, কমান্ড, এরর এবং URL হুবহু অপরিবর্তিত থাকে।
   প্রতিটি `(id, level, language)`-এর জন্য নির্দেশনার টেক্সট অবশ্যই **স্থির ও নির্ধারিত** হতে হবে—
   কেবল `${SHARED_BOUNDARIES}` ইন্টারপোলেশনই অনুমোদিত।
2. **এটি অনুবাদ করুন।** `i18n`-এর অধীনে অন্তত একটি `pt-BR` ব্লক দিন; `ponytail` এবং
   `i-have-adhd` (en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi) হলো রেফারেন্স কাঠামো। ইচ্ছাকৃতভাবে
   এক-ভাষার কোনো স্টাইলের ক্ষেত্রে এর পরিবর্তে `locale` সেট করা হয় (যেমন `terse-cjk` → `zh`) এবং তখন
   সেটি কেবল ওই লোকেলের অধীনেই দেওয়া হয়।
3. **ম্যাট্রিক্স গার্ড হালনাগাদ করুন**—স্টাইলটির ভাষাগুলো
   `tests/unit/compression/output-styles-i18n-matrix.test.ts`-এর `BASELINE_LANGUAGES`-এ যোগ করুন। কোনো নতুন
   locale-gated নয় এমন স্টাইলে প্রয়োজনীয় অনুবাদ না থাকলে গেট ব্যর্থ হবে, যদি না সেটিতে
   একটি ট্র্যাকিং ইস্যুসহ সুস্পষ্ট `KNOWN_ENGLISH_ONLY` এন্ট্রি থাকে।
4. **প্রতিটি স্টাইলের জন্য একটি টেস্ট যোগ করুন**, যার মডেল হবে
   `tests/unit/compression/i-have-adhd-catalog.test.ts`: ক্যাটালগের কাঠামো, প্রতিটি লেভেলের
   boundaries ক্লজ এবং প্রতিটি অনুবাদ যে ইংরেজি থেকে অনুলিপি না করে নিজস্ব ভাষায় লেখা হয়েছে তা যাচাইকারী একটি অ্যাঙ্কর।
5. **অ্যাট্রিবিউশন**: স্টাইলটি কোনো upstream প্রজেক্ট থেকে অভিযোজিত হলে, এন্ট্রিটির একটি
   source comment-এ সেটিকে কৃতিত্ব দিন (যেমন `i-have-adhd` → ayghri/i-have-adhd, MIT)—উপরের
   "একটি upstream-অনুপ্রাণিত উন্নতির প্রস্তাব করা" অংশের মতো একই নিয়ম প্রযোজ্য।

কোনো UI, schema বা telemetry পরিবর্তনের প্রয়োজন নেই—এই অংশগুলো ক্যাটালগ থেকেই রেন্ডার হয়।

---

## সর্বোত্তম অনুশীলন

### ইঞ্জিন ডেভেলপমেন্ট

1. **সর্বদা `validateConfig` বাস্তবায়ন করুন**—ভ্যালিডেশনবিহীন ইঞ্জিন নীরব ব্যর্থতা ঘটায়
2. **বাস্তবসম্মত `targetLatencyMs` সেট করুন**—ইঞ্জিন বেছে নিতে strategy selector এটি ব্যবহার করে
3. **ড্যাশবোর্ডের জন্য `getConfigSchema` ব্যবহার করুন**—ব্যবহারকারীদের কাছ থেকে কখনোই কনফিগ লুকাবেন না
4. **আপনার ইঞ্জিন pure হলে `stackable: true` সমর্থন করুন**—side effect-সহ ইঞ্জিনগুলো stack করা উচিত নয়
5. **ইনলাইন টেস্ট লিখুন**—ইঞ্জিনগুলো <1s সময়ের মধ্যে যাচাইযোগ্য হওয়া উচিত

### ল্যাঙ্গুয়েজ প্যাক ডেভেলপমেন্ট

1. **`lite` intensity দিয়ে শুরু করুন**—সর্বনিম্ন সেটিংয়েও আপনার নিয়মগুলো নিরাপদ হওয়া উচিত
2. **নিয়মের পরিধি নির্ধারণে `context` ব্যবহার করুন**—শুধু `user`-এর জন্য প্রযোজ্য নিয়মগুলো ভুলবশত system prompt-কে প্রভাবিত করতে পারে না
3. **JSON key ক্যাপচার করা এড়িয়ে চলুন**—`\\bword\\b` JSON-এর ভেতরে মিলে গিয়ে structured data ভেঙে দিতে পারে
4. **edge case দিয়ে টেস্ট করুন**—খালি ইনপুট, unicode, RTL টেক্সট, emoji
5. **বিদ্যমান প্যাকগুলোকে টেমপ্লেট হিসেবে ব্যবহার করুন**—`en/filler.json` হলো সবচেয়ে উন্নত উদাহরণ

### পাইপলাইন ডিজাইন

1. **অপ্টিমাইজ করার আগে প্রোফাইল করুন**—প্রথমে `compression_stats` দিয়ে পরিমাপ করুন
2. **পুনরায় বাস্তবায়নের পরিবর্তে কম্পোজিশনকে অগ্রাধিকার দিন**—নতুন ইঞ্জিন লেখার আগে Caveman-এর নিয়মগুলো সম্প্রসারিত করুন
3. **ক্রমের যৌক্তিকতা নথিভুক্ত করুন**—কেন ইঞ্জিন A ইঞ্জিন B-এর আগে, তা comment-এ লিখুন
4. **৩টি intensity level-এর সবগুলোতেই টেস্ট করুন**—`lite` দ্রুত কিন্তু lossy, `ultra` ধীর কিন্তু নির্ভুল

---

## রেফারেন্স: বিল্ট-ইন ইঞ্জিনসমূহ

| ইঞ্জিন ID            | স্ট্যাকযোগ্য | ডিফল্ট stackPriority | লক্ষ্যসমূহ                    |
| -------------------- | ------------ | -------------------- | ----------------------------- |
| `lite`               | হ্যাঁ        | 5                    | বার্তা, টুলের ফলাফল           |
| `rtk`                | হ্যাঁ        | 10                   | টুলের ফলাফল                   |
| `standard` (caveman) | হ্যাঁ        | 20                   | বার্তা, টুলের ফলাফল, কোড ব্লক |
| `aggressive`         | হ্যাঁ        | 30                   | বার্তা                        |
| `ultra`              | হ্যাঁ        | 40                   | বার্তা, কোড ব্লক              |

### আরও দেখুন

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — পাইপলাইনের সংক্ষিপ্ত বিবরণ
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — ইঞ্জিন রেজিস্ট্রির রেফারেন্স
- [COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md) — নিয়মের ফরম্যাট স্পেসিফিকেশন
- [COMPRESSION_LANGUAGE_PACKS.md](./COMPRESSION_LANGUAGE_PACKS.md) — ল্যাঙ্গুয়েজ প্যাকের বিস্তারিত
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — RTK ইঞ্জিন এবং কাস্টম ফিল্টার
- উৎস: `open-sse/services/compression/` (117টি ফাইল, ~250KB)
