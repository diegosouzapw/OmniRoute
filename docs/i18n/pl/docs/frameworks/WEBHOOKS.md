# Webhooks (Polski)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/WEBHOOKS.md) · 🇪🇹 [am](../../../am/docs/frameworks/WEBHOOKS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/WEBHOOKS.md) · 🇦🇿 [az](../../../az/docs/frameworks/WEBHOOKS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/WEBHOOKS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/WEBHOOKS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/WEBHOOKS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/WEBHOOKS.md) · 🇩🇰 [da](../../../da/docs/frameworks/WEBHOOKS.md) · 🇩🇪 [de](../../../de/docs/frameworks/WEBHOOKS.md) · 🇬🇷 [el](../../../el/docs/frameworks/WEBHOOKS.md) · 🇪🇸 [es](../../../es/docs/frameworks/WEBHOOKS.md) · 🇪🇪 [et](../../../et/docs/frameworks/WEBHOOKS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/WEBHOOKS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/WEBHOOKS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/WEBHOOKS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/WEBHOOKS.md) · 🇮🇱 [he](../../../he/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/WEBHOOKS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/WEBHOOKS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/WEBHOOKS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/WEBHOOKS.md) · 🇮🇩 [id](../../../id/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/WEBHOOKS.md) · 🇮🇹 [it](../../../it/docs/frameworks/WEBHOOKS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/WEBHOOKS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/WEBHOOKS.md) · 🇰🇭 [km](../../../km/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/WEBHOOKS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/WEBHOOKS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/WEBHOOKS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/WEBHOOKS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/WEBHOOKS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/WEBHOOKS.md) · 🇲🇲 [my](../../../my/docs/frameworks/WEBHOOKS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/WEBHOOKS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/WEBHOOKS.md) · 🇳🇴 [no](../../../no/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [or](../../../or/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/WEBHOOKS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/WEBHOOKS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/WEBHOOKS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/WEBHOOKS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/WEBHOOKS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/WEBHOOKS.md) · 🇱🇰 [si](../../../si/docs/frameworks/WEBHOOKS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/WEBHOOKS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/WEBHOOKS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/WEBHOOKS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/WEBHOOKS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [te](../../../te/docs/frameworks/WEBHOOKS.md) · 🇹🇭 [th](../../../th/docs/frameworks/WEBHOOKS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/WEBHOOKS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/WEBHOOKS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/WEBHOOKS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/WEBHOOKS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/WEBHOOKS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/WEBHOOKS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/WEBHOOKS.md)

---

> **Źródło prawdy:** `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`, `src/app/api/webhooks/`
> **Ostatnia aktualizacja:** 2026-06-28 — v3.8.40

OmniRoute może wywoływać webhooki HTTP w odpowiedzi na zdarzenia platformy. Używaj ich do integracji ze
Slackiem, PagerDuty, Datadogiem, wewnętrznymi usługami alertów lub dowolnym odbiornikiem HTTP.

Dyspozytor podpisuje każde żądanie za pomocą HMAC-SHA256, ponawia je w przypadku
przejściowych błędów, śledzi stan dostarczania dla każdego webhooka i automatycznie wyłącza punkty końcowe,
które stale zgłaszają błędy.

## Obsługiwane zdarzenia

Typ `WebhookEvent` (`src/lib/webhooks/eventDescriptions.ts`, używany przez `src/lib/webhookDispatcher.ts`) modeluje obecnie dokładnie cztery zdarzenia:

| Zdarzenie           | Kiedy jest wyzwalane                                                                         |
| ------------------- | -------------------------------------------------------------------------------------------- |
| `request.completed` | Żądanie proxy kończy się powodzeniem                                                         |
| `request.failed`    | Żądanie proxy kończy się niepowodzeniem po wszystkich ponowieniach/przełączeniach awaryjnych |
| `quota.exceeded`    | Klucz API przekracza próg budżetu/limitu                                                     |
| `test.ping`         | Zdarzenie syntetyczne używane przez testowy punkt końcowy                                    |

Subskrypcje akceptują literał `"*"`, aby odbierać każde zdarzenie. Nieznane nazwy
zdarzeń w `events` są ignorowane podczas wysyłania.

> Uwaga: interfejs API dyspozytora jest podłączony, ale produkcyjne miejsca wywołań dla niektórych
> zdarzeń innych niż `test.ping` są nadal wdrażane. Sprawdź `grep dispatchEvent`, aby zobaczyć,
> które ścieżki obecnie wywołują dyspozytor w Twojej wersji.

## Architektura

