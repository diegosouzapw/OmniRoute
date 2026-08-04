---
title: "Webhooki"
version: 3.8.40
lastUpdated: 2026-06-28
---

# Webhooki

> **Source of truth:** `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`, `src/app/api/webhooks/`
> **Last updated:** 2026-06-28 — v3.8.40

OmniRoute może wysyłać HTTP webhooki na zdarzenia platformy. Użyj ich do integracji ze
Slackiem, PagerDuty, Datadog, wewnętrznymi usługami alertowania lub dowolnym odbiornikiem HTTP.

Dispatcher podpisuje każdą dostawę HMAC-SHA256, ponawia próby przy przejściowych
błędach, śledzi stan dostaw per webhook i automatycznie wyłącza endpointy, które
nadal zawodzą.

## Obsługiwane zdarzenia

Typ `WebhookEvent` (`src/lib/webhookDispatcher.ts`) obecnie modeluje:

| Event                | Fires when                                                         |
| -------------------- | ------------------------------------------------------------------ |
| `request.completed`  | Proxy'owane żądanie kończy się pomyślnie                           |
| `request.failed`     | Proxy'owane żądanie kończy się błędem po wszystkich retry/fallback |
| `provider.error`     | Provider zwraca błąd kwalifikujący się do circuit-breaking         |
| `provider.recovered` | Wcześniej zawodzący provider wraca do stanu healthy                |
| `quota.exceeded`     | Klucz API przekracza próg budżetu/quota                            |
| `combo.switched`     | Strategia combo przełącza swój primary target                      |
| `test.ping`          | Syntetyczne zdarzenie używane przez endpoint testowy               |

Subskrypcje akceptują literał `"*"`, aby otrzymywać każde zdarzenie. Nieznane nazwy
zdarzeń w `events` są ignorowane w momencie dispatchu.

> Note: API dispatchera jest podpięte, ale produkcyjne call site'y dla części
> zdarzeń innych niż `test.ping` wciąż lądują. Sprawdź `grep dispatchEvent`, aby zobaczyć,
> które ścieżki aktualnie wywołują dispatcher w Twojej wersji.

## Architektura

```
Caller (handler, service, monitor)
  dispatchEvent(event, data)            [src/lib/webhookDispatcher.ts]
    -> getEnabledWebhooks()             [src/lib/db/webhooks.ts]
    -> filter by webhook.events
    -> for each match (in parallel):
       deliverWebhook(url, payload, secret)
         build payload { event, timestamp, data }
         sign body with HMAC-SHA256 (if secret present)
         POST with 10s timeout
         retry up to 3 times on 5xx / network error
       recordWebhookDelivery(id, status, success)
    -> disableWebhooksWithHighFailures(10)
```

Dispatch jest fire-and-forget dla wywołującego: `Promise.allSettled` połyka
błędy per webhook, więc jeden zły odbiornik nie może zablokować pozostałych.

## Podpis HMAC

Gdy webhook ma `secret`, OmniRoute podpisuje ciało JSON i wysyła:

```
Content-Type: application/json
User-Agent: OmniRoute-Webhook/1.0
X-Webhook-Event: <event>
X-Webhook-Timestamp: <ISO-8601>
X-Webhook-Signature: sha256=<hex HMAC-SHA256(secret, body)>
```

> Nazwy nagłówków używają prefiksu `X-Webhook-*` (nie `X-OmniRoute-*`). Wartość podpisu
> to `sha256=<hex>` — weryfikuj z pełnym prefiksem.

Jeśli `createWebhook` zostanie wywołane bez secreta, moduł DB generuje jeden
(`whsec_<48 hex>`), więc wszystkie webhooki są domyślnie podpisywane.

### Weryfikacja po stronie odbiornika

```typescript
import { createHmac, timingSafeEqual } from "node:crypto";

function verify(rawBody: string, signature: string, secret: string) {
  const expected = "sha256=" + createHmac("sha256", secret).update(rawBody).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}
```

Zawsze weryfikuj względem **surowego** ciała żądania, przed jakimkolwiek parsowaniem JSON.

## Polityka ponowień i awarii

`deliverWebhook(url, payload, secret, maxRetries = 3)`:

- Timeout 10 sekund na próbę (`AbortController`).
- HTTP 2xx liczy się jako sukces.
- HTTP 3xx/4xx liczy się jako nieponawialny status końcowy — zapisywany jako delivered
  z `success = res.ok`.
- Błędy HTTP 5xx i sieciowe są ponawiane z exponential backoff:
  `2^attempt * 1000 ms` (1s, 2s, 4s).
- Po `maxRetries` dostawa jest zapisywana jako failed.
- Każda dostawa aktualizuje `last_triggered_at`, `last_status` oraz resetuje
  albo inkrementuje `failure_count`.
- Dispatcher wywołuje `disableWebhooksWithHighFailures(10)` po każdym fan-oucie,
  więc każdy webhook z `failure_count >= 10` jest automatycznie wyłączany.

## Baza danych

Tabela `webhooks` (migracja `011_webhooks.sql`):

