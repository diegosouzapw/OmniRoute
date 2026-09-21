# Webhooks (ಕನ್ನಡ)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/WEBHOOKS.md) · 🇪🇹 [am](../../../am/docs/frameworks/WEBHOOKS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/WEBHOOKS.md) · 🇦🇿 [az](../../../az/docs/frameworks/WEBHOOKS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/WEBHOOKS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/WEBHOOKS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/WEBHOOKS.md) · 🇩🇰 [da](../../../da/docs/frameworks/WEBHOOKS.md) · 🇩🇪 [de](../../../de/docs/frameworks/WEBHOOKS.md) · 🇬🇷 [el](../../../el/docs/frameworks/WEBHOOKS.md) · 🇪🇸 [es](../../../es/docs/frameworks/WEBHOOKS.md) · 🇪🇪 [et](../../../et/docs/frameworks/WEBHOOKS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/WEBHOOKS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/WEBHOOKS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/WEBHOOKS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/WEBHOOKS.md) · 🇮🇱 [he](../../../he/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/WEBHOOKS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/WEBHOOKS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/WEBHOOKS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/WEBHOOKS.md) · 🇮🇩 [id](../../../id/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/WEBHOOKS.md) · 🇮🇹 [it](../../../it/docs/frameworks/WEBHOOKS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/WEBHOOKS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/WEBHOOKS.md) · 🇰🇭 [km](../../../km/docs/frameworks/WEBHOOKS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/WEBHOOKS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/WEBHOOKS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/WEBHOOKS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/WEBHOOKS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/WEBHOOKS.md) · 🇲🇲 [my](../../../my/docs/frameworks/WEBHOOKS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/WEBHOOKS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/WEBHOOKS.md) · 🇳🇴 [no](../../../no/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [or](../../../or/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/WEBHOOKS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/WEBHOOKS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/WEBHOOKS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/WEBHOOKS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/WEBHOOKS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/WEBHOOKS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/WEBHOOKS.md) · 🇱🇰 [si](../../../si/docs/frameworks/WEBHOOKS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/WEBHOOKS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/WEBHOOKS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/WEBHOOKS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/WEBHOOKS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [te](../../../te/docs/frameworks/WEBHOOKS.md) · 🇹🇭 [th](../../../th/docs/frameworks/WEBHOOKS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/WEBHOOKS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/WEBHOOKS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/WEBHOOKS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/WEBHOOKS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/WEBHOOKS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/WEBHOOKS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/WEBHOOKS.md)

---

> **ಸತ್ಯದ ಮೂಲ:** `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`, `src/app/api/webhooks/`
> **ಕೊನೆಯದಾಗಿ ನವೀಕರಿಸಿದ್ದು:** 2026-06-28 — v3.8.40

ಪ್ಲಾಟ್ಫಾರ್ಮ್ ಈವೆಂಟ್ಗಳು ಸಂಭವಿಸಿದಾಗ OmniRoute HTTP ವೆಬ್ಹುಕ್ಗಳನ್ನು ಪ್ರಚೋದಿಸಬಹುದು. Slack, PagerDuty, Datadog, ಆಂತರಿಕ ಎಚ್ಚರಿಕೆ ಸೇವೆಗಳು ಅಥವಾ ಯಾವುದೇ HTTP ರಿಸೀವರ್ನೊಂದಿಗೆ ಸಂಯೋಜಿಸಲು ಅವುಗಳನ್ನು ಬಳಸಿ.

ಡಿಸ್ಪ್ಯಾಚರ್ ಪ್ರತಿ ಡೆಲಿವರಿಗೆ HMAC-SHA256 ಮೂಲಕ ಸಹಿ ಮಾಡುತ್ತದೆ, ತಾತ್ಕಾಲಿಕ ವೈಫಲ್ಯಗಳಾದಾಗ ಮರುಪ್ರಯತ್ನಿಸುತ್ತದೆ, ಪ್ರತಿ ವೆಬ್ಹುಕ್ನ ಡೆಲಿವರಿ ಸ್ಥಿತಿಯನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡುತ್ತದೆ ಮತ್ತು ನಿರಂತರವಾಗಿ ವಿಫಲಗೊಳ್ಳುವ ಎಂಡ್ಪಾಯಿಂಟ್ಗಳನ್ನು ಸ್ವಯಂಚಾಲಿತವಾಗಿ ನಿಷ್ಕ್ರಿಯಗೊಳಿಸುತ್ತದೆ.

