# Extending the Compression Pipeline (မြန်မာ)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/EXTENDING_COMPRESSION.md) · 🇪🇹 [am](../../../am/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇦 [ar](../../../ar/docs/compression/EXTENDING_COMPRESSION.md) · 🇦🇿 [az](../../../az/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇬 [bg](../../../bg/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇩 [bn](../../../bn/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇦 [bs](../../../bs/docs/compression/EXTENDING_COMPRESSION.md) · 🇨🇿 [cs](../../../cs/docs/compression/EXTENDING_COMPRESSION.md) · 🇩🇰 [da](../../../da/docs/compression/EXTENDING_COMPRESSION.md) · 🇩🇪 [de](../../../de/docs/compression/EXTENDING_COMPRESSION.md) · 🇬🇷 [el](../../../el/docs/compression/EXTENDING_COMPRESSION.md) · 🇪🇸 [es](../../../es/docs/compression/EXTENDING_COMPRESSION.md) · 🇪🇪 [et](../../../et/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇷 [fa](../../../fa/docs/compression/EXTENDING_COMPRESSION.md) · 🇫🇮 [fi](../../../fi/docs/compression/EXTENDING_COMPRESSION.md) · 🇫🇷 [fr](../../../fr/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇪 [ga](../../../ga/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [gu](../../../gu/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [ha](../../../ha/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇱 [he](../../../he/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [hi](../../../hi/docs/compression/EXTENDING_COMPRESSION.md) · 🇭🇷 [hr](../../../hr/docs/compression/EXTENDING_COMPRESSION.md) · 🇭🇺 [hu](../../../hu/docs/compression/EXTENDING_COMPRESSION.md) · 🇦🇲 [hy](../../../hy/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇩 [id](../../../id/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [ig](../../../ig/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇹 [it](../../../it/docs/compression/EXTENDING_COMPRESSION.md) · 🇯🇵 [ja](../../../ja/docs/compression/EXTENDING_COMPRESSION.md) · 🇬🇪 [ka](../../../ka/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇭 [km](../../../km/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [kn](../../../kn/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇷 [ko](../../../ko/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇹 [lt](../../../lt/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇻 [lv](../../../lv/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [ml](../../../ml/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [mr](../../../mr/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇾 [ms](../../../ms/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇹 [mt](../../../mt/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇵 [ne](../../../ne/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇱 [nl](../../../nl/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇴 [no](../../../no/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [or](../../../or/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [pa](../../../pa/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇭 [phi](../../../phi/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇱 [pl](../../../pl/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇹 [pt](../../../pt/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇴 [ro](../../../ro/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇺 [ru](../../../ru/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇰 [si](../../../si/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇰 [sk](../../../sk/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇮 [sl](../../../sl/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇸 [sr](../../../sr/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇪 [sv](../../../sv/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇪 [sw](../../../sw/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [ta](../../../ta/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [te](../../../te/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇭 [th](../../../th/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇷 [tr](../../../tr/docs/compression/EXTENDING_COMPRESSION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇰 [ur](../../../ur/docs/compression/EXTENDING_COMPRESSION.md) · 🇺🇿 [uz](../../../uz/docs/compression/EXTENDING_COMPRESSION.md) · 🇻🇳 [vi](../../../vi/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [yo](../../../yo/docs/compression/EXTENDING_COMPRESSION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/EXTENDING_COMPRESSION.md)

---

> **TL;DR**: OmniRoute ၏ ချုံ့ခြင်းအင်ဂျင်သည် **ပလပ်အင်အဖြစ် ထည့်သွင်းအသုံးပြုနိုင်သည်** — စိတ်ကြိုက်အင်ဂျင်များကို မှတ်ပုံတင်နိုင်သည်၊ ဘာသာစကားအသစ်များအတွက် language pack များ ထည့်သွင်းဖြန့်ချိနိုင်သည်၊ ထို့ပြင် အဆင့်ဆင့်ဆက်ထားသော pipeline များကို ပေါင်းစပ်ဖွဲ့စည်းနိုင်သည်။ ဤလမ်းညွှန်တွင် ပြုလုပ်ပုံကို ဖော်ပြထားသည်။

**ဆက်စပ်လမ်းညွှန်များ:**

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — Pipeline တစ်ခုလုံး၏ ခြုံငုံသုံးသပ်ချက်
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — အင်ဂျင် registry နှင့် အသင့်ပါရှိသော အင်ဂျင်များ
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — RTK အင်ဂျင်နှင့် စိတ်ကြိုက် filter များ
- [COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md) — Rule pack ဖော်မတ် အကိုးအကား

---

## ခြုံငုံသုံးသပ်ချက်

ချုံ့ခြင်းစနစ်တွင် **တိုးချဲ့နိုင်သည့် နေရာ 3 ခု** ရှိသည်:

| တိုးချဲ့နိုင်သည့်နေရာ           | အသုံးပြုသည့်အခြေအနေ                                                                              | အခက်အခဲ    |
| ------------------------------- | ------------------------------------------------------------------------------------------------ | ---------- |
| **စိတ်ကြိုက်အင်ဂျင်**           | အသစ်စက်စက် ချုံ့ခြင်း algorithm တစ်ခု ထည့်ရန် (ဥပမာ၊ သီးခြားနယ်ပယ်အလိုက် အကျဉ်းချုပ်ပေးသည့်စနစ်) | အဆင့်မြင့် |
| **ဘာသာစကား pack**               | သဘာဝဘာသာစကားအသစ်တစ်ခုကို ပံ့ပိုးရန် (ဥပမာ၊ ဟိန္ဒီ၊ အာရဗီ)                                        | အလယ်အလတ်   |
| **အဆင့်ဆင့်ဆက်ထားသော pipeline** | ရှိပြီးသားအင်ဂျင်များကို စိတ်ကြိုက်အစီအစဉ်ဖြင့် ပေါင်းစပ်ရန်                                     | အခြေခံ     |

