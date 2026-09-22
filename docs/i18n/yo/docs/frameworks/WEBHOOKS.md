# Webhooks (Yorùbá)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/WEBHOOKS.md) · 🇪🇹 [am](../../../am/docs/frameworks/WEBHOOKS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/WEBHOOKS.md) · 🇦🇿 [az](../../../az/docs/frameworks/WEBHOOKS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/WEBHOOKS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/WEBHOOKS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/WEBHOOKS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/WEBHOOKS.md) · 🇩🇰 [da](../../../da/docs/frameworks/WEBHOOKS.md) · 🇩🇪 [de](../../../de/docs/frameworks/WEBHOOKS.md) · 🇬🇷 [el](../../../el/docs/frameworks/WEBHOOKS.md) · 🇪🇸 [es](../../../es/docs/frameworks/WEBHOOKS.md) · 🇪🇪 [et](../../../et/docs/frameworks/WEBHOOKS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/WEBHOOKS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/WEBHOOKS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/WEBHOOKS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/WEBHOOKS.md) · 🇮🇱 [he](../../../he/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/WEBHOOKS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/WEBHOOKS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/WEBHOOKS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/WEBHOOKS.md) · 🇮🇩 [id](../../../id/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/WEBHOOKS.md) · 🇮🇹 [it](../../../it/docs/frameworks/WEBHOOKS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/WEBHOOKS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/WEBHOOKS.md) · 🇰🇭 [km](../../../km/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/WEBHOOKS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/WEBHOOKS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/WEBHOOKS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/WEBHOOKS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/WEBHOOKS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/WEBHOOKS.md) · 🇲🇲 [my](../../../my/docs/frameworks/WEBHOOKS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/WEBHOOKS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/WEBHOOKS.md) · 🇳🇴 [no](../../../no/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [or](../../../or/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/WEBHOOKS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/WEBHOOKS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/WEBHOOKS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/WEBHOOKS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/WEBHOOKS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/WEBHOOKS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/WEBHOOKS.md) · 🇱🇰 [si](../../../si/docs/frameworks/WEBHOOKS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/WEBHOOKS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/WEBHOOKS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/WEBHOOKS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/WEBHOOKS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [te](../../../te/docs/frameworks/WEBHOOKS.md) · 🇹🇭 [th](../../../th/docs/frameworks/WEBHOOKS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/WEBHOOKS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/WEBHOOKS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/WEBHOOKS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/WEBHOOKS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/WEBHOOKS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/WEBHOOKS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/WEBHOOKS.md)

---

> **Orísun òtítọ́:** `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`, `src/app/api/webhooks/`
> **Ìgbà ìmúdójúìwọ̀n tó kẹ́yìn:** 2026-06-28 — v3.8.40

OmniRoute lè fi àwọn webhook HTTP ránṣẹ́ nígbà tí àwọn ìṣẹ̀lẹ̀ bá ṣẹlẹ̀ lórí pèpéle. Lo wọn láti so pọ̀ mọ́
Slack, PagerDuty, Datadog, àwọn iṣẹ́ ìkìlọ̀ inú ètò, tàbí olùgbà HTTP èyíkéyìí.

Olùpín náà máa ń fi ìfọwọ́sí HMAC-SHA256 sí ìfiránṣẹ́ kọ̀ọ̀kan, ó máa ń tún gbìyànjú nígbà
ìkùnà fún ìgbà díẹ̀, ó máa ń tọpinpin ìlera ìfiránṣẹ́ fún webhook kọ̀ọ̀kan, ó sì máa ń pa àwọn endpoint
tí ìkùnà wọn ń bá a lọ láìfọwọ́sí.

## Àwọn Ìṣẹ̀lẹ̀ Tí A Ṣàtìlẹ́yìn Fún

Irú `WebhookEvent` (`src/lib/webhooks/eventDescriptions.ts`, tí `src/lib/webhookDispatcher.ts` ń lò) ń ṣàpẹẹrẹ àwọn ìṣẹ̀lẹ̀ mẹ́rin péré lọ́wọ́lọ́wọ́:

| Ìṣẹ̀lẹ̀               | Ó máa ń ṣẹlẹ̀ nígbà tí                                              |
| ------------------- | ------------------------------------------------------------------ |
| `request.completed` | Ìbéèrè tí a gba kọjá bá parí láṣeyọrí                              |
| `request.failed`    | Ìbéèrè tí a gba kọjá bá kùnà lẹ́yìn gbogbo àtúngbìyànjú/ọ̀nà àfidípò |
| `quota.exceeded`    | Kọ́kọ́rọ́ API kan bá kọjá ààlà ìnáwó/quota                            |
| `test.ping`         | Ìṣẹ̀lẹ̀ àfarawé tí endpoint ìdánwò ń lò                              |

