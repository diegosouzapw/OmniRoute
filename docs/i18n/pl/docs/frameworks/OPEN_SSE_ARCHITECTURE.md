---
title: "Architektura open-sse"
version: 3.8.40
lastUpdated: 2026-06-28
---

# Architektura open-sse

> **TL;DR**: `open-sse/` to rdzeń silnika strumieniowania, który obsługuje każde żądanie LLM w OmniRoute. Zawiera ~900 plików implementujących pipeline żądań, executory, serwisy, serwer MCP oraz warstwę tłumaczenia formatów. Ten przewodnik wyjaśnia, jak te elementy współgrają ze sobą.

**Źródło:** `open-sse/` (pakiet workspace, ~900 plików; 811 `.ts`)

---

## Po co osobny pakiet workspace?

`open-sse/` to **samodzielny workspace** w monorepo OmniRoute z kilku powodów:

1. **Reużywalność** — `open-sse` jest publikowany jako `@omniroute/open-sse` na npm, więc inne projekty mogą go używać niezależnie
2. **Czyste granice** — silnik strumieniowania jest odseparowany od warstwy UI/DB specyficznej dla OmniRoute
3. **Wydajność** — silnik nie ma zależności od Next.js, co umożliwia szybsze cold starty w kontekstach CLI/serverless
4. **Wersjonowanie** — `open-sse` może wydawać releasy we własnym rytmie

```json
// package.json
"workspaces": ["open-sse"]
```

---

## Struktura najwyższego poziomu

```
open-sse/
├── index.ts              # Public entry point
├── types.d.ts            # Public type exports
├── package.json          # @omniroute/open-sse
├── config/               # Provider configs, constants, registries
├── executors/            # Per-provider HTTP executors (67 + base.ts/index.ts)
├── handlers/             # Request handlers (chatCore, responses, etc.)
├── lib/                  # Internal utilities
├── mcp-server/           # Model Context Protocol server
├── services/             # ~298 service modules
├── transformer/          # Responses API format transformer
├── translator/           # Format translation (OpenAI ↔ Claude ↔ Gemini)
└── utils/                # Shared utilities (logging, error, stream, etc.)
```

### Liczby modułów

| Katalog | Pliki | Przeznaczenie |
| `executors/` | 68 | Executory HTTP per-provider (ujednolicone przez fabrykę DefaultExecutor) |
| `handlers/` | 16 | Punkty wejścia żądań (chatCore, responses, embeddings) |
| `services/` | ~298 | Routing, caching, rate limiting, refresh itd. |
| `translator/` | ~27 | Konwersja formatów (OpenAI ↔ Claude ↔ Gemini) |
| `mcp-server/` | 32 | Narzędzia i transporty MCP |
| `utils/` | ~65 | Narzędzia przekrojowe (logging, error, stream) |
| `config/` | ~10 | Konfiguracje providerów, stałe, rejestry |

---

## Pipeline żądania

Każde żądanie LLM przechodzi przez **pipeline 5 etapów**:

```
                              ┌──────────────┐
   HTTP request                │  1. ROUTE    │   combo resolution, model selection
   (Next.js route)             └──────┬───────┘
                                     │
                                     ▼
                              ┌──────────────┐
                              │  2. TRANSLATE│   format conversion (OpenAI ↔ Claude ↔ Gemini)
                              └──────┬───────┘
                                     │
                                     ▼
                              ┌──────────────┐
                              │  3. EXECUTE  │   provider executor, HTTP, retry, breaker
                              └──────┬───────┘
                                     │
                                     ▼
                              ┌──────────────┐
                              │  4. STREAM   │   SSE transformation, backpressure
                              └──────┬───────┘
                                     │
                                     ▼
                              ┌──────────────┐
                              │  5. RECORD   │   usage tracking, call log, error classification
                              └──────┬───────┘
                                     │
                                     ▼
                              HTTP response (SSE or JSON)
```

### Etap 1: Route (services/combo.ts)

**Punkt wejścia**: `handleComboChat()` w `services/combo.ts`

Rozwiązuje żądanie do konkretnej krotki `(provider, model, account, credentials)`:

- Wyszukuje combo po ID (lub buduje wirtualne combo dla modeli `auto/*`)
- Stosuje strategię routingu (priority, weighted, round-robin itd.)
- Odfiltrowuje niezdrowe providery (circuit breaker)
- Wybiera kolejny możliwy target

Dla modeli `auto/*` ten etap dodatkowo:

