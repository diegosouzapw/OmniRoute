# Extending the Compression Pipeline (Filipino)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/EXTENDING_COMPRESSION.md) · 🇪🇹 [am](../../../am/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇦 [ar](../../../ar/docs/compression/EXTENDING_COMPRESSION.md) · 🇦🇿 [az](../../../az/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇬 [bg](../../../bg/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇩 [bn](../../../bn/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇦 [bs](../../../bs/docs/compression/EXTENDING_COMPRESSION.md) · 🇨🇿 [cs](../../../cs/docs/compression/EXTENDING_COMPRESSION.md) · 🇩🇰 [da](../../../da/docs/compression/EXTENDING_COMPRESSION.md) · 🇩🇪 [de](../../../de/docs/compression/EXTENDING_COMPRESSION.md) · 🇬🇷 [el](../../../el/docs/compression/EXTENDING_COMPRESSION.md) · 🇪🇸 [es](../../../es/docs/compression/EXTENDING_COMPRESSION.md) · 🇪🇪 [et](../../../et/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇷 [fa](../../../fa/docs/compression/EXTENDING_COMPRESSION.md) · 🇫🇮 [fi](../../../fi/docs/compression/EXTENDING_COMPRESSION.md) · 🇫🇷 [fr](../../../fr/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇪 [ga](../../../ga/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [gu](../../../gu/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [ha](../../../ha/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇱 [he](../../../he/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [hi](../../../hi/docs/compression/EXTENDING_COMPRESSION.md) · 🇭🇷 [hr](../../../hr/docs/compression/EXTENDING_COMPRESSION.md) · 🇭🇺 [hu](../../../hu/docs/compression/EXTENDING_COMPRESSION.md) · 🇦🇲 [hy](../../../hy/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇩 [id](../../../id/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [ig](../../../ig/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇹 [it](../../../it/docs/compression/EXTENDING_COMPRESSION.md) · 🇯🇵 [ja](../../../ja/docs/compression/EXTENDING_COMPRESSION.md) · 🇬🇪 [ka](../../../ka/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇭 [km](../../../km/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [kn](../../../kn/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇷 [ko](../../../ko/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇹 [lt](../../../lt/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇻 [lv](../../../lv/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [ml](../../../ml/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [mr](../../../mr/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇾 [ms](../../../ms/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇹 [mt](../../../mt/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇲 [my](../../../my/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇵 [ne](../../../ne/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇱 [nl](../../../nl/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇴 [no](../../../no/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [or](../../../or/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [pa](../../../pa/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇱 [pl](../../../pl/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇹 [pt](../../../pt/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇴 [ro](../../../ro/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇺 [ru](../../../ru/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇰 [si](../../../si/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇰 [sk](../../../sk/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇮 [sl](../../../sl/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇸 [sr](../../../sr/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇪 [sv](../../../sv/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇪 [sw](../../../sw/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [ta](../../../ta/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [te](../../../te/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇭 [th](../../../th/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇷 [tr](../../../tr/docs/compression/EXTENDING_COMPRESSION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇰 [ur](../../../ur/docs/compression/EXTENDING_COMPRESSION.md) · 🇺🇿 [uz](../../../uz/docs/compression/EXTENDING_COMPRESSION.md) · 🇻🇳 [vi](../../../vi/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [yo](../../../yo/docs/compression/EXTENDING_COMPRESSION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/EXTENDING_COMPRESSION.md)

---

> **TL;DR**: Ang compression engine ng OmniRoute ay **pluggable** — maaari kang magrehistro ng mga custom na engine, maghatid ng mga language pack para sa mga bagong wika, at bumuo ng magkakapatong na pipeline. Ipinapakita ng gabay na ito kung paano.

**Mga kaugnay na gabay:**

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — Buong pangkalahatang-ideya ng pipeline
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — Registry ng engine at mga built-in na engine
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — RTK engine at mga custom na filter
- [COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md) — Sanggunian sa format ng rule pack

---

## Pangkalahatang-ideya

May **3 extension point** ang compression system:

| Extension point      | Gamit                                                                                         | Antas ng hirap |
| -------------------- | --------------------------------------------------------------------------------------------- | -------------- |
| **Custom na engine** | Magdagdag ng ganap na bagong compression algorithm (hal., summarizer na partikular sa domain) | Advanced       |
| **Language pack**    | Magdagdag ng suporta para sa bagong likas na wika (hal., Hindi, Arabic)                       | Katamtaman     |
| **Stacked pipeline** | Pagsama-samahin ang mga kasalukuyang engine sa custom na pagkakasunod-sunod                   | Baguhan        |

