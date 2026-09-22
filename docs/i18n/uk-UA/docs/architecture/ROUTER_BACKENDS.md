# Router Backends & Embedded Services — architecture contract (ADR) (Українська)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/ROUTER_BACKENDS.md) · 🇪🇹 [am](../../../am/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇦 [ar](../../../ar/docs/architecture/ROUTER_BACKENDS.md) · 🇦🇿 [az](../../../az/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇬 [bg](../../../bg/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇩 [bn](../../../bn/docs/architecture/ROUTER_BACKENDS.md) · 🇨🇿 [cs](../../../cs/docs/architecture/ROUTER_BACKENDS.md) · 🇩🇰 [da](../../../da/docs/architecture/ROUTER_BACKENDS.md) · 🇩🇪 [de](../../../de/docs/architecture/ROUTER_BACKENDS.md) · 🇬🇷 [el](../../../el/docs/architecture/ROUTER_BACKENDS.md) · 🇪🇸 [es](../../../es/docs/architecture/ROUTER_BACKENDS.md) · 🇪🇪 [et](../../../et/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇷 [fa](../../../fa/docs/architecture/ROUTER_BACKENDS.md) · 🇫🇮 [fi](../../../fi/docs/architecture/ROUTER_BACKENDS.md) · 🇫🇷 [fr](../../../fr/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇪 [ga](../../../ga/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [gu](../../../gu/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [ha](../../../ha/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇱 [he](../../../he/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [hi](../../../hi/docs/architecture/ROUTER_BACKENDS.md) · 🇭🇷 [hr](../../../hr/docs/architecture/ROUTER_BACKENDS.md) · 🇭🇺 [hu](../../../hu/docs/architecture/ROUTER_BACKENDS.md) · 🇦🇲 [hy](../../../hy/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇩 [id](../../../id/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [ig](../../../ig/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇹 [it](../../../it/docs/architecture/ROUTER_BACKENDS.md) · 🇯🇵 [ja](../../../ja/docs/architecture/ROUTER_BACKENDS.md) · 🇬🇪 [ka](../../../ka/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇭 [km](../../../km/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [kn](../../../kn/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇷 [ko](../../../ko/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇹 [lt](../../../lt/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇻 [lv](../../../lv/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [ml](../../../ml/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [mr](../../../mr/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇾 [ms](../../../ms/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇹 [mt](../../../mt/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇲 [my](../../../my/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇵 [ne](../../../ne/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇱 [nl](../../../nl/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇴 [no](../../../no/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [or](../../../or/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [pa](../../../pa/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇭 [phi](../../../phi/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇱 [pl](../../../pl/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇹 [pt](../../../pt/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇴 [ro](../../../ro/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇺 [ru](../../../ru/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇰 [si](../../../si/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇰 [sk](../../../sk/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇮 [sl](../../../sl/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇸 [sr](../../../sr/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇪 [sv](../../../sv/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇪 [sw](../../../sw/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [ta](../../../ta/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [te](../../../te/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇭 [th](../../../th/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇷 [tr](../../../tr/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇰 [ur](../../../ur/docs/architecture/ROUTER_BACKENDS.md) · 🇺🇿 [uz](../../../uz/docs/architecture/ROUTER_BACKENDS.md) · 🇻🇳 [vi](../../../vi/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [yo](../../../yo/docs/architecture/ROUTER_BACKENDS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/ROUTER_BACKENDS.md)

---

