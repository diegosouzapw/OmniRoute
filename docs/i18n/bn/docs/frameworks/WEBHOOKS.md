# Webhooks (বাংলা)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/WEBHOOKS.md) · 🇪🇹 [am](../../../am/docs/frameworks/WEBHOOKS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/WEBHOOKS.md) · 🇦🇿 [az](../../../az/docs/frameworks/WEBHOOKS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/WEBHOOKS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/WEBHOOKS.md) · 🇩🇰 [da](../../../da/docs/frameworks/WEBHOOKS.md) · 🇩🇪 [de](../../../de/docs/frameworks/WEBHOOKS.md) · 🇬🇷 [el](../../../el/docs/frameworks/WEBHOOKS.md) · 🇪🇸 [es](../../../es/docs/frameworks/WEBHOOKS.md) · 🇪🇪 [et](../../../et/docs/frameworks/WEBHOOKS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/WEBHOOKS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/WEBHOOKS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/WEBHOOKS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/WEBHOOKS.md) · 🇮🇱 [he](../../../he/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/WEBHOOKS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/WEBHOOKS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/WEBHOOKS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/WEBHOOKS.md) · 🇮🇩 [id](../../../id/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/WEBHOOKS.md) · 🇮🇹 [it](../../../it/docs/frameworks/WEBHOOKS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/WEBHOOKS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/WEBHOOKS.md) · 🇰🇭 [km](../../../km/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/WEBHOOKS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/WEBHOOKS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/WEBHOOKS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/WEBHOOKS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/WEBHOOKS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/WEBHOOKS.md) · 🇲🇲 [my](../../../my/docs/frameworks/WEBHOOKS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/WEBHOOKS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/WEBHOOKS.md) · 🇳🇴 [no](../../../no/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [or](../../../or/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/WEBHOOKS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/WEBHOOKS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/WEBHOOKS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/WEBHOOKS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/WEBHOOKS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/WEBHOOKS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/WEBHOOKS.md) · 🇱🇰 [si](../../../si/docs/frameworks/WEBHOOKS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/WEBHOOKS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/WEBHOOKS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/WEBHOOKS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/WEBHOOKS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [te](../../../te/docs/frameworks/WEBHOOKS.md) · 🇹🇭 [th](../../../th/docs/frameworks/WEBHOOKS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/WEBHOOKS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/WEBHOOKS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/WEBHOOKS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/WEBHOOKS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/WEBHOOKS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/WEBHOOKS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/WEBHOOKS.md)

---

> **প্রামাণিক উৎস:** `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`, `src/app/api/webhooks/`
> **সর্বশেষ হালনাগাদ:** 2026-06-28 — v3.8.40

OmniRoute প্ল্যাটফর্ম ইভেন্টে HTTP webhook পাঠাতে পারে। Slack, PagerDuty, Datadog, অভ্যন্তরীণ সতর্কীকরণ পরিষেবা অথবা যেকোনো HTTP রিসিভারের সঙ্গে ইন্টিগ্রেট করতে এগুলো ব্যবহার করুন।

ডিসপ্যাচার প্রতিটি ডেলিভারিতে HMAC-SHA256 স্বাক্ষর করে, সাময়িক ব্যর্থতায় পুনরায় চেষ্টা করে, প্রতিটি webhook-এর ডেলিভারি-স্বাস্থ্য ট্র্যাক করে এবং বারবার ব্যর্থ হওয়া endpoint স্বয়ংক্রিয়ভাবে নিষ্ক্রিয় করে।

## সমর্থিত ইভেন্ট

`WebhookEvent` টাইপটি (`src/lib/webhooks/eventDescriptions.ts`, যা `src/lib/webhookDispatcher.ts` দ্বারা ব্যবহৃত) বর্তমানে ঠিক চারটি ইভেন্ট মডেল করে:

| ইভেন্ট              | কখন ট্রিগার হয়                                                 |
| ------------------- | --------------------------------------------------------------- |
| `request.completed` | একটি প্রক্সি করা অনুরোধ সফলভাবে সম্পন্ন হলে                     |
| `request.failed`    | সব পুনঃচেষ্টা/fallback-এর পর একটি প্রক্সি করা অনুরোধ ব্যর্থ হলে |
| `quota.exceeded`    | কোনো API key বাজেট/quota সীমা অতিক্রম করলে                      |
| `test.ping`         | test endpoint দ্বারা ব্যবহৃত কৃত্রিম ইভেন্ট                     |

