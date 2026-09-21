# Plugin Marketplace (Русский)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGIN_MARKETPLACE.md)

---

> **Источник истины:** `src/lib/plugins/` (`marketplace.ts`, `manager.ts`, `manifest.ts`,
> `scanner.ts`, `loader.ts`), `src/app/api/plugins/` и
> `src/app/(dashboard)/dashboard/plugins/`
> **Последнее обновление:** 2026-06-28 — v3.8.40

OmniRoute поставляется с системой плагинов в стиле WordPress. Плагины представляют собой автономные
каталоги, каждый из которых содержит манифест `plugin.json` и входной файл. Они подключаются
к конвейеру обработки запросов (`onRequest` / `onResponse` / `onError`) и к
событиям жизненного цикла (`onInstall` / `onActivate` / `onDeactivate` / `onUninstall`).

**Маркетплейс плагинов** — это уровень обнаружения, работающий поверх этой системы. Он
предоставляет доступный для просмотра каталог плагинов, которые можно установить. По умолчанию каталог представляет собой
небольшой встроенный начальный реестр; оператор может указать URL собственного удалённого
реестра, и в этом случае запрос защищается от SSRF с помощью проверки, выполняющей разрешение DNS
(см. раздел [Безопасность](#security)).

Все маршруты плагинов доступны **только через loopback** (уровень 1 — `LOCAL_ONLY`): плагины загружают
и выполняют код в дочерних процессах, поэтому эти маршруты недоступны
с источников, не относящихся к loopback, независимо от аутентификации. См.
[`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md).

## Как всё это работает вместе

```
Панель управления (/dashboard/plugins)
  ├─ Вкладка "Установленные" → GET /api/plugins            (listPlugins)
  │                           POST /api/plugins/scan      (pluginManager.scan)
  │                           POST /api/plugins/{name}/activate|deactivate
  │                           DELETE /api/plugins/{name}   (удаление)
  └─ Вкладка "Маркетплейс"   → GET /api/plugins/marketplace
                                → listMarketplacePlugins()
                                  ├─ нет собственного URL → встроенный SEED_REGISTRY
                                  └─ собственный URL → защита от SSRF isSafeMarketplaceUrl()
                                                     → safeOutboundFetch(guard:"public-only")
```

- **Уровень реестра** — `src/lib/plugins/marketplace.ts`: выводит список каталога /
  выполняет поиск по нему, возвращаясь к начальному реестру при любой ошибке.
- **Уровень жизненного цикла** — `src/lib/plugins/manager.ts` (синглтон `pluginManager`):
  установка, обновление, активация, деактивация, удаление, сканирование, загрузка при запуске.
- **Уровень манифеста** — `src/lib/plugins/manifest.ts`: схема Zod и значения по умолчанию для
  `plugin.json`.
- **Сканер** — `src/lib/plugins/scanner.ts`: обнаруживает плагины на диске в
  каталоге плагинов.
- **Загрузчик** — `src/lib/plugins/loader.ts`: запускает каждый плагин в изолированном
  дочернем процессе и организует вызовы хуков через IPC.

## Каталог маркетплейса

`listMarketplacePlugins()` (`src/lib/plugins/marketplace.ts`) возвращает список
объектов `MarketplaceEntry`:

| Поле          | Тип      | Примечания                                            |
| ------------- | -------- | ----------------------------------------------------- |
| `name`        | string   | Имя плагина в kebab-case                              |
| `version`     | string   | semver                                                |
| `description` | string   | Краткое описание                                      |
| `author`      | string   | Автор / организация                                   |
| `license`     | string   | Идентификатор лицензии в стиле SPDX                   |
| `downloadUrl` | string   | URL для скачивания исходного кода (может быть пустым) |
| `repository`  | string?  | Необязательный URL репозитория                        |
| `tags`        | string[] | Теги для поиска/фильтрации                            |
| `downloads`   | number   | Количество скачиваний                                 |
| `rating`      | number   | 0–5                                                   |
| `verified`    | boolean  | Отмечена ли запись как проверенная                    |
| `lastUpdated` | string   | Строка даты в формате, близком к ISO                  |

Если URL собственного реестра не настроен, используется встроенный каталог
`SEED_REGISTRY` (в настоящее время: `request-logger`, `rate-limiter`, `cost-tracker` и
`theme-manager`). Начальный реестр доступен всегда: если настроенный удалённый
реестр недоступен, возвращает статус, отличный от `200`, или возвращает нераспознанное
тело ответа, `listMarketplacePlugins()` записывает предупреждение в журнал и возвращается к начальному списку.

> Примечание: **каталог** маркетплейса (просмотр/поиск) полностью интегрирован, однако
> установка из каталога маркетплейса **одним щелчком** пока не реализована: кнопка
> "Установить" для записи маркетплейса на панели управления в настоящее время отображает
> уведомление "скоро появится". Сейчас установка выполняется через процесс установки
> из локального пути (`POST /api/plugins`) и обнаружение на диске (`POST /api/plugins/scan`).

## REST API

Все конечные точки требуют управленческой аутентификации (`requireManagementAuth`) **и**
доступны только через loopback-интерфейс — `/api/plugins` и `/api/plugins/` перечислены в
`LOCAL_ONLY_API_PREFIXES` (`src/server/authz/routeGuard.ts`).

| Конечная точка                   | Метод  | Описание                                                            |
| -------------------------------- | ------ | ------------------------------------------------------------------- |
| `/api/plugins`                   | GET    | Список установленных плагинов (необязательный фильтр `?status=`)    |
| `/api/plugins`                   | POST   | Установить плагин из абсолютного локального пути                    |
| `/api/plugins/scan`              | POST   | Просканировать каталог плагинов и зарегистрировать новые            |
| `/api/plugins/marketplace`       | GET    | Получить список записей каталога маркетплейса                       |
| `/api/plugins/[name]`            | GET    | Получить сведения об установленном плагине                          |
| `/api/plugins/[name]`            | DELETE | Удалить плагин                                                      |
| `/api/plugins/[name]/activate`   | POST   | Активировать (загрузить + зарегистрировать хуки)                    |
| `/api/plugins/[name]/deactivate` | POST   | Деактивировать (вызвать `onDeactivate`, отменить регистрацию хуков) |
| `/api/plugins/[name]/config`     | GET    | Получить конфигурацию плагина + схему конфигурации                  |
| `/api/plugins/[name]/config`     | PUT    | Обновить конфигурацию плагина (с проверкой по схеме)                |

Фильтр `status` для `GET /api/plugins` принимает одно из значений:
`installed` / `active` / `inactive` / `error`. Недопустимое значение приводит к ответу `400`.

### Получение списка установленных плагинов

```bash
curl http://localhost:20128/api/plugins \
  -H "Cookie: auth_token=..."
```

### Установка из локального пути

```bash
curl -X POST http://localhost:20128/api/plugins \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{ "path": "/absolute/path/to/my-plugin" }'
```

Значение `path` должно быть **абсолютным** и не может содержать сегменты обхода
каталогов `..` или нулевые байты (это обеспечивается Zod). Исходный каталог должен
содержать допустимый файл `plugin.json` (либо быть родительским каталогом для него).
При успешном выполнении возвращается ответ `201` со строкой установленного плагина.

### Просмотр маркетплейса

```bash
curl http://localhost:20128/api/plugins/marketplace \
  -H "Cookie: auth_token=..."
```

### Обновление конфигурации плагина

```bash
curl -X PUT http://localhost:20128/api/plugins/my-plugin/config \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{ "config": { "level": "debug", "maxItems": 100 } }'
```

`PUT .../config` проверяет каждое переданное значение по `configSchema` плагина
(объявленной в манифесте): поля `number` учитывают ограничения `min`/`max`,
а поля `select` должны соответствовать объявленному `enum`. Ключи, отсутствующие
в схеме, допускаются без проверки.

## Конфигурация

### Каталог плагинов

Плагины находятся в каталоге данных OmniRoute:

```
~/.omniroute/plugins/<plugin-name>/
  ├─ plugin.json
  └─ index.js          # (или другой файл, указанный в manifest.main)
```

`getDefaultPluginDir()` (`src/lib/plugins/scanner.ts`) определяет этот каталог
в три этапа:

1. **`OMNIROUTE_PLUGINS_DIR`**, если задана, — используется без изменений, независимо
   от значения `HOME`. Это явная настройка для Docker/K8s, где дерево плагинов
   монтируется по пути, который обычно никак не связан с домашним каталогом контейнера
   (#11827).
2. `<home>/.omniroute/plugins`, где `<home>` берётся из переменных окружения `HOME` /
   `USERPROFILE`.
3. `/tmp/.omniroute/plugins`, если процесс вообще не экспортирует домашний каталог.

Определённый каталог однократно записывается в журнал при запуске как
`scanner.dir_resolved` с указанием выбранного источника (`OMNIROUTE_PLUGINS_DIR`,
`home` или `no-home-fallback`), поэтому образ, незаметно перешедший к этапу 3,
явно сообщает об этом, а не просто возвращает пустой список плагинов.
`POST /api/plugins/scan` обнаруживает в этом каталоге все подкаталоги, содержащие
допустимый `plugin.json`, и регистрирует их; этот же каталог служит корневым
каталогом, в который `pluginManager.install()` копирует плагины, поэтому переопределение
одновременно изменяет расположение как для обнаружения, так и для установки.

> **`OMNIROUTE_PLUGINS_DIR` — это не `OMNIROUTE_PLUGIN_PATH`.** Последняя читается
> только загрузчиком плагинов команд CLI (`bin/cli/plugins.mjs`) для поиска пакетов npm
> `omniroute-cmd-*`, добавляющих подкоманды `omniroute`, и не влияет на описанный здесь
> сканер среды выполнения. Подробнее об этом см. в [PLUGINS.md](./PLUGINS.md).

### Пользовательский URL реестра маркетплейса

Источник каталога маркетплейса считывается из настройки `pluginMarketplaceUrl`
(`src/lib/plugins/marketplace.ts` считывает `settings.pluginMarketplaceUrl`). Если
указан URL с протоколом `http(s)`, `listMarketplacePlugins()` запрашивает этот URL
и принимает либо JSON-массив записей верхнего уровня, либо объект с массивом
`plugins`; записи без строкового поля `name` отфильтровываются. Если настройка
не задана (либо запрос не проходит защиту от SSRF или возвращает некорректный
ответ), используется встроенный исходный реестр.

На вкладке «Marketplace» панели управления доступно поле для этого URL
(значение считывается обратно через `GET /api/settings`).

> Примечание по реализации: действие «Save» на панели управления отправляет
> `pluginMarketplaceUrl` в `PATCH /api/settings`. На момент написания этот ключ
> не объявлен в `updateSettingsSchema`
> (`src/shared/validation/settingsSchemas.ts`), поэтому, прежде чем полагаться
> на него, проверьте сохранение значения в своей версии — путь **чтения**
> (`getSettings()` → `listMarketplacePlugins()`) учитывает ключ, как только он
> появляется в хранилище настроек.

## Безопасность

### Уровень маршрутов — только loopback

Плагины выполняют код в порождённых дочерних процессах, поэтому вся поверхность
`/api/plugins` классифицируется как `LOCAL_ONLY` (уровень 1). Проверка loopback
выполняется безусловно **до** любой проверки аутентификации, поэтому утёкший
токен управления, попавший на машину через туннель, всё равно не позволит
установить, активировать или удалить плагин.
См. [`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md) и
строгие правила №15 / №17.

### Защита реестра маркетплейса от SSRF

Злоумышленник может влиять на конфигурацию пользовательского URL реестра,
поэтому перед его получением `listMarketplacePlugins()` выполняет две
проверки:

1. **`isSafeMarketplaceUrl(url)`** (`src/lib/plugins/marketplace.ts`):
   - Отклоняет всё, что не использует `http:` / `https:`.
   - Отклоняет явно указанные частные, loopback, link-local и ULA-адреса
     (как IPv4, **так и** IPv6, включая IPv4-mapped) с помощью канонической
     функции `isPrivateHost`
     (`src/shared/network/outboundUrlGuard.ts`).
   - Разрешает **оба** типа записей, `A` и `AAAA`, и отклоняет URL, если
     **любой** полученный адрес является частным, тем самым устраняя обход
     через публичное имя хоста → частный IP-адрес.
   - **Безопасно отклоняет при сбое**: ошибка разрешения DNS приводит к
     отклонению URL.
2. **`safeOutboundFetch(url, { guard: "public-only", timeoutMs: 5000 })`**
   (`src/shared/network/safeOutboundFetch.ts`): повторно применяет ограничение
   URL только публичными адресами во время запроса и **блокирует
   перенаправления** (исключая переход с публичного адреса на частный через
   `30x`).

URL, не прошедший любой из этих уровней проверки, не прерывает запрос —
маркетплейс незаметно переключается на встроенный начальный реестр и записывает
предупреждение в журнал.

> Эта защита была усилена в PR #3774 специально для разрешения A + AAAA и
> использования канонической функции `isPrivateHost` вместо проверки только
> IPv4.

### Изоляция выполнения плагинов

- **Изоляция процессов** — `loadPlugin()` (`src/lib/plugins/loader.ts`)
  запускает каждый плагин в отдельном дочернем процессе Node.js и
  взаимодействует с ним через IPC. Вызовы хуков имеют тайм-аут с эскалацией
  `SIGTERM` → `SIGKILL`.
- **Список разрешённых переменных окружения** — дочерний процесс получает
  только разрешённый набор переменных окружения; более широкий набор
  предоставляется только в том случае, если манифест запрашивает разрешение
  `env`.
- **Ограничение путей** — операции установки, обновления и удаления проверяют,
  что каталог плагина и `manifest.main` разрешаются **в пределах** управляемого
  корневого каталога плагинов, прежде чем выполнять копирование или рекурсивное
  удаление (это защищает от подменённых путей в БД и обхода через `../` в
  `manifest.main`). При активации символические ссылки разрешаются с помощью
  `realpath`, а загрузка точки входа, выходящей за пределы каталога плагина,
  отклоняется.
- **Необязательная фиксация целостности** — манифест может объявлять поле
  `integrity` (`sha256-<base64>`, формат SRI). Если оно задано, загрузчик
  проверяет хеш файла точки входа во время загрузки и отказывается активировать
  плагин при несовпадении. Это добровольно включаемое обнаружение изменений,
  **а не** граница безопасности — настоящими границами являются маршрутизация
  только через loopback и модель разрешений.

## Манифест (`plugin.json`)

Проверяется с помощью `PluginManifestSchema`
(`src/lib/plugins/manifest.ts`):

| Поле               | Тип       | Примечания                                                      |
| ------------------ | --------- | --------------------------------------------------------------- |
| `name`             | string    | Обязательно; kebab-case (`^[a-z0-9-]+$`), 1–100 символов        |
| `version`          | string    | Обязательно; semver (`MAJOR.MINOR.PATCH`)                       |
| `description`      | string?   | ≤ 500 символов                                                  |
| `author`           | string?   | ≤ 200 символов                                                  |
| `license`          | string?   | По умолчанию `MIT`                                              |
| `main`             | string?   | Файл точки входа; по умолчанию `index.js`                       |
| `source`           | enum?     | `local` \| `marketplace` (по умолчанию `local`)                 |
| `tags`             | string[]? | Теги для поиска                                                 |
| `requires`         | object?   | `{ omniroute?, permissions[] }`                                 |
| `hooks`            | object?   | Логические значения, указывающие реализованные хуки             |
| `skills`           | object[]? | Необязательные определения навыков                              |
| `enabledByDefault` | boolean?  | Автоматическая активация при установке                          |
| `configSchema`     | object?   | Карта полей конфигурации (`string`/`number`/`boolean`/`select`) |
| `integrity`        | string?   | Необязательная фиксация файла точки входа `sha256-<base64>`     |

Разрешения выбираются из перечисления
`network` / `file-read` / `file-write` / `env` / `exec`.

## Поток жизненного цикла

```
установка (POST /api/plugins, путь)
  → сканирование/проверка манифеста → копирование во временный каталог → проверка нахождения main внутри каталога
  → атомарное переименование в ~/.omniroute/plugins/<name> → добавление строки в БД
  → вызов onInstall → если enabledByDefault: активация

активация (POST /api/plugins/{name}/activate)
  → проверка вхождения реального пути → loadPlugin() (запуск дочернего процесса)
  → регистрация объявленных хуков → status = "active" → вызов onActivate

деактивация (POST /api/plugins/{name}/deactivate)
  → вызов onDeactivate (ДО отмены регистрации) → отмена регистрации хуков
  → завершение дочернего процесса → status = "inactive"

удаление (DELETE /api/plugins/{name})
  → деактивация, если активен → вызов onUninstall
  → рекурсивное удаление каталога плагина с проверкой вхождения → удаление строки из БД
```

Повторный запуск `install` для каталога, версия манифеста которого **строго
новее** установленной версии, автоматически обновляет плагин (чистая переустановка;
конфигурация сбрасывается до значений по умолчанию). Такая же или более старая
версия отклоняется.

## База данных

Таблица `plugins` (миграция `076_create_plugins.sql`):

| Столбец         | Тип     | Примечания                                                 |
| --------------- | ------- | ---------------------------------------------------------- |
| `id`            | TEXT PK | UUID                                                       |
| `name`          | TEXT    | Уникальное значение                                        |
| `version`       | TEXT    | semver; по умолчанию `1.0.0`                               |
| `description`   | TEXT    | Необязательно                                              |
| `author`        | TEXT    | Необязательно                                              |
| `license`       | TEXT    | По умолчанию `MIT`                                         |
| `main`          | TEXT    | Входной файл; по умолчанию `index.js`                      |
| `source`        | TEXT    | По умолчанию `local`                                       |
| `tags`          | TEXT    | Массив JSON; по умолчанию `[]`                             |
| `status`        | TEXT    | `installed` \| `active` \| `inactive` \| `error`           |
| `enabled`       | INT     | 0/1; по умолчанию 0                                        |
| `manifest`      | TEXT    | Полный JSON манифеста                                      |
| `config`        | TEXT    | JSON; по умолчанию `{}`                                    |
| `config_schema` | TEXT    | JSON; по умолчанию `{}`                                    |
| `hooks`         | TEXT    | Массив JSON с именами объявленных хуков; по умолчанию `[]` |
| `permissions`   | TEXT    | Массив JSON; по умолчанию `[]`                             |
| `plugin_dir`    | TEXT    | Абсолютный путь к каталогу установки                       |
| `error_message` | TEXT    | Задаётся, когда `status = "error"`                         |
| `installed_at`  | TEXT    | `datetime('now')`                                          |
| `updated_at`    | TEXT    | `datetime('now')`                                          |
| `activated_at`  | TEXT    | Задаётся при активации                                     |

Метрики и аналитика плагинов отслеживаются в дополнительных таблицах
(`090_plugin_metrics.sql`, `091_plugin_analytics.sql`).

## Панель управления

Страница панели управления по адресу `/dashboard/plugins`
(`src/app/(dashboard)/dashboard/plugins/page.tsx`) содержит две вкладки:

- **Установленные** — список установленных плагинов с объявленными хуками,
  переключателем активации/деактивации, кнопкой удаления и действием «Сканировать
  плагины» (`POST /api/plugins/scan`).
- **Маркетплейс** — отображает каталог из `GET /api/plugins/marketplace` и
  содержит поле для указания URL пользовательского реестра.

Страница конфигурации отдельного плагина находится по адресу
`/dashboard/plugins/[name]/config`
(`src/app/(dashboard)/dashboard/plugins/[name]/config/page.tsx`).

## См. также

- [`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md) —
  почему `/api/plugins` доступен только через loopback-интерфейс (уровень 1)
- [`docs/frameworks/SKILLS.md`](./SKILLS.md) — связанный фреймворк навыков
  (`src/lib/skills/`); плагины могут объявлять навыки в своём манифесте
- [`docs/frameworks/WEBHOOKS.md`](./WEBHOOKS.md) — исходящие интеграции,
  управляемые событиями
- [`docs/security/ERROR_SANITIZATION.md`](../security/ERROR_SANITIZATION.md) —
  шаблон `buildErrorBody()`, который каждый маршрут плагина использует для ответов об ошибках
