# Extending the Compression Pipeline (Polski)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/EXTENDING_COMPRESSION.md) · 🇪🇹 [am](../../../am/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇦 [ar](../../../ar/docs/compression/EXTENDING_COMPRESSION.md) · 🇦🇿 [az](../../../az/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇬 [bg](../../../bg/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇩 [bn](../../../bn/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇦 [bs](../../../bs/docs/compression/EXTENDING_COMPRESSION.md) · 🇨🇿 [cs](../../../cs/docs/compression/EXTENDING_COMPRESSION.md) · 🇩🇰 [da](../../../da/docs/compression/EXTENDING_COMPRESSION.md) · 🇩🇪 [de](../../../de/docs/compression/EXTENDING_COMPRESSION.md) · 🇬🇷 [el](../../../el/docs/compression/EXTENDING_COMPRESSION.md) · 🇪🇸 [es](../../../es/docs/compression/EXTENDING_COMPRESSION.md) · 🇪🇪 [et](../../../et/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇷 [fa](../../../fa/docs/compression/EXTENDING_COMPRESSION.md) · 🇫🇮 [fi](../../../fi/docs/compression/EXTENDING_COMPRESSION.md) · 🇫🇷 [fr](../../../fr/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇪 [ga](../../../ga/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [gu](../../../gu/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [ha](../../../ha/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇱 [he](../../../he/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [hi](../../../hi/docs/compression/EXTENDING_COMPRESSION.md) · 🇭🇷 [hr](../../../hr/docs/compression/EXTENDING_COMPRESSION.md) · 🇭🇺 [hu](../../../hu/docs/compression/EXTENDING_COMPRESSION.md) · 🇦🇲 [hy](../../../hy/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇩 [id](../../../id/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [ig](../../../ig/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇹 [it](../../../it/docs/compression/EXTENDING_COMPRESSION.md) · 🇯🇵 [ja](../../../ja/docs/compression/EXTENDING_COMPRESSION.md) · 🇬🇪 [ka](../../../ka/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇭 [km](../../../km/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [kn](../../../kn/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇷 [ko](../../../ko/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇹 [lt](../../../lt/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇻 [lv](../../../lv/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [ml](../../../ml/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [mr](../../../mr/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇾 [ms](../../../ms/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇹 [mt](../../../mt/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇲 [my](../../../my/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇵 [ne](../../../ne/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇱 [nl](../../../nl/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇴 [no](../../../no/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [or](../../../or/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [pa](../../../pa/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇭 [phi](../../../phi/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇹 [pt](../../../pt/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇴 [ro](../../../ro/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇺 [ru](../../../ru/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇰 [si](../../../si/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇰 [sk](../../../sk/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇮 [sl](../../../sl/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇸 [sr](../../../sr/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇪 [sv](../../../sv/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇪 [sw](../../../sw/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [ta](../../../ta/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [te](../../../te/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇭 [th](../../../th/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇷 [tr](../../../tr/docs/compression/EXTENDING_COMPRESSION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇰 [ur](../../../ur/docs/compression/EXTENDING_COMPRESSION.md) · 🇺🇿 [uz](../../../uz/docs/compression/EXTENDING_COMPRESSION.md) · 🇻🇳 [vi](../../../vi/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [yo](../../../yo/docs/compression/EXTENDING_COMPRESSION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/EXTENDING_COMPRESSION.md)

---

> **W skrócie**: silnik kompresji OmniRoute jest **rozszerzalny** — możesz rejestrować niestandardowe silniki, dostarczać pakiety językowe dla nowych języków oraz tworzyć wieloetapowe potoki. Ten przewodnik pokazuje, jak to zrobić.

**Powiązane przewodniki:**

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — Pełny przegląd potoku
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — Rejestr silników i wbudowane silniki
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — Silnik RTK i niestandardowe filtry
- [COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md) — Dokumentacja formatu pakietu reguł

---

## Przegląd

System kompresji ma **3 punkty rozszerzeń**:

| Punkt rozszerzenia        | Przypadek użycia                                                                        | Poziom trudności |
| ------------------------- | --------------------------------------------------------------------------------------- | ---------------- |
| **Niestandardowy silnik** | Dodanie zupełnie nowego algorytmu kompresji (np. podsumowania specyficznego dla domeny) | Zaawansowany     |
| **Pakiet językowy**       | Dodanie obsługi nowego języka naturalnego (np. hindi, arabskiego)                       | Średni           |
| **Potok wieloetapowy**    | Połączenie istniejących silników w niestandardowej kolejności                           | Początkujący     |

