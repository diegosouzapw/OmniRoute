# Extending the Compression Pipeline (Kiswahili)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/EXTENDING_COMPRESSION.md) · 🇪🇹 [am](../../../am/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇦 [ar](../../../ar/docs/compression/EXTENDING_COMPRESSION.md) · 🇦🇿 [az](../../../az/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇬 [bg](../../../bg/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇩 [bn](../../../bn/docs/compression/EXTENDING_COMPRESSION.md) · 🇨🇿 [cs](../../../cs/docs/compression/EXTENDING_COMPRESSION.md) · 🇩🇰 [da](../../../da/docs/compression/EXTENDING_COMPRESSION.md) · 🇩🇪 [de](../../../de/docs/compression/EXTENDING_COMPRESSION.md) · 🇬🇷 [el](../../../el/docs/compression/EXTENDING_COMPRESSION.md) · 🇪🇸 [es](../../../es/docs/compression/EXTENDING_COMPRESSION.md) · 🇪🇪 [et](../../../et/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇷 [fa](../../../fa/docs/compression/EXTENDING_COMPRESSION.md) · 🇫🇮 [fi](../../../fi/docs/compression/EXTENDING_COMPRESSION.md) · 🇫🇷 [fr](../../../fr/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇪 [ga](../../../ga/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [gu](../../../gu/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [ha](../../../ha/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇱 [he](../../../he/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [hi](../../../hi/docs/compression/EXTENDING_COMPRESSION.md) · 🇭🇷 [hr](../../../hr/docs/compression/EXTENDING_COMPRESSION.md) · 🇭🇺 [hu](../../../hu/docs/compression/EXTENDING_COMPRESSION.md) · 🇦🇲 [hy](../../../hy/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇩 [id](../../../id/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [ig](../../../ig/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇹 [it](../../../it/docs/compression/EXTENDING_COMPRESSION.md) · 🇯🇵 [ja](../../../ja/docs/compression/EXTENDING_COMPRESSION.md) · 🇬🇪 [ka](../../../ka/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇭 [km](../../../km/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [kn](../../../kn/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇷 [ko](../../../ko/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇹 [lt](../../../lt/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇻 [lv](../../../lv/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [ml](../../../ml/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [mr](../../../mr/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇾 [ms](../../../ms/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇹 [mt](../../../mt/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇲 [my](../../../my/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇵 [ne](../../../ne/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇱 [nl](../../../nl/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇴 [no](../../../no/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [or](../../../or/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [pa](../../../pa/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇭 [phi](../../../phi/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇱 [pl](../../../pl/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇹 [pt](../../../pt/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇴 [ro](../../../ro/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇺 [ru](../../../ru/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇰 [si](../../../si/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇰 [sk](../../../sk/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇮 [sl](../../../sl/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇸 [sr](../../../sr/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇪 [sv](../../../sv/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [ta](../../../ta/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [te](../../../te/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇭 [th](../../../th/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇷 [tr](../../../tr/docs/compression/EXTENDING_COMPRESSION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇰 [ur](../../../ur/docs/compression/EXTENDING_COMPRESSION.md) · 🇺🇿 [uz](../../../uz/docs/compression/EXTENDING_COMPRESSION.md) · 🇻🇳 [vi](../../../vi/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [yo](../../../yo/docs/compression/EXTENDING_COMPRESSION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/EXTENDING_COMPRESSION.md)

---

> **Kwa ufupi**: Injini ya ukandamizaji ya OmniRoute inaweza **kuongezewa vipengele** — unaweza kusajili injini maalum, kusambaza vifurushi vya lugha kwa lugha mpya, na kuunda mifumo iliyopangwa kwa safu. Mwongozo huu unaonyesha jinsi ya kufanya hivyo.

**Miongozo inayohusiana:**

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — Muhtasari kamili wa mfumo
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — Sajili ya injini na injini zilizojengewa ndani
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — Injini ya RTK na vichujio maalum
- [COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md) — Rejeleo la muundo wa kifurushi cha kanuni

---

## Muhtasari

Mfumo wa ukandamizaji una **sehemu 3 za upanuzi**:

