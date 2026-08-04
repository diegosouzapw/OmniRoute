---
title: "Kompresja RTK"
version: 3.8.40
lastUpdated: 2026-06-28
---

# Kompresja RTK

Kompresja RTK to silnik kompresji OmniRoute świadomy poleceń, przeznaczony na wyjście terminala i narzędzi. Jest
zaprojektowany pod sesje agentów kodujących, w których większość wzrostu kontekstu pochodzi z logów testów, wyjścia builda,
szumu menedżerów pakietów, transkryptów shella, wyjścia Dockera, wyjścia gita oraz stack trace'ów.

RTK może działać bezpośrednio z `defaultMode: "rtk"` albo jako pierwszy krok w potoku stacked, zwykle:

```txt
rtk -> caveman
```

Ta kolejność najpierw kompresuje hałaśliwe wyjście maszynowe, a potem pozwala Cavemanowi skondensować pozostałą prozę.

Upstreamowy RTK raportuje `60-90%` oszczędności na wyjściu poleceń. Przykładowa sesja z jego README schodzi z
`~118,000` standardowych tokenów do `~23,900` tokenów RTK, czyli `79.7%` oszczędności (`~80%`). OmniRoute używa
tej upstreamowej średniej do kalkulacji oszczędności stacked z kompresją wejścia Cavemana:

```txt
RTK average:    80% saved
Caveman input: 46% saved
Stacked:       1 - (1 - 0.80) * (1 - 0.46) = 89.2% saved
Range:         1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

## Co kompresuje

Wbudowany katalog obecnie dostarcza 49 filtrów w tych kategoriach:

| Kategoria | Przykłady                                                     |
| --------- | ------------------------------------------------------------- |
| `git`     | `git status`, `git branch`, `git diff`, `git log`             |
| `test`    | Vitest, Jest, Pytest, Playwright, Go tests, Cargo tests       |
| `build`   | TypeScript, ESLint, Biome, Prettier, Vite, Webpack, Turbo, Nx |
| `package` | `npm install`, `npm audit`, `pip`, `uv sync`, Poetry, Bundler |
| `shell`   | `ls`, `find`, `grep`, generyczne logi shella                  |
| `docker`  | `docker ps`, logi Dockera                                     |
| `infra`   | Terraform, OpenTofu, `systemctl status`                       |
| `generic` | wyjście JSON, stack trace'y, generyczny fallback wyjścia      |

Detektor w `open-sse/services/compression/engines/rtk/commandDetector.ts` klasyfikuje wyjście
przed wyborem filtra. Filtry mogą też matchować po wzorcu polecenia lub regexie wyjścia, gdy klasa
polecenia nie wystarcza.

## Rozwiązywanie filtrów

RTK ładuje filtry w tej kolejności:

1. Filtry projektu z `.rtk/filters.toml` i `.rtk/filters.json`, tylko gdy zaufane.
2. Filtry globalne z `DATA_DIR/rtk/filters.toml` i `DATA_DIR/rtk/filters.json`.
3. Filtry wbudowane z `open-sse/services/compression/engines/rtk/filters/`.

W tym samym zakresie filtry RTK TOML schema v1 mają pierwszeństwo przed filtrami JSON OmniRoute. Wyrażenia TOML
`match_command` są sprawdzane przed matchowaniem typu polecenia, więc zaimportowany filtr specyficzny dla polecenia
może nadpisać szerszy filtr w tym zakresie. Zakres projektu nadal ma pierwszeństwo przed zakresem globalnym,
niezależnie od formatu pliku.

Filtry projektu są celowo objęte bramką zaufania, bo filtry regex mogą zmienić sposób, w jaki wyjście narzędzi jest
pokazywane agentom. Plik filtrów projektu jest akceptowany, gdy spełniony jest jeden z warunków:

- `rtkConfig.trustProjectFilters` ma wartość `true`.
- Ustawiono `OMNIROUTE_RTK_TRUST_PROJECT_FILTERS=1`.
- `.rtk/trust.json` zawiera pasujący hash SHA-256 pliku filtrów projektu.

Przykład pliku trust:

```json
{
  "filtersSha256": "0123456789abcdef...",
  "filtersTomlSha256": "fedcba9876543210..."
}
```

Hashe są osobne: `filtersSha256` ufa `.rtk/filters.json`, a `filtersTomlSha256`
ufa `.rtk/filters.toml`. Edycja któregokolwiek pliku unieważnia tylko jego własny wpis trust. Pliki globalne
są instalowane przez administratora i używają istniejącego zachowania zaufania filtrów globalnych.

Własne filtry mogą być jednym obiektem filtra albo tablicą obiektów filtrów. Nieprawidłowe własne filtry są
pomijane i raportowane w diagnostyce `/api/context/rtk/filters`. Nieprawidłowe filtry wbudowane failują od razu.

## Zgodność z RTK TOML schema v1

OmniRoute potrafi parsować, walidować, testować i instalować deklaratywne pliki filtrów w RTK TOML schema v1.
Obsługiwane pola to `description`, `match_command`, `strip_ansi`, `filter_stderr`,
`strip_lines_matching`, `keep_lines_matching`, `replace`, `match_output`, `truncate_lines_at`,
`head_lines`, `tail_lines`, `max_lines`, `on_empty` oraz inline testy `[[tests.<filter>]]`.
Nieznane pola, nieprawidłowe lub niebezpieczne wyrażenia regularne, jednoczesne reguły strip/keep, pliki powyżej
1 MiB oraz odwołania do nieznanych filtrów są odrzucane. Plik, którego inline testy padają, można
zwalidować do podglądu, ale nie da się go zainstalować ani załadować. Błędy ładowania plików custom pozostają
fail-open: nieprawidłowy plik jest pomijany, a pozostałe filtry działają dalej.

OmniRoute otrzymuje wyjście narzędzi dopiero po tym, jak klient je już przechwycił, więc `filter_stderr = true`
nie może zmienić przechwycenia procesu. Pole jest akceptowane jako no-op, a walidacja zwraca ostrzeżenie.
To jest celowo opisane jako **zgodność z RTK TOML schema v1**, a nie pełna zgodność
z executablami RTK, hookami shella, implementacjami poleceń w Rust ani układem trust-store.

Zaawansowany widok RTK w dashboardzie przyjmuje wklejony lub wgrany TOML. Walidacja jest tylko do odczytu.
Instalacja zapisuje `DATA_DIR/rtk/filters.toml` atomowo z restrykcyjnymi uprawnieniami i odświeża
żywy katalog filtrów bez restartu. Zastąpienie istniejącego pliku wymaga jawnego potwierdzenia `overwrite`
i najpierw tworzy `DATA_DIR/rtk/filters.toml.bak`.

## DSL filtrów

Filtry używają schematu JSON opisanego w [Compression Rules Format](./COMPRESSION_RULES_FORMAT.md).
Runtime stosuje te etapy w kolejności:

```txt
stripAnsi -> filterStderr -> replace -> matchOutput -> drop/include lines
  -> truncateLineAt -> head/tail/maxLines -> onEmpty
