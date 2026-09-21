# Webhooks (Filipino)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/WEBHOOKS.md) · 🇪🇹 [am](../../../am/docs/frameworks/WEBHOOKS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/WEBHOOKS.md) · 🇦🇿 [az](../../../az/docs/frameworks/WEBHOOKS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/WEBHOOKS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/WEBHOOKS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/WEBHOOKS.md) · 🇩🇰 [da](../../../da/docs/frameworks/WEBHOOKS.md) · 🇩🇪 [de](../../../de/docs/frameworks/WEBHOOKS.md) · 🇬🇷 [el](../../../el/docs/frameworks/WEBHOOKS.md) · 🇪🇸 [es](../../../es/docs/frameworks/WEBHOOKS.md) · 🇪🇪 [et](../../../et/docs/frameworks/WEBHOOKS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/WEBHOOKS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/WEBHOOKS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/WEBHOOKS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/WEBHOOKS.md) · 🇮🇱 [he](../../../he/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/WEBHOOKS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/WEBHOOKS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/WEBHOOKS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/WEBHOOKS.md) · 🇮🇩 [id](../../../id/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/WEBHOOKS.md) · 🇮🇹 [it](../../../it/docs/frameworks/WEBHOOKS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/WEBHOOKS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/WEBHOOKS.md) · 🇰🇭 [km](../../../km/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/WEBHOOKS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/WEBHOOKS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/WEBHOOKS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/WEBHOOKS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/WEBHOOKS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/WEBHOOKS.md) · 🇲🇲 [my](../../../my/docs/frameworks/WEBHOOKS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/WEBHOOKS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/WEBHOOKS.md) · 🇳🇴 [no](../../../no/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [or](../../../or/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/WEBHOOKS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/WEBHOOKS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/WEBHOOKS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/WEBHOOKS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/WEBHOOKS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/WEBHOOKS.md) · 🇱🇰 [si](../../../si/docs/frameworks/WEBHOOKS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/WEBHOOKS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/WEBHOOKS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/WEBHOOKS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/WEBHOOKS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [te](../../../te/docs/frameworks/WEBHOOKS.md) · 🇹🇭 [th](../../../th/docs/frameworks/WEBHOOKS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/WEBHOOKS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/WEBHOOKS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/WEBHOOKS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/WEBHOOKS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/WEBHOOKS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/WEBHOOKS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/WEBHOOKS.md)

---

> **Pinagmumulan ng katotohanan:** `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`, `src/app/api/webhooks/`
> **Huling na-update:** 2026-06-28 — v3.8.40

Maaaring magpadala ang OmniRoute ng mga HTTP webhook kapag may mga event sa platform. Gamitin ang mga ito upang mag-integrate sa
Slack, PagerDuty, Datadog, mga internal na serbisyo sa pag-alerto, o anumang HTTP receiver.

Nilalagdaan ng dispatcher ang bawat delivery gamit ang HMAC-SHA256, muling sinusubukan kapag may mga pansamantalang
pagkabigo, sinusubaybayan ang kalagayan ng delivery ng bawat webhook, at awtomatikong dini-disable ang mga endpoint na
patuloy na nabibigo.

## Mga Sinusuportahang Event

Ang uri na `WebhookEvent` (`src/lib/webhooks/eventDescriptions.ts`, na ginagamit ng `src/lib/webhookDispatcher.ts`) ay kasalukuyang nagmomodelo ng eksaktong apat na event:

| Event               | Nati-trigger kapag                                                     |
| ------------------- | ---------------------------------------------------------------------- |
| `request.completed` | Matagumpay na nakumpleto ang isang proxied request                     |
| `request.failed`    | Nabigo ang isang proxied request pagkatapos ng lahat ng retry/fallback |
| `quota.exceeded`    | Lumampas ang isang API key sa threshold ng budget/quota                |
| `test.ping`         | Sintetikong event na ginagamit ng test endpoint                        |

Tinatanggap ng mga subscription ang literal na `"*"` upang matanggap ang bawat event. Ang mga hindi kilalang pangalan ng event
sa `events` ay binabalewala sa oras ng dispatch.

> Tandaan: nakakonekta na ang dispatcher API, ngunit ipinapatupad pa rin ang mga production call site para sa ilan sa mga
> event na hindi `test.ping`. Suriin ang `grep dispatchEvent` upang makita
> kung aling mga path ang kasalukuyang tumatawag sa dispatcher sa iyong release.

## Arkitektura

