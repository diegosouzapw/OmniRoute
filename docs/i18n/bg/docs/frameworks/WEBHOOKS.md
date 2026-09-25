# Webhooks (Български)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/WEBHOOKS.md) · 🇪🇹 [am](../../../am/docs/frameworks/WEBHOOKS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/WEBHOOKS.md) · 🇦🇿 [az](../../../az/docs/frameworks/WEBHOOKS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/WEBHOOKS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/WEBHOOKS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/WEBHOOKS.md) · 🇩🇰 [da](../../../da/docs/frameworks/WEBHOOKS.md) · 🇩🇪 [de](../../../de/docs/frameworks/WEBHOOKS.md) · 🇬🇷 [el](../../../el/docs/frameworks/WEBHOOKS.md) · 🇪🇸 [es](../../../es/docs/frameworks/WEBHOOKS.md) · 🇪🇪 [et](../../../et/docs/frameworks/WEBHOOKS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/WEBHOOKS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/WEBHOOKS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/WEBHOOKS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/WEBHOOKS.md) · 🇮🇱 [he](../../../he/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/WEBHOOKS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/WEBHOOKS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/WEBHOOKS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/WEBHOOKS.md) · 🇮🇩 [id](../../../id/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/WEBHOOKS.md) · 🇮🇹 [it](../../../it/docs/frameworks/WEBHOOKS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/WEBHOOKS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/WEBHOOKS.md) · 🇰🇭 [km](../../../km/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/WEBHOOKS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/WEBHOOKS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/WEBHOOKS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/WEBHOOKS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/WEBHOOKS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/WEBHOOKS.md) · 🇲🇲 [my](../../../my/docs/frameworks/WEBHOOKS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/WEBHOOKS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/WEBHOOKS.md) · 🇳🇴 [no](../../../no/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [or](../../../or/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/WEBHOOKS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/WEBHOOKS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/WEBHOOKS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/WEBHOOKS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/WEBHOOKS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/WEBHOOKS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/WEBHOOKS.md) · 🇱🇰 [si](../../../si/docs/frameworks/WEBHOOKS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/WEBHOOKS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/WEBHOOKS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/WEBHOOKS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/WEBHOOKS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [te](../../../te/docs/frameworks/WEBHOOKS.md) · 🇹🇭 [th](../../../th/docs/frameworks/WEBHOOKS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/WEBHOOKS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/WEBHOOKS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/WEBHOOKS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/WEBHOOKS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/WEBHOOKS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/WEBHOOKS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/WEBHOOKS.md)

---

> **Източник на истината:** `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`, `src/app/api/webhooks/`
> **Последно актуализирано:** 2026-06-28 — v3.8.40

OmniRoute може да изпраща HTTP уеб куки при събития в платформата. Използвайте ги за интеграция със
Slack, PagerDuty, Datadog, вътрешни услуги за известяване или произволен HTTP приемник.

Диспечерът подписва всяка доставка с HMAC-SHA256, извършва повторни опити при временни
неуспехи, следи състоянието на доставките за всяка уеб кука и автоматично деактивира крайните точки, които
продължават да се провалят.

## Поддържани събития

Типът `WebhookEvent` (`src/lib/webhooks/eventDescriptions.ts`, използван от `src/lib/webhookDispatcher.ts`) в момента моделира точно четири събития:

| Събитие             | Задейства се, когато                                     |
| ------------------- | -------------------------------------------------------- |
| `request.completed` | Проксирaна заявка завърши успешно                        |
| `request.failed`    | Проксирaна заявка се провали след всички опити/резерви   |
| `quota.exceeded`    | API ключ премине праг на бюджет/квота                    |
| `test.ping`         | Синтетично събитие, използвано от тестовата крайна точка |

Абонаментите приемат литерала `"*"`, за да получават всяко събитие. Неизвестните имена на
събития в `events` се игнорират по време на изпращането.

> Забележка: API на диспечера е свързан, но продукционните места за извикване за някои от
> събитията, различни от `test.ping`, все още се добавят. Проверете `grep dispatchEvent`, за да видите
> кои пътища в момента извикват диспечера във вашата версия.

