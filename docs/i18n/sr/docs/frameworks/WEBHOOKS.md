# Webhooks (Српски)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/WEBHOOKS.md) · 🇪🇹 [am](../../../am/docs/frameworks/WEBHOOKS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/WEBHOOKS.md) · 🇦🇿 [az](../../../az/docs/frameworks/WEBHOOKS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/WEBHOOKS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/WEBHOOKS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/WEBHOOKS.md) · 🇩🇰 [da](../../../da/docs/frameworks/WEBHOOKS.md) · 🇩🇪 [de](../../../de/docs/frameworks/WEBHOOKS.md) · 🇬🇷 [el](../../../el/docs/frameworks/WEBHOOKS.md) · 🇪🇸 [es](../../../es/docs/frameworks/WEBHOOKS.md) · 🇪🇪 [et](../../../et/docs/frameworks/WEBHOOKS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/WEBHOOKS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/WEBHOOKS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/WEBHOOKS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/WEBHOOKS.md) · 🇮🇱 [he](../../../he/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/WEBHOOKS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/WEBHOOKS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/WEBHOOKS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/WEBHOOKS.md) · 🇮🇩 [id](../../../id/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/WEBHOOKS.md) · 🇮🇹 [it](../../../it/docs/frameworks/WEBHOOKS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/WEBHOOKS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/WEBHOOKS.md) · 🇰🇭 [km](../../../km/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/WEBHOOKS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/WEBHOOKS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/WEBHOOKS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/WEBHOOKS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/WEBHOOKS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/WEBHOOKS.md) · 🇲🇲 [my](../../../my/docs/frameworks/WEBHOOKS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/WEBHOOKS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/WEBHOOKS.md) · 🇳🇴 [no](../../../no/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [or](../../../or/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/WEBHOOKS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/WEBHOOKS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/WEBHOOKS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/WEBHOOKS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/WEBHOOKS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/WEBHOOKS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/WEBHOOKS.md) · 🇱🇰 [si](../../../si/docs/frameworks/WEBHOOKS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/WEBHOOKS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/WEBHOOKS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/WEBHOOKS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [te](../../../te/docs/frameworks/WEBHOOKS.md) · 🇹🇭 [th](../../../th/docs/frameworks/WEBHOOKS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/WEBHOOKS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/WEBHOOKS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/WEBHOOKS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/WEBHOOKS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/WEBHOOKS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/WEBHOOKS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/WEBHOOKS.md)

---

> **Извор истине:** `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`, `src/app/api/webhooks/`
> **Последње ажурирање:** 2026-06-28 — v3.8.40

OmniRoute може да шаље HTTP webhook-ове при догађајима на платформи. Користите их за интеграцију са
Slack-ом, PagerDuty-јем, Datadog-ом, интерним сервисима за упозоравање или било којим HTTP пријемником.

Диспечер потписује сваку испоруку помоћу HMAC-SHA256, поново покушава испоруку при привременим
грешкама, прати стање испоруке за сваки webhook и аутоматски онемогућава крајње тачке које
настављају да отказују.

## Подржани догађаји

Тип `WebhookEvent` (`src/lib/webhooks/eventDescriptions.ts`, који користи `src/lib/webhookDispatcher.ts`) тренутно моделује тачно четири догађаја:

| Догађај             | Активира се када                                                        |
| ------------------- | ----------------------------------------------------------------------- |
| `request.completed` | Проксирани захтев се успешно заврши                                     |
| `request.failed`    | Проксирани захтев не успе након свих поновних покушаја/резервних опција |
| `quota.exceeded`    | API кључ пређе праг буџета/квоте                                        |
| `test.ping`         | Синтетички догађај који користи тестна крајња тачка                     |

Претплате прихватају литерал `"*"` за пријем сваког догађаја. Непознати називи
догађаја у `events` игноришу се у време слања.

> Напомена: API диспечера је повезан, али се продукцијска места позива за неке
> догађаје који нису `test.ping` још увек уводе. Проверите `grep dispatchEvent` да бисте видели
> које путање тренутно позивају диспечер у вашем издању.

