# Resilience Guide (Polski)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

OmniRoute ma trzy odrębne, ale powiązane ze sobą mechanizmy odporności. Każdy z nich ma inny zakres i cel. Podczas debugowania zachowania routingu należy je traktować osobno.

![3-warstwowy model odporności](../diagrams/exported/resilience-3layers.svg)

> Źródło: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

## 1. Circuit Breaker dostawcy

**Zakres:** cały dostawca (np. `glm`, `openai`, `anthropic`).

**Cel:** zaprzestanie kierowania ruchu do dostawcy, który wielokrotnie zawodzi na poziomie usługi nadrzędnej (upstream).

**Implementacja:**

- Klasa główna: `src/shared/utils/circuitBreaker.ts`
- Integracja: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- API statusu: `GET /api/monitoring/health`
- API resetowania: `POST /api/resilience/reset`
- Wrappery: `open-sse/services/accountFallback.ts`
- Tabela w bazie danych: `domain_circuit_breakers`

**Stany:**

- `CLOSED` — normalny ruch dozwolony
- `DEGRADED` — ruch nadal dozwolony, ale śledzona jest podwyższona liczba błędów dostawcy; powraca do `CLOSED` po wystarczającej liczbie sukcesów, po pomyślnym teście połączenia albo po upływie najdłuższego czasu wstrzymania `OPEN` dla ostatniego rodzaju błędu (wartość `cooldownByKind` dla tego rodzaju, w przeciwnym razie `resetTimeout`, × `maxBackoffMultiplier`, co najmniej jeden cooldown) bez nowego błędu
- `OPEN` — dostawca tymczasowo zablokowany; routing combo go pomija
- `HALF_OPEN` — upłynął czas resetowania; dozwolone jest żądanie sondy

**Konfigurowalne wartości domyślne (`open-sse/config/constants.ts`, dostępne w Dashboard → Settings → Resilience):**

| Klasa   | Degradacja przy | Otwarcie przy | Czas resetowania |
| ------- | --------------- | ------------- | ---------------- |
| OAuth   | 5 błędów        | 8 błędów      | 60s              |
| API-key | 7 błędów        | 12 błędów     | 30s              |
| Local   | wyliczana       | 2 błędów      | 15s              |

`degradationThreshold` określa, kiedy dostawca przechodzi w stan `DEGRADED`; `failureThreshold` określa, kiedy zostaje otwarty i pomijany. Profile dostawców lokalnych nie są jeszcze dostępne na stronie ustawień Resilience.

**Kody wyzwalające:** tylko statusy na poziomie dostawcy `[408, 500, 502, 503, 504]`. NIE wyzwalają przy błędach na poziomie konta (większość 401/403/429 — te należą do cooldownu lub blokady konta).

**Leniwe odtwarzanie (lazy recovery):** gdy stan `OPEN` wygasa, `getStatus()`, `canExecute()`, `getRetryAfterMs()` odświeżają stan do `HALF_OPEN`. Te same odczyty (oraz kolejny błąd) powodują stopniowy powrót nieaktualnego stanu `DEGRADED` do `CLOSED`. Nie jest potrzebny żaden timer działający w tle.

---

### Opcjonalny globalny Provider Cooldown (brama okna czasowego)

Czwarta, **opcjonalna** warstwa (`PROVIDER_COOLDOWN_ENABLED`, domyślnie **wyłączona**)
przechowuje w `open-sse/services/providerCooldownTracker.ts` pamięć o zawodzących
dostawcach, wspólną dla wszystkich żądań. Jest ona sprawdzana podczas rozstrzygania
celów combo, dzięki czemu kolejne żądania combo przestają ponownie przechodzić przez
dostawcę, który przed chwilą zawiódł. Wpisy na poziomie dostawcy podlegają bramie
okna czasowego z `PROVIDER_PROFILES`:

| Profil  | wyzwala po (`providerFailureThreshold`) | w obrębie (`providerFailureWindowMs`) | chłodzi przez (`providerCooldownMs`) |
| ------- | --------------------------------------: | ------------------------------------: | -----------------------------------: |
| OAuth   |                                    `10` |                               `15min` |                               `5min` |
| API key |                                    `15` |                               `30min` |                              `10min` |

Poniżej progu dostawca **nie** jest uznawany za schłodzonego; sukces czyści okno.
Wpisy na poziomie połączenia (`provider:connectionId`) zamiast tego zachowują
wykładniczy backoff `minRetryCooldownMs → maxRetryCooldownMs`. Nadpisania:
`OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`.
Test regresyjny: `tests/unit/provider-cooldown-window-gate.test.ts`.

## 2. Wyciszenie połączenia

**Zakres:** pojedyncze połączenie/konto/klucz dostawcy.

**Cel:** pominięcie jednego wadliwego klucza, gdy pozostałe połączenia tego samego dostawcy nadal obsługują ruch.

**Implementacja:**

- Oznaczanie jako niedostępne: `src/sse/services/auth.ts::markAccountUnavailable()`
- Wybór: `getProviderCredentials*` w tym samym pliku
- Obliczanie wyciszenia: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Ustawienia: `src/lib/resilience/settings.ts`

**Pola dla każdego połączenia:**

- `rateLimitedUntil` — znacznik czasu, do którego obowiązuje wyciszenie
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — licznik wykładniczego backoffu

**Domyślne okresy wyciszenia:**

- Wartość bazowa dla OAuth: 5 s
- Wartość bazowa dla klucza API: 3 s
- Klucz API, błąd 429: preferuje nagłówki upstream `Retry-After`/reset lub tekst resetu możliwy do sparsowania
- Backoff: `baseCooldownMs * 2 ** failureIndex`

**Zabezpieczenie przed efektem „thundering herd”:** zapobiega nadmiernemu wydłużaniu wyciszenia lub podwójnemu zwiększaniu `backoffLevel` przy równoczesnych awariach.

**Błędy 429 dotyczące limitu współbieżności nie podnoszą poziomu backoffu.** Błąd `429`, którego treść zgłasza limit współbieżności („too many concurrent requests”, „concurrency limit”, „parallel request limit”, GLM `并发数过高`), oznacza, że konto jest sprawne, ale zajęte. `checkFallbackError()` zwraca przyczynę `concurrency_limited`: natychmiast przełącza awaryjnie na kolejne połączenie, wycisza bieżące na stały czas `CONCURRENCY_LIMIT_COOLDOWN_MS` (1 s) lub zgodnie ze wskazówką ponowienia od upstreamu, pozostawia `backoffLevel` bez zmian i ustawia `skipProviderBreaker`. Jawna treść dotycząca kwoty nadal ma pierwszeństwo, więc treść, która pasuje również do wzorca kwoty, pozostaje werdyktem kwoty. Wykrywanie: `looksLikeConcurrencyLimit()` w `src/shared/utils/classify429.ts`; werdykt: `open-sse/services/accountFallback/concurrencyLimit429.ts`. `classify429()` (typ `FailureKind` wyłącznika obwodu) pozostaje bez zmian i nadal zwraca `rate_limit` dla tych treści.

**Zatrzymania treści strumienia nie wyciszają konta.** Gdy watchdog zatrzymania treści (`open-sse/utils/streamHandler.ts`) porzuca strumień, który nie przesłał w porę żadnych danych wyjściowych modelu, `markAccountUnavailable()` zapisuje błąd w połączeniu, ale nie ustawia wyciszenia: zatrzymanie dotyczy tego konkretnego żądania — najczęściej długiej tury rozumowania, która nie wygenerowała jeszcze żadnych danych wyjściowych. Operatorzy mogą ponownie włączyć wyciszanie za pomocą `resilienceSettings.streamStallCooldown.enabled` (domyślnie `false`).

**Ramki rozumowania restartują budżet zatrzymania treści.** Model rozumujący może myśleć przez wiele minut przed pierwszym widocznym tokenem: Claude strumieniuje ramki `thinking_delta`, których tekst myślenia może być pusty, a Responses API strumieniuje jeden element rozumowania za drugim. `isReasoningProgressFrame()` (`open-sse/utils/streamReadiness.ts`) rozpoznaje te ramki, a watchdog restartuje swój budżet przy każdej z nich, zamiast anulować turę. Nadal jednak nie są one danymi wyjściowymi modelu, więc tura, która kończy się wyłącznie rozumowaniem, jest nadal zgłaszana jako pusta, a tura, która przestaje rozumować i wysyła już tylko heartbeaty, nadal wyzwala watchdog.

Binarne ramki `reasoningContentEvent` Kiro z niepustym podpisem zachowują tę aktywność rozumowania na poziomie egzekutora jako pustą deltę `reasoning_content`. Podpis nie jest przekazywany dalej. Metadane, niekompletne ramki i puste podpisy nie restartują budżetu treści; nadal obowiązują niezależny limit czasu aktywnego strumienia oraz anulowanie przez klienta (`open-sse/executors/kiro/reasoning.ts`).

**Stany końcowe (NIE wyciszenia):**

- `banned` — ustawiany przez wykrywanie zakazanych słów kluczowych / blokady konta (zobacz [BAN_DETECTION](../security/BAN_DETECTION.md)) oraz przez trzy kolejne odmowy upstreamu dla poszczególnych żądań (`request_rejected`, np. Anthropic OAuth 403 „Request not allowed” — `open-sse/services/requestRejectedStreak.ts`); pojedyncza odmowa powoduje jedynie wyciszenie połączenia
- `expired` (przechodzi w stan końcowy po ograniczonej liczbie ponownych prób — `EXPIRED_RETRY_MAX = 3` z wykładniczym backoffem — dzięki czemu przejściowe błędy OAuth mogą się samonaprawić, zanim konto zostanie trwale dezaktywowane)
- `credits_exhausted`

Stany te utrzymują się do momentu zmiany poświadczeń lub ich zresetowania przez operatora. Nie nadpisuj stanów końcowych przejściowym stanem wyciszenia.

**Leniwe odzyskiwanie:** po upływie `rateLimitedUntil` połączenie ponownie kwalifikuje się do użycia. Po pomyślnym użyciu `clearAccountError()` czyści wszystkie pola błędów.

### Ściana limitu użycia Claude OAuth: tor o niższym priorytecie + reset limitu sesji

**Zakres:** jedno połączenie subskrypcji Claude (OAuth). Obie funkcje są **włączane indywidualnie dla każdego połączenia (opt-in)** (Edytuj połączenie → sekcja Claude → `lowPriorityMode` / `autoLimitReset` w `providerSpecificData`, obie domyślnie wyłączone) i odzwierciedlają polecenia `/low-priority` oraz `/limit-reset` z Claude Code (kontrakt komunikacyjny przechwycony z Claude Code 2.1.263).

**Implementacja:**

