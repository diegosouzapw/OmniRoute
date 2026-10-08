# Webhooks (Русский)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/WEBHOOKS.md) · 🇪🇹 [am](../../../am/docs/frameworks/WEBHOOKS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/WEBHOOKS.md) · 🇦🇿 [az](../../../az/docs/frameworks/WEBHOOKS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/WEBHOOKS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/WEBHOOKS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/WEBHOOKS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/WEBHOOKS.md) · 🇩🇰 [da](../../../da/docs/frameworks/WEBHOOKS.md) · 🇩🇪 [de](../../../de/docs/frameworks/WEBHOOKS.md) · 🇬🇷 [el](../../../el/docs/frameworks/WEBHOOKS.md) · 🇪🇸 [es](../../../es/docs/frameworks/WEBHOOKS.md) · 🇪🇪 [et](../../../et/docs/frameworks/WEBHOOKS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/WEBHOOKS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/WEBHOOKS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/WEBHOOKS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/WEBHOOKS.md) · 🇮🇱 [he](../../../he/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/WEBHOOKS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/WEBHOOKS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/WEBHOOKS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/WEBHOOKS.md) · 🇮🇩 [id](../../../id/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/WEBHOOKS.md) · 🇮🇹 [it](../../../it/docs/frameworks/WEBHOOKS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/WEBHOOKS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/WEBHOOKS.md) · 🇰🇭 [km](../../../km/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/WEBHOOKS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/WEBHOOKS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/WEBHOOKS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/WEBHOOKS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/WEBHOOKS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/WEBHOOKS.md) · 🇲🇲 [my](../../../my/docs/frameworks/WEBHOOKS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/WEBHOOKS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/WEBHOOKS.md) · 🇳🇴 [no](../../../no/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [or](../../../or/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/WEBHOOKS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/WEBHOOKS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/WEBHOOKS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/WEBHOOKS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/WEBHOOKS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/WEBHOOKS.md) · 🇱🇰 [si](../../../si/docs/frameworks/WEBHOOKS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/WEBHOOKS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/WEBHOOKS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/WEBHOOKS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/WEBHOOKS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [te](../../../te/docs/frameworks/WEBHOOKS.md) · 🇹🇭 [th](../../../th/docs/frameworks/WEBHOOKS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/WEBHOOKS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/WEBHOOKS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/WEBHOOKS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/WEBHOOKS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/WEBHOOKS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/WEBHOOKS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/WEBHOOKS.md)

---

> **Источник истины:** `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`, `src/app/api/webhooks/`
> **Последнее обновление:** 2026-06-28 — v3.8.40

OmniRoute может отправлять HTTP-вебхуки при возникновении событий платформы. Используйте их для интеграции со
Slack, PagerDuty, Datadog, внутренними службами оповещения или любым HTTP-получателем.

Диспетчер подписывает каждую доставку с помощью HMAC-SHA256, повторяет попытки при временных
сбоях, отслеживает состояние доставки для каждого вебхука и автоматически отключает конечные точки,
которые продолжают завершаться с ошибкой.

## Поддерживаемые события

Тип `WebhookEvent` (`src/lib/webhooks/eventDescriptions.ts`, используемый в `src/lib/webhookDispatcher.ts`) в настоящее время моделирует ровно четыре события:

| Событие             | Когда срабатывает                                                                               |
| ------------------- | ----------------------------------------------------------------------------------------------- |
| `request.completed` | Проксируемый запрос успешно завершается                                                         |
| `request.failed`    | Проксируемый запрос завершается с ошибкой после всех повторных попыток и резервных переключений |
| `quota.exceeded`    | API-ключ превышает порог бюджета или квоты                                                      |
| `test.ping`         | Синтетическое событие, используемое тестовой конечной точкой                                    |

В подписках можно указать литерал `"*"`, чтобы получать все события. Неизвестные имена
событий в `events` игнорируются во время диспетчеризации.

> Примечание: API диспетчера подключён, но рабочие точки вызова для некоторых
> событий, отличных от `test.ping`, всё ещё внедряются. Выполните `grep dispatchEvent`, чтобы узнать,
> какие пути в вашем выпуске сейчас вызывают диспетчер.

## Архитектура

