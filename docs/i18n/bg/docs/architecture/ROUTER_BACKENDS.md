# Router Backends & Embedded Services — architecture contract (ADR) (Български)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/ROUTER_BACKENDS.md) · 🇪🇹 [am](../../../am/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇦 [ar](../../../ar/docs/architecture/ROUTER_BACKENDS.md) · 🇦🇿 [az](../../../az/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇩 [bn](../../../bn/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇦 [bs](../../../bs/docs/architecture/ROUTER_BACKENDS.md) · 🇨🇿 [cs](../../../cs/docs/architecture/ROUTER_BACKENDS.md) · 🇩🇰 [da](../../../da/docs/architecture/ROUTER_BACKENDS.md) · 🇩🇪 [de](../../../de/docs/architecture/ROUTER_BACKENDS.md) · 🇬🇷 [el](../../../el/docs/architecture/ROUTER_BACKENDS.md) · 🇪🇸 [es](../../../es/docs/architecture/ROUTER_BACKENDS.md) · 🇪🇪 [et](../../../et/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇷 [fa](../../../fa/docs/architecture/ROUTER_BACKENDS.md) · 🇫🇮 [fi](../../../fi/docs/architecture/ROUTER_BACKENDS.md) · 🇫🇷 [fr](../../../fr/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇪 [ga](../../../ga/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [gu](../../../gu/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [ha](../../../ha/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇱 [he](../../../he/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [hi](../../../hi/docs/architecture/ROUTER_BACKENDS.md) · 🇭🇷 [hr](../../../hr/docs/architecture/ROUTER_BACKENDS.md) · 🇭🇺 [hu](../../../hu/docs/architecture/ROUTER_BACKENDS.md) · 🇦🇲 [hy](../../../hy/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇩 [id](../../../id/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [ig](../../../ig/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇹 [it](../../../it/docs/architecture/ROUTER_BACKENDS.md) · 🇯🇵 [ja](../../../ja/docs/architecture/ROUTER_BACKENDS.md) · 🇬🇪 [ka](../../../ka/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇭 [km](../../../km/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [kn](../../../kn/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇷 [ko](../../../ko/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇹 [lt](../../../lt/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇻 [lv](../../../lv/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [ml](../../../ml/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [mr](../../../mr/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇾 [ms](../../../ms/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇹 [mt](../../../mt/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇲 [my](../../../my/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇵 [ne](../../../ne/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇱 [nl](../../../nl/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇴 [no](../../../no/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [or](../../../or/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [pa](../../../pa/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇭 [phi](../../../phi/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇱 [pl](../../../pl/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇹 [pt](../../../pt/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇴 [ro](../../../ro/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇺 [ru](../../../ru/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇰 [si](../../../si/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇰 [sk](../../../sk/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇮 [sl](../../../sl/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇸 [sr](../../../sr/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇪 [sv](../../../sv/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇪 [sw](../../../sw/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [ta](../../../ta/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [te](../../../te/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇭 [th](../../../th/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇷 [tr](../../../tr/docs/architecture/ROUTER_BACKENDS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇰 [ur](../../../ur/docs/architecture/ROUTER_BACKENDS.md) · 🇺🇿 [uz](../../../uz/docs/architecture/ROUTER_BACKENDS.md) · 🇻🇳 [vi](../../../vi/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [yo](../../../yo/docs/architecture/ROUTER_BACKENDS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/ROUTER_BACKENDS.md)

---

