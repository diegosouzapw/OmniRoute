---
title: "Silnik współdzielenia quota"
version: 3.8.40
lastUpdated: 2026-06-28
---

# Silnik współdzielenia quota

> **Doc reference**: `docs/routing/QUOTA_SHARE.md`
> Część grupy B (plany 16 + 22).

---

## Przegląd

Silnik współdzielenia quota (Quota Sharing Engine) sprawiedliwie rozdziela
quota providera opartą na czasie (np. okno 5-godzinne Codex, Kimi 1500 req/h)
pomiędzy wiele kluczy API współdzielących to samo połączenie.

**Problem, który rozwiązuje:** OmniRoute proxy’uje wiele kluczy API względem
tego samego konta upstream providera. Bez logiki współdzielenia burst z klucza A
może wyczerpać quota providera na godzinę, blokując klucze B i C do resetu okna.
Silnik temu zapobiega przez:

1. Śledzenie rolling consumption każdego klucza per wymiar (%, requests, tokens, $).
2. Stosowanie work-conserving algorytmu fair-share: klucz może pożyczać z
   bezczynnych udziałów, dopóki globalna pula nie jest nasycona.
3. Egzekwowanie wyniku na hot path (`chatCore.ts`) zanim żądanie
   dotrze do upstream executor.

---

## Algorytm: Fair-Share Work-Conserving

Zaimplementowany w `src/lib/quota/fairShare.ts`.

### Tryby

| Warunek                                    | Tryb         | Zachowanie                                                    |
| ------------------------------------------ | ------------ | ------------------------------------------------------------- |
| `globalUsedPercent < saturationThreshold`  | **Generous** | Klucz może pożyczać do limitu globalnego minus consumed-total |
| `globalUsedPercent >= saturationThreshold` | **Strict**   | Ścisłe egzekwowanie indywidualnego fair share                 |

Domyślnie `saturationThreshold = 0.5` (env `QUOTA_SATURATION_THRESHOLD`).

### Decyzja per wymiar

Dla każdego aktywnego wymiaru w puli silnik wylicza:

```
fairShareAllowed = poolLimit × (allocationWeight / 100)
consumed        = current rolling value for this key (from QuotaStore.peek)
remaining       = fairShareAllowed - consumed
```

Następnie:

- **`policy = hard`**: jeśli `consumed > fairShareAllowed` i tryb jest strict → **block**.
- **`policy = soft`**: jeśli `consumed > fairShareAllowed` i tryb jest strict → **penalize** (depriorytetyzacja w combo; nigdy hard-block).
- **`policy = burst`**: zezwalaj, dopóki istnieje global headroom, niezależnie od fair share.

### Cap absolutny

`capValue` + `capUnit` na alokacji to twarde sufit niezależny od trybu i
policy. Każdy wymiar, w którym `consumed >= capValue`, zawsze **blokuje** żądanie.

### Sprawdzenie multi-dimension

Żądanie jest blokowane, jeśli **jakikolwiek** wymiar w puli je zablokuje. Wymiary
są niezależne — wyczerpanie 5h% nie wpływa na wymiar weekly%.

### Pożyczanie (borrowing)

W trybie generous klucz z niedostatecznie zużytą alokacją może wykorzystać nadwyżkę
z niewykorzystanych udziałów innych kluczy. Formuła:

```
maxAllowed = globalLimit - consumedByOtherKeys
```

gdzie `consumedByOtherKeys = consumedTotal - consumedByThisKey`. Globalny sufit
(pool `limit` dla danego wymiaru) zawsze pozostaje twardym pułapem.

---

## Licznik okna przesuwnego (Sliding Window Counter)

Zaimplementowany w `src/lib/quota/sqliteQuotaStore.ts` oraz `redisQuotaStore.ts`.

Dwa buckety na `(apiKeyId, dimensionKey)`:

- `curr`: bieżący bucket (`floor(nowMs / windowMs)`)
- `prev`: poprzedni bucket (`curr - 1`)

Efektywna wartość rolling:

