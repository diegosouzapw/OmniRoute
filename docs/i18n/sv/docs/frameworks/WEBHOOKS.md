# Webhooks (Svenska)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/WEBHOOKS.md) · 🇪🇹 [am](../../../am/docs/frameworks/WEBHOOKS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/WEBHOOKS.md) · 🇦🇿 [az](../../../az/docs/frameworks/WEBHOOKS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/WEBHOOKS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/WEBHOOKS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/WEBHOOKS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/WEBHOOKS.md) · 🇩🇰 [da](../../../da/docs/frameworks/WEBHOOKS.md) · 🇩🇪 [de](../../../de/docs/frameworks/WEBHOOKS.md) · 🇬🇷 [el](../../../el/docs/frameworks/WEBHOOKS.md) · 🇪🇸 [es](../../../es/docs/frameworks/WEBHOOKS.md) · 🇪🇪 [et](../../../et/docs/frameworks/WEBHOOKS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/WEBHOOKS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/WEBHOOKS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/WEBHOOKS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/WEBHOOKS.md) · 🇮🇱 [he](../../../he/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/WEBHOOKS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/WEBHOOKS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/WEBHOOKS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/WEBHOOKS.md) · 🇮🇩 [id](../../../id/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/WEBHOOKS.md) · 🇮🇹 [it](../../../it/docs/frameworks/WEBHOOKS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/WEBHOOKS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/WEBHOOKS.md) · 🇰🇭 [km](../../../km/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/WEBHOOKS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/WEBHOOKS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/WEBHOOKS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/WEBHOOKS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/WEBHOOKS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/WEBHOOKS.md) · 🇲🇲 [my](../../../my/docs/frameworks/WEBHOOKS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/WEBHOOKS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/WEBHOOKS.md) · 🇳🇴 [no](../../../no/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [or](../../../or/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/WEBHOOKS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/WEBHOOKS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/WEBHOOKS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/WEBHOOKS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/WEBHOOKS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/WEBHOOKS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/WEBHOOKS.md) · 🇱🇰 [si](../../../si/docs/frameworks/WEBHOOKS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/WEBHOOKS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/WEBHOOKS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/WEBHOOKS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [te](../../../te/docs/frameworks/WEBHOOKS.md) · 🇹🇭 [th](../../../th/docs/frameworks/WEBHOOKS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/WEBHOOKS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/WEBHOOKS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/WEBHOOKS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/WEBHOOKS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/WEBHOOKS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/WEBHOOKS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/WEBHOOKS.md)

---

> **Sanningskälla:** `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`, `src/app/api/webhooks/`
> **Senast uppdaterad:** 2026-06-28 — v3.8.40

OmniRoute kan utlösa HTTP-webhooks vid plattformshändelser. Använd dem för att integrera med
Slack, PagerDuty, Datadog, interna aviseringstjänster eller valfri HTTP-mottagare.

Dispatcher-komponenten signerar varje leverans med HMAC-SHA256, försöker igen vid tillfälliga
fel, spårar leveransstatus per webhook och inaktiverar automatiskt slutpunkter som
fortsätter att misslyckas.

## Händelser som stöds

Typen `WebhookEvent` (`src/lib/webhooks/eventDescriptions.ts`, som används av `src/lib/webhookDispatcher.ts`) modellerar för närvarande exakt fyra händelser:

| Händelse            | Utlöses när                                                  |
| ------------------- | ------------------------------------------------------------ |
| `request.completed` | En proxad begäran slutförs framgångsrikt                     |
| `request.failed`    | En proxad begäran misslyckas efter alla omförsök/reservvägar |
| `quota.exceeded`    | En API-nyckel passerar ett budget-/kvottröskelvärde          |
| `test.ping`         | Syntetisk händelse som används av testslutpunkten            |

Prenumerationer accepterar literalen `"*"` för att ta emot alla händelser. Okända
händelsenamn i `events` ignoreras vid distribution.

> Obs! Dispatcher-API:t är inkopplat, men produktionsanrop för vissa av
> händelserna som inte är `test.ping` håller fortfarande på att införas. Kontrollera `grep dispatchEvent` för att se
> vilka kodvägar som för närvarande anropar dispatcher-komponenten i din version.