```
┌─────────────────────────────────────────────────────────────┐
│                    ချုံ့ခြင်း မဟာဗျူဟာ                      │
│                                                              │
│   ထည့်သွင်းစာများ ──▶ getEffectiveMode() ──▶ mode            │
│                                              │               │
│                      ┌───────────────────────┼──────────┐    │
│                      │         │         │         │    │    │
│                      ▼         ▼         ▼         ▼    │    │
│                   "rtk"    "lite"   "standard" "stacked"    │
│                      │         │         │         │    │    │
│                      ▼         ▼         ▼         ▼    │    │
│                   RTK       Lite     Caveman   engines[]   │
│                   အင်ဂျင်    အင်ဂျင်   အင်ဂျင်    အဆင့်ဆင့်ဆက် │
│                      │         │         │         │    │    │
│                      └─────────┴─────────┴─────────┘    │    │
│                                      │                    │
│                                      ▼                    │
│                             ချုံ့ထားသော အထွက်ရလဒ်          │
└─────────────────────────────────────────────────────────────┘

မဟာဗျူဟာရွေးချယ်မှုသည် MODE အပေါ် အခြေခံသည်: request တစ်ခုစီက mode တစ်ခုတည်းကို ရွေးချယ်သည်
(rtk / lite / standard / aggressive / ultra / stacked / off)။
"stacked" mode တစ်ခုတည်းသာ အင်ဂျင်များစွာကို အစဉ်လိုက် ဆက်သွယ်အသုံးပြုသည်။
မူလ auto-trigger mode သည် "lite" ဖြစ်သည် (အဆင့် 3 ဆင့်ရှိ ဦးစားပေးကွင်းဆက် မဟုတ်ပါ)။
```

---

## စိတ်ကြိုက်ချုံ့ခြင်းအင်ဂျင်တစ်ခု ရေးသားခြင်း

အင်ဂျင် interface (`open-sse/services/compression/engines/types.ts`) သည် အင်ဂျင်တိုင်း လိုက်နာရမည့် သဘောတူညီချက်ဖြစ်သည်။ ၎င်းတွင် မဖြစ်မနေလိုအပ်သော method 5 ခု ရှိသည်။

### `CompressionEngine` Interface

```ts
interface CompressionEngine {
  id: string; // ပြိုင်ဘက်ကင်းသော အင်ဂျင် ID
  name: string; // ပြသမည့်အမည်
  description: string; // အကျဉ်းချုပ်ဖော်ပြချက်
  icon: string; // အိုင်ကွန် (emoji သို့မဟုတ် URL)
  targets: CompressionEngineTarget[]; // ["messages", "tool_results", "code_blocks"]
  stackable: boolean; // အဆင့်ဆင့်ဆက်ထားသော pipeline တွင် အသုံးပြုနိုင်ခြင်း ရှိ၊ မရှိ
  stackPriority: number; // အဆင့်ဆင့်ဆက်ထားသော pipeline များအတွင်း အစီအစဉ် (တန်ဖိုးနည်းလေ ပိုစောလေ)
  metadata: CompressionEngineMetadata;

  apply(body, options?): CompressionResult;
  compress(body, config?): CompressionResult;
  getConfigSchema(): EngineConfigField[];
  validateConfig(config): EngineValidationResult;
}
```

### အနည်းဆုံးဥပမာ: Whitespace အင်ဂျင်

ဖြစ်နိုင်သမျှ အရိုးရှင်းဆုံးအင်ဂျင် — စာများအတွင်းရှိ မလိုအပ်သော whitespace များကို ဖယ်ရှားသည်။

````ts
import type { CompressionEngine } from "omniroute/compression/engines/types";
import { registerCompressionEngine } from "omniroute/compression/engines/registry";

