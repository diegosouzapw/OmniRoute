# Webhooks (ଓଡ଼ିଆ)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/WEBHOOKS.md) · 🇪🇹 [am](../../../am/docs/frameworks/WEBHOOKS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/WEBHOOKS.md) · 🇦🇿 [az](../../../az/docs/frameworks/WEBHOOKS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/WEBHOOKS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/WEBHOOKS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/WEBHOOKS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/WEBHOOKS.md) · 🇩🇰 [da](../../../da/docs/frameworks/WEBHOOKS.md) · 🇩🇪 [de](../../../de/docs/frameworks/WEBHOOKS.md) · 🇬🇷 [el](../../../el/docs/frameworks/WEBHOOKS.md) · 🇪🇸 [es](../../../es/docs/frameworks/WEBHOOKS.md) · 🇪🇪 [et](../../../et/docs/frameworks/WEBHOOKS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/WEBHOOKS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/WEBHOOKS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/WEBHOOKS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/WEBHOOKS.md) · 🇮🇱 [he](../../../he/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/WEBHOOKS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/WEBHOOKS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/WEBHOOKS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/WEBHOOKS.md) · 🇮🇩 [id](../../../id/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/WEBHOOKS.md) · 🇮🇹 [it](../../../it/docs/frameworks/WEBHOOKS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/WEBHOOKS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/WEBHOOKS.md) · 🇰🇭 [km](../../../km/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/WEBHOOKS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/WEBHOOKS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/WEBHOOKS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/WEBHOOKS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/WEBHOOKS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/WEBHOOKS.md) · 🇲🇲 [my](../../../my/docs/frameworks/WEBHOOKS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/WEBHOOKS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/WEBHOOKS.md) · 🇳🇴 [no](../../../no/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/WEBHOOKS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/WEBHOOKS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/WEBHOOKS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/WEBHOOKS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/WEBHOOKS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/WEBHOOKS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/WEBHOOKS.md) · 🇱🇰 [si](../../../si/docs/frameworks/WEBHOOKS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/WEBHOOKS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/WEBHOOKS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/WEBHOOKS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/WEBHOOKS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [te](../../../te/docs/frameworks/WEBHOOKS.md) · 🇹🇭 [th](../../../th/docs/frameworks/WEBHOOKS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/WEBHOOKS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/WEBHOOKS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/WEBHOOKS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/WEBHOOKS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/WEBHOOKS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/WEBHOOKS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/WEBHOOKS.md)

---

> **ସତ୍ୟର ମୂଳ ଉତ୍ସ:** `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`, `src/app/api/webhooks/`
> **ଶେଷ ଅଦ୍ୟତନ:** 2026-06-28 — v3.8.40

OmniRoute ପ୍ଲାଟଫର୍ମ ଇଭେଣ୍ଟଗୁଡ଼ିକରେ HTTP ୱେବହୁକ୍ ପ୍ରେରଣ କରିପାରେ। Slack, PagerDuty, Datadog, ଆଭ୍ୟନ୍ତରୀଣ ସତର୍କୀକରଣ ସେବା କିମ୍ବା ଯେକୌଣସି HTTP ରିସିଭର୍ ସହ ଏକୀକରଣ କରିବା ପାଇଁ ସେଗୁଡ଼ିକୁ ବ୍ୟବହାର କରନ୍ତୁ।

ଡିସ୍ପାଚର୍ ପ୍ରତ୍ୟେକ ଡେଲିଭରିକୁ HMAC-SHA256 ଦ୍ୱାରା ସାଇନ୍ କରେ, ଅସ୍ଥାୟୀ ବିଫଳତାରେ ପୁନଃଚେଷ୍ଟା କରେ, ପ୍ରତ୍ୟେକ ୱେବହୁକ୍ର ଡେଲିଭରି ସ୍ଥିତି ଟ୍ରାକ୍ କରେ ଏବଂ ବାରମ୍ବାର ବିଫଳ ହେଉଥିବା ଏଣ୍ଡପଏଣ୍ଟଗୁଡ଼ିକୁ ସ୍ୱତଃ-ଅକ୍ଷମ କରେ।

