---
title: "Użycie, limity i śledzenie wydatków"
version: 3.8.40
lastUpdated: 2026-06-28
---

# Użycie, limity i śledzenie wydatków

> **TL;DR**: OmniRoute śledzi zużycie tokenów każdego żądania, liczy koszt, egzekwuje limity per klucz API i pokazuje analitykę na dashboardzie. Ten przewodnik wyjaśnia, jak to działa.

**Źródła:**

- `open-sse/services/usage.ts` (~70KB) — główne śledzenie użycia
- `src/lib/usageAnalytics.ts` (~10KB) — agregacja na dashboard
- `src/lib/db/quotaSnapshots.ts` — historyczne dane limitów
- `src/lib/db/usage*.ts` — wiele modułów DB związanych z użyciem

---

## Przegląd

Każde żądanie przechodzące przez OmniRoute generuje **rekord użycia**, który rejestruje:

- **Tożsamość**: który klucz API, provider, model, combo
- **Tokeny**: tokeny promptu, completion, cache, łącznie
- **Koszt**: kwota w USD (liczona z danych cenowych)
- **Czas**: opóźnienie, znaczniki start/end
- **Status**: sukces, błąd, rate-limited itd.

Te rekordy są agregowane w **analitykę**, zapisywane jako **snapshoty limitów** i służą do egzekwowania **limitów budżetu per klucz**.

```
Request ──▶ chatCore ──▶ usage.record() ──▶ SQLite
                                  │
                          ┌───────┼───────┐
                          ▼       ▼       ▼
                    analytics  quota   billing
                    (dashboard) (enforce) (export)
```

---

## Co jest rejestrowane

Serwis `usage.ts` zapisuje **zdarzenie użycia** dla każdego żądania:

| Pole               | Typ     | Źródło                                                     |
| ------------------ | ------- | ---------------------------------------------------------- |
| `id`               | string  | UUID generowany przy zapisie                               |
| `apiKeyId`         | string  | Klucz API, który zainicjował żądanie                       |
| `provider`         | string  | ID providera (openai, anthropic itd.)                      |
| `model`            | string  | ID modelu (gpt-5, claude-opus-4-6 itd.)                    |
| `comboId`          | string? | ID combo, jeśli routowane przez combo                      |
| `promptTokens`     | number  | Z odpowiedzi upstream                                      |
| `completionTokens` | number  | Z odpowiedzi upstream                                      |
| `cachedTokens`     | number  | Tokeny trafień cache (Anthropic prompt caching itd.)       |
| `totalTokens`      | number  | prompt + completion                                        |
| `costUsd`          | number  | Liczone z danych cenowych                                  |
| `latencyMs`        | number  | Czas trwania żądania end-to-end                            |
| `status`           | enum    | `success`, `error`, `rate_limited`, `timeout`, `cancelled` |
| `errorClass`       | string? | Klasa błędu, jeśli status != success                       |
| `timestamp`        | string  | ISO 8601 UTC                                               |
| `metadata`         | object  | Niestandardowe dane wstrzyknięte przez plugin              |

### Skąd biorą się tokeny

Tokeny są wyciągane z odpowiedzi upstream providera w **response handler**:

```ts
// From open-sse/handlers/chatCore.ts
const response = await providerExecutor.execute(provider, request);
const usage = response.usage || {
  prompt_tokens: 0,
  completion_tokens: 0,
  cached_tokens: 0,
};
```

Dla providerów, które nie zwracają usage (niektóre providery web-cookie), OmniRoute **szacuje** tokeny heurystyką `~4 chars per token` (zob. `open-sse/services/autoCombo/pipelineRouter.ts`).

### Tokeny z cache

OmniRoute śledzi `cached_tokens` osobno od `prompt_tokens`, ponieważ:

- Anthropic prompt caching pobiera obniżoną stawkę za tokeny z cache (10% normalnej)
- Niektórzy providerzy zwracają `cache_read_input_tokens`, które powinny być wyceniane inaczej
- Analityka może pokazać **cache hit rate** = `cached_tokens / prompt_tokens`

---

## Obliczanie kosztu

