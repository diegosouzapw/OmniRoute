# Webhooks (Azərbaycan dili)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/WEBHOOKS.md) · 🇪🇹 [am](../../../am/docs/frameworks/WEBHOOKS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/WEBHOOKS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/WEBHOOKS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/WEBHOOKS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/WEBHOOKS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/WEBHOOKS.md) · 🇩🇰 [da](../../../da/docs/frameworks/WEBHOOKS.md) · 🇩🇪 [de](../../../de/docs/frameworks/WEBHOOKS.md) · 🇬🇷 [el](../../../el/docs/frameworks/WEBHOOKS.md) · 🇪🇸 [es](../../../es/docs/frameworks/WEBHOOKS.md) · 🇪🇪 [et](../../../et/docs/frameworks/WEBHOOKS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/WEBHOOKS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/WEBHOOKS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/WEBHOOKS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/WEBHOOKS.md) · 🇮🇱 [he](../../../he/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/WEBHOOKS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/WEBHOOKS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/WEBHOOKS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/WEBHOOKS.md) · 🇮🇩 [id](../../../id/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/WEBHOOKS.md) · 🇮🇹 [it](../../../it/docs/frameworks/WEBHOOKS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/WEBHOOKS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/WEBHOOKS.md) · 🇰🇭 [km](../../../km/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/WEBHOOKS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/WEBHOOKS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/WEBHOOKS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/WEBHOOKS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/WEBHOOKS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/WEBHOOKS.md) · 🇲🇲 [my](../../../my/docs/frameworks/WEBHOOKS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/WEBHOOKS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/WEBHOOKS.md) · 🇳🇴 [no](../../../no/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [or](../../../or/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/WEBHOOKS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/WEBHOOKS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/WEBHOOKS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/WEBHOOKS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/WEBHOOKS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/WEBHOOKS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/WEBHOOKS.md) · 🇱🇰 [si](../../../si/docs/frameworks/WEBHOOKS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/WEBHOOKS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/WEBHOOKS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/WEBHOOKS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/WEBHOOKS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [te](../../../te/docs/frameworks/WEBHOOKS.md) · 🇹🇭 [th](../../../th/docs/frameworks/WEBHOOKS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/WEBHOOKS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/WEBHOOKS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/WEBHOOKS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/WEBHOOKS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/WEBHOOKS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/WEBHOOKS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/WEBHOOKS.md)

---

> **Həqiqət mənbəyi:** `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`, `src/app/api/webhooks/`
> **Son yenilənmə:** 2026-06-28 — v3.8.40

OmniRoute platform hadisələri zamanı HTTP webhook-ları işə sala bilər. Onlardan
Slack, PagerDuty, Datadog, daxili xəbərdarlıq xidmətləri və ya istənilən HTTP qəbuledicisi ilə inteqrasiya üçün istifadə edin.

Dispetçer hər çatdırılmanı HMAC-SHA256 ilə imzalayır, müvəqqəti
xətalar zamanı yenidən cəhd edir, hər webhook üzrə çatdırılma vəziyyətini izləyir və
davamlı olaraq uğursuz olan son nöqtələri avtomatik deaktiv edir.

## Dəstəklənən hadisələr

`WebhookEvent` tipi (`src/lib/webhooks/eventDescriptions.ts`, `src/lib/webhookDispatcher.ts` tərəfindən istifadə olunur) hazırda dəqiq olaraq dörd hadisəni modelləşdirir:

| Hadisə              | İşə düşmə şərti                                                                     |
| ------------------- | ----------------------------------------------------------------------------------- |
| `request.completed` | Proksi edilmiş sorğu uğurla tamamlanır                                              |
| `request.failed`    | Proksi edilmiş sorğu bütün təkrar cəhdlərdən/ehtiyat keçidlərdən sonra uğursuz olur |
| `quota.exceeded`    | API açarı büdcə/kvota həddini keçir                                                 |
| `test.ping`         | Test son nöqtəsinin istifadə etdiyi sintetik hadisə                                 |

Abunəliklər bütün hadisələri qəbul etmək üçün hərfi `"*"` dəyərini qəbul edir. `events` daxilindəki naməlum hadisə
adları göndərmə zamanı nəzərə alınmır.

> Qeyd: dispetçer API-si qoşulub, lakin bəzi
> `test.ping` olmayan hadisələr üçün istehsal mühitindəki çağırış nöqtələri hələ də əlavə olunur. Buraxılışınızda
> hazırda hansı yolların dispetçeri çağırdığını görmək üçün `grep dispatchEvent` yoxlayın.

## Arxitektura

