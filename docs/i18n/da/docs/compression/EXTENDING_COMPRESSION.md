# Extending the Compression Pipeline (Dansk)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/EXTENDING_COMPRESSION.md) · 🇪🇹 [am](../../../am/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇦 [ar](../../../ar/docs/compression/EXTENDING_COMPRESSION.md) · 🇦🇿 [az](../../../az/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇬 [bg](../../../bg/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇩 [bn](../../../bn/docs/compression/EXTENDING_COMPRESSION.md) · 🇨🇿 [cs](../../../cs/docs/compression/EXTENDING_COMPRESSION.md) · 🇩🇪 [de](../../../de/docs/compression/EXTENDING_COMPRESSION.md) · 🇬🇷 [el](../../../el/docs/compression/EXTENDING_COMPRESSION.md) · 🇪🇸 [es](../../../es/docs/compression/EXTENDING_COMPRESSION.md) · 🇪🇪 [et](../../../et/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇷 [fa](../../../fa/docs/compression/EXTENDING_COMPRESSION.md) · 🇫🇮 [fi](../../../fi/docs/compression/EXTENDING_COMPRESSION.md) · 🇫🇷 [fr](../../../fr/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇪 [ga](../../../ga/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [gu](../../../gu/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [ha](../../../ha/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇱 [he](../../../he/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [hi](../../../hi/docs/compression/EXTENDING_COMPRESSION.md) · 🇭🇷 [hr](../../../hr/docs/compression/EXTENDING_COMPRESSION.md) · 🇭🇺 [hu](../../../hu/docs/compression/EXTENDING_COMPRESSION.md) · 🇦🇲 [hy](../../../hy/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇩 [id](../../../id/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [ig](../../../ig/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇹 [it](../../../it/docs/compression/EXTENDING_COMPRESSION.md) · 🇯🇵 [ja](../../../ja/docs/compression/EXTENDING_COMPRESSION.md) · 🇬🇪 [ka](../../../ka/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇭 [km](../../../km/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [kn](../../../kn/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇷 [ko](../../../ko/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇹 [lt](../../../lt/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇻 [lv](../../../lv/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [ml](../../../ml/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [mr](../../../mr/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇾 [ms](../../../ms/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇹 [mt](../../../mt/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇲 [my](../../../my/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇵 [ne](../../../ne/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇱 [nl](../../../nl/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇴 [no](../../../no/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [or](../../../or/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [pa](../../../pa/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇭 [phi](../../../phi/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇱 [pl](../../../pl/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇹 [pt](../../../pt/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇴 [ro](../../../ro/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇺 [ru](../../../ru/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇰 [si](../../../si/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇰 [sk](../../../sk/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇮 [sl](../../../sl/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇸 [sr](../../../sr/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇪 [sv](../../../sv/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇪 [sw](../../../sw/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [ta](../../../ta/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [te](../../../te/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇭 [th](../../../th/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇷 [tr](../../../tr/docs/compression/EXTENDING_COMPRESSION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇰 [ur](../../../ur/docs/compression/EXTENDING_COMPRESSION.md) · 🇺🇿 [uz](../../../uz/docs/compression/EXTENDING_COMPRESSION.md) · 🇻🇳 [vi](../../../vi/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [yo](../../../yo/docs/compression/EXTENDING_COMPRESSION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/EXTENDING_COMPRESSION.md)

---

> **Kort fortalt**: OmniRoutes komprimeringsmotor er **udvidelig** — du kan registrere brugerdefinerede motorer, levere sprogpakker til nye sprog og sammensætte stakkede pipelines. Denne vejledning viser hvordan.

**Relaterede vejledninger:**

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — Fuld oversigt over pipelinen
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — Motorregister og indbyggede motorer
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — RTK-motor og brugerdefinerede filtre
- [COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md) — Reference til regelpakkens format

---

## Oversigt

Komprimeringssystemet har **3 udvidelsespunkter**:

