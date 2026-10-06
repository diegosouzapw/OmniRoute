# Router Backends & Embedded Services — architecture contract (ADR) (Русский)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/ROUTER_BACKENDS.md) · 🇪🇹 [am](../../../am/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇦 [ar](../../../ar/docs/architecture/ROUTER_BACKENDS.md) · 🇦🇿 [az](../../../az/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇬 [bg](../../../bg/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇩 [bn](../../../bn/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇦 [bs](../../../bs/docs/architecture/ROUTER_BACKENDS.md) · 🇨🇿 [cs](../../../cs/docs/architecture/ROUTER_BACKENDS.md) · 🇩🇰 [da](../../../da/docs/architecture/ROUTER_BACKENDS.md) · 🇩🇪 [de](../../../de/docs/architecture/ROUTER_BACKENDS.md) · 🇬🇷 [el](../../../el/docs/architecture/ROUTER_BACKENDS.md) · 🇪🇸 [es](../../../es/docs/architecture/ROUTER_BACKENDS.md) · 🇪🇪 [et](../../../et/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇷 [fa](../../../fa/docs/architecture/ROUTER_BACKENDS.md) · 🇫🇮 [fi](../../../fi/docs/architecture/ROUTER_BACKENDS.md) · 🇫🇷 [fr](../../../fr/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇪 [ga](../../../ga/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [gu](../../../gu/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [ha](../../../ha/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇱 [he](../../../he/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [hi](../../../hi/docs/architecture/ROUTER_BACKENDS.md) · 🇭🇷 [hr](../../../hr/docs/architecture/ROUTER_BACKENDS.md) · 🇭🇺 [hu](../../../hu/docs/architecture/ROUTER_BACKENDS.md) · 🇦🇲 [hy](../../../hy/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇩 [id](../../../id/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [ig](../../../ig/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇹 [it](../../../it/docs/architecture/ROUTER_BACKENDS.md) · 🇯🇵 [ja](../../../ja/docs/architecture/ROUTER_BACKENDS.md) · 🇬🇪 [ka](../../../ka/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇭 [km](../../../km/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [kn](../../../kn/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇷 [ko](../../../ko/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇹 [lt](../../../lt/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇻 [lv](../../../lv/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [ml](../../../ml/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [mr](../../../mr/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇾 [ms](../../../ms/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇹 [mt](../../../mt/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇲 [my](../../../my/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇵 [ne](../../../ne/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇱 [nl](../../../nl/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇴 [no](../../../no/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [or](../../../or/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [pa](../../../pa/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇭 [phi](../../../phi/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇱 [pl](../../../pl/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇹 [pt](../../../pt/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇴 [ro](../../../ro/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇰 [si](../../../si/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇰 [sk](../../../sk/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇮 [sl](../../../sl/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇸 [sr](../../../sr/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇪 [sv](../../../sv/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇪 [sw](../../../sw/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [ta](../../../ta/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [te](../../../te/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇭 [th](../../../th/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇷 [tr](../../../tr/docs/architecture/ROUTER_BACKENDS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇰 [ur](../../../ur/docs/architecture/ROUTER_BACKENDS.md) · 🇺🇿 [uz](../../../uz/docs/architecture/ROUTER_BACKENDS.md) · 🇻🇳 [vi](../../../vi/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [yo](../../../yo/docs/architecture/ROUTER_BACKENDS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/ROUTER_BACKENDS.md)

---

