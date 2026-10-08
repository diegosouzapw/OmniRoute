# Management Authentication (Русский)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/MANAGEMENT-AUTH.md) · 🇪🇹 [am](../../../am/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇦 [ar](../../../ar/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇿 [az](../../../az/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇬 [bg](../../../bg/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇩 [bn](../../../bn/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇦 [bs](../../../bs/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇿 [cs](../../../cs/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇰 [da](../../../da/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇪 [de](../../../de/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇷 [el](../../../el/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇸 [es](../../../es/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇪 [et](../../../et/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇷 [fa](../../../fa/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇮 [fi](../../../fi/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇷 [fr](../../../fr/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇪 [ga](../../../ga/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [gu](../../../gu/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ha](../../../ha/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇱 [he](../../../he/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [hi](../../../hi/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇷 [hr](../../../hr/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇺 [hu](../../../hu/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇲 [hy](../../../hy/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇩 [id](../../../id/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ig](../../../ig/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇹 [it](../../../it/docs/guides/MANAGEMENT-AUTH.md) · 🇯🇵 [ja](../../../ja/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇪 [ka](../../../ka/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇭 [km](../../../km/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [kn](../../../kn/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇷 [ko](../../../ko/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇹 [lt](../../../lt/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇻 [lv](../../../lv/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ml](../../../ml/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [mr](../../../mr/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇾 [ms](../../../ms/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇹 [mt](../../../mt/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇲 [my](../../../my/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇵 [ne](../../../ne/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇱 [nl](../../../nl/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇴 [no](../../../no/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [or](../../../or/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [pa](../../../pa/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇭 [phi](../../../phi/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇱 [pl](../../../pl/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇹 [pt](../../../pt/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇴 [ro](../../../ro/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇰 [si](../../../si/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇰 [sk](../../../sk/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇮 [sl](../../../sl/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇸 [sr](../../../sr/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇪 [sv](../../../sv/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇪 [sw](../../../sw/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ta](../../../ta/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [te](../../../te/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇭 [th](../../../th/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇷 [tr](../../../tr/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇰 [ur](../../../ur/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇿 [uz](../../../uz/docs/guides/MANAGEMENT-AUTH.md) · 🇻🇳 [vi](../../../vi/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [yo](../../../yo/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/MANAGEMENT-AUTH.md)

---

OmniRoute имеет **четыре семейства учетных данных**, которые могут авторизовать маршруты управления.
Они не взаимозаменяемы. Ключи Inference API (`sk-…`) **не** управляют
сервером, если им явно не были предоставлены области `manage` или `admin`.

Каноническая реализация: `src/lib/api/requireManagementAuth.ts`.

| Учетные данные                | Типичная форма                        | Созданы где                                            | Предполагаемое использование        | Возможности управления                                                                                |
| :---------------------------- | :------------------------------------ | :----------------------------------------------------- | :---------------------------------- | :---------------------------------------------------------------------------------------------------- |
| Сессия JWT панели управления  | cookie `auth_token`                   | Вход в панель управления                               | Пользовательский интерфейс браузера | Полное управление панелью управления, с учетом CSRF, локальности и правил всегда защищенных маршрутов |
| Токен machine-id CLI          | внутренний / локальный                | Загрузка CLI (`omniroute` на той же машине)            | Локальный CLI                       | Только локальное управление                                                                           |
| Токен с ограниченной областью | `oma_live_…`                          | **Настройки → Токены доступа** или `omniroute connect` | Удаленный CLI и API управления      | Должен соответствовать требуемой области `read`, `write` или `admin` маршрута                         |
| Ключ Inference API            | `sk-…` (и другие префиксы API-ключей) | **API Manager / API Keys**                             | Inference `/v1/*`                   | **Нет**, если метаданные ключа не включают `manage` или `admin`                                       |

Учетные данные `oma_` — это учетные данные для управления/CLI. Они **не** являются ключами Inference API.

Если аутентификация по логину/API-ключу отключена для сервера, некоторые маршруты управления могут
принимать неаутентифицированные вызовы. Локальные и всегда защищенные маршруты по-прежнему применяют
свои собственные правила. Поэтому предоставление одних из этих учетных данных не является универсально
обязательным, а обладание ими не является универсально достаточным без требуемой
области и локальности маршрута.

Связанное: [Удаленный режим](./REMOTE-MODE.md) (как `oma_live_…` создается для удаленного CLI).

---

## Матрицы областей

