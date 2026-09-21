# Webhooks (ਪੰਜਾਬੀ)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/WEBHOOKS.md) · 🇪🇹 [am](../../../am/docs/frameworks/WEBHOOKS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/WEBHOOKS.md) · 🇦🇿 [az](../../../az/docs/frameworks/WEBHOOKS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/WEBHOOKS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/WEBHOOKS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/WEBHOOKS.md) · 🇩🇰 [da](../../../da/docs/frameworks/WEBHOOKS.md) · 🇩🇪 [de](../../../de/docs/frameworks/WEBHOOKS.md) · 🇬🇷 [el](../../../el/docs/frameworks/WEBHOOKS.md) · 🇪🇸 [es](../../../es/docs/frameworks/WEBHOOKS.md) · 🇪🇪 [et](../../../et/docs/frameworks/WEBHOOKS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/WEBHOOKS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/WEBHOOKS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/WEBHOOKS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/WEBHOOKS.md) · 🇮🇱 [he](../../../he/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/WEBHOOKS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/WEBHOOKS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/WEBHOOKS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/WEBHOOKS.md) · 🇮🇩 [id](../../../id/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/WEBHOOKS.md) · 🇮🇹 [it](../../../it/docs/frameworks/WEBHOOKS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/WEBHOOKS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/WEBHOOKS.md) · 🇰🇭 [km](../../../km/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/WEBHOOKS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/WEBHOOKS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/WEBHOOKS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/WEBHOOKS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/WEBHOOKS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/WEBHOOKS.md) · 🇲🇲 [my](../../../my/docs/frameworks/WEBHOOKS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/WEBHOOKS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/WEBHOOKS.md) · 🇳🇴 [no](../../../no/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [or](../../../or/docs/frameworks/WEBHOOKS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/WEBHOOKS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/WEBHOOKS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/WEBHOOKS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/WEBHOOKS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/WEBHOOKS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/WEBHOOKS.md) · 🇱🇰 [si](../../../si/docs/frameworks/WEBHOOKS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/WEBHOOKS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/WEBHOOKS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/WEBHOOKS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/WEBHOOKS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [te](../../../te/docs/frameworks/WEBHOOKS.md) · 🇹🇭 [th](../../../th/docs/frameworks/WEBHOOKS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/WEBHOOKS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/WEBHOOKS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/WEBHOOKS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/WEBHOOKS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/WEBHOOKS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/WEBHOOKS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/WEBHOOKS.md)

---

> **ਸੱਚਾਈ ਦਾ ਸਰੋਤ:** `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`, `src/app/api/webhooks/`
> **ਆਖਰੀ ਅੱਪਡੇਟ:** 2026-06-28 — v3.8.40

OmniRoute ਪਲੇਟਫਾਰਮ ਇਵੈਂਟਾਂ 'ਤੇ HTTP ਵੈੱਬਹੁੱਕ ਟ੍ਰਿਗਰ ਕਰ ਸਕਦਾ ਹੈ। ਇਨ੍ਹਾਂ ਦੀ ਵਰਤੋਂ
Slack, PagerDuty, Datadog, ਅੰਦਰੂਨੀ ਅਲਰਟਿੰਗ ਸੇਵਾਵਾਂ ਜਾਂ ਕਿਸੇ ਵੀ HTTP ਰਿਸੀਵਰ ਨਾਲ ਏਕੀਕਰਨ ਲਈ ਕਰੋ।

