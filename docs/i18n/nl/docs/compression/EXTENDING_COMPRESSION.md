# Extending the Compression Pipeline (Nederlands)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/EXTENDING_COMPRESSION.md) · 🇪🇹 [am](../../../am/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇦 [ar](../../../ar/docs/compression/EXTENDING_COMPRESSION.md) · 🇦🇿 [az](../../../az/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇬 [bg](../../../bg/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇩 [bn](../../../bn/docs/compression/EXTENDING_COMPRESSION.md) · 🇨🇿 [cs](../../../cs/docs/compression/EXTENDING_COMPRESSION.md) · 🇩🇰 [da](../../../da/docs/compression/EXTENDING_COMPRESSION.md) · 🇩🇪 [de](../../../de/docs/compression/EXTENDING_COMPRESSION.md) · 🇬🇷 [el](../../../el/docs/compression/EXTENDING_COMPRESSION.md) · 🇪🇸 [es](../../../es/docs/compression/EXTENDING_COMPRESSION.md) · 🇪🇪 [et](../../../et/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇷 [fa](../../../fa/docs/compression/EXTENDING_COMPRESSION.md) · 🇫🇮 [fi](../../../fi/docs/compression/EXTENDING_COMPRESSION.md) · 🇫🇷 [fr](../../../fr/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇪 [ga](../../../ga/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [gu](../../../gu/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [ha](../../../ha/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇱 [he](../../../he/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [hi](../../../hi/docs/compression/EXTENDING_COMPRESSION.md) · 🇭🇷 [hr](../../../hr/docs/compression/EXTENDING_COMPRESSION.md) · 🇭🇺 [hu](../../../hu/docs/compression/EXTENDING_COMPRESSION.md) · 🇦🇲 [hy](../../../hy/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇩 [id](../../../id/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [ig](../../../ig/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇹 [it](../../../it/docs/compression/EXTENDING_COMPRESSION.md) · 🇯🇵 [ja](../../../ja/docs/compression/EXTENDING_COMPRESSION.md) · 🇬🇪 [ka](../../../ka/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇭 [km](../../../km/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [kn](../../../kn/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇷 [ko](../../../ko/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇹 [lt](../../../lt/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇻 [lv](../../../lv/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [ml](../../../ml/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [mr](../../../mr/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇾 [ms](../../../ms/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇹 [mt](../../../mt/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇲 [my](../../../my/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇵 [ne](../../../ne/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇴 [no](../../../no/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [or](../../../or/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [pa](../../../pa/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇭 [phi](../../../phi/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇱 [pl](../../../pl/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇹 [pt](../../../pt/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇴 [ro](../../../ro/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇺 [ru](../../../ru/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇰 [si](../../../si/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇰 [sk](../../../sk/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇮 [sl](../../../sl/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇸 [sr](../../../sr/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇪 [sv](../../../sv/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇪 [sw](../../../sw/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [ta](../../../ta/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [te](../../../te/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇭 [th](../../../th/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇷 [tr](../../../tr/docs/compression/EXTENDING_COMPRESSION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇰 [ur](../../../ur/docs/compression/EXTENDING_COMPRESSION.md) · 🇺🇿 [uz](../../../uz/docs/compression/EXTENDING_COMPRESSION.md) · 🇻🇳 [vi](../../../vi/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [yo](../../../yo/docs/compression/EXTENDING_COMPRESSION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/EXTENDING_COMPRESSION.md)

---

> **TL;DR**: De compressie-engine van OmniRoute is **uitbreidbaar** — je kunt aangepaste engines registreren, taalpakketten voor nieuwe talen leveren en gestapelde pipelines samenstellen. Deze handleiding laat zien hoe.

**Gerelateerde handleidingen:**

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — Volledig overzicht van de pipeline
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — Engineregister en ingebouwde engines
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — RTK-engine en aangepaste filters
- [COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md) — Naslagwerk voor de indeling van regelpakketten

---

## Overzicht

Het compressiesysteem heeft **3 uitbreidingspunten**:

| Uitbreidingspunt        | Gebruiksscenario                                                                         | Moeilijkheidsgraad |
| ----------------------- | ---------------------------------------------------------------------------------------- | ------------------ |
| **Aangepaste engine**   | Voeg een volledig nieuw compressiealgoritme toe (bijv. een domeinspecifieke samenvatter) | Gevorderd          |
| **Taalpakket**          | Voeg ondersteuning voor een nieuwe natuurlijke taal toe (bijv. Hindi, Arabisch)          | Gemiddeld          |
| **Gestapelde pipeline** | Combineer bestaande engines in een aangepaste volgorde                                   | Beginner           |

