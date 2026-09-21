# Extending the Compression Pipeline (ქართული)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/EXTENDING_COMPRESSION.md) · 🇪🇹 [am](../../../am/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇦 [ar](../../../ar/docs/compression/EXTENDING_COMPRESSION.md) · 🇦🇿 [az](../../../az/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇬 [bg](../../../bg/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇩 [bn](../../../bn/docs/compression/EXTENDING_COMPRESSION.md) · 🇨🇿 [cs](../../../cs/docs/compression/EXTENDING_COMPRESSION.md) · 🇩🇰 [da](../../../da/docs/compression/EXTENDING_COMPRESSION.md) · 🇩🇪 [de](../../../de/docs/compression/EXTENDING_COMPRESSION.md) · 🇬🇷 [el](../../../el/docs/compression/EXTENDING_COMPRESSION.md) · 🇪🇸 [es](../../../es/docs/compression/EXTENDING_COMPRESSION.md) · 🇪🇪 [et](../../../et/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇷 [fa](../../../fa/docs/compression/EXTENDING_COMPRESSION.md) · 🇫🇮 [fi](../../../fi/docs/compression/EXTENDING_COMPRESSION.md) · 🇫🇷 [fr](../../../fr/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇪 [ga](../../../ga/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [gu](../../../gu/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [ha](../../../ha/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇱 [he](../../../he/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [hi](../../../hi/docs/compression/EXTENDING_COMPRESSION.md) · 🇭🇷 [hr](../../../hr/docs/compression/EXTENDING_COMPRESSION.md) · 🇭🇺 [hu](../../../hu/docs/compression/EXTENDING_COMPRESSION.md) · 🇦🇲 [hy](../../../hy/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇩 [id](../../../id/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [ig](../../../ig/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇹 [it](../../../it/docs/compression/EXTENDING_COMPRESSION.md) · 🇯🇵 [ja](../../../ja/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇭 [km](../../../km/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [kn](../../../kn/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇷 [ko](../../../ko/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇹 [lt](../../../lt/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇻 [lv](../../../lv/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [ml](../../../ml/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [mr](../../../mr/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇾 [ms](../../../ms/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇹 [mt](../../../mt/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇲 [my](../../../my/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇵 [ne](../../../ne/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇱 [nl](../../../nl/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇴 [no](../../../no/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [or](../../../or/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [pa](../../../pa/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇭 [phi](../../../phi/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇱 [pl](../../../pl/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇹 [pt](../../../pt/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇴 [ro](../../../ro/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇺 [ru](../../../ru/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇰 [si](../../../si/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇰 [sk](../../../sk/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇮 [sl](../../../sl/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇸 [sr](../../../sr/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇪 [sv](../../../sv/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇪 [sw](../../../sw/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [ta](../../../ta/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [te](../../../te/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇭 [th](../../../th/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇷 [tr](../../../tr/docs/compression/EXTENDING_COMPRESSION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇰 [ur](../../../ur/docs/compression/EXTENDING_COMPRESSION.md) · 🇺🇿 [uz](../../../uz/docs/compression/EXTENDING_COMPRESSION.md) · 🇻🇳 [vi](../../../vi/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [yo](../../../yo/docs/compression/EXTENDING_COMPRESSION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/EXTENDING_COMPRESSION.md)

---

> **TL;DR**: OmniRoute-ის შეკუმშვის ძრავა **გაფართოებადია** — შეგიძლიათ დაარეგისტრიროთ მორგებული ძრავები, დაამატოთ ენობრივი პაკეტები ახალი ენებისთვის და შეადგინოთ მრავალსაფეხურიანი კონვეიერები. ეს სახელმძღვანელო გაჩვენებთ, როგორ.

**დაკავშირებული სახელმძღვანელოები:**

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — სრული კონვეიერის მიმოხილვა
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — ძრავების რეესტრი და ჩაშენებული ძრავები
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — RTK ძრავა და მორგებული ფილტრები
- [COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md) — წესების პაკეტის ფორმატის ცნობარი

---

## მიმოხილვა

შეკუმშვის სისტემას აქვს **3 გაფართოების წერტილი**:

| გაფართოების წერტილი             | გამოყენების შემთხვევა                                                                    | სირთულე  |
| ------------------------------- | ---------------------------------------------------------------------------------------- | -------- |
| **მორგებული ძრავა**             | სრულიად ახალი შეკუმშვის ალგორითმის დამატება (მაგ., დომენისთვის სპეციფიკური შემაჯამებელი) | მაღალი   |
| **ენობრივი პაკეტი**             | ახალი ბუნებრივი ენის მხარდაჭერის დამატება (მაგ., ჰინდი, არაბული)                         | საშუალო  |
| **მრავალსაფეხურიანი კონვეიერი** | არსებული ძრავების მორგებული თანმიმდევრობით გაერთიანება                                   | დამწყები |

