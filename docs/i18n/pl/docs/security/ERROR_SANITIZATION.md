---
title: "Sanityzacja komunikatów błędów"
version: 3.8.40
lastUpdated: 2026-06-28
---

# Sanityzacja komunikatów błędów

> **Source of truth:** `open-sse/utils/error.ts` — `sanitizeErrorMessage`, `buildErrorBody`, `createErrorResult`
> **Tests:** `tests/unit/error-message-sanitization.test.ts`
> **Last updated:** 2026-06-28 — v3.8.40
> **Audience:** Każdy inżynier pracujący nad odpowiedziami błędów (trasy HTTP, strumienie SSE, executory, handlery MCP).
> **Status:** **OBOWIĄZKOWE** dla każdej ścieżki kodu, która zwraca komunikat błędu do klienta.

## Po co to istnieje

Reguła CodeQL `js/stack-trace-exposure` (CWE-209) flaguje każdą ścieżkę kodu, w której komunikat błędu pochodzący z wyjątku runtime trafia do odpowiedzi HTTP / SSE bez sanityzacji. Stack trace'y i bezwzględne ścieżki plików w odpowiedziach produkcyjnych dają atakującym:

- Wewnętrzny układ katalogów (`/srv/app/src/lib/...`) → rekonesans pod dalsze ataki.
- Wersje bibliotek / frameworków wywnioskowane ze stack frame'ów → dobór celowanych exploitów.
- Wrażliwe wartości runtime, które mogą być wstawione do błędów przez interpolację stringów (zapytania DB, wartości konfiguracji).

Helper `sanitizeErrorMessage` w `open-sse/utils/error.ts` usuwa obie klasy wycieków:

1. Wieloliniowe stack trace'y — zachowywana jest tylko pierwsza linia (właściwy komunikat błędu).
2. Bezwzględne ścieżki (`/...*.{ts,js,tsx,jsx,mjs,cjs}[:line[:col]]` oraz `C:\...`) — zastępowane przez `<path>`.

## Obowiązkowy wzorzec

### 1. Budowanie odpowiedzi błędu (trasy HTTP / API)

Używaj `buildErrorBody()` — sanityzacja jest wbudowana:

```ts
import { buildErrorBody } from "@omniroute/open-sse/utils/error.ts";

export async function POST(req: Request) {
  try {
    // ... handler logic ...
  } catch (err) {
    return new Response(JSON.stringify(buildErrorBody(500, String(err))), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
```

Albo, dla wygodnych wrapperów w tym samym module:

```ts
import {
  errorResponse, // one-shot Response object
  writeStreamError, // SSE writer
  createErrorResult, // { success: false, status, response, ... } shape
  unavailableResponse, // adds Retry-After
  providerCircuitOpenResponse,
  modelCooldownResponse,
} from "@omniroute/open-sse/utils/error.ts";
```

Wszystkie one przechodzą przez `buildErrorBody`, a więc przez `sanitizeErrorMessage`. **Nigdy nie musisz wywoływać `sanitizeErrorMessage` ręcznie**, gdy używasz tych helperów.

### 2. Własne envelope'y błędów (rzadko)

Gdy nie możesz użyć powyższych helperów (np. kształt odpowiedzi dyktuje protokół upstream jak Connect-RPC), importuj `sanitizeErrorMessage` bezpośrednio:

```ts
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error.ts";

const body = JSON.stringify({
  error: {
    message: sanitizeErrorMessage(rawMessage),
    type: "invalid_request_error",
    code: "",
  },
});
```

To jedyny dozwolony sposób składania własnego body błędu. Zobacz `open-sse/executors/cursor.ts::buildErrorResponse` jako implementację referencyjną.

### 3. Logowanie vs. odpowiadanie

`sanitizeErrorMessage` powinno owijać **wyłącznie** wartość, która przekracza granicę sieci. Logi wewnętrzne (`pino`, `console`) powinny zachowywać pełny komunikat, w tym stack, żeby operatorzy mogli debugować. Wzorzec:

```ts
try {
  // ...
} catch (err) {
  log.error({ err }, "handler failed"); // full err with stack — internal log
  return errorResponse(500, getErrorMessage(err)); // sanitized — sent to client
}
```

### 4. Zabronione wzorce

❌ **Nigdy** nie wstawiaj surowego wyjścia wyjątku do body Response:

```ts
// BAD: stack trace + file paths reach the client
return new Response(JSON.stringify({ error: { message: err.stack || err.message } }), {
  status: 500,
});
```

❌ **Nigdy** nie pisz własnego splittera pierwszej linii:

```ts
// BAD: forgets to strip absolute paths, may drift from the canonical helper
const safe = String(err).split("\n")[0];
```

❌ **Nigdy** nie sanityzuj w route i nie zapominaj o ścieżce SSE. Wszystko, co pisze do strumienia, przechodzi przez `writeStreamError` (lub leżące pod spodem `buildErrorBody`).

❌ **Nigdy** nie umieszczaj `process.cwd()`, `__filename`, `__dirname`, ścieżek pochodzących z env w komunikatach błędów — omijają one regex ścieżek i ujawniają topologię wdrożenia.

## Pokrycie w CI

`tests/unit/error-message-sanitization.test.ts` wymusza:

- Każda trasa pod `/api/model-combo-mappings/*` zwraca sanityzowane body przy 4xx/5xx.
- `sanitizeErrorMessage` usuwa wieloliniowe stack trace'y.
- `sanitizeErrorMessage` zastępuje bezwzględne ścieżki POSIX i Windows przez `<path>`.
- `sanitizeErrorMessage` bezpiecznie obsługuje wejścia `null`/`undefined`/instancje `Error`.
- `buildErrorBody` nigdy nie ujawnia stack trace'ów w polu `message`.