```

Ważne pola:

| Pole                         | Przeznaczenie                                                      |
| ---------------------------- | ------------------------------------------------------------------ |
| `rules.stripAnsi`            | Usuwa sekwencje kolorów/kontroli terminala przed matchowaniem      |
| `rules.filterStderr`         | Normalizuje typowe prefiksy stderr przed matchowaniem/filtrowaniem |
| `rules.replace`              | Stosuje uporządkowane zamiany regex                                |
| `rules.matchOutput`          | Zwraca zwięzłe podsumowanie, gdy wyjście pasuje do znanego warunku |
| `rules.matchOutput[].unless` | Pomija skrót, gdy obecny jest wzorzec błędu/porażki                |
| `rules.dropPatterns`         | Usuwa hałaśliwe linie                                              |
| `rules.includePatterns`      | Preferuje linie możliwe do działania                               |
| `rules.collapsePatterns`     | Zwija powtarzające się pasujące linie                              |
| `rules.deduplicate`          | Per-filter opt-in: zwija kolejne zduplikowane linie                |
| `rules.truncateLineAt`       | Bezpieczne dla Unicode obcinanie per linia                         |
| `rules.onEmpty`              | Komunikat fallback, gdy wszystkie linie zostaną odfiltrowane       |
| `tests[]`                    | Inline sample'e używane przez verify gate                          |

Od filtrów wbudowanych oczekuje się inline sample'i `tests[]`. Własne filtry też powinny je zawierać,
zwłaszcza gdy są współdzielone między projektami.

## Deduplikacja linii (dwie warstwy)

RTK zwija zduplikowane linie na dwóch niezależnych warstwach:

1. **Per-filter `deduplicate` (opt-in, domyślnie `false`).** Filtr może ustawić `rules.deduplicate: true`,
   aby zwinąć kolejne zduplikowane linie _wewnątrz dopasowanego wyjścia tego filtra_, przed obcięciem.
   Działa to wewnątrz `lineFilter.ts`. Dla legacy filtrów jest włączane automatycznie, gdy filtr definiuje
   `collapsePatterns`. Schemat: `deduplicate: z.boolean().default(false)` w
   `open-sse/services/compression/engines/rtk/filterSchema.ts`.
2. **Engine-wide `deduplicateThreshold` (domyślnie `3`).** Po uruchomieniu wszystkich filtrów silnik zwija
   każdą serię `>= deduplicateThreshold` identycznych kolejnych linii w całym wyniku
   (`deduplicateRepeatedLines`, stosowane w `engines/rtk/index.ts`). Wartość jest ograniczona do 2–100 przy
   normalizacji.

Pass per filtr działa najpierw (wewnątrz filtra), pass w skali silnika na końcu (na połączonym
wyjściu), więc obie warstwy składają się bez podwójnego liczenia.

## Grupowanie linii (`enableGrouping`)

Gdy `rtkConfig.enableGrouping` ma wartość `true` (domyślnie `false`), RTK uruchamia dodatkowy pass `groupSimilarLines`
na wyniku po deduplikacji, który zwija serie _blisko równoważnych_ (nie identycznych bajtowo)
kolejnych linii. `rtkConfig.groupingThreshold` (domyślnie `3`) to minimalna długość serii uruchamiająca
grupowanie. To strukturalny odpowiednik `deduplicateThreshold`: dedup obsługuje dokładne powtórzenia,
grupowanie obsługuje „ten sam kształt z małymi różnicami". Oba flagi są częścią JSON `rtkConfig`
persystowanego w tabeli `key_value` (zob. Konfiguracja wyżej), więc ustawienie przetrwa restarty.

## Usuwanie komentarzy w kodzie (`stripCodeComments` / `preserveDocstrings`)

Gdy włączone jest `rtkConfig.applyToCodeBlocks`, RTK może też usuwać komentarze z fenced code blocks:

- `stripCodeComments` (domyślnie `false`) — opt-in. Gdy `true`, RTK usuwa komentarze z fenced blocks JavaScript
  i TypeScript. Flaga historycznie była odczytywana, ale nigdy nie stosowana, więc domyślnie pozostaje
  „preserve", by uniknąć cichej zmiany produkcyjnej.
- `preserveDocstrings` (domyślnie `true`) — przy usuwaniu komentarzy bloki JSDoc/`/** … */` są
  zachowywane (niosą dokumentację API wartą więcej niż kosztowane bajty). Ustaw `false`, aby
  usuwać także je.

Usuwanie komentarzy jest zaimplementowane w `open-sse/services/compression/engines/rtk/codeStripper.ts`. Używa
**parsera TypeScript** (nie regexa), więc literały string, template i regex nigdy nie są mylone
z komentarzami, a przy wykryciu JSX całkowicie się wycofuje (więc komentarze w expression-container JSX nie są
nigdy psute). Usuwanie komentarzy dotyczy obecnie **tylko JavaScript i TypeScript** — inne
języki w zbiorze `CodeLanguage` strippera (Python, Rust, Go, Ruby, Java) mają zwijanie pustych linii i
białych znaków, ale bez usuwania komentarzy. Przebieg stripped-block jest tagowany `rtk:code-strip` w
`rulesApplied`.

> **Uwaga — GCF / tabular encoding to osobny silnik.** RTK **nie** zawiera tabularnego/kolumnowego enkodera JSON „GCF"
> (Graph Compact Format). Ten enkoder — który zastąpił starszy
> enkoder `omni-tabular` — żyje w silniku **headroom**
> (`open-sse/services/compression/engines/headroom/`, z vendored codec pod
> `headroom/gcf/`). Nie jest związany z potokiem filtrów RTK opisanym tutaj.

## Konfiguracja

Ustawienia globalne są dostępne przez `/api/settings/compression`. Ustawienia specyficzne dla RTK są też
dostępne przez `/api/context/rtk/config`.

```json
{
  "defaultMode": "stacked",
  "autoTriggerMode": "stacked",
  "autoTriggerTokens": 32000,
  "stackedPipeline": [
    { "engine": "rtk", "intensity": "standard" },
    { "engine": "caveman", "intensity": "full" }
  ],
  "rtkConfig": {
    "enabled": true,
    "intensity": "standard",
    "applyToToolResults": true,
    "applyToCodeBlocks": false,
    "applyToAssistantMessages": false,
    "enabledFilters": [],
    "disabledFilters": [],
    "maxLinesPerResult": 120,
    "maxCharsPerResult": 12000,
    "deduplicateThreshold": 3,
    "customFiltersEnabled": true,
    "trustProjectFilters": false,
    "rawOutputRetention": "never",
    "rawOutputMaxBytes": 1048576,
    "enableGrouping": false,
    "groupingThreshold": 3,
    "stripCodeComments": false,
    "preserveDocstrings": true
  }
}
```

`enabledFilters` i `disabledFilters` używają id filtrów, na przykład `test-vitest` lub `git-diff`.

Pełny kształt `rtkConfig` definiują `RtkConfig` / `DEFAULT_RTK_CONFIG` w
`open-sse/services/compression/types.ts`. Cały obiekt jest persystowany jako pojedyncza wartość JSON w
tabeli SQLite `key_value` pod `namespace = "compression"`, `key = "rtkConfig"`
(`src/lib/db/compression.ts`) i normalizowany przy odczycie przez `normalizeRtkConfig`. Zatem każde pole poniżej
— w tym `enableGrouping`, `groupingThreshold`, `stripCodeComments` i `preserveDocstrings` —
przechodzi round-trip przez ten sam store i przetrwa restart.

| Klucz                  | Domyślnie | Przeznaczenie                                                                       |
| ---------------------- | --------- | ----------------------------------------------------------------------------------- |
| `deduplicateThreshold` | `3`       | W skali silnika: min. kolejnych identycznych linii do zwinięcia (ograniczone 2–100) |
| `enableGrouping`       | `false`   | Opt-in: zwijaj serie blisko równoważnych kolejnych linii                            |
| `groupingThreshold`    | `3`       | Min. seria podobnych linii uruchamiająca grupowanie                                 |
| `stripCodeComments`    | `false`   | Opt-in: usuwaj komentarze z fenced code blocks (wymaga `applyToCodeBlocks`)         |
| `preserveDocstrings`   | `true`    | Przy usuwaniu komentarzy zachowuj bloki JSDoc/`/** … */`                            |

## API

| Trasa                              | Metoda | Przeznaczenie                                      |
| ---------------------------------- | ------ | -------------------------------------------------- |
| `/api/context/rtk/config`          | GET    | Odczyt konfiguracji RTK                            |
| `/api/context/rtk/config`          | PUT    | Aktualizacja konfiguracji RTK                      |
| `/api/context/rtk/filters`         | GET    | Lista katalogu filtrów i diagnostyki ładowania     |
| `/api/context/rtk/import`          | POST   | Walidacja lub instalacja plików RTK TOML schema v1 |
| `/api/context/rtk/test`            | POST   | Podgląd kompresji RTK dla jednego payloadu tekstu  |
| `/api/context/rtk/raw-output/[id]` | GET    | Odczyt zachowanego zredagowanego surowego wyjścia  |
| `/api/compression/preview`         | POST   | Podgląd dowolnego trybu kompresji                  |

Payload testu RTK:

```json
{
  "command": "npm test",
  "text": "FAIL tests/example.test.ts\nAssertionError: expected true\nTest Files 1 failed",
  "config": {
    "intensity": "standard"
  }
}
```

Payload podglądu kompresji:

```json
{
  "mode": "stacked",
  "messages": [
    {
      "role": "tool",
      "content": "FAIL tests/example.test.ts\nAssertionError: expected true\nTest Files 1 failed"
    }
  ],
  "config": {
    "rtkConfig": {
      "rawOutputRetention": "failures"
    }
  }
}
```

Trasy management wymagają dashboard management auth albo pasującej polityki klucza API.

Payload walidacji RTK TOML:

```json
{
  "action": "validate",
  "content": "schema_version = 1\n\n[filters.my-tool]\nmatch_command = \"^my-tool\\\\b\"\nmax_lines = 20\n"
}
```

Użyj `"action": "install"`, aby zainstalować zwalidowany plik globalnie. Dodaj `"overwrite": true` tylko
po przejrzeniu i potwierdzeniu zastąpienia istniejącego pliku globalnego.

## Odzyskiwanie surowego wyjścia

RTK normalnie zwraca tylko skompresowany tekst. Do debugowania `rawOutputRetention` może zachować zredagowane
surowe wyjście:

| Wartość    | Zachowanie                                                   |
| ---------- | ------------------------------------------------------------ |
| `never`    | Nie zachowuj surowego wyjścia                                |
| `failures` | Zachowuj tylko prawdopodobne wyjście porażki                 |
| `always`   | Zachowuj każde skompresowane surowe wyjście RTK, po redakcji |

Zachowane pliki są zapisywane pod:

```txt
DATA_DIR/rtk/raw-output/
```

Sekrety są redagowane przed persystencją, w tym typowe bearer tokeny, klucze API, tokeny Slack,
klucze dostępu AWS oraz wartości w stylu przypisania `token=...`, `secret=...`, `password=...`. Analityka
przechowuje tylko pointer id, rozmiar i metadane hasha.

## Verify Gate

Skupiony verify gate uruchamia wbudowane inline testy filtrów bez odpalania zewnętrznych poleceń:

```bash
node --import tsx/esm --test tests/unit/compression/rtk-verify.test.ts
```

Szerszy gate RTK to:

```bash
node --import tsx/esm --test \
  tests/unit/compression/rtk-*.test.ts \
  tests/unit/compression/pipeline-integration.test.ts \
  tests/unit/compression/context-compression-api.test.ts
