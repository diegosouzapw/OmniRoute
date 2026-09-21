# Resilience Guide (Polski)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

OmniRoute ma trzy odrębne, lecz powiązane mechanizmy odporności. Każdy z nich ma inny zakres i przeznaczenie. Podczas debugowania zachowania routingu należy rozpatrywać je osobno.

![3-warstwowy model odporności](../diagrams/exported/resilience-3layers.svg)

> Źródło: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

## 1. Wyłącznik automatyczny dostawcy

**Zakres:** cały dostawca (np. `glm`, `openai`, `anthropic`).

**Przeznaczenie:** zaprzestanie kierowania ruchu do dostawcy, u którego wielokrotnie występują awarie na poziomie usługi nadrzędnej.

**Implementacja:**

- Klasa bazowa: `src/shared/utils/circuitBreaker.ts`
- Integracja: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- API stanu: `GET /api/monitoring/health`
- API resetowania: `POST /api/resilience/reset`
- Wrappery: `open-sse/services/accountFallback.ts`
- Tabela bazy danych: `domain_circuit_breakers`

**Stany:**

- `CLOSED` — normalny ruch jest dozwolony
- `DEGRADED` — ruch jest nadal dozwolony, ale monitorowana jest zwiększona liczba awarii dostawcy
- `OPEN` — dostawca jest tymczasowo zablokowany; routing combo go pomija
- `HALF_OPEN` — upłynął limit czasu resetowania; żądanie próbne jest dozwolone

**Konfigurowalne wartości domyślne (`open-sse/config/constants.ts`, dostępne w Panel → Ustawienia → Odporność):**

| Klasa     | Stan obniżonej sprawności od | Otwarcie od | Limit czasu resetowania |
| --------- | ---------------------------- | ----------- | ----------------------- |
| OAuth     | 5 awarii                     | 8 awarii    | 60s                     |
| Klucz API | 7 awarii                     | 12 awarii   | 30s                     |
| Lokalny   | wartość wyliczana            | 2 awarie    | 15s                     |

`degradationThreshold` określa, kiedy dostawca przechodzi do stanu `DEGRADED`; `failureThreshold` określa, kiedy wyłącznik zostaje otwarty, a dostawca pominięty. Profile dostawców lokalnych nie są jeszcze dostępne na stronie ustawień odporności.

**Kody wyzwalające:** wyłącznie statusy na poziomie dostawcy `[408, 500, 502, 503, 504]`. NIE wyzwalaj dla błędów na poziomie konta (większość 401/403/429 — należą one do mechanizmu okresu wyciszenia lub blokady).

**Leniwe odzyskiwanie:** po wygaśnięciu stanu `OPEN` funkcje `getStatus()`, `canExecute()`, `getRetryAfterMs()` odświeżają stan do `HALF_OPEN`. Nie jest wymagany żaden czasomierz działający w tle.

---

### Opcjonalny globalny okres wyciszenia dostawcy (bramka okna czasowego)

Czwarta, **opcjonalna** warstwa (`PROVIDER_COOLDOWN_ENABLED`, domyślnie **wyłączona**) przechowuje
między żądaniami informacje o zawodnych dostawcach w pliku
`open-sse/services/providerCooldownTracker.ts`. Dane te są uwzględniane podczas rozpoznawania celów combo,
aby kolejne żądania combo nie próbowały ponownie korzystać z dostawcy, który właśnie
uległ awarii. Wpisy na poziomie dostawcy uwzględniają bramkę okna czasowego `PROVIDER_PROFILES`:

| Profil    | wyzwala się po (`providerFailureThreshold`) | w okresie (`providerFailureWindowMs`) | okres wyciszenia (`providerCooldownMs`) |
| --------- | ------------------------------------------: | ------------------------------------: | --------------------------------------: |
| OAuth     |                                        `10` |                               `15min` |                                  `5min` |
| Klucz API |                                        `15` |                               `30min` |                                 `10min` |

Poniżej progu dostawca **nie** jest uznawany za objętego okresem wyciszenia; powodzenie czyści
okno. Wpisy na poziomie połączenia (`provider:connectionId`) zachowują natomiast
wykładniczy mechanizm wycofywania `minRetryCooldownMs → maxRetryCooldownMs`. Nadpisania:
`OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`.
Test zabezpieczający przed regresją: `tests/unit/provider-cooldown-window-gate.test.ts`.

## 2. Okres karencji połączenia

**Zakres:** pojedyncze połączenie/konto/klucz dostawcy.

**Cel:** pominięcie jednego wadliwego klucza, podczas gdy inne połączenia tego samego dostawcy nadal obsługują żądania.

**Implementacja:**

- Oznaczanie jako niedostępne: `src/sse/services/auth.ts::markAccountUnavailable()`
- Wybór: `getProviderCredentials*` w tym samym pliku
- Obliczanie okresu karencji: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Ustawienia: `src/lib/resilience/settings.ts`

**Pola dla każdego połączenia:**

- `rateLimitedUntil` — znacznik czasu wygaśnięcia okresu karencji
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — licznik wykładniczego wycofywania

**Domyślne okresy karencji:**

- Bazowy dla OAuth: 5 s
- Bazowy dla klucza API: 3 s
- 429 dla klucza API: preferuje pochodzące z usługi nadrzędnej nagłówki `Retry-After`/resetowania lub możliwy do przeanalizowania tekst resetowania
- Wycofywanie: `baseCooldownMs * 2 ** failureIndex`

**Ochrona przed lawiną równoczesnych żądań:** zapobiega nadmiernemu wydłużaniu okresu karencji lub podwójnemu zwiększaniu `backoffLevel` przez równoczesne błędy.

**Stany końcowe (NIE okresy karencji):**

- `banned` — ustawiany po wykryciu słowa kluczowego oznaczającego blokadę lub blokady konta (zobacz [BAN_DETECTION](../security/BAN_DETECTION.md)), a także po trzech kolejnych odmowach usługi nadrzędnej dotyczących pojedynczego żądania (`request_rejected`, np. Anthropic OAuth 403 „Request not allowed” — `open-sse/services/requestRejectedStreak.ts`); pojedyncza odmowa jedynie wprowadza połączenie w okres karencji
- `expired` (przechodzi do stanu końcowego po ograniczonej liczbie ponowień — `EXPIRED_RETRY_MAX = 3` z wykładniczym wycofywaniem — dzięki czemu przejściowe błędy OAuth mogą ustąpić samoczynnie, zanim konto zostanie trwale dezaktywowane)
- `credits_exhausted`

Stany te utrzymują się do czasu zmiany danych uwierzytelniających lub zresetowania ich przez operatora. Nie zastępuj stanów końcowych przejściowym stanem okresu karencji.

**Leniwe odzyskiwanie:** gdy `rateLimitedUntil` upłynie, połączenie ponownie kwalifikuje się do użycia. Po pomyślnym użyciu `clearAccountError()` usuwa wszystkie pola błędów.

### Bariera użycia Claude OAuth: ścieżka o niższym priorytecie + reset limitu sesji

**Zakres:** jedno połączenie subskrypcji Claude (OAuth). Obie funkcje są **opcjonalnie włączane dla każdego
połączenia** (Edytuj połączenie → sekcja Claude → `lowPriorityMode` / `autoLimitReset` w
`providerSpecificData`, obie domyślnie wyłączone) i odzwierciedlają polecenia `/low-priority` oraz
`/limit-reset` z Claude Code (kontrakt komunikacyjny przechwycony z Claude Code 2.1.263).

**Implementacja:**

