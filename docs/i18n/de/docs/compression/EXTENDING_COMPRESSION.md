# Extending the Compression Pipeline (Deutsch)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/EXTENDING_COMPRESSION.md) · 🇪🇹 [am](../../../am/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇦 [ar](../../../ar/docs/compression/EXTENDING_COMPRESSION.md) · 🇦🇿 [az](../../../az/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇬 [bg](../../../bg/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇩 [bn](../../../bn/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇦 [bs](../../../bs/docs/compression/EXTENDING_COMPRESSION.md) · 🇨🇿 [cs](../../../cs/docs/compression/EXTENDING_COMPRESSION.md) · 🇩🇰 [da](../../../da/docs/compression/EXTENDING_COMPRESSION.md) · 🇬🇷 [el](../../../el/docs/compression/EXTENDING_COMPRESSION.md) · 🇪🇸 [es](../../../es/docs/compression/EXTENDING_COMPRESSION.md) · 🇪🇪 [et](../../../et/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇷 [fa](../../../fa/docs/compression/EXTENDING_COMPRESSION.md) · 🇫🇮 [fi](../../../fi/docs/compression/EXTENDING_COMPRESSION.md) · 🇫🇷 [fr](../../../fr/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇪 [ga](../../../ga/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [gu](../../../gu/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [ha](../../../ha/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇱 [he](../../../he/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [hi](../../../hi/docs/compression/EXTENDING_COMPRESSION.md) · 🇭🇷 [hr](../../../hr/docs/compression/EXTENDING_COMPRESSION.md) · 🇭🇺 [hu](../../../hu/docs/compression/EXTENDING_COMPRESSION.md) · 🇦🇲 [hy](../../../hy/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇩 [id](../../../id/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [ig](../../../ig/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇹 [it](../../../it/docs/compression/EXTENDING_COMPRESSION.md) · 🇯🇵 [ja](../../../ja/docs/compression/EXTENDING_COMPRESSION.md) · 🇬🇪 [ka](../../../ka/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇭 [km](../../../km/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [kn](../../../kn/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇷 [ko](../../../ko/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇹 [lt](../../../lt/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇻 [lv](../../../lv/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [ml](../../../ml/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [mr](../../../mr/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇾 [ms](../../../ms/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇹 [mt](../../../mt/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇲 [my](../../../my/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇵 [ne](../../../ne/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇱 [nl](../../../nl/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇴 [no](../../../no/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [or](../../../or/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [pa](../../../pa/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇭 [phi](../../../phi/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇱 [pl](../../../pl/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇹 [pt](../../../pt/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇴 [ro](../../../ro/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇺 [ru](../../../ru/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇰 [si](../../../si/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇰 [sk](../../../sk/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇮 [sl](../../../sl/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇸 [sr](../../../sr/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇪 [sv](../../../sv/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇪 [sw](../../../sw/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [ta](../../../ta/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [te](../../../te/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇭 [th](../../../th/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇷 [tr](../../../tr/docs/compression/EXTENDING_COMPRESSION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇰 [ur](../../../ur/docs/compression/EXTENDING_COMPRESSION.md) · 🇺🇿 [uz](../../../uz/docs/compression/EXTENDING_COMPRESSION.md) · 🇻🇳 [vi](../../../vi/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [yo](../../../yo/docs/compression/EXTENDING_COMPRESSION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/EXTENDING_COMPRESSION.md)

---

> **Kurzfassung**: Die Komprimierungs-Engine von OmniRoute ist **erweiterbar** — Sie können benutzerdefinierte Engines registrieren, Sprachpakete für neue Sprachen bereitstellen und gestapelte Pipelines zusammenstellen. Dieser Leitfaden zeigt, wie das geht.

**Verwandte Leitfäden:**

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — Vollständiger Überblick über die Pipeline
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — Engine-Registry und integrierte Engines
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — RTK-Engine und benutzerdefinierte Filter
- [COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md) — Referenz zum Format von Regelpaketen

---

## Überblick

Das Komprimierungssystem verfügt über **3 Erweiterungspunkte**:

| Erweiterungspunkt             | Anwendungsfall                                                                                     | Schwierigkeitsgrad |
| ----------------------------- | -------------------------------------------------------------------------------------------------- | ------------------ |
| **Benutzerdefinierte Engine** | Einen völlig neuen Komprimierungsalgorithmus hinzufügen (z. B. domänenspezifische Zusammenfassung) | Fortgeschritten    |
| **Sprachpaket**               | Unterstützung für eine neue natürliche Sprache hinzufügen (z. B. Hindi, Arabisch)                  | Mittel             |
| **Gestapelte Pipeline**       | Vorhandene Engines in einer benutzerdefinierten Reihenfolge zusammenstellen                        | Einsteiger         |

```
┌─────────────────────────────────────────────────────────────┐
│                  Komprimierungsstrategie                    │
│                                                             │
│ Eingabenachrichten ──▶ getEffectiveMode() ──▶ Modus         │
│                                              │              │
│                      ┌───────────────────────┼──────────┐    │
│                      │         │         │         │    │    │
│                      ▼         ▼         ▼         ▼    │    │
│                   "rtk"    "lite"   "standard" "stacked"    │
│                      │         │         │         │    │    │
│                      ▼         ▼         ▼         ▼    │    │
│                   RTK       Lite     Caveman   engines[]   │
│                   Engine    Engine   Engine    verkettet   │
│                      │         │         │         │    │    │
│                      └─────────┴─────────┴─────────┘    │    │
│                                      │                    │
│                                      ▼                    │
│                         Komprimierte Ausgabe               │
└─────────────────────────────────────────────────────────────┘

Die Strategieauswahl ist MODUSBASIERT: Jede Anfrage wählt EINEN Modus
(rtk / lite / standard / aggressive / ultra / stacked / off).
Nur der Modus "stacked" verkettet mehrere Engines nacheinander.
Der standardmäßige Modus für die automatische Auslösung ist "lite"
(keine dreistufige Prioritätskette).
```

---

## Eine benutzerdefinierte Komprimierungs-Engine erstellen

Die Engine-Schnittstelle (`open-sse/services/compression/engines/types.ts`) ist der Vertrag, den jede Engine erfüllen muss. Sie umfasst 5 erforderliche Methoden.

### Die Schnittstelle `CompressionEngine`

```ts
interface CompressionEngine {
  id: string; // Eindeutige Engine-ID
  name: string; // Anzeigename
  description: string; // Kurzbeschreibung
  icon: string; // Symbol (Emoji oder URL)
  targets: CompressionEngineTarget[]; // ["messages", "tool_results", "code_blocks"]
  stackable: boolean; // Kann in einer gestapelten Pipeline verwendet werden
  stackPriority: number; // Reihenfolge in gestapelten Pipelines (niedriger = früher)
  metadata: CompressionEngineMetadata;

  apply(body, options?): CompressionResult;
  compress(body, config?): CompressionResult;
  getConfigSchema(): EngineConfigField[];
  validateConfig(config): EngineValidationResult;
}
```

### Minimalbeispiel: Whitespace-Engine

Die einfachste mögliche Engine — entfernt überflüssige Leerzeichen aus Nachrichten.

````ts
import type { CompressionEngine } from "omniroute/compression/engines/types";
import { registerCompressionEngine } from "omniroute/compression/engines/registry";

