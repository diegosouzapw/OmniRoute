# Extending the Compression Pipeline (Svenska)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/EXTENDING_COMPRESSION.md) · 🇪🇹 [am](../../../am/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇦 [ar](../../../ar/docs/compression/EXTENDING_COMPRESSION.md) · 🇦🇿 [az](../../../az/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇬 [bg](../../../bg/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇩 [bn](../../../bn/docs/compression/EXTENDING_COMPRESSION.md) · 🇨🇿 [cs](../../../cs/docs/compression/EXTENDING_COMPRESSION.md) · 🇩🇰 [da](../../../da/docs/compression/EXTENDING_COMPRESSION.md) · 🇩🇪 [de](../../../de/docs/compression/EXTENDING_COMPRESSION.md) · 🇬🇷 [el](../../../el/docs/compression/EXTENDING_COMPRESSION.md) · 🇪🇸 [es](../../../es/docs/compression/EXTENDING_COMPRESSION.md) · 🇪🇪 [et](../../../et/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇷 [fa](../../../fa/docs/compression/EXTENDING_COMPRESSION.md) · 🇫🇮 [fi](../../../fi/docs/compression/EXTENDING_COMPRESSION.md) · 🇫🇷 [fr](../../../fr/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇪 [ga](../../../ga/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [gu](../../../gu/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [ha](../../../ha/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇱 [he](../../../he/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [hi](../../../hi/docs/compression/EXTENDING_COMPRESSION.md) · 🇭🇷 [hr](../../../hr/docs/compression/EXTENDING_COMPRESSION.md) · 🇭🇺 [hu](../../../hu/docs/compression/EXTENDING_COMPRESSION.md) · 🇦🇲 [hy](../../../hy/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇩 [id](../../../id/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [ig](../../../ig/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇹 [it](../../../it/docs/compression/EXTENDING_COMPRESSION.md) · 🇯🇵 [ja](../../../ja/docs/compression/EXTENDING_COMPRESSION.md) · 🇬🇪 [ka](../../../ka/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇭 [km](../../../km/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [kn](../../../kn/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇷 [ko](../../../ko/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇹 [lt](../../../lt/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇻 [lv](../../../lv/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [ml](../../../ml/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [mr](../../../mr/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇾 [ms](../../../ms/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇹 [mt](../../../mt/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇲 [my](../../../my/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇵 [ne](../../../ne/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇱 [nl](../../../nl/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇴 [no](../../../no/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [or](../../../or/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [pa](../../../pa/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇭 [phi](../../../phi/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇱 [pl](../../../pl/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇹 [pt](../../../pt/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇴 [ro](../../../ro/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇺 [ru](../../../ru/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇰 [si](../../../si/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇰 [sk](../../../sk/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇮 [sl](../../../sl/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇸 [sr](../../../sr/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇪 [sw](../../../sw/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [ta](../../../ta/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [te](../../../te/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇭 [th](../../../th/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇷 [tr](../../../tr/docs/compression/EXTENDING_COMPRESSION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇰 [ur](../../../ur/docs/compression/EXTENDING_COMPRESSION.md) · 🇺🇿 [uz](../../../uz/docs/compression/EXTENDING_COMPRESSION.md) · 🇻🇳 [vi](../../../vi/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [yo](../../../yo/docs/compression/EXTENDING_COMPRESSION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/EXTENDING_COMPRESSION.md)

---

> **Kort sagt**: OmniRoutes komprimeringsmotor är **utbyggbar** — du kan registrera anpassade motorer, leverera språkpaket för nya språk och sätta samman staplade pipelines. Den här guiden visar hur.

**Relaterade guider:**

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — Fullständig översikt över pipelinen
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — Motorregister och inbyggda motorer
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — RTK-motorn och anpassade filter
- [COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md) — Referens för regelpaketens format

---

## Översikt

Komprimeringssystemet har **3 utökningspunkter**:

