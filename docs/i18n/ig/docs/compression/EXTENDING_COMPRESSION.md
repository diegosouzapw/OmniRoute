# Extending the Compression Pipeline (Igbo)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/EXTENDING_COMPRESSION.md) · 🇪🇹 [am](../../../am/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇦 [ar](../../../ar/docs/compression/EXTENDING_COMPRESSION.md) · 🇦🇿 [az](../../../az/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇬 [bg](../../../bg/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇩 [bn](../../../bn/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇦 [bs](../../../bs/docs/compression/EXTENDING_COMPRESSION.md) · 🇨🇿 [cs](../../../cs/docs/compression/EXTENDING_COMPRESSION.md) · 🇩🇰 [da](../../../da/docs/compression/EXTENDING_COMPRESSION.md) · 🇩🇪 [de](../../../de/docs/compression/EXTENDING_COMPRESSION.md) · 🇬🇷 [el](../../../el/docs/compression/EXTENDING_COMPRESSION.md) · 🇪🇸 [es](../../../es/docs/compression/EXTENDING_COMPRESSION.md) · 🇪🇪 [et](../../../et/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇷 [fa](../../../fa/docs/compression/EXTENDING_COMPRESSION.md) · 🇫🇮 [fi](../../../fi/docs/compression/EXTENDING_COMPRESSION.md) · 🇫🇷 [fr](../../../fr/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇪 [ga](../../../ga/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [gu](../../../gu/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [ha](../../../ha/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇱 [he](../../../he/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [hi](../../../hi/docs/compression/EXTENDING_COMPRESSION.md) · 🇭🇷 [hr](../../../hr/docs/compression/EXTENDING_COMPRESSION.md) · 🇭🇺 [hu](../../../hu/docs/compression/EXTENDING_COMPRESSION.md) · 🇦🇲 [hy](../../../hy/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇩 [id](../../../id/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇹 [it](../../../it/docs/compression/EXTENDING_COMPRESSION.md) · 🇯🇵 [ja](../../../ja/docs/compression/EXTENDING_COMPRESSION.md) · 🇬🇪 [ka](../../../ka/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇭 [km](../../../km/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [kn](../../../kn/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇷 [ko](../../../ko/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇹 [lt](../../../lt/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇻 [lv](../../../lv/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [ml](../../../ml/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [mr](../../../mr/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇾 [ms](../../../ms/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇹 [mt](../../../mt/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇲 [my](../../../my/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇵 [ne](../../../ne/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇱 [nl](../../../nl/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇴 [no](../../../no/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [or](../../../or/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [pa](../../../pa/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇭 [phi](../../../phi/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇱 [pl](../../../pl/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇹 [pt](../../../pt/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇴 [ro](../../../ro/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇺 [ru](../../../ru/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇰 [si](../../../si/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇰 [sk](../../../sk/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇮 [sl](../../../sl/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇸 [sr](../../../sr/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇪 [sv](../../../sv/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇪 [sw](../../../sw/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [ta](../../../ta/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [te](../../../te/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇭 [th](../../../th/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇷 [tr](../../../tr/docs/compression/EXTENDING_COMPRESSION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇰 [ur](../../../ur/docs/compression/EXTENDING_COMPRESSION.md) · 🇺🇿 [uz](../../../uz/docs/compression/EXTENDING_COMPRESSION.md) · 🇻🇳 [vi](../../../vi/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [yo](../../../yo/docs/compression/EXTENDING_COMPRESSION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/EXTENDING_COMPRESSION.md)

---

> **Na nkenke**: Igwe mkpakọ OmniRoute bụ nke **a pụrụ itinye mgbakwunye** — ị nwere ike ịdebanye igwe ahaziri iche, kesaa ngwugwu asụsụ maka asụsụ ọhụrụ, ma jikọta usoro nhazi ndị e dokọrọ n'usoro. Ntuziaka a na-egosi otu esi eme ya.

**Ntuziaka ndị metụtara ya:**

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — Nchịkọta zuru ezu nke usoro nhazi
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — Ndebanye igwe na igwe ndị arụnyere n'ime ya
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — Igwe RTK na ihe nzacha ahaziri iche
- [COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md) — Nkọwa ntụaka maka usoro ngwugwu iwu

---

## Nchịkọta

Sistemụ mkpakọ ahụ nwere **ebe mgbatị 3**:

| Ebe mgbatị            | Ihe eji ya eme                                                                  | Ogo isi ike |
| --------------------- | ------------------------------------------------------------------------------- | ----------- |
| **Igwe ahaziri iche** | Tinye algọridim mkpakọ ọhụrụ kpamkpam (dịka, nchịkọta akọwapụtara maka ngalaba) | Dị elu      |
| **Ngwugwu asụsụ**     | Tinye nkwado maka asụsụ mmadụ ọhụrụ (dịka, Hindi, Arabic)                       | Etiti       |
| **Usoro e dokọrọ**    | Jikọta igwe ndị dị ugbu a n'usoro ahaziri iche                                  | Onye mbido  |

```
┌─────────────────────────────────────────────────────────────┐
│                     Atụmatụ Mkpakọ                           │
│                                                              │
│   Ozi ntinye ──────▶ getEffectiveMode() ──▶ ọnọdụ           │
│                                              │               │
│                      ┌───────────────────────┼──────────┐    │
│                      │         │         │         │    │    │
│                      ▼         ▼         ▼         ▼    │    │
│                   "rtk"    "lite"   "standard" "stacked"    │
│                      │         │         │         │    │    │
│                      ▼         ▼         ▼         ▼    │    │
│                   RTK       Lite     Caveman   engines[]   │
│                   igwe      igwe      igwe      ejikọtara   │
│                      │         │         │         │    │    │
│                      └─────────┴─────────┴─────────┘    │    │
│                                      │                    │
│                                      ▼                    │
│                              Nsonaazụ mkpakọ              │
└─────────────────────────────────────────────────────────────┘

Onye na-ahọrọ atụmatụ dabere na MODE: arịrịọ ọ bụla na-ahọrọ OTU ọnọdụ
(rtk / lite / standard / aggressive / ultra / stacked / off).
Naanị ọnọdụ "stacked" na-ejikọta ọtụtụ igwe n'usoro.
Ọnọdụ ndabara a na-akpalite na-akpaghị aka bụ "lite" (ọ bụghị usoro
mkpa nwere ọkwa 3).
```

---

## Ide Igwe Mkpakọ Ahaziri Iche

Ọdịdị ihu igwe ahụ (`open-sse/services/compression/engines/types.ts`) bụ nkwekọrịta igwe ọ bụla ga-emezurịrị. O nwere metọd 5 achọrọ.

### Ọdịdị Ihu `CompressionEngine`

```ts
interface CompressionEngine {
  id: string; // ID igwe pụrụ iche
  name: string; // Aha ngosi
  description: string; // Nkọwa dị mkpirikpi
  icon: string; // Akara ngosi (emoji ma ọ bụ URL)
  targets: CompressionEngineTarget[]; // ["messages", "tool_results", "code_blocks"]
  stackable: boolean; // Enwere ike iji ya n'ime usoro e dokọrọ
  stackPriority: number; // Usoro n'ime usoro e dokọrọ (nke dị ala = nke mbụ)
  metadata: CompressionEngineMetadata;

  apply(body, options?): CompressionResult;
  compress(body, config?): CompressionResult;
  getConfigSchema(): EngineConfigField[];
  validateConfig(config): EngineValidationResult;
}
```

### Ọmụmaatụ Kachasị Mfe: Igwe Oghere Ọcha

Igwe kachasị mfe enwere ike ime — wepụ oghere ọcha ndị karịrị akarị n'ozi.

````ts
import type { CompressionEngine } from "omniroute/compression/engines/types";
import { registerCompressionEngine } from "omniroute/compression/engines/registry";