ਡਿਸਪੈਚਰ ਹਰ ਡਿਲੀਵਰੀ ਨੂੰ HMAC-SHA256 ਨਾਲ ਸਾਈਨ ਕਰਦਾ ਹੈ, ਅਸਥਾਈ
ਅਸਫਲਤਾਵਾਂ 'ਤੇ ਮੁੜ ਕੋਸ਼ਿਸ਼ ਕਰਦਾ ਹੈ, ਹਰੇਕ ਵੈੱਬਹੁੱਕ ਲਈ ਡਿਲੀਵਰੀ ਦੀ ਸਥਿਤੀ ਟਰੈਕ ਕਰਦਾ ਹੈ ਅਤੇ ਲਗਾਤਾਰ
ਅਸਫਲ ਹੋਣ ਵਾਲੇ ਐਂਡਪੌਇੰਟਾਂ ਨੂੰ ਆਪਣੇ-ਆਪ ਅਸਮਰੱਥ ਕਰ ਦਿੰਦਾ ਹੈ।

## ਸਮਰਥਿਤ ਇਵੈਂਟ

`WebhookEvent` ਕਿਸਮ (`src/lib/webhooks/eventDescriptions.ts`, ਜਿਸਨੂੰ `src/lib/webhookDispatcher.ts` ਵਰਤਦਾ ਹੈ) ਵਰਤਮਾਨ ਵਿੱਚ ਬਿਲਕੁਲ ਚਾਰ ਇਵੈਂਟਾਂ ਨੂੰ ਮਾਡਲ ਕਰਦੀ ਹੈ:

| ਇਵੈਂਟ               | ਕਦੋਂ ਟ੍ਰਿਗਰ ਹੁੰਦਾ ਹੈ                                                      |
| ------------------- | ------------------------------------------------------------------------- |
| `request.completed` | ਪ੍ਰੌਕਸੀ ਕੀਤਾ ਗਿਆ ਅਨੁਰੋਧ ਸਫਲਤਾਪੂਰਵਕ ਪੂਰਾ ਹੋ ਜਾਂਦਾ ਹੈ                       |
| `request.failed`    | ਸਾਰੀਆਂ ਮੁੜ ਕੋਸ਼ਿਸ਼ਾਂ/ਫਾਲਬੈਕ ਤੋਂ ਬਾਅਦ ਪ੍ਰੌਕਸੀ ਕੀਤਾ ਅਨੁਰੋਧ ਅਸਫਲ ਹੋ ਜਾਂਦਾ ਹੈ |
| `quota.exceeded`    | ਇੱਕ API ਕੁੰਜੀ ਬਜਟ/ਕੋਟਾ ਹੱਦ ਪਾਰ ਕਰ ਜਾਂਦੀ ਹੈ                                |
| `test.ping`         | ਟੈਸਟ ਐਂਡਪੌਇੰਟ ਦੁਆਰਾ ਵਰਤਿਆ ਜਾਣ ਵਾਲਾ ਸਿੰਥੈਟਿਕ ਇਵੈਂਟ                         |

ਹਰੇਕ ਇਵੈਂਟ ਪ੍ਰਾਪਤ ਕਰਨ ਲਈ ਸਬਸਕ੍ਰਿਪਸ਼ਨਾਂ ਵਿੱਚ ਲਿਟਰਲ `"*"` ਸਵੀਕਾਰ ਕੀਤਾ ਜਾਂਦਾ ਹੈ। `events` ਵਿੱਚ
ਅਣਜਾਣ ਇਵੈਂਟ ਨਾਮਾਂ ਨੂੰ ਡਿਸਪੈਚ ਸਮੇਂ ਅਣਡਿੱਠਾ ਕਰ ਦਿੱਤਾ ਜਾਂਦਾ ਹੈ।

> ਨੋਟ: ਡਿਸਪੈਚਰ API ਜੁੜਿਆ ਹੋਇਆ ਹੈ, ਪਰ ਕੁਝ ਗੈਰ-`test.ping`
> ਇਵੈਂਟਾਂ ਲਈ ਪ੍ਰੋਡਕਸ਼ਨ ਕਾਲ ਸਾਈਟਾਂ ਅਜੇ ਵੀ ਸ਼ਾਮਲ ਕੀਤੀਆਂ ਜਾ ਰਹੀਆਂ ਹਨ। ਇਹ ਦੇਖਣ ਲਈ `grep dispatchEvent` ਚਲਾਓ
> ਕਿ ਤੁਹਾਡੇ ਰਿਲੀਜ਼ ਵਿੱਚ ਇਸ ਵੇਲੇ ਕਿਹੜੇ ਪਾਥ ਡਿਸਪੈਚਰ ਨੂੰ ਕਾਲ ਕਰਦੇ ਹਨ।