function preserveCodeBlocks(text: string): string {
  // An Codeblock-Markierungen aufteilen und Leerraum innerhalb dieser Blöcke beibehalten
  const parts = text.split(/(```[\s\S]*?```)/);
  return parts
    .map((part) => {
      if (part.startsWith("```")) {
        return part; // Codeblöcke nicht verändern
      }
      return part.replace(/\n{3,}/g, "\n\n"); // Nur auf Fließtext anwenden
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
  stackPriority: 100, // NACH caveman/rtk ausführen

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

    // Nachrichten-Array durchlaufen — sowohl Zeichenketten- als auch Multipart-Inhalte verarbeiten
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
      // Multipart-Inhalt: Bestandteile durchlaufen und nur Textbestandteile komprimieren
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
          return part; // image_url, tool_use usw. beibehalten
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

// Global registrieren
registerCompressionEngine(whitespaceEngine);
````

### Speicherort für benutzerdefinierte Engines

```
~/.omniroute/compression/engines/my-engine.ts    # Benutzerebene
<project>/compression-engines/my-engine.ts        # Projektebene (wird beim Start geladen)
```

Oder programmgesteuert aus einem Plugin laden:

```ts
// In Ihrem Plugin
import {
  registerCompressionEngine,
  unregisterCompressionEngine,
} from "@omniroute/open-sse/services/compression/engines/registry";
import { myEngine } from "./engines/my-engine";

export default definePlugin({
  name: "my-compression-plugin",
  // Das Plugin-SDK stellt die Hooks onRequest / onResponse / onError bereit. Registrieren Sie die
  // Engine beim Laden des Plugin-Moduls (oder beim ersten onRequest); deregistrieren Sie sie
  // über Ihren eigenen Bereinigungspfad.
  onRequest: async (ctx) => {
    registerCompressionEngine(myEngine);
  },
});

// Bei der Bereinigung:
// unregisterCompressionEngine("my-engine");
```

### Testen Ihrer Engine

Registrieren Sie Ihre Engine in einem Plugin oder einer Startfunktion. Nach der Registrierung ist die Engine
über ihre `id` in der Strategieauswahl verfügbar. Testen Sie die Integration, indem Sie sie in einer gestapelten Pipeline kombinieren:

---

## Sprachpakete erstellen

Die Komprimierung im Caveman-Stil verwendet **sprachspezifische Regelpakete**, um Füllwörter, abschwächende Formulierungen und weitschweifige Ausdrucksmuster in jeder natürlichen Sprache zu verarbeiten. OmniRoute wird mit **6 Sprachpaketen** ausgeliefert: `en`, `es`, `fr`, `de`, `ja`, `pt-BR`.

### Paketstruktur

Ein Sprachpaket ist ein Verzeichnis mit **JSON-Dateien** unter `open-sse/services/compression/rules/<language>/`:

```
open-sse/services/compression/rules/
├── en/
│   ├── filler.json          # Höflichkeitsfloskeln, Abschwächungen, Höflichkeit
│   ├── context.json         # Regeln zur Kontextreduzierung
│   ├── dedup.json           # Deduplizierungsregeln
│   ├── structural.json      # Zeichensetzung, Formatierung
│   └── ultra.json           # Aggressive Komprimierungsregeln
├── es/  (gleiche Struktur)
├── fr/  (gleiche Struktur)
├── de/  (gleiche Struktur)
├── ja/  (gleiche Struktur)
└── pt-BR/ (gleiche Struktur)
```

### Aufbau einer Regel

Jede Regel hat die folgende Struktur (aus `open-sse/services/compression/ruleLoader.ts`):

```ts
interface FileRule {
  name: string; // Für Menschen lesbarer Name (kebab-case)
  pattern: string; // JavaScript-RegEx-Muster
  replacement?: string; // Wodurch der Treffer ersetzt werden soll
  replacementMap?: Record<string, string>; // ODER eine Schlüssel→Ersetzung-Zuordnung
  flags?: string; // RegEx-Flags (typischerweise "gi")
  context?: "all" | "user" | "system" | "assistant";
  category?: "filler" | "context" | "structural" | "dedup" | "terse" | "ultra";
  minIntensity?: "lite" | "full" | "ultra"; // Unterhalb dieser Intensität überspringen
  description?: string; // Dokumentation
}
```

### Beispiel: Hindi-Füllwortregeln hinzufügen

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
      "description": "Höfliche Eröffnungen wie 'नमस्ते' entfernen"
    },
    {
      "name": "filler_actually",
      "pattern": "\\b(?:असल में|वास्तव में|दरअसल)\\b\\s*",
      "replacement": "",
      "context": "all",
      "category": "filler",
      "minIntensity": "lite",
      "description": "Füllwörter mit der Bedeutung 'eigentlich' entfernen"
    },
    {
      "name": "verbose_plea",
      "pattern": "\\b(?:कृपया|कृपया आप|अनुरोध है कि आप)\\b\\s*",
      "replacement": "",
      "context": "all",
      "category": "filler",
      "minIntensity": "full",
      "description": "Hindi-Ausdrücke für 'bitte' entfernen"
    }
  ]
}
```

### Validierung

Regelpakete werden beim Laden anhand von `_schema.json` validiert. Ein Paket mit einer ungültigen Struktur kann nicht geladen werden und protokolliert einen Fehler:

```
RULE_LOADER: pack "hi/filler.json" failed validation:
  - rules.0.pattern: Invalid regex
  - rules.1.context: must be one of [all, user, system, assistant]