```
Wywołujący (procedura obsługi, usługa, monitor)
  dispatchEvent(event, data)            [src/lib/webhookDispatcher.ts]
    -> getEnabledWebhooks()             [src/lib/db/webhooks.ts]
    -> filtrowanie według webhook.events
    -> dla każdego dopasowania (równolegle):
       deliverWebhook(url, payload, secret)
         utworzenie ładunku { event, timestamp, data }
         podpisanie treści za pomocą HMAC-SHA256 (jeśli podano sekret)
         POST z limitem czasu 10 s
         maksymalnie 3 ponowienia w przypadku błędu 5xx / błędu sieciowego
       recordWebhookDelivery(id, status, success)
    -> disableWebhooksWithHighFailures(10)
```

Wysyłanie działa dla wywołującego na zasadzie „wyślij i zapomnij”: `Promise.allSettled` przechwytuje
błędy poszczególnych webhooków, dzięki czemu jeden wadliwy odbiornik nie może blokować pozostałych.

## Podpisywanie HMAC

Gdy webhook ma `secret`, OmniRoute podpisuje treść JSON i wysyła:

```
Content-Type: application/json
User-Agent: OmniRoute-Webhook/1.0
X-Webhook-Event: <event>
X-Webhook-Timestamp: <ISO-8601>
X-Webhook-Signature: sha256=<hex HMAC-SHA256(secret, body)>
```

> Nazwy nagłówków używają prefiksu `X-Webhook-*` (a nie `X-OmniRoute-*`). Wartość podpisu
> ma postać `sha256=<hex>` — zweryfikuj ją wraz z pełnym prefiksem.

Jeśli funkcja `createWebhook` zostanie wywołana bez sekretu, moduł bazy danych wygeneruje go
(`whsec_<48 hex>`), dlatego wszystkie webhooki są domyślnie podpisywane.

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

Zawsze przeprowadzaj weryfikację względem **surowej** treści żądania, przed jej przetworzeniem jako JSON.

## Zasady ponawiania i obsługi błędów

`deliverWebhook(url, payload, secret, maxRetries = 3)`:

- Limit czasu każdej próby wynosi 10 sekund (`AbortController`).
- Kod HTTP 2xx jest uznawany za sukces.
- Kod HTTP 3xx/4xx jest uznawany za niepodlegający ponowieniu status końcowy — dostarczenie jest rejestrowane
  z wartością `success = res.ok`.
- W przypadku kodów HTTP 5xx i błędów sieciowych próby są ponawiane z wykładniczo rosnącym opóźnieniem:
  `2^attempt * 1000 ms` (1 s, 2 s, 4 s).
- Po `maxRetries` dostarczenie jest rejestrowane jako nieudane.
- Każde dostarczenie aktualizuje `last_triggered_at`, `last_status` oraz odpowiednio zeruje
  lub zwiększa `failure_count`.
- Po każdym rozesłaniu dyspozytor wywołuje `disableWebhooksWithHighFailures(10)`,
  dlatego każdy webhook z `failure_count >= 10` jest automatycznie wyłączany.

## Baza danych

Tabela `webhooks` (migracja `011_webhooks.sql`):

| Kolumna             | Typ     | Uwagi                                                       |
| ------------------- | ------- | ----------------------------------------------------------- |
| `id`                | TEXT PK | UUID                                                        |
| `url`               | TEXT    | Docelowy URL                                                |
| `events`            | TEXT    | Tablica JSON; domyślnie `["*"]`                             |
| `secret`            | TEXT    | Sekret HMAC (generowany automatycznie, jeśli go nie podano) |
| `enabled`           | INT     | 0/1; domyślnie 1                                            |
| `description`       | TEXT    | Opcjonalna etykieta czytelna dla użytkownika                |
| `created_at`        | TEXT    | `datetime('now')`                                           |
| `last_triggered_at` | TEXT    | Aktualizowane przy każdej próbie dostarczenia               |
| `last_status`       | INT     | Status HTTP ostatniej próby (0 = błąd sieciowy)             |
| `failure_count`     | INT     | Zerowane po sukcesie, +1 po niepowodzeniu                   |

Historia dostarczeń jest utrwalana w dedykowanej tabeli `webhook_deliveries`
(migracja `069_webhook_deliveries.sql`, zapisywana przy każdej próbie za pośrednictwem
`src/lib/db/webhookDeliveries.ts::insertDelivery`), niezależnie od zagregowanych
liczników w wierszu `webhooks`. Metadane rodzaju (Slack / Discord /
Telegram / niestandardowe transformatory ładunku) zostały dodane przez `070_webhooks_kind_metadata.sql`.

## REST API

Wszystkie punkty końcowe wymagają uwierzytelniania zarządzającego (`requireManagementAuth`).