```

Przed releasem uruchom szeroki gate kompresji:

```bash
node --import tsx/esm --test \
  tests/unit/compression/*.test.ts \
  tests/golden-set/*.test.ts \
  tests/integration/compression-pipeline.test.ts \
  tests/unit/api/compression/compression-api.test.ts
```

## Rozszerzanie RTK

1. Dodaj lub zaktualizuj plik JSON filtra.
2. Dołącz co najmniej jeden sample `tests[]`, który udowadnia istotne zachowanie.
3. Dodaj fixture pod `tests/unit/compression/fixtures/rtk/` dla nowych rodzin poleceń.
4. Dodaj pokrycie detekcji poleceń przy wprowadzaniu nowej klasy wyjścia.
5. Uruchom verify i szerokie gate'y RTK.
6. Jeśli filtr jest lokalny dla projektu, commitnij `.rtk/filters.json` i odśwież `.rtk/trust.json` dopiero po review.

---

## Poziomy intensywności (v3.8.16+)

RTK wspiera **3 poziomy intensywności**, które balansują między **agresywnością kompresji** a **bezpieczeństwem**. Poziom
ustawia się przez `config.intensity` w konfiguracji silnika.

### 3 poziomy

| Poziom               | Próg obcinania     | Oszczędność tokenów | Ryzyko        | Najlepsze do                      |
| -------------------- | ------------------ | ------------------- | ------------- | --------------------------------- |
| `minimal`            | 24 linii na sekcję | ~20-40%             | Bardzo niskie | Produkcja z krytycznym kontekstem |
| `standard` (default) | 24 linii na sekcję | ~50-70%             | Niskie        | Codzienne sesje kodowania         |
| `aggressive`         | 16 linii na sekcję | ~70-90%             | Średnie       | Długie sesje, max oszczędności    |

### Gdzie następuje obcinanie

Próg obcinania wpływa na `lineFilter.ts`:

```ts
// From open-sse/services/compression/engines/rtk/index.ts:329-330
config.intensity === "aggressive" ? 16 : 24,
config.intensity === "aggressive" ? 16 : 24,
```

Zachowywane są zarówno **head**, jak i **tail** każdej sekcji; środkowa treść jest usuwana, gdy rusza obcinanie.

### Co zostaje, a co jest wycinane

| Treść                      | minimal      | standard     | aggressive   |
| -------------------------- | ------------ | ------------ | ------------ |
| Błędy / stack trace'y      | ✅ zachowane | ✅ zachowane | ✅ zachowane |
| Porażki testów             | ✅ zachowane | ✅ zachowane | ✅ zachowane |
| Błędy builda               | ✅ zachowane | ✅ zachowane | ✅ zachowane |
| Przejścia testów (verbose) | ✅ zachowane | 🟡 zwinięte  | 🟡 zwinięte  |
| Rutynowe wyjście (info)    | 🟡 zwinięte  | 🟡 zwinięte  | ❌ usunięte  |
| Paski postępu              | 🟡 zwinięte  | ❌ usunięte  | ❌ usunięte  |
| Banner / ASCII art         | 🟡 zwinięte  | ❌ usunięte  | ❌ usunięte  |

### Wybór właściwej intensywności

```
                  Is losing context catastrophic?
                  │
      ┌───────────┼───────────┐
      │           │           │
    YES          NO          NOT SURE
      │           │           │
      ▼           │           │
   minimal        │           │
      │           │           │
      │           ▼           ▼
      │      How critical    Try `standard` first
      │      is throughput?  (works for 80% of
      │           │          cases)
      │      ┌────┴────┐
      │      │         │
      │     LOW       HIGH
      │      │         │
      │      ▼         ▼
      │   standard   aggressive
      │      │         │
      └──────┴─────────┘
```

### Konfiguracja intensywności

**Per-combo** (w konfiguracji combo):

```json
{
  "combo": "my-coding-combo",
  "routing": {/* ... */},
  "compression": {
    "engine": "rtk",
    "intensity": "aggressive"
  }
}
```

**Programatycznie**:

`rtkEngine` (`@omniroute/open-sse/services/compression/engines/rtk`) jest
`CompressionEngine` i nie ma metody `updateConfig`. Aktualizuj konfigurację silnika
przez helper rejestru:

```ts
import { updateEngineConfig } from "@omniroute/open-sse/services/compression/engines/registry";