| Utökningspunkt       | Användningsfall                                                                 | Svårighetsgrad |
| -------------------- | ------------------------------------------------------------------------------- | -------------- |
| **Anpassad motor**   | Lägg till en helt ny komprimeringsalgoritm (t.ex. domänspecifik sammanfattning) | Avancerad      |
| **Språkpaket**       | Lägg till stöd för ett nytt naturligt språk (t.ex. hindi eller arabiska)        | Medel          |
| **Staplad pipeline** | Sätt samman befintliga motorer i en anpassad ordning                            | Nybörjare      |

```
┌─────────────────────────────────────────────────────────────┐
│                    Komprimeringsstrategi                     │
│                                                              │
│   Indatameddelanden ──▶ getEffectiveMode() ──▶ läge          │
│                                              │               │
│                      ┌───────────────────────┼──────────┐    │
│                      │         │         │         │    │    │
│                      ▼         ▼         ▼         ▼    │    │
│                   "rtk"    "lite"   "standard" "stacked"    │
│                      │         │         │         │    │    │
│                      ▼         ▼         ▼         ▼    │    │
│                   RTK       Lite     Caveman   engines[]   │
│                   motor     motor    motor     kedjade     │
│                      │         │         │         │    │    │
│                      └─────────┴─────────┴─────────┘    │    │
│                                      │                    │
│                                      ▼                    │
│                            Komprimerade utdata             │
└─────────────────────────────────────────────────────────────┘

Strategiväljaren är LÄGESBASERAD: varje begäran väljer ETT läge
(rtk / lite / standard / aggressive / ultra / stacked / off).
Endast läget "stacked" kedjar flera motorer i följd.
Standardläget för automatisk aktivering är "lite" (inte en prioriteringskedja med 3 nivåer).
```

---

## Skriva en anpassad komprimeringsmotor

Motorgränssnittet (`open-sse/services/compression/engines/types.ts`) är kontraktet som varje motor måste uppfylla. Det har 5 obligatoriska metoder.

### Gränssnittet `CompressionEngine`

```ts
interface CompressionEngine {
  id: string; // Unikt motor-ID
  name: string; // Visningsnamn
  description: string; // Kort beskrivning
  icon: string; // Ikon (emoji eller URL)
  targets: CompressionEngineTarget[]; // ["messages", "tool_results", "code_blocks"]
  stackable: boolean; // Kan användas i en staplad pipeline
  stackPriority: number; // Ordning i staplade pipelines (lägre = tidigare)
  metadata: CompressionEngineMetadata;

  apply(body, options?): CompressionResult;
  compress(body, config?): CompressionResult;
  getConfigSchema(): EngineConfigField[];
  validateConfig(config): EngineValidationResult;
}
```

### Minimalt exempel: blankstegsmotor

Den enklast möjliga motorn — tar bort överflödiga blanksteg från meddelanden.

````ts
import type { CompressionEngine } from "omniroute/compression/engines/types";
import { registerCompressionEngine } from "omniroute/compression/engines/registry";

function preserveCodeBlocks(text: string): string {
  // Dela upp efter kodblocksmarkörer och bevara blanksteg inuti dem
  const parts = text.split(/(```[\s\S]*?```)/);
  return parts
    .map((part) => {
      if (part.startsWith("```")) {
        return part; // Ändra inte kodblock
      }
      return part.replace(/\n{3,}/g, "\n\n"); // Tillämpa endast på brödtext
    })
    .join("");
}

const whitespaceEngine: CompressionEngine = {
  id: "whitespace",
  name: "Blankstegsborttagare",
  description: "Tar bort extra blanksteg och tomma rader",
  icon: "📝",
  targets: ["messages", "tool_results"],
  stackable: true,
  stackPriority: 100, // Kör EFTER caveman/rtk

  metadata: {
    id: "whitespace",
    name: "Blankstegsborttagare",
    description: "Tar bort extra blanksteg och tomma rader",
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

    // Gå igenom meddelandematrisen — hantera både stränginnehåll och flerdelat innehåll
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
      // Flerdelat innehåll: gå igenom delarna och komprimera endast textdelar
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
          return part; // bevara image_url, tool_use osv.
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
        label: "Bevara kodblock",
        defaultValue: true,
        description: "Ändra inte blanksteg inuti ```code```-block",
      },
    ];
  },

  validateConfig(config) {
    if (config.preserveCodeBlocks !== undefined && typeof config.preserveCodeBlocks !== "boolean") {
      return {
        valid: false,
        errors: ["preserveCodeBlocks måste vara ett booleskt värde"],
      };
    }
    return { valid: true, errors: [] };
  },
};