## ਆਰਕੀਟੈਕਚਰ

```
ਕਾਲਰ (ਹੈਂਡਲਰ, ਸੇਵਾ, ਮਾਨੀਟਰ)
  dispatchEvent(event, data)            [src/lib/webhookDispatcher.ts]
    -> getEnabledWebhooks()             [src/lib/db/webhooks.ts]
    -> webhook.events ਦੇ ਆਧਾਰ 'ਤੇ ਫਿਲਟਰ ਕਰੋ
    -> ਹਰੇਕ ਮੇਲ ਲਈ (ਸਮਾਂਤਰ ਤੌਰ 'ਤੇ):
       deliverWebhook(url, payload, secret)
         ਪੇਲੋਡ { event, timestamp, data } ਬਣਾਓ
         ਬਾਡੀ ਨੂੰ HMAC-SHA256 ਨਾਲ ਸਾਈਨ ਕਰੋ (ਜੇ secret ਮੌਜੂਦ ਹੋਵੇ)
         10s ਟਾਈਮਆਊਟ ਨਾਲ POST ਕਰੋ
         5xx / ਨੈੱਟਵਰਕ ਤਰੁੱਟੀ 'ਤੇ 3 ਵਾਰ ਤੱਕ ਮੁੜ ਕੋਸ਼ਿਸ਼ ਕਰੋ
       recordWebhookDelivery(id, status, success)
    -> disableWebhooksWithHighFailures(10)
```

ਕਾਲਰ ਲਈ ਡਿਸਪੈਚ ਫਾਇਰ-ਐਂਡ-ਫਰਗੈਟ ਹੁੰਦਾ ਹੈ: `Promise.allSettled`
ਹਰੇਕ ਵੈੱਬਹੁੱਕ ਦੀਆਂ ਤਰੁੱਟੀਆਂ ਨੂੰ ਨਿਗਲ ਲੈਂਦਾ ਹੈ, ਤਾਂ ਜੋ ਇੱਕ ਖਰਾਬ ਰਿਸੀਵਰ ਹੋਰਾਂ ਨੂੰ ਬਲੌਕ ਨਾ ਕਰ ਸਕੇ।

## HMAC ਸਾਈਨਿੰਗ

ਜਦੋਂ ਕਿਸੇ ਵੈੱਬਹੁੱਕ ਕੋਲ `secret` ਹੁੰਦਾ ਹੈ, ਤਾਂ OmniRoute JSON ਬਾਡੀ ਨੂੰ ਸਾਈਨ ਕਰਦਾ ਹੈ ਅਤੇ ਇਹ ਭੇਜਦਾ ਹੈ:

```
Content-Type: application/json
User-Agent: OmniRoute-Webhook/1.0
X-Webhook-Event: <event>
X-Webhook-Timestamp: <ISO-8601>
X-Webhook-Signature: sha256=<hex HMAC-SHA256(secret, body)>
```

> ਹੈਡਰ ਨਾਮ `X-Webhook-*` ਪ੍ਰੀਫਿਕਸ ਵਰਤਦੇ ਹਨ (`X-OmniRoute-*` ਨਹੀਂ)। ਸਿਗਨੇਚਰ
> ਮੁੱਲ `sha256=<hex>` ਹੁੰਦਾ ਹੈ — ਪੂਰੇ ਪ੍ਰੀਫਿਕਸ ਦੀ ਪੁਸ਼ਟੀ ਕਰੋ।