updateEngineConfig("rtk", { intensity: "aggressive" });
```

### Weryfikacja efektu

Użyj **Verify Gate** (zob. niżej), aby potwierdzić, że filtr jest bezpieczny przy wybranej intensywności:

```ts
import { runRtkFilterTests } from "omniroute/compression/engines/rtk/verify";

const result = runRtkFilterTests({ intensity: "aggressive" });
if (!result.passed) {
  console.error("Filters failed at aggressive intensity");
}
```

---

## Tworzenie własnych filtrów (v3.8.16+)

Katalog `engines/rtk/filters/` zawiera **49+ wbudowanych plików JSON filtrów**. Możesz dodać własne, aby kompresować
wyjście z custom tools nieobjętych domyślnymi.

### Schemat filtra (Zod)

```ts
{
  "id": "string",                      // Required. Filter identifier (kebab-case, e.g., "python-traceback")
  "label": "string",                   // Required. Human-readable filter name
  "description": "string",             // Optional (default: ""). Short description of what filter does
  "category": "git|test|build|shell|docker|package|infra|cloud|generic",
  "priority": number,                  // Optional (0-100, default: 50). Execution order (higher = first)
  "match": {
    "commands": ["string"],            // Command names to match (e.g., "python", "pytest")
    "patterns": ["string"],            // Regex patterns to match output
    "outputTypes": ["string"]          // Detected output classes (e.g., "test-failure")
  },
  "rules": {
    "stripAnsi": boolean,              // Optional (default: false). Strip ANSI color codes
    "replace": [                       // Find-and-replace rules (default: [])
      { "pattern": "regex", "replacement": "..." }
    ],
    "matchOutput": [                   // Short-circuit on pattern match (default: [])
      {
        "pattern": "regex",
        "message": "short summary",
        "unless": "regex"              // Skip if this pattern matches
      }
    ],
    "includePatterns": ["string"],     // Lines to keep (regex patterns, default: [])
    "dropPatterns": ["string"],        // Lines to drop (regex patterns, default: [])
    "collapsePatterns": ["string"],    // Lines to collapse to single occurrence (default: [])
    "deduplicate": boolean,            // Optional (default: false). Remove duplicate lines
    "truncateLineAt": number,          // Optional (default: 0). Truncate lines to max chars
    "maxLines": number,                // Optional (default: 0). Hard cap on total lines
    "headLines": number,               // Optional (default: 20). Keep first N lines of matched output
    "tailLines": number,               // Optional (default: 20). Keep last N lines of matched output
    "onEmpty": "string",               // Optional (default: ""). Fallback message if all lines filtered
    "filterStderr": boolean            // Optional (default: false). Also filter stderr output
  },
  "preserve": {
    "errorPatterns": ["string"],       // Patterns that must always be preserved (default: [])
    "summaryPatterns": ["string"]      // Patterns for final summary line (default: [])
  },
  "tests": [                           // Inline tests for verification (default: [])
    {
      "name": "string",               // Required. Test name
      "input": "sample output",        // Required. Sample input text
      "expected": "expected output",   // Required. Expected compressed output
      "command": "optional command"    // Optional. Command context
    }
  ]
}
```

### Przykład: filtr Python Traceback

```json
{
  "id": "python-traceback",
  "label": "Python Traceback Filter",
  "description": "Compresses Python tracebacks to essential file/line locations and error type",
  "category": "test",
  "priority": 60,
  "match": {
    "commands": ["python", "python3", "pytest", "uv", "poetry"],
    "patterns": ["Traceback \\(most recent call last\\)", "Error", "Exception"],
    "outputTypes": ["error-traceback"]
  },
  "rules": {
    "stripAnsi": true,
    "includePatterns": [
      "Traceback \\(most recent call last\\)",
      "^\\s*File \".+\", line \\d+",
      "^\\s*[A-Z][a-zA-Z]+Error:",
      "^\\s*[A-Z][a-zA-Z]+Exception"
    ],
    "dropPatterns": ["site-packages/", "^\\s+[a-z_]+\\([^)]*\\)$"],
    "headLines": 5,
    "tailLines": 3,
    "maxLines": 25,
    "filterStderr": true
  },
  "preserve": {
    "errorPatterns": ["Error:", "Exception:", "Traceback"],
    "summaryPatterns": ["^[A-Z][a-zA-Z]+(?:Error|Exception):"]
  },
  "tests": [
    {
      "name": "preserves-error-type-and-location",
      "input": "Traceback (most recent call last):\n  File \"app.py\", line 42, in main\n    do_thing()\n  File \"lib/utils.py\", line 17, in helper\n    return 1 / 0\nZeroDivisionError: division by zero",
      "expected": "Traceback (most recent call last):\n  File \"app.py\", line 42, in main\n  File \"lib/utils.py\", line 17, in helper\nZeroDivisionError: division by zero",
      "command": "python app.py"
    }
  ]
}
```

### Ładowanie własnych filtrów

Umieść plik w rozpoznawanej lokalizacji:

```
~/.omniroute/rtk/filters/my-filter.json     # User-level
<project>/.rtk/filters/my-filter.json      # Project-level
```

Filtry są ładowane automatycznie przy starcie przez `loadRtkFilters()` w `open-sse/services/compression/engines/rtk/filterLoader.ts`. Loader odkrywa filtry z:

- Katalog wbudowany: `open-sse/services/compression/engines/rtk/filters/`
- Katalog użytkownika: `~/.omniroute/rtk/filters/`
- Katalog projektu: `<project>/.rtk/filters/`

Aby ładować filtry programatycznie:

```ts
import { loadRtkFilters } from "@omniroute/open-sse/services/compression/engines/rtk/filterLoader";

