# Webhooks (اردو)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/WEBHOOKS.md) · 🇪🇹 [am](../../../am/docs/frameworks/WEBHOOKS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/WEBHOOKS.md) · 🇦🇿 [az](../../../az/docs/frameworks/WEBHOOKS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/WEBHOOKS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/WEBHOOKS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/WEBHOOKS.md) · 🇩🇰 [da](../../../da/docs/frameworks/WEBHOOKS.md) · 🇩🇪 [de](../../../de/docs/frameworks/WEBHOOKS.md) · 🇬🇷 [el](../../../el/docs/frameworks/WEBHOOKS.md) · 🇪🇸 [es](../../../es/docs/frameworks/WEBHOOKS.md) · 🇪🇪 [et](../../../et/docs/frameworks/WEBHOOKS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/WEBHOOKS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/WEBHOOKS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/WEBHOOKS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/WEBHOOKS.md) · 🇮🇱 [he](../../../he/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/WEBHOOKS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/WEBHOOKS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/WEBHOOKS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/WEBHOOKS.md) · 🇮🇩 [id](../../../id/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/WEBHOOKS.md) · 🇮🇹 [it](../../../it/docs/frameworks/WEBHOOKS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/WEBHOOKS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/WEBHOOKS.md) · 🇰🇭 [km](../../../km/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/WEBHOOKS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/WEBHOOKS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/WEBHOOKS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/WEBHOOKS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/WEBHOOKS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/WEBHOOKS.md) · 🇲🇲 [my](../../../my/docs/frameworks/WEBHOOKS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/WEBHOOKS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/WEBHOOKS.md) · 🇳🇴 [no](../../../no/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [or](../../../or/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/WEBHOOKS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/WEBHOOKS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/WEBHOOKS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/WEBHOOKS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/WEBHOOKS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/WEBHOOKS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/WEBHOOKS.md) · 🇱🇰 [si](../../../si/docs/frameworks/WEBHOOKS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/WEBHOOKS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/WEBHOOKS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/WEBHOOKS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/WEBHOOKS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [te](../../../te/docs/frameworks/WEBHOOKS.md) · 🇹🇭 [th](../../../th/docs/frameworks/WEBHOOKS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/WEBHOOKS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/WEBHOOKS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/WEBHOOKS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/WEBHOOKS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/WEBHOOKS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/WEBHOOKS.md)

---

> **حتمی ماخذ:** `src/lib/webhookDispatcher.ts`، `src/lib/db/webhooks.ts`، `src/app/api/webhooks/`
> **آخری بار اپ ڈیٹ کیا گیا:** 2026-06-28 — v3.8.40

OmniRoute پلیٹ فارم ایونٹس پر HTTP ویب ہکس متحرک کر سکتا ہے۔ انہیں Slack، PagerDuty، Datadog، داخلی انتباہی سروسز، یا کسی بھی HTTP وصول کنندہ کے ساتھ انضمام کے لیے استعمال کریں۔

ڈسپیچر ہر ڈیلیوری پر HMAC-SHA256 کے ساتھ دستخط کرتا ہے، عارضی ناکامیوں پر دوبارہ کوشش کرتا ہے، ہر ویب ہک کی ڈیلیوری صحت کا ریکارڈ رکھتا ہے، اور مسلسل ناکام ہونے والے اینڈ پوائنٹس کو خودکار طور پر غیر فعال کر دیتا ہے۔

## معاونت یافتہ ایونٹس

`WebhookEvent` ٹائپ (`src/lib/webhooks/eventDescriptions.ts`، جسے `src/lib/webhookDispatcher.ts` استعمال کرتا ہے) فی الحال عین چار ایونٹس کو ماڈل کرتی ہے:

| ایونٹ               | کب متحرک ہوتا ہے                                                       |
| ------------------- | ---------------------------------------------------------------------- |
| `request.completed` | ایک پراکسی شدہ درخواست کامیابی سے مکمل ہو جائے                         |
| `request.failed`    | تمام دوبارہ کوششوں/فال بیک کے بعد ایک پراکسی شدہ درخواست ناکام ہو جائے |
| `quota.exceeded`    | ایک API کلید بجٹ/کوٹہ حد عبور کر جائے                                  |
| `test.ping`         | ٹیسٹ اینڈ پوائنٹ کے زیرِ استعمال مصنوعی ایونٹ                          |

