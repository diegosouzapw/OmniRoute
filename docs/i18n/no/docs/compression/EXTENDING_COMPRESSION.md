# Extending the Compression Pipeline (Norsk)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/EXTENDING_COMPRESSION.md) · 🇪🇹 [am](../../../am/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇦 [ar](../../../ar/docs/compression/EXTENDING_COMPRESSION.md) · 🇦🇿 [az](../../../az/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇬 [bg](../../../bg/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇩 [bn](../../../bn/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇦 [bs](../../../bs/docs/compression/EXTENDING_COMPRESSION.md) · 🇨🇿 [cs](../../../cs/docs/compression/EXTENDING_COMPRESSION.md) · 🇩🇰 [da](../../../da/docs/compression/EXTENDING_COMPRESSION.md) · 🇩🇪 [de](../../../de/docs/compression/EXTENDING_COMPRESSION.md) · 🇬🇷 [el](../../../el/docs/compression/EXTENDING_COMPRESSION.md) · 🇪🇸 [es](../../../es/docs/compression/EXTENDING_COMPRESSION.md) · 🇪🇪 [et](../../../et/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇷 [fa](../../../fa/docs/compression/EXTENDING_COMPRESSION.md) · 🇫🇮 [fi](../../../fi/docs/compression/EXTENDING_COMPRESSION.md) · 🇫🇷 [fr](../../../fr/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇪 [ga](../../../ga/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [gu](../../../gu/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [ha](../../../ha/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇱 [he](../../../he/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [hi](../../../hi/docs/compression/EXTENDING_COMPRESSION.md) · 🇭🇷 [hr](../../../hr/docs/compression/EXTENDING_COMPRESSION.md) · 🇭🇺 [hu](../../../hu/docs/compression/EXTENDING_COMPRESSION.md) · 🇦🇲 [hy](../../../hy/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇩 [id](../../../id/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [ig](../../../ig/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇹 [it](../../../it/docs/compression/EXTENDING_COMPRESSION.md) · 🇯🇵 [ja](../../../ja/docs/compression/EXTENDING_COMPRESSION.md) · 🇬🇪 [ka](../../../ka/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇭 [km](../../../km/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [kn](../../../kn/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇷 [ko](../../../ko/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇹 [lt](../../../lt/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇻 [lv](../../../lv/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [ml](../../../ml/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [mr](../../../mr/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇾 [ms](../../../ms/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇹 [mt](../../../mt/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇲 [my](../../../my/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇵 [ne](../../../ne/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇱 [nl](../../../nl/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [or](../../../or/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [pa](../../../pa/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇭 [phi](../../../phi/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇱 [pl](../../../pl/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇹 [pt](../../../pt/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇴 [ro](../../../ro/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇺 [ru](../../../ru/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇰 [si](../../../si/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇰 [sk](../../../sk/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇮 [sl](../../../sl/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇸 [sr](../../../sr/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇪 [sv](../../../sv/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇪 [sw](../../../sw/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [ta](../../../ta/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [te](../../../te/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇭 [th](../../../th/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇷 [tr](../../../tr/docs/compression/EXTENDING_COMPRESSION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇰 [ur](../../../ur/docs/compression/EXTENDING_COMPRESSION.md) · 🇺🇿 [uz](../../../uz/docs/compression/EXTENDING_COMPRESSION.md) · 🇻🇳 [vi](../../../vi/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [yo](../../../yo/docs/compression/EXTENDING_COMPRESSION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/EXTENDING_COMPRESSION.md)

---

> **Kort fortalt**: OmniRoutes komprimeringsmotor er **utvidbar** — du kan registrere egendefinerte motorer, levere språkpakker for nye språk og sette sammen stablede behandlingskjeder. Denne veiledningen viser hvordan.

**Relaterte veiledninger:**

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — Fullstendig oversikt over behandlingskjeden
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — Motorregister og innebygde motorer
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — RTK-motoren og egendefinerte filtre
- [COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md) — Referanse for regelpakkeformatet

---

## Oversikt

Komprimeringssystemet har **3 utvidelsespunkter**:

