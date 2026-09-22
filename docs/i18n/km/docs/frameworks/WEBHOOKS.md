# Webhooks (ខ្មែរ)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/WEBHOOKS.md) · 🇪🇹 [am](../../../am/docs/frameworks/WEBHOOKS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/WEBHOOKS.md) · 🇦🇿 [az](../../../az/docs/frameworks/WEBHOOKS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/WEBHOOKS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/WEBHOOKS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/WEBHOOKS.md) · 🇩🇰 [da](../../../da/docs/frameworks/WEBHOOKS.md) · 🇩🇪 [de](../../../de/docs/frameworks/WEBHOOKS.md) · 🇬🇷 [el](../../../el/docs/frameworks/WEBHOOKS.md) · 🇪🇸 [es](../../../es/docs/frameworks/WEBHOOKS.md) · 🇪🇪 [et](../../../et/docs/frameworks/WEBHOOKS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/WEBHOOKS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/WEBHOOKS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/WEBHOOKS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/WEBHOOKS.md) · 🇮🇱 [he](../../../he/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/WEBHOOKS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/WEBHOOKS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/WEBHOOKS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/WEBHOOKS.md) · 🇮🇩 [id](../../../id/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/WEBHOOKS.md) · 🇮🇹 [it](../../../it/docs/frameworks/WEBHOOKS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/WEBHOOKS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/WEBHOOKS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/WEBHOOKS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/WEBHOOKS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/WEBHOOKS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/WEBHOOKS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/WEBHOOKS.md) · 🇲🇲 [my](../../../my/docs/frameworks/WEBHOOKS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/WEBHOOKS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/WEBHOOKS.md) · 🇳🇴 [no](../../../no/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [or](../../../or/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/WEBHOOKS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/WEBHOOKS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/WEBHOOKS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/WEBHOOKS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/WEBHOOKS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/WEBHOOKS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/WEBHOOKS.md) · 🇱🇰 [si](../../../si/docs/frameworks/WEBHOOKS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/WEBHOOKS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/WEBHOOKS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/WEBHOOKS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/WEBHOOKS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [te](../../../te/docs/frameworks/WEBHOOKS.md) · 🇹🇭 [th](../../../th/docs/frameworks/WEBHOOKS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/WEBHOOKS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/WEBHOOKS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/WEBHOOKS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/WEBHOOKS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/WEBHOOKS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/WEBHOOKS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/WEBHOOKS.md)

---

> **ប្រភពយោងចម្បង:** `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`, `src/app/api/webhooks/`
> **បានធ្វើបច្ចុប្បន្នភាពចុងក្រោយ:** 2026-06-28 — v3.8.40

OmniRoute អាចបញ្ជូន HTTP webhooks នៅពេលមានព្រឹត្តិការណ៍លើវេទិកា។ ប្រើពួកវាដើម្បីធ្វើសមាហរណកម្មជាមួយ
Slack, PagerDuty, Datadog, សេវាជូនដំណឹងផ្ទៃក្នុង ឬកម្មវិធីទទួល HTTP ណាមួយ។

កម្មវិធីបញ្ជូនចុះហត្ថលេខាលើការបញ្ជូននីមួយៗដោយប្រើ HMAC-SHA256 ព្យាយាមម្តងទៀតនៅពេលមាន
ការបរាជ័យបណ្តោះអាសន្ន តាមដានស្ថានភាពល្អប្រសើរនៃការបញ្ជូនសម្រាប់ webhook នីមួយៗ និងបិទ endpoint
ដោយស្វ័យប្រវត្តិ ប្រសិនបើវាបន្តបរាជ័យ។

## ព្រឹត្តិការណ៍ដែលគាំទ្រ

ប្រភេទ `WebhookEvent` (`src/lib/webhooks/eventDescriptions.ts` ដែលត្រូវបានប្រើដោយ `src/lib/webhookDispatcher.ts`) បច្ចុប្បន្នកំណត់គំរូព្រឹត្តិការណ៍ចំនួនបួនយ៉ាងជាក់លាក់៖

