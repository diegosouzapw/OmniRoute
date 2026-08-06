---
title: "🗜️ Przewodnik po kompresji promptów — OmniRoute"
version: 3.8.40
lastUpdated: 2026-06-28
---

# 🗜️ Przewodnik po kompresji promptów — OmniRoute

> Oszczędzaj automatycznie 15–95% kwalifikującego się kontekstu. Szybki przegląd: [sekcja Compression w README](../README.md#%EF%B8%8F-prompt-compression--save-15-95-eligible-tokens-automatically).

## Przegląd

OmniRoute implementuje modularny potok kompresji promptów, który działa **proaktywnie** zanim żądania trafią do upstreamowych providerów. Oszczędności tokenów zachodzą więc przejrzyście — bez zmian w Twoim workflow.

```
Client Request
  → Compression Strategy Selector
    → Combo override? → Use combo setting
    → Auto-trigger threshold? → Use auto mode
    → Default mode? → Use global setting
    → Off? → Skip compression
  → Selected Compression Mode
    → Off: No compression
    → Lite: Safe whitespace/formatting cleanup (~15%)
    → Standard: Caveman-speak filler removal (~30%)
    → Aggressive: History aging + summarization (~50%)
    → Ultra: Heuristic pruning + code-block thinning (~75%)
    → RTK: Command-aware terminal/tool-output filtering (60-90% upstream range)
    → Stacked: Ordered multi-engine pipeline, usually RTK then Caveman (78-95% eligible range)
  → Compressed Request → Provider
```

---

## Tryby kompresji

### Off

Brak kompresji. Wszystkie wiadomości przechodzą bez zmian.

### Lite Mode (~15% oszczędności, opóźnienie <1 ms)

Najbezpieczniejszy tryb — zero zmian semantycznych, tylko porządkowanie formatowania:

| Technique                | Description                                   |
| ------------------------ | --------------------------------------------- |
| `collapseWhitespace`     | Scala kolejne puste linie i końcowe spacje    |
| `dedupSystemPrompt`      | Usuwa zduplikowane wiadomości systemowe       |
| `compressToolResults`    | Kompresuje rozwlekłe wyjścia narzędzi/funkcji |
| `removeRedundantContent` | Usuwa powtórzone instrukcje                   |
| `replaceImageUrls`       | Skraca URI danych obrazów base64              |

**Najlepsze do:** ciągłego włączonego użycia, workflow krytycznych dla bezpieczeństwa.

### Standard Mode (~30% oszczędności)

Inspirowany [Caveman](https://github.com/JuliusBrussee/caveman) — usuwa wypełniacze i rozwlekłe sformułowania, zachowując sens:

- Usuwa słowa-wypełniacze („please”, „I think”, „basically”, „actually”)
- Skraca rozwlekłe frazy („in order to” → „to”, „as a result of” → „because”)
- Usuwa grzecznościowe owijanie („Would you mind...”, „If you could possibly...”)
- Ponad 30 reguł regex dostrojonych do promptów kodowania

**Najlepsze do:** codziennego kodowania, zespołów dbających o koszty.

### Aggressive Mode (~50% oszczędności)

Inteligentne zarządzanie historią w długich sesjach:

- **Message Aging** — starsze wiadomości są stopniowo mocniej kompresowane
- **Tool Result Summarization** — długie wyjścia narzędzi zastępowane streszczeniami
- **Structural Integrity Guards** — pary `tool_use` + `tool_result` pozostają spójne
- **Context Window Awareness** — respektuje limity tokenów per model

**Najlepsze do:** długich sesji debugowania, dużych codebase’ów.

### Ultra Mode (~75% oszczędności)

Maksymalna kompresja w scenariuszach krytycznych dla tokenów:

- **Heuristic Pruning** — usuwa wiadomości poniżej progu istotności
- **Code Block Thinning** — kompresuje powtarzalne przykłady kodu
- **Binary Search Truncation** — znajduje optymalny punkt cięcia okna kontekstu
- Zawiera wszystkie funkcje trybu Aggressive

**Najlepsze do:** gdy wielokrotnie dobijasz do limitów kontekstu.

### RTK Mode (zakres upstream 60–90%)

Tryb RTK jest zoptymalizowany pod rozwlekłe wyjścia narzędzi w sesjach agentów kodujących:

- Wykrywa klasy poleceń/wyjść takie jak `git status`, `git diff`, `git log`, test runnery,
  buildy TypeScript/Vite/Webpack, ESLint/Biome/Prettier, npm audit/install, logi Docker, wyjście
  infrastruktury oraz generyczne wyjście shell
- Stosuje pakiety filtrów JSON z `open-sse/services/compression/engines/rtk/filters/`
- Importuje filtry schematu RTK TOML v1 z projektowych lub globalnych plików `filters.toml`, z walidacją
  testów inline i bramką zaufania dla plików projektowych
- Dostarcza 49 wbudowanych filtrów z próbkami weryfikacji inline
- Usuwa sekwencje sterujące ANSI, paski postępu, powtórzone linie i nieistotny szum
- Zachowuje awarie, błędy, ostrzeżenia, zmienione pliki, podsumowania oraz ogon długiego wyjścia
- Wspiera filtry projektowe z bramką zaufania, filtry globalne oraz opcjonalne odzyskiwanie zredagowanego surowego wyjścia

**Najlepsze do:** sesji agentów z transkryptami shell, build, test, git, grep i wyjściem plików.

### Stacked Mode (zakres kwalifikowalny 78–95%)

Tryb stacked uruchamia wiele silników kompresji w deterministycznej kolejności. Domyślny potok:

```txt
RTK -> Caveman
```

Ta kolejność najpierw kompaktuje wyjście terminala/narzędzi, a potem stosuje semantyczną kondensację Caveman
do pozostałego promptu w języku naturalnym. Potoki stacked można konfigurować globalnie lub przez
combo kompresji przypisane do combo routingu.

**Najlepsze do:** mieszanego kontekstu z dużymi logami narzędzi oraz instrukcjami człowieka lub streszczeniami asystenta.

---

## Matematyka oszczędności upstream

OmniRoute dokumentuje oszczędności kompresji z dwóch źródeł: benchmarków projektów upstream oraz
własnej kompozycji silników OmniRoute.

| Source  | Upstream README number used here                                                                                      |
| ------- | --------------------------------------------------------------------------------------------------------------------- |
| Caveman | `~75%` fewer output tokens, `65%` benchmark average output savings, `22-87%` range, and `~46%` input compression tool |
| RTK     | `60-90%` command-output savings; sample session `~118,000 -> ~23,900` tokens, or `79.7%` saved (`~80%`)               |

Dla nakładających się payloadów narzędzi/kontekstu domyślne combo OmniRoute układa silniki w stos:

```txt
RTK -> Caveman
```

Połączone oszczędności są multiplikatywne, nie addytywne:

```txt
combined = 1 - (1 - RTK savings) * (1 - Caveman input savings)
average  = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
range    = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

Liczba `78-95%` dotyczy sytuacji, gdy zarówno RTK, jak i Caveman mogą zredukować ten sam payload wejścia/kontekstu.
Tryb wyjścia odpowiedzi Caveman jest osobny: gdy włączony, stosuj własne oszczędności wyjścia Caveman (`65%`
średnio, `~75%` w nagłówku, zakres `22-87%`). Całkowite oszczędności rozliczeniowe zależą od mieszanki prompt/wyjście.

---

## Wizualizacja oszczędności tokenów

```
Without compression: 47K tokens sent to LLM
With Lite:           40K tokens sent          (15% saved — safe, always-on)
With Standard:       33K tokens sent          (30% saved — caveman-speak rules)
With Aggressive:     24K tokens sent          (50% saved — aging + summarization)
With Ultra:          12K tokens sent          (75% saved — heuristic pruning)
With RTK:            19K-5K tokens sent       (60-90% saved on command/tool output)
With Stacked:        10K-2.5K tokens sent     (78-95% eligible RTK+Caveman range)
```

---

## Konfiguracja

### Dashboard

Przejdź do `Dashboard → Context & Cache`:

- **Caveman** — wybór trybu, language packi, podgląd i globalne domyślne
- **RTK** — podgląd filtrów poleceń, ustawienia bezpieczeństwa RTK i katalog filtrów
- **Compression Combos** — nazwane potoki silników przypisane do combo routingu
- **Auto-Trigger Threshold** — automatycznie włącza kompresję, gdy liczba tokenów przekroczy próg

### Nadpisanie per combo

W `Dashboard → Context & Cache → Compression Combos` przypisz combo kompresji do combo
routingu:

```txt
Combo: "free-tier-fallback"
  Compression Combo: "coding-agent-stack"
  Pipeline: RTK -> Caveman
  Targets:
    1. if/kimi-k2.7-code
    2. if/qwen3.8-max-preview
```

Pozwala to używać kompresji stacked na darmowych/kodujących providerach, a trybu lite na płatnych
subskrypcjach.

To przypisanie „Per-Combo Override” to inna kontrolka niż nadpisanie **trybu kompresji combo routingu**
(Default/Off/Lite/Standard/Aggressive/Ultra) — to nadpisanie nie wybiera nazwanego
potoku compression-combo; ustawia jedynie pole `compressionMode` odczytywane przez
`resolveCompressionPlan`. Można je ustawić na karcie combo (`Dashboard → Combos`) albo, od
#6760, per combo routingu na liście „Assign to routing” w
`Dashboard → Context & Cache → Compression Combos`, tuż obok checkboxa przypisania potoku
opisanego wyżej. Oba miejsca zapisują przez ten sam endpoint `PUT /api/combos/{id}`.

### Nadpisanie per żądanie

Wyślij nagłówek żądania `x-omniroute-compression`, aby nadpisać plan kompresji dla pojedynczego
żądania. Ma najwyższy priorytet — wygrywa z nadpisaniem combo routingu, aktywnym profilem,
auto-triggerem i panelem Default. Nieznane wartości są ignorowane (żądanie nigdy nie jest odrzucane), a
globalny przełącznik główny nadal blokuje wszystko: gdy kompresja jest globalnie wyłączona, nagłówek nie może
jej włączyć. Wartości:

| Value         | Effect                                                                 |
| ------------- | ---------------------------------------------------------------------- |
| `off`         | Brak kompresji dla tego żądania.                                       |
| `default`     | Profil Default z panelu (ignoruje aktywny profil).                     |
| `engine:<id>` | Pojedynczy silnik, gdy włączony, np. `engine:rtk`.                     |
| `<combo>`     | Nazwane combo — najpierw po nazwie (bez wielkości liter), potem po id. |

Zastosowany plan jest zwracany w nagłówku odpowiedzi `X-OmniRoute-Compression: <mode>; source=<source>`,
gdzie `<source>` to jedno z: `request-header`, `routing-override`, `active-profile`,
`auto-trigger`, `default` lub `off`.

### API

```bash
# Get compression settings
curl http://localhost:20128/api/settings/compression

# Update compression settings
curl -X PUT http://localhost:20128/api/settings/compression \
  -H "Content-Type: application/json" \
  -d '{"defaultMode":"stacked","autoTriggerMode":"stacked","autoTriggerTokens":32000}'

# Preview a specific RTK/stacked payload
curl -X POST http://localhost:20128/api/compression/preview \
  -H "Content-Type: application/json" \
  -d '{"mode":"rtk","messages":[{"role":"tool","content":"npm test output here"}]}'

# List RTK filter packs
curl http://localhost:20128/api/context/rtk/filters

# Test RTK directly with optional command metadata
curl -X POST http://localhost:20128/api/context/rtk/test \
  -H "Content-Type: application/json" \
  -d '{"command":"npm test","text":"FAIL tests/example.test.ts\nError: boom"}'
```

---

## Co jest chronione

Silnik kompresji **zawsze zachowuje:**

- ✅ Bloki kodu (fenced i inline)
- ✅ URL-e i ścieżki plików
- ✅ Struktury JSON i dane strukturalne
- ✅ Identyfikatory i chronione tokeny techniczne
- ✅ Wyrażenia matematyczne
- ✅ Definicje wywołań narzędzi/funkcji
- ✅ System prompty (w trybie lite)

Odzyskiwanie surowego wyjścia RTK redaguje typowe klucze API, tokeny bearer, tokeny Slack, klucze dostępu AWS,
hasła, tokeny i sekrety zanim cokolwiek zostanie zapisane.

---

## Statystyki kompresji

Każde skompresowane żądanie zawiera statystyki w logach serwera:

```json
{
  "originalTokens": 47200,
  "compressedTokens": 40120,
  "savingsPercent": 15.0,
  "techniquesUsed": ["collapseWhitespace", "dedupSystemPrompt"],
  "mode": "lite",
  "engine": "caveman",
  "compressionComboId": "coding-agent-stack",
  "durationMs": 0.8,
  "rtkRawOutputPointers": []
}
```

---

## Roadmapa faz

| Phase    | Modes                                                                                                        | Status                                                                        |
| -------- | ------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------- |
| Phase 1  | Off, Lite                                                                                                    | ✅ Wydane                                                                     |
| Phase 2  | Standard, Aggressive, Ultra                                                                                  | ✅ Wydane                                                                     |
| Phase 3  | RTK, Stacked, Compression Combos                                                                             | ✅ Wydane                                                                     |
| Phase 4  | Output Styles, SLM-tier Ultra, eval harness                                                                  | ✅ Wydane                                                                     |
| Phase 4C | Adaptive context-budget („dial”) — silnik compute + API (`contextBudget` na `PUT /api/settings/compression`) | ✅ Wydane (konfigurowalne przez API; kontrolki dashboardu jeszcze nie, #7005) |

---

## Podziękowania

Reguły kompresji trybu Standard są inspirowane przez **[Caveman](https://github.com/JuliusBrussee/caveman)** autorstwa **[JuliusBrussee](https://github.com/JuliusBrussee)** (⭐ 51K+) — viralowy projekt „why use many token when few token do trick”. Caveman raportuje `~75%` mniej tokenów wyjścia, `65%` średnich oszczędności wyjścia w benchmarku, zakres wyjścia `22-87%` oraz narzędzie kompresji wejścia `~46%`.

Tryb RTK jest inspirowany przez **[RTK - Rust Token Killer](https://github.com/rtk-ai/rtk)** autorstwa **[RTK AI](https://github.com/rtk-ai)** — wysokowydajny projekt kompresji wyjścia poleceń do filtrowania terminala, buildów, testów, git i wyjścia narzędzi. RTK raportuje oszczędności `60-90%`, a przykładowa sesja w README pokazuje `~80%` zaoszczędzonych tokenów.

---

## Zaawansowane systemy kompresji

Poza 7 standardowymi trybami OmniRoute zawiera kilka zaawansowanych systemów kompresji,
które działają automatycznie w zależności od kontekstu.

### Kompresja świadoma cache

Niektórzy providerzy (np. Anthropic z prompt caching) wspierają **prompt caching**,
który pozwala cache’ować części promptu w celu obniżenia kosztów i opóźnień. Gdy
cache jest włączony, agresywna kompresja może faktycznie **pogorszyć** wydajność,
bo zmienia cache’owane tokeny i unieważnia cache.

Moduł `cachingAware.ts` rozwiązuje to przez **wykrywanie kontekstu cache** i
**dostosowanie strategii kompresji**.

#### Jak to działa

1. **Wykryj kontekst cache** — skanuje body żądania pod kątem znaczników `cache_control`
2. **Zidentyfikuj providerów z cache** — sprawdza, czy docelowy provider wspiera cache
3. **Dostosuj strategię** — obniża `aggressive`/`ultra` do `standard` dla providerów z cache
4. **Pomiń system prompt** — system prompty zwykle są cache’owane, więc ich nie kompresuj
5. **Używaj transformacji deterministycznych** — tylko transformacje dające spójne wyjście

#### Przykład kodu

```ts
import {
  detectCachingContext,
  getCacheAwareStrategy,
} from "@omniroute/open-sse/services/compression/cachingAware";

const body = {
  model: "anthropic/claude-sonnet-4.5",
  messages: [{ role: "user", content: "Hello" }],
  cache_control: { type: "ephemeral" }, // ← Cache marker
};

const ctx = detectCachingContext(body, { provider: "anthropic" });
// → { hasCacheControl: true, provider: "anthropic", isCachingProvider: true }

const strategy = getCacheAwareStrategy("aggressive", ctx);
// → { strategy: "standard", skipSystemPrompt: true, deterministicOnly: true }
```

#### Kiedy używać

Kompresja świadoma cache jest **zawsze włączona** — bez konfiguracji. Włącza się tylko
gdy:

- Żądanie ma znaczniki `cache_control`
- Docelowy provider wspiera prompt caching (Anthropic, OpenAI itd.)

### Progressive Aging

Długie rozmowy gromadzą wiele tur wiadomości, ale starsze tury stają się mniej
istotne. Moduł `progressiveAging.ts` **degraduje wiadomości według odległości tur**:

- **Ostatnie tury (0–3)**: bez zmian (pełny detal)
- **Średnie tury (4–8)**: kompresja lite (whitespace, porządkowanie formatowania)
- **Stare tury (9+)**: kompresja Caveman (usuwanie wypełniaczy, streszczanie)
- **Bardzo stare tury (20+)**: mocno streszczone lub usunięte

#### Przykład kodu

```ts
import { applyAging } from "@omniroute/open-sse/services/compression/progressiveAging";

const messages = [
  { role: "system", content: "You are a helpful assistant" },
  { role: "user", content: "What is 2+2?" },
  { role: "assistant", content: "4" },
  // ... 50 more turns ...
];

const { messages: aged, saved } = applyAging(messages, {
  verbatim: 3, // First 3 turns: verbatim
  light: 8, // Turns 4-8: lite compression
  moderate: 20, // Turns 9-20: caveman compression
  // Turns 21+: heavy summarization
});

// saved = number of tokens saved
```

#### Kiedy używać

Progressive aging jest **zawsze włączone** dla trybów `aggressive` i `ultra`. Szczególnie
skuteczne przy:

- Długich sesjach kodowania
- Rozmowach wielodniowych
- Workflow agentowych z wieloma wywołaniami narzędzi

### Tryb wyjścia Caveman

Moduł `outputMode.ts` wstrzykuje **instrukcje system promptu**, aby model sam
produkował skompresowane, zwięzłe wyjście (styl „caveman”).

#### Jak to działa

Zamiast kompresować wejście, ten tryb dodaje system prompt w stylu:

> "Reply in minimal words. Skip pleasantries. Use short sentences."

Szczególnie dobrze działa przy:

- Generowaniu kodu (zwięźlejsze wyjście = mniej tokenów)
- Szybkim Q&A (bez rozbudowanych wyjaśnień)
- Przetwarzaniu wsadowym (maksymalna przepustowość)

#### Kiedy używać

Tryb wyjścia Caveman jest **opt-in** — ustaw go w konfiguracji combo:

```json
{
  "strategy": "auto",
  "config": {
    "auto": {
      "outputMode": "caveman"
    }
  }
}
```

### Kompresja wyników narzędzi

Moduł `toolResultCompressor.ts` oferuje **5 specjalistycznych strategii kompresji**
dla wyników narzędzi (wywołania funkcji, wyjścia agentów, wyniki wyszukiwania itd.):

1. **Kompresja wyników wyszukiwania** — usuwa zbędne wyniki, zostawia top-N
2. **Kompresja odczytu plików** — obcina duże pliki, zachowuje nagłówki/importy
3. **Kompresja wykonania kodu** — zostawia tylko istotny stdout/stderr
4. **Kompresja zapytań do bazy** — limituje wiersze, usuwa rozwlekłe metadane
5. **Kompresja odpowiedzi API** — usuwa pola null, kondensuje tablice

#### Kiedy używać

Kompresja wyników narzędzi jest **zawsze włączona**, gdy obecne są wywołania narzędzi. Bez
konfiguracji.

### Potok Stacked

Tryb stacked uruchamia **wiele silników sekwencyjnie** — zwykle najpierw RTK
(60–90% oszczędności na wyjściu narzędzi), potem Caveman (dodatkowe ~30% na
pozostałym tekście). Daje to **łącznie 78–95% oszczędności**.

#### Jak to działa

```
Input (1000 tokens)
  → RTK (command-aware filter) → 200 tokens
    → Caveman (filler removal) → 140 tokens
  → Output (140 tokens, 86% savings)
```

#### Kiedy używać

Używaj trybu stacked dla:

- Workflow mocno opartych o narzędzia (agentowe kodowanie, research)
- Przetwarzania wsadowego wrażliwego na koszty
- Gdy potrzebujesz maksymalnych oszczędności tokenów

Konfiguracja przez combo:

```json
{
  "strategy": "auto",
  "config": {
    "auto": {
      "modePack": "stacked"
    }
  }
}
```

---

## Nadpisania combo kompresji

Możesz nadpisać globalny tryb kompresji **per combo**, aby dostroić zachowanie
dla różnych przypadków użycia:

```json
{
  "id": "coding-combo",
  "strategy": "priority",
  "config": {
    "auto": {
      "weights": { "taskFit": 0.5 },
      "modePack": "quality-first"
    }
  },
  "compressionOverride": {
    "mode": "aggressive",
    "stackedPipelines": ["rtk", "caveman"],
    "preserveToolDefinitions": true
  }
}
```

Przydatne dla:

- **Combo kodowania**: tryb `aggressive` przy długich sesjach
- **Combo szybkiego Q&A**: tryb `lite` dla szybkich odpowiedzi
- **Combo mocno narzędziowe**: tryb `stacked` dla max oszczędności
- **Combo produkcyjne**: tryb `cache-aware` dla providerów z cache

---

## Zobacz też

- [Konfiguracja środowiska](../reference/ENVIRONMENT.md) — zmienne środowiskowe kompresji
- [Przewodnik po architekturze](../architecture/ARCHITECTURE.md) — wnętrze potoku kompresji
- [Przewodnik użytkownika](../guides/USER_GUIDE.md) — pierwsze kroki z kompresją
- [Kompresja RTK](./RTK_COMPRESSION.md) — filtry RTK, model zaufania, bramka verify, odzyskiwanie surowego wyjścia
- [Silniki kompresji](./COMPRESSION_ENGINES.md) — Caveman, RTK, stacked, API, MCP, dashboard
- [Format reguł kompresji](./COMPRESSION_RULES_FORMAT.md) — format pakietów reguł JSON
- [Language packi kompresji](./COMPRESSION_LANGUAGE_PACKS.md) — reguły Caveman zależne od języka
