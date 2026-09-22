# Management Authentication (Українська)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/MANAGEMENT-AUTH.md) · 🇪🇹 [am](../../../am/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇦 [ar](../../../ar/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇿 [az](../../../az/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇬 [bg](../../../bg/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇩 [bn](../../../bn/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇿 [cs](../../../cs/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇰 [da](../../../da/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇪 [de](../../../de/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇷 [el](../../../el/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇸 [es](../../../es/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇪 [et](../../../et/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇷 [fa](../../../fa/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇮 [fi](../../../fi/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇷 [fr](../../../fr/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇪 [ga](../../../ga/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [gu](../../../gu/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ha](../../../ha/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇱 [he](../../../he/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [hi](../../../hi/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇷 [hr](../../../hr/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇺 [hu](../../../hu/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇲 [hy](../../../hy/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇩 [id](../../../id/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ig](../../../ig/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇹 [it](../../../it/docs/guides/MANAGEMENT-AUTH.md) · 🇯🇵 [ja](../../../ja/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇪 [ka](../../../ka/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇭 [km](../../../km/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [kn](../../../kn/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇷 [ko](../../../ko/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇹 [lt](../../../lt/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇻 [lv](../../../lv/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ml](../../../ml/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [mr](../../../mr/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇾 [ms](../../../ms/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇹 [mt](../../../mt/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇲 [my](../../../my/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇵 [ne](../../../ne/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇱 [nl](../../../nl/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇴 [no](../../../no/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [or](../../../or/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [pa](../../../pa/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇭 [phi](../../../phi/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇱 [pl](../../../pl/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇹 [pt](../../../pt/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇴 [ro](../../../ro/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇺 [ru](../../../ru/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇰 [si](../../../si/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇰 [sk](../../../sk/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇮 [sl](../../../sl/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇸 [sr](../../../sr/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇪 [sv](../../../sv/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇪 [sw](../../../sw/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ta](../../../ta/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [te](../../../te/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇭 [th](../../../th/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇷 [tr](../../../tr/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇰 [ur](../../../ur/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇿 [uz](../../../uz/docs/guides/MANAGEMENT-AUTH.md) · 🇻🇳 [vi](../../../vi/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [yo](../../../yo/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/MANAGEMENT-AUTH.md)

---

OmniRoute має **чотири сімейства облікових даних**, які можуть авторизувати маршрути керування.
Вони не є взаємозамінними. Ключі API для інференсу (`sk-…`) **не** надають доступу до керування
сервером, якщо їм явно не призначено область дії `manage` або `admin`.

Канонічна реалізація: `src/lib/api/requireManagementAuth.ts`.

| Облікові дані                   | Типовий формат                       | Де створюються                                               | Призначення                     | Можливості керування                                                                               |
| ------------------------------- | ------------------------------------ | ------------------------------------------------------------ | ------------------------------- | -------------------------------------------------------------------------------------------------- |
| JWT-сесія панелі керування      | файл cookie `auth_token`             | Вхід у панель керування                                      | Вебінтерфейс                    | Повне керування через панель із дотриманням правил CSRF, локальності та завжди захищених маршрутів |
| Токен ідентифікатора машини CLI | внутрішній / локальний               | Початкове налаштування CLI (`omniroute` на тій самій машині) | Локальний CLI                   | Лише локальне керування                                                                            |
| Токен доступу з областю дії     | `oma_live_…`                         | **Налаштування → Токени доступу** або `omniroute connect`    | Віддалений CLI та API керування | Має відповідати потрібній для маршруту області дії `read`, `write` або `admin`                     |
| Ключ API для інференсу          | `sk-…` (та інші префікси ключів API) | **Менеджер API / Ключі API**                                 | Інференс `/v1/*`                | **Жодних**, якщо метадані ключа не містять `manage` або `admin`                                    |

Облікові дані `oma_` призначені для керування/CLI. Вони **не** є ключами API для інференсу.

Якщо автентифікацію за допомогою входу/ключа API на сервері вимкнено, деякі маршрути керування можуть
приймати неавтентифіковані виклики. Для локальних і завжди захищених маршрутів і надалі діють
їхні власні правила. Тому надання одних із цих облікових даних не є обов’язковим
у всіх випадках, а володіння ними не завжди є достатнім без потрібної
області дії та відповідної локальності маршруту.

Пов’язана документація: [Віддалений режим](./REMOTE-MODE.md) (як створюється `oma_live_…` для віддаленого CLI).

---

## Матриці областей дії

Ці два набори областей дії **відрізняються**. Не змішуйте їх.

### Області дії токенів доступу (`oma_live_…`)

| Область дії | Типові операції                                                                                                                                 |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `read`      | GET-запити списків/стану, які дозволено переглядати токену                                                                                      |
| `write`     | Зміни (створення/оновлення/видалення) нижче рівня адміністратора                                                                                |
| `admin`     | Повний доступ для віддаленого CLI / токена підключення (під час початкового налаштування за допомогою пароля використовується за замовчуванням) |

Токен з областю дії `read` не може викликати маршрут `write`. Формат повідомлення під час виконання:
`Access token scope '<have>' is insufficient; '<need>' required.`

### Області дії ключів API для керування

| Область дії | Значення                                                                                      |
| ----------- | --------------------------------------------------------------------------------------------- |
| (немає)     | Лише інференс. Маршрути керування повертають 403.                                             |
| `manage`    | API керування (той самий механізм перевірки, що й у гілці ключів API `requireManagementAuth`) |
| `admin`     | Також задовольняє `hasManageScope` (вважається придатною для керування)                       |