| ព្រឹត្តិការណ៍       | កើតឡើងនៅពេល                                                                        |
| ------------------- | ---------------------------------------------------------------------------------- |
| `request.completed` | សំណើដែលបានធ្វើប្រូកស៊ីបញ្ចប់ដោយជោគជ័យ                                              |
| `request.failed`    | សំណើដែលបានធ្វើប្រូកស៊ីបរាជ័យ បន្ទាប់ពីការព្យាយាមម្តងទៀត/ការប្រើជម្រើសបម្រុងទាំងអស់ |
| `quota.exceeded`    | API key មួយឆ្លងកាត់កម្រិតថវិកា/កូតា                                                |
| `test.ping`         | ព្រឹត្តិការណ៍សិប្បនិម្មិតដែលប្រើដោយ endpoint សាកល្បង                               |

ការជាវទទួលយកតម្លៃអក្សរត្រង់ `"*"` ដើម្បីទទួលបានគ្រប់ព្រឹត្តិការណ៍។ ឈ្មោះព្រឹត្តិការណ៍
ដែលមិនស្គាល់នៅក្នុង `events` នឹងត្រូវបានមិនអើពើនៅពេលបញ្ជូន។

> ចំណាំ៖ API របស់កម្មវិធីបញ្ជូនត្រូវបានតភ្ជាប់រួចហើយ ប៉ុន្តែទីតាំងហៅប្រើក្នុង production សម្រាប់
> ព្រឹត្តិការណ៍មួយចំនួនក្រៅពី `test.ping` នៅតែកំពុងត្រូវបានបន្ថែម។ ពិនិត្យ `grep dispatchEvent` ដើម្បីមើល
> ថា path ណាខ្លះបច្ចុប្បន្នហៅប្រើកម្មវិធីបញ្ជូននៅក្នុង release របស់អ្នក។

## ស្ថាបត្យកម្ម

```
អ្នកហៅ (handler, service, monitor)
  dispatchEvent(event, data)            [src/lib/webhookDispatcher.ts]
    -> getEnabledWebhooks()             [src/lib/db/webhooks.ts]
    -> ត្រងតាម webhook.events
    -> សម្រាប់លទ្ធផលដែលត្រូវគ្នានីមួយៗ (ដំណើរការស្របគ្នា):
       deliverWebhook(url, payload, secret)
         បង្កើត payload { event, timestamp, data }
         ចុះហត្ថលេខាលើ body ដោយប្រើ HMAC-SHA256 (ប្រសិនបើមាន secret)
         POST ជាមួយ timeout 10 វិនាទី
         ព្យាយាមឡើងវិញរហូតដល់ 3 ដង នៅពេលមាន 5xx / កំហុសបណ្ដាញ
       recordWebhookDelivery(id, status, success)
    -> disableWebhooksWithHighFailures(10)
```

ការបញ្ជូនមានលក្ខណៈផ្ញើហើយមិនរង់ចាំសម្រាប់អ្នកហៅ៖ `Promise.allSettled` មិនបញ្ជូនបន្ត
កំហុសរបស់ webhook នីមួយៗ ដូច្នេះកម្មវិធីទទួលដែលមានបញ្ហាមួយមិនអាចរារាំងកម្មវិធីទទួលផ្សេងទៀតបានទេ។

## ការចុះហត្ថលេខា HMAC

នៅពេល webhook មួយមាន `secret` OmniRoute ចុះហត្ថលេខាលើ JSON body ហើយផ្ញើ៖

```
Content-Type: application/json
User-Agent: OmniRoute-Webhook/1.0
X-Webhook-Event: <event>
X-Webhook-Timestamp: <ISO-8601>
X-Webhook-Signature: sha256=<hex HMAC-SHA256(secret, body)>
```