| Utvidelsespunkt              | Bruksområde                                                                      | Vanskelighetsgrad |
| ---------------------------- | -------------------------------------------------------------------------------- | ----------------- |
| **Egendefinert motor**       | Legg til en helt ny komprimeringsalgoritme (f.eks. domenespesifikk oppsummering) | Avansert          |
| **Språkpakke**               | Legg til støtte for et nytt naturlig språk (f.eks. hindi eller arabisk)          | Middels           |
| **Stablet behandlingskjede** | Sett sammen eksisterende motorer i en egendefinert rekkefølge                    | Nybegynner        |

```
┌─────────────────────────────────────────────────────────────┐
│                   Komprimeringsstrategi                      │
│                                                              │
│   Inndata-meldinger ──▶ getEffectiveMode() ──▶ modus        │
│                                              │               │
│                      ┌───────────────────────┼──────────┐    │
│                      │         │         │         │    │    │
│                      ▼         ▼         ▼         ▼    │    │
│                   "rtk"    "lite"   "standard" "stacked"    │
│                      │         │         │         │    │    │
│                      ▼         ▼         ▼         ▼    │    │
│                   RTK       Lite     Caveman   engines[]   │
│                   motor     motor    motor     kjedet      │
│                      │         │         │         │    │    │
│                      └─────────┴─────────┴─────────┘    │    │
│                                      │                    │
│                                      ▼                    │
│                            Komprimert utdata               │
└─────────────────────────────────────────────────────────────┘

Strategivelgeren er MODUSBASERT: Hver forespørsel velger ÉN modus
(rtk / lite / standard / aggressive / ultra / stacked / off).
Bare modusen "stacked" kjeder flere motorer sekvensielt.
Standardmodus for automatisk aktivering er "lite" (ikke en prioritetskjede med 3 nivåer).
```

---

## Slik skriver du en egendefinert komprimeringsmotor

Motorgrensesnittet (`open-sse/services/compression/engines/types.ts`) er kontrakten alle motorer må oppfylle. Det har 5 obligatoriske metoder.

### Grensesnittet `CompressionEngine`

```ts
interface CompressionEngine {
  id: string; // Unik motor-ID
  name: string; // Visningsnavn
  description: string; // Kort beskrivelse
  icon: string; // Ikon (emoji eller URL)
  targets: CompressionEngineTarget[]; // ["messages", "tool_results", "code_blocks"]
  stackable: boolean; // Kan brukes i en stablet behandlingskjede
  stackPriority: number; // Rekkefølge i stablede behandlingskjeder (lavere = tidligere)
  metadata: CompressionEngineMetadata;

  apply(body, options?): CompressionResult;
  compress(body, config?): CompressionResult;
  getConfigSchema(): EngineConfigField[];
  validateConfig(config): EngineValidationResult;
}
```

### Minimalt eksempel: mellomromsmotor

Den enklest mulige motoren — fjern overflødige mellomrom fra meldinger.

````ts
import type { CompressionEngine } from "omniroute/compression/engines/types";
import { registerCompressionEngine } from "omniroute/compression/engines/registry";

