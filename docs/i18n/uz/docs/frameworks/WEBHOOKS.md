# Webhooks (Oʻzbekcha)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/WEBHOOKS.md) · 🇪🇹 [am](../../../am/docs/frameworks/WEBHOOKS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/WEBHOOKS.md) · 🇦🇿 [az](../../../az/docs/frameworks/WEBHOOKS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/WEBHOOKS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/WEBHOOKS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/WEBHOOKS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/WEBHOOKS.md) · 🇩🇰 [da](../../../da/docs/frameworks/WEBHOOKS.md) · 🇩🇪 [de](../../../de/docs/frameworks/WEBHOOKS.md) · 🇬🇷 [el](../../../el/docs/frameworks/WEBHOOKS.md) · 🇪🇸 [es](../../../es/docs/frameworks/WEBHOOKS.md) · 🇪🇪 [et](../../../et/docs/frameworks/WEBHOOKS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/WEBHOOKS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/WEBHOOKS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/WEBHOOKS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/WEBHOOKS.md) · 🇮🇱 [he](../../../he/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/WEBHOOKS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/WEBHOOKS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/WEBHOOKS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/WEBHOOKS.md) · 🇮🇩 [id](../../../id/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/WEBHOOKS.md) · 🇮🇹 [it](../../../it/docs/frameworks/WEBHOOKS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/WEBHOOKS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/WEBHOOKS.md) · 🇰🇭 [km](../../../km/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/WEBHOOKS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/WEBHOOKS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/WEBHOOKS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/WEBHOOKS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/WEBHOOKS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/WEBHOOKS.md) · 🇲🇲 [my](../../../my/docs/frameworks/WEBHOOKS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/WEBHOOKS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/WEBHOOKS.md) · 🇳🇴 [no](../../../no/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [or](../../../or/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/WEBHOOKS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/WEBHOOKS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/WEBHOOKS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/WEBHOOKS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/WEBHOOKS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/WEBHOOKS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/WEBHOOKS.md) · 🇱🇰 [si](../../../si/docs/frameworks/WEBHOOKS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/WEBHOOKS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/WEBHOOKS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/WEBHOOKS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/WEBHOOKS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [te](../../../te/docs/frameworks/WEBHOOKS.md) · 🇹🇭 [th](../../../th/docs/frameworks/WEBHOOKS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/WEBHOOKS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/WEBHOOKS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/WEBHOOKS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/WEBHOOKS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/WEBHOOKS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/WEBHOOKS.md)

---

> **Haqiqiy manba:** `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`, `src/app/api/webhooks/`
> **Oxirgi yangilanish:** 2026-06-28 — v3.8.40

OmniRoute platforma hodisalari yuz berganda HTTP vebhuklarini ishga tushirishi mumkin. Ulardan
Slack, PagerDuty, Datadog, ichki ogohlantirish xizmatlari yoki istalgan HTTP qabul qiluvchisi bilan integratsiya qilish uchun foydalaning.

Dispetcher har bir yetkazib berishni HMAC-SHA256 bilan imzolaydi, vaqtinchalik
nosozliklarda qayta urinadi, har bir vebhuk bo‘yicha yetkazib berish holatini kuzatadi va
muntazam ravishda muvaffaqiyatsiz bo‘layotgan endpointlarni avtomatik tarzda o‘chiradi.

## Qo‘llab-quvvatlanadigan hodisalar

`WebhookEvent` turi (`src/lib/webhooks/eventDescriptions.ts`, `src/lib/webhookDispatcher.ts` tomonidan foydalaniladi) hozirda aynan to‘rtta hodisani modellashtiradi:

| Hodisa              | Qachon ishga tushadi                                                                                       |
| ------------------- | ---------------------------------------------------------------------------------------------------------- |
| `request.completed` | Proksi orqali yuborilgan so‘rov muvaffaqiyatli yakunlanadi                                                 |
| `request.failed`    | Proksi orqali yuborilgan so‘rov barcha qayta urinishlar/zaxira variantlardan keyin muvaffaqiyatsiz tugaydi |
| `quota.exceeded`    | API kaliti budjet/kvota chegarasidan oshadi                                                                |
| `test.ping`         | Test endpointi tomonidan ishlatiladigan sun’iy hodisa                                                      |

Obunalar barcha hodisalarni qabul qilish uchun literal `"*"` qiymatini qabul qiladi. `events` ichidagi noma’lum hodisa
nomlari yuborish vaqtida e’tiborga olinmaydi.

> Eslatma: dispetcher API’si ulangan, ammo `test.ping` bo‘lmagan ayrim
> hodisalar uchun ishlab chiqarish muhitidagi chaqiruv joylari hali ham qo‘shilmoqda. Relizingizda
> qaysi yo‘llar hozirda dispetcherni chaqirishini ko‘rish uchun `grep dispatchEvent` buyrug‘ini tekshiring.

## Arxitektura