| Sehemu ya upanuzi             | Matumizi                                                                           | Ugumu   |
| ----------------------------- | ---------------------------------------------------------------------------------- | ------- |
| **Injini maalum**             | Ongeza algoriti mpya kabisa ya ukandamizaji (k.m., kifupishaji mahususi kwa kikoa) | Juu     |
| **Kifurushi cha lugha**       | Ongeza uwezo wa kutumia lugha mpya ya asili (k.m., Kihindi, Kiarabu)               | Wastani |
| **Mfumo uliopangwa kwa safu** | Unganisha injini zilizopo kwa mpangilio maalum                                     | Rahisi  |

```
┌─────────────────────────────────────────────────────────────┐
│                    Mkakati wa Ukandamizaji                   │
│                                                              │
│   Ujumbe wa kuingiza ──▶ getEffectiveMode() ──▶ modi         │
│                                              │               │
│                      ┌───────────────────────┼──────────┐    │
│                      │         │         │         │    │    │
│                      ▼         ▼         ▼         ▼    │    │
│                   "rtk"    "lite"   "standard" "stacked"    │
│                      │         │         │         │    │    │
│                      ▼         ▼         ▼         ▼    │    │
│                   RTK       Lite     Caveman   engines[]   │
│                   injini    injini   injini    zilizounganishwa │
│                      │         │         │         │    │    │
│                      └─────────┴─────────┴─────────┘    │    │
│                                      │                    │
│                                      ▼                    │
│                             Tokeo lililokandamizwa         │
└─────────────────────────────────────────────────────────────┘

Kiteuzi cha mkakati HUTEGEMEA MODI: kila ombi huchagua modi MOJA
(rtk / lite / standard / aggressive / ultra / stacked / off).
Ni modi ya "stacked" pekee inayounganisha injini nyingi kwa mfuatano.
Modi chaguomsingi ya uanzishaji kiotomatiki ni "lite" (si mnyororo wa kipaumbele wa ngazi 3).
```

---

## Kuandika Injini Maalum ya Ukandamizaji

Kiolesura cha injini (`open-sse/services/compression/engines/types.ts`) ni mkataba ambao kila injini lazima itimize. Kina mbinu 5 zinazohitajika.

### Kiolesura cha `CompressionEngine`

```ts
interface CompressionEngine {
  id: string; // Kitambulisho cha kipekee cha injini
  name: string; // Jina la kuonyeshwa
  description: string; // Maelezo mafupi
  icon: string; // Ikoni (emoji au URL)
  targets: CompressionEngineTarget[]; // ["messages", "tool_results", "code_blocks"]
  stackable: boolean; // Inaweza kutumiwa katika mfumo uliopangwa kwa safu
  stackPriority: number; // Mpangilio katika mifumo iliyopangwa kwa safu (ndogo = mapema zaidi)
  metadata: CompressionEngineMetadata;

  apply(body, options?): CompressionResult;
  compress(body, config?): CompressionResult;
  getConfigSchema(): EngineConfigField[];
  validateConfig(config): EngineValidationResult;
}
```

### Mfano Rahisi Zaidi: Injini ya Nafasi Nyeupe

Injini rahisi zaidi inayowezekana — ondoa nafasi nyeupe za ziada kwenye ujumbe.

````ts
import type { CompressionEngine } from "omniroute/compression/engines/types";
import { registerCompressionEngine } from "omniroute/compression/engines/registry";

