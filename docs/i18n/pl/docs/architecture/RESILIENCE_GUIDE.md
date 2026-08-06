---
title: "Przewodnik po odporności (Resilience)"
version: 3.8.40
lastUpdated: 2026-06-28
---

# Przewodnik po odporności (Resilience)

OmniRoute ma trzy odrębne, ale powiązane mechanizmy odporności. Każdy ma inny zakres i cel. Trzymaj je osobno przy debugowaniu zachowania routingu.

![3-layer resilience model](../diagrams/exported/resilience-3layers.svg)

> Źródło: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

## 1. Provider Circuit Breaker

**Zakres:** cały provider (np. `glm`, `openai`, `anthropic`).

**Cel:** przestać wysyłać ruch do providera, który wielokrotnie zawodzi na poziomie upstream/usługi.

**Implementacja:**

- Klasa bazowa: `src/shared/utils/circuitBreaker.ts`
- Podłączenie: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- Status API: `GET /api/monitoring/health`
- Reset API: `POST /api/resilience/reset`
- Wrappery: `open-sse/services/accountFallback.ts`
- Tabela DB: `domain_circuit_breakers`

**Stany:**

- `CLOSED` — normalny ruch dozwolony
- `DEGRADED` — ruch nadal dozwolony, ale podwyższone awarie providera są śledzone
- `OPEN` — provider tymczasowo zablokowany; routing combo go pomija
- `HALF_OPEN` — minął reset timeout; dozwolone żądanie probe

**Konfigurowalne domyślne (`open-sse/config/constants.ts`, dostępne w Dashboard → Settings → Resilience):**

| Class   | Degraded at | Opens at    | Reset timeout |
| ------- | ----------- | ----------- | ------------- |
| OAuth   | 5 failures  | 8 failures  | 60s           |
| API-key | 7 failures  | 12 failures | 30s           |
| Local   | derived     | 2 failures  | 15s           |

`degradationThreshold` steruje, kiedy provider wchodzi w `DEGRADED`; `failureThreshold` steruje, kiedy się otwiera i jest pomijany. Profile providerów lokalnych nie są jeszcze wystawione na stronie ustawień Resilience.

**Kody wyzwalające (trip codes):** wyłącznie statusy na poziomie providera `[408, 500, 502, 503, 504]`. NIE wyzwalaj dla błędów na poziomie konta (większość 401/403/429 — te należą do cooldown lub lockout).

**Leniwe odzyskiwanie (lazy recovery):** gdy wygasa `OPEN`, `getStatus()`, `canExecute()`, `getRetryAfterMs()` odświeżają stan do `HALF_OPEN`. Nie jest potrzebny timer w tle.

---

## 2. Connection Cooldown

**Zakres:** pojedyncze połączenie/konto/klucz providera.

**Cel:** pominąć jeden zły klucz, podczas gdy inne połączenia tego samego providera nadal obsługują ruch.

**Implementacja:**

- Oznaczenie niedostępności: `src/sse/services/auth.ts::markAccountUnavailable()`
- Wybór: `getProviderCredentials*` w tym samym pliku
- Obliczanie cooldown: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Ustawienia: `src/lib/resilience/settings.ts`

**Pola per połączenie:**

- `rateLimitedUntil` — znacznik czasu do wygaśnięcia cooldown
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — licznik exponential backoff

**Domyślne cooldowny:**

- OAuth base: 5s
- API-key base: 3s
- API-key 429: preferuje upstream `Retry-After`/nagłówki reset/parsowalny tekst resetu
- Backoff: `baseCooldownMs * 2 ** failureIndex`

**Ochrona anti-thundering-herd:** zapobiega nadmiernemu wydłużaniu cooldown lub podwójnemu inkrementowaniu `backoffLevel` przy równoległych awariach.

**Stany terminalne (NIE cooldowny):**

- `banned` — ustawiane przez detekcję banned-keyword / account-ban (zob. [BAN_DETECTION](../security/BAN_DETECTION.md))
- `expired`
- `credits_exhausted`

Trwają, dopóki nie zmienią się poświadczenia albo operator ich nie zresetuje. Nie nadpisuj stanów terminalnych przejściowym stanem cooldown.

**Leniwe odzyskiwanie (lazy recovery):** gdy `rateLimitedUntil` minie, połączenie znów jest kwalifikowalne. Po udanym użyciu `clearAccountError()` czyści wszystkie pola błędów.

### Session affinity (#7274)

**Zakres:** jedna sesja klienta (nagłówek `X-Session-Id` / `x-codex-session-id` / `x-omniroute-session`) przypięta do jednego połączenia, dla **dowolnego** providera.

**Cel:** utrzymać agenta multi-turn (Claude Code, aider, własne agenty) na tym samym koncie między żądaniami, zmniejszając utratę kontekstu między kontami oraz powtarzające się cold-start 429 u providerów ze stanem sesji per konto.