## ಬೆಂಬಲಿತ ಈವೆಂಟ್ಗಳು

`WebhookEvent` ಪ್ರಕಾರವು (`src/lib/webhooks/eventDescriptions.ts`, ಇದನ್ನು `src/lib/webhookDispatcher.ts` ಬಳಸುತ್ತದೆ) ಪ್ರಸ್ತುತ ನಿಖರವಾಗಿ ನಾಲ್ಕು ಈವೆಂಟ್ಗಳನ್ನು ಮಾದರಿಯಾಗಿಸುತ್ತದೆ:

| ಈವೆಂಟ್              | ಪ್ರಚೋದನೆಯಾಗುವ ಸಂದರ್ಭ                                                   |
| ------------------- | ---------------------------------------------------------------------- |
| `request.completed` | ಪ್ರಾಕ್ಸಿ ಮಾಡಲಾದ ವಿನಂತಿಯು ಯಶಸ್ವಿಯಾಗಿ ಪೂರ್ಣಗೊಂಡಾಗ                        |
| `request.failed`    | ಎಲ್ಲಾ ಮರುಪ್ರಯತ್ನಗಳು/ಫಾಲ್ಬ್ಯಾಕ್ ನಂತರ ಪ್ರಾಕ್ಸಿ ಮಾಡಲಾದ ವಿನಂತಿಯು ವಿಫಲವಾದಾಗ |
| `quota.exceeded`    | API ಕೀಲಿಯು ಬಜೆಟ್/ಕೋಟಾ ಮಿತಿಯನ್ನು ದಾಟಿದಾಗ                                |
| `test.ping`         | ಪರೀಕ್ಷಾ ಎಂಡ್ಪಾಯಿಂಟ್ ಬಳಸುವ ಕೃತಕ ಈವೆಂಟ್                                  |

ಪ್ರತಿ ಈವೆಂಟ್ ಅನ್ನು ಸ್ವೀಕರಿಸಲು ಸಬ್ಸ್ಕ್ರಿಪ್ಶನ್ಗಳು ಅಕ್ಷರಶಃ `"*"` ಅನ್ನು ಸ್ವೀಕರಿಸುತ್ತವೆ. `events` ನಲ್ಲಿರುವ ಅಜ್ಞಾತ ಈವೆಂಟ್ ಹೆಸರುಗಳನ್ನು ಡಿಸ್ಪ್ಯಾಚ್ ಸಮಯದಲ್ಲಿ ನಿರ್ಲಕ್ಷಿಸಲಾಗುತ್ತದೆ.

> ಗಮನಿಸಿ: ಡಿಸ್ಪ್ಯಾಚರ್ API ಅನ್ನು ಸಂಪರ್ಕಿಸಲಾಗಿದೆ, ಆದರೆ ಕೆಲವು
> `test.ping` ಅಲ್ಲದ ಈವೆಂಟ್ಗಳ ಪ್ರೊಡಕ್ಷನ್ ಕಾಲ್ ಸೈಟ್ಗಳು ಇನ್ನೂ ಸೇರ್ಪಡೆಯಾಗುತ್ತಿವೆ. ನಿಮ್ಮ ಬಿಡುಗಡೆಯಲ್ಲಿ
> ಪ್ರಸ್ತುತ ಯಾವ ಪಥಗಳು ಡಿಸ್ಪ್ಯಾಚರ್ ಅನ್ನು ಆಹ್ವಾನಿಸುತ್ತವೆ ಎಂಬುದನ್ನು ನೋಡಲು `grep dispatchEvent` ಪರಿಶೀಲಿಸಿ.

## ವಾಸ್ತುಶಿಲ್ಪ