Przy dodawaniu nowej trasy lub executora skopiuj wzorzec asercji z tego pliku. Brama coverage (`npm run test:coverage`) wymusza ≥60% statements/lines/functions/branches — ścieżki błędów muszą być pokryte.

## Powiązane mechanizmy kontroli

- Alerty CodeQL `js/stack-trace-exposure` w `.github/security` powinny zawsze być **albo** naprawione przez te helpery, **albo** odrzucone z komentarzem cytującym ten dokument.
- Konfiguracja redakcji `pino` (`src/shared/utils/logRedaction.ts`) obsługuje redakcję logów strukturalnych osobno. Ten dokument obejmuje wyłącznie powierzchnię komunikatów w odpowiedziach.
- Denylist nagłówków upstream (`src/shared/constants/upstreamHeaders.ts`) pokrywa wyciek nagłówków — utrzymuj oba pliki w zgodności przy dodawaniu nowego ryzyka eksfiltracji.

## Przekazywanie szczegółów upstream (passthrough)

`buildErrorBody` przyjmuje opcjonalny trzeci argument `upstreamDetails` (surowe
sparowane body od providera upstream). Gdy jest podany, jest sanityzowany przez
`sanitizeUpstreamDetails` przed dołączeniem do odpowiedzi jako `upstream_details`.

Opcjonalny czwarty argument `classification` (`{ type?: string; code?: string }`)
zachowuje jawny typ/kod błędu zamiast ponownie wyprowadzać oba z tabeli
kodów statusu — używany, gdy caller już sklasyfikował awarię (np.
HTTP 499 → `client_disconnected`).

Reguły sanityzacji stosowane do `upstreamDetails`:

1. Liście stringowe: przepuszczane przez `sanitizeErrorMessage` (usuwa stacki + bezwzględne ścieżki).
2. Blocklista kluczy: klucze pasujące do `/stack|trace|path|file|cwd|dir|password|secret|token|key/i`
   są usuwane.
3. Limit głębokości: zagnieżdżenie powyżej 4 poziomów jest zastępowane stringiem `"[truncated]"`.
4. Tablice są ograniczane do 32 elementów.

Tylko siedem miejsc wywołania `createErrorResult` dla błędów upstream w `chatCore.ts` przekazuje
`upstreamErrorBody`. Wewnętrzne błędy OmniRoute (awarie parsowania SSE, pusta treść,
bloki guardrail) nie dołączają `upstream_details`.

NIE przekazuj surowego `err.stack`, `err.message` ani żadnego stringa z wyjątku runtime do
`upstreamDetails`. Te nadal muszą iść przez `errorResponse` / `buildErrorBody(code, msg)`
bez body upstream.

## Znane ograniczenie CodeQL: własne sanitizery nie są rozpoznawane

Query CodeQL [`js/stack-trace-exposure`](https://codeql.github.com/codeql-query-help/javascript/js-stack-trace-exposure/) używa stałej allowlisty wzorców sanitizerów (np. inline `.split("\n")[0]`, `String#replace` z określonymi kształtami regex, dostęp do `.message` na `Error`). **Nie** rozpoznaje indirekcji przez własny helper w stylu naszego `sanitizeErrorMessage()`.

Oznacza to, że callsite'y, które demonstracyjnie sanityzują przez ten moduł — na przykład `open-sse/utils/error.ts::errorResponse` i `open-sse/executors/cursor.ts::buildErrorResponse` — mogą nadal podnosić alert, mimo że kod jest funkcjonalnie bezpieczny. Precedensy odrzuceń: `#224`, `#231` (maj 2026), oba oznaczone jako `false positive` z uzasadnieniem technicznym.

**Jak obsłużyć nowe wystąpienie:**

1. Potwierdź, że callsite rzeczywiście kieruje komunikat przez `sanitizeErrorMessage` / `buildErrorBody` / jeden z wrapperów opisanych powyżej (przeczytaj łańcuch wywołań od początku do końca — nie ufaj komentarzowi).
2. Potwierdź, że `tests/unit/error-message-sanitization.test.ts` ćwiczy tę ścieżkę (albo dodaj coverage).
3. Odrzuć alert przez `gh api ... -X PATCH state=dismissed -f 'dismissed_reason=false positive'` z odniesieniem do tego dokumentu.
4. **Nie** „naprawiaj” przez wstawianie `.split("\n")[0]` wszędzie — helper jest jedynym źródłem prawdy; duplikowanie wzorca osłabia sanitizer (traci czyszczenie ścieżek, limit długości, koercję typów) dla pozorów uspokojenia skanera.

Przyjęcie funkcji opt-in takich jak konfiguracja własnych sanitizerów CodeQL [`@codeql/javascript-models`](https://codeql.github.com/docs/codeql-language-guides/customizing-library-models-for-javascript/) to długoterminowa poprawka; wykracza poza ten dokument.

## Referencje

- [CWE-209: Information Exposure Through an Error Message](https://cwe.mitre.org/data/definitions/209.html)
- [CodeQL `js/stack-trace-exposure`](https://codeql.github.com/codeql-query-help/javascript/js-stack-trace-exposure/)
- [OWASP: Error Handling Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Error_Handling_Cheat_Sheet.html)
- Commit centralizujący helper: `1a39c31f` — _fix(security): mask public upstream creds + centralize error sanitization_
