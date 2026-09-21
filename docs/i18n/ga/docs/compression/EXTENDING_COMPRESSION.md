# Extending the Compression Pipeline (Gaeilge)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/EXTENDING_COMPRESSION.md) · 🇪🇹 [am](../../../am/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇦 [ar](../../../ar/docs/compression/EXTENDING_COMPRESSION.md) · 🇦🇿 [az](../../../az/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇬 [bg](../../../bg/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇩 [bn](../../../bn/docs/compression/EXTENDING_COMPRESSION.md) · 🇨🇿 [cs](../../../cs/docs/compression/EXTENDING_COMPRESSION.md) · 🇩🇰 [da](../../../da/docs/compression/EXTENDING_COMPRESSION.md) · 🇩🇪 [de](../../../de/docs/compression/EXTENDING_COMPRESSION.md) · 🇬🇷 [el](../../../el/docs/compression/EXTENDING_COMPRESSION.md) · 🇪🇸 [es](../../../es/docs/compression/EXTENDING_COMPRESSION.md) · 🇪🇪 [et](../../../et/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇷 [fa](../../../fa/docs/compression/EXTENDING_COMPRESSION.md) · 🇫🇮 [fi](../../../fi/docs/compression/EXTENDING_COMPRESSION.md) · 🇫🇷 [fr](../../../fr/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [gu](../../../gu/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [ha](../../../ha/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇱 [he](../../../he/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [hi](../../../hi/docs/compression/EXTENDING_COMPRESSION.md) · 🇭🇷 [hr](../../../hr/docs/compression/EXTENDING_COMPRESSION.md) · 🇭🇺 [hu](../../../hu/docs/compression/EXTENDING_COMPRESSION.md) · 🇦🇲 [hy](../../../hy/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇩 [id](../../../id/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [ig](../../../ig/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇹 [it](../../../it/docs/compression/EXTENDING_COMPRESSION.md) · 🇯🇵 [ja](../../../ja/docs/compression/EXTENDING_COMPRESSION.md) · 🇬🇪 [ka](../../../ka/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇭 [km](../../../km/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [kn](../../../kn/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇷 [ko](../../../ko/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇹 [lt](../../../lt/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇻 [lv](../../../lv/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [ml](../../../ml/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [mr](../../../mr/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇾 [ms](../../../ms/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇹 [mt](../../../mt/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇲 [my](../../../my/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇵 [ne](../../../ne/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇱 [nl](../../../nl/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇴 [no](../../../no/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [or](../../../or/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [pa](../../../pa/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇭 [phi](../../../phi/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇱 [pl](../../../pl/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇹 [pt](../../../pt/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇴 [ro](../../../ro/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇺 [ru](../../../ru/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇰 [si](../../../si/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇰 [sk](../../../sk/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇮 [sl](../../../sl/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇸 [sr](../../../sr/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇪 [sv](../../../sv/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇪 [sw](../../../sw/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [ta](../../../ta/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [te](../../../te/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇭 [th](../../../th/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇷 [tr](../../../tr/docs/compression/EXTENDING_COMPRESSION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇰 [ur](../../../ur/docs/compression/EXTENDING_COMPRESSION.md) · 🇺🇿 [uz](../../../uz/docs/compression/EXTENDING_COMPRESSION.md) · 🇻🇳 [vi](../../../vi/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [yo](../../../yo/docs/compression/EXTENDING_COMPRESSION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/EXTENDING_COMPRESSION.md)

---

> **Go hachomair**: Tá inneall comhbhrúite OmniRoute **inphlugáilte** — is féidir leat innill shaincheaptha a chlárú, pacáistí teanga a sholáthar do theangacha nua, agus píblínte cruachta a chumadh. Léirítear sa treoir seo conas é sin a dhéanamh.

**Treoracha gaolmhara:**

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — Forléargas iomlán ar an bpíblíne
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — Clárlann na n-inneall agus na hinnill ionsuite
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — Inneall RTK agus scagairí saincheaptha
- [COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md) — Tagairt d'fhormáid na bpacáistí rialacha

---

## Forléargas

Tá **3 phointe sínte** sa chóras comhbhrúite:

