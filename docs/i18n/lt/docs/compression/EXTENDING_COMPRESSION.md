# Extending the Compression Pipeline (Lietuvių)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/EXTENDING_COMPRESSION.md) · 🇪🇹 [am](../../../am/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇦 [ar](../../../ar/docs/compression/EXTENDING_COMPRESSION.md) · 🇦🇿 [az](../../../az/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇬 [bg](../../../bg/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇩 [bn](../../../bn/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇦 [bs](../../../bs/docs/compression/EXTENDING_COMPRESSION.md) · 🇨🇿 [cs](../../../cs/docs/compression/EXTENDING_COMPRESSION.md) · 🇩🇰 [da](../../../da/docs/compression/EXTENDING_COMPRESSION.md) · 🇩🇪 [de](../../../de/docs/compression/EXTENDING_COMPRESSION.md) · 🇬🇷 [el](../../../el/docs/compression/EXTENDING_COMPRESSION.md) · 🇪🇸 [es](../../../es/docs/compression/EXTENDING_COMPRESSION.md) · 🇪🇪 [et](../../../et/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇷 [fa](../../../fa/docs/compression/EXTENDING_COMPRESSION.md) · 🇫🇮 [fi](../../../fi/docs/compression/EXTENDING_COMPRESSION.md) · 🇫🇷 [fr](../../../fr/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇪 [ga](../../../ga/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [gu](../../../gu/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [ha](../../../ha/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇱 [he](../../../he/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [hi](../../../hi/docs/compression/EXTENDING_COMPRESSION.md) · 🇭🇷 [hr](../../../hr/docs/compression/EXTENDING_COMPRESSION.md) · 🇭🇺 [hu](../../../hu/docs/compression/EXTENDING_COMPRESSION.md) · 🇦🇲 [hy](../../../hy/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇩 [id](../../../id/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [ig](../../../ig/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇹 [it](../../../it/docs/compression/EXTENDING_COMPRESSION.md) · 🇯🇵 [ja](../../../ja/docs/compression/EXTENDING_COMPRESSION.md) · 🇬🇪 [ka](../../../ka/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇭 [km](../../../km/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [kn](../../../kn/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇷 [ko](../../../ko/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇻 [lv](../../../lv/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [ml](../../../ml/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [mr](../../../mr/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇾 [ms](../../../ms/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇹 [mt](../../../mt/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇲 [my](../../../my/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇵 [ne](../../../ne/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇱 [nl](../../../nl/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇴 [no](../../../no/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [or](../../../or/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [pa](../../../pa/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇭 [phi](../../../phi/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇱 [pl](../../../pl/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇹 [pt](../../../pt/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇴 [ro](../../../ro/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇺 [ru](../../../ru/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇰 [si](../../../si/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇰 [sk](../../../sk/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇮 [sl](../../../sl/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇸 [sr](../../../sr/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇪 [sv](../../../sv/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇪 [sw](../../../sw/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [ta](../../../ta/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [te](../../../te/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇭 [th](../../../th/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇷 [tr](../../../tr/docs/compression/EXTENDING_COMPRESSION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇰 [ur](../../../ur/docs/compression/EXTENDING_COMPRESSION.md) · 🇺🇿 [uz](../../../uz/docs/compression/EXTENDING_COMPRESSION.md) · 🇻🇳 [vi](../../../vi/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [yo](../../../yo/docs/compression/EXTENDING_COMPRESSION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/EXTENDING_COMPRESSION.md)

---

> **Trumpai**: „OmniRoute“ glaudinimo variklis yra **išplečiamas** — galite registruoti pasirinktinius variklius, pateikti naujų kalbų kalbinius paketus ir sudaryti daugiasluoksnius konvejerius. Šiame vadove parodyta, kaip tai padaryti.

**Susiję vadovai:**

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — išsami konvejerio apžvalga
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — variklių registras ir integruotieji varikliai
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — RTK variklis ir pasirinktiniai filtrai
- [COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md) — taisyklių paketo formato žinynas

---

## Apžvalga

Glaudinimo sistema turi **3 išplėtimo taškus**:

| Išplėtimo taškas               | Naudojimo atvejis                                                                                   | Sudėtingumas |
| ------------------------------ | --------------------------------------------------------------------------------------------------- | ------------ |
| **Pasirinktinis variklis**     | Pridėti visiškai naują glaudinimo algoritmą (pvz., konkrečiai sričiai skirtą santraukų generatorių) | Aukštas      |
| **Kalbinis paketas**           | Pridėti naujos natūraliosios kalbos palaikymą (pvz., hindi arba arabų kalbos)                       | Vidutinis    |
| **Daugiasluoksnis konvejeris** | Sudaryti esamų variklių seką pasirinkta tvarka                                                      | Pradinis     |

```
┌─────────────────────────────────────────────────────────────┐
│                    Glaudinimo strategija                     │
│                                                              │
│   Įvesties pranešimai ──▶ getEffectiveMode() ──▶ režimas    │
│                                              │               │
│                      ┌───────────────────────┼──────────┐    │
│                      │         │         │         │    │    │
│                      ▼         ▼         ▼         ▼    │    │
│                   "rtk"    "lite"   "standard" "stacked"    │
│                      │         │         │         │    │    │
│                      ▼         ▼         ▼         ▼    │    │
│                   RTK       Lite     Caveman   engines[]   │
│                   variklis  variklis  variklis  sujungti   │
│                      │         │         │         │    │    │
│                      └─────────┴─────────┴─────────┘    │    │
│                                      │                    │
│                                      ▼                    │
│                              Suglaudinta išvestis           │
└─────────────────────────────────────────────────────────────┘

Strategijos parinkimas PAGRĮSTAS REŽIMU: kiekvienai užklausai parenkamas VIENAS režimas
(rtk / lite / standard / aggressive / ultra / stacked / off).
Tik režimas "stacked" nuosekliai sujungia kelis variklius.
Numatytasis automatiškai aktyvuojamas režimas yra "lite" (tai nėra 3 pakopų prioritetinė grandinė).
```

---

## Pasirinktinio glaudinimo variklio kūrimas

Variklio sąsaja (`open-sse/services/compression/engines/types.ts`) yra sutartis, kurią turi atitikti kiekvienas variklis. Joje yra 5 privalomi metodai.

### Sąsaja `CompressionEngine`

```ts
interface CompressionEngine {
  id: string; // Unikalus variklio ID
  name: string; // Rodomas pavadinimas
  description: string; // Trumpas aprašas
  icon: string; // Piktograma (jaustukas arba URL)
  targets: CompressionEngineTarget[]; // ["messages", "tool_results", "code_blocks"]
  stackable: boolean; // Ar galima naudoti daugiasluoksniame konvejeryje
  stackPriority: number; // Eiliškumas daugiasluoksniuose konvejeriuose (mažesnis = anksčiau)
  metadata: CompressionEngineMetadata;

  apply(body, options?): CompressionResult;
  compress(body, config?): CompressionResult;
  getConfigSchema(): EngineConfigField[];
  validateConfig(config): EngineValidationResult;
}
```

### Minimalus pavyzdys: tarpų variklis

Paprasčiausias įmanomas variklis — pašalina perteklinius tarpus iš pranešimų.

````ts
import type { CompressionEngine } from "omniroute/compression/engines/types";
import { registerCompressionEngine } from "omniroute/compression/engines/registry";

