# Webhooks (မြန်မာ)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/WEBHOOKS.md) · 🇪🇹 [am](../../../am/docs/frameworks/WEBHOOKS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/WEBHOOKS.md) · 🇦🇿 [az](../../../az/docs/frameworks/WEBHOOKS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/WEBHOOKS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/WEBHOOKS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/WEBHOOKS.md) · 🇩🇰 [da](../../../da/docs/frameworks/WEBHOOKS.md) · 🇩🇪 [de](../../../de/docs/frameworks/WEBHOOKS.md) · 🇬🇷 [el](../../../el/docs/frameworks/WEBHOOKS.md) · 🇪🇸 [es](../../../es/docs/frameworks/WEBHOOKS.md) · 🇪🇪 [et](../../../et/docs/frameworks/WEBHOOKS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/WEBHOOKS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/WEBHOOKS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/WEBHOOKS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/WEBHOOKS.md) · 🇮🇱 [he](../../../he/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/WEBHOOKS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/WEBHOOKS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/WEBHOOKS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/WEBHOOKS.md) · 🇮🇩 [id](../../../id/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/WEBHOOKS.md) · 🇮🇹 [it](../../../it/docs/frameworks/WEBHOOKS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/WEBHOOKS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/WEBHOOKS.md) · 🇰🇭 [km](../../../km/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/WEBHOOKS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/WEBHOOKS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/WEBHOOKS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/WEBHOOKS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/WEBHOOKS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/WEBHOOKS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/WEBHOOKS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/WEBHOOKS.md) · 🇳🇴 [no](../../../no/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [or](../../../or/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/WEBHOOKS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/WEBHOOKS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/WEBHOOKS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/WEBHOOKS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/WEBHOOKS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/WEBHOOKS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/WEBHOOKS.md) · 🇱🇰 [si](../../../si/docs/frameworks/WEBHOOKS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/WEBHOOKS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/WEBHOOKS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/WEBHOOKS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/WEBHOOKS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [te](../../../te/docs/frameworks/WEBHOOKS.md) · 🇹🇭 [th](../../../th/docs/frameworks/WEBHOOKS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/WEBHOOKS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/WEBHOOKS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/WEBHOOKS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/WEBHOOKS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/WEBHOOKS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/WEBHOOKS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/WEBHOOKS.md)

---

> **အတည်ပြုရမည့် မူရင်းရင်းမြစ်:** `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`, `src/app/api/webhooks/`
> **နောက်ဆုံး အပ်ဒိတ်လုပ်ထားသည့်ရက်:** 2026-06-28 — v3.8.40

OmniRoute သည် ပလက်ဖောင်းဖြစ်ရပ်များတွင် HTTP webhook များကို ပေးပို့နိုင်သည်။ ၎င်းတို့ကို
Slack၊ PagerDuty၊ Datadog၊ အတွင်းပိုင်း သတိပေးဝန်ဆောင်မှုများ သို့မဟုတ် မည်သည့် HTTP လက်ခံစနစ်နှင့်မဆို ပေါင်းစပ်ရန် အသုံးပြုပါ။

Dispatcher သည် ပေးပို့မှုတစ်ခုစီကို HMAC-SHA256 ဖြင့် လက်မှတ်ထိုးပြီး၊ ယာယီ
ချို့ယွင်းမှုများဖြစ်လျှင် ထပ်မံကြိုးစားကာ webhook တစ်ခုချင်းအလိုက် ပေးပို့မှုအခြေအနေကို ခြေရာခံပြီး
ဆက်တိုက်ချို့ယွင်းနေသည့် endpoint များကို အလိုအလျောက် ပိတ်ထားသည်။

## ပံ့ပိုးထားသော ဖြစ်ရပ်များ

`WebhookEvent` အမျိုးအစား (`src/lib/webhooks/eventDescriptions.ts`၊ `src/lib/webhookDispatcher.ts` မှ အသုံးပြုသည်) သည် လက်ရှိတွင် ဖြစ်ရပ် လေးမျိုးတိတိကို ကိုယ်စားပြုထားသည်-