```
ಕಾಲರ್ (ಹ್ಯಾಂಡ್ಲರ್, ಸೇವೆ, ಮಾನಿಟರ್)
  dispatchEvent(event, data)            [src/lib/webhookDispatcher.ts]
    -> getEnabledWebhooks()             [src/lib/db/webhooks.ts]
    -> webhook.events ಆಧಾರದಲ್ಲಿ ಫಿಲ್ಟರ್ ಮಾಡಿ
    -> ಪ್ರತಿ ಹೊಂದಾಣಿಕೆಗೆ (ಸಮಾನಾಂತರವಾಗಿ):
       deliverWebhook(url, payload, secret)
         ಪೇಲೋಡ್ { event, timestamp, data } ನಿರ್ಮಿಸಿ
         HMAC-SHA256 ಮೂಲಕ ಬಾಡಿಗೆ ಸಹಿ ಮಾಡಿ (secret ಇದ್ದರೆ)
         10s ಸಮಯಮಿತಿಯೊಂದಿಗೆ POST ಮಾಡಿ
         5xx / ನೆಟ್ವರ್ಕ್ ದೋಷದ ಸಂದರ್ಭದಲ್ಲಿ ಗರಿಷ್ಠ 3 ಬಾರಿ ಮರುಪ್ರಯತ್ನಿಸಿ
       recordWebhookDelivery(id, status, success)
    -> disableWebhooksWithHighFailures(10)
```

ಕಾಲರ್ಗೆ ಡಿಸ್ಪ್ಯಾಚ್ ಫೈರ್-ಅಂಡ್-ಫರ್ಗೆಟ್ ರೀತಿಯದ್ದಾಗಿದೆ: `Promise.allSettled` ಪ್ರತಿ ವೆಬ್ಹುಕ್ನ ದೋಷಗಳನ್ನು ಒಳಗೇ ನಿರ್ವಹಿಸುತ್ತದೆ, ಆದ್ದರಿಂದ ಒಂದು ದೋಷಪೂರಿತ ರಿಸೀವರ್ ಇತರವುಗಳನ್ನು ನಿರ್ಬಂಧಿಸಲಾರದು.

## HMAC ಸಹಿ ಮಾಡುವಿಕೆ

ವೆಬ್ಹುಕ್ `secret` ಹೊಂದಿರುವಾಗ, OmniRoute JSON ಬಾಡಿಗೆ ಸಹಿ ಮಾಡಿ ಈ ಕೆಳಗಿನವುಗಳನ್ನು ಕಳುಹಿಸುತ್ತದೆ:

```
Content-Type: application/json
User-Agent: OmniRoute-Webhook/1.0
X-Webhook-Event: <event>
X-Webhook-Timestamp: <ISO-8601>
X-Webhook-Signature: sha256=<hex HMAC-SHA256(secret, body)>
```

> ಹೆಡರ್ ಹೆಸರುಗಳು `X-Webhook-*` ಪೂರ್ವಪ್ರತ್ಯಯವನ್ನು ಬಳಸುತ್ತವೆ (`X-OmniRoute-*` ಅಲ್ಲ). ಸಹಿಯ
> ಮೌಲ್ಯವು `sha256=<hex>` ಆಗಿದೆ — ಸಂಪೂರ್ಣ ಪೂರ್ವಪ್ರತ್ಯಯವನ್ನು ಪರಿಶೀಲಿಸಿ.

`createWebhook` ಅನ್ನು ಸೀಕ್ರೆಟ್ ಇಲ್ಲದೆ ಕರೆ ಮಾಡಿದರೆ, DB ಮಾಡ್ಯೂಲ್ ಒಂದನ್ನು
(`whsec_<48 hex>`) ರಚಿಸುತ್ತದೆ; ಆದ್ದರಿಂದ ಡೀಫಾಲ್ಟ್ ಆಗಿ ಎಲ್ಲಾ ವೆಬ್ಹುಕ್ಗಳಿಗೆ ಸಹಿ ಮಾಡಲಾಗುತ್ತದೆ.

### ರಿಸೀವರ್ನಲ್ಲಿ ಪರಿಶೀಲಿಸುವುದು

```typescript
import { createHmac, timingSafeEqual } from "node:crypto";

function verify(rawBody: string, signature: string, secret: string) {
  const expected = "sha256=" + createHmac("sha256", secret).update(rawBody).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}
```