// Registrera globalt
registerCompressionEngine(whitespaceEngine);
````

### Var anpassade motorer ska placeras

```
~/.omniroute/compression/engines/my-engine.ts    # Användarnivå
<project>/compression-engines/my-engine.ts        # Projektnivå (läses in vid start)
```

Eller läs in dem programmatiskt från ett plugin:

```ts
// I ditt plugin
import {
  registerCompressionEngine,
  unregisterCompressionEngine,
} from "@omniroute/open-sse/services/compression/engines/registry";
import { myEngine } from "./engines/my-engine";

export default definePlugin({
  name: "my-compression-plugin",
  // Plugin-SDK:t tillhandahåller hakarna onRequest / onResponse / onError. Registrera
  // motorn när pluginmodulen läses in (eller vid första onRequest); avregistrera den
  // via din egen nedstängningsrutin.
  onRequest: async (ctx) => {
    registerCompressionEngine(myEngine);
  },
});

// Vid nedstängning:
// unregisterCompressionEngine("my-engine");
```

### Testa din motor

Registrera din motor i ett plugin eller en startfunktion. När motorn har registrerats blir den tillgänglig
i strategiväljaren via sitt `id`. Testa integrationen genom att infoga den i en staplad pipeline:

---

## Skapa språkpaket

Komprimering i grottmänniskostil använder **språkspecifika regelpaket** för att hantera utfyllnadsord, garderingar och omständliga formuleringar i varje naturligt språk. OmniRoute levereras med **6 språkpaket**: `en`, `es`, `fr`, `de`, `ja`, `pt-BR`.

### Paketstruktur

Ett språkpaket är en katalog med **JSON-filer** under `open-sse/services/compression/rules/<language>/`:

```
open-sse/services/compression/rules/
├── en/
│   ├── filler.json          # Artighetsfraser, garderingar, hövlighet
│   ├── context.json         # Regler för kontextreducering
│   ├── dedup.json           # Regler för deduplicering
│   ├── structural.json      # Interpunktion, formatering
│   └── ultra.json           # Regler för aggressiv komprimering
├── es/  (samma struktur)
├── fr/  (samma struktur)
├── de/  (samma struktur)
├── ja/  (samma struktur)
└── pt-BR/ (samma struktur)
```

### En regels uppbyggnad

Varje regel har följande form (från `open-sse/services/compression/ruleLoader.ts`):

```ts
interface FileRule {
  name: string; // Människoläsbart namn (kebab-case)
  pattern: string; // JavaScript-regexmönster
  replacement?: string; // Vad träffen ska ersättas med
  replacementMap?: Record<string, string>; // ELLER en mappning från nyckel till ersättning
  flags?: string; // Regexflaggor (vanligtvis "gi")
  context?: "all" | "user" | "system" | "assistant";
  category?: "filler" | "context" | "structural" | "dedup" | "terse" | "ultra";
  minIntensity?: "lite" | "full" | "ultra"; // Hoppa över under denna intensitet
  description?: string; // Dokumentation
}
```

### Exempel: Lägga till utfyllnadsregler för hindi

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

### Validering

Regelpaket valideras mot `_schema.json` när de läses in. Ett paket med felaktig struktur kan inte läsas in och ett fel loggas:

```
RULE_LOADER: pack "hi/filler.json" failed validation:
  - rules.0.pattern: Invalid regex
  - rules.1.context: must be one of [all, user, system, assistant]
```

Valideringen körs automatiskt när ett paket läses in (mot `_schema.json`); ett
ogiltigt paket avvisas och felet ovan loggas. Det finns inget separat
`npm run`-skript för paketvalidering — läs in paketet (starta exempelvis servern
eller kör komprimeringsflödet) och övervaka loggarna.

### Läsa in ett anpassat språkpaket

