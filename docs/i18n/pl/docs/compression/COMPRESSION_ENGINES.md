---
title: "Silniki kompresji"
version: 3.8.40
lastUpdated: 2026-06-28
---

# Silniki kompresji

Kompresja OmniRoute opiera się na kontraktach silników. Tryb może uruchomić jeden silnik bezpośrednio
(`caveman` lub `rtk`) albo deterministyczny potok stacked, który wykonuje wiele silników po kolei.

## Tryby

| Mode         | Ścieżka silnika                    | Przeznaczone wejście                             |
| ------------ | ---------------------------------- | ------------------------------------------------ |
| `off`        | none                               | Dokładne zachowanie promptu                      |
| `lite`       | Caveman lite helpers               | Niskoryzykowe, zawsze włączone porządkowanie     |
| `standard`   | Caveman                            | Kondensacja promptów w języku naturalnym         |
| `aggressive` | Caveman + history/tool summarizers | Długie sesje czatu                               |
| `ultra`      | Caveman + pruning helpers          | Odzyskiwanie limitu kontekstu                    |
| `rtk`        | RTK                                | Wyjście terminala, shell, build, test i git      |
| `stacked`    | Pipeline, default `rtk -> caveman` | Mieszane logi narzędzi i proza, max oszczędności |

## Rejestr silników

Rejestr znajduje się w `open-sse/services/compression/engines/registry.ts`. Silniki udostępniają wspólny
kontrakt:

- `id`: stabilny identyfikator silnika, np. `caveman` lub `rtk`
- `apply(text, config)`: legacy ścieżka wykonania używana przez potoki stacked
- `compress(input, config)`: główna ścieżka wykonania zwracająca tekst + stats
- `getConfigSchema()`: zwraca kształt valid config zbliżony do JSON Schema
- `validateConfig(config)`: zwraca `{ valid, errors[] }`

Rejestracja używa `registerCompressionEngine(engine)` (lub `registerEngine` w zaawansowanych przypadkach),
które wywołuje `assertValidEngine()` oraz `validateConfig(defaultConfig)` przed akceptacją.
Użyj `unregisterCompressionEngine(id)`, aby usunąć silnik w runtime.

`strategySelector.ts` rejestruje wbudowane silniki przed uruchomieniem kompresji. Dzięki temu preview,
kompresja runtime, tryb stacked, testy i przyszłe silniki korzystają z tej samej ścieżki wykonania.

### Kompresja opisów MCP (powiązane)

Osobny rejestr kompresuje metadane opisów narzędzi MCP na poziomie rejestru — zobacz
`open-sse/mcp-server/descriptionCompressor.ts` oraz [MCP-SERVER.md](../frameworks/MCP-SERVER.md). Ponownie
używa reguł Caveman, ale działa na metadanych narzędzi, nie na payloadach żądań.

### Dodatkowe wbudowane silniki

Poza Caveman, RTK i LLMLingua-2 rejestr dostarcza kilka wyspecjalizowanych silników lossless /
strukturalnych (używanych przez potoki stacked, playground i testy):

| Engine        | Id              | Co robi                                                                                                                                                                    |
| ------------- | --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CCR           | `ccr`           | Content-Compress-Retrieve (H4): zastępuje duże ciągłe bloki tekstu referencjami adresowanymi treścią, więc powtarzane/duże bloki są wysyłane raz i potem tylko odwoływane. |
| headroom      | `headroom`      | SmartCrusher (H3 + N5): bezstratna kompakcja tabelaryczna homogenicznych payloadów JSON-array do formy kolumnowej `[N rows]`.                                              |
| ionizer       | `ionizer`       | Próbkowanie wierszy head/middle/tail dla bardzo dużych homogenicznych bloków; pominięty środek jest przechowywany jako referencja CCR adresowana treścią.                  |
| session-dedup | `session-dedup` | Deduplikacja między turami adresowana treścią (inspirowana TokenMizer): pomija tekst już widziany we wcześniejszych turach tej samej sesji.                                |