- Uruchamia algorytm scoringu **13-czynnikowego** (`services/autoCombo/`)
- Wybiera parę `provider+model` na podstawie health, cost, latency itd.

### Etap 2: Translate (translator/)

Jeśli format źródłowy (np. OpenAI) różni się od formatu docelowego (np. Claude), żądanie jest **tłumaczone**:

- System prompt → system message
- Definicje narzędzi → format narzędzi specyficzny dla providera
- Parametry reasoning/thinking → odpowiedniki specyficzne dla providera
- Normalizacja ról wiadomości (`developer` → `system` dla non-OpenAI)

`translator/index.ts` udostępnia:

```ts
translateRequest(body, sourceFormat, targetFormat): TranslatedRequest
needsTranslation(source, target): boolean
```

### Etap 3: Execute (executors/)

**Punkt wejścia**: `getExecutor(providerId).execute(request, options)`

Wszystkie providery używają `DefaultExecutor` (`executors/default.ts`) przez fallback fabryki `getExecutor()`. Executor:

- Buduje upstream URL (`buildUrl()`)
- Dodaje nagłówki specyficzne dla providera (`buildHeaders()`)
- Transformuje body żądania (`transformRequest()`)
- Wysyła żądanie HTTP z retry + exponential backoff
- Obsługuje odświeżanie auth w razie potrzeby (providery OAuth)

Wszystkie executory dziedziczą po `BaseExecutor` (`executors/base.ts`, 1170 LOC), który zapewnia:

- Wspólną logikę retry
- Integrację z proxy
- Integrację z circuit breakerem
- Hooki zapisu usage

### Etap 4: Stream (utils/stream.ts)

Dla odpowiedzi streamingowych executor zwraca **ReadableStream**. Handler:

- Przepuszcza przez transform SSE (`createSSETransformStreamWithLogger`)
- Stosuje heartbeat pingi do wykrywania martwych połączeń
- Gracefully obsługuje rozłączenie klienta (`pipeWithDisconnect`)
- Transformuje SSE → JSON dla klientów non-streaming

Dla odpowiedzi non-streaming executor zwraca sparsowany obiekt JSON, który jest przekazywany bez zmian.

### Etap 5: Record (services/usage.ts)

Po odpowiedzi (sukces lub błąd) zapisywany jest usage:

- `prompt_tokens`, `completion_tokens`, `cached_tokens` z odpowiedzi
- `cost_usd` wyliczane z danych cenowych
- `latency_ms`, `status`, `error_class` w razie błędu
- Persystowane w tabeli `usage_history`

Artefakty call log (jeśli włączone) trafiają do `${DATA_DIR}/call_logs/`.

---

## Kluczowe pliki — deep-dive

### chatCore.ts (5977 linii)

**Główny handler żądań**. Mimo rozmiaru ma przejrzystą strukturę:

```ts
// Pseudo-structure of chatCore.ts
export async function handleChat(request: NextRequest) {
  // 1. Auth + CORS
  await authenticateRequest(request);
  applyCorsHeaders(response);

  // 2. Body validation
  const body = await parseRequestBody(request);

  // 3. Format detection + translation
  const sourceFormat = detectFormat(request);
  const targetFormat = getTargetFormat(providerId);
  if (needsTranslation(sourceFormat, targetFormat)) {
    body = translateRequest(body, sourceFormat, targetFormat);
  }

  // 4. Combo routing
  const targets = await resolveComboTargets(comboId, body);
  for (const target of targets) {
    try {
      const result = await executeOnTarget(target, body);
      await recordUsage(result);
      return result;
    } catch (err) {
      // Continue to next target
    }
  }

  // 5. Emergency fallback
  return await emergencyFallback(body);
}
```

Mimo że to jedna wielka funkcja, jest zorganizowana w **sekcje z komentarzami**, które mapują się na 5-etapowy pipeline.

### combo.ts (4456 LOC)

**Silnik routingu**, który rozwiązuje combo do uporządkowanej listy targetów.

```ts
// services/combo.ts
export async function handleComboChat(body, comboId): Promise<ChatResult> {
  const targets = await resolveComboTargets(comboId, body);
  for (const target of targets) {
    try {
      return await handleSingleModel(target, body);
    } catch (err) {
      log.warn("target failed, trying next", { target, err });
    }
  }
  throw new ComboExhaustedError("All targets failed");
}
```

Obsługuje **19 publicznych strategii routingu** (zob. `src/shared/constants/routingStrategies.ts`):