```
┌─────────────────────────────────────────────────────────────┐
│                    Strategia kompresji                       │
│                                                              │
│   Wiadomości wejściowe ─▶ getEffectiveMode() ─▶ tryb        │
│                                              │               │
│                      ┌───────────────────────┼──────────┐    │
│                      │         │         │         │    │    │
│                      ▼         ▼         ▼         ▼    │    │
│                   "rtk"    "lite"   "standard" "stacked"    │
│                      │         │         │         │    │    │
│                      ▼         ▼         ▼         ▼    │    │
│                   RTK       Lite     Caveman   engines[]   │
│                   silnik    silnik   silnik    połączone   │
│                      │         │         │         │    │    │
│                      └─────────┴─────────┴─────────┘    │    │
│                                      │                    │
│                                      ▼                    │
│                              Skompresowany wynik           │
└─────────────────────────────────────────────────────────────┘

Selektor strategii DZIAŁA NA PODSTAWIE TRYBU: każde żądanie wybiera JEDEN tryb
(rtk / lite / standard / aggressive / ultra / stacked / off).
Tylko tryb "stacked" łączy kolejno wiele silników.
Domyślnym trybem automatycznego wyzwalania jest "lite" (a nie 3-poziomowy łańcuch priorytetów).
```

---

## Tworzenie niestandardowego silnika kompresji

Interfejs silnika (`open-sse/services/compression/engines/types.ts`) stanowi kontrakt, który musi spełnić każdy silnik. Zawiera 5 wymaganych metod.

### Interfejs `CompressionEngine`

```ts
interface CompressionEngine {
  id: string; // Unikatowy identyfikator silnika
  name: string; // Nazwa wyświetlana
  description: string; // Krótki opis
  icon: string; // Ikona (emoji lub adres URL)
  targets: CompressionEngineTarget[]; // ["messages", "tool_results", "code_blocks"]
  stackable: boolean; // Czy może być używany w potoku wieloetapowym
  stackPriority: number; // Kolejność w potokach wieloetapowych (niższa wartość = wcześniej)
  metadata: CompressionEngineMetadata;

  apply(body, options?): CompressionResult;
  compress(body, config?): CompressionResult;
  getConfigSchema(): EngineConfigField[];
  validateConfig(config): EngineValidationResult;
}
```

### Minimalny przykład: silnik usuwający nadmiarowe białe znaki

Najprostszy możliwy silnik — usuwa dodatkowe białe znaki z wiadomości.

````ts
import type { CompressionEngine } from "omniroute/compression/engines/types";
import { registerCompressionEngine } from "omniroute/compression/engines/registry";