```
Tumatawag (handler, serbisyo, monitor)
  dispatchEvent(event, data)            [src/lib/webhookDispatcher.ts]
    -> getEnabledWebhooks()             [src/lib/db/webhooks.ts]
    -> salain ayon sa webhook.events
    -> para sa bawat tugma (nang magkaparallel):
       deliverWebhook(url, payload, secret)
         buuin ang payload { event, timestamp, data }
         lagdaan ang body gamit ang HMAC-SHA256 (kung may secret)
         POST na may 10s timeout
         subukang muli nang hanggang 3 beses kapag may 5xx / network error
       recordWebhookDelivery(id, status, success)
    -> disableWebhooksWithHighFailures(10)
```

Ang dispatch ay fire-and-forget para sa tumatawag: nilulunok ng `Promise.allSettled` ang
mga error ng bawat webhook upang hindi ma-block ng isang may problemang receiver ang iba.

## Paglagda gamit ang HMAC

Kapag may `secret` ang isang webhook, nilalagdaan ng OmniRoute ang JSON body at ipinapadala ang:

```
Content-Type: application/json
User-Agent: OmniRoute-Webhook/1.0
X-Webhook-Event: <event>
X-Webhook-Timestamp: <ISO-8601>
X-Webhook-Signature: sha256=<hex HMAC-SHA256(secret, body)>
```

> Ginagamit ng mga pangalan ng header ang prefix na `X-Webhook-*` (hindi `X-OmniRoute-*`). Ang value ng signature
> ay `sha256=<hex>` — i-verify ang buong prefix.

Kung tinawag ang `createWebhook` nang walang secret, bubuo ang DB module ng isa
(`whsec_<48 hex>`) kaya nilalagdaan bilang default ang lahat ng webhook.

### Pag-verify sa receiver

```typescript
import { createHmac, timingSafeEqual } from "node:crypto";

function verify(rawBody: string, signature: string, secret: string) {
  const expected = "sha256=" + createHmac("sha256", secret).update(rawBody).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}
```

Palaging mag-verify gamit ang **raw** na request body bago magsagawa ng anumang JSON parsing.

## Patakaran sa Muling Pagsubok at Pagkabigo

`deliverWebhook(url, payload, secret, maxRetries = 3)`:

- 10 segundong timeout sa bawat pagtatangka (`AbortController`).
- Itinuturing na matagumpay ang HTTP 2xx.
- Itinuturing ang HTTP 3xx/4xx bilang pinal na status na hindi na muling susubukan — itinatala bilang naihatid
  na may `success = res.ok`.
- Muling sinusubukan ang HTTP 5xx at mga error sa network gamit ang exponential backoff:
  `2^attempt * 1000 ms` (1s, 2s, 4s).
- Pagkatapos ng `maxRetries`, itinatala ang paghahatid bilang nabigo.
- Ina-update ng bawat paghahatid ang `last_triggered_at`, `last_status`, at nire-reset
  o dinaragdagan ang `failure_count`.
- Tinatawag ng dispatcher ang `disableWebhooksWithHighFailures(10)` pagkatapos ng bawat fan-out,
  kaya awtomatikong dini-disable ang anumang webhook na may `failure_count >= 10`.

## Database

Talahanayang `webhooks` (migration `011_webhooks.sql`):

| Column              | Type    | Notes                                                  |
| ------------------- | ------- | ------------------------------------------------------ |
| `id`                | TEXT PK | UUID                                                   |
| `url`               | TEXT    | Patutunguhang URL                                      |
| `events`            | TEXT    | JSON array; default na `["*"]`                         |
| `secret`            | TEXT    | HMAC secret (awtomatikong binubuo kung hindi ibinigay) |
| `enabled`           | INT     | 0/1; default na 1                                      |
| `description`       | TEXT    | Opsyonal na label na madaling maunawaan ng tao         |
| `created_at`        | TEXT    | `datetime('now')`                                      |
| `last_triggered_at` | TEXT    | Ina-update sa bawat pagtatangka ng paghahatid          |
| `last_status`       | INT     | HTTP status ng huling pagtatangka (0 = network)        |
| `failure_count`     | INT     | Nire-reset sa 0 kapag matagumpay, +1 kapag nabigo      |

Nakaimbak ang kasaysayan ng paghahatid sa nakalaang talahanayang `webhook_deliveries`
(migration `069_webhook_deliveries.sql`, isinusulat sa pamamagitan ng
`src/lib/db/webhookDeliveries.ts::insertDelivery` sa bawat pagtatangka), bukod pa
sa pinagsama-samang mga counter sa row ng `webhooks`. Ang metadata ng uri (Slack / Discord /
Telegram / mga custom na transformer ng payload) ay idinagdag ng `070_webhooks_kind_metadata.sql`.

## REST API