function preserveCodeBlocks(text: string): string {
  // Gawanya kwa alama za vizuizi vya msimbo na uhifadhi nafasi tupu ndani yake
  const parts = text.split(/(```[\s\S]*?```)/);
  return parts
    .map((part) => {
      if (part.startsWith("```")) {
        return part; // Usibadilishe vizuizi vya msimbo
      }
      return part.replace(/\n{3,}/g, "\n\n"); // Tumia hii kwenye maandishi ya kawaida pekee
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
  stackPriority: 100, // Tekeleza BAADA ya caveman/rtk

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

    // Pitia safu ya ujumbe — shughulikia maudhui ya tungo na ya sehemu nyingi
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
      // Maudhui ya sehemu nyingi: pitia sehemu, bana sehemu za maandishi pekee
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
          return part; // hifadhi image_url, tool_use, na kadhalika.
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

// Sajili kwa matumizi ya jumla
registerCompressionEngine(whitespaceEngine);
````

### Mahali pa Kuweka Injini Maalum

```
~/.omniroute/compression/engines/my-engine.ts    # Kiwango cha mtumiaji
<project>/compression-engines/my-engine.ts        # Kiwango cha mradi (hupakiwa wakati wa kuanza)
```

Au ipakie kwa utaratibu kupitia programu-jalizi:

```ts
// Ndani ya programu-jalizi yako
import {
  registerCompressionEngine,
  unregisterCompressionEngine,
} from "@omniroute/open-sse/services/compression/engines/registry";
import { myEngine } from "./engines/my-engine";

export default definePlugin({
  name: "my-compression-plugin",
  // SDK ya programu-jalizi hutoa vihusishi vya onRequest / onResponse / onError. Sajili
  // injini wakati moduli ya programu-jalizi inapopakiwa (au kwenye onRequest ya kwanza); iondoe kwenye usajili
  // kupitia njia yako mwenyewe ya kusitisha.
  onRequest: async (ctx) => {
    registerCompressionEngine(myEngine);
  },
});

// Wakati wa kusitisha:
// unregisterCompressionEngine("my-engine");
```

### Kujaribu Injini Yako

Sajili injini yako katika programu-jalizi au kitendakazi cha kuanzisha. Baada ya kusajiliwa, injini itapatikana
katika kiteuzi cha mkakati kupitia `id` yake. Jaribu ujumuishaji kwa kuiunganisha katika mfuatano uliopangwa kwa safu:

---

## Kuunda Vifurushi vya Lugha

Mfinyazo wa mtindo wa Caveman hutumia **vifurushi vya kanuni mahususi kwa kila lugha** kushughulikia maneno ya kujaza, lugha ya kusita, na mifumo yenye maneno mengi katika kila lugha asilia. OmniRoute huja na **vifurushi 6 vya lugha**: `en`, `es`, `fr`, `de`, `ja`, `pt-BR`.

### Muundo wa Kifurushi

Kifurushi cha lugha ni saraka ya **faili za JSON** chini ya `open-sse/services/compression/rules/<language>/`:

```
open-sse/services/compression/rules/
├── en/
│   ├── filler.json          # Salamu za kirafiki, lugha ya kusita, adabu
│   ├── context.json         # Kanuni za kupunguza muktadha
│   ├── dedup.json           # Kanuni za kuondoa urudufu
│   ├── structural.json      # Uakifishaji, uumbizaji
│   └── ultra.json           # Kanuni za mfinyazo mkali
├── es/  (muundo sawa)
├── fr/  (muundo sawa)
├── de/  (muundo sawa)
├── ja/  (muundo sawa)
└── pt-BR/ (muundo sawa)
```

### Muundo wa Kanuni

Kila kanuni ina muundo huu (kutoka `open-sse/services/compression/ruleLoader.ts`):

```ts
interface FileRule {
  name: string; // Jina linalosomeka na binadamu (kebab-case)
  pattern: string; // Muundo wa regex wa JavaScript
  replacement?: string; // Kile cha kuchukua nafasi ya sehemu inayolingana
  replacementMap?: Record<string, string>; // AU ramani ya ufunguo→kibadala
  flags?: string; // Viashiria vya regex (kwa kawaida "gi")
  context?: "all" | "user" | "system" | "assistant";
  category?: "filler" | "context" | "structural" | "dedup" | "terse" | "ultra";
  minIntensity?: "lite" | "full" | "ultra"; // Ruka ikiwa kiwango kiko chini ya hiki
  description?: string; // Nyaraka
}
```

### Mfano: Kuongeza Kanuni za Maneno ya Kujaza za Kihindi

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

### Uthibitishaji

Vifurushi vya kanuni huthibitishwa dhidi ya `_schema.json` vinapopakiwa. Kifurushi chenye muundo usio sahihi kitashindwa kupakiwa na kosa litaandikwa kwenye kumbukumbu:

```
RULE_LOADER: pack "hi/filler.json" failed validation:
  - rules.0.pattern: Invalid regex
  - rules.1.context: must be one of [all, user, system, assistant]
```

Uthibitishaji huendeshwa kiotomatiki wakati kifurushi kinapopakiwa (dhidi ya `_schema.json`); kifurushi batili hukataliwa na kosa lililo hapo juu huandikwa kwenye kumbukumbu. Hakuna hati tofauti ya `npm run` kwa ajili ya uthibitishaji wa kifurushi — pakia kifurushi (k.m. anzisha seva au tumia njia ya mfinyazo) kisha ufuatilie kumbukumbu.

### Kupakia Kifurushi Maalumu cha Lugha

```ts
import { loadRulePack } from "omniroute/compression/ruleLoader";

await loadRulePack("./my-custom-rules/hi/filler.json");
```

Au kiweke katika eneo linalotambuliwa:

```
~/.omniroute/compression/rules/hi/filler.json  # Kiwango cha mtumiaji
<project>/.compression/rules/hi/filler.json   # Kiwango cha mradi
```

### Mbinu Bora za Vifurushi vya Lugha

1. **Anza na `filler`** — hizi ndizo kanuni zenye athari kubwa zaidi
2. **Tumia `minIntensity`** kudhibiti kanuni kali — hulinda dhidi ya mfinyazo uliopitiliza
3. **Jumuisha visa vya majaribio** — ongeza safu ya `tests[]` katika JSON ili kuthibitisha utendaji
4. **Mpangilio ni muhimu** — kanuni za awali hutumika kwanza; weka kanuni zenye athari kubwa kwanza
5. **Kuwa mwangalifu na `replacement`** — kwa kawaida tungo tupu ndiyo sahihi; usiwahi kuanzisha maudhui mapya

### Mkakati wa Tafsiri

Unaporekebisha vifurushi vya kanuni kwa ajili ya lugha mpya:

1. **Tafsiri majina ya kanuni** — huonekana katika matokeo ya utatuzi
2. **Rekebisha mifumo ya regex** — tafsiri ya moja kwa moja mara nyingi haifanyi kazi (mipaka ya maneno hutofautiana)
3. **Jaribu kwa mazungumzo halisi** — kifurushi kinapaswa kuwa salama kwa ingizo halisi
4. **Linganisha desturi za kitamaduni** — kwa mfano, vifurushi vya Kijapani vina maneno mengi zaidi ya heshima yanayotumika kama vijazaji kuliko vya Kiingereza

---

## Mabomba Yaliyopangwa kwa Mfuatano

**Bomba lililopangwa kwa mfuatano** huendesha injini nyingi kwa mfuatano, huku matokeo ya kila injini yakiingizwa kwenye injini inayofuata. Hivi ndivyo `mode: stacked` inavyofanya kazi ndani kwa ndani.

### Jinsi Upangaji kwa Mfuatano Unavyofanya Kazi

```
Ingizo (tokeni 10,000)
        │
        ▼
   ┌──────────┐
   │  Injini  │  kipaumbele 10
   │  A       │  ──▶ matokeo: tokeni 6,000 (-40%)
   └────┬─────┘
        ▼
   ┌──────────┐
   │  Injini  │  kipaumbele 50
   │  B       │  ──▶ matokeo: tokeni 2,400 (-60%)
   └────┬─────┘
        ▼
   ┌──────────┐
   │  Injini  │  kipaumbele 100
   │  C       │  ──▶ matokeo: tokeni 1,200 (-80%)
   └────┬─────┘
        │
        ▼
Matokeo ya mwisho (tokeni 1,200, ~88% ya uokoaji kwa pamoja)
```

Wakati `mode: "stacked"` imechaguliwa, injini hutekelezwa kwa mfuatano kwa mpangilio uliobainishwa katika safu ya `pipeline`.
Matokeo ya injini N huwa ingizo la injini N+1.

### Modi za Mfinyazo

OmniRoute huchagua **modi MOJA kwa kila ombi** kulingana na usanidi, vizingiti vya uanzishaji otomatiki, na ubatilishaji wa michanganyiko.
Modi zinazopatikana zimefafanuliwa katika `open-sse/services/compression/types.ts` (aina ya `CompressionMode`):

| Modi         | Injini               | Matumizi                                                                                                                                                                                                                                    |
| ------------ | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `off`        | Hakuna               | Zima mfinyazo wote                                                                                                                                                                                                                          |
| `rtk`        | RTK pekee            | Vipindi vyenye matokeo mengi ya amri (uokoaji wa 80%+)                                                                                                                                                                                      |
| `lite`       | Lite pekee           | Mfinyazo wa tahadhari (wa haraka, salama)                                                                                                                                                                                                   |
| `standard`   | Caveman              | Mfinyazo wa nathari kwa kutumia vifurushi vya lugha                                                                                                                                                                                         |
| `aggressive` | Caveman + Aggressive | Nathari iliyofinyazwa kwa nguvu + hatua ya mwisho yenye mfinyazo mkali                                                                                                                                                                      |
| `ultra`      | Ultra                | Mfinyazo wa kiwango cha juu kabisa (wenye upotevu, chaguo la mwisho). Kwa hiari, hupitishwa kupitia injini ya SLM ya **LLMLingua-2** wakati `ultra.modelPath` imewekwa (hurejea kwenye njia inayotegemea kanuni wakati modeli haipatikani). |
| `stacked`    | Bomba maalumu        | Unganisha injini kwa mpangilio wowote (tazama hapa chini)                                                                                                                                                                                   |

> Zaidi ya injini za modi zilizo hapo juu, sajili pia huja na injini maalumu zinazoweza kupangwa kwa mfuatano —
> **CCR**, **headroom**, **ionizer**, na **session-dedup** — zilizofafanuliwa katika
> [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md#additional-built-in-engines).

Uteuzi wa modi huamuliwa na `getEffectiveMode()` katika `open-sse/services/compression/strategySelector.ts`:

1. Ikiwa mfinyazo umezimwa: `"off"`
2. Ikiwa ubatilishaji wa mchanganyiko upo: tumia ubatilishaji huo
3. Ikiwa kizingiti cha uanzishaji otomatiki kimepitwa: tumia `autoTriggerMode` (chaguo-msingi: `"lite"`)
4. Vinginevyo: tumia `defaultMode`

### Bomba Chaguo-msingi Lililopangwa kwa Mfuatano

Wakati `mode: "stacked"` imesanidiwa waziwazi, bomba chaguo-msingi huunganisha:

1. **RTK** — huondoa kelele katika matokeo ya amri (~80% ya uokoaji kwenye matokeo ya terminali)
2. **Caveman** — huondoa maneno ya kujazia na kufanya nathari iwe fupi (~46% kwenye maandishi yaliyobaki)
3. **Lite** — hatua ya mwisho ya nafasi tupu + uondoaji wa marudio

Muundo huu hufanikisha **uokoaji wa 78-95%** katika vipindi vinavyotumia zana kwa wingi.

### Kusanidi Mabomba Yaliyopangwa kwa Mfuatano

Katika usanidi wa mchanganyiko:

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

Unaweza kuacha baadhi ya injini, kuongeza injini maalumu, au kubadilisha mpangilio wake.

### Upitishaji wa Hali

Injini zinaweza kusoma metadata kutoka kwenye muktadha wa ombi (katika `options`):

```ts
compress(body, config) {
  // Soma metadata kutoka kwa injini zilizotangulia
  const original = options?.compressionComboId;  // "my-coding-combo"
  // ...
}
```

Metadata ni ya **kusomwa pekee** — injini haziwezi kubadilisha muktadha wa ombi, bali zinaweza kubadilisha tu matokeo ya mwili wake zenyewe.

### Mambo ya Kuzingatia Kuhusu Mpangilio wa Utekelezaji

| Mpangilio wa injini                          | Athari                                                                                                           |
| -------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| RTK → Caveman → Lite                         | **Unapendekezwa** (huondoa kelele kwanza, kisha lugha, halafu nafasi tupu)                                       |
| Lite → RTK → Caveman                         | Mbaya — Lite huondoa nafasi tupu kutoka kwenye matokeo ghafi, na kufanya ulinganishaji wa ruwaza wa RTK ushindwe |
| Caveman → RTK                                | Mbaya — Caveman inaweza kuandika upya maandishi kwa njia ambazo RTK haitambui                                    |
| Mpangilio wowote wenye `tool_results` kwanza | Bora — matokeo ya zana ndiyo maudhui yenye kelele nyingi zaidi                                                   |

### Wakati wa KUTOTUMIA Upangaji kwa Mfuatano

Upangaji kwa mfuatano si bora kila wakati:

- **Ujumbe rahisi** (bila matokeo ya zana) — Caveman au Lite moja inatosha
- **Unapozingatia gharama** — kila injini huongeza ucheleweshaji wa ~5-50ms
- **Zana mahususi** — kwa kawaida RTK pekee inatosha kwa matokeo ya shell

### Kuunda Bomba Maalumu

Hakuna rejista ya pipeline yenye jina. Pipeline iliyopangwa kwa tabaka ni **safu ya ndani ya hatua** inayopitishwa kwa `applyStackedCompression()` (iliyosafirishwa kutoka
`@omniroute/open-sse/services/compression/strategySelector`):

```ts
import { applyStackedCompression } from "@omniroute/open-sse/services/compression/strategySelector";

const result = applyStackedCompression(body, [
  { engine: "rtk", intensity: "aggressive" },
  { engine: "caveman", intensity: "full" },
]);
```

Usipopitisha pipeline, chaguo-msingi ni `rtk(standard) → caveman(full)`.

Ili kuidhibiti kupitia usanidi, weka `mode: "stacked"` na utoe safu ya hatua chini ya
`stackedPipeline` (inayosomwa kutoka `config.stackedPipeline`):

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

## Sera ya Usawazishaji na Upstream

Injini za ukandamizaji za OmniRoute zinazitambua miradi kadhaa ya upstream katika README
("inspired by RTK, Caveman, LLMLingua-2, Troglodita"). Swali la kawaida kutoka kwa wachangiaji
ni: **upstream RTK inapoongeza kichujio kipya cha zana au Caveman inapoongeza kifurushi cha
kanuni, hilo linafikaje OmniRoute?** Sehemu hii ndiyo jibu rasmi.

### Nakala zilizojumuishwa dhidi ya utekelezaji huru

| Injini                       | Uhusiano na upstream                                                                                                                                                 | Mahali                                                              |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| **RTK**                      | **Utekelezaji upya huru** (umehamasishwa na mradi huo, si nakala)                                                                                                    | `open-sse/services/compression/engines/rtk/`                        |
| **Caveman**                  | **Utekelezaji upya huru** (umehamasishwa na mradi huo)                                                                                                               | `open-sse/services/compression/engines/cavemanAdapter.ts`           |
| **Headroom**                 | Kwa kiasi kikubwa ni wa ndani; ni codec ya `gcf/` pekee ndiyo **imejumuishwa kikweli** kutoka `gcf-typescript` (MIT, imewekewa alama ya SPDX, wasifu wa jumla pekee) | `open-sse/services/compression/engines/headroom/gcf/`               |
| **LLMLingua-2 / Troglodita** | Zimehamasishwa na miradi hiyo (huendesha injini za `llmlingua` + `session-dedup`)                                                                                    | `open-sse/services/compression/engines/llmlingua/`, `session-dedup` |

Jambo kuu: **RTK na Caveman ni utekelezaji wa TypeScript ulioundwa bila kurejelea msimbo wa chanzo wa
upstream wa _mawazo_ (kanuni za vichujio, vifurushi vya kanuni), si miti ya msimbo wa chanzo iliyojumuishwa.** Hakuna
nakala ya upstream ya kutumia `git pull` — na hiyo ndiyo sababu hasa README inasema
"inspired by" badala ya "bundled".

### Jinsi maboresho ya upstream yanavyounganishwa

**Hakuna ufuatiliaji wa kiotomatiki wa matoleo ya upstream na hakuna lebo ya `compression-sync`
** — kwa makusudi. Kwa sababu injini hizi ni utekelezaji upya, kichujio cha upstream RTK
au kifurushi cha kanuni cha Caveman hakiunganishwi kama msimbo; badala yake, **kinaelezwa upya kama
kanuni/kichujio kipya katika muundo wa OmniRoute yenyewe** (tazama
[COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md)) na huongezwa inapohitajika kupitia
PR ya kawaida. Sehemu za upanuzi zilizo hapo juu (injini maalum, kifurushi cha lugha, kichujio cha RTK)
ndizo njia zilizoidhinishwa za kuchangia.

Mifano ya hivi karibuni ya mtiririko huu hasa:

- Vichujio vya RTK vya matokeo ya ujenzi wa Gradle na `dotnet` (v3.8.42)
- Vichujio vya RTK vya kubectl / docker-build / composer / gh (#2824)
- Kifurushi cha lugha ya Kiindonesia cha Caveman (#3975), pamoja na vifurushi vya Kijerumani / Kifaransa / Kijapani / Kichina

### Headroom (proksi ya ukandamizaji wa ingizo)

Headroom ni **ya ndani kikamilifu** — snapshot iliyobandikwa ya codec ya `gcf` iliyojumuishwa pamoja na
tabaka za `smartcrusher` / `toon` / `tabular` za OmniRoute yenyewe. Hakuna upstream hai
ya kufuatilia zaidi ya nakala iliyojumuishwa; masasisho ya `gcf` huonyeshwa upya
kwa mikono codec inapobadilika na kuthibitishwa upya dhidi ya kizuizi cha bajeti ya ukandamizaji
(`check:compression-budget`).

### Kupendekeza boresho lililohamasishwa na upstream

1. **Usijumuishe msimbo wa upstream** — eleza upya kanuni/kichujio cha upstream katika muundo wa OmniRoute.
2. Kiongeze kupitia sehemu ya upanuzi inayolingana hapa chini (kifurushi cha lugha, kichujio cha RTK, au
   injini maalum).
3. Rejelea mradi wa upstream katika maelezo ya PR (kwa ajili ya utambuzi), si kwa
   kunakili msimbo wake wa chanzo wenye leseni.
4. Jumuisha majaribio na uthibitishe kuwa kizuizi cha `check:compression-budget` bado kinapita.

---

## Kuongeza Mtindo wa Tokeo

Mitindo ya matokeo (angalia [jedwali la katalogi la mwongozo](./COMPRESSION_GUIDE.md#output-styles-catalog))
ni kifani cha upande wa majibu cha injini za ingizo: badala ya kubana unachotuma,
huielekeza modeli kutoa tokeo lenye gharama ndogo. Sajili ni
`OUTPUT_STYLE_CATALOG` katika `open-sse/services/compression/outputStyles/catalog.ts`, na
**ingizo moja la katalogi ndilo kipengele kizima**: kiingiza maagizo, paneli ya mipangilio ya dashibodi,
uhifadhi na telemetria zote huorodhesha katalogi — hakuna orodha nyingine ya kusasisha.

1. **Ongeza ingizo moja kwenye `OUTPUT_STYLE_CATALOG`** lenye `id`, `label`, `description` na
   `levels` tatu za Kiingereza (`lite`, `full`, `ultra`). Kila kiwango lazima kiishe kwa
   `${SHARED_BOUNDARIES}` ili msimbo, njia, amri, hitilafu na URL zibaki kama zilivyo.
   Maandishi ya maagizo lazima yawe **thabiti na yanayoweza kutabirika** kwa kila
   `(id, level, language)` — `${SHARED_BOUNDARIES}` ndiyo interpoleshini pekee inayoruhusiwa.
2. **Yatafsiri.** Jumuisha angalau bloku ya `pt-BR` chini ya `i18n`; `ponytail` na
   `i-have-adhd` (en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi) ndizo muundo wa marejeleo. Mtindo wa
   lugha moja kimakusudi huweka `locale` badala yake (kama `terse-cjk` → `zh`) na kisha
   hutolewa chini ya lokaleyo pekee.
3. **Sasisha ulinzi wa matriki** — ongeza lugha za mtindo kwenye `BASELINE_LANGUAGES` katika
   `tests/unit/compression/output-styles-i18n-matrix.test.ts`. Kizuizi hukataa mtindo wowote mpya
   usiodhibitiwa kwa lokali ambao hauna tafsiri zinazohitajika, isipokuwa uwe na
   ingizo dhahiri la `KNOWN_ENGLISH_ONLY` lenye suala la ufuatiliaji.
4. **Ongeza jaribio maalumu kwa kila mtindo** lililoundwa kwa kuiga
   `tests/unit/compression/i-have-adhd-catalog.test.ts`: muundo wa katalogi, kifungu cha
   mipaka kwa kila kiwango, na uthibitisho wa msingi unaohakikisha kila tafsiri imeandikwa katika lugha yake
   badala ya kunakiliwa kutoka Kiingereza.
5. **Utoaji wa sifa**: ikiwa mtindo umetoholewa kutoka mradi wa nje, toa sifa katika
   maoni ya chanzo kwenye ingizo (kwa mfano `i-have-adhd` → ayghri/i-have-adhd, MIT) — ni
   kanuni ileile kama "Kupendekeza uboreshaji uliochochewa na mradi wa nje" hapo juu.

Hakuna mabadiliko ya UI, schema au telemetria yanayohitajika — sehemu hizo huonyeshwa kutoka kwenye katalogi.

---

## Mbinu Bora

### Uundaji wa Injini

1. **Tekeleza `validateConfig` kila wakati** — injini zisizo na uthibitishaji husababisha kushindwa kimya kimya
2. **Weka `targetLatencyMs` halisi** — hutumiwa na kiteuzi cha mkakati kuchagua injini
3. **Tumia `getConfigSchema` kwa dashibodi** — usiwahi kuwaficha watumiaji usanidi
4. **Tumia `stackable: true` ikiwa injini yako ni safi** — injini zenye athari za pembeni hazipaswi kupangwa pamoja
5. **Andika majaribio ndani ya msimbo** — injini zinapaswa kuthibitishika ndani ya <1s

### Uundaji wa Kifurushi cha Lugha

1. **Anza na kiwango cha `lite`** — kanuni zako zinapaswa kuwa salama katika mpangilio wa chini kabisa
2. **Tumia `context` kuweka mawanda ya kanuni** — kanuni za `user` pekee haziwezi kuathiri vidokezo vya mfumo kwa bahati mbaya
3. **Epuka kunasa funguo za JSON** — `\\bword\\b` inaweza kulingana ndani ya JSON na kuvuruga data yenye muundo
4. **Jaribu kwa hali za ukingo** — ingizo tupu, unicode, maandishi ya RTL, emoji
5. **Tumia vifurushi vilivyopo kama violezo** — `en/filler.json` ndio mfano uliokuzwa zaidi

### Usanifu wa Bomba la Uchakataji

1. **Fanya uchanganuzi wa utendaji kabla ya kuboresha** — pima kwa `compression_stats` kwanza
2. **Pendelea uunganishaji badala ya utekelezaji upya** — panua kanuni za Caveman kabla ya kuandika injini mpya
3. **Andika sababu za mpangilio** — eleza kwenye maoni kwa nini injini A iko kabla ya injini B
4. **Jaribu katika viwango vyote 3 vya ukali** — `lite` ni ya haraka lakini hupoteza taarifa, `ultra` ni ya polepole lakini sahihi zaidi

---

## Marejeleo: Injini Zilizojengewa Ndani

| Kitambulisho cha Injini | Inaweza Kupangwa kwa Tabaka | stackPriority Chaguo-msingi | Malengo                             |
| ----------------------- | --------------------------- | --------------------------- | ----------------------------------- |
| `lite`                  | Ndiyo                       | 5                           | messages, tool_results              |
| `rtk`                   | Ndiyo                       | 10                          | tool_results                        |
| `standard` (caveman)    | Ndiyo                       | 20                          | messages, tool_results, code_blocks |
| `aggressive`            | Ndiyo                       | 30                          | messages                            |
| `ultra`                 | Ndiyo                       | 40                          | messages, code_blocks               |

### Tazama Pia

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — Muhtasari wa pipeline
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — Marejeleo ya sajili ya injini
- [COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md) — Vipimo vya muundo wa kanuni
- [COMPRESSION_LANGUAGE_PACKS.md](./COMPRESSION_LANGUAGE_PACKS.md) — Maelezo ya kifurushi cha lugha
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — Injini ya RTK na vichujio maalum
- Chanzo: `open-sse/services/compression/` (faili 117, ~250KB)