> **Статус:** Принято · **Контекст:** [#5670](https://github.com/diegosouzapw/OmniRoute/issues/5670),
> [#5603](https://github.com/diegosouzapw/OmniRoute/issues/5603) · **Контракт:** `domain/routing/routerBackends.ts`
> (типизированный реестр — код будет добавлен в рамках [#5868](https://github.com/diegosouzapw/OmniRoute/pull/5868))

Этот ADR определяет, как `ts` (нативный), `bifrost`, `cliproxy`, `9router` и
движки, совместимые с VibeProxy, соотносятся друг с другом, чтобы участники
проекта перестали смешивать две архитектурно различные сущности. В нём
типизированный реестр, представленный в рамках работы над реестром бэкендов
маршрутизатора, задокументирован как единственный источник истины для этой
модели.

## Ключевое различие — две ортогональные оси

Роль движка описывается **двумя независимыми осями**, совместно закодированными в
`RouterBackendDefinition` реестра:

1. **Жизненный цикл** (`RouterBackendLifecycle`) — _как запускается движок_:
   - `in-process` — работает внутри Node-процесса OmniRoute (нативный TS-конвейер).
   - `supervised` — локальный дочерний процесс, который OmniRoute устанавливает, запускает, останавливает и проверяет на работоспособность
     через `ServiceSupervisor`, а затем использует как подключение к провайдеру.
   - `external` — HTTP-эндпоинт, которому OmniRoute передаёт запросы, но которым **не** управляет
     (настраивается с помощью базового URL из переменной окружения).
   - `disabled` — зарегистрирован, но недоступен для выбора.
2. **Ось выбора** (бэкенд маршрутизации ретранслятора) — _перенаправляет ли ретранслятор ему запросы_:
   `RelayRoutingBackend = "ts" | "bifrost" | "auto"` в
   `src/app/api/v1/relay/chat/completions/routingBackend.ts`.

Ошибка, которой следует избегать: рассматривать «встроенный сервис» и «бэкенд маршрутизации» как один
список. Это не так. Движок с жизненным циклом `supervised` (9router/cliproxy) — это **подключение
к провайдеру, используемое нативным конвейером**, а не альтернативный бэкенд для перенаправления
запросов ретранслятором. `bifrost` представляет собой обратный случай — бэкенд для перенаправления запросов ретранслятором, который (исторически)
работал только как `external`.

## Реестр — единственный источник истины

Контракт `domain/routing/routerBackends.ts` (код будет добавлен в рамках
[#5868](https://github.com/diegosouzapw/OmniRoute/pull/5868)) объявляет каждый движок один раз, указывая его
жизненный цикл, возможности, идентификатор сервиса, порт по умолчанию, конфигурацию
проверки работоспособности и поддержку телеметрии. Потребители находят движки с помощью `getRouterBackend(id)`,
`listRouterBackends()` и `listRouterBackendsByCapability(cap)`, вместо того чтобы
добавлять особую логику для каждого вспомогательного процесса.

| Бэкенд      | Жизненный цикл | Сервис (ось A) | Бэкенд ретранслятора (ось B) | Проверка работоспособности | Порт по умолчанию |
| ----------- | -------------- | -------------- | ---------------------------- | -------------------------- | ----------------- |
| `ts`        | `in-process`   | —              | `ts` (нативный)              | —                          | —                 |
| `bifrost`   | `external`¹    | —¹             | `bifrost` / `auto`           | `/health`                  | —                 |
| `cliproxy`  | `supervised`   | `cliproxy`     | — (провайдер)                | `/v1/models`               | 8317              |
| `9router`   | `supervised`   | `9router`      | — (провайдер)                | `/api/health`              | 20130             |
| `vibeproxy` | `external`     | —              | — (адаптер провайдера)       | `/v1/models`               | —                 |

¹ Перевод Bifrost в статус встроенного сервиса с жизненным циклом `supervised` (который можно устанавливать и запускать
через `/api/services/bifrost/`) отслеживается в
[#5817](https://github.com/diegosouzapw/OmniRoute/pull/5817); пока эти изменения не объединены,
Bifrost работает только как `external` (доступен исключительно через `BIFROST_BASE_URL`).

`capabilities` (`chat`, `responses`, `streaming`, `tools`, `vision`,
`oauth-backed`, `dashboard-embed`, `model-sync`, `native-hot-path`) позволяют вызывающим сторонам
фильтровать движки по их фактическим возможностям вместо жёстко заданных для каждого идентификатора ветвей логики.

## Ось A — встроенные сервисы (сторона контролируемых процессов)

- **Реестр контролируемых процессов:** `src/lib/services/bootstrap.ts` `SERVICES[]`
  (на данный момент: `9router`, `cliproxy`).
- **Владелец жизненного цикла:** `src/lib/services/ServiceSupervisor.ts` — `start()` запускает
  дочерний процесс, ожидает успешного результата `waitForHealthy()`, сохраняет stdout/stderr в кольцевой буфер;
  `stop()` выполняет SIGTERM→SIGKILL; все операции сериализуются с помощью блокировки.
- **Объединение состояний** (`src/lib/services/types.ts`):
  `not_installed | stopped | starting | running | stopping | error`, а также
  ортогональное `HealthState = healthy | unhealthy | unknown`.
- **Почему отдельный процесс (а не внутрипроцессный SDK)?** Изоляция процессов позволяет
  независимо управлять установкой, запуском, остановкой, проверкой работоспособности и журналами каждого сайдкара,
  а также применять ограничение запуска через loopback. Моделирование внутрипроцессного адаптера — будущая задача;
  именно для этого предназначен флаг возможности `native-hot-path`.

### Контракт маршрутов жизненного цикла (`/api/services/<tool>/…`)

Коды состояния **намеренно зависят от состояния/метода/пути** — это контракт, а не
несогласованность:

| Вызов                        | Условие                                       | Статус                                  |
| ---------------------------- | --------------------------------------------- | --------------------------------------- |
| `POST .../start`             | сервис в состоянии `not_installed`            | **409** (предварительное условие)       |
| `POST .../stop`              | уже остановлен                                | **200** (идемпотентная пустая операция) |
| `GET .../status`             | OK                                            | **200** (`live ?? row ?? "unknown"`)    |
| `POST .../start`             | ошибка запуска процесса                       | **503** (временная ошибка)              |
| `GET .../status`, `.../stop` | необработанная ошибка                         | **500**                                 |
| `GET /api/services/<x>/logs` | неизвестный инструмент `<x>`                  | **404** `Service '<x>' not found`       |
| `GET .../status?reveal=key`  | отсутствует `X-Reveal-Confirm: yes`           | **403** (только для 9router)            |
| **любой** `/api/services/*`  | вызывающая сторона не из loopback/private-LAN | **403 LOCAL_ONLY**                      |

Все тела ошибок формируются функцией `createErrorResponse()` →
`{ error: { message, type }, requestId }`, где `type` определяется на основе статуса
(`500→server_error`, `404→not_found`, `409→conflict`, иначе `invalid_request`) и служит
машиночитаемым признаком. Сообщения предварительно санитизируются
(`sanitizeErrorMessage()`, жёсткое правило №12).

**Ограничение loopback** — наиболее распространённая причина ответа `403`: `/api/services/` входит в
`LOCAL_ONLY_API_PREFIXES` (`src/server/authz/routeGuard.ts`), а
`src/server/authz/policies/management.ts` отклоняет любого вызывающего **до аутентификации**,
если он не использует loopback или private-LAN, поскольку эти маршруты запускают дочерние процессы
(жёсткие правила 15 и 17). Обращение к ним через публичный туннель по замыслу возвращает `403`.

## Ось B — бэкенд маршрутизации ретранслятора (сторона диспетчеризации)

Только путь прокси-ретранслятора `/api/v1/relay/chat/completions` выбирает бэкенд
диспетчеризации; основной интерфейс `/api/v1/chat/completions` никогда не обращается к
`routingBackend.ts`.

- **Выбор** (`resolveRelayRoutingBackend`): единый глобальный переключатель окружения —
  `OMNIROUTE_RELAY_BACKEND` / `RELAY_ROUTING_BACKEND` ∈ {`ts`, `bifrost`, `auto`}.
  Если он не задан, используется `auto`, когда Bifrost настроен и включён, иначе — `ts`.
- **Поведение:**
  - `bifrost` (принудительно): сбой Bifrost → окончательная ошибка `502`, без отката.
  - `auto`: попытка использовать Bifrost; при сбое или периоде ожидания — незаметный переход к нативному варианту.
  - `ts` / после отката: нативный конвейер трансляции/исполнения `open-sse`.
- **Период ожидания:** период ожидания после сбоя для каждого `baseUrl` в `bifrostCooldown.ts`.

На данный момент выбор выполняется **целиком на уровне ретранслятора** — в `release/v3.8.43`
нет переключения движка для отдельных провайдеров или запросов. Возможность выбора для каждого запроса
добавляется в рамках работы над манифестом сайдкара
([#5869](https://github.com/diegosouzapw/OmniRoute/pull/5869) — манифест +
[#5870](https://github.com/diegosouzapw/OmniRoute/pull/5870) — `shouldTryBifrostForRequest`),
что позволит режиму `auto` направлять через Bifrost только провайдеров, разрешённых манифестом.

## Интеграция с панелью управления

Панель управления сервисами каждые 5 секунд опрашивает `GET /api/services/<tool>/status` через
`src/app/(dashboard)/dashboard/providers/services/hooks/useServiceStatus.ts`,
получая `{ tool, state, pid, port, health, installedVersion, latestVersion,
updateAvailable, autoStart, … }`. Общего провайдера контекста доступности нет —
каждый компонент вызывает хук отдельно для каждого инструмента. При `!res.ok` хук сейчас отображает
только `HTTP <status>`; сопоставление поля `error.type` с понятным пользователю объяснением —
это запланированное улучшение UX, а не изменение контракта.

## Последствия

- Новые движки однократно регистрируются в `ROUTER_BACKENDS`; потребители получают их через запросы
  возможностей без добавления новых ветвей для каждого идентификатора.
- Ответ на вопрос «Это сервис или бэкенд маршрутизации?» определяется полем `lifecycle`, а не
  тем, в каком списке оказался идентификатор.
- Супервизия Bifrost (#5817) и перенос критического пути на нативную реализацию (#5670) основаны на этом
  общем контракте, а не на специальной обработке каждого сайдкара.