function preserveCodeBlocks(text: string): string {
  // Suskaidoma pagal kodo blokų žymeklius ir išsaugomi tarpai jų viduje
  const parts = text.split(/(```[\s\S]*?```)/);
  return parts
    .map((part) => {
      if (part.startsWith("```")) {
        return part; // Kodo blokai nekeičiami
      }
      return part.replace(/\n{3,}/g, "\n\n"); // Taikoma tik proziniam tekstui
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
  stackPriority: 100, // Vykdoma PO caveman/rtk

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

    // Pereinama per pranešimų masyvą — apdorojamas ir eilutės, ir kelių dalių turinys
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
      // Kelių dalių turinys: pereinama per dalis ir glaudinamos tik tekstinės dalys
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
          return part; // išsaugomi image_url, tool_use ir kt.
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

// Registruojama visuotinai
registerCompressionEngine(whitespaceEngine);
````

### Kur talpinti pasirinktinius variklius

```
~/.omniroute/compression/engines/my-engine.ts    # Naudotojo lygmuo
<project>/compression-engines/my-engine.ts        # Projekto lygmuo (įkeliama paleidžiant)
```

Arba įkelkite programiškai iš papildinio:

```ts
// Jūsų papildinyje
import {
  registerCompressionEngine,
  unregisterCompressionEngine,
} from "@omniroute/open-sse/services/compression/engines/registry";
import { myEngine } from "./engines/my-engine";

export default definePlugin({
  name: "my-compression-plugin",
  // Papildinio SDK pateikia onRequest / onResponse / onError kablius. Užregistruokite
  // variklį, kai įkeliamas papildinio modulis (arba per pirmąjį onRequest); išregistruokite jį
  // naudodami savo užbaigimo procedūrą.
  onRequest: async (ctx) => {
    registerCompressionEngine(myEngine);
  },
});

// Užbaigiant:
// unregisterCompressionEngine("my-engine");
```

### Variklio testavimas

Užregistruokite variklį papildinyje arba paleidimo funkcijoje. Užregistravus variklį, jį bus galima
pasirinkti strategijos parinkiklyje pagal jo `id`. Patikrinkite integraciją įtraukdami jį į sudėtinę apdorojimo seką:

---

## Kalbos paketų kūrimas

„Caveman“ stiliaus glaudinimas naudoja **konkrečioms kalboms skirtus taisyklių paketus**, kad kiekvienoje natūraliojoje kalboje apdorotų užpildančias frazes, neužtikrintumą išreiškiančias konstrukcijas ir daugiažodžius šablonus. „OmniRoute“ pateikiamas su **6 kalbų paketais**: `en`, `es`, `fr`, `de`, `ja`, `pt-BR`.

### Paketo struktūra

Kalbos paketas yra **JSON failų** katalogas, esantis `open-sse/services/compression/rules/<language>/`:

```
open-sse/services/compression/rules/
├── en/
│   ├── filler.json          # Mandagumo frazės, neužtikrintumas, mandagumas
│   ├── context.json         # Kontekstą mažinančios taisyklės
│   ├── dedup.json           # Dubliavimo šalinimo taisyklės
│   ├── structural.json      # Skyryba, formatavimas
│   └── ultra.json           # Agresyvaus glaudinimo taisyklės
├── es/  (tokia pati struktūra)
├── fr/  (tokia pati struktūra)
├── de/  (tokia pati struktūra)
├── ja/  (tokia pati struktūra)
└── pt-BR/ (tokia pati struktūra)
```

### Taisyklės sandara

Kiekviena taisyklė yra tokios formos (iš `open-sse/services/compression/ruleLoader.ts`):

```ts
interface FileRule {
  name: string; // Žmogui suprantamas pavadinimas (kebab-case)
  pattern: string; // JavaScript reguliariojo reiškinio šablonas
  replacement?: string; // Kuo pakeisti atitiktį
  replacementMap?: Record<string, string>; // ARBA rakto→pakaitalo atvaizdis
  flags?: string; // Reguliariojo reiškinio vėliavėlės (paprastai „gi“)
  context?: "all" | "user" | "system" | "assistant";
  category?: "filler" | "context" | "structural" | "dedup" | "terse" | "ultra";
  minIntensity?: "lite" | "full" | "ultra"; // Praleisti, jei intensyvumas mažesnis
  description?: string; // Dokumentacija
}
```

### Pavyzdys: užpildančių frazių taisyklių hindi kalbai pridėjimas

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
      "description": "Pašalinti mandagias įžangines frazes, pvz., „नमस्ते“"
    },
    {
      "name": "filler_actually",
      "pattern": "\\b(?:असल में|वास्तव में|दरअसल)\\b\\s*",
      "replacement": "",
      "context": "all",
      "category": "filler",
      "minIntensity": "lite",
      "description": "Pašalinti užpildančias frazes, reiškiančias „iš tikrųjų“"
    },
    {
      "name": "verbose_plea",
      "pattern": "\\b(?:कृपया|कृपया आप|अनुरोध है कि आप)\\b\\s*",
      "replacement": "",
      "context": "all",
      "category": "filler",
      "minIntensity": "full",
      "description": "Pašalinti hindi kalbos žodį „prašau“"
    }
  ]
}
```

### Tikrinimas

Įkeliant taisyklių paketus, jie tikrinami pagal `_schema.json`. Netinkamos struktūros paketo nepavyks įkelti, o žurnale bus užregistruota klaida:

```
RULE_LOADER: paketo „hi/filler.json“ patikra nepavyko:
  - rules.0.pattern: netinkamas reguliarusis reiškinys
  - rules.1.context: turi būti viena iš reikšmių [all, user, system, assistant]
