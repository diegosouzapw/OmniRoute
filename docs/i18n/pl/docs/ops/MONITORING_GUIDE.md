---
title: "Przewodnik monitorowania i obserwowalności"
version: 3.8.40
lastUpdated: 2026-06-28
---

# Przewodnik monitorowania i obserwowalności

> **TL;DR**: OmniRoute dostarcza wbudowane monitorowanie kondycji, autopilota providerów, śledzenie limitów (quota) oraz haki obserwowalności. Ten przewodnik obejmuje dashboard, alerty i rozwiązywanie problemów.

**Źródła:**

- `src/lib/monitoring/observability.ts` — migawka obserwowalności
- `src/lib/monitoring/comboHealthAutopilot.ts` — autopilot kondycji combo
- `src/lib/monitoring/providerHealthAutopilot.ts` — autopilot providerów
- `src/lib/monitoring/providerHealthMatrix.ts` — macierz kondycji providerów
- `src/lib/localHealthCheck.ts` — lokalny health check
- `src/lib/tokenHealthCheck.ts` — kondycja odświeżania tokenów
- `src/lib/proxyHealth.ts` — cache kondycji proxy (opisany w PROXY_GUIDE.md)

---

## Przegląd

OmniRoute ma **3 warstwy monitorowania**:

```
┌──────────────────────────────────────────────────────────────┐
│  Warstwa 1: Kondycja systemu (poziom serwera)                 │
│  ├─ localHealthCheck.ts — DB, porty, natywne zależności       │
│  ├─ db/healthCheck.ts — integralność, FK, osierocone artefakty│
│  └─ Dashboard: /dashboard/health                              │
├──────────────────────────────────────────────────────────────┤
│  Warstwa 2: Kondycja providerów (odporność per provider)      │
│  ├─ providerHealthAutopilot.ts — circuit breaker, cooldowny   │
│  ├─ providerHealthMatrix.ts — wyniki kondycji per provider/model │
│  └─ Dashboard: /dashboard/providers                           │
├──────────────────────────────────────────────────────────────┤
│  Warstwa 3: Live obserwowalność (migawki runtime)             │
│  ├─ observability.ts — circuit breakery, sesje, quota         │
│  ├─ tokenHealthCheck.ts — kondycja odświeżania tokenów OAuth  │
│  └─ Narzędzia MCP: omniroute_get_health, omniroute_get_session_snapshot │
└──────────────────────────────────────────────────────────────┘
```

---

## Strony dashboardu

### `/dashboard/health` (Kondycja systemu)

Dashboard kondycji najwyższego poziomu pokazuje:

| Sekcja                      | Co pokazuje                                              |
| --------------------------- | -------------------------------------------------------- |
| **Status serwera**          | Uptime, wersja, port, aktywne połączenia                 |
| **Baza danych**             | Połączenie, integralność, rozmiar WAL, ostatnie migracje |
| **Podsumowanie providerów** | Liczba aktywnych, zdrowych, otwartych breakerów          |
| **Monitory quota**          | Aktywne sesje, alertujące, wyczerpane                    |
| **Ostatnie błędy**          | Ostatnie 10 błędów ze stack trace                        |
| **Zużycie zasobów**         | Pamięć, CPU, wskaźnik ciśnienia heapa                    |

### `/dashboard/providers` (Kondycja providerów)

Dashboard per provider:

| Kolumna     | Opis                                  |
| ----------- | ------------------------------------- |
| Provider    | ID providera + nazwa wyświetlana      |
| Health      | Status zielony/żółty/czerwony         |
| Circuit     | Stan open/closed/half-open            |
| Connections | Liczba połączeń, ostatnie odświeżenie |
| Models      | Dostępne modele, kondycja per model   |
| Cost        | Dzisiejszy koszt, trend 7-dniowy      |
| Errors      | Liczba błędów z 24h, top klasa błędu  |

Kliknij providera, aby zobaczyć:

- Ostatnie żądania z rozbiciem latencji
- Wyniki kondycji per połączenie
- Lockouty per model
- Rekomendacje autopilota

### `/dashboard/quota` (Śledzenie limitów)

Dla każdego klucza API:

- Bieżące użycie vs limit (pasek postępu)
- Trend quota (wykres 30-dniowy)
- Czas następnego resetu
- Historia alertów

### `/dashboard/combos` (Kondycja combo)

Per combo:

- Strategia + cele (targets)
- Kondycja per target
- Ostatnie zdarzenia fallback
- Wskaźnik sukcesu (24h, 7d, 30d)

---

## API health check

> **Uwaga:** Tylko `GET /api/monitoring/health` jest udostępniony jako endpoint REST. Wszystkie pozostałe dane monitorowania (kondycja providerów, problemy autopilota, monitory quota, kondycja tokenów, latencja) są dostępne przez **narzędzie MCP** `observability_snapshot` lub strony **dashboardu** — nie ma dla nich dedykowanych tras REST.

### Kondycja systemu

```bash
GET /api/monitoring/health
```

Odpowiedź:

```json
{
  "status": "healthy",
  "version": "3.8.16",
  "uptime": 123456,
  "checks": {
    "database": { "status": "pass", "latency_ms": 2 },
    "writeable": { "status": "pass" },
    "integrity": { "status": "pass", "result": "ok" },
    "foreign_keys": { "status": "pass", "violations": 0 },
    "heap_pressure": { "status": "pass", "usage_mb": 142, "threshold_mb": 512 },
    "active_sessions": 12,
    "providers": {
      "total": 7,
      "healthy": 6,
      "degraded": 1,
      "down": 0
    }
  }
}
```

### Kondycja providerów

> **Brak endpointu REST.** Dane kondycji providerów są dostępne przez narzędzie MCP `observability_snapshot` lub stronę dashboardu `/dashboard/providers`.

### Szczegóły providera

> **Brak endpointu REST.** Szczegóły per provider są dostępne przez stronę dashboardu `/dashboard/providers`.

---

## Autopilot kondycji providerów

Moduł `providerHealthAutopilot.ts` to **system samonaprawczy**, który:

1. Wykrywa problemy providerów (otwarty circuit, cooldowny, lockouty, ostrzeżenia quota)
2. Generuje **zalecane akcje** w celu ich rozwiązania
3. Opcjonalnie **auto-wykonuje** akcje niskiego ryzyka

### Wykrywane typy problemów

| Rodzaj problemu              | Severity | Przykładowy warunek                          |
| ---------------------------- | -------- | -------------------------------------------- |
| `provider_circuit_open`      | critical | Circuit breaker otwarty po 5 niepowodzeniach |
| `provider_circuit_half_open` | warning  | Circuit testuje odzyskiwanie                 |
| `connection_cooldown`        | warning  | Połączenie w cooldownie po 429               |
| `stale_connection_error`     | warning  | Ostatnie odświeżenie nieudane 30+ minut temu |
| `terminal_connection_error`  | critical | OAuth odwołany, klucz nieprawidłowy          |
| `inactive_connection`        | info     | Połączenie wyłączone w ustawieniach          |
| `model_lockout`              | warning  | Konkretny model w kwarantannie               |
| `quota_monitor_warning`      | warning  | Quota na 80%+ użycia                         |

### Generowane typy akcji

| Akcja                          | Ryzyko | Opis                                         |
| ------------------------------ | ------ | -------------------------------------------- |
| `clear_provider_breaker`       | medium | Reset circuit breakera do stanu closed       |
| `clear_connection_cooldown`    | low    | Usunięcie cooldownu z połączenia             |
| `clear_stale_connection_error` | low    | Wyczyszczenie flagi nieaktualnego błędu      |
| `clear_model_lockout`          | low    | Ponowne włączenie modelu w kwarantannie      |
| `reactivate_connection`        | medium | Ponowne włączenie dezaktywowanego połączenia |
| `deactivate_connection`        | high   | Wyłączenie problematycznego połączenia       |