```
┌─────────────────────────────────────────────────────────────┐
│                    შეკუმშვის სტრატეგია                       │
│                                                              │
│   შემავალი შეტყობინებები ──▶ getEffectiveMode() ──▶ რეჟიმი   │
│                                              │               │
│                      ┌───────────────────────┼──────────┐    │
│                      │         │         │         │    │    │
│                      ▼         ▼         ▼         ▼    │    │
│                   "rtk"    "lite"   "standard" "stacked"    │
│                      │         │         │         │    │    │
│                      ▼         ▼         ▼         ▼    │    │
│                   RTK       Lite     Caveman   engines[]   │
│                   ძრავა     ძრავა     ძრავა     ჯაჭვურად    │
│                      │         │         │         │    │    │
│                      └─────────┴─────────┴─────────┘    │    │
│                                      │                    │
│                                      ▼                    │
│                             შეკუმშული შედეგი              │
└─────────────────────────────────────────────────────────────┘

სტრატეგიის ამომრჩეველი ეფუძნება რეჟიმს: თითოეული მოთხოვნა ირჩევს ერთ რეჟიმს
(rtk / lite / standard / aggressive / ultra / stacked / off).
მხოლოდ რეჟიმი "stacked" აერთიანებს რამდენიმე ძრავას თანმიმდევრულ ჯაჭვში.
ნაგულისხმევი ავტომატურად გააქტიურებადი რეჟიმია "lite" (და არა 3-დონიანი პრიორიტეტული ჯაჭვი).
```

---

## მორგებული შეკუმშვის ძრავის შექმნა

ძრავის ინტერფეისი (`open-sse/services/compression/engines/types.ts`) არის კონტრაქტი, რომელსაც ყველა ძრავა უნდა აკმაყოფილებდეს. მას 5 სავალდებულო მეთოდი აქვს.

### `CompressionEngine` ინტერფეისი

```ts
interface CompressionEngine {
  id: string; // ძრავის უნიკალური ID
  name: string; // საჩვენებელი სახელი
  description: string; // მოკლე აღწერა
  icon: string; // ხატულა (ემოჯი ან URL)
  targets: CompressionEngineTarget[]; // ["messages", "tool_results", "code_blocks"]
  stackable: boolean; // შესაძლებელია მრავალსაფეხურიან კონვეიერში გამოყენება
  stackPriority: number; // თანმიმდევრობა მრავალსაფეხურიან კონვეიერებში (ნაკლები = უფრო ადრე)
  metadata: CompressionEngineMetadata;

  apply(body, options?): CompressionResult;
  compress(body, config?): CompressionResult;
  getConfigSchema(): EngineConfigField[];
  validateConfig(config): EngineValidationResult;
}
```

### მინიმალური მაგალითი: თეთრი სივრცის ძრავა

უმარტივესი შესაძლო ძრავა — შეტყობინებებიდან ზედმეტი თეთრი სივრცის მოცილება.

````ts
import type { CompressionEngine } from "omniroute/compression/engines/types";
import { registerCompressionEngine } from "omniroute/compression/engines/registry";

