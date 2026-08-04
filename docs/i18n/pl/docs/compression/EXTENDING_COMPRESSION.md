---
title: "Rozszerzanie potoku kompresji"
version: 3.8.44
lastUpdated: 2026-07-02
---

# Rozszerzanie potoku kompresji

> **TL;DR**: Silnik kompresji OmniRoute jest **podłączalny (pluggable)** — możesz rejestrować własne silniki, dostarczać language packi dla nowych języków i składać stacked pipelines. Ten przewodnik pokazuje jak.

**Powiązane przewodniki:**

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — Pełny przegląd potoku
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — Rejestr silników i wbudowane silniki
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — Silnik RTK i niestandardowe filtry
- [COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md) — Referencja formatu pakietów reguł

---

## Przegląd

System kompresji ma **3 punkty rozszerzeń**:

| Punkt rozszerzenia   | Zastosowanie                                                          | Trudność     |
| -------------------- | --------------------------------------------------------------------- | ------------ |
| **Custom engine**    | Dodanie zupełnie nowego algorytmu kompresji (np. summarizer domenowy) | Zaawansowany |
| **Language pack**    | Dodanie wsparcia dla nowego języka naturalnego (np. hindi, arabski)   | Średni       |
| **Stacked pipeline** | Złożenie istniejących silników w niestandardowej kolejności           | Początkujący |

```
┌─────────────────────────────────────────────────────────────┐
│                    Compression Strategy                      │
│                                                              │
│   Input messages ──▶ getEffectiveMode() ──▶ mode            │
│                                              │               │
│                      ┌───────────────────────┼──────────┐    │
│                      │         │         │         │    │    │
│                      ▼         ▼         ▼         ▼    │    │
│                   "rtk"    "lite"   "standard" "stacked"    │
│                      │         │         │         │    │    │
│                      ▼         ▼         ▼         ▼    │    │
│                   RTK       Lite     Caveman   engines[]   │
│                   engine    engine   engine    chained     │
│                      │         │         │         │    │    │
│                      └─────────┴─────────┴─────────┘    │    │
│                                      │                    │
│                                      ▼                    │
│                             Compressed output              │
└─────────────────────────────────────────────────────────────┘

The strategy selector is MODE-BASED: each request selects ONE mode
(rtk / lite / standard / aggressive / ultra / stacked / off).
Only mode "stacked" chains multiple engines in sequence.
Default auto-trigger mode is "lite" (not a 3-tier priority chain).
```

---

## Pisanie własnego silnika kompresji

Interfejs silnika (`open-sse/services/compression/engines/types.ts`) to kontrakt, który musi spełniać każdy silnik. Ma 5 wymaganych metod.

### Interfejs `CompressionEngine`

```ts
interface CompressionEngine {
  id: string; // Unique engine ID
  name: string; // Display name
  description: string; // Short description
  icon: string; // Icon (emoji or URL)
  targets: CompressionEngineTarget[]; // ["messages", "tool_results", "code_blocks"]
  stackable: boolean; // Can be used in a stacked pipeline
  stackPriority: number; // Order in stacked pipelines (lower = earlier)
  metadata: CompressionEngineMetadata;

  apply(body, options?): CompressionResult;
  compress(body, config?): CompressionResult;
  getConfigSchema(): EngineConfigField[];
  validateConfig(config): EngineValidationResult;
}
```

### Minimalny przykład: silnik Whitespace

Najprostszy możliwy silnik — usuwa nadmiarowe białe znaki z wiadomości.

````ts
import type { CompressionEngine } from "omniroute/compression/engines/types";
import { registerCompressionEngine } from "omniroute/compression/engines/registry";

