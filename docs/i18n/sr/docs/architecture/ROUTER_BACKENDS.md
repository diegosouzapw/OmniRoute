# Router Backends & Embedded Services — architecture contract (ADR) (Српски)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/ROUTER_BACKENDS.md) · 🇪🇹 [am](../../../am/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇦 [ar](../../../ar/docs/architecture/ROUTER_BACKENDS.md) · 🇦🇿 [az](../../../az/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇬 [bg](../../../bg/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇩 [bn](../../../bn/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇦 [bs](../../../bs/docs/architecture/ROUTER_BACKENDS.md) · 🇨🇿 [cs](../../../cs/docs/architecture/ROUTER_BACKENDS.md) · 🇩🇰 [da](../../../da/docs/architecture/ROUTER_BACKENDS.md) · 🇩🇪 [de](../../../de/docs/architecture/ROUTER_BACKENDS.md) · 🇬🇷 [el](../../../el/docs/architecture/ROUTER_BACKENDS.md) · 🇪🇸 [es](../../../es/docs/architecture/ROUTER_BACKENDS.md) · 🇪🇪 [et](../../../et/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇷 [fa](../../../fa/docs/architecture/ROUTER_BACKENDS.md) · 🇫🇮 [fi](../../../fi/docs/architecture/ROUTER_BACKENDS.md) · 🇫🇷 [fr](../../../fr/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇪 [ga](../../../ga/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [gu](../../../gu/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [ha](../../../ha/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇱 [he](../../../he/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [hi](../../../hi/docs/architecture/ROUTER_BACKENDS.md) · 🇭🇷 [hr](../../../hr/docs/architecture/ROUTER_BACKENDS.md) · 🇭🇺 [hu](../../../hu/docs/architecture/ROUTER_BACKENDS.md) · 🇦🇲 [hy](../../../hy/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇩 [id](../../../id/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [ig](../../../ig/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇹 [it](../../../it/docs/architecture/ROUTER_BACKENDS.md) · 🇯🇵 [ja](../../../ja/docs/architecture/ROUTER_BACKENDS.md) · 🇬🇪 [ka](../../../ka/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇭 [km](../../../km/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [kn](../../../kn/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇷 [ko](../../../ko/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇹 [lt](../../../lt/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇻 [lv](../../../lv/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [ml](../../../ml/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [mr](../../../mr/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇾 [ms](../../../ms/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇹 [mt](../../../mt/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇲 [my](../../../my/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇵 [ne](../../../ne/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇱 [nl](../../../nl/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇴 [no](../../../no/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [or](../../../or/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [pa](../../../pa/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇭 [phi](../../../phi/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇱 [pl](../../../pl/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇹 [pt](../../../pt/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇴 [ro](../../../ro/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇺 [ru](../../../ru/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇰 [si](../../../si/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇰 [sk](../../../sk/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇮 [sl](../../../sl/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇪 [sv](../../../sv/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇪 [sw](../../../sw/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [ta](../../../ta/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [te](../../../te/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇭 [th](../../../th/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇷 [tr](../../../tr/docs/architecture/ROUTER_BACKENDS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇰 [ur](../../../ur/docs/architecture/ROUTER_BACKENDS.md) · 🇺🇿 [uz](../../../uz/docs/architecture/ROUTER_BACKENDS.md) · 🇻🇳 [vi](../../../vi/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [yo](../../../yo/docs/architecture/ROUTER_BACKENDS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/ROUTER_BACKENDS.md)

---