**Implementacja:**

- Rozwiązanie TTL: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- Wybór/tworzenie pinu: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- Ekstrakcja nagłówka (generyczna, dowolny provider): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- Trwała tabela pinów: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- Ustawienie: `sessionAffinityTtlMs` (globalny TTL w ms, `0` wyłącza) — `src/lib/db/settings.ts`. Przemianowane z Codex-only `codexSessionAffinityTtlMs` przez migrację `124_generic_session_affinity_ttl.sql`, która przenosi wcześniej skonfigurowany Codex TTL jako nową domyślną wartość.

Przed #7274 `resolveSessionAffinityTtlMs()` twardo zwracało `0` dla każdego providera poza `codex`, więc ustawienie TTL (i nagłówki sesji) nie działały nigdzie indziej, mimo że mechanizm pinowania i ekstrakcja nagłówków były już niezależne od providera. Poprawka usunęła ten early-return; TTL stosuje się teraz jednolicie do każdego providera, gdy globalnie ustawiono wartość powyżej `0`.

Trzy nagłówki session-affinity nigdy nie są przekazywane upstream — executory budują własne nagłówki upstream od zera zamiast przepuszczać nagłówki klienta, więc to pozostaje wyłącznie wewnętrznym identyfikatorem korelacji.

---

## 3. Model Lockout

**Zakres:** trójka provider + connection + model.

**Cel:** uniknąć wyłączenia całego połączenia, gdy niedostępny lub limitowany kwotą jest tylko jeden model.

**Przykłady:**

- Providery z kwotą per model zwracające 429
- Providery lokalne zwracające 404 dla jednego brakującego modelu
- Awarie uprawnień mode/model specyficzne dla providera (np. tryby Grok)

**Implementacja:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`.

### Model Cooldowns Dashboard (v3.8.0)

UI: Settings → Model Cooldowns (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

Listuje aktywne lockouty z: provider, connection, model, reason, expiresAt. Operatorzy mogą ręcznie ponownie włączyć model z karty.

**REST API:**

- `GET /api/resilience/model-cooldowns` — lista aktywnych lockoutów
- `DELETE /api/resilience/model-cooldowns` — ręczne ponowne włączenie. Body: `{provider, connection, model}`. Auth: management.

### Lockout settings UI + success-decay recovery (v3.8.23)

Model lockout przeszedł z zawsze włączonego, hardcodowanego zachowania do w pełni konfigurowalnej,
opcjonalnej (opt-in) funkcji z własną kartą ustawień i ścieżką samonaprawczego odzyskiwania.

**Karta ustawień:** Settings → Model Lockout
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`).
To jest **oddzielne** od tylko do odczytu `ModelCooldownsCard` powyżej (która tylko
_listuje_ aktywne lockouty) — nowa karta _konfiguruje parametry_. Domyślne wartości
są w `DEFAULT_MODEL_LOCKOUT_SETTINGS`
(`src/lib/resilience/modelLockoutSettings.ts`):

| Setting                 | Default                          | Meaning                                                     |
| ----------------------- | -------------------------------- | ----------------------------------------------------------- |
| `enabled`               | `false`                          | Master toggle — model lockout jest **domyślnie wyłączony**. |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | Statusy upstream liczone jako awaria w zakresie modelu.     |
| `baseCooldownMs`        | `120_000` (120 s)                | Początkowy czas lockoutu przy pierwszej awarii.             |
| `maxCooldownMs`         | `1_800_000` (30 min)             | Górny limit eskalowanego cooldown.                          |
| `maxBackoffSteps`       | `10`                             | Maks. kroki eskalacji exponential-backoff.                  |
| `useExponentialBackoff` | `true`                           | Czy powtarzające się awarie eskalują cooldown wykładniczo.  |

Ustawienia są utrwalane przez zwykły settings store i walidowane przez
schemat resilience settings; karta ogranicza (clamp) `baseCooldownMs`/`maxCooldownMs`
(z `maxCooldownMs ≥ baseCooldownMs`) oraz `maxBackoffSteps`.

**Odzyskiwanie success-decay:** odzyskiwanie **nie** polega wyłącznie na wygaśnięciu timera. Zdrowa
odpowiedź obniża licznik awarii modelu, więc model, który odzyskał sprawność
w trakcie okna, przestaje eskalować (i czyści się) zanim wygasłby timer. Przy udanym
celu combo `open-sse/services/combo.ts` wywołuje `decayModelFailureCount()`
(`open-sse/services/accountFallback.ts`), które **dzieli na pół** zapisany
`failureCount` (`Math.floor(failureCount / 2)`); gdy dojdzie do `0`, wpis lockoutu
jest całkowicie usuwany. Odpowiednik `recordModelLockoutFailure()`
zwiększa licznik (i eskaluje cooldown) przy awariach w oknie
eskalacji. To success-decay działa dodatkowo do zwykłego wygaśnięcia timera —
któraś ze ścieżek może ponownie włączyć model.