| Udvidelsespunkt           | Anvendelse                                                                               | Sværhedsgrad |
| ------------------------- | ---------------------------------------------------------------------------------------- | ------------ |
| **Brugerdefineret motor** | Tilføj en helt ny komprimeringsalgoritme (f.eks. en domænespecifik opsummeringsfunktion) | Avanceret    |
| **Sprogpakke**            | Tilføj understøttelse af et nyt naturligt sprog (f.eks. hindi eller arabisk)             | Middel       |
| **Stakket pipeline**      | Sammensæt eksisterende motorer i en brugerdefineret rækkefølge                           | Begynder     |

```
┌─────────────────────────────────────────────────────────────┐
│                    Komprimeringsstrategi                     │
│                                                              │
│   Inputmeddelelser ──▶ getEffectiveMode() ──▶ tilstand      │
│                                              │               │
│                      ┌───────────────────────┼──────────┐    │
│                      │         │         │         │    │    │
│                      ▼         ▼         ▼         ▼    │    │
│                   "rtk"    "lite"   "standard" "stacked"    │
│                      │         │         │         │    │    │
│                      ▼         ▼         ▼         ▼    │    │
│                   RTK       Lite     Caveman   engines[]   │
│                   motor     motor    motor     sammenkædet │
│                      │         │         │         │    │    │
│                      └─────────┴─────────┴─────────┘    │    │
│                                      │                    │
│                                      ▼                    │
│                            Komprimeret output              │
└─────────────────────────────────────────────────────────────┘

Strategivælgeren er TILSTANDSBASERET: Hver anmodning vælger ÉN tilstand
(rtk / lite / standard / aggressive / ultra / stacked / off).
Kun tilstanden "stacked" sammenkæder flere motorer sekventielt.
Standardtilstanden for automatisk aktivering er "lite" (ikke en prioriteringskæde med 3 niveauer).
```

---

## Sådan skrives en brugerdefineret komprimeringsmotor

Motorgrænsefladen (`open-sse/services/compression/engines/types.ts`) er den kontrakt, som alle motorer skal opfylde. Den har 5 obligatoriske metoder.

### Grænsefladen `CompressionEngine`

```ts
interface CompressionEngine {
  id: string; // Unikt motor-id
  name: string; // Vist navn
  description: string; // Kort beskrivelse
  icon: string; // Ikon (emoji eller URL)
  targets: CompressionEngineTarget[]; // ["messages", "tool_results", "code_blocks"]
  stackable: boolean; // Kan bruges i en stakket pipeline
  stackPriority: number; // Rækkefølge i stakkede pipelines (lavere = tidligere)
  metadata: CompressionEngineMetadata;

  apply(body, options?): CompressionResult;
  compress(body, config?): CompressionResult;
  getConfigSchema(): EngineConfigField[];
  validateConfig(config): EngineValidationResult;
}
```

### Minimalt eksempel: Whitespace-motor

Den enklest mulige motor — fjern overflødige mellemrum fra meddelelser.

````ts
import type { CompressionEngine } from "omniroute/compression/engines/types";
import { registerCompressionEngine } from "omniroute/compression/engines/registry";