| Strategia           | Zachowanie                                                            |
| ------------------- | --------------------------------------------------------------------- |
| `priority`          | Uporządkowana lista first-target                                      |
| `weighted`          | Probabilistycznie według wagi per-target                              |
| `round-robin`       | Cykl przez targety w kolejności                                       |
| `context-relay`     | Przekazywanie kontekstu między targetami                              |
| `fill-first`        | Wypełnij quota przed przejściem do następnego                         |
| `p2c`               | Power of two choices                                                  |
| `random`            | Losowy jednostajny                                                    |
| `least-used`        | Wybierz ten z najmniejszą liczbą ostatnich użyć                       |
| `cost-optimized`    | Najtańszy healthy target najpierw                                     |
| `reset-aware`       | Świadomy okien resetu providera                                       |
| `reset-window`      | Routing oparty o okno resetu                                          |
| `headroom`          | Najpierw największy pozostały headroom quota                          |
| `strict-random`     | Prawdziwie jednostajny (bez ważenia jakości)                          |
| `auto`              | Scoring 13-czynnikowy (`autoCombo/`)                                  |
| `lkgp`              | Last known good provider najpierw                                     |
| `context-optimized` | Najlepszy dla żądań long-context                                      |
| `cache-optimized`   | Preferuj target z najlepszym dopasowaniem prompt cache                |
| `fusion`            | Fan-out do panelu równolegle, potem synteza przez judge (`fusion.ts`) |
| `pipeline`          | Sekwencyjnie przekazuj output każdego kroku do następnego             |

### base.ts (1170 LOC)

**Abstrakcyjny executor**, po którym dziedziczą moduły implementacji executorów. Katalog ma
obecnie 89 top-level modułów implementacji. Zawiera:

- `buildUrl()` — domyślna konstrukcja URL (podklasy nadpisują dla custom)
- `buildHeaders()` — domyślne nagłówki (auth, content-type)
- `transformRequest()` — domyślnie pass-through
- `execute()` — główna pętla HTTP z retry/backoff/breaker

```ts
// open-sse/executors/default.ts
export class DefaultExecutor extends BaseExecutor {
  // Handles all OpenAI/Anthropic-compatible providers
  // Providers register configurations (URL, auth, headers) but share executor logic
}
```

Zachowanie specyficzne dla providera (auth headers, base URL, version headers) jest konfigurowane przez provider registry, a nie przez osobne klasy executorów.

````

---

## Serwisy (117 modułów)

Serwisy to **skupione, jednozadaniowe moduły**, które handlery komponują ze sobą. Główne kategorie:

### Routing i Combo

- `combo.ts` — punkt wejścia dla żądań routowanych przez combo
- `services/autoCombo/` — scoring 13-czynnikowy, warianty i mode packs auto-routingu
- `wildcardRouter.ts` — dopasowanie wildcard routes (`gpt-*`)
- `modelFamilyFallback.ts` — fallback T5 wewnątrz rodziny modeli

### Rate limiting i quota

- `rateLimitManager.ts` — token bucket per key+provider
- `usage.ts` — zapis usage
- `quotaCache.ts` — migawki quota w pamięci

### Account i token

- `tokenRefresh.ts` — odświeżanie OAuth przy 401
- `accountFallback.ts` — przełączenie na alternatywne konto
- `sessionManager.ts` — stan sesji multi-turn

### Intelligence

- `intentClassifier.ts` — klasyfikacja intencji żądania
- `taskAwareRouter.ts` — routing według typu zadania
- `thinkingBudget.ts` — alokacja thinking tokens
- `contextManager.ts` — wstrzykiwanie kontekstu routingu

### Resilience

- `resilience.ts` — orkiestracja retry, backoff, breaker
- `emergencyFallback.ts` — fallback ostateczności
- `modelDeprecation.ts` — auto-routing do modeli-następców

### State

- `signatureCache.ts` — deduplikacja po sygnaturze żądania
- `volumeDetector.ts` — load shedding
- `contextHandoff.ts` — serializacja sesji

### Compression

- `compression/` (podkatalog) — pełny pipeline kompresji
- 39 plików obejmujących engines, rule packs, adapters

### Skills

- (opisane w [SKILLS.md](./SKILLS.md))

### Memory

- (opisane w [MEMORY.md](./MEMORY.md))

---

## Executory (75+ plików)

Jeden plik na providera. Wszystkie dziedziczą po `BaseExecutor` i nadpisują to, co się różni.

### Wspólne wzorce