function preserveCodeBlocks(text: string): string {
  // Kewaa site na akara ngọngọ koodu ma chekwaa oghere ndị dị n'ime ha
  const parts = text.split(/(```[\s\S]*?```)/);
  return parts
    .map((part) => {
      if (part.startsWith("```")) {
        return part; // Agbanwela ngọngọ koodu
      }
      return part.replace(/\n{3,}/g, "\n\n"); // Tinye nke a naanị n'edemede nkọwa
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
  stackPriority: 100, // Mee ya MGBE caveman/rtk gachara

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

    // Gafee n'usoro ozi — hazie ma ọdịnaya eriri ma ọdịnaya nwere ọtụtụ akụkụ
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
      // Ọdịnaya nwere ọtụtụ akụkụ: gafee akụkụ ndị ahụ, kpokọta naanị akụkụ ederede
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
          return part; // chekwaa image_url, tool_use, na ndị ọzọ.
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

// Debanye ya n'ebe niile
registerCompressionEngine(whitespaceEngine);
````

### Ebe A Ga-edowe Injin Ahaziri Ahazi

```
~/.omniroute/compression/engines/my-engine.ts    # Nke dị n'ọkwa onye ọrụ
<project>/compression-engines/my-engine.ts        # Nke dị n'ọkwa ọrụ ngo (a na-ebunye ya mgbe mmalite)
```

Ma ọ bụ jiri plugin buo ya site na mmemme:

```ts
// N'ime plugin gị
import {
  registerCompressionEngine,
  unregisterCompressionEngine,
} from "@omniroute/open-sse/services/compression/engines/registry";
import { myEngine } from "./engines/my-engine";

export default definePlugin({
  name: "my-compression-plugin",
  // SDK plugin na-enye njikọ onRequest / onResponse / onError. Debanye
  // injin ahụ mgbe modul plugin na-ebunye (ma ọ bụ na onRequest mbụ); wepụ ndebanye ya
  // site n'ụzọ mmechi nke gị.
  onRequest: async (ctx) => {
    registerCompressionEngine(myEngine);
  },
});

// Mgbe a na-emechi:
// unregisterCompressionEngine("my-engine");
```

### Ịnwale Injin Gị

Debanye injin gị n'ime plugin ma ọ bụ ọrụ mmalite. Ozugbo e debanyere ya, injin ahụ ga-adị
na ihe nhọpụta atụmatụ site na `id` ya. Nwalee njikọta ya site n'ịgụnye ya n'ime usoro nwere ọtụtụ ọkwa:

---

## Ịmepụta Ngwugwu Asụsụ

Mkpakọ n'ụdị Caveman na-eji **ngwugwu iwu ndị akọwapụtara maka asụsụ** iji jikwaa okwu ndochi, okwu na-egosi enweghị nkwenye zuru oke, na usoro okwu toro ogologo n'asụsụ okike ọ bụla. OmniRoute na-abịa na **ngwugwu asụsụ 6**: `en`, `es`, `fr`, `de`, `ja`, `pt-BR`.

### Nhazi Ngwugwu

Ngwugwu asụsụ bụ ndekọ nwere **faịlụ JSON** n'okpuru `open-sse/services/compression/rules/<language>/`:

```
open-sse/services/compression/rules/
├── en/
│   ├── filler.json          # Ekele, okwu na-egosi enweghị nkwenye zuru oke, omume ọma
│   ├── context.json         # Iwu ndị na-ebelata ọnọdụ gbara okwu gburugburu
│   ├── dedup.json           # Iwu iwepụ ihe ndị e megharịrị
│   ├── structural.json      # Akara edemede, nhazi
│   └── ultra.json           # Iwu mkpakọ siri ike
├── es/  (otu nhazi ahụ)
├── fr/  (otu nhazi ahụ)
├── de/  (otu nhazi ahụ)
├── ja/  (otu nhazi ahụ)
└── pt-BR/ (otu nhazi ahụ)
```

### Ọdịdị Iwu

Iwu ọ bụla nwere ọdịdị a (site na `open-sse/services/compression/ruleLoader.ts`):

```ts
interface FileRule {
  name: string; // Aha mmadụ nwere ike ịgụ (kebab-case)
  pattern: string; // Usoro regex JavaScript
  replacement?: string; // Ihe a ga-eji dochie ihe dabara
  replacementMap?: Record<string, string>; // MA Ọ BỤ map igodo→nnọchi
  flags?: string; // Akara njikwa regex ("gi" n'ọtụtụ oge)
  context?: "all" | "user" | "system" | "assistant";
  category?: "filler" | "context" | "structural" | "dedup" | "terse" | "ultra";
  minIntensity?: "lite" | "full" | "ultra"; // Mafee ma ọ bụrụ na ike erughị nke a
  description?: string; // Akwụkwọ nkọwa
}
```

### Ọmụmaatụ: Ịgbakwunye Iwu Okwu Ndochi Hindi

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

### Nkwado

A na-enyocha ngwugwu iwu megide `_schema.json` mgbe a na-ebunye ha. Ngwugwu nwere nhazi na-ezighi ezi agaghị enwe ike ibunye ma ga-edekọ njehie:

```
RULE_LOADER: pack "hi/filler.json" failed validation:
  - rules.0.pattern: Invalid regex
  - rules.1.context: must be one of [all, user, system, assistant]
```

Nnyocha nkwado na-arụ ọrụ na-akpaghị aka mgbe a na-ebunye ngwugwu (megide `_schema.json`); a na-ajụ ngwugwu na-ezighi ezi ma dekọọ njehie dị n'elu. Enweghị script `npm run` pụrụ iche maka nkwado ngwugwu — bunye ngwugwu ahụ (dịka ọmụmaatụ, malite sava ahụ ma ọ bụ mee ka ụzọ mkpakọ rụọ ọrụ) ma lelee ndekọ.

### Ibu Ngwugwu Asụsụ Ahaziri

```ts
import { loadRulePack } from "omniroute/compression/ruleLoader";

await loadRulePack("./my-custom-rules/hi/filler.json");
```

Ma ọ bụ tinye ya n'ebe a na-amata:

```
~/.omniroute/compression/rules/hi/filler.json  # Ọkwa onye ọrụ
<project>/.compression/rules/hi/filler.json   # Ọkwa ọrụ ngo
```

### Omume Kachasị Mma Maka Ngwugwu Asụsụ

1. **Bido na `filler`** — ndị a bụ iwu nwere mmetụta kachasị elu
2. **Jiri `minIntensity`** gbochie iwu ndị siri ike — nke a na-echebe megide mkpakọ gabigara ókè
3. **Tinye ikpe nnwale** — gbakwunye usoro `tests[]` na JSON iji nyochaa omume
4. **Usoro dị mkpa** — iwu ndị dị n'ihu na-arụ ọrụ mbụ; debe iwu nwere mmetụta dị elu n'ihu
5. **Kpachara anya na `replacement`** — eriri efu na-abụkarị nke ziri ezi; etinyekwala ọdịnaya ọhụrụ

### Atụmatụ Nsụgharị

Mgbe a na-eme ka ngwugwu iwu kwekọọ na asụsụ ọhụrụ:

1. **Tụgharịa aha iwu ndị ahụ** — ha na-apụta na nsonaazụ debug
2. **Gbanwee usoro regex ka ha kwekọọ** — nsụgharị ozugbo anaghị arụkarị ọrụ (oke okwu dị iche)
3. **Jiri mkparịta ụka ndị e mere n'ezie nwalee ya** — ngwugwu ahụ kwesịrị ịdị nchebe na ntinye e nyere n'ezie
4. **Mee ka ọ kwekọọ na omenala** — dịka ọmụmaatụ, ngwugwu Japanese nwere ọtụtụ okwu ndochi nkwanye ugwu karịa nke English

---

## Usoro Nhazi Agbakọtara

**Usoro nhazi agbakọtara** na-eme ka ọtụtụ injin rụọ ọrụ n’usoro, ebe mmepụta injin ọ bụla na-abụ ntinye nke injin na-esote ya. Nke a bụ ka `mode: stacked` si arụ ọrụ n’ime sistemụ.

### Otu Nchịkọta Injin Si Arụ Ọrụ

```
Ntinye (token 10,000)
        │
        ▼
   ┌──────────┐
   │  Injin   │  mkpa 10
   │  A       │  ──▶ mmepụta: token 6,000 (-40%)
   └────┬─────┘
        ▼
   ┌──────────┐
   │  Injin   │  mkpa 50
   │  B       │  ──▶ mmepụta: token 2,400 (-60%)
   └────┬─────┘
        ▼
   ┌──────────┐
   │  Injin   │  mkpa 100
   │  C       │  ──▶ mmepụta: token 1,200 (-80%)
   └────┬─────┘
        │
        ▼
Mmepụta ikpeazụ (token 1,200, ~88% mbelata mgbe ejikọtara)
```

Mgbe ahọrọ `mode: "stacked"`, injin ndị ahụ na-arụ ọrụ otu na-eso ibe ya dịka usoro akọwapụtara n’ime ndepụta `pipeline`.
Mmepụta injin N na-abụ ntinye injin N+1.

### Ụdị Mkpakọ

OmniRoute na-ahọrọ **OTU ụdị maka arịrịọ ọ bụla** dabere na nhazi, oke ndị na-akpalite ọrụ na-akpaghị aka, na mgbanwe combo.
A kọwara ụdị ndị dị na `open-sse/services/compression/types.ts` (ụdị `CompressionMode`):

| Ụdị          | Injin                | Ebe eji ya                                                                                                                                                                                              |
| ------------ | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `off`        | Ọ dịghị              | Gbanyụọ mkpakọ niile                                                                                                                                                                                    |
| `rtk`        | Naanị RTK            | Oge ọrụ ndị nwere ọtụtụ mmepụta iwu (mbelata 80%+)                                                                                                                                                      |
| `lite`       | Naanị Lite           | Mkpakọ na-akpachapụ anya (ọsọ, nchekwa)                                                                                                                                                                 |
| `standard`   | Caveman              | Mkpakọ ederede nkịtị site na ngwugwu asụsụ                                                                                                                                                              |
| `aggressive` | Caveman + Aggressive | Mkpakọ siri ike nke ederede nkịtị + usoro ikpeazụ siri ike                                                                                                                                              |
| `ultra`      | Ultra                | Mkpakọ kachasị elu (nwere ike imefu ozi, nhọrọ ikpeazụ). Enwere ike iziga ya site na injin SLM **LLMLingua-2** mgbe edobere `ultra.modelPath` (ọ na-alaghachi n’usoro dabere na iwu mgbe model adịghị). |
| `stacked`    | Usoro nhazi omenala  | Jikọta injin n’usoro ọ bụla (lee n’okpuru)                                                                                                                                                              |

> E wezụga injin ụdị ndị dị n’elu, ndekọ ahụ nwekwara injin pụrụ iche a pụrụ ịgbakọta —
> **CCR**, **headroom**, **ionizer**, na **session-dedup** — nke akọwara na
> [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md#additional-built-in-engines).

`getEffectiveMode()` dị na `open-sse/services/compression/strategySelector.ts` na-ekpebi nhọrọ ụdị:

1. Ọ bụrụ na agbanyụrụ mkpakọ: `"off"`
2. Ọ bụrụ na e nwere mgbanwe combo: jiri mgbanwe ahụ
3. Ọ bụrụ na agafeela oke mkpali akpaghị aka: jiri `autoTriggerMode` (ndabara: `"lite"`)
4. Ma ọ bụghị ya: jiri `defaultMode`

### Usoro Nhazi Agbakọtara Ndabara

Mgbe ahaziri `mode: "stacked"` kpọmkwem, usoro nhazi ndabara na-ejikọta:

1. **RTK** — wepụ mkpọtụ mmepụta iwu (~80% mbelata na mmepụta terminal)
2. **Caveman** — wepụ okwu mmeju, mee ka ederede dị nkenke (~46% n’ederede fọdụrụ)
3. **Lite** — usoro ikpeazụ maka oghere ọcha + iwepụ ihe e megharịrị

Ngwakọta a na-eweta **mbelata 78-95%** n’oge ọrụ ndị na-eji ngwaọrụ nke ukwuu.

### Ịhazi Usoro Nhazi Agbakọtara

N’ime nhazi combo:

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

Ị nwere ike ịhapụ ụfọdụ injin, tinye nke omenala, ma ọ bụ gbanwee usoro ha.

### Ịnyefe Ọnọdụ

Injin nwere ike ịgụ metadata site na gburugburu arịrịọ (n’ime `options`):

```ts
compress(body, config) {
  // Gụọ metadata sitere na injin ndị gara aga
  const original = options?.compressionComboId;  // "my-coding-combo"
  // ...
}
```

Metadata ahụ bụ **maka ọgụgụ naanị** — injin enweghị ike ịgbanwe gburugburu arịrịọ; naanị mmepụta body nke ha ka ha nwere ike ịgbanwe.

### Ọnyà Dị n’Usoro Mmezu

| Usoro injin                              | Mmetụta                                                                                |
| ---------------------------------------- | -------------------------------------------------------------------------------------- |
| RTK → Caveman → Lite                     | **Akwadoro** (na-ebu ụzọ wepụ mkpọtụ, mesịa asụsụ, ma n’ikpeazụ oghere ọcha)           |
| Lite → RTK → Caveman                     | Ọjọọ — Lite na-ewepụ oghere ọcha na mmepụta mbụ, nke na-eme ka nchọpụta ụkpụrụ RTK daa |
| Caveman → RTK                            | Ọjọọ — Caveman nwere ike idegharị ederede n’ụzọ RTK na-agaghị amata                    |
| Usoro ọ bụla nwere `tool_results` na mbụ | Ka mma — mmepụta ngwaọrụ bụ ọdịnaya kacha nwee mkpọtụ                                  |

### Mgbe Ị NA-EKWESỊGHỊ Ịgbakọta

Ịgbakọta anaghị aka mma mgbe niile:

- **Ozi ndị dị mfe** (enweghị mmepụta ngwaọrụ) — naanị Caveman ma ọ bụ Lite zuru oke
- **Mgbe ọnụ ahịa dị mkpa** — injin ọ bụla na-agbakwunye ihe dịka 5-50ms n’oge nchere
- **Ngwaọrụ ụfọdụ kpọmkwem** — naanị RTK na-ezukarị maka mmepụta shell

### Ịrụ Usoro Nhazi Omenala

Enweghị ndekọ pipeline nwere aha. Pipeline a kwakọtara ọnụ bụ naanị **usoro nzọụkwụ e dere ozugbo
n'ime koodu** nke a na-ebufe na `applyStackedCompression()` (nke e si na
`@omniroute/open-sse/services/compression/strategySelector` bupụta):

```ts
import { applyStackedCompression } from "@omniroute/open-sse/services/compression/strategySelector";

const result = applyStackedCompression(body, [
  { engine: "rtk", intensity: "aggressive" },
  { engine: "caveman", intensity: "full" },
]);
```

Mgbe ị naghị ebufe pipeline, ọ na-eji `rtk(standard) → caveman(full)` dịka ndabara.

Iji hazie ya site na config, tọọ `mode: "stacked"` ma tinye usoro nzọụkwụ ahụ n'okpuru
`stackedPipeline` (nke a na-agụ site na `config.stackedPipeline`):

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

## Iwu Mmekọrịta Upstream

Igwe mkpakọ nke OmniRoute na-enye ọtụtụ ọrụ upstream otuto na README
("sitere n'ike mmụọ nsọ nke RTK, Caveman, LLMLingua-2, Troglodita"). Ajụjụ ndị
ndị na-atụnye ụtụ na-ajụkarị bụ: **mgbe upstream RTK tinyere nzacha ngwa ọhụrụ ma ọ bụ Caveman tinye
ngwugwu iwu, olee otu nke ahụ si erute OmniRoute?** Akụkụ a bụ azịza nwere ikike ikpeazụ.

### Mbipụta e webatara n'ime repo na mmejuputa nọọrọ onwe ha

| Igwe                         | Mmekọrịta ya na upstream                                                                                                                    | Ebe                                                                 |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| **RTK**                      | **Mmejuputa nọọrọ onwe ya e megharịrị** (sitere n'ike mmụọ nsọ, ọ bụghị mbipụta)                                                            | `open-sse/services/compression/engines/rtk/`                        |
| **Caveman**                  | **Mmejuputa nọọrọ onwe ya e megharịrị** (sitere n'ike mmụọ nsọ)                                                                             | `open-sse/services/compression/engines/cavemanAdapter.ts`           |
| **Headroom**                 | Ọ kachasị bụrụ nke ime; naanị kodek `gcf/` ka **e webatara n'ezie** site na `gcf-typescript` (MIT, nwere akara SPDX, naanị profaịlụ izugbe) | `open-sse/services/compression/engines/headroom/gcf/`               |
| **LLMLingua-2 / Troglodita** | Sitere n'ike mmụọ nsọ (na-akwalite igwe `llmlingua` + `session-dedup`)                                                                      | `open-sse/services/compression/engines/llmlingua/`, `session-dedup` |

Isi ihe: **RTK na Caveman bụ mmejuputa TypeScript clean-room nke
_echiche ndị ahụ_ (iwu nzacha, ngwugwu iwu), ọ bụghị osisi koodu e webatara n'ime repo.** Enweghị
mbipụta upstream a ga-eji `git pull` dọpụta — nke a bụ kpọmkwem ihe mere README ji kwuo
"sitere n'ike mmụọ nsọ" kama ịsị "agụnyere n'ime ya".

### Otu esi ejikọta nkwalite upstream

Enweghị **nsuso mwepụta upstream akpaghị aka, ọ nweghịkwa akara `compression-sync`
** — nke a bụ nhazi e kpachapụrụ anya mee. N'ihi na igwe ndị ahụ bụ mmejuputa e megharịrị, nzacha RTK
ma ọ bụ ngwugwu iwu Caveman sitere na upstream anaghị ejikọta dịka koodu; kama, a na-**ekwupụta ya ọzọ dịka
iwu/nzacha ọhụrụ n'ụdị nke OmniRoute n'onwe ya** (lee
[COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md)) ma tinye ya n'oge ọ bụla site na
PR nkịtị. Ebe mgbasawanye ndị dị n'elu (igwe ahaziri iche, ngwugwu asụsụ, nzacha RTK)
bụ ụzọ akwadoro iji tụnye otu n'ime ha.

Ihe atụ ọhụrụ nke usoro a kpọmkwem:

- Nzacha RTK maka mmepụta nrụpụta Gradle na `dotnet` (v3.8.42)
- Nzacha RTK maka kubectl / docker-build / composer / gh (#2824)
- Ngwugwu asụsụ Indonesian nke Caveman (#3975), tinyere ngwugwu German / French / Japanese / Chinese

### Headroom (proksi mkpakọ ntinye)

Headroom bụ **nke ime kpamkpam** — snapshot kodek `gcf` e webatara n'ime repo ma kpọgide ya na ụdị
a kapịrị ọnụ, tinyere oyi akwa `smartcrusher` / `toon` / `tabular` nke OmniRoute n'onwe ya. Enweghị
upstream na-arụ ọrụ ugbu a a ga-esochi ma e wezụga mbipụta ahụ e webatara n'ime repo; a na-eme ka mmelite `gcf`
dị ọhụrụ n'aka mgbe kodek gbanwere, ma nyochaa ha ọzọ megide ọnụ ụzọ mmefu mkpakọ
(`check:compression-budget`).

### Ịtụ aro nkwalite sitere n'ike mmụọ nsọ nke upstream

1. **Ewebatala ya n'ime repo** — kwupụta iwu/nzacha upstream ahụ ọzọ n'ụdị nke OmniRoute.
2. Tinye ya site n'ebe mgbasawanye dabara adaba dị n'okpuru (ngwugwu asụsụ, nzacha RTK, ma ọ bụ
   igwe ahaziri iche).
3. Rụtụ aka n'ọrụ upstream ahụ na nkọwa PR (inye otuto), ọ bụghị site n'ịṅomi
   koodu ya nke nwere ikikere.
4. Tinye ule ma kwado na ọnụ ụzọ `check:compression-budget` ka na-agafe.

---

## Ịgbakwunye Ụdị Mmepụta

Ụdị mmepụta (lee [tebụl katalọgụ dị na ntuziaka](./COMPRESSION_GUIDE.md#output-styles-catalog))
bụ akụkụ nzaghachi nke injin ntinye: kama ịkpakọta ihe ị
na-eziga, ha na-enye model ahụ ntụziaka ka ọ mepụta mmepụta dị ọnụ ala karịa. Ndebanye aha ahụ bụ
`OUTPUT_STYLE_CATALOG` n'ime `open-sse/services/compression/outputStyles/catalog.ts`, ma
**otu ndenye katalọgụ bụ atụmatụ ahụ dum**: injector, panel ntọala dashboard,
nchekwa na telemetry niile na-agụpụta katalọgụ ahụ — enweghị ndepụta ọzọ a ga-emelite.

1. **Tinye otu ndenye na `OUTPUT_STYLE_CATALOG`** nke nwere `id`, `label`, `description` na
   `levels` Bekee atọ (`lite`, `full`, `ultra`). Ọkwa ọ bụla ga-ejedebe na
   `${SHARED_BOUNDARIES}` ka koodu, ụzọ faịlụ, iwu, njehie na URL nọgide kpọmkwem dịka ha dị.
   Ederede ntụziaka ahụ ga-abụrịrị **nke anaghị agbanwe agbanwe ma na-enye otu nsonaazụ mgbe niile** maka
   `(id, level, language)` — `${SHARED_BOUNDARIES}` bụ naanị interpolation a na-ekwe.
2. **Tụgharịa ya.** Tinye ma ọ dịkarịa ala otu ngọngọ `pt-BR` n'okpuru `i18n`; `ponytail` na
   `i-have-adhd` (en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi) bụ usoro ntụaka. Ụdị e kpachapụrụ anya
   ka ọ bụrụ naanị maka otu asụsụ na-eji `locale` kama nke ahụ (dịka `terse-cjk` → `zh`) ma a na-enyezi ya
   naanị n'okpuru locale ahụ.
3. **Melite ihe nche matrix** — tinye asụsụ nke ụdị ahụ na `BASELINE_LANGUAGES` n'ime
   `tests/unit/compression/output-styles-i18n-matrix.test.ts`. Ọnụ ụzọ ahụ ga-ajụ ụdị ọhụrụ ọ bụla
   na-enweghị mgbochi locale ma ọ bụrụ na o nweghị ntụgharị ndị achọrọ, belụsọ ma o nwere
   ndenye `KNOWN_ENGLISH_ONLY` doro anya nke nwere tracking issue.
4. **Tinye ule pụrụ iche maka ụdị ahụ** nke e mere dịka
   `tests/unit/compression/i-have-adhd-catalog.test.ts`: nhazi katalọgụ, nkebi
   boundaries maka ọkwa ọ bụla, na anchor na-egosi na e dere ntụgharị ọ bụla n'asụsụ ya
   kama ịbụ Bekee e depụtaghachiri.
5. **Nkwupụta onye sitere na ya**: ọ bụrụ na e megharịrị ụdị ahụ site na upstream project, nye ya
   otuto n'ime source comment dị na ndenye ahụ (dịka `i-have-adhd` → ayghri/i-have-adhd, MIT) — otu
   iwu ahụ dị na "Proposing an upstream-inspired improvement" dị n'elu.

Enweghị mgbanwe UI, schema ma ọ bụ telemetry achọrọ — akụkụ ndị ahụ na-emepụta ihe ha na-egosi site na katalọgụ ahụ.

---

## Omume Kacha Mma

### Mmepe Injin

1. **Na-emejuputa `validateConfig` mgbe niile** — injin ndị na-enweghị validation na-ebute ọdịda na-enweghị ọkwa
2. **Tọọ `targetLatencyMs` nke ezi uche dị na ya** — strategy selector na-eji ya ahọrọ injin
3. **Jiri `getConfigSchema` maka dashboard** — ezokwala config n'aka ndị ọrụ
4. **Kwado `stackable: true` ma ọ bụrụ na injin gị bụ pure** — injin ndị nwere side effect ekwesịghị ịgbakọta
5. **Dee ule inline** — a ga-enwe ike ịnwale injin n'ime <1s

### Mmepe Ngwugwu Asụsụ

1. **Malite na ike `lite`** — iwu gị kwesịrị ịdị nchebe na ntọala kacha ala
2. **Jiri `context` kpachie oke iwu** — iwu `user` naanị agaghị emetụta system prompts na mberede
3. **Zere ijide JSON keys** — `\\bword\\b` nwere ike ịdakọ n'ime JSON, wee mebie structured data
4. **Jiri ọnọdụ ndị pụrụ iche nwalee ya** — ntinye efu, unicode, ederede RTL, emojis
5. **Jiri ngwugwu ndị dị ugbu a dịka ndebiri** — `en/filler.json` bụ ihe atụ e mepụtara nke ọma karịa ndị ọzọ

### Nhazi Pipeline

1. **Mee profiling tupu optimization** — buru ụzọ jiri `compression_stats` tụọ ya
2. **Họrọ composition karịa imegharị implementation** — gbasaa iwu Caveman tupu ide injin ọhụrụ
3. **Kọwaa ihe mere e ji họrọ usoro ahụ** — jiri comment kọwaa ihe mere injin A ji dị tupu injin B
4. **Nwalee n'ọkwa ike atọ niile** — `lite` dị ngwa mana ọ na-efunahụ ụfọdụ ozi, `ultra` dị nwayọ mana ọ ziri ezi karịa

---

## Nrụtụaka: Engines E Wunyere N'ime

| Engine ID            | Enwere ike ịtụkọta | stackPriority ndabara | Ebumnuche                           |
| -------------------- | ------------------ | --------------------- | ----------------------------------- |
| `lite`               | Ee                 | 5                     | messages, tool_results              |
| `rtk`                | Ee                 | 10                    | tool_results                        |
| `standard` (caveman) | Ee                 | 20                    | messages, tool_results, code_blocks |
| `aggressive`         | Ee                 | 30                    | messages                            |
| `ultra`              | Ee                 | 40                    | messages, code_blocks               |

### Hụkwa

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — Nchịkọta pipeline
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — Nrụtụaka ndekọ engine
- [COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md) — Nkọwapụta usoro iwu
- [COMPRESSION_LANGUAGE_PACKS.md](./COMPRESSION_LANGUAGE_PACKS.md) — Nkọwa gbasara ngwugwu asụsụ
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — Engine RTK na nzacha ahaziri iche
- Ebe mmalite: `open-sse/services/compression/` (faịlụ 117, ~250KB)