## ସମର୍ଥିତ ଇଭେଣ୍ଟଗୁଡ଼ିକ

`WebhookEvent` ପ୍ରକାର (`src/lib/webhooks/eventDescriptions.ts`, ଯାହାକୁ `src/lib/webhookDispatcher.ts` ବ୍ୟବହାର କରେ) ବର୍ତ୍ତମାନ ଠିକ୍ ଚାରୋଟି ଇଭେଣ୍ଟକୁ ମଡେଲ୍ କରେ:

| ଇଭେଣ୍ଟ              | କେବେ ଘଟେ                                                              |
| ------------------- | --------------------------------------------------------------------- |
| `request.completed` | ଏକ ପ୍ରକ୍ସି କରାଯାଇଥିବା ଅନୁରୋଧ ସଫଳତାର ସହ ସମ୍ପୂର୍ଣ୍ଣ ହେଲେ                |
| `request.failed`    | ସମସ୍ତ ପୁନଃଚେଷ୍ଟା/ଫଲ୍ବ୍ୟାକ୍ ପରେ ଏକ ପ୍ରକ୍ସି କରାଯାଇଥିବା ଅନୁରୋଧ ବିଫଳ ହେଲେ |
| `quota.exceeded`    | ଏକ API କି ବଜେଟ୍/କୋଟା ସୀମା ଅତିକ୍ରମ କଲେ                                 |
| `test.ping`         | ପରୀକ୍ଷଣ ଏଣ୍ଡପଏଣ୍ଟ ଦ୍ୱାରା ବ୍ୟବହୃତ କୃତ୍ରିମ ଇଭେଣ୍ଟ                       |

ପ୍ରତ୍ୟେକ ଇଭେଣ୍ଟ ଗ୍ରହଣ କରିବା ପାଇଁ ସବ୍ସ୍କ୍ରିପ୍ସନ୍ଗୁଡ଼ିକ ଆକ୍ଷରିକ `"*"`କୁ ଗ୍ରହଣ କରେ। `events`ରେ ଥିବା ଅଜଣା ଇଭେଣ୍ଟ ନାମଗୁଡ଼ିକୁ ଡିସ୍ପାଚ୍ ସମୟରେ ଅଣଦେଖା କରାଯାଏ।

> ଟିପ୍ପଣୀ: ଡିସ୍ପାଚର୍ API ସଂଯୋଜିତ ଅଛି, କିନ୍ତୁ କେତେକ
> ଅଣ-`test.ping` ଇଭେଣ୍ଟ ପାଇଁ ପ୍ରଡକ୍ସନ୍ କଲ୍ ସାଇଟ୍ଗୁଡ଼ିକ ଏବେ ମଧ୍ୟ ଯୋଡ଼ାଯାଉଛି। ଆପଣଙ୍କ ରିଲିଜ୍ରେ
> କେଉଁ ପଥଗୁଡ଼ିକ ବର୍ତ୍ତମାନ ଡିସ୍ପାଚର୍କୁ ଆହ୍ୱାନ କରୁଛି ଦେଖିବାକୁ `grep dispatchEvent` ଯାଞ୍ଚ କରନ୍ତୁ।

## ସ୍ଥାପତ୍ୟ