> **Статус:** Прийнято · **Контекст:** [#5670](https://github.com/diegosouzapw/OmniRoute/issues/5670),
> [#5603](https://github.com/diegosouzapw/OmniRoute/issues/5603) · **Контракт:** `domain/routing/routerBackends.ts`
> (типізований реєстр — код додається в [#5868](https://github.com/diegosouzapw/OmniRoute/pull/5868))

Цей ADR чітко визначає, як `ts` (нативний), `bifrost`, `cliproxy`, `9router` і
VibeProxy-сумісні рушії співвідносяться між собою, щоб учасники розробки припинили
плутати дві архітектурно відмінні речі. Він документує типізований
реєстр, запроваджений у межах роботи над реєстром бекендів маршрутизатора, як єдине джерело
істини для цієї моделі.

## Ключова відмінність — дві ортогональні осі

Роль рушія описується **двома незалежними осями**, які разом закодовано в
`RouterBackendDefinition` реєстру:

1. **Життєвий цикл** (`RouterBackendLifecycle`) — _як працює рушій_:
   - `in-process` — працює всередині процесу Node OmniRoute (нативний конвеєр TS).
   - `supervised` — локальний дочірній процес, який OmniRoute встановлює/запускає/зупиняє/перевіряє
     через `ServiceSupervisor`, а потім використовує як підключення до провайдера.
   - `external` — кінцева точка HTTP, до якої OmniRoute спрямовує запити, але якою **не** керує
     (налаштовується базовою URL-адресою через змінну середовища).
   - `disabled` — зареєстрований, але недоступний для вибору.
2. **Вісь вибору** (бекенд маршрутизації ретранслятора) — _чи спрямовує ретранслятор запити до нього_:
   `RelayRoutingBackend = "ts" | "bifrost" | "auto"` у
   `src/app/api/v1/relay/chat/completions/routingBackend.ts`.

Помилка, якої слід уникати: розглядати «вбудований сервіс» і «бекенд маршрутизації» як один
список. Це не так. Рушій `supervised` (9router/cliproxy) — це **підключення до
провайдера, яке використовує нативний конвеєр**, а не альтернативний бекенд диспетчеризації
ретранслятора. `bifrost` — навпаки: це бекенд диспетчеризації ретранслятора, який (історично)
був лише `external`.

## Реєстр — єдине джерело істини

Контракт `domain/routing/routerBackends.ts` (код додається в
[#5868](https://github.com/diegosouzapw/OmniRoute/pull/5868)) оголошує кожен рушій один раз, разом із його
життєвим циклом, можливостями, ідентифікатором сервісу, стандартним портом, конфігурацією
перевірки працездатності та підтримкою телеметрії. Споживачі знаходять рушії через `getRouterBackend(id)`,
`listRouterBackends()` і `listRouterBackendsByCapability(cap)` замість
створення спеціальних умов для кожного сайдкара.

| Бекенд      | Життєвий цикл | Сервіс (вісь A) | Бекенд ретранслятора (вісь B) | Перевірка працездатності | Стандартний порт |
| ----------- | ------------- | --------------- | ----------------------------- | ------------------------ | ---------------- |
| `ts`        | `in-process`  | —               | `ts` (нативний)               | —                        | —                |
| `bifrost`   | `external`¹   | —¹              | `bifrost` / `auto`            | `/health`                | —                |
| `cliproxy`  | `supervised`  | `cliproxy`      | — (провайдер)                 | `/v1/models`             | 8317             |
| `9router`   | `supervised`  | `9router`       | — (провайдер)                 | `/api/health`            | 20130            |
| `vibeproxy` | `external`    | —               | — (адаптер провайдера)        | `/v1/models`             | —                |

¹ Переведення Bifrost у статус вбудованого сервісу `supervised` (який можна встановлювати/запускати
з `/api/services/bifrost/`) відстежується в
[#5817](https://github.com/diegosouzapw/OmniRoute/pull/5817); доки його не об’єднано,
Bifrost доступний лише як `external` (винятково через `BIFROST_BASE_URL`).

`capabilities` (`chat`, `responses`, `streaming`, `tools`, `vision`,
`oauth-backed`, `dashboard-embed`, `model-sync`, `native-hot-path`) дають змогу викликачам
фільтрувати рушії за тим, що вони фактично можуть робити, замість жорсткого кодування умовних гілок для кожного ідентифікатора.

## Вісь A — вбудовані сервіси (сторона контрольованих процесів)

- **Реєстр контрольованих процесів:** `src/lib/services/bootstrap.ts` `SERVICES[]`
  (наразі: `9router`, `cliproxy`).
- **Власник життєвого циклу:** `src/lib/services/ServiceSupervisor.ts` — `start()` породжує
  дочірній процес, очікує на `waitForHealthy()`, спрямовує stdout/stderr до кільцевого буфера;
  `stop()` SIGTERM→SIGKILL; усі операції серіалізуються за допомогою блокування.
- **Об’єднання станів** (`src/lib/services/types.ts`):
  `not_installed | stopped | starting | running | stopping | error`, а також
  ортогональний `HealthState = healthy | unhealthy | unknown`.
- **Чому окремий процес (а не внутрішньопроцесний SDK)?** Ізоляція процесів дає змогу
  незалежно керувати встановленням, запуском, зупинкою, станом працездатності та журналами для кожного сайдкара,
  а також застосовувати обмеження на породження процесів через loopback. Моделювання внутрішньопроцесного адаптера — майбутня робота;
  це буде виражено прапорцем можливості `native-hot-path`.

### Контракт маршрутів життєвого циклу (`/api/services/<tool>/…`)

Коди стану **навмисно залежать від стану/дії/шляху** — це контракт, а не
неузгодженість:

| Виклик                          | Умова                              | Статус                                  |
| ------------------------------- | ---------------------------------- | --------------------------------------- |
| `POST .../start`                | сервіс у стані `not_installed`     | **409** (передумова)                    |
| `POST .../stop`                 | уже зупинено                       | **200** (ідемпотентна операція без дії) |
| `GET .../status`                | усе гаразд                         | **200** (`live ?? row ?? "unknown"`)    |
| `POST .../start`                | помилка породження процесу         | **503** (тимчасова)                     |
| `GET .../status`, `.../stop`    | неперехоплена помилка              | **500**                                 |
| `GET /api/services/<x>/logs`    | невідомий інструмент `<x>`         | **404** `Service '<x>' not found`       |
| `GET .../status?reveal=key`     | відсутній `X-Reveal-Confirm: yes`  | **403** (лише 9router)                  |
| **будь-який** `/api/services/*` | виклик не з loopback/приватної LAN | **403 LOCAL_ONLY**                      |

Усі тіла помилок формуються за допомогою `createErrorResponse()` →
`{ error: { message, type }, requestId }`, де `type` визначається зі статусу
(`500→server_error`, `404→not_found`, `409→conflict`, інакше `invalid_request`) і є
машинно-оброблюваним дискримінатором. Повідомлення попередньо очищуються
(`sanitizeErrorMessage()`, жорстке правило №12).

**Захист loopback** є найпоширенішою причиною `403`: `/api/services/` входить до
`LOCAL_ONLY_API_PREFIXES` (`src/server/authz/routeGuard.ts`), а
`src/server/authz/policies/management.ts` відхиляє будь-який виклик не з loopback / приватної LAN
**до автентифікації**, оскільки ці маршрути породжують дочірні процеси (жорсткі правила 15
і 17). Звернення до них через публічний тунель за задумом повертає `403`.

## Вісь B — бекенд маршрутизації ретранслятора (сторона диспетчеризації)

Лише шлях проксі ретранслятора `/api/v1/relay/chat/completions` вибирає бекенд
диспетчеризації; основна поверхня `/api/v1/chat/completions` ніколи не звертається до
`routingBackend.ts`.

- **Вибір** (`resolveRelayRoutingBackend`): один глобальний перемикач середовища —
  `OMNIROUTE_RELAY_BACKEND` / `RELAY_ROUTING_BACKEND` ∈ {`ts`, `bifrost`, `auto`}.
  Якщо його не задано, використовується `auto`, коли Bifrost налаштовано й увімкнено, інакше — `ts`.
- **Поведінка:**
  - `bifrost` (примусово): збій Bifrost → жорстка помилка `502`, без резервного варіанта.
  - `auto`: спробувати Bifrost, а в разі збою/періоду очікування непомітно перейти до нативного варіанта.
  - `ts` / після переходу на резервний варіант: нативний конвеєр транслятора/виконавця `open-sse`.
- **Період очікування:** період очікування після збою для кожного `baseUrl` у `bifrostCooldown.ts`.

Наразі вибір здійснюється за принципом **«усе або нічого» на рівні ретранслятора** — у
`release/v3.8.43` немає перемикання рушія для окремого провайдера або окремого запиту. У межах роботи
над маніфестом сайдкара додається шлюз для кожного запиту
([#5869](https://github.com/diegosouzapw/OmniRoute/pull/5869) маніфест +
[#5870](https://github.com/diegosouzapw/OmniRoute/pull/5870) `shouldTryBifrostForRequest`),
який дає змогу `auto` маршрутизувати через Bifrost лише провайдерів, що відповідають вимогам маніфесту.

## Інтеграція з панеллю керування

Панель керування сервісами опитує `GET /api/services/<tool>/status` кожні 5 с через
`src/app/(dashboard)/dashboard/providers/services/hooks/useServiceStatus.ts`,
отримуючи `{ tool, state, pid, port, health, installedVersion, latestVersion,
updateAvailable, autoStart, … }`. Спільного контекстного провайдера доступності немає —
кожен компонент викликає хук окремо для кожного інструмента. За умови `!res.ok` хук наразі повертає
лише `HTTP <status>`; зіставлення поля `error.type` зі зрозумілим для користувача поясненням є
запланованим покращенням UX, а не зміною контракту.

## Наслідки

- Нові рушії реєструються один раз у `ROUTER_BACKENDS`; споживачі отримують до них доступ через запити
  можливостей без нових умовних гілок для кожного ідентифікатора.
- Відповідь на запитання «Це сервіс чи бекенд маршрутизації?» визначається полем `lifecycle`, а не
  тим, у якому списку випадково з’явився ідентифікатор.
- Нагляд за Bifrost (#5817) і перенесення критичного шляху на нативну реалізацію (#5670) спираються на цей
  спільний контракт замість спеціальної обробки кожного допоміжного процесу.
