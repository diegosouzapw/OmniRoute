# Plugin Marketplace (Български)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGIN_MARKETPLACE.md)

---

> **Източник на достоверна информация:** `src/lib/plugins/` (`marketplace.ts`, `manager.ts`, `manifest.ts`,
> `scanner.ts`, `loader.ts`), `src/app/api/plugins/` и
> `src/app/(dashboard)/dashboard/plugins/`
> **Последна актуализация:** 2026-06-28 — v3.8.40

OmniRoute включва система за плъгини в стила на WordPress. Плъгините представляват самостоятелни
директории — всяка с манифест `plugin.json` и входен файл — които се включват
в конвейера за обработка на заявки (`onRequest` / `onResponse` / `onError`) и в
събитията от жизнения цикъл (`onInstall` / `onActivate` / `onDeactivate` / `onUninstall`).

**Пазарът за плъгини** е слоят за откриване, изграден върху тази система. Той
предоставя каталог за преглед с плъгини, които могат да бъдат инсталирани. По подразбиране каталогът е
малък вграден начален регистър; операторът може да го насочи към персонализиран отдалечен
URL адрес на регистър, като в този случай извличането е защитено чрез предпазен механизъм срещу SSRF,
който извършва DNS преобразуване (вижте [Сигурност](#security)).

Всеки маршрут за плъгини е достъпен **само през loopback** (ниво 1 — `LOCAL_ONLY`): плъгините зареждат
и изпълняват код в дъщерни процеси, затова маршрутите са недостъпни от
източник извън loopback независимо от удостоверяването. Вижте
[`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md).

## Как работят компонентите заедно

```
Табло за управление (/dashboard/plugins)
  ├─ Раздел „Инсталирани“ → GET /api/plugins            (listPlugins)
  │                         POST /api/plugins/scan      (pluginManager.scan)
  │                         POST /api/plugins/{name}/activate|deactivate
  │                         DELETE /api/plugins/{name}   (деинсталиране)
  └─ Раздел „Пазар“        → GET /api/plugins/marketplace
                              → listMarketplacePlugins()
                                ├─ без персонализиран URL → вграден SEED_REGISTRY
                                └─ персонализиран URL → isSafeMarketplaceUrl() предпазен механизъм срещу SSRF
                                                      → safeOutboundFetch(guard:"public-only")
```

- **Слой на регистъра** — `src/lib/plugins/marketplace.ts`: извежда списък / извършва търсене в
  каталога, като при всякаква грешка се връща към началния регистър.
- **Слой на жизнения цикъл** — `src/lib/plugins/manager.ts` (единичен екземпляр `pluginManager`):
  инсталиране, надграждане, активиране, деактивиране, деинсталиране, сканиране, зареждане при стартиране.
- **Слой на манифеста** — `src/lib/plugins/manifest.ts`: Zod схема + стойности по подразбиране за
  `plugin.json`.
- **Скенер** — `src/lib/plugins/scanner.ts`: открива плъгини на диска в
  директорията за плъгини.
- **Механизъм за зареждане** — `src/lib/plugins/loader.ts`: стартира всеки плъгин в изолиран
  дъщерен процес и посредничи при извикванията на куки чрез IPC.

## Каталог на пазара

`listMarketplacePlugins()` (`src/lib/plugins/marketplace.ts`) връща списък от
обекти `MarketplaceEntry`:

| Поле          | Тип      | Бележки                                          |
| ------------- | -------- | ------------------------------------------------ |
| `name`        | string   | Име на плъгина във формат kebab-case             |
| `version`     | string   | semver                                           |
| `description` | string   | Кратко описание                                  |
| `author`      | string   | Автор / организация                              |
| `license`     | string   | Идентификатор на лиценз в стил SPDX              |
| `downloadUrl` | string   | URL за изтегляне на източника (може да е празен) |
| `repository`  | string?  | Незадължителен URL на хранилището                |
| `tags`        | string[] | Етикети за търсене/филтриране                    |
| `downloads`   | number   | Брой изтегляния                                  |
| `rating`      | number   | 0–5                                              |
| `verified`    | boolean  | Дали записът е отбелязан като проверен           |
| `lastUpdated` | string   | Низ за дата във формат, подобен на ISO           |

Когато не е конфигуриран персонализиран URL адрес на регистър, каталогът използва вградения
`SEED_REGISTRY` (понастоящем `request-logger`, `rate-limiter`, `cost-tracker` и
`theme-manager`). Началният регистър е винаги достъпен — ако конфигуриран отдалечен
регистър е недостъпен, върне състояние, различно от `200`, или върне неразпознато
тяло, `listMarketplacePlugins()` регистрира предупреждение и се връща към началния списък.

> Забележка: **каталогът** на пазара (преглед/търсене) е свързан от край до край, но
> инсталирането с едно щракване **от пазара** чрез каталога все още не е реализирано —
> бутонът „Инсталиране“ в таблото за управление за запис от пазара в момента показва
> известие „очаквайте скоро“. Понастоящем инсталирането се извършва чрез процеса за инсталиране
> от локален път (`POST /api/plugins`) и откриването на диска (`POST /api/plugins/scan`).

## REST API

Всички крайни точки изискват управленска автентикация (`requireManagementAuth`) **и** са
достъпни само през loopback — `/api/plugins` и `/api/plugins/` са изброени в
`LOCAL_ONLY_API_PREFIXES` (`src/server/authz/routeGuard.ts`).

| Крайна точка                     | Метод  | Описание                                                          |
| -------------------------------- | ------ | ----------------------------------------------------------------- |
| `/api/plugins`                   | GET    | Изброява инсталираните плъгини (незадължителен филтър `?status=`) |
| `/api/plugins`                   | POST   | Инсталира плъгин от абсолютен локален път                         |
| `/api/plugins/scan`              | POST   | Сканира директорията с плъгини и регистрира нови плъгини          |
| `/api/plugins/marketplace`       | GET    | Изброява записите в каталога на пазара                            |
| `/api/plugins/[name]`            | GET    | Връща подробности за инсталиран плъгин                            |
| `/api/plugins/[name]`            | DELETE | Деинсталира плъгин                                                |
| `/api/plugins/[name]/activate`   | POST   | Активира (зарежда + регистрира куки)                              |
| `/api/plugins/[name]/deactivate` | POST   | Деактивира (задейства `onDeactivate`, дерегистрира куките)        |
| `/api/plugins/[name]/config`     | GET    | Връща конфигурацията на плъгина + конфигурационната схема         |
| `/api/plugins/[name]/config`     | PUT    | Актуализира конфигурацията на плъгина (валидирана спрямо схемата) |

Филтърът `status` на `GET /api/plugins` приема една от стойностите
`installed` / `active` / `inactive` / `error`. Невалидна стойност връща `400`.

### Изброяване на инсталираните плъгини

```bash
curl http://localhost:20128/api/plugins \
  -H "Cookie: auth_token=..."
```

### Инсталиране от локален път

```bash
curl -X POST http://localhost:20128/api/plugins \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{ "path": "/absolute/path/to/my-plugin" }'
```

`path` трябва да бъде **абсолютен** и не може да съдържа сегменти за обхождане `..` или
нулеви байтове (наложено чрез Zod). Директорията източник трябва да съдържа валиден
`plugin.json` (или да бъде родителска директория на такава). При успех отговорът е `201` с
реда на инсталирания плъгин.

### Разглеждане на пазара

```bash
curl http://localhost:20128/api/plugins/marketplace \
  -H "Cookie: auth_token=..."
```

### Актуализиране на конфигурацията на плъгин

```bash
curl -X PUT http://localhost:20128/api/plugins/my-plugin/config \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{ "config": { "level": "debug", "maxItems": 100 } }'
```

`PUT .../config` валидира всяка предоставена стойност спрямо `configSchema` на плъгина
(декларирана в манифеста): полетата `number` спазват `min`/`max`,
а полетата `select` трябва да съответстват на декларирания `enum`. Ключове, които не
присъстват в схемата, се допускат.

## Конфигурация

### Директория за плъгини

Плъгините се намират в директорията за данни на OmniRoute:

```
~/.omniroute/plugins/<plugin-name>/
  ├─ plugin.json
  └─ index.js          # (или към каквото сочи manifest.main)
```

`getDefaultPluginDir()` (`src/lib/plugins/scanner.ts`) определя тази директория в
три стъпки:

1. **`OMNIROUTE_PLUGINS_DIR`**, когато е зададена — използва се дословно, независимо от стойността на `HOME`. Това е
   изричната настройка за Docker/K8s, където дървото с плъгини е монтирано чрез bind mount на път,
   който обикновено няма нищо общо с началната директория на контейнера (#11827).
2. `<home>/.omniroute/plugins`, където `<home>` идва от променливите на средата `HOME` / `USERPROFILE`.
3. `/tmp/.omniroute/plugins`, когато процесът изобщо не експортира начална директория.

Определената директория се записва еднократно в регистрационния файл при стартиране като `scanner.dir_resolved`, като се посочва
избраният вход (`OMNIROUTE_PLUGINS_DIR`, `home` или `no-home-fallback`) — така образ,
който неусетно стига до стъпка 3, го посочва изрично, вместо само да отчете празен списък с плъгини.
`POST /api/plugins/scan` открива всяка поддиректория в нея, която съдържа валиден
`plugin.json`, и я регистрира; същата директория е коренът, в който
`pluginManager.install()` копира плъгините, така че замяната премества откриването и
инсталирането заедно.

> **`OMNIROUTE_PLUGINS_DIR` не е `OMNIROUTE_PLUGIN_PATH`.** Последната се чете само от
> механизма за зареждане на командни плъгини на CLI (`bin/cli/plugins.mjs`), за да намира `omniroute-cmd-*` npm
> пакети, които добавят подкоманди към `omniroute` — тя не влияе върху механизма за сканиране по време на изпълнение,
> описан тук. Вижте [PLUGINS.md](./PLUGINS.md) за тази част.

### Персонализиран URL адрес на регистъра на пазара

Източникът на каталога на пазара се прочита от настройката `pluginMarketplaceUrl`
(`src/lib/plugins/marketplace.ts` чете `settings.pluginMarketplaceUrl`). Когато
е зададен `http(s)` URL адрес, `listMarketplacePlugins()` извлича този URL адрес и приема
или JSON масив от записи на най-горно ниво, или обект с масив `plugins`;
записите без `name` от тип низ се филтрират. Когато настройката не е зададена (или когато заявката
не премине SSRF защитата / върне невалиден отговор), се използва вграденият начален регистър.

Разделът „Marketplace“ на таблото за управление предоставя поле за този URL адрес (прочита се обратно от
`GET /api/settings`).

> Бележка за реализацията: действието „Save“ на таблото за управление изпраща
> `pluginMarketplaceUrl` към `PATCH /api/settings`. Към момента на писане този
> ключ не е деклариран в `updateSettingsSchema`
> (`src/shared/validation/settingsSchemas.ts`), затова проверете устойчивото му съхранение във вашата
> версия, преди да разчитате на него — пътят за **четене** (`getSettings()` →
> `listMarketplacePlugins()`) използва ключа, след като той присъства в хранилището
> за настройки.

## Сигурност

### Ниво на маршрут — само loopback

Плъгините изпълняват код в стартирани дъщерни процеси, затова цялата повърхност
`/api/plugins` е класифицирана като `LOCAL_ONLY` (Ниво 1). Ограничението до
loopback се прилага безусловно **преди** всяка проверка за удостоверяване, така
че дори изтекъл токен за управление, достигнал машината през тунел, не може да
инсталира, активира или деинсталира плъгин. Вижте
[`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md) и
Строги правила №15 / №17.

### SSRF защита за регистъра на магазина

Персонализираният URL адрес на регистъра е конфигурация, върху която атакуващ
може да влияе, затова преди извличането му `listMarketplacePlugins()` го
проверява чрез два слоя:

1. **`isSafeMarketplaceUrl(url)`** (`src/lib/plugins/marketplace.ts`):
   - Отхвърля всичко, което не е `http:` / `https:`.
   - Отхвърля литерални частни/loopback/link-local/ULA хостове (IPv4 **и** IPv6,
     включително IPv4-mapped) чрез каноничната функция `isPrivateHost`
     (`src/shared/network/outboundUrlGuard.ts`).
   - Разрешава **както** `A`, **така и** `AAAA` записи и отхвърля адреса, ако
     **някой** от разрешените адреси е частен — така се предотвратява заобикалянето
     чрез публично име на хост → частен IP адрес.
   - **Отказва по подразбиране**: неуспешното DNS разрешаване води до отхвърляне
     на URL адреса.
2. **`safeOutboundFetch(url, { guard: "public-only", timeoutMs: 5000 })`**
   (`src/shared/network/safeOutboundFetch.ts`): прилага отново защитата за URL
   адреси само с публичен достъп в момента на извличане и **блокира
   пренасочванията** (без прехвърляне от публичен към частен адрес чрез `30x`).

URL адрес, който не премине някой от двата слоя, не прекратява заявката —
магазинът безшумно се връща към вградения начален регистър и записва
предупреждение в журнала.

> Тази защита беше подсилена в PR #3774 специално за разрешаване на A + AAAA и
> използване на каноничната функция `isPrivateHost` вместо проверка само за IPv4.

### Изолиране на изпълнението на плъгини

- **Изолиране на процесите** — `loadPlugin()` (`src/lib/plugins/loader.ts`)
  стартира всеки плъгин в отделен дъщерен процес на Node.js и комуникира чрез
  IPC. Извикванията на куки имат ограничение по време с ескалация
  `SIGTERM` → `SIGKILL`.
- **Списък с разрешени променливи на средата** — дъщерният процес получава само
  разрешен набор от променливи на средата; по-широкият набор се предоставя
  единствено когато манифестът изисква разрешението `env`.
- **Ограничаване на пътищата** — при инсталиране/надграждане/деинсталиране се
  проверява дали директорията на плъгина и `manifest.main` се разрешават
  **в рамките** на управляваната главна директория за плъгини преди всяко
  копиране или рекурсивно изтриване (защита срещу манипулирани пътища в базата
  данни и обхождане с `../` в `manifest.main`). При активиране символните връзки
  се разрешават чрез `realpath` и се отказва зареждането на входна точка, която
  излиза извън директорията на плъгина.
- **Незадължително фиксиране на целостта** — манифестът може да декларира поле
  `integrity` (`sha256-<base64>`, формат SRI). Когато то е налично, зареждащият
  модул проверява хеша на входния файл по време на зареждането и отказва
  активиране при несъответствие. Това е доброволно откриване на подправяне,
  **а не** граница на сигурността — маршрутизирането само през loopback и
  моделът за разрешения са действителните граници.

## Манифест (`plugin.json`)

Валидира се от `PluginManifestSchema` (`src/lib/plugins/manifest.ts`):

| Поле               | Тип       | Бележки                                                                |
| ------------------ | --------- | ---------------------------------------------------------------------- |
| `name`             | string    | Задължително; kebab-case (`^[a-z0-9-]+$`), 1–100 знака                 |
| `version`          | string    | Задължително; semver (`MAJOR.MINOR.PATCH`)                             |
| `description`      | string?   | ≤ 500 знака                                                            |
| `author`           | string?   | ≤ 200 знака                                                            |
| `license`          | string?   | По подразбиране е `MIT`                                                |
| `main`             | string?   | Входен файл; по подразбиране е `index.js`                              |
| `source`           | enum?     | `local` \| `marketplace` (по подразбиране е `local`)                   |
| `tags`             | string[]? | Тагове за търсене                                                      |
| `requires`         | object?   | `{ omniroute?, permissions[] }`                                        |
| `hooks`            | object?   | Булеви стойности, указващи кои куки реализира плъгинът                 |
| `skills`           | object[]? | Незадължителни дефиниции на умения                                     |
| `enabledByDefault` | boolean?  | Автоматично активиране при инсталиране                                 |
| `configSchema`     | object?   | Карта на конфигурационни полета (`string`/`number`/`boolean`/`select`) |
| `integrity`        | string?   | Незадължително фиксиране на входния файл чрез `sha256-<base64>`        |

Разрешенията се избират от изброяването
`network` / `file-read` / `file-write` / `env` / `exec`.

## Поток на жизнения цикъл

```
install (POST /api/plugins, път)
  → сканиране/валидиране на манифеста → копиране във временна директория → проверка, че main е в директорията
  → атомарно преименуване в ~/.omniroute/plugins/<name> → вмъкване на ред в БД
  → задействане на onInstall → ако enabledByDefault: активиране

activate (POST /api/plugins/{name}/activate)
  → проверка за принадлежност чрез realpath → loadPlugin() (стартиране на дъщерен процес)
  → регистриране на декларираните куки → status = "active" → задействане на onActivate

deactivate (POST /api/plugins/{name}/deactivate)
  → задействане на onDeactivate (ПРЕДИ дерегистрирането) → дерегистриране на куките
  → прекратяване на дъщерния процес → status = "inactive"

uninstall (DELETE /api/plugins/{name})
  → деактивиране, ако е активен → задействане на onUninstall
  → рекурсивно изтриване на директорията на приставката с проверка за принадлежност → изтриване на реда от БД
```

Повторното изпълнение на `install` за директория, чиято версия в манифеста е **строго
по-нова** от инсталираната версия, извършва автоматично надграждане (чиста преинсталация; конфигурацията се връща
към стойностите по подразбиране). Същата или по-стара версия се отхвърля.

## База данни

Таблица `plugins` (миграция `076_create_plugins.sql`):

| Колона          | Тип     | Бележки                                                          |
| --------------- | ------- | ---------------------------------------------------------------- |
| `id`            | TEXT PK | UUID                                                             |
| `name`          | TEXT    | Уникално                                                         |
| `version`       | TEXT    | semver; по подразбиране `1.0.0`                                  |
| `description`   | TEXT    | Незадължително                                                   |
| `author`        | TEXT    | Незадължително                                                   |
| `license`       | TEXT    | По подразбиране `MIT`                                            |
| `main`          | TEXT    | Входен файл; по подразбиране `index.js`                          |
| `source`        | TEXT    | По подразбиране `local`                                          |
| `tags`          | TEXT    | JSON масив; по подразбиране `[]`                                 |
| `status`        | TEXT    | `installed` \| `active` \| `inactive` \| `error`                 |
| `enabled`       | INT     | 0/1; по подразбиране 0                                           |
| `manifest`      | TEXT    | Пълният JSON на манифеста                                        |
| `config`        | TEXT    | JSON; по подразбиране `{}`                                       |
| `config_schema` | TEXT    | JSON; по подразбиране `{}`                                       |
| `hooks`         | TEXT    | JSON масив с имената на декларираните куки; по подразбиране `[]` |
| `permissions`   | TEXT    | JSON масив; по подразбиране `[]`                                 |
| `plugin_dir`    | TEXT    | Абсолютна инсталационна директория                               |
| `error_message` | TEXT    | Задава се, когато `status = "error"`                             |
| `installed_at`  | TEXT    | `datetime('now')`                                                |
| `updated_at`    | TEXT    | `datetime('now')`                                                |
| `activated_at`  | TEXT    | Задава се при активиране                                         |

Метриките/анализите на приставките се проследяват в допълнителни таблици
(`090_plugin_metrics.sql`, `091_plugin_analytics.sql`).

## Табло за управление

Страницата на таблото за управление на адрес `/dashboard/plugins`
(`src/app/(dashboard)/dashboard/plugins/page.tsx`) предоставя два раздела:

- **Инсталирани** — показва инсталираните приставки с декларираните от тях куки, превключвател
  за активиране/деактивиране, бутон за деинсталиране и действие „Сканиране за приставки“
  (`POST /api/plugins/scan`).
- **Каталог** — показва каталога от `GET /api/plugins/marketplace` с
  поле за задаване на URL адреса на персонализирания регистър.

Страницата за конфигурация на отделна приставка се намира на `/dashboard/plugins/[name]/config`
(`src/app/(dashboard)/dashboard/plugins/[name]/config/page.tsx`).

## Вижте също

- [`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md) —
  защо `/api/plugins` е достъпен само през loopback (Ниво 1)
- [`docs/frameworks/SKILLS.md`](./SKILLS.md) — свързаната рамка за умения
  (`src/lib/skills/`); плъгините могат да декларират умения в своя манифест
- [`docs/frameworks/WEBHOOKS.md`](./WEBHOOKS.md) — изходящи интеграции,
  управлявани от събития
- [`docs/security/ERROR_SANITIZATION.md`](../security/ERROR_SANITIZATION.md) —
  шаблонът `buildErrorBody()`, който всеки маршрут на плъгин използва за отговори при грешки