Àwọn subscription gba literal `"*"` láti gba gbogbo ìṣẹ̀lẹ̀. Àwọn orúkọ ìṣẹ̀lẹ̀
tí a kò mọ̀ nínú `events` ni a máa kọjú sí nígbà ìpínkiri.

> Àkíyèsí: a ti so API olùpín náà pọ̀, ṣùgbọ́n àwọn ibi ìpè production fún díẹ̀ lára
> àwọn ìṣẹ̀lẹ̀ tí kì í ṣe `test.ping` ṣì ń dé. Ṣàyẹ̀wò `grep dispatchEvent` láti rí
> àwọn ọ̀nà tí ó ń pe olùpín náà lọ́wọ́lọ́wọ́ nínú ẹ̀dà rẹ.

## Ìṣètò Ẹ̀rọ

```
Olùpè (handler, service, monitor)
  dispatchEvent(event, data)            [src/lib/webhookDispatcher.ts]
    -> getEnabledWebhooks()             [src/lib/db/webhooks.ts]
    -> ṣe àlẹ̀mọ́ nípasẹ̀ webhook.events
    -> fún ìbámu kọ̀ọ̀kan (ní ìfẹ̀gbẹ́kẹ̀gbẹ́):
       deliverWebhook(url, payload, secret)
         kọ payload { event, timestamp, data }
         fi HMAC-SHA256 fọwọ́ sí body (bí secret bá wà)
         ṣe POST pẹ̀lú timeout 10s
         tún gbìyànjú tó ìgbà mẹ́ta lórí 5xx / àṣìṣe nẹ́tíwọ́ọ̀kì
       recordWebhookDelivery(id, status, success)
    -> disableWebhooksWithHighFailures(10)
```

Ìpínkiri jẹ́ fí-ránṣẹ́-kí-o-sì-má-dúró fún olùpè: `Promise.allSettled` máa ń gbé
àwọn àṣìṣe webhook kọ̀ọ̀kan mì, kí olùgbà búburú kan má bàa dí àwọn yòókù lọ́wọ́.

## Ìfọwọ́sí HMAC

Nígbà tí webhook kan bá ní `secret`, OmniRoute máa ń fọwọ́ sí JSON body, yóò sì fi èyí ránṣẹ́:

```
Content-Type: application/json
User-Agent: OmniRoute-Webhook/1.0
X-Webhook-Event: <event>
X-Webhook-Timestamp: <ISO-8601>
X-Webhook-Signature: sha256=<hex HMAC-SHA256(secret, body)>
```

> Àwọn orúkọ header ń lo ìpele `X-Webhook-*` (kì í ṣe `X-OmniRoute-*`). Iye signature
> jẹ́ `sha256=<hex>` — ṣàyẹ̀wò gbogbo ìpele náà.

Bí a bá pe `createWebhook` láìsí secret, module DB máa dá ọ̀kan sílẹ̀
(`whsec_<48 hex>`) nítorí náà, a máa ń fọwọ́ sí gbogbo webhook ní àìpé.

### Ṣíṣàyẹ̀wò lórí olùgbà

```typescript
import { createHmac, timingSafeEqual } from "node:crypto";

function verify(rawBody: string, signature: string, secret: string) {
  const expected = "sha256=" + createHmac("sha256", secret).update(rawBody).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}
```

Ṣàyẹ̀wò lòdì sí **raw** request body nígbà gbogbo, kí parsing JSON èyíkéyìí tó wáyé.

## Ìlànà Àtúngbìyànjú & Ìkùnà

`deliverWebhook(url, payload, secret, maxRetries = 3)`:

- Àkókò ìdádúró ìṣẹ́jú-àáyá 10 fún ìgbìyànjú kọ̀ọ̀kan (`AbortController`).
- HTTP 2xx ni a kà sí àṣeyọrí.
- HTTP 3xx/4xx ni a kà sí ipò ìkẹyìn tí kò ṣeé tún gbìyànjú — a sì ṣàkọsílẹ̀ rẹ̀ gẹ́gẹ́ bí èyí tí a ti fi jíṣẹ́
  pẹ̀lú `success = res.ok`.