```
effectiveBucketIndex = floor(nowMs / windowMs)
bucketStartMs        = effectiveBucketIndex × windowMs
elapsed              = nowMs - bucketStartMs
weight               = 1 - elapsed / windowMs

effective = prev × weight + curr
```

**Precyzja**: ~99% dokładności. Błąd wynosi co najwyżej 1% rozmiaru okna na
granicy bucketów (właściwość przybliżenia 2-bucket).

### Współbieżność

Sterownik SQLite: mutex w pamięci per klucz `(apiKeyId | dimensionKey)` zapobiega
wyścigowi read-modify-write. Wzorzec jak anti-thundering-herd w `src/sse/services/auth.ts`.

Sterownik Redis: skrypt Lua EVAL do atomowego inkrementu — jako pojedyncza komenda Redis.

---

## Sterowniki (Drivers)

### SQLite (domyślny, 0-install)

- Tabela: `quota_consumption` (zob. migracje `073_quota_pools.sql` / `074_quota_consumption.sql`).
- Najlepszy do wdrożeń single-instance.
- Cała persystencja w istniejącej bazie SQLite OmniRoute (`DATA_DIR/storage.sqlite`).

### Redis (opcjonalny, multi-instance)

- Wymaga pakietu npm `ioredis`.
- Liczniki w Redis; metadane (pools/allocations) nadal w SQLite.
- Najlepszy do wdrożeń multi-replica, gdzie liczniki muszą być współdzielone.

### Przełączanie sterowników

Przez UI ustawień (`/dashboard/settings` → Quota Store) lub zmienne env:

```bash
QUOTA_STORE_DRIVER=redis
QUOTA_STORE_REDIS_URL=redis://localhost:6379
```

Ustawienie DB ma pierwszeństwo przed env. Jeśli `driver=redis`, ale brak URL albo
`ioredis` nie jest zainstalowany, fabryka wraca do SQLite i loguje ostrzeżenie.

Kolejność wyboru sterownika:

1. Ustawienie DB `quotaStore.driver`
2. Env `QUOTA_STORE_DRIVER`
3. Domyślnie: `sqlite`

---

## Multi-Dimension

Pula może mieć wiele wymiarów. Każdy wymiar jest niezależny:

```ts
QuotaDimension {
  unit: "percent" | "requests" | "tokens" | "usd",
  window: "5h" | "hourly" | "daily" | "weekly" | "monthly",
  limit: number,  // global pool ceiling for this dimension
}
```

**Przykład: plan Codex** (5h% + weekly%):

```json
[
  { "unit": "percent", "window": "5h", "limit": 100 },
  { "unit": "percent", "window": "weekly", "limit": 100 }
]
```

Żądanie musi spełnić wszystkie wymiary, aby zostało dopuszczone.

---

## Plan Resolver

Zaimplementowany w `src/lib/quota/planResolver.ts`.

Precedencja (od najwyższej do najniższej):

1. **Ręczny override w DB** — tabela `provider_plans`, per `connectionId`.
2. **Znany katalog** — `src/lib/quota/planRegistry.ts` (data-only).
3. **Pusty plan** — brak wymiarów, wymagana ręczna konfiguracja.

### Znany katalog

| Provider              | Dimensions                                                    |
| --------------------- | ------------------------------------------------------------- |
| `codex`               | `percent/5h/100`, `percent/weekly/100`                        |
| `glm`                 | `tokens/5h` (limit=0, unknown), `tokens/weekly`               |
| `minimax`             | `tokens/5h`, `tokens/weekly`                                  |
| `bailian`             | `percent/5h/100`, `percent/weekly/100`, `percent/monthly/100` |
| `kimi`                | `requests/hourly/1500`                                        |
| `alibaba`             | `requests/monthly/90000`                                      |
| `openai`, `anthropic` | Brak domyślnego — wymagana ręczna konfiguracja                |

---

## Integracja z pipeline

### PRE hook (`open-sse/handlers/chatCore.ts`)

Uruchamiany przed upstream executor, po auth i sprawdzeniach policy:

