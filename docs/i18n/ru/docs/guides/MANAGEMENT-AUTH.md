# Management Authentication (Русский)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/MANAGEMENT-AUTH.md) · 🇪🇹 [am](../../../am/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇦 [ar](../../../ar/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇿 [az](../../../az/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇬 [bg](../../../bg/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇩 [bn](../../../bn/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇦 [bs](../../../bs/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇿 [cs](../../../cs/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇰 [da](../../../da/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇪 [de](../../../de/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇷 [el](../../../el/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇸 [es](../../../es/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇪 [et](../../../et/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇷 [fa](../../../fa/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇮 [fi](../../../fi/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇷 [fr](../../../fr/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇪 [ga](../../../ga/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [gu](../../../gu/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ha](../../../ha/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇱 [he](../../../he/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [hi](../../../hi/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇷 [hr](../../../hr/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇺 [hu](../../../hu/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇲 [hy](../../../hy/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇩 [id](../../../id/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ig](../../../ig/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇹 [it](../../../it/docs/guides/MANAGEMENT-AUTH.md) · 🇯🇵 [ja](../../../ja/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇪 [ka](../../../ka/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇭 [km](../../../km/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [kn](../../../kn/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇷 [ko](../../../ko/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇹 [lt](../../../lt/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇻 [lv](../../../lv/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ml](../../../ml/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [mr](../../../mr/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇾 [ms](../../../ms/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇹 [mt](../../../mt/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇲 [my](../../../my/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇵 [ne](../../../ne/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇱 [nl](../../../nl/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇴 [no](../../../no/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [or](../../../or/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [pa](../../../pa/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇭 [phi](../../../phi/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇱 [pl](../../../pl/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇹 [pt](../../../pt/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇴 [ro](../../../ro/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇰 [si](../../../si/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇰 [sk](../../../sk/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇮 [sl](../../../sl/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇸 [sr](../../../sr/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇪 [sv](../../../sv/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇪 [sw](../../../sw/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ta](../../../ta/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [te](../../../te/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇭 [th](../../../th/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇷 [tr](../../../tr/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇰 [ur](../../../ur/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇿 [uz](../../../uz/docs/guides/MANAGEMENT-AUTH.md) · 🇻🇳 [vi](../../../vi/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [yo](../../../yo/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/MANAGEMENT-AUTH.md)

---

OmniRoute поддерживает **четыре семейства учётных данных**, которые могут авторизовать доступ к маршрутам управления.
Они не взаимозаменяемы. Ключи API для инференса (`sk-…`) **не** позволяют управлять
сервером, если им явно не предоставлена область действия `manage` или `admin`.

Каноническая реализация: `src/lib/api/requireManagementAuth.ts`.

| Учётные данные                   | Типичный вид                          | Где создаются                                                   | Предназначение                 | Возможности управления                                                                         |
| -------------------------------- | ------------------------------------- | --------------------------------------------------------------- | ------------------------------ | ---------------------------------------------------------------------------------------------- |
| JWT-сессия панели управления     | cookie `auth_token`                   | Вход в панель управления                                        | Браузерный интерфейс           | Полное управление через панель с учётом правил CSRF, локальности и всегда защищённых маршрутов |
| Токен machine-id для CLI         | внутренний / локальный                | Первоначальная настройка CLI (`omniroute` на том же компьютере) | Локальный CLI                  | Только локальное управление                                                                    |
| Access Token с областью действия | `oma_live_…`                          | **Настройки → Access Tokens** или `omniroute connect`           | Удалённый CLI и API управления | Должен соответствовать требуемой маршрутом области действия `read`, `write` или `admin`        |
| Ключ API для инференса           | `sk-…` (и другие префиксы ключей API) | **API Manager / API Keys**                                      | Инференс через `/v1/*`         | **Нет**, если только метаданные ключа не включают `manage` или `admin`                         |

Учётные данные `oma_` предназначены для управления и CLI. Они **не** являются ключами API для инференса.

Если аутентификация посредством входа/ключа API отключена на сервере, некоторые маршруты управления могут
принимать неаутентифицированные запросы. При этом для локальных и всегда защищённых маршрутов по-прежнему
действуют собственные правила. Поэтому предоставление одних из этих учётных данных требуется не всегда,
а их наличие не всегда достаточно без необходимой области действия и соответствия требованиям маршрута к локальности.

См. также: [Удалённый режим](./REMOTE-MODE.md) (как создаётся `oma_live_…` для удалённого CLI).

---

## Матрицы областей действия

Эти два набора областей действия **различаются**. Не смешивайте их.

### Области действия Access Token (`oma_live_…`)

| Область действия | Типичные операции                                                                                                     |
| ---------------- | --------------------------------------------------------------------------------------------------------------------- |
| `read`           | Запросы GET для получения списков/состояния, которые разрешено выполнять токену                                       |
| `write`          | Изменения (создание/обновление/удаление), не требующие прав администратора                                            |
| `admin`          | Полный доступ к удалённому CLI / токен подключения (используется по умолчанию при первоначальной настройке с паролем) |

Токен с областью действия `read` не может обращаться к маршруту `write`. Формат сообщения во время выполнения:
`Access token scope '<have>' is insufficient; '<need>' required.`

### Области действия ключей API для управления