| Pointe sínte             | Cás úsáide                                                             | Deacracht    |
| ------------------------ | ---------------------------------------------------------------------- | ------------ |
| **Inneall saincheaptha** | Cuir algartam comhbhrúite úrnua leis (m.sh., achoimreoir sainréimse)   | Ardleibhéal  |
| **Pacáiste teanga**      | Cuir tacaíocht do theanga nádúrtha nua leis (m.sh., Hiondúis, Araibis) | Meánleibhéal |
| **Píblíne chruachta**    | Cum innill atá ann cheana in ord saincheaptha                          | Bunleibhéal  |

```
┌─────────────────────────────────────────────────────────────┐
│                    Straitéis Chomhbhrúite                    │
│                                                              │
│   Teachtaireachtaí ionchuir ──▶ getEffectiveMode() ──▶ mód   │
│                                              │               │
│                      ┌───────────────────────┼──────────┐    │
│                      │         │         │         │    │    │
│                      ▼         ▼         ▼         ▼    │    │
│                   "rtk"    "lite"   "standard" "stacked"    │
│                      │         │         │         │    │    │
│                      ▼         ▼         ▼         ▼    │    │
│                   RTK       Lite     Caveman   engines[]   │
│                   inneall   inneall  inneall   nasctha     │
│                      │         │         │         │    │    │
│                      └─────────┴─────────┴─────────┘    │    │
│                                      │                    │
│                                      ▼                    │
│                             Aschur comhbhrúite             │
└─────────────────────────────────────────────────────────────┘

Tá an roghnóir straitéise BUNAITHE AR MHÓD: roghnaíonn gach iarratas MÓD AMHÁIN
(rtk / lite / standard / aggressive / ultra / stacked / off).
Ní dhéanann ach an mód "stacked" innill iolracha a nascadh i seicheamh.
Is é "lite" an mód réamhshocraithe uathspreagtha (ní slabhra tosaíochta 3 shraith é).
```

---

## Inneall Comhbhrúite Saincheaptha a Scríobh

Is é comhéadan an innill (`open-sse/services/compression/engines/types.ts`) an conradh nach mór do gach inneall a chomhlíonadh. Tá 5 mhodh riachtanacha aige.

### Comhéadan `CompressionEngine`

```ts
interface CompressionEngine {
  id: string; // Aitheantas uathúil an innill
  name: string; // Ainm taispeána
  description: string; // Cur síos gairid
  icon: string; // Deilbhín (emoji nó URL)
  targets: CompressionEngineTarget[]; // ["messages", "tool_results", "code_blocks"]
  stackable: boolean; // An féidir é a úsáid i bpíblíne chruachta
  stackPriority: number; // Ord i bpíblínte cruachta (níos ísle = níos luaithe)
  metadata: CompressionEngineMetadata;

  apply(body, options?): CompressionResult;
  compress(body, config?): CompressionResult;
  getConfigSchema(): EngineConfigField[];
  validateConfig(config): EngineValidationResult;
}
```

### Sampla Íosta: Inneall Spás Bán

An t-inneall is simplí is féidir — bain spás bán breise de theachtaireachtaí.

````ts
import type { CompressionEngine } from "omniroute/compression/engines/types";
import { registerCompressionEngine } from "omniroute/compression/engines/registry";

function preserveCodeBlocks(text: string): string {
  // Roinn de réir marcóirí bloic chóid agus caomhnaigh an spás bán laistigh díobh
  const parts = text.split(/(```[\s\S]*?```)/);
  return parts
    .map((part) => {
      if (part.startsWith("```")) {
        return part; // Ná modhnaigh bloic chóid
      }
      return part.replace(/\n{3,}/g, "\n\n"); // Ná cuir i bhfeidhm ach ar phrós
    })
    .join("");
}