function preserveCodeBlocks(text: string): string {
  // Podziel według znaczników bloków kodu i zachowaj znajdujące się w nich białe znaki
  const parts = text.split(/(```[\s\S]*?```)/);
  return parts
    .map((part) => {
      if (part.startsWith("```")) {
        return part; // Nie modyfikuj bloków kodu
      }
      return part.replace(/\n{3,}/g, "\n\n"); // Zastosuj tylko do tekstu opisowego
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
  stackPriority: 100, // Uruchom PO caveman/rtk

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

    // Przejdź przez tablicę wiadomości — obsłuż zarówno zawartość tekstową, jak i wieloczęściową
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
      // Zawartość wieloczęściowa: przejdź przez części i kompresuj tylko części tekstowe
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
          return part; // zachowaj image_url, tool_use itp.
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

// Zarejestruj globalnie
registerCompressionEngine(whitespaceEngine);
````

### Gdzie umieścić niestandardowe silniki

```
~/.omniroute/compression/engines/my-engine.ts    # Poziom użytkownika
<project>/compression-engines/my-engine.ts        # Poziom projektu (ładowany podczas uruchamiania)
```

Możesz też załadować je programowo z wtyczki:

```ts
// W Twojej wtyczce
import {
  registerCompressionEngine,
  unregisterCompressionEngine,
} from "@omniroute/open-sse/services/compression/engines/registry";
import { myEngine } from "./engines/my-engine";

export default definePlugin({
  name: "my-compression-plugin",
  // SDK wtyczek udostępnia punkty zaczepienia onRequest / onResponse / onError. Zarejestruj
  // silnik podczas ładowania modułu wtyczki (lub przy pierwszym onRequest); wyrejestruj go
  // we własnej procedurze zamykania.
  onRequest: async (ctx) => {
    registerCompressionEngine(myEngine);
  },
});

// Podczas zamykania:
// unregisterCompressionEngine("my-engine");
```

### Testowanie silnika

Zarejestruj silnik we wtyczce lub funkcji uruchamianej podczas startu. Po rejestracji silnik będzie dostępny
w selektorze strategii za pośrednictwem swojego `id`. Przetestuj integrację, umieszczając go w potoku złożonym:

---

## Tworzenie pakietów językowych

Kompresja w stylu telegraficznym wykorzystuje **pakiety reguł specyficzne dla języka**, aby obsługiwać wyrażenia wypełniające, asekuracyjne oraz rozwlekłe konstrukcje w każdym języku naturalnym. OmniRoute jest dostarczany z **6 pakietami językowymi**: `en`, `es`, `fr`, `de`, `ja`, `pt-BR`.

### Struktura pakietu

Pakiet językowy jest katalogiem zawierającym **pliki JSON** w lokalizacji `open-sse/services/compression/rules/<language>/`:

```
open-sse/services/compression/rules/
├── en/
│   ├── filler.json          # Zwroty grzecznościowe, asekuracyjne i uprzejmości
│   ├── context.json         # Reguły redukujące kontekst
│   ├── dedup.json           # Reguły deduplikacji
│   ├── structural.json      # Interpunkcja, formatowanie
│   └── ultra.json           # Reguły agresywnej kompresji
├── es/  (ta sama struktura)
├── fr/  (ta sama struktura)
├── de/  (ta sama struktura)
├── ja/  (ta sama struktura)
└── pt-BR/ (ta sama struktura)
```

### Budowa reguły

Każda reguła ma następującą postać (z pliku `open-sse/services/compression/ruleLoader.ts`):

```ts
interface FileRule {
  name: string; // Nazwa czytelna dla człowieka (kebab-case)
  pattern: string; // Wzorzec wyrażenia regularnego JavaScript
  replacement?: string; // Tekst, którym należy zastąpić dopasowanie
  replacementMap?: Record<string, string>; // LUB mapa klucz→zamiennik
  flags?: string; // Flagi wyrażenia regularnego (zwykle „gi”)
  context?: "all" | "user" | "system" | "assistant";
  category?: "filler" | "context" | "structural" | "dedup" | "terse" | "ultra";
  minIntensity?: "lite" | "full" | "ultra"; // Pomiń poniżej tego poziomu intensywności
  description?: string; // Dokumentacja
}
```

### Przykład: dodawanie reguł usuwania wypełniaczy w języku hindi

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

Pakiety reguł są podczas ładowania sprawdzane względem `_schema.json`. Pakiet o nieprawidłowej strukturze nie zostanie załadowany, a błąd zostanie zapisany w dzienniku:

```
RULE_LOADER: pack "hi/filler.json" failed validation:
  - rules.0.pattern: Invalid regex
  - rules.1.context: must be one of [all, user, system, assistant]
```

Walidacja jest uruchamiana automatycznie podczas ładowania pakietu (względem `_schema.json`); nieprawidłowy pakiet zostaje odrzucony, a powyższy błąd jest zapisywany w dzienniku. Nie istnieje osobny skrypt `npm run` do walidacji pakietu — załaduj pakiet (np. uruchamiając serwer lub wykonując ścieżkę kompresji) i obserwuj dzienniki.

### Ładowanie niestandardowego pakietu językowego

```ts
import { loadRulePack } from "omniroute/compression/ruleLoader";

await loadRulePack("./my-custom-rules/hi/filler.json");
```

Możesz również umieścić go w rozpoznawanej lokalizacji:

```
~/.omniroute/compression/rules/hi/filler.json  # Poziom użytkownika
```

### Najlepsze praktyki dotyczące pakietów językowych

1. **Zacznij od `filler`** — te reguły mają największy wpływ
2. **Używaj `minIntensity`** do ograniczania agresywnych reguł — chroni to przed nadmierną kompresją
3. **Uwzględniaj przypadki testowe** — dodaj tablicę `tests[]` w pliku JSON, aby zweryfikować działanie
4. **Kolejność ma znaczenie** — wcześniejsze reguły są stosowane jako pierwsze; reguły o największym wpływie umieszczaj na początku
5. **Zachowaj ostrożność przy `replacement`** — pusty ciąg znaków jest zwykle właściwym wyborem; nigdy nie wprowadzaj nowej treści

### Strategia tłumaczenia

Podczas lokalizowania pakietów reguł dla nowego języka:

1. **Przetłumacz nazwy reguł** — pojawiają się one w danych diagnostycznych
2. **Dostosuj wzorce wyrażeń regularnych** — bezpośrednie tłumaczenie często nie działa (granice słów różnią się między językami)
3. **Testuj na rzeczywistych rozmowach** — pakiet powinien działać bezpiecznie na rzeczywistych danych wejściowych
4. **Uwzględniaj konwencje kulturowe** — na przykład pakiety japońskie zawierają więcej honoratywnych wyrażeń wypełniających niż angielskie

---

## Potoki warstwowe

**Potok warstwowy** uruchamia wiele silników sekwencyjnie, a dane wyjściowe każdego silnika są przekazywane do następnego. Tak właśnie działa wewnętrznie `mode: stacked`.

### Jak działa przetwarzanie warstwowe

```
Dane wejściowe (10 000 tokenów)
        │
        ▼
   ┌──────────┐
   │  Silnik  │  priorytet 10
   │  A       │  ──▶ wynik: 6000 tokenów (-40%)
   └────┬─────┘
        ▼
   ┌──────────┐
   │  Silnik  │  priorytet 50
   │  B       │  ──▶ wynik: 2400 tokenów (-60%)
   └────┬─────┘
        ▼
   ┌──────────┐
   │  Silnik  │  priorytet 100
   │  C       │  ──▶ wynik: 1200 tokenów (-80%)
   └────┬─────┘
        │
        ▼
Wynik końcowy (1200 tokenów, łącznie ~88% oszczędności)
```

Po wybraniu `mode: "stacked"` silniki są uruchamiane sekwencyjnie, w kolejności określonej w tablicy `pipeline`.
Dane wyjściowe silnika N stają się danymi wejściowymi silnika N+1.

### Tryby kompresji

OmniRoute wybiera **JEDEN tryb dla każdego żądania** na podstawie konfiguracji, progów automatycznego uruchamiania i nadpisań kombinacji.
Dostępne tryby są zdefiniowane w `open-sse/services/compression/types.ts` (typ `CompressionMode`):

| Tryb         | Silniki              | Zastosowanie                                                                                                                                                                                                                      |
| ------------ | -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `off`        | Brak                 | Wyłączenie całej kompresji                                                                                                                                                                                                        |
| `rtk`        | Tylko RTK            | Sesje z dużą ilością danych wyjściowych poleceń (ponad 80% oszczędności)                                                                                                                                                          |
| `lite`       | Tylko Lite           | Zachowawcza kompresja (szybka i bezpieczna)                                                                                                                                                                                       |
| `standard`   | Caveman              | Kompresja prozy za pomocą pakietów językowych                                                                                                                                                                                     |
| `aggressive` | Caveman + Aggressive | Agresywna kompresja prozy + agresywne przetwarzanie końcowe                                                                                                                                                                       |
| `ultra`      | Ultra                | Maksymalna kompresja (stratna, używana w ostateczności). Opcjonalnie kierowana przez silnik SLM **LLMLingua-2**, gdy ustawiono `ultra.modelPath` (w razie niedostępności modelu następuje powrót do ścieżki opartej na regułach). |
| `stacked`    | Niestandardowy potok | Łączenie silników w dowolnej kolejności (patrz poniżej)                                                                                                                                                                           |

> Oprócz powyższych silników trybów rejestr zawiera również wyspecjalizowane silniki, które można łączyć warstwowo —
> **CCR**, **headroom**, **ionizer** i **session-dedup** — opisane w
> [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md#additional-built-in-engines).

Wybór trybu jest określany przez `getEffectiveMode()` w `open-sse/services/compression/strategySelector.ts`:

1. Jeśli kompresja jest wyłączona: `"off"`
2. Jeśli istnieje nadpisanie kombinacji: użyj nadpisania
3. Jeśli próg automatycznego uruchamiania został przekroczony: użyj `autoTriggerMode` (domyślnie: `"lite"`)
4. W przeciwnym razie: użyj `defaultMode`

### Domyślny potok warstwowy

Gdy jawnie skonfigurowano `mode: "stacked"`, domyślny potok składa się z:

1. **RTK** — usuwa zbędne elementy z danych wyjściowych poleceń (~80% oszczędności dla danych wyjściowych terminala)
2. **Caveman** — usuwa wypełniacze i upraszcza prozę (~46% dla pozostałego tekstu)
3. **Lite** — końcowy etap usuwania zbędnych białych znaków i duplikatów

Ta kompozycja pozwala uzyskać **78–95% oszczędności** w sesjach intensywnie korzystających z narzędzi.

### Konfigurowanie potoków warstwowych

W konfiguracji kombinacji:

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

Można pomijać silniki, dodawać niestandardowe lub zmieniać ich kolejność.

### Przekazywanie stanu

Silniki mogą odczytywać metadane z kontekstu żądania (w `options`):

```ts
compress(body, config) {
  // Odczyt metadanych z poprzednich silników
  const original = options?.compressionComboId;  // "my-coding-combo"
  // ...
}
```

Metadane są **tylko do odczytu** — silniki nie mogą modyfikować kontekstu żądania, a jedynie własne dane wyjściowe treści.

### Pułapki związane z kolejnością wykonywania

| Kolejność silników                          | Efekt                                                                                                  |
| ------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| RTK → Caveman → Lite                        | **Zalecana** (najpierw usuwa zbędne elementy, potem upraszcza język, a na końcu usuwa białe znaki)     |
| Lite → RTK → Caveman                        | Zła — Lite usuwa białe znaki z surowych danych wyjściowych, przez co dopasowywanie wzorców RTK zawodzi |
| Caveman → RTK                               | Zła — Caveman może przekształcić tekst w sposób, którego RTK nie rozpoznaje                            |
| Dowolna kolejność z `tool_results` najpierw | Lepsza — dane wyjściowe narzędzi zawierają najwięcej zbędnych elementów                                |

### Kiedy NIE stosować przetwarzania warstwowego

Przetwarzanie warstwowe nie zawsze jest lepsze:

- **Proste wiadomości** (bez danych wyjściowych narzędzi) — wystarczy sam Caveman lub Lite
- **Wrażliwość na koszty** — każdy silnik zwiększa opóźnienie o ~5–50 ms
- **Konkretne narzędzia** — sam RTK zwykle wystarcza w przypadku danych wyjściowych powłoki

### Tworzenie niestandardowego potoku

Nie istnieje rejestr nazwanych potoków. Potok warstwowy to po prostu **wbudowana tablica
kroków** przekazywana do `applyStackedCompression()` (eksportowanej z
`@omniroute/open-sse/services/compression/strategySelector`):

```ts
import { applyStackedCompression } from "@omniroute/open-sse/services/compression/strategySelector";

const result = applyStackedCompression(body, [
  { engine: "rtk", intensity: "aggressive" },
  { engine: "caveman", intensity: "full" },
]);
```

Jeśli nie przekażesz potoku, domyślnie używany jest `rtk(standard) → caveman(full)`.

Aby sterować nim z poziomu konfiguracji, ustaw `mode: "stacked"` i podaj tablicę kroków w
`stackedPipeline` (odczytywaną z `config.stackedPipeline`):

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

## Zasady synchronizacji z projektami upstream

Silniki kompresji OmniRoute wskazują w README kilka projektów upstream jako źródła inspiracji
(„inspired by RTK, Caveman, LLMLingua-2, Troglodita”). Częste pytanie od współtwórców
brzmi: **gdy upstream RTK dodaje nowy filtr narzędzia albo Caveman dodaje pakiet
reguł, w jaki sposób trafia to do OmniRoute?** Ta sekcja stanowi wiążącą odpowiedź.

### Kopie vendored a niezależne implementacje

| Silnik                       | Relacja z upstream                                                                                                                | Lokalizacja                                                         |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| **RTK**                      | **Niezależna reimplementacja** (inspirowana projektem, a nie jego kopia)                                                          | `open-sse/services/compression/engines/rtk/`                        |
| **Caveman**                  | **Niezależna reimplementacja** (inspirowana projektem)                                                                            | `open-sse/services/compression/engines/cavemanAdapter.ts`           |
| **Headroom**                 | Głównie wewnętrzny; tylko kodek `gcf/` jest **faktycznie vendored** z `gcf-typescript` (MIT, oznaczony SPDX, tylko profil ogólny) | `open-sse/services/compression/engines/headroom/gcf/`               |
| **LLMLingua-2 / Troglodita** | Inspirowane projektami (stanowią podstawę silników `llmlingua` + `session-dedup`)                                                 | `open-sse/services/compression/engines/llmlingua/`, `session-dedup` |

Najważniejsze: **RTK i Caveman to stworzone metodą clean-room implementacje
pomysłów w TypeScript (reguł filtrów i pakietów reguł), a nie drzewa kodu źródłowego
vendored.** Nie istnieje kopia upstream, z której można wykonać `git pull` — właśnie
dlatego README mówi „inspired by”, a nie „bundled”.

### Jak scalane są ulepszenia z upstream

**Nie ma automatycznego śledzenia wydań upstream ani etykiety `compression-sync`**
— jest tak celowo. Ponieważ silniki są reimplementacjami, filtr RTK lub pakiet
reguł Caveman z upstream nie jest scalany jako kod; jest **ponownie wyrażany jako
nowa reguła lub nowy filtr we własnym formacie OmniRoute** (zobacz
[COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md)) i trafia do projektu
doraźnie za pośrednictwem zwykłego PR. Powyższe punkty rozszerzeń (niestandardowy
silnik, pakiet językowy, filtr RTK) są zatwierdzonym sposobem wnoszenia takich zmian.

Najnowsze przykłady dokładnie takiego procesu:

- Filtry RTK dla danych wyjściowych kompilacji Gradle i `dotnet` (v3.8.42)
- Filtry RTK dla kubectl / docker-build / composer / gh (#2824)
- Indonezyjski pakiet językowy Caveman (#3975) oraz pakiety niemiecki / francuski / japoński / chiński

### Headroom (serwer proxy kompresji danych wejściowych)

Headroom jest **w pełni wewnętrzny** — obejmuje przypiętą migawkę kodeka `gcf`
vendored oraz własne warstwy OmniRoute: `smartcrusher` / `toon` / `tabular`. Nie
ma aktywnego upstream do śledzenia poza kopią vendored; aktualizacje `gcf` są
odświeżane ręcznie po zmianie kodeka i ponownie weryfikowane względem bramki
budżetu kompresji (`check:compression-budget`).

### Proponowanie ulepszenia inspirowanego upstream

1. **Nie twórz kopii vendored** — ponownie wyraź regułę lub filtr upstream w formacie OmniRoute.
2. Dodaj je za pośrednictwem odpowiedniego punktu rozszerzenia poniżej (pakietu
   językowego, filtra RTK lub niestandardowego silnika).
3. W opisie PR wskaż projekt upstream (uznanie autorstwa), zamiast kopiować jego
   kod źródłowy objęty licencją.
4. Dodaj testy i potwierdź, że bramka `check:compression-budget` nadal przechodzi.

---

## Dodawanie stylu wyjściowego

Style wyjściowe (zobacz [tabelę katalogu w przewodniku](./COMPRESSION_GUIDE.md#output-styles-catalog))
są odpowiednikiem silników wejściowych po stronie odpowiedzi: zamiast kompresować to, co
wysyłasz, instruują model, aby generował tańsze odpowiedzi. Rejestr to
`OUTPUT_STYLE_CATALOG` w `open-sse/services/compression/outputStyles/catalog.ts`, a
**jeden wpis katalogu stanowi całą funkcję**: moduł wstrzykujący, panel ustawień pulpitu,
mechanizmy trwałego zapisu i telemetria korzystają z katalogu — nie ma żadnej innej listy do zaktualizowania.

1. **Dodaj jeden wpis do `OUTPUT_STYLE_CATALOG`** z polami `id`, `label`, `description` oraz
   trzema angielskimi `levels` (`lite`, `full`, `ultra`). Każdy poziom musi kończyć się
   `${SHARED_BOUNDARIES}`, aby kod, ścieżki, polecenia, błędy i adresy URL pozostały niezmienione.
   Tekst instrukcji musi być **statyczny i deterministyczny** dla każdej kombinacji
   `(id, level, language)` — `${SHARED_BOUNDARIES}` jest jedyną dozwoloną interpolacją.
2. **Przetłumacz go.** Dodaj co najmniej blok `pt-BR` w sekcji `i18n`; wzorcową strukturę stanowią
   `ponytail` oraz `i-have-adhd` (en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi). Styl celowo
   przeznaczony dla jednego języka określa zamiast tego `locale` (jak `terse-cjk` → `zh`) i jest wtedy
   oferowany wyłącznie dla tej lokalizacji.
3. **Zaktualizuj zabezpieczenie macierzy** — dodaj języki stylu do `BASELINE_LANGUAGES` w
   `tests/unit/compression/output-styles-i18n-matrix.test.ts`. Mechanizm kontrolny odrzuca każdy nowy
   styl bez ograniczenia lokalizacji, który nie ma wymaganych tłumaczeń, chyba że zawiera
   jawny wpis `KNOWN_ENGLISH_ONLY` z odnośnikiem do zgłoszenia.
4. **Dodaj test dla danego stylu** wzorowany na
   `tests/unit/compression/i-have-adhd-catalog.test.ts`: struktura katalogu, klauzula granic
   dla każdego poziomu oraz asercja kontrolna potwierdzająca, że każde tłumaczenie jest napisane
   we właściwym języku, a nie skopiowane z angielskiego.
5. **Atrybucja**: jeśli styl zaadaptowano z projektu zewnętrznego, wskaż jego autorów w komentarzu
   źródłowym przy wpisie (np. `i-have-adhd` → ayghri/i-have-adhd, MIT) — obowiązuje ta sama
   zasada co w sekcji „Proponowanie ulepszenia inspirowanego projektem zewnętrznym” powyżej.

Nie są wymagane żadne zmiany w interfejsie użytkownika, schemacie ani telemetrii — te elementy są generowane na podstawie katalogu.

---

## Najlepsze praktyki

### Tworzenie silników

1. **Zawsze implementuj `validateConfig`** — silniki bez walidacji powodują niewidoczne błędy
2. **Ustaw realistyczną wartość `targetLatencyMs`** — selektor strategii używa jej do wyboru silników
3. **Używaj `getConfigSchema` na potrzeby pulpitu** — nigdy nie ukrywaj konfiguracji przed użytkownikami
4. **Obsługuj `stackable: true`, jeśli silnik jest czysty** — silniki z efektami ubocznymi nie powinny być łączone
5. **Pisz testy wbudowane** — weryfikacja silników powinna zajmować mniej niż 1 s

### Tworzenie pakietów językowych

1. **Zacznij od intensywności `lite`** — reguły powinny być bezpieczne przy najniższym ustawieniu
2. **Używaj `context`, aby ograniczać zakres reguł** — reguły działające wyłącznie dla `user` nie mogą przypadkowo wpłynąć na prompty systemowe
3. **Unikaj przechwytywania kluczy JSON** — `\\bword\\b` może dopasować tekst wewnątrz JSON, uszkadzając dane strukturalne
4. **Testuj przypadki brzegowe** — puste dane wejściowe, Unicode, tekst RTL, emoji
5. **Używaj istniejących pakietów jako szablonów** — `en/filler.json` jest najbardziej rozbudowanym przykładem

### Projektowanie potoku

1. **Profiluj przed optymalizacją** — najpierw wykonaj pomiary za pomocą `compression_stats`
2. **Preferuj kompozycję zamiast ponownej implementacji** — rozszerzaj reguły Caveman, zanim napiszesz nowy silnik
3. **Dokumentuj uzasadnienie kolejności** — opisz w komentarzu, dlaczego silnik A znajduje się przed silnikiem B
4. **Testuj na wszystkich 3 poziomach intensywności** — `lite` jest szybki, ale stratny, natomiast `ultra` jest wolny, lecz precyzyjny

---

## Dokumentacja: wbudowane silniki

| ID silnika           | Łączalny | Domyślny stackPriority | Elementy docelowe                       |
| -------------------- | -------- | ---------------------- | --------------------------------------- |
| `lite`               | Tak      | 5                      | wiadomości, wyniki narzędzi             |
| `rtk`                | Tak      | 10                     | wyniki narzędzi                         |
| `standard` (caveman) | Tak      | 20                     | wiadomości, wyniki narzędzi, bloki kodu |
| `aggressive`         | Tak      | 30                     | wiadomości                              |
| `ultra`              | Tak      | 40                     | wiadomości, bloki kodu                  |

### Zobacz także

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — Omówienie potoku
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — Dokumentacja rejestru silników
- [COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md) — Specyfikacja formatu reguł
- [COMPRESSION_LANGUAGE_PACKS.md](./COMPRESSION_LANGUAGE_PACKS.md) — Szczegóły pakietów językowych
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — Silnik RTK i filtry niestandardowe
- Źródło: `open-sse/services/compression/` (117 plików, ~250 KB)
