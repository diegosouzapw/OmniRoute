# Webhooks (Dansk)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/WEBHOOKS.md) · 🇪🇹 [am](../../../am/docs/frameworks/WEBHOOKS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/WEBHOOKS.md) · 🇦🇿 [az](../../../az/docs/frameworks/WEBHOOKS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/WEBHOOKS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/WEBHOOKS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/WEBHOOKS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/WEBHOOKS.md) · 🇩🇪 [de](../../../de/docs/frameworks/WEBHOOKS.md) · 🇬🇷 [el](../../../el/docs/frameworks/WEBHOOKS.md) · 🇪🇸 [es](../../../es/docs/frameworks/WEBHOOKS.md) · 🇪🇪 [et](../../../et/docs/frameworks/WEBHOOKS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/WEBHOOKS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/WEBHOOKS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/WEBHOOKS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/WEBHOOKS.md) · 🇮🇱 [he](../../../he/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/WEBHOOKS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/WEBHOOKS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/WEBHOOKS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/WEBHOOKS.md) · 🇮🇩 [id](../../../id/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/WEBHOOKS.md) · 🇮🇹 [it](../../../it/docs/frameworks/WEBHOOKS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/WEBHOOKS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/WEBHOOKS.md) · 🇰🇭 [km](../../../km/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/WEBHOOKS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/WEBHOOKS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/WEBHOOKS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/WEBHOOKS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/WEBHOOKS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/WEBHOOKS.md) · 🇲🇲 [my](../../../my/docs/frameworks/WEBHOOKS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/WEBHOOKS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/WEBHOOKS.md) · 🇳🇴 [no](../../../no/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [or](../../../or/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/WEBHOOKS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/WEBHOOKS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/WEBHOOKS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/WEBHOOKS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/WEBHOOKS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/WEBHOOKS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/WEBHOOKS.md) · 🇱🇰 [si](../../../si/docs/frameworks/WEBHOOKS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/WEBHOOKS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/WEBHOOKS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/WEBHOOKS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/WEBHOOKS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [te](../../../te/docs/frameworks/WEBHOOKS.md) · 🇹🇭 [th](../../../th/docs/frameworks/WEBHOOKS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/WEBHOOKS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/WEBHOOKS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/WEBHOOKS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/WEBHOOKS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/WEBHOOKS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/WEBHOOKS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/WEBHOOKS.md)

---

> **Sandhedskilde:** `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`, `src/app/api/webhooks/`
> **Senest opdateret:** 2026-06-28 — v3.8.40

OmniRoute kan udløse HTTP-webhooks ved platformshændelser. Brug dem til at integrere med
Slack, PagerDuty, Datadog, interne alarmeringstjenester eller enhver HTTP-modtager.

Dispatcheren signerer hver levering med HMAC-SHA256, forsøger igen ved midlertidige
fejl, sporer leveringstilstanden for hver webhook og deaktiverer automatisk endpoints,
der bliver ved med at fejle.

## Understøttede hændelser

Typen `WebhookEvent` (`src/lib/webhooks/eventDescriptions.ts`, anvendt af `src/lib/webhookDispatcher.ts`) modellerer i øjeblikket præcis fire hændelser:

| Hændelse            | Udløses, når                                               |
| ------------------- | ---------------------------------------------------------- |
| `request.completed` | En proxied anmodning fuldføres uden fejl                   |
| `request.failed`    | En proxied anmodning fejler efter alle genforsøg/fallbacks |
| `quota.exceeded`    | En API-nøgle overskrider en budget-/kvotegrænse            |
| `test.ping`         | Syntetisk hændelse, der bruges af test-endpointet          |

Abonnementer accepterer den bogstavelige værdi `"*"` for at modtage alle hændelser. Ukendte
hændelsesnavne i `events` ignoreres på dispatch-tidspunktet.

> Bemærk: Dispatcher-API'et er tilsluttet, men produktionskaldesteder for nogle af
> hændelserne ud over `test.ping` er stadig ved at blive implementeret. Kør `grep dispatchEvent` for at se,
> hvilke kodeveje der aktuelt kalder dispatcheren i din udgivelse.