function preserveCodeBlocks(text: string): string {
  // Opdel efter kodeblokmarkører, og bevar mellemrum i dem
  const parts = text.split(/(```[\s\S]*?```)/);
  return parts
    .map((part) => {
      if (part.startsWith("```")) {
        return part; // Rediger ikke kodeblokke
      }
      return part.replace(/\n{3,}/g, "\n\n"); // Anvend kun på prosa
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
  stackPriority: 100, // Kør EFTER caveman/rtk

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

    // Gennemløb beskedarrayet — håndter både streng- og multipart-indhold
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
      // Multipart-indhold: gennemløb delene, og komprimer kun tekstdele
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
          return part; // Bevar image_url, tool_use osv.
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

// Registrer globalt
registerCompressionEngine(whitespaceEngine);
````

### Hvor brugerdefinerede engines skal placeres

```
~/.omniroute/compression/engines/my-engine.ts    # Brugerniveau
<project>/compression-engines/my-engine.ts        # Projektniveau (indlæses ved opstart)
```

Eller indlæs programmatisk fra et plugin:

```ts
// I dit plugin
import {
  registerCompressionEngine,
  unregisterCompressionEngine,
} from "@omniroute/open-sse/services/compression/engines/registry";
import { myEngine } from "./engines/my-engine";

export default definePlugin({
  name: "my-compression-plugin",
  // Plugin-SDK'et eksponerer onRequest-/onResponse-/onError-hooks. Registrer
  // engine'en, når pluginmodulet indlæses (eller ved første onRequest); afregistrer den
  // via din egen nedlukningsrutine.
  onRequest: async (ctx) => {
    registerCompressionEngine(myEngine);
  },
});

// Ved nedlukning:
// unregisterCompressionEngine("my-engine");
```

### Test af din engine

Registrer din engine i et plugin eller en opstartsfunktion. Når den er registreret, vil engine'en være tilgængelig
i strategivælgeren via dens `id`. Test integrationen ved at sammensætte den i en stablet pipeline:

---

## Oprettelse af sprogpakker

Komprimering i hulemandsstil bruger **sprogspecifikke regelpakker** til at håndtere fyldord, forbehold og omstændelige formuleringer på hvert naturligt sprog. OmniRoute leveres med **6 sprogpakker**: `en`, `es`, `fr`, `de`, `ja`, `pt-BR`.

### Pakkestruktur

En sprogpakke er en mappe med **JSON-filer** under `open-sse/services/compression/rules/<language>/`:

```
open-sse/services/compression/rules/
├── en/
│   ├── filler.json          # Høflighedsfraser, forbehold, høflighed
│   ├── context.json         # Regler til reduktion af kontekst
│   ├── dedup.json           # Regler for deduplikering
│   ├── structural.json      # Tegnsætning, formatering
│   └── ultra.json           # Aggressive komprimeringsregler
├── es/  (samme struktur)
├── fr/  (samme struktur)
├── de/  (samme struktur)
├── ja/  (samme struktur)
└── pt-BR/ (samme struktur)
```

### Reglens opbygning

Hver regel har denne struktur (fra `open-sse/services/compression/ruleLoader.ts`):

```ts
interface FileRule {
  name: string; // Menneskeligt læsbart navn (kebab-case)
  pattern: string; // JavaScript-regexmønster
  replacement?: string; // Det, som matchet skal erstattes med
  replacementMap?: Record<string, string>; // ELLER et nøgle→erstatning-map
  flags?: string; // Regex-flag (typisk "gi")
  context?: "all" | "user" | "system" | "assistant";
  category?: "filler" | "context" | "structural" | "dedup" | "terse" | "ultra";
  minIntensity?: "lite" | "full" | "ultra"; // Spring over under denne intensitet
  description?: string; // Dokumentation
}
```

### Eksempel: Tilføjelse af hindi-regler for fyldord

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

Regelpakker valideres mod `_schema.json`, når de indlæses. En pakke med en ugyldig struktur kan ikke indlæses og medfører, at der logges en fejl:

```
RULE_LOADER: pakken "hi/filler.json" kunne ikke valideres:
  - rules.0.pattern: Ugyldigt regulært udtryk
  - rules.1.context: skal være én af [all, user, system, assistant]
```

Valideringen kører automatisk, når en pakke indlæses (mod `_schema.json`); en
ugyldig pakke afvises, og ovenstående fejl logges. Der findes ikke et separat
`npm run`-script til validering af pakker — indlæs pakken (start f.eks. serveren,
eller kør komprimeringsforløbet), og hold øje med loggene.

### Indlæsning af en brugerdefineret sprogpakke

```ts
import { loadRulePack } from "omniroute/compression/ruleLoader";

await loadRulePack("./my-custom-rules/hi/filler.json");
```

Eller placer den på en genkendt placering:

```
~/.omniroute/compression/rules/hi/filler.json  # Brugerniveau
<project>/.compression/rules/hi/filler.json   # Projektniveau
```

### Bedste praksis for sprogpakker

1. **Start med `filler`** — disse regler har størst effekt
2. **Brug `minIntensity`** til at begrænse aggressive regler — det beskytter mod overkomprimering
3. **Medtag testcases** — tilføj et `tests[]`-array i JSON-filen for at verificere adfærden
4. **Rækkefølgen er vigtig** — tidligere regler anvendes først; placer regler med stor effekt først
5. **Vær konservativ med `replacement`** — en tom streng er normalt korrekt; introducer aldrig nyt indhold

### Oversættelsesstrategi

Når regelpakker lokaliseres til et nyt sprog:

1. **Oversæt regelnavnene** — de vises i fejlfindingsoutputtet
2. **Tilpas regexmønstrene** — direkte oversættelse fungerer ofte ikke (ordgrænser varierer)
3. **Test med virkelige samtaler** — pakken skal være sikker at bruge på faktiske input
4. **Tilpas til kulturelle konventioner** — japanske pakker har eksempelvis flere høflighedsrelaterede fyldord end engelske

---

## Stablede pipelines

En **stablet pipeline** kører flere motorer sekventielt, hvor hver motors output sendes videre til den næste. Sådan fungerer `mode: stacked` internt.

### Sådan fungerer stabling

```
Input (10.000 tokens)
        │
        ▼
   ┌──────────┐
   │  Motor   │  prioritet 10
   │  A       │  ──▶ output: 6.000 tokens (-40 %)
   └────┬─────┘
        ▼
   ┌──────────┐
   │  Motor   │  prioritet 50
   │  B       │  ──▶ output: 2.400 tokens (-60 %)
   └────┬─────┘
        ▼
   ┌──────────┐
   │  Motor   │  prioritet 100
   │  C       │  ──▶ output: 1.200 tokens (-80 %)
   └────┬─────┘
        │
        ▼
Endeligt output (1.200 tokens, ~88 % samlet besparelse)
```

Når `mode: "stacked"` er valgt, udføres motorerne sekventielt i den rækkefølge, der er angivet i `pipeline`-arrayet.
Outputtet fra motor N bliver inputtet til motor N+1.

### Komprimeringstilstande

OmniRoute vælger **ÉN tilstand pr. anmodning** baseret på konfiguration, tærskler for automatisk aktivering og kombinationstilsidesættelser.
De tilgængelige tilstande er defineret i `open-sse/services/compression/types.ts` (typen `CompressionMode`):

| Tilstand     | Motorer              | Anvendelse                                                                                                                                                                                                               |
| ------------ | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `off`        | Ingen                | Deaktivér al komprimering                                                                                                                                                                                                |
| `rtk`        | Kun RTK              | Sessioner med meget kommandooutput (80 %+ besparelse)                                                                                                                                                                    |
| `lite`       | Kun Lite             | Konservativ komprimering (hurtig og sikker)                                                                                                                                                                              |
| `standard`   | Caveman              | Komprimering af prosa med sprogpakker                                                                                                                                                                                    |
| `aggressive` | Caveman + Aggressive | Aggressiv komprimering af prosa + aggressiv afsluttende behandling                                                                                                                                                       |
| `ultra`      | Ultra                | Maksimal komprimering (med tab, sidste udvej). Kan valgfrit sendes gennem **LLMLingua-2** SLM-motoren, når `ultra.modelPath` er angivet (falder tilbage til den regelbaserede metode, når modellen ikke er tilgængelig). |
| `stacked`    | Tilpasset pipeline   | Kombiner motorer i vilkårlig rækkefølge (se nedenfor)                                                                                                                                                                    |

> Ud over ovenstående tilstandsmotorer indeholder registreringsdatabasen også specialiserede motorer, der kan stables —
> **CCR**, **headroom**, **ionizer** og **session-dedup** — som er dokumenteret i
> [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md#additional-built-in-engines).

Valget af tilstand bestemmes af `getEffectiveMode()` i `open-sse/services/compression/strategySelector.ts`:

1. Hvis komprimering er deaktiveret: `"off"`
2. Hvis der findes en kombinationstilsidesættelse: Brug tilsidesættelsen
3. Hvis tærsklen for automatisk aktivering overskrides: Brug `autoTriggerMode` (standard: `"lite"`)
4. Ellers: Brug `defaultMode`

### Den stablede standardpipeline

Når `mode: "stacked"` er eksplicit konfigureret, kombinerer standardpipeline følgende:

1. **RTK** — fjerner støj fra kommandooutput (~80 % besparelse på terminaloutput)
2. **Caveman** — fjerner fyldord og gør prosaen mere kortfattet (~46 % af den resterende tekst)
3. **Lite** — afsluttende behandling af mellemrum + fjernelse af dubletter

Denne kombination opnår **78-95 % besparelse** i sessioner med omfattende brug af værktøjer.

### Konfiguration af stablede pipelines

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

Du kan udelade motorer, tilføje tilpassede motorer eller ændre deres rækkefølge.

### Videregivelse af tilstand

Motorer kan læse metadata fra anmodningskonteksten (i `options`):

```ts
compress(body, config) {
  // Læs metadata fra tidligere motorer
  const original = options?.compressionComboId;  // "my-coding-combo"
  // ...
}
```

Metadataene er **skrivebeskyttede** — motorerne kan ikke ændre anmodningskonteksten, kun deres eget body-output.

### Faldgruber ved udførelsesrækkefølgen

| Motorrækkefølge                               | Effekt                                                                                |
| --------------------------------------------- | ------------------------------------------------------------------------------------- |
| RTK → Caveman → Lite                          | **Anbefalet** (fjerner først støj, derefter overflødigt sprog og til sidst mellemrum) |
| Lite → RTK → Caveman                          | Dårlig — Lite fjerner mellemrum fra råt output, så RTK's mønstermatching mislykkes    |
| Caveman → RTK                                 | Dårlig — Caveman kan omskrive tekst på måder, som RTK ikke genkender                  |
| Vilkårlig rækkefølge med `tool_results` først | Bedre — værktøjsoutput er det mest støjende indhold                                   |

### Hvornår du IKKE bør stable

Stabling er ikke altid bedre:

- **Enkle beskeder** (intet værktøjsoutput) — Caveman eller Lite alene er tilstrækkelig
- **Omkostningsfølsomme scenarier** — hver motor tilføjer ~5-50 ms latenstid
- **Specifikke værktøjer** — RTK alene er normalt tilstrækkelig til shell-output

### Opbygning af en tilpasset pipeline

Der findes ikke noget register over navngivne pipelines. En stablet pipeline er blot et **indlejret array
af trin**, der overføres til `applyStackedCompression()` (eksporteret fra
`@omniroute/open-sse/services/compression/strategySelector`):

```ts
import { applyStackedCompression } from "@omniroute/open-sse/services/compression/strategySelector";

const result = applyStackedCompression(body, [
  { engine: "rtk", intensity: "aggressive" },
  { engine: "caveman", intensity: "full" },
]);
```

Når du ikke angiver en pipeline, bruges `rtk(standard) → caveman(full)` som standard.

For at styre den via konfiguration skal du indstille `mode: "stacked"` og angive arrayet af trin under
`stackedPipeline` (læses fra `config.stackedPipeline`):

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

## Politik for synkronisering med upstream

OmniRoutes komprimeringsmotorer krediterer flere upstream-projekter i README
("inspireret af RTK, Caveman, LLMLingua-2, Troglodita"). Et almindeligt spørgsmål
fra bidragydere er: **Når upstream-RTK tilføjer et nyt værktøjsfilter, eller Caveman
tilføjer en regelpakke, hvordan når det så frem til OmniRoute?** Dette afsnit er
det autoritative svar.

### Leverandørkopier kontra uafhængige implementeringer

| Motor                        | Forhold til upstream                                                                                                               | Placering                                                           |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| **RTK**                      | **Uafhængig genimplementering** (inspireret af, ikke en kopi)                                                                      | `open-sse/services/compression/engines/rtk/`                        |
| **Caveman**                  | **Uafhængig genimplementering** (inspireret af)                                                                                    | `open-sse/services/compression/engines/cavemanAdapter.ts`           |
| **Headroom**                 | Primært intern; kun `gcf/`-codec'et er **reelt leverandørkopieret** fra `gcf-typescript` (MIT, SPDX-markeret, kun generisk profil) | `open-sse/services/compression/engines/headroom/gcf/`               |
| **LLMLingua-2 / Troglodita** | Inspireret af (danner grundlag for motorerne `llmlingua` + `session-dedup`)                                                        | `open-sse/services/compression/engines/llmlingua/`, `session-dedup` |

Vigtigt: **RTK og Caveman er clean-room-TypeScript-implementeringer af
_idéerne_ (filterregler, regelpakker), ikke leverandørkopierede kildetræer.** Der
findes ingen upstream-kopi at køre `git pull` fra — hvilket netop er grunden til,
at README siger "inspireret af" i stedet for "inkluderet".

### Sådan flettes upstream-forbedringer ind

Der er **ingen automatisk sporing af upstream-udgivelser og ingen
`compression-sync`-etiket** — helt bevidst. Fordi motorerne er
genimplementeringer, flettes et upstream-RTK-filter eller en Caveman-regelpakke
ikke ind som kode; det **udtrykkes på ny som en ny regel eller et nyt filter i
OmniRoutes eget format** (se
[COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md)) og indarbejdes ad
hoc via en almindelig PR. Udvidelsespunkterne ovenfor (brugerdefineret motor,
sprogpakke, RTK-filter) er den godkendte måde at bidrage med et sådant element på.

Nylige eksempler på netop dette forløb:

- RTK-filtre til build-output fra Gradle og `dotnet` (v3.8.42)
- RTK-filtre til kubectl / docker-build / composer / gh (#2824)
- Caveman-sprogpakke til indonesisk (#3975) samt pakker til tysk / fransk / japansk / kinesisk

### Headroom (proxy til inputkomprimering)

Headroom er **fuldt ud intern** — et fastlåst leverandørkopieret snapshot af
`gcf`-codec'et plus OmniRoutes egne `smartcrusher`- / `toon`- / `tabular`-lag.
Der er ingen aktiv upstream at spore ud over leverandørkopien; opdateringer til
`gcf` opdateres manuelt, når codec'et ændres, og valideres igen i forhold til
kontrollen af komprimeringsbudgettet (`check:compression-budget`).

### Forslag til en upstream-inspireret forbedring

1. **Opret ikke en leverandørkopi** — udtryk upstream-reglen eller -filteret på
   ny i OmniRoutes format.
2. Tilføj det via det tilsvarende udvidelsespunkt nedenfor (sprogpakke,
   RTK-filter eller brugerdefineret motor).
3. Henvis til upstream-projektet i PR-beskrivelsen (kreditering) i stedet for at
   kopiere dets licensomfattede kildekode.
4. Medtag tests, og bekræft, at kontrollen `check:compression-budget` stadig
   gennemføres.

---

## Tilføjelse af en outputstil

Outputstile (se [guidens katalogtabel](./COMPRESSION_GUIDE.md#output-styles-catalog))
er modsvarigheden på outputsiden til inputmotorerne: I stedet for at komprimere det, du
sender, instruerer de modellen i at producere billigere output. Registret er
`OUTPUT_STYLE_CATALOG` i `open-sse/services/compression/outputStyles/catalog.ts`, og
**én katalogpost udgør hele funktionen**: injektoren, indstillingspanelet i dashboardet,
persistens og telemetri gennemgår alle kataloget — der er ingen anden liste, der skal opdateres.

1. **Tilføj én post til `OUTPUT_STYLE_CATALOG`** med `id`, `label`, `description` og de
   tre engelske `levels` (`lite`, `full`, `ultra`). Hvert niveau skal slutte med
   `${SHARED_BOUNDARIES}`, så kode, stier, kommandoer, fejl og URL'er forbliver ordrette.
   Instruktionsteksten skal være **statisk og deterministisk** for hver
   `(id, level, language)` — `${SHARED_BOUNDARIES}` er den eneste tilladte interpolation.
2. **Oversæt den.** Medtag som minimum en `pt-BR`-blok under `i18n`; `ponytail` og
   `i-have-adhd` (en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi) er referencestrukturen. En bevidst
   enkeltsproget stil angiver i stedet `locale` (som `terse-cjk` → `zh`) og tilbydes
   derefter kun under den pågældende landestandard.
3. **Opdater matrixkontrollen** — føj stilens sprog til `BASELINE_LANGUAGES` i
   `tests/unit/compression/output-styles-i18n-matrix.test.ts`. Kontrollen afviser enhver ny
   stil, der ikke er begrænset af en landestandard, og som mangler de påkrævede oversættelser,
   medmindre den har en eksplicit `KNOWN_ENGLISH_ONLY`-post med en sporingsopgave.
4. **Tilføj en test pr. stil** baseret på
   `tests/unit/compression/i-have-adhd-catalog.test.ts`: katalogstruktur, grænseklausul
   pr. niveau og en kontrol, der bekræfter, at hver oversættelse er skrevet på sit eget
   sprog frem for at være kopieret fra engelsk.
5. **Kreditering**: Hvis stilen er tilpasset fra et eksternt projekt, skal det krediteres i en
   kildekommentar ved posten (f.eks. `i-have-adhd` → ayghri/i-have-adhd, MIT) — samme
   regel som i "Forslag til en upstream-inspireret forbedring" ovenfor.

Der er ikke behov for ændringer af brugergrænsefladen, skemaet eller telemetrien — disse flader gengives ud fra kataloget.

---

## Bedste praksis

### Udvikling af motorer

1. **Implementer altid `validateConfig`** — motorer uden validering medfører skjulte fejl
2. **Angiv en realistisk `targetLatencyMs`** — bruges af strategivælgeren til at vælge motorer
3. **Brug `getConfigSchema` til dashboardet** — skjul aldrig konfigurationen for brugerne
4. **Understøt `stackable: true`, hvis din motor er ren** — motorer med bivirkninger bør ikke stables
5. **Skriv indlejrede tests** — motorer skal kunne verificeres på <1s

### Udvikling af sprogpakker

1. **Start med intensiteten `lite`** — dine regler bør være sikre ved den laveste indstilling
2. **Brug `context` til at afgrænse regler** — regler, der kun gælder for `user`, kan ikke utilsigtet påvirke systemprompter
3. **Undgå at matche JSON-nøgler** — `\\bword\\b` kan matche inde i JSON og ødelægge strukturerede data
4. **Test med grænsetilfælde** — tomt input, Unicode, RTL-tekst og emojis
5. **Brug eksisterende pakker som skabeloner** — `en/filler.json` er det mest veludviklede eksempel

### Design af pipelines

1. **Profilér før optimering** — mål først med `compression_stats`
2. **Foretræk komposition frem for genimplementering** — udvid Caveman-regler, før du skriver en ny motor
3. **Dokumentér begrundelsen for rækkefølgen** — kommentér, hvorfor motor A kommer før motor B
4. **Test ved alle 3 intensitetsniveauer** — `lite` er hurtig, men upræcis; `ultra` er langsom, men præcis

---

## Reference: Indbyggede engines

| Engine-ID            | Kan stables | Standard-stackPriority | Mål                                      |
| -------------------- | ----------- | ---------------------- | ---------------------------------------- |
| `lite`               | Ja          | 5                      | beskeder, værktøjsresultater             |
| `rtk`                | Ja          | 10                     | værktøjsresultater                       |
| `standard` (caveman) | Ja          | 20                     | beskeder, værktøjsresultater, kodeblokke |
| `aggressive`         | Ja          | 30                     | beskeder                                 |
| `ultra`              | Ja          | 40                     | beskeder, kodeblokke                     |

### Se også

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — Oversigt over pipelinen
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — Reference til engine-registret
- [COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md) — Specifikation af regelformatet
- [COMPRESSION_LANGUAGE_PACKS.md](./COMPRESSION_LANGUAGE_PACKS.md) — Detaljer om sprogpakker
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — RTK-engine og brugerdefinerede filtre
- Kilde: `open-sse/services/compression/` (117 filer, ~250 KB)
