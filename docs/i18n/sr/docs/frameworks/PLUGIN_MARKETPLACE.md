# Plugin Marketplace (Српски)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGIN_MARKETPLACE.md)

---

> **Извор истине:** `src/lib/plugins/` (`marketplace.ts`, `manager.ts`, `manifest.ts`,
> `scanner.ts`, `loader.ts`), `src/app/api/plugins/` и
> `src/app/(dashboard)/dashboard/plugins/`
> **Последње ажурирање:** 2026-06-28 — v3.8.40

OmniRoute се испоручује са системом додатака налик WordPress-овом. Додаци су
самостални директоријуми — сваки са манифестом `plugin.json` и улазном датотеком —
који се повезују са током обраде захтева (`onRequest` / `onResponse` / `onError`)
и догађајима животног циклуса (`onInstall` / `onActivate` / `onDeactivate` /
`onUninstall`).

**Тржиште додатака** представља слој за откривање изнад тог система. Оно нуди
каталог доступних додатака који се може прегледати. Каталог подразумевано чини
мали уграђени почетни регистар; оператер га може усмерити на прилагођени URL
удаљеног регистра, при чему је преузимање заштићено SSRF контролом која разрешава
DNS (погледајте [Безбедност](#security)).

Све руте додатака су **доступне само преко loopback интерфејса** (ниво 1 —
`LOCAL_ONLY`): додаци учитавају и извршавају кôд у подређеним процесима, па су
руте недоступне са извора који није loopback, без обзира на аутентификацију.
Погледајте [`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md).

## Како све функционише заједно

```
Контролна табла (/dashboard/plugins)
  ├─ Картица „Инсталирано“ → GET /api/plugins            (listPlugins)
  │                          POST /api/plugins/scan      (pluginManager.scan)
  │                          POST /api/plugins/{name}/activate|deactivate
  │                          DELETE /api/plugins/{name}   (деинсталација)
  └─ Картица „Тржиште“     → GET /api/plugins/marketplace
                               → listMarketplacePlugins()
                                 ├─ нема прилагођеног URL-а → уграђени SEED_REGISTRY
                                 └─ прилагођени URL → isSafeMarketplaceUrl() SSRF контрола
                                                       → safeOutboundFetch(guard:"public-only")
```

- **Слој регистра** — `src/lib/plugins/marketplace.ts`: приказује / претражује
  каталог и при свакој грешци се враћа на почетни регистар.
- **Слој животног циклуса** — `src/lib/plugins/manager.ts` (`pluginManager`
  синглтон): инсталација, надоградња, активирање, деактивирање, деинсталација,
  скенирање и учитавање при покретању.
- **Слој манифеста** — `src/lib/plugins/manifest.ts`: Zod шема и подразумеване
  вредности за `plugin.json`.
- **Скенер** — `src/lib/plugins/scanner.ts`: открива додатке на диску унутар
  директоријума додатака.
- **Учитавач** — `src/lib/plugins/loader.ts`: покреће сваки додатак у изолованом
  подређеном процесу и посредује у позивима кука преко IPC-а.

## Каталог тржишта

`listMarketplacePlugins()` (`src/lib/plugins/marketplace.ts`) враћа листу
објеката `MarketplaceEntry`:

| Поље          | Тип      | Напомене                                    |
| ------------- | -------- | ------------------------------------------- |
| `name`        | string   | Назив додатка у kebab-case формату          |
| `version`     | string   | semver                                      |
| `description` | string   | Кратак опис                                 |
| `author`      | string   | Аутор / организација                        |
| `license`     | string   | Идентификатор лиценце у SPDX стилу          |
| `downloadUrl` | string   | URL за преузимање извора (може бити празан) |
| `repository`  | string?  | Опциони URL репозиторијума                  |
| `tags`        | string[] | Ознаке за претрагу/филтрирање               |
| `downloads`   | number   | Број преузимања                             |
| `rating`      | number   | 0–5                                         |
| `verified`    | boolean  | Да ли је унос означен као проверен          |
| `lastUpdated` | string   | Ниска датума приближно у ISO формату        |

Када није конфигурисан прилагођени URL регистра, каталог користи уграђени
`SEED_REGISTRY` (тренутно `request-logger`, `rate-limiter`, `cost-tracker` и
`theme-manager`). Почетни регистар је увек доступан — ако је конфигурисани
удаљени регистар недоступан, врати статус који није `200` или врати непрепознато
тело, `listMarketplacePlugins()` бележи упозорење и враћа се на почетну листу.

> Напомена: **каталог** тржишта (прегледање/претрага) повезан је од почетка до
> краја, али инсталација са тржишта **једним кликом** из каталога још није
> имплементирана — дугме „Инсталирај“ на контролној табли за унос са тржишта
> тренутно приказује обавештење „ускоро доступно“. Инсталација се тренутно обавља
> путем тока инсталације са локалне путање (`POST /api/plugins`) и откривања на
> диску (`POST /api/plugins/scan`).

## REST API

Све крајње тачке захтева администраторску аутентификацију (`requireManagementAuth`) **и**
доступне су само преко loopback интерфејса — `/api/plugins` и `/api/plugins/` наведене су у
`LOCAL_ONLY_API_PREFIXES` (`src/server/authz/routeGuard.ts`).

| Крајња тачка                     | Метод  | Опис                                                       |
| -------------------------------- | ------ | ---------------------------------------------------------- |
| `/api/plugins`                   | GET    | Листа инсталираних додатака (опциони филтер `?status=`)    |
| `/api/plugins`                   | POST   | Инсталирање додатка са апсолутне локалне путање            |
| `/api/plugins/scan`              | POST   | Скенирање директоријума додатака и регистрација нових      |
| `/api/plugins/marketplace`       | GET    | Листа ставки каталога продавнице                           |
| `/api/plugins/[name]`            | GET    | Преузимање детаља инсталираног додатка                     |
| `/api/plugins/[name]`            | DELETE | Деинсталирање додатка                                      |
| `/api/plugins/[name]/activate`   | POST   | Активирање (учитавање + регистрација hook-ова)             |
| `/api/plugins/[name]/deactivate` | POST   | Деактивирање (покретање `onDeactivate`, уклањање hook-ова) |
| `/api/plugins/[name]/config`     | GET    | Преузимање конфигурације додатка + шеме конфигурације      |
| `/api/plugins/[name]/config`     | PUT    | Ажурирање конфигурације додатка (уз валидацију према шеми) |

Филтер `status` за `GET /api/plugins` прихвата једну од вредности
`installed` / `active` / `inactive` / `error`. Неважећа вредност враћа `400`.

### Листа инсталираних додатака

```bash
curl http://localhost:20128/api/plugins \
  -H "Cookie: auth_token=..."
```

### Инсталирање са локалне путање

```bash
curl -X POST http://localhost:20128/api/plugins \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{ "path": "/absolute/path/to/my-plugin" }'
```

Вредност `path` мора бити **апсолутна** и не сме садржати `..` сегменте за кретање кроз
директоријуме нити null бајтове (што примењује Zod). Изворни директоријум мора садржати важећи
`plugin.json` (или бити надређени директоријум неког таквог фајла). У случају успеха, одговор има статус `201` и садржи
ред инсталираног додатка.

### Преглед продавнице

```bash
curl http://localhost:20128/api/plugins/marketplace \
  -H "Cookie: auth_token=..."
```

### Ажурирање конфигурације додатка

```bash
curl -X PUT http://localhost:20128/api/plugins/my-plugin/config \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{ "config": { "level": "debug", "maxItems": 100 } }'
```

`PUT .../config` валидира сваку прослеђену вредност према
`configSchema` додатка (декларисаној у манифесту): поља типа `number` поштују `min`/`max`,
док поља типа `select` морају одговарати декларисаној вредности `enum`. Кључеви који нису присутни у шеми
дозвољени су без измена.

## Конфигурација

### Директоријум додатака

Додаци се налазе у OmniRoute директоријуму података:

```
~/.omniroute/plugins/<plugin-name>/
  ├─ plugin.json
  └─ index.js          # (или било шта на шта manifest.main упућује)
```

`getDefaultPluginDir()` (`src/lib/plugins/scanner.ts`) одређује тај директоријум у
три корака:

1. **`OMNIROUTE_PLUGINS_DIR`**, када је постављен — користи се дословно, без обзира на вредност `HOME`. Ово је
   експлицитно подешавање за Docker/K8s, где је стабло додатака монтирано преко bind mount-а на путању
   која обично нема никакве везе са матичним директоријумом контејнера (#11827).
2. `<home>/.omniroute/plugins`, где се `<home>` добија из променљивих окружења `HOME` / `USERPROFILE`.
3. `/tmp/.omniroute/plugins`, када процес уопште не извози матични директоријум.

Одређени директоријум се једном евидентира при покретању као `scanner.dir_resolved`, уз навођење
изабраног улаза (`OMNIROUTE_PLUGINS_DIR`, `home` или `no-home-fallback`) — тако слика
која неприметно заврши на 3. кораку то и пријављује, уместо да само прикаже празну листу додатака.
`POST /api/plugins/scan` открива сваки поддиректоријум у њему који садржи важећи
`plugin.json` и региструје га; исти директоријум представља корен у који
`pluginManager.install()` копира додатке, тако да замена путање заједно премешта и откривање и
инсталацију.

> **`OMNIROUTE_PLUGINS_DIR` није `OMNIROUTE_PLUGIN_PATH`.** Ово друго чита искључиво
> учитавач додатака за CLI команде (`bin/cli/plugins.mjs`) како би пронашао `omniroute-cmd-*` npm
> пакете који додају `omniroute` подкоманде — оно нема утицаја на runtime скенер
> описан овде. За ту страну погледајте [PLUGINS.md](./PLUGINS.md).

### Прилагођени URL регистра продавнице

Извор каталога продавнице чита се из подешавања `pluginMarketplaceUrl`
(`src/lib/plugins/marketplace.ts` чита `settings.pluginMarketplaceUrl`). Када је
постављено на `http(s)` URL, `listMarketplacePlugins()` преузима тај URL и прихвата
или JSON низ ставки највишег нивоа или објекат са низом `plugins`;
ставке без поља `name` типа string се филтрирају. Када вредност није постављена (или када преузимање
не прође SSRF заштиту / врати неисправан одговор), користи се уграђени почетни регистар.

Картица „Продавница“ на контролној табли садржи поље за овај URL (вредност се поново чита преко
`GET /api/settings`).

> Напомена о имплементацији: радња „Сачувај“ на контролној табли шаље
> `pluginMarketplaceUrl` на `PATCH /api/settings`. У тренутку писања, овај
> кључ није декларисан у `updateSettingsSchema`
> (`src/shared/validation/settingsSchemas.ts`), па проверите трајност чувања у свом
> издању пре него што се ослоните на њу — путања за **читање** (`getSettings()` →
> `listMarketplacePlugins()`) поштује кључ када се он нађе у складишту
> подешавања.

## Безбедност

### Ниво руте — само loopback

Додаци извршавају кôд у покренутим подређеним процесима, па је целокупна
површина `/api/plugins` класификована као `LOCAL_ONLY` (ниво 1). Провера
loopback приступа извршава се безусловно **пре** сваке провере аутентификације,
тако да компромитовани управљачки токен који преко тунела стигне до машине и
даље не може да инсталира, активира или деинсталира додатак.
Погледајте [`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md)
и строга правила #15 / #17.

### SSRF заштита регистра продавнице

Нападач може да утиче на конфигурацију прилагођеног URL-а регистра, па га
`listMarketplacePlugins()` пре преузимања пропушта кроз два слоја:

1. **`isSafeMarketplaceUrl(url)`** (`src/lib/plugins/marketplace.ts`):
   - Одбацује све што није `http:` / `https:`.
   - Одбацује дословне приватне/loopback/link-local/ULA хостове (IPv4 **и** IPv6,
     укључујући IPv4-мапиране) помоћу канонске функције `isPrivateHost`
     (`src/shared/network/outboundUrlGuard.ts`).
   - Разрешава **и** `A` и `AAAA` записе и одбацује URL ако је **било која**
     разрешена адреса приватна — чиме се затвара могућност заобилажења путем
     јавног имена хоста → приватне IP адресе.
   - **Безбедно одбија приступ**: неуспешно DNS разрешавање доводи до одбацивања
     URL-а.
2. **`safeOutboundFetch(url, { guard: "public-only", timeoutMs: 5000 })`**
   (`src/shared/network/safeOutboundFetch.ts`): поново примењује заштиту URL-а
   која дозвољава само јавне адресе у тренутку преузимања и **блокира
   преусмеравања** (нема преласка са јавне на приватну адресу путем `30x`).

URL који не прође било који од ова два слоја не прекида захтев — продавница се
неприметно враћа на уграђени почетни регистар и бележи упозорење.

> Ова заштита је ојачана у PR-у #3774 конкретно ради разрешавања A + AAAA записа
> и употребе канонске функције `isPrivateHost` уместо провере ограничене само на
> IPv4.

### Изолација извршавања додатака

- **Изолација процеса** — `loadPlugin()` (`src/lib/plugins/loader.ts`) покреће
  сваки додатак у засебном Node.js подређеном процесу и комуницира путем IPC-а.
  Позиви hook функција имају временско ограничење са ескалацијом `SIGTERM` →
  `SIGKILL`.
- **Листа дозвољених променљивих окружења** — подређени процес добија само
  дозвољени скуп променљивих окружења; шири скуп се додељује само када манифест
  захтева дозволу `env`.
- **Ограничавање путање** — инсталација/надоградња/деинсталација проверавају да
  се директоријум додатка и `manifest.main` разрешавају **унутар** управљаног
  кореног директоријума додатака пре било каквог копирања или рекурзивног
  брисања (заштита од измењених путања у бази података и кретања помоћу `../` у
  `manifest.main`). Активација разрешава симболичке везе помоћу `realpath` и
  одбија учитавање улазне тачке која излази из директоријума додатка.
- **Опциони контролни хеш интегритета** — манифест може да декларише поље
  `integrity` (`sha256-<base64>`, SRI формат). Када је присутно, учитавач
  проверава хеш улазне датотеке при учитавању и одбија активацију ако се
  вредности не подударају. Ово је опционо откривање неовлашћених измена, а
  **не** безбедносна граница — рутирање ограничено на loopback и модел дозвола
  представљају стварне границе.

## Манифест (`plugin.json`)

Валидира га `PluginManifestSchema` (`src/lib/plugins/manifest.ts`):

| Поље               | Тип       | Напомене                                                             |
| ------------------ | --------- | -------------------------------------------------------------------- |
| `name`             | string    | Обавезно; kebab-case (`^[a-z0-9-]+$`), 1–100 знакова                 |
| `version`          | string    | Обавезно; semver (`MAJOR.MINOR.PATCH`)                               |
| `description`      | string?   | ≤ 500 знакова                                                        |
| `author`           | string?   | ≤ 200 знакова                                                        |
| `license`          | string?   | Подразумевано је `MIT`                                               |
| `main`             | string?   | Улазна датотека; подразумевано је `index.js`                         |
| `source`           | enum?     | `local` \| `marketplace` (подразумевано је `local`)                  |
| `tags`             | string[]? | Ознаке за претрагу                                                   |
| `requires`         | object?   | `{ omniroute?, permissions[] }`                                      |
| `hooks`            | object?   | Булове вредности које наводе које hook функције додатак имплементира |
| `skills`           | object[]? | Опционе дефиниције вештина                                           |
| `enabledByDefault` | boolean?  | Аутоматска активација при инсталацији                                |
| `configSchema`     | object?   | Мапа конфигурационих поља (`string`/`number`/`boolean`/`select`)     |
| `integrity`        | string?   | Опциони `sha256-<base64>` контролни хеш улазне датотеке              |

Дозволе се бирају из enum скупа
`network` / `file-read` / `file-write` / `env` / `exec`.

## Ток животног циклуса

```
install (POST /api/plugins, путања)
  → скенирање/валидација манифеста → копирање у привремени директоријум → провера да ли је main унутар директоријума
  → атомско преименовање у ~/.omniroute/plugins/<name> → уметање реда у базу података
  → покретање onInstall → ако је enabledByDefault: активирање

activate (POST /api/plugins/{name}/activate)
  → провера ограничења путање помоћу realpath → loadPlugin() (покретање подређеног процеса)
  → регистровање декларисаних кука → status = "active" → покретање onActivate

deactivate (POST /api/plugins/{name}/deactivate)
  → покретање onDeactivate (ПРЕ одјављивања) → одјављивање кука
  → заустављање подређеног процеса → status = "inactive"

uninstall (DELETE /api/plugins/{name})
  → деактивирање ако је активан → покретање onUninstall
  → рекурзивно брисање директоријума додатка уз проверу ограничења путање → брисање реда из базе података
```

Поновно покретање `install` над директоријумом чија је верзија манифеста **строго
новија** од инсталиране верзије аутоматски врши надоградњу (чиста поновна инсталација; конфигурација се враћа
на подразумеване вредности). Иста или старија верзија се одбија.

## База података

Табела `plugins` (миграција `076_create_plugins.sql`):

| Колона          | Тип     | Напомене                                              |
| --------------- | ------- | ----------------------------------------------------- |
| `id`            | TEXT PK | UUID                                                  |
| `name`          | TEXT    | Јединствено                                           |
| `version`       | TEXT    | semver; подразумевано `1.0.0`                         |
| `description`   | TEXT    | Опционо                                               |
| `author`        | TEXT    | Опционо                                               |
| `license`       | TEXT    | Подразумевано `MIT`                                   |
| `main`          | TEXT    | Улазна датотека; подразумевано `index.js`             |
| `source`        | TEXT    | Подразумевано `local`                                 |
| `tags`          | TEXT    | JSON низ; подразумевано `[]`                          |
| `status`        | TEXT    | `installed` \| `active` \| `inactive` \| `error`      |
| `enabled`       | INT     | 0/1; подразумевано 0                                  |
| `manifest`      | TEXT    | Комплетан JSON манифеста                              |
| `config`        | TEXT    | JSON; подразумевано `{}`                              |
| `config_schema` | TEXT    | JSON; подразумевано `{}`                              |
| `hooks`         | TEXT    | JSON низ назива декларисаних кука; подразумевано `[]` |
| `permissions`   | TEXT    | JSON низ; подразумевано `[]`                          |
| `plugin_dir`    | TEXT    | Апсолутни инсталациони директоријум                   |
| `error_message` | TEXT    | Поставља се када је `status = "error"`                |
| `installed_at`  | TEXT    | `datetime('now')`                                     |
| `updated_at`    | TEXT    | `datetime('now')`                                     |
| `activated_at`  | TEXT    | Поставља се приликом активације                       |

Метрике/аналитика додатака прате се у додатним табелама
(`090_plugin_metrics.sql`, `091_plugin_analytics.sql`).

## Контролна табла

Страница контролне табле на `/dashboard/plugins`
(`src/app/(dashboard)/dashboard/plugins/page.tsx`) садржи две картице:

- **Инсталирани** — приказује инсталиране додатке са њиховим декларисаним кукама, прекидачем
  за активирање/деактивирање, дугметом за деинсталацију и радњом „Скенирај додатке“
  (`POST /api/plugins/scan`).
- **Тржиште** — приказује каталог добијен преко `GET /api/plugins/marketplace`, са
  пољем за подешавање URL-а прилагођеног регистра.

Страница за конфигурацију појединачног додатка налази се на `/dashboard/plugins/[name]/config`
(`src/app/(dashboard)/dashboard/plugins/[name]/config/page.tsx`).

## Погледајте и

- [`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md) —
  зашто је `/api/plugins` доступан само преко loopback интерфејса (ниво 1)
- [`docs/frameworks/SKILLS.md`](./SKILLS.md) — сродни оквир за вештине
  (`src/lib/skills/`); додаци могу да декларишу вештине у свом манифесту
- [`docs/frameworks/WEBHOOKS.md`](./WEBHOOKS.md) — излазне интеграције
  засноване на догађајима
- [`docs/security/ERROR_SANITIZATION.md`](../security/ERROR_SANITIZATION.md) —
  образац `buildErrorBody()` који свака рута додатка користи за одговоре о грешкама