## Arkitektur

```
Kalder (handler, tjeneste, monitor)
  dispatchEvent(event, data)            [src/lib/webhookDispatcher.ts]
    -> getEnabledWebhooks()             [src/lib/db/webhooks.ts]
    -> filtrer efter webhook.events
    -> for hvert match (parallelt):
       deliverWebhook(url, payload, secret)
         opbyg payload { event, timestamp, data }
         signer body med HMAC-SHA256 (hvis en secret er angivet)
         POST med 10 sekunders timeout
         forsøg igen op til 3 gange ved 5xx/netværksfejl
       recordWebhookDelivery(id, status, success)
    -> disableWebhooksWithHighFailures(10)
```

Dispatch er asynkront og uden afventning for kalderen: `Promise.allSettled` absorberer
fejl for individuelle webhooks, så én defekt modtager ikke kan blokere de andre.

## HMAC-signering

Når en webhook har en `secret`, signerer OmniRoute JSON-bodyen og sender:

```
Content-Type: application/json
User-Agent: OmniRoute-Webhook/1.0
X-Webhook-Event: <event>
X-Webhook-Timestamp: <ISO-8601>
X-Webhook-Signature: sha256=<hex HMAC-SHA256(secret, body)>
```

> Headernavnene bruger præfikset `X-Webhook-*` (ikke `X-OmniRoute-*`). Signaturværdien
> er `sha256=<hex>` — verificer hele præfikset.

Hvis `createWebhook` kaldes uden en secret, genererer DB-modulet en
(`whsec_<48 hex>`), så alle webhooks som standard er signerede.

### Verificering hos modtageren

```typescript
import { createHmac, timingSafeEqual } from "node:crypto";

function verify(rawBody: string, signature: string, secret: string) {
  const expected = "sha256=" + createHmac("sha256", secret).update(rawBody).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}
```

Verificer altid mod den **rå** request-body, før nogen JSON-parsing.

## Politik for nye forsøg og fejl

`deliverWebhook(url, payload, secret, maxRetries = 3)`:

- Timeout på 10 sekunder pr. forsøg (`AbortController`).
- HTTP 2xx regnes som en succes.
- HTTP 3xx/4xx regnes som en endelig status, der ikke forsøges igen — registreres som leveret
  med `success = res.ok`.
- HTTP 5xx og netværksfejl forsøges igen med eksponentiel ventetid:
  `2^attempt * 1000 ms` (1s, 2s, 4s).
- Efter `maxRetries` registreres leveringen som mislykket.
- Hver levering opdaterer `last_triggered_at`, `last_status` og enten nulstiller
  eller øger `failure_count`.
- Dispatcher-funktionen kalder `disableWebhooksWithHighFailures(10)` efter hver fan-out,
  så enhver webhook med `failure_count >= 10` automatisk deaktiveres.

## Database

Tabellen `webhooks` (migrering `011_webhooks.sql`):

| Kolonne             | Type    | Bemærkninger                                     |
| ------------------- | ------- | ------------------------------------------------ |
| `id`                | TEXT PK | UUID                                             |
| `url`               | TEXT    | Destinations-URL                                 |
| `events`            | TEXT    | JSON-array; standardværdi `["*"]`                |
| `secret`            | TEXT    | HMAC-hemmelighed (autogenereres, hvis udeladt)   |
| `enabled`           | INT     | 0/1; standardværdi er 1                          |
| `description`       | TEXT    | Valgfri læsbar etiket                            |
| `created_at`        | TEXT    | `datetime('now')`                                |
| `last_triggered_at` | TEXT    | Opdateres ved hvert leveringsforsøg              |
| `last_status`       | INT     | HTTP-status for det seneste forsøg (0 = netværk) |
| `failure_count`     | INT     | Nulstilles til 0 ved succes, +1 ved fejl         |