ಯಾವುದೇ JSON ಪಾರ್ಸಿಂಗ್ ಮಾಡುವ ಮೊದಲು, ಯಾವಾಗಲೂ **ಕಚ್ಚಾ** ವಿನಂತಿ ಬಾಡಿ ವಿರುದ್ಧ ಪರಿಶೀಲಿಸಿ.

## ಮರುಪ್ರಯತ್ನ ಮತ್ತು ವೈಫಲ್ಯ ನೀತಿ

`deliverWebhook(url, payload, secret, maxRetries = 3)`:

- ಪ್ರತಿ ಪ್ರಯತ್ನಕ್ಕೆ 10 ಸೆಕೆಂಡುಗಳ ಕಾಲಾವಧಿ ಮಿತಿ (`AbortController`).
- HTTP 2xx ಅನ್ನು ಯಶಸ್ಸು ಎಂದು ಪರಿಗಣಿಸಲಾಗುತ್ತದೆ.
- HTTP 3xx/4xx ಅನ್ನು ಮರುಪ್ರಯತ್ನಿಸಲಾಗದ ಅಂತಿಮ ಸ್ಥಿತಿ ಎಂದು ಪರಿಗಣಿಸಲಾಗುತ್ತದೆ — ಇದನ್ನು ತಲುಪಿಸಲಾಗಿದೆ ಎಂದು ದಾಖಲಿಸಲಾಗುತ್ತದೆ ಮತ್ತು `success = res.ok` ಆಗಿರುತ್ತದೆ.
- HTTP 5xx ಮತ್ತು ನೆಟ್ವರ್ಕ್ ದೋಷಗಳಿಗೆ ಘಾತೀಯ ವಿಳಂಬದೊಂದಿಗೆ ಮರುಪ್ರಯತ್ನಿಸಲಾಗುತ್ತದೆ:
  `2^attempt * 1000 ms` (1s, 2s, 4s).
- `maxRetries` ನಂತರ, ವಿತರಣೆಯನ್ನು ವಿಫಲವಾಗಿದೆ ಎಂದು ದಾಖಲಿಸಲಾಗುತ್ತದೆ.
- ಪ್ರತಿ ವಿತರಣೆಯು `last_triggered_at`, `last_status` ಅನ್ನು ನವೀಕರಿಸುತ್ತದೆ ಮತ್ತು `failure_count` ಅನ್ನು ಮರುಹೊಂದಿಸುತ್ತದೆ ಅಥವಾ ಹೆಚ್ಚಿಸುತ್ತದೆ.
- ಪ್ರತಿ fan-out ನಂತರ dispatcher `disableWebhooksWithHighFailures(10)` ಅನ್ನು ಕರೆಯುತ್ತದೆ, ಆದ್ದರಿಂದ `failure_count >= 10` ಇರುವ ಯಾವುದೇ webhook ಅನ್ನು ಸ್ವಯಂಚಾಲಿತವಾಗಿ ನಿಷ್ಕ್ರಿಯಗೊಳಿಸಲಾಗುತ್ತದೆ.

## ಡೇಟಾಬೇಸ್

`webhooks` ಟೇಬಲ್ (migration `011_webhooks.sql`):

| ಕಾಲಮ್               | ಪ್ರಕಾರ  | ಟಿಪ್ಪಣಿಗಳು                                                          |
| ------------------- | ------- | ------------------------------------------------------------------- |
| `id`                | TEXT PK | UUID                                                                |
| `url`               | TEXT    | ಗಮ್ಯಸ್ಥಾನ URL                                                       |
| `events`            | TEXT    | JSON array; ಡೀಫಾಲ್ಟ್ `["*"]`                                        |
| `secret`            | TEXT    | HMAC secret (ನೀಡದಿದ್ದರೆ ಸ್ವಯಂಚಾಲಿತವಾಗಿ ರಚಿಸಲಾಗುತ್ತದೆ)               |
| `enabled`           | INT     | 0/1; ಡೀಫಾಲ್ಟ್ 1                                                     |
| `description`       | TEXT    | ಐಚ್ಛಿಕ ಮಾನವ-ಓದಬಲ್ಲ ಲೇಬಲ್                                            |
| `created_at`        | TEXT    | `datetime('now')`                                                   |
| `last_triggered_at` | TEXT    | ಪ್ರತಿ ವಿತರಣಾ ಪ್ರಯತ್ನದಲ್ಲೂ ನವೀಕರಿಸಲಾಗುತ್ತದೆ                          |
| `last_status`       | INT     | ಕೊನೆಯ ಪ್ರಯತ್ನದ HTTP ಸ್ಥಿತಿ (0 = ನೆಟ್ವರ್ಕ್)                          |
| `failure_count`     | INT     | ಯಶಸ್ಸಿನ ಸಂದರ್ಭದಲ್ಲಿ 0 ಗೆ ಮರುಹೊಂದಿಸಲಾಗುತ್ತದೆ, ವೈಫಲ್ಯದ ಸಂದರ್ಭದಲ್ಲಿ +1 |