প্রতিটি ইভেন্ট গ্রহণ করতে subscription-এ আক্ষরিক `"*"` গ্রহণ করা হয়। `events`-এ থাকা অজানা ইভেন্টের নাম dispatch-এর সময় উপেক্ষা করা হয়।

> দ্রষ্টব্য: dispatcher API সংযুক্ত আছে, তবে কিছু non-`test.ping` ইভেন্টের production call site এখনো যুক্ত হওয়ার প্রক্রিয়ায় রয়েছে। আপনার release-এ বর্তমানে কোন path dispatcher-কে আহ্বান করে তা দেখতে `grep dispatchEvent` পরীক্ষা করুন।

## আর্কিটেকচার

```
আহ্বানকারী (handler, service, monitor)
  dispatchEvent(event, data)            [src/lib/webhookDispatcher.ts]
    -> getEnabledWebhooks()             [src/lib/db/webhooks.ts]
    -> webhook.events অনুযায়ী ফিল্টার করা
    -> প্রতিটি মিলের জন্য (সমান্তরালে):
       deliverWebhook(url, payload, secret)
         payload তৈরি করা { event, timestamp, data }
         HMAC-SHA256 দিয়ে body স্বাক্ষর করা (secret থাকলে)
         10s timeout সহ POST করা
         5xx / network error-এ সর্বোচ্চ 3 বার পুনরায় চেষ্টা করা
       recordWebhookDelivery(id, status, success)
    -> disableWebhooksWithHighFailures(10)
```

আহ্বানকারীর জন্য dispatch হলো fire-and-forget: `Promise.allSettled` প্রতিটি webhook-এর ত্রুটি নিজের মধ্যে সামলে নেয়, ফলে একটি ত্রুটিপূর্ণ receiver অন্যগুলোকে ব্লক করতে পারে না।

## HMAC স্বাক্ষর

কোনো webhook-এর `secret` থাকলে OmniRoute JSON body-তে স্বাক্ষর করে এবং পাঠায়:

```
Content-Type: application/json
User-Agent: OmniRoute-Webhook/1.0
X-Webhook-Event: <event>
X-Webhook-Timestamp: <ISO-8601>
X-Webhook-Signature: sha256=<hex HMAC-SHA256(secret, body)>
```

> Header-এর নামগুলোতে `X-Webhook-*` prefix ব্যবহৃত হয় (`X-OmniRoute-*` নয়)। স্বাক্ষরের মান হলো `sha256=<hex>` — সম্পূর্ণ prefix-টি যাচাই করুন।

কোনো secret ছাড়া `createWebhook` কল করা হলে DB module একটি secret তৈরি করে (`whsec_<48 hex>`), ফলে ডিফল্টভাবে সব webhook স্বাক্ষরিত হয়।

### receiver-এ যাচাই করা

```typescript
import { createHmac, timingSafeEqual } from "node:crypto";

function verify(rawBody: string, signature: string, secret: string) {
  const expected = "sha256=" + createHmac("sha256", secret).update(rawBody).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}
```

যেকোনো JSON parsing-এর আগে সর্বদা **raw** request body-এর বিপরীতে যাচাই করুন।

## পুনঃচেষ্টা ও ব্যর্থতা নীতি

`deliverWebhook(url, payload, secret, maxRetries = 3)`:

- প্রতিটি প্রচেষ্টার সময়সীমা 10 সেকেন্ড (`AbortController`)।
- HTTP 2xx সফল হিসেবে গণ্য হয়।
- HTTP 3xx/4xx পুনঃচেষ্টাযোগ্য নয় এমন চূড়ান্ত স্ট্যাটাস হিসেবে গণ্য হয় — `success = res.ok`-সহ ডেলিভার করা হয়েছে হিসেবে রেকর্ড করা হয়।
- HTTP 5xx এবং নেটওয়ার্ক ত্রুটির ক্ষেত্রে এক্সপোনেনশিয়াল ব্যাকঅফসহ পুনঃচেষ্টা করা হয়:
  `2^attempt * 1000 ms` (1s, 2s, 4s)।