```ts
import { loadRulePack } from "omniroute/compression/ruleLoader";

await loadRulePack("./my-custom-rules/hi/filler.json");
```

Eller placera det på en identifierad plats:

```
~/.omniroute/compression/rules/hi/filler.json  # Användarnivå
<project>/.compression/rules/hi/filler.json   # Projektnivå
```

### Bästa praxis för språkpaket

1. **Börja med `filler`** — dessa regler har störst effekt
2. **Använd `minIntensity`** för att styra aggressiva regler — det skyddar mot överdriven komprimering
3. **Inkludera testfall** — lägg till en `tests[]`-array i JSON-filen för att verifiera beteendet
4. **Ordningen är viktig** — tidigare regler tillämpas först; placera regler med stor effekt först
5. **Var försiktig med `replacement`** — en tom sträng är vanligtvis rätt; introducera aldrig nytt innehåll

### Översättningsstrategi

När regelpaket lokaliseras till ett nytt språk:

1. **Översätt regelnamnen** — de visas i felsökningsutdata
2. **Anpassa regexmönstren** — direktöversättning fungerar ofta inte (ordgränser skiljer sig åt)
3. **Testa mot verkliga konversationer** — paketet ska vara säkert för faktiska indata
4. **Anpassa efter kulturella konventioner** — japanska paket har exempelvis fler hövlighetsutfyllnader än engelska

---

## Staplade pipelines

En **staplad pipeline** kör flera motorer i följd, där utdata från varje motor skickas vidare till nästa. Det är så `mode: stacked` fungerar internt.

### Så fungerar stapling

```
Indata (10 000 tokens)
        │
        ▼
   ┌──────────┐
   │  Motor   │  prioritet 10
   │  A       │  ──▶ utdata: 6 000 tokens (-40 %)
   └────┬─────┘
        ▼
   ┌──────────┐
   │  Motor   │  prioritet 50
   │  B       │  ──▶ utdata: 2 400 tokens (-60 %)
   └────┬─────┘
        ▼
   ┌──────────┐
   │  Motor   │  prioritet 100
   │  C       │  ──▶ utdata: 1 200 tokens (-80 %)
   └────┬─────┘
        │
        ▼
Slutlig utdata (1 200 tokens, ~88 % sammanlagd besparing)
```

När `mode: "stacked"` väljs körs motorerna sekventiellt i den ordning som anges i arrayen `pipeline`.
Utdata från motor N blir indata till motor N+1.

### Komprimeringslägen

OmniRoute väljer **ETT läge per begäran** baserat på konfiguration, tröskelvärden för automatisk aktivering och kombinationsåsidosättningar.
De tillgängliga lägena definieras i `open-sse/services/compression/types.ts` (typen `CompressionMode`):

| Läge         | Motorer              | Användningsområde                                                                                                                                                                                                                     |
| ------------ | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `off`        | Inga                 | Inaktivera all komprimering                                                                                                                                                                                                           |
| `rtk`        | Endast RTK           | Sessioner med mycket kommandoutdata (över 80 % besparing)                                                                                                                                                                             |
| `lite`       | Endast Lite          | Försiktig komprimering (snabb, säker)                                                                                                                                                                                                 |
| `standard`   | Caveman              | Komprimering av prosa med språkpaket                                                                                                                                                                                                  |
| `aggressive` | Caveman + Aggressive | Aggressiv komprimering av prosa + aggressiv slutbearbetning                                                                                                                                                                           |
| `ultra`      | Ultra                | Maximal komprimering (med informationsförlust, sista utväg). Kan valfritt dirigeras genom SLM-motorn **LLMLingua-2** när `ultra.modelPath` har angetts (återgår öppet till den regelbaserade vägen när modellen inte är tillgänglig). |
| `stacked`    | Anpassad pipeline    | Kombinera motorer i valfri ordning (se nedan)                                                                                                                                                                                         |