> ឈ្មោះ header ប្រើបុព្វបទ `X-Webhook-*` (មិនមែន `X-OmniRoute-*`)។ តម្លៃហត្ថលេខា
> គឺ `sha256=<hex>` — សូមផ្ទៀងផ្ទាត់បុព្វបទពេញលេញ។

ប្រសិនបើ `createWebhook` ត្រូវបានហៅដោយគ្មាន secret ម៉ូឌុល DB នឹងបង្កើតវាមួយ
(`whsec_<48 hex>`) ដូច្នេះ webhook ទាំងអស់ត្រូវបានចុះហត្ថលេខាតាមលំនាំដើម។

### ការផ្ទៀងផ្ទាត់នៅផ្នែកអ្នកទទួល

```typescript
import { createHmac, timingSafeEqual } from "node:crypto";

function verify(rawBody: string, signature: string, secret: string) {
  const expected = "sha256=" + createHmac("sha256", secret).update(rawBody).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}
```

ត្រូវផ្ទៀងផ្ទាត់ជានិច្ចដោយប្រើ body សំណើ **ដើម** មុនពេលធ្វើការបំបែក JSON ណាមួយ។

## គោលការណ៍សាកល្បងឡើងវិញ និងការបរាជ័យ

`deliverWebhook(url, payload, secret, maxRetries = 3)`:

- អស់ពេលកំណត់ 10 វិនាទីក្នុងមួយការសាកល្បង (`AbortController`)។
- HTTP 2xx ត្រូវបានចាត់ទុកថាជោគជ័យ។
- HTTP 3xx/4xx ត្រូវបានចាត់ទុកថាជាស្ថានភាពចុងក្រោយដែលមិនអាចសាកល្បងឡើងវិញបាន — ត្រូវបានកត់ត្រាថាបានបញ្ជូន
  ដោយមាន `success = res.ok`។
- HTTP 5xx និងកំហុសបណ្ដាញត្រូវបានសាកល្បងឡើងវិញដោយប្រើរយៈពេលរង់ចាំកើនឡើងទ្វេដង:
  `2^attempt * 1000 ms` (1s, 2s, 4s)។
- បន្ទាប់ពី `maxRetries` ការបញ្ជូនត្រូវបានកត់ត្រាថាបរាជ័យ។
- ការបញ្ជូននីមួយៗធ្វើបច្ចុប្បន្នភាព `last_triggered_at`, `last_status` ហើយកំណត់
  `failure_count` ឡើងវិញ ឬបង្កើនតម្លៃរបស់វា។
- កម្មវិធីចែកចាយហៅ `disableWebhooksWithHighFailures(10)` បន្ទាប់ពីការចែកបញ្ជូននីមួយៗ
  ដូច្នេះ webhook ណាមួយដែលមាន `failure_count >= 10` នឹងត្រូវបានបិទដោយស្វ័យប្រវត្តិ។

## មូលដ្ឋានទិន្នន័យ

តារាង `webhooks` (ការធ្វើចំណាកស្រុក `011_webhooks.sql`):

| ជួរឈរ               | ប្រភេទ  | កំណត់សម្គាល់                                                 |
| ------------------- | ------- | ------------------------------------------------------------ |
| `id`                | TEXT PK | UUID                                                         |
| `url`               | TEXT    | URL គោលដៅ                                                    |
| `events`            | TEXT    | អារេ JSON; លំនាំដើម `["*"]`                                  |
| `secret`            | TEXT    | កូដសម្ងាត់ HMAC (បង្កើតដោយស្វ័យប្រវត្តិ ប្រសិនបើមិនបានផ្ដល់) |
| `enabled`           | INT     | 0/1; លំនាំដើមគឺ 1                                            |
| `description`       | TEXT    | ស្លាកសម្គាល់ដែលអាចជ្រើសរើសបាន                                |
| `created_at`        | TEXT    | `datetime('now')`                                            |
| `last_triggered_at` | TEXT    | ធ្វើបច្ចុប្បន្នភាពរាល់ពេលសាកល្បងបញ្ជូន                       |
| `last_status`       | INT     | ស្ថានភាព HTTP នៃការសាកល្បងចុងក្រោយ (0 = បណ្ដាញ)              |
| `failure_count`     | INT     | កំណត់ឡើងវិញជា 0 ពេលជោគជ័យ, +1 ពេលបរាជ័យ                      |