function preserveCodeBlocks(text: string): string {
  // Del opp etter kodeblokkmarkører og bevar mellomrom inni dem
  const parts = text.split(/(```[\s\S]*?```)/);
  return parts
    .map((part) => {
      if (part.startsWith("```")) {
        return part; // Ikke endre kodeblokker
      }
      return part.replace(/\n{3,}/g, "\n\n"); // Bruk bare på prosa
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
  stackPriority: 100, // Kjør ETTER caveman/rtk

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

    // Gå gjennom meldingsmatrisen — håndter både strenginnhold og flerdelt innhold
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
      // Flerdelt innhold: gå gjennom delene, komprimer bare tekstdeler
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
          return part; // bevar image_url, tool_use osv.
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

### Hvor egendefinerte motorer skal plasseres

```
~/.omniroute/compression/engines/my-engine.ts    # Brukernivå
<project>/compression-engines/my-engine.ts        # Prosjektnivå (lastes ved oppstart)
```

Eller last dem inn programmatisk fra et programtillegg:

```ts
// I programtillegget ditt
import {
  registerCompressionEngine,
  unregisterCompressionEngine,
} from "@omniroute/open-sse/services/compression/engines/registry";
import { myEngine } from "./engines/my-engine";

export default definePlugin({
  name: "my-compression-plugin",
  // Programtilleggets SDK tilbyr onRequest-/onResponse-/onError-kroker. Registrer
  // motoren når programtilleggsmodulen lastes inn (eller ved første onRequest); avregistrer den
  // via din egen nedstengingsrutine.
  onRequest: async (ctx) => {
    registerCompressionEngine(myEngine);
  },
});

// Ved nedstenging:
// unregisterCompressionEngine("my-engine");
```

### Testing av motoren din

Registrer motoren din i et programtillegg eller en oppstartsfunksjon. Når den er registrert, blir motoren tilgjengelig
i strategivelgeren via sin `id`. Test integrasjonen ved å sette den sammen i en stablet behandlingskjede:

---

## Opprette språkpakker

Komprimering i Caveman-stil bruker **språkspesifikke regelpakker** for å håndtere fyllord, forbehold og ordrike mønstre i hvert naturlige språk. OmniRoute leveres med **6 språkpakker**: `en`, `es`, `fr`, `de`, `ja`, `pt-BR`.

### Pakkestruktur

En språkpakke er en katalog med **JSON-filer** under `open-sse/services/compression/rules/<language>/`:

```
open-sse/services/compression/rules/
├── en/
│   ├── filler.json          # Høflighetsfraser, forbehold, høflighet
│   ├── context.json         # Regler for kontekstreduksjon
│   ├── dedup.json           # Regler for deduplisering
│   ├── structural.json      # Tegnsetting, formatering
│   └── ultra.json           # Regler for aggressiv komprimering
├── es/  (samme struktur)
├── fr/  (samme struktur)
├── de/  (samme struktur)
├── ja/  (samme struktur)
└── pt-BR/ (samme struktur)
```

### Oppbygning av regler

Hver regel har denne formen (fra `open-sse/services/compression/ruleLoader.ts`):

```ts
interface FileRule {
  name: string; // Menneskelesbart navn (kebab-case)
  pattern: string; // JavaScript-regexmønster
  replacement?: string; // Hva treffet skal erstattes med
  replacementMap?: Record<string, string>; // ELLER et nøkkel→erstatning-kart
  flags?: string; // Regex-flagg (vanligvis "gi")
  context?: "all" | "user" | "system" | "assistant";
  category?: "filler" | "context" | "structural" | "dedup" | "terse" | "ultra";
  minIntensity?: "lite" | "full" | "ultra"; // Hopp over under denne intensiteten
  description?: string; // Dokumentasjon
}
```

### Eksempel: Legge til regler for hindi-fyllord

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

Regelpakker valideres mot `_schema.json` ved innlasting. En pakke med feil struktur kan ikke lastes inn, og en feil logges:

```
RULE_LOADER: pack "hi/filler.json" failed validation:
  - rules.0.pattern: Invalid regex
  - rules.1.context: must be one of [all, user, system, assistant]
```

Valideringen kjøres automatisk når en pakke lastes inn (mot `_schema.json`); en
ugyldig pakke avvises, og feilen ovenfor logges. Det finnes ikke noe eget
`npm run`-skript for pakkevalidering — last inn pakken (f.eks. ved å starte serveren eller
kjøre gjennom komprimeringsflyten), og følg med på loggene.

### Laste inn en egendefinert språkpakke

```ts
import { loadRulePack } from "omniroute/compression/ruleLoader";

await loadRulePack("./my-custom-rules/hi/filler.json");
```

Eller plasser den på en gjenkjent plassering:

```
~/.omniroute/compression/rules/hi/filler.json  # På brukernivå
<project>/.compression/rules/hi/filler.json   # På prosjektnivå
```

### Anbefalte fremgangsmåter for språkpakker

1. **Begynn med `filler`** — dette er reglene med størst effekt
2. **Bruk `minIntensity`** til å begrense aggressive regler — dette beskytter mot overkomprimering
3. **Inkluder testtilfeller** — legg til en `tests[]`-matrise i JSON-filen for å verifisere virkemåten
4. **Rekkefølgen er viktig** — tidligere regler brukes først; plasser regler med stor effekt først
5. **Vær konservativ med `replacement`** — en tom streng er vanligvis riktig; introduser aldri nytt innhold

### Oversettelsesstrategi

Ved lokalisering av regelpakker til et nytt språk:

1. **Oversett regelnavnene** — de vises i feilsøkingsutdata
2. **Tilpass regexmønstrene** — direkte oversettelse fungerer ofte ikke (ordgrenser varierer)
3. **Test mot virkelige samtaler** — pakken bør være trygg å bruke på faktiske inndata
4. **Ta hensyn til kulturelle konvensjoner** — japanske pakker har for eksempel flere høflige fyllord enn engelske

---

## Stablede pipelines

En **stablet pipeline** kjører flere motorer i sekvens, der utdataene fra hver motor sendes videre til den neste. Det er slik `mode: stacked` fungerer internt.

### Slik fungerer stabling

```
Inndata (10 000 tokener)
        │
        ▼
   ┌──────────┐
   │  Motor   │  prioritet 10
   │  A       │  ──▶ utdata: 6 000 tokener (-40 %)
   └────┬─────┘
        ▼
   ┌──────────┐
   │  Motor   │  prioritet 50
   │  B       │  ──▶ utdata: 2 400 tokener (-60 %)
   └────┬─────┘
        ▼
   ┌──────────┐
   │  Motor   │  prioritet 100
   │  C       │  ──▶ utdata: 1 200 tokener (-80 %)
   └────┬─────┘
        │
        ▼
Endelige utdata (1 200 tokener, ~88 % samlet besparelse)
```

Når `mode: "stacked"` er valgt, kjøres motorene sekvensielt i rekkefølgen som er angitt i `pipeline`-matrisen.
Utdataene fra motor N blir inndataene til motor N+1.

### Komprimeringsmoduser

OmniRoute velger **ÉN modus per forespørsel** basert på konfigurasjon, terskler for automatisk aktivering og kombinasjonsoverstyringer.
De tilgjengelige modusene er definert i `open-sse/services/compression/types.ts` (typen `CompressionMode`):

| Modus        | Motorer               | Bruksområde                                                                                                                                                                                                         |
| ------------ | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `off`        | Ingen                 | Deaktiver all komprimering                                                                                                                                                                                          |
| `rtk`        | Kun RTK               | Økter med mye kommandoutdata (80 %+ besparelse)                                                                                                                                                                     |
| `lite`       | Kun Lite              | Konservativ komprimering (rask, trygg)                                                                                                                                                                              |
| `standard`   | Caveman               | Komprimering av prosa med språkpakker                                                                                                                                                                               |
| `aggressive` | Caveman + Aggressive  | Aggressiv komprimering av prosa + aggressiv sluttbehandling                                                                                                                                                         |
| `ultra`      | Ultra                 | Maksimal komprimering (med tap, siste utvei). Kan valgfritt rutes gjennom SLM-motoren **LLMLingua-2** når `ultra.modelPath` er angitt (går tilbake til den regelbaserte metoden når modellen ikke er tilgjengelig). |
| `stacked`    | Egendefinert pipeline | Sett sammen motorer i valgfri rekkefølge (se nedenfor)                                                                                                                                                              |

> I tillegg til modusmotorene ovenfor inneholder registeret også spesialiserte motorer som kan stables —
> **CCR**, **headroom**, **ionizer** og **session-dedup** — dokumentert i
> [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md#additional-built-in-engines).

Modusvalget bestemmes av `getEffectiveMode()` i `open-sse/services/compression/strategySelector.ts`:

1. Hvis komprimering er deaktivert: `"off"`
2. Hvis det finnes en kombinasjonsoverstyring: bruk overstyringen
3. Hvis terskelen for automatisk aktivering overskrides: bruk `autoTriggerMode` (standard: `"lite"`)
4. Ellers: bruk `defaultMode`

### Den stablede standardpipelinen

Når `mode: "stacked"` er eksplisitt konfigurert, setter standardpipelinen sammen:

1. **RTK** — fjern støy fra kommandoutdata (~80 % besparelse på terminalutdata)
2. **Caveman** — fjern fyllord og gjør prosaen mer kortfattet (~46 % av den gjenværende teksten)
3. **Lite** — avsluttende behandling av blanktegn + deduplisering

Denne sammensetningen gir **78–95 % besparelse** i økter med mye verktøybruk.

### Konfigurere stablede pipelines

I kombinasjonskonfigurasjonen:

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

Du kan utelate motorer, legge til egendefinerte motorer eller endre rekkefølgen.

### Overføring av tilstand

Motorer kan lese metadata fra forespørselskonteksten (i `options`):

```ts
compress(body, config) {
  // Les metadata fra tidligere motorer
  const original = options?.compressionComboId;  // "my-coding-combo"
  // ...
}
```

Metadataene er **skrivebeskyttet** — motorene kan ikke endre forespørselskonteksten, bare sine egne utdata.

### Fallgruver ved kjøringsrekkefølge

| Motorrekkefølge                            | Effekt                                                                                   |
| ------------------------------------------ | ---------------------------------------------------------------------------------------- |
| RTK → Caveman → Lite                       | **Anbefalt** (fjerner først støy, deretter språk og til slutt blanktegn)                 |
| Lite → RTK → Caveman                       | Dårlig — Lite fjerner blanktegn fra råutdata, slik at RTKs mønstergjenkjenning mislykkes |
| Caveman → RTK                              | Dårlig — Caveman kan omskrive tekst på måter som RTK ikke gjenkjenner                    |
| Enhver rekkefølge med `tool_results` først | Bedre — verktøyutdata er det mest støyende innholdet                                     |

### Når du IKKE bør stable

Stabling er ikke alltid bedre:

- **Enkle meldinger** (ingen verktøyutdata) — bare Caveman eller Lite er tilstrekkelig
- **Kostnadssensitiv bruk** — hver motor legger til ~5–50 ms ventetid
- **Spesifikke verktøy** — RTK alene er vanligvis tilstrekkelig for shell-utdata

### Bygge en egendefinert pipeline

Det finnes ikke noe register for navngitte pipelines. En stablet pipeline er bare en **innebygd matrise
med trinn** som sendes til `applyStackedCompression()` (eksportert fra
`@omniroute/open-sse/services/compression/strategySelector`):

```ts
import { applyStackedCompression } from "@omniroute/open-sse/services/compression/strategySelector";

const result = applyStackedCompression(body, [
  { engine: "rtk", intensity: "aggressive" },
  { engine: "caveman", intensity: "full" },
]);
```

Når du ikke angir en pipeline, brukes `rtk(standard) → caveman(full)` som standard.

For å styre dette fra konfigurasjonen setter du `mode: "stacked"` og angir trinnmatrisen under
`stackedPipeline` (lest fra `config.stackedPipeline`):

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

## Retningslinjer for synkronisering med oppstrømsprosjekter

OmniRoutes komprimeringsmotorer krediterer flere oppstrømsprosjekter i README-filen
(«inspirert av RTK, Caveman, LLMLingua-2, Troglodita»). Et vanlig spørsmål fra
bidragsytere er: **Når oppstrømsprosjektet RTK legger til et nytt verktøyfilter eller
Caveman legger til en regelpakke, hvordan når dette OmniRoute?** Denne delen gir
det autoritative svaret.

### Inkluderte kopier kontra uavhengige implementasjoner

| Motor                        | Forhold til oppstrømsprosjektet                                                                                                | Plassering                                                          |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------- |
| **RTK**                      | **Uavhengig nyimplementasjon** (inspirert av, ikke en kopi)                                                                    | `open-sse/services/compression/engines/rtk/`                        |
| **Caveman**                  | **Uavhengig nyimplementasjon** (inspirert av)                                                                                  | `open-sse/services/compression/engines/cavemanAdapter.ts`           |
| **Headroom**                 | Hovedsakelig intern; bare `gcf/`-kodeken er **faktisk inkludert** fra `gcf-typescript` (MIT, SPDX-merket, kun generisk profil) | `open-sse/services/compression/engines/headroom/gcf/`               |
| **LLMLingua-2 / Troglodita** | Inspirert av (danner grunnlaget for motorene `llmlingua` + `session-dedup`)                                                    | `open-sse/services/compression/engines/llmlingua/`, `session-dedup` |

Hovedpoenget: **RTK og Caveman er uavhengige TypeScript-implementasjoner fra bunnen
av av _ideene_ (filterregler, regelpakker), ikke inkluderte kopier av kildekodetrær.**
Det finnes ingen oppstrømskopi å kjøre `git pull` fra – og det er nettopp derfor
README-filen sier «inspirert av» i stedet for «inkludert».

### Slik flettes forbedringer fra oppstrømsprosjekter inn

Det finnes **ingen automatisert sporing av oppstrømsutgivelser og ingen
`compression-sync`-etikett** – dette er tilsiktet. Fordi motorene er
nyimplementasjoner, flettes ikke et RTK-filter eller en Caveman-regelpakke fra et
oppstrømsprosjekt inn som kode; den **uttrykkes på nytt som en ny regel eller et
nytt filter i OmniRoutes eget format** (se
[COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md)) og tas inn ad hoc via
en vanlig PR. Utvidelsespunktene ovenfor (egendefinert motor, språkpakke, RTK-filter)
er de godkjente måtene å bidra med en slik forbedring på.

Nylige eksempler på akkurat denne flyten:

- RTK-filtre for byggutdata fra Gradle og `dotnet` (v3.8.42)
- RTK-filtre for kubectl / docker-build / composer / gh (#2824)
- Indonesisk språkpakke for Caveman (#3975), i tillegg til tyske / franske / japanske / kinesiske pakker

### Headroom (proxy for inndatakomprimering)

Headroom er **helt intern** – et fastlåst, inkludert øyeblikksbilde av `gcf`-kodeken
sammen med OmniRoutes egne `smartcrusher`- / `toon`- / `tabular`-lag. Det finnes
ingen aktiv oppstrømskilde å spore utover den inkluderte kopien; oppdateringer av
`gcf` utføres manuelt når kodeken endres, og valideres på nytt mot kontrollen for
komprimeringsbudsjettet (`check:compression-budget`).

### Slik foreslår du en forbedring inspirert av et oppstrømsprosjekt

1. **Ikke inkluder en kopi** – uttrykk oppstrømsregelen eller -filteret på nytt i OmniRoutes format.
2. Legg det til via det samsvarende utvidelsespunktet nedenfor (språkpakke, RTK-filter
   eller egendefinert motor).
3. Henvis til oppstrømsprosjektet i PR-beskrivelsen (kreditering), i stedet for å
   kopiere den lisensbelagte kildekoden.
4. Inkluder tester, og bekreft at kontrollen `check:compression-budget` fortsatt består.

---

## Legge til en utdatastil

Utdatastiler (se [katalogtabellen i veiledningen](./COMPRESSION_GUIDE.md#output-styles-catalog))
er motsatsen på responssiden til inndatamotorene: I stedet for å komprimere det du
sender, instruerer de modellen om å produsere rimeligere utdata. Registeret er
`OUTPUT_STYLE_CATALOG` i `open-sse/services/compression/outputStyles/catalog.ts`, og
**én katalogoppføring utgjør hele funksjonen**: injektoren, innstillingspanelet i kontrollpanelet,
persistens og telemetri går alle gjennom katalogen — det finnes ingen annen liste som må oppdateres.

1. **Legg til én oppføring i `OUTPUT_STYLE_CATALOG`** med `id`, `label`, `description` og de
   tre engelske `levels` (`lite`, `full`, `ultra`). Hvert nivå må avsluttes med
   `${SHARED_BOUNDARIES}`, slik at kode, stier, kommandoer, feil og URL-er beholdes ordrett.
   Instruksjonsteksten må være **statisk og deterministisk** for hver
   `(id, level, language)` — `${SHARED_BOUNDARIES}` er den eneste tillatte interpoleringen.
2. **Oversett den.** Lever minst en `pt-BR`-blokk under `i18n`; `ponytail` og
   `i-have-adhd` (en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi) er referanseformen. En stil som bevisst
   er begrenset til ett språk, angir `locale` i stedet (som `terse-cjk` → `zh`) og tilbys da
   bare for denne språkinnstillingen.
3. **Oppdater matrisevernet** — legg til stilens språk i `BASELINE_LANGUAGES` i
   `tests/unit/compression/output-styles-i18n-matrix.test.ts`. Kontrollen avviser alle nye
   stiler som ikke er avgrenset etter språkinnstilling og mangler de nødvendige oversettelsene, med mindre de har en
   eksplisitt `KNOWN_ENGLISH_ONLY`-oppføring med en sporingssak.
4. **Legg til en test for stilen** etter mønster fra
   `tests/unit/compression/i-have-adhd-catalog.test.ts`: katalogstruktur, grenseklausul
   per nivå og en kontroll som bekrefter at hver oversettelse er skrevet på sitt eget
   språk i stedet for å være kopiert fra engelsk.
5. **Kreditering**: Hvis stilen er tilpasset fra et oppstrømsprosjekt, skal prosjektet krediteres i en
   kildekommentar ved oppføringen (f.eks. `i-have-adhd` → ayghri/i-have-adhd, MIT) — samme
   regel som i «Foreslå en oppstrømsinspirert forbedring» ovenfor.

Ingen endringer i brukergrensesnitt, skjema eller telemetri er nødvendig — disse delene gjengis fra katalogen.

---

## Anbefalte fremgangsmåter

### Motorutvikling

1. **Implementer alltid `validateConfig`** — motorer uten validering fører til stille feil
2. **Angi en realistisk `targetLatencyMs`** — brukes av strategivelgeren til å velge motorer
3. **Bruk `getConfigSchema` for kontrollpanelet** — skjul aldri konfigurasjon for brukerne
4. **Støtt `stackable: true` hvis motoren din er ren** — motorer med bivirkninger bør ikke stables
5. **Skriv innebygde tester** — motorer bør kunne verifiseres på <1s

### Utvikling av språkpakker

1. **Start med intensiteten `lite`** — reglene dine bør være trygge på den laveste innstillingen
2. **Bruk `context` til å avgrense regler** — regler som bare gjelder `user`, kan ikke utilsiktet påvirke systeminstruksjoner
3. **Unngå å fange JSON-nøkler** — `\\bword\\b` kan samsvare inne i JSON og ødelegge strukturerte data
4. **Test med grensetilfeller** — tom inndata, Unicode, RTL-tekst, emojier
5. **Bruk eksisterende pakker som maler** — `en/filler.json` er det mest gjennomarbeidede eksemplet

### Utforming av kjeder

1. **Profiler før du optimaliserer** — mål først med `compression_stats`
2. **Foretrekk sammensetning fremfor nyimplementering** — utvid Caveman-regler før du skriver en ny motor
3. **Dokumenter begrunnelsen for rekkefølgen** — kommenter hvorfor motor A kommer før motor B
4. **Test på alle de tre intensitetsnivåene** — `lite` er rask, men upresis, `ultra` er treg, men presis

---

## Referanse: Innebygde motorer

| Motor-ID             | Kan stables | Standard stackPriority | Mål                                       |
| -------------------- | ----------- | ---------------------- | ----------------------------------------- |
| `lite`               | Ja          | 5                      | meldinger, verktøyresultater              |
| `rtk`                | Ja          | 10                     | verktøyresultater                         |
| `standard` (caveman) | Ja          | 20                     | meldinger, verktøyresultater, kodeblokker |
| `aggressive`         | Ja          | 30                     | meldinger                                 |
| `ultra`              | Ja          | 40                     | meldinger, kodeblokker                    |

### Se også

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — Oversikt over prosesseringskjeden
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — Referanse for motorregisteret
- [COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md) — Spesifikasjon for regelformatet
- [COMPRESSION_LANGUAGE_PACKS.md](./COMPRESSION_LANGUAGE_PACKS.md) — Detaljer om språkpakker
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — RTK-motoren og egendefinerte filtre
- Kilde: `open-sse/services/compression/` (117 filer, ~250KB)