ہر ایونٹ وصول کرنے کے لیے سبسکرپشنز لفظی قدر `"*"` قبول کرتی ہیں۔ `events` میں موجود نامعلوم ایونٹ ناموں کو ڈسپیچ کے وقت نظر انداز کر دیا جاتا ہے۔

> نوٹ: ڈسپیچر API منسلک ہے، لیکن بعض غیر-`test.ping` ایونٹس کے پروڈکشن کال سائٹس ابھی شامل کیے جا رہے ہیں۔ یہ دیکھنے کے لیے `grep dispatchEvent` چیک کریں کہ آپ کی ریلیز میں کون سے راستے فی الحال ڈسپیچر کو طلب کرتے ہیں۔

## ساخت

```
کالر (ہینڈلر، سروس، مانیٹر)
  dispatchEvent(event, data)            [src/lib/webhookDispatcher.ts]
    -> getEnabledWebhooks()             [src/lib/db/webhooks.ts]
    -> webhook.events کے لحاظ سے فلٹر کریں
    -> ہر مماثلت کے لیے (متوازی طور پر):
       deliverWebhook(url, payload, secret)
         پے لوڈ بنائیں { event, timestamp, data }
         باڈی پر HMAC-SHA256 کے ساتھ دستخط کریں (اگر secret موجود ہو)
         10 سیکنڈ ٹائم آؤٹ کے ساتھ POST
         5xx / نیٹ ورک خرابی پر زیادہ سے زیادہ 3 بار دوبارہ کوشش کریں
       recordWebhookDelivery(id, status, success)
    -> disableWebhooksWithHighFailures(10)
```

کالر کے لیے ڈسپیچ فائر-اینڈ-فارگیٹ ہے: `Promise.allSettled` ہر ویب ہک کی خرابیوں کو دبا دیتا ہے، تاکہ ایک خراب وصول کنندہ دوسرے وصول کنندگان کو بلاک نہ کر سکے۔

## HMAC دستخط

جب کسی ویب ہک کے پاس `secret` ہو، تو OmniRoute JSON باڈی پر دستخط کرتا ہے اور یہ بھیجتا ہے:

```
Content-Type: application/json
User-Agent: OmniRoute-Webhook/1.0
X-Webhook-Event: <event>
X-Webhook-Timestamp: <ISO-8601>
X-Webhook-Signature: sha256=<hex HMAC-SHA256(secret, body)>
```

> ہیڈر کے نام `X-Webhook-*` سابقہ استعمال کرتے ہیں (`X-OmniRoute-*` نہیں)۔ دستخط کی قدر `sha256=<hex>` ہے — مکمل سابقے کی تصدیق کریں۔

اگر `createWebhook` کو secret کے بغیر کال کیا جائے، تو DB ماڈیول ایک secret (`whsec_<48 hex>`) تیار کرتا ہے، اس لیے بطور ڈیفالٹ تمام ویب ہکس پر دستخط ہوتے ہیں۔

### وصول کنندہ پر تصدیق کرنا

```typescript
import { createHmac, timingSafeEqual } from "node:crypto";

function verify(rawBody: string, signature: string, secret: string) {
  const expected = "sha256=" + createHmac("sha256", secret).update(rawBody).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}
```

کسی بھی JSON پارسنگ سے پہلے، ہمیشہ **خام** درخواست باڈی کے مقابلے میں تصدیق کریں۔

## دوبارہ کوشش اور ناکامی کی پالیسی

`deliverWebhook(url, payload, secret, maxRetries = 3)`:

- ہر کوشش کے لیے 10 سیکنڈ کا ٹائم آؤٹ (`AbortController`)۔
- HTTP 2xx کو کامیابی شمار کیا جاتا ہے۔
- HTTP 3xx/4xx کو دوبارہ کوشش نہ کیے جانے والے حتمی اسٹیٹس کے طور پر شمار کیا جاتا ہے — اسے ڈیلیور شدہ کے طور پر ریکارڈ کیا جاتا ہے،
  جبکہ `success = res.ok` ہوتا ہے۔