- HTTP 5xx àti àwọn àṣìṣe nẹ́tíwọ́ọ̀kì ni a tún máa ń gbìyànjú pẹ̀lú àkókò ìdádúró tó ń pọ̀ sí i:
  `2^attempt * 1000 ms` (1s, 2s, 4s).
- Lẹ́yìn `maxRetries`, a ṣàkọsílẹ̀ fífi jíṣẹ́ náà gẹ́gẹ́ bí èyí tó kùnà.
- Fífi jíṣẹ́ kọ̀ọ̀kan máa ń ṣe ìmúdójúìwọ̀n `last_triggered_at`, `last_status`, ó sì máa ń tún
  `failure_count` padà sí ìbẹ̀rẹ̀ tàbí mú un pọ̀ sí i.
- Olùpínṣẹ́ máa ń pe `disableWebhooksWithHighFailures(10)` lẹ́yìn ìpínká kọ̀ọ̀kan,
  nítorí náà, webhook èyíkéyìí tó ní `failure_count >= 10` ni a máa pa láìfọwọ́yí.

## Ibùdó dátà

Tábìlì `webhooks` (ìṣíkiri `011_webhooks.sql`):

| Ọ̀wọ̀n                | Irú     | Àwọn àkíyèsí                                              |
| ------------------- | ------- | --------------------------------------------------------- |
| `id`                | TEXT PK | UUID                                                      |
| `url`               | TEXT    | URL ibi tí a ń fi ránṣẹ́ sí                                |
| `events`            | TEXT    | Àkójọpọ̀ JSON; àìyípadà `["*"]`                            |
| `secret`            | TEXT    | Àṣírí HMAC (a máa dá a sílẹ̀ láìfọwọ́yí bí a kò bá pèsè rẹ̀) |
| `enabled`           | INT     | 0/1; àìyípadà rẹ̀ jẹ́ 1                                     |
| `description`       | TEXT    | Àmì ìdánimọ̀ fún ènìyàn tí kò pọndandan                    |
| `created_at`        | TEXT    | `datetime('now')`                                         |
| `last_triggered_at` | TEXT    | A máa ṣe ìmúdójúìwọ̀n rẹ̀ ní gbogbo ìgbìyànjú fífi jíṣẹ́     |
| `last_status`       | INT     | Ipò HTTP ti ìgbìyànjú tó kẹ́yìn (0 = nẹ́tíwọ́ọ̀kì)            |
| `failure_count`     | INT     | A tún un padà sí 0 nígbà àṣeyọrí, +1 nígbà ìkùnà          |

A máa ń tọ́jú ìtàn fífi jíṣẹ́ sínú tábìlì pàtó `webhook_deliveries`
(ìṣíkiri `069_webhook_deliveries.sql`, tí a kọ sínú rẹ̀ nípasẹ̀
`src/lib/db/webhookDeliveries.ts::insertDelivery` ní gbogbo ìgbìyànjú), ní àfikún
sí àwọn òǹkà àkójọpọ̀ lórí ìlà `webhooks`. Àlàyé-àfikún irú (Slack / Discord /
Telegram / àwọn olùyí payload àdáni) ni a fi kún un nípasẹ̀ `070_webhooks_kind_metadata.sql`.

## API REST

Gbogbo àwọn endpoint nílò ìfàṣẹsí ìṣàkóso (`requireManagementAuth`).

| Endpoint                        | Ọ̀nà    | Àpèjúwe                                       |
| ------------------------------- | ------ | --------------------------------------------- |
| `/api/webhooks`                 | GET    | Ṣe àtòjọ àwọn webhook (a bo àwọn àṣírí mọ́lẹ̀)  |
| `/api/webhooks`                 | POST   | Ṣẹ̀dá webhook                                  |
| `/api/webhooks/[id]`            | GET    | Àlàyé webhook (àṣírí kíkún)                   |
| `/api/webhooks/[id]`            | PUT    | Ṣe ìmúdójúìwọ̀n àwọn ààyè                      |
| `/api/webhooks/[id]`            | DELETE | Yọ ọ́ kúrò                                     |
| `/api/webhooks/[id]/test`       | POST   | Fi `test.ping` ránṣẹ́ (láìsí àtúngbìyànjú)     |
| `/api/webhooks/[id]/deliveries` | GET    | Àwọn ìgbìyànjú fífi jíṣẹ́ àìpẹ́ fún webhook kan |
| `/api/webhooks/validate-url`    | POST   | Ìfàṣẹsí URL ṣáájú ìbéèrè (ààbò SSRF)          |