Nangangailangan ang lahat ng endpoint ng management auth (`requireManagementAuth`).

| Endpoint                        | Method | Description                                                     |
| ------------------------------- | ------ | --------------------------------------------------------------- |
| `/api/webhooks`                 | GET    | Ilista ang mga webhook (nakatago ang mga secret)                |
| `/api/webhooks`                 | POST   | Gumawa ng webhook                                               |
| `/api/webhooks/[id]`            | GET    | Mga detalye ng webhook (buong secret)                           |
| `/api/webhooks/[id]`            | PUT    | I-update ang mga field                                          |
| `/api/webhooks/[id]`            | DELETE | Alisin                                                          |
| `/api/webhooks/[id]/test`       | POST   | Magpadala ng `test.ping` (walang muling pagsubok)               |
| `/api/webhooks/[id]/deliveries` | GET    | Mga kamakailang pagtatangka ng paghahatid para sa isang webhook |
| `/api/webhooks/validate-url`    | POST   | Paunang pagpapatunay ng URL (proteksiyon laban sa SSRF)         |

Itinatago ng `GET /api/webhooks` ang secret bilang `<unang 10 character>...` upang maiwasan ang paglantad nito
sa mga pahina ng listahan. Gamitin ang `[id]` GET kapag talagang kailangan mo ang secret.

### Gumawa ng webhook

```bash
curl -X POST http://localhost:20128/api/webhooks \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://hooks.slack.com/services/...",
    "secret": "whsec_my_shared_secret",
    "events": ["quota.exceeded", "request.failed"],
    "description": "Mga alerto sa Slack"
  }'
```

Kung hindi isinama ang `secret`, bubuo ang server ng `whsec_<hex>` na secret at ibabalik
ito sa response.

### Subukan ang webhook

```bash
curl -X POST http://localhost:20128/api/webhooks/<id>/test \
  -H "Cookie: auth_token=..."
```

Ibinabalik ang `{ delivered, status, error }`. Walang isinasagawang muling pagsubok — kapaki-pakinabang ito para
mabilis na mapatunayan na tinatanggap ng receiver ang payload at signature.

## Dashboard

Ang pahina ng dashboard sa `/dashboard/webhooks` (tingnan ang
`src/app/(dashboard)/dashboard/webhooks/page.tsx`) ay nagbibigay ng:

- Paggawa/pag-edit ng mga webhook gamit ang event picker
- Indicator ng status (aktibo / hindi aktibo / may error) batay sa `enabled`,
  `failure_count`, at `last_status`
- Test delivery sa isang pag-click
- Manu-manong toggle para i-enable/i-disable

## Mga Halimbawa ng Payload

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
    "message": "Test webhook delivery from OmniRoute",
    "webhookId": "<uuid>"
  }
}
```

Ang mga anyo ng field para sa mga event na hindi `test.ping` ay tinutukoy ng mga call site na
naglalabas ng mga ito; ituring ang object na `data` bilang forward-compatible (magdagdag ng mga field, huwag umasa sa
kawalan ng mga ito).

## Pinakamahuhusay na Kasanayan

- **I-verify ang signature sa bawat delivery** laban sa raw body — pinipigilan nito ang mga
  spoofed POST mula sa sinumang makahula sa URL ng iyong webhook.
- **Tumugon ng 2xx sa loob ng ~5 segundo** — nagti-timeout ang dispatcher pagkalipas ng 10 s. Uubusin ng mababagal na
  receiver ang mga retry at palalakihin ang `failure_count`.
- **Gawing idempotent ang mga handler** — dahil sa mga retry at at-least-once delivery semantics,
  posibleng magkaroon ng mga duplicate.
- **Mag-subscribe nang minimal** — ilista lamang ang mga event na aktwal mong ginagamit; magdaragdag ang `"*"` ng
  gastos sa mga receiver na hindi mo kontrolado.
- **Subaybayan ang `failure_count`** — awtomatikong dini-disable ang mga endpoint pagkatapos ng 10 magkakasunod na
  pagkabigo; i-reset sa pamamagitan ng pagtawag sa `PUT /api/webhooks/[id]` gamit ang `enabled: true`
  pagkatapos ayusin ang receiver.
- **Pana-panahong palitan ang mga secret** — mag-`PUT` ng bagong `secret`, i-deploy ang bagong value
  sa receiver, at kumpirmahin gamit ang test endpoint.

## Tingnan Din

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — kumpletong saklaw ng management API
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — mga semantics ng circuit breaker / cooldown
  sa likod ng mga pagkabigo ng provider na inilalantad sa pamamagitan ng `request.failed`
- Source: `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`
