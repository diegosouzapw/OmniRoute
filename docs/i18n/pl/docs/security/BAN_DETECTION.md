# Account-Ban / Banned-Keyword Detection (Polski)

🌐 **Languages:** 🇺🇸 [English](../../../../security/BAN_DETECTION.md) · 🇪🇹 [am](../../../am/docs/security/BAN_DETECTION.md) · 🇸🇦 [ar](../../../ar/docs/security/BAN_DETECTION.md) · 🇦🇿 [az](../../../az/docs/security/BAN_DETECTION.md) · 🇧🇬 [bg](../../../bg/docs/security/BAN_DETECTION.md) · 🇧🇩 [bn](../../../bn/docs/security/BAN_DETECTION.md) · 🇧🇦 [bs](../../../bs/docs/security/BAN_DETECTION.md) · 🇨🇿 [cs](../../../cs/docs/security/BAN_DETECTION.md) · 🇩🇰 [da](../../../da/docs/security/BAN_DETECTION.md) · 🇩🇪 [de](../../../de/docs/security/BAN_DETECTION.md) · 🇬🇷 [el](../../../el/docs/security/BAN_DETECTION.md) · 🇪🇸 [es](../../../es/docs/security/BAN_DETECTION.md) · 🇪🇪 [et](../../../et/docs/security/BAN_DETECTION.md) · 🇮🇷 [fa](../../../fa/docs/security/BAN_DETECTION.md) · 🇫🇮 [fi](../../../fi/docs/security/BAN_DETECTION.md) · 🇫🇷 [fr](../../../fr/docs/security/BAN_DETECTION.md) · 🇮🇪 [ga](../../../ga/docs/security/BAN_DETECTION.md) · 🇮🇳 [gu](../../../gu/docs/security/BAN_DETECTION.md) · 🇳🇬 [ha](../../../ha/docs/security/BAN_DETECTION.md) · 🇮🇱 [he](../../../he/docs/security/BAN_DETECTION.md) · 🇮🇳 [hi](../../../hi/docs/security/BAN_DETECTION.md) · 🇭🇷 [hr](../../../hr/docs/security/BAN_DETECTION.md) · 🇭🇺 [hu](../../../hu/docs/security/BAN_DETECTION.md) · 🇦🇲 [hy](../../../hy/docs/security/BAN_DETECTION.md) · 🇮🇩 [id](../../../id/docs/security/BAN_DETECTION.md) · 🇳🇬 [ig](../../../ig/docs/security/BAN_DETECTION.md) · 🇮🇹 [it](../../../it/docs/security/BAN_DETECTION.md) · 🇯🇵 [ja](../../../ja/docs/security/BAN_DETECTION.md) · 🇬🇪 [ka](../../../ka/docs/security/BAN_DETECTION.md) · 🇰🇭 [km](../../../km/docs/security/BAN_DETECTION.md) · 🇮🇳 [kn](../../../kn/docs/security/BAN_DETECTION.md) · 🇰🇷 [ko](../../../ko/docs/security/BAN_DETECTION.md) · 🇱🇹 [lt](../../../lt/docs/security/BAN_DETECTION.md) · 🇱🇻 [lv](../../../lv/docs/security/BAN_DETECTION.md) · 🇮🇳 [ml](../../../ml/docs/security/BAN_DETECTION.md) · 🇮🇳 [mr](../../../mr/docs/security/BAN_DETECTION.md) · 🇲🇾 [ms](../../../ms/docs/security/BAN_DETECTION.md) · 🇲🇹 [mt](../../../mt/docs/security/BAN_DETECTION.md) · 🇲🇲 [my](../../../my/docs/security/BAN_DETECTION.md) · 🇳🇵 [ne](../../../ne/docs/security/BAN_DETECTION.md) · 🇳🇱 [nl](../../../nl/docs/security/BAN_DETECTION.md) · 🇳🇴 [no](../../../no/docs/security/BAN_DETECTION.md) · 🇮🇳 [or](../../../or/docs/security/BAN_DETECTION.md) · 🇮🇳 [pa](../../../pa/docs/security/BAN_DETECTION.md) · 🇵🇭 [phi](../../../phi/docs/security/BAN_DETECTION.md) · 🇵🇹 [pt](../../../pt/docs/security/BAN_DETECTION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/BAN_DETECTION.md) · 🇷🇴 [ro](../../../ro/docs/security/BAN_DETECTION.md) · 🇷🇺 [ru](../../../ru/docs/security/BAN_DETECTION.md) · 🇱🇰 [si](../../../si/docs/security/BAN_DETECTION.md) · 🇸🇰 [sk](../../../sk/docs/security/BAN_DETECTION.md) · 🇸🇮 [sl](../../../sl/docs/security/BAN_DETECTION.md) · 🇷🇸 [sr](../../../sr/docs/security/BAN_DETECTION.md) · 🇸🇪 [sv](../../../sv/docs/security/BAN_DETECTION.md) · 🇰🇪 [sw](../../../sw/docs/security/BAN_DETECTION.md) · 🇮🇳 [ta](../../../ta/docs/security/BAN_DETECTION.md) · 🇮🇳 [te](../../../te/docs/security/BAN_DETECTION.md) · 🇹🇭 [th](../../../th/docs/security/BAN_DETECTION.md) · 🇹🇷 [tr](../../../tr/docs/security/BAN_DETECTION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/BAN_DETECTION.md) · 🇵🇰 [ur](../../../ur/docs/security/BAN_DETECTION.md) · 🇺🇿 [uz](../../../uz/docs/security/BAN_DETECTION.md) · 🇻🇳 [vi](../../../vi/docs/security/BAN_DETECTION.md) · 🇳🇬 [yo](../../../yo/docs/security/BAN_DETECTION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/BAN_DETECTION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/BAN_DETECTION.md)

