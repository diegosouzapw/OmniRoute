# Webhooks (فارسی)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/WEBHOOKS.md) · 🇪🇹 [am](../../../am/docs/frameworks/WEBHOOKS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/WEBHOOKS.md) · 🇦🇿 [az](../../../az/docs/frameworks/WEBHOOKS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/WEBHOOKS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/WEBHOOKS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/WEBHOOKS.md) · 🇩🇰 [da](../../../da/docs/frameworks/WEBHOOKS.md) · 🇩🇪 [de](../../../de/docs/frameworks/WEBHOOKS.md) · 🇬🇷 [el](../../../el/docs/frameworks/WEBHOOKS.md) · 🇪🇸 [es](../../../es/docs/frameworks/WEBHOOKS.md) · 🇪🇪 [et](../../../et/docs/frameworks/WEBHOOKS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/WEBHOOKS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/WEBHOOKS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/WEBHOOKS.md) · 🇮🇱 [he](../../../he/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/WEBHOOKS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/WEBHOOKS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/WEBHOOKS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/WEBHOOKS.md) · 🇮🇩 [id](../../../id/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/WEBHOOKS.md) · 🇮🇹 [it](../../../it/docs/frameworks/WEBHOOKS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/WEBHOOKS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/WEBHOOKS.md) · 🇰🇭 [km](../../../km/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/WEBHOOKS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/WEBHOOKS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/WEBHOOKS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/WEBHOOKS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/WEBHOOKS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/WEBHOOKS.md) · 🇲🇲 [my](../../../my/docs/frameworks/WEBHOOKS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/WEBHOOKS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/WEBHOOKS.md) · 🇳🇴 [no](../../../no/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [or](../../../or/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/WEBHOOKS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/WEBHOOKS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/WEBHOOKS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/WEBHOOKS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/WEBHOOKS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/WEBHOOKS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/WEBHOOKS.md) · 🇱🇰 [si](../../../si/docs/frameworks/WEBHOOKS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/WEBHOOKS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/WEBHOOKS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/WEBHOOKS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/WEBHOOKS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [te](../../../te/docs/frameworks/WEBHOOKS.md) · 🇹🇭 [th](../../../th/docs/frameworks/WEBHOOKS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/WEBHOOKS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/WEBHOOKS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/WEBHOOKS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/WEBHOOKS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/WEBHOOKS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/WEBHOOKS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/WEBHOOKS.md)

---

> **منبع حقیقت:** `src/lib/webhookDispatcher.ts`، `src/lib/db/webhooks.ts`، `src/app/api/webhooks/`
> **آخرین بهروزرسانی:** 2026-06-28 — v3.8.40

OmniRoute میتواند در رخدادهای پلتفرم، وبهوکهای HTTP را فعال کند. از آنها برای یکپارچهسازی با
Slack، PagerDuty، Datadog، سرویسهای هشدار داخلی یا هر دریافتکننده HTTP استفاده کنید.

ارسالکننده هر تحویل را با HMAC-SHA256 امضا میکند، در صورت بروز خطاهای
موقت مجدداً تلاش میکند، سلامت تحویل را برای هر وبهوک پیگیری میکند و نقاط پایانیای را که
همچنان با شکست مواجه میشوند، بهطور خودکار غیرفعال میکند.

## رخدادهای پشتیبانیشده

نوع `WebhookEvent` (`src/lib/webhooks/eventDescriptions.ts`، که توسط `src/lib/webhookDispatcher.ts` استفاده میشود) در حال حاضر دقیقاً چهار رخداد را مدلسازی میکند:

| رخداد               | زمان فعالشدن                                                      |
| ------------------- | ----------------------------------------------------------------- |
| `request.completed` | یک درخواست پروکسیشده با موفقیت تکمیل میشود                        |
| `request.failed`    | یک درخواست پروکسیشده پس از همه تلاشهای مجدد/جایگزینها شکست میخورد |
| `quota.exceeded`    | یک کلید API از آستانه بودجه/سهمیه عبور میکند                      |
| `test.ping`         | رخداد مصنوعی مورد استفاده توسط نقطه پایانی آزمایش                 |

اشتراکها میتوانند مقدار تحتاللفظی `"*"` را برای دریافت همه رخدادها بپذیرند. نامهای ناشناخته
رخداد در `events` هنگام ارسال نادیده گرفته میشوند.

> نکته: API ارسالکننده متصل شده است، اما محلهای فراخوانی عملیاتی برای برخی از
> رخدادهای غیر از `test.ping` هنوز در حال اضافهشدن هستند. `grep dispatchEvent` را بررسی کنید تا ببینید
> کدام مسیرها در نسخه شما در حال حاضر ارسالکننده را فراخوانی میکنند.

## معماری