- Maszyna stanów + klasyfikacja odpowiedzi: `open-sse/services/claudeLowPriority.ts`
- Klient statusu i odbierania resetu: `open-sse/services/claudeLimitReset.ts`
- Hak egzekutora (wstrzykiwanie nagłówka + ponowienie na tym samym koncie): `open-sse/executors/base.ts::execute()`
- Zapisywanie zgody opt-in: `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**Wyzwalacz:** 5-godzinna ściana limitu użycia — błąd `429`, którego nagłówki zawierają `anthropic-ratelimit-unified-status: rejected` oraz — gdy konto się kwalifikuje — `anthropic-ratelimit-unified-slow-offer: treatment`. Nic nie jest wysyłane przed tym pierwszym błędem 429 ściany; skokowy błąd 429 bez nagłówków unified przechodzi standardową ścieżką wyciszenia.

**Tor o niższym priorytecie** (`lowPriorityMode`):

- Po trafieniu na ścianę 429 executor akceptuje ofertę i natychmiast ponawia próbę na **tym samym** koncie z nagłówkiem `anthropic-usage-limit: slow`; pas pozostaje aktywny do ogłoszonego momentu `anthropic-ratelimit-unified-reset` (+60 s karencji), a każde żądanie w tym oknie przenosi ten nagłówek. Przechwycone 429 nigdy nie dociera do `handleChatCore`, więc połączenie **nie** trafia w cooldown i nie jest wycofywane z rotacji.
- `anthropic-ratelimit-unified-slow-status` w kolejnych odpowiedziach: `active` / `not_needed` utrzymują pas; `slot_busy` (429) lub `529` czekają czas wskazany przez serwer w `anthropic-ratelimit-unified-slow-retry-after` (domyślnie 20 s, ograniczenie 5–600 s, jitter ±30%) i ponawiają, z górnym ograniczeniem `anthropic-ratelimit-unified-slow-max-wait` (domyślnie 20 min, ograniczenie 1 min–6 h) — po jego przekroczeniu pas się kończy, a 10-minutowy okres schłodzenia blokuje ponowną akceptację. Oczekiwanie jest dodatkowo ograniczone przez to, co pozostało z własnego limitu czasu uruchomienia upstreamu żądania (`resolveFetchStartTimeout`, domyślnie 10 min) minus 5-sekundowy margines: bez tego ograniczenia domyślne 20-minutowe max-wait przetrwałoby żądanie, a uśpienie zostałoby przerwane w trakcie oczekiwania, ujawniając `TimeoutError` zamiast łagodnego zakończenia `max_wait` + schłodzenia.
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`, przewinięcie okna 5-godzinnego lub `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true` (co kończy go jako `extra_usage` przy dowolnym statusie, ponieważ płatne przekroczenie teraz pokrywa ścianę) kończą pas; odpowiedź trafia wtedy do normalnej ścieżki cooldown. `budget_exhausted` jest zapamiętywany do ogłoszonego resetu budżetu (≤ 8 dni).
- Sprawdzenie ściany jest wykonywane po wewnętrznych ponowieniach próby executora wywołanych odpowiedzią 400 (edycja kontekstu, ograniczenia thinking/effort, automatyczne uczenie parametrów), więc ściana 429, która pojawia się dopiero przy jednym z tych ponowień, nadal jest przechwytywana zamiast trafiać do ścieżki cooldown.
- Stan jest przechowywany w pamięci dla każdego połączenia (restart kosztuje jedno dodatkowe 429 ściany na ponowną akceptację).

**Reset limitu sesji** (`autoLimitReset`, podejmowany przed pasem, gdy oba mechanizmy są włączone):

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → blok `juniper_tide`; gdy `arm: "reset"` i `available: true`, `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits` z `{ "program": "juniper_tide" }` (UUID organizacji z `providerSpecificData.organizationUUID`, w ostateczności bootstrap).
- `result: reset|not_limited` → żądanie jest ponawiane z pełną prędkością (bez nagłówka slow). `already_used` / `not_offered` memoizują `next_available_at` (domyślnie jeden tydzień); każdy błąd powoduje wycofanie na 15 minut. Reset jest dostępny raz w tygodniu i nadal wlicza się do tygodniowego limitu.

Strażnicy regresji: `tests/unit/claude-low-priority-mode.test.ts`,
`tests/unit/claude-limit-reset.test.ts`, `tests/unit/claude-low-priority-executor.test.ts`.

### Przywiązanie sesji (#7274)

**Zakres:** jedna sesja klienta (nagłówek `X-Session-Id` / `x-codex-session-id` / `x-omniroute-session`) przypięta do jednego połączenia, dla **dowolnego** dostawcy.

**Cel:** utrzymanie wieloturowego agenta (Claude Code, aider, niestandardowych agentów) na tym samym koncie między żądaniami, zmniejszając utratę kontekstu między kontami oraz powtarzające się błędy 429 zimnego startu u dostawców utrzymujących stan sesji per konto.

**Implementacja:**

- Ustalanie TTL: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- Wybór/tworzenie przypięcia: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- Ekstrakcja nagłówka (ogólna, dowolny dostawca): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- Utrwalana tabela przypięć: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- Ustawienie: `sessionAffinityTtlMs` (globalny TTL w ms, `0` wyłącza) — `src/lib/db/settings.ts`. Nazwa zmieniona z dotyczącego wyłącznie Codexa `codexSessionAffinityTtlMs` migracją `124_generic_session_affinity_ttl.sql`, która przenosi dowolny wcześniej skonfigurowany TTL Codexa jako nową wartość domyślną.

Przed #7274 `resolveSessionAffinityTtlMs()` bezwarunkowo zwracało `0` dla każdego dostawcy poza `codex`, więc ustawienie TTL (oraz nagłówki sesji) nie miało żadnego efektu nigdzie indziej, mimo że mechanizm przypinania i ekstrakcja nagłówków były już niezależne od dostawcy. Poprawka usunęła to wczesne zakończenie; TTL ma teraz jednolite zastosowanie do każdego dostawcy po globalnym ustawieniu powyżej `0`.

Trzy nagłówki przywiązania sesji nigdy nie są przekazywane do upstreamu — executory budują własne nagłówki upstream od zera, zamiast przepychać nagłówki klienta, więc pozostaje to wyłącznie wewnętrznym identyfikatorem korelacji.

### Ekskluzywne dzierżawy połączeń dla zarządzanych sesji

**Zakres:** jeden aktywny zarządzany klient HTTP/sesja posiada jedno kwalifikowalne połączenie OmniRoute.

**Cel:** zapewnienie trwałego, wyłącznego posiadania połączenia dla klientów, którzy potrzebują
twardej bariery routingu między żądaniami. Różni się to od przywiązania sesji, które jest miękką
preferencją ciągłości: ekskluzywna dzierżawa utrwala stan cyklu życia w SQLite, wymusza globalną
unikalność aktywnego właściciela i aktywnego połączenia oraz odrzuca nieaktualną generację przed
przekazaniem do dostawcy.

Funkcja jest dobrowolna (opt-in) per klucz API. Zarządzany klucz musi mieć zakres `lease:exclusive`
oraz jawną, niepustą listę `allowedConnections`. Z endpointu cyklu życia może korzystać dowolny
klient HTTP; nie jest wymagana nazwa klienta, user-agent, dostawca, metoda OAuth ani model.
Dzierżawa obejmuje połączenie, a nie model, więc zmiana modelu zachowuje powiązanie, o ile
połączenie pozostaje normalnie kwalifikowalne. Zwykłe reguły modelu, kwot, zdrowia, cooldownu i
listy dozwolonych pozostają wiążące i mogą przenieść tę samą generację na inne wolne
kwalifikowalne połączenie.

Cykl życia to `POST /api/v1/session-leases` z akcjami JSON `acquire`, `renew` i `release`.
Zarządzane żądania inferencji przedstawiają nieprzejrzystą wartość `X-OmniRoute-Lease-Owner` oraz dokładną wartość
`X-OmniRoute-Lease-Generation`. Wartość właściciela składa się z `vlo_`, po którym następują 43 znaki base64url;
przechowywany jest wyłącznie jej skrót SHA-256. Każde końcowe ogrodzenie wysyłki wiąże ponadto uwierzytelniony
identyfikator klucza API oraz identyfikator aktywnego połączenia. Nagłówki sterowania dzierżawą są usuwane
z dzienników, zachowanych migawek żądań oraz nagłówków wysyłanych do wykonawców upstream.

Jeśli standardowy routing dysponuje kwalifikującymi się zarządzanymi kandydatami, ale każdy wolny kandydat
jest zajęty przez obcą aktywną dzierżawę, OmniRoute zwraca HTTP `429`, kod braku dostępnej pojemności dzierżaw,
stan oczekiwania na pojemność oraz ograniczoną wartość `Retry-After` wyprowadzoną z najwcześniejszego istotnego
wygaśnięcia. Zwykły brak kwalifikujących się kandydatów nie jest rywalizacją o dzierżawę i zachowuje dotychczasową
semantykę błędów routingu.

Powiązane mechanizmy pozostają odrębne:

- Zajętość sesji OAuth to lokalne dla procesu miękkie rozłożenie dla kont OAuth.
- Semafory kont przyznają zezwolenia na współbieżność żądań i kończą się wraz z zakończeniem żądania.
- Wyłączne zarządzane dzierżawy sesji to trwałe posiadanie cyklu życia z ogrodzeniem generacji.

---

## 3. Blokada modelu (Model Lockout)

**Zakres:** trójka dostawca + połączenie + model.

**Zakres klucza według statusu:** status błędu decyduje, pod jakim kluczem
zapisywana jest blokada (`resolveLockoutScope()` w
`open-sse/services/accountFallback/exactModelLock.ts`):

- `429` / `403` / `402` — sygnał limitu (quota) lub uprawnień — blokada **rodziny
  limitów**: dla codex cały zakres `codex` / `spark` (każdy model `gpt-5*` danego
  połączenia), dla innych dostawców `getQuotaScopedModelForProvider()`.
- `404` blokuje sam model (`getModelLockKey()` zawęża `not_found`).
- Każdy inny status — błędy transportowe/serwerowe `5xx` oraz wewnętrzny,
  syntetyzowany `502` OmniRoute pochodzący z walidacji jakości — blokuje wyłącznie
  **dokładną** krotkę dostawca/połączenie/model. Wadliwy strumień na jednym modelu
  nie jest dowodem na wyczerpanie limitu konta; przed wprowadzeniem tej reguły
  jedna pusta odpowiedź na `codex/gpt-5.6-luna` usuwała z routingu wszystkie modele
  `gpt-5*` tego połączenia na 2–30 min (rosnąco), podczas gdy jego limit pozostawał
  nietknięty.
- Jawnie przekazana przez wywołującego opcja `scope` zawsze ma pierwszeństwo
  (Antigravity przekazuje `"exact"`).