**Stan:** lockouty są trzymane **w pamięci** (per-process `Map`y
`ModelLockoutEntry` kluczone przez `provider:connectionId:model`), nie utrwalane w
DB — giną przy restarcie. _Ustawienia_ są utrwalane; aktywny
_stan_ lockoutu jest efemeryczny.

---

## 4. Quota-Share Concurrency Control (v3.8.36)

Konta subskrypcyjne (GLM, MiniMax itd.) często akceptują tylko ~1–3 równoległe
żądania; przekroczenie tego wywołuje 429 i cooldowny. Jest to ostre przy
combach **quota-share** (`qtSd/…`), gdzie kilka kluczy API dzieli jedno konto
upstream. Trzy warstwy chronią współdzielone konto przed zalaniem.

### Per-connection concurrency cap (`max_concurrent`)

Każde połączenie providera może zadeklarować sufit `max_concurrent`
(`provider_connections.max_concurrent`, ustawiane w connection modal / API / DB).
Zostaw puste, by nie mieć limitu. To jest pojedyncza gałka napędzająca warstwę
serializacji poniżej — ustaw na realną współbieżność konta (np. GLM ~1, MiniMax ~2).

### Quota-share request serialization

Gdy dispatch quota-share celuje w połączenie z dodatnim
`max_concurrent`, równoległe żądania do tego **konta** są serializowane przez
semafór per-connection (klucz `qsconn:<connectionId>`): nadmiarowe żądania **czekają w
kolejce** zamiast zalewać konto. Jest **fail-open** — nasycona
kolejka lub timeout idzie dalej bez slotu, zamiast kiedykolwiek odrzucać możliwy do
wysłania request. Przełącznik w **Settings → Resilience → Quota-share per-connection
concurrency** (`resilienceSettings.quotaShareConcurrencyLimit.enabled`, domyślnie
włączone). Bez limitu `max_concurrent` zachowanie się nie zmienia.

> Brama routingu quota-share (`selectQuotaShareTarget`, DRR + P2C) sama jest
> fail-open i tylko _obniża priorytet_ połączenia na limicie — przy puli
> z jednym połączeniem nie może twardego limitować, więc to ten semafór realnie
> powstrzymuje zalew.

### Combo cooldown-aware retry

Dla każdej strategii combo (gdy włączone), żądanie, które skrystalizowałoby 429
dla KRÓTKIEGO przejściowego cooldown, odczekuje go i ponownie dispatchuje zamiast
zwracać 429 — obejmuje to okna TPM/RPM klasy Gemini (~60s retry-after)
na combach multi-model, np. oba cele combo 2-modelowego trafiające w limit
per-model. Ograniczone przez `comboCooldownWait` (`enabled`, `maxWaitMs`, `maxAttempts`,
`budgetMs`) w **Settings → Resilience**. Nigdy nie czeka na `quota_exhausted`
(zablokowane do północy) ani powody auth/not-found.

---

## 5. Request Queue Admission Control (v3.8.49 · issue #6593)

**Zakres**: lokalna kolejka rate-limit per-provider+connection (`open-sse/services/rateLimitManager.ts`,
oparta na Bottleneck), jedna warstwa poniżej trzech mechanizmów powyżej.