- HTTP 5xx اور نیٹ ورک کی خرابیوں پر ایکسپونینشل بیک آف کے ساتھ دوبارہ کوشش کی جاتی ہے:
  `2^attempt * 1000 ms` (1s، 2s، 4s)۔
- `maxRetries` کے بعد، ڈیلیوری کو ناکام ریکارڈ کیا جاتا ہے۔
- ہر ڈیلیوری `last_triggered_at`، `last_status` کو اپ ڈیٹ کرتی ہے، اور
  `failure_count` کو یا تو ری سیٹ کرتی ہے یا بڑھاتی ہے۔
- ڈسپیچر ہر فین آؤٹ کے بعد `disableWebhooksWithHighFailures(10)` کو کال کرتا ہے،
  لہٰذا `failure_count >= 10` والا کوئی بھی webhook خودکار طور پر غیر فعال ہو جاتا ہے۔

## ڈیٹابیس

ٹیبل `webhooks` (مائیگریشن `011_webhooks.sql`):

| کالم                | قسم     | نوٹس                                                       |
| ------------------- | ------- | ---------------------------------------------------------- |
| `id`                | TEXT PK | UUID                                                       |
| `url`               | TEXT    | منزل کا URL                                                |
| `events`            | TEXT    | JSON ارے؛ ڈیفالٹ `["*"]`                                   |
| `secret`            | TEXT    | HMAC راز (فراہم نہ کیے جانے پر خودکار طور پر تیار ہوتا ہے) |
| `enabled`           | INT     | 0/1؛ ڈیفالٹ 1 ہے                                           |
| `description`       | TEXT    | اختیاری انسانی لیبل                                        |
| `created_at`        | TEXT    | `datetime('now')`                                          |
| `last_triggered_at` | TEXT    | ہر ڈیلیوری کی کوشش پر اپ ڈیٹ ہوتا ہے                       |
| `last_status`       | INT     | آخری کوشش کا HTTP اسٹیٹس (0 = نیٹ ورک)                     |
| `failure_count`     | INT     | کامیابی پر 0 پر ری سیٹ، ناکامی پر +1                       |

ڈیلیوری کی سرگزشت مخصوص `webhook_deliveries` ٹیبل میں محفوظ رہتی ہے
(مائیگریشن `069_webhook_deliveries.sql`، ہر کوشش پر
`src/lib/db/webhookDeliveries.ts::insertDelivery` کے ذریعے لکھی جاتی ہے)، اور اس کے ساتھ
`webhooks` کی قطار میں مجموعی کاؤنٹرز بھی موجود ہوتے ہیں۔ قسم کا میٹا ڈیٹا (Slack / Discord /
Telegram / کسٹم پے لوڈ ٹرانسفارمرز) `070_webhooks_kind_metadata.sql` کے ذریعے شامل کیا گیا تھا۔

## REST API

تمام اینڈ پوائنٹس کے لیے مینجمنٹ توثیق (`requireManagementAuth`) درکار ہے۔

| اینڈ پوائنٹ                     | طریقہ  | تفصیل                                      |
| ------------------------------- | ------ | ------------------------------------------ |
| `/api/webhooks`                 | GET    | webhooks کی فہرست (راز چھپائے ہوئے)        |
| `/api/webhooks`                 | POST   | webhook بنائیں                             |
| `/api/webhooks/[id]`            | GET    | webhook کی تفصیل (مکمل راز)                |
| `/api/webhooks/[id]`            | PUT    | فیلڈز اپ ڈیٹ کریں                          |
| `/api/webhooks/[id]`            | DELETE | ہٹائیں                                     |
| `/api/webhooks/[id]/test`       | POST   | ایک `test.ping` چلائیں (دوبارہ کوشش نہیں)  |
| `/api/webhooks/[id]/deliveries` | GET    | ایک webhook کے لیے حالیہ ڈیلیوری کی کوششیں |
| `/api/webhooks/validate-url`    | POST   | پیشگی URL توثیق (SSRF تحفظ)                |

`GET /api/webhooks` راز کو `<first 10 chars>...` کی شکل میں چھپاتا ہے تاکہ فہرست والے
صفحات پر اس کے افشا ہونے سے بچا جا سکے۔ جب آپ کو واقعی راز درکار ہو تو `[id]` والا GET استعمال کریں۔