---

OmniRoute skanuje odpowiedzi błędów od dostawców w poszukiwaniu sygnałów wskazujących, że **konto zostało trwale wyłączone** (zawieszone / dezaktywowane / zablokowane za naruszenie warunków korzystania), a po znalezieniu dopasowania przenosi to połączenie do **terminalnego stanu `banned`**, dzięki czemu nie jest ono już wybierane do obsługi żądań. To właśnie konfiguruje karta ustawień **Security → Banned Keywords** („Dodatkowe słowa kluczowe wyzwalające wykrywanie trwałej blokady konta. Wbudowane słowa kluczowe mają zastosowanie zawsze.”).

Ta strona opisuje wbudowaną listę, przebieg wykrywania, jego zakres, bezpieczne dodawanie niestandardowych słów kluczowych oraz sposób przywrócenia oznaczonego połączenia. Sam stan terminalny jest częścią modelu odporności — zobacz
[RESILIENCE_GUIDE](../architecture/RESILIENCE_GUIDE.md) („Stany terminalne”).

**Źródło prawdy:** `open-sse/services/accountFallback.ts`
(`ACCOUNT_DEACTIVATED_SIGNALS`, `getMergedBannedSignals()`, `isAccountDeactivated()`),
a także `open-sse/services/errorClassifier.ts` dla nieterminalnej klasy weryfikacji
(`ACCOUNT_VERIFICATION_REQUIRED_SIGNALS` / `isAccountVerificationRequired()`) oraz dla
gałęzi 403, która z niej korzysta.

## Wbudowane słowa kluczowe

Poniższe 7 podciągów ma zastosowanie zawsze (bez rozróżniania wielkości liter), niezależnie od jakiejkolwiek listy niestandardowej:

```
account_deactivated
account has been deactivated
account has been disabled
your account has been suspended
this account is deactivated
this service has been disabled in this account for violation    (Antigravity)
this service has been disabled in this account                  (Antigravity)
```

> Ta lista ewoluuje wraz ze zmianami sformułowań używanych przez dostawców do informowania o blokadach. Źródłem autorytatywnym
> jest `ACCOUNT_DEACTIVATED_SIGNALS` w `open-sse/services/accountFallback.ts`;
> powyższy blok należy traktować jako migawkę.

### To nie jest blokada: monity weryfikacyjne wymagające działania operatora

`verify your account to continue` **znajdowało się wcześniej** na powyższej liście. Nie jest to sygnał blokady i obecnie znajduje się w `ACCOUNT_VERIFICATION_REQUIRED_SIGNALS`, które klasyfikuje go jako możliwy do naprawienia błąd `PROJECT_ROUTE_ERROR`, zamiast przenosić połączenie do stanu terminalnego.

Google Cloud Code / Antigravity zwracają go jako `403 VALIDATION_REQUIRED`. Jest on
**przejściowy i występuje na sprawnych kontach z pełnym limitem** — według pomiarów w aktywnym
wdrożeniu (2026-09-25, `proxy_logs`) jedno połączenie Antigravity zwróciło 33 takie
błędy 403 w ciągu 10 minut i pozostało `active`, podczas gdy równoległe połączenie dysponujące 100%
swojego limitu we wszystkich 17 oknach zostało trwale zablokowane przez **pojedynczy** taki błąd. Jedyną
różnicą było to, która próba została akurat obsłużona.