```
┌─────────────────────────────────────────────────────────────┐
│                    Compressiestrategie                       │
│                                                              │
│   Invoerberichten ─▶ getEffectiveMode() ──▶ modus           │
│                                              │               │
│                      ┌───────────────────────┼──────────┐    │
│                      │         │         │         │    │    │
│                      ▼         ▼         ▼         ▼    │    │
│                   "rtk"    "lite"   "standard" "stacked"    │
│                      │         │         │         │    │    │
│                      ▼         ▼         ▼         ▼    │    │
│                   RTK       Lite     Caveman   engines[]   │
│                   engine    engine   engine    gekoppeld   │
│                      │         │         │         │    │    │
│                      └─────────┴─────────┴─────────┘    │    │
│                                      │                    │
│                                      ▼                    │
│                           Gecomprimeerde uitvoer            │
└─────────────────────────────────────────────────────────────┘

De strategiekiezer is MODUSGEBASEERD: elke aanvraag selecteert ÉÉN modus
(rtk / lite / standard / aggressive / ultra / stacked / off).
Alleen de modus "stacked" koppelt meerdere engines achter elkaar.
De standaardmodus voor automatische activering is "lite" (geen prioriteitsketen met 3 niveaus).
```

---

## Een aangepaste compressie-engine schrijven

De engine-interface (`open-sse/services/compression/engines/types.ts`) is het contract waaraan elke engine moet voldoen. Deze heeft 5 verplichte methoden.

### De interface `CompressionEngine`

```ts
interface CompressionEngine {
  id: string; // Unieke engine-ID
  name: string; // Weergavenaam
  description: string; // Korte beschrijving
  icon: string; // Pictogram (emoji of URL)
  targets: CompressionEngineTarget[]; // ["messages", "tool_results", "code_blocks"]
  stackable: boolean; // Kan in een gestapelde pipeline worden gebruikt
  stackPriority: number; // Volgorde in gestapelde pipelines (lager = eerder)
  metadata: CompressionEngineMetadata;

  apply(body, options?): CompressionResult;
  compress(body, config?): CompressionResult;
  getConfigSchema(): EngineConfigField[];
  validateConfig(config): EngineValidationResult;
}
```

### Minimaal voorbeeld: Whitespace-engine

De eenvoudigst mogelijke engine — verwijder overtollige witruimte uit berichten.

````ts
import type { CompressionEngine } from "omniroute/compression/engines/types";
import { registerCompressionEngine } from "omniroute/compression/engines/registry";