```
Chaqiruvchi (ishlov beruvchi, xizmat, monitor)
  dispatchEvent(event, data)            [src/lib/webhookDispatcher.ts]
    -> getEnabledWebhooks()             [src/lib/db/webhooks.ts]
    -> webhook.events bo‘yicha filtrlash
    -> har bir moslik uchun (parallel ravishda):
       deliverWebhook(url, payload, secret)
         foydali yukni tuzish { event, timestamp, data }
         tanani HMAC-SHA256 bilan imzolash (agar secret mavjud bo‘lsa)
         10 soniyalik kutish chegarasi bilan POST
         5xx / tarmoq xatosida 3 martagacha qayta urinish
       recordWebhookDelivery(id, status, success)
    -> disableWebhooksWithHighFailures(10)
```

Yuborish chaqiruvchi uchun ishga tushiriladi va unutiladi: `Promise.allSettled` har bir vebhuk
xatolarini yutadi, shu sababli bitta nosoz qabul qiluvchi boshqalarini bloklay olmaydi.

## HMAC bilan imzolash

Vebhukda `secret` mavjud bo‘lsa, OmniRoute JSON tanasini imzolaydi va quyidagilarni yuboradi:

```
Content-Type: application/json
User-Agent: OmniRoute-Webhook/1.0
X-Webhook-Event: <hodisa>
X-Webhook-Timestamp: <ISO-8601>
X-Webhook-Signature: sha256=<hex HMAC-SHA256(secret, tana)>
```

> Sarlavha nomlari `X-Webhook-*` prefiksidan foydalanadi (`X-OmniRoute-*` emas). Imzo
> qiymati `sha256=<hex>` ko‘rinishida — to‘liq prefiksni tekshiring.

Agar `createWebhook` secretsiz chaqirilsa, DB moduli uni
(`whsec_<48 hex>`) generatsiya qiladi, shuning uchun barcha vebhuklar standart holatda imzolanadi.

### Qabul qiluvchi tomonda tekshirish

```typescript
import { createHmac, timingSafeEqual } from "node:crypto";

function verify(rawBody: string, signature: string, secret: string) {
  const expected = "sha256=" + createHmac("sha256", secret).update(rawBody).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}
```

Har doim JSON’ni tahlil qilishdan oldin so‘rovning **xom** tanasiga nisbatan tekshiring.

## Qayta urinish va xatolik siyosati

`deliverWebhook(url, payload, secret, maxRetries = 3)`:

- Har bir urinish uchun 10 soniyalik kutish vaqti (`AbortController`).
- HTTP 2xx muvaffaqiyat hisoblanadi.
- HTTP 3xx/4xx qayta urinib bo‘lmaydigan yakuniy holat hisoblanadi — `success = res.ok` bilan yetkazilgan deb qayd etiladi.
- HTTP 5xx va tarmoq xatolarida eksponensial kechikish bilan qayta uriniladi:
  `2^attempt * 1000 ms` (1s, 2s, 4s).
- `maxRetries` urinishdan so‘ng yetkazib berish muvaffaqiyatsiz deb qayd etiladi.
- Har bir yetkazib berish `last_triggered_at`, `last_status` qiymatlarini yangilaydi va `failure_count` qiymatini nolga qaytaradi yoki oshiradi.
- Dispetcher har bir tarqatishdan so‘ng `disableWebhooksWithHighFailures(10)` funksiyasini chaqiradi, shuning uchun `failure_count >= 10` bo‘lgan har qanday webhook avtomatik ravishda o‘chirib qo‘yiladi.

## Ma’lumotlar bazasi

`webhooks` jadvali (`011_webhooks.sql` migratsiyasi):

| Ustun               | Tur     | Izohlar                                            |
| ------------------- | ------- | -------------------------------------------------- |
| `id`                | TEXT PK | UUID                                               |
| `url`               | TEXT    | Manzil URL’i                                       |
| `events`            | TEXT    | JSON massivi; standart qiymat `["*"]`              |
| `secret`            | TEXT    | HMAC siri (berilmasa, avtomatik yaratiladi)        |
| `enabled`           | INT     | 0/1; standart qiymat 1                             |
| `description`       | TEXT    | Ixtiyoriy foydalanuvchi uchun yorliq               |
| `created_at`        | TEXT    | `datetime('now')`                                  |
| `last_triggered_at` | TEXT    | Har bir yetkazib berish urinishida yangilanadi     |
| `last_status`       | INT     | Oxirgi urinishning HTTP holati (0 = tarmoq)        |
| `failure_count`     | INT     | Muvaffaqiyatda 0 ga qaytadi, xatolikda 1 ga oshadi |

Yetkazib berish tarixi maxsus `webhook_deliveries` jadvalida saqlanadi
(`069_webhook_deliveries.sql` migratsiyasi, har bir urinishda
`src/lib/db/webhookDeliveries.ts::insertDelivery` orqali yoziladi), bundan tashqari,
`webhooks` qatoridagi jamlangan hisoblagichlar ham yangilanadi. Tur metama’lumotlari
(Slack / Discord / Telegram / maxsus foydali yuk o‘zgartirgichlari)
`070_webhooks_kind_metadata.sql` orqali qo‘shilgan.