ವಿತರಣಾ ಇತಿಹಾಸವನ್ನು ಮೀಸಲಾದ `webhook_deliveries` ಟೇಬಲ್ನಲ್ಲಿ ಉಳಿಸಲಾಗುತ್ತದೆ
(migration `069_webhook_deliveries.sql`, ಪ್ರತಿ ಪ್ರಯತ್ನದಲ್ಲೂ
`src/lib/db/webhookDeliveries.ts::insertDelivery` ಮೂಲಕ ಬರೆಯಲಾಗುತ್ತದೆ); ಇದರ ಜೊತೆಗೆ
`webhooks` ಸಾಲಿನಲ್ಲಿರುವ ಒಟ್ಟು ಕೌಂಟರ್ಗಳನ್ನೂ ನವೀಕರಿಸಲಾಗುತ್ತದೆ. Kind metadata (Slack / Discord /
Telegram / custom payload transformers) ಅನ್ನು `070_webhooks_kind_metadata.sql` ಮೂಲಕ ಸೇರಿಸಲಾಗಿದೆ.

## REST API

ಎಲ್ಲಾ endpointsಗಳಿಗೆ management auth (`requireManagementAuth`) ಅಗತ್ಯವಿದೆ.

| Endpoint                        | ವಿಧಾನ  | ವಿವರಣೆ                                       |
| ------------------------------- | ------ | -------------------------------------------- |
| `/api/webhooks`                 | GET    | webhooks ಪಟ್ಟಿ (secrets ಮರೆಮಾಡಲಾಗಿರುತ್ತವೆ)   |
| `/api/webhooks`                 | POST   | webhook ರಚಿಸಿ                                |
| `/api/webhooks/[id]`            | GET    | webhook ವಿವರ (ಸಂಪೂರ್ಣ secret)                |
| `/api/webhooks/[id]`            | PUT    | fields ನವೀಕರಿಸಿ                              |
| `/api/webhooks/[id]`            | DELETE | ತೆಗೆದುಹಾಕಿ                                   |
| `/api/webhooks/[id]/test`       | POST   | `test.ping` ಅನ್ನು ಕಳುಹಿಸಿ (ಮರುಪ್ರಯತ್ನಗಳಿಲ್ಲ) |
| `/api/webhooks/[id]/deliveries` | GET    | ಒಂದು webhookಗಾಗಿ ಇತ್ತೀಚಿನ ವಿತರಣಾ ಪ್ರಯತ್ನಗಳು  |
| `/api/webhooks/validate-url`    | POST   | ಪೂರ್ವ-ವಿನಂತಿ URL ಮೌಲ್ಯಮಾಪನ (SSRF ರಕ್ಷಣೆ)     |

ಪಟ್ಟಿ ಪುಟಗಳಲ್ಲಿ secret ಸೋರಿಕೆಯಾಗುವುದನ್ನು ತಪ್ಪಿಸಲು `GET /api/webhooks` ಅದನ್ನು
`<first 10 chars>...` ರೂಪದಲ್ಲಿ ಮರೆಮಾಡುತ್ತದೆ. ನಿಮಗೆ ನಿಜವಾಗಿಯೂ secret ಅಗತ್ಯವಿದ್ದಾಗ `[id]` GET ಅನ್ನು ಬಳಸಿ.

### webhook ರಚಿಸಿ

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