**Domyślne `maxWaitMs` obniżone 120s → 15s.** `resilienceSettings.requestQueue.maxWaitMs`
ogranicza, jak długo żądanie może czekać w lokalnej kolejce, zanim zostanie odrzucone
(`code: "RATE_LIMIT_QUEUE_TIMEOUT"`, #4165). Fabryczna domyślna spadła z 120000ms do
15000ms, więc nasycona kolejka fail-fast zamiast trzymać wywołującego przez dwie
minuty; nadpisz przez `RATE_LIMIT_MAX_WAIT_MS` (env) lub dashboard
(**Settings → Resilience**, sufit UI 1–30000ms).

**`maxQueueDepth` — opcjonalny (opt-in) limit admission (nowe).** `resilienceSettings.requestQueue.maxQueueDepth`
ogranicza, ile żądań może jednocześnie siedzieć w kolejce (jeszcze nie wysłanych) dla jednego
provider+connection. Gdy kolejka już trzyma `maxQueueDepth`
żądań, nowe żądanie jest szybko odrzucane z typowanym
błędem `code: "RATE_LIMIT_QUEUE_FULL"` **zanim** dotrze do `limiter.schedule()`
— więc odrzucenie jest tanie i następuje przed jakąkolwiek dalszą
pracą prompt-compression / translation dla tego żądania. Domyślne `0` =
wyłączone, zachowując dotychczasowe nieograniczone zachowanie kolejki; zakres 0–100000.
Nadpisz przez `RATE_LIMIT_MAX_QUEUE_DEPTH` (env) lub
`resilienceSettings.requestQueue.maxQueueDepth` (dashboard/API patch).

Sama kontrola admission to czysta funkcja
(`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`), więc
jest unit-testowalna bez prawdziwego limitera Bottleneck.

> RFC, które otworzyło #6593, proponowało też flagę `bypassCompressionOnRateLimit`.
> Pipeline `open-sse/services/compression/` w tym repo to
> kompresja prompt/context na wychodzącym żądaniu LLM (`chatCore.ts`,
> wokół bloku `resolveCompressionSettings`/`selectCompressionStrategy`),
> a nie kompresja odpowiedzi HTTP na syntetyzowanych body 429 — nie ma
> pasującej ścieżki kodu dla literalnej flagi bypass. Ten krok prompt-compression
> obecnie też działa _przed_ `withRateLimit()` w pipeline żądania, więc
> przestawienie kolejności, by go pominąć przy odrzuceniu queue-full, to osobna, większa
> zmiana niż zakres tego issue; celowo **nie** zaimplementowano jej
> tutaj i zostawiono jako follow-up, jeśli zysk CPU jest wart
> ryzyka przestawienia kolejności.

---

## Inne funkcje odporności

- **19 strategii routingu** (priority, weighted, round-robin, context-relay, fill-first, p2c, random, least-used, cost-optimized, reset-aware, reset-window, headroom, strict-random, auto, lkgp, context-optimized, cache-optimized, fusion, pipeline) — zob. [AUTO-COMBO.md](../routing/AUTO-COMBO.md).
- **Reset-aware routing** (v3.8.0) — priorytetyzuje połączenia według czasu resetu kwoty.
- **Background mode degradation** — Responses API `background: true` zdegradowane do sync z ostrzeżeniem.
- **Dynamic tool limit detection** — wycofuje się z providerów przy trafieniu w limity liczby tooli.
- **Emergency fallback** — sterowane przez `OMNIROUTE_EMERGENCY_FALLBACK`; operatorzy mogą to nadpisać ze strony Feature Flags bez restartu.

---

## Debugowanie

- Wszystkie klucze providera pominięte → sprawdź zarówno stan circuit breakera, JAK I `rateLimitedUntil`/`testStatus` każdego połączenia.
- Provider trwale wykluczony po oknie resetu → kod czyta surowy `state` zamiast `getStatus()`/`canExecute()`.
- Jeden klucz pada, inne powinny działać → preferuj connection cooldown zamiast circuit breakera.
- Pada tylko jeden model → preferuj model lockout zamiast connection cooldown.
- Stan powinien sam się odzyskać, a nie robi → sprawdź przyszły timestamp + ścieżkę odczytu odświeżającą wygasły stan. Statusy permanentne wymagają ręcznych zmian.

---

## TLS Fingerprinting & Stealth

Stealth specyficzny dla providera (JA3/JA4, CCH, obfuscation) jest udokumentowany osobno — zob. [STEALTH_GUIDE.md](../security/STEALTH_GUIDE.md).

---

## Testy odporności (Phase 8 · Block C)

Poza unit testami logiki odporności trzy testy ćwiczą runtime pod
realnym stresem/awariami (wszystkie integration/nightly — żaden nie blokuje PR):

| Test        | Co                                                                                                                                                                               | Uruchomienie                             |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| Chaos       | Fake-upstream node wstrzykuje realne latency/reset/timeout/503; waliduje, że circuit breaker otwiera/odzyskuje i `checkFallbackError` klasyfikuje 503 jako recoverable fallback. | `RUN_CHAOS_INT=1 npm run test:chaos`     |
| Heap-growth | ~500 streamów per `createSSEStream` pod `--expose-gc`; pada, jeśli heap rośnie ponad sufit (OOM guard #3069).                                                                    | `npm run test:heap`                      |
| k6 soak     | Sustained load na `/api/monitoring/health`; progi p95/error.                                                                                                                     | `k6 run tests/load/k6-soak.js` (nightly) |

Orkiestrowane przez `.github/workflows/nightly-resilience.yml` (cron + dispatch). W
domyślnym `test:integration` chaos i heap same się pomijają (bez `RUN_CHAOS_INT`/`--expose-gc`).

---

## Zobacz także

- [Architecture Guide](./ARCHITECTURE.md) — Architektura systemu i wnętrze
- [User Guide](../guides/USER_GUIDE.md) — Providery, combo, integracja CLI
- [Auto-Combo Engine](../routing/AUTO-COMBO.md) — scoring 13-czynnikowy, mode packs