ប្រវត្តិការបញ្ជូនត្រូវបានរក្សាទុកក្នុងតារាង `webhook_deliveries` ដែលបង្កើតឡើងសម្រាប់គោលបំណងនេះ
(ការធ្វើចំណាកស្រុក `069_webhook_deliveries.sql`, សរសេរតាមរយៈ
`src/lib/db/webhookDeliveries.ts::insertDelivery` រាល់ពេលសាកល្បង) បន្ថែមពីលើ
តួលេខសរុបនៅក្នុងជួរដេក `webhooks`។ ទិន្នន័យមេតាអំពីប្រភេទ (Slack / Discord /
Telegram / កម្មវិធីបំប្លែង payload ផ្ទាល់ខ្លួន) ត្រូវបានបន្ថែមដោយ `070_webhooks_kind_metadata.sql`។

## REST API

endpoint ទាំងអស់តម្រូវឱ្យមានការផ្ទៀងផ្ទាត់សិទ្ធិគ្រប់គ្រង (`requireManagementAuth`)។

| Endpoint                        | វិធីសាស្ត្រ | ការពិពណ៌នា                                   |
| ------------------------------- | ----------- | -------------------------------------------- |
| `/api/webhooks`                 | GET         | រាយបញ្ជី webhook (កូដសម្ងាត់ត្រូវបានបិទបាំង) |
| `/api/webhooks`                 | POST        | បង្កើត webhook                               |
| `/api/webhooks/[id]`            | GET         | ព័ត៌មានលម្អិតរបស់ webhook (កូដសម្ងាត់ពេញលេញ) |
| `/api/webhooks/[id]`            | PUT         | ធ្វើបច្ចុប្បន្នភាពវាល                        |
| `/api/webhooks/[id]`            | DELETE      | លុបចេញ                                       |
| `/api/webhooks/[id]/test`       | POST        | បញ្ជូន `test.ping` មួយ (មិនសាកល្បងឡើងវិញ)    |
| `/api/webhooks/[id]/deliveries` | GET         | ការសាកល្បងបញ្ជូនថ្មីៗសម្រាប់ webhook មួយ     |
| `/api/webhooks/validate-url`    | POST        | ផ្ទៀងផ្ទាត់ URL ជាមុន (ការពារ SSRF)          |

`GET /api/webhooks` បិទបាំងកូដសម្ងាត់ជា `<first 10 chars>...` ដើម្បីជៀសវាងការលេចធ្លាយ
នៅលើទំព័ររាយបញ្ជី។ ប្រើ `[id]` GET នៅពេលអ្នកពិតជាត្រូវការកូដសម្ងាត់។

### បង្កើត webhook

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

ប្រសិនបើមិនបានបញ្ចូល `secret` ម៉ាស៊ីនមេនឹងបង្កើតកូដសម្ងាត់ `whsec_<hex>` ហើយត្រឡប់
វានៅក្នុងការឆ្លើយតប។

### សាកល្បង webhook

```bash
curl -X POST http://localhost:20128/api/webhooks/<id>/test \
  -H "Cookie: auth_token=..."
```

ត្រឡប់ `{ delivered, status, error }`។ មិនមានការសាកល្បងឡើងវិញទេ — មានប្រយោជន៍សម្រាប់
ផ្ទៀងផ្ទាត់យ៉ាងរហ័សថា កម្មវិធីទទួលយក payload និងហត្ថលេខា។

## ផ្ទាំងគ្រប់គ្រង

