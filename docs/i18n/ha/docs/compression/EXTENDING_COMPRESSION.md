# Extending the Compression Pipeline (Hausa)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/EXTENDING_COMPRESSION.md) · 🇪🇹 [am](../../../am/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇦 [ar](../../../ar/docs/compression/EXTENDING_COMPRESSION.md) · 🇦🇿 [az](../../../az/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇬 [bg](../../../bg/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇩 [bn](../../../bn/docs/compression/EXTENDING_COMPRESSION.md) · 🇨🇿 [cs](../../../cs/docs/compression/EXTENDING_COMPRESSION.md) · 🇩🇰 [da](../../../da/docs/compression/EXTENDING_COMPRESSION.md) · 🇩🇪 [de](../../../de/docs/compression/EXTENDING_COMPRESSION.md) · 🇬🇷 [el](../../../el/docs/compression/EXTENDING_COMPRESSION.md) · 🇪🇸 [es](../../../es/docs/compression/EXTENDING_COMPRESSION.md) · 🇪🇪 [et](../../../et/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇷 [fa](../../../fa/docs/compression/EXTENDING_COMPRESSION.md) · 🇫🇮 [fi](../../../fi/docs/compression/EXTENDING_COMPRESSION.md) · 🇫🇷 [fr](../../../fr/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇪 [ga](../../../ga/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [gu](../../../gu/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇱 [he](../../../he/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [hi](../../../hi/docs/compression/EXTENDING_COMPRESSION.md) · 🇭🇷 [hr](../../../hr/docs/compression/EXTENDING_COMPRESSION.md) · 🇭🇺 [hu](../../../hu/docs/compression/EXTENDING_COMPRESSION.md) · 🇦🇲 [hy](../../../hy/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇩 [id](../../../id/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [ig](../../../ig/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇹 [it](../../../it/docs/compression/EXTENDING_COMPRESSION.md) · 🇯🇵 [ja](../../../ja/docs/compression/EXTENDING_COMPRESSION.md) · 🇬🇪 [ka](../../../ka/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇭 [km](../../../km/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [kn](../../../kn/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇷 [ko](../../../ko/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇹 [lt](../../../lt/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇻 [lv](../../../lv/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [ml](../../../ml/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [mr](../../../mr/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇾 [ms](../../../ms/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇹 [mt](../../../mt/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇲 [my](../../../my/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇵 [ne](../../../ne/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇱 [nl](../../../nl/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇴 [no](../../../no/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [or](../../../or/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [pa](../../../pa/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇭 [phi](../../../phi/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇱 [pl](../../../pl/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇹 [pt](../../../pt/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇴 [ro](../../../ro/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇺 [ru](../../../ru/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇰 [si](../../../si/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇰 [sk](../../../sk/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇮 [sl](../../../sl/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇸 [sr](../../../sr/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇪 [sv](../../../sv/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇪 [sw](../../../sw/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [ta](../../../ta/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [te](../../../te/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇭 [th](../../../th/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇷 [tr](../../../tr/docs/compression/EXTENDING_COMPRESSION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇰 [ur](../../../ur/docs/compression/EXTENDING_COMPRESSION.md) · 🇺🇿 [uz](../../../uz/docs/compression/EXTENDING_COMPRESSION.md) · 🇻🇳 [vi](../../../vi/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [yo](../../../yo/docs/compression/EXTENDING_COMPRESSION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/EXTENDING_COMPRESSION.md)

---

> **A taƙaice**: Injin matsawar OmniRoute **mai karɓar kari ne** — za ka iya yin rajistar injuna na musamman, samar da fakitin harsuna don sababbin harsuna, da kuma haɗa bututun sarrafawa masu jere. Wannan jagorar tana nuna yadda ake yin hakan.

**Jagorori masu alaƙa:**

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — Cikakken bayani kan bututun sarrafawa
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — Rijistar injuna da injunan da aka haɗa tun farko
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — Injin RTK da matatan musamman
- [COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md) — Manazartar tsarin fakitin ƙa’idoji

---

## Bayani Gabaɗaya

Tsarin matsawar yana da **wuraren faɗaɗawa guda 3**:

