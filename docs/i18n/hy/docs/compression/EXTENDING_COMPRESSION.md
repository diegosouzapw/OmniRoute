# Extending the Compression Pipeline (Հայերեն)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/EXTENDING_COMPRESSION.md) · 🇪🇹 [am](../../../am/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇦 [ar](../../../ar/docs/compression/EXTENDING_COMPRESSION.md) · 🇦🇿 [az](../../../az/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇬 [bg](../../../bg/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇩 [bn](../../../bn/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇦 [bs](../../../bs/docs/compression/EXTENDING_COMPRESSION.md) · 🇨🇿 [cs](../../../cs/docs/compression/EXTENDING_COMPRESSION.md) · 🇩🇰 [da](../../../da/docs/compression/EXTENDING_COMPRESSION.md) · 🇩🇪 [de](../../../de/docs/compression/EXTENDING_COMPRESSION.md) · 🇬🇷 [el](../../../el/docs/compression/EXTENDING_COMPRESSION.md) · 🇪🇸 [es](../../../es/docs/compression/EXTENDING_COMPRESSION.md) · 🇪🇪 [et](../../../et/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇷 [fa](../../../fa/docs/compression/EXTENDING_COMPRESSION.md) · 🇫🇮 [fi](../../../fi/docs/compression/EXTENDING_COMPRESSION.md) · 🇫🇷 [fr](../../../fr/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇪 [ga](../../../ga/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [gu](../../../gu/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [ha](../../../ha/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇱 [he](../../../he/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [hi](../../../hi/docs/compression/EXTENDING_COMPRESSION.md) · 🇭🇷 [hr](../../../hr/docs/compression/EXTENDING_COMPRESSION.md) · 🇭🇺 [hu](../../../hu/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇩 [id](../../../id/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [ig](../../../ig/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇹 [it](../../../it/docs/compression/EXTENDING_COMPRESSION.md) · 🇯🇵 [ja](../../../ja/docs/compression/EXTENDING_COMPRESSION.md) · 🇬🇪 [ka](../../../ka/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇭 [km](../../../km/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [kn](../../../kn/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇷 [ko](../../../ko/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇹 [lt](../../../lt/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇻 [lv](../../../lv/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [ml](../../../ml/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [mr](../../../mr/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇾 [ms](../../../ms/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇹 [mt](../../../mt/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇲 [my](../../../my/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇵 [ne](../../../ne/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇱 [nl](../../../nl/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇴 [no](../../../no/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [or](../../../or/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [pa](../../../pa/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇭 [phi](../../../phi/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇱 [pl](../../../pl/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇹 [pt](../../../pt/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇴 [ro](../../../ro/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇺 [ru](../../../ru/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇰 [si](../../../si/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇰 [sk](../../../sk/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇮 [sl](../../../sl/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇸 [sr](../../../sr/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇪 [sv](../../../sv/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇪 [sw](../../../sw/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [ta](../../../ta/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [te](../../../te/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇭 [th](../../../th/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇷 [tr](../../../tr/docs/compression/EXTENDING_COMPRESSION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇰 [ur](../../../ur/docs/compression/EXTENDING_COMPRESSION.md) · 🇺🇿 [uz](../../../uz/docs/compression/EXTENDING_COMPRESSION.md) · 🇻🇳 [vi](../../../vi/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [yo](../../../yo/docs/compression/EXTENDING_COMPRESSION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/EXTENDING_COMPRESSION.md)

---

> **Կարճ ասած**․ OmniRoute-ի սեղմման շարժիչը **ընդլայնելի** է․ կարող եք գրանցել հատուկ շարժիչներ, տրամադրել լեզվային փաթեթներ նոր լեզուների համար և կազմել շղթայված մշակման հոսքեր։ Այս ուղեցույցը ցույց է տալիս, թե ինչպես։

**Առնչվող ուղեցույցներ․**

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — Մշակման ամբողջ հոսքի ակնարկ
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — Շարժիչների գրանցամատյանը և ներկառուցված շարժիչները
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — RTK շարժիչը և հատուկ զտիչները
- [COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md) — Կանոնների փաթեթի ձևաչափի տեղեկատու

---

## Ակնարկ

Սեղմման համակարգն ունի **ընդլայնման 3 կետ**․

| Ընդլայնման կետ            | Կիրառման դեպք                                                               | Բարդություն      |
| ------------------------- | --------------------------------------------------------------------------- | ---------------- |
| **Հատուկ շարժիչ**         | Ավելացնել սեղմման բոլորովին նոր ալգորիթմ (օրինակ՝ տիրույթին հատուկ ամփոփիչ) | Բարձր            |
| **Լեզվային փաթեթ**        | Ավելացնել նոր բնական լեզվի աջակցություն (օրինակ՝ հինդի, արաբերեն)           | Միջին            |
| **Շղթայված մշակման հոսք** | Գոյություն ունեցող շարժիչները միավորել հատուկ հերթականությամբ               | Սկսնակների համար |