```
resolveComboTargets / handleSingleModel
  → enforceQuotaShare(apiKeyId, connectionId, provider, estimatedCost)
      → getQuotaStore().peek() per dimension
      → fairShare.decideFairShare()
      → if block → return 429 (buildErrorBody, Hard Rule #12)
      → if allow + deprioritize → set quotaSoftPenalty=true on candidate
  → executor.execute()
```

**Fail-open**: jeśli `enforceQuotaShare` rzuci wyjątek, żądanie jest przepuszczane
z logiem `pino.warn`. Zapobiega to blokowaniu całego ruchu przez błąd silnika quota.

### POST hook (zapis consumption)

Po udanej odpowiedzi:

```
executor returns success
  → spendRecorder.recordConsumption(apiKeyId, connectionId, provider, actualCost)
      → getQuotaStore().consume() per dimension
      → fail-open: errors logged as pino.warn, never propagated to client
```

**Uwaga o dryfie**: jeśli `consume` zawiedzie po odpowiedzi, rolling counter
niedolicza zużycia. Sygnał nasycenia od providera (np. `anthropic-ratelimit-unified-5h-utilization`)
koryguje globalne oszacowanie przy następnym żądaniu.

### Soft penalty w combo (`open-sse/services/combo.ts`)

Gdy `decision.deprioritize === true`:

```ts
if (candidate.quotaSoftPenalty) {
  score *= QUOTA_SOFT_DEPRIORITIZE_FACTOR; // default 0.7
}
```

Kara jest stosowana po wszystkich innych czynnikach scoringu. Obniża prawdopodobieństwo
auto-combo wybrania nasyconego klucza bez twardego blokowania.

---

## Przewodnik po UI

### `/dashboard/costs/quota-share` — Główna strona pul

Komponenty (wszystkie w `src/app/(dashboard)/dashboard/costs/quota-share/`):

| Component              | Purpose                                                                  |
| ---------------------- | ------------------------------------------------------------------------ |
| `QuotaConceptCard`     | Karta wprowadzająca wyjaśniająca współdzielenie quota nowym użytkownikom |
| `CreatePoolModal`      | Tworzenie nowej puli quota (connection + name + początkowe allocations)  |
| `PoolCard`             | Podsumowanie per pula: name, connection, liczba alokacji                 |
| `DimensionBar`         | Stacked bar per wymiar: udział każdego klucza + global usage             |
| `AllocationTable`      | Tabela: consumed, fair share, deficit/surplus, flaga borrowing           |
| `BurnRateChart`        | Wykres liniowy EMA burn-rate (leniwy Recharts przez `dynamic()`)         |
| `EditAllocationsModal` | Edycja wag alokacji, capów i polityk dla puli                            |

Hooki strony:

- `usePools` — pobiera `GET /api/quota/pools` co 30s.
- `usePoolUsage` — pobiera `GET /api/quota/pools/[id]/usage` na żądanie.
- `useLocalStoragePoolMigration` — uruchamiany raz przy mount, migracja legacy LS.

### `/dashboard/costs/quota-share/plans` — Konfiguracja planów providera

- `ProviderPlanConfigClient.tsx`: dropdown wyboru providera, podgląd resolved
  planu (auto z katalogu lub ręczny override) oraz edycja wymiarów.
- Zmiany zapisują się przez `PUT /api/quota/plans/[connectionId]`.
- Usunięcie przywraca katalog lub pusty plan.

---

## Zmienne środowiskowe

| Variable                           | Default   | Description                                               |
| ---------------------------------- | --------- | --------------------------------------------------------- |
| `QUOTA_STORE_DRIVER`               | `sqlite`  | Sterownik: `sqlite` lub `redis`                           |
| `QUOTA_STORE_REDIS_URL`            | _(empty)_ | URL Redis, np. `redis://localhost:6379`                   |
| `QUOTA_SATURATION_THRESHOLD`       | `0.5`     | 0..1; `>= threshold` aktywuje tryb strict                 |
| `QUOTA_SOFT_DEPRIORITIZE_FACTOR`   | `0.7`     | 0..1; mnożnik score combo przy soft-policy                |
| `QUOTA_CONSUMPTION_RETENTION_DAYS` | `14`      | Dni przed GC usuwającym stare buckety `quota_consumption` |