Области управления API-ключей и области токенов доступа — это разные словари.
Области инструментов MCP — это третий словарь, проверяемый с помощью `scopeMatches`, а не
любой из функций в таблицах ниже. Рядом:
[Три пространства имен областей](../frameworks/MCP-SERVER.md#three-scope-namespaces).

### Области токенов доступа (`oma_live_…`)

| Область | Типичные операции                                                    |
| :------ | :------------------------------------------------------------------- |
| `read`  | GET-запросы списка/статуса, которые разрешено видеть токену          |
| `write` | Изменения (создание/обновление/удаление) ниже администратора         |
| `admin` | Полный удаленный CLI / токен подключения (здесь по умолчанию пароль) |

Токен с `read` не может вызывать маршрут `write`. Форма сообщения во время выполнения:
`Access token scope '<have>' is insufficient; '<need>' required.`

### Области управления API-ключей

| Область  | Значение                                                                          |
| :------- | :-------------------------------------------------------------------------------- |
| (нет)    | Только Inference. Маршруты управления возвращают 403.                             |
| `manage` | API управления (тот же шлюз, что и ветвь API-ключа `requireManagementAuth`)       |
| `admin`  | Также удовлетворяет `hasManageScope` (рассматривается как способный к управлению) |

Включите `manage` для ключа в пользовательском интерфейсе API Keys / API Manager. Не используйте повторно
ключ клиента чата для автоматизации, если вы намеренно не предоставили эту область.

---

## Как создать и отозвать

### Сессия JWT панели управления

1. Откройте `/login`, войдите, используя пароль администратора (`INITIAL_PASSWORD` при первом запуске).
2. Куки `auth_token` является HttpOnly. Панель управления в браузере использует его автоматически.
3. Выйдите через `/api/auth/logout`. Долгосрочного секрета для копирования нет.

### Токен machine-id для CLI

1. Запустите `omniroute` на **том же хосте**, что и сервер (loopback).
2. CLI создает токен machine-id в `~/.omniroute/` (chmod 600).
3. Это **не** работает с другой машины. Используйте Access Token для удаленного CLI.

### Scoped Access Token (`oma_live_…`)

1. Панель управления: **Settings → Access Tokens** → создать (имя + область). **Секрет показывается один раз.**
2. Или CLI: `omniroute connect <host>` (пароль → токен). См. [Remote Mode](./REMOTE-MODE.md).
3. Заголовок: `Authorization: Bearer oma_live_…`
4. Отзовите с той же страницы Access Tokens (или удалите контекст CLI).
5. Сервер хранит только хеш. Относитесь к открытому тексту как к паролю.

### API-ключ с областью действия manage

1. Панель управления: **API Manager / API Keys** → создать или отредактировать ключ → включить `manage` (или `admin`).
2. Заголовок: `Authorization: Bearer sk-…` (фактический префикс ключа).
3. Отзовите или удалите `manage` в том же пользовательском интерфейсе.
4. Принцип наименьших привилегий для автоматизации, не являющейся CLI: отдавайте предпочтение `read` Access Token для задач только с GET-запросами; используйте `manage` для API-ключа только тогда, когда вызывающая сторона также должна взаимодействовать с `/v1` и управлением.

---

## Формат заголовка

```http
Authorization: Bearer oma_live_<secret>
Authorization: Bearer sk-<secret>
Cookie: auth_token=<dashboard-jwt>
```

Не помещайте учетные данные управления в путь URL или строку запроса. Аутентификация
управления осуществляется только через заголовок/куки.

---

## Примеры для копирования

Только для чтения (список провайдеров). Используйте `read` Access Token:

```bash
curl -sS "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<read-token>"
```

Изменение (создание подключения провайдера). Используйте `write`/`admin` Access Token или
API-ключ с областью действия manage:

```bash
curl -sS -X POST "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<write-or-admin-token>" \
  -H "Content-Type: application/json" \
  -d '{"provider":"openai","apiKey":"<upstream-key>"}'
```

Вывод (не управление). Обычный API-ключ, `manage` не требуется:

```bash
curl -sS "$OMNIROUTE_URL/v1/models" \
  -H "Authorization: Bearer sk-<inference-key>"
```

---

## Текущие ошибки выполнения (не выводить секреты)

| Ситуация                                                 | Типичный статус | Сообщение (санировано)                                               |
| :------------------------------------------------------- | :-------------- | :------------------------------------------------------------------- |
| Нет учетных данных                                       | 401             | `Authentication required`                                            |
| Недействительный/истекший `oma_live_…`                   | 401             | `Invalid or expired access token`                                    |
| Действительный API-ключ без `manage`/`admin`             | 403             | `API key lacks 'manage' scope. Enable it in the API Keys dashboard.` |
| Недействительный обычный API-ключ на маршруте управления | 403             | `Invalid management token`                                           |
| Слишком низкая область действия Access Token             | 403             | `Access token scope '<have>' is insufficient; '<need>' required.`    |

"Invalid management token" означает, что носитель **не** был принят в качестве учетных данных для управления. Это **не** говорит вам, какое семейство токенов следует использовать. Используйте таблицу выше: ключи для вывода требуют область `manage`; удаленный CLI требует `oma_live_…`; панель управления использует сессионные куки.

## Рекомендуемый выбор с минимальными привилегиями

| Вызывающий объект                                       | Использование                                  |
| :------------------------------------------------------ | :--------------------------------------------- |
| Браузер                                                 | Сессия панели управления                       |
| CLI на хосте сервера                                    | Токен машины                                   |
| CLI на ноутбуке, взаимодействующий с удаленным сервером | `oma_live_…` из `omniroute connect`            |
| CI / скрипты (только управление)                        | `oma_live_…` с наименьшей рабочей областью     |
| CI, который должен вызывать как `/v1`, так и `/api`     | Ключ API с `manage` **или** две учетные записи |