```
┌─────────────────────────────────────────────────────────────┐
│                    Սեղմման ռազմավարություն                    │
│                                                              │
│   Մուտքային հաղորդագրություններ ──▶ getEffectiveMode() ──▶ ռեժիմ │
│                                              │               │
│                      ┌───────────────────────┼──────────┐    │
│                      │         │         │         │    │    │
│                      ▼         ▼         ▼         ▼    │    │
│                   "rtk"    "lite"   "standard" "stacked"    │
│                      │         │         │         │    │    │
│                      ▼         ▼         ▼         ▼    │    │
│                   RTK       Lite     Caveman   engines[]   │
│                   շարժիչ    շարժիչ   շարժիչ    շղթայված    │
│                      │         │         │         │    │    │
│                      └─────────┴─────────┴─────────┘    │    │
│                                      │                    │
│                                      ▼                    │
│                              Սեղմված ելք                   │
└─────────────────────────────────────────────────────────────┘

Ռազմավարության ընտրիչը հիմնված է ՌԵԺԻՄԻ վրա․ յուրաքանչյուր հարցում ընտրում է ՄԵԿ ռեժիմ
(rtk / lite / standard / aggressive / ultra / stacked / off)։
Միայն "stacked" ռեժիմն է մի քանի շարժիչ հաջորդաբար շղթայում։
Ինքնաշխատ գործարկման լռելյայն ռեժիմը "lite" է (ոչ թե 3-աստիճան առաջնահերթությունների շղթա)։
```

---

## Հատուկ սեղմման շարժիչի ստեղծում

Շարժիչի միջերեսը (`open-sse/services/compression/engines/types.ts`) այն պայմանագիրն է, որին պետք է համապատասխանի յուրաքանչյուր շարժիչ։ Այն ունի 5 պարտադիր մեթոդ։

### `CompressionEngine` միջերեսը

```ts
interface CompressionEngine {
  id: string; // Շարժիչի եզակի ID
  name: string; // Ցուցադրվող անուն
  description: string; // Կարճ նկարագրություն
  icon: string; // Պատկերակ (էմոջի կամ URL)
  targets: CompressionEngineTarget[]; // ["messages", "tool_results", "code_blocks"]
  stackable: boolean; // Կարող է օգտագործվել շղթայված մշակման հոսքում
  stackPriority: number; // Հերթականությունը շղթայված մշակման հոսքերում (ավելի փոքր = ավելի վաղ)
  metadata: CompressionEngineMetadata;

  apply(body, options?): CompressionResult;
  compress(body, config?): CompressionResult;
  getConfigSchema(): EngineConfigField[];
  validateConfig(config): EngineValidationResult;
}
```

### Նվազագույն օրինակ․ բացատների շարժիչ

Հնարավոր ամենապարզ շարժիչը՝ հաղորդագրություններից հեռացնում է ավելորդ բացատները։

````ts
import type { CompressionEngine } from "omniroute/compression/engines/types";
import { registerCompressionEngine } from "omniroute/compression/engines/registry";