function preserveCodeBlocks(text: string): string {
  // Splits op codeblokmarkeringen en behoud witruimte binnen die blokken
  const parts = text.split(/(```[\s\S]*?```)/);
  return parts
    .map((part) => {
      if (part.startsWith("```")) {
        return part; // Wijzig codeblokken niet
      }
      return part.replace(/\n{3,}/g, "\n\n"); // Pas dit alleen toe op proza
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
  stackPriority: 100, // Uitvoeren NA caveman/rtk

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

    // Doorloop de berichtenarray — verwerk zowel tekenreeks- als meerdelige inhoud
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
      // Meerdelige inhoud: doorloop de onderdelen en comprimeer alleen tekstonderdelen
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
          return part; // behoud image_url, tool_use enz.
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

// Registreer globaal
registerCompressionEngine(whitespaceEngine);
````

### Waar aangepaste engines moeten worden geplaatst

```
~/.omniroute/compression/engines/my-engine.ts    # Gebruikersniveau
<project>/compression-engines/my-engine.ts        # Projectniveau (geladen bij het opstarten)
```

Of laad ze programmatisch vanuit een plugin:

```ts
// In je plugin
import {
  registerCompressionEngine,
  unregisterCompressionEngine,
} from "@omniroute/open-sse/services/compression/engines/registry";
import { myEngine } from "./engines/my-engine";

export default definePlugin({
  name: "my-compression-plugin",
  // De plugin-SDK biedt de hooks onRequest / onResponse / onError. Registreer de
  // engine wanneer de pluginmodule wordt geladen (of bij de eerste onRequest); verwijder
  // de registratie via je eigen afbouwpad.
  onRequest: async (ctx) => {
    registerCompressionEngine(myEngine);
  },
});

// Bij het afbouwen:
// unregisterCompressionEngine("my-engine");
```

### Je engine testen

Registreer je engine in een plugin of opstartfunctie. Na registratie is de engine via zijn `id`
beschikbaar in de strategiekiezer. Test de integratie door deze in een gestapelde pijplijn samen te stellen:

---

## Taalpakketten maken

Compressie in holbewonerstijl gebruikt **taalspecifieke regelpakketten** om stopwoorden, voorbehouden en omslachtige patronen in elke natuurlijke taal te verwerken. OmniRoute wordt geleverd met **6 taalpakketten**: `en`, `es`, `fr`, `de`, `ja`, `pt-BR`.

### Pakketstructuur

Een taalpakket is een map met **JSON-bestanden** onder `open-sse/services/compression/rules/<language>/`:

```
open-sse/services/compression/rules/
├── en/
│   ├── filler.json          # Beleefdheden, voorbehouden, hoffelijkheid
│   ├── context.json         # Contextreducerende regels
│   ├── dedup.json           # Regels voor deduplicatie
│   ├── structural.json      # Interpunctie, opmaak
│   └── ultra.json           # Agressieve compressieregels
├── es/  (dezelfde structuur)
├── fr/  (dezelfde structuur)
├── de/  (dezelfde structuur)
├── ja/  (dezelfde structuur)
└── pt-BR/ (dezelfde structuur)
```

### Anatomie van een regel

Elke regel heeft deze vorm (uit `open-sse/services/compression/ruleLoader.ts`):

```ts
interface FileRule {
  name: string; // Voor mensen leesbare naam (kebab-case)
  pattern: string; // JavaScript-regexpatroon
  replacement?: string; // Waarmee de overeenkomst moet worden vervangen
  replacementMap?: Record<string, string>; // OF een sleutel→vervanging-toewijzing
  flags?: string; // Regexvlaggen (doorgaans "gi")
  context?: "all" | "user" | "system" | "assistant";
  category?: "filler" | "context" | "structural" | "dedup" | "terse" | "ultra";
  minIntensity?: "lite" | "full" | "ultra"; // Overslaan onder deze intensiteit
  description?: string; // Documentatie
}
```

### Voorbeeld: Hindi-regels voor stopwoorden toevoegen

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
      "description": "Verwijder beleefde openingswoorden zoals 'नमस्ते'"
    },
    {
      "name": "filler_actually",
      "pattern": "\\b(?:असल में|वास्तव में|दरअसल)\\b\\s*",
      "replacement": "",
      "context": "all",
      "category": "filler",
      "minIntensity": "lite",
      "description": "Verwijder stopwoorden met de betekenis 'eigenlijk'"
    },
    {
      "name": "verbose_plea",
      "pattern": "\\b(?:कृपया|कृपया आप|अनुरोध है कि आप)\\b\\s*",
      "replacement": "",
      "context": "all",
      "category": "filler",
      "minIntensity": "full",
      "description": "Verwijder 'alstublieft' in het Hindi"
    }
  ]
}
```

### Validatie

Regelpakketten worden tijdens het laden gevalideerd aan de hand van `_schema.json`. Een pakket met een onjuiste structuur kan niet worden geladen en er wordt een fout vastgelegd:

```
RULE_LOADER: validatie van pakket "hi/filler.json" mislukt:
  - rules.0.pattern: Ongeldige regex
  - rules.1.context: moet een van [all, user, system, assistant] zijn
```

Validatie wordt automatisch uitgevoerd wanneer een pakket wordt geladen (aan de hand van `_schema.json`); een
ongeldig pakket wordt geweigerd en de bovenstaande fout wordt vastgelegd. Er is geen afzonderlijk
`npm run`-script voor pakketvalidatie — laad het pakket (start bijvoorbeeld de server of
voer het compressiepad uit) en houd de logboeken in de gaten.

### Een aangepast taalpakket laden

```ts
import { loadRulePack } from "omniroute/compression/ruleLoader";