`GET /api/webhooks` máa ń bo àṣírí náà mọ́lẹ̀ sí `<first 10 chars>...` láti dènà
jíjò ó jáde lórí àwọn ojú-ewé àtòjọ. Lo GET `[id]` nígbà tí o bá nílò àṣírí náà gan-an.

### Ṣẹ̀dá webhook

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

Bí a bá yọ `secret` sílẹ̀, server náà máa dá àṣírí `whsec_<hex>` sílẹ̀, yóò sì dá
a padà nínú èsì náà.

### Dán webhook wò

```bash
curl -X POST http://localhost:20128/api/webhooks/<id>/test \
  -H "Cookie: auth_token=..."
```

Ó dá `{ delivered, status, error }` padà. Kò sí àtúngbìyànjú tí a ṣe — èyí wúlò fún
ṣíṣàyẹ̀wò ní kíákíá pé olùgbà náà gba payload àti ìbuwọ́lu náà.

## Pátákó Ìṣàkóso

Ojú-ìwé pátákó ìṣàkóso ní `/dashboard/webhooks` (wo
`src/app/(dashboard)/dashboard/webhooks/page.tsx`) pèsè:

- Ṣíṣẹ̀dá/ṣíṣàtúnṣe àwọn webhook pẹ̀lú ohun-yan ìṣẹ̀lẹ̀
- Atọ́ka ipò (ń ṣiṣẹ́ / kò ṣiṣẹ́ / ní àṣìṣe) tí a gbé karí `enabled`,
  `failure_count`, àti `last_status`
- Ìfijiṣẹ́ àdánwò pẹ̀lú ẹ̀ẹ̀kan-tẹ̀
- Yíyan láti mú ṣiṣẹ́/mú kúrò ní ṣíṣe pẹ̀lú ọwọ́

## Àwọn Àpẹẹrẹ Payload

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

Àwọn ìrísí field fún àwọn ìṣẹ̀lẹ̀ tí kì í ṣe `test.ping` ni àwọn ibi ìpè tí ń ṣe
àgbéjáde wọn ń ṣàlàyé; ka object `data` sí èyí tó bá ìbámu-ọjọ́-iwaju mu (ṣàfikún àwọn field, má ṣe gbára lé
àìsí wọn).

## Àwọn Ìlànà Tó Dára Jù

- **Ṣàyẹ̀wò signature lórí gbogbo ìfijiṣẹ́** pẹ̀lú raw body — èyí ń dènà
  àwọn POST èké láti ọ̀dọ̀ ẹnikẹ́ni tó bá mọ̀ URL webhook rẹ.
- **Fèsì pẹ̀lú 2xx láàárín ~5 ìṣẹ́jú-àáyá** — dispatcher máa dáwọ́ dúró lẹ́yìn 10 s. Àwọn
  receiver tó lọ́ra yóò jẹ àwọn ìgbìyànjú-àtúnṣe, wọn yóò sì mú `failure_count` pọ̀.
- **Mú kí àwọn handler jẹ́ idempotent** — àwọn ìgbìyànjú-àtúnṣe àti ìtumọ̀ ìfijiṣẹ́
  ó-kéré-tán-ẹ̀ẹ̀kan túmọ̀ sí pé àwọn ẹ̀dà àdáwò lè wáyé.
- **Ṣe subscription níwọ̀nba díẹ̀** — ṣe àkójọ àwọn ìṣẹ̀lẹ̀ tí o ń lò nìkan; `"*"` yóò
  ṣàfikún ìnáwó lórí àwọn receiver tí o kò ṣàkóso.
- **Ṣọ́ `failure_count`** — endpoints máa di pípa láìfọwọ́ṣe lẹ́yìn àwọn ìkùnà
  mẹ́wàá léraléra; tún un ṣe nípa pípè `PUT /api/webhooks/[id]` pẹ̀lú `enabled: true`
  lẹ́yìn títún receiver náà ṣe.
- **Máa yí secrets padà lẹ́ẹ̀kọ̀ọ̀kan** — fi `PUT` ránṣẹ́ pẹ̀lú `secret` tuntun, deploy iye tuntun náà
  sí receiver, kí o sì fi endpoint àdánwò mú un dájú.

## Tún Wo

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — gbogbo ààyè API ìṣàkóso
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — ìtumọ̀ circuit breaker / cooldown
  lẹ́yìn àwọn ìkùnà provider tí a fi hàn nípasẹ̀ `request.failed`
- Source: `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`