- `maxRetries`-এর পরে ডেলিভারিটি ব্যর্থ হিসেবে রেকর্ড করা হয়।
- প্রতিটি ডেলিভারি `last_triggered_at`, `last_status` আপডেট করে এবং `failure_count` হয় রিসেট করে, নয়তো বৃদ্ধি করে।
- প্রতিটি ফ্যান-আউটের পরে ডিসপ্যাচার `disableWebhooksWithHighFailures(10)` কল করে, তাই `failure_count >= 10` থাকা যেকোনো webhook স্বয়ংক্রিয়ভাবে নিষ্ক্রিয় হয়ে যায়।

## ডেটাবেস

টেবিল `webhooks` (মাইগ্রেশন `011_webhooks.sql`):

| কলাম                | ধরন     | নোট                                                |
| ------------------- | ------- | -------------------------------------------------- |
| `id`                | TEXT PK | UUID                                               |
| `url`               | TEXT    | গন্তব্য URL                                        |
| `events`            | TEXT    | JSON অ্যারে; ডিফল্ট `["*"]`                        |
| `secret`            | TEXT    | HMAC সিক্রেট (না দিলে স্বয়ংক্রিয়ভাবে তৈরি)       |
| `enabled`           | INT     | 0/1; ডিফল্ট 1                                      |
| `description`       | TEXT    | ঐচ্ছিক মানব-পাঠযোগ্য লেবেল                         |
| `created_at`        | TEXT    | `datetime('now')`                                  |
| `last_triggered_at` | TEXT    | প্রতিটি ডেলিভারি প্রচেষ্টায় আপডেট করা হয়         |
| `last_status`       | INT     | সর্বশেষ প্রচেষ্টার HTTP স্ট্যাটাস (0 = নেটওয়ার্ক) |
| `failure_count`     | INT     | সফল হলে 0-তে রিসেট, ব্যর্থ হলে +1                  |

সমষ্টিগত কাউন্টারগুলো `webhooks` সারিতে রাখার পাশাপাশি, ডেলিভারি ইতিহাস নির্দিষ্ট `webhook_deliveries` টেবিলে সংরক্ষিত থাকে
(মাইগ্রেশন `069_webhook_deliveries.sql`, প্রতিটি প্রচেষ্টায়
`src/lib/db/webhookDeliveries.ts::insertDelivery`-এর মাধ্যমে লেখা হয়)। ধরনের মেটাডেটা (Slack / Discord /
Telegram / কাস্টম পেলোড ট্রান্সফর্মার) `070_webhooks_kind_metadata.sql` দ্বারা যোগ করা হয়েছে।

## REST API

সব এন্ডপয়েন্টের জন্য ম্যানেজমেন্ট অথেন্টিকেশন (`requireManagementAuth`) প্রয়োজন।

| এন্ডপয়েন্ট                     | মেথড   | বিবরণ                                         |
| ------------------------------- | ------ | --------------------------------------------- |
| `/api/webhooks`                 | GET    | webhook-এর তালিকা দেখায় (সিক্রেট মাস্ক করা)  |
| `/api/webhooks`                 | POST   | webhook তৈরি করে                              |
| `/api/webhooks/[id]`            | GET    | webhook-এর বিস্তারিত তথ্য (সম্পূর্ণ সিক্রেট)  |
| `/api/webhooks/[id]`            | PUT    | ফিল্ড আপডেট করে                               |
| `/api/webhooks/[id]`            | DELETE | অপসারণ করে                                    |
| `/api/webhooks/[id]/test`       | POST   | একটি `test.ping` পাঠায় (পুনঃচেষ্টা ছাড়া)    |
| `/api/webhooks/[id]/deliveries` | GET    | একটি webhook-এর সাম্প্রতিক ডেলিভারি প্রচেষ্টা |
| `/api/webhooks/validate-url`    | POST   | প্রি-ফ্লাইট URL যাচাইকরণ (SSRF সুরক্ষা)       |

তালিকা পাতায় সিক্রেট ফাঁস হওয়া এড়াতে `GET /api/webhooks` সিক্রেটটিকে `<first 10 chars>...` হিসেবে মাস্ক করে। যখন সত্যিই সিক্রেটটির প্রয়োজন হয়, তখন `[id]` GET ব্যবহার করুন।

### webhook তৈরি করা

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