**Cel:** uniknięcie wyłączania całego połączenia, gdy niedostępny lub objęty limitem
jest tylko jeden model.

**Przykłady:**

- Dostawcy z limitami per-model zwracający 429
- Lokalni dostawcy zwracający 404 dla jednego brakującego modelu
- Błędy uprawnień do trybów/modeli specyficzne dla dostawcy (np. tryby Groka)

**Implementacja:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`.

### Panel Model Cooldowns (v3.8.0)

UI: Settings → Model Cooldowns (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

Wyświetla listę aktywnych blokad z polami: provider, connection, model, reason, expiresAt. Operatorzy mogą ręcznie ponownie włączyć model z poziomu karty.

**REST API:**

- `GET /api/resilience/model-cooldowns` — lista aktywnych blokad
- `DELETE /api/resilience/model-cooldowns` — ręczne ponowne włączenie. Treść: `{provider, connection, model}`. Uwierzytelnianie: management.

### Cooldown Manager

UI: Monitoring → Cooldown Manager (`src/app/(dashboard)/dashboard/resilience/cooldowns/`).

Jedna strona dla każdego połączenia, które jest wyłączone z routingu z przyczyny
przejściowej, zamiast otwierania osobnych stron poszczególnych dostawców. Wyświetla
cooldowny połączeń, blokady modeli i stany terminalne; pozwala je czyścić dla
pojedynczego połączenia, dla zaznaczenia lub dla wszystkich połączeń danego
dostawcy, a także edytować najczęściej dostrajane reguły cooldownów:
`streamStallCooldown.enabled` oraz bazowy cooldown `connectionCooldown` i maksymalną
liczbę kroków backoffu dla OAuth / klucza API (zapisywane przez
`PATCH /api/resilience`). Stany terminalne (`banned`, `expired`, `credits_exhausted`)
są wymieniane, ale nigdy nie są tutaj czyszczone.

**REST API** (`src/lib/resilience/cooldownManager.ts`, uwierzytelnianie: management):

- `GET /api/resilience/cooldowns[?provider=]` — połączenia ze statusem, pozostałym
  cooldownem, poziomem backoffu, typem ostatniego błędu i blokadami modeli
  (bez danych uwierzytelniających)
- `POST /api/resilience/cooldowns` — treść `{connectionIds: string[]}` lub
  `{all: true, provider?}`; zwraca `{cleared, unchanged, skippedTerminal, lockoutsCleared}`

### UI ustawień blokady + odzyskiwanie przez tłumienie po sukcesie (v3.8.23)

Blokada modelu przeszła z zawsze włączonego, zakodowanego na sztywno zachowania
do w pełni konfigurowalnej funkcji typu opt-in, z własną kartą ustawień i
samonaprawiającą się ścieżką odzyskiwania.

**Karta ustawień:** Settings → Model Lockout
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`).
Jest to karta **odrębna** od opisanej wyżej, tylko do odczytu karty
`ModelCooldownsCard` (która jedynie _wyświetla_ aktywne blokady) — nowa karta
_konfiguruje parametry_. Wartości domyślne znajdują się w
`DEFAULT_MODEL_LOCKOUT_SETTINGS`
(`src/lib/resilience/modelLockoutSettings.ts`):

| Ustawienie              | Domyślnie                        | Znaczenie                                                         |
| ----------------------- | -------------------------------- | ----------------------------------------------------------------- |
| `enabled`               | `false`                          | Główny przełącznik — blokada modelu jest **domyślnie wyłączona**. |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | Statusy upstream liczące się jako błąd w zakresie modelu.         |
| `baseCooldownMs`        | `120_000` (120 s)                | Początkowy czas trwania blokady dla pierwszego błędu.             |
| `maxCooldownMs`         | `1_800_000` (30 min)             | Górny limit eskalowanego cooldownu.                               |
| `maxBackoffSteps`       | `10`                             | Maksymalna liczba kroków eskalacji backoffu wykładniczego.        |
| `useExponentialBackoff` | `true`                           | Czy powtarzające się błędy eskalują cooldown wykładniczo.         |

Ustawienia są zapisywane przez standardowy magazyn ustawień i walidowane schematem
ustawień resilience; karta przycina wartości `baseCooldownMs`/`maxCooldownMs`
(z warunkiem `maxCooldownMs ≥ baseCooldownMs`) oraz `maxBackoffSteps`.

**Odzyskiwanie przez tłumienie po sukcesie:** odzyskiwanie **nie** polega wyłącznie
na upływie timera. Poprawna odpowiedź cofa licznik błędów modelu, więc model,
który odzyskał sprawność w trakcie okna, przestaje eskalować (i zostaje odblokowany),
zanim jego timer dobiegnie końca. Po udanym trafieniu celu combo
`open-sse/services/combo.ts` wywołuje `decayModelFailureCount()`
(`open-sse/services/accountFallback.ts`), która **zmniejsza o połowę** zapisany
`failureCount` (`Math.floor(failureCount / 2)`); gdy osiągnie `0`, wpis blokady
jest całkowicie usuwany. Funkcja towarzysząca `recordModelLockoutFailure()`
zwiększa licznik (i eskaluje cooldown) przy błędach w oknie eskalacji. Tłumienie
po sukcesie działa dodatkowo obok zwykłego upływu timera — każda z tych ścieżek
może ponownie włączyć model.

**Stan:** blokady są przechowywane **w pamięci** (per-proces, w strukturach `Map`
zawierających `ModelLockoutEntry` kluczowanych przez `provider:connectionId:model`,
blokady o zakresie exact przez `provider:connectionId:exact:model`), a nie
zapisywane w bazie danych — są tracone przy restarcie. _Ustawienia_ są trwałe;
aktywny _stan_ blokad jest efemeryczny.

---

## 4. Kontrola współbieżności quota-share (v3.8.36)

Konta subskrypcyjne (GLM, MiniMax itp.) często akceptują tylko ~1–3 współbieżne żądania; przekroczenie tego limitu wywołuje błędy 429 i cooldowny. Problem jest szczególnie dotkliwy przy kombinacjach **quota-share** (`qtSd/…`), gdzie kilka kluczy API współdzieli jedno konto upstream. Trzy warstwy chronią współdzielone konto przed zalaniem.

### Limit współbieżności per połączenie (`max_concurrent`)

Każde połączenie dostawcy może zadeklarować górny limit `max_concurrent`
(`provider_connections.max_concurrent`, ustawiany w modalu połączenia / API / DB).
Pozostaw puste, aby nie stosować limitu. To jedyny parametr sterujący opisaną niżej
warstwą serializacji — ustaw go na rzeczywistą współbieżność konta (np. GLM ~1, MiniMax ~2).

### Limity współbieżności per model (`modelConcurrency`)

Połączenie może dodatkowo zadeklarować dokładne limity współbieżności dla
poszczególnych modeli w swojej mapie `rateLimitOverrides`:

```json
{
  "rateLimitOverrides": {
    "maxConcurrent": 4,
    "modelConcurrency": { "glm-5": 1, "glm-4.7": 3 }
  }
}
```

Ustaw je w modalu połączenia (**Nadpisania limitów szybkości → Limity współbieżności
dla poszczególnych modeli**, po jednym `model=cap` na linię) lub przez
`PATCH /api/providers/[id]` z tym samym kształtem JSON. Kluczowe zasady:

- **Całe połączenie vs konkretny model:** `maxConcurrent` pozostaje wspólnym
  limitem obowiązującym dla całego połączenia. Gdy oba mają zastosowanie, obie bramki
  są przejmowane atomowo w ramach tej samej bramki złożonej
  (`global → provider → account → model`); zachowanie efektywne odpowiada
  bardziej restrykcyjnemu z obowiązujących limitów.
- **Dokładne dopasowanie klucza modelu:** kluczem jest ciąg modelu przekazywany
  do wykonawcy po rozstrzygnięciu routingu — zwykle sam identyfikator modelu
  upstream (`glm-5`), a nie alias `provider/model` po stronie klienta
  (`zai/glm-5` nie pasuje do `glm-5`). Wartości to limity współbieżnych żądań
  wyrażone dodatnimi liczbami całkowitymi.
- **Lokalne kolejkowanie, bez wykrywania:** nadmiarowe żądania są kolejkowane
  lokalnie zgodnie z istniejącą semantyką kolejki/timeoutu (typizowane błędy
  dopuszczenia `SEMAPHORE_TIMEOUT` / `SEMAPHORE_QUEUE_FULL`). OmniRoute nie
  wykrywa ani nie wywnioskowuje polityki upstream — wymusza dokładnie te limity,
  które skonfigurował operator. Wysycona bramka modelu nigdy nie wyłącza dostawcy
  i nigdy nie tworzy trwałej blokady modelu; zachowanie upstream
  429/cooldown/fallback pozostaje ostatnią linią obrony przed błędami.
- **Zakres per połączenie, per proces:** limity obowiązują dla każdego połączenia
  w bazie danych i są trzymane w pamięci, więc dwa połączenia korzystające z tego
  samego klucza API upstream nie koordynują się między sobą.
- **Brak konfiguracji oznacza brak zmian:** pominięcie mapy (lub pozostawienie
  pustego pola w panelu) nie dodaje żadnej bramki modelu. Przykładowa konfiguracja
  bez narzucania uniwersalnego limitu dostawcy:

```text
glm-5=1
glm-4.7=3
```

### Serializacja żądań quota-share

Gdy dyspozycja quota-share kieruje żądanie do połączenia deklarującego dodatni
`max_concurrent`, współbieżne żądania do tego **konta** są serializowane przez
semafor per połączenie (klucz `qsconn:<connectionId>`): nadmiarowe żądania **czekają
w kolejce**, zamiast zalewać konto. Mechanizm jest **fail-open** — wysycona kolejka
lub timeout powoduje kontynuację bez slotu, zamiast kiedykolwiek odrzucać żądanie
możliwe do wysłania. Przełącznik w **Ustawienia → Odporność → Współbieżność
quota-share per połączenie** (`resilienceSettings.quotaShareConcurrencyLimit.enabled`,
domyślnie włączone). Bez limitu `max_concurrent` zachowanie pozostaje niezmienione.

> Bramka routingu quota-share (`selectQuotaShareTarget`, DRR + P2C) sama w sobie
> działa w trybie fail-open i jedynie _obniża priorytet_ połączenia, które osiągnęło
> limit — przy puli z jednym połączeniem nie może narzucić twardego limitu, więc to
> właśnie ten semafor faktycznie powstrzymuje zalanie.

### Ponawianie combo z uwzględnieniem cooldownu