```
┌─────────────────────────────────────────────────────────────┐
│                    Estratehiya sa Compression                │
│                                                              │
│   Mga input message ──▶ getEffectiveMode() ──▶ mode         │
│                                              │               │
│                      ┌───────────────────────┼──────────┐    │
│                      │         │         │         │    │    │
│                      ▼         ▼         ▼         ▼    │    │
│                   "rtk"    "lite"   "standard" "stacked"    │
│                      │         │         │         │    │    │
│                      ▼         ▼         ▼         ▼    │    │
│                   RTK       Lite     Caveman   engines[]   │
│                   engine    engine   engine    magkakadena │
│                      │         │         │         │    │    │
│                      └─────────┴─────────┴─────────┘    │    │
│                                      │                    │
│                                      ▼                    │
│                            Na-compress na output            │
└─────────────────────────────────────────────────────────────┘

NAKABATAY SA MODE ang tagapili ng estratehiya: pumipili ang bawat request ng ISANG mode
(rtk / lite / standard / aggressive / ultra / stacked / off).
Ang mode na "stacked" lamang ang nagkakadena ng maraming engine nang sunod-sunod.
Ang default na mode ng auto-trigger ay "lite" (hindi isang 3-tier na priority chain).
```

---

## Pagsulat ng Custom na Compression Engine

Ang interface ng engine (`open-sse/services/compression/engines/types.ts`) ang kontratang dapat sundin ng bawat engine. Mayroon itong 5 kinakailangang method.

### Ang Interface na `CompressionEngine`

```ts
interface CompressionEngine {
  id: string; // Natatanging ID ng engine
  name: string; // Pangalan na ipapakita
  description: string; // Maikling paglalarawan
  icon: string; // Icon (emoji o URL)
  targets: CompressionEngineTarget[]; // ["messages", "tool_results", "code_blocks"]
  stackable: boolean; // Maaaring gamitin sa isang stacked pipeline
  stackPriority: number; // Pagkakasunod-sunod sa mga stacked pipeline (mas mababa = mas maaga)
  metadata: CompressionEngineMetadata;

  apply(body, options?): CompressionResult;
  compress(body, config?): CompressionResult;
  getConfigSchema(): EngineConfigField[];
  validateConfig(config): EngineValidationResult;
}
```

### Minimal na Halimbawa: Whitespace Engine

Ang pinakasimpleng posibleng engine — alisin ang sobrang whitespace sa mga message.

````ts
import type { CompressionEngine } from "omniroute/compression/engines/types";
import { registerCompressionEngine } from "omniroute/compression/engines/registry";