## Архитектура

```
Позивалац (руковалац, сервис, монитор)
  dispatchEvent(event, data)            [src/lib/webhookDispatcher.ts]
    -> getEnabledWebhooks()             [src/lib/db/webhooks.ts]
    -> филтрирај према webhook.events
    -> за свако подударање (паралелно):
       deliverWebhook(url, payload, secret)
         направи payload { event, timestamp, data }
         потпиши тело помоћу HMAC-SHA256 (ако постоји secret)
         POST са временским ограничењем од 10 s
         понови до 3 пута при 5xx / мрежној грешци
       recordWebhookDelivery(id, status, success)
    -> disableWebhooksWithHighFailures(10)
```

Слање се за позиваоца обавља по принципу „покрени и настави“: `Promise.allSettled` потискује
грешке појединачних webhook-ова, тако да један неисправан пријемник не може да блокира остале.

## HMAC потписивање

Када webhook има `secret`, OmniRoute потписује JSON тело и шаље:

```
Content-Type: application/json
User-Agent: OmniRoute-Webhook/1.0
X-Webhook-Event: <event>
X-Webhook-Timestamp: <ISO-8601>
X-Webhook-Signature: sha256=<hex HMAC-SHA256(secret, body)>
```

> Називи заглавља користе префикс `X-Webhook-*` (не `X-OmniRoute-*`). Вредност потписа
> је `sha256=<hex>` — проверите цео префикс.

Ако се `createWebhook` позове без тајне, DB модул генерише једну
(`whsec_<48 hex>`), тако да су сви webhook-ови подразумевано потписани.

### Провера на пријемнику

```typescript
import { createHmac, timingSafeEqual } from "node:crypto";

function verify(rawBody: string, signature: string, secret: string) {
  const expected = "sha256=" + createHmac("sha256", secret).update(rawBody).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}
```

Увек проверавајте у односу на **необрађено** тело захтева, пре било каквог JSON рашчлањивања.

## Политика поновних покушаја и неуспеха

`deliverWebhook(url, payload, secret, maxRetries = 3)`:

- Временско ограничење од 10 секунди по покушају (`AbortController`).
- HTTP 2xx се сматра успехом.
- HTTP 3xx/4xx се сматра коначним статусом без поновног покушаја — бележи се као испоручено
  са `success = res.ok`.
- За HTTP 5xx и мрежне грешке покушај се понавља уз експоненцијално повећање времена чекања:
  `2^attempt * 1000 ms` (1s, 2s, 4s).
- Након `maxRetries`, испорука се бележи као неуспешна.
- Свака испорука ажурира `last_triggered_at`, `last_status` и ресетује
  или увећава `failure_count`.
- Диспечер позива `disableWebhooksWithHighFailures(10)` након сваког скупног слања,
  тако да се сваки webhook са `failure_count >= 10` аутоматски онемогућава.

## База података

Табела `webhooks` (миграција `011_webhooks.sql`):

| Колона              | Тип     | Напомене                                              |
| ------------------- | ------- | ----------------------------------------------------- |
| `id`                | TEXT PK | UUID                                                  |
| `url`               | TEXT    | Одредишни URL                                         |
| `events`            | TEXT    | JSON низ; подразумевано `["*"]`                       |
| `secret`            | TEXT    | HMAC тајна (аутоматски се генерише ако није наведена) |
| `enabled`           | INT     | 0/1; подразумевано 1                                  |
| `description`       | TEXT    | Опционална ознака читљива људима                      |
| `created_at`        | TEXT    | `datetime('now')`                                     |
| `last_triggered_at` | TEXT    | Ажурира се при сваком покушају испоруке               |
| `last_status`       | INT     | HTTP статус последњег покушаја (0 = мрежа)            |
| `failure_count`     | INT     | Ресетује се на 0 при успеху, +1 при неуспеху          |

Историја испорука се трајно чува у наменској табели `webhook_deliveries`
(миграција `069_webhook_deliveries.sql`, уписује се преко
`src/lib/db/webhookDeliveries.ts::insertDelivery` при сваком покушају), поред
збирних бројача у реду табеле `webhooks`. Метаподаци о врсти (Slack / Discord /
Telegram / прилагођени трансформатори садржаја) додати су миграцијом `070_webhooks_kind_metadata.sql`.