function preserveCodeBlocks(text: string): string {
  // ကုဒ်ဘလောက် အမှတ်အသားများဖြင့် ခွဲပြီး ၎င်းတို့အတွင်းရှိ နေရာလွတ်များကို မပြောင်းလဲဘဲ ထိန်းသိမ်းပါ
  const parts = text.split(/(```[\s\S]*?```)/);
  return parts
    .map((part) => {
      if (part.startsWith("```")) {
        return part; // ကုဒ်ဘလောက်များကို မပြင်ဆင်ပါနှင့်
      }
      return part.replace(/\n{3,}/g, "\n\n"); // စာသားအကြောင်းအရာတွင်သာ အသုံးချပါ
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
  stackPriority: 100, // caveman/rtk ပြီးနောက် လုပ်ဆောင်ပါ

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

    // မက်ဆေ့ချ် array ကို ဖြတ်သန်းပါ — string နှင့် multipart content နှစ်မျိုးလုံးကို ကိုင်တွယ်ပါ
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
      // Multipart content: အပိုင်းများကို ဖြတ်သန်းပြီး စာသားအပိုင်းများကိုသာ ချုံ့ပါ
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
          return part; // image_url၊ tool_use စသည်တို့ကို မပြောင်းလဲဘဲ ထိန်းသိမ်းပါ။
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

// ကမ္ဘာလုံးဆိုင်ရာအဖြစ် မှတ်ပုံတင်ပါ
registerCompressionEngine(whitespaceEngine);
````

### စိတ်ကြိုက် Engine များကို ထားရှိရမည့်နေရာ

```
~/.omniroute/compression/engines/my-engine.ts    # အသုံးပြုသူအဆင့်
<project>/compression-engines/my-engine.ts        # ပရောဂျက်အဆင့် (စတင်ချိန်တွင် တင်သွင်းသည်)
```

သို့မဟုတ် plugin တစ်ခုမှတစ်ဆင့် ပရိုဂရမ်နည်းဖြင့် တင်သွင်းပါ-

```ts
// သင့် plugin အတွင်း
import {
  registerCompressionEngine,
  unregisterCompressionEngine,
} from "@omniroute/open-sse/services/compression/engines/registry";
import { myEngine } from "./engines/my-engine";

export default definePlugin({
  name: "my-compression-plugin",
  // plugin SDK က onRequest / onResponse / onError hook များကို ထုတ်ပေးသည်။ plugin
  // module တင်သွင်းသည့်အခါ (သို့မဟုတ် ပထမဆုံး onRequest တွင်) engine ကို မှတ်ပုံတင်ပါ၊ ထို့နောက်
  // သင်၏ကိုယ်ပိုင် teardown လမ်းကြောင်းမှ ၎င်းကို မှတ်ပုံတင်မှု ပယ်ဖျက်ပါ။
  onRequest: async (ctx) => {
    registerCompressionEngine(myEngine);
  },
});

// Teardown ပြုလုပ်ချိန်တွင်-
// unregisterCompressionEngine("my-engine");
```

### သင့် Engine ကို စမ်းသပ်ခြင်း

သင့် engine ကို plugin သို့မဟုတ် startup function တစ်ခုတွင် မှတ်ပုံတင်ပါ။ မှတ်ပုံတင်ပြီးသည်နှင့် ၎င်း၏ `id` မှတစ်ဆင့် strategy selector တွင် engine ကို အသုံးပြုနိုင်ပါမည်။ ၎င်းကို stacked pipeline တစ်ခုတွင် ပေါင်းစပ်ခြင်းဖြင့် integration ကို စမ်းသပ်ပါ-

---

## ဘာသာစကား Pack များ ဖန်တီးခြင်း

Caveman ပုံစံ ချုံ့ခြင်းသည် သဘာဝဘာသာစကားတစ်ခုချင်းစီရှိ ဖြည့်စွက်စကားများ၊ မရေမရာပြောဆိုမှုများနှင့် စကားရှည်သည့် ပုံစံများကို ကိုင်တွယ်ရန် **ဘာသာစကားအလိုက် သတ်မှတ်ထားသော rule pack များ** ကို အသုံးပြုသည်။ OmniRoute တွင် `en`, `es`, `fr`, `de`, `ja`, `pt-BR` ဟူသော **ဘာသာစကား pack ၆ ခု** ပါဝင်သည်။

### Pack ဖွဲ့စည်းပုံ

ဘာသာစကား pack တစ်ခုသည် `open-sse/services/compression/rules/<language>/` အောက်ရှိ **JSON ဖိုင်များ** ပါဝင်သော directory တစ်ခုဖြစ်သည်-

```
open-sse/services/compression/rules/
├── en/
│   ├── filler.json          # နှုတ်ဆက်စကားများ၊ မရေမရာပြောဆိုမှုများ၊ ယဉ်ကျေးသိမ်မွေ့မှု
│   ├── context.json         # ဆက်စပ်အကြောင်းအရာ လျှော့ချသည့် rule များ
│   ├── dedup.json           # ထပ်တူများ ဖယ်ရှားသည့် rule များ
│   ├── structural.json      # ပုဒ်ဖြတ်ပုဒ်ရပ်၊ ဖော်မတ်ချခြင်း
│   └── ultra.json           # ပြင်းပြင်းထန်ထန် ချုံ့သည့် rule များ
├── es/  (ဖွဲ့စည်းပုံတူညီသည်)
├── fr/  (ဖွဲ့စည်းပုံတူညီသည်)
├── de/  (ဖွဲ့စည်းပုံတူညီသည်)
├── ja/  (ဖွဲ့စည်းပုံတူညီသည်)
└── pt-BR/ (ဖွဲ့စည်းပုံတူညီသည်)
```

### Rule တစ်ခု၏ ဖွဲ့စည်းပုံ

Rule တစ်ခုစီတွင် အောက်ပါပုံစံရှိသည် (`open-sse/services/compression/ruleLoader.ts` မှ)-

```ts
interface FileRule {
  name: string; // လူဖတ်ရှုနားလည်နိုင်သော အမည် (kebab-case)
  pattern: string; // JavaScript regex ပုံစံ
  replacement?: string; // ကိုက်ညီသည့်အရာကို အစားထိုးမည့်အရာ
  replacementMap?: Record<string, string>; // သို့မဟုတ် key→replacement map တစ်ခု
  flags?: string; // Regex flag များ (ပုံမှန်အားဖြင့် "gi")
  context?: "all" | "user" | "system" | "assistant";
  category?: "filler" | "context" | "structural" | "dedup" | "terse" | "ultra";
  minIntensity?: "lite" | "full" | "ultra"; // ဤပြင်းအားအောက်တွင် ကျော်သွားရန်
  description?: string; // စာရွက်စာတမ်း
}
```

### ဥပမာ- ဟိန္ဒီ Filler Rule များ ထည့်သွင်းခြင်း

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
      "description": "'नमस्ते' ကဲ့သို့သော ယဉ်ကျေးသည့် အဖွင့်စကားများကို ဖယ်ရှားရန်"
    },
    {
      "name": "filler_actually",
      "pattern": "\\b(?:असल में|वास्तव में|दरअसल)\\b\\s*",
      "replacement": "",
      "context": "all",
      "category": "filler",
      "minIntensity": "lite",
      "description": "'actually' ဖြည့်စွက်စကားများကို ဖယ်ရှားရန်"
    },
    {
      "name": "verbose_plea",
      "pattern": "\\b(?:कृपया|कृपया आप|अनुरोध है कि आप)\\b\\s*",
      "replacement": "",
      "context": "all",
      "category": "filler",
      "minIntensity": "full",
      "description": "ဟိန္ဒီဘာသာရှိ 'please' ကို ဖယ်ရှားရန်"
    }
  ]
}
```

### အတည်ပြုစစ်ဆေးခြင်း

Rule pack များကို load လုပ်ချိန်တွင် `_schema.json` နှင့် တိုက်ဆိုင်စစ်ဆေးသည်။ ဖွဲ့စည်းပုံမမှန်သော pack သည် load မဖြစ်ဘဲ error တစ်ခုကို log မှတ်တမ်းတင်မည်-

```
RULE_LOADER: pack "hi/filler.json" ကို အတည်ပြုစစ်ဆေးမှု မအောင်မြင်ပါ-
  - rules.0.pattern: မမှန်ကန်သော regex
  - rules.1.context: [all, user, system, assistant] ထဲမှ တစ်ခုဖြစ်ရမည်
```

Pack တစ်ခုကို load လုပ်သောအခါ (`_schema.json` နှင့် တိုက်ဆိုင်၍) အတည်ပြုစစ်ဆေးမှုသည် အလိုအလျောက် လုပ်ဆောင်သည်။ မမှန်ကန်သော pack ကို ပယ်ချပြီး အထက်ပါ error ကို log မှတ်တမ်းတင်သည်။ Pack အတည်ပြုစစ်ဆေးမှုအတွက် သီးခြား `npm run` script မရှိပါ — pack ကို load လုပ်ပြီး (ဥပမာ server ကို စတင်ခြင်း သို့မဟုတ် compression path ကို လုပ်ဆောင်ခြင်း) log များကို စောင့်ကြည့်ပါ။

### စိတ်ကြိုက် ဘာသာစကား Pack တစ်ခုကို Load လုပ်ခြင်း

```ts
import { loadRulePack } from "omniroute/compression/ruleLoader";