const whitespaceEngine: CompressionEngine = {
  id: "whitespace",
  name: "Bainteoir Spáis Bháin",
  description: "Baineann sé spás bán breise agus línte bána",
  icon: "📝",
  targets: ["messages", "tool_results"],
  stackable: true,
  stackPriority: 100, // Rith TAR ÉIS caveman/rtk

  metadata: {
    id: "whitespace",
    name: "Bainteoir Spáis Bháin",
    description: "Baineann sé spás bán breise agus línte bána",
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

    // Trasnaigh eagar na dteachtaireachtaí — láimhseáil ábhar teaghráin agus ábhar ilpháirteach araon
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
      // Ábhar ilpháirteach: trasnaigh na páirteanna, agus comhbhrúigh na páirteanna téacs amháin
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
          return part; // caomhnaigh image_url, tool_use, srl.
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
        label: "Caomhnaigh bloic chóid",
        defaultValue: true,
        description: "Ná hathraigh an spás bán laistigh de bhloic ```code```",
      },
    ];
  },

  validateConfig(config) {
    if (config.preserveCodeBlocks !== undefined && typeof config.preserveCodeBlocks !== "boolean") {
      return {
        valid: false,
        errors: ["Ní mór do preserveCodeBlocks a bheith ina luach Boole"],
      };
    }
    return { valid: true, errors: [] };
  },
};

// Cláraigh go domhanda
registerCompressionEngine(whitespaceEngine);
````

### Cá háit ar cheart Innill Shaincheaptha a Chur

```
~/.omniroute/compression/engines/my-engine.ts    # Leibhéal úsáideora
<project>/compression-engines/my-engine.ts        # Leibhéal tionscadail (luchtaithe ag am tosaithe)
```

Nó luchtaigh go ríomhchláraithe é ó bhreiseán:

```ts
// I do bhreiseán
import {
  registerCompressionEngine,
  unregisterCompressionEngine,
} from "@omniroute/open-sse/services/compression/engines/registry";
import { myEngine } from "./engines/my-engine";

export default definePlugin({
  name: "my-compression-plugin",
  // Cuireann SDK an bhreiseáin crúcaí onRequest / onResponse / onError ar fáil. Cláraigh an
  // t-inneall nuair a luchtaítear modúl an bhreiseáin (nó ar an gcéad onRequest); díchláraigh é
  // ó do chonair dhíshuiteála féin.
  onRequest: async (ctx) => {
    registerCompressionEngine(myEngine);
  },
});

// Le linn díshuiteála:
// unregisterCompressionEngine("my-engine");
```

### D'Inneall a Thástáil

Cláraigh d'inneall i mbreiseán nó i bhfeidhm tosaithe. Nuair a bheidh sé cláraithe, beidh an t-inneall ar fáil
sa roghnóir straitéise trína `id`. Tástáil an comhtháthú trína chumadh i bpíblíne chruachta:

---

## Pacáistí Teanga a Chruthú

Úsáideann comhbhrú ar nós Caveman **pacáistí rialacha a bhaineann go sonrach le teanga** chun focail líonta, maolú cainte agus patrúin fhoclacha a láimhseáil i ngach teanga nádúrtha. Tagann OmniRoute le **6 phacáiste teanga**: `en`, `es`, `fr`, `de`, `ja`, `pt-BR`.

### Struchtúr Pacáiste

Is éard atá i bpacáiste teanga ná comhadlann de **chomhaid JSON** faoi `open-sse/services/compression/rules/<language>/`:

```
open-sse/services/compression/rules/
├── en/
│   ├── filler.json          # Beannachtaí, maolú cainte, béasaíocht
│   ├── context.json         # Rialacha chun comhthéacs a laghdú
│   ├── dedup.json           # Rialacha dí-dhúblála
│   ├── structural.json      # Poncaíocht, formáidiú
│   └── ultra.json           # Rialacha comhbhrúite ionsaithí
├── es/  (an struchtúr céanna)
├── fr/  (an struchtúr céanna)
├── de/  (an struchtúr céanna)
├── ja/  (an struchtúr céanna)
└── pt-BR/ (an struchtúr céanna)
```

### Comhdhéanamh Rialach

Tá an cruth seo ar gach riail (ó `open-sse/services/compression/ruleLoader.ts`):

```ts
interface FileRule {
  name: string; // Ainm atá inléite ag daoine (kebab-case)
  pattern: string; // Patrún slonn ionadaíochta JavaScript
  replacement?: string; // An téacs a chuirfear in ionad an mheaitseála
  replacementMap?: Record<string, string>; // NÓ léarscáil eochair→ionadú
  flags?: string; // Bratacha sloinn ionadaíochta ("gi" de ghnáth)
  context?: "all" | "user" | "system" | "assistant";
  category?: "filler" | "context" | "structural" | "dedup" | "terse" | "ultra";
  minIntensity?: "lite" | "full" | "ultra"; // Déan neamhaird di faoi bhun na déine seo
  description?: string; // Doiciméadúchán
}
```