| Wurin faɗaɗawa                 | Amfanin da aka yi niyya                                                               | Wahala     |
| ------------------------------ | ------------------------------------------------------------------------------------- | ---------- |
| **Injin musamman**             | Ƙara sabon algoritim na matsawa gaba ɗaya (misali, mai taƙaita bayanai na wani fanni) | Na ci gaba |
| **Fakitin harshe**             | Ƙara tallafi ga sabon harshe na ɗan Adam (misali, Hindi, Larabci)                     | Matsakaici |
| **Bututun sarrafawa mai jere** | Haɗa injunan da ake da su bisa wani tsari na musamman                                 | Na mafari  |

```
┌─────────────────────────────────────────────────────────────┐
│                    Dabarar Matsawa                           │
│                                                              │
│   Saƙonnin shigarwa ──▶ getEffectiveMode() ──▶ yanayi       │
│                                              │               │
│                      ┌───────────────────────┼──────────┐    │
│                      │         │         │         │    │    │
│                      ▼         ▼         ▼         ▼    │    │
│                   "rtk"    "lite"   "standard" "stacked"    │
│                      │         │         │         │    │    │
│                      ▼         ▼         ▼         ▼    │    │
│                   Injin     Injin    Injin     engines[]   │
│                   RTK       Lite     Caveman   masu jere   │
│                      │         │         │         │    │    │
│                      └─────────┴─────────┴─────────┘    │    │
│                                      │                    │
│                                      ▼                    │
│                             Fitowar da aka matsa           │
└─────────────────────────────────────────────────────────────┘

Mai zaɓin dabara ya dogara ne KAN YANAYI: kowace buƙata tana zaɓar yanayi ƊAYA
(rtk / lite / standard / aggressive / ultra / stacked / off).
Yanayin "stacked" ne kaɗai yake jera injuna da yawa a bi da bi.
Tsohon yanayin kunnawa ta atomatik shi ne "lite" (ba jerin fifiko mai matakai 3 ba).
```

---

## Rubuta Injin Matsawa na Musamman

Keɓancewar injin (`open-sse/services/compression/engines/types.ts`) ita ce yarjejeniyar da kowane inji dole ne ya cika. Tana da hanyoyi guda 5 da ake buƙata.

### Keɓancewar `CompressionEngine`

```ts
interface CompressionEngine {
  id: string; // ID na musamman na injin
  name: string; // Sunan da za a nuna
  description: string; // Taƙaitaccen bayani
  icon: string; // Alama (emoji ko URL)
  targets: CompressionEngineTarget[]; // ["messages", "tool_results", "code_blocks"]
  stackable: boolean; // Ko za a iya amfani da shi a bututun sarrafawa mai jere
  stackPriority: number; // Tsari a cikin bututun sarrafawa masu jere (ƙarami = farko)
  metadata: CompressionEngineMetadata;

  apply(body, options?): CompressionResult;
  compress(body, config?): CompressionResult;
  getConfigSchema(): EngineConfigField[];
  validateConfig(config): EngineValidationResult;
}
```

### Misali Mafi Sauƙi: Injin Whitespace

Inji mafi sauƙi da zai yiwu — cire rarar farin sarari daga saƙonni.

````ts
import type { CompressionEngine } from "omniroute/compression/engines/types";
import { registerCompressionEngine } from "omniroute/compression/engines/registry";