function preserveCodeBlocks(text: string): string {
  // დაყავით კოდის ბლოკების მარკერების მიხედვით და მათ შიგნით არსებული ჰარი შეინარჩუნეთ
  const parts = text.split(/(```[\s\S]*?```)/);
  return parts
    .map((part) => {
      if (part.startsWith("```")) {
        return part; // არ შეცვალოთ კოდის ბლოკები
      }
      return part.replace(/\n{3,}/g, "\n\n"); // გამოიყენეთ მხოლოდ პროზაული ტექსტისთვის
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
  stackPriority: 100, // გაუშვით caveman/rtk-ის შემდეგ

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

    // გაიარეთ შეტყობინებების მასივი — დაამუშავეთ როგორც სტრიქონული, ისე მრავალნაწილიანი შიგთავსი
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
      // მრავალნაწილიანი შიგთავსი: გაიარეთ ნაწილები და შეკუმშეთ მხოლოდ ტექსტური ნაწილები
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
          return part; // შეინარჩუნეთ image_url, tool_use და სხვ.
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

// გლობალურად დაარეგისტრირეთ
registerCompressionEngine(whitespaceEngine);
````

### სად განთავსდეს მორგებული ძრავები

```
~/.omniroute/compression/engines/my-engine.ts    # მომხმარებლის დონე
<project>/compression-engines/my-engine.ts        # პროექტის დონე (იტვირთება გაშვებისას)
```

ან ჩატვირთეთ პროგრამულად, პლაგინიდან:

```ts
// თქვენს პლაგინში
import {
  registerCompressionEngine,
  unregisterCompressionEngine,
} from "@omniroute/open-sse/services/compression/engines/registry";
import { myEngine } from "./engines/my-engine";

export default definePlugin({
  name: "my-compression-plugin",
  // პლაგინის SDK ხელმისაწვდომს ხდის onRequest / onResponse / onError ჰუკებს. დაარეგისტრირეთ
  // ძრავა პლაგინის მოდულის ჩატვირთვისას (ან პირველი onRequest-ის დროს); რეგისტრაცია გააუქმეთ
  // თქვენი საკუთარი დასრულების გზიდან.
  onRequest: async (ctx) => {
    registerCompressionEngine(myEngine);
  },
});

// დასრულებისას:
// unregisterCompressionEngine("my-engine");
```

### თქვენი ძრავის ტესტირება

დაარეგისტრირეთ თქვენი ძრავა პლაგინში ან გაშვების ფუნქციაში. რეგისტრაციის შემდეგ ძრავა ხელმისაწვდომი იქნება
სტრატეგიის ამომრჩეველში თავისი `id`-ის მეშვეობით. ინტეგრაცია შეამოწმეთ მისი სტეკურ კონვეიერში გაერთიანებით:

---

## ენის პაკეტების შექმნა

Caveman-ის სტილის შეკუმშვა იყენებს **კონკრეტული ენისთვის განკუთვნილ წესების პაკეტებს**, რათა თითოეულ ბუნებრივ ენაში დაამუშაოს შემავსებელი სიტყვები, აზრის შერბილება და სიტყვამრავალი კონსტრუქციები. OmniRoute-ს მოჰყვება **6 ენის პაკეტი**: `en`, `es`, `fr`, `de`, `ja`, `pt-BR`.

### პაკეტის სტრუქტურა

ენის პაკეტი არის **JSON ფაილების** დირექტორია მისამართზე `open-sse/services/compression/rules/<language>/`:

```
open-sse/services/compression/rules/
├── en/
│   ├── filler.json          # თავაზიანი ფრაზები, აზრის შერბილება, ზრდილობიანობა
│   ├── context.json         # კონტექსტის შემამცირებელი წესები
│   ├── dedup.json           # დუბლირების აღმოფხვრის წესები
│   ├── structural.json      # პუნქტუაცია, ფორმატირება
│   └── ultra.json           # აგრესიული შეკუმშვის წესები
├── es/  (იგივე სტრუქტურა)
├── fr/  (იგივე სტრუქტურა)
├── de/  (იგივე სტრუქტურა)
├── ja/  (იგივე სტრუქტურა)
└── pt-BR/ (იგივე სტრუქტურა)
```

### წესის ანატომია

თითოეულ წესს აქვს შემდეგი ფორმა (`open-sse/services/compression/ruleLoader.ts`-დან):

```ts
interface FileRule {
  name: string; // ადამიანისთვის გასაგები სახელი (kebab-case)
  pattern: string; // JavaScript-ის რეგულარული გამოსახულების ნიმუში
  replacement?: string; // რით უნდა ჩანაცვლდეს დამთხვევა
  replacementMap?: Record<string, string>; // ან გასაღები→ჩანაცვლების რუკა
  flags?: string; // რეგულარული გამოსახულების ალმები (ჩვეულებრივ, "gi")
  context?: "all" | "user" | "system" | "assistant";
  category?: "filler" | "context" | "structural" | "dedup" | "terse" | "ultra";
  minIntensity?: "lite" | "full" | "ultra"; // ამ ინტენსივობაზე დაბალი დონის შემთხვევაში გამოტოვება
  description?: string; // დოკუმენტაცია
}
```

### მაგალითი: ჰინდი ენის შემავსებელი სიტყვების წესების დამატება

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

### ვალიდაცია

ჩატვირთვისას წესების პაკეტები მოწმდება `_schema.json`-ის მიხედვით. არასწორი სტრუქტურის მქონე პაკეტი ვერ ჩაიტვირთება და შეცდომა ჟურნალში ჩაიწერება:

```
RULE_LOADER: pack "hi/filler.json" failed validation:
  - rules.0.pattern: Invalid regex
  - rules.1.context: must be one of [all, user, system, assistant]
```

ვალიდაცია ავტომატურად სრულდება პაკეტის ჩატვირთვისას (`_schema.json`-ის მიხედვით); არასწორი პაკეტი უარყოფილი იქნება და ზემოთ ნაჩვენები შეცდომა ჟურნალში ჩაიწერება. პაკეტის ვალიდაციისთვის ცალკე `npm run` სკრიპტი არ არსებობს — ჩატვირთეთ პაკეტი (მაგალითად, გაუშვით სერვერი ან შეამოწმეთ შეკუმშვის გზა) და დააკვირდით ჟურნალებს.

### მორგებული ენის პაკეტის ჩატვირთვა

```ts
import { loadRulePack } from "omniroute/compression/ruleLoader";

await loadRulePack("./my-custom-rules/hi/filler.json");
```

ან განათავსეთ აღიარებულ მდებარეობაში:

```
~/.omniroute/compression/rules/hi/filler.json  # მომხმარებლის დონე
<project>/.compression/rules/hi/filler.json   # პროექტის დონე
```

### ენის პაკეტების საუკეთესო პრაქტიკები

1. **დაიწყეთ `filler`-ით** — ეს წესები ყველაზე დიდ გავლენას ახდენს
2. **აგრესიული წესების შესაზღუდად გამოიყენეთ `minIntensity`** — ეს ზედმეტი შეკუმშვისგან იცავს
3. **დაამატეთ სატესტო შემთხვევები** — ქცევის შესამოწმებლად JSON-ში დაამატეთ `tests[]` მასივი
4. **თანმიმდევრობას მნიშვნელობა აქვს** — უფრო ადრეული წესები პირველები გამოიყენება; ყველაზე დიდი გავლენის მქონე წესები დასაწყისში განათავსეთ
5. **ფრთხილად გამოიყენეთ `replacement`** — ცარიელი სტრიქონი, როგორც წესი, სწორი არჩევანია; არასოდეს დაამატოთ ახალი შიგთავსი

### თარგმნის სტრატეგია

წესების პაკეტების ახალ ენაზე ლოკალიზებისას:

1. **თარგმნეთ წესების სახელები** — ისინი გამართვის გამომავალ მონაცემებში გამოჩნდება
2. **მოარგეთ რეგულარული გამოსახულების ნიმუშები** — პირდაპირი თარგმანი ხშირად არ მუშაობს (სიტყვების საზღვრები განსხვავდება)
3. **გამოსცადეთ რეალურ საუბრებზე** — პაკეტი რეალურ შეყვანაზე უსაფრთხოდ უნდა მუშაობდეს
4. **გაითვალისწინეთ კულტურული ნორმები** — მაგალითად, იაპონურ პაკეტებში უფრო მეტი თავაზიანობის აღმნიშვნელი შემავსებელი სიტყვაა, ვიდრე ინგლისურში

---

## თანმიმდევრული კონვეიერები

**თანმიმდევრული კონვეიერი** რამდენიმე ძრავას თანმიმდევრობით უშვებს, სადაც თითოეული ძრავის გამომავალი მონაცემები მომდევნო ძრავას გადაეცემა. სწორედ ასე მუშაობს `mode: stacked` შიდა დონეზე.

### როგორ მუშაობს თანმიმდევრული დამუშავება

```
შეყვანა (10,000 ტოკენი)
        │
        ▼
   ┌──────────┐
   │  ძრავა   │  პრიორიტეტი 10
   │  A       │  ──▶ შედეგი: 6,000 ტოკენი (-40%)
   └────┬─────┘
        ▼
   ┌──────────┐
   │  ძრავა   │  პრიორიტეტი 50
   │  B       │  ──▶ შედეგი: 2,400 ტოკენი (-60%)
   └────┬─────┘
        ▼
   ┌──────────┐
   │  ძრავა   │  პრიორიტეტი 100
   │  C       │  ──▶ შედეგი: 1,200 ტოკენი (-80%)
   └────┬─────┘
        │
        ▼
საბოლოო შედეგი (1,200 ტოკენი, ჯამურად ~88% ეკონომია)
```

როდესაც არჩეულია `mode: "stacked"`, ძრავები თანმიმდევრულად სრულდება `pipeline` მასივში მითითებული რიგითობით.
N ძრავის შედეგი N+1 ძრავის შეყვანად იქცევა.

### შეკუმშვის რეჟიმები

OmniRoute თითოეული მოთხოვნისთვის ირჩევს **ერთ რეჟიმს** კონფიგურაციის, ავტომატური გააქტიურების ზღვრებისა და კომბინაციის გადაფარვების საფუძველზე.
ხელმისაწვდომი რეჟიმები განსაზღვრულია `open-sse/services/compression/types.ts`-ში (`CompressionMode` ტიპი):

| რეჟიმი       | ძრავები              | გამოყენების შემთხვევა                                                                                                                                                                                                         |
| ------------ | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `off`        | არცერთი              | ყველა სახის შეკუმშვის გამორთვა                                                                                                                                                                                                |
| `rtk`        | მხოლოდ RTK           | ბრძანებების შედეგებით დატვირთული სესიები (80%+-იანი ეკონომია)                                                                                                                                                                 |
| `lite`       | მხოლოდ Lite          | კონსერვატიული შეკუმშვა (სწრაფი, უსაფრთხო)                                                                                                                                                                                     |
| `standard`   | Caveman              | პროზის შეკუმშვა ენობრივი პაკეტებით                                                                                                                                                                                            |
| `aggressive` | Caveman + Aggressive | პროზის აგრესიული შეკუმშვა + აგრესიული საბოლოო გავლა                                                                                                                                                                           |
| `ultra`      | Ultra                | მაქსიმალური შეკუმშვა (დანაკარგიანი, უკიდურესი ზომა). სურვილისამებრ, მოთხოვნა გადის **LLMLingua-2** SLM ძრავაზე, როდესაც დაყენებულია `ultra.modelPath` (თუ მოდელი მიუწვდომელია, წესებზე დაფუძნებულ გზაზე ავტომატურად გადადის). |
| `stacked`    | მორგებული კონვეიერი  | ძრავების ნებისმიერი თანმიმდევრობით გაერთიანება (იხილეთ ქვემოთ)                                                                                                                                                                |

> ზემოთ ჩამოთვლილი რეჟიმების ძრავების გარდა, რეესტრს ასევე მოჰყვება სპეციალიზებული, კონვეიერში ჩასართავი ძრავები —
> **CCR**, **headroom**, **ionizer** და **session-dedup** — რომლებიც დოკუმენტირებულია
> [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md#additional-built-in-engines)-ში.

რეჟიმის არჩევას განსაზღვრავს `getEffectiveMode()` ფუნქცია `open-sse/services/compression/strategySelector.ts`-ში:

1. თუ შეკუმშვა გამორთულია: `"off"`
2. თუ არსებობს კომბინაციის გადაფარვა: გამოიყენება გადაფარვა
3. თუ ავტომატური გააქტიურების ზღვარი გადაჭარბებულია: გამოიყენება `autoTriggerMode` (ნაგულისხმევი: `"lite"`)
4. სხვა შემთხვევაში: გამოიყენება `defaultMode`

### ნაგულისხმევი თანმიმდევრული კონვეიერი

როდესაც `mode: "stacked"` ცხადად არის კონფიგურირებული, ნაგულისხმევი კონვეიერი აერთიანებს:

1. **RTK** — ბრძანების შედეგებიდან ხმაურის მოცილება (ტერმინალის შედეგებზე ~80%-იანი ეკონომია)
2. **Caveman** — შემავსებელი სიტყვების მოცილება და პროზის შემოკლება (დარჩენილ ტექსტზე ~46%)
3. **Lite** — ჰარების საბოლოო გასუფთავება + დუბლიკატების მოცილების გავლა

ეს კომბინაცია ხელსაწყოებით დატვირთულ სესიებზე **78-95%-იან ეკონომიას** უზრუნველყოფს.

### თანმიმდევრული კონვეიერების კონფიგურაცია

კომბინაციის კონფიგურაციაში:

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

შეგიძლიათ გამოტოვოთ ძრავები, დაამატოთ მორგებული ძრავები ან შეცვალოთ მათი თანმიმდევრობა.

### მდგომარეობის გადაცემა

ძრავებს შეუძლიათ მოთხოვნის კონტექსტიდან (`options`-ში) მეტამონაცემების წაკითხვა:

```ts
compress(body, config) {
  // წინა ძრავებიდან მეტამონაცემების წაკითხვა
  const original = options?.compressionComboId;  // "my-coding-combo"
  // ...
}
```

მეტამონაცემები **მხოლოდ წასაკითხია** — ძრავებს არ შეუძლიათ მოთხოვნის კონტექსტის შეცვლა; მათ მხოლოდ საკუთარი გამომავალი სხეულის შეცვლა შეუძლიათ.

### შესრულების თანმიმდევრობის ნიუანსები

| ძრავების თანმიმდევრობა                                  | ეფექტი                                                                                               |
| ------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| RTK → Caveman → Lite                                    | **რეკომენდებულია** (ჯერ ხმაურს აშორებს, შემდეგ ენას ამუშავებს, ბოლოს კი ჰარებს)                      |
| Lite → RTK → Caveman                                    | ცუდია — Lite დაუმუშავებელი შედეგიდან ჰარებს შლის, რის გამოც RTK-ის შაბლონების დამთხვევა ვერ ხერხდება |
| Caveman → RTK                                           | ცუდია — Caveman-მა შესაძლოა ტექსტი ისე გადაწეროს, რომ RTK-მა ის ვეღარ ამოიცნოს                       |
| ნებისმიერი თანმიმდევრობა, სადაც `tool_results` პირველია | უკეთესია — ხელსაწყოს შედეგი ყველაზე ხმაურიანი შიგთავსია                                              |

### როდის არ უნდა გამოიყენოთ თანმიმდევრული კონვეიერი

თანმიმდევრული დამუშავება ყოველთვის უკეთესი არ არის:

- **მარტივი შეტყობინებები** (ხელსაწყოს შედეგის გარეშე) — მხოლოდ Caveman ან Lite საკმარისია
- **ხარჯებისადმი მგრძნობიარე შემთხვევები** — თითოეული ძრავა ~5-50ms დაყოვნებას ამატებს
- **კონკრეტული ხელსაწყოები** — გარსის შედეგებისთვის, როგორც წესი, მხოლოდ RTK საკმარისია

### მორგებული კონვეიერის შექმნა

სახელდებული pipeline-ების რეესტრი არ არსებობს. stacked pipeline უბრალოდ **ნაბიჯების inline მასივია**, რომელიც გადაეცემა `applyStackedCompression()`-ს (ექსპორტირებულია
`@omniroute/open-sse/services/compression/strategySelector`-დან):

```ts
import { applyStackedCompression } from "@omniroute/open-sse/services/compression/strategySelector";

const result = applyStackedCompression(body, [
  { engine: "rtk", intensity: "aggressive" },
  { engine: "caveman", intensity: "full" },
]);
```

თუ pipeline-ს არ გადასცემთ, ნაგულისხმევად გამოიყენება `rtk(standard) → caveman(full)`.

კონფიგურაციიდან მის სამართავად დააყენეთ `mode: "stacked"` და ნაბიჯების მასივი მიუთითეთ
`stackedPipeline`-ში (იკითხება `config.stackedPipeline`-დან):

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

## ზედა დონის წყაროებთან სინქრონიზაციის პოლიტიკა

OmniRoute-ის შეკუმშვის ძრავები README-ში რამდენიმე ზედა დონის პროექტს უთითებენ
("შთაგონებულია RTK-ით, Caveman-ით, LLMLingua-2-ით, Troglodita-ით"). კონტრიბუტორების
ხშირი შეკითხვაა: **როდესაც ზედა დონის RTK ახალ ხელსაწყოს ფილტრს ამატებს ან Caveman
წესების პაკეტს ამატებს, როგორ ხვდება ეს OmniRoute-ში?** ეს სექცია ავტორიტეტული პასუხია.

### ვენდორირებული ასლები და დამოუკიდებელი იმპლემენტაციები

| ძრავა                        | კავშირი ზედა დონის პროექტთან                                                                                                       | მდებარეობა                                                          |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| **RTK**                      | **დამოუკიდებელი რეიმპლემენტაცია** (შთაგონებული, არა ასლი)                                                                          | `open-sse/services/compression/engines/rtk/`                        |
| **Caveman**                  | **დამოუკიდებელი რეიმპლემენტაცია** (შთაგონებული)                                                                                    | `open-sse/services/compression/engines/cavemanAdapter.ts`           |
| **Headroom**                 | ძირითადად შიდა; მხოლოდ `gcf/` კოდეკია **რეალურად ვენდორირებული** `gcf-typescript`-იდან (MIT, SPDX-ნიშნიანი, მხოლოდ ზოგადი პროფილი) | `open-sse/services/compression/engines/headroom/gcf/`               |
| **LLMLingua-2 / Troglodita** | შთაგონებული (წარმოადგენს `llmlingua` + `session-dedup` ძრავების საფუძველს)                                                         | `open-sse/services/compression/engines/llmlingua/`, `session-dedup` |

მთავარი აზრი: **RTK და Caveman წარმოადგენს _იდეების_ (ფილტრაციის წესები, წესების
პაკეტები) სუფთა ფურცლიდან შექმნილ TypeScript იმპლემენტაციებს და არა ვენდორირებულ
წყაროს ხეებს.** არ არსებობს ზედა დონის ასლი, საიდანაც `git pull` შეიძლება შესრულდეს
— სწორედ ამიტომ README-ში წერია „შთაგონებულია“ და არა „შეფუთულია“.

### როგორ ხდება ზედა დონის გაუმჯობესებების შერწყმა

**არ არსებობს ზედა დონის რელიზების ავტომატური თვალყურის დევნება და არც
`compression-sync` ჭდე** — ეს განზრახაა. რადგან ძრავები რეიმპლემენტაციებია, ზედა
დონის RTK ფილტრი ან Caveman-ის წესების პაკეტი კოდის სახით არ ერთიანდება; ამის
ნაცვლად, იგი **ხელახლა გამოიხატება ახალ წესად/ფილტრად OmniRoute-ის საკუთარ
ფორმატში** (იხილეთ
[COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md)) და ჩვეულებრივი PR-ის
მეშვეობით საჭიროებისამებრ ემატება. ზემოთ მოცემული გაფართოების წერტილები
(მორგებული ძრავა, ენის პაკეტი, RTK ფილტრი) მათი დამატების ნებადართული გზაა.

ამ პროცესის უახლესი მაგალითები:

- RTK ფილტრები Gradle-ისა და `dotnet`-ის აგების გამომავალი მონაცემებისთვის (v3.8.42)
- RTK ფილტრები kubectl / docker-build / composer / gh-ისთვის (#2824)
- Caveman-ის ინდონეზიური ენის პაკეტი (#3975), ასევე გერმანული / ფრანგული / იაპონური / ჩინური პაკეტები

### Headroom (შეყვანის შეკუმშვის პროქსი)

Headroom **სრულად შიდაა** — ჩამაგრებული ვენდორირებული `gcf` კოდეკის სნეპშოტი და
OmniRoute-ის საკუთარი `smartcrusher` / `toon` / `tabular` შრეები. ვენდორირებული
ასლის გარდა, თვალყურის სადევნებელი აქტიური ზედა დონის წყარო არ არსებობს;
`gcf`-ის განახლებები ხელით ახლდება, როდესაც კოდეკი იცვლება, შემდეგ კი ხელახლა
მოწმდება შეკუმშვის ბიუჯეტის შემოწმების ეტაპის (`check:compression-budget`) მიმართ.

### ზედა დონის პროექტით შთაგონებული გაუმჯობესების შეთავაზება

1. **ნუ მოახდენთ ვენდორირებას** — ზედა დონის წესი/ფილტრი ხელახლა გამოხატეთ OmniRoute-ის ფორმატში.
2. დაამატეთ იგი ქვემოთ მოცემული შესაბამისი გაფართოების წერტილის მეშვეობით (ენის პაკეტი, RTK ფილტრი ან
   მორგებული ძრავა).
3. PR-ის აღწერაში მიუთითეთ ზედა დონის პროექტი (ავტორობის აღნიშვნისთვის) და არ
   დააკოპიროთ მისი ლიცენზიის შემცველი წყარო.
4. დაამატეთ ტესტები და დაადასტურეთ, რომ `check:compression-budget` შემოწმების ეტაპი კვლავ წარმატებით სრულდება.

---

## გამოტანის სტილის დამატება

გამოტანის სტილები (იხილეთ [სახელმძღვანელოს კატალოგის ცხრილი](./COMPRESSION_GUIDE.md#output-styles-catalog))
შეყვანის ძრავების საპასუხო მხარის ანალოგია: იმის შეკუმშვის ნაცვლად, რასაც
აგზავნით, ისინი მოდელს უფრო იაფი გამოტანის შექმნას ავალებენ. რეესტრია
`OUTPUT_STYLE_CATALOG` ფაილში `open-sse/services/compression/outputStyles/catalog.ts`, და
**კატალოგის ერთი ჩანაწერი მთლიანი ფუნქციონალია**: ინჟექტორი, მართვის პანელის პარამეტრების პანელი,
მუდმივი შენახვა და ტელემეტრია — ყველა კატალოგს ჩამოთვლის; სხვა განსახლებელი სია არ არსებობს.

1. **დაამატეთ ერთი ჩანაწერი `OUTPUT_STYLE_CATALOG`-ში** ველებით `id`, `label`, `description` და
   სამი ინგლისური `levels` (`lite`, `full`, `ultra`). თითოეული დონე უნდა სრულდებოდეს
   `${SHARED_BOUNDARIES}`-ით, რათა კოდი, გზები, ბრძანებები, შეცდომები და URL-ები უცვლელად დარჩეს.
   ინსტრუქციის ტექსტი უნდა იყოს **სტატიკური და დეტერმინისტული** თითოეული
   `(id, level, language)`-ისთვის — `${SHARED_BOUNDARIES}` ერთადერთი დაშვებული ინტერპოლაციაა.
2. **თარგმნეთ ის.** `i18n`-ის ქვეშ დაამატეთ სულ მცირე `pt-BR` ბლოკი; `ponytail` და
   `i-have-adhd` (en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi) სანიმუშო სტრუქტურებია. განზრახ
   ერთენოვანი სტილი ამის ნაცვლად ადგენს `locale`-ს (როგორც `terse-cjk` → `zh`) და შემდეგ
   მხოლოდ ამ ლოკალისთვის არის შეთავაზებული.
3. **განაახლეთ მატრიცის შემოწმება** — დაამატეთ სტილის ენები `BASELINE_LANGUAGES`-ში,
   ფაილში `tests/unit/compression/output-styles-i18n-matrix.test.ts`. შემოწმება ვერ გაივლის, თუ ნებისმიერ ახალ,
   ლოკალით შეუზღუდავ სტილს საჭირო თარგმანები არ აქვს, გარდა იმ შემთხვევისა, როცა მას ახლავს
   მკაფიო `KNOWN_ENGLISH_ONLY` ჩანაწერი თვალყურის სადევნებელი საკითხით.
4. **დაამატეთ თითოეული სტილისთვის განკუთვნილი ტესტი**, რომელიც ეფუძნება
   `tests/unit/compression/i-have-adhd-catalog.test.ts`-ს: კატალოგის სტრუქტურა, საზღვრების
   პუნქტი თითოეული დონისთვის და საკვანძო მტკიცება, რომ თითოეული თარგმანი საკუთარ ენაზეა დაწერილი
   და არა ინგლისურიდან დაკოპირებული.
5. **წყაროს მითითება**: თუ სტილი ადაპტირებულია გარე პროექტიდან, მიუთითეთ ის
   ჩანაწერის წყაროს კომენტარში (მაგ., `i-have-adhd` → ayghri/i-have-adhd, MIT) — იგივე
   წესი მოქმედებს, რაც ზემოთ მოცემულ „გარე პროექტით შთაგონებული გაუმჯობესების შეთავაზებაში“.

UI-ის, სქემის ან ტელემეტრიის შეცვლა საჭირო არ არის — ეს ზედაპირები კატალოგიდან რენდერდება.

---

## საუკეთესო პრაქტიკები

### ძრავის შემუშავება

1. **ყოველთვის განახორციელეთ `validateConfig`** — ვალიდაციის არმქონე ძრავები უხმაურო შეცდომებს იწვევს
2. **დააყენეთ რეალისტური `targetLatencyMs`** — მას სტრატეგიის ამრჩევი ძრავების შესარჩევად იყენებს
3. **მართვის პანელისთვის გამოიყენეთ `getConfigSchema`** — კონფიგურაცია მომხმარებლებისგან არასოდეს დამალოთ
4. **უზრუნველყავით `stackable: true`-ის მხარდაჭერა, თუ თქვენი ძრავა წმინდაა** — გვერდითი ეფექტების მქონე ძრავები არ უნდა დაჯგუფდეს
5. **დაწერეთ ჩაშენებული ტესტები** — ძრავების შემოწმება <1s-ში უნდა იყოს შესაძლებელი

### ენის პაკეტის შემუშავება

1. **დაიწყეთ `lite` ინტენსივობით** — თქვენი წესები ყველაზე დაბალ პარამეტრზეც უსაფრთხო უნდა იყოს
2. **წესების მოქმედების არეალის განსასაზღვრად გამოიყენეთ `context`** — მხოლოდ `user`-ისთვის განკუთვნილი წესები სისტემურ მოთხოვნებზე შემთხვევით ვერ იმოქმედებს
3. **მოერიდეთ JSON გასაღებების დამთხვევას** — `\\bword\\b` შეიძლება JSON-ის შიგნით დაემთხვეს და სტრუქტურირებული მონაცემები დააზიანოს
4. **ტესტირება ჩაატარეთ ზღვრულ შემთხვევებზე** — ცარიელი შეყვანა, Unicode, RTL ტექსტი, ემოჯიები
5. **შაბლონებად გამოიყენეთ არსებული პაკეტები** — `en/filler.json` ყველაზე მეტად დამუშავებული მაგალითია

### კონვეიერის დიზაინი

1. **ოპტიმიზაციამდე პროფილირება ჩაატარეთ** — ჯერ გაზომეთ `compression_stats`-ის გამოყენებით
2. **ხელახალ იმპლემენტაციას კომპოზიცია ამჯობინეთ** — ახალი ძრავის დაწერამდე გააფართოეთ Caveman-ის წესები
3. **დაასაბუთეთ თანმიმდევრობა დოკუმენტაციაში** — კომენტარში ახსენით, რატომ არის ძრავა A ძრავა B-მდე
4. **ტესტირება სამივე ინტენსივობის დონეზე ჩაატარეთ** — `lite` სწრაფია, მაგრამ დანაკარგიანი; `ultra` ნელია, მაგრამ ზუსტი

---

## ცნობარი: ჩაშენებული ძრავები

| ძრავის ID            | კომბინირებადი | ნაგულისხმევი stackPriority | სამიზნეები                                       |
| -------------------- | ------------- | -------------------------- | ------------------------------------------------ |
| `lite`               | დიახ          | 5                          | შეტყობინებები, ხელსაწყოს შედეგები                |
| `rtk`                | დიახ          | 10                         | ხელსაწყოს შედეგები                               |
| `standard` (caveman) | დიახ          | 20                         | შეტყობინებები, ხელსაწყოს შედეგები, კოდის ბლოკები |
| `aggressive`         | დიახ          | 30                         | შეტყობინებები                                    |
| `ultra`              | დიახ          | 40                         | შეტყობინებები, კოდის ბლოკები                     |

### აგრეთვე იხილეთ

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — კონვეიერის მიმოხილვა
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — ძრავების რეესტრის ცნობარი
- [COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md) — წესების ფორმატის სპეციფიკაცია
- [COMPRESSION_LANGUAGE_PACKS.md](./COMPRESSION_LANGUAGE_PACKS.md) — ენობრივი პაკეტების დეტალები
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — RTK ძრავა და მორგებული ფილტრები
- წყარო: `open-sse/services/compression/` (117 ფაილი, ~250KB)