### Sampla: Rialacha Focal Líonta Hiondúise a Chur Leis

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

### Bailíochtú

Déantar pacáistí rialacha a bhailíochtú in aghaidh `_schema.json` agus iad á lódáil. Má bhíonn drochstruchtúr ar phacáiste, teipfidh ar a lódáil agus logálfar earráid:

```
RULE_LOADER: pack "hi/filler.json" failed validation:
  - rules.0.pattern: Invalid regex
  - rules.1.context: must be one of [all, user, system, assistant]
```

Ritear an bailíochtú go huathoibríoch nuair a lódáiltear pacáiste (in aghaidh `_schema.json`); diúltaítear do phacáiste
neamhbhailí agus logáiltear an earráid thuas. Níl script ar leith
`npm run` ann chun pacáistí a bhailíochtú — lódáil an pacáiste (m.sh. cuir tús leis an bhfreastalaí nó
bain triail as an gcosán comhbhrúite) agus coinnigh súil ar na logaí.

### Pacáiste Teanga Saincheaptha a Lódáil

```ts
import { loadRulePack } from "omniroute/compression/ruleLoader";

await loadRulePack("./my-custom-rules/hi/filler.json");
```

Nó cuir in áit aitheanta é:

```
~/.omniroute/compression/rules/hi/filler.json  # Leibhéal úsáideora
<project>/.compression/rules/hi/filler.json   # Leibhéal tionscadail
```

### Dea-Chleachtais do Phacáistí Teanga

1. **Tosaigh le `filler`** — is iad seo na rialacha is mó tionchair
2. **Úsáid `minIntensity`** chun rialacha ionsaitheacha a shrianadh — cosnaíonn sé seo ar ró-chomhbhrú
3. **Cuir cásanna tástála san áireamh** — cuir eagar `tests[]` leis an JSON chun an t-iompar a fhíorú
4. **Tá tábhacht leis an ord** — cuirtear rialacha níos luaithe i bhfeidhm ar dtús; cuir rialacha ardtionchair ar dtús
5. **Bí coimeádach le `replacement`** — is gnách gur teaghrán folamh atá ceart; ná tabhair ábhar nua isteach riamh

### Straitéis Aistriúcháin

Agus pacáistí rialacha á logánú go teanga nua:

1. **Aistrigh ainmneacha na rialacha** — feictear iad san aschur dífhabhtaithe
2. **Cuir patrúin na sloinn ionadaíochta in oiriúint** — is minic nach n-oibríonn aistriúchán díreach (bíonn teorainneacha focal éagsúil)
3. **Déan tástáil ar fhíorchomhráite** — ba cheart don phacáiste a bheith sábháilte ar ionchur iarbhír
4. **Meaitseáil gnásanna cultúrtha** — mar shampla, bíonn níos mó focal líonta onórach i bpacáistí Seapáinise ná i bpacáistí Béarla

---

## Píblínte Cruachta

Ritheann **píblíne chruachta** innill iolracha i seicheamh, agus aschur gach innill á chur ar aghaidh chuig an gcéad inneall eile. Seo mar a oibríonn `mode: stacked` go hinmheánach.

### Conas a Oibríonn Cruachadh

```
Ionchur (10,000 comhartha)
        │
        ▼
   ┌──────────┐
   │  Inneall │  tosaíocht 10
   │  A       │  ──▶ aschur: 6,000 comhartha (-40%)
   └────┬─────┘
        ▼
   ┌──────────┐
   │  Inneall │  tosaíocht 50
   │  B       │  ──▶ aschur: 2,400 comhartha (-60%)
   └────┬─────┘
        ▼
   ┌──────────┐
   │  Inneall │  tosaíocht 100
   │  C       │  ──▶ aschur: 1,200 comhartha (-80%)
   └────┬─────┘
        │
        ▼
Aschur deiridh (1,200 comhartha, ~88% coigilteas san iomlán)
```

Nuair a roghnaítear `mode: "stacked"`, ritear na hinnill go seicheamhach san ord a shonraítear san eagar `pipeline`.
Is é aschur inneall N ionchur inneall N+1.