```

Patikra vykdoma automatiškai įkeliant paketą (pagal `_schema.json`); netinkamas
paketas atmetamas, o pirmiau pateikta klaida užregistruojama žurnale. Atskiro
`npm run` scenarijaus paketams tikrinti nėra — įkelkite paketą (pvz., paleiskite serverį arba
įvykdykite glaudinimo kelią) ir stebėkite žurnalus.

### Pasirinktinio kalbos paketo įkėlimas

```ts
import { loadRulePack } from "omniroute/compression/ruleLoader";

await loadRulePack("./my-custom-rules/hi/filler.json");
```

Arba įdėkite jį į atpažįstamą vietą:

```
~/.omniroute/compression/rules/hi/filler.json  # Naudotojo lygmuo
<project>/.compression/rules/hi/filler.json   # Projekto lygmuo
```

### Geriausios kalbos paketų kūrimo praktikos

1. **Pradėkite nuo `filler`** — šios taisyklės turi didžiausią poveikį
2. **Naudokite `minIntensity`** agresyvioms taisyklėms apriboti — tai apsaugo nuo pernelyg didelio glaudinimo
3. **Įtraukite testavimo atvejus** — JSON faile pridėkite `tests[]` masyvą veikimui patikrinti
4. **Eiliškumas svarbus** — ankstesnės taisyklės taikomos pirmiausia; didžiausią poveikį turinčias taisykles pateikite pradžioje
5. **Atsargiai naudokite `replacement`** — tuščia eilutė paprastai yra tinkamas pasirinkimas; niekada neįterpkite naujo turinio

### Vertimo strategija

Lokalizuodami taisyklių paketus naujai kalbai:

1. **Išverskite taisyklių pavadinimus** — jie rodomi derinimo išvestyje
2. **Pritaikykite reguliariųjų reiškinių šablonus** — tiesioginis vertimas dažnai netinka (žodžių ribos skiriasi)
3. **Išbandykite su tikrais pokalbiais** — paketas turi būti saugus naudojant faktinę įvestį
4. **Atsižvelkite į kultūrines normas** — pavyzdžiui, japonų kalbos paketuose yra daugiau pagarbių užpildančių frazių nei anglų kalbos paketuose

---

## Sudėtiniai konvejeriai

**Sudėtinis konvejeris** nuosekliai vykdo kelis variklius, kiekvieno variklio išvestį perduodamas kitam. Taip viduje veikia `mode: stacked`.

### Kaip veikia sudėjimas

```
Įvestis (10 000 žetonų)
        │
        ▼
   ┌──────────┐
   │ Variklis │  prioritetas 10
   │ A        │  ──▶ išvestis: 6 000 žetonų (-40 %)
   └────┬─────┘
        ▼
   ┌──────────┐
   │ Variklis │  prioritetas 50
   │ B        │  ──▶ išvestis: 2 400 žetonų (-60 %)
   └────┬─────┘
        ▼
   ┌──────────┐
   │ Variklis │  prioritetas 100
   │ C        │  ──▶ išvestis: 1 200 žetonų (-80 %)
   └────┬─────┘
        │
        ▼