```
Вызывающая сторона (обработчик, служба, монитор)
  dispatchEvent(event, data)            [src/lib/webhookDispatcher.ts]
    -> getEnabledWebhooks()             [src/lib/db/webhooks.ts]
    -> фильтрация по webhook.events
    -> для каждого совпадения (параллельно):
       deliverWebhook(url, payload, secret)
         формирование полезной нагрузки { event, timestamp, data }
         подпись тела с помощью HMAC-SHA256 (если указан секрет)
         POST с тайм-аутом 10 с
         до 3 повторных попыток при ошибке 5xx / сетевой ошибке
       recordWebhookDelivery(id, status, success)
    -> disableWebhooksWithHighFailures(10)
```

Для вызывающей стороны диспетчеризация выполняется по принципу «отправил и забыл»: `Promise.allSettled` поглощает
ошибки отдельных вебхуков, поэтому один неисправный получатель не может заблокировать остальные.

## Подписание с помощью HMAC

Если у вебхука есть `secret`, OmniRoute подписывает тело JSON и отправляет:

```
Content-Type: application/json
User-Agent: OmniRoute-Webhook/1.0
X-Webhook-Event: <event>
X-Webhook-Timestamp: <ISO-8601>
X-Webhook-Signature: sha256=<hex HMAC-SHA256(secret, body)>
```

> Имена заголовков используют префикс `X-Webhook-*` (а не `X-OmniRoute-*`). Значение подписи
> имеет вид `sha256=<hex>` — проверяйте его вместе с полным префиксом.

Если `createWebhook` вызывается без секрета, модуль БД генерирует его
(`whsec_<48 hex>`), поэтому по умолчанию все вебхуки подписываются.

### Проверка на стороне получателя

```typescript
import { createHmac, timingSafeEqual } from "node:crypto";

function verify(rawBody: string, signature: string, secret: string) {
  const expected = "sha256=" + createHmac("sha256", secret).update(rawBody).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}
```

Всегда выполняйте проверку по **необработанному** телу запроса до любого разбора JSON.

## Политика повторных попыток и обработки сбоев

`deliverWebhook(url, payload, secret, maxRetries = 3)`:

- Тайм-аут каждой попытки составляет 10 секунд (`AbortController`).
- Ответ HTTP 2xx считается успешным.
- Ответ HTTP 3xx/4xx считается окончательным статусом, не допускающим повторной попытки, — доставка регистрируется
  со значением `success = res.ok`.
- При ответах HTTP 5xx и сетевых ошибках выполняются повторные попытки с экспоненциальной задержкой:
  `2^attempt * 1000 ms` (1 с, 2 с, 4 с).
- После `maxRetries` доставка регистрируется как неуспешная.
- При каждой доставке обновляются `last_triggered_at`, `last_status`, а `failure_count` либо сбрасывается,
  либо увеличивается.
- После каждой массовой рассылки диспетчер вызывает `disableWebhooksWithHighFailures(10)`,
  поэтому любой вебхук с `failure_count >= 10` автоматически отключается.

## База данных

Таблица `webhooks` (миграция `011_webhooks.sql`):

| Столбец             | Тип     | Примечания                                               |
| ------------------- | ------- | -------------------------------------------------------- |
| `id`                | TEXT PK | UUID                                                     |
| `url`               | TEXT    | URL назначения                                           |
| `events`            | TEXT    | Массив JSON; по умолчанию `["*"]`                        |
| `secret`            | TEXT    | Секрет HMAC (генерируется автоматически, если не указан) |
| `enabled`           | INT     | 0/1; по умолчанию 1                                      |
| `description`       | TEXT    | Необязательная понятная пользователю метка               |
| `created_at`        | TEXT    | `datetime('now')`                                        |
| `last_triggered_at` | TEXT    | Обновляется при каждой попытке доставки                  |
| `last_status`       | INT     | HTTP-статус последней попытки (0 = сетевая ошибка)       |
| `failure_count`     | INT     | Сбрасывается до 0 при успехе, +1 при сбое                |

История доставок сохраняется в отдельной таблице `webhook_deliveries`
(миграция `069_webhook_deliveries.sql`, запись выполняется через
`src/lib/db/webhookDeliveries.ts::insertDelivery` при каждой попытке) в дополнение
к агрегированным счётчикам в строке `webhooks`. Метаданные типа (Slack / Discord /
Telegram / пользовательские преобразователи полезной нагрузки) были добавлены миграцией `070_webhooks_kind_metadata.sql`.