await loadRulePack("./my-custom-rules/hi/filler.json");
```

သို့မဟုတ် အသိအမှတ်ပြုထားသော တည်နေရာတစ်ခုတွင် ထည့်သွင်းပါ-

```
~/.omniroute/compression/rules/hi/filler.json  # အသုံးပြုသူအဆင့်
<project>/.compression/rules/hi/filler.json   # Project အဆင့်
```

### ဘာသာစကား Pack များအတွက် အကောင်းဆုံး လုပ်ထုံးလုပ်နည်းများ

1. **`filler` ဖြင့် စတင်ပါ** — ယင်းတို့သည် အကျိုးသက်ရောက်မှု အမြင့်ဆုံး rule များဖြစ်သည်
2. **ပြင်းပြင်းထန်ထန် ချုံ့သည့် rule များကို ကန့်သတ်ရန် `minIntensity` ကို အသုံးပြုပါ** — အလွန်အကျွံချုံ့ခြင်းမှ ကာကွယ်ပေးသည်
3. **စမ်းသပ်မှု case များ ထည့်သွင်းပါ** — လုပ်ဆောင်ပုံကို အတည်ပြုရန် JSON ထဲတွင် `tests[]` array ကို ထည့်ပါ
4. **အစီအစဉ်သည် အရေးကြီးသည်** — အစောပိုင်း rule များကို ဦးစွာ အသုံးပြုသည်။ အကျိုးသက်ရောက်မှုမြင့်သော rule များကို ရှေ့ဆုံးတွင် ထားပါ
5. **`replacement` ကို သတိကြီးစွာ အသုံးပြုပါ** — ပုံမှန်အားဖြင့် string အလွတ်သည် မှန်ကန်သည်။ အကြောင်းအရာအသစ်ကို ဘယ်တော့မှ မထည့်သွင်းပါနှင့်

### ဘာသာပြန်ဆိုမှု မဟာဗျူဟာ

Rule pack များကို ဘာသာစကားအသစ်တစ်ခုအတွက် ဒေသန္တရပြုလုပ်သောအခါ-

1. **Rule အမည်များကို ဘာသာပြန်ပါ** — ၎င်းတို့သည် debug output တွင် ပေါ်လာသည်
2. **Regex ပုံစံများကို လိုက်လျောညီထွေ ပြင်ဆင်ပါ** — တိုက်ရိုက်ဘာသာပြန်ခြင်းသည် မကြာခဏ အလုပ်မဖြစ်ပါ (စကားလုံးနယ်နိမိတ်များ ကွဲပြားသည်)
3. **တကယ့်စကားဝိုင်းများဖြင့် စမ်းသပ်ပါ** — pack သည် အမှန်တကယ် input များအတွက် ဘေးကင်းသင့်သည်
4. **ယဉ်ကျေးမှုဆိုင်ရာ ထုံးတမ်းများနှင့် ကိုက်ညီအောင်လုပ်ပါ** — ဥပမာအားဖြင့် ဂျပန် pack များတွင် အင်္ဂလိပ်ဘာသာထက် ဂုဏ်ပြုအသုံးအနှုန်းဆိုင်ရာ ဖြည့်စွက်စကားများ ပိုများသည်

---

## အဆင့်ဆင့်ချိတ်ဆက်ထားသော Pipeline များ

**အဆင့်ဆင့်ချိတ်ဆက်ထားသော pipeline** တစ်ခုသည် engine အများအပြားကို အစဉ်လိုက် လုပ်ဆောင်ပြီး engine တစ်ခုချင်းစီ၏ output ကို နောက် engine သို့ input အဖြစ် ပေးပို့သည်။ ဤသည်မှာ `mode: stacked` အတွင်းပိုင်း၌ အလုပ်လုပ်ပုံဖြစ်သည်။

### အဆင့်ဆင့်ချိတ်ဆက်မှု အလုပ်လုပ်ပုံ

```
Input (10,000 tokens)
        │
        ▼
   ┌──────────┐
   │  Engine  │  priority 10
   │  A       │  ──▶ output: 6,000 tokens (-40%)
   └────┬─────┘
        ▼
   ┌──────────┐
   │  Engine  │  priority 50
   │  B       │  ──▶ output: 2,400 tokens (-60%)
   └────┬─────┘
        ▼
   ┌──────────┐
   │  Engine  │  priority 100
   │  C       │  ──▶ output: 1,200 tokens (-80%)
   └────┬─────┘
        │
        ▼