Dla każdej strategii combo (gdy jest włączona) żądanie, które przybrałoby postać
błędu 429 dla KRÓTKIEGO przejściowego cooldownu, oczekuje jego upływ i jest wysyłane
ponownie, zamiast zwracać 429 — obejmuje to okna TPM/RPM klasy Gemini (~60 s
retry-after) w kombinacjach wielomodelowych, np. gdy oba cele combo 2-modelowego
natrafiają na limit per model. Ograniczone parametrem `comboCooldownWait` (`enabled`,
`maxWaitMs`, `maxAttempts`, `budgetMs`) w **Ustawienia → Odporność**. Nigdy nie czeka
przy `quota_exhausted` (zablokowane do północy) ani z powodów auth/not-found.

Ta sama bramka obejmuje przypadek przed wysłaniem (#16319): gdy każdy cel combo
zostaje pominięty przed jakąkolwiek próbą, ponieważ jego model znajduje się w krótkiej
przejściowej blokadzie, ścieżka bez żadnej próby oczekuje upływ blokady w ramach tych
samych limitów i wysyła ponownie, zamiast odpowiadać błędem `503 ALL_TARGETS_SKIPPED`
bez wskazówki. Gdy oczekiwanie nie jest dozwolone (wyczerpany limit, próby lub budżet
albo funkcja wyłączona), odpowiedź końcowa jest podnoszona do `429 rate_limit_error`
i przenosi `retry_after` / `reset_at` z najwcześniejszego wygaśnięcia przejściowej
blokady; blokady quota, auth i not-found zachowują odpowiedź 503 bez wskazówki.

```text
#16319 · comboCooldownWait · pre-dispatch (attempts = 0)
all targets skipped + transient model lockout:
  enabled ∧ 0 < waitMs ≤ maxWaitMs ∧ attempt < maxAttempts ∧ budgetLeftMs ≥ waitMs
    → wait → re-dispatch
  wait = false → HTTP 429 rate_limit_error
  retry_after / reset_at ← earliest transient lock expiry
quota_exhausted / auth_error / not_found / not_found_local:
  no transient hint → HTTP 503 ALL_TARGETS_SKIPPED
```

---

## 5. Kontrola przyjmowania do kolejki żądań (v3.8.49 · zgłoszenie #6593)

**Zakres**: lokalna kolejka limitu szybkości dla pary dostawca+połączenie (`open-sse/services/rateLimitManager.ts`, oparta na Bottleneck), o jedną warstwę poniżej trzech mechanizmów opisanych wyżej.

**`maxWaitMs` ogranicza oczekiwanie w kolejce; `executionMaxWaitMs` ogranicza wykonanie.**
Te dwa parametry są celowo rozdzielne i żaden nie zasila drugiego.

`resilienceSettings.requestQueue.maxWaitMs` to **budżet oczekiwania w kolejce**: obejmuje oczekiwanie na slot u dostawcy, a następnie przebywanie w stanie QUEUED, a jego licznik jest zerowany w momencie, gdy zadanie opuszcza stan QUEUED i rozpoczyna wykonywanie (`rateLimitManager.ts`, `wrappedFn`). Żądanie, które go przekroczy, nigdy nie dociera do usługi nadrzędnej. Wartość domyślna 30000 ms, dostarczana przez `DEFAULT_REQUEST_QUEUE_MAX_WAIT_MS` w `src/lib/resilience/settings.ts` i przypięta przez `tests/unit/ratelimit-admission-control-6593.test.ts`, więc jej zmiana powoduje, że ten test staje się czerwony, zamiast po cichu pozostawić ten akapit nieaktualnym.

`resilienceSettings.requestQueue.executionMaxWaitMs` to wartość, którą Bottleneck otrzymuje jako `expiration` zadania i której licznik startuje dopiero po wysłaniu zadania. Jest to zabezpieczenie awaryjne dla wykonawców bez własnego limitu czasu usługi nadrzędnej; wartość ta jest podnoszona do własnego limitu czasu rozpoczęcia pobierania wykonawcy, gdy ten jest dłuższy, więc nie może uciąć poprawnej, trwającej odpowiedzi. Wartość domyślna 600000 ms (10 min).

Przekazywanie budżetu kolejki do `expiration` było tym, co kiedyś zabijało bramy nieinkrementalne w połowie odpowiedzi — one zgodnie z założeniami działają całymi minutami przed otrzymaniem pierwszych bajtów — i dlatego wygaśnięcie jest zgłaszane jako `code: "RATE_LIMIT_EXECUTION_TIMEOUT"` (HTTP 504), podczas gdy budżet kolejki nosi kod przekroczenia czasu kolejki. Każdy z nich można nadpisać przez `RATE_LIMIT_MAX_WAIT_MS` / `RATE_LIMIT_EXECUTION_MAX_WAIT_MS` (zmienne środowiskowe) lub panel (**Ustawienia → Odporność**). Obie wartości są podczas normalizacji obcinane do zakresu 1 ms–24 h.

**Pierwszeństwo, dla obu:** zmienna środowiskowa dostarcza jedynie wartość _domyślną_. Wartość zapisana w `resilienceSettings.requestQueue` (panel / API patch, przechowywana w `key_value`) wygrywa z nią, a `rateLimitOverrides.maxWaitMs` / `.executionMaxWaitMs` dla konkretnego połączenia wygrywa z tamtą. Ustawienie zmiennej środowiskowej w wdrożeniu, które ma już zapisaną wartość, niczego więc nie zmienia — zamiast tego wyczyść lub zaktualizuj zapisane ustawienie.

Czas przebywania w kolejce ogranicza `maxWaitMs`; opisany niżej `maxQueueDepth` ogranicza, ilu wywołujących może jednocześnie oczekiwać w kolejce.

**Ponowienia określone w treści odpowiedzi: tempo a blokada.** Treść odpowiedzi 429 może sama wskazywać czas oczekiwania (Gemini `RetryInfo.retryDelay`, tekst "retry after Ns"), który odczytuje `updateFromResponseBody`. Oczekiwanie mieszczące się w `maxWaitMs` połączenia to tempo: limiter opróżnia swój zbiornik na ten czas, a oczekujące wywołania są wysyłane, gdy się on zapełni. Oczekiwania dłuższego niż `maxWaitMs` kolejka nie jest w stanie przeczekać — Gemini na wyczerpany dzienny limit odpowiada `retryDelay: "86399s"`. Przekazany nagłówek `Retry-After` na przebudowanej odpowiedzi 429 (#16528) już powoduje, że silnik awaryjny blokuje model na to okno, ale wstrzymywanie dla niego także limitera nadal zatrzymałoby na cały `maxWaitMs` każde wywołanie, które dotrze do klucza wcześniej (na przykład po resecie odporności). Gdy takie oczekiwanie pochodzi z typowanego szczegółu Google `RetryInfo` (pochodzenie `google_rpc_retry_info`), a limiter klucza jest już ograniczony do modelu (zob. `getLimiterKey`), odpowiedź 429 staje się zamiast tego blokadą modelu na tym połączeniu (`lockModelForLongBodyRetry` w `open-sse/services/rateLimitManager/bodyRetryPause.ts`, ograniczoną do 24 h), a limiter pozostaje niewstrzymany. Wybór konta pomija tę blokadę przez `isModelLocked()` — podobnie jak brama przed wysłaniem kombinacji dla celów przypiętych do połączenia. W antigravity, gdzie limiter jest przypisany do rodziny limitów, blokada dotyczy dokładnie danego modelu, podobnie jak pozostałe blokady limitów. Nazwa, o którą prosił klient, również zostaje zablokowana, gdy alias rozwiązał ją na ten model, ponieważ te sprawdzenia posługują się żądaną nazwą; jest ona blokowana dokładnie (`lockExactModel`), więc alias wykraczający poza rodzinę limitów antigravity lub zakres codex nigdy nie blokuje własnej. Wskazówka w formie zwykłego tekstu, nietypowany `retryDelay` lub limiter współdzielony przez całe połączenie zachowują pauzę. Gdy limiter, który ścieżka 429 właśnie przebudowała, zostaje wstrzymany, wywołujący, którego pozostały czas w kolejce kończy się przed końcem pauzy, jest odrzucany natychmiast z kodem przekroczenia czasu kolejki (`checkLimiterPause`), zamiast przeczekiwać ten czas; zapisany koniec jest zakotwiczony przed zbudowaniem limitera, tam gdzie Bottleneck uruchamia swój zegar odświeżania, a każda późniejsza zmiana zbiornika go zapomina. Pokryte testami `tests/unit/rate-limit-long-body-retry-lockout.test.ts` i `tests/unit/rate-limit-body-retry-pause.test.ts`.

**`maxQueueDepth` — opcjonalny limit przyjęć (nowość).** `resilienceSettings.requestQueue.maxQueueDepth` ogranicza, ile żądań może jednocześnie oczekiwać w kolejce (jeszcze niewysłanych) dla jednej pary dostawca+połączenie. Gdy kolejka zawiera już `maxQueueDepth` żądań, nowe żądanie jest szybko odrzucane z typowanym błędem `code: "RATE_LIMIT_QUEUE_FULL"`, **zanim** w ogóle dotrze do `limiter.schedule()` — więc odrzucenie jest tanie i następuje przed jakąkolwiek dalszą pracą nad kompresją promptu / tłumaczeniem dla tego żądania. Wartość domyślna `0` = wyłączone, co zachowuje dotychczasowe zachowanie nieograniczonej kolejki; zakres 0–100000. Nadpisanie przez `RATE_LIMIT_MAX_QUEUE_DEPTH` (zmienna środowiskowa) lub `resilienceSettings.requestQueue.maxQueueDepth` (panel/API patch).

Samo sprawdzenie przyjęcia jest funkcją czystą (`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`), więc można je testować jednostkowo bez prawdziwego limitera Bottleneck.

> RFC, który doprowadził do otwarcia #6593, proponował również flagę
> `bypassCompressionOnRateLimit`. Potok `open-sse/services/compression/` w tym
> repozytorium to kompresja promptu/kontekstu w wychodzącym żądaniu LLM
> (`chatCore.ts`, w okolicy bloku `resolveCompressionSettings`/`selectCompressionStrategy`),
> a nie kompresja odpowiedzi HTTP syntetyzowanych treści 429 — nie istnieje
> pasująca ścieżka kodu dla dosłownej flagi obejścia. Ten krok kompresji promptu
> jest ponadto obecnie wykonywany _przed_ `withRateLimit()` w potoku żądania, więc
> zmiana kolejności w celu pominięcia go przy odrzuceniu z powodu pełnej kolejki
> to osobna, większa zmiana, wykraczająca poza zakres tego zgłoszenia; została
> celowo **nie** zaimplementowana tutaj i pozostawiona jako zadanie następcze na
> wypadek, gdyby oszczędność CPU była warta ryzyka związanego ze zmianą kolejności.

### Siatka bezpieczeństwa automatycznego włączania limitów szybkości i ochrona połączeń (`rateLimitProtection`)

**Siatka bezpieczeństwa automatycznego włączania** (`resilienceSettings.requestQueue.autoEnableApiKeyProviders`, domyślnie `true`):
Domyślnie OmniRoute automatycznie włącza ochronę kolejki limitów szybkości dla wszystkich aktywnych połączeń dostawców typu klucz API (`getProviderCategory(provider) === "apikey"`). Dzięki temu przychodzące żądania kierowane do nadrzędnych kluczy API wrażliwych na limity są kolejkowane i dławione przez Bottleneck, zamiast masowo wywoływać nadrzędne błędy 429. Siatkę bezpieczeństwa można nadpisać zmienną środowiskową `RATE_LIMIT_AUTO_ENABLE` (`false`/`0`/`off` wyłącza, `true`/`1`/`on` wymusza włączenie), która ma pierwszeństwo przed zapisanym ustawieniem panelu (**Ustawienia → Odporność** / `PATCH /api/resilience`).

**Semantyka pola `rateLimitProtection` dla poszczególnych połączeń:**
Ochrona limitów szybkości dla poszczególnych połączeń jest śledzona za pomocą pola logicznego `rateLimitProtection` w połączeniach dostawców (zapisywanego jako `rate_limit_protection` w SQLite):

- **Jawne włączenie (`rateLimitProtection === true`)**: Ochrona limitów szybkości jest jawnie włączona dla tego połączenia, niezależnie od kategorii dostawcy oraz od tego, czy siatka bezpieczeństwa automatycznego włączania jest aktywna.
- **Jawne wyłączenie (`rateLimitProtection === false`)**: Wyłącza jawną ochronę, ale **nie** wyłącza aktywnego połączenia typu klucz API spod globalnej siatki bezpieczeństwa automatycznego włączania. W `reconcileEnabledConnections` (`open-sse/services/rateLimitManager.ts`) wartości `false` i `undefined` są równoważne: tylko `rateLimitProtection === true` jest traktowane jako jawne nadpisanie. Jeśli `rateLimitProtection` ma wartość `false` (lub nie jest ustawione), aktywne połączenie typu klucz API nadal spełnia warunek automatycznego włączania i pozostaje objęte ochroną limitów szybkości.
- **Brak rezygnacji dla pojedynczego połączenia**: Operator nie może obecnie określić, że „to pojedyncze aktywne połączenie typu klucz API musi działać bez ochrony kolejki limitów szybkości", zachowując jednocześnie automatyczne włączanie dla pozostałych połączeń. Aby całkowicie uruchomić połączenia typu klucz API bez kolejek limitów szybkości, siatka bezpieczeństwa musi zostać wyłączona globalnie (`RATE_LIMIT_AUTO_ENABLE=false` lub `resilienceSettings.requestQueue.autoEnableApiKeyProviders = false`).

**Obsługiwane ścieżki zapisu:**

- **`POST /api/rate-limits`**: Obsługiwana administracyjna ścieżka zapisu do przełączania `rateLimitProtection` dla połączenia (`{ connectionId: string, enabled: boolean }`). Wywołanie z `enabled: true` włącza jawną ochronę; wywołanie z `enabled: false` usuwa jawną ochronę (choć aktywne połączenia typu klucz API pozostają objęte globalną siatką bezpieczeństwa, jeśli automatyczne włączanie jest aktywne).
- **`PUT /api/providers/[id]`**: Celowo **nie** akceptuje ani nie przełącza `rateLimitProtection` (#11278). Aktualizacja metadanych połączenia dostawcy za pomocą `PUT /api/providers/[id]` nigdy nie zmieni zapisanego stanu ochrony limitów szybkości.

---

## 6. Watchdog przepustowości wolnego strumienia (#9709)

Opcjonalne zabezpieczenie `resilienceSettings.streamRecovery.throughputWatchdog` wykrywa
upstream, który wciąż wysyła fragmenty, ale generuje dane wyjściowe asystenta w tempie
poniżej skonfigurowanego tempa użytecznych danych wyjściowych. Jest celowo odrębny od
limitu czasu bezczynności: heartbeaty i metadane nie resetują żadnego z timerów ani nie
liczą się jako postęp. Jest również odrębny od twardego terminu próby (#9153), który
pozostaje bezwzględnym sufitem bezpieczeństwa niezależnie od jakości danych wyjściowych.

Watchdog wymaga okresu rozgrzewki, a po nim pełnego okna kroczącego, zanim będzie mógł
przerwać. Liczy delty tekstowe ze zdarzeń wyjściowych Chat Completions i Responses API
(konserwatywny zastępczy pomiar bajtów UTF-8), ignoruje zdarzenia zawierające wyłącznie
dane o zużyciu oraz zdarzenia puste i wstrzymuje ocenę, gdy w toku są zdarzenia wywołania
narzędzi lub rozumowania. Jest domyślnie wyłączony i można go włączyć za pomocą
`STREAM_THROUGHPUT_WATCHDOG_ENABLED=true`; okno, rozgrzewka, minimalne tempo i minimalny
mierzalny wynik są ograniczane przez standardową warstwę normalizacji ustawień odporności.

Po włączeniu przerwanie przez watchdoga jest stosowane wyłącznie do aktywnej próby
upstream. Przed wysłaniem jakichkolwiek bajtów widocznych dla klienta istniejąca ścieżka
wczesnego odzyskiwania w ramach tego samego konta może ponownie otworzyć próbę. Po
zatwierdzeniu strumień nigdy nie jest ślepo odtwarzany; tylko istniejący kontrakt
bezpiecznej kontynuacji w trakcie strumienia może doszyć sufiks. Finalizacja pozostaje
jednorazowa, więc rozliczanie zużycia i zwalnianie semafora nie są powielane.

---

## 7. Korekta statusu upstream (błędnie raportowane błędy limitu)

**Zakres:** jedna bramka upstream, która raportuje tymczasowe wyczerpanie limitu z błędnym statusem HTTP.

**Cel:** skorygowanie mylącego statusu PRZED klasyfikacją, tak aby odbiorcy downstream (silnik fallback, agregacja combo, odpowiedź kierowana do klienta) widzieli prawdziwy, pozwalający na ponowienie charakter błędu.

Niektóre bramki sygnalizują TYMCZASOWE wyczerpanie limitu statusem HTTP, który nie pozwala na ponowienie. `agentrouter.org` zwraca `403` (czasem `400`) z chińskim komunikatem (`用户额度不足` / `额度不足`) zamiast standardowego `429`. Klienci tacy jak Claude Code traktują `403` jako błąd trwały i przerywają sesję, a bez korekty silnik fallback sklasyfikowałby go jako `AUTH_ERROR` zamiast zdarzenia limitu.

**Implementacja:**

- Rejestr + dopasowywacz: `open-sse/config/upstreamStatusRestatement.ts` — lista reguł dla poszczególnych dostawców (`{id, fromStatuses, toStatus, textMarkers, excludeMarkers, defaultRetryAfterMs}`), dopasowywana przez `applyStatusRestatement()`.
- Miejsce wywołania: blok `providerFailure:` w `open-sse/handlers/chatCore.ts` (około linii 3654), zaraz po tym, jak `parseUpstreamError()` przetworzy odpowiedź upstream z błędnym statusem HTTP (`!providerResponse.ok`), a przed uruchomieniem jakiejkolwiek klasyfikacji — dzięki temu każdy odbiorca downstream widzi skorygowany status. Błędy osadzone w strumieniu SSE ze statusem `200` przechodzą osobną, późniejszą ścieżką parsowania strumienia i obecnie **nie** są objęte tym hookiem — to znane ograniczenie, na razie niewymagane dla błędnego statusu agentroutera (który pojawia się jako błędny status HTTP).
- Możliwość ponowienia: `429` znajduje się w `RETRY_AFTER_ELIGIBLE_STATUSES` (`open-sse/services/combo/unavailableRetryGate.ts`), więc skorygowany błąd niesie ze sobą realne okno ponowienia, zamiast pojawiać się jako martwe `403`.
- Syntetyczna wartość `60s` `defaultRetryAfterMs` (`upstreamStatusRestatement.ts`) to jedynie to, co skorygowana odpowiedź komunikuje **klientowi**; sama w sobie nie jest wewnętrznym czasem cooldownu/blokady połączenia — tym zarządza osobno mechanizm, który faktycznie obsługuje skorygowany błąd (eskalujący backoff Connection Cooldown, §2, bazowo `3s` dla dostawców z kluczami API; lub Model Lockout, §3, dla dostawców z limitem per model, jak agentrouter). Router może wewnętrznie stać się gotowy do ponowienia wcześniej, niż wynosi 60-sekundowe okno reklamowane klientowi — to celowy margines, nie błąd.

Błędy trwałe (`无权访问模型` agentroutera — brak dostępu do tego modelu) NIGDY nie są korygowane: `excludeMarkers` nakłada weto na regułę nawet wtedy, gdy trafią `textMarkers`, więc błąd zachowuje pierwotny status i nic nie ponawia go w nieskończoność. Pasująca reguła klasyfikacji dostawcy (`agentrouter-model-access-denied` w `open-sse/config/providerErrorRules.ts`: `reason: "auth_error"`, `scope: "model"`, zadeklarowany bazowy cooldown `6h`) jest sprawdzana przez `checkFallbackError` (`open-sse/services/accountFallback.ts`) _przed_ ogólnym wczesnym zwrotem `FORBIDDEN` dla kategorii apikey, warunkowanym przez `honorsRuleLockScope(provider)` (#10334 — obecnie wyłącznie dla agentroutera, za pośrednictwem listy dozwolonych `HONORS_RULE_LOCK_SCOPE_PROVIDERS` w `providerErrorRules.ts`). Zadeklarowany w regule 6-godzinny cooldown przechodzi jako `fallbackResult.baseCooldownMs`, ale nadal zasila istniejącą wcześniej ścieżkę blokady per-model-quota (`lockModelIfPerModelQuota()` / `recordModelLockoutFailure()`, niezmienioną przez #10334 poza źródłem cooldownu): jest przycinany do wartości `mlSettings.maxCooldownMs` operatora (domyślnie `1_800_000ms` / 30 min), jak każda inna blokada modelu, a _utrwalany powód blokady_ pozostaje istniejącym wcześniej, zaszytym na stałe `"forbidden"`, a nie `"auth_error"` z reguły — w całym łańcuchu honorowany jest wyłącznie czas trwania cooldownu, nie ciąg powodu. Samo połączenie pozostaje aktywne; modele siostrzane na tym samym połączeniu nie są dotknięte.

Skorygowane błędy limitu (`额度不足`) trafiają na produkcji do reguły dostawcy (`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`, `scope: "connection"`, bez własnego zadeklarowanego cooldownu — obowiązuje domyślny skalowany backoff warstwy persystencji). Od #10334 `scope` w `ProviderErrorRuleMatch` JEST konsumowany w całym łańcuchu, ale **wyłącznie** dla dostawców z listy dozwolonych `HONORS_RULE_LOCK_SCOPE_PROVIDERS` (`providerErrorRules.ts` — dziś tylko `"agentrouter"`, warunkowane przez `honorsRuleLockScope()`). Dla każdego innego dostawcy `scope` pozostaje informacyjny, dokładnie tak jak przed #10334. `checkFallbackError` wystawia scope dopasowanej reguły jako `fallbackResult.ruleScope`; `isAgentrouterConnectionQuotaScope()` (`src/sse/services/auth.ts`) to współdzielony strażnik, który potwierdza, że `ruleScope` można rzeczywiście bezpiecznie honorować jako sygnał obejmujący całe połączenie i zdolny do samonaprawy (scope `"connection"`, powód `quota_exhausted`, nigdy `permanent`, nigdy `creditsExhausted` — obrona przed przyszłą regułą łączącą scope `"connection"` z trwałym stanem konta). Wywołują go dwaj odbiorcy:

- **Trwałość** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  zamiast trafiać do gałęzi blokady **dla poszczególnych modeli**
  dostawcy przekazującego (agentrouter ma `passthroughModels: true` → `hasPerModelQuota()`
  zwraca `true`), stosuje **tymczasowy okres karencji połączenia** —
  `testStatus: "unavailable"` + `rateLimitedUntil`, nigdy status końcowy
  (`credits_exhausted`/`banned`/`expired`) — dzięki czemu połączenie samoczynnie
  odzyskuje sprawność po upływie okresu karencji, bez konieczności ręcznego
  resetowania poświadczeń. Pomijane dla połączeń z `disableCooling: true`
  (#2997): ta rezygnacja powoduje zamiast tego przejście do blokady dla
  poszczególnych modeli (jest to udokumentowany kompromis — zobacz komentarz
  w kodzie nad tą gałęzią).
- **Routing kombinacji w ramach tego samego żądania** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`): ten sam warunek ochronny
  oznacza połączenie w przechowywanym w pamięci zbiorze `exhaustedConnections`,
  pod kluczem `${provider}:${connectionId}`. Powoduje to pominięcie wyłącznie
  pozostałego celu Z TEGO SAMEGO ŻĄDANIA, który _sam już zawiera dokładnie ten
  sam `connectionId`_ we własnym obiekcie celu (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`, `if (provider &&
connectionId)` przed wyszukiwaniem w `exhaustedConnections`) — zwykła
  kombinacja list modeli, w której cele równorzędne nie zawierają własnego
  przypiętego `connectionId`, a jeden jest rozwiązywany dopiero dla każdego
  wywołania na podstawie nagłówka `X-OmniRoute-Selected-Connection-Id`
  odpowiedzi, nigdy nie dopasowuje tego klucza. W tym typowym przypadku
  rzeczywistym zabezpieczeniem przed ponownym użyciem właśnie wyczerpanego
  konta przez pozostały etap NIE jest ten zbiór — jest nim opisana wyżej
  warstwa trwałości (`rateLimitedUntil` połączenia wskazuje teraz przyszłość)
  w połączeniu z tym samym warunkiem ochronnym blokującym
  `transientRateLimitedProviders` dla tego błędu (zobacz „Projekt dwuetapowy”
  oraz komentarz w kodzie dotyczący gałęzi `isAgentrouterConnectionQuotaScope`
  w `targetExhaustion.ts`): ponieważ ten zbiór pozostaje nieoznaczony,
  wymuszone zezwolenie `allowRateLimitedConnection` w `combo.ts`
  (`open-sse/services/combo.ts:1005-1013`, `:2734-2738`) NIE jest aktywowane
  dla pozostałych etapów dostawcy, więc filtr `rateLimitedUntil` wyboru
  poświadczeń (`src/sse/services/auth.ts:1238`) jest normalnie przestrzegany,
  a pozostały etap wybiera inne, nadal dostępne połączenie agentrouter albo
  kończy się niepowodzeniem z powodu braku dostępnych poświadczeń — nie
  wymusza ponownego użycia połączenia, dla którego ta gałąź właśnie
  zastosowała okres karencji.

### Projekt dwuetapowy: ponowne określenie statusu, a następnie klasyfikacja

Ponowne określanie statusu (`upstreamStatusRestatement.ts`) i reguły
klasyfikacji dostawców (`open-sse/config/providerErrorRules.ts`,
`providerRuleRegistry`) to oddzielne rejestry, które używają jako kluczy
identyfikatora dostawcy i znaczników tekstowych, ale działają w różnych
miejscach i służą różnym celom: ponowne określenie statusu wcześnie zmienia
status HTTP w `chatCore.ts`; reguły klasyfikacji wybierają zastępczy `reason`
i `scope` blokady (`model` / `provider` / `connection`) wewnątrz
`checkFallbackError()` (`open-sse/services/accountFallback.ts`).

Reguły klasyfikacji widzą pełny **tekst** błędu (potrzebny do dopasowania
znaczników treści, takich jak `额度不足`) wyłącznie dla dostawców wymienionych
na liście dozwolonych `FULL_TEXT_RULE_PROVIDERS` w
`providerErrorRules.ts` — obecnie jest to tylko `"agentrouter"`. Dla każdego
innego dostawcy z **wbudowanego katalogu** funkcja `checkFallbackError`
przekazuje do `getProviderErrorRuleMatch` wyłącznie ustrukturyzowany błąd
(`{code, type}`), co wystarcza w przypadku reguł opartych na
nagłówku/statusie/kodzie, ale uniemożliwia wykrywanie znaczników w treści.
Funkcja pomocnicza `resolveRuleMatchBody()` dokonuje tego wyboru: pełny tekst
błędu dla dostawców z listy dozwolonych, a w pozostałych przypadkach
ustrukturyzowany błąd. Dodanie **wbudowanego** dostawcy do
`FULL_TEXT_RULE_PROVIDERS` stanowi jawne włączenie tej funkcji dla konkretnego
dostawcy — mechanizm ten istnieje po to, aby domyślna ścieżka każdego
dostawcy spoza listy pozostała niezmieniona bajt w bajt.

Wartość `scope` reguły (`model` / `provider` / `connection`) wymaga osobnego
jawnego włączenia, niezależnego od `FULL_TEXT_RULE_PROVIDERS`:
`checkFallbackError` udostępnia ją wyłącznie jako
`fallbackResult.ruleScope`, a dalsze komponenty traktują ją inaczej niż
etykietę informacyjną tylko w przypadku dostawców znajdujących się na liście
dozwolonych `HONORS_RULE_LOCK_SCOPE_PROVIDERS` w tym samym pliku
(kontrolowanej przez `honorsRuleLockScope()` — obecnie jest to tylko
`"agentrouter"`). Zobacz sekcję „Błędy limitu ze zmienionym statusem” powyżej,
aby dowiedzieć się, co faktycznie robi dopasowanie `scope: "connection"`, gdy
dostawca znajduje się na tej liście dozwolonych.

**#11104 — reguły zadeklarowane przez operatora omijają obie listy
dozwolonych.** Operator może zadeklarować regułę dla konkretnego dostawcy
w czasie wykonywania za pomocą `settings.providerErrorRules`
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`) bez
edytowania tego pliku. Uzależnienie reguły operatora od
`FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` — list
dozwolonych przeznaczonych do ochrony **domyślnego** zachowania reguł
wbudowanego katalogu — sprawiłoby, że mechanizm ustawień nie działałby dla
żadnego dostawcy poza już wymienionymi na tych listach, ponieważ samo
zadeklarowanie reguły jest już jawną zgodą operatora. Zarówno
`resolveRuleMatchBody()`, jak i `honorsRuleLockScope()` najpierw sprawdzają
`hasOperatorRuleForProvider()`: dostawca z regułą operatora otrzymuje surowy
tekst błędu, a zadeklarowany przez niego `scope` jest respektowany niezależnie
od tego, czy dostawca znajduje się również na którejkolwiek z list
dozwolonych.

**Znana luka — `providerRuleRegistry` nigdy nie jest sprawdzany dla HTTP 400.**
Gałąź `BAD_REQUEST` funkcji `checkFallbackError` klasyfikuje status 400
wyłącznie za pomocą własnych tablic wzorców (`MODEL_ACCESS_DENIED_PATTERNS`,
`CONTEXT_OVERFLOW_PATTERNS` itd. w `accountFallback.ts`) i zwraca wynik przed
osiągnięciem znajdującej się wyżej gałęzi
`configuredRule`/`getProviderErrorRuleMatch`. Reguła wbudowanego katalogu
(lub reguła operatora) ze `status: 400` jest poprawna składniowo, ale nigdy
nie zostanie uruchomiona. Obecnie żadna istniejąca reguła nie dotyczy 400,
więc nie ma to wpływu na środowisko produkcyjne — jednak przyszła reguła dla
400 wymaga najpierw zmiany tej gałęzi, co jest większą modyfikacją niż dodanie
reguły (powoduje ponowną klasyfikację 400 dla każdego dostawcy, który już
polega na zachowaniu opartym na tablicach wzorców) i wykracza poza zakres
dodania reguły dla pojedynczego dostawcy.

### Dodawanie nowej bramy błędnie raportującej limit przydziału

1. Zarejestruj jedną tablicę reguł w `statusRestatementRegistry`
   (`open-sse/config/upstreamStatusRestatement.ts`). Utrzymuj `textMarkers`
   jako specyficzne dla dostawcy; nigdy nie używaj ponownie ogólnych
   angielskich fraz, które kolidują z
   `CREDITS_EXHAUSTED_SIGNALS` (`open-sse/services/accountFallback.ts`).
2. Opcjonalnie zarejestruj reguły klasyfikacji w
   `open-sse/config/providerErrorRules.ts` (`providerRuleRegistry`), aby wybrać
   właściwy zakres blokady (`connection` dla limitu przydziału obejmującego
   całe konto, `model` dla błędów dotyczących konkretnego modelu). Ten krok
   działa na produkcji tylko w przypadku dostawców, których reguły wymagają
   pełnego tekstu błędu (znaczników z treści odpowiedzi): dodaj identyfikator
   dostawcy do `FULL_TEXT_RULE_PROVIDERS` w tym samym pliku — w przeciwnym
   razie `checkFallbackError` zawsze przekazuje regule wyłącznie
   ustrukturyzowany błąd `{code, type}`, a reguła oparta na treści odpowiedzi
   nigdy nie dopasuje rzeczywistego ruchu. Reguły dopasowujące się wyłącznie
   po `status`/`headers` (jak reguły Opencode czy Minimax) nie wymagają
   takiego włączenia. Niezależnie od tego, jeśli reguła deklaruje
   `scope: "connection"`, a celem jest rzeczywiste wyciszenie obejmujące całe
   połączenie wraz z pominięciem combo w ramach tego samego żądania (a nie
   tylko etykieta informacyjna), dodaj identyfikator dostawcy do
   `HONORS_RULE_LOCK_SCOPE_PROVIDERS` w tym samym pliku — to właśnie ten wpis
   bramkuje wykorzystanie w stylu `isAgentrouterConnectionQuotaScope()` w
   `markAccountUnavailable()` (`src/sse/services/auth.ts`) oraz
   `applyComboTargetExhaustion()`
   (`open-sse/services/combo/targetExhaustion.ts`); bez niego `scope` nadal
   przepływa przez `fallbackResult.ruleScope`, ale nic na jego podstawie
   nie działa.
3. Dodaj testy jednostkowe wzorowane na
   `tests/unit/upstream-status-restatement.test.ts` oraz
   `tests/unit/agentrouter-error-rules.test.ts` (w tym zabezpieczenia
   not-permanent / not-creditsExhausted, a także — jeśli dostawca wymaga
   listy dozwolonych — test sprawdzający, że `resolveRuleMatchBody()` zwraca
   pełny tekst tylko dla tego dostawcy).

Nie są wymagane żadne zmiany w `chatCore.ts`, `classifyError` ani combo.

#### Blokada kubełkowana według adresu wychodzącego (#10880)

Dostawcy w `EGRESS_BUCKETED_LOCK_PROVIDERS` (rodzina opencode) są traktowani
jako upstream kubełkowany według adresu IP (darmowy poziom opencode jest
kubełkowany według IP, a nie konta — zobacz #9611): odpowiedź ze statusem 429
sklasyfikowana jako `quota_exhausted` **lub** `rate_limit_exceeded` wycisza
każde połączenie z rodziny objętej listą dozwolonych, którego ostatni znany
wychodzący adres IP pokrywa się z adresem połączenia, które zakończyło się
niepowodzeniem, zanim rotacja zdąży je wypróbować
— co pozwala uniknąć N-1 gwarantowanych nieudanych wywołań upstream (ten sam
schemat co #10460/#10525).
`rate_limit_exceeded` jest uwzględnione celowo: na ścieżce
`markAccountUnavailable` reguły specyficzne dla opencode nigdy się nie
dopasowują (do `checkFallbackError` nie są przekazywane nagłówki ani treść,
opencode nie znajduje się w `FULL_TEXT_RULE_PROVIDERS`), więc odpowiedź 429,
której treść zawiera tekst o limicie subskrypcji ("monthly usage limit
reached"), jest klasyfikowana jako `quota_exhausted` przez zastępczą
klasyfikację na podstawie tekstu limitu (`buildSubscriptionQuotaFallback`,
`accountFallback.ts`; 1-godzinne wyciszenie), zanim w ogóle zostanie
osiągnięta reguła `status_429` — natomiast odpowiedź 429 bez tekstu limitu
(zwykłe ograniczenie szybkości) jest klasyfikowana przez regułę `status_429`
jako `rate_limit_exceeded` i nadal wycisza rodzinę IP. Dla dostawcy z listy
dozwolonych ograniczenie szybkości kubełkowane według IP to ten sam sygnał
co wyczerpany limit przydziału. Uczciwe ograniczenia:

- **Best-effort**: blokada odczytuje ostatni znany `egress_ip` połączenia
  z `proxy_logs` (okno 24h, synchronicznie, bez pamięci podręcznej). Zimna
  pamięć podręczna (adres IP wyjściowy nigdy nie sondowany) lub brak wiersza →
  zawodzące połączenie nadal jest schładzane przez gałąź (rejestrowane jak
  dotychczas), nie jest natomiast blokowany żaden element siostrzany.
- **Nigdy stan końcowy**: schładzanie jest odnawianym oknem limitu
  (`testStatus: "unavailable"`); stan trwały nigdy nie jest wyprowadzany
  z sygnału na poziomie IP. Połączenia z `disableCooling` całkowicie pomijają
  tę gałąź.
- **Zmiana granularności blokady dla rodziny z listy dozwolonych**: to jest
  zmiana zakresu, a nie tylko optymalizacja elementów siostrzanych. opencode
  jest dostawcą `passthroughModels`, więc przed tą gałęzią odpowiedź 429
  powodowała blokadę na poziomie MODELU; teraz powoduje schładzanie
  połączenia — w tym dla operatora korzystającego z pojedynczego połączenia
  bez żadnego elementu siostrz-anego. To jest granularność, którą tabela reguł
  opencode już deklaruje jako poprawną (`scope: "connection"`,
  `providerErrorRules.ts`), dotąd nigdy nie respektowaną, ponieważ opencode
  nie znajduje się w `HONORS_RULE_LOCK_SCOPE_PROVIDERS`. Gałąź sama zapisuje
  schładzanie zawodzącego połączenia + `backoffLevel`, odzwierciedlając gałąź
  agentrouter o zakresie połączenia, i zwraca — blok na poziomie modelu oraz
  ogólna ścieżka poniżej nigdy nie są osiągane.
- **Combo uwzględnione**: podobnie jak gałąź agentrouter, zakres celowo
  ignoruje obniżenie `persistUnavailableState`/`isCombo`, jakie wywołujący
  combo stosuje do odpowiedzi 429. Blokada na poziomie modelu nie jest słabszą
  formą tego zakresu — jest niewłaściwą jednostką: nic nie mówi o wyczerpanym
  adresie IP, więc rotacja combo nadal marnowałaby jedno z góry skazane na
  niepowodzenie wywołanie na element siostrzany.
- **Bezpieczeństwo elementów siostrzanych**: element siostrzany już w stanie
  końcowym (banned/credits_exhausted) lub już w dłuższym schładzaniu nigdy nie
  jest nadpisywany.
- **Wyłączna lista dozwolonych**: rozszerzenie `EGRESS_BUCKETED_LOCK_PROVIDERS`
  jest wyraźną decyzją właściciela; brak generycznego powiązania (wzorzec
  #10334/#10419). Zapytanie o elementy siostrzane wiąże tę samą listę
  dozwolonych, zamiast powtarzać ją jako literał SQL, więc jej rozszerzenie
  pozostaje zmianą jednowierszową.
- **Rotacja adresu IP wyjściowego, w obu kierunkach**: okno wyszukiwania (24h)
  jest znacznie szersze niż TTL pamięci podręcznej adresu IP wyjściowego
  (5 min), więc „ostatni znany adres IP” to historia, a nie bieżący stan.
  Jeśli proxy połączenia zrotowało w obrębie okna, blokada może **nie
  wychwycić** faktycznie współdzielonego adresu IP (zarejestrowany adres IP to
  ten nowy, niewyczerpany) — i symetrycznie może **schłodzić element
  siostrzany, który od tego czasu zrotował poza wyczerpany adres IP**. Drugi
  przypadek kosztuje ten element siostrzany jedno okno schładzania; oba są
  akceptowanymi ograniczeniami typu best-effort wyszukiwania opartego na
  historii.
- **Koszt**: dwa ograniczone skany `proxy_logs` (filtrowane oknem za pomocą
  `idx_pl_timestamp`), tylko z częstotliwością występowania 429. Bez nowego
  indeksu (migracja 134 YAGNI). Zmierzono na kopii bazy danych z rzeczywistym
  ruchem o umiarkowanej wielkości; instancja o wysokiej przepustowości
  przechowuje proporcjonalnie więcej wierszy w tym samym oknie.

---

## Inne funkcje odporności na awarie

- **21 strategii routingu** (priority, weighted, round-robin, context-relay, fill-first, p2c, random, least-used, cost-optimized, reset-aware, reset-window, expiry-first, headroom, quota-weighted, strict-random, auto, lkgp, context-optimized, cache-optimized, fusion, pipeline) — zobacz [AUTO-COMBO.md](../routing/AUTO-COMBO.md).
- **Routing reset-aware** (v3.8.0) — nadaje priorytet połączeniom według czasu resetu limitu.
- **Degradacja trybu pracy w tle** — Responses API z `background: true` jest degradowane do wywołania synchronicznego z ostrzeżeniem.
- **Dynamiczne wykrywanie limitów liczby narzędzi** — wycofuje dostawców po osiągnięciu limitów liczby narzędzi.
- **Emergency fallback** — kontrolowany przez `OMNIROUTE_EMERGENCY_FALLBACK`; operatorzy mogą go nadpisać na stronie Feature Flags bez restartu.

---

## Debugowanie

- Combo ważone (weighted) odpowiada `503 all_targets_cooling_down` (nagłówek `Retry-After` ustawiony, `diagnostics.excluded` zawiera każdy cel z `model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable`) → pula jest skonfigurowana i połączona, każdy cel jest po prostu wykluczony przez licznik odporności; ostrzeżenie `[COMBO] Weighted selection: every target excluded before dispatch — …` podaje przyczyny i pozostałą liczbę sekund. Odpowiedź `404 no_executable_targets` z tego samego combo oznacza, że nie był zaangażowany żaden licznik odporności (nie ma nic do uruchomienia albo każde konto nie przeszło sondy dostępności). Zbudowane w `open-sse/services/combo/pinRecovery.ts` na podstawie wykluczeń zebranych w `targetResolution.ts`.
- Wszystkie klucze danego dostawcy są pomijane → sprawdź zarówno stan circuit breakera, ORAZ `rateLimitedUntil`/`testStatus` każdego połączenia.
- Dostawca trwale wykluczony po oknie resetu → kod odczytuje surowy `state` zamiast `getStatus()`/`canExecute()`.
- Jeden klucz zawodzi, inne powinny działać → wybierz wygaszanie połączenia (connection cooldown) zamiast circuit breakera.
- Zawodzi tylko jeden model → wybierz blokadę modelu (model lockout) zamiast wygaszania połączenia.
- Stan powinien odtwarzać się sam, ale tego nie robi → sprawdź, czy znacznik czasu nie jest z przyszłości, oraz ścieżkę odczytu, która odświeża wygasły stan. Stany trwałe wymagają ręcznej interwencji.

---

## Stan działania (runtime) — szybka ściąga dla agenta

> Przeniesione dosłownie z `AGENTS.md` → „Resilience Runtime State" (PR #12743), tak aby
> przewodnik agenta mieścił się w budżecie kontekstu 40k. Jest to skondensowany, skierowany
> do agentów obraz powyższych sekcji; sekcje numerowane pozostają pełnym źródłem odniesienia.

OmniRoute ma trzy powiązane, ale odrębne mechanizmy obsługi awarii tymczasowych. Podczas
debugowania zachowania routingu utrzymuj ich zakresy rozdzielnie. Zobacz
[diagram 3-warstwowej odporności](../diagrams/exported/resilience-3layers.svg)
(źródło: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)),
aby uzyskać mapę do szybkiego przeglądu.

### Circuit breaker dostawcy

**Zakres**: cały dostawca, np. `glm`, `openai`, `anthropic`.

**Cel**: zatrzymać wysyłanie ruchu do dostawcy, który wielokrotnie zawodzi na poziomie
upstream/usługi, tak aby jeden niezdrowy dostawca nie spowalniał każdego żądania.

**Implementacja**:

- Klasa główna: `src/shared/utils/circuitBreaker.ts`
- Integracja bramki/wykonania czatu: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- API stanu w czasie działania: `src/app/api/monitoring/health/route.ts`
- Współdzielone wrappery: `open-sse/services/accountFallback.ts`
- Tabela trwałego stanu: `domain_circuit_breakers`

**Stany** (4 — `src/shared/utils/circuitBreaker.ts`):

- `CLOSED`: normalny ruch jest dozwolony.
- `DEGRADED`: strefa wczesnego ostrzegania — awarie przekroczyły próg degradacji, ale jeszcze
  nie próg wyłącznika; ruch nadal płynie, pulpity nawigacyjne pokazują ostrzeżenie. Pomyślny
  test połączenia lub ciche okno bez nowych awarii przywraca stan `CLOSED`
  (okno opisuje `docs/architecture/RESILIENCE_GUIDE.md`).
- `OPEN`: dostawca jest tymczasowo zablokowany; wywołujący otrzymują odpowiedź typu
  provider-circuit-open albo routing combo przechodzi do innego celu.
- `HALF_OPEN`: minął czas oczekiwania na reset; dozwolone jest żądanie sondy. Sukces zamyka
  wyłącznik, awaria otwiera go ponownie.

**Wartości domyślne** (`open-sse/config/constants.ts` → `PROVIDER_PROFILES`, wykorzystywane przez
`DEFAULT_RESILIENCE_SETTINGS.providerBreaker` w `src/lib/resilience/settings.ts` →
`getCircuitBreaker(provider, …)` w `src/sse/handlers/chatHelpers.ts`). Wyłącznik poziomu całego
dostawcy działa na podstawie `circuitBreakerThreshold` / `circuitBreakerReset`:

| Profil    | degradacja przy | otwarcie przy (`circuitBreakerThreshold`) | reset (`circuitBreakerReset`) |
| --------- | --------------: | ----------------------------------------: | ----------------------------: |
| OAuth     |             `5` |                                       `8` |                         `60s` |
| Klucz API |             `7` |                                      `12` |                         `30s` |
| Lokalny   |     (wyliczane) |                                       `2` |                         `15s` |

`PROVIDER_PROFILES` definiuje również `providerFailureThreshold` (10/15/2),
`providerFailureWindowMs` (15/30/5 min) oraz `providerCooldownMs` (5/10/1 min): zasilają one
**bramkę okna opcjonalnego, globalnego mechanizmu Provider Cooldown** (`PROVIDER_COOLDOWN_ENABLED`,
domyślnie wyłączone) — wpis na poziomie dostawcy w `open-sse/services/providerCooldownTracker.ts`
jest traktowany jako wygaszanie dopiero po `providerFailureThreshold` awariach w obrębie
`providerFailureWindowMs`, a następnie wygasza przez `providerCooldownMs`. NIE są to progi
aktywnego wyłącznika — nie dostrajaj ich, oczekując zachowania wyłącznika. Każdą wartość
domyślną można nadpisać zmiennymi środowiskowymi `OMNIROUTE_PROVIDER_BREAKER_*` oraz
`OMNIROUTE_CIRCUIT_BREAKER_*`; dokładna tabela referencyjna stanu działania znajduje się w
`docs/architecture/RESILIENCE_GUIDE.md`.

Tylko statusy awarii na poziomie dostawcy powinny wyzwalać wyłącznik dostawcy:

```ts
(408, 500, 502, 503, 504);
```

Nie wyzwalaj wyłącznika całego dostawcy dla zwykłych błędów konta/klucza/modelu, takich jak
większość przypadków `401`, `403` czy `429`. Te zazwyczaj należą do wygaszania połączenia
(connection cooldown) lub blokady modelu (model lockout). Typowy `403` dostawcy z kluczem API
powinien być odzyskiwalny, chyba że zostanie sklasyfikowany jako terminalny błąd
dostawcy/konta.

Breaker wykorzystuje leniwe odtwarzanie (lazy recovery), a nie licznik działający w tle. Gdy stan `OPEN` wygaśnie, odczyty takie jak `getStatus()`, `canExecute()` i `getRetryAfterMs()` odświeżają stan do `HALF_OPEN`, dzięki czemu dashboardy i buildery kandydatów combo nie wykluczają w nieskończoność dostawcy, którego blokada wygasła.

### Cooldown połączenia

**Zakres**: jedno połączenie/konto/klucz dostawcy.

**Cel**: tymczasowe pomijanie jednego wadliwego klucza/konta, przy jednoczesnym umożliwieniu innym połączeniom tego samego dostawcy kontynuowania obsługi żądań.

**Implementacja**:

- Ścieżka zapisu/aktualizacji: `src/sse/services/auth.ts::markAccountUnavailable()`
- Wybór/filtrowanie kont: `src/sse/services/auth.ts::getProviderCredentials...`
- Obliczanie cooldownu: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Ustawienia: `src/lib/resilience/settings.ts`

Ważne pola w połączeniach dostawcy:

```ts
rateLimitedUntil;
testStatus: "unavailable";
lastError;
lastErrorType;
errorCode;
backoffLevel;
```

Podczas wyboru konta połączenie jest pomijane, gdy:

```ts
new Date(rateLimitedUntil).getTime() > Date.now();
```

Cooldowny również są leniwe: gdy `rateLimitedUntil` znajduje się w przeszłości, połączenie ponownie staje się dostępne. Po pomyślnym użyciu `clearAccountError()` czyści `testStatus`, `rateLimitedUntil`, pola błędów oraz `backoffLevel`.

Domyślne zachowanie cooldownu połączenia:

- Bazowy cooldown OAuth: `5s`.
- Bazowy cooldown klucza API: `3s`.
- Dla klucza API błąd `429` powinien preferować wskazówki ponawiania z warstwy upstream (`Retry-After`, nagłówki resetu lub parsowalny tekst resetu), gdy są dostępne.
- Powtarzające się błędy możliwe do odzyskania stosują wykładnicze wycofywanie (exponential backoff):

```ts
baseCooldownMs * 2 ** failureIndex;
```

Zabezpieczenie anty-thundering-herd zapobiega wielokrotnemu wydłużaniu cooldownu lub podwójnemu zwiększaniu `backoffLevel` przez równoległe błędy na tym samym połączeniu.

Stany terminalne nie są cooldownami. `banned`, `expired` (który staje się terminalny dopiero po N ograniczonych ponownych próbach za pośrednictwem `EXPIRED_RETRY_MAX`) oraz `credits_exhausted` mają pozostawać niedostępne, dopóki nie zmienią się dane uwierzytelniające/ustawienia lub operator ich nie zresetuje. Nie nadpisuj stanów terminalnych przejściowym stanem cooldownu.

### Blokada modelu

**Zakres**: dostawca + połączenie + model.

**Cel**: uniknięcie wyłączania całego połączenia, gdy niedostępny lub objęty limitem kwoty jest tylko jeden model dla tego połączenia.

Przykłady:

- Dostawcy z kwotami per model zwracający `429`.
- Dostawcy lokalni zwracający `404` dla jednego brakującego modelu.
- Błędy uprawnień trybu/modelu specyficzne dla dostawcy, takie jak wybrane tryby Grok.

Blokada modelu znajduje się w `open-sse/services/accountFallback.ts` i pozwala temu samemu połączeniu kontynuować obsługę innych modeli.

### Wskazówki dotyczące debugowania

- Jeśli wszystkie klucze dostawcy są pomijane, sprawdź zarówno stan breakera dostawcy, jak i `rateLimitedUntil`/`testStatus` każdego połączenia.
- Jeśli dostawca wydaje się trwale wykluczony po oknie resetu, sprawdź, czy kod odczytuje surowy `state` zamiast używać `getStatus()`/`canExecute()`.
- Jeśli jeden klucz dostawcy zawodzi, ale inne powinny działać, preferuj cooldown połączenia zamiast breakera dostawcy.
- Jeśli zawodzi tylko jeden model, preferuj blokadę modelu zamiast cooldownu połączenia.
- Jeśli stan powinien odtwarzać się samoczynnie, powinien mieć przyszły znacznik czasu/timeout resetu oraz ścieżkę odczytu odświeżającą wygasły stan. Statusy trwałe wymagają ręcznej zmiany danych uwierzytelniających lub konfiguracji.

---

## Odciski TLS (fingerprinting) i tryb stealth

Ukrywanie specyficzne dla dostawcy (JA3/JA4, CCH, zaciemnianie) jest udokumentowane osobno — zobacz `docs/security/STEALTH_GUIDE.md` (git; nie jest kompilowane do `/docs`).

---

## Testy odporności (Faza 8 · Blok C)

Poza testami jednostkowymi logiki odporności, trzy testy sprawdzają środowisko uruchomieniowe w rzeczywistych warunkach obciążenia/awarii (wszystkie są integracyjne/nocne — żaden nie blokuje PR-ów):

| Test        | Co testuje                                                                                                                                                                                                        | Uruchomienie                           |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- |
| Chaos       | Węzeł fałszywego upstreamu wstrzykuje rzeczywiste opóźnienia/resety/timeouty/503; sprawdza, czy circuit breaker otwiera się i odzyskuje oraz czy `checkFallbackError` klasyfikuje 503 jako odzyskiwalny fallback. | `RUN_CHAOS_INT=1 npm run test:chaos`   |
| Heap-growth | ~500 strumieni na `createSSEStream` pod `--expose-gc`; kończy się niepowodzeniem, jeśli sterta przekroczy dozwolony limit (strażnik OOM #3069).                                                                   | `npm run test:heap`                    |
| k6 soak     | Utrzymane obciążenie na `/api/monitoring/health`; progi p95/błędów.                                                                                                                                               | `k6 run tests/load/k6-soak.js` (nocny) |

Orkiestracja odbywa się przez `.github/workflows/nightly-resilience.yml` (cron + dispatch). W domyślnym `test:integration` testy chaos i heap pomijają się same (bez `RUN_CHAOS_INT`/`--expose-gc`).

---

## Zobacz także

- [Przewodnik po architekturze](./ARCHITECTURE.md) — Architektura systemu i mechanizmy wewnętrzne
- [Przewodnik użytkownika](../guides/USER_GUIDE.md) — Dostawcy, kombinacje, integracja z CLI
- [Silnik Auto-Combo](../routing/AUTO-COMBO.md) — Punktacja 16-czynnikowa, pakiety trybów