### API

> **Brak endpointu REST.** Problemy autopilota są dostępne przez narzędzie MCP `observability_snapshot` lub dashboard. Autopilot działa wewnętrznie; jego zachowanie konfiguruje się przez settings DB (pole `autopilotMode` per połączenie), a nie zmienne środowiskowe — `grep -rn` dla env var trybu autopilota zwraca zero trafień.

### Tryb autopilota

Autopilot domyślnie działa w **trybie ręcznym** — wykrywa problemy i generuje zalecane akcje, ale nie stosuje ich automatycznie. Akcje można zastosować przez dashboard.

---

## Autopilot kondycji combo

`comboHealthAutopilot.ts` to **odpowiednik specyficzny dla combo** autopilota providerów. On:

- Wykrywa niezdrowe combo
- Rekomenduje zmianę kolejności targetów
- Sugeruje wyłączenie zepsutych targetów
- Auto-usuwa martwe targety po N niepowodzeniach

### Przykłady problemów combo

```
Combo "always-on" (priority strategy)
├─ Target 1: openai/gpt-5 (healthy)
├─ Target 2: anthropic/claude-opus-4-6 (⚠️ model lockout until 14:00)
└─ Target 3: kiro/claude-sonnet-4-5 (healthy)

Recommended action: Reorder — move kiro above anthropic until lockout expires
```

---

## Monitory quota

`observability.ts` udostępnia **monitory quota per sesja** dla providerów subskrypcyjnych (Claude Code, Codex, GitHub Copilot):

```ts
interface QuotaMonitorSnapshot {
  sessionId: string;
  provider: string;
  accountId: string;
  status: "starting" | "idle" | "healthy" | "warning" | "exhausted" | "error";
  lastQuotaPercent: number | null; // 0-100
  lastQuotaUsed: number | null;
  lastQuotaTotal: number | null;
  lastResetAt: string | null;
  nextPollAt: string | null;
  totalPolls: number;
  totalAlerts: number;
  consecutiveFailures: number;
}
```

### Znaczenie statusów

| Status      | Kiedy                     | Akcja UI                                      |
| ----------- | ------------------------- | --------------------------------------------- |
| `starting`  | Trwa początkowy poll      | Spinner                                       |
| `idle`      | Brak niedawnej aktywności | Ukryty na dashboardzie                        |
| `healthy`   | Pozostało > 50% quota     | Zielona kropka                                |
| `warning`   | Pozostało < 50% quota     | Żółty alert                                   |
| `exhausted` | Quota = 0%                | Czerwony blok, routuj do następnego providera |
| `error`     | Polling nieudany          | Czerwona kropka, ponów wkrótce                |

### API

> **Brak endpointu REST.** Dane monitora quota są dostępne przez narzędzie MCP `observability_snapshot` lub dashboard.

---

## Migawka obserwowalności

Narzędzie MCP `observability_snapshot` zwraca **kompletną migawkę systemu** dla agentów AI:

```json
{
  "circuitBreakers": [
    {
      "name": "openai",
      "state": "closed",
      "failureCount": 0,
      "lastFailureTime": null,
      "retryAfterMs": null
    }
  ],
  "sessions": [
    {
      "sessionId": "sess-123",
      "createdAt": 1234567890,
      "lastActive": 1234567999,
      "requestCount": 42,
      "connectionId": "conn-456",
      "ageMs": 109
    }
  ],
  "quotaMonitors": {/* see above */},
  "uptime": 12345,
  "version": "3.8.16"
}
```

Agenci używają tego do podejmowania **decyzji routingu** — na przykład: „jeśli circuit openai jest otwarty, routuj najpierw do anthropic”.

---

## Health check tokenów