```
ଆହ୍ୱାନକାରୀ (ହ୍ୟାଣ୍ଡଲର୍, ସେବା, ମନିଟର୍)
  dispatchEvent(event, data)            [src/lib/webhookDispatcher.ts]
    -> getEnabledWebhooks()             [src/lib/db/webhooks.ts]
    -> webhook.events ଅନୁସାରେ ଫିଲ୍ଟର୍ କରନ୍ତୁ
    -> ପ୍ରତ୍ୟେକ ମେଳ ପାଇଁ (ସମାନ୍ତରାଳ ଭାବେ):
       deliverWebhook(url, payload, secret)
         ପେଲୋଡ୍ { event, timestamp, data } ନିର୍ମାଣ କରନ୍ତୁ
         HMAC-SHA256 ଦ୍ୱାରା ବଡିକୁ ସାଇନ୍ କରନ୍ତୁ (secret ଥିଲେ)
         10s ଟାଇମ୍ଆଉଟ୍ ସହ POST କରନ୍ତୁ
         5xx / ନେଟୱର୍କ ତ୍ରୁଟିରେ 3 ଥର ପର୍ଯ୍ୟନ୍ତ ପୁନଃଚେଷ୍ଟା କରନ୍ତୁ
       recordWebhookDelivery(id, status, success)
    -> disableWebhooksWithHighFailures(10)
```

କଲର୍ ପାଇଁ ଡିସ୍ପାଚ୍ ହେଉଛି ଫାୟାର୍-ଆଣ୍ଡ୍-ଫର୍ଗେଟ୍: `Promise.allSettled` ପ୍ରତ୍ୟେକ ୱେବହୁକ୍ର ତ୍ରୁଟିଗୁଡ଼ିକୁ ଦମନ କରେ, ଫଳରେ ଗୋଟିଏ ଖରାପ ରିସିଭର୍ ଅନ୍ୟଗୁଡ଼ିକୁ ଅବରୋଧ କରିପାରେ ନାହିଁ।

## HMAC ସାଇନିଂ

କୌଣସି ୱେବହୁକ୍ରେ `secret` ଥିଲେ, OmniRoute JSON ବଡିକୁ ସାଇନ୍ କରେ ଏବଂ ନିମ୍ନଲିଖିତଗୁଡ଼ିକ ପଠାଏ:

```
Content-Type: application/json
User-Agent: OmniRoute-Webhook/1.0
X-Webhook-Event: <event>
X-Webhook-Timestamp: <ISO-8601>
X-Webhook-Signature: sha256=<hex HMAC-SHA256(secret, body)>
```

> ହେଡର୍ ନାମଗୁଡ଼ିକ `X-Webhook-*` ପ୍ରିଫିକ୍ସ ବ୍ୟବହାର କରେ (`X-OmniRoute-*` ନୁହେଁ)। ସିଗ୍ନେଚର୍
> ମୂଲ୍ୟ ହେଉଛି `sha256=<hex>` — ସମ୍ପୂର୍ଣ୍ଣ ପ୍ରିଫିକ୍ସକୁ ଯାଞ୍ଚ କରନ୍ତୁ।

ଯଦି `createWebhook`କୁ କୌଣସି ସିକ୍ରେଟ୍ ବିନା ଆହ୍ୱାନ କରାଯାଏ, DB ମଡ୍ୟୁଲ୍ ଗୋଟିଏ ସିକ୍ରେଟ୍ ସୃଷ୍ଟି କରେ
(`whsec_<48 hex>`), ତେଣୁ ଡିଫଲ୍ଟ ଭାବେ ସମସ୍ତ ୱେବହୁକ୍ ସାଇନ୍ କରାଯାଏ।

### ରିସିଭର୍ରେ ଯାଞ୍ଚ କରିବା

```typescript
import { createHmac, timingSafeEqual } from "node:crypto";

function verify(rawBody: string, signature: string, secret: string) {
  const expected = "sha256=" + createHmac("sha256", secret).update(rawBody).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}
```

କୌଣସି JSON ପାର୍ସିଂ ପୂର୍ବରୁ ସର୍ବଦା **raw** ଅନୁରୋଧ ବଡି ସହିତ ଯାଞ୍ଚ କରନ୍ତୁ।

## ପୁନଃପ୍ରୟାସ ଏବଂ ବିଫଳତା ନୀତି