function preserveCodeBlocks(text: string): string {
  // Raba ta alamomin tubalan lamba kuma a kiyaye sararin da ke cikinsu
  const parts = text.split(/(```[\s\S]*?```)/);
  return parts
    .map((part) => {
      if (part.startsWith("```")) {
        return part; // Kada a gyara tubalan lamba
      }
      return part.replace(/\n{3,}/g, "\n\n"); // Aiwatar da wannan ga rubutu kawai
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
  stackPriority: 100, // Gudanar BAYAN caveman/rtk

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

    // Bi cikin jeren saƙonni — sarrafa abun ciki na kirtani da na sassa da yawa
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
      // Abun ciki mai sassa da yawa: bi cikin sassan, matsa sassan rubutu kawai
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
          return part; // kiyaye image_url, tool_use, da sauransu.
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

// Yi rajista a duniya baki ɗaya
registerCompressionEngine(whitespaceEngine);
````

### Inda Za a Sanya Injunan Musamman

```
~/.omniroute/compression/engines/my-engine.ts    # Na matakin mai amfani
<project>/compression-engines/my-engine.ts        # Na matakin aikin (ana loda shi yayin farawa)
```

Ko kuma a loda shi ta hanyar shirye-shirye daga plugin:

```ts
// A cikin plugin ɗinka
import {
  registerCompressionEngine,
  unregisterCompressionEngine,
} from "@omniroute/open-sse/services/compression/engines/registry";
import { myEngine } from "./engines/my-engine";

export default definePlugin({
  name: "my-compression-plugin",
  // SDK na plugin yana samar da hooks na onRequest / onResponse / onError. Yi rajistar
  // injin lokacin da aka loda tsarin plugin (ko a onRequest na farko); cire rajistarsa
  // ta hanyar tsarin teardown naka.
  onRequest: async (ctx) => {
    registerCompressionEngine(myEngine);
  },
});

// Yayin teardown:
// unregisterCompressionEngine("my-engine");
```

### Gwada Injinka

Yi rajistar injinka a cikin plugin ko aikin farawa. Da zarar an yi rajistarsa, injin zai kasance samuwa
a cikin mai zaɓin dabaru ta hanyar `id` nasa. Gwada haɗin kai ta hanyar haɗa shi a cikin pipeline mai tarawa:

---

## Ƙirƙirar Kunshin Harsuna

Matsewa irin ta Caveman tana amfani da **kunshin ƙa'idoji na musamman ga kowane harshe** don sarrafa kalmomin cikawa, kalaman rashin tabbaci, da tsarin magana mai tsawo a kowane harshe na ɗan Adam. OmniRoute ya zo da **kunshin harsuna 6**: `en`, `es`, `fr`, `de`, `ja`, `pt-BR`.

### Tsarin Kunshi

Kunshin harshe kundin adireshi ne na **fayilolin JSON** a ƙarƙashin `open-sse/services/compression/rules/<language>/`:

```
open-sse/services/compression/rules/
├── en/
│   ├── filler.json          # Gaisuwa, kalaman rashin tabbaci, ladabi
│   ├── context.json         # Ƙa'idojin rage mahallin bayani
│   ├── dedup.json           # Ƙa'idojin cire maimaituwa
│   ├── structural.json      # Alamomin rubutu, tsara rubutu
│   └── ultra.json           # Ƙa'idojin matsewa mai tsanani
├── es/  (tsari iri ɗaya)
├── fr/  (tsari iri ɗaya)
├── de/  (tsari iri ɗaya)
├── ja/  (tsari iri ɗaya)
└── pt-BR/ (tsari iri ɗaya)
```

### Siffar Ƙa'ida

Kowace ƙa'ida tana da wannan siffa (daga `open-sse/services/compression/ruleLoader.ts`):

```ts
interface FileRule {
  name: string; // Suna mai sauƙin karantawa ga ɗan Adam (kebab-case)
  pattern: string; // Tsarin JavaScript regex
  replacement?: string; // Abin da za a maye gurbin abin da ya dace da shi
  replacementMap?: Record<string, string>; // KO taswirar maɓalli→abin maye
  flags?: string; // Tutocin regex ("gi" galibi)
  context?: "all" | "user" | "system" | "assistant";
  category?: "filler" | "context" | "structural" | "dedup" | "terse" | "ultra";
  minIntensity?: "lite" | "full" | "ultra"; // A tsallake idan ƙarfin bai kai wannan ba
  description?: string; // Takardun bayani
}
```

### Misali: Ƙara Ƙa'idojin Kalmomin Cikawa na Hindi

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
      "description": "Cire kalmomin buɗewa na ladabi kamar 'नमस्ते'"
    },
    {
      "name": "filler_actually",
      "pattern": "\\b(?:असल में|वास्तव में|दरअसल)\\b\\s*",
      "replacement": "",
      "context": "all",
      "category": "filler",
      "minIntensity": "lite",
      "description": "Cire kalmomin cikawa masu ma'anar 'a zahiri'"
    },
    {
      "name": "verbose_plea",
      "pattern": "\\b(?:कृपया|कृपया आप|अनुरोध है कि आप)\\b\\s*",
      "replacement": "",
      "context": "all",
      "category": "filler",
      "minIntensity": "full",
      "description": "Cire 'don Allah' a cikin Hindi"
    }
  ]
}
```

### Tantancewa

Ana tantance kunshin ƙa'idoji bisa `_schema.json` lokacin lodawa. Kunshin da ke da tsari mara kyau ba zai samu nasarar lodawa ba kuma za a rubuta kuskure a rajista:

```
RULE_LOADER: kunshin "hi/filler.json" ya gaza tantancewa:
  - rules.0.pattern: Regex mara inganci
  - rules.1.context: dole ne ya kasance ɗaya daga cikin [all, user, system, assistant]