## Архитектура

```
Извикващ код (обработчик, услуга, монитор)
  dispatchEvent(event, data)            [src/lib/webhookDispatcher.ts]
    -> getEnabledWebhooks()             [src/lib/db/webhooks.ts]
    -> филтриране по webhook.events
    -> за всяко съвпадение (паралелно):
       deliverWebhook(url, payload, secret)
         създаване на payload { event, timestamp, data }
         подписване на body с HMAC-SHA256 (ако има secret)
         POST с 10s изчакване
         до 3 повторни опита при 5xx / мрежова грешка
       recordWebhookDelivery(id, status, success)
    -> disableWebhooksWithHighFailures(10)
```

Изпращането е асинхронно и без изчакване за извикващия код: `Promise.allSettled` поглъща
грешките на отделните уеб куки, така че един неизправен приемник да не може да блокира останалите.

## Подписване с HMAC

Когато дадена уеб кука има `secret`, OmniRoute подписва JSON съдържанието и изпраща:

```
Content-Type: application/json
User-Agent: OmniRoute-Webhook/1.0
X-Webhook-Event: <event>
X-Webhook-Timestamp: <ISO-8601>
X-Webhook-Signature: sha256=<hex HMAC-SHA256(secret, body)>
```

> Имената на заглавките използват префикса `X-Webhook-*` (а не `X-OmniRoute-*`). Стойността на
> подписа е `sha256=<hex>` — проверявайте пълния префикс.

Ако `createWebhook` бъде извикана без таен ключ, DB модулът генерира такъв
(`whsec_<48 hex>`), така че по подразбиране всички уеб куки са подписани.

### Проверка при приемника

```typescript
import { createHmac, timingSafeEqual } from "node:crypto";

function verify(rawBody: string, signature: string, secret: string) {
  const expected = "sha256=" + createHmac("sha256", secret).update(rawBody).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}
```

Винаги проверявайте спрямо **необработеното** тяло на заявката, преди какъвто и да е JSON анализ.

## Политика за повторни опити и неуспехи

`deliverWebhook(url, payload, secret, maxRetries = 3)`:

- 10-секундно изчакване за всеки опит (`AbortController`).
- HTTP 2xx се счита за успех.
- HTTP 3xx/4xx се счита за окончателен статус без повторен опит — записва се като доставено
  със `success = res.ok`.
- При HTTP 5xx и мрежови грешки се правят повторни опити с експоненциално изчакване:
  `2^attempt * 1000 ms` (1s, 2s, 4s).
- След `maxRetries` доставката се записва като неуспешна.
- Всяка доставка актуализира `last_triggered_at`, `last_status` и нулира
  или увеличава `failure_count`.
- Диспечерът извиква `disableWebhooksWithHighFailures(10)` след всяко разпращане,
  така че всеки webhook с `failure_count >= 10` автоматично се деактивира.

## База данни

Таблица `webhooks` (миграция `011_webhooks.sql`):

| Колона              | Тип     | Бележки                                                |
| ------------------- | ------- | ------------------------------------------------------ |
| `id`                | TEXT PK | UUID                                                   |
| `url`               | TEXT    | URL на местоназначението                               |
| `events`            | TEXT    | JSON масив; по подразбиране `["*"]`                    |
| `secret`            | TEXT    | HMAC тайна (автоматично генерирана, ако не е зададена) |
| `enabled`           | INT     | 0/1; по подразбиране 1                                 |
| `description`       | TEXT    | Незадължителен разбираем етикет                        |
| `created_at`        | TEXT    | `datetime('now')`                                      |
| `last_triggered_at` | TEXT    | Актуализира се при всеки опит за доставка              |
| `last_status`       | INT     | HTTP статус на последния опит (0 = мрежова грешка)     |
| `failure_count`     | INT     | Нулира се при успех, +1 при неуспех                    |