Providery OAuth (Claude Code, GitHub Copilot, Cursor) potrzebują **okresowego odświeżania tokenów**. `src/lib/tokenHealthCheck.ts` uruchamia scheduler w tle:

- **Tick sweep**: co 60 sekund (sweep w `TICK_MS = 60 * 1000` w `src/lib/tokenHealthCheck.ts:30`)
- **Interwał health check per połączenie**: domyślnie 60 minut (`DEFAULT_HEALTH_CHECK_INTERVAL_MIN = 60`); konfigurowalny przez settings DB
- **Wyprzedzające odświeżenie przy 401**: obsługiwane przez interceptor per połączenie

### Status kondycji tokenu

```ts
interface TokenHealth {
  connectionId: string;
  provider: string;
  status: "valid" | "expiring_soon" | "expired" | "refresh_failed";
  expiresAt: string;
  lastRefresh: string;
  nextRefresh: string;
  consecutiveFailures: number;
}
```

### Konfiguracja

Konfiguracja health check tokenów jest obsługiwana wewnętrznie przez `tokenHealthCheck.ts`.

### Kondycja tokenów

> **Brak endpointu REST.** Dane kondycji tokenów są dostępne przez dashboard lub narzędzie MCP `observability_snapshot`.

---

## Alertowanie

### Wbudowane kanały

OmniRoute obsługuje **3 kanały alertów**:

| Kanał            | Konfiguracja    | Przypadek użycia               |
| ---------------- | --------------- | ------------------------------ |
| Dashboard banner | Zawsze włączony | Powiadomienia w aplikacji      |
| Webhook          | Skonfiguruj URL | Slack, Discord, PagerDuty      |
| Log              | Domyślny        | Do zewnętrznej agregacji logów |

### Konfiguracja webhooków

> **Uwaga:** Konfiguracja alertowania webhookami jest obsługiwana przez stronę Settings w dashboardzie. Zobacz UI Settings pod kątem URL webhooka, filtrowania zdarzeń i dostosowania payloadu.

### Typy alertów

| Alert                        | Kiedy                           | Domyślna severity |
| ---------------------------- | ------------------------------- | ----------------- |
| `provider_circuit_open`      | Circuit się otwiera             | critical          |
| `provider_circuit_half_open` | Circuit testuje odzyskiwanie    | info              |
| `quota_warning`              | Quota na 80%+                   | warning           |
| `quota_exhausted`            | Quota na 100%                   | critical          |
| `token_refresh_failed`       | 3+ kolejne nieudane odświeżenia | warning           |
| `token_expired`              | Token po wygaśnięciu            | critical          |
| `combo_target_unhealthy`     | Target combo w cooldownie 1h+   | warning           |
| `db_integrity_warning`       | Naruszenia FK > 0               | warning           |
| `heap_pressure`              | Użycie heapa > 80% progu        | warning           |

---

## Metryki wydajności

### Śledzone metryki

| Metryka                 | Typ       | Źródło                          |
| ----------------------- | --------- | ------------------------------- |
| `request_count`         | counter   | `services/usage.ts`             |
| `request_latency_ms`    | histogram | `services/usage.ts`             |
| `tokens_consumed`       | counter   | `services/usage.ts`             |
| `cost_usd`              | counter   | `services/usage.ts`             |
| `provider_errors`       | counter   | `services/errorClassifier.ts`   |
| `circuit_state_changes` | counter   | `services/resilience.ts`        |
| `cache_hits`            | counter   | `services/signatureCache.ts`    |
| `compression_savings`   | histogram | `services/compression/stats.ts` |
| `quota_used`            | gauge     | `services/quotaMonitor.ts`      |
| `memory_used_mb`        | gauge     | `observability.ts`              |

### Percentyle latencji (p50/p95/p99)

> **Brak endpointu REST.** Dane percentyli latencji są dostępne przez stronę dashboardu `/dashboard/health`. Eksport Prometheus/OpenTelemetry jest planowany na v3.9.

### Eksport Prometheus / OpenTelemetry (Faza 2)