`secret` ಅನ್ನು ಬಿಟ್ಟಿದ್ದರೆ, server ಒಂದು `whsec_<hex>` secret ಅನ್ನು ರಚಿಸಿ
responseನಲ್ಲಿ ಅದನ್ನು ಹಿಂತಿರುಗಿಸುತ್ತದೆ.

### webhook ಪರೀಕ್ಷಿಸಿ

```bash
curl -X POST http://localhost:20128/api/webhooks/<id>/test \
  -H "Cookie: auth_token=..."
```

`{ delivered, status, error }` ಅನ್ನು ಹಿಂತಿರುಗಿಸುತ್ತದೆ. ಯಾವುದೇ ಮರುಪ್ರಯತ್ನಗಳನ್ನು ಮಾಡಲಾಗುವುದಿಲ್ಲ — receiver payload ಮತ್ತು signature ಅನ್ನು ಸ್ವೀಕರಿಸುತ್ತದೆಯೇ ಎಂಬುದನ್ನು ತ್ವರಿತವಾಗಿ ಪರಿಶೀಲಿಸಲು ಇದು ಉಪಯುಕ್ತವಾಗಿದೆ.

## ಡ್ಯಾಶ್ಬೋರ್ಡ್

`/dashboard/webhooks` ನಲ್ಲಿರುವ ಡ್ಯಾಶ್ಬೋರ್ಡ್ ಪುಟವು (ನೋಡಿ
`src/app/(dashboard)/dashboard/webhooks/page.tsx`) ಈ ಸೌಲಭ್ಯಗಳನ್ನು ಒದಗಿಸುತ್ತದೆ:

- ಈವೆಂಟ್ ಆಯ್ಕೆಕಾರದೊಂದಿಗೆ ವೆಬ್ಹುಕ್ಗಳನ್ನು ರಚಿಸುವುದು/ತಿದ್ದುಪಡಿ ಮಾಡುವುದು
- `enabled`, `failure_count`, ಮತ್ತು `last_status` ಆಧರಿಸಿದ ಸ್ಥಿತಿ ಸೂಚಕ (ಸಕ್ರಿಯ / ನಿಷ್ಕ್ರಿಯ / ದೋಷಪೂರಿತ)
- ಒಂದೇ ಕ್ಲಿಕ್ನಲ್ಲಿ ಪರೀಕ್ಷಾ ವಿತರಣೆ
- ಹಸ್ತಚಾಲಿತ ಸಕ್ರಿಯಗೊಳಿಸುವಿಕೆ/ನಿಷ್ಕ್ರಿಯಗೊಳಿಸುವಿಕೆ ಟಾಗಲ್

## ಪೇಲೋಡ್ ಉದಾಹರಣೆಗಳು

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

`test.ping` ಅಲ್ಲದ ಈವೆಂಟ್ಗಳ ಕ್ಷೇತ್ರ ರಚನೆಗಳನ್ನು ಅವುಗಳನ್ನು ಹೊರಸೂಸುವ ಕರೆ ಸ್ಥಳಗಳು
ವ್ಯಾಖ್ಯಾನಿಸುತ್ತವೆ; `data` ಆಬ್ಜೆಕ್ಟ್ ಅನ್ನು ಮುಂಬರುವ ಬದಲಾವಣೆಗಳೊಂದಿಗೆ ಹೊಂದಿಕೊಳ್ಳುವಂತೆ ಪರಿಗಣಿಸಿ (ಕ್ಷೇತ್ರಗಳನ್ನು ಸೇರಿಸಿ, ಅವುಗಳ
ಅನುಪಸ್ಥಿತಿಯನ್ನು ಅವಲಂಬಿಸಬೇಡಿ).

## ಉತ್ತಮ ಅಭ್ಯಾಸಗಳು

- **ಪ್ರತಿ ವಿತರಣೆಯಲ್ಲೂ ಸಹಿಯನ್ನು ಪರಿಶೀಲಿಸಿ** — ಕಚ್ಚಾ ಬಾಡಿಯ ವಿರುದ್ಧ ಪರಿಶೀಲಿಸುವುದರಿಂದ
  ನಿಮ್ಮ ವೆಬ್ಹುಕ್ URL ಅನ್ನು ಊಹಿಸುವ ಯಾರಾದರೂ ಕಳುಹಿಸಬಹುದಾದ ನಕಲಿ POST ವಿನಂತಿಗಳನ್ನು ತಡೆಯಬಹುದು.