await loadRulePack("./my-custom-rules/hi/filler.json");
```

Of plaats het op een herkende locatie:

```
~/.omniroute/compression/rules/hi/filler.json  # Gebruikersniveau
<project>/.compression/rules/hi/filler.json   # Projectniveau
```

### Aanbevolen werkwijzen voor taalpakketten

1. **Begin met `filler`** — deze regels hebben de grootste impact
2. **Gebruik `minIntensity`** om agressieve regels te begrenzen — dit beschermt tegen overmatige compressie
3. **Neem testgevallen op** — voeg een `tests[]`-array toe aan de JSON om het gedrag te verifiëren
4. **De volgorde is belangrijk** — eerdere regels worden het eerst toegepast; plaats regels met een grote impact vooraan
5. **Wees terughoudend met `replacement`** — een lege tekenreeks is meestal correct; introduceer nooit nieuwe inhoud

### Vertaalstrategie

Bij het lokaliseren van regelpakketten naar een nieuwe taal:

1. **Vertaal de regelnamen** — ze verschijnen in debuguitvoer
2. **Pas de regexpatronen aan** — een directe vertaling werkt vaak niet (woordgrenzen verschillen)
3. **Test met echte gesprekken** — het pakket moet veilig zijn voor daadwerkelijke invoer
4. **Houd rekening met culturele conventies** — Japanse pakketten bevatten bijvoorbeeld meer beleefde stopwoorden dan Engelse

---

## Gestapelde pipelines

Een **gestapelde pipeline** voert meerdere engines na elkaar uit, waarbij de uitvoer van elke engine als invoer voor de volgende dient. Zo werkt `mode: stacked` intern.

### Hoe stapelen werkt

```
Invoer (10.000 tokens)
        │
        ▼
   ┌──────────┐
   │  Engine  │  prioriteit 10
   │  A       │  ──▶ uitvoer: 6.000 tokens (-40%)
   └────┬─────┘
        ▼
   ┌──────────┐
   │  Engine  │  prioriteit 50
   │  B       │  ──▶ uitvoer: 2.400 tokens (-60%)
   └────┬─────┘
        ▼
   ┌──────────┐
   │  Engine  │  prioriteit 100
   │  C       │  ──▶ uitvoer: 1.200 tokens (-80%)
   └────┬─────┘
        │
        ▼