`deliverWebhook(url, payload, secret, maxRetries = 3)`:

- ପ୍ରତ୍ୟେକ ପ୍ରୟାସ ପାଇଁ 10 ସେକେଣ୍ଡର ସମୟସୀମା (`AbortController`)।
- HTTP 2xx ସଫଳତା ଭାବେ ଗଣାଯାଏ।
- HTTP 3xx/4xx ଏକ ପୁନଃପ୍ରୟାସ-ଅଯୋଗ୍ୟ ଅନ୍ତିମ ସ୍ଥିତି ଭାବେ ଗଣାଯାଏ — `success = res.ok`
  ସହିତ ବିତରିତ ଭାବେ ରେକର୍ଡ କରାଯାଏ।
- HTTP 5xx ଏବଂ ନେଟୱର୍କ ତ୍ରୁଟିଗୁଡ଼ିକ ପାଇଁ ଏକ୍ସପୋନେନ୍ସିଆଲ୍ ବ୍ୟାକଅଫ୍ ସହିତ ପୁନଃପ୍ରୟାସ କରାଯାଏ:
  `2^attempt * 1000 ms` (1s, 2s, 4s)।
- `maxRetries` ପରେ, ବିତରଣଟି ବିଫଳ ଭାବେ ରେକର୍ଡ କରାଯାଏ।
- ପ୍ରତ୍ୟେକ ବିତରଣ `last_triggered_at`, `last_status` ଅଦ୍ୟତନ କରେ ଏବଂ
  `failure_count`କୁ ପୁନଃସେଟ୍ କିମ୍ବା ବୃଦ୍ଧି କରେ।
- ପ୍ରତ୍ୟେକ ଫ୍ୟାନ୍-ଆଉଟ୍ ପରେ ଡିସ୍ପାଚର୍ `disableWebhooksWithHighFailures(10)`କୁ କଲ୍ କରେ,
  ତେଣୁ `failure_count >= 10` ଥିବା ଯେକୌଣସି ୱେବହୁକ୍ ସ୍ୱୟଂଚାଳିତ ଭାବେ ଅକ୍ଷମ କରାଯାଏ।

## ଡାଟାବେସ୍

ଟେବୁଲ୍ `webhooks` (ମାଇଗ୍ରେସନ୍ `011_webhooks.sql`):

| ସ୍ତମ୍ଭ              | ପ୍ରକାର  | ଟିପ୍ପଣୀ                                                        |
| ------------------- | ------- | -------------------------------------------------------------- |
| `id`                | TEXT PK | UUID                                                           |
| `url`               | TEXT    | ଗନ୍ତବ୍ୟ URL                                                    |
| `events`            | TEXT    | JSON ଆରେ; ଡିଫଲ୍ଟ `["*"]`                                       |
| `secret`            | TEXT    | HMAC ସିକ୍ରେଟ୍ (ପ୍ରଦାନ କରାଯାଇ ନଥିଲେ ସ୍ୱୟଂଚାଳିତ ଭାବେ ସୃଷ୍ଟି ହୁଏ) |
| `enabled`           | INT     | 0/1; ଡିଫଲ୍ଟ 1                                                  |
| `description`       | TEXT    | ଇଚ୍ଛାଧୀନ ମାନବ-ପଠନୀୟ ଲେବଲ୍                                      |
| `created_at`        | TEXT    | `datetime('now')`                                              |
| `last_triggered_at` | TEXT    | ପ୍ରତ୍ୟେକ ବିତରଣ ପ୍ରୟାସରେ ଅଦ୍ୟତନ କରାଯାଏ                          |
| `last_status`       | INT     | ଶେଷ ପ୍ରୟାସର HTTP ସ୍ଥିତି (0 = ନେଟୱର୍କ)                          |
| `failure_count`     | INT     | ସଫଳତାରେ 0କୁ ପୁନଃସେଟ୍ ହୁଏ, ବିଫଳତାରେ +1                          |