## REST API

Све крајње тачке захтевају управљачку аутентификацију (`requireManagementAuth`).

| Крајња тачка                    | Метод  | Опис                                               |
| ------------------------------- | ------ | -------------------------------------------------- |
| `/api/webhooks`                 | GET    | Приказ webhook-ова (тајне су маскиране)            |
| `/api/webhooks`                 | POST   | Креирање webhook-а                                 |
| `/api/webhooks/[id]`            | GET    | Детаљи webhook-а (пуна тајна)                      |
| `/api/webhooks/[id]`            | PUT    | Ажурирање поља                                     |
| `/api/webhooks/[id]`            | DELETE | Уклањање                                           |
| `/api/webhooks/[id]/test`       | POST   | Слање догађаја `test.ping` (без поновних покушаја) |
| `/api/webhooks/[id]/deliveries` | GET    | Недавни покушаји испоруке за један webhook         |
| `/api/webhooks/validate-url`    | POST   | Прелиминарна валидација URL-а (SSRF заштита)       |

`GET /api/webhooks` маскира тајну у облику `<првих 10 знакова>...` како би се спречило њено откривање
на страницама са списковима. Користите `[id]` GET када вам је тајна заиста потребна.

### Креирање webhook-а

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

Ако је `secret` изостављен, сервер генерише тајну `whsec_<hex>` и враћа
је у одговору.

### Тестирање webhook-а

```bash
curl -X POST http://localhost:20128/api/webhooks/<id>/test \
  -H "Cookie: auth_token=..."
```

Враћа `{ delivered, status, error }`. Не обављају се поновни покушаји — корисно за
брзу проверу да ли прималац прихвата садржај и потпис.

## Kontrolna tabla

Stranica kontrolne table na `/dashboard/webhooks` (pogledajte
`src/app/(dashboard)/dashboard/webhooks/page.tsx`) omogućava:

- Kreiranje/uređivanje webhook-ova pomoću birača događaja
- Indikator statusa (aktivan / neaktivan / sa greškom) na osnovu `enabled`,
  `failure_count` i `last_status`
- Probnu isporuku jednim klikom
- Ručno uključivanje/isključivanje

## Primeri korisnog sadržaja

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

Strukture polja za događaje koji nisu `test.ping` definisane su na mestima poziva
koja ih emituju; tretirajte objekat `data` kao kompatibilan sa budućim verzijama
(dodajte polja, nemojte se oslanjati na njihovo odsustvo).

## Najbolje prakse

- **Proverite potpis pri svakoj isporuci** u odnosu na neobrađeno telo — time se
  sprečavaju lažirani POST zahtevi od bilo koga ko pogodi URL vašeg webhook-a.
- **Odgovorite statusom 2xx u roku od ~5 sekundi** — dispečer prekida zahtev nakon
  10 s. Spori primaoci će trošiti ponovne pokušaje i povećavati `failure_count`.
- **Učinite obrađivače idempotentnim** — ponovni pokušaji i semantika isporuke
  najmanje jednom znače da su duplikati mogući.
- **Pretplaćujte se minimalno** — navedite samo događaje koje zaista koristite;
  `"*"` će povećati troškove na primaocima koje ne kontrolišete.
- **Pratite `failure_count`** — krajnje tačke se automatski onemogućavaju nakon
  10 uzastopnih neuspeha; resetujte ih pozivom `PUT /api/webhooks/[id]` sa
  `enabled: true` nakon što popravite primaoca.
- **Periodično menjajte tajne** — pošaljite novu vrednost `secret` pomoću `PUT`,
  postavite novu vrednost na primaocu i potvrdite je putem probne krajnje tačke.

## Pogledajte i

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — kompletan skup funkcionalnosti API-ja za upravljanje
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — semantika prekidača kola / perioda oporavka
  iza grešaka dobavljača prikazanih putem `request.failed`
- Izvor: `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`
