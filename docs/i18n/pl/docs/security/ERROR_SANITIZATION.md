# Error Message Sanitization (Polski)

🌐 **Languages:** 🇺🇸 [English](../../../../security/ERROR_SANITIZATION.md) · 🇪🇹 [am](../../../am/docs/security/ERROR_SANITIZATION.md) · 🇸🇦 [ar](../../../ar/docs/security/ERROR_SANITIZATION.md) · 🇦🇿 [az](../../../az/docs/security/ERROR_SANITIZATION.md) · 🇧🇬 [bg](../../../bg/docs/security/ERROR_SANITIZATION.md) · 🇧🇩 [bn](../../../bn/docs/security/ERROR_SANITIZATION.md) · 🇧🇦 [bs](../../../bs/docs/security/ERROR_SANITIZATION.md) · 🇨🇿 [cs](../../../cs/docs/security/ERROR_SANITIZATION.md) · 🇩🇰 [da](../../../da/docs/security/ERROR_SANITIZATION.md) · 🇩🇪 [de](../../../de/docs/security/ERROR_SANITIZATION.md) · 🇬🇷 [el](../../../el/docs/security/ERROR_SANITIZATION.md) · 🇪🇸 [es](../../../es/docs/security/ERROR_SANITIZATION.md) · 🇪🇪 [et](../../../et/docs/security/ERROR_SANITIZATION.md) · 🇮🇷 [fa](../../../fa/docs/security/ERROR_SANITIZATION.md) · 🇫🇮 [fi](../../../fi/docs/security/ERROR_SANITIZATION.md) · 🇫🇷 [fr](../../../fr/docs/security/ERROR_SANITIZATION.md) · 🇮🇪 [ga](../../../ga/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [gu](../../../gu/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [ha](../../../ha/docs/security/ERROR_SANITIZATION.md) · 🇮🇱 [he](../../../he/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [hi](../../../hi/docs/security/ERROR_SANITIZATION.md) · 🇭🇷 [hr](../../../hr/docs/security/ERROR_SANITIZATION.md) · 🇭🇺 [hu](../../../hu/docs/security/ERROR_SANITIZATION.md) · 🇦🇲 [hy](../../../hy/docs/security/ERROR_SANITIZATION.md) · 🇮🇩 [id](../../../id/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [ig](../../../ig/docs/security/ERROR_SANITIZATION.md) · 🇮🇹 [it](../../../it/docs/security/ERROR_SANITIZATION.md) · 🇯🇵 [ja](../../../ja/docs/security/ERROR_SANITIZATION.md) · 🇬🇪 [ka](../../../ka/docs/security/ERROR_SANITIZATION.md) · 🇰🇭 [km](../../../km/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [kn](../../../kn/docs/security/ERROR_SANITIZATION.md) · 🇰🇷 [ko](../../../ko/docs/security/ERROR_SANITIZATION.md) · 🇱🇹 [lt](../../../lt/docs/security/ERROR_SANITIZATION.md) · 🇱🇻 [lv](../../../lv/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [ml](../../../ml/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [mr](../../../mr/docs/security/ERROR_SANITIZATION.md) · 🇲🇾 [ms](../../../ms/docs/security/ERROR_SANITIZATION.md) · 🇲🇹 [mt](../../../mt/docs/security/ERROR_SANITIZATION.md) · 🇲🇲 [my](../../../my/docs/security/ERROR_SANITIZATION.md) · 🇳🇵 [ne](../../../ne/docs/security/ERROR_SANITIZATION.md) · 🇳🇱 [nl](../../../nl/docs/security/ERROR_SANITIZATION.md) · 🇳🇴 [no](../../../no/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [or](../../../or/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [pa](../../../pa/docs/security/ERROR_SANITIZATION.md) · 🇵🇭 [phi](../../../phi/docs/security/ERROR_SANITIZATION.md) · 🇵🇹 [pt](../../../pt/docs/security/ERROR_SANITIZATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/ERROR_SANITIZATION.md) · 🇷🇴 [ro](../../../ro/docs/security/ERROR_SANITIZATION.md) · 🇷🇺 [ru](../../../ru/docs/security/ERROR_SANITIZATION.md) · 🇱🇰 [si](../../../si/docs/security/ERROR_SANITIZATION.md) · 🇸🇰 [sk](../../../sk/docs/security/ERROR_SANITIZATION.md) · 🇸🇮 [sl](../../../sl/docs/security/ERROR_SANITIZATION.md) · 🇷🇸 [sr](../../../sr/docs/security/ERROR_SANITIZATION.md) · 🇸🇪 [sv](../../../sv/docs/security/ERROR_SANITIZATION.md) · 🇰🇪 [sw](../../../sw/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [ta](../../../ta/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [te](../../../te/docs/security/ERROR_SANITIZATION.md) · 🇹🇭 [th](../../../th/docs/security/ERROR_SANITIZATION.md) · 🇹🇷 [tr](../../../tr/docs/security/ERROR_SANITIZATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/ERROR_SANITIZATION.md) · 🇵🇰 [ur](../../../ur/docs/security/ERROR_SANITIZATION.md) · 🇺🇿 [uz](../../../uz/docs/security/ERROR_SANITIZATION.md) · 🇻🇳 [vi](../../../vi/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [yo](../../../yo/docs/security/ERROR_SANITIZATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/ERROR_SANITIZATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/ERROR_SANITIZATION.md)

---

> **Źródło prawdy:** `open-sse/utils/errorSanitization.ts`,
> `open-sse/utils/errorPathRedaction.ts` oraz publiczne konstruktory w `open-sse/utils/error.ts`
> **Testy:** `tests/unit/error-message-sanitization.test.ts`,
> `tests/unit/error-public-boundaries-hardening.test.ts`
> **Ostatnia aktualizacja:** 2026-09-02 — v3.8.51
> **Odbiorcy:** Każdy inżynier pracujący z odpowiedziami błędów (trasy HTTP, strumienie SSE, executory, handlery MCP).
> **Status:** **OBOWIĄZKOWE** dla każdej ścieżki kodu, która zwraca klientowi komunikat o błędzie.

## Dlaczego to istnieje

Reguła CodeQL `js/stack-trace-exposure` (CWE-209) oznacza każdą ścieżkę kodu, w której komunikat o błędzie pochodzący z wyjątku środowiska uruchomieniowego trafia do odpowiedzi HTTP / SSE bez uprzedniej sanityzacji. Ślady stosu i bezwzględne ścieżki plików w odpowiedziach produkcyjnych dostarczają atakującym:

- Wewnętrzną strukturę katalogów (`/srv/app/src/lib/...`) → informacje rozpoznawcze przydatne do dalszych ataków.
- Wersje bibliotek / frameworków wywnioskowane z ramek stosu → możliwość wyboru konkretnych exploitów.
- Wrażliwe wartości środowiska uruchomieniowego, które mogą być interpolowane do komunikatów o błędach (zapytania do bazy danych, wartości konfiguracji).

Funkcja pomocnicza `sanitizeErrorMessage`, eksportowana przez `open-sse/utils/error.ts`, usuwa następujące klasy
wycieków:

1. Fizyczne, serializowane i jednoznacznie osadzone końcowe fragmenty ramek stosu JavaScript.
2. Bezwzględne ścieżki systemu plików POSIX, Windows i UNC oraz ścieżki `file://`, zachowując bezpieczne adresy URL HTTPS
   i jawnie oznaczone trasy API.
3. Przypisania danych uwierzytelniających, typowe formaty tokenów dostawców, bloki PEM kluczy prywatnych oraz adresy URL
   `data` zawierające dane base64.

Sanityzator ogranicza długość danych wejściowych i bezpiecznie odrzuca dane, gdy rzucona wartość nie pozwala na konwersję do ciągu znaków.
Rekurencyjna sanityzacja nadrzędnych danych JSON usuwa również niebezpieczne klucze danych uwierzytelniających i ścieżek, aliasy sesji oraz
klucze sterujące prototypem, zanim odpowiedź zostanie zserializowana.

## Obowiązkowy wzorzec

### 1. Tworzenie odpowiedzi błędu (trasy HTTP / API)

Użyj `buildErrorBody()` — mechanizm oczyszczania jest wbudowany:

```ts
import { buildErrorBody } from "@omniroute/open-sse/utils/error.ts";

export async function POST(req: Request) {
  try {
    // ... logika procedury obsługi ...
  } catch (err) {
    return new Response(JSON.stringify(buildErrorBody(500, String(err))), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
```

Możesz też użyć pomocniczych wrapperów z tego samego modułu:

```ts
import {
  errorResponse, // obiekt Response tworzony jednym wywołaniem
  writeStreamError, // zapis do SSE
  createErrorResult, // struktura { success: false, status, response, ... }
  unavailableResponse, // dodaje Retry-After
  providerCircuitOpenResponse,
  modelCooldownResponse,
} from "@omniroute/open-sse/utils/error.ts";
```

Wszystkie stosują kanoniczną granicę błędów publicznych. `errorResponse`, `writeStreamError` oraz
`createErrorResult` korzystają z `buildErrorBody`; trzy wyspecjalizowane funkcje pomocnicze dotyczące ponawiania prób i obwodów
bezpośrednio odwzorowują i oczyszczają swój publiczny kontekst. Podczas korzystania z tych funkcji pomocniczych **nigdy nie musisz ręcznie wywoływać
`sanitizeErrorMessage`**.

### 2. Niestandardowe struktury błędów (rzadko)

Jeśli nie możesz użyć powyższych funkcji pomocniczych (np. struktura odpowiedzi jest narzucona przez protokół nadrzędny, taki jak Connect-RPC), zaimportuj bezpośrednio `sanitizeErrorMessage`:

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

Jest to jedyny dozwolony sposób tworzenia niestandardowej treści błędu. Implementację referencyjną znajdziesz w `open-sse/executors/cursor.ts::buildErrorResponse`.

### 3. Logowanie a odpowiadanie

Zaufane wyjątki wewnętrzne mogą zachowywać pełny komunikat i stos wywołań, aby operatorzy mogli diagnozować problemy. Wartości
pochodzące z granic dostawcy, walidacji, sesji przeglądarki lub obszarów związanych z poświadczeniami muszą zostać
oczyszczone, zanim trafią do danych wyjściowych konsoli, metadanych audytowych lub trwałych dzienników wywołań. Wzorzec:

```ts
try {
  // ...
} catch (err) {
  log.error({ err }, "handler failed"); // tylko zaufany wyjątek wewnętrzny
  return errorResponse(500, getErrorMessage(err)); // oczyszczone — wysyłane do klienta
}
```

W przypadku błędów kontrolowanych przez dostawcę należy również odwzorować logowaną wartość:

```ts
log.error({ message: sanitizeErrorMessage(err) || "Provider request failed" });
```

### 4. Zabronione wzorce

❌ **Nigdy** nie umieszczaj nieprzetworzonych danych wyjątku w treści Response:

```ts
// ŹLE: stos wywołań i ścieżki plików trafiają do klienta
return new Response(JSON.stringify({ error: { message: err.stack || err.message } }), {
  status: 500,
});
```

❌ **Nigdy** nie twórz własnego mechanizmu wyodrębniania pierwszego wiersza:

```ts
// ŹLE: nie usuwa ścieżek bezwzględnych i może odbiegać od kanonicznej funkcji pomocniczej
const safe = String(err).split("\n")[0];
```

❌ **Nigdy** nie ograniczaj oczyszczania do trasy, pomijając ścieżkę SSE. Wszystko, co zapisuje dane do strumienia, musi korzystać z `writeStreamError` (lub bazowego `buildErrorBody`).

❌ **Nigdy** nie umieszczaj celowo `process.cwd()`, `__filename`, `__dirname` ani ścieżek pochodzących ze zmiennych środowiskowych
w komunikatach o błędach. Mechanizm oczyszczania usuwa ścieżki bezwzględne w ramach ochrony warstwowej, ale kod wywołujący nie może
przede wszystkim tworzyć komunikatów ujawniających topologię.

## Pokrycie w CI

`tests/unit/error-message-sanitization.test.ts` wymusza:

- Każda trasa w `/api/model-combo-mappings/*` zwraca oczyszczone treści odpowiedzi dla błędów 4xx/5xx.
- `sanitizeErrorMessage` usuwa wielowierszowe ślady stosu.
- `sanitizeErrorMessage` zastępuje bezwzględne ścieżki POSIX i Windows wartością `<path>`.
- `sanitizeErrorMessage` bezpiecznie obsługuje dane wejściowe będące `null`/`undefined`/instancjami `Error`.
- `buildErrorBody` nigdy nie ujawnia śladów stosu w swoim polu `message`.

Podczas dodawania nowej trasy lub wykonawcy skopiuj wzorzec asercji z tego pliku. Próg pokrycia (`npm run test:coverage`) wymusza ≥60% instrukcji/wierszy/funkcji/rozgałęzień — ścieżki obsługi błędów muszą być pokryte.

### Bramka statyczna: `npm run check:error-helper`

`scripts/check/check-error-helper.mjs` skanuje `open-sse/executors/`, `open-sse/handlers/`, `open-sse/mcp-server/` oraz każdy plik `src/app/api/**/route.ts` pod kątem surowego przechwyconego błędu (`err.message` / `err.stack`) lub surowego `body.error.message` z systemu nadrzędnego, które trafiają do treści odpowiedzi przeznaczonej dla klienta.

**Zaufanie jest przypisane do wywołania, nigdy do pliku** (G-03, #15159). Wcześniej bramka pomijała cały plik, gdy tylko wykryła jakikolwiek import ze ścieżki `utils/error` — wyjątek dotyczący całego pliku stosowano do zagrożenia dotyczącego pojedynczego wywołania. Jeden poprawny `import { sanitizeErrorMessage }` bezterminowo zwalniał z kontroli każdy inny ujściowy punkt danych w pliku, przez co rzeczywisty wyciek trafił do wydania mimo zielonego statusu. Teraz wiersz jest uznawany za zaufany tylko wtedy, gdy faktycznie przekazuje dane przez zatwierdzony konstruktor lub mechanizm oczyszczający:

| Postać wiersza                                                                                                            | Zaufany?             |
| ------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| wywołuje `sanitizeErrorMessage` / `buildErrorBody` / `createErrorResult` / `toSafeMcpErrorMessage` / …                    | tak                  |
| wywołuje kanoniczny konstruktor **zaimportowany przez ten plik** z `open-sse/utils/error` lub `src/lib/api/errorResponse` | tak                  |
| zatwierdzony konstruktor jest wywoływany **w wielu wierszach**, więc pole `message:` znajduje się w późniejszym wierszu   | tak                  |
| wywołuje lokalną dla pliku funkcję `function errorResponse(...)`, której ciało wykonuje oczyszczanie                      | tak                  |
| przekazuje `err.message` / `err.stack` gdziekolwiek indziej                                                               | **nie — naruszenie** |

Warto znać dwie konsekwencje:

- Importowanie `errorResponse` _nie_ zapewnia bezwarunkowego zaufania. Plik, który definiuje własną funkcję `errorResponse`, nadal zostanie oznaczony w miejscu wywołania, ponieważ bramka ustala zaufanie dla poszczególnych symboli, a nie całych plików. To samo dotyczy `createErrorResponse`.
- `const body = buildErrorBody(status, sanitizeErrorMessage(msg))`, po którym występuje `error: body.error.message`, jest **oczyszczonym** idiomem używanym w wykonawcach `*-fetch.ts` i nie jest oznaczany.

Uwzględniane są oba zatwierdzone moduły konstruktorów: `open-sse/utils/error.ts` oraz `src/lib/api/errorResponse.ts`. Drugi z nich jest używany przez około 54 procedury obsługi tras poza `open-sse` i oczyszcza dane w obu swoich eksportach.

Dwie postacie, które **nie** są naruszeniami, choć bramka zgłaszała je kiedyś jako wycieki:

- surowy błąd wewnątrz **wiersza audytu** — `saveCallLog({ error: err.message })`, `logToolCall(...)` lub rejestrator przyjmujący najpierw komunikat (`log.error("BATCHES", "sweep failed", { error: err.message })`). Odpowiedź przeznaczona dla klienta w kolejnych wierszach może być statycznym `buildErrorBody`.
- **wielowierszowe** wywołanie zatwierdzonego konstruktora, w którym pole `message:` w ogóle nie wskazuje konstruktora:
  ```ts
  return createErrorResponse({
    status: 400,
    message: error.message,
  });
  ```

`KNOWN_MISSING_ERROR_HELPER` zamraża istniejące wcześniej naruszenia, dzięki czemu bramka blokuje wyłącznie _nowe_. `assertNoStale` automatycznie usuwa wpis po naprawieniu odpowiadającego mu naruszenia, więc zamrożony zestaw nie może skostnieć. Zabezpieczenia przed regresją: `tests/unit/check-error-helper.test.ts` oraz `tests/unit/check-error-helper-call-scope.test.ts`.

## Powiązane mechanizmy kontrolne

- Alerty CodeQL `js/stack-trace-exposure` w `.github/security` powinny być zawsze **albo** naprawiane za pomocą tych funkcji pomocniczych, **albo** odrzucane z komentarzem odwołującym się do tego dokumentu.
- Konfiguracja redakcji `pino` (`src/shared/utils/logRedaction.ts`) obsługuje zaufane logi strukturalne
  oddzielnie. Ten dokument dotyczy publicznych komunikatów odpowiedzi oraz wartości kontrolowanych przez dostawcę, które
  przekraczają trwałe granice logów wywołań/proxy.
- Lista blokowanych nagłówków nadrzędnych (`src/shared/constants/upstreamHeaders.ts`) zapobiega wyciekom nagłówków — podczas dodawania nowego zagrożenia eksfiltracją należy zachować spójność obu plików.

## Przekazywanie szczegółów z usługi nadrzędnej

`buildErrorBody` przyjmuje opcjonalny trzeci argument `upstreamDetails` (nieprzetworzona
przeanalizowana treść odpowiedzi od dostawcy nadrzędnego). Jeśli zostanie podany, przed
dołączeniem do odpowiedzi jako `upstream_details` jest oczyszczany przez
`sanitizeUpstreamDetails`.

Opcjonalny czwarty argument `classification`
(`{ type?: string; code?: string; reason?: string }`) przyjmuje jawną klasyfikację publiczną.
Każde pole jest odwzorowywane na ograniczony słownik identyfikatorów publicznych. Niebezpieczne wartości,
wartości przypominające dane uwierzytelniające, zawierające znaki sterujące lub zbyt długie są zastępowane
typem/kodem wynikającym ze statusu; niebezpieczna opcjonalna przyczyna jest pomijana. Trzycyfrowe
identyfikatory statusu HTTP (od `100` do `599`) pozostają prawidłowe dla kontraktów dostawców, które
udostępniają numeryczny status usługi nadrzędnej jako kod przeznaczony do odczytu maszynowego. Ten sam
ograniczony zakres jest akceptowany w lokalnie generowanej postaci zastępczej statusu HTTP; dowolne inne
numery i nazwy dostawców pozostają poza słownikiem.

Każdą jawną klasyfikację należy przekazywać w tym czwartym argumencie. Nigdy nie nadpisuj
`body.error.code`, `body.error.type` ani `body.error.reason` po zwróceniu wyniku przez `buildErrorBody()`;
modyfikacja po wywołaniu konstruktora omija publiczne odwzorowanie.

Reguły oczyszczania stosowane do `upstreamDetails`:

1. Liście tekstowe: przetwarzane przez `sanitizeErrorMessage` (usuwa stosy wywołań i ścieżki bezwzględne).
2. Niebezpieczne klucze związane ze ścieżkami, danymi uwierzytelniającymi, aliasami sesji i kontrolą prototypu są usuwane.
3. Limit głębokości: zagnieżdżenia przekraczające 4 poziomy są zastępowane ciągiem `"[truncated]"`.
4. Tablice są ograniczane do 32 elementów.

Tylko miejsca wywołania dysponujące przeanalizowaną treścią błędu dostawcy powinny przekazywać
`upstreamDetails`. Wewnętrzne błędy OmniRoute (błędy analizy SSE, pusta treść, blokady mechanizmów
ochronnych) nie mogą go zawierać.

NIE przekazuj nieprzetworzonych wartości `err.stack`, `err.message` ani żadnych ciągów pochodzących
z wyjątku środowiska wykonawczego do `upstreamDetails`. Nadal muszą one przechodzić przez
`errorResponse` / `buildErrorBody(code, msg)` bez treści odpowiedzi z usługi nadrzędnej.

Selektywne przekazywanie błędów 4xx z usługi nadrzędnej zachowuje bezpieczną strukturę JSON dostawcy
i sformułowania wymagane przez automatyczne odzyskiwanie klienta, ale nie jest przekazywaniem bajt w bajt:
rekurencyjny mechanizm oczyszczania jest zawsze uruchamiany przed serializacją. Cykliczne treści, treści
zawierające BigInt lub zawierające złośliwą metodę `toJSON()` są bezpiecznie odrzucane i nie kwalifikują
się do przekazania. OCR i moderacja stosują tę samą regułę; treści z usługi nadrzędnej, które nie są
formatem JSON, są puste lub mają błędnie oznaczony typ, są konwertowane do kanonicznej koperty błędu
JSON OmniRoute.

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