Leveringshistorik gemmes i den dedikerede tabel `webhook_deliveries`
(migrering `069_webhook_deliveries.sql`, skrevet via
`src/lib/db/webhookDeliveries.ts::insertDelivery` ved hvert forsøg) ud over
de samlede tællere i rækken i `webhooks`. Metadata om type (Slack / Discord /
Telegram / brugerdefinerede payload-transformatorer) blev tilføjet af `070_webhooks_kind_metadata.sql`.

## REST-API

Alle endpoints kræver administrationsgodkendelse (`requireManagementAuth`).

| Endpoint                        | Metode | Beskrivelse                                  |
| ------------------------------- | ------ | -------------------------------------------- |
| `/api/webhooks`                 | GET    | Vis webhooks (hemmeligheder maskeret)        |
| `/api/webhooks`                 | POST   | Opret webhook                                |
| `/api/webhooks/[id]`            | GET    | Webhookdetaljer (fuld hemmelighed)           |
| `/api/webhooks/[id]`            | PUT    | Opdater felter                               |
| `/api/webhooks/[id]`            | DELETE | Fjern                                        |
| `/api/webhooks/[id]/test`       | POST   | Udløs en `test.ping` (ingen nye forsøg)      |
| `/api/webhooks/[id]/deliveries` | GET    | Seneste leveringsforsøg for én webhook       |
| `/api/webhooks/validate-url`    | POST   | Forhåndsvalidering af URL (SSRF-beskyttelse) |

`GET /api/webhooks` maskerer hemmeligheden som `<første 10 tegn>...` for at undgå lækage
på listesider. Brug GET for `[id]`, når du faktisk har brug for hemmeligheden.

### Opret webhook

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

Hvis `secret` udelades, genererer serveren en `whsec_<hex>`-hemmelighed og returnerer
den i svaret.

### Test webhook

```bash
curl -X POST http://localhost:20128/api/webhooks/<id>/test \
  -H "Cookie: auth_token=..."
```

Returnerer `{ delivered, status, error }`. Der foretages ingen nye forsøg — nyttigt til
hurtigt at validere, at modtageren accepterer payloaden og signaturen.

## Dashboard

Dashboardsiden på `/dashboard/webhooks` (se
`src/app/(dashboard)/dashboard/webhooks/page.tsx`) giver mulighed for:

- At oprette/redigere webhooks med en hændelsesvælger
- Statusindikator (aktiv/inaktiv/fejlramt) baseret på `enabled`,
  `failure_count` og `last_status`
- Testlevering med ét klik
- Manuel aktivering/deaktivering

## Eksempler på payloads

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
    "message": "Test-webhooklevering fra OmniRoute",
    "webhookId": "<uuid>"
  }
}
```

Feltstrukturerne for andre hændelser end `test.ping` defineres af de kaldesteder, der udsender
dem. Betragt `data`-objektet som fremadkompatibelt (tilføj felter, og vær ikke afhængig af,
at felter mangler).

## Bedste praksis

- **Verificer signaturen ved hver levering** mod den rå body — det forhindrer
  forfalskede POST-anmodninger fra personer, der gætter din webhook-URL.
- **Svar med 2xx inden for ~5 sekunder** — dispatcheren får timeout efter 10 sek. Langsomme
  modtagere opbruger genforsøg og øger `failure_count`.
- **Gør handlers idempotente** — genforsøg og leveringssemantik med mindst én
  levering betyder, at dubletter kan forekomme.
- **Abonner minimalt** — angiv kun hændelser, du faktisk bruger; `"*"` vil
  medføre omkostninger for modtagere, du ikke kontrollerer.
- **Overvåg `failure_count`** — endpoints deaktiveres automatisk efter 10 på hinanden følgende
  fejl. Nulstil ved at kalde `PUT /api/webhooks/[id]` med `enabled: true`,
  efter at modtageren er blevet rettet.
- **Rotér secrets regelmæssigt** — send den nye `secret` via `PUT`, udrul den nye værdi
  til modtageren, og bekræft via test-endpointet.

## Se også

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — komplet overflade for administrations-API'et
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — circuit breaker-/cooldown-
  semantik bag providerfejl, der vises via `request.failed`
- Kilde: `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`