| ဖြစ်ရပ်             | ဖြစ်ပေါ်သည့်အချိန်                                                                         |
| ------------------- | ------------------------------------------------------------------------------------------ |
| `request.completed` | Proxy မှတစ်ဆင့် ပို့ထားသော request တစ်ခု အောင်မြင်စွာ ပြီးဆုံးသည့်အခါ                      |
| `request.failed`    | ထပ်မံကြိုးစားမှု/အစားထိုးအသုံးပြုမှုအားလုံးပြီးနောက် proxy request တစ်ခု မအောင်မြင်သည့်အခါ |
| `quota.exceeded`    | API key တစ်ခုသည် ဘတ်ဂျက်/quota သတ်မှတ်ချက်ကို ကျော်လွန်သည့်အခါ                             |
| `test.ping`         | စမ်းသပ်ရေး endpoint က အသုံးပြုသော ဖန်တီးထားသည့် ဖြစ်ရပ်                                    |

Subscription များသည် ဖြစ်ရပ်အားလုံးကို လက်ခံရန် စာသားအတိုင်း `"*"` ကို လက်ခံသည်။ `events` ထဲရှိ
မသိရှိသော ဖြစ်ရပ်အမည်များကို dispatch လုပ်ချိန်တွင် လျစ်လျူရှုသည်။

> မှတ်ချက်- dispatcher API ကို ချိတ်ဆက်ထားပြီးဖြစ်သော်လည်း `test.ping` မဟုတ်သော
> ဖြစ်ရပ်အချို့အတွက် production call site များကို ထည့်သွင်းနေဆဲဖြစ်သည်။ သင့် release တွင်
> လက်ရှိ dispatcher ကို ခေါ်သုံးနေသည့် path များကို ကြည့်ရန် `grep dispatchEvent` ကို စစ်ဆေးပါ။

## တည်ဆောက်ပုံ

```
ခေါ်ယူသူ (handler၊ service၊ monitor)
  dispatchEvent(event, data)            [src/lib/webhookDispatcher.ts]
    -> getEnabledWebhooks()             [src/lib/db/webhooks.ts]
    -> webhook.events အလိုက် စစ်ထုတ်သည်
    -> ကိုက်ညီမှုတစ်ခုစီအတွက် (တစ်ပြိုင်တည်း):
       deliverWebhook(url, payload, secret)
         payload { event, timestamp, data } ကို တည်ဆောက်သည်
         body ကို HMAC-SHA256 ဖြင့် လက်မှတ်ထိုးသည် (secret ရှိလျှင်)
         10s timeout ဖြင့် POST လုပ်သည်
         5xx / network error ဖြစ်လျှင် အများဆုံး 3 ကြိမ် ထပ်မံကြိုးစားသည်
       recordWebhookDelivery(id, status, success)
    -> disableWebhooksWithHighFailures(10)
```

Dispatch သည် ခေါ်ယူသူအတွက် fire-and-forget ပုံစံဖြစ်သည်- `Promise.allSettled` သည်
webhook တစ်ခုချင်းစီ၏ error များကို မပေါ်ပေါက်စေရန် ထိန်းထားသဖြင့် ချို့ယွင်းနေသော receiver တစ်ခုက အခြား receiver များကို ပိတ်ဆို့မထားနိုင်ပါ။

## HMAC လက်မှတ်ထိုးခြင်း

Webhook တစ်ခုတွင် `secret` ရှိသည့်အခါ OmniRoute သည် JSON body ကို လက်မှတ်ထိုးပြီး အောက်ပါတို့ကို ပေးပို့သည်-

```
Content-Type: application/json
User-Agent: OmniRoute-Webhook/1.0
X-Webhook-Event: <event>
X-Webhook-Timestamp: <ISO-8601>
X-Webhook-Signature: sha256=<hex HMAC-SHA256(secret, body)>
```

> Header အမည်များသည် `X-Webhook-*` prefix ကို အသုံးပြုသည် (`X-OmniRoute-*` မဟုတ်ပါ)။ Signature
> တန်ဖိုးမှာ `sha256=<hex>` ဖြစ်သည် — prefix အပြည့်အစုံကို စစ်ဆေးအတည်ပြုပါ။