// Options: customFiltersEnabled (load user/project filters, default on),
// trustProjectFilters, refresh.
const filters = loadRtkFilters({ customFiltersEnabled: true });
```

### Walidacja

Filtry są walidowane względem schematu Zod przy ładowaniu. Filtr ze złą strukturą nie załaduje się i zaloguje błąd:

```
RTK_FILTER_LOADER: filter "my-filter" failed validation:
  - rules.replace.0.pattern: Invalid regex
  - match.commands: must not be empty
```

Aby zwalidować wszystkie zainstalowane filtry, wywołaj `runRtkFilterTests()`, eksportowane z `open-sse/services/compression/engines/rtk/verify.ts`.

### Dobre praktyki

1. **Zawsze dołączaj `tests[]`** — udowadniają, że filtr działa, i chronią przed regresjami
2. **Używaj `matchOutput` do short-circuitów** — jeśli jedna linia mówi całą historię, zastąp cały blok
3. **Preferuj `keep` zamiast `strip`** — jawne reguły „zawsze zachowaj" są bezpieczniejsze niż „zawsze usuń"
4. **Testuj na wszystkich 3 poziomach intensywności** — `minimal` powinno być no-op, `aggressive` nadal powinno zachowywać błędy
5. **Używaj pola `unless`** — chroń short-circuity regułą „nie odpalaj, jeśli X jest obecne"

---

## Odzyskiwanie surowego wyjścia i Verify Gate

Gdy RTK kompresuje wyjście agresywnie, możesz **odzyskać oryginalny tekst** do debugowania, audytu lub replay.

### Jak działa odzyskiwanie surowego wyjścia

```
Original output (10K tokens)
        │
        ▼