Koszty są liczone z **danych cenowych** synchronizowanych z LiteLLM (`src/lib/pricingSync.ts`):

| Model             | Input $/1M | Output $/1M | Cached $/1M |
| ----------------- | ---------- | ----------- | ----------- |
| gpt-5             | $2.50      | $10.00      | —           |
| claude-opus-4-6   | $15.00     | $75.00      | $1.50       |
| claude-sonnet-4-5 | $3.00      | $15.00      | $0.30       |
| gemini-2.5-pro    | $1.25      | $10.00      | —           |

Formuła kosztu (`src/lib/usage/costCalculator.ts`):

```ts
cost =
  (prompt_tokens - cached_tokens) * input_price +
  cached_tokens * cached_price +
  completion_tokens * output_price;
```

> **Dlaczego odejmować cached od prompt?** Część z cache ma osobną cenę; naliczanie input price na cały prompt zawyżyłoby koszt.

### Synchronizacja cen

Dane cenowe są automatycznie synchronizowane z LiteLLM przez endpoint `/api/pricing/sync` (uruchamiany wbudowanym zadaniem cron, nie przez env var widoczne dla użytkownika):

```bash
# Manual trigger
curl -X POST http://localhost:20128/api/pricing/sync
```

Dla modeli bez danych cenowych OmniRoute przechodzi na **szacowanie kosztu** wewnętrznymi średnimi stawkami (źródło: dane cenowe LiteLLM).

---

## Agregacja po zakresie dat

Moduł `usageAnalytics.ts` wylicza widgety dashboardu z surowych danych użycia. Obsługuje 7 zakresów czasu:

| Zakres   | Okno                                     | Zastosowanie                         |
| -------- | ---------------------------------------- | ------------------------------------ |
| `1d`     | Ostatnie 24 godziny                      | Wykrywanie skoków kosztu godzinowego |
| `7d`     | Ostatnie 7 dni                           | Przegląd tygodniowy                  |
| `30d`    | Ostatnie 30 dni                          | Rozliczenie miesięczne               |
| `90d`    | Ostatnie 90 dni                          | Analiza kwartalna                    |
| `ytd`    | Od 1 stycznia bieżącego roku             | Śledzenie budżetu rocznego           |
| `all`    | Cały okres                               | Statystyki lifetime                  |
| `custom` | Start/end zdefiniowane przez użytkownika | Audyty, zapytania ad-hoc             |

### Wyliczane widgety dashboardu

Dla dowolnego zakresu dat warstwa analityki wylicza:

| Widget                       | Opis                                                          |
| ---------------------------- | ------------------------------------------------------------- |
| **Karty podsumowania**       | Łączne żądania, łączny koszt, łączne tokeny, wskaźnik sukcesu |
| **Wykres trendu dziennego**  | Koszt + tokeny na dzień, warstwowo według modelu              |
| **Heatmapa aktywności**      | Siatka godzina-dnia × dzień-tygodnia, kolor = liczba żądań    |
| **Podział według modelu**    | Wykres kołowy kosztu według modelu                            |
| **Podział według providera** | Wykres słupkowy żądań według providera                        |
| **Top klucze API**           | Tabela top 10 kluczy według kosztu                            |
| **Analiza błędów**           | Wskaźnik błędów w czasie, top klasy błędów                    |

### Dostęp programistyczny

````ts
import { computeAnalytics } from "@/lib/usageAnalytics";

const analytics = await computeAnalytics(
  history,              // usage history records
  "7d",                 // time range: "1d" | "7d" | "30d" | "90d" | "ytd" | "all" | "custom"
  connectionMap,        // provider connection map (connectionId → account name)
  {
    startDate: "2025-01-01",  // optional: for "custom" range
    endDate: "2025-06-01",   // optional: for "custom" range
  }
);

console.log(analytics.summary.totalCost);   // 12.34 (cents)
console.log(analytics.byModel[0]);           // { model, cost, requests, promptTokens, completionTokens }

---

## Egzekwowanie limitów (quota)

Limit per klucz API jest egzekwowany w dwóch miejscach:

1. **Soft limit** (`quotaWarnAt`): ostrzeżenie na dashboardzie, gdy użycie przekroczy próg
2. **Hard limit** (`quotaLimit`): żądanie odrzucane z HTTP 429 po przekroczeniu

### Konfiguracja

```ts
// Per API key
await updateApiKey(keyId, {
  quotaWarnAt: 5_00,    // $5.00 — show warning
  quotaLimit: 10_00,    // $10.00 — hard stop
  quotaWindow: "month", // "day" | "week" | "month" | "all"
});
````

### Przepływ egzekwowania

```
Request ──▶ quotaCheck()
              │
              ├── Within limit?  ──▶ allow
              │
              └── Over limit?  ──▶ 429 Too Many Requests
                                   with Retry-After header
```

### Snapshoty limitów

Tabela `quotaSnapshots` przechowuje **historyczny stan limitów** do analizy trendów:

| Pole | Opis |
| ----------- | -------------------------------- | ------ | ------- |
| `apiKeyId` | Śledzony klucz |
| `window` | "day" | "week" | "month" |
| `used` | Zużyty koszt w tym oknie (centy) |
| `limit` | Limit (centy) |
| `resetAt` | Kiedy okno się resetuje |
| `createdAt` | Kiedy zrobiono snapshot |

Snapshoty są robione **przy każdym żądaniu** z kosztem > 0 i służą do:

- Renderowania paska postępu limitu na dashboardzie
- Pokazywania 30-dniowych wykresów trendu limitu
- Wyzwalania alertów, gdy użycie zbliża się do limitu

---

## REST API

### Lista rekordów użycia

```bash
GET /api/usage?range=7d&limit=100
GET /api/usage?apiKeyId=key-123&range=30d
GET /api/usage?provider=openai&range=1d
```

Odpowiedź:

```json
{
  "records": [
    {
      "id": "uuid",
      "apiKeyId": "key-123",
      "provider": "openai",
      "model": "gpt-5",
      "promptTokens": 1234,
      "completionTokens": 567,
      "totalTokens": 1801,
      "costUsd": 0.005,
      "latencyMs": 1234,
      "status": "success",
      "timestamp": "2026-06-08T12:00:00Z"
    }
  ],
  "total": 1234,
  "nextCursor": "..."
}
```

### Podsumowanie analityki

```bash
GET /api/usage/analytics?range=7d&groupBy=model
```

Odpowiedź:

```json
{
  "summary": {
    "totalCost": 12.34,
    "totalRequests": 5678,
    "totalTokens": 12345678,
    "successRate": 0.987,
    "avgLatencyMs": 1234
  },
  "models": [
    { "model": "gpt-5", "cost": 8.5, "requests": 1234, "tokens": 4567890 },
    { "model": "claude-opus-4-6", "cost": 3.84, "requests": 234, "tokens": 234567 }
  ],
  "daily": [
    { "date": "2026-06-01", "cost": 1.5, "requests": 800 },
    { "date": "2026-06-02", "cost": 2.0, "requests": 1000 }
  ]
}
```

### Zapytania o analitykę użycia

Dane użycia są dostępne przez dashboard lub narzędzia MCP, a nie przez bezpośrednie endpointy eksportu REST. Dostępna analityka:

- **`/api/usage/analytics`** — zagregowane metryki użycia (group by model, provider, key)
- **`/api/usage/quota`** — bieżący status limitu per klucz API
- **`/api/usage/history`** — logi historii żądań

---

## Narzędzia MCP

Dwa narzędzia MCP udostępniają dane użycia agentom (zob. `open-sse/mcp-server/tools/`):

| Narzędzie               | Opis                                            |
| ----------------------- | ----------------------------------------------- |
| `omniroute_cost_report` | Generuje raport kosztów per klucz za dany okres |
| `omniroute_check_quota` | Zwraca bieżący status limitu dla klucza API     |

Przykładowe wywołanie agenta:

```json
{
  "tool": "omniroute_cost_report",
  "args": { "period": "week" }
}
```

---

## Retencja i czyszczenie

Dane użycia rosną o ~1–10KB na żądanie. Przy skali może to być znaczące.

### Ustawienia retencji

Retencja historii użycia jest konfigurowana w Database Settings w UI albo przez `/api/settings/database`.

Domyślnie historia użycia jest przechowywana przez **90 dni**.

### Czyszczenie

Stare rekordy czyści `src/lib/db/cleanup.ts`:

- Uruchamiane przez proces cron w tle
- Usuwa rekordy z `usage_history` starsze niż skonfigurowane ustawienie retencji `usageHistory`

### Szacowanie magazynu

| Tempo żądań     | Magazyn 30 dni | Magazyn 90 dni |
| --------------- | -------------- | -------------- |
| 100 req/day     | ~3MB           | ~9MB           |
| 1,000 req/day   | ~30MB          | ~90MB          |
| 10,000 req/day  | ~300MB         | ~900MB         |
| 100,000 req/day | ~3GB           | ~9GB           |

Przy bardzo dużym ruchu rozważ:

- Skrócenie okresu retencji w Database Settings
- Użycie `aggregated_metrics` zamiast surowych rekordów (tylko do analityki)

---

## Wskazówki optymalizacji kosztów

### 1. Wybierz właściwy model

```bash
# Quick answer — use cheap + fast
curl -d '{"model":"auto/fast","messages":[...]}'