`secret` বাদ দেওয়া হলে, সার্ভার একটি `whsec_<hex>` সিক্রেট তৈরি করে এবং রেসপন্সে সেটি ফেরত দেয়।

### webhook পরীক্ষা করা

```bash
curl -X POST http://localhost:20128/api/webhooks/<id>/test \
  -H "Cookie: auth_token=..."
```

`{ delivered, status, error }` ফেরত দেয়। কোনো পুনঃচেষ্টা করা হয় না — রিসিভার পেলোড ও স্বাক্ষর গ্রহণ করে কি না তা দ্রুত যাচাই করতে এটি কার্যকর।

## ড্যাশবোর্ড

`/dashboard/webhooks`-এ থাকা ড্যাশবোর্ড পেজটি (`src/app/(dashboard)/dashboard/webhooks/page.tsx` দেখুন) যে সুবিধাগুলো প্রদান করে:

- ইভেন্ট পিকার ব্যবহার করে ওয়েবহুক তৈরি/সম্পাদনা
- `enabled`, `failure_count`, এবং `last_status`-এর ভিত্তিতে স্ট্যাটাস নির্দেশক (সক্রিয় / নিষ্ক্রিয় / ত্রুটিগ্রস্ত)
- এক ক্লিকে পরীক্ষামূলক ডেলিভারি
- ম্যানুয়াল সক্রিয়/নিষ্ক্রিয় টগল

## পেলোডের উদাহরণ

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
    "message": "OmniRoute থেকে পরীক্ষামূলক ওয়েবহুক ডেলিভারি",
    "webhookId": "<uuid>"
  }
}
```

`test.ping` ছাড়া অন্যান্য ইভেন্টের ফিল্ডের গঠন সেগুলো নির্গতকারী কল সাইট দ্বারা নির্ধারিত হয়; `data` অবজেক্টটিকে ফরোয়ার্ড-কম্প্যাটিবল হিসেবে বিবেচনা করুন (ফিল্ড যোগ করুন, কোনো ফিল্ডের অনুপস্থিতির ওপর নির্ভর করবেন না)।

## সর্বোত্তম অনুশীলন

- **প্রতিটি ডেলিভারিতে কাঁচা বডির বিপরীতে স্বাক্ষর যাচাই করুন** — এতে আপনার ওয়েবহুক URL অনুমান করতে পারা যেকোনো ব্যক্তির নকল POST প্রতিরোধ করা যায়।
- **~5 সেকেন্ডের মধ্যে 2xx দিয়ে সাড়া দিন** — ডিসপ্যাচার 10 s-এ টাইম-আউট করে। ধীরগতির রিসিভার রিট্রাই খরচ করবে এবং `failure_count` বাড়াবে।
- **হ্যান্ডলারগুলোকে আইডেমপোটেন্ট করুন** — রিট্রাই এবং অন্তত-একবার ডেলিভারির সেমান্টিকসের কারণে ডুপ্লিকেট তৈরি হতে পারে।
- **ন্যূনতম সাবস্ক্রাইব করুন** — শুধু আপনি বাস্তবে ব্যবহার করেন এমন ইভেন্টগুলো তালিকাভুক্ত করুন; `"*"` আপনার নিয়ন্ত্রণে নেই এমন রিসিভারগুলোর ব্যয় বাড়াবে।
- **`failure_count` পর্যবেক্ষণ করুন** — পরপর 10 বার ব্যর্থ হলে এন্ডপয়েন্ট স্বয়ংক্রিয়ভাবে নিষ্ক্রিয় হয়; রিসিভার ঠিক করার পর `enabled: true` সহ `PUT /api/webhooks/[id]` কল করে এটি রিসেট করুন।
- **নিয়মিত সিক্রেট রোটেট করুন** — একটি নতুন `secret` দিয়ে `PUT` করুন, নতুন মানটি রিসিভারে ডিপ্লয় করুন এবং টেস্ট এন্ডপয়েন্টের মাধ্যমে নিশ্চিত করুন।

## আরও দেখুন

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — সম্পূর্ণ ম্যানেজমেন্ট API সারফেস
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — `request.failed`-এর মাধ্যমে প্রকাশিত প্রোভাইডার ব্যর্থতার অন্তর্নিহিত সার্কিট ব্রেকার / কুলডাউন সেমান্টিকস
- সোর্স: `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`