Secret မပါဘဲ `createWebhook` ကို ခေါ်ယူပါက DB module က secret တစ်ခု
(`whsec_<48 hex>`) ကို ထုတ်ပေးသဖြင့် webhook အားလုံးကို မူလသတ်မှတ်ချက်အရ လက်မှတ်ထိုးထားသည်။

### လက်ခံသည့်စနစ်တွင် စစ်ဆေးအတည်ပြုခြင်း

```typescript
import { createHmac, timingSafeEqual } from "node:crypto";

function verify(rawBody: string, signature: string, secret: string) {
  const expected = "sha256=" + createHmac("sha256", secret).update(rawBody).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}
```

JSON parsing မလုပ်မီ **မူရင်း** request body နှင့် အမြဲတမ်း စစ်ဆေးအတည်ပြုပါ။

## ပြန်လည်ကြိုးစားမှုနှင့် မအောင်မြင်မှု မူဝါဒ

`deliverWebhook(url, payload, secret, maxRetries = 3)`:

- ကြိုးစားမှုတစ်ကြိမ်လျှင် အချိန်ကန့်သတ်ချက် 10 စက္ကန့် (`AbortController`) ဖြစ်သည်။
- HTTP 2xx ကို အောင်မြင်မှုအဖြစ် သတ်မှတ်သည်။
- HTTP 3xx/4xx ကို ပြန်လည်မကြိုးစားနိုင်သော နောက်ဆုံးအခြေအနေအဖြစ် သတ်မှတ်ပြီး ပေးပို့ပြီးကြောင်း မှတ်တမ်းတင်ကာ
  `success = res.ok` ဟု သတ်မှတ်သည်။
- HTTP 5xx နှင့် ကွန်ရက်အမှားများကို exponential backoff ဖြင့် ပြန်လည်ကြိုးစားသည်-
  `2^attempt * 1000 ms` (1s, 2s, 4s)။
- `maxRetries` ပြီးနောက် ပေးပို့မှုကို မအောင်မြင်ကြောင်း မှတ်တမ်းတင်သည်။
- ပေးပို့မှုတစ်ခုစီသည် `last_triggered_at`၊ `last_status` တို့ကို အပ်ဒိတ်လုပ်ပြီး
  `failure_count` ကို ပြန်လည်သတ်မှတ်ခြင်း သို့မဟုတ် တိုးမြှင့်ခြင်း ပြုလုပ်သည်။
- dispatcher သည် fan-out တစ်ခုစီပြီးနောက် `disableWebhooksWithHighFailures(10)` ကို ခေါ်သဖြင့်
  `failure_count >= 10` ဖြစ်သော မည်သည့် webhook ကိုမဆို အလိုအလျောက် ပိတ်ထားမည်ဖြစ်သည်။

## ဒေတာဘေ့စ်

ဇယား `webhooks` (migration `011_webhooks.sql`):

| ကော်လံ              | အမျိုးအစား | မှတ်ချက်များ                                                 |
| ------------------- | ---------- | ------------------------------------------------------------ |
| `id`                | TEXT PK    | UUID                                                         |
| `url`               | TEXT       | ဦးတည်ရာ URL                                                  |
| `events`            | TEXT       | JSON array; မူလတန်ဖိုး `["*"]`                               |
| `secret`            | TEXT       | HMAC secret (မပေးထားပါက အလိုအလျောက် ထုတ်ပေးသည်)              |
| `enabled`           | INT        | 0/1; မူလတန်ဖိုးမှာ 1 ဖြစ်သည်                                 |
| `description`       | TEXT       | ရွေးချယ်ထည့်သွင်းနိုင်သော လူဖတ်ရှုရန် အညွှန်း                |
| `created_at`        | TEXT       | `datetime('now')`                                            |
| `last_triggered_at` | TEXT       | ပေးပို့ရန် ကြိုးစားမှုတိုင်းတွင် အပ်ဒိတ်လုပ်သည်              |
| `last_status`       | INT        | နောက်ဆုံးကြိုးစားမှု၏ HTTP status (0 = ကွန်ရက်)              |
| `failure_count`     | INT        | အောင်မြင်ပါက 0 သို့ ပြန်သတ်မှတ်ပြီး မအောင်မြင်ပါက +1 တိုးသည် |