function preserveCodeBlocks(text: string): string {
  // Split by code block markers and preserve whitespace inside them
  const parts = text.split(/(```[\s\S]*?```)/);
  return parts
    .map((part) => {
      if (part.startsWith("```")) {
        return part; // Don't modify code blocks
      }
      return part.replace(/\n{3,}/g, "\n\n"); // Only apply to prose
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
  stackPriority: 100, // Run AFTER caveman/rtk

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

    // Traverse message array — handle both string and multipart content
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
      // Multipart content: traverse parts, compress text parts only
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
          return part; // preserve image_url, tool_use, etc.
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

// Register globally
registerCompressionEngine(whitespaceEngine);
````

### Gdzie umieszczać własne silniki

```
~/.omniroute/compression/engines/my-engine.ts    # User-level
<project>/compression-engines/my-engine.ts        # Project-level (loaded on startup)
```

Albo załaduj programowo z pluginu:

```ts
// In your plugin
import {
  registerCompressionEngine,
  unregisterCompressionEngine,
} from "@omniroute/open-sse/services/compression/engines/registry";
import { myEngine } from "./engines/my-engine";

export default definePlugin({
  name: "my-compression-plugin",
  // The plugin SDK exposes onRequest / onResponse / onError hooks. Register the
  // engine when the plugin module loads (or on first onRequest); unregister it
  // from your own teardown path.
  onRequest: async (ctx) => {
    registerCompressionEngine(myEngine);
  },
});

// On teardown:
// unregisterCompressionEngine("my-engine");
```

### Testowanie silnika

Zarejestruj silnik w pluginie lub funkcji startowej. Po rejestracji będzie dostępny w strategy selectorze przez swoje `id`. Przetestuj integrację, składając go w stacked pipeline:

---

## Tworzenie language packów

Kompresja w stylu Caveman używa **pakietów reguł zależnych od języka**, aby obsługiwać wypełniacze (fillers), hedging i rozwlekłe wzorce w każdym języku naturalnym. OmniRoute dostarcza **6 language packów**: `en`, `es`, `fr`, `de`, `ja`, `pt-BR`.

### Struktura pakietu

Language pack to katalog **plików JSON** pod `open-sse/services/compression/rules/<language>/`:

```
open-sse/services/compression/rules/
├── en/
│   ├── filler.json          # Pleasantries, hedging, politeness
│   ├── context.json         # Context-reducing rules
│   ├── dedup.json           # Deduplication rules
│   ├── structural.json      # Punctuation, formatting
│   └── ultra.json           # Aggressive compression rules
├── es/  (same structure)
├── fr/  (same structure)
├── de/  (same structure)
├── ja/  (same structure)
└── pt-BR/ (same structure)
```

### Anatomia reguły

Każda reguła ma ten kształt (z `open-sse/services/compression/ruleLoader.ts`):

```ts
interface FileRule {
  name: string; // Human-readable name (kebab-case)
  pattern: string; // JavaScript regex pattern
  replacement?: string; // What to replace the match with
  replacementMap?: Record<string, string>; // OR a key→replacement map
  flags?: string; // Regex flags ("gi" typically)
  context?: "all" | "user" | "system" | "assistant";
  category?: "filler" | "context" | "structural" | "dedup" | "terse" | "ultra";
  minIntensity?: "lite" | "full" | "ultra"; // Skip below this intensity
  description?: string; // Documentation
}
```

### Przykład: dodawanie reguł filler dla hindi

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

### Walidacja

Pakiety reguł są walidowane względem `_schema.json` przy ładowaniu. Pakiet o złej strukturze nie załaduje się i zaloguje błąd:

```
RULE_LOADER: pack "hi/filler.json" failed validation:
  - rules.0.pattern: Invalid regex
  - rules.1.context: must be one of [all, user, system, assistant]
```

Walidacja uruchamia się automatycznie przy ładowaniu pakietu (względem `_schema.json`); nieprawidłowy pakiet jest odrzucany, a powyższy błąd trafia do logów. Nie ma osobnego skryptu `npm run` do walidacji pakietów — załaduj pakiet (np. uruchom serwer lub przejdź ścieżkę kompresji) i obserwuj logi.

### Ładowanie własnego language packa

```ts
import { loadRulePack } from "omniroute/compression/ruleLoader";

await loadRulePack("./my-custom-rules/hi/filler.json");
```

Albo umieść w rozpoznawanej lokalizacji:

```
~/.omniroute/compression/rules/hi/filler.json  # User-level
<project>/.compression/rules/hi/filler.json   # Project-level
```

### Dobre praktyki dla language packów

1. **Zacznij od `filler`** — to reguły o największym wpływie
2. **Używaj `minIntensity`**, aby bramkować agresywne reguły — chroni przed nadmierną kompresją
3. **Dołączaj przypadki testowe** — dodaj tablicę `tests[]` w JSON, aby weryfikować zachowanie
4. **Kolejność ma znaczenie** — wcześniejsze reguły stosują się pierwsze; umieszczaj reguły o wysokim wpływie na początku
5. **Bądź konserwatywny z `replacement`** — pusty string zwykle jest poprawny; nigdy nie wprowadzaj nowej treści

### Strategia tłumaczenia

Przy lokalizacji pakietów reguł na nowy język:

1. **Przetłumacz nazwy reguł** — pojawiają się w wyjściu debug
2. **Dostosuj wzorce regex** — dosłowne tłumaczenie często zawodzi (różnice w granicach słów)
3. **Testuj na prawdziwych rozmowach** — pakiet powinien być bezpieczny na rzeczywistym wejściu
4. **Dopasuj konwencje kulturowe** — np. pakiety japońskie mają więcej honoryfikatywnych fillerów niż angielskie

---

## Stacked pipelines

**Stacked pipeline** uruchamia wiele silników sekwencyjnie, a wyjście każdego zasila następny. W ten sposób wewnętrznie działa `mode: stacked`.

### Jak działa stacking

```
Input (10,000 tokens)
        │
        ▼
   ┌──────────┐
   │  Engine  │  priority 10
   │  A       │  ──▶ output: 6,000 tokens (-40%)
   └────┬─────┘
        ▼
   ┌──────────┐
   │  Engine  │  priority 50
   │  B       │  ──▶ output: 2,400 tokens (-60%)
   └────┬─────┘
        ▼
   ┌──────────┐
   │  Engine  │  priority 100
   │  C       │  ──▶ output: 1,200 tokens (-80%)
   └────┬─────┘
        │
        ▼
Final output (1,200 tokens, ~88% savings combined)
```

Gdy wybrany jest `mode: "stacked"`, silniki wykonują się sekwencyjnie w kolejności z tablicy `pipeline`.
Wyjście silnika N staje się wejściem silnika N+1.

### Tryby kompresji

OmniRoute wybiera **JEDEN tryb na żądanie** na podstawie konfiguracji, progów auto-trigger i override'ów combo.
Dostępne tryby są zdefiniowane w `open-sse/services/compression/types.ts` (typ `CompressionMode`):

| Mode         | Engines              | Use case                                                                                                                                                                                            |
| ------------ | -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `off`        | None                 | Wyłącza całą kompresję                                                                                                                                                                              |
| `rtk`        | RTK only             | Sesje z dużą ilością wyjścia poleceń (oszczędności 80%+)                                                                                                                                            |
| `lite`       | Lite only            | Konserwatywna kompresja (szybka, bezpieczna)                                                                                                                                                        |
| `standard`   | Caveman              | Kompresja prozy z language packami                                                                                                                                                                  |
| `aggressive` | Caveman + Aggressive | Agresywna proza + agresywne końcowe przejście                                                                                                                                                       |
| `ultra`      | Ultra                | Maksymalna kompresja (stratna, ostateczność). Opcjonalnie kierowana przez silnik SLM **LLMLingua-2**, gdy ustawione jest `ultra.modelPath` (fail-open do ścieżki regułowej, gdy model niedostępny). |
| `stacked`    | Custom pipeline      | Składanie silników w dowolnej kolejności (patrz poniżej)                                                                                                                                            |

> Poza silnikami trybów powyżej rejestr zawiera też specjalistyczne silniki stackable —
> **CCR**, **headroom**, **ionizer** i **session-dedup** — opisane w
> [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md#additional-built-in-engines).

Wybór trybu określa `getEffectiveMode()` w `open-sse/services/compression/strategySelector.ts`:

1. Jeśli kompresja jest wyłączona: `"off"`
2. Jeśli istnieje override combo: użyj override
3. Jeśli przekroczono próg auto-trigger: użyj `autoTriggerMode` (domyślnie: `"lite"`)
4. W przeciwnym razie: użyj `defaultMode`

### Domyślny stacked pipeline

Gdy `mode: "stacked"` jest jawnie skonfigurowany, domyślny pipeline składa:

1. **RTK** — usuwa szum wyjścia poleceń (~80% oszczędności na wyjściu terminala)
2. **Caveman** — usuwa fillery, skraca prozę (~46% na pozostałym tekście)
3. **Lite** — końcowe przejście whitespace + dedup

Ta kompozycja osiąga **78–95% oszczędności** w sesjach bogatych w tool output.

### Konfiguracja stacked pipelines

W konfiguracji combo:

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

Możesz pomijać silniki, dodawać własne albo zmieniać ich kolejność.

### Przekazywanie stanu

Silniki mogą czytać metadane z kontekstu żądania (w `options`):

```ts
compress(body, config) {
  // Read metadata from previous engines
  const original = options?.compressionComboId;  // "my-coding-combo"
  // ...
}
```

Metadane są **tylko do odczytu** — silniki nie mogą mutować kontekstu żądania, tylko własne wyjście body.

### Pułapki kolejności wykonania

| Kolejność silników                          | Efekt                                                                              |
| ------------------------------------------- | ---------------------------------------------------------------------------------- |
| RTK → Caveman → Lite                        | **Zalecane** (najpierw szum, potem język, potem whitespace)                        |
| Lite → RTK → Caveman                        | Źle — Lite usuwa whitespace z surowego wyjścia, przez co matching wzorców RTK pada |
| Caveman → RTK                               | Źle — Caveman może przepisać tekst w sposób nierozpoznawalny dla RTK               |
| Dowolna kolejność z `tool_results` najpierw | Lepiej — wyjście tooli to najbardziej szumna treść                                 |

### Kiedy NIE stackować

Stacking nie zawsze jest lepszy:

- **Proste wiadomości** (bez tool output) — wystarczy sam Caveman lub Lite
- **Wrażliwość na koszt** — każdy silnik dodaje ~5–50 ms opóźnienia
- **Konkretne tool'e** — samo RTK zwykle wystarcza dla wyjścia shella

### Budowanie własnego pipeline'u

Nie ma rejestru nazwanych pipeline'ów. Stacked pipeline to po prostu **inline tablica
kroków** przekazywana do `applyStackedCompression()` (eksport z
`@omniroute/open-sse/services/compression/strategySelector`):

```ts
import { applyStackedCompression } from "@omniroute/open-sse/services/compression/strategySelector";

const result = applyStackedCompression(body, [
  { engine: "rtk", intensity: "aggressive" },
  { engine: "caveman", intensity: "full" },
]);
```

Gdy nie podasz pipeline'u, domyślnie jest `rtk(standard) → caveman(full)`.

Aby sterować z konfiguracji, ustaw `mode: "stacked"` i podaj tablicę kroków pod
`stackedPipeline` (odczytywane z `config.stackedPipeline`):

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

## Polityka synchronizacji z upstreamem

Silniki kompresji OmniRoute w README przypisują zasługi kilku projektom upstream
(„inspired by RTK, Caveman, LLMLingua-2, Troglodita”). Częste pytanie kontrybutorów:
**gdy upstream RTK doda nowy filtr toola albo Caveman doda rule pack, jak to trafia do OmniRoute?**
Ta sekcja jest autorytatywną odpowiedzią.

### Kopie vendored vs niezależne implementacje

| Engine                       | Relacja do upstreamu                                                                                                                    | Location                                                            |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| **RTK**                      | **Niezależna reimplementacja** (inspired-by, nie kopia)                                                                                 | `open-sse/services/compression/engines/rtk/`                        |
| **Caveman**                  | **Niezależna reimplementacja** (inspired-by)                                                                                            | `open-sse/services/compression/engines/cavemanAdapter.ts`           |
| **Headroom**                 | Głównie wewnętrzny; tylko kodek `gcf/` jest **rzeczywiście vendored** z `gcf-typescript` (MIT, oznaczony SPDX, tylko profil generyczny) | `open-sse/services/compression/engines/headroom/gcf/`               |
| **LLMLingua-2 / Troglodita** | Inspired-by (napędzają silniki `llmlingua` + `session-dedup`)                                                                           | `open-sse/services/compression/engines/llmlingua/`, `session-dedup` |

Kluczowy punkt: **RTK i Caveman to clean-room implementacje TypeScript _idei_
(reguły filtrów, rule packi), a nie vendored drzewa źródeł.** Nie ma
kopii upstreamu, z której można zrobić `git pull` — właśnie dlatego README mówi
„inspired by”, a nie „bundled”.

### Jak mergowane są usprawnienia z upstreamu

**Nie ma automatycznego śledzenia wydań upstream ani etykiety `compression-sync`**
— z założenia. Ponieważ silniki to reimplementacje, filtr upstream RTK
lub rule pack Caveman nie jest mergowany jako kod; jest **wyrażany na nowo jako nowa
reguła/filtr w formacie OmniRoute** (zob.
[COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md)) i trafia ad hoc przez
zwykły PR. Punkty rozszerzeń powyżej (custom engine, language pack, filtr RTK)
to sankcjonowany sposób na kontrybucję.

Niedawne przykłady dokładnie tego przepływu:

- Filtry RTK dla wyjścia buildów Gradle i `dotnet` (v3.8.42)
- Filtry RTK dla kubectl / docker-build / composer / gh (#2824)
- Language pack indonezyjski Caveman (#3975), plus pakiety niemiecki / francuski / japoński / chiński

### Headroom (proxy kompresji wejścia)

Headroom jest **w pełni wewnętrzny** — przypięty snapshot vendored kodeka `gcf` plus
własne warstwy OmniRoute `smartcrusher` / `toon` / `tabular`. Nie ma żywego
upstreamu do śledzenia poza kopią vendored; aktualizacje `gcf` odświeża się
ręcznie przy zmianie kodeka i ponownie waliduje względem bramki budżetu kompresji
(`check:compression-budget`).

### Proponowanie usprawnienia inspirowanego upstreamem

1. **Nie vendoruj** — wyraź regułę/filtr upstream w formacie OmniRoute.
2. Dodaj ją przez odpowiadający punkt rozszerzenia poniżej (language pack, filtr RTK albo
   custom engine).
3. Odnieś się do projektu upstream w opisie PR (atrybucja), a nie przez
   kopiowanie jego źródeł objętych licencją.
4. Dołącz testy i potwierdź, że bramka `check:compression-budget` nadal przechodzi.

---

## Dobre praktyki

### Rozwój silników

1. **Zawsze implementuj `validateConfig`** — silniki bez walidacji powodują ciche awarie
2. **Ustaw realistyczne `targetLatencyMs`** — używane przez strategy selector do wyboru silników
3. **Używaj `getConfigSchema` dla dashboardu** — nigdy nie ukrywaj konfiguracji przed użytkownikami
4. **Ustaw `stackable: true`, jeśli silnik jest pure** — silniki z efektami ubocznymi nie powinny się stackować
5. **Pisz testy inline** — silniki powinny dać się zweryfikować w <1 s

### Rozwój language packów

1. **Zacznij od intensywności `lite`** — reguły powinny być bezpieczne na najniższym ustawieniu
2. **Używaj `context` do zakresowania reguł** — reguły tylko `user` nie mogą przypadkiem wpłynąć na system prompt
3. **Unikaj przechwytywania kluczy JSON** — `\\bword\\b` może matchować wewnątrz JSON i psuć dane strukturalne
4. **Testuj edge case'y** — puste wejście, unicode, tekst RTL, emoji
5. **Używaj istniejących pakietów jako szablonów** — `en/filler.json` to najbardziej rozwinięty przykład

### Projektowanie pipeline'ów

1. **Profiluj przed optymalizacją** — najpierw mierz z `compression_stats`
2. **Preferuj kompozycję zamiast reimplementacji** — rozszerzaj reguły Caveman, zanim napiszesz nowy silnik
3. **Dokumentuj uzasadnienie kolejności** — komentuj, dlaczego silnik A przed silnikiem B
4. **Testuj na wszystkich 3 poziomach intensywności** — `lite` jest szybki, ale stratny; `ultra` wolny, ale precyzyjny

---

## Referencja: wbudowane silniki

| Engine ID            | Stackable | Default stackPriority | Targets                             |
| -------------------- | --------- | --------------------- | ----------------------------------- |
| `lite`               | Yes       | 5                     | messages, tool_results              |
| `rtk`                | Yes       | 10                    | tool_results                        |
| `standard` (caveman) | Yes       | 20                    | messages, tool_results, code_blocks |
| `aggressive`         | Yes       | 30                    | messages                            |
| `ultra`              | Yes       | 40                    | messages, code_blocks               |

### Zobacz też

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — Przegląd potoku
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — Referencja rejestru silników
- [COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md) — Specyfikacja formatu reguł
- [COMPRESSION_LANGUAGE_PACKS.md](./COMPRESSION_LANGUAGE_PACKS.md) — Szczegóły language packów
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — Silnik RTK i niestandardowe filtry
