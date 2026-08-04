---
title: "Guardrails"
version: 3.8.40
lastUpdated: 2026-06-28
---

# Guardrails

> **Źródło prawdy:** `src/lib/guardrails/`
> **Ostatnia aktualizacja:** 2026-06-28 — v3.8.40 (pokrycie injection-guard + limit skanu 16 KB + red-team)

Guardrails egzekwują bezpieczeństwo, politykę i transformacje treści na granicy
między OmniRoute a upstream providerami. Każdy guardrail może sprawdzać (oraz
opcjonalnie odrzucać, transformować lub adnotować) payloady żądań (`preCall`) i
odpowiedzi upstream (`postCall`).

System działa w trybie **fail-open**: jeśli guardrail rzuci wyjątek podczas
wykonania, registry zapisuje błąd i kontynuuje z następnym guardrailem zamiast
failować żądanie. Blokada to zawsze jawna decyzja (`block: true`), nigdy wypadek.

## Wbudowane guardrails

Registry automatycznie ładuje trzy guardrails w kolejności priorytetu przy imporcie
(zob. `registry.ts` → `registerDefaultGuardrails()`):

| Priority | Name               | Stage(s)       | File                 |
| -------- | ------------------ | -------------- | -------------------- |
| `5`      | `vision-bridge`    | `preCall`      | `visionBridge.ts`    |
| `10`     | `pii-masker`       | `pre` + `post` | `piiMasker.ts`       |
| `20`     | `prompt-injection` | `preCall`      | `promptInjection.ts` |

Niższe numery priority uruchamiane są **pierwsze**.

### Vision Bridge (`visionBridge.ts`)

Przechwytuje żądania zawierające obrazy skierowane do **modeli non-vision** i
zastępuje części obrazowe opisami tekstowymi wygenerowanymi przez konfigurowalny
model vision przed wywołaniem upstream. Dzięki temu providery text-only mogą
przezroczyście obsługiwać payloady multimodalne.

Przepływ:

1. Pomiń, jeśli docelowy model już obsługuje vision (chyba że znajduje się na
   liście forced-bridge `isVisionBridgeForcedModel`).
2. Wyodrębnij części obrazowe przez `extractImageParts(messages)`. Pomiń, jeśli brak.
3. Załaduj konfigurację runtime z `getSettings()` (`visionBridgeEnabled`,
   `visionBridgeModel`, `visionBridgePrompt`, `visionBridgeTimeout`,
   `visionBridgeMaxImages`).
4. Ogranicz obrazy do `maxImages`, wywołaj model vision **równolegle**
   (`Promise.allSettled`) i wstaw w ich miejsce części tekstowe
   `[Image N]: <description>` — nieudane obrazy stają się
   `[Image N]: (unavailable)`.
5. Zwróć `modifiedPayload` + meta (`imagesProcessed`, `processingTimeMs`,
   `visionModel`).

Domyślne wartości są w `src/shared/constants/visionBridgeDefaults.ts`. Guardrail
udostępnia opcję konstruktora `deps`, dzięki czemu testy mogą wstrzyknąć fałszywe
implementacje `getSettings` i `callVisionModel`.

### PII Masker (`piiMasker.ts`)

Działa na **obu** etapach.

- **`preCall`** klonuje payload, przechodzi po `system`, `messages`, `input` i
  `prompt` (w tym zwykłe elementy string), oraz stosuje `processPII()` (z
  `@/shared/utils/inputSanitizer`) do pól string `content`/`text`. Gdy
  `PII_REDACTION_ENABLED=true`, wykryte PII jest redagowane w wychodzącym
  payloadzie. Jest to niezależne od `INPUT_SANITIZER_MODE` (który kontroluje
  wyłącznie politykę prompt-injection). Gdy redakcja jest wyłączona, wywołanie
  zapisuje liczniki detekcji bez przepisywania treści.
- **`postCall`** głęboko klonuje odpowiedź, uruchamia `sanitizePIIResponse()`
  oraz masker kształtu Responses API (`maskResponsesOutput` — obejmuje
  `output_text` i `output[].content[].text`). Jeśli nastąpi jakakolwiek redakcja,
  zmodyfikowana odpowiedź zastępuje oryginał.

Guardrail nigdy nie blokuje; tylko adnotuje (`meta.detections`,
`meta.redacted`) albo przepisuje.

### Prompt Injection (`promptInjection.ts`)

Wykrywa adversarialne struktury w treści dostarczonej przez użytkownika i
egzekwuje skonfigurowaną politykę. Zachowanie sterowane jest zmiennymi
środowiskowymi i opcjami konstruktora:

| Setting         | Env var                                                                                               | Default | Effect                                                                                                                                                                                          |
| --------------- | ----------------------------------------------------------------------------------------------------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Enabled         | `INPUT_SANITIZER_ENABLED`                                                                             | `true`  | Gdy `false`, guardrail short-circuituje.                                                                                                                                                        |
| Mode            | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                       | `warn`  | Polityka injection: `block`, `warn` lub `log`. (`redact` jest akceptowane dla back-compat, ale **nie** usuwa tekstu injection; przepisywanie PII w żądaniu kontroluje `PII_REDACTION_ENABLED`.) |
| Block threshold | `blockThreshold` option / `INPUT_SANITIZER_BLOCK_THRESHOLD` (alias `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high`  | Minimalna severity wymagana do blokady. Medium domyślnie jest tylko obserwacyjne.                                                                                                               |

**Kolejność trybu** (`getMode`): `options.mode` wywołującego →
nadpisanie **DB feature-flag** `INJECTION_GUARD_MODE` (Dashboard → Settings →
Feature Flags) → env `INJECTION_GUARD_MODE` → env `INPUT_SANITIZER_MODE` →
`warn`. Nadpisanie z dashboardu wygrywa więc ze zmiennymi env, więc UI Feature
Flags steruje działającym guardem na żywo (bez restartu). Odczyt DB jest
fail-safe: przy błędzie guard wraca do zachowania opartego o env, a gdy brak
nadpisania zachowanie jest identyczne z rozstrzyganiem wyłącznie z env.

Źródła detekcji:

1. `sanitizeRequest()` z `@/shared/utils/inputSanitizer` (współdzielony zestaw
   detektorów używany też gdzie indziej w pipeline).
2. Wbudowane `DEFAULT_GUARD_PATTERNS` (obecnie `system_override_inline` i
   `markdown_system_block`, obie severity `high`).
3. Opcjonalne `customPatterns` przekazywane przez opcje konstruktora (stringi,
   regex albo rekordy `{ name, pattern, severity }`).

Gdy `mode === "block"` **oraz** co najmniej jedna detekcja osiąga próg severity,
`preCall` zwraca `{ block: true, message: "Request rejected:
suspicious content detected" }`. W trybach `warn`/`log` guardrail loguje, ale
dopuszcza wywołanie. Współdzielony helper `evaluatePromptInjection()` jest też
eksportowany dla callerów, którzy muszą ewaluować prompy bez przechodzenia przez
registry.

**Limit skanu (v3.8.20):** detektor sprawdza tylko **pierwsze 16 KB**
połączonego tekstu promptu — `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 bajtów) w
`src/shared/utils/inputSanitizer.ts`. Zarówno `detectInjection()`, jak i
`evaluatePromptInjection()` robią `slice(0, MAX_INJECTION_SCAN_BYTES)` przed pętlą
wzorców. Dyrektywy injection leżą zwykle na początku inputu, więc to ogranicza
CPU/GC regexów na payloadach setek KB bez osłabiania detekcji (por.
#3932, #4041).

## Kontrakt bazowy (`base.ts`)

```typescript
class BaseGuardrail {
  enabled: boolean;
  name: string;
  priority: number;

  constructor(name: string, options?: { enabled?: boolean; priority?: number });

  async preCall(payload: unknown, context: GuardrailContext): Promise<GuardrailResult | void>;

  async postCall(response: unknown, context: GuardrailContext): Promise<GuardrailResult | void>;
}

interface GuardrailResult<TValue = unknown> {
  block?: boolean; // true short-circuits the chain
  message?: string; // surfaced when blocking
  meta?: Record<string, unknown> | null;
  modifiedPayload?: TValue; // returned by preCall to rewrite the request
  modifiedResponse?: TValue; // returned by postCall to rewrite the response
}

interface GuardrailContext {
  apiKeyInfo?: Record<string, unknown> | null;
  disabledGuardrails?: string[] | null;
  endpoint?: string | null;
  headers?: Headers | Record<string, unknown> | null;
  log?: GuardrailLog | Console | null;
  method?: string | null;
  model?: string | null;
  provider?: string | null;
  sourceFormat?: string | null;
  stream?: boolean;
  targetFormat?: string | null;
}
```

Guardrail sygnalizuje „bez zmian”, zwracając `void`, `{}` albo
`{ block: false }`. Zwrócenie `modifiedPayload`/`modifiedResponse` zastępuje
wartość przepływającą przez łańcuch dla dalszych guardrails.

## Registry (`registry.ts`)

Singleton `guardrailRegistry` udostępnia:

- `register(guardrail)` — dodaje (lub zastępuje po znormalizowanej nazwie) guardrail i
  ponownie sortuje rosnąco po `priority`.
- `clear()` / `list()` — helpery administracyjne.
- `runPreCallHooks(payload, context)` — iteruje aktywne guardrails, przepuszcza
  payload przez `modifiedPayload` i zatrzymuje się na pierwszym `block: true`.
- `runPostCallHooks(response, context)` — ten sam przepływ po stronie odpowiedzi.
- `resetGuardrailsForTests({ registerDefaults })` — czyści stan i opcjonalnie
  ponownie rejestruje domyślne guardrails dla czystej izolacji testów.

Oba runnery zwracają `{ blocked, payload|response, results, guardrail?, message? }`,
gdzie `results` to tablica rekordów `GuardrailExecutionResult` zawierających
per-guardrail pola `blocked`, `skipped`, `modified`, `error` i `meta`,
przydatne do tracingu.

### Wyłączanie guardrails per-request

`resolveDisabledGuardrails({ apiKeyInfo, body, headers })` agreguje
zdeduplikowaną listę nazw guardrails, które należy pominąć dla bieżącego
żądania. Źródła (wszystkie opcjonalne, wszystkie scalane):

- `apiKeyInfo.disabledGuardrails`
- body żądania `disabledGuardrails` (top-level)
- body żądania `metadata.disabledGuardrails`
- nagłówek `x-omniroute-disabled-guardrails` (lub legacy
  `x-disabled-guardrails`)

Wartości mogą być tablicami stringów albo stringiem rozdzielonym przecinkami;
nazwy są normalizowane do lowercase kebab-case (`pii_masker` → `pii-masker`).
Wynik trafia przez `context.disabledGuardrails` do registry, które pomija
pasujące guardrails (`skipped: true` w `results`).

## Kolejność wykonania

Dla każdego żądania przepływającego przez `src/sse/handlers/chat.ts` i
`open-sse/handlers/chatCore.ts`:

1. `resolveDisabledGuardrails(...)` buduje listę pominięć z API key, body
   i nagłówków.
2. `guardrailRegistry.runPreCallHooks(body, ctx)` uruchamia guardrails w rosnącej
   kolejności priority:
   - Wyłączone guardrails są zapisywane jako `skipped`.
   - `preCall` każdego guardraila może przepisać payload przez `modifiedPayload`.
   - Pierwsze `block: true` short-circuituje łańcuch, a handler zwraca
     odpowiedź odrzucenia guardraila.
3. (Ewentualnie przepisany) payload trafia do combo routing i dispatch upstream.
4. Po złożeniu odpowiedzi `guardrailRegistry.runPostCallHooks(...)`
   uruchamia ten sam łańcuch na odpowiedzi. `block: true` tutaj odrzuca
   odpowiedź upstream.

Guardrails, które rzucą wyjątek, są zapisywane z `error: <message>` i logowane
przez `logger.warn`, ale łańcuch kontynuuje — fail-open z założenia.

## Konfiguracja

Zmienne środowiskowe odczytywane przez wbudowane guardrails:

| Variable                              | Used by                   | Effect                                                                                                  |
| ------------------------------------- | ------------------------- | ------------------------------------------------------------------------------------------------------- |
| `INPUT_SANITIZER_ENABLED`             | `prompt-injection`        | Ustaw `false`, aby całkowicie wyłączyć detekcję.                                                        |
| `INPUT_SANITIZER_MODE`                | `prompt-injection`        | Polityka injection: `warn`, `block` lub `log`. Legacy wartość `redact` nie przepisuje tekstu injection. |
| `INJECTION_GUARD_MODE`                | `prompt-injection`        | Tryb injection guard; także flaga feature w DB, która **nadpisuje** zmienne env (DB > ENV).             |
| `INPUT_SANITIZER_BLOCK_THRESHOLD`     | `prompt-injection`        | Minimalna severity, którą `MODE=block` odrzuca: `high` (domyślnie), `medium` lub `low`.                 |
| `INJECTION_GUARD_BLOCK_THRESHOLD`     | `prompt-injection`        | Legacy alias dla `INPUT_SANITIZER_BLOCK_THRESHOLD`.                                                     |
| `PII_REDACTION_ENABLED`               | `pii-masker`              | Gdy `true`, PII w żądaniu jest redagowane (niezależnie od trybu injection).                             |
| `PII_RESPONSE_SANITIZATION` / `_MODE` | `pii-masker` (downstream) | Kontroluje zachowanie maskera po stronie odpowiedzi.                                                    |

Vision Bridge czyta konfigurację runtime ze store ustawień opartego o DB
(`getSettings()`), nie ze zmiennych env: `visionBridgeEnabled`, `visionBridgeModel`,
`visionBridgePrompt`, `visionBridgeTimeout`, `visionBridgeMaxImages`. Domyślne
wartości są w `src/shared/constants/visionBridgeDefaults.ts`.

## Własne guardrails

```typescript
import { BaseGuardrail, guardrailRegistry } from "@/lib/guardrails";

class BudgetGuardrail extends BaseGuardrail {
  constructor() {
    super("budget", { priority: 50 });
  }

  async preCall(payload, ctx) {
    if (ctx.apiKeyInfo?.budgetExceeded) {
      return { block: true, message: "Daily budget exceeded" };
    }
    return { block: false };
  }
}

guardrailRegistry.register(new BudgetGuardrail());
```

Kroki:

1. Utwórz `src/lib/guardrails/myGuardrail.ts` rozszerzający `BaseGuardrail`.
2. Zaimplementuj `preCall` i/lub `postCall`.
3. Zarejestruj przy imporcie (push z `registerDefaultGuardrails`) albo
   wywołaj `guardrailRegistry.register(...)` w runtime — registry zastępuje
   wcześniejszy guardrail o tej samej znormalizowanej nazwie.
4. Dodaj testy w `tests/unit/` (istniejące przykłady:
   `tests/unit/guardrails-registry.test.ts`,
   `tests/unit/prompt-injection-guard.test.ts`,
   `tests/unit/guardrails/visionBridge.test.ts`).

## Testowanie

Używaj `resetGuardrailsForTests()` między testami, aby startować ze znanego stanu.
Przekaż `{ registerDefaults: false }`, aby zacząć z pustym registry i
zarejestrować tylko guardrails pod testem. Guardrail Vision Bridge przyjmuje
dependency injection (`deps.getSettings`, `deps.callVisionModel`), więc testy mogą
przećwiczyć pełny przepływ bez dostępu do DB ani sieci.

## Zobacz też

- `src/lib/guardrails/` — implementacja
- `src/shared/utils/inputSanitizer.ts` — współdzielony detektor napędzający
  prompt-injection i maskowanie PII
- `src/shared/constants/visionBridgeDefaults.ts` — domyślne wartości Vision Bridge i
  lista modeli forced-bridge
- `docs/architecture/RESILIENCE_GUIDE.md` — warstwa ortogonalna (circuit breaker, cooldowns)
- `docs/reference/ENVIRONMENT.md` — pełna referencja zmiennych env

## Pokrycie tras injection-guard i red-team (Phase 8 · Block D)

Injection-guard (`createInjectionGuard` / `withInjectionGuard`) obejmuje wszystkie trasy,
które przyjmują prompy użytkownika. Szanuje `INJECTION_GUARD_MODE` (domyślnie `warn` = tylko log;
`block` = zwraca HTTP 400 `SECURITY_001`).

| Type            | Routes                                                                                                                                               | Default mode |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| Text (existing) | `/v1/chat/completions`, `/v1/completions`, `/v1/relay/chat/completions`                                                                              | warn         |
| Generative      | `/v1/messages`, `/v1/responses`, `/v1/images/generations`, `/v1/images/edits`, `/v1/videos/generations`, `/v1/music/generations`, `/v1/audio/speech` | warn         |
| Data            | `/v1/embeddings`, `/v1/rerank`, `/v1/search`, `/v1/moderations`                                                                                      | warn         |

Ekstrakcja tekstu (`extractMessageContents`) obejmuje `messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system`.

**Red-team (nightly, `nightly-llm-security.yml`):** promptfoo weryfikuje, że każda trasa blokuje
korpus OWASP-LLM przy `INJECTION_GUARD_MODE=block`; garak uruchamia probe'y (pomija bez secretu).
`moderations` jest włączone dla spójności — operatorzy w trybie block mogą je wyłączyć przez
`resolveDisabledGuardrails`.

Workflow nightly (`.github/workflows/nightly-llm-security.yml`, cron + ręczny
dispatch) ma dwa joby:

- **`promptfoo-guard` (blocking)** — uruchamia `promptfoo eval -c promptfooconfig.yaml`
  z `INJECTION_GUARD_MODE=block`. Każdy przypadek adversarialny (np. „ignore all
  previous instructions…”, jailbreaki w stylu DAN) asertuje, że odpowiedź niesie
  `error.code === "SECURITY_001"`, tzn. guard faktycznie odrzucił żądanie.
- **`garak` (advisory)** — uruchamia garak `--probes promptinject,dan,leakreplay`
  przeciw lokalnej instancji OmniRoute (`http://localhost:20128/v1`). Bramkowany
  secretem providera (`PROMPTFOO_PROVIDER_KEY`); pomija łagodnie i jest sufiksowany
  `|| true`, więc raportuje bez failowania CI.

Pokrycie helpera guarda (`createInjectionGuard` / `withInjectionGuard`)
obejmuje każdą trasę `/v1` niosącą prompt; tekst promptu jest pobierany z
`messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system` przez
`extractMessageContents()` w `src/shared/utils/inputSanitizer.ts`.