Ustawienia DB (`quotaStore.*`) nadpisują zmienne env.

---

## Rozwiązywanie problemów

### Redis skonfigurowany, ale nie łączy się

Sprawdź, że `ioredis` jest zainstalowany (`npm ls ioredis`) i `QUOTA_STORE_REDIS_URL`
jest osiągalny. Przy błędzie połączenia fabryka wraca do SQLite (log na poziomie
`warn`).

### `peek` zwraca stale / fail-open

Jeśli `peek` rzuci wyjątek, `enforceQuotaShare` traktuje wynik jako „allow” (fail-open).
Sprawdź logi `pino` pod kątem wpisów `quota:enforce` i `quota:factory`, aby znaleźć
przyczynę.

### Dryf licznika consumption

Jeśli rzeczywiste zużycie u providera różni się od liczników — to oczekiwane:
okno przesuwne 2-bucket ma ~1% błędu na granicach okien, a `consume` jest
fire-and-forget po odpowiedzi. Sygnał nasycenia (`saturationSignals.ts`)
odczytuje realną utylizację providera z TTL 30s i odpowiednio koryguje
`globalUsedPercent`.

### Pula pokazuje „no data” dla burn rate

`computeBurnRate` wymaga co najmniej 2 historycznych próbek. Nowe pule bez wcześniejszych
wywołań `consume` pokażą `tokensPerSecond: 0` oraz `timeToExhaustionMs: null`.

---

## Migracja z localStorage

Gdy `/dashboard/costs/quota-share` ładuje się po raz pierwszy, hook `useLocalStoragePoolMigration`
sprawdza:

1. `localStorage.getItem("omniroute:quota-share:pools")` jest niepuste.
2. `GET /api/quota/pools` zwraca `[]` (DB jest pusta).

Jeśli oba warunki są spełnione, wysyła każdą legacy pulę do `POST /api/quota/pools` wsadowo,
a następnie usuwa klucz localStorage. Migracja jest idempotentna: warunek 2 zapobiega
ponownej migracji.

---

## Klasyfikacja strategii wewnętrznej

`quota-share` to strategia routingu **wyłącznie wewnętrzna** (`INTERNAL_ROUTING_STRATEGY_VALUES` w
`src/shared/constants/routingStrategies.ts`). Używana wyłącznie przez systemowo tworzone
combo pul `qtSd/` i celowo wykluczona z `ROUTING_STRATEGY_VALUES`, żeby nigdy nie
pojawiła się jako opcja wybieralna przez użytkownika w UI ani API.

---

## Pokrycie testami

Z silnikiem quota-share dostarczane są dwie warstwy automatycznego pokrycia:

| Suite              | Command                                                                | What it covers                                                                                                                                                                                     |
| :----------------- | :--------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Unit (29 tests)    | `node --import tsx/esm --test tests/unit/quota-share-strategy.test.ts` | Scheduler DRR, saturation gating, concurrency caps, matematyka fairShare, kolejka backlog                                                                                                          |
| Integration matrix | `npm run test:combo:matrix`                                            | End-to-end decyzja routingu przez realny pipeline combo; fairness DRR + depriorytetyzacja nasycenia przez live seams (`registerQuotaFetcher`, `setLKGP`, `__setHeadroomSaturationFetcherForTests`) |

Macierz integracyjna działa w CI obok pozostałych 17 publicznych strategii. Suite unit
można uruchomić samodzielnie.

---

## Podsumowanie schematu DB

Trzy tabele dodane migracjami `073–075`:

- `quota_pools` + `quota_allocations` — definicje pul i alokacje per klucz.
- `quota_consumption` — rolling 2-bucket counters per `(apiKeyId, dimensionKey)`.
- `provider_plans` — ręczne override planów providera (dimensions JSON per connectionId).

Wszystkie tabele dodane przez idempotentne migracje `CREATE TABLE IF NOT EXISTS`.