ပေးပို့မှုမှတ်တမ်းကို သီးသန့် `webhook_deliveries` ဇယားတွင် သိမ်းဆည်းထားသည်
(migration `069_webhook_deliveries.sql`၊ ကြိုးစားမှုတိုင်းတွင်
`src/lib/db/webhookDeliveries.ts::insertDelivery` မှတစ်ဆင့် ရေးသားသည်)။ ထို့အပြင်
`webhooks` row ပေါ်တွင် စုစည်းကောင်တာများလည်း ရှိသည်။ Kind metadata (Slack / Discord /
Telegram / စိတ်ကြိုက် payload transformer များ) ကို `070_webhooks_kind_metadata.sql` ဖြင့် ထည့်သွင်းခဲ့သည်။

## REST API

endpoint အားလုံးသည် စီမံခန့်ခွဲမှုဆိုင်ရာ authentication (`requireManagementAuth`) လိုအပ်သည်။

| Endpoint                        | Method | ဖော်ပြချက်                                                     |
| ------------------------------- | ------ | -------------------------------------------------------------- |
| `/api/webhooks`                 | GET    | webhook များကို စာရင်းပြုစုရန် (secret များကို ဖုံးကွယ်ထားသည်) |
| `/api/webhooks`                 | POST   | webhook ဖန်တီးရန်                                              |
| `/api/webhooks/[id]`            | GET    | webhook အသေးစိတ် (secret အပြည့်အစုံ)                           |
| `/api/webhooks/[id]`            | PUT    | field များကို အပ်ဒိတ်လုပ်ရန်                                   |
| `/api/webhooks/[id]`            | DELETE | ဖယ်ရှားရန်                                                     |
| `/api/webhooks/[id]/test`       | POST   | `test.ping` တစ်ခု ပေးပို့ရန် (ပြန်လည်ကြိုးစားမှုမရှိ)          |
| `/api/webhooks/[id]/deliveries` | GET    | webhook တစ်ခုအတွက် မကြာသေးမီ ပေးပို့ရန်ကြိုးစားမှုများ         |
| `/api/webhooks/validate-url`    | POST   | ကြိုတင် URL စစ်ဆေးအတည်ပြုမှု (SSRF ကာကွယ်မှု)                  |

`GET /api/webhooks` သည် စာရင်းစာမျက်နှာများတွင် ပေါက်ကြားခြင်းမှ ကာကွယ်ရန် secret ကို
`<first 10 chars>...` အဖြစ် ဖုံးကွယ်ထားသည်။ secret ကို အမှန်တကယ် လိုအပ်သည့်အခါ `[id]` GET ကို အသုံးပြုပါ။

### webhook ဖန်တီးခြင်း

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

`secret` ကို ချန်လှပ်ထားပါက server သည် `whsec_<hex>` secret တစ်ခုကို ထုတ်ပေးပြီး
response တွင် ပြန်ပေးသည်။

### webhook စမ်းသပ်ခြင်း

```bash
curl -X POST http://localhost:20128/api/webhooks/<id>/test \
  -H "Cookie: auth_token=..."
```

`{ delivered, status, error }` ကို ပြန်ပေးသည်။ ပြန်လည်ကြိုးစားမှု မလုပ်ဆောင်ပါ — receiver က payload နှင့် signature ကို လက်ခံကြောင်း
လျင်မြန်စွာ စစ်ဆေးအတည်ပြုရန် အသုံးဝင်သည်။

## ဒက်ရှ်ဘုတ်

`/dashboard/webhooks` ရှိ ဒက်ရှ်ဘုတ်စာမျက်နှာ (`src/app/(dashboard)/dashboard/webhooks/page.tsx` ကိုကြည့်ပါ) တွင် အောက်ပါတို့ကို လုပ်ဆောင်နိုင်ပါသည်-