RTK compress (with rawOutput.enabled=true)
        │
        ├─▶ Compressed output (2K tokens)  ──▶ to LLM
        │
        └─▶ Original output (10K tokens)   ──▶ stored in DB
                                                  (linked by request_id)
```

### Włączanie przechowywania surowego wyjścia

**Per-request** (w konfiguracji combo):

```json
{
  "compression": {
    "engine": "rtk",
    "intensity": "aggressive",
    "rawOutput": {
      "enabled": true,
      "maxBytes": 1048576 // 1MB cap
    }
  }
}
```

**Domyślnie**: `rawOutput.enabled: false` (oszczędza storage).

### Koszt storage

| Na request                    | Limit 1MB      | Limit 10MB      |
| ----------------------------- | -------------- | --------------- |
| Średnie skompresowane wyjście | ~5KB           | ~5KB            |
| Przechowywane surowe wyjście  | ~50-500KB      | ~500KB-5MB      |
| Przy 1000 requestów/dzień     | 50-500MB/dzień | 500MB-5GB/dzień |

> **Rekomendacja**: Włączaj surowe wyjście tylko dla **sesji debugowania** lub **próbkowanego audytu**, nie always-on.

### Odzyskiwanie oryginału

```ts
import { readRtkRawOutput } from "omniroute/compression/engines/rtk/rawOutput";