## Arkitektur

```
Anropare (hanterare, tjänst, övervakare)
  dispatchEvent(event, data)            [src/lib/webhookDispatcher.ts]
    -> getEnabledWebhooks()             [src/lib/db/webhooks.ts]
    -> filtrera efter webhook.events
    -> för varje träff (parallellt):
       deliverWebhook(url, payload, secret)
         skapa nyttolast { event, timestamp, data }
         signera brödtexten med HMAC-SHA256 (om secret finns)
         POST med 10 s tidsgräns
         försök igen upp till 3 gånger vid 5xx-/nätverksfel
       recordWebhookDelivery(id, status, success)
    -> disableWebhooksWithHighFailures(10)
```

Distributionen sker enligt principen starta-och-glöm för anroparen: `Promise.allSettled` sväljer
fel per webhook så att en felaktig mottagare inte kan blockera de andra.

## HMAC-signering

När en webhook har en `secret` signerar OmniRoute JSON-brödtexten och skickar:

```
Content-Type: application/json
User-Agent: OmniRoute-Webhook/1.0
X-Webhook-Event: <händelse>
X-Webhook-Timestamp: <ISO-8601>
X-Webhook-Signature: sha256=<hex HMAC-SHA256(secret, brödtext)>
```

> Rubriknamnen använder prefixet `X-Webhook-*` (inte `X-OmniRoute-*`). Signaturens
> värde är `sha256=<hex>` — verifiera hela prefixet.

Om `createWebhook` anropas utan en hemlighet genererar databasmodulen en
(`whsec_<48 hex>`) så att alla webhooks signeras som standard.

### Verifiering hos mottagaren

```typescript
import { createHmac, timingSafeEqual } from "node:crypto";

function verify(rawBody: string, signature: string, secret: string) {
  const expected = "sha256=" + createHmac("sha256", secret).update(rawBody).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}
```

Verifiera alltid mot den **råa** begärandetexten, innan någon JSON-tolkning görs.

## Policy för återförsök och fel

`deliverWebhook(url, payload, secret, maxRetries = 3)`:

- Tidsgräns på 10 sekunder per försök (`AbortController`).
- HTTP 2xx räknas som lyckat.
- HTTP 3xx/4xx räknas som en slutgiltig status som inte ger upphov till återförsök – registreras som levererad
  med `success = res.ok`.
- HTTP 5xx och nätverksfel leder till återförsök med exponentiell fördröjning:
  `2^attempt * 1000 ms` (1 s, 2 s, 4 s).
- Efter `maxRetries` registreras leveransen som misslyckad.
- Varje leverans uppdaterar `last_triggered_at`, `last_status` och antingen återställer
  eller ökar `failure_count`.
- Dispatcher-komponenten anropar `disableWebhooksWithHighFailures(10)` efter varje utskick,
  så alla webhooks med `failure_count >= 10` inaktiveras automatiskt.

## Databas

Tabellen `webhooks` (migrering `011_webhooks.sql`):

| Kolumn              | Typ     | Anmärkningar                                             |
| ------------------- | ------- | -------------------------------------------------------- |
| `id`                | TEXT PK | UUID                                                     |
| `url`               | TEXT    | Mål-URL                                                  |
| `events`            | TEXT    | JSON-array; standardvärde `["*"]`                        |
| `secret`            | TEXT    | HMAC-hemlighet (genereras automatiskt om den inte anges) |
| `enabled`           | INT     | 0/1; standardvärde 1                                     |
| `description`       | TEXT    | Valfri beskrivande etikett                               |
| `created_at`        | TEXT    | `datetime('now')`                                        |
| `last_triggered_at` | TEXT    | Uppdateras vid varje leveransförsök                      |
| `last_status`       | INT     | HTTP-status för det senaste försöket (0 = nätverk)       |
| `failure_count`     | INT     | Återställs till 0 vid framgång, +1 vid fel               |

Leveranshistorik sparas i den dedikerade tabellen `webhook_deliveries`
(migrering `069_webhook_deliveries.sql`, skrivs via
`src/lib/db/webhookDeliveries.ts::insertDelivery` vid varje försök), utöver
de aggregerade räknarna på raden i `webhooks`. Metadata för typ (Slack / Discord /
Telegram / anpassade nyttolasttransformerare) lades till av `070_webhooks_kind_metadata.sql`.