- Maszyna stanów + klasyfikacja odpowiedzi: `open-sse/services/claudeLowPriority.ts`
- Klient statusu/żądania resetowania: `open-sse/services/claudeLimitReset.ts`
- Punkt zaczepienia executora (wstrzykiwanie nagłówka + ponowienie na tym samym koncie): `open-sse/executors/base.ts::execute()`
- Utrwalanie ustawienia opcjonalnego: `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**Wyzwalacz:** 5-godzinna bariera użycia — odpowiedź `429`, której nagłówki zawierają
`anthropic-ratelimit-unified-status: rejected` oraz, gdy konto się kwalifikuje,
`anthropic-ratelimit-unified-slow-offer: treatment`. Nic nie jest wysyłane przed pierwszą odpowiedzią
429 dotyczącą bariery; seria odpowiedzi 429 bez ujednoliconych nagłówków przechodzi standardową ścieżką okresu karencji.

**Ścieżka o niższym priorytecie** (`lowPriorityMode`):

- Po otrzymaniu odpowiedzi 429 dotyczącej bariery executor przyjmuje ofertę i natychmiast ponawia żądanie na **tym samym**
  koncie z `anthropic-usage-limit: slow`; ścieżka pozostaje aktywna do ogłoszonego czasu
  `anthropic-ratelimit-unified-reset` (+60 s okresu buforowego), a każde żądanie w tym przedziale zawiera
  ten nagłówek. Przechwycona odpowiedź 429 nigdy nie dociera do `handleChatCore`, więc połączenie
  **nie** przechodzi w okres karencji ani nie jest zastępowane innym.
- `anthropic-ratelimit-unified-slow-status` w późniejszych odpowiedziach: `active` / `not_needed`
  utrzymują ścieżkę; `slot_busy` (429) lub `529` powodują oczekiwanie przez wskazany przez serwer czas
  `anthropic-ratelimit-unified-slow-retry-after` (domyślnie 20 s, ograniczony do 5–600 s, z losowym odchyleniem ±30%)
  i ponowienie, z limitem `anthropic-ratelimit-unified-slow-max-wait` (domyślnie 20 min, ograniczenie
  od 1 min do 6 godz.) — po jego przekroczeniu ścieżka się kończy, a 10-minutowy okres wyciszenia blokuje ponowne przyjęcie. Czas
  oczekiwania jest dodatkowo ograniczony przez pozostały czas własnego limitu rozpoczęcia żądania nadrzędnego
  (`resolveFetchStartTimeout`, domyślnie 10 min) pomniejszony o margines 5 s: bez tego ograniczenia
  domyślny maksymalny czas oczekiwania wynoszący 20 minut przekroczyłby czas życia żądania, a uśpienie zostałoby przerwane
  w trakcie oczekiwania, ujawniając `TimeoutError` zamiast łagodnego zakończenia `max_wait` + wyciszenia.
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`, rozpoczęcie nowego 5-godzinnego okna lub
  `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true` (co kończy ścieżkę jako
  `extra_usage` przy dowolnym statusie, ponieważ płatne użycie ponad limit pokrywa teraz barierę) kończą ścieżkę;
  odpowiedź przechodzi następnie do standardowej ścieżki okresu karencji. `budget_exhausted` jest zapamiętywany do
  ogłoszonego resetu budżetu (≤ 8 dni).
- Sprawdzanie bariery następuje po wewnętrznych ponowieniach executora w ramach próby, wywołanych odpowiedzią 400 (edycja
  kontekstu, ograniczenia myślenia/wysiłku, automatyczne uczenie parametrów), więc odpowiedź 429 dotycząca bariery, która pojawi się dopiero podczas
  jednego z tych ponowień, nadal zostanie przechwycona zamiast trafić do ścieżki okresu karencji.
- Stan jest przechowywany w pamięci osobno dla każdego połączenia (restart skutkuje jedną dodatkową odpowiedzią 429 dotyczącą bariery, zanim oferta zostanie ponownie przyjęta).

**Reset limitu sesji** (`autoLimitReset`, wykonywany przed ścieżką, gdy obie funkcje są włączone):

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → blok `juniper_tide`;
  gdy `arm: "reset"` i `available: true`,
  `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits` z
  `{ "program": "juniper_tide" }` (UUID organizacji z
  `providerSpecificData.organizationUUID`, z rezerwową wartością z inicjalizacji).
- `result: reset|not_limited` → żądanie jest ponawiane z pełną szybkością (bez nagłówka trybu wolnego).
  `already_used` / `not_offered` zapamiętują `next_available_at` (domyślnie jeden tydzień); każda
  awaria powoduje 15-minutowe wycofanie. Reset jest dostępny raz w tygodniu i nadal wlicza się do
  limitu tygodniowego.

Zabezpieczenia przed regresją: `tests/unit/claude-low-priority-mode.test.ts`,
`tests/unit/claude-limit-reset.test.ts`, `tests/unit/claude-low-priority-executor.test.ts`.

### Koligacja sesji (#7274)

**Zakres:** jedna sesja klienta (nagłówek `X-Session-Id` / `x-codex-session-id` / `x-omniroute-session`) przypisana do jednego połączenia dla **dowolnego** dostawcy.

**Cel:** utrzymanie wieloturowego agenta (Claude Code, aider, agenci niestandardowi) na tym samym koncie między żądaniami, co ogranicza utratę kontekstu przy przełączaniu kont oraz powtarzające się błędy 429 przy zimnym starcie u dostawców przechowujących stan sesji na poziomie konta.

**Implementacja:**

- Ustalanie TTL: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- Wybór/tworzenie przypisania: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- Wyodrębnianie nagłówka (ogólne, dla dowolnego dostawcy): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- Utrwalona tabela przypisań: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- Ustawienie: `sessionAffinityTtlMs` (globalny TTL w ms, `0` wyłącza) — `src/lib/db/settings.ts`. Nazwa została zmieniona z właściwego tylko dla Codex ustawienia `codexSessionAffinityTtlMs` przez migrację `124_generic_session_affinity_ttl.sql`, która przenosi każdą wcześniej skonfigurowaną wartość TTL dla Codex jako nową wartość domyślną.

Przed #7274 funkcja `resolveSessionAffinityTtlMs()` natychmiast zwracała `0` dla każdego dostawcy poza `codex`, więc ustawienie TTL (oraz nagłówki sesji) nie miało wpływu nigdzie indziej, mimo że mechanizm przypisywania i wyodrębnianie nagłówków były już niezależne od dostawcy. Poprawka usunęła ten wcześniejszy zwrot; TTL jest teraz stosowany jednolicie do każdego dostawcy, gdy jego globalna wartość zostanie ustawiona powyżej `0`.

Trzy nagłówki koligacji sesji nigdy nie są przekazywane dalej — wykonawcy tworzą własne nagłówki dla dostawcy od podstaw, zamiast przekazywać nagłówki klienta, więc pozostają one wyłącznie wewnętrznymi identyfikatorami korelacji.

### Wyłączne dzierżawy połączeń dla zarządzanych sesji

**Zakres:** jeden aktywny zarządzany klient HTTP/sesja jest właścicielem jednego kwalifikującego się połączenia OmniRoute.

**Cel:** zapewnienie trwałego, wyłącznego prawa własności do połączenia klientom, którzy potrzebują ścisłej granicy routingu między żądaniami. Różni się to od koligacji sesji, która jest miękką preferencją ciągłości: wyłączna dzierżawa utrwala stan cyklu życia w SQLite, wymusza globalną unikalność aktywnego właściciela i aktywnego połączenia oraz odrzuca nieaktualną generację przed przekazaniem żądania do dostawcy.

Funkcja jest opcjonalna dla poszczególnych kluczy API. Zarządzany klucz musi mieć zakres `lease:exclusive` oraz jawną, niepustą listę `allowedConnections`. Każdy klient HTTP może używać punktu końcowego cyklu życia; nazwa klienta, user-agent, dostawca, metoda OAuth ani model nie są wymagane. Dzierżawa jest przypisana do połączenia, a nie do modelu, dlatego zmiana modelu zachowuje powiązanie, dopóki połączenie nadal spełnia zwykłe kryteria kwalifikacji. Standardowe reguły dotyczące modelu, limitu, stanu, okresu oczekiwania i listy dozwolonych połączeń pozostają nadrzędne i mogą przenieść tę samą generację do innego wolnego, kwalifikującego się połączenia.

Cykl życia jest obsługiwany przez `POST /api/v1/session-leases` z akcjami JSON `acquire`, `renew` i `release`. Zarządzane żądania inferencji przekazują nieprzezroczystą wartość `X-OmniRoute-Lease-Owner` oraz dokładną wartość `X-OmniRoute-Lease-Generation`. Identyfikator właściciela składa się z prefiksu `vlo_`, po którym następują 43 znaki base64url; przechowywany jest wyłącznie jego skrót SHA-256. Każda ostateczna kontrola przed przekazaniem żądania wiąże również identyfikator uwierzytelnionego klucza API oraz identyfikator aktywnego połączenia. Nagłówki sterujące dzierżawą są usuwane z dzienników, zachowanych migawek żądań oraz nagłówków przekazywanych przez wykonawców.