> Utöver lägesmotorerna ovan innehåller registret även specialiserade stapelbara motorer —
> **CCR**, **headroom**, **ionizer** och **session-dedup** — som dokumenteras i
> [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md#additional-built-in-engines).

Valet av läge avgörs av `getEffectiveMode()` i `open-sse/services/compression/strategySelector.ts`:

1. Om komprimering är inaktiverad: `"off"`
2. Om det finns en kombinationsåsidosättning: använd åsidosättningen
3. Om tröskelvärdet för automatisk aktivering överskrids: använd `autoTriggerMode` (standard: `"lite"`)
4. Annars: använd `defaultMode`

### Den förvalda staplade pipelinen

När `mode: "stacked"` uttryckligen konfigureras kombinerar den förvalda pipelinen:

1. **RTK** — tar bort brus från kommandoutdata (~80 % besparing för terminalutdata)
2. **Caveman** — tar bort utfyllnad och gör prosan mer koncis (~46 % av den återstående texten)
3. **Lite** — slutlig bearbetning av blanksteg + deduplicering

Den här kombinationen ger **78–95 % besparing** i sessioner med omfattande verktygsanvändning.

### Konfigurera staplade pipelines

I kombinationskonfigurationen:

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

Du kan utelämna motorer, lägga till anpassade motorer eller ändra ordningen på dem.

### Överföring av tillstånd

Motorer kan läsa metadata från begärans kontext (i `options`):

```ts
compress(body, config) {
  // Läs metadata från tidigare motorer
  const original = options?.compressionComboId;  // "my-coding-combo"
  // ...
}
```

Metadata är **skrivskyddade** — motorer kan inte ändra begärans kontext, endast sina egna utdata.

### Fallgropar med körningsordningen

| Motorordning                            | Effekt                                                                                             |
| --------------------------------------- | -------------------------------------------------------------------------------------------------- |
| RTK → Caveman → Lite                    | **Rekommenderas** (tar först bort brus, sedan språk och slutligen blanksteg)                       |
| Lite → RTK → Caveman                    | Dåligt — Lite tar bort blanksteg från råa utdata, vilket gör att RTK:s mönstermatchning misslyckas |
| Caveman → RTK                           | Dåligt — Caveman kan skriva om text på sätt som RTK inte känner igen                               |
| Valfri ordning med `tool_results` först | Bättre — verktygsutdata är det mest brusiga innehållet                                             |

### När du INTE bör stapla

Stapling är inte alltid bättre:

- **Enkla meddelanden** (inga verktygsutdata) — enbart Caveman eller Lite räcker
- **Kostnadskänsliga fall** — varje motor tillför ~5–50 ms latens
- **Specifika verktyg** — enbart RTK är vanligtvis tillräckligt för skalutdata

### Bygga en anpassad pipeline

Det finns inget register för namngivna pipelines. En staplad pipeline är helt enkelt en **infogad array
med steg** som skickas till `applyStackedCompression()` (exporterad från
`@omniroute/open-sse/services/compression/strategySelector`):

```ts
import { applyStackedCompression } from "@omniroute/open-sse/services/compression/strategySelector";

const result = applyStackedCompression(body, [
  { engine: "rtk", intensity: "aggressive" },
  { engine: "caveman", intensity: "full" },
]);
```

När du inte anger någon pipeline används som standard `rtk(standard) → caveman(full)`.

Om du vill styra den via konfigurationen anger du `mode: "stacked"` och tillhandahåller stegarrayen under
`stackedPipeline` (läses från `config.stackedPipeline`):

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

## Policy för synkronisering med uppströmsprojekt

OmniRoutes komprimeringsmotorer hänvisar till flera uppströmsprojekt i README
("inspirerad av RTK, Caveman, LLMLingua-2, Troglodita"). En vanlig fråga från
bidragsgivare är: **när RTK uppströms lägger till ett nytt verktygsfilter eller Caveman lägger till ett
regelpaket, hur når det OmniRoute?** Det här avsnittet är det auktoritativa svaret.

### Levererade kopior jämfört med oberoende implementationer

| Motor                        | Relation till uppströmsprojektet                                                                                                                | Plats                                                               |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| **RTK**                      | **Oberoende nyimplementation** (inspirerad av, inte en kopia)                                                                                   | `open-sse/services/compression/engines/rtk/`                        |
| **Caveman**                  | **Oberoende nyimplementation** (inspirerad av)                                                                                                  | `open-sse/services/compression/engines/cavemanAdapter.ts`           |
| **Headroom**                 | Mestadels intern; endast `gcf/`-kodeken är **verkligen levererad som en kopia** från `gcf-typescript` (MIT, SPDX-märkt, endast generisk profil) | `open-sse/services/compression/engines/headroom/gcf/`               |
| **LLMLingua-2 / Troglodita** | Inspirerade av (ligger till grund för motorerna `llmlingua` + `session-dedup`)                                                                  | `open-sse/services/compression/engines/llmlingua/`, `session-dedup` |

Viktig poäng: **RTK och Caveman är cleanroom-implementationer i TypeScript av
_idéerna_ (filterregler, regelpaket), inte levererade kopior av källkodsträd.** Det finns ingen
uppströmskopia att köra `git pull` från – vilket är precis varför README säger
"inspirerad av" i stället för "medföljer".

### Hur förbättringar från uppströmsprojekt införlivas

Det finns **ingen automatiserad spårning av uppströmsversioner och ingen etikett
`compression-sync`** – avsiktligt. Eftersom motorerna är nyimplementationer
införlivas inte ett RTK-filter eller Caveman-regelpaket från uppströmsprojektet som kod; det
**omformuleras som en ny regel/ett nytt filter i OmniRoutes eget format** (se
[COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md)) och läggs till från fall till fall via
en vanlig PR. Utökningspunkterna ovan (anpassad motor, språkpaket, RTK-filter)
är de godkända sätten att bidra med en sådan förbättring.

Nya exempel på exakt detta flöde:

- RTK-filter för byggutdata från Gradle och `dotnet` (v3.8.42)
- RTK-filter för kubectl / docker-build / composer / gh (#2824)
- Indonesiskt språkpaket för Caveman (#3975), plus tyska / franska / japanska / kinesiska paket

### Headroom (proxy för indatakomprimering)

Headroom är **helt intern** – en fastnålad, levererad ögonblicksbild av `gcf`-kodeken samt
OmniRoutes egna lager `smartcrusher` / `toon` / `tabular`. Det finns inget aktivt
uppströmsprojekt att följa utöver den levererade kopian; uppdateringar av `gcf` hämtas
manuellt när kodeken ändras och valideras på nytt mot kontrollen av komprimeringsbudgeten
(`check:compression-budget`).

### Föreslå en förbättring inspirerad av ett uppströmsprojekt

1. **Leverera ingen kopia** – omformulera uppströmsregeln/-filtret i OmniRoutes format.
2. Lägg till den via motsvarande utökningspunkt nedan (språkpaket, RTK-filter eller
   anpassad motor).
3. Hänvisa till uppströmsprojektet i PR-beskrivningen (erkännande), inte genom att
   kopiera dess licensförsedda källkod.
4. Inkludera tester och bekräfta att kontrollen `check:compression-budget` fortfarande godkänns.

---

## Lägga till en utdatastil

Utdatastilar (se [guidens katalogtabell](./COMPRESSION_GUIDE.md#output-styles-catalog))
är motsvarigheten på utdatasidan till indatamotorerna: i stället för att komprimera det du
skickar instruerar de modellen att producera billigare utdata. Registret är
`OUTPUT_STYLE_CATALOG` i `open-sse/services/compression/outputStyles/catalog.ts`, och
**en katalogpost utgör hela funktionen**: injektorn, inställningspanelen på kontrollpanelen,
persistens och telemetri går alla igenom katalogen — det finns ingen annan lista att uppdatera.

1. **Lägg till en post i `OUTPUT_STYLE_CATALOG`** med `id`, `label`, `description` och de
   tre engelska `levels` (`lite`, `full`, `ultra`). Varje nivå måste avslutas med
   `${SHARED_BOUNDARIES}` så att kod, sökvägar, kommandon, fel och URL:er förblir ordagranna.
   Instruktionstexten måste vara **statisk och deterministisk** per
   `(id, level, language)` — `${SHARED_BOUNDARIES}` är den enda tillåtna interpoleringen.
2. **Översätt den.** Leverera åtminstone ett `pt-BR`-block under `i18n`; `ponytail` och
   `i-have-adhd` (en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi) är referensformatet. En avsiktligt
   enspråkig stil anger `locale` i stället (som `terse-cjk` → `zh`) och erbjuds då
   endast för den språkversionen.
3. **Uppdatera matriskontrollen** — lägg till stilens språk i `BASELINE_LANGUAGES` i
   `tests/unit/compression/output-styles-i18n-matrix.test.ts`. Kontrollen underkänner alla nya
   stilar som inte är begränsade till en språkversion och saknar de obligatoriska översättningarna, såvida de inte har en
   uttrycklig `KNOWN_ENGLISH_ONLY`-post med ett spårningsärende.
4. **Lägg till ett test per stil** utformat efter
   `tests/unit/compression/i-have-adhd-catalog.test.ts`: katalogstruktur, gränsklausul
   per nivå och ett ankare som verifierar att varje översättning är skriven på sitt eget
   språk i stället för att vara kopierad engelska.
5. **Erkännande**: om stilen är anpassad från ett externt projekt ska detta erkännas i en
   källkommentar till posten (t.ex. `i-have-adhd` → ayghri/i-have-adhd, MIT) — samma
   regel som i ”Föreslå en förbättring inspirerad av ett externt projekt” ovan.

Ingen ändring av användargränssnittet, schemat eller telemetrin behövs — dessa delar renderas från katalogen.

---

## Bästa praxis

### Motorutveckling

1. **Implementera alltid `validateConfig`** — motorer utan validering orsakar tysta fel
2. **Ange ett realistiskt `targetLatencyMs`** — används av strategiväljaren för att välja motorer
3. **Använd `getConfigSchema` för kontrollpanelen** — dölj aldrig konfigurationen för användarna
4. **Stöd `stackable: true` om motorn är ren** — motorer med sidoeffekter bör inte staplas
5. **Skriv integrerade tester** — motorer bör kunna verifieras på <1 s

### Utveckling av språkpaket

1. **Börja med intensiteten `lite`** — reglerna bör vara säkra vid den lägsta inställningen
2. **Använd `context` för att avgränsa regler** — regler som endast gäller `user` kan inte av misstag påverka systempromptar
3. **Undvik att fånga JSON-nycklar** — `\\bword\\b` kan matcha inuti JSON och förstöra strukturerade data
4. **Testa med gränsfall** — tom indata, Unicode, RTL-text, emojier
5. **Använd befintliga paket som mallar** — `en/filler.json` är det mest utvecklade exemplet

### Pipelinedesign

1. **Profilera före optimering** — mät först med `compression_stats`
2. **Föredra komposition framför omimplementering** — utöka Caveman-regler innan du skriver en ny motor
3. **Dokumentera ordningsmotiveringen** — kommentera varför motor A kommer före motor B
4. **Testa på alla 3 intensitetsnivåer** — `lite` är snabb men inexakt, `ultra` är långsam men precis

---

## Referens: Inbyggda motorer

| Motor-ID             | Staplingsbar | Standardvärde för stackPriority | Mål                                     |
| -------------------- | ------------ | ------------------------------- | --------------------------------------- |
| `lite`               | Ja           | 5                               | meddelanden, verktygsresultat           |
| `rtk`                | Ja           | 10                              | verktygsresultat                        |
| `standard` (caveman) | Ja           | 20                              | meddelanden, verktygsresultat, kodblock |
| `aggressive`         | Ja           | 30                              | meddelanden                             |
| `ultra`              | Ja           | 40                              | meddelanden, kodblock                   |

### Se även

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — Översikt över pipelinen
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — Referens för motorregistret
- [COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md) — Specifikation för regelformatet
- [COMPRESSION_LANGUAGE_PACKS.md](./COMPRESSION_LANGUAGE_PACKS.md) — Information om språkpaket
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — RTK-motor och anpassade filter
- Källa: `open-sse/services/compression/` (117 filer, ~250 kB)