Увімкніть `manage` для ключа в інтерфейсі «Ключі API / Менеджер API». Не використовуйте повторно
ключ клієнта чату для автоматизації, якщо ви свідомо не надали йому цю область дії.

---

## Як створювати та відкликати

### JWT-сесія панелі керування

1. Відкрийте `/login` і ввійдіть за допомогою пароля керування (`INITIAL_PASSWORD` під час першого запуску).
2. Файл cookie `auth_token` має атрибут HttpOnly. Панель керування в браузері використовує його автоматично.
3. Вийдіть через `/api/auth/logout`. Довготривалого секрету для копіювання немає.

### Токен ідентифікатора машини CLI

1. Запустіть `omniroute` на **тому самому хості**, що й сервер (через loopback).
2. CLI створює токен ідентифікатора машини в `~/.omniroute/` (chmod 600).
3. Це **не** працює з іншої машини. Для віддаленого CLI використовуйте токен доступу.

### Токен доступу з областю дії (`oma_live_…`)

1. Панель керування: **Налаштування → Токени доступу** → створити (ім’я + область дії). **Секрет показується лише один раз.**
2. Або CLI: `omniroute connect <host>` (пароль → токен). Див. [Віддалений режим](./REMOTE-MODE.md).
3. Заголовок: `Authorization: Bearer oma_live_…`
4. Відкличте токен на тій самій сторінці токенів доступу (або видаліть контекст CLI).
5. Сервер зберігає лише хеш. Поводьтеся з відкритим текстом як із паролем.

### Ключ API з областю дії для керування

1. Панель керування: **Менеджер API / Ключі API** → створіть або відредагуйте ключ → увімкніть `manage` (або `admin`).
2. Заголовок: `Authorization: Bearer sk-…` (фактичний префікс ключа).
3. Відкличте ключ або видаліть `manage` у тому самому інтерфейсі.
4. Для автоматизації, яка не використовує CLI, дотримуйтеся принципу найменших привілеїв: надавайте перевагу токену доступу `read` для завдань лише з GET-запитами; використовуйте `manage` для ключа API лише тоді, коли викликувач також має взаємодіяти з `/v1` та інтерфейсом керування.

---

## Формат заголовка

```http
Authorization: Bearer oma_live_<secret>
Authorization: Bearer sk-<secret>
Cookie: auth_token=<dashboard-jwt>
```

Не розміщуйте облікові дані керування в шляху URL або рядку запиту. Автентифікація
для керування здійснюється лише через заголовок або cookie.

---

## Приклади для копіювання та вставлення

Лише читання (отримання списку провайдерів). Використовуйте Access Token із рівнем `read`:

```bash
curl -sS "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<read-token>"
```

Внесення змін (створення підключення до провайдера). Використовуйте Access Token із рівнем `write`/`admin` або
API-ключ з областю доступу `manage`:

```bash
curl -sS -X POST "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<write-or-admin-token>" \
  -H "Content-Type: application/json" \
  -d '{"provider":"openai","apiKey":"<upstream-key>"}'
```

Інференс (не керування). Звичайний API-ключ, `manage` не потрібен:

```bash
curl -sS "$OMNIROUTE_URL/v1/models" \
  -H "Authorization: Bearer sk-<inference-key>"
```

---

## Поточні помилки середовища виконання (не виводьте секрети)

| Ситуація                                          | Типовий статус | Повідомлення (очищене)                                                                    |
| ------------------------------------------------- | -------------- | ----------------------------------------------------------------------------------------- |
| Облікові дані відсутні                            | 401            | `Потрібна автентифікація`                                                                 |
| Недійсний/прострочений `oma_live_…`               | 401            | `Недійсний або прострочений токен доступу`                                                |
| Дійсний API-ключ без `manage`/`admin`             | 403            | `API-ключ не має області доступу 'manage'. Увімкніть її на панелі керування API-ключами.` |
| Недійсний звичайний API-ключ у маршруті керування | 403            | `Недійсний токен керування`                                                               |
| Недостатній рівень Access Token                   | 403            | `Рівень токена доступу '<have>' недостатній; потрібен '<need>'.`                          |

«Недійсний токен керування» означає, що токен-носій **не** було прийнято як облікові
дані керування. Це **не** вказує, який тип облікових даних потрібно створити. Скористайтеся наведеною вище таблицею:
ключам для інференсу потрібна область доступу `manage`; для віддаленого CLI потрібен `oma_live_…`; панель керування
використовує cookie сеансу.

---

## Рекомендований варіант із мінімальними привілеями

| Клієнт                                                 | Що використовувати                                               |
| ------------------------------------------------------ | ---------------------------------------------------------------- |
| Браузер                                                | Сеанс панелі керування                                           |
| CLI на хості сервера                                   | Машинний токен                                                   |
| CLI на ноутбуці, що звертається до віддаленого сервера | `oma_live_…` з `omniroute connect`                               |
| CI / скрипти (лише керування)                          | `oma_live_…` із найменшим достатнім рівнем доступу               |
| CI, який має викликати і `/v1`, і `/api`               | API-ключ з областю доступу `manage` **або** двоє облікових даних |