To rozróżnienie ma znaczenie, ponieważ dopasowanie terminalne ma wartość `permanent: true` (roczny okres wyłączenia,
bez automatycznego przywracania), podczas gdy operator usuwa monit weryfikacyjny w przeglądarce.
Pozostawienie tej frazy na liście blokad sprawiało również, że możliwa do naprawienia gałąź obsługi błędów 403 usługi Cloud Code w
`classifyProviderError` była nieosiągalna dla tego sformułowania, ponieważ `accountDeactivated` jest
sprawdzane jako pierwsze — dlatego mechanizm odzyskiwania tras projektu dodany dla Gemini Code Assist w
[#868](https://github.com/diegosouzapw/OmniRoute/pull/868) i
[#6452](https://github.com/diegosouzapw/OmniRoute/pull/6452) nie mógł się uruchomić.

Trzy sąsiadujące, **odrębne** tabele sygnałów _nie_ są częścią mechanizmu wykrywania zablokowanych słów kluczowych:

- `CREDITS_EXHAUSTED_SIGNALS` — wyczerpane środki/limity rozliczeniowe (`insufficient_quota`,
  `credit_balance_too_low`, `payment required`, …) → terminalny stan `credits_exhausted`.
- `OAUTH_INVALID_TOKEN_SIGNALS` — **nieterminalne**; odświeżenie tokenu może przywrócić działanie.
- `ACCOUNT_VERIFICATION_REQUIRED_SIGNALS` — **nieterminalne**; operator musi
  ponownie zweryfikować konto u dostawcy. Znajduje się w `open-sse/services/errorClassifier.ts`
  (pozostałe dwie znajdują się w `accountFallback.ts`). Zobacz sekcję powyżej.

Uwaga: typowe przejściowe frazy, takie jak **`rate limit`** / `429`, są obsługiwane przez
mechanizm limitowania szybkości / czasowego wyłączania połączenia i **nie** są sygnałami blokady.

## Przepływ wykrywania

```
odpowiedź błędu usługi nadrzędnej
  → treść przekształcona na ciąg znaków + małe litery
  → isAccountDeactivated(body): getMergedBannedSignals().some(sig => body.includes(sig))   [dopasowanie podciągu]
  → dopasowanie?
      → testStatus połączenia = "banned"      (trwałe — roczny okres karencji, bez automatycznego przywracania)
      → jeśli ustawienie `autoDisableBannedAccounts` jest włączone, a `autoDisableBannedScope`
        obejmuje to połączenie (`all` albo `subscription` dla OAuth/cookie/session)
        → dodatkowo isActive = false. Klucze API prepaid pozostają aktywne, gdy zakres to
        `subscription`.
      → połączenie jest pomijane podczas wyboru konta (statusy combo QUOTA_BLOCKING)
```

- Dopasowanie polega na **nieuwzględniającym wielkości liter wyszukiwaniu podciągu** w **treści**
  odpowiedzi (`isAccountDeactivated`, `accountFallback.ts`).
- Trwałe ustawienie stanu `banned` następuje po wykryciu w treści sygnału blokady przy **dowolnym
  statusie HTTP** (przez `markAccountUnavailable` → `checkFallbackError`). Węższa
  etykieta **`deactivated`** (`isActive=false`, gdy połączenie nie ma zapasowych
  kluczy API) jest zapisywana przez ścieżkę inline `chatCore.ts` dla **HTTP 401 / 403**
  (sklasyfikowaną przez `classifyProviderError` → `ACCOUNT_DEACTIVATED`). Należy zauważyć, że
  ścieżka `markAccountUnavailable()` zapisuje _inny_ status końcowy —
  **`expired`** — dla tego samego sygnału `ACCOUNT_DEACTIVATED` (przez
  `resolveTerminalConnectionStatus`), więc ta sama blokada może być widoczna jako
  `deactivated` albo `expired`, zależnie od tego, która ścieżka obsłużyła odpowiedź. (Starszy
  komentarz w kodzie mówi „gdy treść odpowiedzi 401 zawiera te ciągi” — nie oddaje to
  w pełni obecnego działania).
- Połączenie ze statusem `banned` jest wszędzie wykluczane z wyboru podczas filtrowania
  statusów końcowych (`isTerminalConnectionStatus`, combo `QUOTA_BLOCKING_CONNECTION_STATUSES`).

## Zakres — którzy dostawcy są skanowani

**Wszyscy dostawcy.** Kontrola działa w ogólnym potoku obsługi błędów, przez który
przechodzi każde nieudane żądanie do usługi nadrzędnej — **nie** jest ograniczona do
scraperów OAuth/subscription. Wynikowy stan końcowy jest przypisany do **połączenia**,
a nie do dostawcy.

Wbudowane _ciągi_ są jednak ukierunkowane na dostawców typu subscription/OAuth,
dla których istnieje rzeczywiste ryzyko blokady (ChatGPT Web Codex, Claude Web, Codex, Muse Spark,
Antigravity). Dostawca korzystający z klucza API uruchomi detektor tylko wtedy, gdy treść
jego błędu dosłownie zawiera jeden z tych podciągów.

`autoDisableBannedScope` (`all` | `subscription`, domyślnie `all`) określa, czy
dopasowanie ustawia również `isActive=false`. `subscription` oznacza stanowiska
oparte na logowaniu (płatne subskrypcje i bezpłatne konta, w tym sesje z web-cookie). Nadal
zapisuje `testStatus=banned` dla kluczy API prepaid, ale pozostawia je w puli
routingu. Docelowym rozwiązaniem są nadpisania dla poszczególnych dostawców i kont;
globalna wartość enum jest pierwszą wersją tego rozwiązania.

## Niestandardowe słowa kluczowe blokady

Dodawaj lub usuwaj słowa kluczowe w sekcji **Security → Banned Keywords** (zapisywane jako globalne
ustawienie `customBannedSignals` przez `PATCH /api/settings`). Są one **dodawane do**
wbudowanej listy — nigdy jej nie zastępują — i przeładowywane na bieżąco po zapisaniu (oraz podczas uruchamiania)
przez `setCustomBannedSignals()`. Każde słowo kluczowe może mieć maksymalnie 200 znaków; nie ma
limitu długości tablicy.

**⚠ Ryzyko wyników fałszywie dodatnich — wybieraj precyzyjne frazy.** Wykrywanie polega na surowym
dopasowaniu podciągu w całej treści odpowiedzi, a dopasowanie jest **trwałe** (roczny okres karencji,
ręczne przywracanie). Zbyt ogólne słowo kluczowe może zablokować całkowicie sprawne połączenie:

- **Źle:** `quota`, `limit`, `error`, `denied` — występują w wielu błędach przejściowych.
- **Dobrze:** pełne zdania informujące o blokadzie, np. `your account has been suspended for`,
  `account permanently banned`, `violation of our terms`.

Preferuj najdłuższą jednoznaczną frazę zwracaną przez dostawcę w przypadku rzeczywistej blokady. W razie
wątpliwości najpierw obserwuj `lastError` połączenia, a następnie dodaj dokładne sformułowanie.

## Przywracanie oznaczonego połączenia

Końcowe stany `banned` / `deactivated` **nigdy nie są przywracane automatycznie** (są wyłączone
z proaktywnego cyklu odzyskiwania — samoczynnie przywracane są tylko okresy karencji
`unavailable`). Operator musi jawnie je wyczyścić:

1. **Ponownie przetestuj połączenie** — akcja **Testuj** w panelu
   (`POST /api/providers/{id}/test`); pomyślne sprawdzenie resetuje `testStatus` do
   `active` i czyści pola błędów.
2. **Ponownie uwierzytelnij / edytuj dane logowania** — w przypadku dostawców OAuth ponownie wykonaj proces
   logowania / odświeżania; trasy tworzenia/importowania dostawcy ustawiają `isActive = true`.
3. **Ponownie włącz połączenie** — jeśli automatyczne wyłączenie ustawiło `isActive = false`
   (zakres `all` lub `subscription` dla połączenia OAuth/cookie/session),
   włącz je ponownie po naprawieniu konta.

Nie ma osobnego przycisku „wyczyść flagę blokady” — odzyskiwanie polega na ponownym teście, ponownym uwierzytelnieniu lub
ponownym włączeniu, zgodnie z ogólną regułą stanów końcowych opisaną w
[RESILIENCE_GUIDE](../architecture/RESILIENCE_GUIDE.md).

## Izolacja sondy (test-all modeli)

**Błąd pochodzący z sondy** (wywołania test-all modeli / kontroli kondycji wykonywane
wewnątrz `runAsProbe`) nigdy nie usuwa połączenia z puli (#9817): jest
**rejestrowany w celu zapewnienia widoczności** (`last_error`, `last_error_type`, `error_code`,
`last_error_at`), ale pomija **każdą** zmianę routingu — okresy karencji, stan
końcowy (`banned` / `deactivated` / `credits_exhausted`), blokady dla poszczególnych modeli,
wyłącznik obwodu dostawcy, 5-minutową pamięć podręczną limitów, odświeżanie tokenów OAuth
oraz automatyczne wyłączanie. Dezaktywację powoduje wyłącznie błąd rzeczywistego żądania.
Zarejestrowany błąd sprawia, że oznaczone konto jest widoczne w panelu, a jednocześnie nadal
obsługuje ruch.

Jedynym punktem decyzyjnym jest `shouldIsolateProbeFailures()`
(`src/shared/utils/probeOrigin.ts`), sprawdzany przez **każde** miejsce, które mogłoby
zmienić stan routingu wskutek błędu pochodzącego z sondy:

- `markAccountUnavailable` (`auth.ts`) — wyłącznie rejestracja (`lastError` jako nieprzetworzony tekst,
  `lastErrorType`, `errorCode`, `lastErrorAt`; celowo **bez**
  `backoffLevel`, który uruchomiłby automatyczne wygaszanie podczas wyboru i usunął
  rekord)
- `maybeAutoDisableBannedAccount` — bez automatycznego wyłączania
- `chatCore` — FORBIDDEN, ACCOUNT_DEACTIVATED, QUOTA_EXHAUSTED (wyłącznie rejestracja,
  bez końcowego stanu `credits_exhausted`), GEO_BLOCKED (bez wykluczenia na 24 godziny),
  MODEL_NOT_FOUND (bez `lockModel`), przełączenie awaryjne przez rotację konta codex przy błędzie 429
  (bez `markCodexScopeRateLimited`, bez utrwalania `rate_limited_until`, bez
  czyszczenia koligacji sesji), `persistCodexQuotaState` (bez zapisu stanu limitu,
  bez unieważniania pamięci podręcznej), `recordKeyHealthStatus` (mechanizm rotacji kondycji kluczy
  pozostaje nienaruszony)
- Odświeżanie OAuth — zarówno proaktywne odświeżanie w klasie bazowej modułu wykonawczego
  (`base.ts` `execute()`, bez wykorzystania rotacji tokena odświeżania), jak i
  reaktywna ścieżka 401/403 w `chatCore` (bez dezaktywacji `expired`)
- `chat.ts` — wyłącznik obwodu dostawcy i 5-minutowa pamięć podręczna limitów
  (`markAccountExhaustedFrom429`) nigdy nie są pogarszane

Zarejestrowany błąd sprawia, że oznaczone konto jest widoczne w panelu,
a jednocześnie nadal obsługuje ruch. Uwaga: rekord sondy przechowuje **nieprzetworzony**
(nieprzycięty) tekst błędu, w przeciwieństwie do obcięcia `slice(0,100)` stosowanego w rzeczywistej ścieżce.

Operatorzy używający test-all jako narzędzia konserwacyjnego mogą przywrócić historyczne
zachowanie (sonda jest traktowana jak rzeczywiste generowanie) na jeden z następujących sposobów:

- ustawienie `probeCanDisable` (`POST /api/settings` z
  `{"probeCanDisable": true}` lub bezpośrednia edycja bazy danych `key_value`), albo
- flaga funkcji **`PROBE_CAN_DISABLE=true`** (zmienna środowiskowa lub nadpisanie w bazie danych; ma pierwszeństwo przed
  ustawieniem).

Mechanizm bezpieczeństwa: jeśli odczyt flagi lub ustawień zgłosi wyjątek, izolacja pozostaje WŁĄCZONA.

## Pliki źródłowe

| Obszar                                                          | Plik                                                                                                          |
| --------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| Tabele sygnałów + dopasowywanie                                 | `open-sse/services/accountFallback.ts`                                                                        |
| Finalizacja / utrwalanie                                        | `src/sse/services/auth.ts` (`markAccountUnavailable`, `resolveTerminalConnectionStatus`, `clearAccountError`) |
| Zakres automatycznego wyłączania                                | `src/shared/utils/autoDisableBanned.ts`, `src/sse/services/autoDisableBannedAccount.ts`                       |
| Klasyfikacja w miejscu użycia                                   | `open-sse/handlers/chatCore.ts`, `open-sse/services/errorClassifier.ts`                                       |
| Wykluczenie odzyskiwania ze stanu końcowego                     | `src/lib/quota/connectionRecovery.ts`                                                                         |
| Wczytywanie niestandardowych słów kluczowych w czasie działania | `src/lib/config/runtimeSettings.ts` (`setCustomBannedSignals`)                                                |
| Interfejs ustawień                                              | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`                                           |