### webhook بنائیں

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

اگر `secret` شامل نہ کیا جائے تو سرور ایک `whsec_<hex>` راز تیار کرتا ہے اور اسے
جواب میں واپس کر دیتا ہے۔

### webhook کی جانچ کریں

```bash
curl -X POST http://localhost:20128/api/webhooks/<id>/test \
  -H "Cookie: auth_token=..."
```

`{ delivered, status, error }` واپس کرتا ہے۔ دوبارہ کوئی کوشش نہیں کی جاتی — یہ فوری طور پر
اس بات کی توثیق کرنے کے لیے مفید ہے کہ وصول کنندہ پے لوڈ اور دستخط قبول کرتا ہے۔

## ڈیش بورڈ

`/dashboard/webhooks` پر موجود ڈیش بورڈ صفحہ (دیکھیں
`src/app/(dashboard)/dashboard/webhooks/page.tsx`) درج ذیل سہولیات فراہم کرتا ہے:

- ایونٹ پکر کے ساتھ ویب ہُکس بنانا/ترمیم کرنا
- `enabled`، `failure_count`، اور `last_status` کی بنیاد پر اسٹیٹس اشارہ (فعال / غیرفعال / خرابی کا شکار)
- ایک کلک سے آزمائشی ڈیلیوری
- دستی طور پر فعال/غیرفعال کرنے کا ٹوگل

## پے لوڈ کی مثالیں

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
    "message": "OmniRoute سے آزمائشی ویب ہُک ڈیلیوری",
    "webhookId": "<uuid>"
  }
}
```

غیر `test.ping` ایونٹس کے فیلڈ اسٹرکچرز کی تعریف انہیں خارج کرنے والی کال سائٹس کے ذریعے ہوتی ہے؛ `data` آبجیکٹ کو فارورڈ کمپیٹیبل سمجھیں (فیلڈز شامل کریں، ان کی عدم موجودگی پر انحصار نہ کریں)۔

## بہترین طریقۂ کار

- **ہر ڈیلیوری پر خام باڈی کے مقابلے میں دستخط کی توثیق کریں** — یہ ایسے کسی بھی شخص کی جعلی POST درخواستوں کو روکتا ہے جو آپ کے ویب ہُک URL کا اندازہ لگا لے۔
- **تقریباً 5 سیکنڈ کے اندر 2xx جواب دیں** — ڈسپیچر 10 s پر ٹائم آؤٹ ہو جاتا ہے۔ سست ریسیورز دوبارہ کوششوں کو استعمال کریں گے اور `failure_count` میں اضافہ کریں گے۔
- **ہینڈلرز کو آئیڈیم پوٹنٹ بنائیں** — دوبارہ کوششوں اور کم از کم ایک بار ڈیلیوری کی سیمینٹکس کا مطلب ہے کہ نقلیں ممکن ہیں۔
- **کم سے کم سبسکرائب کریں** — صرف انہی ایونٹس کو درج کریں جنہیں آپ واقعی استعمال کرتے ہیں؛ `"*"` ایسے ریسیورز پر لاگت بڑھائے گا جنہیں آپ کنٹرول نہیں کرتے۔
- **`failure_count` کی نگرانی کریں** — مسلسل 10 ناکامیوں پر اینڈ پوائنٹس خودکار طور پر غیرفعال ہو جاتے ہیں؛ ریسیور درست کرنے کے بعد `enabled: true` کے ساتھ `PUT /api/webhooks/[id]` کال کرکے اسے ری سیٹ کریں۔
- **سیکرٹس کو وقتاً فوقتاً تبدیل کریں** — ایک نیا `secret` بذریعہ `PUT` سیٹ کریں، نئی ویلیو ریسیور پر ڈیپلائے کریں، اور ٹیسٹ اینڈ پوائنٹ کے ذریعے تصدیق کریں۔

## مزید دیکھیں

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — مکمل مینجمنٹ API سرفیس
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — `request.failed` کے ذریعے ظاہر ہونے والی پرووائیڈر ناکامیوں کے پس منظر میں سرکٹ بریکر / کول ڈاؤن سیمینٹکس
- ماخذ: `src/lib/webhookDispatcher.ts`، `src/lib/db/webhooks.ts`