```

Tantancewa tana gudana ta atomatik lokacin da aka loda kunshi (bisa `_schema.json`); za a ƙi
kunshin mara inganci kuma a rubuta kuskuren da ke sama a rajista. Babu wani keɓantaccen
rubutun `npm run` don tantance kunshi — loda kunshin (misali, kunna sabar ko
gwada hanyar matsewa) sannan a lura da rajistocin.

### Loda Kunshin Harshe na Musamman

```ts
import { loadRulePack } from "omniroute/compression/ruleLoader";

await loadRulePack("./my-custom-rules/hi/filler.json");
```

Ko kuma a sanya shi a wani sanannen wuri:

```
~/.omniroute/compression/rules/hi/filler.json  # Matakin mai amfani
<project>/.compression/rules/hi/filler.json   # Matakin aikin
```

### Kyawawan Hanyoyin Aiki don Kunshin Harsuna

1. **Fara da `filler`** — waɗannan su ne ƙa'idojin da suka fi yin tasiri
2. **Yi amfani da `minIntensity`** don iyakance ƙa'idoji masu tsanani — wannan yana karewa daga matsewa fiye da kima
3. **Haɗa gwaje-gwaje** — ƙara jerin `tests[]` a cikin JSON don tabbatar da yadda yake aiki
4. **Jeri yana da muhimmanci** — ana fara amfani da ƙa'idojin farko; sanya ƙa'idoji masu babban tasiri a farko
5. **Yi taka-tsantsan da `replacement`** — kirtani mara komai yawanci shi ne daidai; kada a taɓa shigar da sabon abun ciki

### Dabarun Fassara

Lokacin da ake daidaita kunshin ƙa'idoji zuwa sabon harshe:

1. **Fassara sunayen ƙa'idoji** — suna bayyana a cikin sakamakon gyaran kurakurai
2. **Daidaita tsarin regex** — fassara kai tsaye sau da yawa ba ta aiki (iyakokin kalmomi sun bambanta)
3. **Gwada da tattaunawa ta gaske** — ya kamata kunshin ya kasance amintacce a kan ainihin shigarwa
4. **Dace da al'adun harshe** — alal misali, kunshin Jafananci yana da kalmomin cikawa na girmamawa fiye da na Turanci

---

## Bututun Aiki Masu Jere

**Bututun aiki mai jere** yana gudanar da injina da yawa ɗaya bayan ɗaya, inda sakamakon kowane inji yake zama shigarwar na gaba. Haka `mode: stacked` yake aiki a ciki.

### Yadda Jerewar Ke Aiki

```
Shigarwa (tokens 10,000)
        │
        ▼
   ┌──────────┐
   │  Inji    │  fifiko 10
   │  A       │  ──▶ sakamako: tokens 6,000 (-40%)
   └────┬─────┘
        ▼
   ┌──────────┐
   │  Inji    │  fifiko 50
   │  B       │  ──▶ sakamako: tokens 2,400 (-60%)
   └────┬─────┘
        ▼
   ┌──────────┐
   │  Inji    │  fifiko 100
   │  C       │  ──▶ sakamako: tokens 1,200 (-80%)
   └────┬─────┘
        │
        ▼