Galutinė išvestis (1 200 žetonų, bendrai sutaupoma ~88 %)
```

Pasirinkus `mode: "stacked"`, varikliai vykdomi nuosekliai `pipeline` masyve nurodyta tvarka.
N-ojo variklio išvestis tampa N+1-ojo variklio įvestimi.

### Glaudinimo režimai

OmniRoute kiekvienai užklausai parenka **VIENĄ režimą**, atsižvelgdama į konfigūraciją, automatinio suaktyvinimo slenksčius ir derinių perrašymus.
Galimi režimai apibrėžti faile `open-sse/services/compression/types.ts` (tipas `CompressionMode`):

| Režimas      | Varikliai                | Naudojimo atvejis                                                                                                                                                                                                                             |
| ------------ | ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `off`        | Nėra                     | Išjungti visą glaudinimą                                                                                                                                                                                                                      |
| `rtk`        | Tik RTK                  | Seansai, kuriuose gausu komandų išvesties (sutaupoma 80 % ir daugiau)                                                                                                                                                                         |
| `lite`       | Tik Lite                 | Konservatyvus glaudinimas (greitas, saugus)                                                                                                                                                                                                   |
| `standard`   | Caveman                  | Prozos glaudinimas naudojant kalbų paketus                                                                                                                                                                                                    |
| `aggressive` | Caveman + Aggressive     | Agresyvus prozos glaudinimas ir agresyvus galutinis etapas                                                                                                                                                                                    |
| `ultra`      | Ultra                    | Maksimalus glaudinimas (su nuostoliais, kraštutinė priemonė). Pasirinktinai nukreipiama per **LLMLingua-2** SLM variklį, kai nustatyta `ultra.modelPath` (jei modelis nepasiekiamas, automatiškai pereinama prie taisyklėmis pagrįsto kelio). |
| `stacked`    | Pasirinktinis konvejeris | Variklius galima komponuoti bet kokia tvarka (žr. toliau)                                                                                                                                                                                     |

> Be pirmiau nurodytų režimų variklių, registre taip pat pateikiami specializuoti sudėti tinkami varikliai —
> **CCR**, **headroom**, **ionizer** ir **session-dedup** — aprašyti
> [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md#additional-built-in-engines).

Režimo pasirinkimą nustato `getEffectiveMode()`, esanti `open-sse/services/compression/strategySelector.ts`:

1. Jei glaudinimas išjungtas: `"off"`
2. Jei yra derinio perrašymas: naudoti perrašymą
3. Jei viršytas automatinio suaktyvinimo slenkstis: naudoti `autoTriggerMode` (numatytoji reikšmė: `"lite"`)
4. Kitu atveju: naudoti `defaultMode`

### Numatytasis sudėtinis konvejeris

Kai aiškiai sukonfigūruota `mode: "stacked"`, numatytasis konvejeris apima:

1. **RTK** — pašalina komandų išvesties triukšmą (terminalo išvestyje sutaupoma ~80 %)
2. **Caveman** — pašalina perteklinius žodžius, daro prozą glaustesnę (~46 % likusiame tekste)
3. **Lite** — galutinis tarpų sutvarkymo ir pasikartojimų šalinimo etapas

Naudojant šią kompoziciją, seansuose, kuriuose intensyviai naudojami įrankiai, **sutaupoma 78–95 %**.

### Sudėtinių konvejerių konfigūravimas

Derinio konfigūracijoje:

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

Galite praleisti variklius, pridėti pasirinktinių arba pakeisti jų tvarką.

### Būsenos perdavimas

Varikliai gali skaityti metaduomenis iš užklausos konteksto (esančio `options`):

```ts
compress(body, config) {
  // Skaityti ankstesnių variklių metaduomenis
  const original = options?.compressionComboId;  // "my-coding-combo"
  // ...
}
```

Metaduomenys yra **tik skaitomi** — varikliai negali keisti užklausos konteksto, tik savo kūno išvestį.

### Vykdymo tvarkos niuansai

| Variklių tvarka                            | Poveikis                                                                                                |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------- |
| RTK → Caveman → Lite                       | **Rekomenduojama** (pirmiausia pašalinamas triukšmas, tada apdorojama kalba, galiausiai tarpai)         |
| Lite → RTK → Caveman                       | Blogai — Lite pašalina tarpus iš neapdorotos išvesties, todėl RTK šablonų atitikties paieška nepavyksta |
| Caveman → RTK                              | Blogai — Caveman gali perrašyti tekstą taip, kad RTK jo nebeatpažintų                                   |
| Bet kokia tvarka, pradedant `tool_results` | Geriau — įrankių išvestis yra triukšmingiausias turinys                                                 |

### Kada NENAUDOTI sudėjimo

Sudėjimas ne visada yra geresnis:

- **Paprastoms žinutėms** (be įrankių išvesties) — pakanka vien Caveman arba Lite
- **Kai svarbios sąnaudos** — kiekvienas variklis prideda ~5–50 ms delsą
- **Konkretiems įrankiams** — apvalkalo išvesčiai paprastai pakanka vien RTK

### Pasirinktinio konvejerio kūrimas

Nėra vardinių konvejerių registro. Sudėtinis konvejeris yra tiesiog **įdėtasis žingsnių masyvas**, perduodamas funkcijai `applyStackedCompression()` (eksportuojamai iš `@omniroute/open-sse/services/compression/strategySelector`):

```ts
import { applyStackedCompression } from "@omniroute/open-sse/services/compression/strategySelector";