```

Die Validierung wird automatisch ausgeführt, wenn ein Paket geladen wird (anhand von `_schema.json`); ein ungültiges Paket wird abgelehnt und der oben gezeigte Fehler wird protokolliert. Es gibt kein separates `npm run`-Skript für die Paketvalidierung — laden Sie das Paket (starten Sie beispielsweise den Server oder führen Sie den Komprimierungspfad aus) und beobachten Sie die Protokolle.

### Ein benutzerdefiniertes Sprachpaket laden

```ts
import { loadRulePack } from "omniroute/compression/ruleLoader";

await loadRulePack("./my-custom-rules/hi/filler.json");
```

Oder legen Sie es an einem erkannten Speicherort ab:

```
~/.omniroute/compression/rules/hi/filler.json  # Benutzerebene
<project>/.compression/rules/hi/filler.json   # Projektebene
```

### Bewährte Vorgehensweisen für Sprachpakete

1. **Beginnen Sie mit `filler`** — diese Regeln haben die größte Wirkung
2. **Verwenden Sie `minIntensity`**, um aggressive Regeln nur ab einer bestimmten Stufe anzuwenden — dies schützt vor übermäßiger Komprimierung
3. **Fügen Sie Testfälle hinzu** — ergänzen Sie im JSON ein `tests[]`-Array, um das Verhalten zu überprüfen
4. **Die Reihenfolge ist wichtig** — frühere Regeln werden zuerst angewendet; platzieren Sie Regeln mit großer Wirkung zuerst
5. **Gehen Sie bei `replacement` konservativ vor** — eine leere Zeichenfolge ist in der Regel korrekt; führen Sie niemals neue Inhalte ein

### Übersetzungsstrategie

Beim Lokalisieren von Regelpaketen für eine neue Sprache:

1. **Übersetzen Sie die Regelnamen** — sie erscheinen in der Debug-Ausgabe
2. **Passen Sie die RegEx-Muster an** — eine direkte Übersetzung funktioniert häufig nicht (Wortgrenzen unterscheiden sich)
3. **Testen Sie mit echten Unterhaltungen** — das Paket sollte bei tatsächlichen Eingaben sicher funktionieren
4. **Berücksichtigen Sie kulturelle Konventionen** — japanische Pakete enthalten beispielsweise mehr höflichkeitsbezogene Füllausdrücke als englische

---

## Gestapelte Pipelines

Eine **gestapelte Pipeline** führt mehrere Engines nacheinander aus, wobei die Ausgabe jeder Engine als Eingabe für die nächste dient. So funktioniert `mode: stacked` intern.

### Funktionsweise der Stapelung

```
Eingabe (10.000 Token)
        │
        ▼
   ┌──────────┐
   │  Engine  │  Priorität 10
   │  A       │  ──▶ Ausgabe: 6.000 Token (-40 %)
   └────┬─────┘
        ▼
   ┌──────────┐
   │  Engine  │  Priorität 50
   │  B       │  ──▶ Ausgabe: 2.400 Token (-60 %)
   └────┬─────┘
        ▼
   ┌──────────┐
   │  Engine  │  Priorität 100
   │  C       │  ──▶ Ausgabe: 1.200 Token (-80 %)
   └────┬─────┘
        │
        ▼