Sakamakon ƙarshe (tokens 1,200, jimillar tanadi ~88%)
```

Lokacin da aka zaɓi `mode: "stacked"`, injina suna aiki ɗaya bayan ɗaya bisa tsarin da aka ayyana a cikin jerin `pipeline`.
Sakamakon inji N yana zama shigarwar inji N+1.

### Yanayin Matsewa

OmniRoute yana zaɓar **yanayi ƊAYA ga kowace buƙata** bisa ga saituna, iyakokin kunnawa ta atomatik, da sauye-sauyen combo.
An ayyana yanayoyin da ake da su a cikin `open-sse/services/compression/types.ts` (nau'in `CompressionMode`):

| Yanayi       | Injina                 | Amfani                                                                                                                                                                                                           |
| ------------ | ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `off`        | Babu                   | Kashe dukkan matsewa                                                                                                                                                                                             |
| `rtk`        | RTK kawai              | Zaman aiki masu yawan sakamakon umarni (tanadin 80%+)                                                                                                                                                            |
| `lite`       | Lite kawai             | Matsewa mai taka-tsantsan (mai sauri, mai aminci)                                                                                                                                                                |
| `standard`   | Caveman                | Matse rubutu tare da fakitin harsuna                                                                                                                                                                             |
| `aggressive` | Caveman + Aggressive   | Matse rubutu mai tsanani + zagayen ƙarshe mai tsanani                                                                                                                                                            |
| `ultra`      | Ultra                  | Mafi girman matsewa (mai asarar bayanai, mafita ta ƙarshe). Za a iya bi da shi ta injin SLM na **LLMLingua-2** idan an saita `ultra.modelPath` (yana komawa hanyar da ta dogara da ƙa’idoji idan babu samfurin). |
| `stacked`    | Bututun aiki na al’ada | Haɗa injina a kowane tsari (duba ƙasa)                                                                                                                                                                           |

> Bayan injinan yanayin da ke sama, rajistar tana kuma zuwa da injina na musamman waɗanda za a iya jerawa —
> **CCR**, **headroom**, **ionizer**, da **session-dedup** — waɗanda aka bayyana a cikin
> [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md#additional-built-in-engines).

`getEffectiveMode()` da ke cikin `open-sse/services/compression/strategySelector.ts` ne ke ƙayyade zaɓin yanayi:

1. Idan an kashe matsewa: `"off"`
2. Idan akwai sauyin combo: yi amfani da sauyin
3. Idan an wuce iyakar kunnawa ta atomatik: yi amfani da `autoTriggerMode` (tsoho: `"lite"`)
4. In ba haka ba: yi amfani da `defaultMode`

### Tsohon Bututun Aiki Mai Jere

Lokacin da aka saita `mode: "stacked"` kai tsaye, tsohon bututun aiki yana haɗa:

1. **RTK** — cire hayaniyar sakamakon umarni (tanadin ~80% a sakamakon tasha)
2. **Caveman** — cire kalmomin cikawa, taƙaita rubutu (~46% a sauran rubutun)
3. **Lite** — zagayen ƙarshe na gyaran farin sarari + cire maimaituwa

Wannan haɗin yana cimma **tanadin 78-95%** a zaman aiki masu yawan amfani da kayan aiki.

### Saita Bututun Aiki Masu Jere

A cikin saitin combo:

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

Za ka iya cire wasu injina, ƙara na al’ada, ko sake tsara jerinsu.

### Isar da Matsayi

Injina za su iya karanta metadata daga mahallin buƙata (a cikin `options`):

```ts
compress(body, config) {
  // Karanta metadata daga injinan da suka gabata
  const original = options?.compressionComboId;  // "my-coding-combo"
  // ...
}
```

Metadata ɗin **na karantawa kawai ne** — injina ba za su iya sauya mahallin buƙata ba, sai dai sakamakon body nasu kawai.

### Abubuwan Lura Game da Tsarin Gudanarwa

| Tsarin injina                          | Tasiri                                                                                                |
| -------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| RTK → Caveman → Lite                   | **Ana ba da shawara** (yana fara cire hayaniya, sai harshe, sannan farin sarari)                      |
| Lite → RTK → Caveman                   | Mara kyau — Lite yana cire farin sarari daga ɗanyen sakamako, wanda ke sa daidaita tsarin RTK ya gaza |
| Caveman → RTK                          | Mara kyau — Caveman na iya sake rubuta rubutu ta hanyoyin da RTK ba zai gane ba                       |
| Kowane tsari da `tool_results` a farko | Mafi kyau — sakamakon kayan aiki shi ne abun ciki mafi hayaniya                                       |

### Lokutan da Bai Kamata a Yi Jere Ba

Yin jere ba koyaushe ne ya fi kyau ba:

- **Saƙonni masu sauƙi** (babu sakamakon kayan aiki) — Caveman ko Lite guda ɗaya ya isa
- **La’akari da tsada** — kowane inji yana ƙara jinkirin ~5-50ms
- **Takamaiman kayan aiki** — RTK kaɗai yawanci ya isa ga sakamakon shell

### Gina Bututun Aiki na Al’ada

Babu rajistar pipeline mai suna. Stacked pipeline kawai **jerin matakai ne na inline**
da ake turawa zuwa `applyStackedCompression()` (wanda ake fitarwa daga
`@omniroute/open-sse/services/compression/strategySelector`):

```ts
import { applyStackedCompression } from "@omniroute/open-sse/services/compression/strategySelector";