ਜੇ `createWebhook` ਨੂੰ secret ਤੋਂ ਬਿਨਾਂ ਕਾਲ ਕੀਤਾ ਜਾਂਦਾ ਹੈ, ਤਾਂ DB ਮੋਡੀਊਲ ਇੱਕ
(`whsec_<48 hex>`) ਤਿਆਰ ਕਰਦਾ ਹੈ, ਇਸ ਲਈ ਮੂਲ ਰੂਪ ਵਿੱਚ ਸਾਰੇ ਵੈੱਬਹੁੱਕ ਸਾਈਨ ਕੀਤੇ ਜਾਂਦੇ ਹਨ।

### ਰਿਸੀਵਰ 'ਤੇ ਪੁਸ਼ਟੀ ਕਰਨਾ

```typescript
import { createHmac, timingSafeEqual } from "node:crypto";

function verify(rawBody: string, signature: string, secret: string) {
  const expected = "sha256=" + createHmac("sha256", secret).update(rawBody).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}
```

ਕਿਸੇ ਵੀ JSON ਪਾਰਸਿੰਗ ਤੋਂ ਪਹਿਲਾਂ, ਹਮੇਸ਼ਾ **ਕੱਚੀ** ਅਨੁਰੋਧ ਬਾਡੀ ਦੇ ਆਧਾਰ 'ਤੇ ਪੁਸ਼ਟੀ ਕਰੋ।

## ਮੁੜ-ਕੋਸ਼ਿਸ਼ ਅਤੇ ਅਸਫਲਤਾ ਨੀਤੀ

`deliverWebhook(url, payload, secret, maxRetries = 3)`:

- ਹਰ ਕੋਸ਼ਿਸ਼ ਲਈ 10 ਸਕਿੰਟ ਦੀ ਸਮਾਂ-ਸੀਮਾ (`AbortController`)।
- HTTP 2xx ਨੂੰ ਸਫਲਤਾ ਮੰਨਿਆ ਜਾਂਦਾ ਹੈ।
- HTTP 3xx/4xx ਨੂੰ ਅਜਿਹੀ ਅੰਤਿਮ ਸਥਿਤੀ ਮੰਨਿਆ ਜਾਂਦਾ ਹੈ ਜਿਸ ਲਈ ਮੁੜ ਕੋਸ਼ਿਸ਼ ਨਹੀਂ ਕੀਤੀ ਜਾਂਦੀ — ਇਸਨੂੰ ਡਿਲੀਵਰ ਹੋਇਆ ਦਰਜ ਕੀਤਾ ਜਾਂਦਾ ਹੈ
  ਅਤੇ `success = res.ok` ਹੁੰਦਾ ਹੈ।
- HTTP 5xx ਅਤੇ ਨੈੱਟਵਰਕ ਗਲਤੀਆਂ ਲਈ ਐਕਸਪੋਨੇਨਸ਼ੀਅਲ ਬੈਕਆਫ਼ ਨਾਲ ਮੁੜ ਕੋਸ਼ਿਸ਼ ਕੀਤੀ ਜਾਂਦੀ ਹੈ:
  `2^attempt * 1000 ms` (1s, 2s, 4s)।
- `maxRetries` ਤੋਂ ਬਾਅਦ, ਡਿਲੀਵਰੀ ਨੂੰ ਅਸਫਲ ਵਜੋਂ ਦਰਜ ਕੀਤਾ ਜਾਂਦਾ ਹੈ।
- ਹਰ ਡਿਲੀਵਰੀ `last_triggered_at`, `last_status` ਨੂੰ ਅੱਪਡੇਟ ਕਰਦੀ ਹੈ ਅਤੇ
  `failure_count` ਨੂੰ ਜਾਂ ਤਾਂ ਰੀਸੈੱਟ ਕਰਦੀ ਹੈ ਜਾਂ ਵਧਾਉਂਦੀ ਹੈ।