ବିତରଣ ଇତିହାସ ଉତ୍ସର୍ଗୀକୃତ `webhook_deliveries` ଟେବୁଲ୍ରେ ସ୍ଥାୟୀ ଭାବେ ସଂରକ୍ଷିତ ହୁଏ
(ମାଇଗ୍ରେସନ୍ `069_webhook_deliveries.sql`, ପ୍ରତ୍ୟେକ ପ୍ରୟାସରେ
`src/lib/db/webhookDeliveries.ts::insertDelivery` ମାଧ୍ୟମରେ ଲେଖାଯାଏ), ଏହା ସହିତ
`webhooks` ଧାଡ଼ିର ସମଷ୍ଟିଗତ କାଉଣ୍ଟର୍ଗୁଡ଼ିକ ମଧ୍ୟ ରହେ। ପ୍ରକାର ମେଟାଡାଟା (Slack / Discord /
Telegram / କଷ୍ଟମ୍ ପେଲୋଡ୍ ଟ୍ରାନ୍ସଫର୍ମର୍ଗୁଡ଼ିକ) `070_webhooks_kind_metadata.sql` ଦ୍ୱାରା ଯୋଡ଼ାଯାଇଥିଲା।

## REST API

ସମସ୍ତ ଏଣ୍ଡପଏଣ୍ଟ ପାଇଁ ପରିଚାଳନା ପ୍ରମାଣୀକରଣ (`requireManagementAuth`) ଆବଶ୍ୟକ।

| ଏଣ୍ଡପଏଣ୍ଟ                       | ପଦ୍ଧତି | ବର୍ଣ୍ଣନା                                                       |
| ------------------------------- | ------ | -------------------------------------------------------------- |
| `/api/webhooks`                 | GET    | ୱେବହୁକ୍ଗୁଡ଼ିକର ତାଲିକା ଦେଖାନ୍ତୁ (ସିକ୍ରେଟ୍ଗୁଡ଼ିକ ମାସ୍କ କରାଯାଇଛି) |
| `/api/webhooks`                 | POST   | ୱେବହୁକ୍ ସୃଷ୍ଟି କରନ୍ତୁ                                          |
| `/api/webhooks/[id]`            | GET    | ୱେବହୁକ୍ ବିବରଣୀ (ସମ୍ପୂର୍ଣ୍ଣ ସିକ୍ରେଟ୍)                           |
| `/api/webhooks/[id]`            | PUT    | ଫିଲ୍ଡଗୁଡ଼ିକ ଅଦ୍ୟତନ କରନ୍ତୁ                                      |
| `/api/webhooks/[id]`            | DELETE | ଅପସାରଣ କରନ୍ତୁ                                                  |
| `/api/webhooks/[id]/test`       | POST   | ଏକ `test.ping` ପ୍ରେରଣ କରନ୍ତୁ (କୌଣସି ପୁନଃପ୍ରୟାସ ନାହିଁ)          |
| `/api/webhooks/[id]/deliveries` | GET    | ଗୋଟିଏ ୱେବହୁକ୍ର ସାମ୍ପ୍ରତିକ ବିତରଣ ପ୍ରୟାସଗୁଡ଼ିକ                   |
| `/api/webhooks/validate-url`    | POST   | ପୂର୍ବ-ଉଡ଼ାଣ URL ବୈଧତା ଯାଞ୍ଚ (SSRF ସୁରକ୍ଷା)                     |

ତାଲିକା ପୃଷ୍ଠାଗୁଡ଼ିକରେ ସିକ୍ରେଟ୍ ଫାଶ ହେବା ଏଡ଼ାଇବା ପାଇଁ `GET /api/webhooks` ସିକ୍ରେଟ୍କୁ
`<first 10 chars>...` ଭାବେ ମାସ୍କ କରେ। ପ୍ରକୃତରେ ସିକ୍ରେଟ୍ ଆବଶ୍ୟକ ହେଲେ `[id]` GET ବ୍ୟବହାର କରନ୍ତୁ।