Endausgabe (1.200 Token, insgesamt ca. 88 % Einsparung)
```

Wenn `mode: "stacked"` ausgewählt ist, werden die Engines nacheinander in der im `pipeline`-Array angegebenen Reihenfolge ausgeführt.
Die Ausgabe von Engine N wird zur Eingabe von Engine N+1.

### Komprimierungsmodi

OmniRoute wählt anhand der Konfiguration, der Schwellenwerte für die automatische Auslösung und der Combo-Überschreibungen **EINEN Modus pro Anfrage** aus.
Die verfügbaren Modi sind in `open-sse/services/compression/types.ts` definiert (Typ `CompressionMode`):

| Modus        | Engines                     | Anwendungsfall                                                                                                                                                                                                                            |
| ------------ | --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `off`        | Keine                       | Jegliche Komprimierung deaktivieren                                                                                                                                                                                                       |
| `rtk`        | Nur RTK                     | Sitzungen mit umfangreichen Befehlsausgaben (über 80 % Einsparung)                                                                                                                                                                        |
| `lite`       | Nur Lite                    | Konservative Komprimierung (schnell, sicher)                                                                                                                                                                                              |
| `standard`   | Caveman                     | Prosa-Komprimierung mit Sprachpaketen                                                                                                                                                                                                     |
| `aggressive` | Caveman + Aggressive        | Aggressive Prosa-Komprimierung + aggressiver abschließender Durchlauf                                                                                                                                                                     |
| `ultra`      | Ultra                       | Maximale Komprimierung (verlustbehaftet, letztes Mittel). Wird optional über die **LLMLingua-2**-SLM-Engine geleitet, wenn `ultra.modelPath` gesetzt ist (bei nicht verfügbarem Modell wird auf den regelbasierten Pfad zurückgegriffen). |
| `stacked`    | Benutzerdefinierte Pipeline | Engines in beliebiger Reihenfolge kombinieren (siehe unten)                                                                                                                                                                               |

> Zusätzlich zu den oben genannten Modus-Engines enthält die Registry auch spezialisierte stapelbare Engines —
> **CCR**, **headroom**, **ionizer** und **session-dedup** —, die in
> [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md#additional-built-in-engines) dokumentiert sind.

Die Modusauswahl wird durch `getEffectiveMode()` in `open-sse/services/compression/strategySelector.ts` bestimmt:

1. Wenn die Komprimierung deaktiviert ist: `"off"`
2. Wenn eine Combo-Überschreibung vorhanden ist: die Überschreibung verwenden
3. Wenn der Schwellenwert für die automatische Auslösung überschritten wird: `autoTriggerMode` verwenden (Standard: `"lite"`)
4. Andernfalls: `defaultMode` verwenden

### Die standardmäßige gestapelte Pipeline

Wenn `mode: "stacked"` explizit konfiguriert ist, kombiniert die Standard-Pipeline:

1. **RTK** — Störinformationen aus Befehlsausgaben entfernen (ca. 80 % Einsparung bei Terminalausgaben)
2. **Caveman** — Füllwörter entfernen und Prosa knapper formulieren (ca. 46 % beim verbleibenden Text)
3. **Lite** — abschließender Durchlauf zur Bereinigung von Leerraum und Entfernung von Duplikaten

Diese Kombination erzielt bei Sitzungen mit intensiver Tool-Nutzung **78–95 % Einsparung**.

### Gestapelte Pipelines konfigurieren

In der Combo-Konfiguration:

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

Sie können Engines weglassen, benutzerdefinierte Engines hinzufügen oder ihre Reihenfolge ändern.

### Zustandsübergabe

Engines können Metadaten aus dem Anfragekontext (in `options`) lesen:

```ts
compress(body, config) {
  // Metadaten von vorherigen Engines lesen
  const original = options?.compressionComboId;  // "my-coding-combo"
  // ...
}
```

Die Metadaten sind **schreibgeschützt** — Engines können den Anfragekontext nicht verändern, sondern nur ihre eigene Body-Ausgabe.

### Fallstricke bei der Ausführungsreihenfolge

| Engine-Reihenfolge                              | Auswirkung                                                                                            |
| ----------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| RTK → Caveman → Lite                            | **Empfohlen** (entfernt zuerst Störinformationen, dann Sprachelemente und schließlich Leerraum)       |
| Lite → RTK → Caveman                            | Schlecht — Lite entfernt Leerraum aus der Rohausgabe, wodurch die Mustererkennung von RTK fehlschlägt |
| Caveman → RTK                                   | Schlecht — Caveman kann Text so umformulieren, dass RTK ihn nicht mehr erkennt                        |
| Beliebige Reihenfolge mit `tool_results` zuerst | Besser — Tool-Ausgaben enthalten die meisten Störinformationen                                        |

### Wann Sie NICHT stapeln sollten

Stapelung ist nicht immer besser:

- **Einfache Nachrichten** (keine Tool-Ausgabe) — eine einzelne Caveman- oder Lite-Engine genügt
- **Kostensensitiv** — jede Engine erhöht die Latenz um ca. 5–50 ms
- **Bestimmte Tools** — für Shell-Ausgaben genügt normalerweise RTK allein

### Eine benutzerdefinierte Pipeline erstellen

Es gibt keine Registry für benannte Pipelines. Eine gestapelte Pipeline ist lediglich ein **Inline-Array
von Schritten**, das an `applyStackedCompression()` übergeben wird (exportiert aus
`@omniroute/open-sse/services/compression/strategySelector`):

```ts
import { applyStackedCompression } from "@omniroute/open-sse/services/compression/strategySelector";