const result = applyStackedCompression(body, [
  { engine: "rtk", intensity: "aggressive" },
  { engine: "caveman", intensity: "full" },
]);
```

Kai konvejerio neperduodate, pagal numatytuosius nustatymus naudojama seka `rtk(standard) → caveman(full)`.

Norėdami jį valdyti per konfigūraciją, nustatykite `mode: "stacked"` ir pateikite žingsnių masyvą lauke `stackedPipeline` (nuskaitomą iš `config.stackedPipeline`):

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

## Pirminių projektų sinchronizavimo politika

OmniRoute README faile nurodo kelis pirminius projektus, kuriais remiasi glaudinimo
moduliai („įkvėpta RTK, Caveman, LLMLingua-2, Troglodita“). Dažnas pagalbininkų
klausimas: **kai pirminiame RTK projekte pridedamas naujas įrankio filtras arba Caveman prideda
taisyklių rinkinį, kaip tai patenka į OmniRoute?** Šiame skyriuje pateikiamas oficialus atsakymas.

### Įtrauktos kopijos ir nepriklausomi įgyvendinimai

| Modulis                      | Ryšys su pirminiu projektu                                                                                                              | Vieta                                                               |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| **RTK**                      | **Nepriklausomas pakartotinis įgyvendinimas** (įkvėptas, o ne nukopijuotas)                                                             | `open-sse/services/compression/engines/rtk/`                        |
| **Caveman**                  | **Nepriklausomas pakartotinis įgyvendinimas** (įkvėptas)                                                                                | `open-sse/services/compression/engines/cavemanAdapter.ts`           |
| **Headroom**                 | Daugiausia vidinis; tik `gcf/` kodekas yra **iš tikrųjų įtraukta** `gcf-typescript` kopija (MIT, pažymėta SPDX, tik bendrasis profilis) | `open-sse/services/compression/engines/headroom/gcf/`               |
| **LLMLingua-2 / Troglodita** | Įkvėpti šių projektų (jais grindžiami `llmlingua` + `session-dedup` moduliai)                                                           | `open-sse/services/compression/engines/llmlingua/`, `session-dedup` |

Svarbiausia: **RTK ir Caveman yra nuo nulio sukurti TypeScript
_idėjų_ (filtravimo taisyklių, taisyklių rinkinių) įgyvendinimai, o ne įtraukti pirminio kodo medžiai.** Nėra
pirminės kopijos, iš kurios būtų galima vykdyti `git pull` — būtent todėl README faile rašoma
„įkvėpta“, o ne „įtraukta“.

### Kaip integruojami pirminių projektų patobulinimai

**Nėra automatinio pirminių projektų leidimų stebėjimo ir nėra `compression-sync`
žymos** — taip numatyta. Kadangi moduliai yra pakartotiniai įgyvendinimai, pirminio RTK
filtras ar Caveman taisyklių rinkinys nėra integruojamas kaip kodas; jis **iš naujo išreiškiamas kaip nauja
taisyklė ar filtras OmniRoute formatu** (žr.
[COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md)) ir pridedamas pagal poreikį per
įprastą PR. Pirmiau nurodyti plėtimo taškai (pasirinktinis modulis, kalbos paketas, RTK filtras)
yra patvirtintas būdas tokiam patobulinimui pateikti.

Naujausi būtent tokio proceso pavyzdžiai:

- RTK filtrai, skirti Gradle ir `dotnet` komponavimo išvesčiai (v3.8.42)
- RTK filtrai, skirti kubectl / docker-build / composer / gh (#2824)
- Caveman indoneziečių kalbos paketas (#3975), taip pat vokiečių / prancūzų / japonų / kinų kalbų paketai

### Headroom (įvesties glaudinimo tarpinis serveris)

Headroom yra **visiškai vidinis** — fiksuota įtraukta `gcf` kodeko momentinė kopija ir
OmniRoute nuosavi `smartcrusher` / `toon` / `tabular` sluoksniai. Nėra aktyviai
stebimo pirminio projekto, išskyrus įtrauktą kopiją; `gcf` naujinamas
rankiniu būdu, kai pasikeičia kodekas, ir pakartotinai patikrinamas pagal glaudinimo biudžeto
patikrą (`check:compression-budget`).

### Pirminio projekto įkvėpto patobulinimo siūlymas

1. **Neįtraukite kopijos** — iš naujo išreikškite pirminio projekto taisyklę ar filtrą OmniRoute formatu.
2. Pridėkite jį per atitinkamą toliau nurodytą plėtimo tašką (kalbos paketą, RTK filtrą arba
   pasirinktinį modulį).
3. PR apraše nurodykite pirminį projektą (autorystės pripažinimui), o ne
   kopijuokite jo licencijuotą pirminį kodą.
4. Įtraukite testus ir patvirtinkite, kad `check:compression-budget` patikra vis dar sėkminga.

---

## Išvesties stiliaus pridėjimas

Išvesties stiliai (žr. [vadovo katalogo lentelę](./COMPRESSION_GUIDE.md#output-styles-catalog))
yra įvesties variklių atitikmuo atsakymo pusėje: užuot glaudinę tai, ką
siunčiate, jie nurodo modeliui generuoti mažiau išteklių reikalaujančią išvestį. Registras yra
`OUTPUT_STYLE_CATALOG`, esantis `open-sse/services/compression/outputStyles/catalog.ts`, o
**vienas katalogo įrašas sudaro visą funkciją**: įterpiklis, valdymo skydelio nustatymų skydas,
išsaugojimas ir telemetrija naudoja katalogo sąrašą — jokio kito sąrašo atnaujinti nereikia.

1. **Pridėkite vieną įrašą į `OUTPUT_STYLE_CATALOG`**, nurodydami `id`, `label`, `description` ir
   tris angliškus `levels` (`lite`, `full`, `ultra`). Kiekvienas lygis turi baigtis
   `${SHARED_BOUNDARIES}`, kad kodas, keliai, komandos, klaidos ir URL liktų nepakeisti.
   Instrukcijos tekstas kiekvienam `(id, level, language)` turi būti **statinis ir deterministinis** —
   leidžiama tik `${SHARED_BOUNDARIES}` interpoliacija.
2. **Išverskite jį.** Pateikite bent `pt-BR` bloką po `i18n`; `ponytail` ir
   `i-have-adhd` (en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi) yra pavyzdinė struktūra. Sąmoningai
   tik vienai kalbai skirtas stilius vietoj to nustato `locale` (kaip `terse-cjk` → `zh`) ir tuomet
   siūlomas tik tai lokalei.
3. **Atnaujinkite matricos apsaugą** — pridėkite stiliaus kalbas į `BASELINE_LANGUAGES`, esantį
   `tests/unit/compression/output-styles-i18n-matrix.test.ts`. Patikra atmeta bet kokį naują
   pagal lokalę neribojamą stilių, neturintį reikiamų vertimų, nebent jis turi aiškų
   `KNOWN_ENGLISH_ONLY` įrašą su sekimo užduotimi.
4. **Pridėkite kiekvienam stiliui skirtą testą**, sukurtą pagal
   `tests/unit/compression/i-have-adhd-catalog.test.ts`: katalogo struktūros, ribų
   sąlygos kiekvienam lygiui ir kontrolinio teiginio, patvirtinančio, kad kiekvienas vertimas parašytas
   atitinkama kalba, o ne nukopijuotas iš anglų kalbos.
5. **Autorystės nurodymas**: jei stilius pritaikytas iš išorinio projekto, nurodykite jį
   įrašo šaltinio komentare (pvz., `i-have-adhd` → ayghri/i-have-adhd, MIT) — taikoma ta pati
   taisyklė kaip pirmiau pateiktame skyriuje „Išorinio projekto įkvėpto patobulinimo siūlymas“.

Nereikia keisti naudotojo sąsajos, schemos ar telemetrijos — šie elementai generuojami pagal katalogą.

---

## Geriausios praktikos

### Variklių kūrimas

1. **Visada įgyvendinkite `validateConfig`** — varikliai be validavimo sukelia nepastebimas triktis
2. **Nustatykite realistišką `targetLatencyMs`** — strategijos parinkiklis jį naudoja varikliams pasirinkti
3. **Valdymo skydeliui naudokite `getConfigSchema`** — niekada neslėpkite konfigūracijos nuo naudotojų
4. **Palaikykite `stackable: true`, jei jūsų variklis yra grynas** — šalutinį poveikį turintys varikliai neturėtų būti jungiami į seką
5. **Rašykite įterptinius testus** — variklius turėtų būti galima patikrinti per <1s

### Kalbų paketų kūrimas

1. **Pradėkite nuo `lite` intensyvumo** — jūsų taisyklės turėtų būti saugios esant žemiausiam nustatymui
2. **Taisyklių taikymo sričiai apibrėžti naudokite `context`** — tik `user` skirtos taisyklės negali netyčia paveikti sistemos raginimų
3. **Venkite fiksuoti JSON raktus** — `\\bword\\b` gali sutapti su tekstu JSON viduje ir sugadinti struktūrinius duomenis
4. **Testuokite ribinius atvejus** — tuščią įvestį, „Unicode“, RTL tekstą, jaustukus
5. **Esamus paketus naudokite kaip šablonus** — `en/filler.json` yra išsamiausiai išplėtotas pavyzdys

### Konvejerio projektavimas

1. **Prieš optimizuodami atlikite profiliavimą** — pirmiausia matuokite naudodami `compression_stats`
2. **Pirmenybę teikite komponavimui, o ne pakartotiniam įgyvendinimui** — prieš rašydami naują variklį išplėskite Caveman taisykles
3. **Dokumentuokite eiliškumo pagrindimą** — komentare paaiškinkite, kodėl variklis A vykdomas prieš variklį B
4. **Testuokite visais 3 intensyvumo lygiais** — `lite` yra greitas, bet nuostolingas, o `ultra` — lėtas, bet tikslus

---

## Žinynas: integruotieji varikliai

| Variklio ID          | Galima derinti | Numatytoji stackPriority | Taikiniai                                   |
| -------------------- | -------------- | ------------------------ | ------------------------------------------- |
| `lite`               | Taip           | 5                        | pranešimai, įrankių_rezultatai              |
| `rtk`                | Taip           | 10                       | įrankių_rezultatai                          |
| `standard` (caveman) | Taip           | 20                       | pranešimai, įrankių_rezultatai, kodo_blokai |
| `aggressive`         | Taip           | 30                       | pranešimai                                  |
| `ultra`              | Taip           | 40                       | pranešimai, kodo_blokai                     |

### Taip pat žr.

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — konvejerio apžvalga
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — variklių registro žinynas
- [COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md) — taisyklių formato specifikacija
- [COMPRESSION_LANGUAGE_PACKS.md](./COMPRESSION_LANGUAGE_PACKS.md) — išsami informacija apie kalbų paketus
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — RTK variklis ir pasirinktiniai filtrai
- Šaltinis: `open-sse/services/compression/` (117 failų, ~250 KB)