### Modhanna Comhbhrúite

Roghnaíonn OmniRoute **AON mhodh amháin in aghaidh na hiarrata** bunaithe ar chumraíocht, tairseacha uathspreagtha, agus sáruithe teaglama.
Sainítear na modhanna atá ar fáil in `open-sse/services/compression/types.ts` (cineál `CompressionMode`):

| Modh         | Innill                | Cás úsáide                                                                                                                                                                                                     |
| ------------ | --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `off`        | Ceann ar bith         | Díchumasaigh gach comhbhrú                                                                                                                                                                                     |
| `rtk`        | RTK amháin            | Seisiúin ina bhfuil go leor aschur orduithe (coigilteas 80%+)                                                                                                                                                  |
| `lite`       | Lite amháin           | Comhbhrú coimeádach (tapa, sábháilte)                                                                                                                                                                          |
| `standard`   | Caveman               | Comhbhrú próis le pacáistí teanga                                                                                                                                                                              |
| `aggressive` | Caveman + Aggressive  | Prós ionsaitheach + pas deiridh ionsaitheach                                                                                                                                                                   |
| `ultra`      | Ultra                 | Uas-chomhbhrú (caillteach, mar rogha dheiridh). Is féidir é a ródú trí inneall SLM **LLMLingua-2** nuair a shocraítear `ultra.modelPath` (má bhíonn an tsamhail ar fáil, úsáidtear an chonair riailbhunaithe). |
| `stacked`    | Píblíne shaincheaptha | Cum innill in ord ar bith (féach thíos)                                                                                                                                                                        |