> **Статус:** Прието · **Контекст:** [#5670](https://github.com/diegosouzapw/OmniRoute/issues/5670),
> [#5603](https://github.com/diegosouzapw/OmniRoute/issues/5603) · **Договор:** `domain/routing/routerBackends.ts`
> (типизиран регистър — кодът се добавя с [#5868](https://github.com/diegosouzapw/OmniRoute/pull/5868))

Този ADR уточнява как `ts` (вграден), `bifrost`, `cliproxy`, `9router` и
съвместимите с VibeProxy машини са свързани помежду си, така че сътрудниците да спрат
да смесват две архитектурно различни неща. Той документира типизирания
регистър, въведен чрез работата по router-backend-registry, като единствен източник на
истина за този модел.

## Основното разграничение — две ортогонални оси

Ролята на дадена машина се описва чрез **две независими оси**, кодирани заедно в
`RouterBackendDefinition` на регистъра:

1. **Жизнен цикъл** (`RouterBackendLifecycle`) — _как се изпълнява машината_:
   - `in-process` — изпълнява се в Node процеса на OmniRoute (вградения TS конвейер).
   - `supervised` — локален дъщерен процес, който OmniRoute инсталира/стартира/спира/проверява за изправност
     чрез `ServiceSupervisor`, след което го използва като връзка с доставчик.
   - `external` — HTTP крайна точка, към която OmniRoute насочва заявки, но **не** управлява
     (конфигурира се чрез базов URL адрес от променлива на средата).
   - `disabled` — регистрирана, но недостъпна за избор.
2. **Ос за избор** (система за маршрутизиране на препредаването) — _дали препредаващият слой насочва заявки към нея_:
   `RelayRoutingBackend = "ts" | "bifrost" | "auto"` в
   `src/app/api/v1/relay/chat/completions/routingBackend.ts`.

Грешката, която трябва да се избягва, е „вградена услуга“ и „система за маршрутизиране“ да се третират като един
списък. Те не са едно и също. Машина със статус `supervised` (9router/cliproxy) е **връзка с
доставчик, използвана от вградения конвейер**, а не алтернативна система за насочване на заявки от препредаващия слой.
При `bifrost` е обратното — това е система за насочване на заявки от препредаващия слой, която (исторически)
е била само `external`.

## Регистърът — единствен източник на истина

Договорът `domain/routing/routerBackends.ts` (кодът се добавя с
[#5868](https://github.com/diegosouzapw/OmniRoute/pull/5868)) декларира всяка машина еднократно, заедно с нейния
жизнен цикъл, възможности, идентичност на услугата, порт по подразбиране, конфигурация за проверка на изправността и
поддръжка на телеметрия. Потребителите намират машините чрез `getRouterBackend(id)`,
`listRouterBackends()` и `listRouterBackendsByCapability(cap)`, вместо
да добавят специална логика за всеки страничен процес.

| Система     | Жизнен цикъл | Услуга (ос A) | Система за препредаване (ос B) | Проверка за изправност | Порт по подразбиране |
| ----------- | ------------ | ------------- | ------------------------------ | ---------------------- | -------------------- |
| `ts`        | `in-process` | —             | `ts` (вградена)                | —                      | —                    |
| `bifrost`   | `external`¹  | —¹            | `bifrost` / `auto`             | `/health`              | —                    |
| `cliproxy`  | `supervised` | `cliproxy`    | — (доставчик)                  | `/v1/models`           | 8317                 |
| `9router`   | `supervised` | `9router`     | — (доставчик)                  | `/api/health`          | 20130                |
| `vibeproxy` | `external`   | —             | — (адаптер за доставчик)       | `/v1/models`           | —                    |

¹ Преобразуването на Bifrost във вградена услуга със статус `supervised` (която може да бъде инсталирана/стартирана
чрез `/api/services/bifrost/`) се проследява в
[#5817](https://github.com/diegosouzapw/OmniRoute/pull/5817); докато тази промяна не бъде слята,
Bifrost е само `external` (достъпен единствено чрез `BIFROST_BASE_URL`).

`capabilities` (`chat`, `responses`, `streaming`, `tools`, `vision`,
`oauth-backed`, `dashboard-embed`, `model-sync`, `native-hot-path`) позволява на извикващите
да филтрират според това какво действително може да прави дадена машина, вместо да задават твърдо кодирани условни разклонения за всеки идентификатор.

## Ос A — вградени услуги (страна на наблюдавания процес)

- **Регистър на наблюдаваните процеси:** `src/lib/services/bootstrap.ts` `SERVICES[]`
  (към момента: `9router`, `cliproxy`).
- **Собственик на жизнения цикъл:** `src/lib/services/ServiceSupervisor.ts` — `start()` стартира
  дъщерния процес, изчаква `waitForHealthy()`, пренасочва stdout/stderr към пръстеновиден буфер;
  `stop()` изпраща SIGTERM→SIGKILL; всичко се сериализира чрез заключване.
- **Обединение от състояния** (`src/lib/services/types.ts`):
  `not_installed | stopped | starting | running | stopping | error`, плюс ортогонално
  `HealthState = healthy | unhealthy | unknown`.
- **Защо отделен процес (а не SDK в рамките на процеса)?** Изолацията на процесите прави
  инсталирането/стартирането/спирането/проверката на изправността/логовете независимо управляеми за всеки страничен процес и позволява
  прилагането на защитата за стартиране само през loopback. Моделирането на адаптер в рамките на процеса е бъдеща задача —
  флагът за възможност `native-hot-path` е мястото, където това би било изразено.

### Договор на маршрутите за жизнения цикъл (`/api/services/<tool>/…`)

Кодовете за състояние са **специфични за състоянието/операцията/пътя по замисъл** — това е договорът, а не
несъответствие:

| Извикване                    | Условие                                 | Състояние                              |
| ---------------------------- | --------------------------------------- | -------------------------------------- |
| `POST .../start`             | услугата е `not_installed`              | **409** (предварително условие)        |
| `POST .../stop`              | вече е спряна                           | **200** (идемпотентна празна операция) |
| `GET .../status`             | успешно                                 | **200** (`live ?? row ?? "unknown"`)   |
| `POST .../start`             | неуспешно стартиране на процеса         | **503** (временна грешка)              |
| `GET .../status`, `.../stop` | необработена грешка                     | **500**                                |
| `GET /api/services/<x>/logs` | неизвестен инструмент `<x>`             | **404** `Service '<x>' not found`      |
| `GET .../status?reveal=key`  | липсва `X-Reveal-Confirm: yes`          | **403** (само за 9router)              |
| **всички** `/api/services/*` | извикващият не е от loopback/частна LAN | **403 LOCAL_ONLY**                     |

Всички тела на грешки се оформят от `createErrorResponse()` →
`{ error: { message, type }, requestId }`, където `type` се извежда от състоянието
(`500→server_error`, `404→not_found`, `409→conflict`, в останалите случаи `invalid_request`) и е
машинно обработваемият разграничител. Съобщенията са предварително изчистени
(`sanitizeErrorMessage()`, Строго правило №12).

**Защитата за loopback** е най-честият източник на `403`: `/api/services/` се намира в
`LOCAL_ONLY_API_PREFIXES` (`src/server/authz/routeGuard.ts`), а
`src/server/authz/policies/management.ts` отхвърля всеки извикващ, който не е от loopback/частна LAN,
**преди удостоверяването**, тъй като тези маршрути стартират дъщерни процеси (Строги правила 15
и 17). Достъпването им през публичен тунел връща `403` по замисъл.

## Ос B — бекенд за маршрутизиране на препредаването (страна на диспечирането)

Само пътят на проксито за препредаване `/api/v1/relay/chat/completions` избира бекенд
за диспечиране; основният интерфейс `/api/v1/chat/completions` никога не използва
`routingBackend.ts`.

- **Избор** (`resolveRelayRoutingBackend`): един глобален превключвател чрез променлива на средата —
  `OMNIROUTE_RELAY_BACKEND` / `RELAY_ROUTING_BACKEND` ∈ {`ts`, `bifrost`, `auto`}.
  Ако не е зададен, стойността е `auto`, когато Bifrost е конфигуриран и активиран; в противен случай е `ts`.
- **Поведение:**
  - `bifrost` (принудително): грешка в Bifrost → директен `502`, без резервен вариант.
  - `auto`: прави опит с Bifrost, а при грешка/период на изчакване неусетно преминава към вградения вариант.
  - `ts` / след преминаване към резервния вариант: вграденият конвейер за преобразуване/изпълнение `open-sse`.
- **Период на изчакване:** период на изчакване след грешка за всеки `baseUrl` в `bifrostCooldown.ts`.

Към момента изборът е **изцяло или никак на ниво препредаване** — в `release/v3.8.43` няма
смяна на изпълняващия механизъм за отделен доставчик или отделна заявка. Ограничението за отделни заявки се добавя
чрез работата по манифеста на страничния процес
([#5869](https://github.com/diegosouzapw/OmniRoute/pull/5869) манифест +
[#5870](https://github.com/diegosouzapw/OmniRoute/pull/5870) `shouldTryBifrostForRequest`),
което позволява на `auto` да насочва през Bifrost само доставчици, допустими според манифеста.

## Интеграция с таблото

Таблото за услуги изпраща заявка към `GET /api/services/<tool>/status` на всеки 5 секунди чрез
`src/app/(dashboard)/dashboard/providers/services/hooks/useServiceStatus.ts`,
като получава `{ tool, state, pid, port, health, installedVersion, latestVersion,
updateAvailable, autoStart, … }`. Няма споделен доставчик на контекст за наличност —
всеки компонент извиква hook-а за съответния инструмент. При `!res.ok` hook-ът в момента показва
само `HTTP <status>`; съпоставянето на полето `error.type` с разбираемо за потребителя обяснение е
планирано подобрение на потребителското изживяване, а не промяна в договора.

## Последствия

- Новите енджини се регистрират еднократно в `ROUTER_BACKENDS`; потребителите ги получават чрез заявки
  за възможности, без нови условни разклонения за всеки идентификатор.
- Отговорът на „Това услуга ли е, или маршрутизиращ бекенд?“ се определя от полето `lifecycle`, а не
  от това в кой списък се среща даден идентификатор.
- Надзорът на Bifrost (#5817) и миграцията на критичния път към нативна реализация (#5670) надграждат
  този споделен договор, вместо всеки sidecar да се обработва като специален случай.