function preserveCodeBlocks(text: string): string {
  // Բաժանել ըստ կոդի բլոկների նշիչների և պահպանել դրանց ներսում եղած բացատները
  const parts = text.split(/(```[\s\S]*?```)/);
  return parts
    .map((part) => {
      if (part.startsWith("```")) {
        return part; // Չփոփոխել կոդի բլոկները
      }
      return part.replace(/\n{3,}/g, "\n\n"); // Կիրառել միայն արձակ տեքստին
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
  stackPriority: 100, // Գործարկել caveman/rtk-ից ՀԵՏՈ

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

    // Անցնել հաղորդագրությունների զանգվածով՝ մշակելով ինչպես տողային, այնպես էլ բազմամաս բովանդակությունը
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
      // Բազմամաս բովանդակություն․ անցնել մասերով և սեղմել միայն տեքստային մասերը
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
          return part; // պահպանել image_url-ը, tool_use-ը և այլն
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

// Գրանցել գլոբալ մակարդակում
registerCompressionEngine(whitespaceEngine);
````

### Որտեղ տեղադրել հատուկ շարժիչները

```
~/.omniroute/compression/engines/my-engine.ts    # Օգտատիրոջ մակարդակ
<project>/compression-engines/my-engine.ts        # Նախագծի մակարդակ (բեռնվում է գործարկման ժամանակ)
```

Կամ բեռնել ծրագրային եղանակով՝ փլագինից․

```ts
// Ձեր փլագինում
import {
  registerCompressionEngine,
  unregisterCompressionEngine,
} from "@omniroute/open-sse/services/compression/engines/registry";
import { myEngine } from "./engines/my-engine";

export default definePlugin({
  name: "my-compression-plugin",
  // Փլագինի SDK-ն տրամադրում է onRequest / onResponse / onError հուքերը։ Գրանցեք
  // շարժիչը, երբ փլագինի մոդուլը բեռնվում է (կամ առաջին onRequest-ի ժամանակ), իսկ գրանցումը չեղարկեք
  // ձեր սեփական ավարտական մշակման ուղուց։
  onRequest: async (ctx) => {
    registerCompressionEngine(myEngine);
  },
});

// Ավարտական մշակման ժամանակ․
// unregisterCompressionEngine("my-engine");
```

### Ձեր շարժիչի թեստավորումը

Գրանցեք ձեր շարժիչը փլագինում կամ գործարկման ֆունկցիայում։ Գրանցվելուց հետո շարժիչը հասանելի կլինի
ռազմավարության ընտրիչում՝ իր `id`-ի միջոցով։ Թեստավորեք ինտեգրումը՝ այն ներառելով շերտավորված մշակման շղթայում․

---

## Լեզվային փաթեթների ստեղծում

Caveman ոճի սեղմումն օգտագործում է **լեզվին հատուկ կանոնների փաթեթներ**՝ յուրաքանչյուր բնական լեզվում լրացուցիչ բառերը, անորոշ ձևակերպումները և ծավալուն արտահայտությունները մշակելու համար։ OmniRoute-ը տրամադրվում է **6 լեզվային փաթեթով**՝ `en`, `es`, `fr`, `de`, `ja`, `pt-BR`։

### Փաթեթի կառուցվածքը

Լեզվային փաթեթը **JSON ֆայլերի** գրացուցակ է՝ տեղակայված `open-sse/services/compression/rules/<language>/` ուղու ներքո․

```
open-sse/services/compression/rules/
├── en/
│   ├── filler.json          # Բարեկիրթ արտահայտություններ, անորոշ ձևակերպումներ, քաղաքավարություն
│   ├── context.json         # Համատեքստը կրճատող կանոններ
│   ├── dedup.json           # Կրկնօրինակների վերացման կանոններ
│   ├── structural.json      # Կետադրություն, ձևաչափում
│   └── ultra.json           # Ագրեսիվ սեղմման կանոններ
├── es/  (նույն կառուցվածքը)
├── fr/  (նույն կառուցվածքը)
├── de/  (նույն կառուցվածքը)
├── ja/  (նույն կառուցվածքը)
└── pt-BR/ (նույն կառուցվածքը)
```

### Կանոնի կառուցվածքը

Յուրաքանչյուր կանոն ունի հետևյալ կառուցվածքը (`open-sse/services/compression/ruleLoader.ts`-ից)․

```ts
interface FileRule {
  name: string; // Մարդու համար ընթեռնելի անուն (kebab-case)
  pattern: string; // JavaScript կանոնավոր արտահայտության ձևանմուշ
  replacement?: string; // Ինչով փոխարինել համընկնումը
  replacementMap?: Record<string, string>; // ԿԱՄ բանալի→փոխարինում քարտեզ
  flags?: string; // Կանոնավոր արտահայտության դրոշներ (սովորաբար՝ "gi")
  context?: "all" | "user" | "system" | "assistant";
  category?: "filler" | "context" | "structural" | "dedup" | "terse" | "ultra";
  minIntensity?: "lite" | "full" | "ultra"; // Բաց թողնել այս ինտենսիվությունից ցածր մակարդակներում
  description?: string; // Փաստաթղթավորում
}
```

### Օրինակ․ հինդի լեզվի լրացուցիչ բառերի կանոնների ավելացում

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

### Վավերացում

Բեռնման ժամանակ կանոնների փաթեթները վավերացվում են `_schema.json`-ի համաձայն։ Սխալ կառուցվածքով փաթեթը չի բեռնվի, և սխալը կգրանցվի մատյանում․

```
RULE_LOADER: pack "hi/filler.json" failed validation:
  - rules.0.pattern: Անվավեր կանոնավոր արտահայտություն
  - rules.1.context: պետք է լինի [all, user, system, assistant] արժեքներից մեկը
```

Վավերացումն ավտոմատ կերպով կատարվում է փաթեթը բեռնելիս (`_schema.json`-ի համաձայն)։ Անվավեր փաթեթը մերժվում է, և վերը նշված սխալը գրանցվում է մատյանում։ Փաթեթների վավերացման համար առանձին `npm run` սկրիպտ չկա․ բեռնեք փաթեթը (օրինակ՝ գործարկեք սերվերը կամ կատարեք սեղմման ուղին) և հետևեք մատյաններին։

### Հատուկ լեզվային փաթեթի բեռնում

```ts
import { loadRulePack } from "omniroute/compression/ruleLoader";

await loadRulePack("./my-custom-rules/hi/filler.json");
```

Կամ տեղադրեք այն ճանաչվող տեղադրություններից մեկում․

```
~/.omniroute/compression/rules/hi/filler.json  # Օգտատիրոջ մակարդակ
<project>/.compression/rules/hi/filler.json   # Նախագծի մակարդակ
```

### Լեզվային փաթեթների լավագույն գործելակերպերը

1. **Սկսեք `filler`-ից** — սրանք ամենամեծ ազդեցությունն ունեցող կանոններն են
2. **Օգտագործեք `minIntensity`**՝ ագրեսիվ կանոնների կիրառումը սահմանափակելու համար — սա պաշտպանում է չափից ավելի սեղմումից
3. **Ներառեք թեստային դեպքեր** — վարքագիծը ստուգելու համար JSON-ում ավելացրեք `tests[]` զանգված
4. **Հերթականությունը կարևոր է** — ավելի վաղ կանոնները կիրառվում են առաջինը․ մեծ ազդեցություն ունեցող կանոնները տեղադրեք սկզբում
5. **Զգույշ եղեք `replacement`-ի հետ** — դատարկ տողը սովորաբար ճիշտ տարբերակն է․ երբեք նոր բովանդակություն մի ավելացրեք

### Թարգմանության ռազմավարություն

Կանոնների փաթեթները նոր լեզվի համար տեղայնացնելիս՝

1. **Թարգմանեք կանոնների անունները** — դրանք ցուցադրվում են վրիպազերծման արտածման մեջ
2. **Հարմարեցրեք կանոնավոր արտահայտությունների ձևանմուշները** — ուղղակի թարգմանությունը հաճախ չի աշխատում (բառերի սահմանները տարբերվում են)
3. **Փորձարկեք իրական խոսակցությունների վրա** — փաթեթը պետք է անվտանգ լինի իրական մուտքային տվյալների համար
4. **Համապատասխանեցրեք մշակութային ընդունված ձևերին** — օրինակ՝ ճապոներենի փաթեթներում ավելի շատ պատվանունային լրացուցիչ արտահայտություններ կան, քան անգլերենում

---

## Շղթայված խողովակաշարեր

**Շղթայված խողովակաշարը** հաջորդաբար գործարկում է մի քանի շարժիչ՝ յուրաքանչյուր շարժիչի ելքը փոխանցելով հաջորդին։ Ահա թե ինչպես է `mode: stacked`-ն աշխատում ներքին մակարդակում։

### Ինչպես է աշխատում շղթայումը

```
Մուտք (10,000 թոքեն)
        │
        ▼
   ┌──────────┐
   │  Շարժիչ  │  առաջնահերթություն՝ 10
   │  A       │  ──▶ ելք՝ 6,000 թոքեն (-40%)
   └────┬─────┘
        ▼
   ┌──────────┐
   │  Շարժիչ  │  առաջնահերթություն՝ 50
   │  B       │  ──▶ ելք՝ 2,400 թոքեն (-60%)
   └────┬─────┘
        ▼
   ┌──────────┐
   │  Շարժիչ  │  առաջնահերթություն՝ 100
   │  C       │  ──▶ ելք՝ 1,200 թոքեն (-80%)
   └────┬─────┘
        │
        ▼
Վերջնական ելք (1,200 թոքեն, ընդհանուրում՝ ~88% խնայողություն)
```

Երբ ընտրված է `mode: "stacked"`-ը, շարժիչները հաջորդաբար են գործարկվում՝ `pipeline` զանգվածում նշված հերթականությամբ։
N շարժիչի ելքը դառնում է N+1 շարժիչի մուտքը։

### Սեղմման ռեժիմներ

OmniRoute-ը յուրաքանչյուր հարցման համար ընտրում է **ՄԵԿ ռեժիմ**՝ հիմնվելով կազմաձևման, ավտոմատ գործարկման շեմերի և համակցությունների վերասահմանումների վրա։
Հասանելի ռեժիմները սահմանված են `open-sse/services/compression/types.ts`-ում (`CompressionMode` տիպը)։

| Ռեժիմ        | Շարժիչներ            | Օգտագործման դեպք                                                                                                                                                                                                                       |
| ------------ | -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `off`        | Չկա                  | Անջատել ամբողջ սեղմումը                                                                                                                                                                                                                |
| `rtk`        | Միայն RTK            | Հրամանների ելքով հագեցած աշխատաշրջաններ (80%+ խնայողություն)                                                                                                                                                                           |
| `lite`       | Միայն Lite           | Պահպանողական սեղմում (արագ, անվտանգ)                                                                                                                                                                                                   |
| `standard`   | Caveman              | Արձակ տեքստի սեղմում՝ լեզվային փաթեթներով                                                                                                                                                                                              |
| `aggressive` | Caveman + Aggressive | Արձակ տեքստի ագրեսիվ սեղմում + ագրեսիվ վերջնական անցում                                                                                                                                                                                |
| `ultra`      | Ultra                | Առավելագույն սեղմում (կորուստներով, որպես վերջին միջոց)։ Ընտրովիորեն ուղղորդվում է **LLMLingua-2** SLM շարժիչով, երբ սահմանված է `ultra.modelPath`-ը (եթե մոդելն անհասանելի է, առանց ձախողման անցնում է կանոնների վրա հիմնված ուղուն)։ |
| `stacked`    | Հատուկ խողովակաշար   | Շարժիչները համակցել ցանկացած հերթականությամբ (տե՛ս ստորև)                                                                                                                                                                              |

> Բացի վերը նշված ռեժիմների շարժիչներից՝ գրանցամատյանը ներառում է նաև շղթայման ենթակա մասնագիտացված շարժիչներ՝
> **CCR**, **headroom**, **ionizer** և **session-dedup**, որոնք փաստաթղթավորված են
> [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md#additional-built-in-engines)-ում։

Ռեժիմի ընտրությունը որոշվում է `open-sse/services/compression/strategySelector.ts`-ի `getEffectiveMode()`-ով․

1. Եթե սեղմումն անջատված է՝ `"off"`
2. Եթե առկա է համակցության վերասահմանում՝ օգտագործել վերասահմանումը
3. Եթե ավտոմատ գործարկման շեմը գերազանցված է՝ օգտագործել `autoTriggerMode`-ը (լռելյայն՝ `"lite"`)
4. Հակառակ դեպքում՝ օգտագործել `defaultMode`-ը

### Լռելյայն շղթայված խողովակաշարը

Երբ `mode: "stacked"`-ը բացահայտորեն կազմաձևված է, լռելյայն խողովակաշարը համակցում է՝

1. **RTK** — հեռացնում է հրամանների ելքի աղմուկը (~80% խնայողություն տերմինալի ելքի դեպքում)
2. **Caveman** — հեռացնում է ավելորդ բառերը և արձակ տեքստը դարձնում հակիրճ (~46%՝ մնացած տեքստի դեպքում)
3. **Lite** — բացատների վերջնական մշակում + կրկնությունների հեռացում

Այս համակցությունը գործիքներով հագեցած աշխատաշրջաններում ապահովում է **78-95% խնայողություն**։

### Շղթայված խողովակաշարերի կազմաձևում

Համակցության կազմաձևում՝

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

Կարող եք բաց թողնել շարժիչներ, ավելացնել հատուկ շարժիչներ կամ փոխել դրանց հերթականությունը։

### Վիճակի փոխանցում

Շարժիչները կարող են կարդալ հարցման համատեքստի մետատվյալները (`options`-ում)՝

```ts
compress(body, config) {
  // Կարդալ նախորդ շարժիչների մետատվյալները
  const original = options?.compressionComboId;  // "my-coding-combo"
  // ...
}
```

Մետատվյալները նախատեսված են **միայն ընթերցման համար**․ շարժիչները չեն կարող փոփոխել հարցման համատեքստը, այլ միայն իրենց սեփական մարմնի ելքը։

### Կատարման հերթականության նրբություններ

| Շարժիչների հերթականություն                          | Ազդեցություն                                                                                      |
| --------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| RTK → Caveman → Lite                                | **Խորհուրդ է տրվում** (նախ հեռացնում է աղմուկը, ապա լեզվական ավելորդությունները, հետո՝ բացատները) |
| Lite → RTK → Caveman                                | Վատ է․ Lite-ը հեռացնում է չմշակված ելքի բացատները՝ խափանելով RTK-ի ձևանմուշների համընկնումը       |
| Caveman → RTK                                       | Վատ է․ Caveman-ը կարող է վերաշարադրել տեքստն այնպես, որ RTK-ն այն չճանաչի                         |
| Ցանկացած հերթականություն՝ սկզբում `tool_results`-ով | Ավելի լավ է․ գործիքների ելքն ամենաաղմկոտ բովանդակությունն է                                       |

### Երբ ՉՊԵՏՔ Է շղթայել

Շղթայումը միշտ չէ, որ ավելի լավ է․

- **Պարզ հաղորդագրություններ** (առանց գործիքների ելքի) — մեկ Caveman-ը կամ Lite-ը բավարար է
- **Ծախսերի նկատմամբ զգայուն դեպքեր** — յուրաքանչյուր շարժիչ ավելացնում է ~5-50ms ուշացում
- **Հատուկ գործիքներ** — shell-ի ելքի համար սովորաբար միայն RTK-ն բավարար է

### Հատուկ խողովակաշարի ստեղծում

Անվանակոչված pipeline-ների ռեեստր չկա։ Stacked pipeline-ը պարզապես քայլերի **ներկառուցված զանգված** է, որը փոխանցվում է `applyStackedCompression()`-ին (արտահանվում է `@omniroute/open-sse/services/compression/strategySelector`-ից)․

```ts
import { applyStackedCompression } from "@omniroute/open-sse/services/compression/strategySelector";

const result = applyStackedCompression(body, [
  { engine: "rtk", intensity: "aggressive" },
  { engine: "caveman", intensity: "full" },
]);
```

Եթե pipeline չեք փոխանցում, լռելյայն օգտագործվում է `rtk(standard) → caveman(full)`։

Այն կարգավորումներից կառավարելու համար սահմանեք `mode: "stacked"` և քայլերի զանգվածը տրամադրեք `stackedPipeline`-ում (ընթերցվում է `config.stackedPipeline`-ից)․

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

## Վերին հոսքի համաժամացման քաղաքականություն

OmniRoute-ի սեղմման շարժիչները README-ում նշում են մի քանի վերին հոսքի նախագծեր
(«ոգեշնչված է RTK-ից, Caveman-ից, LLMLingua-2-ից, Troglodita-ից»)։ Մասնակիցների
տարածված հարցն է․ **երբ վերին հոսքի RTK-ն ավելացնում է գործիքների նոր զտիչ, կամ
Caveman-ն ավելացնում է կանոնների փաթեթ, ինչպե՞ս է դա հասնում OmniRoute։** Այս
բաժինը պաշտոնական պատասխանն է։

### Ներառված պատճեններն ընդդեմ անկախ իրականացումների

| Շարժիչ                       | Կապը վերին հոսքի հետ                                                                                                            | Տեղադրություն                                                       |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| **RTK**                      | **Անկախ վերաիրականացում** (ոգեշնչված է, պատճեն չէ)                                                                              | `open-sse/services/compression/engines/rtk/`                        |
| **Caveman**                  | **Անկախ վերաիրականացում** (ոգեշնչված է)                                                                                         | `open-sse/services/compression/engines/cavemanAdapter.ts`           |
| **Headroom**                 | Հիմնականում ներքին է․ միայն `gcf/` կոդեկն է **իրապես ներառված** `gcf-typescript`-ից (MIT, SPDX նշումով, միայն ընդհանուր պրոֆիլ) | `open-sse/services/compression/engines/headroom/gcf/`               |
| **LLMLingua-2 / Troglodita** | Ոգեշնչված է (հիմք են հանդիսանում `llmlingua` + `session-dedup` շարժիչների համար)                                                | `open-sse/services/compression/engines/llmlingua/`, `session-dedup` |

Կարևոր կետ․ **RTK-ն և Caveman-ը _գաղափարների_ (զտիչների կանոններ, կանոնների
փաթեթներ) մաքուր սենյակի սկզբունքով ստեղծված TypeScript իրականացումներ են, ոչ
թե ներառված սկզբնաղբյուրների ծառեր։** Չկա վերին հոսքի պատճեն, որից հնարավոր
լինի կատարել `git pull`․ հենց այդ պատճառով README-ում գրված է «ոգեշնչված է»,
այլ ոչ թե «ներառված է»։

### Ինչպես են միավորվում վերին հոսքի բարելավումները

Նախագծային որոշմամբ՝ **վերին հոսքի թողարկումների ավտոմատ հետևում և
`compression-sync` պիտակ չկան**։ Քանի որ շարժիչները վերաիրականացումներ են,
վերին հոսքի RTK զտիչը կամ Caveman-ի կանոնների փաթեթը չի միավորվում որպես կոդ․
այն **վերարտահայտվում է որպես նոր կանոն/զտիչ OmniRoute-ի սեփական ձևաչափով**
(տե՛ս [COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md)) և
ըստ անհրաժեշտության ներառվում է սովորական PR-ի միջոցով։ Վերը նշված ընդլայնման
կետերը (հատուկ շարժիչ, լեզվական փաթեթ, RTK զտիչ) նման ներդրում կատարելու
հաստատված եղանակներն են։

Այս հոսքի վերջին օրինակները՝

- RTK զտիչներ Gradle-ի և `dotnet`-ի կառուցման ելքի համար (v3.8.42)
- RTK զտիչներ kubectl / docker-build / composer / gh-ի համար (#2824)
- Caveman-ի ինդոնեզերեն լեզվական փաթեթը (#3975), ինչպես նաև գերմաներեն / ֆրանսերեն / ճապոներեն / չինարեն փաթեթները

### Headroom (մուտքային տվյալների սեղմման պրոքսի)

Headroom-ը **ամբողջությամբ ներքին է**՝ ամրագրված, ներառված `gcf` կոդեկի
պատկեր և OmniRoute-ի սեփական `smartcrusher` / `toon` / `tabular` շերտեր։
Ներառված պատճենից բացի՝ չկա գործող վերին հոսք, որին անհրաժեշտ լինի հետևել․
`gcf`-ի թարմացումները կատարվում են ձեռքով, երբ կոդեկը փոխվում է, և կրկին
վավերացվում են սեղմման բյուջեի ստուգման միջոցով
(`check:compression-budget`)։

### Վերին հոսքից ոգեշնչված բարելավում առաջարկելը

1. **Մի՛ ներառեք սկզբնաղբյուրը**․ վերարտահայտեք վերին հոսքի կանոնը/զտիչը OmniRoute-ի ձևաչափով։
2. Ավելացրեք այն ստորև նշված համապատասխան ընդլայնման կետի միջոցով (լեզվական փաթեթ, RTK զտիչ կամ
   հատուկ շարժիչ)։
3. PR-ի նկարագրության մեջ հղում կատարեք վերին հոսքի նախագծին (հեղինակության նշում)՝ դրա
   արտոնագիր պարունակող սկզբնաղբյուրը պատճենելու փոխարեն։
4. Ներառեք թեստեր և հաստատեք, որ `check:compression-budget` ստուգումը դեռ անցնում է։

---

## Արտածման ոճի ավելացում

Արտածման ոճերը (տե՛ս [ուղեցույցի կատալոգի աղյուսակը](./COMPRESSION_GUIDE.md#output-styles-catalog))
մուտքային շարժիչների՝ պատասխանի կողմում գործող համարժեքն են. ձեր ուղարկածը սեղմելու փոխարեն
դրանք մոդելին հրահանգում են ստեղծել ավելի էժան արտածում։ Ռեեստրը
`OUTPUT_STYLE_CATALOG`-ն է՝ `open-sse/services/compression/outputStyles/catalog.ts`-ում, և
**կատալոգի մեկ գրառումն ամբողջ գործառույթն է**. ներարկիչը, կառավարման վահանակի կարգավորումների վահանակը,
պահպանումն ու հեռաչափությունը բոլորն անցնում են կատալոգի տարրերով. թարմացման ենթակա այլ ցանկ չկա։

1. **Ավելացրեք մեկ գրառում `OUTPUT_STYLE_CATALOG`-ում**՝ `id`, `label`, `description` և
   անգլերեն երեք `levels`-ներով (`lite`, `full`, `ultra`)։ Յուրաքանչյուր մակարդակ պետք է ավարտվի
   `${SHARED_BOUNDARIES}`-ով, որպեսզի կոդը, ուղիները, հրամանները, սխալներն ու URL-ները մնան անփոփոխ։
   Հրահանգի տեքստը պետք է լինի **ստատիկ և որոշակի** յուրաքանչյուր
   `(id, level, language)`-ի համար. `${SHARED_BOUNDARIES}`-ը միակ թույլատրելի ինտերպոլյացիան է։
2. **Թարգմանեք այն։** `i18n`-ի ներքո տրամադրեք առնվազն `pt-BR` բլոկ. `ponytail`-ը և
   `i-have-adhd`-ն (en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi) կառուցվածքի օրինակներն են։ Միալեզու լինելու միտումնավոր նախատեսված ոճը դրա փոխարեն սահմանում է `locale` (ինչպես `terse-cjk` → `zh`) և այնուհետև
   առաջարկվում է միայն այդ տեղայնացման համար։
3. **Թարմացրեք մատրիցի պաշտպանիչ ստուգումը** — ոճի լեզուներն ավելացրեք `BASELINE_LANGUAGES`-ում՝
   `tests/unit/compression/output-styles-i18n-matrix.test.ts` ֆայլում։ Ստուգումը մերժում է ցանկացած նոր,
   տեղայնացմամբ չսահմանափակված ոճ, որը չունի պահանջվող թարգմանությունները, եթե դրա համար առկա չէ
   բացահայտ `KNOWN_ENGLISH_ONLY` գրառում՝ հետևման խնդրի հղումով։
4. **Ավելացրեք յուրաքանչյուր ոճին հատուկ թեստ**՝ որպես օրինակ օգտագործելով
   `tests/unit/compression/i-have-adhd-catalog.test.ts`-ը. կատալոգի կառուցվածքը, սահմանների
   դրույթը յուրաքանչյուր մակարդակի համար և հենակետային ստուգում, որը հաստատում է, որ յուրաքանչյուր թարգմանություն գրված է իր
   լեզվով, այլ ոչ թե պատճենված է անգլերենից։
5. **Վերագրում**. եթե ոճը հարմարեցված է վերին մակարդակի նախագծից, նշեք դրա հեղինակային պատկանելությունը գրառման
   սկզբնաղբյուրի մեկնաբանության մեջ (օրինակ՝ `i-have-adhd` → ayghri/i-have-adhd, MIT)՝ նույն
   կանոնով, ինչ վերևում գտնվող «Վերին մակարդակի նախագծից ոգեշնչված բարելավման առաջարկում» բաժնում։

UI-ի, սխեմայի կամ հեռաչափության փոփոխություն անհրաժեշտ չէ. այդ մակերեսները ձևավորվում են կատալոգից։

---

## Լավագույն գործելակերպեր

### Շարժիչի մշակում

1. **Միշտ ներդրեք `validateConfig`-ը** — առանց վավերացման շարժիչներն առաջացնում են աննկատ ձախողումներ
2. **Սահմանեք իրատեսական `targetLatencyMs`** — ռազմավարության ընտրիչն այն օգտագործում է շարժիչներ ընտրելու համար
3. **Կառավարման վահանակի համար օգտագործեք `getConfigSchema`** — երբեք մի թաքցրեք կազմաձևն օգտատերերից
4. **Աջակցեք `stackable: true`-ին, եթե ձեր շարժիչը մաքուր է** — կողմնակի ազդեցություններ ունեցող շարժիչները չպետք է շարվեն
5. **Գրեք ներկառուցված թեստեր** — շարժիչները պետք է հնարավոր լինի ստուգել <1s-ում

### Լեզվային փաթեթի մշակում

1. **Սկսեք `lite` ինտենսիվությունից** — ձեր կանոնները պետք է անվտանգ լինեն ամենացածր կարգավորման դեպքում
2. **Կանոնների կիրառության տիրույթը սահմանելու համար օգտագործեք `context`** — միայն `user`-ին վերաբերող կանոնները չեն կարող պատահաբար ազդել համակարգային հուշումների վրա
3. **Խուսափեք JSON բանալիները որսալուց** — `\\bword\\b`-ը կարող է համընկնել JSON-ի ներսում՝ խախտելով կառուցվածքավորված տվյալները
4. **Թեստավորեք սահմանային դեպքերով** — դատարկ մուտք, Unicode, RTL տեքստ, էմոջիներ
5. **Որպես ձևանմուշ օգտագործեք առկա փաթեթները** — `en/filler.json`-ը ամենամշակված օրինակն է

### Խողովակաշարի նախագծում

1. **Օպտիմալացնելուց առաջ պրոֆիլավորեք** — նախ չափեք `compression_stats`-ով
2. **Վերաիրականացման փոխարեն նախընտրեք համադրումը** — նոր շարժիչ գրելուց առաջ ընդլայնեք Caveman-ի կանոնները
3. **Փաստաթղթավորեք հերթականության հիմնավորումը** — մեկնաբանեք, թե ինչու է A շարժիչը B-ից առաջ
4. **Թեստավորեք ինտենսիվության բոլոր 3 մակարդակներում** — `lite`-ը արագ է, բայց կորուստներով, `ultra`-ն՝ դանդաղ, բայց ճշգրիտ

---

## Տեղեկատու՝ ներկառուցված շարժիչներ

| Շարժիչի ID           | Համակցելի | Լռելյայն stackPriority | Թիրախներ                                                  |
| -------------------- | --------- | ---------------------- | --------------------------------------------------------- |
| `lite`               | Այո       | 5                      | հաղորդագրություններ, գործիքների արդյունքներ               |
| `rtk`                | Այո       | 10                     | գործիքների արդյունքներ                                    |
| `standard` (caveman) | Այո       | 20                     | հաղորդագրություններ, գործիքների արդյունքներ, կոդի բլոկներ |
| `aggressive`         | Այո       | 30                     | հաղորդագրություններ                                       |
| `ultra`              | Այո       | 40                     | հաղորդագրություններ, կոդի բլոկներ                         |

### Տես նաև

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — մշակման շղթայի ակնարկ
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — շարժիչների գրանցամատյանի տեղեկատու
- [COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md) — կանոնների ձևաչափի մասնագիր
- [COMPRESSION_LANGUAGE_PACKS.md](./COMPRESSION_LANGUAGE_PACKS.md) — լեզվական փաթեթների մանրամասներ
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — RTK շարժիչ և հատուկ զտիչներ
- Աղբյուր՝ `open-sse/services/compression/` (117 ֆայլ, ~250KB)