> **Статус:** Прихваћено · **Контекст:** [#5670](https://github.com/diegosouzapw/OmniRoute/issues/5670),
> [#5603](https://github.com/diegosouzapw/OmniRoute/issues/5603) · **Уговор:** `domain/routing/routerBackends.ts`
> (типизирани регистар — код стиже са [#5868](https://github.com/diegosouzapw/OmniRoute/pull/5868))

Овај ADR прецизно дефинише међусобни однос између механизама `ts` (изворни), `bifrost`, `cliproxy`, `9router` и механизама компатибилних са VibeProxy-јем, како сарадници више не би мешали две архитектонски различите ствари. Он документује типизирани регистар, уведен кроз рад на регистру позадинских система рутера, као једини извор истине за тај модел.

## Кључна разлика — две ортогоналне осе

Улога механизма описана је помоћу **две независне осе**, које су заједно кодиране у регистарском типу `RouterBackendDefinition`:

1. **Животни циклус** (`RouterBackendLifecycle`) — _како се механизам извршава_:
   - `in-process` — извршава се унутар OmniRoute Node процеса (изворни TS ток обраде).
   - `supervised` — локални подређени процес који OmniRoute инсталира/покреће/зауставља/проверава му стање
     преко `ServiceSupervisor`, а затим га користи као везу са провајдером.
   - `external` — HTTP крајња тачка којој OmniRoute прослеђује захтеве, али којом **не** управља
     (конфигурише се основном URL адресом из окружења).
   - `disabled` — регистрован, али се не може изабрати.
2. **Оса избора** (позадински систем рутирања релеја) — _да ли релеј прослеђује захтеве том механизму_:
   `RelayRoutingBackend = "ts" | "bifrost" | "auto"` у
   `src/app/api/v1/relay/chat/completions/routingBackend.ts`.

Грешка коју треба избегавати: третирање „уграђене услуге“ и „позадинског система рутирања“ као једне листе. То нису исте ствари. Механизам типа `supervised` (9router/cliproxy) представља **везу са провајдером коју користи изворни ток обраде**, а не алтернативни позадински систем за прослеђивање захтева релеја. `bifrost` је супротан случај — позадински систем за прослеђивање захтева релеја који је (историјски) био искључиво типа `external`.

## Регистар — једини извор истине

Уговор `domain/routing/routerBackends.ts` (код стиже са
[#5868](https://github.com/diegosouzapw/OmniRoute/pull/5868)) декларише сваки механизам једном, заједно са његовим животним циклусом, могућностима, идентитетом услуге, подразумеваним портом, конфигурацијом провере стања и подршком за телеметрију. Потрошачи проналазе механизме помоћу `getRouterBackend(id)`, `listRouterBackends()` и `listRouterBackendsByCapability(cap)`, уместо да засебно обрађују сваки пратећи процес.

| Позадински систем | Животни циклус | Услуга (оса A) | Позадински систем релеја (оса B) | Провера стања | Подразумевани порт |
| ----------------- | -------------- | -------------- | -------------------------------- | ------------- | ------------------ |
| `ts`              | `in-process`   | —              | `ts` (изворни)                   | —             | —                  |
| `bifrost`         | `external`¹    | —¹             | `bifrost` / `auto`               | `/health`     | —                  |
| `cliproxy`        | `supervised`   | `cliproxy`     | — (провајдер)                    | `/v1/models`  | 8317               |
| `9router`         | `supervised`   | `9router`      | — (провајдер)                    | `/api/health` | 20130              |
| `vibeproxy`       | `external`     | —              | — (адаптер провајдера)           | `/v1/models`  | —                  |

¹ Унапређење Bifrost-а у уграђену услугу типа `supervised` (која се може инсталирати/покренути
из `/api/services/bifrost/`) прати се у
[#5817](https://github.com/diegosouzapw/OmniRoute/pull/5817); док се то не споји,
Bifrost је искључиво типа `external` (доступан само преко `BIFROST_BASE_URL`).

`capabilities` (`chat`, `responses`, `streaming`, `tools`, `vision`,
`oauth-backed`, `dashboard-embed`, `model-sync`, `native-hot-path`) омогућавају позиваоцима да
филтрирају механизме према ономе што заиста могу да раде, уместо да чврсто кодирају гране за сваки идентификатор.

## Оса A — уграђени сервиси (страна надгледаних процеса)

- **Регистар надгледаних процеса:** `src/lib/services/bootstrap.ts` `SERVICES[]`
  (тренутно: `9router`, `cliproxy`).
- **Власник животног циклуса:** `src/lib/services/ServiceSupervisor.ts` — `start()` покреће
  подређени процес, чека пролаз `waitForHealthy()`, преусмерава stdout/stderr у кружни бафер;
  `stop()` SIGTERM→SIGKILL; све је серијализовано под закључавањем.
- **Унија стања** (`src/lib/services/types.ts`):
  `not_installed | stopped | starting | running | stopping | error`, уз
  ортогонални `HealthState = healthy | unhealthy | unknown`.
- **Зашто засебан процес (а не SDK унутар процеса)?** Изолација процеса омогућава
  независну контролу инсталације/покретања/заустављања/стања/евиденције за сваки помоћни сервис и омогућава
  примену заштите покретања преко loopback интерфејса. Моделовање адаптера унутар процеса је будући посао —
  ознака могућности `native-hot-path` је место где би то било исказано.

### Уговор рута животног циклуса (`/api/services/<tool>/…`)

Статусни кодови су **намерно специфични за стање/радњу/путању** — то је уговор, а не
недоследност:

| Позив                           | Услов                                        | Статус                                  |
| ------------------------------- | -------------------------------------------- | --------------------------------------- |
| `POST .../start`                | сервис је `not_installed`                    | **409** (предуслов)                     |
| `POST .../stop`                 | већ је заустављен                            | **200** (идемпотентна празна операција) |
| `GET .../status`                | у реду                                       | **200** (`live ?? row ?? "unknown"`)    |
| `POST .../start`                | неуспешно покретање процеса                  | **503** (привремено)                    |
| `GET .../status`, `.../stop`    | необрађена грешка                            | **500**                                 |
| `GET /api/services/<x>/logs`    | непозната алатка `<x>`                       | **404** `Service '<x>' not found`       |
| `GET .../status?reveal=key`     | недостаје `X-Reveal-Confirm: yes`            | **403** (само за 9router)               |
| **било који** `/api/services/*` | позивалац није са loopback/private-LAN мреже | **403 LOCAL_ONLY**                      |

Сва тела грешака обликује `createErrorResponse()` →
`{ error: { message, type }, requestId }`, при чему се `type` изводи из статуса
(`500→server_error`, `404→not_found`, `409→conflict`, иначе `invalid_request`) и представља
дискриминатор погодан за машинску обраду. Поруке су унапред прочишћене
(`sanitizeErrorMessage()`, Строго правило #12).

**Loopback заштита** је најчешћи узрок одговора `403`: `/api/services/` се налази у
`LOCAL_ONLY_API_PREFIXES` (`src/server/authz/routeGuard.ts`), а
`src/server/authz/policies/management.ts` одбија сваког позиваоца који није са loopback /
private-LAN мреже **пре аутентификације**, јер ове руте покрећу подређене процесе (Строга правила 15
и 17). Приступ преко јавног тунела намерно даје `403`.

## Оса B — позадински систем за усмеравање релеја (страна отпремања)

Само путања релејног проксија `/api/v1/relay/chat/completions` бира позадински систем
за отпремање; главна површина `/api/v1/chat/completions` никада не користи
`routingBackend.ts`.

- **Избор** (`resolveRelayRoutingBackend`): један глобални прекидач окружења —
  `OMNIROUTE_RELAY_BACKEND` / `RELAY_ROUTING_BACKEND` ∈ {`ts`, `bifrost`, `auto`}.
  Ако није постављен, користи се `auto` када је Bifrost конфигурисан+омогућен, иначе `ts`.
- **Понашање:**
  - `bifrost` (принудно): неуспех Bifrost-а → тврди `502`, без резервне опције.
  - `auto`: покушава Bifrost, а при неуспеху/периоду мировања неприметно прелази на изворни систем.
  - `ts` / након преласка на резервну опцију: изворни `open-sse` ток преводиоца/извршиоца.
- **Период мировања:** период мировања након неуспеха за сваки `baseUrl` у `bifrostCooldown.ts`.

Избор је **тренутно све-или-ништа на нивоу релеја** — у издању `release/v3.8.43`
не постоји промена механизма по добављачу или по захтеву. Услов по захтеву додаје се
кроз рад на манифесту помоћног сервиса
([#5869](https://github.com/diegosouzapw/OmniRoute/pull/5869) манифест +
[#5870](https://github.com/diegosouzapw/OmniRoute/pull/5870) `shouldTryBifrostForRequest`),
што омогућава да `auto` кроз Bifrost усмерава само добављаче који испуњавају услове манифеста.

## Интеграција контролне табле

Контролна табла услуга испитује `GET /api/services/<tool>/status` сваких 5 секунди преко
`src/app/(dashboard)/dashboard/providers/services/hooks/useServiceStatus.ts`,
при чему се враћа `{ tool, state, pid, port, health, installedVersion, latestVersion,
updateAvailable, autoStart, … }`. Не постоји заједнички добављач контекста доступности —
свака компонента позива куку за сваки алат. При `!res.ok`, кука тренутно приказује само
`HTTP <status>`; мапирање поља `error.type` на објашњење разумљиво кориснику представља
евидентирано побољшање корисничког искуства, а не промену уговора.

## Последице

- Нови механизми се једном региструју у `ROUTER_BACKENDS`; потрошачи им приступају путем упита
  о могућностима, без нових грана за сваки идентификатор.
- На питање „Да ли је ово услуга или позадински механизам за усмеравање?“ одговара поље `lifecycle`, а не
  листа у којој се неки идентификатор случајно налази.
- Bifrost надзор (#5817) и прелазак критичне путање на изворну имплементацију (#5670) надовезују се на овај
  заједнички уговор уместо да се сваки помоћни процес посебно обрађује.