Planowane na v3.9: natywny eksport do Prometheus, OpenTelemetry, Datadog.

Na razie scrapuj `/api/monitoring/health` dowolnym systemem monitorowania opartym o HTTP (Prometheus blackbox exporter, Datadog HTTP check itd.).

---

## Przepisy alertowania

### Slack

> **Uwaga:** Alertowanie webhookami konfiguruje się przez stronę Settings w dashboardzie — nie ma dedykowanych env var webhooków (`grep -rn` zwraca zero trafień). Zobacz UI Settings pod kątem URL webhooka, filtrowania zdarzeń i dostosowania payloadu.

### Discord

> Alertowanie webhookami używa tego samego przepływu UI Settings co Slack. Discord akceptuje ten sam kształt payloadu JSON.

### PagerDuty

> Alertowanie webhookami używa tego samego przepływu UI Settings. Klucze routingu PagerDuty Events API v2 konfiguruje się w UI Settings.

### Własny webhook (JSON)

> Działa dowolny endpoint HTTP przyjmujący POST z ciałem JSON. Skonfiguruj URL w UI Settings.

---

## Konfiguracja dashboardu

### Dostosowanie dashboardu kondycji

Utwórz `~/.omniroute/dashboard.json`:

```json
{
  "health": {
    "sections": ["server_status", "database", "providers", "quota_monitors", "recent_errors"],
    "refresh_interval_ms": 5000
  }
}
```

### Przypięcie providera na górę

```json
{
  "health": {
    "pinned_providers": ["openai", "anthropic"]
  }
}
```

---

## Rozwiązywanie problemów

### „Provider pokazuje healthy, ale żądania padają”

1. Sprawdź **problemy autopilota** — może model jest zablokowany (lockout)
2. Spójrz na **ostatnie błędy** pod konkretną klasę błędu
3. Wypróbuj **test połączenia** na karcie providera
4. Sprawdź, czy provider jest **rate-limited upstream** (niewidoczne lokalnie)

### „Quota pokazuje healthy, a ja widzę 429”

- 429 oznacza, że provider twierdzi, iż wyczerpałeś limit
- Śledzenie quota w OmniRoute może być **nieaktualne** — prawda providera jest upstream
- Dane quota odświeżają się automatycznie przez wewnętrzny monitor quota

### „Combo pada, choć wszystkie targety wyglądają na healthy”

- Sprawdź dashboard **kondycji combo** pod kątem problemów z kolejnością targetów
- Spójrz na **zdarzenia fallback** — może combo wyczerpuje się zbyt szybko
- Zweryfikuj, czy **strategia** pasuje do przypadku użycia (priority vs round-robin vs auto)

### „Health check bazy danych nie przechodzi”

- Uruchom `sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"`
- Jeśli "ok" — fałszywy alarm, health check jest zbyt rygorystyczny
- Jeśli cokolwiek innego — **zatrzymaj OmniRoute** i postępuj według [przewodnika disaster recovery](./DATABASE_GUIDE.md#disaster-recovery)

### „Ciśnienie heapa pamięci jest krytyczne”

```bash
# Check current heap
node -e "console.log(process.memoryUsage())"

# Trigger manual GC (if --expose-gc)
node --expose-gc -e "global.gc(); console.log(process.memoryUsage())"

# Reduce concurrent requests (set via the dashboard Settings page, not an env var)
# There is no `MAX_CONCURRENT_REQUESTS` env var — configure it in Settings → Concurrency.
```

---

## Zobacz też

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — śledzenie użycia i kosztów
- [DATABASE_GUIDE.md](./DATABASE_GUIDE.md) — schemat DB + kondycja
- [PROXY_GUIDE.md](./PROXY_GUIDE.md) — kondycja proxy (osobny cache)
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — architektura systemu
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — szczegóły circuit breakera
- Źródło: `src/lib/monitoring/` (4 pliki, 2121 LOC)
