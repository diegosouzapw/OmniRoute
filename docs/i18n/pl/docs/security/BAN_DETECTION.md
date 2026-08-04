---
title: Wykrywanie bana konta / zakazanych słów kluczowych
---

# Wykrywanie bana konta / zakazanych słów kluczowych

OmniRoute skanuje odpowiedzi błędów upstream pod kątem sygnałów wskazujących, że
**konto providera jest trwale martwe** (zawieszone / dezaktywowane / zbanowane
za ToS) i po dopasowaniu przenosi to połączenie w **terminalny stan `banned`**,
tak aby nie było już wybierane do requestów. To właśnie konfiguruje karta ustawień
**Security → Banned Keywords** („Additional keywords that trigger permanent account
ban detection. Built-in keywords always apply.").

Ta strona dokumentuje wbudowaną listę, przepływ detekcji, jej zakres, jak bezpiecznie
dodawać własne słowa kluczowe oraz jak odzyskać oznaczone połączenie. Sam stan
terminalny jest częścią modelu resilience — zob.
[RESILIENCE_GUIDE](../architecture/RESILIENCE_GUIDE.md) („Terminal states").

**Źródło prawdy:** `open-sse/services/accountFallback.ts`
(`ACCOUNT_DEACTIVATED_SIGNALS`, `getMergedBannedSignals()`, `isAccountDeactivated()`).

## Wbudowane słowa kluczowe

Te 8 podciągów zawsze obowiązuje (bez rozróżniania wielkości liter), niezależnie od
dowolnej listy niestandardowej:

```
account_deactivated
account has been deactivated
account has been disabled
your account has been suspended
this account is deactivated
verify your account to continue                                 (Antigravity / Google Cloud Code)
this service has been disabled in this account for violation    (Antigravity)
this service has been disabled in this account                  (Antigravity)
```

> Ta lista ewoluuje, gdy providerzy zmieniają brzmienie komunikatów o banie.
> Autorytatywna kopia to `ACCOUNT_DEACTIVATED_SIGNALS` w
> `open-sse/services/accountFallback.ts`; powyższy blok traktuj jako snapshot.

Dwie sąsiednie, **osobne** tabele sygnałów żyją w tym samym pliku i _nie_ należą
do detekcji banned-keyword:

- `CREDITS_EXHAUSTED_SIGNALS` — wyczerpane billing/quota (`insufficient_quota`,
  `credit_balance_too_low`, `payment required`, …) → terminalny `credits_exhausted`.
- `OAUTH_INVALID_TOKEN_SIGNALS` — **nie-terminalne**; odświeżenie tokenu może
  przywrócić dostęp.

Uwaga: typowe przejściowe frazy w rodzaju **`rate limit`** / `429` obsługuje ścieżka
rate-limit / connection-cooldown i **nie** są sygnałami bana.

## Przepływ detekcji

```
upstream error response
  → body stringified + lowercased
  → isAccountDeactivated(body): getMergedBannedSignals().some(sig => body.includes(sig))   [substring match]
  → match?
      → connection testStatus = "banned"      (permanent — 1-year cooldown, never auto-recovers)
      → if setting `autoDisableBannedAccounts` is on → also isActive = false
      → connection is skipped during account selection (combo QUOTA_BLOCKING statuses)
```

- Dopasowanie to wyszukiwanie **podciągu bez rozróżniania wielkości liter** w
  **ciele** odpowiedzi (`isAccountDeactivated`, `accountFallback.ts`).
- Trwałe terminalizowanie do `banned` odpala się przy ciele z sygnałem bana przy
  **dowolnym statusie HTTP** (przez `markAccountUnavailable` → `checkFallbackError`).
  Węższa etykieta **`deactivated`** (`isActive=false`, gdy połączenie nie ma
  zapasowych kluczy API) jest zapisywana przez wbudowaną ścieżkę `chatCore.ts` przy
  **HTTP 401 / 403** (klasyfikacja przez `classifyProviderError` →
  `ACCOUNT_DEACTIVATED`). Uwaga: ścieżka `markAccountUnavailable()` zapisuje
  _inny_ status terminalny — **`expired`** — dla tego samego sygnału
  `ACCOUNT_DEACTIVATED` (przez `resolveTerminalConnectionStatus`), więc ten sam ban
  może pojawić się jako `deactivated` albo `expired` w zależności od tego, która
  ścieżka obsłużyła odpowiedź. (Starszy komentarz w kodzie mówi „when a 401 body
  contains these strings” — to zaniża obecne zachowanie.)
- Połączenie `banned` jest wykluczane z selekcji wszędzie, gdzie filtruje się
  statusy terminalne (`isTerminalConnectionStatus`, combo
  `QUOTA_BLOCKING_CONNECTION_STATUSES`).

## Zakres — które providery są skanowane

**Wszystkie providery.** Sprawdzenie działa w generycznym pipeline obsługi błędów,
przez który przechodzi każdy nieudany request upstream — **nie** jest ograniczone
do scraperów OAuth/subskrypcyjnych. Wynikowy stan terminalny dotyczy **połączenia**,
nie providera.

Przy tym wbudowane _łańcuchy_ są zorientowane na providery subskrypcyjne/OAuth
z realnym ryzykiem bana (ChatGPT Web, Claude Web, Codex, Muse Spark, Antigravity).
Provider z kluczem API odpali detektor tylko wtedy, gdy ciało błędu dosłownie
zawiera jeden z podciągów.

## Niestandardowe zakazane słowa kluczowe

Dodawaj lub usuwaj słowa kluczowe w **Security → Banned Keywords** (persystowane
jako globalne ustawienie `customBannedSignals` przez `PATCH /api/settings`). Są
**dokładane do** listy wbudowanej — nigdy jej nie zastępują — i hot-reloadują się
przy zapisie (oraz przy starcie) przez `setCustomBannedSignals()`. Każde słowo
kluczowe ma limit 200 znaków; nie ma limitu długości tablicy.

**⚠ Ryzyko false-positive — wybieraj konkretne frazy.** Detekcja to surowe
dopasowanie podciągu na całym ciele odpowiedzi, a trafienie jest **trwałe**
(1-roczny cooldown, ręczny recovery). Zbyt ogólne słowo kluczowe może zbanować
w pełni zdrowe połączenie:

- **Źle:** `quota`, `limit`, `error`, `denied` — pojawiają się w wielu błędach
  przejściowych.
- **Dobrze:** pełne zdania o banie, np. `your account has been suspended for`,
  `account permanently banned`, `violation of our terms`.

Preferuj najdłuższą jednoznaczną frazę, którą provider zwraca przy realnym banie.
W razie wątpliwości najpierw obserwuj `lastError` połączenia, a potem dodaj
dokładne brzmienie.

## Odzyskiwanie oznaczonego połączenia

Terminalne stany `banned` / `deactivated` **nigdy nie odzyskują się automatycznie**
(są wykluczone z ticka proactive-recovery — same wracają tylko cooldowny
`unavailable`). Operator musi je wyczyścić jawnie:

1. **Ponowny test połączenia** — akcja **Test** na dashboardzie
   (`POST /api/providers/{id}/test`); udany probe resetuje `testStatus` do
   `active` i czyści pola błędu.
2. **Ponowna autentykacja / edycja credentials** — dla providerów OAuth ponów
   flow logowania / odświeżenia; trasy create/import providera ustawiają
   `isActive = true`.
3. **Ponowne włączenie połączenia** — jeśli `autoDisableBannedAccounts` ustawiło
   `isActive = false`, włącz je z powrotem po naprawieniu konta.

Nie ma osobnego przycisku „clear ban flag” — recovery to re-test, re-auth albo
re-enable, zgodnie z ogólną regułą stanów terminalnych w
[RESILIENCE_GUIDE](../architecture/RESILIENCE_GUIDE.md).

## Pliki źródłowe

| Obszar                                    | Plik                                                                                                          |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| Tabele sygnałów + match                   | `open-sse/services/accountFallback.ts`                                                                        |
| Terminalizacja / persystencja             | `src/sse/services/auth.ts` (`markAccountUnavailable`, `resolveTerminalConnectionStatus`, `clearAccountError`) |
| Klasyfikacja inline                       | `open-sse/handlers/chatCore.ts`, `open-sse/services/errorClassifier.ts`                                       |
| Wykluczenie z recovery stanu terminalnego | `src/lib/quota/connectionRecovery.ts`                                                                         |
| Runtime load własnych słów kluczowych     | `src/lib/config/runtimeSettings.ts` (`setCustomBannedSignals`)                                                |
| UI ustawień                               | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`                                           |