const raw = readRtkRawOutput(pointerId); // pointerId from compression stats
if (raw) {
  console.log("Original output:", raw);
}
```

`pointerId` jest zwracany w `CompressionStats.rtkRawOutputPointers[]` po kompresji.
Zobacz `open-sse/services/compression/engines/rtk/rawOutput.ts:102` dla sygnatury funkcji.

### Verify Gate

**RTK Filter Verification** (`open-sse/services/compression/engines/rtk/verify.ts`) waliduje wszystkie filtry względem ich `tests[]` i zapewnia poprawne zachowanie na wszystkich 3 poziomach intensywności.

**Wywołaj `runRtkFilterTests()`**, aby uruchomić weryfikację:

```ts
import { runRtkFilterTests } from "open-sse/services/compression/engines/rtk/verify";

const result = runRtkFilterTests();
console.log(`Passed: ${result.outcomes.filter((o) => o.passed).length}`);
console.log(`Failed: ${result.outcomes.filter((o) => !o.passed).length}`);
if (!result.passed) {
  console.error("Filters failed verification");
  result.outcomes
    .filter((o) => !o.passed)
    .forEach((o) => {
      console.error(
        `  - ${o.filterId} / ${o.testName}: expected "${o.expected}", got "${o.actual}"`
      );
    });
}
```

**Co waliduje**:

1. Każdy filtr ładuje się i przechodzi walidację schematu
2. Każdy wpis `tests[]` produkuje oczekiwane wyjście
3. Intensywność `minimal` jest no-op (zachowuje oryginał, stosuje tylko filtry strukturalne)
4. Intensywność `aggressive` zachowuje błędy, porażki testów i stack trace'y
5. Skompresowane wyjście nigdy nie jest większe niż oryginalne wejście

- Źródło: `open-sse/services/compression/engines/rtk/` (63 files, ~70KB)

- **Przed merge'em zmiany filtra** — zawsze upewnij się, że testy przechodzą
- **Po upgrade silnika RTK** — schemat mógł się zmienić
- **Okresowo w monitoringu** — chroni przed dryfem fixture'ów testowych
- **Przy dodawaniu nowej rodziny tool/command** — udowadnia, że nowy filtr działa

---

## Zobacz też

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — Pełny przegląd potoku kompresji
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — Rejestr silników i wbudowane silniki
- [EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md) — Własne silniki, language packi, potoki stacked
- Źródło: `open-sse/services/compression/engines/rtk/` (63 files, ~70KB)