const result = applyStackedCompression(body, [
  { engine: "rtk", intensity: "aggressive" },
  { engine: "caveman", intensity: "full" },
]);
```

Wenn Sie keine Pipeline übergeben, wird standardmäßig `rtk(standard) → caveman(full)` verwendet.

Um sie über die Konfiguration zu steuern, setzen Sie `mode: "stacked"` und geben das Array der Schritte unter
`stackedPipeline` an (aus `config.stackedPipeline` gelesen):

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

## Richtlinie zur Upstream-Synchronisierung

Die Komprimierungs-Engines von OmniRoute nennen im README mehrere Upstream-Projekte
(„inspired by RTK, Caveman, LLMLingua-2, Troglodita“). Eine häufige Frage von
Mitwirkenden lautet: **Wie gelangt ein neuer Tool-Filter aus Upstream-RTK oder ein
neues Regelpaket von Caveman in OmniRoute?** Dieser Abschnitt enthält die verbindliche Antwort.

### Eingebundene Kopien vs. unabhängige Implementierungen

| Engine                       | Beziehung zum Upstream-Projekt                                                                                                                    | Speicherort                                                         |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| **RTK**                      | **Unabhängige Neuimplementierung** (inspiriert davon, keine Kopie)                                                                                | `open-sse/services/compression/engines/rtk/`                        |
| **Caveman**                  | **Unabhängige Neuimplementierung** (davon inspiriert)                                                                                             | `open-sse/services/compression/engines/cavemanAdapter.ts`           |
| **Headroom**                 | Größtenteils intern; nur der `gcf/`-Codec ist **tatsächlich eingebunden** aus `gcf-typescript` (MIT, SPDX-gekennzeichnet, nur generisches Profil) | `open-sse/services/compression/engines/headroom/gcf/`               |
| **LLMLingua-2 / Troglodita** | Davon inspiriert (Grundlage für die Engines `llmlingua` und `session-dedup`)                                                                      | `open-sse/services/compression/engines/llmlingua/`, `session-dedup` |

Wichtig: **RTK und Caveman sind unter Clean-Room-Bedingungen erstellte TypeScript-Implementierungen
der _Ideen_ (Filterregeln, Regelpakete), keine eingebundenen Quellcodebäume.** Es gibt keine
Upstream-Kopie, aus der man mittels `git pull` Änderungen übernehmen könnte — genau deshalb steht im README
„inspired by“ statt „bundled“.

### So werden Upstream-Verbesserungen integriert

Es gibt **keine automatisierte Nachverfolgung von Upstream-Releases und kein `compression-sync`-
Label** — und das ist beabsichtigt. Da es sich bei den Engines um Neuimplementierungen handelt, wird ein Upstream-RTK-
Filter oder ein Caveman-Regelpaket nicht als Code integriert, sondern **als neue
Regel bzw. neuer Filter in OmniRoutes eigenem Format neu ausgedrückt** (siehe
[COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md)) und bei Bedarf über
einen normalen PR eingereicht. Die oben genannten Erweiterungspunkte (benutzerdefinierte Engine, Sprachpaket, RTK-Filter)
sind die vorgesehenen Möglichkeiten, einen solchen Beitrag einzureichen.

Aktuelle Beispiele für genau diesen Ablauf:

- RTK-Filter für die Build-Ausgabe von Gradle und `dotnet` (v3.8.42)
- RTK-Filter für kubectl / docker-build / composer / gh (#2824)
- Indonesisches Sprachpaket für Caveman (#3975) sowie deutsche / französische / japanische / chinesische Pakete

### Headroom (Proxy zur Eingabekomprimierung)

Headroom ist **vollständig intern** — ein eingebundener, auf eine bestimmte Version festgelegter `gcf`-Codec-Snapshot sowie
OmniRoutes eigene `smartcrusher`- / `toon`- / `tabular`-Schichten. Abgesehen von der eingebundenen Kopie gibt es keinen aktiven
Upstream, der nachverfolgt werden müsste; Aktualisierungen von `gcf` werden bei Änderungen am Codec
manuell übernommen und erneut anhand der Prüfung des Komprimierungsbudgets
(`check:compression-budget`) validiert.

### Vorschlagen einer von einem Upstream-Projekt inspirierten Verbesserung

1. **Nicht einbinden** — die Upstream-Regel bzw. den Upstream-Filter in OmniRoutes Format neu ausdrücken.
2. Über den passenden Erweiterungspunkt unten hinzufügen (Sprachpaket, RTK-Filter oder
   benutzerdefinierte Engine).
3. Das Upstream-Projekt in der PR-Beschreibung nennen (Attribution), anstatt
   dessen lizenzpflichtigen Quellcode zu kopieren.
4. Tests hinzufügen und bestätigen, dass die Prüfung `check:compression-budget` weiterhin erfolgreich ist.

---

## Hinzufügen eines Ausgabestils

Ausgabestile (siehe die [Katalogtabelle des Leitfadens](./COMPRESSION_GUIDE.md#output-styles-catalog))
sind das ausgabeseitige Gegenstück zu den Eingabe-Engines: Statt das zu komprimieren, was Sie
senden, weisen sie das Modell an, kostengünstigere Ausgaben zu erzeugen. Die Registry ist
`OUTPUT_STYLE_CATALOG` in `open-sse/services/compression/outputStyles/catalog.ts`, und
**ein einzelner Katalogeintrag bildet die gesamte Funktionalität ab**: Der Injector, das Einstellungsfenster
im Dashboard, die Persistenz und die Telemetrie iterieren allesamt über den Katalog — es gibt keine weitere Liste,
die aktualisiert werden muss.

1. **Fügen Sie `OUTPUT_STYLE_CATALOG` einen Eintrag hinzu** — mit `id`, `label`, `description` und den
   drei englischen `levels` (`lite`, `full`, `ultra`). Jede Stufe muss mit
   `${SHARED_BOUNDARIES}` enden, damit Code, Pfade, Befehle, Fehler und URLs unverändert bleiben.
   Der Anweisungstext muss pro `(id, level, language)` **statisch und deterministisch** sein —
   `${SHARED_BOUNDARIES}` ist die einzige zulässige Interpolation.
2. **Übersetzen Sie ihn.** Stellen Sie unter `i18n` mindestens einen `pt-BR`-Block bereit; `ponytail` und
   `i-have-adhd` (en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi) dienen als Referenzstruktur. Ein bewusst
   einsprachiger Stil setzt stattdessen `locale` (wie `terse-cjk` → `zh`) und wird dann
   nur für diese Locale angeboten.
3. **Aktualisieren Sie den Matrix-Guard** — fügen Sie die Sprachen des Stils zu `BASELINE_LANGUAGES` in
   `tests/unit/compression/output-styles-i18n-matrix.test.ts` hinzu. Die Prüfung lehnt jeden neuen,
   nicht durch eine Locale eingeschränkten Stil ohne die erforderlichen Übersetzungen ab, sofern er
   nicht über einen expliziten `KNOWN_ENGLISH_ONLY`-Eintrag mit einem Tracking-Issue verfügt.
4. **Fügen Sie einen stilspezifischen Test hinzu**, angelehnt an
   `tests/unit/compression/i-have-adhd-catalog.test.ts`: Katalogstruktur, Begrenzungsklausel
   pro Stufe und eine Anker-Assertion, die sicherstellt, dass jede Übersetzung in ihrer eigenen
   Sprache verfasst und nicht aus dem Englischen kopiert wurde.
5. **Namensnennung**: Wenn der Stil aus einem Upstream-Projekt übernommen wurde, nennen Sie dieses
   in einem Quellkommentar zum Eintrag (z. B. `i-have-adhd` → ayghri/i-have-adhd, MIT) — es gilt
   dieselbe Regel wie oben unter „Vorschlagen einer Upstream-inspirierten Verbesserung“.

Es sind keine Änderungen an UI, Schema oder Telemetrie erforderlich — diese Oberflächen werden aus dem Katalog gerendert.

---

## Bewährte Vorgehensweisen

### Engine-Entwicklung

1. **Implementieren Sie immer `validateConfig`** — Engines ohne Validierung führen zu unbemerkten Fehlern
2. **Legen Sie einen realistischen Wert für `targetLatencyMs` fest** — dieser wird vom Strategie-Selektor zur Auswahl von Engines verwendet
3. **Verwenden Sie `getConfigSchema` für das Dashboard** — verbergen Sie Konfigurationen niemals vor Benutzern
4. **Unterstützen Sie `stackable: true`, wenn Ihre Engine rein ist** — Engines mit Seiteneffekten sollten nicht gestapelt werden
5. **Schreiben Sie Inline-Tests** — Engines sollten in <1s überprüfbar sein

### Entwicklung von Sprachpaketen

1. **Beginnen Sie mit der Intensität `lite`** — Ihre Regeln sollten bereits bei der niedrigsten Einstellung sicher sein
2. **Verwenden Sie `context`, um Regeln einzuschränken** — Regeln nur für `user` können nicht versehentlich System-Prompts beeinflussen
3. **Vermeiden Sie es, JSON-Schlüssel zu erfassen** — `\\bword\\b` kann innerhalb von JSON übereinstimmen und dadurch strukturierte Daten beschädigen
4. **Testen Sie mit Grenzfällen** — leere Eingaben, Unicode, RTL-Text, Emojis
5. **Verwenden Sie vorhandene Pakete als Vorlagen** — `en/filler.json` ist das am weitesten entwickelte Beispiel

### Pipeline-Design

1. **Erstellen Sie vor der Optimierung ein Profil** — messen Sie zuerst mit `compression_stats`
2. **Bevorzugen Sie Komposition gegenüber Neuimplementierung** — erweitern Sie Caveman-Regeln, bevor Sie eine neue Engine schreiben
3. **Dokumentieren Sie die Begründung für die Reihenfolge** — erläutern Sie in einem Kommentar, warum Engine A vor Engine B ausgeführt wird
4. **Testen Sie bei allen 3 Intensitätsstufen** — `lite` ist schnell, aber verlustbehaftet, `ultra` ist langsam, aber präzise

---

## Referenz: Integrierte Engines

| Engine-ID            | Stapelbar | Standardmäßige stackPriority | Ziele                                       |
| -------------------- | --------- | ---------------------------- | ------------------------------------------- |
| `lite`               | Ja        | 5                            | Nachrichten, Werkzeugergebnisse             |
| `rtk`                | Ja        | 10                           | Werkzeugergebnisse                          |
| `standard` (caveman) | Ja        | 20                           | Nachrichten, Werkzeugergebnisse, Codeblöcke |
| `aggressive`         | Ja        | 30                           | Nachrichten                                 |
| `ultra`              | Ja        | 40                           | Nachrichten, Codeblöcke                     |

### Siehe auch

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — Pipeline-Übersicht
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — Referenz zur Engine-Registry
- [COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md) — Spezifikation des Regelformats
- [COMPRESSION_LANGUAGE_PACKS.md](./COMPRESSION_LANGUAGE_PACKS.md) — Details zu Sprachpaketen
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — RTK-Engine und benutzerdefinierte Filter
- Quelle: `open-sse/services/compression/` (117 Dateien, ~250 KB)