Definitieve uitvoer (1.200 tokens, gecombineerd ~88% besparing)
```

Wanneer `mode: "stacked"` is geselecteerd, worden engines na elkaar uitgevoerd in de volgorde die in de `pipeline`-array is opgegeven.
De uitvoer van engine N wordt de invoer van engine N+1.

### Compressiemodi

OmniRoute selecteert **ÉÉN modus per aanvraag** op basis van de configuratie, drempelwaarden voor automatisch activeren en combinatie-overschrijvingen.
De beschikbare modi zijn gedefinieerd in `open-sse/services/compression/types.ts` (type `CompressionMode`):

| Modus        | Engines              | Gebruikssituatie                                                                                                                                                                                                                   |
| ------------ | -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `off`        | Geen                 | Alle compressie uitschakelen                                                                                                                                                                                                       |
| `rtk`        | Alleen RTK           | Sessies met veel opdrachtuitvoer (80%+ besparing)                                                                                                                                                                                  |
| `lite`       | Alleen Lite          | Voorzichtige compressie (snel, veilig)                                                                                                                                                                                             |
| `standard`   | Caveman              | Compressie van proza met taalpakketten                                                                                                                                                                                             |
| `aggressive` | Caveman + Aggressive | Agressief proza + agressieve laatste doorgang                                                                                                                                                                                      |
| `ultra`      | Ultra                | Maximale compressie (met verlies, als laatste redmiddel). Wordt optioneel door de SLM-engine **LLMLingua-2** geleid wanneer `ultra.modelPath` is ingesteld (valt bij een niet-beschikbaar model terug op het regelgebaseerde pad). |
| `stacked`    | Aangepaste pipeline  | Engines in elke gewenste volgorde combineren (zie hieronder)                                                                                                                                                                       |

> Naast de bovenstaande modus-engines bevat het register ook gespecialiseerde stapelbare engines —
> **CCR**, **headroom**, **ionizer** en **session-dedup** — die zijn gedocumenteerd in
> [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md#additional-built-in-engines).

De modusselectie wordt bepaald door `getEffectiveMode()` in `open-sse/services/compression/strategySelector.ts`:

1. Als compressie is uitgeschakeld: `"off"`
2. Als er een combinatie-overschrijving bestaat: gebruik de overschrijving
3. Als de drempelwaarde voor automatisch activeren wordt overschreden: gebruik `autoTriggerMode` (standaard: `"lite"`)
4. Gebruik anders `defaultMode`

### De standaard gestapelde pipeline

Wanneer `mode: "stacked"` expliciet is geconfigureerd, combineert de standaardpipeline:

1. **RTK** — verwijdert ruis uit opdrachtuitvoer (~80% besparing op terminaluitvoer)
2. **Caveman** — verwijdert stopwoorden en maakt proza beknopter (~46% op de resterende tekst)
3. **Lite** — laatste doorgang voor witruimte en deduplicatie

Deze combinatie levert **78-95% besparing** op bij sessies met veel toolgebruik.

### Gestapelde pipelines configureren

In de combinatieconfiguratie:

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

U kunt engines weglaten, aangepaste engines toevoegen of de volgorde wijzigen.

### Status doorgeven

Engines kunnen metadata uit de aanvraagcontext lezen (in `options`):

```ts
compress(body, config) {
  // Metadata van vorige engines lezen
  const original = options?.compressionComboId;  // "my-coding-combo"
  // ...
}
```

De metadata zijn **alleen-lezen** — engines kunnen de aanvraagcontext niet wijzigen, alleen hun eigen body-uitvoer.

### Valkuilen bij de uitvoeringsvolgorde

| Volgorde van engines                   | Effect                                                                                          |
| -------------------------------------- | ----------------------------------------------------------------------------------------------- |
| RTK → Caveman → Lite                   | **Aanbevolen** (verwijdert eerst ruis, daarna taal en vervolgens witruimte)                     |
| Lite → RTK → Caveman                   | Slecht — Lite verwijdert witruimte uit onbewerkte uitvoer, waardoor RTK-patroonherkenning faalt |
| Caveman → RTK                          | Slecht — Caveman kan tekst herschrijven op manieren die RTK niet herkent                        |
| Elke volgorde met eerst `tool_results` | Beter — tooluitvoer bevat de meeste ruis                                                        |

### Wanneer u NIET moet stapelen

Stapelen is niet altijd beter:

- **Eenvoudige berichten** (geen tooluitvoer) — alleen Caveman of Lite is voldoende
- **Kostengevoelig** — elke engine voegt ~5-50 ms latentie toe
- **Specifieke tools** — alleen RTK is doorgaans voldoende voor shell-uitvoer

### Een aangepaste pipeline bouwen

Er is geen register voor benoemde pipelines. Een gestapelde pipeline is gewoon een **inline array
met stappen** die wordt doorgegeven aan `applyStackedCompression()` (geëxporteerd vanuit
`@omniroute/open-sse/services/compression/strategySelector`):

```ts
import { applyStackedCompression } from "@omniroute/open-sse/services/compression/strategySelector";