Jeśli standardowy routing ma kwalifikujących się zarządzanych kandydatów, ale każdy wolny kandydat jest zajęty przez obcą aktywną dzierżawę, OmniRoute zwraca HTTP `429`, kod niedostępności pojemności dzierżaw, stan oczekiwania na pojemność oraz ograniczoną wartość `Retry-After` wyliczoną na podstawie najwcześniejszego odpowiedniego terminu wygaśnięcia. Zwykły brak kwalifikujących się kandydatów nie stanowi konfliktu dzierżaw i zachowuje dotychczasową semantykę błędów routingu.

Powiązane mechanizmy pozostają odrębne:

- Zajętość sesji OAuth jest lokalnym dla procesu mechanizmem miękkiej dystrybucji kont OAuth.
- Semafory kont przyznają uprawnienia do współbieżnego wykonywania żądań i kończą się wraz z zakończeniem żądania.
- Wyłączne dzierżawy połączeń dla zarządzanych sesji zapewniają trwałe prawo własności w ramach cyklu życia wraz z kontrolą generacji.

---

## 3. Blokada modelu

**Zakres:** kombinacja dostawcy + połączenia + modelu.

**Zakres klucza według statusu:** status błędu określa, do którego klucza zostanie zapisana blokada
(`resolveLockoutScope()` w `open-sse/services/accountFallback/exactModelLock.ts`):

- `429` / `403` / `402` — sygnał limitu lub uprawnień — blokuje **rodzinę limitów**:
  dla codex cały zakres `codex` / `spark` (każdy model `gpt-5*` danego
  połączenia), a dla innych dostawców zakres zwracany przez `getQuotaScopedModelForProvider()`.
- `404` blokuje sam model (`getModelLockKey()` zawęża `not_found`).
- Każdy inny status — błędy transportu/serwera `5xx` oraz własny, syntetyzowany
  przez OmniRoute status `502` z walidacji jakości — blokuje wyłącznie **dokładną**
  kombinację dostawcy/połączenia/modelu. Nieprawidłowy strumień dla jednego modelu nie świadczy
  o limicie konta; przed wprowadzeniem tej reguły jedna pusta odpowiedź z
  `codex/gpt-5.6-luna` usuwała wszystkie modele `gpt-5*` tego połączenia
  z routingu na 2–30 min (z eskalacją), mimo że jego limit pozostawał niewykorzystany.
- Jawna opcja `scope` wywołującego zawsze ma pierwszeństwo (Antigravity przekazuje `"exact"`).

**Cel:** uniknięcie wyłączania całego połączenia, gdy tylko jeden model jest niedostępny lub objęty limitem.

**Przykłady:**

- Dostawcy z limitami dla poszczególnych modeli zwracający 429
- Lokalni dostawcy zwracający 404 dla jednego brakującego modelu
- Błędy uprawnień specyficzne dla trybu/modelu danego dostawcy (np. tryby Grok)

**Implementacja:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`.

### Panel okresów karencji modeli (v3.8.0)

Interfejs: Ustawienia → Okresy karencji modeli (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

Wyświetla aktywne blokady wraz z następującymi informacjami: dostawca, połączenie, model, przyczyna, expiresAt. Operatorzy mogą ręcznie ponownie włączyć model z poziomu karty.

**REST API:**

- `GET /api/resilience/model-cooldowns` — wyświetlenie aktywnych blokad
- `DELETE /api/resilience/model-cooldowns` — ręczne ponowne włączenie. Treść: `{provider, connection, model}`. Uwierzytelnianie: zarządzanie.

### Interfejs ustawień blokady + odzyskiwanie z redukcją po sukcesach (v3.8.23)

Blokada modelu zmieniła się z zawsze aktywnego, zakodowanego na stałe mechanizmu
w pełni konfigurowalną, opcjonalną funkcję z własną kartą ustawień i samonaprawiającą
ścieżką odzyskiwania.

**Karta ustawień:** Ustawienia → Blokada modelu
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`).
Jest ona **odrębna** od powyższej karty `ModelCooldownsCard` przeznaczonej tylko do odczytu (która jedynie
_wyświetla_ aktywne blokady) — nowa karta _konfiguruje parametry_. Wartości domyślne
znajdują się w `DEFAULT_MODEL_LOCKOUT_SETTINGS`
(`src/lib/resilience/modelLockoutSettings.ts`):

| Ustawienie              | Wartość domyślna                 | Znaczenie                                                                 |
| ----------------------- | -------------------------------- | ------------------------------------------------------------------------- |
| `enabled`               | `false`                          | Główny przełącznik — blokada modelu jest **domyślnie wyłączona**.         |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | Statusy systemu nadrzędnego uznawane za błąd dotyczący modelu.            |
| `baseCooldownMs`        | `120_000` (120 s)                | Początkowy czas blokady po pierwszym błędzie.                             |
| `maxCooldownMs`         | `1_800_000` (30 min)             | Górny limit eskalowanego okresu karencji.                                 |
| `maxBackoffSteps`       | `10`                             | Maksymalna liczba kroków eskalacji wykładniczego wycofywania.             |
| `useExponentialBackoff` | `true`                           | Określa, czy powtarzające się błędy wykładniczo wydłużają okres karencji. |

Ustawienia są utrwalane za pośrednictwem standardowego magazynu ustawień i walidowane
przy użyciu schematu ustawień odporności; karta ogranicza wartości `baseCooldownMs`/`maxCooldownMs`
(przy `maxCooldownMs ≥ baseCooldownMs`) oraz `maxBackoffSteps`.

**Odzyskiwanie z redukcją po sukcesach:** odzyskiwanie **nie** opiera się wyłącznie na wygaśnięciu czasomierza. Prawidłowa
odpowiedź stopniowo zmniejsza licznik błędów modelu, dzięki czemu model, który odzyskał sprawność
w trakcie okna, przestaje podlegać eskalacji (i zostaje odblokowany), zanim upłynie jego czasomierz. Po pomyślnym
obsłużeniu celu kombinowanego `open-sse/services/combo.ts` wywołuje `decayModelFailureCount()`
(`open-sse/services/accountFallback.ts`), która **dzieli przez dwa** zapisaną wartość
`failureCount` (`Math.floor(failureCount / 2)`); gdy osiągnie ona `0`, wpis blokady
zostaje całkowicie usunięty. Odpowiadająca jej funkcja `recordModelLockoutFailure()`
zwiększa licznik (i eskaluje okres karencji) w przypadku błędów występujących w
oknie eskalacji. Redukcja po sukcesach działa dodatkowo obok zwykłego wygaśnięcia czasomierza —
każda z tych ścieżek może ponownie włączyć model.

**Stan:** blokady są przechowywane **w pamięci** (`Map` obiektu
`ModelLockoutEntry` osobny dla każdego procesu, z kluczami w postaci `provider:connectionId:model`, a blokady o dokładnym zakresie z kluczami
`provider:connectionId:exact:model`) i nie są utrwalane w
bazie danych — zostają utracone po ponownym uruchomieniu. _Ustawienia_ są utrwalane, natomiast aktywny
_stan_ blokad jest efemeryczny.

---

## 4. Kontrola współbieżności quota-share (v3.8.36)

Konta subskrypcyjne (GLM, MiniMax itp.) często akceptują tylko około 1–3 równoczesnych
żądań; przekroczenie tego limitu powoduje błędy 429 i okresy karencji. Problem ten jest szczególnie dotkliwy
w przypadku kombinacji **quota-share** (`qtSd/…`), w których kilka kluczy API współdzieli jedno konto
nadrzędne. Trzy warstwy zapobiegają przeciążeniu współdzielonego konta.

### Limit współbieżności dla połączenia (`max_concurrent`)

Każde połączenie dostawcy może deklarować górny limit `max_concurrent`
(`provider_connections.max_concurrent`, ustawiany w oknie połączenia / API / bazie danych).
Pozostaw to pole puste, aby nie stosować limitu. Jest to jedyne ustawienie sterujące opisaną
poniżej warstwą serializacji — ustaw je na rzeczywistą współbieżność konta (np. GLM ~1, MiniMax ~2).