- ਡਿਸਪੈਚਰ ਹਰ ਫੈਨ-ਆਉਟ ਤੋਂ ਬਾਅਦ `disableWebhooksWithHighFailures(10)` ਨੂੰ ਕਾਲ ਕਰਦਾ ਹੈ,
  ਇਸ ਲਈ `failure_count >= 10` ਵਾਲਾ ਕੋਈ ਵੀ webhook ਆਪਣੇ-ਆਪ ਅਸਮਰੱਥ ਹੋ ਜਾਂਦਾ ਹੈ।

## ਡਾਟਾਬੇਸ

ਟੇਬਲ `webhooks` (ਮਾਈਗ੍ਰੇਸ਼ਨ `011_webhooks.sql`):

| ਕਾਲਮ                | ਕਿਸਮ    | ਟਿੱਪਣੀਆਂ                                        |
| ------------------- | ------- | ----------------------------------------------- |
| `id`                | TEXT PK | UUID                                            |
| `url`               | TEXT    | ਮੰਜ਼ਿਲ URL                                      |
| `events`            | TEXT    | JSON ਐਰੇ; ਡਿਫਾਲਟ `["*"]`                        |
| `secret`            | TEXT    | HMAC ਸੀਕ੍ਰੇਟ (ਨਾ ਦਿੱਤੇ ਜਾਣ 'ਤੇ ਆਪਣੇ-ਆਪ ਬਣਦਾ ਹੈ) |
| `enabled`           | INT     | 0/1; ਡਿਫਾਲਟ 1                                   |
| `description`       | TEXT    | ਵਿਕਲਪਿਕ ਮਨੁੱਖੀ ਲੇਬਲ                             |
| `created_at`        | TEXT    | `datetime('now')`                               |
| `last_triggered_at` | TEXT    | ਹਰ ਡਿਲੀਵਰੀ ਕੋਸ਼ਿਸ਼ 'ਤੇ ਅੱਪਡੇਟ ਹੁੰਦਾ ਹੈ          |
| `last_status`       | INT     | ਆਖਰੀ ਕੋਸ਼ਿਸ਼ ਦੀ HTTP ਸਥਿਤੀ (0 = ਨੈੱਟਵਰਕ)        |
| `failure_count`     | INT     | ਸਫਲਤਾ 'ਤੇ 0 ਤੱਕ ਰੀਸੈੱਟ, ਅਸਫਲਤਾ 'ਤੇ +1           |

ਡਿਲੀਵਰੀ ਇਤਿਹਾਸ ਨੂੰ ਸਮਰਪਿਤ `webhook_deliveries` ਟੇਬਲ ਵਿੱਚ ਸਥਾਈ ਤੌਰ 'ਤੇ ਸੰਭਾਲਿਆ ਜਾਂਦਾ ਹੈ
(ਮਾਈਗ੍ਰੇਸ਼ਨ `069_webhook_deliveries.sql`, ਹਰ ਕੋਸ਼ਿਸ਼ 'ਤੇ
`src/lib/db/webhookDeliveries.ts::insertDelivery` ਰਾਹੀਂ ਲਿਖਿਆ ਜਾਂਦਾ ਹੈ), ਨਾਲ ਹੀ
`webhooks` ਕਤਾਰ ਵਿੱਚ ਸਮੁੱਚੇ ਕਾਊਂਟਰ ਵੀ ਰੱਖੇ ਜਾਂਦੇ ਹਨ। ਕਿਸਮ ਮੈਟਾਡਾਟਾ (Slack / Discord /
Telegram / ਕਸਟਮ ਪੇਲੋਡ ਟ੍ਰਾਂਸਫਾਰਮਰ) ਨੂੰ `070_webhooks_kind_metadata.sql` ਦੁਆਰਾ ਜੋੜਿਆ ਗਿਆ ਸੀ।

## REST API

ਸਾਰੇ ਐਂਡਪੌਇੰਟਾਂ ਲਈ ਪ੍ਰਬੰਧਨ ਪ੍ਰਮਾਣੀਕਰਨ (`requireManagementAuth`) ਲਾਜ਼ਮੀ ਹੈ।

| ਐਂਡਪੌਇੰਟ                        | ਢੰਗ    | ਵੇਰਵਾ                                       |
| ------------------------------- | ------ | ------------------------------------------- |
| `/api/webhooks`                 | GET    | webhooks ਦੀ ਸੂਚੀ (ਸੀਕ੍ਰੇਟ ਮਾਸਕ ਕੀਤੇ ਹੋਏ)    |
| `/api/webhooks`                 | POST   | webhook ਬਣਾਓ                                |
| `/api/webhooks/[id]`            | GET    | webhook ਵੇਰਵਾ (ਪੂਰਾ ਸੀਕ੍ਰੇਟ)                |
| `/api/webhooks/[id]`            | PUT    | ਫ਼ੀਲਡਾਂ ਅੱਪਡੇਟ ਕਰੋ                          |
| `/api/webhooks/[id]`            | DELETE | ਹਟਾਓ                                        |
| `/api/webhooks/[id]/test`       | POST   | ਇੱਕ `test.ping` ਚਲਾਓ (ਕੋਈ ਮੁੜ-ਕੋਸ਼ਿਸ਼ ਨਹੀਂ) |
| `/api/webhooks/[id]/deliveries` | GET    | ਇੱਕ webhook ਲਈ ਹਾਲੀਆ ਡਿਲੀਵਰੀ ਕੋਸ਼ਿਸ਼ਾਂ      |
| `/api/webhooks/validate-url`    | POST   | ਪੂਰਵ-ਜਾਂਚ URL ਪ੍ਰਮਾਣਿਕਤਾ (SSRF ਸੁਰੱਖਿਆ)     |

`GET /api/webhooks` ਸੂਚੀ ਵਾਲੇ ਪੰਨਿਆਂ 'ਤੇ ਸੀਕ੍ਰੇਟ ਲੀਕ ਹੋਣ ਤੋਂ ਬਚਾਉਣ ਲਈ ਇਸਨੂੰ
`<first 10 chars>...` ਦੇ ਰੂਪ ਵਿੱਚ ਮਾਸਕ ਕਰਦਾ ਹੈ। ਜਦੋਂ ਤੁਹਾਨੂੰ ਅਸਲ ਵਿੱਚ ਸੀਕ੍ਰੇਟ ਦੀ ਲੋੜ ਹੋਵੇ ਤਾਂ `[id]` GET ਵਰਤੋ।

### webhook ਬਣਾਓ

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

ਜੇ `secret` ਛੱਡ ਦਿੱਤਾ ਜਾਂਦਾ ਹੈ, ਤਾਂ ਸਰਵਰ ਇੱਕ `whsec_<hex>` ਸੀਕ੍ਰੇਟ ਬਣਾਉਂਦਾ ਹੈ ਅਤੇ
ਇਸਨੂੰ ਜਵਾਬ ਵਿੱਚ ਵਾਪਸ ਕਰਦਾ ਹੈ।

### webhook ਦੀ ਜਾਂਚ ਕਰੋ

```bash
curl -X POST http://localhost:20128/api/webhooks/<id>/test \
  -H "Cookie: auth_token=..."
```

`{ delivered, status, error }` ਵਾਪਸ ਕਰਦਾ ਹੈ। ਕੋਈ ਮੁੜ-ਕੋਸ਼ਿਸ਼ ਨਹੀਂ ਕੀਤੀ ਜਾਂਦੀ — ਇਹ ਤੁਰੰਤ
ਪੁਸ਼ਟੀ ਕਰਨ ਲਈ ਲਾਭਦਾਇਕ ਹੈ ਕਿ ਪ੍ਰਾਪਤਕਰਤਾ ਪੇਲੋਡ ਅਤੇ ਦਸਤਖਤ ਨੂੰ ਸਵੀਕਾਰ ਕਰਦਾ ਹੈ।

## ਡੈਸ਼ਬੋਰਡ

`/dashboard/webhooks` ਉੱਤੇ ਡੈਸ਼ਬੋਰਡ ਪੰਨਾ (ਵੇਖੋ
`src/app/(dashboard)/dashboard/webhooks/page.tsx`) ਇਹ ਸੁਵਿਧਾਵਾਂ ਪ੍ਰਦਾਨ ਕਰਦਾ ਹੈ:

- ਇਵੈਂਟ ਪਿਕਰ ਨਾਲ ਵੈੱਬਹੁੱਕ ਬਣਾਉਣਾ/ਸੰਪਾਦਿਤ ਕਰਨਾ
- `enabled`, `failure_count`, ਅਤੇ `last_status` ਦੇ ਆਧਾਰ 'ਤੇ ਸਥਿਤੀ ਸੂਚਕ (ਸਰਗਰਮ / ਨਿਸ਼ਕਿਰਿਆ / ਤਰੁੱਟੀ ਵਾਲਾ)
- ਇੱਕ ਕਲਿੱਕ ਨਾਲ ਟੈਸਟ ਡਿਲਿਵਰੀ
- ਹੱਥੀਂ ਸਮਰੱਥ/ਅਸਮਰੱਥ ਕਰਨ ਲਈ ਟੌਗਲ

## ਪੇਲੋਡ ਉਦਾਹਰਨਾਂ

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
    "message": "OmniRoute ਤੋਂ ਟੈਸਟ ਵੈੱਬਹੁੱਕ ਡਿਲਿਵਰੀ",
    "webhookId": "<uuid>"
  }
}
```

ਗੈਰ-`test.ping` ਇਵੈਂਟਾਂ ਲਈ ਫ਼ੀਲਡਾਂ ਦੀ ਬਣਤਰ ਉਹਨਾਂ ਕਾਲ ਸਾਈਟਾਂ ਦੁਆਰਾ ਪਰਿਭਾਸ਼ਿਤ ਹੁੰਦੀ ਹੈ ਜੋ ਉਹਨਾਂ ਨੂੰ ਉਤਸਰਜਿਤ ਕਰਦੀਆਂ ਹਨ; `data` ਆਬਜੈਕਟ ਨੂੰ ਫਾਰਵਰਡ-ਅਨੁਕੂਲ ਸਮਝੋ (ਫ਼ੀਲਡ ਜੋੜੋ, ਉਹਨਾਂ ਦੀ ਗੈਰਹਾਜ਼ਰੀ 'ਤੇ ਨਿਰਭਰ ਨਾ ਕਰੋ)।

## ਸਰਵੋਤਮ ਅਭਿਆਸ

- **ਹਰੇਕ ਡਿਲਿਵਰੀ ਉੱਤੇ ਕੱਚੀ ਬਾਡੀ ਦੇ ਮੁਕਾਬਲੇ ਦਸਤਖ਼ਤ ਦੀ ਪੁਸ਼ਟੀ ਕਰੋ** — ਇਹ ਤੁਹਾਡੇ ਵੈੱਬਹੁੱਕ URL ਦਾ ਅੰਦਾਜ਼ਾ ਲਗਾਉਣ ਵਾਲੇ ਕਿਸੇ ਵੀ ਵਿਅਕਤੀ ਵੱਲੋਂ ਨਕਲੀ POST ਭੇਜੇ ਜਾਣ ਤੋਂ ਰੋਕਦਾ ਹੈ।
- **ਲਗਭਗ 5 ਸਕਿੰਟਾਂ ਅੰਦਰ 2xx ਜਵਾਬ ਦਿਓ** — ਡਿਸਪੈਚਰ ਦਾ ਸਮਾਂ 10 s ਉੱਤੇ ਸਮਾਪਤ ਹੋ ਜਾਂਦਾ ਹੈ। ਹੌਲੀ ਗਤੀ ਵਾਲੇ ਰਿਸੀਵਰ ਮੁੜ-ਕੋਸ਼ਿਸ਼ਾਂ ਵਰਤਣਗੇ ਅਤੇ `failure_count` ਵਧਾਉਣਗੇ।
- **ਹੈਂਡਲਰਾਂ ਨੂੰ ਆਈਡੈਂਪੋਟੈਂਟ ਬਣਾਓ** — ਮੁੜ-ਕੋਸ਼ਿਸ਼ਾਂ ਅਤੇ ਘੱਟੋ-ਘੱਟ-ਇੱਕ-ਵਾਰ ਡਿਲਿਵਰੀ ਦੇ ਅਰਥਾਂ ਕਾਰਨ ਡੁਪਲੀਕੇਟ ਸੰਭਵ ਹਨ।
- **ਘੱਟੋ-ਘੱਟ ਸਬਸਕ੍ਰਾਈਬ ਕਰੋ** — ਸਿਰਫ਼ ਉਹੀ ਇਵੈਂਟ ਸੂਚੀਬੱਧ ਕਰੋ ਜੋ ਤੁਸੀਂ ਅਸਲ ਵਿੱਚ ਵਰਤਦੇ ਹੋ; `"*"` ਉਹਨਾਂ ਰਿਸੀਵਰਾਂ ਉੱਤੇ ਲਾਗਤ ਵਧਾਏਗਾ ਜਿਨ੍ਹਾਂ ਨੂੰ ਤੁਸੀਂ ਨਿਯੰਤਰਿਤ ਨਹੀਂ ਕਰਦੇ।
- **`failure_count` ਦੀ ਨਿਗਰਾਨੀ ਕਰੋ** — ਲਗਾਤਾਰ 10 ਅਸਫਲਤਾਵਾਂ ਉੱਤੇ ਐਂਡਪੌਇੰਟ ਆਪਣੇ ਆਪ ਅਸਮਰੱਥ ਹੋ ਜਾਂਦੇ ਹਨ; ਰਿਸੀਵਰ ਠੀਕ ਕਰਨ ਤੋਂ ਬਾਅਦ `enabled: true` ਨਾਲ `PUT /api/webhooks/[id]` ਨੂੰ ਕਾਲ ਕਰਕੇ ਰੀਸੈੱਟ ਕਰੋ।
- **ਸੀਕ੍ਰੇਟਾਂ ਨੂੰ ਸਮੇਂ-ਸਮੇਂ 'ਤੇ ਬਦਲੋ** — ਇੱਕ ਨਵਾਂ `secret` `PUT` ਕਰੋ, ਨਵਾਂ ਮੁੱਲ ਰਿਸੀਵਰ ਉੱਤੇ ਡਿਪਲੌਇ ਕਰੋ, ਅਤੇ ਟੈਸਟ ਐਂਡਪੌਇੰਟ ਰਾਹੀਂ ਪੁਸ਼ਟੀ ਕਰੋ।

## ਇਹ ਵੀ ਵੇਖੋ

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — ਪੂਰਾ ਪ੍ਰਬੰਧਨ API ਇੰਟਰਫੇਸ
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — `request.failed` ਰਾਹੀਂ ਪ੍ਰਗਟ ਕੀਤੀਆਂ ਪ੍ਰਦਾਤਾ ਅਸਫਲਤਾਵਾਂ ਦੇ ਪਿੱਛੇ ਸਰਕਿਟ ਬ੍ਰੇਕਰ / ਕੂਲਡਾਊਨ ਦੇ ਅਰਥ
- ਸਰੋਤ: `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`