**Instrukcja protokołu CCR retrieve (#8033):** przy pierwszej zamianie ≥1 bloku w
żądaniu silnik dołącza na początku jedną, idempotentną wiadomość `system` (zaczynającą się od
sentinela `[CCR protocol]`), ucząc wywołującego kontraktu marker → tool: co oznacza
marker `[CCR retrieve hash=<24hex> chars=N]`, że hash musi być skopiowany dosłownie
(wszystkie 24 znaki hex — błędnie skopiowane hashe to prawdopodobna przyczyna missów
„block not found”), oraz że marker `[dedup:ref sha=...]` oznacza „spójrz wstecz w historii”,
a nie „wywołaj tool”. Nota jest wstrzykiwana **tylko gdy zadeklarowane `tools[]` wywołującego
dowodzą, że faktycznie może dotrzeć do `omniroute_ccr_retrieve`** (`callerSupportsCcrRetrieve()` w
`open-sse/services/compression/engines/ccr/protocolInstruction.ts`) — zwykły
wywołujący zgodny z OpenAI bez tego toola nigdy nie dostanie instrukcji wywołania czegoś,
do czego nie ma dostępu. Idempotencja jest wymuszana przez skan historii wiadomości w poszukiwaniu
sentinela przed wstrzyknięciem, więc żądania multi-turn (które odtwarzają wcześniejsze wiadomości)
nie kumulują noty raz na turę.

## Caveman

Tryb Caveman skupia się na semantycznej kondensacji zwykłej prozy:

- zachowuje bloki kodu, URL-e, JSON, ścieżki i dane strukturalne
- usuwa wypełniacze, hedging, powtarzany kontekst i rozwlekłe frazy spajające
- obsługuje pakiety reguł plikowych zależne od języka w `open-sse/services/compression/rules/`
- pozostaje dostępny przez legacy tryby `standard`, `aggressive` i `ultra`

Powierzchnia dashboardu to `Dashboard -> Context & Cache -> Caveman`.

Upstream Caveman raportuje `~75%` mniej tokenów wyjściowych, średnio `65%` oszczędności wyjścia w benchmarkach
z zakresem `22-87%` oraz narzędzie kompresji wejścia na poziomie `~46%`. OmniRoute używa liczby
po stronie wejścia Caveman przy dokumentowaniu złożonych oszczędności prompt/kontekst; tryb wyjścia Caveman
pozostaje osobną funkcją zachowania odpowiedzi.

## RTK

Tryb RTK skupia się na wyjściu poleceń i narzędzi:

- wykrywa klasy wyjścia takie jak `git status`, `git branch`, `git diff`, Vitest/Jest/Pytest,
  testy Cargo/Go, buildy TypeScript/Vite/Webpack, ESLint, npm audit/installs, logi Dockera,
  shell `find`/`grep`, stack trace’y i generyczne logi
- stosuje 49 filtrów JSON z `open-sse/services/compression/engines/rtk/filters/`
- obsługuje deklaratywny potok w stylu RTK: stripping ANSI, replace, short-circuit match-output,
  strip/keep lines, truncacja per-line, truncacja head/tail/max-line oraz fallback on-empty
- obsługuje filtry projektowe gated zaufaniem w `.rtk/filters.json` oraz filtry globalne w
  `DATA_DIR/rtk/filters.json`
- usuwa sekwencje ANSI, szum postępu, powtarzające się linie i nieprzydatny boilerplate
- zachowuje actionable failures, ostrzeżenia, podsumowania, zmienione pliki i kontekst ogona
- opcjonalnie może zatrzymać zredagowane surowe wyjście do odzyskiwania/debugowania przez
  uwierzytelnione trasy management

Powierzchnia dashboardu to `Dashboard -> Context & Cache -> RTK`.

Szczegóły operacyjne filtrów niestandardowych, trust, verify i odzyskiwania raw-output znajdują się w
[`RTK_COMPRESSION.md`](./RTK_COMPRESSION.md).

Upstream RTK raportuje oszczędności `60-90%` przy kompresji wyjścia poleceń. Przykład z README pokazuje
30-minutową sesję Claude Code spadającą z `~118,000` tokenów do `~23,900`, czyli `79.7%` oszczędności.

## LLMLingua-2 (Semantic Pruning)

Tryb LLMLingua-2 wykonuje **semantyczne przycinanie tokenów** na prozie przy użyciu małego klasyfikatora
tokenów ONNX, uzupełniając silniki regułowe Caveman i RTK:

- kompresuje prozę wyłącznie w wiadomościach non-system; fenced code blocks i inne chronione
  konstrukcje nigdy nie są zmieniane
- uruchamia backend `@atjsh/llmlingua-2` (ONNX przez `@huggingface/transformers`) w
  worker thread, więc inference modelu nigdy nie blokuje pętli zdarzeń żądania
- jest **stackable** (`stackPriority` 35): w potoku stacked działa po
  silnikach strukturalnych (CCR, session-dedup, headroom, Caveman), ale przed `ultra`, ponieważ
  semantyczne przycinanie jest najskuteczniejsze na tekście już skompresowanym strukturalnie — np.
  `rtk -> caveman -> llmlingua`
- **fail-opens przy dowolnym błędzie** (brakujące opcjonalne zależności, spawn workera, ładowanie modelu,
  inference lub timeout) → zwracany jest oryginalny tekst bez zmian, nigdy błąd

Lokalizacja silnika: `open-sse/services/compression/engines/llmlingua/`. Powierzchnia dashboardu
to `Dashboard -> Context & Cache -> LLMLingua`.

### Modele

Domyślny model to **TinyBERT** (`atjsh/llmlingua-2-js-tinybert-meetingbank`, ~57 MB,
szybki). Model **BERT-base** o wyższej dokładności (`Arcoldd/llmlingua4j-bert-base-onnx`,
~710 MB) jest dostępny przez pole `model` w konfiguracji silnika. `@huggingface/transformers`
pobiera wybrany model leniwie z HuggingFace Hub do
`${DATA_DIR}/models/llmlingua` przy pierwszym wywołaniu (`modelStore.ts`); override `modelPath` w config
wskazuje zamiast tego lokalną kopię (instalacje offline / air-gapped).

### Opcjonalne zależności i instalacja on-demand

Przycinany stos peerów runtime LLMLingua jest **opcjonalny**. Trzy pakiety są zadeklarowane jako
`optionalDependencies` w `package.json` i utrzymywane jako **external** przez build produkcyjny
(`scripts/build/prepublish.ts` ich nie bundluje):

| Package              | Version (pin) | Notes                                             |
| -------------------- | ------------- | ------------------------------------------------- |
| `@atjsh/llmlingua-2` | `2.0.3`       | Pakiet wejściowy; deklaruje pozostałe jako peery  |
| `@tensorflow/tfjs`   | `4.22.0`      | Najcięższa zależność — dominuje footprint ~800 MB |
| `js-tiktoken`        | `^1.0.20`     | Tokenizer                                         |

`@huggingface/transformers` jest pinowany na `3.5.2` jako **opcjonalna** zależność (współdzielona ze
ścieżką lokalnych embeddings i również śledzona do standalone bundle). Utrzymanie jej jako optional
zapobiega awariom postinstall providera CUDA `onnxruntime-node` na hostach CUDA 11, które przerywałyby
całą instalację OmniRoute; gdy opcjonalny stos jest nieobecny, LLMLingua nadal fail-openuje. Tylko trzy
powyższe pakiety to przycinane peery SLM. Standardowe `npm install` (dev) instaluje opcjonalny stos
automatycznie, o ile opcjonalne zależności nie zostaną pominięte.

**Dlaczego on-demand:** pakiet publikowany w npm, standalone bundle i obraz Docker
dostarczane są **bez** tych zależności, aby pozostać lekkie. Gdy ich brakuje, bramka zależności
workera (sonda resolve `@atjsh/llmlingua-2` w `worker.ts`) zawodzi i silnik
**fail-openuje po cichu** — wybór LLMLingua staje się no-op (tekst zwracany bez zmian, bez
logowanego błędu). Aby aktywować go w przyciętym środowisku, zainstaluj opcjonalny stos:

```bash
# pin to the versions declared in package.json optionalDependencies
npm install @atjsh/llmlingua-2@2.0.3 @tensorflow/tfjs@4.22.0 js-tiktoken
```

Łącznie mniej więcej **~800 MB**: dominują runtime’y TensorFlow.js + transformers; model
TinyBERT dodaje ~57 MB pobierane przy pierwszym użyciu (nie przez npm).

Per środowisko:

- **Dev / `npm install`** — instalowane automatycznie, chyba że podano `--omit=optional`
  (lub `--no-optional`). Nie trzeba nic robić.
- **Global npm (`npm i -g omniroute`) / standalone** — uruchom powyższą komendę install wewnątrz
  katalogu zainstalowanego pakietu albo zainstaluj ponownie bez pomijania opcjonalnych zależności.
- **Docker** — dodaj komendę install w warstwie obrazu pochodnego; publikowany obraz
  jest z założenia slim.
- **VPS (PM2)** — zainstaluj do `node_modules` aplikacji, potem zrestartuj proces, aby
  worker ponownie sprawdził bramkę.

**Weryfikacja aktywności:** przy wybranym LLMLingua prawdziwa proza faktycznie się kurczy (silnik
przestaje fail-openować), a pierwsze żądanie uruchamia pobranie modelu do
`${DATA_DIR}/models/llmlingua`. Bramka celowo sonduje tylko `@atjsh/llmlingua-2` —
pozostałe peery są ESM-only i `require.resolve` rzuca na nich nawet gdy są obecne — więc
worker nadal fail-openuje, jeśli którykolwiek peer naprawdę brakuje w momencie `import()`.

## Potoki stacked

Tryb stacked uruchamia kroki potoku po kolei. Domyślnie:

```txt
rtk -> caveman
```

Użyj tego w sesjach coding-agent, gdzie prompt łączy wyjście poleceń z prozą człowieka lub asystenta.
RTK najpierw redukuje hałaśliwe logi narzędzi, potem Caveman kompresuje pozostały język naturalny.

Kroki potoku konfiguruje się przez `stackedPipeline` w ustawieniach kompresji lub przez
combo kompresji.

Gdy oba silniki redukują ten sam kwalifikujący się payload, oszczędności się kumulują:

```txt
combined = 1 - (1 - RTK savings) * (1 - Caveman input savings)
average  = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
range    = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

## Filtr drzewa dostępności MCP

Inteligentny filtr drzewa dostępności MCP to warstwa kompresji post-execution działająca na
**wynikach narzędzi** MCP, nie na promptach ani kontekście. Celuje w rozwlekłe payloady
accessibility-tree i snapshotów przeglądarki zwracane przez narzędzia takie jak Playwright,
computer-use i serwery MCP automatyzacji przeglądarki.

### Co robi

1. **Noise stripping** — usuwa puste wpisy generic/text (`- generic:`, `- text: ""`)
2. **Sibling collapse** — gdy ≥ `collapseThreshold` (domyślnie 30) kolejnych linii to strukturalne
   powtórzenia, zwija je do pierwszych `collapseKeepHead` (domyślnie 10) linii + podsumowania liczby +
   ostatnich `collapseKeepTail` (domyślnie 5) linii
3. **Ref preservation** — kotwice `[ref=eXX]` wymagane przez Playwright/computer-use nigdy nie są ruszane
4. **Hard truncation** — jeśli tekst po zwięciu nadal przekracza `maxTextChars` (domyślnie 50 000),
   ucina z podpowiedzią nawigacji, aby agent mógł kontynuować pracę

### Lokalizacja silnika

```txt
open-sse/services/compression/engines/mcpAccessibility/
  index.ts            ← smartFilterText() entry point
  collapseRepeated.ts ← sibling-collapse algorithm
  constants.ts        ← DEFAULT_MCP_ACCESSIBILITY_CONFIG
```

### Konfiguracja

Sterowane przez `compression.mcpAccessibility` w ustawieniach globalnych (migracja 056). Domyślna konfiguracja:

```json
{
  "enabled": true,
  "maxTextChars": 50000,
  "collapseThreshold": 30,
  "collapseKeepHead": 10,
  "collapseKeepTail": 5,
  "minLengthToProcess": 2000
}
```

Filtr jest stosowany tylko do payloadów wyników narzędzi, których `type` to `"text"` i których długość
przekracza `minLengthToProcess`. Nie wpływa na kompresję promptów ani payloady żądań.

### Oczekiwane oszczędności

60–80% na wynikach narzędzi snapshotów przeglądarki, w zależności od złożoności strony. Algorytm zwięcia
jest O(n) względem liczby linii i dodaje pomijalne opóźnienie.

### Ten filtr vs silniki kompresji powyżej

| Aspect      | Caveman / RTK / Stacked   | MCP accessibility filter               |
| ----------- | ------------------------- | -------------------------------------- |
| Target      | Request prompts / context | MCP tool results                       |
| Trigger     | Compression mode setting  | `compression.mcpAccessibility.enabled` |
| Scope       | All SSE messages          | Tool results only                      |
| Ref anchors | N/A                       | Preserved unconditionally              |

---

## Combo kompresji

Combo kompresji to nazwane profile kompresji, które można przypisać do combo routingu:

- `compression_combos`: przechowuje mode, pipeline, konfigurację RTK, konfigurację języka i domyślny marker
- `compression_combo_assignments`: mapuje combo kompresji na combo routingu
- integracja runtime rozwiązuje przypisane combo kompresji przed ogólnymi override’ami combo
- analytics obejmują `compression_combo_id` oraz `engine`

Powierzchnia dashboardu: `Dashboard -> Context & Cache -> Compression Combos`.

## Powierzchnia API

| Route                                  | Purpose                                                         |
| -------------------------------------- | --------------------------------------------------------------- |
| `/api/settings/compression`            | Globalne ustawienia kompresji (w tym config `mcpAccessibility`) |
| `/api/compression/preview`             | Podgląd dowolnego trybu kompresji                               |
| `/api/compression/language-packs`      | Lista dostępnych pakietów językowych Caveman                    |
| `/api/context/caveman/config`          | Alias ustawień Caveman                                          |
| `/api/context/rtk/config`              | Domyślne wartości i ustawienia RTK                              |
| `/api/context/rtk/filters`             | Katalog filtrów RTK                                             |
| `/api/context/rtk/test`                | Endpoint podglądu/testu RTK                                     |
| `/api/context/rtk/raw-output/[id]`     | Uwierzytelnione odzyskiwanie zredagowanego raw-output           |
| `/api/context/combos`                  | CRUD combo kompresji                                            |
| `/api/context/combos/[id]/assignments` | CRUD przypisań do combo routingu                                |
| `/api/context/analytics`               | Alias analytics kompresji                                       |

Trasy management wymagają uwierzytelnienia management lub sprawdzeń polityki klucza API.

## Narzędzia MCP

Kompresja udostępnia pięć narzędzi MCP:

| Tool                                | Scope               | Purpose                                 |
| ----------------------------------- | ------------------- | --------------------------------------- |
| `omniroute_compression_status`      | `read:compression`  | Ustawienia, analytics, statystyki cache |
| `omniroute_compression_configure`   | `write:compression` | Aktualizacja ustawień globalnych        |
| `omniroute_set_compression_engine`  | `write:compression` | Ustawienie trybu i opcjonalnego potoku  |
| `omniroute_list_compression_combos` | `read:compression`  | Lista combo kompresji                   |
| `omniroute_compression_combo_stats` | `read:compression`  | Odczyt analytics combo/silnika          |

## Zakres i wykluczenia

**Embeddings nigdy nie są kompresowane.** `open-sse/handlers/embeddings.ts` nigdy nie wywołuje żadnego
silnika kompresji — body request/response idą prosto do executora nietknięte.
To dziś ograniczenie strukturalne (embeddings i chat completions to rozłączne handlery), nie
sprawdzenie runtime, ale oznacza, że obawa o zniekształcenie wektorów z #8034 nie ma powierzchni
ekspozycji na ścieżce embeddings.

**Filtr wykluczeń per-model/endpoint (#8034).** Dla chat completions operator może nazwać
identyfikatory modeli / cele `provider/model`, które nigdy nie mogą być kompresowane — guardrail
przydatny, gdyby kompresja kiedyś została podpięta bliżej ścieżki sąsiadującej z embeddings, oraz
ogólnie przydatny dla dowolnego modelu, dla którego liczy się dokładny, bajt-po-bajcie prompt
(deterministyczne evals, prefiksy wrażliwe na cache itd.).

- Pole ustawień: `exclusions?: string[]` w globalnej konfiguracji kompresji
  (`GET`/`PUT /api/settings/compression`), utrwalane przez istniejący namespace `key_value` kompresji
  (`src/lib/db/compression.ts`) — bez nowej tabeli.
- Zakładka dashboardu: **Dashboard → Compression → Exclusions**
  (`/dashboard/compression/exclusions`).
- Składnia wzorców: `*` to jedyny wildcard. Każdy inny metaznak regex we wzorcu jest
  escapowany przed dopasowaniem, więc `gpt-5.6` pasuje tylko do literału, nigdy do `gpt-5x6`
  (ReDoS-safe, ograniczone, bez zagnieżdżonych kwantyfikatorów). Wzorce dopasowują bez rozróżniania
  wielkości liter zarówno bare model id, jak i złożenie `provider/model` — `gpt-5-6`, `openai/gpt-5-6`
  oraz `openai/*` działają, a samo `*` wyklucza każdy model.
- Dopasowanie: `isCompressionExcluded()` / `normalizeCompressionExclusions()` w
  `open-sse/services/compression/exclusions.ts`. `chatCore.ts` sprawdza wykluczony cel
  zaraz po rozwiązaniu ustawień kompresji, **zanim uruchomi się jakikolwiek silnik**, i traktuje
  trafienie dokładnie jak globalne wyłączenie kompresji — body żądania jest udowodnialnie
  bajtowo identyczne. Skip jest rejestrowany przez `writeCompressionSkip(..., "excluded")` dla
  widoczności w analytics.
- Domyślnie (pusta/nieobecna lista): zachowanie identyczne z pre-#8034 — nic nie jest wykluczone.

## Znane ograniczenia

- **LLMLingua-2 (SLM) wymaga współlokowanych opcjonalnych zależności.** Worker działa w
  buildzie produkcyjnym tylko gdy `@atjsh/llmlingua-2` + peery są współlokowane do
  `dist/node_modules` (zob. `scripts/build/colocateOptionals.mjs`, #4286). Bez nich
  silnik fail-openuje (zwraca oryginalny tekst). Rozwiązywanie workera nie zależy już od
  `import.meta.url` (to umiera w standalone bundle) — kotwiczy się na runtime
  cwd / `argv[1]`.
- **Pakiety językowe Caveman `de` / `fr` / `ja` są częściowe.** Dostarczają reguły `context` +
  `filler` + `structural`, ale nie pakiety `dedup` / `ultra`, więc intensywność `ultra` nie jest
  silniejsza niż `full` dla tych języków (używają wyłącznie własnych reguł — nie ma
  cichego fallbacku do angielskich reguł `dedup`/`ultra`, które psułyby tekst obcy).
  `en` / `es` / `id` / `pt-BR` są kompletne. Wkłady `dedup.json` + `ultra.json`
  dla częściowych pakietów są mile widziane.
- **Telemetria stacked wymienia tylko silniki, które skompresowały.** Krok potoku stacked, którego
  silnik się uruchomił, ale dał 0% oszczędności, zwraca `stats:null` i dlatego nie pojawia się w
  `engineBreakdown` — nieodróżnialny od kroku pominiętego. Odróżnienie
  „uruchomiony, 0%” od „pominięty” wymagałoby zmiany modelu breakdown i jest odroczone.

## Walidacja

Skupione bramki dla tego obszaru to:

```bash
node --import tsx/esm --test tests/unit/compression/rtk-*.test.ts tests/unit/compression/pipeline-integration.test.ts tests/unit/compression/context-compression-api.test.ts
node --import tsx/esm --test tests/unit/compression/*.test.ts tests/golden-set/*.test.ts tests/integration/compression-pipeline.test.ts tests/unit/api/compression/compression-api.test.ts
node --import tsx/esm --test tests/unit/compression/mcpAccessibility*.test.ts
npm run typecheck:core
```