### Serializacja żądań quota-share

Gdy wysłanie quota-share jest kierowane do połączenia, które deklaruje dodatnią wartość
`max_concurrent`, równoczesne żądania do tego **konta** są serializowane za pomocą
semafora przypisanego do połączenia (klucz `qsconn:<connectionId>`): nadmiarowe żądania **czekają
w kolejce**, zamiast przeciążać konto. Mechanizm działa w trybie **fail-open** — w przypadku zapełnienia
kolejki lub przekroczenia limitu czasu żądanie jest kontynuowane bez przydziału miejsca, zamiast odrzucenia
żądania, które można wysłać. Funkcję można przełączyć w sekcji **Ustawienia → Odporność → Współbieżność
quota-share dla połączenia** (`resilienceSettings.quotaShareConcurrencyLimit.enabled`, domyślnie
włączone). Bez limitu `max_concurrent` zachowanie pozostaje niezmienione.

> Bramka routingu quota-share (`selectQuotaShareTarget`, DRR + P2C) sama działa
> w trybie fail-open i jedynie nadaje _niższy priorytet_ połączeniu, które osiągnęło limit — w przypadku
> puli z jednym połączeniem nie może narzucić twardego limitu, dlatego to właśnie ten semafor faktycznie
> ogranicza napływ żądań.

### Ponawianie z uwzględnieniem okresu karencji kombinacji

Dla każdej strategii kombinacji (gdy jest włączona) żądanie, które spowodowałoby utrwalenie błędu 429
w związku z KRÓTKIM, przejściowym okresem karencji, czeka na jego zakończenie i jest ponownie wysyłane,
zamiast zwracać błąd 429 — obejmuje to charakterystyczne dla Gemini okna TPM/RPM (około 60 s zgodnie
z retry-after) w kombinacjach wielu modeli, np. gdy oba cele kombinacji 2 modeli osiągną limit szybkości
dla danego modelu. Zachowanie jest ograniczone przez `comboCooldownWait` (`enabled`, `maxWaitMs`, `maxAttempts`,
`budgetMs`) w sekcji **Ustawienia → Odporność**. Mechanizm nigdy nie czeka w przypadku `quota_exhausted`
(blokada do północy) ani przyczyn związanych z uwierzytelnianiem lub nieznalezieniem zasobu.

---

## 5. Kontrola przyjmowania żądań do kolejki (v3.8.49 · zgłoszenie #6593)

**Zakres**: lokalna kolejka limitowania szybkości dla każdej pary dostawca+połączenie (`open-sse/services/rateLimitManager.ts`,
oparta na Bottleneck), znajdująca się o jedną warstwę niżej niż trzy powyższe mechanizmy.

**`maxWaitMs` ogranicza czas oczekiwania w kolejce; `executionMaxWaitMs` ogranicza czas wykonywania.**
Te dwa limity są celowo rozdzielone i żaden nie wpływa na drugi.

`resilienceSettings.requestQueue.maxWaitMs` to **budżet oczekiwania w kolejce**:
obejmuje oczekiwanie na przydzielenie miejsca u dostawcy, a następnie pozostawanie
w stanie QUEUED; jego licznik czasu jest zerowany w chwili, gdy zadanie opuszcza
stan QUEUED i rozpoczyna wykonywanie (`rateLimitManager.ts`, `wrappedFn`). Żądanie,
które przekroczy ten limit, nigdy nie trafia do usługi nadrzędnej. Wartość domyślna
to 30000ms, dostarczana przez `DEFAULT_REQUEST_QUEUE_MAX_WAIT_MS` w
`src/lib/resilience/settings.ts` i utrwalona przez
`tests/unit/ratelimit-admission-control-6593.test.ts`, dzięki czemu jej zmiana
spowoduje niepowodzenie tego testu, zamiast pozwolić, by ten akapit po cichu stał
się nieaktualny.

`resilienceSettings.requestQueue.executionMaxWaitMs` to wartość, którą Bottleneck
otrzymuje jako `expiration` zadania; jej licznik czasu jest uruchamiany dopiero po
przekazaniu zadania do wykonania. Stanowi zabezpieczenie dla modułów wykonawczych,
które nie mają własnego limitu czasu usługi nadrzędnej, i jest zwiększana do
własnego limitu czasu rozpoczęcia pobierania modułu wykonawczego, jeśli ten jest
dłuższy, dzięki czemu nie może przerwać prawidłowej odpowiedzi będącej w toku.
Wartość domyślna to 600000ms (10 min).

Przekazywanie budżetu kolejki do `expiration` powodowało wcześniej przerywanie
działania bram nieprzyrostowych w trakcie wykonywania — zgodnie z założeniem mogą
one działać przez kilka minut przed wysłaniem pierwszych bajtów — dlatego
wygaśnięcie jest zgłaszane jako `code:
"RATE_LIMIT_EXECUTION_TIMEOUT"` (HTTP 504), podczas gdy budżet kolejki używa kodu
przekroczenia czasu oczekiwania w kolejce. Każdą z tych wartości można nadpisać
za pomocą `RATE_LIMIT_MAX_WAIT_MS` /
`RATE_LIMIT_EXECUTION_MAX_WAIT_MS` (zmienne środowiskowe) lub w panelu
(**Ustawienia → Odporność**). Podczas normalizacji obie są ograniczane do zakresu
1ms–24h.

**Pierwszeństwo dla obu ustawień:** zmienna środowiskowa dostarcza jedynie
wartość _domyślną_. Wartość utrwalona w `resilienceSettings.requestQueue`
(panel / poprawka API, przechowywana w `key_value`) ma przed nią pierwszeństwo,
a wartość `rateLimitOverrides.maxWaitMs` / `.executionMaxWaitMs` określona dla
danego połączenia ma pierwszeństwo przed obiema. Ustawienie zmiennej środowiskowej
we wdrożeniu, które ma już utrwaloną wartość, nie zmieni więc niczego — należy
zamiast tego wyczyścić lub zaktualizować utrwalone ustawienie.

Czas przebywania w kolejce jest ograniczony przez `maxWaitMs`; opisane poniżej
`maxQueueDepth` ogranicza liczbę wywołujących, którzy mogą jednocześnie oczekiwać
w kolejce.

**`maxQueueDepth` — opcjonalny limit przyjmowania (nowość).** `resilienceSettings.requestQueue.maxQueueDepth`
ogranicza liczbę żądań, które mogą jednocześnie oczekiwać w kolejce (nie zostały
jeszcze przekazane do wykonania) dla jednej pary dostawca+połączenie. Gdy kolejka
zawiera już `maxQueueDepth` żądań, nowe żądanie jest natychmiast odrzucane
typowanym błędem `code: "RATE_LIMIT_QUEUE_FULL"` **zanim** kiedykolwiek trafi do
`limiter.schedule()` — dzięki temu odrzucenie jest tanie i następuje przed
jakimikolwiek dalszymi operacjami kompresji / tłumaczenia promptu dla tego
żądania. Wartość domyślna `0` oznacza wyłączenie limitu, co zachowuje
dotychczasowe zachowanie nieograniczonej kolejki; zakres wynosi 0–100000.
Ustawienie można nadpisać za pomocą `RATE_LIMIT_MAX_QUEUE_DEPTH` (zmienna
środowiskowa) lub `resilienceSettings.requestQueue.maxQueueDepth` (panel/poprawka
API).

Sama kontrola przyjmowania jest funkcją czystą
(`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`), dzięki
czemu można ją testować jednostkowo bez rzeczywistego limitera Bottleneck.