- အဖြစ်အပျက်ရွေးချယ်ကိရိယာဖြင့် webhooks များ ဖန်တီးခြင်း/တည်းဖြတ်ခြင်း
- `enabled`၊ `failure_count` နှင့် `last_status` တို့အပေါ် အခြေခံသည့် အခြေအနေညွှန်ပြချက် (အသုံးပြုနေ / အသုံးမပြု / အမှားဖြစ်)
- ကလစ်တစ်ချက်ဖြင့် စမ်းသပ်ပေးပို့ခြင်း
- ကိုယ်တိုင် ဖွင့်/ပိတ် ပြောင်းလဲနိုင်ခြင်း

## Payload နမူနာများ

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
    "message": "OmniRoute မှ စမ်းသပ် webhook ပေးပို့မှု",
    "webhookId": "<uuid>"
  }
}
```

`test.ping` မဟုတ်သော အဖြစ်အပျက်များအတွက် field ပုံစံများကို ၎င်းတို့အား ထုတ်လွှတ်သည့် call site များက သတ်မှတ်ပါသည်။ `data` object ကို ရှေ့ဆက်သဟဇာတဖြစ်သည့်ပုံစံဖြင့် ကိုင်တွယ်ပါ (field များ ထပ်ထည့်နိုင်ပြီး၊ မပါဝင်ခြင်းအပေါ် မမှီခိုပါနှင့်)။

## အကောင်းဆုံး လုပ်ထုံးလုပ်နည်းများ

- **ပေးပို့မှုတိုင်းတွင် signature ကို အတည်ပြုပါ** — raw body နှင့် တိုက်စစ်ခြင်းဖြင့် သင်၏ webhook URL ကို ခန့်မှန်းသိရှိသူတိုင်းထံမှ အတုလုပ်ထားသော POST များကို ကာကွယ်ပေးသည်။
- **~5 စက္ကန့်အတွင်း 2xx ဖြင့် တုံ့ပြန်ပါ** — dispatcher သည် 10 s တွင် အချိန်ကုန်ဆုံးသည်။ နှေးကွေးသော လက်ခံစနစ်များကြောင့် ပြန်လည်ကြိုးစားမှုများ ကုန်ဆုံးပြီး `failure_count` မြင့်တက်လာမည်။
- **Handler များကို idempotent ဖြစ်အောင် ပြုလုပ်ပါ** — ပြန်လည်ကြိုးစားမှုများနှင့် အနည်းဆုံးတစ်ကြိမ် ပေးပို့သည့် semantics ကြောင့် ထပ်နေသော ပေးပို့မှုများ ဖြစ်နိုင်သည်။
- **လိုအပ်သလောက်သာ subscribe လုပ်ပါ** — သင် အမှန်တကယ် အသုံးပြုသော အဖြစ်အပျက်များကိုသာ စာရင်းပြုစုပါ။ `"*"` သည် သင်မထိန်းချုပ်သော လက်ခံစနစ်များအတွက် ကုန်ကျစရိတ် တိုးစေမည်။
- **`failure_count` ကို စောင့်ကြည့်ပါ** — ဆက်တိုက် 10 ကြိမ် မအောင်မြင်ပါက endpoint များကို အလိုအလျောက် ပိတ်မည်။ လက်ခံစနစ်ကို ပြင်ဆင်ပြီးနောက် `enabled: true` ဖြင့် `PUT /api/webhooks/[id]` ကို ခေါ်၍ ပြန်လည်သတ်မှတ်ပါ။
- **Secret များကို အခါအားလျော်စွာ လဲလှယ်ပါ** — `secret` အသစ်ကို `PUT` လုပ်ပါ၊ တန်ဖိုးအသစ်ကို လက်ခံစနစ်သို့ deploy လုပ်ပြီး test endpoint မှတစ်ဆင့် အတည်ပြုပါ။

## ထပ်မံကြည့်ရှုရန်

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — စီမံခန့်ခွဲမှု API မျက်နှာပြင် အပြည့်အစုံ
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — `request.failed` မှတစ်ဆင့် ဖော်ပြသည့် provider ပျက်ကွက်မှုများ၏ နောက်ကွယ်ရှိ circuit breaker / cooldown semantics
- Source: `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`