## REST API

Все конечные точки требуют аутентификации управления (`requireManagementAuth`).

| Конечная точка                  | Метод  | Описание                                               |
| ------------------------------- | ------ | ------------------------------------------------------ |
| `/api/webhooks`                 | GET    | Получить список вебхуков (секреты замаскированы)       |
| `/api/webhooks`                 | POST   | Создать вебхук                                         |
| `/api/webhooks/[id]`            | GET    | Получить сведения о вебхуке (полный секрет)            |
| `/api/webhooks/[id]`            | PUT    | Обновить поля                                          |
| `/api/webhooks/[id]`            | DELETE | Удалить                                                |
| `/api/webhooks/[id]/test`       | POST   | Отправить `test.ping` (без повторных попыток)          |
| `/api/webhooks/[id]/deliveries` | GET    | Получить последние попытки доставки для одного вебхука |
| `/api/webhooks/validate-url`    | POST   | Предварительно проверить URL (защита от SSRF)          |

`GET /api/webhooks` маскирует секрет до `<первые 10 символов>...`, чтобы избежать его утечки
на страницах со списками. Используйте GET-запрос к `[id]`, когда вам действительно нужен секрет.

### Создание вебхука

```bash
curl -X POST http://localhost:20128/api/webhooks \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://hooks.slack.com/services/...",
    "secret": "whsec_my_shared_secret",
    "events": ["quota.exceeded", "request.failed"],
    "description": "Оповещения Slack"
  }'
```

Если `secret` не указан, сервер генерирует секрет `whsec_<hex>` и возвращает
его в ответе.

### Тестирование вебхука

```bash
curl -X POST http://localhost:20128/api/webhooks/<id>/test \
  -H "Cookie: auth_token=..."
```

Возвращает `{ delivered, status, error }`. Повторные попытки не выполняются — это удобно для
быстрой проверки того, что получатель принимает полезную нагрузку и подпись.

## Панель управления

Страница панели управления по адресу `/dashboard/webhooks` (см.
`src/app/(dashboard)/dashboard/webhooks/page.tsx`) предоставляет следующие возможности:

- Создание и редактирование вебхуков с выбором событий
- Индикатор состояния (активен / неактивен / ошибка) на основе `enabled`,
  `failure_count` и `last_status`
- Тестовая доставка одним нажатием
- Ручное включение и отключение

## Примеры полезной нагрузки

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
    "message": "Тестовая доставка вебхука из OmniRoute",
    "webhookId": "<uuid>"
  }
}
```

Структура полей для событий, отличных от `test.ping`, определяется местами вызова,
которые их создают; считайте объект `data` обратно совместимым при расширении
(добавляйте поля, не полагайтесь на их отсутствие).

## Рекомендации

- **Проверяйте подпись при каждой доставке** по необработанному телу запроса — это
  предотвращает поддельные POST-запросы от тех, кто угадал URL вашего вебхука.
- **Отвечайте кодом 2xx в течение ~5 секунд** — время ожидания диспетчера истекает
  через 10 с. Медленные получатели будут расходовать повторные попытки и увеличивать
  `failure_count`.
- **Обеспечьте идемпотентность обработчиков** — повторные попытки и семантика
  доставки «как минимум один раз» означают, что возможны дубликаты.
- **Подписывайтесь только на необходимое** — указывайте только те события, которые
  вы действительно обрабатываете; `"*"` увеличит нагрузку на получателей, которыми
  вы не управляете.
- **Следите за `failure_count`** — конечные точки автоматически отключаются после
  10 последовательных сбоев; после исправления получателя сбросьте счётчик, вызвав
  `PUT /api/webhooks/[id]` с `enabled: true`.
- **Периодически меняйте секреты** — отправьте новый `secret` с помощью `PUT`,
  разверните новое значение на стороне получателя и проверьте его через тестовую
  конечную точку.

## См. также

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — полный набор методов API управления
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — семантика автоматического
  выключателя и периода восстановления для сбоев провайдера, передаваемых через `request.failed`
- Исходный код: `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`