| Область действия | Значение                                                                                                      |
| ---------------- | ------------------------------------------------------------------------------------------------------------- |
| (отсутствует)    | Только инференс. Маршруты управления возвращают 403.                                                          |
| `manage`         | API управления (та же проверка, что и в ветви ключа API функции `requireManagementAuth`)                      |
| `admin`          | Также удовлетворяет условию `hasManageScope` (рассматривается как область действия с возможностью управления) |

Включите `manage` для ключа в интерфейсе API Keys / API Manager. Не используйте повторно
ключ чат-клиента для автоматизации, если только вы намеренно не предоставили ему эту область действия.

---

## Создание и отзыв

### JWT-сессия панели управления

1. Откройте `/login` и войдите с паролем управления (`INITIAL_PASSWORD` при первом запуске).
2. Cookie `auth_token` имеет атрибут HttpOnly. Браузерная панель управления использует его автоматически.
3. Выйдите через `/api/auth/logout`. Долгосрочного секрета для копирования нет.

### Токен machine-id для CLI

1. Запустите `omniroute` на **том же хосте**, где работает сервер (через loopback).
2. CLI создаст токен machine-id в каталоге `~/.omniroute/` (chmod 600).
3. С другого компьютера это **не** работает. Для удалённого CLI используйте Access Token.

### Access Token с областью действия (`oma_live_…`)

1. Панель управления: **Настройки → Access Tokens** → создать (имя + область действия). **Секрет отображается только один раз.**
2. Или CLI: `omniroute connect <host>` (пароль → токен). См. [Удалённый режим](./REMOTE-MODE.md).
3. Заголовок: `Authorization: Bearer oma_live_…`
4. Отзовите токен на той же странице Access Tokens (или удалите контекст CLI).
5. Сервер хранит только хеш. Обращайтесь с открытым значением как с паролем.

### Ключ API с областью действия `manage`

1. Панель управления: **API Manager / API Keys** → создайте или отредактируйте ключ → включите `manage` (или `admin`).
2. Заголовок: `Authorization: Bearer sk-…` (фактический префикс ключа).
3. Отзовите ключ или удалите `manage` в том же интерфейсе.
4. Для автоматизации, не использующей CLI, придерживайтесь принципа минимальных привилегий: для задач только с GET-запросами предпочтительнее Access Token с областью действия `read`; используйте `manage` для ключа API только тогда, когда клиенту также необходим доступ к `/v1` и функциям управления.

---

## Формат заголовка

```http
Authorization: Bearer oma_live_<secret>
Authorization: Bearer sk-<secret>
Cookie: auth_token=<dashboard-jwt>
```

Не помещайте учётные данные для управления в путь URL или строку запроса. Для
аутентификации управления используются только заголовок или cookie.

---

## Примеры для копирования и вставки

Только чтение (получение списка провайдеров). Используйте токен доступа с областью `read`:

```bash
curl -sS "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<read-token>"
```

Изменение (создание подключения к провайдеру). Используйте токен доступа с областью `write`/`admin` или
API-ключ с областью `manage`:

```bash
curl -sS -X POST "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<write-or-admin-token>" \
  -H "Content-Type: application/json" \
  -d '{"provider":"openai","apiKey":"<upstream-key>"}'
```

Инференс (не управление). Обычный API-ключ, область `manage` не требуется:

```bash
curl -sS "$OMNIROUTE_URL/v1/models" \
  -H "Authorization: Bearer sk-<inference-key>"
```

---

## Текущие ошибки среды выполнения (не выводите секреты)

| Ситуация                                                  | Типичный статус | Сообщение (без конфиденциальных данных)                                                   |
| --------------------------------------------------------- | --------------- | ----------------------------------------------------------------------------------------- |
| Учётные данные отсутствуют                                | 401             | `Требуется аутентификация`                                                                |
| Недействительный/просроченный `oma_live_…`                | 401             | `Недействительный или просроченный токен доступа`                                         |
| Действительный API-ключ без области `manage`/`admin`      | 403             | `У API-ключа отсутствует область 'manage'. Включите её на панели управления API-ключами.` |
| Недействительный обычный API-ключ для маршрута управления | 403             | `Недействительный токен управления`                                                       |
| Недостаточная область токена доступа                      | 403             | `Область токена доступа '<have>' недостаточна; требуется '<need>'.`                       |

«Недействительный токен управления» означает, что bearer-токен **не** был принят в качестве
учётных данных для управления. Это **не** указывает, токен какого типа нужно создать. Используйте таблицу выше:
ключам для инференса требуется область `manage`; для удалённого CLI требуется `oma_live_…`; панель управления
использует cookie сеанса.

---

## Рекомендуемый вариант с минимальными привилегиями

| Клиент                                               | Используйте                                              |
| ---------------------------------------------------- | -------------------------------------------------------- |
| Браузер                                              | Сеанс панели управления                                  |
| CLI на хосте сервера                                 | Машинный токен                                           |
| CLI на ноутбуке, подключающийся к удалённому серверу | `oma_live_…` из `omniroute connect`                      |
| CI / скрипты (только управление)                     | `oma_live_…` с минимально необходимой областью           |
| CI, который должен обращаться и к `/v1`, и к `/api`  | API-ключ с областью `manage` **или** двое учётных данных |