## REST API

Alla slutpunkter kräver hanteringsautentisering (`requireManagementAuth`).

| Slutpunkt                       | Metod  | Beskrivning                              |
| ------------------------------- | ------ | ---------------------------------------- |
| `/api/webhooks`                 | GET    | Lista webhooks (hemligheter maskerade)   |
| `/api/webhooks`                 | POST   | Skapa webhook                            |
| `/api/webhooks/[id]`            | GET    | Webhook-detaljer (fullständig hemlighet) |
| `/api/webhooks/[id]`            | PUT    | Uppdatera fält                           |
| `/api/webhooks/[id]`            | DELETE | Ta bort                                  |
| `/api/webhooks/[id]/test`       | POST   | Skicka en `test.ping` (inga återförsök)  |
| `/api/webhooks/[id]/deliveries` | GET    | Senaste leveransförsöken för en webhook  |
| `/api/webhooks/validate-url`    | POST   | Förhandsvalidering av URL (SSRF-skydd)   |

`GET /api/webhooks` maskerar hemligheten till `<de första 10 tecknen>...` för att undvika läckage
på listsidor. Använd GET för `[id]` när du faktiskt behöver hemligheten.

### Skapa webhook

```bash
curl -X POST http://localhost:20128/api/webhooks \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://hooks.slack.com/services/...",
    "secret": "whsec_my_shared_secret",
    "events": ["quota.exceeded", "request.failed"],
    "description": "Slack alerts"
  }'
```

Om `secret` utelämnas genererar servern en `whsec_<hex>`-hemlighet och returnerar
den i svaret.

### Testa webhook

```bash
curl -X POST http://localhost:20128/api/webhooks/<id>/test \
  -H "Cookie: auth_token=..."
```

Returnerar `{ delivered, status, error }`. Inga återförsök görs – användbart för
att snabbt verifiera att mottagaren accepterar nyttolasten och signaturen.

## Instrumentpanel

Instrumentpanelsidan på `/dashboard/webhooks` (se
`src/app/(dashboard)/dashboard/webhooks/page.tsx`) erbjuder:

- Skapa/redigera webhooks med en händelseväljare
- Statusindikator (aktiv/inaktiv/felaktig) baserad på `enabled`,
  `failure_count` och `last_status`
- Testleverans med ett klick
- Manuell växling mellan aktiverad och inaktiverad

## Exempel på nyttolaster

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
    "message": "Testleverans av webhook från OmniRoute",
    "webhookId": "<uuid>"
  }
}
```

Fältstrukturer för andra händelser än `test.ping` definieras av anropsställena som genererar
dem. Betrakta objektet `data` som framåtkompatibelt (lägg till fält, förlita dig inte på
att fält saknas).

## Bästa praxis

- **Verifiera signaturen för varje leverans** mot rådata i begäran – det förhindrar
  förfalskade POST-begäranden från personer som gissar din webhook-URL.
- **Svara med 2xx inom cirka 5 sekunder** – avsändaren har en tidsgräns på 10 s. Långsamma
  mottagare förbrukar omförsök och ökar `failure_count`.
- **Gör hanterare idempotenta** – omförsök och leveranssemantik med minst en leverans
  innebär att dubbletter kan förekomma.
- **Prenumerera minimalt** – ange endast händelser som du faktiskt använder. `"*"` medför
  extra kostnader för mottagare som du inte kontrollerar.
- **Övervaka `failure_count`** – slutpunkter inaktiveras automatiskt efter 10 på varandra följande
  fel. Återställ genom att anropa `PUT /api/webhooks/[id]` med `enabled: true`
  efter att mottagaren har åtgärdats.
- **Rotera hemligheter regelbundet** – skicka en ny `secret` med `PUT`, distribuera det nya värdet
  till mottagaren och bekräfta via testslutpunkten.

## Se även

- [API_REFERENCE.md](../reference/API_REFERENCE.md) – fullständig yta för hanterings-API:t
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) – semantik för kretsbrytare/nedkylning
  bakom leverantörsfel som exponeras via `request.failed`
- Källkod: `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`