Providery są rozwiązywane przez `getExecutor(providerId)`, które zwraca skonfigurowany executor. Providery kompatybilne z OpenAI/Anthropic używają `DefaultExecutor` (`executors/default.ts`). Zachowanie specyficzne dla providera (base URL, auth headers, API version) jest konfigurowane w `open-sse/config/providers/`, a transformacje body żądania obsługuje `open-sse/translator/`.

**Custom URL** ustawia się przez konfigurację providera:

```ts
// Provider config in open-sse/config/providers/
export default {
  id: "together",
  baseURL: "https://api.together.xyz/v1/chat/completions",
}
````

**Custom auth** jest obsługiwany przez konfigurację auth w provider registry (API key, OAuth, profile nagłówków).

**Custom body żądania** — transformacje (np. Anthropic oddzielające `system` od `messages`) są rejestrowane per-provider w `open-sse/translator/`.

````

### Fabryka executorów

`executors/index.ts` eksportuje `getExecutor(providerId)`:

```ts
import { getExecutor } from "@omniroute/open-sse/executors";

const executor = getExecutor("anthropic");
const result = await executor.execute({
  model: "claude-sonnet-4-5",
  messages: [...],
});
````

Fabryka korzysta z katalogu 329 wpisów providerów oraz wspólnych wartości domyślnych i 89 modułów implementacji executorów.

---

## Translatory

Tłumaczą między **3 formatami**: OpenAI, Anthropic, Gemini, plus nowy Responses API.

### Kiedy następuje tłumaczenie

```ts
import { needsTranslation, translateRequest } from "@omniroute/open-sse/translator";

if (needsTranslation(sourceFormat, targetFormat)) {
  body = translateRequest(body, sourceFormat, targetFormat);
}
```

Typowe tłumaczenia:

- `OpenAI → Anthropic`: osobne pole `system`, nagłówek `x-api-key`
- `OpenAI → Gemini`: `contents` zamiast `messages`, `systemInstruction`
- `OpenAI → Responses API`: tablica `input`, stan `previous_response_id`

### Obsłużone przypadki brzegowe

- rola `developer` → `system` dla non-OpenAI
- rola `system` → scalona w pierwszą wiadomość user dla GLM/ERNIE
- `json_schema` → `responseMimeType` + `responseSchema` Gemini
- `tools` → format narzędzi specyficzny dla providera
- Parametry thinking (o1, Claude) → odpowiedniki specyficzne dla providera

---

## Serwer MCP

`open-sse/mcp-server/` implementuje serwer **Model Context Protocol**:

- **107 deduplikowanych narzędzi** (zarządzanie providerami, combo, memory, cache, compression, 1proxy, skills)
- **3 transporty**: stdio, SSE, Streamable HTTP
- **32 scopes** do drobnoziarnistej autoryzacji

### Rejestracja narzędzi

Narzędzia są rejestrowane jako samodzielne pliki w `open-sse/mcp-server/tools/`; każdy eksportuje name, schema, handler i scope:

```ts
// open-sse/mcp-server/tools/getHealth.ts
import { z } from "zod";
export default {
  name: "omniroute_get_health",
  description: "Get system health snapshot",
  scope: "read:health",
  inputSchema: z.object({}),
  handler: async (_args, ctx) => {
    return await getSystemHealth();
  },
};
```

### Transporty

```ts
// stdio (CLI usage)
startMcpStdio(server);

// SSE (HTTP-based streaming)
startMcpSse(server, port);

// Streamable HTTP (modern MCP)
startMcpStreamable(server, port);
```

### Autoryzacja

Każde wywołanie narzędzia przechodzi przez sprawdzenie scope (`open-sse/mcp-server/auth/`):

```ts
if (!hasScope(apiKey, "providers:read")) {
  throw new Error("Insufficient scope");
}
```

---

## Transformery

`open-sse/transformer/` konwertuje między formatami **Chat Completions** i **Responses API**.

### Po co osobny transformer?

Responses API to nowy format OpenAI ze **stateful conversations** (`previous_response_id`). Gdy klient wysyła żądanie Responses, OmniRoute:

1. Konwertuje Responses → Chat Completions wewnętrznie
2. Wysyła do providera (dowolnego wspierającego Chat Completions)
3. Konwertuje odpowiedź z powrotem do formatu Responses
4. Strumieniuje przekonwertowaną odpowiedź do klienta

Transformer (`transformer/responsesTransformer.ts`) udostępnia:

```ts
createResponsesApiTransformStream(): TransformStream
```

Obsługuje:

- zdarzenia `response.output_item.added`
- zdarzenia `response.output_text.delta`
- zdarzenie `response.completed`
- mapowanie tool call (`function_call` ↔ `tool_calls`)

---

## Konfiguracja

`open-sse/config/` to warstwa konfiguracji:

| Plik                          | Przeznaczenie                      |
| ----------------------------- | ---------------------------------- |
| `providerRegistry.ts`         | Wspólna konfiguracja rejestru providerów |
| `providerModels.ts`           | Aliasy modeli, mapowanie formatów  |
| `constants.ts`                | Timeouty, limity, kody statusu     |
| `defaultThinkingSignature.ts` | Domyślna sygnatura thinking Claude |
| `modelStrip.ts` (w services)  | Stripowanie pól per-provider       |

### Schemat Provider Registry

```ts
interface ProviderConfig {
  id: string;
  name: string;
  baseUrl: string;
  authType: "bearer" | "api-key" | "oauth" | "cookie";
  executorClass: string;
  defaultModel: string;
  capabilities: ProviderCapabilities;
  models: ModelDefinition[];
}
```

Walidacja Zod przy ładowaniu modułu zapewnia, że wszystkie konfiguracje providerów są poprawne.

---

## Ograniczenia wydajnościowe

Silnik routingu ma ścisłe budżety wydajności:

| Operacja                                   | Target | Pomiar                 |
| ------------------------------------------ | ------ | ---------------------- |
| Rozwiązanie combo                          | <10ms  | Dla 50 targetów        |
| Sprawdzenie rate limit                     | <1ms   | Token bucket w pamięci |
| Fallback rodziny modeli                    | <5ms   | Cache definicji rodzin |
| Dispatch routingu żądania                  | <2ms   | Hot path               |
| **Brak blocking I/O na hot path routingu** | —      | Wszystko async         |

---

## Anti-patterns

❌ **Synchroniczne wywołania DB w `combo.ts`** — pre-compute i cache
❌ **Logika retry w handlerach** — używaj `retry()` z serwisu resilience
❌ **Bezpośredni dostęp do konfiguracji providera** — używaj getterów `providerRegistry`
❌ **Hardcoded łańcuchy fallback** — definiuj w `modelFamilyFallback.ts`
❌ **Mutacje stanu między współbieżnymi żądaniami** — tylko kontekst scoped do żądania

---

## Dodawanie nowego komponentu

### Dodawanie nowego serwisu

1. Utwórz `open-sse/services/[serviceName].ts` z jasno określoną odpowiedzialnością
2. Wyeksportuj główną funkcję handlera oraz ewentualne stałe
3. Dodaj testy jednostkowe w `tests/unit/services/[serviceName].test.mjs`
4. Zintegruj z pipeline żądania w `handlers/chatCore.ts` (jeśli dotyczy routingu)
5. Zaktualizuj logikę routingu w `combo.ts`, jeśli serwis wpływa na wybór targetu
6. Udokumentuj w tym pliku

### Dodawanie nowego executora

1. Utwórz `open-sse/executors/[provider].ts` dziedziczący po `BaseExecutor`
2. Zarejestruj w `config/providerRegistry.ts`
3. Dodaj do fabryki `executors/index.ts`
4. Dodaj testy jednostkowe executora
5. Udokumentuj w `docs/architecture/ARCHITECTURE.md`

### Dodawanie nowego narzędzia MCP

1. Utwórz lub zaktualizuj `open-sse/mcp-server/tools/[category]Tools.ts`
2. Zdefiniuj schemat Zod dla inputów
3. Zarejestruj narzędzie w `mcp-server/index.ts`
4. Dodaj do macierzy scopes w `mcp-server/auth/`
5. Dodaj testy jednostkowe

---

## Zobacz też

- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — architektura wysokopoziomowa
- [CODEBASE_DOCUMENTATION.md](../architecture/CODEBASE_DOCUMENTATION.md) — referencja inżynierska
- [REPOSITORY_MAP.md](../architecture/REPOSITORY_MAP.md) — katalog po katalogu
- [AUTO-COMBO.md](../routing/AUTO-COMBO.md) — scoring 13-czynnikowy
- [MCP-SERVER.md](./MCP-SERVER.md) — serwer MCP
- [A2A-SERVER.md](./A2A-SERVER.md) — serwer A2A
- Źródło: `open-sse/` (400+ plików, ~143K LOC)