- **~5 ಸೆಕೆಂಡುಗಳೊಳಗೆ 2xx ಪ್ರತಿಕ್ರಿಯಿಸಿ** — ಡಿಸ್ಪ್ಯಾಚರ್ 10 s ನಲ್ಲಿ ಸಮಯ ಮೀರುತ್ತದೆ. ನಿಧಾನಗತಿಯ
  ಸ್ವೀಕರಿಸುವವರು ಮರುಪ್ರಯತ್ನಗಳನ್ನು ಬಳಸಿಕೊಳ್ಳುತ್ತಾರೆ ಮತ್ತು `failure_count` ಅನ್ನು ಹೆಚ್ಚಿಸುತ್ತಾರೆ.
- **ಹ್ಯಾಂಡ್ಲರ್ಗಳನ್ನು ಐಡೆಂಪೊಟೆಂಟ್ ಆಗಿ ಮಾಡಿ** — ಮರುಪ್ರಯತ್ನಗಳು ಮತ್ತು ಕನಿಷ್ಠ-ಒಮ್ಮೆ ವಿತರಣೆ ಸೆಮ್ಯಾಂಟಿಕ್ಸ್ನಿಂದಾಗಿ
  ನಕಲುಗಳು ಸಂಭವಿಸಬಹುದು.
- **ಅಗತ್ಯವಿರುವಷ್ಟಕ್ಕೆ ಮಾತ್ರ ಚಂದಾದಾರರಾಗಿ** — ನೀವು ನಿಜವಾಗಿಯೂ ಬಳಸುವ ಈವೆಂಟ್ಗಳನ್ನು ಮಾತ್ರ ಪಟ್ಟಿ ಮಾಡಿ; `"*"` ನೀವು
  ನಿಯಂತ್ರಿಸದ ಸ್ವೀಕರಿಸುವವರ ವೆಚ್ಚವನ್ನು ಹೆಚ್ಚಿಸುತ್ತದೆ.
- **`failure_count` ಅನ್ನು ಗಮನಿಸಿ** — ಸತತ 10 ವೈಫಲ್ಯಗಳಾದಾಗ ಎಂಡ್ಪಾಯಿಂಟ್ಗಳು ಸ್ವಯಂಚಾಲಿತವಾಗಿ ನಿಷ್ಕ್ರಿಯಗೊಳ್ಳುತ್ತವೆ;
  ಸ್ವೀಕರಿಸುವವರ ಸಮಸ್ಯೆಯನ್ನು ಸರಿಪಡಿಸಿದ ನಂತರ `enabled: true` ಜೊತೆಗೆ `PUT /api/webhooks/[id]` ಅನ್ನು ಕರೆಯುವ ಮೂಲಕ ಮರುಹೊಂದಿಸಿ.
- **ಸೀಕ್ರೆಟ್ಗಳನ್ನು ನಿಯತಕಾಲಿಕವಾಗಿ ಬದಲಾಯಿಸಿ** — ಹೊಸ `secret` ಅನ್ನು `PUT` ಮಾಡಿ, ಹೊಸ ಮೌಲ್ಯವನ್ನು
  ಸ್ವೀಕರಿಸುವವರಿಗೆ ಡಿಪ್ಲಾಯ್ ಮಾಡಿ ಮತ್ತು ಪರೀಕ್ಷಾ ಎಂಡ್ಪಾಯಿಂಟ್ ಮೂಲಕ ದೃಢೀಕರಿಸಿ.

## ಇದನ್ನೂ ನೋಡಿ

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — ಸಂಪೂರ್ಣ ನಿರ್ವಹಣಾ API ವ್ಯಾಪ್ತಿ
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — `request.failed` ಮೂಲಕ ಗೋಚರಿಸುವ ಪೂರೈಕೆದಾರರ ವೈಫಲ್ಯಗಳ ಹಿಂದಿನ ಸರ್ಕ್ಯೂಟ್ ಬ್ರೇಕರ್ / ಕೂಲ್ಡೌನ್
  ಸೆಮ್ಯಾಂಟಿಕ್ಸ್
- ಮೂಲ: `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`