### ୱେବହୁକ୍ ସୃଷ୍ଟି କରନ୍ତୁ

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

`secret` ବାଦ ଦିଆଗଲେ, ସର୍ଭର୍ ଏକ `whsec_<hex>` ସିକ୍ରେଟ୍ ସୃଷ୍ଟି କରେ ଏବଂ
ପ୍ରତିକ୍ରିୟାରେ ତାହା ଫେରାଏ।

### ୱେବହୁକ୍ ପରୀକ୍ଷା କରନ୍ତୁ

```bash
curl -X POST http://localhost:20128/api/webhooks/<id>/test \
  -H "Cookie: auth_token=..."
```

`{ delivered, status, error }` ଫେରାଏ। କୌଣସି ପୁନଃପ୍ରୟାସ କରାଯାଏ ନାହିଁ — ରିସିଭର୍ ପେଲୋଡ୍ ଏବଂ ସ୍ୱାକ୍ଷର ଗ୍ରହଣ କରୁଛି କି ନାହିଁ ଶୀଘ୍ର ଯାଞ୍ଚ କରିବା ପାଇଁ ଏହା ଉପଯୋଗୀ।

## ଡ୍ୟାଶବୋର୍ଡ

`/dashboard/webhooks` ଠାରେ ଥିବା ଡ୍ୟାଶବୋର୍ଡ ପୃଷ୍ଠା (`src/app/(dashboard)/dashboard/webhooks/page.tsx` ଦେଖନ୍ତୁ) ନିମ୍ନଲିଖିତ ସୁବିଧା ପ୍ରଦାନ କରେ:

- ଇଭେଣ୍ଟ ପିକର୍ ସହିତ ୱେବହୁକ୍ ସୃଷ୍ଟି/ସମ୍ପାଦନ
- `enabled`, `failure_count`, ଏବଂ `last_status` ଆଧାରିତ ସ୍ଥିତି ସୂଚକ (ସକ୍ରିୟ / ନିଷ୍କ୍ରିୟ / ତ୍ରୁଟିଯୁକ୍ତ)
- ଏକ-କ୍ଲିକ୍ ପରୀକ୍ଷାମୂଳକ ଡେଲିଭରି
- ମାନୁଆଲ୍ ସକ୍ଷମ/ଅକ୍ଷମ ଟଗଲ୍

## ପେଲୋଡ୍ ଉଦାହରଣ

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

`test.ping` ବ୍ୟତୀତ ଅନ୍ୟ ଇଭେଣ୍ଟଗୁଡ଼ିକ ପାଇଁ ଫିଲ୍ଡର ଗଠନ ସେଗୁଡ଼ିକୁ ନିର୍ଗତ କରୁଥିବା କଲ୍ ସାଇଟ୍ଗୁଡ଼ିକ ଦ୍ୱାରା ନିର୍ଦ୍ଧାରିତ; `data` ଅବଜେକ୍ଟକୁ ଫରୱାର୍ଡ-କମ୍ପାଟିବଲ୍ ଭାବେ ବିବେଚନା କରନ୍ତୁ (ଫିଲ୍ଡ ଯୋଡ଼ନ୍ତୁ, ଅନୁପସ୍ଥିତି ଉପରେ ନିର୍ଭର କରନ୍ତୁ ନାହିଁ)।

## ସର୍ବୋତ୍ତମ ପ୍ରଚଳନ