> Taobh amuigh de na hinnill mhóid thuas, soláthraíonn an chlárlann innill speisialaithe inchruachta freisin —
> **CCR**, **headroom**, **ionizer**, agus **session-dedup** — a bhfuil doiciméadú orthu in
> [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md#additional-built-in-engines).

Cinneann `getEffectiveMode()` in `open-sse/services/compression/strategySelector.ts` roghnú an mhóid:

1. Má tá comhbhrú díchumasaithe: `"off"`
2. Má tá sárú teaglama ann: úsáid an sárú
3. Má sháraítear an tairseach uathspreagtha: úsáid `autoTriggerMode` (réamhshocrú: `"lite"`)
4. Murach sin: úsáid `defaultMode`

### An Phíblíne Chruachta Réamhshocraithe

Nuair a chumraítear `mode: "stacked"` go sainráite, cuimsítear sa phíblíne réamhshocraithe:

1. **RTK** — bain torann aschuir orduithe (~80% coigilteas ar aschur teirminéil)
2. **Caveman** — bain focail líonta agus déan an prós níos gonta (~46% ar an téacs atá fágtha)
3. **Lite** — pas deiridh do spás bán + dí-dhúbláil

Baineann an chumraíocht seo **coigilteas 78-95%** amach ar sheisiúin a úsáideann go leor uirlisí.

### Píblínte Cruachta a Chumrú

Sa chumraíocht teaglama:

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

Is féidir innill a fhágáil ar lár, innill shaincheaptha a chur leis, nó a n-ord a athrú.

### Staid a Chur ar Aghaidh

Is féidir le hinnill meiteashonraí a léamh ó chomhthéacs na hiarrata (in `options`):

```ts
compress(body, config) {
  // Léigh meiteashonraí ó innill roimhe seo
  const original = options?.compressionComboId;  // "my-coding-combo"
  // ...
}
```

Tá na meiteashonraí **inléite amháin** — ní féidir le hinnill comhthéacs na hiarrata a athrú, ach is féidir leo aschur a gcorp féin a athrú.

### Gaistí maidir le hOrd Rite

| Ord na n-inneall                      | Éifeacht                                                                                        |
| ------------------------------------- | ----------------------------------------------------------------------------------------------- |
| RTK → Caveman → Lite                  | **Molta** (baintear torann ar dtús, ansin teanga, agus ansin spás bán)                          |
| Lite → RTK → Caveman                  | Go dona — baineann Lite spás bán den aschur amh, rud a chuireann teip ar mheaitseáil patrún RTK |
| Caveman → RTK                         | Go dona — d'fhéadfadh Caveman téacs a athscríobh ar bhealaí nach n-aithníonn RTK                |
| Ord ar bith le `tool_results` ar dtús | Níos fearr — is é aschur uirlisí an t-ábhar is torannaí                                         |

### Cathain NÁ Déan Cruachadh

Ní bhíonn cruachadh níos fearr i gcónaí:

- **Teachtaireachtaí simplí** (gan aschur uirlisí) — is leor Caveman nó Lite amháin
- **Íogair ó thaobh costais de** — cuireann gach inneall ~5-50ms de mhoill leis
- **Uirlisí sonracha** — is iondúil gur leor RTK amháin d'aschur blaosca

### Píblíne Shaincheaptha a Thógáil

Níl aon chlárlann píblínte ainmnithe ann. Níl i bpíblíne chruachta ach **eagar inlíne
de chéimeanna** a chuirtear ar aghaidh chuig `applyStackedCompression()` (arna easpórtáil ó
`@omniroute/open-sse/services/compression/strategySelector`):

```ts
import { applyStackedCompression } from "@omniroute/open-sse/services/compression/strategySelector";

const result = applyStackedCompression(body, [
  { engine: "rtk", intensity: "aggressive" },
  { engine: "caveman", intensity: "full" },
]);
```

Nuair nach gcuireann tú píblíne ar aghaidh, úsáidtear `rtk(standard) → caveman(full)` mar réamhshocrú.

Chun é a rialú ón gcumraíocht, socraigh `mode: "stacked"` agus cuir eagar na gcéimeanna ar fáil faoi
`stackedPipeline` (arna léamh ó `config.stackedPipeline`):

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

## Beartas Sioncrónaithe Réamhtheachtach

Tugann innill chomhbhrúite OmniRoute aitheantas do roinnt tionscadal réamhtheachtach sa README
("spreagtha ag RTK, Caveman, LLMLingua-2, Troglodita"). Ceist choitianta ó rannchuiditheoirí
is ea: **nuair a chuireann RTK réamhtheachtach scagaire uirlise nua leis nó nuair a chuireann Caveman pacáiste rialacha
leis, conas a shroicheann sé sin OmniRoute?** Is í an rannán seo an freagra údarásach.

### Cóipeanna díoltóra vs. feidhmiúcháin neamhspleácha

| Inneall                      | Gaol leis an tionscadal réamhtheachtach                                                                                                                 | Suíomh                                                              |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| **RTK**                      | **Athfheidhmiú neamhspleách** (spreagtha aige, ní cóip de)                                                                                              | `open-sse/services/compression/engines/rtk/`                        |
| **Caveman**                  | **Athfheidhmiú neamhspleách** (spreagtha aige)                                                                                                          | `open-sse/services/compression/engines/cavemanAdapter.ts`           |
| **Headroom**                 | Inmheánach den chuid is mó; níl ach an codec `gcf/` **díoltóirithe i ndáiríre** ó `gcf-typescript` (MIT, marcáilte le SPDX, próifíl ghinearálta amháin) | `open-sse/services/compression/engines/headroom/gcf/`               |
| **LLMLingua-2 / Troglodita** | Spreagtha acu (tiomáineann siad na hinnill `llmlingua` + `session-dedup`)                                                                               | `open-sse/services/compression/engines/llmlingua/`, `session-dedup` |

Príomhphointe: **Is feidhmiúcháin ghlanseomra TypeScript iad RTK agus Caveman de na
_smaointe_ (rialacha scagaire, pacáistí rialacha), ní crainn fhoinse díoltóirithe.** Níl aon
chóip réamhtheachtach ann le `git pull` a dhéanamh uaithi — agus sin go díreach an fáth a ndeir an README
"spreagtha ag" seachas "cuachta".

### Conas a chumaisctear feabhsuithe réamhtheachtacha

Níl **aon rianú uathoibrithe ar eisiúintí réamhtheachtacha ná lipéad `compression-sync`
ann** — d'aon ghnó. Toisc gur athfheidhmiúcháin iad na hinnill, ní chumaisctear scagaire RTK
ná pacáiste rialacha Caveman mar chód; ina ionad sin, **athléirítear é mar riail/scagaire nua
i bhformáid OmniRoute féin** (féach
[COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md)) agus cuirtear isteach é ar bhonn ad hoc trí
ghnáth-PR. Is iad na pointí sínte thuas (inneall saincheaptha, pacáiste teanga, scagaire RTK)
na bealaí ceadaithe chun ceann a chur leis.

Seo samplaí le déanaí den sreabhadh seo go díreach:

- Scagairí RTK d'aschur tógála Gradle & `dotnet` (v3.8.42)
- Scagairí RTK do kubectl / docker-build / composer / gh (#2824)
- Pacáiste teanga Indinéisise Caveman (#3975), chomh maith le pacáistí Gearmáinise / Fraincise / Seapáinise / Sínise

### Headroom (seachfhreastalaí comhbhrú ionchuir)

Tá Headroom **go hiomlán inmheánach** — léargas díoltóirithe pionnáilte den codec `gcf` móide
sraitheanna `smartcrusher` / `toon` / `tabular` OmniRoute féin. Níl aon fhoinse réamhtheachtach bheo
le rianú seachas an chóip dhíoltóirithe; athnuaitear nuashonruithe ar `gcf`
de láimh nuair a athraíonn an codec agus déantar iad a athbhailíochtú i gcoinne gheata an bhuiséid chomhbhrúite
(`check:compression-budget`).

### Feabhsúchán arna spreagadh ag tionscadal réamhtheachtach a mholadh

1. **Ná díoltóirigh é** — athléirigh an riail/scagaire réamhtheachtach i bhformáid OmniRoute.
2. Cuir leis é tríd an bpointe sínte meaitseála thíos (pacáiste teanga, scagaire RTK, nó
   inneall saincheaptha).
3. Déan tagairt don tionscadal réamhtheachtach sa chur síos ar an PR (lua), seachas
   a fhoinse lena mbaineann ceadúnas a chóipeáil.
4. Cuir tástálacha san áireamh agus deimhnigh go n-éiríonn le geata `check:compression-budget` fós.

---

## Stíl Aschuir a Chur Leis

Is iad stíleanna aschuir (féach [tábla catalóige na treorach](./COMPRESSION_GUIDE.md#output-styles-catalog))
an chontrapháirt ar thaobh an fhreagra de na hinnill ionchuir: in ionad an méid a
sheolann tú a chomhbhrú, tugann siad treoir don tsamhail aschur níos saoire a tháirgeadh. Is é
`OUTPUT_STYLE_CATALOG` in `open-sse/services/compression/outputStyles/catalog.ts` an chlárlann, agus
**is í iontráil amháin sa chatalóg an ghné iomlán**: déanann an t-insteallaire, painéal socruithe an deais,
an bhuanseasmhacht agus an teiliméadracht uile an chatalóg a liostú — níl aon liosta eile le nuashonrú.

1. **Cuir iontráil amháin le `OUTPUT_STYLE_CATALOG`** le `id`, `label`, `description` agus na
   trí `levels` Bhéarla (`lite`, `full`, `ultra`). Caithfidh gach leibhéal críochnú le
   `${SHARED_BOUNDARIES}` ionas go bhfanfaidh cód, conairí, orduithe, earráidí agus URLanna focal ar fhocal.
   Caithfidh téacs na treorach a bheith **statach agus cinntitheach** de réir
   `(id, level, language)` — is é `${SHARED_BOUNDARIES}` an t-aon idirshuíomh a cheadaítear.
2. **Aistrigh é.** Seol bloc `pt-BR` ar a laghad faoi `i18n`; is iad `ponytail` agus
   `i-have-adhd` (en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi) an cruth tagartha. Socraíonn stíl aonteangach d’aon ghnó
   `locale` ina ionad sin (amhail `terse-cjk` → `zh`) agus ní thairgtear ansin í
   ach faoin logchaighdeán sin.
3. **Nuashonraigh garda na maitríse** — cuir teangacha na stíle le `BASELINE_LANGUAGES` in
   `tests/unit/compression/output-styles-i18n-matrix.test.ts`. Teipeann ar an ngeata i gcás aon stíle nua
   nach bhfuil srianta de réir logchaighdeáin agus nach bhfuil na haistriúcháin riachtanacha aici, mura bhfuil
   iontráil shainráite `KNOWN_ENGLISH_ONLY` aici mar aon le saincheist rianaithe.
4. **Cuir tástáil in aghaidh na stíle leis** bunaithe ar
   `tests/unit/compression/i-have-adhd-catalog.test.ts`: cruth na catalóige, clásal
   teorainneacha do gach leibhéal, agus dearbhú ancaire a dhearbhaíonn go bhfuil gach aistriúchán scríofa ina
   theanga féin seachas a bheith cóipeáilte ón mBéarla.
5. **Admháil**: má tá an stíl oiriúnaithe ó thionscadal réamhtheachtach, tabhair aitheantas dó i
   nóta tráchta foinseach ar an iontráil (m.sh. `i-have-adhd` → ayghri/i-have-adhd, MIT) — an riail
   chéanna le "Feabhsúchán arna spreagadh ag tionscadal réamhtheachtach a mholadh" thuas.

Ní gá aon athrú a dhéanamh ar an UI, ar an scéimre ná ar an teiliméadracht — rindreálann na dromchlaí sin ón gcatalóg.

---

## Dea-Chleachtais

### Forbairt Inneall

1. **Cuir `validateConfig` i bhfeidhm i gcónaí** — is cúis le teipeanna ciúine iad innill gan bhailíochtú
2. **Socraigh `targetLatencyMs` réalaíoch** — úsáideann roghnóir na straitéise é chun innill a roghnú
3. **Úsáid `getConfigSchema` don deais** — ná folaigh cumraíocht ó úsáideoirí riamh
4. **Tacaigh le `stackable: true` má tá d’inneall íon** — níor cheart innill a bhfuil fo-iarmhairtí acu a chruachadh
5. **Scríobh tástálacha inlíne** — ba cheart go bhféadfaí innill a fhíorú i <1s

### Forbairt Pacáistí Teanga

1. **Tosaigh le déine `lite`** — ba cheart do rialacha a bheith sábháilte ag an socrú is ísle
2. **Úsáid `context` chun raon feidhme rialacha a shocrú** — ní féidir le rialacha `user` amháin dul i bhfeidhm ar leid chórais trí thimpiste
3. **Seachain eochracha JSON a ghabháil** — is féidir le `\\bword\\b` meaitseáil laistigh de JSON, rud a bhriseann sonraí struchtúrtha
4. **Déan tástáil le cásanna teorann** — ionchur folamh, unicode, téacs RTL, emoji
5. **Úsáid pacáistí atá ann cheana mar theimpléid** — is é `en/filler.json` an sampla is forbartha

### Dearadh Píblíne

1. **Déan próifíliú roimh bharrfheabhsú** — tomhais le `compression_stats` ar dtús
2. **B’fhearr comhshuíomh ná athchur i bhfeidhm** — leathnaigh rialacha Caveman sula scríobhann tú inneall nua
3. **Doiciméadaigh réasúnaíocht an oird** — mínigh i nóta tráchta cén fáth a dtagann inneall A roimh inneall B
4. **Déan tástáil ag gach ceann de na 3 leibhéal déine** — tá `lite` tapa ach caillteach, tá `ultra` mall ach beacht

---

## Tagairt: Innill ionsuite

| Aitheantas an innill | In-chruacháilte | stackPriority réamhshocraithe | Spriocanna                                     |
| -------------------- | --------------- | ----------------------------- | ---------------------------------------------- |
| `lite`               | Tá              | 5                             | teachtaireachtaí, torthaí uirlisí              |
| `rtk`                | Tá              | 10                            | torthaí uirlisí                                |
| `standard` (caveman) | Tá              | 20                            | teachtaireachtaí, torthaí uirlisí, bloic chóid |
| `aggressive`         | Tá              | 30                            | teachtaireachtaí                               |
| `ultra`              | Tá              | 40                            | teachtaireachtaí, bloic chóid                  |

### Féach freisin

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — Forléargas ar an bpíblíne
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — Tagairt do chlárlann na n-inneall
- [COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md) — Sonraíocht fhormáid na rialacha
- [COMPRESSION_LANGUAGE_PACKS.md](./COMPRESSION_LANGUAGE_PACKS.md) — Sonraí na bpacáistí teanga
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — Inneall RTK agus scagairí saincheaptha
- Foinse: `open-sse/services/compression/` (117 comhad, ~250KB)