const result = applyStackedCompression(body, [
  { engine: "rtk", intensity: "aggressive" },
  { engine: "caveman", intensity: "full" },
]);
```

Wanneer je geen pipeline doorgeeft, wordt standaard `rtk(standard) → caveman(full)` gebruikt.

Om deze via de configuratie aan te sturen, stel je `mode: "stacked"` in en geef je de array met stappen op onder
`stackedPipeline` (gelezen uit `config.stackedPipeline`):

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

## Beleid voor upstreamsynchronisatie

De compressie-engines van OmniRoute vermelden in de README verschillende upstreamprojecten
("geïnspireerd door RTK, Caveman, LLMLingua-2, Troglodita"). Een veelgestelde vraag van bijdragers
is: **wanneer upstream RTK een nieuw toolfilter toevoegt of Caveman een regelpakket
toevoegt, hoe komt dat dan in OmniRoute terecht?** Deze sectie bevat het gezaghebbende antwoord.

### Gevendoriseerde kopieën versus onafhankelijke implementaties

| Engine                       | Relatie tot upstream                                                                                                                                      | Locatie                                                             |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| **RTK**                      | **Onafhankelijke herimplementatie** (erdoor geïnspireerd, geen kopie)                                                                                     | `open-sse/services/compression/engines/rtk/`                        |
| **Caveman**                  | **Onafhankelijke herimplementatie** (erdoor geïnspireerd)                                                                                                 | `open-sse/services/compression/engines/cavemanAdapter.ts`           |
| **Headroom**                 | Grotendeels intern; alleen de `gcf/`-codec is **daadwerkelijk gevendoriseerd** vanuit `gcf-typescript` (MIT, met SPDX-markering, alleen algemeen profiel) | `open-sse/services/compression/engines/headroom/gcf/`               |
| **LLMLingua-2 / Troglodita** | Erdoor geïnspireerd (vormen de basis voor de `llmlingua`- en `session-dedup`-engines)                                                                     | `open-sse/services/compression/engines/llmlingua/`, `session-dedup` |

Kernpunt: **RTK en Caveman zijn cleanroom-TypeScript-implementaties van de
_ideeën_ (filterregels, regelpakketten), geen gevendoriseerde broncodebomen.** Er is geen
upstreamkopie om via `git pull` op te halen — en dat is precies waarom in de README
"geïnspireerd door" staat in plaats van "meegeleverd".

### Hoe upstreamverbeteringen worden samengevoegd

Er is **geen geautomatiseerde tracking van upstreamreleases en geen `compression-sync`-
label** — bewust. Omdat de engines herimplementaties zijn, wordt een upstream RTK-
filter of Caveman-regelpakket niet als code samengevoegd; het wordt **opnieuw uitgedrukt als een nieuwe
regel/filter in OmniRoutes eigen indeling** (zie
[COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md)) en wordt ad hoc via
een normale PR toegevoegd. De bovenstaande uitbreidingspunten (aangepaste engine, taalpakket, RTK-filter)
zijn de goedgekeurde manier om er een bij te dragen.

Recente voorbeelden van precies deze werkwijze:

- RTK-filters voor builduitvoer van Gradle en `dotnet` (v3.8.42)
- RTK-filters voor kubectl / docker-build / composer / gh (#2824)
- Indonesisch taalpakket voor Caveman (#3975), plus Duitse / Franse / Japanse / Chinese pakketten

### Headroom (proxy voor invoercompressie)

Headroom is **volledig intern** — een vastgezette, gevendoriseerde `gcf`-codecsnapshot plus
OmniRoutes eigen `smartcrusher`- / `toon`- / `tabular`-lagen. Er is geen actieve
upstream om te volgen buiten de gevendoriseerde kopie; updates voor `gcf` worden
handmatig vernieuwd wanneer de codec verandert en opnieuw gevalideerd aan de hand van de poort voor het compressiebudget
(`check:compression-budget`).

### Een door upstream geïnspireerde verbetering voorstellen

1. **Vendor de code niet** — druk de upstreamregel of het upstreamfilter opnieuw uit in OmniRoutes indeling.
2. Voeg deze toe via het bijbehorende uitbreidingspunt hieronder (taalpakket, RTK-filter of
   aangepaste engine).
3. Verwijs in de PR-beschrijving naar het upstreamproject (bronvermelding), zonder
   de licentiehoudende broncode ervan te kopiëren.
4. Voeg tests toe en controleer of de `check:compression-budget`-poort nog steeds slaagt.

---

## Een uitvoerstijl toevoegen

Uitvoerstijlen (zie de [catalogustabel in de handleiding](./COMPRESSION_GUIDE.md#output-styles-catalog))
zijn de tegenhanger aan de antwoordzijde van de invoer-engines: in plaats van te comprimeren wat je
verstuurt, instrueren ze het model om goedkopere uitvoer te produceren. Het register is
`OUTPUT_STYLE_CATALOG` in `open-sse/services/compression/outputStyles/catalog.ts`, en
**één catalogusvermelding vormt de volledige functionaliteit**: de injector, het instellingenpaneel van het dashboard,
persistentie en telemetrie gebruiken allemaal de catalogus — er is geen andere lijst die moet worden bijgewerkt.

1. **Voeg één vermelding toe aan `OUTPUT_STYLE_CATALOG`** met `id`, `label`, `description` en de
   drie Engelse `levels` (`lite`, `full`, `ultra`). Elk niveau moet eindigen met
   `${SHARED_BOUNDARIES}`, zodat code, paden, opdrachten, fouten en URL's letterlijk behouden blijven.
   De instructietekst moet per `(id, level, language)` **statisch en deterministisch** zijn —
   `${SHARED_BOUNDARIES}` is de enige toegestane interpolatie.
2. **Vertaal deze.** Voeg onder `i18n` ten minste een `pt-BR`-blok toe; `ponytail` en
   `i-have-adhd` (en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi) dienen als referentiestructuur. Een bewust
   ééntalige stijl stelt in plaats daarvan `locale` in (zoals `terse-cjk` → `zh`) en wordt dan
   alleen voor die locale aangeboden.
3. **Werk de matrixcontrole bij** — voeg de talen van de stijl toe aan `BASELINE_LANGUAGES` in
   `tests/unit/compression/output-styles-i18n-matrix.test.ts`. De controle wijst elke nieuwe stijl
   die niet door een locale wordt beperkt en niet over de vereiste vertalingen beschikt af, tenzij deze een
   expliciete `KNOWN_ENGLISH_ONLY`-vermelding met een tracking-issue bevat.
4. **Voeg een test per stijl toe**, gemodelleerd naar
   `tests/unit/compression/i-have-adhd-catalog.test.ts`: catalogusstructuur, de
   begrenzingsclausule per niveau en een anker dat bevestigt dat elke vertaling in de eigen
   taal is geschreven en niet uit het Engels is gekopieerd.
5. **Naamsvermelding**: als de stijl is aangepast vanuit een upstreamproject, vermeld dit dan in een
   broncommentaar bij de vermelding (bijvoorbeeld `i-have-adhd` → ayghri/i-have-adhd, MIT) — dezelfde
   regel als bij 'Een door upstream geïnspireerde verbetering voorstellen' hierboven.

Er zijn geen wijzigingen in de UI, het schema of de telemetrie nodig — deze onderdelen worden vanuit de catalogus gerenderd.

---

## Best practices

### Engineontwikkeling

1. **Implementeer altijd `validateConfig`** — engines zonder validatie veroorzaken stille fouten
2. **Stel een realistische `targetLatencyMs` in** — wordt door de strategieselector gebruikt om engines te kiezen
3. **Gebruik `getConfigSchema` voor het dashboard** — verberg configuratie nooit voor gebruikers
4. **Ondersteun `stackable: true` als je engine puur is** — engines met neveneffecten mogen niet worden gestapeld
5. **Schrijf inline tests** — engines moeten in <1s verifieerbaar zijn

### Ontwikkeling van taalpakketten

1. **Begin met de intensiteit `lite`** — je regels moeten veilig zijn op de laagste instelling
2. **Gebruik `context` om regels af te bakenen** — regels die alleen voor `user` gelden, kunnen systeemprompts niet per ongeluk beïnvloeden
3. **Voorkom dat JSON-sleutels worden vastgelegd** — `\\bword\\b` kan overeenkomen met tekst binnen JSON, waardoor gestructureerde gegevens beschadigd raken
4. **Test met randgevallen** — lege invoer, Unicode, RTL-tekst, emoji's
5. **Gebruik bestaande pakketten als sjablonen** — `en/filler.json` is het verst ontwikkelde voorbeeld

### Pipelineontwerp

1. **Profileer voordat je optimaliseert** — meet eerst met `compression_stats`
2. **Geef de voorkeur aan compositie boven herimplementatie** — breid Caveman-regels uit voordat je een nieuwe engine schrijft
3. **Documenteer de reden voor de volgorde** — licht in een commentaar toe waarom engine A vóór engine B komt
4. **Test op alle 3 intensiteitsniveaus** — `lite` is snel maar onnauwkeurig, `ultra` is langzaam maar precies

---

## Referentie: ingebouwde engines

| Engine-ID            | Stapelbaar | Standaard stackPriority | Doelen                               |
| -------------------- | ---------- | ----------------------- | ------------------------------------ |
| `lite`               | Ja         | 5                       | berichten, tool_results              |
| `rtk`                | Ja         | 10                      | tool_results                         |
| `standard` (caveman) | Ja         | 20                      | berichten, tool_results, code_blocks |
| `aggressive`         | Ja         | 30                      | berichten                            |
| `ultra`              | Ja         | 40                      | berichten, code_blocks               |

### Zie ook

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — Overzicht van de pipeline
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — Referentie voor het engineregister
- [COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md) — Specificatie van de regelindeling
- [COMPRESSION_LANGUAGE_PACKS.md](./COMPRESSION_LANGUAGE_PACKS.md) — Details over taalpakketten
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — RTK-engine en aangepaste filters
- Bron: `open-sse/services/compression/` (117 bestanden, ~250 KB)