const result = applyStackedCompression(body, [
  { engine: "rtk", intensity: "aggressive" },
  { engine: "caveman", intensity: "full" },
]);
```

Idan ba ka tura pipeline ba, zai yi amfani da `rtk(standard) → caveman(full)` a matsayin tsoho.

Don sarrafa shi daga config, saita `mode: "stacked"` sannan ka bayar da jerin matakan a ƙarƙashin
`stackedPipeline` (wanda ake karantawa daga `config.stackedPipeline`):

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

## Manufofin Daidaitawa da Upstream

Injinan matse bayanai na OmniRoute suna ambaton wasu ayyukan upstream a cikin README
("inspired by RTK, Caveman, LLMLingua-2, Troglodita"). Tambayar da masu ba da gudummawa
suka fi yi ita ce: **idan upstream RTK ya ƙara sabon matatar kayan aiki ko Caveman ya ƙara
kunshin ƙa'idoji, ta yaya hakan zai isa OmniRoute?** Wannan sashe ne yake ba da amsar hukuma.

### Kwafe da aka haɗa kai tsaye vs. aiwatarwa masu zaman kansu

| Inji                         | Alaƙa da upstream                                                                                                                       | Wuri                                                                |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| **RTK**                      | **Sake aiwatarwa mai zaman kansa** (an yi wahayi da shi, ba kwafi ba)                                                                   | `open-sse/services/compression/engines/rtk/`                        |
| **Caveman**                  | **Sake aiwatarwa mai zaman kansa** (an yi wahayi da shi)                                                                                | `open-sse/services/compression/engines/cavemanAdapter.ts`           |
| **Headroom**                 | Galibi na ciki ne; codec ɗin `gcf/` kaɗai aka **haɗa shi da gaske** daga `gcf-typescript` (MIT, mai alamar SPDX, generic profile kaɗai) | `open-sse/services/compression/engines/headroom/gcf/`               |
| **LLMLingua-2 / Troglodita** | An yi wahayi da su (suna tafiyar da injinan `llmlingua` + `session-dedup`)                                                              | `open-sse/services/compression/engines/llmlingua/`, `session-dedup` |

Muhimmin batu: **RTK da Caveman aiwatarwa ne na TypeScript da aka gina daga tushe bisa
_ra'ayoyin_ (ƙa'idojin tacewa, kunshin ƙa'idoji), ba bishiyoyin lambar tushe da aka haɗa kai tsaye ba.** Babu
kwafin upstream da za a yi `git pull` daga gare shi — kuma wannan ne ainihin dalilin da README ya ce
"inspired by" maimakon "bundled".

### Yadda ake haɗa ingantawa daga upstream

Babu **bibiyar fitowar upstream ta atomatik kuma babu alamar `compression-sync`
** — da gangan. Saboda injinan sake aiwatarwa ne, ba a haɗa matatar upstream RTK
ko kunshin ƙa'idojin Caveman a matsayin lamba; a maimakon haka, ana **sake bayyana shi a matsayin sabuwar
ƙa'ida/matata cikin tsarin OmniRoute na kansa** (duba
[COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md)) sannan a shigar da shi lokaci-lokaci ta hanyar
PR na yau da kullum. Wuraren faɗaɗawa da ke sama (inji na musamman, kunshin harshe, matatar RTK)
su ne hanyoyin da aka amince da su don ba da gudummawar guda ɗaya.

Misalan kwanan nan na wannan tsarin kai tsaye:

- Matatun RTK don sakamakon ginin Gradle da `dotnet` (v3.8.42)
- Matatun RTK don kubectl / docker-build / composer / gh (#2824)
- Kunshin harshen Indonesiya na Caveman (#3975), tare da kunshin Jamusanci / Faransanci / Jafananci / Sinanci

### Headroom (wakilin matse bayanan shigarwa)

Headroom **na ciki ne gaba ɗaya** — hoton codec na `gcf` da aka ƙayyade kuma aka haɗa kai tsaye tare da
matakan `smartcrusher` / `toon` / `tabular` na OmniRoute. Babu wani upstream mai aiki
da za a bibiya bayan kwafin da aka haɗa; ana sabunta `gcf`
da hannu idan codec ya canza sannan a sake tabbatar da shi ta ƙofar kasafin matse bayanai
(`check:compression-budget`).

### Gabatar da ingantawa da aka yi bisa wahayi daga upstream

1. **Kada a haɗa lambar kai tsaye** — a sake bayyana ƙa'idar/matatar upstream cikin tsarin OmniRoute.
2. Ƙara ta ta hanyar wurin faɗaɗawa da ya dace a ƙasa (kunshin harshe, matatar RTK, ko
   inji na musamman).
3. Ambaci aikin upstream a cikin bayanin PR (don nuna tushen gudummawa), ba ta hanyar
   kwafe lambar tushensa mai ɗauke da lasisi ba.
4. Haɗa gwaje-gwaje kuma tabbatar cewa ƙofar `check:compression-budget` har yanzu tana wucewa.

---

## Ƙara Salon Fitarwa

Salon fitarwa (duba [teburin kundin jagorar](./COMPRESSION_GUIDE.md#output-styles-catalog))
su ne takwarorin injunan shigarwa a ɓangaren amsa: maimakon matsa abin da kake
aikawa, suna umartar samfurin ya samar da fitarwa mai rahusa. Rijistar ita ce
`OUTPUT_STYLE_CATALOG` a cikin `open-sse/services/compression/outputStyles/catalog.ts`, kuma
**shigarwa guda ɗaya a kundin ita ce cikakkiyar fasalin**: mai saka umarni, ɓangaren saitunan dashboard,
adana bayanai da telemetry duk suna lissafawa daga kundin — babu wani jerin daban da za a sabunta.

1. **Ƙara shigarwa guda ɗaya zuwa `OUTPUT_STYLE_CATALOG`** tare da `id`, `label`, `description` da
   matakan Ingilishi guda uku na `levels` (`lite`, `full`, `ultra`). Dole ne kowane mataki ya ƙare da
   `${SHARED_BOUNDARIES}` domin lamba, hanyoyi, umarni, kurakurai da URLs su kasance yadda suke.
   Dole ne rubutun umarnin ya kasance **tabbatacce kuma mai bayar da sakamako iri ɗaya** ga kowane
   `(id, level, language)` — `${SHARED_BOUNDARIES}` ne kaɗai aka yarda a saka ta hanyar interpolation.
2. **Fassara shi.** Samar da aƙalla tubalin `pt-BR` a ƙarƙashin `i18n`; `ponytail` da
   `i-have-adhd` (en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi) su ne tsarin abin koyi. Salon da aka yi da gangan
   don harshe guda ɗaya yana saita `locale` a maimakon haka (kamar `terse-cjk` → `zh`) sannan
   ana bayar da shi ne kawai a ƙarƙashin wannan locale ɗin.
3. **Sabunta kariyar matrix** — ƙara harsunan salon zuwa `BASELINE_LANGUAGES` a cikin
   `tests/unit/compression/output-styles-i18n-matrix.test.ts`. Kariyar za ta ƙi duk wani sabon
   salo da ba a keɓe shi ga locale ba idan ba shi da fassarorin da ake buƙata, sai dai idan yana ɗauke da
   takamaiman shigarwar `KNOWN_ENGLISH_ONLY` tare da tracking issue.
4. **Ƙara gwaji na musamman ga salon** wanda aka tsara bisa
   `tests/unit/compression/i-have-adhd-catalog.test.ts`: tsarin kundin, ƙa'idar iyakoki
   ga kowane mataki, da anchor da ke tabbatar da cewa an rubuta kowace fassara a harshenta
   maimakon kwafin Ingilishi.
5. **Bayar da yabo**: idan an daidaita salon daga wani upstream project, a ambace shi a cikin
   source comment kan shigarwar (misali `i-have-adhd` → ayghri/i-have-adhd, MIT) — wannan
   ƙa'idar ce ɗaya da ta "Ba da shawarar ingantawa da aka samo daga upstream" da ke sama.

Ba a buƙatar canjin UI, schema ko telemetry — waɗannan bangarorin suna render daga kundin.

---

## Mafi Kyawun Hanyoyin Aiki

### Haɓaka Inji

1. **Koyaushe aiwatar da `validateConfig`** — injunan da ba su da validation suna haifar da gazawa ba tare da sanarwa ba
2. **Saita `targetLatencyMs` mai dacewa da zahiri** — strategy selector yana amfani da shi wajen zaɓar injuna
3. **Yi amfani da `getConfigSchema` don dashboard** — kada a taɓa ɓoye config daga masu amfani
4. **Tallafa wa `stackable: true` idan injinka pure ne** — bai kamata injunan da ke da side effects su yi stacking ba
5. **Rubuta inline tests** — ya kamata a iya tabbatar da ingancin injuna cikin <1s

### Haɓaka Kunshin Harshe

1. **Fara da ƙarfin `lite`** — ya kamata ƙa'idodinka su kasance amintattu a mafi ƙarancin saiti
2. **Yi amfani da `context` don iyakance ƙa'idoji** — ƙa'idodin `user` kawai ba za su iya shafar system prompts bisa kuskure ba
3. **Guji kama JSON keys** — `\\bword\\b` na iya dacewa da rubutu a cikin JSON, yana lalata structured data
4. **Yi gwaji da edge cases** — shigarwa mara komai, unicode, rubutun RTL, emojis
5. **Yi amfani da packs da ake da su a matsayin samfura** — `en/filler.json` shi ne misalin da aka fi haɓakawa

### Tsara Pipeline

1. **Yi profiling kafin optimization** — fara aunawa da `compression_stats`
2. **Fi son composition a kan sake aiwatarwa** — faɗaɗa ƙa'idodin Caveman kafin rubuta sabon inji
3. **Rubuta dalilin tsarin jeri** — yi comment kan dalilin da ya sa inji A yake gaban inji B
4. **Yi gwaji a duk matakan ƙarfi guda 3** — `lite` yana da sauri amma yana iya rasa bayanai, `ultra` yana da jinkiri amma ya fi daidaito

---

## Bayani: Injin da Aka Gina a Ciki

| ID na Inji           | Mai Jeri | Tsohuwar stackPriority | Abubuwan da Aka Nufa                         |
| -------------------- | -------- | ---------------------- | -------------------------------------------- |
| `lite`               | Ee       | 5                      | saƙonni, sakamakon_kayan_aiki                |
| `rtk`                | Ee       | 10                     | sakamakon_kayan_aiki                         |
| `standard` (caveman) | Ee       | 20                     | saƙonni, sakamakon_kayan_aiki, tubalan_lamba |
| `aggressive`         | Ee       | 30                     | saƙonni                                      |
| `ultra`              | Ee       | 40                     | saƙonni, tubalan_lamba                       |

### Duba Kuma

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — Bayanin tsarin aiki
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — Bayanin rajistar injuna
- [COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md) — Ƙayyadaddun tsarin ƙa'ida
- [COMPRESSION_LANGUAGE_PACKS.md](./COMPRESSION_LANGUAGE_PACKS.md) — Cikakkun bayanan kunshin harshe
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — Injin RTK da matatun da aka keɓance
- Tushe: `open-sse/services/compression/` (fayiloli 117, ~250KB)