| Punkt końcowy                   | Metoda | Opis                                             |
| ------------------------------- | ------ | ------------------------------------------------ |
| `/api/webhooks`                 | GET    | Lista webhooków (sekrety zamaskowane)            |
| `/api/webhooks`                 | POST   | Utworzenie webhooka                              |
| `/api/webhooks/[id]`            | GET    | Szczegóły webhooka (pełny sekret)                |
| `/api/webhooks/[id]`            | PUT    | Aktualizacja pól                                 |
| `/api/webhooks/[id]`            | DELETE | Usunięcie                                        |
| `/api/webhooks/[id]/test`       | POST   | Wysłanie `test.ping` (bez ponownych prób)        |
| `/api/webhooks/[id]/deliveries` | GET    | Ostatnie próby dostarczenia dla jednego webhooka |
| `/api/webhooks/validate-url`    | POST   | Wstępna walidacja URL-a (ochrona przed SSRF)     |

`GET /api/webhooks` maskuje sekret do postaci `<pierwsze 10 znaków>...`, aby zapobiec jego
ujawnieniu na stronach z listami. Gdy rzeczywiście potrzebujesz sekretu, użyj żądania GET dla `[id]`.

### Tworzenie webhooka

```bash
curl -X POST http://localhost:20128/api/webhooks \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://hooks.slack.com/services/...",
    "secret": "whsec_my_shared_secret",
    "events": ["quota.exceeded", "request.failed"],
    "description": "Alerty Slack"
  }'
```

Jeśli `secret` zostanie pominięty, serwer wygeneruje sekret `whsec_<hex>` i zwróci
go w odpowiedzi.

### Testowanie webhooka

```bash
curl -X POST http://localhost:20128/api/webhooks/<id>/test \
  -H "Cookie: auth_token=..."
```

Zwraca `{ delivered, status, error }`. Ponowne próby nie są podejmowane — jest to przydatne do
szybkiego sprawdzenia, czy odbiorca akceptuje ładunek i podpis.

## Panel

Strona panelu pod adresem `/dashboard/webhooks` (zobacz
`src/app/(dashboard)/dashboard/webhooks/page.tsx`) umożliwia:

- Tworzenie/edytowanie webhooków z selektorem zdarzeń
- Wyświetlanie wskaźnika stanu (aktywny / nieaktywny / z błędem) na podstawie `enabled`,
  `failure_count` i `last_status`
- Wysyłanie testowe jednym kliknięciem
- Ręczne włączanie/wyłączanie

## Przykłady ładunków

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

### test.ping

```json
{
  "event": "test.ping",
  "timestamp": "2026-05-13T20:32:00.000Z",
  "data": {
    "message": "Testowe wysłanie webhooka z OmniRoute",
    "webhookId": "<uuid>"
  }
}
```

Struktury pól dla zdarzeń innych niż `test.ping` są definiowane przez miejsca wywołań, które je
emitują; obiekt `data` należy traktować jako zgodny z przyszłymi wersjami (można dodawać pola, nie należy polegać na
ich braku).

## Najlepsze praktyki

- **Weryfikuj podpis przy każdym wysłaniu** względem nieprzetworzonej treści żądania — zapobiega to
  fałszywym żądaniom POST od każdego, kto odgadnie adres URL webhooka.
- **Odpowiadaj kodem 2xx w ciągu około 5 sekund** — limit czasu dyspozytora wynosi 10 s. Powolne
  odbiorniki będą zużywać ponowne próby i zwiększać `failure_count`.
- **Zapewnij idempotentność procedur obsługi** — ponowne próby i semantyka dostarczania co najmniej raz
  oznaczają, że mogą wystąpić duplikaty.
- **Subskrybuj tylko niezbędne zdarzenia** — wymieniaj wyłącznie zdarzenia, które rzeczywiście obsługujesz; `"*"` zwiększy
  obciążenie odbiorników, których nie kontrolujesz.
- **Monitoruj `failure_count`** — punkty końcowe są automatycznie wyłączane po 10 kolejnych
  niepowodzeniach; po naprawieniu odbiornika zresetuj licznik, wywołując `PUT /api/webhooks/[id]` z `enabled: true`.
- **Okresowo zmieniaj sekrety** — ustaw nowy `secret` za pomocą `PUT`, wdróż nową wartość
  po stronie odbiornika i potwierdź jej działanie za pomocą testowego punktu końcowego.

## Zobacz także

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — pełny zakres interfejsu API do zarządzania
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — semantyka mechanizmu circuit breaker / okresu wyciszenia
  dla błędów dostawców ujawnianych przez `request.failed`
- Źródło: `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`