function preserveCodeBlocks(text: string): string {
  // Hatiin ayon sa mga pananda ng code block at panatilihin ang whitespace sa loob ng mga ito
  const parts = text.split(/(```[\s\S]*?```)/);
  return parts
    .map((part) => {
      if (part.startsWith("```")) {
        return part; // Huwag baguhin ang mga code block
      }
      return part.replace(/\n{3,}/g, "\n\n"); // Ilapat lamang sa prose
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
  stackPriority: 100, // Patakbuhin PAGKATAPOS ng caveman/rtk

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

    // Suriin ang array ng mensahe — pangasiwaan ang parehong string at multipart na content
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
      // Multipart na content: suriin ang mga bahagi, i-compress lamang ang mga bahaging text
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
          return part; // panatilihin ang image_url, tool_use, atbp.
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

// Irehistro sa buong system
registerCompressionEngine(whitespaceEngine);
````

### Saan Ilalagay ang Mga Custom Engine

```
~/.omniroute/compression/engines/my-engine.ts    # Para sa user
<project>/compression-engines/my-engine.ts        # Para sa proyekto (ilo-load sa pagsisimula)
```

O i-load gamit ang code mula sa isang plugin:

```ts
// Sa iyong plugin
import {
  registerCompressionEngine,
  unregisterCompressionEngine,
} from "@omniroute/open-sse/services/compression/engines/registry";
import { myEngine } from "./engines/my-engine";

export default definePlugin({
  name: "my-compression-plugin",
  // Inilalantad ng plugin SDK ang mga hook na onRequest / onResponse / onError. Irehistro ang
  // engine kapag na-load ang module ng plugin (o sa unang onRequest); alisin ang pagkakarehistro nito
  // mula sa sarili mong teardown path.
  onRequest: async (ctx) => {
    registerCompressionEngine(myEngine);
  },
});

// Sa teardown:
// unregisterCompressionEngine("my-engine");
```

### Pagsubok sa Iyong Engine

Irehistro ang iyong engine sa isang plugin o startup function. Kapag nakarehistro na, magiging available
ang engine sa strategy selector sa pamamagitan ng `id` nito. Subukan ang integrasyon sa pamamagitan ng pagbubuo nito sa isang stacked pipeline:

---

## Paglikha ng mga Language Pack

Gumagamit ang Caveman-style compression ng **mga rule pack na partikular sa wika** upang pangasiwaan ang mga filler, pag-aalinlangan, at maligoy na pattern sa bawat natural na wika. Kasama sa OmniRoute ang **6 na language pack**: `en`, `es`, `fr`, `de`, `ja`, `pt-BR`.

### Istruktura ng Pack

Ang language pack ay isang direktoryo ng mga **JSON file** sa ilalim ng `open-sse/services/compression/rules/<language>/`:

```
open-sse/services/compression/rules/
├── en/
│   ├── filler.json          # Mga pambungad na bati, pag-aalinlangan, pagkamagalang
│   ├── context.json         # Mga panuntunang nagpapabawas ng konteksto
│   ├── dedup.json           # Mga panuntunan sa pag-aalis ng duplikasyon
│   ├── structural.json      # Bantas, pag-format
│   └── ultra.json           # Mga agresibong panuntunan sa compression
├── es/  (parehong istruktura)
├── fr/  (parehong istruktura)
├── de/  (parehong istruktura)
├── ja/  (parehong istruktura)
└── pt-BR/ (parehong istruktura)
```

### Anyo ng Panuntunan

Ganito ang anyo ng bawat panuntunan (mula sa `open-sse/services/compression/ruleLoader.ts`):

```ts
interface FileRule {
  name: string; // Pangalan na madaling basahin ng tao (kebab-case)
  pattern: string; // JavaScript regex pattern
  replacement?: string; // Ipapalit sa tumugmang bahagi
  replacementMap?: Record<string, string>; // O isang key→replacement map
  flags?: string; // Mga regex flag (karaniwang "gi")
  context?: "all" | "user" | "system" | "assistant";
  category?: "filler" | "context" | "structural" | "dedup" | "terse" | "ultra";
  minIntensity?: "lite" | "full" | "ultra"; // Laktawan kapag mas mababa sa intensity na ito
  description?: string; // Dokumentasyon
}
```

### Halimbawa: Pagdaragdag ng mga Hindi Filler Rule

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

### Pag-validate

Vina-validate ang mga rule pack laban sa `_schema.json` kapag nilo-load. Hindi malo-load ang pack na may maling istruktura at magla-log ito ng error:

```
RULE_LOADER: pack "hi/filler.json" failed validation:
  - rules.0.pattern: Invalid regex
  - rules.1.context: must be one of [all, user, system, assistant]
```

Awtomatikong tumatakbo ang validation kapag nilo-load ang isang pack (laban sa `_schema.json`); tinatanggihan ang
invalid na pack at nila-log ang error sa itaas. Walang hiwalay na
`npm run` script para sa pag-validate ng pack — i-load ang pack (hal. simulan ang server o
patakbuhin ang compression path) at subaybayan ang mga log.

### Pag-load ng Custom na Language Pack

```ts
import { loadRulePack } from "omniroute/compression/ruleLoader";

await loadRulePack("./my-custom-rules/hi/filler.json");
```

O ilagay ito sa isang kinikilalang lokasyon:

```
~/.omniroute/compression/rules/hi/filler.json  # Antas ng user
<project>/.compression/rules/hi/filler.json   # Antas ng proyekto
```

### Pinakamahuhusay na Kasanayan para sa mga Language Pack

1. **Magsimula sa `filler`** — ito ang mga panuntunang may pinakamalaking epekto
2. **Gamitin ang `minIntensity`** upang kontrolin ang mga agresibong panuntunan — pinoprotektahan nito laban sa labis na compression
3. **Magsama ng mga test case** — magdagdag ng `tests[]` array sa JSON upang ma-verify ang gawi
4. **Mahalaga ang pagkakasunod-sunod** — unang inilalapat ang mga naunang panuntunan; unahin ang mga panuntunang may malaking epekto
5. **Maging konserbatibo sa `replacement`** — karaniwang tama ang empty string; huwag kailanman magdagdag ng bagong nilalaman

### Estratehiya sa Pagsasalin

Kapag nilo-localize ang mga rule pack para sa isang bagong wika:

1. **Isalin ang mga pangalan ng panuntunan** — lumalabas ang mga ito sa debug output
2. **Iangkop ang mga regex pattern** — madalas na hindi gumagana ang direktang pagsasalin (magkakaiba ang mga word boundary)
3. **Subukan sa mga tunay na pag-uusap** — dapat maging ligtas ang pack sa aktuwal na input
4. **Itugma sa mga kultural na kaugalian** — halimbawa, mas maraming honorific filler ang mga Japanese pack kaysa sa mga English pack

---

## Mga Nakasalansang na Pipeline

Ang **nakasalansang na pipeline** ay nagpapatakbo ng maraming engine nang sunod-sunod, kung saan ang output ng bawat engine ay ipinapasa sa susunod. Ganito gumagana ang `mode: stacked` sa loob.

### Paano Gumagana ang Pagsasalansan

```
Input (10,000 token)
        │
        ▼
   ┌──────────┐
   │  Engine  │  priority 10
   │  A       │  ──▶ output: 6,000 token (-40%)
   └────┬─────┘
        ▼
   ┌──────────┐
   │  Engine  │  priority 50
   │  B       │  ──▶ output: 2,400 token (-60%)
   └────┬─────┘
        ▼
   ┌──────────┐
   │  Engine  │  priority 100
   │  C       │  ──▶ output: 1,200 token (-80%)
   └────┬─────┘
        │
        ▼
Pinal na output (1,200 token, ~88% pinagsamang pagtitipid)
```

Kapag pinili ang `mode: "stacked"`, sunod-sunod na isinasagawa ang mga engine ayon sa pagkakasunod na tinukoy sa `pipeline` array.
Ang output ng engine N ang nagiging input ng engine N+1.

### Mga Mode ng Compression

Pumipili ang OmniRoute ng **ISANG mode sa bawat request** batay sa configuration, mga auto-trigger threshold, at mga combo override.
Ang mga available na mode ay tinukoy sa `open-sse/services/compression/types.ts` (type na `CompressionMode`):

| Mode         | Mga Engine           | Gamit                                                                                                                                                                                                                  |
| ------------ | -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `off`        | Wala                 | I-disable ang lahat ng compression                                                                                                                                                                                     |
| `rtk`        | RTK lamang           | Mga session na maraming command output (80%+ na pagtitipid)                                                                                                                                                            |
| `lite`       | Lite lamang          | Konserbatibong compression (mabilis, ligtas)                                                                                                                                                                           |
| `standard`   | Caveman              | Compression ng prosa gamit ang mga language pack                                                                                                                                                                       |
| `aggressive` | Caveman + Aggressive | Agresibong prosa + agresibong panghuling pass                                                                                                                                                                          |
| `ultra`      | Ultra                | Pinakamataas na compression (lossy, huling opsyon). Opsyonal na idinadaan sa **LLMLingua-2** SLM engine kapag nakatakda ang `ultra.modelPath` (nagfa-fail-open sa rule-based na path kapag hindi available ang model). |
| `stacked`    | Custom na pipeline   | Pagsama-samahin ang mga engine sa anumang pagkakasunod-sunod (tingnan sa ibaba)                                                                                                                                        |

> Bukod sa mga mode engine sa itaas, kasama rin sa registry ang mga espesyal na stackable engine —
> **CCR**, **headroom**, **ionizer**, at **session-dedup** — na nakadokumento sa
> [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md#additional-built-in-engines).

Ang pagpili ng mode ay tinutukoy ng `getEffectiveMode()` sa `open-sse/services/compression/strategySelector.ts`:

1. Kung naka-disable ang compression: `"off"`
2. Kung may combo override: gamitin ang override
3. Kung nalampasan ang auto-trigger threshold: gamitin ang `autoTriggerMode` (default: `"lite"`)
4. Kung hindi: gamitin ang `defaultMode`

### Ang Default na Nakasalansang na Pipeline

Kapag tahasang naka-configure ang `mode: "stacked"`, pinagsasama ng default na pipeline ang:

1. **RTK** — alisin ang ingay sa command output (~80% na pagtitipid sa terminal output)
2. **Caveman** — alisin ang mga filler at gawing mas maikli ang prosa (~46% sa natitirang text)
3. **Lite** — panghuling whitespace + dedup pass

Nakakamit ng kombinasyong ito ang **78-95% na pagtitipid** sa mga session na maraming tool.

### Pag-configure ng Mga Nakasalansang na Pipeline

Sa combo config:

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

Maaari kang mag-alis ng mga engine, magdagdag ng mga custom na engine, o baguhin ang pagkakasunod-sunod ng mga ito.

### Pagpapasa ng State

Maaaring magbasa ang mga engine ng metadata mula sa request context (sa `options`):

```ts
compress(body, config) {
  // Basahin ang metadata mula sa mga naunang engine
  const original = options?.compressionComboId;  // "my-coding-combo"
  // ...
}
```

Ang metadata ay **read-only** — hindi maaaring baguhin ng mga engine ang request context, tanging ang sarili nilang body output lamang.

### Mga Dapat Bantayan sa Pagkakasunod-sunod ng Execution

| Pagkakasunod-sunod ng engine              | Epekto                                                                                                        |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| RTK → Caveman → Lite                      | **Inirerekomenda** (inaalis muna ang ingay, pagkatapos ang wika, saka ang whitespace)                         |
| Lite → RTK → Caveman                      | Hindi maganda — inaalis ng Lite ang whitespace mula sa raw output, kaya pumapalya ang pattern matching ng RTK |
| Caveman → RTK                             | Hindi maganda — maaaring baguhin ng Caveman ang text sa mga paraang hindi nakikilala ng RTK                   |
| Anumang ayos na nauuna ang `tool_results` | Mas mahusay — ang tool output ang may pinakamaraming ingay                                                    |

### Kailan HINDI Dapat Magsalansan

Hindi palaging mas mahusay ang pagsasalansan:

- **Mga simpleng mensahe** (walang tool output) — sapat na ang Caveman o Lite lamang
- **Sensitibo sa gastos** — nagdaragdag ang bawat engine ng ~5-50ms na latency
- **Mga partikular na tool** — karaniwang sapat na ang RTK lamang para sa shell output

### Pagbuo ng Custom na Pipeline

Walang registry ng named pipeline. Ang stacked pipeline ay isa lamang **inline array
ng mga hakbang** na ipinapasa sa `applyStackedCompression()` (ini-export mula sa
`@omniroute/open-sse/services/compression/strategySelector`):

```ts
import { applyStackedCompression } from "@omniroute/open-sse/services/compression/strategySelector";

const result = applyStackedCompression(body, [
  { engine: "rtk", intensity: "aggressive" },
  { engine: "caveman", intensity: "full" },
]);
```

Kapag hindi ka nagpasa ng pipeline, nagde-default ito sa `rtk(standard) → caveman(full)`.

Upang kontrolin ito mula sa config, itakda ang `mode: "stacked"` at ibigay ang array ng mga hakbang sa ilalim ng
`stackedPipeline` (binabasa mula sa `config.stackedPipeline`):

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

## Patakaran sa Pag-sync sa Upstream

Kinikilala ng mga compression engine ng OmniRoute sa README ang ilang upstream na proyekto
("hango sa RTK, Caveman, LLMLingua-2, Troglodita"). Isang karaniwang tanong ng mga contributor
ay: **kapag nagdagdag ang upstream RTK ng bagong tool filter o nagdagdag ang Caveman ng rule
pack, paano ito nakararating sa OmniRoute?** Ang seksyong ito ang opisyal na sagot.

### Mga vendored na kopya kumpara sa mga independiyenteng implementasyon

| Engine                       | Ugnayan sa upstream                                                                                                                                  | Lokasyon                                                            |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| **RTK**                      | **Independiyenteng muling implementasyon** (hango rito, hindi kopya)                                                                                 | `open-sse/services/compression/engines/rtk/`                        |
| **Caveman**                  | **Independiyenteng muling implementasyon** (hango rito)                                                                                              | `open-sse/services/compression/engines/cavemanAdapter.ts`           |
| **Headroom**                 | Karamihan ay internal; ang `gcf/` codec lamang ang **tunay na vendored** mula sa `gcf-typescript` (MIT, may markang SPDX, generic na profile lamang) | `open-sse/services/compression/engines/headroom/gcf/`               |
| **LLMLingua-2 / Troglodita** | Hango rito (pinapagana ang mga `llmlingua` + `session-dedup` engine)                                                                                 | `open-sse/services/compression/engines/llmlingua/`, `session-dedup` |

Mahalagang punto: **Ang RTK at Caveman ay mga clean-room na implementasyon sa TypeScript ng
mga _ideya_ (mga filter rule, mga rule pack), hindi mga vendored na source tree.** Walang
upstream na kopyang maaaring pagkunan sa pamamagitan ng `git pull` — at ito mismo ang dahilan kung bakit
nakasaad sa README na "hango sa" sa halip na "kasamang naka-bundle".

### Paano isinasama ang mga pagpapahusay mula sa upstream

**Walang awtomatikong pagsubaybay sa mga upstream release at walang `compression-sync`
label** — sinadya ito. Dahil mga muling implementasyon ang mga engine, ang isang upstream RTK
filter o Caveman rule pack ay hindi isinasama bilang code; sa halip, ito ay **muling ipinapahayag bilang bagong
rule/filter sa sariling format ng OmniRoute** (tingnan ang
[COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md)) at idinaragdag nang ad-hoc sa pamamagitan ng
karaniwang PR. Ang mga extension point sa itaas (custom engine, language pack, RTK filter)
ang mga awtorisadong paraan upang mag-ambag nito.

Mga kamakailang halimbawa ng mismong daloy na ito:

- Mga RTK filter para sa build output ng Gradle at `dotnet` (v3.8.42)
- Mga RTK filter para sa kubectl / docker-build / composer / gh (#2824)
- Indonesian language pack ng Caveman (#3975), kasama ang mga pack para sa German / French / Japanese / Chinese

### Headroom (proxy para sa input compression)

Ang Headroom ay **ganap na internal** — isang naka-pin na vendored snapshot ng `gcf` codec kasama ang
sariling mga layer na `smartcrusher` / `toon` / `tabular` ng OmniRoute. Walang aktibong
upstream na susubaybayan maliban sa vendored na kopya; mano-manong nire-refresh ang mga update sa `gcf`
kapag nagbabago ang codec at muling bina-validate laban sa compression budget
gate (`check:compression-budget`).

### Pagmumungkahi ng pagpapahusay na hango sa upstream

1. **Huwag mag-vendor** — muling ipahayag ang upstream rule/filter sa format ng OmniRoute.
2. Idagdag ito sa pamamagitan ng katugmang extension point sa ibaba (language pack, RTK filter, o
   custom engine).
3. Banggitin ang upstream na proyekto sa paglalarawan ng PR (attribution), sa halip na
   kopyahin ang source nitong sakop ng lisensya.
4. Isama ang mga test at tiyaking pumapasa pa rin ang `check:compression-budget` gate.

---

## Pagdaragdag ng Output Style

Ang mga output style (tingnan ang [talahanayan ng catalog ng gabay](./COMPRESSION_GUIDE.md#output-styles-catalog))
ang katumbas sa panig ng tugon ng mga input engine: sa halip na i-compress ang ipinapadala mo,
inuutusan ng mga ito ang modelo na gumawa ng mas murang output. Ang registry ay
`OUTPUT_STYLE_CATALOG` sa `open-sse/services/compression/outputStyles/catalog.ts`, at
**isang entry sa catalog ang bumubuo sa buong feature**: ang injector, panel ng mga setting
sa dashboard, persistence, at telemetry ay nakabatay lahat sa catalog — wala nang ibang
listahang kailangang i-update.

1. **Magdagdag ng isang entry sa `OUTPUT_STYLE_CATALOG`** na may `id`, `label`, `description`, at
   tatlong English na `levels` (`lite`, `full`, `ultra`). Kailangang magtapos ang bawat level sa
   `${SHARED_BOUNDARIES}` upang manatiling eksaktong gaya ng orihinal ang code, mga path, command,
   error, at URL. Ang teksto ng instruction ay dapat **static at deterministic** para sa bawat
   `(id, level, language)` — `${SHARED_BOUNDARIES}` lamang ang pinapayagang interpolation.
2. **Isalin ito.** Maglaan man lang ng `pt-BR` block sa ilalim ng `i18n`; ang `ponytail` at
   `i-have-adhd` (en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi) ang batayang anyo. Ang isang style
   na sadyang para lamang sa iisang wika ay nagtatakda sa halip ng `locale` (gaya ng `terse-cjk` → `zh`)
   at iniaalok lamang sa ilalim ng locale na iyon.
3. **I-update ang matrix guard** — idagdag ang mga wika ng style sa `BASELINE_LANGUAGES` sa
   `tests/unit/compression/output-styles-i18n-matrix.test.ts`. Ibabagsak ng gate ang anumang bagong
   style na hindi nililimitahan ng locale at walang mga kinakailangang salin, maliban kung mayroon
   itong tahasang `KNOWN_ENGLISH_ONLY` entry na may tracking issue.
4. **Magdagdag ng test para sa bawat style** na nakabatay sa
   `tests/unit/compression/i-have-adhd-catalog.test.ts`: anyo ng catalog, boundaries clause
   para sa bawat level, at isang anchor na nagtitiyak na ang bawat salin ay nakasulat sa sarili
   nitong wika sa halip na kinopyang English.
5. **Attribution**: kung ang style ay hinango mula sa isang upstream project, kilalanin ito sa isang
   source comment sa entry (hal. `i-have-adhd` → ayghri/i-have-adhd, MIT) — kaparehong tuntunin ng
   "Pagmumungkahi ng pagpapahusay na hango sa upstream" sa itaas.

Walang kailangang baguhin sa UI, schema, o telemetry — nagre-render ang mga bahaging iyon mula sa catalog.

---

## Pinakamahuhusay na Kasanayan

### Pag-develop ng Engine

1. **Palaging ipatupad ang `validateConfig`** — nagdudulot ng mga tahimik na pagkabigo ang mga engine na walang validation
2. **Magtakda ng makatotohanang `targetLatencyMs`** — ginagamit ito ng strategy selector upang pumili ng mga engine
3. **Gamitin ang `getConfigSchema` para sa dashboard** — huwag kailanman itago ang config mula sa mga user
4. **Suportahan ang `stackable: true` kung pure ang iyong engine** — hindi dapat i-stack ang mga engine na may mga side effect
5. **Sumulat ng mga inline test** — dapat mabe-verify ang mga engine sa loob ng <1s

### Pag-develop ng Language Pack

1. **Magsimula sa `lite` intensity** — dapat ligtas ang iyong mga tuntunin sa pinakamababang setting
2. **Gamitin ang `context` upang limitahan ang saklaw ng mga tuntunin** — hindi aksidenteng maaapektuhan ng mga tuntuning para lamang sa `user` ang mga system prompt
3. **Iwasang makuha ang mga JSON key** — maaaring tumugma ang `\\bword\\b` sa loob ng JSON at masira ang structured data
4. **Subukan gamit ang mga edge case** — walang-lamang input, unicode, RTL text, mga emoji
5. **Gamitin ang mga umiiral na pack bilang mga template** — ang `en/filler.json` ang pinakamaunlad na halimbawa

### Pagdidisenyo ng Pipeline

1. **Mag-profile bago mag-optimize** — magsukat muna gamit ang `compression_stats`
2. **Mas piliin ang composition kaysa muling pagpapatupad** — palawakin ang mga tuntunin ng Caveman bago gumawa ng bagong engine
3. **Idokumento ang dahilan ng pagkakasunod-sunod** — magkomento kung bakit nauuna ang engine A sa engine B
4. **Subukan sa lahat ng 3 intensity level** — mabilis ngunit lossy ang `lite`, samantalang mabagal ngunit precise ang `ultra`

---

## Sanggunian: Mga Built-in na Engine

| Engine ID            | Maaaring I-stack | Default na stackPriority | Mga Target                             |
| -------------------- | ---------------- | ------------------------ | -------------------------------------- |
| `lite`               | Oo               | 5                        | mga mensahe, tool_results              |
| `rtk`                | Oo               | 10                       | tool_results                           |
| `standard` (caveman) | Oo               | 20                       | mga mensahe, tool_results, code_blocks |
| `aggressive`         | Oo               | 30                       | mga mensahe                            |
| `ultra`              | Oo               | 40                       | mga mensahe, code_blocks               |

### Tingnan Din

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — Pangkalahatang-ideya ng pipeline
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — Sanggunian ng registry ng engine
- [COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md) — Espesipikasyon ng format ng panuntunan
- [COMPRESSION_LANGUAGE_PACKS.md](./COMPRESSION_LANGUAGE_PACKS.md) — Mga detalye ng language pack
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — RTK engine at mga custom na filter
- Source: `open-sse/services/compression/` (117 file, ~250KB)