ទំព័រផ្ទាំងគ្រប់គ្រងនៅ `/dashboard/webhooks` (សូមមើល
`src/app/(dashboard)/dashboard/webhooks/page.tsx`) ផ្តល់នូវ៖

- បង្កើត/កែសម្រួល webhooks ជាមួយកម្មវិធីជ្រើសរើសព្រឹត្តិការណ៍
- សូចនាករស្ថានភាព (សកម្ម / អសកម្ម / មានកំហុស) ដោយផ្អែកលើ `enabled`,
  `failure_count` និង `last_status`
- ការផ្ញើសាកល្បងដោយចុចតែម្តង
- ប៊ូតុងបិទ/បើកដោយដៃ

## ឧទាហរណ៍ Payload

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
    "message": "ការផ្ញើ webhook សាកល្បងពី OmniRoute",
    "webhookId": "<uuid>"
  }
}
```

ទម្រង់វាលសម្រាប់ព្រឹត្តិការណ៍ដែលមិនមែនជា `test.ping` ត្រូវបានកំណត់ដោយកន្លែងហៅដែលបញ្ចេញ
ព្រឹត្តិការណ៍ទាំងនោះ។ ចាត់ទុកវត្ថុ `data` ថាអាចត្រូវគ្នាជាមួយការផ្លាស់ប្តូរនាពេលអនាគត (បន្ថែមវាល កុំពឹងផ្អែកលើ
អវត្តមានរបស់វាល)។

## ការអនុវត្តល្អបំផុត

- **ផ្ទៀងផ្ទាត់ហត្ថលេខារាល់ការផ្ញើ** ជាមួយ body ដើម — វាការពារ
  POSTs ក្លែងក្លាយពីអ្នកណាម្នាក់ដែលទាយត្រូវ URL របស់ webhook របស់អ្នក។
- **ឆ្លើយតបដោយ 2xx ក្នុងរយៈពេល ~5 វិនាទី** — dispatcher នឹងអស់ពេលរង់ចាំនៅ 10 s។ Receiver
  ដែលយឺតនឹងប្រើអស់ការព្យាយាមម្តងទៀត និងបង្កើន `failure_count`។
- **ធ្វើឱ្យ handlers មាន idempotency** — ការព្យាយាមម្តងទៀត និងន័យនៃការផ្ញើយ៉ាងហោចណាស់ម្តង
  មានន័យថាអាចមានទិន្នន័យស្ទួន។
- **ជាវតែអ្វីដែលចាំបាច់** — រាយតែព្រឹត្តិការណ៍ដែលអ្នកពិតជាប្រើប្រាស់ប៉ុណ្ណោះ។ `"*"` នឹង
  បន្ថែមចំណាយលើ receivers ដែលអ្នកមិនគ្រប់គ្រង។
- **តាមដាន `failure_count`** — endpoints នឹងត្រូវបានបិទដោយស្វ័យប្រវត្តិបន្ទាប់ពីបរាជ័យជាប់ៗគ្នា
  10 ដង។ កំណត់ឡើងវិញដោយហៅ `PUT /api/webhooks/[id]` ជាមួយ `enabled: true`
  បន្ទាប់ពីជួសជុល receiver រួច។
- **ប្តូរ secrets ជាប្រចាំ** — ប្រើ `PUT` ដើម្បីកំណត់ `secret` ថ្មី ដាក់ពង្រាយតម្លៃថ្មី
  ទៅកាន់ receiver ហើយបញ្ជាក់តាមរយៈ endpoint សាកល្បង។

## សូមមើលផងដែរ

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — ផ្ទៃ API គ្រប់គ្រងពេញលេញ
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — ន័យនៃ circuit breaker / cooldown
  នៅពីក្រោយការបរាជ័យរបស់ provider ដែលត្រូវបានបង្ហាញតាមរយៈ `request.failed`
- ប្រភព៖ `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`