> Dokument RFC, od którego rozpoczęło się zgłoszenie #6593, proponował również
> flagę `bypassCompressionOnRateLimit`. Potok
> `open-sse/services/compression/` w tym repozytorium odpowiada za kompresję
> promptu/kontekstu w wychodzącym żądaniu LLM (`chatCore.ts`, w okolicy bloku
> `resolveCompressionSettings`/`selectCompressionStrategy`), a nie za kompresję
> odpowiedzi HTTP w generowanych treściach 429 — nie istnieje odpowiadająca temu
> ścieżka kodu dla dosłownej flagi pomijania. Ten etap kompresji promptu jest
> również obecnie wykonywany _przed_ `withRateLimit()` w potoku obsługi żądania,
> więc zmiana kolejności w celu pominięcia go po odrzuceniu z powodu pełnej
> kolejki jest odrębną, większą zmianą, wykraczającą poza zakres tego zgłoszenia;
> celowo **nie** została tutaj zaimplementowana i pozostawiono ją jako przyszłe
> zadanie, jeśli oszczędność zasobów CPU będzie warta ryzyka związanego ze zmianą
> kolejności.

---

## 6. Mechanizm monitorujący przepustowość wolnego strumienia (#9709)

Opcjonalne zabezpieczenie `resilienceSettings.streamRecovery.throughputWatchdog` wykrywa
źródło nadrzędne, które nadal wysyła fragmenty, ale generuje odpowiedź asystenta z szybkością
niższą od skonfigurowanej szybkości użytecznego wyjścia. Celowo różni się ono od limitu czasu
bezczynności: sygnały heartbeat i metadane nie resetują żadnego z tych liczników czasu ani nie
są uznawane za postęp. Różni się również od nieprzekraczalnego terminu próby (#9153), który
pozostaje bezwzględnym limitem bezpieczeństwa niezależnie od jakości danych wyjściowych.

Zanim mechanizm monitorujący będzie mógł przerwać operację, wymagany jest okres rozgrzewania,
po którym musi upłynąć pełne okno kroczące. Zlicza on delty tekstowe ze zdarzeń wyjściowych
interfejsów Chat Completions i Responses API (konserwatywny odpowiednik liczby bajtów UTF-8),
ignoruje zdarzenia zawierające wyłącznie dane o użyciu oraz zdarzenia puste, a także wstrzymuje
ocenę, gdy trwa przetwarzanie zdarzeń wywołań narzędzi lub rozumowania. Domyślnie jest wyłączony
i można go włączyć za pomocą `STREAM_THROUGHPUT_WATCHDOG_ENABLED=true`; okno, okres rozgrzewania,
minimalna szybkość i minimalna mierzalna ilość danych wyjściowych są ograniczane przez standardową
warstwę normalizacji ustawień odporności.

Po włączeniu przerwanie przez mechanizm monitorujący jest stosowane wyłącznie do aktywnej próby
źródła nadrzędnego. Zanim jakiekolwiek bajty staną się widoczne dla klienta, istniejąca ścieżka
wczesnego odzyskiwania w ramach tego samego konta może ponownie otworzyć próbę. Po zatwierdzeniu
strumień nigdy nie jest bezwarunkowo odtwarzany; jedynie istniejący kontrakt bezpiecznej kontynuacji
w trakcie strumienia może dołączyć sufiks. Finalizacja pozostaje jednorazowa, dzięki czemu rozliczanie
użycia i zwalnianie semafora nie są powielane.

---

## 7. Korekta statusu źródła nadrzędnego (błędnie zgłaszane błędy limitu)

**Zakres:** jedna brama nadrzędna, która zgłasza tymczasowe wyczerpanie limitu przy użyciu nieprawidłowego statusu HTTP.

**Cel:** skorygowanie mylącego statusu PRZED klasyfikacją, aby odbiorcy niższego poziomu (silnik mechanizmu rezerwowego, agregacja combo i odpowiedź zwracana klientowi) rozpoznawali rzeczywistą, przejściową naturę błędu, dla którego można ponowić próbę.

Niektóre bramy sygnalizują TYMCZASOWE wyczerpanie limitu przy użyciu statusu HTTP,
który nie zezwala na ponowienie próby. `agentrouter.org` zwraca `403` (czasami `400`)
z chińską treścią (`用户额度不足` / `额度不足`) zamiast standardowego `429`. Klienci tacy
jak Claude Code traktują `403` jako błąd trwały i przerywają sesję, a bez korekty
silnik mechanizmu rezerwowego klasyfikowałby go jako `AUTH_ERROR`, a nie zdarzenie
związane z limitem.

**Implementacja:**

- Rejestr + mechanizm dopasowywania: `open-sse/config/upstreamStatusRestatement.ts` —
  lista reguł dla poszczególnych dostawców (`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`), dopasowywanych za pomocą `applyStatusRestatement()`.
- Miejsce wywołania: blok `providerFailure:` w `open-sse/handlers/chatCore.ts`
  (w okolicy wiersza 3654), bezpośrednio po przetworzeniu przez `parseUpstreamError()`
  odpowiedzi źródła nadrzędnego ze statusem błędu HTTP (`!providerResponse.ok`) i przed
  wykonaniem jakiejkolwiek klasyfikacji, dzięki czemu każdy odbiorca niższego poziomu
  widzi skorygowany status. Błędy osadzone wewnątrz strumienia SSE ze statusem `200`
  korzystają z oddzielnej, późniejszej ścieżki przetwarzania strumienia i **nie** są
  obecnie objęte tym punktem zaczepienia — jest to znane ograniczenie, które nie jest
  jeszcze istotne dla błędnego statusu agentrouter (pojawiającego się jako status błędu HTTP).
- Kwalifikacja do ponowienia próby: `429` znajduje się w `RETRY_AFTER_ELIGIBLE_STATUSES`
  (`open-sse/services/combo/unavailableRetryGate.ts`), dlatego błąd ze skorygowanym statusem
  zawiera rzeczywiste okno ponowienia próby, zamiast być zwracany jako nieaktywny `403`.
- Syntetyczna wartość `60s` parametru `defaultRetryAfterMs` (`upstreamStatusRestatement.ts`)
  określa jedynie, co odpowiedź ze skorygowanym statusem przekazuje **klientowi**; sama
  w sobie nie określa czasu wewnętrznego wyciszenia/blokady połączenia — jest on regulowany
  oddzielnie przez mechanizm, który faktycznie obsługuje błąd ze skorygowanym statusem
  (eskalacyjne wycofywanie mechanizmu Connection Cooldown, §2, z bazową wartością `3s`
  dla dostawców używających kluczy API; albo Model Lockout, §3, dla dostawców z limitami
  zależnymi od modelu, takich jak agentrouter). Router może wewnętrznie kwalifikować się
  do ponowienia próby wcześniej niż po upływie 60-sekundowego okna ogłaszanego klientowi —
  jest to zamierzony margines bezpieczeństwa, a nie błąd.

Błędy trwałe (`无权访问模型` w agentrouter — brak dostępu do tego modelu) NIGDY nie mają
korygowanego statusu: `excludeMarkers` blokuje regułę nawet wtedy, gdy wystąpi dopasowanie
`textMarkers`, dzięki czemu błąd zachowuje pierwotny status i nic nie ponawia go w nieskończoność.
Odpowiadająca mu reguła klasyfikacji dostawcy
(`agentrouter-model-access-denied` w `open-sse/config/providerErrorRules.ts`:
`reason: "auth_error"`, `scope: "model"`, zadeklarowane bazowe wyciszenie `6h`) jest
sprawdzana przez `checkFallbackError` (`open-sse/services/accountFallback.ts`)
_przed_ ogólnym wczesnym zwrotem `FORBIDDEN` dla kategorii apikey, pod warunkiem
`honorsRuleLockScope(provider)` (#10334 — obecnie wyłącznie dla agentrouter za pośrednictwem
listy dozwolonych `HONORS_RULE_LOCK_SCOPE_PROVIDERS` w `providerErrorRules.ts`). Zadeklarowany
w regule 6-godzinny czas wyciszenia jest przekazywany dalej jako `fallbackResult.baseCooldownMs`,
ale nadal trafia do istniejącej wcześniej ścieżki blokady limitu dla poszczególnych modeli
(`lockModelIfPerModelQuota()` / `recordModelLockoutFailure()`, niezmienionej przez #10334
z wyjątkiem źródła czasu wyciszenia): jest ograniczany do skonfigurowanej przez operatora
wartości `mlSettings.maxCooldownMs` (domyślnie `1_800_000ms` / 30 min), tak jak każda inna
blokada modelu, a _utrwalony powód blokady_ pozostaje istniejącą wcześniej, zakodowaną na
stałe wartością `"forbidden"`, a nie pochodzącą z reguły wartością `"auth_error"` — od początku
do końca respektowany jest wyłącznie czas wyciszenia, a nie ciąg znaków określający przyczynę.
Samo połączenie pozostaje aktywne; inne modele korzystające z tego samego połączenia pozostają
niezmienione.

Ponownie sklasyfikowane błędy limitu (`额度不足`) trafiają w środowisku produkcyjnym do reguły dostawcy
(`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`, `scope:
"connection"`, bez zadeklarowanego własnego czasu odczekania — obowiązuje
domyślne skalowane opóźnienie warstwy trwałości). Od #10334 pole `scope` w
`ProviderErrorRuleMatch` JEST przetwarzane kompleksowo, ale **wyłącznie** dla dostawców z
listy dozwolonych `HONORS_RULE_LOCK_SCOPE_PROVIDERS` (`providerErrorRules.ts` —
obecnie tylko `"agentrouter"`, z kontrolą przez `honorsRuleLockScope()`). Dla każdego
innego dostawcy `scope` pozostaje wyłącznie informacyjne, dokładnie tak jak przed #10334.
`checkFallbackError` udostępnia zakres dopasowanej reguły jako
`fallbackResult.ruleScope`; `isAgentrouterConnectionQuotaScope()`
(`src/sse/services/auth.ts`) jest współdzielonym mechanizmem ochronnym, który potwierdza, że
`ruleScope` można rzeczywiście bezpiecznie respektować jako samoczynnie wygasający sygnał
obejmujący całe połączenie (zakres `"connection"`, przyczyna `quota_exhausted`, nigdy
`permanent`, nigdy `creditsExhausted` — zabezpieczenie przed przyszłą regułą łączącą zakres
`"connection"` z trwałym stanem konta). Wywołują go dwa komponenty:

- **Warstwa trwałości** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  zamiast przechodzić do gałęzi blokady **dla poszczególnych modeli**
  dostawcy przekazującego żądania (agentrouter ma `passthroughModels: true` → `hasPerModelQuota()`
  zwraca `true`), stosuje **tymczasowy czas odczekania dla połączenia** —
  `testStatus: "unavailable"` + `rateLimitedUntil`, nigdy status końcowy
  (`credits_exhausted`/`banned`/`expired`) — dzięki czemu połączenie samoczynnie odzyskuje
  dostępność po upływie czasu odczekania, zamiast wymagać ręcznego zresetowania poświadczeń.
  Pomijane dla połączeń z `disableCooling: true` (#2997): takie wyłączenie
  powoduje przejście do blokady dla poszczególnych modeli (jest to udokumentowany kompromis —
  zobacz komentarz w kodzie nad tą gałęzią).
- **Routing kombinowany w ramach tego samego żądania** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`): ten sam mechanizm ochronny dodaje
  połączenie do przechowywanego w pamięci zbioru `exhaustedConnections` z kluczem
  `${provider}:${connectionId}`. Powoduje to pominięcie wyłącznie pozostałego celu W RAMACH TEGO SAMEGO ŻĄDANIA,
  który _sam ma już dokładnie ten sam `connectionId`_ we własnym
  obiekcie celu (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`, `if (provider &&
connectionId)` przed wyszukaniem w `exhaustedConnections`) — zwykła
  kombinacja listy modeli, w której cele równorzędne nie mają własnego przypiętego `connectionId`,
  a połączenie jest ustalane dla każdego wywołania na podstawie nagłówka
  `X-OmniRoute-Selected-Connection-Id` odpowiedzi, nigdy nie dopasuje tego klucza. W
  tym częstym przypadku rzeczywistym zabezpieczeniem przed ponownym użyciem
  właśnie wyczerpanego konta przez pozostały etap NIE jest ten zbiór — jest nim opisana wyżej
  warstwa trwałości (`rateLimitedUntil` połączenia wskazuje teraz przyszłość) w połączeniu z
  tłumieniem przez ten sam mechanizm ochronny wpisu `transientRateLimitedProviders` dla
  błędu (zobacz „Projekt dwuetapowy” oraz komentarz w kodzie gałęzi
  `isAgentrouterConnectionQuotaScope` w `targetExhaustion.ts`): ponieważ
  ten zbiór pozostaje nieoznaczony, wymuszone zezwolenie `allowRateLimitedConnection` z `combo.ts`
  (`open-sse/services/combo.ts:1005-1013`, `:2734-2738`) NIE uruchamia się dla
  pozostałych etapów dostawcy, więc filtr `rateLimitedUntil` wyboru poświadczeń
  (`src/sse/services/auth.ts:1238`) jest normalnie respektowany, a
  pozostały etap wybiera inne, nadal kwalifikujące się połączenie agentrouter
  albo kończy się niepowodzeniem z powodu braku dostępnych poświadczeń — nie wymusza
  ponownego użycia połączenia, dla którego ta gałąź właśnie ustawiła czas odczekania.

### Projekt dwuetapowy: ponowne ustalenie statusu, następnie klasyfikacja

Ponowne ustalanie statusu (`upstreamStatusRestatement.ts`) i reguły klasyfikacji
dostawców (`open-sse/config/providerErrorRules.ts`,
`providerRuleRegistry`) są osobnymi rejestrami, które używają jako kluczy identyfikatora dostawcy
i znaczników tekstowych, ale działają w różnych miejscach i służą różnym
celom: ponowne ustalanie wcześnie przepisuje status HTTP w `chatCore.ts`;
reguły klasyfikacji wybierają zapasową `reason` i `scope` blokady
(`model` / `provider` / `connection`) wewnątrz `checkFallbackError()`
(`open-sse/services/accountFallback.ts`).

Reguły klasyfikacji widzą pełny **tekst** błędu (wymagany do dopasowania znaczników
treści, takich jak `额度不足`) tylko dla dostawców wymienionych na liście dozwolonych `FULL_TEXT_RULE_PROVIDERS`
w `providerErrorRules.ts` — obecnie tylko `"agentrouter"`. Dla
każdego innego dostawcy z **wbudowanego katalogu** `checkFallbackError` przekazuje
do `getProviderErrorRuleMatch` jedynie ustrukturyzowany błąd (`{code, type}`), co
wystarcza dla reguł opartych na nagłówkach/statusie/kodzie, ale nie pozwala wykrywać znaczników tekstowych w treści.
Funkcja pomocnicza `resolveRuleMatchBody()` dokonuje tego wyboru: pełny tekst błędu
dla dostawców z listy dozwolonych, a w przeciwnym razie ustrukturyzowany błąd. Dodanie
**wbudowanego** dostawcy do `FULL_TEXT_RULE_PROVIDERS` jest jawnym wyborem
dla konkretnego dostawcy — mechanizm ten istnieje po to, aby domyślna ścieżka każdego dostawcy spoza
listy pozostała niezmieniona bajt po bajcie.

`scope` reguły (`model` / `provider` / `connection`) jest opcją niezależną
od `FULL_TEXT_RULE_PROVIDERS`: `checkFallbackError` jedynie udostępnia ją jako
`fallbackResult.ruleScope`, a komponenty na dalszych etapach respektują ją jako
coś więcej niż etykietę informacyjną wyłącznie dla dostawców z
listy dozwolonych `HONORS_RULE_LOCK_SCOPE_PROVIDERS` w tym samym pliku (`z kontrolą przez
honorsRuleLockScope()` — obecnie tylko `"agentrouter"`). Informacje o tym, co faktycznie
robi dopasowanie `scope: "connection"`, gdy dostawca znajduje się na tej liście dozwolonych,
znajdują się powyżej w sekcji „Ponownie sklasyfikowane błędy limitu”.

**#11104 — reguły zadeklarowane przez operatora omijają obie listy dozwolonych dostawców.** Operator może
zadeklarować w czasie działania regułę dla konkretnego dostawcy za pomocą `settings.providerErrorRules`
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`)
bez edytowania tego pliku. Uzależnienie reguły operatora od
`FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` — list dozwolonych dostawców
mających chronić **domyślne** zachowanie wbudowanych reguł katalogowych — sprawiłoby,
że mechanizm ustawień byłby bezużyteczny dla każdego dostawcy poza tymi, którzy już
znajdują się na tych listach, ponieważ samo zadeklarowanie reguły jest już jawnym
wyrażeniem zgody przez operatora. `resolveRuleMatchBody()` i `honorsRuleLockScope()`
najpierw sprawdzają `hasOperatorRuleForProvider()`: dostawca z regułą operatora otrzymuje
surowy tekst błędu, a jego zadeklarowany `scope` jest respektowany niezależnie od tego,
czy znajduje się również na którejkolwiek z list dozwolonych dostawców.

**Znana luka — `providerRuleRegistry` nigdy nie jest sprawdzany dla HTTP 400.**
Gałąź `BAD_REQUEST` w `checkFallbackError` klasyfikuje status 400 wyłącznie
za pomocą własnych tablic wzorców (`MODEL_ACCESS_DENIED_PATTERNS`,
`CONTEXT_OVERFLOW_PATTERNS` itd. w `accountFallback.ts`) i zwraca wynik, zanim
zostanie osiągnięta znajdująca się wyżej gałąź `configuredRule`/`getProviderErrorRuleMatch`.
Wbudowana reguła katalogowa (lub reguła operatora) ze `status: 400` jest
poprawna składniowo, ale nigdy nie zostanie uruchomiona. Obecnie żadna istniejąca
reguła nie dotyczy statusu 400, więc nie ma to wpływu na środowisko produkcyjne —
jednak przyszła reguła dla 400 wymaga najpierw zmodyfikowania tej gałęzi, co jest
większą zmianą niż dodanie reguły (zmienia klasyfikację 400 dla każdego dostawcy,
który już polega na zachowaniu opartym na tablicach wzorców), i wykracza poza zakres
dodania reguły dla pojedynczego dostawcy.

### Dodawanie nowej bramy błędnie przedstawiającej wyczerpanie limitu

1. Zarejestruj jedną tablicę reguł w `statusRestatementRegistry`
   (`open-sse/config/upstreamStatusRestatement.ts`). Zachowaj `textMarkers`
   specyficzne dla dostawcy; nigdy nie używaj ponownie ogólnych angielskich fraz,
   które kolidują z `CREDITS_EXHAUSTED_SIGNALS`
   (`open-sse/services/accountFallback.ts`).
2. Opcjonalnie zarejestruj reguły klasyfikacji w
   `open-sse/config/providerErrorRules.ts` (`providerRuleRegistry`), aby wybrać
   właściwy zakres blokady (`connection` dla limitu obejmującego całe konto,
   `model` dla błędów dotyczących poszczególnych modeli). Ten krok działa
   w środowisku produkcyjnym tylko w przypadku dostawców, których reguły potrzebują
   pełnego tekstu błędu (znaczników w treści): dodaj identyfikator dostawcy do
   `FULL_TEXT_RULE_PROVIDERS` w tym samym pliku — w przeciwnym razie
   `checkFallbackError` przekazuje regule jedynie ustrukturyzowany błąd
   `{code, type}`, a reguła oparta na tekście treści nigdy nie dopasuje ruchu
   produkcyjnego. Reguły dopasowywane wyłącznie na podstawie `status`/`headers`
   (takie jak reguły Opencode lub Minimax) nie wymagają tego jawnego włączenia.
   Osobno, jeśli reguła deklaruje `scope: "connection"`, a zamiarem jest rzeczywisty
   okres wstrzymania obejmujący całe połączenie oraz pominięcie kombinacji w ramach
   tego samego żądania (a nie tylko etykieta informacyjna), dodaj identyfikator
   dostawcy do `HONORS_RULE_LOCK_SCOPE_PROVIDERS` w tym samym pliku — to właśnie
   ta lista kontroluje użycie w stylu `isAgentrouterConnectionQuotaScope()` w
   `markAccountUnavailable()` (`src/sse/services/auth.ts`) oraz
   `applyComboTargetExhaustion()`
   (`open-sse/services/combo/targetExhaustion.ts`); bez tego `scope`
   nadal jest przekazywany przez `fallbackResult.ruleScope`, ale nic na niego
   nie reaguje.
3. Dodaj testy jednostkowe wzorowane na `tests/unit/upstream-status-restatement.test.ts`
   i `tests/unit/agentrouter-error-rules.test.ts` (w tym zabezpieczenia
   przed permanentnością / `creditsExhausted`, a także — jeśli dostawca wymaga
   umieszczenia na liście dozwolonych dostawców — test potwierdzający, że
   `resolveRuleMatchBody()` zwraca pełny tekst tylko dla tego dostawcy).

Nie są potrzebne żadne zmiany w `chatCore.ts`, `classifyError` ani w obsłudze kombinacji.

#### Blokada grupowana według ruchu wychodzącego (#10880)

Dostawcy w `EGRESS_BUCKETED_LOCK_PROVIDERS` (rodzina opencode) są traktowani
jak usługi upstream grupujące limity według adresu IP (bezpłatny plan opencode
jest grupowany według adresu IP, a nie konta — patrz #9611): status 429
sklasyfikowany jako `quota_exhausted` **lub** `rate_limit_exceeded` nakłada
okres wstrzymania na każde połączenie z dozwolonej rodziny, którego ostatni znany
wyjściowy adres IP odpowiada adresowi IP połączenia zakończonego niepowodzeniem,
zanim mechanizm rotacji będzie mógł je wypróbować
— pozwala to uniknąć N-1 wywołań upstream, których niepowodzenie jest gwarantowane
(ten sam schemat co w #10460/#10525).
`rate_limit_exceeded` uwzględniono celowo: na ścieżce `markAccountUnavailable`
reguły specyficzne dla opencode nigdy nie pasują (do `checkFallbackError`
nie są przekazywane nagłówki ani treść, a opencode nie znajduje się w
`FULL_TEXT_RULE_PROVIDERS`), dlatego odpowiedź 429, której treść zawiera tekst
o limicie subskrypcji ("monthly usage limit reached"), jest klasyfikowana jako
`quota_exhausted` przez mechanizm awaryjny oparty na tekście limitu
(`buildSubscriptionQuotaFallback`, `accountFallback.ts`; okres wstrzymania 1 godz.)
zanim reguła `status_429` zostanie w ogóle osiągnięta — natomiast odpowiedź 429
bez tekstu wskazującego na wyczerpanie limitu (zwykłe ograniczenie częstotliwości)
jest klasyfikowana przez regułę `status_429` jako `rate_limit_exceeded` i nadal
nakłada okres wstrzymania na całą rodzinę IP. Dla dostawcy znajdującego się na
liście dozwolonych dostawców limit częstotliwości grupowany według adresu IP jest
tym samym sygnałem co wyczerpany limit. Rzeczywiste ograniczenia:

- **Najlepsze możliwe działanie**: blokada ustala ostatni znany `egress_ip`
  połączenia na podstawie `proxy_logs` (okno 24h, synchronicznie, bez pamięci
  podręcznej). Zimna pamięć podręczna (wychodzący adres IP nigdy nie był
  sprawdzany) lub brak wiersza → połączenie, które zgłosiło błąd, nadal
  otrzymuje okres karencji w tej gałęzi (rejestrowany tak jak obecnie), ale
  żadne połączenie równorzędne nie jest blokowane.
- **Nigdy nie jest stanem końcowym**: okres karencji to odnawialne okno limitu
  (`testStatus: "unavailable"`); stan trwały nigdy nie jest wyznaczany na
  podstawie sygnału dotyczącego poziomu IP. Połączenia z `disableCooling`
  całkowicie pomijają tę gałąź.
- **Zmiana szczegółowości blokady dla rodziny z listy dozwolonych**: jest to
  zmiana zakresu, a nie tylko optymalizacja dotycząca połączeń równorzędnych.
  opencode jest dostawcą `passthroughModels`, więc przed wprowadzeniem tej
  gałęzi błąd 429 powodował blokadę dla konkretnego MODELU; teraz powoduje okres
  karencji połączenia — również w przypadku operatora używającego pojedynczego
  połączenia, bez żadnego połączenia równorzędnego. Jest to szczegółowość,
  którą tabela reguł opencode już uznaje za prawidłową (`scope: "connection"`,
  `providerErrorRules.ts`), ale która dotychczas nigdy nie była respektowana,
  ponieważ opencode nie znajduje się w
  `HONORS_RULE_LOCK_SCOPE_PROVIDERS`. Ta gałąź samodzielnie zapisuje okres
  karencji połączenia, które zgłosiło błąd, oraz jego `backoffLevel`,
  odzwierciedlając gałąź agentrouter o zakresie połączenia, po czym kończy
  działanie — blokada dla konkretnego modelu ani ogólna ścieżka poniżej nigdy
  nie są osiągane.
- **Uwzględnienie combo**: podobnie jak gałąź agentrouter, ten zakres celowo
  ignoruje obniżenie `persistUnavailableState`/`isCombo`, które wywołujący
  typu combo stosuje do błędu 429. Blokada dla konkretnego modelu nie jest
  słabszą formą tego zakresu, lecz niewłaściwą jednostką: nie mówi nic o
  wyczerpanym adresie IP, więc rotacja combo nadal generowałaby po jednym
  wywołaniu ze z góry pewnym niepowodzeniem dla każdego połączenia
  równorzędnego.
- **Bezpieczeństwo połączeń równorzędnych**: połączenie równorzędne, które już
  znajduje się w stanie końcowym (banned/credits_exhausted) lub ma już dłuższy
  okres karencji, nigdy nie jest nadpisywane.
- **Wyłączna lista dozwolonych**: rozszerzenie
  `EGRESS_BUCKETED_LOCK_PROVIDERS` jest świadomą decyzją właściciela; bez
  ogólnego podłączania mechanizmu (wzorzec #10334/#10419). Zapytanie dotyczące
  połączeń równorzędnych wiąże tę samą listę dozwolonych zamiast powtarzać ją
  jako literał SQL, dzięki czemu jej rozszerzenie nadal wymaga zmiany tylko
  jednego wiersza.
- **Rotacja wychodzącego adresu IP w obu kierunkach**: okno wyszukiwania (24h)
  jest znacznie szersze niż TTL pamięci podręcznej wychodzących adresów IP
  (5 min), dlatego „ostatni znany adres IP” oznacza historię, a nie stan
  bieżący. Jeśli serwer proxy połączenia zmienił adres w tym oknie, blokada
  może **pominąć** rzeczywiście współdzielony adres IP (zarejestrowany adres IP
  jest nowym, niewyczerpanym adresem) — i analogicznie może **objąć okresem
  karencji połączenie równorzędne, które od tego czasu zmieniło adres** z
  wyczerpanego adresu IP. Drugi przypadek kosztuje to połączenie równorzędne
  jedno okno karencji; oba przypadki są akceptowanymi ograniczeniami
  najlepszego możliwego działania wyszukiwania opartego na historii.
- **Koszt**: dwa ograniczone skanowania `proxy_logs` (filtrowane według okna
  przez `idx_pl_timestamp`), wyłącznie z częstotliwością występowania błędów 429. Bez nowego indeksu (migracja 134 YAGNI). Zmierzone na kopii bazy danych
  z rzeczywistym ruchem o umiarkowanym rozmiarze; instancja o wysokiej
  przepustowości przechowuje proporcjonalnie więcej wierszy w tym samym oknie.

---

## Inne funkcje zwiększające odporność

- **19 strategii routingu** (priorytetowa, ważona, round-robin, context-relay, fill-first, p2c, losowa, najmniej używana, zoptymalizowana kosztowo, uwzględniająca reset, okno resetu, zapas, ściśle losowa, automatyczna, lkgp, zoptymalizowana pod kątem kontekstu, zoptymalizowana pod kątem pamięci podręcznej, fusion, pipeline) — zobacz [AUTO-COMBO.md](../routing/AUTO-COMBO.md).
- **Routing uwzględniający reset** (v3.8.0) — nadaje priorytet połączeniom na podstawie czasu resetowania limitu.
- **Degradacja trybu pracy w tle** — `background: true` interfejsu Responses API jest przełączane na tryb synchroniczny z ostrzeżeniem.
- **Dynamiczne wykrywanie limitu narzędzi** — wycofuje dostawców po osiągnięciu limitów liczby narzędzi.
- **Awaryjny mechanizm rezerwowy** — kontrolowany przez `OMNIROUTE_EMERGENCY_FALLBACK`; operatorzy mogą go nadpisać na stronie flag funkcji bez ponownego uruchamiania.

---

## Debugowanie

- Kombinacja ważona odpowiada `503 all_targets_cooling_down` (ustawiono `Retry-After`, a `diagnostics.excluded` zawiera każdy cel ze statusem `model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable`) → pula jest skonfigurowana i połączona, ale każdy cel został wykluczony przez licznik czasu mechanizmu odporności; ostrzeżenie `[COMBO] Weighted selection: every target excluded before dispatch — …` podaje przyczyny i pozostały czas w sekundach. Odpowiedź `404 no_executable_targets` z tej samej kombinacji oznacza, że nie zadziałał żaden licznik czasu mechanizmu odporności (nie ma czego uruchomić albo każde konto nie przeszło testu dostępności). Mechanizm jest zaimplementowany w `open-sse/services/combo/pinRecovery.ts` na podstawie wykluczeń zebranych w `targetResolution.ts`.
- Wszystkie klucze dostawcy są pomijane → sprawdź zarówno stan wyłącznika automatycznego, jak i `rateLimitedUntil`/`testStatus` każdego połączenia.
- Dostawca jest trwale wykluczony po upływie okna resetowania → kod odczytuje bezpośrednio `state` zamiast używać `getStatus()`/`canExecute()`.
- Jeden klucz nie działa, ale pozostałe powinny działać → preferuj okres karencji połączenia zamiast wyłącznika automatycznego.
- Nie działa tylko jeden model → preferuj blokadę modelu zamiast okresu karencji połączenia.
- Stan powinien samoczynnie wrócić do normy, ale tak się nie dzieje → sprawdź znacznik czasu w przyszłości oraz ścieżkę odczytu, która odświeża wygasły stan. Trwałe statusy wymagają ręcznych zmian.

---

## Odciski TLS i techniki ukrywania

Specyficzne dla dostawców techniki ukrywania (JA3/JA4, CCH, zaciemnianie) są udokumentowane oddzielnie — zobacz `docs/security/STEALTH_GUIDE.md` (git; plik nie jest kompilowany do `/docs`).

---

## Testowanie odporności (faza 8 · blok C)

Oprócz testów jednostkowych logiki odporności trzy testy sprawdzają środowisko wykonawcze w
rzeczywistych warunkach obciążenia/awarii (wszystkie są integracyjne/nocne — żaden nie blokuje PR-ów):

| Test                | Co                                                                                                                                                                                                                                                                       | Uruchomienie                           |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------- |
| Chaos               | Symulowany węzeł nadrzędny wprowadza rzeczywiste opóźnienia/resety/limity czasu/błędy 503; sprawdza, czy wyłącznik automatyczny otwiera się/przywraca działanie oraz czy `checkFallbackError` klasyfikuje błąd 503 jako możliwy do obsłużenia przez mechanizm rezerwowy. | `RUN_CHAOS_INT=1 npm run test:chaos`   |
| Wzrost sterty       | ~500 strumieni na każdy `createSSEStream` przy użyciu `--expose-gc`; test kończy się niepowodzeniem, jeśli sterta przekroczy limit (zabezpieczenie przed OOM #3069).                                                                                                     | `npm run test:heap`                    |
| Test długotrwały k6 | Stałe obciążenie punktu `/api/monitoring/health`; progi p95/błędów.                                                                                                                                                                                                      | `k6 run tests/load/k6-soak.js` (nocny) |

Testy są koordynowane przez `.github/workflows/nightly-resilience.yml` (cron + ręczne wywołanie). W
domyślnym `test:integration` testy chaosu i sterty pomijają się automatycznie (bez `RUN_CHAOS_INT`/`--expose-gc`).

---

## Zobacz także

- [Przewodnik po architekturze](./ARCHITECTURE.md) — Architektura systemu i mechanizmy wewnętrzne
- [Podręcznik użytkownika](../guides/USER_GUIDE.md) — Dostawcy, kombinacje, integracja z CLI
- [Silnik automatycznych kombinacji](../routing/AUTO-COMBO.md) — 16-czynnikowa punktacja, pakiety trybów