- **ପ୍ରତ୍ୟେକ ଡେଲିଭରିରେ କଞ୍ଚା ବଡି ବିପକ୍ଷରେ ସ୍ୱାକ୍ଷର ଯାଞ୍ଚ କରନ୍ତୁ** — ଏହା ଆପଣଙ୍କ ୱେବହୁକ୍ URL ଅନୁମାନ କରିପାରୁଥିବା ଯେକୌଣସି ବ୍ୟକ୍ତିଙ୍କ ଦ୍ୱାରା ନକଲି POST ପଠାଯିବାକୁ ପ୍ରତିରୋଧ କରେ।
- **~5 ସେକେଣ୍ଡ ମଧ୍ୟରେ 2xx ସହିତ ପ୍ରତିକ୍ରିୟା ଦିଅନ୍ତୁ** — ଡିସ୍ପାଚର୍ 10 s ପରେ ଟାଇମ୍ ଆଉଟ୍ ହୁଏ। ଧୀର ରିସିଭର୍ଗୁଡ଼ିକ ପୁନଃପ୍ରୟାସ ବ୍ୟୟ କରିବେ ଏବଂ `failure_count` ବଢ଼ାଇବେ।
- **ହ୍ୟାଣ୍ଡଲର୍ଗୁଡ଼ିକୁ ଆଇଡେମ୍ପୋଟେଣ୍ଟ କରନ୍ତୁ** — ପୁନଃପ୍ରୟାସ ଏବଂ ଅତିକମରେ-ଥରେ-ଡେଲିଭରି ଅର୍ଥତତ୍ତ୍ୱ କାରଣରୁ ଡୁପ୍ଲିକେଟ୍ ସମ୍ଭବ।
- **ସର୍ବନିମ୍ନ ସବ୍ସ୍କ୍ରାଇବ୍ କରନ୍ତୁ** — କେବଳ ଆପଣ ବାସ୍ତବରେ ବ୍ୟବହାର କରୁଥିବା ଇଭେଣ୍ଟଗୁଡ଼ିକୁ ତାଲିକାଭୁକ୍ତ କରନ୍ତୁ; `"*"` ଆପଣ ନିୟନ୍ତ୍ରଣ କରୁନଥିବା ରିସିଭର୍ଗୁଡ଼ିକରେ ଖର୍ଚ୍ଚ ବଢ଼ାଇବ।
- **`failure_count` ଉପରେ ନଜର ରଖନ୍ତୁ** — କ୍ରମାଗତ 10ଟି ବିଫଳତା ପରେ ଏଣ୍ଡପଏଣ୍ଟଗୁଡ଼ିକ ସ୍ୱୟଂଚାଳିତ ଭାବେ ଅକ୍ଷମ ହୁଅନ୍ତି; ରିସିଭର୍କୁ ଠିକ୍ କରିବା ପରେ `enabled: true` ସହିତ `PUT /api/webhooks/[id]` କଲ୍ କରି ପୁନଃସେଟ୍ କରନ୍ତୁ।
- **ନିୟମିତ ଭାବେ ସିକ୍ରେଟ୍ଗୁଡ଼ିକୁ ରୋଟେଟ୍ କରନ୍ତୁ** — ଏକ ନୂତନ `secret`କୁ `PUT` କରନ୍ତୁ, ନୂତନ ମୂଲ୍ୟକୁ ରିସିଭର୍ରେ ଡିପ୍ଲୟ କରନ୍ତୁ, ଏବଂ ପରୀକ୍ଷା ଏଣ୍ଡପଏଣ୍ଟ ମାଧ୍ୟମରେ ନିଶ୍ଚିତ କରନ୍ତୁ।

## ଏହା ମଧ୍ୟ ଦେଖନ୍ତୁ

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — ସମ୍ପୂର୍ଣ୍ଣ ପରିଚାଳନା API ପରିସର
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — `request.failed` ମାଧ୍ୟମରେ ପ୍ରକାଶିତ ପ୍ରଦାନକାରୀ ବିଫଳତା ପଛରେ ଥିବା ସର୍କିଟ୍ ବ୍ରେକର୍ / କୁଲ୍ଡାଉନ୍ ଅର୍ଥତତ୍ତ୍ୱ
- ଉତ୍ସ: `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`