## REST API

Barcha so‘nggi nuqtalar boshqaruv autentifikatsiyasini (`requireManagementAuth`) talab qiladi.

| So‘nggi nuqta                   | Usul   | Tavsif                                                  |
| ------------------------------- | ------ | ------------------------------------------------------- |
| `/api/webhooks`                 | GET    | Webhook’larni ro‘yxatlash (sirlar niqoblangan)          |
| `/api/webhooks`                 | POST   | Webhook yaratish                                        |
| `/api/webhooks/[id]`            | GET    | Webhook tafsilotlari (to‘liq sir)                       |
| `/api/webhooks/[id]`            | PUT    | Maydonlarni yangilash                                   |
| `/api/webhooks/[id]`            | DELETE | Olib tashlash                                           |
| `/api/webhooks/[id]/test`       | POST   | `test.ping` yuborish (qayta urinishlarsiz)              |
| `/api/webhooks/[id]/deliveries` | GET    | Bitta webhook uchun so‘nggi yetkazib berish urinishlari |
| `/api/webhooks/validate-url`    | POST   | URL’ni oldindan tekshirish (SSRF himoyasi)              |

`GET /api/webhooks` ro‘yxat sahifalarida sir oshkor bo‘lishining oldini olish uchun uni
`<birinchi 10 ta belgi>...` ko‘rinishida niqoblaydi. Sir haqiqatan kerak bo‘lsa,
`[id]` GET so‘rovidan foydalaning.

### Webhook yaratish

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

Agar `secret` berilmasa, server `whsec_<hex>` sirini yaratadi va uni javobda
qaytaradi.

### Webhook’ni sinash

```bash
curl -X POST http://localhost:20128/api/webhooks/<id>/test \
  -H "Cookie: auth_token=..."
```

`{ delivered, status, error }` qaytaradi. Qayta urinishlar amalga oshirilmaydi — bu
qabul qiluvchi foydali yuk va imzoni qabul qilishini tezda tekshirish uchun qulay.

## Boshqaruv paneli

`/dashboard/webhooks` manzilidagi boshqaruv paneli sahifasi (`src/app/(dashboard)/dashboard/webhooks/page.tsx` fayliga qarang) quyidagilarni taqdim etadi:

- Hodisa tanlagichi yordamida webhooklarni yaratish/tahrirlash
- `enabled`, `failure_count` va `last_status` asosidagi holat indikatori (faol / nofaol / xatolik yuz bergan)
- Bir marta bosish orqali sinov yetkazib berishi
- Qoʻlda yoqish/oʻchirish tugmasi

## Foydali yuk namunalari

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
    "message": "OmniRoute’dan webhook sinov yetkazib berishi",
    "webhookId": "<uuid>"
  }
}
```

`test.ping`dan boshqa hodisalar uchun maydon tuzilmalari ularni chiqaradigan chaqiruv joylari tomonidan belgilanadi; `data` obyektini oldinga mos deb hisoblang (maydonlarni qoʻshing, ularning mavjud emasligiga tayanmang).

## Eng yaxshi amaliyotlar

- **Har bir yetkazib berishda imzoni tekshiring** — webhook URL manzilingizni topgan har qanday shaxsdan keladigan qalbakilashtirilgan POST soʻrovlarining oldini olish uchun uni ishlov berilmagan soʻrov tanasi bilan solishtiring.
- **~5 soniya ichida 2xx javobini qaytaring** — dispetcherda kutish vaqti 10 s dan keyin tugaydi. Sekin ishlaydigan qabul qiluvchilar qayta urinishlarni sarflaydi va `failure_count` qiymatini oshiradi.
- **Ishlov beruvchilarni idempotent qiling** — qayta urinishlar va kamida bir marta yetkazib berish semantikasi dublikatlar yuzaga kelishi mumkinligini anglatadi.
- **Faqat zarur hodisalarga obuna boʻling** — faqat amalda foydalanadigan hodisalaringizni roʻyxatga kiriting; `"*"` siz nazorat qilmaydigan qabul qiluvchilarda xarajatlarni oshiradi.
- **`failure_count`ni kuzatib boring** — ketma-ket 10 ta xatolikdan keyin endpointlar avtomatik ravishda oʻchiriladi; qabul qiluvchini tuzatgach, `enabled: true` bilan `PUT /api/webhooks/[id]`ni chaqirish orqali hisoblagichni tiklang.
- **Sirlarni muntazam yangilang** — yangi `secret`ni `PUT` orqali yuboring, yangi qiymatni qabul qiluvchiga joylashtiring va sinov endpointi orqali tasdiqlang.

## Shuningdek qarang

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — toʻliq boshqaruv API interfeysi
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — `request.failed` orqali koʻrsatiladigan provayder xatoliklari ortidagi avtomatik uzgich / sovish davri semantikasi
- Manba: `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`