နောက်ဆုံး output (1,200 tokens၊ စုစုပေါင်း ချွေတာမှု ~88%)
```

`mode: "stacked"` ကို ရွေးချယ်ထားသည့်အခါ engine များသည် `pipeline` array ထဲတွင် သတ်မှတ်ထားသည့် အစဉ်အတိုင်း တစ်ခုပြီးတစ်ခု လုပ်ဆောင်သည်။
engine N ၏ output သည် engine N+1 ၏ input ဖြစ်လာသည်။

### ချုံ့ခြင်း Mode များ

OmniRoute သည် configuration၊ အလိုအလျောက် စတင်လုပ်ဆောင်သည့် threshold များနှင့် combo override များအပေါ် အခြေခံ၍ **request တစ်ခုစီအတွက် mode တစ်ခုတည်းကိုသာ** ရွေးချယ်သည်။
ရရှိနိုင်သော mode များကို `open-sse/services/compression/types.ts` (`CompressionMode` type) တွင် သတ်မှတ်ထားသည်။

| Mode         | Engine များ          | အသုံးပြုမှုအခြေအနေ                                                                                                                                                                                                                              |
| ------------ | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `off`        | မရှိ                 | ချုံ့ခြင်းအားလုံးကို ပိတ်ရန်                                                                                                                                                                                                                    |
| `rtk`        | RTK သာ               | Command output များပြားသော session များ (80%+ ချွေတာမှု)                                                                                                                                                                                        |
| `lite`       | Lite သာ              | ထိန်းထိန်းသိမ်းသိမ်း ချုံ့ခြင်း (မြန်ဆန်၊ ဘေးကင်း)                                                                                                                                                                                              |
| `standard`   | Caveman              | language pack များဖြင့် စကားပြေကို ချုံ့ခြင်း                                                                                                                                                                                                   |
| `aggressive` | Caveman + Aggressive | စကားပြေကို ပြင်းပြင်းထန်ထန် ချုံ့ခြင်း + နောက်ဆုံးအဆင့် ပြင်းထန်သော processing                                                                                                                                                                  |
| `ultra`      | Ultra                | အမြင့်ဆုံး ချုံ့ခြင်း (အချက်အလက်ဆုံးရှုံးနိုင်၊ နောက်ဆုံးနည်းလမ်း)။ `ultra.modelPath` ကို သတ်မှတ်ထားသည့်အခါ **LLMLingua-2** SLM engine မှတစ်ဆင့် လုပ်ဆောင်နိုင်သည် (model မရရှိနိုင်ပါက rule-based လမ်းကြောင်းသို့ အလိုအလျောက် ပြန်ပြောင်းသည်)။ |
| `stacked`    | စိတ်ကြိုက် pipeline  | Engine များကို မည်သည့်အစဉ်ဖြင့်မဆို ပေါင်းစပ်ရန် (အောက်တွင်ကြည့်ပါ)                                                                                                                                                                             |

> အထက်ပါ mode engine များအပြင် registry တွင် အထူးပြု အဆင့်ဆင့်ချိတ်ဆက်နိုင်သော engine များဖြစ်သည့် —
> **CCR**၊ **headroom**၊ **ionizer** နှင့် **session-dedup** — တို့လည်း ပါဝင်ပြီး
> [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md#additional-built-in-engines) တွင် မှတ်တမ်းတင်ထားသည်။

Mode ရွေးချယ်မှုကို `open-sse/services/compression/strategySelector.ts` ထဲရှိ `getEffectiveMode()` က ဆုံးဖြတ်သည်။

1. ချုံ့ခြင်းကို ပိတ်ထားပါက: `"off"`
2. combo override ရှိပါက: override ကို အသုံးပြုရန်
3. auto-trigger threshold ကျော်လွန်ပါက: `autoTriggerMode` ကို အသုံးပြုရန် (မူလတန်ဖိုး: `"lite"`)
4. မဟုတ်ပါက: `defaultMode` ကို အသုံးပြုရန်

### မူလ အဆင့်ဆင့်ချိတ်ဆက်ထားသော Pipeline

`mode: "stacked"` ကို တိတိကျကျ configure လုပ်ထားသည့်အခါ မူလ pipeline သည် အောက်ပါတို့ကို ပေါင်းစပ်ထားသည်။

1. **RTK** — command output ထဲမှ မလိုအပ်သော အချက်အလက်များကို ဖယ်ရှားရန် (terminal output တွင် ချွေတာမှု ~80%)
2. **Caveman** — ဖြည့်စွက်စကားလုံးများကို ဖယ်ရှားပြီး စကားပြေကို တိုတောင်းကျစ်လျစ်စေရန် (ကျန်ရှိသော စာသားတွင် ~46%)
3. **Lite** — နောက်ဆုံး whitespace + dedup processing

ဤပေါင်းစပ်မှုသည် tool အသုံးပြုမှုများသော session များတွင် **78-95% ချွေတာမှု** ရရှိစေသည်။

### အဆင့်ဆင့်ချိတ်ဆက်ထားသော Pipeline များကို Configure လုပ်ခြင်း

combo config ထဲတွင်:

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

Engine များကို ချန်လှပ်နိုင်သည်၊ စိတ်ကြိုက် engine များ ထည့်သွင်းနိုင်သည် သို့မဟုတ် ၎င်းတို့၏ အစဉ်ကို ပြန်လည်စီနိုင်သည်။

### State လွှဲပြောင်းခြင်း

Engine များသည် request context (`options` ထဲရှိ) မှ metadata ကို ဖတ်နိုင်သည်။

```ts
compress(body, config) {
  // ယခင် engine များမှ metadata ကို ဖတ်ရန်
  const original = options?.compressionComboId;  // "my-coding-combo"
  // ...
}
```

Metadata သည် **ဖတ်ရန်သက်သက်သာ** ဖြစ်သည် — engine များသည် request context ကို ပြောင်းလဲ၍မရဘဲ ၎င်းတို့ကိုယ်တိုင်၏ body output ကိုသာ ပြောင်းလဲနိုင်သည်။

### လုပ်ဆောင်မှုအစဉ်တွင် သတိပြုရမည့်အချက်များ

| Engine အစဉ်                                       | အကျိုးသက်ရောက်မှု                                                                                               |
| ------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| RTK → Caveman → Lite                              | **အကြံပြုထားသည်** (မလိုအပ်သောအချက်အလက်ကို ဦးစွာဖယ်ရှားပြီးနောက် ဘာသာစကားနှင့် whitespace ကို အစဉ်လိုက် စီမံသည်) |
| Lite → RTK → Caveman                              | မကောင်း — Lite က raw output မှ whitespace ကို ဖယ်ရှားသဖြင့် RTK pattern matching မအောင်မြင်နိုင်ပါ              |
| Caveman → RTK                                     | မကောင်း — Caveman က စာသားကို RTK မမှတ်မိနိုင်သည့် ပုံစံများဖြင့် ပြန်လည်ရေးသားနိုင်သည်                          |
| `tool_results` ကို ပထမဆုံးထားသည့် မည်သည့်အစဉ်မဆို | ပိုကောင်း — tool output သည် မလိုအပ်သောအချက်အလက် အများဆုံးပါဝင်သည့် content ဖြစ်သည်                              |

### မည်သည့်အချိန်တွင် အဆင့်ဆင့် မချိတ်ဆက်သင့်သနည်း

အဆင့်ဆင့်ချိတ်ဆက်ခြင်းသည် အမြဲတမ်း ပိုကောင်းသည်မဟုတ်ပါ။

- **ရိုးရှင်းသော message များ** (tool output မပါ) — Caveman သို့မဟုတ် Lite တစ်ခုတည်းဖြင့် လုံလောက်သည်
- **ကုန်ကျစရိတ်ကို အလေးထားသောအခါ** — engine တစ်ခုစီသည် latency ~5-50ms ထပ်တိုးစေသည်
- **သီးခြား tool များ** — shell output အတွက် RTK တစ်ခုတည်းဖြင့် အများအားဖြင့် လုံလောက်သည်

### စိတ်ကြိုက် Pipeline တစ်ခု တည်ဆောက်ခြင်း

အမည်ပေးထားသော pipeline registry မရှိပါ။ stacked pipeline ဆိုသည်မှာ `applyStackedCompression()` သို့ ပေးပို့သည့် **အဆင့်များပါဝင်သော inline array** တစ်ခုသာ ဖြစ်သည် (`@omniroute/open-sse/services/compression/strategySelector` မှ export လုပ်ထားသည်)။

```ts
import { applyStackedCompression } from "@omniroute/open-sse/services/compression/strategySelector";