# Complex task — use quality
curl -d '{"model":"auto/smart","messages":[...]}'
```

### 2. Włącz cache

Anthropic prompt caching oszczędza **90% na powtarzanym kontekście**:

```ts
// The caching is automatic — just include the same large system prompt
const response = await openai.chat({
  model: "claude-sonnet-4-5",
  system: longSystemPrompt, // Will be cached automatically
  messages: [{ role: "user", content: "..." }],
});
```

### 3. Użyj kompresji

Kompresja RTK + Caveman oszczędza **15–95% w sesjach mocno opartych o tool**:

```ts
const config = {
  compression: {
    engine: "rtk",
    intensity: "aggressive",
  },
};
```

### 4. Ustaw limity per klucz

Zawsze ustawiaj `quotaLimit`, żeby uniknąć niekontrolowanych kosztów:

```ts
await updateApiKey(keyId, { quotaLimit: 10_00 }); // $10/month cap
```

### 5. Audytuj największych konsumentów

Użyj dashboardu lub **`/api/usage/analytics`**, żeby grupować po kluczu API i sortować według kosztu:

```bash
GET /api/usage/analytics?groupBy=apiKey
```

---

## Rozwiązywanie problemów

### „Koszt wyższy niż oczekiwano”

1. Sprawdź **`/api/usage/analytics?groupBy=model`** — znajdź drogi model
2. Sprawdź **`/api/usage/analytics?groupBy=apiKey`** — znajdź ciężkiego konsumenta
3. Zweryfikuj, że dane cenowe są aktualne: `POST /api/pricing/sync`

### „Brakuje rekordów”

- Sprawdź ustawienia retencji DB w Dashboard → Database → Cleanup — stare rekordy usuwa okresowe zadanie cleanup (`src/lib/db/cleanup.ts`)
- Sprawdź błędy w `src/lib/db/usage*.ts` — nieudane zapisy do DB są logowane, ale nie pokazywane na UI
- Upewnij się, że żądanie faktycznie dotarło do `chatCore` — sprawdź routing combo

### „Limit nie jest egzekwowany”

- Sprawdź ustawienie `quotaLimit` klucza
- Zweryfikuj, że `quotaWindow` jest ustawione poprawnie
- Szukaj rekordów `quotaSnapshots` — powinny powstawać przy każdym żądaniu

---

## Zobacz też

- [DATABASE_GUIDE.md](../ops/DATABASE_GUIDE.md) — schemat tabel użycia
- [ENVIRONMENT.md](../reference/ENVIRONMENT.md#18-pricing-sync) — zmienne env synchronizacji cen
- [AUTO-COMBO.md](../routing/AUTO-COMBO.md) — jak `auto/fast`, `auto/cheap` obniżają koszt
- [API_REFERENCE.md](../reference/API_REFERENCE.md) — pełna referencja `/api/usage/*`
- Źródło: `open-sse/services/usage.ts`, `src/lib/usageAnalytics.ts`, `src/lib/db/usage*.ts`