Историята на доставките се съхранява в специалната таблица `webhook_deliveries`
(миграция `069_webhook_deliveries.sql`, записвана чрез
`src/lib/db/webhookDeliveries.ts::insertDelivery` при всеки опит), в допълнение
към обобщените броячи в реда на `webhooks`. Метаданните за вида (Slack / Discord /
Telegram / персонализирани преобразуватели на полезния товар) са добавени чрез `070_webhooks_kind_metadata.sql`.

## REST API

Всички крайни точки изискват удостоверяване за управление (`requireManagementAuth`).

| Крайна точка                    | Метод  | Описание                                       |
| ------------------------------- | ------ | ---------------------------------------------- |
| `/api/webhooks`                 | GET    | Извеждане на webhooks (тайните са маскирани)   |
| `/api/webhooks`                 | POST   | Създаване на webhook                           |
| `/api/webhooks/[id]`            | GET    | Подробности за webhook (пълната тайна)         |
| `/api/webhooks/[id]`            | PUT    | Актуализиране на полета                        |
| `/api/webhooks/[id]`            | DELETE | Премахване                                     |
| `/api/webhooks/[id]/test`       | POST   | Изпращане на `test.ping` (без повторни опити)  |
| `/api/webhooks/[id]/deliveries` | GET    | Скорошни опити за доставка за един webhook     |
| `/api/webhooks/validate-url`    | POST   | Предварителна проверка на URL (защита от SSRF) |

`GET /api/webhooks` маскира тайната до `<първите 10 знака>...`, за да се избегне
разкриването ѝ на страниците със списъци. Използвайте GET за `[id]`, когато действително
се нуждаете от тайната.

### Създаване на webhook

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

Ако `secret` е пропуснато, сървърът генерира тайна `whsec_<hex>` и я връща
в отговора.

### Тестване на webhook

```bash
curl -X POST http://localhost:20128/api/webhooks/<id>/test \
  -H "Cookie: auth_token=..."
```

Връща `{ delivered, status, error }`. Не се правят повторни опити — полезно е за
бърза проверка дали получателят приема полезния товар и подписа.

## Табло

Страницата на таблото на адрес `/dashboard/webhooks` (вижте
`src/app/(dashboard)/dashboard/webhooks/page.tsx`) предоставя:

- Създаване/редактиране на уебкуки с инструмент за избор на събития
- Индикатор за състояние (активен / неактивен / с грешка) въз основа на `enabled`,
  `failure_count` и `last_status`
- Тестово изпращане с едно щракване
- Ръчно превключване между активирано и деактивирано състояние

## Примери за полезни данни

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
    "message": "Тестово изпращане на уебкук от OmniRoute",
    "webhookId": "<uuid>"
  }
}
```

Структурите на полетата за събития, различни от `test.ping`, се определят от местата на извикване, които ги генерират; третирайте обекта `data` като съвместим с бъдещи версии (добавяйте полета, не разчитайте на тяхното отсъствие).

## Добри практики

- **Проверявайте подписа при всяко изпращане** спрямо необработеното тяло — това предотвратява
  фалшифицирани POST заявки от всеки, който отгатне URL адреса на вашия уебкук.
- **Отговаряйте с 2xx в рамките на ~5 секунди** — диспечерът прекратява заявката след 10 s. Бавните
  получатели ще изчерпят повторните опити и ще увеличат `failure_count`.
- **Направете обработчиците идемпотентни** — повторните опити и семантиката за доставка поне веднъж
  означават, че са възможни дубликати.
- **Абонирайте се минимално** — посочвайте само събитията, които действително използвате; `"*"` ще
  увеличи разходите за получатели, които не контролирате.
- **Следете `failure_count`** — крайните точки се деактивират автоматично след 10 последователни
  неуспеха; нулирайте брояча, като извикате `PUT /api/webhooks/[id]` с `enabled: true`,
  след като коригирате получателя.
- **Сменяйте тайните периодично** — изпратете с `PUT` нова стойност за `secret`, внедрете новата стойност
  при получателя и потвърдете чрез тестовата крайна точка.

## Вижте също

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — пълният интерфейс на API за управление
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — семантика на прекъсвача на веригата / периода за възстановяване
  при грешки на доставчика, показвани чрез `request.failed`
- Изходен код: `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`