const result = applyStackedCompression(body, [
  { engine: "rtk", intensity: "aggressive" },
  { engine: "caveman", intensity: "full" },
]);
```

pipeline တစ်ခုကို မပေးပို့ပါက မူလသတ်မှတ်ချက်အဖြစ် `rtk(standard) → caveman(full)` ကို အသုံးပြုသည်။

၎င်းကို config မှ ထိန်းချုပ်ရန် `mode: "stacked"` ဟု သတ်မှတ်ပြီး အဆင့် array ကို `stackedPipeline` အောက်တွင် ထည့်သွင်းပေးပါ (`config.stackedPipeline` မှ ဖတ်ယူသည်)။

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

## Upstream Sync မူဝါဒ

OmniRoute ၏ compression engine များသည် README ထဲတွင် upstream project အများအပြားကို အသိအမှတ်ပြုဖော်ပြထားသည်
("inspired by RTK, Caveman, LLMLingua-2, Troglodita")။ Contributor များ မကြာခဏမေးလေ့ရှိသည့်
မေးခွန်းမှာ- **upstream RTK က tool filter အသစ်တစ်ခု ထည့်သွင်းသည့်အခါ သို့မဟုတ် Caveman က rule
pack တစ်ခု ထည့်သွင်းသည့်အခါ ၎င်းသည် OmniRoute သို့ မည်သို့ရောက်ရှိလာသနည်း။** ဤအပိုင်းသည် တရားဝင်အဖြေဖြစ်သည်။

### Vendored မိတ္တူများနှင့် သီးခြားအကောင်အထည်ဖော်မှုများ

| Engine                       | Upstream နှင့် ဆက်နွှယ်မှု                                                                                                                                                        | တည်နေရာ                                                             |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| **RTK**                      | **သီးခြားပြန်လည်အကောင်အထည်ဖော်မှု** (မှီငြမ်းထားခြင်းဖြစ်ပြီး မိတ္တူမဟုတ်ပါ)                                                                                                      | `open-sse/services/compression/engines/rtk/`                        |
| **Caveman**                  | **သီးခြားပြန်လည်အကောင်အထည်ဖော်မှု** (မှီငြမ်းထားခြင်း)                                                                                                                            | `open-sse/services/compression/engines/cavemanAdapter.ts`           |
| **Headroom**                 | အများစုမှာ internal ဖြစ်သည်။ `gcf/` codec တစ်ခုတည်းသာ `gcf-typescript` မှ **အမှန်တကယ် vendor ထည့်ထားခြင်း** ဖြစ်သည် (MIT၊ SPDX ဖြင့် အမှတ်အသားပြုထားပြီး generic profile အတွက်သာ) | `open-sse/services/compression/engines/headroom/gcf/`               |
| **LLMLingua-2 / Troglodita** | မှီငြမ်းထားခြင်း (`llmlingua` + `session-dedup` engine များကို မောင်းနှင်ပေးသည်)                                                                                                  | `open-sse/services/compression/engines/llmlingua/`, `session-dedup` |

အဓိကအချက်- **RTK နှင့် Caveman တို့သည် vendored source tree များမဟုတ်ဘဲ
_အယူအဆများ_ (filter rule များ၊ rule pack များ) ကို clean-room နည်းလမ်းဖြင့် ပြန်လည်ဖန်တီးထားသော TypeScript အကောင်အထည်ဖော်မှုများ ဖြစ်သည်။** `git pull` လုပ်ယူရန်
upstream မိတ္တူမရှိပါ — ထို့ကြောင့်ပင် README တွင်
"bundled" ဟု မဆိုဘဲ "inspired by" ဟု ဖော်ပြထားခြင်းဖြစ်သည်။

### Upstream တိုးတက်ကောင်းမွန်မှုများကို ပေါင်းစည်းပုံ

**အလိုအလျောက် upstream release စောင့်ကြည့်ခြင်းမရှိသည့်အပြင် `compression-sync`
label လည်း မရှိပါ** — ၎င်းမှာ ရည်ရွယ်ချက်ရှိရှိ ဒီဇိုင်းချထားခြင်းဖြစ်သည်။ Engine များသည် ပြန်လည်အကောင်အထည်ဖော်ထားခြင်းဖြစ်သောကြောင့် upstream RTK
filter သို့မဟုတ် Caveman rule pack ကို code အဖြစ် ပေါင်းစည်းခြင်းမပြုပါ။ ထိုအစား ၎င်းကို **OmniRoute ၏ ကိုယ်ပိုင် format ဖြင့် rule/filter အသစ်အဖြစ်
ပြန်လည်ဖော်ပြသည်** (
[COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md) ကိုကြည့်ပါ)၊ ထို့နောက်
ပုံမှန် PR မှတစ်ဆင့် လိုအပ်သလို ထည့်သွင်းသည်။ အထက်ပါ extension point များ (custom engine၊ language pack၊ RTK filter)
သည် ယင်းတို့ကို ပံ့ပိုးထည့်ဝင်ရန် တရားဝင်ခွင့်ပြုထားသော နည်းလမ်းများဖြစ်သည်။

ဤလုပ်ငန်းစဉ်အတိုင်း ပြုလုပ်ထားသော မကြာသေးမီက ဥပမာများ-

- Gradle နှင့် `dotnet` build output အတွက် RTK filter များ (v3.8.42)
- kubectl / docker-build / composer / gh အတွက် RTK filter များ (#2824)
- Caveman အင်ဒိုနီးရှားဘာသာစကား pack (#3975) နှင့် ဂျာမန် / ပြင်သစ် / ဂျပန် / တရုတ် pack များ

### Headroom (input-compression proxy)

Headroom သည် **အပြည့်အဝ internal** ဖြစ်သည် — သတ်မှတ်ဗားရှင်း၌ ချိတ်ထားသော vendored `gcf` codec snapshot နှင့်
OmniRoute ၏ ကိုယ်ပိုင် `smartcrusher` / `toon` / `tabular` layer များဖြစ်သည်။ Vendored မိတ္တူအပြင်
စောင့်ကြည့်ရန် live upstream မရှိပါ။ `gcf` ၏ update များကို codec ပြောင်းလဲသည့်အခါ
ကိုယ်တိုင် refresh လုပ်ပြီး compression budget
gate (`check:compression-budget`) နှင့် ပြန်လည်စစ်ဆေးအတည်ပြုသည်။

### Upstream မှ မှီငြမ်းထားသော တိုးတက်ကောင်းမွန်မှုတစ်ခု အဆိုပြုခြင်း

1. **Vendor မထည့်ပါနှင့်** — upstream rule/filter ကို OmniRoute ၏ format ဖြင့် ပြန်လည်ဖော်ပြပါ။
2. အောက်ပါ သက်ဆိုင်ရာ extension point (language pack၊ RTK filter သို့မဟုတ်
   custom engine) မှတစ်ဆင့် ထည့်သွင်းပါ။
3. License ပါဝင်သော source ကို ကူးယူခြင်းမပြုဘဲ PR ဖော်ပြချက်တွင် upstream project ကို ကိုးကားဖော်ပြပါ (အသိအမှတ်ပြုရန်)။
4. Test များ ထည့်သွင်းပြီး `check:compression-budget` gate ကို ဆက်လက်ဖြတ်သန်းနိုင်ကြောင်း အတည်ပြုပါ။

---

## Output Style တစ်ခု ထည့်သွင်းခြင်း

Output style များသည် ( [လမ်းညွှန်၏ catalog ဇယား](./COMPRESSION_GUIDE.md#output-styles-catalog) ကိုကြည့်ပါ)
input engine များ၏ တုံ့ပြန်ချက်ဘက်ခြမ်းရှိ အတွဲဖက်များဖြစ်သည်။ သင်ပို့သည့်အရာကို ချုံ့မည့်အစား၊
ကုန်ကျစရိတ်ပိုသက်သာသော output ကို ထုတ်ပေးရန် model ကို ညွှန်ကြားသည်။ Registry သည်
`open-sse/services/compression/outputStyles/catalog.ts` ရှိ
`OUTPUT_STYLE_CATALOG` ဖြစ်ပြီး **catalog entry တစ်ခုတည်းက feature တစ်ခုလုံးဖြစ်သည်**။ Injector၊ dashboard settings panel၊
persistence နှင့် telemetry အားလုံးသည် catalog ကို စာရင်းကောက်ယူအသုံးပြုကြသောကြောင့် အခြား update လုပ်ရန်စာရင်း မရှိပါ။

1. **`OUTPUT_STYLE_CATALOG` သို့ entry တစ်ခု ထည့်ပါ**။ ၎င်းတွင် `id`၊ `label`၊ `description` နှင့်
   အင်္ဂလိပ် `levels` သုံးခု (`lite`၊ `full`၊ `ultra`) ပါဝင်ရမည်။ Code၊ path၊ command၊ error နှင့် URL များကို မပြောင်းလဲဘဲ ထားနိုင်ရန် level တိုင်းသည်
   `${SHARED_BOUNDARIES}` ဖြင့် အဆုံးသတ်ရမည်။
   ညွှန်ကြားချက်စာသားသည် `(id, level, language)` တစ်ခုချင်းစီအတွက် **တည်ငြိမ်ပြီး သတ်မှတ်ထားသည့်အတိုင်းသာဖြစ်ရမည်** — `${SHARED_BOUNDARIES}` တစ်ခုတည်းကိုသာ interpolation ပြုလုပ်ခွင့်ရှိသည်။
2. **၎င်းကို ဘာသာပြန်ပါ။** `i18n` အောက်တွင် အနည်းဆုံး `pt-BR` block တစ်ခု ထည့်သွင်းပေးပို့ပါ။ `ponytail` နှင့်
   `i-have-adhd` (en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi) တို့သည် ကိုးကားအသုံးပြုရမည့် ပုံစံဖြစ်သည်။ ရည်ရွယ်ချက်ရှိရှိ ဘာသာစကားတစ်မျိုးတည်းသာ အသုံးပြုသော style သည် (`terse-cjk` → `zh` ကဲ့သို့) `locale` ကို သတ်မှတ်ပြီး၊ ထို့နောက်
   အဆိုပါ locale အောက်တွင်သာ ပြသပေးမည်ဖြစ်သည်။
3. **Matrix guard ကို update လုပ်ပါ** — style ၏ ဘာသာစကားများကို
   `tests/unit/compression/output-styles-i18n-matrix.test.ts` ရှိ `BASELINE_LANGUAGES` တွင် ထည့်ပါ။ Locale ဖြင့် ကန့်သတ်မထားသော style အသစ်တစ်ခုတွင် လိုအပ်သော ဘာသာပြန်ချက်များ မပါရှိပါက၊ tracking issue ပါသည့်
   တိကျရှင်းလင်းသော `KNOWN_ENGLISH_ONLY` entry မပါသရွေ့ gate သည် မအောင်မြင်ပါ။
4. **Style တစ်ခုချင်းစီအတွက် test တစ်ခု ထည့်ပါ**။ ၎င်းကို
   `tests/unit/compression/i-have-adhd-catalog.test.ts` ပုံစံအတိုင်း ပြုလုပ်ပါ။ Catalog ပုံသဏ္ဌာန်၊ level တစ်ခုချင်းစီအတွက် boundaries clause နှင့် ဘာသာပြန်ချက်တစ်ခုစီသည် အင်္ဂလိပ်စာကို ကူးထားခြင်းမဟုတ်ဘဲ သက်ဆိုင်ရာကိုယ်ပိုင်ဘာသာစကားဖြင့် ရေးသားထားကြောင်း အတည်ပြုသည့် anchor တစ်ခု ပါဝင်ရမည်။
5. **ရင်းမြစ်ဖော်ပြခြင်း**: Style ကို upstream project တစ်ခုမှ အခြေခံပြုပြင်ထားပါက entry ရှိ source comment တွင် ၎င်းကို အသိအမှတ်ပြုဖော်ပြပါ (ဥပမာ `i-have-adhd` → ayghri/i-have-adhd, MIT) — အထက်ပါ "Upstream မှ စိတ်ကူးရယူထားသော တိုးတက်ပြုပြင်မှုတစ်ခု အဆိုပြုခြင်း" နှင့် တူညီသော စည်းမျဉ်းဖြစ်သည်။

UI၊ schema သို့မဟုတ် telemetry ပြောင်းလဲမှု မလိုအပ်ပါ — အဆိုပါ surface များသည် catalog မှ တိုက်ရိုက် render လုပ်သည်။

---

## အကောင်းဆုံး လက်တွေ့ကျင့်သုံးနည်းများ

### Engine ဖွံ့ဖြိုးတိုးတက်ရေး

1. **`validateConfig` ကို အမြဲတမ်း အကောင်အထည်ဖော်ပါ** — validation မပါသော engine များသည် မသိသာဘဲ ချို့ယွင်းမှုများ ဖြစ်ပေါ်စေသည်
2. **လက်တွေ့ကျသော `targetLatencyMs` ကို သတ်မှတ်ပါ** — engine များ ရွေးချယ်ရန် strategy selector က အသုံးပြုသည်
3. **Dashboard အတွက် `getConfigSchema` ကို အသုံးပြုပါ** — config ကို အသုံးပြုသူများထံမှ လုံးဝမဖုံးကွယ်ပါနှင့်
4. **သင့် engine သည် pure ဖြစ်ပါက `stackable: true` ကို ပံ့ပိုးပါ** — side effect ရှိသော engine များကို stack မလုပ်သင့်ပါ
5. **Inline test များ ရေးပါ** — engine များကို <1s အတွင်း စစ်ဆေးအတည်ပြုနိုင်ရမည်

### Language Pack ဖွံ့ဖြိုးတိုးတက်ရေး

1. **`lite` intensity ဖြင့် စတင်ပါ** — အနိမ့်ဆုံး setting တွင် သင့် rule များသည် ဘေးကင်းရမည်
2. **Rule များ၏ သက်ရောက်မှုနယ်ပယ်ကို ကန့်သတ်ရန် `context` ကို အသုံးပြုပါ** — `user` အတွက်သာဖြစ်သော rule များသည် system prompt များကို မတော်တဆ သက်ရောက်နိုင်မည်မဟုတ်ပါ
3. **JSON key များကို capture လုပ်ခြင်းမှ ရှောင်ကြဉ်ပါ** — `\\bword\\b` သည် JSON အတွင်း၌ match ဖြစ်နိုင်ပြီး structured data ကို ပျက်စီးစေနိုင်သည်
4. **ဖြစ်နိုင်ခြေနည်းသော အစွန်းရောက်အခြေအနေများဖြင့် စမ်းသပ်ပါ** — input အလွတ်၊ unicode၊ RTL စာသား၊ emoji များ
5. **ရှိပြီးသား pack များကို template အဖြစ် အသုံးပြုပါ** — `en/filler.json` သည် အပြည့်စုံဆုံး ပြုစုထားသော ဥပမာဖြစ်သည်

### Pipeline ဒီဇိုင်း

1. **ပိုမိုကောင်းမွန်အောင် မပြုလုပ်မီ profile လုပ်ပါ** — ပထမဦးစွာ `compression_stats` ဖြင့် တိုင်းတာပါ
2. **အစမှ ပြန်လည်အကောင်အထည်ဖော်ခြင်းထက် ပေါင်းစပ်အသုံးပြုခြင်းကို ဦးစားပေးပါ** — engine အသစ်ရေးမည့်အစား Caveman rule များကို တိုးချဲ့ပါ
3. **အစီအစဉ်အတွက် အကြောင်းပြချက်ကို မှတ်တမ်းတင်ပါ** — engine A ကို engine B မတိုင်မီ ထားရသည့်အကြောင်းရင်းကို comment ရေးပါ
4. **Intensity level သုံးခုလုံးတွင် စမ်းသပ်ပါ** — `lite` သည် မြန်ဆန်သော်လည်း အချက်အလက်ဆုံးရှုံးနိုင်ပြီး၊ `ultra` သည် နှေးသော်လည်း တိကျသည်

---

## ကိုးကားချက်: ထည့်သွင်းပါရှိသော အင်ဂျင်များ

| အင်ဂျင် ID           | ထပ်ဆင့်အသုံးပြုနိုင်မှု | မူလ stackPriority | ပစ်မှတ်များ                                   |
| -------------------- | ----------------------- | ----------------- | --------------------------------------------- |
| `lite`               | ရသည်                    | 5                 | မက်ဆေ့ချ်များ၊ ကိရိယာရလဒ်များ                 |
| `rtk`                | ရသည်                    | 10                | ကိရိယာရလဒ်များ                                |
| `standard` (caveman) | ရသည်                    | 20                | မက်ဆေ့ချ်များ၊ ကိရိယာရလဒ်များ၊ ကုဒ်ဘလောက်များ |
| `aggressive`         | ရသည်                    | 30                | မက်ဆေ့ချ်များ                                 |
| `ultra`              | ရသည်                    | 40                | မက်ဆေ့ချ်များ၊ ကုဒ်ဘလောက်များ                 |

### ထပ်မံကြည့်ရှုရန်

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — Pipeline ခြုံငုံသုံးသပ်ချက်
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — အင်ဂျင် registry ကိုးကားချက်
- [COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md) — စည်းမျဉ်းဖော်မတ် သတ်မှတ်ချက်
- [COMPRESSION_LANGUAGE_PACKS.md](./COMPRESSION_LANGUAGE_PACKS.md) — ဘာသာစကား pack အသေးစိတ်အချက်အလက်များ
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — RTK အင်ဂျင်နှင့် စိတ်ကြိုက် filter များ
- ရင်းမြစ်: `open-sse/services/compression/` (ဖိုင် 117 ခု၊ ~250KB)