```
Çağıran tərəf (işləyici, xidmət, monitor)
  dispatchEvent(event, data)            [src/lib/webhookDispatcher.ts]
    -> getEnabledWebhooks()             [src/lib/db/webhooks.ts]
    -> webhook.events üzrə filtrlə
    -> hər uyğunluq üçün (paralel olaraq):
       deliverWebhook(url, payload, secret)
         faydalı yükü yarat { event, timestamp, data }
         gövdəni HMAC-SHA256 ilə imzala (secret varsa)
         10 san. taymautla POST göndər
         5xx / şəbəkə xətası zamanı 3 dəfəyədək yenidən cəhd et
       recordWebhookDelivery(id, status, success)
    -> disableWebhooksWithHighFailures(10)
```

Göndərmə çağıran tərəf üçün başladılıb unudulan rejimdədir: `Promise.allSettled`
hər webhook üzrə xətaları udur ki, nasaz bir qəbuledici digərlərini bloklamasın.

## HMAC ilə imzalama

Webhook-un `secret` dəyəri olduqda OmniRoute JSON gövdəsini imzalayır və bunları göndərir:

```
Content-Type: application/json
User-Agent: OmniRoute-Webhook/1.0
X-Webhook-Event: <event>
X-Webhook-Timestamp: <ISO-8601>
X-Webhook-Signature: sha256=<hex HMAC-SHA256(secret, body)>
```

> Başlıq adları `X-Webhook-*` prefiksindən istifadə edir (`X-OmniRoute-*` deyil). İmza
> dəyəri `sha256=<hex>` formatındadır — tam prefiksi yoxlayın.

`createWebhook` secret olmadan çağırılarsa, DB modulu bir secret yaradır
(`whsec_<48 hex>`), buna görə də bütün webhook-lar standart olaraq imzalanır.

### Qəbuledici tərəfdə yoxlama

```typescript
import { createHmac, timingSafeEqual } from "node:crypto";

function verify(rawBody: string, signature: string, secret: string) {
  const expected = "sha256=" + createHmac("sha256", secret).update(rawBody).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}
```

Həmişə hər hansı JSON emalından əvvəl **xam** sorğu gövdəsini yoxlayın.

## Təkrar cəhd və xəta siyasəti

`deliverWebhook(url, payload, secret, maxRetries = 3)`:

- Hər cəhd üçün 10 saniyəlik vaxt limiti (`AbortController`).
- HTTP 2xx uğurlu hesab olunur.
- HTTP 3xx/4xx təkrar cəhd edilməyən yekun status hesab olunur — `success = res.ok`
  ilə çatdırılmış kimi qeydə alınır.
- HTTP 5xx və şəbəkə xətaları eksponensial gecikmə ilə təkrar sınanır:
  `2^attempt * 1000 ms` (1s, 2s, 4s).
- `maxRetries` sayda təkrar cəhddən sonra çatdırılma uğursuz kimi qeydə alınır.
- Hər çatdırılma `last_triggered_at`, `last_status` sahələrini yeniləyir və
  `failure_count` sahəsini ya sıfırlayır, ya da artırır.
- Dispetçer hər çoxsaylı göndərişdən sonra `disableWebhooksWithHighFailures(10)` çağırır,
  buna görə `failure_count >= 10` olan istənilən webhook avtomatik olaraq deaktiv edilir.

## Verilənlər bazası

`webhooks` cədvəli (`011_webhooks.sql` miqrasiyası):

| Sütun               | Növ     | Qeydlər                                        |
| ------------------- | ------- | ---------------------------------------------- |
| `id`                | TEXT PK | UUID                                           |
| `url`               | TEXT    | Təyinat URL-i                                  |
| `events`            | TEXT    | JSON massivi; standart dəyər `["*"]`           |
| `secret`            | TEXT    | HMAC sirri (verilmədikdə avtomatik yaradılır)  |
| `enabled`           | INT     | 0/1; standart dəyər 1-dir                      |
| `description`       | TEXT    | İstəyə bağlı istifadəçi etiketi                |
| `created_at`        | TEXT    | `datetime('now')`                              |
| `last_triggered_at` | TEXT    | Hər çatdırılma cəhdində yenilənir              |
| `last_status`       | INT     | Son cəhdin HTTP statusu (0 = şəbəkə)           |
| `failure_count`     | INT     | Uğurlu olduqda 0-a sıfırlanır, xətada +1 artır |

Çatdırılma tarixçəsi `webhooks` sətrindəki ümumi sayğaclara əlavə olaraq, ayrıca
`webhook_deliveries` cədvəlində saxlanılır (`069_webhook_deliveries.sql` miqrasiyası,
hər cəhddə `src/lib/db/webhookDeliveries.ts::insertDelivery` vasitəsilə yazılır).
Növ metadatası (Slack / Discord / Telegram / fərdi faydalı yük çeviriciləri)
`070_webhooks_kind_metadata.sql` tərəfindən əlavə edilib.

