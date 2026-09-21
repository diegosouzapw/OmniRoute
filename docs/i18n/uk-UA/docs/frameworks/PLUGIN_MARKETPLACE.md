# Plugin Marketplace (Українська)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGIN_MARKETPLACE.md)

---

> **Джерело істини:** `src/lib/plugins/` (`marketplace.ts`, `manager.ts`, `manifest.ts`,
> `scanner.ts`, `loader.ts`), `src/app/api/plugins/` та
> `src/app/(dashboard)/dashboard/plugins/`
> **Останнє оновлення:** 2026-06-28 — v3.8.40

OmniRoute постачається із системою плагінів у стилі WordPress. Плагіни — це самодостатні
каталоги, кожен із маніфестом `plugin.json` і вхідним файлом, які підключаються
до конвеєра запитів (`onRequest` / `onResponse` / `onError`) і до
подій життєвого циклу (`onInstall` / `onActivate` / `onDeactivate` / `onUninstall`).

**Маркетплейс плагінів** — це рівень пошуку й огляду поверх цієї системи. Він
надає каталог доступних для встановлення плагінів із можливістю перегляду. За замовчуванням каталогом є
невеликий вбудований початковий реєстр; оператор може вказати URL власного віддаленого
реєстру, і в такому разі отримання даних захищається SSRF-запобіжником із перевіркою DNS
(див. [Безпека](#security)).

Кожен маршрут плагінів доступний **лише через loopback** (рівень 1 — `LOCAL_ONLY`): плагіни завантажують
і виконують код у дочірніх процесах, тому маршрути недоступні з джерел,
що не є loopback, незалежно від автентифікації. Див.
[`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md).

## Як це все працює разом

```
Панель керування (/dashboard/plugins)
  ├─ Вкладка "Встановлені" → GET /api/plugins            (listPlugins)
  │                          POST /api/plugins/scan      (pluginManager.scan)
  │                          POST /api/plugins/{name}/activate|deactivate
  │                          DELETE /api/plugins/{name}   (видалення)
  └─ Вкладка "Маркетплейс" → GET /api/plugins/marketplace
                               → listMarketplacePlugins()
                                 ├─ немає власного URL → вбудований SEED_REGISTRY
                                 └─ власний URL → isSafeMarketplaceUrl() SSRF-запобіжник
                                                → safeOutboundFetch(guard:"public-only")
```

- **Рівень реєстру** — `src/lib/plugins/marketplace.ts`: надає список / пошук у
  каталозі, повертаючись до початкового реєстру в разі будь-якої помилки.
- **Рівень життєвого циклу** — `src/lib/plugins/manager.ts` (одинак `pluginManager`):
  встановлення, оновлення, активація, деактивація, видалення, сканування, завантаження під час запуску.
- **Рівень маніфесту** — `src/lib/plugins/manifest.ts`: схема Zod + типові значення для
  `plugin.json`.
- **Сканер** — `src/lib/plugins/scanner.ts`: виявляє плагіни на диску в
  каталозі плагінів.
- **Завантажувач** — `src/lib/plugins/loader.ts`: запускає кожен плагін в ізольованому
  дочірньому процесі та забезпечує виклики перехоплювачів через IPC.

## Каталог маркетплейсу

`listMarketplacePlugins()` (`src/lib/plugins/marketplace.ts`) повертає список
об’єктів `MarketplaceEntry`:

| Поле          | Тип      | Примітки                                      |
| ------------- | -------- | --------------------------------------------- |
| `name`        | string   | Назва плагіна в kebab-case                    |
| `version`     | string   | semver                                        |
| `description` | string   | Короткий опис                                 |
| `author`      | string   | Автор / організація                           |
| `license`     | string   | Ідентифікатор ліцензії у стилі SPDX           |
| `downloadUrl` | string   | URL завантаження джерела (може бути порожнім) |
| `repository`  | string?  | Необов’язковий URL репозиторію                |
| `tags`        | string[] | Теги для пошуку/фільтрації                    |
| `downloads`   | number   | Кількість завантажень                         |
| `rating`      | number   | 0–5                                           |
| `verified`    | boolean  | Чи позначено запис як перевірений             |
| `lastUpdated` | string   | Рядок дати у форматі, подібному до ISO        |

Якщо URL власного реєстру не налаштовано, каталогом є вбудований
`SEED_REGISTRY` (наразі `request-logger`, `rate-limiter`, `cost-tracker` і
`theme-manager`). Початковий реєстр доступний завжди — якщо налаштований віддалений
реєстр недоступний, повертає статус, відмінний від `200`, або повертає нерозпізнане
тіло відповіді, `listMarketplacePlugins()` записує попередження до журналу та повертається до початкового списку.

> Примітка: **каталог** маркетплейсу (перегляд/пошук) повністю інтегровано, але
> встановлення з каталогу одним натисканням у маркетплейсі ще не реалізовано —
> кнопка "Встановити" для запису маркетплейсу на панелі керування наразі показує
> повідомлення "незабаром". Нині встановлення виконується через процес установлення
> з локального шляху (`POST /api/plugins`) і виявлення на диску (`POST /api/plugins/scan`).

## REST API

Усі кінцеві точки потребують автентифікації для керування (`requireManagementAuth`)
**і** доступні лише через loopback-інтерфейс — `/api/plugins` та `/api/plugins/`
зазначені в `LOCAL_ONLY_API_PREFIXES` (`src/server/authz/routeGuard.ts`).

| Кінцева точка                    | Метод  | Опис                                                                |
| -------------------------------- | ------ | ------------------------------------------------------------------- |
| `/api/plugins`                   | GET    | Перелік установлених плагінів (необов’язковий фільтр `?status=`)    |
| `/api/plugins`                   | POST   | Установити плагін з абсолютного локального шляху                    |
| `/api/plugins/scan`              | POST   | Просканувати каталог плагінів і зареєструвати нові плагіни          |
| `/api/plugins/marketplace`       | GET    | Перелік записів каталогу маркетплейсу                               |
| `/api/plugins/[name]`            | GET    | Отримати відомості про встановлений плагін                          |
| `/api/plugins/[name]`            | DELETE | Видалити плагін                                                     |
| `/api/plugins/[name]/activate`   | POST   | Активувати (завантажити + зареєструвати хуки)                       |
| `/api/plugins/[name]/deactivate` | POST   | Деактивувати (викликати `onDeactivate`, скасувати реєстрацію хуків) |
| `/api/plugins/[name]/config`     | GET    | Отримати конфігурацію плагіна + схему конфігурації                  |
| `/api/plugins/[name]/config`     | PUT    | Оновити конфігурацію плагіна (з перевіркою за схемою)               |

Фільтр `status` для `GET /api/plugins` приймає одне зі значень:
`installed` / `active` / `inactive` / `error`. Недійсне значення повертає `400`.

### Перелік установлених плагінів

```bash
curl http://localhost:20128/api/plugins \
  -H "Cookie: auth_token=..."
```

### Установлення з локального шляху

```bash
curl -X POST http://localhost:20128/api/plugins \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{ "path": "/absolute/path/to/my-plugin" }'
```

Значення `path` має бути **абсолютним** і не може містити сегментів обходу `..`
або нульових байтів (це контролюється Zod). Вихідний каталог має містити дійсний
`plugin.json` (або бути батьківським для каталогу, що його містить). У разі успіху
відповідь має код `201` і містить запис установленого плагіна.

### Перегляд маркетплейсу

```bash
curl http://localhost:20128/api/plugins/marketplace \
  -H "Cookie: auth_token=..."
```

### Оновлення конфігурації плагіна

```bash
curl -X PUT http://localhost:20128/api/plugins/my-plugin/config \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{ "config": { "level": "debug", "maxItems": 100 } }'
```

`PUT .../config` перевіряє кожне надане значення за `configSchema` плагіна
(оголошеною в маніфесті): поля `number` враховують `min`/`max`, а поля `select`
мають відповідати оголошеному `enum`. Ключі, відсутні у схемі, допускаються без
змін.

## Конфігурація

### Каталог плагінів

Плагіни зберігаються в каталозі даних OmniRoute:

```
~/.omniroute/plugins/<plugin-name>/
  ├─ plugin.json
  └─ index.js          # (або файл, на який указує manifest.main)
```

`getDefaultPluginDir()` (`src/lib/plugins/scanner.ts`) визначає цей каталог у
три етапи:

1. **`OMNIROUTE_PLUGINS_DIR`**, якщо задано — використовується без змін, незалежно від значення `HOME`. Це
   явний параметр для Docker/K8s, де дерево плагінів монтується через bind mount за шляхом,
   який зазвичай не має жодного стосунку до домашнього каталогу контейнера (#11827).
2. `<home>/.omniroute/plugins`, де `<home>` визначається зі змінних середовища `HOME` / `USERPROFILE`.
3. `/tmp/.omniroute/plugins`, якщо процес узагалі не експортує домашній каталог.

Визначений каталог один раз записується до журналу під час запуску як `scanner.dir_resolved`
із зазначенням використаного вхідного параметра (`OMNIROUTE_PLUGINS_DIR`, `home` або
`no-home-fallback`) — тому образ, який непомітно переходить до етапу 3, повідомляє про це,
а не лише про порожній список плагінів. `POST /api/plugins/scan` виявляє всі підкаталоги
в ньому, що містять дійсний `plugin.json`, і реєструє їх; цей самий каталог є кореневим
каталогом, до якого `pluginManager.install()` копіює плагіни, тому перевизначення одночасно
переміщує місце виявлення та встановлення.

> **`OMNIROUTE_PLUGINS_DIR` — це не `OMNIROUTE_PLUGIN_PATH`.** Останню змінну читає лише
> завантажувач командних плагінів CLI (`bin/cli/plugins.mjs`), щоб знаходити npm-пакети
> `omniroute-cmd-*`, які додають підкоманди `omniroute`, — вона не впливає на описаний
> тут сканер середовища виконання. Докладніше про це див. у [PLUGINS.md](./PLUGINS.md).

### Власна URL-адреса реєстру маркетплейсу

Джерело каталогу маркетплейсу зчитується з параметра `pluginMarketplaceUrl`
(`src/lib/plugins/marketplace.ts` читає `settings.pluginMarketplaceUrl`). Якщо
йому задано URL-адресу `http(s)`, `listMarketplacePlugins()` отримує дані із цієї
адреси та приймає або JSON-масив записів верхнього рівня, або об’єкт із масивом
`plugins`; записи без рядкового значення `name` відфільтровуються. Якщо параметр
не задано (або якщо отримання даних не проходить захист від SSRF / повертає
некоректну відповідь), використовується вбудований початковий реєстр.

Вкладка панелі керування «Маркетплейс» містить поле для цієї URL-адреси (значення
зчитується через `GET /api/settings`).

> Примітка щодо реалізації: дія «Зберегти» на панелі керування надсилає
> `pluginMarketplaceUrl` до `PATCH /api/settings`. На момент написання цього
> документа цей ключ не оголошено в `updateSettingsSchema`
> (`src/shared/validation/settingsSchemas.ts`), тому перш ніж покладатися на нього,
> перевірте збереження у своєму випуску — шлях **читання** (`getSettings()` →
> `listMarketplacePlugins()`) враховує цей ключ, щойно він з’являється у сховищі
> налаштувань.

## Безпека

### Рівень маршруту — лише loopback

Плагіни виконують код у породжених дочірніх процесах, тому всю поверхню `/api/plugins`
класифіковано як `LOCAL_ONLY` (рівень 1). Перевірка loopback виконується
безумовно **до** будь-якої перевірки автентифікації, тому витік токена керування, що потрапив
на машину через тунель, усе одно не дає змоги встановити, активувати чи видалити плагін.
Див. [`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md) і
жорсткі правила #15 / #17.

### Захист реєстру маркетплейсу від SSRF

На користувацьку URL-адресу реєстру може впливати зловмисник, тому перед
її отриманням `listMarketplacePlugins()` пропускає її через два рівні захисту:

1. **`isSafeMarketplaceUrl(url)`** (`src/lib/plugins/marketplace.ts`):
   - Відхиляє все, що не використовує `http:` / `https:`.
   - Відхиляє явно задані приватні/loopback/link-local/ULA-хости (IPv4 **і** IPv6,
     включно з відображеними в IPv6 адресами IPv4) за допомогою канонічної функції `isPrivateHost`
     (`src/shared/network/outboundUrlGuard.ts`).
   - Розв’язує записи **обох** типів — `A` і `AAAA` — та відхиляє URL, якщо **будь-яка**
     отримана адреса є приватною, усуваючи обхід через публічне ім’я хоста → приватну IP-адресу.
   - **Безпечно відмовляє**: помилка розв’язання DNS призводить до відхилення URL-адреси.
2. **`safeOutboundFetch(url, { guard: "public-only", timeoutMs: 5000 })`**
   (`src/shared/network/safeOutboundFetch.ts`): повторно застосовує під час отримання
   захист URL-адрес, що дозволяє лише публічні адреси, і **блокує перенаправлення** (без переходу
   з публічної на приватну адресу через `30x`).

URL-адреса, яка не проходить будь-який із рівнів, не перериває запит — маркетплейс
без повідомлення повертається до вбудованого початкового реєстру та записує попередження в журнал.

> Цей захист було посилено в PR #3774 спеціально для розв’язання A + AAAA та використання
> канонічної функції `isPrivateHost` замість перевірки лише IPv4.

### Ізоляція виконання плагінів

- **Ізоляція процесів** — `loadPlugin()` (`src/lib/plugins/loader.ts`) запускає
  кожен плагін в окремому дочірньому процесі Node.js і обмінюється даними через IPC.
  Виклики хуків мають тайм-аут з ескалацією `SIGTERM` → `SIGKILL`.
- **Дозволений список змінних середовища** — дочірній процес отримує лише дозволений набір змінних
  середовища; ширший набір надається лише тоді, коли маніфест запитує
  дозвіл `env`.
- **Обмеження шляхів** — операції встановлення/оновлення/видалення перевіряють, що каталог
  плагіна та `manifest.main` розв’язуються **в межах** керованого кореневого каталогу плагінів
  перед будь-яким копіюванням або рекурсивним видаленням (захист від підроблених шляхів у БД і
  обходу через `../` у `manifest.main`). Під час активації символічні посилання розв’язуються
  через `realpath`, а завантаження точки входу, що виходить за межі каталогу плагіна,
  відхиляється.
- **Необов’язкова фіксація цілісності** — маніфест може оголошувати поле `integrity`
  (`sha256-<base64>`, формат SRI). Якщо воно наявне, завантажувач перевіряє хеш
  вхідного файлу під час завантаження та відмовляється активувати плагін у разі невідповідності. Це
  опціональне виявлення підробки, **а не** межа безпеки — маршрутизація лише через loopback
  і модель дозволів є справжніми межами.

## Маніфест (`plugin.json`)

Перевіряється за допомогою `PluginManifestSchema` (`src/lib/plugins/manifest.ts`):

| Поле               | Тип       | Примітки                                                       |
| ------------------ | --------- | -------------------------------------------------------------- |
| `name`             | string    | Обов’язкове; kebab-case (`^[a-z0-9-]+$`), 1–100 символів       |
| `version`          | string    | Обов’язкове; semver (`MAJOR.MINOR.PATCH`)                      |
| `description`      | string?   | ≤ 500 символів                                                 |
| `author`           | string?   | ≤ 200 символів                                                 |
| `license`          | string?   | Типове значення — `MIT`                                        |
| `main`             | string?   | Вхідний файл; типове значення — `index.js`                     |
| `source`           | enum?     | `local` \| `marketplace` (типове значення — `local`)           |
| `tags`             | string[]? | Теги пошуку                                                    |
| `requires`         | object?   | `{ omniroute?, permissions[] }`                                |
| `hooks`            | object?   | Логічні значення, що вказують, які хуки реалізує плагін        |
| `skills`           | object[]? | Необов’язкові визначення навичок                               |
| `enabledByDefault` | boolean?  | Автоматична активація під час встановлення                     |
| `configSchema`     | object?   | Мапа полів конфігурації (`string`/`number`/`boolean`/`select`) |
| `integrity`        | string?   | Необов’язкова фіксація вхідного файлу `sha256-<base64>`        |

Дозволи вибираються з переліку
`network` / `file-read` / `file-write` / `env` / `exec`.

## Життєвий цикл

```
install (POST /api/plugins, шлях)
  → сканування/перевірка маніфесту → копіювання до проміжного каталогу → перевірка, що main розташований у каталозі
  → атомарне перейменування в ~/.omniroute/plugins/<name> → вставлення рядка до БД
  → виклик onInstall → якщо enabledByDefault: активація

activate (POST /api/plugins/{name}/activate)
  → перевірка належності realpath → loadPlugin() (запуск дочірнього процесу)
  → реєстрація оголошених хуків → status = "active" → виклик onActivate

deactivate (POST /api/plugins/{name}/deactivate)
  → виклик onDeactivate (ПЕРЕД скасуванням реєстрації) → скасування реєстрації хуків
  → завершення дочірнього процесу → status = "inactive"

uninstall (DELETE /api/plugins/{name})
  → деактивація, якщо активний → виклик onUninstall
  → рекурсивне видалення каталогу плагіна з перевіркою належності → видалення рядка з БД
```

Повторний запуск `install` для каталогу, версія в маніфесті якого **строго
новіша** за встановлену версію, автоматично виконує оновлення (чисте повторне встановлення; конфігурація скидається
до значень за замовчуванням). Та сама або старіша версія відхиляється.

## База даних

Таблиця `plugins` (міграція `076_create_plugins.sql`):

| Стовпець        | Тип     | Примітки                                                     |
| --------------- | ------- | ------------------------------------------------------------ |
| `id`            | TEXT PK | UUID                                                         |
| `name`          | TEXT    | Унікальне значення                                           |
| `version`       | TEXT    | semver; за замовчуванням `1.0.0`                             |
| `description`   | TEXT    | Необов'язкове значення                                       |
| `author`        | TEXT    | Необов'язкове значення                                       |
| `license`       | TEXT    | За замовчуванням `MIT`                                       |
| `main`          | TEXT    | Вхідний файл; за замовчуванням `index.js`                    |
| `source`        | TEXT    | За замовчуванням `local`                                     |
| `tags`          | TEXT    | Масив JSON; за замовчуванням `[]`                            |
| `status`        | TEXT    | `installed` \| `active` \| `inactive` \| `error`             |
| `enabled`       | INT     | 0/1; за замовчуванням 0                                      |
| `manifest`      | TEXT    | Повний JSON маніфесту                                        |
| `config`        | TEXT    | JSON; за замовчуванням `{}`                                  |
| `config_schema` | TEXT    | JSON; за замовчуванням `{}`                                  |
| `hooks`         | TEXT    | Масив JSON з іменами оголошених хуків; за замовчуванням `[]` |
| `permissions`   | TEXT    | Масив JSON; за замовчуванням `[]`                            |
| `plugin_dir`    | TEXT    | Абсолютний шлях до каталогу встановлення                     |
| `error_message` | TEXT    | Задається, коли `status = "error"`                           |
| `installed_at`  | TEXT    | `datetime('now')`                                            |
| `updated_at`    | TEXT    | `datetime('now')`                                            |
| `activated_at`  | TEXT    | Задається під час активації                                  |

Метрики й аналітика плагінів відстежуються в додаткових таблицях
(`090_plugin_metrics.sql`, `091_plugin_analytics.sql`).

## Панель керування

Сторінка панелі керування за адресою `/dashboard/plugins`
(`src/app/(dashboard)/dashboard/plugins/page.tsx`) містить дві вкладки:

- **Встановлені** — список встановлених плагінів із оголошеними ними хуками, перемикачем
  активації/деактивації, кнопкою видалення та дією «Сканувати плагіни»
  (`POST /api/plugins/scan`).
- **Маркетплейс** — відображає каталог із `GET /api/plugins/marketplace` та містить
  поле для налаштування URL власного реєстру.

Сторінка конфігурації окремого плагіна розташована за адресою `/dashboard/plugins/[name]/config`
(`src/app/(dashboard)/dashboard/plugins/[name]/config/page.tsx`).

## Див. також

- [`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md) —
  чому `/api/plugins` доступний лише через loopback (рівень 1)
- [`docs/frameworks/SKILLS.md`](./SKILLS.md) — пов’язаний фреймворк навичок
  (`src/lib/skills/`); плагіни можуть оголошувати навички у своєму маніфесті
- [`docs/frameworks/WEBHOOKS.md`](./WEBHOOKS.md) — вихідні інтеграції,
  керовані подіями
- [`docs/security/ERROR_SANITIZATION.md`](../security/ERROR_SANITIZATION.md) —
  шаблон `buildErrorBody()`, який кожен маршрут плагіна використовує для відповідей про помилки