| Column              | Type    | Notes                                           |
| ------------------- | ------- | ----------------------------------------------- |
| `id`                | TEXT PK | UUID                                            |
| `url`               | TEXT    | Docelowy URL                                    |
| `events`            | TEXT    | Tablica JSON; domyślnie `["*"]`                 |
| `secret`            | TEXT    | Sekret HMAC (auto-generowany, jeśli nie podano) |
| `enabled`           | INT     | 0/1; domyślnie 1                                |
| `description`       | TEXT    | Opcjonalna etykieta czytelna dla człowieka      |
| `created_at`        | TEXT    | `datetime('now')`                               |
| `last_triggered_at` | TEXT    | Aktualizowane przy każdej próbie dostawy        |
| `last_status`       | INT     | Status HTTP ostatniej próby (0 = sieć)          |
| `failure_count`     | INT     | Reset do 0 przy sukcesie, +1 przy awarii        |

W obecnym schemacie **nie ma osobnej tabeli `webhook_deliveries`** —
historia dostaw jest agregowana w wierszu `webhooks`. Jeśli potrzebujesz pełnej historii
audytu, konsumuj zdarzenia w stylu `request.completed` / `audit` z downstreamowego
magazynu logów.

## REST API

Wszystkie endpointy wymagają management auth (`requireManagementAuth`).

| Endpoint                  | Method | Description                           |
| ------------------------- | ------ | ------------------------------------- |
| `/api/webhooks`           | GET    | Lista webhooków (secrety zamaskowane) |
| `/api/webhooks`           | POST   | Utwórz webhook                        |
| `/api/webhooks/[id]`      | GET    | Szczegóły webhooka (pełny secret)     |
| `/api/webhooks/[id]`      | PUT    | Aktualizuj pola                       |
| `/api/webhooks/[id]`      | DELETE | Usuń                                  |
| `/api/webhooks/[id]/test` | POST   | Wyślij `test.ping` (bez ponowień)     |

`GET /api/webhooks` maskuje secret do `<first 10 chars>...`, aby uniknąć wycieku
na stronach listingu. Użyj GET na `[id]`, gdy faktycznie potrzebujesz secreta.

### Tworzenie webhooka

```bash
curl -X POST http://localhost:20128/api/webhooks \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://hooks.slack.com/services/...",
    "secret": "whsec_my_shared_secret",
    "events": ["quota.exceeded", "provider.error"],
    "description": "Slack alerts"
  }'
```

Jeśli `secret` zostanie pominięty, serwer generuje secret `whsec_<hex>` i zwraca
go w odpowiedzi.

### Test webhooka

```bash
curl -X POST http://localhost:20128/api/webhooks/<id>/test \
  -H "Cookie: auth_token=..."
```

Zwraca `{ delivered, status, error }`. Nie są podejmowane ponowienia — przydatne do
szybkiego sprawdzenia, że odbiornik akceptuje payload i podpis.

## Dashboard

Strona dashboardu pod `/dashboard/webhooks` (zob.
`src/app/(dashboard)/dashboard/webhooks/page.tsx`) zapewnia:

- Tworzenie/edycję webhooków z pickerem zdarzeń
- Wskaźnik statusu (active / inactive / errored) na podstawie `enabled`,
  `failure_count` i `last_status`
- Testową dostawę jednym kliknięciem
- Ręczny przełącznik enable/disable

## Przykłady payloadów

### request.completed

```json
{
  "event": "request.completed",
  "timestamp": "2026-05-13T20:30:00.123Z",
  "data": {
    "trace_id": "...",
    "api_key_id": "...",
    "provider": "openai",
    "model": "gpt-5",
    "status": 200,
    "tokens_in": 142,
    "tokens_out": 350,
    "cost_usd": 0.0042
  }
}
```

### provider.error

```json
{
  "event": "provider.error",
  "timestamp": "2026-05-13T20:31:00.000Z",
  "data": {
    "provider": "anthropic",
    "status": 503,
    "consecutive_failures": 5,
    "circuit_state": "open"
  }
}
```

### test.ping

```json
{
  "event": "test.ping",
  "timestamp": "2026-05-13T20:32:00.000Z",
  "data": {
    "message": "Test webhook delivery from OmniRoute",
    "webhookId": "<uuid>"
  }
}
```

Kształty pól dla zdarzeń innych niż `test.ping` są definiowane przez call site'y, które je
emitują; traktuj obiekt `data` jako forward-compatible (dodawaj pola, nie polegaj na
ich braku).

## Dobre praktyki

- **Weryfikuj podpis przy każdej dostawie** względem surowego body — zapobiega
  sfałszowanym POST-om od kogokolwiek, kto odgadnie URL Twojego webhooka.
- **Odpowiadaj 2xx w ciągu ~5 sekund** — dispatcher ma timeout 10 s. Wolne
  odbiorniki będą zjadać ponowienia i zawyżać `failure_count`.
- **Rób handlery idempotentne** — ponowienia i semantyka at-least-once delivery
  oznaczają, że duplikaty są możliwe.
- **Subskrybuj minimalnie** — wymieniaj tylko zdarzenia, które faktycznie konsumujesz; `"*"`
  doda koszt na odbiornikach, których nie kontrolujesz.
- **Obserwuj `failure_count`** — endpointy są auto-wyłączane po 10 kolejnych
  awariach; zresetuj przez `PUT /api/webhooks/[id]` z `enabled: true`
  po naprawie odbiornika.
- **Rotuj secrety okresowo** — `PUT` nowy `secret`, wdróż nową wartość
  na odbiorniku i potwierdź przez endpoint testowy.

## Zobacz też

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — pełna powierzchnia management API
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — semantyka circuit breaker / cooldown
  napędzająca `provider.error` / `provider.recovered`
- Source: `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`