```
فراخواننده (مدیریتکننده، سرویس، ناظر)
  dispatchEvent(event, data)            [src/lib/webhookDispatcher.ts]
    -> getEnabledWebhooks()             [src/lib/db/webhooks.ts]
    -> فیلتر بر اساس webhook.events
    -> برای هر مورد منطبق (بهصورت موازی):
       deliverWebhook(url, payload, secret)
         ساخت payload { event, timestamp, data }
         امضای body با HMAC-SHA256 (در صورت وجود secret)
         POST با مهلت زمانی 10 ثانیهای
         حداکثر 3 بار تلاش مجدد در خطاهای 5xx / خطای شبکه
       recordWebhookDelivery(id, status, success)
    -> disableWebhooksWithHighFailures(10)
```

ارسال برای فراخواننده بهصورت اجرا و فراموشی است: `Promise.allSettled` خطاهای
مربوط به هر وبهوک را نادیده میگیرد تا یک دریافتکننده معیوب نتواند دیگران را مسدود کند.

## امضای HMAC

وقتی یک وبهوک دارای `secret` باشد، OmniRoute بدنه JSON را امضا میکند و موارد زیر را میفرستد:

```
Content-Type: application/json
User-Agent: OmniRoute-Webhook/1.0
X-Webhook-Event: <event>
X-Webhook-Timestamp: <ISO-8601>
X-Webhook-Signature: sha256=<hex HMAC-SHA256(secret, body)>
```

> نام هدرها از پیشوند `X-Webhook-*` استفاده میکنند (نه `X-OmniRoute-*`). مقدار امضا
> بهشکل `sha256=<hex>` است — کل پیشوند را اعتبارسنجی کنید.

اگر `createWebhook` بدون secret فراخوانی شود، ماژول DB یک secret تولید میکند
(`whsec_<48 hex>`)؛ بنابراین همه وبهوکها بهطور پیشفرض امضا میشوند.

### اعتبارسنجی در دریافتکننده

```typescript
import { createHmac, timingSafeEqual } from "node:crypto";

function verify(rawBody: string, signature: string, secret: string) {
  const expected = "sha256=" + createHmac("sha256", secret).update(rawBody).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}
```

همیشه پیش از هرگونه تجزیه JSON، اعتبارسنجی را در برابر بدنه **خام** درخواست انجام دهید.

## سیاست تلاش مجدد و شکست

`deliverWebhook(url, payload, secret, maxRetries = 3)`:

- مهلت زمانی هر تلاش ۱۰ ثانیه است (`AbortController`).
- پاسخ HTTP از نوع 2xx موفقیت محسوب میشود.
- پاسخ HTTP از نوع 3xx/4xx یک وضعیت نهاییِ غیرقابل تلاش مجدد محسوب میشود — تحویل ثبت میشود
  و مقدار `success = res.ok` خواهد بود.
- پاسخ HTTP از نوع 5xx و خطاهای شبکه با تأخیر نمایی دوباره امتحان میشوند:
  `2^attempt * 1000 ms` (۱ ثانیه، ۲ ثانیه، ۴ ثانیه).
- پس از `maxRetries`، تحویل بهعنوان ناموفق ثبت میشود.
- هر تحویل، `last_triggered_at` و `last_status` را بهروزرسانی میکند و
  `failure_count` را بازنشانی یا افزایش میدهد.
- توزیعکننده پس از هر ارسال گروهی، `disableWebhooksWithHighFailures(10)` را فراخوانی میکند؛
  بنابراین هر وبهوکی که `failure_count >= 10` داشته باشد، بهطور خودکار غیرفعال میشود.

## پایگاه داده

جدول `webhooks` (مایگریشن `011_webhooks.sql`):

| ستون                | نوع     | توضیحات                                                          |
| ------------------- | ------- | ---------------------------------------------------------------- |
| `id`                | TEXT PK | UUID                                                             |
| `url`               | TEXT    | URL مقصد                                                         |
| `events`            | TEXT    | آرایه JSON؛ مقدار پیشفرض `["*"]`                                 |
| `secret`            | TEXT    | کلید محرمانه HMAC (اگر ارائه نشود، خودکار تولید میشود)           |
| `enabled`           | INT     | 0/1؛ مقدار پیشفرض 1                                              |
| `description`       | TEXT    | برچسب اختیاری و قابلفهم برای انسان                               |
| `created_at`        | TEXT    | `datetime('now')`                                                |
| `last_triggered_at` | TEXT    | در هر تلاش برای تحویل بهروزرسانی میشود                           |
| `last_status`       | INT     | وضعیت HTTP آخرین تلاش (0 = شبکه)                                 |
| `failure_count`     | INT     | در صورت موفقیت به 0 بازنشانی و در صورت شکست ۱ واحد افزایش مییابد |

تاریخچه تحویل، علاوه بر شمارندههای تجمیعی در ردیف `webhooks`، در جدول اختصاصی
`webhook_deliveries` نیز نگهداری میشود
(مایگریشن `069_webhook_deliveries.sql` که در هر تلاش از طریق
`src/lib/db/webhookDeliveries.ts::insertDelivery` نوشته میشود).
فراداده نوع (Slack / Discord /
Telegram / تبدیلکنندههای سفارشی payload) توسط `070_webhooks_kind_metadata.sql` اضافه شده است.