## REST API

Bütün son nöqtələr idarəetmə autentifikasiyası (`requireManagementAuth`) tələb edir.

| Son nöqtə                       | Metod  | Təsvir                                         |
| ------------------------------- | ------ | ---------------------------------------------- |
| `/api/webhooks`                 | GET    | Webhook-ları siyahıya alır (sirlər maskalanır) |
| `/api/webhooks`                 | POST   | Webhook yaradır                                |
| `/api/webhooks/[id]`            | GET    | Webhook təfərrüatları (tam sirr)               |
| `/api/webhooks/[id]`            | PUT    | Sahələri yeniləyir                             |
| `/api/webhooks/[id]`            | DELETE | Silir                                          |
| `/api/webhooks/[id]/test`       | POST   | `test.ping` göndərir (təkrar cəhd yoxdur)      |
| `/api/webhooks/[id]/deliveries` | GET    | Bir webhook üçün son çatdırılma cəhdləri       |
| `/api/webhooks/validate-url`    | POST   | İlkin URL yoxlaması (SSRF qoruması)            |

`GET /api/webhooks` siyahı səhifələrində sızmanın qarşısını almaq üçün sirri
`<first 10 chars>...` şəklində maskalayır. Sirrə həqiqətən ehtiyacınız olduqda
`[id]` GET sorğusundan istifadə edin.

### Webhook yaratmaq

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

`secret` buraxılarsa, server `whsec_<hex>` sirri yaradır və onu cavabda qaytarır.

### Webhook-u sınaqdan keçirmək

```bash
curl -X POST http://localhost:20128/api/webhooks/<id>/test \
  -H "Cookie: auth_token=..."
```

`{ delivered, status, error }` qaytarır. Heç bir təkrar cəhd edilmir — qəbuledicinin
faydalı yükü və imzanı qəbul etdiyini sürətlə yoxlamaq üçün faydalıdır.

## İdarəetmə paneli

`/dashboard/webhooks` ünvanındakı idarəetmə paneli səhifəsi (bax:
`src/app/(dashboard)/dashboard/webhooks/page.tsx`) aşağıdakı imkanları təqdim edir:

- Hadisə seçicisi ilə webhook-lar yaratmaq/redaktə etmək
- `enabled`, `failure_count` və `last_status` əsasında status göstəricisi (aktiv / qeyri-aktiv / xətalı)
- Bir kliklə sınaq çatdırılması
- Əl ilə aktivləşdirmə/deaktivləşdirmə keçidi

## Faydalı yük nümunələri

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
    "message": "OmniRoute-dan sınaq webhook çatdırılması",
    "webhookId": "<uuid>"
  }
}
```

`test.ping` olmayan hadisələr üçün sahə strukturları onları göndərən çağırış nöqtələri tərəfindən müəyyən edilir; `data` obyektini gələcək versiyalarla uyğun hesab edin (sahələr əlavə edin, onların olmamasına əsaslanmayın).

## Ən yaxşı təcrübələr

- **Hər çatdırılmada imzanı ilkin gövdə ilə yoxlayın** — bu, webhook URL-nizi təxmin edən hər kəsdən gələn saxta POST sorğularının qarşısını alır.
- **Təxminən 5 saniyə ərzində 2xx cavabı verin** — dispetçer 10 saniyədən sonra vaxt aşımına uğrayır. Yavaş qəbuledicilər təkrar cəhdləri sərf edəcək və `failure_count` dəyərini artıracaq.
- **Emal proqramlarını idempotent edin** — təkrar cəhdlər və ən azı bir dəfə çatdırılma semantikası dublikatların mümkün olması deməkdir.
- **Minimal abunə olun** — yalnız faktiki istifadə etdiyiniz hadisələri sadalayın; `"*"` nəzarət etmədiyiniz qəbuledicilərdə əlavə xərc yaradacaq.
- **`failure_count` dəyərini izləyin** — son nöqtələr ardıcıl 10 uğursuzluqdan sonra avtomatik deaktiv edilir; qəbuledicini düzəltdikdən sonra `enabled: true` ilə `PUT /api/webhooks/[id]` çağıraraq sıfırlayın.
- **Məxfi açarları vaxtaşırı dəyişdirin** — yeni `secret` dəyərini `PUT` ilə göndərin, yeni dəyəri qəbuledicidə yerləşdirin və sınaq son nöqtəsi vasitəsilə təsdiqləyin.

## Həmçinin baxın

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — idarəetmə API-sinin tam imkanları
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — `request.failed` vasitəsilə göstərilən provayder uğursuzluqlarının arxasındakı dövrə kəsicisi / gözləmə müddəti semantikası
- Mənbə: `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`