## API مبتنی بر REST

همه endpointها به احراز هویت مدیریتی (`requireManagementAuth`) نیاز دارند.

| Endpoint                        | متد    | توضیحات                                        |
| ------------------------------- | ------ | ---------------------------------------------- |
| `/api/webhooks`                 | GET    | فهرست وبهوکها (کلیدهای محرمانه پوشانده میشوند) |
| `/api/webhooks`                 | POST   | ایجاد وبهوک                                    |
| `/api/webhooks/[id]`            | GET    | جزئیات وبهوک (کلید محرمانه کامل)               |
| `/api/webhooks/[id]`            | PUT    | بهروزرسانی فیلدها                              |
| `/api/webhooks/[id]`            | DELETE | حذف                                            |
| `/api/webhooks/[id]/test`       | POST   | ارسال یک `test.ping` (بدون تلاش مجدد)          |
| `/api/webhooks/[id]/deliveries` | GET    | تلاشهای اخیر تحویل برای یک وبهوک               |
| `/api/webhooks/validate-url`    | POST   | اعتبارسنجی URL پیش از ارسال (محافظ SSRF)       |

`GET /api/webhooks` برای جلوگیری از افشای کلید محرمانه در صفحات فهرست،
آن را بهشکل `<first 10 chars>...` میپوشاند. هنگامی که واقعاً به کلید محرمانه
نیاز دارید، از درخواست GET مربوط به `[id]` استفاده کنید.

### ایجاد وبهوک

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

اگر `secret` حذف شود، سرور یک کلید محرمانه با قالب `whsec_<hex>` تولید میکند و
آن را در پاسخ برمیگرداند.

### آزمایش وبهوک

```bash
curl -X POST http://localhost:20128/api/webhooks/<id>/test \
  -H "Cookie: auth_token=..."
```

مقدار `{ delivered, status, error }` را برمیگرداند. هیچ تلاش مجددی انجام نمیشود — این قابلیت برای
اعتبارسنجی سریع پذیرش payload و امضا توسط گیرنده مفید است.

## داشبورد

صفحهٔ داشبورد در `/dashboard/webhooks` (رجوع کنید به
`src/app/(dashboard)/dashboard/webhooks/page.tsx`) امکانات زیر را فراهم میکند:

- ایجاد/ویرایش وبهوکها با انتخابگر رویداد
- نشانگر وضعیت (فعال / غیرفعال / خطادار) بر اساس `enabled`،
  `failure_count` و `last_status`
- ارسال آزمایشی با یک کلیک
- کلید تغییر وضعیت دستی برای فعال/غیرفعالکردن

## نمونههای Payload

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
    "message": "ارسال آزمایشی وبهوک از OmniRoute",
    "webhookId": "<uuid>"
  }
}
```

ساختار فیلدهای رویدادهای غیر از `test.ping` توسط محلهای فراخوانیای که آنها را منتشر میکنند تعریف میشود؛ شیء `data` را سازگار با تغییرات آتی در نظر بگیرید (فیلد اضافه کنید و به نبود فیلدها متکی نباشید).

## بهترین شیوهها

- **امضای هر ارسال را اعتبارسنجی کنید** و آن را با بدنهٔ خام مطابقت دهید — این کار از POSTهای جعلشده توسط هر کسی که URL وبهوک شما را حدس بزند جلوگیری میکند.
- **ظرف حدود ۵ ثانیه با 2xx پاسخ دهید** — مهلت زمانی توزیعکننده ۱۰ ثانیه است. گیرندههای کند باعث مصرف تلاشهای مجدد و افزایش `failure_count` میشوند.
- **هندلرها را idempotent پیادهسازی کنید** — تلاشهای مجدد و معناشناسی تحویل حداقل یکباره به این معناست که امکان دریافت موارد تکراری وجود دارد.
- **اشتراکها را به حداقل برسانید** — فقط رویدادهایی را فهرست کنید که واقعاً مصرف میکنید؛ `"*"` هزینهٔ گیرندههایی را که کنترل نمیکنید افزایش میدهد.
- **`failure_count` را زیر نظر بگیرید** — endpointها پس از ۱۰ شکست متوالی بهطور خودکار غیرفعال میشوند؛ پس از رفع مشکل گیرنده، با فراخوانی `PUT /api/webhooks/[id]` و مقدار `enabled: true` آن را بازنشانی کنید.
- **secretها را بهصورت دورهای تعویض کنید** — یک `secret` جدید را با `PUT` تنظیم کنید، مقدار جدید را روی گیرنده مستقر کنید و از طریق endpoint آزمایشی صحت آن را تأیید کنید.

## همچنین ببینید

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — سطح کامل API مدیریت
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — معناشناسی circuit breaker / cooldown مربوط به شکستهای ارائهدهنده که از طریق `request.failed` نمایش داده میشوند
- منبع: `src/lib/webhookDispatcher.ts`، `src/lib/db/webhooks.ts`
